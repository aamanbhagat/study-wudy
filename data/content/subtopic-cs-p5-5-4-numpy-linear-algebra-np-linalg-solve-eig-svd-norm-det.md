## What it is
NumPy's `linalg` module is a library of highly optimized functions for performing core operations of linear algebra. It allows you to represent matrices and vectors as NumPy arrays and apply common procedures like solving linear systems, finding eigenvalues, or performing matrix decompositions. These functions are the computational backbone for translating mathematical concepts into efficient code.

## Why it matters
These operations are fundamental across scientific and engineering disciplines. In aerospace, solving large systems of linear equations is central to finite element analysis for structural integrity and computational fluid dynamics (CFD). In machine learning, eigenvalue decomposition is the engine behind Principal Component Analysis (PCA) for dimensionality reduction, while Singular Value Decomposition (SVD) is critical for recommender systems and natural language processing.

## When to study it
Before tackling this, you must have a solid grasp of two areas.
1.  **Linear Algebra Theory:** You need to understand what vectors, matrices, matrix multiplication, determinants, and inverses are. You must be comfortable with the concepts of systems of linear equations ($A\vec{x} = \vec{b}$), eigenvalues and eigenvectors ($A\vec{v} = \lambda\vec{v}$), and vector norms.
2.  **NumPy Basics:** You should be proficient in creating NumPy arrays, using indexing and slicing, and performing basic element-wise and matrix operations (e.g., using the `@` operator for matrix multiplication).

If you are not confident with the underlying math, pause and review that first. The code will be meaningless without the conceptual framework.

## How to study it (step by step)
1.  **Setup and `solve`:** Open a Jupyter notebook. Create a 2x2 matrix $A$ and a 2x1 vector $\vec{b}$. Use `np.linalg.solve(A, b)` to find the vector $\vec{x}$ that satisfies $A\vec{x} = \vec{b}$. Manually verify the result by computing `A @ x` and confirming it equals `b`.
2.  **Determinant and Singularity:** Use `np.linalg.det(A)` on your matrix. Now, create a singular matrix (e.g., where one column is a multiple of another) and compute its determinant. Try to use `np.linalg.solve` with this singular matrix. Observe the error and connect the mathematical concept (no unique solution) to the program's behavior.
3.  **Eigenvalues and Eigenvectors:** Use `np.linalg.eig(A)` on your non-singular matrix $A$. This returns a tuple: `(eigenvalues, eigenvector_matrix)`. For each eigenvalue `w` and its corresponding eigenvector `v` (a column in the matrix), verify that `A @ v` is numerically close to `w * v` using `np.allclose()`.
4.  **Norms:** Create a simple vector, e.g., `v = np.array([3, 4])`. Calculate its L2 norm (length) with `np.linalg.norm(v)`. Confirm by hand that it equals $\sqrt{3^2 + 4^2}$. Experiment with the `ord` parameter (`ord=1` for Manhattan distance, `ord=np.inf` for max component) to build intuition.
5.  **SVD Mechanics:** Use `U, S, Vh = np.linalg.svd(A)`. Note that `S` is returned as a 1D array of singular values, not a diagonal matrix. Reconstruct the original matrix $A$ by creating the full diagonal matrix $\Sigma$ and computing `U @ Sigma @ Vh`. This confirms you understand the shapes and mechanics of the decomposition.

## Key ideas, with intuition
1.  **`solve(A, b)`: The "Undo" Machine.** A matrix $A$ represents a linear transformation. The equation $A\vec{x} = \vec{b}$ means "vector $\vec{x}$ gets transformed into vector $\vec{b}$." The `solve` function is the machine that, given the final state $\vec{b}$ and the transformation $A$, finds the original state $\vec{x}$. It's more numerically stable and faster than finding the inverse matrix and computing $A^{-1}\vec{b}$.
2.  **`det(A)`: The Volume Scaling Factor.** The determinant of a square matrix tells you how much that transformation scales the volume of space.
    $$ \text{Volume}(\text{transformed shape}) = |\det(A)| \times \text{Volume}(\text{original shape}) $$
    If $\det(A) = 0$, the transformation squashes space into a lower dimension (e.g., a plane into a line). Such a matrix is "singular" and its transformation cannot be perfectly undone, which is why you can't `solve` systems with it.
