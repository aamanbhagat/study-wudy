## What it is
For any $m \times n$ matrix $A$, there are four fundamental vector subspaces that characterize its behavior as a linear transformation. These are the **Column Space** and **Null Space** of $A$, and the **Row Space** and **Left Null Space**, which are simply the column space and null space of the transpose, $A^T$. Together, they describe the domain and range of the transformation and provide a complete geometric picture of the matrix's action on vectors.

## Why it matters
This framework is the bedrock of the Fundamental Theorem of Linear Algebra, which connects a matrix's rank to the dimensions of these spaces. In machine learning, Principal Component Analysis (PCA) relies on understanding these subspaces to find directions of maximum variance. In aerospace, solving systems of linear differential equations for control systems and state-space models depends on analyzing the null space (for homogeneous solutions) and column space (for forcing functions).

## When to study it
Before tackling this, you must have a firm grasp of the following concepts. If any are weak, review them first.
- **Vector Spaces and Subspaces:** The formal definition (closure under vector addition and scalar multiplication).
- **Linear Independence, Span, Basis, and Dimension.**
- **Matrix-Vector Multiplication ($Ax$) as a Linear Transformation:** Specifically, how $A$ maps a vector $x \in \mathbb{R}^n$ to a vector $b \in \mathbb{R}^m$.
- **Gaussian Elimination:** The process of reducing a matrix to Row Echelon Form (REF) and Reduced Row Echelon Form (RREF).

## How to study it (step by step)
1.  **Define and Visualize:** For a simple $2 \times 2$ matrix like $A = \begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}$, write down the definitions of its Column Space $C(A)$ and Null Space $N(A)$. Find a basis for each and draw them in $\mathbb{R}^2$. Notice they are lines.
2.  **Introduce the Transpose:** Calculate $A^T$. Now find the Column Space $C(A^T)$ (the Row Space of $A$) and the Null Space $N(A^T)$ (the Left Null Space of $A$). Draw these as well.
3.  **Master the Algorithm:** Take a more complex, non-square matrix, e.g., $3 \times 4$. Reduce it to its Reduced Row Echelon Form (RREF), let's call it $R$.
    - A basis for the **Row Space** $C(A^T)$ is the set of non-zero rows of $R$.
    - A basis for the **Column Space** $C(A)$ is the set of columns in the *original matrix* $A$ that correspond to the pivot columns in $R$.
    - A basis for the **Null Space** $N(A)$ is found by solving $Ax=0$, which is equivalent to solving $Rx=0$, by expressing pivot variables in terms of free variables.
    - A basis for the **Left Null Space** $N(A^T)$ is found by solving $A^Ty=0$.
4.  **Connect Dimensions:** For the matrix in step 3, count the dimension of each subspace. Verify the **Rank-Nullity Theorem**: $\dim(C(A)) + \dim(N(A)) = n$ (number of columns). Also verify $\dim(C(A^T)) + \dim(N(A^T)) = m$ (number of rows). Note that $\dim(C(A)) = \dim(C(A^T))$, this is the rank $r$.
5.  **Understand Orthogonality:** Take one basis vector from the Row Space and one from the Null Space of your example matrix. Compute their dot product. It will be zero. Do the same for a vector from the Column Space and Left Null Space. This geometric relationship is always true.

## Key ideas, with intuition
1.  **The Matrix as a Transformation:** Think of an $m \times n$ matrix $A$ as a function that takes vectors from an input space $\mathbb{R}^n$ and maps them to an output space $\mathbb{R}^m$. The four subspaces describe this mapping completely.

2.  **The Spaces and Their Homes:**
    - **Row Space $C(A^T)$**: A subspace of the input space $\mathbb{R}^n$. It's the set of all linear combinations of the rows of $A$. This is the part of the input space that $A$ actually "acts on".
    - **Null Space $N(A)$**: A subspace of the input space $\mathbb{R}^n$. It's the set of all vectors $x$ that get crushed to zero by the transformation: $Ax=0$. This is the part of the input space that $A$ "ignores".
    - **Column Space $C(A)$**: A subspace of the output space $\mathbb{R}^m$. It's the set of all possible outputs of the transformation; the set of all vectors $b$ for which $Ax=b$ has a solution.
    - **Left Null Space $N(A^T)$**: A subspace of the output space $\mathbb{R}^m$. It's the null space of the transpose. Its vectors $y$ satisfy $A^Ty=0$, or $y^TA=0^T$. This is the part of the output space that is "unreachable".

3.  **Orthogonal Complements:** The key geometric insight.
    - The Row Space and Null Space are orthogonal complements in $\mathbb{R}^n$. Every vector in $\mathbb{R}^n$ can be written uniquely as a sum of a vector in the row space and a vector in the null space.
    $$ C(A^T) \perp N(A) $$
    - The Column Space and Left Null Space are orthogonal complements in $\mathbb{R}^m$.
    $$ C(A) \perp N(A^T) $$

