## 1. The one-sentence answer
**A view is a stored SELECT query that behaves like a virtual table, and an updatable view lets you run INSERT, UPDATE, or DELETE directly on it provided the underlying query meets strict structural rules.**

A view hides complexity by giving you a named result set you can query repeatedly without rewriting the SELECT every time. When you create the view, the database stores only the definition, not the data, so any change in base tables immediately appears when you query the view. Updatability adds a second layer: the DBMS must be able to translate a modification on the view back to exactly one row in exactly one base table.

> [!NOTE]
> The single most important “aha” is that a view is not a copy of data; it is a macro that the optimizer expands at query time, and updatability fails the moment that expansion becomes ambiguous.

## 2. Why this matters — concrete and current
PostgreSQL 16 uses updatable views in its logical replication publication filters so that applications can modify only the projected columns without touching the publication definition.  
Google BigQuery exposes authorized views that let analysts query sensitive tables while the underlying schema stays hidden; the view itself is updatable only through carefully written INSTEAD OF triggers.  
In semiconductor design at TSMC, the tape-out database uses views to present a “golden netlist” to verification tools; any UPDATE through the view is automatically validated against DRC rules stored in the base tables.  
Airbus’s aircraft configuration system stores millions of part relationships; maintenance crews interact exclusively through updatable views that enforce weight-and-balance constraints before any row is changed.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Base table & column  | Views are defined on existing tables; column names must resolve unambiguously. |
| SELECT statement     | The entire view body is a SELECT; you must understand projection, selection, and joins. |
| Primary key          | Updatability rules require that the DBMS can identify exactly one target row. |
| Transaction semantics| Modifications through views participate in the same ACID transaction as direct table changes. |

If any of these are shaky, pause and review the parent “Tables and Keys” material first.

## 4. Building the idea — from intuition to formalism

### Step 1 — A view is a named query, not stored rows
A view stores only the SELECT text. When you reference the view name, the DBMS substitutes the definition and optimizes the combined query.  
Example: `CREATE VIEW high_earners AS SELECT emp_id, salary FROM employees WHERE salary > 100000;`  
Formal statement:  
$$ V = \{ t \mid t \in \pi_{A}( \sigma_{P}(R) ) \} $$  
where \(R\) is the base relation, \(P\) the predicate, and \(A\) the projected attributes.

> [!WARNING]
> If you later drop a column used inside the view definition, the view becomes invalid even though no data was copied.

### Step 2 — Updatability requires a one-to-one row mapping
The DBMS must translate an UPDATE on the view into an UPDATE on exactly one base-table row. Any construct that loses this mapping (DISTINCT, GROUP BY, JOIN, UNION, aggregate) makes the view read-only.

### Step 3 — WITH CHECK OPTION enforces predicate fidelity
When you add `WITH CHECK OPTION`, an INSERT or UPDATE must satisfy the view’s WHERE clause after the modification; otherwise the operation is rejected.

### Step 4 — INSTEAD OF triggers bypass syntactic limits
If the view contains a join, you can still make it updatable by writing an INSTEAD OF trigger that decomposes the modification into the correct base-table statements.

### Step 5 — Column updatability is finer-grained than table updatability
Even in a simple view, a column derived from an expression (e.g., `salary * 1.1`) is never updatable; only columns that map directly to a base-table column can be modified.

### Step 6 — Textbook-grade statement
A view \(V\) defined on base table \(R\) is updatable if and only if there exists a function \(f\) such that for every tuple \(v\) in an update on \(V\), \(f(v)\) produces a unique tuple in \(R\) and the mapping is total and injective on the key attributes.

## 5. Worked examples — har step show karo

**Example 1 — Simple updatable view**  
*Given:* table `employees(emp_id PK, name, dept_id, salary)`.  
*Find:* create a view showing only IT department employees and raise one salary through the view.  
Step 1: `CREATE VIEW it_employees AS SELECT emp_id, name, salary FROM employees WHERE dept_id = 3;`  
Step 2: `UPDATE it_employees SET salary = salary * 1.1 WHERE emp_id = 42;`  
*Why:* the WHERE clause references only a single base table and the primary key is present, so the DBMS rewrites the UPDATE directly on `employees`.  
**Final answer:** salary of employee 42 increased by 10 % in the base table.

*Reflection:* The example stays trivial so the mapping stays obvious; any added join would break it.

**Example 2 — View with expression column**  
*Given:* same `employees` table.  
*Find:* can you update the computed column?  
`CREATE VIEW payroll AS SELECT emp_id, salary, salary*1.1 AS gross FROM employees;`  
Attempt: `UPDATE payroll SET gross = 50000 WHERE emp_id = 42;`  
*Why:* `gross` is not a base column; SQL standard forbids the update.  
**Final answer:** error — column is not updatable.

