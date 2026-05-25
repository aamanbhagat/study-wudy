## 1. What it is — in plain English

Imagine you're trying to figure out all the ingredients in a really complex recipe, where some ingredients are themselves recipes. You start with the main dish, list its direct ingredients. Then, for each of *those* ingredients that are also recipes, you go find *their* direct ingredients, and you keep doing this until you only have basic, single-item ingredients left.

In the world of databases, a "Common Table Expression" (CTE), often introduced with the `WITH` clause, is like a temporary, named scratchpad for a query. You define a small, focused query, give it a name, and then you can use that name in your main query as if it were a regular table. It helps break down complex queries into smaller, more readable, and manageable parts.

Now, a *recursive* CTE is a special kind of scratchpad that can refer to itself. Think of it as a recipe that, in its list of ingredients, says "also, use the result of *this very recipe* from the previous step." This self-referencing ability allows it to perform iterative operations, like repeatedly digging deeper into a hierarchy or traversing a path, until a certain condition is met and it decides to stop. It's a powerful tool for tasks that involve "walking through" connected data, like finding all employees under a manager, or all parts in a complex assembly.

## 2. Why it matters — real-world applications

Recursive CTEs are incredibly powerful for handling hierarchical or graph-like data structures, which are prevalent in many real-world systems.

1.  **Organizational Hierarchies and Bill of Materials (BoM):** Companies like **Boeing** or **Airbus** use complex Bill of Materials systems to manage the thousands of components that go into an aircraft. A recursive CTE can be used to explode a BoM, showing all sub-components, sub-sub-components, and so on, for a given part, along with their quantities and assembly levels. Similarly, in any large organization, a recursive CTE can trace an employee's reporting line up to the CEO or find all subordinates under a specific manager.
2.  **Network and Graph Traversal:** Imagine **Google Maps** calculating routes, or **Facebook** determining "friends of friends." While these systems often use specialized graph databases for performance, the underlying logic of traversing connections is perfectly modeled by recursive CTEs. You can find all reachable nodes from a starting point, calculate paths, or identify cycles in a network (e.g., flight paths between airports, IP network routing tables). In **aerospace**, this could involve analyzing dependencies in complex system architectures or tracing signal paths.
3.  **Time Series Generation and Data Analysis:** In fields like **financial modeling** or **physics simulations**, you often need to generate a sequence of dates, numbers, or simulation steps. A recursive CTE can efficiently generate these sequences without needing to store them in a physical table. For instance, generating every day of the month for a report, or simulating discrete time steps in a physical process where each step depends on the previous one.
4.  **Fraud Detection and Transaction Tracing:** Financial institutions might use recursive CTEs to trace chains of transactions. If a suspicious transaction occurs, a recursive CTE can follow the money trail, identifying all related accounts and transactions that led to or from it, helping to uncover complex fraud rings.
5.  **Compiler Design and Language Processing:** When parsing code or processing structured text, recursive CTEs can model the hierarchical structure of abstract syntax trees (ASTs) or XML/JSON documents, allowing for complex queries and transformations on these nested structures.

## 3. Prerequisites — what you must know first

Before diving deep into recursive CTEs, ensure you have a solid grasp of these fundamental database and SQL concepts:

*   **SQL Basics (`SELECT`, `FROM`, `WHERE`, `JOIN`):** You must be comfortable writing basic queries to retrieve, filter, and combine data from tables.
*   **Relational Databases:** Understand what tables, rows, columns, primary keys, and foreign keys are, and how they define relationships between data.
*   **Subqueries:** Be familiar with using `SELECT` statements nested within other `SELECT`, `FROM`, or `WHERE` clauses to break down complex queries.
*   **Common Table Expressions (CTEs) (Non-Recursive):** You absolutely *must* understand how a regular `WITH` clause works to define a temporary, named result set for a single query. Recursive CTEs build directly on this concept.
*   **Set Theory (`UNION`, `UNION ALL`):** Understand how `UNION` combines result sets by removing duplicates, and how `UNION ALL` combines them while preserving all rows, including duplicates. `UNION ALL` is critical for recursive CTEs.
*   **Basic Recursion (Programming Concept):** Have a general understanding of what recursion means in programming – a function calling itself, a base case (stopping condition), and a recursive step. This conceptual understanding will translate directly to recursive CTEs.

## 4. The core idea — step by step

Let's break down the structure and logic of a recursive CTE.

### Step 1: The Non-Recursive CTE Refresher

**Plain-English Statement:** A regular CTE is like creating a temporary, named table that exists only for the duration of the query it's part of. It helps organize complex queries.

**Small Concrete Example:** Imagine you want to find the total sales for each region, and then use that result in another calculation.

```sql
WITH SalesByRegion AS (
    SELECT
        Region,
        SUM(Amount) AS TotalSales
    FROM
        Sales
    GROUP BY
        Region
)
SELECT
    Region,
    TotalSales
FROM
    SalesByRegion
WHERE
    TotalSales > 10000;
```

**Formal/Mathematical Version:**
Let $Q_1$ be a `SELECT` query. A non-recursive CTE $C$ is defined as:
$$ \text{WITH } C \text{ AS } (Q_1) \text{ SELECT ... FROM } C $$
Here, $C$ represents a temporary relation whose schema and tuples are determined by $Q_1$.

