## What it is
A matrix is a rectangular array of numbers, symbols, or expressions, arranged in rows and columns. An $m \times n$ matrix has $m$ rows and $n$ columns, and serves as a container for data or as an object representing a linear transformation between vector spaces.

## Why it matters
Matrices are the workhorses of computational science. In machine learning, they store data and represent the weights of neural networks. In physics and aerospace, they solve large systems of linear equations governing structural mechanics and circuits, and they represent rotations and other transformations essential for describing motion and fields in 3D space.

## When to study it
You should be comfortable with basic algebra, including manipulating variables and solving simple equations. A solid understanding of vectors as ordered lists of numbers is essential. Familiarity with the concept of a system of linear equations is helpful context but not strictly required, as matrices provide a powerful new way to understand them.

## How to study it (step by step)
1.  **Notation and Terminology:** Get the basics down. A matrix $A$ with $m$ rows and $n$ columns is $m \times n$. The entry in the $i$-th row and $j$-th column is denoted $A_{ij}$ or $a_{ij}$. Practice identifying elements and dimensions of given matrices.
2.  **Element-wise Operations:** Master matrix addition/subtraction and scalar multiplication. These are intuitive: for $C = A+B$, $C_{ij} = A_{ij} + B_{ij}$. For $C = kA$, $C_{ij} = k \cdot A_{ij}$. Note that for addition, matrices must have the exact same dimensions.
3.  **Matrix-Vector Product:** Before general matrix multiplication, understand how a matrix $A$ acts on a vector $\vec{x}$. The result $\vec{y} = A\vec{x}$ is a new vector, where the $i$-th component $y_i$ is the dot product of the $i$-th row of $A$ with the vector $\vec{x}$. This is the "matrix as transformation" viewpoint.
4.  **Matrix-Matrix Product:** Now generalize. The product $C = AB$ is defined such that the entry $C_{ij}$ is the dot product of the $i$-th row of $A$ and the $j$-th column of $B$. For this to be defined, the number of columns in $A$ must equal the number of rows in $B$. If $A$ is $m \times n$ and $B$ is $n \times p$, the result $C$ is $m \times p$.
5.  **Derive the "Why":** Understand that matrix multiplication is defined this way because it corresponds to the composition of linear transformations. If transformation $T_B$ is represented by matrix $B$, and $T_A$ by matrix $A$, then applying $T_B$ then $T_A$ is equivalent to a single transformation $T_C$ represented by the matrix product $C=AB$.
6.  **Special Matrices:** Learn to identify and use key matrix types: the identity matrix ($I$), the zero matrix ($0$), diagonal matrices, symmetric matrices ($A = A^T$), and triangular matrices (upper and lower). Understand their roles in simplifying calculations.

## Key ideas, with intuition
1.  **Matrices as Data Tables:** At its simplest, a matrix is just a grid for organizing numbers. A grayscale image can be a matrix of pixel intensities. A financial statement can be a matrix where rows are products and columns are months.

2.  **Matrices as Transformations:** This is the central idea in linear algebra. An $m \times n$ matrix $A$ is a function that transforms $n$-dimensional vectors into $m$-dimensional vectors. It can rotate, scale, shear, or project vectors. For example, the matrix
    $$
    R = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}
    $$
    takes a 2D vector $\vec{v} = \begin{pmatrix} x \\ y \end{pmatrix}$ and rotates it counter-clockwise by an angle $\theta$ to produce a new vector $R\vec{v}$.

3.  **Matrix Multiplication is Composition of Transformations:** The seemingly strange rule for matrix multiplication is precisely the rule needed for this to work. If you apply transformation $B$ to a vector $\vec{x}$ to get $\vec{y} = B\vec{x}$, and then apply transformation $A$ to get $\vec{z} = A\vec{y}$, the combined operation is $\vec{z} = A(B\vec{x})$. The single matrix that does this in one step is the product $C = AB$, so $\vec{z} = (AB)\vec{x}$. The formula for the elements of $AB$ falls directly out of this requirement.

