## 1. What it is — in plain English

Imagine you have a special kind of machine. This machine takes in numbers arranged in a specific way (we call these "vectors") and, after doing some calculations, spits out another set of numbers, also arranged as a vector. This machine is what we call a "matrix."

Now, let's talk about two special aspects of this machine.

First, the **null space** (sometimes called the "kernel") is like the collection of all "secret ingredients" you can feed into the machine that will always make it output absolutely nothing – a vector of all zeros. It's all the inputs that the machine essentially "erases" or "crushes to zero."

Second, the **column space** (also called the "image") is the collection of *all possible outputs* the machine can ever produce. If you could feed every imaginable input into the machine, the column space would be the complete set of all the different outputs you'd ever see come out. It's the "reach" of the machine.

A **basis** for either of these collections is like finding the minimal "building blocks" or "ingredients" that can create any item within that collection. You can't remove any of these building blocks, or you won't be able to make everything in the collection anymore. And the **dimension** is simply how many of these essential building blocks you need.

## 2. Why it matters — real-world applications

Understanding null space and column space is fundamental because they describe the intrinsic behavior and capabilities of linear systems, which are ubiquitous in science and engineering.

1.  **Image Processing and Compression (e.g., JPEG, facial recognition):**
    *   **Null Space:** In image compression, a matrix might represent a transformation that reduces data. The null space identifies redundant information or patterns in an image that, when removed, don't affect the reconstructed image significantly (or map to a "zero change"). This helps in achieving smaller file sizes without noticeable loss.
    *   **Column Space:** In facial recognition, a "face space" can be constructed from a set of training images. The column space of a matrix formed by these images defines all the "faces" (or features of faces) that can be represented by that system. New faces are then projected onto this column space for comparison.

2.  **Machine Learning and Data Science (e.g., Principal Component Analysis, Google's PageRank):**
    *   **Column Space:** In Principal Component Analysis (PCA), a core dimensionality reduction technique, the column space helps identify the principal components – the directions (vectors) in the data that capture the most variance. These form a basis for a lower-dimensional subspace that best represents the original high-dimensional data, used by companies like Netflix for recommendation systems by finding key features in user preferences.
    *   **Null Space:** In some machine learning models, if a feature vector lies in the null space of a transformation, it means that feature has no impact on the output, indicating redundancy or irrelevance. This can guide feature selection, helping to build more efficient and accurate models.

3.  **Control Systems and Robotics (e.g., drone flight, industrial robots):**
    *   **Null Space:** In robotics, if a robot arm has redundant joints (more joints than strictly necessary to reach a position), there might be configurations (inputs) that move the arm without changing the end-effector's position or orientation. These "self-motions" belong to the null space of the Jacobian matrix relating joint velocities to end-effector velocities. Engineers at Boston Dynamics use this to design robots that can maintain balance or avoid obstacles while performing tasks.
    *   **Column Space:** The column space of a robot's Jacobian matrix defines the set of all achievable end-effector velocities. If a desired velocity is not in the column space, the robot cannot achieve it, indicating a limitation in its design or current configuration. This is crucial for planning robot movements and ensuring they are physically possible.

4.  **Physics and Engineering (e.g., structural analysis, fluid dynamics):**
    *   **Null Space:** In structural engineering, if a structure (like a bridge or building frame) has "mechanisms" (ways it can move without any external force and without deforming its members), these movements are in the null space of the stiffness matrix. Identifying these mechanisms is critical to ensure structural stability and prevent collapse.
    *   **Column Space:** In electrical circuits, the column space of the incidence matrix (describing connections) relates to the currents that can flow through the circuit, while the null space of its transpose relates to voltage differences around loops. Understanding these helps engineers design stable and efficient power grids.

## 3. Prerequisites — what you must know first

Before diving deep into null space and column space, ensure you have a solid grasp of these foundational concepts:

*   **Vectors:** Quantities with both magnitude and direction, typically represented as columns of numbers.
*   **Matrices:** Rectangular arrays of numbers that can represent linear transformations or systems of equations.
*   **Matrix-Vector Multiplication:** The process of multiplying a matrix by a vector, which results in another vector.
*   **Linear Combinations:** A sum of scalar multiples of vectors, e.g., $c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \dots + c_k\mathbf{v}_k$.
*   **Span:** The set of all possible linear combinations of a given set of vectors.
*   **Linear Independence:** A set of vectors is linearly independent if no vector in the set can be written as a linear combination of the others.
*   **Vector Space:** A collection of vectors that is "closed" under vector addition and scalar multiplication (meaning adding two vectors in the space or scaling a vector in the space keeps you within the space).
*   **Subspace:** A subset of a vector space that is itself a vector space (i.e., it contains the zero vector and is closed under addition and scalar multiplication).
*   **Basis of a Vector Space:** A set of vectors that is linearly independent and spans the entire vector space. It's the minimal set of vectors needed to generate the space.
*   **Dimension of a Vector Space:** The number of vectors in any basis for that vector space.
*   **Row Echelon Form (REF) / Reduced Row Echelon Form (RREF):** A systematic way to simplify matrices through row operations, used to solve systems of equations and identify linear dependencies.
*   **Solving Systems of Linear Equations ($A\mathbf{x}=\mathbf{b}$):** The ability to find vectors $\mathbf{x}$ that satisfy a given matrix equation.

## 4. The core idea — step by step

Let's break down these concepts slowly, building intuition and formality together.

### Step 1: The Machine (Matrix) and its Action

*   **Plain English:** Think of a matrix $A$ as a specific rule or a "function" that takes an input vector and transforms it into an output vector. It's a linear transformation, meaning it preserves vector addition and scalar multiplication.
*   **Small Concrete Example:** Consider the matrix $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$. This is a $2 \times 2$ matrix. It takes a vector with 2 components (like $\mathbf{x} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$) and transforms it into another vector with 2 components:
    $$ A\mathbf{x} = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 1 \cdot 1 + 2 \cdot 0 \\ 3 \cdot 1 + 4 \cdot 0 \end{pmatrix} = \begin{pmatrix} 1 \\ 3 \end{pmatrix} $$
    So, the input $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ is transformed into the output $\begin{pmatrix} 1 \\ 3 \end{pmatrix}$.
*   **Formal/Mathematical Version:** A matrix $A$ with $m$ rows and $n$ columns (denoted $A \in \mathbb{R}^{m \times n}$) defines a linear transformation $T_A: \mathbb{R}^n \to \mathbb{R}^m$ such that for any vector $\mathbf{x} \in \mathbb{R}^n$, the output is $T_A(\mathbf{x}) = A\mathbf{x} \in \mathbb{R}^m$. Here, $\mathbb{R}^n$ is the *domain* (input space) and $\mathbb{R}^m$ is the *codomain* (output space).
*   **What Could Go Wrong:** Confusing the dimensions. An $m \times n$ matrix takes an $n$-dimensional vector as input and produces an $m$-dimensional vector as output. The number of columns of $A$ must match the dimension of the input vector.

### Step 2: The Null Space (Kernel) — The "Zero-Output" Inputs

*   **Plain English:** The null space of a matrix $A$ is the collection of *all* input vectors $\mathbf{x}$ that, when fed into the matrix machine $A$, produce the zero vector as output. It's like finding all the secret ingredients that make the machine output "nothing."
*   **Small Concrete Example:** Consider the matrix $A = \begin{pmatrix} 1 & 1 \\ 2 & 2 \end{pmatrix}$. We want to find all vectors $\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}$ such that $A\mathbf{x} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.
    $$ \begin{pmatrix} 1 & 1 \\ 2 & 2 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} $$
    This gives us the system of equations:
    $1x_1 + 1x_2 = 0$
    $2x_1 + 2x_2 = 0$
    Both equations simplify to $x_1 + x_2 = 0$, or $x_1 = -x_2$.
    So, any vector of the form $\begin{pmatrix} -k \\ k \end{pmatrix}$ for any scalar $k$ will be mapped to zero. For instance, if $k=1$, $\mathbf{x} = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$ is in the null space.
