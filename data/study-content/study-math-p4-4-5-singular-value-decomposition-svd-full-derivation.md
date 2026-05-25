## 1. What it is — in plain English

Imagine you have a blob of play-doh, and you want to understand how it behaves when you squish or stretch it. This blob represents a mathematical matrix, and the squishing/stretching is what the matrix *does* to things.

Singular Value Decomposition (SVD) is like a special way to break down any squishing/stretching action into three much simpler, fundamental steps. First, you just rotate the blob (no stretching). Then, you stretch or shrink it along its main axes (like stretching it more in one direction than another). Finally, you rotate it again.

So, SVD tells us: "Any complex transformation (matrix) can be thought of as a simple rotation, followed by a pure scaling (stretching/shrinking along specific directions), followed by another simple rotation." It's like taking a complicated dance move and realizing it's just a spin, a stretch, and another spin.

The "singular values" tell you *how much* the blob is stretched or shrunk in those specific directions. The "singular vectors" tell you *what those specific directions are* – both the input directions before stretching and the output directions after stretching.

## 2. Why it matters — real-world applications

SVD is one of the most powerful and widely used tools in linear algebra, finding applications across countless fields:

1.  **Image Compression (e.g., JPEG, facial recognition):** Imagine an image as a giant matrix of pixel values. SVD allows you to approximate this matrix using only a few of its largest singular values and corresponding vectors. This means you can store a much smaller amount of data while still retaining most of the visual information, leading to smaller file sizes (like in JPEG compression). For facial recognition, SVD can extract the "eigenfaces" (principal components) that characterize human faces, allowing efficient comparison and identification.

2.  **Recommender Systems (e.g., Netflix, Amazon):** When Netflix suggests movies you might like, or Amazon recommends products, SVD is often working behind the scenes. User-item interaction data (e.g., ratings) can be represented as a large, sparse matrix. SVD can decompose this matrix to uncover "latent factors" or hidden preferences that explain user choices. For example, it might discover that certain users like "sci-fi action" and "dark humor," even if those categories aren't explicitly labeled. By reducing the dimensionality with SVD, these systems can predict missing ratings and make accurate recommendations.

3.  **Principal Component Analysis (PCA) and Dimensionality Reduction (Machine Learning, Genetics, Finance):** In many fields, data comes with hundreds or thousands of features (dimensions). PCA, which is fundamentally based on SVD, helps reduce this complexity by finding the most important "principal components" – new, uncorrelated dimensions that capture most of the data's variance. For instance, in genetics, SVD can reduce high-dimensional gene expression data to a few components that reveal underlying biological processes. In finance, it can identify key factors driving stock movements.

4.  **Natural Language Processing (NLP) — Latent Semantic Analysis (LSA):** When analyzing large collections of text documents, SVD can be used to discover the underlying "topics" or "concepts" within the documents. A document-term matrix (where rows are documents and columns are words) is decomposed using SVD. The resulting singular vectors can represent semantic concepts, allowing systems to understand the meaning of documents and queries beyond just keyword matching. This helps in information retrieval, document clustering, and text summarization.

5.  **Control Systems and Robotics:** SVD provides insights into the "controllability" and "observability" of dynamic systems. It helps engineers understand how effectively they can influence a system (e.g., a robot arm) and how well they can measure its internal states. The singular values can indicate the system's sensitivity to inputs and its robustness to noise, which is crucial for designing stable and efficient control algorithms.

## 3. Prerequisites — what you must know first

Before diving into SVD, ensure you have a solid grasp of these fundamental linear algebra concepts:

*   **Vectors and Matrices:** Basic operations (addition, scalar multiplication, matrix multiplication), dimensions, transpose ($A^T$).
*   **Linear Transformations:** Understanding how a matrix transforms vectors, mapping from one vector space to another.
*   **Vector Spaces and Subspaces:** Column space, null space, row space, and their dimensions.
*   **Basis and Orthonormal Basis:** A set of linearly independent vectors that span a space, and specifically, a basis where all vectors are unit length and orthogonal to each other.
*   **Dot Product and Norms:** How to calculate the dot product of two vectors ($u \cdot v = u^T v$) and the length (Euclidean norm) of a vector ($\|v\| = \sqrt{v^T v}$).
*   **Eigenvalues and Eigenvectors:** For a square matrix $A$, a non-zero vector $v$ such that $Av = \lambda v$, where $\lambda$ is a scalar. Understanding their geometric meaning (directions that are only scaled, not rotated).
*   **Diagonalization of a Matrix:** Expressing a square matrix $A$ as $PDP^{-1}$, where $D$ is a diagonal matrix of eigenvalues and $P$ is a matrix of eigenvectors.
*   **Symmetric Matrices:** A square matrix $A$ where $A^T = A$. Key property: they always have real eigenvalues and a complete set of orthogonal eigenvectors.
*   **Orthogonal Matrices:** A square matrix $Q$ whose columns (and rows) form an orthonormal set. Key property: $Q^T Q = I$ (identity matrix), so $Q^{-1} = Q^T$. These matrices represent pure rotations or reflections.
*   **Positive Semidefinite Matrices:** A symmetric matrix $A$ such that $x^T A x \ge 0$ for all non-zero vectors $x$. Key property: all eigenvalues are non-negative. $A^T A$ is always symmetric positive semidefinite.

## 4. The core idea — step by step

Let's derive the Singular Value Decomposition for an $m \times n$ matrix $A$. The goal is to express $A$ in the form $A = U \Sigma V^T$.

### Step 1: The Goal – Decomposing a Linear Transformation

**Plain English:** We want to show that any matrix $A$ (which represents a linear transformation) can be broken down into three simpler transformations: a rotation ($V^T$), a scaling along coordinate axes ($\Sigma$), and another rotation ($U$). Imagine applying $A$ to a unit sphere in $\mathbb{R}^n$. The result is always an ellipse (or an ellipsoid in higher dimensions). SVD helps us find the principal axes of this ellipse.

**Small Concrete Example:** Consider a $2 \times 2$ matrix $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$. If we apply this matrix to the unit circle (all vectors $x$ with $\|x\|=1$), it transforms the circle into an ellipse. SVD will tell us the directions of the major and minor axes of this ellipse, and how long they are.

