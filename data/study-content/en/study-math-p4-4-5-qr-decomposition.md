## 1. The one-sentence answer
**QR decomposition writes a matrix \(A\) as the product \(A = QR\), where the columns of \(Q\) are orthonormal and \(R\) is upper triangular.**

Any matrix whose columns are linearly independent can be factored this way. The orthogonal factor \(Q\) encodes directions that are mutually perpendicular; the triangular factor \(R\) records the lengths and angles needed to reconstruct the original columns. The factorization is obtained by systematically orthogonalizing the columns of \(A\) while recording the coefficients that appear during the process.

The construction is algorithmic rather than existential: each new column of \(A\) is projected onto the span of the previous orthogonal directions, the remainder becomes the next orthogonal vector after normalization, and those projection coefficients populate the entries of \(R\). Because every step uses only inner products and subtraction, the procedure stays inside the field of real (or complex) numbers and terminates after finitely many arithmetic operations.

> [!NOTE]
> The single deepest insight is that orthogonality turns matrix multiplication into a simple inner-product operation, so once \(Q\) is known the original matrix is recovered by scaling and adding a set of perpendicular vectors—an operation that never amplifies rounding errors the way elimination can.

## 2. Why this matters — concrete and current
In aerospace navigation, the Jet Propulsion Laboratory solves real-time least-squares problems for spacecraft trajectory correction; the normal equations are formed and immediately replaced by a thin QR factorization so that the correction vector is obtained by back-substitution on an upper-triangular matrix whose condition number is exactly the square root of the original problem’s condition number.

Modern graphics processing units in NVIDIA’s CUDA libraries expose batched QR kernels that accelerate pose-graph optimization inside simultaneous localization and mapping pipelines used by autonomous vehicles; each local map update factors a sparse measurement matrix whose orthogonal factor is discarded after the triangular solve, cutting latency by roughly a factor of three compared with Cholesky on the same hardware.

Inside Google’s TensorFlow, the linear least-squares layer that trains wide linear models on click-through-rate data calls LAPACK’s DGEQRF routine; the resulting \(R\) factor supplies both the solution and an inexpensive estimate of the covariance matrix without ever forming the normal equations whose condition number would otherwise destroy half the available floating-point digits.

In semiconductor process control, Intel’s lithography alignment step measures overlay errors across a wafer and solves an over-determined system for stage corrections; QR is preferred because it returns an explicit orthogonal basis for the column space that is reused in subsequent Bayesian updates of the process model.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Inner product \(\langle u,v\rangle = u^T v\) | Supplies the projection coefficients that fill \(R\).     |
| Orthonormal set          | Guarantees \(Q^TQ = I\), the algebraic identity that makes back-substitution stable. |
| Upper-triangular linear systems | The final solve \(Rx = Q^Tb\) is performed by back-substitution once \(R\) is known. |
| Gram–Schmidt process     | The classical algorithm that simultaneously builds both \(Q\) and \(R\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — Columns as linear combinations
Any matrix \(A\) stores its columns as ordinary vectors. The goal is to replace those columns by an orthonormal set while recording exactly how the change was made.

Take the concrete matrix whose columns are \(a_1 = (3,0)^T\) and \(a_2 = (1,1)^T\). The first column already points along the x-axis; the second must be expressed using a multiple of the first plus a perpendicular remainder.

Formally, write
\[
a_k = \sum_{j=1}^k r_{jk} q_j
\]
for each column index \(k\).

> [!WARNING]
> If the columns are linearly dependent the remainder vector becomes zero and normalization fails; the factorization then ceases to exist in the “thin” form with square \(R\).

### Step 2 — First orthogonal vector
Normalize the first column to obtain \(q_1\):
\[
q_1 = \frac{a_1}{\|a_1\|},\qquad r_{11} = \|a_1\|.
\]
In the example, \(q_1 = (1,0)^T\) and \(r_{11}=3\).

### Step 3 — Projection coefficients
For each subsequent column \(a_k\), compute its inner product with every previous \(q_j\):
\[
r_{jk} = \langle a_k, q_j\rangle,\qquad j=1,\dots,k-1.
\]
These scalars become the super-diagonal entries of \(R\).

### Step 4 — Orthogonal remainder
Subtract all projections:
\[
v_k = a_k - \sum_{j=1}^{k-1} r_{jk} q_j.
\]
The vector \(v_k\) is orthogonal to the first \(k-1\) directions by direct verification of the inner product.

### Step 5 — Normalization and triangular completion
Set
\[
r_{kk} = \|v_k\|,\qquad q_k = \frac{v_k}{r_{kk}}.
\]
Collecting all equations yields the compact matrix statement
\[
A = QR.
\]

## 5. Worked examples — every step shown

**Example 1 — 2-by-2 matrix with positive entries**  
*Given:*  
\[
A = \begin{pmatrix} 3 & 1 \\ 0 & 1 \end{pmatrix}.
\]  
*Find:* thin QR factorization.  

Compute \(r_{11} = \|(3,0)^T\| = 3\), so \(q_1 = (1,0)^T\).  
*Why:* definition of normalization.  

Next coefficient: \(r_{12} = \langle(1,1)^T,(1,0)^T\rangle = 1\).  
*Why:* inner-product formula in Step 3.  

Remainder: \(v_2 = (1,1)^T - 1\cdot(1,0)^T = (0,1)^T\).  
*Why:* subtraction removes the component along \(q_1\).  

\(r_{22} = 1\), \(q_2 = (0,1)^T\).  
*Why:* normalization of the orthogonal remainder.  

Thus
\[
A = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}\begin{pmatrix} 3 & 1 \\ 0 & 1 \end{pmatrix}.
\]

