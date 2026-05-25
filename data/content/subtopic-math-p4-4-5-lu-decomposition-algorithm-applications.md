## What it is
LU decomposition is a method for factoring a square matrix $A$ into the product of two matrices: a lower triangular matrix $L$ and an upper triangular matrix $U$. This factorization, $A=LU$, is the matrix equivalent of factoring an integer into its prime factors; it breaks down a complex object into simpler, more structured components.

## Why it matters
This decomposition is a cornerstone of numerical linear algebra, primarily used to solve systems of linear equations $A\vec{x} = \vec{b}$ efficiently. Once $A$ is factored into $LU$, solving $LU\vec{x} = \vec{b}$ becomes two fast steps: solving $L\vec{y} = \vec{b}$ and then $U\vec{x} = \vec{y}$. This is vastly cheaper than re-calculating the inverse or re-running Gaussian elimination if you need to solve for many different vectors $\vec{b}$ with the same matrix $A$, a common scenario in physics simulations and finite element analysis in aerospace engineering.

## When to study it
You must have a solid grasp of Gaussian elimination. Specifically, you need to understand how to use row operations to reduce a matrix to row echelon form. You should also understand that each row operation can be represented by multiplication with an elementary matrix. Without this foundation, the derivation of $L$ will seem like magic.

## How to study it (step by step)
1.  **Revisit Gaussian Elimination:** Take a 3x3 matrix and reduce it to an upper triangular form, $U$. Write down precisely which multiple of which row you subtract from another at each step. For example: "$R_2 \leftarrow R_2 - 3R_1$".
2.  **Connect to Elementary Matrices:** For each operation in step 1, write down the corresponding elementary matrix $E_i$. Recall that applying the operations is equivalent to matrix multiplication: $E_k \cdots E_2 E_1 A = U$.
3.  **Derive L:** From the previous step, solve for $A$: $A = (E_k \cdots E_1)^{-1} U = (E_1^{-1} E_2^{-1} \cdots E_k^{-1}) U$. The matrix $L$ is this product of inverses, $L = E_1^{-1} E_2^{-1} \cdots E_k^{-1}$.
4.  **Discover the Shortcut:** Compute the inverses from step 3. The inverse of "subtracting $c$ times row $j$ from row $i$" is "adding $c$ times row $j$ to row $i$". Notice that when you multiply these simple inverse matrices, the multipliers from step 1 just fall into place in the lower triangle of $L$. This is the core insight.
5.  **Practice the Algorithm:** Now, perform the decomposition on a new 3x3 matrix *without* writing out the elementary matrices. As you perform elimination to find $U$, simply record the multipliers directly into the corresponding positions of a lower triangular matrix $L$ (which has 1s on its diagonal).
6.  **Solve a System:** Use the $L$ and $U$ you just found to solve a system $A\vec{x}=\vec{b}$. First, solve $L\vec{y}=\vec{b}$ using forward substitution. Then, use the resulting vector $\vec{y}$ to solve $U\vec{x}=\vec{y}$ using backward substitution.

## Key ideas, with intuition
1.  **Decomposition simplifies solving.** The original problem $A\vec{x} = \vec{b}$ can be hard. Factoring it as $LU\vec{x} = \vec{b}$ lets us introduce an intermediate variable $\vec{y} = U\vec{x}$. This splits the problem into two easy ones:
    $$L\vec{y} = \vec{b} \quad \text{(solve for } \vec{y} \text{)}$$
    $$U\vec{x} = \vec{y} \quad \text{(solve for } \vec{x} \text{)}$$
    Solving systems with triangular matrices is fast because you can solve for one variable at a time.

2.  **Gaussian elimination *is* the algorithm.** The process of creating $U$ from $A$ via row operations is not separate from finding $L$. The operations themselves encode the information needed to build $L$. Think of $L$ as a "logbook" of the elimination process.

3.  **The structure of L.** For the standard (Doolittle) decomposition, $L$ is *unit* lower triangular (1s on the diagonal) and $U$ is upper triangular. The entry $l_{ij}$ for $i>j$ is precisely the multiple of row $j$ that you *subtracted* from row $i$ to create a zero in the $(i, j)$ position of $U$.
    $$
    A = \begin{pmatrix} 1 & 0 & 0 \\ l_{21} & 1 & 0 \\ l_{31} & l_{32} & 1 \end{pmatrix} \begin{pmatrix} u_{11} & u_{12} & u_{13} \\ 0 & u_{22} & u_{23} \\ 0 & 0 & u_{33} \end{pmatrix} = LU
    $$

## Worked example
Find the LU decomposition of $A = \begin{pmatrix} 2 & 1 & 1 \\ 4 & -6 & 0 \\ -2 & 7 & 2 \end{pmatrix}$.

**Step 1: Eliminate entries below the first pivot.**
The first pivot is $a_{11}=2$.
- To eliminate $a_{21}=4$, we need to subtract $2 \times$ Row 1 from Row 2. The multiplier is $l_{21}=2$.
  $R_2 \leftarrow R_2 - 2R_1$
- To eliminate $a_{31}=-2$, we need to subtract $-1 \times$ Row 1 from Row 3. The multiplier is $l_{31}=-1$.
  $R_3 \leftarrow R_3 - (-1)R_1 = R_3 + R_1$

This gives us an intermediate matrix:
$$
\begin{pmatrix} 2 & 1 & 1 \\ 0 & -8 & -2 \\ 0 & 8 & 3 \end{pmatrix}
$$

