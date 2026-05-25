## What it is
A change of basis matrix is a square, invertible matrix that translates the coordinates of a vector from one basis to another. It acts as a "translator" between different coordinate systems for the same vector space, allowing you to express the same geometric vector using different sets of reference axes.

## Why it matters
This concept is fundamental for simplifying problems by choosing a "better" coordinate system. In machine learning, Principal Component Analysis (PCA) is a change of basis to one that captures the most variance in data. In aerospace engineering, vehicle dynamics are described by changing between the vehicle's body-fixed frame (roll, pitch, yaw) and an inertial frame (e.g., Earth-centered).

## When to study it
You must have a firm grasp of the following prerequisites. If any of these are weak, review them first.
*   Vector Spaces and Subspaces
*   Linear Independence and Spanning Sets
*   Basis and Dimension
*   Coordinates of a vector with respect to a basis

## How to study it (step by step)
1.  **Revisit Coordinates.** Take the vector $\vec{v} = \begin{pmatrix} 4 \\ 3 \end{pmatrix}$ in $\mathbb{R}^2$. Its coordinates in the standard basis $\mathcal{E} = \{\begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix}\}$ are $[\vec{v}]_{\mathcal{E}} = \begin{pmatrix} 4 \\ 3 \end{pmatrix}$. Now, consider a new basis $\mathcal{B} = \{\vec{b}_1, \vec{b}_2\} = \{\begin{pmatrix} 2 \\ 1 \end{pmatrix}, \begin{pmatrix} -1 \\ 1 \end{pmatrix}\}$. Convince yourself that the coordinates of the *same* vector $\vec{v}$ with respect to $\mathcal{B}$ are $[\vec{v}]_{\mathcal{B}} = \begin{pmatrix} 7/3 \\ -2/3 \end{pmatrix}$, because $\frac{7}{3}\vec{b}_1 - \frac{2}{3}\vec{b}_2 = \vec{v}$. The goal is to find a matrix that converts $\begin{pmatrix} 7/3 \\ -2/3 \end{pmatrix}$ to $\begin{pmatrix} 4 \\ 3 \end{pmatrix}$ and vice-versa.

2.  **Derive the Matrix from First Principles.** Let $\mathcal{B} = \{\vec{b}_1, \dots, \vec{b}_n\}$ and $\mathcal{C} = \{\vec{c}_1, \dots, \vec{c}_n\}$ be two bases for a vector space $V$. Let $\vec{x}$ be a vector in $V$. Its representation in basis $\mathcal{B}$ is $[\vec{x}]_{\mathcal{B}} = \begin{pmatrix} k_1 \\ \vdots \\ k_n \end{pmatrix}$, which means $\vec{x} = k_1\vec{b}_1 + \dots + k_n\vec{b}_n$. We want to find its coordinates in $\mathcal{C}$, $[\vec{x}]_{\mathcal{C}}$. To do this, we express the old basis vectors $\vec{b}_j$ in terms of the new basis vectors $\vec{c}_i$:
    $$ \vec{x} = k_1\vec{b}_1 + \dots + k_n\vec{b}_n $$
    Substitute the representation of each $\vec{b}_j$ in the $\mathcal{C}$ basis:
    $$ \vec{x} = k_1([\vec{b}_1]_{\mathcal{C}}) + \dots + k_n([\vec{b}_n]_{\mathcal{C}}) $$
    This is a linear combination. The coordinates of $\vec{x}$ in $\mathcal{C}$ are given by the matrix-vector product:
    $$ [\vec{x}]_{\mathcal{C}} = \begin{bmatrix} [\vec{b}_1]_{\mathcal{C}} & [\vec{b}_2]_{\mathcal{C}} & \dots & [\vec{b}_n]_{\mathcal{C}} \end{bmatrix} \begin{pmatrix} k_1 \\ \vdots \\ k_n \end{pmatrix} $$
    This matrix is the change of basis matrix from $\mathcal{B}$ to $\mathcal{C}$, denoted $P_{\mathcal{C} \leftarrow \mathcal{B}}$.

3.  **Solve a Concrete Problem.** Let $\mathcal{E}$ be the standard basis for $\mathbb{R}^2$ and $\mathcal{B} = \{\begin{pmatrix} 1 \\ 2 \end{pmatrix}, \begin{pmatrix} 3 \\ 4 \end{pmatrix}\}$. Find the matrix $P_{\mathcal{E} \leftarrow \mathcal{B}}$. Following the derivation, its columns are the basis vectors of $\mathcal{B}$ written in the coordinates of $\mathcal{E}$. This is trivial: $[\begin{pmatrix} 1 \\ 2 \end{pmatrix}]_{\mathcal{E}} = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$ and $[\begin{pmatrix} 3 \\ 4 \end{pmatrix}]_{\mathcal{E}} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$. So, $P_{\mathcal{E} \leftarrow \mathcal{B}} = \begin{pmatrix} 1 & 3 \\ 2 & 4 \end{pmatrix}$.

