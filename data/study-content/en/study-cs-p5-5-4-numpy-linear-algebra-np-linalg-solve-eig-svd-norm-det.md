## 1. The one-sentence answer
**NumPy's `linalg` module supplies direct, numerically stable wrappers around LAPACK routines that solve linear systems, extract spectral information, and quantify matrix properties.**

These five functions map one-to-one onto the fundamental tasks of linear algebra: finding the unique solution vector when a square coefficient matrix multiplies an unknown vector, recovering the natural stretch-and-rotate directions of a transformation, separating any matrix into independent scaling and orthogonal components, measuring size in any chosen norm, and computing the signed volume scaling factor. In practice you import them once, pass ordinary NumPy arrays, and obtain results whose floating-point accuracy is limited only by the conditioning of the input data rather than by Python-level loops.

The same calls appear unchanged whether the matrix is 3-by-3 or 30 000-by-30 000; the underlying Fortran kernels automatically exploit cache locality and multiple cores. Consequently the difference between a slow prototype and a production-grade scientific code often reduces to replacing explicit Python loops with a single `np.linalg` invocation.

> [!NOTE]
> Every one of these routines returns an answer whose residual is on the order of machine epsilon times the condition number; the real intellectual work is therefore to recognise when that residual is still too large for the intended application.

## 2. Why this matters — concrete and current
SpaceX’s flight-software team solves 6-by-6 rigid-body dynamics matrices at 100 Hz on the Falcon 9 booster; `np.linalg.solve` supplies the instantaneous thrust-vector commands that keep the vehicle inside its narrow re-entry corridor.  

In semiconductor lithography, ASML’s computational scanners minimise wavefront aberrations by solving a 200-by-200 least-squares system extracted from measured pupil data; the same `solve` call runs inside the real-time control loop that prints 3 nm features.  

Google’s TensorFlow Probability library calls `np.linalg.svd` to orthogonalise the covariance factors of high-dimensional Gaussian processes that drive recommendation models serving billions of users.  

LIGO’s gravitational-wave pipelines diagonalise 40-by-40 noise covariance matrices with `eig` to construct the optimal matched filter that first detected binary-black-hole mergers.  

Protein-structure prediction packages such as Rosetta compute the determinant of 3-by-3 rotation matrices to verify that each candidate conformation preserves right-handed chirality before scoring it against experimental NMR data.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Matrix–vector multiplication | Defines the linear system \(Ax=b\) that `solve` accepts   |
| Eigenvalue equation      | Direct definition of the output of `eig`                  |
| Orthogonal matrices      | Columns of \(U\) and \(V\) returned by `svd` are orthonormal |
| Vector and matrix norms  | `norm` generalises length; required for residual checks   |
| Determinant as volume scaling | `det` returns the factor by which volumes are multiplied |

## 4. Building the idea — from intuition to formalism

### Step 1 — Linear dependence and unique solutions
A square matrix maps an input vector to an output vector. When every direction is stretched by a non-zero amount, exactly one input recovers any desired output.  
Example: the matrix \(\begin{pmatrix}2&0\\0&3\end{pmatrix}\) stretches the unit square into a rectangle; the vector \((4,9)\) is reached only by \((2,3)\).  
Formally, given \(A\in\mathbb{R}^{n\times n}\) and \(b\in\mathbb{R}^n\), the statement “\(A\) is invertible” is equivalent to the existence of a unique \(x\) satisfying  
\[
Ax=b.
\]
> [!WARNING]
> If the rows of \(A\) are linearly dependent, `solve` raises `LinAlgError`; silently returning a least-squares answer would hide the modelling mistake.

### Step 2 — Spectral decomposition
Any diagonalizable matrix can be written as a product of its eigenvectors and a diagonal matrix of stretch factors.  
Example: the same matrix above has eigenvectors along the coordinate axes with eigenvalues 2 and 3.  
Formally,  
\[
A=PDP^{-1},\qquad D=\operatorname{diag}(\lambda_i).
\]
`eig` returns the columns of \(P\) and the vector of \(\lambda_i\).

### Step 3 — Singular-value decomposition
Every matrix, square or rectangular, factors into two orthogonal matrices and a diagonal matrix of non-negative singular values.  
\[
A=U\Sigma V^T.
\]
`svd` returns \(U\), the vector of singular values, and \(V^T\).

### Step 4 — Norm as size
The Euclidean norm of a vector is the square root of the sum of squared entries; the induced 2-norm of a matrix is its largest singular value.  
`norm` accepts an `ord` argument that selects among common definitions.

### Step 5 — Determinant as signed volume
The absolute value of the determinant equals the volume of the parallelepiped formed by the column vectors; its sign records orientation reversal.  
`det` computes this scalar directly from the product of eigenvalues.

## 5. Worked examples — every step shown

**Example 1 — Solving a 2-by-2 circuit equation**  
*Given:* \(A=\begin{pmatrix}3&1\\1&2\end{pmatrix}\), \(b=\begin{pmatrix}9\\8\end{pmatrix}\).  
*Find:* \(x\) such that \(Ax=b\).  
```python
import numpy as np
A = np.array([[3.,1.],[1.,2.]])
b = np.array([9.,8.])
x = np.linalg.solve(A,b)
```
Step 1: form the augmented matrix — *Why*: encodes the system compactly.  
Step 2: call `solve` — *Why*: LAPACK’s LU factorization yields the unique solution in \(O(n^3)\) time.  
**Answer:**  
\[ x = \begin{pmatrix} 2 \\ 3 \end{pmatrix} \]  
*Reflection:* The matrix is symmetric positive-definite; the same call works unchanged for any well-conditioned square system.