**Formal/Mathematical Version:** We aim to find three matrices:
*   $U$: an $m \times m$ orthogonal matrix (columns are orthonormal vectors in $\mathbb{R}^m$).
*   $\Sigma$: an $m \times n$ "diagonal" matrix with non-negative real numbers (singular values) on the main diagonal, ordered from largest to smallest.
*   $V$: an $n \times n$ orthogonal matrix (columns are orthonormal vectors in $\mathbb{R}^n$).
Such that $A = U \Sigma V^T$.

**What could go wrong:** It's easy to get confused about the dimensions of $U$, $\Sigma$, and $V^T$, especially for non-square matrices $A$. Remember $A$ is $m \times n$, $U$ is $m \times m$, $\Sigma$ is $m \times n$, and $V^T$ is $n \times n$.

### Step 2: Focusing on $A^T A$ for Symmetric Properties

**Plain English:** A general matrix $A$ might not be square or symmetric, so we can't directly diagonalize it using eigenvectors in the usual way ($A = PDP^{-1}$). However, the matrix $A^T A$ (and $A A^T$) is *always* square, symmetric, and positive semidefinite. Symmetric matrices are wonderful because they can *always* be diagonalized by an orthogonal matrix, and their eigenvalues are real and non-negative (for positive semidefinite matrices). This gives us a foothold.

**Small Concrete Example:** Let $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix}$. This is a $3 \times 2$ matrix.
$A^T A = \begin{pmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix} = \begin{pmatrix} 1+0+1 & 1+0+0 \\ 1+0+0 & 1+1+0 \end{pmatrix} = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$.
Notice that $A^T A$ is indeed symmetric.

**Formal/Mathematical Version:**
Consider the matrix $A^T A$.
1.  **It's square:** If $A$ is $m \times n$, then $A^T$ is $n \times m$, so $A^T A$ is $n \times n$.
2.  **It's symmetric:** $(A^T A)^T = A^T (A^T)^T = A^T A$.
3.  **It's positive semidefinite:** For any vector $x \in \mathbb{R}^n$, $x^T (A^T A) x = (Ax)^T (Ax) = \|Ax\|^2 \ge 0$.
Since $A^T A$ is symmetric, it has $n$ real eigenvalues and $n$ orthogonal eigenvectors. Since it's positive semidefinite, all its eigenvalues are non-negative.

**What could go wrong:** Accidentally calculating $A A^T$ instead of $A^T A$. While $A A^T$ is also symmetric and positive semidefinite, it will have different dimensions ($m \times m$) and its eigenvectors will form the columns of $U$ instead of $V$. For the standard derivation, we start with $A^T A$ to define $V$.

### Step 3: Eigenvectors of $A^T A$ form an Orthonormal Basis for the Domain ($V$)

**Plain English:** The eigenvectors of $A^T A$ are special directions in the input space ($\mathbb{R}^n$). When we apply $A$ to vectors along these directions, they get transformed in a very structured way. Because $A^T A$ is symmetric, we can find an orthonormal basis of eigenvectors for $\mathbb{R}^n$. These eigenvectors will become the columns of our matrix $V$. We'll order them according to their corresponding eigenvalues (largest to smallest).

**Small Concrete Example:** For $A^T A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$ from Step 2:
Characteristic equation: $\det(A^T A - \lambda I) = \det \begin{pmatrix} 2-\lambda & 1 \\ 1 & 2-\lambda \end{pmatrix} = (2-\lambda)^2 - 1 = 0$.
$(2-\lambda)^2 = 1 \implies 2-\lambda = \pm 1$.
$\lambda_1 = 2-1 = 1$, $\lambda_2 = 2+1 = 3$. (Wait, I should order them largest to smallest for SVD convention).
So, $\lambda_1 = 3$, $\lambda_2 = 1$.

For $\lambda_1 = 3$: $(A^T A - 3I)v = \begin{pmatrix} -1 & 1 \\ 1 & -1 \end{pmatrix} v = 0 \implies v_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$. Normalized: $\frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$.
For $\lambda_2 = 1$: $(A^T A - 1I)v = \begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix} v = 0 \implies v_2 = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$. Normalized: $\frac{1}{\sqrt{2}}\begin{pmatrix} -1 \\ 1 \end{pmatrix}$.
These normalized eigenvectors will form the columns of $V$. So, $V = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix}$.

**Formal/Mathematical Version:**
Let $v_1, v_2, \dots, v_n$ be an orthonormal basis of eigenvectors for $A^T A$, corresponding to eigenvalues $\lambda_1 \ge \lambda_2 \ge \dots \ge \lambda_n \ge 0$.
Form the matrix $V = [v_1 \ v_2 \ \dots \ v_n]$. Since the eigenvectors are orthonormal, $V$ is an orthogonal matrix, meaning $V^T V = I$ and $V^{-1} = V^T$.

**What could go wrong:** Forgetting to normalize the eigenvectors. Not ordering the eigenvalues (and thus eigenvectors) from largest to smallest. Incorrectly calculating eigenvectors.

### Step 4: Eigenvalues of $A^T A$ Relate to Singular Values ($\sigma_i^2 = \lambda_i$)

**Plain English:** The eigenvalues $\lambda_i$ of $A^T A$ tell us about the "strength" of the transformation along the directions defined by $v_i$. Specifically, the length of the vector $A v_i$ is directly related to $\lambda_i$. We define the "singular values" $\sigma_i$ as the square roots of these eigenvalues. These $\sigma_i$ are the actual scaling factors.

**Small Concrete Example:** From Step 3, we found eigenvalues $\lambda_1 = 3$ and $\lambda_2 = 1$.
The singular values are $\sigma_1 = \sqrt{\lambda_1} = \sqrt{3}$ and $\sigma_2 = \sqrt{\lambda_2} = \sqrt{1} = 1$.
These are the lengths of the principal axes of the ellipse formed by $A$ acting on the unit circle.

**Formal/Mathematical Version:**
For any eigenvector $v_i$ of $A^T A$ with eigenvalue $\lambda_i$:
$\|A v_i\|^2 = (A v_i)^T (A v_i) = v_i^T A^T A v_i$.
Since $A^T A v_i = \lambda_i v_i$, we substitute:
$v_i^T A^T A v_i = v_i^T (\lambda_i v_i) = \lambda_i (v_i^T v_i) = \lambda_i \|v_i\|^2$.
Since $v_i$ are orthonormal, $\|v_i\|=1$, so $\|A v_i\|^2 = \lambda_i$.
Therefore, $\|A v_i\| = \sqrt{\lambda_i}$.
We define the singular values $\sigma_i = \sqrt{\lambda_i}$. By convention, they are ordered $\sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_n \ge 0$.
The number of non-zero singular values is equal to the rank of $A$. Let $r$ be the rank of $A$. Then $\sigma_1 \ge \dots \ge \sigma_r > 0$ and $\sigma_{r+1} = \dots = \sigma_n = 0$.

