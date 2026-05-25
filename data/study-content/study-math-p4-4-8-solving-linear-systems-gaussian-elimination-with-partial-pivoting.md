## 1. What it is — in plain English

Imagine you have a bunch of puzzles, and each puzzle piece is a number. You have several such puzzles, and they are all connected, meaning the solution to one piece in one puzzle affects pieces in all the others. Your goal is to find the value of every single puzzle piece.

"Solving linear systems" means finding the values for a set of unknown numbers that satisfy a collection of straight-line equations. For example, if you know that "2 apples and 3 bananas cost $7" and "1 apple minus 1 banana costs $1," you have two equations with two unknowns (the price of an apple and the price of a banana). A linear system is just a fancy way of saying we have many such equations and many unknowns.

"Gaussian elimination" is a systematic recipe for solving these puzzles. It's like a chef methodically preparing ingredients: first, you organize all your numbers into a neat table (called a matrix), then you perform a series of allowed manipulations (like swapping rows or adding multiples of rows) to simplify the table until you can easily read off the solution for one unknown, then use that to find the others, and so on.

"Partial pivoting" is a crucial safety step in this recipe. Sometimes, during the simplification process, you might encounter a situation where you need to divide by a very tiny number, or even zero. Dividing by a tiny number can lead to wildly inaccurate results, like trying to measure something with a ruler that's almost entirely erased. Partial pivoting is like a chef carefully checking the quality of an ingredient before using it: it ensures you always divide by the largest possible number available in that step, making the calculations much more stable and reliable, preventing numerical errors from spiraling out of control.

## 2. Why it matters — real-world applications

Solving systems of linear equations is one of the most fundamental tasks in computational science and engineering. Gaussian elimination with partial pivoting is a workhorse algorithm because it's robust and widely applicable.

1.  **Aerospace Engineering & Stress Analysis:** When designing an aircraft wing or a bridge, engineers need to understand how forces distribute across the structure. They break the structure into many small elements (using methods like Finite Element Analysis, FEM), and the behavior of each element is described by linear equations. Combining these equations results in a massive linear system ($A\mathbf{x} = \mathbf{b}$) where $\mathbf{x}$ represents displacements or stresses. Solving this system accurately, often involving millions of equations, is critical for ensuring the safety and integrity of the design. Companies like Boeing or Airbus rely on these methods daily.

2.  **Machine Learning & Data Science:** Many machine learning algorithms, particularly in their optimization phases, boil down to solving linear systems. For instance, in linear regression, finding the "best fit" line or hyperplane involves minimizing a cost function, which often leads to a system of normal equations. More broadly, training neural networks involves adjusting weights, and while often solved with iterative methods, understanding the underlying linear algebra, and sometimes direct solvers like Gaussian elimination, is crucial for developing and debugging these algorithms. Even advanced techniques like Support Vector Machines (SVMs) or Principal Component Analysis (PCA) heavily leverage linear algebra.

3.  **Physics & Electrical Circuit Analysis:** In electrical engineering, Kirchhoff's laws (current and voltage laws) are used to model complex circuits. Applying these laws to a circuit with many resistors, capacitors, and inductors results in a system of linear equations where the unknowns are currents or voltages at various nodes. Accurately solving these systems is essential for designing and troubleshooting electronic devices, from simple consumer electronics to complex power grids. Similarly, in quantum mechanics, solving for energy levels of particles often involves eigenvalue problems that can be reduced to solving linear systems.

4.  **Economics & Input-Output Models:** Economists use linear systems to model the interdependencies between different sectors of an economy. Leontief input-output models, for example, describe how the output of one industry serves as input for others. Solving these systems helps economists understand how changes in demand in one sector can ripple through the entire economy, informing policy decisions and resource allocation.

5.  **Computer Graphics & Image Processing:** In 3D graphics, transformations (rotation, scaling, translation) are represented by matrices. When rendering complex scenes, or performing operations like ray tracing or light simulation, linear systems are frequently used to calculate object positions, light paths, and color values. For image processing, tasks like de-blurring or noise reduction can involve solving large linear systems that relate pixel values to their neighbors.

## 3. Prerequisites — what you must know first

Before diving deep into Gaussian elimination with partial pivoting, ensure you have a solid grasp of these foundational concepts:

*   **Basic Algebra:** The ability to manipulate equations, solve for a single unknown, and understand the properties of addition, subtraction, multiplication, and division.
*   **Systems of Linear Equations:** Understanding what a system like $2x + 3y = 7$ and $x - y = 1$ represents, and knowing basic methods to solve them (like substitution or simple elimination).
*   **Matrices:** Familiarity with what a matrix is, its dimensions, how to perform basic matrix operations (addition, scalar multiplication), and the concept of an augmented matrix.
*   **Matrix Multiplication:** Understanding how to multiply two matrices, and specifically how $A\mathbf{x} = \mathbf{b}$ represents a system of linear equations.
*   **Elementary Row Operations:** The three fundamental operations that can be performed on the rows of a matrix without changing the solution set of the underlying linear system:
    1.  Swapping two rows.
    2.  Multiplying a row by a non-zero scalar.
    3.  Adding a multiple of one row to another row.
*   **Determinants (Conceptual):** An understanding that the determinant of a square matrix tells us if a unique solution exists (non-zero determinant) or if the system is singular (zero determinant, meaning no unique solution or infinitely many solutions).
*   **Floating-Point Arithmetic (Conceptual):** An awareness that computers represent real numbers with finite precision, leading to potential round-off errors, and that operations with very small numbers can amplify these errors.

## 4. The core idea — step by step

Gaussian elimination with partial pivoting transforms a system of linear equations into an equivalent, simpler system that is easy to solve. The "equivalent" part is crucial: it means the new system has the exact same solutions as the original.

### Step 1: Represent the System as an Augmented Matrix

**Plain English:** First, we write down our system of equations in a compact, organized table called an "augmented matrix." This table just lists all the coefficients of our variables and the constant terms on the right-hand side. It's like taking all the numbers out of a recipe and putting them into a neat ingredient list.

