## What it is
A recursive Common Table Expression (CTE) is a SQL query structure, using the `WITH` clause, that refers to itself. This allows you to traverse hierarchical or graph-like data, such as an organizational chart or a bill of materials, by repeatedly applying a query step to the result of the previous step until no more rows are found. It consists of an "anchor" query that provides the starting set, and a "recursive" query that expands upon it.

## Why it matters
Recursive CTEs are the standard SQL way to handle tree and graph traversal problems, which appear constantly. In aerospace, you would use this to model a "bill of materials" for a rocket, calculating all sub-components required for a given assembly. In computer science, it's used for parsing dependency graphs (e.g., build systems, package managers) or traversing file systems. In physics simulations, it could model a particle decay chain, tracing a particle's lineage through successive transformations.

## When to study it
You must be comfortable with the following before tackling this. If you are not, stop and review them.
*   Standard SQL: `SELECT`, `FROM`, `WHERE`, `GROUP BY`.
*   `JOIN`s: `INNER JOIN` and `LEFT JOIN` are essential.
*   Non-recursive CTEs: You must understand the syntax and purpose of a basic `WITH` clause.
*   `UNION ALL`: You need to know how this set operator combines results from two queries.
*   The concept of recursion from programming (a function that calls itself with a base case and a recursive step).

## How to study it (step by step)
1.  **Master the Syntax:** Write down the canonical structure of a recursive CTE. Identify the three key parts: the anchor member, the `UNION ALL` operator, and the recursive member. Do not proceed until you can write this structure from memory.
2.  **Build a Counter:** The simplest recursive CTE is one that generates a sequence of numbers. Write a query that starts with the number 1 (the anchor) and adds 1 in each recursive step, stopping at 10. This isolates the recursive mechanism from complex data.
3.  **Model a Hierarchy:** Create a simple `employees` table with `id`, `name`, and `manager_id`. Populate it with 5-7 rows representing a simple org chart. This gives you a concrete dataset to work with.
4.  **Trace a Path Down:** Using your `employees` table, write a query to find all employees who report, directly or indirectly, to a specific manager. Verbally explain to yourself how the anchor finds the direct reports and how each recursive step finds the *next* level of reports.
5.  **Trace a Path Up:** Modify the previous query to find all managers in the chain of command *above* a specific employee, all the way to the CEO. This inverts the join logic and solidifies your understanding.
6.  **Add a Level Counter:** Augment your hierarchy query to include a column that tracks the recursion depth (e.g., `Level 0` for the starting person, `Level 1` for their direct reports/manager, etc.). This is a common and powerful pattern.

## Key ideas, with intuition
1.  **Anchor + Recurse = Loop:** A recursive CTE is SQL's declarative way of writing a loop. The query is not truly "recursive" in the sense of a function call stack. Instead, the database engine materializes the results iteratively.
    *   **Anchor Member:** This is the initialization step of your loop. It runs *once* and establishes the starting data set ($R_0$). Think of it as `i = 0`.
    *   **Recursive Member:** This is the body of the loop. In iteration $k$, it takes the result from the previous step ($R_{k-1}$) as input and produces a new set of results ($R_k$). It continues as long as this step produces new rows. Think of it as `i++`.

2.  **The Self-Join is Key:** The recursive member *must* contain a `JOIN` between the source table and the CTE's own name. This is the core of the recursion. It says, "For each row we found in the last step, go back to the original table and find all related rows."
    $$
    \text{Recursive Step: } R_k = \text{SourceTable} \bowtie R_{k-1}
    $$
    This is the inductive step. If you know the set of nodes at level $k-1$, you can find the set of nodes at level $k$.

3.  **Termination is Implicit:** The recursion stops automatically when the recursive member returns an empty set. There is no explicit `STOP` or `BREAK` command. If your join condition in the recursive member is structured correctly for a finite hierarchy (e.g., `JOIN CteName ON Child.ManagerID = CteName.EmployeeID`), it will naturally stop when it reaches the bottom of the hierarchy, as there will be no more children to find. An incorrect condition can lead to an infinite loop, which most databases will kill after a default maximum recursion depth is reached (e.g., 100).

## Worked example
Let's find the entire organizational hierarchy starting from the CEO.

**Table:** `Employees`

| EmployeeID | Name    | ManagerID |
| :--------- | :------ | :-------- |
| 1          | Alice   | NULL      |
| 2          | Bob     | 1         |
| 3          | Charlie | 1         |
| 4          | David   | 2         |
| 5          | Eve     | 3         |

**Query:**
```sql
WITH RECURSIVE OrgChart (EmployeeID, Name, ManagerID, Level) AS (
    -- Anchor Member: Find the top-level employee (the CEO)
    SELECT
        EmployeeID,
        Name,
        ManagerID,
        0 AS Level
    FROM
        Employees
    WHERE
        ManagerID IS NULL

    UNION ALL

    -- Recursive Member: Find employees who report to someone already in the OrgChart
    SELECT
        e.EmployeeID,
        e.Name,
        e.ManagerID,
        oc.Level + 1
    FROM
        Employees e
    JOIN
        OrgChart oc ON e.ManagerID = oc.EmployeeID
)
-- Final Select: Get all results from the CTE
SELECT * FROM OrgChart;
```

**Step-by-step execution:**

1.  **Anchor Execution ($R_0$):** The first `SELECT` runs. It finds employees where `ManagerID IS NULL`. This returns one row: `(1, 'Alice', NULL, 0)`. This is our initial result set, $R_0$.