4.  **Find the Inverse Transformation.** Now, find the matrix that converts from $\mathcal{E}$ to $\mathcal{B}$, which is $P_{\mathcal{B} \leftarrow \mathcal{E}}$. Logic dictates that this should be the inverse of the previous matrix. Calculate $(P_{\mathcal{E} \leftarrow \mathcal{B}})^{-1} = \begin{pmatrix} 1 & 3 \\ 2 & 4 \end{pmatrix}^{-1} = \frac{1}{4-6}\begin{pmatrix} 4 & -3 \\ -2 & 1 \end{pmatrix} = \begin{pmatrix} -2 & 3/2 \\ 1 & -1/2 \end{pmatrix}$. This is $P_{\mathcal{B} \leftarrow \mathcal{E}}$. Verify this: the columns should be the standard basis vectors written in basis $\mathcal{B}$. Is $\begin{pmatrix} 1 \\ 0 \end{pmatrix} = -2\vec{b}_1 + 1\vec{b}_2$? Yes. Is $\begin{pmatrix} 0 \\ 1 \end{pmatrix} = \frac{3}{2}\vec{b}_1 - \frac{1}{2}\vec{b}_2$? Yes.

## Key ideas, with intuition
*   **Coordinates are just a recipe.** A vector is a pure geometric object (an arrow in space). Its coordinates are a recipe for building that vector using a specific set of ingredients (the basis vectors). Change the ingredients, and you need a new recipe.
*   **The matrix columns are images of the old basis vectors.** The matrix $P_{\mathcal{C} \leftarrow \mathcal{B}}$ answers the question: "What do the old basis vectors from $\mathcal{B}$ look like when described using the language of the new basis $\mathcal{C}$?" Each column of the matrix is the coordinate vector of one of the old basis vectors in the new system.
    $$ P_{\mathcal{C} \leftarrow \mathcal{B}} = \begin{bmatrix} \vert & \vert & & \vert \\ [\vec{b}_1]_{\mathcal{C}} & [\vec{b}_2]_{\mathcal{C}} & \dots & [\vec{b}_n]_{\mathcal{C}} \\ \vert & \vert & & \vert \end{bmatrix} $$
*   **The matrix acts on coordinates, not vectors.** This is a crucial point. The matrix does not change the vector $\vec{x}$ itself. It changes the *representation* of $\vec{x}$. We are always talking about the same vector, just described differently.
    $$ [\vec{x}]_{\mathcal{C}} = P_{\mathcal{C} \leftarrow \mathcal{B}} [\vec{x}]_{\mathcal{B}} $$
*   **Changing from a non-standard basis to the standard basis is easy.** If you want to find the matrix that converts from basis $\mathcal{B}$ to the standard basis $\mathcal{E}$, the matrix $P_{\mathcal{E} \leftarrow \mathcal{B}}$ is simply the matrix whose columns are the basis vectors of $\mathcal{B}$. This is because the coordinates of a vector in the standard basis are just the vector's components.

## Worked example
Let $\mathcal{B} = \{\vec{b}_1, \vec{b}_2\} = \{\begin{pmatrix} 1 \\ -1 \end{pmatrix}, \begin{pmatrix} 2 \\ 1 \end{pmatrix}\}$ and $\mathcal{C} = \{\vec{c}_1, \vec{c}_2\} = \{\begin{pmatrix} 1 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ 2 \end{pmatrix}\}$ be two bases for $\mathbb{R}^2$. Let a vector $\vec{x}$ have coordinates $[\vec{x}]_{\mathcal{B}} = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$. Find the coordinates of $\vec{x}$ in the basis $\mathcal{C}$, denoted $[\vec{x}]_{\mathcal{C}}$.

**Step 1: Find the change of basis matrix $P_{\mathcal{C} \leftarrow \mathcal{B}}$.**
The columns of this matrix are the coordinates of the $\mathcal{B}$-basis vectors expressed in the $\mathcal{C}$-basis.
First, find $[\vec{b}_1]_{\mathcal{C}}$. We need to solve $\vec{b}_1 = k_1\vec{c}_1 + k_2\vec{c}_2$:
$$ \begin{pmatrix} 1 \\ -1 \end{pmatrix} = k_1\begin{pmatrix} 1 \\ 1 \end{pmatrix} + k_2\begin{pmatrix} 1 \\ 2 \end{pmatrix} \implies \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} k_1 \\ k_2 \end{pmatrix} = \begin{pmatrix} 1 \\ -1 \end{pmatrix} $$
Solving this system (e.g., via row reduction or matrix inversion) gives $k_1 = 3, k_2 = -2$. So, $[\vec{b}_1]_{\mathcal{C}} = \begin{pmatrix} 3 \\ -2 \end{pmatrix}$.

