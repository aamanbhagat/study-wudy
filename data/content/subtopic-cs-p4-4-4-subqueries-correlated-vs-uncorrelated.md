## What it is
A subquery is a `SELECT` statement nested inside another SQL statement. An **uncorrelated** subquery can be run independently of its outer query, as it has no dependencies. A **correlated** subquery depends on the outer query because the inner query's `WHERE` clause references a column from the outer query's current row.

## Why it matters
The distinction between correlated and uncorrelated subqueries is fundamental to database performance optimization. An uncorrelated subquery is typically evaluated once, while a correlated subquery is evaluated once for *every row* processed by the outer query, which can lead to disastrously slow queries on large datasets. In aerospace, this could be the difference between a near-instant analysis of launch vehicle sensor data and a query that runs for hours trying to correlate telemetry readings against average values for each specific component.

## When to study it
You must have a firm grasp of the basic SQL `SELECT` statement, including `FROM`, `WHERE`, `GROUP BY`, and aggregate functions like `AVG()`, `MAX()`, etc. You should also understand the fundamentals of `JOIN` operations, as they are often a more performant alternative to correlated subqueries. If you are not comfortable with these, pause and review them first.

## How to study it (step by step)
1.  **Schema Setup:** Create two simple tables: `employees` (`id`, `name`, `salary`, `dept_id`) and `departments` (`id`, `name`). Populate them with a few rows of sample data.
2.  **Write an Uncorrelated Subquery:** Write a query to find all employees whose salary is greater than the overall average salary. Execute it. Notice you can run the inner query `(SELECT AVG(salary) FROM employees)` by itself and it returns a single value.
3.  **Trace the Uncorrelated Execution:** Mentally (or using your database's `EXPLAIN` command), trace the query plan. The database first computes the average salary *once*. It then scans the `employees` table, comparing each employee's salary to that single, pre-computed value.
4.  **Write a Correlated Subquery:** Write a query to find employees whose salary is the maximum *for their specific department*. The inner query will need to reference the `dept_id` of the employee currently being considered by the outer query.
5.  **Trace the Correlated Execution:** Trace this query's execution. For the first employee row, the database takes their `dept_id`, runs the inner query to find the max salary for that specific department, and then compares. It then moves to the second employee row and repeats the entire process, re-running the inner query with the new `dept_id`.
6.  **Rewrite with a JOIN:** Rewrite the correlated subquery from step 4 using a `JOIN` on a derived table that pre-calculates the max salary for every department using `GROUP BY`. Compare the logic. The `JOIN` approach first calculates all max salaries in one pass, then joins, which is far more efficient.

## Key ideas, with intuition
1.  **Independence vs. Dependence:** This is the core concept. An uncorrelated subquery is self-contained. A correlated subquery is not; it's a template that gets filled in with data from each row of the outer query.
    *   **Uncorrelated Intuition:** "First, go figure out the company's average salary. Got it? OK, now show me everyone who earns more than *that number*."
    *   **Correlated Intuition:** "Look at the first employee. What's their department? OK, now go find the average salary *for just that department*. Is this employee's salary higher? Good. Now, forget that average and move to the next employee. What's *their* department?..."

2.  **Scope and Data Flow:** This is analogous to variable scope in programming. In a correlated subquery, the columns of the table in the outer query are "in scope" for the inner query.
    *   Let the outer query be $Q_{outer}$ and the inner query be $Q_{inner}$. Let $R$ be a row in the table being processed by $Q_{outer}$.
    *   **Uncorrelated:** $Q_{inner}$ is executed once. Its result, let's call it $V$, is used by $Q_{outer}$ for every row $R$.
    *   **Correlated:** For each row $R$ in $Q_{outer}$, a value $R.column$ is passed to $Q_{inner}$. $Q_{inner}(R.column)$ is executed, producing a result $V_R$ which is then used to evaluate the `WHERE` condition for that specific row $R$.

3.  **Computational Complexity:** The performance difference is stark. Let $N$ be the number of rows in the outer table and $M$ be the number of rows in the inner table (or the complexity of the inner query).
    *   **Uncorrelated:** The total work is roughly proportional to $O(\text{cost}(Q_{inner}) + \text{cost}(Q_{outer}))$, often simplified to $O(M + N)$.
    *   **Correlated:** The total work is roughly proportional to $O(N \times \text{cost}(Q_{inner}))$, or $O(N \times M)$. This multiplicative factor is what kills performance.

## Worked example
**Problem:** From an `employees` table (`id`, `name`, `salary`, `dept_id`), find all employees who earn more than the average salary of their respective departments.

**Sample Data:**
`employees`
| id | name  | salary | dept_id |
|----|-------|--------|---------|
| 1  | Alice | 90000  | 101     |
| 2  | Bob   | 80000  | 101     |
| 3  | Carol | 120000 | 102     |
| 4  | Dave  | 110000 | 102     |

**SQL Query:**
```sql
SELECT name, salary, dept_id
FROM employees AS e1
WHERE salary > (
    SELECT AVG(salary)
    FROM employees AS e2
    WHERE e2.dept_id = e1.dept_id
);
```

**Step-by-step Execution Trace:**

1.  **Outer query starts:** It considers the first row, `e1` = (`id`: 1, `name`: 'Alice', `salary`: 90000, `dept_id`: 101).
2.  **Inner query executes for Alice:** The outer query passes `e1.dept_id` (which is 101) to the inner query. The inner query becomes: `SELECT AVG(salary) FROM employees WHERE dept_id = 101;`.
3.  **Inner query calculates:** The average salary for department 101 (Alice and Bob) is $(90000 + 80000) / 2 = 85000$.
4.  **Outer query evaluates `WHERE` for Alice:** The condition becomes `WHERE 90000 > 85000`. This is true. Alice is included in the result set.
5.  **Outer query moves to next row:** It considers `e1` = (`id`: 2, `name`: 'Bob', `salary`: 80000, `dept_id`: 101).
6.  **Inner query re-executes for Bob:** It runs `SELECT AVG(salary) FROM employees WHERE dept_id = 101;` again. The result is still 85000.
7.  **Outer query evaluates `WHERE` for Bob:** The condition is `WHERE 80000 > 85000`. This is false. Bob is excluded.
8.  **Outer query moves to next row:** It considers `e1` = (`id`: 3, `name`: 'Carol', `salary`: 120000, `dept_id`: 102).
9.  **Inner query executes for Carol:** It runs `SELECT AVG(salary) FROM employees WHERE dept_id = 102;`. The average for department 102 (Carol and Dave) is $(120000 + 110000) / 2 = 115000$.
10. **Outer query evaluates `WHERE` for Carol:** The condition is `WHERE 120000 > 115000`. This is true. Carol is included.
11. **Process continues for Dave...** The inner query runs again for `dept_id = 102`, resulting in 115000. `110000 > 115000` is false. Dave is excluded.

**Final Result:**
| name  | salary | dept_id |
|-------|--------|---------|
| Alice | 90000  | 101     |
| Carol | 120000 | 102     |

**Reflection:** The key was the `WHERE e2.dept_id = e1.dept_id` clause. This created the "correlation" or link, forcing the inner query to re-evaluate for each distinct `dept_id` encountered in the outer query's scan. The aliases `e1` and `e2` are crucial for the database to distinguish between the outer and inner table references.

## Diagrams
Here is the logical flow of execution for both types.

**Uncorrelated Subquery Execution Flow:**
```text
(Find employees with salary > overall average)

+---------------------+      +-----------------------------+
| Outer Query         |      | Inner Query                 |
| (employees table)   |      | (SELECT AVG(salary)...)     |
+---------------------+      +-----------------------------+
        |                               ^
        |                               |
        +-------------------------------+
        1. Outer query PAUSES.
           Inner query runs ONCE.
           Result (e.g., 101250) is computed.
                                        |
                                        v
+------------------------------------------------------------------+
| Outer query RESUMES and uses the single result for every row.    |
| WHERE salary > 101250                                            |
+------------------------------------------------------------------+
```

**Correlated Subquery Execution Flow:**
```text
(Find employees with salary > their department's average)

+--------------------------------+
| Outer Query (employees as e1)  |
+--------------------------------+
     |
     | 1. Get first row (e.g., Alice, dept_id=101)
     |
     +-----> Pass e1.dept_id (101) ---->+------------------------------------+
                                        | Inner Query (employees as e2)      |
                                        | WHERE e2.dept_id = e1.dept_id (101)|
                                        +------------------------------------+
                                                          |
     <---- Return AVG for dept 101 <----------------------+
     |
     | 2. Evaluate WHERE for Alice.
     | 3. Get next row (e.g., Bob, dept_id=101)
     |
     +-----> Pass e1.dept_id (101) ---->+------------------------------------+
                                        | Inner Query runs AGAIN for dept 101|
                                        +------------------------------------+
                                                          |
     <---- Return AVG for dept 101 <----------------------+
     |
     | 4. Evaluate WHERE for Bob.
     | 5. ... and so on for every row.
     |
     v
  Final Result
```

## Memory technique — remember this forever
1.  **Mnemonic:**
    *   **C**orrelated is **C**onnected and **C**ostly. The inner query is connected to each row of the outer query, like a trailer hitched to a car, making the whole trip slower.
    *   **U**ncorrelated is **U**nconnected and **U**sually fast. The inner query runs on its own, delivers a package (the result), and is done.

2.  **Facts to Overlearn:**
    *   An uncorrelated subquery can be executed once, entirely on its own.
    *   A correlated subquery references a column from the outer query and is executed once *per outer row*.
    *   `WHERE inner_table.column = outer_table.column` is the classic pattern of a correlated subquery.

3.  **Spaced Repetition Schedule:** Review this material and re-do the worked example from memory at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget the distinction, ask yourself: "Can I highlight the inner `SELECT` statement and run it by itself in my SQL client?"
    *   If **yes**, it's **uncorrelated**. It has no external dependencies.
    *   If **no** (it gives an error like "unknown column `e1.dept_id`"), it's **correlated**. It depends on the outer query for context.

## Common mistakes
1.  **Performance Blindness:** Writing a correlated subquery on a large table (e.g., millions of rows) without realizing it will execute millions of times. Always consider a `JOIN` or window function as an alternative.
2.  **Using `IN` instead of `EXISTS`:** `SELECT ... WHERE column IN (correlated_subquery)` can be less efficient than `SELECT ... WHERE EXISTS (correlated_subquery)`. `EXISTS` just checks for the presence of any row and can stop processing the subquery as soon as one is found, whereas `IN` may need to build the full list of values from the subquery.
3.  **Scalar vs. Multi-row Subqueries:** Using a subquery that might return multiple rows in a context that expects a single (scalar) value, such as `WHERE id = (SELECT ...)` or in a `SELECT` list. This will cause a runtime error.

## Self-check
1.  Write a query to find all rockets in a `rockets` table that have a `launch_cost` less than the overall average `launch_cost`. Is this subquery correlated or uncorrelated? Why?
2.  You have two tables: `telemetry` (`timestamp`, `vehicle_id`, `altitude`) and `launches` (`launch_id`, `vehicle_id`, `launch_date`). Write a query to find the peak altitude for each vehicle *after* its official launch date. Explain the data flow and why a correlated subquery is a natural fit here.
3.  Rewrite the query from question #2 using a `JOIN`. Is it more or less complex to write? Which version do you expect to have better performance on a dataset with billions of telemetry points, and why?