## 1. What it is — in plain English

Imagine you have a special kind of grid of numbers, called a "matrix." For some of these grids (specifically, square ones, meaning they have the same number of rows and columns), we can calculate a single, unique number. This number is called the **determinant**.

Think of the determinant as a kind of "score" or "summary number" for that matrix. It's not just any random number; it tells us something very important about the matrix's behavior. For example, if you think of a matrix as a set of instructions for moving points around in space, the determinant tells you how much that movement stretches or shrinks the space, and whether it flips it over.

The "properties of determinants" are simply the rules or shortcuts that tell us how this special "score" changes if we do certain things to the matrix, like swapping rows, multiplying a row by a number, or combining two matrices. Understanding these rules makes calculating determinants much faster and helps us understand their deeper meaning without having to re-calculate everything from scratch every time.

## 2. Why it matters — real-world applications

The properties of determinants are not just theoretical curiosities; they are fundamental tools with wide-ranging applications across science, engineering, and technology.

1.  **Aerospace Engineering (Stability Analysis):** In designing aircraft or spacecraft, engineers use matrices to model the system's dynamics. The *eigenvalues* of these matrices (which are found by solving an equation involving a determinant: $\det(A - \lambda I) = 0$) determine the stability of the system. For example, if an aircraft control system has eigenvalues with positive real parts, it indicates instability. Understanding how determinants behave under various matrix operations helps in quickly assessing and manipulating these stability conditions during design and testing.
2.  **Machine Learning and Artificial Intelligence (Invertibility and PCA):** Many machine learning algorithms, such as linear regression or support vector machines, involve solving systems of linear equations or finding inverses of matrices. A matrix is invertible if and only if its determinant is non-zero. The properties of determinants allow algorithms to efficiently check for invertibility without full computation. Furthermore, in Principal Component Analysis (PCA), a technique for dimensionality reduction, eigenvalues and eigenvectors (again, found using determinants) are crucial for identifying the most significant features in data.
3.  **Physics (Quantum Mechanics and Transformations):** In quantum mechanics, determinants appear in the characteristic equation for finding energy levels of a system. They are also fundamental in understanding how linear transformations (represented by matrices) affect space. For instance, the determinant of a transformation matrix tells you how much the area (in 2D) or volume (in 3D) of an object changes after the transformation. If the determinant is negative, it means the orientation of the space has been flipped, which is critical in understanding phenomena like reflections.
4.  **Computer Graphics (Scaling and Orientation):** When rendering 3D graphics, matrices are used to perform transformations like scaling, rotation, and translation. The determinant of these transformation matrices provides quick insights. A determinant of 1 means the transformation preserves volume; a negative determinant indicates a reflection (e.g., mirroring an object), which is important for correct rendering and collision detection. The properties allow for efficient manipulation of these transformations.

## 3. Prerequisites — what you must know first

Before diving into the properties of determinants, ensure you have a solid grasp of the following concepts:

*   **Matrices:** What they are (rectangular arrays of numbers), their notation, and basic terminology (rows, columns, elements, square matrix, identity matrix, zero matrix).
*   **Matrix Operations:** How to perform matrix addition, scalar multiplication (multiplying a matrix by a single number), and matrix multiplication.
*   **Determinant of a 2x2 Matrix:** How to calculate $\det \begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc$.
*   **Determinant of a 3x3 Matrix (Cofactor Expansion):** How to calculate the determinant of a $3 \times 3$ matrix using cofactor expansion along a row or column.
*   **Elementary Row Operations:** The three types of row operations: swapping two rows, multiplying a row by a non-zero scalar, and adding a multiple of one row to another row. (These are crucial because the properties directly relate to how these operations affect the determinant.)
*   **Transpose of a Matrix:** How to find $A^T$ by swapping rows and columns of matrix $A$.
*   **Inverse of a Matrix:** The concept of $A^{-1}$ such that $AA^{-1} = A^{-1}A = I$, and the condition for a matrix to be invertible.
*   **Basic Algebra:** Proficiency in arithmetic, solving simple equations, and manipulating algebraic expressions.

## 4. The core idea — step by step

The core idea behind the properties of determinants is that certain operations on a matrix affect its determinant in predictable ways. These rules allow us to simplify calculations and gain deeper insights into the matrix's nature.

### Step 1: Row/Column Swap Property

