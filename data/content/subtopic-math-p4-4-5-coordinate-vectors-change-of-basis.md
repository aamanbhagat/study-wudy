## What it is
A vector is an object with magnitude and direction, existing independently of any coordinate system. A coordinate vector is a list of numbers that describes that vector as a specific recipe of stretches and additions of some chosen set of "ruler" vectors, called a basis. A change of basis is the mathematical process for translating that recipe from one set of rulers to another.

## Why it matters
This is not just an abstract exercise; it is one of the most powerful ideas in applied mathematics. In physics and engineering, many problems become trivial by choosing the right coordinate system (e.g., aligning an axis with an inclined plane). In machine learning, Principal Component Analysis (PCA) is a change of basis to find the most informative "directions" in high-dimensional data, which is essential for dimensionality reduction and feature extraction.

## When to study it
Before tackling this, you must have a firm grasp of the following. If any of these are weak, review them first.
*   **Vector Spaces**: The definition of a vector space, subspaces.
*   **Basis and Dimension**: Linear independence, spanning sets, and the definition of a basis. You must understand that any vector in a space can be written as a *unique* linear combination of basis vectors.
*   **Coordinate Vectors**: How to find the coordinates of a vector with respect to a given basis.
*   **Matrix Operations**: Matrix multiplication and, crucially, finding the inverse of a matrix.

## How to study it (step by step)
1.  **Re-derive Coordinate Vectors.** Start with the standard basis $\mathcal{E} = \{\begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix}\}$ in $\mathbb{R}^2$. The vector $\vec{v} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$ has coordinates $[\vec{v}]_{\mathcal{E}} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$. Now, take a new basis $\mathcal{B} = \{\vec{b}_1, \vec{b}_2\} = \{\begin{pmatrix} 1 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ -1 \end{pmatrix}\}$. Find the coordinates $[\vec{v}]_{\mathcal{B}}$ by solving the system $\vec{v} = c_1 \vec{b}_1 + c_2 \vec{b}_2$. This grounds the problem.
2.  **Derive the Change of Basis Matrix.** Let $\vec{v}$ be a vector in a space $V$, and let $\mathcal{B} = \{\vec{b}_1, \dots, \vec{b}_n\}$ and $\mathcal{C} = \{\vec{c}_1, \dots, \vec{c}_n\}$ be two bases for $V$. The coordinates of $\vec{v}$ in basis $\mathcal{B}$ are $[\vec{v}]_{\mathcal{B}} = \begin{pmatrix} k_1 \\ \vdots \\ k_n \end{pmatrix}$, meaning $\vec{v} = k_1 \vec{b}_1 + \dots + k_n \vec{b}_n$. Apply the coordinate mapping with respect to $\mathcal{C}$ to both sides. By linearity, $[\vec{v}]_{\mathcal{C}} = k_1 [\vec{b}_1]_{\mathcal{C}} + \dots + k_n [\vec{b}_n]_{\mathcal{C}}$. Recognize this as a matrix-vector product.
3.  **Define the Matrix.** The result from step 2 is precisely $[\vec{v}]_{\mathcal{C}} = \begin{bmatrix} [\vec{b}_1]_{\mathcal{C}} & [\vec{b}_2]_{\mathcal{C}} & \dots & [\vec{b}_n]_{\mathcal{C}} \end{bmatrix} \begin{pmatrix} k_1 \\ \vdots \\ k_n \end{pmatrix}$. This matrix, which converts $\mathcal{B}$-coordinates to $\mathcal{C}$-coordinates, is the change-of-basis matrix from $\mathcal{B}$ to $\mathcal{C}$, denoted $P_{\mathcal{C} \leftarrow \mathcal{B}}$.
4.  **Master the Standard Basis Shortcut.** Finding the columns $[\vec{b}_i]_{\mathcal{C}}$ can be tedious. The easiest path is often through the standard basis $\mathcal{E}$. The matrix from $\mathcal{B}$ to $\mathcal{E}$ is trivial: $P_{\mathcal{E} \leftarrow \mathcal{B}} = \begin{bmatrix} \vec{b}_1 & \vec{b}_2 & \dots & \vec{b}_n \end{bmatrix}$. To go from $\mathcal{E}$ to $\mathcal{B}$, we need the inverse: $P_{\mathcal{B} \leftarrow \mathcal{E}} = (P_{\mathcal{E} \leftarrow \mathcal{B}})^{-1}$.
5.  **Chain the Operations.** To go from $\mathcal{B}$ to $\mathcal{C}$, first go from $\mathcal{B}$ to $\mathcal{E}$, then from $\mathcal{E}$ to $\mathcal{C}$. This gives the master formula: $P_{\mathcal{C} \leftarrow \mathcal{B}} = P_{\mathcal{C} \leftarrow \mathcal{E}} \ P_{\mathcal{E} \leftarrow \mathcal{B}} = (P_{\mathcal{E} \leftarrow \mathcal{C}})^{-1} P_{\mathcal{E} \leftarrow \mathcal{B}}$. Solve several 2x2 and 3x3 problems using this formula until it is automatic.

