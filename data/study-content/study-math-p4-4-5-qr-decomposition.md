## 1. What it is — in plain English

Imagine you have a messy collection of instructions for building something. Some instructions are redundant, some are unclear, and they don't follow a logical order. QR decomposition is like taking that messy set of instructions (which we call a matrix) and reorganizing it into two much cleaner, more useful sets.

The first set of instructions, let's call it $Q$, is like a perfectly organized, non-redundant blueprint. Each instruction in $Q$ is completely independent and points in a unique "direction" in your building plan, and they're all scaled to a standard size. Think of them as perfectly perpendicular and unit-length rulers. This $Q$ matrix represents a rotation or reflection, essentially just changing the orientation of your data without stretching or squishing it.

The second set, $R$, is like a step-by-step guide that tells you how to combine those clean, independent instructions from $Q$ to get back to your original messy plan. It's a "triangular" guide, meaning it builds things up in a specific, sequential order, like building a house from the foundation up, one layer at a time. It contains all the "stretching" and "scaling" information.

So, QR decomposition takes any matrix $A$ and breaks it down into $A = QR$. Here, $Q$ is a matrix with special properties (its columns are like those independent, unit-length, perpendicular rulers), and $R$ is an "upper triangular" matrix (all zeros below the main diagonal, like a step-by-step process). It's a fundamental way to simplify and understand the underlying structure of a matrix.

## 2. Why it matters — real-world applications

QR decomposition is far more than a theoretical curiosity; it's a workhorse in numerical linear algebra, underpinning many critical algorithms across science and engineering.

1.  **Solving Least Squares Problems (Machine Learning & Data Science):** In machine learning, particularly in linear regression, we often want to find the "best fit" line or hyperplane for a set of data points. This typically involves solving an overdetermined system of linear equations $A\mathbf{x} = \mathbf{b}$, where there might not be an exact solution. QR decomposition provides a numerically stable and efficient way to find the least squares solution (the $\mathbf{x}$ that minimizes $||A\mathbf{x} - \mathbf{b}||^2$). For example, a data scientist at **Google** building a predictive model might use QR decomposition to robustly fit a regression model to a large dataset, ensuring the model's parameters are calculated accurately even with noisy data.

2.  **Eigenvalue Computation (Physics & Engineering Simulations):** The QR algorithm, which repeatedly applies QR decomposition, is one of the most widely used methods for computing the eigenvalues and eigenvectors of a matrix. Eigenvalues are crucial in many fields:
    *   In **aerospace engineering**, **Boeing** or **Airbus** engineers use eigenvalues to analyze the stability of aircraft structures and control systems, predicting how a plane will respond to turbulence or control inputs.
    *   In **quantum mechanics**, eigenvalues represent possible energy levels of a system.
    *   In **structural engineering**, they determine natural frequencies of vibration for bridges or buildings, crucial for earthquake resistance.

3.  **Orthogonalization and Basis Transformation (Computer Graphics & Robotics):** Many algorithms in computer graphics (e.g., transforming objects, camera views) and robotics (e.g., calculating robot arm kinematics) require working with orthonormal bases. QR decomposition can take a set of basis vectors (the columns of $A$) and transform them into an orthonormal set (the columns of $Q$) while preserving the span of the original vectors. This is essential for ensuring that transformations don't introduce unwanted scaling or shearing, maintaining geometric integrity. For instance, a **Pixar** animator might use QR decomposition implicitly when calculating camera rotations or object orientations to ensure smooth, distortion-free motion.

4.  **Signal Processing (Telecommunications):** In telecommunications, signals often need to be separated or filtered. Techniques like adaptive beamforming, used in **Qualcomm**'s mobile chipsets for 5G, rely on creating orthogonal components of a signal. QR decomposition can be used to efficiently and stably orthogonalize incoming signals, helping to reduce interference and improve signal clarity, especially in multi-antenna systems (MIMO).

## 3. Prerequisites — what you must know first

Before diving into QR decomposition, ensure you have a solid grasp of these fundamental linear algebra concepts:

*   **Vectors:** Quantities with both magnitude and direction, often represented as columns of numbers.
*   **Matrices:** Rectangular arrays of numbers, used to represent linear transformations, systems of equations, and data.
*   **Matrix Multiplication:** The specific rule for multiplying two matrices, resulting in a new matrix.
*   **Dot Product (Inner Product):** A scalar value obtained from multiplying two vectors, related to the angle between them and their magnitudes. For $\mathbf{u} = [u_1, \dots, u_n]^T$ and $\mathbf{v} = [v_1, \dots, v_n]^T$, $\mathbf{u} \cdot \mathbf{v} = \sum_{i=1}^n u_i v_i$.
*   **Vector Norm (Magnitude):** The length of a vector, calculated as the square root of its dot product with itself. For $\mathbf{v}$, $||\mathbf{v}|| = \sqrt{\mathbf{v} \cdot \mathbf{v}}$.
*   **Unit Vector:** A vector with a magnitude of 1. Any non-zero vector can be normalized (divided by its magnitude) to become a unit vector.
*   **Orthogonal Vectors:** Two vectors are orthogonal if their dot product is zero, meaning they are perpendicular.
*   **Orthonormal Vectors:** A set of vectors that are all unit vectors and are mutually orthogonal. They form a particularly "nice" basis.
*   **Orthogonal Basis:** A basis where all basis vectors are mutually orthogonal.
*   **Orthonormal Basis:** A basis where all basis vectors are mutually orthonormal.
*   **Projection of a Vector:** Decomposing a vector into two components: one parallel to another vector, and one orthogonal to it. The projection of $\mathbf{v}$ onto $\mathbf{u}$ is $\text{proj}_{\mathbf{u}} \mathbf{v} = \frac{\mathbf{v} \cdot \mathbf{u}}{||\mathbf{u}||^2} \mathbf{u}$.
*   **Gram-Schmidt Process:** An algorithm for transforming a set of linearly independent vectors into an orthonormal set that spans the same subspace. This is *the* core algorithm for understanding QR decomposition.
*   **Matrix Transpose:** Flipping a matrix over its diagonal, turning rows into columns and vice-versa. Denoted $A^T$.
*   **Identity Matrix:** A square matrix with ones on the main diagonal and zeros elsewhere, denoted $I$. It acts like the number 1 in matrix multiplication.
*   **Inverse Matrix:** For a square matrix $A$, its inverse $A^{-1}$ satisfies $AA^{-1} = A^{-1}A = I$.
*   **Upper Triangular Matrix:** A square matrix where all entries below the main diagonal are zero.
*   **Linear Independence:** A set of vectors is linearly independent if no vector in the set can be written as a linear combination of the others.
*   **Span of Vectors:** The set of all possible linear combinations of a given set of vectors, forming a subspace.

## 4. The core idea — step by step

The core idea of QR decomposition is to transform a matrix $A$ into the product of an orthogonal matrix $Q$ and an upper triangular matrix $R$. This transformation is deeply linked to the Gram-Schmidt orthogonalization process.

### Step 1: Understand the Goal: $A = QR$

**Plain English:** We want to take any matrix $A$ and break it down into two special matrices: $Q$ and $R$. $Q$ will be a matrix whose columns are perfectly "straight" and "unit-sized" (orthonormal vectors), and $R$ will be a matrix that has zeros everywhere below its main diagonal.

