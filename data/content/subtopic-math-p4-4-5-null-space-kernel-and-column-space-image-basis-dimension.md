## What it is
The null space (or kernel) of a matrix $A$ is the set of all input vectors $\vec{x}$ that are transformed into the zero vector, i.e., $A\vec{x} = \vec{0}$. The column space (or image) of $A$ is the set of all possible output vectors, which is equivalent to the span of the columns of $A$.

## Why it matters
These concepts are fundamental to understanding linear systems. In orbital mechanics, the null space of a system's state matrix can correspond to unobservable states of a satellite. In machine learning, the column space of a data matrix defines the entire range of features that can be represented; techniques like Principal Component Analysis (PCA) find a more efficient basis for this space to reduce dimensionality.

## When to study it
You must be comfortable with the following prerequisites. If any are shaky, review them first.
*   Solving systems of linear equations via Gaussian elimination (row reduction to RREF).
*   The definitions of a vector space and a subspace.
*   The concepts of linear independence, span, basis, and dimension.

## How to study it (step by step)
1.  **Revisit the definition of $A\vec{x}$ as a linear combination.** For $A=[\vec{a}_1 \dots \vec{a}_n]$ and $\vec{x}=[x_1 \dots x_n]^T$, internalize that $A\vec{x} = x_1\vec{a}_1 + \dots + x_n\vec{a}_n$. This directly shows why the set of all outputs is the span of the columns.
2.  **Derive the null space basis.** Take a matrix $A$, augment it with the zero vector to form $[A|\vec{0}]$, and row-reduce to Reduced Row Echelon Form (RREF). Write the solution in parametric vector form. The vectors multiplying the free parameters form the basis for the null space.
3.  **Derive the column space basis.** Row-reduce $A$ to RREF. Identify the columns in the RREF that contain pivots (leading 1s). The basis for the column space of $A$ consists of the corresponding columns from the *original* matrix $A$.
4.  **Connect the dimensions.** For an $m \times n$ matrix $A$, count the number of pivot columns. This is the dimension of the column space, called the **rank**. Count the number of non-pivot columns (free variables). This is the dimension of the null space, called the **nullity**. Verify that rank + nullity = $n$ (the number of columns). This is the Rank-Nullity Theorem.
5.  **Solve 5-10 practice problems.** Find the basis and dimension for the null space and column space for various matrices until the process is automatic.

## Key ideas, with intuition
1.  **Spaces live in different places.** For a matrix $A$ that represents a transformation $T: \mathbb{R}^n \to \mathbb{R}^m$, the null space is a subspace of the *domain* $\mathbb{R}^n$. It's the set of inputs that get "crushed" to zero. The column space is a subspace of the *codomain* $\mathbb{R}^m$. It's the set of all "reachable" outputs.

2.  **Row operations preserve the null space, but change the column space.** When you row-reduce $A$ to get $B$, Nul $A = \text{Nul } B$. This is because row operations don't change the solution set of the homogeneous equation $A\vec{x}=\vec{0}$. However, Col $A \neq \text{Col } B$. This is why you must use the pivot columns from the *original* matrix $A$ for the basis of the column space. The RREF just tells you *which* original columns to pick.

3.  **Dimension is about freedom.** The dimension of the null space (nullity) is the number of free variables in the system $A\vec{x}=\vec{0}$. It quantifies the "degrees of freedom" in the set of solutions. The dimension of the column space (rank) is the number of pivot variables, which corresponds to the number of linearly independent columns that define the "reach" of the transformation.

4.  **The Rank-Nullity Theorem is a conservation law.**
    $$ \text{rank}(A) + \text{nullity}(A) = n $$
    This theorem states that for a transformation from an $n$-dimensional space, every dimension of the input space is accounted for. Each dimension is either part of the basis for the reachable outputs (rank) or it gets crushed into the null space (nullity). No dimension is lost.

## Worked example
Find a basis for the null space and column space of the matrix $A$, and state their dimensions.
$$ A = \begin{pmatrix} 1 & -2 & 0 & 3 \\ 2 & -4 & -1 & 4 \\ -1 & 2 & 1 & -1 \end{pmatrix} $$

**Step 1: Row-reduce A to RREF.**
$$
\begin{pmatrix} 1 & -2 & 0 & 3 \\ 2 & -4 & -1 & 4 \\ -1 & 2 & 1 & -1 \end{pmatrix}
\xrightarrow{R_2 \to R_2 - 2R_1}
\begin{pmatrix} 1 & -2 & 0 & 3 \\ 0 & 0 & -1 & -2 \\ -1 & 2 & 1 & -1 \end{pmatrix}
\xrightarrow{R_3 \to R_3 + R_1}
\begin{pmatrix} 1 & -2 & 0 & 3 \\ 0 & 0 & -1 & -2 \\ 0 & 0 & 1 & 2 \end{pmatrix}
$$
$$
\xrightarrow{R_3 \to R_3 + R_2}
\begin{pmatrix} 1 & -2 & 0 & 3 \\ 0 & 0 & -1 & -2 \\ 0 & 0 & 0 & 0 \end{pmatrix}
\xrightarrow{R_2 \to -R_2}
\begin{pmatrix} 1 & -2 & 0 & 3 \\ 0 & 0 & 1 & 2 \\ 0 & 0 & 0 & 0 \end{pmatrix}
= \text{RREF}(A)
$$

**Step 2: Find a basis for the Null Space.**
We solve $A\vec{x}=\vec{0}$ using the RREF. Let $\vec{x} = [x_1, x_2, x_3, x_4]^T$. The system is:
$x_1 - 2x_2 + 3x_4 = 0$
$x_3 + 2x_4 = 0$

