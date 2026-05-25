## 1. What it is — in plain English

Imagine you have a bunch of straight lines or flat surfaces (like planes) that all interact with each other. Linear algebra is the part of math that helps us understand and work with these lines and planes, especially when they're represented by numbers in grids called "matrices" and lists called "vectors." It's like having a special toolkit to manipulate and analyze these geometric objects.

NumPy's `linalg` module is Python's version of this toolkit. It gives us powerful functions to perform common linear algebra tasks very efficiently. Instead of doing calculations by hand, which can be tedious and error-prone, `linalg` does the heavy lifting for us.

Specifically, we'll look at a few key tools:
- `np.linalg.solve`: This helps us find the "meeting point" or solution when several lines or planes cross each other.
- `np.linalg.eig`: This finds special directions and scaling factors within a transformation, like finding the natural axes of a stretched object.
- `np.linalg.svd`: This is a way to break down any complex transformation into three simpler, more understandable steps: a rotation, a scaling, and another rotation.
- `np.linalg.norm`: This measures the "size" or "length" of a vector or the "magnitude" of a matrix.
- `np.linalg.det`: This gives us a single number that tells us how much a transformation stretches or shrinks space, and if it flips things around.

Think of it this way: if you're building with LEGOs, linear algebra is the instruction manual, and `np.linalg` are the specialized tools (like a brick separator or a specific mold) that make complex constructions possible and efficient.

## 2. Why it matters — real-world applications

Linear algebra is the backbone of modern science, engineering, and technology. Its applications are ubiquitous and often invisible to the casual observer, yet fundamental to how many systems operate.

1.  **Machine Learning and Artificial Intelligence:**
    *   **Company/Product:** Google Photos, Netflix recommendation engine, self-driving cars.
    *   **Application:** Principal Component Analysis (PCA), a widely used dimensionality reduction technique, relies heavily on **Eigenvalue Decomposition (`eig`)** and **Singular Value Decomposition (`svd`)**. It helps find the most important features in vast datasets, like identifying distinct patterns in images or customer preferences for movie recommendations. Linear Regression, a foundational ML algorithm, involves solving systems of linear equations (**`solve`**) to find the best-fit line or plane through data points. Deep learning models, like those powering facial recognition, perform billions of matrix multiplications, and understanding the "size" of these matrices or vectors (**`norm`**) is crucial for optimization and regularization.

2.  **Computer Graphics and Vision:**
    *   **Company/Product:** Pixar Animation Studios (for movie rendering), CAD software (e.g., AutoCAD), medical imaging (MRI, CT scans).
    *   **Application:** Every 3D object on your screen is represented by vertices and matrices. Transformations like rotations, scaling, and translations are performed using matrix multiplication. **`det`** can tell if a transformation would invert an object (e.g., flipping it inside out), which is important for rendering. In computer vision, object recognition and tracking often involve solving large systems of equations to determine object poses or camera positions (**`solve`**), and **`svd`** is used for tasks like image compression and noise reduction.

3.  **Physics, Engineering, and Simulation:**
    *   **Company/Product:** Boeing (aircraft design), NASA (spacecraft trajectory), Weather forecasting models.
    *   **Application:** Simulating complex physical systems, from fluid dynamics around an airplane wing to the stress on a bridge, involves discretizing space and time into grids, leading to enormous systems of linear equations that must be solved (**`solve`**). In quantum mechanics, the energy levels of atoms are found by solving eigenvalue problems (**`eig`**). Structural engineers use **`norm`** to measure the magnitude of forces and stresses. The **`det`** of a matrix can indicate whether a system of equations has a unique solution, which is critical for stability analysis in engineering.

4.  **Signal Processing and Data Compression:**
    *   **Company/Product:** MP3 audio files, JPEG images, cellular communication networks.
    *   **Application:** Data compression algorithms like JPEG and MPEG rely heavily on **`svd`**. SVD can decompose a signal or image into its most significant components (represented by singular values), allowing less important components to be discarded without significant loss of quality, thereby reducing file size. Noise reduction in audio or medical signals also uses SVD to separate signal from noise components.

## 3. Prerequisites — what you must know first

To fully grasp the power and utility of NumPy's `linalg` module, a solid foundation in both Python programming and core linear algebra concepts is essential. You should be comfortable with:

*   **Basic Python Programming:**
    *   **Variables and Data Types:** Understanding integers, floats, and how to store data.
    *   **Lists and Tuples:** How to create, access, and manipulate ordered collections of items.
    *   **Functions:** Defining and calling functions, passing arguments.
    *   **Basic Control Flow:** `if/else` statements, `for` and `while` loops.
    *   **Modules and Imports:** How to import libraries like `numpy`.

*   **NumPy Fundamentals:**
    *   **NumPy Arrays (`ndarray`):** Creating 1D, 2D (matrices), and higher-dimensional arrays.
    *   **Array Indexing and Slicing:** Accessing specific elements or sub-arrays.
    *   **Basic Array Operations:** Element-wise addition, subtraction, multiplication, division.
    *   **Broadcasting:** How NumPy handles operations on arrays of different shapes.
    *   **Dot Product and Matrix Multiplication:** Understanding `np.dot()` or `@` operator for matrix multiplication.

*   **Core Linear Algebra Concepts:**
    *   **Vectors:** A list of numbers representing a point in space or a direction.
    *   **Matrices:** A rectangular grid of numbers, often representing transformations or systems of equations.
    *   **Matrix Dimensions:** Understanding rows and columns (e.g., $m \times n$ matrix).
    *   **Matrix Addition/Subtraction:** Element-wise operations.
    *   **Scalar Multiplication:** Multiplying a matrix or vector by a single number.
    *   **Matrix Multiplication:** The specific rules for multiplying two matrices (row-column product).
    *   **Identity Matrix ($I$):** A square matrix with ones on the diagonal and zeros elsewhere, acting like the number 1 in multiplication.
    *   **Inverse Matrix ($A^{-1}$):** A matrix that, when multiplied by $A$, yields the identity matrix ($AA^{-1} = I$). Not all matrices have an inverse.
    *   **Systems of Linear Equations:** A set of equations with multiple variables (e.g., $2x + 3y = 7$, $x - y = 1$).
    *   **Determinant:** A scalar value derived from a square matrix, indicating properties like volume scaling and invertibility.
    *   **Eigenvalues and Eigenvectors:** Special vectors that are only scaled (not rotated) by a linear transformation, and the scalar factors by which they are scaled.
    *   **Singular Value Decomposition (SVD):** A factorization of a matrix into three specific matrices, revealing important properties.
    *   **Vector Norms:** A measure of the "length" or "magnitude" of a vector.
    *   **Matrix Norms:** A measure of the "size" or "magnitude" of a matrix.