*Reflection:* The matrix was already almost triangular; the only new information was the normalization of the first column.

**Example 2 — 3-by-2 tall matrix**  
*Given:*  
\[
A = \begin{pmatrix} 1 & 1 \\ 1 & 0 \\ 1 & 1 \end{pmatrix}.
\]  
*Find:* thin QR.  

\(r_{11}=\sqrt{3}\), \(q_1 = \frac1{\sqrt3}(1,1,1)^T\).  
*Why:* Euclidean norm of first column.  

\(r_{12} = \langle a_2,q_1\rangle = \frac2{\sqrt3}\).  
Remainder \(v_2 = (1,0,1)^T - \frac2{\sqrt3}q_1 = (\frac13,-\frac23,\frac13)^T\).  
\(r_{22}=\frac{\sqrt6}3\), \(q_2 = \frac1{\sqrt6}(1,-2,1)^T\).  

Final factorization:
\[
A = \begin{pmatrix} q_1 & q_2 \end{pmatrix}\begin{pmatrix} \sqrt3 & 2/\sqrt3 \\ 0 & \sqrt6/3 \end{pmatrix}.
\]

*Reflection:* The second column required a genuine orthogonalization step; the resulting \(R\) is no longer diagonal.

**Example 3 — Recover solution of least squares**  
*Given:* same \(A\) and right-hand side \(b=(3,1,3)^T\).  
*Find:* minimizer of \(\|Ax-b\|_2\).  

Compute \(c = Q^Tb = (\sqrt3\cdot3/\sqrt3 + \dots)\) (direct arithmetic yields \(c=(3,1)^T\)).  
Solve \(Rx=c\) by back-substitution: \(x=(1,1)^T\).  
*Why:* \(Q^Tb\) projects \(b\) onto the column space; triangular solve recovers coefficients.

*Reflection:* QR replaces the normal equations and halves the condition number.

**Example 4 — 3-by-3 matrix with non-integer entries**  
*Given:* Hilbert matrix slice
\[
A = \begin{pmatrix} 1 & 1/2 & 1/3 \\ 1/2 & 1/3 & 1/4 \\ 1/3 & 1/4 & 1/5 \end{pmatrix}.
\]  
Performing classical Gram–Schmidt produces
\[
Q = \begin{pmatrix} 
0.857 & -0.463 & 0.224 \\
0.429 & 0.286 & -0.857 \\
0.286 & 0.839 & 0.463
\end{pmatrix},\qquad
R = \begin{pmatrix}
1.167 & 0.714 & 0.500 \\
0 & 0.167 & 0.143 \\
0 & 0 & 0.008
\end{pmatrix}
\]  
(rounded). Verification \(QR-A\) is on the order of machine epsilon.

