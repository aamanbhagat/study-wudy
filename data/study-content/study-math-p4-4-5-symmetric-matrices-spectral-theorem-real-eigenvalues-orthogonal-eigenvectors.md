## 1. What it is — in plain English

Imagine you have a grid of numbers, like a spreadsheet. In linear algebra, we call this a matrix. Now, picture a special kind of matrix where the numbers are arranged in a perfectly symmetrical way. If you draw a diagonal line from the top-left corner to the bottom-right corner, the numbers on one side of this line are an exact mirror image of the numbers on the other side. That's a "symmetric matrix."

These symmetric matrices are incredibly special because of a powerful result called the "Spectral Theorem." This theorem tells us two amazing things about them. First, when you use a symmetric matrix to transform or "stretch" space, all the "stretch factors" — which we call eigenvalues — are always plain, ordinary real numbers. You won't get any imaginary numbers or complex weirdness.

Second, and even more profoundly, the directions in which this stretching happens — which we call eigenvectors — are always perfectly perpendicular to each other. Think of it like stretching a rubber sheet: a symmetric matrix will stretch it along directions that form a perfect grid of 90-degree angles. This means we can always find a set of these perpendicular directions that perfectly describe the matrix's behavior.

In short, symmetric matrices are the "nice" matrices of linear algebra because their stretching behavior is entirely real and perfectly aligned along perpendicular axes. This makes them much easier to understand and work with than general matrices.

## 2. Why it matters — real-world applications

The properties of symmetric matrices and the Spectral Theorem are not just mathematical curiosities; they are foundational to understanding and solving problems across many scientific and engineering disciplines.

1.  **Machine Learning and Data Science (Principal Component Analysis - PCA):** In fields like image processing, genetics, and finance, datasets often have hundreds or thousands of features (dimensions). PCA is a technique used to reduce this dimensionality while retaining as much variance as possible. The core of PCA involves analyzing the *covariance matrix* of the data, which is always symmetric. The eigenvalues of this covariance matrix tell us the "amount" of variance along certain directions, and the corresponding eigenvectors (the principal components) give us these new, orthogonal directions of greatest variance. Companies like Google use PCA for tasks like facial recognition and data compression.

2.  **Physics and Engineering (Stress, Strain, and Inertia Tensors):** When you apply force to an object, it deforms (strain) and experiences internal forces (stress). These quantities are described by second-rank tensors, which, under certain conditions (like for elastic materials), are represented by symmetric matrices. For example, the *stress tensor* at a point in a material is a symmetric $3 \times 3$ matrix. The Spectral Theorem allows engineers to find the "principal stresses" (eigenvalues) and their corresponding "principal directions" (eigenvectors), which are the directions where the stress is purely tensile or compressive, with no shearing. Similarly, the *moment of inertia tensor* for a rotating rigid body is symmetric, and its eigenvalues give the principal moments of inertia, while eigenvectors give the principal axes of rotation (e.g., crucial for designing stable spacecraft or understanding gyroscope behavior).

3.  **Quantum Mechanics:** In quantum mechanics, physical observables (like position, momentum, energy) are represented by *Hermitian operators*. For real vector spaces, Hermitian operators correspond to symmetric matrices. The eigenvalues of these operators represent the possible outcomes of a measurement of that observable, and the corresponding eigenvectors represent the quantum states associated with those outcomes. The fact that eigenvalues are real and eigenvectors are orthogonal is critical for the physical interpretation of quantum measurements.

4.  **Graph Theory (Adjacency Matrices):** When you represent an undirected graph (a network where connections have no direction, like Facebook friendships) using an *adjacency matrix*, this matrix is always symmetric. The eigenvalues and eigenvectors of this matrix can reveal important properties of the graph, such as its connectivity, the presence of communities, or how information might spread through the network. This is used in network analysis, social network studies, and even for ranking web pages.

## 3. Prerequisites — what you must know first

Before diving deep into symmetric matrices and the Spectral Theorem, you must have a solid grasp of the following concepts. If any of these feel unfamiliar, pause and review them thoroughly.

*   **Matrix Definition and Operations:** What a matrix is, how to add, subtract, and multiply matrices.
*   **Transpose of a Matrix:** How to swap rows and columns of a matrix, denoted $A^T$.
*   **Determinant of a Matrix:** A scalar value associated with a square matrix, crucial for finding eigenvalues.
*   **Inverse of a Matrix:** A matrix $A^{-1}$ such that $AA^{-1} = A^{-1}A = I$ (the identity matrix).
*   **Eigenvalues and Eigenvectors:** The fundamental definitions: A non-zero vector $\mathbf{v}$ is an eigenvector of a square matrix $A$ if $A\mathbf{v} = \lambda\mathbf{v}$ for some scalar $\lambda$, which is the eigenvalue. How to find them using the characteristic equation $\det(A - \lambda I) = 0$.
*   **Vector Space and Subspace:** The concept of a set of vectors that satisfy closure under addition and scalar multiplication, and subsets that are themselves vector spaces.
*   **Linear Independence:** A set of vectors where none can be written as a linear combination of the others.
*   **Basis of a Vector Space:** A linearly independent set of vectors that spans the entire vector space.
*   **Dot Product (Inner Product):** How to compute the scalar product of two vectors, $\mathbf{u} \cdot \mathbf{v}$, and its geometric interpretation (projection, angle).
*   **Orthogonality of Vectors:** Two vectors $\mathbf{u}, \mathbf{v}$ are orthogonal if their dot product $\mathbf{u} \cdot \mathbf{v} = 0$. Geometrically, they are perpendicular.
*   **Norm of a Vector:** The "length" of a vector, denoted $||\mathbf{v}|| = \sqrt{\mathbf{v} \cdot \mathbf{v}}$.
*   **Orthonormal Vectors/Basis:** A set of vectors that are mutually orthogonal and each has a norm of 1.
*   **Orthogonal Matrix:** A square matrix $P$ whose columns form an orthonormal basis. A key property is $P^T P = I$, which implies $P^T = P^{-1}$.
*   **Diagonalization of a Matrix:** The process of finding matrices $P$ and $D$ such that $A = PDP^{-1}$, where $D$ is a diagonal matrix containing the eigenvalues of $A$, and $P$ is a matrix whose columns are the corresponding eigenvectors.
*   **Gram-Schmidt Process:** An algorithm for orthogonalizing a set of linearly independent vectors.

## 4. The core idea — step by step

