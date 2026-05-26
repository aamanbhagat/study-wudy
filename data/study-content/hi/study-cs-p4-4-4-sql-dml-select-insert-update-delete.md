## 1. The one-sentence answer
**SQL DML commands let you read, add, change, and remove rows inside tables that already exist.**

SELECT pulls specific rows and columns from one or more tables using conditions you write. INSERT adds new rows, UPDATE modifies values in existing rows, and DELETE removes rows that match a condition. Together they form the everyday language you use to manipulate stored data instead of merely defining the schema.

These four statements are the only ones you need for 90 % of application-level data work. They operate on sets rather than single values, so one statement can affect thousands of rows at once. Because every mainstream database implements the same core syntax, the same queries run on PostgreSQL, MySQL, SQL Server, or SQLite with only minor dialect differences.

> [!NOTE]
> The single most important realisation is that every DML statement returns a result set (or row count) rather than a single scalar; you must therefore think in terms of whole tables, not individual cells.

## 2. Why this matters — concrete and current
In the backend of Stripe’s payment ledger, an UPDATE statement atomically changes the status column of a million transaction rows when a daily reconciliation batch finishes, ensuring that financial reports stay consistent without locking the entire table for minutes.

SpaceX’s telemetry pipeline uses a nightly INSERT … SELECT pattern to copy raw sensor readings from a high-throughput staging table into a compressed, partitioned archive table; the same pattern appears in every aerospace data warehouse that must keep raw and aggregated data separate.

When an ML training job on Google’s internal Vertex AI platform finishes, a DELETE statement removes every row whose feature vector contains nulls above a configurable threshold, preventing the next training iteration from ingesting corrupted examples.

Airbnb’s pricing engine runs a single UPDATE that joins the listings table with a temporary table of dynamic price multipliers; the join condition guarantees that only listings whose city matches the current demand surge are touched, keeping the rest of the catalogue untouched.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Relational table         | Every DML statement targets exactly one base table or view |
| Primary key              | Identifies which rows UPDATE and DELETE will affect       |
| WHERE clause predicate   | Filters the set of rows before any modification occurs    |
| Transaction              | Guarantees that a sequence of DML statements either all succeed or all roll back |

If any of the above rows are unfamiliar, pause and read the corresponding section on relational tables and transactions first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the target table
You must name exactly one table (or updatable view) that the statement will touch.  
Example: `UPDATE accounts SET balance = balance + 100;` targets the accounts table.  
Formal statement:  
$$ \text{DML} ::= \text{SELECT} \mid \text{INSERT} \mid \text{UPDATE} \mid \text{DELETE} \quad \text{over table } T $$  
> [!WARNING]  
> Writing two table names without a JOIN produces a syntax error; the parser never guesses which table you meant.

### Step 2 — Write the row filter (WHERE)
A predicate decides which rows participate. Without it, every row is selected.  
Example: `DELETE FROM logs WHERE created_at < '2023-01-01';` removes only old rows.  
Formal:  
$$ \sigma_{\text{predicate}}(T) $$  
> [!WARNING]  
> Omitting WHERE on UPDATE or DELETE silently modifies or removes every row; most production incidents originate here.

### Step 3 — Specify the columns or values to change
SELECT lists columns, INSERT lists values or a subquery, UPDATE lists assignments.  
Example: `INSERT INTO users (id, name) VALUES (42, 'Ada');`  
Formal:  
$$ \text{INSERT INTO } T (c_1,\dots,c_k) \text{ VALUES } (v_1,\dots,v_k) $$  
> [!WARNING]  
> Column count mismatch between the list and the VALUES clause raises a runtime error.

### Step 4 — Execute atomically inside a transaction
Wrap related statements so the database either commits all changes or rolls them back.  
Example: `BEGIN; UPDATE …; INSERT …; COMMIT;`  
Formal: ACID property guarantees atomicity of the DML batch.  
> [!WARNING]  
> Without an explicit transaction, each statement commits immediately; partial failure leaves the database in an inconsistent state.

### Step 5 — Return feedback to the caller
Every DML statement yields either a result set (SELECT) or an affected-row count (others).  
Formal:  
$$ \text{result} = \begin{cases} \text{relation} & \text{if SELECT} \\ \text{rowcount} & \text{otherwise} \end{cases} $$

## 5. Worked examples — har step show karo

**Example 1 — Simple row insertion**  
*Given:* Empty table `students(id INTEGER PRIMARY KEY, name TEXT)`.  
*Find:* Add one student named “Riya”.  
Step 1: Name the table → `INSERT INTO students`.  
Step 2: List columns and values → `(id, name) VALUES (1, 'Riya')`.  
*Why:* Explicit column list prevents future schema changes from breaking the statement.  
**Final answer**  
```sql
INSERT INTO students (id, name) VALUES (1, 'Riya');
```
*Reflection:* The example is trivial yet forces you to declare both schema order and value order; the same discipline scales to multi-row inserts.