*   **Plain English Statement:** If you take a matrix and simply swap any two of its rows (or any two of its columns), the new determinant will be the negative of the original determinant. It flips the sign.
*   **Concrete Example:**
    Let $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$.
    $\det(A) = (1)(4) - (2)(3) = 4 - 6 = -2$.
    Now, let's swap $R_1$ and $R_2$ to get $B = \begin{pmatrix} 3 & 4 \\ 1 & 2 \end{pmatrix}$.
    $\det(B) = (3)(2) - (4)(1) = 6 - 4 = 2$.
    Notice that $\det(B) = -\det(A)$.
*   **Formal/Mathematical Version:**
    If a matrix $B$ is obtained from a square matrix $A$ by interchanging two rows or two columns, then
    $$ \det(B) = -\det(A) $$
*   **What Could Go Wrong:** Forgetting to change the sign of the determinant after a row or column swap. This is a very common oversight.

### Step 2: Scalar Multiplication of a Row/Column Property

*   **Plain English Statement:** If you multiply all the entries in just *one* row (or just *one* column) of a matrix by a scalar (a single number), the determinant of the new matrix will be that scalar multiplied by the original determinant.
*   **Concrete Example:**
    Let $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$.
    $\det(A) = -2$.
    Now, let's multiply $R_1$ by $k=5$ to get $B = \begin{pmatrix} 5 \cdot 1 & 5 \cdot 2 \\ 3 & 4 \end{pmatrix} = \begin{pmatrix} 5 & 10 \\ 3 & 4 \end{pmatrix}$.
    $\det(B) = (5)(4) - (10)(3) = 20 - 30 = -10$.
    Notice that $\det(B) = 5 \cdot \det(A) = 5 \cdot (-2) = -10$.
*   **Formal/Mathematical Version:**
    If a matrix $B$ is obtained from a square matrix $A$ by multiplying one row or one column by a scalar $k$, then
    $$ \det(B) = k \det(A) $$
    **Important Note:** If you multiply the *entire matrix* $A$ by a scalar $k$ (i.e., $kA$), then every row is multiplied by $k$. If $A$ is an $n \times n$ matrix, then $kA$ means $n$ rows are each multiplied by $k$. So, $\det(kA) = k^n \det(A)$.
*   **What Could Go Wrong:** Confusing multiplying a *single row/column* by $k$ with multiplying the *entire matrix* by $k$. For an $n \times n$ matrix, multiplying a single row by $k$ changes the determinant by a factor of $k$, but multiplying the entire matrix by $k$ changes the determinant by a factor of $k^n$.

### Step 3: Row/Column Addition Property (Adding a Multiple of One Row/Column to Another)

*   **Plain English Statement:** If you perform the elementary row operation of adding a multiple of one row to another row (or a multiple of one column to another column), the determinant of the matrix does **not** change. It stays exactly the same.
*   **Concrete Example:**
    Let $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$.
    $\det(A) = -2$.
    Now, let's perform $R_2 \to R_2 + 2R_1$ to get $B = \begin{pmatrix} 1 & 2 \\ 3 + 2(1) & 4 + 2(2) \end{pmatrix} = \begin{pmatrix} 1 & 2 \\ 5 & 8 \end{pmatrix}$.
    $\det(B) = (1)(8) - (2)(5) = 8 - 10 = -2$.
    Notice that $\det(B) = \det(A)$.
*   **Formal/Mathematical Version:**
    If a matrix $B$ is obtained from a square matrix $A$ by adding a multiple of one row to another row, or a multiple of one column to another column, then
    $$ \det(B) = \det(A) $$
*   **What Could Go Wrong:** Incorrectly thinking this operation also changes the determinant, or confusing it with the scalar multiplication property. This property is incredibly useful for simplifying matrices to triangular form to easily calculate their determinant.

### Step 4: Zero Row/Column or Identical Rows/Columns Property

*   **Plain English Statement:** If a matrix has a row (or a column) where all the numbers are zero, its determinant is zero. Also, if a matrix has two identical rows (or two identical columns), its determinant is zero.
*   **Concrete Example:**
    Let $A = \begin{pmatrix} 1 & 2 \\ 0 & 0 \end{pmatrix}$.
    $\det(A) = (1)(0) - (2)(0) = 0 - 0 = 0$. (Zero row)
    Let $B = \begin{pmatrix} 1 & 2 \\ 1 & 2 \end{pmatrix}$.
    $\det(B) = (1)(2) - (2)(1) = 2 - 2 = 0$. (Identical rows)
