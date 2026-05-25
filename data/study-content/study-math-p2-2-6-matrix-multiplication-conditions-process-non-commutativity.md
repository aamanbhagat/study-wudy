## 1. What it is — in plain English

Imagine you have two sets of instructions, and you want to combine them in a very specific, sequential way. Matrix multiplication is like that: it's a way to combine two "instruction sets" or "transformation rules" (which are what matrices often represent) into a single, new instruction set. It's not just multiplying numbers element by element, like you might do with simple lists.

Think of it this way: if you have a recipe that tells you how to turn flour into dough, and another recipe that tells you how to turn dough into bread, matrix multiplication helps you figure out the single, combined recipe that takes flour directly to bread. The order matters a lot here – turning flour to dough then dough to bread is different from trying to turn dough to flour then flour to bread!

At its heart, matrix multiplication takes rows from the first matrix and "mixes" them with columns from the second matrix. For each spot in the new, resulting matrix, you perform a specific kind of combination: you multiply corresponding numbers from a chosen row and a chosen column, and then add up all those products. It's like a sophisticated "dot product" operation repeated many times.

The result is a new matrix that encapsulates the combined effect of the first two. This combination is incredibly powerful because it allows us to model sequences of operations, transformations, or relationships in a compact mathematical form.

## 2. Why it matters — real-world applications

Matrix multiplication is a cornerstone of modern mathematics and its applications. It provides a compact and efficient way to represent and compute complex interactions.

1.  **Computer Graphics and Animation:** Every time you see a 3D object rotate, scale, or move across your screen (in a video game, CAD software, or movie), matrix multiplication is happening behind the scenes. A 3D model is a collection of points (vertices), and these points are represented as vectors. Transformations like rotation, scaling, and translation are represented by matrices. Multiplying the transformation matrix by the vector representing a point moves that point. Combining multiple transformations (e.g., rotate, then translate, then scale) involves multiplying their respective matrices together to get a single, composite transformation matrix. Companies like NVIDIA and AMD build specialized hardware (GPUs) designed to perform these matrix multiplications at incredible speeds.

2.  **Machine Learning and Artificial Intelligence (especially Neural Networks):** At the core of many AI algorithms, particularly deep learning models like neural networks, are vast numbers of matrix multiplications. When a neural network processes data (e.g., an image or text), the input data is often represented as a matrix. This input is then multiplied by weight matrices, which represent the "knowledge" learned by the network. This process is repeated layer after layer. The efficiency of matrix multiplication directly impacts how quickly AI models can be trained and how fast they can make predictions. Google's TensorFlow and Meta's PyTorch are software frameworks built on highly optimized matrix multiplication routines.

3.  **Physics and Engineering (e.g., Quantum Mechanics, Structural Analysis, Aerospace):**
    *   **Quantum Mechanics:** In quantum mechanics, the states of particles and the operations that transform these states (like measuring a particle's spin) are often represented by vectors and matrices, respectively. Matrix multiplication describes how these operations act on the quantum states or how multiple operations combine.
    *   **Structural Analysis (Aerospace/Civil Engineering):** When designing structures like airplane wings, bridges, or buildings, engineers use finite element analysis (FEA). This involves dividing the structure into many small elements and representing their properties and interactions (stiffness, forces, displacements) using large matrices. Matrix multiplication is used to solve the resulting systems of equations to predict how the structure will behave under stress. Boeing and Airbus extensively use these techniques in aircraft design.
    *   **Signal Processing:** Matrix multiplication is fundamental in digital signal processing, used in everything from audio compression (MP3) to image processing (JPEG) and telecommunications. Operations like convolution, Fourier transforms, and filtering can often be expressed and computed efficiently using matrix multiplication.

## 3. Prerequisites — what you must know first

Before diving into matrix multiplication, ensure you have a solid grasp of these fundamental concepts:

*   **Definition of a Matrix:** What a matrix is (a rectangular array of numbers), its dimensions (rows x columns), and how to refer to individual elements (e.g., $a_{ij}$).
*   **Scalar Multiplication of Matrices:** How to multiply a matrix by a single number (a scalar), which involves multiplying every element of the matrix by that scalar.
*   **Matrix Addition/Subtraction:** How to add or subtract two matrices of the same dimensions, which involves adding or subtracting corresponding elements.
*   **Vectors:** What a vector is (often seen as a 1xN or Nx1 matrix), and how to perform basic vector operations.
*   **Dot Product of Vectors:** How to calculate the dot product of two vectors, which involves multiplying corresponding elements and summing the results. This is crucial as it's the core operation repeated in matrix multiplication.
*   **Basic Arithmetic:** Proficiency in addition, subtraction, and multiplication of real numbers.

## 4. The core idea — step by step

Matrix multiplication is very different from scalar multiplication or matrix addition. It's not element-by-element. Instead, it's a "row-by-column" operation based on the dot product.

### Step 1: Conditions for Multiplication — "Inner Dimensions Must Match"

*   **Plain-English Statement:** You can only multiply two matrices if the number of columns in the *first* matrix is exactly equal to the number of rows in the *second* matrix. If they don't match, you simply cannot multiply them in that order.

*   **Concrete Example:**
    *   Matrix A is $2 \times 3$ (2 rows, 3 columns).
    *   Matrix B is $3 \times 4$ (3 rows, 4 columns).
    *   The number of columns in A (3) matches the number of rows in B (3). So, A and B *can* be multiplied (A times B, or AB).
    *   If Matrix C is $2 \times 2$ and Matrix D is $3 \times 2$, then C and D *cannot* be multiplied (CD) because columns of C (2) do not match rows of D (3).

*   **Formal/Mathematical Version:**
    If matrix $A$ has dimensions $m \times n$ and matrix $B$ has dimensions $p \times q$, then the product $AB$ is defined if and only if $n = p$.
    $$A_{m \times n} \cdot B_{p \times q} \quad \text{is defined if } n = p$$

*   **What could go wrong:** Forgetting this rule is the most common initial mistake. You'll try to multiply matrices that are incompatible, leading to frustration. Always check dimensions first!

### Step 2: Determining the Dimensions of the Resulting Matrix — "Outer Dimensions Dictate"

*   **Plain-English Statement:** If you successfully determined that two matrices can be multiplied, the resulting matrix will have dimensions determined by the "outer" numbers of their original dimensions. Specifically, it will have the same number of rows as the first matrix and the same number of columns as the second matrix.

*   **Concrete Example:**
    *   Matrix A is $2 \times 3$.
    *   Matrix B is $3 \times 4$.
    *   Since the inner dimensions (3 and 3) match, multiplication is possible.
    *   The outer dimensions are 2 (from A's rows) and 4 (from B's columns).
    *   So, the resulting matrix $AB$ will be $2 \times 4$.

*   **Formal/Mathematical Version:**
    If matrix $A$ has dimensions $m \times n$ and matrix $B$ has dimensions $n \times q$ (note $p$ is now $n$ because they must match), then the product $AB$ will have dimensions $m \times q$.
    $$A_{m \times n} \cdot B_{n \times q} = (AB)_{m \times q}$$

*   **What could go wrong:** Incorrectly predicting the size of the result can lead to errors in setting up the calculation, or even trying to calculate elements that don't exist.

### Step 3: The Core Calculation — "Row-Column Dot Product"

*   **Plain-English Statement:** To find any single element in the resulting matrix, you take a specific row from the first matrix and a specific column from the second matrix. You then perform a "dot product" operation on them: multiply the first number of the row by the first number of the column, the second number of the row by the second number of the column, and so on. Finally, you add up all these products. This sum becomes the value for that specific position in the new matrix.

*   **Concrete Example:**
    Let $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$ and $B = \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix}$.
    The resulting matrix $C = AB$ will be $2 \times 2$.
    To find the element $c_{11}$ (first row, first column of C):
    Take Row 1 of A: $\begin{pmatrix} 1 & 2 \end{pmatrix}$
    Take Column 1 of B: $\begin{pmatrix} 5 \\ 7 \end{pmatrix}$
    Calculate their dot product: $(1 \times 5) + (2 \times 7) = 5 + 14 = 19$.
    So, $c_{11} = 19$.

