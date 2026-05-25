## What it is
Linear programming is a mathematical method for finding the best possible outcome (e.g., maximum profit or minimum cost) in a model whose requirements are represented by linear relationships. The simplex method is an efficient algorithm for solving these problems by systematically examining the vertices of the feasible solution space.

## Why it matters
This is the cornerstone of optimization theory. In aerospace, it's used for trajectory optimization, resource allocation for satellite constellations, and optimal control problems. In computer science and machine learning, it underpins algorithms like support vector machines (in its dual form) and is fundamental to solving network flow and scheduling problems.

## When to study it
You must have a firm grasp of linear algebra. Specifically, be fluent in solving systems of linear equations ($A\mathbf{x}=\mathbf{b}$), matrix row operations (Gaussian elimination), vector spaces, basis vectors, and the geometric interpretation of planes and hyperplanes. Without this, the mechanics of the algorithm will seem arbitrary.

## How to study it (step by step)
1.  **Visualize in 2D:** Take a simple 2-variable linear programming problem. Graph the inequality constraints on paper. Identify the feasible region (the polygon formed by the intersections) and its vertices. Evaluate the objective function at each vertex to find the optimum. This builds the core intuition.
2.  **Standard Form:** Learn to convert any linear program into standard form. This involves turning inequality constraints into equalities by introducing "slack" or "surplus" variables, and ensuring all variables are non-negative. This is a purely mechanical but critical step.
3.  **The Tableau:** Understand that the simplex tableau is nothing more than an augmented matrix representing the system of equations from the standard form. Set up the initial tableau for the problem you visualized in step 1.
4.  **The Pivot (One Iteration):** Learn the two rules for a single simplex iteration:
    *   **Choosing the entering variable:** Identify the most negative coefficient in the objective function row. This is the variable that will most rapidly improve the objective.
    *   **Choosing the leaving variable:** Apply the "minimum ratio test" to determine which current variable must leave the basis to maintain feasibility.
5.  **Execute a Pivot:** Perform the row operations necessary to make the pivot element 1 and all other entries in its column 0. This is identical to a step in Gaussian elimination.
6.  **Connect Steps:** Relate the state of the tableau before and after the pivot to the vertices you drew in step 1. See that a pivot operation corresponds to moving from one vertex to an adjacent, better vertex.
7.  **Termination:** Understand the stopping condition: the algorithm terminates when there are no more negative coefficients in the objective function row of the tableau. This means you have reached an optimal vertex.

## Key ideas, with intuition
1.  **The Feasible Region is a Convex Polytope:** The set of all points satisfying the linear constraints forms a geometric shape called a convex polytope (in 2D, a polygon; in 3D, a polyhedron). Imagine a cut diamond; this is the space of all possible solutions.
    $$ \text{Feasible Region } P = \{ \mathbf{x} \in \mathbb{R}^n \mid A\mathbf{x} \le \mathbf{b}, \mathbf{x} \ge \mathbf{0} \} $$
2.  **The Optimum is at a Vertex:** The linear objective function, when evaluated over the feasible region, will always achieve its maximum (or minimum) value at one of the vertices (corner points) of the polytope.
    *   **Intuition:** Imagine the objective function $z = c_1x_1 + c_2x_2$ as a plane. To maximize $z$, you are "lifting" this plane parallel to itself until it just touches the feasible region for the last time. This last point of contact must be a vertex (or possibly a whole edge or face, which includes at least one vertex).
3.  **The Simplex Algorithm is a "Vertex Walk":** The algorithm doesn't test every point. It starts at a vertex (usually the origin) and intelligently moves along an edge to an *adjacent* vertex that improves the value of the objective function. It repeats this until it reaches a vertex where no adjacent vertex has a better value. Because the region is convex, this guarantees a global optimum.
4.  **Tableau = Basis:** Each simplex tableau corresponds to a specific vertex of the feasible region. The "basic variables" (those with a single 1 in their column) form a basis for the vector space and define the current vertex. A pivot operation is a change of basis, swapping one variable out for another.

## Worked example
Let's solve the following problem:
Maximize $z = 3x_1 + 5x_2$
Subject to:
$x_1 \le 4$
$2x_2 \le 12$
$3x_1 + 2x_2 \le 18$
$x_1, x_2 \ge 0$

