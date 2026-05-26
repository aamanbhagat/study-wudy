## 1. The one-sentence answer
**A coordinate vector records the unique scalars needed to express a given vector as a linear combination of a chosen basis, and changing from one basis to another is performed by left-multiplication with the transition matrix whose columns are the new basis vectors expressed in the old coordinates.**

Any vector space admits many bases. Once a basis is fixed, every vector acquires numerical coordinates that are simply the coefficients in its unique expansion with respect to that basis. Switching bases therefore amounts to rewriting the same linear combination using a different set of coefficients; the rule that converts the old coefficients into the new ones is a linear transformation whose matrix representation is constructed directly from the two bases.

The transition matrix \(P\) from the old basis \(\mathcal{B}\) to the new basis \(\mathcal{C}\) satisfies \([\mathbf{v}]_{\mathcal{C}} = P^{-1}[\mathbf{v}]_{\mathcal{B}}\). Its columns are the coordinate vectors of the \(\mathcal{C}\)-basis vectors written with respect to \(\mathcal{B}\). Consequently the change-of-basis operation is matrix multiplication by a fixed, invertible matrix that depends only on the two bases and not on the particular vector being expressed.

> [!NOTE]
> The transition matrix is independent of any particular vector; once computed, it converts every coordinate vector from one basis to the other in a single matrix-vector product.

## 2. Why this matters — concrete and current
In robotics, the forward kinematics of a manipulator expresses joint angles in the robot’s local frame; converting those angles into world coordinates for collision checking requires precisely the change-of-basis map between the end-effector frame and the inertial frame used by the motion planner at Boston Dynamics.

In computer graphics, vertex positions stored in object space must be transformed into camera space before rasterization; the model-view matrix supplied to OpenGL is exactly the transition matrix between the object basis and the camera basis, recomputed each frame by Unity and Unreal Engine.

In quantum information, a qubit state written in the computational basis \(\{|0\rangle, |1\rangle\}\) is routinely re-expressed in the Hadamard basis to analyse measurement outcomes on IBM Quantum hardware; the change-of-basis unitary is the Hadamard gate itself.

In finite-element structural engineering, nodal displacements computed in a global Cartesian frame are projected onto local element bases aligned with beam axes; the resulting stiffness matrices are assembled after multiplication by the element-wise transition matrices produced by ANSYS.

In machine-learning, word embeddings trained in one vector space are aligned to embeddings from another model via an orthogonal Procrustes solution; the learned orthogonal matrix is the transition matrix between the two learned bases.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Basis of a vector space | Guarantees every vector possesses unique coordinates |
| Linear independence and spanning | Ensures the coordinate map is well-defined and bijective |
| Matrix representation of a linear map | Supplies the algebraic object that performs the coordinate conversion |
| Invertibility of square matrices | Guarantees that every change-of-basis matrix possesses an inverse |

## 4. Building the idea — from intuition to formalism

### Step 1 — Coordinates are coefficients, nothing more
Fix a basis \(\mathcal{B} = \{\mathbf{b}_1, \dots, \mathbf{b}_n\}\). Any vector \(\mathbf{v}\) can be written uniquely as \(\mathbf{v} = c_1\mathbf{b}_1 + \cdots + c_n\mathbf{b}_n\). The ordered list \((c_1, \dots, c_n)\) is the coordinate vector \([\mathbf{v}]_{\mathcal{B}}\).

Concrete example: In \(\mathbb{R}^2\) let \(\mathcal{B} = \{(1,1),(1,-1)\}\). Then \((3,1) = 2(1,1) + 1(1,-1)\), so \([(3,1)]_{\mathcal{B}} = \begin{pmatrix}2\\1\end{pmatrix}\).

Formal statement:
\[
\mathbf{v} = \sum_{i=1}^n c_i \mathbf{b}_i \quad \iff \quad [\mathbf{v}]_{\mathcal{B}} = \begin{pmatrix} c_1 \\ \vdots \\ c_n \end{pmatrix}.
\]

> [!WARNING]
> Treating coordinates as intrinsic properties of the vector rather than as coefficients relative to a chosen basis produces inconsistent numerical results when the basis is later altered.

