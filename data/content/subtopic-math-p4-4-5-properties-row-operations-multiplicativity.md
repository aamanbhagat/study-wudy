## What it is
The determinant of a square matrix is a single number that encodes how the corresponding linear transformation scales volume and changes orientation. The properties we are studying describe precisely how the determinant changes when we perform elementary row operations on the matrix, and how the determinant of a product of matrices relates to their individual determinants.

## Why it matters
These properties are the foundation of the most efficient algorithm for computing determinants, which is Gaussian elimination. In machine learning, the determinant of a covariance matrix (the "generalized variance") measures the volume of data spread. In aerospace, the Jacobian determinant is used in computational fluid dynamics to handle transformations between physical and computational coordinates, ensuring that physical laws like conservation of mass are correctly modeled on distorted grids.

## When to study it
You must be comfortable with the definition of a determinant, specifically calculation via cofactor expansion for $2 \times 2$ and $3 \times 3$ matrices. You also need to be fluent in the three elementary row operations: row swapping, row scaling, and adding a multiple of one row to another. Understanding that a matrix represents a linear transformation is crucial for the intuition.

## How to study it (step by step)
1.  **Revisit the geometric intuition.** Draw a unit square in $\mathbb{R}^2$ and its image under a simple $2 \times 2$ matrix transformation. Calculate the area of the resulting parallelogram and verify it equals the determinant. This grounds the abstract rules.
2.  **Derive the scaling rule.** Take a generic $2 \times 2$ matrix $A$. Write down its determinant. Now, create a new matrix $A'$ by multiplying the first row by a scalar $c$. Calculate $\det(A')$ and show from the definition that $\det(A') = c \det(A)$. This is the most straightforward derivation.
3.  **Derive the row-addition rule.** This relies on the *multilinearity* of the determinant. For a $2 \times 2$ matrix $A$ with rows $\mathbf{r}_1, \mathbf{r}_2$, show that $\det(\mathbf{r}_1 + c\mathbf{r}_2, \mathbf{r}_2) = \det(\mathbf{r}_1, \mathbf{r}_2) + c\det(\mathbf{r}_2, \mathbf{r}_2)$. Since a matrix with two identical rows has a determinant of zero (it collapses a volume to a lower dimension), the second term vanishes, leaving the determinant unchanged.
4.  **Derive the row-swap rule.** Use the rule you just derived. Start with rows $\mathbf{r}_1, \mathbf{r}_2$. Consider the sequence of operations: $\mathbf{r}_1 \to \mathbf{r}_1 + \mathbf{r}_2$; then $\mathbf{r}_2 \to \mathbf{r}_2 - \mathbf{r}_1$; then $\mathbf{r}_1 \to \mathbf{r}_1 + \mathbf{r}_2$. This sequence swaps the rows but only uses row-addition and scaling. Track the determinant through these steps to prove it flips sign.
5.  **Master the multiplicative property.** The standard proof uses elementary matrices. First, verify that for any elementary matrix $E$ and any matrix $A$, $\det(EA) = \det(E)\det(A)$. Then, recall that any invertible matrix $A$ can be written as a product of elementary matrices, $A = E_k \cdots E_2 E_1$. Apply the rule repeatedly to prove $\det(AB) = \det(A)\det(B)$.
6.  **Practice.** Find five $4 \times 4$ matrices online and compute their determinants using row reduction to an upper-triangular form. This forces you to use the properties repeatedly and builds computational fluency.

## Key ideas, with intuition
1.  **Determinant as Signed Volume Scaling Factor.** This is the central intuition. A linear transformation maps a unit hypercube to a parallelepiped. The determinant is the volume of that parallelepiped. The *sign* of the determinant tells you if the orientation of space was preserved (+) or flipped (-).

2.  **Row Operations are Geometric Transformations.**
    *   **Scaling a row by $c$:** This stretches the space along one of its axis-aligned vectors. This directly scales the volume of the resulting parallelepiped by the same factor $c$.
        $$ \det(E_{\text{scale}}) = c $$
    *   **Adding a multiple of one row to another:** This is a *shear* transformation. A shear tilts one axis, turning squares into parallelograms, but it does not change the base or the height. Therefore, it preserves the volume.
        $$ \det(E_{\text{add}}) = 1 $$
    *   **Swapping two rows:** This is equivalent to a reflection across a line (like $y=x$ in 2D). A reflection flips the orientation of space, so the signed volume flips its sign.
        $$ \det(E_{\text{swap}}) = -1 $$

3.  **Multiplicativity: $\det(AB) = \det(A)\det(B)$**
    This means the volume scaling factor of a composite transformation (applying $B$ then $A$) is the product of the individual scaling factors. If transformation $B$ scales volumes by a factor of 5, and transformation $A$ scales volumes by a factor of 2, applying them in sequence must scale volumes by $2 \times 5 = 10$.

## Worked example
Let's compute the determinant of $A = \begin{pmatrix} 0 & 1 & 5 \\ 3 & -6 & 9 \\ 2 & 6 & 1 \end{pmatrix}$ using row operations. The goal is to reach an upper triangular matrix, whose determinant is the product of its diagonal entries.

1.  **Step 1: Get a non-zero entry in the top-left pivot position.**
    We swap Row 1 and Row 2. This operation multiplies the determinant by $-1$.
    $$ A \xrightarrow{R_1 \leftrightarrow R_2} A' = \begin{pmatrix} 3 & -6 & 9 \\ 0 & 1 & 5 \\ 2 & 6 & 1 \end{pmatrix} $$
    So, $\det(A) = -1 \cdot \det(A')$.

2.  **Step 2: Simplify a row.**
    Row 1 has a common factor of 3. We can factor it out. This is a row scaling operation $R_1 \to \frac{1}{3}R_1$.
    $$ A' \xrightarrow{\frac{1}{3}R_1} A'' = \begin{pmatrix} 1 & -2 & 3 \\ 0 & 1 & 5 \\ 2 & 6 & 1 \end{pmatrix} $$
    The scaling property states that $\det(A') = 3 \cdot \det(A'')$. Combining with the previous step, we have $\det(A) = -1 \cdot (3 \cdot \det(A'')) = -3 \det(A'')$.

3.  **Step 3: Eliminate entries below the first pivot.**
    The entry in the (2,1) position is already zero. We eliminate the (3,1) entry with the operation $R_3 \to R_3 - 2R_1$. This is adding a multiple of one row to another, which does not change the determinant.
    $$ A'' \xrightarrow{R_3 - 2R_1} A''' = \begin{pmatrix} 1 & -2 & 3 \\ 0 & 1 & 5 \\ 0 & 10 & -5 \end{pmatrix} $$
    So, $\det(A'') = \det(A''')$. Our running total is $\det(A) = -3 \det(A''')$.

4.  **Step 4: Eliminate entries below the second pivot.**
    We eliminate the (3,2) entry with $R_3 \to R_3 - 10R_2$. This also does not change the determinant.
    $$ A''' \xrightarrow{R_3 - 10R_2} U = \begin{pmatrix} 1 & -2 & 3 \\ 0 & 1 & 5 \\ 0 & 0 & -55 \end{pmatrix} $$
    So, $\det(A''') = \det(U)$. Our running total is $\det(A) = -3 \det(U)$.

5.  **Step 5: Compute the determinant of the final matrix.**
    $U$ is upper triangular. Its determinant is the product of its diagonal entries:
    $$ \det(U) = 1 \cdot 1 \cdot (-55) = -55 $$

6.  **Step 6: Calculate the original determinant.**
    Substitute back:
    $$ \det(A) = -3 \det(U) = -3(-55) = 165 $$

*Reflection*: Each step isolated a geometric transformation. The swap flipped the orientation ($-1$). The scaling stretched the volume ($ \times 3$). The shears preserved the volume ($\times 1$). By tracking these factors, we converted a complex calculation into a simple product.

## Diagrams
Here is how two key row operations affect the unit square in $\mathbb{R}^2$, whose vertices are $(0,0), (1,0), (0,1), (1,1)$.

1.  **Row Scaling:** $R_2 \to 2R_2$ corresponds to the matrix $A = \begin{pmatrix} 1 & 0 \\ 0 & 2 \end{pmatrix}$.
    $\det(A) = 2$. The area doubles.

    ```text
       y                                 y
       ^                                 ^
       |                                 |
     2 + . . . . . . . . . . . . . . . . + (0,2)-----+(1,2)
       |                                 |         /|
       |                                 |        / |
     1 + (0,1)-----+(1,1)   ===>        1 +       /  | Area = 2
       |   |       |         A          |      /   |
       |   | Area=1|                     |     /    |
       |   o-------+-----> x           --o----(1,0)-+-----> x
       +------------------           +--------------------
    ```

2.  **Row Addition (Shear):** $R_1 \to R_1 + R_2$ corresponds to the matrix $B = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$.
    $\det(B) = 1$. The area is unchanged.

    ```text
       y                                 y
       ^                                 ^
       |                                 |          / (1,1)
     1 + (0,1)-----+(1,1)   ===>        1 + (0,1)---+----+(2,1)
       |   |       |         B          |   |      /|
       |   | Area=1|                     |   | Area=1|
       |   o-------+-----> x             |   o------+-----> x
       +------------------           +--------------------
    ```

## Memory technique — remember this forever
1.  **Mnemonic:** "Swap Sign, Scale Scales, Shear Stays."
    *   **Swap** a row: flip the **Sign**.
    *   **Scale** a row by $c$: the determinant **Scales** by $c$.
    *   **Shear** the matrix (add a multiple of a row to another): the determinant **Stays** the same.
    For multiplicativity, think: "Successive scaling multiplies."

2.  **Formulas to Overlearn:**
    *   $\det(AB) = \det(A)\det(B)$
    *   If $A \xrightarrow{R_i \leftrightarrow R_j} B$, then $\det(B) = -\det(A)$.
    *   If $A \xrightarrow{cR_i \to R_i} B$, then $\det(B) = c \det(A)$.
    *   If $A \xrightarrow{R_i + cR_j \to R_i} B$, then $\det(B) = \det(A)$.

3.  **Spaced Repetition Schedule:** Review these rules and re-do the worked example in 1 day, 3 days, 7 days, 16 days, and 35 days.

4.  **First Principles Pathway:** If you forget, re-derive from the geometric picture of the determinant as a signed volume scaling factor.
    *   *Swap*: Swapping two basis vectors is a reflection, which flips orientation. Sign must flip.
    *   *Scale*: Stretching one basis vector by $c$ stretches the entire volume by $c$.
    *   *Shear*: Tilting one basis vector parallel to another doesn't change the height of the parallelepiped relative to its base. Volume is constant.
    *   *Multiplicativity*: Applying two transformations is applying two successive volume scalings. The total scaling must be the product of the individual scalings.

## Common mistakes
1.  **Forgetting the sign change on row swaps.** This is the most frequent error in determinant computation via row reduction. Always write "$\times (-1)$" next to the arrow when you swap rows.
2.  **Confusing scaling a row with scaling a matrix.** Scaling one row by $c$ multiplies the determinant by $c$. Scaling the *entire* $n \times n$ matrix by $c$ means you scale *every one* of the $n$ rows by $c$. Thus, $\det(cA) = c^n \det(A)$.
3.  **Assuming the determinant is linear.** Students often incorrectly assume $\det(A+B) = \det(A) + \det(B)$. This is false. The determinant is *multilinear* in its rows/columns, which is a different, more complex property.
4.  **Losing track of scaling factors.** When you scale a row $R_i \to \frac{1}{k} R_i$ to get a 1 in the pivot, you are dividing the determinant by $k$. Remember to multiply your final answer by $k$ to compensate.

## Self-check
1.  Use row operations to compute the determinant of $A = \begin{pmatrix} 2 & 4 & 6 \\ 1 & 1 & 1 \\ 1 & -1 & 2 \end{pmatrix}$.
2.  Suppose $A$ and $B$ are $n \times n$ matrices. If $\det(A) = 3$ and $\det(AB) = -12$, is $B$ invertible? Justify your answer without finding $B$.
3.  Let $E$ be an elementary matrix representing the row operation $R_2 \to R_2 - 5R_1$ on a $3 \times 3$ matrix. What is $\det(E)$? Using only the property $\det(XY) = \det(X)\det(Y)$, prove that $\det(EA) = \det(A)$ for any $3 \times 3$ matrix $A$.