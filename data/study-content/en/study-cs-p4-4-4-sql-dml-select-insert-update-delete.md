## 1. The one-sentence answer
**SQL DML consists of the four statements SELECT, INSERT, UPDATE, and DELETE that retrieve, add, modify, and remove rows inside relational tables.**

These statements operate on data values rather than on table definitions. SELECT returns a result set derived from one or more tables; the other three change stored rows and must usually be followed by an explicit or implicit commit before the changes become permanent. Because every production database application ultimately rests on these four operations, mastery of their syntax and semantics is the foundation of all higher-level database work.

The statements are declarative: you describe the rows you want rather than writing loops that walk through storage. The database engine decides the physical access path, yet the logical effect on the data is fully defined by the SQL you write.

> [!NOTE]
> The single most important insight is that SELECT never alters data; the other three statements are the only ones that produce persistent change, and they act on sets of rows, never on individual cells in isolation.

## 2. Why this matters — concrete and current
SpaceX telemetry pipelines store sensor readings in PostgreSQL clusters; SELECT statements with time-range predicates and window functions allow flight controllers to reconstruct vehicle state within milliseconds after each telemetry packet arrives.

Stripe’s core ledger uses a single UPDATE statement wrapped in a serializable transaction to atomically move funds between accounts; any failure path must guarantee that the same UPDATE either completes or rolls back, preserving double-entry invariants across billions of dollars.

Google’s Spanner-backed advertising system executes carefully batched INSERT statements at peak rates exceeding one million rows per second during global shopping events; the statements must respect regional replication constraints while still returning row counts to the application layer.

CERN’s LHC experiment databases rely on DELETE statements qualified by foreign-key cascades to purge obsolete collision-event metadata after analysis jobs finish; an incorrect predicate can erase weeks of irreplaceable detector calibration data.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Relation, tuple, attribute | Every DML statement is defined over tables whose rows are tuples and whose columns are attributes. |
| Primary key                | Uniquely identifies the rows that UPDATE and DELETE must target. |
| Foreign key                | Determines whether an INSERT or DELETE violates referential integrity. |
| Transaction                | Groups multiple DML statements so that either all succeed or none do. |
| NULL                       | Three-valued logic affects every WHERE clause and therefore every affected row count. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A table is an unordered multiset of rows
A table holds rows that share the same column names and types. Order among rows is not defined unless an ORDER BY clause is supplied later.

Example: the table  
```text
employees(emp_id, name, salary)
1 | Alice | 90000
2 | Bob   | 80000
```
contains two rows. Adding a third row does not change the identity of the first two.

Formally, a table \(T\) is a multiset of tuples drawn from the Cartesian product of the column domains.

> [!WARNING]
> Treating tables as ordered lists leads to incorrect assumptions about which row an UPDATE without a WHERE clause will affect first.

### Step 2 — SELECT projects and restricts without side effects
SELECT chooses a subset of columns (projection) and a subset of rows (restriction via WHERE) and returns a new multiset.

Example:  
```sql
SELECT name FROM employees WHERE salary > 85000;
```
returns only the name “Alice”.

Formally:  
\[
\pi_{A_1,\dots,A_k}(\sigma_P(T))
\]

> [!WARNING]
> Omitting WHERE when you intend a restriction returns the entire table, silently producing far more rows than expected.

### Step 3 — INSERT adds complete rows or row sets
INSERT places one or more new tuples into a named table. Column lists may be omitted only when every column receives a value.

Example:  
```sql
INSERT INTO employees(emp_id, name, salary) VALUES (3, 'Carol', 95000);
```