**What could go wrong:** Forgetting to take the square root. Confusing eigenvalues with singular values. Trying to take the square root of a negative eigenvalue (which won't happen for $A^T A$).

### Step 5: Constructing $\Sigma$ (the Scaling Matrix)

**Plain English:** Now we take our ordered singular values and place them on the main diagonal of a new matrix, $\Sigma$. This matrix will have the same dimensions as $A$ ($m \times n$). If $A$ is rectangular, $\Sigma$ will have zeros padding it to match the dimensions. This matrix represents the pure stretching/shrinking step.

**Small Concrete Example:** For $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix}$ ($3 \times 2$), we found $\sigma_1 = \sqrt{3}$ and $\sigma_2 = 1$.
Since $A$ is $3 \times 2$, $\Sigma$ must also be $3 \times 2$.
$\Sigma = \begin{pmatrix} \sigma_1 & 0 \\ 0 & \sigma_2 \\ 0 & 0 \end{pmatrix} = \begin{pmatrix} \sqrt{3} & 0 \\ 0 & 1 \\ 0 & 0 \end{pmatrix}$.

**Formal/Mathematical Version:**
The matrix $\Sigma$ is an $m \times n$ diagonal matrix where the diagonal entries are the singular values $\sigma_i$, ordered from largest to smallest.
$$
\Sigma = \begin{pmatrix}
\sigma_1 & 0 & \dots & 0 & \dots & 0 \\
0 & \sigma_2 & \dots & 0 & \dots & 0 \\
\vdots & \vdots & \ddots & \vdots & & \vdots \\
0 & 0 & \dots & \sigma_r & \dots & 0 \\
\vdots & \vdots & & \vdots & \ddots & \vdots \\
0 & 0 & \dots & 0 & \dots & 0
\end{pmatrix}
$$
where $r = \text{rank}(A)$ is the number of non-zero singular values. The remaining diagonal entries (if any) are zero, and any off-diagonal entries are also zero.

**What could go wrong:** Incorrectly setting the dimensions of $\Sigma$. Not ordering the singular values.

### Step 6: Constructing $U$ (the Output Rotation Matrix)

**Plain English:** We've found the input directions ($v_i$) and the scaling factors ($\sigma_i$). Now we need the output directions. When $A$ transforms an eigenvector $v_i$, the resulting vector $A v_i$ has length $\sigma_i$. If $\sigma_i \ne 0$, we can normalize $A v_i$ to get a unit vector, which we'll call $u_i$. These $u_i$ vectors form an orthonormal set in the output space ($\mathbb{R}^m$). If $A$ is rank-deficient or $m > n$, we might not have enough $u_i$ vectors to span $\mathbb{R}^m$, so we need to find additional orthonormal vectors to complete the basis for $U$.

**Small Concrete Example:** For $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix}$, $v_1 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$, $v_2 = \frac{1}{\sqrt{2}}\begin{pmatrix} -1 \\ 1 \end{pmatrix}$, $\sigma_1 = \sqrt{3}$, $\sigma_2 = 1$.
Calculate $A v_1$: $A v_1 = \begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix} \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix} 2 \\ 1 \\ 1 \end{pmatrix}$.
Normalize it to get $u_1$: $u_1 = \frac{1}{\sigma_1} A v_1 = \frac{1}{\sqrt{3}} \frac{1}{\sqrt{2}}\begin{pmatrix} 2 \\ 1 \\ 1 \end{pmatrix} = \frac{1}{\sqrt{6}}\begin{pmatrix} 2 \\ 1 \\ 1 \end{pmatrix}$.
Calculate $A v_2$: $A v_2 = \begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix} \frac{1}{\sqrt{2}}\begin{pmatrix} -1 \\ 1 \end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix} 0 \\ 1 \\ -1 \end{pmatrix}$.
Normalize it to get $u_2$: $u_2 = \frac{1}{\sigma_2} A v_2 = \frac{1}{1} \frac{1}{\sqrt{2}}\begin{pmatrix} 0 \\ 1 \\ -1 \end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix} 0 \\ 1 \\ -1 \end{pmatrix}$.
These $u_1, u_2$ are orthonormal. Since $A$ is $3 \times 2$, $U$ must be $3 \times 3$. We need a third vector $u_3$ that is orthogonal to $u_1$ and $u_2$. We can find this using the null space of $A^T$ or by Gram-Schmidt on a basis including $u_1, u_2$.
For example, find a vector $x = (x_1, x_2, x_3)$ such that $u_1 \cdot x = 0$ and $u_2 \cdot x = 0$.
$\frac{1}{\sqrt{6}}(2x_1+x_2+x_3) = 0 \implies 2x_1+x_2+x_3=0$
$\frac{1}{\sqrt{2}}(x_2-x_3) = 0 \implies x_2=x_3$
Substituting $x_2=x_3$ into the first equation: $2x_1+x_2+x_2=0 \implies 2x_1+2x_2=0 \implies x_1=-x_2$.
Let $x_2=1$, then $x_1=-1$, $x_3=1$. So $x = \begin{pmatrix} -1 \\ 1 \\ 1 \end{pmatrix}$.
Normalize $x$: $u_3 = \frac{1}{\sqrt{3}}\begin{pmatrix} -1 \\ 1 \\ 1 \end{pmatrix}$.
Then $U = \begin{pmatrix} u_1 & u_2 & u_3 \end{pmatrix} = \begin{pmatrix} 2/\sqrt{6} & 0 & -1/\sqrt{3} \\ 1/\sqrt{6} & 1/\sqrt{2} & 1/\sqrt{3} \\ 1/\sqrt{6} & -1/\sqrt{2} & 1/\sqrt{3} \end{pmatrix}$.

