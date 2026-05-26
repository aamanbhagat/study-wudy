## 1. The one-sentence answer
**A system of linear equations is compactly written as the single matrix equation \(Ax = b\), where \(A\) encodes all coefficients, \(x\) holds the unknowns, and \(b\) holds the constants.**

This form arises because each equation is a weighted sum of the unknowns. Collecting every coefficient into rows of \(A\) and every right-hand side into entries of \(b\) converts the entire collection of equations into one matrix-vector product. The product \(Ax\) simply reproduces the left-hand sides exactly when matrix multiplication is performed row by row.

The notation therefore replaces a sprawling list of scalar equations with three compact objects whose sizes must match: if there are \(m\) equations in \(n\) unknowns, then \(A\) is \(m \times n\), \(x\) is \(n \times 1\), and \(b\) is \(m \times 1\). Once written this way, every subsequent technique—row reduction, inversion, factorization—operates directly on these three arrays.

> [!NOTE]
> The matrix \(A\) does not merely store numbers; each of its rows is the complete coefficient list of one original equation, so row operations on \(A\) simultaneously transform every equation without changing the solution set.

## 2. Why this matters — concrete and current
In semiconductor mask correction, engineers at ASML solve systems with tens of thousands of variables to compensate for diffraction; the matrix \(A\) encodes optical interactions between features on a silicon wafer, and \(Ax = b\) yields the required mask adjustments.

NASA’s Artemis program uses the same form to compute spacecraft trajectories under gravitational perturbations; each row of \(A\) records a linearized constraint from an ephemeris model, and the solution \(x\) supplies the thrust vector sequence that meets position targets.

Inside every modern GPU, the rasterizer solves tiny \(Ax = b\) systems to interpolate vertex attributes across a triangle; the matrix \(A\) is assembled from barycentric coordinates, and the resulting \(x\) supplies per-pixel color and depth values at billions of fragments per second.

In large-scale recommender systems at Netflix, alternating-least-squares training repeatedly solves millions of independent \(Ax = b\) problems, one per user or item; each \(A\) is a sparse submatrix of latent-factor interactions, and the solutions update the model that drives personalized rankings.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Scalar arithmetic        | Every entry of \(Ax\) is formed by ordinary multiplication and addition. |
| Ordered lists (vectors)  | Both \(x\) and \(b\) are column vectors; order distinguishes distinct unknowns and distinct equations. |
| Rectangular arrays       | \(A\) is an \(m \times n\) array whose shape records the number of equations versus unknowns. |

## 4. Building the idea — from intuition to formalism

### Step 1 — One equation, many unknowns
A single linear equation such as \(3x_1 - 2x_2 = 5\) already links several unknowns through fixed coefficients.  
Example: \(3x_1 - 2x_2 = 5\).  
The formal statement is simply the scalar equation itself.  
> [!WARNING]  
> Treating the coefficients as optional or interchangeable destroys the equation; the numbers 3 and −2 are not arbitrary labels but the precise weights that must be preserved.

### Step 2 — Several equations sharing the same unknowns
When a second equation appears, say \(x_1 + 4x_2 = 6\), the same symbols \(x_1\) and \(x_2\) occur in both. The pair must be satisfied simultaneously.  
Example:  
\[
\begin{cases}
3x_1 - 2x_2 = 5 \\
x_1 + 4x_2 = 6
\end{cases}
\]  
The formal statement is the set of two scalar equations.  
> [!WARNING]  
> Solving each equation in isolation yields values that generally fail the other equation; simultaneous satisfaction is required.

### Step 3 — Coefficient matrix extraction
Write every coefficient in its original position inside a rectangular array \(A\), every unknown in a column vector \(x\), and every constant in a column vector \(b\).  
Example:  
\[
A = \begin{pmatrix} 3 & -2 \\ 1 & 4 \end{pmatrix},\qquad
x = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix},\qquad
b = \begin{pmatrix} 5 \\ 6 \end{pmatrix}.
\]  
The formal statement is the definition of these three arrays.  
> [!WARNING]  
> Reversing the order of columns in \(A\) silently swaps the roles of \(x_1\) and \(x_2\), producing an entirely different system.