If any of these linear algebra concepts sound unfamiliar, it's highly recommended to pause and review them using a good textbook or online resource before proceeding.

## 4. The core idea — step by step

Let's break down each of these powerful `np.linalg` functions, building intuition step by step.

### Step 1: `np.linalg.solve` - Solving Systems of Linear Equations

**Plain-English Statement:** Imagine you have a puzzle with several unknown numbers, and you're given a set of clues (equations) that link these numbers. `np.linalg.solve` is like a super-smart detective that figures out what those unknown numbers are, given all the clues. It finds the unique values for the variables that satisfy all the equations simultaneously.

**Small Concrete Example:**
Suppose you have two numbers, $x$ and $y$.
Clue 1: "Twice $x$ plus $y$ equals 7." ($2x + y = 7$)
Clue 2: "Three times $x$ minus $y$ equals 3." ($3x - y = 3$)
We want to find $x$ and $y$.

**Formal/Mathematical Version:**
A system of linear equations can be written in matrix form as:
$$A\mathbf{x} = \mathbf{b}$$
Where:
*   $A$ is the **coefficient matrix**, containing the numbers multiplying our unknowns.
*   $\mathbf{x}$ is the **vector of unknowns**, containing the variables we want to find (e.g., $\begin{pmatrix} x \\ y \end{pmatrix}$).
*   $\mathbf{b}$ is the **constant vector**, containing the numbers on the right side of the equals sign.

For our example:
$$A = \begin{pmatrix} 2 & 1 \\ 3 & -1 \end{pmatrix}, \quad \mathbf{x} = \begin{pmatrix} x \\ y \end{pmatrix}, \quad \mathbf{b} = \begin{pmatrix} 7 \\ 3 \end{pmatrix}$$
The solution $\mathbf{x}$ can theoretically be found by multiplying $\mathbf{b}$ by the inverse of $A$: $\mathbf{x} = A^{-1}\mathbf{b}$. However, `np.linalg.solve` uses more numerically stable and efficient methods (like Gaussian elimination or LU decomposition) rather than directly computing the inverse, especially for large systems.

**What Could Go Wrong:**
*   **Singular Matrix:** If the coefficient matrix $A$ is "singular" (meaning its determinant is zero, $\det(A)=0$), there is no unique solution. This means either there are infinitely many solutions (the lines/planes overlap) or no solutions at all (the lines/planes are parallel and never meet). `np.linalg.solve` will raise a `LinAlgError` in this case.
*   **Ill-conditioned Matrix:** Even if a matrix isn't strictly singular, if it's "ill-conditioned" (its determinant is very close to zero), small changes in $\mathbf{b}$ can lead to large changes in $\mathbf{x}$, making the solution numerically unstable and inaccurate.

---

### Step 2: `np.linalg.det` - The Determinant

**Plain-English Statement:** Imagine you have a rubber sheet, and you draw a square on it. Then you stretch, shrink, or even flip the sheet. The determinant is a single number that tells you how much the *area* of that square changed. If the area became zero, it means the square got squashed flat into a line or a point. If the area became negative, it means you flipped the sheet over. For 3D, it's about how much the *volume* changes.

**Small Concrete Example:**
Consider a transformation represented by the matrix $A = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}$. This matrix stretches things by a factor of 2 in the x-direction and 3 in the y-direction.
The determinant should tell us the overall scaling factor.

**Formal/Mathematical Version:**
For a $2 \times 2$ matrix $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$, the determinant is given by:
$$\det(A) = ad - bc$$
For our example: $\det(A) = (2)(3) - (0)(0) = 6$. This means the area is scaled by a factor of 6.

For a $3 \times 3$ matrix $A = \begin{pmatrix} a & b & c \\ d & e & f \\ g & h & i \end{pmatrix}$, the determinant is:
$$\det(A) = a(ei - fh) - b(di - fg) + c(dh - eg)$$
More generally, for an $n \times n$ matrix, the determinant can be calculated using cofactor expansion, but this is computationally expensive. NumPy uses more efficient algorithms like LU decomposition.

**What Could Go Wrong:**
*   **Computational Cost:** Calculating the determinant for very large matrices can be computationally intensive.
*   **Numerical Precision:** For very large or very small determinants, floating-point precision issues can arise, leading to inaccuracies. A determinant that is mathematically zero might be computed as a tiny non-zero number due to precision limits.

---

### Step 3: `np.linalg.norm` - Measuring Size

**Plain-English Statement:** How long is that vector? How "big" is that matrix? The norm gives us a single positive number to answer these questions. For a vector, it's usually its length in space (like using the Pythagorean theorem). For a matrix, it's a bit more abstract, representing its "magnitude" or "strength" as a transformation.

**Small Concrete Example:**
Consider a vector $\mathbf{v} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$. If you plot this vector from the origin $(0,0)$ to the point $(3,4)$, its length can be found using the Pythagorean theorem.

**Formal/Mathematical Version:**
The most common vector norm is the **Euclidean norm** (or $L_2$ norm):
$$||\mathbf{v}||_2 = \sqrt{\sum_{i=1}^n |v_i|^2} = \sqrt{v_1^2 + v_2^2 + \dots + v_n^2}$$
For our example: $||\mathbf{v}||_2 = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$.

Other common vector norms include:
*   $L_1$ norm (Manhattan norm): $||\mathbf{v}||_1 = \sum_{i=1}^n |v_i|$ (sum of absolute values).
*   $L_\infty$ norm (Max norm): $||\mathbf{v}||_\infty = \max_i |v_i|$ (largest absolute value).
NumPy's `np.linalg.norm` function can compute various norms by specifying the `ord` parameter.

For matrices, there are also various norms (Frobenius norm, spectral norm, etc.), each with different interpretations. The **Frobenius norm** is like the Euclidean norm for matrices:
$$||A||_F = \sqrt{\sum_{i=1}^m \sum_{j=1}^n |a_{ij}|^2}$$

**What Could Go Wrong:**
*   **Choosing the Wrong Norm:** Different norms emphasize different aspects of magnitude. Using an $L_1$ norm when an $L_2$ norm is appropriate (or vice-versa) can lead to incorrect conclusions, especially in optimization or machine learning contexts.
*   **Computational Cost:** For very large matrices or vectors, computing some norms can be slow, though NumPy is highly optimized.