### Step 2 — Two bases give two different lists of numbers
The same vector \(\mathbf{v}\) generally receives different coefficient lists when expanded in two distinct bases \(\mathcal{B}\) and \(\mathcal{C}\). The lists are related by a fixed linear transformation.

### Step 3 — Construct the transition matrix from the new basis vectors
Write each vector of the new basis \(\mathcal{C}\) as a linear combination of the old basis \(\mathcal{B}\). The coefficient columns form the matrix \(P_{\mathcal{B}\leftarrow\mathcal{C}}\).

Formal statement:
\[
P_{\mathcal{B}\leftarrow\mathcal{C}} = \bigl[ [\mathbf{c}_1]_{\mathcal{B}} \ \cdots \ [\mathbf{c}_n]_{\mathcal{B}} \bigr].
\]

### Step 4 — The transition matrix converts coordinates
Because \(\mathbf{v} = P_{\mathcal{B}\leftarrow\mathcal{C}} [\mathbf{v}]_{\mathcal{C}}\) holds identically, solving for the new coordinates yields the change-of-basis formula.

Formal statement:
\[
[\mathbf{v}]_{\mathcal{C}} = P_{\mathcal{B}\leftarrow\mathcal{C}}^{-1} [\mathbf{v}]_{\mathcal{B}}.
\]

### Step 5 — The inverse transition matrix converts in the opposite direction
The matrix \(P_{\mathcal{C}\leftarrow\mathcal{B}} = P_{\mathcal{B}\leftarrow\mathcal{C}}^{-1}\) is obtained simply by swapping the roles of the two bases.

### Step 6 — Textbook statement of the change-of-basis theorem
Let \(\mathcal{B}\) and \(\mathcal{C}\) be ordered bases of an \(n\)-dimensional vector space \(V\). For every \(\mathbf{v}\in V\),
\[
[\mathbf{v}]_{\mathcal{C}} = P^{-1}[\mathbf{v}]_{\mathcal{B}},
\]
where the columns of \(P\) are the coordinate vectors of the \(\mathcal{C}\)-basis with respect to \(\mathcal{B}\).

## 5. Worked examples — every step shown

**Example 1 — Standard to non-standard basis in \(\mathbb{R}^2\)**
- *Given:* \(\mathcal{B} = \{(1,0),(0,1)\}\), \(\mathcal{C} = \{(1,1),(1,-1)\}\), \(\mathbf{v} = (3,1)\).
- *Find:* \([\mathbf{v}]_{\mathcal{C}}\).

Write the \(\mathcal{C}\)-vectors in \(\mathcal{B}\)-coordinates:
\[
[\mathbf{c}_1]_{\mathcal{B}} = \begin{pmatrix}1\\1\end{pmatrix},\quad
[\mathbf{c}_2]_{\mathcal{B}} = \begin{pmatrix}1\\-1\end{pmatrix}.
\]
Form the transition matrix:
\[
P = \begin{pmatrix}1 & 1 \\ 1 & -1\end{pmatrix}.
\]
Its inverse is
\[
P^{-1} = \frac12\begin{pmatrix}1 & 1 \\ 1 & -1\end{pmatrix}.
\]
Apply the formula:
\[
[\mathbf{v}]_{\mathcal{C}} = P^{-1}\begin{pmatrix}3\\1\end{pmatrix} = \frac12\begin{pmatrix}4\\2\end{pmatrix} = \begin{pmatrix}2\\1\end{pmatrix}.
\]
**Final answer:** \(\begin{pmatrix}2\\1\end{pmatrix}\)

*Reflection:* The arithmetic is elementary; the key is remembering that the columns of \(P\) are the new basis vectors written in the old coordinates.

**Example 2 — Polynomial space**
- *Given:* \(\mathcal{B}=\{1,x,x^2\}\), \(\mathcal{C}=\{1,x,x^2+1\}\) in \(P_2\), \(\mathbf{v}=2+3x+4x^2\).
- *Find:* \([\mathbf{v}]_{\mathcal{C}}\).

