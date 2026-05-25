## What it is
For a given square matrix $A$, an eigenvector is a non-zero vector $\vec{v}$ that, when transformed by $A$, does not change its direction, only its magnitude. The corresponding eigenvalue $\lambda$ is the scalar factor by which the eigenvector is stretched or compressed.

## Why it matters
Eigenvalues and eigenvectors are fundamental to understanding linear systems. In physics and aerospace, they describe the principal axes of rotation of a rigid body and the stable vibrational modes of a structure; the eigenvalues of a system's state matrix determine its stability. In machine learning, algorithms like Principal Component Analysis (PCA) use eigenvectors of the covariance matrix to reduce the dimensionality of data by finding the directions of maximum variance.

## When to study it
You must be fluent with the following concepts before proceeding. If you are not, pause and review them.
*   Matrix multiplication (specifically matrix-vector).
*   The concept of the identity matrix, $I$.
*   Calculating the determinant of a square matrix.
*   The connection between a zero determinant and a matrix being non-invertible (singular).
*   Finding the null space of a matrix (i.e., solving the homogeneous system $A\vec{x} = \vec{0}$).

## How to study it (step by step)
1.  **Start from the definition.** Write down $A\vec{v} = \lambda\vec{v}$. This is the foundational statement. Meditate on what it means: the action of matrix $A$ on vector $\vec{v}$ is the same as just scaling $\vec{v}$ by a number $\lambda$.
2.  **Rearrange the equation.** To solve for $\vec{v}$ and $\lambda$, get all terms on one side: $A\vec{v} - \lambda\vec{v} = \vec{0}$. To factor out $\vec{v}$, we must introduce the identity matrix: $A\vec{v} - \lambda I\vec{v} = \vec{0}$. This gives the crucial form: $(A - \lambda I)\vec{v} = \vec{0}$.
3.  **Understand the singularity condition.** We are looking for a *non-zero* eigenvector $\vec{v}$. The equation $(A - \lambda I)\vec{v} = \vec{0}$ is a homogeneous system of linear equations. If the matrix $(A - \lambda I)$ were invertible, the only solution would be the trivial one, $\vec{v} = \vec{0}$. Since we require $\vec{v} \neq \vec{0}$, the matrix $(A - \lambda I)$ must be singular (non-invertible).
4.  **Invoke the determinant.** The single most important property of a singular matrix is that its determinant is zero. Therefore, to find the values of $\lambda$ that make our system work, we must solve the equation: $\det(A - \lambda I) = 0$.
5.  **Practice the polynomial.** The expression $\det(A - \lambda I)$ is a polynomial in the variable $\lambda$, called the **characteristic polynomial**. For a $2 \times 2$ matrix, it will be a quadratic. For a $3 \times 3$, a cubic. Calculate this for a few simple matrices until the mechanics are automatic.
6.  **Solve for eigenvalues, then eigenvectors.** First, find the roots of the characteristic polynomial; these are the eigenvalues $\lambda_1, \lambda_2, ...$. Then, for each eigenvalue $\lambda_i$ you find, plug it back into $(A - \lambda_i I)\vec{v} = \vec{0}$ and solve for $\vec{v}$. This is equivalent to finding the null space of the matrix $(A - \lambda_i I)$.

## Key ideas, with intuition
1.  **Eigenvectors are the "invariant directions" of a transformation.** Most vectors, when multiplied by a matrix $A$, get rotated and scaled. Eigenvectors are special: they lie on lines that are mapped back onto themselves by the transformation. The matrix can only stretch, shrink, or flip them along that line.

2.  **Eigenvalues are the "stretch factors" for those directions.** An eigenvalue $\lambda$ tells you the scaling that occurs along its corresponding eigenvector's direction.
    *   If $|\lambda| > 1$, vectors along this direction are stretched.
    *   If $|\lambda| < 1$, vectors are compressed.
    *   If $\lambda < 0$, vectors are flipped.
    *   If $\lambda = 1$, vectors are unchanged (this is a line of fixed points).
    *   If $\lambda = 0$, vectors are collapsed into the origin. The eigenvector is in the null space of the matrix.

