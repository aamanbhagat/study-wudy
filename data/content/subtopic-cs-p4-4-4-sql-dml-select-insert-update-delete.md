## What it is
SQL's Data Manipulation Language (DML) is the subset of commands used to manage the data within database objects like tables. It consists of four core operations: `SELECT` (to retrieve data), `INSERT` (to add new data), `UPDATE` (to modify existing data), and `DELETE` (to remove data). These commands do not alter the database's structure (its schema), only the information it contains.

## Why it matters
DML is the fundamental language for interacting with stored data. In aerospace, telemetry data from a launch vehicle is continuously inserted into a database; post-flight analysis involves complex `SELECT` queries to correlate sensor readings over time. In machine learning, you use DML to select training data, insert model performance metrics after each run, and update records with new labels. In physics, experimental results from particle accelerators are stored and queried using DML to find events that match specific energy signatures.

## When to study it
Before tackling DML, you must understand the basics of the relational model. Ensure you are comfortable with these concepts:
*   **Relational Database:** What it is and why it's used.
*   **Tables, Rows, and Columns:** The basic structural components. A table is a relation, a row is a tuple, and a column is an attribute.
*   **Data Types:** `INT`, `VARCHAR`, `TIMESTAMP`, etc.
*   **Primary Keys & Foreign Keys:** The concepts of unique identifiers and relationships between tables.
*   **SQL DDL:** You should know how to create a basic table using `CREATE TABLE`.

If these terms are unfamiliar, review them first. DML is meaningless without a structure to manipulate.

## How to study it (step by step)
1.  **Setup:** Create a simple table to work with. Use the Data Definition Language (DDL) for this. Example: `CREATE TABLE missions (id INT PRIMARY KEY, name VARCHAR(100), launch_date DATE, status VARCHAR(20));`.
2.  **Populate (`INSERT`):** Practice adding data. Start by inserting one complete row. Then, try inserting a row specifying only certain columns. Insert multiple rows with a single command.
3.  **Retrieve (`SELECT`):** This is the most powerful command. Start with `SELECT * FROM missions;` to see all data. Then, select specific columns. Add a `WHERE` clause to filter rows based on a condition (e.g., `WHERE status = 'Success';`). Practice using logical operators (`AND`, `OR`) in your `WHERE` clause.
4.  **Modify (`UPDATE`):** Practice changing existing data. Write an `UPDATE` statement with a `WHERE` clause to change a single row. For example, change a mission's status from 'Scheduled' to 'In-Flight'. **Crucially, run the `SELECT` statement with the same `WHERE` clause first to see exactly what you are about to change.**
5.  **Remove (`DELETE`):** Practice deleting data. Write a `DELETE` statement with a `WHERE` clause to remove a specific mission. Again, run a `SELECT` with the same `WHERE` clause first to confirm you are targeting the correct rows.
6.  **Synthesize:** Perform a full lifecycle operation. `INSERT` a new test mission. `UPDATE` its status. `SELECT` it to confirm the change. Finally, `DELETE` it. This sequence solidifies the purpose of each command.

## Key ideas, with intuition
1.  **Declarative Nature:** SQL is declarative. You specify *what* data you want, not *how* to get it. When you write `SELECT name FROM missions WHERE status = 'Success';`, you are not writing a `for` loop to iterate through rows and check a condition. You are defining the properties of the result set you desire, and the database's query optimizer determines the most efficient procedure to retrieve it.
2.  **Set-Based Operations:** DML commands operate on sets of rows. A `WHERE` clause is a predicate that defines a subset of the total set of rows in a table. An `UPDATE` or `DELETE` without a `WHERE` clause applies to the *entire set* of rows. This is why the `WHERE` clause is your most important tool for precision.
    $$
    \text{Target Rows} = \{ r \in \text{Table} \mid P(r) \}
    $$
    Here, $r$ is a row and $P(r)$ is the predicate defined by the `WHERE` clause. The operation applies to every element in the set "Target Rows".
3.  **The Four Atomic Actions (CRUD):** All interactions with data boil down to four actions: Create, Read, Update, and Delete. SQL DML provides a direct mapping:
    *   **C**reate -> `INSERT`
    *   **R**ead -> `SELECT`
    *   **U**pdate -> `UPDATE`
    *   **D**elete -> `DELETE`
    Think of these as the four fundamental verbs you can use to "speak" to your data.

## Worked example
Let's manage data in a `payloads` table for a rocket company.

**Schema:** `CREATE TABLE payloads (id INT PRIMARY KEY, name VARCHAR(50), mass_kg INT, destination_orbit VARCHAR(50));`

**Step 1: `INSERT` new data.**
We have two new payloads to log.

```sql
INSERT INTO payloads (id, name, mass_kg, destination_orbit) VALUES
(1, 'StarLink-4A', 15600, 'LEO'),
(2, 'GPS-IIIF-1', 3880, 'MEO');
```

**Reflection:** We created two new rows in the table by providing values for each column, matching the order and data types defined in the schema.

**Step 2: `SELECT` to verify.**
Let's check the contents of the table.

```sql
SELECT * FROM payloads;
```

**Reflection:** This reads and returns all rows and columns, confirming our `INSERT` was successful. The database now contains the two records.