Express the \(\mathcal{C}\)-basis in \(\mathcal{B}\)-coordinates and assemble
\[
P = \begin{pmatrix}1&0&1\\0&1&0\\0&0&1\end{pmatrix}.
\]
Invert:
\[
P^{-1}=\begin{pmatrix}1&0&-1\\0&1&0\\0&0&1\end{pmatrix}.
\]
Old coordinates: \([\mathbf{v}]_{\mathcal{B}}=\begin{pmatrix}2\\3\\4\end{pmatrix}\). Then
\[
[\mathbf{v}]_{\mathcal{C}}=P^{-1}\begin{pmatrix}2\\3\\4\end{pmatrix}=\begin{pmatrix}-2\\3\\4\end{pmatrix}.
\]
**Final answer:** \(\begin{pmatrix}-2\\3\\4\end{pmatrix}\)

*Reflection:* The constant term of the highest-degree basis vector produces the only nonzero off-diagonal entry, illustrating how local polynomial adjustments appear as matrix entries.

**Example 3 — Three-dimensional rotation of axes**
- *Given:* Standard basis \(\mathcal{E}\), new orthonormal basis obtained by 90° rotation about z-axis.
- *Find:* transition matrix and its action on \((1,0,0)\).

Columns of \(P\) are the images of the new axes:
\[
P=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&1\end{pmatrix}.
\]
Inverse equals transpose:
\[
P^{-1}=P^T.
\]
Apply to \([\mathbf{v}]_{\mathcal{E}}=\begin{pmatrix}1\\0\\0\end{pmatrix}\):
\[
[\mathbf{v}]_{\mathcal{C}}=\begin{pmatrix}0\\1\\0\end{pmatrix}.
\]
**Final answer:** \(\begin{pmatrix}0\\1\\0\end{pmatrix}\)

*Reflection:* Orthogonality simplifies inversion to transposition—an important special case in geometry.

**Example 4 — Abstract vector space with two non-standard bases**
- *Given:* \(V=\operatorname{span}\{\mathbf{u},\mathbf{w}\}\), \(\mathcal{B}=\{\mathbf{u}+\mathbf{w}, \mathbf{u}-\mathbf{w}\}\), \(\mathcal{C}=\{\mathbf{u},2\mathbf{w}\}\), \(\mathbf{v}=3\mathbf{u}+5\mathbf{w}\).
- *Find:* \([\mathbf{v}]_{\mathcal{C}}\) via \([\mathbf{v}]_{\mathcal{B}}\).

First obtain \([\mathbf{v}]_{\mathcal{B}}\) by solving \(a(\mathbf{u}+\mathbf{w})+b(\mathbf{u}-\mathbf{w})=3\mathbf{u}+5\mathbf{w}\), yielding \(a=4\), \(b=-1\). Thus \([\mathbf{v}]_{\mathcal{B}}=\begin{pmatrix}4\\-1\end{pmatrix}\).

Form \(P\) whose columns are \(\mathcal{C}\)-vectors in \(\mathcal{B}\)-coordinates:
\[
P=\begin{pmatrix}1/2 & 1/2 \\ 1/2 & -1/2\end{pmatrix}.
\]
Then
\[
[\mathbf{v}]_{\mathcal{C}}=P^{-1}\begin{pmatrix}4\\-1\end{pmatrix}=\begin{pmatrix}3\\5\end{pmatrix}.
\]
**Final answer:** \(\begin{pmatrix}3\\5\end{pmatrix}\)

*Reflection:* Solving the initial linear system for old coordinates is unavoidable when bases are given abstractly.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Placing the new basis vectors as rows instead of columns of \(P\) | Confusion between row and column space conventions | Always verify that \(P\mathbf{e}_i = [\mathbf{c}_i]_{\mathcal{B}}\) |
| Forgetting to invert \(P\) when converting from old to new coordinates | Intuition that “the matrix takes you directly” | Write the identity \(\mathbf{v}=P[\mathbf{v}]_{\mathcal{C}}\) before any computation |
| Using the same symbol for two different coordinate vectors | Notation overload | Explicitly subscript every coordinate list: \([\mathbf{v}]_{\mathcal{B}}\) versus \([\mathbf{v}]_{\mathcal{C}}\) |
| Computing \(P^{-1}\) by row reduction on the wrong matrix | Copying the wrong columns | Augment \(P\) with the identity only after confirming its columns are the new basis vectors |
| Assuming the transition matrix is orthogonal without checking | Over-generalising from orthonormal frames | Compute \(P^TP\) and test whether it equals the identity |
| Treating coordinate vectors as column vectors when the text uses row vectors | Inconsistent convention across sources | Fix one convention at the start of any calculation and remain consistent |
| Neglecting to verify that the two bases span the same space | Implicit assumption of equal dimension | Confirm both sets are bases of the identical vector space before forming \(P\) |