**Step 1: Convert to Standard Form**
Introduce slack variables $s_1, s_2, s_3$ to turn inequalities into equalities.
$x_1 + s_1 = 4$
$2x_2 + s_2 = 12$
$3x_1 + 2x_2 + s_3 = 18$
The objective function becomes $z - 3x_1 - 5x_2 = 0$.
All variables ($x_1, x_2, s_1, s_2, s_3$) must be non-negative.

**Step 2: Initial Simplex Tableau**
This is just the augmented matrix for the system. The last row is the objective function.
`z  x1  x2  s1  s2  s3 | RHS`
`-----------------------------`
`0  1   0   1   0   0  | 4`
`0  0   2   0   1   0  | 12`
`0  3   2   0   0   1  | 18`
`-----------------------------`
`1 -3  -5   0   0   0  | 0`

**Step 3: First Pivot**
*   **Entering Variable:** Look at the objective row (bottom). The most negative coefficient is -5, which is in the $x_2$ column. So, $x_2$ is the entering variable. This column is the **pivot column**.
*   **Leaving Variable:** Perform the minimum ratio test using the pivot column and the RHS:
    *   Row 1: Ratio not defined (denominator is 0).
    *   Row 2: $12 / 2 = 6$
    *   Row 3: $18 / 2 = 9$
    The minimum positive ratio is 6. This occurs in Row 2. So, the variable corresponding to Row 2 ($s_2$) is the leaving variable. The intersection of the pivot column ($x_2$) and pivot row (Row 2) gives the **pivot element**, which is 2.

**Step 4: Perform Row Operations**
Our goal is to make the pivot element 1 and all other elements in its column 0.
1.  `R2 -> R2 / 2`
2.  `R3 -> R3 - 2 * (new R2)`
3.  `R4 -> R4 + 5 * (new R2)`

The tableau becomes:
`z  x1  x2  s1   s2   s3 | RHS`
`------------------------------`
`0  1   0   1    0    0  | 4`
`0  0   1   0   1/2   0  | 6`
`0  3   0   0   -1    1  | 6`
`------------------------------`
`1 -3   0   0   5/2   0  | 30`

**Step 5: Second Pivot**
*   **Entering Variable:** The only negative in the objective row is -3, in the $x_1$ column. $x_1$ enters.
*   **Leaving Variable:** Minimum ratio test:
    *   Row 1: $4 / 1 = 4$
    *   Row 2: Ratio not defined (denominator is 0).
    *   Row 3: $6 / 3 = 2$
    The minimum ratio is 2, in Row 3. So, $s_3$ leaves. The pivot element is 3.

**Step 6: Perform Row Operations**
1.  `R3 -> R3 / 3`
2.  `R1 -> R1 - 1 * (new R3)`
3.  `R4 -> R4 + 3 * (new R3)`

The final tableau:
`z  x1  x2  s1   s2    s3  | RHS`
`--------------------------------`
`0  0   0   1    1/3  -1/3 | 2`
`0  0   1   0    1/2    0   | 6`
`0  1   0   0   -1/3   1/3 | 2`
`--------------------------------`
`1  0   0   0    3/2    1   | 36`

**Step 7: Interpret the Solution**
There are no more negative numbers in the objective row. We are done.
The basic variables are $s_1$ (row 1), $x_2$ (row 2), and $x_1$ (row 3).
Read the solution from the RHS column:
$x_1 = 2$
$x_2 = 6$
$s_1 = 2$
The maximum value of $z$ is 36.

**Reflection:**
The initial tableau corresponded to the vertex $(x_1, x_2) = (0, 0)$ where $z=0$. The first pivot moved us to the vertex $(0, 6)$ where $z=30$. The second pivot moved us to the vertex $(2, 6)$ where $z=36$, which is the optimal solution.

## Diagrams
This ASCII diagram shows the feasible region for the worked example. The arrows show the path taken by the simplex algorithm from the origin to the optimal vertex.

