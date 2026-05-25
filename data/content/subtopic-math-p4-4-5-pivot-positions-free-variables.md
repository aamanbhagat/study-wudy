## What it is
A **pivot position** in a matrix is the location of a leading entry (the first non-zero number from the left) in a row of its row echelon form. A variable in a system of linear equations is called a **free variable** if its corresponding column in the coefficient matrix does not contain a pivot position.

## Why it matters
This concept is the bedrock of understanding the nature of solutions to linear systems. The number of free variables tells you the "degrees of freedom" in your solution: zero free variables means a single unique solution (a point), one free variable means the solutions form a line, two means a plane, and so on. This is critical in machine learning for understanding the solution space of models, in physics for describing states in quantum mechanics, and in aerospace for analyzing the stability of control systems where free variables can represent unconstrained modes of behavior.

## When to study it
You must be fluent with the following before proceeding:
1.  **Systems of Linear Equations:** How to write them and what a solution represents.
2.  **Augmented Matrices:** Representing a system $A\mathbf{x}=\mathbf{b}$ as $[A | \mathbf{b}]$.
3.  **Gaussian Elimination:** The process of using elementary row operations (scaling, swapping, replacement) to bring a matrix to **Row Echelon Form (REF)** and **Reduced Row Echelon Form (RREF)**.

If you are not confident in reducing a matrix to RREF, stop and master that skill first. This entire topic depends on it.

## How to study it (step by step)
1.  **Master Identification.** Take 5-10 matrices already in REF or RREF and simply practice circling the pivot positions. A pivot is the first non-zero entry in each non-zero row.
2.  **Connect Positions to Columns.** For each matrix from step 1, label the columns that contain a pivot as "pivot columns" and those that do not as "free columns".
3.  **Translate to Variables.** Write down a linear system corresponding to one of the RREF matrices. The variables corresponding to pivot columns are called **basic variables**. The variables corresponding to free columns are the **free variables**.
4.  **Solve for Basic in Terms of Free.** Use the equations from the RREF matrix to express each basic variable exclusively in terms of constants and free variables. This is the key step. RREF makes this trivial because each pivot is a 1 and is the only non-zero entry in its column.
5.  **Parameterize the Solution.** Write the general solution in vector form. Group the terms with each free variable. This expresses the solution set as a point (the particular solution) plus a linear combination of vectors, where the free variables are the scalar parameters. This is called the parametric vector form.
6.  **Analyze the Homogeneous Case.** For a system $A\mathbf{x}=\mathbf{0}$, repeat step 5. Notice the solution is just the span of the vectors associated with the free variables. This solution set is the **Null Space** of the matrix $A$, and the number of free variables is its dimension.

## Key ideas, with intuition
1.  **Pivots are Constraints.** Think of each row in your system as a constraint on the variables. A pivot in a column means that the corresponding variable is "locked down" or constrained by that equation. We call these **basic variables**.
    $$
    \begin{pmatrix}
    \mathbf{1} & 2 & 0 \\
    0 & 0 & \mathbf{1}
    \end{pmatrix}
    $$
    Here, the 1s are in pivot positions. Column 1 and Column 3 are pivot columns. This means $x_1$ and $x_3$ are basic variables. They are not free.

2.  **Non-Pivot Columns Imply Freedom.** A column without a pivot means no single equation "claims" that variable as its leading variable. Therefore, we are free to choose its value. We call these **free variables**.
    $$
    \begin{pmatrix}
    1 & \mathbf{2} & 0 \\
    0 & \mathbf{0} & 1
    \end{pmatrix}
    $$
    In the matrix above, Column 2 has no pivot. This means the corresponding variable, $x_2$, is a free variable. We can set $x_2 = s$ for any scalar $s \in \mathbb{R}$.

3.  **The Geometry of Freedom.** The number of free variables determines the geometry of the solution set.
    *   **0 free variables:** The system has a unique solution (a point, dimension 0).
    *   **1 free variable:** The solution set is a line (dimension 1). You need one parameter to describe it.
    *   **2 free variables:** The solution set is a plane (dimension 2). You need two parameters.
    *   This generalizes: $k$ free variables give a $k$-dimensional solution space (a $k$-flat).

4.  **Consistency Check.** The most important pivot position is one that might appear in the augmented column. If a row of an augmented matrix $[A|\mathbf{b}]$ reduces to $[0 \ 0 \ \dots \ 0 \ | \ c]$ where $c \neq 0$, this represents the equation $0 = c$. This is a contradiction, so the system is **inconsistent** (has no solution). A pivot in the augmented column is a death sentence for a solution.

