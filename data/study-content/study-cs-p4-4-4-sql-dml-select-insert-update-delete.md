## 1. What it is — in plain English

Imagine a vast, organized library where every book is a piece of information, and the entire library is your database. You, as the user, want to interact with this library. You don't want to design how the shelves are built or how the books are categorized (that's another part of database management). Instead, you want to perform actions on the books themselves.

SQL Data Manipulation Language, or DML, is like the specific requests you make to the librarian to handle the actual books. It's the set of commands that lets you work with the *data* stored inside the database tables. Think of it as the "action words" for your database.

There are four primary actions you can take: you can ask for information, add new information, change existing information, or remove information. These four core operations are what DML is all about, allowing you to bring your database to life by populating it, querying it, and maintaining its contents.

Specifically, DML gives us four main verbs: `SELECT` (to read or retrieve data), `INSERT` (to create or add new data), `UPDATE` (to modify existing data), and `DELETE` (to remove data). These commands are fundamental to almost every application that uses a database, from simple contact lists to complex enterprise systems.

## 2. Why it matters — real-world applications

The ability to manipulate data is at the heart of nearly every software application and system you interact with daily. DML commands are the workhorses behind the scenes, enabling these interactions.

1.  **E-commerce Platforms (e.g., Amazon, Shopify):** When you browse products, a `SELECT` statement fetches product details (name, price, description) from the database. When you place an order, an `INSERT` statement adds your order details, shipping address, and chosen items into various tables. If you change your shipping address, an `UPDATE` statement modifies your customer record. If you cancel an order, a `DELETE` statement might remove the pending order, or more likely, an `UPDATE` statement changes its status to "canceled."

2.  **Social Media Networks (e.g., Facebook, X):** Every time you scroll through your feed, `SELECT` statements are busy retrieving posts, comments, and user profiles relevant to you. When you publish a new post or upload a photo, an `INSERT` statement stores that content in the database. Editing your profile picture or updating your bio involves an `UPDATE` statement. If you decide to delete an old tweet or even your entire account, `DELETE` statements are executed to remove that data.

3.  **Banking and Financial Systems:** Checking your bank balance or viewing your transaction history relies on `SELECT` statements. Every deposit or withdrawal triggers an `INSERT` statement to record the transaction. If you update your contact information or change your password, an `UPDATE` statement modifies your account details. While direct `DELETE` of financial records is rare due to auditing requirements, closing an account might involve an `UPDATE` to mark it as inactive and then, after a retention period, a `DELETE` of non-essential associated data.

4.  **Scientific Data Management (e.g., CERN's Large Hadron Collider, NASA's Mars Rover Missions):** Researchers collect vast amounts of experimental data (e.g., particle collision results, sensor readings from spacecraft). `INSERT` statements are used to log this continuous stream of data into specialized databases. Scientists then use complex `SELECT` queries to retrieve specific subsets of data for analysis, identify patterns, or validate hypotheses. For example, a physicist might `SELECT` all collision events where energy levels exceeded a certain threshold. If a sensor recalibration leads to corrected past readings, `UPDATE` statements might be used to adjust the historical data.

## 3. Prerequisites — what you must know first

Before diving deep into SQL DML, ensure you have a solid grasp of these foundational database concepts. If any of these feel unfamiliar, pause and review them first.

*   **Relational Databases:** Understanding that data is organized into structured collections of tables, related to each other.
*   **Tables:** The fundamental structure in a relational database, consisting of rows and columns, like a spreadsheet.
*   **Rows (Records or Tuples):** A single entry or instance of data within a table, representing a complete set of information for one item.
*   **Columns (Fields or Attributes):** A specific category of data within a table, defining the type of information stored for each row (e.g., "Name," "Age," "Price").
*   **Primary Keys:** A column or set of columns that uniquely identifies each row in a table, ensuring no two rows are identical.
*   **Foreign Keys:** A column or set of columns in one table that refers to the primary key in another table, establishing relationships between tables.
*   **SQL (Structured Query Language):** The standard language used to communicate with and manage relational databases, of which DML is a subset.
*   **Database Schema:** The logical design or structure of the entire database, defining tables, columns, data types, relationships, and constraints.
*   **Data Types:** Understanding the different types of data columns can hold (e.g., `INT`, `VARCHAR`, `DATE`, `BOOLEAN`).

## 4. The core idea — step by step

The core idea of SQL DML is to provide a standardized, declarative way to interact with the *data* itself within a relational database. Instead of telling the computer *how* to find or change data, you tell it *what* data you want or *what change* you want to make, and the database management system (DBMS) figures out the most efficient way to do it.

Let's consider a simple database with a table called `Products`:

| product_id | product_name | category | price | stock_quantity |
| :--------- | :----------- | :------- | :---- | :------------- |
| 101        | Laptop       | Electronics | 1200  | 50             |
| 102        | Mouse        | Electronics | 25    | 150            |
| 103        | Keyboard     | Electronics | 75    | 100            |
| 104        | Desk Chair   | Furniture | 250   | 20             |

### Step 1: The `SELECT` Statement

*   **Plain English Statement:** This is how you ask the database to show you some data. You specify what information you want to see (which columns) and from where (which table). You can also add conditions to filter the results, asking for only specific rows.

*   **Concrete Example:** If you want to see the names and prices of all products.
    ```sql
    SELECT product_name, price
    FROM Products;
    ```
    This would return:
    | product_name | price |
    | :----------- | :---- |
    | Laptop       | 1200  |
    | Mouse        | 25    |
    | Keyboard     | 75    |
    | Desk Chair   | 250   |

