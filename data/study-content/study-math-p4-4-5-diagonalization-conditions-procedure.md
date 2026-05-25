## 1. What it is — in plain English

Imagine you have a complex machine, like a tangled ball of yarn. It's hard to see what's going on, and if you try to pull a thread, everything else moves in unpredictable ways. Diagonalization is like untangling that ball of yarn and neatly winding it onto a spool. You haven't changed the yarn itself, just how it's organized, making it much simpler to understand and work with.

In the world of matrices, a matrix represents a transformation — a way of moving or changing vectors. When a matrix is "diagonal," it means it only stretches or shrinks vectors along the main axes, without rotating them or mixing their components. It's the simplest possible kind of transformation.

Diagonalization is the process of finding a special "coordinate system" (a new basis) where a given matrix, which might look complicated in the standard coordinate system, behaves like a simple diagonal matrix. It's like looking at the tangled yarn from a different angle where all its threads appear perfectly straight and aligned.

So, in essence, diagonalization is about simplifying a linear transformation by expressing its matrix in a basis where it acts as simply as possible: just scaling along the basis vectors. We're not changing the transformation itself, just its numerical representation to make it easier to analyze and compute with.

## 2. Why it matters — real-world applications

Diagonalization is not just a theoretical concept; it's a fundamental tool with wide-ranging applications across science and engineering.

1.  **Quantum Mechanics and Physics:** In quantum mechanics, the energy levels of a system are found by diagonalizing the Hamiltonian operator (a matrix). The eigenvalues represent the possible energy values, and the eigenvectors represent the corresponding quantum states. This is crucial for understanding atomic structure, molecular bonds, and particle physics. For instance, understanding the spectrum of light emitted by hydrogen atoms relies on diagonalizing the Hamiltonian for the electron.

2.  **Machine Learning and Data Science (PCA):** Principal Component Analysis (PCA) is a powerful dimensionality reduction technique used in machine learning. It works by finding the eigenvectors of the covariance matrix of a dataset. These eigenvectors, called principal components, represent the directions of maximum variance in the data. Diagonalizing the covariance matrix allows us to transform high-dimensional data into a lower-dimensional space while retaining the most important information, which is vital for tasks like facial recognition, image compression, and anomaly detection. Companies like Google and Meta use PCA and related techniques for processing vast amounts of image and user data.

3.  **Solving Systems of Differential Equations:** Many real-world phenomena are modeled by systems of linear differential equations, such as population dynamics, circuit analysis, or the movement of interconnected masses. Diagonalization allows us to "decouple" these systems, transforming them into simpler, independent differential equations that are much easier to solve. This is critical in fields like aerospace engineering for analyzing the stability of aircraft control systems or predicting the long-term behavior of satellite orbits. For example, analyzing the natural vibration modes of an aircraft wing (flutter analysis) involves solving such systems, where eigenvalues relate to frequencies and eigenvectors to mode shapes.

4.  **Matrix Powers and Markov Chains:** Calculating high powers of a matrix, $A^k$, is computationally intensive. However, if $A$ can be diagonalized as $A = PDP^{-1}$, then $A^k = PD^kP^{-1}$. Since $D$ is diagonal, $D^k$ is simply obtained by raising its diagonal entries to the power $k$, which is trivial. This is incredibly useful for modeling long-term behavior in systems like Markov chains (e.g., predicting long-term market share for competing products, or the distribution of web page ranks in algorithms like PageRank).

## 3. Prerequisites — what you must know first

Before diving into diagonalization, ensure you have a solid grasp of the following concepts. If any of these feel unfamiliar, pause and review them thoroughly.

*   **Vectors and Vector Spaces:** The fundamental building blocks of linear algebra; understanding what a vector is and how vector spaces are defined (closure under addition and scalar multiplication).
*   **Linear Transformations:** Functions that map vectors from one vector space to another, preserving vector addition and scalar multiplication. Matrices are the numerical representations of these transformations.
*   **Matrices:** Rectangular arrays of numbers; understanding matrix addition, scalar multiplication, and especially **matrix multiplication**.
*   **Matrix Inverse:** For a square matrix $A$, its inverse $A^{-1}$ is a matrix such that $AA^{-1} = A^{-1}A = I$ (the identity matrix). Not all matrices have an inverse.
*   **Determinants:** A scalar value associated with a square matrix that tells us about its invertibility and the scaling factor of the transformation it represents. Crucial for finding eigenvalues.
*   **Eigenvalues and Eigenvectors:** These are the absolute core of diagonalization. An eigenvector of a matrix is a non-zero vector that, when transformed by the matrix, only scales (stretches or shrinks) without changing direction. The scaling factor is its corresponding eigenvalue. (i.e., $Av = \lambda v$).
*   **Basis and Change of Basis:** A basis for a vector space is a set of linearly independent vectors that can span the entire space. A change of basis involves transforming the coordinates of a vector from one basis to another.
*   **Linear Independence:** A set of vectors is linearly independent if no vector in the set can be written as a linear combination of the others. This is critical for forming an invertible matrix $P$.
*   **Systems of Linear Equations:** The ability to solve systems like $Ax=b$ or $Ax=0$ is essential for finding eigenvectors.

## 4. The core idea — step by step

Diagonalization is about transforming a matrix $A$ into a diagonal matrix $D$ using a similarity transformation, $D = P^{-1}AP$. Let's break down this powerful idea step by step.

### Step 1: Understand the Goal — Transforming a Matrix into a Diagonal Form

*   **Plain English:** Our main goal is to take a given square matrix, say $A$, and find a way to rewrite it as a product of three matrices: $P$, $D$, and $P^{-1}$, where $D$ is a diagonal matrix. This means we want to find $P$ and $D$ such that $A = PDP^{-1}$. Why? Because $D$ is much simpler to work with.
*   **Small Concrete Example:**
    Imagine a matrix $A = \begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix}$. If we could find $P$ and $D$ such that $A = P \begin{pmatrix} d_1 & 0 \\ 0 & d_2 \end{pmatrix} P^{-1}$, that would be diagonalization.
*   **Formal/Mathematical Version:**
    A square matrix $A$ is **diagonalizable** if there exists an invertible matrix $P$ and a diagonal matrix $D$ such that
    $$A = PDP^{-1}$$
    This equation can be rearranged to $D = P^{-1}AP$. This transformation $A \mapsto P^{-1}AP$ is called a **similarity transformation**.
