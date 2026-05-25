## 1. What it is — in plain English

Imagine you have a bunch of clues, and each clue tells you something about a few hidden numbers. For example, "twice the first number plus the second number is seven," and "the first number minus the second number is one." You want to find out what those hidden numbers are.

Gaussian elimination is like a super-organized detective method for solving these kinds of puzzles. Instead of just guessing, you systematically simplify the clues. You start by making one clue really simple, like "the first number is something." Then, you use that simple clue to make the other clues even simpler.

The process has two main parts. First, you "forward eliminate," which means you transform your messy set of clues into a simpler, stair-step pattern where it's easy to see what the last hidden number is. Think of it like organizing your clues so that the last clue only talks about one unknown.

Once you have that last, simple clue, you "back substitute." This means you solve for that last hidden number, then plug that answer back into the clue right above it to find the next hidden number, and so on, working your way backward until you've found all of them. It’s a guaranteed way to find the solution, or to discover if there isn't one, or if there are infinitely many.

## 2. Why it matters — real-world applications

Gaussian elimination is not just a theoretical exercise; it's a fundamental algorithm with widespread practical applications across science, engineering, and technology. Whenever you encounter a system of linear equations, this method (or a variation of it) is often at play behind the scenes.

1.  **Engineering and Physics (e.g., Structural Analysis, Circuit Design):** In civil engineering, analyzing the forces and stresses in a bridge or building structure often involves solving large systems of linear equations. Each beam or joint contributes to equations describing equilibrium. Similarly, in electrical engineering, applying Kirchhoff's laws to a complex circuit (with multiple resistors, capacitors, and inductors) generates a system of linear equations to determine unknown currents and voltages. For instance, designing the power distribution network for an aircraft (relevant to aerospace) requires solving such systems to ensure stable voltage and current flow throughout the many components.

2.  **Computer Graphics and Animation:** When rendering 3D scenes, objects are transformed (rotated, scaled, translated) using matrices. To determine inverse transformations, or to calculate camera projections, or even to solve for the intersection points of geometric primitives (like rays hitting triangles), systems of linear equations frequently arise. Gaussian elimination is a core tool for solving these systems, enabling realistic lighting, shadow effects, and seamless animation in video games, CAD software, and movie special effects.

3.  **Machine Learning and Data Science (e.g., Linear Regression, Optimization):** While modern machine learning often uses iterative optimization algorithms for very large systems, the underlying principles of solving linear systems are crucial. For example, the "normal equations" in ordinary least squares linear regression (finding the "best fit" line or hyperplane for data) can be solved directly using Gaussian elimination for smaller datasets. More generally, many optimization problems involve finding the minimum or maximum of a function by setting its derivative to zero, which often leads to a linear system. Understanding Gaussian elimination provides a foundational understanding of how these systems are solved.

4.  **Economics and Operations Research (e.g., Input-Output Models):** Economists use input-output models (like the Leontief model) to analyze the interdependencies between different sectors of an economy. These models involve systems of linear equations to determine how much output each sector must produce to satisfy both internal demand and external consumption. Gaussian elimination helps solve these systems to understand economic flows and plan resource allocation.

## 3. Prerequisites — what you must know first

Before diving deep into Gaussian elimination, ensure you have a solid grasp of these foundational concepts:

*   **Systems of Linear Equations:** A collection of one or more linear equations involving the same set of variables. Example: $2x + 3y = 7$, $x - y = 1$.
*   **Variables and Coefficients:** In an equation like $ax + by = c$, $x$ and $y$ are variables, and $a$ and $b$ are coefficients (numbers multiplying the variables). $c$ is a constant.
*   **Matrices:** A rectangular array of numbers, symbols, or expressions, arranged in rows and columns.
*   **Augmented Matrix:** A matrix formed by appending the constant terms of a system of linear equations to the coefficient matrix. For $Ax = b$, it's $[A | b]$.
*   **Elementary Row Operations (EROs):** Three specific operations that can be performed on the rows of a matrix without changing the solution set of the corresponding linear system:
    1.  **Swapping two rows:** $R_i \leftrightarrow R_j$.
    2.  **Multiplying a row by a non-zero scalar:** $k R_i \to R_i$ (where $k \neq 0$).
    3.  **Adding a multiple of one row to another row:** $R_i + k R_j \to R_i$.
*   **Row Echelon Form (REF):** A specific form a matrix can be in, characterized by:
    1.  All non-zero rows are above any rows of all zeros.
    2.  The leading entry (the first non-zero number from the left, called a pivot) of each non-zero row is in a column to the right of the leading entry of the row above it.
    3.  All entries in a column below a leading entry are zeros.

## 4. The core idea — step by step

Gaussian elimination systematically transforms a system of linear equations into an equivalent system that is much easier to solve. This transformation is done using Elementary Row Operations on the system's augmented matrix.

### Step 1: Represent the system as an augmented matrix.

*   **Plain English:** Take all the numbers (coefficients of variables and the constants on the right side of the equals sign) from your system of equations and arrange them neatly into a rectangular table, separated by a vertical line. Each row in the table represents an equation, and each column (before the line) represents a specific variable.
*   **Small concrete example:**
    Consider the system:
    $$
    \begin{cases}
    2x + 3y - z &= 1 \\
    4x + y + 2z &= 9 \\
    -x + 2y - 3z &= -2
    \end{cases}
    $$
    The augmented matrix is:
    $$
    \begin{pmatrix}
    2 & 3 & -1 & | & 1 \\
    4 & 1 & 2 & | & 9 \\
    -1 & 2 & -3 & | & -2
    \end{pmatrix}
    $$