**What Could Go Wrong:** Forgetting that a CTE is temporary and only accessible by the single `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement immediately following its definition. You can't define a CTE and then use it in two separate, unrelated queries.

### Step 2: Introducing Recursion - The "Self-Reference"

**Plain-English Statement:** A recursive CTE is a special kind of temporary table that can refer to itself within its own definition. This allows it to process data iteratively, generating new rows based on the results from its previous "run" or iteration, until a specific stopping point is reached.

**Small Concrete Example:** Conceptually, if you had a CTE named `MySequence`, the idea is that inside `MySequence`'s definition, you could write `SELECT ... FROM MySequence`. This is the core of recursion: using the result you're currently building to build the *next* part of the result.

**Formal/Mathematical Version:** The keyword `RECURSIVE` is added to the `WITH` clause:
$$ \text{WITH RECURSIVE } \text{cte\_name} \text{ AS } (\text{anchor\_member} \text{ UNION ALL } \text{recursive\_member}) \text{ SELECT ... FROM } \text{cte\_name} $$
The `cte_name` within the `recursive_member` refers to the *current* result set being built by the CTE.

**What Could Go Wrong:** Without a proper termination condition, a recursive CTE will run indefinitely, consuming all available memory and CPU cycles, eventually leading to an error or database crash. This is the most common and dangerous pitfall.

### Step 3: The Anchor Member (Base Case)

**Plain-English Statement:** This is the starting point of your recursive process. It's a non-recursive query that provides the initial set of rows for the CTE. Think of it as the "seed" data or the "base case" in a recursive function – the part that *doesn't* refer to itself.

**Small Concrete Example:** If you want to generate a sequence of numbers starting from 1, your anchor member would simply be:
```sql
SELECT 1 AS n
```
This query produces a single row: `n = 1`. This row is the first "iteration" of your CTE's result.

**Formal/Mathematical Version:** In the structure `WITH RECURSIVE cte_name AS (initial_query UNION ALL recursive_query)`, the `initial_query` is the anchor member. It must be a valid `SELECT` statement that does *not* reference `cte_name`.
$$ \text{initial\_query} \equiv \text{SELECT } \text{column\_list} \text{ FROM } \text{base\_tables} \text{ WHERE } \text{initial\_conditions} $$

**What Could Go Wrong:**
1.  **Empty Anchor:** If the anchor member returns no rows, the recursive member will have nothing to process, and the CTE will return an empty result.
2.  **Incorrect Columns:** The anchor member must define the same number of columns with compatible data types as the recursive member. If the column types or count don't match, you'll get a syntax error.

### Step 4: The Recursive Member (Recursive Step)

**Plain-English Statement:** This is the heart of the recursion. It's a `SELECT` query that *does* refer to the CTE itself (the `cte_name`) in its `FROM` clause. It takes the rows generated by the previous iteration of the CTE (initially, the rows from the anchor member) and uses them to generate *new* rows. This process repeats.

**Small Concrete Example:** Continuing our number sequence, if the anchor gave us `n=1`, the recursive member would take that `n=1` and generate the next number:
```sql
SELECT n + 1 FROM MySequence WHERE n < 5 -- Assuming MySequence is the CTE name
```
In the first iteration, `MySequence` contains `(1)`. The recursive member takes `1`, adds `1` to it, resulting in `2`. In the next iteration, `MySequence` would contain `(1, 2)`, and the recursive member would process `2` to get `3`, and so on.

**Formal/Mathematical Version:** In the structure `WITH RECURSIVE cte_name AS (initial_query UNION ALL recursive_query)`, the `recursive_query` is the recursive member. It must be a valid `SELECT` statement that references `cte_name` in its `FROM` clause.
$$ \text{recursive\_query} \equiv \text{SELECT } \text{column\_list} \text{ FROM } \text{cte\_name} \text{ JOIN ... WHERE } \text{recursive\_conditions} $$
The `column_list` must match the `initial_query`'s column list in number and compatible data types.

**What Could Go Wrong:**
1.  **Missing Self-Reference:** If the recursive member doesn't refer to the `cte_name`, it's not truly recursive.
2.  **Incorrect Logic:** The logic (e.g., `n + 1`) or join conditions might be flawed, leading to incorrect results or unexpected termination.
3.  **Missing Termination Condition:** This is critical. Without a `WHERE` clause that eventually stops generating new rows, the CTE will loop infinitely.

### Step 5: The `UNION ALL` Operator

**Plain-English Statement:** This operator is the glue that combines the results of the anchor member and all subsequent iterations of the recursive member. It's crucial because it preserves *all* rows, including duplicates, which is usually exactly what you want when building a cumulative set of results in a recursive process.

**Small Concrete Example:**
If the anchor produced `(1)` and the first recursive step produced `(2)`, `UNION ALL` would combine them into `(1, 2)`. If the next recursive step produced `(3)`, `UNION ALL` would make the total result `(1, 2, 3)`.

**Formal/Mathematical Version:** The `UNION ALL` operator concatenates the result sets of the anchor and recursive members. If $R_A$ is the result of the anchor member and $R_R$ is the result of the recursive member, the combined result for an iteration is $R_A \cup_{\text{ALL}} R_R$.
$$ \text{Result}_{\text{current}} = \text{Result}_{\text{previous}} \cup_{\text{ALL}} \text{NewRows}_{\text{from\_recursive\_step}} $$

**What Could Go Wrong:** Using `UNION` instead of `UNION ALL`. `UNION` automatically removes duplicate rows. In many recursive scenarios (like traversing a path where nodes might be visited multiple times, or simply building a sequence where you want all generated values), removing duplicates can break the intended logic or lead to incomplete results. Always use `UNION ALL` unless you explicitly want duplicates removed *after* the recursion has completed.

### Step 6: The Termination Condition

**Plain-English Statement:** This is a `WHERE` clause within the *recursive member* that dictates when the recursion should stop. It's the "base case" for the recursive step, preventing an infinite loop. Without it, the CTE would keep generating rows indefinitely until system resources are exhausted.

**Small Concrete Example:** In our number sequence example, `WHERE n < 5` is the termination condition. Once `n` reaches `5`, the recursive member will no longer generate new rows, and the recursion stops.

```sql
WITH RECURSIVE MySequence AS (
    SELECT 1 AS n -- Anchor member
    UNION ALL
    SELECT n + 1 FROM MySequence WHERE n < 5 -- Recursive member with termination condition
)
SELECT * FROM MySequence;
```
When `n` is `4`, the recursive member produces `5`. In the next iteration, `MySequence` contains `(1, 2, 3, 4, 5)`. The recursive member then processes `5`. Since `5 < 5` is false, no new rows are generated, and the recursion terminates.

**Formal/Mathematical Version:** A predicate $P$ applied to the rows generated by the recursive member:
$$ \text{recursive\_query} \equiv \text{SELECT ... FROM } \text{cte\_name} \text{ WHERE } P(\text{columns from cte\_name}) $$
The recursion halts when the `recursive_query` returns an empty set of rows.

**What Could Go Wrong:**
1.  **Missing Condition:** The most critical error, leading to an infinite loop.
2.  **Incorrect Condition:** A condition that is never met (e.g., `WHERE n > 0` for a sequence starting at 1 and incrementing) will also lead to an infinite loop.
3.  **Too Restrictive Condition:** A condition that stops the recursion too early, leading to incomplete results.

### Step 7: The Final Outer Query

**Plain-English Statement:** After the recursive CTE has finished executing and has built its complete result set, you need a final `SELECT` statement to retrieve and potentially further process those results. This query treats the CTE as if it were a regular table.

**Small Concrete Example:**
```sql
WITH RECURSIVE MySequence AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM MySequence WHERE n < 5
)
SELECT n * 10 AS MultipliedValue -- This is the final outer query
FROM MySequence
WHERE n % 2 = 0; -- Further filtering or operations
```
This query would take the full result of `MySequence` (`1, 2, 3, 4, 5`), filter for even numbers (`2, 4`), and then multiply them by 10, yielding `(20, 40)`.

**Formal/Mathematical Version:**
$$ \text{SELECT } \text{final\_column\_list} \text{ FROM } \text{cte\_name} \text{ WHERE } \text{final\_conditions} \text{ ORDER BY ...} $$
This query can perform any valid `SELECT` operations, including joins with other tables, aggregations, etc., on the data produced by the recursive CTE.

**What Could Go Wrong:** Not understanding that the CTE itself doesn't *display* results until the outer query is run. Also, applying filters or transformations in the outer query that should have been part of the recursive member (or vice-versa) can lead to inefficient queries or incorrect results.

## 5. Worked examples — multiple, with every step shown

We'll use a hypothetical `Employees` table for some examples:
`Employees` table:
| EmployeeID | Name        | ManagerID | Salary |
| :--------- | :---------- | :-------- | :----- |
| 1          | Alice CEO   | NULL      | 200000 |
| 2          | Bob VP      | 1         | 150000 |
| 3          | Carol Mgr   | 2         | 100000 |
| 4          | David Eng   | 3         | 80000  |
| 5          | Eve Eng     | 3         | 85000  |
| 6          | Frank VP    | 1         | 140000 |
| 7          | Grace Mgr   | 6         | 95000  |
| 8          | Heidi Eng   | 7         | 75000  |

### Example 1: Generating a Simple Number Sequence

**Problem:** Generate a sequence of integers from 1 to 5.

**What's Given:** A starting number (1) and an ending number (5).
**What We Want:** A result set containing the numbers 1, 2, 3, 4, 5.

**Step-by-Step Solution:**

1.  **Define the CTE and its name:** We'll call our CTE `NumberSequence`. We must use `WITH RECURSIVE`.
    ```sql
    WITH RECURSIVE NumberSequence AS (
        -- ... anchor and recursive members go here ...
    )
    SELECT * FROM NumberSequence;
    ```
    *Explanation:* This sets up the basic structure for a recursive CTE named `NumberSequence`. The final `SELECT * FROM NumberSequence` will retrieve all rows generated by the CTE.

2.  **Formulate the Anchor Member:** The sequence starts at 1. This is our base case.
    ```sql
    WITH RECURSIVE NumberSequence AS (
        SELECT 1 AS n -- Start with the number 1, aliased as 'n'
    )
    SELECT * FROM NumberSequence;
    ```
    *Explanation:* This `SELECT` statement provides the initial row `(1)` to the `NumberSequence` CTE. This row is the first part of our final sequence.

3.  **Formulate the Recursive Member:** We need to generate the next number by adding 1 to the current number (`n`). This step must refer to `NumberSequence` itself. We also need a termination condition to stop at 5.
    ```sql
    WITH RECURSIVE NumberSequence AS (
        SELECT 1 AS n
        UNION ALL -- Combine results from anchor and recursive parts
        SELECT n + 1 -- Add 1 to the current number 'n'
        FROM NumberSequence -- Reference the CTE itself
        WHERE n < 5 -- Stop when 'n' reaches 5 (i.e., generate up to 4, then 5)
    )
    SELECT * FROM NumberSequence;
    ```
    *Explanation:*
    *   `UNION ALL`: Appends the results of the recursive member to the results of the anchor member (and subsequent recursive calls).
    *   `SELECT n + 1`: This is the recursive logic. It takes the `n` from the previous iteration of `NumberSequence` and calculates the next number.
    *   `FROM NumberSequence`: This is the self-reference. In the first iteration, it processes the `(1)` from the anchor. In the second, it processes `(1, 2)`, and so on.
    *   `WHERE n < 5`: This is the crucial termination condition. The recursive member will only generate new rows as long as the `n` value from the *previous* iteration is less than 5. When `n` becomes 5, this condition is false, and the recursion stops.

4.  **Execute the Full Query:**
    The database engine will perform these steps:
    *   **Iteration 0 (Anchor):** `NumberSequence` gets `(1)`.
    *   **Iteration 1 (Recursive):** `SELECT n + 1 FROM NumberSequence WHERE n < 5` runs with `NumberSequence` containing `(1)`. It finds `n=1`, `1 < 5` is true, so it generates `1+1=2`. `NumberSequence` now contains `(1, 2)`.
    *   **Iteration 2 (Recursive):** `SELECT n + 1 FROM NumberSequence WHERE n < 5` runs with `NumberSequence` containing `(1, 2)`. It finds `n=2`, `2 < 5` is true, so it generates `2+1=3`. `NumberSequence` now contains `(1, 2, 3)`.
    *   **Iteration 3 (Recursive):** `SELECT n + 1 FROM NumberSequence WHERE n < 5` runs with `NumberSequence` containing `(1, 2, 3)`. It finds `n=3`, `3 < 5` is true, so it generates `3+1=4`. `NumberSequence` now contains `(1, 2, 3, 4)`.
    *   **Iteration 4 (Recursive):** `SELECT n + 1 FROM NumberSequence WHERE n < 5` runs with `NumberSequence` containing `(1, 2, 3, 4)`. It finds `n=4`, `4 < 5` is true, so it generates `4+1=5`. `NumberSequence` now contains `(1, 2, 3, 4, 5)`.
    *   **Iteration 5 (Recursive):** `SELECT n + 1 FROM NumberSequence WHERE n < 5` runs with `NumberSequence` containing `(1, 2, 3, 4, 5)`. It finds `n=5`, `5 < 5` is false. No new rows are generated. The recursion terminates.
    *   **Final Outer Query:** `SELECT * FROM NumberSequence` retrieves all collected rows.

**Final Answer:**
```text
+---+
| n |
+---+
| 1 |
| 2 |
| 3 |
| 4 |
| 5 |
+---+
```

**Reflection:** This example highlights the basic structure: anchor (start), recursive (next step), `UNION ALL` (collect results), and termination (stop condition). The simplicity makes it easy to trace the flow.

---

### Example 2: Finding All Subordinates (Employee Hierarchy)

**Problem:** Given an `EmployeeID`, find all employees who directly or indirectly report to them.

**What's Given:** The `Employees` table and a starting `ManagerID` (e.g., Alice CEO, EmployeeID 1).
**What We Want:** A list of `EmployeeID`, `Name`, and their `Level` (how many steps down the hierarchy they are from the starting manager).

**Step-by-Step Solution:**

1.  **Define the CTE and its name:** We'll call it `Subordinates`.
    ```sql
    WITH RECURSIVE Subordinates AS (
        -- ... anchor and recursive members ...
    )
    SELECT * FROM Subordinates;
    ```
    *Explanation:* Standard CTE setup.

2.  **Formulate the Anchor Member:** Start with the initial manager (e.g., Alice, EmployeeID 1). This is level 0 relative to herself.
    ```sql
    WITH RECURSIVE Subordinates AS (
        SELECT
            EmployeeID,
            Name,
            ManagerID,
            0 AS Level -- The starting manager is at level 0 relative to herself
        FROM
            Employees
        WHERE
            EmployeeID = 1 -- Start with Alice CEO (EmployeeID 1)
    )
    SELECT * FROM Subordinates;
    ```
    *Explanation:* This query selects Alice's data and assigns her a `Level` of 0. This is the first set of rows for our `Subordinates` CTE.

3.  **Formulate the Recursive Member:** Find employees whose `ManagerID` matches an `EmployeeID` from the *previous* iteration of `Subordinates`. Increment the `Level` for each step down.
    ```sql
    WITH RECURSIVE Subordinates AS (
        SELECT
            EmployeeID,
            Name,
            ManagerID,
            0 AS Level
        FROM
            Employees
        WHERE
            EmployeeID = 1
        UNION ALL
        SELECT
            e.EmployeeID,
            e.Name,
            e.ManagerID,
            s.Level + 1 AS Level -- Increment level for each step down
        FROM
            Employees AS e
        JOIN
            Subordinates AS s ON e.ManagerID = s.EmployeeID -- Join with the CTE itself
    )
    SELECT * FROM Subordinates;
    ```
    *Explanation:*
    *   `UNION ALL`: Combines the results.
    *   `SELECT e.EmployeeID, ... s.Level + 1 AS Level`: Selects the subordinate's details and increments the `Level` from their manager (who came from the `Subordinates` CTE).
    *   `FROM Employees AS e JOIN Subordinates AS s ON e.ManagerID = s.EmployeeID`: This is the recursive join. It takes the `EmployeeID`s of the employees found in the *previous iteration* (aliased as `s` for `Subordinates`) and finds all employees (`e`) who report to them (`e.ManagerID = s.EmployeeID`).

4.  **Execute the Full Query:**
    *   **Iteration 0 (Anchor):** `Subordinates` gets `(1, 'Alice CEO', NULL, 0)`.
    *   **Iteration 1 (Recursive):** Joins `Employees` with `Subordinates` where `s.EmployeeID = 1`. Finds Bob (ID 2) and Frank (ID 6). `Subordinates` now contains `(1, 'Alice CEO', NULL, 0), (2, 'Bob VP', 1, 1), (6, 'Frank VP', 1, 1)`.
    *   **Iteration 2 (Recursive):** Joins `Employees` with `Subordinates` where `s.EmployeeID` is 2 or 6.
        *   For `s.EmployeeID = 2`, finds Carol (ID 3).
        *   For `s.EmployeeID = 6`, finds Grace (ID 7).
        `Subordinates` now contains `... (3, 'Carol Mgr', 2, 2), (7, 'Grace Mgr', 6, 2)`.
    *   **Iteration 3 (Recursive):** Joins `Employees` with `Subordinates` where `s.EmployeeID` is 3 or 7.
        *   For `s.EmployeeID = 3`, finds David (ID 4) and Eve (ID 5).
        *   For `s.EmployeeID = 7`, finds Heidi (ID 8).
        `Subordinates` now contains `... (4, 'David Eng', 3, 3), (5, 'Eve Eng', 3, 3), (8, 'Heidi Eng', 7, 3)`.
    *   **Iteration 4 (Recursive):** Joins `Employees` with `Subordinates` where `s.EmployeeID` is 4, 5, or 8. None of these employees are managers (no one has `ManagerID` 4, 5, or 8). The recursive member returns no rows. The recursion terminates.
    *   **Final Outer Query:** `SELECT * FROM Subordinates` retrieves all collected rows.

**Final Answer:**
```text
+------------+-----------+-----------+-------+
| EmployeeID | Name      | ManagerID | Level |
+------------+-----------+-----------+-------+
| 1          | Alice CEO | NULL      | 0     |
| 2          | Bob VP    | 1         | 1     |
| 6          | Frank VP  | 1         | 1     |
| 3          | Carol Mgr | 2         | 2     |
| 7          | Grace Mgr | 6         | 2     |
| 4          | David Eng | 3         | 3     |
| 5          | Eve Eng   | 3         | 3     |
| 8          | Heidi Eng | 7         | 3     |
+------------+-----------+-----------+-------+
```

**Reflection:** This example demonstrates how recursive CTEs are perfect for traversing parent-child relationships. The `Level` column is a common addition to track depth. Notice there's no explicit `WHERE` termination condition in the recursive member's `WHERE` clause because the `JOIN` itself eventually stops producing new rows when there are no more subordinates.

---

### Example 3: Bill of Materials (Product Components)

**Problem:** For a given product, list all its sub-components, including their quantity and the level of nesting.

**What's Given:** A `Components` table:
`Components` table:
| ParentComponentID | ChildComponentID | Quantity |
| :---------------- | :--------------- | :------- |
| A                 | B                | 2        |
| A                 | C                | 1        |
| B                 | D                | 3        |
| B                 | E                | 1        |
| C                 | F                | 4        |
| D                 | G                | 2        |

We want to find all components for 'A'.

**What We Want:** A list of `ComponentID`, `Quantity` (at that specific level), `TotalQuantity` (cumulative from top), and `Level`.

**Step-by-Step Solution:**

1.  **Define the CTE:** `ProductBoM`.
    ```sql
    WITH RECURSIVE ProductBoM AS (
        -- ... anchor and recursive members ...
    )
    SELECT * FROM ProductBoM;
    ```

2.  **Formulate the Anchor Member:** Start with the top-level product ('A'). It has a quantity of 1 for itself and is at level 0.
    ```sql
    WITH RECURSIVE ProductBoM AS (
        SELECT
            c.ParentComponentID AS ComponentID, -- The top-level item
            c.ParentComponentID AS DirectParentID, -- For tracing
            1 AS Quantity, -- The top-level item itself has quantity 1
            1 AS TotalQuantity, -- Cumulative quantity from top
            0 AS Level
        FROM
            Components AS c
        WHERE
            c.ParentComponentID = 'A' -- Start with product 'A'
            -- We need to ensure 'A' is treated as the root,
            -- so we pick one of its entries, but conceptually 'A' is its own component.
            -- A more robust anchor might select 'A' from a separate Products table if available.
            -- For simplicity, we'll use 'A' from the Components table as a starting point.
            -- A better approach for the anchor is to get the distinct parent ID.
            GROUP BY c.ParentComponentID -- To get 'A' only once
    )
    SELECT * FROM ProductBoM;
    ```
    *Self-correction/Refinement:* The anchor needs to represent the *initial item* itself. If 'A' is the product, it's a component of itself with quantity 1.
    ```sql
    WITH RECURSIVE ProductBoM AS (
        SELECT
            'A' AS ComponentID, -- The starting product itself
            NULL AS DirectParentID, -- No parent for the root
            1 AS Quantity,        -- Quantity of the product itself is 1
            1 AS TotalQuantity,   -- Total quantity starting from root
            0 AS Level
        -- No FROM clause here, as we are defining the root directly
        UNION ALL
        -- ... recursive member ...
    )
    SELECT * FROM ProductBoM;
    ```
    *Explanation:* This anchor directly defines 'A' as the starting component with quantity 1, total quantity 1, and level 0. It's the "seed" for the recursion.

3.  **Formulate the Recursive Member:** Join `Components` with the `ProductBoM` CTE to find children. Calculate the `TotalQuantity` by multiplying `Quantity` at the current level with the `TotalQuantity` from the parent.
    ```sql
    WITH RECURSIVE ProductBoM AS (
        SELECT
            'A' AS ComponentID,
            CAST(NULL AS VARCHAR(10)) AS DirectParentID, -- Ensure type compatibility
            1 AS Quantity,
            1 AS TotalQuantity,
            0 AS Level
        UNION ALL
        SELECT
            c.ChildComponentID AS ComponentID,
            c.ParentComponentID AS DirectParentID,
            c.Quantity,
            p.TotalQuantity * c.Quantity AS TotalQuantity, -- Cumulative quantity
            p.Level + 1 AS Level
        FROM
            Components AS c
        JOIN
            ProductBoM AS p ON c.ParentComponentID = p.ComponentID -- Join with CTE
    )
    SELECT * FROM ProductBoM;
    ```
    *Explanation:*
    *   `UNION ALL`: Combines results.
    *   `SELECT c.ChildComponentID, ... p.Level + 1 AS Level`: Selects the child component's details, including its direct quantity, and increments the level.
    *   `p.TotalQuantity * c.Quantity AS TotalQuantity`: This is crucial for BoM. It calculates the cumulative quantity needed for each child by multiplying the parent's `TotalQuantity` (from the CTE) by the child's `Quantity` (from the `Components` table).
    *   `FROM Components AS c JOIN ProductBoM AS p ON c.ParentComponentID = p.ComponentID`: This joins the `Components` table with the `ProductBoM` CTE. For each component `p` found in the previous iteration of `ProductBoM`, it finds its direct children `c` from the `Components` table.

4.  **Execute the Full Query:**
    *   **Iteration 0 (Anchor):** `ProductBoM` gets `('A', NULL, 1, 1, 0)`.
    *   **Iteration 1 (Recursive):** Processes `p.ComponentID = 'A'`. Finds children 'B' (Qty 2) and 'C' (Qty 1).
        *   'B': `TotalQty = 1 * 2 = 2`, `Level = 0 + 1 = 1`.
        *   'C': `TotalQty = 1 * 1 = 1`, `Level = 0 + 1 = 1`.
        `ProductBoM` now contains `('A', NULL, 1, 1, 0), ('B', 'A', 2, 2, 1), ('C', 'A', 1, 1, 1)`.
    *   **Iteration 2 (Recursive):** Processes `p.ComponentID = 'B'` and `'C'`.
        *   For 'B': Finds children 'D' (Qty 3) and 'E' (Qty 1).
            *   'D': `TotalQty = 2 * 3 = 6`, `Level = 1 + 1 = 2`.
            *   'E': `TotalQty = 2 * 1 = 2`, `Level = 1 + 1 = 2`.
        *   For 'C': Finds child 'F' (Qty 4).
            *   'F': `TotalQty = 1 * 4 = 4`, `Level = 1 + 1 = 2`.
        `ProductBoM` now contains `... ('D', 'B', 3, 6, 2), ('E', 'B', 1, 2, 2), ('F', 'C', 4, 4, 2)`.
    *   **Iteration 3 (Recursive):** Processes `p.ComponentID = 'D'`, `'E'`, `'F'`.
        *   For 'D': Finds child 'G' (Qty 2).
            *   'G': `TotalQty = 6 * 2 = 12`, `Level = 2 + 1 = 3`.
        *   For 'E', 'F': No children.
        `ProductBoM` now contains `... ('G', 'D', 2, 12, 3)`.
    *   **Iteration 4 (Recursive):** Processes `p.ComponentID = 'G'`. No children. Recursion terminates.
    *   **Final Outer Query:** `SELECT * FROM ProductBoM` retrieves all collected rows.

**Final Answer:**
```text
+-------------+----------------+----------+---------------+-------+
| ComponentID | DirectParentID | Quantity | TotalQuantity | Level |
+-------------+----------------+----------+---------------+-------+
| A           | NULL           | 1        | 1             | 0     |
| B           | A              | 2        | 2             | 1     |
| C           | A              | 1        | 1             | 1     |
| D           | B              | 3        | 6             | 2     |
| E           | B              | 1        | 2             | 2     |
| F           | C              | 4        | 4             | 2     |
| G           | D              | 2        | 12            | 3     |
+-------------+----------------+----------+---------------+-------+
```

**Reflection:** This example demonstrates calculating cumulative values (`TotalQuantity`) during recursion, which is a common requirement in BoM or hierarchical aggregations. The key is multiplying the parent's `TotalQuantity` by the child's `Quantity` at each step.

---

### Example 4: Simple Pathfinding (Reachable Cells on a Grid)

**Problem:** Given a starting cell (X, Y) on a 5x5 grid, find all reachable cells. Assume no obstacles, but we can only move horizontally or vertically (not diagonally), and we cannot visit the same cell twice.

**What's Given:** A 5x5 grid (implicitly, coordinates 0-4 for X and Y) and a starting cell (e.g., (0,0)).
**What We Want:** A list of all unique (X, Y) coordinates reachable from the starting cell.

**Step-by-Step Solution:**

1.  **Define the CTE:** `ReachableCells`.
    ```sql
    WITH RECURSIVE ReachableCells AS (
        -- ... anchor and recursive members ...
    )
    SELECT * FROM ReachableCells;
    ```

2.  **Formulate the Anchor Member:** Start at the given (0,0) coordinate.
    ```sql
    WITH RECURSIVE ReachableCells AS (
        SELECT
            0 AS X, -- Starting X coordinate
            0 AS Y  -- Starting Y coordinate
    )
    SELECT * FROM ReachableCells;
    ```
    *Explanation:* This sets the initial position as the first row in `ReachableCells`.

3.  **Formulate the Recursive Member:** This is the tricky part. For each cell in the `ReachableCells` CTE, we need to generate its four possible neighbors (up, down, left, right). We must also ensure these neighbors are within the 5x5 grid bounds (0-4) and haven't been visited before to prevent cycles and infinite loops.

    ```sql
    WITH RECURSIVE ReachableCells AS (
        SELECT
            0 AS X,
            0 AS Y
        UNION ALL
        SELECT
            next_x,
            next_y
        FROM (
            -- Generate all 4 possible next moves from current cells
            SELECT r.X + 1 AS next_x, r.Y AS next_y FROM ReachableCells AS r
            UNION ALL
            SELECT r.X - 1 AS next_x, r.Y AS next_y FROM ReachableCells AS r
            UNION ALL
            SELECT r.X AS next_x, r.Y + 1 AS next_y FROM ReachableCells AS r
            UNION ALL
            SELECT r.X AS next_x, r.Y - 1 AS next_y FROM ReachableCells AS r
        ) AS potential_moves
        WHERE
            next_x >= 0 AND next_x < 5 AND -- X-coordinate within bounds (0 to 4)
            next_y >= 0 AND next_y < 5 AND -- Y-coordinate within bounds (0 to 4)
            NOT EXISTS ( -- Crucial: Don't revisit already reached cells
                SELECT 1
                FROM ReachableCells
                WHERE X = potential_moves.next_x AND Y = potential_moves.next_y
            )
    )
    SELECT X, Y FROM ReachableCells ORDER BY X, Y;
    ```
    *Explanation:*
    *   The inner `(SELECT ... UNION ALL SELECT ...)` block generates all four potential moves (up, down, left, right) from *each* cell currently in `ReachableCells`.
    *   `next_x >= 0 AND next_x < 5 AND next_y >= 0 AND next_y < 5`: This `WHERE` clause filters out moves that go outside the 5x5 grid boundaries.
    *   `NOT EXISTS (SELECT 1 FROM ReachableCells WHERE X = potential_moves.next_x AND Y = potential_moves.next_y)`: This is the critical termination condition and cycle prevention mechanism. It ensures that a cell is only added to `ReachableCells` if it hasn't been added in a *previous iteration*. If we allowed revisiting, the query would loop infinitely between two cells (e.g., (0,0) -> (0,1) -> (0,0) -> ...).

4.  **Execute the Full Query:**
    *   **Iteration 0 (Anchor):** `ReachableCells` gets `(0,0)`.
    *   **Iteration 1 (Recursive):** Processes `(0,0)`. Potential moves: `(1,0), (-1,0), (0,1), (0,-1)`.
        *   `(-1,0)` and `(0,-1)` are out of bounds.
        *   `(1,0)` and `(0,1)` are in bounds and not in `ReachableCells`.
        `ReachableCells` now contains `(0,0), (1,0), (0,1)`.
    *   **Iteration 2 (Recursive):** Processes `(1,0)` and `(0,1)`.
        *   From `(1,0)`: Potential moves `(2,0), (0,0), (1,1), (1,-1)`. Valid new ones: `(2,0), (1,1)`.
        *   From `(0,1)`: Potential moves `(1,1), (-1,1), (0,2), (0,0)`. Valid new ones: `(0,2)`. (Note: `(1,1)` is already generated from `(1,0)` in this *same* iteration, but `UNION ALL` will include it. The `NOT EXISTS` will filter it out if it was already in `ReachableCells` from a *previous* iteration).
        After filtering by `NOT EXISTS` and bounds, `ReachableCells` adds `(2,0), (1,1), (0,2)`.
        `ReachableCells` now contains `(0,0), (1,0), (0,1), (2,0), (1,1), (0,2)`.
    *   ... This continues until all cells in the 5x5 grid are visited.
    *   **Final Outer Query:** `SELECT X, Y FROM ReachableCells ORDER BY X, Y` retrieves all unique (X,Y) pairs.

**Final Answer (partial for brevity, as it's a 5x5 grid = 25 cells):**
```text
+---+---+
| X | Y |
+---+---+
| 0 | 0 |
| 0 | 1 |
| 0 | 2 |
| 0 | 3 |
| 0 | 4 |
| 1 | 0 |
| 1 | 1 |
| 1 | 2 |
| 1 | 3 |
| 1 | 4 |
| 2 | 0 |
| 2 | 1 |
| 2 | 2 |
| 2 | 3 |
| 2 | 4 |
| 3 | 0 |
| 3 | 1 |
| 3 | 2 |
| 3 | 3 |
| 3 | 4 |
| 4 | 0 |
| 4 | 1 |
| 4 | 2 |
| 4 | 3 |
| 4 | 4 |
+---+---+
```

**Reflection:** This example is significantly more complex due to the need for multiple potential moves from each cell and, critically, the `NOT EXISTS` clause to prevent revisiting cells and thus terminate the recursion for a finite graph. Without `NOT EXISTS`, this would be an infinite loop. This pattern is fundamental for graph traversal.

## 6. Common mistakes and traps

1.  **Infinite Loop:** The most common and severe mistake. Occurs when the recursive member lacks a proper termination condition in its `WHERE` clause, or the condition is flawed and never met. The CTE will keep generating rows until system resources are exhausted.
2.  **Missing `RECURSIVE` Keyword:** Forgetting to include `RECURSIVE` after `WITH` will result in a syntax error, as the database won't recognize the self-reference in the recursive member.
3.  **Incorrect `UNION` vs. `UNION ALL`:** Using `UNION` instead of `UNION ALL` can lead to incorrect or incomplete results. `UNION` removes duplicates, which might be necessary for the recursive process to continue or for the final result set to be complete. Always use `UNION ALL` unless you explicitly intend to deduplicate *all* rows across iterations.
4.  **Column Mismatch:** The `SELECT` list in the anchor member and the recursive member must have the same number of columns, and their data types must be compatible (or implicitly convertible). Mismatches will cause a syntax error.
5.  **Performance Issues on Large Datasets/Deep Recursion:** Recursive CTEs can be resource-intensive. If the hierarchy is very deep or the number of rows generated per iteration is large, performance can degrade significantly. Incorrect indexing or inefficient join conditions within the recursive member exacerbate this.
6.  **Misunderstanding Scope of CTE:** A CTE (recursive or not) is only visible to the single `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement that immediately follows it. You cannot define a CTE and then use it in multiple separate queries.