## Worked example
Find the general solution for the system:
$x_1 + 2x_2 - x_3 + 3x_4 = 5$
$2x_1 + 4x_2 - x_3 + 8x_4 = 12$
$-x_1 - 2x_2 + 2x_3 - x_4 = -7$

**Step 1: Write the augmented matrix.**
$$
\left[ \begin{array}{cccc|c}
1 & 2 & -1 & 3 & 5 \\
2 & 4 & -1 & 8 & 12 \\
-1 & -2 & 2 & -1 & -7
\end{array} \right]
$$

**Step 2: Row reduce to Reduced Row Echelon Form (RREF).**
*   $R_2 \to R_2 - 2R_1$
*   $R_3 \to R_3 + R_1$
$$
\left[ \begin{array}{cccc|c}
1 & 2 & -1 & 3 & 5 \\
0 & 0 & 1 & 2 & 2 \\
0 & 0 & 1 & 2 & -2
\end{array} \right]
$$
*   $R_3 \to R_3 - R_2$
$$
\left[ \begin{array}{cccc|c}
1 & 2 & -1 & 3 & 5 \\
0 & 0 & 1 & 2 & 2 \\
0 & 0 & 0 & 0 & -4
\end{array} \right]
$$

**Step 3: Analyze the result.**
The last row corresponds to the equation $0x_1 + 0x_2 + 0x_3 + 0x_4 = -4$, or $0 = -4$. This is a contradiction. There is a pivot in the augmented column.

**Reflection:** The system is **inconsistent**. There is no solution. We stop here.

Let's modify the last equation to be $-x_1 - 2x_2 + 2x_3 - x_4 = -3$ so we can see a consistent system.

**Step 1 (revised):**
$$
\left[ \begin{array}{cccc|c}
1 & 2 & -1 & 3 & 5 \\
2 & 4 & -1 & 8 & 12 \\
-1 & -2 & 2 & -1 & -3
\end{array} \right]
$$

**Step 2 (revised):**
*   $R_2 \to R_2 - 2R_1$, $R_3 \to R_3 + R_1$
$$
\left[ \begin{array}{cccc|c}
1 & 2 & -1 & 3 & 5 \\
0 & 0 & 1 & 2 & 2 \\
0 & 0 & 1 & 2 & 2
\end{array} \right]
$$
*   $R_3 \to R_3 - R_2$, then $R_1 \to R_1 + R_2$ to get to RREF.
$$
\left[ \begin{array}{cccc|c}
\mathbf{1} & 2 & 0 & 5 & 7 \\
0 & 0 & \mathbf{1} & 2 & 2 \\
0 & 0 & 0 & 0 & 0
\end{array} \right]
$$
This is the RREF.

**Step 3: Identify pivots and free variables.**
The pivots are in column 1 and column 3.
*   Pivot columns: 1, 3. Basic variables: $x_1, x_3$.
*   Free columns: 2, 4. Free variables: $x_2, x_4$.

**Step 4: Express basic variables in terms of free variables.**
From row 1: $x_1 + 2x_2 + 5x_4 = 7 \implies x_1 = 7 - 2x_2 - 5x_4$
From row 2: $x_3 + 2x_4 = 2 \implies x_3 = 2 - 2x_4$
The free variables can be any real number. Let $x_2 = s$ and $x_4 = t$, where $s, t \in \mathbb{R}$.

**Step 5: Write the solution in parametric vector form.**
$$
\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{pmatrix} = \begin{pmatrix} 7 - 2s - 5t \\ s \\ 2 - 2t \\ t \end{pmatrix} = \begin{pmatrix} 7 \\ 0 \\ 2 \\ 0 \end{pmatrix} + s \begin{pmatrix} -2 \\ 1 \\ 0 \\ 0 \end{pmatrix} + t \begin{pmatrix} -5 \\ 0 \\ -2 \\ 1 \end{pmatrix}
$$

**Reflection:** We successfully row-reduced the matrix to RREF. This form made it trivial to spot the pivots and thus the basic/free variables. Solving for the basic variables in terms of the free ones and parameterizing them gave us the complete solution set—a plane in $\mathbb{R}^4$.

## Diagrams
An RREF matrix with pivots, pivot columns, and free columns identified.

