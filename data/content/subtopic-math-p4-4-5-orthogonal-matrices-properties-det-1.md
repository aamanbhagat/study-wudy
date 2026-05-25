## What it is
An orthogonal matrix is a square matrix $Q$ whose columns form an orthonormal set of vectors. This means each column vector has a length of 1, and is perpendicular to every other column vector. Algebraically, this is equivalent to the condition that its transpose is its inverse: $Q^T Q = I$.

## Why it matters
Orthogonal matrices represent rigid transformations like rotations and reflections, which do not change the length of vectors or the angles between them. They are fundamental in computer graphics and robotics for describing object orientation. In machine learning, they are crucial for numerical stability in algorithms like QR decomposition and for decorrelating data in Principal Component Analysis (PCA).

## When to study it
You must be fluent with the following prerequisites. If not, master them first.
- Matrix multiplication, transpose ($A^T$), and inverse ($A^{-1}$).
- The identity matrix ($I$).
- The vector dot product (inner product), $\vec{u} \cdot \vec{v}$, and its relation to matrix multiplication ($\vec{u}^T \vec{v}$).
- The concept of vector norm (length), $\|\vec{v}\| = \sqrt{\vec{v} \cdot \vec{v}}$.
- Orthonormal vectors: a set of vectors $\{\vec{q}_1, \dots, \vec{q}_n\}$ where $\vec{q}_i \cdot \vec{q}_j = \delta_{ij}$ (1 if $i=j$, 0 if $i \neq j$).
- Properties of determinants, especially $\det(AB) = \det(A)\det(B)$ and $\det(A^T) = \det(A)$.

## How to study it (step by step)
1.  **Internalize the Definition.** Write down the definition $Q^T Q = I$. For a $2 \times 2$ matrix $Q = \begin{pmatrix} \vec{q}_1 & \vec{q}_2 \end{pmatrix}$, write out $Q^T Q$ explicitly. See that the diagonal entries are $\vec{q}_1^T \vec{q}_1 = 1$ and $\vec{q}_2^T \vec{q}_2 = 1$, and the off-diagonals are $\vec{q}_1^T \vec{q}_2 = 0$ and $\vec{q}_2^T \vec{q}_1 = 0$. This directly shows the columns are orthonormal.
2.  **Derive Length Preservation.** Prove that orthogonal matrices preserve vector lengths. Start with the squared norm of a transformed vector, $\|Q\vec{x}\|^2$. Use the property $(A\vec{b})^T = \vec{b}^T A^T$ to show $\|Q\vec{x}\|^2 = (Q\vec{x})^T(Q\vec{x}) = \vec{x}^T Q^T Q \vec{x} = \vec{x}^T I \vec{x} = \vec{x}^T \vec{x} = \|\vec{x}\|^2$. This is the core geometric property.
3.  **Derive the Determinant Property.** Take the definition $Q^T Q = I$ and apply the determinant to both sides: $\det(Q^T Q) = \det(I)$. Use the properties of determinants to get $\det(Q^T)\det(Q) = 1$. Since $\det(Q^T) = \det(Q)$, this simplifies to $(\det(Q))^2 = 1$. The only real numbers that satisfy this are $\det(Q) = \pm 1$.
4.  **Connect to 2D Geometry.** Consider the standard rotation matrix $R_\theta = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$. Verify it is orthogonal by computing $R_\theta^T R_\theta$. Calculate its determinant. Now do the same for a reflection matrix, e.g., $F = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$ (reflection across the x-axis). Note the determinant is -1.
5.  **Solve a Completion Problem.** Given two orthonormal columns $\vec{q}_1, \vec{q}_2$ of a $3 \times 3$ orthogonal matrix, find a valid third column $\vec{q}_3$. Hint: $\vec{q}_3$ must be orthogonal to both $\vec{q}_1$ and $\vec{q}_2$. The cross product $\vec{q}_1 \times \vec{q}_2$ gives a vector with this property. You just need to normalize it.

## Key ideas, with intuition
1.  **Rigid Transformations:** The core intuition is that orthogonal matrices don't change the "shape" of space. They are rigid motions. All lengths and angles are preserved. If you apply $Q$ to the vertices of a cube, you get a rotated or reflected cube, not a stretched box (a parallelepiped).
2.  **Columns as a "Perfect Basis":** The columns of an $n \times n$ orthogonal matrix form an orthonormal basis for $\mathbb{R}^n$. Think of them as a new set of perpendicular coordinate axes, where each axis vector has length 1. The matrix $Q$ is the transformation that maps the standard basis vectors $(\hat{e}_1, \hat{e}_2, \dots)$ to this new basis $(\vec{q}_1, \vec{q}_2, \dots)$.
    $$
    Q \hat{e}_i = \vec{q}_i
    $$
