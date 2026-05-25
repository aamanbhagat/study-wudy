## What it is
The rank of a matrix $A$, denoted $\text{rank}(A)$, is the maximum number of linearly independent columns (or rows) in the matrix. It represents the dimension of the vector space spanned by its columns, known as the column space, which is geometrically the dimension of the image of the linear transformation represented by $A$.

## Why it matters
In machine learning, rank is central to dimensionality reduction techniques like Principal Component Analysis (PCA), where you approximate a high-rank data matrix with a low-rank one to find the most important features. In aerospace engineering, the rank of a system's controllability or observability matrix determines if a spacecraft's state (e.g., position, orientation) can be fully controlled by its thrusters or fully determined by its sensors. A rank-deficient matrix implies a loss of control or information.

## When to study it
You must have a firm grasp of the following concepts before proceeding. Do not continue if these are not solid.
*   **Vector spaces and subspaces:** Specifically, the definitions of column space, row space, and null space.
*   **Linear independence and span:** The ability to determine if a set of vectors is linearly independent and what it means for a set of vectors to span a space.
*   **Basis and dimension:** The definition of a basis for a vector space and the concept of dimension as the number of vectors in a basis.
*   **Gaussian elimination:** The process of reducing a matrix to row echelon form (REF) or reduced row echelon form (RREF).

## How to study it (step by step)
1.  **Revisit definitions.** Write down the definitions of column space, $\text{Col}(A)$, and row space, $\text{Row}(A)$, for a generic $m \times n$ matrix $A$. Write down the definitions of dimension and basis. (15 min)
2.  **Define ranks.** Define the column rank as $\text{dim}(\text{Col}(A))$ and the row rank as $\text{dim}(\text{Row}(A))$. Work through a simple $2 \times 3$ matrix and find a basis for its row space and column space by inspection, then compute the two ranks. (20 min)
3.  **Master the tool.** Take a $4 \times 5$ matrix and perform Gaussian elimination to find its reduced row echelon form (RREF). Identify the pivot columns and the non-zero rows. Count them. This number is the rank. (25 min)
4.  **Understand the mechanism.** Prove this small theorem: elementary row operations do not change the row space of a matrix. This is the *why* behind using RREF to find the row rank. (20 min)
5.  **Grapple with the main theorem.** Read a proof of the Rank-Nullity Theorem, which states $\text{rank}(A) + \text{nullity}(A) = n$. Then, read a proof that row rank equals column rank. Focus on the core idea: row operations preserve the linear dependence relations among the columns. (30 min)
6.  **Solve problems.** Find 5-7 problems of varying difficulty. Examples: find the rank of a given matrix; find the rank of a matrix with a variable entry $k$; determine for which $k$ the rank is maximal. (30 min)

## Key ideas, with intuition
1.  **Rank as "Output Dimension".** A matrix $A$ is a linear transformation. It takes input vectors $\vec{x}$ from its domain and maps them to output vectors $A\vec{x}$ in its codomain. The set of all possible outputs is the column space, $\text{Col}(A)$. The rank is simply the dimension of this output space. If $\text{rank}(A) = k$, the transformation squashes the entire input space into a $k$-dimensional subspace (e.g., a plane or a line).
    $$ \text{rank}(A) = \text{dim}(\text{Col}(A)) $$
2.  **Row Reduction Simplifies, Preserving the Essentials.** When you perform row operations on a matrix $A$ to get a simpler matrix $R$ (its RREF), you are changing the matrix. The column space of $A$ is generally *not* the same as the column space of $R$. However, two crucial things are preserved:
    *   The row space is unchanged: $\text{Row}(A) = \text{Row}(R)$.
    *   The linear dependence relations between columns are unchanged. If column 3 of $A$ was column 1 + column 2, then column 3 of $R$ will be column 1 + column 2.
3.  **Pivots are the Key.** The non-zero rows in the RREF of $A$ are clearly linearly independent and span the row space. Therefore, the number of pivots (leading 1s) is the dimension of the row space. Because the dependence relations are preserved, the pivot columns in the *original* matrix $A$ form a basis for the column space of $A$. The number of pivot columns is therefore the dimension of the column space.
4.  **The Main Theorem: Row Rank = Column Rank.** Since the number of pivots gives you both the dimension of the row space and the dimension of the column space, these two dimensions must be equal. This is a profound result. It connects the dimension of the output space ($\text{Col}(A)$) to the dimension of the space spanned by the rows, which define the constraints of the system of equations $A\vec{x} = \vec{0}$.
    $$ \text{dim}(\text{Col}(A)) = \text{dim}(\text{Row}(A)) = \text{Number of Pivots in RREF} $$

## Worked example
Find the rank of the matrix $A$:
$$ A = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 2 & 4 & 7 & 9 \\ -1 & -2 & -2 & -3 \end{pmatrix} $$

**Step 1: Reduce to Row Echelon Form (REF).**
We perform Gaussian elimination.
*   $R_2 \to R_2 - 2R_1$
*   $R_3 \to R_3 + R_1$

$$ \begin{pmatrix} 1 & 2 & 3 & 4 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 1 & 1 \end{pmatrix} $$

*   $R_3 \to R_3 - R_2$