*   **Formal/Mathematical Version:** The null space of an $m \times n$ matrix $A$, denoted $\text{Null}(A)$ or $\text{ker}(A)$, is the set of all vectors $\mathbf{x} \in \mathbb{R}^n$ such that $A\mathbf{x} = \mathbf{0}$.
    $$ \text{Null}(A) = \{ \mathbf{x} \in \mathbb{R}^n \mid A\mathbf{x} = \mathbf{0} \} $$
    The null space is a subspace of the domain $\mathbb{R}^n$. This means it contains the zero vector, and is closed under addition and scalar multiplication.
*   **What Could Go Wrong:** Forgetting that the output *must* be the zero vector $\mathbf{0}$, not just any vector where some components are zero. Also, remember the null space is a subspace of the *input* space $\mathbb{R}^n$.

### Step 3: Finding a Basis for the Null Space

*   **Plain English:** To find the minimal set of "building blocks" for the null space, we need a systematic way to describe all the input vectors that get "erased." This involves solving the equation $A\mathbf{x} = \mathbf{0}$.
*   **Small Concrete Example:** Let's find a basis for the null space of $A = \begin{pmatrix} 1 & 1 & 2 \\ 2 & 2 & 4 \end{pmatrix}$.
    We need to solve $A\mathbf{x} = \mathbf{0}$:
    $$ \begin{pmatrix} 1 & 1 & 2 \\ 2 & 2 & 4 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} $$
    Form the augmented matrix and reduce it to Reduced Row Echelon Form (RREF):
    $$ \begin{pmatrix} 1 & 1 & 2 & | & 0 \\ 2 & 2 & 4 & | & 0 \end{pmatrix} \xrightarrow{R_2 - 2R_1} \begin{pmatrix} 1 & 1 & 2 & | & 0 \\ 0 & 0 & 0 & | & 0 \end{pmatrix} $$
    The equation from RREF is $x_1 + x_2 + 2x_3 = 0$.
    Here, $x_1$ is a *basic variable* (it corresponds to a pivot). $x_2$ and $x_3$ are *free variables* (they don't have pivots).
    Let $x_2 = s$ and $x_3 = t$, where $s, t$ are any real numbers.
    Then $x_1 = -x_2 - 2x_3 = -s - 2t$.
    So, any vector $\mathbf{x}$ in the null space looks like:
    $$ \mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} -s - 2t \\ s \\ t \end{pmatrix} $$
    We can split this into a linear combination based on $s$ and $t$:
    $$ \mathbf{x} = s \begin{pmatrix} -1 \\ 1 \\ 0 \end{pmatrix} + t \begin{pmatrix} -2 \\ 0 \\ 1 \end{pmatrix} $$
    The vectors $\mathbf{v}_1 = \begin{pmatrix} -1 \\ 1 \\ 0 \end{pmatrix}$ and $\mathbf{v}_2 = \begin{pmatrix} -2 \\ 0 \\ 1 \end{pmatrix}$ are linearly independent and span the null space. Thus, $\{ \mathbf{v}_1, \mathbf{v}_2 \}$ is a basis for $\text{Null}(A)$.
