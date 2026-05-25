## What it is
Cramer's rule is an explicit formula for finding the unique solution to a system of linear equations, provided a solution exists. It expresses each variable in the solution vector as a ratio of two determinants. The denominator is the determinant of the coefficient matrix, and the numerator is the determinant of that same matrix with one of its columns replaced by the constant vector from the equation.

## Why it matters
While computationally inefficient for large systems compared to Gaussian elimination, Cramer's rule is a powerful theoretical tool. It appears in proofs in advanced differential equations (e.g., variation of parameters for solving non-homogeneous ODEs) and control theory. In physics and engineering, it provides an explicit expression showing how the solution to a system depends on its parameters, which is useful for sensitivity analysis.

## When to study it
You must be proficient with computing determinants of $n \times n$ matrices and understand their properties, particularly multilinearity. You should also be comfortable with representing a system of linear equations in the matrix form $A\mathbf{x} = \mathbf{b}$ and understand the condition for a unique solution, namely that the coefficient matrix $A$ must be invertible, which is equivalent to $\det(A) \neq 0$.

## How to study it (step by step)
1.  **Derive for 2x2:** Take a general system $a_{11}x_1 + a_{12}x_2 = b_1$ and $a_{21}x_1 + a_{22}x_2 = b_2$. Solve for $x_1$ using simple elimination. Observe how the resulting expression can be written as a ratio of determinants.
2.  **Connect to the Inverse Matrix:** Recall the formula for the inverse of a matrix using its adjugate: $A^{-1} = \frac{1}{\det(A)}\text{adj}(A)$. Start with the solution $\mathbf{x} = A^{-1}\mathbf{b}$ and substitute this formula.
3.  **Generalize the Derivation:** Write out the product $\mathbf{x} = \frac{1}{\det(A)}(\text{adj}(A))\mathbf{b}$. Focus on the $i$-th component, $x_i$. Show that the $i$-th entry of the vector $(\text{adj}(A))\mathbf{b}$ is precisely the cofactor expansion of the determinant of the matrix $A_i$ (where column $i$ of $A$ is replaced by $\mathbf{b}$). This proves the general rule.
4.  **Solve a 3x3 System:** Find a 3x3 system of equations online or in a textbook. Solve it step-by-step using Cramer's rule. Calculate the four required determinants ($\det(A)$, $\det(A_1)$, $\det(A_2)$, $\det(A_3)$) by hand.
5.  **Analyze Complexity:** Compare the number of multiplications required to solve an $n \times n$ system using Cramer's rule (which involves computing $n+1$ determinants) versus Gaussian elimination. This will solidify *why* it's a theoretical tool, not a practical algorithm for large $n$.

## Key ideas, with intuition
1.  **Solution as a Ratio:** The core idea is that each component $x_i$ of the solution vector is a fraction.
    $$x_i = \frac{\det(A_i)}{\det(A)}$$
    This structure immediately tells you that if the determinant of the coefficient matrix $A$ is zero, you cannot use this rule. This aligns with what we already know: if $\det(A)=0$, the system does not have a unique solution.

2.  **Replacing the Column:** The "magic" is in the numerator. To find the value for the $i$-th variable, $x_i$, you replace the $i$-th column of the coefficient matrix $A$ with the vector of constants $\mathbf{b}$. This new matrix is called $A_i$.

    *Intuition:* Consider the equation $A\mathbf{x} = \mathbf{b}$, which is $x_1\mathbf{a}_1 + x_2\mathbf{a}_2 + \dots + x_n\mathbf{a}_n = \mathbf{b}$, where $\mathbf{a}_i$ are the column vectors of $A$. You are expressing $\mathbf{b}$ as a linear combination of the columns of $A$. The determinant can be seen as a signed volume. The formula $x_i = \det(A_i)/\det(A)$ relates the "volume" of the parallelepiped formed by the columns of $A$ to the volume of one formed by replacing a basis vector $\mathbf{a}_i$ with the target vector $\mathbf{b}$. The ratio gives the necessary scaling factor $x_i$ for that basis vector.

