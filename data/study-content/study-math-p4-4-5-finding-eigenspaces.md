## 1. What it is — in plain English

Imagine you have a special kind of stretchy, twisty, or squishy fabric, and you perform some operation on it, like stretching it, rotating it, or shearing it. Most points on the fabric will move to entirely new positions, and their directions might change dramatically.

However, sometimes there are certain special directions, like lines drawn on the fabric, that don't twist or turn at all. When you apply your operation, points along these lines might get stretched or shrunk, but they stay perfectly on their original line. They don't deviate from their initial direction.

In the world of linear algebra, this "fabric" is represented by a vector space (like all arrows starting from the origin), and the "operation" is a matrix multiplication. The "special directions" are called **eigenvectors**, and the "stretch/shrink factor" is called an **eigenvalue**.

An **eigenspace** is simply the collection of *all* such special vectors (including the zero vector) that, for a *specific* stretch/shrink factor (a specific eigenvalue), only get scaled and don't change their direction when the matrix operation is applied. So, if a particular stretch factor is 2, the eigenspace for that factor is all the vectors that simply double in length (or half in length, or whatever the factor is) without changing their orientation. It's like finding all the lines on our fabric that only stretch or shrink by a certain amount.

## 2. Why it matters — real-world applications

Eigenspaces, and the broader concept of eigenvalues and eigenvectors, are fundamental to understanding how linear transformations behave and are indispensable in countless scientific and engineering fields.

1.  **Google PageRank Algorithm (Computer Science/Data Science):** The original algorithm that powers Google's search engine relies heavily on eigenvectors. Imagine a massive matrix where each entry represents the likelihood of a user clicking from one webpage to another. The PageRank of a page is essentially an entry in the principal eigenvector of this "link matrix." The eigenspace associated with the largest eigenvalue (the "principal eigenspace") contains the relative importance of all web pages, determining their ranking in search results.
2.  **Vibrational Analysis in Engineering (Aerospace/Civil/Mechanical Engineering):** When designing structures like bridges, aircraft wings, or buildings, engineers need to understand how they will vibrate. Each "natural frequency" at which a structure prefers to vibrate corresponds to an eigenvalue, and the "mode shape" (the pattern of displacement) at that frequency is the corresponding eigenvector. The eigenspace for a particular natural frequency describes all possible combinations of displacements that result in that specific vibrational mode. Understanding these allows engineers to design structures that avoid resonance (catastrophic vibrations) and optimize their stability.
3.  **Principal Component Analysis (PCA) in Machine Learning and Data Science:** PCA is a dimensionality reduction technique used to simplify complex datasets while retaining most of their information. It works by finding the directions (principal components) along which the data varies the most. These principal components are the eigenvectors of the data's covariance matrix. The eigenspaces associated with the largest eigenvalues represent the most significant "dimensions" or features in the data, allowing scientists to visualize high-dimensional data or reduce noise by projecting data onto these dominant eigenspaces.
4.  **Quantum Mechanics (Physics):** In quantum mechanics, physical observables (like energy, momentum, position) are represented by linear operators. The possible outcomes of measuring an observable are the eigenvalues of its corresponding operator, and the quantum states associated with these outcomes are the eigenvectors. An eigenspace, in this context, would describe all possible quantum states that yield a particular measurement outcome for an observable. For example, the energy levels of an atom are eigenvalues of the Hamiltonian operator, and the atomic orbitals are its eigenvectors.

## 3. Prerequisites — what you must know first

Before diving into finding eigenspaces, ensure you have a solid grasp of these foundational concepts:

*   **Vectors:** Understanding what a vector is, vector addition, and scalar multiplication.
*   **Matrices:** What a matrix is, matrix dimensions, and basic matrix operations.
*   **Matrix-Vector Multiplication:** How to multiply a matrix by a vector, and its geometric interpretation as a linear transformation.
*   **Determinants:** How to calculate the determinant of a square matrix (especially 2x2 and 3x3).
*   **Inverse of a Matrix:** How to determine if a matrix is invertible and how to find its inverse (though not directly used in finding eigenspaces, it underpins the concept of invertibility).
*   **Solving Systems of Linear Equations:** Proficiency in methods like Gaussian elimination or Gauss-Jordan elimination to solve $Ax=b$ or $Ax=0$.
*   **Null Space (Kernel) of a Matrix:** The set of all vectors $x$ such that $Ax=0$. This is the most crucial prerequisite, as finding an eigenspace is fundamentally a null space problem.
*   **Eigenvalues:** How to find the eigenvalues of a matrix by solving the characteristic equation $\det(A - \lambda I) = 0$. This lesson *assumes* you already know how to find the eigenvalues; our focus is on finding the corresponding eigenspaces.

## 4. The core idea — step by step

Finding an eigenspace for a given eigenvalue is a systematic process that builds directly on the definition of an eigenvector. Let's break it down.

### Step 1: Recall the Definition of an Eigenvector and Eigenvalue

**Plain English Statement:** An eigenvector is a special, non-zero vector that, when a linear transformation (represented by a matrix $A$) is applied to it, only gets scaled (stretched or shrunk) by a factor, without changing its direction. That scaling factor is its corresponding eigenvalue.

**Small Concrete Example:** Consider a matrix $A = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}$. If we take the vector $v = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$, then $Av = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 2 \\ 0 \end{pmatrix}$. Notice that $Av = 2v$. Here, $v$ is an eigenvector, and $\lambda = 2$ is its eigenvalue. The vector just got scaled by 2.

**Formal/Mathematical Version:** A non-zero vector $v$ is an eigenvector of an $n \times n$ matrix $A$ if there exists a scalar $\lambda$ (called an eigenvalue) such that:
$$Av = \lambda v$$
This equation is the cornerstone of all eigenvector and eigenvalue calculations.

**What Could Go Wrong:** It's crucial to remember that an eigenvector *must* be non-zero. The zero vector $v = 0$ always satisfies $A0 = \lambda 0$ for any $\lambda$, but it doesn't represent a "direction" and is therefore excluded from the definition of an eigenvector. However, as we'll see, the zero vector *is* included in the eigenspace.

### Step 2: Transform the Eigenvector Equation into a Homogeneous System