**Formal/Mathematical Version:**
We have $A V = U \Sigma$. This implies $A v_i = \sigma_i u_i$ for each column $v_i$ of $V$ and column $u_i$ of $U$.
For $i=1, \dots, r$ (where $r$ is the rank of $A$ and $\sigma_i > 0$):
Define $u_i = \frac{1}{\sigma_i} A v_i$.
These $u_i$ vectors are orthonormal:
$u_i^T u_j = \left(\frac{1}{\sigma_i} A v_i\right)^T \left(\frac{1}{\sigma_j} A v_j\right) = \frac{1}{\sigma_i \sigma_j} v_i^T A^T A v_j = \frac{1}{\sigma_i \sigma_j} v_i^T (\lambda_j v_j) = \frac{\lambda_j}{\sigma_i \sigma_j} v_i^T v_j$.
If $i \ne j$, then $v_i^T v_j = 0$, so $u_i^T u_j = 0$.
If $i = j$, then $v_i^T v_i = 1$, so $u_i^T u_i = \frac{\lambda_i}{\sigma_i^2} = \frac{\sigma_i^2}{\sigma_i^2} = 1$.
So, $u_1, \dots, u_r$ form an orthonormal set.
If $r < m$, we need to find $m-r$ additional orthonormal vectors $u_{r+1}, \dots, u_m$ that are orthogonal to $u_1, \dots, u_r$. These vectors span the null space of $A^T$. We can find them using Gram-Schmidt process or by finding a basis for $\text{Null}(A^T)$.
Finally, form $U = [u_1 \ u_2 \ \dots \ u_m]$. $U$ is an $m \times m$ orthogonal matrix.

**What could go wrong:** Forgetting to normalize $A v_i$. Not extending the set of $u_i$ to a full orthonormal basis for $\mathbb{R}^m$ when $r < m$. Algebraic errors in finding the additional vectors.

### Step 7: Putting it all together: $A = U \Sigma V^T$

**Plain English:** We've found all three pieces: $U$, $\Sigma$, and $V$. Now we just assemble them. We started by defining $u_i = \frac{1}{\sigma_i} A v_i$, which means $A v_i = \sigma_i u_i$. This is the crucial relationship. We can write this in matrix form.

**Formal/Mathematical Version:**
We have $A v_i = \sigma_i u_i$.
Consider the matrix product $A V$:
$A V = A [v_1 \ v_2 \ \dots \ v_n] = [A v_1 \ A v_2 \ \dots \ A v_n]$.
Substitute $A v_i = \sigma_i u_i$:
$A V = [\sigma_1 u_1 \ \sigma_2 u_2 \ \dots \ \sigma_n u_n]$.
Now consider $U \Sigma$:
$U \Sigma = [u_1 \ u_2 \ \dots \ u_m] \begin{pmatrix}
\sigma_1 & 0 & \dots & 0 \\
0 & \sigma_2 & \dots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \dots & \sigma_n \\
\vdots & \vdots & & \vdots \\
0 & 0 & \dots & 0
\end{pmatrix}_{m \times n}$.
(Note: $\sigma_i$ for $i > n$ are effectively zero or non-existent in this context, and for $i > r$ are zero. The $\Sigma$ matrix has $n$ columns, so we only consider $\sigma_1$ to $\sigma_n$. If $m>n$, the bottom rows of $\Sigma$ are all zeros. If $n>m$, the right columns of $\Sigma$ are all zeros.)
The product $U \Sigma$ is indeed $[\sigma_1 u_1 \ \sigma_2 u_2 \ \dots \ \sigma_n u_n]$.
So, $A V = U \Sigma$.
Since $V$ is an orthogonal matrix, $V V^T = I$. Multiplying by $V^T$ on the right:
$A V V^T = U \Sigma V^T$.
$A I = U \Sigma V^T$.
$A = U \Sigma V^T$.
This completes the derivation.

**What could go wrong:** Algebraic errors in verifying $A V = U \Sigma$. Misunderstanding why $V V^T = I$ is useful.

## 5. Worked examples — multiple, with every step shown

### Example 1: Square, Full Rank Matrix

**Problem:** Find the SVD of the matrix $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$.

**Given:** Matrix $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$.
**Want:** $U, \Sigma, V^T$ such that $A = U \Sigma V^T$.

**Step 1: Calculate $A^T A$.**
$A^T = \begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix}$
$A^T A = \begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 1 \cdot 1 + 0 \cdot 0 & 1 \cdot 1 + 0 \cdot 1 \\ 1 \cdot 1 + 1 \cdot 0 & 1 \cdot 1 + 1 \cdot 1 \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix}$.
*Explanation:* We compute $A^T A$ because it's always a symmetric matrix, which simplifies finding eigenvalues and eigenvectors.

**Step 2: Find eigenvalues $\lambda_i$ of $A^T A$.**
The characteristic equation is $\det(A^T A - \lambda I) = 0$.
$$
\det \begin{pmatrix} 1-\lambda & 1 \\ 1 & 2-\lambda \end{pmatrix} = (1-\lambda)(2-\lambda) - 1 \cdot 1 = 0
$$
$$
2 - \lambda - 2\lambda + \lambda^2 - 1 = 0
$$
$$
\lambda^2 - 3\lambda + 1 = 0
$$
Using the quadratic formula $\lambda = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$:
$$
\lambda = \frac{3 \pm \sqrt{(-3)^2 - 4(1)(1)}}{2(1)} = \frac{3 \pm \sqrt{9 - 4}}{2} = \frac{3 \pm \sqrt{5}}{2}
$$
Let's order them from largest to smallest:
$\lambda_1 = \frac{3 + \sqrt{5}}{2}$
$\lambda_2 = \frac{3 - \sqrt{5}}{2}$
*Explanation:* We find the eigenvalues of $A^T A$. These will be used to determine the singular values. We order them because SVD convention requires singular values to be ordered descendingly.

**Step 3: Find eigenvectors $v_i$ of $A^T A$, normalize, and form $V$.**