*   **Formal/Mathematical Version:**
    If $C = AB$, where $A$ is $m \times n$ and $B$ is $n \times q$, then the element $c_{ij}$ (the element in the $i$-th row and $j$-th column of $C$) is given by:
    $$c_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj}$$
    This means $c_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + \dots + a_{in}b_{nj}$.

*   **What could go wrong:** Mixing up which row and which column to use, or performing element-wise multiplication instead of the dot product sum. This is where most calculation errors occur.

### Step 4: The Full Process — "Systematic Application"

*   **Plain-English Statement:** You systematically apply the "row-column dot product" rule for every position in the resulting matrix. If the result is an $m \times q$ matrix, you'll perform $m \times q$ separate dot product calculations. For each position $(i, j)$ in the result, you use row $i$ from the first matrix and column $j$ from the second matrix.

*   **Concrete Example:**
    Let $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$ and $B = \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix}$.
    We found $c_{11} = 19$.
    Now, let's find the other elements:
    *   $c_{12}$ (Row 1 of A, Column 2 of B): $(1 \times 6) + (2 \times 8) = 6 + 16 = 22$.
    *   $c_{21}$ (Row 2 of A, Column 1 of B): $(3 \times 5) + (4 \times 7) = 15 + 28 = 43$.
    *   $c_{22}$ (Row 2 of A, Column 2 of B): $(3 \times 6) + (4 \times 8) = 18 + 32 = 50$.
    So, $AB = \begin{pmatrix} 19 & 22 \\ 43 & 50 \end{pmatrix}$.

*   **Formal/Mathematical Version:** (Same as Step 3, but emphasizing the iterative nature)
    For each $i$ from $1$ to $m$ and each $j$ from $1$ to $q$, calculate $c_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj}$.

*   **What could go wrong:** Losing track of which row/column you're on, leading to misplacing results in the final matrix. A common visual aid is to imagine drawing lines from the row and column to their intersection point in the result.

### Step 5: Non-Commutativity — "Order Matters!"

*   **Plain-English Statement:** Unlike regular number multiplication (where $2 \times 3$ is the same as $3 \times 2$), matrix multiplication is generally *not* commutative. This means that if you switch the order of the matrices, you will almost certainly get a different result, or even find that the multiplication is no longer possible. $AB \neq BA$.