*   **Formal/mathematical version:** Given a system of $m$ linear equations in $n$ variables:
    $$
    \begin{cases}
    a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n &= b_1 \\
    a_{21}x_1 + a_{22}x_2 + \dots + a_{2n}x_n &= b_2 \\
    \vdots \\
    a_{m1}x_1 + a_{m2}x_2 + \dots + a_{mn}x_n &= b_m
    \end{cases}
    $$
    The augmented matrix is denoted as $[A | \mathbf{b}]$, where $A$ is the $m \times n$ coefficient matrix and $\mathbf{b}$ is the $m \times 1$ column vector of constants:
    $$
    \begin{pmatrix}
    a_{11} & a_{12} & \dots & a_{1n} & | & b_1 \\
    a_{21} & a_{22} & \dots & a_{2n} & | & b_2 \\
    \vdots & \vdots & \ddots & \vdots & | & \vdots \\
    a_{m1} & a_{m2} & \dots & a_{mn} & | & b_m
    \end{pmatrix}
    $$
*   **What could go wrong:** Misplacing coefficients (e.g., putting the coefficient of $y$ in the $x$ column), forgetting a variable (if $0x$ is present, you must write a $0$ in the matrix), or incorrectly copying the constant terms.

### Step 2: Forward Elimination (Goal: Row Echelon Form)

*   **Plain English:** This is the main simplification phase. You want to use the Elementary Row Operations to transform your augmented matrix into a "stair-step" or "triangle" shape. Specifically, you want to make all the entries *below* the main diagonal (the numbers that go from top-left to bottom-right) into zeros. You work column by column, from left to right, and row by row, from top to bottom.
    1.  **Find a pivot:** In the first column, find a non-zero number in the first row. This is your "pivot." If the first number is zero, swap the current row with a row below it that has a non-zero number in that column.
    2.  **Make it a leading 1 (optional but often helpful):** You can divide the entire pivot row by the pivot number to make the pivot itself a '1'. This makes subsequent calculations easier, though it can introduce fractions.
    3.  **Clear the column below the pivot:** Use the pivot row to turn all the numbers directly below the pivot into zeros. You do this by adding a suitable multiple of the pivot row to each row below it.
    4.  **Move to the next pivot:** Once the first column is cleared, move to the second row, second column, and repeat the process. Find a pivot (a non-zero number), make it a leading 1 (optional), and clear all entries below it in *that* column. Continue this process until the matrix is in Row Echelon Form.
*   **Small concrete example:**
    Starting with the matrix from Step 1:
    $$
    \begin{pmatrix}
    2 & 3 & -1 & | & 1 \\
    4 & 1 & 2 & | & 9 \\
    -1 & 2 & -3 & | & -2
    \end{pmatrix}
    $$
    1.  **Target the first column (pivot is 2 in $R_1C_1$):**
        *   To make $R_2C_1$ (which is 4) zero: $R_2 \to R_2 - 2R_1$
        *   To make $R_3C_1$ (which is -1) zero: $R_3 \to R_3 + \frac{1}{2}R_1$ (or swap $R_1 \leftrightarrow R_3$ first to avoid fractions, which is often a good strategy if possible). Let's swap first: $R_1 \leftrightarrow R_3$.
        $$
        \begin{pmatrix}
        -1 & 2 & -3 & | & -2 \\
        4 & 1 & 2 & | & 9 \\
        2 & 3 & -1 & | & 1
        \end{pmatrix}
        $$
        Now, to make the pivot $1$: $R_1 \to -1R_1$
        $$
        \begin{pmatrix}
        1 & -2 & 3 & | & 2 \\
        4 & 1 & 2 & | & 9 \\
        2 & 3 & -1 & | & 1
        \end{pmatrix}
        $$
        Clear column 1:
        *   $R_2 \to R_2 - 4R_1$:
            $$
            \begin{pmatrix}
            1 & -2 & 3 & | & 2 \\
            0 & 9 & -10 & | & 1 \\
            2 & 3 & -1 & | & 1
            \end{pmatrix}
            $$
        *   $R_3 \to R_3 - 2R_1$:
            $$
            \begin{pmatrix}
            1 & -2 & 3 & | & 2 \\
            0 & 9 & -10 & | & 1 \\
            0 & 7 & -7 & | & -3
            \end{pmatrix}
            $$
    2.  **Target the second column (pivot is 9 in $R_2C_2$):**
        *   To make $R_3C_2$ (which is 7) zero: $R_3 \to R_3 - \frac{7}{9}R_2$.
            $$
            \begin{pmatrix}
            1 & -2 & 3 & | & 2 \\
            0 & 9 & -10 & | & 1 \\
            0 & 0 & -7 + \frac{70}{9} & | & -3 - \frac{7}{9}
            \end{pmatrix}
            =
            \begin{pmatrix}
            1 & -2 & 3 & | & 2 \\
            0 & 9 & -10 & | & 1 \\
            0 & 0 & \frac{7}{9} & | & -\frac{34}{9}
            \end{pmatrix}
            $$
    The matrix is now in Row Echelon Form.
*   **Formal/mathematical version:** Using a sequence of Elementary Row Operations, transform the augmented matrix $[A | \mathbf{b}]$ into an equivalent augmented matrix $[U | \mathbf{c}]$ where $U$ is an upper triangular matrix (or in Row Echelon Form). This means for each pivot $u_{ii}$ (or the first non-zero entry in row $i$), all entries $u_{ji}$ for $j > i$ are zero.
*   **What could go wrong:** Arithmetic errors are extremely common. Forgetting to apply an operation to *every* entry in a row (especially the augmented part). Choosing a zero as a pivot (you must swap rows to get a non-zero pivot). Dividing by zero.