*   **Formal/Mathematical Version:** To find a basis for $\text{Null}(A)$:
    1.  Solve the homogeneous system $A\mathbf{x} = \mathbf{0}$ by bringing the augmented matrix $[A | \mathbf{0}]$ to RREF.
    2.  Identify the basic variables (corresponding to pivot columns) and free variables (corresponding to non-pivot columns).
    3.  Express each basic variable in terms of the free variables.
    4.  Write the general solution vector $\mathbf{x}$ as a linear combination of vectors, where the coefficients are the free variables. The vectors in this linear combination form a basis for $\text{Null}(A)$.
*   **What Could Go Wrong:** Making algebraic errors during row reduction. Incorrectly identifying basic vs. free variables. Forgetting to express the solution as a linear combination of basis vectors.

### Step 4: The Dimension of the Null Space (Nullity)

*   **Plain English:** The dimension of the null space is simply how many vectors are in its basis. It tells us how many "independent directions" there are in the set of inputs that get mapped to zero.
*   **Small Concrete Example:** In the example from Step 3, we found a basis for $\text{Null}(A)$ consisting of two vectors: $\{ \begin{pmatrix} -1 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} -2 \\ 0 \\ 1 \end{pmatrix} \}$. Therefore, the dimension of the null space is 2.
*   **Formal/Mathematical Version:** The dimension of the null space of $A$, denoted $\dim(\text{Null}(A))$, is called the **nullity** of $A$, written as $\text{nullity}(A)$. It is equal to the number of free variables in the RREF of $A$.
*   **What Could Go Wrong:** Confusing the nullity with the number of rows or columns of the matrix. The nullity is always less than or equal to the number of columns ($n$).

### Step 5: The Column Space (Image) — The "Possible Outputs"

*   **Plain English:** The column space of a matrix $A$ is the collection of all possible output vectors you can get by feeding *any* input vector into the matrix machine $A$. It's also the set of all vectors that can be formed by taking linear combinations of the columns of $A$.
*   **Small Concrete Example:** Consider $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$. Its columns are $\mathbf{a}_1 = \begin{pmatrix} 1 \\ 3 \end{pmatrix}$ and $\mathbf{a}_2 = \begin{pmatrix} 2 \\ 4 \end{pmatrix}$.
    Any output vector $A\mathbf{x}$ is of the form:
    $$ \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = x_1 \begin{pmatrix} 1 \\ 3 \end{pmatrix} + x_2 \begin{pmatrix} 2 \\ 4 \end{pmatrix} $$
    This is exactly a linear combination of the columns of $A$. So, the column space is the set of all such linear combinations. For this matrix, the columns are linearly independent, so the column space is all of $\mathbb{R}^2$.
*   **Formal/Mathematical Version:** The column space of an $m \times n$ matrix $A$, denoted $\text{Col}(A)$ or $\text{Im}(A)$, is the set of all linear combinations of the column vectors of $A$. If $\mathbf{a}_1, \dots, \mathbf{a}_n$ are the columns of $A$, then:
    $$ \text{Col}(A) = \text{span}\{ \mathbf{a}_1, \dots, \mathbf{a}_n \} = \{ \mathbf{b} \in \mathbb{R}^m \mid A\mathbf{x} = \mathbf{b} \text{ has a solution for some } \mathbf{x} \in \mathbb{R}^n \} $$
    The column space is a subspace of the codomain $\mathbb{R}^m$.
*   **What Could Go Wrong:** Thinking the column space is a subspace of the input space $\mathbb{R}^n$. It's a subspace of the *output* space $\mathbb{R}^m$. Also, confusing it with the span of the *rows* of $A$ (which is a different concept called the row space).

### Step 6: Finding a Basis for the Column Space

