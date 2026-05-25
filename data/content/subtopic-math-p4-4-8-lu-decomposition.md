## What it is
LU decomposition is a method for factorizing a square matrix $A$ into the product of two other matrices: a lower triangular matrix $L$ and an upper triangular matrix $U$. The factorization is written as $A = LU$. This is the matrix equivalent of factoring an integer, like writing $12 = 3 \times 4$.

## Why it matters
This isn't just an academic exercise. Solving the linear system $A\vec{x} = \vec{b}$ is a core task in science and engineering. If you have the LU decomposition of $A$, you can solve the system extremely efficiently by solving two much simpler triangular systems back-to-back. This technique is fundamental in finite element analysis (FEA) for structural simulation in aerospace, computational fluid dynamics (CFD), and solving the large-scale optimization problems that underpin modern machine learning.

## When to study it
You must be proficient with the following before proceeding:
1.  **Matrix Algebra:** Multiplication, inverses, and identity matrices.
2.  **Gaussian Elimination:** You should be able to row-reduce a matrix to row echelon form without hesitation.
3.  **Elementary Matrices:** Understand that each row operation in Gaussian elimination corresponds to left-multiplication by a specific "elementary" matrix.
4.  **Solving Triangular Systems:** You must understand why solving $U\vec{x}=\vec{y}$ is easy using backward substitution and solving $L\vec{y}=\vec{b}$ is easy using forward substitution.

If these concepts are not solid, master them first. LU decomposition builds directly upon them.