*   **Concrete Example:**
    Using the matrices from Step 4:
    $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$ and $B = \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix}$.
    We found $AB = \begin{pmatrix} 19 & 22 \\ 43 & 50 \end{pmatrix}$.
    Now let's calculate $BA$:
    *   $c'_{11}$ (Row 1 of B, Column 1 of A): $(5 \times 1) + (6 \times 3) = 5 + 18 = 23$.
    *   $c'_{12}$ (Row 1 of B, Column 2 of A): $(5 \times 2) + (6 \times 4) = 10 + 24 = 34$.
    *   $c'_{21}$ (Row 2 of B, Column 1 of A): $(7 \times 1) + (8 \times 3) = 7 + 24 = 31$.
    *   $c'_{22}$ (Row 2 of B, Column 2 of A): $(7 \times 2) + (8 \times 4) = 14 + 32 = 46$.
    So, $BA = \begin{pmatrix} 23 & 34 \\ 31 & 46 \end{pmatrix}$.
    Clearly, $AB \neq BA$.

    Consider another case:
    $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$ (2x2)
    $B = \begin{pmatrix} 5 \\ 6 \end{pmatrix}$ (2x1)
    $AB$ is defined: $(2 \times 2) \cdot (2 \times 1) \rightarrow (2 \times 1)$ result.
    $BA$ is *not* defined: $(2 \times 1) \cdot (2 \times 2)$. The inner dimensions (1 and 2) do not match.

*   **Formal/Mathematical Version:**
    For matrices $A$ and $B$, $AB \neq BA$ in general.
    This property is called non-commutativity.

*   **What could go wrong:** Assuming you can swap the order of matrices just like with numbers. This is a fundamental difference and a source of many errors if overlooked.

## 5. Worked examples — multiple, with every step shown

### Example 1: Basic 2x2 Multiplication

**Problem:** Given matrices $P = \begin{pmatrix} 2 & 1 \\ 0 & 3 \end{pmatrix}$ and $Q = \begin{pmatrix} 4 & -1 \\ 5 & 2 \end{pmatrix}$, calculate the product $PQ$.

**Given:**
*   Matrix $P = \begin{pmatrix} 2 & 1 \\ 0 & 3 \end{pmatrix}$ (dimensions $2 \times 2$)
*   Matrix $Q = \begin{pmatrix} 4 & -1 \\ 5 & 2 \end{pmatrix}$ (dimensions $2 \times 2$)

**Wanted:** The product matrix $PQ$.

**Step-by-step Solution:**

1.  **Check Dimensions:**
    *   $P$ is $2 \times 2$. $Q$ is $2 \times 2$.
    *   The number of columns in $P$ (2) matches the number of rows in $Q$ (2). So, multiplication is possible.
    *   The resulting matrix $PQ$ will have dimensions $2 \times 2$ (from the outer dimensions of $P$ and $Q$).
    *   *Explanation:* This confirms we can perform the multiplication and tells us the size of our answer.

2.  **Calculate element $c_{11}$ (Row 1 of P, Column 1 of Q):**
    $$c_{11} = (2 \times 4) + (1 \times 5)$$
    $$c_{11} = 8 + 5$$
    $$c_{11} = 13$$
    *Explanation:* We take the first row of $P$ ($\begin{pmatrix} 2 & 1 \end{pmatrix}$) and the first column of $Q$ ($\begin{pmatrix} 4 \\ 5 \end{pmatrix}$), multiply corresponding elements, and sum the results. This gives us the element in the first row, first column of the product matrix.*

3.  **Calculate element $c_{12}$ (Row 1 of P, Column 2 of Q):**
    $$c_{12} = (2 \times -1) + (1 \times 2)$$
    $$c_{12} = -2 + 2$$
    $$c_{12} = 0$$
    *Explanation:* We use the first row of $P$ ($\begin{pmatrix} 2 & 1 \end{pmatrix}$) and the second column of $Q$ ($\begin{pmatrix} -1 \\ 2 \end{pmatrix}$) for the element in the first row, second column of the product matrix.*

4.  **Calculate element $c_{21}$ (Row 2 of P, Column 1 of Q):**
    $$c_{21} = (0 \times 4) + (3 \times 5)$$
    $$c_{21} = 0 + 15$$
    $$c_{21} = 15$$
    *Explanation:* We use the second row of $P$ ($\begin{pmatrix} 0 & 3 \end{pmatrix}$) and the first column of $Q$ ($\begin{pmatrix} 4 \\ 5 \end{pmatrix}$) for the element in the second row, first column of the product matrix.*

5.  **Calculate element $c_{22}$ (Row 2 of P, Column 2 of Q):**
    $$c_{22} = (0 \times -1) + (3 \times 2)$$
    $$c_{22} = 0 + 6$$
    $$c_{22} = 6$$
    *Explanation:* We use the second row of $P$ ($\begin{pmatrix} 0 & 3 \end{pmatrix}$) and the second column of $Q$ ($\begin{pmatrix} -1 \\ 2 \end{pmatrix}$) for the element in the second row, second column of the product matrix.*

6.  **Assemble the Resulting Matrix:**
    $$PQ = \begin{pmatrix} 13 & 0 \\ 15 & 6 \end{pmatrix}$$
    *Explanation:* We place the calculated values into their respective positions in the $2 \times 2$ product matrix.*

**Final Answer:**
$$ \boxed{PQ = \begin{pmatrix} 13 & 0 \\ 15 & 6 \end{pmatrix}} $$

**Reflection:** This example was straightforward because both matrices were square and small. The main challenge is to be systematic and avoid arithmetic errors.

---

### Example 2: Rectangular Matrices (2x3 by 3x2)

**Problem:** Calculate the product $MN$ for $M = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix}$ and $N = \begin{pmatrix} 7 & 8 \\ 9 & 1 \\ 2 & 3 \end{pmatrix}$.

**Given:**
*   Matrix $M = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix}$ (dimensions $2 \times 3$)
*   Matrix $N = \begin{pmatrix} 7 & 8 \\ 9 & 1 \\ 2 & 3 \end{pmatrix}$ (dimensions $3 \times 2$)

**Wanted:** The product matrix $MN$.