*   **Plain English:** To find the minimal set of "building blocks" for the column space, we need to identify which of the original columns of $A$ are linearly independent and still span the entire column space.
*   **Small Concrete Example:** Let's find a basis for the column space of $A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 1 & 0 & 1 \end{pmatrix}$.
    First, reduce $A$ to RREF:
    $$ \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 1 & 0 & 1 \end{pmatrix} \xrightarrow{R_2 - 2R_1, R_3 - R_1} \begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \\ 0 & -2 & -2 \end{pmatrix} \xrightarrow{R_2 \leftrightarrow R_3} \begin{pmatrix} 1 & 2 & 3 \\ 0 & -2 & -2 \\ 0 & 0 & 0 \end{pmatrix} \xrightarrow{-\frac{1}{2}R_2} \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{pmatrix} \xrightarrow{R_1 - 2R_2} \begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{pmatrix} $$
    The RREF matrix has pivots in columns 1 and 2. This tells us that the *original* columns 1 and 2 of $A$ form a basis for $\text{Col}(A)$.
    So, the basis for $\text{Col}(A)$ is $\{ \begin{pmatrix} 1 \\ 2 \\ 1 \end{pmatrix}, \begin{pmatrix} 2 \\ 4 \\ 0 \end{pmatrix} \}$.
    Notice that the third column of $A$, $\begin{pmatrix} 3 \\ 6 \\ 1 \end{pmatrix}$, is a linear combination of the first two: $1 \cdot \begin{pmatrix} 1 \\ 2 \\ 1 \end{pmatrix} + 1 \cdot \begin{pmatrix} 2 \\ 4 \\ 0 \end{pmatrix} = \begin{pmatrix} 3 \\ 6 \\ 1 \end{pmatrix}$. This corresponds to the relationship seen in the RREF: $1 \cdot (\text{col 1}) + 1 \cdot (\text{col 2}) = (\text{col 3})$.
*   **Formal/Mathematical Version:** To find a basis for $\text{Col}(A)$:
    1.  Reduce the matrix $A$ to its RREF.
    2.  Identify the pivot columns in the RREF.
    3.  The corresponding columns in the *original* matrix $A$ form a basis for $\text{Col}(A)$.
*   **What Could Go Wrong:** A very common mistake is to use the pivot columns from the *RREF matrix* itself as the basis vectors. This is incorrect! The column space is a subspace of $\mathbb{R}^m$, and the RREF columns might not even be in the original column space. You must use the original columns of $A$.

### Step 7: The Dimension of the Column Space (Rank)

*   **Plain English:** The dimension of the column space is simply how many vectors are in its basis. It tells us how many "independent directions" there are in the set of all possible outputs the machine can produce.
*   **Small Concrete Example:** In the example from Step 6, we found a basis for $\text{Col}(A)$ consisting of two vectors: $\{ \begin{pmatrix} 1 \\ 2 \\ 1 \end{pmatrix}, \begin{pmatrix} 2 \\ 4 \\ 0 \end{pmatrix} \}$. Therefore, the dimension of the column space is 2.
*   **Formal/Mathematical Version:** The dimension of the column space of $A$, denoted $\dim(\text{Col}(A))$, is called the **rank** of $A$, written as $\text{rank}(A)$. It is equal to the number of pivot columns (or leading 1s) in the RREF of $A$.
*   **What Could Go Wrong:** Confusing the rank with the number of rows or columns. The rank is always less than or equal to both $m$ and $n$.

### Step 8: The Rank-Nullity Theorem

*   **Plain English:** This theorem is a beautiful connection between the null space and the column space. It says that for any matrix, the number of "independent inputs that get squashed to zero" (nullity) plus the number of "independent outputs" (rank) must equal the total number of dimensions of the input space.
*   **Small Concrete Example:** For the matrix $A = \begin{pmatrix} 1 & 1 & 2 \\ 2 & 2 & 4 \end{pmatrix}$ from Step 3 and 4:
    *   We found $\text{nullity}(A) = 2$.
    *   Let's find the rank. The RREF was $\begin{pmatrix} 1 & 1 & 2 \\ 0 & 0 & 0 \end{pmatrix}$. There is one pivot column (the first one). So, $\text{rank}(A) = 1$.
    *   The matrix $A$ has $n=3$ columns (it maps from $\mathbb{R}^3$).
    *   Check the theorem: $\text{rank}(A) + \text{nullity}(A) = 1 + 2 = 3$. This matches $n=3$. The theorem holds!
*   **Formal/Mathematical Version:** For an $m \times n$ matrix $A$, the Rank-Nullity Theorem states:
    $$ \text{rank}(A) + \text{nullity}(A) = n $$
    where $n$ is the number of columns of $A$ (the dimension of the domain $\mathbb{R}^n$).
*   **What Could Go Wrong:** Accidentally using $m$ (number of rows) instead of $n$ (number of columns) for the right side of the equation. Remember, nullity is about the input space, and rank describes how much of the input space is "preserved" in the output, so the sum must equal the dimension of the input space.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple Case