Let's break down the Spectral Theorem into its fundamental components, building intuition piece by piece.

### Step 1: What is a Symmetric Matrix?

**Plain English Statement:** A symmetric matrix is a square matrix that looks exactly the same if you flip it along its main diagonal (the line of numbers from top-left to bottom-right). It's like a mirror image.

**Small Concrete Example:**
Consider the matrix $A$:
$$A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 5 \\ 3 & 5 & 6 \end{pmatrix}$$
If you look at the elements:
- The element in row 1, column 2 is 2. The element in row 2, column 1 is also 2.
- The element in row 1, column 3 is 3. The element in row 3, column 1 is also 3.
- The element in row 2, column 3 is 5. The element in row 3, column 2 is also 5.
This pattern holds for all off-diagonal elements. The elements on the main diagonal ($1, 4, 6$) can be anything.

**The Formal/Mathematical Version:**
A square matrix $A$ is symmetric if it is equal to its own transpose. That is:
$$A = A^T$$
In terms of entries, for an $n \times n$ matrix $A = [a_{ij}]$, this means $a_{ij} = a_{ji}$ for all $1 \le i, j \le n$.

**What Could Go Wrong:**
A common mistake is confusing symmetric matrices with diagonal matrices (where only main diagonal entries are non-zero) or with identity matrices. While diagonal and identity matrices *are* symmetric, not all symmetric matrices are diagonal. Another trap is thinking a non-square matrix can be symmetric; the definition $A=A^T$ inherently requires $A$ to be square.

### Step 2: Eigenvalues of Symmetric Matrices are Real

**Plain English Statement:** When you find the "stretch factors" (eigenvalues) for a symmetric matrix, they will *always* be ordinary real numbers. You'll never get complex numbers with an imaginary part, like $3 + 2i$. This makes them much easier to work with and interpret physically.

**Small Concrete Example:**
Let's take a simple $2 \times 2$ symmetric matrix:
$$A = \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}$$
To find the eigenvalues, we solve the characteristic equation $\det(A - \lambda I) = 0$:
$$A - \lambda I = \begin{pmatrix} 1-\lambda & 2 \\ 2 & 1-\lambda \end{pmatrix}$$
$$\det(A - \lambda I) = (1-\lambda)(1-\lambda) - (2)(2) = (1-\lambda)^2 - 4 = 0$$
$$(1-\lambda)^2 = 4$$
$$1-\lambda = \pm 2$$
So, $1-\lambda = 2 \implies \lambda = -1$
And $1-\lambda = -2 \implies \lambda = 3$
Both eigenvalues, $\lambda_1 = -1$ and $\lambda_2 = 3$, are real numbers.

**The Formal/Mathematical Version:**
Let $A$ be a real symmetric matrix. Let $\lambda$ be an eigenvalue of $A$ and $\mathbf{x}$ be its corresponding eigenvector, so $A\mathbf{x} = \lambda\mathbf{x}$. We want to show $\lambda$ must be real.
We use the complex conjugate transpose (Hermitian conjugate) denoted by $\mathbf{x}^H$. For a vector $\mathbf{x}$ with complex entries, $\mathbf{x}^H = (\bar{\mathbf{x}})^T$.
Consider the quantity $\mathbf{x}^H A \mathbf{x}$:
1.  Since $A\mathbf{x} = \lambda\mathbf{x}$, we have $\mathbf{x}^H (A\mathbf{x}) = \mathbf{x}^H (\lambda\mathbf{x}) = \lambda (\mathbf{x}^H \mathbf{x}) = \lambda ||\mathbf{x}||^2$.
2.  Now consider the Hermitian conjugate of this quantity: $(\mathbf{x}^H A \mathbf{x})^H$.
    Using the property $(BC)^H = C^H B^H$ and $(A^H)^H = A$, we get:
    $(\mathbf{x}^H A \mathbf{x})^H = \mathbf{x}^H A^H (\mathbf{x}^H)^H = \mathbf{x}^H A^H \mathbf{x}$.
    Since $A$ is a *real* symmetric matrix, $A^H = A^T = A$. So, $(\mathbf{x}^H A \mathbf{x})^H = \mathbf{x}^H A \mathbf{x}$.
    This means $\mathbf{x}^H A \mathbf{x}$ is equal to its own Hermitian conjugate, which implies $\mathbf{x}^H A \mathbf{x}$ is a real number.
3.  From step 1, we have $\mathbf{x}^H A \mathbf{x} = \lambda ||\mathbf{x}||^2$.
    Since $\mathbf{x}$ is an eigenvector, it is non-zero, so $||\mathbf{x}||^2 > 0$.
    Because $\mathbf{x}^H A \mathbf{x}$ is real and $||\mathbf{x}||^2$ is real and positive, it follows that $\lambda = \frac{\mathbf{x}^H A \mathbf{x}}{||\mathbf{x}||^2}$ must also be a real number.
    Therefore, all eigenvalues of a real symmetric matrix are real.

**What Could Go Wrong:**
Students might mistakenly assume that *any* matrix has real eigenvalues. For non-symmetric matrices, complex eigenvalues are very common (e.g., rotation matrices). Forgetting this distinction can lead to incorrect assumptions about the nature of eigenvalues.

### Step 3: Eigenvectors Corresponding to Distinct Eigenvalues are Orthogonal

**Plain English Statement:** If a symmetric matrix has different "stretch factors" (eigenvalues), then their corresponding "stretch directions" (eigenvectors) will always be perfectly perpendicular to each other. Their dot product will be zero.

**Small Concrete Example:**
Using the matrix $A = \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}$ from Step 2, we found eigenvalues $\lambda_1 = -1$ and $\lambda_2 = 3$.
Let's find the eigenvectors:

For $\lambda_1 = -1$:
$$(A - (-1)I)\mathbf{x} = \mathbf{0} \implies \begin{pmatrix} 1 - (-1) & 2 \\ 2 & 1 - (-1) \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} 2 & 2 \\ 2 & 2 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
This gives the equation $2x_1 + 2x_2 = 0$, or $x_1 = -x_2$.
Let $x_2 = 1$, then $x_1 = -1$. So, an eigenvector is $\mathbf{v}_1 = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$.

