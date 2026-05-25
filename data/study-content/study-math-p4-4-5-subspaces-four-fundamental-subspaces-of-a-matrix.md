## 1. What it is — in plain English

Imagine a machine that takes in numbers as input and spits out other numbers as output. A matrix is like that machine. It takes a vector (a list of numbers) and transforms it into another vector.

Now, think about all the possible inputs you could feed into this machine. Some inputs might just get crushed to zero, meaning they disappear entirely. Other inputs might produce a wide variety of outputs.

The "four fundamental subspaces" are essentially four special "rooms" or "zones" related to this matrix machine. Two rooms are on the "input" side, and two rooms are on the "output" side. They describe:
1. What kind of outputs the machine can *actually* produce (the *column space*).
2. What inputs get completely *destroyed* and turn into zero (the *null space*).
3. What are the "effective" parts of the input that genuinely contribute to the output (the *row space*).
4. What kind of "errors" or "unreachable parts" exist on the output side that the machine can never touch (the *left null space*).

Together, these four rooms give us a complete picture of how the matrix machine works, what it can do, and what its limitations are. They are like the blueprint of the machine's operational characteristics.

## 2. Why it matters — real-world applications

The four fundamental subspaces are not just abstract mathematical constructs; they provide the core framework for understanding and solving problems across science and engineering.

1.  **Machine Learning and Data Science (Principal Component Analysis - PCA):** When you have a massive dataset (e.g., customer demographics, image pixels), it can be represented as a matrix. The *row space* helps identify the most significant features or dimensions that capture most of the data's variance, while the *null space* helps identify redundant or irrelevant features. PCA, a foundational dimensionality reduction technique, essentially finds a new basis for the *row space* that best explains the data, allowing for efficient storage, processing, and visualization. Companies like Google (for image recognition) or Netflix (for recommendation systems) use these concepts to handle vast amounts of high-dimensional data.

2.  **Image and Signal Processing (Compression and Filtering):** Images and audio signals are often represented as matrices. The *column space* and *row space* are crucial for understanding how to compress these signals without losing too much information. For instance, JPEG compression uses transforms (like the Discrete Cosine Transform, which can be seen as a matrix operation) to project image data onto a basis that concentrates energy into fewer coefficients, effectively selecting a lower-dimensional *subspace* of the original signal space. The *null space* can be used to understand what information is lost or filtered out during a particular processing step.

3.  **Aerospace and Control Systems:** In designing aircraft or spacecraft, engineers use matrices to model the dynamics of the system (e.g., how control inputs affect position and velocity). The *column space* of the system matrix tells you what states are "reachable" by the control inputs – can you actually maneuver the aircraft to a desired position? The *null space* tells you what control inputs have no effect on the system's state, which might indicate redundant controls or internal unstability. Understanding these subspaces is vital for ensuring stability, controllability, and observability of complex systems.

4.  **Physics and Engineering (Structural Analysis, Quantum Mechanics):** When analyzing structures (like bridges or buildings), engineers use finite element methods, which involve solving large systems of linear equations represented by matrices. The *null space* of the stiffness matrix can reveal "rigid body modes" – movements of the structure that don't cause any internal strain, indicating potential instability if not properly constrained. In quantum mechanics, the states of a system live in vector spaces, and transformations (like Hamiltonian operators) are matrices. The *null space* of certain operators can correspond to conserved quantities or degenerate states, while the *column space* describes the possible outcomes of measurements or transformations.

## 3. Prerequisites — what you must know first

Before diving into the four fundamental subspaces, ensure you have a solid grasp of these core linear algebra concepts:

*   **Vector:** An ordered list of numbers, often representing a point in space or a quantity with direction and magnitude.
*   **Vector Space:** A collection of vectors that satisfies certain axioms, allowing for vector addition and scalar multiplication, and containing the zero vector.
*   **Subspace:** A subset of a vector space that is itself a vector space (i.e., it's closed under vector addition and scalar multiplication, and contains the zero vector).
*   **Linear Combination:** A sum of scalar multiples of vectors, e.g., $c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \dots + c_k \mathbf{v}_k$.
*   **Span:** The set of all possible linear combinations of a given set of vectors; it forms a subspace.
*   **Linear Independence:** A set of vectors is linearly independent if no vector in the set can be written as a linear combination of the others (the only way to get the zero vector is by setting all scalar coefficients to zero).
*   **Basis:** A set of linearly independent vectors that span a vector space (or subspace); it's the minimal set of vectors needed to describe all vectors in that space.
*   **Dimension:** The number of vectors in any basis for a vector space (or subspace).
*   **Matrix:** A rectangular array of numbers, often representing a linear transformation.
*   **Matrix-Vector Multiplication:** The process of multiplying a matrix by a vector, resulting in another vector; this is the core operation of a linear transformation.
*   **System of Linear Equations:** A set of equations involving linear combinations of variables, often written as $A\mathbf{x} = \mathbf{b}$.
*   **Row Echelon Form (REF) and Reduced Row Echelon Form (RREF):** Standardized forms of a matrix obtained through Gaussian elimination, revealing important information about the matrix.
*   **Pivot Variables and Free Variables:** In RREF, pivot variables correspond to columns with leading 1s, while free variables correspond to columns without leading 1s.
*   **Rank:** The number of pivot variables (or non-zero rows in RREF) of a matrix, representing the dimension of its column space (and row space).
*   **Nullity:** The number of free variables in a matrix, representing the dimension of its null space.
*   **Transpose of a Matrix ($A^T$):** A matrix obtained by interchanging the rows and columns of the original matrix $A$.
*   **Dot Product (or Inner Product):** A scalar product of two vectors, defined as $\mathbf{u} \cdot \mathbf{v} = u_1v_1 + u_2v_2 + \dots + u_nv_n$.
*   **Orthogonality:** Two vectors are orthogonal if their dot product is zero ($\mathbf{u} \cdot \mathbf{v} = 0$), meaning they are perpendicular.
*   **Orthogonal Complement ($S^\perp$):** For a subspace $S$, its orthogonal complement $S^\perp$ is the set of all vectors that are orthogonal to every vector in $S$.

## 4. The core idea — step by step

Let's consider an $m \times n$ matrix $A$. This matrix represents a linear transformation $T: \mathbb{R}^n \to \mathbb{R}^m$. This means it takes an input vector $\mathbf{x}$ from $\mathbb{R}^n$ (a space of $n$ dimensions) and produces an output vector $\mathbf{b}$ in $\mathbb{R}^m$ (a space of $m$ dimensions), such that $A\mathbf{x} = \mathbf{b}$.

### Step 1: The Column Space (or Range) of $A$, $C(A)$

**Plain English:** Imagine your matrix $A$ as a machine that combines its columns. The column space is the set of *all possible output vectors* you can get by feeding *any* input vector $\mathbf{x}$ into the machine. It's the "reach" of your matrix – everything it can produce. If you think of the columns of $A$ as ingredients, the column space is all the dishes you can make using those ingredients.

**Concrete Example:** Let $A = \begin{pmatrix} 1 & 2 \\ 3 & 6 \end{pmatrix}$.
If $\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}$, then $A\mathbf{x} = x_1 \begin{pmatrix} 1 \\ 3 \end{pmatrix} + x_2 \begin{pmatrix} 2 \\ 6 \end{pmatrix}$.
Notice that the second column is just 2 times the first column. So, any output $A\mathbf{x}$ will be a multiple of $\begin{pmatrix} 1 \\ 3 \end{pmatrix}$. For example, if $\mathbf{x} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$, output is $\begin{pmatrix} 1 \\ 3 \end{pmatrix}$. If $\mathbf{x} = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$, output is $\begin{pmatrix} 2 \\ 6 \end{pmatrix}$. If $\mathbf{x} = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$, output is $\begin{pmatrix} 3 \\ 9 \end{pmatrix}$. All these outputs lie on the line passing through the origin and $\begin{pmatrix} 1 \\ 3 \end{pmatrix}$. This line is the column space.

