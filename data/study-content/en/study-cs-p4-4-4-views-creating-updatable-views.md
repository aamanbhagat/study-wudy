## 1. The one-sentence answer
**A view is a named virtual table whose content is the result of a stored SELECT query, and an updatable view is one that permits INSERT, UPDATE, or DELETE operations to propagate to its underlying base tables.**

A view never stores rows itself. It recomputes its rows each time it is referenced by reading the base tables named in its defining query. This separation lets you expose a simplified or restricted slice of data without duplicating storage.

Updatability is not automatic. The database engine must be able to translate every modification of the view into an unambiguous modification of exactly one row in exactly one base table. When that mapping is possible, the view behaves like a writable table; otherwise it is read-only.

> [!NOTE]
> The decisive insight is that a view is not a copy; it is a standing query. Any change you make through an updatable view must be mechanically reversible to a single base-table row, which is why aggregates, joins, and DISTINCT immediately destroy updatability.

## 2. Why this matters — concrete and current
PostgreSQL’s information_schema and pg_catalog are themselves updatable views; the query planner rewrites DML against them into direct catalog-table updates, letting administrators alter metadata through the same SQL they use for ordinary tables.

In Google BigQuery, authorized views allow a team to expose only aggregated, anonymized slices of a sensitive analytics dataset while still permitting analysts to run SELECT queries; the view definition itself is the sole point of access control.

Airbus’s A350 maintenance database uses updatable views to let line engineers update inspection status through a simplified interface whose underlying tables record audit timestamps and user IDs; the view hides the audit columns yet the updates still fire the required triggers.

In the Linux kernel’s perf tooling, the trace data stored in SQLite are accessed through views that join raw event tables with symbol tables; the views are deliberately non-updatable so that the only permitted writes go through vetted stored procedures.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Base table               | Views are defined over one or more base tables            |
| SELECT statement         | The body of every view is a SELECT query                  |
| Primary key              | Updatability requires unambiguous row identity            |
| Transaction semantics    | Modifications through views participate in the same ACID transaction as direct table writes |

## 4. Building the idea — from intuition to formalism

### Step 1 — A base table stores rows
A base table is a persistent, named collection of rows whose columns are defined by a schema.  
Example:  
```sql
CREATE TABLE employee (emp_id INT PRIMARY KEY, name TEXT, dept_id INT);
```
Formally, a relation \(R\) is a set of tuples conforming to a heading \(H_R\).

> [!WARNING]
> Treating a view as if it stored its own rows leads to the false expectation that it survives after its base tables are dropped.

### Step 2 — A query produces a derived relation
Any SELECT expression yields a new relation whose heading and body are computed from the input relations.  
Example:  
```sql
SELECT emp_id, name FROM employee WHERE dept_id = 10;
```
In relational algebra this is \(\pi_{\text{emp_id,name}}(\sigma_{\text{dept_id}=10}(employee))\).

### Step 3 — Naming the query creates a view
Binding the query to a name stores only the query text (or its parse tree) in the catalog.  
```sql
CREATE VIEW dept10_emp AS
SELECT emp_id, name FROM employee WHERE dept_id = 10;
```
The catalog entry is \(\text{View}(V, Q)\) where \(Q\) is the defining query.

### Step 4 — Referencing the view substitutes the query
When the view name appears in a FROM clause the engine rewrites the query by textual substitution of \(Q\).  
The rewritten query is executed exactly as if the view text had been written inline.

### Step 5 — Updatability requires a one-to-one mapping
For an INSERT, UPDATE, or DELETE on the view to be accepted, every view row must correspond to exactly one base-table row and every column being modified must map to exactly one base-table column.  
Formally, the view must be a projection of a selection over a single base table with no aggregation, grouping, DISTINCT, or set operators.

### Step 6 — The WITH CHECK OPTION constraint
When present, the predicate of the view is re-evaluated after modification; rows that no longer satisfy the predicate are rejected.  
This is expressed as an additional predicate check inside the rewrite rule.

### Step 7 — The textbook statement of updatable views
A view \(V\) defined by query \(Q\) is updatable if and only if \(Q\) is a simple projection-selection expression over a single base table \(R\) that includes the primary key of \(R\), contains no aggregate functions, no GROUP BY, no DISTINCT, no set operators, and no joins.

## 5. Worked examples — every step shown

**Example 1 — Simple updatable view**  
*Given:* Table employee with primary key emp_id.  
*Find:* Create a view showing only employees in department 10 and insert a new employee through it.  
Step 1: Write the view definition.  
```sql
CREATE VIEW dept10 AS
SELECT emp_id, name, dept_id FROM employee WHERE dept_id = 10;
```
*Why:* The SELECT projects only columns that map 1-to-1 to the base table and the predicate is a simple selection.  
Step 2: Perform the insert.  
```sql
INSERT INTO dept10 (emp_id, name, dept_id) VALUES (101, 'Lee', 10);
```
*Why:* The engine rewrites the statement to an INSERT on employee; the constant 10 satisfies the view predicate.  
**Final answer**  
The row appears in both the view and the base table.

*Reflection:* The primary key and the constant predicate made the mapping trivial; any omitted key column would have broken insertability.

