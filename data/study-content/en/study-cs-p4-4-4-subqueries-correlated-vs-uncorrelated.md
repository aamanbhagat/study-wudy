## 1. The one-sentence answer
**A subquery is uncorrelated when it can be evaluated independently of every row produced by its enclosing query and correlated when its result depends on values supplied by that enclosing query.**

An uncorrelated subquery behaves like a constant or a fixed set that the outer query simply reads once. The database engine can materialise its result, store it in a temporary structure, and reuse that structure for every candidate row of the outer query. In contrast, a correlated subquery is re-executed for each outer row because it contains a reference—usually a column qualifier—to the outer relation; the inner predicate is therefore parametrised by the current outer tuple.

The distinction is not syntactic but semantic and operational. Two queries may look almost identical yet differ in whether an inner column reference resolves inside the subquery’s own FROM clause or reaches outward to an ancestor query block. That single difference dictates whether the optimiser may cache the subquery result or must treat it as a dependent computation.

> [!NOTE]
> The performance gulf between the two forms is often orders of magnitude; an uncorrelated subquery can be materialised once while a correlated one may be executed once per outer row, turning an O(n) plan into an O(n²) plan if the optimiser cannot decorrelate it.

## 2. Why this matters — concrete and current
In Google’s internal log-analysis pipelines running on BigQuery, analysts routinely embed uncorrelated scalar subqueries to compute global thresholds (for example, the 99th-percentile latency across an entire fleet) and then filter per-shard rows against that single constant; the engine materialises the threshold once and broadcasts it to every worker.

Air-traffic-control data systems at EUROCONTROL use correlated EXISTS subqueries to detect flight-plan conflicts: for each proposed trajectory the system checks whether any already-accepted flight occupies the same 4-D cell at the same second. Because the inner predicate references the candidate trajectory’s identifiers, the subquery must be re-evaluated per outer row; the resulting plan is deliberately left correlated so that spatial indexes can be applied inside each invocation.

Semiconductor yield-analysis teams at TSMC embed correlated subqueries inside analytic queries that compare each wafer’s metrology measurements against the lot-level statistics computed from the same wafer’s sibling dies. The correlation allows the query to avoid a self-join while still producing per-die deviation scores.

Payment-network fraud platforms at Stripe evaluate uncorrelated subqueries to materialise the set of cards that have triggered velocity rules in the last hour; that set is then used by a larger outer query that scores every incoming authorisation. The materialised set changes slowly enough that the uncorrelated form yields a stable, cacheable intermediate result.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Single-block SELECT–FROM–WHERE | Provides the syntactic container in which a subquery appears as a table expression, scalar expression, or predicate. |
| Column scoping rules     | Determines whether an unqualified column name inside the subquery resolves to the inner or an outer FROM clause. |
| Tuple iteration semantics| Explains why a correlated subquery receives a fresh parameter value for each outer tuple. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A subquery is simply a query nested inside another query
A SELECT statement may appear as a table source, a scalar expression, or a Boolean condition inside an outer SELECT. The inner query is called a subquery or nested query.  
Example:  
```sql
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```
The inner SELECT computes a single number that the outer predicate compares against each employee row.  
Formal statement: any query block Q may contain another query block Q′ as a constituent of its SELECT list, FROM clause, or WHERE clause.  
> [!WARNING] Treating every parenthesised SELECT as independent will later cause you to mis-predict both semantics and cost when the inner block references outer columns.

### Step 2 — Independence defines uncorrelated evaluation
When Q′ contains no column references that resolve to relations in Q, Q′ is independent of Q. The engine may therefore evaluate Q′ exactly once, store its result, and substitute that constant result wherever Q′ appears.  
Formal statement: if Free(Q′) ∩ Attr(Q) = ∅ then eval(Q′) is performed once.

### Step 3 — Correlation arises from outer-column references
If a column reference inside Q′ resolves to a relation mentioned in Q, the subquery is correlated. Evaluation of Q′ must now be repeated once for each tuple produced by Q, because each such tuple supplies a different binding for the free variable.  
Formal statement: let t be a tuple variable of Q; then Q′(t) denotes the subquery instantiated with t’s values.

### Step 4 — Execution model for uncorrelated case
The optimiser may rewrite the uncorrelated subquery as a common-table expression or as a constant table that participates in the outer join graph exactly once. No row-by-row parameter passing occurs.

### Step 5 — Execution model for correlated case
The engine conceptually performs a nested iteration: for each tuple t of the outer relation, bind the free variables of Q′ to t and evaluate Q′(t). The result of Q′(t) is then used to decide whether t survives the outer predicate. Modern engines attempt decorrelation (e.g., via lateral joins or semijoin rewriting) but the logical semantics remain row-by-row.

### Step 6 — Textbook distinction
A subquery is **correlated** with its outer query if and only if it contains at least one attribute reference that is bound by a relation in an ancestor query block; otherwise it is **uncorrelated**.

## 5. Worked examples — every step shown

**Example 1 — Simple uncorrelated scalar subquery**  
*Given:* the employees table with columns emp_id, dept_id, salary.  
*Find:* employees whose salary exceeds the company-wide average.  
Step 1: Compute AVG(salary) over the whole table.  
*Why:* No column from the outer query appears inside the aggregate; the subquery is independent.  
Step 2: Substitute the resulting scalar into the outer WHERE clause.  
*Why:* The scalar is a constant for the duration of the outer scan.  
**Final answer**  
```sql
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

**Example 2 — Uncorrelated subquery in FROM clause**  
*Given:* orders and customers tables.  
*Find:* total revenue per customer who has ever placed an order.  
Step 1: The inner query produces a fixed set of customer_ids.  
*Why:* The inner SELECT references only the orders table.  
Step 2: The outer query joins that set once.  
**Final answer**  
```sql
SELECT c.name, SUM(o.amount)
FROM customers c
JOIN (SELECT DISTINCT customer_id FROM orders) oc
  ON c.customer_id = oc.customer_id