**Formal/Mathematical Version:** The column space of an $m \times n$ matrix $A$, denoted $C(A)$ or $\text{Im}(A)$ (Image of $A$), is the span of the columns of $A$. It is a subspace of $\mathbb{R}^m$.
$$C(A) = \{ \mathbf{b} \in \mathbb{R}^m \mid \exists \mathbf{x} \in \mathbb{R}^n \text{ such that } A\mathbf{x} = \mathbf{b} \}$$
Equivalently, it is the set of all linear combinations of the column vectors of $A$:
$$C(A) = \text{span}\{\mathbf{a}_1, \mathbf{a}_2, \dots, \mathbf{a}_n\}$$
where $\mathbf{a}_j$ are the column vectors of $A$.
The dimension of the column space is called the **rank** of $A$, denoted $\text{rank}(A)$. It is equal to the number of pivot columns in the row echelon form of $A$.

**What could go wrong:** Students often confuse the column space with the entire codomain $\mathbb{R}^m$. The column space is only a *subspace* of $\mathbb{R}^m$, meaning it might not fill up the entire $m$-dimensional space. For example, if $A$ is a $3 \times 2$ matrix, its column space is a subspace of $\mathbb{R}^3$, but it can be at most 2-dimensional (a plane or a line), never filling all of $\mathbb{R}^3$.

### Step 2: The Null Space (or Kernel) of $A$, $N(A)$

**Plain English:** The null space is the set of *all input vectors* $\mathbf{x}$ that the matrix machine crushes to the zero vector. These are the inputs that disappear without a trace. If the matrix represents a transformation, the null space tells you what information is lost.

**Concrete Example:** Let $A = \begin{pmatrix} 1 & 2 \\ 3 & 6 \end{pmatrix}$. We want to find $\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}$ such that $A\mathbf{x} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.
This means:
$1x_1 + 2x_2 = 0$
$3x_1 + 6x_2 = 0$
Both equations simplify to $x_1 + 2x_2 = 0$. So, $x_1 = -2x_2$.
If we let $x_2 = t$ (a free variable), then $x_1 = -2t$.
The solutions are of the form $\begin{pmatrix} -2t \\ t \end{pmatrix} = t \begin{pmatrix} -2 \\ 1 \end{pmatrix}$.
This is a line through the origin, spanned by $\begin{pmatrix} -2 \\ 1 \end{pmatrix}$. This line is the null space.

**Formal/Mathematical Version:** The null space of an $m \times n$ matrix $A$, denoted $N(A)$ or $\text{Ker}(A)$ (Kernel of $A$), is the set of all vectors $\mathbf{x}$ in $\mathbb{R}^n$ such that $A\mathbf{x} = \mathbf{0}$. It is a subspace of $\mathbb{R}^n$.
$$N(A) = \{ \mathbf{x} \in \mathbb{R}^n \mid A\mathbf{x} = \mathbf{0} \}$$
The dimension of the null space is called the **nullity** of $A$, denoted $\text{nullity}(A)$. It is equal to the number of free variables in the row echelon form of $A$.

**What could go wrong:** Students might forget that the null space always contains the zero vector (since $A\mathbf{0} = \mathbf{0}$). Also, finding the null space requires solving $A\mathbf{x} = \mathbf{0}$ and expressing the solution in terms of free variables to find a basis. Simply listing a few vectors that map to zero isn't enough; you need to find a basis that spans *all* such vectors.

### Step 3: The Row Space of $A$, $C(A^T)$

**Plain English:** If the column space is about combining columns, the row space is about combining rows. It's the set of *all possible vectors* you can get by taking linear combinations of the rows of $A$. It lives in the input space $\mathbb{R}^n$. Think of the rows as different "features" or "attributes" of an input; the row space tells you which combinations of these features are truly distinct and contribute to the output.

**Concrete Example:** Let $A = \begin{pmatrix} 1 & 2 \\ 3 & 6 \end{pmatrix}$.
The rows are $\mathbf{r}_1 = \begin{pmatrix} 1 & 2 \end{pmatrix}$ and $\mathbf{r}_2 = \begin{pmatrix} 3 & 6 \end{pmatrix}$.
Notice $\mathbf{r}_2 = 3\mathbf{r}_1$. So, any linear combination $c_1 \mathbf{r}_1 + c_2 \mathbf{r}_2$ will be a multiple of $\begin{pmatrix} 1 & 2 \end{pmatrix}$.
The row space is the line through the origin spanned by $\begin{pmatrix} 1 \\ 2 \end{pmatrix}$. This is a subspace of $\mathbb{R}^2$.

