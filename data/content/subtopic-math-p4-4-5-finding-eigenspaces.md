## What it is
An eigenspace, corresponding to a particular eigenvalue $\lambda$ of a matrix $A$, is the set of all vectors that, when transformed by $A$, are simply scaled by $\lambda$. It is a subspace of the vector space on which $A$ acts, and it includes all eigenvectors for that $\lambda$ plus the zero vector.

## Why it matters
Eigenspaces reveal the fundamental, stable "directions" of a linear transformation. In aerospace, the eigenspaces of the inertia tensor define the principal axes of rotation of a satellite—the stable axes around which it can spin without wobbling. In machine learning, Principal Component Analysis (PCA) finds the eigenspaces of a data covariance matrix to identify the directions of maximum variance, allowing for powerful dimensionality reduction.

## When to study it
Before tackling this, you must be proficient in the following. If not, master them first.
1.  **Solving systems of linear equations:** Specifically, homogeneous systems of the form $B\mathbf{x} = \mathbf{0}$.
2.  **Finding the null space (kernel) of a matrix:** This is precisely what solving $B\mathbf{x} = \mathbf{0}$ accomplishes.
3.  **Calculating determinants:** Essential for the next step.
4.  **Finding eigenvalues:** You must be able to find the roots $\lambda$ of the characteristic equation $\det(A - \lambda I) = 0$.

## How to study it (step by step)
1.  **Start with the definition.** The defining equation for an eigenvector $\mathbf{v}$ with eigenvalue $\lambda$ is $A\mathbf{v} = \lambda\mathbf{v}$.
2.  **Rearrange the equation.** Manipulate the definition into a homogeneous system.
    $A\mathbf{v} - \lambda\mathbf{v} = \mathbf{0}$
    $A\mathbf{v} - \lambda I \mathbf{v} = \mathbf{0}$
    $(A - \lambda I)\mathbf{v} = \mathbf{0}$
3.  **Recognize the connection.** This final form, $(A - \lambda I)\mathbf{v} = \mathbf{0}$, is the crucial insight. It states that any eigenvector $\mathbf{v}$ associated with $\lambda$ is a vector in the null space of the matrix $(A - \lambda I)$.
4.  **Find the eigenvalues.** First, solve the characteristic equation $\det(A - \lambda I) = 0$ to find all the eigenvalues $\lambda_1, \lambda_2, \dots, \lambda_n$ of your matrix $A$.
5.  **Calculate an eigenspace.** For *each* eigenvalue $\lambda_i$ you found, do the following:
    a. Construct the new matrix $B_i = A - \lambda_i I$.
    b. Find the null space of $B_i$ by solving the system $B_i\mathbf{v} = \mathbf{0}$. This is typically done by row-reducing $B_i$ to its reduced row echelon form.
    c. The set of all solutions to this system is the eigenspace $E_{\lambda_i}$. Express this space by giving a basis for it (i.e., write the solution in parametric vector form).
6.  **Visualize.** For a 2x2 or 3x3 case, draw the basis vectors for each eigenspace. These are the lines or planes that are invariant under the transformation $A$.

## Key ideas, with intuition
1.  **An Eigenspace is a Null Space.** This is the central computational idea. The search for special vectors ("eigenvectors") is converted into a standard, mechanical procedure ("find the null space").
    $$ E_{\lambda} = \text{Null}(A - \lambda I) $$
    Intuitively, the matrix $(A - \lambda I)$ is specifically constructed to "crush" or "annihilate" the eigenvectors corresponding to $\lambda$, sending them to the zero vector. Finding which vectors it crushes is the same as finding the eigenspace.

2.  **Geometric Invariance.** An eigenspace is a subspace that is mapped onto itself by the transformation $A$. A vector $\mathbf{v}$ in $E_{\lambda}$ does not get rotated off its line; its image $A\mathbf{v}$ is still on the same line as $\mathbf{v}$, just stretched or shrunk by the factor $\lambda$. This is why eigenspaces reveal the "stable axes" of a transformation.