**Problem:** For the matrix $A = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$, find a basis for its null space and column space, and determine their dimensions.

**Given:** Matrix $A = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$.
**Want:** Basis for $\text{Null}(A)$, $\dim(\text{Null}(A))$, Basis for $\text{Col}(A)$, $\dim(\text{Col}(A))$.

**Step 1: Find Null Space (Nullity)**
The null space is the set of all $\mathbf{x}$ such that $A\mathbf{x} = \mathbf{0}$.
$$ \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} $$
This system of equations is:
$1x_1 + 0x_2 = 0 \implies x_1 = 0$
$0x_1 + 1x_2 = 0 \implies x_2 = 0$
The only solution is $\mathbf{x} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.
*   **Explanation:** We set up the equation $A\mathbf{x}=\mathbf{0}$ to find the null space. For this identity matrix, the only vector that maps to zero is the zero vector itself.
Thus, $\text{Null}(A) = \{ \begin{pmatrix} 0 \\ 0 \end{pmatrix} \}$. This is the trivial null space.
A basis for the trivial null space is the empty set $\emptyset$.
*   **Explanation:** A basis for the zero vector space is conventionally the empty set, as there are no non-zero vectors to span it.
The dimension of the null space is the number of vectors in its basis.
*   **Explanation:** The dimension is simply the count of basis vectors.
$\dim(\text{Null}(A)) = 0$.
*   **Explanation:** Since the basis is empty, the dimension is 0.

**Step 2: Find Column Space (Rank)**
The column space is the span of the columns of $A$. The columns of $A$ are $\mathbf{a}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $\mathbf{a}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$.
These two vectors are linearly independent.
*   **Explanation:** The columns are clearly not scalar multiples of each other. They point in different directions.
They also span all of $\mathbb{R}^2$.
*   **Explanation:** Any vector $\begin{pmatrix} c_1 \\ c_2 \end{pmatrix}$ can be written as $c_1 \begin{pmatrix} 1 \\ 0 \end{pmatrix} + c_2 \begin{pmatrix} 0 \\ 1 \end{pmatrix}$.
So, $\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix} \}$ is a basis for $\text{Col}(A)$.
*   **Explanation:** Since the columns are linearly independent and span the space, they form a basis.
The dimension of the column space is the number of vectors in its basis.
*   **Explanation:** The dimension is simply the count of basis vectors.
$\dim(\text{Col}(A)) = 2$.

**Step 3: Verify Rank-Nullity Theorem**
For $A \in \mathbb{R}^{2 \times 2}$, $n=2$.
$\text{rank}(A) + \text{nullity}(A) = 2 + 0 = 2$. This matches $n$.

**Final Answer:**
*   **Basis for Null Space:** $\emptyset$
*   **Dimension of Null Space:** $\boxed{0}$
*   **Basis for Column Space:** $\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix} \}$
*   **Dimension of Column Space:** $\boxed{2}$

**Reflection:** This example was straightforward because the matrix is the identity matrix, which is already in RREF. It clearly shows a trivial null space (only the zero vector maps to zero) and a column space that spans the entire output space.

---

### Example 2: Matrix with Free Variables

**Problem:** For the matrix $B = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 3 & 6 & 9 \end{pmatrix}$, find a basis for its null space and column space, and determine their dimensions.

**Given:** Matrix $B = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 3 & 6 & 9 \end{pmatrix}$.
**Want:** Basis for $\text{Null}(B)$, $\dim(\text{Null}(B))$, Basis for $\text{Col}(B)$, $\dim(\text{Col}(B))$.

**Step 1: Reduce the matrix to RREF**
We perform row operations on $B$:
$$ \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 3 & 6 & 9 \end{pmatrix} \xrightarrow{R_2 - 2R_1} \begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \\ 3 & 6 & 9 \end{pmatrix} $$
*   **Explanation:** Subtract 2 times the first row from the second row to eliminate the leading term in $R_2$.
$$ \xrightarrow{R_3 - 3R_1} \begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{pmatrix} $$
*   **Explanation:** Subtract 3 times the first row from the third row to eliminate the leading term in $R_3$.
The RREF of $B$ is $\text{RREF}(B) = \begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{pmatrix}$.

**Step 2: Find Null Space (Nullity)**
We solve $B\mathbf{x} = \mathbf{0}$ using the RREF:
$$ \begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix} $$
This gives the equation $x_1 + 2x_2 + 3x_3 = 0$.
$x_1$ is a basic variable (pivot in column 1). $x_2$ and $x_3$ are free variables.
Let $x_2 = s$ and $x_3 = t$, where $s, t \in \mathbb{R}$.
Then $x_1 = -2x_2 - 3x_3 = -2s - 3t$.
*   **Explanation:** We express the basic variable ($x_1$) in terms of the free variables ($x_2, x_3$).
The general solution vector $\mathbf{x}$ is:
$$ \mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} -2s - 3t \\ s \\ t \end{pmatrix} $$
Now, separate this into components based on $s$ and $t$:
$$ \mathbf{x} = s \begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix} + t \begin{pmatrix} -3 \\ 0 \\ 1 \end{pmatrix} $$
*   **Explanation:** We decompose the solution vector into a linear combination where the coefficients are the free variables. The vectors multiplied by $s$ and $t$ form the basis.
A basis for $\text{Null}(B)$ is $\{ \begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} -3 \\ 0 \\ 1 \end{pmatrix} \}$.
*   **Explanation:** These two vectors are linearly independent and span the null space.
$\dim(\text{Null}(B)) = 2$.
*   **Explanation:** There are two basis vectors, or two free variables.

