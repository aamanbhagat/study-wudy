## 1. The one-sentence answer
**Determinants remain unchanged or change in controlled, predictable ways under elementary row operations and matrix multiplication.**

A determinant measures the signed volume scaling factor of the linear transformation represented by a square matrix. When you perform an elementary operation on the rows—swapping two rows, multiplying a row by a scalar, or adding a multiple of one row to another—the determinant transforms according to a simple rule that follows directly from how those operations stretch or flip the underlying parallelepiped. These rules let you compute the determinant without expanding every cofactor and reveal deep algebraic structure such as multiplicativity under matrix products.

The same rules immediately imply that a matrix with two identical rows has determinant zero, that transposition leaves the determinant invariant, and that triangular matrices have determinants equal to the product of their diagonal entries. All of these facts are consequences of the three elementary operations rather than separate theorems.

> [!NOTE]
> The single most powerful observation is that row replacement (adding a multiple of one row to another) never alters the determinant; this is the operation you will use repeatedly to triangularize a matrix while keeping track of only the swaps and scalings.

## 2. Why this matters — concrete and current
In aerospace guidance systems, attitude matrices are updated via successive rotations; the determinant property det(AB) = det(A)det(B) guarantees that each rotation matrix preserves volume (determinant 1), so orientation errors can be detected instantly by checking whether the product drifts away from determinant 1.

Semiconductor process engineers use the Jacobian determinant formed from partial derivatives of coordinate transformations when mapping stress tensors between crystal lattices; a vanishing determinant signals a singular deformation that would collapse the band structure, and the row-operation rules allow rapid symbolic verification during design iterations at TSMC and Intel.

In modern bundle-adjustment solvers inside computer-vision pipelines (used by Meta and Google ARCore), the normal equations are formed from large sparse matrices whose determinants are monitored to detect rank deficiency; properties that allow row swaps to be counted without recomputing the entire determinant keep the real-time check under 1 ms per frame.

Physicists computing phase-space volumes in Hamiltonian Monte Carlo sampling rely on the fact that symplectic integrators have determinant 1; any deviation detected via the elementary-operation rules immediately flags an implementation error in libraries such as TensorFlow Probability.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Matrix row operations    | All determinant properties are expressed through the three elementary row operations. |
| 2 × 2 and 3 × 3 determinant formulas | Concrete calculations anchor the abstract rules before general n × n matrices appear. |
| Linear independence      | A zero determinant is equivalent to linearly dependent rows; the properties make this equivalence computable. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Determinant as signed volume
The determinant of a matrix equals the signed volume of the parallelepiped formed by its row vectors. For the matrix whose rows are the standard basis vectors scaled by 2, 3, and 1 respectively, the volume is exactly 6; any shear that leaves the base area and height unchanged must leave this number unchanged.

Formally,
$$
\det\begin{pmatrix}2&0&0\\0&3&0\\0&0&1\end{pmatrix}=6.
$$

> [!WARNING]
> Treating the determinant as an unsigned area loses the sign that records orientation reversal; later steps that count row swaps will then give the wrong parity.

### Step 2 — Row swap flips the sign
Interchanging any two rows reverses the orientation of the parallelepiped, so the determinant changes sign. Swapping the first and second rows of the matrix above yields determinant −6.

Formally, if B is obtained from A by swapping rows i and j, then
$$
\det B=-\det A.
$$

> [!WARNING]
> Forgetting that two swaps restore the original sign leads to an off-by-two error when counting permutations during Gaussian elimination.

### Step 3 — Scaling a row scales the determinant
Multiplying every entry in one row by a constant k stretches the parallelepiped by k in that direction, multiplying the volume by k. Scaling the second row of the original matrix by 4 produces determinant 24.

Formally,
$$
\det\begin{pmatrix}2&0&0\\0&12&0\\0&0&1\end{pmatrix}=24=4\cdot6.
$$

> [!WARNING]
> Confusing this rule with column scaling (which obeys the identical rule) is harmless, but forgetting that the scalar must be factored out before further operations produces arithmetic mistakes.

### Step 4 — Row replacement leaves the determinant unchanged
Adding a multiple of one row to another shears the parallelepiped parallel to a face; the base area and height remain the same, so volume is invariant. Adding twice the first row to the third row of the original matrix still yields determinant 6.

Formally, if row i of A is replaced by row i + c·row j, then
$$
\det A\text{ is unchanged}.
$$

> [!WARNING]
> Students sometimes believe any row operation changes the determinant; applying the scaling rule to a replacement step is the most common source of that error.

### Step 5 — Triangular matrices
Repeated row replacement can convert any matrix into upper-triangular form. Because only swaps and scalings alter the determinant, the final diagonal product, corrected by the sign of each swap and the product of all scaling factors, equals the original determinant.

Formally, for an upper-triangular matrix T,
$$
\det T=t_{11}t_{22}\cdots t_{nn}.
$$

### Step 6 — Multiplicativity
The composition of two linear maps multiplies their individual volume scalings, so
$$
\det(AB)=\det(A)\det(B).
$$
This follows because the row operations that triangularize AB can be viewed as the concatenation of the operations for A and for B.

## 5. Worked examples — every step shown

**Example 1 — Single row swap**
- *Given:* \(A=\begin{pmatrix}1&2\\3&4\end{pmatrix}\)
- *Find:* det after swapping rows.
- Compute det A = 1·4−2·3=−2.  
  *Why:* direct 2×2 formula.
- Swap rows to obtain B=\(\begin{pmatrix}3&4\\1&2\end{pmatrix}\).  
  *Why:* elementary operation of type (1).
- det B=3·2−4·1=2.  
  *Why:* direct evaluation.
- Observe det B=−det A.  
  *Why:* matches the sign-flip rule.

