## 1. The one-sentence answer
**SQL clauses WHERE, GROUP BY, HAVING, ORDER BY, and LIMIT refine the rows returned by a SELECT statement through successive filters, aggregations, and ordering steps.**

These clauses operate on tables that already satisfy the FROM clause. WHERE discards individual rows before any grouping occurs. GROUP BY collapses matching rows into summary groups. HAVING then discards entire groups. ORDER BY arranges the surviving rows, and LIMIT truncates the final result set. The clauses therefore form a pipeline whose order is fixed by the SQL standard, independent of the order in which they are written.

The pipeline matters because aggregation and filtering are not commutative. Applying a row filter after grouping produces different results from applying it before grouping. Understanding the precise sequence eliminates entire classes of incorrect query results.

> [!NOTE]
> The logical execution order is always FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT; writing clauses in a different sequence on the page does not change this order.

## 2. Why this matters — concrete and current
Amazon’s product-search backend issues millions of SELECT statements daily that combine a WHERE clause on inventory status with a GROUP BY on category to compute stock aggregates before returning the top 20 results via ORDER BY and LIMIT.  

Google’s internal analytics platform for Ads uses HAVING to retain only advertiser groups whose click-through rate exceeds a revenue threshold after GROUP BY on campaign ID, enabling real-time bidding adjustments.  

NASA’s Earth Observing System Data and Information System stores satellite telemetry in relational tables; scientists issue queries that filter raw measurements with WHERE, aggregate by orbital pass using GROUP BY, discard noisy passes with HAVING, and finally ORDER BY timestamp while LIMITing output to the most recent 500 records for anomaly detection models.  

Semiconductor foundries such as TSMC log process data from every wafer; yield-analysis teams rely on the same clause sequence to group measurements by lot, retain only lots whose defect rate satisfies a statistical test via HAVING, and produce ordered, bounded reports for process-control dashboards.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Relational table         | Supplies the rows that all clauses operate on             |
| Basic SELECT … FROM      | Establishes the initial candidate set before filtering    |
| Aggregate functions      | Required once GROUP BY creates groups                     |
| Column data types        | Determine valid comparisons inside WHERE and HAVING       |

## 4. Building the idea — from intuition to formalism

### Step 1 — Row filtering before aggregation
A WHERE clause evaluates a predicate on every row independently. Only rows for which the predicate is true survive to the next stage.  

Example: given a table of sales, retain only rows where region = 'EU'.  

Formally:  
$$
\sigma_{P}(R)
$$  
where \(\sigma\) is the selection operator and \(P\) is the predicate.  

> [!WARNING]
> Placing an aggregate function inside WHERE produces a syntax error because aggregates are undefined until after GROUP BY.

### Step 2 — Partitioning into groups
GROUP BY partitions the surviving rows into equivalence classes defined by equal values of the listed columns. Each class becomes a single group for subsequent aggregation.  

Example: group the filtered EU sales by product_id.  