**Step 3: Find Column Space (Rank)**
The RREF of $B$ is $\begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{pmatrix}$.
The pivot column is column 1.
*   **Explanation:** A pivot is the first non-zero entry in a row of an echelon form matrix. Here, only the first column has a pivot.
Therefore, the basis for $\text{Col}(B)$ consists of the *first column of the original matrix $B$*.
*   **Explanation:** The columns of the original matrix corresponding to the pivot columns in RREF form a basis for the column space.
A basis for $\text{Col}(B)$ is $\{ \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix} \}$.
*   **Explanation:** This single vector spans the entire column space. All columns of $B$ are multiples of this vector.
$\dim(\text{Col}(B)) = 1$.
*   **Explanation:** There is one basis vector, or one pivot column.

**Step 4: Verify Rank-Nullity Theorem**
For $B \in \mathbb{R}^{3 \times 3}$, $n=3$.
$\text{rank}(B) + \text{nullity}(B) = 1 + 2 = 3$. This matches $n$.

**Final Answer:**
*   **Basis for Null Space:** $\{ \begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} -3 \\ 0 \\ 1 \end{pmatrix} \}$
*   **Dimension of Null Space:** $\boxed{2}$
*   **Basis for Column Space:** $\{ \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix} \}$
*   **Dimension of Column Space:** $\boxed{1}$

**Reflection:** This example demonstrates how a matrix can "squash" a higher-dimensional input space into a lower-dimensional output space. The null space is non-trivial (dimension 2), meaning many inputs map to zero, and the column space is only a 1-dimensional line, meaning the outputs are very restricted.

---

### Example 3: Rectangular Matrix (More Rows than Columns)

**Problem:** For the matrix $C = \begin{pmatrix} 1 & 0 \\ 2 & 1 \\ 0 & 1 \end{pmatrix}$, find a basis for its null space and column space, and determine their dimensions.

**Given:** Matrix $C = \begin{pmatrix} 1 & 0 \\ 2 & 1 \\ 0 & 1 \end{pmatrix}$.
**Want:** Basis for $\text{Null}(C)$, $\dim(\text{Null}(C))$, Basis for $\text{Col}(C)$, $\dim(\text{Col}(C))$.

**Step 1: Reduce the matrix to RREF**
$$ \begin{pmatrix} 1 & 0 \\ 2 & 1 \\ 0 & 1 \end{pmatrix} \xrightarrow{R_2 - 2R_1} \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 1 \end{pmatrix} $$
*   **Explanation:** Subtract 2 times the first row from the second row.
$$ \xrightarrow{R_3 - R_2} \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \end{pmatrix} $$
*   **Explanation:** Subtract the second row from the third row.
The RREF of $C$ is $\text{RREF}(C) = \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \end{pmatrix}$.

**Step 2: Find Null Space (Nullity)**
We solve $C\mathbf{x} = \mathbf{0}$ using the RREF:
$$ \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix} $$
This gives the system:
$1x_1 + 0x_2 = 0 \implies x_1 = 0$
$0x_1 + 1x_2 = 0 \implies x_2 = 0$
The only solution is $\mathbf{x} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.
*   **Explanation:** Similar to Example 1, the RREF shows that both variables must be zero.
Thus, $\text{Null}(C) = \{ \begin{pmatrix} 0 \\ 0 \end{pmatrix} \}$.
A basis for $\text{Null}(C)$ is the empty set $\emptyset$.
$\dim(\text{Null}(C)) = 0$.
*   **Explanation:** There are no free variables, so the nullity is 0.

**Step 3: Find Column Space (Rank)**
The RREF of $C$ is $\begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \end{pmatrix}$.
The pivot columns are column 1 and column 2.
*   **Explanation:** Both columns have leading 1s, indicating they are pivot columns.
Therefore, the basis for $\text{Col}(C)$ consists of the *first and second columns of the original matrix $C$*.
*   **Explanation:** We take the original columns corresponding to the pivot columns in RREF.
A basis for $\text{Col}(C)$ is $\{ \begin{pmatrix} 1 \\ 2 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix} \}$.
*   **Explanation:** These two vectors are linearly independent and span the column space.
$\dim(\text{Col}(C)) = 2$.
*   **Explanation:** There are two basis vectors, or two pivot columns.

