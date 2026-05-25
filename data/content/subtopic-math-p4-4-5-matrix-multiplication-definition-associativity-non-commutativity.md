## What it is
Matrix multiplication is a binary operation that produces a single matrix from two matrices. It is defined such that if matrix $A$ represents a linear transformation $T_A$ and matrix $B$ represents a linear transformation $T_B$, their product $AB$ represents the composite transformation $T_A \circ T_B$ (applying $T_B$ first, then $T_A$). This leads to a "row-by-column" rule for computation.

## Why it matters
This operation is the core of linear algebra and appears everywhere that linear transformations are chained. In computer graphics, it combines rotation, scaling, and translation matrices to position objects. In aerospace, it describes a sequence of rotations for a vehicle's attitude (roll, pitch, yaw). In machine learning, it is the fundamental operation in each layer of a neural network, transforming input data.

## When to study it
You must be fluent with vectors, vector spaces, and the definition of a linear transformation. Specifically, you should understand that a matrix is a representation of a linear transformation with respect to a chosen basis, and how to apply a matrix to a vector ($A\mathbf{x}$). Familiarity with dot products and summation notation ($\Sigma$) is also essential.

## How to study it (step by step)
1.  **Derive the rule from first principles.** Start with two linear maps, $T_B: \mathbb{R}^p \to \mathbb{R}^n$ with matrix $B$ and $T_A: \mathbb{R}^n \to \mathbb{R}^m$ with matrix $A$. Write out the composition $T_A \circ T_B$ and find the matrix $C$ that represents it. Do this by tracking where the standard basis vectors of $\mathbb{R}^p$ land. This will produce the formula for $C=AB$.
2.  **Mechanize the row-by-column rule.** Take two generic matrices, $A_{m \times n}$ and $B_{n \times p}$, and practice computing the entries of the product $C_{m \times p}$. Focus on the indices: the entry $C_{ij}$ is the dot product of row $i$ of $A$ and column $j$ of $B$.
3.  **Prove associativity.** Show that $(AB)C = A(BC)$. Do not just multiply out generic matrices, as that is a nightmare of indices. Instead, use the insight from step 1: matrix multiplication corresponds to function composition, and function composition is inherently associative. Let the matrices $A, B, C$ correspond to maps $T_A, T_B, T_C$. Then $(AB)C$ corresponds to $(T_A \circ T_B) \circ T_C$ and $A(BC)$ corresponds to $T_A \circ (T_B \circ T_C)$. Since these are equal, the matrix products must be equal.
4.  **Prove non-commutativity with a counterexample.** Find two simple $2 \times 2$ matrices, $A$ and $B$, for which $AB \neq BA$. Geometric transformations are a good source: try a rotation and a shear. This will build your intuition for *why* order matters.
5.  **Internalize the dimension compatibility rule.** The product $AB$ is only defined if the number of columns in $A$ equals the number of rows in $B$. If $A$ is $m \times n$ and $B$ is $n \times p$, the result is $m \times p$. Drill this until it is automatic.

## Key ideas, with intuition
1.  **Multiplication is Composition.** This is the most important idea. Forget the row-by-column rule for a moment. Matrix multiplication is the way we find the matrix for a *sequence* of linear transformations. If you apply transformation $B$, then transformation $A$, the resulting single transformation is represented by the matrix product $AB$.
    $$
    \mathbf{x} \xrightarrow{\text{apply } B} B\mathbf{x} \xrightarrow{\text{apply } A} A(B\mathbf{x}) = (AB)\mathbf{x}
    $$
2.  **The Row-by-Column Rule.** The mechanics follow from the composition idea. The entry in the $i$-th row and $j$-th column of the product matrix $C=AB$ is the dot product of the $i$-th row of $A$ and the $j$-th column of $B$.
    $$
    C_{ij} = (AB)_{ij} = \sum_{k=1}^{n} A_{ik}B_{kj}
    $$
    Think of the $i$-th row of $A$ as telling you how to combine the rows of $B$ to produce the $i$-th row of the product $C$. Or, think of the $j$-th column of $B$ as telling you how to combine the columns of $A$ to produce the $j$-th column of $C$.

3.  **Dimension Mismatch Blocks Multiplication.** For $A(B\mathbf{x})$ to make sense, the output vectors of $B$ (which have a dimension equal to the number of rows in $B$) must be valid input vectors for $A$ (which must have a dimension equal to the number of columns in $A$). Therefore, `cols(A)` must equal `rows(B)`. The "inner" dimensions must match: $(m \times \mathbf{n})(\mathbf{n} \times p) \to (m \times p)$.

4.  **Non-Commutativity means Order Matters.** In the real world, the order of operations matters. Rotating your phone 90 degrees and then tilting it forward is not the same as tilting it forward and then rotating it. Since matrices represent these transformations, their multiplication must also be order-dependent. $AB$ is not, in general, equal to $BA$.

## Worked example
Let $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$ and $B = \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix}$. Compute $AB$ and $BA$.

**Step 1: Compute AB**
The result will be a $2 \times 2$ matrix. Let's call it $C = AB$.
$$
C = \begin{pmatrix} c_{11} & c_{12} \\ c_{21} & c_{22} \end{pmatrix}
$$
-   $c_{11}$ (row 1 of A $\cdot$ col 1 of B): $(1)(5) + (2)(7) = 5 + 14 = 19$.
-   $c_{12}$ (row 1 of A $\cdot$ col 2 of B): $(1)(6) + (2)(8) = 6 + 16 = 22$.
-   $c_{21}$ (row 2 of A $\cdot$ col 1 of B): $(3)(5) + (4)(7) = 15 + 28 = 43$.
-   $c_{22}$ (row 2 of A $\cdot$ col 2 of B): $(3)(6) + (4)(8) = 18 + 32 = 50$.