For $\lambda_2 = 3$:
$$(A - 3I)\mathbf{x} = \mathbf{0} \implies \begin{pmatrix} 1 - 3 & 2 \\ 2 & 1 - 3 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} -2 & 2 \\ 2 & -2 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
This gives the equation $-2x_1 + 2x_2 = 0$, or $x_1 = x_2$.
Let $x_2 = 1$, then $x_1 = 1$. So, an eigenvector is $\mathbf{v}_2 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.

Now, let's check their orthogonality using the dot product:
$$\mathbf{v}_1 \cdot \mathbf{v}_2 = (-1)(1) + (1)(1) = -1 + 1 = 0$$
Since the dot product is 0, $\mathbf{v}_1$ and $\mathbf{v}_2$ are indeed orthogonal.

**The Formal/Mathematical Version:**
Let $A$ be a real symmetric matrix. Let $\lambda_1$ and $\lambda_2$ be two distinct eigenvalues of $A$, with corresponding eigenvectors $\mathbf{v}_1$ and $\mathbf{v}_2$. So, $A\mathbf{v}_1 = \lambda_1\mathbf{v}_1$ and $A\mathbf{v}_2 = \lambda_2\mathbf{v}_2$.
We want to show $\mathbf{v}_1 \cdot \mathbf{v}_2 = 0$.
Consider $\lambda_1 (\mathbf{v}_1 \cdot \mathbf{v}_2)$:
1.  $\lambda_1 (\mathbf{v}_1 \cdot \mathbf{v}_2) = (\lambda_1 \mathbf{v}_1)^T \mathbf{v}_2 = (A\mathbf{v}_1)^T \mathbf{v}_2$.
2.  Using $(BC)^T = C^T B^T$, we get $(A\mathbf{v}_1)^T \mathbf{v}_2 = \mathbf{v}_1^T A^T \mathbf{v}_2$.
3.  Since $A$ is symmetric, $A^T = A$. So, $\mathbf{v}_1^T A^T \mathbf{v}_2 = \mathbf{v}_1^T A \mathbf{v}_2$.
4.  Since $A\mathbf{v}_2 = \lambda_2\mathbf{v}_2$, we have $\mathbf{v}_1^T A \mathbf{v}_2 = \mathbf{v}_1^T (\lambda_2\mathbf{v}_2) = \lambda_2 (\mathbf{v}_1^T \mathbf{v}_2) = \lambda_2 (\mathbf{v}_1 \cdot \mathbf{v}_2)$.
    So we have $\lambda_1 (\mathbf{v}_1 \cdot \mathbf{v}_2) = \lambda_2 (\mathbf{v}_1 \cdot \mathbf{v}_2)$.
5.  Rearranging, $(\lambda_1 - \lambda_2) (\mathbf{v}_1 \cdot \mathbf{v}_2) = 0$.
    Since $\lambda_1 \ne \lambda_2$, we must have $\lambda_1 - \lambda_2 \ne 0$.
    Therefore, for the product to be zero, we must have $\mathbf{v}_1 \cdot \mathbf{v}_2 = 0$.
    This proves that eigenvectors corresponding to distinct eigenvalues of a real symmetric matrix are orthogonal.

**What Could Go Wrong:**
This orthogonality property *only* applies to eigenvectors corresponding to *distinct* eigenvalues. If an eigenvalue is repeated (has algebraic multiplicity greater than 1), its corresponding eigenspace will have a dimension greater than 1, and the eigenvectors within that eigenspace are not guaranteed to be orthogonal *initially*. You'll need an extra step (Gram-Schmidt) to make them orthogonal, as discussed next.

### Step 4: Eigenvectors Corresponding to Repeated Eigenvalues Can Be Chosen to Be Orthogonal

**Plain English Statement:** If a symmetric matrix has a "stretch factor" (eigenvalue) that appears multiple times, its corresponding "stretch directions" (eigenvectors) might not be perpendicular to each other right away. However, the good news is that you can *always* find a set of perpendicular directions for that repeated stretch factor. You just might need to do a little extra work to "straighten them out."

**Small Concrete Example:**
Consider the identity matrix $I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$. This is symmetric.
Its characteristic equation is $\det(I - \lambda I) = (1-\lambda)^2 = 0$, so $\lambda = 1$ is an eigenvalue with algebraic multiplicity 2.
For $\lambda = 1$:
$$(I - 1I)\mathbf{x} = \mathbf{0} \implies \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
This means $0x_1 + 0x_2 = 0$, which is true for *any* vector $\begin{pmatrix} x_1 \\ x_2 \end{pmatrix}$.
The eigenspace for $\lambda=1$ is $\mathbb{R}^2$. A basis for this eigenspace could be $\mathbf{e}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $\mathbf{e}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$. These are already orthogonal.
But another basis could be $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $\mathbf{v}_2 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$. These are *not* orthogonal ($\mathbf{v}_1 \cdot \mathbf{v}_2 = 1$).
However, we can apply the Gram-Schmidt process to $\{\mathbf{v}_1, \mathbf{v}_2\}$ to get an orthogonal basis.
Let $\mathbf{u}_1 = \mathbf{v}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.
Let $\mathbf{u}_2 = \mathbf{v}_2 - \text{proj}_{\mathbf{u}_1} \mathbf{v}_2 = \mathbf{v}_2 - \frac{\mathbf{v}_2 \cdot \mathbf{u}_1}{\mathbf{u}_1 \cdot \mathbf{u}_1} \mathbf{u}_1$.
$\mathbf{v}_2 \cdot \mathbf{u}_1 = (1)(1) + (0)(1) = 1$.
$\mathbf{u}_1 \cdot \mathbf{u}_1 = (1)(1) + (1)(1) = 2$.
So, $\mathbf{u}_2 = \begin{pmatrix} 1 \\ 0 \end{pmatrix} - \frac{1}{2} \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 1 - 1/2 \\ 0 - 1/2 \end{pmatrix} = \begin{pmatrix} 1/2 \\ -1/2 \end{pmatrix}$.
Now, $\{\begin{pmatrix} 1 \\ 1 \end{pmatrix}, \begin{pmatrix} 1/2 \\ -1/2 \end{pmatrix}\}$ is an orthogonal basis for the eigenspace. We can normalize them to get an orthonormal basis.
The key is that we *can* find such an orthogonal basis.

