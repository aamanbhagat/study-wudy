## What it is
The method of least squares finds an approximate solution to an overdetermined system of linear equations $A\mathbf{x} = \mathbf{b}$, where no exact solution exists. It finds the vector $\hat{\mathbf{x}}$ that minimizes the squared Euclidean distance $\|\mathbf{b} - A\mathbf{x}\|^2$. This "solution" $\hat{\mathbf{x}}$ makes $A\hat{\mathbf{x}}$ the closest possible vector to $\mathbf{b}$ within the column space of $A$.

## Why it matters
Least squares is the backbone of regression analysis in statistics and machine learning, used to fit models to noisy data. In aerospace, it is essential for trajectory estimation and orbit determination, where a satellite's path is calculated from a series of imperfect sensor readings. In physics, it's used to fit experimental data to a theoretical curve, allowing for the determination of physical constants.

## When to study it
You must be fluent with these prerequisites before proceeding. If not, review them first.
1.  **Vector Spaces**: Column space, null space, basis, and dimension.
2.  **Orthogonality**: Dot products, orthogonal vectors, and orthogonal complements.
3.  **Projections**: The formula for projecting a vector onto a subspace.
4.  **Matrix Decompositions**: Specifically, the Gram-Schmidt process and the resulting $A=QR$ factorization, where $Q$ has orthonormal columns and $R$ is upper triangular.

## How to study it (step by step)
1.  **Revisit Projections**: Write down the formula for projecting a vector $\mathbf{b}$ onto the subspace spanned by the columns of a matrix $A$. Understand that the "best" approximation for $\mathbf{b}$ in $\text{Col}(A)$ is its orthogonal projection, $\mathbf{p}$.
2.  **Derive the Normal Equations**: Start with the geometric insight: the error vector $\mathbf{e} = \mathbf{b} - \mathbf{p}$ must be orthogonal to the entire column space of $A$. Express this as $A^T(\mathbf{b} - A\hat{\mathbf{x}}) = \mathbf{0}$ and derive the normal equations: $A^T A \hat{\mathbf{x}} = A^T \mathbf{b}$.
3.  **Solve a Problem with Normal Equations**: Find the line of best fit for the points $(0,1), (1,3), (2,5)$. Set up the $A\mathbf{x}=\mathbf{b}$ system and solve it by calculating $A^TA$ and $A^T\mathbf{b}$.
4.  **Understand Numerical Instability**: Research the "condition number" of a matrix. Understand that $\text{cond}(A^TA) = (\text{cond}(A))^2$. This means that forming the product $A^TA$ can square the sensitivity to numerical errors, making the normal equations unreliable if the columns of $A$ are close to being linearly dependent.
5.  **Derive the QR Approach**: Substitute $A=QR$ into the normal equations: $(QR)^T(QR)\hat{\mathbf{x}} = (QR)^T\mathbf{b}$. Use the facts that $(QR)^T = R^TQ^T$ and $Q^TQ=I$ to simplify this into the much cleaner and more stable system $R\hat{\mathbf{x}} = Q^T\mathbf{b}$.
6.  **Re-solve with QR**: Re-solve the line-fitting problem from step 3. First, find the QR decomposition of $A$. Then, solve the triangular system $R\hat{\mathbf{x}} = Q^T\mathbf{b}$ using back substitution. Note that you never compute the numerically problematic $A^TA$.

## Key ideas, with intuition
1.  **The Closest Point is the Projection**: The system $A\mathbf{x}=\mathbf{b}$ is unsolvable if $\mathbf{b}$ is not in the column space of $A$, $\text{Col}(A)$. The least squares method rephrases the problem: instead of solving $A\mathbf{x}=\mathbf{b}$, we solve $A\hat{\mathbf{x}}=\mathbf{p}$, where $\mathbf{p}$ is the orthogonal projection of $\mathbf{b}$ onto $\text{Col}(A)$. By definition, $\mathbf{p}$ is the vector in $\text{Col}(A)$ closest to $\mathbf{b}$.

