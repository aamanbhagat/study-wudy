## 1. The one-sentence answer

**A matrix representation of a linear transformation \(T: V \to W\) is the unique array whose columns are the coordinate vectors of the images of the domain basis vectors under \(T\), relative to chosen bases of \(V\) and \(W\).**

Any linear map between finite-dimensional vector spaces becomes ordinary matrix-vector multiplication once bases are fixed. The map \(T(\mathbf{v})\) is recovered by writing the input vector in coordinates, multiplying by the matrix, and interpreting the result as coordinates in the codomain basis. Different bases produce different matrices for the same map; the matrix therefore encodes both the map and the coordinate choices.

The construction is canonical once the bases are selected. If the bases change, the matrix changes by a similarity transformation involving the change-of-basis matrices. This single fact explains why matrix representations are the universal language of linear algebra computations.

> [!NOTE]
> The matrix does not represent the abstract map alone; it represents the map together with two ordered bases. Changing either basis changes the matrix even though the underlying map stays fixed.

## 2. Why this matters — concrete and current

In computer graphics pipelines at NVIDIA and AMD, every vertex of a 3-D model is transformed by a sequence of 4-by-4 matrices that encode rotation, scaling, and perspective projection; these matrices are precisely the representations of the corresponding linear (and affine) maps with respect to the standard camera and world bases.

In the forward pass of every neural-network layer implemented in PyTorch or TensorFlow, an input batch of vectors is multiplied on the right by a weight matrix; that matrix is the representation of the layer’s linear map with respect to the standard bases of the input and output feature spaces.

Spacecraft attitude-control software at NASA’s Jet Propulsion Laboratory stores the rotation between sensor frames and body frames as direction-cosine matrices; each such matrix is the representation of the orthogonal transformation that aligns the two reference frames.

In quantum information processing, the action of a single-qubit gate on the computational basis \(\{|0\rangle, |1\rangle\}\) is written as a 2-by-2 unitary matrix; every circuit diagram is therefore a product of these explicit matrix representations.

Finite-element solvers for structural mechanics assemble the global stiffness matrix by computing the local stiffness matrices of each element in its own nodal basis and then mapping them into the global degrees-of-freedom basis; the assembly step is exactly the change-of-basis formula for linear maps.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector space, subspace   | Domain and codomain of every linear map                   |
| Linear map (homomorphism)| The object being represented                              |
| Ordered basis            | Supplies coordinates that convert the map into numbers    |
| Coordinate isomorphism   | Identifies each vector with its column of scalars         |
| Matrix-vector multiplication | The concrete operation that reproduces the map          |

## 4. Building the idea — from intuition to formalism

### Step 1 — Linear maps send linear combinations to linear combinations
A map \(T\) is linear when it respects addition and scalar multiplication.  
Take \(V = \mathbb{R}^2\) with the standard basis and let \(T(x,y) = (x+2y, 3x-y)\). Then \(T(2\mathbf{e}_1 - \mathbf{e}_2) = 2T(\mathbf{e}_1) - T(\mathbf{e}_2)\).  
Formally: \(T(a\mathbf{u}+b\mathbf{v}) = aT(\mathbf{u})+bT(\mathbf{v})\) for all scalars \(a,b\) and vectors \(\mathbf{u},\mathbf{v}\).

> [!WARNING]
> If linearity fails for even one pair of vectors, no matrix can represent the map.

### Step 2 — An ordered basis supplies coordinates
Fix an ordered basis \(\mathcal{B} = \{\mathbf{b}_1,\dots,\mathbf{b}_n\}\) of \(V\). Every vector \(\mathbf{v}\) is uniquely \(\mathbf{v} = x_1\mathbf{b}_1 + \dots + x_n\mathbf{b}_n\); the column \([x_1 \dots x_n]^\top\) is the coordinate vector \([\mathbf{v}]_{\mathcal{B}}\).

### Step 3 — Apply \(T\) to each basis vector
Compute the images \(T(\mathbf{b}_1),\dots,T(\mathbf{b}_n)\). Each image lies in \(W\) and therefore possesses a coordinate vector once a basis \(\mathcal{C}\) of \(W\) is chosen.

