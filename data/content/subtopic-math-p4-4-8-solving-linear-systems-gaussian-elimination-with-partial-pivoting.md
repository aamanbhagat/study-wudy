## What it is
Gaussian elimination is an algorithm for solving a system of linear equations, $A\mathbf{x} = \mathbf{b}$, by transforming the matrix $A$ into an upper triangular form using elementary row operations. Partial pivoting is a refinement to this algorithm where, at each step, we swap rows to ensure the pivot element (the one we use for elimination) has the largest possible absolute value, which prevents division by zero and minimizes numerical error.

## Why it matters
This algorithm is the workhorse for solving dense linear systems, which appear constantly in science and engineering. In aerospace, finite element analysis (FEA) for structural integrity of an airframe or simulating airflow generates massive systems of equations that must be solved reliably. In physics, simulating complex systems from electrical circuits to quantum mechanics relies on solving such systems, and in machine learning, solving for the weights in models like linear regression can be framed as a linear system.

## When to study it
You must be fluent with basic linear algebra before tackling this. Ensure you understand:
1.  **Matrix Representation:** How to write a system of linear equations in the form $A\mathbf{x} = \mathbf{b}$.
2.  **Augmented Matrices:** The concept of representing the system as $[A | \mathbf{b}]$.
3.  **Elementary Row Operations:** Swapping two rows, multiplying a row by a non-zero scalar, and adding a multiple of one row to another.
4.  **Upper Triangular Matrices:** What they are and why a system in this form is trivial to solve via back substitution.

If any of these are weak, review them first. This topic builds directly upon them.

## How to study it (step by step)
1.  **Review Naive Gaussian Elimination:** Take a simple 2x2 system like $x+y=2$, $2x-y=1$. Write it as an augmented matrix and perform the single row operation to put it in upper triangular form. Solve it via back substitution.
2.  **Break the Naive Algorithm:** Now, try to solve $0x+y=1$, $x+y=2$. The first pivot is zero. Division by zero occurs. The naive algorithm fails.
3.  **Introduce the Fix:** Understand the partial pivoting rule: At step $k$ (for eliminating entries in column $k$), find the row $i \ge k$ that has the largest absolute value in column $k$. Swap row $i$ with row $k$.
4.  **Re-solve the Broken System:** Apply Gaussian elimination *with* partial pivoting to the system from step 2. See how the initial row swap resolves the division-by-zero issue immediately.
5.  **Understand Numerical Stability:** Consider the system $10^{-20}x + y = 1$, $x+y=2$. The pivot $10^{-20}$ is not zero, but it's tiny. Work through the elimination. The multiplier will be huge ($10^{20}$), which will amplify any small floating-point errors in your machine's representation of the numbers, leading to a garbage answer. Now, re-solve using partial pivoting. The row swap makes the pivot 1, the multiplier is small, and the answer is stable.
6.  **Formalize the Algorithm:** Write down the pseudocode for Gaussian elimination with partial pivoting for an $n \times n$ system. Use nested loops: the outer loop for the pivot column $k=1, \dots, n-1$, an inner loop to find the best pivot row, a swap operation, and another inner loop to perform the elimination for rows $i=k+1, \dots, n$.

## Key ideas, with intuition
1.  **The Goal is an Easy System (Upper Triangular):** A system of equations is hard to solve when variables are tangled together. The goal of elimination is to methodically untangle them. An upper triangular system is perfectly untangled from bottom to top: the last equation has only one variable, the second-to-last has two, and so on. We can solve for the last variable directly, then substitute it back into the equation above it to find the next one, and so on. This process is called **back substitution**.
    $$
    \begin{bmatrix}
    u_{11} & u_{12} & u_{13} \\
    0 & u_{22} & u_{23} \\
    0 & 0 & u_{33}
    \end{bmatrix}
    \begin{bmatrix}
    x_1 \\ x_2 \\ x_3
    \end{bmatrix}
    =
    \begin{bmatrix}
    y_1 \\ y_2 \\ y_3
    \end{bmatrix}
    \quad \implies \quad
    \begin{aligned}
    x_3 &= y_3 / u_{33} \\
    x_2 &= (y_2 - u_{23}x_3) / u_{22} \\
    x_1 &= (y_1 - u_{12}x_2 - u_{13}x_3) / u_{11}
    \end{aligned}
    $$

