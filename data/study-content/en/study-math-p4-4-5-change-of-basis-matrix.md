## 1. The one-sentence answer
**A change of basis matrix converts the coordinate representation of any vector from one ordered basis to another.**

Consider two different ordered bases for the same vector space. Every vector possesses a unique coordinate tuple with respect to each basis. The change of basis matrix assembles the linear relations between these tuples into a single matrix multiplication. Once constructed, the matrix acts on any coordinate vector expressed in the first basis and immediately yields the coordinate vector expressed in the second basis.

The construction is mechanical: the columns of the matrix are the coordinate vectors of the first basis, written with respect to the second basis. Matrix multiplication then performs all the necessary linear combinations at once.

> [!NOTE]
> The matrix does not change the underlying vector; it merely rewrites the same vector’s description using a different coordinate system, exactly as translating between two languages leaves the meaning unchanged.

## 2. Why this matters — concrete and current
In aerospace guidance, the navigation computer on a SpaceX Falcon 9 must repeatedly convert inertial measurements from the body-fixed frame of the rocket into the Earth-centered inertial frame; the change-of-basis matrix between these two frames is recomputed at each guidance cycle and multiplied by the raw accelerometer output.

In machine-learning pipelines, principal-component analysis produces an orthonormal basis of eigenvectors; scikit-learn’s PCA.transform method stores the change-of-basis matrix whose columns are those eigenvectors and applies it to new data batches to obtain scores in the reduced coordinate system.

Semiconductor device physicists rotate the crystal-lattice basis of silicon into the device coordinate system when solving the effective-mass Schrödinger equation; the resulting change-of-basis matrix appears inside every finite-element stiffness matrix assembled by tools such as COMSOL.

Robotic-arm controllers at Boston Dynamics convert joint-angle velocities expressed in the Denavit–Hartenberg link frames into Cartesian end-effector velocities; each conversion step is a multiplication by the appropriate change-of-basis Jacobian evaluated at the current configuration.

## 3. Mental prerequisites
| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Ordered basis            | Coordinates are defined only after an ordering is chosen  |
| Coordinate vector [v]_B  | The objects being transformed are these tuples            |
| Linear independence      | Guarantees that every vector has a unique coordinate tuple|
| Matrix–vector multiplication | The change itself is performed by this operation       |
| Invertible matrix        | The transformation must be reversible between bases       |

If any row is unfamiliar, pause and master the corresponding definition before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Coordinates are coefficients in a linear combination
Any vector v equals a unique linear combination of the ordered basis vectors once a basis B = {b1, …, bn} is fixed. The coefficients form the coordinate vector [v]_B.

Example: In R^2 with B = {(1,1), (1,−1)}, the vector (3,1) satisfies (3,1) = 2·(1,1) + 1·(1,−1), so [v]_B = (2,1)^T.

Formally,
$$
v = B[v]_B.
$$

> [!WARNING]
> If the ordering of the basis vectors is altered, every coordinate tuple changes; treating bases as unordered sets produces inconsistent matrices later.

### Step 2 — Two bases give two different coordinate tuples
The same vector v now possesses a second tuple [v]_C relative to another ordered basis C. Both tuples describe v, yet they generally look different.

### Step 3 — Express the first basis inside the second coordinate system
Write each vector of B as a linear combination of the vectors of C. The resulting coefficients become the columns of a matrix P_{C←B}.

Formally, the j-th column of P_{C←B} is [b_j]_C.

### Step 4 — Matrix multiplication assembles the linear combinations
Because v = B[v]_B and each column of B is already expressed in C-coordinates, we obtain
$$
[v]_C = P_{C←B}[v]_B.
$$

### Step 5 — The inverse recovers the original coordinates
Replacing B by C and C by B yields the reciprocal relation
$$
[v]_B = P_{B←C}[v]_C,
$$
which shows that P_{B←C} = P_{C←B}^{-1}.

### Step 6 — Textbook statement
Let V be a finite-dimensional vector space, B and C two ordered bases. The change-of-basis matrix from B-coordinates to C-coordinates is the unique invertible matrix P satisfying [v]_C = P[v]_B for every v ∈ V; its columns are the B-basis vectors written in C-coordinates.

## 5. Worked examples — every step shown

**Example 1 — Standard to non-standard basis in R²**  
*Given:* B = {(1,0),(0,1)}, C = {(2,1),(1,1)}, v with [v]_B = (3,4)^T.  
*Find:* [v]_C.  

Write the C-basis vectors in B-coordinates (already standard): columns of P are (2,1)^T and (1,1)^T.  
Thus
$$
P = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}.
$$
Multiply:
$$
[v]_C = P\begin{pmatrix}3\\4\end{pmatrix} = \begin{pmatrix}10\\7\end{pmatrix}.
$$
*Why* the multiplication works: each column of P tells how much of each C-vector is needed to build the corresponding B-vector, and the input coordinates scale those contributions.  
**Final answer**  
$$
[v]_C = \begin{pmatrix}10\\7\end{pmatrix}.
$$
*Reflection:* The arithmetic is immediate once the columns are assembled; the only possible error is swapping the order of the bases.

**Example 2 — Non-standard to standard**  
*Given:* Same bases, now [v]_C = (1,1)^T.  
*Find:* [v]_B.  
Use the inverse:
$$
P^{-1} = \begin{pmatrix}1 & -1 \\ -1 & 2\end{pmatrix},
$$
so
$$
[v]_B = P^{-1}\begin{pmatrix}1\\1\end{pmatrix} = \begin{pmatrix}0\\1\end{pmatrix}.
$$
*Why* the inverse appears: we are solving the linear system whose matrix is P.  
**Final answer**  
$$
[v]_B = \begin{pmatrix}0\\1\end{pmatrix}.
$$