3.  **The Derivation is the Proof:** The rule is not arbitrary; it falls directly out of the definition of the matrix inverse. The solution to $A\mathbf{x}=\mathbf{b}$ is $\mathbf{x} = A^{-1}\mathbf{b}$. Using the adjugate formula $A^{-1} = \frac{1}{\det(A)}\text{adj}(A)$, we get:
    $$\mathbf{x} = \frac{1}{\det(A)}\begin{pmatrix} C_{11} & C_{21} & \dots & C_{n1} \\ C_{12} & C_{22} & \dots & C_{n2} \\ \vdots & \vdots & \ddots & \vdots \\ C_{1n} & C_{2n} & \dots & C_{nn} \end{pmatrix} \begin{pmatrix} b_1 \\ b_2 \\ \vdots \\ b_n \end{pmatrix}$$
    where $C_{ji}$ is the cofactor of the entry $a_{ji}$. The $i$-th component $x_i$ is $\frac{1}{\det(A)}\sum_{j=1}^n C_{ji}b_j$. This sum is exactly the cofactor expansion along the $i$-th column of the matrix $A_i$, which is $\det(A_i)$.

## Worked example
Solve the following system using Cramer's rule:
$$
\begin{cases}
2x + y - z = 3 \\
x - y + z = 0 \\
x + 2y + z = 3
\end{cases}
$$

**Step 1: Write the system in matrix form $A\mathbf{x} = \mathbf{b}$.**
$$
A = \begin{pmatrix} 2 & 1 & -1 \\ 1 & -1 & 1 \\ 1 & 2 & 1 \end{pmatrix}, \quad \mathbf{x} = \begin{pmatrix} x \\ y \\ z \end{pmatrix}, \quad \mathbf{b} = \begin{pmatrix} 3 \\ 0 \\ 3 \end{pmatrix}
$$

**Step 2: Calculate the determinant of the coefficient matrix, $\det(A)$.**
$$
\det(A) = 2\begin{vmatrix} -1 & 1 \\ 2 & 1 \end{vmatrix} - 1\begin{vmatrix} 1 & 1 \\ 1 & 1 \end{vmatrix} + (-1)\begin{vmatrix} 1 & -1 \\ 1 & 2 \end{vmatrix}
$$
$$
\det(A) = 2(-1 - 2) - 1(1 - 1) - 1(2 - (-1)) = 2(-3) - 0 - 1(3) = -6 - 3 = -9
$$
Since $\det(A) \neq 0$, a unique solution exists.

**Step 3: Calculate the determinants of $A_x, A_y, A_z$.**
To find $x$, replace the first column of $A$ with $\mathbf{b}$:
$$
A_x = \begin{pmatrix} 3 & 1 & -1 \\ 0 & -1 & 1 \\ 3 & 2 & 1 \end{pmatrix} \implies \det(A_x) = 3(-1-2) - 1(0-3) -1(0 - (-3)) = -9 + 3 - 3 = -9
$$
To find $y$, replace the second column of $A$ with $\mathbf{b}$:
$$
A_y = \begin{pmatrix} 2 & 3 & -1 \\ 1 & 0 & 1 \\ 1 & 3 & 1 \end{pmatrix} \implies \det(A_y) = 2(0-3) - 3(1-1) -1(3-0) = -6 - 0 - 3 = -9
$$
To find $z$, replace the third column of $A$ with $\mathbf{b}$:
$$
A_z = \begin{pmatrix} 2 & 1 & 3 \\ 1 & -1 & 0 \\ 1 & 2 & 3 \end{pmatrix} \implies \det(A_z) = 2(-3-0) - 1(3-0) + 3(2 - (-1)) = -6 - 3 + 9 = 0
$$

**Step 4: Find the solution.**
$$
x = \frac{\det(A_x)}{\det(A)} = \frac{-9}{-9} = 1
$$
$$
y = \frac{\det(A_y)}{\det(A)} = \frac{-9}{-9} = 1
$$
$$
z = \frac{\det(A_z)}{\det(A)} = \frac{0}{-9} = 0
$$
The solution is $(x, y, z) = (1, 1, 0)$.

