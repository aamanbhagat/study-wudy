## 1. What it is — in plain English

Imagine you have a special kind of machine, let's call it a "transformation machine," that takes in an arrow (a vector) and spits out a new arrow. Most of the time, this machine will change both the length and the direction of the arrow you put in. It might stretch it, shrink it, rotate it, or even flip it around.

But what if there are some *very special* arrows that, when put into the machine, only get stretched or shrunk? Their direction *doesn't change* (or it flips to the exact opposite direction, which is still along the same line). These special arrows are called **eigenvectors**.

The amount by which an eigenvector is stretched or shrunk (or flipped) is a number. This number is called the **eigenvalue**. If the eigenvalue is 2, the eigenvector gets twice as long. If it's 0.5, it gets half as long. If it's -1, it flips to the opposite direction but keeps the same length.

The **characteristic polynomial** is simply a mathematical tool, like a secret code-breaker, that helps us find these special stretch/shrink factors (eigenvalues). Once we have these factors, we can then easily find the special arrows (eigenvectors) themselves. It's the first crucial step in uncovering these unique properties of the transformation machine.

## 2. Why it matters — real-world applications

Eigenvalues and eigenvectors might seem abstract, but they are fundamental to understanding and solving problems across many scientific and engineering disciplines. They reveal the intrinsic properties of systems described by matrices.

1.  **Google PageRank Algorithm:** One of the most famous applications. Google's original PageRank algorithm, which determines the importance of web pages, is essentially an eigenvector problem. The internet can be modeled as a huge matrix where entries represent links between pages. The PageRank of each page is an entry in the principal eigenvector of this matrix. The corresponding eigenvalue (which is 1) represents the steady-state distribution of "link juice" across the web.

2.  **Quantum Mechanics (Physics):** In quantum mechanics, observable quantities like energy, momentum, or angular momentum are represented by linear operators. The possible values that can be measured for these quantities are the eigenvalues of the corresponding operator. The quantum states in which these quantities have definite values are the eigenvectors (often called "eigenstates" or "wavefunctions"). For example, the energy levels of an electron in an atom are the eigenvalues of the Hamiltonian operator, and the corresponding electron orbitals are the eigenfunctions (eigenvectors in an infinite-dimensional space).

3.  **Vibrational Analysis and Structural Engineering (Aerospace/Civil Engineering):** When designing structures like bridges, buildings, or aircraft wings, engineers need to know their natural frequencies of vibration. If an external force (like wind or an earthquake) matches one of these natural frequencies, it can cause resonance, leading to catastrophic failure (e.g., the Tacoma Narrows Bridge collapse). The natural frequencies are the square roots of the eigenvalues of a system's stiffness matrix, and the corresponding eigenvectors describe the specific modes of vibration (how the structure deforms at that frequency). This is critical for ensuring structural integrity and preventing resonance.

4.  **Principal Component Analysis (PCA) in Machine Learning:** PCA is a widely used technique for dimensionality reduction and feature extraction in data analysis. Given a dataset, PCA identifies the directions (principal components) along which the data varies the most. These principal components are the eigenvectors of the data's covariance matrix. The corresponding eigenvalues indicate the amount of variance captured along each principal component. By selecting the eigenvectors with the largest eigenvalues, we can reduce the dimensionality of the data while retaining most of its information, which is crucial for tasks like image compression, facial recognition, and data visualization.

## 3. Prerequisites — what you must know first

Before diving into eigenvalues and eigenvectors, ensure you have a solid grasp of the following concepts. If any of these feel unfamiliar, pause and review them.

*   **Vectors:** Understanding what a vector is (a directed line segment, an ordered list of numbers), vector addition, and scalar multiplication.
*   **Matrices:** Definition of a matrix, matrix addition, scalar multiplication of a matrix, and crucially, **matrix-vector multiplication** and **matrix-matrix multiplication**.
*   **Determinants:** How to calculate the determinant of a $2 \times 2$ matrix and a $3 \times 3$ matrix (using cofactor expansion or Sarrus' rule). Understanding that a non-zero determinant implies invertibility, and a zero determinant implies singularity (non-invertibility).
*   **Inverse of a Matrix:** The concept of an inverse matrix $A^{-1}$ such that $AA^{-1} = I$, and understanding that a matrix is invertible if and only if its determinant is non-zero.
*   **Linear Transformations:** The idea that a matrix can represent a linear transformation that maps vectors from one space to another.
*   **Systems of Linear Equations:** How to solve systems of linear equations, particularly homogeneous systems (where the right-hand side is all zeros), using methods like Gaussian elimination or row reduction to echelon form.
*   **Polynomials:** How to find the roots (or zeros) of a polynomial, especially quadratic equations (using the quadratic formula or factoring) and basic cubic equations (by factoring or rational root theorem).

## 4. The core idea — step by step

Let's break down the concept of eigenvalues, eigenvectors, and the characteristic polynomial step by step, building intuition along the way.

### Step 1: The special relationship

**Plain English:** Imagine a matrix as a machine that transforms vectors. Most vectors get twisted, rotated, and stretched by this machine. But for some very special vectors, the machine *only* stretches or shrinks them, without changing their fundamental direction. These special vectors are the eigenvectors, and the amount they are stretched/shrunk is the eigenvalue.

**Small concrete example:** Consider a matrix $A = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}$. If we apply this matrix to the vector $\mathbf{v} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$, we get:
$A\mathbf{v} = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 2 \cdot 1 + 0 \cdot 0 \\ 0 \cdot 1 + 3 \cdot 0 \end{pmatrix} = \begin{pmatrix} 2 \\ 0 \end{pmatrix}$.
Notice that $\begin{pmatrix} 2 \\ 0 \end{pmatrix}$ is just $2 \cdot \begin{pmatrix} 1 \\ 0 \end{pmatrix}$. So, $\mathbf{v} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ is an eigenvector, and its eigenvalue is $2$. It was simply stretched by a factor of 2.

If we apply $A$ to $\mathbf{u} = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$, we get:
$A\mathbf{u} = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix} \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 2 \\ 3 \end{pmatrix}$.
Here, $\begin{pmatrix} 2 \\ 3 \end{pmatrix}$ is not a scalar multiple of $\begin{pmatrix} 1 \\ 1 \end{pmatrix}$. So, $\mathbf{u}$ is *not* an eigenvector for this matrix $A$.