### Step 4 — Matrix-vector product recovers the left-hand sides
Matrix multiplication \(Ax\) is defined so that its \(i\)-th entry equals the left-hand side of the \(i\)-th original equation.  
Example: the first entry of \(Ax\) is \(3x_1 + (-2)x_2\).  
Formally,
\[
Ax = \begin{pmatrix} 3 & -2 \\ 1 & 4 \end{pmatrix}
\begin{pmatrix} x_1 \\ x_2 \end{pmatrix}
= \begin{pmatrix} 3x_1-2x_2 \\ x_1+4x_2 \end{pmatrix}.
\]  
> [!WARNING]  
> Using row-column dot products in the wrong sequence produces a vector whose entries no longer match the original equations.

### Step 5 — The compact equation
The system is therefore identical to the single matrix equation \(Ax = b\).  
Example:  
\[
\begin{pmatrix} 3 & -2 \\ 1 & 4 \end{pmatrix}
\begin{pmatrix} x_1 \\ x_2 \end{pmatrix}
= \begin{pmatrix} 5 \\ 6 \end{pmatrix}.
\]  
This is the textbook statement of the matrix form.  
> [!WARNING]  
> Dimension mismatch (for instance, a \(2\times 3\) matrix times a 2-vector) renders the product undefined; the equation cannot even be written.

## 5. Worked examples — every step shown

**Example 1 — Two equations, two unknowns**  
*Given:*  
\[
\begin{cases}
2x + 3y = 7 \\
4x - y = 5
\end{cases}
\]  
*Find:* the matrix form \(Ax = b\).  

Write coefficients in order of appearance:  
\[
A = \begin{pmatrix} 2 & 3 \\ 4 & -1 \end{pmatrix}.
\]  
*Why:* each row reproduces one equation’s coefficients exactly.  

Write unknowns as a column:  
\[
x = \begin{pmatrix} x \\ y \end{pmatrix}.
\]  
*Why:* column order matches the coefficient columns.  

Write constants as a column:  
\[
b = \begin{pmatrix} 7 \\ 5 \end{pmatrix}.
\]  
*Why:* order preserves correspondence with each equation.  

The equation is therefore
\[
\begin{pmatrix} 2 & 3 \\ 4 & -1 \end{pmatrix}
\begin{pmatrix} x \\ y \end{pmatrix}
= \begin{pmatrix} 7 \\ 5 \end{pmatrix}.
\]  
**Final answer**  
\[
Ax = b \quad\text{with}\quad
A = \begin{pmatrix} 2 & 3 \\ 4 & -1 \end{pmatrix},\ 
x = \begin{pmatrix} x \\ y \end{pmatrix},\ 
b = \begin{pmatrix} 7 \\ 5 \end{pmatrix}.
\]  
*Reflection:* The only difficulty is consistent ordering; once the pattern is fixed, larger systems follow identically.

**Example 2 — Three equations, three unknowns**  
*Given:* the system whose coefficients are 1, −1, 0 for the first equation, etc.  
*Find:* \(Ax = b\).  
Assemble rows directly into
\[
A = \begin{pmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \\ -1 & 0 & 1 \end{pmatrix},
\quad
x = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix},
\quad
b = \begin{pmatrix} 2 \\ 3 \\ 4 \end{pmatrix}.
\]  
**Final answer**  
\[
Ax = b.
\]  
*Reflection:* No arithmetic is required; extraction is purely positional.

**Example 3 — Inconsistent system**  
*Given:*  
\[
\begin{cases}
x + y = 1 \\
x + y = 2
\end{cases}
\]  
*Find:* whether \(Ax = b\) can hold.  
Here
\[
A = \begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix},
\quad
b = \begin{pmatrix} 1 \\ 2 \end{pmatrix}.
\]  
The two rows of \(A\) are identical, yet the corresponding entries of \(b\) differ, so no vector \(x\) satisfies both rows simultaneously.  
**Final answer**  
No solution exists.  
*Reflection:* The matrix equation immediately reveals inconsistency without attempting elimination.