For $\lambda_1 = \frac{3 + \sqrt{5}}{2}$:
Solve $(A^T A - \lambda_1 I)v_1 = 0$.
$$
\begin{pmatrix} 1 - \frac{3+\sqrt{5}}{2} & 1 \\ 1 & 2 - \frac{3+\sqrt{5}}{2} \end{pmatrix} v_1 = \begin{pmatrix} \frac{2-3-\sqrt{5}}{2} & 1 \\ 1 & \frac{4-3-\sqrt{5}}{2} \end{pmatrix} v_1 = \begin{pmatrix} \frac{-1-\sqrt{5}}{2} & 1 \\ 1 & \frac{1-\sqrt{5}}{2} \end{pmatrix} v_1 = 0
$$
From the first row: $\left(\frac{-1-\sqrt{5}}{2}\right) v_{1,x} + v_{1,y} = 0 \implies v_{1,y} = \left(\frac{1+\sqrt{5}}{2}\right) v_{1,x}$.
Let $v_{1,x} = 1$, then $v_{1,y} = \frac{1+\sqrt{5}}{2}$.
So, $v_1 = \begin{pmatrix} 1 \\ \frac{1+\sqrt{5}}{2} \end{pmatrix}$.
Normalize $v_1$: $\|v_1\|^2 = 1^2 + \left(\frac{1+\sqrt{5}}{2}\right)^2 = 1 + \frac{1+2\sqrt{5}+5}{4} = 1 + \frac{6+2\sqrt{5}}{4} = 1 + \frac{3+\sqrt{5}}{2} = \frac{2+3+\sqrt{5}}{2} = \frac{5+\sqrt{5}}{2}$.
So, $\|v_1\| = \sqrt{\frac{5+\sqrt{5}}{2}}$.
$v_1 = \frac{1}{\sqrt{\frac{5+\sqrt{5}}{2}}} \begin{pmatrix} 1 \\ \frac{1+\sqrt{5}}{2} \end{pmatrix}$.

For $\lambda_2 = \frac{3 - \sqrt{5}}{2}$:
Solve $(A^T A - \lambda_2 I)v_2 = 0$.
$$
\begin{pmatrix} 1 - \frac{3-\sqrt{5}}{2} & 1 \\ 1 & 2 - \frac{3-\sqrt{5}}{2} \end{pmatrix} v_2 = \begin{pmatrix} \frac{2-3+\sqrt{5}}{2} & 1 \\ 1 & \frac{4-3+\sqrt{5}}{2} \end{pmatrix} v_2 = \begin{pmatrix} \frac{-1+\sqrt{5}}{2} & 1 \\ 1 & \frac{1+\sqrt{5}}{2} \end{pmatrix} v_2 = 0
$$
From the first row: $\left(\frac{-1+\sqrt{5}}{2}\right) v_{2,x} + v_{2,y} = 0 \implies v_{2,y} = \left(\frac{1-\sqrt{5}}{2}\right) v_{2,x}$.
Let $v_{2,x} = 1$, then $v_{2,y} = \frac{1-\sqrt{5}}{2}$.
So, $v_2 = \begin{pmatrix} 1 \\ \frac{1-\sqrt{5}}{2} \end{pmatrix}$.
Normalize $v_2$: $\|v_2\|^2 = 1^2 + \left(\frac{1-\sqrt{5}}{2}\right)^2 = 1 + \frac{1-2\sqrt{5}+5}{4} = 1 + \frac{6-2\sqrt{5}}{4} = 1 + \frac{3-\sqrt{5}}{2} = \frac{2+3-\sqrt{5}}{2} = \frac{5-\sqrt{5}}{2}$.
So, $\|v_2\| = \sqrt{\frac{5-\sqrt{5}}{2}}$.
$v_2 = \frac{1}{\sqrt{\frac{5-\sqrt{5}}{2}}} \begin{pmatrix} 1 \\ \frac{1-\sqrt{5}}{2} \end{pmatrix}$.

Form $V = [v_1 \ v_2]$.
$$
V = \begin{pmatrix}
\frac{1}{\sqrt{\frac{5+\sqrt{5}}{2}}} & \frac{1}{\sqrt{\frac{5-\sqrt{5}}{2}}} \\
\frac{(1+\sqrt{5})/2}{\sqrt{\frac{5+\sqrt{5}}{2}}} & \frac{(1-\sqrt{5})/2}{\sqrt{\frac{5-\sqrt{5}}{2}}}
\end{pmatrix}
$$
And $V^T$ is its transpose.
*Explanation:* We find the eigenvectors corresponding to each eigenvalue. These eigenvectors are the principal directions in the input space. We normalize them to unit length to form the columns of the orthogonal matrix $V$.

**Step 4: Calculate singular values $\sigma_i = \sqrt{\lambda_i}$, and form $\Sigma$.**
$\sigma_1 = \sqrt{\lambda_1} = \sqrt{\frac{3 + \sqrt{5}}{2}}$
$\sigma_2 = \sqrt{\lambda_2} = \sqrt{\frac{3 - \sqrt{5}}{2}}$
Since $A$ is $2 \times 2$, $\Sigma$ will also be $2 \times 2$.
$$
\Sigma = \begin{pmatrix} \sigma_1 & 0 \\ 0 & \sigma_2 \end{pmatrix} = \begin{pmatrix} \sqrt{\frac{3 + \sqrt{5}}{2}} & 0 \\ 0 & \sqrt{\frac{3 - \sqrt{5}}{2}} \end{pmatrix}
$$
*Explanation:* Singular values are the square roots of the eigenvalues of $A^T A$. They represent the scaling factors. $\Sigma$ is a diagonal matrix containing these singular values.

**Step 5: Calculate $u_i = \frac{1}{\sigma_i} A v_i$ for non-zero $\sigma_i$, and form $U$.**

