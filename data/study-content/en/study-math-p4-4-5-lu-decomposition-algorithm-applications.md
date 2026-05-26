## 1. The one-sentence answer
**LU decomposition factors a square matrix \(A\) into the product of a unit lower-triangular matrix \(L\) and an upper-triangular matrix \(U\) so that \(A=LU\).**

This factorization converts the single dense system \(Ax=b\) into two triangular systems that can be solved by forward and back substitution. The process mirrors Gaussian elimination: each elimination step that clears an entry below the pivot is recorded as a multiplier in \(L\), while the resulting row-reduced form becomes \(U\). Because the multipliers are stored separately, the same factorization can be reused for any number of right-hand sides without repeating the elimination work.

The algorithm succeeds without row exchanges precisely when every leading principal minor of \(A\) is nonzero; otherwise a permutation matrix \(P\) must be inserted to obtain the more general \(PA=LU\).

> [!NOTE]
> The decisive insight is that the elimination multipliers themselves form the sub-diagonal entries of \(L\); once you see that the “book-keeping” of Gaussian elimination is exactly the matrix \(L\), the decomposition appears automatically rather than being imposed from outside.

## 2. Why this matters — concrete and current
In computational fluid dynamics, NASA’s FUN3D solver factors the sparse Jacobian matrices arising from the Navier–Stokes equations once per Newton iteration and then re-uses the factors for multiple right-hand sides that encode different boundary conditions or adjoint variables.

Inside modern deep-learning frameworks, the cuSOLVER library supplied by NVIDIA performs batched LU factorizations on the small dense weight-update matrices that appear when training recurrent or graph neural networks on GPUs; the same factors are applied to thousands of mini-batch gradients in a single kernel launch.

Semiconductor device simulators such as Synopsys Sentaurus solve Poisson–drift-diffusion systems whose coefficient matrices change only modestly between bias points; an LU factorization computed at the first bias point is updated by rank-one modifications for subsequent points, cutting total runtime by roughly an order of magnitude.

In quantitative finance, the Longstaff–Schwartz least-squares Monte-Carlo algorithm for pricing Bermudan swaptions assembles a regression matrix whose normal equations are solved repeatedly for different exercise dates; a single LU factorization of that matrix serves all dates and is the dominant cost in production risk engines at major banks.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Matrix–vector multiplication | Defines the action of both \(L\) and \(U\) on vectors     |
| Forward and back substitution | The two triangular solves that replace a single dense solve |
| Leading principal minors   | Their non-vanishing guarantees that pivots never become zero |
| Elementary elimination matrices | Their product yields \(L^{-1}\) and therefore \(L\) itself |

## 4. Building the idea — from intuition to formalism

### Step 1 — Record the first column of multipliers
Plain-English claim: the numbers that multiply the pivot row to cancel entries beneath it are stored directly as the sub-diagonal entries of the first column of \(L\).

Concrete example: for the matrix whose first column is \([2,4,6]^\top\), the multipliers needed to zero the entries below the pivot 2 are exactly 2 and 3.

Formal statement:
\[
\ell_{i1}=\frac{a_{i1}}{a_{11}},\qquad i=2,\dots,n.
\]

> [!WARNING]
> If you store the multipliers in the wrong column or forget to divide by the pivot, the subsequent rows of \(U\) will be incorrect and the product \(LU\) will not recover \(A\).

### Step 2 — Apply the elimination to the remaining submatrix
Subtract the appropriate multiple of the first row from every row beneath it; the resulting \((n-1)\times(n-1)\) block is the Schur complement that must now be factored.

Formal statement:
\[
A^{(2)}=A(2:n,2:n)- \ell(2:n,1)\cdot u(1,2:n).
\]

### Step 3 — Repeat on the Schur complement
The same process applied to the smaller matrix \(A^{(2)}\) produces the second column of \(L\) and the second row of \(U\); recursion yields all remaining columns.

