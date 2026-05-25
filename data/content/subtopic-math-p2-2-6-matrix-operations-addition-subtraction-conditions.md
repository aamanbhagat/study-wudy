## What it is
Matrix addition and subtraction are operations where you combine two matrices by adding or subtracting the numbers in their matching positions. This operation is strictly conditional: it can only be performed if both matrices have the exact same dimensions (the same number of rows and columns).

## Why it matters
In physics and rocket science, you will constantly add force, velocity, or state vectors—these are simply $n \times 1$ column matrices. If you want to find the net force on a spacecraft, you add the gravity matrix, the thrust matrix, and the drag matrix. In computer science and machine learning, adding matrices is how you apply biases to neural network layers or overlay two images (which are just grids of pixel values). If you cannot add matrices, you cannot aggregate multidimensional data.

## When to study it
You must already understand:
1. Basic arithmetic of real numbers (especially handling negative numbers).
2. Matrix dimensions (identifying an $m \times n$ matrix, where $m$ is rows and $n$ is columns).
3. Index notation (understanding that $a_{ij}$ refers to the element in the $i$-th row and $j$-th column of matrix $A$).

If you cannot instantly identify the dimensions of a matrix or locate element $a_{23}$, review matrix notation before proceeding.

## How to study it (step by step)
1. **Master the condition:** Write down five pairs of matrices with random dimensions. For each pair, explicitly state whether they can be added. If they can't, write "Undefined." 
2. **Perform element-wise addition:** Create two $3 \times 3$ matrices. Add them by writing out the intermediate step (e.g., writing $5 + (-2)$ in the new matrix cell before simplifying to $3$).
3. **Perform element-wise subtraction:** Take the same two matrices and subtract the second from the first. Pay strict attention to double negatives.
4. **Prove commutativity:** Calculate $A + B$ and $B + A$. Observe that the results are identical. 
5. **Prove non-commutativity of subtraction:** Calculate $A - B$ and $B - A$. Observe that $A - B = -(B - A)$.

## Key ideas, with intuition

**1. The Dimension Rule (The "Overlap" Condition)**
You cannot add a 2D coordinate to a 3D coordinate. In matrix math, this rule is absolute. To add matrix $A$ and matrix $B$, their dimensions must match exactly. If $A$ is $m \times n$ and $B$ is $p \times q$, then $A+B$ is only defined if $m=p$ and $n=q$. 

**2. Element-wise Execution**
Matrix addition is not a new type of math; it is just scalar addition done in parallel. If $C = A + B$, then every element in $C$ is defined by:
$$c_{ij} = a_{ij} + b_{ij}$$
for every row $i$ and column $j$.

**3. Subtraction is Adding a Negative**
Just like in basic algebra, $A - B$ is conceptually identical to $A + (-B)$. You are simply subtracting corresponding elements:
$$c_{ij} = a_{ij} - b_{ij}$$

**4. Inheritance of Scalar Properties**
Because matrix addition relies entirely on scalar addition under the hood, it inherits its properties. Since $2 + 3 = 3 + 2$, it follows that $a_{ij} + b_{ij} = b_{ij} + a_{ij}$. Therefore, matrix addition is commutative ($A+B = B+A$) and associative ($(A+B)+C = A+(B+C)$).

## Worked example

Let $A = \begin{bmatrix} 4 & -2 \\ 1 & 7 \end{bmatrix}$ and $B = \begin{bmatrix} 0 & 5 \\ -3 & 2 \end{bmatrix}$. 
Calculate $X = A - B$.

**Step 1: Check dimensions.**
Matrix $A$ is $2 \times 2$. Matrix $B$ is $2 \times 2$. 
The dimensions match, so the operation is defined. The resulting matrix $X$ will also be $2 \times 2$.

**Step 2: Set up the element-wise subtraction.**
$$X = \begin{bmatrix} 4 & -2 \\ 1 & 7 \end{bmatrix} - \begin{bmatrix} 0 & 5 \\ -3 & 2 \end{bmatrix}$$

$$X = \begin{bmatrix} 4 - 0 & -2 - 5 \\ 1 - (-3) & 7 - 2 \end{bmatrix}$$

**Step 3: Simplify.**
$$X = \begin{bmatrix} 4 & -7 \\ 4 & 5 \end{bmatrix}$$

*Reflection:* The operation succeeded because the grids perfectly overlapped. The most critical step was $1 - (-3)$, which becomes $1 + 3 = 4$. Writing out the intermediate step prevents trivial arithmetic errors.

## Diagrams

```text
The "Grid Overlay" Intuition for A + B = C

Matrix A (2x2)       Matrix B (2x2)             Matrix C (2x2)
+-------+-------+    +-------+-------+          +-----------+-----------+
|       |       |    |       |       |          |           |           |
|  a11  |  a12  |    |  b11  |  b12  |          | a11 + b11 | a12 + b12 |
|       |       |    |       |       |          |           |           |
+-------+-------+  + +-------+-------+   ====>  +-----------+-----------+
|       |       |    |       |       |          |           |           |
|  a21  |  a22  |    |  b21  |  b22  |          | a21 + b21 | a22 + b22 |
|       |       |    |       |       |          |           |           |
+-------+-------+    +-------+-------+          +-----------+-----------+

Condition check: Both are 2 rows by 2 columns. 
They overlay perfectly. If B had a 3rd column, it would "hang off" 
the edge of A, making addition impossible (undefined).
```

## Memory technique — remember this forever

1. **The Visual Hook:** Think of matrices as panes of glass with numbers painted on them. To add them, you stack the panes on top of each other and look through them. If the panes aren't the exact same size and shape, they don't stack properly, and the operation is invalid.
2. **The Facts to Overlearn:** 
   * $A \pm B$ is ONLY defined if $dim(A) = dim(B)$.
   * $c_{ij} = a_{ij} \pm b_{ij}$.
3. **Spaced-repetition schedule:** Review this concept and solve one addition/subtraction problem at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget whether you can add a $2 \times 3$ to a $3 \times 2$, try to write out the element-wise formula $c_{ij} = a_{ij} + b_{ij}$. You will quickly find that $a_{13}$ exists, but $b_{13}$ does not. The math breaks, proving dimensions must match.

## Common mistakes

1. **Ignoring the dimension check:** Students often try to force an addition between a $2 \times 3$ and $3 \times 2$ matrix by ignoring the mismatched elements or assuming they are zeros. This is mathematically illegal. The answer is simply "undefined."
2. **Sign errors during subtraction:** When subtracting matrices with negative elements, students frequently drop a negative sign. Writing $A - B$ as $A + (-B)$ by flipping every sign in $B$ first is a highly effective way to prevent this.
3. **Misaligning rows and columns:** Rushing causes students to accidentally add $a_{12}$ to $b_{21}$. Always trace your finger across the exact matching positions.

## Self-check

1. Let $A = \begin{bmatrix} 1 & 0 \\ -4 & 5 \end{bmatrix}$ and $B = \begin{bmatrix} -1 & 2 \\ 4 & -5 \end{bmatrix}$. Find $A + B$.
2. Let $C = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$ and $D = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix}$. What is $C - D$?
3. Solve for the unknown matrix $X$ in the equation $X - \begin{bmatrix} 2 & -1 \\ 0 & 3 \end{bmatrix} = \begin{bmatrix} 5 & 5 \\ -2 & 1 \end{bmatrix}$.