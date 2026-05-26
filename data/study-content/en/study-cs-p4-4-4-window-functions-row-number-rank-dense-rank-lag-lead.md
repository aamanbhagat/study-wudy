## 1. The one-sentence answer

**Window functions evaluate an expression across a set of rows that are related to the current row, returning a value for every row instead of collapsing the result.**

A window is defined by a partition clause that groups rows, an order clause that sequences them inside each group, and an optional frame clause that further restricts which rows participate. The functions ROW_NUMBER, RANK, and DENSE_RANK assign positions inside that ordered partition; LAG and LEAD read values from preceding or following rows within the same partition. Because the original rows remain, these results can be used directly in SELECT, WHERE, or even JOIN clauses.

The decisive property is that the output cardinality equals the input cardinality. Aggregation functions reduce rows; window functions enrich them. This single distinction enables ranking, running totals, and time-series comparisons without self-joins or temporary tables.

> [!NOTE]
> The partition resets the numbering or offset calculation; omitting PARTITION BY makes the entire result set one giant window.

## 2. Why this matters — concrete and current

In semiconductor yield analysis, Intel partitions wafer test data by lot and wafer ID, then applies ROW_NUMBER ordered by defect count to isolate the top-k failing dies per wafer before feeding the list to laser-repair equipment.

Air-traffic control systems at EUROCONTROL use LAG and LEAD on flight-track messages partitioned by aircraft identifier and ordered by timestamp to compute instantaneous separation distances and issue conflict alerts within sub-second latency budgets.

Recommendation engines at Netflix rank titles inside user-session windows with RANK and DENSE_RANK so that two titles sharing an identical relevance score receive consecutive ranks without gaps, preserving diversity in the top-10 carousel.

Researchers at CERN’s LHCb experiment apply LEAD on particle-hit timestamps partitioned by detector module to reconstruct track segments; the offset calculation runs inside the same SQL query that later feeds the Kalman-filter stage.

Financial-risk platforms at JPMorgan compute 30-day rolling volatility with a window frame of 30 preceding rows ordered by trade date, allowing intraday VaR recalculation without materializing intermediate aggregates.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| SQL SELECT and ORDER BY  | Window functions are evaluated after ORDER BY but before the final projection; you must know how rows are presented to the engine. |
| PARTITION BY semantics   | Defines independent windows; without it every function sees the entire table. |
| NULL ordering            | Determines where NULLs appear in the ordering that RANK and LAG rely on. |
| Three-valued logic       | Affects comparisons inside frame definitions when boundary expressions evaluate to NULL. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A window is a logical viewport, not a physical copy
A window function never materializes a new table; it merely declares, for each row, which other rows are visible to it.  
Consider a table of daily temperatures for two cities. Partitioning by city creates two separate viewports; the function inside each viewport sees only that city’s rows.  
Formally:  
$$
\text{window}(r) = \{ r' \mid \text{partition}(r') = \text{partition}(r) \}
$$  
> [!WARNING]  
> Treating the window as a physical subset leads to the error of writing self-joins that duplicate rows when the function is later referenced in an outer query.

### Step 2 — Ordering inside the window supplies the sequence
Once rows are partitioned they must be sequenced. The ORDER BY clause inside OVER supplies that sequence; without it RANK and LAG are undefined.  
In the temperature example, ordering by date ascending places Monday before Tuesday inside each city’s window.  
Formal statement: the ordered partition is a total order on the set defined in Step 1.  
> [!WARNING]  
> Using a nondeterministic ORDER BY (ties without tie-breaker columns) makes ROW_NUMBER return arbitrary results on successive runs.

### Step 3 — ROW_NUMBER produces unique consecutive integers
ROW_NUMBER() assigns 1, 2, 3 … to the ordered rows inside each partition, breaking ties arbitrarily.  
For the first three rows of a city after ordering: positions become 1, 2, 3.  
$$
\text{ROW_NUMBER}(r_i) = i \quad (1 \le i \le |window(r)|)
$$  
> [!WARNING]  
> Expecting deterministic tie-breaking from ROW_NUMBER alone will produce nondeterministic “top-1” results when duplicate keys exist.