*   **Formal/Mathematical Version:**
    The general syntax for `SELECT` is:
    $$
    \texttt{SELECT } \{\texttt{column\_list} \texttt{ | } \texttt{* } \} \\
    \texttt{FROM } \{\texttt{table\_name} \} \\
    [\texttt{WHERE } \{\texttt{condition} \}] \\
    [\texttt{GROUP BY } \{\texttt{column\_name(s)} \}] \\
    [\texttt{HAVING } \{\texttt{condition} \}] \\
    [\texttt{ORDER BY } \{\texttt{column\_name(s)} \} [\texttt{ASC} \texttt{ | } \texttt{DESC}]] \\
    [\texttt{LIMIT } \{\texttt{number}\} \texttt{ | } \texttt{OFFSET } \{\texttt{number}\}]
    $$
    Where:
    *   `SELECT`: Specifies the columns to retrieve. `*` means all columns.
    *   `FROM`: Indicates the table(s) from which to retrieve data.
    *   `WHERE`: Filters rows based on a specified condition.
    *   `GROUP BY`: Groups rows that have the same values in specified columns into summary rows.
    *   `HAVING`: Filters groups based on a specified condition (used with `GROUP BY`).
    *   `ORDER BY`: Sorts the result set by one or more columns. `ASC` for ascending (default), `DESC` for descending.
    *   `LIMIT`/`OFFSET`: Restricts the number of rows returned (syntax varies by DBMS, e.g., `TOP` in SQL Server).

*   **What Could Go Wrong:**
    *   **Performance Issues:** Using `SELECT *` on a very large table can retrieve much more data than needed, slowing down queries and consuming more network bandwidth.
    *   **Syntax Errors:** Misspelling column or table names, or incorrect use of keywords.
    *   **Returning Too Much Data:** Forgetting a `WHERE` clause when you only need a subset of data can flood your application with irrelevant information.

### Step 2: The `INSERT` Statement

*   **Plain English Statement:** This is how you add a brand new row of data to an existing table. You tell the database which table to add to, and then provide the values for each column in the new row.

*   **Concrete Example:** Adding a new product, "Monitor," to the `Products` table.
    ```sql
    INSERT INTO Products (product_id, product_name, category, price, stock_quantity)
    VALUES (105, 'Monitor', 'Electronics', 300, 75);
    ```
    After this, the `Products` table would look like:
    | product_id | product_name | category | price | stock_quantity |
    | :--------- | :----------- | :------- | :---- | :------------- |
    | 101        | Laptop       | Electronics | 1200  | 50             |
    | 102        | Mouse        | Electronics | 25    | 150            |
    | 103        | Keyboard     | Electronics | 75    | 100            |
    | 104        | Desk Chair   | Furniture | 250   | 20             |
    | 105        | Monitor      | Electronics | 300   | 75             |

*   **Formal/Mathematical Version:**
    There are two common forms of `INSERT`:
    1.  Specifying columns:
        $$
        \texttt{INSERT INTO } \{\texttt{table\_name} \} (\{\texttt{column1}\}, \{\texttt{column2}\}, \dots) \\
        \texttt{VALUES } (\{\texttt{value1}\}, \{\texttt{value2}\}, \dots);
        $$
    2.  Inserting values for all columns (order must match table definition):
        $$
        \texttt{INSERT INTO } \{\texttt{table\_name} \} \\
        \texttt{VALUES } (\{\texttt{value1}\}, \{\texttt{value2}\}, \dots);
        $$
    Where:
    *   `INSERT INTO`: Specifies the table where data will be added.
    *   `column1, column2, ...`: (Optional) A list of columns to insert data into. If omitted, values must be provided for all columns in their defined order.
    *   `VALUES`: Introduces the list of values to be inserted, matching the order and data types of the specified columns.

*   **What Could Go Wrong:**
    *   **Constraint Violations:** Trying to insert a `product_id` that already exists (violating a primary key constraint), or inserting `NULL` into a `NOT NULL` column.
    *   **Data Type Mismatch:** Providing a text string for a numeric column, or a number for a date column.
    *   **Column Count/Order Mismatch:** If you don't specify column names, the number and order of values in `VALUES` must exactly match the table's column definition.

### Step 3: The `UPDATE` Statement

*   **Plain English Statement:** This is how you change existing data in one or more rows. You specify which table to modify, which columns to change, what their new values should be, and crucially, which *specific rows* to apply these changes to using a condition.

*   **Concrete Example:** Increasing the price of the "Mouse" product to $30.
    ```sql
    UPDATE Products
    SET price = 30
    WHERE product_name = 'Mouse';
    ```
    After this, the `Products` table would look like:
    | product_id | product_name | category | price | stock_quantity |
    | :--------- | :----------- | :------- | :---- | :------------- |
    | 101        | Laptop       | Electronics | 1200  | 50             |
    | 102        | Mouse        | Electronics | **30** | 150            |
    | 103        | Keyboard     | Electronics | 75    | 100            |
    | 104        | Desk Chair   | Furniture | 250   | 20             |
    | 105        | Monitor      | Electronics | 300   | 75             |

*   **Formal/Mathematical Version:**
    $$
    \texttt{UPDATE } \{\texttt{table\_name} \} \\
    \texttt{SET } \{\texttt{column1} \} = \{\texttt{value1}\}, \{\texttt{column2} \} = \{\texttt{value2}\}, \dots \\
    [\texttt{WHERE } \{\texttt{condition} \}]
    $$
    Where:
    *   `UPDATE`: Specifies the table to be modified.
    *   `SET`: Specifies the column(s) to be updated and their new values.
    *   `WHERE`: (Crucial!) Filters the rows to be updated. Only rows that satisfy this condition will be changed. If omitted, *all* rows in the table will be updated.