---

### Step 4: `np.linalg.eig` - Eigenvalues and Eigenvectors

**Plain-English Statement:** Imagine you have a stretchy fabric (your matrix transformation). If you stretch it, most points will move in new directions. But there might be some special lines or directions on the fabric that, when stretched, only get longer or shorter *along their original direction*, without twisting or turning. These special directions are the **eigenvectors**, and the factor by which they get stretched or shrunk is the **eigenvalue**. They reveal the fundamental "modes" of transformation.

**Small Concrete Example:**
Consider a matrix $A = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}$. This matrix stretches the x-axis by a factor of 2 and the y-axis by a factor of 3.
The vector $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ (pointing along the x-axis) will become $\begin{pmatrix} 2 \\ 0 \end{pmatrix}$ after transformation. It just got scaled by 2. So, $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ is an eigenvector with eigenvalue 2.
Similarly, $\begin{pmatrix} 0 \\ 1 \end{pmatrix}$ (pointing along the y-axis) will become $\begin{pmatrix} 0 \\ 3 \end{pmatrix}$. It got scaled by 3. So, $\begin{pmatrix} 0 \\ 1 \end{pmatrix}$ is an eigenvector with eigenvalue 3.

**Formal/Mathematical Version:**
For a square matrix $A$, an eigenvector $\mathbf{v}$ and its corresponding eigenvalue $\lambda$ satisfy the equation:
$$A\mathbf{v} = \lambda\mathbf{v}$$
where $\mathbf{v}$ is a non-zero vector. This equation means that when $A$ transforms $\mathbf{v}$, the result is simply a scaled version of $\mathbf{v}$ itself.
To find eigenvalues, we rearrange the equation:
$$A\mathbf{v} - \lambda\mathbf{v} = \mathbf{0}$$
$$A\mathbf{v} - \lambda I\mathbf{v} = \mathbf{0}$$
$$(A - \lambda I)\mathbf{v} = \mathbf{0}$$
For a non-zero $\mathbf{v}$ to exist, the matrix $(A - \lambda I)$ must be singular, meaning its determinant must be zero:
$$\det(A - \lambda I) = 0$$
This is called the **characteristic equation**, and solving it gives us the eigenvalues $\lambda$. Once we have the eigenvalues, we can substitute them back into $(A - \lambda I)\mathbf{v} = \mathbf{0}$ to find the corresponding eigenvectors $\mathbf{v}$.

**What Could Go Wrong:**
*   **Complex Eigenvalues:** Not all real matrices have real eigenvalues. Some matrices might have complex eigenvalues and eigenvectors. `np.linalg.eig` handles this by returning complex numbers.
*   **Non-diagonalizable Matrices:** Some matrices do not have a full set of linearly independent eigenvectors. These are called defective or non-diagonalizable matrices. `np.linalg.eig` will still return eigenvalues and eigenvectors, but they might not form a basis.
*   **Order of Output:** NumPy's `eig` function returns eigenvalues and eigenvectors. The eigenvectors are returned as columns in a matrix, and their order corresponds to the order of the eigenvalues. It's crucial to keep this correspondence.

---

### Step 5: `np.linalg.svd` - Singular Value Decomposition

**Plain-English Statement:** SVD is like taking any complex, potentially messy transformation (represented by a matrix) and breaking it down into three very simple, clean steps. First, a pure rotation. Second, a pure stretching/scaling along specific axes. Third, another pure rotation. It's incredibly powerful because it works for *any* matrix, not just square ones, and it reveals the most important "directions" and "strengths" of the transformation.

**Small Concrete Example:**
Imagine you have a picture (which can be represented as a matrix of pixel values). SVD can decompose this picture matrix into components that represent the most important visual information. By keeping only a few of these components (those with large "singular values"), you can reconstruct a good approximation of the image with much less data (image compression).

**Formal/Mathematical Version:**
Any $m \times n$ matrix $A$ can be decomposed into three matrices:
$$A = U\Sigma V^T$$
Where:
*   $U$ is an $m \times m$ **orthogonal matrix** (its columns are orthonormal eigenvectors of $AA^T$). It represents a rotation or reflection.
*   $\Sigma$ (Sigma) is an $m \times n$ **diagonal matrix** containing the **singular values** on its diagonal. These singular values are non-negative and usually ordered from largest to smallest. They represent the scaling factors.
*   $V^T$ (V transpose) is an $n \times n$ **orthogonal matrix** (its rows are orthonormal eigenvectors of $A^TA$). It represents another rotation or reflection. ($V$ itself is $n \times n$ and orthogonal).

The singular values $\sigma_i$ are the square roots of the eigenvalues of $A^TA$ (and $AA^T$). They quantify the "strength" of the transformation along the principal directions.

**What Could Go Wrong:**
*   **Computational Intensity:** SVD can be computationally expensive for very large matrices, though highly optimized algorithms exist (and are used by NumPy).
*   **Interpretation:** While mathematically elegant, interpreting the specific meaning of $U$, $\Sigma$, and $V^T$ in a practical context can sometimes be challenging without a good grasp of the underlying theory.
*   **Rank Determination:** Small singular values might be numerically non-zero but effectively zero, leading to ambiguity in determining the true rank of a matrix.

---

## 5. Worked examples — multiple, with every step shown

Let's walk through several examples to solidify our understanding.

### Example 1: Solving a System of Linear Equations (`np.linalg.solve`)

**Problem:** Find the values of $x$ and $y$ that satisfy the following system of equations:
$$3x + 2y = 12$$
$$x - y = 1$$

**Given:** Two linear equations.
**Want:** The unique values for $x$ and $y$.

**Step 1: Convert to Matrix Form ($A\mathbf{x} = \mathbf{b}$)**
The coefficients of $x$ and $y$ form the matrix $A$, the variables form the vector $\mathbf{x}$, and the constants on the right side form the vector $\mathbf{b}$.

$$A = \begin{pmatrix} 3 & 2 \\ 1 & -1 \end{pmatrix}, \quad \mathbf{x} = \begin{pmatrix} x \\ y \end{pmatrix}, \quad \mathbf{b} = \begin{pmatrix} 12 \\ 1 \end{pmatrix}$$

**Step 2: Calculate the Determinant of A (to check for unique solution)**
We need to ensure that $\det(A) \neq 0$ for a unique solution to exist.
$$\det(A) = (3)(-1) - (2)(1)$$
$$\det(A) = -3 - 2$$
$$\det(A) = -5$$
Since $\det(A) = -5 \neq 0$, a unique solution exists. This is a good sanity check.

