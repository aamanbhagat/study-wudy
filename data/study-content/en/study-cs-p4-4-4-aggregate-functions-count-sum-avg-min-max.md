## 1. The one-sentence answer
**Aggregate functions compute a single scalar value that summarises an entire set of rows.**

They operate after the rows have been selected and, when paired with grouping, after the rows have been partitioned. The five standard functions—COUNT, SUM, AVG, MIN, and MAX—each reduce a multiset of values to one result according to a precise mathematical rule. Without grouping they collapse every qualifying row into one output row; with grouping they produce one row per distinct group.

The reduction is performed by the database engine after the FROM and WHERE clauses have filtered the input. Consequently the functions never see individual rows in the final result set; they see only the collection that survives those earlier stages.

> [!NOTE]
> The decisive mental shift is realising that an aggregate function never returns a value for any single row; it returns a property of the whole set.

## 2. Why this matters — concrete and current
SpaceX telemetry pipelines store millions of sensor readings per second from each Falcon 9 flight. Engineers issue COUNT(*) together with MAX(thrust) and AVG(temperature) grouped by engine ID to detect anomalous performance within milliseconds of data arrival.

In semiconductor fabrication, TSMC’s yield-analysis warehouse runs daily SUM(defect_count) and AVG(cycle_time) over wafer lots. These aggregates drive statistical process control charts that decide whether a process node must be recalibrated.

Machine-learning feature stores at Google use MIN(timestamp) and MAX(timestamp) per user entity to compute session duration features. The resulting aggregates feed training pipelines for ranking models that affect search results for billions of queries.

Financial exchanges such as NASDAQ compute real-time VWAP (volume-weighted average price) using a combination of SUM(price × volume) / SUM(volume). Regulatory reporting requires these aggregates to be reproducible to the microsecond for every trading symbol.

Climate-research archives at NASA’s Earth Observing System employ COUNT(valid_pixels) and MAX(surface_temp) over satellite granules. These summaries reduce petabytes to tractable zonal statistics used in IPCC assessment reports.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Relational table         | Aggregates are defined over multisets of rows             |
| SELECT–FROM–WHERE        | Filtering precedes aggregation; the set is already formed |
| NULL semantics           | Most aggregates ignore NULLs; COUNT(*) does not           |
| GROUP BY clause          | Required when more than one summary row is desired        |

## 4. Building the idea — from intuition to formalism

### Step 1 — A set of rows is the input
An aggregate function receives a multiset of values produced by evaluating an expression on every row that satisfies the query’s filters.  
Example: the expression `salary` evaluated on the three rows of a department yields the multiset {50000, 60000, 55000}.  
Formally, let R be the bag of rows after FROM and WHERE; the input to the aggregate is the bag {e(r) | r ∈ R} where e is the argument expression.  
> [!WARNING]  
> Treating the input as a set rather than a bag silently discards duplicate values when COUNT or SUM is applied.

### Step 2 — COUNT measures cardinality
COUNT(*) returns the number of rows in the bag; COUNT(expr) returns the number of non-NULL values of expr.  
Example: COUNT(*) on three rows yields 3; COUNT(manager_id) on the same rows yields 2 if one manager_id is NULL.  
$$ \operatorname{COUNT}(*) = |R|,\qquad \operatorname{COUNT}(e) = |\{r\in R \mid e(r)\neq\text{NULL}\}| $$

### Step 3 — SUM adds numeric values
SUM(expr) returns the sum of all non-NULL numeric values of the expression.  
Example: SUM(salary) on {50000, 60000, 55000} equals 165000.  
$$ \operatorname{SUM}(e) = \sum_{\substack{r\in R \\ e(r)\neq\text{NULL}}} e(r) $$

### Step 4 — AVG computes the arithmetic mean
AVG(expr) equals SUM(expr) divided by COUNT(expr) on the same non-NULL values.  
Example: AVG(salary) = 165000 / 3 = 55000.  
$$ \operatorname{AVG}(e) = \frac{\operatorname{SUM}(e)}{\operatorname{COUNT}(e)} $$