**Small Concrete Example:**
Let's say we have a matrix $A = \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix}$. We want to find $Q = \begin{pmatrix} q_{11} & q_{12} \\ q_{21} & q_{22} \end{pmatrix}$ and $R = \begin{pmatrix} r_{11} & r_{12} \\ 0 & r_{22} \end{pmatrix}$ such that $A=QR$. The columns of $Q$, $\mathbf{q}_1 = \begin{pmatrix} q_{11} \\ q_{21} \end{pmatrix}$ and $\mathbf{q}_2 = \begin{pmatrix} q_{12} \\ q_{22} \end{pmatrix}$, must be orthonormal.

**Formal/Mathematical Version:**
Given an $m \times n$ matrix $A$ with linearly independent columns $\mathbf{a}_1, \mathbf{a}_2, \dots, \mathbf{a}_n$, we seek an $m \times n$ matrix $Q$ and an $n \times n$ upper triangular matrix $R$ such that $A = QR$.
The columns of $Q$, denoted $\mathbf{q}_1, \mathbf{q}_2, \dots, \mathbf{q}_n$, form an orthonormal basis for the column space of $A$. This means:
1.  **Orthogonality:** $\mathbf{q}_i \cdot \mathbf{q}_j = 0$ for $i \neq j$.
2.  **Normality (Unit Length):** $||\mathbf{q}_i|| = 1$ for all $i$.

The matrix $R$ will have the form:
$$ R = \begin{pmatrix} r_{11} & r_{12} & \dots & r_{1n} \\ 0 & r_{22} & \dots & r_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \dots & r_{nn} \end{pmatrix} $$