3.  **The characteristic equation is a search for singularity.** The equation $\det(A - \lambda I) = 0$ is not arbitrary. It's a clever way to find the exact values of $\lambda$ that cause the matrix $(A - \lambda I)$ to "lose a dimension" or become singular. When a matrix is singular, its null space is non-trivial, which guarantees the existence of the non-zero eigenvectors we need. We are essentially asking: "For which scaling factors $\lambda$ does the transformation $A$ behave like a projection in some direction?"

## Worked example
Find the eigenvalues and eigenvectors of the matrix $A = \begin{pmatrix} 3 & 1 \\ 1 & 3 \end{pmatrix}$.

**Step 1: Set up the characteristic equation $\det(A - \lambda I) = 0$.**
$$
A - \lambda I = \begin{pmatrix} 3 & 1 \\ 1 & 3 \end{pmatrix} - \lambda \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 3-\lambda & 1 \\ 1 & 3-\lambda \end{pmatrix}
$$
The characteristic equation is:
$$
\det \begin{pmatrix} 3-\lambda & 1 \\ 1 & 3-\lambda \end{pmatrix} = 0
$$

**Step 2: Calculate the determinant and solve for the eigenvalues $\lambda$.**
$$
(3-\lambda)(3-\lambda) - (1)(1) = 0
$$
$$
9 - 6\lambda + \lambda^2 - 1 = 0
$$
$$
\lambda^2 - 6\lambda + 8 = 0
$$
Factoring the quadratic gives:
$$
(\lambda - 4)(\lambda - 2) = 0
$$
The eigenvalues are $\lambda_1 = 4$ and $\lambda_2 = 2$.

**Step 3: Find the eigenvector for $\lambda_1 = 4$.**
We must solve $(A - 4I)\vec{v} = \vec{0}$.
$$
(A - 4I) = \begin{pmatrix} 3-4 & 1 \\ 1 & 3-4 \end{pmatrix} = \begin{pmatrix} -1 & 1 \\ 1 & -1 \end{pmatrix}
$$
So we solve:
$$
\begin{pmatrix} -1 & 1 \\ 1 & -1 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}
$$
Both rows give the same equation: $-x + y = 0$, or $x = y$. Any vector where the first component equals the second is an eigenvector. We choose a simple basis vector for this eigenspace.
$$
\vec{v}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}
$$

**Step 4: Find the eigenvector for $\lambda_2 = 2$.**
We must solve $(A - 2I)\vec{v} = \vec{0}$.
$$
(A - 2I) = \begin{pmatrix} 3-2 & 1 \\ 1 & 3-2 \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}
$$
So we solve:
$$
\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}
$$
Both rows give the equation $x + y = 0$, or $x = -y$. We choose a simple basis vector for this eigenspace.
$$
\vec{v}_2 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}
$$

**Reflection:** The characteristic polynomial converted the matrix problem into a simple algebra problem, whose roots were the only two possible scaling factors. For each of these factors, the matrix $(A - \lambda I)$ became singular (the rows were linearly dependent), which guaranteed a non-zero null space where the eigenvectors live.

## Diagrams
Here is the geometric interpretation of the worked example. The matrix $A$ represents a transformation. Most vectors will be moved off their original line.

```text
      ^ y
      |
      |     (A*x)
      |    /
      |   /
      |  x
      | /
 -----+------> x
      |
```
*A general vector x is rotated and scaled by A.*

However, the eigenvectors $\vec{v}_1$ and $\vec{v}_2$ are special. They stay on their lines.

