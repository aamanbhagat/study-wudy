## What it is
The Moore-Penrose pseudoinverse, denoted $A^+$, is a generalization of the matrix inverse to any $m \times n$ matrix. For a system of linear equations $A\vec{x} = \vec{b}$, the vector $\vec{x}^+ = A^+\vec{b}$ provides the best possible "solution". If no exact solution exists, $\vec{x}^+$ is the least-squares solution; if multiple solutions exist, $\vec{x}^+$ is the one with the smallest Euclidean norm.

## Why it matters
The pseudoinverse is the workhorse of linear regression, the foundation of most statistical modeling and machine learning. When fitting a model to data, you often have an overdetermined system (more equations than unknowns), and the pseudoinverse directly gives you the best-fit parameters. In aerospace control systems, it's used to solve underdetermined systems, like finding the most efficient thruster firings (minimum energy/norm) to achieve a desired change in orientation.

## When to study it
You must have a firm grasp of these prerequisite topics. Do not proceed otherwise.
1.  **The Four Fundamental Subspaces:** You must understand the column space $C(A)$, null space $N(A)$, row space $C(A^T)$, and left null space $N(A^T)$.
2.  **Orthogonal Projections:** You need to know how to project a vector onto a subspace. The formula $P = A(A^TA)^{-1}A^T$ should be familiar.
3.  **Singular Value Decomposition (SVD):** The most general and stable way to define and compute the pseudoinverse is via the SVD. You must understand that any matrix $A$ can be factored as $A = U\Sigma V^T$.

## How to study it (step by step)
1.  **Revisit Invertibility.** Start by reviewing why $A\vec{x}=\vec{b}$ is only guaranteed to have a unique solution for all $\vec{b}$ if $A$ is square and invertible. Consider the cases where $A$ is "tall" (overdetermined system) and "wide" (underdetermined system). What would a "solution" mean in these cases?
2.  **Derive the Normal Equations.** For an overdetermined system $A\vec{x} = \vec{b}$ with no solution, the best we can do is minimize the error $\|A\vec{x} - \vec{b}\|_2$. Show that the vector $\hat{\vec{x}}$ that minimizes this error must satisfy $A^T(A\hat{\vec{x}} - \vec{b}) = \vec{0}$. This gives the normal equations: $A^T A \hat{\vec{x}} = A^T \vec{b}$.
3.  **The Left Inverse.** If $A$ is an $m \times n$ matrix with $m>n$ (tall) and has full column rank (its columns are linearly independent), then $A^T A$ is invertible. Solve the normal equations to find $\hat{\vec{x}} = (A^T A)^{-1} A^T \vec{b}$. The matrix $A^+ = (A^T A)^{-1} A^T$ is the *left inverse* of $A$. Verify that $A^+A = I$.
4.  **The Right Inverse.** If $A$ is $m \times n$ with $m<n$ (wide) and has full row rank, there are infinite solutions to $A\vec{x}=\vec{b}$. We want the solution with the minimum norm $\|\vec{x}\|_2$. This solution lies entirely in the row space of $A$. Any solution can be written as $\vec{x} = A^T\vec{y}$ for some vector $\vec{y}$. Substitute this into $A\vec{x}=\vec{b}$ to get $AA^T\vec{y}=\vec{b}$. Since $A$ has full row rank, $AA^T$ is invertible. Solve for $\vec{y}$ and substitute back to get $\vec{x} = A^T(AA^T)^{-1}\vec{b}$. The matrix $A^+ = A^T(AA^T)^{-1}$ is the *right inverse*. Verify that $AA^+ = I$.
5.  **The General Case via SVD.** The left and right inverses fail if $A$ is not full rank. The SVD provides the universal solution. Given $A = U\Sigma V^T$, the pseudoinverse is $A^+ = V\Sigma^+U^T$. $\Sigma^+$ is formed by taking the transpose of $\Sigma$ and then taking the reciprocal of all its non-zero entries.
6.  **Practice.** Compute the pseudoinverse for a 2x2 singular matrix using SVD. For example, $A = \begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$.

## Key ideas, with intuition
1.  **The Pseudoinverse Reverses the "Action" of a Matrix.** A matrix $A$ maps its row space $C(A^T)$ bijectively to its column space $C(A)$. The pseudoinverse $A^+$ perfectly reverses this mapping, taking any vector in $C(A)$ back to its unique preimage in $C(A^T)$.
    $$ A: C(A^T) \to C(A) \quad \text{and} \quad A^+: C(A) \to C(A^T) $$
