## What it is
A database view is a stored `SELECT` query that is given a name and treated as a virtual table. It does not store data itself; instead, when you query the view, the database executes the underlying query to produce a result set on the fly. This provides a dynamic, filtered, or aggregated window into the data of one or more base tables.

## Why it matters
Views are critical for abstraction and security. In aerospace engineering, a telemetry database might contain thousands of raw sensor readings per second; a view like `v_launch_critical_pressures` can provide a clean, simple interface for launch controllers, showing only the relevant data and hiding the underlying complexity. For machine learning, views can pre-process and join data from multiple tables into a single, clean "feature table" for a model to consume, without duplicating the raw data.

## When to study it
You must be proficient with the SQL `SELECT` statement, including `FROM`, `WHERE`, `GROUP BY`, and especially `JOIN` clauses. A view is a direct application of these concepts, and you cannot understand views without first mastering the queries that define them. If you are not comfortable writing a query that joins three tables and filters the results, review that topic first.

## How to study it (step by step)
1.  **Setup:** Create two simple tables, `Rockets` and `Engines`.
    ```sql
    CREATE TABLE Rockets (
        rocket_id INT PRIMARY KEY,
        name VARCHAR(50),
        family VARCHAR(50)
    );
    CREATE TABLE Engines (
        engine_id INT PRIMARY KEY,
        rocket_id INT,
        type VARCHAR(50),
        thrust_kn INT,
        FOREIGN KEY (rocket_id) REFERENCES Rockets(rocket_id)
    );
    INSERT INTO Rockets VALUES (1, 'Falcon 9', 'Falcon'), (2, 'Starship', 'Super Heavy');
    INSERT INTO Engines VALUES (101, 1, 'Merlin 1D', 981), (102, 2, 'Raptor 2', 2256);
    ```
2.  **Create a Simple View:** Write the SQL to create a view that simplifies the `Rockets` table, showing only the `name`. Query it.
    ```sql
    CREATE VIEW v_RocketNames AS
    SELECT name FROM Rockets;

    SELECT * FROM v_RocketNames;
    ```
3.  **Create a Complex View:** Write a query that joins the two tables to show the rocket name and its engine type. Turn this query into a view.
    ```sql
    CREATE VIEW v_RocketEngineInfo AS
    SELECT r.name, e.type, e.thrust_kn
    FROM Rockets r
    JOIN Engines e ON r.rocket_id = e.rocket_id;

    SELECT * FROM v_RocketEngineInfo;
    ```
4.  **Test Updatability (Success):** Create a view on a single table with no aggregations. Try to update a value through the view and verify the change in the base table.
    ```sql
    CREATE VIEW v_FalconFamily AS
    SELECT rocket_id, name
    FROM Rockets
    WHERE family = 'Falcon';

    UPDATE v_FalconFamily SET name = 'Falcon 9 Block 5' WHERE rocket_id = 1;
    SELECT * FROM Rockets; -- Verify the base table was changed.
    ```
5.  **Test Updatability (Failure):** Try to update the complex view from step 3. Most database systems will reject this. Analyze the error message and understand *why* it failed.
    ```sql
    -- This will likely fail
    UPDATE v_RocketEngineInfo SET thrust_kn = 2300 WHERE name = 'Starship';
    ```
    The failure occurs because the view is based on a `JOIN`. If you update `thrust_kn`, the system knows it belongs to the `Engines` table. But if you tried to insert a new row, which `rocket_id` should it use? The mapping is ambiguous.