4.  **Dimension and Rank:** The rank $r$ of a matrix is the dimension of its column space. It is also the dimension of its row space. The dimensions of the four subspaces are determined entirely by $m$, $n$, and the rank $r$.
    - $\dim(C(A^T)) = r$
    - $\dim(N(A)) = n-r$
    - $\dim(C(A)) = r$
    - $\dim(N(A^T)) = m-r$

## Worked example
Find bases for the four fundamental subspaces of $A = \begin{pmatrix} 1 & 3 & 5 & 0 \\ 2 & 6 & 12 & 2 \\ 0 & 0 & 2 & 2 \end{pmatrix}$.

**Step 1: Reduce A to RREF.**
$$
A = \begin{pmatrix} 1 & 3 & 5 & 0 \\ 2 & 6 & 12 & 2 \\ 0 & 0 & 2 & 2 \end{pmatrix} \xrightarrow{R_2 - 2R_1} \begin{pmatrix} 1 & 3 & 5 & 0 \\ 0 & 0 & 2 & 2 \\ 0 & 0 & 2 & 2 \end{pmatrix} \xrightarrow{R_3 - R_2} \begin{pmatrix} 1 & 3 & 5 & 0 \\ 0 & 0 & 2 & 2 \\ 0 & 0 & 0 & 0 \end{pmatrix}
$$
$$
\xrightarrow{\frac{1}{2}R_2} \begin{pmatrix} 1 & 3 & 5 & 0 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 0 \end{pmatrix} \xrightarrow{R_1 - 5R_2} \begin{pmatrix} 1 & 3 & 0 & -5 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 0 \end{pmatrix} = R
$$
The pivots are in columns 1 and 3. The rank is $r=2$. Here $m=3, n=4$.

**Step 2: Find basis for Row Space, $C(A^T)$.**
Read the non-zero rows from the RREF matrix $R$.
Basis for $C(A^T)$: $\left\{ \begin{pmatrix} 1 \\ 3 \\ 0 \\ -5 \end{pmatrix}, \begin{pmatrix} 0 \\ 0 \\ 1 \\ 1 \end{pmatrix} \right\}$. Dimension is $r=2$.

**Step 3: Find basis for Column Space, $C(A)$.**
Identify the pivot columns in $R$ (columns 1 and 3). Use the corresponding columns from the *original matrix* $A$.
Basis for $C(A)$: $\left\{ \begin{pmatrix} 1 \\ 2 \\ 0 \end{pmatrix}, \begin{pmatrix} 5 \\ 12 \\ 2 \end{pmatrix} \right\}$. Dimension is $r=2$.

**Step 4: Find basis for Null Space, $N(A)$.**
Solve $Rx=0$. The variables $x_1, x_3$ are pivot variables; $x_2, x_4$ are free variables.
From $R$:
$x_1 + 3x_2 - 5x_4 = 0 \implies x_1 = -3x_2 + 5x_4$
$x_3 + x_4 = 0 \implies x_3 = -x_4$
The general solution is $x = \begin{pmatrix} -3x_2 + 5x_4 \\ x_2 \\ -x_4 \\ x_4 \end{pmatrix} = x_2 \begin{pmatrix} -3 \\ 1 \\ 0 \\ 0 \end{pmatrix} + x_4 \begin{pmatrix} 5 \\ 0 \\ -1 \\ 1 \end{pmatrix}$.
Basis for $N(A)$: $\left\{ \begin{pmatrix} -3 \\ 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} 5 \\ 0 \\ -1 \\ 1 \end{pmatrix} \right\}$. Dimension is $n-r = 4-2=2$.

**Step 5: Find basis for Left Null Space, $N(A^T)$.**
Solve $A^Ty=0$. We can do this by finding the null space of the row-reduced echelon form of $A^T$. Or, more cleverly, by tracking the row operations to reduce $[A|I]$ to $[R|E]$. The rows of $E$ corresponding to zero rows in $R$ form a basis for $N(A^T)$. Let's do it directly.
$$
A^T = \begin{pmatrix} 1 & 2 & 0 \\ 3 & 6 & 0 \\ 5 & 12 & 2 \\ 0 & 2 & 2 \end{pmatrix} \rightarrow \text{RREF} \rightarrow \begin{pmatrix} 1 & 0 & -2 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{pmatrix}
$$
Solving $A^Ty=0$ gives $y_1 - 2y_3 = 0$ and $y_2 + y_3 = 0$. Let $y_3$ be the free variable.
$y_1 = 2y_3$, $y_2 = -y_3$.
The general solution is $y = y_3 \begin{pmatrix} 2 \\ -1 \\ 1 \end{pmatrix}$.
Basis for $N(A^T)$: $\left\{ \begin{pmatrix} 2 \\ -1 \\ 1 \end{pmatrix} \right\}$. Dimension is $m-r = 3-2=1$.