2.  **Elimination is Just Subtracting Equations:** The core operation, $R_i \leftarrow R_i - m_{ik} R_k$, is just a systematic way of doing what you learned in high school algebra: "multiply one equation by a constant and subtract it from another to eliminate a variable." The constant, $m_{ik} = a_{ik}/a_{kk}$, is chosen precisely so that the variable in column $k$ of row $i$ becomes zero.

3.  **Pivoting is Proactive Error Control:** The multiplier is $m_{ik} = a_{ik}/a_{kk}$. If the pivot element $a_{kk}$ is very small, the multiplier $m_{ik}$ becomes very large. When you compute $R_i - m_{ik} R_k$, you are subtracting a huge number from a normal-sized number. In floating-point arithmetic, this causes a loss of significant digits, known as catastrophic cancellation, and magnifies any pre-existing round-off errors. Partial pivoting is the strategy of making the denominator $a_{kk}$ as large as possible to keep the multiplier $m_{ik}$ small (specifically, $|m_{ik}| \le 1$), thus preventing this error amplification. It's a cheap insurance policy against numerical disaster.

## Worked example
Solve the following system using Gaussian elimination with partial pivoting.
$$
\begin{aligned}
2x_1 + x_2 - x_3 &= 1 \\
x_1 - x_2 + x_3 &= 2 \\
4x_1 + 2x_2 + 3x_3 &= 3
\end{aligned}
$$

**Step 0: Form the augmented matrix.**
$$
[A|\mathbf{b}] = \left[
\begin{array}{ccc|c}
2 & 1 & -1 & 1 \\
1 & -1 & 1 & 2 \\
4 & 2 & 3 & 3
\end{array}
\right]
$$

**Step 1: Elimination for column 1.**
*   **Pivot Selection:** We look at column 1. The candidates are $|2|, |1|, |4|$. The largest is $4$ in row 3.
*   **Pivot Action:** Swap Row 1 and Row 3 ($R_1 \leftrightarrow R_3$).
    $$
    \left[
    \begin{array}{ccc|c}
    4 & 2 & 3 & 3 \\
    1 & -1 & 1 & 2 \\
    2 & 1 & -1 & 1
    \end{array}
    \right]
    $$
*   **Elimination:** Our pivot is now $a_{11}=4$.
    *   For Row 2: The multiplier is $m_{21} = a_{21}/a_{11} = 1/4$. Perform $R_2 \leftarrow R_2 - (1/4)R_1$.
    *   For Row 3: The multiplier is $m_{31} = a_{31}/a_{11} = 2/4 = 1/2$. Perform $R_3 \leftarrow R_3 - (1/2)R_1$.
    $$
    \left[
    \begin{array}{ccc|c}
    4 & 2 & 3 & 3 \\
    0 & -1.5 & 0.25 & 1.25 \\
    0 & 0 & -2.5 & -0.5
    \end{array}
    \right]
    $$

**Step 2: Elimination for column 2.**
*   **Pivot Selection:** We look at column 2, from the diagonal downwards. The only candidate is $a_{22}=-1.5$. Its absolute value is $1.5$. Since there's nothing below it to compare with, it's the pivot. No swap is needed.
*   **Elimination:** The matrix is already in upper triangular form. The entry $a_{32}$ is already zero. So, this step is complete.

**Step 3: Back Substitution.**
The system is now:
$$
\begin{aligned}
4x_1 + 2x_2 + 3x_3 &= 3 \\
-1.5x_2 + 0.25x_3 &= 1.25 \\
-2.5x_3 &= -0.5
\end{aligned}
$$
*   Solve for $x_3$:
    $x_3 = \frac{-0.5}{-2.5} = 0.2$
*   Solve for $x_2$:
    $-1.5x_2 + 0.25(0.2) = 1.25 \implies -1.5x_2 = 1.2 \implies x_2 = \frac{1.2}{-1.5} = -0.8$
*   Solve for $x_1$:
    $4x_1 + 2(-0.8) + 3(0.2) = 3 \implies 4x_1 - 1.6 + 0.6 = 3 \implies 4x_1 = 4 \implies x_1 = 1$

The solution is $\mathbf{x} = [1, -0.8, 0.2]^T$.