## 7. Textbook-precise explanation

A Common Table Expression (CTE) defined with the `WITH` clause, when augmented with the `RECURSIVE` keyword, allows for the definition of a temporary result set that can refer to itself. This capability is standardized in SQL:1999 and is widely supported across modern relational database management systems (RDBMS) such as PostgreSQL, SQL Server, MySQL (8.0+), Oracle, and SQLite.

Formally, a recursive CTE, denoted as $R$, is defined by two primary components: an **anchor member** and a **recursive member**, combined by a `UNION ALL` operator.

Let $R$ be the name of the recursive CTE, and let $C_1, C_2, \ldots, C_k$ be the column names of $R$. The general structure is:

$$
\text{WITH RECURSIVE } R(C_1, C_2, \ldots, C_k) \text{ AS } \\
( \\
\quad \text{Anchor\_Member} \\
\quad \text{UNION ALL} \\
\quad \text{Recursive\_Member} \\
) \\
\text{Outer\_Query}
$$

1.  **Anchor Member ($A$):** This is a non-recursive `SELECT` statement that provides the initial set of rows for the CTE. It must not refer to $R$ itself. The schema (number and types of columns) of the anchor member defines the schema of the recursive CTE $R$.

    $$
    A \equiv \text{SELECT } \text{expr}_1, \text{expr}_2, \ldots, \text{expr}_k \\
    \quad \quad \text{FROM } \text{base\_tables} \\
    \quad \quad \text{WHERE } \text{initial\_conditions}
    $$

