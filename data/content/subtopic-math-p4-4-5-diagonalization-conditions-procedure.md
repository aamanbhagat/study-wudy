## What it is
Diagonalization is the process of finding a special basis, called an eigenbasis, for a linear transformation. In this basis, the transformation's matrix representation is diagonal, meaning it only has non-zero entries on its main diagonal. This simplifies the transformation's action to simple scaling along the new basis vectors.

## Why it matters
Diagonalization is a fundamental tool for simplifying complex systems. In physics, it's used to find the principal axes of rotation of a rigid body (diagonalizing the inertia tensor) and to solve for the energy levels in quantum mechanics. In machine learning, Principal Component Analysis (PCA) works by diagonalizing a covariance matrix to find the directions of greatest variance in data.

## When to study it
You must have a firm grasp of the following prerequisites. If any are weak, review them first.
-   Linear transformations and their matrix representations.
-   Matrix multiplication, determinants, and finding matrix inverses.
-   The core concepts of eigenvalues and eigenvectors: what they are ($\det(A - \lambda I) = 0$) and how to find them ($(A - \lambda I)\vec{v} = \vec{0}$).

## How to study it (step by step)
1.  **Derive the core equation.** Start with the definition of an eigenvector, $A\vec{v}_i = \lambda_i\vec{v}_i$. Write this equation for all $n$ eigenvectors of an $n \times n$ matrix $A$ and assemble them into a single matrix equation. This will lead you directly to $AP = PD$.
2.  **Understand the condition.** From $AP=PD$, derive the diagonalization $A = PDP^{-1}$. Note that this requires $P$ to be invertible. Recall that an $n \times n$ matrix is invertible if and only if its columns are linearly independent. This establishes the central condition: an $n \times n$ matrix is diagonalizable if and only if it has $n$ linearly independent eigenvectors.
3.  **Master the procedure.** Take a simple $2 \times 2$ matrix with distinct eigenvalues. Methodically execute the three steps: (1) Find eigenvalues, (2) Find corresponding eigenvectors, (3) Construct $P$ (from eigenvectors) and $D$ (from eigenvalues).
4.  **Verify your work.** For the matrix you just diagonalized, explicitly calculate $P^{-1}$ and compute the product $PDP^{-1}$. Confirm that it equals your original matrix $A$. This closes the loop and builds confidence.
5.  **Study a failure case.** Investigate a matrix that is *not* diagonalizable. The classic example is a shear matrix like $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$. Find its eigenvalues and eigenvectors. You will find you cannot form a basis of eigenvectors, thus $P$ is not invertible and the procedure fails. This clarifies why the condition is necessary.

## Key ideas, with intuition
1.  **Diagonalization is a Change of Perspective.** Imagine a transformation that stretches and rotates vectors in a complicated way. Diagonalization is about finding a "special" coordinate system (the eigenbasis) where this complex action becomes simple. In this new system, the transformation is just a stretch along each axis. The matrix $D$ represents this simple stretch, and the matrix $P$ is the "translator" between the standard coordinate system and this special one.

2.  **The Master Equation: $A = PDP^{-1}$**
    This equation tells a story, read from right to left, about how to apply the transformation $A$ to a vector $\vec{x}$:
    $$A\vec{x} = (PDP^{-1})\vec{x} = P(D(P^{-1}\vec{x}))$$
    -   $P^{-1}\vec{x}$: Translate the vector $\vec{x}$ from the standard basis into the eigenbasis coordinates.
    -   $D(P^{-1}\vec{x})$: In the eigenbasis, perform the simple scaling operation defined by the diagonal matrix $D$.
    -   $P(D(P^{-1}\vec{x}))$: Translate the result back to the standard basis.
    The complex action of $A$ is equivalent to this three-step process of changing basis, scaling, and changing back.

3.  **The Condition: A Full Set of Independent Eigenvectors.**
    For an $n$-dimensional space, you need $n$ basis vectors to span the entire space. To diagonalize an $n \times n$ matrix $A$, you need its eigenvectors to form a basis. This requires two things:
    -   You must be able to *find* $n$ eigenvectors.
    -   Those $n$ eigenvectors must be *linearly independent*.
    If an $n \times n$ matrix has $n$ distinct eigenvalues, you are guaranteed to have $n$ linearly independent eigenvectors, so it is diagonalizable. If it has repeated eigenvalues, it *might* still be diagonalizable, but you must check if you can find enough linearly independent eigenvectors for the repeated eigenvalue's eigenspace.