Second, find $[\vec{b}_2]_{\mathcal{C}}$. We need to solve $\vec{b}_2 = j_1\vec{c}_1 + j_2\vec{c}_2$:
$$ \begin{pmatrix} 2 \\ 1 \end{pmatrix} = j_1\begin{pmatrix} 1 \\ 1 \end{pmatrix} + j_2\begin{pmatrix} 1 \\ 2 \end{pmatrix} \implies \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} j_1 \\ j_2 \end{pmatrix} = \begin{pmatrix} 2 \\ 1 \end{pmatrix} $$
Solving this system gives $j_1 = 3, j_2 = -1$. So, $[\vec{b}_2]_{\mathcal{C}} = \begin{pmatrix} 3 \\ -1 \end{pmatrix}$.

Now, construct the matrix:
$$ P_{\mathcal{C} \leftarrow \mathcal{B}} = \begin{bmatrix} [\vec{b}_1]_{\mathcal{C}} & [\vec{b}_2]_{\mathcal{C}} \end{bmatrix} = \begin{pmatrix} 3 & 3 \\ -2 & -1 \end{pmatrix} $$

**Step 2: Convert the coordinates.**
Use the formula $[\vec{x}]_{\mathcal{C}} = P_{\mathcal{C} \leftarrow \mathcal{B}} [\vec{x}]_{\mathcal{B}}$:
$$ [\vec{x}]_{\mathcal{C}} = \begin{pmatrix} 3 & 3 \\ -2 & -1 \end{pmatrix} \begin{pmatrix} 3 \\ 1 \end{pmatrix} = \begin{pmatrix} 3(3) + 3(1) \\ -2(3) - 1(1) \end{pmatrix} = \begin{pmatrix} 12 \\ -7 \end{pmatrix} $$
The coordinates of $\vec{x}$ in the basis $\mathcal{C}$ are $\begin{pmatrix} 12 \\ -7 \end{pmatrix}$.

**Reflection:**
Step 1 worked because the definition of the change of basis matrix requires its columns to be the old basis vectors expressed in the new coordinate system. This required solving two systems of linear equations. Step 2 worked because this matrix is designed to transform coordinate vectors via standard matrix multiplication. We can verify the result:
The original vector is $\vec{x} = 3\vec{b}_1 + 1\vec{b}_2 = 3\begin{pmatrix} 1 \\ -1 \end{pmatrix} + 1\begin{pmatrix} 2 \\ 1 \end{pmatrix} = \begin{pmatrix} 5 \\ -2 \end{pmatrix}$.
The new representation is $12\vec{c}_1 - 7\vec{c}_2 = 12\begin{pmatrix} 1 \\ 1 \end{pmatrix} - 7\begin{pmatrix} 1 \\ 2 \end{pmatrix} = \begin{pmatrix} 12-7 \\ 12-14 \end{pmatrix} = \begin{pmatrix} 5 \\ -2 \end{pmatrix}$.
The results match, confirming the procedure is correct.

## Diagrams
A vector $\vec{v}$ in $\mathbb{R}^2$ can be described using the standard basis $\mathcal{E} = \{\vec{e}_1, \vec{e}_2\}$ or a new basis $\mathcal{B} = \{\vec{b}_1, \vec{b}_2\}$.

```text
       ^ y (e2)
       |
       |
       |    / b2
       |   /
       |  /
       | /
       *---------------------> v
      /| \
     / |  \
    /  |   \
   /   |    \ b1
  /    |     \
 /     |      \
/______|_______\________> x (e1)
       |
       |
```
The vector $\vec{v}$ is the same geometric object. Its coordinates $[\vec{v}]_{\mathcal{E}}$ are found by projecting onto the standard axes. Its coordinates $[\vec{v}]_{\mathcal{B}}$ are found by seeing how many multiples of $\vec{b}_1$ and $\vec{b}_2$ are needed to form $\vec{v}$ via the parallelogram rule. The change of basis matrix converts one set of coordinates to the other.