**Step 4: Verify Rank-Nullity Theorem**
For $C \in \mathbb{R}^{3 \times 2}$, $n=2$ (number of columns).
$\text{rank}(C) + \text{nullity}(C) = 2 + 0 = 2$. This matches $n$.

**Final Answer:**
*   **Basis for Null Space:** $\emptyset$
*   **Dimension of Null Space:** $\boxed{0}$
*   **Basis for Column Space:** $\{ \begin{pmatrix} 1 \\ 2 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix} \}$
*   **Dimension of Column Space:** $\boxed{2}$

**Reflection:** This example shows a "tall" matrix (more rows than columns). Even though the output space is $\mathbb{R}^3$, the column space only spans a 2-dimensional plane within $\mathbb{R}^3$. This means not all vectors in $\mathbb{R}^3$ can be outputs of this transformation. The null space is trivial, indicating that the transformation is "injective" (one-to-one) from its input space.

---

### Example 4: Harder Case with More Free Variables

**Problem:** For the matrix $D = \begin{pmatrix} 1 & -1 & 2 & 1 \\ 2 & -2 & 4 & 2 \\ -1 & 1 & -2 & -1 \end{pmatrix}$, find a basis for its null space and column space, and determine their dimensions.

**Given:** Matrix $D = \begin{pmatrix} 1 & -1 & 2 & 1 \\ 2 & -2 & 4 & 2 \\ -1 & 1 & -2 & -1 \end{pmatrix}$.
**Want:** Basis for $\text{Null}(D)$, $\dim(\text{Null}(D))$, Basis for $\text{Col}(D)$, $\dim(\text{Col}(D))$.

**Step 1: Reduce the matrix to RREF**
$$ \begin{pmatrix} 1 & -1 & 2 & 1 \\ 2 & -2 & 4 & 2 \\ -1 & 1 & -2 & -1 \end{pmatrix} \xrightarrow{R_2 - 2R_1} \begin{pmatrix} 1 & -1 & 2 & 1 \\ 0 & 0 & 0 & 0 \\ -1 & 1 & -2 & -1 \end{pmatrix} $$
*   **Explanation:** Subtract 2 times the first row from the second row.
$$ \xrightarrow{R_3 + R_1} \begin{pmatrix} 1 & -1 & 2 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{pmatrix} $$
*   **Explanation:** Add the first row to the third row.
The RREF of $D$ is $\text{RREF}(D) = \begin{pmatrix} 1 & -1 & 2 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{pmatrix}$.

**Step 2: Find Null Space (Nullity)**
We solve $D\mathbf{x} = \mathbf{0}$ using the RREF:
$$ \begin{pmatrix} 1 & -1 & 2 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix} $$
This gives the single equation $x_1 - x_2 + 2x_3 + x_4 = 0$.
$x_1$ is a basic variable (pivot in column 1). $x_2, x_3, x_4$ are free variables.
Let $x_2 = s$, $x_3 = t$, $x_4 = u$, where $s, t, u \in \mathbb{R}$.
Then $x_1 = x_2 - 2x_3 - x_4 = s - 2t - u$.
*   **Explanation:** Express the basic variable $x_1$ in terms of the three free variables.
The general solution vector $\mathbf{x}$ is:
$$ \mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{pmatrix} = \begin{pmatrix} s - 2t - u \\ s \\ t \\ u \end{pmatrix} $$
Separate this into components based on $s, t, u$:
$$ \mathbf{x} = s \begin{pmatrix} 1 \\ 1 \\ 0 \\ 0 \end{pmatrix} + t \begin{pmatrix} -2 \\ 0 \\ 1 \\ 0 \end{pmatrix} + u \begin{pmatrix} -1 \\ 0 \\ 0 \\ 1 \end{pmatrix} $$
*   **Explanation:** Decompose the solution into a linear combination.
A basis for $\text{Null}(D)$ is $\{ \begin{pmatrix} 1 \\ 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} -2 \\ 0 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} -1 \\ 0 \\ 0 \\ 1 \end{pmatrix} \}$.
*   **Explanation:** These three vectors are linearly independent and span the null space.
$\dim(\text{Null}(D)) = 3$.
*   **Explanation:** There are three basis vectors, corresponding to the three free variables.

**Step 3: Find Column Space (Rank)**
The RREF of $D$ is $\begin{pmatrix} 1 & -1 & 2 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{pmatrix}$.
The pivot column is column 1.
*   **Explanation:** Only the first column has a leading 1.
Therefore, the basis for $\text{Col}(D)$ consists of the *first column of the original matrix $D$*.
*   **Explanation:** Use the original column corresponding to the pivot.
A basis for $\text{Col}(D)$ is $\{ \begin{pmatrix} 1 \\ 2 \\ -1 \end{pmatrix} \}$.
*   **Explanation:** This single vector spans the entire column space.
$\dim(\text{Col}(D)) = 1$.
*   **Explanation:** There is one basis vector, corresponding to the single pivot column.