**Plain English Statement:** To find the vectors that satisfy $Av = \lambda v$, we can rearrange this equation into a standard form for a system of linear equations where the right-hand side is all zeros. This makes it a "homogeneous system."

**Small Concrete Example:** Starting with $Av = \lambda v$, we can subtract $\lambda v$ from both sides:
$Av - \lambda v = 0$
Now, we need to factor out $v$. We can't just write $(A - \lambda)v$ because $A$ is a matrix and $\lambda$ is a scalar; you can't subtract a scalar from a matrix directly. We need to introduce the identity matrix $I$ (which acts like the number '1' in matrix multiplication) so that $\lambda v = \lambda I v$.
So, $Av - \lambda I v = 0$
Now we can factor out $v$:
$(A - \lambda I)v = 0$
This is a homogeneous system of linear equations.

**Formal/Mathematical Version:**
Given $Av = \lambda v$, we manipulate it as follows:
$$Av - \lambda v = 0$$
To factor out $v$, we use the identity matrix $I$ of the same dimension as $A$:
$$Av - \lambda I v = 0$$
$$(A - \lambda I)v = 0$$
This equation states that $v$ is a vector in the null space (or kernel) of the matrix $(A - \lambda I)$.

**What Could Go Wrong:** The most common mistake here is forgetting to include the identity matrix $I$ when subtracting $\lambda$ from $A$. You *must* form the matrix $(A - \lambda I)$ by subtracting $\lambda$ from each diagonal entry of $A$ and leaving the off-diagonal entries unchanged. For example, if $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$, then $A - \lambda I = \begin{pmatrix} a-\lambda & b \\ c & d-\lambda \end{pmatrix}$.

### Step 3: Define the Eigenspace as a Null Space

**Plain English Statement:** For a specific eigenvalue $\lambda$, the collection of all vectors (including the zero vector) that satisfy the condition $(A - \lambda I)v = 0$ is called the eigenspace corresponding to $\lambda$. Because this equation is exactly the definition of a null space, the eigenspace is simply the null space of the matrix $(A - \lambda I)$.

**Small Concrete Example:** If we found an eigenvalue $\lambda = 2$ for a matrix $A$, then its eigenspace $E_2$ would be the set of all vectors $v$ such that $(A - 2I)v = 0$. We would then solve this system to find all such vectors.

**Formal/Mathematical Version:**
For a given eigenvalue $\lambda$ of an $n \times n$ matrix $A$, the **eigenspace** corresponding to $\lambda$, denoted $E_\lambda$, is defined as:
$$E_\lambda = \{v \in \mathbb{R}^n \mid Av = \lambda v\}$$
From Step 2, we know this is equivalent to:
$$E_\lambda = \{v \in \mathbb{R}^n \mid (A - \lambda I)v = 0\}$$
This is precisely the definition of the null space (or kernel) of the matrix $(A - \lambda I)$:
$$E_\lambda = \text{Null}(A - \lambda I) = \text{ker}(A - \lambda I)$$
The eigenspace $E_\lambda$ is always a subspace of $\mathbb{R}^n$.

**What Could Go Wrong:** Forgetting that an eigenspace *is* a subspace. This means it must contain the zero vector, be closed under vector addition, and be closed under scalar multiplication. While eigenvectors themselves are non-zero by definition, the eigenspace *includes* the zero vector.

### Step 4: Find a Basis for the Eigenspace

**Plain English Statement:** To describe an eigenspace, we typically find a "basis" for it. A basis is a minimal set of linearly independent vectors that can be combined (using addition and scalar multiplication) to generate *any* vector in that eigenspace. This is done by solving the homogeneous system $(A - \lambda I)v = 0$ using techniques like Gaussian elimination.

**Small Concrete Example:** Suppose after setting up $(A - \lambda I)v = 0$ and performing row reduction, we get a system that leads to solutions like $v_1 = 2v_2$ and $v_3 = 0$, where $v_2$ is a free variable. We can write the general solution vector as $\begin{pmatrix} 2v_2 \\ v_2 \\ 0 \end{pmatrix} = v_2 \begin{pmatrix} 2 \\ 1 \\ 0 \end{pmatrix}$. In this case, the vector $\begin{pmatrix} 2 \\ 1 \\ 0 \end{pmatrix}$ forms a basis for the eigenspace.

**Formal/Mathematical Version:**
1.  Form the matrix $(A - \lambda I)$.
2.  Set up the augmented matrix for the homogeneous system: $[(A - \lambda I) \mid 0]$.
3.  Use Gaussian elimination (row operations) to reduce this matrix to its Row Echelon Form (REF) or Reduced Row Echelon Form (RREF).
4.  Identify the basic variables and free variables.
5.  Write the general solution to the system in vector parametric form. Each free variable will correspond to a basis vector for the eigenspace.
6.  The set of vectors obtained from the vector parametric form constitutes a basis for $E_\lambda$. The number of vectors in this basis is the dimension of the eigenspace, also known as the geometric multiplicity of the eigenvalue $\lambda$.

**What Could Go Wrong:**
*   **Algebraic errors** during row reduction. A single mistake can lead to an incorrect basis.
*   **Incorrectly identifying free variables.** Remember, free variables correspond to columns without a leading '1' (pivot) in RREF.
*   **Not writing the solution in vector parametric form.** This is crucial for extracting the basis vectors.
*   **Confusing algebraic multiplicity with geometric multiplicity.** The number of times an eigenvalue appears as a root of the characteristic polynomial (algebraic multiplicity) does not always equal the dimension of its eigenspace (geometric multiplicity). The geometric multiplicity can be less than or equal to the algebraic multiplicity.

### Step 5: Interpret the Result Geometrically

**Plain English Statement:** An eigenspace is a geometric object – a line, a plane, or a higher-dimensional space – that passes through the origin. All vectors within this space, when transformed by matrix $A$, simply get scaled by the corresponding eigenvalue $\lambda$.

**Small Concrete Example:** If a basis for an eigenspace is $\left\{ \begin{pmatrix} 1 \\ 2 \end{pmatrix} \right\}$, this eigenspace is a line through the origin in $\mathbb{R}^2$ in the direction of $\begin{pmatrix} 1 \\ 2 \end{pmatrix}$. If a basis is $\left\{ \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} \right\}$, this eigenspace is the $xy$-plane in $\mathbb{R}^3$.