**Step 2: Eliminate entries below the second pivot.**
The second pivot is now $-8$.
- To eliminate the entry in the (3,2) position, which is 8, we need to subtract $-1 \times$ Row 2 from Row 3. The multiplier is $l_{32}=-1$.
  $R_3 \leftarrow R_3 - (-1)R_2 = R_3 + R_2$

This gives our final upper triangular matrix, $U$:
$$
U = \begin{pmatrix} 2 & 1 & 1 \\ 0 & -8 & -2 \\ 0 & 0 & 1 \end{pmatrix}
$$

**Step 3: Construct L.**
$L$ is a unit lower triangular matrix. We fill in the entries below the diagonal with the multipliers we just found.
- $l_{21} = 2$
- $l_{31} = -1$
- $l_{32} = -1$

$$
L = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ -1 & -1 & 1 \end{pmatrix}
$$

**Step 4: Verification.**
Check that $LU=A$.
$$
LU = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ -1 & -1 & 1 \end{pmatrix} \begin{pmatrix} 2 & 1 & 1 \\ 0 & -8 & -2 \\ 0 & 0 & 1 \end{pmatrix} = \begin{pmatrix} 2 & 1 & 1 \\ 4 & 2-8 & 2-2 \\ -2 & -1+8 & -1+2+1 \end{pmatrix} = \begin{pmatrix} 2 & 1 & 1 \\ 4 & -6 & 0 \\ -2 & 7 & 2 \end{pmatrix} = A
$$
The decomposition is correct. Each step in the elimination process directly gave us an entry for $L$ and a row for $U$.

## Diagrams
The process of solving $A\vec{x}=\vec{b}$ using the decomposition:
```text
                  +-----------------+
                  |  Solve Ax = b   |  (Hard)
                  +-----------------+
                         |
                         V
                  +-----------------+
                  | Factor A = LU   |
                  +-----------------+
                         |
                         V
                  +-----------------+
                  | Solve LUx = b   |
                  +-----------------+
                         |
          +--------------+--------------+
          |                             |
          V                             V
+-------------------+         +-------------------+
|  1. Solve Ly = b  | ------> |  2. Solve Ux = y  |
| (Forward Subst.)  |   y     | (Backward Subst.) |
+-------------------+         +-------------------+
```

Structure of the matrices:
```text
L (Lower Triangular)         U (Upper Triangular)
+-------------+              +-------------+
| 1  0  0 ... |              | *  *  * ... |
| *  1  0 ... |              | 0  *  * ... |
| *  *  1 ... |              | 0  0  * ... |
| :  :  :  .  |              | :  :  :  .  |
| *  *  * ...1|              | 0  0  0 ...*|
+-------------+              +-------------+
*: non-zero entries
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of Gaussian elimination as a "journey" from matrix $A$ to matrix $U$. You are taking steps to clear out the **L**ower part of the matrix. The steps you take on this journey are your "map". That map is the matrix **L**. The multiplier $l_{ij}$ is the instruction for how to clear the $(i, j)$ position.

2.  **Must-learn formulas:**
    $$ A = LU $$
    $$ \text{To solve } A\vec{x}=\vec{b}: \text{ first } L\vec{y}=\vec{b}, \text{ then } U\vec{x}=\vec{y} $$

3.  **Spaced Repetition Schedule:**
    - Day 1: Rework the example above from a blank sheet.
    - Day 3: Find the LU decomposition of a new 3x3 matrix.
    - Day 7: Solve a 3x3 system $A\vec{x}=\vec{b}$ using your decomposition.
    - Day 16: Explain in writing why $L = E_1^{-1} \cdots E_k^{-1}$.
    - Day 35: Teach the concept to a friend or a rubber duck.

4.  **First Principles Pathway:** If you forget the shortcut, derive it. Remember that elimination is $E_k \cdots E_1 A = U$. This means $A = (E_1^{-1} \cdots E_k^{-1})U$. So $L$ is the product of the inverses of the elementary matrices. An elementary matrix for $R_i \leftarrow R_i - c R_j$ is the identity matrix with a $-c$ at the $(i,j)$ position. Its inverse is the identity with a $+c$ at the $(i,j)$ position. Multiplying these simple matrices together just places the multipliers $c$ into the lower triangle.

## Common mistakes
1.  **Sign Errors in L:** The most common mistake. If you perform the operation $R_2 \leftarrow R_2 - 3R_1$, the entry in $L$ is $l_{21} = +3$, not $-3$. The matrix $L$ stores the multiplier that was *subtracted*.
2.  **Forgetting the 1s:** The matrix $L$ must have 1s on its diagonal (for Doolittle decomposition). Forgetting this will make the decomposition incorrect.
3.  **Row Swaps:** The basic LU algorithm fails if you need to swap rows to get a non-zero pivot. This requires a permutation matrix $P$, leading to the more general $PA=LU$ factorization. Do not attempt to use the simple LU algorithm if a row swap is necessary.

## Self-check
1.  Find the LU decomposition of $A = \begin{pmatrix} 3 & 1 \\ 9 & 5 \end{pmatrix}$.
2.  Given $A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 3 & 4 \\ 3 & 4 & 6 \end{pmatrix}$ and $\vec{b} = \begin{pmatrix} 1 \\ 1 \\ 2 \end{pmatrix}$, solve $A\vec{x}=\vec{b}$ using LU decomposition. Do not use any other method.
3.  What property must a matrix have to guarantee that an LU decomposition exists without the need for row swaps (i.e., without a permutation matrix $P$)? Hint: consider the pivots.