*   **Formal/Mathematical Version:**
    If a square matrix $A$ has a row or a column consisting entirely of zeros, then $\det(A) = 0$.
    If a square matrix $A$ has two identical rows or two identical columns, then $\det(A) = 0$.
*   **What Could Go Wrong:** Overlooking these simple conditions and proceeding with lengthy determinant calculations when the answer is immediately obvious.

### Step 5: Determinant of a Product Property

*   **Plain English Statement:** If you multiply two square matrices together, the determinant of the resulting product matrix is simply the product of their individual determinants. You can calculate the determinants separately and then multiply those numbers.
*   **Concrete Example:**
    Let $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$ and $B = \begin{pmatrix} 2 & 1 \\ 0 & 3 \end{pmatrix}$.
    $\det(A) = (1)(4) - (2)(3) = -2$.
    $\det(B) = (2)(3) - (1)(0) = 6$.
    Now, calculate the product $AB$:
    $AB = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} \begin{pmatrix} 2 & 1 \\ 0 & 3 \end{pmatrix} = \begin{pmatrix} (1)(2)+(2)(0) & (1)(1)+(2)(3) \\ (3)(2)+(4)(0) & (3)(1)+(4)(3) \end{pmatrix} = \begin{pmatrix} 2 & 7 \\ 6 & 15 \end{pmatrix}$.
    $\det(AB) = (2)(15) - (7)(6) = 30 - 42 = -12$.
    Notice that $\det(A) \cdot \det(B) = (-2)(6) = -12$. So, $\det(AB) = \det(A)\det(B)$.
*   **Formal/Mathematical Version:**
    For any two square matrices $A$ and $B$ of the same size,
    $$ \det(AB) = \det(A)\det(B) $$
*   **What Could Go Wrong:** Assuming that $\det(A+B) = \det(A) + \det(B)$, which is generally **false**. Determinants do not distribute over matrix addition.

### Step 6: Determinant of the Transpose Property

*   **Plain English Statement:** If you take a matrix and swap its rows with its columns (this operation is called transposing the matrix), the determinant of the new matrix remains exactly the same as the original.
*   **Concrete Example:**
    Let $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$.
    $\det(A) = -2$.
    Now, find its transpose $A^T = \begin{pmatrix} 1 & 3 \\ 2 & 4 \end{pmatrix}$.
    $\det(A^T) = (1)(4) - (3)(2) = 4 - 6 = -2$.
    Notice that $\det(A^T) = \det(A)$.
*   **Formal/Mathematical Version:**
    For any square matrix $A$,
    $$ \det(A^T) = \det(A) $$
*   **What Could Go Wrong:** While this property simplifies things, don't assume other operations (like inverse) behave similarly without proof.

### Step 7: Determinant of an Inverse Property

*   **Plain English Statement:** If a matrix has an inverse (meaning it can be "undone" by another matrix), then the determinant of its inverse is simply the reciprocal (1 divided by) of the original matrix's determinant.
*   **Concrete Example:**
    Let $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$.
    $\det(A) = -2$.
    The inverse of $A$ is $A^{-1} = \frac{1}{\det(A)} \begin{pmatrix} 4 & -2 \\ -3 & 1 \end{pmatrix} = \frac{1}{-2} \begin{pmatrix} 4 & -2 \\ -3 & 1 \end{pmatrix} = \begin{pmatrix} -2 & 1 \\ 3/2 & -1/2 \end{pmatrix}$.
    $\det(A^{-1}) = (-2)(-1/2) - (1)(3/2) = 1 - 3/2 = -1/2$.
    Notice that $\det(A^{-1}) = \frac{1}{\det(A)} = \frac{1}{-2} = -1/2$.
*   **Formal/Mathematical Version:**
    If a square matrix $A$ is invertible, then
    $$ \det(A^{-1}) = \frac{1}{\det(A)} $$
*   **What Could Go Wrong:** This property only applies if $A$ is invertible, which means $\det(A)$ must be non-zero. If $\det(A) = 0$, then $A$ is not invertible, and $1/0$ is undefined.

### Step 8: Determinant of Triangular Matrices Property