### Step 5 — MIN and MAX locate extrema
MIN(expr) and MAX(expr) return the smallest and largest non-NULL value respectively under the natural order of the type.  
Example: MIN(salary) = 50000, MAX(salary) = 60000.  
$$ \operatorname{MIN}(e) = \min\{e(r) \mid r\in R, e(r)\neq\text{NULL}\} $$

### Step 6 — Grouping partitions the input before reduction
When GROUP BY is present, the engine partitions R into groups G₁ … Gₖ that share identical values of the grouping columns; each aggregate is evaluated independently on every Gᵢ.  
Example: GROUP BY dept_id produces one row per distinct department, each containing that department’s own SUM and COUNT.  
The final result contains exactly k rows, one per group.

### Step 7 — The SELECT list may contain only aggregates or grouping columns
Any column that is not a grouping column must appear inside an aggregate; otherwise the query is ill-formed.  
This rule guarantees that every output column is a function of the group alone.

### Step 8 — The complete aggregate query
A query of the form  
```sql
SELECT g₁, …, gₘ, agg₁(e₁), …, aggₙ(eₙ)
FROM R
WHERE …
GROUP BY g₁, …, gₘ
```
produces one row per distinct combination of (g₁ … gₘ), each row holding the m grouping values together with the n aggregate results computed on the corresponding group.

## 5. Worked examples — every step shown

**Example 1 — Simple COUNT**  
*Given:* Table employees with 4 rows, one of which has NULL in dept_id.  
*Find:* Number of employees and number of employees with a known department.  
Step 1: COUNT(*) examines all 4 rows → 4.  
*Why:* COUNT(*) counts rows regardless of NULLs.  
Step 2: COUNT(dept_id) examines the 3 non-NULL values → 3.  
*Why:* COUNT(expr) excludes NULLs by definition.  
**4**  
**3**  
*Reflection:* The two counts differ exactly when NULLs exist; always decide which semantics the question requires.

**Example 2 — SUM and AVG together**  
*Given:* Salaries 48000, NULL, 52000, 60000.  
*Find:* Total payroll and average salary.  
Step 1: SUM(salary) adds the three non-NULL values → 160000.  
*Why:* NULL is omitted from the summation.  
Step 2: COUNT(salary) = 3.  
*Why:* Denominator must match the numerator’s NULL handling.  
Step 3: AVG = 160000 / 3 = 53333.333….  
**160000**  
**53333.333**  
*Reflection:* AVG is never computed by summing all rows and dividing by row count; it always divides by the count of non-NULL values.

**Example 3 — MIN/MAX with GROUP BY**  
*Given:* Two departments, each with three salaries.  
*Find:* Highest and lowest salary per department.  
Step 1: Partition into groups G_sales and G_eng.  
*Why:* GROUP BY creates independent bags.  
Step 2: For G_sales compute MAX(salary) and MIN(salary).  
Step 3: Repeat for G_eng.  
**One row per department containing the two extrema**  
*Reflection:* Each output row is produced by a separate, isolated invocation of the aggregate functions.

**Example 4 — Mixed aggregate and non-aggregate (trap detection)**  
*Given:* Query attempting SELECT dept_id, COUNT(*) FROM employees.  
*Find:* Why the query is rejected without GROUP BY.  
Step 1: dept_id can take many values inside the single group that would exist without GROUP BY.  
*Why:* The engine cannot decide which of those values to emit.  
Step 2: Adding GROUP BY dept_id resolves the ambiguity.  
**Query is invalid until GROUP BY is supplied**  
*Reflection:* Any column outside an aggregate must be listed in GROUP BY; the rule is mechanical and enforced by the parser.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using COUNT(column) when COUNT(*) is intended | Forgetting that COUNT(column) drops NULL rows       | Write COUNT(*) explicitly when row count is required |
| Placing a non-grouped column in SELECT without aggregate | Assuming the engine will “pick any” value           | Add the column to GROUP BY or wrap it in an aggregate |
| Expecting AVG to include NULLs in the denominator | Mental model of “average over all rows”             | Remember AVG = SUM/COUNT(expr) on non-NULLs only     |
| Applying aggregates inside WHERE  | WHERE is evaluated before grouping                  | Move the condition to HAVING when it refers to aggregates |
| Comparing two aggregates with = in WHERE | Timing: aggregates do not yet exist at WHERE stage  | Use HAVING for post-aggregation predicates           |
| Forgetting that MIN/MAX on strings use lexicographic order | Assuming numeric ordering on character data         | Cast or use appropriate collation when needed        |
| Counting duplicates unintentionally with COUNT(DISTINCT) omitted | Treating the input as a set rather than a bag       | Add DISTINCT inside the aggregate when uniqueness matters |