Formally:  
$$
G_{A_1,\dots,A_k}(R')
$$  
where \(R'\) is the relation after WHERE and \(A_i\) are the grouping attributes.

### Step 3 — Group filtering after aggregation
HAVING applies a predicate to each group, typically involving aggregate values. Groups that fail the predicate are discarded.  

Example: keep only product groups whose total revenue exceeds 10000.  

Formally:  
$$
\sigma_{Q}(G_{A}(R'))
$$  
where \(Q\) may reference aggregates.

### Step 4 — Ordering the final rows
ORDER BY sorts the rows that remain after all filtering and aggregation according to one or more expressions, optionally with ASC or DESC.  

Formally: the result is a sequence rather than a set once ORDER BY is applied.

### Step 5 — Truncating the result
LIMIT (or FETCH FIRST) retains only the first \(k\) rows of the ordered sequence.  

Formally:  
$$
\pi_{k}(S)
$$  
where \(S\) is the ordered result and \(\pi_k\) projects the prefix of length \(k\).

## 5. Worked examples — every step shown

**Example 1 — Simple row filter**  
*Given:* Table sales(id, region, amount).  
*Find:* All rows from region 'US'.  
Step 1: FROM sales produces the full table.  
*Why:* Establishes the working relation.  
Step 2: WHERE region = 'US' retains matching rows.  
*Why:* Predicate evaluated per row before any grouping.  
**Final answer**  
```sql
SELECT * FROM sales WHERE region = 'US';
```

*Reflection:* The query never reaches GROUP BY, so the distinction between WHERE and HAVING is irrelevant here.

**Example 2 — Grouping with aggregate**  
*Given:* The same table.  
*Find:* Total amount per region.  
Step 1: FROM sales.  
*Why:* Source rows.  
Step 2: GROUP BY region.  
*Why:* Creates one group per distinct region value.  
Step 3: SELECT region, SUM(amount).  
*Why:* Aggregate computed once per group.  
**Final answer**  
```sql
SELECT region, SUM(amount) FROM sales GROUP BY region;
```

*Reflection:* Without GROUP BY the aggregate would collapse the entire table into one row.

**Example 3 — Filtering groups**  
*Given:* The same table.  
*Find:* Regions whose total exceeds 50000.  
All prior steps plus HAVING SUM(amount) > 50000 after GROUP BY.  
*Why:* The aggregate must exist before the predicate can be tested.  
**Final answer**  
```sql
SELECT region, SUM(amount) FROM sales GROUP BY region HAVING SUM(amount) > 50000;
```

*Reflection:* Replacing HAVING with WHERE yields a syntax error or incorrect per-row filtering.

**Example 4 — Full pipeline with ordering and limit**  
*Given:* The same table plus a date column.  
*Find:* Top three regions by revenue in 2023.  
Steps: WHERE date >= '2023-01-01', GROUP BY region, HAVING SUM(amount) > 0, ORDER BY SUM(amount) DESC, LIMIT 3.  
**Final answer**  
```sql
SELECT region, SUM(amount) AS revenue
FROM sales
WHERE date >= '2023-01-01'
GROUP BY region
HAVING SUM(amount) > 0
ORDER BY revenue DESC
LIMIT 3;
```

*Reflection:* Changing the position of ORDER BY relative to LIMIT alters which three rows appear.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using WHERE on an aggregate       | Aggregate values exist only after GROUP BY          | Move the condition to HAVING                         |
| Assuming GROUP BY implies ORDER BY| Many engines sort groups incidentally               | Always write ORDER BY when order matters             |
| Forgetting that LIMIT applies last| Written early in the query text                     | Mentally reorder clauses to FROM-WHERE-GROUP-HAVING-ORDER-LIMIT |
| Selecting non-grouped columns     | Ambiguous which value to return from a group        | Include only grouping columns or aggregates          |
| NULL handling in GROUP BY         | NULLs form their own group                          | Decide explicitly whether to filter NULLs in WHERE   |
| Case sensitivity in ORDER BY      | Collation settings affect string ordering           | Specify COLLATE when required                        |
| LIMIT without ORDER BY            | Result order is nondeterministic                    | Pair LIMIT with ORDER BY for reproducible prefixes   |

## 7. The textbook-precise statement
In the SQL:2016 standard (ISO/IEC 9075-2), a <query specification> is evaluated in the following order: FROM, WHERE, GROUP BY, HAVING, SELECT list, ORDER BY, and finally OFFSET/FETCH FIRST (the standard spelling of LIMIT). The result of each clause becomes the input to the next; HAVING may reference only grouping columns and aggregates computed from the group, while WHERE may reference only columns of the FROM clause. See Silberschatz, Korth & Sudarshan, *Database System Concepts*, 7e, §3.4.

## 8. Visual — diagram or schematic
```text
FROM  →  WHERE  →  GROUP BY  →  HAVING  →  SELECT  →  ORDER BY  →  LIMIT
 |         |          |           |          |          |           |
rows     filtered   groups     filtered   projected  sorted     truncated
         rows       (with      groups     columns    rows       prefix
                    aggregates)
```

## 9. The memory technique
**The hook** — Picture a kitchen assembly line: raw ingredients arrive (FROM), bad ones are discarded (WHERE), identical items are bagged together (GROUP BY), underweight bags are rejected (HAVING), bags are labelled (SELECT), placed on a conveyor in price order (ORDER BY), and only the first three bags are shipped (LIMIT).  

**What to overlearn** — The exact logical order FROM-WHERE-GROUP-HAVING-SELECT-ORDER-LIMIT and that HAVING may reference aggregates while WHERE may not.  

**Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  

**First-principles fallback** — Re-derive the pipeline by asking, at each clause, “Do I still have individual rows or have I already collapsed them into groups?”

## 10. What this unlocks
Mastery of these clauses is the prerequisite for writing any non-trivial reporting or analytics query and for understanding how query optimizers rewrite predicates.  

- Window functions (ROW_NUMBER, RANK) that operate after these clauses  
- Common Table Expressions that compose multiple pipelines  
- JOIN semantics, because joins occur inside FROM before WHERE  
- Query planning and index selection in database engines  

## 11. Self-check — five questions, no answers
1. Write a query that returns the single highest revenue region without using LIMIT.  
2. Predict the result cardinality when a table has 100 rows, 10 distinct values in the GROUP BY column, and a HAVING clause that retains 3 groups.  
3. Explain why SELECT product_id, MAX(price) FROM products WHERE price > 100 GROUP BY category fails.  
4. Given an ORDER BY clause on a nullable column, where do NULLs appear under the SQL standard?  
5. Rewrite the following query so that the LIMIT applies to the top 5 groups by total sales rather than the top 5 rows: SELECT * FROM sales ORDER BY amount DESC LIMIT 5.