*   **What Could Go Wrong:**
    *   **Forgetting `WHERE` Clause:** This is arguably the most dangerous mistake. If you omit `WHERE`, the `UPDATE` statement will modify *every single row* in the table, potentially corrupting your entire dataset.
    *   **Incorrect `WHERE` Clause:** Updating the wrong set of rows because the condition was too broad or incorrectly specified.
    *   **Data Type Mismatch:** Trying to assign a value of an incompatible data type to a column.

### Step 4: The `DELETE` Statement

*   **Plain English Statement:** This is how you remove one or more existing rows from a table. You specify which table to remove from, and critically, which *specific rows* to delete using a condition.

*   **Concrete Example:** Removing the "Desk Chair" product from the `Products` table.
    ```sql
    DELETE FROM Products
    WHERE product_name = 'Desk Chair';
    ```
    After this, the `Products` table would look like:
    | product_id | product_name | category | price | stock_quantity |
    | :--------- | :----------- | :------- | :---- | :------------- |
    | 101        | Laptop       | Electronics | 1200  | 50             |
    | 102        | Mouse        | Electronics | 30    | 150            |
    | 103        | Keyboard     | Electronics | 75    | 100            |
    | 105        | Monitor      | Electronics | 300   | 75             |

*   **Formal/Mathematical Version:**
    $$
    \texttt{DELETE FROM } \{\texttt{table\_name} \} \\
    [\texttt{WHERE } \{\texttt{condition} \}]
    $$
    Where:
    *   `DELETE FROM`: Specifies the table from which rows will be deleted.
    *   `WHERE`: (Crucial!) Filters the rows to be deleted. Only rows that satisfy this condition will be removed. If omitted, *all* rows in the table will be deleted.

*   **What Could Go Wrong:**
    *   **Forgetting `WHERE` Clause:** Like `UPDATE`, omitting `WHERE` in a `DELETE` statement will erase *every single row* from the table, effectively emptying it. This is often irreversible without backups.
    *   **Referential Integrity Violations:** Trying to delete a row that is referenced by a foreign key in another table (e.g., deleting a product that is part of an existing order). The database will typically prevent this unless specific `ON DELETE` rules (like `CASCADE`) are defined.
    *   **Deleting Wrong Rows:** Incorrectly specifying the `WHERE` clause, leading to the removal of unintended data.

### Step 5: Transaction Control (Brief Mention)

*   **Plain English Statement:** Sometimes you need to perform several DML operations as a single, indivisible unit of work. Either all of them succeed, or none of them do. This is called a transaction. You start a transaction, perform your DML, and then either `COMMIT` (make the changes permanent) or `ROLLBACK` (undo all changes since the transaction started).

*   **Concrete Example:** Transferring money from Account A to Account B. This involves two `UPDATE` statements: one to debit A, another to credit B. If the debit succeeds but the credit fails, you don't want the debit to be permanent.
    ```sql
    BEGIN TRANSACTION;
    UPDATE Accounts SET balance = balance - 100 WHERE account_id = 'A';
    UPDATE Accounts SET balance = balance + 100 WHERE account_id = 'B';
    -- If both updates succeed:
    COMMIT;
    -- If any update fails or an error occurs:
    -- ROLLBACK;
    ```

*   **Formal/Mathematical Version:**
    $$
    \texttt{BEGIN TRANSACTION;} \\
    \texttt{-- DML statements here} \\
    \texttt{COMMIT;} \\
    \texttt{-- OR} \\
    \texttt{ROLLBACK;}
    $$
    Where:
    *   `BEGIN TRANSACTION` (or `START TRANSACTION`): Marks the beginning of a transaction.
    *   `COMMIT`: Makes all changes performed within the transaction permanent.
    *   `ROLLBACK`: Undoes all changes performed within the transaction, restoring the database to its state before `BEGIN TRANSACTION`.

*   **What Could Go Wrong:**
    *   **Not Committing:** Changes made within a transaction are not visible to other users or applications until committed. Forgetting to commit means your changes are temporary and will be lost if the session ends or the database crashes.
    *   **Inconsistent State:** If a series of DML operations that *should* be atomic (all-or-nothing) are not wrapped in a transaction, a failure midway could leave the database in an inconsistent or corrupt state.

## 5. Worked examples — multiple, with every step shown

Let's use two tables for our examples: `Customers` and `Orders`.

**Table: `Customers`**

| customer_id | first_name | last_name | email             | city        | registration_date |
| :---------- | :--------- | :-------- | :---------------- | :---------- | :---------------- |
| 1           | Alice      | Smith     | alice@example.com | New York    | 2023-01-15        |
| 2           | Bob        | Johnson   | bob@example.com   | Los Angeles | 2023-02-20        |
| 3           | Charlie    | Brown     | charlie@example.com | New York    | 2023-03-01        |
| 4           | Diana      | Prince    | diana@example.com | London      | 2023-04-10        |

**Table: `Orders`**

| order_id | customer_id | order_date | total_amount | status    |
| :------- | :---------- | :--------- | :----------- | :-------- |
| 1001     | 1           | 2023-01-20 | 150.00       | Completed |
| 1002     | 2           | 2023-02-25 | 220.50       | Pending   |
| 1003     | 1           | 2023-03-05 | 75.25        | Completed |
| 1004     | 3           | 2023-03-10 | 300.00       | Shipped   |

---