**What could go wrong:** If the columns of $A$ are not linearly independent, the standard Gram-Schmidt process (which we'll use to construct $Q$) will run into issues, producing a zero vector at some step. This means $A$ is not full rank. While QR decomposition still exists for rank-deficient matrices, its construction using Gram-Schmidt needs careful handling (e.g., skipping the zero vector and adjusting $R$). For simplicity, we usually assume full column rank for the basic Gram-Schmidt based QR.

### Step 2: The Role of an Orthogonal Matrix $Q$

**Plain English:** The matrix $Q$ is special because its columns are all unit vectors and are all perfectly perpendicular to each other. When you multiply by an orthogonal matrix, it's like rotating or reflecting things without stretching or squishing them. It preserves lengths and angles.

**Small Concrete Example:**
Consider $Q = \begin{pmatrix} \cos \theta & -\sin \theta \\ \sin \theta & \cos \theta \end{pmatrix}$. Its columns are $\mathbf{q}_1 = \begin{pmatrix} \cos \theta \\ \sin \theta \end{pmatrix}$ and $\mathbf{q}_2 = \begin{pmatrix} -\sin \theta \\ \cos \theta \end{pmatrix}$.
Let's check:
1.  $||\mathbf{q}_1|| = \sqrt{\cos^2 \theta + \sin^2 \theta} = \sqrt{1} = 1$.
2.  $||\mathbf{q}_2|| = \sqrt{(-\sin \theta)^2 + \cos^2 \theta} = \sqrt{\sin^2 \theta + \cos^2 \theta} = \sqrt{1} = 1$.
3.  $\mathbf{q}_1 \cdot \mathbf{q}_2 = (\cos \theta)(-\sin \theta) + (\sin \theta)(\cos \theta) = -\cos \theta \sin \theta + \sin \theta \cos \theta = 0$.
So, $Q$ is an orthogonal matrix.

**Formal/Mathematical Version:**
An $m \times n$ matrix $Q$ has orthonormal columns if and only if $Q^T Q = I_n$, where $I_n$ is the $n \times n$ identity matrix. If $Q$ is square ($m=n$), then $Q^T Q = I$ implies $Q^T = Q^{-1}$. Such a square matrix $Q$ is called an orthogonal matrix.

**What could go wrong:** Forgetting to normalize the vectors after making them orthogonal, or making a calculation error in the dot product, will result in $Q$ not being orthogonal, and thus $Q^T Q \neq I$.

### Step 3: The Role of an Upper Triangular Matrix $R$

**Plain English:** The matrix $R$ is called "upper triangular" because all the numbers below its main diagonal are zero. This structure is very useful for solving systems of equations because you can easily find the last variable, then the second-to-last, and so on (this is called back-substitution). In QR decomposition, $R$ captures how the original vectors $\mathbf{a}_i$ are built from the new orthonormal vectors $\mathbf{q}_i$.

**Small Concrete Example:**
If $R = \begin{pmatrix} 3 & 2 & 1 \\ 0 & 4 & 5 \\ 0 & 0 & 6 \end{pmatrix}$, this is an upper triangular matrix. Notice the zeros in the lower left.
If $R = \begin{pmatrix} 3 & 2 \\ 1 & 4 \end{pmatrix}$, this is *not* upper triangular because the entry $R_{21}=1$ is not zero.

**Formal/Mathematical Version:**
An $n \times n$ matrix $R = (r_{ij})$ is upper triangular if $r_{ij} = 0$ for all $i > j$.
When $A=QR$, the columns of $A$ can be expressed as linear combinations of the columns of $Q$:
$\mathbf{a}_j = r_{1j}\mathbf{q}_1 + r_{2j}\mathbf{q}_2 + \dots + r_{jj}\mathbf{q}_j$.
Crucially, $\mathbf{a}_j$ is a linear combination *only* of $\mathbf{q}_1, \dots, \mathbf{q}_j$, and not $\mathbf{q}_{j+1}, \dots, \mathbf{q}_n$. This is what gives $R$ its upper triangular form. The span of the first $k$ columns of $A$ is the same as the span of the first $k$ columns of $Q$: $\text{span}\{\mathbf{a}_1, \dots, \mathbf{a}_k\} = \text{span}\{\mathbf{q}_1, \dots, \mathbf{q}_k\}$.

**What could go wrong:** If $R$ is not upper triangular, then the decomposition is not a QR decomposition. This typically indicates an error in the Gram-Schmidt process or in how the elements of $R$ are computed.

### Step 4: Connecting to Gram-Schmidt Orthogonalization

**Plain English:** The magical connection between $A=QR$ and Gram-Schmidt is that Gram-Schmidt is precisely the process that takes the columns of $A$ (which might not be orthogonal) and turns them into the orthonormal columns of $Q$. The "coefficients" or "scaling factors" from this process then naturally form the $R$ matrix.

**Small Concrete Example:**
Let $A = \begin{pmatrix} \mathbf{a}_1 & \mathbf{a}_2 \end{pmatrix}$. Gram-Schmidt works by:
1.  Taking $\mathbf{a}_1$ and normalizing it to get $\mathbf{q}_1$.
2.  Taking $\mathbf{a}_2$, subtracting its projection onto $\mathbf{q}_1$ to get an orthogonal vector $\mathbf{v}_2$, then normalizing $\mathbf{v}_2$ to get $\mathbf{q}_2$.
The crucial insight is that $\mathbf{a}_1$ is a multiple of $\mathbf{q}_1$, and $\mathbf{a}_2$ is a linear combination of $\mathbf{q}_1$ and $\mathbf{q}_2$. These multiples and combinations directly give us the entries of $R$.

**Formal/Mathematical Version:**
Let $A = [\mathbf{a}_1 \ \mathbf{a}_2 \ \dots \ \mathbf{a}_n]$ be an $m \times n$ matrix with linearly independent columns.
The Gram-Schmidt process constructs an orthonormal set of vectors $\{\mathbf{q}_1, \dots, \mathbf{q}_n\}$ such that $\text{span}\{\mathbf{a}_1, \dots, \mathbf{a}_k\} = \text{span}\{\mathbf{q}_1, \dots, \mathbf{q}_k\}$ for $k=1, \dots, n$.

The steps are:
1.  $\mathbf{v}_1 = \mathbf{a}_1$
    $\mathbf{q}_1 = \frac{\mathbf{v}_1}{||\mathbf{v}_1||}$
2.  $\mathbf{v}_2 = \mathbf{a}_2 - \text{proj}_{\mathbf{q}_1} \mathbf{a}_2 = \mathbf{a}_2 - (\mathbf{a}_2 \cdot \mathbf{q}_1)\mathbf{q}_1$
    $\mathbf{q}_2 = \frac{\mathbf{v}_2}{||\mathbf{v}_2||}$
3.  For $k=3, \dots, n$:
    $\mathbf{v}_k = \mathbf{a}_k - \sum_{j=1}^{k-1} (\mathbf{a}_k \cdot \mathbf{q}_j)\mathbf{q}_j$
    $\mathbf{q}_k = \frac{\mathbf{v}_k}{||\mathbf{v}_k||}$

Now, we need to find $R$. Since $A=QR$, we can write $\mathbf{a}_j = \sum_{i=1}^j r_{ij}\mathbf{q}_i$.
By taking the dot product of $\mathbf{a}_j$ with $\mathbf{q}_i$ (for $i \le j$):
$\mathbf{a}_j \cdot \mathbf{q}_i = (\sum_{k=1}^j r_{kj}\mathbf{q}_k) \cdot \mathbf{q}_i$
Due to orthonormality ($\mathbf{q}_k \cdot \mathbf{q}_i = 0$ if $k \neq i$, and $1$ if $k=i$):
$\mathbf{a}_j \cdot \mathbf{q}_i = r_{ij}(\mathbf{q}_i \cdot \mathbf{q}_i) = r_{ij}$.
So, the entries of $R$ are given by $r_{ij} = \mathbf{a}_j \cdot \mathbf{q}_i$ for $i < j$.
What about the diagonal elements $r_{ii}$?
From $\mathbf{v}_i = \mathbf{a}_i - \sum_{j=1}^{i-1} (\mathbf{a}_i \cdot \mathbf{q}_j)\mathbf{q}_j$, we have $\mathbf{a}_i = \mathbf{v}_i + \sum_{j=1}^{i-1} (\mathbf{a}_i \cdot \mathbf{q}_j)\mathbf{q}_j$.
Since $\mathbf{q}_i = \frac{\mathbf{v}_i}{||\mathbf{v}_i||}$, we have $\mathbf{v}_i = ||\mathbf{v}_i|| \mathbf{q}_i$.
So, $\mathbf{a}_i = ||\mathbf{v}_i|| \mathbf{q}_i + \sum_{j=1}^{i-1} (\mathbf{a}_i \cdot \mathbf{q}_j)\mathbf{q}_j$.
Comparing this to $\mathbf{a}_i = \sum_{j=1}^i r_{ji}\mathbf{q}_j$, we find:
$r_{ii} = ||\mathbf{v}_i||$
$r_{ji} = \mathbf{a}_i \cdot \mathbf{q}_j$ for $j < i$.
And $r_{ji} = 0$ for $j > i$ (this is because $\mathbf{a}_i$ is orthogonal to $\mathbf{q}_j$ for $j > i$ or more simply, $\mathbf{a}_i \in \text{span}\{\mathbf{q}_1, \dots, \mathbf{q}_i\}$).
So, the matrix $R$ can be constructed with these values.

**What could go wrong:** Incorrectly calculating dot products or magnitudes. Forgetting that $r_{ij} = \mathbf{a}_j \cdot \mathbf{q}_i$ for off-diagonal elements and $r_{ii} = ||\mathbf{v}_i||$ for diagonal elements.

### Step 5: The Algorithm for QR Decomposition (Gram-Schmidt Method)

**Plain English:** To find $Q$ and $R$:
1.  Take the first column of $A$, make it a unit vector. This is your first column of $Q$. The length you divided by becomes the first diagonal entry of $R$.
2.  Take the second column of $A$. Subtract any part of it that points in the direction of the first column of $Q$. What's left is perpendicular to the first column of $Q$. Make this leftover vector a unit vector. This is your second column of $Q$. The length you divided by becomes the second diagonal entry of $R$. The amount you subtracted in the first step becomes an off-diagonal entry of $R$.
3.  Repeat this process for all columns of $A$. For each column, make it orthogonal to all *previously found* $Q$ columns, then normalize it.

**Formal/Mathematical Version:**
Given an $m \times n$ matrix $A = [\mathbf{a}_1 \ \mathbf{a}_2 \ \dots \ \mathbf{a}_n]$ with linearly independent columns.
Initialize $Q$ as an $m \times n$ matrix and $R$ as an $n \times n$ matrix.

For $j = 1, \dots, n$:
1.  Let $\mathbf{v}_j = \mathbf{a}_j$.
2.  For $k = 1, \dots, j-1$:
    Calculate $r_{kj} = \mathbf{a}_j \cdot \mathbf{q}_k$. (This is the projection coefficient)
    Subtract the projection: $\mathbf{v}_j = \mathbf{v}_j - r_{kj}\mathbf{q}_k$.
3.  Calculate $r_{jj} = ||\mathbf{v}_j||$. (This is the length of the orthogonalized vector)
4.  If $r_{jj} = 0$, then the columns of $A$ are linearly dependent. The Gram-Schmidt process stops or needs modification. (Assuming full rank for now)
5.  Set $\mathbf{q}_j = \frac{\mathbf{v}_j}{r_{jj}}$. (Normalize to get the $j$-th orthonormal column)
6.  Set $r_{ij} = 0$ for $i > j$. (These elements are always zero in $R$)

The matrix $Q$ will have columns $\mathbf{q}_1, \dots, \mathbf{q}_n$.
The matrix $R$ will have entries $r_{ij}$ calculated above.

**What could go wrong:** Off-by-one errors in loops, especially when calculating projections (e.g., projecting onto $\mathbf{a}_k$ instead of $\mathbf{q}_k$). Forgetting to normalize at the end of each step for $Q$ and to use the norm for the diagonal elements of $R$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Small, Full Rank, Square Matrix

**Problem:** Find the QR decomposition of the matrix $A = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}$.

**Given:** Matrix $A = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}$.
**Want:** Matrices $Q$ (orthogonal) and $R$ (upper triangular) such that $A = QR$.

Let the columns of $A$ be $\mathbf{a}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $\mathbf{a}_2 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.