```text
      ^ x2
      |
      |
  10 -+---------------------------------
      |                        /
      |                     / (3x1+2x2=18)
   8 -+                    /
      |                   /
(0,6) *------------------* (2,6) <-- Optimal Point
      |                  |
   6 -+..................|.............. (2x2=12)
      |                  |
   4 -+                  |
      |                  |
   2 -+                  |
      |                  |
(0,0) *---------*--------+------> x1
      O         2        4 (x1=4)
```

## Memory technique — remember this forever
1.  **Mnemonic:** "The Greedy Climber." Think of the feasible region as a multi-dimensional mountain. The simplex method is a greedy climber who starts at the bottom (the origin). At each step (vertex), they look at all available paths (edges) and choose the one that goes up the steepest (the most negative coefficient in the objective row). They stop when they reach a peak where all paths lead down (no negative coefficients remain).

2.  **Formulas to Overlearn:**
    *   **Standard Form:** Maximize $\mathbf{c}^T\mathbf{x}$ subject to $A\mathbf{x} = \mathbf{b}$ and $\mathbf{x} \ge \mathbf{0}$.
    *   **Entering Variable Rule:** Choose column $j$ such that $c_j$ is the minimum (most negative) element in the objective row.
    *   **Leaving Variable Rule (Min Ratio Test):** For the entering column $j$, choose the row $i$ that minimizes the ratio $b_i / a_{ij}$ for all $a_{ij} > 0$.

3.  **Spaced Repetition Schedule:** Review this entire mini-lesson at: 1 day, 3 days, 7 days, 16 days, 35 days. Do a new problem from scratch each time.

4.  **First Principles Pathway:** If you forget the rules, rebuild them from logic.
    *   **Why the most negative coefficient?** The objective function is $z = \sum c_j x_j$. The tableau stores this as $z - \sum c_j x_j = 0$. A negative coefficient, say $-c_k$, means $z = c_k x_k + ...$. To increase $z$ the fastest, we should increase the $x_k$ with the largest positive $c_k$, which corresponds to the most negative $-c_k$ in the tableau.
    *   **Why the minimum ratio test?** We are increasing the entering variable from 0. The constraints are of the form $x_B + a x_E = b$, where $x_B$ is a current basic variable and $x_E$ is the entering variable. This means $x_B = b - a x_E$. Since we must maintain $x_B \ge 0$, we have $b - a x_E \ge 0$, or $x_E \le b/a$. We must respect this limit for *all* basic variables. The first one to hit 0 determines the maximum we can increase $x_E$. This is exactly what the minimum ratio test finds.

## Common mistakes
1.  **Ratio Test with Non-Positives:** Never divide by a zero or a negative number when performing the minimum ratio test. Those rows do not constrain the increase of the entering variable.
2.  **Incorrect Row Operations:** A simple arithmetic error during the pivot can corrupt the entire solution. Double-check your row operations.
3.  **Misinterpreting the Final Tableau:** Forgetting which variables are basic and non-basic. The value of the basic variables is in the RHS column; the value of the non-basic variables is always zero.
4.  **Maximization vs. Minimization:** The rules described here (entering on most negative) are for maximization. To minimize $z$, you can maximize $-z$. Applying maximization rules directly to a minimization problem will give the wrong answer.

## Self-check
1.  Convert the following problem to standard form and create the initial simplex tableau:
    Minimize $z = 8x_1 - 3x_2$
    Subject to:
    $x_1 + x_2 \ge 4$
    $2x_1 - x_2 \le 10$
    $x_1, x_2 \ge 0$
    (Hint: You will need a surplus variable and to handle the minimization.)

2.  Given the simplex tableau below for a maximization problem, identify the pivot element. State which variable enters the basis and which variable leaves.
    `z  x1  x2  x3  s1  s2 | RHS`
    `---------------------------`
    `0  4   1   2   1   0  | 16`
    `0  2   3   1   0   1  | 12`
    `---------------------------`
    `1 -5  -2   0   0   0  | 0`

3.  Solve the following linear programming problem completely using the simplex method:
    Maximize $z = 5x_1 + 4x_2$
    Subject to:
    $6x_1 + 4x_2 \le 24$
    $x_1 + 2x_2 \le 6$
    $x_1, x_2 \ge 0$