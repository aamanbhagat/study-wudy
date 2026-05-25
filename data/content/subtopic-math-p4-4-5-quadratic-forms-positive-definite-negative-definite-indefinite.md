## What it is
A quadratic form is a function that maps a vector to a scalar, defined by a homogeneous polynomial of degree two. For a vector $\mathbf{x} \in \mathbb{R}^n$ and a symmetric matrix $A \in \mathbb{R}^{n \times n}$, the quadratic form is expressed as $f(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$. The classification of the form (positive definite, negative definite, indefinite) describes whether this function is always positive, always negative, or can be both, for any non-zero input vector $\mathbf{x}$.

## Why it matters
This concept is fundamental to multivariable optimization and stability analysis. In machine learning, the loss function for models like linear regression is a quadratic form; its positive definite nature guarantees a unique global minimum. In physics and engineering, the potential energy of a system near an equilibrium point is approximated by a quadratic form; its definiteness determines if the equilibrium is stable (a valley, positive definite), unstable (a hill, negative definite), or a saddle point.

## When to study it
You must have a solid grasp of the following before proceeding:
*   **Matrix Operations:** Transposition, multiplication.
*   **Symmetric Matrices:** Understanding that $A = A^T$.
*   **Eigenvalues and Eigenvectors:** You must be able to compute them and understand their geometric significance.
*   **Determinants:** You must be able to compute the determinant of a square matrix.

If any of these are weak, pause and review them. The entire theory of definiteness rests on eigenvalues and determinants of submatrices.

## How to study it (step by step)
1.  **Start with 2D:** Write out the general 2D quadratic form $f(x, y) = ax^2 + 2bxy + cy^2$. Show that this is equivalent to the matrix form $\mathbf{x}^T A \mathbf{x}$ where $\mathbf{x} = \begin{pmatrix} x \\ y \end{pmatrix}$ and $A = \begin{pmatrix} a & b \\ b & c \end{pmatrix}$. Manipulate the algebra to see the connection.
2.  **Visualize the Graphs:** Plot (or imagine) the graphs of $z = x^2+y^2$ (a bowl opening up), $z = -x^2-y^2$ (a bowl opening down), and $z = x^2-y^2$ (a saddle). These are the geometric archetypes for positive definite, negative definite, and indefinite forms, respectively.
3.  **Derive the Eigenvalue Test:** For a symmetric matrix $A$, we can diagonalize it as $A = PDP^T$, where $D$ is a diagonal matrix of eigenvalues and $P$ is an orthogonal matrix of eigenvectors. Substitute this into $f(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$ to get $f(\mathbf{x}) = \mathbf{x}^T P D P^T \mathbf{x}$. Define a new vector $\mathbf{y} = P^T \mathbf{x}$. The form becomes $f(\mathbf{x}) = \mathbf{y}^T D \mathbf{y} = \sum_{i=1}^n \lambda_i y_i^2$. This shows that the sign of the quadratic form is determined entirely by the signs of the eigenvalues $\lambda_i$.
4.  **Learn the Principal Minors Test (Sylvester's Criterion):** This is a computational shortcut that avoids finding eigenvalues. Define the leading principal minors of $A$ as the determinants of the top-left $k \times k$ submatrices. Learn the sign patterns that correspond to positive definiteness.
5.  **Solve Classification Problems:** Take five different 2x2 and 3x3 symmetric matrices. Classify their corresponding quadratic forms using both the eigenvalue test and the principal minors test. Verify that you get the same answer.
6.  **Connect to Calculus:** Find the Hessian matrix of a simple function like $g(x, y) = x^2 + 3xy + 5y^2$ at its critical point. Classify the quadratic form associated with the Hessian to determine if the point is a local minimum, maximum, or saddle point.

## Key ideas, with intuition
1.  **The Matrix *is* the Shape:** A symmetric matrix $A$ is not just a table of numbers; it is the algebraic representation of a geometric shape (a generalized paraboloid or saddle). The quadratic form $\mathbf{x}^T A \mathbf{x}$ is the function that describes the "height" $z$ of this shape at any point $(x_1, x_2, ...)$ on the "floor".

2.  **Eigenvalues are Stretch Factors in Principal Directions:** For a symmetric matrix, the eigenvectors give an orthogonal basis (a set of perpendicular axes). The eigenvalues tell you how much the quadratic form "stretches" or "curves" along these axes.
    *   **Positive Definite:** All eigenvalues $\lambda_i > 0$. The surface curves upwards along every principal axis. This creates a bowl shape with a unique minimum at $\mathbf{x}=\mathbf{0}$.
        $$f(\mathbf{x}) > 0 \text{ for all } \mathbf{x} \neq \mathbf{0}$$
    *   **Negative Definite:** All eigenvalues $\lambda_i < 0$. The surface curves downwards along every principal axis. This creates an inverted bowl with a unique maximum at $\mathbf{x}=\mathbf{0}$.
        $$f(\mathbf{x}) < 0 \text{ for all } \mathbf{x} \neq \mathbf{0}$$
    *   **Indefinite:** A mix of positive and negative eigenvalues. The surface curves up along some axes and down along others. This creates a saddle shape, which has no minimum or maximum at $\mathbf{x}=\mathbf{0}$.
        $$f(\mathbf{x}) \text{ takes both positive and negative values}$$

3.  **Semidefinite forms are the "flat" cases:** If some eigenvalues are zero and the rest have the same sign, the form is "semidefinite". Geometrically, this corresponds to a shape that is flat in some directions, like a trough or a ridge. For example, $f(x,y) = x^2$ is positive semidefinite; it's a parabolic cylinder, flat along the y-axis.

## Worked example
Classify the quadratic form $f(x, y, z) = 2x^2 + 2y^2 + 2z^2 + 2xy + 2xz + 2yz$.

**Step 1: Write the symmetric matrix A.**
The quadratic form is $f(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$. The diagonal entries of $A$ are the coefficients of the $x^2, y^2, z^2$ terms. The off-diagonal entries $A_{ij}$ and $A_{ji}$ are each half of the coefficient of the $x_i x_j$ term.
$$
A = \begin{pmatrix} 2 & 1 & 1 \\ 1 & 2 & 1 \\ 1 & 1 & 2 \end{pmatrix}
$$
This is a symmetric matrix, as required.

**Step 2: Classify using the eigenvalue test.**
We need to find the eigenvalues by solving the characteristic equation $\det(A - \lambda I) = 0$.
$$
\det \begin{pmatrix} 2-\lambda & 1 & 1 \\ 1 & 2-\lambda & 1 \\ 1 & 1 & 2-\lambda \end{pmatrix} = 0
$$
Expanding the determinant:
$$
(2-\lambda)((2-\lambda)^2 - 1) - 1((2-\lambda)-1) + 1(1 - (2-\lambda)) = 0 \\
(2-\lambda)(\lambda^2 - 4\lambda + 3) - (1-\lambda) + (\lambda-1) = 0 \\
(2-\lambda)(\lambda-1)(\lambda-3) + (\lambda-1) + (\lambda-1) = 0 \\
(\lambda-1) [ (2-\lambda)(3-\lambda) + 2 ] = 0 \\
(\lambda-1) [ 6 - 5\lambda + \lambda^2 + 2 ] = 0 \\
(\lambda-1) [ \lambda^2 - 5\lambda + 4 ] = 0 \\
(\lambda-1) (\lambda-1) (\lambda-4) = 0
$$
The eigenvalues are $\lambda_1 = 4$, $\lambda_2 = 1$, $\lambda_3 = 1$.

**Step 3: Interpret the result.**
All eigenvalues (4, 1, 1) are strictly positive.
Therefore, the matrix $A$ and its corresponding quadratic form $f(\mathbf{x})$ are **positive definite**.

**Reflection:**
*   Step 1 correctly translated the polynomial into its unique symmetric matrix representation. This is the starting point for all linear algebra methods.
*   Step 2 systematically found the eigenvalues. The characteristic polynomial calculation is mechanical but must be done without error.
*   Step 3 applied the key idea directly: the signs of the eigenvalues determine the classification. Since all $\lambda_i > 0$, the form is positive definite. This means the graph of this function in 4D is a hyper-paraboloid with a minimum at the origin.

## Diagrams
Here are ASCII diagrams for the 2D case. Imagine $f(\mathbf{x})$ is the height on the z-axis.

**Positive Definite (e.g., $f(x,y) = x^2 + y^2$)**
A bowl shape, with a minimum at the origin.
```text
      f(x)
        ^
       /|\
      / | \
     /  |  \
    /   |   \
   /    *-----> x2
  /    /
 /    /
/    /
v---/
x1
```

**Indefinite (e.g., $f(x,y) = x^2 - y^2$)**
A saddle shape. It goes up in the $x_1$ direction and down in the $x_2$ direction.
```text
      f(x)
        ^
       / \
      /   \
     /-----\-----> x2 (downward curve)
    | \   / |
    |  \ /  |
    *---\---*
    |  / \  |
    | /   \ |
    v/-----\v
    x1 (upward curve)
```

## Memory technique — remember this forever
1.  **Visual Hook:**
    *   **Positive Definite:** Think of a **P**ositive person smiling. The graph is a "smile" or a bowl shape that holds water. All eigenvalues are **P**ositive.
    *   **Negative Definite:** Think of a **N**egative person frowning. The graph is a "frown" or an inverted bowl that sheds water. All eigenvalues are **N**egative.
    *   **Indefinite:** Think **In**decisive. The graph doesn't know whether to go up or down. It does both. It has a mix of positive and negative eigenvalues.

2.  **Must Overlearn Formulas:**
    For a symmetric matrix $A$ and its quadratic form $f(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$:
    *   **Positive Definite** $\iff$ All eigenvalues $\lambda_i > 0$.
    *   **Negative Definite** $\iff$ All eigenvalues $\lambda_i < 0$.
    *   **Indefinite** $\iff$ $A$ has at least one positive eigenvalue and at least one negative eigenvalue.

3.  **Spaced Repetition Schedule:**
    Review this material (especially the definitions and eigenvalue test) at:
    *   1 day (tomorrow)
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:**
    If you forget the eigenvalue test, re-derive it.
    *   Any symmetric matrix $A$ can be orthogonally diagonalized: $A = PDP^T$.
    *   Substitute this into the quadratic form: $f(\mathbf{x}) = \mathbf{x}^T (PDP^T) \mathbf{x} = (\mathbf{x}^T P) D (P^T \mathbf{x})$.
    *   Let $\mathbf{y} = P^T \mathbf{x}$. This is just a change of basis to the eigenvector basis.
    *   The form becomes $f(\mathbf{x}) = \mathbf{y}^T D \mathbf{y}$. Since $D$ is diagonal with eigenvalues on the diagonal, this is just $\sum_{i=1}^n \lambda_i y_i^2$.
    *   The sign of this sum depends entirely on the signs of the $\lambda_i$. This proves the test.

## Common mistakes
1.  **Confusing Matrix Entries with Eigenvalues:** A matrix can be positive definite even if it has negative entries. For example, $A = \begin{pmatrix} 2 & -1 \\ -1 & 2 \end{pmatrix}$ has eigenvalues $\lambda = 1, 3$ and is positive definite. Don't judge by the entries.
2.  **Mistakes in Determinant Calculation:** The leading principal minors test (Sylvester's Criterion) is fast but unforgiving. One sign error in a determinant calculation will lead to the wrong classification. Double-check your arithmetic.
3.  **Ignoring the "Symmetric" Prerequisite:** The theory, especially the existence of real eigenvalues and an orthogonal basis of eigenvectors, is built on $A$ being symmetric. If you are given a non-symmetric matrix $B$, the quadratic form $\mathbf{x}^T B \mathbf{x}$ is equivalent to the form with the symmetric matrix $A = \frac{1}{2}(B + B^T)$. Always work with the symmetric version.
4.  **Stopping Too Early:** When using the principal minors test for positive definiteness, you must check that *all* leading principal minors are positive. Finding that the first few are positive is not sufficient.

## Self-check
1.  Classify the quadratic form $f(x, y) = 4x^2 - 6xy + 9y^2$.
2.  Let $A = \begin{pmatrix} 2 & 2 & 0 \\ 2 & 2 & 0 \\ 0 & 0 & -3 \end{pmatrix}$. What is the classification of the quadratic form $\mathbf{x}^T A \mathbf{x}$? Be precise (e.g., "positive definite", "positive semidefinite", etc.).
3.  Construct a 2x2 symmetric matrix $A$ that is indefinite, but whose diagonal entries are both positive. Explain why your construction works.