**Step 4: Verify Rank-Nullity Theorem**
For $D \in \mathbb{R}^{3 \times 4}$, $n=4$ (number of columns).
$\text{rank}(D) + \text{nullity}(D) = 1 + 3 = 4$. This matches $n$.

**Final Answer:**
*   **Basis for Null Space:** $\{ \begin{pmatrix} 1 \\ 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} -2 \\ 0 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} -1 \\ 0 \\ 0 \\ 1 \end{pmatrix} \}$
*   **Dimension of Null Space:** $\boxed{3}$
*   **Basis for Column Space:** $\{ \begin{pmatrix} 1 \\ 2 \\ -1 \end{pmatrix} \}$
*   **Dimension of Column Space:** $\boxed{1}$

**Reflection:** This example highlights a matrix with a very large null space and a very small column space. This means the transformation "collapses" a 4-dimensional input space down to a 1-dimensional line in the output space. The structure of the matrix (where all rows are multiples of the first row) led to many free variables and thus a high nullity.

## 6. Common mistakes and traps

1.  **Using RREF columns for Column Space Basis:** This is the most frequent mistake. Students correctly identify pivot columns in RREF but then use the columns *from the RREF matrix* as the basis vectors. **Remember:** The basis for $\text{Col}(A)$ must come from the *original columns of $A$* that correspond to the pivot columns in its RREF.
2.  **Confusing Null Space with Row Space:** The null space is about inputs that map to zero ($A\mathbf{x}=\mathbf{0}$), and it's a subspace of the *domain* ($\mathbb{R}^n$). The row space is the span of the rows of $A$, and it's a subspace of the *domain* ($\mathbb{R}^n$). They are distinct subspaces, though related by the Fundamental Theorem of Linear Algebra.
3.  **Algebraic Errors in RREF:** Incorrect row operations can lead to a completely wrong RREF, which in turn yields incorrect null space and column space bases and dimensions. Double-check your row reductions carefully.
4.  **Incorrectly Identifying Free/Basic Variables:** After RREF, pivot columns correspond to basic variables, and non-pivot columns correspond to free variables. Swapping these roles will lead to an incorrect basis for the null space.
5.  **Forgetting $A\mathbf{x} = \mathbf{0}$ for Null Space:** The definition of the null space is strictly tied to the homogeneous equation $A\mathbf{x} = \mathbf{0}$. Sometimes students try to find vectors that map to other non-zero vectors, which is not the null space.
6.  **Misinterpreting Rank-Nullity Theorem:** The theorem states $\text{rank}(A) + \text{nullity}(A) = n$, where $n$ is the number of *columns* (the dimension of the input space). A common error is to use $m$ (number of rows) instead of $n$.

## 7. Textbook-precise explanation

Let $A$ be an $m \times n$ matrix, where $A: \mathbb{R}^n \to \mathbb{R}^m$ is a linear transformation.

**Definition 1: Null Space (Kernel)**
The **null space** of $A$, denoted $\text{Null}(A)$ or $\text{ker}(A)$, is the set of all vectors $\mathbf{x}$ in $\mathbb{R}^n$ such that $A\mathbf{x} = \mathbf{0}$.
$$ \text{Null}(A) = \{ \mathbf{x} \in \mathbb{R}^n \mid A\mathbf{x} = \mathbf{0} \} $$
The null space is a subspace of $\mathbb{R}^n$.
*   **Proof that $\text{Null}(A)$ is a subspace:**
    1.  **Contains the zero vector:** $A\mathbf{0} = \mathbf{0}$, so $\mathbf{0} \in \text{Null}(A)$.
    2.  **Closed under vector addition:** Let $\mathbf{u}, \mathbf{v} \in \text{Null}(A)$. Then $A\mathbf{u} = \mathbf{0}$ and $A\mathbf{v} = \mathbf{0}$. By linearity of matrix multiplication, $A(\mathbf{u} + \mathbf{v}) = A\mathbf{u} + A\mathbf{v} = \mathbf{0} + \mathbf{0} = \mathbf{0}$. Thus, $\mathbf{u} + \mathbf{v} \in \text{Null}(A)$.
    3.  **Closed under scalar multiplication:** Let $\mathbf{u} \in \text{Null}(A)$ and $c \in \mathbb{R}$. Then $A\mathbf{u} = \mathbf{0}$. By linearity, $A(c\mathbf{u}) = c(A\mathbf{u}) = c\mathbf{0} = \mathbf{0}$. Thus, $c\mathbf{u} \in \text{Null}(A)$.
Since all three conditions are met, $\text{Null}(A)$ is a subspace of $\mathbb{R}^n$.

**Definition 2: Nullity**
The **nullity** of $A$, denoted $\text{nullity}(A)$, is the dimension of the null space of $A$. That is, $\text{nullity}(A) = \dim(\text{Null}(A))$. It is equal to the number of free variables in the solution to $A\mathbf{x} = \mathbf{0}$.

**Definition 3: Column Space (Image)**
The **column space** of $A$, denoted $\text{Col}(A)$ or $\text{Im}(A)$, is the set of all linear combinations of the column vectors of