3.  **The Zero Vector's Role.** By definition, an eigenvector must be non-zero. However, for a set of vectors to be a *subspace*, it must contain the zero vector. The eigenspace $E_{\lambda}$ is the union of all eigenvectors for $\lambda$ *and* the zero vector. This satisfies the requirements of a subspace.

## Worked example
Find the eigenspaces of the matrix $A = \begin{pmatrix} 4 & -2 \\ 1 & 1 \end{pmatrix}$.

**Step 1: Find the eigenvalues.**
We must solve $\det(A - \lambda I) = 0$.
$$
\det\left(\begin{pmatrix} 4 & -2 \\ 1 & 1 \end{pmatrix} - \lambda \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}\right) = \det\begin{pmatrix} 4-\lambda & -2 \\ 1 & 1-\lambda \end{pmatrix} = 0
$$
$$
(4-\lambda)(1-\lambda) - (1)(-2) = 0
$$
$$
4 - 5\lambda + \lambda^2 + 2 = 0
$$
$$
\lambda^2 - 5\lambda + 6 = 0
$$
$$
(\lambda - 2)(\lambda - 3) = 0
$$
The eigenvalues are $\lambda_1 = 2$ and $\lambda_2 = 3$.

**Step 2: Find the eigenspace for $\lambda_1 = 2$.**
We need to find the null space of $(A - 2I)$.
$$
A - 2I = \begin{pmatrix} 4-2 & -2 \\ 1 & 1-2 \end{pmatrix} = \begin{pmatrix} 2 & -2 \\ 1 & -1 \end{pmatrix}
$$
Now, we solve $(A - 2I)\mathbf{v} = \mathbf{0}$ by row-reducing the augmented matrix:
$$
\left[\begin{array}{cc|c} 2 & -2 & 0 \\ 1 & -1 & 0 \end{array}\right] \xrightarrow{R_1 \leftrightarrow R_2} \left[\begin{array}{cc|c} 1 & -1 & 0 \\ 2 & -2 & 0 \end{array}\right] \xrightarrow{R_2 - 2R_1} \left[\begin{array}{cc|c} 1 & -1 & 0 \\ 0 & 0 & 0 \end{array}\right]
$$
This corresponds to the equation $x_1 - x_2 = 0$, or $x_1 = x_2$. The variable $x_2$ is free.
The general solution is $\mathbf{v} = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} x_2 \\ x_2 \end{pmatrix} = x_2 \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.
The eigenspace for $\lambda=2$ is the set of all scalar multiples of this vector.
$$ E_2 = \text{span}\left\{\begin{pmatrix} 1 \\ 1 \end{pmatrix}\right\} $$

**Step 3: Find the eigenspace for $\lambda_2 = 3$.**
We need to find the null space of $(A - 3I)$.
$$
A - 3I = \begin{pmatrix} 4-3 & -2 \\ 1 & 1-3 \end{pmatrix} = \begin{pmatrix} 1 & -2 \\ 1 & -2 \end{pmatrix}
$$
Now, we solve $(A - 3I)\mathbf{v} = \mathbf{0}$:
$$
\left[\begin{array}{cc|c} 1 & -2 & 0 \\ 1 & -2 & 0 \end{array}\right] \xrightarrow{R_2 - R_1} \left[\begin{array}{cc|c} 1 & -2 & 0 \\ 0 & 0 & 0 \end{array}\right]
$$
This corresponds to the equation $x_1 - 2x_2 = 0$, or $x_1 = 2x_2$. The variable $x_2$ is free.
The general solution is $\mathbf{v} = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 2x_2 \\ x_2 \end{pmatrix} = x_2 \begin{pmatrix} 2 \\ 1 \end{pmatrix}$.
The eigenspace for $\lambda=3$ is:
$$ E_3 = \text{span}\left\{\begin{pmatrix} 2 \\ 1 \end{pmatrix}\right\} $$