### Step 3: Check for consistency (after REF)

*   **Plain English:** Once your matrix is in the stair-step (Row Echelon) form, look at the bottom rows. Do any of them make a nonsensical statement? For example, if you end up with a row that says "0 = 5", then your original system has no solution. If you have a row that says "0 = 0", that just means one equation was redundant, and you might have infinitely many solutions.
*   **Small concrete example:**
    *   **No solution:** If you get a row like:
        $$
        \begin{pmatrix}
        1 & 2 & 3 & | & 4 \\
        0 & 1 & 5 & | & 6 \\
        0 & 0 & 0 & | & 7
        \end{pmatrix}
        $$
        The last row translates to $0x + 0y + 0z = 7$, or $0=7$, which is false. So, no solution.
    *   **Infinitely many solutions:** If you get a row like:
        $$
        \begin{pmatrix}
        1 & 2 & 3 & | & 4 \\
        0 & 1 & 5 & | & 6 \\
        0 & 0 & 0 & | & 0
        \end{pmatrix}
        $$
        The last row translates to $0x + 0y + 0z = 0$, or $0=0$, which is true but provides no information about the variables. This indicates a free variable and thus infinitely many solutions.
*   **Formal/mathematical version:** After forward elimination, if any row of the augmented matrix is of the form $[0 \ 0 \ \dots \ 0 \ | \ k]$ where $k \neq 0$, then the system is inconsistent and has no solution. If there are fewer pivots than variables, and no such inconsistent row exists, then the system has infinitely many solutions (with free variables). If the number of pivots equals the number of variables, and no inconsistent row exists, then there is a unique solution.
*   **What could go wrong:** Misinterpreting $0=0$ as "no solution" or $0=k$ (for $k \ne 0$) as "unique solution."

### Step 4: Back Substitution

*   **Plain English:** Now that your matrix is in Row Echelon Form, you can easily solve for the variables. Start with the *last* non-zero row, which will typically give you the value of the last variable (e.g., $z$). Once you have that value, plug it into the equation represented by the row *above* it to solve for the next variable (e.g., $y$). Continue plugging in known values as you move *up* the matrix, until you've found all the variables.
*   **Small concrete example:**
    Using the Row Echelon Form from Step 2:
    $$
    \begin{pmatrix}
    1 & -2 & 3 & | & 2 \\
    0 & 9 & -10 & | & 1 \\
    0 & 0 & \frac{7}{9} & | & -\frac{34}{9}
    \end{pmatrix}
    $$
    This translates back to the system:
    $$
    \begin{cases}
    x - 2y + 3z &= 2 \quad (Eq. 1) \\
    9y - 10z &= 1 \quad (Eq. 2) \\
    \frac{7}{9}z &= -\frac{34}{9} \quad (Eq. 3)
    \end{cases}
    $$
    1.  **Solve for $z$ from (Eq. 3):**
        $\frac{7}{9}z = -\frac{34}{9} \implies 7z = -34 \implies z = -\frac{34}{7}$
    2.  **Substitute $z$ into (Eq. 2) to solve for $y$:**
        $9y - 10(-\frac{34}{7}) = 1$
        $9y + \frac{340}{7} = 1$
        $9y = 1 - \frac{340}{7} = \frac{7 - 340}{7} = -\frac{333}{7}$
        $y = -\frac{333}{7 \cdot 9} = -\frac{37}{7}$
    3.  **Substitute $y$ and $z$ into (Eq. 1) to solve for $x$:**
        $x - 2(-\frac{37}{7}) + 3(-\frac{34}{7}) = 2$
        $x + \frac{74}{7} - \frac{102}{7} = 2$
        $x - \frac{28}{7} = 2$
        $x - 4 = 2$
        $x = 6$
    So, the unique solution is $(x, y, z) = (6, -\frac{37}{7}, -\frac{34}{7})$.
*   **Formal/mathematical version:** Starting from the last non-zero equation in the system represented by the Row Echelon Form matrix, solve for the variable corresponding to its leading entry (pivot). Substitute this value into the equation immediately above it to solve for the next variable. Continue this upward substitution until all variables have been determined. If there are free variables (columns without pivots), express the pivot variables in terms of the free variables.
*   **What could go wrong:** Arithmetic errors during substitution, substituting values into the wrong equations, or incorrectly handling free variables (if applicable).

## 5. Worked examples — multiple, with every step shown

### Example 1: 2x2 System with a Unique Solution

**Problem:** Solve the following system of linear equations using Gaussian elimination:
$$
\begin{cases}
x + 2y &= 5 \\
3x - y &= 1
\end{cases}
$$

**Given:** Two linear equations with two variables.
**Wanted:** The values of $x$ and $y$ that satisfy both equations.

**Solution:**

1.  **Write the augmented matrix:**
    $$
    \begin{pmatrix}
    1 & 2 & | & 5 \\
    3 & -1 & | & 1
    \end{pmatrix}
    $$
    *Explanation: We extract the coefficients of $x$ and $y$ and the constant terms to form the matrix.*

2.  **Forward Elimination (to Row Echelon Form):**
    *   **Goal:** Make the entry in $R_2C_1$ a zero. The pivot is $1$ in $R_1C_1$.
    *   **Operation:** $R_2 \to R_2 - 3R_1$
        $$
        \begin{pmatrix}
        1 & 2 & | & 5 \\
        3 - 3(1) & -1 - 3(2) & | & 1 - 3(5)
        \end{pmatrix}
        =
        \begin{pmatrix}
        1 & 2 & | & 5 \\
        0 & -7 & | & -14
        \end{pmatrix}
        $$
    *Explanation: We multiply the first row by 3 and subtract it from the second row. This eliminates the $x$ term in the second equation, creating a zero below the first pivot.*