## Key ideas, with intuition
1.  **Views are Named Queries, not Data Copies:** A view is fundamentally a stored `SELECT` statement. It's a lens, not a photograph. When the data in the base tables changes, the view immediately reflects that change because it re-runs the query every time it's accessed. It provides *logical data independence*: you can change the underlying table structure, and as long as you can reconstruct the view to look the same, applications using the view don't break.
2.  **Abstraction and Simplification:** The primary purpose of a view is to hide complexity. A query joining five tables with complex `WHERE` clauses can be wrapped in a view called `v_mission_summary`. Users can then simply write `SELECT * FROM v_mission_summary;` without needing to understand the underlying schema.
3.  **Security through Restriction:** Views are a powerful security mechanism. You can create a view that exposes only certain columns (hiding sensitive data like salaries) or certain rows (e.g., `WHERE department = 'Propulsion'`). You then grant users permission to access the view, but not the underlying table.
4.  **Updatability Requires Unambiguity:** A view is updatable (allowing `INSERT`, `UPDATE`, `DELETE`) only if the database can trace a row in the view back to *exactly one row* in *one specific base table*. Any operation that breaks this one-to-one mapping makes a view read-only.
    $$ \text{View Row} \xrightarrow{\text{1-to-1}} \text{Base Table Row} \implies \text{Updatable} $$
    Operations that break this mapping include:
    *   Aggregate functions (`SUM()`, `COUNT()`, etc.)
    *   `GROUP BY` or `HAVING`
    *   `DISTINCT`
    *   Most `JOIN`s (especially many-to-one or many-to-many)
    *   Subqueries in the `SELECT` list

## Worked example
Let's create and update a simple, updatable view.

**Scenario:** We have a table of `TestSites` and we want to provide a simplified view for the logistics team that only shows sites in Texas and allows them to update the site manager.

**Step 1: Define the base table and data.**
```sql
CREATE TABLE TestSites (
    site_id INT PRIMARY KEY,
    location_name VARCHAR(100),
    state VARCHAR(2),
    manager VARCHAR(100)
);

INSERT INTO TestSites VALUES
(1, 'McGregor', 'TX', 'A. Smith'),
(2, 'Vandenberg', 'CA', 'B. Jones'),
(3, 'Boca Chica', 'TX', 'C. Miller');
```

**Step 2: Create the view.**
The view will select all columns but filter the rows to only include sites where `state` is 'TX'. This meets the criteria for an updatable view: it references a single table, has no aggregations, and each row in the view corresponds to exactly one row in the base table.
```sql
CREATE VIEW v_TexasSites AS
SELECT site_id, location_name, manager
FROM TestSites
WHERE state = 'TX';
```
Note we excluded the `state` column from the view itself, which is fine.

**Step 3: Query the view to see its initial state.**
```sql
SELECT * FROM v_TexasSites;
```
Result:
| site_id | location_name | manager     |
|---------|---------------|-------------|
| 1       | McGregor      | A. Smith    |
| 3       | Boca Chica    | C. Miller   |

**Step 4: Update data through the view.**
A new manager has been assigned to Boca Chica. We can issue an `UPDATE` statement directly against the view.
```sql
UPDATE v_TexasSites
SET manager = 'E. Musk'
WHERE location_name = 'Boca Chica';
```
This command succeeds. The database sees the `WHERE` clause, identifies that `location_name = 'Boca Chica'` corresponds to `site_id = 3` in the view, maps that to `site_id = 3` in the `TestSites` table, and applies the `SET manager = 'E. Musk'` change there.

**Step 5: Verify the change in the base table.**
To prove the view doesn't store data and that the underlying table was modified, we query the base table directly.
```sql
SELECT * FROM TestSites;
```
Result:
| site_id | location_name | state | manager     |
|---------|---------------|-------|-------------|
| 1       | McGregor      | TX    | A. Smith    |
| 2       | Vandenberg    | CA    | B. Jones    |
| 3       | Boca Chica    | TX    | E. Musk     | <-- The change is here.

**Reflection:** This worked because the operation was unambiguous. For each row in `v_TexasSites`, there is a clear, one-to-one correspondence with a row in `TestSites`. The database could confidently propagate the `UPDATE` from the virtual row in the view to the physical row in the table.

## Diagrams
This diagram shows the relationship between base tables, a view, and the end-user. The view acts as an abstraction layer.