*   **Plain English Statement:** For a special type of matrix called a "triangular matrix" (where all the numbers either above or below the main diagonal are zero), its determinant is incredibly easy to calculate: it's just the product of the numbers on its main diagonal. This also applies to diagonal matrices (where all non-diagonal entries are zero).
*   **Concrete Example:**
    Let $A = \begin{pmatrix} 1 & 2 & 3 \\ 0 & 4 & 5 \\ 0 & 0 & 6 \end{pmatrix}$ (Upper triangular matrix).
    $\det(A) = (1)(4)(6) = 24$.
    (You can verify this with cofactor expansion; it will simplify quickly.)
*   **Formal/Mathematical Version:**
    If $A$ is a triangular matrix (either upper triangular, lower triangular, or diagonal), then $\det(A)$ is the product of the entries on its main diagonal.
    If $A = (a_{ij})$ is triangular, then
    $$ \det(A) = a_{11} a_{22} \cdots a_{nn} $$
*   **What Could Go Wrong:** Forgetting this shortcut and performing lengthy cofactor expansions, or misidentifying a matrix as triangular when it isn't.

## 5. Worked examples — multiple, with every step shown

Here are several worked examples demonstrating the application of determinant properties.

### Example 1: Determinant of a Triangular Matrix

**Problem:** Find the determinant of the matrix $A$ using properties.
$$ A = \begin{pmatrix} 3 & 0 & 0 \\ 5 & -2 & 0 \\ 1 & 7 & 4 \end{pmatrix} $$

**Identify:**
*   **Given:** A $3 \times 3$ matrix $A$.
*   **Want:** $\det(A)$.

**Solution:**
1.  **Observe the matrix structure:**
    $$ A = \begin{pmatrix} 3 & 0 & 0 \\ 5 & -2 & 0 \\ 1 & 7 & 4 \end{pmatrix} $$
    We notice that all entries above the main diagonal are zero. This means $A$ is a **lower triangular matrix**.
2.  **Apply the Triangular Matrix Property:**
    The property states that for a triangular matrix, the determinant is the product of its diagonal entries. The diagonal entries are $3$, $-2$, and $4$.
    $$ \det(A) = (3) \times (-2) \times (4) $$
    Multiply the diagonal entries together.
3.  **Calculate the product:**
    $$ \det(A) = -6 \times 4 $$
    $$ \det(A) = -24 $$
    This is the final determinant.

**Final Answer:**
$$ \boxed{\det(A) = -24} $$

**Reflection:** This example highlights how quickly the determinant can be found for triangular matrices. Recognizing this structure saves significant computation compared to cofactor expansion.

---

### Example 2: Using Row Operations to Simplify

**Problem:** Find the determinant of the matrix $A$ using elementary row operations and properties.
$$ A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 5 & 4 \\ 3 & 7 & 8 \end{pmatrix} $$

**Identify:**
*   **Given:** A $3 \times 3$ matrix $A$.
*   **Want:** $\det(A)$.

**Solution:**
Our goal is to transform $A$ into an upper triangular matrix using elementary row operations, keeping track of how each operation affects the determinant.

1.  **Start with the original determinant:**
    $$ \det(A) = \det \begin{pmatrix} 1 & 2 & 3 \\ 2 & 5 & 4 \\ 3 & 7 & 8 \end{pmatrix} $$
2.  **Perform $R_2 \to R_2 - 2R_1$:**
    This operation (adding a multiple of one row to another) does **not change the determinant** (Property 3).
    $$ \det(A) = \det \begin{pmatrix} 1 & 2 & 3 \\ 2 - 2(1) & 5 - 2(2) & 4 - 2(3) \\ 3 & 7 & 8 \end{pmatrix} = \det \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & -2 \\ 3 & 7 & 8 \end{pmatrix} $$
3.  **Perform $R_3 \to R_3 - 3R_1$:**
    This operation also does **not change the determinant** (Property 3).
    $$ \det(A) = \det \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & -2 \\ 3 - 3(1) & 7 - 3(2) & 8 - 3(3) \end{pmatrix} = \det \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & -2 \\ 0 & 1 & -1 \end{pmatrix} $$
4.  **Perform $R_3 \to R_3 - R_2$:**
    Again, this operation does **not change the determinant** (Property 3).
    $$ \det(A) = \det \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & -2 \\ 0 - 0 & 1 - 1 & -1 - (-2) \end{pmatrix} = \det \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & -2 \\ 0 & 0 & 1 \end{pmatrix} $$
    Now the matrix is in **upper triangular form**.