**Step 3: Solve for $\mathbf{x}$ using Matrix Inverse (Conceptual approach, not what `solve` does directly)**
Conceptually, $\mathbf{x} = A^{-1}\mathbf{b}$. First, let's find $A^{-1}$.
For a $2 \times 2$ matrix $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$, its inverse is $A^{-1} = \frac{1}{\det(A)} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.
$$A^{-1} = \frac{1}{-5} \begin{pmatrix} -1 & -2 \\ -1 & 3 \end{pmatrix}$$
$$A^{-1} = \begin{pmatrix} 1/5 & 2/5 \\ 1/5 & -3/5 \end{pmatrix}$$
Now, multiply $A^{-1}$ by $\mathbf{b}$:
$$\mathbf{x} = \begin{pmatrix} 1/5 & 2/5 \\ 1/5 & -3/5 \end{pmatrix} \begin{pmatrix} 12 \\ 1 \end{pmatrix}$$
$$\mathbf{x} = \begin{pmatrix} (1/5)(12) + (2/5)(1) \\ (1/5)(12) + (-3/5)(1) \end{pmatrix}$$
$$\mathbf{x} = \begin{pmatrix} 12/5 + 2/5 \\ 12/5 - 3/5 \end{pmatrix}$$
$$\mathbf{x} = \begin{pmatrix} 14/5 \\ 9/5 \end{pmatrix}$$
So, $x = 14/5 = 2.8$ and $y = 9/5 = 1.8$.

**Step 4: Solve using NumPy**

```python
import numpy as np

# Define the coefficient matrix A
A = np.array([[3, 2],
              [1, -1]])
# A is a 2x2 matrix representing the coefficients of x and y.

# Define the constant vector b
b = np.array([12, 1])
# b is a 1D array representing the constants on the right side of the equations.

# Use np.linalg.solve to find the solution vector x
x_solution = np.linalg.solve(A, b)
# This function efficiently solves the system A @ x_solution = b.
# It uses optimized numerical methods, not direct inverse calculation.

print("Solution vector x_solution:", x_solution)
# Print the resulting vector, which contains the values for x and y.
```

**Output:**
```
Solution vector x_solution: [2.8 1.8]
```

**Final Answer:**
The solution is $\mathbf{x} = \begin{pmatrix} 2.8 \\ 1.8 \end{pmatrix}$, meaning $x = 2.8$ and $y = 1.8$.

**Reflection:** This example was straightforward because the matrix was small and well-conditioned. The `np.linalg.solve` function abstracts away the complex numerical methods, providing a direct and robust solution. The manual calculation helped confirm the process.

---

### Example 2: Determinant, Norm, and Trace for a $3 \times 3$ Matrix (`np.linalg.det`, `np.linalg.norm`, `np.trace`)

**Problem:** Given the matrix $M = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}$, calculate its determinant, Frobenius norm, and trace.

**Given:** A $3 \times 3$ matrix $M$.
**Want:** $\det(M)$, $||M||_F$, and $\text{Tr}(M)$.

**Step 1: Calculate the Determinant of M**
For a $3 \times 3$ matrix $M = \begin{pmatrix} a & b & c \\ d & e & f \\ g & h & i \end{pmatrix}$, $\det(M) = a(ei - fh) - b(di - fg) + c(dh - eg)$.
Here, $a=1, b=2, c=3, d=4, e=5, f=6, g=7, h=8, i=9$.
$$\det(M) = 1((5)(9) - (6)(8)) - 2((4)(9) - (6)(7)) + 3((4)(8) - (5)(7))$$
$$\det(M) = 1(45 - 48) - 2(36 - 42) + 3(32 - 35)$$
$$\det(M) = 1(-3) - 2(-6) + 3(-3)$$
$$\det(M) = -3 + 12 - 9$$
$$\det(M) = 0$$
A determinant of 0 indicates that the matrix is singular, meaning its columns (and rows) are linearly dependent. This matrix cannot be inverted, and a system $M\mathbf{x} = \mathbf{b}$ would either have no solution or infinitely many solutions.

**Step 2: Calculate the Frobenius Norm of M**
The Frobenius norm is $||M||_F = \sqrt{\sum_{i=1}^m \sum_{j=1}^n |m_{ij}|^2}$.
$$||M||_F = \sqrt{1^2 + 2^2 + 3^2 + 4^2 + 5^2 + 6^2 + 7^2 + 8^2 + 9^2}$$
$$||M||_F = \sqrt{1 + 4 + 9 + 16 + 25 + 36 + 49 + 64 + 81}$$
$$||M||_F = \sqrt{285}$$
$$||M||_F \approx 16.8819$$

**Step 3: Calculate the Trace of M**
The trace of a square matrix is the sum of the elements on its main diagonal.
$$\text{Tr}(M) = m_{11} + m_{22} + m_{33}$$
$$\text{Tr}(M) = 1 + 5 + 9$$
$$\text{Tr}(M) = 15$$

**Step 4: Perform calculations using NumPy**

```python
import numpy as np

# Define the matrix M
M = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])
# M is a 3x3 matrix.

# Calculate the determinant of M
det_M = np.linalg.det(M)
# np.linalg.det computes the determinant using optimized algorithms.

# Calculate the Frobenius norm of M
norm_F_M = np.linalg.norm(M, ord='fro')
# np.linalg.norm computes various norms. 'fro' specifies the Frobenius norm.
# For matrices, default is 'fro'. For vectors, default is L2 norm.

# Calculate the trace of M
trace_M = np.trace(M)
# np.trace is a direct NumPy function, not part of linalg, but related to matrix properties.

print("Determinant of M:", det_M)
print("Frobenius Norm of M:", norm_F_M)
print("Trace of M:", trace_M)
```

**Output:**
```
Determinant of M: 0.0
Frobenius Norm of M: 16.881930708528994
Trace of M: 15
```

**Final Answer:**
The determinant of $M$ is $\mathbf{0}$.
The Frobenius norm of $M$ is approximately $\mathbf{16.88}$.
The trace of $M$ is $\mathbf{15}$.

**Reflection:** The determinant being 0 is a key finding, indicating linear dependence among rows/columns. NumPy's `det` function might return a very small number like `1.11e-16` instead of exact `0.0` due to floating-point precision, but for practical purposes, it signifies a singular matrix. `np.linalg.norm` and `np.trace` are straightforward applications.

---

### Example 3: Eigenvalues and Eigenvectors (`np.linalg.eig`)