## Memory technique — remember this forever
1.  **The Story:** Think of bases as languages and the change of basis matrix as a dictionary. To translate a phrase from French (basis $\mathcal{B}$) to English (basis $\mathcal{C}$), you need a French-to-English dictionary ($P_{\mathcal{C} \leftarrow \mathcal{B}}$). The entries in this dictionary consist of French words (vectors from $\mathcal{B}$) defined using English words (in the coordinates of $\mathcal{C}$). The arrow in $P_{\mathcal{C} \leftarrow \mathcal{B}}$ shows the direction of translation: from $\mathcal{B}$ to $\mathcal{C}$.

2.  **Must-Know Formulas:**
    *   $[\vec{x}]_{\mathcal{C}} = P_{\mathcal{C} \leftarrow \mathcal{B}} [\vec{x}]_{\mathcal{B}}$  (How to use it)
    *   $P_{\mathcal{C} \leftarrow \mathcal{B}} = \begin{bmatrix} [\vec{b}_1]_{\mathcal{C}} & [\vec{b}_2]_{\mathcal{C}} & \dots & [\vec{b}_n]_{\mathcal{C}} \end{bmatrix}$ (How to build it)
    *   $P_{\mathcal{B} \leftarrow \mathcal{C}} = (P_{\mathcal{C} \leftarrow \mathcal{B}})^{-1}$ (How to go back)

3.  **Spaced Repetition:** Review this material and re-do the worked example from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    Start with the definition of coordinates: $\vec{x} = \sum_{j=1}^n k_j \vec{b}_j$. You want to find the coordinates of $\vec{x}$ in basis $\mathcal{C}$. That means you need to write $\vec{x}$ as a linear combination of the $\vec{c}_i$ vectors. The only way to connect the two is to express each $\vec{b}_j$ as a linear combination of the $\vec{c}_i$ vectors. Substitute these expressions into the sum for $\vec{x}$, regroup terms, and the matrix $P_{\mathcal{C} \leftarrow \mathcal{B}}$ will appear naturally from the coefficients.

## Common mistakes
*   **Directional Error:** Confusing $P_{\mathcal{C} \leftarrow \mathcal{B}}$ (from $\mathcal{B}$ to $\mathcal{C}$) with $P_{\mathcal{B} \leftarrow \mathcal{C}}$ (from $\mathcal{C}$ to $\mathcal{B}$). Use the arrow notation to keep it straight. The input coordinates are in the basis on the right ($\mathcal{B}$), and the output coordinates are in the basis on the left ($\mathcal{C}$).
*   **Matrix Construction Error:** Building the matrix $P_{\mathcal{C} \leftarrow \mathcal{B}}$ by putting the vectors of $\mathcal{C}$ in the columns. Remember the dictionary analogy: the columns are the *old* basis vectors ($\mathcal{B}$) written in the language of the *new* basis ($\mathcal{C}$).
*   **The "Easy Case" Trap:** When changing from a basis $\mathcal{B}$ to the standard basis $\mathcal{E}$, the matrix $P_{\mathcal{E} \leftarrow \mathcal{B}}$ is just the matrix whose columns are the vectors of $\mathcal{B}$. Students often mistakenly think this simple construction works for *any* change of basis. It only works when the target basis is the standard basis.

## Self-check
1.  Let $\mathcal{B} = \{\begin{pmatrix} 5 \\ 1 \end{pmatrix}, \begin{pmatrix} -1 \\ 3 \end{pmatrix}\}$ be a basis for $\mathbb{R}^2$ and let $\mathcal{E}$ be the standard basis. Find the change of basis matrix $P_{\mathcal{E} \leftarrow \mathcal{B}}$ and use it to find the standard coordinates of the vector $\vec{x}$ where $[\vec{x}]_{\mathcal{B}} = \begin{pmatrix} 2 \\ -1 \end{pmatrix}$.
2.  Let $\mathcal{B} = \{\begin{pmatrix} 1 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ -1 \end{pmatrix}\}$ and $\mathcal{C} = \{\begin{pmatrix} 2 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 3 \end{pmatrix}\}$ be bases for $\mathbb{R}^2$. Find the change of basis matrix $P_{\mathcal{B} \leftarrow \mathcal{C}}$.
3.  Consider the vector space $P_2$ of polynomials of degree at most 2. Let $\mathcal{E} = \{1, t, t^2\}$ be the standard basis. Let $\mathcal{B} = \{1, 1+t, 1+t+t^2\}$ be another basis. Find the change of basis matrix $P_{\mathcal{E} \leftarrow \mathcal{B}}$ and use it to find the coordinates of the polynomial $p(t) = 3(1) - 2(1+t) + 1(1+t+t^2)$ in the standard basis.