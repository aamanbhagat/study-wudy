## What it is
Gaussian elimination is a systematic algorithm for solving systems of linear equations. It transforms a system's augmented matrix into an upper triangular form (row echelon form) using elementary row operations, a phase called **forward elimination**. Then, it solves for the variables by starting from the last equation and working backwards, a phase called **back substitution**.

## Why it matters
This algorithm is the backbone of computational linear algebra and is fundamental to solving large systems of equations that appear everywhere. In aerospace, it's used in finite element analysis (FEA) to determine stresses in aircraft structures. In physics, it solves coupled differential equations in simulations, and in machine learning, it's a basis for solving for the parameters in models like linear regression.

## When to study it
You must be comfortable with representing systems of linear equations using an augmented matrix. You should also have a solid grasp of basic matrix notation and the concept that a solution to a system is a set of variable values that satisfies all equations simultaneously. If you cannot translate a system like $\{2x+y=5, x-3y=6\}$ into $\left[\begin{array}{cc|c}2 & 1 & 5 \\ 1 & -3 & 6\end{array}\right]$, review that first.

## How to study it (step by step)
1.  **Master the Three Operations:** Write down the three elementary row operations. For a generic matrix, perform each one. For example, on a 3x3 identity matrix, perform $R_2 \leftarrow R_2 + 3R_1$. Understand viscerally why these operations do not change the underlying solution set of the system of equations they represent.
2.  **Perform Forward Elimination (The Goal: Zeros):** Take a 3x3 system and convert it to its augmented matrix. Your goal is to create zeros below the main diagonal. Use the element in row 1, column 1 (the first *pivot*) to create zeros in the first column of rows 2 and 3. Then, use the new element in row 2, column 2 (the second pivot) to create a zero below it.
3.  **Perform Back Substitution (The Payoff):** Once your matrix is in upper triangular form, convert it back into a system of linear equations. The last equation will have only one variable. Solve for it. Substitute this value into the second-to-last equation to solve for the next variable. Continue this process, moving up until all variables are solved.
4.  **Handle Special Cases:** Find a system that has no solution and one that has infinite solutions. Perform forward elimination on them. Observe what happens: a row of the form $[0 \ 0 \ \dots \ 0 \ | \ c]$ where $c \neq 0$ indicates no solution (a contradiction like $0=c$). A row of all zeros $[0 \ 0 \ \dots \ 0 \ | \ 0]$ indicates a dependency, leading to infinite solutions.
5.  **Code it:** Implement Gaussian elimination in a programming language of your choice. This forces you to handle the logic of finding pivots, swapping rows if a pivot is zero, and the nested loops required for elimination. This will solidify your understanding of the algorithm's mechanics.

## Key ideas, with intuition
1.  **The Matrix is Just Bookkeeping:** A system of equations like
    $$
    \begin{cases}
    2x + y - z = 8 \\
    -3x - y + 2z = -11 \\
    -2x + y + 2z = -3
    \end{cases}
    $$
    can be written compactly as an augmented matrix:
    $$
    \left[\begin{array}{ccc|c}
    2 & 1 & -1 & 8 \\
    -3 & -1 & 2 & -11 \\
    -2 & 1 & 2 & -3
    \end{array}\right]
    $$
    The matrix just holds the coefficients. We perform operations on the rows of the matrix instead of rewriting the full equations, which is faster and less error-prone.

2.  **The Goal is a "Staircase" (Row Echelon Form):** The entire point of forward elimination is to turn the matrix above into one where all entries below the main diagonal are zero. This is called row echelon form or, more simply, an upper triangular matrix.
    $$
    \left[\begin{array}{ccc|c}
    \blacksquare & \star & \star & \star \\
    0 & \blacksquare & \star & \star \\
    0 & 0 & \blacksquare & \star
    \end{array}\right]
    $$
    Why? Because the last row now represents an equation with only one unknown ($\blacksquare \cdot z = \star$), which is trivial to solve.