**Formal/Mathematical Version:**
Since $E_\lambda = \text{Null}(A - \lambda I)$, and the null space of any matrix is a vector subspace, $E_\lambda$ is a subspace of $\mathbb{R}^n$.
*   If the basis for $E_\lambda$ contains one vector, the eigenspace is a line through the origin.
*   If the basis for $E_\lambda$ contains two linearly independent vectors, the eigenspace is a plane through the origin.
*   In general, if the basis for $E_\lambda$ contains $k$ linearly independent vectors, the eigenspace is a $k$-dimensional subspace of $\mathbb{R}^n$.

**What Could Go Wrong:** Thinking of an eigenspace as just a single vector. It's a *set* of vectors, forming a geometric subspace.

## 5. Worked examples — multiple, with every step shown

We will now walk through several examples, from simple to more complex, to solidify your understanding. For each example, we assume the eigenvalues are already known. If they weren't, the first step would be to calculate them by solving $\det(A - \lambda I) = 0$.

### Example 1: Easy 2x2 Matrix with Distinct Eigenvalues

**Problem:** Find the eigenspaces for the matrix $A = \begin{pmatrix} 3 & 0 \\ 8 & -1 \end{pmatrix}$.
(Given eigenvalues are $\lambda_1 = 3$ and $\lambda_2 = -1$).

**What's given:** The matrix $A$ and its eigenvalues $\lambda_1 = 3$, $\lambda_2 = -1$.
**What we want:** The eigenspaces $E_3$ and $E_{-1}$.

---

**Finding the Eigenspace for $\lambda_1 = 3$:**

1.  **Form the matrix $(A - \lambda_1 I)$:**
    We substitute $\lambda_1 = 3$ into $(A - \lambda I)$.
    $$A - 3I = \begin{pmatrix} 3 & 0 \\ 8 & -1 \end{pmatrix} - 3 \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 3 & 0 \\ 8 & -1 \end{pmatrix} - \begin{pmatrix} 3 & 0 \\ 0 & 3 \end{pmatrix} = \begin{pmatrix} 3-3 & 0 \\ 8 & -1-3 \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 8 & -4 \end{pmatrix}$$
    *Explanation:* We subtract the eigenvalue $\lambda_1$ from each diagonal entry of matrix $A$.

2.  **Set up and solve the homogeneous system $(A - \lambda_1 I)v = 0$:**
    We are looking for vectors $v = \begin{pmatrix} v_1 \\ v_2 \end{pmatrix}$ such that $\begin{pmatrix} 0 & 0 \\ 8 & -4 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.
    This corresponds to the system of equations:
    $$0v_1 + 0v_2 = 0 \quad \text{(Equation 1)}$$
    $$8v_1 - 4v_2 = 0 \quad \text{(Equation 2)}$$
    *Explanation:* This is the core step: finding the null space of $(A - \lambda_1 I)$.

3.  **Row reduce the augmented matrix:**
    The augmented matrix is $\begin{pmatrix} 0 & 0 & | & 0 \\ 8 & -4 & | & 0 \end{pmatrix}$.
    Swap Row 1 and Row 2 to get a leading non-zero entry:
    $$\begin{pmatrix} 8 & -4 & | & 0 \\ 0 & 0 & | & 0 \end{pmatrix}$$
    Divide Row 1 by 8 to get a leading '1':
    $$\begin{pmatrix} 1 & -1/2 & | & 0 \\ 0 & 0 & | & 0 \end{pmatrix}$$
    *Explanation:* Gaussian elimination is used to simplify the system and easily identify basic and free variables.

4.  **Write the general solution in vector parametric form:**
    From the RREF, we have the equation:
    $$1v_1 - \frac{1}{2}v_2 = 0$$
    $$v_1 = \frac{1}{2}v_2$$
    Here, $v_2$ is a free variable (it can be any real number), and $v_1$ is a basic variable (it depends on $v_2$).
    Let $v_2 = t$, where $t \in \mathbb{R}$.
    Then $v_1 = \frac{1}{2}t$.
    The general solution vector $v$ is:
    $$v = \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} \frac{1}{2}t \\ t \end{pmatrix} = t \begin{pmatrix} \frac{1}{2} \\ 1 \end{pmatrix}$$
    We can choose a more convenient basis vector by multiplying by a scalar (e.g., 2) to clear fractions.
    Let $t=2s$, then $v = 2s \begin{pmatrix} \frac{1}{2} \\ 1 \end{pmatrix} = s \begin{pmatrix} 1 \\ 2 \end{pmatrix}$.
    *Explanation:* We express the basic variables in terms of the free variables. Then, we factor out the free variables to get the basis vectors for the null space.

5.  **State the eigenspace:**
    The eigenspace $E_3$ is the set of all scalar multiples of the vector $\begin{pmatrix} 1 \\ 2 \end{pmatrix}$.
    $$E_3 = \text{span}\left\{ \begin{pmatrix} 1 \\ 2 \end{pmatrix} \right\}$$

---

**Finding the Eigenspace for $\lambda_2 = -1$:**

1.  **Form the matrix $(A - \lambda_2 I)$:**
    Substitute $\lambda_2 = -1$ into $(A - \lambda I)$.
    $$A - (-1)I = A + I = \begin{pmatrix} 3 & 0 \\ 8 & -1 \end{pmatrix} + \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 3+1 & 0 \\ 8 & -1+1 \end{pmatrix} = \begin{pmatrix} 4 & 0 \\ 8 & 0 \end{pmatrix}$$
    *Explanation:* Same process, just with a different eigenvalue.

2.  **Set up and solve the homogeneous system $(A - \lambda_2 I)v = 0$:**
    We are looking for vectors $v = \begin{pmatrix} v_1 \\ v_2 \end{pmatrix}$ such that $\begin{pmatrix} 4 & 0 \\ 8 & 0 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.
    This corresponds to the system of equations:
    $$4v_1 + 0v_2 = 0 \quad \text{(Equation 1)}$$
    $$8v_1 + 0v_2 = 0 \quad \text{(Equation 2)}$$
    *Explanation:* Setting up the null space problem.