**Formal/Mathematical version:** An eigenvector of an $n \times n$ matrix $A$ is a non-zero vector $\mathbf{v}$ such that $A\mathbf{v}$ is a scalar multiple of $\mathbf{v}$. The scalar multiple is called the eigenvalue, denoted by $\lambda$.
$$A\mathbf{v} = \lambda\mathbf{v}$$
where $A$ is an $n \times n$ matrix, $\mathbf{v}$ is a non-zero vector in $\mathbb{R}^n$, and $\lambda$ is a scalar (which can be real or complex).

**What could go wrong:** It's crucial that $\mathbf{v}$ is a *non-zero* vector. If $\mathbf{v} = \mathbf{0}$, then $A\mathbf{0} = \mathbf{0}$ and $\lambda\mathbf{0} = \mathbf{0}$ for *any* matrix $A$ and *any* scalar $\lambda$. This trivial solution doesn't give us any useful information about the transformation. So, by definition, eigenvectors must be non-zero.

### Step 2: Rearranging the equation

**Plain English:** Our goal is to find $\lambda$ and $\mathbf{v}$. The equation $A\mathbf{v} = \lambda\mathbf{v}$ has $\mathbf{v}$ on both sides, which can be tricky. We want to rearrange it so that we can isolate the terms involving $\mathbf{v}$ on one side and set the whole expression to zero. This will allow us to use our knowledge of homogeneous systems of linear equations.

**Small concrete example:**
Starting with $A\mathbf{v} = \lambda\mathbf{v}$.
We can subtract $\lambda\mathbf{v}$ from both sides: $A\mathbf{v} - \lambda\mathbf{v} = \mathbf{0}$.
Now, we have a problem: $A$ is a matrix, but $\lambda$ is a scalar. We can't directly factor out $\mathbf{v}$ as $(A - \lambda)\mathbf{v}$, because you can't subtract a scalar from a matrix. To fix this, we introduce the identity matrix $I$. Multiplying a vector by $\lambda$ is the same as multiplying it by $\lambda I$.
So, $\lambda\mathbf{v}$ can be written as $\lambda I\mathbf{v}$.

**Formal/Mathematical version:**
Starting with $A\mathbf{v} = \lambda\mathbf{v}$, we subtract $\lambda\mathbf{v}$ from both sides:
$$A\mathbf{v} - \lambda\mathbf{v} = \mathbf{0}$$
To factor out $\mathbf{v}$, we must introduce the identity matrix $I$ (of the same dimension as $A$) such that $\lambda\mathbf{v} = \lambda I\mathbf{v}$.
$$A\mathbf{v} - \lambda I\mathbf{v} = \mathbf{0}$$
Now we can factor out $\mathbf{v}$:
$$(A - \lambda I)\mathbf{v} = \mathbf{0}$$
This is a homogeneous system of linear equations.

**What could go wrong:** A common mistake is to write $(A - \lambda)\mathbf{v} = \mathbf{0}$. This is mathematically incorrect because $A$ is a matrix and $\lambda$ is a scalar. You *must* include the identity matrix $I$ to maintain dimensional consistency and allow for matrix subtraction.

### Step 3: The non-trivial solution condition

**Plain English:** We're looking for non-zero eigenvectors $\mathbf{v}$. The equation $(A - \lambda I)\mathbf{v} = \mathbf{0}$ always has the trivial solution $\mathbf{v} = \mathbf{0}$. But we need *non-trivial* (non-zero) solutions. A homogeneous system $(A - \lambda I)\mathbf{v} = \mathbf{0}$ has non-trivial solutions if and only if the matrix $(A - \lambda I)$ is "singular" or "non-invertible." What does that mean for a matrix? It means its determinant is zero.

**Small concrete example:** Consider the system $\begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.
The determinant of $\begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}$ is $(1)(4) - (2)(2) = 4 - 4 = 0$.
Since the determinant is zero, this matrix is singular. This system *does* have non-trivial solutions. For example, $\begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} -2 \\ 1 \end{pmatrix}$ is a solution, because $\begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix} \begin{pmatrix} -2 \\ 1 \end{pmatrix} = \begin{pmatrix} 1(-2) + 2(1) \\ 2(-2) + 4(1) \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.
If the determinant were non-zero, the *only* solution would be $\begin{pmatrix} 0 \\ 0 \end{pmatrix}$.

**Formal/Mathematical version:**
For the homogeneous system $(A - \lambda I)\mathbf{v} = \mathbf{0}$ to have non-trivial solutions (i.e., $\mathbf{v} \neq \mathbf{0}$), the matrix $(A - \lambda I)$ must be singular. This condition is mathematically expressed by setting the determinant of $(A - \lambda I)$ to zero:
$$\det(A - \lambda I) = 0$$

**What could go wrong:** Forgetting this condition means you won't be able to find the eigenvalues. This is the crucial step that transforms the problem of finding special vectors into an algebraic problem of finding roots of a polynomial.

### Step 4: The Characteristic Polynomial

**Plain English:** The equation $\det(A - \lambda I) = 0$ is the key. When you calculate this determinant, you'll end up with an expression that is a polynomial in $\lambda$. This polynomial is called the **characteristic polynomial**. The roots of this polynomial are precisely the eigenvalues we are looking for.

**Small concrete example:** Let $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$.
Then $A - \lambda I = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} - \lambda \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 2-\lambda & 1 \\ 1 & 2-\lambda \end{pmatrix}$.
Now, we calculate the determinant:
$\det(A - \lambda I) = (2-\lambda)(2-\lambda) - (1)(1)$
$= (2-\lambda)^2 - 1$
$= (4 - 4\lambda + \lambda^2) - 1$
$= \lambda^2 - 4\lambda + 3$
This expression, $\lambda^2 - 4\lambda + 3$, is the characteristic polynomial for matrix $A$.

**Formal/Mathematical version:**
The expression $p(\lambda) = \det(A - \lambda I)$ is called the **characteristic polynomial** of the matrix $A$.
The equation $p(\lambda) = \det(A - \lambda I) = 0$ is called the **characteristic equation**.
For an $n \times n$ matrix, the characteristic polynomial will always be of degree $n$. For example, a $2 \times 2$ matrix will yield a quadratic polynomial, and a $3 \times 3$ matrix will yield a cubic polynomial.