### Example 1 (Easy SELECT): Retrieve all customers from 'New York'.

**Problem:** We want to get the full names and email addresses of all customers who live in 'New York'.

**Given:** The `Customers` table.
**What we want:** `first_name`, `last_name`, and `email` for customers where `city` is 'New York'.

**Step 1: Identify the columns needed.**
We need `first_name`, `last_name`, and `email`.
```sql
SELECT first_name, last_name, email
```
*Explanation:* The `SELECT` clause specifies which columns we want to see in our result set.

**Step 2: Identify the table the data comes from.**
The data is in the `Customers` table.
```sql
FROM Customers
```
*Explanation:* The `FROM` clause indicates the table from which the data should be retrieved.

**Step 3: Add the filtering condition.**
We only want customers where the `city` is 'New York'.
```sql
WHERE city = 'New York';
```
*Explanation:* The `WHERE` clause filters the rows. Only rows where the `city` column's value is exactly 'New York' will be included in the final result. String comparisons are case-sensitive in some SQL databases, so 'New York' must match exactly.

**Final Answer:**
```sql
SELECT first_name, last_name, email
FROM Customers
WHERE city = 'New York';
```
This query would produce:
| first_name | last_name | email             |
| :--------- | :-------- | :---------------- |
| Alice      | Smith     | alice@example.com |
| Charlie    | Brown     | charlie@example.com |

**Reflection:** This example demonstrates a basic `SELECT` with a `WHERE` clause. The key is to clearly define both *what* you want to see (columns) and *which specific rows* you're interested in (filter condition).

---

### Example 2 (INSERT): Add a new customer.

**Problem:** A new customer, "Eve Miller" from "Chicago" with email "eve@example.com", registered on "2023-05-01". Add this customer to the `Customers` table. Assume `customer_id` is auto-incremented, so we don't provide it.

**Given:** New customer details.
**What we want:** A new row in the `Customers` table reflecting these details.

**Step 1: Specify the table to insert into and the columns.**
We are inserting into `Customers`, and we'll provide values for `first_name`, `last_name`, `email`, `city`, and `registration_date`.
```sql
INSERT INTO Customers (first_name, last_name, email, city, registration_date)
```
*Explanation:* `INSERT INTO` tells the database we're adding new data. Listing the column names explicitly makes the statement robust, even if the table's column order changes in the future, and allows us to omit columns that might have default values (like an auto-incrementing `customer_id`).

**Step 2: Provide the values for each specified column.**
Match the values to the order of columns specified in Step 1.
```sql
VALUES ('Eve', 'Miller', 'eve@example.com', 'Chicago', '2023-05-01');
```
*Explanation:* The `VALUES` clause provides the actual data for the new row. Each value corresponds to the column listed at the same position in the `INSERT INTO` clause. String and date values are enclosed in single quotes.

**Final Answer:**
```sql
INSERT INTO Customers (first_name, last_name, email, city, registration_date)
VALUES ('Eve', 'Miller', 'eve@example.com', 'Chicago', '2023-05-01');
```
After this, the `Customers` table (assuming `customer_id` 5 is assigned automatically) would look like:
| customer_id | first_name | last_name | email             | city        | registration_date |
| :---------- | :--------- | :-------- | :---------------- | :---------- | :---------------- |
| 1           | Alice      | Smith     | alice@example.com | New York    | 2023-01-15        |
| 2           | Bob        | Johnson   | bob@example.com   | Los Angeles | 2023-02-20        |
| 3           | Charlie    | Brown     | charlie@example.com | New York    | 2023-03-01        |
| 4           | Diana      | Prince    | diana@example.com | London      | 2023-04-10        |
| **5**       | **Eve**    | **Miller**| **eve@example.com** | **Chicago** | **2023-05-01**    |

**Reflection:** This example highlights the importance of matching column names with their corresponding values, and understanding how auto-incrementing primary keys work.

---

### Example 3 (UPDATE): Change an order's status and total amount.

**Problem:** Order `1002` was previously 'Pending' with a `total_amount` of `220.50`. It has now been completed and the final amount, after some adjustments, is `210.00`. Update this order's status to 'Completed' and its total amount to `210.00`.

**Given:** `Orders` table, `order_id` 1002, new status 'Completed', new total amount 210.00.
**What we want:** Modify the `status` and `total_amount` columns for the specific order `1002`.

**Step 1: Specify the table to update.**
We are modifying the `Orders` table.
```sql
UPDATE Orders
```
*Explanation:* The `UPDATE` keyword tells the database we intend to change existing data in the specified table.

**Step 2: Define the new values for the columns.**
We need to set `status` to 'Completed' and `total_amount` to `210.00`.
```sql
SET status = 'Completed', total_amount = 210.00
```
*Explanation:* The `SET` clause lists the columns to be changed and their new values. Multiple assignments are separated by commas.

**Step 3: Specify the `WHERE` condition to target the correct row.**
We only want to update `order_id` 1002.
```sql
WHERE order_id = 1002;
```
*Explanation:* This is the most crucial part of an `UPDATE` statement. The `WHERE` clause ensures that only the row(s) matching the condition are affected. Without it, *all* rows in the `Orders` table would be updated.

**Final Answer:**
```sql
UPDATE Orders
SET status = 'Completed', total_amount = 210.00
WHERE order_id = 1002;
```
After this, the `Orders` table would look like:
| order_id | customer_id | order_date | total_amount | status    |
| :------- | :---------- | :--------- | :----------- | :-------- |
| 1001     | 1           | 2023-01-20 | 150.00       | Completed |
| 1002     | 2           | 2023-02-25 | **210.00**   | **Completed** |
| 1003     | 1           | 2023-03-05 | 75.25        | Completed |
| 1004     | 3           | 2023-03-10 | 300.00       | Shipped   |