```text
       +------------------+     +------------------+
       |   Base Table A   |     |   Base Table B   |
       | (e.g., Rockets)  |     | (e.g., Engines)  |
       +------------------+     +------------------+
              ^                          ^
              |                          |
              | [ Underlying SELECT ... JOIN ... ]
              |                          |
       +------V--------------------------V------+
       |                                        |
       |          THE VIEW (Virtual Table)      |
       |         (e.g., v_RocketEngineInfo)     |
       |                                        |
       +------------------^---------------------+
                          |
                          | [ User issues simple query: ]
                          | [ SELECT * FROM v_RocketEngineInfo; ]
                          |
                 +--------V--------+
                 |      User       |
                 +-----------------+
```

## Memory technique — remember this forever
1.  **Mnemonic:** A View is a **"Virtual Window"**.
    *   It's not a new room; it's a window into existing rooms (the base tables).
    *   The window can be shaped to show only part of a room (`WHERE`), or combine views from multiple rooms (`JOIN`).
    *   You can sometimes reach through the window to change something in the room (**updatable view**), but only if you have a clear, direct line of sight to a single object.
    *   If the window is like a funhouse mirror (`GROUP BY`, `COUNT()`), you can't reach through it to change anything because the reflection is distorted—the mapping is ambiguous.

2.  **Formulas/Facts to Overlearn:**
    *   **Creation Syntax:** `CREATE VIEW view_name AS SELECT column1, column2, ... FROM table_name WHERE condition;`
    *   **Updatability Rule:** A view is updatable if and only if the system can guarantee a one-to-one mapping from each view row to a corresponding row in a single base table.

3.  **Spaced Repetition Schedule:**
    *   Review this material and redo the examples in **1 day**.
    *   Explain the concept of an updatable view to an imaginary colleague in **3 days**.
    *   Write a new, complex view with a `JOIN` and a `GROUP BY` in **7 days**.
    *   Re-derive the updatability rule from first principles in **16 days**.
    *   Create a view that restricts column access for security in **35 days**.

4.  **First Principles Pathway:** If you forget everything, remember this: a view is just stored text—a query. Any command like `SELECT * FROM my_view` is rewritten by the database parser *before execution* into `SELECT * FROM (the_query_that_defines_my_view) AS my_view`. From this, you can deduce everything. An `UPDATE my_view` command must be rewriteable into a non-ambiguous `UPDATE base_table` command. If the original query involved aggregates or complex joins, this rewrite is impossible.

## Common mistakes
1.  **Materialized View Confusion:** Assuming a standard view stores data and is fast for complex aggregations. It's not. It re-runs the query every time. For performance-critical, pre-calculated results, you need a *materialized view*, which is a different concept that does store data.
2.  **Updating a `JOIN`:** Attempting to `INSERT` or `UPDATE` a view based on a `JOIN`. This is the most common point of failure. Unless the database has very specific rules and the join is on a primary key/foreign key, it will fail due to ambiguity.
3.  **`ORDER BY` in Views:** Including an `ORDER BY` clause in the view definition. While some systems allow this, it's bad practice. The order of rows in a relational table (or view) is not guaranteed. The `ORDER BY` clause should be used by the final query that *selects from* the view, not in the view itself.

## Self-check
1.  You have a table `Sensors` with columns `sensor_id`, `type`, `location`, `last_reading`, and `is_active` (a boolean). Write the SQL to create a view named `v_ActiveCryoSensors` that shows the `sensor_id` and `last_reading` for all active sensors of type 'cryogenic'.
2.  Consider a `Users` table (`user_id`, `name`) and an `AccessLogs` table (`log_id`, `user_id`, `login_time`). You create a view `v_UserLastLogin` with `SELECT u.name, MAX(a.login_time) AS last_login FROM Users u JOIN AccessLogs a ON u.user_id = a.user_id GROUP BY u.name;`. Is this view updatable? Explain precisely why or why not by referencing the key ideas of updatability.
3.  You have a `Parts` table and a `PartInventory` table with a strict one-to-one relationship (enforced by a unique foreign key). You create a view that joins them to show all information for each part. Can you `INSERT` a new row into this view? If so, how must the database interpret this command? If not, what is the fundamental ambiguity?