So, $AB = \begin{pmatrix} 19 & 22 \\ 43 & 50 \end{pmatrix}$.

**Step 2: Compute BA**
The result will be a $2 \times 2$ matrix. Let's call it $D = BA$.
$$
D = \begin{pmatrix} d_{11} & d_{12} \\ d_{21} & d_{22} \end{pmatrix}
$$
-   $d_{11}$ (row 1 of B $\cdot$ col 1 of A): $(5)(1) + (6)(3) = 5 + 18 = 23$.
-   $d_{12}$ (row 1 of B $\cdot$ col 2 of A): $(5)(2) + (6)(4) = 10 + 24 = 34$.
-   $d_{21}$ (row 2 of B $\cdot$ col 1 of A): $(7)(1) + (8)(3) = 7 + 24 = 31$.
-   $d_{22}$ (row 2 of B $\cdot$ col 2 of A): $(7)(2) + (8)(4) = 14 + 32 = 46$.

So, $BA = \begin{pmatrix} 23 & 34 \\ 31 & 46 \end{pmatrix}$.

**Reflection:**
Each step worked by systematically applying the row-by-column dot product rule. We computed the entry in the $i$-th row and $j$-th column of the product by taking the dot product of the $i$-th row of the first matrix and the $j$-th column of the second. The final result clearly shows that $AB \neq BA$, demonstrating non-commutativity.

## Diagrams
This diagram illustrates the calculation of the entry $C_{ij}$ in the product $C=AB$. You "sweep" the $i$-th row of $A$ across and the $j$-th column of $B$ down, multiply corresponding elements, and sum them up.

```text
      [ B ]
      col j
        |
        v
[ A ]-> [ C ]
row i -> C_ij
```

A more detailed view for computing $C_{21}$ in the worked example:

```text
        B = | 5  6 |
            | 7  8 |
              ^
              |
      col 1 --+


A = | 1  2 |
    | 3  4 | --+---> C = | c11 c12 |
      row 2   |         | c21 c22 |
              |
              +----------- c21 = (3 * 5) + (4 * 7) = 43
```

## Memory technique — remember this forever
1.  **Mnemonic:** "RC Cola" or "Rowman Catholic". **R**ow by **C**olumn. To get the $(i, j)$ entry of the product, you use row $i$ of the first matrix and column $j$ of the second.

2.  **Must-know formulas:**
    *   The definition: $(AB)_{ij} = \sum_{k=1}^{n} A_{ik}B_{kj}$
    *   The dimension rule: $(m \times n) \cdot (n \times p) \to (m \times p)$

3.  **Spaced Repetition Schedule:** Review this material and re-do the worked example from scratch at:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget everything, rebuild it from the composition of linear transformations.
    *   A linear map $T$ is represented by a matrix $A$ where the $j$-th column of $A$ is $T(\mathbf{e}_j)$, the image of the $j$-th basis vector.
    *   Consider the composition $T_A \circ T_B$. What is its matrix, $C$?
    *   The $j$-th column of $C$ is $(T_A \circ T_B)(\mathbf{e}_j) = T_A(T_B(\mathbf{e}_j))$.
    *   $T_B(\mathbf{e}_j)$ is just the $j$-th column of matrix $B$, let's call it $\mathbf{b}_j$.
    *   So, the $j$-th column of $C$ is $A\mathbf{b}_j$.
    *   The entry $C_{ij}$ is the $i$-th component of the vector $A\mathbf{b}_j$. This is the dot product of the $i$-th row of $A$ with the vector $\mathbf{b}_j$ (which is the $j$-th column of $B$). This reconstructs the row-by-column rule.

## Common mistakes
1.  **Element-wise multiplication.** Multiplying entries at the same position, $(AB)_{ij} = A_{ij}B_{ij}$. This is a different operation called the Hadamard product, not standard matrix multiplication.
2.  **Assuming commutativity.** Calculating $AB$ when the problem requires $BA$. They are almost never the same. The order in the expression is the order of multiplication.
3.  **Dimension errors.** Trying to multiply matrices where the inner dimensions do not match, e.g., a $3 \times 2$ matrix by a $3 \times 3$ matrix. Or, getting the dimensions of the resulting matrix wrong. Remember: $(m \times n)(n \times p) \to (m \times p)$.

## Self-check
1.  Let $A = \begin{pmatrix} 2 & -1 \\ 0 & 3 \end{pmatrix}$ and $B = \begin{pmatrix} 1 & 4 \\ 5 & -2 \end{pmatrix}$. Compute $AB$ and $BA$.
2.  Let $C = \begin{pmatrix} 1 & 0 & 2 \\ -1 & 3 & 1 \end{pmatrix}$ and $D = \begin{pmatrix} 3 & 1 \\ 2 & 1 \\ 1 & 0 \end{pmatrix}$. Is $CD$ defined? Is $DC$ defined? If so, compute the one(s) that exist.
3.  Let $R_\theta = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$ be the matrix for a rotation by angle $\theta$. By computing the product, show that $R_\alpha R_\beta = R_{\alpha+\beta}$. Does $R_\beta R_\alpha$ equal $R_\alpha R_\beta$? What does this imply about the composition of rotations in 2D?