4.  **Dimensions Must Match for a Reason:** The rules for dimensions aren't arbitrary.
    *   **Addition ($A+B$):** You add corresponding elements, so the matrices must have the same shape ($m \times n$).
    *   **Multiplication ($AB$):** If $A$ is $m \times n$ and $B$ is $n \times p$, $A$ maps $\mathbb{R}^n \to \mathbb{R}^m$ and $B$ maps $\mathbb{R}^p \to \mathbb{R}^n$. For the composition $A \circ B$ to make sense, the output space of $B$ ($\mathbb{R}^n$) must match the input space of $A$ ($\mathbb{R}^n$). The inner dimensions ($n$ and $n$) must be equal.

## Worked example
Let $A = \begin{pmatrix} 1 & 3 \\ -2 & 0 \end{pmatrix}$ and $B = \begin{pmatrix} 4 & 1 & 5 \\ 2 & -1 & 0 \end{pmatrix}$. Calculate the product $C = AB$.

1.  **Check dimensions.** $A$ is $2 \times 2$. $B$ is $2 \times 3$. The inner dimensions match (2 and 2). The resulting matrix $C$ will be $2 \times 3$.
    $$
    C = \begin{pmatrix} C_{11} & C_{12} & C_{13} \\ C_{21} & C_{22} & C_{23} \end{pmatrix}
    $$

2.  **Calculate $C_{11}$**. This is the dot product of Row 1 of $A$ and Column 1 of $B$.
    $$
    C_{11} = (\text{Row 1 of A}) \cdot (\text{Col 1 of B}) = \begin{pmatrix} 1 & 3 \end{pmatrix} \cdot \begin{pmatrix} 4 \\ 2 \end{pmatrix} = (1)(4) + (3)(2) = 4 + 6 = 10
    $$

3.  **Calculate $C_{12}$**. Dot product of Row 1 of $A$ and Column 2 of $B$.
    $$
    C_{12} = \begin{pmatrix} 1 & 3 \end{pmatrix} \cdot \begin{pmatrix} 1 \\ -1 \end{pmatrix} = (1)(1) + (3)(-1) = 1 - 3 = -2
    $$

4.  **Calculate $C_{13}$**. Dot product of Row 1 of $A$ and Column 3 of $B$.
    $$
    C_{13} = \begin{pmatrix} 1 & 3 \end{pmatrix} \cdot \begin{pmatrix} 5 \\ 0 \end{pmatrix} = (1)(5) + (3)(0) = 5 + 0 = 5
    $$

5.  **Calculate $C_{21}$**. Dot product of Row 2 of $A$ and Column 1 of $B$.
    $$
    C_{21} = \begin{pmatrix} -2 & 0 \end{pmatrix} \cdot \begin{pmatrix} 4 \\ 2 \end{pmatrix} = (-2)(4) + (0)(2) = -8 + 0 = -8
    $$

6.  **Calculate $C_{22}$**. Dot product of Row 2 of $A$ and Column 2 of $B$.
    $$
    C_{22} = \begin{pmatrix} -2 & 0 \end{pmatrix} \cdot \begin{pmatrix} 1 \\ -1 \end{pmatrix} = (-2)(1) + (0)(-1) = -2 + 0 = -2
    $$

7.  **Calculate $C_{23}$**. Dot product of Row 2 of $A$ and Column 3 of $B$.
    $$
    C_{23} = \begin{pmatrix} -2 & 0 \end{pmatrix} \cdot \begin{pmatrix} 5 \\ 0 \end{pmatrix} = (-2)(5) + (0)(0) = -10 + 0 = -10
    $$

8.  **Assemble the final matrix.**
    $$
    C = AB = \begin{pmatrix} 10 & -2 & 5 \\ -8 & -2 & -10 \end{pmatrix}
    $$

*Reflection:* Each step was a systematic application of the row-by-column rule. The dimension check at the start prevented errors and predicted the shape of the answer, which is a crucial sanity check.

## Diagrams
This ASCII diagram shows the data flow for calculating a single element, $C_{ij}$, in the product $C=AB$.