Formally the operation yields a new table \(T' = T \cup \{t\}\) where \(t\) is the inserted tuple.

> [!WARNING]
> Inserting a row whose primary-key value already exists violates entity integrity and aborts the statement.

### Step 4 — UPDATE replaces values inside existing rows
UPDATE changes one or more column values inside every row that satisfies an optional predicate.

Example:  
```sql
UPDATE employees SET salary = salary * 1.1 WHERE emp_id = 2;
```

Formally:  
\[
T' = \{ t' \mid t \in T, t' = \text{modify}(t, P) \}
\]

> [!WARNING]
> An UPDATE without WHERE modifies every row; this is the most common source of accidental mass changes in production.

### Step 5 — DELETE removes rows that match a predicate
DELETE discards every row satisfying the WHERE clause.

Example:  
```sql
DELETE FROM employees WHERE emp_id = 3;
```

Formally:  
\[
T' = \{ t \in T \mid \neg P(t) \}
\]

> [!WARNING]
> DELETE without WHERE empties the table while preserving its schema—an irreversible loss of data unless a prior backup exists.

### Step 6 — The four statements together define the closed data-manipulation algebra
Any sequence of INSERT, UPDATE, and DELETE statements followed by SELECT statements yields a well-defined new database state observable through the final SELECT. This closure property lets every higher-level construct (views, triggers, stored procedures) be reduced to these primitives.

## 5. Worked examples — every step shown

**Example 1 — Simple retrieval**  
*Given:* table `products(id, price)` with rows (1,10), (2,20).  
*Find:* names of products costing more than 15.  

Step 1: Write the restriction predicate `price > 15`.  
*Why:* Only rows satisfying the predicate survive.  

Step 2: Project the column list `id`.  
*Why:* SELECT lists only the columns required.  

Final result:  
**1 row returned: id = 2**

*Reflection:* The example is trivial yet illustrates that SELECT never mutates storage.

**Example 2 — Conditional update**  
*Given:* `employees(emp_id, salary)` containing (1,50000), (2,60000).  
*Find:* Give employee 2 a 10 % raise.  

Step 1: Identify the target row with `emp_id = 2`.  
*Why:* Primary key guarantees uniqueness.  

Step 2: Compute the new value `salary * 1.1`.  
*Why:* The SET clause evaluates expressions against the old row.  

Step 3: Execute the update inside an implicit transaction.  
*Why:* Atomicity ensures the salary changes or stays unchanged.  

**2 rows examined, 1 row updated**

*Reflection:* The predicate prevents the first employee’s salary from changing.

**Example 3 — Multi-row insert**  
*Given:* empty table `audit_log(event_time, message)`.  
*Find:* Record two events at once.  

Step 1: Supply a column list matching the table definition.  
*Why:* Explicit lists survive later schema additions.  

Step 2: Provide two parenthesized value tuples.  
*Why:* The VALUES clause is itself a table constructor.  

**2 rows inserted**

*Reflection:* One statement can insert an arbitrary number of rows; each row is independent.

**Example 4 — Delete with foreign-key cascade**  
*Given:* `orders(order_id)` and `items(order_id, item_id)` with a foreign key.  
*Find:* Remove order 42 and all its items.  

Step 1: Delete from the child table first or rely on ON DELETE CASCADE.  
*Why:* Referential integrity forbids orphan rows.  

Step 2: Delete the parent row.  
*Why:* The parent can be removed only after dependents are gone or cascaded.  

**5 child rows + 1 parent row deleted**

*Reflection:* The example demonstrates that DELETE semantics are constrained by schema declarations.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| UPDATE or DELETE without WHERE    | Muscle memory from SELECT statements        | Always write the predicate first, then the verb |
| Confusing INSERT … SELECT with SELECT alone | Both start with SELECT                      | Remember INSERT is required to store results |
| Assuming SELECT locks rows        | SELECT is read-only by definition           | Use SELECT … FOR UPDATE when locking is needed |
| Ignoring NULL in WHERE clauses    | Three-valued logic yields UNKNOWN           | Explicitly test IS NULL or IS NOT NULL       |
| Column order in INSERT            | Values are matched positionally when list omitted | Always list target columns                   |
| Case sensitivity of identifiers   | Unquoted identifiers fold to lower case in some engines | Quote identifiers or adopt a consistent casing convention |
| Forgetting LIMIT on DELETE/UPDATE | Some dialects allow LIMIT, others do not    | Test the SELECT version of the predicate first |

## 7. The textbook-precise statement
A DML statement is any of the following four forms (Elmasri & Navathe, *Fundamentals of Database Systems*, 7e, §6.4):

- `SELECT [DISTINCT] <attribute-list> FROM <table-list> [WHERE <predicate>] [GROUP BY …] [HAVING …] [ORDER BY …]`
- `INSERT INTO <table-name> [(<column-list>)] {VALUES (<value-list>) | <query>}`
- `UPDATE <table-name> SET <column> = <expression> [, …] [WHERE <predicate>]`
- `DELETE FROM <table-name> [WHERE <predicate>]`

Each statement is executed inside the context of a transaction; its effect on the database state is defined only after the transaction commits.

## 8. Visual — diagram or schematic
```text
          ┌─────────────────────────────────────────────┐
          │                  Database                   │
          │  ┌──────────────┐   ┌────────────────────┐  │
          │  │   employees  │   │   audit_log        │  │
          │  │ emp_id PK    │   │ event_time         │  │
          │  │ name         │   │ message            │  │
          │  │ salary       │   │                    │  │
          │  └──────┬───────┘   └────────────────────┘  │
          │         │                                   │
          │   SELECT│INSERT│UPDATE│DELETE               │
          │         ▼                                   │
          │   Application / User                        │
          └─────────────────────────────────────────────┘
```
The four arrows leaving the application represent the only operations that read or write row data.

## 9. The memory technique

1. **The hook** — Picture four colored levers on a control panel: blue (SELECT, read-only), green (INSERT, add), orange (UPDATE, change), red (DELETE, remove). Pulling the red lever without a safety guard is visually alarming.
2. **What to overlearn** — The exact keywords SELECT, INSERT, UPDATE, DELETE and the fact that only the last three change state.
3. **Spaced-repetition schedule** — Review syntax at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive any statement by asking: “Which rows do I need? Which columns? Do I read or write?”

## 10. What this unlocks
These four statements are the sole means by which application code ever observes or changes persistent data; every subsequent topic—indexes, query optimization, concurrency control, triggers, views, and stored procedures—exists only to make these statements faster or safer.

- Indexing strategies are chosen to accelerate the WHERE clauses inside SELECT, UPDATE, and DELETE.
- ACID transactions are defined by their effect on sequences of these statements.
- Query planners rewrite the same four constructs.
- Object-relational mappers ultimately emit these statements.

## 11. Self-check — five questions, no answers
1. Write a single DELETE statement that removes every row from a table while leaving its schema intact.
2. An UPDATE statement without a WHERE clause is executed on a table of 10 000 rows. How many rows are affected?
3. Explain why `SELECT * FROM t WHERE id = 5;` followed by `UPDATE t SET x = 0 WHERE id = 5;` may still return different data on the next SELECT.
4. A foreign-key constraint exists from `orders.customer_id` to `customers.id`. Which DML statement on `customers` can fail because of this constraint?
5. Construct an INSERT statement that copies every row from table `old_data` into table `new_data` while automatically supplying a constant value for an audit column that does not exist in `old_data`.