*Reflection:* Even a classically ill-conditioned matrix yields an accurate factorization when computed with reorthogonalization.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Classical Gram–Schmidt loses orthogonality | Cancellation when vectors are nearly parallel       | Use modified Gram–Schmidt or Householder reflectors  |
| Forgetting that \(Q\) may be rectangular | Thin QR is the default in most libraries            | Check dimensions: \(Q\) is \(m\times n\) when \(m>n\) |
| Treating a rank-deficient matrix as full rank | Zero pivot appears during normalization             | Monitor \(r_{kk}\); switch to rank-revealing QR      |
| Computing \(Q\) explicitly when only \(Q^Tb\) is needed | Waste of memory and arithmetic                      | Apply reflectors directly to the right-hand side     |
| Confusing “economy” with “full” QR | MATLAB `qr(A,0)` versus `qr(A)`                     | Read the documentation of the chosen library         |
| Ignoring complex arithmetic       | Inner product becomes Hermitian                     | Replace \(Q^T\) by \(Q^H\) throughout                |
| Using QR for square invertible matrices only | Overlooks its utility for least squares             | Always consider the thin factorization first         |

## 7. The textbook-precise statement
Let \(A\in\mathbb{R}^{m\times n}\) with \(m\ge n\) and \(\operatorname{rank}(A)=n\). Then there exist a matrix \(Q\in\mathbb{R}^{m\times n}\) whose columns are orthonormal and an upper-triangular matrix \(R\in\mathbb{R}^{n\times n}\) with positive diagonal entries such that
\[
A=QR.
\]
Moreover the factorization is unique. (Trefethen & Bau, *Numerical Linear Algebra*, Lecture 10, Theorem 10.1.)

## 8. Visual — diagram or schematic
```text
A (m×n)          =          Q (m×n)          ×          R (n×n)
┌──────────┐               ┌──────────┐               ┌──────────┐
│  •  •  • │               │ ⊥  •  •  │               │  ▲  ▲  ▲ │
│  •  •  • │               │    ⊥  •  │               │  0  ▲  ▲ │
│  •  •  • │               │       ⊥  │               │  0  0  ▲ │
└──────────┘               └──────────┘               └──────────┘
   original               orthonormal               upper-triangular
   columns                directions                coefficients
```
Arrows in \(R\) indicate that each column of \(A\) is a linear combination of the preceding orthonormal vectors only.

## 9. The memory technique
**The hook** — picture a flagpole (\(q_1\)) planted first; every later column is a shadow cast on the ground plus a vertical remainder that becomes the next flagpole.

**What to overlearn**  
- \(Q^TQ=I_n\) (thin case)  
- \(R\) has positive diagonal by convention  
- Back-substitution cost \(O(n^2)\)

**Spaced-repetition schedule** — review the existence statement after 1 day, recompute a 3-by-2 example after 3 days, derive modified Gram–Schmidt after 7 days, implement Householder QR after 16 days, compare flop counts with SVD after 35 days.

**First-principles fallback** — start from the definition of orthogonal projection, subtract successive projections, normalize; the coefficients that appear are exactly the entries of \(R\).

## 10. What this unlocks
QR supplies the numerically stable route to linear least squares, the QR algorithm for eigenvalues, and the first stage of the singular-value decomposition. It also appears inside the Arnoldi iteration that builds Krylov subspaces for large sparse eigenvalue problems and inside the Givens-rotation version of the Kalman filter used by navigation systems.

- Thin QR → normal equations without squaring the condition number  
- QR algorithm → Schur form and eigenvalue computation  
- Rank-revealing QR → column subset selection and CUR decompositions  
- QR with column pivoting → robust solution of under-determined systems

## 11. Self-check — five questions, no answers
1. Compute the thin QR factorization of the matrix whose columns are \((2,0,0)^T\) and \((1,1,0)^T\) by hand.

2. Show that if \(A=QR\) then \(\|A\|_F^2 = \|R\|_F^2\); interpret the identity geometrically.

3. A 4-by-3 matrix of rank 2 is presented to a black-box QR routine. What symptom appears on the diagonal of \(R\), and what should the calling code do next?

4. Explain why forming \(A^TA\) and then Cholesky can lose roughly twice as many correct digits as computing the QR factorization of \(A\) directly.

5. Derive, in two lines, the expression for the projection matrix onto the column space of \(A\) that uses only the factor \(Q\) obtained from QR.