**The Formal/Mathematical Version:**
For a real symmetric matrix $A$, the dimension of the eigenspace corresponding to an eigenvalue $\lambda$ (its geometric multiplicity) is always equal to the algebraic multiplicity of $\lambda$. This is a crucial property for symmetric matrices.
This means that for every eigenvalue, even if it's repeated, there are enough linearly independent eigenvectors to form a basis for its eigenspace. If these basis vectors are not already orthogonal, the Gram-Schmidt orthogonalization process can be applied to them to produce an orthonormal basis for that eigenspace.
Since eigenvectors corresponding to distinct eigenvalues are already orthogonal (from Step 3), and we can make eigenvectors within the same eigenspace orthogonal (using Gram-Schmidt), we can always find a complete set of $n$ orthonormal eigenvectors for an $n \times n$ symmetric matrix.

**What Could Go Wrong:**
The biggest trap here is forgetting to apply Gram-Schmidt when dealing with repeated eigenvalues. If you just pick any linearly independent eigenvectors for a repeated eigenvalue, they might not be orthogonal, which would prevent you from forming an orthogonal matrix $P$ later.

### Step 5: The Spectral Theorem (Main Statement)

**Plain English Statement:** Putting it all together: Every symmetric matrix is like a special kind of transformation. You can always find a way to "rotate" your coordinate system so that this transformation simply stretches or shrinks things along the new coordinate axes. Then, you can "rotate" back to your original system. The "rotation" part is done by an orthogonal matrix, and the "stretching/shrinking" part is done by a diagonal matrix.

**Small Concrete Example:**
Let's use the matrix $A = \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}$ again.
We found eigenvalues $\lambda_1 = -1$ and $\lambda_2 = 3$.
Corresponding eigenvectors were $\mathbf{v}_1 = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$ and $\mathbf{v}_2 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.
These are orthogonal. To make them orthonormal, we normalize them:
$||\mathbf{v}_1|| = \sqrt{(-1)^2 + 1^2} = \sqrt{2}$. So, $\mathbf{u}_1 = \frac{1}{\sqrt{2}}\begin{pmatrix} -1 \\ 1 \end{pmatrix}$.
$||\mathbf{v}_2|| = \sqrt{1^2 + 1^2} = \sqrt{2}$. So, $\mathbf{u}_2 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$.

Now, form the matrix $P$ whose columns are these orthonormal eigenvectors:
$$P = \begin{pmatrix} -1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & 1/\sqrt{2} \end{pmatrix}$$
This matrix $P$ is an orthogonal matrix, meaning $P^T P = I$ (and thus $P^{-1} = P^T$). Let's check:
$$P^T = \begin{pmatrix} -1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & 1/\sqrt{2} \end{pmatrix}$$
$$P^T P = \begin{pmatrix} -1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & 1/\sqrt{2} \end{pmatrix} \begin{pmatrix} -1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & 1/\sqrt{2} \end{pmatrix} = \begin{pmatrix} (-1/\sqrt{2})^2 + (1/\sqrt{2})^2 & (-1/\sqrt{2})(1/\sqrt{2}) + (1/\sqrt{2})(1/\sqrt{2}) \\ (1/\sqrt{2})(-1/\sqrt{2}) + (1/\sqrt{2})(1/\sqrt{2}) & (1/\sqrt{2})^2 + (1/\sqrt{2})^2 \end{pmatrix}$$
$$P^T P = \begin{pmatrix} 1/2 + 1/2 & -1/2 + 1/2 \\ -1/2 + 1/2 & 1/2 + 1/2 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = I$$
Indeed, $P$ is orthogonal.

Form the diagonal matrix $D$ with the eigenvalues on the diagonal, in the same order as their corresponding eigenvectors in $P$:
$$D = \begin{pmatrix} -1 & 0 \\ 0 & 3 \end{pmatrix}$$

The Spectral Theorem states that $A = PDP^T$. Let's verify:
$$PDP^T = \begin{pmatrix} -1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & 1/\sqrt{2} \end{pmatrix} \begin{pmatrix} -1 & 0 \\ 0 & 3 \end{pmatrix} \begin{pmatrix} -1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & 1/\sqrt{2} \end{pmatrix}$$
$$= \begin{pmatrix} (-1/\sqrt{2})(-1) & (1/\sqrt{2})(3) \\ (1/\sqrt{2})(-1) & (1/\sqrt{2})(3) \end{pmatrix} \begin{pmatrix} -1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & 1/\sqrt{2} \end{pmatrix}$$
$$= \begin{pmatrix} 1/\sqrt{2} & 3/\sqrt{2} \\ -1/\sqrt{2} & 3/\sqrt{2} \end{pmatrix} \begin{pmatrix} -1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & 1/\sqrt{2} \end{pmatrix}$$
$$= \begin{pmatrix} (1/\sqrt{2})(-1/\sqrt{2}) + (3/\sqrt{2})(1/\sqrt{2}) & (1/\sqrt{2})(1/\sqrt{2}) + (3/\sqrt{2})(1/\sqrt{2}) \\ (-1/\sqrt{2})(-1/\sqrt{2}) + (3/\sqrt{2})(1/\sqrt{2}) & (-1/\sqrt{2})(1/\sqrt{2}) + (3/\sqrt{2})(1/\sqrt{2}) \end{pmatrix}$$
$$= \begin{pmatrix} -1/2 + 3/2 & 1/2 + 3/2 \\ 1/2 + 3/2 & -1/2 + 3/2 \end{pmatrix} = \begin{pmatrix} 2/2 & 4/2 \\ 4/2 & 2/2 \end{pmatrix} = \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}$$
This is indeed our original matrix $A$. The decomposition $A = PDP^T$ holds.

**The Formal/Mathematical Version:**
**The Spectral Theorem for Real Symmetric Matrices:**
Let $A$ be an $n \times n$ real symmetric matrix. Then there exists an orthogonal matrix $P$ and a diagonal matrix $D$ such that
$$A = PDP^T$$
where:
*   The diagonal entries of $D$ are the eigenvalues of $A$ (each eigenvalue appears on the diagonal as many times as its multiplicity).
*   The columns of $P$ are a set of orthonormal eigenvectors of $A$, corresponding to the eigenvalues in $D$ in the same order.
Since $P$ is orthogonal, $P^T = P^{-1}$, so this decomposition is a special case of diagonalization $A = PDP^{-1}$.

**What Could Go Wrong:**
The most common error is forgetting to normalize the eigenvectors before forming $P$. If $P$ is not an orthogonal matrix (i.e., its columns are not orthonormal), then $P^{-1} \ne P^T$, and the decomposition $A = PDP^T$ will not hold. Another mistake is mismatching the order of eigenvalues in $D$ with their corresponding eigenvectors in $P$.

