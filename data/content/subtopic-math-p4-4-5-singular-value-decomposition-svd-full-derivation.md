## What it is
The Singular Value Decomposition (SVD) is a factorization of any real or complex matrix $A$ into the product of three other matrices: $A = U\Sigma V^T$. Here, $U$ and $V$ are orthogonal matrices (their columns are orthonormal vectors), and $\Sigma$ is a diagonal matrix of non-negative "singular values". Geometrically, it states that any linear transformation can be decomposed into a rotation ($V^T$), a scaling along perpendicular axes ($\Sigma$), and another rotation ($U$).

## Why it matters
SVD is the workhorse of numerical linear algebra and data analysis. In machine learning, it powers Principal Component Analysis (PCA) for dimensionality reduction. In physics and aerospace, it's used to solve ill-conditioned systems of linear equations that appear in control theory and structural analysis, providing stable solutions where other methods fail. It is also fundamental to image compression algorithms.

## When to study it
You must have a firm grasp of the following prerequisites. If you are weak on any of these, review them first.
- **Eigenvalues and Eigenvectors:** The entire derivation relies on them.
- **Spectral Theorem:** Specifically, that any real symmetric matrix has real eigenvalues and can be diagonalized by an orthogonal matrix of its eigenvectors.
- **Orthogonal Matrices:** Their properties, particularly $Q^T Q = I$ and that they represent rotations/reflections.
- **The Four Fundamental Subspaces:** Column space, null space, and their relationship to rank.
- **Gram-Schmidt Orthonormalization:** For completing bases.

## How to study it (step by step)
1.  **Start with the goal.** The goal is to find an orthonormal basis $\{v_1, ..., v_n\}$ for the domain $\mathbb{R}^n$ such that the set of image vectors $\{Av_1, ..., Av_n\}$ is an orthogonal set in the codomain $\mathbb{R}^m$.
2.  **Derive the role of $A^TA$.** Use the orthogonality condition from step 1: $(Av_i)^T (Av_j) = 0$ for $i \neq j$. Expand this to $v_i^T (A^T A) v_j = 0$. Realize this means the vectors $v_i$ must be orthogonal eigenvectors of the symmetric matrix $A^TA$.
3.  **Construct $V$ and $\Sigma$.** Since $A^TA$ is symmetric, we can find an orthonormal basis of eigenvectors $\{v_i\}$ and corresponding real eigenvalues $\lambda_i$. Define the singular values as $\sigma_i = \sqrt{\lambda_i}$ (we will prove $\lambda_i \ge 0$). Construct $V$ with columns $v_i$ and the diagonal matrix $\Sigma$ with entries $\sigma_i$, ordered from largest to smallest.
4.  **Construct $U$.** For the non-zero singular values, define the vectors $u_i = \frac{1}{\sigma_i} Av_i$. Prove that these vectors are orthonormal. These form the first columns of $U$. If necessary (if $m > \text{rank}(A)$), extend this set to a full orthonormal basis for $\mathbb{R}^m$ using Gram-Schmidt.
5.  **Assemble and verify.** Write down $A = U\Sigma V^T$ and verify it by multiplying it by a vector $v_j$: $U\Sigma V^T v_j = U\Sigma e_j = U (\sigma_j e_j) = \sigma_j u_j$. Compare this to the definition $Av_j = \sigma_j u_j$.
6.  **Solve a problem.** Take a non-square $3 \times 2$ matrix and compute its SVD by hand, following the construction from steps 2-4.

## Key ideas, with intuition
1.  **Any transformation maps some orthonormal basis to an orthogonal set.** This is not obvious, but it is the central insight. A general linear transformation $A$ might shear, stretch, and rotate in a complicated way. SVD tells us we can always find a special grid of perpendicular input vectors (the columns of $V$) that get mapped to another grid of perpendicular output vectors (the columns of $U$, scaled by $\sigma_i$). The entire complexity of the transformation is captured in this change of basis and scaling.

2.  **The matrix $A^TA$ reveals the input basis and scaling.** Why $A^TA$? Consider the length of a transformed vector $Av$: $\|Av\|^2 = (Av)^T(Av) = v^T A^T A v$. The symmetric matrix $A^TA$ encodes the "stretching" behavior of $A$. Its eigenvectors $v_i$ point in the directions of maximum/minimum stretch (the principal axes of the ellipse formed by transforming the unit sphere). Its eigenvalues $\lambda_i = \sigma_i^2$ are the squares of the stretch factors in those directions. This is why we start by diagonalizing $A^TA$.
    $$A^TA = (U\Sigma V^T)^T (U\Sigma V^T) = V\Sigma^T U^T U \Sigma V^T = V(\Sigma^T\Sigma)V^T$$
    This is the eigendecomposition of $A^TA$. The columns of $V$ are the eigenvectors, and the diagonal entries of $\Sigma^T\Sigma$ are the eigenvalues $\sigma_i^2$.