**Example 3 — Two non-standard bases in R³**  
*Given:* B = {e1+e2, e2+e3, e3+e1}, C = standard basis, [v]_B = (1,2,3)^T.  
*Find:* [v]_C.  
Columns of P are the B-vectors written in standard coordinates:
$$
P = \begin{pmatrix}1&0&1\\1&1&0\\0&1&1\end{pmatrix}.
$$
Matrix multiplication yields [v]_C = (4,3,5)^T.  
**Final answer**  
$$
[v]_C = \begin{pmatrix}4\\3\\5\end{pmatrix}.
$$

**Example 4 — Composition of two changes**  
*Given:* Bases A, B, C. Matrices P_{B←A} and P_{C←B}.  
*Find:* Direct matrix from A to C.  
Chain the relations:
$$
[v]_C = P_{C←B}P_{B←A}[v]_A.
$$
Hence P_{C←A} = P_{C←B}P_{B←A}.  
**Final answer**  
$$
P_{C\leftarrow A}=P_{C\leftarrow B}P_{B\leftarrow A}.
$$
*Reflection:* Matrix multiplication order mirrors the sequence of coordinate conversions.

## 6. Common traps and how to avoid them
| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using rows instead of columns     | Confusing row-reduction habits with basis encoding  | Always place [b_j]_C into the j-th column            |
| Swapping source and target bases  | Notation P_{C←B} is easy to misread                 | Write the subscript arrow explicitly every time      |
| Forgetting to invert when going backward | Intuition that “the matrix just converts”         | Verify: P maps B-coordinates to C; inverse does reverse |
| Assuming bases are orthonormal    | Most textbook examples happen to be orthonormal     | Check inner products; never insert transpose unless orthonormal |
| Applying the matrix to the wrong vector | Mixing the abstract vector v with its coordinates | Always label which coordinate tuple is being multiplied |
| Changing basis order mid-calculation | Reordering feels harmless                         | Fix an ordering at the outset and keep it            |
| Treating the identity matrix as unchanged | I looks the same in every basis on paper         | Remember I is basis-dependent; write I_B explicitly  |

## 7. The textbook-precise statement
Let V be an n-dimensional vector space over F, let B = {b1,…,bn} and C = {c1,…,cn} be ordered bases of V. The change-of-basis matrix from B to C is the matrix P_{C←B} ∈ M_n(F) whose j-th column is the coordinate vector [b_j]_C. For every v ∈ V,
$$
[v]_C = P_{C\leftarrow B}[v]_B.
$$
Moreover, P_{B←C} = P_{C←B}^{-1}. (Axler, *Linear Algebra Done Right*, 3e, §2.C, Theorem 2.41.)

## 8. Visual — diagram or schematic
```text
Standard basis B          Non-standard basis C
      y                     y
      |                     |
      |  b2=(0,1)           |  c2=(1,1)
      |   ↑                 |   ↗
      |   |                 |  /
      |   +----→ b1=(1,0)  | / c1=(2,1)
      |                     |/
------+-------------------- +------------ x
      0                     0
```
The diagram shows two bases sharing the origin. The change-of-basis matrix P_{C←B} records exactly how far each arrow of B must be stretched and added to produce each arrow of C.

## 9. The memory technique

1. **The hook**  
   Picture a passport control desk: the traveler’s vector is the person; the two bases are two different passport formats. The change-of-basis matrix is the single rubber stamp that converts any set of numbers written in format B into the equivalent numbers in format C.

2. **What to overlearn**  
   - Columns of P are the source basis expressed in target coordinates.  
   - [v]_target = P [v]_source.  
   - P_{source←target} = P^{-1}.

3. **Spaced-repetition schedule**  
   Review the three bullet facts above after 1 day, 3 days, 7 days, 16 days, and 35 days.

4. **First-principles fallback**  
   Re-derive by writing v = ∑ β_j b_j, express each b_j = ∑ γ_{ij} c_i, interchange sums, and read off the matrix whose entries are the γ_{ij}.

## 10. What this unlocks
Mastery of change-of-basis matrices lets you move any linear operator into a coordinate system where its matrix representation is diagonal, upper-triangular, or otherwise simplified. The immediate next topics are similarity transformations, diagonalization, Jordan canonical form, and the matrix representation of linear maps between possibly different spaces.

- Similarity: A' = P^{-1}AP  
- Diagonalization criterion via distinct eigenvalues  
- Change of basis for bilinear forms and inner-product matrices  
- Coordinate-free versus coordinate-dependent statements of the spectral theorem

## 11. Self-check — five questions, no answers
1. Two bases of R^2 differ by a 30° rotation. Construct the change-of-basis matrix from the rotated basis back to the standard basis and verify that its determinant equals 1.

2. Let B = {1,x,x^2} and C = {1, x−1, (x−1)^2} be bases for P_2. Compute the change-of-basis matrix P_{C←B} and use it to find the C-coordinates of the polynomial 3x^2 + 2x + 1.

3. Suppose P_{C←B} is known but you are given only the abstract vector v, not its coordinates. Which additional information do you need before you can compute [v]_C?

4. A student claims that the change-of-basis matrix between any two orthonormal bases must be orthogonal. Is the claim true? Provide a one-sentence counter-example or proof.

5. In a four-dimensional space you are given three bases A, B, C. You know P_{B←A} and P_{C←B}. Without computing any matrix products, state the relationship between det(P_{C←A}) and the determinants of the two given matrices.