## Key ideas, with intuition
1.  **Vectors are real; coordinates are shadows.** Think of a vector $\vec{v}$ as a physical arrow in space. A basis is like a set of walls in a room (e.g., the front wall and the left wall). The coordinates of $\vec{v}$ are the shadow lengths it casts on those walls. If you rotate the room (change the basis), the arrow itself doesn't change, but its shadow lengths (coordinates) do.

2.  **The change-of-basis matrix translates descriptions.** The matrix $P_{\mathcal{C} \leftarrow \mathcal{B}}$ is a dictionary. It takes a description of a vector written in the "language" of basis $\mathcal{B}$ and translates it into the "language" of basis $\mathcal{C}$. The underlying vector remains the same.
    $$[\vec{v}]_{\mathcal{C}} = P_{\mathcal{C} \leftarrow \mathcal{B}} [\vec{v}]_{\mathcal{B}}$$

3.  **The columns of the matrix are the old basis vectors described in the new language.** This is the most crucial construction. To build the translator from $\mathcal{B}$ to $\mathcal{C}$, you must explain what the old basis vectors look like from the perspective of the new basis.
    $$P_{\mathcal{C} \leftarrow \mathcal{B}} = \begin{bmatrix} [\vec{b}_1]_{\mathcal{C}} & [\vec{b}_2]_{\mathcal{C}} & \dots & [\vec{b}_n]_{\mathcal{C}} \end{bmatrix}$$
    This formula tells you exactly what to compute: find the coordinates of each old basis vector $\vec{b}_i$ with respect to the new basis $\mathcal{C}$ and stack them as columns.

## Worked example
Let bases for $\mathbb{R}^2$ be $\mathcal{B} = \{\vec{b}_1, \vec{b}_2\} = \{\begin{pmatrix} -9 \\ 1 \end{pmatrix}, \begin{pmatrix} -5 \\ -1 \end{pmatrix}\}$ and $\mathcal{C} = \{\vec{c}_1, \vec{c}_2\} = \{\begin{pmatrix} 1 \\ -4 \end{pmatrix}, \begin{pmatrix} 3 \\ -5 \end{pmatrix}\}$.
Given a vector $\vec{x}$ with coordinates $[\vec{x}]_{\mathcal{B}} = \begin{pmatrix} 1 \\ -2 \end{pmatrix}$, find $[\vec{x}]_{\mathcal{C}}$.

**Step 1: Find the change-of-basis matrix from $\mathcal{B}$ to the standard basis $\mathcal{E}$.**
This is the easy direction. The columns are simply the vectors of $\mathcal{B}$.
$$P_{\mathcal{E} \leftarrow \mathcal{B}} = \begin{bmatrix} \vec{b}_1 & \vec{b}_2 \end{bmatrix} = \begin{pmatrix} -9 & -5 \\ 1 & -1 \end{pmatrix}$$

**Step 2: Find the change-of-basis matrix from $\mathcal{C}$ to the standard basis $\mathcal{E}$.**
Similarly, the columns are the vectors of $\mathcal{C}$.
$$P_{\mathcal{E} \leftarrow \mathcal{C}} = \begin{bmatrix} \vec{c}_1 & \vec{c}_2 \end{bmatrix} = \begin{pmatrix} 1 & 3 \\ -4 & -5 \end{pmatrix}$$

