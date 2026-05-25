## What it is
Matrix multiplication is an operation that combines two matrices to produce a third matrix. Instead of multiplying corresponding elements together, you multiply the rows of the first matrix by the columns of the second matrix, summing the products. Fundamentally, it is the mathematical mechanism for chaining (composing) linear transformations.

## Why it matters
In aerospace and physics, matrix multiplication is how you rotate and translate 3D coordinate systems (e.g., transforming a vector from a rocket's local sensor frame to an Earth-centered inertial frame). In computer science, it is the engine of machine learning; neural networks are essentially massive sequences of matrix multiplications where input data is multiplied by weight matrices to generate predictions. 

## When to study it
You must already understand:
1. Basic arithmetic (addition, multiplication of real numbers).
2. The anatomy of a matrix (rows, columns, elements, and dimension notation like $m \times n$).
3. Matrix scalar multiplication and matrix addition.
4. The vector dot product.

If you cannot confidently compute the dot product of two vectors, go back and learn that first. Matrix multiplication is just a grid of dot products.

## How to study it (step by step)
1. **Master the dimension rule:** Write down the dimensions of two matrices. Verify that the "inner" dimensions match and identify the "outer" dimensions of the resulting matrix.
2. **Compute a single element:** Extract one row from a left matrix and one column from a right matrix. Compute their dot product. 
3. **Multiply a $2 \times 2$ by a $2 \times 2$:** Do this by hand. Track your indices carefully to build muscle memory.
4. **Multiply non-square matrices:** Multiply a $2 \times 3$ matrix by a $3 \times 2$ matrix. Observe how the resulting matrix is $2 \times 2$.
5. **Prove non-commutativity:** Pick two random $2 \times 2$ matrices, $A$ and $B$. Compute $AB$. Then compute $BA$. Observe that the results are different.

## Key ideas, with intuition

**1. The Dimension Condition**
You cannot multiply just any two matrices. To compute $AB$, the number of columns in $A$ must exactly match the number of rows in $B$. 
If $A$ has dimensions $m \times n$ and $B$ has dimensions $n \times p$, the inner dimensions ($n$) collapse, and the resulting matrix $C$ will have dimensions $m \times p$.
$$ (m \times \mathbf{n}) \times (\mathbf{n} \times p) \implies (m \times p) $$

**2. The Process (Row-by-Column)**
The element in the $i$-th row and $j$-th column of the new matrix $C$, denoted $c_{ij}$, is the dot product of the $i$-th row of $A$ and the $j$-th column of $B$. 
$$ c_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj} $$
Intuition: The first matrix dictates the *rows* of the result. The second matrix dictates the *columns* of the result.

**3. Non-Commutativity ($AB \neq BA$)**
In standard algebra, $3 \times 4 = 4 \times 3$. In matrix algebra, $AB$ is generally not equal to $BA$. In fact, $BA$ might not even be mathematically possible if the dimensions don't align in reverse. 
Intuition: Matrices represent actions (transformations). Order matters. Putting on your socks then your shoes is not the same as putting on your shoes then your socks. 

## Worked example
Let $A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$ and $B = \begin{bmatrix} 7 & 8 \\ 9 & 10 \\ 11 & 12 \end{bmatrix}$. Compute $C = AB$.

**Step 1: Check dimensions.**
$A$ is $2 \times 3$. $B$ is $3 \times 2$. 
Inner dimensions ($3$ and $3$) match. Outer dimensions ($2$ and $2$) mean $C$ will be a $2 \times 2$ matrix.
$$ C = \begin{bmatrix} c_{11} & c_{12} \\ c_{21} & c_{22} \end{bmatrix} $$

**Step 2: Compute $c_{11}$ (Row 1 of $A$ $\cdot$ Column 1 of $B$).**
$$ c_{11} = (1)(7) + (2)(9) + (3)(11) = 7 + 18 + 33 = 58 $$

**Step 3: Compute $c_{12}$ (Row 1 of $A$ $\cdot$ Column 2 of $B$).**
$$ c_{12} = (1)(8) + (2)(10) + (3)(12) = 8 + 20 + 36 = 64 $$

**Step 4: Compute $c_{21}$ (Row 2 of $A$ $\cdot$ Column 1 of $B$).**
$$ c_{21} = (4)(7) + (5)(9) + (6)(11) = 28 + 45 + 66 = 139 $$

**Step 5: Compute $c_{22}$ (Row 2 of $A$ $\cdot$ Column 2 of $B$).**
$$ c_{22} = (4)(8) + (5)(10) + (6)(12) = 32 + 50 + 72 = 154 $$

**Final Result:**
$$ C = \begin{bmatrix} 58 & 64 \\ 139 & 154 \end{bmatrix} $$

*Reflection:* Each element in $C$ is a specific collision between a row from $A$ and a column from $B$. The dimension collapse ($3$ elements per row/column reduced to $1$ sum) is why the inner dimensions must match.

## Diagrams

```text
Visualizing the "Run and Dive" method for computing element c_12:

Matrix A (Run across Row 1)       Matrix B (Dive down Col 2)
    [ 1   2   3 ]                           [  7   (8) ]
    [ 4   5   6 ]             X             [  9  (10) ]
                                            [ 11  (12) ]

                                  Matrix C (Result at Row 1, Col 2)
                              =             [ c_11  (c_12) ]
                                            [ c_21   c_22  ]

Calculation: c_12 = (1 * 8) + (2 * 10) + (3 * 12)
```

## Memory technique — remember this forever
1. **The Mnemonic:** "Run and Dive." To multiply matrices, you *run* across the rows of the first matrix, and *dive* down the columns of the second matrix. 
2. **The Facts to Overlearn:**
   * $(m \times n) \times (n \times p) \rightarrow (m \times p)$.
   * $AB \neq BA$. Order is absolute.
3. **Spaced-Repetition Schedule:** Review these facts and do one $2 \times 3$ by $3 \times 2$ multiplication by hand at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget how to multiply, remember that a matrix multiplied by a single column vector $A\vec{x}$ is just a linear combination of the columns of $A$. Multiplying $AB$ is just doing $A\vec{x}$ multiple times, once for every column vector inside $B$.

## Common mistakes
1. **Multiplying element-wise:** Students often try to multiply $a_{11}$ with $b_{11}$, $a_{12}$ with $b_{12}$, etc. This is wrong. Matrix multiplication is a row-by-column dot product.
2. **Ignoring order:** Writing $BA$ when the problem asks for $AB$. In a physics problem, applying a roll rotation then a pitch rotation yields a completely different orientation than pitch then roll.
3. **Misaligning dimensions:** Attempting to multiply a $2 \times 3$ matrix by a $4 \times 2$ matrix, panicking when they run out of numbers to multiply, and padding with zeros. If the inner dimensions don't match, the operation is undefined. Stop.

## Self-check
1. Matrix $X$ is $4 \times 5$. Matrix $Y$ is $5 \times 2$. Matrix $Z$ is $2 \times 7$. What are the dimensions of the matrix resulting from $(XY)Z$?
2. Let $A = \begin{bmatrix} 2 & 0 \\ -1 & 3 \end{bmatrix}$ and $B = \begin{bmatrix} 1 & 5 \\ 4 & -2 \end{bmatrix}$. Compute $AB$ and $BA$. Are they equal?
3. Let $P = \begin{bmatrix} 1 & -1 & 2 \\ 0 & 3 & 1 \end{bmatrix}$ and $Q = \begin{bmatrix} 2 \\ 1 \\ -1 \end{bmatrix}$. Compute $PQ$. What are the dimensions of the result?