3.  **Row reduce the augmented matrix:**
    The augmented matrix is $\begin{pmatrix} 4 & 0 & | & 0 \\ 8 & 0 & | & 0 \end{pmatrix}$.
    Divide Row 1 by 4:
    $$\begin{pmatrix} 1 & 0 & | & 0 \\ 8 & 0 & | & 0 \end{pmatrix}$$
    Subtract 8 times Row 1 from Row 2 ($R_2 \to R_2 - 8R_1$):
    $$\begin{pmatrix} 1 & 0 & | & 0 \\ 0 & 0 & | & 0 \end{pmatrix}$$
    *Explanation:* Gaussian elimination.

4.  **Write the general solution in vector parametric form:**
    From the RREF, we have the equation:
    $$1v_1 + 0v_2 = 0 \implies v_1 = 0$$
    Here, $v_2$ is a free variable (it can be any real number), and $v_1$ is a basic variable.
    Let $v_2 = t$, where $t \in \mathbb{R}$.
    Then $v_1 = 0$.
    The general solution vector $v$ is:
    $$v = \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ t \end{pmatrix} = t \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$
    *Explanation:* Expressing basic variables in terms of free variables and parameterizing the solution.

5.  **State the eigenspace:**
    The eigenspace $E_{-1}$ is the set of all scalar multiples of the vector $\begin{pmatrix} 0 \\ 1 \end{pmatrix}$.
    $$E_{-1} = \text{span}\left\{ \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right\}$$

---

**Final Answer:**
The eigenspace for $\lambda_1 = 3$ is $\boxed{E_3 = \text{span}\left\{ \begin{pmatrix} 1 \\ 2 \end{pmatrix} \right\}}$.
The eigenspace for $\lambda_2 = -1$ is $\boxed{E_{-1} = \text{span}\left\{ \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right\}}$.

**Reflection:** This example was straightforward because the matrix was triangular, making eigenvalues easy to find (diagonal entries). The resulting systems for the eigenspaces were simple, each yielding a 1-dimensional eigenspace (a line) corresponding to a single basis vector.

### Example 2: Medium 3x3 Matrix with Distinct Eigenvalues

**Problem:** Find the eigenspaces for the matrix $A = \begin{pmatrix} 4 & 0 & 1 \\ -2 & 1 & 0 \\ -2 & 0 & 1 \end{pmatrix}$.
(Given eigenvalues are $\lambda_1 = 1$, $\lambda_2 = 2$, and $\lambda_3 = 3$).

**What's given:** The matrix $A$ and its eigenvalues $\lambda_1 = 1$, $\lambda_2 = 2$, $\lambda_3 = 3$.
**What we want:** The eigenspaces $E_1$, $E_2$, and $E_3$.

---

**Finding the Eigenspace for $\lambda_1 = 1$:**

1.  **Form the matrix $(A - \lambda_1 I)$:**
    $$A - 1I = \begin{pmatrix} 4 & 0 & 1 \\ -2 & 1 & 0 \\ -2 & 0 & 1 \end{pmatrix} - \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} = \begin{pmatrix} 4-1 & 0 & 1 \\ -2 & 1-1 & 0 \\ -2 & 0 & 1-1 \end{pmatrix} = \begin{pmatrix} 3 & 0 & 1 \\ -2 & 0 & 0 \\ -2 & 0 & 0 \end{pmatrix}$$
    *Explanation:* Subtracting $\lambda_1=1$ from the diagonal entries of $A$.

2.  **Set up and solve the homogeneous system $(A - \lambda_1 I)v = 0$:**
    We need to solve $\begin{pmatrix} 3 & 0 & 1 \\ -2 & 0 & 0 \\ -2 & 0 & 0 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$.

3.  **Row reduce the augmented matrix:**
    $$\begin{pmatrix} 3 & 0 & 1 & | & 0 \\ -2 & 0 & 0 & | & 0 \\ -2 & 0 & 0 & | & 0 \end{pmatrix}$$
    Divide Row 2 by -2 ($R_2 \to -\frac{1}{2}R_2$):
    $$\begin{pmatrix} 3 & 0 & 1 & | & 0 \\ 1 & 0 & 0 & | & 0 \\ -2 & 0 & 0 & | & 0 \end{pmatrix}$$
    Swap Row 1 and Row 2 ($R_1 \leftrightarrow R_2$):
    $$\begin{pmatrix} 1 & 0 & 0 & | & 0 \\ 3 & 0 & 1 & | & 0 \\ -2 & 0 & 0 & | & 0 \end{pmatrix}$$
    Subtract 3 times Row 1 from Row 2 ($R_2 \to R_2 - 3R_1$):
    Add 2 times Row 1 to Row 3 ($R_3 \to R_3 + 2R_1$):
    $$\begin{pmatrix} 1 & 0 & 0 & | & 0 \\ 0 & 0 & 1 & | & 0 \\ 0 & 0 & 0 & | & 0 \end{pmatrix}$$
    This is in RREF.
    *Explanation:* Systematic Gaussian elimination to simplify the system.

4.  **Write the general solution in vector parametric form:**
    From the RREF, we have:
    $$v_1 = 0$$
    $$v_3 = 0$$
    The variable $v_2$ has no leading '1', so it is a free variable.
    Let $v_2 = t$, where $t \in \mathbb{R}$.
    The general solution vector $v$ is:
    $$v = \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} 0 \\ t \\ 0 \end{pmatrix} = t \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$$
    *Explanation:* Expressing basic variables in terms of free variables.

5.  **State the eigenspace:**
    $$E_1 = \text{span}\left\{ \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} \right\}$$

---

**Finding the Eigenspace for $\lambda_2 = 2$:**

1.  **Form the matrix $(A - \lambda_2 I)$:**
    $$A - 2I = \begin{pmatrix} 4-2 & 0 & 1 \\ -2 & 1-2 & 0 \\ -2 & 0 & 1-2 \end{pmatrix} = \begin{pmatrix} 2 & 0 & 1 \\ -2 & -1 & 0 \\ -2 & 0 & -1 \end{pmatrix}$$
    *Explanation:* Subtracting $\lambda_2=2$ from the diagonal entries.

