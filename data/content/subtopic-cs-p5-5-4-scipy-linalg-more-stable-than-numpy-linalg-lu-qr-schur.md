## What it is
`scipy.linalg` is a Python library for high-performance linear algebra that provides more advanced and numerically stable routines than its `numpy.linalg` counterpart. It is built on top of highly optimized, industry-standard Fortran libraries (BLAS and LAPACK) and is the preferred choice for scientific computing tasks where precision and robustness are critical.

## Why it matters
Numerical stability is paramount in engineering and science. In aerospace, solving the large systems of equations in computational fluid dynamics (CFD) or finite element analysis (FEA) for structural integrity requires algorithms that don't accumulate floating-point errors; a small error can lead to a simulated wing falling off. In machine learning, stable eigenvalue decompositions like Schur are essential for analyzing the properties of large matrices in algorithms like PCA, while QR decomposition is the backbone of reliable least-squares solvers for regression.

## When to study it
Before diving in, you must have a solid foundation in these areas:
1.  **Linear Algebra:** You need to be comfortable with matrix operations, determinants, vector spaces, and especially the concepts of eigenvalues/eigenvectors and matrix factorizations (the theory behind LU, QR).
2.  **Numerical Analysis:** You must understand the difference between exact arithmetic and floating-point arithmetic. Key concepts are round-off error, numerical stability, and matrix conditioning. Without this, the "why" behind `scipy.linalg` will be lost.
3.  **Python & NumPy:** You should be proficient with creating and manipulating NumPy arrays and have used basic functions from `numpy.linalg` like `solve` and `eig`.

If you are not comfortable with matrix conditioning or the geometric interpretation of factorizations, review those topics first.

## How to study it (step by step)
1.  **Witness Instability:** Create a notoriously ill-conditioned matrix, the Hilbert matrix. Use `scipy.linalg.hilbert`. Define a known solution `x`, compute `b = A @ x`, and then try to recover `x` using both `numpy.linalg.solve(A, b)` and `scipy.linalg.solve(A, b)`. Compare the error in the recovered `x` for both libraries. This provides the motivation.
2.  **Master LU for Solving:** Take a simple 3x3 matrix `A`. Use `P, L, U = scipy.linalg.lu(A)`. Understand that this factorization represents Gaussian elimination. Solve the system $Ax=b$ by first solving $Ly = Pb$ (forward substitution) and then $Ux=y$ (backward substitution). This reveals *how* solvers work under the hood.
3.  **Use QR for Overdetermined Systems:** Set up a simple linear least-squares problem, like fitting a line to three points. This gives you an overdetermined system $Ax=b$ where $A$ is 3x2. Use `Q, R = scipy.linalg.qr(A)`. Solve the stable equivalent system $Rx = Q^T b$ using `scipy.linalg.solve_triangular`. This is the numerically superior way to perform least-squares.
4.  **Use Schur for Stable Eigenvalues:** Create a non-symmetric matrix. Use `T, Z = scipy.linalg.schur(A)`. Verify that $A = Z T Z^H$ (where $Z^H$ is the conjugate transpose). Check that the diagonal elements of the upper-triangular matrix `T` are the eigenvalues of `A`. Compare these to the eigenvalues returned by `scipy.linalg.eig(A)` and appreciate that Schur decomposition provides them in a more stable manner.
5.  **Benchmark:** For a moderately large matrix (e.g., 500x500), time the difference between solving $Ax=b$ using `scipy.linalg.inv(A) @ b` versus `scipy.linalg.solve(A, b)`. This will burn the "never invert to solve" rule into your mind.

## Key ideas, with intuition
1.  **Decomposition is Factoring for Matrices:** Just as we factor $12$ into $2 \times 6$ or $3 \times 4$ to simplify problems, we factor a complex matrix $A$ into a product of "simpler" matrices. "Simple" means their structure makes solving equations easy, such as being triangular or orthogonal.
    $$
    A \rightarrow \text{Product of Simpler Matrices}
    $$