3.  **Check for consistency:**
    The matrix is now in Row Echelon Form. There are no rows like $[0 \ 0 \ | \ k]$ where $k \neq 0$. There are two pivots (1 and -7) and two variables, so a unique solution exists.
    *Explanation: We check if the system is solvable. Since no contradiction (like $0=k$ for $k \ne 0$) arises, a solution exists.*

4.  **Back Substitution:**
    Convert the REF matrix back into a system of equations:
    $$
    \begin{cases}
    x + 2y &= 5 \quad (Eq. 1) \\
    -7y &= -14 \quad (Eq. 2)
    \end{cases}
    $$
    *   **From (Eq. 2):**
        $$-7y = -14$$
        $$y = \frac{-14}{-7}$$
        $$y = 2$$
        *Explanation: We solve the simplest equation (the bottom one) first, which directly gives us the value of $y$.*
    *   **Substitute $y=2$ into (Eq. 1):**
        $$x + 2(2) = 5$$
        $$x + 4 = 5$$
        $$x = 5 - 4$$
        $$x = 1$$
        *Explanation: We use the value of $y$ just found and substitute it into the equation above it to solve for $x$.*

**Final Answer:**
$$
\boxed{x=1, y=2}
$$

**Reflection:** This was a straightforward 2x2 system. The key was to correctly perform the single row operation to eliminate the first variable in the second equation and then perform accurate back substitution.

---

### Example 2: 3x3 System with a Unique Solution

**Problem:** Solve the following system:
$$
\begin{cases}
x + y + z &= 6 \\
2x - y + z &= 3 \\
3x + 2y - z &= 2
\end{cases}
$$

**Given:** Three linear equations with three variables.
**Wanted:** The values of $x, y, z$.

**Solution:**

1.  **Write the augmented matrix:**
    $$
    \begin{pmatrix}
    1 & 1 & 1 & | & 6 \\
    2 & -1 & 1 & | & 3 \\
    3 & 2 & -1 & | & 2
    \end{pmatrix}
    $$

2.  **Forward Elimination:**
    *   **Step 2a: Clear $C_1$ below $R_1C_1$ (pivot is 1).**
        *   $R_2 \to R_2 - 2R_1$:
            $$
            \begin{pmatrix}
            1 & 1 & 1 & | & 6 \\
            2 - 2(1) & -1 - 2(1) & 1 - 2(1) & | & 3 - 2(6) \\
            3 & 2 & -1 & | & 2
            \end{pmatrix}
            =
            \begin{pmatrix}
            1 & 1 & 1 & | & 6 \\
            0 & -3 & -1 & | & -9 \\
            3 & 2 & -1 & | & 2
            \end{pmatrix}
            $$
            *Explanation: We eliminate the $x$ term in the second equation.*
        *   $R_3 \to R_3 - 3R_1$:
            $$
            \begin{pmatrix}
            1 & 1 & 1 & | & 6 \\
            0 & -3 & -1 & | & -9 \\
            3 - 3(1) & 2 - 3(1) & -1 - 3(1) & | & 2 - 3(6)
            \end{pmatrix}
            =
            \begin{pmatrix}
            1 & 1 & 1 & | & 6 \\
            0 & -3 & -1 & | & -9 \\
            0 & -1 & -4 & | & -16
            \end{pmatrix}
            $$
            *Explanation: We eliminate the $x$ term in the third equation.*

    *   **Step 2b: Clear $C_2$ below $R_2C_2$ (pivot is -3).**
        *   To make calculations simpler, let's swap $R_2 \leftrightarrow R_3$ first to get a smaller pivot in $R_2C_2$:
            $$
            \begin{pmatrix}
            1 & 1 & 1 & | & 6 \\
            0 & -1 & -4 & | & -16 \\
            0 & -3 & -1 & | & -9
            \end{pmatrix}
            $$
            *Explanation: Swapping rows can sometimes make the arithmetic easier by avoiding fractions or larger numbers.*
        *   Now, let's make the pivot $1$: $R_2 \to -1R_2$:
            $$
            \begin{pmatrix}
            1 & 1 & 1 & | & 6 \\
            0 & 1 & 4 & | & 16 \\
            0 & -3 & -1 & | & -9
            \end{pmatrix}
            $$
            *Explanation: Making the pivot 1 simplifies future operations.*
        *   $R_3 \to R_3 + 3R_2$:
            $$
            \begin{pmatrix}
            1 & 1 & 1 & | & 6 \\
            0 & 1 & 4 & | & 16 \\
            0 + 3(0) & -3 + 3(1) & -1 + 3(4) & | & -9 + 3(16)
            \end{pmatrix}
            =
            \begin{pmatrix}
            1 & 1 & 1 & | & 6 \\
            0 & 1 & 4 & | & 16 \\
            0 & 0 & 11 & | & 39
            \end{pmatrix}
            $$
            *Explanation: We eliminate the $y$ term in the third equation using the new second row.*

3.  **Check for consistency:**
    The matrix is in Row Echelon Form. No contradictions, and 3 pivots for 3 variables. Unique solution.