## 7. The textbook-precise statement
An aggregate function f is a mapping from bags of values of a given type to a single value of a result type. For the standard SQL aggregates the definitions are:

- COUNT(*) ≜ cardinality of the input bag  
- COUNT(e) ≜ cardinality of the sub-bag of non-NULL values of e  
- SUM(e) ≜ sum of non-NULL numeric values of e  
- AVG(e) ≜ SUM(e) / COUNT(e) when COUNT(e) > 0, otherwise NULL  
- MIN(e), MAX(e) ≜ least/greatest non-NULL value under the type’s order

When a GROUP BY clause listing columns g₁ … gₘ is present, the input bag is partitioned into maximal sub-bags that agree on all gᵢ; each aggregate is evaluated once per sub-bag. (Elmasri & Navathe, *Fundamentals of Database Systems*, 7e, §6.4)

## 8. Visual — diagram or schematic
```text
Table employees
+----+---------+--------+
| id | dept_id | salary |
+----+---------+--------+
| 1  | D1      | 50000  |
| 2  | D1      | 60000  |
| 3  | D2      | 55000  |
| 4  | NULL    | 52000  |
+----+---------+--------+

          GROUP BY dept_id
               │
       ┌───────┴───────┐
       ▼               ▼
   Group D1        Group D2
   {50000,60000}   {55000}
       │               │
   COUNT=2         COUNT=1
   SUM=110000      SUM=55000
   AVG=55000       AVG=55000
```

## 9. The memory technique

**The hook**  
Picture a stadium crowd: COUNT is the number of people present, SUM is the total weight of their wallets, AVG is the average wallet weight, MIN/MAX are the lightest and heaviest wallets. The groups are the different sections of the stadium.

**What to overlearn**  
- COUNT(*) counts rows; COUNT(expr) counts non-NULL values.  
- AVG(e) ≡ SUM(e) / COUNT(e) on the same non-NULL set.  
- GROUP BY must contain every non-aggregated column that appears in SELECT.

**Spaced-repetition schedule**  
Review the three facts above after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback**  
Re-derive any aggregate from its set definition: start with the filtered bag of rows, discard NULLs where required, then apply the obvious mathematical reduction (cardinality, summation, min, max).

## 10. What this unlocks
Mastery of these five functions is the gateway to window functions, common-table expressions that compute running totals, and the entire subject of analytical SQL. The next concepts that rest directly on this foundation are HAVING, GROUPING SETS, ROLLUP, CUBE, and the FILTER clause introduced in SQL:2003.

## 11. Self-check — five questions, no answers
1. A table contains 10 rows, 3 of which have NULL in the column being aggregated. What does COUNT(col) return?  
2. Write the single aggregate expression that yields the median salary when used with appropriate ORDER BY and LIMIT (assume an odd number of non-NULL salaries).  
3. Why does SELECT dept_id, MAX(salary) FROM employees fail without a GROUP BY clause?  
4. A query contains both WHERE hire_date > '2020-01-01' and HAVING AVG(salary) > 60000. In which order are the two predicates evaluated?  
5. Construct a query that returns, for each department, the number of employees whose salary is strictly above the department average.