For $u_1$:
$A v_1 = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} \frac{1}{\sqrt{\frac{5+\sqrt{5}}{2}}} \begin{pmatrix} 1 \\ \frac{1+\sqrt{5}}{2} \end{pmatrix} = \frac{1}{\sqrt{\frac{5+\sqrt{5}}{2}}} \begin{pmatrix} 1 + \frac{1+\sqrt{5}}{2} \\ \frac{1+\sqrt{5}}{2} \end{pmatrix} = \frac{1}{\sqrt{\frac{5+\sqrt{5}}{2}}} \begin{pmatrix} \frac{3+\sqrt{5}}{2} \\ \frac{1+\sqrt{5}}{2} \end{pmatrix}$.
$u_1 = \frac{1}{\sigma_1} A v_1 = \frac{1}{\sqrt{\frac{3+\sqrt{5}}{2}}} \frac{1}{\sqrt{\frac{5+\sqrt{5}}{2}}} \begin{pmatrix} \frac{3+\sqrt{5}}{2} \\ \frac{1+\sqrt{5}}{2} \end{pmatrix}$.
This simplifies to $u_1 = \frac{1}{\sqrt{\frac{3+\sqrt{5}}{2}}} \frac{1}{\sqrt{\frac{5+\sqrt{5}}{2}}} \frac{1}{2} \begin{pmatrix} 3+\sqrt{5} \\ 1+\sqrt{5} \end{pmatrix}$.
Let's use a trick: $u_1$ must be normalized $A v_1 / \sigma_1$.
We know $\sigma_1^2 = \frac{3+\sqrt{5}}{2}$.
The vector $A v_1$ is proportional to $\begin{pmatrix} \frac{3+\sqrt{5}}{2} \\ \frac{1+\sqrt{5}}{2} \end{pmatrix}$.
Let's check its squared norm: $\left(\frac{3+\sqrt{5}}{2}\right)^2 + \left(\frac{1+\sqrt{5}}{2}\right)^2 = \frac{9+6\sqrt{5}+5}{4} + \frac{1+2\sqrt{5}+5}{4} = \frac{14+6\sqrt{5}}{4} + \frac{6+2\sqrt{5}}{4} = \frac{20+8\sqrt{5}}{4} = 5+2\sqrt{5}$.
This should be $\sigma_1^2 \cdot \|v_1\|^2 = \lambda_1 \cdot 1 = \lambda_1 = \frac{3+\sqrt{5}}{2}$. Something is wrong.

Let's re-evaluate $A v_1$ and its norm.
$v_1 = \frac{1}{\|v_1\|_u} \begin{pmatrix} 1 \\ \phi \end{pmatrix}$ where $\phi = \frac{1+\sqrt{5}}{2}$ (golden ratio). $\|v_1\|_u^2 = 1+\phi^2 = 1+\frac{1+2\sqrt{5}+5}{4} = \frac{4+6+2\sqrt{5}}{4} = \frac{10+2\sqrt{5}}{4} = \frac{5+\sqrt{5}}{2}$.
$A v_1 = \frac{1}{\|v_1\|_u} \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} 1 \\ \phi \end{pmatrix} = \frac{1}{\|v_1\|_u} \begin{pmatrix} 1+\phi \\ \phi \end{pmatrix}$.
$\|A v_1\|^2 = \frac{1}{\|v_1\|_u^2} ((1+\phi)^2 + \phi^2) = \frac{1}{\frac{5+\sqrt{5}}{2}} (1+2\phi+\phi^2+\phi^2) = \frac{2}{5+\sqrt{5}} (1+2\phi+2\phi^2)$.
We know $\phi^2 = \phi+1$. So $1+2\phi+2(\phi+1) = 1+2\phi+2\phi+2 = 3+4\phi = 3+4\left(\frac{1+\sqrt{5}}{2}\right) = 3+2+2\sqrt{5} = 5+2\sqrt{5}$.
So $\|A v_1\|^2 = \frac{2}{5+\sqrt{5}} (5+2\sqrt{5})$. This is not $\lambda_1 = \frac{3+\sqrt{5}}{2}$.

Ah, a common mistake: $v_1 = \begin{pmatrix} 1 \\ \frac{1+\sqrt{5}}{2} \end{pmatrix}$ is an eigenvector, but it's not normalized.
The definition is $u_i = \frac{1}{\sigma_i} A v_i$, where $v_i$ *must be a normalized eigenvector*. I correctly normalized $v_1$ and $v_2$ in Step 3, but then used the unnormalized version in the calculation of $A v_i$. Let's re-do $A v_1$ and $A v_2$ using the normalized $v_1$ and $v_2$.

Let $v_1 = \begin{pmatrix} c_1 \\ s_1 \end{pmatrix}$ and $v_2 = \begin{pmatrix} c_2 \\ s_2 \end{pmatrix}$ be the normalized eigenvectors.
$c_1 = \frac{1}{\sqrt{\frac{5+\sqrt{5}}{2}}}$, $s_1 = \frac{(1+\sqrt{5})/2}{\sqrt{\frac{5+\sqrt{5}}{2}}}$.
$A v_1 = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} c_1 \\ s_1 \end{pmatrix} = \begin{pmatrix} c_1+s_1 \\ s_1 \end{pmatrix}$.
$\|A v_1\|^2 = (c_1+s_1)^2 + s_1^2 = c_1^2 + 2c_1s_1 + s_1^2 + s_1^2 = (c_1^2+s_1^2) + 2c_1s_1 + s_1^2 = 1 + 2c_1s_1 + s_1^2$.
This calculation is getting very messy with $\sqrt{5}$. Let's use the fact that $A^T A v_i = \lambda_i v_i$.
And $A v_i = \sigma_i u_i$.
So $u_i = \frac{1}{\sigma_i} A v_i$.
The vectors $u_i$ are orthonormal.