**Reflection:** This example emphasizes the critical role of the `WHERE` clause in `UPDATE` statements. Always double-check your `WHERE` condition to prevent unintended broad updates.

---

### Example 4 (DELETE and Complex SELECT): Remove a customer and find remaining customers.

**Problem:** Customer with `customer_id` 4 ("Diana Prince") has requested their account be deleted. Remove this customer from the `Customers` table. Then, after the deletion, retrieve the `first_name`, `last_name`, and `city` of all customers who are NOT from 'New York' and whose `customer_id` is less than 5.

**Part 1: DELETE**

**Given:** `Customers` table, `customer_id` 4.
**What we want:** Remove the row where `customer_id` is 4.

**Step 1: Specify the table to delete from.**
We are deleting from the `Customers` table.
```sql
DELETE FROM Customers
```
*Explanation:* `DELETE FROM` indicates the table from which rows will be removed.

**Step 2: Specify the `WHERE` condition to target the correct row.**
We only want to delete the customer with `customer_id` 4.
```sql
WHERE customer_id = 4;
```
*Explanation:* This `WHERE` clause is vital. It isolates the specific row to be deleted. Without it, *all* customers would be removed.

**Final Answer (Part 1):**
```sql
DELETE FROM Customers
WHERE customer_id = 4;
```
After this, the `Customers` table would look like (assuming the new customer 'Eve' from Example 2 was also added):
| customer_id | first_name | last_name | email             | city        | registration_date |
| :---------- | :--------- | :-------- | :---------------- | :---------- | :---------------- |
| 1           | Alice      | Smith     | alice@example.com | New York    | 2023-01-15        |
| 2           | Bob        | Johnson   | bob@example.com   | Los Angeles | 2023-02-20        |
| 3           | Charlie    | Brown     | charlie@example.com | New York    | 2023-03-01        |
| 5           | Eve        | Miller    | eve@example.com   | Chicago     | 2023-05-01        |

---

**Part 2: Complex SELECT**

**Problem:** Retrieve the `first_name`, `last_name`, and `city` of all customers who are NOT from 'New York' AND whose `customer_id` is less than 5 (after the deletion).

**Given:** The `Customers` table (after deletion).
**What we want:** `first_name`, `last_name`, `city` for customers where `city` is not 'New York' AND `customer_id` < 5.

**Step 1: Identify the columns needed.**
We need `first_name`, `last_name`, and `city`.
```sql
SELECT first_name, last_name, city
```
*Explanation:* Standard `SELECT` clause for desired output columns.

**Step 2: Identify the table.**
The data is in the `Customers` table.
```sql
FROM Customers
```
*Explanation:* Standard `FROM` clause.

**Step 3: Add the filtering conditions.**
We need two conditions combined with `AND`:
1.  `city` is NOT 'New York'. In SQL, "not equal to" is `<>` or `!=`.
2.  `customer_id` is less than 5.
```sql
WHERE city <> 'New York' AND customer_id < 5;
```
*Explanation:* The `WHERE` clause applies multiple conditions. `city <> 'New York'` filters out customers from New York. `customer_id < 5` further filters based on the ID. The `AND` operator means *both* conditions must be true for a row to be included.

**Final Answer (Part 2):**
```sql
SELECT first_name, last_name, city
FROM Customers
WHERE city <> 'New York' AND customer_id < 5;
```
Given the `Customers` table after the deletion (and including Eve from Ex2):
| customer_id | first_name | last_name | email             | city        | registration_date |
| :---------- | :--------- | :-------- | :---------------- | :---------- | :---------------- |
| 1           | Alice      | Smith     | alice@example.com | New York    | 2023-01-15        |
| 2           | Bob        | Johnson   | bob@example.com   | Los Angeles | 2023-02-20        |
| 3           | Charlie    | Brown     | charlie@example.com | New York    | 2023-03-01        |
| 5           | Eve        | Miller    | eve@example.com   | Chicago     | 2023-05-01        |

Executing the `SELECT` query:
*   Customer 1 (Alice): 'New York' (fails `city <> 'New York'`)
*   Customer 2 (Bob): 'Los Angeles' (passes), `customer_id` 2 < 5 (passes). -> **Included**
*   Customer 3 (Charlie): 'New York' (fails `city <> 'New York'`)
*   Customer 5 (Eve): 'Chicago' (passes), `customer_id` 5 < 5 (fails). -> **Excluded**

This query would produce:
| first_name | last_name | city        |
| :--------- | :-------- | :---------- |
| Bob        | Johnson   | Los Angeles |

**Reflection:** This example demonstrates the destructive power of `DELETE` and the precision required for `WHERE` clauses, especially when combining multiple conditions with `AND` or `OR` operators. The order of operations and filtering logic is crucial.

## 6. Common mistakes and traps