### Step 4 — Assemble the images into columns
Place the coordinate vectors \([T(\mathbf{b}_j)]_{\mathcal{C}}\) side-by-side to form the matrix \(A = [T]_{\mathcal{C}\leftarrow\mathcal{B}}\). By construction the \(j\)-th column of \(A\) is exactly the coordinate representation of the image of the \(j\)-th basis vector.

### Step 5 — Matrix multiplication reproduces the map
For any \(\mathbf{v}\) with coordinates \([\mathbf{v}]_{\mathcal{B}} = \mathbf{x}\), linearity gives
\[
T(\mathbf{v}) = T\Bigl(\sum x_j\mathbf{b}_j\Bigr) = \sum x_j T(\mathbf{b}_j).
\]
Taking coordinates with respect to \(\mathcal{C}\) yields the matrix equation
\[
[T(\mathbf{v})]_{\mathcal{C}} = A\mathbf{x}.
\]

### Step 6 — The representation is unique for fixed bases
Suppose two matrices \(A\) and \(B\) both satisfy the coordinate equation for every \(\mathbf{v}\). Their columns must agree, hence \(A = B\).

## 5. Worked examples — every step shown

**Example 1 — Standard bases in \(\mathbb{R}^2\)**
- *Given:* \(T(x,y) = (x+2y,3x-y)\), bases \(\mathcal{B}=\mathcal{C}=\{\mathbf{e}_1,\mathbf{e}_2\}\).
- *Find:* \([T]_{\mathcal{C}\leftarrow\mathcal{B}}\).

Compute images:  
\(T(\mathbf{e}_1) = (1,3)\), so column 1 is \(\begin{pmatrix}1\\3\end{pmatrix}\).  
\(T(\mathbf{e}_2) = (2,-1)\), so column 2 is \(\begin{pmatrix}2\\-1\end{pmatrix}\).  
Thus
\[
A = \begin{pmatrix} 1 & 2 \\ 3 & -1 \end{pmatrix}.
\]
**Final answer**  
\[
\begin{pmatrix} 1 & 2 \\ 3 & -1 \end{pmatrix}
\]

*Reflection:* The calculation is immediate because both bases are standard; the only skill required is reading off coefficients.

**Example 2 — Non-standard basis**
- *Given:* Same \(T\), basis \(\mathcal{B} = \{(1,1),(1,-1)\}\), standard codomain basis.
- *Find:* \([T]_{\mathcal{E}\leftarrow\mathcal{B}}\).

\(T(1,1)=(3,2)\), coordinates \(\begin{pmatrix}3\\2\end{pmatrix}\).  
\(T(1,-1)=(-1,4)\), coordinates \(\begin{pmatrix}-1\\4\end{pmatrix}\).  
Matrix:
\[
\begin{pmatrix} 3 & -1 \\ 2 & 4 \end{pmatrix}.
\]

*Reflection:* Changing only the domain basis alters the columns while the underlying map remains identical.

**Example 3 — Composition of two maps**
- *Given:* \(S:\mathbb{R}^2\to\mathbb{R}^2\), \(S(x,y)=(x-y,2x)\); \(T\) as above.
- *Find:* Matrix of \(T\circ S\) with respect to standard bases.

Matrix of \(S\): \(\begin{pmatrix}1&-1\\2&0\end{pmatrix}\).  
Matrix of \(T\circ S\) is product of the two matrices:
\[
\begin{pmatrix}1&2\\3&-1\end{pmatrix}\begin{pmatrix}1&-1\\2&0\end{pmatrix}=\begin{pmatrix}5&-1\\1&-3\end{pmatrix}.
\]

*Reflection:* Composition of maps becomes multiplication of matrices; order is preserved.

**Example 4 — Change-of-basis formula**
- *Given:* Matrix \(A\) of \(T\) in standard bases; new basis \(\mathcal{B}'\) whose change-of-basis matrix from standard to \(\mathcal{B}'\) is \(P\).
- *Find:* Matrix of \(T\) in the new basis.

New matrix is \(P^{-1}AP\).