4.  **Back Substitution:**
    Convert back to equations:
    $$
    \begin{cases}
    x + y + z &= 6 \quad (Eq. 1) \\
    y + 4z &= 16 \quad (Eq. 2) \\
    11z &= 39 \quad (Eq. 3)
    \end{cases}
    $$
    *   **From (Eq. 3):**
        $$11z = 39$$
        $$z = \frac{39}{11}$$
    *   **Substitute $z=\frac{39}{11}$ into (Eq. 2):**
        $$y + 4\left(\frac{39}{11}\right) = 16$$
        $$y + \frac{156}{11} = 16$$
        $$y = 16 - \frac{156}{11} = \frac{16 \cdot 11 - 156}{11} = \frac{176 - 156}{11} = \frac{20}{11}$$
    *   **Substitute $y=\frac{20}{11}$ and $z=\frac{39}{11}$ into (Eq. 1):**
        $$x + \frac{20}{11} + \frac{39}{11} = 6$$
        $$x + \frac{59}{11} = 6$$
        $$x = 6 - \frac{59}{11} = \frac{6 \cdot 11 - 59}{11} = \frac{66 - 59}{11} = \frac{7}{11}$$

**Final Answer:**
$$
\boxed{x=\frac{7}{11}, y=\frac{20}{11}, z=\frac{39}{11}}
$$

**Reflection:** This example involved more steps and fractions. Swapping rows to get a simpler pivot and making the pivot 1 (by dividing the row) helped manage the arithmetic, even though it led to fractions. Careful calculation is paramount.

---

### Example 3: System with No Solution (Inconsistent)

**Problem:** Solve the system:
$$
\begin{cases}
x - 2y + z &= 1 \\
2x - 4y + 3z &= 5 \\
-x + 2y - 2z &= -3
\end{cases}
$$

**Given:** Three linear equations with three variables.
**Wanted:** The values of $x, y, z$.

**Solution:**

1.  **Write the augmented matrix:**
    $$
    \begin{pmatrix}
    1 & -2 & 1 & | & 1 \\
    2 & -4 & 3 & | & 5 \\
    -1 & 2 & -2 & | & -3
    \end{pmatrix}
    $$

2.  **Forward Elimination:**
    *   **Step 2a: Clear $C_1$ below $R_1C_1$ (pivot is 1).**
        *   $R_2 \to R_2 - 2R_1$:
            $$
            \begin{pmatrix}
            1 & -2 & 1 & | & 1 \\
            0 & 0 & 1 & | & 3 \\
            -1 & 2 & -2 & | & -3
            \end{pmatrix}
            $$
            *Explanation: The second equation's $x$ term is eliminated.*
        *   $R_3 \to R_3 + R_1$:
            $$
            \begin{pmatrix}
            1 & -2 & 1 & | & 1 \\
            0 & 0 & 1 & | & 3 \\
            0 & 0 & -1 & | & -2
            \end{pmatrix}
            $$
            *Explanation: The third equation's $x$ term is eliminated.*

    *   **Step 2b: Clear $C_2$ below $R_2C_2$.**
        Notice that $R_2C_2$ is 0. We cannot use it as a pivot. We look for a non-zero entry below it in the same column, but there isn't one. This means $y$ is a free variable *if* the system is consistent.
        *Explanation: We encounter a zero in the pivot position. Since there are no rows below it with a non-zero entry in the second column, we move to the next column for the pivot.*

    *   **Step 2c: Clear $C_3$ below $R_2C_3$ (pivot is 1).**
        *   $R_3 \to R_3 + R_2$:
            $$
            \begin{pmatrix}
            1 & -2 & 1 & | & 1 \\
            0 & 0 & 1 & | & 3 \\
            0 & 0 & 0 & | & 1
            \end{pmatrix}
            $$
            *Explanation: We use the third column's pivot (1 in $R_2C_3$) to eliminate the entry below it. This brings the matrix to Row Echelon Form.*

3.  **Check for consistency:**
    Look at the last row: $[0 \ 0 \ 0 \ | \ 1]$. This translates to the equation $0x + 0y + 0z = 1$, or $0 = 1$. This is a contradiction.
    *Explanation: The presence of a row representing $0 = 1$ indicates that the system has no solution.*

**Final Answer:**
$$
\boxed{\text{No Solution (Inconsistent System)}}
$$

**Reflection:** The key here was recognizing the $0=1$ contradiction. This means the original equations are incompatible; there are no values of $x, y, z$ that can satisfy all three simultaneously.

---

### Example 4: System with Infinitely Many Solutions

**Problem:** Solve the system:
$$
\begin{cases}
x + 2y - z &= 4 \\
3x + 6y - 3z &= 12 \\
-2x - 4y + 2z &= -8
\end{cases}
$$

**Given:** Three linear equations with three variables.
**Wanted:** The values of $x, y, z$.

**Solution:**

1.  **Write the augmented matrix:**
    $$
    \begin{pmatrix}
    1 & 2 & -1 & | & 4 \\
    3 & 6 & -3 & | & 12 \\
    -2 & -4 & 2 & | & -8
    \end{pmatrix}
    $$

2.  **Forward Elimination:**
    *   **Step 2a: Clear $C_1$ below $R_1C_1$ (pivot is 1).**
        *   $R_2 \to R_2 - 3R_1$:
            $$
            \begin{pmatrix}
            1 & 2 & -1 & | & 4 \\
            0 & 0 & 0 & | & 0 \\
            -2 & -4 & 2 & | & -8
            \end{pmatrix}
            $$
            *Explanation: The second equation becomes $0=0$, indicating it's a multiple of the first.*
        *   $R_3 \to R_3 + 2R_1$:
            $$
            \begin{pmatrix}
            1 & 2 & -1 & | & 4 \\
            0 & 0 & 0 & | & 0 \\
            0 & 0 & 0 & | & 0
            \end{pmatrix}
            $$
            *Explanation: The third equation also becomes $0=0$, indicating it's a multiple of the first.*