3.  **`eig(A)`: The Axes of Transformation.** For a transformation $A$, the eigenvectors are the special vectors whose direction doesn't change. They are only stretched or shrunk. The eigenvalue is the scaling factor for that stretch/shrink.
    $$ A\vec{v} = \lambda\vec{v} $$
    This means "transforming $\vec{v}$ with $A$ is the same as just scaling $\vec{v}$ by $\lambda$." These axes often represent fundamental modes or stable states of a system.
4.  **`svd(A)`: The Ultimate Decomposition.** Any matrix, square or not, can be factored as $A = U \Sigma V^T$. This says that *any linear transformation* can be broken down into three fundamental steps:
    1.  A rotation ($V^T$).
    2.  A scaling along the new coordinate axes ($\Sigma$).
    3.  Another rotation ($U$).
    This is more general and often more useful than eigendecomposition. The singular values in $\Sigma$ tell you the "magnitude" of the transformation in each principal direction.

## Worked example
Let's analyze a shear transformation, which tilts one axis. We will define the system, find its determinant and eigenvalues, and solve a linear system.

The transformation matrix is $A = \begin{pmatrix} 1 & 0.5 \\ 0 & 1 \end{pmatrix}$. We want to find the vector $\vec{x}$ that results in $\vec{b} = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$ after transformation.

```python
import numpy as np

# 1. Define the system
A = np.array([[1, 0.5],
              [0, 1]])
b = np.array([2, 1])

# 2. Calculate the determinant
# It tells us how area changes.
det_A = np.linalg.det(A)
print(f"Determinant: {det_A}")
# An area of 1 remains an area of 1. A shear does not change area.

# 3. Find eigenvalues and eigenvectors
# These are the "special" directions that are only scaled.
eigenvalues, eigenvectors = np.linalg.eig(A)
print(f"\nEigenvalues: {eigenvalues}")
print(f"Eigenvectors:\n{eigenvectors}")

# Let's verify the first eigenvector/eigenvalue pair
v1 = eigenvectors[:, 0] # First column
w1 = eigenvalues[0]
print(f"\nCheck: A @ v1 = {A @ v1}")
print(f"Check: w1 * v1 = {w1 * v1}")
# They are equal, as expected. A*v = lambda*v

# 4. Solve the system Ax = b
# Find the vector x that becomes b after the shear.
x = np.linalg.solve(A, b)
print(f"\nSolution x: {x}")

# 5. Verify the solution
# Check if A @ x really gives us b.
print(f"Verification (A @ x): {A @ x}")
print(f"Original b:           {b}")
print(f"Is solution correct? {np.allclose(A @ x, b)}")
```

**Reflection:**
- **Step 1:** We set up the problem directly from the math.
- **Step 2:** The determinant was 1, which makes geometric sense. A shear transformation tilts things but preserves area.
- **Step 3:** We found the eigenvalues are both 1, and the only eigenvector direction is along the x-axis. This is the only direction that is not tilted by the shear.
- **Step 4:** `np.linalg.solve` efficiently found the pre-image $\vec{x}$.
- **Step 5:** Verification is crucial. We used `np.allclose` to handle potential floating-point inaccuracies and confirmed our solution was correct.

## Diagrams
This diagram shows the effect of the shear matrix $A = \begin{pmatrix} 1 & 0.5 \\ 0 & 1 \end{pmatrix}$ on the basis vectors.