### Step 4 — Assemble \(L\) and \(U\)
Place the multipliers into the strictly lower-triangular part of \(L\), insert 1’s on its diagonal, and collect every pivot row into the corresponding row of \(U\).

Formal statement:
\[
A=LU,\qquad L=\bigl(I+\text{strictly lower multipliers}\bigr),\qquad U=\text{upper-triangular result of elimination}.
\]

### Step 5 — Existence condition
The factorization exists and is unique precisely when every leading principal minor is nonzero; this is the textbook hypothesis that replaces the informal “no zero pivots” statement.

## 5. Worked examples — every step shown

**Example 1 — 2-by-2 matrix with no pivoting**
- *Given:* \(A=\begin{pmatrix}2&1\\4&3\end{pmatrix}\).
- *Find:* \(L\) and \(U\) such that \(A=LU\).

Step 1: multiplier \(\ell_{21}=4/2=2\).  
*Why:* divide the (2,1) entry by the pivot.

Step 2: subtract 2 times row 1 from row 2 to obtain row \([0,1]\).  
*Why:* this is exactly Gaussian elimination on the single sub-diagonal entry.

Thus
\[
L=\begin{pmatrix}1&0\\2&1\end{pmatrix},\qquad
U=\begin{pmatrix}2&1\\0&1\end{pmatrix}.
\]
**Final answer**  
\[
LU=\begin{pmatrix}2&1\\4&3\end{pmatrix}.
\]

*Reflection:* the single multiplier became the (2,1) entry of \(L\); the pattern already shows how bookkeeping is stored.

**Example 2 — 3-by-3 matrix**
- *Given:* \(A=\begin{pmatrix}2&1&1\\4&3&2\\2&3&3\end{pmatrix}\).
- *Find:* \(L,U\).

Step 1: first column multipliers \(\ell_{21}=2\), \(\ell_{31}=1\).  
*Why:* divide each entry by pivot 2.

After elimination the Schur complement is
\[
\begin{pmatrix}1&0\\1&2\end{pmatrix}.
\]

Step 2: second-column multiplier \(\ell_{32}=1/1=1\).  
*Why:* divide the new (3,2) entry by the new pivot.

Hence
\[
L=\begin{pmatrix}1&0&0\\2&1&0\\1&1&1\end{pmatrix},\qquad
U=\begin{pmatrix}2&1&1\\0&1&0\\0&0&2\end{pmatrix}.
\]
**Final answer**  
\[
LU=A.
\]

*Reflection:* each multiplier column is filled before the next Schur complement is formed; the process is strictly sequential.

**Example 3 — reuse for two right-hand sides**
- *Given:* the factors from Example 2 and \(b_1=[1,2,3]^\top\), \(b_2=[0,1,1]^\top\).
- *Find:* both solutions \(x\).

Forward substitution \(Ly=b\) for each \(b\), followed by back substitution \(Ux=y\).  
**Final answer**  
\[
x_1=\begin{pmatrix}-1\\2\\1\end{pmatrix},\qquad
x_2=\begin{pmatrix}0\\1\\0\end{pmatrix}.
\]

*Reflection:* the expensive factorization is performed only once; each new right-hand side costs only \(O(n^2)\) triangular solves.

**Example 4 — 4-by-4 matrix requiring the existence test**
- *Given:* a matrix whose leading 3-by-3 minor is singular.
- *Find:* whether an LU factorization without permutation exists.

The (3,3) pivot becomes zero after two steps; the algorithm halts.  
**Final answer**  
No LU factorization exists without row exchanges.