1.  **Forgetting the `WHERE` clause in `UPDATE` or `DELETE`:** This is the most catastrophic mistake. Without a `WHERE` clause, `UPDATE` will modify *all* rows in the table, and `DELETE` will erase *all* rows, potentially leading to massive data loss.
2.  **Data Type Mismatches during `INSERT` or `UPDATE`:** Trying to insert a string into an integer column, or a number into a date column, will result in an error or unexpected behavior, as the database cannot implicitly convert incompatible types.
3.  **Violating Constraints (Primary Key, Foreign Key, NOT NULL):** Attempting to `INSERT` a duplicate primary key, `DELETE` a row that is referenced by a foreign key in another table (without proper `ON DELETE` rules), or `INSERT` a `NULL` value into a `NOT NULL` column will cause the DML operation to fail.
4.  **Using `SELECT *` excessively:** While convenient for quick checks, `SELECT *` retrieves all columns, including potentially large text fields or binary data, which can be inefficient, consume unnecessary network bandwidth, and slow down queries on large tables.
5.  **Incorrectly combining `WHERE` conditions with `AND`/`OR`:** Misunderstanding the precedence of `AND` (higher) and `OR` (lower) or forgetting parentheses can lead to logic errors, returning an incorrect subset of data. For example, `A OR B AND C` is evaluated as `A OR (B AND C)`, not `(A OR B) AND C`.
6.  **SQL Injection Vulnerabilities:** This is a security trap. If user input is directly concatenated into DML statements (especially `WHERE` clauses) without proper sanitization or parameterization, malicious users can inject SQL code to read, modify, or delete unauthorized data.

## 7. Textbook-precise explanation

Data Manipulation Language (DML) is a subset of SQL used for managing data within a relational database. It encompasses commands that allow users to retrieve, add, modify, and remove data from database tables, operating at the logical level of the data model. Unlike Data Definition Language (DDL), which defines the schema, DML focuses on the instances of data (tuples) that populate the schema.

The four fundamental DML operations are:

1.  **`SELECT` Statement (Retrieval/Query):**
    The `SELECT` statement is used to retrieve data from one or more tables. It projects specified columns and selects rows based on conditions.
    The general syntax is:
    $$
    \texttt{SELECT } [\texttt{DISTINCT}] \{\texttt{column\_expression} \texttt{ | } \texttt{*} \} \\
    \texttt{FROM } \{\texttt{table\_name} \texttt{ | } \texttt{view\_name}\} [\texttt{AS alias}] \\
    [\texttt{JOIN } \{\texttt{another\_table}\} \texttt{ ON } \{\texttt{join\_condition}\}] \\
    [\texttt{WHERE } \{\texttt{search\_condition}\}] \\
    [\texttt{GROUP BY } \{\texttt{column\_list}\}] \\
    [\texttt{HAVING } \{\texttt{group\_condition}\}] \\
    [\texttt{ORDER BY } \{\texttt{column\_list}\} [\texttt{ASC} \texttt{ | } \texttt{DESC}]] \\
    [\texttt{LIMIT } \{\texttt{count}\} [\texttt{OFFSET } \{\texttt{start}\}]] \texttt{ | } [\texttt{TOP } \{\texttt{count}\}]
    $$
    *   `column_expression`: Specifies the columns or calculated values to be returned.
    *   `*`: Denotes all columns from the specified tables.
    *   `DISTINCT`: Eliminates duplicate rows from the result set.
    *   `FROM`: Identifies the table(s) or view(s) from which data is retrieved.
    *   `JOIN`: Combines rows from two or more tables based on a related column.
    *   `WHERE`: Filters individual rows based on a boolean `search_condition`.
    *   `GROUP BY`: Aggregates rows that have the same values in specified columns into summary rows.
    *   `HAVING`: Filters the groups created by `GROUP BY` based on a `group_condition`.
    *   `ORDER BY`: Sorts the result set in ascending (`ASC`) or descending (`DESC`) order.
    *   `LIMIT`/`OFFSET` (or `TOP`): Restricts the number of rows returned.

2.  **`INSERT` Statement (Insertion/Creation):**
    The `INSERT` statement adds new rows (tuples) to a table.
    The general syntax is:
    $$
    \texttt{INSERT INTO } \{\texttt{table\_name}\} [(\{\texttt{column1}\}, \{\texttt{column2}\}, \dots)] \\
    \texttt{VALUES } (\{\texttt{value1}\}, \{\texttt{value2}\}, \dots); \\
    \texttt{-- OR} \\
    \texttt{INSERT INTO } \{\texttt{table\_name}\} [(\{\texttt{column1}\}, \{\texttt{column2}\}, \dots)] \\
    \texttt{SELECT } \{\texttt{column\_expression}\} \dots \texttt{FROM } \{\texttt{source\_table}\} \dots;
    $$
    *   `INSERT INTO`: Specifies the target table.
    *   `column1, column2, ...`: An optional list of columns into which data will be inserted. If omitted, values must be provided for all columns in their default order.
    *   `VALUES`: Provides the explicit data values for the new row(s).
    *   `SELECT`: Allows inserting data by selecting it from another table or query result.

3.  **`UPDATE` Statement (Modification):**
    The `UPDATE` statement modifies existing data within a table.
    The general syntax is:
    $$
    \texttt{UPDATE } \{\texttt{table\_name}\} \\
    \texttt{SET } \{\texttt{column1}\} = \{\texttt{expression1}\}, \{\texttt{column2}\} = \{\texttt{expression2}\}, \dots \\
    [\texttt{WHERE } \{\texttt{search\_condition}\}]
    $$
    *   `UPDATE`: Specifies the target table to be modified.
    *   `SET`: Assigns new values to specified columns using `expression1`, `expression2`, etc.
    *   `WHERE`: A `search_condition` that identifies which rows are to be updated. If omitted, all rows in the table are updated.

4.  **`DELETE` Statement (Deletion/Removal):**
    The `DELETE` statement removes existing rows from a table.
    The general syntax is:
    $$
    \texttt{DELETE FROM } \{\texttt{table\_name}\} \\
    [\texttt{WHERE } \{\texttt{search\_condition}\}]
    $$
    *   `DELETE FROM`: Specifies the target table from which rows will be removed.
    *   `WHERE`: A `search_condition` that identifies which rows are to be deleted. If omitted, all rows in the table are deleted.