**Reflection:** Each step was a direct, mechanical application of the core idea. First, we found the scaling factors ($\lambda$). Then, for each $\lambda$, we constructed the specific matrix $(A-\lambda I)$ that annihilates the corresponding eigenvectors and found its null space.

## Diagrams
Here is a visualization of the eigenspaces from the worked example. They are two lines through the origin in $\mathbb{R}^2$. Any vector on the line $E_2$ is stretched by a factor of 2. Any vector on the line $E_3$ is stretched by a factor of 3. A vector not on either line (like $\mathbf{x}$) is transformed to $A\mathbf{x}$, which points in a new direction.

```text
       y
       ^
       |
       |         / E_3 = span{(2,1)}
       |        /
       |       /
       |      * (2,1)
       |     /
       |    /
       |   /
       |  / E_2 = span{(1,1)}
       | /
       |* (1,1)
       |/
-------+-------------------> x
       |
       |         x (a random vector)
       |
       |   Ax (its transformation)
       |
```

## Memory technique — remember this forever
1.  **The "Stable Axis" Story:** Imagine a spinning globe (the vector space). The transformation is one second of spinning. The axis of rotation is an eigenspace. Any vector pointing from the center to the North or South Pole (on the axis) doesn't change direction; it just stays put. Its eigenvalue is $\lambda=1$. Every other vector (e.g., pointing to a city) rotates to a new position. Finding eigenspaces is finding these special, stable axes of a transformation.

2.  **Must-Know Formulas:** Overlearn these until they are automatic.
    *   To find eigenvalues: $\det(A - \lambda I) = 0$
    *   To find the corresponding eigenspace: $E_{\lambda} = \text{Null}(A - \lambda I)$

3.  **Spaced Repetition Schedule:**
    *   Review this material and re-do the worked example in **1 day**.
    *   Review again in **3 days**.
    *   Review again in **7 days**.
    *   Review again in **16 days**.
    *   Final review in **35 days**.

4.  **First Principles Pathway:** If you forget the formula for the eigenspace, re-derive it from the absolute beginning.
    *   Start with the definition: $A\mathbf{v} = \lambda\mathbf{v}$ (for $\mathbf{v} \neq \mathbf{0}$).
    *   Bring everything to one side: $A\mathbf{v} - \lambda\mathbf{v} = \mathbf{0}$.
    *   Insert the identity matrix to allow factoring: $A\mathbf{v} - \lambda I \mathbf{v} = \mathbf{0}$.
    *   Factor out $\mathbf{v}$: $(A - \lambda I)\mathbf{v} = \mathbf{0}$.
    *   This equation defines the null space of the matrix $(A - \lambda I)$. The eigenspace is this null space.

## Common mistakes
1.  **Row-reducing $A$ instead of $(A - \lambda I)$:** A very common error. You must construct a new matrix for each distinct eigenvalue before you find its null space.
2.  **Stating the answer is a single vector:** The eigenspace is a *space* (a line, a plane, etc.). The correct answer is the span of a set of basis vectors, e.g., $\text{span}\{\mathbf{v}_1, \mathbf{v}_2\}$, not just "the eigenvector is $\mathbf{v}_1$."
3.  **Forgetting the zero vector:** An eigenvector cannot be zero, but an eigenspace *must* contain the zero vector to be a subspace. This is a subtle definitional point that often causes confusion.
4.  **Mistakes in solving for $\lambda$:** An arithmetic error in solving the characteristic polynomial means all subsequent calculations for the eigenspaces will be incorrect. Double-check your eigenvalues.

## Self-check
1.  Find the eigenspaces of the diagonal matrix $A = \begin{pmatrix} -3 & 0 \\ 0 & 5 \end{pmatrix}$. What do you notice about the basis vectors?
2.  Find the eigenspaces of the shear matrix $A = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}$.
3.  Find the eigenspaces of the 3x3 matrix $A = \begin{pmatrix} 4 & 0 & 1 \\ -2 & 1 & 0 \\ -2 & 0 & 1 \end{pmatrix}$. One of your eigenvalues is $\lambda=1$.