Let's try to simplify the $v_i$ expressions first.
$\lambda_1 = \frac{3+\sqrt{5}}{2}$, $\lambda_2 = \frac{3-\sqrt{5}}{2}$.
$v_1$ is proportional to $\begin{pmatrix} 1 \\ \frac{1+\sqrt{5}}{2} \end{pmatrix}$. Let $\phi = \frac{1+\sqrt{5}}{2}$. So $v_1 \propto \begin{pmatrix} 1 \\ \phi \end{pmatrix}$.
$\|v_1\|^2 = 1+\phi^2 = 1+(\phi+1) = \phi+2 = \frac{1+\sqrt{5}}{2} + 2 = \frac{5+\sqrt{5}}{2}$.
So $v_1 = \frac{1}{\sqrt{(\phi+2)}} \begin{pmatrix} 1 \\ \phi \end{pmatrix}$.
$A v_1 = \frac{1}{\sqrt{(\phi+2)}} \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} 1 \\ \phi \end{pmatrix} = \frac{1}{\sqrt{(\phi+2)}} \begin{pmatrix} 1+\phi \\ \phi \end{pmatrix} = \frac{1}{\sqrt{(\phi+2)}} \begin{pmatrix} \phi^2 \\ \phi \end{pmatrix}$.
$u_1 = \frac{1}{\sigma_1} A v_1 = \frac{1}{\sqrt{\lambda_1}} \frac{1}{\sqrt{(\phi+2)}} \begin{pmatrix} \phi^2 \\ \phi \end{pmatrix} = \frac{1}{\sqrt{\frac{3+\sqrt{5}}{2}}} \frac{1}{\sqrt{\frac{5+\sqrt{5}}{2}}} \begin{pmatrix} \phi^2 \\ \phi \end{pmatrix}$.
$\sqrt{\lambda_1} = \sqrt{\phi+1}$. So $u_1 = \frac{1}{\sqrt{\phi+1}} \frac{1}{\sqrt{\phi+2}} \begin{pmatrix} \phi^2 \\ \phi \end{pmatrix}$.
This is still very messy. Let's use a different approach for $u_i$ if the numbers are too complex.
We know $u_1$ and $u_2$ must be orthonormal.
$u_1 = \frac{1}{\sigma_1} A v_1$.
$u_2 = \frac{1}{\sigma_2} A v_2$.
For $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$, $A$ is invertible, so its rank is 2. Both $\sigma_1, \sigma_2$ are non-zero.
$v_1 = \frac{1}{\sqrt{\frac{5+\sqrt{5}}{2}}} \begin{pmatrix} 1 \\ \frac{1+\sqrt{5}}{2} \end{pmatrix}$ and $v_2 = \frac{1}{\sqrt{\frac{5-\sqrt{5}}{2}}} \begin{pmatrix} 1 \\ \frac{1-\sqrt{5}}{2} \end{pmatrix}$.
$A v_1 = \frac{1}{\sqrt{\frac{5+\sqrt{5}}{2}}} \begin{pmatrix} 1+\frac{1+\sqrt{5}}{2} \\ \frac{1+\sqrt{5}}{2} \end{pmatrix} = \frac{1}{\sqrt{\frac{5+\sqrt{5}}{2}}} \begin{pmatrix} \frac{3+\sqrt{5}}{2} \\ \frac{1+\sqrt{5}}{2} \end{pmatrix}$.
$u_1 = \frac{1}{\sqrt{\frac{3+\sqrt{5}}{2}}} \frac{1}{\sqrt{\frac{5+\sqrt{5}}{2}}} \begin{pmatrix} \frac{3+\sqrt{5}}{2} \\ \frac{1+\sqrt{5}}{2} \end{pmatrix} = \frac{1}{\sqrt{\frac{(3+\sqrt{5})(5+\sqrt{5})}{4}}} \begin{pmatrix} \frac{3+\sqrt{5}}{2} \\ \frac{1+\sqrt{5}}{2} \end{pmatrix}$.
Denominator: $\sqrt{\frac{15+3\sqrt{5}+5\sqrt{5}+5}{4}} = \sqrt{\frac{20+8\sqrt{5}}{4}} = \sqrt{5+2\sqrt{5}}$.
So $u_1 = \frac{1}{\sqrt{5+2\sqrt{5}}} \begin{pmatrix} \frac{3+\sqrt{5}}{2} \\ \frac{1+\sqrt{5}}{2} \end{pmatrix}$.
Let's check if $\|u_1\|=1$: $\frac{1}{5+2\sqrt{5}} \left( \left(\frac{3+\sqrt{5}}{2}\right)^2 + \left(\frac{1+\sqrt{5}}{2}\right)^2 \right) = \frac{1}{5+2\sqrt{5}} \left( \frac{9+6\sqrt{5}+5}{4} + \frac{1+2\sqrt{5}+5}{4} \right) = \frac{1}{5+2\sqrt{5}} \left( \frac{14+6\sqrt{5}}{4} + \frac{6+2\sqrt{5}}{4} \right) = \frac{1}{5+2\sqrt{5}} \left( \frac{20+8\sqrt{5}}{4} \right) = \frac{1}{5+2\sqrt{5}} (5+2\sqrt{5}) = 1$. This is correct.

For $u_2$:
$A v_2 = \frac{1}{\sqrt{\frac{5-\sqrt{5}}{2}}} \begin{pmatrix} 1+\frac{1-\sqrt{5}}{2} \\ \frac{1-\sqrt{5}}{2} \end{pmatrix} = \frac{1}{\sqrt{\frac{5-\sqrt{5}}{2}}} \begin{pmatrix} \frac{3-\sqrt{5}}{2} \\ \frac{1-\sqrt{5}}{2} \end{pmatrix}$.
$u_2 = \frac{1}{\sqrt{\frac{3-\sqrt{5}}{2}}} \frac{1}{\sqrt{\frac{5-\sqrt{5}}{2}}} \begin{pmatrix} \frac{3-\sqrt{5}}{2} \\ \frac{1-\sqrt{5}}{2} \end{pmatrix} = \frac{1}{\sqrt{\frac{(3-\sqrt{5})(5-\sqrt{5})}{4}}} \begin{pmatrix} \frac{3-\sqrt{5}}{2} \\ \frac{1-\sqrt{5}}{2} \end{pmatrix}$.
Denominator: $\sqrt{\frac{15-3\sqrt{5}-5\sqrt{5}+5}{4}} = \sqrt{\frac{20-8\sqrt{5}}{4}} = \sqrt{5-2\sqrt{5}}$.
So $u_2 = \frac{1}{\sqrt{5-2\sqrt{5}}} \begin{pmatrix} \frac{3-\sqrt{5}}{2} \\ \frac{1-\sqrt{5}}{2} \end{pmatrix}$.
Let's check if $\|u_2\|=1$: $\frac{1}{5-2\sqrt{5}} \left( \left(\frac{3-\sqrt{5}}{2}\right)^2 + \left(\frac{1-\sqrt{5}}{2}\right)^2 \right) = \frac{1}{5-2\sqrt{5}} \left( \frac{9-6\sqrt{5}+5}{4} + \frac{1-2\sqrt{5}+5}{4} \right) = \frac{1}{5-2\sqrt{5}} \left( \frac{14-6\sqrt{5}}{4} + \frac{6-2\sqrt{5}}{4} \right) = \frac{1}{5-2\sqrt{5}} \left( \frac{20-8\sqrt{5}}{4} \right) = \frac{1}{5-2\sqrt{5}} (5-2\sqrt{5}) = 1$. This is correct.

