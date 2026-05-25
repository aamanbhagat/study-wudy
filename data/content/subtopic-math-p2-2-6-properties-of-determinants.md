## What it is
Properties of determinants are the algebraic rules that dictate how a matrix's determinant—the factor by which a linear transformation scales area or volume—changes when the matrix is manipulated. Instead of recalculating a determinant from scratch every time a matrix is altered, these properties allow you to deduce the new determinant instantly.

## Why it matters
In practice, calculating the determinant of anything larger than a $3 \times 3$ matrix using raw expansion is computationally disastrous (it scales factorially, $O(n!)$). By using determinant properties, algorithms can reduce a matrix to a triangular form and compute the determinant in $O(n^3)$ time. In aerospace engineering and quantum mechanics, properties like $\det(AB) = \det(A)\det(B)$ are used constantly to prove whether coordinate transformations preserve volume (Jacobians) or whether a dynamic system will blow up (eigenvalue analysis).

## When to study it
You must already understand:
1. Basic matrix operations (addition, scalar multiplication, matrix multiplication).
2. How to compute the determinant of $2 \times 2$ and $3 \times 3$ matrices via cofactor expansion.
3. The geometric intuition of a determinant as the signed area (2D) or volume (3D) of a parallelepiped spanned by the matrix's column vectors.
If you do not see a matrix as a geometric transformation, go back and review linear transformations.

## How to study it (step by step)
1. **Prove the multiplicativity property for $2 \times 2$ matrices:** Manually compute $\det(AB)$ and $\det(A)\det(B)$ for generic matrices $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ and $B = \begin{pmatrix} x & y \\ z & w \end{pmatrix}$. 
2. **Visualize row operations:** Draw the unit square spanned by $\hat{i}$ and $\hat{j}$. Apply a row swap, a scalar multiplication, and a shear (adding a multiple of one row to another). Note how the area changes.
3. **Master the triangular shortcut:** Prove to yourself that the determinant of an upper or lower triangular matrix is simply the product of its diagonal entries.
4. **Practice row reduction:** Take three random $3 \times 3$ matrices. Instead of expanding them, use row operations to make them upper-triangular, then multiply the diagonal.
5. **Analyze the scalar trap:** Write out a $3 \times 3$ matrix $A$. Multiply the *entire* matrix by a scalar $c$. Calculate the new determinant to see why it is $c^3\det(A)$, not $c\det(A)$.

## Key ideas, with intuition
**1. Multiplicativity:** 
$$ \det(AB) = \det(A)\det(B) $$
*Intuition:* Matrix $B$ scales space by a factor of $\det(B)$. Matrix $A$ then scales that new space by a factor of $\det(A)$. The total scaling factor of the combined transformation $AB$ is simply the product of the two scaling factors.

**2. The Transpose Property:**
$$ \det(A^T) = \det(A) $$
*Intuition:* The volume of the parallelepiped formed by the row vectors of a matrix is identical to the volume formed by its column vectors. Because of this, any property that applies to the rows of a determinant applies equally to its columns.

**3. Row Operations (The Three Rules):**
*   **Swap:** Swapping two rows multiplies the determinant by $-1$. Geometrically, this flips the orientation of the space (e.g., turning a right-handed coordinate system into a left-handed one).
*   **Scale:** Multiplying a single row by a scalar $k$ multiplies the determinant by $k$. You are stretching the parallelepiped in exactly one dimension.
*   **Shear:** Adding a multiple of one row to another row leaves the determinant **unchanged**. You are skewing the shape, but its base and height remain identical.

## Worked example
Evaluate the determinant of $A$ using properties, rather than brute-force expansion.
$$ A = \begin{pmatrix} 2 & 4 & 6 \\ 1 & 3 & 2 \\ 3 & 5 & 6 \end{pmatrix} $$