**Formal/Mathematical Version:** The row space of an $m \times n$ matrix $A$, denoted $R(A)$ or $C(A^T)$, is the span of the row vectors of $A$. It is a subspace of $\mathbb{R}^n$.
$$R(A) = \{ A^T \mathbf{y} \mid \mathbf{y} \in \mathbb{R}^m \}$$
Equivalently, it is the set of all linear combinations of the row vectors of $A$:
$$R(A) = \text{span}\{\tilde{\mathbf{a}}_1, \tilde{\mathbf{a}}_2, \dots, \tilde{\mathbf{a}}_m\}$$
where $\tilde{\mathbf{a}}_i$ are the row vectors of $A$.
The dimension of the row space is also equal to the **rank** of $A$, $\text{rank}(A)$. It is equal to the number of non-zero rows in the row echelon form of $A$.

**What could go wrong:** It's easy to forget that the row space lives in $\mathbb{R}^n$ (the domain of $A$), while the column space lives in $\mathbb{R}^m$ (the codomain of $A$). A common mistake is to think of the row space as the span of the *rows of the RREF* of $A$, which is correct, but sometimes students forget that these rows are *not* necessarily the same as the original rows of $A$ (they are linear combinations of the original rows). However, they *do* span the same space.

### Step 4: The Left Null Space (or Null Space of $A^T$), $N(A^T)$

**Plain English:** This is the trickiest one conceptually. The left null space (sometimes called the "cokernel") is the set of all vectors $\mathbf{y}$ that, when multiplied by $A$ from the left (i.e., $\mathbf{y}^T A$), produce the zero vector. Or, more intuitively, it's the set of all vectors $\mathbf{y}$ such that $\mathbf{y}^T \mathbf{b} = 0$ for *every* vector $\mathbf{b}$ in the column space of $A$. This means the left null space consists of vectors that are "perpendicular" or "orthogonal" to *everything* the matrix $A$ can produce. It tells you about inconsistencies in $A\mathbf{x} = \mathbf{b}$ – if $\mathbf{b}$ is not in $C(A)$, then it must be orthogonal to some vector in $N(A^T)$.

**Concrete Example:** Let $A = \begin{pmatrix} 1 & 2 \\ 3 & 6 \end{pmatrix}$. We want to find $\mathbf{y} = \begin{pmatrix} y_1 \\ y_2 \end{pmatrix}$ such that $A^T \mathbf{y} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.
$A^T = \begin{pmatrix} 1 & 3 \\ 2 & 6 \end{pmatrix}$.
So, $1y_1 + 3y_2 = 0$
$2y_1 + 6y_2 = 0$
Both equations simplify to $y_1 + 3y_2 = 0$. So, $y_1 = -3y_2$.
If we let $y_2 = t$, then $y_1 = -3t$.
The solutions are of the form $\begin{pmatrix} -3t \\ t \end{pmatrix} = t \begin{pmatrix} -3 \\ 1 \end{pmatrix}$.
This is a line through the origin, spanned by $\begin{pmatrix} -3 \\ 1 \end{pmatrix}$. This line is the left null space.

**Formal/Mathematical Version:** The left null space of an $m \times n$ matrix $A$, denoted $N(A^T)$ or $\text{Ker}(A^T)$, is the null space of its transpose $A^T$. It is the set of all vectors $\mathbf{y}$ in $\mathbb{R}^m$ such that $A^T \mathbf{y} = \mathbf{0}$. It is a subspace of $\mathbb{R}^m$.
$$N(A^T) = \{ \mathbf{y} \in \mathbb{R}^m \mid A^T \mathbf{y} = \mathbf{0} \}$$
The dimension of the left null space is $\text{nullity}(A^T)$.

**What could go wrong:** The biggest trap here is the name "left null space." It's called that because if you write $A^T \mathbf{y} = \mathbf{0}$, then taking the transpose of both sides gives $\mathbf{y}^T A = \mathbf{0}^T$. So, $\mathbf{y}^T$ is a vector that annihilates $A$ when multiplied from the left. Students often forget to transpose the matrix $A$ before finding its null space. Also, remember that $N(A^T)$ lives in $\mathbb{R}^m$, just like $C(A)$.

### Step 5: The Orthogonal Complement Relationships

**Plain English:** This is where the magic happens. These four subspaces are not just randomly floating around; they are intimately connected through orthogonality.
*   The null space $N(A)$ (inputs that get killed) is perpendicular to the row space $C(A^T)$ (effective inputs). This means any vector that gets killed by $A$ must be perpendicular to any combination of the rows of $A$. This makes sense: if $\mathbf{x}$ is in $N(A)$, then $A\mathbf{x} = \mathbf{0}$. This means each row of $A$ dotted with $\mathbf{x}$ is zero.
*   The left null space $N(A^T)$ (vectors orthogonal to all outputs) is perpendicular to the column space $C(A)$ (all possible outputs). This means any vector that is "unreachable" by $A$ must be perpendicular to any vector that *can* be reached by $A$. This is why $A\mathbf{x}=\mathbf{b}$ has a solution *if and only if* $\mathbf{b}$ is orthogonal to every vector in $N(A^T)$.

**Formal/Mathematical Version:**
1.  The null space $N(A)$ is the orthogonal complement of the row space $C(A^T)$ in $\mathbb{R}^n$.
    $$N(A) = (C(A^T))^\perp$$
    This means for any $\mathbf{x} \in N(A)$ and any $\mathbf{r} \in C(A^T)$, we have $\mathbf{x} \cdot \mathbf{r} = 0$.
2.  The row space $C(A^T)$ is the orthogonal complement of the null space $N(A)$ in $\mathbb{R}^n$.
    $$C(A^T) = (N(A))^\perp$$
3.  The left null space $N(A^T)$ is the orthogonal complement of the column space $C(A)$ in $\mathbb{R}^m$.
    $$N(A^T) = (C(A))^\perp$$
    This means for any $\mathbf{y} \in N(A^T)$ and any $\mathbf{b} \in C(A)$, we have $\mathbf{y} \cdot \mathbf{b} = 0$.
4.  The column space $C(A)$ is the orthogonal complement of the left null space $N(A^T)$ in $\mathbb{R}^m$.
    $$C(A) = (N(A^T))^\perp$$

**What could go wrong:** Students often incorrectly assume that $N(A)$ is orthogonal to $C(A)$. This is generally false. $N(A)$ is in $\mathbb{R}^n$ and $C(A)$ is in $\mathbb{R}^m$, so they can't be orthogonal unless $n=m$ and the spaces happen to align, which is not guaranteed. The orthogonality is specific: $N(A)$ is orthogonal to $C(A^T)$, and $N(A^T)$ is orthogonal to $C(A)$.

### Step 6: The Fundamental Theorem of Linear Algebra (Part 1)