Form $U = [u_1 \ u_2]$.
$$
U = \begin{pmatrix}
\frac{(3+\sqrt{5})/2}{\sqrt{5+2\sqrt{5}}} & \frac{(3-\sqrt{5})/2}{\sqrt{5-2\sqrt{5}}} \\
\frac{(1+\sqrt{5})/2}{\sqrt{5+2\sqrt{5}}} & \frac{(1-\sqrt{5})/2}{\sqrt{5-2\sqrt{5}}}
\end{pmatrix}
$$
*Explanation:* The columns of $U$ are the normalized images of the $V$ vectors under the transformation $A$, scaled by the inverse of their singular values. This ensures $U$ is orthogonal and represents the output rotation.

**Step 6: Final SVD.**
$$
A = U \Sigma V^T
$$
$$
\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix}
\frac{(3+\sqrt{5})/2}{\sqrt{5+2\sqrt{5}}} & \frac{(3-\sqrt{5})/2}{\sqrt{5-2\sqrt{5}}} \\
\frac{(1+\sqrt{5})/2}{\sqrt{5+2\sqrt{5}}} & \frac{(1-\sqrt{5})/2}{\sqrt{5-2\sqrt{5}}}
\end{pmatrix}
\begin{pmatrix} \sqrt{\frac{3 + \sqrt{5}}{2}} & 0 \\ 0 & \sqrt{\frac{3 - \sqrt{5}}{2}} \end{pmatrix}
\begin{pmatrix}
\frac{1}{\sqrt{\frac{5+\sqrt{5}}{2}}} & \frac{(1+\sqrt{5})/2}{\sqrt{\frac{5+\sqrt{5}}{2}}} \\
\frac{1}{\sqrt{\frac{5-\sqrt{5}}{2}}} & \frac{(1-\sqrt{5})/2}{\sqrt{\frac{5-\sqrt{5}}{2}}}
\end{pmatrix}
$$
The numbers are quite complex, but the process is sound.

**Reflection:** This example was tricky due to the irrational eigenvalues and eigenvectors. It highlights the importance of careful algebraic manipulation and checking norms. It also shows that even for a simple-looking matrix, the SVD can involve complicated numbers. This is why computational tools are often used for SVD in practice.

---

### Example 2: Rectangular Matrix ($m > n$, more rows than columns)

**Problem:** Find the SVD of $A = \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 1 & 0 \end{pmatrix}$.

**Given:** Matrix $A = \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 1 & 0 \end{pmatrix}$.
**Want:** $U, \Sigma, V^T$ such that $A = U \Sigma V^T$.

**Step 1: Calculate $A^T A$.**
$A^T = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 0 \end{pmatrix}$
$A^T A = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 0 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 1 & 0 \end{pmatrix} = \begin{pmatrix} 1+0+1 & 0+0+0 \\ 0+0+0 & 0+1+0 \end{pmatrix} = \begin{pmatrix} 2 & 0 \\ 0 & 1 \end{pmatrix}$.
*Explanation:* $A^T A$ is symmetric and $2 \times 2$.

**Step 2: Find eigenvalues $\lambda_i$ of $A^T A$.**
$A^T A$ is already a diagonal matrix. Its eigenvalues are the diagonal entries.
$\lambda_1 = 2$
$\lambda_2 = 1$
*Explanation:* The eigenvalues are directly read from the diagonal matrix. They are already ordered.

**Step 3: Find eigenvectors $v_i$ of $A^T A$, normalize, and form $V$.**

For $\lambda_1 = 2$:
$(A^T A - 2I)v_1 = \begin{pmatrix} 0 & 0 \\ 0 & -1 \end{pmatrix} v_1 = 0 \implies -v_{1,y} = 0 \implies v_{1,y}=0$.
So $v_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$. This is already normalized.

For $\lambda_2 = 1$:
$(A^T A - 1I)v_2 = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} v_2 = 0 \implies v_{2,x} = 0$.
So $v_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$. This is already normalized.

Form $V = [v_1 \ v_2]$.
$$
V = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}
$$
And $V^T = V$.
*Explanation:* The eigenvectors of a diagonal matrix are the standard basis vectors. They are already orthonormal.

**Step 4: Calculate singular values $\sigma_i = \sqrt{\lambda_i}$, and form $\Sigma$.**
$\sigma_1 = \sqrt{\lambda_1} = \sqrt{2}$
$\sigma_2 = \sqrt{\lambda_2} = \sqrt{1} = 1$
Since $A$ is $3 \times 2$, $\Sigma$ will be $3 \times 2$.
$$
\Sigma = \begin{pmatrix} \sigma_1 & 0 \\ 0 & \sigma_2 \\ 0 & 0 \end{pmatrix} = \begin{pmatrix} \sqrt{2} & 0 \\ 0 & 1 \\ 0 & 0 \end{pmatrix}
$$
*Explanation:* We take the square roots of the eigenvalues to get the singular values and place them on the diagonal of $\Sigma$, ensuring $\Sigma$ has the same dimensions as $A$.

**Step 5: Calculate $u_i = \frac{1}{\sigma_i} A v_i$ for non-zero $\sigma_i$, and form $U$.**
Since $A$ is $3 \times 2$, $U$ must be $3 \times 3$. We have $r=2$ non-zero singular values, so we'll find $u_1, u_2$ and then need to find $u_3$.

For $u_1$:
$A v_1 = \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}$.
$u_1 = \frac{1}{\sigma_1} A v_1 = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}$.

For $u_2$:
$A v_2 = \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$.
$u_2 = \frac{1}{\sigma_2} A v_2 = \frac{1}{1} \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$.

Now we need $u_3$. $u_3$ must be orthogonal to $u_1$ and $u_2$.
Let $u_3 = \begin{pmatrix} x \\ y \\ z \end{pmatrix}$.
$u_1 \cdot u_3 = \frac{1}{\sqrt{2}}(x+z) = 0 \implies x+z=0$.
$u_2 \cdot u_3 = y = 0$.
So $y=0$ and $z=-x$.
Let $x=1$, then $z=-1$. So $u_3$ is proportional to $\begin{pmatrix} 1 \\ 0 \\ -1 \end{pmatrix}$.
Normalize $u_3$: $\|u_3\| = \sqrt{1^2+0^2+(-1)^2} = \sqrt{2}$.
$u_3 = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 \\ 0 \\ -1 \end{pmatrix}$.

Form $U = [u_1 \ u_2 \ u_3]$.
$$
U = \begin{pmatrix} 1/\sqrt{2} & 0 & 1/\sqrt