These DML commands are typically executed within the context of a transaction to ensure atomicity, consistency, isolation, and durability (ACID properties) of database operations. (See: Silberschatz, Korth, Sudarshan, *Database System Concepts*, 7e, Chapter 3 for SQL DML details and Chapter 17 for Transaction Management).

## 8. ASCII diagrams

Let's visualize the `Customers` table and how DML operations affect it.

Initial `Customers` table:
```text
+-------------+------------+-----------+---------------------+-------------+-------------------+
| customer_id | first_name | last_name | email               | city        | registration_date |
+-------------+------------+-----------+---------------------+-------------+-------------------+
| 1           | Alice      | Smith     | alice@example.com   | New York    | 2023-01-15        |
| 2           | Bob        | Johnson   | bob@example.com     | Los Angeles | 2023-02-20        |
| 3           | Charlie    | Brown     | charlie@example.com | New York    | 2023-03-01        |
+-------------+------------+-----------+---------------------+-------------+-------------------+
```

**1. `INSERT` Operation:**
Adding a new customer: `INSERT INTO Customers (first_name, last_name, email, city, registration_date) VALUES ('Diana', 'Prince', 'diana@example.com', 'London', '2023-04-10');`

```text
+-------------+------------+-----------+---------------------+-------------+-------------------+
| customer_id | first_name | last_name | email               | city        | registration_date |
+-------------+------------+-----------+---------------------+-------------+-------------------+
| 1           | Alice      | Smith     | alice@example.com   | New York    | 2023-01-15        |
| 2           | Bob        | Johnson   | bob@example.com     | Los Angeles | 2023-02-20        |
| 3           | Charlie    | Brown     | charlie@example.com | New York    | 2023-03-01        |
| 4           | Diana      | Prince    | diana@example.com   | London      | 2023-04-10        |  <-- NEW ROW ADDED
+-------------+------------+-----------+---------------------+-------------+-------------------+
```

**2. `UPDATE` Operation:**
Changing Alice's email: `UPDATE Customers SET email = 'alice.s@newmail.com' WHERE customer_id = 1;`

```text
+-------------+------------+-----------+---------------------+-------------+-------------------+
| customer_id | first_name | last_name | email               | city        | registration_date |
+-------------+------------+-----------+---------------------+-------------+-------------------+
| 1           | Alice      | Smith     | alice.s@newmail.com | New York    | 2023-01-15        |  <-- EMAIL UPDATED
| 2           | Bob        | Johnson   | bob@example.com     | Los Angeles | 2023-02-20        |
| 3           | Charlie    | Brown     | charlie@example.com | New York    | 2023-03-01        |
| 4           | Diana      | Prince    | diana@example.com   | London      | 2023-04-10        |
+-------------+------------+-----------+---------------------+-------------+-------------------+
```

**3. `DELETE` Operation:**
Removing Charlie: `DELETE FROM Customers WHERE customer_id = 3;`

```text
+-------------+------------+-----------+---------------------+-------------+-------------------+
| customer_id | first_name | last_name | email               | city        | registration_date |
+-------------+------------+-----------+---------------------+-------------+-------------------+
| 1           | Alice      | Smith     | alice.s@newmail.com | New York    | 2023-01-15        |
| 2           | Bob        | Johnson   | bob@example.com     | Los Angeles | 2023-02-20        |
| 4           | Diana      | Prince    | diana@example.com   | London      | 2023-04-10        |
+-------------+------------+-----------+---------------------+-------------+-------------------+
                                                                               ^ ROW REMOVED
```

**4. `SELECT` Operation (Conceptual):**
Retrieving customers from 'New York': `SELECT first_name, email FROM Customers WHERE city = 'New York';`

```text
+-------------+------------+-----------+---------------------+-------------+-------------------+
| customer_id | first_name | last_name | email               | city        | registration_date |
+-------------+------------+-----------+---------------------+-------------+-------------------+
| 1           | Alice      | Smith     | alice.s@newmail.com | New York    | 2023-01-15        |  <-- MATCHES WHERE
| 2           | Bob        | Johnson   | bob@example.com     | Los Angeles | 2023-02-20        |  <-- DOES NOT MATCH
| 4           | Diana      | Prince    | diana@example.com   | London      | 2023-04-10        |  <-- DOES NOT MATCH
+-------------+------------+-----------+---------------------+-------------+-------------------+

Result of SELECT:
+------------+---------------------+
| first_name | email               |
+------------+---------------------+
| Alice      | alice.s@newmail.com |
+------------+---------------------+
```
The `SELECT` operation conceptually scans the table, filters rows based on the `WHERE` clause, and then projects the specified columns from the matching rows into the result set.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of "CRUD" operations, which is a common acronym in software development:
    *   **C**reate -> **INSERT**
    *   **R**ead   -> **SELECT**
    *   **U**pdate -> **UPDATE**
    *   **D**elete -> **DELETE**

    Visualize a librarian (the DBMS) at a desk with a stack of index cards (data).
    *   **SELECT:** You hand the librarian a note saying "Find me all cards with 'Fantasy' genre." (Retrieving data)
    *   **INSERT:** You hand the librarian a new, blank index card filled with details for a new book. (Adding data)
    *   **UPDATE:** You hand the librarian an existing index card and say, "Change the publish year on this one to 2023." (Modifying data)
    *   **DELETE:** You hand the librarian an existing index card and say, "Please remove this book from the catalog." (Removing data)

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **The `WHERE` clause is your shield:** Always remember that `UPDATE` and `DELETE` without a `WHERE` clause are extremely dangerous and will affect *all* rows.
        $$
        \texttt{UPDATE } \dots \texttt{ SET } \dots \texttt{ WHERE } \dots \\
        \texttt{DELETE FROM } \dots \texttt{ WHERE } \dots
        $$
    *   **Basic `SELECT` structure:**
        $$
        \texttt{SELECT } \{\texttt{columns} \texttt{ | } \texttt{*}\} \texttt{ FROM } \{\texttt{table}\} [\texttt{WHERE } \{\texttt{condition}\}]
        $$
    *   **Basic `INSERT` structure (with specified columns):**
        $$
        \texttt{INSERT INTO } \{\texttt{table}\} (\{\texttt{cols}\}) \texttt{ VALUES } (\{\texttt{values}\})
        $$

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review all DML commands, write simple examples for each.
    *   **Day 3:** Review, focus on `WHERE` clause importance. Try combining `SELECT` with `AND`/`OR`.
    *   **Day 7:** Review, practice `INSERT` with different column specifications. Consider foreign key constraints.
    *   **Day 16:** Review, practice `UPDATE` and `DELETE` with complex `WHERE` clauses. Think about transaction control.
    *   **Day 35:** Comprehensive review, including potential errors and best practices (`SELECT *` vs. specific columns).