**Plain English:** This theorem beautifully summarizes the dimensions of these spaces and their orthogonal relationships. It tells us that the "effective inputs" (row space) and "destroyed inputs" (null space) together completely fill up the input space $\mathbb{R}^n$. Similarly, the "possible outputs" (column space) and "unreachable outputs" (left null space) together completely fill up the output space $\mathbb{R}^m$.

**Formal/Mathematical Version:** For an $m \times n$ matrix $A$:
1.  **Dimension Theorem (Rank-Nullity Theorem):**
    $$\text{dim}(C(A)) + \text{dim}(N(A)) = n$$
    $$\text{rank}(A) + \text{nullity}(A) = n$$
    This means the dimension of the row space (which is equal to $\text{rank}(A)$) plus the dimension of the null space equals the dimension of the domain $\mathbb{R}^n$.
2.  **Dimension Theorem for $A^T$:**
    $$\text{dim}(C(A^T)) + \text{dim}(N(A^T)) = m$$
    $$\text{rank}(A^T) + \text{nullity}(A^T) = m$$
    Since $\text{rank}(A) = \text{rank}(A^T)$, we can write:
    $$\text{rank}(A) + \text{nullity}(A^T) = m$$

**What could go wrong:** Forgetting which dimension (n or m) applies to which sum. The sum of dimensions for spaces in $\mathbb{R}^n$ (Row Space and Null Space) equals $n$. The sum of dimensions for spaces in $\mathbb{R}^m$ (Column Space and Left Null Space) equals $m$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple 2x2 Matrix (Full Rank)

**Problem:** Find a basis for each of the four fundamental subspaces for the matrix $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$. Also state their dimensions.

**Given:** Matrix $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$.
**Want:** Bases for $C(A)$, $N(A)$, $C(A^T)$, $N(A^T)$ and their dimensions.

**Step 1: Find the Reduced Row Echelon Form (RREF) of A.**
This will help us find bases for $C(A)$, $N(A)$, and $C(A^T)$.

$$A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$$
$$R_2 \to R_2 - 3R_1$$
$$\begin{pmatrix} 1 & 2 \\ 0 & -2 \end{pmatrix}$$
$$R_2 \to -\frac{1}{2}R_2$$
$$\begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}$$
$$R_1 \to R_1 - 2R_2$$
$$\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} \quad \text{This is RREF}(A)$$
*Explanation: We perform Gaussian elimination to simplify the matrix. The goal is to get leading 1s and zeros above and below them. This RREF tells us the matrix is invertible.*

**Step 2: Find the Column Space $C(A)$.**
The basis for the column space consists of the original columns of $A$ corresponding to the pivot columns in RREF($A$).
In RREF($A$) = $\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$, both columns are pivot columns.
So, the basis for $C(A)$ consists of both columns of the original matrix $A$.
$$C(A) = \text{span}\left\{ \begin{pmatrix} 1 \\ 3 \end{pmatrix}, \begin{pmatrix} 2 \\ 4 \end{pmatrix} \right\}$$
The dimension of $C(A)$ is the number of basis vectors.
$$\text{dim}(C(A)) = 2$$
*Explanation: Since RREF(A) has pivots in every column, all original columns are linearly independent and span $\mathbb{R}^2$. The column space is $\mathbb{R}^2$ itself.*

**Step 3: Find the Null Space $N(A)$.**
To find $N(A)$, we solve $A\mathbf{x} = \mathbf{0}$. Using RREF($A$) $\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$, we have:
$1x_1 + 0x_2 = 0 \implies x_1 = 0$
$0x_1 + 1x_2 = 0 \implies x_2 = 0$
The only solution is $\mathbf{x} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.
$$N(A) = \text{span}\left\{ \begin{pmatrix} 0 \\ 0 \end{pmatrix} \right\} = \{ \mathbf{0} \}$$
The dimension of $N(A)$ is the number of free variables. There are no free variables.
$$\text{dim}(N(A)) = 0$$
*Explanation: An invertible matrix (like this one, since its RREF is the identity) has a null space containing only the zero vector. This means the transformation $A$ maps only the zero vector to the zero vector.*

**Step 4: Find the Row Space $C(A^T)$.**
The basis for the row space consists of the non-zero rows of RREF($A$).
In RREF($A$) = $\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$, both rows are non-zero.
$$C(A^T) = \text{span}\left\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right\}$$
The dimension of $C(A^T)$ is the number of basis vectors.
$$\text{dim}(C(A^T)) = 2$$
*Explanation: The non-zero rows of the RREF form a basis for the row space. Since the RREF is the identity matrix, the standard basis vectors for $\mathbb{R}^2$ form a basis for the row space. The row space is $\mathbb{R}^2$ itself.*

**Step 5: Find the Left Null Space $N(A^T)$.**
First, find $A^T$:
$$A^T = \begin{pmatrix} 1 & 3 \\ 2 & 4 \end{pmatrix}$$
Now, find the RREF of $A^T$ to solve $A^T \mathbf{y} = \mathbf{0}$.
$$\begin{pmatrix} 1 & 3 \\ 2 & 4 \end{pmatrix}$$
$$R_2 \to R_2 - 2R_1$$
$$\begin{pmatrix} 1 & 3 \\ 0 & -2 \end{pmatrix}$$
$$R_2 \to -\frac{1}{2}R_2$$
$$\begin{pmatrix} 1 & 3 \\ 0 & 1 \end{pmatrix}$$
$$R_1 \to R_1 - 3R_2$$
$$\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} \quad \text{This is RREF}(A^T)$$
Solving $A^T \mathbf{y} = \mathbf{0}$ with RREF($A^T$):
$1y_1 + 0y_2 = 0 \implies y_1 = 0$
$0y_1 + 1y_2 = 0 \implies y_2 = 0$
The only solution is $\mathbf{y} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.
$$N(A^T) = \text{span}\left\{ \begin{pmatrix} 0 \\ 0 \end{pmatrix} \right\} = \{ \mathbf{0} \}$$
The dimension of $N(A^T)$ is the number of free variables. There are no free variables.
$$\text{dim}(N(A^T)) = 0$$
*Explanation: Since $A$ is invertible, $A^T$ is also invertible. Therefore, its null space (the left null space of $A$) also contains only the zero vector.*