2.  **The Pseudoinverse Annihilates What's Orthogonal.** What does $A^+$ do to vectors *outside* the column space? The space orthogonal to the column space is the left null space, $N(A^T)$. The pseudoinverse maps any vector in this space to the zero vector.
    $$ \text{If } \vec{z} \in N(A^T), \text{ then } A^+\vec{z} = \vec{0}. $$
    This is key to the least-squares property. For $A\vec{x}=\vec{b}$, we can write $\vec{b} = \vec{p} + \vec{e}$, where $\vec{p}$ is the projection of $\vec{b}$ onto $C(A)$ and $\vec{e}$ is the error in $N(A^T)$. Then $A^+\vec{b} = A^+(\vec{p}+\vec{e}) = A^+\vec{p} + A^+\vec{e} = A^+\vec{p} + \vec{0}$. It finds the exact preimage of the *projected* part of $\vec{b}$.
3.  **The Solution Has Minimum Norm.** The solution $\vec{x}^+ = A^+\vec{b}$ always lies in the row space of $A$. Why? Because $A^+$ maps everything *to* the row space. Any other solution $\vec{z}$ to the least-squares problem can be written as $\vec{z} = \vec{x}^+ + \vec{n}$ where $\vec{n}$ is a vector in the null space of $A$. Since the row space and null space are orthogonal, by the Pythagorean theorem, $\|\vec{z}\|^2 = \|\vec{x}^+\|^2 + \|\vec{n}\|^2$. This is minimized when $\|\vec{n}\|^2=0$, i.e., when $\vec{z}=\vec{x}^+$.

## Worked example
Find the minimum-norm solution to the underdetermined system:
$x_1 + 2x_2 + x_3 = 4$
$3x_1 + 0x_2 + x_3 = 6$

1.  **Set up the matrix equation.**
    $$ A = \begin{pmatrix} 1 & 2 & 1 \\ 3 & 0 & 1 \end{pmatrix}, \quad \vec{x} = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix}, \quad \vec{b} = \begin{pmatrix} 4 \\ 6 \end{pmatrix} $$
2.  **Identify the case.** $A$ is a $2 \times 3$ matrix. It is "wide" and its rows are linearly independent, so it has full row rank. We can use the right inverse formula: $A^+ = A^T(AA^T)^{-1}$.
3.  **Calculate $A A^T$.**
    $$ AA^T = \begin{pmatrix} 1 & 2 & 1 \\ 3 & 0 & 1 \end{pmatrix} \begin{pmatrix} 1 & 3 \\ 2 & 0 \\ 1 & 1 \end{pmatrix} = \begin{pmatrix} 1+4+1 & 3+0+1 \\ 3+0+1 & 9+0+1 \end{pmatrix} = \begin{pmatrix} 6 & 4 \\ 4 & 10 \end{pmatrix} $$
4.  **Calculate $(AA^T)^{-1}$.**
    The determinant is $(6)(10) - (4)(4) = 60 - 16 = 44$.
    $$ (AA^T)^{-1} = \frac{1}{44} \begin{pmatrix} 10 & -4 \\ -4 & 6 \end{pmatrix} $$
5.  **Calculate $A^+ = A^T(AA^T)^{-1}$.**
    $$ A^+ = \begin{pmatrix} 1 & 3 \\ 2 & 0 \\ 1 & 1 \end{pmatrix} \frac{1}{44} \begin{pmatrix} 10 & -4 \\ -4 & 6 \end{pmatrix} = \frac{1}{44} \begin{pmatrix} 1(10)+3(-4) & 1(-4)+3(6) \\ 2(10)+0(-4) & 2(-4)+0(6) \\ 1(10)+1(-4) & 1(-4)+1(6) \end{pmatrix} = \frac{1}{44} \begin{pmatrix} -2 & 14 \\ 20 & -8 \\ 6 & 2 \end{pmatrix} $$
6.  **Calculate the solution $\vec{x}^+ = A^+\vec{b}$.**
    $$ \vec{x}^+ = \frac{1}{44} \begin{pmatrix} -2 & 14 \\ 20 & -8 \\ 6 & 2 \end{pmatrix} \begin{pmatrix} 4 \\ 6 \end{pmatrix} = \frac{1}{44} \begin{pmatrix} -8 + 84 \\ 80 - 48 \\ 24 + 12 \end{pmatrix} = \frac{1}{44} \begin{pmatrix} 76 \\ 32 \\ 36 \end{pmatrix} = \begin{pmatrix} 19/11 \\ 8/11 \\ 9/11 \end{pmatrix} $$