**What could go wrong:** Algebraic errors in calculating the determinant are very common here. Be meticulous with your signs and multiplications, especially for $3 \times 3$ or larger matrices.

### Step 5: Finding Eigenvalues

**Plain English:** Once you have the characteristic polynomial, the next step is to find its roots. These roots are the values of $\lambda$ that make the polynomial equal to zero. Each of these roots is an eigenvalue of the matrix.

**Small concrete example:** Continuing from Step 4, our characteristic polynomial was $\lambda^2 - 4\lambda + 3$.
To find the eigenvalues, we set it to zero:
$\lambda^2 - 4\lambda + 3 = 0$
This is a quadratic equation. We can factor it:
$(\lambda - 1)(\lambda - 3) = 0$
So, the roots are $\lambda_1 = 1$ and $\lambda_2 = 3$.
These are the eigenvalues of the matrix $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$.

**Formal/Mathematical version:**
Solve the characteristic equation $p(\lambda) = \det(A - \lambda I) = 0$ for $\lambda$. The solutions are the eigenvalues of $A$.
For an $n \times n$ matrix, there will be $n$ eigenvalues, counting multiplicity and including complex numbers.

**What could go wrong:** Mistakes in factoring polynomials or using the quadratic formula. Remember that eigenvalues can be repeated (e.g., $\lambda^2 - 2\lambda + 1 = (\lambda-1)^2 = 0$ gives $\lambda=1$ with multiplicity 2). Also, eigenvalues can be complex numbers, even if the original matrix contains only real numbers (e.g., for rotation matrices).

### Step 6: Finding Eigenvectors

**Plain English:** Now that we have the specific stretch/shrink factors (eigenvalues), we need to find the special vectors (eigenvectors) associated with each one. For each eigenvalue, we plug it back into our rearranged equation $(A - \lambda I)\mathbf{v} = \mathbf{0}$ and solve for $\mathbf{v}$. Since we chose $\lambda$ specifically to make $(A - \lambda I)$ singular, we are guaranteed to find non-zero solutions for $\mathbf{v}$. These solutions will form a "space" of eigenvectors, called the eigenspace.

**Small concrete example:** From Step 5, we found eigenvalues $\lambda_1 = 1$ and $\lambda_2 = 3$ for $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$.

**For $\lambda_1 = 1$:**
Substitute $\lambda=1$ into $(A - \lambda I)\mathbf{v} = \mathbf{0}$:
$\begin{pmatrix} 2-1 & 1 \\ 1 & 2-1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$
$\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$
This gives us the system of equations:
$1v_1 + 1v_2 = 0 \implies v_1 = -v_2$
$1v_1 + 1v_2 = 0 \implies v_1 = -v_2$
Both equations are the same. We can choose $v_2 = t$ (where $t$ is any non-zero scalar). Then $v_1 = -t$.
So, the eigenvectors for $\lambda_1 = 1$ are of the form $\begin{pmatrix} -t \\ t \end{pmatrix} = t \begin{pmatrix} -1 \\ 1 \end{pmatrix}$.
A common choice is to pick $t=1$, so $\mathbf{v}_1 = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$.

**For $\lambda_2 = 3$:**
Substitute $\lambda=3$ into $(A - \lambda I)\mathbf{v} = \mathbf{0}$:
$\begin{pmatrix} 2-3 & 1 \\ 1 & 2-3 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$
$\begin{pmatrix} -1 & 1 \\ 1 & -1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$
This gives us the system of equations:
$-1v_1 + 1v_2 = 0 \implies v_1 = v_2$
$1v_1 - 1v_2 = 0 \implies v_1 = v_2$
Again, both equations are the same. We can choose $v_2 = t$. Then $v_1 = t$.
So, the eigenvectors for $\lambda_2 = 3$ are of the form $\begin{pmatrix} t \\ t \end{pmatrix} = t \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.
A common choice is to pick $t=1$, so $\mathbf{v}_2 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.

**Formal/Mathematical version:**
For each eigenvalue $\lambda_i$ found in Step 5, solve the homogeneous system $(A - \lambda_i I)\mathbf{v} = \mathbf{0}$. The set of all solutions $\mathbf{v}$ (including the zero vector) forms a subspace called the **eigenspace** corresponding to $\lambda_i$. Any non-zero vector in this eigenspace is an eigenvector associated with $\lambda_i$. We typically find a basis for each eigenspace.

**What could go wrong:** Algebraic errors when solving the system of equations are very common. Remember that you are solving for a *space* of solutions, not a single unique vector. If your calculations lead to only the trivial solution $\mathbf{v} = \mathbf{0}$, it means you made an error either in finding the eigenvalue or in solving the system. Always check that the matrix $(A - \lambda I)$ is indeed singular (i.e., its rows/columns are linearly dependent).

## 5. Worked examples — multiple, with every step shown

### Example 1: Easy 2x2 matrix with distinct real eigenvalues

**Problem:** Find the eigenvalues and corresponding eigenvectors of the matrix $A = \begin{pmatrix} 3 & 2 \\ 1 & 4 \end{pmatrix}$.

**Given:** Matrix $A = \begin{pmatrix} 3 & 2 \\ 1 & 4 \end{pmatrix}$.
**Want:** Eigenvalues $\lambda$ and eigenvectors $\mathbf{v}$.

**Step 1: Set up the characteristic equation.**
We need to solve $\det(A - \lambda I) = 0$.
First, construct the matrix $(A - \lambda I)$:
$$A - \lambda I = \begin{pmatrix} 3 & 2 \\ 1 & 4 \end{pmatrix} - \lambda \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 3-\lambda & 2 \\ 1 & 4-\lambda \end{pmatrix}$$
*Explanation:* We subtract $\lambda$ from each diagonal entry of $A$. This is because $\lambda I$ is a diagonal matrix with $\lambda$ on the main diagonal.

**Step 2: Calculate the determinant and form the characteristic polynomial.**
$$\det(A - \lambda I) = (3-\lambda)(4-\lambda) - (2)(1)$$
*Explanation:* For a $2 \times 2$ matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, the determinant is $ad - bc$.

$$= (12 - 3\lambda - 4\lambda + \lambda^2) - 2$$
*Explanation:* Expand the product $(3-\lambda)(4-\lambda)$.

$$= \lambda^2 - 7\lambda + 12 - 2$$
$$= \lambda^2 - 7\lambda + 10$$
*Explanation:* Combine like terms to get the characteristic polynomial.