*Reflection:* Each step was a direct application of the formula. The process is mechanical: identify $A$ and $\mathbf{b}$, compute $\det(A)$ to ensure a unique solution exists, then systematically form each $A_i$ by swapping a column, compute its determinant, and finally divide to find the corresponding variable.

## Diagrams
The core operation of Cramer's Rule is replacing a column. For a system $A\mathbf{x} = \mathbf{b}$ with $n=3$:

```text
        [a11 a12 a13]         [b1]
    A = [a21 a22 a23]     b = [b2]
        [a31 a32 a33]         [b3]

To find x1 (or x):
Replace column 1 of A with b
        [b1 a12 a13]
   A1 = [b2 a22 a23]
        [b3 a32 a33]
   x1 = det(A1) / det(A)

To find x2 (or y):
Replace column 2 of A with b
        [a11 b1 a13]
   A2 = [a21 b2 a23]
        [a31 b3 a33]
   x2 = det(A2) / det(A)

And so on for x3 (or z)...
```

## Memory technique — remember this forever
1.  **Visual Hook:** Picture your coefficient matrix $A$. To solve for the variable $x_i$, you physically grab the column vector $\mathbf{b}$ and *slam it into* the $i$-th column of $A$, knocking the original column out. You now have a new matrix, $A_i$. The solution for $x_i$ is just the ratio of the determinants of the "slammed" matrix to the original.

2.  **Formulas to Overlearn:** For the system $A\mathbf{x} = \mathbf{b}$, and $\det(A) \neq 0$:
    $$x_i = \frac{\det(A_i)}{\det(A)}$$
    where $A_i$ is matrix $A$ with column $i$ replaced by vector $\mathbf{b}$.

3.  **Spaced Repetition Schedule:** Review this concept and re-do the worked example from memory at:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget the formula, re-derive it.
    *   Start with $A\mathbf{x} = \mathbf{b}$.
    *   The solution is $\mathbf{x} = A^{-1}\mathbf{b}$.
    *   Recall the adjugate formula for the inverse: $A^{-1} = \frac{1}{\det(A)}\text{adj}(A)$.
    *   Combine them: $\mathbf{x} = \frac{1}{\det(A)}(\text{adj}(A))\mathbf{b}$.
    *   Write out the $i$-th component $x_i$ of this matrix-vector product. You'll see it's $\frac{1}{\det(A)}$ times a sum. Recognize that this sum is the cofactor expansion for the determinant of a matrix where the $i$-th column has been replaced by $\mathbf{b}$.

## Common mistakes
1.  **Replacing the wrong column.** A very common error is to calculate $\det(A_1)$ when you intend to find $x_2$. Always double-check: to find $x_i$, you replace column $i$.
2.  **Arithmetic errors.** Calculating determinants, especially for $3 \times 3$ or larger matrices, is prone to sign errors and multiplication mistakes. Be methodical and write out every step.
3.  **Applying it when $\det(A)=0$.** Cramer's rule is only valid for systems with a unique solution. If you calculate $\det(A)=0$, the rule does not apply, and the system either has no solutions or infinitely many. You must use another method, like Gaussian elimination, to determine which.
4.  **Mistaking rows for columns.** The rule is strictly about column replacement. Never replace a row.

## Self-check
1.  Use Cramer's rule to solve for $y$ only in the system:
    $3x + 2y = 7$
    $x - 5y = -4$
2.  Solve the following system using Cramer's rule. What does the result for $z$ tell you?
    $$
    \begin{cases}
    x + y + z = 6 \\
    2x - y = 0 \\
    y + 3z = 11
    \end{cases}
    $$
3.  Consider a system $A\mathbf{x} = \mathbf{b}$ where $\det(A)=0$. If you were to formally (and incorrectly) apply Cramer's rule, what result(s) for $\det(A_i)$ would suggest the system has infinitely many solutions versus no solutions? Why is this reasoning not rigorous?