2.  **The Error Vector is Orthogonal**: The "error" or "residual" vector is the difference between our target and our best approximation: $\mathbf{e} = \mathbf{b} - \mathbf{p} = \mathbf{b} - A\hat{\mathbf{x}}$. The key geometric fact is that this error vector is orthogonal to *every* vector in the subspace $\text{Col}(A)$.

3.  **The Normal Equations are the Orthogonality Condition**: If $\mathbf{e}$ is orthogonal to $\text{Col}(A)$, it must be orthogonal to each column of $A$. We can state this for all columns simultaneously using the matrix transpose:
    $$
    A^T \mathbf{e} = \mathbf{0} \implies A^T (\mathbf{b} - A\hat{\mathbf{x}}) = \mathbf{0}
    $$
    Rearranging this gives the **normal equations**:
    $$
    A^T A \hat{\mathbf{x}} = A^T \mathbf{b}
    $$
    This is a square, solvable system of equations for the best-fit solution $\hat{\mathbf{x}}$.

4.  **QR is a Better Basis**: The columns of $A$ might be a poor (e.g., almost parallel) basis for $\text{Col}(A)$, which makes the $A^TA$ matrix ill-conditioned. The QR decomposition finds an orthonormal basis for $\text{Col}(A)$ (the columns of $Q$). Solving the problem in this "nice" basis is numerically stable. Substituting $A=QR$ into the normal equations and simplifying gives:
    $$
    (QR)^T(QR)\hat{\mathbf{x}} = (QR)^T\mathbf{b} \\
    R^T(Q^TQ)R\hat{\mathbf{x}} = R^TQ^T\mathbf{b} \\
    R^T R \hat{\mathbf{x}} = R^T Q^T \mathbf{b}
    $$
    Since $R$ is invertible (as $A$ has linearly independent columns), so is $R^T$. We can multiply by $(R^T)^{-1}$ on the left:
    $$
    R \hat{\mathbf{x}} = Q^T \mathbf{b}
    $$
    This is a simple upper-triangular system that can be solved efficiently and accurately by back substitution.

## Worked example
Find the least-squares line $y = c_0 + c_1 x$ that best fits the data points $(0, 1), (1, 2), (2, 4)$.

The system of equations is:
$c_0 + c_1(0) = 1$
$c_0 + c_1(1) = 2$
$c_0 + c_1(2) = 4$

This corresponds to the unsolvable matrix equation $A\mathbf{x} = \mathbf{b}$:
$$
A = \begin{pmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{pmatrix}, \quad \mathbf{x} = \begin{pmatrix} c_0 \\ c_1 \end{pmatrix}, \quad \mathbf{b} = \begin{pmatrix} 1 \\ 2 \\ 4 \end{pmatrix}
$$

**Method 1: Normal Equations**

1.  Compute $A^T A$ and $A^T \mathbf{b}$:
    $$
    A^T A = \begin{pmatrix} 1 & 1 & 1 \\ 0 & 1 & 2 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{pmatrix} = \begin{pmatrix} 3 & 3 \\ 3 & 5 \end{pmatrix}
    $$
    $$
    A^T \mathbf{b} = \begin{pmatrix} 1 & 1 & 1 \\ 0 & 1 & 2 \end{pmatrix} \begin{pmatrix} 1 \\ 2 \\ 4 \end{pmatrix} = \begin{pmatrix} 7 \\ 10 \end{pmatrix}
    $$
2.  Solve the system $A^T A \hat{\mathbf{x}} = A^T \mathbf{b}$:
    $$
    \begin{pmatrix} 3 & 3 \\ 3 & 5 \end{pmatrix} \begin{pmatrix} c_0 \\ c_1 \end{pmatrix} = \begin{pmatrix} 7 \\ 10 \end{pmatrix}
    $$
    Using Gaussian elimination or substitution: $3c_0 + 3c_1 = 7$ and $3c_0 + 5c_1 = 10$. Subtracting the first from the second gives $2c_1 = 3 \implies c_1 = 1.5$. Substituting back gives $3c_0 + 3(1.5) = 7 \implies 3c_0 = 2.5 \implies c_0 = 5/6$.

The best-fit line is $y = \frac{5}{6} + \frac{3}{2}x$.

**Method 2: QR Approach**

1.  Find the QR decomposition of $A$ using Gram-Schmidt on its columns $\mathbf{a}_1, \mathbf{a}_2$:
    $\mathbf{q}_1 = \frac{\mathbf{a}_1}{\|\mathbf{a}_1\|} = \frac{1}{\sqrt{3}}\begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}$.
    $\mathbf{v}_2 = \mathbf{a}_2 - (\mathbf{q}_1^T \mathbf{a}_2)\mathbf{q}_1 = \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix} - \frac{3}{\sqrt{3}} \frac{1}{\sqrt{3}}\begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix} - \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} = \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix}$.
    $\mathbf{q}_2 = \frac{\mathbf{v}_2}{\|\mathbf{v}_2\|} = \frac{1}{\sqrt{2}}\begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix}$.
    So, $Q = \begin{pmatrix} 1/\sqrt{3} & -1/\sqrt{2} \\ 1/\sqrt{3} & 0 \\ 1/\sqrt{3} & 1/\sqrt{2} \end{pmatrix}$.
    The matrix $R$ is given by $R = Q^T A$:
    $$
    R = \begin{pmatrix} 1/\sqrt{3} & 1/\sqrt{3} & 1/\sqrt{3} \\ -1/\sqrt{2} & 0 & 1/\sqrt{2} \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{pmatrix} = \begin{pmatrix} 3/\sqrt{3} & 3/\sqrt{3} \\ 0 & 2/\sqrt{2} \end{pmatrix} = \begin{pmatrix} \sqrt{3} & \sqrt{3} \\ 0 & \sqrt{2} \end{pmatrix}
    $$