3.  **The decomposition is a geometric story.** Reading the formula $A x = U \Sigma V^T x$ from right to left tells the story of the transformation.
    -   $V^T x$: First, rotate the input vector $x$ into a new coordinate system defined by the basis vectors $\{v_i\}$.
    -   $\Sigma (V^T x)$: Second, scale the components in this new system by the singular values $\sigma_i$. This is a pure stretch/squash along the axes.
    -   $U (\Sigma V^T x)$: Third, rotate the scaled vector into the final coordinate system of the codomain, defined by the basis vectors $\{u_i\}$.

## Worked example
Let's find the SVD of $A = \begin{pmatrix} 3 & 2 & 2 \\ 2 & 3 & -2 \end{pmatrix}$. Here $A$ is a $2 \times 3$ matrix.

**Step 1: Compute $A^TA$.**
$$ A^TA = \begin{pmatrix} 3 & 2 \\ 2 & 3 \\ 2 & -2 \end{pmatrix} \begin{pmatrix} 3 & 2 & 2 \\ 2 & 3 & -2 \end{pmatrix} = \begin{pmatrix} 17 & 12 & 2 \\ 12 & 13 & -2 \\ 2 & -2 & 8 \end{pmatrix} $$

**Step 2: Find eigenvalues and eigenvectors of $A^TA$ to get $\Sigma$ and $V$.**
The characteristic equation is $\det(A^TA - \lambda I) = 0$. Solving this gives the eigenvalues:
$\lambda_1 = 25$, $\lambda_2 = 16$, $\lambda_3 = 0$.

The singular values are the square roots:
$\sigma_1 = \sqrt{25} = 5$, $\sigma_2 = \sqrt{16} = 4$, $\sigma_3 = \sqrt{0} = 0$.
So, the matrix $\Sigma$ (which must be $2 \times 3$ like $A$) is:
$$ \Sigma = \begin{pmatrix} 5 & 0 & 0 \\ 0 & 4 & 0 \end{pmatrix} $$

Now find the corresponding normalized eigenvectors for $A^TA$:
For $\lambda_1 = 25$, solving $(A^TA - 25I)x=0$ gives $v_1 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}$.
For $\lambda_2 = 16$, solving $(A^TA - 16I)x=0$ gives $v_2 = \frac{1}{\sqrt{18}}\begin{pmatrix} 1 \\ -1 \\ 4 \end{pmatrix}$.
For $\lambda_3 = 0$, solving $(A^TA - 0I)x=0$ gives $v_3 = \frac{1}{3}\begin{pmatrix} -2 \\ 2 \\ 1 \end{pmatrix}$.

These vectors form the columns of $V$:
$$ V = \begin{pmatrix} 1/\sqrt{2} & 1/\sqrt{18} & -2/3 \\ 1/\sqrt{2} & -1/\sqrt{18} & 2/3 \\ 0 & 4/\sqrt{18} & 1/3 \end{pmatrix} $$

**Step 3: Construct $U$.**
The columns of $U$ are given by $u_i = \frac{1}{\sigma_i} Av_i$ for non-zero $\sigma_i$.
$u_1 = \frac{1}{\sigma_1} A v_1 = \frac{1}{5} \begin{pmatrix} 3 & 2 & 2 \\ 2 & 3 & -2 \end{pmatrix} \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix} = \frac{1}{5\sqrt{2}} \begin{pmatrix} 5 \\ 5 \end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$.
$u_2 = \frac{1}{\sigma_2} A v_2 = \frac{1}{4} \begin{pmatrix} 3 & 2 & 2 \\ 2 & 3 & -2 \end{pmatrix} \frac{1}{\sqrt{18}}\begin{pmatrix} 1 \\ -1 \\ 4 \end{pmatrix} = \frac{1}{4\sqrt{18}} \begin{pmatrix} 9 \\ -9 \end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix}$.
Since $A$ is $2 \times 3$, $U$ must be $2 \times 2$. We have found two orthonormal vectors, $u_1$ and $u_2$, which form a basis for $\mathbb{R}^2$.
$$ U = \begin{pmatrix} 1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & -1/\sqrt{2} \end{pmatrix} $$

**Final Result:**
$A = U\Sigma V^T$
$$ \begin{pmatrix} 3 & 2 & 2 \\ 2 & 3 & -2 \end{pmatrix} = \begin{pmatrix} 1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & -1/\sqrt{2} \end{pmatrix} \begin{pmatrix} 5 & 0 & 0 \\ 0 & 4 & 0 \end{pmatrix} \begin{pmatrix} 1/\sqrt{2} & 1/\sqrt{2} & 0 \\ 1/\sqrt{18} & -1/\sqrt{18} & 4/\sqrt{18} \\ -2/3 & 2/3 & 1/3 \end{pmatrix} $$