**Problem:** Find the eigenvalues and corresponding eigenvectors for the matrix $A = \begin{pmatrix} 4 & -2 \\ 1 & 1 \end{pmatrix}$.

**Given:** A $2 \times 2$ matrix $A$.
**Want:** Eigenvalues $\lambda$ and eigenvectors $\mathbf{v}$ such that $A\mathbf{v} = \lambda\mathbf{v}$.

**Step 1: Set up the Characteristic Equation**
We need to solve $\det(A - \lambda I) = 0$.
$$A - \lambda I = \begin{pmatrix} 4 & -2 \\ 1 & 1 \end{pmatrix} - \lambda \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 4-\lambda & -2 \\ 1 & 1-\lambda \end{pmatrix}$$
Now, calculate the determinant of this new matrix:
$$\det(A - \lambda I) = (4-\lambda)(1-\lambda) - (-2)(1)$$
$$ = (4 - 4\lambda - \lambda + \lambda^2) + 2$$
$$ = \lambda^2 - 5\lambda + 4 + 2$$
$$ = \lambda^2 - 5\lambda + 6$$
Set the determinant to zero to find the eigenvalues:
$$\lambda^2 - 5\lambda + 6 = 0$$

**Step 2: Solve the Characteristic Equation for Eigenvalues ($\lambda$)**
This is a quadratic equation. We can factor it:
$$(\lambda - 2)(\lambda - 3) = 0$$
So, the eigenvalues are $\lambda_1 = 2$ and $\lambda_2 = 3$.

**Step 3: Find Eigenvectors for Each Eigenvalue**

**For $\lambda_1 = 2$:**
Substitute $\lambda = 2$ into $(A - \lambda I)\mathbf{v} = \mathbf{0}$:
$$\begin{pmatrix} 4-2 & -2 \\ 1 & 1-2 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} 2 & -2 \\ 1 & -1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
This gives us two identical equations (they are linearly dependent, as expected for eigenvectors):
$2v_1 - 2v_2 = 0 \Rightarrow v_1 = v_2$
$v_1 - v_2 = 0 \Rightarrow v_1 = v_2$
Let $v_2 = t$ (any non-zero scalar). Then $v_1 = t$.
A simple eigenvector (by setting $t=1$) is $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.

**For $\lambda_2 = 3$:**
Substitute $\lambda = 3$ into $(A - \lambda I)\mathbf{v} = \mathbf{0}$:
$$\begin{pmatrix} 4-3 & -2 \\ 1 & 1-3 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
$$\begin{pmatrix} 1 & -2 \\ 1 & -2 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
This gives us two identical equations:
$v_1 - 2v_2 = 0 \Rightarrow v_1 = 2v_2$
Let $v_2 = t$. Then $v_1 = 2t$.
A simple eigenvector (by setting $t=1$) is $\mathbf{v}_2 = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$.

**Step 4: Perform calculations using NumPy**

```python
import numpy as np

# Define the matrix A
A = np.array([[4, -2],
              [1,  1]])
# A is a 2x2 matrix.

# Use np.linalg.eig to find eigenvalues and eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(A)
# eigenvalues is a 1D array of the eigenvalues.
# eigenvectors is a 2D array where each column is an eigenvector,
# corresponding to the eigenvalue at the same index in the eigenvalues array.

print("Eigenvalues:", eigenvalues)
print("Eigenvectors (columns):")
print(eigenvectors)

# Verify the first eigenpair: A @ v1 = lambda1 * v1
lambda1 = eigenvalues[0]
v1 = eigenvectors[:, 0] # First column is the first eigenvector
print(f"\nVerification for lambda1={lambda1}:")
print("A @ v1:", A @ v1)
print("lambda1 * v1:", lambda1 * v1)

# Verify the second eigenpair: A @ v2 = lambda2 * v2
lambda2 = eigenvalues[1]
v2 = eigenvectors[:, 1] # Second column is the second eigenvector
print(f"\nVerification for lambda2={lambda2}:")
print("A @ v2:", A @ v2)
print("lambda2 * v2:", lambda2 * v2)
```

**Output:**
```
Eigenvalues: [3. 2.]
Eigenvectors (columns):
[[0.89442719 0.70710678]
 [0.4472136  0.70710678]]

Verification for lambda1=3.0:
A @ v1: [2.68328157 1.34164079]
lambda1 * v1: [2.68328157 1.34164079]

Verification for lambda2=2.0:
A @ v2: [1.41421356 1.41421356]
lambda2 * v2: [1.41421356 1.41421356]
```

**Final Answer:**
The eigenvalues are $\lambda_1 = \mathbf{3}$ and $\lambda_2 = \mathbf{2}$.
The corresponding eigenvectors (normalized by NumPy) are approximately:
For $\lambda_1 = 3$: $\mathbf{v}_1 \approx \begin{pmatrix} 0.8944 \\ 0.4472 \end{pmatrix}$ (which is a normalized version of $\begin{pmatrix} 2 \\ 1 \end{pmatrix}$)
For $\lambda_2 = 2$: $\mathbf{v}_2 \approx \begin{pmatrix} 0.7071 \\ 0.7071 \end{pmatrix}$ (which is a normalized version of $\begin{pmatrix} 1 \\ 1 \end{pmatrix}$)

**Reflection:** Note that NumPy's output order for eigenvalues might differ from manual calculation (it returned 3 then 2, while we found 2 then 3). More importantly, NumPy normalizes the eigenvectors (makes their $L_2$ norm equal to 1). So, our manually found $\begin{pmatrix} 2 \\ 1 \end{pmatrix}$ is equivalent to NumPy's $\begin{pmatrix} 0.8944 \\ 0.4472 \end{pmatrix}$ because $2/\sqrt{2^2+1^2} = 2/\sqrt{5} \approx 0.8944$ and $1/\sqrt{5} \approx 0.4472$. Similarly for the other eigenvector. The verification steps confirm that $A\mathbf{v} = \lambda\mathbf{v}$ holds true for the NumPy results.

---

### Example 4: Singular Value Decomposition (`np.linalg.svd`)

**Problem:** Perform Singular Value Decomposition on the matrix $B = \begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix}$.

**Given:** A $3 \times 2$ matrix $B$.
**Want:** Matrices $U$, $\Sigma$, and $V^T$ such that $B = U\Sigma V^T$.

**Step 1: Understand the Dimensions**
$B$ is $3 \times 2$.
$U$ will be $m \times m = 3 \times 3$.
$\Sigma$ will be $m \times n = 3 \times 2$ (diagonal with singular values).
$V^T$ will be $n \times n = 2 \times 2$.