**Step 3: Compute the change-of-basis matrix from $\mathcal{B}$ to $\mathcal{C}$.**
We use the formula $P_{\mathcal{C} \leftarrow \mathcal{B}} = (P_{\mathcal{E} \leftarrow \mathcal{C}})^{-1} P_{\mathcal{E} \leftarrow \mathcal{B}}$. First, find the inverse of $P_{\mathcal{E} \leftarrow \mathcal{C}}$.
For a $2 \times 2$ matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, the inverse is $\frac{1}{ad-bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.
$\det(P_{\mathcal{E} \leftarrow \mathcal{C}}) = (1)(-5) - (3)(-4) = -5 + 12 = 7$.
$$(P_{\mathcal{E} \leftarrow \mathcal{C}})^{-1} = \frac{1}{7} \begin{pmatrix} -5 & -3 \\ 4 & 1 \end{pmatrix}$$
Now, multiply to get the final matrix:
$$P_{\mathcal{C} \leftarrow \mathcal{B}} = \frac{1}{7} \begin{pmatrix} -5 & -3 \\ 4 & 1 \end{pmatrix} \begin{pmatrix} -9 & -5 \\ 1 & -1 \end{pmatrix} = \frac{1}{7} \begin{pmatrix} 45-3 & 25+3 \\ -36+1 & -20-1 \end{pmatrix} = \frac{1}{7} \begin{pmatrix} 42 & 28 \\ -35 & -21 \end{pmatrix} = \begin{pmatrix} 6 & 4 \\ -5 & -3 \end{pmatrix}$$

**Step 4: Convert the coordinate vector.**
Apply the matrix to the coordinate vector $[\vec{x}]_{\mathcal{B}}$.
$$[\vec{x}]_{\mathcal{C}} = P_{\mathcal{C} \leftarrow \mathcal{B}} [\vec{x}]_{\mathcal{B}} = \begin{pmatrix} 6 & 4 \\ -5 & -3 \end{pmatrix} \begin{pmatrix} 1 \\ -2 \end{pmatrix} = \begin{pmatrix} 6-8 \\ -5+6 \end{pmatrix} = \begin{pmatrix} -2 \\ 1 \end{pmatrix}$$

**Reflection:** Each step was a logical consequence of the previous. Step 1 and 2 are data entry, just writing the bases as matrix columns. Step 3 is the core calculation, where we "undo" the $\mathcal{C}$ basis (via the inverse) to get back to the standard basis language, then apply the $\mathcal{B}$ basis matrix. Step 4 is the final translation, applying our derived "dictionary" to the specific coordinate vector.

## Diagrams
Here is a vector $\vec{v}$ described by two different bases in $\mathbb{R}^2$. The standard basis $\mathcal{E}=\{\hat{e}_1, \hat{e}_2\}$ and a new basis $\mathcal{B}=\{\vec{b}_1, \vec{b}_2\}$.

```text
       ^ e2
       |
       |
   b2  |      /
    \  |     / v
     \ |    /
      \|   /
-------+-----------> e1
       |  /
       | /
       |/
       +-----> b1

```
The vector $\vec{v}$ is the same physical arrow.
In the standard basis, we get to $\vec{v}$ by moving some amount along $\hat{e}_1$ and some amount along $\hat{e}_2$.
$$ \vec{v} = x_1 \hat{e}_1 + x_2 \hat{e}_2 \implies [\vec{v}]_{\mathcal{E}} = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} $$
In the $\mathcal{B}$ basis, we get to the *same* $\vec{v}$ by moving some different amount $c_1$ along $\vec{b}_1$ and $c_2$ along $\vec{b}_2$.
$$ \vec{v} = c_1 \vec{b}_1 + c_2 \vec{b}_2 \implies [\vec{v}]_{\mathcal{B}} = \begin{pmatrix} c_1 \\ c_2 \end{pmatrix} $$
The change of basis matrix converts $\begin{pmatrix} c_1 \\ c_2 \end{pmatrix}$ into $\begin{pmatrix} x_1 \\ x_2 \end{pmatrix}$ or vice versa.

## Memory technique — remember this forever
1.  **The Mnemonic Story:** The notation $P_{\mathcal{C} \leftarrow \mathcal{B}}$ tells you the direction of travel. Read the arrow "$\leftarrow$" as "from". This is the matrix that converts coordinates **from** $\mathcal{B}$ **to** $\mathcal{C}$. The equation then writes itself: the matrix must multiply a $\mathcal{B}$-coordinate vector to produce a $\mathcal{C}$-coordinate vector.
    $$[\text{new coordinates}] = P_{\text{new} \leftarrow \text{old}} [\text{old coordinates}]$$

2.  **Formulas to Overlearn:**
    *   **The Action:** $[\vec{v}]_{\mathcal{C}} = P_{\mathcal{C} \leftarrow \mathcal{B}} [\vec{v}]_{\mathcal{B}}$
    *   **The Construction:** $P_{\mathcal{C} \leftarrow \mathcal{B}} = \begin{bmatrix} [\vec{b}_1]_{\mathcal{C}} & [\vec{b}_2]_{\mathcal{C}} & \dots & [\vec{b}_n]_{\mathcal{C}} \end{bmatrix}$
    *   **The Computation:** $P_{\mathcal{C} \leftarrow \mathcal{B}} = [P_{\mathcal{E} \leftarrow \mathcal{C}}]^{-1} [P_{\mathcal{E} \leftarrow \mathcal{B}}]$