2.  **Set up and solve the homogeneous system $(A - \lambda_2 I)v = 0$:**
    We need to solve $\begin{pmatrix} 2 & 0 & 1 \\ -2 & -1 & 0 \\ -2 & 0 & -1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$.

3.  **Row reduce the augmented matrix:**
    $$\begin{pmatrix} 2 & 0 & 1 & | & 0 \\ -2 & -1 & 0 & | & 0 \\ -2 & 0 & -1 & | & 0 \end{pmatrix}$$
    Add Row 1 to Row 2 ($R_2 \to R_2 + R_1$):
    Add Row 1 to Row 3 ($R_3 \to R_3 + R_1$):
    $$\begin{pmatrix} 2 & 0 & 1 & | & 0 \\ 0 & -1 & 1 & | & 0 \\ 0 & 0 & 0 & | & 0 \end{pmatrix}$$
    Multiply Row 1 by $1/2$ ($R_1 \to \frac{1}{2}R_1$):
    Multiply Row 2 by -1 ($R_2 \to -R_2$):
    $$\begin{pmatrix} 1 & 0 & 1/2 & | & 0 \\ 0 & 1 & -1 & | & 0 \\ 0 & 0 & 0 & | & 0 \end{pmatrix}$$
    This is in RREF.
    *Explanation:* Gaussian elimination.

4.  **Write the general solution in vector parametric form:**
    From the RREF, we have:
    $$v_1 + \frac{1}{2}v_3 = 0 \implies v_1 = -\frac{1}{2}v_3$$
    $$v_2 - v_3 = 0 \implies v_2 = v_3$$
    The variable $v_3$ is a free variable. Let $v_3 = t$, where $t \in \mathbb{R}$.
    Then $v_1 = -\frac{1}{2}t$ and $v_2 = t$.
    The general solution vector $v$ is:
    $$v = \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} -\frac{1}{2}t \\ t \\ t \end{pmatrix} = t \begin{pmatrix} -\frac{1}{2} \\ 1 \\ 1 \end{pmatrix}$$
    We can choose a more convenient basis vector by multiplying by 2:
    $$v = s \begin{pmatrix} -1 \\ 2 \\ 2 \end{pmatrix}$$
    *Explanation:* Parameterizing the solution.

5.  **State the eigenspace:**
    $$E_2 = \text{span}\left\{ \begin{pmatrix} -1 \\ 2 \\ 2 \end{pmatrix} \right\}$$

---

**Finding the Eigenspace for $\lambda_3 = 3$:**

1.  **Form the matrix $(A - \lambda_3 I)$:**
    $$A - 3I = \begin{pmatrix} 4-3 & 0 & 1 \\ -2 & 1-3 & 0 \\ -2 & 0 & 1-3 \end{pmatrix} = \begin{pmatrix} 1 & 0 & 1 \\ -2 & -2 & 0 \\ -2 & 0 & -2 \end{pmatrix}$$
    *Explanation:* Subtracting $\lambda_3=3$ from the diagonal entries.

2.  **Set up and solve the homogeneous system $(A - \lambda_3 I)v = 0$:**
    We need to solve $\begin{pmatrix} 1 & 0 & 1 \\ -2 & -2 & 0 \\ -2 & 0 & -2 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$.

3.  **Row reduce the augmented matrix:**
    $$\begin{pmatrix} 1 & 0 & 1 & | & 0 \\ -2 & -2 & 0 & | & 0 \\ -2 & 0 & -2 & | & 0 \end{pmatrix}$$
    Add 2 times Row 1 to Row 2 ($R_2 \to R_2 + 2R_1$):
    Add 2 times Row 1 to Row 3 ($R_3 \to R_3 + 2R_1$):
    $$\begin{pmatrix} 1 & 0 & 1 & | & 0 \\ 0 & -2 & 2 & | & 0 \\ 0 & 0 & 0 & | & 0 \end{pmatrix}$$
    Multiply Row 2 by $-1/2$ ($R_2 \to -\frac{1}{2}R_2$):
    $$\begin{pmatrix} 1 & 0 & 1 & | & 0 \\ 0 & 1 & -1 & | & 0 \\ 0 & 0 & 0 & | & 0 \end{pmatrix}$$
    This is in RREF.
    *Explanation:* Gaussian elimination.

4.  **Write the general solution in vector parametric form:**
    From the RREF, we have:
    $$v_1 + v_3 = 0 \implies v_1 = -v_3$$
    $$v_2 - v_3 = 0 \implies v_2 = v_3$$
    The variable $v_3$ is a free variable. Let $v_3 = t$, where $t \in \mathbb{R}$.
    Then $v_1 = -t$ and $v_2 = t$.
    The general solution vector $v$ is:
    $$v = \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} -t \\ t \\ t \end{pmatrix} = t \begin{pmatrix} -1 \\ 1 \\ 1 \end{pmatrix}$$
    *Explanation:* Parameterizing the solution.

5.  **State the eigenspace:**
    $$E_3 = \text{span}\left\{ \begin{pmatrix} -1 \\ 1 \\ 1 \end{pmatrix} \right\}$$

---

**Final Answer:**
The eigenspace for $\lambda_1 = 1$ is $\boxed{E_1 = \text{span}\left\{ \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} \right\}}$.
The eigenspace for $\lambda_2 = 2$ is $\boxed{E_2 = \text{span}\left\{ \begin{pmatrix} -1 \\ 2 \\ 2 \end{pmatrix} \right\}}$.
The eigenspace for $\lambda_3 = 3$ is $\boxed{E_3 = \text{span}\left\{ \begin{pmatrix} -1 \\ 1 \\ 1 \end{pmatrix} \right\}}$.

**Reflection:** This 3x3 example involved more row reduction steps but followed the exact same logic. Each distinct eigenvalue yielded a 1-dimensional eigenspace, which is typical for distinct eigenvalues in $\mathbb{R}^n$.

### Example 3: Medium-Hard 3x3 Matrix with a Repeated Eigenvalue

**Problem:** Find the eigenspaces for the matrix $A = \begin{pmatrix} 2 & 0 & 0 \\ 1 & 2 & 1 \\ -1 & 0 & 1 \end{pmatrix}$.
(Given eigenvalues are $\lambda_1 = 1$ (algebraic multiplicity 1) and $\lambda_2 = 2$ (algebraic multiplicity 2)).