```text
        x1   x2   x3   x4    b
      +------------------------+
R1 -> | (1)   2    0    5  |  7 |   (1) is a pivot. Col 1 is a pivot column.
      |                    |    |
R2 -> |  0    0   (1)   2  |  2 |   (1) is a pivot. Col 3 is a pivot column.
      |                    |    |
R3 -> |  0    0    0    0  |  0 |   Zero row, no pivot.
      +------------------------+
        ^         ^
        |         |
      Pivot     Pivot
      Column    Column

        Col 2 and Col 4 are FREE columns.
        x2 and x4 are FREE variables.
```

The solution set is a 2-dimensional plane living in 4-dimensional space. We cannot draw this. However, if we had one free variable in $\mathbb{R}^3$, the solution would be a line. Imagine the origin $(0,0,0)$, a particular solution vector $\mathbf{p}$ pointing from the origin to a point on the line, and a direction vector $\mathbf{v}$. The solution set would be all points of the form $\mathbf{p} + t\mathbf{v}$, which traces out the line. Our example is analogous, but with two direction vectors ($\mathbf{v}_1, \mathbf{v}_2$) defining a plane: $\mathbf{p} + s\mathbf{v}_1 + t\mathbf{v}_2$.

## Memory technique — remember this forever
1.  **The Story: Pivot Captains and Free Agents.**
    Imagine each column of your matrix is a position on a team, and each row is a play. The first non-zero player in a play (the pivot) is the **Captain** of that play. The Captain's position (column) is now a "Captain's Position" (a pivot column). Any position that has no Captain is open. A **Free Agent** (a free variable) can be signed to that position and can play however they want (take any value). The Captains must then adjust their own play (their values are determined) based on what the Free Agents do.

2.  **Must-Know Facts:**
    *   A **pivot position** is a location of a leading 1 in the RREF of a matrix.
    *   A variable is **free** if its column contains no pivot.
    *   The solution to $A\mathbf{x}=\mathbf{b}$ is written as $\mathbf{x} = \mathbf{p} + \mathbf{x}_h$, where $\mathbf{p}$ is a particular solution and $\mathbf{x}_h$ is the general solution to the homogeneous equation $A\mathbf{x}=\mathbf{0}$ (parameterized by the free variables).

3.  **Spaced Repetition Schedule:**
    Review this concept and rework the example in **1 day, 3 days, 7 days, 16 days, and 35 days**.

4.  **First Principles Pathway:**
    If you forget everything, start with a simple system like $x+2y=3$. Can you solve for $x$? $x=3-2y$. Notice you are *free* to choose $y$, and then $x$ is determined. $y$ is the free variable. The coefficient of $x$ (which is 1) is the pivot. This simple act of solving for one variable in terms of another is the core principle. Gaussian elimination is just an organized way to do this for large systems.

## Common mistakes
1.  **Stopping at REF.** Students often stop at Row Echelon Form. You must go to **Reduced Row Echelon Form** to easily solve for basic variables. In RREF, the pivot columns are clean (a single 1 and the rest zeros), making the back-substitution trivial.
2.  **Mistaking the Pivot for the Variable.** The pivot is a *position* in the matrix. The variable is what the *column* corresponds to. Don't say "the pivot is $x_1$". Say "$x_1$ is a basic variable because its column contains a pivot".
3.  **Incorrectly Parameterizing.** When writing the final vector form, students sometimes put the free variable parameter (e.g., $s$) on a basic variable row. The parameter $s$ (for free variable $x_2$) should only appear as a coefficient in the rows for basic variables, and as a '1' in the row for $x_2$ itself. See the worked example.
4.  **Forgetting the Inconsistent Case.** Always check the augmented column. If a pivot appears there (i.e., you get a row $[0 \ \dots \ 0 \ | \ c]$ with $c \neq 0$), the game is over. No solution exists.

## Self-check
1.  Given the RREF matrix below, identify the pivot positions, the basic variables, and the free variables.
    $$
    \left[ \begin{array}{ccccc|c}
    1 & 2 & 0 & 0 & -3 & 5 \\
    0 & 0 & 1 & 0 & 4 & -1 \\
    0 & 0 & 0 & 1 & 1 & 2 \\
    0 & 0 & 0 & 0 & 0 & 0
    \end{array} \right]
    $$
2.  Find the general solution in parametric vector form for the system represented by the augmented matrix:
    $$
    \left[ \begin{array}{ccc|c}
    1 & -3 & -5 & 0 \\
    0 & 1 & 2 & -1
    \end{array} \right]
    $$
3.  Consider the system:
    $x + 2y + z = 1$
    $2x + (a+2)y + 2z = 3$
    $3x + 6y + (a)z = 3$
    For what value(s) of $a$ does the system have (a) no solution, (b) a unique solution, (c) infinitely many solutions? In case (c), identify the free variable(s).