**Step 2: Calculate $B^TB$**
This is needed to find $V$ and the singular values.
$$B^TB = \begin{pmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix} = \begin{pmatrix} (1)(1)+(0)(0)+(1)(1) & (1)(1)+(0)(1)+(1)(0) \\ (1)(1)+(1)(0)+(0)(1) & (1)(1)+(1)(1)+(0)(0) \end{pmatrix} = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$$

**Step 3: Find Eigenvalues and Eigenvectors of $B^TB$**
The eigenvalues of $B^TB$ are the squares of the singular values ($\sigma^2$). Its eigenvectors form the columns of $V$.
Characteristic equation for $B^TB$: $\det(B^TB - \lambda I) = 0$.
$$\det \begin{pmatrix} 2-\lambda & 1 \\ 1 & 2-\lambda \end{pmatrix} = (2-\lambda)^2 - 1 = 0$$
$$(2-\lambda)^2 = 1$$
$$2-\lambda = \pm 1$$
If $2-\lambda = 1 \Rightarrow \lambda_1 = 1$.
If $2-\lambda = -1 \Rightarrow \lambda_2 = 3$.
So, the eigenvalues of $B^TB$ are $3$ and $1$.
The singular values are $\sigma_1 = \sqrt{3}$ and $\sigma_2 = \sqrt{1} = 1$.
The diagonal matrix $\Sigma$ will have these values.

Now find eigenvectors for $B^TB$:
For $\lambda_1 = 3$:
$$\begin{pmatrix} 2-3 & 1 \\ 1 & 2-3 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} -1 & 1 \\ 1 & -1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
This gives $-v_1 + v_2 = 0 \Rightarrow v_1 = v_2$. Let $v_1=1$, then $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$. Normalized: $\frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$.

For $\lambda_2 = 1$:
$$\begin{pmatrix} 2-1 & 1 \\ 1 & 2-1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
This gives $v_1 + v_2 = 0 \Rightarrow v_1 = -v_2$. Let $v_1=1$, then $\mathbf{v}_2 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$. Normalized: $\frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix}$.

So, $V = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$ (columns are eigenvectors, ordered by decreasing singular value).
And $V^T = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$.

**Step 4: Construct $\Sigma$**
The singular values are $\sigma_1 = \sqrt{3}$ and $\sigma_2 = 1$. Since $B$ is $3 \times 2$, $\Sigma$ is $3 \times 2$.
$$\Sigma = \begin{pmatrix} \sqrt{3} & 0 \\ 0 & 1 \\ 0 & 0 \end{pmatrix}$$

**Step 5: Calculate $U$**
The columns of $U$ are the orthonormal eigenvectors of $BB^T$.
$$BB^T = \begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \end{pmatrix} = \begin{pmatrix} 2 & 1 & 1 \\ 1 & 1 & 0 \\ 1 & 0 & 1 \end{pmatrix}$$
Finding eigenvalues/eigenvectors for this $3 \times 3$ matrix is much more involved. The alternative is to use the relationship $B\mathbf{v}_i = \sigma_i \mathbf{u}_i$, so $\mathbf{u}_i = \frac{1}{\sigma_i} B\mathbf{v}_i$.

For $\mathbf{v}_1 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $\sigma_1 = \sqrt{3}$:
$$\mathbf{u}_1 = \frac{1}{\sqrt{3}} B \left( \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix} \right) = \frac{1}{\sqrt{6}} \begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \frac{1}{\sqrt{6}} \begin{pmatrix} 2 \\ 1 \\ 1 \end{pmatrix}$$
For $\mathbf{v}_2 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix}$ and $\sigma_2 = 1$:
$$\mathbf{u}_2 = \frac{1}{1} B \left( \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix} \right) = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 1 \\ -1 \end{pmatrix} = \frac{1}{\sqrt{2}} \begin{pmatrix} 0 \\ -1 \\ 1 \end{pmatrix}$$
For $\mathbf{u}_3$, we need a third orthogonal vector that spans the null space of $B^T$. This is the part that makes manual SVD very tedious for anything larger than $2 \times 2$. It can be found by ensuring orthogonality to $\mathbf{u}_1$ and $\mathbf{u}_2$.
If we had $BB^T \mathbf{u}_3 = \lambda_3 \mathbf{u}_3$ and $\lambda_3 = 0$, then $\mathbf{u}_3$ would be in the null space of $BB^T$.
For $BB^T = \begin{pmatrix} 2 & 1 & 1 \\ 1 & 1 & 0 \\ 1 & 0 & 1 \end{pmatrix}$, we could find its eigenvectors.
Eigenvalues of $BB^T$ are $3, 1, 0$. The eigenvector for eigenvalue $0$ is $\mathbf{u}_3 = \frac{1}{\sqrt{3}}\begin{pmatrix} -1 \\ 1 \\ 1 \end{pmatrix}$.

So, $U = \begin{pmatrix} 2/\sqrt{6} & 0/\sqrt{2} & -1/\sqrt{3} \\ 1/\sqrt{6} & -1/\sqrt{2} & 1/\sqrt{3} \\ 1/\sqrt{6} & 1/\sqrt{2} & 1/\sqrt{3} \end{pmatrix}$.

**Step 6: Perform calculations using NumPy**

```python
import numpy as np

# Define the matrix B
B = np.array([[1, 1],
              [0, 1],
              [1, 0]])
# B is a 3x2 matrix.

# Perform SVD
U, s, Vh = np.linalg.svd(B)
# U: Unitary matrix (m x m)
# s: 1D array of singular values (n, or min(m,n))
# Vh: Unitary matrix (n x n), which is V_transpose

print("U matrix:")
print(U)
print("\nSingular values (s):")
print(s)
print("\nVh matrix (V transpose):")
print(Vh)

# To get the full Sigma matrix, we need to manually construct it
Sigma = np.zeros((B.shape[0], B.shape[1])) # Sigma has same dimensions as B
Sigma[:B.shape[1], :B.shape[1]] = np.diag(s) # Place singular values on diagonal
print("\nFull Sigma matrix:")
print(Sigma)

# Verify the decomposition: B = U @ Sigma @ Vh
B_reconstructed = U @ Sigma @ Vh
print("\nReconstructed B matrix:")
print(B_reconstructed)
print("\nIs reconstructed B close to original B?", np.allclose(B, B_reconstructed))
```