**Example 2 — Eigenvalues of a rotation-scaling matrix**  
*Given:* \(A=\begin{pmatrix}1&-1\\1&1\end{pmatrix}\).  
*Find:* eigenvalues and eigenvectors.  
```python
w, v = np.linalg.eig(A)
```
*Why*: the characteristic polynomial \(\lambda^2-2\lambda+2=0\) has roots \(1\pm i\).  
**Answer:**  
\[ \lambda = 1\pm i,\qquad v=\begin{pmatrix}1\\1-i\end{pmatrix},\begin{pmatrix}1\\1+i\end{pmatrix} \] (normalised).  
*Reflection:* Complex output signals that the transformation contains rotation; magnitude \(\sqrt{2}\) is the scaling factor.

**Example 3 — Rank-revealing SVD**  
*Given:* a 3-by-2 matrix of rank 1.  
*Find:* singular values.  
`np.linalg.svd` returns one non-zero singular value and one numerical zero; the gap diagnoses rank.  
*Reflection:* tolerance decisions must be made relative to machine epsilon times the largest singular value.

**Example 4 — Condition-number check via norm and det**  
*Given:* a 4-by-4 Hilbert matrix.  
Compute `np.linalg.norm(A,2)*np.linalg.norm(np.linalg.inv(A),2)` and compare with `1/abs(np.linalg.det(A))`; both approximate the condition number.  
*Reflection:* when the determinant is smaller than \(10^{-15}\) while the norm product exceeds \(10^{10}\), `solve` will lose all accuracy.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using `solve` on a singular matrix | LAPACK raises an error only after factorization | Call `np.linalg.cond` or `det` first         |
| Expecting real eigenvectors       | Rotation matrices produce complex pairs     | Test `np.iscomplexobj` and handle accordingly |
| Comparing singular values to zero with `==` | Floating-point noise                       | Use `np.linalg.matrix_rank` or a tolerance   |
| Forgetting that `norm` defaults to Frobenius | Induced 2-norm is expensive to compute     | Explicitly pass `ord=2` when needed          |
| Overwriting the input array       | Some LAPACK routines operate in place       | Pass `overwrite_a=False` (default)           |
| Treating `det` as a measure of singularity | Scale-dependent; a scaled identity has huge det | Always combine with norm or condition number |
| Ignoring row versus column ordering | `svd` returns \(V^T\), not \(V\)            | Transpose explicitly when \(V\) is required  |

## 7. The textbook-precise statement
Let \(A\in\mathbb{R}^{n\times n}\) be nonsingular and \(b\in\mathbb{R}^n\). Then there exists a unique \(x\in\mathbb{R}^n\) such that \(Ax=b\), and `np.linalg.solve(A,b)` returns this \(x\) with a backward-stable residual bounded by \(O(n)\varepsilon_{\text{mach}}\|A\|\|x\|\). For the spectral and singular-value decompositions the corresponding statements appear in Golub & Van Loan, *Matrix Computations*, 4e, §7.3 and §8.6. The determinant equals the product of the eigenvalues (Stewart, *Matrix Algorithms*, Vol. I, Thm. 3.5).

## 8. Visual — diagram or schematic
```text
A (m×n)  ──svd──►  U (m×m)  Σ (m×n)  V^T (n×n)
                 orthogonal   diagonal  orthogonal
                 (rot/refl)   (scales)  (rot/refl)
```
The diagram shows that any linear map factors into a rotation/reflection, independent axis-aligned scaling, and a second rotation/reflection; `svd` exposes exactly these three pieces.

## 9. The memory technique
1. **The hook** — picture a robot arm: `solve` finds the joint angles that reach a target, `eig` tells how fast each joint can spin, `svd` separates the arm’s stretch from its twist, `norm` measures reach, and `det` warns whether the arm has flipped inside-out.  
2. **What to overlearn** — `solve` signature, the fact that singular values are always real and non-negative, and that `det(A)=product(eigvals(A))`.  
3. **Spaced-repetition schedule** — review the five function signatures after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — derive the LU factorisation of a 2-by-2 matrix by hand, then verify that `solve` reproduces the algebraic solution.

## 10. What this unlocks
Mastery of these five calls lets you implement Gaussian processes, finite-element stiffness solvers, principal-component analysis, and stability analysis of dynamical systems without ever writing an explicit loop over matrix entries.  

- Next: sparse direct solvers (`scipy.sparse.linalg.spsolve`)  
- Next: QR and Cholesky factorisations (`np.linalg.qr`, `cholesky`)  
- Next: iterative eigensolvers for billion-dimensional problems (`scipy.sparse.linalg.eigsh`)  
- Next: condition-number estimation and rank-revealing decompositions  

## 11. Self-check — five questions, no answers
1. What happens when you call `np.linalg.solve` on a matrix whose determinant is \(10^{-20}\) while its entries are order 1?  
2. Give a 2-by-2 matrix whose eigenvalues are complex; compute them with `eig` and verify that their product equals the determinant.  
3. Construct a 3-by-2 matrix of rank 1, call `svd`, and show that exactly one singular value is numerically non-zero.  
4. Demonstrate that `np.linalg.norm(A,2)` equals the largest singular value of \(A\).  
5. A colleague reports that `det(A)` changed sign after merely reordering the rows of \(A\). Is the result correct? Explain.