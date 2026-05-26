## 1. The one-sentence answer
**Least squares finds the vector \(x\) that minimizes the Euclidean norm \(\|Ax - b\|_2\) for an overdetermined system \(Ax = b\) by solving either the normal equations or the reduced system obtained from the thin QR factorization of \(A\).**

An overdetermined linear system has more equations than unknowns, so \(b\) usually lies outside the column space of \(A\). The best \(x\) is the one whose image \(Ax\) is the orthogonal projection of \(b\) onto that column space; the residual \(b - Ax\) is then perpendicular to every column of \(A\).

This geometric requirement produces two algebraic routes. The first multiplies the residual equation by \(A^T\) and yields a square symmetric system whose solution is the minimizer. The second exploits the fact that any matrix with full column rank admits a factorization \(A = QR\) with orthonormal columns in \(Q\); substituting immediately isolates the minimizer without forming the squared matrix \(A^TA\).

> [!NOTE]
> The normal equations are algebraically simplest yet numerically fragile because they square the condition number of \(A\); the QR route preserves stability at the modest extra cost of an orthogonal factorization.

## 2. Why this matters — concrete and current
SpaceX uses batch least-squares orbit determination to fuse noisy radar and GPS measurements into a single trajectory estimate; each new tracking pass augments the matrix \(A\) and the normal-equation or QR solve is repeated in under a second on flight hardware.

Google’s internal linear-regression pipeline for click-through-rate prediction solves millions of sparse least-squares problems daily; the QR-based solver inside TensorFlow’s `tf.linalg.lstsq` is chosen precisely because it avoids the ill-conditioning that would arise from forming \(A^TA\) on feature matrices with highly correlated columns.

Semiconductor foundries align successive photolithography layers by solving a six-parameter rigid-motion least-squares problem on hundreds of overlay metrology points; the QR formulation guarantees that round-off error remains below the 0.1 nm tolerance required at the 3 nm node.