*Reflection:* Similarity transformations encode the effect of altering coordinates without touching the map itself.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating the matrix as basis-independent | Textbooks often omit explicit basis labels | Always write \([T]_{\mathcal{C}\leftarrow\mathcal{B}}\) |
| Swapping row and column vectors   | Confusion between left and right action     | Fix the convention: vectors are columns      |
| Forgetting that codomain basis matters | Only domain basis is mentioned in some notes | Record both bases every time                 |
| Assuming the zero map has zero matrix only in standard bases | Coordinates can be nontrivial in other bases | Verify that every basis vector maps to zero  |
| Multiplying matrices in the wrong order | Composition order is reversed in some conventions | Write \(T\circ S\) explicitly before multiplying |
| Using an unordered set as a “basis” | Sets do not define coordinate order         | Always list vectors in a definite sequence   |
| Neglecting to check linear independence of given “basis” | Problem statements sometimes give redundant vectors | Verify that the set spans and is independent before building the matrix |

## 7. The textbook-precise statement

Let \(V\) and \(W\) be finite-dimensional vector spaces over the same field \(F\), let \(\mathcal{B}=\{\mathbf{v}_1,\dots,\mathbf{v}_n\}\) be an ordered basis of \(V\), and let \(\mathcal{C}=\{\mathbf{w}_1,\dots,\mathbf{w}_m\}\) be an ordered basis of \(W\). For any linear transformation \(T:V\to W\) there exists a unique \(m\times n\) matrix \(A=[T]_{\mathcal{C}\leftarrow\mathcal{B}}\) such that
\[
[T(\mathbf{v})]_{\mathcal{C}}=A[\mathbf{v}]_{\mathcal{B}}
\]
for every \(\mathbf{v}\in V\). The \(j\)-th column of \(A\) is precisely \([T(\mathbf{v}_j)]_{\mathcal{C}}\). (Axler, *Linear Algebra Done Right*, 3e, §3.4, Theorem 3.4.)

## 8. Visual — diagram or schematic

```text
Domain basis B          Matrix A          Codomain basis C
  b1 ───┐               [ c11 c12 ]        c1
        │               [ c21 c22 ]        c2
        │                     │
        └──▶ T(b1) = c11 c1 + c21 c2
  b2 ───┐
        └──▶ T(b2) = c12 c1 + c22 c2
```
Each column of \(A\) records the coordinates of one image \(T(\mathbf{b}_j)\) expressed in the ordered basis \(\mathcal{C}\).

## 9. The memory technique

1. **The hook** — Picture two ordered sets of arrows (bases). The matrix is the “flight plan” that tells each incoming arrow where it lands after the transformation, written in the language of the outgoing arrows.
2. **What to overlearn** — The column-construction rule: the \(j\)-th column is \([T(\mathbf{b}_j)]_{\mathcal{C}}\). The coordinate equation \([T(\mathbf{v})]_{\mathcal{C}}=A[\mathbf{v}]_{\mathcal{B}}\).
3. **Spaced-repetition schedule** — Review the column rule at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the matrix by applying \(T\) to each basis vector, expressing the results in the codomain basis, and placing those coordinate columns side-by-side.

## 10. What this unlocks

Matrix representations convert every abstract question about linear maps into concrete linear algebra over \(F^{m\times n}\). The immediate consequences are the rank-nullity theorem via column space, diagonalization when a basis of eigenvectors exists, the Jordan canonical form, the singular-value decomposition, and the entire apparatus of eigenvalues and invariant subspaces.

- Eigenvalues and eigenvectors become solutions of \((A-\lambda I)\mathbf{x}=\mathbf{0}\).
- Change-of-basis matrices become similarity transformations.
- Composition of maps becomes matrix multiplication, enabling the study of matrix groups and representations of abstract groups.

## 11. Self-check — five questions, no answers

1. Let \(T:\mathbb{R}^3\to\mathbb{R}^2\) be defined by \(T(x,y,z)=(x+y, y+z)\). Choose the standard bases. Write the matrix of \(T\).

2. The same map \(T\) is now given the domain basis \(\{(1,0,0),(1,1,0),(1,1,1)\}\). Compute the new matrix with respect to the standard codomain basis.

3. Two linear maps \(S\) and \(T\) on \(\mathbb{R}^2\) have matrices \(A\) and \(B\) in the same bases. What matrix represents \(S\circ T\circ S^{-1}\)?

4. A student claims that the matrix of the zero map is always the zero matrix regardless of bases. Is the claim correct? If not, supply a counter-example with explicit bases.

5. Suppose \(A\) is the matrix of \(T\) with respect to bases \(\mathcal{B}\) and \(\mathcal{C}\). If both bases are replaced by their negatives (i.e., each vector multiplied by \(-1\)), what is the matrix of \(T\) in the new bases?