*   **What could go wrong:** Not all square matrices can be diagonalized. We'll explore the conditions for this later. If a matrix cannot be diagonalized, we cannot find such an invertible $P$ and diagonal $D$.

### Step 2: The Role of Eigenvalues and Eigenvectors

*   **Plain English:** The "special coordinate system" we talked about earlier is built from a matrix's eigenvectors. Eigenvectors are the directions that don't get rotated by the transformation; they only get scaled. The amount they get scaled by is their eigenvalue. These are the fundamental properties that make diagonalization possible.
*   **Small Concrete Example:**
    For a matrix $A$, if $v$ is an eigenvector and $\lambda$ is its corresponding eigenvalue, then applying $A$ to $v$ is the same as just scaling $v$ by $\lambda$: $Av = \lambda v$. These are the "straight threads" in our yarn analogy.
*   **Formal/Mathematical Version:**
    A non-zero vector $v$ is an **eigenvector** of an $n \times n$ matrix $A$ if there exists a scalar $\lambda$ (called the **eigenvalue**) such that
    $$Av = \lambda v$$
    To find eigenvalues, we solve the characteristic equation $\det(A - \lambda I) = 0$. For each eigenvalue $\lambda$, we find its corresponding eigenvectors by solving the system $(A - \lambda I)v = 0$.
*   **What could go wrong:** Errors in calculating eigenvalues (e.g., polynomial roots) or eigenvectors (e.g., solving the homogeneous system). A common mistake is forgetting that eigenvectors must be non-zero.

### Step 3: Constructing the Matrix P (The Change of Basis Matrix)

*   **Plain English:** Once we have a set of eigenvectors that are "independent" (meaning they point in truly different directions), we can use them to form our special coordinate system. We gather these eigenvectors and make them the columns of a new matrix, $P$. This matrix $P$ will be our change-of-basis matrix, transforming coordinates from the eigenvector basis to the standard basis.
*   **Small Concrete Example:**
    If we found two linearly independent eigenvectors $v_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $v_2 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ for a $2 \times 2$ matrix, then $P$ would be $P = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$.
*   **Formal/Mathematical Version:**
    If an $n \times n$ matrix $A$ has $n$ linearly independent eigenvectors $v_1, v_2, \ldots, v_n$, then we can form the matrix $P$ whose columns are these eigenvectors:
    $$P = \begin{pmatrix} v_1 & v_2 & \cdots & v_n \end{pmatrix}$$
    For $P$ to be invertible (which is required for $A = PDP^{-1}$), its columns (the eigenvectors) *must* be linearly independent.
*   **What could go wrong:** If the eigenvectors are not linearly independent, then $P$ will not be invertible, and the matrix $A$ cannot be diagonalized. This is a crucial condition. Also, putting the eigenvectors in the wrong order will change $D$, but the relationship $A=PDP^{-1}$ will still hold as long as $D$'s eigenvalues are ordered consistently.

### Step 4: Constructing the Diagonal Matrix D

*   **Plain English:** The diagonal matrix $D$ is very simple. It just contains the eigenvalues along its main diagonal, and zeros everywhere else. The order of the eigenvalues in $D$ must match the order of their corresponding eigenvectors in $P$.
*   **Small Concrete Example:**
    If $v_1$ corresponds to eigenvalue $\lambda_1 = 3$ and $v_2$ corresponds to eigenvalue $\lambda_2 = 2$, and we put $v_1$ as the first column of $P$ and $v_2$ as the second, then $D$ must be $D = \begin{pmatrix} 3 & 0 \\ 0 & 2 \end{pmatrix}$.
*   **Formal/Mathematical Version:**
    The diagonal matrix $D$ is formed by placing the eigenvalues $\lambda_1, \lambda_2, \ldots, \lambda_n$ along its main diagonal, with zeros elsewhere:
    $$D = \begin{pmatrix} \lambda_1 & 0 & \cdots & 0 \\ 0 & \lambda_2 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & \lambda_n \end{pmatrix}$$
    It is crucial that the order of the eigenvalues in $D$ corresponds to the order of their respective eigenvectors in $P$. That is, if $v_j$ is the $j$-th column of $P$, then $\lambda_j$ must be the $j$-th diagonal entry of $D$.
*   **What could go wrong:** Mismatching the order of eigenvalues in $D$ with the order of eigenvectors in $P$. If $P = [v_1 \ v_2]$ and $D = \text{diag}(\lambda_2, \lambda_1)$, the relation $A=PDP^{-1}$ will fail.

### Step 5: The Diagonalization Equation and Verification

*   **Plain English:** With $P$ and $D$ constructed, we have the core relationship: $A = PDP^{-1}$. This equation means that applying the transformation $A$ (in the standard basis) is equivalent to first changing to the eigenvector basis ($P^{-1}$), then performing the simple scaling in that basis ($D$), and finally changing back to the standard basis ($P$).
*   **Small Concrete Example:**
    If we have $A$, $P$, and $D$, we can compute $P^{-1}$ and then perform the matrix multiplications $PDP^{-1}$ to see if we get back the original matrix $A$. This is how we verify our diagonalization.
*   **Formal/Mathematical Version:**
    The diagonalization process yields $A = PDP^{-1}$. To verify this, one must calculate $P^{-1}$ and then compute the product $PDP^{-1}$.
    The existence of $P^{-1}$ is guaranteed if the columns of $P$ (the eigenvectors) are linearly independent.
*   **What could go wrong:** Errors in calculating $P^{-1}$ or in the final matrix multiplication. If the product $PDP^{-1}$ does not equal $A$, then there was an error in finding eigenvalues, eigenvectors, or in the construction of $P$ or $D$.

### Step 6: Conditions for Diagonalizability

*   **Plain English:** As mentioned, not all matrices can be diagonalized. The ability to diagonalize a matrix hinges on whether we can find "enough" linearly independent eigenvectors to form an invertible matrix $P$.
*   **Small Concrete Example:**
    A $2 \times 2$ matrix $A$ needs two linearly independent eigenvectors. If it only gives us one (even if we try to find more), it's not diagonalizable. For instance, $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ has only one linearly independent eigenvector (up to scalar multiples) for its repeated eigenvalue $\lambda=1$.