**Step-by-step Solution:**

1.  **Check Dimensions:**
    *   $M$ is $2 \times 3$. $N$ is $3 \times 2$.
    *   The number of columns in $M$ (3) matches the number of rows in $N$ (3). Multiplication is possible.
    *   The resulting matrix $MN$ will have dimensions $2 \times 2$ (from the outer dimensions of $M$ and $N$).
    *   *Explanation:* This confirms compatibility and the size of the resulting matrix.

2.  **Calculate element $c_{11}$ (Row 1 of M, Column 1 of N):**
    $$c_{11} = (1 \times 7) + (2 \times 9) + (3 \times 2)$$
    $$c_{11} = 7 + 18 + 6$$
    $$c_{11} = 31$$
    *Explanation:* We take the first row of $M$ ($\begin{pmatrix} 1 & 2 & 3 \end{pmatrix}$) and the first column of $N$ ($\begin{pmatrix} 7 \\ 9 \\ 2 \end{pmatrix}$), multiply corresponding elements, and sum the results. This gives us the element in the first row, first column of the product matrix.*

3.  **Calculate element $c_{12}$ (Row 1 of M, Column 2 of N):**
    $$c_{12} = (1 \times 8) + (2 \times 1) + (3 \times 3)$$
    $$c_{12} = 8 + 2 + 9$$
    $$c_{12} = 19$$
    *Explanation:* We use the first row of $M$ and the second column of $N$ for the element in the first row, second column of the product matrix.*

4.  **Calculate element $c_{21}$ (Row 2 of M, Column 1 of N):**
    $$c_{21} = (4 \times 7) + (5 \times 9) + (6 \times 2)$$
    $$c_{21} = 28 + 45 + 12$$
    $$c_{21} = 85$$
    *Explanation:* We use the second row of $M$ ($\begin{pmatrix} 4 & 5 & 6 \end{pmatrix}$) and the first column of $N$ for the element in the second row, first column of the product matrix.*

5.  **Calculate element $c_{22}$ (Row 2 of M, Column 2 of N):**
    $$c_{22} = (4 \times 8) + (5 \times 1) + (6 \times 3)$$
    $$c_{22} = 32 + 5 + 18$$
    $$c_{22} = 55$$
    *Explanation:* We use the second row of $M$ and the second column of $N$ for the element in the second row, second column of the product matrix.*

6.  **Assemble the Resulting Matrix:**
    $$MN = \begin{pmatrix} 31 & 19 \\ 85 & 55 \end{pmatrix}$$
    *Explanation:* We place the calculated values into their respective positions in the $2 \times 2$ product matrix.*

**Final Answer:**
$$ \boxed{MN = \begin{pmatrix} 31 & 19 \\ 85 & 55 \end{pmatrix}} $$

**Reflection:** This example involved larger sums due to the 3 elements in each row/column, increasing the chance of arithmetic error. It also shows that multiplying rectangular matrices can result in a square matrix.

---

### Example 3: Rectangular Matrices (3x2 by 2x3)

**Problem:** Using the same matrices from Example 2, $M = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix}$ and $N = \begin{pmatrix} 7 & 8 \\ 9 & 1 \\ 2 & 3 \end{pmatrix}$, calculate the product $NM$.

**Given:**
*   Matrix $N = \begin{pmatrix} 7 & 8 \\ 9 & 1 \\ 2 & 3 \end{pmatrix}$ (dimensions $3 \times 2$)
*   Matrix $M = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix}$ (dimensions $2 \times 3$)

**Wanted:** The product matrix $NM$.

**Step-by-step Solution:**

1.  **Check Dimensions:**
    *   $N$ is $3 \times 2$. $M$ is $2 \times 3$.
    *   The number of columns in $N$ (2) matches the number of rows in $M$ (2). Multiplication is possible.
    *   The resulting matrix $NM$ will have dimensions $3 \times 3$ (from the outer dimensions of $N$ and $M$).
    *   *Explanation:* This confirms compatibility and shows that switching the order can change the size of the result dramatically.

2.  **Calculate element $c_{11}$ (Row 1 of N, Column 1 of M):**
    $$c_{11} = (7 \times 1) + (8 \times 4)$$
    $$c_{11} = 7 + 32$$
    $$c_{11} = 39$$
    *Explanation:* First row of $N$ ($\begin{pmatrix} 7 & 8 \end{pmatrix}$) and first column of $M$ ($\begin{pmatrix} 1 \\ 4 \end{pmatrix}$).*

3.  **Calculate element $c_{12}$ (Row 1 of N, Column 2 of M):**
    $$c_{12} = (7 \times 2) + (8 \times 5)$$
    $$c_{12} = 14 + 40$$
    $$c_{12} = 54$$
    *Explanation:* First row of $N$ and second column of $M$ ($\begin{pmatrix} 2 \\ 5 \end{pmatrix}$).*

4.  **Calculate element $c_{13}$ (Row 1 of N, Column 3 of M):**
    $$c_{13} = (7 \times 3) + (8 \times 6)$$
    $$c_{13} = 21 + 48$$
    $$c_{13} = 69$$
    *Explanation:* First row of $N$ and third column of $M$ ($\begin{pmatrix} 3 \\ 6 \end{pmatrix}$).*

5.  **Calculate element $c_{21}$ (Row 2 of N, Column 1 of M):**
    $$c_{21} = (9 \times 1) + (1 \times 4)$$
    $$c_{21} = 9 + 4$$
    $$c_{21} = 13$$
    *Explanation:* Second row of $N$ ($\begin{pmatrix} 9 & 1 \end{pmatrix}$) and first column of $M$.*