**Step 1: Process $\mathbf{a}_1$ to find $\mathbf{q}_1$ and $r_{11}$.**
*   **Plain English:** Take the first column of $A$, find its length, and then divide the vector by its length to make it a unit vector. The length becomes the first diagonal entry of $R$.
*   $\mathbf{v}_1 = \mathbf{a}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$
*   Calculate $r_{11} = ||\mathbf{v}_1|| = \sqrt{1^2 + 1^2} = \sqrt{2}$.
*   Normalize $\mathbf{v}_1$ to get $\mathbf{q}_1$:
    $$ \mathbf{q}_1 = \frac{\mathbf{v}_1}{r_{11}} = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 1/\sqrt{2} \\ 1/\sqrt{2} \end{pmatrix} $$
    This is our first column of $Q$.

**Step 2: Process $\mathbf{a}_2$ to find $\mathbf{q}_2$, $r_{12}$, and $r_{22}$.**
*   **Plain English:** Take the second column of $A$. First, remove any part of it that points in the direction of $\mathbf{q}_1$. This gives us a vector $\mathbf{v}_2$ that is perpendicular to $\mathbf{q}_1$. Then, find the length of $\mathbf{v}_2$ and divide by it to get $\mathbf{q}_2$. The length becomes $r_{22}$, and the amount we "removed" from $\mathbf{a}_2$ (the projection coefficient) becomes $r_{12}$.
*   Calculate $r_{12} = \mathbf{a}_2 \cdot \mathbf{q}_1$:
    $$ r_{12} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \cdot \begin{pmatrix} 1/\sqrt{2} \\ 1/\sqrt{2} \end{pmatrix} = (1)(1/\sqrt{2}) + (0)(1/\sqrt{2}) = 1/\sqrt{2} $$
*   Find the component of $\mathbf{a}_2$ orthogonal to $\mathbf{q}_1$:
    $$ \mathbf{v}_2 = \mathbf{a}_2 - r_{12}\mathbf{q}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix} - \frac{1}{\sqrt{2}} \begin{pmatrix} 1/\sqrt{2} \\ 1/\sqrt{2} \end{pmatrix} $$
    $$ \mathbf{v}_2 = \begin{pmatrix} 1 \\ 0 \end{pmatrix} - \begin{pmatrix} 1/2 \\ 1/2 \end{pmatrix} = \begin{pmatrix} 1/2 \\ -1/2 \end{pmatrix} $$
*   Calculate $r_{22} = ||\mathbf{v}_2||$:
    $$ r_{22} = \sqrt{(1/2)^2 + (-1/2)^2} = \sqrt{1/4 + 1/4} = \sqrt{2/4} = \sqrt{1/2} = 1/\sqrt{2} $$
*   Normalize $\mathbf{v}_2$ to get $\mathbf{q}_2$:
    $$ \mathbf{q}_2 = \frac{\mathbf{v}_2}{r_{22}} = \frac{1}{1/\sqrt{2}} \begin{pmatrix} 1/2 \\ -1/2 \end{pmatrix} = \sqrt{2} \begin{pmatrix} 1/2 \\ -1/2 \end{pmatrix} = \begin{pmatrix} \sqrt{2}/2 \\ -\sqrt{2}/2 \end{pmatrix} = \begin{pmatrix} 1/\sqrt{2} \\ -1/\sqrt{2} \end{pmatrix} $$
    This is our second column of $Q$.

**Step 3: Construct $Q$ and $R$.**
*   **Plain English:** Assemble the $Q$ matrix from the $\mathbf{q}_i$ vectors and the $R$ matrix from the $r_{ij}$ values we calculated. Remember $R$ must be upper triangular.
*   The matrix $Q$ is formed by columns $\mathbf{q}_1$ and $\mathbf{q}_2$:
    $$ Q = \begin{pmatrix} 1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & -1/\sqrt{2} \end{pmatrix} $$
*   The matrix $R$ is formed by $r_{11}, r_{12}, r_{22}$ and $r_{21}=0$:
    $$ R = \begin{pmatrix} r_{11} & r_{12} \\ 0 & r_{22} \end{pmatrix} = \begin{pmatrix} \sqrt{2} & 1/\sqrt{2} \\ 0 & 1/\sqrt{2} \end{pmatrix} $$

**Final Answer:**
The QR decomposition of $A = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}$ is:
$$ \boxed{ Q = \begin{pmatrix} 1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & -1/\sqrt{2} \end{pmatrix}, \quad R = \begin{pmatrix} \sqrt{2} & 1/\sqrt{2} \\ 0 & 1/\sqrt{2} \end{pmatrix} } $$

**Reflection:** This example was straightforward because it was a $2 \times 2$ matrix with simple numbers. The main challenge was careful calculation of square roots and fractions. It clearly demonstrated how Gram-Schmidt directly constructs $Q$ and $R$.

### Example 2: Rectangular Matrix (More Rows than Columns)

**Problem:** Find the QR decomposition of the matrix $A = \begin{pmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{pmatrix}$.

**Given:** Matrix $A = \begin{pmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{pmatrix}$.
**Want:** Matrices $Q$ ($3 \times 2$ with orthonormal columns) and $R$ ($2 \times 2$ upper triangular) such that $A = QR$.

Let the columns of $A$ be $\mathbf{a}_1 = \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}$ and $\mathbf{a}_2 = \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix}$.

**Step 1: Process $\mathbf{a}_1$ to find $\mathbf{q}_1$ and $r_{11}$.**
*   **Plain English:** Same as before, normalize the first column of $A$.
*   $\mathbf{v}_1 = \mathbf{a}_1 = \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}$
*   Calculate $r_{11} = ||\mathbf{v}_1|| = \sqrt{1^2 + 1^2 + 1^2} = \sqrt{3}$.
*   Normalize $\mathbf{v}_1$ to get $\mathbf{q}_1$:
    $$ \mathbf{q}_1 = \frac{\mathbf{v}_1}{r_{11}} = \frac{1}{\sqrt{3}} \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 1/\sqrt{3} \\ 1/\sqrt{3} \\ 1/\sqrt{3} \end{pmatrix} $$
    This is our first column of $Q$.

**Step 2: Process $\mathbf{a}_2$ to find $\mathbf{q}_2$, $r_{12}$, and $r_{22}$.**
*   **Plain English:** Remove the component of $\mathbf{a}_2$ that lies in the direction of $\mathbf{q}_1$, then normalize the remaining vector.
*   Calculate $r_{12} = \mathbf{a}_2 \cdot \mathbf{q}_1$:
    $$ r_{12} = \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix} \cdot \begin{pmatrix} 1/\sqrt{3} \\ 1/\sqrt{3} \\ 1/\sqrt{3} \end{pmatrix} = (0)(1/\sqrt{3}) + (1)(1/\sqrt{3}) + (2)(1/\sqrt{3}) = 3/\sqrt{3} = \sqrt{3} $$
*   Find the component of $\mathbf{a}_2$ orthogonal to $\mathbf{q}_1$:
    $$ \mathbf{v}_2 = \mathbf{a}_2 - r_{12}\mathbf{q}_1 = \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix} - \sqrt{3} \begin{pmatrix} 1/\sqrt{3} \\ 1/\sqrt{3} \\ 1/\sqrt{3} \end{pmatrix} $$
    $$ \mathbf{v}_2 = \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix} - \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} = \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix} $$
*   Calculate $r_{22} = ||\mathbf{v}_2||$:
    $$ r_{22} = \sqrt{(-1)^2 + 0^2 + 1^2} = \sqrt{1 + 0 + 1} = \sqrt{2} $$