**Summary of Results:**
*   **Column Space $C(A)$:** Basis = $\left\{ \begin{pmatrix} 1 \\ 3 \end{pmatrix}, \begin{pmatrix} 2 \\ 4 \end{pmatrix} \right\}$, Dimension = 2
*   **Null Space $N(A)$:** Basis = $\left\{ \begin{pmatrix} 0 \\ 0 \end{pmatrix} \right\}$, Dimension = 0
*   **Row Space $C(A^T)$:** Basis = $\left\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right\}$, Dimension = 2
*   **Left Null Space $N(A^T)$:** Basis = $\left\{ \begin{pmatrix} 0 \\ 0 \end{pmatrix} \right\}$, Dimension = 0

**Reflection:** This example was "easy" because the matrix was full rank (invertible). This means its column space fills the entire output space, and its null space is just the zero vector. Similarly for its transpose. The rank is 2, and $n=2$, $m=2$. We see $\text{rank}(A) + \text{nullity}(A) = 2+0=2=n$ and $\text{rank}(A) + \text{nullity}(A^T) = 2+0=2=m$.

---

### Example 2: 3x3 Matrix (Singular)

**Problem:** Find a basis for each of the four fundamental subspaces for the matrix $A = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}$. Also state their dimensions.

**Given:** Matrix $A = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}$.
**Want:** Bases for $C(A)$, $N(A)$, $C(A^T)$, $N(A^T)$ and their dimensions.

**Step 1: Find the RREF of A.**
$$A = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}$$
$$R_2 \to R_2 - 4R_1$$
$$R_3 \to R_3 - 7R_1$$
$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & -3 & -6 \\ 0 & -6 & -12 \end{pmatrix}$$
$$R_2 \to -\frac{1}{3}R_2$$
$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 2 \\ 0 & -6 & -12 \end{pmatrix}$$
$$R_3 \to R_3 + 6R_2$$
$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 2 \\ 0 & 0 & 0 \end{pmatrix}$$
$$R_1 \to R_1 - 2R_2$$
$$\begin{pmatrix} 1 & 0 & -1 \\ 0 & 1 & 2 \\ 0 & 0 & 0 \end{pmatrix} \quad \text{This is RREF}(A)$$
*Explanation: We perform Gaussian elimination. The presence of a row of zeros in RREF(A) indicates that the matrix is singular (not invertible) and its rank is less than its dimension.*

**Step 2: Find the Column Space $C(A)$.**
Pivot columns in RREF($A$) are columns 1 and 2.
The basis for $C(A)$ consists of the original columns of $A$ corresponding to these pivot columns.
$$C(A) = \text{span}\left\{ \begin{pmatrix} 1 \\ 4 \\ 7 \end{pmatrix}, \begin{pmatrix} 2 \\ 5 \\ 8 \end{pmatrix} \right\}$$
$$\text{dim}(C(A)) = 2$$
*Explanation: The first two columns of RREF(A) have leading 1s, so the first two columns of the original matrix A form a basis for the column space. The dimension is 2, which is the rank of A.*

**Step 3: Find the Null Space $N(A)$.**
Solve $A\mathbf{x} = \mathbf{0}$ using RREF($A$):
$x_1 - x_3 = 0 \implies x_1 = x_3$
$x_2 + 2x_3 = 0 \implies x_2 = -2x_3$
$x_3$ is a free variable. Let $x_3 = t$.
Then $x_1 = t$, $x_2 = -2t$.
The solution vector is $\mathbf{x} = \begin{pmatrix} t \\ -2t \\ t \end{pmatrix} = t \begin{pmatrix} 1 \\ -2 \\ 1 \end{pmatrix}$.
$$N(A) = \text{span}\left\{ \begin{pmatrix} 1 \\ -2 \\ 1 \end{pmatrix} \right\}$$
$$\text{dim}(N(A)) = 1$$
*Explanation: We express the pivot variables in terms of the free variables. Since there is one free variable ($x_3$), the null space has dimension 1, and its basis is found by setting the free variable to 1.*

**Step 4: Find the Row Space $C(A^T)$.**
The basis for $C(A^T)$ consists of the non-zero rows of RREF($A$).
These are $\begin{pmatrix} 1 & 0 & -1 \end{pmatrix}$ and $\begin{pmatrix} 0 & 1 & 2 \end{pmatrix}$.
$$C(A^T) = \text{span}\left\{ \begin{pmatrix} 1 \\ 0 \\ -1 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix} \right\}$$
$$\text{dim}(C(A^T)) = 2$$
*Explanation: The two non-zero rows of RREF(A) are linearly independent and span the row space. The dimension is 2, which is also the rank of A.*