*   **Formal/Mathematical Version:**
    An $n \times n$ matrix $A$ is diagonalizable if and only if it satisfies one of the following equivalent conditions:
    1.  There exists a basis for $\mathbb{R}^n$ (or $\mathbb{C}^n$) consisting entirely of eigenvectors of $A$. (This is equivalent to saying $A$ has $n$ linearly independent eigenvectors.)
    2.  For every eigenvalue $\lambda$ of $A$, its **algebraic multiplicity** (the number of times $\lambda$ appears as a root of the characteristic polynomial $\det(A - \lambda I) = 0$) is equal to its **geometric multiplicity** (the dimension of the eigenspace corresponding to $\lambda$, i.e., $\dim(\text{null}(A - \lambda I))$).
    A useful special case: If an $n \times n$ matrix $A$ has $n$ distinct eigenvalues, then it is guaranteed to be diagonalizable. (Distinct eigenvalues always lead to linearly independent eigenvectors.)
*   **What could go wrong:** Failing to check these conditions. If an eigenvalue has an algebraic multiplicity greater than its geometric multiplicity, the matrix is not diagonalizable. This is often the trickiest part for students.

## 5. Worked examples — multiple, with every step shown

Let's walk through several examples to solidify your understanding.

### Example 1: Diagonalize a $2 \times 2$ matrix with distinct real eigenvalues (Easy)

**Problem:** Diagonalize the matrix $A = \begin{pmatrix} 1 & 2 \\ 0 & 3 \end{pmatrix}$.

**Given:** Matrix $A = \begin{pmatrix} 1 & 2 \\ 0 & 3 \end{pmatrix}$.
**Wanted:** Matrices $P$, $D$, and $P^{-1}$ such that $A = PDP^{-1}$.

**Step 1: Find the eigenvalues of A.**
To find eigenvalues, we solve the characteristic equation $\det(A - \lambda I) = 0$.
$$A - \lambda I = \begin{pmatrix} 1-\lambda & 2 \\ 0 & 3-\lambda \end{pmatrix}$$
$$\det(A - \lambda I) = (1-\lambda)(3-\lambda) - (2)(0) = (1-\lambda)(3-\lambda)$$
Set the determinant to zero:
$$(1-\lambda)(3-\lambda) = 0$$
This gives us two eigenvalues:
$$\lambda_1 = 1 \quad \text{and} \quad \lambda_2 = 3$$
*Explanation: We subtract $\lambda$ from the diagonal entries of $A$ to form $A-\lambda I$. The determinant of this matrix, set to zero, is the characteristic equation. Its roots are the eigenvalues. Since this is an upper triangular matrix, the eigenvalues are simply the diagonal entries.*

**Step 2: Find the eigenvectors for each eigenvalue.**

*   **For $\lambda_1 = 1$:**
    We solve the system $(A - \lambda_1 I)v = 0$:
    $$(A - 1I)v = \begin{pmatrix} 1-1 & 2 \\ 0 & 3-1 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 & 2 \\ 0 & 2 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
    This gives the system of equations:
    $$0x + 2y = 0 \implies 2y = 0 \implies y = 0$$
    $$0x + 2y = 0 \implies 2y = 0 \implies y = 0$$
    The variable $x$ is free. Let $x = t$.
    So, $v_1 = \begin{pmatrix} t \\ 0 \end{pmatrix} = t \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.
    We can choose $t=1$ to get the eigenvector $v_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.
    *Explanation: For each eigenvalue, we substitute it back into $(A-\lambda I)v=0$ and solve the resulting homogeneous system. The non-trivial solutions are the eigenvectors. Here, $x$ can be any value, but $y$ must be 0, giving a vector where only the first component is non-zero.*

*   **For $\lambda_2 = 3$:**
    We solve the system $(A - \lambda_2 I)v = 0$:
    $$(A - 3I)v = \begin{pmatrix} 1-3 & 2 \\ 0 & 3-3 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} -2 & 2 \\ 0 & 0 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
    This gives the equation:
    $$-2x + 2y = 0 \implies -2x = -2y \implies x = y$$
    Let $y = t$. Then $x = t$.
    So, $v_2 = \begin{pmatrix} t \\ t \end{pmatrix} = t \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.
    We can choose $t=1$ to get the eigenvector $v_2 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.
    *Explanation: Similarly, for $\lambda_2=3$, we find the relationship between $x$ and $y$. Here, $x$ and $y$ must be equal. We pick a simple non-zero value for $t$ (like 1) to get a representative eigenvector.*

**Step 3: Form the matrix P and the diagonal matrix D.**
The eigenvectors $v_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $v_2 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ are linearly independent (since they are not scalar multiples of each other). Thus, $A$ is diagonalizable.

Form $P$ by using $v_1$ and $v_2$ as its columns:
$$P = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$$
Form $D$ by placing the corresponding eigenvalues on the diagonal, in the same order as their eigenvectors in $P$:
$$D = \begin{pmatrix} \lambda_1 & 0 \\ 0 & \lambda_2 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 3 \end{pmatrix}$$
*Explanation: We place the linearly independent eigenvectors as columns of $P$. The diagonal entries of $D$ are the eigenvalues, matched in order with the columns of $P$. Since $\lambda_1$ corresponds to $v_1$ (first column of $P$), $\lambda_1$ is the first entry in $D$. Same for $\lambda_2$ and $v_2$.*

**Step 4: Calculate P inverse ($P^{-1}$).**
For a $2 \times 2$ matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, the inverse is $\frac{1}{ad-bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.
$$P^{-1} = \frac{1}{(1)(1) - (1)(0)} \begin{pmatrix} 1 & -1 \\ -0 & 1 \end{pmatrix} = \frac{1}{1} \begin{pmatrix} 1 & -1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 1 & -1 \\ 0 & 1 \end{pmatrix}$$
*Explanation: We need $P^{-1}$ to complete the diagonalization equation $A=PDP^{-1}$. We use the formula for the inverse of a $2 \times 2$ matrix.*

**Step 5: Verify the diagonalization (optional but recommended).**
We check if $A = PDP^{-1}$:
$$PDP^{-1} = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 0 & 3 \end{pmatrix} \begin{pmatrix} 1 & -1 \\ 0 & 1 \end{pmatrix}$$
First, calculate $PD$:
$$PD = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 0 & 3 \end{pmatrix} = \begin{pmatrix} (1)(1)+(1)(0) & (1)(0)+(1)(3) \\ (0)(1)+(1)(0) & (0)(0)+(1)(3) \end{pmatrix} = \begin{pmatrix} 1 & 3 \\ 0 & 3 \end{pmatrix}$$
Now, calculate $(PD)P^{-1}$:
$$(PD)P^{-1} = \begin{pmatrix} 1 & 3 \\ 0 & 3 \end{pmatrix} \begin{pmatrix} 1 & -1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} (1)(1)+(3)(0) & (1)(-1)+(3)(1) \\ (0)(1)+(3)(0) & (0)(-1)+(3)(1) \end{pmatrix} = \begin{pmatrix} 1 & 2 \\ 0 & 3 \end{pmatrix}$$
This matches the original matrix $A$.