5.  **Apply the Triangular Matrix Property:**
    The determinant of an upper triangular matrix is the product of its diagonal entries. The diagonal entries are $1$, $1$, and $1$.
    $$ \det(A) = (1) \times (1) \times (1) $$
    $$ \det(A) = 1 $$

**Final Answer:**
$$ \boxed{\det(A) = 1} $$

**Reflection:** This example demonstrates the power of row operations (specifically $R_i \to R_i + kR_j$) to simplify a matrix into a triangular form without changing its determinant. This is often the most efficient way to compute determinants of larger matrices.

---

### Example 3: Combining Multiple Properties

**Problem:** Given that $A$ is a $3 \times 3$ matrix with $\det(A) = 5$. Let $B$ be a matrix obtained from $A$ by the following sequence of operations:
1.  Swap $R_1$ and $R_3$.
2.  Multiply $R_2$ by $4$.
3.  Add $2R_1$ to $R_3$.
Find $\det(B)$.

**Identify:**
*   **Given:** $A$ is $3 \times 3$, $\det(A) = 5$.
*   **Want:** $\det(B)$ after a sequence of operations.

**Solution:**
We will track the determinant value after each operation. Let $\det(A_0) = \det(A) = 5$.

1.  **Operation 1: Swap $R_1$ and $R_3$.**
    Let $A_1$ be the matrix after this operation.
    According to Property 1 (Row/Column Swap), swapping two rows changes the sign of the determinant.
    $$ \det(A_1) = -\det(A_0) = -5 $$
2.  **Operation 2: Multiply $R_2$ by $4$.**
    Let $A_2$ be the matrix after this operation.
    According to Property 2 (Scalar Multiplication of a Row/Column), multiplying a single row by a scalar $k$ multiplies the determinant by $k$. Here, $k=4$.
    $$ \det(A_2) = 4 \cdot \det(A_1) = 4 \cdot (-5) = -20 $$
3.  **Operation 3: Add $2R_1$ to $R_3$.**
    Let $B$ be the matrix after this operation.
    According to Property 3 (Row/Column Addition), adding a multiple of one row to another row does not change the determinant.
    $$ \det(B) = \det(A_2) = -20 $$

**Final Answer:**
$$ \boxed{\det(B) = -20} $$

**Reflection:** This example emphasizes the importance of applying each property sequentially and correctly tracking the changes to the determinant. Each operation has a distinct effect that must be accounted for.

---

### Example 4: Combining Product, Inverse, Scalar, and Transpose Properties

**Problem:** Let $A$ be a $3 \times 3$ matrix such that $\det(A) = 2$. Find $\det( (3A^T)^{-1} A^2 )$.

**Identify:**
*   **Given:** $A$ is $3 \times 3$, $\det(A) = 2$.
*   **Want:** $\det( (3A^T)^{-1} A^2 )$.

**Solution:**
We will break down the expression using the properties of determinants.

1.  **Apply the Product Property (Property 5):**
    The determinant of a product of matrices is the product of their determinants.
    $$ \det( (3A^T)^{-1} A^2 ) = \det( (3A^T)^{-1} ) \cdot \det( A^2 ) $$
2.  **Apply the Inverse Property (Property 7):**
    The determinant of an inverse is the reciprocal of the original determinant.
    $$ \det( (3A^T)^{-1} ) = \frac{1}{\det(3A^T)} $$
    So, the expression becomes:
    $$ = \frac{1}{\det(3A^T)} \cdot \det(A^2) $$
3.  **Apply the Product Property again for $A^2$:**
    $A^2 = A \cdot A$. So $\det(A^2) = \det(A \cdot A) = \det(A) \cdot \det(A) = (\det(A))^2$.
    The expression becomes:
    $$ = \frac{1}{\det(3A^T)} \cdot (\det(A))^2 $$
