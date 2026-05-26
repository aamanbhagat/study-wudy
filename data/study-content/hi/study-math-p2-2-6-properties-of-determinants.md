## 1. The one-sentence answer
**Properties of determinants** are a set of rules that let you compute, simplify, or reason about the value of \(\det(A)\) without expanding every element.

These rules arise because the determinant is a multilinear alternating form on the columns (or rows) of a matrix. Once you accept that definition, swapping two rows must flip the sign, scaling a row by \(k\) must scale the determinant by \(k\), and adding a multiple of one row to another must leave the value unchanged. The same rules apply to columns because \(\det(A^T)=\det(A)\). Together they turn an \(O(n!)\) expansion into an \(O(n^3)\) algorithm and reveal deep facts such as \(\det(AB)=\det(A)\det(B)\).

> [!NOTE]
> The single deepest insight is that every elementary row operation corresponds to multiplication by an elementary matrix whose determinant is either \(+1\), \(-1\), or the scaling factor itself; therefore the determinant of the final triangular matrix is simply the product of its diagonal entries, and you can track the effect of every operation you performed.

## 2. Why this matters — concrete and current
In aerospace, NASA’s trajectory optimizers use the determinant of the state-transition matrix to decide whether a proposed orbit correction keeps the spacecraft controllable; a near-zero determinant immediately flags a singular maneuver.

In semiconductor design, Intel’s circuit-simulation tools compute the determinant of the nodal admittance matrix at every frequency point; the sign changes of this determinant locate the natural frequencies of the chip’s power grid.

Modern graph-neural-network layers in recommendation systems at Meta rely on the matrix-tree theorem: the number of spanning trees (used for regularization) equals any cofactor of the Laplacian, which is evaluated via determinant properties in \(O(n^2)\) time instead of \(O(n!)\).

In quantum computing, the fidelity of a two-qubit gate is bounded by the determinant of the partial-trace matrix; hardware teams at IBM Quantum use the multiplicative property \(\det(AB)=\det(A)\det(B)\) to factor the calculation across separate calibration runs.

Fundamental physics uses the same rules to show that the volume form on a symplectic manifold is preserved under canonical transformations, because the Jacobian matrix satisfies \(\det(J)=1\).

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Matrix and its entries   | Determinants are defined only for square matrices         |
| Row and column vectors   | Properties are stated in terms of row or column operations|
| Elementary row operations| Every property corresponds to one of these three operations|
| Transpose                | \(\det(A^T)=\det(A)\) lets you switch freely between rows and columns |

If any of these four ideas are shaky, pause and review the previous lesson on matrix basics before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Determinant changes sign on row swap
A determinant measures signed volume. Swapping two edges of a parallelepiped reverses its orientation, so the sign must flip.

Concrete example: swapping the two rows of \(\begin{pmatrix}1&0\\0&2\end{pmatrix}\) yields \(\begin{pmatrix}0&2\\1&0\end{pmatrix}\). The first matrix has determinant 2; the second has determinant \(-2\).

Formal statement:
\[
\det(P_{ij}A)=-\det(A)
\]
where \(P_{ij}\) is the permutation matrix that swaps rows \(i\) and \(j\).

> [!WARNING]
> Students often forget the sign change; later they obtain a positive answer when the correct value is negative and cannot locate the error.

### Step 2 — Scaling a row scales the determinant by the same factor
Stretching one edge of the parallelepiped by \(k\) multiplies its volume by \(k\).

Example: multiply the second row of the identity by 3 to obtain \(\operatorname{diag}(1,3)\); determinant becomes 3.

Formal statement:
\[
\det(E_i(k)A)=k\cdot\det(A)
\]
where \(E_i(k)\) multiplies row \(i\) by scalar \(k\).

### Step 3 — Adding a multiple of one row to another leaves the determinant unchanged
Shearing the parallelepiped parallel to one face does not change its volume.

Example: replace row 2 of \(\begin{pmatrix}1&0\\0&2\end{pmatrix}\) by row 2 plus 5 times row 1; the new matrix is still upper-triangular with the same diagonal, determinant remains 2.

Formal statement:
\[
\det(E_{ij}(k)A)=\det(A)
\]
where \(E_{ij}(k)\) adds \(k\) times row \(j\) to row \(i\).

### Step 4 — Determinant of transpose equals determinant of original matrix
The signed volume is independent of whether you view the edges as rows or as columns.

Formal statement:
\[
\det(A^T)=\det(A)
\]

### Step 5 — Multiplicative property
Because each elementary matrix multiplies determinants, the product of any sequence of them multiplies determinants.

Formal statement:
\[
\det(AB)=\det(A)\det(B)
\]
for any two square matrices of the same order.

### Step 6 — Determinant is zero precisely when rows (or columns) are linearly dependent
If one row is a linear combination of the others, the signed volume collapses to zero.

Formal statement:
\[
\det(A)=0\iff\text{the rows (columns) of }A\text{ are linearly dependent.}
\]

## 5. Worked examples — har step show karo

**Example 1 — Two-row swap**
*Given:* \(A=\begin{pmatrix}3&1\\4&2\end{pmatrix}\)
*Find:* \(\det(P_{12}A)\)

Swap rows:
\[
P_{12}A=\begin{pmatrix}4&2\\3&1\end{pmatrix}
\]
\[
\det(P_{12}A)=4\cdot1-2\cdot3=-2
\]
*Why:* Row swap multiplies determinant by \(-1\), and \(\det(A)=2\), so result must be \(-2\).

**Final answer**  
\(-2\)

*Reflection:* The sign flip is the only new information; the magnitude stays identical.

**Example 2 — Scaling plus addition**
*Given:* \(B=\begin{pmatrix}1&2\\3&4\end{pmatrix}\)
*Find:* determinant after multiplying row 1 by 5 and then adding 2 times new row 1 to row 2.