**Final Answer:**
The matrix $A = \begin{pmatrix} 1 & 2 \\ 0 & 3 \end{pmatrix}$ is diagonalizable with:
$$P = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}, \quad D = \begin{pmatrix} 1 & 0 \\ 0 & 3 \end{pmatrix}, \quad P^{-1} = \begin{pmatrix} 1 & -1 \\ 0 & 1 \end{pmatrix}$$
And $A = PDP^{-1}$.

*Reflection:* This was a straightforward example because the eigenvalues were distinct, which guarantees diagonalizability. The matrix was also upper triangular, simplifying eigenvalue calculation.

---

### Example 2: Diagonalize a $3 \times 3$ matrix with distinct real eigenvalues (Medium)

**Problem:** Diagonalize the matrix $A = \begin{pmatrix} 4 & 0 & 1 \\ -2 & 1 & 0 \\ -2 & 0 & 1 \end{pmatrix}$.

**Given:** Matrix $A = \begin{pmatrix} 4 & 0 & 1 \\ -2 & 1 & 0 \\ -2 & 0 & 1 \end{pmatrix}$.
**Wanted:** Matrices $P$, $D$, and $P^{-1}$ such that $A = PDP^{-1}$.

**Step 1: Find the eigenvalues of A.**
$$A - \lambda I = \begin{pmatrix} 4-\lambda & 0 & 1 \\ -2 & 1-\lambda & 0 \\ -2 & 0 & 1-\lambda \end{pmatrix}$$
Calculate the determinant:
$$\det(A - \lambda I) = (4-\lambda) \det \begin{pmatrix} 1-\lambda & 0 \\ 0 & 1-\lambda \end{pmatrix} - 0 \cdot (\dots) + 1 \cdot \det \begin{pmatrix} -2 & 1-\lambda \\ -2 & 0 \end{pmatrix}$$
$$= (4-\lambda)(1-\lambda)^2 + 1 \cdot ((-2)(0) - (1-\lambda)(-2))$$
$$= (4-\lambda)(1-\lambda)^2 + 2(1-\lambda)$$
Factor out $(1-\lambda)$:
$$= (1-\lambda) [(4-\lambda)(1-\lambda) + 2]$$
$$= (1-\lambda) [4 - 4\lambda - \lambda + \lambda^2 + 2]$$
$$= (1-\lambda) [\lambda^2 - 5\lambda + 6]$$
Factor the quadratic term:
$$= (1-\lambda) (\lambda-2)(\lambda-3)$$
Set the determinant to zero:
$$(1-\lambda)(\lambda-2)(\lambda-3) = 0$$
The eigenvalues are:
$$\lambda_1 = 1, \quad \lambda_2 = 2, \quad \lambda_3 = 3$$
*Explanation: We calculate the characteristic polynomial by finding the determinant of $A-\lambda I$. We used cofactor expansion along the second column because it has two zeros, simplifying the calculation. Factoring the polynomial yields the eigenvalues. Since there are three distinct eigenvalues for a $3 \times 3$ matrix, we know it's diagonalizable.*

**Step 2: Find the eigenvectors for each eigenvalue.**

*   **For $\lambda_1 = 1$:**
    Solve $(A - 1I)v = 0$:
    $$\begin{pmatrix} 3 & 0 & 1 \\ -2 & 0 & 0 \\ -2 & 0 & 0 \end{pmatrix} \begin{pmatrix} x \\ y \\ z \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
    From the second row: $-2x = 0 \implies x = 0$.
    From the third row: $-2x = 0 \implies x = 0$.
    Substitute $x=0$ into the first row: $3(0) + 0y + 1z = 0 \implies z = 0$.
    The variable $y$ is free. Let $y = t$.
    So, $v_1 = \begin{pmatrix} 0 \\ t \\ 0 \end{pmatrix} = t \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$.
    Choose $t=1$, so $v_1 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$.
    *Explanation: For $\lambda_1=1$, the system immediately tells us $x=0$ and $z=0$. The $y$ component is unconstrained, meaning any vector of the form $(0, t, 0)^T$ is an eigenvector. We pick $t=1$ for simplicity.*

*   **For $\lambda_2 = 2$:**
    Solve $(A - 2I)v = 0$:
    $$\begin{pmatrix} 2 & 0 & 1 \\ -2 & -1 & 0 \\ -2 & 0 & -1 \end{pmatrix} \begin{pmatrix} x \\ y \\ z \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
    This gives the system:
    1) $2x + z = 0 \implies z = -2x$
    2) $-2x - y = 0 \implies y = -2x$
    3) $-2x - z = 0 \implies z = -2x$ (consistent with 1)
    Let $x = t$. Then $y = -2t$ and $z = -2t$.
    So, $v_2 = \begin{pmatrix} t \\ -2t \\ -2t \end{pmatrix} = t \begin{pmatrix} 1 \\ -2 \\ -2 \end{pmatrix}$.
    Choose $t=1$, so $v_2 = \begin{pmatrix} 1 \\ -2 \\ -2 \end{pmatrix}$.
    *Explanation: For $\lambda_2=2$, we solve the system of equations. We express $y$ and $z$ in terms of $x$. Since $x$ is free, we set it to $t$ and get a representative eigenvector by choosing $t=1$.*

*   **For $\lambda_3 = 3$:**
    Solve $(A - 3I)v = 0$:
    $$\begin{pmatrix} 1 & 0 & 1 \\ -2 & -2 & 0 \\ -2 & 0 & -2 \end{pmatrix} \begin{pmatrix} x \\ y \\ z \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
    This gives the system:
    1) $x + z = 0 \implies z = -x$
    2) $-2x - 2y = 0 \implies -2y = 2x \implies y = -x$
    3) $-2x - 2z = 0 \implies z = -x$ (consistent with 1)
    Let $x = t$. Then $y = -t$ and $z = -t$.
    So, $v_3 = \begin{pmatrix} t \\ -t \\ -t \end{pmatrix} = t \begin{pmatrix} 1 \\ -1 \\ -1 \end{pmatrix}$.
    Choose $t=1$, so $v_3 = \begin{pmatrix} 1 \\ -1 \\ -1 \end{pmatrix}$.
    *Explanation: Similar to the previous case, we solve the system for $\lambda_3=3$, expressing $y$ and $z$ in terms of $x$. We pick $t=1$ for the eigenvector.*