## Worked example
Let's diagonalize the matrix $A = \begin{pmatrix} 4 & -2 \\ 1 & 1 \end{pmatrix}$.

**Step 1: Find the eigenvalues ($\lambda$).**
We solve the characteristic equation $\det(A - \lambda I) = 0$.
$$ \det \begin{pmatrix} 4-\lambda & -2 \\ 1 & 1-\lambda \end{pmatrix} = (4-\lambda)(1-\lambda) - (-2)(1) = 0 $$
$$ 4 - 5\lambda + \lambda^2 + 2 = 0 $$
$$ \lambda^2 - 5\lambda + 6 = 0 $$
$$ (\lambda - 2)(\lambda - 3) = 0 $$
The eigenvalues are $\lambda_1 = 2$ and $\lambda_2 = 3$.

**Step 2: Find the eigenvectors ($\vec{v}$).**
For each eigenvalue, we find the null space of $(A - \lambda I)$.

For $\lambda_1 = 2$:
$$ (A - 2I)\vec{v}_1 = \begin{pmatrix} 2 & -2 \\ 1 & -1 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} $$
This gives the equation $x - y = 0$, so $x=y$. A suitable eigenvector is $\vec{v}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.

For $\lambda_2 = 3$:
$$ (A - 3I)\vec{v}_2 = \begin{pmatrix} 1 & -2 \\ 1 & -2 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} $$
This gives the equation $x - 2y = 0$, so $x=2y$. A suitable eigenvector is $\vec{v}_2 = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$.

**Step 3: Construct $P$ and $D$.**
$P$ is the matrix whose columns are the eigenvectors. $D$ is the diagonal matrix with corresponding eigenvalues on the diagonal. The order must match.
$$ P = [\vec{v}_1 \ \vec{v}_2] = \begin{pmatrix} 1 & 2 \\ 1 & 1 \end{pmatrix} $$
$$ D = \begin{pmatrix} \lambda_1 & 0 \\ 0 & \lambda_2 \end{pmatrix} = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix} $$

**Reflection:**
The procedure worked because we found two eigenvalues for our $2 \times 2$ matrix, and since they were distinct, they were guaranteed to produce two linearly independent eigenvectors. These eigenvectors form a basis for $\mathbb{R}^2$, allowing us to construct the invertible change-of-basis matrix $P$.

## Diagrams
Here is the geometric interpretation. A vector $\vec{x}$ can be seen in the standard basis $(e_1, e_2)$ or the eigenbasis $(v_1, v_2)$. Applying $A$ is complex in the standard basis, but simple in the eigenbasis—just scaling the components.

```text
       Standard Basis (e1, e2)                    Eigenbasis (v1, v2)
                                                         ^ v2
             ^ e2                                        |
             |                                           |  /
             |     . x                                   . x
             |    /                                    . '
             |   /                                   .   '
             |  /                                   .     '
             +-----------> e1                     ---.----.------> v1
                                                     '   /
                                                      ' .
                                                       '
```
Applying the transformation $A$ to $\vec{x}$:
- In the standard basis, the result $A\vec{x}$ is a new vector, often pointing in a completely different direction.
- In the eigenbasis, we write $\vec{x} = c_1\vec{v}_1 + c_2\vec{v}_2$. Then $A\vec{x} = A(c_1\vec{v}_1 + c_2\vec{v}_2) = c_1(A\vec{v}_1) + c_2(A\vec{v}_2) = c_1(\lambda_1\vec{v}_1) + c_2(\lambda_2\vec{v}_2)$. The components in the eigenbasis are simply scaled by the eigenvalues.