**Final answer**  
**2 = −(−2)**

*Reflection:* The example is trivial yet forces explicit verification that the sign change is exactly −1, not merely “different.”

**Example 2 — Scaling plus replacement**
- *Given:* \(A=\begin{pmatrix}1&1&1\\2&2&2\\3&3&3\end{pmatrix}\)
- *Find:* determinant after scaling row 1 by 5 and then replacing row 2 by row 2−row 1.
- Scaling row 1 by 5 multiplies det by 5; rows become linearly dependent so det remains zero.  
  *Why:* identical rows after any nonzero scaling still give det=0.
- Replacement does not change the determinant.  
  *Why:* rule from Step 4.

**Final answer**  
**0**

*Reflection:* Zero is preserved under both scaling and replacement, illustrating that linear dependence is detected regardless of order.

**Example 3 — Two swaps and triangularization**
- *Given:* \(A=\begin{pmatrix}0&1\\1&0\end{pmatrix}\)
- *Find:* det(A) using only allowed operations.
- Swap rows: sign flip, new matrix \(\begin{pmatrix}1&0\\0&1\end{pmatrix}\).  
  *Why:* one swap.
- Diagonal product = 1.  
  *Why:* triangular (already diagonal).
- Original det = −1.

**Final answer**  
**−1**

*Reflection:* Counting an even number of swaps would incorrectly give +1; the parity must be tracked.

**Example 4 — Product rule verification**
- *Given:* \(A=\begin{pmatrix}2&0\\0&3\end{pmatrix}\), \(B=\begin{pmatrix}4&1\\0&5\end{pmatrix}\)
- *Find:* det(AB) two ways.
- AB=\(\begin{pmatrix}8&2\\0&15\end{pmatrix}\), det=120.  
  *Why:* direct multiplication and 2×2 formula.
- det A·det B=6·20=120.  
  *Why:* multiplicativity.

**Final answer**  
**120 = 6·20**

*Reflection:* The numerical agreement confirms the abstract composition rule without expanding 3×3 minors.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating row replacement as scaling | Visual similarity of “adding a multiple”    | Always ask: “Did I multiply an entire row by k≠1?”   |
| Forgetting sign after even swaps  | Counting swaps but not parity               | Keep a running tally of swap count modulo 2          |
| Applying column rules to rows only| Textbooks list both; memory conflates       | Verify with a 2×2 example before generalizing        |
| Assuming det(kA)=k·det(A) for non-square | Extrapolating square-matrix rule            | Check dimensions first                               |
| Ignoring that det(Aᵀ)=det(A) when using cofactors | Cofactor expansion along rows vs columns    | Always expand along the row or column with most zeros|
| Computing det after every single operation | Over-applying rules unnecessarily           | Triangularize completely, then apply corrections once|
| Confusing det(AB) with det(A+B)   | Notation similarity                         | Write the product symbol explicitly in notes         |

## 7. The textbook-precise statement
Let A be an n×n matrix over a field F. The determinant function det: Mₙ(F)→F satisfies:

1. det is alternating multilinear in the rows;
2. det(I)=1.

From these axioms the following are derived (Strang, *Introduction to Linear Algebra*, 5e, §5.2):

- If two rows are identical, det A=0.
- Swapping rows i and j multiplies det by −1.
- Multiplying row i by k multiplies det by k.
- Adding a multiple of row j to row i leaves det unchanged.
- det(Aᵀ)=det(A).
- det(AB)=det(A)det(B).
- If A is upper triangular, det A equals the product of its diagonal entries.

## 8. Visual — diagram or schematic
```
Row space before          Row space after replacement
  v2 ───────►               v2' = v2 + c·v1
   ↑                         ↑
   │                         │
   v1                        v1  (unchanged)
Volume = base area × height remains identical because shear is parallel to base.
Label: height h measured perpendicular to v1; area of base parallelogram unchanged.
```

## 9. The memory technique
1. **The hook** — Picture three wooden planks forming a box; sliding one plank parallel to the floor (row replacement) never changes the volume of air inside, while swapping two planks turns the box inside-out (sign flip).
2. **What to overlearn** — (i) replacement leaves det invariant; (ii) swap multiplies by −1; (iii) det(AB)=det(A)det(B).
3. **Spaced-repetition schedule** — Review the three rules at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Re-derive any forgotten rule by applying the operation to the identity matrix and watching the single nonzero term in the Leibniz formula change sign or scale.

## 10. What this unlocks
These properties turn determinant evaluation into a systematic algorithm (Gaussian elimination with tracking) and supply the algebraic foundation for Cramer’s rule, matrix inverses via adjugates, and the characteristic polynomial.

- Cramer’s rule and explicit inverse formulas
- Eigenvalue multiplicity and characteristic polynomial
- Volume interpretation in multivariable calculus (Jacobian)
- Rank-revealing factorizations (LU with partial pivoting)
- Special linear group SL(n) defined by det=1

## 11. Self-check — five questions, no answers
1. Compute det of the matrix obtained by swapping rows 2 and 3 of \(\begin{pmatrix}1&0&0\\0&2&0\\0&0&3\end{pmatrix}\) and then scaling the new row 2 by −1/2.
2. A 4×4 matrix undergoes exactly three row swaps and two row scalings by factors 2 and 3; its triangular form has diagonal (1,1,1,4). What was the original determinant?
3. Prove that if A has two identical columns then det A=0, using only the listed properties.
4. Without expanding, decide whether det((2A)Bᵀ) equals 2ⁿ det(A)det(B) for an n×n matrix; justify each step.
5. Construct a concrete 3×3 matrix with determinant 6 that becomes singular after exactly one allowed row replacement; explain why the replacement forces singularity.