**Step 3: Solve the characteristic equation for eigenvalues.**
Set the characteristic polynomial to zero:
$$\lambda^2 - 7\lambda + 10 = 0$$
*Explanation:* This is the characteristic equation. Its roots are the eigenvalues.

Factor the quadratic equation:
$$(\lambda - 2)(\lambda - 5) = 0$$
*Explanation:* We look for two numbers that multiply to 10 and add to -7. These are -2 and -5.

This gives us two distinct eigenvalues:
$$\lambda_1 = 2 \quad \text{and} \quad \lambda_2 = 5$$
*Explanation:* The roots of the characteristic polynomial are the eigenvalues.

**Step 4: Find the eigenvectors for each eigenvalue.**

**For $\lambda_1 = 2$:**
Substitute $\lambda = 2$ into $(A - \lambda I)\mathbf{v} = \mathbf{0}$:
$$\begin{pmatrix} 3-2 & 2 \\ 1 & 4-2 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} 1 & 2 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
*Explanation:* We plug $\lambda_1=2$ back into the matrix $(A - \lambda I)$.

This system of equations is:
$$1v_1 + 2v_2 = 0$$
$$1v_1 + 2v_2 = 0$$
*Explanation:* Perform matrix multiplication to get the system of equations. Notice the rows are linearly dependent, as expected for a singular matrix.

Both equations are identical. From $v_1 + 2v_2 = 0$, we can write $v_1 = -2v_2$.
Let $v_2 = t$ (where $t$ is any non-zero scalar). Then $v_1 = -2t$.
So, the eigenvectors for $\lambda_1 = 2$ are of the form $\begin{pmatrix} -2t \\ t \end{pmatrix} = t \begin{pmatrix} -2 \\ 1 \end{pmatrix}$.
A common choice is to set $t=1$ to get a basis vector for the eigenspace:
$$\mathbf{v}_1 = \begin{pmatrix} -2 \\ 1 \end{pmatrix}$$
*Explanation:* We express one variable in terms of another and introduce a parameter $t$. Any non-zero value of $t$ gives a valid eigenvector. We pick a simple representative vector.

**For $\lambda_2 = 5$:**
Substitute $\lambda = 5$ into $(A - \lambda I)\mathbf{v} = \mathbf{0}$:
$$\begin{pmatrix} 3-5 & 2 \\ 1 & 4-5 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} -2 & 2 \\ 1 & -1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
*Explanation:* We plug $\lambda_2=5$ back into the matrix $(A - \lambda I)$.

This system of equations is:
$$-2v_1 + 2v_2 = 0 \implies -v_1 + v_2 = 0$$
$$1v_1 - 1v_2 = 0 \implies v_1 - v_2 = 0$$
*Explanation:* Perform matrix multiplication. Again, the rows are linearly dependent.

Both equations simplify to $v_1 = v_2$.
Let $v_2 = t$. Then $v_1 = t$.
So, the eigenvectors for $\lambda_2 = 5$ are of the form $\begin{pmatrix} t \\ t \end{pmatrix} = t \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.
A common choice is to set $t=1$:
$$\mathbf{v}_2 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$$
*Explanation:* Similar process as for $\lambda_1$.

**Final Answer:**
The eigenvalues are $\lambda_1 = 2$ and $\lambda_2 = 5$.
The corresponding eigenvectors are $\mathbf{v}_1 = \begin{pmatrix} -2 \\ 1 \end{pmatrix}$ and $\mathbf{v}_2 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.

**Reflection:** This example was straightforward because the eigenvalues were distinct real numbers, leading to simple linear equations for the eigenvectors. The characteristic polynomial was easily factorable.

---

### Example 2: Medium 2x2 matrix with a repeated real eigenvalue

**Problem:** Find the eigenvalues and corresponding eigenvectors of the matrix $B = \begin{pmatrix} 1 & -1 \\ 1 & 3 \end{pmatrix}$.

**Given:** Matrix $B = \begin{pmatrix} 1 & -1 \\ 1 & 3 \end{pmatrix}$.
**Want:** Eigenvalues $\lambda$ and eigenvectors $\mathbf{v}$.

**Step 1: Set up the characteristic equation.**
$$B - \lambda I = \begin{pmatrix} 1-\lambda & -1 \\ 1 & 3-\lambda \end{pmatrix}$$

**Step 2: Calculate the determinant and form the characteristic polynomial.**
$$\det(B - \lambda I) = (1-\lambda)(3-\lambda) - (-1)(1)$$
$$= (3 - \lambda - 3\lambda + \lambda^2) + 1$$
$$= \lambda^2 - 4\lambda + 3 + 1$$
$$= \lambda^2 - 4\lambda + 4$$

**Step 3: Solve the characteristic equation for eigenvalues.**
$$\lambda^2 - 4\lambda + 4 = 0$$
This is a perfect square trinomial:
$$(\lambda - 2)^2 = 0$$
This gives a single eigenvalue with multiplicity 2:
$$\lambda_1 = 2 \quad \text{(with algebraic multiplicity 2)}$$
*Explanation:* We have a repeated eigenvalue. This is important because it can sometimes affect the number of linearly independent eigenvectors we find.

**Step 4: Find the eigenvectors for the eigenvalue.**

**For $\lambda_1 = 2$:**
Substitute $\lambda = 2$ into $(B - \lambda I)\mathbf{v} = \mathbf{0}$:
$$\begin{pmatrix} 1-2 & -1 \\ 1 & 3-2 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} -1 & -1 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

This system of equations is:
$$-1v_1 - 1v_2 = 0 \implies v_1 + v_2 = 0$$
$$1v_1 + 1v_2 = 0 \implies v_1 + v_2 = 0$$
Both equations are identical. From $v_1 + v_2 = 0$, we have $v_1 = -v_2$.
Let $v_2 = t$. Then $v_1 = -t$.
So, the eigenvectors for $\lambda_1 = 2$ are of the form $\begin{pmatrix} -t \\ t \end{pmatrix} = t \begin{pmatrix} -1 \\ 1 \end{pmatrix}$.
Choosing $t=1$:
$$\mathbf{v}_1 = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$$

**Final Answer:**
The eigenvalue is $\lambda = 2$ (with multiplicity 2).
The corresponding eigenvector (or basis for the eigenspace) is $\mathbf{v} = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$.