6.  **Calculate element $c_{22}$ (Row 2 of N, Column 2 of M):**
    $$c_{22} = (9 \times 2) + (1 \times 5)$$
    $$c_{22} = 18 + 5$$
    $$c_{22} = 23$$
    *Explanation:* Second row of $N$ and second column of $M$.*

7.  **Calculate element $c_{23}$ (Row 2 of N, Column 3 of M):**
    $$c_{23} = (9 \times 3) + (1 \times 6)$$
    $$c_{23} = 27 + 6$$
    $$c_{23} = 33$$
    *Explanation:* Second row of $N$ and third column of $M$.*

8.  **Calculate element $c_{31}$ (Row 3 of N, Column 1 of M):**
    $$c_{31} = (2 \times 1) + (3 \times 4)$$
    $$c_{31} = 2 + 12$$
    $$c_{31} = 14$$
    *Explanation:* Third row of $N$ ($\begin{pmatrix} 2 & 3 \end{pmatrix}$) and first column of $M$.*

9.  **Calculate element $c_{32}$ (Row 3 of N, Column 2 of M):**
    $$c_{32} = (2 \times 2) + (3 \times 5)$$
    $$c_{32} = 4 + 15$$
    $$c_{32} = 19$$
    *Explanation:* Third row of $N$ and second column of $M$.*

10. **Calculate element $c_{33}$ (Row 3 of N, Column 3 of M):**
    $$c_{33} = (2 \times 3) + (3 \times 6)$$
    $$c_{33} = 6 + 18$$
    $$c_{33} = 24$$
    *Explanation:* Third row of $N$ and third column of $M$.*

11. **Assemble the Resulting Matrix:**
    $$NM = \begin{pmatrix} 39 & 54 & 69 \\ 13 & 23 & 33 \\ 14 & 19 & 24 \end{pmatrix}$$
    *Explanation:* We place the calculated values into their respective positions in the $3 \times 3$ product matrix.*

**Final Answer:**
$$ \boxed{NM = \begin{pmatrix} 39 & 54 & 69 \\ 13 & 23 & 33 \\ 14 & 19 & 24 \end{pmatrix}} $$

**Reflection:** This example strongly demonstrates non-commutativity. Not only is $NM$ different from $MN$ (from Example 2), but they are also different dimensions ($3 \times 3$ vs $2 \times 2$). This highlights the importance of order.

---

### Example 4: Non-Multipliable Matrices

**Problem:** Determine if the product $AB$ is defined for $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \\ 5 & 6 \end{pmatrix}$ and $B = \begin{pmatrix} 7 & 8 & 9 \\ 10 & 11 & 12 \end{pmatrix}$. If not, explain why. If yes, calculate $AB$.

**Given:**
*   Matrix $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \\ 5 & 6 \end{pmatrix}$ (dimensions $3 \times 2$)
*   Matrix $B = \begin{pmatrix} 7 & 8 & 9 \\ 10 & 11 & 12 \end{pmatrix}$ (dimensions $2 \times 3$)

**Wanted:** $AB$ or an explanation why it's not defined.

**Step-by-step Solution:**

1.  **Check Dimensions:**
    *   Matrix $A$ has dimensions $3 \times 2$.
    *   Matrix $B$ has dimensions $2 \times 3$.
    *   The number of columns in $A$ (2) matches the number of rows in $B$ (2).
    *   *Explanation:* The inner dimensions match, so multiplication *is* possible. The question implies it might not be, so it's important to carefully check.

2.  **Determine Resulting Dimensions:**
    *   Since $A$ is $3 \times 2$ and $B$ is $2 \times 3$, the resulting matrix $AB$ will have dimensions $3 \times 3$.
    *   *Explanation:* The outer dimensions (3 and 3) dictate the size of the product matrix.

3.  **Calculate element $c_{11}$ (Row 1 of A, Column 1 of B):**
    $$c_{11} = (1 \times 7) + (2 \times 10)$$
    $$c_{11} = 7 + 20$$
    $$c_{11} = 27$$
    *Explanation:* First row of $A$ ($\begin{pmatrix} 1 & 2 \end{pmatrix}$) and first column of $B$ ($\begin{pmatrix} 7 \\ 10 \end{pmatrix}$).*

4.  **Calculate element $c_{12}$ (Row 1 of A, Column 2 of B):**
    $$c_{12} = (1 \times 8) + (2 \times 11)$$
    $$c_{12} = 8 + 22$$
    $$c_{12} = 30$$
    *Explanation:* First row of $A$ and second column of $B$ ($\begin{pmatrix} 8 \\ 11 \end{pmatrix}$).*

5.  **Calculate element $c_{13}$ (Row 1 of A, Column 3 of B):**
    $$c_{13} = (1 \times 9) + (2 \times 12)$$
    $$c_{13} = 9 + 24$$
    $$c_{13} = 33$$
    *Explanation:* First row of $A$ and third column of $B$ ($\begin{pmatrix} 9 \\ 12 \end{pmatrix}$).*

6.  **Calculate element $c_{21}$ (Row 2 of A, Column 1 of B):**
    $$c_{21} = (3 \times 7) + (4 \times 10)$$
    $$c_{21} = 21 + 40$$
    $$c_{21} = 61$$
    *Explanation:* Second row of $A$ ($\begin{pmatrix} 3 & 4 \end{pmatrix}$) and first column of $B$.*