**Step 3: Form the matrix P and the diagonal matrix D.**
The eigenvectors $v_1 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$, $v_2 = \begin{pmatrix} 1 \\ -2 \\ -2 \end{pmatrix}$, and $v_3 = \begin{pmatrix} 1 \\ -1 \\ -1 \end{pmatrix}$ are linearly independent (as they correspond to distinct eigenvalues).

$$P = \begin{pmatrix} 0 & 1 & 1 \\ 1 & -2 & -1 \\ 0 & -2 & -1 \end{pmatrix}$$
$$D = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{pmatrix}$$
*Explanation: $P$ is formed by the eigenvectors as columns. $D$ is formed by the eigenvalues on the diagonal, in the same order as their corresponding eigenvectors in $P$.*

**Step 4: Calculate P inverse ($P^{-1}$).**
This is the most computationally intensive part for a $3 \times 3$ matrix. We can use Gaussian elimination on $[P | I]$.
$$[P | I] = \left[ \begin{array}{ccc|ccc} 0 & 1 & 1 & 1 & 0 & 0 \\ 1 & -2 & -1 & 0 & 1 & 0 \\ 0 & -2 & -1 & 0 & 0 & 1 \end{array} \right]$$
Swap $R_1$ and $R_2$:
$$\left[ \begin{array}{ccc|ccc} 1 & -2 & -1 & 0 & 1 & 0 \\ 0 & 1 & 1 & 1 & 0 & 0 \\ 0 & -2 & -1 & 0 & 0 & 1 \end{array} \right]$$
$R_3 \leftarrow R_3 + 2R_2$:
$$\left[ \begin{array}{ccc|ccc} 1 & -2 & -1 & 0 & 1 & 0 \\ 0 & 1 & 1 & 1 & 0 & 0 \\ 0 & 0 & 1 & 2 & 0 & 1 \end{array} \right]$$
$R_2 \leftarrow R_2 - R_3$:
$$\left[ \begin{array}{ccc|ccc} 1 & -2 & -1 & 0 & 1 & 0 \\ 0 & 1 & 0 & -1 & 0 & -1 \\ 0 & 0 & 1 & 2 & 0 & 1 \end{array} \right]$$
$R_1 \leftarrow R_1 + R_3$:
$$\left[ \begin{array}{ccc|ccc} 1 & -2 & 0 & 2 & 1 & 1 \\ 0 & 1 & 0 & -1 & 0 & -1 \\ 0 & 0 & 1 & 2 & 0 & 1 \end{array} \right]$$
$R_1 \leftarrow R_1 + 2R_2$:
$$\left[ \begin{array}{ccc|ccc} 1 & 0 & 0 & 0 & 1 & -1 \\ 0 & 1 & 0 & -1 & 0 & -1 \\ 0 & 0 & 1 & 2 & 0 & 1 \end{array} \right]$$
So,
$$P^{-1} = \begin{pmatrix} 0 & 1 & -1 \\ -1 & 0 & -1 \\ 2 & 0 & 1 \end{pmatrix}$$
*Explanation: We compute the inverse of $P$ using the augmented matrix method. Row operations are applied to transform the left side ($P$) into the identity matrix, and the same operations transform the right side ($I$) into $P^{-1}$.*

**Step 5: Verify the diagonalization (optional but recommended).**
We check if $A = PDP^{-1}$.
First, calculate $PD$:
$$PD = \begin{pmatrix} 0 & 1 & 1 \\ 1 & -2 & -1 \\ 0 & -2 & -1 \end{pmatrix} \begin{pmatrix} 1 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{pmatrix} = \begin{pmatrix} 0 & 2 & 3 \\ 1 & -4 & -3 \\ 0 & -4 & -3 \end{pmatrix}$$
Now, calculate $(PD)P^{-1}$:
$$(PD)P^{-1} = \begin{pmatrix} 0 & 2 & 3 \\ 1 & -4 & -3 \\ 0 & -4 & -3 \end{pmatrix} \begin{pmatrix} 0 & 1 & -1 \\ -1 & 0 & -1 \\ 2 & 0 & 1 \end{pmatrix}$$
$$= \begin{pmatrix} (0)(-0)+(2)(-1)+(3)(2) & (0)(1)+(2)(0)+(3)(0) & (0)(-1)+(2)(-1)+(3)(1) \\ (1)(0)+(-4)(-1)+(-3)(2) & (1)(1)+(-4)(0)+(-3)(0) & (1)(-1)+(-4)(-1)+(-3)(1) \\ (0)(0)+(-4)(-1)+(-3)(2) & (0)(1)+(-4)(0)+(-3)(0) & (0)(-1)+(-4)(-1)+(-3)(1) \end{pmatrix}$$
$$= \begin{pmatrix} -2+6 & 0 & -2+3 \\ 4-6 & 1 & -1+4-3 \\ 4-6 & 0 & 4-3 \end{pmatrix} = \begin{pmatrix} 4 & 0 & 1 \\ -2 & 1 & 0 \\ -2 & 0 & 1 \end{pmatrix}$$
This matches the original matrix $A$.

**Final Answer:**
The matrix $A = \begin{pmatrix} 4 & 0 & 1 \\ -2 & 1 & 0 \\ -2 & 0 & 1 \end{pmatrix}$ is diagonalizable with:
$$P = \begin{pmatrix} 0 & 1 & 1 \\ 1 & -2 & -1 \\ 0 & -2 & -1 \end{pmatrix}, \quad D = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{pmatrix}, \quad P^{-1} = \begin{pmatrix} 0 & 1 & -1 \\ -1 & 0 & -1 \\ 2 & 0 & 1 \end{pmatrix}$$
And $A = PDP^{-1}$.

*Reflection:* This example was more computationally intensive due to the $3 \times 3$ size, especially for finding $P^{-1}$. However, the distinct eigenvalues still guaranteed diagonalizability.

---

### Example 3: Diagonalize a $2 \times 2$ matrix with a repeated eigenvalue that *is* diagonalizable (Hard)

**Problem:** Diagonalize the matrix $A = \begin{pmatrix} 3 & -2 \\ -2 & 3 \end{pmatrix}$.

**Given:** Matrix $A = \begin{pmatrix} 3 & -2 \\ -2 & 3 \end{pmatrix}$.
**Wanted:** Matrices $P$, $D$, and $P^{-1}$ such that $A = PDP^{-1}$.