**Reflection:** This example highlights that a repeated eigenvalue (algebraic multiplicity > 1) does not guarantee an equal number of linearly independent eigenvectors (geometric multiplicity). Here, the algebraic multiplicity is 2, but we only found one linearly independent eigenvector. Such matrices are called "defective" and are not diagonalizable.

---

### Example 3: Medium 2x2 matrix with complex eigenvalues

**Problem:** Find the eigenvalues and corresponding eigenvectors of the matrix $C = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$. (This matrix represents a 90-degree counter-clockwise rotation).

**Given:** Matrix $C = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$.
**Want:** Eigenvalues $\lambda$ and eigenvectors $\mathbf{v}$.

**Step 1: Set up the characteristic equation.**
$$C - \lambda I = \begin{pmatrix} 0-\lambda & -1 \\ 1 & 0-\lambda \end{pmatrix} = \begin{pmatrix} -\lambda & -1 \\ 1 & -\lambda \end{pmatrix}$$

**Step 2: Calculate the determinant and form the characteristic polynomial.**
$$\det(C - \lambda I) = (-\lambda)(-\lambda) - (-1)(1)$$
$$= \lambda^2 + 1$$

**Step 3: Solve the characteristic equation for eigenvalues.**
$$\lambda^2 + 1 = 0$$
$$\lambda^2 = -1$$
Taking the square root of both sides:
$$\lambda = \pm\sqrt{-1}$$
$$\lambda_1 = i \quad \text{and} \quad \lambda_2 = -i$$
*Explanation:* The eigenvalues are complex numbers. This is expected for a rotation matrix, as real vectors generally change direction under rotation, meaning there are no real eigenvectors.

**Step 4: Find the eigenvectors for each eigenvalue.**

**For $\lambda_1 = i$:**
Substitute $\lambda = i$ into $(C - \lambda I)\mathbf{v} = \mathbf{0}$:
$$\begin{pmatrix} -i & -1 \\ 1 & -i \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

This system of equations is:
$$-iv_1 - v_2 = 0 \implies v_2 = -iv_1$$
$$v_1 - iv_2 = 0$$
*Explanation:* We now deal with complex numbers in our system.

Let's check the second equation with $v_2 = -iv_1$:
$v_1 - i(-iv_1) = v_1 - i^2v_1 = v_1 - (-1)v_1 = v_1 + v_1 = 2v_1$.
So, $2v_1 = 0$, which implies $v_1 = 0$.
If $v_1=0$, then $v_2 = -i(0) = 0$. This gives the trivial solution $\begin{pmatrix} 0 \\ 0 \end{pmatrix}$, which is incorrect. This indicates a potential error in my derivation or understanding of the system. Let me re-examine.

Ah, the system is consistent because the determinant is zero. This means the rows are linearly dependent.
If we multiply the first row by $i$: $i(-iv_1 - v_2) = i(0) \implies -i^2v_1 - iv_2 = 0 \implies v_1 - iv_2 = 0$.
This is exactly the second equation. So, the equations are indeed linearly dependent. We only need to use one of them.
From $-iv_1 - v_2 = 0$, we have $v_2 = -iv_1$.
Let $v_1 = t$ (where $t$ is any non-zero complex scalar). Then $v_2 = -it$.
So, the eigenvectors for $\lambda_1 = i$ are of the form $\begin{pmatrix} t \\ -it \end{pmatrix} = t \begin{pmatrix} 1 \\ -i \end{pmatrix}$.
A common choice is to set $t=1$:
$$\mathbf{v}_1 = \begin{pmatrix} 1 \\ -i \end{pmatrix}$$
*Explanation:* When solving systems with complex coefficients, the algebra is similar but requires careful handling of complex numbers. The goal is still to find a non-zero vector that satisfies the equations.

**For $\lambda_2 = -i$:**
Substitute $\lambda = -i$ into $(C - \lambda I)\mathbf{v} = \mathbf{0}$:
$$\begin{pmatrix} -(-i) & -1 \\ 1 & -(-i) \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} i & -1 \\ 1 & i \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

This system of equations is:
$$iv_1 - v_2 = 0 \implies v_2 = iv_1$$
$$v_1 + iv_2 = 0$$
Let's check the second equation with $v_2 = iv_1$:
$v_1 + i(iv_1) = v_1 + i^2v_1 = v_1 - v_1 = 0$. This is consistent.
From $v_2 = iv_1$.
Let $v_1 = t$. Then $v_2 = it$.
So, the eigenvectors for $\lambda_2 = -i$ are of the form $\begin{pmatrix} t \\ it \end{pmatrix} = t \begin{pmatrix} 1 \\ i \end{pmatrix}$.
Choosing $t=1$:
$$\mathbf{v}_2 = \begin{pmatrix} 1 \\ i \end{pmatrix}$$

**Final Answer:**
The eigenvalues are $\lambda_1 = i$ and $\lambda_2 = -i$.
The corresponding eigenvectors are $\mathbf{v}_1 = \begin{pmatrix} 1 \\ -i \end{pmatrix}$ and $\mathbf{v}_2 = \begin{pmatrix} 1 \\ i \end{pmatrix}$.

**Reflection:** This example demonstrates that eigenvalues and eigenvectors can be complex, even for real matrices. This is a crucial point, as complex numbers are indispensable in many areas of mathematics and physics (e.g., quantum mechanics, signal processing). The eigenvectors for complex conjugate eigenvalues are complex conjugates of each other.

---

### Example 4: Hard 3x3 matrix with distinct real eigenvalues

**Problem:** Find the eigenvalues and corresponding eigenvectors of the matrix $D = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 2 & 0 \\ 1 & 0 & 1 \end{pmatrix}$.

**Given:** Matrix $D = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 2 & 0 \\ 1 & 0 & 1 \end{pmatrix}$.
**Want:** Eigenvalues $\lambda$ and eigenvectors $\mathbf{v}$.

**Step 1: Set up the characteristic equation.**
$$D - \lambda I = \begin{pmatrix} 1-\lambda & 0 & 1 \\ 0 & 2-\lambda & 0 \\ 1 & 0 & 1-\lambda \end{pmatrix}$$

