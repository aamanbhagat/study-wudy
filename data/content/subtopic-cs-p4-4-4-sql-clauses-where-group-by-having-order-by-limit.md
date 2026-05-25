## What it is
SQL clauses like `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`, and `LIMIT` are commands that filter, aggregate, sort, and constrain the rows returned by a `SELECT` statement. They form a data processing pipeline that transforms the raw data in your tables into a precise, ordered, and size-limited result set. Think of them not as separate commands, but as sequential stages of a single query operation.

## Why it matters
In any serious data analysis, you never want the entire raw dataset. When analyzing telemetry from a Falcon 9 launch, you'll use `WHERE` to isolate data from a specific sensor during a critical time window (e.g., max-Q), `GROUP BY` to calculate average pressures per second, `HAVING` to flag seconds where the average exceeds safety thresholds, and `ORDER BY` and `LIMIT` to show the single most critical anomaly. In machine learning, these clauses are essential for feature engineering, allowing you to create aggregated features from raw data directly in the database before loading it into a model.

## When to study it
You must be comfortable with the basic `SELECT ... FROM ...` syntax. You should understand the concepts of tables, rows (tuples), and columns (attributes) in a relational database. If you cannot confidently write a query to retrieve all columns from a single table, review that first.

## How to study it (step by step)
1.  **Create a Sample Table:** Set up a simple table named `launches`. Use columns: `id` (INT), `rocket_name` (VARCHAR), `payload_kg` (INT), `status` (VARCHAR, e.g., 'Success', 'Failure'), `launch_date` (DATE). Populate it with 10-15 rows of sample data.
2.  **Filter with `WHERE`:** Write a query to select only the launches where `status = 'Success'`. Then, write another to select successful launches with `payload_kg > 5000`. This isolates the concept of row-level filtering.
3.  **Aggregate with `GROUP BY`:** Write a query to count how many launches each `rocket_name` has performed. Use `SELECT rocket_name, COUNT(*) FROM launches GROUP BY rocket_name;`. Observe how multiple rows are collapsed into one summary row per rocket.
4.  **Filter Groups with `HAVING`:** Modify the previous query. Add a `HAVING COUNT(*) > 2` clause to find only the rockets that have launched more than twice. This demonstrates group-level filtering *after* aggregation.
5.  **Order with `ORDER BY`:** Take the result from the previous step and add `ORDER BY COUNT(*) DESC`. This sorts the results to show the most frequently launched rockets first.
6.  **Constrain with `LIMIT`:** Finally, add `LIMIT 1` to the query to find only the single most frequently launched rocket.
7.  **Combine All:** Construct a single query that uses all clauses in the correct order to answer a complex question, e.g., "From all successful launches carrying more than 1000kg, find the rocket types that have launched at least twice, and show the top 3 ordered by their total payload delivered."

## Key ideas, with intuition
1.  **The Logical Order of Operations:** This is the most critical concept. The clauses are *written* in one order, but the database *executes* them in another. Understanding this execution pipeline prevents 90% of errors.
    *   Written Order: `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`, `LIMIT`
    *   Execution Order: `FROM` -> `WHERE` -> `GROUP BY` -> `HAVING` -> `SELECT` -> `ORDER BY` -> `LIMIT`
    The `SELECT` clause, which defines what columns appear, is processed *after* filtering and grouping. This is why you can use aliases defined in `SELECT` within `ORDER BY`, but not within `WHERE`.

2.  **`WHERE` Filters Rows, `HAVING` Filters Groups:** This is the classic point of confusion.
    *   `WHERE` operates on individual rows, like a gatekeeper letting rows pass one by one *before* they are grouped. It cannot use aggregate functions (like `SUM()`, `COUNT()`).
    *   `HAVING` operates on the entire groups created by `GROUP BY`, like a quality control inspector checking the bundles of rows *after* they are grouped. It is almost always used with aggregate functions.
    $$ \text{Table} \xrightarrow{\text{WHERE (row filter)}} \text{Filtered Rows} \xrightarrow{\text{GROUP BY (bundling)}} \text{Groups} \xrightarrow{\text{HAVING (group filter)}} \text{Final Groups} $$

3.  **Aggregation Collapses Information:** `GROUP BY` fundamentally changes the granularity of your data. If you start with 100 telemetry readings (100 rows) and `GROUP BY sensor_id`, you might end up with only 5 rows, one for each unique sensor. Each of these 5 output rows represents a collapsed set of the original rows. This is why you can only `SELECT` columns that are either in the `GROUP BY` clause or are wrapped in an aggregate function (like `AVG(reading)` or `MAX(reading)`), as the database needs a rule to decide which value to show from the collapsed set.

## Worked example
Let's use a `telemetry` table from a rocket engine test stand.

| timestamp | sensor_id | reading_type | value |
| :--- | :--- | :--- | :--- |
| 10:00:01 | S1-TEMP | temperature | 1200 |
| 10:00:01 | S2-PRES | pressure | 30.1 |
| 10:00:02 | S1-TEMP | temperature | 1205 |
| 10:00:02 | S2-PRES | pressure | 35.5 |
| 10:00:03 | S1-TEMP | temperature | 1198 |
| 10:00:03 | S2-PRES | pressure | 36.2 |
| ... | ... | ... | ... |

**Goal:** Find the sensors whose average pressure reading was above 35.0, and show the top 2 highest-reading sensors.