**Step 1: Find the eigenvalues of A.**
$$A - \lambda I = \begin{pmatrix} 3-\lambda & -2 \\ -2 & 3-\lambda \end{pmatrix}$$
$$\det(A - \lambda I) = (3-\lambda)^2 - (-2)(-2) = (3-\lambda)^2 - 4$$
Set to zero:
$$(3-\lambda)^2 - 4 = 0$$
$$(3-\lambda)^2 = 4$$
$$3-\lambda = \pm 2$$
Case 1: $3-\lambda = 2 \implies \lambda = 1$.
Case 2: $3-\lambda = -2 \implies \lambda = 5$.
The eigenvalues are:
$$\lambda_1 = 1 \quad \text{and} \quad \lambda_2 = 5$$
*Explanation: We find the characteristic polynomial and its roots. This matrix actually has distinct eigenvalues, not repeated. I chose this example to show a symmetric matrix, which is always diagonalizable, even if it had repeated eigenvalues. Let's adjust the problem to truly have a repeated eigenvalue.*

**Correction to Example 3:** Let's use a matrix that *does* have repeated eigenvalues and is diagonalizable. The identity matrix $I$ is the simplest example. Any scalar multiple of $I$ also works.
**Problem:** Diagonalize the matrix $A = \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}$.

**Given:** Matrix $A = \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}$.
**Wanted:** Matrices $P$, $D$, and $P^{-1}$ such that $A = PDP^{-1}$.

**Step 1: Find the eigenvalues of A.**
$$A - \lambda I = \begin{pmatrix} 2-\lambda & 0 \\ 0 & 2-\lambda \end{pmatrix}$$
$$\det(A - \lambda I) = (2-\lambda)(2-\lambda) - 0 = (2-\lambda)^2$$
Set to zero:
$$(2-\lambda)^2 = 0$$
This gives a repeated eigenvalue:
$$\lambda_1 = 2 \quad \text{(with algebraic multiplicity 2)}$$
*Explanation: The characteristic equation reveals a single eigenvalue, $\lambda=2$, which appears twice. This is an eigenvalue with algebraic multiplicity 2.*

**Step 2: Find the eigenvectors for the eigenvalue.**

*   **For $\lambda_1 = 2$:**
    Solve $(A - 2I)v = 0$:
    $$\begin{pmatrix} 2-2 & 0 \\ 0 & 2-2 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
    This system $0x + 0y = 0$ means that both $x$ and $y$ are free variables.
    Let $x = t_1$ and $y = t_2$.
    So, $v = \begin{pmatrix} t_1 \\ t_2 \end{pmatrix} = t_1 \begin{pmatrix} 1 \\ 0 \end{pmatrix} + t_2 \begin{pmatrix} 0 \\ 1 \end{pmatrix}$.
    We can choose two linearly independent eigenvectors:
    $v_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ (by setting $t_1=1, t_2=0$)
    $v_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$ (by setting $t_1=0, t_2=1$)
    The geometric multiplicity is 2 (the dimension of the eigenspace, spanned by $v_1, v_2$).
    *Explanation: For $\lambda=2$, the system $(A-2I)v=0$ becomes trivial ($0v=0$). This means *all* non-zero vectors are eigenvectors for $\lambda=2$. We need to find *two* linearly independent eigenvectors to form a basis for $\mathbb{R}^2$. The standard basis vectors $e_1$ and $e_2$ work perfectly. Since the geometric multiplicity (2) equals the algebraic multiplicity (2), the matrix *is* diagonalizable.*

**Step 3: Form the matrix P and the diagonal matrix D.**
The eigenvectors $v_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $v_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$ are linearly independent.

$$P = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$$
Since both eigenvectors correspond to $\lambda=2$, $D$ will have 2 on both diagonal entries:
$$D = \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}$$
*Explanation: $P$ is the identity matrix because our eigenvectors are the standard basis vectors. $D$ has the repeated eigenvalue on its diagonal, reflecting that both basis vectors are scaled by the same factor.*

**Step 4: Calculate P inverse ($P^{-1}$).**
Since $P = I$, its inverse is simply $P^{-1} = I$:
$$P^{-1} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$$
*Explanation: The inverse of the identity matrix is itself.*

**Step 5: Verify the diagonalization.**
We check if $A = PDP^{-1}$:
$$PDP^{-1} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$$
$$= \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}$$
This matches the original matrix $A$.

**Final Answer:**
The matrix $A = \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}$ is diagonalizable with:
$$P = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}, \quad D = \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}, \quad P^{-1} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$$
And $A = PDP^{-1}$.

*Reflection:* This example shows that a matrix with repeated eigenvalues *can* be diagonalizable if its geometric multiplicity matches its algebraic multiplicity. Here, the identity matrix (or any scalar multiple of it) is already diagonal, so $P$ is simply the identity matrix, and $D$ is $A$ itself. This is the simplest case of diagonalization.

---

### Example 4: A $2 \times 2$ matrix that is *not* diagonalizable (Hard)

**Problem:** Determine if the matrix $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ is diagonalizable. If so, find $P$ and $D$.

**Given:** Matrix $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$.
**Wanted:** Determine if $A$ is diagonalizable. If yes, find $P$, $D$, $P^{-1}$. If no, explain why.

**Step 1: Find the eigenvalues of A.**
$$A - \lambda I = \begin{pmatrix} 1-\lambda & 1 \\ 0 & 1-\lambda \end{pmatrix}$$
$$\det(A - \lambda I) = (1-\lambda)(1-\lambda) - (1)(0) = (1-\lambda)^2$$
Set to zero:
$$(1-\lambda)^2 = 0$$
This gives a repeated eigenvalue:
$$\lambda_1 = 1 \quad \text{(with algebraic multiplicity 2)}$$
*Explanation: This is an upper triangular matrix, so its eigenvalues are its diagonal entries. We have a single eigenvalue $\lambda=1$ with algebraic multiplicity 2, meaning it's a root of the characteristic polynomial twice.*

**Step 2: Find the eigenvectors for the eigenvalue.**

