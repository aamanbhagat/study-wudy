## What it is
Cramer's rule is an explicit formula that solves a system of linear equations using determinants. For a $2 \times 2$ system, it calculates the values of the two variables by taking the ratio of two determinants: a modified determinant specific to the variable you are solving for, divided by the main determinant of the system's coefficients.

## Why it matters
While standard elimination or substitution is often faster for systems with pure numbers, Cramer's rule shines when coefficients are variables (like masses, lengths, or resistances). In physics and aerospace engineering, it allows you to derive general algebraic formulas for unknowns—such as the tension in two cables or currents in a circuit network—without getting lost in algebraic substitution loops. It is also a fundamental stepping stone to understanding inverse matrices.

## When to study it
You must already understand:
1. How to solve $2 \times 2$ systems via substitution and elimination.
2. Basic matrix notation (identifying rows and columns).
3. How to calculate a $2 \times 2$ determinant: $\det \begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc$.

If you cannot compute a $2 \times 2$ determinant reliably, stop and review that first.

## How to study it (step by step)
1. **Standardize the system:** Write your equations in the standard form $ax + by = e$ and $cx + dy = f$. Align the $x$'s, the $y$'s, and the constants.
2. **Extract the coefficient matrix:** Write down the $2 \times 2$ matrix of the left-hand side coefficients. 
3. **Compute $D$:** Calculate the main determinant $D = ad - bc$. If $D = 0$, stop. The system has either no solutions or infinite solutions, and Cramer's rule cannot be used.
4. **Form $D_x$:** Take the coefficient matrix, but replace the $x$-column (the first column) with the constant vector $\begin{pmatrix} e \\ f \end{pmatrix}$. Compute this determinant.
5. **Form $D_y$:** Take the original coefficient matrix, but replace the $y$-column (the second column) with the constant vector. Compute this determinant.
6. **Solve:** Calculate the final values using $x = \frac{D_x}{D}$ and $y = \frac{D_y}{D}$.
7. **Verify:** Plug $x$ and $y$ back into the original equations to prove they hold true.

## Key ideas, with intuition
*   **The Matrix Form:** A system of equations is fundamentally a matrix equation $AX = B$:
    $$ \begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} e \\ f \end{pmatrix} $$
*   **The Main Determinant ($D$):** Geometrically, the determinant $D = ad - bc$ represents the area scaling factor of the matrix transformation. If $D = 0$, the transformation squishes 2D space into a 1D line. This means the equations represent parallel or identical lines, leaving no unique intersection point.
*   **The Column Replacement:** To find $x$, you are isolating the $x$-variable's contribution to the system. By replacing the $x$-column with the constants to form $D_x$, you are building a new matrix whose determinant represents a specific "modified area". 
*   **The Ratios:** Cramer's rule states:
    $$ x = \frac{D_x}{D}, \quad y = \frac{D_y}{D} $$
    You are dividing the modified area by the base area to find the exact scaling factor required for each variable.

## Worked example
Solve the system:
$$ 2x + 3y = 8 $$
$$ 5x - y = 3 $$

**Step 1: Find the main determinant $D$.**
The coefficient matrix is $\begin{pmatrix} 2 & 3 \\ 5 & -1 \end{pmatrix}$.
$$ D = (2)(-1) - (3)(5) = -2 - 15 = -17 $$

**Step 2: Find $D_x$.**
Replace the first column (the $x$ coefficients: 2, 5) with the constants (8, 3).
$$ D_x = \det \begin{pmatrix} 8 & 3 \\ 3 & -1 \end{pmatrix} = (8)(-1) - (3)(3) = -8 - 9 = -17 $$

**Step 3: Find $D_y$.**
Replace the second column (the $y$ coefficients: 3, -1) with the constants (8, 3).
$$ D_y = \det \begin{pmatrix} 2 & 8 \\ 5 & 3 \end{pmatrix} = (2)(3) - (8)(5) = 6 - 40 = -34 $$

**Step 4: Calculate $x$ and $y$.**
$$ x = \frac{D_x}{D} = \frac{-17}{-17} = 1 $$
$$ y = \frac{D_y}{D} = \frac{-34}{-17} = 2 $$

*Reflection:* The method worked cleanly because we tracked our negative signs during the $ad-bc$ calculations. Dividing by $D = -17$ scaled our modified determinants back to the true coordinate values $(1, 2)$.

## Diagrams
```text
System:
[ a  b ] [ x ] = [ e ]
[ c  d ] [ y ]   [ f ]

Determinant D:          Determinant D_x:        Determinant D_y:
(Base system)           (Replace x-col)         (Replace y-col)

  | a  b |                | e  b |                | a  e |
  | c  d |                | f  d |                | c  f |
    ^  ^                    ^                       ^
    x  y                 Replaced                Replaced
```

## Memory technique — remember this forever
1. **The Hook:** *"To find the unknown, let the Answers take its seat."* If you want to solve for $x$, the answer column $\begin{pmatrix} e \\ f \end{pmatrix}$ sits in $x$'s chair (the first column).
2. **Formulas to overlearn:** 
   * $D = ad - bc$
   * $x = \frac{D_x}{D}$
   * $y = \frac{D_y}{D}$
3. **Spaced-repetition schedule:** Review this concept and solve one practice problem at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **The First Principles Pathway:** If you forget the rule, you can derive it using standard elimination. 
   Take $ax + by = e$ and $cx + dy = f$. 
   To eliminate $y$, multiply the top equation by $d$ and the bottom by $b$:
   $$ adx + bdy = ed $$
   $$ bcx + bdy = fb $$
   Subtract the bottom from the top:
   $$ (ad - bc)x = ed - fb $$
   Notice that $(ad - bc)$ is exactly $D$, and $(ed - fb)$ is exactly the determinant of $\begin{pmatrix} e & b \\ f & d \end{pmatrix}$, which is $D_x$. 
   Therefore, $D \cdot x = D_x \implies x = \frac{D_x}{D}$.

## Common mistakes
* **Sign errors in the determinant:** Forgetting the minus sign in $ad - bc$. Students often accidentally add the terms, or drop negatives when $b$ or $c$ are already negative. Always use parentheses: $(a)(d) - (b)(c)$.
* **Replacing the wrong column:** To find $x$, you must replace the *first* column. To find $y$, replace the *second* column. Swapping these gives you the inverse of the correct coordinates.
* **Ignoring $D = 0$:** You cannot divide by zero. If $D=0$, Cramer's rule fails. You must state "no unique solution" rather than blindly calculating.

## Self-check
1. Solve the system $3x + 4y = 10$ and $2x - y = 3$ using Cramer's rule.
2. A system has equations $kx + 2y = 5$ and $3x + y = 4$. For what value of $k$ will Cramer's rule fail to provide a unique solution?
3. Derive the formula $y = \frac{D_y}{D}$ from scratch using the elimination method on the general system $ax+by=e$ and $cx+dy=f$. (Hint: eliminate $x$ this time).