7.  **Calculate element $c_{22}$ (Row 2 of A, Column 2 of B):**
    $$c_{22} = (3 \times 8) + (4 \times 11)$$
    $$c_{22} = 24 + 44$$
    $$c_{22} = 68$$
    *Explanation:* Second row of $A$ and second column of $B$.*

8.  **Calculate element $c_{23}$ (Row 2 of A, Column 3 of B):**
    $$c_{23} = (3 \times 9) + (4 \times 12)$$
    $$c_{23} = 27 + 48$$
    $$c_{23} = 75$$
    *Explanation:* Second row of $A$ and third column of $B$.*

9.  **Calculate element $c_{31}$ (Row 3 of A, Column 1 of B):**
    $$c_{31} = (5 \times 7) + (6 \times 10)$$
    $$c_{31} = 35 + 60$$
    $$c_{31} = 95$$
    *Explanation:* Third row of $A$ ($\begin{pmatrix} 5 & 6 \end{pmatrix}$) and first column of $B$.*

10. **Calculate element $c_{32}$ (Row 3 of A, Column 2 of B):**
    $$c_{32} = (5 \times 8) + (6 \times 11)$$
    $$c_{32} = 40 + 66$$
    $$c_{32} = 106$$
    *Explanation:* Third row of $A$ and second column of $B$.*

11. **Calculate element $c_{33}$ (Row 3 of A, Column 3 of B):**
    $$c_{33} = (5 \times 9) + (6 \times 12)$$
    $$c_{33} = 45 + 72$$
    $$c_{33} = 117$$
    *Explanation:* Third row of $A$ and third column of $B$.*

12. **Assemble the Resulting Matrix:**
    $$AB = \begin{pmatrix} 27 & 30 & 33 \\ 61 & 68 & 75 \\ 95 & 106 & 117 \end{pmatrix}$$
    *Explanation:* We place the calculated values into their respective positions in the $3 \times 3$ product matrix.*

**Final Answer:**
$$ \boxed{AB = \begin{pmatrix} 27 & 30 & 33 \\ 61 & 68 & 75 \\ 95 & 106 & 117 \end{pmatrix}} $$

**Reflection:** The trick here was the initial implication that the matrices might not be multipliable. It's crucial to always perform the dimension check first, regardless of the problem's phrasing. In this case, they were compatible.

---

### Example 5: Demonstrating Non-Commutativity with a Specific Pair

**Problem:** Given $A = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$ and $B = \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}$, calculate $AB$ and $BA$ to explicitly show non-commutativity.

**Given:**
*   Matrix $A = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$ (dimensions $2 \times 2$)
*   Matrix $B = \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}$ (dimensions $2 \times 2$)

**Wanted:** $AB$ and $BA$.

**Step-by-step Solution for AB:**

1.  **Check Dimensions for AB:**
    *   $A$ is $2 \times 2$, $B$ is $2 \times 2$. Inner dimensions match (2=2). Result will be $2 \times 2$.
    *   *Explanation:* Both products are defined and will be of the same size, making the comparison direct.

2.  **Calculate $c_{11}$ for AB (Row 1 of A, Column 1 of B):**
    $$c_{11} = (0 \times 0) + (1 \times 1)$$
    $$c_{11} = 0 + 1$$
    $$c_{11} = 1$$
    *Explanation:* Multiply first row of $A$ ($\begin{pmatrix} 0 & 1 \end{pmatrix}$) by first column of $B$ ($\begin{pmatrix} 0 \\ 1 \end{pmatrix}$).*

3.  **Calculate $c_{12}$ for AB (Row 1 of A, Column 2 of B):**
    $$c_{12} = (0 \times 0) + (1 \times 0)$$
    $$c_{12} = 0 + 0$$
    $$c_{12} = 0$$
    *Explanation:* Multiply first row of $A$ by second column of $B$ ($\begin{pmatrix} 0 \\ 0 \end{pmatrix}$).*

4.  **Calculate $c_{21}$ for AB (Row 2 of A, Column 1 of B):**
    $$c_{21} = (0 \times 0) + (0 \times 1)$$
    $$c_{21} = 0 + 0$$
    $$c_{21} = 0$$
    *Explanation:* Multiply second row of $A$ ($\begin{pmatrix} 0 & 0 \end{pmatrix}$) by first column of $B$.*

5.  **Calculate $c_{22}$ for AB (Row 2 of A, Column 2 of B):**
    $$c_{22} = (0 \times 0) + (0 \times 0)$$
    $$c_{22} = 0 + 0$$
    $$c_{22} = 0$$
    *Explanation:* Multiply second row of $A$ by second column of $B$.*

6.  **Assemble AB:**
    $$AB = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$$
    *Explanation:* Placing the calculated values.*

**Step-by-step Solution for BA:**

1.  **Check Dimensions for BA:**
    *   $B$ is $2 \times 2$, $A$ is $2 \times 2$. Inner dimensions match (2=2). Result will be $2 \times 2$.
    *   *Explanation:* Confirmed, so we can proceed.

2.  **Calculate $c'_{11}$ for BA (Row 1 of B, Column 1 of A):**
    $$c'_{11} = (0 \times 0) + (0 \times 0)$$
    $$c'_{11} = 0 + 0$$
    $$c'_{11} = 0$$
    *Explanation:* Multiply first row of $B$ ($\begin{pmatrix} 0 & 0 \end{pmatrix}$) by first column of $A$ ($\begin{pmatrix} 0 \\ 0 \end{pmatrix}$).*