## 5. Worked examples — multiple, with every step shown

Here are several worked examples to solidify your understanding. Pay close attention to each step and the reasoning behind it.

### Example 1: $2 \times 2$ symmetric matrix with distinct eigenvalues

**Problem:** Find an orthogonal matrix $P$ and a diagonal matrix $D$ such that $A = PDP^T$ for the matrix $A = \begin{pmatrix} 3 & 1 \\ 1 & 3 \end{pmatrix}$.

**What's given:** A $2 \times 2$ symmetric matrix $A$.
**What we want:** The matrices $P$ and $D$ that satisfy the Spectral Theorem.

**Solution:**

**Step 1: Find the eigenvalues of $A$.**
We solve the characteristic equation $\det(A - \lambda I) = 0$.
$$A - \lambda I = \begin{pmatrix} 3-\lambda & 1 \\ 1 & 3-\lambda \end{pmatrix}$$
$$\det(A - \lambda I) = (3-\lambda)(3-\lambda) - (1)(1) = (3-\lambda)^2 - 1 = 0$$
$$(3-\lambda)^2 = 1$$
$$3-\lambda = \pm 1$$
This gives two possibilities:
1.  $3-\lambda = 1 \implies \lambda_1 = 2$
2.  $3-\lambda = -1 \implies \lambda_2 = 4$
The eigenvalues are $\lambda_1 = 2$ and $\lambda_2 = 4$. Both are real, as expected for a symmetric matrix.

**Step 2: Find the eigenvectors corresponding to each eigenvalue.**

For $\lambda_1 = 2$:
We solve $(A - 2I)\mathbf{x} = \mathbf{0}$.
$$\begin{pmatrix} 3-2 & 1 \\ 1 & 3-2 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
This gives the equation $x_1 + x_2 = 0$, so $x_1 = -x_2$.
Let $x_2 = 1$, then $x_1 = -1$.
So, an eigenvector for $\lambda_1 = 2$ is $\mathbf{v}_1 = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$.

For $\lambda_2 = 4$:
We solve $(A - 4I)\mathbf{x} = \mathbf{0}$.
$$\begin{pmatrix} 3-4 & 1 \\ 1 & 3-4 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} -1 & 1 \\ 1 & -1 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
This gives the equation $-x_1 + x_2 = 0$, so $x_1 = x_2$.
Let $x_2 = 1$, then $x_1 = 1$.
So, an eigenvector for $\lambda_2 = 4$ is $\mathbf{v}_2 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.

**Step 3: Check for orthogonality and normalize the eigenvectors.**
Since the eigenvalues $\lambda_1=2$ and $\lambda_2=4$ are distinct, their corresponding eigenvectors $\mathbf{v}_1$ and $\mathbf{v}_2$ *must* be orthogonal. Let's verify:
$$\mathbf{v}_1 \cdot \mathbf{v}_2 = (-1)(1) + (1)(1) = -1 + 1 = 0$$
They are indeed orthogonal. Now, we normalize them to form an orthonormal basis.
Calculate the norm of each vector:
$$||\mathbf{v}_1|| = \sqrt{(-1)^2 + 1^2} = \sqrt{1+1} = \sqrt{2}$$
$$||\mathbf{v}_2|| = \sqrt{1^2 + 1^2} = \sqrt{1+1} = \sqrt{2}$$
Normalize the eigenvectors:
$$\mathbf{u}_1 = \frac{\mathbf{v}_1}{||\mathbf{v}_1||} = \frac{1}{\sqrt{2}} \begin{pmatrix} -1 \\ 1 \end{pmatrix} = \begin{pmatrix} -1/\sqrt{2} \\ 1/\sqrt{2} \end{pmatrix}$$
$$\mathbf{u}_2 = \frac{\mathbf{v}_2}{||\mathbf{v}_2||} = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 1/\sqrt{2} \\ 1/\sqrt{2} \end{pmatrix}$$

**Step 4: Construct the matrices $P$ and $D$.**
The matrix $P$ has the orthonormal eigenvectors as its columns. The order of columns in $P$ must match the order of eigenvalues in $D$.
$$P = \begin{pmatrix} -1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & 1/\sqrt{2} \end{pmatrix}$$
The diagonal matrix $D$ has the eigenvalues on its diagonal, in the same order as their corresponding eigenvectors in $P$.
$$D = \begin{pmatrix} 2 & 0 \\ 0 & 4 \end{pmatrix}$$

**Final Answer:**
The orthogonal matrix $P$ and diagonal matrix $D$ are:
$$P = \boxed{\begin{pmatrix} -1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & 1/\sqrt{2} \end{pmatrix}}$$
$$D = \boxed{\begin{pmatrix} 2 & 0 \\ 0 & 4 \end{pmatrix}}$$
(Note: The signs of the eigenvectors can be flipped, and the order of eigenvalues/eigenvectors can be swapped, leading to different valid $P$ and $D$ matrices, but $PDP^T$ will always yield $A$.)

**Reflection:** This example was straightforward because the eigenvalues were distinct, guaranteeing initial orthogonality of eigenvectors. The main work was careful calculation and normalization.

---

### Example 2: $3 \times 3$ symmetric matrix with distinct eigenvalues

**Problem:** Find an orthogonal matrix $P$ and a diagonal matrix $D$ such that $A = PDP^T$ for the matrix $A = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 2 & 1 \\ 0 & 1 & 2 \end{pmatrix}$.

**What's given:** A $3 \times 3$ symmetric matrix $A$.
**What we want:** The matrices $P$ and $D$.

**Solution:**

**Step 1: Find the eigenvalues of $A$.**
We solve $\det(A - \lambda I) = 0$.
$$A - \lambda I = \begin{pmatrix} 1-\lambda & 0 & 0 \\ 0 & 2-\lambda & 1 \\ 0 & 1 & 2-\lambda \end{pmatrix}$$
The determinant can be expanded along the first row:
$$\det(A - \lambda I) = (1-\lambda) \det \begin{pmatrix} 2-\lambda & 1 \\ 1 & 2-\lambda \end{pmatrix} - 0 + 0$$
$$= (1-\lambda) [ (2-\lambda)(2-\lambda) - (1)(1) ]$$
$$= (1-\lambda) [ (2-\lambda)^2 - 1 ] = 0$$
This gives us one eigenvalue directly:
1.  $1-\lambda = 0 \implies \lambda_1 = 1$
For the other eigenvalues, solve $(2-\lambda)^2 - 1 = 0$:
$$(2-\lambda)^2 = 1$$
$$2-\lambda = \pm 1$$
2.  $2-\lambda = 1 \implies \lambda_2 = 1$
3.  $2-\lambda = -1 \implies \lambda_3 = 3$
The eigenvalues are $\lambda_1 = 1$ (with algebraic multiplicity 2) and $\lambda_3 = 3$.