**Reflection:** The procedure was mechanical but followed a clear logic. We found the special input directions ($V$) and stretch factors ($\Sigma$) from $A^TA$. We then found the corresponding output directions ($U$) by applying $A$ to the input directions and normalizing.

## Diagrams
This diagram shows the geometric action of a $2 \times 2$ matrix $A$ on the unit circle. The vectors $v_1, v_2$ are the orthonormal eigenvectors of $A^TA$. The matrix $A$ transforms them into the orthogonal vectors $Av_1 = \sigma_1 u_1$ and $Av_2 = \sigma_2 u_2$, which define the major and minor axes of the resulting ellipse.

```text
        Domain (Input Space)                      Codomain (Output Space)

              y                                           y
              ^                                           ^
              |         /                                 |      .---.
              |       v2                                  |    /       \
              |      /                                    |   /         \ Av2=sigma2*u2
              |     /                                     |  /           /
              |    +-----> v1                             | +-----------> Av1=sigma1*u1
              |   /| \                                    |/             \
              |  / |  \                                   / \             /
              | /  |   \                                 /   `-----------'
     <--------+----------------> x                     <------------------------> x
              |                                         |
              |                                         |
              |                                         |
              v                                         v

       Unit circle and the basis {v1, v2}       Ellipse and the orthogonal vectors {Av1, Av2}
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of SVD as "Separating Vital Directions". A messy transformation $A$ is separated into its vital components: an initial alignment ($V^T$), a pure stretch ($\Sigma$), and a final orientation ($U$). Remember the formula $A = U\Sigma V^T$ as "**U**ltimate **S**caling **V**ision".

2.  **Must-learn formulas:** You must overlearn these three equations. They are the algebraic heart of SVD.
    $$ A = U\Sigma V^T $$
    $$ A^TA = V(\Sigma^T\Sigma)V^T \quad (\text{This gives you } V \text{ and } \Sigma^2) $$
    $$ AA^T = U(\Sigma\Sigma^T)U^T \quad (\text{This gives you } U \text{ and } \Sigma^2) $$

3.  **Spaced repetition schedule:** Review your derivation and the worked example at these intervals:
    -   24 hours
    -   3 days
    -   7 days
    -   16 days
    -   35 days
    Each time, try to re-derive the result from scratch before checking your notes.

4.  **First principles pathway:** If you forget everything, rebuild it from this single question: "Can I find an orthonormal basis $\{v_i\}$ in the domain such that the image vectors $\{Av_i\}$ are orthogonal?"
    -   Write the condition: $(Av_i)^T(Av_j) = 0$ for $i \neq j$.
    -   Rewrite it: $v_i^T(A^TA)v_j = 0$.
    -   This is the definition of an orthogonal basis of eigenvectors for the matrix $A^TA$.
    -   The rest follows: the $v_i$ are eigenvectors of $A^TA$, the eigenvalues of $A^TA$ are $\sigma_i^2$, and $u_i$ are the normalized directions of $Av_i$.

## Common mistakes
1.  **Mixing up $U$ and $V$.** $V$ contains the orthonormal basis for the *domain* ($\mathbb{R}^n$). $U$ contains the orthonormal basis for the *codomain* ($\mathbb{R}^m$). Remember $A: \mathbb{R}^n \to \mathbb{R}^m$, so $V$ is $n \times n$ and $U$ is $m \times m$.
2.  **Forgetting the square root.** The eigenvalues of $A^TA$ are $\lambda_i = \sigma_i^2$. The singular values $\sigma_i$ that go into $\Sigma$ are the square roots of these eigenvalues.
3.  **Incorrect ordering.** The singular values in $\Sigma$ must be ordered, typically from largest to smallest. The columns of $U$ and $V$ must be ordered to correspond to the same singular values. $v_1$ corresponds to $\sigma_1$, which corresponds to $u_1$.
4.  **Dimension errors in $\Sigma$.** For a non-square $m \times n$ matrix $A$, the matrix $\Sigma$ must also have dimensions $m \times n$. It will have the singular values on its main diagonal and be padded with zeros elsewhere.

## Self-check
1.  Find the SVD of the matrix $A = \begin{pmatrix} 3 & 0 \\ 0 & -2 \end{pmatrix}$. What is the relationship between the SVD and the eigendecomposition for a symmetric matrix?
2.  Calculate the SVD of the matrix $B = \begin{pmatrix} 1 & 1 & 0 \\ 0 & 1 & 1 \end{pmatrix}$.
3.  Let $A$ be an $m \times n$ matrix with rank $r$. How many non-zero singular values will it have? How does this relate the column space of $A$ to the columns of $U$, and the row space of $A$ to the columns of $V$?