**Step 2: Calculate the determinant and form the characteristic polynomial.**
We use cofactor expansion along the second row because it has two zeros, simplifying the calculation.
$$\det(D - \lambda I) = (0) \cdot C_{21} + (2-\lambda) \cdot C_{22} + (0) \cdot C_{23}$$
$$= (2-\lambda) \cdot \det \begin{pmatrix} 1-\lambda & 1 \\ 1 & 1-\lambda \end{pmatrix}$$
*Explanation:* For a $3 \times 3$ determinant, cofactor expansion is generally the most reliable method. Choosing a row or column with many zeros minimizes calculations. Here, $C_{22}$ is the cofactor for the element in row 2, column 2. The sign of $C_{ij}$ is $(-1)^{i+j}$. For $C_{22}$, $(-1)^{2+2} = 1$.

Now, calculate the $2 \times 2$ determinant:
$$\det \begin{pmatrix} 1-\lambda & 1 \\ 1 & 1-\lambda \end{pmatrix} = (1-\lambda)(1-\lambda) - (1)(1)$$
$$= (1-\lambda)^2 - 1$$
$$= (1 - 2\lambda + \lambda^2) - 1$$
$$= \lambda^2 - 2\lambda$$
*Explanation:* Expand the $2 \times 2$ determinant.

Substitute this back into the expression for $\det(D - \lambda I)$:
$$\det(D - \lambda I) = (2-\lambda)(\lambda^2 - 2\lambda)$$
*Explanation:* This is our characteristic polynomial. It's already partially factored, which is helpful.

**Step 3: Solve the characteristic equation for eigenvalues.**
Set the characteristic polynomial to zero:
$$(2-\lambda)(\lambda^2 - 2\lambda) = 0$$
Factor out $\lambda$ from the second term:
$$(2-\lambda)\lambda(\lambda - 2) = 0$$
Rearrange for clarity:
$$-\lambda(\lambda - 2)(\lambda - 2) = 0$$
$$-\lambda(\lambda - 2)^2 = 0$$
*Explanation:* We fully factor the polynomial.

This gives us the eigenvalues:
$$\lambda_1 = 0$$
$$\lambda_2 = 2 \quad \text{(with algebraic multiplicity 2)}$$
*Explanation:* The roots are 0 and 2. Note that 2 is a repeated eigenvalue.

**Step 4: Find the eigenvectors for each eigenvalue.**

**For $\lambda_1 = 0$:**
Substitute $\lambda = 0$ into $(D - \lambda I)\mathbf{v} = \mathbf{0}$:
$$\begin{pmatrix} 1-0 & 0 & 1 \\ 0 & 2-0 & 0 \\ 1 & 0 & 1-0 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} 1 & 0 & 1 \\ 0 & 2 & 0 \\ 1 & 0 & 1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
*Explanation:* Plug $\lambda_1=0$ into $(D - \lambda I)$.

This system of equations is:
1) $v_1 + 0v_2 + v_3 = 0 \implies v_1 + v_3 = 0$
2) $0v_1 + 2v_2 + 0v_3 = 0 \implies 2v_2 = 0 \implies v_2 = 0$
3) $1v_1 + 0v_2 + 1v_3 = 0 \implies v_1 + v_3 = 0$
*Explanation:* Expand the matrix multiplication into a system of linear equations.

From equation (2), we know $v_2 = 0$.
From equation (1) (or (3)), we have $v_1 = -v_3$.
Let $v_3 = t$. Then $v_1 = -t$.
So, the eigenvectors for $\lambda_1 = 0$ are of the form $\begin{pmatrix} -t \\ 0 \\ t \end{pmatrix} = t \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix}$.
Choosing $t=1$:
$$\mathbf{v}_1 = \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix}$$

**For $\lambda_2 = 2$:**
Substitute $\lambda = 2$ into $(D - \lambda I)\mathbf{v} = \mathbf{0}$:
$$\begin{pmatrix} 1-2 & 0 & 1 \\ 0 & 2-2 & 0 \\ 1 & 0 & 1-2 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} -1 & 0 & 1 \\ 0 & 0 & 0 \\ 1 & 0 & -1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
*Explanation:* Plug $\lambda_2=2$ into $(D - \lambda I)$.

This system of equations is:
1) $-1v_1 + 0v_2 + 1v_3 = 0 \implies -v_1 + v_3 = 0$
2) $0v_1 + 0v_2 + 0v_3 = 0 \implies 0 = 0$ (This row gives no information, which is expected for a singular matrix)
3) $1v_1 + 0v_2 - 1v_3 = 0 \implies v_1 - v_3 = 0$
*Explanation:* Expand the matrix multiplication. The second row becoming all zeros is a strong indicator that $\lambda=2$ is indeed an eigenvalue and that we will find non-trivial solutions.

Both equation (1) and (3) simplify to $v_1 = v_3$.
The variable $v_2$ is not constrained by any equation (because its column is all zeros, except for the diagonal which is now zero). This means $v_2$ can be any value independently.
Let $v_1 = t_1$. Then $v_3 = t_1$.
Let $v_2 = t_2$.
So, the eigenvectors for $\lambda_2 = 2$ are of the form $\begin{pmatrix} t_1 \\ t_2 \\ t_1 \end{pmatrix}$.
We can express this as a linear combination of two linearly independent vectors:
$$\begin{pmatrix} t_1 \\ t_2 \\ t_1 \end{pmatrix} = t_1 \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} + t_2 \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$$
*Explanation:* Since $v_1$ and $v_3$ are related, but $v_2$ is independent, we have two free variables ($t_1$ and $t_2$), meaning the eigenspace is 2-dimensional.

Choosing $t_1=1, t_2=0$ gives $\mathbf{v}_2 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}$.
Choosing $t_1=0, t_2=1$ gives $\mathbf{v}_3 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$.
These two vectors form a basis for the eigenspace corresponding to $\lambda_2 = 2$.
$$\mathbf{v}_2 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} \quad \text{and} \quad \mathbf{v}_3 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$$

**Final Answer:**
The eigenvalues are $\lambda_1 = 0$ and $\lambda_2 = 2$ (with algebraic multiplicity 2).
The corresponding eigenvectors are:
For $\lambda_1 = 0$: $\mathbf{v}_1 = \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix}$
For $\lambda_2 = 2$: $\mathbf{v}_2 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}$ and $\mathbf{v}_3 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$