*   Normalize $\mathbf{v}_2$ to get $\mathbf{q}_2$:
    $$ \mathbf{q}_2 = \frac{\mathbf{v}_2}{r_{22}} = \frac{1}{\sqrt{2}} \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix} = \begin{pmatrix} -1/\sqrt{2} \\ 0 \\ 1/\sqrt{2} \end{pmatrix} $$
    This is our second column of $Q$.

**Step 3: Construct $Q$ and $R$.**
*   **Plain English:** Assemble $Q$ from $\mathbf{q}_1, \mathbf{q}_2$ and $R$ from $r_{ij}$ values.
*   The matrix $Q$ is formed by columns $\mathbf{q}_1$ and $\mathbf{q}_2$:
    $$ Q = \begin{pmatrix} 1/\sqrt{3} & -1/\sqrt{2} \\ 1/\sqrt{3} & 0 \\ 1/\sqrt{3} & 1/\sqrt{2} \end{pmatrix} $$
*   The matrix $R$ is formed by $r_{11}, r_{12}, r_{22}$ and $r_{21}=0$:
    $$ R = \begin{pmatrix} r_{11} & r_{12} \\ 0 & r_{22} \end{pmatrix} = \begin{pmatrix} \sqrt{3} & \sqrt{3} \\ 0 & \sqrt{2} \end{pmatrix} $$

**Final Answer:**
The QR decomposition of $A = \begin{pmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{pmatrix}$ is:
$$ \boxed{ Q = \begin{pmatrix} 1/\sqrt{3} & -1/\sqrt{2} \\ 1/\sqrt{3} & 0 \\ 1/\sqrt{3} & 1/\sqrt{2} \end{pmatrix}, \quad R = \begin{pmatrix} \sqrt{3} & \sqrt{3} \\ 0 & \sqrt{2} \end{pmatrix} } $$

**Reflection:** This example shows that QR decomposition works for rectangular matrices as well, as long as the columns are linearly independent. The dimensions of $Q$ and $R$ adjust accordingly ($Q$ is $m \times n$, $R$ is $n \times n$). The arithmetic becomes slightly more involved with more terms in the dot products and norms.

### Example 3: $3 \times 3$ Matrix

**Problem:** Find the QR decomposition of $A = \begin{pmatrix} 1 & 2 & 1 \\ 0 & 1 & 0 \\ 1 & 1 & 1 \end{pmatrix}$.

**Given:** Matrix $A = \begin{pmatrix} 1 & 2 & 1 \\ 0 & 1 & 0 \\ 1 & 1 & 1 \end{pmatrix}$.
**Want:** Matrices $Q$ ($3 \times 3$ orthogonal) and $R$ ($3 \times 3$ upper triangular) such that $A = QR$.

Let the columns of $A$ be $\mathbf{a}_1 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}$, $\mathbf{a}_2 = \begin{pmatrix} 2 \\ 1 \\ 1 \end{pmatrix}$, and $\mathbf{a}_3 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}$.

**Step 1: Process $\mathbf{a}_1$ to find $\mathbf{q}_1$ and $r_{11}$.**
*   $\mathbf{v}_1 = \mathbf{a}_1 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}$
*   $r_{11} = ||\mathbf{v}_1|| = \sqrt{1^2 + 0^2 + 1^2} = \sqrt{2}$.
*   $\mathbf{q}_1 = \frac{\mathbf{v}_1}{r_{11}} = \begin{pmatrix} 1/\sqrt{2} \\ 0 \\ 1/\sqrt{2} \end{pmatrix}$.

**Step 2: Process $\mathbf{a}_2$ to find $\mathbf{q}_2$, $r_{12}$, and $r_{22}$.**
*   Calculate $r_{12} = \mathbf{a}_2 \cdot \mathbf{q}_1$:
    $$ r_{12} = \begin{pmatrix} 2 \\ 1 \\ 1 \end{pmatrix} \cdot \begin{pmatrix} 1/\sqrt{2} \\ 0 \\ 1/\sqrt{2} \end{pmatrix} = (2)(1/\sqrt{2}) + (1)(0) + (1)(1/\sqrt{2}) = 2/\sqrt{2} + 1/\sqrt{2} = 3/\sqrt{2} $$
*   Find the component of $\mathbf{a}_2$ orthogonal to $\mathbf{q}_1$:
    $$ \mathbf{v}_2 = \mathbf{a}_2 - r_{12}\mathbf{q}_1 = \begin{pmatrix} 2 \\ 1 \\ 1 \end{pmatrix} - \frac{3}{\sqrt{2}} \begin{pmatrix} 1/\sqrt{2} \\ 0 \\ 1/\sqrt{2} \end{pmatrix} $$
    $$ \mathbf{v}_2 = \begin{pmatrix} 2 \\ 1 \\ 1 \end{pmatrix} - \begin{pmatrix} 3/2 \\ 0 \\ 3/2 \end{pmatrix} = \begin{pmatrix} 2 - 3/2 \\ 1 - 0 \\ 1 - 3/2 \end{pmatrix} = \begin{pmatrix} 1/2 \\ 1 \\ -1/2 \end{pmatrix} $$
*   Calculate $r_{22} = ||\mathbf{v}_2||$:
    $$ r_{22} = \sqrt{(1/2)^2 + 1^2 + (-1/2)^2} = \sqrt{1/4 + 1 + 1/4} = \sqrt{1/2 + 1} = \sqrt{3/2} $$
*   Normalize $\mathbf{v}_2$ to get $\mathbf{q}_2$:
    $$ \mathbf{q}_2 = \frac{\mathbf{v}_2}{r_{22}} = \frac{1}{\sqrt{3/2}} \begin{pmatrix} 1/2 \\ 1 \\ -1/2 \end{pmatrix} = \sqrt{2/3} \begin{pmatrix} 1/2 \\ 1 \\ -1/2 \end{pmatrix} = \begin{pmatrix} 1/\sqrt{6} \\ \sqrt{2/3} \\ -1/\sqrt{6} \end{pmatrix} $$

**Step 3: Process $\mathbf{a}_3$ to find $\mathbf{q}_3$, $r_{13}$, $r_{23}$, and $r_{33}$.**
*   **Plain English:** Remove components of $\mathbf{a}_3$ that point in directions of $\mathbf{q}_1$ and $\mathbf{q}_2$. Then normalize.
*   Calculate $r_{13} = \mathbf{a}_3 \cdot \mathbf{q}_1$:
    $$ r_{13} = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} \cdot \begin{pmatrix} 1/\sqrt{2} \\ 0 \\ 1/\sqrt{2} \end{pmatrix} = (1)(1/\sqrt{2}) + (0)(0) + (1)(1/\sqrt{2}) = 2/\sqrt{2} = \sqrt{2} $$
*   Calculate $r_{23} = \mathbf{a}_3 \cdot \mathbf{q}_2$:
    $$ r_{23} = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} \cdot \begin{pmatrix} 1/\sqrt{6} \\ \sqrt{2/3} \\ -1/\sqrt{6} \end{pmatrix} = (1)(1/\sqrt{6}) + (0)(\sqrt{2/3}) + (1)(-1/\sqrt{6}) = 1/\sqrt{6} - 1/\sqrt{6} = 0 $$
