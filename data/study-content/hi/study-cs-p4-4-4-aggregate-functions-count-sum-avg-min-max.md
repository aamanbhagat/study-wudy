## 1. The one-sentence answer
**Aggregate functions compute a single scalar value over a set of rows in a database table or result set.**

In SQL, functions like COUNT, SUM, AVG, MIN, and MAX operate on column values after rows are filtered or grouped. They collapse multiple rows into one output value, which is essential when you need totals, averages, or extremes rather than individual records. Without them, queries would only return raw rows; with them, you derive summary statistics directly inside the database engine.

These functions ignore NULL values by default (except COUNT(*)), and they are almost always paired with GROUP BY when you want per-group summaries. The result is deterministic for a given input set, making them reliable for reporting and analytics layers.

> [!NOTE]
> The core insight is that aggregate functions turn row-wise data into column-wise statistics inside the query engine itself, eliminating the need to pull entire tables into application memory for summarisation.

## 2. Why this matters — concrete and current
Google Analytics 4 uses COUNT and SUM on event tables containing billions of rows daily to compute session counts and total revenue per user cohort; the aggregates run inside BigQuery so only the final numbers travel back to the dashboard.

Stripe’s financial reporting pipeline applies SUM and AVG over payment records partitioned by merchant and currency; this produces daily settlement figures that must match audited ledger totals to the cent.

NASA’s Mars 2020 mission telemetry database stores sensor readings every second; MIN and MAX are used to detect thermal or voltage outliers in near real time before the data is downlinked.

Semiconductor fabs at TSMC run AVG and COUNT on wafer-test measurements across millions of dies; these aggregates feed statistical process control charts that trigger equipment recalibration when variance exceeds thresholds.

Airline reservation systems at Amadeus execute MIN and COUNT on seat-inventory tables to answer “cheapest available fare with at least 5 seats” queries thousands of times per second during peak booking windows.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| SELECT and FROM  | You must first identify the rows the aggregate will scan  |
| WHERE clause     | Filtering happens before aggregation; you need to know the order of operations |
| GROUP BY         | Most real aggregates are per-group, not global            |
| NULL semantics   | Every aggregate (except COUNT(*)) silently drops NULLs    |

If GROUP BY or NULL handling is unclear, pause and review those first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Aggregation collapses rows to a scalar
An aggregate function receives an entire column (or expression) as input and returns exactly one value.  
Example: on a table with 100 salary rows, SUM(salary) returns a single number.  
Formal statement:  
$$f: \{v_1, v_2, \dots, v_n\} \to s \quad \text{where } s \in \mathbb{R} \cup \{\text{NULL}\}$$  
> [!WARNING] If you forget that the output is always a single row (unless GROUP BY is present), later joins will produce Cartesian-product explosions.

### Step 2 — COUNT versus COUNT(*)
COUNT(column) counts non-NULL values; COUNT(*) counts all rows regardless of NULLs.  
Example: COUNT(email) on a user table with 3 NULL emails returns total users minus 3.  
Formal:  
$$\text{COUNT}(c) = |\{r \mid r.c \neq \text{NULL}\}|, \quad \text{COUNT}(*) = |R|$$  
> [!WARNING] Using COUNT(email) when you actually want row cardinality silently undercounts rows that have missing emails.

### Step 3 — SUM, AVG, MIN, MAX ignore NULLs
All four functions discard NULL before computation.  
Example: AVG(score) over {90, NULL, 80} equals 85, not 56.67.  
Formal: the input multiset is first filtered by \(v_i \neq \text{NULL}\).  
> [!WARNING] This behaviour is invisible; students often assume NULLs become zero and obtain wrong averages.

### Step 4 — Interaction with GROUP BY
When GROUP BY is present, each distinct group receives its own aggregate value.  
Formal: the relation is partitioned into equivalence classes on the grouping attributes; aggregates are applied per class.  
> [!WARNING] Columns in SELECT that are neither grouping keys nor aggregates will cause runtime errors in strict SQL modes.

### Step 5 — Combining aggregates in one query
Multiple aggregates can appear together; each is computed independently over the same group.  
Example: SELECT dept, COUNT(*), AVG(salary), MAX(salary) …  
Formal: the output schema contains one column per aggregate expression.  
> [!WARNING] Mixing aggregates with non-aggregated columns without GROUP BY violates the single-value contract.

## 5. Worked examples — har step show karo

**Example 1 — Global COUNT**  
*Given:* Table employees(id, dept, salary) with 7 rows.  
*Find:* total number of employees.  
```sql
SELECT COUNT(*) AS total FROM employees;
```  
*Why:* COUNT(*) counts every row before any column evaluation.  
**7**  