3.  **Check for consistency:**
    The matrix is in Row Echelon Form. We have two rows of $[0 \ 0 \ 0 \ | \ 0]$. These are not contradictions. We have only one pivot (in $R_1C_1$) but three variables. This means there are free variables, and thus infinitely many solutions.
    *Explanation: The presence of rows representing $0=0$ and fewer pivots than variables indicates infinitely many solutions.*

4.  **Back Substitution (with free variables):**
    Convert the REF matrix back into equations:
    $$
    \begin{cases}
    x + 2y - z &= 4 \quad (Eq. 1) \\
    0 &= 0 \quad (Eq. 2) \\
    0 &= 0 \quad (Eq. 3)
    \end{cases}
    $$
    Since there's only one non-zero equation and three variables ($x, y, z$), we choose two variables as "free" variables and express the "pivot" variable ($x$ in this case) in terms of them. Let $y = s$ and $z = t$, where $s$ and $t$ can be any real numbers.
    *   **From (Eq. 1):**
        $$x + 2y - z = 4$$
        $$x = 4 - 2y + z$$
        Substitute $y=s$ and $z=t$:
        $$x = 4 - 2s + t$$

**Final Answer:**
$$
\boxed{x = 4 - 2s + t, \quad y = s, \quad z = t \quad \text{for any real numbers } s, t}
$$

**Reflection:** This example demonstrates how to handle infinitely many solutions. When you have fewer pivots than variables, the variables corresponding to the non-pivot columns become "free variables." The solution is then expressed in terms of these free variables, representing an infinite set of solutions.

---

## 6. Common mistakes and traps

1.  **Arithmetic Errors:** This is by far the most common mistake. Adding, subtracting, or multiplying incorrectly, especially with negative numbers or fractions, can quickly derail the entire process.
    *   *Why it happens:* Lack of careful, step-by-step calculation and not double-checking intermediate results.
2.  **Forgetting to apply EROs to the augmented part:** When performing an operation like $R_i \to R_i + k R_j$, students sometimes forget to apply the operation to the constant term on the right side of the augmented matrix.
    *   *Why it happens:* Focusing too much on the coefficient matrix and treating the constant column separately.
3.  **Incorrectly applying Elementary Row Operations:** For instance, trying to add a multiple of a row to *itself*, or multiplying a row by zero.
    *   *Why it happens:* Not fully understanding the definition and purpose of each ERO.
4.  **Incorrect pivot selection (especially with zeros):** Attempting to use a zero as a pivot without first swapping rows to get a non-zero entry.
    *   *Why it happens:* Not understanding that a pivot must be non-zero to eliminate entries below it effectively (as division by zero is undefined).
5.  **Misinterpreting Row Echelon Form:** Confusing an inconsistent system ($0=k, k \ne 0$) with a system having infinitely many solutions ($0=0$ with free variables), or vice-versa.
    *   *Why it happens:* Not thoroughly understanding the conditions for consistency and uniqueness of solutions based on the REF.
6.  **Errors in Back Substitution:** Substituting values incorrectly, or making arithmetic errors during the substitution phase.
    *   *Why it happens:* Rushing the final steps after the matrix manipulation, or not being methodical in substituting values.

## 7. Textbook-precise explanation

Gaussian elimination is an algorithm used to solve systems of linear equations by transforming their augmented matrix into row echelon form (REF) using a finite sequence of elementary row operations. The process consists of two primary phases: forward elimination and back substitution.

Let $A\mathbf{x} = \mathbf{b}$ be a system of $m$ linear equations in $n$ variables, where $A$ is the $m \times n$ coefficient matrix, $\mathbf{x}$ is the $n \times 1$ column vector of variables, and $\mathbf{b}$ is the $m \times 1$ column vector of constants. The system can be represented by its augmented matrix $[A | \mathbf{b}]$.

**Definition (Elementary Row Operations):** The three elementary row operations (EROs) are:
1.  **Type 1:** Swapping two rows: $R_i \leftrightarrow R_j$.
2.  **Type 2:** Multiplying a row by a non-zero scalar: $k R_i \to R_i$, for $k \in \mathbb{R}, k \neq 0$.
3.  **Type 3:** Adding a scalar multiple of one row to another row: $R_i + k R_j \to R_i$, for $k \in \mathbb{R}$.
These operations produce row-equivalent matrices, meaning the solution set of the associated linear system remains unchanged.

**Definition (Row Echelon Form - REF):** A matrix is in row echelon form if it satisfies the following three conditions:
1.  All non-zero rows are above any rows of all zeros.
2.  Each leading entry (pivot) of a non-zero row is in a column to the right of the leading entry of the row above it.
3.  All entries in a column below a leading entry are zeros.

**Algorithm (Gaussian Elimination):**

**Phase 1: Forward Elimination**
The goal of this phase is to transform the augmented matrix $[A | \mathbf{b}]$ into a row-equivalent matrix $[U | \mathbf{c}]$ that is in Row Echelon Form. This is achieved by systematically creating zeros below the pivots.
1.  **Identify the first non-zero column** from the left. If all entries in this column are zero, move to the next column.
2.  **Select a pivot:** If the top entry in this column is zero, swap the current row with a row below it that has a non-zero entry in this column. The non-zero entry in the pivot position (e.g., $a_{11}$ or the first non-zero entry in the first non-zero column) is called the pivot.
3.  **Normalize the pivot (optional but common):** Multiply the pivot row by the reciprocal of the pivot entry to make the pivot equal to 1. This can simplify subsequent arithmetic.
4.  **Eliminate entries below the pivot:** For each row below the pivot row, add a suitable multiple of the pivot row to it to make the entry in the pivot column zero. That is, for $j > i$, perform $R_j \to R_j - (a_{ji}/a_{ii})R_i$.
5.  **Repeat:** Cover the pivot row and repeat steps 1-4 for the submatrix that remains, moving to the right and down. Continue until the entire matrix is in Row Echelon Form.