4.  **Apply the Scalar Multiplication of a Matrix Property (from Property 2's important note):**
    For an $n \times n$ matrix $M$ and scalar $k$, $\det(kM) = k^n \det(M)$. Here, $M=A^T$ and $n=3$.
    $$ \det(3A^T) = 3^3 \det(A^T) = 27 \det(A^T) $$
    The expression becomes:
    $$ = \frac{1}{27 \det(A^T)} \cdot (\det(A))^2 $$
5.  **Apply the Transpose Property (Property 6):**
    The determinant of a transpose is equal to the determinant of the original matrix: $\det(A^T) = \det(A)$.
    The expression becomes:
    $$ = \frac{1}{27 \det(A)} \cdot (\det(A))^2 $$
6.  **Simplify the expression:**
    We can cancel one $\det(A)$ from the numerator and denominator.
    $$ = \frac{\det(A)}{27} $$
7.  **Substitute the given value of $\det(A)$:**
    We are given $\det(A) = 2$.
    $$ = \frac{2}{27} $$

**Final Answer:**
$$ \boxed{\det( (3A^T)^{-1} A^2 ) = \frac{2}{27}} $$

**Reflection:** This example demonstrates how multiple properties can be combined in a complex problem. Breaking down the problem step-by-step, applying one property at a time, is crucial for arriving at the correct solution. Pay close attention to the scalar multiplication property for an entire matrix ($k^n \det(A)$).

## 6. Common mistakes and traps

Students often stumble on these specific points when working with properties of determinants:

1.  **Forgetting the sign change for row/column swaps:** The most common error is performing a row swap but failing to multiply the determinant by $-1$.
2.  **Confusing $k \cdot R_i$ with $k \cdot A$:** Multiplying a *single row* by $k$ results in $k \cdot \det(A)$. However, multiplying the *entire $n \times n$ matrix* by $k$ results in $k^n \cdot \det(A)$. Many students forget the exponent $n$.
3.  **Assuming $\det(A+B) = \det(A) + \det(B)$:** This is almost always false. Determinants do not distribute over matrix addition.
4.  **Not recognizing zero determinants:** Students sometimes perform lengthy calculations on matrices that have a row/column of zeros or two identical rows/columns, when the determinant is immediately zero.
5.  **Incorrectly applying the inverse property:** The property $\det(A^{-1}) = 1/\det(A)$ only holds if $A$ is invertible, which means $\det(A) \neq 0$. If $\det(A)=0$, the inverse does not exist, and the expression $1/0$ is undefined.
6.  **Mixing up row and column operations:** While the properties generally apply to both row and column operations symmetrically, sometimes students get confused when switching between them or applying a property for rows to columns incorrectly.

## 7. Textbook-precise explanation

The properties of determinants are fundamental theorems in linear algebra. For an $n \times n$ matrix $A$, its determinant, denoted $\det(A)$ or $|A|$, satisfies the following properties:

Let $A$ be an $n \times n$ matrix.

1.  **Row/Column Swap Property:** If a matrix $B$ is obtained from $A$ by interchanging two rows or two columns, then $\det(B) = -\det(A)$.
2.  **Scalar Multiplication of a Row/Column Property:** If a matrix $B$ is obtained from $A$ by multiplying a single row or a single column by a scalar $k$, then $\det(B) = k \det(A)$. Consequently, if $A$ is an $n \times n$ matrix, then $\det(kA) = k^n \det(A)$.
3.  **Row/Column Addition Property:** If a matrix $B$ is obtained from $A$ by adding a multiple of one row to another row, or a multiple of one column to another column, then $\det(B) = \det(A)$.
4.  **Zero Row/Column or Identical Rows/Columns Property:**
    *   If $A$ has a row or a column consisting entirely of zeros, then $\det(A) = 0$.
    *   If $A$ has two identical rows or two identical columns, then $\det(A) = 0$.
5.  **Determinant of a Product Property:** For any two $n \times n$ matrices $A$ and $B$, $\det(AB) = \det(A)\det(B)$.
6.  **Determinant of the Transpose Property:** For any $n \times n$ matrix $A$, $\det(A^T) = \det(A)$.
7.  **Determinant of an Inverse Property:** If $A$ is an invertible $n \times n$ matrix, then $\det(A^{-1}) = \frac{1}{\det(A)}$. This implies that $A$ is invertible if and only if $\det(A) \neq 0$.
8.  **Determinant of Triangular Matrices Property:** If $A$ is a triangular matrix (upper triangular, lower triangular, or diagonal), then $\det(A)$ is the product of the entries on its main diagonal: $\det(A) = a_{11} a_{22} \cdots a_{nn}$.
9.  **Determinant of the Identity Matrix:** $\det(I) = 1$, where $I$ is the identity matrix. (This follows from Property 8, as the identity matrix is a diagonal matrix with 1s on the diagonal).

These properties are rigorously derived from the axiomatic definition of a determinant or from its definition via cofactor expansion or Leibniz formula. For a more formal treatment, refer to:

*   **Lay, David C. *Linear Algebra and Its Applications*, 5th ed., Pearson, §3.2.**
*   **Anton, Howard, and Rorres, Chris. *Elementary Linear Algebra: Applications Version*, 11th ed., Wiley, §2.2.**

## 8. ASCII diagrams

The most powerful application of determinant properties is simplifying a matrix to a triangular form using row operations, because the determinant of a triangular matrix is just the product of its diagonal entries.

Here's a conceptual diagram showing how elementary row operations (specifically $R_i \to R_i + kR_j$, which doesn't change the determinant) can transform a general matrix into an upper triangular matrix:

```text
Original Matrix A (3x3 example):
   +---+---+---+
   | a | b | c |
   +---+---+---+
   | d | e | f |
   +---+---+---+
   | g | h | i |
   +---+---+---+
   det(A) = ?

Goal: Transform to Upper Triangular form.
This involves making entries below the main diagonal zero.

Step 1: Eliminate 'd' and 'g' in the first column.
(Using R2 -> R2 - (d/a)R1 and R3 -> R3 - (g/a)R1. These operations DO NOT change the determinant.)

   +---+---+---+
   | a | b | c |
   +---+---+---+
   | 0 | e'| f'|  (e' = e - (d/a)b, f' = f - (d/a)c)
   +---+---+---+
   | 0 | h'| i'|  (h' = h - (g/a)b, i' = i - (g/a)c)
   +---+---+---+
   det(A_intermediate1) = det(A)

Step 2: Eliminate 'h'' in the second column.
(Using R3 -> R3 - (h'/e')R2. This operation DOES NOT change the determinant.)

   +---+---+---+
   | a | b | c |
   +---+---+---+
   | 0 | e'| f'|
   +---+---+---+
   | 0 | 0 | i''| (i'' = i' - (h'/e')f')
   +---+---+---+
   det(A_upper_triangular) = det(A)

Now, the matrix is upper triangular.
Its determinant is simply the product of its diagonal entries:
det(A) = a * e' * i''
```

This diagram illustrates the process of Gaussian elimination to achieve a triangular form, emphasizing that the determinant remains unchanged by the crucial row operation of adding a multiple of one row to another. If any row swaps were performed, a sign change would be applied. If any rows were scaled, the determinant would be scaled by that factor.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    Think of "S.C.A.T. P.I.T." for the key properties:
    *   **S**wap (rows/cols): Change **S**ign ($\times -1$)
    *   **C**onstant (multiple in a row/col): Pull **C**onstant out ($\times k$)
    *   **A**dd (multiple of row/col to another): **A**bsolutely no change
    *   **T**ranspose: **T**he same
    *   **P**roduct: **P**roduct of determinants ($\det(AB) = \det(A)\det(B)$)
    *   **I**nverse: **I**nverse of determinant ($\det(A^{-1}) = 1/\det(A)$)
    *   **T**riangular: **T**rivial (product of diagonal)

2.  **Formulas/Facts to Overlearn:**
    *   $\det(B) = -\det(A)$ (for row/column swap)
    *   $\det(B) = k \det(A)$ (for multiplying a single row/column by $k$)
    *   $\det(kA) = k^n \det(A)$ (for multiplying an $n \times n$ matrix by $k$)
    *   $\det(B) = \det(A)$ (for adding a multiple of one row/column to another)
    *   $\det(AB) = \det(A)\det(B)$
    *   $\det(A^T) = \det(A)$
    *   $\det(A^{-1}) = \frac{1}{\det(A)}$ (if $A$ is invertible)
    *   $\det(A) = 0$ if $A$ has a zero row/column or two identical rows/columns.
    *   $\det(A) = a_{11}a_{22}\cdots a_{nn}$ (if $A$ is triangular)