**Reflection:** This example demonstrates how to handle $3 \times 3$ matrices, which involves calculating a $3 \times 3$ determinant and solving a cubic polynomial (though here it was easily factorable). It also shows that a repeated eigenvalue can have multiple linearly independent eigenvectors (in this case, the algebraic multiplicity of 2 matched the geometric multiplicity of 2, meaning it's not a defective matrix).

## 6. Common mistakes and traps

1.  **Forgetting the Identity Matrix:** A very common error is writing $(A - \lambda)\mathbf{v} = \mathbf{0}$ instead of $(A - \lambda I)\mathbf{v} = \mathbf{0}$. You cannot subtract a scalar $\lambda$ from a matrix $A$. The identity matrix $I$ is essential for dimensional consistency.
2.  **Assuming $\mathbf{v} = \mathbf{0}$ is an Eigenvector:** By definition, eigenvectors must be non-zero. If your calculations for an eigenvector lead only to the trivial solution $\mathbf{v} = \mathbf{0}$, it indicates an error in finding the eigenvalue or solving the system.
3.  **Algebraic Errors in Determinant Calculation:** Calculating determinants, especially for $3 \times 3$ or larger matrices, is prone to sign errors, multiplication mistakes, or incorrect cofactor expansion. Double-check your work.
4.  **Errors in Solving the Characteristic Polynomial:** Factoring quadratic or cubic polynomials, or using the quadratic formula, can lead to mistakes. Be careful with signs and arithmetic. Don't forget that eigenvalues can be complex numbers.
5.  **Errors in Solving the Homogeneous System for Eigenvectors:** After finding an eigenvalue, plugging it back into $(A - \lambda I)\mathbf{v} = \mathbf{0}$ and solving the system requires careful row reduction or substitution. Students often make mistakes here, leading to incorrect eigenvectors or only the trivial solution. Remember that the system *must* have non-trivial solutions if $\lambda$ is indeed an eigenvalue.
6.  **Not Finding a Basis for the Eigenspace:** For repeated eigenvalues, or when the null space of $(A - \lambda I)$ has dimension greater than one, you might find multiple linearly independent eigenvectors. It's important to find a basis for the entire eigenspace, not just one arbitrary eigenvector.

## 7. Textbook-precise explanation

This section provides the formal definitions and theorems as they would appear in a rigorous university textbook.

Let $A$ be an $n \times n$ matrix.

**Definition 1: Eigenvalue and Eigenvector**
A scalar $\lambda$ (real or complex) is an **eigenvalue** of $A$ if there exists a non-zero vector $\mathbf{v} \in \mathbb{C}^n$ such that
$$A\mathbf{v} = \lambda\mathbf{v}$$
The vector $\mathbf{v}$ is called an **eigenvector** of $A$ corresponding to $\lambda$.

**Definition 2: Eigenspace**
For a given eigenvalue $\lambda$ of an $n \times n$ matrix $A$, the set of all eigenvectors corresponding to $\lambda$, together with the zero vector, is a subspace of $\mathbb{C}^n$ called the **eigenspace** of $A$ corresponding to $\lambda$.
The eigenspace is precisely the null space of the matrix $(A - \lambda I)$, i.e., $E_\lambda = \text{Null}(A - \lambda I) = \{\mathbf{v} \in \mathbb{C}^n \mid (A - \lambda I)\mathbf{v} = \mathbf{0}\}$.

**Theorem 1: The Characteristic Equation**
A scalar $\lambda$ is an eigenvalue of an $n \times n$ matrix $A$ if and only if it satisfies the **characteristic equation**:
$$\det(A - \lambda I) = 0$$
where $I$ is the $n \times n$ identity matrix.

**Definition 3: Characteristic Polynomial**
The expression $p(\lambda) = \det(A - \lambda I)$ is a polynomial in $\lambda$ of degree $n$, called the **characteristic polynomial** of the matrix $A$. The roots of the characteristic polynomial are the eigenvalues of $A$.

**Definition 4: Algebraic Multiplicity**
The **algebraic multiplicity** of an eigenvalue $\lambda$ is its multiplicity as a root of the characteristic polynomial.

**Definition 5: Geometric Multiplicity**
The **geometric multiplicity** of an eigenvalue $\lambda$ is the dimension of its corresponding eigenspace, $\dim(E_\lambda) = \dim(\text{Null}(A - \lambda I))$. It represents the maximum number of linearly independent eigenvectors associated with $\lambda$.

**Theorem 2:**
For any eigenvalue $\lambda$, its geometric multiplicity is always less than or equal to its algebraic multiplicity:
$$1 \le \text{geometric multiplicity of } \lambda \le \text{algebraic multiplicity of } \lambda$$

**Finding Eigenvalues and Eigenvectors (Summary of Procedure):**
1.  Form the matrix $(A - \lambda I)$.
2.  Calculate the characteristic polynomial $p(\lambda) = \det(A - \lambda I)$.
3.  Solve the characteristic equation $p(\lambda) = 0$ for its roots $\lambda_1, \lambda_2, \ldots, \lambda_n$. These are the eigenvalues.
4.  For each eigenvalue $\lambda_k$, solve the homogeneous system $(A - \lambda_k I)\mathbf{v} = \mathbf{0}$ to find a basis for the eigenspace $E_{\lambda_k}$. The non-zero vectors in this basis are the eigenvectors corresponding to $\lambda_k$.

*Refer to standard Linear Algebra textbooks such as:*
*   Lay, Lay, & McDonald, *Linear Algebra and Its Applications*, 6th Edition, Chapters 5.1-5.2.
*   Strang, *Introduction to Linear Algebra*, 5th Edition, Chapter 6.
*   Axler, *Linear Algebra Done Right*, 3rd Edition, Chapter 5.

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the difference between an eigenvector and a non-eigenvector under a linear transformation.

```text
       Transformation A:
       (Stretches along x-axis, rotates slightly)

       Original Vectors:
       ^ y
       |
       |  v (eigenvector)
       |  /
       | /
       |/
       +-----------> x
      /|
     / | u (non-eigenvector)
    /  |
   /   |

       After Transformation A:
       ^ y
       |
       |  A*v (stretched, same direction)
       |  /
       | /
       |/
       +----------------> x
      /|
     / |
    /  |
   /   | A*u (rotated & stretched, different direction)
  /____|

Description:
- The vector 'v' (an eigenvector) remains along its original line (direction) after the transformation A, only changing its length.
- The vector 'u' (a non-eigenvector) changes both its length and its direction after the transformation A.
```

To draw this yourself:
1.  Draw an x-y coordinate system.
2.  Draw a vector `v` pointing, for example, along the line $y=x$ in the first quadrant.
3.  Draw another vector `u` pointing, for example, along the line $y=-x$ in the second quadrant.
4.  For the transformed `A*v`, draw it longer or shorter than `v`, but still lying exactly on the same line as `v`.
5.  For the transformed `A*u`, draw it at a completely different angle and potentially different length from `u`, showing it was rotated and scaled.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **Eigen-Value is the *Value* (scalar), Eigen-Vector is the *Vector* (direction).** Think of "Eigen" as "self" or "characteristic." So, an eigenvector is a vector that transforms into a scalar multiple of *itself*. The eigenvalue is that scalar multiple.
    *   **The "AVA" Equation:** $A\mathbf{v} = \lambda\mathbf{v}$. Remember it as "A-V-A," where the middle "V" is the vector, and the $\lambda$ is the scaling factor. This is the fundamental definition.
    *   **The "DET" Trick:** To find the values of $\lambda$, you use the determinant: $\det(A - \lambda I) = 0$. Think of it as "D-E-T" where D is for determinant, E for equation, T for zero.

2.  **Formulas/Facts to Overlearn:**
    *   **The Definition:** $A\mathbf{v} = \lambda\mathbf{v}$ (where $\mathbf{v} \neq \mathbf{0}$). This is the absolute core.
    *   **The Characteristic Equation:** $\det(A - \lambda I) = 0$. This is the computational gateway.
    *   **Eigenvectors are non-zero.** Always.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review the entire lesson, work through all examples.
    *   **Day 3:** Reread definitions, re-derive the characteristic equation, and work through 2-3 new problems.
    *   **Day 7:** Briefly review the core ideas, try to explain it to someone (or yourself) without notes, and work 1-2 challenging problems.
    *   **Day 16:** Review definitions and the derivation pathway. Focus on common mistakes.
    *   **Day 35:** Attempt a comprehensive problem that requires finding both eigenvalues and eigenvectors for a $3 \times 3$ matrix, including cases with repeated or complex eigenvalues.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the characteristic equation, you can always rebuild it from the definition:
    1.  Start with the definition of an eigenvector and eigenvalue: $A\mathbf{v} = \lambda\mathbf{v}$.
    2.  Move all terms to one side: $A\mathbf{v} - \lambda\mathbf{v} = \mathbf{0}$.
    3.  Recognize that you can't subtract a scalar from a matrix. Introduce the identity matrix $I$: $A\mathbf{v} - \lambda I\mathbf{v} = \mathbf{0}$.
    4.  Factor out $\mathbf{v}$: $(A - \lambda I)\mathbf{v} = \mathbf{0}$.
    5.  Recall that we are looking for *non-zero* vectors $\mathbf{v}$. A homogeneous system $M\mathbf{v} = \mathbf{0}$ has non-trivial solutions if and only if the matrix $M$ is singular (non-invertible).
    6.  The condition for a matrix to be singular is that its determinant is zero. Therefore, $\det(A - \lambda I) = 0$.
    This pathway ensures you can always reconstruct the characteristic equation from first principles.

## 10. Connections — what this leads to

Eigenvalues and eigenvectors are foundational concepts in linear algebra, unlocking many advanced topics and practical applications:

1.  **Diagonalization of Matrices:** A matrix $A$ can be "diagonalized" into $A = PDP^{-1}$ where $D$ is a diagonal matrix containing the eigenvalues of $A$, and the columns of $P$ are the corresponding eigenvectors. This simplifies many matrix operations.
2.  **Matrix Powers:** Calculating high powers of a matrix ($A^k$) becomes trivial if the matrix is diagonalizable. $A^k = PD^kP^{-1}$, and $D^k$ is simply the diagonal matrix with eigenvalues raised to the power $k$. This is crucial for analyzing dynamical systems.
3.  **Systems of Differential Equations:** Eigenvalues and eigenvectors are used to solve systems of linear ordinary differential equations, providing insight into the stability and behavior of solutions over time.
4.  **Singular Value Decomposition (SVD):** While distinct from eigenvalues, SVD is a generalization that applies to any matrix (not just square ones) and is deeply related to the eigenvalues of $A^TA$ and $AA^T$. It's fundamental in data science.
5.  **Quadratic Forms:** Eigenvalues help in understanding and simplifying quadratic forms, which are important in optimization and geometry (e.g., classifying conic sections or quadric surfaces).
6.  **Spectral Theorem:** This powerful theorem states that symmetric matrices (or more generally, Hermitian matrices) can always be diagonalized by an orthogonal (or unitary) matrix, and their eigenvalues are always real.
7.  **Markov Chains:** In probability theory, eigenvalues and eigenvectors are used to find the steady-state distribution of Markov chains, representing long-term probabilities in systems that transition between states.
8.  **Principal Component Analysis (PCA):** As mentioned, PCA relies directly on finding the eigenvectors of the covariance matrix to identify directions of maximum variance in data.
9.  **Quantum Mechanics:** Beyond energy levels, eigenvalues of other operators (like momentum, angular momentum) determine the measurable values of physical quantities, and their corresponding eigenvectors are the states of the system.

## 11. Self-check questions

1.  Find the eigenvalues and a basis for each eigenspace of the matrix $M = \begin{pmatrix} 5 & -2 \\ 4 & -1 \end{pmatrix}$.
2.  Consider the matrix $R = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$, which represents a rotation by angle $\theta$. For what values of $\theta$ (in the interval $[0, 2\pi)$) does $R$ have real eigenvalues? Find these real eigenvalues and their corresponding eigenvectors.
3.  Given the matrix $A = \begin{pmatrix} 3 & 0 & 0 \\ 0 & 1 & 2 \\ 0 & 2 & 1 \end{pmatrix}$. Find all eigenvalues and a basis for each eigenspace.
4.  A $3 \times 3$ matrix $B$ has the characteristic polynomial $p(\lambda) = -\lambda^3 + 6\lambda^2 - 11\lambda + 6$. Find the eigenvalues of $B$. (Hint: Try integer roots that divide the constant term).
5.  Prove that if $\lambda$ is an eigenvalue of an invertible matrix $A$, then $1/\lambda$ is an eigenvalue of $A^{-1}$. (Assume $\lambda \ne 0$).