2.  **Orthogonal/Unitary Matrices are Rotations:** An orthogonal matrix $Q$ has the property that $Q^T Q = I$. This means it preserves lengths and angles of vectors it multiplies. Geometrically, it's a rotation and/or a reflection. Because it doesn't stretch or squash space, it doesn't amplify numerical errors, making it a cornerstone of stable algorithms (QR, Schur).
3.  **Triangular Matrices are Easy:** A system of equations $Tx=c$ where $T$ is triangular can be solved with trivial substitutions. If $T$ is upper-triangular, you find the last variable first and substitute backwards. If lower-triangular, you find the first variable and substitute forwards. This is computationally cheap and numerically stable.
    $$
    \begin{pmatrix} r_{11} & r_{12} \\ 0 & r_{22} \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} c_1 \\ c_2 \end{pmatrix} \implies x_2 = c_2/r_{22}, \text{ then solve for } x_1.
    $$
4.  **`scipy.linalg` Chooses the Right Tool:** `scipy.linalg.solve` is not a single algorithm. It inspects the matrix `A` first. If `A` is triangular, it uses a fast substitution. If it's symmetric positive-definite, it uses a Cholesky decomposition. For a general square matrix, it uses an LU decomposition. This intelligent dispatching is part of its power.

## Worked example
We will solve a linear least-squares problem: find the best-fit line $y = m x + c$ for the points (0, 1), (1, 2), and (2, 3.5).

This gives the overdetermined system:
$m(0) + c = 1$
$m(1) + c = 2$
$m(2) + c = 3.5$

In matrix form, $Ax=b$:
$$
\begin{pmatrix} 0 & 1 \\ 1 & 1 \\ 2 & 1 \end{pmatrix} \begin{pmatrix} m \\ c \end{pmatrix} = \begin{pmatrix} 1 \\ 2 \\ 3.5 \end{pmatrix}
$$

**Step 1: Set up the matrices in Python.**
```python
import numpy as np
from scipy import linalg

A = np.array([[0, 1], [1, 1], [2, 1]])
b = np.array([1, 2, 3.5])
```

**Step 2: Perform QR decomposition on `A`.**
The QR decomposition factors $A$ into an orthogonal matrix $Q$ and an upper-triangular matrix $R$.
```python
Q, R = linalg.qr(A, mode='economic') 
# 'economic' ensures Q has shape (3,2) not (3,3)
```
Now our system is $QRx=b$.

**Step 3: Transform the system.**
Multiply by $Q^T$. Since $Q$ is orthogonal, $Q^T Q = I$.
$Q^T (QRx) = Q^T b \implies (Q^T Q) Rx = Q^T b \implies I Rx = Q^T b \implies Rx = Q^T b$.
Let's compute the new right-hand side, $b' = Q^T b$.
```python
b_prime = Q.T @ b
```

**Step 4: Solve the simple triangular system.**
The system $Rx = b'$ is easy to solve because $R$ is upper-triangular. We use a specialized, fast, and stable solver for this.
```python
x = linalg.solve_triangular(R, b_prime, lower=False)
# lower=False because R is upper-triangular
```
This gives `x = array([1.25, 0.9166...])`, so $m=1.25$ and $c \approx 0.917$.

**Reflection:**
- We never tried to compute $(A^T A)^{-1} A^T b$, which is the textbook "normal equation" solution but is prone to numerical instability.
- By converting $A$ to $Q$ and $R$, we transformed the problem into an equivalent but much better-conditioned one ($Rx = Q^T b$).
- The final step used `solve_triangular`, a highly optimized routine for the exact structure of the problem, avoiding a more general, slower solver.

## Diagrams
LU Decomposition of a square matrix $A$:
```text
      A               P               L                 U
[x x x x]   -->   [0 1 0 0]   *   [1 0 0 0]   *   [x x x x]
[x x x x]         [0 0 0 1]       [x 1 0 0]       [0 x x x]
[x x x x]         [1 0 0 0]       [x x 1 0]       [0 0 x x]
[x x x x]         [0 0 1 0]       [x x x 1]       [0 0 0 x]

(Matrix A)      (Permutation)   (Lower Tri)       (Upper Tri)
```