**Reflection:** Each step was a direct application of an algorithm based on Gaussian elimination. The dimensions match our formulas: $2+2=4$ and $2+1=3$. We successfully found a basis for all four subspaces.

## Diagrams
This diagram illustrates the Fundamental Theorem of Linear Algebra. The matrix $A$ maps the Row Space in $\mathbb{R}^n$ one-to-one and onto the Column Space in $\mathbb{R}^m$. The Null Space in $\mathbb{R}^n$ is crushed to the zero vector in $\mathbb{R}^m$.

```text
       INPUT SPACE (Domain)                      OUTPUT SPACE (Codomain)
            R^n                                         R^m
  +----------------------+                     +----------------------+
  |                      |                     |                      |
  |   Row Space C(A^T)   |-------------------->|  Column Space C(A)   |
  |   dim = r            |          A          |  dim = r             |
  |                      |                     |                      |
  +----------------------+                     +----------------------+
  |         ^            |                     |         ^            |
  |         | Orthogonal |                     |         | Orthogonal |
  |         v            |                     |         v            |
  +----------------------+                     +----------------------+
  |                      |                     |                      |
  |   Null Space N(A)    |-------------------->|     {0} vector       |
  |   dim = n-r          |                     |                      |
  |                      |                     |                      |
  +----------------------+                     +----------------------+
                                               | Left Null Space N(A^T)|
                                               | dim = m-r            |
                                               +----------------------+
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a factory ($A$) that takes raw materials ($x \in \mathbb{R}^n$) and produces products ($b \in \mathbb{R}^m$).
    - The **Row Space** is the set of "useful" raw materials that get turned into products.
    - The **Null Space** is the set of "wasteful" raw materials that the factory machinery completely annihilates ($Ax=0$).
    - The **Column Space** is the set of all possible products the factory can make.
    - The **Left Null Space** is the set of "anti-products", theoretical products that are impossible to create, orthogonal to everything the factory *can* make.
    The factory's efficiency is its **rank**, $r$.

2.  **Must-Know Formulas:**
    $$ \dim(C(A)) + \dim(N(A)) = n \quad (\text{Rank-Nullity Theorem}) $$
    $$ C(A^T) \perp N(A) $$
    $$ C(A) \perp N(A^T) $$

3.  **Spaced Repetition Schedule:** Review this material and re-do the worked example from scratch at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:** If you forget everything, start with the definitions.
    - $C(A) = \{ Ax \mid x \in \mathbb{R}^n \}$ (the span of the columns).
    - $N(A) = \{ x \in \mathbb{R}^n \mid Ax = 0 \}$ (the solutions to the homogeneous equation).
    - Row space is $C(A^T)$. Left null space is $N(A^T)$.
    - The algorithms to find bases for these spaces all derive from solving linear systems using Gaussian elimination, the most fundamental tool you have. The orthogonality proof comes directly from the definition of matrix multiplication. If $x \in N(A)$, then $Ax=0$. If $v \in C(A^T)$, then $v = A^Tz$ for some $z$. Their dot product is $v^T x = (A^Tz)^T x = z^T A x = z^T(0) = 0$.

## Common mistakes
1.  **Basis for $C(A)$ from RREF:** Taking the pivot columns from the reduced matrix $R$ as the basis for the column space. **Wrong.** Row operations change the column space. You must use the columns from the *original* matrix $A$.
2.  **Confusing $m$ and $n$:** The Row Space and Null Space live in $\mathbb{R}^n$ (the domain). The Column Space and Left Null Space live in $\mathbb{R}^m$ (the codomain). Always write down $A$ is $m \times n$ to keep this straight.
3.  **Assuming Orthogonality Between Wrong Spaces:** The Null Space is *not* orthogonal to the Column Space. They live in different ambient spaces ($\mathbb{R}^n$ and $\mathbb{R}^m$). Orthogonality only makes sense for subspaces within the same parent space.

## Self-check
1. Let $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$. What are the dimensions of its four fundamental subspaces? Describe them geometrically.
2. Find a basis for each of the four fundamental subspaces of $A = \begin{pmatrix} 1 & 0 & 2 & 1 \\ 0 & 1 & 3 & 1 \end{pmatrix}$.
3. Let $A$ be an $m \times n$ matrix. Prove that any vector $x \in \mathbb{R}^n$ can be written uniquely as $x = x_r + x_n$, where $x_r$ is in the row space of $A$ and $x_n$ is in the null space of $A$. (Hint: Use the fact that these spaces are orthogonal complements).