**Reflection:** The initial row swap in Step 1 placed the largest element at the pivot position. This resulted in smaller multipliers ($1/4$ and $1/2$) than if we had used the original pivot of 2 (which would have produced a multiplier of $4/2=2$). This minimizes numerical error.

## Diagrams
Here is the pivoting step for column 1 of the worked example. We search down the first column from the pivot position to find the element with the largest absolute value.

```text
Augmented Matrix [A|b] at k=1

  [ 2   1  -1 |  1 ]   <-- Current pivot row (R1)
    |
    V  Search this column from the diagonal down
  [ 1  -1   1 |  2 ]
  [ 4   2   3 |  3 ]   <-- Largest absolute value in column 1 is here (R3)

       ||
       \/

Perform Swap(R1, R3)

  [ 4   2   3 |  3 ]   <-- New pivot row
  [ 1  -1   1 |  2 ]
  [ 2   1  -1 |  1 ]
```

After all elimination steps, the goal is to reach this upper triangular form:

```text
Final Upper Triangular Form [U|y]

  [ u11 u12 u13 | y1 ]
  [  0  u22 u23 | y2 ]
  [  0   0  u33 | y3 ]
      ^   ^
      |___|______ All elements below the main diagonal are zero.
```

## Memory technique — remember this forever
1.  **The Mnemonic:** "The Strongest Survivor Rules." At each step (column), look down from the top. The "strongest" number (largest absolute value) "survives" and gets to be the pivot. It "rules" the elimination for that column. This swap is your shield against the twin demons of "Division by Zero" and "Round-off Error."

2.  **Must-Overlearn Formulas:**
    *   Augmented System: $A\mathbf{x}=\mathbf{b} \iff [A|\mathbf{b}]$
    *   Elimination Update Rule: $R_i \leftarrow R_i - (\frac{a_{ik}}{a_{kk}}) R_k$
    *   Back Substitution: $x_i = \frac{1}{u_{ii}} \left( y_i - \sum_{j=i+1}^{n} u_{ij} x_j \right)$ for $i=n, n-1, \dots, 1$.

3.  **Spaced Repetition Schedule:** Review this material and solve a new problem at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, remember the goal: transform $A\mathbf{x}=\mathbf{b}$ into an equivalent, easy-to-solve system $U\mathbf{x}=\mathbf{y}$ where $U$ is upper triangular. The only legal moves are elementary row operations. The "pivoting" part is just a common-sense rule: to avoid dividing by small numbers (which is numerically unstable), always use the biggest number available in the current column as your pivot by swapping its row to the top. The rest is just the mechanical process of creating zeros, column by column.

## Common mistakes
1.  **Augmentation Neglect:** Performing row operations on the matrix $A$ but forgetting to apply the *exact same* operations to the vector $\mathbf{b}$ on the right-hand side. The vector $\mathbf{b}$ must be carried along for the ride at every step.
2.  **Incorrect Multiplier:** Calculating the multiplier as $m_{ik} = a_{kk}/a_{ik}$ instead of the correct $m_{ik} = a_{ik}/a_{kk}$. Remember: the pivot element $a_{kk}$ is the denominator.
3.  **Searching the Whole Matrix:** When finding the pivot for column $k$, searching for the largest element in the entire remaining sub-matrix. You **only** search in column $k$ from row $k$ down to row $n$.
4.  **Off-by-One Errors in Back Substitution:** Starting the back substitution sum at the wrong index or messing up the signs. Write out the equations explicitly, as in the worked example, until the formula $x_i = \dots$ is second nature.

## Self-check
1.  Solve the system $2x_1 + 4x_2 = 10$, $x_1 - x_2 = 1$ using Gaussian elimination with partial pivoting. Does pivoting actually cause a row swap in this case? Why or why not?
2.  Solve the system where naive elimination fails: $x_2 + x_3 = 2$, $x_1 - x_2 - x_3 = 0$, $x_1 + 2x_2 = 5$.
3.  Consider the system $0.0001x_1 + x_2 = 1$, $x_1 + x_2 = 2$. Solve it twice on a calculator that keeps only 4 significant figures: once without pivoting, and once with partial pivoting. Compare your answers to the true solution ($x_1 \approx 1.0001, x_2 \approx 0.9999$). What does this demonstrate about numerical stability?