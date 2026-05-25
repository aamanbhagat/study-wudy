## What it is
Window functions perform a calculation across a set of table rows that are somehow related to the current row. Unlike aggregate functions which collapse rows into a single output row, window functions return a value for *each* row based on the "window" of related rows defined by the `OVER()` clause.

## Why it matters
This is fundamental for any kind of sequence or time-series analysis. In aerospace, you'll use window functions to analyze rocket telemetry data—calculating the rate of change in velocity (`LEAD` or `LAG`) or ranking sensor readings within a specific flight phase (`RANK`). In machine learning, they are critical for feature engineering, such as creating features that capture trends or comparisons over time for a given user or device.

## When to study it
You must be proficient with standard SQL before tackling this. Specifically, ensure you have a solid grasp of:
*   `SELECT`, `FROM`, `WHERE`, `JOIN` clauses.
*   Aggregate functions like `COUNT()`, `SUM()`, `AVG()`.
*   The `GROUP BY` and `ORDER BY` clauses.
If you are unclear on the difference between `WHERE` and `HAVING`, you are not ready.

## How to study it (step by step)
1.  **Master the `OVER()` clause.** Create a simple table (e.g., `students` with `name`, `course`, `grade`). Write a query using `ROW_NUMBER() OVER (ORDER BY grade DESC)`. Observe how it assigns a unique number to each row based on the ordering.
2.  **Introduce partitioning.** Add `PARTITION BY course` to your `OVER()` clause. Notice how the row numbering now restarts for each distinct `course`. This is the most crucial concept to internalize.
3.  **Differentiate the rankers.** Using the same table, add ties (two students with the same grade in the same course). Run separate queries for `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()`. Write down the output for each and explain in one sentence why they differ.
4.  **Practice `LAG` and `LEAD`.** Create a table of `telemetry` with `timestamp`, `mission_id`, `velocity`. Write a query using `LAG(velocity, 1) OVER (PARTITION BY mission_id ORDER BY timestamp)` to find the previous velocity reading for each entry. Then, modify it to use `LEAD` to find the next one.
5.  **Solve a classic problem.** Find the top 3 highest-paid employees in each department. This forces you to combine partitioning, ordering, and a ranking function, then filter the results using a subquery or Common Table Expression (CTE).
6.  **Explore framing.** Briefly read about the `ROWS` or `RANGE` clause within `OVER()`. Understand it allows you to define the window more precisely (e.g., "the preceding 2 rows and the current row"). This is the next level of control.

## Key ideas, with intuition
1.  **The Window Frame:** The `OVER()` clause defines the "window" of rows the function can see. `PARTITION BY` splits all rows into groups, and the function is applied independently to each group. `ORDER BY` sorts the rows within each partition, which is essential for functions that depend on order, like ranks or `LAG`/`LEAD`.

2.  **`PARTITION BY` vs. `GROUP BY`:** A `GROUP BY` clause collapses multiple rows into a single summary row. A `PARTITION BY` clause *does not* collapse rows; it keeps all the original rows but allows window functions to compute values within these partitions. Think of `PARTITION BY` as drawing boxes around groups of rows, while `GROUP BY` puts each group into a blender and gives you one smoothie per group.

3.  **Ranking Functions Handle Ties Differently:** This is the core distinction between them.
    *   `ROW_NUMBER()`: Ignores ties. Assigns a unique, consecutive integer to each row. Think bib numbers in a race. $1, 2, 3, 4, ...$
    *   `RANK()`: Gives the same rank to tied rows. Skips the next rank(s) to compensate for the tie. Think Olympic medals (two silver medalists means no bronze). $1, 2, 2, 4, ...$
    *   `DENSE_RANK()`: Gives the same rank to tied rows but does *not* skip the next rank. It's "dense". $1, 2, 2, 3, ...$

4.  **`LAG` and `LEAD` are about Peeking:** These functions let a row "peek" at a value in a preceding (`LAG`) or following (`LEAD`) row within its partition. This is indispensable for calculating differences, growth rates, or any sequence-based logic.

## Worked example
**Problem:** From a table of employee salaries, find the top 2 highest salaries in each department.

**Table:** `employees`
| id | name | department | salary |
|----|--------|------------|--------|
| 1 | Alice | Engineering| 90000 |
| 2 | Bob | Engineering| 95000 |
| 3 | Charlie| Engineering| 95000 |
| 4 | David | HR | 70000 |
| 5 | Eve | HR | 75000 |
| 6 | Frank | Sales | 80000 |
| 7 | Grace | Sales | 82000 |
| 8 | Heidi | Sales | 80000 |

**Step 1: Write a query to rank employees within each department by salary.**
We need to partition by `department` and order by `salary` descending. `DENSE_RANK()` is a good choice because if two people have the same top salary, we still want to find the person with the next-highest salary as rank #2.

```sql
SELECT
    name,
    department,
    salary,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as salary_rank
FROM
    employees;
```

**Intermediate Result:**
| name | department | salary | salary_rank |
|---------|-------------|--------|-------------|
| Bob | Engineering | 95000 | 1 |
| Charlie | Engineering | 95000 | 1 |
| Alice | Engineering | 90000 | 2 |
| Eve | HR | 75000 | 1 |
| David | HR | 70000 | 2 |
| Grace | Sales | 82000 | 1 |
| Frank | Sales | 80000 | 2 |
| Heidi | Sales | 80000 | 2 |