First scale: determinant becomes \(5\times(1\cdot4-2\cdot3)=5\times(-2)=-10\).

Then add: determinant unchanged, still \(-10\).

**Final answer**  
\(-10\)

*Reflection:* Scaling is the only operation that altered the value; the shear step was free.

**Example 3 — Using transpose**
*Given:* \(C=\begin{pmatrix}0&1&0\\0&0&1\\1&0&0\end{pmatrix}\)
*Find:* \(\det(C)\) and \(\det(C^T)\).

\(C\) is a permutation matrix for the cycle \((1\ 2\ 3)\); it contributes one inversion, so \(\det(C)=-1\). Because \(\det(C^T)=\det(C)\), the transpose also has determinant \(-1\).

**Final answer**  
\(-1\)

*Reflection:* You never need to recompute after transposing.

**Example 4 — Product of two matrices**
*Given:* \(A=\begin{pmatrix}2&0\\0&3\end{pmatrix}\), \(B=\begin{pmatrix}1&4\\0&1\end{pmatrix}\)
*Find:* \(\det(AB)\) without forming the product.

\[
\det(A)=6,\qquad\det(B)=1\implies\det(AB)=6\cdot1=6
\]

Direct multiplication yields \(AB=\begin{pmatrix}2&8\\0&3\end{pmatrix}\), whose determinant is also 6.

**Final answer**  
\(6\)

*Reflection:* Multiplicative property saves arithmetic when matrices are triangular or diagonal.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting the minus sign on row swap | Students remember “swap changes something” but drop the sign | Write the elementary-matrix determinant explicitly each time |
| Applying column rules to rows without transpose | Confusion between row and column operations | Always invoke \(\det(A^T)=\det(A)\) first            |
| Thinking “add multiple of row” changes determinant | Visual intuition confuses area with shear   | Remember shear preserves volume                      |
| Using \(\det(A+B)=\det(A)+\det(B)\) | Over-generalizing linearity                 | Test with 2×2 identity matrices; both sides differ   |
| Computing full expansion after row reduction | Old habit of cofactor expansion             | Stop as soon as matrix is triangular               |
| Ignoring that scaling factor multiplies determinant | Treating scaling as “just another operation” | Track the product of all scaling factors separately  |
| Assuming singular matrices have non-zero determinant after operations | Arithmetic slip hides linear dependence     | Check whether any row becomes all-zero               |

## 7. The textbook-precise statement
Let \(A\in M_n(\mathbb{R})\). The determinant function \(\det:M_n(\mathbb{R})\to\mathbb{R}\) is the unique alternating multilinear form on the columns that satisfies \(\det(I_n)=1\). Consequently it obeys:

1. \(\det(P_{ij}A)=-\det(A)\) for any transposition matrix \(P_{ij}\),
2. \(\det(E_i(k)A)=k\cdot\det(A)\),
3. \(\det(E_{ij}(k)A)=\det(A)\),
4. \(\det(A^T)=\det(A)\),
5. \(\det(AB)=\det(A)\det(B)\),
6. \(\det(A)=0\) if and only if the columns are linearly dependent.

These six statements appear verbatim in Hoffman & Kunze, *Linear Algebra*, 2nd ed., §5.3, Theorem 5 and Corollary 1.

## 8. Visual — diagram or schematic
```
Row operation effect on signed volume
Original parallelepiped          After swap          After scale k=2
   +-----+                       +-----+             +-------+
  /     /|                      /     /|            /       /|
 /     / |                     /     / |           /       / |
+-----+  |                    +-----+  |          +-------+  |
|     |  +                    |     |  +          |       |  +
|     | /                     |     | /           |       | /
|     |/                      |     |/            |       |/
+-----+                       +-----+             +-------+
 det = V                       det = -V            det = 2V
```
(The third figure is stretched only along one axis; volume doubles while orientation stays the same.)

## 9. The memory technique
1. **The hook** — Picture three wooden blocks forming a corner of a box. Swap two blocks → the corner now points the opposite way (sign flip). Stretch one block → the whole box stretches by that factor. Slide one block parallel to another → the box merely shears, volume unchanged.
2. **What to overlearn** — The three elementary-matrix determinants: transposition = −1, scaling by k = k, shear = 1. Also the multiplicative property \(\det(AB)=\det(A)\det(B)\).
3. **Spaced-repetition schedule** — Review the three elementary rules after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Return to the definition: determinant = signed volume of the parallelepiped spanned by the column vectors. Any operation whose geometric effect you can visualize immediately tells you the algebraic factor.

## 10. What this unlocks
These properties let you triangularize a matrix with row operations while keeping a running product of the determinant, turning an exponential calculation into an efficient algorithm. The same facts are prerequisites for:

- Cramer’s rule and explicit inverse formulas,
- eigenvalue multiplicity via characteristic polynomial,
- matrix-tree theorem in graph theory,
- change-of-variable formula in multivariable calculus,
- stability criteria in linear control theory (Routh–Hurwitz).

## 11. Self-check — five questions, no answers
1. If you swap rows 1 and 3 of a 4×4 matrix whose determinant is 7, what is the new determinant?
2. A matrix has two identical rows. Prove its determinant must be zero using only the properties above.
3. Compute \(\det\begin{pmatrix}1&2&3\\0&4&5\\0&0&6\end{pmatrix}\) after first adding 3 times row 2 to row 1, then explain why the value did not change.
4. Show that \(\det(A^2)=\det(A)^2\) without expanding any entries.
5. A student claims that adding 1 to every entry of a matrix multiplies its determinant by 1. Give a 2×2 counter-example and state which property was misapplied.