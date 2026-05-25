## 1. What it is — in plain English

Imagine you have a giant, messy spreadsheet where you keep track of everything: customer orders, product details, employee information, and more. Some cells have multiple values, some information is repeated over and over, and if you change one piece of data, you might forget to change it in three other places. This is a recipe for confusion and errors.

Database Normalization is like organizing that messy spreadsheet into several smaller, neat, and well-structured tables. It's a set of rules or guidelines that helps you design your database in a way that reduces redundancy (repeated information) and improves data integrity (ensuring the data is accurate and consistent).

Think of it as sorting your laundry. Instead of having one giant pile of all your clothes, you sort them into categories: shirts, pants, socks, underwear. Each category gets its own drawer or shelf. This makes it easier to find what you need, avoids having duplicate items in different piles, and ensures that when you update your wardrobe (say, buying new shirts), you know exactly where to put them.

The goal is to make your data storage efficient, reliable, and easy to manage. When data is well-organized, it's less likely to have errors, easier to update, and faster to query.

## 2. Why it matters — real-world applications

Normalization isn't just an academic exercise; it's fundamental to building robust, reliable systems across virtually every industry.

1.  **E-commerce Platforms (e.g., Amazon, Shopify):** Imagine an online store. Product details (name, price, description) are stored in one table, customer information in another, and order details (which customer bought which product, when) in a third. If product details were repeated in every order entry, changing a product's price would require updating potentially millions of records. Normalization ensures that product details are stored once, and order tables simply reference the product ID. This guarantees consistent pricing, accurate inventory, and reliable order fulfillment.

2.  **Banking and Financial Systems (e.g., Chase, Visa):** Accuracy is paramount in finance. Normalization prevents inconsistencies in account balances, transaction records, and customer profiles. If a customer's address was stored redundantly across multiple tables, an update anomaly could lead to statements being sent to an old address, or worse, incorrect fraud alerts. By normalizing, customer data is stored uniquely, ensuring that all financial services use the single, correct version of truth.

3.  **Healthcare Management Systems (e.g., Epic, Cerner):** Patient records, medical history, prescribed medications, and doctor appointments are complex and highly sensitive. Normalization helps maintain the integrity of this critical data. For instance, a drug's dosage and side effects are stored once, preventing conflicting information from appearing in different patient records. This is vital for patient safety, preventing medication errors, and ensuring compliance with regulations.

4.  **Aerospace Engineering & Manufacturing (e.g., Boeing, SpaceX):** In aerospace, parts inventory, assembly instructions, and maintenance logs are incredibly detailed. A single aircraft can have millions of components. Normalization ensures that each component's specifications (e.g., part number, material, manufacturer) are stored uniquely. This prevents errors in ordering, manufacturing, and maintenance, which could have catastrophic consequences for safety and performance. For instance, if a specific bolt's torque specification changed, normalization ensures that this update is applied once and consistently across all relevant assembly and maintenance procedures.