**Small Concrete Example:**
Consider the system:
$$
\begin{cases}
2x_1 + 3x_2 = 7 \\
1x_1 - 1x_2 = 1
\end{cases}
$$
The augmented matrix would be:
$$
\begin{pmatrix}
2 & 3 & | & 7 \\
1 & -1 & | & 1
\end{pmatrix}
$$

**Formal/Mathematical Version:**
Given a system of $n$ linear equations in $n$ unknowns:
$$
\begin{cases}
a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + \dots + a_{2n}x_n = b_2 \\
\vdots \\
a_{n1}x_1 + a_{n2}x_2 + \dots + a_{nn}x_n = b_n
\end{cases}
$$
This can be written in matrix form as $A\mathbf{x} = \mathbf{b}$, where $A$ is the coefficient matrix, $\mathbf{x}$ is the vector of unknowns, and $\mathbf{b}$ is the constant vector. The augmented matrix is formed by appending $\mathbf{b}$ to $A$:
$$
[A|\mathbf{b}] = \begin{pmatrix}
a_{11} & a_{12} & \dots & a_{1n} & | & b_1 \\
a_{21} & a_{22} & \dots & a_{2n} & | & b_2 \\
\vdots & \vdots & \ddots & \vdots & | & \vdots \\
a_{n1} & a_{n2} & \dots & a_{nn} & | & b_n
\end{pmatrix}
$$

**What could go wrong:** Miscopying a coefficient, especially its sign, or placing a coefficient in the wrong column. Forgetting to account for missing variables (which have a coefficient of 0).

### Step 2: Gaussian Elimination (Forward Elimination) to Upper Triangular Form

**Plain English:** The main goal of this step is to transform the left side of our augmented matrix (the coefficient matrix $A$) into an "upper triangular" matrix. This means all the numbers *below* the main diagonal (the line from top-left to bottom-right) become zeros. We do this column by column, from left to right. For each column, we pick a "pivot" element on the diagonal, and then use it to eliminate (make zero) all the numbers below it in that column. It's like systematically clearing out sections of our puzzle table.

**Small Concrete Example (continuing from Step 1, without pivoting for now):**
From:
$$
\begin{pmatrix}
2 & 3 & | & 7 \\
1 & -1 & | & 1
\end{pmatrix}
$$
We want to make the '1' in the bottom-left corner a zero. Our pivot element for the first column is '2' (the $a_{11}$ element).
To make the '1' zero, we can multiply the first row by $-\frac{1}{2}$ and add it to the second row.
Operation: $R_2 \leftarrow R_2 - \frac{1}{2}R_1$
$$
\begin{pmatrix}
2 & 3 & | & 7 \\
1 - \frac{1}{2}(2) & -1 - \frac{1}{2}(3) & | & 1 - \frac{1}{2}(7)
\end{pmatrix}
=
\begin{pmatrix}
2 & 3 & | & 7 \\
0 & -1 - \frac{3}{2} & | & 1 - \frac{7}{2}
\end{pmatrix}
=
\begin{pmatrix}
2 & 3 & | & 7 \\
0 & -\frac{5}{2} & | & -\frac{5}{2}
\end{pmatrix}
$$
Now, the matrix is in upper triangular form.

**Formal/Mathematical Version:**
For each column $k$ from $1$ to $n-1$:
For each row $i$ from $k+1$ to $n$:
  Calculate the multiplier $m_{ik} = \frac{a_{ik}}{a_{kk}}$. (Here $a_{kk}$ is the pivot element).
  Perform the row operation: $R_i \leftarrow R_i - m_{ik}R_k$.
This operation simultaneously updates $a_{ij}$ for $j=k, \dots, n$ and $b_i$. The goal is to make $a_{ik}$ zero.

After this process, the original matrix $[A|\mathbf{b}]$ is transformed into an equivalent system $[U|\mathbf{c}]$ where $U$ is an upper triangular matrix:
$$
\begin{pmatrix}
u_{11} & u_{12} & \dots & u_{1n} & | & c_1 \\
0 & u_{22} & \dots & u_{2n} & | & c_2 \\
\vdots & \vdots & \ddots & \vdots & | & \vdots \\
0 & 0 & \dots & u_{nn} & | & c_n
\end{pmatrix}
$$