### Step 4 — RANK inserts gaps after ties; DENSE_RANK does not
RANK() assigns the same number to tied rows and then skips subsequent numbers; DENSE_RANK() assigns the same number but never skips.  
If two rows tie for position 2, RANK yields 1,2,2,4 while DENSE_RANK yields 1,2,2,3.  
Formal definitions:  
$$
\text{RANK}(r_i) = 1 + |\{r_j \mid r_j \prec r_i\}|
$$  
$$
\text{DENSE_RANK}(r_i) = 1 + |\{distinct\ values\ before\ r_i\}|
$$  
> [!WARNING]  
> Using RANK when the downstream consumer expects consecutive integers (e.g., array indexing) silently produces out-of-range indices.

### Step 5 — LAG and LEAD read offset rows inside the ordered window
LAG(expr, offset) returns the value of expr from the row offset positions earlier in the ordered partition; LEAD reads forward. Default offset is 1; missing rows return NULL.  
In the temperature table, LAG(temp,1) on Tuesday returns Monday’s temperature for the same city.  
Formal access:  
$$
\text{LAG}(r_i, k) = r_{i-k} \text{ if } i-k \ge 1,\ \text{NULL otherwise}
$$  
> [!WARNING]  
> Forgetting that the offset counts within the partition—not the whole table—produces cross-city leakage when partitions are omitted.

### Step 6 — The OVER clause is the single syntactic container
All five functions share identical syntax: function() OVER ( [PARTITION BY …] ORDER BY … [frame] ). The final textbook statement is therefore the composition of the six preceding definitions inside one OVER clause.

## 5. Worked examples — every step shown

**Example 1 — Simple ROW_NUMBER**  
*Given:*  
```sql
CREATE TABLE t (city TEXT, d DATE, temp INT);
INSERT INTO t VALUES
('NY','2024-01-01',32),('NY','2024-01-02',30),
('SF','2024-01-01',55),('SF','2024-01-02',58);
```  
*Find:* Position of each reading inside its city ordered by date.  
Step 1: write the window  
```sql
ROW_NUMBER() OVER (PARTITION BY city ORDER BY d)
```  
*Why:* PARTITION BY isolates cities; ORDER BY supplies sequence.  
Step 2: embed in SELECT  
```sql
SELECT city, d, temp,
       ROW_NUMBER() OVER (PARTITION BY city ORDER BY d) AS rn
FROM t;
```  
*Why:* The function is evaluated after FROM and WHERE but before final projection.  
**Result**  
city | d | temp | rn  
NY | 2024-01-01 | 32 | 1  
NY | 2024-01-02 | 30 | 2  
SF | 2024-01-01 | 55 | 1  
SF | 2024-01-02 | 58 | 2  

*Reflection:* The example is trivial yet demonstrates that row count is preserved; the same four rows exit the query.

**Example 2 — RANK versus DENSE_RANK with ties**  
*Given:* temperatures 32, 30, 30 for NY.  
*Find:* Both rankings.  
Step 1: compute positions after ordering by temp DESC.  
Step 2: apply RANK → 1,2,2.  
Step 3: apply DENSE_RANK → 1,2,2.  
Step 4: next value after the tie receives 4 for RANK, 3 for DENSE_RANK.  
**Result** (RANK) 1,2,2,4 ; (DENSE_RANK) 1,2,2,3.  

*Reflection:* The gap behavior is the only semantic difference; both functions share identical OVER clauses.

**Example 3 — LAG for day-over-day change**  
*Given:* NY temperatures 32,30.  
*Find:* previous temperature.  
Step 1: LAG(temp,1) OVER (PARTITION BY city ORDER BY d).  
Step 2: On 2024-01-01 the offset row does not exist → NULL.  
Step 3: On 2024-01-02 the offset row exists → 32.  
**Result** NULL,32.  

*Reflection:* NULL handling is automatic; no extra CASE is required.

**Example 4 — LEAD with frame and default**  
*Given:* three rows per city.  
*Find:* temperature two days ahead, defaulting to –999 when missing.  
Step 1: LEAD(temp,2,-999) OVER (PARTITION BY city ORDER BY d).  
Step 2: Row 1 sees row 3.  
Step 3: Row 2 sees nothing → –999.  
**Result** 58,–999,–999 for NY.  

