## 1. What it is — in plain English

Imagine you're trying to make the most money possible from selling lemonade, but you have limits: only so much sugar, so many lemons, and only so much time to squeeze. You want to figure out the *best recipe* and *how much lemonade to make* to maximize your profit, given all these restrictions.

"Linear programming" is a fancy name for a mathematical technique that helps you find the absolute best way to do something when all your goals and all your restrictions can be described using simple straight-line relationships. "Linear" means everything is proportional – if you double the lemons, you double the cost, for example. "Programming" here doesn't mean computer code, but rather "planning" or "scheduling."

The "simplex method" is a specific, step-by-step recipe for solving these linear programming problems. Think of it like a systematic way to explore all the possible good plans you could make. It's incredibly clever because instead of checking every single possible plan (which could be infinite!), it only checks the "corner points" of your feasible options, because mathematically, the best solution always lies at one of these corners.

So, in short, the simplex method is an algorithm that efficiently finds the optimal solution (maximum profit, minimum cost, etc.) for problems where you have a clear objective and a set of linear constraints. It's like finding the highest peak in a mountain range by always walking uphill along the ridges, knowing that the peak must be at a junction of ridges.

## 2. Why it matters — real-world applications

Linear programming, and the simplex method as its primary solver, is one of the most widely used optimization techniques across countless industries. Its ability to find optimal resource allocation under constraints makes it invaluable.

1.  **Manufacturing and Production Planning (e.g., Boeing, Intel):** Companies like Boeing use linear programming to optimize their production schedules for aircraft. They need to decide how many of each plane model to build, given limitations on labor hours, raw materials (aluminum, composites), machine availability, and assembly line capacity, all while aiming to maximize profit or minimize production costs. Intel uses it for silicon wafer fabrication, determining which products to make on which machines to meet demand and maximize yield.

2.  **Logistics and Supply Chain Optimization (e.g., Amazon, FedEx):** Amazon uses linear programming to decide where to place its fulfillment centers, how to route delivery trucks, and how to allocate inventory across its vast network to minimize shipping costs and delivery times. FedEx similarly optimizes flight schedules, package sorting, and last-mile delivery routes to ensure timely and cost-effective service, dealing with constraints like fuel capacity, driver hours, and vehicle availability.

3.  **Finance and Portfolio Optimization (e.g., Investment Banks, Hedge Funds):** Financial institutions use linear programming to construct investment portfolios. An investor might want to maximize the expected return of their portfolio while adhering to constraints on risk tolerance, diversification requirements (e.g., no more than 10% in a single stock), minimum investment amounts, and regulatory limits. This helps manage risk and optimize returns.

4.  **Healthcare Resource Management (e.g., Hospitals, Public Health Agencies):** Hospitals can use linear programming to optimize the scheduling of nurses, doctors, and operating rooms to minimize wait times, maximize patient throughput, and reduce costs, all while ensuring adequate staffing levels and resource availability. Public health agencies might use it to allocate vaccines or medical supplies during an epidemic, ensuring equitable distribution under supply constraints.

5.  **Machine Learning and Physics (Foundational Understanding):** While not directly used as the primary solver for complex modern ML models, the principles of linear programming are foundational. Many optimization problems in ML, especially those involving convex optimization (like Support Vector Machines, which can be formulated as quadratic programs, a generalization of LPs), draw heavily from the concepts developed for linear programming. In physics, while not a direct application for fundamental laws, experimental physicists at institutions like CERN or NASA might use LP for resource allocation in complex experiments (e.g., optimizing power distribution to detectors, scheduling data transfers from space probes given bandwidth limits) or for certain types of data analysis where resource constraints are present.

## 3. Prerequisites — what you must know first

Before diving into the simplex method, ensure you have a solid grasp of these fundamental mathematical concepts:

*   **Basic Algebra:** Proficiency in solving linear equations, manipulating inequalities, and working with systems of equations.
*   **Graphing Linear Equations and Inequalities:** Ability to plot lines, identify regions defined by inequalities, and understand concepts like feasible regions and vertices in 2D.
*   **Systems of Linear Equations:** Methods for solving systems of equations (e.g., substitution, elimination, Gaussian elimination), understanding concepts of unique solutions, no solutions, and infinitely many solutions.
*   **Vectors and Matrices:** Basic matrix operations (addition, multiplication), understanding of matrix inverses, identity matrices, and how to represent systems of linear equations in matrix form ($Ax=b$).
*   **Convex Sets:** An intuitive understanding that a convex set is one where, for any two points within the set, the entire line segment connecting them is also within the set. This is crucial for understanding why the optimal solution lies at a vertex.

## 4. The core idea — step by step

The simplex method is an iterative algorithm that moves from one "corner point" (vertex) of the feasible region to an adjacent, better corner point, until no further improvement is possible. Let's break down the core ideas.

### Step 1: Formulating the Problem

*   **Plain English:** The first step is to translate your real-world problem into a clear mathematical model. What exactly are you trying to achieve (maximize profit, minimize cost)? What are the rules or limitations you have to follow?
*   **Small Concrete Example:** A company makes two products, Product A and Product B.
    *   Each unit of A sells for \$3 profit.
    *   Each unit of B sells for \$5 profit.
    *   Making A requires 1 hour of labor and 0.5 units of raw material.
    *   Making B requires 2 hours of labor and 1 unit of raw material.
    *   Total labor available: 100 hours.
    *   Total raw material available: 60 units.
    *   We want to maximize profit.