*   **For $\lambda_1 = 1$:**
    Solve $(A - 1I)v = 0$:
    $$\begin{pmatrix} 1-1 & 1 \\ 0 & 1-1 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
    This gives the system of equations:
    $$0x + 1y = 0 \implies y = 0$$
    $$0x + 0y = 0$$
    The variable $x$ is free. Let $x = t$.
    So, $v = \begin{pmatrix} t \\ 0 \end{pmatrix} = t \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.
    We can choose $t=1$ to get the eigenvector $v_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.
    This is the *only* linearly independent eigenvector we can find for $\lambda=1$.
    The eigenspace for $\lambda=1$ is spanned by $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$, so its dimension is 1.
    Therefore, the geometric multiplicity of $\lambda=1$ is 1.
    *Explanation: When we solve for eigenvectors, we find that $y$ must be 0, but $x$ can be anything. This means all eigenvectors lie along the x-axis. We can only find one linearly independent eigenvector (e.g., $(1,0)^T$). The dimension of this eigenspace is 1.*

**Step 3: Check for diagonalizability.**
We have an $n \times n$ matrix ($2 \times 2$) but we could only find $1$ linearly independent eigenvector.
The algebraic multiplicity of $\lambda=1$ is 2.
The geometric multiplicity of $\lambda=1$ is 1.
Since the algebraic multiplicity (2) is *not equal* to the geometric multiplicity (1) for $\lambda=1$, the matrix $A$ is **not diagonalizable**.
*Explanation: The core condition for diagonalizability is that the algebraic multiplicity must equal the geometric multiplicity for every eigenvalue. Here, they don't match for $\lambda=1$. This means we cannot form a basis of eigenvectors for $\mathbb{R}^2$, and thus we cannot construct an invertible matrix $P$.*

**Final Answer:**
The matrix $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ is **not diagonalizable**.
This is because its only eigenvalue $\lambda=1$ has an algebraic multiplicity of 2, but a geometric multiplicity of 1. We cannot find two linearly independent eigenvectors to form the matrix $P$.

*Reflection:* This example highlights the critical condition for diagonalizability: having "enough" linearly independent eigenvectors. When algebraic multiplicity exceeds geometric multiplicity for any eigenvalue, diagonalization is impossible. Such matrices are sometimes called "defective" and lead to Jordan Canonical Form, a more complex but always possible simplification.

## 6. Common mistakes and traps

Students often stumble on specific points when learning diagonalization. Be aware of these common pitfalls:

1.  **Incorrect Eigenvalue/Eigenvector Calculation:** This is the most fundamental error. Mistakes in solving $\det(A - \lambda I) = 0$ or $(A - \lambda I)v = 0$ will lead to incorrect $P$ and $D$. Double-check your algebra!
2.  **Assuming all matrices are diagonalizable:** Not every square matrix can be diagonalized. This is a crucial understanding. Always check the conditions (geometric multiplicity = algebraic multiplicity for all eigenvalues, or existence of $n$ linearly independent eigenvectors).
3.  **Mismatching Eigenvalue and Eigenvector Order:** The order of eigenvectors in $P$ must precisely correspond to the order of eigenvalues in $D$. If $P = [v_1 \ v_2 \ v_3]$, then $D$ must have $\lambda_1, \lambda_2, \lambda_3$ on its diagonal, respectively. Swapping them will make $PDP^{-1} \neq A$.
4.  **Incorrectly Calculating $P^{-1}$:** Forgetting to calculate the inverse, or making algebraic errors during its computation, will invalidate the $A=PDP^{-1}$ relationship. For $2 \times 2$ matrices, the formula is straightforward; for larger matrices, careful row operations are needed.
5.  **Forgetting Linear Independence:** The columns of $P$ (the eigenvectors) *must* be linearly independent for $P$ to be invertible. If you find fewer than $n$ linearly independent eigenvectors for an $n \times n$ matrix, $P$ will be singular, and the matrix is not diagonalizable.
6.  **Mistaking Geometric Multiplicity for Algebraic Multiplicity:** These are distinct concepts. Algebraic multiplicity is how many times an eigenvalue appears as a root of the characteristic polynomial. Geometric multiplicity is the dimension of the eigenspace (the number of linearly independent eigenvectors) for that eigenvalue. They must be equal for diagonalizability.

## 7. Textbook-precise explanation

Let $A$ be an $n \times n$ square matrix with entries from a field $\mathbb{F}$ (typically $\mathbb{R}$ or $\mathbb{C}$).

**Definition (Diagonalizable Matrix):**
A square matrix $A$ is **diagonalizable** if it is similar to a diagonal matrix. That is, if there exists an invertible matrix $P$ and a diagonal matrix $D$ such that $A = PDP^{-1}$.

**Theorem (Diagonalization Theorem):**
An $n \times n$ matrix $A$ is diagonalizable if and only if $A$ has $n$ linearly independent eigenvectors.
If $A$ is diagonalizable, and $v_1, v_2, \ldots, v_n$ are $n$ linearly independent eigenvectors of $A$ corresponding to eigenvalues $\lambda_1, \lambda_2, \ldots, \lambda_n$ (which may not be distinct), then the matrix $P = \begin{pmatrix} v_1 & v_2 & \cdots & v_n \end{pmatrix}$ is invertible, and $A = PDP^{-1}$, where $D$ is the diagonal matrix whose diagonal entries are the eigenvalues $\lambda_1, \lambda_2, \ldots, \lambda_n$ in the same order as their corresponding eigenvectors in $P$:
$$D = \text{diag}(\lambda_1, \lambda_2, \ldots, \lambda_n) = \begin{pmatrix} \lambda_1 & 0 & \cdots & 0 \\ 0 & \lambda_2 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & \lambda_n \end{pmatrix}$$

**Conditions for Diagonalizability (Equivalent Formulations):**
Let $\lambda$ be an eigenvalue of $A$.
*   The **algebraic multiplicity** of $\lambda$ (denoted $\text{alg mult}(\lambda)$) is the multiplicity of $\lambda$ as a root of the characteristic polynomial $p(\lambda) = \det(A - \lambda I)$.
*   The **geometric multiplicity** of $\lambda$ (denoted $\text{geom mult}(\lambda)$) is the dimension of the eigenspace $E_\lambda = \text{null}(A - \lambda I)$.

**Theorem (Geometric vs. Algebraic Multiplicity):**
For any eigenvalue $\lambda$ of a matrix $A$, its geometric multiplicity is always less than or equal to its algebraic multiplicity:
$$\text{geom mult}(\lambda) \le \text{alg mult}(\lambda)$$

**Theorem (Full Condition for Diagonalizability):**
An $n \times n$ matrix $A$ is diagonalizable if and only if the sum of the geometric multiplicities of all distinct eigenvalues equals $n$. This is equivalent to saying that for every eigenvalue $\lambda$ of $A$, its algebraic multiplicity equals its geometric multiplicity:
$$\text{geom mult}(\lambda) = \text{alg mult}(\lambda) \quad \text{for all eigenvalues } \lambda$$