**Step 5: Find the Left Null Space $N(A^T)$.**
First, find $A^T$:
$$A^T = \begin{pmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{pmatrix}$$
Now, find the RREF of $A^T$ to solve $A^T \mathbf{y} = \mathbf{0}$.
$$\begin{pmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{pmatrix}$$
$$R_2 \to R_2 - 2R_1$$
$$R_3 \to R_3 - 3R_1$$
$$\begin{pmatrix} 1 & 4 & 7 \\ 0 & -3 & -6 \\ 0 & -6 & -12 \end{pmatrix}$$
$$R_2 \to -\frac{1}{3}R_2$$
$$\begin{pmatrix} 1 & 4 & 7 \\ 0 & 1 & 2 \\ 0 & -6 & -12 \end{pmatrix}$$
$$R_3 \to R_3 + 6R_2$$
$$\begin{pmatrix} 1 & 4 & 7 \\ 0 & 1 & 2 \\ 0 & 0 & 0 \end{pmatrix}$$
$$R_1 \to R_1 - 4R_2$$
$$\begin{pmatrix} 1 & 0 & -1 \\ 0 & 1 & 2 \\ 0 & 0 & 0 \end{pmatrix} \quad \text{This is RREF}(A^T)$$
Solving $A^T \mathbf{y} = \mathbf{0}$:
$y_1 - y_3 = 0 \implies y_1 = y_3$
$y_2 + 2y_3 = 0 \implies y_2 = -2y_3$
$y_3$ is a free variable. Let $y_3 = s$.
Then $y_1 = s$, $y_2 = -2s$.
The solution vector is $\mathbf{y} = \begin{pmatrix} s \\ -2s \\ s \end{pmatrix} = s \begin{pmatrix} 1 \\ -2 \\ 1 \end{pmatrix}$.
$$N(A^T) = \text{span}\left\{ \begin{pmatrix} 1 \\ -2 \\ 1 \end{pmatrix} \right\}$$
$$\text{dim}(N(A^T)) = 1$$
*Explanation: Similar to finding N(A), we solve $A^T \mathbf{y} = \mathbf{0}$ by identifying free variables. Here, $y_3$ is free, leading to a 1-dimensional left null space.*

**Summary of Results:**
*   **Column Space $C(A)$:** Basis = $\left\{ \begin{pmatrix} 1 \\ 4 \\ 7 \end{pmatrix}, \begin{pmatrix} 2 \\ 5 \\ 8 \end{pmatrix} \right\}$, Dimension = 2
*   **Null Space $N(A)$:** Basis = $\left\{ \begin{pmatrix} 1 \\ -2 \\ 1 \end{pmatrix} \right\}$, Dimension = 1
*   **Row Space $C(A^T)$:** Basis = $\left\{ \begin{pmatrix} 1 \\ 0 \\ -1 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix} \right\}$, Dimension = 2
*   **Left Null Space $N(A^T)$:** Basis = $\left\{ \begin{pmatrix} 1 \\ -2 \\ 1 \end{pmatrix} \right\}$, Dimension = 1

**Reflection:** This example demonstrates a singular matrix. The rank is 2. Here, $n=3$, $m=3$.
$\text{rank}(A) + \text{nullity}(A) = 2+1=3=n$.
$\text{rank}(A) + \text{nullity}(A^T) = 2+1=3=m$.
Notice that $N(A)$ and $N(A^T)$ happen to have the same basis in this specific case, but this is not generally true. It's a coincidence arising from the specific structure of this matrix.

---

### Example 3: 3x4 Matrix (More Columns than Rows)

**Problem:** Find a basis for each of the four fundamental subspaces for the matrix $A = \begin{pmatrix} 1 & 2 & 1 & 0 \\ 2 & 4 & 1 & 1 \\ 3 & 6 & 2 & 1 \end{pmatrix}$. Also state their dimensions.

**Given:** Matrix $A = \begin{pmatrix} 1 & 2 & 1 & 0 \\ 2 & 4 & 1 & 1 \\ 3 & 6 & 2 & 1 \end{pmatrix}$.
**Want:** Bases for $C(A)$, $N(A)$, $C(A^T)$, $N(A^T)$ and their dimensions.

**Step 1: Find the RREF of A.**
$$A = \begin{pmatrix} 1 & 2 & 1 & 0 \\ 2 & 4 & 1 & 1 \\ 3 & 6 & 2 & 1 \end{pmatrix}$$
$$R_2 \to R_2 - 2R_1$$
$$R_3 \to R_3 - 3R_1$$
$$\begin{pmatrix} 1 & 2 & 1 & 0 \\ 0 & 0 & -1 & 1 \\ 0 & 0 & -1 & 1 \end{pmatrix}$$
$$R_3 \to R_3 - R_2$$
$$\begin{pmatrix} 1 & 2 & 1 & 0 \\ 0 & 0 & -1 & 1 \\ 0 & 0 & 0 & 0 \end{pmatrix}$$
$$R_2 \to -R_2$$
$$\begin{pmatrix} 1 & 2 & 1 & 0 \\ 0 & 0 & 1 & -1 \\ 0 & 0 & 0 & 0 \end{pmatrix}$$
$$R_1 \to R_1 - R_2$$
$$\begin{pmatrix} 1 & 2 & 0 & 1 \\ 0 & 0 & 1 & -1 \\ 0 & 0 & 0 & 0 \end{pmatrix} \quad \text{This is RREF}(A)$$
*Explanation: We perform Gaussian elimination. Notice that column 2 is a multiple of column 1, and the third row becomes zero after operations. This indicates linear dependence among columns and rows.*

**Step 2: Find the Column Space $C(A)$.**
Pivot columns in RREF($A$) are columns 1 and 3.
The basis for $C(A)$ consists of the original columns of $A$ corresponding to these pivot columns.
$$C(A) = \text{span}\left\{ \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \\ 2 \end{pmatrix} \right\}$$
$$\text{dim}(C(A)) = 2$$
*Explanation: The first and third columns of RREF(A) are pivot columns, so the corresponding original columns of A form a basis for the column space. The dimension is 2.*

**Step 3: Find the Null Space $N(A)$.**
Solve $A\mathbf{x} = \mathbf{0}$ using RREF($A$):
$x_1 + 2x_2 + x_4 = 0 \implies x_1 = -2x_2 - x_4$
$x_3 - x_4 = 0 \implies x_3 = x_4$
$x_2$ and $x_4$ are free variables.
Let $x_2 = t$ and $x_4 = s$.
Then $x_1 = -2t - s$, $x_3 = s$.
The solution vector is $\mathbf{x} = \begin{pmatrix} -2t - s \\ t \\ s \\ s \end{pmatrix} = t \begin{pmatrix} -2 \\ 1 \\ 0 \\ 0 \end{pmatrix} + s \begin{pmatrix} -1 \\ 0 \\ 1 \\ 1 \end{pmatrix}$.
$$N(A) = \text{span}\left\{ \begin{pmatrix} -2 \\ 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} -1 \\ 0 \\ 1 \\ 1 \end{pmatrix} \right\}$$
$$\text{dim}(N(A)) = 2$$
*Explanation: With two free variables ($x_2$ and $x_4$), the null space is 2-dimensional. We set one free variable to 1 and others to 0 to find each basis vector.*

**Step 4: Find the Row Space $C(A^T)$.**
The basis for $C(A^T)$ consists of the non-zero rows of RREF($A$).
These are $\begin{pmatrix} 1 & 2 & 0 & 1 \end{pmatrix}$ and $\begin{pmatrix} 0 & 0 & 1 & -1 \end{pmatrix}$.
$$C(A^T) = \text{span}\left\{ \begin{pmatrix} 1 \\ 2 \\ 0 \\ 1 \end{pmatrix}, \begin{pmatrix} 0 \\ 0 \\ 1 \\ -1 \end{pmatrix} \right\}$$
$$\text{dim}(C(A^T)) = 2$$
*Explanation: The two non-zero rows of RREF(A) are linearly independent and form a basis for the row space.*

