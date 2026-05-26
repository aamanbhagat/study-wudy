## 1. The one-sentence answer
**A subquery is uncorrelated when it executes independently of the outer query and correlated when it references outer-query columns and therefore re-executes for each candidate row.**

An uncorrelated subquery produces a single result set once; the outer query then treats that set as a constant. A correlated subquery, by contrast, contains a reference such as `outer_table.column` inside its `WHERE` clause, so the database engine must supply a fresh value from the current outer row and run the subquery again. The distinction therefore decides both correctness and performance: uncorrelated subqueries can be materialised or cached, while correlated ones behave like nested loops.

The execution engine rewrites an uncorrelated subquery into a join or a semi-join whenever the optimiser sees that no outer reference exists. When an outer reference is present, the plan necessarily contains a correlated nested-loop or apply operator.

> [!NOTE]
> The single most important “aha” is that correlation is not a syntactic property of the keyword `SELECT` but a data-flow property: if the subquery can be evaluated with zero knowledge of any outer row, it is uncorrelated.

## 2. Why this matters — concrete and current
PostgreSQL’s query planner uses the presence or absence of correlation to decide whether a subquery can be promoted to a CTE or materialised view; this optimisation is visible in `EXPLAIN (ANALYZE)` output for every production workload at companies such as Uber and Stripe.

In Snowflake and BigQuery, uncorrelated subqueries are automatically cached across multiple statements inside the same transaction, directly reducing billed bytes scanned for analytical dashboards at Airbnb and Spotify.

Oracle’s cost-based optimiser rewrites correlated subqueries into `EXISTS` or `IN` semi-joins only when the correlation predicate is an equality; this rewrite is essential for the high-throughput order-matching engine at financial exchanges such as CME.

Inside the query layer of modern HTAP systems such as TiDB and CockroachDB, the distinction determines whether a subquery can be pushed down to storage nodes or must be executed at the SQL gateway, affecting tail latency for real-time fraud-detection queries.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Single-table `SELECT`    | You must already be able to write and read a simple query before nesting one inside another. |
| `WHERE` and `IN`/`EXISTS`| Correlation appears only inside predicates; you need to recognise when a predicate references an outer column. |
| Row vs set semantics     | An uncorrelated subquery returns a set; a correlated one returns a value per outer row. |

If any row is missing, pause and review basic SQL filtering before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the outer reference
A subquery is correlated exactly when it contains a column whose table is introduced in an outer `FROM` clause.  
Example: `SELECT * FROM orders o WHERE EXISTS (SELECT 1 FROM line_items li WHERE li.order_id = o.id)`. Here `o.id` is the outer reference.  
Formal statement: let \( Q_o \) be the outer query and \( Q_s \) the subquery; \( Q_s \) is correlated iff \( \text{attrs}(Q_s) \cap \text{attrs}(Q_o) \neq \emptyset \).  
> [!WARNING]  
> Students often assume any nested `SELECT` is correlated; the test is strictly the presence of an outer column, not indentation.

### Step 2 — Execution semantics of an uncorrelated subquery
The engine materialises the subquery result once, then substitutes that constant into the outer predicate.  
Example: `SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products)`. The average is computed once.  
Formal statement: evaluation order is \( R_s \leftarrow Q_s; \quad \sigma_{p(R_s)}(R_o) \).  
> [!WARNING]  
> If you later add an outer reference, the plan changes from a one-time scan to a nested loop; cost estimates become invalid.

### Step 3 — Execution semantics of a correlated subquery
For each tuple \( t \) produced by the outer query, the engine substitutes the values of \( t \) into the correlation predicates and re-evaluates \( Q_s \).  
Formal statement: \( \bigcup_{t \in R_o} \sigma_{p(t)}(Q_s(t)) \).  
> [!WARNING]  
> Without an index on the correlation column, this becomes an \( O(|R_o| \times |R_s|) \) scan; many production timeouts originate here.

### Step 4 — Algebraic equivalence to joins
An uncorrelated `IN` subquery is equivalent to a semi-join; a correlated `EXISTS` subquery is equivalent to a dependent join (apply).  
Formal rewrite: \( R_o \ltimes_{p} R_s \) (semi-join) versus \( R_o \bowtie_{p} R_s \) with lateral input.

### Step 5 — Optimiser decision surface
Modern cost-based optimisers (PostgreSQL, SQL Server, Oracle) attempt to unnest correlated subqueries when the correlation predicate is equi-join and the subquery is not `DISTINCT` or aggregate. The final logical operator is therefore chosen after decorrelation, not before.

## 5. Worked examples — har step show karo

**Example 1 — Simple uncorrelated scalar subquery**  
*Given:*  
```sql
SELECT name FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```  
*Find:* execution count of the inner query.  
Step 1: parser detects no outer column inside the inner `SELECT`.  
Step 2: engine runs the aggregate once, stores the scalar.  
Step 3: outer scan uses the constant.  
*Why* each move: absence of correlation column allows single evaluation.  
**Final answer: inner query executes exactly once.**  
*Reflection:* the query is safe to materialise; adding any outer reference would change the count to |employees|.

**Example 2 — Correlated EXISTS**  
*Given:*  
```sql
SELECT c.name FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.cust_id = c.id);
```  
*Find:* number of subquery executions on a table of 10 000 customers.  
Step 1: locate outer reference `c.id`.  
Step 2: for each customer row the engine binds `c.id` and runs the inner scan.  
*Why* the binding step: correlation predicate must be satisfied per outer tuple.  
**Final answer: up to 10 000 executions (or index lookups if indexed).**  
*Reflection:* index on `orders.cust_id` reduces each execution to O(log n).