QR Decomposition of a tall matrix $A$ (e.g., for least squares):
```text
      A (m x n)          Q (m x n)            R (n x n)
[x x]                [x x]                [x x]
[x x]                [x x]                [0 x]
[x x]        -->     [x x]          *
[x x]                [x x]

(m > n)              (Orthonormal         (Upper
                       Columns)            Triangular)
```

## Memory technique — remember this forever
1.  **The Story:** Think of `scipy.linalg` as a master mechanic's toolbox for matrices.
    *   **LU (Lazy Underling):** Gaussian Elimination. It's the fast, basic wrench for standard square jobs. It gets the job done but can slip if the bolt is weird (ill-conditioned). The `P` (pivoting) is the handle grip that prevents slipping.
    *   **QR (Quality & Robustness):** The torque wrench for data fitting. The `Q` is a "rotation" that lines everything up perfectly without stretching or deforming it (no error amplification). `R` is the simple triangular part you can then easily tighten. Use it for least-squares.
    *   **Schur (Sure Eigenvalues):** A specialized diagnostic scope. For tricky non-symmetric matrices, it finds eigenvalues safely by making the matrix triangular (`T`) using a stable rotation (`Q`). The eigenvalues are then right on the diagonal, clear as day.

2.  **Must Overlearn Formulas:**
    *   LU: $A = PLU$ (Permutation, Lower, Upper)
    *   QR: $A = QR$ (Orthogonal, Right-triangular)
    *   Schur: $A = QTQ^H$ (Unitary, Triangular, Conjugate-Transpose)

3.  **Spaced Repetition Schedule:**
    *   Review this material tomorrow (1 day).
    *   Review again in 3 days.
    *   Review again in 7 days.
    *   Review again in 16 days.
    *   Final review in 35 days.

4.  **First Principles Pathway:** If you forget, start from the goal: "How can I make this matrix triangular?"
    *   For **LU**, the answer is: "By subtracting multiples of rows from other rows." This is Gaussian elimination, and the record of those operations forms the $L$ matrix.
    *   For **QR**, the answer is: "By applying a series of rotations (or reflections) to zero out the elements below the diagonal." This is the Gram-Schmidt process or Householder reflections, which build the $Q$ matrix.

## Common mistakes
1.  **Ignoring the Permutation Matrix `P` in LU:** `scipy.linalg.lu` returns `P, L, U`. To solve $Ax=b$, you are actually solving $LUx = Pb$. Students often forget to apply the permutation `P` to the vector `b`, leading to an incorrect solution.
2.  **Using `inv(A) @ b`:** This is the cardinal sin. It is always slower and less accurate than `solve(A, b)`. The inverse is rarely needed explicitly; a solver based on decomposition is superior.
3.  **Numerical vs. Exact Zero:** When you reconstruct a matrix from its factors, like `Q @ R`, it won't be *exactly* equal to `A`. You must check equality using a tolerance: `np.allclose(A, Q @ R)`. Expecting `A == Q @ R` to be `True` will fail due to floating-point inaccuracies.
4.  **Assuming Real Schur Form:** For a real matrix `A` with complex eigenvalues, the Schur form `T` will be a complex matrix. Students are sometimes surprised that a decomposition of a real matrix results in complex numbers. This is necessary to represent the complex eigenvalues on the diagonal.

## Self-check
1.  Given the matrix $A = \begin{pmatrix} 2 & 1 \\ 4 & 3 \end{pmatrix}$ and vector $b = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$, compute the LU decomposition using `scipy.linalg.lu`. Then, use only the factors `P`, `L`, `U` and forward/backward substitution to solve for $x$. Verify your answer with `scipy.linalg.solve`.
2.  The three 2D points (1, 1), (2, 3), and (3, 2) do not lie on a line. Set up the overdetermined system $Ax=b$ to find the best-fit line $y=mx+c$. Solve it using QR decomposition. What are the values of $m$ and $c$?
3.  Consider the rotation matrix $A = \begin{pmatrix} \cos(\pi/4) & -\sin(\pi/4) \\ \sin(\pi/4) & \cos(\pi/4) \end{pmatrix}$. What are its eigenvalues theoretically? Now, compute its Schur decomposition using `scipy.linalg.schur`. Does the diagonal of the resulting `T` matrix match your theoretical expectation?