**Example 4 — Underdetermined system**  
*Given:* one equation in three unknowns, \(x + 2y + 3z = 6\).  
*Find:* the matrix form.  
\[
A = \begin{pmatrix} 1 & 2 & 3 \end{pmatrix},
\quad
x = \begin{pmatrix} x \\ y \\ z \end{pmatrix},
\quad
b = \begin{pmatrix} 6 \end{pmatrix}.
\]  
**Final answer**  
\[
Ax = b.
\]  
*Reflection:* The shape \(1\times 3\) signals infinitely many solutions; the equation is still valid.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Swapping columns of \(A\)   | Confusing variable order with coefficient order | Label unknowns explicitly before writing \(A\).      |
| Treating \(b\) as a row     | Visual habit from writing equations left-to-right | Always place constants in a single column.           |
| Forgetting that \(m\) need not equal \(n\) | Expecting square matrices from school algebra | Count equations versus unknowns before forming \(A\). |
| Computing \(Ax\) with wrong dot-product order | Matrix multiplication is not commutative | Verify that each row of \(A\) dots with the column \(x\). |
| Assuming a solution always exists | Over-generalizing from invertible cases | Check consistency after row reduction.               |
| Writing \(xA = b\)          | Mirror-image notation from scalar multiplication | Remember \(A\) acts on the left; \(x\) is a column.  |
| Dimension mismatch in code  | Indexing arrays from zero while counting equations from one | Verify \(\text{shape}(A)[0] == \text{len}(b)\).      |

## 7. The textbook-precise statement
Let \(A\) be an \(m \times n\) matrix with entries \(a_{ij}\), let \(x\) be an \(n \times 1\) column vector, and let \(b\) be an \(m \times 1\) column vector. The matrix equation \(Ax = b\) is defined to mean that the \(i\)-th entry of the product \(Ax\) equals \(b_i\) for each \(i = 1,\dots,m\). Equivalently, if the rows of \(A\) are denoted \(r_1^\top,\dots,r_m^\top\), then
\[
Ax = b \iff r_i^\top x = b_i \quad\text{for all } i=1,\dots,m.
\]
(See Strang, *Linear Algebra and Its Applications*, 4e, §1.2.)

## 8. Visual — diagram or schematic
```text
          x
     [ x1 ]          A               b
     [ x2 ]    [ a11 a12 a13 ]    [ b1 ]
     [ x3 ]    [ a21 a22 a23 ]    [ b2 ]
               [ a31 a32 a33 ]
               
Each row of A dots with the column x
to produce the matching entry of b.
```
The diagram shows a \(3\times 3\) matrix \(A\) multiplying a \(3\times 1\) vector \(x\) to yield a \(3\times 1\) vector \(b\). Each horizontal arrow represents one dot product.

## 9. The memory technique

1. **The hook** — Picture a vending machine labeled \(A\): you insert the column vector \(x\) (coins of different denominations) and the machine returns the exact column \(b\) (the chosen snacks); the machine’s internal wiring is the matrix \(A\).

2. **What to overlearn** — \(Ax\) is always a column whose length equals the number of rows of \(A\); the equation \(Ax = b\) is defined only when this length matches the length of \(b\).

3. **Spaced-repetition schedule** — Review the definition after 1 day, again after 3 days, 7 days, 16 days, and 35 days, each time writing at least one new system in matrix form.

4. **First-principles fallback** — Re-expand \(Ax\) entrywise: the \(i\)-th equation is recovered by summing \(a_{ij}x_j\) over \(j\); equate each sum to the corresponding \(b_i\).

## 10. What this unlocks
The compact statement \(Ax = b\) is the gateway to every algorithmic and theoretical development in linear algebra.  

- Row reduction operates on the augmented matrix \([A|b]\).  
- Matrix inverses solve \(Ax = b\) when \(A\) is square and invertible.  
- Factorizations (LU, QR, SVD) rewrite \(A\) so that \(Ax = b\) becomes easy to solve.  
- Vector spaces, linear independence, and rank are defined by examining the column space of \(A\) and whether \(b\) lies inside it.  
- Eigenvalue problems and dynamical systems arise when the same matrix \(A\) acts repeatedly on successive vectors \(x\).

## 11. Self-check — five questions, no answers
1. Write the system \(2x - y + 3z = 4\), \(x + 5z = 1\) in matrix form; state the dimensions of \(A\), \(x\), and \(b\).

2. Given
\[
A = \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 1 & 1 \end{pmatrix},
\quad
b = \begin{pmatrix} 3 \\ 4 \\ 5 \end{pmatrix},
\]
does there exist an \(x\) satisfying \(Ax = b\)? Explain without computing a solution.

3. If \(A\) is \(4\times 3\) and \(b\) is \(4\times 1\), what must be the shape of any solution vector \(x\)? What happens if someone proposes a \(3\times 1\) vector for \(b\)?

4. Construct a \(2\times 2\) matrix \(A\) and vector \(b\) such that \(Ax = b\) has infinitely many solutions; give one explicit solution.

5. Suppose the second row of \(A\) is exactly twice the first row, yet the second entry of \(b\) is not twice the first entry. What does this imply for the solvability of \(Ax = b\)?