**Step 2: Find the eigenvectors corresponding to each eigenvalue.**

For $\lambda_1 = 1$ (repeated eigenvalue):
We solve $(A - 1I)\mathbf{x} = \mathbf{0}$.
$$\begin{pmatrix} 1-1 & 0 & 0 \\ 0 & 2-1 & 1 \\ 0 & 1 & 2-1 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} 0 & 0 & 0 \\ 0 & 1 & 1 \\ 0 & 1 & 1 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
The system of equations is:
$0x_1 + 0x_2 + 0x_3 = 0$ (This means $x_1$ is a free variable)
$x_2 + x_3 = 0 \implies x_2 = -x_3$
Let $x_1 = s$ (where $s$ is any real number) and $x_3 = t$ (where $t$ is any real number). Then $x_2 = -t$.
So, the eigenvectors are of the form $\begin{pmatrix} s \\ -t \\ t \end{pmatrix} = s \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} + t \begin{pmatrix} 0 \\ -1 \\ 1 \end{pmatrix}$.
We can choose two linearly independent eigenvectors for $\lambda_1 = 1$:
$\mathbf{v}_1 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$ (by setting $s=1, t=0$)
$\mathbf{v}_2 = \begin{pmatrix} 0 \\ -1 \\ 1 \end{pmatrix}$ (by setting $s=0, t=1$)

For $\lambda_3 = 3$:
We solve $(A - 3I)\mathbf{x} = \mathbf{0}$.
$$\begin{pmatrix} 1-3 & 0 & 0 \\ 0 & 2-3 & 1 \\ 0 & 1 & 2-3 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} -2 & 0 & 0 \\ 0 & -1 & 1 \\ 0 & 1 & -1 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
From the first row: $-2x_1 = 0 \implies x_1 = 0$.
From the second row: $-x_2 + x_3 = 0 \implies x_2 = x_3$.
Let $x_3 = r$. Then $x_2 = r$.
So, an eigenvector for $\lambda_3 = 3$ is $\mathbf{v}_3 = \begin{pmatrix} 0 \\ r \\ r \end{pmatrix}$. Let $r=1$:
$\mathbf{v}_3 = \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix}$.

**Step 3: Orthogonalize and normalize the eigenvectors.**

First, check orthogonality between eigenvectors from different eigenspaces:
$\mathbf{v}_1 \cdot \mathbf{v}_3 = (1)(0) + (0)(1) + (0)(1) = 0$. (Orthogonal)
$\mathbf{v}_2 \cdot \mathbf{v}_3 = (0)(0) + (-1)(1) + (1)(1) = -1 + 1 = 0$. (Orthogonal)
This is expected, as $\lambda_1=1$ and $\lambda_3=3$ are distinct eigenvalues.

Now, check orthogonality for eigenvectors within the same eigenspace ($\lambda_1=1$):
$\mathbf{v}_1 \cdot \mathbf{v}_2 = (1)(0) + (0)(-1) + (0)(1) = 0$.
In this lucky case, the chosen eigenvectors for the repeated eigenvalue are *already* orthogonal! No Gram-Schmidt needed for this specific set.

Now, normalize all eigenvectors:
$||\mathbf{v}_1|| = \sqrt{1^2 + 0^2 + 0^2} = \sqrt{1} = 1$. So, $\mathbf{u}_1 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$.
$||\mathbf{v}_2|| = \sqrt{0^2 + (-1)^2 + 1^2} = \sqrt{0+1+1} = \sqrt{2}$. So, $\mathbf{u}_2 = \frac{1}{\sqrt{2}} \begin{pmatrix} 0 \\ -1 \\ 1 \end{pmatrix} = \begin{pmatrix} 0 \\ -1/\sqrt{2} \\ 1/\sqrt{2} \end{pmatrix}$.
$||\mathbf{v}_3|| = \sqrt{0^2 + 1^2 + 1^2} = \sqrt{0+1+1} = \sqrt{2}$. So, $\mathbf{u}_3 = \frac{1}{\sqrt{2}} \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 0 \\ 1/\sqrt{2} \\ 1/\sqrt{2} \end{pmatrix}$.

**Step 4: Construct the matrices $P$ and $D$.**
$$P = \begin{pmatrix} 1 & 0 & 0 \\ 0 & -1/\sqrt{2} & 1/\sqrt{2} \\ 0 & 1/\sqrt{2} & 1/\sqrt{2} \end{pmatrix}$$
$$D = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 3 \end{pmatrix}$$
(Note: The order of $\lambda=1$ eigenvectors in $P$ and $D$ corresponds to $\mathbf{u}_1$ then $\mathbf{u}_2$. If we swapped them, $P$'s second and third columns would be swapped, and $D$'s second and third diagonal entries would be swapped. Both are valid.)

**Final Answer:**
$$P = \boxed{\begin{pmatrix} 1 & 0 & 0 \\ 0 & -1/\sqrt{2} & 1/\sqrt{2} \\ 0 & 1/\sqrt{2} & 1/\sqrt{2} \end{pmatrix}}$$
$$D = \boxed{\begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 3 \end{pmatrix}}$$

**Reflection:** This example involved a repeated eigenvalue. We were fortunate that the initial choice of basis vectors for the eigenspace of $\lambda=1$ was already orthogonal. If they hadn't been, we would have needed to apply Gram-Schmidt. This highlights the importance of checking orthogonality within eigenspaces for repeated eigenvalues.

---

### Example 3: $3 \times 3$ symmetric matrix with repeated eigenvalues requiring Gram-Schmidt

**Problem:** Find an orthogonal matrix $P$ and a diagonal matrix $D$ such that $A = PDP^T$ for the matrix $A = \begin{pmatrix} 2 & 2 & 0 \\ 2 & 2 & 0 \\ 0 & 0 & 1 \end{pmatrix}$.

**What's given:** A $3 \times 3$ symmetric matrix $A$.
**What we want:** The matrices $P$ and $D$.

**Solution:**