*   Find the component of $\mathbf{a}_3$ orthogonal to $\mathbf{q}_1$ and $\mathbf{q}_2$:
    $$ \mathbf{v}_3 = \mathbf{a}_3 - r_{13}\mathbf{q}_1 - r_{23}\mathbf{q}_2 $$
    $$ \mathbf{v}_3 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} - \sqrt{2} \begin{pmatrix} 1/\sqrt{2} \\ 0 \\ 1/\sqrt{2} \end{pmatrix} - 0 \cdot \mathbf{q}_2 $$
    $$ \mathbf{v}_3 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} - \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} - \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix} $$
*   Calculate $r_{33} = ||\mathbf{v}_3||$:
    $$ r_{33} = ||\begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}|| = 0 $$
*   **What went wrong here?** We got a zero vector for $\mathbf{v}_3$. This means that $\mathbf{a}_3$ is linearly dependent on $\mathbf{q}_1$ and $\mathbf{q}_2$ (and therefore on $\mathbf{a}_1$ and $\mathbf{a}_2$). Indeed, $\mathbf{a}_3 = \mathbf{a}_1$.
    In this case, the matrix $A$ is rank-deficient. The standard Gram-Schmidt process as presented assumes linearly independent columns.
    When $r_{jj}=0$, it means that $\mathbf{a}_j$ is already in the span of $\mathbf{q}_1, \dots, \mathbf{q}_{j-1}$.
    For a "full" QR decomposition (where $Q$ is square $m \times m$ and $R$ is $m \times n$), one would typically pad $Q$ with arbitrary orthonormal vectors to complete the basis, and $R$ would have a row of zeros.
    For the "reduced" QR decomposition (where $Q$ is $m \times n$ and $R$ is $n \times n$), if $r_{jj}=0$, it indicates that $A$ does not have full column rank. We cannot form an orthonormal $\mathbf{q}_j$ from a zero vector.
    Let's re-evaluate the problem statement. If the problem asks for *a* QR decomposition, we can still proceed by recognizing the rank deficiency.

**Revised Step 3 (Handling Rank Deficiency):**
Since $\mathbf{v}_3 = \mathbf{0}$, $\mathbf{a}_3$ is linearly dependent on $\mathbf{a}_1$ and $\mathbf{a}_2$.
This means $A$ does not have full column rank. In this case, $r_{33}$ is $0$.
The column $\mathbf{q}_3$ cannot be uniquely determined by Gram-Schmidt in this way.
For a "reduced" QR decomposition where $Q$ has the same number of columns as $A$, if a column is linearly dependent, the standard Gram-Schmidt method fails to produce an orthonormal column.
However, we can still define $R$ with $r_{33}=0$. The matrix $Q$ will then only have two orthonormal columns.
If we need $Q$ to be $3 \times 3$, we would need to find a $\mathbf{q}_3$ that is orthogonal to $\mathbf{q}_1$ and $\mathbf{q}_2$ and has unit length, and then $r_{13}, r_{23}, r_{33}$ would be adjusted. But this is beyond the simple Gram-Schmidt process for the *reduced* QR.

Let's assume the question implicitly asks for the *reduced* QR, where $Q$ has the same dimensions as $A$. In this case, since $\mathbf{a}_3 = \mathbf{a}_1$, the matrix $A$ is rank-deficient.
The standard Gram-Schmidt process yields:
$\mathbf{q}_1 = \begin{pmatrix} 1/\sqrt{2} \\ 0 \\ 1/\sqrt{2} \end{pmatrix}$
$\mathbf{q}_2 = \begin{pmatrix} 1/\sqrt{6} \\ \sqrt{2/3} \\ -1/\sqrt{6} \end{pmatrix}$
And $r_{11}=\sqrt{2}$, $r_{12}=3/\sqrt{2}$, $r_{22}=\sqrt{3/2}$.
Also, $r_{13}=\sqrt{2}$ and $r_{23}=0$.
Since $\mathbf{a}_3$ is linearly dependent, we cannot find a unique $\mathbf{q}_3$ from $\mathbf{v}_3 = \mathbf{0}$.
In this scenario, the "reduced" QR decomposition is often defined for full column rank matrices.
If we were to proceed, the $R$ matrix would be:
$$ R = \begin{pmatrix} \sqrt{2} & 3/\sqrt{2} & \sqrt{2} \\ 0 & \sqrt{3/2} & 0 \\ 0 & 0 & 0 \end{pmatrix} $$
And $Q$ would only have the first two columns. If $Q$ must be $3 \times 3$, we'd need to find a third orthonormal vector that completes the basis for $\mathbb{R}^3$. For example, a vector orthogonal to $\mathbf{q}_1$ and $\mathbf{q}_2$.
Let's find a vector $\mathbf{x} = (x,y,z)^T$ such that $\mathbf{x} \cdot \mathbf{q}_1 = 0$ and $\mathbf{x} \cdot \mathbf{q}_2 = 0$.
$\mathbf{x} \cdot \mathbf{q}_1 = x/\sqrt{2} + z/\sqrt{2} = 0 \Rightarrow x+z=0 \Rightarrow z=-x$.
$\mathbf{x} \cdot \mathbf{q}_2 = x/\sqrt{6} + y\sqrt{2/3} - z/\sqrt{6} = 0$.
Substitute $z=-x$: $x/\sqrt{6} + y\sqrt{2/3} - (-x)/\sqrt{6} = 0 \Rightarrow 2x/\sqrt{6} + y\sqrt{2/3} = 0$.
$2x/\sqrt{6} + y(2/\sqrt{6}) = 0 \Rightarrow 2x + 2y = 0 \Rightarrow y=-x$.
So, $\mathbf{x} = (x, -x, -x)^T$. Let $x=1$, then $\mathbf{x} = (1, -1, -1)^T$.
Normalize $\mathbf{x}$: $||\mathbf{x}|| = \sqrt{1^2+(-1)^2+(-1)^2} = \sqrt{3}$.
So, $\mathbf{q}_3 = (1/\sqrt{3}, -1/\sqrt{3}, -1/\sqrt{3})^T$.
This $\mathbf{q}_3$ would be an arbitrary choice to complete $Q$ to a square orthogonal matrix.
However, the problem statement implies a direct Gram-Schmidt application. When Gram-Schmidt produces a zero vector, it means the original columns were linearly dependent, and the algorithm for reduced QR (where $Q$ has $n$ columns) essentially stops or indicates this.

Let's assume the question expects the standard Gram-Schmidt derived $Q$ and $R$, which for full column rank matrices. If a matrix is rank deficient, the $R$ matrix will have zeros on its diagonal.