**Step 2: Filter this result to keep only rows where the rank is 2 or less.**
Standard SQL does not allow a window function in the `WHERE` clause. Therefore, we must use a subquery or a Common Table Expression (CTE). A CTE is more readable.

```sql
WITH RankedSalaries AS (
    SELECT
        name,
        department,
        salary,
        DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as salary_rank
    FROM
        employees
)
SELECT
    name,
    department,
    salary,
    salary_rank
FROM
    RankedSalaries
WHERE
    salary_rank <= 2;
```

**Final Result:**
| name | department | salary | salary_rank |
|---------|-------------|--------|-------------|
| Bob | Engineering | 95000 | 1 |
| Charlie | Engineering | 95000 | 1 |
| Alice | Engineering | 90000 | 2 |
| Eve | HR | 75000 | 1 |
| David | HR | 70000 | 2 |
| Grace | Sales | 82000 | 1 |
| Frank | Sales | 80000 | 2 |
| Heidi | Sales | 80000 | 2 |

**Reflection:**
- Step 1 worked because the `PARTITION BY department` clause correctly isolated the ranking logic within 'Engineering', 'HR', and 'Sales' independently.
- The `ORDER BY salary DESC` ensured that higher salaries got lower rank numbers.
- Step 2 worked because the CTE materializes the result of the window function, giving it an alias (`salary_rank`) that can then be filtered in the outer `WHERE` clause.

## Diagrams
Difference between ranking functions on a dataset of scores: `[95, 90, 90, 85]`

```text
Scores | ROW_NUMBER() | RANK()      | DENSE_RANK()
-------|--------------|-------------|--------------
  95   |      1       |      1      |      1
  90   |      2       |      2      |      2  <-- Tie
  90   |      3       |      2      |      2  <-- Tie
  85   |      4       |      4      |      3
                        ^             ^
                        |             |
                   Gap created.   No gap.
```

`LAG` and `LEAD` within a partition:

```text
Partition (e.g., mission_id = 'APOLLO-11')
+-----------+----------+-----------------+----------------+
| timestamp | velocity | LAG(velocity)   | LEAD(velocity) |
+-----------+----------+-----------------+----------------+
|   10:01   |  1500    |      NULL       |     1550       |
|           |          |  (peeks up) ^   |     (peeks down)
|   10:02   |  1550    |      1500   |   |     1620       |
|           |          |             |   v                |
|   10:03   |  1620    |      1550       |      NULL      |
+-----------+----------+-----------------+----------------+
```

## Memory technique — remember this forever
1.  **The Story: The Race Podium**
    *   **ROW_NUMBER:** The announcer calls out finishers one by one. `1st, 2nd, 3rd, 4th...` Everyone gets a unique number.
    *   **RANK:** The Olympic medal ceremony. Two runners tie for silver. You award `Gold, Silver, Silver`. You *skip* the Bronze medal because two people took the second spot. The next person is 4th.
    *   **DENSE_RANK:** A friendly local race. Two runners tie for 2nd place. You still award them both 2nd place, but the next finisher is awarded 3rd place. No ranks are skipped.
    *   **LAG/LEAD:** You are a runner. `LAG` is looking over your shoulder to see the person behind you. `LEAD` is looking ahead to see the person in front of you.

2.  **Overlearn this syntax:**
    `FUNCTION() OVER (PARTITION BY col1, ... ORDER BY col2, ...)`

3.  **Spaced Repetition Schedule:**
    Review this material and re-do the worked example from scratch at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:**
    If you forget everything, start here: "I need to compute a value for this row, but the calculation needs information from *other* rows." This immediately tells you it's not a simple `WHERE` filter or a `GROUP BY` aggregate. The next question is, "Which other rows?" The answer to that defines your `PARTITION BY` and `ORDER BY` clauses. The specific calculation you need (a rank? a previous value?) tells you which function (`RANK`, `LAG`, etc.) to use.

## Common mistakes
1.  **Putting a window function in `WHERE`.** `SELECT * FROM employees WHERE RANK() OVER (...) = 1;` is illegal. The `WHERE` clause is evaluated *before* window functions. You must use a CTE or subquery to filter on the result of a window function.
2.  **Confusing `PARTITION BY` with `GROUP BY`.** Writing a window function and then wondering why the number of rows didn't decrease. Remember: `PARTITION BY` doesn't collapse rows.
3.  **Forgetting `ORDER BY` for ranking/positional functions.** `RANK() OVER (PARTITION BY department)` is meaningless. A rank requires an order. The database will often throw an error or produce non-deterministic results.
4.  **Off-by-one with `LAG`/`LEAD`.** Forgetting that the default offset for `LAG` and `LEAD` is 1. If you need to look back 3 rows, you must specify `LAG(column, 3)`.

## Self-check
1.  Given a table `flights (flight_id, sequence_num, event_name, timestamp)`, write a query to label each event with a sequential number (`1, 2, 3, ...`) for each `flight_id`, ordered by `timestamp`.
2.  Given the `employees` table from the example, write a query to find all employees who earn less than the average salary *of their own department*.
3.  Given a table `stock_prices (ticker, price_date, close_price)`, write a query to calculate the 3-day moving average of the closing price for each stock ticker.