**Step 1: Find the eigenvalues of $A$.**
We solve $\det(A - \lambda I) = 0$.
$$A - \lambda I = \begin{pmatrix} 2-\lambda & 2 & 0 \\ 2 & 2-\lambda & 0 \\ 0 & 0 & 1-\lambda \end{pmatrix}$$
Expand along the third row/column (it has two zeros):
$$\det(A - \lambda I) = (1-\lambda) \det \begin{pmatrix} 2-\lambda & 2 \\ 2 & 2-\lambda \end{pmatrix} - 0 + 0$$
$$= (1-\lambda) [ (2-\lambda)(2-\lambda) - (2)(2) ]$$
$$= (1-\lambda) [ (2-\lambda)^2 - 4 ] = 0$$
This gives one eigenvalue:
1.  $1-\lambda = 0 \implies \lambda_1 = 1$
For the other eigenvalues, solve $(2-\lambda)^2 - 4 = 0$:
$$(2-\lambda)^2 = 4$$
$$2-\lambda = \pm 2$$
2.  $2-\lambda = 2 \implies \lambda_2 = 0$
3.  $2-\lambda = -2 \implies \lambda_3 = 4$
The eigenvalues are $\lambda_1 = 1$, $\lambda_2 = 0$, and $\lambda_3 = 4$. All are real and distinct.

**Wait!** My example description said "repeated eigenvalues". I need to fix the matrix or the problem statement. Let's make a new matrix with a repeated eigenvalue.

**Correction for Example 3:**
Let's use $A = \begin{pmatrix} 1 & 2 & 0 \\ 2 & 1 & 0 \\ 0 & 0 & 3 \end{pmatrix}$. This matrix is symmetric.

**Problem (Corrected):** Find an orthogonal matrix $P$ and a diagonal matrix $D$ such that $A = PDP^T$ for the matrix $A = \begin{pmatrix} 1 & 2 & 0 \\ 2 & 1 & 0 \\ 0 & 0 & 3 \end{pmatrix}$.

**Solution (Corrected):**

**Step 1: Find the eigenvalues of $A$.**
We solve $\det(A - \lambda I) = 0$.
$$A - \lambda I = \begin{pmatrix} 1-\lambda & 2 & 0 \\ 2 & 1-\lambda & 0 \\ 0 & 0 & 3-\lambda \end{pmatrix}$$
Expand along the third row/column:
$$\det(A - \lambda I) = (3-\lambda) \det \begin{pmatrix} 1-\lambda & 2 \\ 2 & 1-\lambda \end{pmatrix} - 0 + 0$$
$$= (3-\lambda) [ (1-\lambda)(1-\lambda) - (2)(2) ]$$
$$= (3-\lambda) [ (1-\lambda)^2 - 4 ] = 0$$
This gives one eigenvalue:
1.  $3-\lambda = 0 \implies \lambda_1 = 3$
For the other eigenvalues, solve $(1-\lambda)^2 - 4 = 0$:
$$(1-\lambda)^2 = 4$$
$$1-\lambda = \pm 2$$
2.  $1-\lambda = 2 \implies \lambda_2 = -1$
3.  $1-\lambda = -2 \implies \lambda_3 = 3$
The eigenvalues are $\lambda_1 = 3$ (with algebraic multiplicity 2) and $\lambda_2 = -1$.

**Step 2: Find the eigenvectors corresponding to each eigenvalue.**

For $\lambda_2 = -1$:
We solve $(A - (-1)I)\mathbf{x} = \mathbf{0}$.
$$\begin{pmatrix} 1-(-1) & 2 & 0 \\ 2 & 1-(-1) & 0 \\ 0 & 0 & 3-(-1) \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} 2 & 2 & 0 \\ 2 & 2 & 0 \\ 0 & 0 & 4 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
From the third row: $4x_3 = 0 \implies x_3 = 0$.
From the first (or second) row: $2x_1 + 2x_2 = 0 \implies x_1 = -x_2$.
Let $x_2 = 1$, then $x_1 = -1$.
So, an eigenvector for $\lambda_2 = -1$ is $\mathbf{v}_1 = \begin{pmatrix} -1 \\ 1 \\ 0 \end{pmatrix}$.

For $\lambda_1 = 3$ (repeated eigenvalue):
We solve $(A - 3I)\mathbf{x} = \mathbf{0}$.
$$\begin{pmatrix} 1-3 & 2 & 0 \\ 2 & 1-3 & 0 \\ 0 & 0 & 3-3 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} -2 & 2 & 0 \\ 2 & -2 & 0 \\ 0 & 0 & 0 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
From the first (or second) row: $-2x_1 + 2x_2 = 0 \implies x_1 = x_2$.
From the third row: $0x_3 = 0$. This means $x_3$ is a free variable.
Let $x_1 = s$ (then $x_2 = s$) and $x_3 = t$.
So, the eigenvectors are of the form $\begin{pmatrix} s \\ s \\ t \end{pmatrix} = s \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix} + t \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}$.
We can choose two linearly independent eigenvectors for $\lambda_1 = 3$:
$\mathbf{w}_1 = \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}$ (by setting $s=1, t=0$)
$\mathbf{w}_2 = \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}$ (by setting $s=0, t=1$)

**Step 3: Orthogonalize and normalize the eigenvectors.**

First, check orthogonality between eigenvectors from different eigenspaces:
$\mathbf{v}_1 \cdot \mathbf{w}_1 = (-1)(1) + (1)(1) + (0)(0) = -1 + 1 + 0 = 0$. (Orthogonal)
$\mathbf{v}_1 \cdot \mathbf{w}_2 = (-1)(0) + (1)(0) + (0)(1) = 0 + 0 + 0 = 0$. (Orthogonal)
This is expected, as $\lambda_2=-1$ and $\lambda_1=3$ are distinct eigenvalues.

Now, check orthogonality for eigenvectors within the same eigenspace ($\lambda_1=3$):
$\mathbf{w}_1 \cdot \mathbf{w}_2 = (1)(0) + (1)(0) + (0)(1) = 0$.
Again, these are *already* orthogonal! This is a common occurrence when the matrix has a block-diagonal structure or many zeros.