**What's given:** The matrix $A$ and its eigenvalues $\lambda_1 = 1$, $\lambda_2 = 2$ (with multiplicity 2).
**What we want:** The eigenspaces $E_1$ and $E_2$.

---

**Finding the Eigenspace for $\lambda_1 = 1$:**

1.  **Form the matrix $(A - \lambda_1 I)$:**
    $$A - 1I = \begin{pmatrix} 2-1 & 0 & 0 \\ 1 & 2-1 & 1 \\ -1 & 0 & 1-1 \end{pmatrix} = \begin{pmatrix} 1 & 0 & 0 \\ 1 & 1 & 1 \\ -1 & 0 & 0 \end{pmatrix}$$
    *Explanation:* Subtracting $\lambda_1=1$ from the diagonal entries.

2.  **Set up and solve the homogeneous system $(A - \lambda_1 I)v = 0$:**
    We need to solve $\begin{pmatrix} 1 & 0 & 0 \\ 1 & 1 & 1 \\ -1 & 0 & 0 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$.

3.  **Row reduce the augmented matrix:**
    $$\begin{pmatrix} 1 & 0 & 0 & | & 0 \\ 1 & 1 & 1 & | & 0 \\ -1 & 0 & 0 & | & 0 \end{pmatrix}$$
    Subtract Row 1 from Row 2 ($R_2 \to R_2 - R_1$):
    Add Row 1 to Row 3 ($R_3 \to R_3 + R_1$):
    $$\begin{pmatrix} 1 & 0 & 0 & | & 0 \\ 0 & 1 & 1 & | & 0 \\ 0 & 0 & 0 & | & 0 \end{pmatrix}$$
    This is in RREF.
    *Explanation:* Gaussian elimination.

4.  **Write the general solution in vector parametric form:**
    From the RREF, we have:
    $$v_1 = 0$$
    $$v_2 + v_3 = 0 \implies v_2 = -v_3$$
    The variable $v_3$ is a free variable. Let $v_3 = t$, where $t \in \mathbb{R}$.
    Then $v_1 = 0$ and $v_2 = -t$.
    The general solution vector $v$ is:
    $$v = \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} 0 \\ -t \\ t \end{pmatrix} = t \begin{pmatrix} 0 \\ -1 \\ 1 \end{pmatrix}$$
    *Explanation:* Parameterizing the solution.

5.  **State the eigenspace:**
    $$E_1 = \text{span}\left\{ \begin{pmatrix} 0 \\ -1 \\ 1 \end{pmatrix} \right\}$$

---

**Finding the Eigenspace for $\lambda_2 = 2$ (multiplicity 2):**

1.  **Form the matrix $(A - \lambda_2 I)$:**
    $$A - 2I = \begin{pmatrix} 2-2 & 0 & 0 \\ 1 & 2-2 & 1 \\ -1 & 0 & 1-2 \end{pmatrix} = \begin{pmatrix} 0 & 0 & 0 \\ 1 & 0 & 1 \\ -1 & 0 & -1 \end{pmatrix}$$
    *Explanation:* Subtracting $\lambda_2=2$ from the diagonal entries.

2.  **Set up and solve the homogeneous system $(A - \lambda_2 I)v = 0$:**
    We need to solve $\begin{pmatrix} 0 & 0 & 0 \\ 1 & 0 & 1 \\ -1 & 0 & -1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$.

3.  **Row reduce the augmented matrix:**
    $$\begin{pmatrix} 0 & 0 & 0 & | & 0 \\ 1 & 0 & 1 & | & 0 \\ -1 & 0 & -1 & | & 0 \end{pmatrix}$$
    Swap Row 1 and Row 2 ($R_1 \leftrightarrow R_2$):
    $$\begin{pmatrix} 1 & 0 & 1 & | & 0 \\ 0 & 0 & 0 & | & 0 \\ -1 & 0 & -1 & | & 0 \end{pmatrix}$$
    Add Row 1 to Row 3 ($R_3 \to R_3 + R_1$):
    $$\begin{pmatrix} 1 & 0 & 1 & | & 0 \\ 0 & 0 & 0 & | & 0 \\ 0 & 0 & 0 & | & 0 \end{pmatrix}$$
    This is in RREF.
    *Explanation:* Gaussian elimination.

4.  **Write the general solution in vector parametric form:**
    From the RREF, we have:
    $$v_1 + v_3 = 0 \implies v_1 = -v_3$$
    The variables $v_2$ and $v_3$ are free variables.
    Let $v_3 = t$ and $v_2 = s$, where $t, s \in \mathbb{R}$.
    Then $v_1 = -t$.
    The general solution vector $v$ is:
    $$v = \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} -t \\ s \\ t \end{pmatrix}$$
    We can split this into two vectors, one for each free variable:
    $$v = \begin{pmatrix} -t \\ 0 \\ t \end{pmatrix} + \begin{pmatrix} 0 \\ s \\ 0 \end{pmatrix} = t \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix} + s \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$$
    *Explanation:* With two free variables, the eigenspace will be 2-dimensional, and its basis will consist of two linearly independent vectors.

5.  **State the eigenspace:**
    $$E_2 = \text{span}\left\{ \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} \right\}$$

---

**Final Answer:**
The eigenspace for $\lambda_1 = 1$ is $\boxed{E_1 = \text{span}\left\{ \begin{pmatrix} 0 \\ -1 \\ 1 \end{pmatrix} \right\}}$.
The eigenspace for $\lambda_2 = 2$ is $\boxed{E_2 = \text{span}\left\{ \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} \right\}}$.

**Reflection:** This example highlights the case of a repeated eigenvalue. The algebraic multiplicity of $\lambda_2 = 2$ is 2, and the geometric multiplicity (dimension of $E_2$) is also 2, meaning we found two linearly independent eigenvectors for this eigenvalue. This matrix is diagonalizable. If the geometric multiplicity had been less than the algebraic multiplicity, the matrix would not be diagonalizable.

### Example 4: Hard 3x3 Matrix with a Repeated Eigenvalue (Non-Diagonalizable Case)