2.  **Recursive Member ($M$):** This is a `SELECT` statement that refers to the CTE $R$ in its `FROM` clause. It processes the rows generated by the previous iteration of the CTE (initially, the rows from the anchor member) and generates new rows. The column list of the recursive member must match the anchor member in terms of number of columns and compatible data types. It *must* include a termination condition in its `WHERE` clause to prevent infinite loops.

    $$
    M \equiv \text{SELECT } \text{expr}'_1, \text{expr}'_2, \ldots, \text{expr}'_k \\
    \quad \quad \text{FROM } R \text{ [JOIN other\_tables ON join\_conditions]} \\
    \quad \quad \text{WHERE } \text{termination\_conditions}
    $$

3.  **`UNION ALL` Operator:** This operator combines the result sets of the anchor and recursive members. It is critical that `UNION ALL` is used, as `UNION` (which removes duplicates) can prematurely terminate the recursion or alter the intended result set.

**Execution Semantics:**

The RDBMS processes a recursive CTE iteratively:

1.  **Initialization:** The result set of the anchor member ($A$) is computed. This set becomes the initial content of $R$ for the current iteration, let's call it $R_0$. The overall final result set, $S$, is initialized with $R_0$.
    $$ S \leftarrow R_0 \leftarrow A $$

2.  **Iteration:** For $i = 0, 1, 2, \ldots$, as long as $R_i$ (the result from the *previous* iteration of the recursive member) is not empty:
    a.  The recursive member ($M$) is executed, treating $R_i$ as the content of $R$. This produces a new set of rows, $R_{i+1}$.
        $$ R_{i+1} \leftarrow M(\text{using } R_i \text{ for } R) $$
    b.  The newly generated rows ($R_{i+1}$) are added to the overall final result set $S$.
        $$ S \leftarrow S \cup_{\text{ALL}} R_{i+1} $$