```text
       ^ y
       |
(0.5,1)<--- A*j_hat
   j_hat |  /
(0,1) *--+-----> x
       |  |
       O--* i_hat = A*i_hat
         (1,0)

The basis vector i_hat = (1,0) is an eigenvector; its direction is unchanged.
The basis vector j_hat = (0,1) is tilted to become (0.5, 1).
The area of the parallelogram formed by A*i_hat and A*j_hat is still 1 (base * height = 1 * 1).
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine a detective solving a crime. They must "**Solve** the system." To do that, they look for the criminal's unchangeable traits (their **eig**envectors). They check the scene for distortions in space (the **det**erminant). If the case is too complex, they break it down into simple steps: rotate, scale, rotate (**SVD**). They measure the evidence's significance with a **norm**.
2.  **Must-Know Formulas:** Overlearn these until they are automatic.
    -   $A\vec{x} = \vec{b}$ (The fundamental system to solve)
    -   $A\vec{v} = \lambda\vec{v}$ (The definition of an eigenvector/eigenvalue)
    -   $A = U \Sigma V^T$ (The Singular Value Decomposition)
3.  **Spaced Repetition Schedule:**
    -   **1 day:** Rework the example above from a blank notebook.
    -   **3 days:** Find a 3x3 matrix online and compute its `det`, `eig`, and `svd` by hand, then verify with NumPy.
    -   **7 days:** Write a function that takes a matrix $A$ and an eigenvector $\vec{v}$ and returns the corresponding eigenvalue $\lambda$.
    -   **16 days:** Explain the geometric meaning of `det`, `eig`, and `svd` to a friend (or a rubber duck).
    -   **35 days:** Solve a simple system of three linear equations (e.g., from a physics problem) using `np.linalg.solve`.
4.  **First Principles Pathway:** If you forget the `eig` function's meaning, rebuild it. The definition is $A\vec{v} = \lambda\vec{v}$. Rearrange to $A\vec{v} - \lambda I\vec{v} = \vec{0}$, which gives $(A - \lambda I)\vec{v} = \vec{0}$. For this equation to have a non-trivial solution for $\vec{v}$, the matrix $(A - \lambda I)$ must be singular. This means its determinant must be zero: $\det(A - \lambda I) = 0$. Solving this polynomial (the "characteristic equation") for $\lambda$ gives you the eigenvalues.

## Common mistakes
1.  **Using `np.linalg.inv(A) @ b`:** This is mathematically correct but numerically inferior to `np.linalg.solve(A, b)`. Calculating an explicit inverse is slow and prone to floating-point errors. Avoid it unless you specifically need the inverse matrix itself.
2.  **Mistaking Eigenvectors for Rows:** `np.linalg.eig` returns a matrix where each *column* is an eigenvector. A common mistake is to iterate through the rows of this matrix. Always access eigenvectors via column slicing: `eigenvectors[:, i]`.
3.  **Ignoring Floating-Point Inaccuracy:** Never use `==` to compare floating-point results. `A @ v == w * v` will almost always be `False`. Always use `np.allclose(A @ v, w * v)` to check for numerical equivalence within a small tolerance.
4.  **SVD's `S` is a Vector:** The `svd` function returns the singular values as a 1D array `S`, not a 2D diagonal matrix `Sigma`. To reconstruct the original matrix, you must first build `Sigma` with the correct dimensions (e.g., `np.diag(S)` inside a zero matrix of the right shape).

## Self-check
1.  Let $A = \begin{pmatrix} 3 & 0 \\ 0 & -2 \end{pmatrix}$. What is `np.linalg.det(A)`? Geometrically, what does this matrix do to a shape in the 2D plane?
2.  For the matrix $A$ above, what are its eigenvalues and eigenvectors? Solve this by inspection before using `np.linalg.eig` to verify. Hint: what happens when you multiply $A$ by the standard basis vectors $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $\begin{pmatrix} 0 \\ 1 \end{pmatrix}$?
3.  You are given a matrix $M$ and you compute its SVD as $M = U \Sigma V^T$. You notice that one of the singular values in $\Sigma$ is very close to zero. What does this tell you about the matrix $M$ and the transformation it represents? What would you expect `np.linalg.det(M)` to be close to?