**Step 5: Find the Left Null Space $N(A^T)$.**
First, find $A^T$:
$$A^T = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 1 & 1 & 2 \\ 0 & 1 & 1 \end{pmatrix}$$
Now, find the RREF of $A^T$ to solve $A^T \mathbf{y} = \mathbf{0}$.
$$\begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 1 & 1 & 2 \\ 0 & 1 & 1 \end{pmatrix}$$
$$R_2 \to R_2 - 2R_1$$
$$R_3 \to R_3 - R_1$$
$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \\ 0 & -1 & -1 \\ 0 & 1 & 1 \end{pmatrix}$$
Swap $R_2$ and $R_3$:
$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & -1 & -1 \\ 0 & 0 & 0 \\ 0 & 1 & 1 \end{pmatrix}$$
$$R_2 \to -R_2$$
$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \\ 0 & 1 & 1 \end{pmatrix}$$
$$R_4 \to R_4 - R_2$$
$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{pmatrix}$$
$$R_1 \to R_1 - 2R_2$$
$$\begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{pmatrix} \quad \text{This is RREF}(A^T)$$
Solving $A^T \mathbf{y} = \mathbf{0}$:
$y_1 + y_3 = 0 \implies y_1 = -y_3$
$y_2 + y_3 = 0 \implies y_2 = -y_3$
$y_3$ is a free variable. Let $y_3 = s$.
Then $y_1 = -s$, $y_2 = -s$.
The solution vector is $\mathbf{y} = \begin{pmatrix} -s \\ -s \\ s \end{pmatrix} = s \begin{pmatrix} -1 \\ -1 \\ 1 \end{pmatrix}$.
$$N(A^T) = \text{span}\left\{ \begin{pmatrix} -1 \\ -1 \\ 1 \end{pmatrix} \right\}$$
$$\text{dim}(N(A^T)) = 1$$
*Explanation: We solve $A^T \mathbf{y} = \mathbf{0}$. There's one free variable ($y_3$), so the left null space is 1-dimensional.*

**Summary of Results:**
*   **Column Space $C(A)$:** Basis = $\left\{ \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \\ 2 \end{pmatrix} \right\}$, Dimension = 2
*   **Null Space $N(A)$:** Basis = $\left\{ \begin{pmatrix} -2 \\ 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} -1 \\ 0 \\ 1 \\ 1 \end{pmatrix} \right\}$, Dimension = 2
*   **Row Space $C(A^T)$:** Basis = $\left\{ \begin{pmatrix} 1 \\ 2 \\ 0 \\ 1 \end{pmatrix}, \begin{pmatrix} 0 \\ 0 \\ 1 \\ -1 \end{pmatrix} \right\}$, Dimension = 2
*   **Left Null Space $N(A^T)$:** Basis = $\left\{ \begin{pmatrix} -1 \\ -1 \\ 1 \end{pmatrix} \right\}$, Dimension = 1

**Reflection:** This example highlights the case where $n \neq m$. Here, $A$ is $3 \times 4$, so $m=3$, $n=4$. The rank is 2.
$\text{rank}(A) + \text{nullity}(A) = 2+2=4=n$.
$\text{rank}(A) + \text{nullity}(A^T) = 2+1=3=m$.
Notice that the null space has a dimension greater than zero, which is expected for a "wide" matrix ($n > m$) that isn't full row rank. The left null space also has a dimension greater than zero, implying that not all vectors in $\mathbb{R}^3$ are in the column space of $A$.

---

### Example 4: 4x3 Matrix (More Rows than Columns)

**Problem:** Find a basis for each of the four fundamental subspaces for the matrix $A = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 1 & 1 & 2 \\ 1 & -1 & 0 \end{pmatrix}$. Also state their dimensions.

**Given:** Matrix $A = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 1 & 1 & 2 \\ 1 & -1 & 0 \end{pmatrix}$.
**Want:** Bases for $C(A)$, $N(A)$, $C(A^T)$, $N(A^T)$ and their dimensions.

**Step 1: Find the RREF of A.**
$$A = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 1 & 1 & 2 \\ 1 & -1 & 0 \end{pmatrix}$$
$$R_3 \to R_3 - R_1$$
$$R_4 \to R_4 - R_1$$
$$\begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & -1 & -1 \end{pmatrix}$$
$$R_3 \to R_3 - R_2$$
$$R_4 \to R_4 + R_2$$
$$\begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{pmatrix} \quad \text{This is RREF}(A)$$
*Explanation: We perform Gaussian elimination. The last two rows become zero, indicating that the original rows were linearly dependent.*

**Step 2: Find the Column Space $C(A)$.**
Pivot columns in RREF($A$) are columns 1 and 2.
The basis for $C(A)$ consists of the original columns of $A$ corresponding to these pivot columns.
$$C(A) = \text{span}\left\{ \begin{pmatrix} 1 \\ 0 \\ 1 \\ 1 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 1 \\ -1 \end{pmatrix} \right\}$$
$$\text{dim}(C(A)) = 2$$
*Explanation: The first two columns of RREF(A) are pivot columns, so the first two original columns of A form a basis for the column space. The dimension is 2.*

**Step 3: Find the Null Space $N(A)$.**
Solve $A\mathbf{x} = \mathbf{0}$ using RREF($A$):
$x_1 + x_3 = 0 \implies x_1 = -x_3$
$x_2 + x_3 = 0 \implies x_2 = -x_3$
$x_3$ is a free variable. Let $x_3 = t$.
Then $x_1 = -t$, $x_2 = -t$.
The solution vector is $\mathbf{x} = \begin{pmatrix} -t \\ -t \\ t \end{pmatrix} = t \begin{pmatrix} -1 \\ -1 \\ 1 \end{pmatrix}$.
$$N(A) = \text{span}\left\{ \begin{pmatrix} -1 \\ -1 \\ 1 \end{pmatrix} \right\}$$
$$\text{dim}(N(A)) = 1$$
*Explanation: With one free variable ($x_3$), the null space is 1-dimensional. Its basis is found by setting $x_3=1$.*

**Step 4: Find the Row Space $C(A^T)$.**
The basis for $C(A^T)$ consists of the non-zero rows of RREF($A$).
These are $\begin{pmatrix} 1 & 0 & 1 \end{pmatrix}$ and $\begin{pmatrix} 0 & 1 & 1 \end{pmatrix}$.
$$C(A^T) = \text{span}\left\{ \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix} \right\}$$
$$\text{dim}(C(A^T)) = 2$$
*Explanation: The two non-zero rows of RREF(A) are linearly independent and form a basis for the row space.*