**Reflection:** We used the right-inverse formula because the matrix had full row rank, which guaranteed $AA^T$ was invertible. This formula directly constructs the operator that maps $\vec{b}$ to the specific solution $\vec{x}$ that lies in the row space of $A$, ensuring it has the minimum possible norm. Any other solution would be this $\vec{x}^+$ plus a vector from the null space of $A$, which would necessarily increase its length.

## Diagrams
This diagram illustrates the action of $A$ and its pseudoinverse $A^+$ on the four fundamental subspaces. $A$ maps the row space to the column space, and the nullspace to zero. $A^+$ does the reverse: it maps the column space back to the row space, and the left nullspace (the orthogonal complement of the column space) to zero.

```text
       Domain (R^n)                                 Codomain (R^m)
  +--------------------+                          +--------------------+
  |                    |                          |                    |
  |  Row Space C(A^T)  | -------- A -------->     | Column Space C(A)  |
  | (dim r)            | <------- A^+ --------    | (dim r)            |
  |                    |                          |                    |
  +--------------------+                          +--------------------+
  |         ^          |                          |         ^          |
  |         | Orthog.  |                          |         | Orthog.  |
  |         v          |                          |         v          |
  +--------------------+                          +--------------------+
  |                    |                          |                    |
  |  Nullspace N(A)    | -------- A --------> {0} | Left Nullspace N(A^T)|
  | (dim n-r)          |                          | (dim m-r)          |
  |                    | {0} <------- A^+ --------|                    |
  +--------------------+                          +--------------------+
```

## Memory technique — remember this forever
1.  **The Story:** The pseudoinverse is the "perfect employee" for solving $A\vec{x}=\vec{b}$.
    *   If the task is impossible (no solution), it doesn't give up; it produces the result with the **least error** (least squares).
    *   If the task is ambiguous (many solutions), it doesn't guess; it chooses the most efficient option, the one requiring the **least effort** (minimum norm).
    *   It achieves this by only using the "essential dimensions" (the row space) and ignoring the "useless dimensions" (the null space).

2.  **Formulas to Overlearn:**
    *   **General (SVD):** If $A = U\Sigma V^T$, then $A^+ = V\Sigma^+ U^T$. ($\Sigma^+$ means invert non-zero elements, then transpose). This is the definition.
    *   **Tall/Full Column Rank:** $A^+ = (A^T A)^{-1} A^T$. (Left inverse)
    *   **Wide/Full Row Rank:** $A^+ = A^T (A A^T)^{-1}$. (Right inverse)

3.  **Spaced Repetition Schedule:** Review these ideas and re-derive the left/right inverse formulas from the normal equations / minimum norm principle at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:** If you forget the formulas, remember the goals.
    *   **Least Squares:** Minimize $\|A\vec{x}-\vec{b}\|^2$. Take the gradient with respect to $\vec{x}$ and set to zero. This will give you the normal equations $A^TA\vec{x} = A^T\vec{b}$, from which you can find the left inverse.
    *   **Minimum Norm:** The solution must be in the row space, so $\vec{x} = A^T\vec{y}$. Substitute into $A\vec{x}=\vec{b}$ to get $AA^T\vec{y}=\vec{b}$. Solve for $\vec{y}$ and substitute back. This gives you the right inverse.

## Common mistakes
1.  **Applying the wrong special-case formula.** Using $(A^TA)^{-1}A^T$ on a wide matrix. The dimensions will immediately show you this is wrong: $A^TA$ will be singular for a wide matrix. Always check for full rank before using these.
2.  **Incorrectly forming $\Sigma^+$.** A common error is to invert the non-zero elements of $\Sigma$ but forget to take the transpose. If $\Sigma$ is $m \times n$, then $\Sigma^+$ must be $n \times m$.
3.  **Assuming $(AB)^+ = B^+A^+$.** This property of the true inverse does *not* hold in general for the pseudoinverse. Do not use it unless you can prove it holds for your specific matrices.

## Self-check
1.  Let $D = \begin{pmatrix} 2 & 0 \\ 0 & 5 \\ 0 & 0 \end{pmatrix}$. What is $D^+$?
2.  Let $A = \vec{u}\vec{v}^T$ be a rank-1 matrix, where $\vec{u}$ and $\vec{v}$ are non-zero column vectors. Find an expression for $A^+$ in terms of $\vec{u}$ and $\vec{v}$.
3.  Prove that for any matrix $A$, the pseudoinverse solution $\vec{x}^+ = A^+\vec{b}$ is orthogonal to the null space of $A$. (Hint: Where does the pseudoinverse map vectors *to*?)