GROUP BY c.name;
```

**Example 3 — Correlated EXISTS predicate**  
*Given:* employees and departments.  
*Find:* departments that have at least one employee earning more than 100 k.  
Step 1: For each department row d, evaluate the inner query with d.dept_id bound.  
*Why:* The predicate “e.dept_id = d.dept_id” reaches outward.  
Step 2: If the inner query returns any row, keep d.  
**Final answer**  
```sql
SELECT * FROM departments d
WHERE EXISTS (
  SELECT 1 FROM employees e
  WHERE e.dept_id = d.dept_id AND e.salary > 100000
);
```

**Example 4 — Correlated scalar subquery in SELECT list**  
*Given:* the same schema.  
*Find:* each employee together with the average salary of colleagues in the same department.  
Step 1: For each employee row e, compute AVG(salary) over rows whose dept_id equals e.dept_id.  
*Why:* The grouping condition references the current outer tuple.  
Step 2: Emit the computed average beside e.  
**Final answer**  
```sql
SELECT e.emp_id, e.salary,
       (SELECT AVG(salary) FROM employees e2
        WHERE e2.dept_id = e.dept_id) AS dept_avg
FROM employees e;
```

*Reflection:* The last two examples are identical in surface syntax yet differ only in the presence of an outer-column reference; recognising that single reference is the decisive diagnostic.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming every subquery with parentheses is uncorrelated | Visual similarity masks the column-resolution step | Trace every column reference to its FROM clause before classifying |
| Expecting the optimiser to decorrelate every correlated subquery | Decorrelation is not always possible or profitable | Measure actual plan cardinality and cost; add /*+ NO_DECORRELATE */ hints only after measurement |
| Using SELECT * inside a correlated EXISTS | Returns unnecessary columns and may change semantics if NULLs appear | Always write SELECT 1 or SELECT constant |
| Forgetting that a correlated subquery may be evaluated in arbitrary order | Outer tuples may be processed in any physical order | Never rely on side-effects or row-numbering inside the subquery |
| Confusing correlated subqueries with recursive CTEs | Both contain self-references, yet recursion is across iterations of the same query block | Check whether the reference is to an ancestor block (correlated) or to the CTE itself (recursive) |
| Placing a correlated subquery in an ON clause without LATERAL | Pre-ANSI SQL forbids forward references; many engines reject the query | Add the LATERAL keyword or rewrite as a join |
| Over-using correlated subqueries for simple lookups | Perceived readability hides quadratic cost | Replace with a JOIN or uncorrelated CTE when the inner query does not truly depend on every outer column |

## 7. The textbook-precise statement
A subquery Q′ nested inside query Q is **correlated** if Attr(Q′) ∩ Attr(Q) ≠ ∅ where Attr(R) denotes the set of attributes bound by the FROM clause of R; otherwise Q′ is **uncorrelated**. Evaluation semantics follow the standard nested-iteration model unless the query optimiser applies a decorrelation transformation. (Silberschatz, Korth & Sudarshan, *Database System Concepts*, 7e, §3.5.)

## 8. Visual — diagram or schematic
```text
Outer query block Q
+-----------------------------+
|  for each tuple t in R_outer |
|    bind free vars of Q'      |
|    evaluate Q'(t)            |
|    apply predicate on result |
+-----------------------------+
          │
          │  (correlated path)
          ▼
Inner query block Q'
  references column from R_outer
          │
          │  (uncorrelated path)
          ▼
Inner query block Q'
  no references to outer
  evaluated once, result cached
```

## 9. The memory technique

**The hook**  
Picture the outer query as a parent walking down a corridor; an uncorrelated child stays in one room and shouts its answer once, while a correlated child must be asked again at every door because it keeps asking “which room are we in now?”

**What to overlearn**  
1. Column-resolution rule: a reference is correlated exactly when its table is declared in an ancestor FROM clause.  
2. Execution cardinality: uncorrelated = 1 evaluation; correlated = |outer| evaluations (absent decorrelation).

**Spaced-repetition schedule**  
Review the column-resolution rule at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive by writing the subquery on paper, then draw an arrow from every column name to the FROM clause that binds it; any arrow crossing a query-block boundary indicates correlation.

## 10. What this unlocks
Mastery of correlated versus uncorrelated subqueries is the prerequisite for understanding query rewriting, lateral joins, common-table-expression semantics, and most automatic decorrelation passes inside modern cost-based optimisers.

- Lateral derived tables (SQL:1999 LATERAL)  
- Semijoin and antijoin transformations  
- Window-function framing that can replace many correlated scalar subqueries  
- Recursive CTE termination conditions that rely on correlated EXISTS patterns

## 11. Self-check — five questions, no answers
1. Classify the following subquery as correlated or uncorrelated and justify by tracing each column reference:  
   ```sql
   SELECT dept_name FROM departments d
   WHERE EXISTS (SELECT 1 FROM employees e WHERE e.dept_id = d.dept_id);
   ```

2. Rewrite the correlated scalar subquery in Example 4 as an uncorrelated query using only JOIN and GROUP BY; verify that the result is identical on a small test table you create.

3. A query contains a subquery that references a column from a CTE defined earlier in the same statement. Is the subquery correlated with the main query? Explain.

4. Under what precise condition can the optimiser safely materialise a subquery result even though the subquery textually contains an outer-column reference?

5. Given an employees table with 10 000 rows and a correlated subquery that returns 3 rows on average, estimate the number of logical reads performed by the naïve nested-iteration plan versus a decorrelated plan that first builds a hash table of per-department averages.