**Step 5: Find the Left Null Space $N(A^T)$.**
First, find $A^T$:
$$A^T = \begin{pmatrix} 1 & 0 & 1 & 1 \\ 0 & 1 & 1 & -1 \\ 1 & 1 & 2 & 0 \end{pmatrix}$$
Now, find the RREF of $A^T$ to solve $A^T \mathbf{y} = \mathbf{0}$.
$$\begin{pmatrix} 1 & 0 & 1 & 1 \\ 0 & 1 & 1 & -1 \\ 1 & 1 & 2 & 0 \end{pmatrix}$$
$$R_3 \to R_3 - R_1$$
$$\begin{pmatrix} 1 & 0 & 1 & 1 \\ 0 & 1 & 1 & -1 \\ 0 & 1 & 1 & -1 \end{pmatrix}$$
$$R_3 \to R_3 - R_2$$
$$\begin{pmatrix} 1 & 0 & 1 & 1 \\ 0 & 1 & 1 & -1 \\ 0 & 0 & 0 & 0 \end{pmatrix} \quad \text{This is RREF}(A^T)$$
Solving $A^T \mathbf{y} = \mathbf{0}$:
$y_1 + y_3 + y_4 = 0 \implies y_1 = -y_3 - y_4$
$y_2 + y_3 - y_4 = 0 \implies y_2 = -y_3 + y_4$
$y_3$ and $y_4$ are free variables.
Let $y_3 = s$ and $y_4 = t$.
Then $y_1 = -s - t$, $y_2 = -s + t$.
The solution vector is $\mathbf{y} = \begin{pmatrix} -s - t \\ -s + t \\ s \\ t \end{pmatrix} = s \begin{pmatrix} -1 \\ -1 \\ 1 \\ 0 \end{pmatrix} + t \begin{pmatrix} -1 \\ 1 \\ 0 \\ 1 \end{pmatrix}$.
$$N(A^T) = \text{span}\left\{ \begin{pmatrix} -1 \\ -1 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} -1 \\ 1 \\ 0 \\ 1 \end{pmatrix} \right\}$$
$$\text{dim}(N(A^T)) = 2$$
*Explanation: We solve $A^T \mathbf{y} = \mathbf{0}$. There are two free variables ($y_3$ and $y_4$), so the left null space is 2-dimensional.*

**Summary of Results:**
*   **Column Space $C(A)$:** Basis = $\left\{ \begin{pmatrix} 1 \\ 0 \\ 1 \\ 1 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 1 \\ -1 \end{pmatrix} \right\}$, Dimension = 2
*   **Null Space $N(A)$:** Basis = $\left\{ \begin{pmatrix} -1 \\ -1 \\ 1 \end{pmatrix} \right\}$, Dimension = 1
*   **Row Space $C(A^T)$:** Basis = $\left\{ \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix} \right\}$, Dimension = 2
*   **Left Null Space $N(A^T)$:** Basis = $\left\{ \begin{pmatrix} -1 \\ -1 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} -1 \\ 1 \\ 0 \\ 1 \end{pmatrix} \right\}$, Dimension = 2

**Reflection:** This example shows a "tall" matrix ($m > n$). Here, $A$ is $4 \times 3$, so $m=4$, $n=3$. The rank is 2.
$\text{rank}(A) + \text{nullity}(A) = 2+1=3=n$.
$\text{rank}(A) + \text{nullity}(A^T) = 2+2=4=m$.
The null space is 1-dimensional, meaning there's a non-trivial set of inputs that get mapped to zero. The left null space is 2-dimensional, indicating that the column space does not fill $\mathbb{R}^4$ (it's a 2D plane in 4D space), and there's a 2D space of vectors orthogonal to all possible outputs.

## 6. Common mistakes and traps

1.  **Confusing the ambient spaces:** Students often forget that $C(A)$ and $N(A^T)$ are subspaces of $\mathbb{R}^m$ (the codomain), while $N(A)$ and $C(A^T)$ are subspaces of $\mathbb{R}^n$ (the domain). This is crucial for understanding the dimensions and orthogonal relationships.
2.  **Using RREF columns for $C(A)$:** The basis for $C(A)$ must be chosen from the *original* columns of $A$ that correspond to the pivot columns in RREF($A$). Using the pivot columns from RREF($A$) itself is incorrect, as they generally don't form the same space as the original columns.
3.  **Incorrectly finding a basis for $N(A)$ or $N(A^T)$:** When solving $A\mathbf{x} = \mathbf{0}$ (or $A^T\mathbf{y} = \mathbf{0}$), students sometimes just list a few solutions instead of expressing the general solution in terms of free variables to find a proper basis. Each free variable corresponds to one basis vector.
4.  **Forgetting to transpose for $N(A^T)$ and $C(A^T)$:** The left null space is the null space of $A^T$, and the row space is the column space of $A^T$. It's easy to just work with $A$ for all four, leading to incorrect results for the latter two.
5.  **Misunderstanding orthogonality:** Assuming $C(A)$ is orthogonal to $N(A)$. This is incorrect. The correct orthogonal pairs are $(C(A^T), N(A))$ in $\mathbb{R}^n$ and $(C(A), N(A^T))$ in $\mathbb{R}^m$.
6.  **Algebraic errors in Gaussian elimination:** Finding the RREF is foundational to all four subspaces. A single arithmetic error can propagate and lead to incorrect bases and dimensions for all subspaces. Double-checking RREF is vital.

## 7. Textbook-precise explanation

Let $A$ be an $m \times n$ matrix with real entries. This matrix represents a linear transformation $T: \mathbb{R}^n \to \mathbb{R}^m$ defined by $T(\mathbf{x}) = A\mathbf{x}$.

1.  **Column Space (Image or Range) of $A$, $C(A)$ or $\text{Im}(A)$:**
    The column space of $A$ is the set of all possible linear combinations of the column vectors of $A$. It is a subspace of $\mathbb{R}^m$.
    $$C(A) = \{ \mathbf{b} \in \mathbb{R}^m \mid \exists \mathbf{x} \in \mathbb{R}^n \text{ such that } A\mathbf{x} = \mathbf{b} \}$$
    A basis for $C(A)$ consists of the columns of $A$ that correspond to the pivot columns in the Reduced Row Echelon Form (RREF) of $A$. The dimension of $C(A)$ is the **rank** of $A$, denoted $\text{rank}(A)$. (Lay, Linear Algebra and Its Applications, §2.8)

2.  **Null Space (Kernel) of $A$, $N(A)$ or $\text{Ker}(A)$:**
    The null space of $A$ is the set of all vectors $\mathbf{x}$ in $\mathbb{R}^n$ that are mapped to the zero vector in $\mathbb{R}^m$ by the transformation $T$. It is a subspace of $\mathbb{R}^n$.
    $$N(A) = \{ \mathbf{x} \in \mathbb{R}^n \mid A\mathbf{x} = \mathbf{0} \}$$
    A basis for $N(A)$ is found