3.  **Inverse is Cheap:** The single most important computational property is that the inverse is the transpose: $Q^{-1} = Q^T$. Finding a matrix inverse is generally a costly operation (e.g., using Gaussian elimination). For an orthogonal matrix, it's virtually free—you just swap rows and columns.
4.  **Determinant is Orientation:** The determinant tells you if the transformation preserves "handedness."
    -   $\det(Q) = +1$: A **proper rotation**. A right-handed coordinate system remains right-handed.
    -   $\det(Q) = -1$: An **improper rotation** (a reflection or a rotation followed by a reflection). A right-handed coordinate system is flipped into a left-handed one.

## Worked example
**Problem:** Given the vectors $\vec{q}_1 = \frac{1}{3}\begin{pmatrix} 2 \\ 1 \\ 2 \end{pmatrix}$ and $\vec{q}_2 = \frac{1}{3}\begin{pmatrix} -2 \\ 2 \\ 1 \end{pmatrix}$, find a vector $\vec{q}_3$ such that the matrix $Q = \begin{pmatrix} \vec{q}_1 & \vec{q}_2 & \vec{q}_3 \end{pmatrix}$ is orthogonal with $\det(Q)=1$.

**Solution:**
1.  **Verify Orthonormality of Given Vectors:**
    First, check their norms.
    $\|\vec{q}_1\|^2 = \frac{1}{9}(2^2 + 1^2 + 2^2) = \frac{1}{9}(4+1+4) = \frac{9}{9} = 1$.
    $\|\vec{q}_2\|^2 = \frac{1}{9}((-2)^2 + 2^2 + 1^2) = \frac{1}{9}(4+4+1) = \frac{9}{9} = 1$.
    The vectors are unit length.
    Next, check their dot product.
    $\vec{q}_1 \cdot \vec{q}_2 = \frac{1}{9}(2(-2) + 1(2) + 2(1)) = \frac{1}{9}(-4+2+2) = 0$.
    They are orthogonal.

2.  **Find an Orthogonal Vector $\vec{v}$:**
    The third column $\vec{q}_3$ must be orthogonal to both $\vec{q}_1$ and $\vec{q}_2$. The cross product gives such a vector.
    $$
    \vec{v} = \vec{q}_1 \times \vec{q}_2 = \frac{1}{3}\begin{pmatrix} 2 \\ 1 \\ 2 \end{pmatrix} \times \frac{1}{3}\begin{pmatrix} -2 \\ 2 \\ 1 \end{pmatrix} = \frac{1}{9} \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 2 & 1 & 2 \\ -2 & 2 & 1 \end{vmatrix}
    $$
    $$
    \vec{v} = \frac{1}{9} (\hat{i}(1-4) - \hat{j}(2 - (-4)) + \hat{k}(4 - (-2))) = \frac{1}{9} \begin{pmatrix} -3 \\ -6 \\ 6 \end{pmatrix} = \frac{1}{3} \begin{pmatrix} -1 \\ -2 \\ 2 \end{pmatrix}
    $$

3.  **Normalize $\vec{v}$ to get $\vec{q}_3$:**
    Calculate the norm of $\vec{v}$.
    $\|\vec{v}\|^2 = \frac{1}{9}((-1)^2 + (-2)^2 + 2^2) = \frac{1}{9}(1+4+4) = \frac{9}{9} = 1$.
    The vector $\vec{v}$ is already a unit vector, so we can set $\vec{q}_3 = \vec{v}$.
    So, $\vec{q}_3 = \frac{1}{3}\begin{pmatrix} -1 \\ -2 \\ 2 \end{pmatrix}$.

4.  **Construct $Q$ and Check Determinant:**
    $$
    Q = \frac{1}{3} \begin{pmatrix} 2 & -2 & -1 \\ 1 & 2 & -2 \\ 2 & 1 & 2 \end{pmatrix}
    $$
    We need $\det(Q)=1$. Let's calculate it.
    $\det(Q) = (\frac{1}{3})^3 \det \begin{pmatrix} 2 & -2 & -1 \\ 1 & 2 & -2 \\ 2 & 1 & 2 \end{pmatrix}$
    $= \frac{1}{27} [2(4 - (-2)) - (-2)(2 - (-4)) + (-1)(1-4)]$
    $= \frac{1}{27} [2(6) + 2(6) - 1(-3)] = \frac{1}{27} [12 + 12 + 3] = \frac{27}{27} = 1$.