4.  **First-Principles Re-derivation Pathway:**
    If you forget a DML command, think about the fundamental interaction you want with the data:
    *   **Do I want to *see* or *get* data?** -> You need to *select* it. What columns? From what table? Which specific rows (WHERE)? How should it be ordered (ORDER BY)?
    *   **Do I want to *add new* data?** -> You need to *insert* it. Into what table? What are the values for each piece of information (column)?
    *   **Do I want to *change* existing data?** -> You need to *update* it. In what table? What columns are changing and to what new values (SET)? Most importantly, which *specific* rows are changing (WHERE)?
    *   **Do I want to *remove* existing data?** -> You need to *delete* it. From what table? Which *specific* rows are to be removed (WHERE)?

## 10. Connections — what this leads to

Mastering SQL DML is not just about memorizing syntax; it's the gateway to a vast array of more advanced database concepts and practical applications in computer science.

1.  **Advanced SQL:** DML is the foundation for complex queries involving `JOIN`s (combining data from multiple tables), subqueries (queries nested within other queries), common table expressions (CTEs), window functions, and aggregate functions (`COUNT`, `SUM`, `AVG`).
2.  **Database Design and Normalization:** Understanding DML helps you appreciate why good database design (e.g., proper primary/foreign keys, normalization) is crucial. It becomes clear how `INSERT` and `UPDATE` operations can be simplified or complicated by the table structure, and how `DELETE` operations interact with referential integrity.
3.  **Indexing and Performance Tuning:** As you write more complex `SELECT` queries, you'll encounter performance bottlenecks. This leads directly to the study of indexing, query optimization, and how the database engine executes DML statements efficiently.
4.  **Application Development and ORMs:** In real-world applications, developers often use Object-Relational Mappers (ORMs) like SQLAlchemy (Python), Hibernate (Java), or Entity Framework (C#). These ORMs abstract away raw SQL, allowing developers to interact with databases using object-oriented code. However, ORMs fundamentally translate object operations into DML statements, so understanding DML helps debug, optimize, and effectively use ORMs.
5.  **Data Warehousing and Business Intelligence:** Large-scale data analysis, reporting, and dashboarding rely heavily on complex `SELECT` queries to extract, transform, and load (ETL) data from operational databases into data warehouses.
6.  **Database Administration (DBA):** DBAs use DML extensively for data maintenance, troubleshooting, auditing, and ensuring data integrity and security. They also deal with the consequences of poorly written DML, such as deadlocks or slow queries.
7.  **Database Security (SQL Injection):** A deep understanding of how DML statements are constructed is essential for preventing SQL injection attacks, a critical security vulnerability where malicious DML is injected into applications to compromise data.
8.  **NoSQL Databases:** While DML specifically refers to SQL, the fundamental "CRUD" operations (Create, Read, Update, Delete) are universal. Understanding SQL DML provides a conceptual framework for interacting with data in NoSQL databases, even if the syntax and underlying data models are different.

## 11. Self-check questions

1.  Explain the primary purpose of each of the four core DML commands (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) in your own words, using a simple analogy.
2.  You have a table `Employees` with columns `employee_id` (PK), `first_name`, `last_name`, `department`, and `salary`. Write an SQL query to find the `first_name` and `last_name` of all employees in the 'Sales' department who earn more than 50000.
3.  Consider the `Employees` table again. A new employee, 'John Doe', in the 'Marketing' department, with a salary of 60000, needs to be added. Their `employee_id` is 101. Write the SQL `INSERT` statement. What potential issues could arise if `employee_id` 101 already exists?
4.  An employee with `employee_id` 55 has just received a promotion. Their `department` should change to 'Management' and their `salary` should increase by 10%. Write the SQL `UPDATE` statement. What would happen if you accidentally omitted the `WHERE` clause in this statement?
5.  You need to remove all employees from the 'Intern' department who have been with the company for less than 6 months (assume `hire_date` column exists and is less than 6 months ago from current date). Construct a `DELETE` statement for this scenario. Discuss the importance of using `BEGIN TRANSACTION` and `ROLLBACK` when executing such a `DELETE` statement in a production environment.