$$ R = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 0 \end{pmatrix} $$
This is a row echelon form of $A$.

**Step 2: Identify Pivots and Count Them.**
The pivots are the first non-zero entries in each non-zero row. Here, they are in column 1 and column 3.
*   The element `1` in row 1, column 1.
*   The element `1` in row 2, column 3.
There are **2** pivots.

**Step 3: State the Rank.**
The rank of the matrix is the number of pivots.
$$ \text{rank}(A) = 2 $$

**Reflection:**
*   **Step 1** worked because row operations preserve the row space and the dependency relations between columns. The goal was to create a simpler matrix, $R$, where the dimension is obvious.
*   **Step 2** worked because the number of non-zero rows in the REF forms a basis for the row space of both $R$ and $A$. Their count, 2, is the row rank. Simultaneously, the columns containing the pivots (columns 1 and 3) indicate which columns of the *original* matrix $A$ form a basis for the column space. There are 2 such columns, so the column rank is 2.
*   **Step 3** is the conclusion. The fact that one number (the pivot count) gives both dimensions is the essence of the row rank = column rank theorem.

## Diagrams
This diagram illustrates the action of an $m \times n$ matrix $A$ of rank $k$. It maps the entire $n$-dimensional input space $\mathbb{R}^n$ into a $k$-dimensional subspace (the column space) within the $m$-dimensional codomain $\mathbb{R}^m$. The inputs that get mapped to the zero vector form the null space. The row space and null space are orthogonal complements within $\mathbb{R}^n$.

```text
       INPUT SPACE (R^n)                        OUTPUT SPACE (R^m)
  .------------------------.                    .--------------------.
  |                        |                    |                    |
  |      Row Space         |                    |                    |
  |  (dim = k = rank)      | --A--> (maps to)   |    Column Space    |
  |   Basis: k vectors     |                    | (dim = k = rank)   |
  |________________________|                    |____________________|
  |           ^            |                    |                    |
  |           | Orthogonal |                    |                    |
  |           v            |                    |                    |
  |-------Null Space-------| --A--> (squashes)  |       {0 vector}   |
  | (dim = n-k = nullity)  |                    |                    |
  |   Basis: n-k vectors   |                    |                    |
  '------------------------'                    '--------------------'
```

## Memory technique — remember this forever
1.  **Mnemonic:** "The **RANK** is the number of **PIVOTS** you **BANK** after row reduction." It's simple, operational, and correct. Rank is the count of "important" rows/columns, and pivots are how you identify them.

2.  **Must-know formulas:**
    $$ \text{rank}(A) = \text{dim}(\text{Col}(A)) = \text{dim}(\text{Row}(A)) $$
    $$ \text{rank}(A) = \text{Number of pivots in any echelon form of } A $$
    $$ \text{rank}(A) + \text{nullity}(A) = n \quad (\text{where } A \text{ is } m \times n) $$

3.  **Spaced Repetition Schedule:** Review this material and solve one related problem on Day 1, Day 3, Day 7, Day 16, and Day 35.

4.  **First Principles Pathway:** If you forget everything, remember this:
    *   The rank is the dimension of the column space.
    *   How do you find the dimension of a space spanned by a set of vectors (the columns)? You find a basis.
    *   How do you find a basis from a spanning set? You eliminate redundant (linearly dependent) vectors.
    *   Gaussian elimination is the tool for systematically identifying and eliminating these dependencies. The pivot columns of the original matrix are what remain—a basis for the column space. The number of them is the rank.

## Common mistakes
1.  **Confusing the Column Space of A and its RREF.** Students row reduce $A$ to $R$ and then claim the pivot columns of *R* form a basis for the column space of *A*. This is false. Row operations change the column space. You must use the pivot columns from the **original matrix A**.
2.  **Mistaking Matrix Dimensions for Rank.** A $5 \times 7$ matrix does not necessarily have rank 5 or 7. Its rank can be any integer from 0 (for the zero matrix) up to $\min(5, 7) = 5$. The rank is about linear independence, not size.
3.  **Counting Pivots Before Reaching Echelon Form.** You cannot just count the first non-zero entry in each row of the original matrix. The matrix *must* be in row echelon form for the pivot count to equal the rank.
4.  **Forgetting the Nullity.** The rank only tells part of the story. For an $m \times n$ matrix, the Rank-Nullity theorem ($\text{rank}(A) + \text{nullity}(A) = n$) is the other half. The rank describes the dimension of the output, while the nullity describes the dimension of the input that gets "lost" (mapped to zero).

## Self-check
1.  Let $A = \begin{pmatrix} 1 & 1 & 2 \\ 2 & 2 & 5 \\ 3 & 3 & 6 \end{pmatrix}$. What is $\text{rank}(A)$?
2.  Let $A$ be a $4 \times 6$ matrix. What are the maximum and minimum possible values for $\text{rank}(A)$? What does a rank of 0 imply? What does the maximum possible rank imply about the linear independence of the rows of $A$?
3.  Construct a $3 \times 3$ non-zero matrix $A$ such that the vector $\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$ is in $\text{Col}(A)$ but the vector $\begin{pmatrix} 3 \\ 2 \\ 1 \end{pmatrix}$ is not. What is the minimum possible rank of your matrix? What is the maximum?