2.  Solve the system $R \hat{\mathbf{x}} = Q^T \mathbf{b}$:
    $$
    Q^T \mathbf{b} = \begin{pmatrix} 1/\sqrt{3} & 1/\sqrt{3} & 1/\sqrt{3} \\ -1/\sqrt{2} & 0 & 1/\sqrt{2} \end{pmatrix} \begin{pmatrix} 1 \\ 2 \\ 4 \end{pmatrix} = \begin{pmatrix} 7/\sqrt{3} \\ 3/\sqrt{2} \end{pmatrix}
    $$
    The system to solve is:
    $$
    \begin{pmatrix} \sqrt{3} & \sqrt{3} \\ 0 & \sqrt{2} \end{pmatrix} \begin{pmatrix} c_0 \\ c_1 \end{pmatrix} = \begin{pmatrix} 7/\sqrt{3} \\ 3/\sqrt{2} \end{pmatrix}
    $$
    Using back substitution:
    From the second row: $\sqrt{2} c_1 = 3/\sqrt{2} \implies c_1 = 3/2 = 1.5$.
    From the first row: $\sqrt{3} c_0 + \sqrt{3} c_1 = 7/\sqrt{3} \implies 3c_0 + 3(1.5) = 7 \implies 3c_0 = 2.5 \implies c_0 = 5/6$.

Both methods yield the same result, $\hat{\mathbf{x}} = \begin{pmatrix} 5/6 \\ 3/2 \end{pmatrix}$. The normal equations were simpler for this small, well-behaved matrix. The QR approach is more computationally intensive by hand but is vastly superior for large, ill-conditioned matrices in real-world applications.

## Diagrams
This diagram illustrates the core geometric idea. The vector $\mathbf{b}$ does not lie in the plane representing the column space of $A$. The least squares method finds the projection $\mathbf{p}$ of $\mathbf{b}$ onto that plane. The error vector $\mathbf{e} = \mathbf{b} - \mathbf{p}$ is orthogonal to the plane.

```text
                 b
                 ^
                /|
               / |
              /  | e = b - p
             /   |
            /    v
           /-------------> p = A*x_hat
          / .          /
         / .          /
        / .          /   Col(A) plane
       / .          /
      /____________/
      |            |
      |----> a_1   |
      |            |
      v a_2        |
      Origin (0)
```