3.  **Spaced-Repetition Schedule:**
    *   Review these properties:
        *   **1 day** after learning
        *   **3 days** after that
        *   **7 days** after that
        *   **16 days** after that
        *   **35 days** after that
    *   Actively try to recall them and apply them to small examples each time.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget a property, you can often re-derive it by starting with the definition of a $2 \times 2$ determinant.
    Let $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$, so $\det(A) = ad - bc$.
    *   **Row Swap:** Swap rows to get $B = \begin{pmatrix} c & d \\ a & b \end{pmatrix}$. $\det(B) = cb - da = -(ad-bc) = -\det(A)$. (Confirms Property 1)
    *   **Scalar Row Multiplication:** Multiply $R_1$ by $k$ to get $B = \begin{pmatrix} ka & kb \\ c & d \end{pmatrix}$. $\det(B) = (ka)d - (kb)c = k(ad-bc) = k \det(A)$. (Confirms Property 2)
    *   **Row Addition:** Perform $R_2 \to R_2 + kR_1$ to get $B = \begin{pmatrix} a & b \\ c+ka & d+kb \end{pmatrix}$. $\det(B) = a(d+kb) - b(c+ka) = ad+akb - bc-bka = ad-bc = \det(A)$. (Confirms Property 3)
    By performing these operations on the basic $2 \times 2$ formula, you can quickly rebuild the intuition and confirm the rules. For products and transposes, a $2 \times 2$ example will also often suffice to illustrate the property.

## 10. Connections — what this leads to

The properties of determinants are not isolated facts but crucial stepping stones that unlock a deeper understanding of linear algebra and its applications:

1.  **Invertibility of Matrices:** The most direct consequence is the link between the determinant and a matrix's invertibility: a square matrix $A$ is invertible if and only if $\det(A) \neq 0$. This is fundamental for solving systems of linear equations, finding matrix inverses, and understanding matrix transformations.
2.  **Solving Linear Systems (Cramer's Rule):** Determinants provide an explicit formula for the solution of a system of linear equations $Ax=b$ when $A$ is invertible, known as Cramer's Rule. While not always computationally efficient for large systems, it offers theoretical insights and is useful for small systems.
3.  **Eigenvalues and Eigenvectors:** Determinants are central to finding eigenvalues, which are critical in many fields (physics, engineering, computer science). Eigenvalues $\lambda$ of a matrix $A$ are found by solving the characteristic equation $\det(A - \lambda I) = 0$, where $I$ is the identity matrix. The properties of determinants are essential for manipulating this equation.
4.  **Linear Transformations and Geometric Interpretation:** The absolute value of the determinant of a transformation matrix represents the scaling factor of area (in 2D) or volume (in 3D) under that transformation. A negative determinant indicates an orientation reversal (like a reflection). This geometric intuition is vital in vector calculus (Jacobian determinant for change of variables) and computer graphics.
5.  **Vector Spaces and Basis:** The determinant can be used to check if a set of $n$ vectors in an $n$-dimensional space forms a basis. If you form a matrix with these vectors as columns (or rows), their linear independence (and thus whether they form a basis) is equivalent to the determinant of that matrix being non-zero.
6.  **Advanced Topics in Linear Algebra:** Properties of determinants are used in defining and understanding concepts like adjoint matrices, minor and cofactor matrices, and in advanced proofs related to matrix decompositions and canonical forms.

## 11. Self-check questions

1.  A $4 \times 4$ matrix $A$ has $\det(A) = 7$. If matrix $B$ is obtained from $A$ by swapping the first and third rows, then multiplying the second row by $-2$, and finally adding 3 times the first row to the fourth row, what is $\det(B)$?
2.  Given that $A$ and $B$ are $n \times n$ matrices, and $\det(A) = 3$ and $\det(B) = -2$. Find $\det(A^2 B^{-1} (2A)^T)$.
3.  Without calculating the full determinant, explain why the determinant of the following matrix is zero:
    $$ M = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 2 & 4 & 6 \end{pmatrix} $$
4.  Let $A$ be a $3 \times 3$ matrix. You perform the following sequence of elementary row operations:
    1.  $R_1 \leftrightarrow R_2$
    2.  $R_2 \to 5R_2$
    3.  $R_3 \to R_3 - 2R_1$
    If the determinant of the resulting matrix is $10$, what was the determinant of the original matrix $A$?
5.  Prove that if $A$ is an $n \times n$ matrix such that $A^T A = I$ (where $I$ is the identity matrix), then $\det(A)$ must be either $1$ or $-1$.