**Example 3 — Uncorrelated rewritten as join**  
*Given:* the same scalar subquery from Example 1.  
Optimiser rewrites to  
```sql
SELECT e.name FROM employees e
CROSS JOIN (SELECT AVG(salary) AS avg_sal FROM employees) a
WHERE e.salary > a.avg_sal;
```  
*Why* the rewrite: uncorrelated subqueries are semantically independent and therefore joinable.  
**Final answer: single hash or merge join instead of nested loop.**  
*Reflection:* plan cost drops from O(n) subquery calls to O(n) join.

**Example 4 — Aggregate correlated subquery**  
*Given:*  
```sql
SELECT d.name,
       (SELECT COUNT(*) FROM employees e WHERE e.dept_id = d.id) AS emp_count
FROM departments d;
```  
Step-by-step: outer scan of departments, for each department bind `d.id`, count matching employees.  
*Why* the per-row count: the aggregate must see only rows that satisfy the correlation.  
**Final answer: result contains one row per department with its live count.**  
*Reflection:* this pattern is the classic “count per group” that can be rewritten with `GROUP BY` for better performance.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating every nested SELECT as correlated | Students look at indentation instead of column references | Scan the subquery for any `outer_alias.column` pattern before deciding |
| Forgetting NULL handling in `NOT IN` uncorrelated subqueries | `NOT IN (NULL, …)` yields UNKNOWN for every row | Prefer `NOT EXISTS` when the subquery may produce NULLs |
| Assuming correlated subqueries are always slower | When an index exists on the correlation column, lookup cost can be cheaper than materialising a large uncorrelated set | Check the index and run `EXPLAIN` |
| Writing `SELECT *` inside a correlated subquery used with `EXISTS` | Unnecessary columns are fetched yet ignored | Use `SELECT 1` or `SELECT NULL` to make intent explicit |
| Placing a correlated subquery in the SELECT list without an aggregate | Returns multiple rows and raises runtime error | Wrap with `MAX/MIN` or move the logic to `EXISTS` |
| Expecting the same plan after adding `DISTINCT` inside a correlated subquery | `DISTINCT` prevents most decorrelation rewrites | Remove `DISTINCT` if possible or accept the nested-loop cost |

## 7. The textbook-precise statement
A subquery \( S \) nested inside query \( Q \) is *uncorrelated* if the free attributes of \( S \) are disjoint from the attributes of \( Q \); otherwise \( S \) is *correlated*. Formally, let \( \text{sch}(Q) \) be the schema of the outer query. Then  
\[
\text{correlated}(S,Q) \iff \text{attrs}(S) \cap \text{sch}(Q) \neq \emptyset.
\]
Evaluation semantics: an uncorrelated subquery is evaluated once and its result is substituted; a correlated subquery is evaluated once per tuple of its correlated outer relation under the substitution of the correlation variables. (Elmasri & Navathe, *Fundamentals of Database Systems*, 7e, §6.3.3 and §7.1.4.)

## 8. Visual — diagram or schematic
```
Outer table scan
      │
      ▼
+------------------+          +------------------+
|  Uncorrelated    |          |   Correlated     |
|  subquery        |          |   subquery       |
|  (run once)      |          |   (run per row)  |
|  Result cached   |          |  Bind outer col  |
+------------------+          +------------------+
      │                               │
      ▼                               ▼
  Use constant                    Nested-loop
  in predicate                    join / apply
```

## 9. The memory technique
1. **The hook** — picture an uncorrelated subquery as a “pre-cooked meal” you prepare once and serve to every guest; a correlated subquery is a “made-to-order dish” cooked again each time a new guest arrives with their own dietary requirement written on their shirt (the outer column).  
2. **What to overlearn** — the single test `attrs(S) ∩ sch(Q) ≠ ∅`; the two execution counts (1 vs |outer|); the rewrite target (semi-join vs apply).  
3. **Spaced-repetition schedule** — review the definition after 1 day, redraw the ASCII diagram after 3 days, explain the cost difference on a real schema after 7 days, optimise a slow correlated query after 16 days, and re-derive the formal statement after 35 days.  
4. **First-principles fallback** — if you forget the names, ask only “does the inner query mention any column from the outer table?”; the answer immediately classifies the subquery and dictates the execution model.

## 10. What this unlocks
Mastery of correlated versus uncorrelated subqueries lets you reason about query plans, write index-friendly `EXISTS` predicates, and safely refactor slow scalar subqueries into joins or window functions.  

- Next topics: lateral joins / `LATERAL`, common-table-expression materialisation, and semi-/anti-join optimisation.  
- Directly enables understanding of window-function framing and recursive CTE termination checks.

## 11. Self-check — five questions, no answers
1. Rewrite the following uncorrelated subquery as an explicit join and state the new plan shape.  
2. Given a 1-million-row outer table and no index on the correlation column, estimate the I/O difference between a correlated `EXISTS` and an uncorrelated `IN`.  
3. Identify the correlation column(s) in a three-level nested query and predict how many times the innermost query runs.  
4. A developer replaced `NOT IN` with `NOT EXISTS` and the row count changed; explain the NULL-related semantic difference.  
5. Using only the formal test `attrs(S) ∩ sch(Q) ≠ ∅`, decide whether a subquery that references a CTE defined outside the outer query is correlated or uncorrelated.