**Example 2 — Conditional update**  
*Given:* Table `products(id, price)` with several rows.  
*Find:* Raise price by 10 % only for products whose current price is below 100.  
Step 1: Target table → `UPDATE products`.  
Step 2: Assignment → `SET price = price * 1.10`.  
Step 3: Filter → `WHERE price < 100`.  
*Why:* The WHERE predicate is evaluated before any value is written, so the multiplier uses the original price.  
**Final answer**  
```sql
UPDATE products SET price = price * 1.10 WHERE price < 100;
```
*Reflection:* Using the column itself on the right-hand side demonstrates that expressions are allowed, not only literals.

**Example 3 — Delete with join-like condition**  
*Given:* Tables `orders` and `customers`.  
*Find:* Remove orders belonging to customers from a specific city.  
Step 1: Use subquery in WHERE → `DELETE FROM orders WHERE customer_id IN (…)`.  
Step 2: Subquery selects ids from customers table.  
*Why:* A subquery avoids an explicit join that would otherwise be disallowed in the DELETE target list.  
**Final answer**  
```sql
DELETE FROM orders
WHERE customer_id IN (SELECT id FROM customers WHERE city = 'Mumbai');
```
*Reflection:* Subqueries keep the syntax simple while still expressing relational conditions.

**Example 4 — Transaction-wrapped batch**  
*Given:* Two tables that must stay consistent.  
*Find:* Transfer 500 rupees from account A to account B.  
Step 1: Begin transaction.  
Step 2: Two UPDATE statements.  
Step 3: Commit only if both succeed.  
**Final answer**  
```sql
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 'A';
UPDATE accounts SET balance = balance + 500 WHERE id = 'B';
COMMIT;
```
*Reflection:* The example shows why atomicity matters; a crash between the two updates would otherwise leave money missing.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Missing WHERE on UPDATE/DELETE    | Muscle memory from SELECT statements        | Always write WHERE first, then remove only if you truly intend every row |
| Column-list / value-list mismatch | Copy-paste from another query               | Count columns on both sides before execution |
| Using = instead of IN with subquery | Expecting scalar comparison                 | Use IN when subquery can return multiple rows |
| Forgetting to commit              | Interactive shell auto-commits, scripts do not | Explicitly COMMIT or use autocommit=false    |
| Updating a column used in WHERE   | Expression evaluated after filter           | Store original value in a variable or subquery |
| NULL handling in predicates       | Three-valued logic surprises                | Add explicit IS NULL checks when needed      |
| Locking escalation                | Large DELETE without batching               | Delete in small batches inside a loop        |

## 7. The textbook-precise statement
A Data Manipulation Language (DML) statement in SQL is any statement that operates on the instance of a relation rather than its schema. The four core statements are defined as follows (Elmasri & Navathe, *Fundamentals of Database Systems*, 7e, §6.4):

- SELECT: \(\pi_{A_1,\dots,A_k}(\sigma_P(R))\)  
- INSERT: \(R \leftarrow R \cup \{(v_1,\dots,v_n)\}\) or \(R \leftarrow R \cup \pi_{A}(S)\)  
- UPDATE: \(R \leftarrow \{ t' \mid t\in R, t' = t[A\leftarrow E] \text{ if } P(t) \text{ else } t \}\)  
- DELETE: \(R \leftarrow \{ t \in R \mid \neg P(t) \}\)

All statements are executed inside the context of a transaction whose isolation level determines visibility of concurrent modifications.

## 8. Visual — diagram or schematic
```text
          ┌────────────────────┐
          │   SQL DML Engine   │
          └─────────┬──────────┘
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
   SELECT      UPDATE/DELETE  INSERT
   (read)      (modify)       (append)
        │           │           │
        ▼           ▼           ▼
   Result set   Affected rows  Row count
```

## 9. The memory technique
1. **The hook** — Picture four coloured arrows on a whiteboard: blue SELECT pointing left (read), green INSERT pointing right (add), orange UPDATE forming a loop (change), red DELETE crossing out (remove).  
2. **What to overlearn** — The exact syntax skeleton of each command and the fact that WHERE filters before any change.  
3. **Spaced-repetition schedule** — Review the four skeletons after 1 day, 3 days, 7 days, 16 days, and 35 days.  
4. **First-principles fallback** — If syntax is forgotten, reconstruct from set operations: read a subset, union new tuples, replace tuples that satisfy a predicate, or remove tuples that satisfy a predicate.

## 10. What this unlocks
Mastery of these four statements lets you move on to joins, aggregations, window functions, and stored procedures without syntax friction.  

- Multi-table joins become possible only after you can filter single tables reliably.  
- Views and triggers are built on top of the same DML semantics.  
- ORM libraries ultimately emit these exact statements; understanding them helps debug generated SQL.

## 11. Self-check — five questions, no answers
1. Write a single UPDATE that swaps the values of two columns in every row.  
2. How many rows are affected by `DELETE FROM t;` when the table is empty?  
3. Explain why `UPDATE t SET x = 5 WHERE x = (SELECT MAX(x) FROM t);` may update zero rows even though the subquery returns a value.  
4. Construct an INSERT statement that copies every row from table A into table B while automatically generating new primary-key values.  
5. Identify the isolation-level anomaly that can occur if two concurrent transactions each run an UPDATE on overlapping row sets without explicit locking.