**Phase 2: Back Substitution**
Once the augmented matrix is in Row Echelon Form, the corresponding system of linear equations can be readily solved.
1.  **Identify the last non-zero equation:** This equation will typically involve only one variable (the one corresponding to its leading entry). Solve for this variable.
2.  **Substitute upwards:** Substitute the value found in step 1 into the equation immediately above it. Solve for the next unknown variable.
3.  **Continue:** Repeat the substitution process, moving upwards through the equations, until all variables have been determined.
4.  **Handle free variables:** If, after forward elimination, there are fewer pivots than variables (i.e., some columns in the coefficient part of the REF matrix do not contain a pivot), the corresponding variables are called free variables. These variables can take any real value. Express the pivot variables in terms of the free variables. This indicates infinitely many solutions.
5.  **Handle inconsistent systems:** If at any point during forward elimination, a row of the form $[0 \ 0 \ \dots \ 0 \ | \ k]$ appears where $k \neq 0$, the system is inconsistent and has no solution.

**Existence and Uniqueness of Solutions:**
*   **No solution:** If the REF of the augmented matrix contains a row $[0 \ \dots \ 0 \ | \ k]$ where $k \neq 0$.
*   **Unique solution:** If the REF contains no such row and the number of pivots equals the number of variables.
*   **Infinitely many solutions:** If the REF contains no such row and the number of pivots is less than the number of variables.

*References:*
*   Lay, David C., Lay, Steven R., McDonald, Judi J. *Linear Algebra and Its Applications*. 5th ed., Pearson, 2016. (Specifically, Chapter 1, Sections 1.1-1.2)
*   Strang, Gilbert. *Linear Algebra and Its Applications*. 4th ed., Brooks Cole, 2005. (Chapter 1, Sections 1.1-1.3)

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the goal of forward elimination: transforming the initial matrix into Row Echelon Form, where the 'X's represent non-zero entries and '0's represent the entries we aim to eliminate.

```text
Initial Augmented Matrix:

[ X X X | X ]
[ X X X | X ]
[ X X X | X ]

   (Forward Elimination using EROs)
          ↓

Row Echelon Form (REF):

[ X X X | X ]  <- First pivot (leading entry)
[ 0 X X | X ]  <- Second pivot, to the right of the first
[ 0 0 X | X ]  <- Third pivot, to the right of the second

(The 'X's can be any non-zero number, often normalized to 1,
 and the entries above the pivots in REF can also be non-zero.
 The crucial part is the zeros below the pivots.)
```

This diagram shows how the process systematically creates zeros in the lower-left part of the coefficient matrix, leading to an upper-triangular structure.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:** "**G**et **E**liminated **B**elow, **S**olve **U**p."
    *   **G**aussian **E**limination: The whole process.
    *   **E**liminate **B**elow: The "forward elimination" phase, where you create zeros below the pivots to get to Row Echelon Form. Think of sweeping numbers down and out of the way.
    *   **S**olve **U**p: The "back substitution" phase, where you start from the bottom-most equation and work your way up, solving for variables one by one. Think of climbing a ladder.

2.  **The 1-3 formulas/facts they MUST overlearn:**
    *   **The 3 Elementary Row Operations (EROs):** Swap rows, multiply a row by a non-zero scalar, add a multiple of one row to another. These are your only tools!
    *   **The Goal of Forward Elimination:** Transform the augmented matrix into Row Echelon Form (stair-step pattern with zeros below pivots).
    *   **The Interpretation of REF:**
        *   Row $[0 \ \dots \ 0 \ | \ k]$ with $k \ne 0 \implies$ No Solution.
        *   Fewer pivots than variables (and no $0=k$ row) $\implies$ Infinitely Many Solutions (with free variables).
        *   Number of pivots = number of variables (and no $0=k$ row) $\implies$ Unique Solution.

3.  **Spaced-repetition schedule:**
    *   **Day 1:** Immediately after this lesson, review the core idea and do 2-3 simple practice problems.
    *   **Day 3:** Review the mnemonic, the 3 key facts, and do 1-2 medium-difficulty problems. Focus on avoiding common mistakes.
    *   **Day 7:** Review the entire process, including the textbook definition. Do 1 hard problem, forcing yourself to write out every step.
    *   **Day 16:** Re-derive the process from first principles (see below). Do a mixed set of problems (unique, no solution, infinite solutions).
    *   **Day 35:** Explain Gaussian elimination to someone else (or to yourself out loud). Tackle a challenging problem involving fractions or many variables.