*Reflection:* The simplest case; teaches that COUNT(*) never ignores rows.

**Example 2 — SUM with WHERE**  
*Given:* Same table, only rows where dept = 'Sales'.  
*Find:* total salary in Sales.  
```sql
SELECT SUM(salary) FROM employees WHERE dept = 'Sales';
```  
*Why:* WHERE filters first, then SUM runs on the surviving rows.  
**245000**  

*Reflection:* Demonstrates two-phase execution order.

**Example 3 — AVG and GROUP BY**  
*Given:* Need average salary per department.  
```sql
SELECT dept, AVG(salary) FROM employees GROUP BY dept;
```  
*Why:* GROUP BY creates partitions; AVG is applied once per partition.  
**Engineering 92500, Sales 81666.67**  

*Reflection:* Shows why non-grouped columns must be aggregated.

**Example 4 — Handling NULLs with multiple aggregates**  
*Given:* salary column contains one NULL.  
```sql
SELECT COUNT(salary), SUM(salary), AVG(salary) FROM employees;
```  
*Why:* COUNT(salary) excludes the NULL row; SUM and AVG also exclude it.  
**6   612000   102000**  

*Reflection:* NULL behaviour must be memorised; it is the most common source of off-by-one errors.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using COUNT(column) for row count | NULLs are silently dropped                  | Use COUNT(*) when you want row cardinality   |
| Forgetting GROUP BY with mixed columns | SQL standard requires every non-aggregate to be a grouping key | Add the column to GROUP BY or wrap it in an aggregate |
| Expecting AVG to treat NULL as zero | Language intuition from imperative code     | Remember aggregates drop NULLs before computation |
| Placing aggregate inside WHERE | WHERE runs before aggregation               | Move the condition to HAVING                 |
| Comparing aggregates across different tables without subqueries | Each aggregate is computed on its own FROM clause | Use derived tables or CTEs                   |
| Assuming MIN/MAX preserve data type | Date or string columns can produce surprising lexical order | Cast explicitly when needed                  |
| Running aggregates on unindexed columns at scale | Full table scan cost                       | Index columns that appear in WHERE and GROUP BY |

## 7. The textbook-precise statement
An aggregate function is a mapping from a multiset of values to a scalar that is computed after the FROM and WHERE clauses but before or during the grouping step. In SQL:1999 and later, the six built-in aggregates (COUNT, SUM, AVG, MIN, MAX, and the later-added EVERY/SOME) operate on multisets obtained by evaluating the argument expression over each row of a group. NULLs are eliminated before the function is applied except for COUNT(*). The result of an aggregate over an empty group is NULL for all functions except COUNT, which returns 0. (Silberschatz, Korth, Sudarshan, *Database System Concepts*, 7e, §3.5)

## 8. Visual — diagram or schematic
```
employees
+----+------------+--------+
| id | dept       | salary |
+----+------------+--------+
| 1  | Engineering| 90000  |
| 2  | Sales      | 80000  |
| 3  | Engineering| 95000  |
| 4  | Sales      | NULL   |
+----+------------+--------+

After GROUP BY dept + aggregates
Engineering | COUNT=2 | SUM=185000 | AVG=92500 | MAX=95000
Sales       | COUNT=2 | SUM=80000  | AVG=80000 | MAX=80000
```

## 9. The memory technique
1. **The hook** — Picture five workers (C, S, A, m, M) standing on a collapsing stage; the stage shrinks every row into one number they all hold up together.
2. **What to overlearn** — COUNT(*) never drops rows; all other aggregates drop NULLs; GROUP BY must contain every non-aggregated SELECT column.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget the exact syntax, mentally run “filter rows → partition by GROUP BY keys → apply function per partition”.

## 10. What this unlocks
Once you master aggregates you can write any summary report without exporting data. This directly enables window functions, HAVING clauses, and OLAP-style cube queries.

- HAVING filters after aggregation
- Window functions (OVER) extend the same idea to sliding calculations
- Materialised views often store pre-computed aggregates for speed
- Approximate aggregate algorithms (HyperLogLog, T-Digest) build on the same conceptual foundation

## 11. Self-check — five questions, no answers
1. What does COUNT(email) return when three rows have NULL email out of ten total rows?
2. Write the query that returns departments whose average salary exceeds the company-wide average.
3. Why does SELECT dept, salary, AVG(salary) FROM employees fail without GROUP BY?
4. A table has only NULLs in the price column. What does SUM(price) return?
5. How would you compute both the count of non-null prices and the count of all rows in a single query?