**Special Case (Sufficient Condition):**
If an $n \times n$ matrix $A$ has $n$ distinct eigenvalues, then it is diagonalizable. (This is because distinct eigenvalues always correspond to linearly independent eigenvectors, guaranteeing $n$ linearly independent eigenvectors).

**Procedure for Diagonalizing a Matrix $A$:**
1.  **Find the eigenvalues of $A$**: Solve the characteristic equation $\det(A - \lambda I) = 0$ for $\lambda$.
2.  **For each eigenvalue $\lambda_i$**: Find a basis for the eigenspace $E_{\lambda_i} = \text{null}(A - \lambda_i I)$ by solving the homogeneous system $(A - \lambda_i I)v = 0$. These basis vectors are the eigenvectors.
3.  **Check for diagonalizability**:
    *   If the total number of linearly independent eigenvectors found in Step 2 is less than $n$ (the dimension of $A$), or equivalently, if for any eigenvalue $\lambda_i$, $\text{geom mult}(\lambda_i) < \text{alg mult}(\lambda_i)$, then $A$ is **not diagonalizable**. Stop.
    *   Otherwise, $A$ is diagonalizable. Proceed to Step 4.
4.  **Construct $P$**: Form the matrix $P$ whose columns are the $n$ linearly independent eigenvectors found in Step 2. The order of the eigenvectors matters.
5.  **Construct $D$**: Form the diagonal matrix $D$ whose diagonal entries are the eigenvalues corresponding to the eigenvectors in $P$, in the same order.
6.  **Find $P^{-1}$**: Compute the inverse of $P$.
7.  **Verify**: Check that $A = PDP^{-1}$.

*(References: Lay, D. C., Lay, S. R., & McDonald, J. J. (2016). *Linear Algebra and Its Applications* (5th ed.). Pearson. Chapter 5. Strang, G. (2016). *Introduction to Linear Algebra* (5th ed.). Wellesley-Cambridge Press. Chapter 5.)*

## 8. ASCII diagrams

Here's a conceptual diagram illustrating the idea of a similarity transformation $A = PDP^{-1}$ or $D = P^{-1}AP$. It shows how a transformation $A$ in the standard basis can be viewed as a simpler transformation $D$ in a special "eigenvector basis."

```text
       Standard Basis (e1, e2, ..., en)
       ------------------------------------
       |                                  |
       |  Applying Matrix A               |
       |  (Complex transformation:        |
       |   rotation, scaling, shear)      |
       V                                  V
       Vector x                           Vector Ax
       in Standard Basis                  in Standard Basis
       ^                                  ^
       |                                  |
       | P (Transform from Eigen-basis)   | P^-1 (Transform to Eigen-basis)
       |                                  |
       ------------------------------------
       Eigenvector Basis (v1, v2, ..., vn)
       ------------------------------------
       |                                  |
       |  Applying Matrix D               |
       |  (Simple transformation:         |
       |   pure scaling along axes)       |
       V                                  V
       Vector x' = P^-1 x                 Vector D x' = P^-1 Ax
       in Eigenvector Basis               in Eigenvector Basis

This diagram illustrates the relationship D = P^-1 A P.
- P^-1 transforms a vector from the standard basis to the eigenvector basis.
- D performs a simple scaling operation in the eigenvector basis.
- P transforms the scaled vector back to the standard basis.
The combined effect, P D P^-1, is equivalent to applying A directly in the standard basis.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of "P-D-P-Inverse" as "Pretty Darn Perfect, Inverse!" or "Please Don't Procrastinate, Inverse!" The key is the sequence: $P$ puts you into the special basis, $D$ does the simple work, and $P^{-1}$ brings you back. Visualize a person going through a magic portal ($P^{-1}$), getting a simple task done ($D$), then returning through the portal ($P$).

2.  **Formulas/Facts to Overlearn:**
    *   The fundamental equation: $\mathbf{A = PDP^{-1}}$ (or equivalently $\mathbf{D = P^{-1}AP}$). This is the definition and goal.
    *   The definition of eigenvalue/eigenvector: $\mathbf{Av = \lambda v}$. This is *why* diagonalization works.
    *   The condition for diagonalizability: **Geometric Multiplicity = Algebraic Multiplicity for ALL eigenvalues**. If this fails for even one eigenvalue, no diagonalization. If $A$ has $n$ distinct eigenvalues, it *is* diagonalizable.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Immediately after this lesson, review all steps and try the first worked example from memory.
    *   **Day 3:** Review the core idea, definitions, and conditions. Redo one medium difficulty example.
    *   **Day 7:** Review the entire process, focusing on the "what could go wrong" notes and common mistakes. Try one hard example.
    *   **Day 16:** Attempt to explain diagonalization to an imaginary peer without notes. Focus on the intuition and the conditions.
    *   **Day 35:** Review the connections to other topics. Solve a new problem from a textbook.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the $A=PDP^{-1}$ formula, you can rebuild it from the definition of eigenvectors:
    1.  Start with the definition: $Av_i = \lambda_i v_i$ for each eigenvector $v_i$ and its eigenvalue $\lambda_i$.
    2.  Gather all $n$ linearly independent eigenvectors into a matrix $P = \begin{pmatrix} v_1 & v_2 & \cdots & v_n \end{pmatrix}$.
    3.  Apply $A$ to $P$:
        $AP = A \begin{pmatrix} v_1 & v_2 & \cdots & v_n \end{pmatrix} = \begin{pmatrix} Av_1 & Av_2 & \cdots & Av_n \end{pmatrix}$
    4.  Substitute $Av_i = \lambda_i v_i$:
        $AP = \begin{pmatrix} \lambda_1 v_1 & \lambda_2 v_2 & \cdots & \lambda_n v_n \end{pmatrix}$
    5.  Recognize that this can be written as $P$ multiplied by a diagonal matrix $D$ containing the eigenvalues:
        $AP = \begin{pmatrix} v_1 & v_2 & \cdots & v_n \end{pmatrix} \begin{pmatrix} \lambda_1 & 0 & \cdots & 0 \\ 0 & \lambda_2 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & \lambda_n \end{pmatrix} = PD$
    6.  So, you have $AP = PD$.
    7.  Since $P$ is formed from linearly independent eigenvectors, it is invertible. Multiply by $P^{-1}$ on the right:
        $APP^{-1} = PDP^{-1}$