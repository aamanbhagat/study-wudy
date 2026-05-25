## What it is
Data Definition Language (DDL) is the subset of SQL used to define and manage the structure of a database and its objects. It is the architectural blueprinting language for your data, specifying tables, columns, data types, and constraints, rather than manipulating the data itself. The four primary DDL commands are `CREATE`, `ALTER`, `DROP`, and `TRUNCATE`.

## Why it matters
In physics and aerospace, vast datasets from simulations or experiments require rigidly defined structures for storage and analysis. For example, building a database to store telemetry from a satellite requires DDL to `CREATE` a table with precise columns for `timestamp`, `orbital_altitude_km`, `velocity_mps`, and `sensor_reading`. Later, you might `ALTER` this table to add a new sensor's data column. These structural commands are the foundation upon which all data operations are built.

## When to study it
Before tackling DDL, you must have a firm grasp of the relational model's core concepts. Ensure you understand:
*   **Relations (Tables):** The fundamental structure for storing data.
*   **Attributes (Columns):** The named properties of a relation.
*   **Tuples (Rows):** A single record or data entry in a relation.
*   **Data Types:** The classification of data for an attribute (e.g., `INT`, `VARCHAR`, `FLOAT`, `TIMESTAMP`).
*   **Primary Keys:** The unique identifier for each tuple in a relation.

If these terms are not second nature, review the fundamentals of the relational model first.

## How to study it (step by step)
1.  **Setup:** Install a lightweight database system like SQLite. This gives you a sandbox to execute SQL commands without complex server configuration.
2.  **Blueprint:** On paper, design a simple table for a concept you know, like `Missions`. Define the columns: `mission_id` (integer, primary key), `mission_name` (text), `launch_date` (date), `rocket_id` (integer).
3.  **Build:** Translate your paper design into a `CREATE TABLE` statement and execute it in your SQLite environment. Verify that the table was created using your client's command to list tables (e.g., `.tables` in SQLite).
4.  **Renovate:** Now, use `ALTER TABLE` to add a new column, `payload_mass_kg` (float). Verify the change by inspecting the table's schema (e.g., `.schema Missions` in SQLite).
5.  **Populate & Empty:** Add a few sample rows using the DML command `INSERT` (we will cover DML separately, but you need data to see the effect). Now, run `TRUNCATE TABLE Missions`. Observe that the table structure remains, but the data is gone. (Note: SQLite does not have `TRUNCATE`, it uses `DELETE` with an optimization. In PostgreSQL or MySQL, `TRUNCATE` is a distinct DDL command).
6.  **Demolish:** Execute `DROP TABLE Missions`. Verify that the table and its structure are now completely gone. It no longer appears when you list tables.

## Key ideas, with intuition
1.  **Schema vs. Data:** DDL is for the *schema* (the blueprint of the house), while Data Manipulation Language (DML) is for the *data* (the furniture inside). `CREATE` builds the walls and rooms. `INSERT` (DML) puts a couch in the living room. You cannot put furniture in a room that doesn't exist.
2.  **Atomic & Immediate:** DDL commands are typically auto-committed, meaning they take effect immediately and permanently change the database structure. Unlike DML's `UPDATE` or `DELETE`, you often cannot "roll back" a `DROP TABLE` command. This makes them powerful but dangerous.
3.  **Defining the Domain:** The `CREATE` statement is where you enforce the rules of your model. By choosing a data type like `INTEGER` for `rocket_id` and `DATE` for `launch_date`, you are defining the *domain* of valid values for those attributes. This is a direct implementation of the relational model's concept of domains, ensuring data integrity at the most fundamental level.
4.  **`DROP` vs. `TRUNCATE`:** This is a critical distinction.
    *   `DROP`: Destroys everything. The table definition (schema) and all its data are removed from the database. It's like demolishing the entire building.
    *   `TRUNCATE`: Deletes all data. The table structure (columns, types, constraints) remains, ready to be filled with new data. It's like gutting the building, leaving only the empty shell. `TRUNCATE` is a DDL operation because it's a bulk structural change (de-allocating all data pages), making it much faster than the DML `DELETE` command, which removes rows one by one.

## Worked example
Let's define a table to store information about stars for an astrophysics project.

**Step 1: `CREATE` the table.**
We need a unique ID, a name, its spectral class, and its mass in solar masses.

```sql
CREATE TABLE stars (
    star_id INT PRIMARY KEY,
    star_name VARCHAR(100) NOT NULL,
    spectral_class CHAR(1),
    solar_masses FLOAT
);
```
*Reflection:* This command creates the container. We've defined four columns. `star_id` is an integer and the primary key, meaning it must be unique and not null. `star_name` is a variable-length string that cannot be null. `spectral_class` is a single character (like 'G' for our sun). `solar_masses` is a floating-point number.