**Problem:** Find the eigenspaces for the matrix $A = \begin{pmatrix} 1 & 1 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{pmatrix}$.
(Given eigenvalues are $\lambda_1 = 0$ (algebraic multiplicity 1) and $\lambda_2 = 1$ (algebraic multiplicity 2)).

**What's given:** The matrix $A$ and its eigenvalues $\lambda_1 = 0$, $\lambda_2 = 1$ (with multiplicity 2).
**What we want:** The eigenspaces $E_0$ and $E_1$.

---

**Finding the Eigenspace for $\lambda_1 = 0$:**

1.  **Form the matrix $(A - \lambda_1 I)$:**
    $$A - 0I = A = \begin{pmatrix} 1 & 1 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{pmatrix}$$
    *Explanation:* Subtracting $\lambda_1=0$ from the diagonal entries means we just use matrix A itself.

2.  **Set up and solve the homogeneous system $(A - \lambda_1 I)v = 0$:**
    We need to solve $\begin{pmatrix} 1 & 1 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$.

3.  **Row reduce the augmented matrix:**
    $$\begin{pmatrix} 1 & 1 & 0 & | & 0 \\ 0 & 1 & 0 & | & 0 \\ 0 & 0 & 0 & | & 0 \end{pmatrix}$$
    Subtract Row 2 from Row 1 ($R_1 \to R_1 - R_2$):
    $$\begin{pmatrix} 1 & 0 & 0 & | & 0 \\ 0 & 1 & 0 & | & 0 \\ 0 & 0 & 0 & | & 0 \end{pmatrix}$$
    This is in RREF.
    *Explanation:* Gaussian elimination.

4.  **Write the general solution in vector parametric form:**
    From the RREF, we have:
    $$v_1 = 0$$
    $$v_2 = 0$$
    The variable $v_3$ is a free variable. Let $v_3 = t$, where $t \in \mathbb{R}$.
    The general solution vector $v$ is:
    $$v = \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ t \end{pmatrix} = t \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}$$
    *Explanation:* Parameterizing the solution.

5.  **State the eigenspace:**
    $$E_0 = \text{span}\left\{ \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix} \right\}$$

---

**Finding the Eigenspace for $\lambda_2 = 1$ (multiplicity 2):**

1.  **Form the matrix $(A - \lambda_2 I)$:**
    $$A - 1I = \begin{pmatrix} 1-1 & 1 & 0 \\ 0 & 1-1 & 0 \\ 0 & 0 & 0-1 \end{pmatrix} = \begin{pmatrix} 0 & 1 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & -1 \end{pmatrix}$$
    *Explanation:* Subtracting $\lambda_2=1$ from the diagonal entries.

2.  **Set up and solve the homogeneous system $(A - \lambda_2 I)v = 0$:**
    We need to solve $\begin{pmatrix} 0 & 1 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & -1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$.

3.  **Row reduce the augmented matrix:**
    $$\begin{pmatrix} 0 & 1 & 0 & | & 0 \\ 0 & 0 & 0 & | & 0 \\ 0 & 0 & -1 & | & 0 \end{pmatrix}$$
    Swap Row 2 and Row 3 ($R_2 \leftrightarrow R_3$):
    $$\begin{pmatrix} 0 & 1 & 0 & | & 0 \\ 0 & 0 & -1 & | & 0 \\ 0 & 0 & 0 & | & 0 \end{pmatrix}$$
    Multiply Row 2 by -1 ($R_2 \to -R_2$):
    $$\begin{pmatrix} 0 & 1 & 0 & | & 0 \\ 0 & 0 & 1 & | & 0 \\ 0 & 0 & 0 & | & 0 \end{pmatrix}$$
    This is in RREF.
    *Explanation:* Gaussian elimination.

4.  **Write the general solution in vector parametric form:**
    From the RREF, we have:
    $$v_2 = 0$$
    $$v_3 = 0$$
    The variable $v_1$ is a free variable. Let $v_1 = t$, where $t \in \mathbb{R}$.
    Then $v_2 = 0$ and $v_3 = 0$.
    The general solution vector $v$ is:
    $$v = \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} t \\ 0 \\ 0 \end{pmatrix} = t \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$$
    *Explanation:* Parameterizing the solution.

5.  **State the eigenspace:**
    $$E_1 = \text{span}\left\{ \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} \right\}$$

---

**Final Answer:**
The eigenspace for $\lambda_1 = 0$ is $\boxed{E_0 = \text{span}\left\{ \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix} \right\}}$.
The eigenspace for $\lambda_2 = 1$ is $\boxed{E_1 = \text{span}\left\{ \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} \right\}}$.