## Memory technique — remember this forever
1.  **The Story**: Imagine you are trying to hit a target on a wall ($\mathbf{b}$) with a laser that can only move along specific tracks embedded in the wall ($\text{Col}(A)$). You can't hit $\mathbf{b}$ directly. The "least squares" solution is to aim at the point on the wall ($\mathbf{p}$) that is *closest* to the target. How do you find it? You shine a light from $\mathbf{b}$ *perpendicularly* (orthogonally) onto the wall. The point where the light hits is your best shot. This perpendicular line is the error vector. "Normal" in "normal equations" means perpendicular.

2.  **Formulas to Overlearn**:
    - Normal Equations: $A^T A \hat{\mathbf{x}} = A^T \mathbf{b}$
    - QR Solution: $R \hat{\mathbf{x}} = Q^T \mathbf{b}$

3.  **Spaced Repetition Schedule**: Review the derivation and these formulas today, then in 1 day, 3 days, 7 days, 16 days, and 35 days. Do a fresh problem each time.

4.  **First Principles Pathway**: If you forget everything, rebuild it from the geometry.
    - Goal: Find $\hat{\mathbf{x}}$ that minimizes $\|\mathbf{b} - A\mathbf{x}\|$.
    - This minimum occurs when $A\hat{\mathbf{x}}$ is the projection of $\mathbf{b}$ onto $\text{Col}(A)$.
    - The error vector $\mathbf{e} = \mathbf{b} - A\hat{\mathbf{x}}$ must be orthogonal to $\text{Col}(A)$.
    - Therefore, $\mathbf{e}$ is orthogonal to every column of $A$.
    - Write this as $A^T(\mathbf{b} - A\hat{\mathbf{x}}) = \mathbf{0}$.
    - Expand: $A^T\mathbf{b} - A^TA\hat{\mathbf{x}} = \mathbf{0} \implies A^TA\hat{\mathbf{x}} = A^T\mathbf{b}$. You have re-derived the normal equations.

## Common mistakes
1.  **Trying to invert $A$**: Least squares is for non-square matrices $A$ (typically tall, $m>n$). Such a matrix has no two-sided inverse.
2.  **Calculating $(A^T A)^{-1}$ explicitly**: While formally $\hat{\mathbf{x}} = (A^T A)^{-1}A^T \mathbf{b}$, computing a matrix inverse is numerically unstable and slow. Always solve the system $(A^T A)\hat{\mathbf{x}} = A^T \mathbf{b}$ with Gaussian elimination.
3.  **Incorrectly simplifying the QR form**: A common mistake is to forget a transpose, e.g., writing $R\hat{\mathbf{x}} = Q\mathbf{b}$. Remember the derivation: substitute $A=QR$ into $A^TA\hat{\mathbf{x}}=A^T\mathbf{b}$ and simplify carefully.
4.  **Assuming columns of A are orthogonal**: The normal equations simplify to a diagonal system only if the columns of $A$ are orthogonal, in which case $A^TA$ is a diagonal matrix. This is rarely the case in practice; usually you must solve the full system.

## Self-check
1.  Find the least squares solution to the equation $\begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} x = \begin{pmatrix} 2 \\ 3 \\ 5 \end{pmatrix}$. What is the projection vector $\mathbf{p}$ and the error vector $\mathbf{e}$? Verify that $\mathbf{e}$ is orthogonal to the column space of the matrix.
2.  You want to fit a parabola of the form $y = c_0 + c_1 t + c_2 t^2$ to the data points $(-1, 0), (0, 1), (1, 3), (2, 4)$. Set up the matrices $A$, $\mathbf{x}$, and $\mathbf{b}$ for the corresponding least squares problem $A\mathbf{x}=\mathbf{b}$. Do not solve.
3.  Suppose you solve a least squares problem using the normal equations and get a solution $\hat{\mathbf{x}}_N$. You solve the same problem using the QR method and get $\hat{\mathbf{x}}_Q$. If your matrix $A$ has columns that are very close to being linearly dependent, which solution would you trust more and why? Explain in terms of the condition number.