**Revised Final Answer (acknowledging rank deficiency):**
The matrix $A$ is rank-deficient because $\mathbf{a}_3 = \mathbf{a}_1$.
The Gram-Schmidt process proceeds as above, giving:
$$ \mathbf{q}_1 = \begin{pmatrix} 1/\sqrt{2} \\ 0 \\ 1/\sqrt{2} \end{pmatrix}, \quad \mathbf{q}_2 = \begin{pmatrix} 1/\sqrt{6} \\ \sqrt{2/3} \\ -1/\sqrt{6} \end{pmatrix} $$
And the $R$ matrix elements (calculated as $r_{ij} = \mathbf{a}_j \cdot \mathbf{q}_i$ for $i<j$ and $r_{ii} = ||\mathbf{v}_i||$):
$r_{11} = \sqrt{2}$
$r_{12} = 3/\sqrt{2}$
$r_{22} = \sqrt{3/2}$
$r_{13} = \mathbf{a}_3 \cdot \mathbf{q}_1 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} \cdot \begin{pmatrix} 1/\sqrt{2} \\ 0 \\ 1/\sqrt{2} \end{pmatrix} = \sqrt{2}$
$r_{23} = \mathbf{a}_3 \cdot \mathbf{q}_2 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} \cdot \begin{pmatrix} 1/\sqrt{6} \\ \sqrt{2/3} \\ -1/\sqrt{6} \end{pmatrix} = 0$
$r_{33} = ||\mathbf{v}_3|| = 0$ (since $\mathbf{v}_3 = \mathbf{0}$)

So, $Q$ would be a $3 \times 2$ matrix containing $\mathbf{q}_1, \mathbf{q}_2$:
$$ Q = \begin{pmatrix} 1/\sqrt{2} & 1/\sqrt{6} \\ 0 & \sqrt{2/3} \\ 1/\sqrt{2} & -1/\sqrt{6} \end{pmatrix} $$
And $R$ would be a $2 \times 3$ matrix (if $A=QR$ where $Q$ is $m \times k$ and $R$ is $k \times n$, where $k$ is the rank). This is the "economy" or "reduced" QR.
However, the problem statement often implies $R$ is square $n \times n$. In this case, $Q$ is $m \times n$. If $A$ is rank-deficient, Gram-Schmidt will produce a zero vector $\mathbf{v}_j$ and thus $r_{jj}=0$. The corresponding column $\mathbf{q}_j$ cannot be uniquely defined by normalization.
A common approach for rank-deficient $A$ with Gram-Schmidt is to set $\mathbf{q}_j = \mathbf{0}$ if $\mathbf{v}_j = \mathbf{0}$. But then $Q$ is not orthogonal.
A better approach for rank-deficient matrices is usually to use Householder reflections or Givens rotations, or to use a modified Gram-Schmidt algorithm that explicitly handles zeros.

For this problem, given the direct Gram-Schmidt method, the best way to present it is to show the $r_{33}=0$ and acknowledge the linear dependence.
$$ \boxed{ Q = \begin{pmatrix} 1/\sqrt{2} & 1/\sqrt{6} \\ 0 & \sqrt{2/3} \\ 1/\sqrt{2} & -1/\sqrt{6} \end{pmatrix}, \quad R = \begin{pmatrix} \sqrt{2} & 3/\sqrt{2} & \sqrt{2} \\ 0 & \sqrt{3/2} & 0 \\ 0 & 0 & 0 \end{pmatrix} } $$
Note: The product $QR$ will correctly yield $A$. However, the $Q$ here is $3 \times 2$ and its columns are orthonormal, but it is not a square orthogonal matrix. This is the "economy" QR decomposition. If a square $Q$ is required, then the third column of $Q$ would be an arbitrary unit vector orthogonal to $\mathbf{q}_1, \mathbf{q}_2$.