3.  **Termination:** The iteration stops when the recursive member ($M$) produces an empty set of rows ($R_{i+1} = \emptyset$). This typically occurs due to the `WHERE` clause in the recursive member, which acts as the termination condition.

4.  **Final Result:** Once the recursion terminates, the `Outer_Query` is executed against the complete accumulated result set $S$.

**References:**
*   Celko, J. (2014). *SQL for Smarties: Advanced SQL Programming*. Morgan Kaufmann. (Chapter on Hierarchies and Recursive Queries)
*   Date, C.J. (2003). *An Introduction to Database Systems* (8th ed.). Addison-Wesley. (Covers SQL:1999 features including recursive CTEs).

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the flow of a recursive CTE:

```text
+-------------------------------------------------------------+
|                                                             |
|  WITH RECURSIVE MyCTE AS (                                  |
|                                                             |
|    +---------------------+                                  |
|    |                     |                                  |
|    |  ANCHOR MEMBER      | <--- (Initial Query)             |
|    |  (Base Case)        |                                  |
|    +----------+----------+                                  |
|               |                                             |
|               |  (Provides T0: Initial set of rows)         |
|               V                                             |
|    +----------+----------+                                  |
|    |                     |                                  |
|    |  UNION ALL          | <--- (Combines results)          |
|    |                     |                                  |
|    +----------+----------+                                  |
|               |                                             |
|               |  (Accumulated results so far)               |
|               V                                             |
|    +----------+----------+                                  |
|    |                     |                                  |
|    |  RECURSIVE MEMBER   | <---+ (References MyCTE itself)  |
|    |  (Recursive Step)   |     |                            |
|    |  (WITH TERMINATION  |     | (Processes T_i to produce T_i+1)
|    |   CONDITION)        |     |                            |
|    +----------+----------+     |                            |
|               |                  |                            |
|               |  (New rows T_i+1)|                            |
|               +------------------+ (Loop continues as long as T_i+1 is not empty)
|               |                                             |
|               |  (Final accumulated result set)             |
|               V                                             |
|  ) -- End of CTE definition                                 |
|                                                             |
|  SELECT ...                                                 |
|  FROM MyCTE                                                 | <--- (Outer Query uses the final result)
|  WHERE ...                                                  |
|  ORDER BY ...                                               |
|                                                             |
+-------------------------------------------------------------+
```