3.  **Elementary Operations Preserve the Solution:** The three legal moves (row swapping, row scaling, adding a multiple of one row to another) are precisely the operations you would perform on the equations themselves. Swapping two rows is like swapping two equations. Multiplying a row by 2 is like multiplying both sides of an equation by 2. Adding row 1 to row 2 is like adding the first equation to the second. None of these actions change the final solution $(x, y, z)$.

4.  **Pivots are Your Tools:** In each step of forward elimination, you identify a **pivot**. This is the first non-zero number in the row you're working with. You use this pivot to eliminate all the entries in the column *below* it. You march down the diagonal, selecting a new pivot in each row, and using it to clear the column beneath it.

## Worked example
Solve the following system using Gaussian elimination.
$$
\begin{cases}
x + 2y + z = 3 \\
2x + 5y - z = -4 \\
3x - 2y - z = 5
\end{cases}
$$

**Step 1: Write the augmented matrix.**
$$
\left[\begin{array}{ccc|c}
1 & 2 & 1 & 3 \\
2 & 5 & -1 & -4 \\
3 & -2 & -1 & 5
\end{array}\right]
$$
This is our starting point. The first pivot is the '1' in the top-left corner.

**Step 2: Forward Elimination.** Our goal is to create zeros in the first column of Row 2 and Row 3.
- To eliminate the '2' in $R_2$, we perform the operation $R_2 \leftarrow R_2 - 2R_1$.
- To eliminate the '3' in $R_3$, we perform the operation $R_3 \leftarrow R_3 - 3R_1$.

$$
\left[\begin{array}{ccc|c}
1 & 2 & 1 & 3 \\
2 - 2(1) & 5 - 2(2) & -1 - 2(1) & -4 - 2(3) \\
3 - 3(1) & -2 - 3(2) & -1 - 3(1) & 5 - 3(3)
\end{array}\right]
=
\left[\begin{array}{ccc|c}
1 & 2 & 1 & 3 \\
0 & 1 & -3 & -10 \\
0 & -8 & -4 & -4
\end{array}\right]
$$
*Reflection: We used the pivot in $R_1$ to clear the column below it. The first column is now as desired.*

Now, we move to the next pivot, the '1' in $R_2, C_2$. We use it to eliminate the '-8' below it.
- Perform the operation $R_3 \leftarrow R_3 + 8R_2$.

$$
\left[\begin{array}{ccc|c}
1 & 2 & 1 & 3 \\
0 & 1 & -3 & -10 \\
0 + 8(0) & -8 + 8(1) & -4 + 8(-3) & -4 + 8(-10)
\end{array}\right]
=
\left[\begin{array}{ccc|c}
1 & 2 & 1 & 3 \\
0 & 1 & -3 & -10 \\
0 & 0 & -28 & -84
\end{array}\right]
$$
*Reflection: Forward elimination is complete. The matrix is in upper triangular (row echelon) form.*

**Step 3: Back Substitution.** Convert the matrix back into a system of equations.
$$
\begin{cases}
x + 2y + z = 3 & \text{(Eq 1)} \\
y - 3z = -10 & \text{(Eq 2)} \\
-28z = -84 & \text{(Eq 3)}
\end{cases}
$$
- Solve Eq 3 for $z$:
  $z = \frac{-84}{-28} \implies z = 3$.
- Substitute $z=3$ into Eq 2 to find $y$:
  $y - 3(3) = -10 \implies y - 9 = -10 \implies y = -1$.
- Substitute $z=3$ and $y=-1$ into Eq 1 to find $x$:
  $x + 2(-1) + 3 = 3 \implies x - 2 + 3 = 3 \implies x + 1 = 3 \implies x = 2$.

The solution is $(x, y, z) = (2, -1, 3)$.
*Reflection: By creating the simple structure first, the final solving phase became a simple chain of substitutions.*