**Reflection:** This example was tricky because $A$ was rank-deficient. The Gram-Schmidt process naturally revealed this by producing a zero vector $\mathbf{v}_3$, leading to $r_{33}=0$. It highlights that the standard Gram-Schmidt (for reduced QR) assumes full column rank. If the matrix is rank-deficient, the $R$ matrix will have zeros on its diagonal, and the $Q$ matrix (if it's $m \times n$) will still have orthonormal columns, but the decomposition might not be unique in terms of completing $Q$ to a square orthogonal matrix.

### Example 4: $3 \times 2$ Matrix with potentially confusing numbers

**Problem:** Find the QR decomposition of $A = \begin{pmatrix} 3 & -1 \\ 4 & 2 \\ 0 & 5 \end{pmatrix}$.

**Given:** Matrix $A = \begin{pmatrix} 3 & -1 \\ 4 & 2 \\ 0 & 5 \end{pmatrix}$.
**Want:** Matrices $Q$ ($3 \times 2$ with orthonormal columns) and $R$ ($2 \times 2$ upper triangular) such that $A = QR$.

Let the columns of $A$ be $\mathbf{a}_1 = \begin{pmatrix} 3 \\ 4 \\ 0 \end{pmatrix}$ and $\mathbf{a}_2 = \begin{pmatrix} -1 \\ 2 \\ 5 \end{pmatrix}$.

**Step 1: Process $\mathbf{a}_1$ to find $\mathbf{q}_1$ and $r_{11}$.**
*   $\mathbf{v}_1 = \mathbf{a}_1 = \begin{pmatrix} 3 \\ 4 \\ 0 \end{pmatrix}$
*   $r_{11} = ||\mathbf{v}_1|| = \sqrt{3^2 + 4^2 + 0^2} = \sqrt{9 + 16 + 0} = \sqrt{25} = 5$.
*   $\mathbf{q}_1 = \frac{\mathbf{v}_1}{r_{11}} = \frac{1}{5} \begin{pmatrix} 3 \\ 4 \\ 0 \end{pmatrix} = \begin{pmatrix} 3/5 \\ 4/5 \\ 0 \end{pmatrix}$.

**Step 2: Process $\mathbf{a}_2$ to find $\mathbf{q}_2$, $r_{12}$, and $r_{22}$.**
*   Calculate $r_{12} = \mathbf{a}_2 \cdot \mathbf{q}_1$:
    $$ r_{12} = \begin{pmatrix} -1 \\ 2 \\ 5 \end{pmatrix} \cdot \begin{pmatrix} 3/5 \\ 4/5 \\ 0 \end{pmatrix} = (-1)(3/5) + (2)(4/5) + (5)(0) = -3/5 + 8/5 + 0 = 5/5 = 1 $$
*   Find the component of $\mathbf{a}_2$ orthogonal to $\mathbf{q}_1$:
    $$ \mathbf{v}_2 = \mathbf{a}_2 - r_{12}\mathbf{q}_1 = \begin{pmatrix} -1 \\ 2 \\ 5 \end{pmatrix} - 1 \cdot \begin{pmatrix} 3/5 \\ 4/5 \\ 0 \end{pmatrix} $$
    $$ \mathbf{v}_2 = \begin{pmatrix} -1 \\ 2 \\ 5 \end{pmatrix} - \begin{pmatrix} 3/5 \\ 4/5 \\ 0 \end{pmatrix} = \begin{pmatrix} -1 - 3/5 \\ 2 - 4/5 \\ 5 - 0 \end{pmatrix} = \begin{pmatrix} -8/5 \\ 6/5 \\ 5 \end{pmatrix} $$
*   Calculate $r_{22} = ||\mathbf{v}_2||$:
    $$ r_{22} = \sqrt{(-8/5)^2 + (6/5)^2 + 5^2} = \sqrt{64/25 + 36/25 + 25} $$
    $$ r_{22} = \sqrt{100/25 + 25} = \sqrt{4 + 25} = \sqrt{29} $$
*   Normalize $\mathbf{v}_2$ to get $\mathbf{q}_2$:
    $$ \mathbf{q}_2 = \frac{\mathbf{v}_2}{r_{22}} = \frac{1}{\sqrt{29}} \begin{pmatrix} -8/5 \\ 6/5 \\ 5 \end{pmatrix} = \begin{pmatrix} -8/(5\sqrt{29}) \\ 6/(5\sqrt{29}) \\ 5/\sqrt{29} \end{pmatrix} $$

**Step 3: Construct $Q$ and $R$.**
*   The matrix $Q$ is formed by columns $\mathbf{q}_1$ and $\mathbf{q}_2$:
    $$ Q = \begin{pmatrix} 3/5 & -8/(5\sqrt{29}) \\ 4/5 & 6/(5\sqrt{29}) \\ 0 & 5/\sqrt{29} \end{pmatrix} $$
*   The matrix $R$ is formed by $r_{11}, r_{12}, r_{22}$ and $r_{21}=0$:
    $$ R = \begin{pmatrix} r_{11} & r_{12} \\ 0 & r_{22} \end{pmatrix} = \begin{pmatrix} 5 & 1 \\ 0 & \sqrt{29} \end{pmatrix} $$

**Final Answer:**
The QR decomposition of $A = \begin{pmatrix} 3 & -1 \\ 4 & 2 \\ 0 & 5 \end{pmatrix}$ is:
$$ \boxed{ Q = \begin{pmatrix} 3/5 & -8/(5\sqrt{29}) \\ 4/5 & 6/(5\sqrt{29}) \\ 0 & 5/\sqrt{29} \end{pmatrix}, \quad R = \begin{pmatrix} 5 & 1 \\ 0 & \sqrt{29} \end{pmatrix} } $$

**Reflection:** This example involved more fractions and a less "clean" square root in the final calculations, which is common in real-world problems. It emphasizes the need for careful arithmetic and simplification. The process remains the same, highlighting its robustness for full-rank rectangular matrices.

## 6. Common mistakes and traps

1.  **Forgetting to normalize:** Students often perform the Gram-Schmidt orthogonalization step correctly (finding $\mathbf{v}_j$) but forget to divide by the norm to get the unit vector $\mathbf{q}_j$. This results in $Q$ having orthogonal columns, but not orthonormal ones.
2.  **Incorrectly calculating $R$ entries:** The diagonal entries $r_{jj}$ are the norms $||\mathbf{v}_j||$, while the off-diagonal entries $r_{kj}$ (for $k<j$) are the dot products $\mathbf{a}_j \cdot \mathbf{q}_k$. Mixing these up or using $\mathbf{v}_k$ instead of $\mathbf{q}_k$ for dot products is a common error.
3.  **Projecting onto original vectors instead of orthogonalized ones:** In the Gram-Schmidt process, when finding $\mathbf{v}_j$, you must subtract projections onto *previously found orthonormal vectors* $\mathbf{q}_k$, not the original columns $\mathbf{a}_k$. Using $\mathbf{a}_k$ would lead to incorrect orthogonality.
4.  **Arithmetic errors with fractions and square roots:** QR decomposition often involves many fractions and square roots, leading to tedious calculations where small arithmetic mistakes can propagate and ruin the final result. Double-checking each step is crucial.
5.  **Handling rank-deficient matrices:** If the columns of $A$ are linearly dependent, the Gram-Schmidt process will produce a zero vector $\mathbf{v}_j$ at some step. Trying to normalize a zero vector is undefined. This means $r_{jj}=0$, and the standard Gram-Schmidt for reduced QR cannot produce an orthonormal $\mathbf{q}_j$. Students might get stuck or make up a $\mathbf{q}_j$, which would lead to an incorrect decomposition.
6.  **Confusing "orthogonal" with "orthonormal":** An orthogonal matrix $Q$ has orthonormal columns, meaning $Q^T Q = I$. Sometimes students create columns that are orthogonal but not unit length, still calling it an "orthogonal matrix" which is incorrect.

## 7. Textbook-precise explanation

The QR decomposition is a fundamental matrix factorization in numerical linear algebra. It states that any $m \times n$ matrix $A$ with linearly independent columns can be uniquely factored into the product of an $m \times n$ matrix $Q$ with orthonormal columns and an $n \times n$ upper triangular matrix $R$ with positive diagonal entries.

**Definition:**
Let $A$ be an $m \times n$ matrix with real entries.
A **QR decomposition** of $A$ is a factorization of the form
$$ A = QR $$
where:
1.  $Q$ is an $m \times n$ matrix whose columns form an orthonormal set (i.e., $Q^T Q = I_n$, where $I_n$ is the $n \times n$ identity matrix).
2.  $R$ is an $n \times n$ upper triangular matrix (i.e., $r_{ij} = 0$ for $i > j$).

**Existence and Uniqueness (Reduced QR):**
If $A$ is an $m \times n$ matrix with linearly independent columns (i.e., $A$ has full column rank $n$), then $A$ has a unique QR decomposition $A=QR$ where the diagonal entries of $R$ are positive ($r_{ii} > 0$ for all $i=1, \dots, n$). This is often referred to as the **reduced QR decomposition** or **economy-size QR decomposition**.

**Construction via Gram-Schmidt Orthogonalization:**
Given $A = [\mathbf{a}_1 \ \mathbf{a}_2 \ \dots \ \mathbf{a}_n]$, the columns of $Q = [\mathbf{q}_1 \ \mathbf{q}_2 \ \dots \ \mathbf{q}_n]$ and the entries of $R = (r_{ij})$ can be constructed using the Gram-Schmidt process:

For $j = 1, \dots, n$:
1.  Let $\mathbf{v}_j = \mathbf{a}_j$.
2.  For $k = 1, \dots, j-1$:
    Compute the projection coefficient $r_{kj} = \mathbf{a}_j \cdot \mathbf{q}_k$.
    Update $\mathbf{v}_j = \mathbf{v}_j - r_{kj}\mathbf{q}_k$.
3.  Compute the diagonal entry $r_{jj} = ||\mathbf{v}_j||$.
4.  If $r_{jj} = 0$, then the columns of $A$ are linearly dependent, and the Gram-Schmidt process (for unique reduced QR with positive diagonal $R$) terminates. Otherwise, proceed.
5.  Set $\mathbf{q}_j = \frac{\mathbf{v}_j}{r_{jj}}$.
6.  Set $r_{ij} = 0$ for $i > j$.

This process ensures that $\text{span}\{\mathbf{a}_1, \dots, \mathbf{a}_k\} = \text{span}\{\mathbf{q}_1, \dots, \mathbf{q}_k\}$ for all $k=1, \dots, n$.

**Full QR Decomposition:**
For any $m \times n$ matrix $A$ (even if rank-deficient), a **full QR decomposition** exists:
$$ A = Q R $$
where $Q$ is an $m \times m$ orthogonal matrix (i.e., $Q^T Q = I_m$), and $R$ is an $m \times n$ upper triangular matrix. In this case, if $n < m$, the last $m-n$ columns of $Q$ are chosen to complete the orthonormal basis of $\mathbb{R}^m$, and the last $m-n$ rows of $R$ will be entirely zero. The uniqueness of the full QR decomposition depends on additional constraints (e.g., positive diagonal elements of $R$).

**Alternative Methods:**
While Gram-Schmidt provides a clear conceptual link, it can be numerically unstable for large matrices or matrices with nearly linearly dependent columns. More robust methods for computing QR decomposition include:
*   **