The condition is satisfied. If we had found $\det(Q) = -1$, we could have simply used $-\vec{q}_3$ as the third column, which would flip the sign of the determinant while preserving orthonormality.

**Reflection:** Each step builds on the last. We used the definition of orthonormality to check the inputs, a standard vector construction (cross product) to find an orthogonal vector, normalization to satisfy the length constraint, and finally the determinant property to confirm the orientation.

## Diagrams

A 2D rotation, which is an orthogonal transformation with $\det(Q)=1$. The basis vectors $(\hat{i}, \hat{j})$ are transformed into a new orthonormal basis $(\vec{q}_1, \vec{q}_2)$.

```text
      y
      ^
      |
 q2   |  q1
  \   |  /
   \  | /
    \ |/
      +------> x
     /
    /
   /

Initial Basis: i = (1,0), j = (0,1)
Transformed Basis: q1 = Q*i, q2 = Q*j
Lengths and the 90-degree angle are preserved.
```

A 2D reflection across the y-axis, an orthogonal transformation with $\det(Q)=-1$.

```text
      y
      ^
      |
q2    |
<-----+-----> q1
      |
      |
      +------> x

Initial Basis: i = (1,0), j = (0,1)
Transformed Basis: q1 = (-1,0), q2 = (0,1)
The "handedness" is flipped. (i,j) is a right-handed system,
but (q1,q2) is a left-handed system.
```

## Memory technique — remember this forever
1.  **Mnemonic:** Think **"Ortho-Normal Columns."** The name itself tells you the columns are an orthonormal set. The algebraic definition $Q^T Q = I$ is a "Quality check" that confirms this perfect structure.
2.  **Must Overlearn:** Drill these three facts until they are automatic.
    -   Definition: $Q^T Q = I$ (and $Q Q^T = I$)
    -   Inverse: $Q^{-1} = Q^T$
    -   Determinant: $\det(Q) = \pm 1$
3.  **Spaced Repetition Schedule:** Review these facts and the "first principles" derivation at these intervals from today: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget everything, remember the geometric meaning: **orthogonal transformations preserve length**. From this, you can rebuild everything.
    -   "Preserves length" means $\|Q\vec{x}\| = \|\vec{x}\|$ for all $\vec{x}$.
    -   Square both sides: $\|Q\vec{x}\|^2 = \|\vec{x}\|^2$.
    -   Write as dot products: $(Q\vec{x})^T(Q\vec{x}) = \vec{x}^T\vec{x}$.
    -   Use transpose rule: $\vec{x}^T Q^T Q \vec{x} = \vec{x}^T I \vec{x}$.
    -   This must hold for any $\vec{x}$, so the matrices must be equal: $Q^T Q = I$.
    -   Take determinant of both sides: $\det(Q^T Q) = \det(I) \implies \det(Q^T)\det(Q) = 1 \implies (\det(Q))^2 = 1 \implies \det(Q) = \pm 1$.

## Common mistakes
1.  **Orthonormal vs. Orthogonal:** Forgetting that the column vectors must have unit length (normal). A matrix with orthogonal columns that are not unit vectors is not an orthogonal matrix. E.g., $\begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}$ has orthogonal columns but is not an orthogonal matrix.
2.  **Determinant Fallacy:** Assuming that any matrix with $\det(A) = \pm 1$ is orthogonal. This is false. A shear matrix like $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ has $\det(A)=1$ but it is not orthogonal; it does not preserve lengths.
3.  **Assuming $A^T A = I$ implies $A A^T = I$ for non-square matrices.** This is only true for square matrices. A "tall" matrix can have orthonormal columns ($A^T A = I$) but its rows will not be orthonormal.
4.  **Sign Errors in Cross Products:** When constructing a 3D orthogonal matrix, a simple sign error in the cross product can lead to an incorrect third column. Always double-check the calculation.

## Self-check
1.  Is the matrix $A = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$ orthogonal? What transformation does it represent?
2.  Find all values of $a, b, c$ that make the following matrix orthogonal.
    $$
    Q = \begin{pmatrix} 1/\sqrt{3} & 1/\sqrt{2} & a \\ 1/\sqrt{3} & -1/\sqrt{2} & b \\ 1/\sqrt{3} & 0 & c \end{pmatrix}
    $$
3.  Let $Q_1$ and $Q_2$ be two $n \times n$ orthogonal matrices. Prove that their product, $P = Q_1 Q_2$, is also an orthogonal matrix. What is the determinant of $P$ in terms of the determinants of $Q_1$ and $Q_2$?