## Diagrams
The goal of forward elimination:
```text
[ ■  *  * | * ]      [ ■  *  * | * ]
[ *  *  * | * ]  --> [ 0  ■  * | * ]
[ *  *  * | * ]      [ 0  0  ■ | * ]

Start with a full      End with an upper
matrix.                 triangular matrix.
                        (zeros below the main diagonal ■)
```

The flow of back substitution:
```text
[ x  y  z | c1 ]   (Equation 1) <----(substitute y, z)---- Solve for x
      ^
      |
[ 0  y  z | c2 ]   (Equation 2) <----(substitute z)------- Solve for y
      ^
      |
[ 0  0  z | c3 ]   (Equation 3) -------(start here)------ Solve for z
```

## Memory technique — remember this forever
1.  **The Mnemonic: "The Down-and-Up March"**
    Think of it as a two-part military drill.
    - **Forward Elimination is the "March Down":** You start at the top-left. Your job is to "clear out" everyone below you in your column. Then you take one step down and one step right on the diagonal and repeat. You march down the diagonal, clearing the column below you at each step.
    - **Back Substitution is the "March Up":** Once you hit the bottom-right, you're done marching down. You solve that last, simple equation. Then you take that answer and march one step up, substitute, and solve again. You march up the rows until you're back at the top.

2.  **Formulas to Overlearn:** The three elementary row operations. They are your only legal moves.
    - $R_i \leftrightarrow R_j$ (Swap two rows)
    - $R_i \leftarrow cR_i$ where $c \neq 0$ (Scale a row)
    - $R_i \leftarrow R_i + cR_j$ (Add a multiple of another row to a row)

3.  **Spaced Repetition Schedule:** Do a simple 3x3 problem from scratch on Day 1, Day 3, Day 7, Day 16, and Day 35. Do not look at your notes. The physical act of recalculating it will burn it into memory.

4.  **First Principles Pathway:** If you forget the algorithm, remember the goal: simplify the system. Write out the full equations. What would you do? You'd use the first equation to eliminate $x$ from the second and third equations. Then you'd use the new second equation to eliminate $y$ from the third. That *is* forward elimination. The matrix is just a clean way to write down what you were already doing.

## Common mistakes
1.  **Arithmetic Errors:** The most common mistake. A single sign error in step one will cascade and corrupt the entire result. Be slow, be deliberate, write out intermediate steps (e.g., `5 - 2(2) = 1`, not just `1`).
2.  **Modifying the "Tool" Row:** When performing an operation like $R_2 \leftarrow R_2 - 2R_1$, you are using $R_1$ as a tool to change $R_2$. Do not change $R_1$ in this step. $R_1$ stays the same, $R_2$ is replaced by the result.
3.  **Forgetting the Augmented Part:** The row operation applies to the *entire* row, including the number on the right side of the vertical bar. It's easy to forget to update the constant term, which will make the final answer incorrect.
4.  **Zero Pivot Panic:** If you get to a step where the pivot is zero (e.g., the entry in $R_2, C_2$ is 0 after the first step), you cannot use it to eliminate entries below it. The correct action is to look for a row *below* the current one that has a non-zero entry in that column and swap them ($R_2 \leftrightarrow R_3$). If no such row exists, the system has either no solution or infinite solutions.

## Self-check
1.  Solve this 2x2 system using Gaussian elimination.
    $$
    \begin{cases}
    2x - 3y = 7 \\
    3x + 5y = 1
    \end{cases}
    $$
2.  Solve this 3x3 system. Does the initial '0' in the matrix require an immediate row swap? Why or why not?
    $$
    \begin{cases}
    2x + 4y - 2z = 2 \\
    4x + 9y - 3z = 8 \\
    -2x - 3y + 7z = 10
    \end{cases}
    $$
3.  Perform forward elimination on the system below. Based on the resulting row echelon form, determine if there is no solution or an infinite number of solutions, and explain how you know.
    $$
    \begin{cases}
    x - y + 2z = 4 \\
    x + z = 6 \\
    2x - 3y + 5z = 4 \\
    3x + 2y - z = 1
    \end{cases}
    $$