3.  **Spaced Repetition Schedule:** Review this topic and solve one problem at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, rebuild it from the definition of coordinates.
    *   Start with $\vec{v} = k_1\vec{b}_1 + k_2\vec{b}_2 + \dots + k_n\vec{b}_n$. This means $[\vec{v}]_{\mathcal{B}} = (k_1, \dots, k_n)^T$.
    *   You want $[\vec{v}]_{\mathcal{C}}$. Just apply the "find coordinates in basis $\mathcal{C}$" operation to the entire equation. Since this is a linear map, it distributes:
    *   $[\vec{v}]_{\mathcal{C}} = [k_1\vec{b}_1 + \dots + k_n\vec{b}_n]_{\mathcal{C}} = k_1[\vec{b}_1]_{\mathcal{C}} + k_2[\vec{b}_2]_{\mathcal{C}} + \dots + k_n[\vec{b}_n]_{\mathcal{C}}$.
    *   Recognize this as the matrix-vector product $\begin{bmatrix} [\vec{b}_1]_{\mathcal{C}} & \dots & [\vec{b}_n]_{\mathcal{C}} \end{bmatrix} \begin{pmatrix} k_1 \\ \vdots \\ k_n \end{pmatrix}$. You have just re-derived the change of basis matrix and its application.

## Common mistakes
1.  **Directional Error:** Calculating $P_{\mathcal{B} \leftarrow \mathcal{C}}$ when you need $P_{\mathcal{C} \leftarrow \mathcal{B}}$. Remember $(P_{\mathcal{C} \leftarrow \mathcal{B}})^{-1} = P_{\mathcal{B} \leftarrow \mathcal{C}}$. The mnemonic $P_{\text{new} \leftarrow \text{old}}$ prevents this.
2.  **Matrix Construction Error:** When computing $P_{\mathcal{C} \leftarrow \mathcal{B}}$ via the "shortcut" $P_{\mathcal{C} \leftarrow \mathcal{E}} P_{\mathcal{E} \leftarrow \mathcal{B}}$, writing the matrices as $[\mathcal{C}]^{-1}[\mathcal{B}]$ for short. Students sometimes compute $[\mathcal{B}][\mathcal{C}]^{-1}$ instead. The mnemonic shows the order of operations must convert the vector first via $P_{\mathcal{E} \leftarrow \mathcal{B}}$.
3.  **Forgetting the Inverse:** Going from a non-standard basis $\mathcal{B}$ to the standard basis $\mathcal{E}$ is easy: $P_{\mathcal{E} \leftarrow \mathcal{B}}$ has the vectors of $\mathcal{B}$ as its columns. Going from $\mathcal{E}$ to $\mathcal{B}$ requires the inverse: $P_{\mathcal{B} \leftarrow \mathcal{E}} = (P_{\mathcal{E} \leftarrow \mathcal{B}})^{-1}$. It's a common mistake to just use the matrix of $\mathcal{B}$ vectors for both directions.

## Self-check
1.  Let $\mathcal{B} = \{\begin{pmatrix} 3 \\ 1 \end{pmatrix}, \begin{pmatrix} -1 \\ 2 \end{pmatrix}\}$ be a basis for $\mathbb{R}^2$. The vector $\vec{v}$ has coordinates $[\vec{v}]_{\mathcal{B}} = \begin{pmatrix} 2 \\ 5 \end{pmatrix}$. What is $\vec{v}$ in the standard basis?
2.  Let $\mathcal{B} = \{\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}\}$ and $\mathcal{C} = \{\begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix}\}$ be bases for $\mathbb{R}^3$. Find the change-of-basis matrix $P_{\mathcal{B} \leftarrow \mathcal{C}}$.
3.  Consider the space $\mathbb{P}_2$ of polynomials of degree at most 2. Let $T: \mathbb{P}_2 \to \mathbb{P}_2$ be the differentiation operator, $T(p(t)) = p'(t)$. Find the matrix for $T$ with respect to the basis $\mathcal{B} = \{1, t, t^2\}$. Then, find the matrix for $T$ with respect to the basis $\mathcal{C} = \{1, t-1, (t-1)^2\}$. Verify that $[T]_{\mathcal{C}} = P_{\mathcal{C} \leftarrow \mathcal{B}} [T]_{\mathcal{B}} P_{\mathcal{B} \leftarrow \mathcal{C}}$.