*   **Formal/Mathematical Version:**
    Let $x_1$ be the number of units of Product A.
    Let $x_2$ be the number of units of Product B.

    **Objective Function (what to maximize/minimize):**
    Maximize $Z = 3x_1 + 5x_2$

    **Constraints (the rules/limits):**
    $1x_1 + 2x_2 \le 100$ (Labor constraint)
    $0.5x_1 + 1x_2 \le 60$ (Raw material constraint)
    $x_1 \ge 0, x_2 \ge 0$ (Non-negativity constraints, you can't make negative products)

    In general, a Linear Program (LP) is stated as:
    Maximize $Z = \sum_{j=1}^n c_j x_j$
    Subject to $\sum_{j=1}^n a_{ij} x_j \le b_i$ for $i=1, \dots, m$
    And $x_j \ge 0$ for $j=1, \dots, n$
    Or in matrix form:
    $$ \text{Maximize } \mathbf{c}^T \mathbf{x} $$
    $$ \text{Subject to } A\mathbf{x} \le \mathbf{b} $$
    $$ \mathbf{x} \ge \mathbf{0} $$
*   **What could go wrong:** Incorrectly defining the objective function (e.g., minimizing when you should maximize), misinterpreting the constraints (e.g., using a greater-than-or-equal sign when it should be less-than-or-equal).

### Step 2: Converting to Standard Form

*   **Plain English:** The simplex method works best when all constraints are equalities and all variables are non-negative. We achieve this by introducing "slack" or "surplus" variables. If a constraint says "less than or equal to," we add a "slack" variable to make it an exact equality. This slack variable represents the unused amount of that resource.
*   **Small Concrete Example:** Using the previous example:
    $x_1 + 2x_2 \le 100$ (Labor)
    $0.5x_1 + x_2 \le 60$ (Raw material)

    We introduce slack variables $s_1$ and $s_2$:
    $x_1 + 2x_2 + s_1 = 100$ (Here $s_1$ is unused labor hours)
    $0.5x_1 + x_2 + s_2 = 60$ (Here $s_2$ is unused raw material units)
    All variables ($x_1, x_2, s_1, s_2$) must be $\ge 0$.
*   **Formal/Mathematical Version:**
    The standard form for a maximization problem is:
    $$ \text{Maximize } Z = \mathbf{c}^T \mathbf{x} $$
    $$ \text{Subject to } A\mathbf{x} = \mathbf{b} $$
    $$ \mathbf{x} \ge \mathbf{0} $$
    Where $\mathbf{x}$ now includes the original decision variables and the slack/surplus variables. Each $b_i$ must be non-negative. If a constraint is $\ge$, we subtract a "surplus" variable. If a variable can be negative, we replace it with the difference of two non-negative variables ($x_j = x_j' - x_j''$, where $x_j', x_j'' \ge 0$).
*   **What could go wrong:** Forgetting to ensure all $b_i$ values are non-negative (multiply by -1 if needed), incorrectly handling equality constraints (no slack/surplus needed), or misapplying slack/surplus variables for $\ge$ constraints.

### Step 3: Basic Feasible Solutions (BFS) and Vertices

*   **Plain English:** Imagine the feasible region (the area where all your constraints are met) as a multi-sided shape (a polyhedron). The optimal solution will always be at one of the "corners" of this shape. The simplex method works by systematically moving from one corner to an adjacent, better corner. These corners are called "Basic Feasible Solutions."
*   **Small Concrete Example:** For our two-variable problem (before adding slack variables), if you graph the constraints, you'd get a polygon. The corners of this polygon are the BFS.
    *   (0,0) - No products, no profit.
    *   (0,50) - Only Product B, 50 units.
    *   (60,0) - Only Product A, 60 units.
    *   Another corner where the lines $x_1+2x_2=100$ and $0.5x_1+x_2=60$ intersect. (Actually, these lines are parallel so the feasible region is a triangle with corners (0,0), (0,50), (100,0) - assuming the second constraint is $0.5x_1+0.5x_2 \le 30$ for a distinct corner). Let's adjust the example slightly for illustration:
        $x_1 + 2x_2 \le 100$
        $x_1 + x_2 \le 60$
        The corners would be (0,0), (0,50), (60,0), and the intersection of $x_1+2x_2=100$ and $x_1+x_2=60$, which is (20,40). These are the BFS.
*   **Formal/Mathematical Version:**
    Given $m$ constraints and $n$ variables (after adding slack/surplus, so $n \ge m$), a Basic Feasible Solution (BFS) is found by setting $n-m$ variables to zero (these are called **non-basic variables**) and solving the resulting $m$ equations for the remaining $m$ variables (these are called **basic variables**). If all basic variables turn out to be non-negative, then it's a feasible solution. Each BFS corresponds to a vertex of the feasible region.
*   **What could go wrong:** Not understanding the connection between BFS and vertices; trying to solve for non-basic variables or setting basic variables to zero.

### Step 4: The Simplex Tableau

*   **Plain English:** To keep track of all the numbers (coefficients, right-hand sides, objective function values) and perform the calculations systematically, we organize everything into a table called the "simplex tableau." It's like a spreadsheet for your LP problem.
*   **Small Concrete Example:** For our modified example (Maximize $Z = 3x_1 + 5x_2$ subject to $x_1 + 2x_2 + s_1 = 100$, $x_1 + x_2 + s_2 = 60$):
    The initial tableau looks like this (with the objective function rewritten as $Z - 3x_1 - 5x_2 = 0$):

    | Basis | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
    | :---- | :---- | :---- | :---- | :---- | :-- |
    | $Z$   | -3    | -5    | 0     | 0     | 0   |
    | $s_1$ | 1     | 2     | 1     | 0     | 100 |
    | $s_2$ | 1     | 1     | 0     | 1     | 60  |

    Here, $s_1$ and $s_2$ are the initial basic variables (they form an identity matrix in their columns), and $x_1, x_2$ are non-basic (set to 0). This corresponds to the BFS (0,0) for $(x_1, x_2)$, with $s_1=100, s_2=60$, and $Z=0$.
*   **Formal/Mathematical Version:**
    The tableau represents the system of equations in a compact form. The first row (often called the Z-row or objective row) contains the coefficients of the objective function (negated for maximization problems, so they become positive for minimization problems). Subsequent rows represent the constraints, with coefficients of variables and the right-hand side values. The "Basis" column indicates which variables are currently basic for each row.
    The general structure for a maximization problem is:
    $$ \begin{array}{c|ccccccc|c}
    \text{Basis} & x_1 & \dots & x_n & s_1 & \dots & s_m & \text{RHS} \\
    \hline
    Z & -c_1 & \dots & -c_n & 0 & \dots & 0 & 0 \\
    s_1 & a_{11} & \dots & a_{1n} & 1 & \dots & 0 & b_1 \\
    \vdots & \vdots & \ddots & \vdots & \vdots & \ddots & \vdots & \vdots \\
    s_m & a_{m1} & \dots & a_{mn} & 0 & \dots & 1 & b_m \\
    \end{array} $$
*   **What could go wrong:** Incorrectly negating objective function coefficients, placing coefficients in the wrong columns, or misaligning the RHS values.

### Step 5: Pivoting — Moving from BFS to BFS

*   **Plain English:** This is the core iterative step. We look at the tableau and decide which non-basic variable, if increased, would improve our objective function the most (for maximization, this means finding the most "negative" coefficient in the Z-row). This variable becomes our "entering variable." Then, we determine which basic variable must leave the basis to make room for the entering variable without violating any constraints (this is the "leaving variable"). We perform row operations to make the entering variable basic and the leaving variable non-basic, effectively moving to an adjacent, better corner.
*   **Small Concrete Example:** From the tableau above:
    | Basis | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
    | :---- | :---- | :---- | :---- | :---- | :-- |
    | $Z$   | -3    | **-5**| 0     | 0     | 0   |
    | $s_1$ | 1     | **2** | 1     | 0     | 100 |
    | $s_2$ | 1     | **1** | 0     | 1     | 60  |

    1.  **Entering Variable:** The most negative value in the Z-row is -5, under $x_2$. So, $x_2$ is the entering variable. This means we want to increase $x_2$.
    2.  **Leaving Variable (Ratio Test):**
        *   For $s_1$ row: $100 / 2 = 50$
        *   For $s_2$ row: $60 / 1 = 60$
        The minimum ratio is 50, from the $s_1$ row. So, $s_1$ is the leaving variable. The element '2' (in row $s_1$, column $x_2$) is the **pivot element**.
    3.  **Pivot Operation:** Perform row operations to make the pivot element 1 and all other elements in the pivot column 0.
        *   New $s_1$ row (now $x_2$ row): $(1/2) \times \text{Old } s_1 \text{ row} = [0.5, 1, 0.5, 0, 50]$
        *   New $Z$ row: $\text{Old } Z \text{ row} + 5 \times \text{New } x_2 \text{ row}$
        *   New $s_2$ row: $\text{Old } s_2 \text{ row} - 1 \times \text{New } x_2 \text{ row}$
    This process transforms the tableau into a new one, representing a new BFS.
*   **Formal/Mathematical Version:**
    1.  **Select Entering Variable (Pivot Column):** For maximization, choose the column corresponding to the most negative coefficient in the Z-row (objective function row). If all are non-negative, the current solution is optimal.
    2.  **Select Leaving Variable (Pivot Row):** For each constraint row $i$ with a positive entry $a_{ij}$ in the pivot column $j$, calculate the ratio $b_i / a_{ij}$. The row with the minimum non-negative ratio is the pivot row. This ensures feasibility (no basic variable becomes negative).
    3.  **Perform Pivot Operation:** Use elementary row operations to make the pivot element (intersection of pivot row and column) 1, and all other elements in the pivot column 0. This is essentially Gaussian elimination.
*   **What could go wrong:** Choosing the wrong pivot column (e.g., positive coefficient in Z-row), choosing the wrong pivot row (e.g., negative ratio, or not the minimum positive ratio), arithmetic errors during row operations.

### Step 6: Optimality Condition

*   **Plain English:** We keep pivoting until we can't improve the objective function anymore. For a maximization problem, this happens when all the numbers in the Z-row (excluding the Z value itself) are zero or positive. If they are all non-negative, it means there's no way to increase any non-basic variable and get a better profit; you've reached the highest peak.
*   **Small Concrete Example:** After several pivots, if your Z-row looks like this:
    | Basis | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
    | :---- | :---- | :---- | :---- | :---- | :-- |
    | $Z$   | 0     | 0     | 1.5   | 2.5   | 350 |
    Here, all coefficients in the Z-row are $\ge 0$. This indicates that the current solution is optimal. The optimal profit is 350. The values of $x_1, x_2$ (and $s_1, s_2$) can be read from the RHS column corresponding to their rows, or if they are non-basic, they are 0.
*   **Formal/Mathematical Version:**
    For a maximization problem, the current BFS is optimal if all coefficients in the objective function row (Z-row), corresponding to non-basic variables, are non-negative. These coefficients are often called "reduced costs" or "relative profits." If any reduced cost is negative, it means increasing the corresponding non-basic variable would increase the objective function value, and thus further iterations are needed.
*   **What could go wrong:** Misinterpreting the meaning of the Z-row coefficients (e.g., thinking positive means more iteration for maximization), or stopping prematurely.

## 5. Worked examples — multiple, with every step shown

Let's work through a few examples.

### Example 1: Basic Maximization (2 variables, 2 constraints)

**Problem:**
Maximize $Z = 3x_1 + 2x_2$
Subject to:
$x_1 + x_2 \le 4$
$2x_1 + x_2 \le 6$
$x_1, x_2 \ge 0$

**Given:** Objective function $Z = 3x_1 + 2x_2$, constraints $x_1 + x_2 \le 4$, $2x_1 + x_2 \le 6$, non-negativity $x_1, x_2 \ge 0$.
**Want:** Optimal values for $x_1, x_2$ and maximum $Z$.

**Step 1: Convert to Standard Form**
We introduce slack variables $s_1, s_2$ for the two $\le$ constraints.
$x_1 + x_2 + s_1 = 4$
$2x_1 + x_2 + s_2 = 6$
And the objective function is rewritten as $Z - 3x_1 - 2x_2 = 0$.
All variables $x_1, x_2, s_1, s_2 \ge 0$.

**Step 2: Set up the Initial Simplex Tableau**

| Basis | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
| :---- | :---- | :---- | :---- | :---- | :-- |
| $Z$   | -3    | -2    | 0     | 0     | 0   |
| $s_1$ | 1     | 1     | 1     | 0     | 4   |
| $s_2$ | 2     | 1     | 0     | 1     | 6   |

*Explanation:* The first row represents the objective function (negated coefficients for maximization). The subsequent rows represent the constraints. $s_1$ and $s_2$ are initially basic variables, forming an identity matrix. The current solution is $x_1=0, x_2=0, s_1=4, s_2=6$, with $Z=0$.

**Step 3: First Iteration (Pivot)**

1.  **Identify Entering Variable (Pivot Column):** Look at the $Z$-row. The most negative coefficient is -3, under $x_1$. So, $x_1$ is the entering variable.
    *Explanation:* Increasing $x_1$ will contribute the most to increasing $Z$ per unit.

2.  **Identify Leaving Variable (Pivot Row):** Perform the ratio test ($RHS / \text{pivot column value}$) for positive values in the pivot column.
    *   For $s_1$ row: $4 / 1 = 4$
    *   For $s_2$ row: $6 / 2 = 3$
    The minimum ratio is 3, which corresponds to the $s_2$ row. So, $s_2$ is the leaving variable. The pivot element is 2 (in row $s_2$, column $x_1$).
    *Explanation:* This ensures that as we increase $x_1$, no basic variable becomes negative. $s_2$ hits zero first, so it leaves the basis.

3.  **Perform Row Operations:** Make the pivot element 1, and other elements in the pivot column 0.
    *   **New $s_2$ row (now $x_1$ row):** Divide the old $s_2$ row by 2.
        $R_2' = R_2 / 2 = [1, 0.5, 0, 0.5, 3]$
    *   **New $Z$ row:** $R_0' = R_0 + 3 \times R_2'$
        $R_0' = [-3, -2, 0, 0, 0] + 3 \times [1, 0.5, 0, 0.5, 3]$
        $R_0' = [-3+3, -2+1.5, 0+0, 0+1.5, 0+9] = [0, -0.5, 0, 1.5, 9]$
    *   **New $s_1$ row:** $R_1' = R_1 - 1 \times R_2'$
        $R_1' = [1, 1, 1, 0, 4] - [1, 0.5, 0, 0.5, 3]$
        $R_1' = [1-1, 1-0.5, 1-0, 0-0.5, 4-3] = [0, 0.5, 1, -0.5, 1]$

**Tableau after 1st Iteration:**

| Basis | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
| :---- | :---- | :---- | :---- | :---- | :-- |
| $Z$   | 0     | -0.5  | 0     | 1.5   | 9   |
| $s_1$ | 0     | 0.5   | 1     | -0.5  | 1   |
| $x_1$ | 1     | 0.5   | 0     | 0.5   | 3   |

*Explanation:* $x_1$ is now a basic variable, $s_2$ is non-basic (value 0). The current solution is $x_1=3, x_2=0, s_1=1, s_2=0$, with $Z=9$. We have moved to a new corner.

**Step 4: Second Iteration (Pivot)**

1.  **Identify Entering Variable:** The $Z$-row still has a negative coefficient: -0.5, under $x_2$. So, $x_2$ is the entering variable.

2.  **Identify Leaving Variable:** Ratio test for $x_2$ column:
    *   For $s_1$ row: $1 / 0.5 = 2$
    *   For $x_1$ row: $3 / 0.5 = 6$
    The minimum ratio is 2, corresponding to the $s_1$ row. So, $s_1$ is the leaving variable. The pivot element is 0.5 (in row $s_1$, column $x_2$).

3.  **Perform Row Operations:**
    *   **New $s_1$ row (now $x_2$ row):** Divide the old $s_1$ row by 0.5.
        $R_1'' = R_1' / 0.5 = [0, 1, 2, -1, 2]$
    *   **New $Z$ row:** $R_0'' = R_0' + 0.5 \times R_1''$
        $R_0'' = [0, -0.5, 0, 1.5, 9] + 0.5 \times [0, 1, 2, -1, 2]$
        $R_0'' = [0, -0.5+0.5, 0+1, 1.5-0.5, 9+1] = [0, 0, 1, 1, 10]$
    *   **New $x_1$ row:** $R_2'' = R_2' - 0.5 \times R_1''$
        $R_2'' = [1, 0.5, 0, 0.5, 3] - 0.5 \times [0, 1, 2, -1, 2]$
        $R_2'' = [1-0, 0.5-0.5, 0-1, 0.5-(-0.5), 3-1] = [1, 0, -1, 1, 2]$

**Tableau after 2nd Iteration:**

| Basis | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
| :---- | :---- | :---- | :---- | :---- | :-- |
| $Z$   | 0     | 0     | 1     | 1     | 10  |
| $x_2$ | 0     | 1     | 2     | -1    | 2   |
| $x_1$ | 1     | 0     | -1    | 1     | 2   |

*Explanation:* $x_2$ is now a basic variable, $s_1$ is non-basic. The current solution is $x_1=2, x_2=2, s_1=0, s_2=0$, with $Z=10$.

**Step 5: Check for Optimality**
All coefficients in the $Z$-row (1, 1) are non-negative. Therefore, the current solution is optimal.

**Final Answer:**
The optimal solution is $x_1 = 2$, $x_2 = 2$, and the maximum profit $Z = 10$.

*Reflection:* This was a straightforward example requiring two pivots. The key was correctly identifying the entering and leaving variables at each step and performing accurate row operations.

---

### Example 2: Maximization with more slack variables

**Problem:**
Maximize $Z = 4x_1 + 6x_2 + 2x_3$
Subject to:
$x_1 + x_2 + x_3 \le 10$
$x_1 + 2x_2 + 3x_3 \le 20$
$x_1, x_2, x_3 \ge 0$

**Given:** Objective $Z = 4x_1 + 6x_2 + 2x_3$, constraints $x_1 + x_2 + x_3 \le 10$, $x_1 + 2x_2 + 3x_3 \le 20$, non-negativity.
**Want:** Optimal values for $x_1, x_2, x_3$ and maximum $Z$.

**Step 1: Convert to Standard Form**
Add slack variables $s_1, s_2$:
$x_1 + x_2 + x_3 + s_1 = 10$
$x_1 + 2x_2 + 3x_3 + s_2 = 20$
Objective: $Z - 4x_1 - 6x_2 - 2x_3 = 0$
All variables $x_1, x_2, x_3, s_1, s_2 \ge 0$.

**Step 2: Set up the Initial Simplex Tableau**

| Basis | $x_1$ | $x_2$ | $x_3$ | $s_1$ | $s_2$ | RHS |
| :---- | :---- | :---- | :---- | :---- | :---- | :-- |
| $Z$   | -4    | -6    | -2    | 0     | 0     | 0   |
| $s_1$ | 1     | 1     | 1     | 1     | 0     | 10  |
| $s_2$ | 1     | 2     | 3     | 0     | 1     | 20  |

*Explanation:* Initial BFS is $x_1=x_2=x_3=0$, $s_1=10, s_2=20$, $Z=0$.

**Step 3: First Iteration**

1.  **Entering Variable:** Most negative in $Z$-row is -6 (under $x_2$). $x_2$ is entering.
2.  **Leaving Variable:** Ratio test for $x_2$ column:
    *   $s_1$ row: $10 / 1 = 10$
    *   $s_2$ row: $20 / 2 = 10$
    Both rows give a ratio of 10. We can choose either. Let's choose $s_1$ as the leaving variable. Pivot element is 1 (row $s_1$, column $x_2$).
    *Explanation:* When ratios are tied, choosing either is fine. It might lead to a degenerate solution (a basic variable becoming zero) in the next iteration, but the algorithm still works.

3.  **Perform Row Operations:**
    *   **New $s_1$ row (now $x_2$ row):** $R_1' = R_1 / 1 = [1, 1, 1, 1, 0, 10]$ (no change as pivot is 1)
    *   **New $Z$ row:** $R_0' = R_0 + 6 \times R_1'$
        $R_0' = [-4, -6, -2, 0, 0, 0] + 6 \times [1, 1, 1, 1, 0, 10]$
        $R_0' = [2, 0, 4, 6, 0, 60]$
    *   **New $s_2$ row:** $R_2' = R_2 - 2 \times R_1'$
        $R_2' = [1, 2, 3, 0, 1, 20] - 2 \times [1, 1, 1, 1, 0, 10]$
        $R_2' = [-1, 0, 1, -2, 1, 0]$

**Tableau after 1st Iteration:**

| Basis | $x_1$ | $x_2$ | $x_3$ | $s_1$ | $s_2$ | RHS |
| :---- | :---- | :---- | :---- | :---- | :---- | :-- |
| $Z$   | 2     | 0     | 4     | 6     | 0     | 60  |
| $x_2$ | 1     | 1     | 1     | 1     | 0     | 10  |
| $s_2$ | -1    | 0     | 1     | -2    | 1     | 0   |

*Explanation:* Current BFS: $x_1=0, x_2=10, x_3=0, s_1=0, s_2=0$, $Z=60$. Notice $s_2=0$ even though it's a basic variable. This is a degenerate BFS.

**Step 4: Check for Optimality**
All coefficients in the $Z$-row (2, 0, 4, 6, 0) are non-negative. Thus, the current solution is optimal.

**Final Answer:**
The optimal solution is $x_1 = 0$, $x_2 = 10$, $x_3 = 0$, and the maximum profit $Z = 60$.

*Reflection:* This example showed a case where a tie in the ratio test occurred, leading to a degenerate solution where a basic variable (here $s_2$) has a value of 0. The optimality condition still held, meaning we found the optimal solution.

---

### Example 3: Maximization with 3 variables and 3 constraints

**Problem:**
Maximize $Z = 2x_1 + 3x_2 + 4x_3$
Subject to:
$x_1 + x_2 + x_3 \le 50$
$2x_1 + x_2 + 3x_3 \le 120$
$x_1 + 2x_2 + x_3 \le 80$
$x_1, x_2, x_3 \ge 0$

**Given:** Objective $Z = 2x_1 + 3x_2 + 4x_3$, constraints, non-negativity.
**Want:** Optimal values for $x_1, x_2, x_3$ and maximum $Z$.

**Step 1: Convert to Standard Form**
Add slack variables $s_1, s_2, s_3$:
$x_1 + x_2 + x_3 + s_1 = 50$
$2x_1 + x_2 + 3x_3 + s_2 = 120$
$x_1 + 2x_2 + x_3 + s_3 = 80$
Objective: $Z - 2x_1 - 3x_2 - 4x_3 = 0$
All variables $x_1, x_2, x_3, s_1, s_2, s_3 \ge 0$.

**Step 2: Set up the Initial Simplex Tableau**

| Basis | $x_1$ | $x_2$ | $x_3$ | $s_1$ | $s_2$ | $s_3$ | RHS |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :-- |
| $Z$   | -2    | -3    | -4    | 0     | 0     | 0     | 0   |
| $s_1$ | 1     | 1     | 1     | 1     | 0     | 0     | 50  |
| $s_2$ | 2     | 1     | 3     | 0     | 1     | 0     | 120 |
| $s_3$ | 1     | 2     | 1     | 0     | 0     | 1     | 80  |

**Step 3: First Iteration**

1.  **Entering Variable:** Most negative in $Z$-row is -4 (under $x_3$). $x_3$ is entering.
2.  **Leaving Variable:** Ratio test for $x_3$ column:
    *   $s_1$ row: $50 / 1 = 50$
    *   $s_2$ row: $120 / 3 = 40$
    *   $s_3$ row: $80 / 1 = 80$
    Minimum ratio is 40, from $s_2$ row. $s_2$ is leaving. Pivot element is 3 (row $s_2$, column $x_3$).

3.  **Perform Row Operations:**
    *   **New $s_2$ row (now $x_3$ row):** $R_2' = R_2 / 3 = [2/3, 1/3, 1, 0, 1/3, 0, 40]$
    *   **New $Z$ row:** $R_0' = R_0 + 4 \times R_2'$
        $R_0' = [-2, -3, -4, 0, 0, 0, 0] + 4 \times [2/3, 1/3, 1, 0, 1/3, 0, 40]$
        $R_0' = [-2+8/3, -3+4/3, -4+4, 0+0, 0+4/3, 0+0, 0+160]$
        $R_0' = [2/3, -5/3, 0, 0, 4/3, 0, 160]$
    *   **New $s_1$ row:** $R_1' = R_1 - 1 \times R_2'$
        $R_1' = [1, 1, 1, 1, 0, 0, 50] - [2/3, 1/3, 1, 0, 1/3, 0, 40]$
        $R_1' = [1/3, 2/3, 0, 1, -1/3, 0, 10]$
    *   **New $s_3$ row:** $R_3' = R_3 - 1 \times R_2'$
        $R_3' = [1, 2, 1, 0, 0, 1, 80] - [2/3, 1/3, 1, 0, 1/3, 0, 40]$
        $R_3' = [1/3, 5/3, 0, 0, -1/3, 1, 40]$

**Tableau after 1st Iteration:**

| Basis | $x_1$ | $x_2$ | $x_3$ | $s_1$ | $s_2$ | $s_3$ | RHS |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :-- |
| $Z$   | 2/3   | -5/3  | 0     | 0     | 4/3   | 0     | 160 |
| $s_1$ | 1/3   | 2/3   | 0     | 1     | -1/3  | 0     | 10  |
| $x_3$ | 2/3   | 1/3   | 1     | 0     | 1/3   | 0     | 40  |
| $s_3$ | 1/3   | 5/3   | 0     | 0     | -1/3  | 1     | 40  |

**Step 4: Second Iteration**

1.  **Entering Variable:** Most negative in $Z$-row is -5/3 (under $x_2$). $x_2$ is entering.
2.  **Leaving Variable:** Ratio test for $x_2$ column:
    *   $s_1$ row: $10 / (2/3) = 15$
    *   $x_3$ row: $40 / (1/3) = 120$
    *   $s_3$ row: $40 / (5/3) = 24$
    Minimum ratio is 15, from $s_1$ row. $s_1$ is leaving. Pivot element is 2/3 (row $s_1$, column $x_2$).

3.  **Perform Row Operations:**
    *   **New $s_1$ row (now $x_2$ row):** $R_1'' = R_1' / (2/3) = [1/2, 1, 0, 3/2, -1/2, 0, 15]$
    *   **New $Z$ row:** $R_0'' = R_0' + (5/3) \times R_1''$
        $R_0'' = [2/3, -5/3, 0, 0, 4/3, 0, 160] + (5/3) \times [1/2, 1, 0, 3/2, -1/2, 0, 15]$
        $R_0'' = [2/3+5/6, -5/3+5/3, 0+0, 0+15/6, 4/3-5/6, 0+0, 160+75/3]$
        $R_0'' = [9/6, 0, 0, 15/6, 3/6, 0, 160+25] = [3/2, 0, 0, 5/2, 1/2, 0, 185]$
    *   **New $x_3$ row:** $R_2'' = R_2' - (1/3) \times R_1''$
        $R_2'' = [2/3, 1/3, 1, 0, 1/3, 0, 40] - (1/3) \times [1/2, 1, 0, 3/2, -1/2, 0, 15]$
        $R_2'' = [2/3-1/6, 1/3-1/3, 1-0, 0-1/2, 1/3-(-1/6), 0-0, 40-5]$
        $R_2'' = [3/6, 0, 1, -1/2, 3/6, 0, 35] = [1/2, 0, 1, -1/2, 1/2, 0, 35]$
    *   **New $s_3$ row:** $R_3'' = R_3' - (5/3) \times R_1''$
        $R_3'' = [1/3, 5/3, 0, 0, -1/3, 1, 40] - (5/3) \times [1/2, 1, 0, 3/2, -1/2, 0, 15]$
        $R_3'' = [1/3-5/6, 5/3-5/3, 0-0, 0-5/2, -1/3-(-5/6), 1-0, 40-25]$
        $R_3'' = [-3/6, 0, 0, -5/2, 3/6, 1, 15] = [-1/2, 0, 0, -5/2, 1/2, 1, 15]$

**Tableau after 2nd Iteration:**

| Basis | $x_1$ | $x_2$ | $x_3$ | $s_1$ | $s_2$ | $s_3$ | RHS |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :-- |
| $Z$   | 3/2   | 0     | 0     | 5/2   | 1/2   | 0     | 185 |
| $x_2$ | 1/2   | 1     | 0     | 3/2   | -1/2  | 0     | 15  |
| $x_3$ | 1/2   | 0     | 1     | -1/2  | 1/2   | 0     | 35  |
| $s_3$ | -1/2  | 0     | 0     | -5/2  | 1/2   | 1     | 15  |

**Step 5: Check for Optimality**
All coefficients in the $Z$-row (3/2, 0, 0, 5/2, 1/2, 0) are non-negative. Therefore, the current solution is optimal.

**Final Answer:**
The optimal solution is $x_1 = 0$, $x_2 = 15$, $x_3 = 35$, and the maximum profit $Z = 185$.
(From the tableau: $x_1=0$ because it's non-basic. $x_2=15$ from its row. $x_3=35$ from its row. $s_3=15$ from its row. $s_1=0, s_2=0$ because they are non-basic).

*Reflection:* This example involved fractions and more variables/constraints, increasing the complexity of arithmetic. It highlights the importance of careful calculation at each step.

---

### Example 4: Unbounded Solution (Conceptual, as Simplex will detect this)

**Problem:**
Maximize $Z = 3x_1 + 2x_2$
Subject to:
$-x_1 + x_2 \le 1$
$x_1 \le 3$
$x_1, x_2 \ge 0$

**Given:** Objective $Z = 3x_1 + 2x_2$, constraints, non-negativity.
**Want:** Optimal values for $x_1, x_2$ and maximum $Z$.

**Step 1: Convert to Standard Form**
Add slack variables $s_1, s_2$:
$-x_1 + x_2 + s_1 = 1$
$x_1 + s_2 = 3$
Objective: $Z - 3x_1 - 2x_2 = 0$
All variables $x_1, x_2, s_1, s_2 \ge 0$.

**Step 2: Set up the Initial Simplex Tableau**

| Basis | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
| :---- | :---- | :---- | :---- | :---- | :-- |
| $Z$   | -3    | -2    | 0     | 0     | 0   |
| $s_1$ | -1    | 1     | 1     | 0     | 1   |
| $s_2$ | 1     | 0     | 0     | 1     | 3   |

**Step 3: First Iteration**

1.  **Entering Variable:** Most negative in $Z$-row is -3 (under $x_1$). $x_1$ is entering.
2.  **Leaving Variable:** Ratio test for $x_1$ column:
    *   $s_1$ row: $1 / -1$ (ignore, ratio must be positive)
    *   $s_2$ row: $3 / 1 = 3$
    Minimum positive ratio is 3, from $s_2$ row. $s_2$ is leaving. Pivot element is 1 (row $s_2$, column $x_1$).

3.  **Perform Row Operations:**
    *   **New $s_2$ row (now $x_1$ row):** $R_2' = R_2 / 1 = [1, 0, 0, 1, 3]$ (no change)
    *   **New $Z$ row:** $R_0' = R_0 + 3 \times R_2'$
        $R_0' = [-3, -2, 0, 0, 0] + 3 \times [1, 0, 0, 1, 3]$
        $R_0' = [0, -2, 0, 3, 9]$
    *   **New $s_1$ row:** $R_1' = R_1 - (-1) \times R_2'$ ($R_1' = R_1 + R_2'$)
        $R_1' = [-1, 1, 1, 0, 1] + [1, 0, 0, 1, 3]$
        $R_1' = [0, 1, 1, 1, 4]$

**Tableau after 1st Iteration:**

| Basis | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
| :---- | :---- | :---- | :---- | :---- | :-- |
| $Z$   | 0     | -2    | 0     | 3     | 9   |
| $s_1$ | 0     | 1     | 1     | 1     | 4   |
| $x_1$ | 1     | 0     | 0     | 1     | 3   |

**Step 4: Second Iteration**

1.  **Entering Variable:** Most negative in $Z$-row is -2 (under $x_2$). $x_2$ is entering.
2.  **Leaving Variable:** Ratio test for $x_2$ column:
    *   $s_1$ row: $4 / 1 = 4$
    *   $x_1$ row: $3 / 0$ (cannot divide by zero, ignore)
    Minimum positive ratio is 4, from $s_1$ row. $s_1$ is leaving. Pivot element is 1 (row $s_1$, column $x_2$).

3.  **Perform Row Operations:**
    *   **New $s_1$ row (now $x_2$ row):** $R_1'' = R_1' / 1 = [0, 1, 1, 1, 4]$ (no change)
    *   **New $Z$ row:** $R_0'' = R_0' + 2 \times R_1''$
        $R_0'' = [0, -2, 0, 3, 9] + 2 \times [0, 1, 1, 1, 4]$
        $R_0'' = [0, 0, 2, 5, 17]$
    *   **New $x_1$ row:** $R_2'' = R_2' - 0 \times R_1'' = R_2'$ (no change)
        $R_2'' = [1, 0, 0, 1, 3]$

**Tableau after 2nd Iteration:**

| Basis | $x_1$ | $x_2$ | $s_1$ | $s_2$ | RHS |
| :---- | :---- | :---- | :---- | :---- | :-- |
| $Z$   | 0     | 0     | 2     | 5     | 17  |
| $x_2$ | 0     | 1     | 1     | 1     | 4   |
| $x_1$ | 1     | 0     | 0     | 1     | 3   |

**Step 5: Check for Optimality**
All coefficients in the $Z$-row (0, 0, 2, 5) are non-negative. Therefore, the current solution is optimal.

**Final Answer:**
The optimal solution is $x_1 = 3$, $x_2 = 4$, and the maximum profit $Z = 17$.

*Reflection:* This example was chosen to illustrate a potential "unboundedness" trap. However, in this specific formulation, the solution *was* bounded and found. An unbounded problem would occur if, in the ratio test step, *all* values in the pivot column were negative or zero. If this happens for an entering variable, it means you can increase that variable indefinitely without violating any constraints, and thus the objective function can go to infinity. My choice of example inadvertently led to a bounded solution, but the important takeaway is how the simplex method *detects* unboundedness: if all entries in the pivot column (for the chosen entering variable) are negative or zero, then the problem is unbounded.

Let's re-evaluate the "unbounded" aspect and provide a quick note on how it's detected.
*   **How Simplex Detects Unboundedness:** If, during the pivot selection, you identify an entering variable (a column with a negative $Z$-row coefficient for maximization), but *all* coefficients in that column (below the $Z$-row) are negative or zero, then the problem is unbounded. This means you can increase the entering variable indefinitely without violating any constraints, and thus the objective function can increase indefinitely.

## 6. Common mistakes and traps

1.  **Incorrectly Setting up the Initial Tableau:**
    *   **Why it happens:** Forgetting to negate objective function coefficients for maximization, misplacing coefficients, or errors in handling equality/greater-than-or-equal-to constraints (using surplus variables and potentially artificial variables, though artificial variables are for a more advanced "two-phase" or "Big M" method, not covered in this intro).
2.  **Errors in Pivot Selection:**
    *   **Why it happens:** Forgetting to choose the *most* negative coefficient in the Z-row (for maximization) as the entering variable. Or, in the ratio test, failing to consider *only positive* denominators, or not choosing the *minimum positive* ratio for the leaving variable.
3.  **Arithmetic Errors During Row Operations:**
    *   **Why it happens:** Fractions, multiple rows, and repeated operations make arithmetic prone to errors. A single mistake propagates through all subsequent iterations.
4.  **Misinterpreting Optimality Conditions:**
    *   **Why it happens:** Stopping too early (e.g., seeing some positive Z-row coefficients but still having negative ones) or misinterpreting the meaning of the Z-row (e.g., for minimization, you'd look for all positive coefficients, not negative).
5.  **Forgetting Non-Negativity Constraints:**
    *   **Why it happens:** Implicitly assuming variables can be negative, which is a fundamental assumption of LP and the simplex method. All decision variables, slack variables, and surplus variables must be $\ge 0$.
6.  **Handling Special Cases (Unboundedness/Degeneracy/Multiple Optima):**
    *   **Why it happens:** Not recognizing when a problem is unbounded (all coefficients in pivot column are $\le 0$). Not understanding the implications of degeneracy (a basic variable having value 0). Not knowing how to identify multiple optimal solutions (a non-basic variable in the optimal tableau has a Z-row coefficient of 0).

## 7. Textbook-precise explanation

A **Linear Program (LP)** is an optimization problem where one seeks to maximize or minimize a linear objective function subject to a set of linear equality and inequality constraints, and non-negativity constraints on the decision variables.

**Standard Form of a Maximization LP:**
A linear program is in standard form if it is expressed as:
$$ \text{Maximize } Z = \mathbf{c}^T \mathbf{x} $$
$$ \text{Subject to } A\mathbf{x} = \mathbf{b} $$
$$ \mathbf{x} \ge \mathbf{0} $$
where $\mathbf{x}$ is the vector of decision variables (including original variables and slack/surplus variables), $\mathbf{c}$ is the vector of objective function coefficients, $A$ is the constraint matrix, and $\mathbf{b}$ is the vector of right-hand side values, with $\mathbf{b} \ge \mathbf{0}$.

**Basic Feasible Solution (BFS):**
Consider a system $A\mathbf{x} = \mathbf{b}$ with $m$ equations and $n$ variables ($n \ge m$). If we set $n-m$ variables to zero (these are **non-basic variables**) and solve for the remaining $m$ variables (these are **basic variables**), and if the resulting solution satisfies $\mathbf{x} \ge \mathbf{0}$, then it is a Basic Feasible Solution. Each BFS corresponds to a vertex of the feasible region (a convex polyhedron).

**The Simplex Algorithm:**
The Simplex Algorithm is an iterative procedure for solving linear programs in standard form. It proceeds as follows:

1.  **Initialization:**
    *   Transform the LP into standard form.
    *   Construct the initial simplex tableau. An initial Basic Feasible Solution (BFS) is typically found by setting all original decision variables to zero, making the slack variables the initial basic variables. If the initial $\mathbf{b}$ vector has negative components, or if there are $\ge$ or equality constraints without obvious basic variables, a more advanced "Two-Phase" or "Big M" method involving **artificial variables** is required to find an initial BFS.

2.  **Optimality Test:**
    *   For a maximization problem, examine the $Z$-row (objective function row) coefficients. If all coefficients corresponding to non-basic variables are non-negative, the current BFS is optimal. Terminate.
    *   For a minimization problem, if all coefficients are non-positive, the current BFS is optimal. (Alternatively, convert minimization to maximization by multiplying objective function by -1).

3.  **Iteration (Pivoting):** If the current solution is not optimal:
    a.  **Select Entering Variable (Pivot Column):** For maximization, choose the non-basic variable with the most negative coefficient in the $Z$-row. This variable will enter the basis. (For minimization, choose the most positive). If there's a tie, break it arbitrarily.
    b.  **Select Leaving Variable (Pivot Row):** For each constraint row $i$, calculate the ratio $b_i / a_{ij}$ where $a_{ij}$ is the coefficient in the pivot column $j$. Only consider rows where $a_{ij} > 0$. The row with the minimum non-negative ratio determines the leaving variable. This ensures that the new BFS remains feasible. If all $a_{ij} \le 0$ in the pivot column, the problem is unbounded.
    c.  **Perform Pivot Operation:** Use elementary row operations to transform the tableau such that the pivot element (intersection of pivot row and column) becomes 1, and all other elements in the pivot column become 0. This makes the entering variable basic and the leaving variable non-basic.

4.  **Repeat:** Go back to Step 2 with the new tableau.

**Key Terminology:**
*   **Basic Variables:** Variables that are part of the current basis (have a coefficient of 1 in one row and 0 in all other constraint rows, forming part of an identity matrix). Their values are read directly from the RHS.
*   **Non-Basic Variables:** Variables not in the basis, which are currently set to zero.
*   **Reduced Costs:** The coefficients in the $Z$-row corresponding to non-basic variables. They indicate the change in the objective function value per unit increase of that non-basic variable.

**References:**
*   Hillier, F. S., & Lieberman, G. J. (2021). *Introduction to Operations Research* (11th ed.). McGraw-Hill Education. (Chapter 4)
*   Chvatal, V. (1983). *Linear Programming*. W. H. Freeman and Company. (Chapters 1-3)
*   Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. (Chapter 29)

## 8. ASCII diagrams

Here's a conceptual ASCII diagram representing a 2D feasible region and the path the simplex method might take.

```text
       ^ x2
       |
       |     Constraint 1: x1 + x2 <= 4
       |     Constraint 2: 2x1 + x2 <=