**Output:**
```
U matrix:
[[-0.81649658  0.          0.57735027]
 [-0.40824829 -0.70710678 -0.57735027]
 [-0.40824829  0.70710678 -0.57735027]]

Singular values (s):
[1.73205081 1.        ]

Vh matrix (V transpose):
[[-0.70710678 -0.70710678]
 [-0.70710678  0.70710678]]

Full Sigma matrix:
[[1.73205081 0.        ]
 [0.         1.        ]
 [0.         0.        ]]

Reconstructed B matrix:
[[ 1.  1.]
 [ 0.  1.]
 [ 1.  0.]]

Is reconstructed B close to original B? True
```

**Final Answer:**
The SVD decomposition of $B$ is $B = U\Sigma V^T$ where:
$$U \approx \begin{pmatrix} -0.8165 & 0.0 & 0.5774 \\ -0.4082 & -0.7071 & -0.5774 \\ -0.4082 & 0.7071 & -0.5774 \end{pmatrix}$$
$$\Sigma = \begin{pmatrix} \mathbf{1.7321} & 0 \\ 0 & \mathbf{1.0} \\ 0 & 0 \end{pmatrix}$$
$$V^T \approx \begin{pmatrix} -0.7071 & -0.7071 \\ -0.7071 & 0.7071 \end{pmatrix}$$

**Reflection:** Manually performing SVD is extremely tedious and prone to error, especially for constructing the $U$ matrix beyond the first few columns. NumPy's `svd` function handles this complexity beautifully. Note that the signs of the columns in $U$ and $V$ (or rows in $V^T$) can be arbitrary, as long as $U\Sigma V^T$ reconstructs $B$. NumPy's singular values `s` are $\sqrt{3} \approx 1.73205$ and $1.0$, matching our manual calculation. The `np.diag(s)` is crucial for creating the $\Sigma$ matrix with the correct dimensions.

---

## 6. Common mistakes and traps

1.  **Dimension Mismatch Errors:** This is perhaps the most frequent error. For `np.linalg.solve(A, b)`, `A` must be a square matrix and its number of rows must match the length of `b`. For matrix multiplication or SVD, inner dimensions must match. NumPy will raise `ValueError: operands could not be broadcast together with shapes...` or `LinAlgError: Last 2 dimensions of the array must be square`.
    *   **Why it happens:** Students forget the rules of matrix algebra (e.g., cannot multiply a $3 \times 2$ matrix by a $3 \times 1$ vector).

2.  **Input Data Types and Shapes:** `np.linalg` functions expect NumPy arrays. Passing Python lists directly will often lead to errors or unexpected behavior. Also, `b` in `solve(A, b)` should be a 1D array or a 2D array with a single column, not a row vector.
    *   **Why it happens:** Not converting standard Python lists to `np.array()` before passing them to `linalg` functions.

3.  **Misinterpreting `np.linalg.eig` Output:**
    *   **Order:** The eigenvalues and eigenvectors are returned in two separate arrays, but their order corresponds. `eigenvectors[:, i]` is the eigenvector for `eigenvalues[i]`.
    *   **Normalization:** Eigenvectors are typically normalized (their $L_2$ norm is 1) by NumPy. This means they might not look exactly like the integer-valued eigenvectors you derive by hand, but they are scalar multiples of them.
    *   **Complex Values:** For non-symmetric matrices, eigenvalues and eigenvectors can be complex numbers, even if the input matrix is real.
    *   **Why it happens:** Assuming a specific order, not understanding normalization, or being surprised by complex numbers.

4.  **Numerical Stability with `np.linalg.solve` and `np.linalg.det`:**
    *   **Singular Matrices:** If `det(A)` is truly zero, `solve` will raise a `LinAlgError`.
    *   **Ill-conditioned Matrices:** If `det(A)` is very close to zero (e.g., `1e-18`), `solve` might still produce a solution, but it could be highly inaccurate due to numerical precision limits. `np.linalg.cond` can check a matrix's condition number.
    *   **Why it happens:** Expecting perfect mathematical precision from floating-point arithmetic or not understanding the implications of ill-conditioned systems.

5.  **Confusing `np.linalg.norm` with element-wise operations:** `np.linalg.norm` calculates a single scalar value representing magnitude. It's not for element-wise absolute values or squares. Also, forgetting to specify the `ord` parameter for different norms.
    *   **Why it happens:** Not understanding the mathematical definition of a norm or confusing it with simple array transformations.

6.  **Incorrectly Constructing $\Sigma$ from `np.linalg.svd` output:** `np.linalg.svd` returns singular values `s` as a 1D array. To reconstruct the original matrix $A = U\Sigma V^T$, you must manually create the diagonal matrix $\Sigma$ with the correct dimensions ($m \times n$, where $m, n$ are dimensions of $A$) and place the `s` values on its diagonal.
    *   **Why it happens:** Assuming `s` is already a 2D diagonal matrix or not handling the case where $m \ne n$.

## 7. Textbook-precise explanation

The NumPy `linalg` module provides highly optimized routines for fundamental linear algebra operations. We focus on `solve`, `det`, `norm`, `eig`, and `svd`.

1.  **`np.linalg.solve(a, b)`:**
    *   **Definition:** Computes the solution $\mathbf{x}$ to the linear system of equations $A\mathbf{x} = \mathbf{b}$, where $A$ is an $n \times n$ square matrix (the coefficient matrix) and $\mathbf{b}$ is an $n$-dimensional vector or an $n \times k$ matrix (the constant vector/matrix).
    *   **Methodology:** Typically employs direct methods such as LU decomposition or Cholesky decomposition (for symmetric positive-definite matrices) to solve the system efficiently and robustly, avoiding the explicit calculation of $A^{-1}$ which can be numerically unstable and computationally expensive for large matrices.
    *   **Condition for Solution:** A unique solution exists if and only if the matrix $A$ is non-singular (i.e., $\det(A) \neq 0$). If $A$ is singular, a `LinAlgError` is raised.
    *   **Reference:** "Linear Algebra and Its Applications" by David C. Lay, Chapter 2.3-2.4; "Numerical Linear Algebra" by Lloyd N. Trefethen and David Bau III, Lecture 20.