This diagram shows the sequential and iterative nature. The anchor member runs once to provide the initial data. The recursive member then repeatedly processes the *current* state of `MyCTE` (which includes all rows generated so far) to find *new* rows. `UNION ALL` continuously adds these new rows to `MyCTE`. The loop continues until the recursive member's query returns no new rows, usually due to a `WHERE` clause in the recursive member. Finally, the outer `SELECT` statement queries the complete, accumulated result set of `MyCTE`.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    Think of a **R.A.T.** climbing a **T**ree.
    *   **R** - `RECURSIVE` keyword is essential.
    *   **A** - **A**nchor Member: The starting point, the root of the tree.
    *   **T** - **T**ermination Condition: The `WHERE` clause in the recursive part that stops the R.A.T. from climbing forever (or falling off the tree).
    *   The climbing itself is the **Recursive Member** (R.A.T. keeps climbing branches).
    *   The `UNION ALL` is like the sticky sap on the tree, collecting all the branches the R.A.T. has visited.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Syntax Skeleton:**
        `WITH RECURSIVE cte_name AS ( anchor_member UNION ALL recursive_member ) SELECT ... FROM cte_name;`
    *   **Anchor Member:** The non-recursive base case. It provides the initial rows.
    *   **Recursive Member:** Refers to `cte_name` in its `FROM` clause. **MUST** contain a `WHERE` clause for termination, or it will loop infinitely.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this lesson, write a simple number sequence CTE.
    *   **Day 3:** Implement an employee hierarchy CTE.
    *   **Day 7:** Implement a Bill of Materials CTE.
    *   **Day 16:** Implement a pathfinding/graph traversal CTE.
    *   **Day 35:** Attempt a complex problem requiring a recursive CTE, possibly combining it with other SQL features (e.g., aggregating results from a hierarchy).