**Step 2: `ALTER` the table.**
We realize we also need to store the star's distance from Earth in light-years.

```sql
ALTER TABLE stars
ADD COLUMN distance_ly FLOAT;
```
*Reflection:* `ALTER TABLE` modifies an existing structure. The `ADD COLUMN` clause specifies the name and data type of the new column to be added to every row in the table. The table now has five columns.

**Step 3: `TRUNCATE` the table.**
Imagine we loaded bad data and want a fresh start without rebuilding the table.

```sql
TRUNCATE TABLE stars;
```
*Reflection:* This command removes all rows from the `stars` table instantly. The table structure itself, with its five columns, remains intact and ready for new data.

**Step 4: `DROP` the table.**
The project is over, and we want to clean up the database.

```sql
DROP TABLE stars;
```
*Reflection:* This command completely removes the `stars` table and all its data from the database. Any attempt to query `stars` will now result in an error.

## Diagrams
Here is the schema of our `stars` table before and after the `ALTER` command.

**Before `ALTER`:**
```text
Table: stars
+----------------+--------------+-------------+
| Column Name    | Data Type    | Constraints |
+----------------+--------------+-------------+
| star_id        | INT          | PRIMARY KEY |
| star_name      | VARCHAR(100) | NOT NULL    |
| spectral_class | CHAR(1)      |             |
| solar_masses   | FLOAT        |             |
+----------------+--------------+-------------+
```

**After `ALTER TABLE stars ADD COLUMN distance_ly FLOAT;`:**
```text
Table: stars
+----------------+--------------+-------------+
| Column Name    | Data Type    | Constraints |
+----------------+--------------+-------------+
| star_id        | INT          | PRIMARY KEY |
| star_name      | VARCHAR(100) | NOT NULL    |
| spectral_class | CHAR(1)      |             |
| solar_masses   | FLOAT        |             |
| distance_ly    | FLOAT        |             | <--- New column
+----------------+--------------+-------------+
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**C**aptains **A**lways **D**rop **T**hrusters."
    *   **C**REATE: Build the ship.
    *   **A**LTER: Modify the ship.
    *   **D**ROP: Destroy the ship entirely.
    *   **T**RUNCATE: Jettison all cargo (data), but keep the ship (structure).

2.  **Must-know facts:**
    *   `CREATE TABLE table_name (column1 datatype, column2 datatype, ...);`
    *   `DROP` removes the table's definition and its data.
    *   `TRUNCATE` removes the table's data but not its definition.

3.  **Spaced Repetition Schedule:** Review these commands and their differences at **1 day, 3 days, 7 days, 16 days, and 35 days**. Each time, write them from memory on a blank sheet of paper.

4.  **First Principles Pathway:** If you forget, remember the goal of the relational model. Before you can store data (`(id, name) = (1, 'Proxima Centauri')`), you must first *define the relation* itself. What is its name? (`stars`). What are its attributes? (`star_id`, `star_name`). What are the domains of those attributes? (`INT`, `VARCHAR`). DDL is simply the language for expressing this formal definition to the database engine.

## Common mistakes
1.  **Confusing `DROP`, `TRUNCATE`, and `DELETE`:** `DROP` destroys the table object. `TRUNCATE` empties the table (DDL, fast, no rollback). `DELETE` removes rows one by one (DML, slower, can be rolled back). Never use `DROP` when you mean `DELETE`.
2.  **Syntax Errors in `CREATE TABLE`:** Forgetting a comma between column definitions, or misspelling a data type. This is the most common error when starting. Always check your syntax carefully.
3.  **Altering the Wrong Object:** Running an `ALTER TABLE` command on `table_A` when you meant to modify `table_B`. Always double-check the table name in your DDL statements, as they are often irreversible.
4.  **Forgetting Constraints:** Creating a table but forgetting to add `PRIMARY KEY` or `NOT NULL` constraints. This leads to poor data integrity later on. Define your rules upfront in the `CREATE` statement.

## Self-check
1.  Write the SQL statement to create a table named `rockets` with three columns: `id` (an integer that is the primary key), `name` (a variable string up to 50 characters), and `first_flight` (a date).
2.  You created the `rockets` table, but now you need to add a column named `status` which can hold a string of up to 20 characters (e.g., 'active', 'retired'). Write the DDL command to make this change.
3.  Explain the difference in outcome, performance, and reversibility between running `TRUNCATE TABLE rockets;` and `DROP TABLE rockets;`. Under what specific circumstances would you choose `TRUNCATE` over `DROP`?