**Example 2 — View with CHECK OPTION**  
*Given:* The same dept10 view.  
*Find:* Attempt to insert a row that violates the predicate after the WITH CHECK OPTION clause is added.  
Step 1: Recreate the view.  
```sql
CREATE OR REPLACE VIEW dept10 AS
SELECT emp_id, name, dept_id FROM employee
WHERE dept_id = 10 WITH CHECK OPTION;
```
*Why:* The clause forces the engine to verify the predicate after the modification.  
Step 2: Execute the violating insert.  
```sql
INSERT INTO dept10 VALUES (102, 'Kim', 20);
```
*Why:* The rewritten row would have dept_id = 20, violating the stored predicate.  
**Final answer**  
Error: CHECK OPTION failed.

*Reflection:* CHECK OPTION protects the view’s logical invariant without requiring application-level code.

**Example 3 — Non-updatable aggregate view**  
*Given:* The employee table.  
*Find:* Attempt an update through a view that counts employees per department.  
```sql
CREATE VIEW dept_count AS
SELECT dept_id, COUNT(*) AS cnt FROM employee GROUP BY dept_id;
```
*Why:* The presence of COUNT(*) and GROUP BY destroys the one-to-one row mapping.  
Attempted statement:  
```sql
UPDATE dept_count SET cnt = 5 WHERE dept_id = 10;
```
**Final answer**  
Error: cannot update aggregate view.

*Reflection:* Any aggregate immediately signals that the view cannot be a simple projection, so the engine refuses the DML.

**Example 4 — View over a join**  
*Given:* employee joined with department.  
*Find:* Determine whether the following view is updatable.  
```sql
CREATE VIEW emp_dept AS
SELECT e.emp_id, e.name, d.dept_name
FROM employee e JOIN department d ON e.dept_id = d.dept_id;
```
*Why:* The join produces a Cartesian product filtered by the ON clause; a single view row may correspond to multiple base rows or none.  
**Final answer**  
The view is read-only.

*Reflection:* Even when the join is 1-to-1 in practice, the engine cannot prove it from syntax alone and therefore conservatively rejects updates.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Omitting the primary key from the view column list | The engine cannot identify which base row to modify | Always include the base table’s primary key columns  |
| Using DISTINCT or GROUP BY        | These operators collapse multiple rows into one     | Remove the operator or accept that the view is read-only |
| Updating a view defined on a join | One view row may map to multiple base rows          | Split the update into separate statements on each base table |
| Forgetting WITH CHECK OPTION      | Rows can be inserted that later disappear from the view | Add WITH CHECK OPTION whenever the view predicate must be preserved |
| Assuming a view survives base-table DDL | The view stores only the query text                 | Re-create or alter the view after any relevant schema change |
| Treating view columns as independent | View columns are derived, not stored                | Verify column lineage before attempting UPDATE       |
| Using set operators (UNION, INTERSECT) | Result rows have no direct correspondence to base rows | Accept read-only semantics or materialize the result |

## 7. The textbook-precise statement
A view \(V\) is updatable if its defining query \(Q\) is of the form  
\[
Q = \pi_{A_1,\dots,A_k}(\sigma_P(R))
\]  
where \(R\) is a single base relation, \(\{A_1,\dots,A_k\}\) includes the primary key of \(R\), \(P\) is any predicate, and \(Q\) contains neither aggregation, grouping, DISTINCT, set operators, nor joins. Under these conditions every INSERT, UPDATE, or DELETE on \(V\) is rewritten by the system into an equivalent modification of \(R\) (Elmasri & Navathe, *Fundamentals of Database Systems*, 7e, §5.3).

## 8. Visual — diagram or schematic
```text
Base table employee
+-----------------+
| emp_id | name   | dept_id
|  101   | Lee    |   10
|  102   | Kim    |   20
+-----------------+

          View dept10
          (virtual window)
          +-----------------+
          | emp_id | name   |
          |  101   | Lee    |
          +-----------------+
               ↑
          SELECT ... WHERE dept_id=10
```
The arrow indicates query substitution; no separate storage exists for the view rows.

## 9. The memory technique
1. **The hook** — Picture a view as a “magic window” painted on the wall of a warehouse; you see only certain boxes, and when you reach through the window to move a box the box really moves on the warehouse floor.  
2. **What to overlearn** — The five syntactic killers of updatability: aggregate functions, GROUP BY, DISTINCT, set operators, and joins.  
3. **Spaced-repetition schedule** — Review the five killers at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive updatability by asking “does every view row map to exactly one base row and every modified column map to exactly one base column?”

## 10. What this unlocks
Mastery of views and their updatability rules is the prerequisite for writing safe, maintainable data-access layers, implementing row-level security through views, and understanding materialized views and query rewrite engines.

- Next: Materialized views and refresh strategies  
- Next: Row-level security policies expressed as view predicates  
- Next: Query rewrite optimization in cost-based planners  
- Next: INSTEAD OF triggers on non-updatable views

## 11. Self-check — five questions, no answers
1. Write the CREATE VIEW statement for a view that exposes only the columns emp_id and salary from an employee table where salary > 50000; can you insert through it?  
2. A view contains the clause SELECT DISTINCT dept_id FROM employee. Is the view updatable? Justify in one sentence.  
3. You add WITH CHECK OPTION to a view whose predicate is dept_id = 10. After an UPDATE that changes dept_id to 20, what occurs?  
4. Construct a minimal counter-example showing why a view over a self-join cannot be updatable.  
5. Given the formal definition in section 7, prove that the presence of a COUNT(*) expression violates the required syntactic form.