## Memory technique — remember this forever
1.  **The Mnemonic Story:** Think of a matrix $A$ as a chaotic city map. You want to find a simple way to navigate it. The eigenvectors are "main avenues" or **P**rincipal **D**irections. The diagonalization $A = PDP^{-1}$ is your GPS instruction:
    -   $P^{-1}$: "Get off the side streets and onto a main avenue." (Change to eigenbasis)
    -   $D$: "Drive straight; the distance is scaled by $\lambda$." (Simple scaling)
    -   $P$: "Get off the main avenue and back to your destination." (Change back to standard basis)
    The company that made the GPS is **P**rincipal **D**irection **P**aths. $A = PDP^{-1}$.

2.  **Must-Overlearn Formulas:**
    -   $A\vec{v} = \lambda\vec{v}$ (The definition of an eigenvector)
    -   $A = PDP^{-1}$ (The result of diagonalization)
    -   $P = [\vec{v}_1 \ \vec{v}_2 \ \dots \ \vec{v}_n]$ and $D_{ii} = \lambda_i$ (The construction)

3.  **Spaced Repetition Schedule:**
    Review this material and attempt a new problem at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:**
    If you forget $A=PDP^{-1}$, re-derive it.
    -   Start with the definition for each eigenvector: $A\vec{v}_1 = \lambda_1\vec{v}_1$, $A\vec{v}_2 = \lambda_2\vec{v}_2$, ..., $A\vec{v}_n = \lambda_n\vec{v}_n$.
    -   Write these $n$ equations as one matrix equation:
        $$ A[\vec{v}_1 \ \vec{v}_2 \ \dots \ \vec{v}_n] = [\lambda_1\vec{v}_1 \ \lambda_2\vec{v}_2 \ \dots \ \lambda_n\vec{v}_n] $$
    -   Recognize the matrix of eigenvectors is $P$: $AP = [\lambda_1\vec{v}_1 \ \lambda_2\vec{v}_2 \ \dots \ \lambda_n\vec{v}_n]$.
    -   Factor the right side: The right side is the same as multiplying $P$ by a diagonal matrix of eigenvalues.
        $$ [\vec{v}_1 \ \vec{v}_2 \ \dots \ \vec{v}_n] \begin{pmatrix} \lambda_1 & 0 & \dots \\ 0 & \lambda_2 & \dots \\ \vdots & \vdots & \ddots \end{pmatrix} = PD $$
    -   You have $AP = PD$. If $P$ is invertible (i.e., you have $n$ linearly independent eigenvectors), right-multiply by $P^{-1}$ to get $A = PDP^{-1}$.

## Common mistakes
-   **Incorrectly ordering P and D.** The $i$-th column of $P$ must be the eigenvector corresponding to the $i$-th eigenvalue on the diagonal of $D$. Swapping two columns in $P$ requires swapping the corresponding diagonal entries in $D$.
-   **Assuming all matrices are diagonalizable.** A matrix with a repeated eigenvalue might not have enough linearly independent eigenvectors. For an eigenvalue $\lambda$ with algebraic multiplicity $k$, you must be able to find $k$ linearly independent eigenvectors for that eigenvalue. If the dimension of the eigenspace (geometric multiplicity) is less than $k$, the matrix is not diagonalizable.
-   **Calculating $A^k = P D^k P^{-1}$ incorrectly.** A common application is computing matrix powers. Remember that $D^k$ is easy to compute (just raise the diagonal elements to the power $k$), but don't forget to multiply by $P$ and $P^{-1}$. A frequent error is stating $A^k = P^k D^k (P^{-1})^k$, which is false.

## Self-check
1.  Diagonalize the matrix $A = \begin{pmatrix} 7 & -3 \\ 10 & -4 \end{pmatrix}$. Verify your result by computing $PDP^{-1}$.
2.  Consider the matrix $B = \begin{pmatrix} 2 & 1 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 5 \end{pmatrix}$. One eigenvalue is $\lambda=5$. The other eigenvalue, $\lambda=2$, has an algebraic multiplicity of 2. Is this matrix diagonalizable? Justify your answer by finding the eigenvectors.
3.  Let $A$ be an invertible and diagonalizable matrix. Prove that its inverse, $A^{-1}$, is also diagonalizable. What are the matrices $P$ and $D$ for the diagonalization of $A^{-1}$ in terms of the diagonalization of $A$?