5.  **Machine Learning Data Preparation:** While often denormalized for specific analytical workloads, the *source* data for Machine Learning models often benefits from normalization. Clean, consistent, and non-redundant data is a prerequisite for training effective ML models. If an ML model is trained on data with update anomalies (e.g., a customer's age is different in various records), it will learn incorrect patterns, leading to poor predictions or classifications. Normalization helps ensure the data fed into ML pipelines is of high quality and integrity.

## 3. Prerequisites — what you must know first

Before diving into the specifics of normalization, ensure you have a solid grasp of these foundational database concepts:

*   **Relational Databases:** A database structured to recognize relationships among stored items of information. It stores data in tables (relations) with rows and columns.
*   **Tables (Relations):** A collection of related data organized into rows and columns. Each table represents an entity (e.g., `Customers`, `Products`).
*   **Rows (Tuples/Records):** A single entry in a table, representing one instance of the entity (e.g., one specific customer, one specific product).
*   **Columns (Attributes/Fields):** A specific characteristic or property of the entity, defining the type of data stored in each cell within that column (e.g., `CustomerName`, `ProductID`).
*   **Primary Key (PK):** A column or a set of columns that uniquely identifies each row in a table. It cannot contain NULL values and must be unique for every record.
*   **Candidate Key:** Any attribute or set of attributes that can uniquely identify a row in a table. A primary key is chosen from the set of candidate keys.
*   **Foreign Key (FK):** A column or set of columns in one table that refers to the primary key in another table. It establishes a link or relationship between two tables.
*   **Functional Dependency (FD):** A relationship between two attributes (or sets of attributes) where the value of one attribute (or set) uniquely determines the value of another attribute (or set). Written as $A \to B$, meaning "A determines B." If you know A, you can find B.
*   **Transitive Dependency:** An indirect functional dependency where $A \to B$ and $B \to C$, therefore $A \to C$. Here, $A$ determines $C$ through $B$.
*   **Partial Dependency:** A functional dependency where a non-key attribute is dependent on only *part* of a composite primary key. (A composite key is a primary key made up of two or more attributes).
*   **Anomalies:** Problems that arise in poorly designed databases due to data redundancy. There are three main types:
    *   **Insertion Anomaly:** Cannot insert new data without also inserting other, unrelated data.
    *   **Deletion Anomaly:** Deleting one piece of data unintentionally causes the loss of other, related data.
    *   **Update Anomaly:** Changing one piece of data requires changing it in multiple places, leading to inconsistencies if not all instances are updated.

## 4. The core idea — step by step

The core idea of normalization is to systematically decompose a large, potentially problematic table into smaller, well-structured tables. Each step (Normal Form) addresses a specific type of data redundancy or dependency that can lead to anomalies. We move from less strict to more strict forms, with each higher normal form building upon the previous one.

### Step 1: Understanding Unnormalized Forms (UNF) and Anomalies

Before we can normalize, we must understand what a "bad" table looks like. An unnormalized table often contains repeating groups or multi-valued attributes within a single cell. More importantly, it's prone to the three types of anomalies:

*   **Plain-English Statement:** An unnormalized table is like a single giant spreadsheet cell trying to hold a list of items, or where details about one thing are mixed in with details about many other things, causing a mess.
*   **Small Concrete Example:**
    Consider a table `Student_Course` where a student can enroll in multiple courses:

    | StudentID | StudentName | CourseCode | CourseName | Grade | Instructor |
    | :-------- | :---------- | :--------- | :--------- | :---- | :--------- |
    | 101       | Alice       | CS101      | Intro CS   | A     | Dr. Smith  |
    | 101       | Alice       | MA201      | Calculus   | B     | Dr. Jones  |
    | 102       | Bob         | CS101      | Intro CS   | C     | Dr. Smith  |
    | 103       | Charlie     | PH101      | Physics    | B     | Dr. White  |

    *   **Insertion Anomaly:** We cannot add a new instructor (Dr. Green) until they are assigned to a course and a student enrolls in it. We also cannot add a new student (David) without assigning them to at least one course.
    *   **Deletion Anomaly:** If student 103 (Charlie) drops PH101, all information about PH101 (CourseName, Instructor) is lost if Charlie was the only student taking it.
    *   **Update Anomaly:** If Dr. Smith's name changes to Dr. Smythe, we must update two rows for Student 101 and 102. If we forget one, we have inconsistent data.
*   **Formal/Mathematical Version:** A relation is in UNF if it contains repeating groups or non-atomic attributes.
*   **What could go wrong:** Your database becomes a source of errors, inconsistencies, and makes data management a nightmare.

### Step 2: First Normal Form (1NF)

1NF is the most basic level of normalization. It sets the fundamental rules for what constitutes a "table" in a relational database.

*   **Plain-English Statement:** For a table to be in 1NF, every cell must contain only one piece of information, and there should be no repeating groups of columns. Imagine a spreadsheet where you never merge cells and each cell only has one value, not a list.
*   **Small Concrete Example:**
    Let's take the `Student_Course` example from UNF. The issue isn't repeating groups *within a cell* here, but rather that the table itself is not designed to prevent them from occurring conceptually. A more direct example of violating 1NF would be:

    | StudentID | StudentName | CourseCodes          | Grades      |
    | :-------- | :---------- | :------------------- | :---------- |
    | 101       | Alice       | CS101, MA201         | A, B        |
    | 102       | Bob         | CS101                | C           |

    To bring this to 1NF, we break down the multi-valued cells into separate rows:

    | StudentID | StudentName | CourseCode | Grade |
    | :-------- | :---------- | :--------- | :---- |
    | 101       | Alice       | CS101      | A     |
    | 101       | Alice       | MA201      | B     |
    | 102       | Bob         | CS101      | C     |

    Now, each cell contains a single, atomic value.
*   **Formal/Mathematical Version:** A relation $R$ is in 1NF if and only if all attribute domains contain only atomic values. An atomic value is a value that cannot be further subdivided.
*   **What could go wrong:** Even in 1NF, we still have redundancy. For example, `StudentName` (Alice) is repeated for `StudentID` 101. This leads to the anomalies described earlier. 1NF only solves the "repeating groups within a cell" problem.

### Step 3: Second Normal Form (2NF)

2NF addresses a specific type of redundancy that occurs when a table has a composite primary key.

*   **Plain-English Statement:** For a table to be in 2NF, it must first be in 1NF. Additionally, all non-key attributes (columns that are not part of any candidate key) must depend on the *entire* primary key, not just a part of it. If you have a primary key made of multiple columns, no other column should depend on only *some* of those primary key columns.
*   **Small Concrete Example:**
    Consider the 1NF table from before, with `Instructor` added back:

    `Enrollment` table:
    | StudentID | CourseCode | StudentName | Grade | Instructor |
    | :-------- | :--------- | :---------- | :---- | :--------- |
    | 101       | CS101      | Alice       | A     | Dr. Smith  |
    | 101       | MA201      | Alice       | B     | Dr. Jones  |
    | 102       | CS101      | Bob         | C     | Dr. Smith  |

    Here, the primary key is `(StudentID, CourseCode)`.
    *   `StudentName` depends only on `StudentID` (a part of the PK). This is a partial dependency.
    *   `Instructor` depends only on `CourseCode` (another part of the PK). This is also a partial dependency.
    *   `Grade` depends on `(StudentID, CourseCode)` (the full PK). This is fine.

    To bring it to 2NF, we decompose it into three tables:

    `Students` table:
    | StudentID | StudentName |
    | :-------- | :---------- |
    | 101       | Alice       |
    | 102       | Bob         |

    `Courses` table:
    | CourseCode | Instructor |
    | :--------- | :--------- |
    | CS101      | Dr. Smith  |
    | MA201      | Dr. Jones  |

    `Enrollments` table (linking students to courses and grades):
    | StudentID | CourseCode | Grade |
    | :-------- | :--------- | :---- |
    | 101       | CS101      | A     |
    | 101       | MA201      | B     |
    | 102       | CS101      | C     |

*   **Formal/Mathematical Version:** A relation $R$ is in 2NF if it is in 1NF and every non-prime attribute is fully functionally dependent on every candidate key. Equivalently, there are no partial dependencies of non-prime attributes on any candidate key.
    *   A non-prime attribute is an attribute that is not part of *any* candidate key.
    *   A prime attribute is an attribute that is part of *at least one* candidate key.
*   **What could go wrong:** Partial dependencies lead to update, insertion, and deletion anomalies. For example, if Dr. Smith teaches CS101 and we want to add a new course "PH101" taught by Dr. White, we can't add Dr. White's information without also assigning them to a student in the original table. Deleting the last student from CS101 would also delete Dr. Smith's information.

### Step 4: Third Normal Form (3NF)

3NF addresses a different type of dependency called a transitive dependency.

*   **Plain-English Statement:** For a table to be in 3NF, it must first be in 2NF. Additionally, there should be no transitive dependencies. This means no non-key attribute should depend on another non-key attribute. If attribute A determines B, and B determines C, then A shouldn't directly determine C if B is not part of the primary key.
*   **Small Concrete Example:**
    Consider a `Students` table from our 2NF example, but now with department information:

    `Students` table:
    | StudentID | StudentName | DeptID | DeptName |
    | :-------- | :---------- | :----- | :------- |
    | 101       | Alice       | D1     | Computer Science |
    | 102       | Bob         | D1     | Computer Science |
    | 103       | Charlie     | D2     | Mathematics |

    Here, `StudentID` is the primary key.
    *   `StudentID` $\to$ `StudentName` (OK)
    *   `StudentID` $\to$ `DeptID` (OK)
    *   `DeptID` $\to$ `DeptName` (OK)
    *   Since `StudentID` $\to$ `DeptID` and `DeptID` $\to$ `DeptName`, we have `StudentID` $\to$ `DeptName` indirectly. This is a transitive dependency because `DeptName` depends on `DeptID`, which is a non-key attribute.

    To bring it to 3NF, we decompose it into two tables:

    `Students` table:
    | StudentID | StudentName | DeptID |
    | :-------- | :---------- | :----- |
    | 101       | Alice       | D1     |
    | 102       | Bob         | D1     |
    | 103       | Charlie     | D2     |

    `Departments` table:
    | DeptID | DeptName         |
    | :----- | :--------------- |
    | D1     | Computer Science |
    | D2     | Mathematics      |

*   **Formal/Mathematical Version:** A relation $R$ is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on any candidate key. Formally, for every non-trivial functional dependency $X \to Y$ where $Y$ is a non-prime attribute, $X$ must be a superkey, or $Y$ must be a prime attribute. (A simpler definition: A relation $R$ is in 3NF if for every non-trivial functional dependency $X \to Y$, either $X$ is a superkey, or $Y$ is a prime attribute.)
*   **What could go wrong:** Transitive dependencies also lead to update, insertion, and deletion anomalies. If we want to change the name of the "Computer Science" department, we'd have to update multiple rows in the original `Students` table. If the last student from a department is deleted, the department's name would be lost.

### Step 5: Boyce-Codd Normal Form (BCNF)

BCNF is a stronger version of 3NF. Most practical database designs aim for 3NF, but BCNF is used in cases with more complex dependencies, especially when a table has multiple overlapping candidate keys.

*   **Plain-English Statement:** For a table to be in BCNF, it must first be in 3NF. The rule is simple: for every functional dependency $X \to Y$ in the table, $X$ *must* be a superkey. A superkey is any attribute or set of attributes that uniquely identifies a row (it's a candidate key or contains a candidate key). This means that if something determines another thing, the "something" (the determinant) must be a unique identifier for the entire row.
*   **Small Concrete Example:**
    Consider a table `Student_Instructor_Course` where a student can be taught by multiple instructors for the *same course*, and an instructor can teach multiple courses.

    `Student_Instructor_Course` table:
    | StudentID | Instructor | Course     |
    | :-------- | :--------- | :--------- |
    | 101       | Dr. Smith  | CS101      |
    | 101       | Dr. Jones  | MA201      |
    | 102       | Dr. Smith  | CS101      |
    | 103       | Dr. White  | PH101      |
    | 101       | Dr. Smith  | MA201      | (Assume Dr. Smith also teaches MA201 to Alice)

    Let's define the functional dependencies:
    1.  `(StudentID, Course)` $\to$ `Instructor` (A student takes a specific course from a specific instructor)
    2.  `Instructor` $\to$ `Course` (An instructor teaches only one specific course - *This is the key assumption for BCNF violation demonstration*)

    Candidate keys:
    *   `(StudentID, Course)` is a candidate key because it uniquely identifies an instructor.
    *   `(StudentID, Instructor)` is also a candidate key because if you know the student and the instructor, you know the course (due to FD #2).

    This table is in 3NF:
    *   It's in 1NF (atomic values).
    *   It's in 2NF (no partial dependencies, as non-key attributes don't exist here; all attributes are part of *some* candidate key).
    *   It's in 3NF (no transitive dependencies, as no non-key attribute depends on another non-key attribute).

    However, it violates BCNF because of `Instructor` $\to$ `Course`. Here, `Instructor` determines `Course`, but `Instructor` is *not* a superkey for the table `Student_Instructor_Course`. `Instructor` alone cannot uniquely identify a row (e.g., Dr. Smith appears with Student 101 and 102).

    To bring it to BCNF, we decompose it:

    `Instructor_Course` table:
    | Instructor | Course     |
    | :--------- | :--------- |
    | Dr. Smith  | CS101      |
    | Dr. Jones  | MA201      |
    | Dr. White  | PH101      |

    `Student_Enrollment` table:
    | StudentID | Instructor |
    | :-------- | :--------- |
    | 101       | Dr. Smith  |
    | 101       | Dr. Jones  |
    | 102       | Dr. Smith  |
    | 103       | Dr. White  |

    Now, in `Instructor_Course`, `Instructor` is the primary key (and thus a superkey), satisfying BCNF. In `Student_Enrollment`, `(StudentID, Instructor)` is the primary key, and there are no non-key attributes or other FDs, so it's also in BCNF.
*   **Formal/Mathematical Version:** A relation $R$ is in BCNF if for every non-trivial functional dependency $X \to Y$ in $R$, $X$ is a superkey of $R$. (A non-trivial FD means $Y$ is not a subset of $X$.)
*   **What could go wrong:** BCNF violations often occur when a table has multiple candidate keys that overlap, and a non-key attribute (or part of a candidate key) determines another part of a candidate key. This leads to subtle anomalies that 3NF doesn't catch, primarily related to updating and deleting information about the determinants that are not superkeys.

## 5. Worked examples — multiple, with every step shown

Let's walk through several examples to solidify your understanding.

### Example 1: Unnormalized to 1NF

**Problem:** We have a table `Customer_Orders` tracking customer information and multiple orders for each customer.

`Customer_Orders` table:
| CustomerID | CustomerName | CustomerAddress | OrderIDs        | OrderDates         | ProductIDs       | Quantities     |
| :--------- | :----------- | :-------------- | :-------------- | :----------------- | :--------------- | :------------- |
| C1         | Alice        | 123 Main St     | O1, O2          | 2023-01-01, 2023-01-05 | P1, P2           | 2, 1           |
| C2         | Bob          | 456 Oak Ave     | O3              | 2023-01-10         | P3               | 3              |

**Identify what's given and what we want:**
*   **Given:** An unnormalized table with multi-valued attributes (lists of `OrderIDs`, `OrderDates`, `ProductIDs`, `Quantities` in single cells).
*   **Want:** The table in 1NF.

**Show every algebraic / logical step:**

1.  **Analyze for 1NF violations:** The columns `OrderIDs`, `OrderDates`, `ProductIDs`, and `Quantities` all contain multiple values within a single cell. This directly violates the atomic value rule of 1NF.
    *   *Explanation:* Each cell should hold only one piece of data. Here, a cell might contain "O1, O2" which are two order IDs.

2.  **Decompose to eliminate multi-valued attributes:** To achieve 1NF, we must ensure each row-column intersection contains only one value. This means expanding the rows for each order. Since a customer can have multiple orders, and each order can have multiple products, we need to be careful. The most granular unit here is a customer's order for a specific product.

    Let's first expand for orders:
    | CustomerID | CustomerName | CustomerAddress | OrderID | OrderDate | ProductIDs | Quantities |
    | :--------- | :----------- | :-------------- | :------ | :-------- | :--------- | :--------- |
    | C1         | Alice        | 123 Main St     | O1      | 2023-01-01 | P1, P2     | 2, 1       |
    | C1         | Alice        | 123 Main St     | O2      | 2023-01-05 | P1, P2     | 2, 1       | (Assuming P1, P2 were for O1, and also for O2, which is ambiguous in problem statement. Let's clarify: P1 with Qty 2 for O1, P2 with Qty 1 for O2. This is a common ambiguity in these types of problems, requiring clarification of original intent.)

    *Self-correction:* The original problem's `ProductIDs` and `Quantities` are also lists. This implies a many-to-many relationship between orders and products. A better approach for 1NF is to create separate rows for each item *within* an order.

    Let's assume:
    *   Order O1 by C1: Product P1 (Qty 2)
    *   Order O2 by C1: Product P2 (Qty 1)
    *   Order O3 by C2: Product P3 (Qty 3)

    Re-evaluating the original table with this interpretation:
    `Customer_Orders` table:
    | CustomerID | CustomerName | CustomerAddress | OrderID | OrderDate | ProductID | Quantity |
    | :--------- | :----------- | :-------------- | :------ | :-------- | :-------- | :------- |
    | C1         | Alice        | 123 Main St     | O1      | 2023-01-01 | P1        | 2        |
    | C1         | Alice        | 123 Main St     | O2      | 2023-01-05 | P2        | 1        |
    | C2         | Bob          | 456 Oak Ave     | O3      | 2023-01-10 | P3        | 3        |

    *Explanation:* Each row now represents a unique line item within an order. Each cell contains a single, atomic value. For example, `OrderIDs` "O1, O2" has been split into two distinct rows.
    The primary key for this 1NF table would be `(OrderID, ProductID)` (if a single order can have multiple products) or just `OrderID` (if an order has only one product). Given the `ProductIDs` and `Quantities` in the original, `(OrderID, ProductID)` is more likely. Let's assume `OrderID` is unique for an order, and `ProductID` for a specific item within that order. So `(OrderID, ProductID)` is the PK.

**Final Answer:**
The table in 1NF:
```
Customers_Orders_1NF
+------------+--------------+-----------------+---------+------------+-----------+----------+
| CustomerID | CustomerName | CustomerAddress | OrderID | OrderDate  | ProductID | Quantity |
+------------+--------------+-----------------+---------+------------+-----------+----------+
| C1         | Alice        | 123 Main St     | O1      | 2023-01-01 | P1        | 2        |
| C1         | Alice        | 123 Main St     | O2      | 2023-01-05 | P2        | 1        |
| C2         | Bob          | 456 Oak Ave     | O3      | 2023-01-10 | P3        | 3        |
+------------+--------------+-----------------+---------+------------+-----------+----------+
```

**Reflection:** The tricky part here is correctly interpreting the original multi-valued attributes. When multiple lists are present, it often implies a need for a composite key in the 1NF table, representing the finest granularity of data. The decomposition must ensure that each cell holds a single, indivisible piece of information.

### Example 2: 1NF to 2NF

**Problem:** We have a table `Project_Assignments` that is in 1NF, but exhibits redundancy.

`Project_Assignments` table:
| EmployeeID | ProjectID | EmployeeName | ProjectName | HoursWorked |
| :--------- | :-------- | :----------- | :---------- | :---------- |
| E1         | P1        | Alice        | Alpha       | 40          |
| E1         | P2        | Alice        | Beta        | 30          |
| E2         | P1        | Bob          | Alpha       | 25          |
| E3         | P3        | Charlie      | Gamma       | 50          |

**Identify what's given and what we want:**
*   **Given:** A table `Project_Assignments` in 1NF.
*   **Primary Key (PK):** `(EmployeeID, ProjectID)` (because an employee can work on multiple projects, and a project can have multiple employees).
*   **Functional Dependencies (FDs):**
    *   `EmployeeID` $\to$ `EmployeeName` (An EmployeeID determines an EmployeeName)
    *   `ProjectID` $\to$ `ProjectName` (A ProjectID determines a ProjectName)
    *   `(EmployeeID, ProjectID)` $\to$ `HoursWorked` (An EmployeeID and ProjectID together determine HoursWorked)
*   **Want:** The table in 2NF.

**Show every algebraic / logical step:**

1.  **Verify 1NF:** All cells contain atomic values. No repeating groups. So it is in 1NF.
    *   *Explanation:* This is a prerequisite for 2NF.

2.  **Check for Partial Dependencies:** A partial dependency occurs when a non-key attribute depends on only *part* of a composite primary key.
    *   Our PK is `(EmployeeID, ProjectID)`.
    *   `EmployeeName` is a non-key attribute. `EmployeeID` is part of the PK. We have `EmployeeID` $\to$ `EmployeeName`. This is a **partial dependency**.
        *   *Explanation:* `EmployeeName` (Alice) is repeated for `E1` across multiple projects. It only depends on `EmployeeID`, not the full `(EmployeeID, ProjectID)` key.
    *   `ProjectName` is a non-key attribute. `ProjectID` is part of the PK. We have `ProjectID` $\to$ `ProjectName`. This is also a **partial dependency**.
        *   *Explanation:* `ProjectName` (Alpha) is repeated for `P1` across multiple employees. It only depends on `ProjectID`, not the full `(EmployeeID, ProjectID)` key.
    *   `HoursWorked` depends on `(EmployeeID, ProjectID)`. This is a full functional dependency on the primary key, so it's fine.

3.  **Decompose to eliminate Partial Dependencies:** To resolve partial dependencies, we create new tables for the attributes that are partially dependent.

    *   Create an `Employees` table for `EmployeeID` and `EmployeeName`:
        $$ \text{Employees(EmployeeID, EmployeeName)} $$
    *   Create a `Projects` table for `ProjectID` and `ProjectName`:
        $$ \text{Projects(ProjectID, ProjectName)} $$
    *   Keep the original `Project_Assignments` table for the attributes that are fully functionally dependent on the primary key, or for the primary key itself, ensuring we retain the links:
        $$ \text{Employee_Project_Hours(EmployeeID, ProjectID, HoursWorked)} $$

**Final Answer:**
The tables in 2NF:

**`Employees` table:**
```
+------------+--------------+
| EmployeeID | EmployeeName |
+------------+--------------+
| E1         | Alice        |
| E2         | Bob          |
| E3         | Charlie      |
+------------+--------------+
```

**`Projects` table:**
```
+-----------+-------------+
| ProjectID | ProjectName |
+-----------+-------------+
| P1        | Alpha       |
| P2        | Beta        |
| P3        | Gamma       |
+-----------+-------------+
```

**`Employee_Project_Hours` table:**
```
+------------+-----------+-------------+
| EmployeeID | ProjectID | HoursWorked |
+------------+-----------+-------------+
| E1         | P1        | 40          |
| E1         | P2        | 30          |
| E2         | P1        | 25          |
| E3         | P3        | 50          |
+------------+-----------+-------------+
```

**Reflection:** The key to moving from 1NF to 2NF is identifying the composite primary key and then checking if any non-key attributes depend on *only a portion* of that key. If so, those attributes (and the partial key they depend on) should be moved to a new table.

### Example 3: 2NF to 3NF

**Problem:** We have a table `Student_Details` that is in 2NF, but still has redundancy.

`Student_Details` table:
| StudentID | StudentName | DeptID | DeptName         | DeptLocation |
| :-------- | :---------- | :----- | :--------------- | :----------- |
| S1        | Alice       | D1     | Computer Science | Building A   |
| S2        | Bob         | D1     | Computer Science | Building A   |
| S3        | Charlie     | D2     | Mathematics      | Building B   |
| S4        | David       | D3     | Physics          | Building C   |

**Identify what's given and what we want:**
*   **Given:** A table `Student_Details` in 2NF.
*   **Primary Key (PK):** `StudentID`
*   **Functional Dependencies (FDs):**
    *   `StudentID` $\to$ `StudentName`
    *   `StudentID` $\to$ `DeptID`
    *   `DeptID` $\to$ `DeptName`
    *   `DeptID` $\to$ `DeptLocation`
    *   Therefore, transitively: `StudentID` $\to$ `DeptName` and `StudentID` $\to$ `DeptLocation` (via `DeptID`).
*   **Want:** The table in 3NF.

**Show every algebraic / logical step:**

1.  **Verify 2NF:**
    *   It's in 1NF (atomic values).
    *   The PK is `StudentID` (a single attribute, not composite). Therefore, there are no partial dependencies by definition (a non-key attribute cannot depend on *part* of a single-attribute key). So, it's in 2NF.
    *   *Explanation:* This is a prerequisite for 3NF.

2.  **Check for Transitive Dependencies:** A transitive dependency occurs when a non-key attribute depends on another non-key attribute, which in turn depends on the primary key.
    *   `StudentID` is PK.
    *   `DeptID` is a non-key attribute.
    *   `DeptName` is a non-key attribute.
    *   `DeptLocation` is a non-key attribute.
    *   We have `StudentID` $\to$ `DeptID` and `DeptID` $\to$ `DeptName`. This means `DeptName` is transitively dependent on `StudentID` via `DeptID`.
        *   *Explanation:* `DeptName` (e.g., "Computer Science") is repeated for every student in that department. This information about the department itself should not be tied directly to a student's record through this indirect dependency.
    *   Similarly, `StudentID` $\to$ `DeptID` and `DeptID` $\to$ `DeptLocation`. This means `DeptLocation` is transitively dependent on `StudentID` via `DeptID`.
        *   *Explanation:* `DeptLocation` (e.g., "Building A") is also repeated.

3.  **Decompose to eliminate Transitive Dependencies:** To resolve transitive dependencies, we create a new table for the attributes involved in the transitive dependency.

    *   Create a `Departments` table for `DeptID`, `DeptName`, and `DeptLocation`:
        $$ \text{Departments(DeptID, DeptName, DeptLocation)} $$
    *   Keep the original `Student_Details` table for `StudentID`, `StudentName`, and `DeptID` (as `DeptID` is now a foreign key linking to the `Departments` table):
        $$ \text{Students(StudentID, StudentName, DeptID)} $$

**Final Answer:**
The tables in 3NF:

**`Students` table:**
```
+-----------+-------------+--------+
| StudentID | StudentName | DeptID |
+-----------+-------------+--------+
| S1        | Alice       | D1     |
| S2        | Bob         | D1     |
| S3        | Charlie     | D2     |
| S4        | David       | D3     |
+-----------+-------------+--------+
```

**`Departments` table:**
```
+--------+------------------+--------------+
| DeptID | DeptName         | DeptLocation |
+--------+------------------+--------------+
| D1     | Computer Science | Building A   |
| D2     | Mathematics      | Building B   |
| D3     | Physics          | Building C   |
+--------+------------------+--------------+
```

**Reflection:** The key to 3NF is identifying non-key attributes that depend on *other non-key attributes*. If `A` (PK) $\to$ `B` (non-key) and `B` $\to$ `C` (non-key), then `C` is transitively dependent on `A` via `B`. This `B` and `C` information should be moved to a new table with `B` as its primary key.

### Example 4: 3NF to BCNF

**Problem:** We have a table `Course_Instructor_Student` that is in 3NF but still has a subtle anomaly. This scenario often involves multiple candidate keys and a determinant that is not a superkey.

`Course_Instructor_Student` table:
| Course     | Instructor | Student |
| :--------- | :--------- | :------ |
| CS101      | Dr. Smith  | Alice   |
| CS101      | Dr. Smith  | Bob     |
| MA201      | Dr. Jones  | Charlie |
| PH101      | Dr. White  | David   |
| MA201      | Dr. Smith  | Emily   | (Assume Dr. Smith also teaches MA201)

**Identify what's given and what we want:**
*   **Given:** A table `Course_Instructor_Student` in 3NF.
*   **Assumptions/Functional Dependencies (FDs):**
    1.  `(Course, Student)` $\to$ `Instructor` (A student takes a specific course from a specific instructor)
    2.  `Instructor` $\to$ `Course` (A specific instructor teaches only one specific course. This is the critical FD that causes a BCNF violation.)
*   **Candidate Keys:**
    *   From FD 1: `(Course, Student)` is a candidate key.
    *   From FD 2 and the structure: If `Instructor` determines `Course`, then `(Instructor, Student)` also forms a candidate key because `Instructor` determines `Course`, and `(Course, Student)` determines `Instructor`. So, `(Instructor, Student)` determines `Course` and `Instructor` (which is part of the key). Therefore, `(Instructor, Student)` can uniquely identify a row.
*   **Want:** The table in BCNF.

**Show every algebraic / logical step:**

1.  **Verify 3NF:**
    *   **1NF:** Yes, all atomic values.
    *   **2NF:** PKs are `(Course, Student)` and `(Instructor, Student)`. All attributes are part of at least one candidate key (prime attributes). There are no non-prime attributes, so no partial dependencies of non-prime attributes. Thus, it is in 2NF.
    *   **3NF:** Since there are no non-prime attributes, there can be no transitive dependencies involving non-prime attributes. Thus, it is in 3NF.
    *   *Explanation:* This table satisfies 3NF because all attributes are prime attributes (part of a candidate key). 3NF primarily deals with dependencies involving non-prime attributes.

2.  **Check for BCNF Violation:** A relation is in BCNF if for every non-trivial functional dependency $X \to Y$, $X$ is a superkey.
    *   Consider the FD: `Instructor` $\to$ `Course`.
    *   Is `Instructor` a superkey for the table `Course_Instructor_Student`? No. `Instructor` alone cannot uniquely identify a row (e.g., Dr. Smith teaches Alice and Bob).
    *   Therefore, this table violates BCNF.
    *   *Explanation:* The determinant `Instructor` is not a superkey. This means that information about `Course` is redundantly stored with `Instructor` when `Instructor` isn't the primary way to access the full row. If Dr. Smith changes the course they teach, we'd have to update multiple rows.

3.  **Decompose to eliminate BCNF Violation:** To resolve the BCNF violation, we decompose the table based on the violating functional dependency. The determinant (`Instructor`) becomes the primary key of a new table, and the dependent attribute (`Course`) goes with it. The original table then retains the determinant (`Instructor`) as a foreign key.

    *   Create a `Instructor_Teaches` table based on `Instructor` $\to$ `Course`:
        $$ \text{Instructor_Teaches(Instructor, Course)} $$
        The primary key for this table is `Instructor`.
    *   The remaining attributes from the original table, along with the determinant `Instructor`, form the new `Student_Enrollment` table:
        $$ \text{Student_Enrollment(Student, Instructor)} $$
        The primary key for this table is `(Student, Instructor)`.

**Final Answer:**
The tables in BCNF:

**`Instructor_Teaches` table:**
```
+------------+---------+
| Instructor | Course  |
+------------+---------+
| Dr. Smith  | CS101   |
| Dr. Jones  | MA201   |
| Dr. White  | PH101   |
+------------+---------+
```
*Note: If Dr. Smith teaches MA201 as well, the FD `Instructor` -> `Course` is violated. The example data had `MA201 | Dr. Smith | Emily`. This implies `Dr. Smith` teaches `CS101` and `MA201`, which would mean `Instructor` does *not* determine `Course`. Let's re-evaluate the assumption of FD `Instructor` $\to$ `Course`. If `Instructor` $\to$ `Course` is *not* true, then the original table is already in BCNF. For BCNF violation, the FD `Instructor` $\to$ `Course` *must* hold.*

*Self-correction for BCNF example:* Let's adjust the example data to strictly adhere to the FD `Instructor` $\to$ `Course`. This means each instructor teaches *only one* course.

Revised `Course_Instructor_Student` table with `Instructor` $\to$ `Course` strictly enforced:
| Course     | Instructor | Student |
| :--------- | :--------- | :------ |
| CS101      | Dr. Smith  | Alice   |
| CS101      | Dr. Smith  | Bob     |
| MA201      | Dr. Jones  | Charlie |
| PH101      | Dr. White  | David   |

Now, the FDs are:
1.  `(Course, Student)` $\to$ `Instructor`
2.  `Instructor` $\to$ `Course` (Dr. Smith only teaches CS101, Dr. Jones only MA201, etc.)

Candidate keys: `(Course, Student)` and `(Instructor, Student)`.

Violation of BCNF: `Instructor` $\to$ `Course`. `Instructor` is a determinant, but it is not a superkey.

Decomposition:

**`Instructor_Teaches` table:**
```
+------------+---------+
| Instructor | Course  |
+------------+---------+
| Dr. Smith  | CS101   |
| Dr. Jones  | MA201   |
| Dr. White  | PH101   |
+------------+---------+
```
*Primary Key: `Instructor`*

**`Student_Enrollment` table:**
```
+---------+------------+
| Student | Instructor |
+---------+------------+
| Alice   | Dr. Smith  |
| Bob     | Dr. Smith  |
| Charlie | Dr. Jones  |
| David   | Dr. White  |
+---------+------------+
```
*Primary Key: `(Student, Instructor)`*

**Reflection:** BCNF is tricky because it often involves identifying FDs where the determinant is *not* a superkey, especially when there are multiple candidate keys. The example highlights that if an attribute (like `Instructor`) determines another attribute (`Course`) but isn't itself enough to uniquely identify a full row (meaning it's not a superkey), then you have a BCNF violation. The decomposition isolates that specific dependency into its own table.

## 6. Common mistakes and traps

1.  **Confusing Partial and Transitive Dependencies:**
    *   **Why it happens:** Both involve non-key attributes depending on something less than the full primary key.
    *   **The difference:** Partial dependency ($A \to C$ where $A$ is *part* of a composite PK $AB$) occurs only with composite keys. Transitive dependency ($A \to B \to C$ where $A$ is PK, $B$ is non-key, $C$ is non-key) occurs when a non-key attribute depends on another non-key attribute.

2.  **Not Identifying All Candidate Keys:**
    *   **Why it happens:** Students often focus only on the designated primary key.
    *   **The trap:** 2NF, 3NF, and BCNF definitions refer to *candidate keys* (or superkeys), not just the chosen primary key. Missing a candidate key can lead to incorrect normalization or missing violations.

3.  **Over-normalizing (Performance vs. Integrity Trade-off):**
    *   **Why it happens:** Believing that "more normal is always better."
    *   **The trap:** While normalization improves data integrity, excessively normalizing (e.g., going beyond 3NF or BCNF when not strictly necessary) can lead to many small tables and complex queries with numerous joins. This can negatively impact query performance, especially in data warehousing or reporting scenarios where denormalization is often preferred.

4.  **Forgetting Prerequisites:**
    *   **Why it happens:** Jumping directly to 3NF or BCNF checks.
    *   **The trap:** A table cannot be in 2NF if it's not in 1NF. It cannot be in 3NF if it's not in 2NF, and so on. Each normal form builds upon the previous one. Always check the lower normal forms first.

5.  **Misunderstanding "Superkey" in BCNF:**
    *   **Why it happens:** The definition of BCNF ($X \to Y \implies X$ is a superkey) can be subtle.
    *   **The trap:** Students might incorrectly assume that if $X$ is *part* of a superkey, it's sufficient. No, $X$ itself must be a superkey (meaning $X$ alone can uniquely identify a row, or $X$ contains a candidate key). This is the key distinction from 3NF when dealing with overlapping candidate keys.

6.  **Lossless Join Decomposition vs. Dependency Preserving:**
    *   **Why it happens:** Not realizing that decomposition must maintain data integrity and reconstructibility.
    *   **The trap:** Normalization decompositions must be *lossless-join*, meaning you can reconstruct the original table without losing information by joining the decomposed tables. Ideally, they should also be *dependency-preserving*, meaning all original functional dependencies can still be enforced in the new schema. BCNF decomposition is always lossless-join but not always dependency-preserving. 3NF decomposition is always both.

## 7. Textbook-precise explanation

Normalization is a systematic approach to decomposing relations (tables) to eliminate data redundancy and undesirable anomalies (insertion, deletion, update anomalies). This process involves a series of progressively stricter normal forms.

Let $R$ be a relation schema, and $F$ be the set of functional dependencies (FDs) that hold over $R$. Let $X$ and $Y$ be subsets of attributes of $R$.

### First Normal Form (1NF)

A relation $R$ is in **First Normal Form (1NF)** if and only if all attribute domains contain only atomic (indivisible) values. This implies that there are no repeating groups or multi-valued attributes within a single cell.

*   *Citation:* "Elmasri, R., & Navathe, S. B. (2017). *Fundamentals of Database Systems* (7th ed., §15.1)."

### Second Normal Form (2NF)

A relation $R$ is in **Second Normal Form (2NF)** if and only if it is in 1NF and every non-prime attribute is fully functionally dependent on every candidate key.
Equivalently, $R$ is in 2NF if it is in 1NF and there are no partial dependencies of any non-prime attribute on any candidate key.
A non-prime attribute is an attribute that is not part of any candidate key. A partial dependency exists if $X \to Y$ where $X$ is a proper subset of a candidate key and $Y$ is a non-prime attribute.

*   *Citation:* "Date, C. J. (2004). *An Introduction to Database Systems* (8th ed., §11.2)."

### Third Normal Form (3NF)

A relation $R$ is in **Third Normal Form (3NF)** if and only if it is in 2NF and no non-prime attribute is transitively dependent on any candidate key.
Equivalently, $R$ is in 3NF if for every non-trivial functional dependency $X \to Y$ (where $Y$ is not a subset of $X$), at least one of the following conditions holds:
1.  $X$ is a superkey of $R$.
2.  $Y$ is a prime attribute (i.e., $Y$ is part of some candidate key of $R$).
A transitive dependency exists if $A \to B$ and $B \to C$ (where $A$ is a candidate key, $B$ is a non-prime attribute, and $C$ is a non-prime attribute).

*   *Citation:* "Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database System Concepts* (7th ed., §7.3)."

### Boyce-Codd Normal Form (BCNF)

A relation $R$ is in **Boyce-Codd Normal Form (BCNF)** if and only if for every non-trivial functional dependency $X \to Y$ in $R$, $X$ is a superkey of $R$.
BCNF is a stricter form of 3NF. While 3NF allows for non-prime attributes to be dependent on other non-prime attributes if the dependent attribute is prime, BCNF eliminates this exception. BCNF primarily addresses cases where 3NF fails to eliminate anomalies in relations with multiple overlapping candidate keys.

*   *Citation:* "Ullman, J. D., & Widom, J. (2008). *A First Course in Database Systems* (3rd ed., §3.6)."

## 8. ASCII diagrams

Here are some ASCII diagrams to illustrate the concepts of normalization.

### 1. Violation of 1NF (Multi-valued attribute)

```text
Original Table: Student_Courses (Violates 1NF)

+-----------+-------------+---------------------+-------------------+
| StudentID | StudentName | CourseCodes         | Grades            |
+-----------+-------------+---------------------+-------------------+
| 101       | Alice       | CS101, MA201        | A, B              |
| 102       | Bob         | PH101               | C                 |
+-----------+-------------+---------------------+-------------------+
```
*Description:* The `CourseCodes` and `Grades` columns contain multiple values separated by commas in a single cell, which is a direct violation of 1NF. Each cell should contain only one atomic value.

### 2. Normalized to 1NF

```text
Table: Student_Grades (In 1NF)

+-----------+-------------+-----------+-------+
| StudentID | StudentName | CourseCode| Grade |
+-----------+-------------+-----------+-------+
| 101       | Alice       | CS101     | A     |
| 101       | Alice       | MA201     | B     |
| 102       | Bob         | PH101     | C     |
+-----------+-------------+-----------+-------+
```
*Description:* The multi-valued attributes have been expanded into multiple rows. Now, each cell contains a single, atomic value. The primary key here would be `(StudentID, CourseCode)`.

### 3. Partial Dependency (Violation of 2NF)

```text
Table: Project_Assignments (1NF, but violates 2NF)
Primary Key: (EmployeeID, ProjectID)

+------------+-----------+--------------+-------------+-------------+
| EmployeeID | ProjectID | EmployeeName | ProjectName | HoursWorked |
+------------+-----------+--------------+-------------+-------------+
| E1         | P1        | Alice        | Alpha       | 40          |
| E1         | P2        | Alice        | Beta        | 30          |
| E2         | P1        | Bob          | Alpha       | 25          |
+------------+-----------+--------------+-------------+-------------+

Functional Dependencies:
  EmployeeID -> EmployeeName  <-- PARTIAL DEPENDENCY (EmployeeName depends only on part of PK)
  ProjectID  -> ProjectName   <-- PARTIAL DEPENDENCY (ProjectName depends only on part of PK)
```
*Description:* `EmployeeName` depends only on `EmployeeID` (part of the composite PK `(EmployeeID, ProjectID)`). `ProjectName` depends only on `ProjectID` (another part of the composite PK). This redundancy leads to update anomalies (e.g., changing Alice's name requires multiple updates).

### 4. Transitive Dependency (Violation of 3NF)

```text
Table: Student_Details (2NF, but violates 3NF)
Primary Key: StudentID

+-----------+-------------+--------+------------------+--------------+
| StudentID | StudentName | DeptID | DeptName         | DeptLocation |
+-----------+-------------+--------+------------------+--------------+
| S1        | Alice       | D1     | Computer Science | Building A   |
| S2        | Bob         | D1     | Computer Science | Building A   |
| S3        | Charlie     | D2     | Mathematics      | Building B   |
+-----------+-------------+--------+------------------+--------------+

Functional Dependencies:
  StudentID -> DeptID
  DeptID    -> DeptName
  DeptID    -> DeptLocation
  Therefore: StudentID -> DeptName (via DeptID)  <-- TRANSITIVE DEPENDENCY
             StudentID -> DeptLocation (via DeptID)
```
*Description:* `DeptName` and `DeptLocation` are non-key attributes that depend on `DeptID`, which is also a non-key attribute. `DeptID` in turn depends on the primary key `StudentID`. This indirect dependency means department details are repeated for every student in that department, leading to update anomalies.

## 9. Memory technique — never forget this

To master normalization, you need a clear way to remember the rules and their progression.

1.  **Specific Mnemonic/Visual Hook:**
    *   **"1st Funky, 2nd Partial, 3rd Transitive, BCNF is Super!"**
        *   **1st Funky:** Reminds you of "atomic" or "funky cells" with multiple values. Fix the funky cells to make them atomic.
        *   **2nd Partial:** Reminds you to eliminate partial dependencies (where non-key attributes depend on *part* of a composite key).
        *   **3rd Transitive:** Reminds you to eliminate transitive dependencies (where non-key attributes depend on *other non-key attributes*).
        *   **BCNF is Super!:** Reminds you that for BCNF, *every* determinant (left-hand side of an FD) *must be a superkey*. It's a "super" strict rule.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    1.  **1NF:** All attributes are atomic (no multi-valued attributes or repeating groups).
    2.  **2NF:** Is in 1NF **AND** no non-prime attribute is partially dependent on any candidate key.
    3.  **3NF:** Is in 2NF **AND** no non-prime attribute is transitively dependent on any candidate key.
    4.  **BCNF:** For every non-trivial FD $X \to Y$, $X$ **must be a superkey**.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review all definitions, examples, and the mnemonic.
    *   **Day 3:** Rework one example from each normal form (1NF, 2NF, 3NF, BCNF) without looking at solutions.
    *   **Day 7:** Explain each normal form and its associated anomaly in your own words to an imaginary person.
    *   **Day 16:** Given a new unnormalized table, attempt to normalize it fully to BCNF.
    *   **Day 35:** Review the formal definitions and compare them to your intuitive understanding.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the specific rules, always go back to the fundamental problem: **data anomalies**.
    *   **Step 1: What causes anomalies?** Redundancy.
    *   **Step 2: What's the most basic redundancy?** Multi-valued cells or repeating groups. How do we fix that? By making each cell atomic and giving each distinct entity its own row. This leads to **1NF**.
    *   **Step 3: What's the next level of redundancy after 1NF?** If you have a primary key made of multiple parts, some non-key data might only depend on *one part* of it. That's inefficient and causes anomalies. How do we fix that? Separate those partially dependent attributes into their own tables. This leads to **2NF**.
    *   **Step 4: What's the redundancy after 2NF?** You might have non-key data that depends on *other non-key data*, which itself depends on the primary key. This is an indirect link, causing redundancy. How do we fix that? Separate those transitively dependent attributes into their own tables. This leads to **3NF**.
    *   **Step 5: Is there any remaining subtle redundancy?** Yes, sometimes with complex overlapping keys, a non-key attribute (or part of a candidate key) can determine another attribute, but that determinant isn't a full unique identifier for the table. This is a very specific, strict case. How do we fix that? Ensure *every* determinant is a superkey. This leads to **BCNF**.

## 10. Connections — what this leads to

Understanding normalization is a cornerstone of effective database management and design. It directly connects to and underpins several advanced topics:

*   **Database Design and Schema Modeling:** Normalization is the primary tool for designing robust, efficient, and maintainable relational database schemas. Without it, database designs would be chaotic and prone to error. It's intimately tied to Entity-Relationship (ER) modeling, where entities and their attributes are eventually mapped to normalized tables.
*   **Data Integrity and Consistency:** The entire purpose of normalization is to enforce data integrity. By reducing redundancy and structuring data logically, it ensures that data remains consistent across the database, preventing conflicting information. This is critical for reliable data processing in all applications.
*   **Query Optimization:** While highly normalized schemas might sometimes require more joins (which can impact performance), they often lead to more straightforward, less ambiguous queries. A well-normalized database prevents the need for complex logic to handle inconsistent data, making queries more predictable and easier to optimize by the database management system (DBMS).
*   **Data Warehousing and OLAP:** In data warehousing environments, data is often *denormalized* into star or snowflake schemas for performance reasons (to reduce joins during analytical queries). However, the decision to denormalize is a *controlled* one, made with a full understanding of the original normalized structure and the trade-offs involved. Normalization provides the baseline from which denormalization strategies are developed.
*   **Big Data and NoSQL Databases:** While NoSQL databases often embrace denormalization for scalability and performance (especially for specific query patterns), the *principles* behind normalization (understanding data relationships, dependencies, and the pitfalls of redundancy) remain highly relevant. Developers working with NoSQL still need to consciously decide what data to duplicate and how to manage potential inconsistencies, often relying on application-level logic to achieve what normalization provides relationally.
*   **Data Quality and Governance:** Normalization directly contributes to higher data quality. By eliminating anomalies, it simplifies data governance efforts, as there are fewer inconsistencies to manage and reconcile.
*   **Security:** A well-structured, normalized database can simplify the application of security policies. By separating sensitive data into distinct tables, access controls can be more granularly applied, reducing the surface area for data breaches.

## 11. Self-check questions

1.  Explain, in your own words, the primary goal of database normalization and describe the three main types of anomalies it seeks to prevent. Provide a small, distinct example for each anomaly type.
2.  Consider a table `(BookID, Title, AuthorName, AuthorNationality, PublisherName, PublisherCity)`. Assume `BookID` is the primary key. Also assume `AuthorName` is unique for each author, and `AuthorName` $\to$ `AuthorNationality`. Additionally, `PublisherName` is unique for each publisher, and `PublisherName` $\to$ `PublisherCity`. Identify the highest normal form this table is currently in and explain why. Then, decompose it to achieve 3NF, showing all intermediate steps and the resulting tables.
3.