4.  **First-Principles Re-derivation Pathway:**
    If you forget the exact syntax or logic, think about how you would solve a hierarchical problem *manually* or with a simple loop in a programming language:
    *   **Step 1 (Anchor):** How do you start? You pick the initial item(s) (e.g., the CEO, the main product, the starting grid cell). This is your base case.
    *   **Step 2 (Loop/Recursion):** How do you get to the next level? For each item you *just found*, find its direct children/neighbors. This is your recursive step.
    *   **Step 3 (Collection):** How do you keep track of *all* items found so far? You add the new items to your growing list. This is `UNION ALL`.
    *   **Step 4 (Termination):** How do you know when to stop? When your "find direct children/neighbors" step yields no new items, or when a certain depth/condition is met. This is your `WHERE` clause in the recursive member.
    This thought process naturally leads you to the anchor, recursive, `UNION ALL`, and termination components of a recursive CTE.

## 10. Connections — what this leads to

Understanding recursive CTEs is a gateway to several more advanced concepts and specialized database technologies:

*   **Graph Databases:** Recursive CTEs provide a limited, SQL-based way to perform graph traversal. For truly complex graph analytics (e.g., finding shortest paths with weights, community detection, complex pattern matching), you'll encounter specialized graph databases like Neo4j, ArangoDB, or Amazon Neptune, which offer more intuitive query languages (like Cypher or Gremlin) and optimized storage for graph structures.
*   **Tree Structures and Hierarchical Data Processing:** Beyond simple parent-child relationships, recursive CTEs are fundamental for working with any tree-like data (e.g., file systems, XML/JSON document structures, organizational charts, category taxonomies). This understanding is crucial in data warehousing, data modeling, and ETL (Extract, Transform, Load) processes.
*   **Advanced SQL Optimization:** Knowing how recursive CTEs execute iteratively helps in writing more efficient queries. You learn to optimize the anchor and recursive members, ensure proper indexing on join columns, and understand the performance implications of deep recursion.
*   **Declarative vs. Procedural Programming:** Recursive CTEs bridge the gap between SQL's declarative nature (describing *what* you want) and the procedural, iterative logic often found in traditional programming languages. It shows how complex algorithms can be expressed within a declarative framework.
*   **Data Warehousing and OLAP:** In data warehouses, hierarchies are common (e.g., time hierarchies, product hierarchies). Recursive CTEs can be used to generate these hierarchies, perform hierarchical aggregations, or pre-calculate roll-up values.
*   **Formal Language Theory and Automata:** The iterative nature of recursive CTEs has parallels with concepts in formal language theory, such as pushdown automata processing context-free grammars, or the evaluation of recursive definitions in logic programming.

## 11. Self-check questions

1.  **Easy:** Write a recursive CTE to generate all odd numbers from 1 to 11.
2.  **Medium:** Given a table `Parts (PartID, SubPartID)`, write a recursive CTE to find all direct and indirect sub-parts of 'Engine' (assuming 'Engine' is a `PartID