*Reflection:* Expression columns are the most common silent failure students encounter.

**Example 3 — WITH CHECK OPTION**  
*Given:* `CREATE VIEW high_earners AS SELECT * FROM employees WHERE salary > 100000 WITH CHECK OPTION;`  
*Find:* effect of lowering salary below threshold.  
`UPDATE high_earners SET salary = 90000 WHERE emp_id = 7;`  
*Why:* the new value violates the view predicate, so the DBMS rejects the row.  
**Final answer:** update fails with CHECK OPTION violation.

*Reflection:* CHECK OPTION protects data integrity without requiring application-level guards.

**Example 4 — Join view made updatable via trigger**  
*Given:* `emp` and `dept` tables joined in a view.  
*Find:* allow UPDATE on employee name through the view.  
Create an INSTEAD OF UPDATE trigger that issues the UPDATE only against the `emp` table using the primary-key value.  
**Final answer:** view now accepts the UPDATE and the change appears in the base table.

*Reflection:* Triggers restore updatability when relational algebra loses injectivity.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming every view is updatable  | Student forgets DISTINCT/GROUP BY silently appear   | Always inspect the SELECT list before writing DML    |
| Updating an expression column     | Column looks writable in SELECT * output            | Check information_schema for is_updatable flag       |
| Forgetting schema binding         | Base table column renamed; view breaks silently     | Use WITH SCHEMABINDING (SQL Server) or equivalent    |
| Ignoring CHECK OPTION side-effect | Row disappears after update                         | Add WITH CHECK OPTION when predicate must hold       |
| Using ORDER BY inside view        | ORDER BY is ignored or causes errors in some DBMS   | Sort only at the final SELECT that queries the view  |
| Multi-table view without trigger  | Attempt DML and receive “not updatable” error       | Create INSTEAD OF trigger or split into multiple views |

## 7. The textbook-precise statement
“A view is updatable if it is a simple view: the defining query references exactly one base table, contains no aggregate functions, no GROUP BY or HAVING, no DISTINCT, no set operators, and every select-list element is a simple column reference (not an expression). In addition, the base table must possess a key that is fully included in the view.” — Elmasri & Navathe, *Fundamentals of Database Systems*, 7e, §5.3.

## 8. Visual — diagram or schematic
```text
Base table employees
+------------------+
| emp_id (PK)      |
| name             |
| dept_id          |
| salary           |
+------------------+
          ▲
          │ 1:1 mapping (emp_id preserved)
          │
View it_employees
+------------------+
| emp_id (PK)      |
| name             |
| salary           |
+------------------+
```
The arrow shows that every row in the view corresponds to exactly one row in the base table; any deviation (join, aggregate) removes this arrow and updatability collapses.

## 9. The memory technique
1. **The hook** — Picture a transparent sheet laid over a paper spreadsheet; you can write on the sheet, but the marks actually appear on the paper underneath only when the sheet is perfectly aligned (primary key present, no folds = no joins/aggregates).
2. **What to overlearn** — “One base table, no aggregates, key fully visible” — the three-word test before any DML on a view.
3. **Spaced-repetition schedule** — Review the three-word test after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — If you forget the rules, ask: “Can the DBMS still locate exactly one row using only columns visible in the view?” If the answer is no, the view is read-only.

## 10. What this unlocks
Mastering views and their updatability rules lets you design clean data-access layers, implement row-level security, and safely expose subsets of tables to applications.  
- Next you will study materialized views and their refresh semantics.  
- You will also meet INSTEAD OF triggers in depth when you cover stored procedures.  
- Security views appear again in the authorization and grant-model lessons.

## 11. Self-check — five questions, no answers
1. Write the CREATE VIEW statement for a view that shows only employees whose salary is above the department average; is the view updatable?  
2. A view contains `SELECT dept_id, COUNT(*) FROM employees GROUP BY dept_id`. Attempt an UPDATE on `COUNT(*)`. What error do you expect and why?  
3. Explain the difference in behaviour between a view created with and without `WITH CHECK OPTION` when an UPDATE tries to move a row outside the original predicate.  
4. Given a view joining `orders` and `customers` on `customer_id`, list the minimal trigger actions required to make an UPDATE on `order_date` succeed.  
5. Using the information_schema, write a query that lists all updatable columns of a given view; then explain what the result would be for a view containing an arithmetic expression in its SELECT list.