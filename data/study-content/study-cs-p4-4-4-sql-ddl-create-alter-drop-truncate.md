## 1. What it is — in plain English

Imagine you're building a giant, super-organized digital filing cabinet. This filing cabinet isn't for paper, but for all sorts of information: customer lists, product details, scientific measurements, or even the scores from your favorite video game.

SQL DDL (which stands for **S**tructured **Q**uery **L** **D**ata **D**efinition **L**anguage) is like the instruction manual for building and shaping this filing cabinet itself. It's not about putting files *into* the cabinet or taking them *out* — that's another part of SQL. Instead, DDL is about creating the cabinet, adding new drawers, changing the labels on existing drawers, or even tearing down entire sections of the cabinet.

Specifically, we're focusing on four key commands:
*   **CREATE**: This is like building a brand new drawer or even an entire new cabinet from scratch.
*   **ALTER**: This is like modifying an existing drawer – maybe adding a new divider inside, changing its size, or relabeling it.
*   **DROP**: This is like completely demolishing a drawer or an entire cabinet. Everything inside goes with it.
*   **TRUNCATE**: This is like emptying out all the files from a specific drawer, but leaving the drawer itself perfectly intact and ready for new files.

So, DDL is the part of SQL that lets you define, modify, and manage the *structure* or *schema* of your database. It's the blueprint language for your digital information storage.

## 2. Why it matters — real-world applications

Understanding DDL is fundamental because every single piece of data you interact with in a structured way relies on a database structure defined by DDL. Without it, there's nowhere for the data to live.

