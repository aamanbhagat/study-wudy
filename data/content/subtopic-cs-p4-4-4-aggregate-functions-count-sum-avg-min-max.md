## What it is
Aggregate functions are operations in SQL that take a set of values from a column as input and return a single, summary value. Instead of returning many rows, an aggregate function collapses them into one result, such as a total count, a sum, or an average.

## Why it matters
In aerospace and physics, you are constantly dealing with massive streams of data from sensors or simulations. Aggregate functions are the primary tool for reducing this data into meaningful statistics: finding the maximum stress on a rocket airframe during launch (`MAX`), calculating the average temperature of a component over time (`AVG`), or counting the number of anomalous readings (`COUNT`). In machine learning, these functions are fundamental for feature engineering, where you create summary features (e.g., average user purchase value) from raw data.

## When to study it
You must be comfortable with the basic SQL `SELECT` statement, including the `FROM` and `WHERE` clauses. You should be able to write a query that retrieves specific columns and filters rows based on a condition from a single table. If you cannot do this reliably, master that first.

## How to study it (step by step)
1.  **Setup:** Create a simple table named `sensor_data` with columns `id (INT)`, `sensor_name (TEXT)`, `reading_time (TIMESTAMP)`, and `temperature_c (FLOAT)`. Insert 10-15 rows of sample data, including a few `NULL` values in the `temperature_c` column.
2.  **Count:** Write a query to find the total number of readings: `SELECT COUNT(*) FROM sensor_data;`. Now, find the number of non-null temperature readings: `SELECT COUNT(temperature_c) FROM sensor_data;`. Observe and explain the difference in the results.
3.  **Sum & Average:** Calculate the sum of all temperature readings: `SELECT SUM(temperature_c) FROM sensor_data;`. Next, calculate the average: `SELECT AVG(temperature_c) FROM sensor_data;`. Manually verify that `AVG(temperature_c)` is equal to `SUM(temperature_c) / COUNT(temperature_c)`.
4.  **Min & Max:** Find the lowest and highest temperatures recorded: `SELECT MIN(temperature_c), MAX(temperature_c) FROM sensor_data;`.
5.  **Filtering First:** Combine an aggregate with a `WHERE` clause. Find the average temperature for a specific sensor, e.g., `'EngineGimbal'`: `SELECT AVG(temperature_c) FROM sensor_data WHERE sensor_name = 'EngineGimbal';`. This demonstrates that filtering happens *before* aggregation.
6.  **Grouping:** This is the critical step. Find the average temperature *for each sensor*. Use the `GROUP BY` clause: `SELECT sensor_name, AVG(temperature_c) FROM sensor_data GROUP BY sensor_name;`. Analyze the output. The database first partitions the rows by `sensor_name` and then applies the `AVG()` function to each partition.

## Key ideas, with intuition
1.  **Vertical Collapse:** An aggregate function takes a vertical column of values and collapses it into a single value. Imagine squashing a column of numbers down until only one summary number remains.

2.  **The Power of `GROUP BY`:** By itself, an aggregate function operates on the entire table (or the subset defined by `WHERE`). The `GROUP BY` clause is its essential partner. It tells the database to first split the rows into smaller "buckets" based on the values in the grouping column(s), and *then* perform the aggregation on each bucket independently.

3.  **`NULL`s are Ignored (Mostly):** All aggregate functions except `COUNT(*)` ignore `NULL` values in their calculation. `SUM`, `AVG`, `MIN`, `MAX` operate only on the non-`NULL` data. `COUNT(column_name)` counts non-`NULL` values in that column, whereas `COUNT(*)` counts all rows, regardless of `NULL`s. This is a subtle but critical distinction.
    $$ \text{AVG(col)} = \frac{\text{SUM(col)}}{\text{COUNT(col)}} $$
    This identity holds because both `SUM` and `COUNT(col)` ignore the same `NULL` values.

## Worked example
Let's analyze telemetry from a rocket's fuel tanks. We have a table `tank_pressure` with the following data:

| timestamp | tank_id | pressure_psi |
| :--- | :--- | :--- |
| 100 | LOX | 75.1 |
| 101 | LOX | 75.3 |
| 102 | LOX | 74.9 |
| 100 | RP1 | 68.2 |
| 101 | RP1 | 68.5 |
| 102 | RP1 | 68.3 |

**Problem:** Find the minimum and maximum pressure recorded for each tank.

**Solution:**

1.  **Goal:** We need two summary values (`MIN`, `MAX`) for each distinct `tank_id`. The phrase "for each" is a strong signal that we need `GROUP BY`.
2.  **`SELECT` clause:** We want to see the tank identifier and its corresponding min and max pressures. So we select `tank_id`, `MIN(pressure_psi)`, and `MAX(pressure_psi)`.
3.  **`FROM` clause:** The data is in the `tank_pressure` table. So, `FROM tank_pressure`.
4.  **`GROUP BY` clause:** We need to perform the aggregation separately for the 'LOX' group and the 'RP1' group. So, we group by the `tank_id` column: `GROUP BY tank_id`.

**Final Query:**
```sql
SELECT
    tank_id,
    MIN(pressure_psi) AS min_pressure,
    MAX(pressure_psi) AS max_pressure
FROM
    tank_pressure
GROUP BY
    tank_id;
```

**Result:**

| tank_id | min_pressure | max_pressure |
| :--- | :--- | :--- |
| LOX | 74.9 | 75.3 |
| RP1 | 68.2 | 68.5 |