4.  **The first-principles re-derivation pathway:**
    If you ever forget how Gaussian elimination works, start with a simple 3x3 system of equations, like:
    $$
    \begin{cases}
    ax + by + cz &= d \\
    ex + fy + gz &= h \\
    ix + jy + kz &= l
    \end{cases}
    $$
    *   **Goal:** Solve for $x, y, z$.
    *   **Question 1:** How can I get rid of $x$ from the second and third equations?
        *   *Answer:* Multiply the first equation by some factor and subtract it from the second. Do the same for the third. This is the essence of $R_i \to R_i - kR_j$.
    *   **Question 2:** Now I have a system where the first equation has $x,y,z$, but the second and third only have $y,z$. How can I get rid of $y$ from the third equation?
        *   *Answer:* Use the new second equation (which only has $y,z$) to eliminate $y$ from the third equation. Again, $R_i \to R_i - kR_j$.
    *   **Question 3:** Now the third equation only has $z$. How do I find $z$?
        *   *Answer:* Solve it directly.
    *   **Question 4:** How do I find $y$ and $x$?
        *   *Answer:* Plug $z$ into the second equation to find $y$. Then plug $z$ and $y$ into the first equation to find $x$. This is back substitution.
    *   **Question 5:** What if I encounter a zero where I need a pivot?
        *   *Answer:* Swap equations. This is $R_i \leftrightarrow R_j$.
    *   **Question 6:** What if an equation becomes $0=5$?
        *   *Answer:* No solution.
    *   **Question 7:** What if an equation becomes $0=0$?
        *   *Answer:* It's redundant; leads to free variables if there aren't enough pivots.

This thought process mirrors the steps of Gaussian elimination, helping you reconstruct the algorithm logically.

## 10. Connections — what this leads to

Gaussian elimination is one of the foundational algorithms in linear algebra. Mastering it unlocks understanding of numerous advanced concepts and related techniques:

1.  **Gauss-Jordan Elimination:** A direct extension of Gaussian elimination. Instead of stopping at Row Echelon Form (REF), it continues to transform the matrix into **Reduced Row Echelon Form (RREF)**, where all pivots are 1, and all entries *above* and below the pivots are 0. This form directly gives the solution without back substitution.
2.  **Matrix Inverses:** Gaussian elimination is the primary method for computing the inverse of a square matrix $A$. By augmenting $A$ with the identity matrix $I$ (i.e., $[A | I]$) and performing Gauss-Jordan elimination, if $A$ is invertible, the result will be $[I | A^{-1}]$.
3.  **Determinants:** While not directly computed by Gaussian elimination, the determinant of a matrix can be easily found from its Row Echelon Form. The determinant of an upper triangular matrix (like the coefficient matrix in REF) is the product of its diagonal entries (pivots), adjusted by a sign change for each row swap.
4.  **Rank of a Matrix:** The rank of a matrix is defined as the number of pivots (or non-zero rows) in its Row Echelon Form. This concept is fundamental to understanding linear independence, basis, and dimension of vector spaces.
5.  **Basis and Dimension of Vector Spaces:** Gaussian elimination helps find bases for the column space, row space, and null space of a matrix. The number of vectors in these bases directly relates to the rank and nullity of the matrix, which are key aspects of dimension theory.
6.  **Linear Transformations:** Understanding how systems of equations behave under Gaussian elimination provides intuition for how linear transformations map vectors and spaces. The consistency and uniqueness of solutions relate directly to injectivity and surjectivity of the transformation.
7.  **LU Decomposition:** This is a numerical method where a matrix $A$ is factored into a lower triangular matrix $L$ and an upper triangular matrix $U$ ($A = LU$). The forward elimination steps of Gaussian elimination *are* precisely what's needed to find $U$ and implicitly construct $L$. This decomposition is crucial for efficiently solving many linear systems, especially when the same system needs to be solved with different right-hand side vectors $\mathbf{b}$.
8.  **Eigenvalues and Eigenvectors:** While Gaussian elimination isn't used directly to find eigenvalues, the process of finding eigenvectors involves solving a homogeneous system $(A - \lambda I)\mathbf{x} = \mathbf{0}$, which is typically done using Gaussian elimination.
9.  **Numerical Stability:** Understanding the choices made during Gaussian elimination (e.g., pivot selection) is crucial for developing numerically stable algorithms for solving large systems on computers, as round-off errors can accumulate.

## 11. Self-check questions

1.  Solve the following system using Gaussian elimination:
    $$
    \begin{cases}
    2x + y &= 8 \\
    x - 3y &= -3
    \end{cases}
    $$

2.  Determine if the following system has a unique solution, no solution, or infinitely many solutions. If it has a unique solution, find it. If it has infinitely many solutions, describe them using parameters.
    $$
    \begin{cases}
    x + 2y - z &= 2 \\
    2x + 4y - 2z &= 4 \\
    -x - 2y + z &= -2
    \end{cases}
    $$

3.  Solve the following system:
    $$
    \begin{cases}
    x_1 + x_2 + 2x_3 &= 8 \\
    -x_1 - 2x_2 + 3x_3 &= 1 \\
    3x_1 - 7x_2 + 4x_3 &= 10
    \end{cases}
    $$

4.  Consider the system:
    $$
    \begin{cases}
    x - y + z &= 1 \\
    2x - 2y + 3z &= 3 \\
    3x - 3y + az &= b
    \end{cases}
    $$
    For what values of $a$ and $b$ does the system have:
    a) No solution?
    b) Infinitely many solutions?
    c) A unique solution?

5.  A company produces three types of products, A, B, and C. Each product requires processing time on three different machines, M1, M2, and M3. The table below shows the time (in hours) each product requires on each machine, and the total available hours for each machine per week:

    | Product | M1 (hrs/unit) | M2 (hrs/unit) | M3 (hrs/unit) |
    | :------ | :------------ | :------------ | :------------ |
    | A       | 1             | 2             | 1             |
    | B       | 2             | 1             | 3             |
    | C       | 1             | 3             | 2             |
    | **Total Available Hours** | **10**          | **13**          | **13**          |

    Let $x_A, x_B, x_C$ be the number of units produced for products A, B, and C, respectively. Set up a system of linear equations representing the total machine hours used, and then use Gaussian elimination to find how many units of each product can be produced if all machine hours are fully utilized.