**What could go wrong:** Arithmetic errors are common. The biggest problem is if the pivot element $a_{kk}$ (the number we're dividing by) is zero or very close to zero. This leads us to the next step.

### Step 3: Partial Pivoting — The Safety Check

**Plain English:** Before we use a diagonal element as a pivot to eliminate numbers below it (as in Step 2), we first look down the current column (from the pivot row downwards). We find the row that has the number with the *largest absolute value* in that column. Then, we swap that row with the current pivot row. Why? Because dividing by a large number is numerically safer and more stable than dividing by a small number. It prevents huge round-off errors that can make our solution completely wrong. It's like making sure you use the strongest, most stable leg of a table as its support.

**Small Concrete Example:**
Suppose at some stage in a 3x3 system, our matrix looks like this, and we're about to process the second column (pivot element is $a_{22}$):
$$
\begin{pmatrix}
5 & 2 & 1 & | & 10 \\
0 & \mathbf{0.001} & 4 & | & 8 \\
0 & 3 & 2 & | & 7
\end{pmatrix}
$$
Our current pivot is $a_{22} = 0.001$. If we used this to eliminate the '3' below it, we'd divide by $0.001$, which is prone to large errors.
We look down the second column from the pivot row:
$|a_{22}| = |0.001| = 0.001$
$|a_{32}| = |3| = 3$
Since $3 > 0.001$, we swap Row 2 and Row 3:
Operation: $R_2 \leftrightarrow R_3$
$$
\begin{pmatrix}
5 & 2 & 1 & | & 10 \\
0 & \mathbf{3} & 2 & | & 7 \\
0 & 0.001 & 4 & | & 8
\end{pmatrix}
$$
Now, our pivot is '3', which is much better. We proceed with elimination using '3' as the pivot.

**Formal/Mathematical Version:**
At the beginning of processing column $k$ (i.e., before performing row operations to zero out elements $a_{ik}$ for $i > k$):
1.  Find an index $p$ such that $k \le p \le n$ and $|a_{pk}| = \max_{k \le i \le n} |a_{ik}|$. (This means finding the row $p$ with the largest absolute value in the $k$-th column, from row $k$ downwards).
2.  If $p \ne k$, swap row $k$ and row $p$: $R_k \leftrightarrow R_p$.
3.  If $a_{kk}$ (the new pivot element) is zero after pivoting, the system is singular and has no unique solution (or infinitely many). The algorithm typically terminates.

**What could go wrong:** Forgetting to perform pivoting. Incorrectly identifying the row with the largest absolute value (e.g., picking the largest value instead of largest *absolute* value, or looking in the wrong column/rows). Swapping the wrong rows.

### Step 4: Back Substitution — Solve for the Variables

**Plain English:** Once our matrix is in upper triangular form (meaning all numbers below the main diagonal are zero), we can easily solve for the variables. We start from the *last* equation (the bottom row), which will only have one unknown. We solve for that unknown, then plug its value into the *second to last* equation (the second from the bottom row), which now only has one unknown left. We continue this process, working our way up the matrix, until all variables are found. It's like solving a chain of simple puzzles, one after the other.

**Small Concrete Example (continuing from Step 2):**
Our upper triangular matrix is:
$$
\begin{pmatrix}
2 & 3 & | & 7 \\
0 & -\frac{5}{2} & | & -\frac{5}{2}
\end{pmatrix}
$$
This corresponds to the system:
$$
\begin{cases}
2x_1 + 3x_2 = 7 \\
0x_1 - \frac{5}{2}x_2 = -\frac{5}{2}
\end{cases}
$$
From the second equation:
$$
-\frac{5}{2}x_2 = -\frac{5}{2} \implies x_2 = 1
$$
Now substitute $x_2=1$ into the first equation:
$$
2x_1 + 3(1) = 7 \\
2x_1 + 3 = 7 \\
2x_1 = 4 \\
x_1 = 2
$$
So, the solution is $x_1=2, x_2=1$.

**Formal/Mathematical Version:**
Given the upper triangular system $U\mathbf{x} = \mathbf{c}$:
$$
\begin{cases}
u_{11}x_1 + u_{12}x_2 + \dots + u_{1n}x_n = c_1 \\
0x_1 + u_{22}x_2 + \dots + u_{2n}x_n = c_2 \\
\vdots \\
0x_1 + 0x_2 + \dots + u_{nn}x_n = c_n
\end{cases}
$$
Solve for $x_n$ from the last equation:
$$
x_n = \frac{c_n}{u_{nn}}
$$
Then, for $i = n-1, n-2, \dots, 1$:
$$
x_i = \frac{1}{u_{ii}} \left( c_i - \sum_{j=i+1}^{n} u_{ij}x_j \right)
$$
This formula means you take the constant term $c_i$, subtract all the terms involving already-found $x_j$ values ($j>i$), and then divide by the diagonal coefficient $u_{ii}$.

**What could go wrong:** Arithmetic errors during substitution. Incorrectly summing terms. Division by zero if $u_{ii}=0$ (which implies a singular system, usually caught during forward elimination if pivoting doesn't fix it).

## 5. Worked examples — multiple, with every step shown

### Example 1: A 2x2 system (No pivoting needed)

**Problem:** Solve the following system of linear equations:
$$
\begin{cases}
2x + y = 5 \\
4x - 3y = 5
\end{cases}
$$

**Given:** A system of two linear equations with two unknowns.
**Want:** The values of $x$ and $y$ that satisfy both equations.

**Step-by-step Solution:**

1.  **Form the augmented matrix:**
    $$
    \begin{pmatrix}
    2 & 1 & | & 5 \\
    4 & -3 & | & 5
    \end{pmatrix}
    $$
    *Explanation:* We write down the coefficients of $x$ and $y$ and the constant terms in a matrix format.

2.  **Forward Elimination (Column 1):**
    *   **Pivoting check:** Look at the first column. The elements are 2 and 4.
        $|2| = 2$, $|4| = 4$. Since $4 > 2$, we should swap Row 1 and Row 2 for partial pivoting.
        Operation: $R_1 \leftrightarrow R_2$
        $$
        \begin{pmatrix}
        4 & -3 & | & 5 \\
        2 & 1 & | & 5
        \end{pmatrix}
        $$
        *Explanation:* We swap rows to ensure the largest absolute value (4) is used as the pivot, improving numerical stability.
    *   **Eliminate $a_{21}$:** We want to make the '2' in the second row, first column, a zero. Our pivot is '4'.
        Multiplier $m_{21} = \frac{a_{21}}{a_{11}} = \frac{2}{4} = \frac{1}{2}$.
        Operation: $R_2 \leftarrow R_2 - \frac{1}{2}R_1$
        $$
        \begin{pmatrix}
        4 & -3 & | & 5 \\
        2 - \frac{1}{2}(4) & 1 - \frac{1}{2}(-3) & | & 5 - \frac{1}{2}(5)
        \end{pmatrix}
        $$
        $$
        \begin{pmatrix}
        4 & -3 & | & 5 \\
        0 & 1 + \frac{3}{2} & | & 5 - \frac{5}{2}
        \end{pmatrix}
        $$
        $$
        \begin{pmatrix}
        4 & -3 & | & 5 \\
        0 & \frac{5}{2} & | & \frac{5}{2}
        \end{pmatrix}
        $$
        *Explanation:* We subtract $\frac{1}{2}$ times the first row from the second row. This makes the element below the pivot in the first column zero, transforming the matrix into upper triangular form.

3.  **Back Substitution:**
    The augmented matrix corresponds to the system:
    $$
    \begin{cases}
    4x - 3y = 5 \\
    0x + \frac{5}{2}y = \frac{5}{2}
    \end{cases}
    $$
    *   From the second equation:
        $$
        \frac{5}{2}y = \frac{5}{2}
        $$
        $$
        y = \frac{5/2}{5/2}
        $$
        $$
        y = 1
        $$
        *Explanation:* The last equation has only one unknown ($y$), so we solve for it directly.
    *   Substitute $y=1$ into the first equation:
        $$
        4x - 3(1) = 5
        $$
        $$
        4x - 3 = 5
        $$
        $$
        4x = 5 + 3
        $$
        $$
        4x = 8
        $$
        $$
        x = \frac{8}{4}
        $$
        $$
        x = 2
        $$
        *Explanation:* We use the value of $y$ we just found and plug it into the equation above it, which now also has only one unknown ($x$).

**Final Answer:**
$$
\boxed{x=2, y=1}
$$

**Reflection:** This was a straightforward 2x2 system. Even though the initial pivot was not zero, partial pivoting correctly identified that swapping rows would use a larger pivot, demonstrating the principle even when not strictly necessary to avoid division by zero. The calculations were simple fractions.

---

### Example 2: A 3x3 system (Pivoting required once)

**Problem:** Solve the system:
$$
\begin{cases}
x_1 + x_2 + x_3 = 6 \\
2x_1 + 4x_2 + x_3 = 9 \\
-x_1 + 3x_2 - 2x_3 = 1
\end{cases}
$$

**Given:** A 3x3 system of linear equations.
**Want:** The values of $x_1, x_2, x_3$.

**Step-by-step Solution:**

1.  **Form the augmented matrix:**
    $$
    \begin{pmatrix}
    1 & 1 & 1 & | & 6 \\
    2 & 4 & 1 & | & 9 \\
    -1 & 3 & -2 & | & 1
    \end{pmatrix}
    $$

2.  **Forward Elimination (Column 1):**
    *   **Pivoting check:** Look at the first column: $|1|=1, |2|=2, |-1|=1$. The largest absolute value is 2, in Row 2.
        Operation: $R_1 \leftrightarrow R_2$
        $$
        \begin{pmatrix}
        2 & 4 & 1 & | & 9 \\
        1 & 1 & 1 & | & 6 \\
        -1 & 3 & -2 & | & 1
        \end{pmatrix}
        $$
        *Explanation:* Swap Row 1 and Row 2 to bring the largest absolute value (2) to the pivot position, ensuring numerical stability.
    *   **Eliminate $a_{21}$:** Pivot is 2. Multiplier $m_{21} = \frac{1}{2}$.
        Operation: $R_2 \leftarrow R_2 - \frac{1}{2}R_1$
        $$
        \begin{pmatrix}
        2 & 4 & 1 & | & 9 \\
        1 - \frac{1}{2}(2) & 1 - \frac{1}{2}(4) & 1 - \frac{1}{2}(1) & | & 6 - \frac{1}{2}(9) \\
        -1 & 3 & -2 & | & 1
        \end{pmatrix}
        $$
        $$
        \begin{pmatrix}
        2 & 4 & 1 & | & 9 \\
        0 & 1 - 2 & 1 - \frac{1}{2} & | & 6 - \frac{9}{2} \\
        -1 & 3 & -2 & | & 1
        \end{pmatrix}
        $$
        $$
        \begin{pmatrix}
        2 & 4 & 1 & | & 9 \\
        0 & -1 & \frac{1}{2} & | & \frac{3}{2} \\
        -1 & 3 & -2 & | & 1
        \end{pmatrix}
        $$
        *Explanation:* Make the element in $a_{21}$ zero.
    *   **Eliminate $a_{31}$:** Pivot is 2. Multiplier $m_{31} = \frac{-1}{2}$.
        Operation: $R_3 \leftarrow R_3 - (-\frac{1}{2})R_1 \implies R_3 \leftarrow R_3 + \frac{1}{2}R_1$
        $$
        \begin{pmatrix}
        2 & 4 & 1 & | & 9 \\
        0 & -1 & \frac{1}{2} & | & \frac{3}{2} \\
        -1 + \frac{1}{2}(2) & 3 + \frac{1}{2}(4) & -2 + \frac{1}{2}(1) & | & 1 + \frac{1}{2}(9)
        \end{pmatrix}
        $$
        $$
        \begin{pmatrix}
        2 & 4 & 1 & | & 9 \\
        0 & -1 & \frac{1}{2} & | & \frac{3}{2} \\
        0 & 3 + 2 & -2 + \frac{1}{2} & | & 1 + \frac{9}{2}
        \end{pmatrix}
        $$
        $$
        \begin{pmatrix}
        2 & 4 & 1 & | & 9 \\
        0 & -1 & \frac{1}{2} & | & \frac{3}{2} \\
        0 & 5 & -\frac{3}{2} & | & \frac{11}{2}
        \end{pmatrix}
        $$
        *Explanation:* Make the element in $a_{31}$ zero.

3.  **Forward Elimination (Column 2):**
    *   **Pivoting check:** Look at the second column from Row 2 downwards: $|-1|=1, |5|=5$. The largest absolute value is 5, in Row 3.
        Operation: $R_2 \leftrightarrow R_3$
        $$
        \begin{pmatrix}
        2 & 4 & 1 & | & 9 \\
        0 & 5 & -\frac{3}{2} & | & \frac{11}{2} \\
        0 & -1 & \frac{1}{2} & | & \frac{3}{2}
        \end{pmatrix}
        $$
        *Explanation:* Swap Row 2 and Row 3 to bring the largest absolute value (5) to the pivot position for the second column, ensuring numerical stability.
    *   **Eliminate $a_{32}$:** Pivot is 5. Multiplier $m_{32} = \frac{-1}{5}$.
        Operation: $R_3 \leftarrow R_3 - (-\frac{1}{5})R_2 \implies R_3 \leftarrow R_3 + \frac{1}{5}R_2$
        $$
        \begin{pmatrix}
        2 & 4 & 1 & | & 9 \\
        0 & 5 & -\frac{3}{2} & | & \frac{11}{2} \\
        0 & -1 + \frac{1}{5}(5) & \frac{1}{2} + \frac{1}{5}(-\frac{3}{2}) & | & \frac{3}{2} + \frac{1}{5}(\frac{11}{2})
        \end{pmatrix}
        $$
        $$
        \begin{pmatrix}
        2 & 4 & 1 & | & 9 \\
        0 & 5 & -\frac{3}{2} & | & \frac{11}{2} \\
        0 & 0 & \frac{1}{2} - \frac{3}{10} & | & \frac{3}{2} + \frac{11}{10}
        \end{pmatrix}
        $$
        $$
        \begin{pmatrix}
        2 & 4 & 1 & | & 9 \\
        0 & 5 & -\frac{3}{2} & | & \frac{11}{2} \\
        0 & 0 & \frac{5}{10} - \frac{3}{10} & | & \frac{15}{10} + \frac{11}{10}
        \end{pmatrix}
        $$
        $$
        \begin{pmatrix}
        2 & 4 & 1 & | & 9 \\
        0 & 5 & -\frac{3}{2} & | & \frac{11}{2} \\
        0 & 0 & \frac{2}{10} & | & \frac{26}{10}
        \end{pmatrix}
        $$
        $$
        \begin{pmatrix}
        2 & 4 & 1 & | & 9 \\
        0 & 5 & -\frac{3}{2} & | & \frac{11}{2} \\
        0 & 0 & \frac{1}{5} & | & \frac{13}{5}
        \end{pmatrix}
        $$
        *Explanation:* Make the element in $a_{32}$ zero. The matrix is now in upper triangular form.

4.  **Back Substitution:**
    The system is:
    $$
    \begin{cases}
    2x_1 + 4x_2 + x_3 = 9 \\
    5x_2 - \frac{3}{2}x_3 = \frac{11}{2} \\
    \frac{1}{5}x_3 = \frac{13}{5}
    \end{cases}
    $$
    *   From the third equation:
        $$
        \frac{1}{5}x_3 = \frac{13}{5} \implies x_3 = 13
        $$
        *Explanation:* Solve for $x_3$.
    *   Substitute $x_3=13$ into the second equation:
        $$
        5x_2 - \frac{3}{2}(13) = \frac{11}{2}
        $$
        $$
        5x_2 - \frac{39}{2} = \frac{11}{2}
        $$
        $$
        5x_2 = \frac{11}{2} + \frac{39}{2}
        $$
        $$
        5x_2 = \frac{50}{2}
        $$
        $$
        5x_2 = 25
        $$
        $$
        x_2 = 5
        $$
        *Explanation:* Substitute $x_3$ into the second equation and solve for $x_2$.
    *   Substitute $x_3=13$ and $x_2=5$ into the first equation:
        $$
        2x_1 + 4(5) + 13 = 9
        $$
        $$
        2x_1 + 20 + 13 = 9
        $$
        $$
        2x_1 + 33 = 9
        $$
        $$
        2x_1 = 9 - 33
        $$
        $$
        2x_1 = -24
        $$
        $$
        x_1 = -12
        $$
        *Explanation:* Substitute $x_2$ and $x_3$ into the first equation and solve for $x_1$.

**Final Answer:**
$$
\boxed{x_1=-12, x_2=5, x_3=13}
$$

**Reflection:** This example involved more steps and fractions. Partial pivoting was crucial in both column elimination steps to ensure the largest possible pivot was used, even when a zero wasn't present. This highlights the importance of pivoting for general numerical stability, not just to avoid division by zero.

---

### Example 3: A 3x3 system (Demonstrating a "near-singular" case)

**Problem:** Solve the system:
$$
\begin{cases}
0.001x_1 + 2x_2 + 3x_3 = 1 \\
-1x_1 + 3x_2 - 2x_3 = 2 \\
2x_1 + 1x_2 + 1x_3 = 3
\end{cases}
$$
(This system is designed to show the importance of pivoting with small numbers.)

**Given:** A 3x3 system with a very small coefficient on the diagonal.
**Want:** The values of $x_1, x_2, x_3$.

**Step-by-step Solution:**

1.  **Form the augmented matrix:**
    $$
    \begin{pmatrix}
    0.001 & 2 & 3 & | & 1 \\
    -1 & 3 & -2 & | & 2 \\
    2 & 1 & 1 & | & 3
    \end{pmatrix}
    $$

2.  **Forward Elimination (Column 1):**
    *   **Pivoting check:** Look at the first column: $|0.001|=0.001, |-1|=1, |2|=2$. The largest absolute value is 2, in Row 3.
        Operation: $R_1 \leftrightarrow R_3$
        $$
        \begin{pmatrix}
        2 & 1 & 1 & | & 3 \\
        -1 & 3 & -2 & | & 2 \\
        0.001 & 2 & 3 & | & 1
        \end{pmatrix}
        $$
        *Explanation:* We swap Row 1 and Row 3. If we hadn't, we'd be dividing by 0.001, which is numerically unstable.
    *   **Eliminate $a_{21}$:** Pivot is 2. Multiplier $m_{21} = \frac{-1}{2} = -0.5$.
        Operation: $R_2 \leftarrow R_2 - (-0.5)R_1 \implies R_2 \leftarrow R_2 + 0.5R_1$
        $$
        \begin{pmatrix}
        2 & 1 & 1 & | & 3 \\
        -1 + 0.5(2) & 3 + 0.5(1) & -2 + 0.5(1) & | & 2 + 0.5(3) \\
        0.001 & 2 & 3 & | & 1
        \end{pmatrix}
        $$
        $$
        \begin{pmatrix}
        2 & 1 & 1 & | & 3 \\
        0 & 3.5 & -1.5 & | & 3.5 \\
        0.001 & 2 & 3 & | & 1
        \end{pmatrix}
        $$
        *Explanation:* Make element $a_{21}$ zero.
    *   **Eliminate $a_{31}$:** Pivot is 2. Multiplier $m_{31} = \frac{0.001}{2} = 0.0005$.
        Operation: $R_3 \leftarrow R_3 - 0.0005R_1$
        $$
        \begin{pmatrix}
        2 & 1 & 1 & | & 3 \\
        0 & 3.5 & -1.5 & | & 3.5 \\
        0.001 - 0.0005(2) & 2 - 0.0005(1) & 3 - 0.0005(1) & | & 1 - 0.0005(3)
        \end{pmatrix}
        $$
        $$
        \begin{pmatrix}
        2 & 1 & 1 & | & 3 \\
        0 & 3.5 & -1.5 & | & 3.5 \\
        0 & 1.9995 & 2.9995 & | & 0.9985
        \end{pmatrix}
        $$
        *Explanation:* Make element $a_{31}$ zero.

3.  **Forward Elimination (Column 2):**
    *   **Pivoting check:** Look at the second column from Row 2 downwards: $|3.5|=3.5, |1.9995|=1.9995$. The largest absolute value is 3.5, in Row 2. No swap needed.
        *Explanation:* The current pivot (3.5) is already the largest in its column below it.
    *   **Eliminate $a_{32}$:** Pivot is 3.5. Multiplier $m_{32} = \frac{1.9995}{3.5} \approx 0.5712857$.
        Operation: $R_3 \leftarrow R_3 - m_{32}R_2$
        $$
        \begin{pmatrix}
        2 & 1 & 1 & | & 3 \\
        0 & 3.5 & -1.5 & | & 3.5 \\
        0 & 1.9995 - m_{32}(3.5) & 2.9995 - m_{32}(-1.5) & | & 0.9985 - m_{32}(3.5)
        \end{pmatrix}
        $$
        $$
        \begin{pmatrix}
        2 & 1 & 1 & | & 3 \\
        0 & 3.5 & -1.5 & | & 3.5 \\
        0 & 0 & 2.9995 - (0.5712857)(-1.5) & | & 0.9985 - (0.5712857)(3.5)
        \end{pmatrix}
        $$
        $$
        \begin{pmatrix}
        2 & 1 & 1 & | & 3 \\
        0 & 3.5 & -1.5 & | & 3.5 \\
        0 & 0 & 2.9995 + 0.85692855 & | & 0.9985 - 1.9995
        \end{pmatrix}
        $$
        $$
        \begin{pmatrix}
        2 & 1 & 1 & | & 3 \\
        0 & 3.5 & -1.5 & | & 3.5 \\
        0 & 0 & 3.85642855 & | & -1.001
        \end{pmatrix}
        $$
        *Explanation:* Make element $a_{32}$ zero. The matrix is now in upper triangular form. Note the use of floating-point numbers and potential for small errors.

4.  **Back Substitution:**
    The system is approximately:
    $$
    \begin{cases}
    2x_1 + x_2 + x_3 = 3 \\
    3.5x_2 - 1.5x_3 = 3.5 \\
    3.85642855x_3 = -1.001
    \end{cases}
    $$
    *   From the third equation:
        $$
        x_3 = \frac{-1.001}{3.85642855} \approx -0.259569
        $$
        *Explanation:* Solve for $x_3$.
    *   Substitute $x_3 \approx -0.259569$ into the second equation:
        $$
        3.5x_2 - 1.5(-0.259569) = 3.5
        $$
        $$
        3.5x_2 + 0.3893535 = 3.5
        $$
        $$
        3.5x_2 = 3.5 - 0.3893535
        $$
        $$
        3.5x_2 = 3.1106465
        $$
        $$
        x_2 = \frac{3.1106465}{3.5} \approx 0.888756
        $$
        *Explanation:* Substitute $x_3$ into the second equation and solve for $x_2$.
    *   Substitute $x_3 \approx -0.259569$ and $x_2 \approx 0.888756$ into the first equation:
        $$
        2x_1 + 0.888756 + (-0.259569) = 3
        $$
        $$
        2x_1 + 0.629187 = 3
        $$
        $$
        2x_1 = 3 - 0.629187
        $$
        $$
        2x_1 = 2.370813
        $$
        $$
        x_1 = \frac{2.370813}{2} \approx 1.1854065
        $$
        *Explanation:* Substitute $x_2$ and $x_3$ into the first equation and solve for $x_1$.

**Final Answer (approximate due to floating point):**
$$
\boxed{x_1 \approx 1.1854, x_2 \approx 0.8888, x_3 \approx -0.2596}
$$

**Reflection:** This example clearly demonstrates the critical role of partial pivoting. Without the initial row swap, the first pivot would have been 0.001. Dividing by this small number would have led to much larger round-off errors and a significantly less accurate solution. Even with pivoting, working with floating-point numbers inherently introduces small errors, which accumulate.

---

### Example 4: A 4x4 system (Multiple pivots, more complex fractions)

**Problem:** Solve the system:
$$
\begin{cases}
x_1 + 2x_2 - x_3 + 3x_4 = 10 \\
2x_1 + 5x_2 + 0x_3 + 8x_4 = 23 \\
-x_1 - 3x_2 + 2x_3 + 0x_4 = -8 \\
3x_1 + 7x_2 - 2x_3 + 9x_4 = 30
\end{cases}
$$

**Given:** A 4x4 system of linear equations.
**Want:** The values of $x_1, x_2, x_3, x_4$.

**Step-by-step Solution:**

1.  **Form the augmented matrix:**
    $$
    \begin{pmatrix}
    1 & 2 & -1 & 3 & | & 10 \\
    2 & 5 & 0 & 8 & | & 23 \\
    -1 & -3 & 2 & 0 & | & -8 \\
    3 & 7 & -2 & 9 & | & 30
    \end{pmatrix}
    $$

2.  **Forward Elimination (Column 1):**
    *   **Pivoting check:** Column 1 elements: $|1|=1, |2|=2, |-1|=1, |3|=3$. Largest is 3 in Row 4.
        Operation: $R_1 \leftrightarrow R_4$
        $$
        \begin{pmatrix}
        3 & 7 & -2 & 9 & | & 30 \\
        2 & 5 & 0 & 8 & | & 23 \\
        -1 & -3 & 2 & 0 & | & -8 \\
        1 & 2 & -1 & 3 & | & 10
        \end{pmatrix}
        $$
    *   **Eliminate $a_{21}$:** Pivot is 3. $m_{21} = \frac{2}{3}$. Operation: $R_2 \leftarrow R_2 - \frac{2}{3}R_1$
        $$
        R_2 \leftarrow \begin{pmatrix} 2 - \frac{2}{3}(3) & 5 - \frac{2}{3}(7) & 0 - \frac{2}{3}(-2) & 8 - \frac{2}{3}(9) & | & 23 - \frac{2}{3}(30) \end{pmatrix} \\
        R_2 \leftarrow \begin{pmatrix} 0 & 5 - \frac{14}{3} & 0 + \frac{4}{3} & 8 - 6 & | & 23 - 20 \end{pmatrix} \\
        R_2 \leftarrow \begin{pmatrix} 0 & \frac{1}{3} & \frac{4}{3} & 2 & | & 3 \end{pmatrix}
        $$
    *   **Eliminate $a_{31}$:** Pivot is 3. $m_{31} = \frac{-1}{3}$. Operation: $R_3 \leftarrow R_3 - (-\frac{1}{3})R_1 \implies R_3 \leftarrow R_3 + \frac{1}{3}R_1$
        $$
        R_3 \leftarrow \begin{pmatrix} -1 + \frac{1}{3}(3) & -3 + \frac{1}{3}(7) & 2 + \frac{1}{3}(-2) & 0 + \frac{1}{3}(9) & | & -8 + \frac{1}{3}(30) \end{pmatrix} \\
        R_3 \leftarrow \begin{pmatrix} 0 & -3 + \frac{7}{3} & 2 - \frac{2}{3} & 0 + 3 & | & -8 + 10 \end{pmatrix} \\
        R_3 \leftarrow \begin{pmatrix} 0 & -\frac{2}{3} & \frac{4}{3} & 3 & | & 2 \end{pmatrix}
        $$
    *   **Eliminate $a_{41}$:** Pivot is 3. $m_{41} = \frac{1}{3}$. Operation: $R_4 \leftarrow R_4 - \frac{1}{3}R_1$
        $$
        R_4 \leftarrow \begin{pmatrix} 1 - \frac{1}{3}(3) & 2 - \frac{1}{3}(7) & -1 - \frac{1}{3}(-2) & 3 - \frac{1}{3}(9) & | & 10 - \frac{1}{3}(30) \end{pmatrix} \\
        R_4 \leftarrow \begin{pmatrix} 0 & 2 - \frac{7}{3} & -1 + \frac{2}{3} & 3 - 3 & | & 10 - 10 \end{pmatrix} \\
        R_4 \leftarrow \begin{pmatrix} 0 & -\frac{1}{3} & -\frac{1}{3} & 0 & | & 0 \end{pmatrix}
        $$
    Current matrix:
    $$
    \begin{pmatrix}
    3 & 7 & -2 & 9 & | & 30 \\
    0 & \frac{1}{3} & \frac{4}{3} & 2 & | & 3 \\
    0 & -\frac{2}{3} & \frac{4}{3} & 3 & | & 2 \\
    0 & -\frac{1}{3} & -\frac{1}{3} & 0 & | & 0
    \end{pmatrix}
    $$

3.  **Forward Elimination (Column 2):**
    *   **Pivoting check:** Column 2 elements (from R2 downwards): $|\frac{1}{3}|=\frac{1}{3}, |-\frac{2}{3}|=\frac{2}{3}, |-\frac{1}{3}|=\frac{1}{3}$. Largest is $\frac{2}{3}$ in Row 3.
        Operation: $R_2 \leftrightarrow R_3$
        $$
        \begin{pmatrix}
        3 & 7 & -2 & 9 & | & 30 \\
        0 & -\frac{2}{3} & \frac{4}{3} & 3 & | & 2 \\
        0 & \frac{1}{3} & \frac{4}{3} & 2 & | & 3 \\
        0 & -\frac{1}{3} & -\frac{1}{3} & 0 & | & 0
        \end{pmatrix}
        $$
    *   **Eliminate $a_{32}$:** Pivot is $-\frac{2}{3}$. $m_{32} = \frac{1/3}{-2/3} = -\frac{1}{2}$. Operation: $R_3 \leftarrow R_3 - (-\frac{1}{2})R_2 \implies R_3 \leftarrow R_3 + \frac{1}{2}R_2$
        $$
        R_3 \leftarrow \begin{pmatrix} 0 & \frac{1}{3} + \frac{1}{2}(-\frac{2}{3}) & \frac{4}{3} + \frac{1}{2}(\frac{4}{3}) & 2 + \frac{1}{2}(3) & | & 3 + \frac{1}{2}(2) \end{pmatrix} \\
        R_3 \leftarrow \begin{pmatrix} 0 & \frac{1}{3} - \frac{1}{3} & \frac{4}{3} + \frac{2}{3} & 2 + \frac{3}{2} & | & 3 + 1 \end{pmatrix} \\
        R_3 \leftarrow \begin{pmatrix} 0 & 0 & \frac{6}{3} & \frac{7}{2} & | & 4 \end{pmatrix} \\
        R_3 \leftarrow \begin{pmatrix} 0 & 0 & 2 & \frac{7}{2} & | & 4 \end{pmatrix}
        $$
    *   **Eliminate $a_{42}$:** Pivot is $-\frac{2}{3}$. $m_{42} = \frac{-1/3}{-2/3} = \frac{1}{2}$. Operation: $R_4 \leftarrow R_4 - \frac{1}{2}R_2$
        $$
        R_4 \leftarrow \begin{pmatrix} 0 & -\frac{1}{3} - \frac{1}{2}(-\frac{2}{3}) & -\frac{1}{3} - \frac{1}{2}(\frac{4}{3}) & 0 - \frac{1}{2}(3) & | & 0 - \frac{1}{2}(2) \end{pmatrix} \\
        R_4 \leftarrow \begin{pmatrix} 0 & -\frac{1}{3} + \frac{1}{3} & -\frac{1}{3} - \frac{2}{3} & -\frac{3}{2} & | & -1 \end{pmatrix} \\
        R_4 \leftarrow \begin{pmatrix} 0 & 0 & -\frac{3}{3} & -\frac{3}{2} & | & -1 \end{pmatrix} \\
        R_4 \leftarrow \begin{pmatrix} 0 & 0 & -1 & -\frac{3}{2} & | & -1 \end{pmatrix}
        $$
    Current matrix:
    $$
    \begin{pmatrix}
    3 & 7 & -2 & 9 & | & 30 \\
    0 & -\frac{2}{3} & \frac{4}{3} & 3 & | & 2 \\
    0 & 0 & 2 & \frac{7}{2} & | & 4 \\
    0 & 0 & -1 & -\frac{3}{2} & | & -1
    \end{pmatrix}
    $$

4.  **Forward Elimination (Column 3):**
    *   **Pivoting check:** Column 3 elements (from R3 downwards): $|2|=2, |-1|=1$. Largest is 2 in Row 3. No swap needed.
    *   **Eliminate $a_{43}$:** Pivot is 2. $m_{43} = \frac{-1}{2}$. Operation: $R_4 \leftarrow R_4 - (-\frac{1}{2})R_3 \implies R_4 \leftarrow R_4 + \frac{1}{2}R_3$
        $$
        R_4 \leftarrow \begin{pmatrix} 0 & 0 & -1 + \frac{1}{2}(2) & -\frac{3}{2} + \frac{1}{2}(\frac{7}{2}) & | & -1 + \frac{1}{2}(4) \end{pmatrix} \\
        R_4 \leftarrow \begin{pmatrix} 0 & 0 & -1 + 1 & -\frac{3}{2} + \frac{7}{4} & | & -1 + 2 \end{pmatrix} \\
        R_4 \leftarrow \begin{pmatrix} 0 & 0 & 0 & -\frac{6}{4} + \frac{7}{4} & | & 1 \end{pmatrix} \\
        R_4 \leftarrow \begin{pmatrix} 0 & 0 & 0 & \frac{1}{4} & | & 1 \end{pmatrix}
        $$
    Final upper triangular matrix:
    $$
    \begin{pmatrix}
    3 & 7 & -2 & 9 & | & 30 \\
    0 & -\frac{2}{3} & \frac{4}{3} & 3 & | & 2 \\
    0 & 0 & 2 & \frac{7}{2} & | & 4 \\
    0 & 0 & 0 & \frac{1}{4} & | & 1
    \end{pmatrix}
    $$

5.  **Back Substitution:**
    The system is:
    $$
    \begin{cases}
    3x_1 + 7x_2 - 2x_3 + 9x_4 = 30 \\
    -\frac{2}{3}x_2 + \frac{4}{3}x_3 + 3x_4 = 2 \\
    2x_3 + \frac{7}{2}x_4 = 4 \\
    \frac{1}{4}x_4 = 1
    \end{cases}
    $$
    *   From the fourth equation:
        $$
        \frac{1}{4}x_4 = 1 \implies x_4 = 4
        $$
    *   Substitute $x_4=4$ into the third equation:
        $$
        2x_3 + \frac{7}{2}(4) = 4 \\
        2x_3 + 14 = 4 \\
        2x_3 = -10 \\
        x_3 = -5
        $$
    *   Substitute $x_4=4, x_3=-5$ into the second equation:
        $$
        -\frac{2}{3}x_2 + \frac{4}{3}(-5) + 3(4) = 2 \\
        -\frac{2}{3}x_2 - \frac{20}{3} + 12 = 2 \\
        -\frac{2}{3}x_2 = 2 + \frac{20}{3} - 12 \\
        -\frac{2}{3}x_2 = -10 + \frac{20}{3} \\
        -\frac{2}{3}x_2 = -\frac{30}{3} + \frac{20}{3} \\
        -\frac{2}{3}x_2 = -\frac{10}{3} \\
        x_2 = \frac{-10/3}{-2/3} \\
        x_2 = 5
        $$
    *   Substitute $x_4=4, x_3=-5, x_2=5$ into the first equation:
        $$
        3x_1 + 7(5) - 2(-5) + 9(4) = 30 \\
        3x_1 + 35 + 10 + 36 = 30 \\
        3x_1 + 81 = 30 \\
        3x_1 = 30 - 81 \\
        3x_1 = -51 \\
        x_1 = -17
        $$

**Final Answer:**
$$
\boxed{x_1=-17, x_2=5, x_3=-5, x_4=4}
$$

**Reflection:** This 4x4 example shows the full process, requiring multiple pivoting steps and careful management of fractions. The increased size of the system magnifies the potential for arithmetic errors, underscoring the need for meticulous calculation and the systematic nature of the algorithm.

## 6. Common mistakes and traps

1.  **Forgetting Partial Pivoting:** Students often omit the pivoting step, especially when the initial diagonal element isn't zero. This can lead to highly inaccurate results due to division by small numbers, even if not directly zero.
2.  **Arithmetic Errors:** Gaussian elimination involves many additions, subtractions, and multiplications, especially with fractions or decimals. A single error propagates through subsequent steps, rendering the final answer incorrect.
3.  **Applying Row Operations Incorrectly to the Augmented Column:** Remember that every elementary row operation must be applied to the entire row, including the elements in the augmented part (the right-hand side constant vector). Forgetting to update these values is a common oversight.
4.  **Sign Errors:** Negative signs are notorious for causing mistakes. Be extra careful when calculating multipliers or performing subtractions, especially when dealing with double negatives.
5.  **Incorrectly Identifying the Pivot:** When performing partial pivoting, students might mistakenly choose the largest *value* in the column instead of the largest *absolute value*. Or they might look in the wrong rows (e.g., above the current pivot row, which is already processed).
6.  **Premature Simplification/Rounding:** In numerical methods, it's often best to carry as many decimal places as possible (or work with fractions) until the very end to minimize round-off error accumulation. Rounding intermediate results too early can significantly affect accuracy.

## 7. Textbook-precise explanation

Gaussian elimination with partial pivoting is a direct method for solving a system of $n$ linear equations in $n$ unknowns, $A\mathbf{x} = \mathbf{b}$. The algorithm proceeds in two main phases: forward elimination and back substitution, with partial pivoting employed during forward elimination to enhance numerical stability.

Let $A$ be an $n \times n$ coefficient matrix and $\mathbf{b}$ be an $n \times 1$ column vector. We form the augmented matrix $[A|\mathbf{b}]$.

**I. Forward Elimination Phase:**
The goal is to transform $[A|\mathbf{b}]$ into an equivalent upper triangular system $[U|\mathbf{c}]$ using elementary row operations. This phase iterates for $k = 1, 2, \dots, n-1$.

For each column $k$:
1.  **Partial Pivoting:**
    *   Find an integer $p$ such that $k \le p \le n$ and $|a_{pk}^{(k)}| = \max_{k \le i \le n} |a_{ik}^{(k)}|$. Here, $a_{ik}^{(k)}$ denotes the element in row $i$, column $k$ at the beginning of step $k$.
    *   If $