2.  **First Recursive Step ($R_1$):** The second `SELECT` runs. It joins `Employees` (`e`) with the result from the previous step, `OrgChart` (`oc`), which is currently just Alice's record. The join condition is `e.ManagerID = oc.EmployeeID`.
    *   It looks for employees `e` where `e.ManagerID = 1`.
    *   It finds Bob and Charlie.
    *   It returns two new rows: `(2, 'Bob', 1, 1)` and `(3, 'Charlie', 1, 1)`. These results are `UNION ALL`'d with the anchor result. The working set for the *next* step is now just these two rows.

3.  **Second Recursive Step ($R_2$):** The second `SELECT` runs again. It joins `Employees` (`e`) with the results from the *previous step* ($R_1$), which contains Bob and Charlie.
    *   It looks for employees `e` where `e.ManagerID = 2` (Bob) -> finds David.
    *   It looks for employees `e` where `e.ManagerID = 3` (Charlie) -> finds Eve.
    *   It returns two new rows: `(4, 'David', 2, 2)` and `(5, 'Eve', 3, 2)`.

4.  **Third Recursive Step ($R_3$):** The second `SELECT` runs again, using David and Eve's records from $R_2$ as the input.
    *   It looks for employees `e` where `e.ManagerID = 4` (David) -> finds none.
    *   It looks for employees `e` where `e.ManagerID = 5` (Eve) -> finds none.
    *   The recursive member returns an empty set.

5.  **Termination:** Since the last step returned no rows, the recursion stops.

6.  **Final `SELECT`:** The `SELECT * FROM OrgChart` returns the combined results of all steps.

**Reflection:** The anchor established the starting point (CEO). Each recursive step took the employees found in the *prior* step and used them to find the next level of direct reports in the main `Employees` table. The `Level` counter correctly tracks the depth because we add 1 at each step.

## Diagrams
Here is the hierarchy from the example. The query execution explores this tree level by level.

```text
       Level 0:  Alice (1)
                 /       \
                /         \
       Level 1: Bob (2)   Charlie (3)
                |           |
                |           |
       Level 2: David (4)  Eve (5)

Query Execution Flow:
R_0 -> finds node (1)
R_1 -> uses (1) to find (2) and (3)
R_2 -> uses (2, 3) to find (4) and (5)
R_3 -> uses (4, 5) to find nothing. STOP.
```

## Memory technique — remember this forever
1.  **The Story: "The Ancestor Search"**
    Imagine you're building a family tree. A recursive CTE works exactly like this:
    *   **Anchor:** You start with yourself. `SELECT * FROM People WHERE Name = 'Me'`.
    *   **Recursive Step:** To find your parents, you look for people whose child ID matches your ID. `JOIN People ON People.ChildID = My.ID`.
    *   **The Loop:** You then take your parents' records and do the *exact same search* to find *their* parents (your grandparents). You repeat this "find the parents of the last people you found" process until you reach ancestors for whom no parents are listed in your data. That's the recursive CTE.

2.  **Overlearn This Syntax:** Burn this structure into your memory. It is the invariant pattern.

    ```sql
    WITH RECURSIVE CteName (column_list) AS (
        -- Anchor Member (Base Case)
        SELECT ... FROM ... WHERE ...
        UNION ALL
        -- Recursive Member (Inductive Step)
        SELECT ... FROM SourceTable JOIN CteName ON ...
    )
    SELECT * FROM CteName;
    ```

3.  **Spaced Repetition Schedule:**
    *   Review this note and re-do the worked example in 1 day.
    *   Re-do the example and try the first self-check question in 3 days.
    *   Re-do the example from memory and try the second self-check question in 7 days.
    *   Do the third self-check question in 16 days.
    *   Invent a new hierarchical problem and solve it in 35 days.

4.  **First Principles Pathway:** If you forget the syntax, rebuild it from logic.
    *   "I need to query something iteratively." This means I need a starting point and a repeating step.
    *   The starting point is a simple `SELECT`. That's the **anchor**.
    *   The repeating step needs to combine its results with the start. That's `UNION ALL`.
    *   The repeating step needs to build upon the previous result. So, it must `SELECT` from the source table but `JOIN` onto *the name of the query I am building*. That's the **recursive member**.
    *   This whole temporary, self-referential structure needs a name. That's the `WITH RECURSIVE CteName AS (...)`.

## Common mistakes
1.  **Infinite Loops:** Creating a join condition in the recursive member that doesn't lead to termination. For example, in a cyclical graph, you must add a condition to track visited nodes and avoid re-visiting them, or the query will loop forever (until the database kills it).
2.  **Using `UNION` instead of `UNION ALL`:** `UNION` removes duplicate rows. In a recursive query, this is computationally expensive and almost always incorrect. It can subtly hide bugs and break queries where paths are supposed to merge and be counted separately. Always default to `UNION ALL`.
3.  **Incorrect Recursive Join:** The join in the recursive member must be between the *base table* and the *CTE itself*. A common error is trying to join the CTE to itself, which doesn't expand the search into the original data. `FROM SourceTable JOIN CteName` is the correct pattern.
4.  **Forgetting the `RECURSIVE` Keyword:** Some SQL dialects (like PostgreSQL and MySQL 8+) require the `RECURSIVE` keyword after `WITH`. SQL Server does not. Forgetting it on a compliant database will result in a syntax error.

## Self-check
1.  Write a recursive CTE that generates a list of all even numbers from 2 to 20.
2.  You have a `components` table (`id`, `name`) and a `bill_of_materials` table (`assembly_id`, `part_id`, `quantity`). `assembly_id` and `part_id` are both foreign keys to `components.id`. Write a query that, for a given top-level assembly (e.g., a 'Rocket Engine'), finds all sub-components required to build it, at all levels of nesting.
3.  Given a table of directed flights (`origin_code`, `destination_code`), find if a path exists from 'LAX' to 'LHR' with a maximum of 4 stops. Your query should output the full path as a string (e.g., 'LAX -> DEN -> JFK -> LHR') and the number of stops for each valid route found.