Radio astronomers at the Event Horizon Telescope reconstruct images by regularized least squares on visibility data; the normal equations are solved iteratively with a preconditioned conjugate-gradient method whose convergence rate is governed by the same \(A^TA\) matrix that appears in the classical derivation.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Matrix–vector multiplication and transpose | Required to form \(A^TA\) and to interpret orthogonality of the residual. |
| Column space and orthogonal projection | The geometric definition of the minimizer is the projection onto \(\operatorname{col}(A)\). |
| Euclidean norm and inner product | The objective \(\|Ax-b\|_2^2 = (Ax-b)^T(Ax-b)\) expands directly into the normal equations. |
| Thin QR factorization    | The stable algorithmic route replaces \(A^TA\) by the triangular factor \(R\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — Overdetermined systems have no exact solution
When \(A\) is \(m\times n\) with \(m>n\), the equation \(Ax=b\) is usually inconsistent.  
Concrete example: two lines in the plane that do not intersect.  
Formally, \(b\notin\operatorname{col}(A)\).  
> [!WARNING]  
> Treating the system as square and attempting elimination produces a meaningless pivot or an inconsistent last row; the inconsistency must be accepted and minimized instead.

### Step 2 — The residual must be orthogonal to the column space
The vector \(r = b - Ax\) of smallest length satisfies \(r\perp\operatorname{col}(A)\), i.e., \(A^Tr=0\).  
Example: the shortest distance from a point to a plane is along the normal.  
Thus \(A^T(b-Ax)=0\).  
> [!WARNING]  
> Forgetting the transpose yields the meaningless statement \(A(b-Ax)=0\), which only recovers the original inconsistent equations.

### Step 3 — The normal equations appear
Rearrangement produces the square system
\[
A^TAx = A^Tb.
\]
When \(A\) has full column rank, \(A^TA\) is symmetric positive definite and therefore invertible.

### Step 4 — Thin QR factorization replaces the normal equations
Any full-column-rank matrix admits \(A=QR\) where the columns of \(Q\) are orthonormal and \(R\) is upper triangular and nonsingular.  
Substitute into the orthogonality condition:
\[
Q^TRx = Q^Tb \implies Rx = Q^Tb.
\]
Back-substitution on the triangular system is stable and never forms the squared matrix \(A^TA\).

### Step 5 — The minimizer is unique
Both routes return the same unique \(x\) because the normal equations and the reduced QR system are mathematically equivalent when \(A\) has full column rank.

## 5. Worked examples — every step shown

**Example 1 — Two equations, one unknown**  
*Given:*  
\[
A = \begin{pmatrix}1\\2\end{pmatrix},\quad b=\begin{pmatrix}1\\3\end{pmatrix}.
\]  
*Find:* the least-squares solution.  

Step 1: Form \(A^TA = 1+4=5\).  
*Why:* inner product of the single column with itself.  

Step 2: Form \(A^Tb=1+6=7\).  
*Why:* inner product of the column with the right-hand side.  

Step 3: Solve \(5x=7\) to obtain \(x=7/5\).  
*Why:* scalar division.  

**Answer**  
\[ x = \frac{7}{5} \]

*Reflection:* The arithmetic is trivial yet already shows that the residual \((1-7/5,3-14/5)^T\) is orthogonal to the column \((1,2)^T\).

**Example 2 — Three equations, two unknowns**  
*Given:*  
\[
A=\begin{pmatrix}1&0\\1&1\\0&1\end{pmatrix},\quad b=\begin{pmatrix}1\\2\\2\end{pmatrix}.
\]  
*Find:* \(x\).  

Normal-equation route:  
\(A^TA=\begin{pmatrix}2&1\\1&2\end{pmatrix}\), \(A^Tb=\begin{pmatrix}3\\4\end{pmatrix}\).  
Solve the \(2\times2\) system to obtain \(x=(2/3,5/3)^T\).

QR route: thin QR yields  
\(Q=\frac1{\sqrt2}\begin{pmatrix}1&-1\\1&1\\0&\sqrt2\end{pmatrix}\), \(R=\sqrt2\begin{pmatrix}1&1/\sqrt2\\0&1\end{pmatrix}\).  
Back-substitution again returns \(x=(2/3,5/3)^T\).

**Answer**  
\[ x = \begin{pmatrix}2/3\\5/3\end{pmatrix} \]

*Reflection:* Both methods agree; the QR route avoids forming a matrix whose condition number is already squared.

**Example 3 — Rank-deficient case (requires care)**  
*Given:* identical columns in \(A\). The normal matrix becomes singular; QR with column pivoting or the pseudoinverse must be used.

**Example 4 — Larger sparse regression**  
A \(1000\times50\) Vandermonde matrix for polynomial fitting of degree 49 is solved via QR; the normal matrix has condition number roughly \(10^{30}\) while the QR route remains accurate to machine precision.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forming \(A^TA\) when \(\kappa(A)>10^8\) | Squaring amplifies the condition number | Use QR or SVD instead |
| Treating a rank-deficient problem as full rank | Columns are linearly dependent | Compute rank-revealing QR or check \(\sigma_{\min}(R)\) |
| Using normal equations in floating-point without pivoting | Loss of symmetry or positive-definiteness | Switch to Householder QR |
| Forgetting that \(Q\) must have orthonormal columns | Using any factorization called “QR” | Verify \(Q^TQ=I\) after factorization |
| Solving the normal equations by Cholesky when \(A\) is sparse but \(A^TA\) is dense | Fill-in destroys sparsity | Use iterative methods (LSQR, CGLS) on the original \(A\) |
| Ignoring scaling of rows of \(A\) | Large rows dominate the residual | Row-scale so that each equation has comparable expected error |
| Reporting \(x\) without the residual norm | The minimizer alone does not certify quality | Always compute and report \(\|b-Ax\|_2\) |

## 7. The textbook-precise statement
Let \(A\in\mathbb{R}^{m\times n}\) with \(m\ge n\) and \(\operatorname{rank}(A)=n\). The unique minimizer of \(\|Ax-b\|_2\) is the solution of the normal equations
\[
A^TAx=A^Tb
\]
and is given explicitly by
\[
x=(A^TA)^{-1}A^Tb.
\]
Equivalently, if \(A=QR\) is the thin QR factorization with \(Q^TQ=I_n\) and \(R\) upper triangular and nonsingular, then
\[
x=R^{-1}Q^Tb.
\]
(See Golub & Van Loan, *Matrix Computations*, 4th ed., §5.3.2 and §5.5.1.)

## 8. Visual — diagram or schematic
```text
          b
         /|
        / | r = b - Ax   (orthogonal to col(A))
       /  |
      /   |
     Ax   |  
      \   |
       \  |
        \ |
         \|
        col(A) spanned by columns of A (or Q)
```
The right triangle shows the decomposition \(b = Ax + r\) with \(r\perp\operatorname{col}(A)\). The QR route replaces the possibly ill-conditioned basis of \(A\) by the orthonormal basis of \(Q\), after which the coordinate vector of the projection is simply \(Q^Tb\) and the triangular factor \(R\) converts it back to the original coordinates.

## 9. The memory technique

1. **The hook** — Picture the residual vector standing straight up from the column-space “floor”; its shadow on the floor is zero precisely when the normal equations hold.  
2. **What to overlearn** — \(A^TAx=A^Tb\) and \(Rx=Q^Tb\) (the two equivalent statements).  
3. **Spaced-repetition schedule** — Review the derivation at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from the geometric requirement \(A^T(b-Ax)=0\) and derive both algebraic routes in under two minutes.

## 10. What this unlocks
Mastery of the normal equations and the QR route is the gateway to all modern numerical linear algebra that deals with rectangular or noisy data.

- Iterative methods (LSQR, MINRES) for large sparse least squares  
- Total-least-squares and errors-in-variables models  
- Regularized regression (ridge, lasso) via augmented QR  
- Kalman filtering and recursive least squares in control theory  
- The singular-value decomposition as the ultimate stable route when rank deficiency appears  

## 11. Self-check — five questions, no answers
1. Derive the normal equations from the orthogonality condition \(A^Tr=0\) in three lines.  
2. Show that the QR solution satisfies the normal equations without computing \(A^TA\).  
3. A \(3\times2\) matrix has columns that are almost parallel; which method loses digits first and why?  
4. Construct a concrete \(2\times1\) example where the residual is orthogonal to the single column yet the normal matrix is ill-conditioned.  
5. Explain in one paragraph why row scaling before forming the QR factorization improves numerical reliability even though the mathematical minimizer is unchanged.