1.  **E-commerce Platforms (e.g., Amazon, Shopify):** When Amazon launches a new product category, say "Quantum Computing Kits," they need to **CREATE** new tables to store specific attributes for these kits (e.g., qubit count, coherence time, cooling requirements). If they later decide to track the manufacturing date for all products, they would **ALTER** existing product tables to add a `manufacturing_date` column. If a product line is discontinued, they might **DROP** associated tables.
2.  **Social Media Networks (e.g., Facebook, X/Twitter):** Imagine a new feature like "Story Highlights." Developers would **CREATE** new tables to store information about these highlights (who created them, what content they contain, their visibility settings). If a user decides to delete all their old messages, the system might **TRUNCATE** a `user_messages` table for that specific user (though typically `DELETE` is used for specific rows, `TRUNCATE` is for mass clearing of a table's contents).
3.  **Aerospace and Scientific Research (e.g., NASA, CERN):** When designing a new space mission or particle accelerator experiment, scientists need to meticulously define the schema for collecting telemetry data, sensor readings, and experimental results. They would **CREATE** tables for specific instruments, **ALTER** them as data collection requirements evolve, and potentially **TRUNCATE** temporary log tables after processing to free up space, while keeping the structure for the next run. For example, a table tracking sensor data from a Mars rover might be defined using `CREATE TABLE MarsRoverSensorData (timestamp DATETIME, sensor_id INT, temperature DECIMAL(5,2), pressure DECIMAL(7,2));`.
4.  **Financial Institutions (e.g., Banks, Stock Exchanges):** Banks use DDL to define customer accounts, transaction logs, loan details, and more. When a new financial product is introduced (e.g., a "Green Investment Fund"), new tables are **CREATED** to hold its specific parameters and associated transactions. Regulations might require adding new audit columns to existing tables, which would involve an **ALTER** operation.
5.  **Machine Learning Data Pipelines:** In many ML workflows, data scientists need to store features, model training results, and inference predictions. They might **CREATE** tables to hold different versions of features, **ALTER** them if new features are engineered, and **TRUNCATE** intermediate tables that are regenerated frequently, ensuring the structure remains for the next iteration of data processing.

## 3. Prerequisites — what you must know first

Before diving deep into SQL DDL, ensure you have a solid grasp of these foundational concepts:

*   **Relational Databases:** Understanding that data is organized into tables, which are related to each other.
*   **Tables, Rows, and Columns:** The basic building blocks of a relational database. A table is like a spreadsheet, rows are individual records, and columns are specific attributes.
*   **Primary Keys:** A column (or set of columns) that uniquely identifies each row in a table. Essential for relating tables.
*   **Foreign Keys:** A column (or set of columns) in one table that refers to the primary key in another table, establishing relationships.
*   **SQL (Structured Query Language):** The standard language for interacting with relational databases. You should know it's used for defining, manipulating, and controlling data.
*   **Data Types:** Different kinds of data (text, numbers, dates, true/false) and how they are represented in a database (e.g., `VARCHAR`, `INT`, `DECIMAL`, `DATE`, `BOOLEAN`).
*   **Database Schema:** The overall logical and physical structure of a database, including tables, columns, relationships, indexes, etc. DDL is how you define this schema.
*   **Database Management System (DBMS):** The software that manages databases (e.g., MySQL, PostgreSQL, SQL Server, Oracle). DDL commands are executed within a DBMS.
*   **Constraints:** Rules applied to columns or tables to maintain data integrity (e.g., `NOT NULL`, `UNIQUE`, `CHECK`).

## 4. The core idea — step by step

Let's break down the fundamental DDL commands: `CREATE`, `ALTER`, `DROP`, and `TRUNCATE`.

### Step 1: Understanding the Purpose of DDL

**Plain-English Statement:** DDL is all about defining the *blueprint* or *structure* of your database, not the data itself. Think of it as setting up the empty shelves and labels in your digital filing cabinet before you put any documents in.

**Small Concrete Example:** Before you can store customer names and addresses, you first need a "Customers" table with columns for "Name," "Address," and "CustomerID." DDL is used to create this table.

**Formal/Mathematical Version:**
DDL is a subset of SQL. Its operations define the database schema $S = \{T_1, T_2, \ldots, T_n\}$, where each $T_i$ is a table schema defined by a set of attributes $A_i = \{a_{i1}, a_{i2}, \ldots, a_{im_i}\}$ and their respective data types and constraints.
$$ \text{DDL} \subset \text{SQL} $$
$$ \text{DDL commands operate on } S $$

**What Could Go Wrong:** You can't insert data into a table that hasn't been `CREATE`d yet. Trying to query a non-existent table will result in an error.

### Step 2: CREATE — Building New Database Objects

**Plain-English Statement:** The `CREATE` command is used to build new database objects from scratch. The most common use is to create tables, but you can also create entire databases, views, indexes, and more.

**Small Concrete Example:** Let's say you want to store information about students. You'd create a table named `Students` with columns for their ID, name, and major.

```sql
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Major VARCHAR(100),
    EnrollmentDate DATE DEFAULT CURRENT_DATE
);
```
*   `StudentID INT PRIMARY KEY`: A whole number, unique for each student, and serves as the main identifier.
*   `FirstName VARCHAR(50) NOT NULL`: Text up to 50 characters, cannot be empty.
*   `LastName VARCHAR(50) NOT NULL`: Text up to 50 characters, cannot be empty.
*   `Major VARCHAR(100)`: Text up to 100 characters, can be empty.
*   `EnrollmentDate DATE DEFAULT CURRENT_DATE`: A date, defaults to today's date if not specified.

**Formal/Mathematical Version:**
The `CREATE TABLE` statement defines a new relation $R$ with schema $R(A_1: D_1, A_2: D_2, \ldots, A_n: D_n)$, where $A_i$ are attribute names and $D_i$ are their domains (data types), potentially with associated integrity constraints $C_j$.
$$ \text{CREATE TABLE } R (A_1 \ D_1 \ C_{11} \ldots, A_2 \ D_2 \ C_{21} \ldots, \ldots, A_n \ D_n \ C_{n1} \ldots); $$

**What Could Go Wrong:**
*   **Syntax Errors:** Missing commas, parentheses, or misspellings.
*   **Duplicate Names:** Trying to create a table with a name that already exists in the database.
*   **Invalid Data Types:** Using a data type not supported by your specific DBMS.

### Step 3: ALTER — Modifying Existing Database Objects

**Plain-English Statement:** The `ALTER` command is used to change the structure of an existing database object, most commonly a table. This is how you add new columns, remove old ones, change a column's data type, or add/remove constraints.

**Small Concrete Example:** After creating the `Students` table, you realize you also need to store their email address. You would `ALTER` the table to add a new `Email` column. Later, you might decide to make the `Major` column mandatory.

```sql
-- Add a new column
ALTER TABLE Students
ADD COLUMN Email VARCHAR(255) UNIQUE; -- Add a new column for email, ensuring each email is unique

-- Modify an existing column (e.g., make Major NOT NULL)
ALTER TABLE Students
ALTER COLUMN Major VARCHAR(100) NOT NULL; -- Note: Syntax varies by DBMS (e.g., SQL Server uses ALTER COLUMN, PostgreSQL uses ALTER COLUMN SET NOT NULL)

-- Drop a column (if you decide you don't need it)
ALTER TABLE Students
DROP COLUMN EnrollmentDate;
```

**Formal/Mathematical Version:**
An `ALTER TABLE` statement modifies the schema $R(A_1: D_1, \ldots, A_n: D_n)$ of an existing relation $R$. This can involve:
1.  Adding a new attribute $A_{new}: D_{new}$: $R \rightarrow R \cup \{A_{new}: D_{new}\}$
2.  Dropping an attribute $A_{old}$: $R \rightarrow R \setminus \{A_{old}: D_{old}\}$
3.  Modifying an attribute $A_i$'s domain $D_i \rightarrow D'_i$ or constraints.
$$ \text{ALTER TABLE } R \ \text{ADD COLUMN } A_{new} \ D_{new} \ C_{new}; $$
$$ \text{ALTER TABLE } R \ \text{DROP COLUMN } A_{old}; $$
$$ \text{ALTER TABLE } R \ \text{ALTER COLUMN } A_i \ \text{SET DATA TYPE } D'_i; $$

**What Could Go Wrong:**
*   **Data Loss:** Changing a column's data type to a less permissive one (e.g., `VARCHAR` to `INT`) can truncate or lose existing data if it doesn't fit the new type.
*   **Breaking Dependencies:** Dropping a column that is referenced by other database objects (like views or stored procedures) can cause those objects to fail.
*   **Performance Impact:** Altering large tables can be a time-consuming operation, potentially locking the table and impacting application performance.
*   **`NOT NULL` on existing data:** If you try to add a `NOT NULL` constraint to an existing column that contains `NULL` values, the operation will fail unless you provide a `DEFAULT` value.

### Step 4: DROP — Deleting Database Objects

**Plain-English Statement:** The `DROP` command is used to completely remove an entire database object (like a table, a view, an index, or even an entire database). When you `DROP` a table, all its data and its structure are permanently deleted. This is a very powerful and irreversible command.

**Small Concrete Example:** If your project is finished and you no longer need the `Students` table, you would `DROP` it.

```sql
-- Drop a table
DROP TABLE Students;

-- Drop an entire database (use with extreme caution!)
DROP DATABASE MyUniversityDB;
```

**Formal/Mathematical Version:**
The `DROP` statement removes a database object $O$ from the schema $S$. If $O$ is a table $R$, then $R$ and all its associated data tuples are removed.
$$ S \rightarrow S \setminus \{O\} $$
For a table $R$, this implies removing the relation schema and all its instances.
$$ \text{DROP TABLE } R; $$

**What Could Go Wrong:**
*   **Irreversible Data Loss:** Once `DROP`ped, data is usually gone forever unless you have backups. There's no "undo" button.
*   **Accidental Deletion:** Dropping the wrong table or database can be catastrophic for an application.
*   **Dependency Issues:** Dropping a table that other objects (like views, foreign keys in other tables) depend on can cause those dependent objects to become invalid or fail. Most DBMS will either prevent the `DROP` or require a `CASCADE` option to drop dependent objects as well.

### Step 5: TRUNCATE — Emptying a Table's Contents

**Plain-English Statement:** The `TRUNCATE TABLE` command is used to quickly delete *all* rows from a table, but it keeps the table's structure intact. It's like sweeping everything off your desk into the trash, but leaving the desk itself perfectly fine and ready for new items. `TRUNCATE` is typically much faster and uses fewer system resources than `DELETE FROM table_name` for removing all rows, because it generally deallocates the data pages rather than deleting row by row. It also often resets identity (auto-increment) columns.

**Small Concrete Example:** You have a `LogEntries` table that records every user action. To keep it from growing too large, you might `TRUNCATE` it nightly after processing the logs, leaving the empty table ready for the next day's entries.

```sql
TRUNCATE TABLE LogEntries;
```

**Formal/Mathematical Version:**
Given a relation $R$ with a set of tuples $T_R = \{t_1, t_2, \ldots, t_k\}$, the `TRUNCATE TABLE` operation transforms $T_R$ to an empty set $\emptyset$, while preserving the schema of $R$.
$$ T_R \rightarrow \emptyset $$
$$ \text{TRUNCATE TABLE } R; $$

**What Could Go Wrong:**
*   **Irreversible Data Loss:** Like `DROP`, `TRUNCATE` operations are typically not logged in a way that allows easy rollback, especially in systems like MySQL's InnoDB (though some systems might allow it within a transaction). Data is gone.
*   **No `WHERE` Clause:** You cannot specify conditions with `TRUNCATE`. It always affects the entire table. If you need to delete specific rows, use `DELETE FROM`.
*   **Dependency Issues:** If other tables have foreign key constraints referencing the truncated table, the `TRUNCATE` might fail or require disabling constraints, depending on the DBMS.

### Step 6: Constraints (as part of DDL)

**Plain-English Statement:** Constraints are rules enforced on data columns in a table. They ensure the accuracy and reliability of the data. You define these rules when you `CREATE` or `ALTER` a table.

**Small Concrete Example:**
*   `NOT NULL`: A column must always have a value.
*   `UNIQUE`: All values in a column must be different.
*   `PRIMARY KEY`: A combination of `NOT NULL` and `UNIQUE`, uniquely identifying each row.
*   `FOREIGN KEY`: Ensures that values in a column match values in a primary key of another table, linking them.
*   `CHECK`: Ensures that all values in a column satisfy a specific condition (e.g., `Age > 0`).
*   `DEFAULT`: Provides a default value for a column if none is specified.

```sql
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL UNIQUE,
    Price DECIMAL(10, 2) CHECK (Price > 0), -- Price must be positive
    StockQuantity INT DEFAULT 0 -- Defaults to 0 if not specified
);
```

**Formal/Mathematical Version:**
Constraints $C$ are predicates imposed on the domain of attributes or across multiple attributes/tables.
*   **Domain Constraint:** $A_i \in D_i$ (ensured by data type).
*   **`NOT NULL`:** $\forall t \in R, t[A_i] \neq \text{NULL}$.
*   **`UNIQUE`:** $\forall t_1, t_2 \in R, t_1 \neq t_2 \Rightarrow t_1[A_i] \neq t_2[A_i]$.
*   **`PRIMARY KEY`:** A `UNIQUE` and `NOT NULL` constraint on a set of attributes $K \subseteq A$.
*   **`FOREIGN KEY`:** For $A_k \subseteq R_1$ referencing $A_p \subseteq R_2$ (where $A_p$ is a primary key in $R_2$), $\forall t \in R_1, t[A_k] \in \pi_{A_p}(R_2) \lor t[A_k] = \text{NULL}$ (if `NULL`s are allowed in $A_k$).
*   **`CHECK`:** A boolean expression that must evaluate to true for every row.

**What Could Go Wrong:**
*   **Constraint Violation:** Attempting to insert or update data that doesn't satisfy a constraint will result in an error.
*   **Performance Overhead:** Complex `CHECK` constraints or heavily indexed `UNIQUE` columns can add a small overhead to insert/update operations.

## 5. Worked examples — multiple, with every step shown

We will use a hypothetical database for a university.

### Example 1: Creating a simple `Departments` table

**Problem:** Create a table to store information about university departments. Each department needs a unique ID, a name (which must also be unique), and a head of department.

**Given:**
*   Department ID: integer, unique, primary key.
*   Department Name: text, unique, cannot be empty.
*   Head of Department: text, can be empty.

**What we want:** A SQL `CREATE TABLE` statement.

**Step-by-step solution:**

1.  **Start with `CREATE TABLE` and the table name:**
    ```sql
    CREATE TABLE Departments
    ```
    *Explanation:* This keyword initiates the creation of a new table named `Departments`.

2.  **Define the `DepartmentID` column:**
    ```sql
    CREATE TABLE Departments (
        DepartmentID INT PRIMARY KEY
    )
    ```
    *Explanation:* We declare `DepartmentID` as an integer (`INT`). `PRIMARY KEY` ensures that each `DepartmentID` is unique and not null, serving as the main identifier for each department.

3.  **Define the `DepartmentName` column:**
    ```sql
    CREATE TABLE Departments (
        DepartmentID INT PRIMARY KEY,
        DepartmentName VARCHAR(100) NOT NULL UNIQUE
    )
    ```
    *Explanation:* `DepartmentName` is a string (`VARCHAR`) up to 100 characters. `NOT NULL` means it cannot be left empty. `UNIQUE` means no two departments can have the same name.

4.  **Define the `HeadOfDepartment` column:**
    ```sql
    CREATE TABLE Departments (
        DepartmentID INT PRIMARY KEY,
        DepartmentName VARCHAR(100) NOT NULL UNIQUE,
        HeadOfDepartment VARCHAR(100)
    );
    ```
    *Explanation:* `HeadOfDepartment` is a string up to 100 characters. Since no `NOT NULL` constraint is specified, it can be left empty (i.e., `NULL`). The semicolon `;` marks the end of the SQL statement.

**Final Answer:**
```sql
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(100) NOT NULL UNIQUE,
    HeadOfDepartment VARCHAR(100)
);
```

**Reflection:** This example demonstrates the basic `CREATE TABLE` syntax and how to apply `PRIMARY KEY`, `NOT NULL`, and `UNIQUE` constraints during table creation.

---

### Example 2: Altering a `Courses` table

**Problem:** You have an existing `Courses` table. You need to add a new column for the number of `Credits` and then modify an existing `CourseCode` column to ensure it's always unique.

**Given:**
*   An existing table `Courses` with columns `CourseID` (PK), `CourseName`, `CourseCode`.
*   New requirement: `Credits` (integer, cannot be null, default to 3).
*   Existing requirement: `CourseCode` should be unique.

**What we want:** SQL `ALTER TABLE` statements.

**Step-by-step solution:**

1.  **Assume initial table creation (for context):**
    ```sql
    CREATE TABLE Courses (
        CourseID INT PRIMARY KEY,
        CourseName VARCHAR(200) NOT NULL,
        CourseCode VARCHAR(20) NOT NULL
    );
    ```
    *Explanation:* This is the starting state of our `Courses` table.

2.  **Add the `Credits` column:**
    ```sql
    ALTER TABLE Courses
    ADD COLUMN Credits INT NOT NULL DEFAULT 3;
    ```
    *Explanation:* We use `ALTER TABLE Courses` to specify which table we are changing. `ADD COLUMN Credits` introduces the new column. `INT` is its data type. `NOT NULL` enforces that it must have a value. `DEFAULT 3` provides a default value for existing rows (if the DBMS supports it) and for new inserts if `Credits` is not specified.

3.  **Add a `UNIQUE` constraint to the `CourseCode` column:**
    ```sql
    ALTER TABLE Courses
    ADD CONSTRAINT UQ_CourseCode UNIQUE (CourseCode);
    ```
    *Explanation:* We use `ALTER TABLE Courses` again. `ADD CONSTRAINT` allows us to add a named constraint. `UQ_CourseCode` is a user-defined name for the constraint (good practice for management). `UNIQUE (CourseCode)` specifies that the `CourseCode` column must contain only unique values. This will fail if there are already duplicate `CourseCode` values in the table.

**Final Answer:**
```sql
ALTER TABLE Courses
ADD COLUMN Credits INT NOT NULL DEFAULT 3;

ALTER TABLE Courses
ADD CONSTRAINT UQ_CourseCode UNIQUE (CourseCode);
```

**Reflection:** This example shows how to add a column with constraints and how to add a constraint to an existing column using `ALTER TABLE`. Naming constraints is important for clarity and management.

---

### Example 3: Creating tables with a foreign key, adding a `CHECK` constraint, and then `TRUNCATE`

**Problem:** Create two tables: `Students` and `Enrollments`. `Enrollments` should link to `Students`. Then, add a `CHECK` constraint to `Students` for age, and finally, empty the `Enrollments` table.

**Given:**
*   `Students` table: `StudentID` (PK, INT), `FirstName` (VARCHAR), `LastName` (VARCHAR), `DateOfBirth` (DATE).
*   `Enrollments` table: `EnrollmentID` (PK, INT), `StudentID` (FK to `Students`), `CourseID` (INT), `EnrollmentDate` (DATE).
*   Constraint: `Students` must be at least 16 years old.
*   Action: Empty `Enrollments` table.

**What we want:** SQL `CREATE TABLE`, `ALTER TABLE`, and `TRUNCATE TABLE` statements.

**Step-by-step solution:**

1.  **Create the `Students` table:**
    ```sql
    CREATE TABLE Students (
        StudentID INT PRIMARY KEY,
        FirstName VARCHAR(50) NOT NULL,
        LastName VARCHAR(50) NOT NULL,
        DateOfBirth DATE
    );
    ```
    *Explanation:* Standard table creation for students. `DateOfBirth` is left without `NOT NULL` for now, but will be important for the `CHECK` constraint.

2.  **Create the `Enrollments` table with a foreign key:**
    ```sql
    CREATE TABLE Enrollments (
        EnrollmentID INT PRIMARY KEY,
        StudentID INT NOT NULL,
        CourseID INT NOT NULL,
        EnrollmentDate DATE DEFAULT CURRENT_DATE,
        FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
    );
    ```
    *Explanation:* We define `EnrollmentID` as the primary key. `StudentID` is an `INT NOT NULL` and is declared as a `FOREIGN KEY` referencing `StudentID` in the `Students` table. This ensures that an `Enrollment` record can only exist for a `StudentID` that already exists in the `Students` table.

3.  **Add a `CHECK` constraint to the `Students` table for age:**
    *   To be at least 16 years old, `DateOfBirth` must be at least 16 years in the past. We can use a function like `DATE_SUB` (MySQL) or `AGE` (PostgreSQL) or simply `CURRENT_DATE - INTERVAL '16 year'` (PostgreSQL/standard SQL). Let's use a common approach comparing dates.
    ```sql
    ALTER TABLE Students
    ADD CONSTRAINT CHK_MinAge CHECK (DateOfBirth <= DATE_SUB(CURRENT_DATE, INTERVAL 16 YEAR)); -- MySQL syntax
    -- OR for PostgreSQL:
    -- ADD CONSTRAINT CHK_MinAge CHECK (DateOfBirth <= CURRENT_DATE - INTERVAL '16 year');
    ```
    *Explanation:* We `ALTER TABLE Students` to `ADD CONSTRAINT CHK_MinAge`. The `CHECK` condition `DateOfBirth <= DATE_SUB(CURRENT_DATE, INTERVAL 16 YEAR)` ensures that the `DateOfBirth` is on or before the date 16 years ago from today, meaning the student is at least 16 years old.

4.  **Populate some sample data (for demonstration purposes, not DDL):**
    ```sql
    -- Insert a student who is 20 years old
    INSERT INTO Students (StudentID, FirstName, LastName, DateOfBirth) VALUES (1, 'Alice', 'Smith', '2004-01-15');
    -- Insert a student who is 15 years old (this would fail the CHECK constraint if executed after step 3)
    -- INSERT INTO Students (StudentID, FirstName, LastName, DateOfBirth) VALUES (2, 'Bob', 'Johnson', '2009-05-20');
    -- Insert an enrollment
    INSERT INTO Enrollments (EnrollmentID, StudentID, CourseID) VALUES (101, 1, 5001);
    ```
    *Explanation:* These `INSERT` statements are DML, but help illustrate the context for `TRUNCATE`.

5.  **Truncate the `Enrollments` table:**
    ```sql
    TRUNCATE TABLE Enrollments;
    ```
    *Explanation:* This command will remove all rows from the `Enrollments` table, effectively emptying it, but the table structure and its foreign key definition remain.

**Final Answer:**
```sql
-- Step 1: Create Students table
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    DateOfBirth DATE
);

-- Step 2: Create Enrollments table with Foreign Key
CREATE TABLE Enrollments (
    EnrollmentID INT PRIMARY KEY,
    StudentID INT NOT NULL,
    CourseID INT NOT NULL,
    EnrollmentDate DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
);

-- Step 3: Add CHECK constraint to Students table (using MySQL syntax for date calculation)
ALTER TABLE Students
ADD CONSTRAINT CHK_MinAge CHECK (DateOfBirth <= DATE_SUB(CURRENT_DATE, INTERVAL 16 YEAR));

-- (Optional: Sample DML to show context)
-- INSERT INTO Students (StudentID, FirstName, LastName, DateOfBirth) VALUES (1, 'Alice', 'Smith', '2004-01-15');
-- INSERT INTO Enrollments (EnrollmentID, StudentID, CourseID) VALUES (101, 1, 5001);

-- Step 5: Truncate the Enrollments table
TRUNCATE TABLE Enrollments;
```

**Reflection:** This example highlights the interplay of `CREATE`, `ALTER` (for constraints), and `TRUNCATE`. It also emphasizes the importance of foreign keys for relational integrity and `CHECK` constraints for data validation. The `TRUNCATE` command demonstrates efficient mass deletion of data while preserving the schema.

---

### Example 4: Creating a database, tables with multiple constraints, and then dropping the database

**Problem:** Create a new database for a small library system. Inside this database, create two tables: `Authors` and `Books`. `Books` should link to `Authors`. Ensure `BookTitle` is unique per author, and `PublicationYear` is valid. Finally, remove the entire library database.

**Given:**
*   Database name: `LibraryDB`.
*   `Authors` table: `AuthorID` (PK, INT, auto-increment), `FirstName` (VARCHAR), `LastName` (VARCHAR, unique combination with FirstName).
*   `Books` table: `BookID` (PK, INT, auto-increment), `AuthorID` (FK to `Authors`), `BookTitle` (VARCHAR), `PublicationYear` (INT, must be between 1000 and the current year).
*   Constraint: A book title must be unique for a given author.
*   Action: Drop `LibraryDB`.

**What we want:** SQL `CREATE DATABASE`, `USE`, `CREATE TABLE` (with multiple constraints), and `DROP DATABASE` statements.

**Step-by-step solution:**

1.  **Create the database:**
    ```sql
    CREATE DATABASE LibraryDB;
    ```
    *Explanation:* This command creates a new, empty database named `LibraryDB`.

2.  **Switch to the new database:**
    ```sql
    USE LibraryDB;
    ```
    *Explanation:* This command tells the DBMS that subsequent operations should be performed within the `LibraryDB` context. (Syntax might vary slightly, e.g., `\c LibraryDB` in psql).

3.  **Create the `Authors` table:**
    ```sql
    CREATE TABLE Authors (
        AuthorID INT PRIMARY KEY AUTO_INCREMENT, -- AUTO_INCREMENT for MySQL, IDENTITY for SQL Server, SERIAL for PostgreSQL
        FirstName VARCHAR(100) NOT NULL,
        LastName VARCHAR(100) NOT NULL,
        CONSTRAINT UQ_AuthorName UNIQUE (FirstName, LastName) -- Combination of first and last name must be unique
    );
    ```
    *Explanation:* `AuthorID` is an auto-incrementing primary key. `FirstName` and `LastName` are mandatory. `CONSTRAINT UQ_AuthorName UNIQUE (FirstName, LastName)` ensures that no two authors have the exact same first and last name combination.

4.  **Create the `Books` table:**
    ```sql
    CREATE TABLE Books (
        BookID INT PRIMARY KEY AUTO_INCREMENT,
        AuthorID INT NOT NULL,
        BookTitle VARCHAR(255) NOT NULL,
        PublicationYear INT NOT NULL,
        CONSTRAINT FK_Author FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID),
        CONSTRAINT CHK_PublicationYear CHECK (PublicationYear BETWEEN 1000 AND YEAR(CURRENT_DATE)), -- MySQL syntax for current year
        CONSTRAINT UQ_AuthorBookTitle UNIQUE (AuthorID, BookTitle) -- Book title unique per author
    );
    ```
    *Explanation:*
    *   `BookID` is an auto-incrementing primary key.
    *   `AuthorID` is a mandatory integer.
    *   `BookTitle` is a mandatory string.
    *   `PublicationYear` is a mandatory integer.
    *   `CONSTRAINT FK_Author FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID)` establishes the link to the `Authors` table.
    *   `CONSTRAINT CHK_PublicationYear CHECK (PublicationYear BETWEEN 1000 AND YEAR(CURRENT_DATE))` ensures the year is realistic. `YEAR(CURRENT_DATE)` gets the current year.
    *   `CONSTRAINT UQ_AuthorBookTitle UNIQUE (AuthorID, BookTitle)` ensures that a specific author cannot have two books with the exact same title.

5.  **Drop the entire `LibraryDB` database:**
    ```sql
    DROP DATABASE LibraryDB;
    ```
    *Explanation:* This command removes the `LibraryDB` database entirely, including all its tables, data, and other objects. This is highly destructive and should be used with extreme caution.

**Final Answer:**
```sql
-- Step 1: Create the database
CREATE DATABASE LibraryDB;

-- Step 2: Switch to the new database
USE LibraryDB; -- (Or equivalent for your DBMS)

-- Step 3: Create the Authors table
CREATE TABLE Authors (
    AuthorID INT PRIMARY KEY AUTO_INCREMENT, -- Use IDENTITY for SQL Server, SERIAL for PostgreSQL
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    CONSTRAINT UQ_AuthorName UNIQUE (FirstName, LastName)
);

-- Step 4: Create the Books table
CREATE TABLE Books (
    BookID INT PRIMARY KEY AUTO_INCREMENT, -- Use IDENTITY for SQL Server, SERIAL for PostgreSQL
    AuthorID INT NOT NULL,
    BookTitle VARCHAR(255) NOT NULL,
    PublicationYear INT NOT NULL,
    CONSTRAINT FK_Author FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID),
    CONSTRAINT CHK_PublicationYear CHECK (PublicationYear BETWEEN 1000 AND YEAR(CURRENT_DATE)), -- Adjust YEAR(CURRENT_DATE) for other DBMS if needed
    CONSTRAINT UQ_AuthorBookTitle UNIQUE (AuthorID, BookTitle)
);

-- (Optional: Sample DML to show context)
-- INSERT INTO Authors (FirstName, LastName) VALUES ('Jane', 'Austen');
-- INSERT INTO Books (AuthorID, BookTitle, PublicationYear) VALUES (1, 'Pride and Prejudice', 1813);
-- INSERT INTO Books (AuthorID, BookTitle, PublicationYear) VALUES (1, 'Sense and Sensibility', 1811);
-- INSERT INTO Books (AuthorID, BookTitle, PublicationYear) VALUES (1, 'Pride and Prejudice', 1813); -- This would fail UQ_AuthorBookTitle

-- Step 5: Drop the entire LibraryDB database
DROP DATABASE LibraryDB;
```

**Reflection:** This example demonstrates the full lifecycle from database creation to its complete deletion, including complex table definitions with multiple constraints (`PRIMARY KEY`, `AUTO_INCREMENT`, `NOT NULL`, `UNIQUE` on multiple columns, `FOREIGN KEY`, `CHECK`). It emphasizes the power and danger of `DROP DATABASE`.

## 6. Common mistakes and traps

1.  **Confusing `DROP TABLE` with `DELETE FROM`:**
    *   **Mistake:** Using `DROP TABLE tableName;` when you only want to remove all data but keep the table structure, or using `DELETE FROM tableName;` when you want to remove the table entirely.
    *   **Why it happens:** Both commands remove data. `DROP` removes the *structure* and *all* data, permanently. `DELETE FROM` removes *rows* (can be filtered with `WHERE`) but keeps the table structure. `DELETE FROM` is also transactional and slower for entire tables.

2.  **Confusing `TRUNCATE TABLE` with `DELETE FROM`:**
    *   **Mistake:** Believing `TRUNCATE` is just a faster `DELETE` with no `WHERE` clause, without understanding its other implications.
    *   **Why it happens:** Both clear all data. `TRUNCATE` is typically faster, often resets auto-incrementing IDs, and is usually non-transactional (cannot be rolled back easily) in many DBMS, making it more permanent than `DELETE`.

3.  **Forgetting `COMMIT` (or understanding auto-commit):**
    *   **Mistake:** Expecting DDL changes to be undone with `ROLLBACK` in the same way DML (data manipulation language like `INSERT`, `UPDATE`, `DELETE`) can be.
    *   **Why it happens:** In most SQL databases, DDL statements (`CREATE`, `ALTER`, `DROP`) are implicitly committed. This means they are immediately and permanently saved to the database and cannot be rolled back.

4.  **Not handling dependencies before `DROP` or `ALTER`:**
    *   **Mistake:** Trying to `DROP` a table that is referenced by a `FOREIGN KEY` in another table, or `ALTER` a column's data type that would invalidate existing data.
    *   **Why it happens:** Databases enforce referential integrity. Dropping a parent table without first dropping dependent foreign key constraints (or the child tables themselves) will often result in an error. Changing data types without careful consideration can lead to data loss or conversion errors.

5.  **Syntax errors and DBMS-specific variations:**
    *   **Mistake:** Using syntax that works in one DBMS (e.g., MySQL) but not another (e.g., PostgreSQL or SQL Server).
    *   **Why it happens:** While SQL has a standard (ANSI SQL), different DBMS implement extensions or slightly different syntax for certain DDL operations (e.g., `AUTO_INCREMENT` vs. `IDENTITY` vs. `SERIAL`, or `ALTER COLUMN` vs. `MODIFY COLUMN`).

6.  **Lack of backups before destructive DDL operations:**
    *   **Mistake:** Performing `DROP` or `TRUNCATE` operations on a production database without a recent backup.
    *   **Why it happens:** Overconfidence or rushing. These commands are irreversible. A single typo can wipe out critical data. Always back up before making significant schema changes.

## 7. Textbook-precise explanation

The Data Definition Language (DDL) is a fundamental subset of SQL responsible for defining, modifying, and managing the database schema. The schema encapsulates the logical structure of the database, including the definitions of tables, views, indexes, and other database objects. DDL commands are typically auto-committed, meaning they are immediately and permanently applied to the database, unlike DML commands which can often be rolled back within a transaction.

### CREATE Statement

The `CREATE` statement is used to instantiate new database objects. Its most common form is `CREATE TABLE`, which defines a new relation schema.

**Syntax (simplified for table creation):**
$$ \text{CREATE TABLE } \text{table\_name} \ ( $$
$$ \quad \text{column1\_name} \ \text{data\_type} \ [\text{column\_constraint}] \ [\text{default\_clause}], $$
$$ \quad \text{column2\_name} \ \text{data\_type} \ [\text{column\_constraint}] \ [\text{default\_clause}], $$
$$ \quad \ldots, $$
$$ \quad [\text{table\_constraint}] $$
$$ ); $$

**Semantics:**
Upon successful execution, a new relation schema identified by `table_name` is added to the database catalog. This schema includes the specified columns, their respective data types, and any defined column-level or table-level integrity constraints (e.g., `PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `NOT NULL`, `CHECK`, `DEFAULT`). If a table with `table_name` already exists, an error is typically raised unless an `IF NOT EXISTS` clause is used (DBMS-specific).

**Reference:** See Date, C.J., *An Introduction to Database Systems*, 8th ed., Chapter 8: "The Relational Model: Integrity".

### ALTER Statement

The `ALTER` statement is used to modify the structure of an existing database object. For tables, this includes adding, dropping, or modifying columns, as well as adding or dropping constraints.

**Syntax (simplified for table alteration):**
$$ \text{ALTER TABLE } \text{table\_name} \ $$
$$ \quad [\text{ADD COLUMN } \text{column\_name} \ \text{data\_type} \ [\text{column\_constraint}] \ [\text{default\_clause}]] $$
$$ \quad [\text{DROP COLUMN } \text{column\_name} \ [\text{CASCADE} \ | \ \text{RESTRICT}]] $$
$$ \quad [\text{ALTER COLUMN } \text{column\_name} \ \text{SET DATA TYPE } \text{new\_data\_type}] \quad \text{(or MODIFY COLUMN, DBMS-specific)} $$
$$ \quad [\text{ADD CONSTRAINT } \text{constraint\_name} \ \text{constraint\_definition}] $$
$$ \quad [\text{DROP CONSTRAINT } \text{constraint\_name} \ [\text{CASCADE} \ | \ \text{RESTRICT}]] $$
$$ ; $$

**Semantics:**
The `ALTER TABLE` command modifies the schema of the specified relation.
*   `ADD COLUMN`: Appends a new attribute to the relation schema. Existing tuples will have `NULL` for this new attribute unless a `DEFAULT` value is specified.
*   `DROP COLUMN`: Removes an attribute from the relation schema. All data associated with this attribute in existing tuples is irrevocably lost. `CASCADE` typically drops dependent objects (e.g., foreign key constraints referencing the column), while `RESTRICT` prevents the operation if dependencies exist.
*   `ALTER COLUMN` / `MODIFY COLUMN`: Changes the data type or properties of an existing attribute. This operation can lead to data truncation or conversion errors if the new data type is incompatible with existing data.
*   `ADD CONSTRAINT` / `DROP CONSTRAINT`: Adds or removes integrity rules. Adding a constraint may fail if existing data violates the new rule.

**Reference:** See Silberschatz, Korth, and Sudarshan, *Database System Concepts*, 7th ed., Chapter 3: "Introduction to SQL".

### DROP Statement

The `DROP` statement is used to permanently remove an existing database object, including its schema definition and all associated data.

**Syntax (simplified for table/database):**
$$ \text{DROP TABLE } \text{table\_name} \ [\text{CASCADE} \ | \ \text{RESTRICT}]; $$
$$ \text{DROP DATABASE } \text{database\_name}; $$

**Semantics:**
*   `DROP TABLE`: Removes the specified relation schema and all its tuples from the database catalog. The storage space occupied by the table is deallocated. `CASCADE` will also drop any objects that depend on the table (e.g., views, foreign keys). `RESTRICT` (default in many systems) will prevent the drop if dependencies exist.
*   `DROP DATABASE`: Removes an entire database, including all its tables, indexes, views, and data. This is a highly destructive and irreversible operation.

**Reference:** See Elmasri and Navathe, *Fundamentals of Database Systems*, 7th ed., Chapter 6: "The Relational Algebra and Relational Calculus".

### TRUNCATE Statement

The `TRUNCATE TABLE` statement is used to delete all tuples from a table, effectively emptying it, but retaining the table's structure. It is generally a more efficient operation than `DELETE FROM table_name` without a `WHERE` clause, especially for large tables, because it often deallocates data pages rather than performing row-by-row deletion.

**Syntax:**
$$ \text{TRUNCATE TABLE } \text{table\_name}; $$

**Semantics:**
All tuples $T_R$ within the specified relation $R$ are removed, resulting in an empty set of tuples $\emptyset$, i.e., $T_R \rightarrow \emptyset$. The table schema, including columns, data types, and constraints, remains intact. `TRUNCATE` operations often reset identity (auto-increment) counters. In many DBMS, `TRUNCATE` operations are minimally logged and are not easily reversible via transaction rollback, contrasting with `DELETE` statements.

**Reference:** See Garcia-Molina, Ullman, and Widom, *Database Systems: The Complete Book*, 2nd ed., Chapter 6: "The Relational Model and SQL".

## 8. ASCII diagrams

### Diagram 1: Database Object Hierarchy and DDL Interaction

This diagram illustrates how DDL commands (`CREATE`, `ALTER`, `DROP`) act upon different levels of database objects, from the entire database down to individual columns. `TRUNCATE` specifically targets the data within a table, leaving the structure.

```text
+---------------------------------------------------------------------------------------------------------------------------------+
|                                                           DATABASE (e.g., MyUniversityDB)                                       |
|                                                     +---------------------------------+                                         |
|                                                     |  CREATE DATABASE MyUniversityDB;|                                         |
|                                                     |  DROP DATABASE MyUniversityDB;  |                                         |
|                                                     +---------------------------------+                                         |
+-----------------------------------------------------------------------|---------------------------------------------------------+
                                                                        |
                                                                        V
+---------------------------------------------------------------------------------------------------------------------------------+
|                                                                 SCHEMA (Implicit or Explicit)                                   |
+-----------------------------------------------------------------------|---------------------------------------------------------+
                                                                        |
                                                                        V
+---------------------------------------------------------------------------------------------------------------------------------+
|                                                                    TABLES                                                       |
|                                                                                                                                 |
|  +---------------------------------------------------------------------------------------------------------------------------+  |
|  |                                                         Table: Students                                                   |  |
|  | +-----------------------------------------------------------------------------------------------------------------------+ |  |
|  | |                                                                                                                       | |  |
|  | |  CREATE TABLE Students (...);                                                                                         | |  |
|  | |  DROP TABLE Students;                                                                                                 | |  |
|  | |  TRUNCATE TABLE Students; (Removes all rows, keeps structure)                                                         | |  |
|  | |                                                                                                                       | |  |
|  | +-----------------------------------------------------------------------------------------------------------------------+ |  |
|  +-----------------------------------------------------------------------|-----------------------------------------------------+  |
                                                                         |
                                                                         V
  +---------------------------------------------------------------------------------------------------------------------------+
  |                                                                 COLUMNS                                                   |
  |                                                                                                                           |
  |  +---------------------+  +---------------------+  +---------------------+  +---------------------+  +------------------+ |
  |  | Column: StudentID   |  | Column: FirstName   |  | Column: LastName    |  | Column: Major       |  | Column: Email    | |
  |  | INT PRIMARY KEY     |  | VARCHAR(50) NOT NULL|  | VARCHAR(50) NOT NULL|  | VARCHAR(100)        |  | VARCHAR(255) UNIQUE| |
  |  +---------------------+  +---------------------+  +---------------------+  +---------------------+  +------------------+ |
  |                                                                                                                           |
  |  ALTER TABLE Students ADD COLUMN Email VARCHAR(255) UNIQUE;                                                               |
  |  ALTER TABLE Students DROP COLUMN Major;                                                                                  |
  |  ALTER TABLE Students ALTER COLUMN FirstName VARCHAR(75);                                                                 |
  |  ALTER TABLE Students ADD CONSTRAINT CHK_StudentID CHECK (StudentID > 0);                                                 |
  |                                                                                                                           |
  +---------------------------------------------------------------------------------------------------------------------------+
```

### Diagram 2: `ALTER TABLE` - Adding a Column

This diagram visually represents the state of a table's schema before and after an `ALTER TABLE ADD COLUMN` operation.

```text
State BEFORE ALTER:

+-------------------------------------+
|             Users Table             |
+-------------------------------------+
| UserID (INT, PK) | Username (VARCHAR) |
+------------------+------------------+
| 1                | alice            |
| 2                | bob              |
| 3                | charlie          |
+------------------+------------------+
```

```sql
-- SQL Command:
ALTER TABLE Users
ADD COLUMN Email VARCHAR(255);
```

```text
State AFTER ALTER:

+-----------------------------------------------------+
|                   Users Table                       |
+-----------------------------------------------------+
| UserID (INT, PK) | Username (VARCHAR) | Email (VARCHAR) |
+------------------+--------------------+-----------------+
| 1                | alice              | NULL            |
| 2                | bob                | NULL            |
| 3                | charlie            | NULL            |
+------------------+--------------------+-----------------+
```
*Description:* The `Users` table initially has `UserID` and `Username` columns. After the `ALTER TABLE ADD COLUMN Email VARCHAR(255)` command, a new `Email` column is added to the table's schema. For existing rows, the `Email` column will contain `NULL` values by default, unless a `DEFAULT` value was specified during the `ADD COLUMN` operation.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of a **C**onstruction site for a **D**igital **D**atabase **L**andmark.
    The main actions are:
    *   **C**reate: Laying the foundation, building new structures.
    *   **A**lter: Renovating, extending, or modifying existing buildings.
    *   **D**rop: Demolishing an entire building.
    *   **T**runcate: Clearing out all the furniture and contents from a building, but leaving the building itself standing.
    Just remember: **C**onstruction **A**lways **D**emands **T**hought. (CADT)

2.  **1-3 Formulas/Facts They MUST Overlearn:**
    *   **DDL defines *structure*, not data.** (This is the core distinction from DML).
    *   **`DROP` is irreversible and removes *both* structure and data.** (Use with extreme caution).
    *   **`TRUNCATE` removes *all* data, keeps structure, is usually faster, and often resets auto-increment.** (No `WHERE` clause allowed).

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** Immediately after this lesson, try to write out the basic syntax and purpose of each command from memory.
    *   **Review 2:** In 1 day, revisit the examples. Can you explain why each step works?
    *   **Review 3:** In 3 days, try to solve a new problem involving all four commands.
    *   **Review 4:** In 7 days, quiz yourself on the common mistakes and traps.
    *   **Review 5:** In 16 days, explain DDL to a rubber duck (or a friend) using the plain English analogies.
    *   **Review 6:** In 35 days, attempt to solve a complex problem combining DDL with basic DML.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the specific syntax or behavior of a DDL command, think about the fundamental needs of managing a database's *structure*:
    *   **Need:** I need a *new* place to store a certain type of information.
        *   **Action:** I must *build* it. $\rightarrow$ `CREATE`
    *   **Need:** I have an existing storage place, but its *design* is wrong or incomplete.
        *   **Action:** I must *change* its design. $\rightarrow$ `ALTER`
    *   **Need:** I no longer require this storage place or its contents; I want it completely gone.
        *   **Action:** I must *destroy* it. $\rightarrow$ `DROP`
    *   **Need:** This storage place is full of old, irrelevant data, but I still need the storage place itself for new data.
        *   **Action:** I must *empty* it completely and efficiently. $\rightarrow$ `TRUNCATE`

By thinking about the core intent, you can reconstruct the purpose and often the general form of the command, even if the exact syntax temporarily slips your mind.

## 10. Connections — what this leads to

Mastering SQL DDL is not an isolated skill; it's a foundational pillar that unlocks and connects to numerous other critical concepts in Computer Science and Database Management:

1.  **Data Manipulation Language (DML):** DDL sets the stage for DML (`SELECT`, `INSERT`, `UPDATE`, `DELETE`). You can't manipulate data until you've defined where it lives using DDL. Understanding DDL helps you write more efficient and correct DML queries by knowing the table and column structures.
2.  **Data Control Language (DCL):** DCL (`GRANT`, `REVOKE`) manages permissions. You use DCL to grant users permission to `CREATE`, `ALTER`, or `DROP` objects, or to `SELECT`, `INSERT`, `UPDATE`, `DELETE` data within those objects.
3.  **Database Design and Normalization:** DDL is the language you use to implement the principles of database design (e.g., 1NF, 2NF, 3NF, BCNF). Understanding how to define primary keys, foreign keys, and other constraints with DDL is crucial for building well-normalized, efficient, and integrity-preserving databases.
4.  **Database Administration (DBA):** DBAs extensively use DDL for schema management, database maintenance, migrations, and ensuring data integrity and security. This includes managing indexes, views, stored procedures, and triggers, all of which are defined using DDL.
5.  **Schema Evolution and Migration Tools:** In real-world applications, database schemas are rarely static. As applications evolve, their underlying database schemas must change. Tools like Flyway or Liquibase manage these schema changes (migrations) by executing DDL scripts in a controlled and versioned manner. DDL knowledge is essential to write these scripts.
6.  **Object-Relational Mapping (ORM):** Frameworks like Hibernate (Java), SQLAlchemy (Python), or Entity Framework (.NET) allow developers to interact with databases using object-oriented code. While ORMs often abstract away raw SQL DDL, they fundamentally translate object models into DDL statements to create and modify tables. Understanding DDL helps in debugging ORM-generated schema issues.
7.  **Database Security:** By defining appropriate constraints and data types with DDL, you inherently add a layer of security by preventing invalid or malicious data from entering the system.
8.  **Performance Tuning:** Creating appropriate indexes (also a DDL operation) can drastically improve query performance. Understanding how to `CREATE` and `DROP` indexes is vital for optimizing database operations.
9.  **Big Data and Data Warehousing:** Even in large-scale data systems, the concept of defining data structures (schemas) persists, whether in traditional relational databases, NoSQL databases (though schema definitions might be more flexible), or data lakes. DDL principles underpin how data is organized for analysis.

## 11. Self-check questions

1.  Explain the primary difference in purpose between SQL DDL commands and SQL DML commands. Provide one example of a DDL command and one example of a DML command.
2.  You have a table named `Employees` with columns `EmployeeID` (Primary Key), `FirstName`, `LastName`, and `HireDate`. Write the SQL DDL statement(s) to:
    a.  Add a new column `Email` of type `VARCHAR(255)` that must contain unique values and cannot be `NULL`.
    b.  Change the `FirstName` column to allow up to 100 characters instead of its current 50 characters. (Assume current type is `VARCHAR(50)`).
3.  Describe a scenario where you would use `TRUNCATE TABLE` instead of `DELETE FROM table_name;` (without a `WHERE` clause), highlighting the advantages of `TRUNCATE` in that specific context.
4.  Consider two tables: `Orders` and `Customers`. The `Orders` table has a `CustomerID` column which is a foreign key referencing the `CustomerID` (primary key) in the `Customers` table. What would happen if you tried to execute `DROP TABLE Customers;` without any additional clauses, and why? How would you successfully drop the `Customers` table if it has dependent `Orders`?
5.  Write a series of SQL DDL statements to create a new database named `ProjectDB`. Inside this database, create a table named `Tasks` with the following requirements:
    *   `TaskID`: Integer, primary key, auto-incrementing.
    *   `TaskName`: Text, cannot be `NULL`, must be unique.
    *   `DueDate`: Date, must be in the future (compared to the current date).
    *   `Priority`: Integer, must be between 1 (highest) and 5 (lowest), defaults to 3 if not specified.
    Then, write a single DDL statement to remove the entire `ProjectDB` database.