**Query:**
```sql
SELECT
    sensor_id,
    AVG(value) AS avg_pressure
FROM
    telemetry
WHERE
    reading_type = 'pressure'
GROUP BY
    sensor_id
HAVING
    AVG(value) > 35.0
ORDER BY
    avg_pressure DESC
LIMIT 2;
```

**Step-by-step execution reflection:**
1.  `FROM telemetry`: The database engine first looks at the entire `telemetry` table.
2.  `WHERE reading_type = 'pressure'`: It scans the table and discards all rows that are not pressure readings (e.g., the temperature rows). Only the pressure data proceeds to the next stage.
3.  `GROUP BY sensor_id`: It takes the remaining rows and bundles them into groups, one for each unique `sensor_id`. All 'S2-PRES' rows go into one bucket.
4.  `HAVING AVG(value) > 35.0`: For each group, it calculates the average of the `value` column. If a group's average is not greater than 35.0, the entire group is discarded.
5.  `SELECT sensor_id, AVG(value) AS avg_pressure`: Now, for the surviving groups, it prepares the final output columns: the `sensor_id` (which is the same for every row in the group) and the calculated average, which it aliases as `avg_pressure`.
6.  `ORDER BY avg_pressure DESC`: It sorts the resulting rows (one per surviving group) in descending order based on the `avg_pressure` we just calculated.
7.  `LIMIT 2`: It takes the first 2 rows from the sorted result and discards the rest. This gives us our final answer.

## Diagrams
This diagram shows the logical data flow through the SQL query pipeline.

```text
               +----------------------+
               |   Full Table (FROM)  |
               +----------------------+
                       |
                       |
         +-------------V-------------+
         |   WHERE Clause            |  <-- Filters individual rows
         | (e.g., reading_type='pressure') |
         +---------------------------+
                       |
                       | (Filtered Rows)
                       |
         +-------------V-------------+
         |   GROUP BY Clause         |  <-- Bundles rows into groups
         | (e.g., by sensor_id)      |
         +---------------------------+
                       |
                       | (Aggregated Groups)
                       |
         +-------------V-------------+
         |   HAVING Clause           |  <-- Filters entire groups
         | (e.g., AVG(value) > 35)   |
         +---------------------------+
                       |
                       | (Final Groups)
                       |
         +-------------V-------------+
         |   SELECT Clause           |  <-- Prepares output columns
         +---------------------------+
                       |
                       | (Result Set)
                       |
         +-------------V-------------+
         |   ORDER BY Clause         |  <-- Sorts the final result set
         +---------------------------+
                       |
                       | (Sorted Result Set)
                       |
         +-------------V-------------+
         |   LIMIT Clause            |  <-- Takes a slice of the result
         +---------------------------+
                       |
                       V
               +----------------------+
               |   Final Output       |
               +----------------------+
```

## Memory technique — remember this forever
1.  **Mnemonic:** To remember the logical **execution** order, which is what truly matters, use this: "**F**rom **W**orldly **G**iants **H**aving **S**trong **O**rders **L**imited".
    *   **F**ROM, **W**HERE, **G**ROUP BY, **H**AVING, **S**ELECT, **O**RDER BY, **L**IMIT.

2.  **Facts to Overlearn:**
    *   The full clause order as written: `SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT ...;`
    *   `WHERE` filters rows *before* grouping.
    *   `HAVING` filters groups *after* grouping.

3.  **Spaced Repetition Schedule:**
    *   Day 1: Re-write the worked example from memory.
    *   Day 3: Complete the self-check questions.
    *   Day 7: Create a new sample table (e.g., `experiments`) and write a query using all clauses.
    *   Day 16: Explain the difference between `WHERE` and `HAVING` to a rubber duck or a colleague.
    *   Day 35: Re-draw the ASCII pipeline diagram from memory.

4.  **First Principles Pathway:** If you forget, rebuild from the logic of data reduction.
    *   You must start with a source of data (`FROM`).
    *   It is most efficient to remove unwanted individual data points first (`WHERE`).
    *   Then, you must aggregate the remaining points into summaries (`GROUP BY`).
    *   Now you can remove unwanted summaries (`HAVING`).
    *   Only now can you arrange the final presentation: choose columns (`SELECT`), sort them (`ORDER BY`), and take the top few (`LIMIT`).

## Common mistakes
1.  **`WHERE` with Aggregates:** Writing `WHERE COUNT(*) > 10`. This is invalid because `WHERE` operates on rows before `COUNT(*)` is even calculated. The correct approach is `HAVING COUNT(*) > 10`.
2.  **`SELECT`ing a non-aggregated, non-grouped column:** Writing `SELECT rocket_name, status, COUNT(*) FROM launches GROUP BY rocket_name;`. This is an error. If you group by `rocket_name`, the database collapses multiple `status` values ('Success', 'Failure') into one group. It doesn't know which single `status` to show. You must either group by `status` as well, or apply an aggregate like `MAX(status)`.
3.  **Confusing `GROUP BY` with `ORDER BY`:** `GROUP BY` bundles rows together for aggregation. `ORDER BY` sorts the final output rows. They serve completely different purposes. `GROUP BY` affects the calculation; `ORDER BY` affects the presentation.

## Self-check
1.  Given the `launches` table, write a query to find all 'Failure' launches that carried a payload of less than 2000 kg.
2.  Write a query to find the total payload mass (`SUM(payload_kg)`) launched by each rocket type.
3.  Write a query to identify rocket types that have a perfect success record (`status = 'Success'` for all their launches) and have launched at least 3 times. Display the result with the rocket that has launched the most at the top.