```text
      ^ y
      |
(A*v1)|
=4*v1 |
      |
      |   v1
      |  /
 -----+----/------> x
      |  /
      | v2
      |
      |
      (A*v2)
      =2*v2
```
*Eigenvector $\vec{v}_1 = (1,1)$ is scaled by $\lambda_1=4$. Eigenvector $\vec{v}_2 = (1,-1)$ is scaled by $\lambda_2=2$. Their directions are invariant.*

## Memory technique — remember this forever
1.  **The Story:** "Eigen" is German for "own". An eigenvector is a matrix's "own" vector. It's a direction that the matrix can't change, only scale. To find these "own" values, you make the matrix reveal its character by solving its **characteristic polynomial**. The process is a dialogue:
    *   You: "I want to find a vector $\vec{v}$ where $A\vec{v}$ is parallel to $\vec{v}$."
    *   Math: "You mean $A\vec{v} = \lambda\vec{v}$ for some scalar $\lambda$."
    *   You: "Yes. How do I find $\lambda$?"
    *   Math: "Rearrange to $(A - \lambda I)\vec{v} = \vec{0}$. You need a non-zero $\vec{v}$, so the matrix $(A - \lambda I)$ must be singular."
    *   You: "Aha! So I just need to find $\lambda$ such that $\det(A - \lambda I) = 0$."

2.  **Must Overlearn:**
    *   Definition: $A\vec{v} = \lambda\vec{v}$ (for $\vec{v} \neq \vec{0}$)
    *   Characteristic Equation: $\det(A - \lambda I) = 0$

3.  **Spaced Repetition Schedule:** Review this material and re-do the worked example from a blank sheet of paper at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, rebuild it from the definition.
    *   Start with what you want: $A\vec{v} = \lambda\vec{v}$.
    *   Move everything to one side: $A\vec{v} - \lambda\vec{v} = \vec{0}$.
    *   You can't factor $\vec{v}$ from $A - \lambda$. You must subtract matrices, not a scalar from a matrix. Introduce the identity: $A\vec{v} - \lambda I \vec{v} = \vec{0}$.
    *   Factor: $(A - \lambda I)\vec{v} = \vec{0}$.
    *   Recognize this is a system $M\vec{x} = \vec{0}$. For a non-zero solution $\vec{x}$ to exist, $M$ must be non-invertible (singular).
    *   The condition for singularity is $\det(M) = 0$.
    *   Therefore, $\det(A - \lambda I) = 0$.

## Common mistakes
*   **Subtracting a scalar from a matrix:** Writing $\det(A - \lambda) = 0$. This is undefined. You must write $\det(A - \lambda I) = 0$. The dimensions must match.
*   **Stopping after finding eigenvalues:** The question is almost always to find both eigenvalues *and* eigenvectors. Finding the roots of the polynomial is only half the job.
*   **Assuming an eigenvector is unique:** For a given eigenvalue $\lambda$, its eigenvector $\vec{v}$ is not unique. Any non-zero scalar multiple $c\vec{v}$ is also a valid eigenvector. You are finding a basis for an *eigenspace*.
*   **Making an arithmetic error and getting only $\vec{v}=\vec{0}$:** If you solve $(A - \lambda I)\vec{v} = \vec{0}$ and the only solution is the zero vector, you have made a mistake. A correctly computed eigenvalue *must* produce a singular matrix $(A - \lambda I)$, which *must* have a non-trivial null space. Check your calculation of $\lambda$ or your row reduction.

## Self-check
1.  What are the eigenvalues of the matrix $A = \begin{pmatrix} 5 & 0 \\ 0 & -2 \end{pmatrix}$? Can you determine them by inspection?
2.  Find the eigenvalues and corresponding eigenvectors for $B = \begin{pmatrix} 0 & 1 \\ -2 & -3 \end{pmatrix}$.
3.  Find the eigenvalues and eigenvectors for the 3x3 matrix $C = \begin{pmatrix} 2 & 0 & 0 \\ 1 & 2 & 1 \\ -1 & 0 & 1 \end{pmatrix}$. What is different about the set of eigenvectors you find here compared to the previous problems?