**Reflection:** This example demonstrates a crucial concept: for the eigenvalue $\lambda_2 = 1$, its algebraic multiplicity is 2 (it's a double root of the characteristic polynomial), but its geometric multiplicity (the dimension of its eigenspace $E_1$) is only 1. This means we could only find one linearly independent eigenvector for $\lambda_2 = 1$. When the geometric multiplicity is less than the algebraic multiplicity for any eigenvalue, the matrix is **not diagonalizable**. This is a common and important scenario in linear algebra.

## 6. Common mistakes and traps

Students often encounter specific pitfalls when finding eigenspaces. Being aware of these can save a lot of frustration and ensure accuracy:

1.  **Incorrectly forming $(A - \lambda I)$:** A very common mistake is to subtract $\lambda$ from *every* entry of $A$, or only from some diagonal entries, instead of *only* the diagonal entries. Remember, $I$ is the identity matrix, so $\lambda I$ has $\lambda$ only on its diagonal.
2.  **Algebraic errors in row reduction:** Gaussian elimination, while algorithmic, is prone to arithmetic mistakes. A single error in a row operation will lead to an incorrect RREF and subsequently wrong basis vectors. Double-check your arithmetic, especially with fractions or negative numbers.
3.  **Forgetting to set the system to zero:** The equation is $(A - \lambda I)v = 0$, a homogeneous system. Sometimes students mistakenly try to solve $(A - \lambda I)v = b$ for some non-zero $b$.
4.  **Incorrectly identifying free and basic variables:** After row reduction, columns without a leading '1' (pivot) correspond to free variables. All other variables are basic and must be expressed in terms of the free variables. Misidentifying these will lead to an incorrect parametric solution.
5.  **Not writing the solution in vector parametric form:** Simply stating the equations (e.g., $v_1 = 2v_2$, $v_3 = 0$) is insufficient. You must express the solution as a linear combination of vectors, where the coefficients are the free variables (parameters). This is how you extract the basis vectors.
6.  **Assuming geometric multiplicity equals algebraic multiplicity:** While often true, especially for distinct eigenvalues, it's not always the case (as seen in Example 4). The dimension of an eigenspace (geometric multiplicity) can be *less than* the algebraic multiplicity of its corresponding eigenvalue. Always perform the full row reduction to find the actual dimension.

## 7. Textbook-precise explanation

Let $V$ be a vector space over a field $\mathbb{F}$ (typically $\mathbb{R}$ or $\mathbb{C}$), and let $A$ be an $n \times n$ matrix with entries in $\mathbb{F}$, representing a linear transformation $T: V \to V$.

A scalar $\lambda \in \mathbb{F}$ is called an **eigenvalue** of $A$ if there exists a non-zero vector $v \in V$ such that $Av = \lambda v$. The vector $v$ is called an **eigenvector** of $A$ corresponding to the eigenvalue $\lambda$.

The equation $Av = \lambda v$ can be rewritten as $Av - \lambda v = 0$. By introducing the $n \times n$ identity matrix $I$, we can write $\lambda v$ as $\lambda I v$. Thus, the equation becomes $Av - \lambda I v = 0$, which can be factored as $(A - \lambda I)v = 0$.

The set of all solutions $v$ to this homogeneous system $(A - \lambda I)v = 0$ forms a subspace of $V$. This subspace is called the **eigenspace** of $A$ corresponding to the eigenvalue $\lambda$. It is formally defined as:

$$E_\lambda = \{v \in V \mid Av = \lambda v\}$$

Equivalently, using the transformed equation:

$$E_\lambda = \{v \in V \mid (A - \lambda I)v = 0\}$$

This definition highlights that the eigenspace $E_\lambda$ is precisely the **null space (or kernel)** of the matrix $(A - \lambda I)$:

$$E_\lambda = \text{Null}(A - \lambda I) = \text{ker}(A - \lambda I)$$

Since the null space of any matrix is a vector subspace, $E_\lambda$ is indeed a subspace of $V$. The dimension of $E_\lambda$ is called the **geometric multiplicity** of the eigenvalue $\lambda$. A basis for $E_\lambda$ is found by solving the homogeneous system $(A - \lambda I)v = 0$ using Gaussian elimination and expressing the general solution in vector parametric form. The linearly independent vectors obtained from this parametric form constitute a basis for $E_\lambda$.

**Reference:**
*   Lay, Lay, McDonald, *Linear Algebra and Its Applications*, 6th Edition, §5.1 & §5.2.
*   Strang, *Introduction to Linear Algebra*, 5th Edition, Chapter 6.

## 8. ASCII diagrams

Here are a couple of ASCII diagrams to help visualize eigenspaces.

**Diagram 1: An Eigenvector and its Eigenspace (1D)**

Imagine a 2D plane. A matrix transformation might stretch, shear, or rotate vectors. But an eigenvector just gets scaled. The line it lies on is its eigenspace.

```text
       ^ y
       |
       |  E_lambda (eigenspace for lambda)
       | /
       |/
-------+---------> x
      /|
     / |
    /  |
   v   |  (vector v is an eigenvector)
       |
       |
```
*Description:* This diagram shows a coordinate plane with a line passing through the origin. This line represents a 1-dimensional eigenspace $E_\lambda$. Any vector $v$ lying on this line is an eigenvector for the eigenvalue $\lambda$. When the matrix $A$ is applied, $v$ will still lie on this same line, only scaled (e.g., $Av$ might be $2v$ or $-0.5v$, but it stays on the line).

**Diagram 2: A 2D Eigenspace in 3D Space**

In 3D, an eigenspace can be a plane passing through the origin. All vectors in this plane are eigenvectors for a specific eigenvalue.

```text
       ^ z
       |
       |       /
       |      /  (Plane represents E_lambda)
       |     /
       |    /
       +---o---/---> y
      /   /
     /   /
    /   /
   /   /
  v   /
 /   /
<---/-------- x
```
*Description:* This diagram depicts a 3D coordinate system. A plane is shown cutting through the origin. This plane represents a 2-dimensional eigenspace $E_\lambda$. Any vector $v$ lying within this plane is an eigenvector for the eigenvalue $\lambda$. After transformation by matrix $A$, these vectors will remain within this plane, only scaled by $\lambda$.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    *   **ENSLAMI:** **E**igen**N**space is the **S**olution to **L**ambda **A** **M**inus **I**.
    *   Visualize a "null space" (a dark, empty void) and a matrix $(A - \lambda I)$ being fed into it, and out pops the eigenspace. The key is remembering to subtract $\lambda I$ from $A$.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    1.  The fundamental definition: $Av = \lambda v$.
    2.  The operational form: $(A - \lambda I)v = 0$.
    3.  The core connection: $E_\lambda = \text{Null}(A - \lambda I)$.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Immediately after this lesson, review the core steps and try one or two simple examples.
    *   **Day 3:** Review the core idea and definitions. Rework one example from memory.
    *   **Day 7:** Review all examples. Try to explain the concept in your own words without looking at notes.
    *   **Day 16:** Attempt a more challenging problem from a textbook. Focus on the "what could go wrong" aspects.
    *   **Day 35:** Revisit the concept and its connections to other topics (e.g., diagonalization). Can you derive the core idea from scratch?

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget how to find an eigenspace, start from the absolute definition of an eigenvector:
    1.  "What is an eigenvector?" It's a non-zero vector $v$ that, when multiplied by $A$, just gets scaled by $\lambda$. So, $Av = \lambda v$.
    2.  "How can I solve for $v$?" I need to get everything on one side. $Av - \lambda v = 0$.
    3.  "Can I factor out $v$?" Not directly, because $A$ is a matrix and $\lambda$ is a scalar. I need a matrix to subtract from $A$. The identity matrix $I$ acts like 1: $\lambda v = \lambda I