So, we have an orthogonal set of eigenvectors: $\{\mathbf{v}_1, \mathbf{w}_1, \mathbf{w}_2\}$.
Now, normalize them:
$||\mathbf{v}_1|| = \sqrt{(-1)^2 + 1^2 + 0^2} = \sqrt{2}$. So, $\mathbf{u}_1 = \frac{1}{\sqrt{2}} \begin{pmatrix} -1 \\ 1 \\ 0 \end{pmatrix} = \begin{pmatrix} -1/\sqrt{2} \\ 1/\sqrt{2} \\ 0 \end{pmatrix}$.
$||\mathbf{w}_1|| = \sqrt{1^2 + 1^2 + 0^2} = \sqrt{2}$. So, $\mathbf{u}_2 = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 1/\sqrt{2} \\ 1/\sqrt{2} \\ 0 \end{pmatrix}$.
$||\mathbf{w}_2|| = \sqrt{0^2 + 0^2 + 1^2} = \sqrt{1} = 1$. So, $\mathbf{u}_3 = \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}$.

**Step 4: Construct the matrices $P$ and $D$.**
Let's put the eigenvectors for $\lambda=3$ first, then the eigenvector for $\lambda=-1$.
$$P = \begin{pmatrix} 1/\sqrt{2} & 0 & -1/\sqrt{2} \\ 1/\sqrt{2} & 0 & 1/\sqrt{2} \\ 0 & 1 & 0 \end{pmatrix}$$
$$D = \begin{pmatrix} 3 & 0 & 0 \\ 0 & 3 & 0 \\ 0 & 0 & -1 \end{pmatrix}$$
(Note: The order of $\mathbf{u}_2, \mathbf{u}_3, \mathbf{u}_1$ in $P$ corresponds to eigenvalues $3, 3, -1$ in $D$).

**Final Answer:**
$$P = \boxed{\begin{pmatrix} 1/\sqrt{2} & 0 & -1/\sqrt{2} \\ 1/\sqrt{2} & 0 & 1/\sqrt{2} \\ 0 & 1 & 0 \end{pmatrix}}$$
$$D = \boxed{\begin{pmatrix} 3 & 0 & 0 \\ 0 & 3 & 0 \\ 0 & 0 & -1 \end{pmatrix}}$$

**Reflection:** Even though this example had a repeated eigenvalue, the chosen basis for its eigenspace happened to be orthogonal. This simplifies the process by skipping the explicit Gram-Schmidt step. However, it's crucial to always *check* for orthogonality within eigenspaces of repeated eigenvalues and be prepared to apply Gram-Schmidt if needed.

---

### Example 4: $3 \times 3$ symmetric matrix requiring Gram-Schmidt

**Problem:** Find an orthogonal matrix $P$ and a diagonal matrix $D$ such that $A = PDP^T$ for the matrix $A = \begin{pmatrix} 0 & 0 & 0 \\ 0 & 2 & 2 \\ 0 & 2 & 2 \end{pmatrix}$.

**What's given:** A $3 \times 3$ symmetric matrix $A$.
**What we want:** The matrices $P$ and $D$.

**Solution:**

**Step 1: Find the eigenvalues of $A$.**
We solve $\det(A - \lambda I) = 0$.
$$A - \lambda I = \begin{pmatrix} -\lambda & 0 & 0 \\ 0 & 2-\lambda & 2 \\ 0 & 2 & 2-\lambda \end{pmatrix}$$
Expand along the first row:
$$\det(A - \lambda I) = (-\lambda) \det \begin{pmatrix} 2-\lambda & 2 \\ 2 & 2-\lambda \end{pmatrix} - 0 + 0$$
$$= (-\lambda) [ (2-\lambda)^2 - 4 ] = 0$$
This gives one eigenvalue:
1.  $-\lambda = 0 \implies \lambda_1 = 0$
For the other eigenvalues, solve $(2-\lambda)^2 - 4 = 0$:
$$(2-\lambda)^2 = 4$$
$$2-\lambda = \pm 2$$
2.  $2-\lambda = 2 \implies \lambda_2 = 0$
3.  $2-\lambda = -2 \implies \lambda_3 = 4$
The eigenvalues are $\lambda_1 = 0$ (with algebraic multiplicity 2) and $\lambda_3 = 4$.

**Step 2: Find the eigenvectors corresponding to each eigenvalue.**

For $\lambda_3 = 4$:
We solve $(A - 4I)\mathbf{x} = \mathbf{0}$.
$$\begin{pmatrix} -4 & 0 & 0 \\ 0 & 2-4 & 2 \\ 0 & 2 & 2-4 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} -4 & 0 & 0 \\ 0 & -2 & 2 \\ 0 & 2 & -2 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
From the first row: $-4x_1 = 0 \implies x_1 = 0$.
From the second (or third) row: $-2x_2 + 2x_3 = 0 \implies x_2 = x_3$.
Let $x_3 = r$. Then $x_2 = r$.
So, an eigenvector for $\lambda_3 = 4$ is $\mathbf{v}_1 = \begin{pmatrix} 0 \\ r \\ r \end{pmatrix}$. Let $r=1$:
$\mathbf{v}_1 = \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix}$.

For $\lambda_1 = 0$ (repeated eigenvalue):
We solve $(A - 0I)\mathbf{x} = \mathbf{0}$, which is $A\mathbf{x} = \mathbf{0}$.
$$\begin{pmatrix} 0 & 0 & 0 \\ 0 & 2 & 2 \\ 0 & 2 & 2 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
From the first row: $0x_1 = 0$. This means $x_1$ is a free variable.
From the second (or third) row: $2x_2 + 2x_3 = 0 \implies x_2 = -x_3$.
Let $x_1 = s$ and $x_3 = t$. Then $x_2 = -t$.
So, the eigenvectors are of the form $\begin{pmatrix} s \\ -t \\ t \end{pmatrix} = s \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} + t \begin{pmatrix} 0 \\ -1 \\ 1 \end{pmatrix}$.
We choose two linearly independent eigenvectors for $\lambda_1 = 0$:
$\mathbf{w}_1 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$ (by setting $s=1, t=0$)
$\mathbf{w}_2 = \begin{pmatrix} 0 \\ -1 \\ 1 \end{pmatrix}$ (by setting $s=0, t=1$)

**Step 3: Orthogonalize and normalize the eigenvectors.**

First, check orthogonality between eigenvectors from different eigenspaces:
$\mathbf{v}_1 \cdot \mathbf{w}_1 = (0)(1) + (1)(0) + (1)(0) = 0$. (Orthogonal)
$\mathbf{v}_1 \cdot \mathbf{w}_2 = (0)(0) + (1)(-