*Reflection:* the leading-minor test is both necessary and sufficient; checking it beforehand prevents wasted arithmetic.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Storing multipliers in \(U\) instead of \(L\) | Confusion between the elimination record and the reduced matrix | Write the unit diagonal of \(L\) explicitly before coding |
| Proceeding after a zero pivot appears | Forgetting that a zero pivot violates the leading-minor hypothesis | Test the first \(k\) leading minors before starting |
| Forgetting that \(L\) has 1’s on the diagonal | Treating the multipliers as a general lower-triangular matrix | Insert the 1’s by definition when assembling \(L\) |
| Recomputing elimination for each new \(b\) | Missing the reuse property of the factorization | Factor once, solve triangular systems repeatedly |
| Applying the algorithm to a non-square matrix | Over-generalizing the square-matrix statement | Restrict the routine to \(n\times n\) input |
| Overlooking growth of entries without pivoting | Assuming all entries remain moderate | Monitor element growth or switch to partial pivoting |
| Confusing \(PA=LU\) with \(A=LU\) | Treating permutation as optional rather than mandatory when needed | Always compute the permutation vector alongside the factors |

## 7. The textbook-precise statement
Let \(A\in\mathbb{R}^{n\times n}\). Suppose every leading principal minor of \(A\) is nonzero. Then there exist unique matrices \(L\) (unit lower triangular) and \(U\) (upper triangular) such that \(A=LU\). Moreover, the entries of \(L\) below the diagonal are exactly the multipliers arising in Gaussian elimination without pivoting, and the rows of \(U\) are the successive Schur complements. (Golub & Van Loan, *Matrix Computations*, 4th ed., §3.2, Theorem 3.2.1.)

## 8. Visual — diagram or schematic
```text
A                  L                  U
┌─────────┐        ┌─────────┐        ┌─────────┐
│ a11 a12 │        │  1   0  │        │ u11 u12 │
│ a21 a22 │   =    │ ℓ21  1  │   ×    │  0  u22 │
└─────────┘        └─────────┘        └─────────┘

Elimination step:
row2 ← row2 − ℓ21·row1   (ℓ21 = a21/a11)
records ℓ21 directly into L; U receives the updated row.
```

## 9. The memory technique
1. **The hook** — picture the lower triangle \(L\) as a “ledger” that writes down every multiplier you used while erasing entries beneath the pivots; the upper triangle \(U\) is simply the cleaned-up matrix left on the whiteboard.
2. **What to overlearn** — \(A=LU\) with \(L\) unit lower triangular; forward substitution costs \(n^2/2\) flops; existence ⇔ all leading principal minors nonzero.
3. **Spaced-repetition schedule** — review the 2-by-2 derivation after 1 day, factor a 4-by-4 matrix after 3 days, implement the algorithm from scratch after 7 days, prove uniqueness after 16 days, and compare with partial pivoting after 35 days.
4. **First-principles fallback** — start from Gaussian elimination on a generic column, record each multiplier, and verify by direct multiplication that the product recovers the original column.

## 10. What this unlocks
LU decomposition is the workhorse that turns dense linear algebra into a sequence of cheap triangular solves; it therefore underpins the next layer of algorithms that reuse factorizations.

- Cholesky factorization for symmetric positive-definite matrices
- Partial pivoting and PA=LU for numerical stability
- Sparse direct solvers (UMFPACK, SuperLU) that reorder fill-in
- Matrix inversion via \(A^{-1}=U^{-1}L^{-1}\)
- Condition-number estimation via the factored form
- Iterative refinement that corrects rounding errors using the same \(L\) and \(U\)

## 11. Self-check — five questions, no answers
1. Compute the LU factorization of \(\begin{pmatrix}3&1\\6&4\end{pmatrix}\) by hand and verify the product.
2. For which of the matrices \(\begin{pmatrix}0&1\\1&0\end{pmatrix}\) and \(\begin{pmatrix}1&1\\1&1\end{pmatrix}\) does an LU factorization without permutation exist?
3. A linear system \(Ax=b\) has already been factored as \(LU\). How many flops are required to obtain the solution for a second right-hand side of the same dimension?
4. Explain why storing the multipliers of \(L\) below the diagonal of the working array does not destroy any information needed for \(U\).
5. Suppose the third leading principal minor of a 5-by-5 matrix is zero while all earlier ones are nonzero. At which step of the algorithm does the procedure become undefined, and why?