*Reflection:* The default argument lives inside the function, not in the frame clause.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using window function inside WHERE | Window functions are evaluated after WHERE | Move filter to QUALIFY (PostgreSQL, BigQuery) or wrap in CTE |
| Forgetting PARTITION BY on multi-group data | Default window is the entire table | Always write PARTITION BY unless global window is intended |
| Expecting deterministic ROW_NUMBER on ties | ORDER BY list lacks tie-breaker | Add unique column (e.g., id) to ORDER BY |
| Applying RANK to non-unique keys and indexing the result | Gaps appear after ties | Choose DENSE_RANK when consecutive integers are required |
| LAG/LEAD returning cross-partition values | Partition clause omitted | Explicitly restate PARTITION BY even when only one group exists |
| Frame clause ignored with LAG/LEAD | LAG/LEAD implicitly use RANGE UNBOUNDED | Omit frame clause; it has no effect |
| Counting NULLs incorrectly in ordering | NULLS LAST/FIRST not specified | Add NULLS LAST explicitly when business logic demands it |

## 7. The textbook-precise statement

A window function is an analytic function whose argument is evaluated over a window of rows defined by the OVER clause. The window is specified by:  
1. An optional PARTITION BY list that partitions the input relation.  
2. An optional ORDER BY list that defines the ordering within each partition.  
3. An optional frame clause of the form {ROWS | RANGE} BETWEEN frame_start AND frame_end.  

ROW_NUMBER, RANK, DENSE_RANK, LAG(expr,offset,default), LEAD(expr,offset,default) are the five functions under discussion. Their semantics are defined in the SQL:2011 standard, section 6.10. Reference: Silberschatz, Korth, Sudarshan, *Database System Concepts*, 7th ed., §3.5.

## 8. Visual — diagram or schematic

```text
Table t (city, d, temp)
+---------------------+
| city | d        | temp |
|------|----------|------|
| NY   | 2024-01-01 | 32 |
| NY   | 2024-01-02 | 30 |
| SF   | 2024-01-01 | 55 |
| SF   | 2024-01-02 | 58 |
+---------------------+

Window for city='NY' (ordered by d):
  Row 1 ──▶ temp=32   ← LAG sees NULL
  Row 2 ──▶ temp=30   ← LAG sees 32, LEAD sees NULL

Window for city='SF' is independent.
```

## 9. The memory technique

**The hook**  
Imagine each partition as a separate train car; the ORDER BY clause is the seating order inside that car. ROW_NUMBER hands out seat numbers, RANK hands out seat numbers with gaps after twins, LAG/LEAD let you look one seat forward or back.

**What to overlearn**  
- Syntax skeleton: `func() OVER (PARTITION BY … ORDER BY …)`  
- RANK inserts gaps; DENSE_RANK never does.  
- LAG/LEAD default offset = 1; missing rows yield NULL.

**Spaced-repetition schedule**  
Review the syntax skeleton after 1 day, re-derive RANK vs DENSE_RANK after 3 days, implement a LAG-based change query after 7 days, write a full ranking report after 16 days, and re-explain the frame clause after 35 days.

**First-principles fallback**  
If you forget the functions, rebuild from the definition: partition the rows, order them, then assign positions or read offsets inside each ordered list.

## 10. What this unlocks

Mastery of these five functions removes the need for the majority of self-join and correlated-subquery patterns that appear in reporting queries.  

- Next: frame clauses (ROWS BETWEEN …) for true running aggregates.  
- Next: FILTER and QUALIFY clauses that operate after window evaluation.  
- Next: ordered-set aggregate functions (WITHIN GROUP) that combine grouping with ordering.  
- Next: time-series gap-filling patterns that rely on LAG/LEAD to detect missing rows.

## 11. Self-check — five questions, no answers

1. Given a table with duplicate keys, write a query that returns exactly one row per key using ROW_NUMBER.  
2. A result set shows ranks 1,2,2,4. Which function produced it—RANK or DENSE_RANK—and why?  
3. Construct a query that returns, for every row, the value two rows ahead inside its department, defaulting to zero.  
4. Identify the evaluation-order error in `SELECT * FROM t WHERE ROW_NUMBER() OVER (ORDER BY x) = 1;`.  
5. A partition contains NULL values in the ORDER BY column. Where do they appear when NULLS LAST is omitted, and how does that affect LAG?