**Reflection:**
- The `GROUP BY tank_id` step conceptually split our original table into two sub-tables, one for 'LOX' and one for 'RP1'.
- The `MIN(pressure_psi)` and `MAX(pressure_psi)` functions were then applied to the `pressure_psi` column of each sub-table independently.
- The `SELECT tank_id, ...` is valid because `tank_id` is the grouping key; its value is constant within each group being aggregated.

## Diagrams
**Diagram 1: Aggregation without `GROUP BY`**

This shows the "vertical collapse" of a single column for the whole table.

```text
Table: sensor_data
+---------------+
| temperature_c |
|---------------|
| 25.4          |  \
| 26.1          |   \
| 25.9          |    \   SELECT AVG(temperature_c)
| NULL          |     >--------------------------->  Result: 25.8
| 25.8          |    /
+---------------+   /
```

**Diagram 2: Aggregation with `GROUP BY`**

This shows the table being partitioned first, then each partition is collapsed.

```text
Table: sensor_data
+-------------+---------------+
| sensor_name | temperature_c |
|-------------|---------------|
| 'TankA'     | 25.4          | --+
| 'TankB'     | 88.1          | --|---+
| 'TankA'     | 26.2          | --+   |
| 'TankB'     | 87.9          | --|---+
+-------------+---------------+     |
                                    | GROUP BY sensor_name
                                    V
+-----------------------------------+-----------------------------------+
| Group: 'TankA'                    | Group: 'TankB'                    |
| +---------------+                 | +---------------+                 |
| | temperature_c |                 | | temperature_c |                 |
| |---------------|                 | |---------------|                 |
| | 25.4          | --\ AVG         | | 88.1          | --\ AVG         |
| | 26.2          | --/-----> 25.8  | | 87.9          | --/-----> 88.0  |
| +---------------+                 | +---------------+                 |
+-----------------------------------+-----------------------------------+
                                    |
                                    V
                                  Result
                         +-------------+------------------+
                         | sensor_name | AVG(temperature) |
                         |-------------|------------------|
                         | 'TankA'     | 25.8             |
                         | 'TankB'     | 88.0             |
                         +-------------+------------------+
```

## Memory technique — remember this forever
1.  **Mnemonic:** **SCAMM**
    - **S**UM
    - **C**OUNT
    - **A**VG
    - **M**IN
    - **M**AX
    Think of aggregate functions as a way to "SCAMM" a huge dataset down to a few essential numbers.

2.  **Must Overlearn:**
    *   Syntax without grouping: `SELECT AGG_FUNC(column) FROM table;`
    *   Syntax with grouping: `SELECT group_column, AGG_FUNC(data_column) FROM table GROUP BY group_column;`
    *   The `NULL` rule: All aggregate functions except `COUNT(*)` ignore `NULL` values.

3.  **Spaced Repetition Schedule:**
    - Review and re-do the "How to study it" steps in: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read; re-type the queries and predict the output.

4.  **First Principles Pathway:**
    If you forget the syntax, remember what it's doing conceptually. An aggregate is a loop. `SELECT SUM(pressure) FROM telemetry;` is just code for:
    ```
    total_pressure = 0
    for each row in the telemetry table:
        if row.pressure is not NULL:
            total_pressure += row.pressure
    return total_pressure
    ```
    `GROUP BY` adds an outer loop or a hash map:
    ```
    totals_by_sensor = {} // A map from sensor_id to its total
    for each row in the telemetry table:
        key = row.sensor_id
        if row.pressure is not NULL:
            totals_by_sensor[key] += row.pressure
    return totals_by_sensor
    ```
    The SQL syntax is just a declarative way to express these fundamental loops.

## Common mistakes
1.  **Selecting a non-aggregated column that isn't in `GROUP BY`:**
    - `SELECT sensor_name, MAX(temperature_c) FROM sensor_data;`
    - **Why it's wrong:** This query returns a single value for `MAX(temperature_c)`. Which of the many `sensor_name` values should the database show next to it? It's ambiguous. Most SQL engines will throw an error. The only non-aggregated columns allowed in the `SELECT` list are the ones you are grouping by.

2.  **Using `WHERE` to filter on the result of an aggregate:**
    - `SELECT sensor_name, AVG(temperature_c) FROM sensor_data GROUP BY sensor_name WHERE AVG(temperature_c) > 50;`
    - **Why it's wrong:** The `WHERE` clause filters rows *before* they are grouped and aggregated. The database doesn't know the value of `AVG(temperature_c)` at the `WHERE` stage. The correct way is to use the `HAVING` clause, which filters groups *after* aggregation: `... GROUP BY sensor_name HAVING AVG(temperature_c) > 50;`

3.  **Confusing `COUNT(*)` with `COUNT(column)`:**
    - `SELECT COUNT(*) FROM sensor_data;` counts all rows.
    - `SELECT COUNT(temperature_c) FROM sensor_data;` counts only the rows where `temperature_c` is not `NULL`. If your data has missing values, these two queries will produce different results, leading to incorrect calculations if you're not careful.

## Self-check
1.  Given a table `launches(id, launch_date, rocket_type, outcome)`, write a query to find the total number of successful launches.
2.  Given a table `astronauts(id, name, country, hours_in_space)`, write a query to find the average number of hours in space for astronauts from each country.
3.  Given a table `engine_tests(test_id, engine_id, thrust_kn, duration_s)`, write a query to find the `engine_id` of all engines whose maximum recorded thrust (`MAX(thrust_kn)`) was greater than 2000 kN.