The pivot variables are $x_1$ and $x_3$. The free variables are $x_2$ and $x_4$. Express pivots in terms of free variables:
$x_1 = 2x_2 - 3x_4$
$x_3 = -2x_4$

Write the solution vector in parametric form:
$$ \vec{x} = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{pmatrix} = \begin{pmatrix} 2x_2 - 3x_4 \\ x_2 \\ -2x_4 \\ x_4 \end{pmatrix} = x_2 \begin{pmatrix} 2 \\ 1 \\ 0 \\ 0 \end{pmatrix} + x_4 \begin{pmatrix} -3 \\ 0 \\ -2 \\ 1 \end{pmatrix} $$
The basis for Nul $A$ is the set of vectors multiplying the free parameters.
Basis for Nul $A$: $\left\{ \begin{pmatrix} 2 \\ 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} -3 \\ 0 \\ -2 \\ 1 \end{pmatrix} \right\}$.
The dimension of the null space, **nullity(A)**, is the number of basis vectors, which is **2**.

**Step 3: Find a basis for the Column Space.**
The pivot columns in the RREF are columns 1 and 3. Therefore, we take columns 1 and 3 from the *original* matrix $A$.
Basis for Col $A$: $\left\{ \begin{pmatrix} 1 \\ 2 \\ -1 \end{pmatrix}, \begin{pmatrix} 0 \\ -1 \\ 1 \end{pmatrix} \right\}$.
The dimension of the column space, **rank(A)**, is the number of basis vectors, which is **2**.

**Step 4: Reflection.**
The matrix $A$ is $3 \times 4$, so $m=3, n=4$.
The null space is a subspace of the domain, $\mathbb{R}^4$. Its dimension is 2.
The column space is a subspace of the codomain, $\mathbb{R}^3$. Its dimension is 2.
Check the Rank-Nullity Theorem: $\text{rank}(A) + \text{nullity}(A) = 2 + 2 = 4 = n$. The theorem holds. Each step worked because it correctly applied the definitions: the null space basis comes from solving the homogeneous system, and the column space basis comes from identifying the linearly independent columns of the original matrix via its pivot positions.

## Diagrams

This diagram shows a linear transformation $T: \mathbb{R}^3 \to \mathbb{R}^3$. The null space is a line through the origin in the domain (input space) that gets crushed to the origin in the codomain (output space). The column space is the plane in the codomain that contains all possible outputs.

```text
       DOMAIN (R^3)                     CODOMAIN (R^3)
          z                                 z'
          |                                 |
          |                                 |
          |          Nul(A)                 |--------- Col(A)
          |         /                       |        /
          |        /                        |       / (a plane)
          |       * (line)                  |      /
          |      /                          |     /
          |     /                           |    /
          +----/----------- y               +---*-------------- y'
         /    /                           /   T(v)
        /    v                           /
       /                                /
      x                                x'

Action: T(x) = Ax

- Any vector v on the Nul(A) line gets sent to the origin: T(v) = 0.
- Any vector in the domain gets mapped somewhere onto the Col(A) plane.
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a factory machine ($A$) that takes ingredient carts ($\vec{x} \in \mathbb{R}^n$) and produces product crates ($\vec{y} \in \mathbb{R}^m$).
    *   **Null Space (Kernel):** The set of ingredient carts that produce an *empty* crate ($\vec{0}$). These are the "nullified" inputs. The basis for the null space is the recipe for every possible "zero-cost" combination of ingredients. Its dimension (nullity) is the number of free choices (free variables) you have in making a worthless batch.
    *   **Column Space (Image):** The warehouse floor containing all possible product crates you could ever make. It's the "image" of your factory's capability. The basis is the set of fundamental, independent products (pivot columns) that can be combined to create any other product. Its dimension (rank) is the true number of unique products you make.

2.  **Must-know formulas:**
    $$ \text{Nul } A = \{\vec{x} \in \mathbb{R}^n \mid A\vec{x} = \vec{0}\} $$
    $$ \text{Col } A = \text{Span}\{\vec{a}_1, \dots, \vec{a}_n\} $$
    $$ \text{rank}(A) + \text{nullity}(A) = n $$

3.  **Spaced Repetition Schedule:** Review this material and rework the example in 1 day, 3 days, 7 days, 16 days, and 35 days.

4.  **First Principles Pathway:** If you forget the procedure, derive it from the definitions.
    *   **Null Space:** The definition is $A\vec{x}=\vec{0}$. How do you find all solutions $\vec{x}$? You solve the system. The standard algorithm for that is row reduction.
    *   **Column Space:** The definition is the span of the columns. How do you find a basis for a set of spanning vectors? You find a maximal linearly independent subset. The pivot columns of $A$ are guaranteed to be that subset. Row reduction identifies their positions.

## Common mistakes
1.  **Using RREF columns for the Col A basis.** The column space of $A$ is not the same as the column space of its RREF. The RREF only tells you *which columns of the original matrix A* to use.
2.  **Confusing rank and nullity.** Rank = # of pivots. Nullity = # of non-pivots (free variables). They must sum to $n$, the total number of columns.
3.  **Incorrectly identifying the ambient space.** For an $m \times n$ matrix $A$, Nul $A$ is a subspace of $\mathbb{R}^n$ (the domain). Col $A$ is a subspace of $\mathbb{R}^m$ (the codomain). Do not mix these up.

## Self-check
Do not solve these now. Use them to test your recall on your scheduled review days. For each matrix, find a basis for the null space and column space, and state the rank and nullity.

1.  $A = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix}$
2.  $B = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{pmatrix}$
3.  $C = \begin{pmatrix} 2 & -4 & 1 & 3 & 5 \\ 1 & -2 & 0 & 1 & 1 \\ 1 & -2 & 1 & 2 & 4 \end{pmatrix}$