**Step 1: Factor out common scalars from a row.**
Row 1 has a common factor of 2. By the Scale property, we can pull it out:
$$ \det(A) = 2 \cdot \det \begin{pmatrix} 1 & 2 & 3 \\ 1 & 3 & 2 \\ 3 & 5 & 6 \end{pmatrix} $$
*(Why: Stretching one axis by 2 doubles the total volume. Pulling it out simplifies the math.)*

**Step 2: Use Shear operations to create zeros below the top-left pivot.**
Replace Row 2 with (Row 2 - Row 1). Replace Row 3 with (Row 3 - 3 $\cdot$ Row 1).
$$ \det(A) = 2 \cdot \det \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & -1 \\ 0 & -1 & -3 \end{pmatrix} $$
*(Why: Shearing preserves volume perfectly. The determinant is unchanged.)*

**Step 3: Use Shear to eliminate the entry below the second pivot.**
Replace Row 3 with (Row 3 + Row 2).
$$ \det(A) = 2 \cdot \det \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & -1 \\ 0 & 0 & -4 \end{pmatrix} $$

**Step 4: Multiply the diagonal of the triangular matrix.**
$$ \det(A) = 2 \cdot (1 \cdot 1 \cdot -4) = -8 $$
*(Why: The volume of a parallelepiped aligned with the axes—or sheared parallel to them—is just the product of its dimensional extents.)*

## Diagrams
The "Shear" property (adding a multiple of one row to another) preserves the determinant. Geometrically, this turns a rectangle into a parallelogram with the same base and height. Area is unchanged.

```text
Before Shear: det(I) = 1        After Shear: R1 -> R1 + 1.5*R2
y                               y
^                               ^
|  +-------+ (1,1)              |        +-------+ (2.5, 1)
|  |       |                    |       /       /
|  |       |                    |      /       /
|  +-------+-----> x            |     +-------+-----> x
  (0,0)   (1,0)                  (0,0)   (1,0)

Area = Base * Height            Area = Base * Height
Area = 1 * 1 = 1                Area = 1 * 1 = 1
```

## Memory technique — remember this forever
1. **The Mnemonic:** For row operations, remember **"SSS: Swap Signs, Scale Sizes, Shears Stay."**
    *   **S**wap rows = flip **S**ign.
    *   **S**cale one row = scale **S**ize of det.
    *   **S**hear (add row to row) = **S**tays the same.
2. **Overlearn these facts:**
    *   $\det(AB) = \det(A)\det(B)$
    *   $\det(cA) = c^n\det(A)$ (where $n$ is the dimension of the matrix).
    *   $\det(A^{-1}) = \frac{1}{\det(A)}$
3. **Spaced Repetition Schedule:** Review these properties and re-derive the scalar trap at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget the rules, write down the $2 \times 2$ Identity matrix $I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$. Its determinant is 1. Apply the operation you forgot to $I$ (e.g., swap the rows to get $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$). Calculate the new determinant ($0 - 1 = -1$). You just proved that swapping rows flips the sign.

## Common mistakes
*   **The Linearity Illusion:** Assuming $\det(A + B) = \det(A) + \det(B)$. This is **fatally wrong**. Area and volume do not add linearly in this way. (Check it yourself with $I + I$).
*   **The Scalar Trap:** Assuming $\det(cA) = c\det(A)$. If $A$ is a $3 \times 3$ matrix, multiplying the whole matrix by $c$ means you are scaling *all three* rows. The determinant becomes $c^3\det(A)$. 
*   **Confusing Matrix Multiplication with Row Scaling:** In matrix algebra, $2A$ multiplies every element by 2. In determinant algebra, pulling a 2 out of a determinant only pulls it from a *single row or column*.

## Self-check
1. Is $\det(A^2) = (\det(A))^2$? Prove it in one sentence using a core property.
2. Let $A$ be a $3 \times 3$ matrix with $\det(A) = 4$. What is the exact numerical value of $\det(2A^{-1})$?
3. A matrix is skew-symmetric if $A^T = -A$. Prove that if a skew-symmetric matrix has an odd dimension $n$ (e.g., $3 \times 3$), its determinant must be exactly zero. (Hint: Use the transpose property and the scalar trap).