2.  **`np.linalg.det(a)`:**
    *   **Definition:** Calculates the determinant of a square matrix $A$. The determinant, denoted $\det(A)$ or $|A|$, is a scalar value that provides information about the matrix's properties, such as its invertibility and the volume scaling factor of the linear transformation it represents.
    *   **Methodology:** For small matrices, direct formulas are used. For larger matrices, it typically involves computing an LU decomposition of $A$, where $A=LU$. Then $\det(A) = \det(L)\det(U)$. Since $L$ and $U$ are triangular matrices, their determinants are the product of their diagonal entries.
    *   **Properties:**
        *   $A$ is invertible if and only if $\det(A) \neq 0$.
        *   $|\det(A)|$ represents the scaling factor of volume (or area in 2D) under the transformation $A$.
        *   If $\det(A) < 0$, the transformation involves a reflection (orientation reversal).
    *   **Reference:** "Linear Algebra Done Right" by Sheldon Axler, Chapter 5; "Matrix Computations" by Gene H. Golub and Charles F. Van Loan, Chapter 3.

3.  **`np.linalg.norm(x, ord=None, axis=None, keepdims=False)`:**
    *   **Definition:** Computes a vector or matrix norm. A norm is a function that assigns a strictly positive "length" or "size" to each vector or matrix in a vector space, with specific properties (non-negativity, definiteness, homogeneity, triangle inequality).
    *   **Common Vector Norms (for $\mathbf{x} = (x_1, \dots, x_n)$):**
        *   $L_2$ (Euclidean) norm (`ord=2` or `ord=None` for vectors): $||\mathbf{x}||_2 = \sqrt{\sum_{i=1}^n |x_i|^2}$.
        *   $L_1$ (Manhattan) norm (`ord=1`): $||\mathbf{x}||_1 = \sum_{i=1}^n |x_i|$.
        *   $L_\infty$ (Max) norm (`ord=np.inf`): $||\mathbf{x}||_\infty = \max_i |x_i|$.
    *   **Common Matrix Norms (for $A = (a_{ij})$):**
        *   Frobenius norm (`ord='fro'`): $||A||_F = \sqrt{\sum_{i=1}^m \sum_{j=1}^n |a_{ij}|^2}$.
        *   Spectral norm (`ord=2`): $||A||_2 = \sigma_{\max}(A)$, the largest singular value of $A$.
        *   $L_1$ norm (`ord=1`): $||A||_1 = \max_j \sum_{i=1}^m |a_{ij}|$ (maximum absolute column sum).
        *   $L_\infty$ norm (`ord=np.inf`): $||A||_\infty = \max_i \sum_{j=1}^n |a_{ij}|$ (maximum absolute row sum).
    *   **Reference:** "Introduction to Linear Algebra" by Gilbert Strang, Chapter 7; "Numerical Linear Algebra" by Lloyd N. Trefethen and David Bau III, Lecture 3.

4.  **`np.linalg.eig(a)`:**
    *   **Definition:** Computes the eigenvalues and right eigenvectors of a square matrix $A$. An eigenvector $\mathbf{v}$ of $A$ is a non-zero vector such that when $A$ is multiplied by $\mathbf{v}$, the result is a scalar multiple of $\mathbf{v}$. The scalar $\lambda$ is called the eigenvalue corresponding to $\mathbf{v}$. Mathematically, $A\mathbf{v} = \lambda\mathbf{v}$.
    *   **Methodology:** The eigenvalues are found by solving the characteristic equation $\det(A - \lambda I) = 0$. Once eigenvalues are known, eigenvectors are found by solving $(A - \lambda I)\mathbf{v} = \mathbf{0}$. For numerical computation, iterative algorithms like the QR algorithm are commonly used.
    *   **Output:** Returns two arrays: the first contains the eigenvalues (which can be complex), and the second contains the corresponding eigenvectors as columns. Eigenvectors are normalized to unit length.
    *   **Reference:** "Linear Algebra and Its Applications" by David C. Lay, Chapter 5; "Matrix Computations" by Gene H. Golub and Charles F. Van Loan, Chapter 7.

5.  **`np.linalg.svd(a, full_matrices=True, compute_uv=True, hermitian=False)`:**
    *   **Definition:** Computes the Singular Value Decomposition (SVD) of an $m \times n$ matrix $A$. SVD factorizes $A$ into the product of three matrices: $A = U\Sigma V^T$.
        *   $U$: An $m \times m$ orthogonal matrix whose columns are the left singular vectors (eigenvectors of $AA^T$).
        *   $\Sigma$: An $m \times n$ diagonal matrix containing the singular values $\sigma_i$ on its main diagonal, ordered non-increasingly. The singular values are the square roots of the non-negative eigenvalues of $A^TA$ (or $AA^T$).
        *   $V^T$: An $n \times n$ orthogonal matrix (the transpose of $V$) whose rows are the right singular vectors (eigenvectors of $A^TA$).
    *   **Methodology:** Typically uses iterative algorithms like the Golub-Kahan bidiagonalization and QR iteration.
    *   **Properties:**
        *   SVD exists for *any* matrix (square or rectangular, real or complex).
        *   The singular values quantify the "strength" of the linear transformation along the principal directions defined by the singular vectors.
        *   It is fundamental for dimensionality reduction (e.g., PCA), pseudo-inverse calculation, and low-rank approximations.
    *   **Reference:** "Linear Algebra and Its Applications" by David C. Lay, Chapter 7.4; "Numerical Linear Algebra" by Lloyd N. Trefethen and David Bau III, Lecture 4.

## 8. ASCII diagrams

Here are a few conceptual ASCII diagrams to aid understanding.

```text
1. Vector Norm (Euclidean / L2)

  ^ y-axis
  |
4 + . P(3,4)
  |   /|
  |  / |
  | /  |
  |/   |
0 +-----> x-axis
  0    3

  Vector v = (3, 4)
  Length (Euclidean Norm) ||v||_2 = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5
  This is the straight-line distance from the origin to P.

--------------------------------------------------------------------------------

2. Eigenvectors and Eigenvalues (Conceptual)

Imagine a square grid of points.
Original grid:
  +---+---+---+
  | . | . | . |
  +---+---+---+
  | . | . | . |
  +---+---+---+
  | . | . | . |
  +---+---+---+

Apply a transformation (matrix A) that stretches the grid.
Some vectors (eigenvectors) will only change in length (scaled by eigenvalue),
  but not direction. Other vectors will change both length and direction.

Example: A = [[2, 0], [0, 0.5]] (stretches x by 2, shrinks y by 0.5)

  ^ y-axis
  |
  |  v2 (eigenvector)
  |  ^
  |  |
  +--+-----> x-axis
     |
     |
     v

  After transformation:
  ^ y-axis
  |
  |
  |  v2' (scaled eigenvector)
  |  ^
  |  |
  +--+-----------> x-axis
     |
     |
     v1' (scaled eigenvector)

  - Eigenvector 1 (v1): (1, 0)