```text
              Matrix B (n x p)
              . . . j . .
              . . . | . .
              . . . v . .
              . . . B_kj. .
              . . . | . .
              . . . v . .

Matrix A (m x n)
. . . . . . .   ->   Matrix C (m x p)
. . . . . . .   ->   . . . . . .
i - - A_ik- - - ->   i - - C_ij- -
. . . . . . .   ->   . . . . . .
. . . . . . .   ->   . . . . . .

To compute C_ij, you take the dot product of row i from A and column j from B.
C_ij = Sum over k (A_ik * B_kj)
```

## Memory technique — remember this forever
1.  **Mnemonic:** For matrix multiplication, think **RC**: **R**ow by **C**olumn. To get the element in row $i$ and column $j$ of the product, you always use row $i$ of the first matrix and column $j$ of the second. Visualize sweeping your left index finger across the row and your right index finger down the column, multiplying pairs as you go.

2.  **Must-know formulas:**
    *   **The Rule:** $(AB)_{ij} = \sum_{k=1}^{n} A_{ik} B_{kj}$
    *   **The Dimensions:** $(m \times n) \cdot (n \times p) \to (m \times p)$. The inner dimensions must match.

3.  **Spaced Repetition Schedule:** Redo a matrix multiplication problem from scratch at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days**. Do not just read it; write it out.

4.  **First Principles Pathway:** If you forget the formula, re-derive it from the composition of transformations.
    *   Let $\vec{y} = B\vec{x}$ and $\vec{z} = A\vec{y}$. The combined transformation is $\vec{z} = (AB)\vec{x}$.
    *   Write it out in components: $y_k = \sum_j B_{kj} x_j$ and $z_i = \sum_k A_{ik} y_k$.
    *   Substitute the expression for $y_k$ into the equation for $z_i$:
        $$z_i = \sum_k A_{ik} \left( \sum_j B_{kj} x_j \right)$$
    *   Rearrange the sums:
        $$z_i = \sum_j \left( \sum_k A_{ik} B_{kj} \right) x_j$$
    *   This is the definition of a matrix-vector product, $z_i = \sum_j C_{ij} x_j$. By comparing the two expressions, you can see that the term in the parenthesis *is* the formula for the element $(AB)_{ij}$.

## Common mistakes
1.  **Assuming $AB = BA$ (Commutativity).** Matrix multiplication is not commutative. Calculate $BA$ from the worked example. You can't even do it, because the dimensions ($2 \times 3$ times $2 \times 2$) do not match. Even for square matrices, it's rarely true.
2.  **Element-wise Multiplication.** Never multiply matrices by simply multiplying corresponding elements ($A_{11}B_{11}$, $A_{12}B_{12}$, etc.). This is a different, less common operation called the Hadamard product.
3.  **Forgetting the Dimension Check.** Always check that the inner dimensions match before you start multiplying. If you have a $3 \times 2$ matrix and a $3 \times 4$ matrix, you cannot multiply them in that order.

## Self-check
1.  Let $A = \begin{pmatrix} 1 & 0 & 5 \\ -2 & 3 & 1 \end{pmatrix}$ and $B = \begin{pmatrix} 0 & -1 & 1 \\ 4 & 9 & -3 \end{pmatrix}$. Compute $A-2B$.
2.  Let $C = \begin{pmatrix} 1 & 2 \\ 3 & 4 \\ 5 & 6 \end{pmatrix}$ and $D = \begin{pmatrix} 0 & 1 & 2 & 3 \\ 4 & 5 & 6 & 7 \end{pmatrix}$. What are the dimensions of $CD$? Calculate the element in the 3rd row and 4th column of the product $CD$.
3.  Let $A$ be any $2 \times 2$ matrix. Find a $2 \times 2$ matrix $B$, not the zero matrix, such that $AB$ is the zero matrix. What does this tell you about matrix algebra compared to the algebra of real numbers (where if $ab=0$, then $a=0$ or $b=0$)?