3.  **Calculate $c'_{12}$ for BA (Row 1 of B, Column 2 of A):**
    $$c'_{12} = (0 \times 1) + (0 \times 0)$$
    $$c'_{12} = 0 + 0$$
    $$c'_{12} = 0$$
    *Explanation:* Multiply first row of $B$ by second column of $A$ ($\begin{pmatrix} 1 \\ 0 \end{pmatrix}$).*

4.  **Calculate $c'_{21}$ for BA (Row 2 of B, Column 1 of A):**
    $$c'_{21} = (1 \times 0) + (0 \times 0)$$
    $$c'_{21} = 0 + 0$$
    $$c'_{21} = 0$$
    *Explanation:* Multiply second row of $B$ ($\begin{pmatrix} 1 & 0 \end{pmatrix}$) by first column of $A$.*

5.  **Calculate $c'_{22}$ for BA (Row 2 of B, Column 2 of A):**
    $$c'_{22} = (1 \times 1) + (0 \times 0)$$
    $$c'_{22} = 1 + 0$$
    $$c'_{22} = 1$$
    *Explanation:* Multiply second row of $B$ by second column of $A$.*

6.  **Assemble BA:**
    $$BA = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$$
    *Explanation:* Placing the calculated values.*

**Final Answer:**
$$ \boxed{AB = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}} \quad \text{and} \quad \boxed{BA = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}} $$

**Reflection:** This example very clearly shows that $AB \neq BA$. Even though both products are $2 \times 2$ matrices, their elements are different. This is a classic example used to illustrate non-commutativity in matrix algebra.

## 6. Common mistakes and traps

1.  **Ignoring Dimension Compatibility:** Trying to multiply matrices where the number of columns of the first matrix does not match the number of rows of the second. Always check $A_{m \times n} \cdot B_{p \times q}$ requires $n=p$.
2.  **Element-wise Multiplication:** Mistakenly multiplying matrices by multiplying corresponding elements (like scalar multiplication or matrix addition). Matrix multiplication is a row-by-column dot product, not element-wise.
3.  **Incorrect Resulting Dimensions:** Forgetting that $A_{m \times n} \cdot B_{n \times q}$ results in an $(AB)_{m \times q}$ matrix. This leads to setting up the wrong size result matrix.
4.  **Arithmetic Errors:** The process involves many individual multiplications and additions. It's easy to make a small arithmetic mistake, especially with negative numbers, which cascades into an incorrect final matrix.
5.  **Mixing Up Rows and Columns:** When calculating $c_{ij}$, using row $j$ from the first matrix and column $i$ from the second, instead of row $i$ from the first and column $j$ from the second.
6.  **Assuming Commutativity:** Believing that $AB$ will always be equal to $BA$. This is almost never true, and often $BA$ might not even be defined when $AB$ is.

## 7. Textbook-precise explanation

Let $A$ be an $m \times n$ matrix and $B$ be an $n \times p$ matrix. The product $C = AB$ is an $m \times p$ matrix whose elements $c_{ij}$ are defined by the sum of the products of the elements from the $i$-th row of $A$ and the $j$-th column of $B$.

Specifically, for $1 \le i \le m$ and $1 \le j \le p$, the element $c_{ij}$ is given by:
$$c_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj}$$
where $a_{ik}$ is the element in the $i$-th row and $k$-th column of $A$, and $b_{kj}$ is the element in the $k$-th row and $j$-th column of $B$.

This definition implies that matrix multiplication is only defined if the number of columns of the first matrix ($n$) equals the number of rows of the second matrix ($n$). If these dimensions do not match, the multiplication is undefined.

Furthermore, matrix multiplication is generally not commutative, meaning that for two matrices $A$ and $B$, $AB \neq BA$ in most cases. In fact, $BA$ may not even be defined, or if it is, it may have different dimensions than $AB$.

**References:**
*   Lay, D. C., Lay, S. R., & McDonald, J. J. (2016). *Linear Algebra and Its Applications* (5th ed., §2.1). Pearson.
*   Strang, G. (2016). *Introduction to Linear Algebra* (5th ed., §1.4). Wellesley-Cambridge Press.

## 8. ASCII diagrams

Here's a visual representation of how to calculate a single element in the product matrix. Imagine you're calculating the element in the first row, first column of the result:

```text
       Matrix B
     +-------------+
     | b11 b12 b13 |
     | b21 b22 b23 |
     | b31 b32 b33 |
     +-------------+
       ^
       | Column j (e.g., Column 1)
       |
Matrix A +-------------+
       | a11 a12 a13 | <--- Row i (e.g., Row 1)
       | a21 a22 a23 |
       +-------------+

To find c_ij (e.g., c_11):
Take Row i from A:  (a_i1  a_i2  a_i3)
Take Column j from B: (b_1j
                        b_2j
                        b_3j)

Multiply corresponding elements and sum:
c_ij = (a_i1 * b_1j) + (a_i2 * b_2j) + (a_i3 * b_3j)

Example for c_11:
c_11 = (a_11 * b_11) + (a_12 * b_21) + (a_13 * b_31)
```