**Step 3: `UPDATE` existing data.**
Mission control reports the GPS satellite's final mass is slightly higher after adjustments. We need to correct the record for `id = 2`.

```sql
UPDATE payloads
SET mass_kg = 3910
WHERE id = 2;
```

**Reflection:** The `WHERE` clause isolated the exact row we needed to modify. The `SET` clause specified which column to change and its new value. Without `WHERE id = 2`, we would have set the mass of *all* payloads to 3910, a critical error.

**Step 4: `DELETE` obsolete data.**
The StarLink mission was a test batch and the record is no longer needed for this manifest. Let's remove it.

```sql
DELETE FROM payloads
WHERE name = 'StarLink-4A';
```

**Reflection:** The `WHERE` clause identified the row to be removed. The `DELETE` command then permanently erased that row from the table. The table now contains only the GPS satellite record.

## Diagrams
Here is the state of the `payloads` table through the worked example.

**After `INSERT`:**
```text
payloads
+----+-------------+---------+-------------------+
| id | name        | mass_kg | destination_orbit |
+----+-------------+---------+-------------------+
| 1  | StarLink-4A | 15600   | LEO               |
| 2  | GPS-IIIF-1  | 3880    | MEO               |
+----+-------------+---------+-------------------+
```

**After `UPDATE`:**
```text
payloads
+----+-------------+---------+-------------------+
| id | name        | mass_kg | destination_orbit |
+----+-------------+---------+-------------------+
| 1  | StarLink-4A | 15600   | LEO               |
| 2  | GPS-IIIF-1  | 3910    | MEO               |  <-- mass_kg changed
+----+-------------+---------+-------------------+
```

**After `DELETE`:**
```text
payloads
+----+-------------+---------+-------------------+
| id | name        | mass_kg | destination_orbit |
+----+-------------+---------+-------------------+
| 2  | GPS-IIIF-1  | 3910    | MEO               |
+----+-------------+---------+-------------------+
```

## Memory technique — remember this forever
1.  **Mnemonic:** **CRUD**. It stands for **C**reate, **R**ead, **U**pdate, **D**elete. This is the universal acronym for data manipulation. Map it directly to the SQL commands:
    *   `INSERT` **C**reates data.
    *   `SELECT` **R**eads data.
    *   `UPDATE` **U**pdates data.
    *   `DELETE` **D**eletes data.

2.  **Must-Overlearn Syntax:** Burn these four structures into your memory.
    *   `INSERT INTO table_name (column1, column2) VALUES (value1, value2);`
    *   `SELECT column1, column2 FROM table_name WHERE condition;`
    *   `UPDATE table_name SET column1 = value1 WHERE condition;`
    *   `DELETE FROM table_name WHERE condition;`

3.  **Spaced Repetition Schedule:** Review and practice these commands at these intervals from today:
    *   1 day (tomorrow)
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget the syntax, reason from relational algebra. You are operating on a relation (a table, which is a set of tuples).
    *   To read data (`SELECT`), you are performing a **Selection** ($\sigma$) to filter rows based on a condition, followed by a **Projection** ($\pi$) to choose which columns to display. `SELECT name, mass_kg FROM payloads WHERE mass_kg > 4000` is conceptually $\pi_{\text{name, mass\_kg}}(\sigma_{\text{mass\_kg > 4000}}(\text{payloads}))$.
    *   `INSERT`, `UPDATE`, and `DELETE` are state-modifying operations on the set of tuples itself. You must define which tuples are affected. The `WHERE` clause is the predicate that defines that subset of tuples.

## Common mistakes
1.  **Omitting `WHERE` in `UPDATE` or `DELETE`:** This is the most dangerous mistake. `UPDATE payloads SET mass_kg = 0;` will set the mass of *every payload to zero*. `DELETE FROM payloads;` will wipe the entire table. Always write the `WHERE` clause first.
2.  **Mismatched `VALUES` in `INSERT`:** Providing values in the wrong order, or with the wrong data type (e.g., a string for an `INT` column), will cause an error. `INSERT INTO payloads (id, name) VALUES ('Starship', 100);` is wrong; the order is `(INT, VARCHAR)`.
3.  **Using `=` for `NULL` checks:** To find rows where a value is not set, you cannot use `WHERE column = NULL`. The correct syntax is `WHERE column IS NULL` or `WHERE column IS NOT NULL`. This is because `NULL` is not a value; it is a marker for an unknown state.
4.  **String Literal Quoting:** Standard SQL uses single quotes (`'`) for string literals (e.g., `'LEO'`). Double quotes (`"`) are typically used for identifiers like table or column names, though this can vary between database systems. Using the wrong quotes will cause syntax errors.

## Self-check
Use the `missions` table schema from the "How to study it" section for these questions. `(id INT, name VARCHAR(100), launch_date DATE, status VARCHAR(20))`

1.  Write an SQL statement to add a new mission with `id` 4, `name` 'Artemis I', a `launch_date` of '2022-11-16', and a `status` of 'Success'.
2.  The 'Artemis I' mission was so successful that its status should be updated to 'Complete'. However, you only want to update missions launched after the year 2020. Write the `UPDATE` statement.
3.  A data cleanup is required. Write a single SQL statement to delete all missions that have a status of 'Failed' and were also launched before January 1st, 2010.