## 7. The textbook-precise statement
Let \(V\) be a finite-dimensional vector space and let \(\mathcal{B}=\{\mathbf{b}_1,\dots,\mathbf{b}_n\}\) and \(\mathcal{C}=\{\mathbf{c}_1,\dots,\mathbf{c}_n\}\) be ordered bases of \(V\). Define the transition matrix \(P_{\mathcal{B}\leftarrow\mathcal{C}}\) whose \(j\)-th column is \([\mathbf{c}_j]_{\mathcal{B}}\). Then for every \(\mathbf{v}\in V\),
\[
[\mathbf{v}]_{\mathcal{C}} = P_{\mathcal{B}\leftarrow\mathcal{C}}^{-1} [\mathbf{v}]_{\mathcal{B}}.
\]
(See Axler, *Linear Algebra Done Right*, 3e, §2.C, Theorem 2.43.)

## 8. Visual — diagram or schematic
```text
          y
          ^
          |
   c2    |     b2
    \    |    /
     \   |   /
      \  |  /
       \ | / 
        \|/____\____> x
        /|     /
       / |    /
      /  |   /
     /   |  /
    c1   | b1
```
Two bases of \(\mathbb{R}^2\): \(\mathcal{B}=\{\mathbf{b}_1,\mathbf{b}_2\}\) (solid) and \(\mathcal{C}=\{\mathbf{c}_1,\mathbf{c}_2\}\) (dashed). The transition matrix \(P\) has columns equal to the coordinates of \(\mathbf{c}_1\) and \(\mathbf{c}_2\) measured along \(\mathbf{b}_1\) and \(\mathbf{b}_2\).

## 9. The memory technique
**The hook** — Picture two transparent sheets of graph paper lying on top of each other, each printed with its own set of axes; sliding one sheet over the other maps every dot on the first sheet to a new pair of numbers on the second sheet—the transition matrix is the single rigid motion that aligns the grids.

**What to overlearn** — The formula \([\mathbf{v}]_{\mathcal{C}}=P^{-1}[\mathbf{v}]_{\mathcal{B}}\) and the rule that the columns of \(P\) are the new basis vectors written in the old coordinates.

**Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Re-derive the relation \(\mathbf{v}=P[\mathbf{v}]_{\mathcal{C}}\) by expanding each new basis vector in the old basis and collecting coefficients.

## 10. What this unlocks
Change of basis supplies the concrete mechanism that makes every matrix representation of a linear operator basis-dependent yet equivalent under similarity. The next concepts that rest directly on this foundation are diagonalisation, Jordan canonical form, the spectral theorem for self-adjoint operators, and the definition of tensor products of vector spaces.

- Similarity transformations \(A \mapsto P^{-1}AP\)
- Eigenvalue problems expressed in convenient bases
- Invariant subspaces and primary decomposition
- Coordinate-free versus coordinate-dependent statements of multilinear algebra

## 11. Self-check — five questions, no answers
1. In \(\mathbb{R}^3\), let \(\mathcal{B}\) be the standard basis and \(\mathcal{C}=\{(1,1,0),(1,0,1),(0,1,1)\}\). Compute the transition matrix \(P\) and its inverse; then find the \(\mathcal{C}\)-coordinates of \((1,2,3)\).

2. Prove that if \(\mathcal{B}\) and \(\mathcal{C}\) are both orthonormal bases of an inner-product space, then the transition matrix is orthogonal.

3. A linear operator \(T\) has matrix \(\begin{pmatrix}2&1\\0&3\end{pmatrix}\) with respect to basis \(\mathcal{B}\). What is its matrix with respect to basis \(\mathcal{C}\) if the transition matrix from \(\mathcal{B}\) to \(\mathcal{C}\) is known to be \(Q\)?

4. Suppose two students obtain different transition matrices for the same pair of bases. Under what precise condition are both matrices correct?

5. Construct a concrete counter-example showing that the change-of-basis formula fails when the sets in question are linearly dependent.