## How to study it (step by step)
1.  **Revisit Gaussian Elimination as Matrix Multiplication.** Take a 3x3 matrix $A$ and perform the row operations to get it into upper triangular form, $U$. For each operation (e.g., $R_2 \to R_2 - 3R_1$), write down the corresponding elementary matrix $E_i$. Verify that $E_k \dots E_2 E_1 A = U$.
2.  **Derive L from first principles.** Using the result from step 1, algebraically solve for $A$: $A = (E_1^{-1} E_2^{-1} \dots E_k^{-1}) U$. Compute the inverse of each elementary matrix (it's trivial—just flip the sign of the off-diagonal entry). Define $L = E_1^{-1} E_2^{-1} \dots E_k^{-1}$ and compute this product. Notice its structure.
3.  **Learn the direct algorithm.** The derivation shows why it works, but in practice, we don't form the elementary matrices. Perform Gaussian elimination on $A$ to find $U$. As you proceed, populate the entries of $L$ directly: if you use the operation $R_i \to R_i - c \cdot R_j$, you simply set the entry $l_{ij} = c$. The diagonal entries of $L$ are always 1 (this is called the Doolittle method).
4.  **Solve a system.** Pick a matrix $A$ and a vector $\vec{b}$. First, find $A=LU$. Then, solve the system $A\vec{x}=\vec{b}$ by first solving $L\vec{y}=\vec{b}$ for $\vec{y}$ (forward substitution) and then solving $U\vec{x}=\vec{y}$ for $\vec{x}$ (backward substitution).
5.  **Consider failure cases.** Find a simple matrix for which the standard LU decomposition fails (hint: what happens if a pivot is zero?). Understand how row-swapping fixes this and leads to the more general $PA=LU$ decomposition, where $P$ is a permutation matrix.

## Key ideas, with intuition
1.  **Factoring a hard problem into two easy ones.** The core insight is that solving $A\vec{x}=\vec{b}$ is computationally expensive (roughly $O(n^3)$ operations). However, solving a triangular system is cheap ($O(n^2)$). By factoring $A=LU$, we replace the one hard problem with two easy ones:
    $$A\vec{x} = \vec{b} \implies (LU)\vec{x} = \vec{b} \implies L(U\vec{x}) = \vec{b}$$
    Let $\vec{y} = U\vec{x}$. The problem becomes:
    -   Step 1 (easy): Solve $L\vec{y} = \vec{b}$ for $\vec{y}$.
    -   Step 2 (easy): Solve $U\vec{x} = \vec{y}$ for $\vec{x}$.

2.  **Gaussian Elimination *is* the decomposition algorithm.** The matrix $U$ is simply the end result of performing Gaussian elimination on $A$. The matrix $L$ is a compact record of the operations you performed to get there. It's not a separate, magical process; it's a clever bookkeeping of an algorithm you already know.

3.  **$L$ stores the multipliers.** Imagine you are reducing $A$. To eliminate the entry in row 2, column 1, you perform $R_2 \to R_2 - m_{21}R_1$. The multiplier $m_{21}$ is precisely the value you store in $L$ at that position: $l_{21} = m_{21}$. The matrix $L$ is an identity matrix plus all the multipliers in the positions they were used to eliminate.
    $$
    L = \begin{pmatrix}
    1 & 0 & 0 \\
    l_{21} & 1 & 0 \\
    l_{31} & l_{32} & 1
    \end{pmatrix}
    $$
    Here, $l_{21}$ is the multiplier used to zero out $a_{21}$, $l_{31}$ zeros out $a_{31}$, and $l_{32}$ zeros out the new $a_{32}$.

## Worked example
Let's find the LU decomposition of $A = \begin{pmatrix} 2 & 1 & 1 \\ 4 & -6 & 0 \\ -2 & 7 & 2 \end{pmatrix}$.

**Step 1: Find U by eliminating downwards.**
We start with $A$. Our goal is an upper triangular matrix $U$.
The first pivot is $a_{11}=2$.
-   To eliminate $a_{21}=4$, we need to subtract $2 \times R_1$ from $R_2$. The multiplier is $m_{21}=2$.
    $R_2 \to R_2 - 2R_1$:
    $$
    \begin{pmatrix} 2 & 1 & 1 \\ 4-2(2) & -6-2(1) & 0-2(1) \\ -2 & 7 & 2 \end{pmatrix}
    =
    \begin{pmatrix} 2 & 1 & 1 \\ 0 & -8 & -2 \\ -2 & 7 & 2 \end{pmatrix}
    $$
-   To eliminate $a_{31}=-2$, we need to add $1 \times R_1$ to $R_3$. The multiplier is $m_{31}=-1$.
    $R_3 \to R_3 - (-1)R_1$:
    $$
    \begin{pmatrix} 2 & 1 & 1 \\ 0 & -8 & -2 \\ -2-(-1)(2) & 7-(-1)(1) & 2-(-1)(1) \end{pmatrix}
    =
    \begin{pmatrix} 2 & 1 & 1 \\ 0 & -8 & -2 \\ 0 & 8 & 3 \end{pmatrix}
    $$
Now we move to the second pivot, which is $-8$.
-   To eliminate the entry below it (the 8), we need to add $1 \times R_2$ to $R_3$. The multiplier is $m_{32}=-1$.
    $R_3 \to R_3 - (-1)R_2$:
    $$
    \begin{pmatrix} 2 & 1 & 1 \\ 0 & -8 & -2 \\ 0 & 8-(-1)(-8) & 3-(-1)(-2) \end{pmatrix}
    =
    \begin{pmatrix} 2 & 1 & 1 \\ 0 & -8 & -2 \\ 0 & 0 & 1 \end{pmatrix}
    $$
This final matrix is our upper triangular matrix, $U$.
$$
U = \begin{pmatrix} 2 & 1 & 1 \\ 0 & -8 & -2 \\ 0 & 0 & 1 \end{pmatrix}
$$

**Step 2: Construct L from the multipliers.**
We construct $L$ by placing each multiplier $m_{ij}$ into the $(i, j)$ position of an identity matrix.
-   $l_{21} = m_{21} = 2$
-   $l_{31} = m_{31} = -1$
-   $l_{32} = m_{32} = -1$
So,
$$
L = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ -1 & -1 & 1 \end{pmatrix}
$$

**Step 3: Verification.**
Let's check if $LU = A$.
$$
LU = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ -1 & -1 & 1 \end{pmatrix}
\begin{pmatrix} 2 & 1 & 1 \\ 0 & -8 & -2 \\ 0 & 0 & 1 \end{pmatrix}
=
\begin{pmatrix}
1(2)+0+0 & 1(1)+0+0 & 1(1)+0+0 \\
2(2)+1(0)+0 & 2(1)+1(-8)+0 & 2(1)+1(-2)+0 \\
-1(2)-1(0)+0 & -1(1)-1(-8)+0 & -1(1)-1(-2)+1(1)
\end{pmatrix}
=
\begin{pmatrix} 2 & 1 & 1 \\ 4 & -6 & 0 \\ -2 & 7 & 2 \end{pmatrix}
= A
$$
The decomposition is correct. Each step had a clear purpose: the elimination systematically produced the simplified matrix $U$, and the multipliers used in that process were recorded to form the "undo" matrix $L$.

## Diagrams
The process of solving $A\vec{x}=\vec{b}$ using the decomposition:
```text
      +-----------------+         +-----------------+
      | Solve Ax = b    |         | (Hard Problem)  |
      +-----------------+         +-----------------+
              |
              | Decompose A = LU
              V
+---------------------------+     +---------------------------+
| Step 1: Solve Ly = b      | --> | Step 2: Solve Ux = y      |
| (Forward Substitution)    |     | (Backward Substitution)   |
+---------------------------+     +---------------------------+
              |                               |
              V                               V
      Solution for y                  Final solution for x
```
Structure of the matrices:
```text
      A            =            L            *            U
[x x x x]        [1 0 0 0]        [x x x x]
[x x x x]        [l 1 0 0]        [0 x x x]
[x x x x]        [l l 1 0]        [0 0 x x]
[x x x x]        [l l l 1]        [0 0 0 x]

(Full Matrix)  (Lower Triangular)   (Upper Triangular)
x = non-zero value
l = multiplier
0 = zero
1 = one
```

## Memory technique — remember this forever
1.  **Mnemonic:** "LU" = **L**azy **U**niversity. Why? Because it's the "lazy" way to solve a system many times. You do the hard **U**niversity-level work (the $O(n^3)$ decomposition) once, then you can solve for any new $\vec{b}$ vector with the "lazy" $O(n^2)$ substitutions.
2.  **Must overlearn:**
    -   $A = LU$
    -   Solve $A\vec{x}=\vec{b}$ in two steps:
        1.  Solve $L\vec{y}=\vec{b}$ for $\vec{y}$.
        2.  Solve $U\vec{x}=\vec{y}$ for $\vec{x}$.
3.  **Spaced Repetition:** Review this material and re-do the worked example from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget the algorithm for $L$, remember the derivation. Gaussian elimination is $E_k \dots E_1 A = U$. Therefore, $A = (E_1^{-1} \dots E_k^{-1})U$. This product of inverses *is* $L$. The inverse of an elementary matrix that performs $R_i \to R_i - c R_j$ is simply the matrix that performs $R_i \to R_i + c R_j$. When you multiply these simple inverse matrices together, the multipliers `c` just slot into the lower triangle of an identity matrix. You can always rebuild $L$ from this fact.

## Common mistakes
1.  **Sign errors in L:** Performing the operation $R_2 \to R_2 - 2R_1$ and then putting $-2$ into $L$. The multiplier is $2$, so $l_{21}=2$. Remember, $L$ stores the operation that *reverses* the elimination.
2.  **Forgetting the order of solving:** Trying to solve $U\vec{x}=\vec{b}$ first. This is incorrect. You don't know $\vec{y}$ yet. You must solve for the intermediate vector $\vec{y}$ using $L$ first.
3.  **Decomposing a singular matrix:** If the matrix is singular (non-invertible), the elimination will produce a zero on the diagonal that cannot be removed by row-swapping. The decomposition will fail. Not every matrix has an LU decomposition.
4.  **Mixing up rows during elimination:** When you calculate the multiplier $m_{ij} = a_{ij} / a_{jj}$, you must use the *current* values in the matrix, not the values from the original matrix $A$.

## Self-check
1.  Find the LU decomposition of the matrix $A = \begin{pmatrix} 3 & 1 \\ 9 & 5 \end{pmatrix}$.
2.  Using your decomposition from question 1, solve $A\vec{x} = \begin{pmatrix} 7 \\ 23 \end{pmatrix}$.
3.  Explain precisely why the standard LU decomposition algorithm (without row swaps) fails for $A = \begin{pmatrix} 0 & 2 \\ 3 & 4 \end{pmatrix}$. What modification, represented by a matrix $P$, is required to proceed? What is the resulting decomposition called?