This diagram illustrates that to get the element at position $(i,j)$ in the product matrix, you must use the $i$-th row of the first matrix and the $j$-th column of the second matrix.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"Row-Column-Dot-Product" Rule:** This phrase encapsulates the entire process. You take a **Row** from the first matrix, a **Column** from the second, and perform a **Dot Product** to get one element of the result.
    *   **"Inner-Outer" Dimension Check:** For $A_{m \times n} \cdot B_{p \times q}$:
        *   **Inner:** $n=p$ (must match for multiplication to be possible). Think of them "touching" in the middle.
        *   **Outer:** $m \times q$ (these are the dimensions of the result). Think of them being on the "outside" of the operation.
    *   **"Finger Slide" Visual:** Imagine placing your left index finger on a row of the first matrix and your right index finger on a column of the second matrix. As you multiply the first elements, slide both fingers simultaneously to the next elements, multiply, and then sum. This physical motion helps reinforce the dot product.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Dimension Compatibility:** $A_{m \times n} \cdot B_{p \times q}$ is defined only if $n=p$.
    *   **Resulting Dimensions:** If $A_{m \times n} \cdot B_{n \times q}$ is defined, the result is $(AB)_{m \times q}$.
    *   **Element Calculation:** $c_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj}$ (the row-column dot product).

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review the conditions, process, and non-commutativity. Work through 2-3 simple examples.
    *   **Day 3:** Review the core ideas and work through 2-3 more complex examples, including one that demonstrates non-commutativity.
    *   **Day 7:** Review the formal definition and try to derive the element calculation formula from the "row-column dot product" intuition. Work through 1-2 challenging examples.
    *   **Day 16:** Review all concepts, ensuring you can explain them in plain English and formally. Attempt a problem that involves a mix of operations (scalar multiplication, addition, multiplication).
    *   **Day 35:** Review the entire topic, focusing on its connection to linear transformations and systems of equations.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the formula $c_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj}$, remember the core idea:
    1.  **What is a matrix?** It's a structured collection of numbers.
    2.  **How do we combine "instructions" (matrices)?** By applying the first instruction, then the second.
    3.  **What's the fundamental way to combine two lists of numbers?** The dot product (multiplying corresponding elements and summing).
    4.  **Which lists do we combine?** To get the element in row $i$, column $j$ of the *result*, it makes sense to use row $i$ from the *first* matrix and column $j$ from the *second* matrix.
    5.  **Why does the middle dimension have to match?** Because for the dot product to work, the row and the column must have the same number of elements. If row $i$ of $A$ has $n$ elements, then column $j$ of $B$ must also have $n$ elements. This means $A$ must have $n$ columns, and $B$ must have $n$ rows.
    6.  **Putting it together:** The element $c_{ij}$ is the dot product of Row $i$ of $A$ and Column $j$ of $B$. If Row $i$ of $A$ is $(a_{i1}, a_{i2}, \dots, a_{in})$ and Column $j$ of $B$ is $(b_{1j}, b_{2j}, \dots, b_{nj})^T$, then their dot product is $a_{i1}b_{1j} + a_{i2}b_{2j} + \dots + a_{in}b_{nj}$, which is exactly the summation formula.

## 10. Connections — what this leads to

Matrix multiplication is a foundational operation that unlocks a vast array of advanced mathematical concepts and applications:

*   **Linear Transformations:** The most profound interpretation of matrix multiplication is as the composition of linear transformations. If matrix $A$ represents one transformation (e.g., rotation) and matrix $B$ represents another (e.g., scaling), then $AB$ represents the single transformation that performs scaling *then* rotation. This is crucial in geometry, computer graphics, and physics.
*   **Solving Systems of Linear Equations:** A system of linear equations can be written compactly as a matrix equation $Ax = b$. Understanding matrix multiplication is essential to understanding how to manipulate and solve such systems, particularly through inverse matrices ($x = A^{-1}b$) and techniques like Gaussian elimination.
*   **Eigenvalues and Eigenvectors:** These concepts, central to many fields (quantum mechanics, stability analysis, principal component analysis in ML), rely heavily on matrix multiplication. Eigenvectors are special vectors that, when multiplied by a matrix, only get scaled (not changed in direction).
*   **Change of Basis:** In linear algebra, representing vectors and transformations in different coordinate systems (bases) involves matrix multiplication to convert between these representations.
*   **Markov Chains:** In probability and statistics, Markov chains model systems that transition between states. The transition probabilities are often represented by a transition matrix, and matrix multiplication is used to predict the state distribution after multiple steps.
*   **Neural Networks:** As mentioned in applications, the core operation of a neural network is a series of matrix multiplications (input data by weight matrices), followed by activation functions. Understanding matrix multiplication is fundamental to comprehending how neural networks process information and learn.
*   **Determinants:** While not directly a consequence, the determinant of a matrix (a single scalar value that reveals properties like invertibility) is often defined in a way that implicitly relies on the structure of matrix multiplication.
*   **Abstract Algebra (Rings and Fields):** Matrices, along with matrix addition and multiplication, form a mathematical structure called a "ring" (specifically, a non-commutative ring of matrices). This connects linear algebra to abstract algebra.

## 11. Self-check questions

1.  Given $A = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$ and $B = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$, calculate $AB$. What special property does matrix $A$ exhibit?
2.  Calculate the product $RS$ for $R = \begin{pmatrix} 2 & -1 & 3 \\ 0 & 4 & 1 \end{pmatrix}$ and $S = \begin{pmatrix} 1 \\ -2 \\ 5 \end{pmatrix}$. What are the dimensions of the resulting matrix?
3.  Are the products $XY$ and $YX$ defined for $X = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$ and $Y = \begin{pmatrix} 5 & 6 & 7 \\ 8 & 9 & 10 \end{pmatrix}$? If so, calculate them. If not, explain why.
4.  Consider the matrices $M = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$, $N = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$, and $P = \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}$.
    a) Calculate $(MN)P$.
    b) Calculate $M(NP)$.
    c) What property of matrix multiplication does this illustrate?
5.  Suppose $A$ is a $4 \times 5$ matrix and $B$ is a matrix such that $AB$ is a $4 \times 7$ matrix. What must be the dimensions of $B$?