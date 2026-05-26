## 1. The one-sentence answer
**A matrix representation of a linear transformation** is the concrete array of numbers that encodes exactly how that transformation acts on vectors once you fix ordered bases for the domain and codomain.

Linear transformations themselves are abstract rules that stretch, rotate or shear vector spaces while preserving addition and scalar multiplication. When you choose a basis for the input space and another for the output space, every vector becomes a column of coordinates; the linear map then becomes ordinary matrix multiplication on those columns. The entries of the matrix are simply the coordinates of the images of the basis vectors.

This single idea turns every geometric or abstract statement about linear maps into arithmetic you can actually compute. Change the bases and the same transformation acquires a different matrix; the relationship between those matrices is conjugation by the change-of-basis matrices.

> [!NOTE]
> The matrix is not the transformation; it is the transformation written in a particular coordinate system. The same map can look like many different matrices, yet all of them are similar.

## 2. Why this matters — concrete and current
In computer graphics pipelines at NVIDIA and AMD, every vertex of a 3-D model is transformed by a 4×4 matrix that encodes rotation, translation and perspective projection; the same matrix representation lets GPUs perform billions of these operations per second in real time.

Google’s TensorFlow and PyTorch both store the weights of a neural-network layer as a matrix; the forward pass is exactly matrix multiplication of the input batch by the weight matrix, which is the coordinate representation of the linear part of an affine transformation.

In aerospace, NASA’s James Webb Space Telescope attitude-control system represents infinitesimal rotations of the spacecraft as elements of so(3); these are exponentiated to SO(3) matrices that are multiplied with the current orientation matrix to keep the telescope pointed at a target star within 0.01 arc-seconds.

Semiconductor foundries use linear-algebra solvers inside optical proximity correction software; each mask polygon is transformed by a large sparse matrix that models diffraction through the lens, allowing Intel and TSMC to print features smaller than the wavelength of light.

In quantum computing, every gate on n qubits is a 2^n × 2^n unitary matrix; IBM’s Qiskit and Google’s Cirq store and multiply these matrices to simulate or compile circuits before they are sent to the physical device.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector space and subspace| Domain and codomain of the linear map                     |
| Basis and dimension      | Only after choosing bases does the matrix appear          |
| Coordinates of a vector  | The columns of the matrix are coordinate vectors          |
| Matrix multiplication    | Composition of maps becomes matrix product                |
| Linear independence      | Guarantees that the matrix columns truly determine the map|

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — From abstract map to concrete numbers
A linear transformation T sends each vector in V to a vector in W. Pick an ordered basis B = {v1, …, vn} for V and C = {w1, …, wm} for W. The image of each basis vector vi can be written uniquely as a linear combination of the w’s; the coefficients become the i-th column of an m×n matrix.

Example: let T: R² → R² be rotation by 90° counterclockwise. With the standard basis, T(e1) = (0,1) and T(e2) = (−1,0), so the matrix is [[0, −1], [1, 0]].

Formally, if [T(v)]_C denotes the C-coordinate vector of T(v), then
$$[T(v)]_C = A [v]_B,$$
where A is the matrix whose columns are [T(vi)]_C.

> [!WARNING]
> If you forget that the columns must be written with respect to the output basis C, every later calculation collapses.

### Step 2 — Matrix of composition
Suppose S: W → U has matrix B with respect to bases C and D. Then the composite S ∘ T has matrix B A with respect to B and D. Matrix multiplication therefore mirrors function composition once bases are fixed.

### Step 3 — Change of basis
If P is the change-of-basis matrix from old basis B to new basis B′, then the matrix of T in the new bases is P^{-1} A P. This is the algebraic origin of similarity.

### Step 4 — Kernel and image in coordinates
The null space of A is exactly the coordinate vectors of ker(T); its column space is the coordinate description of im(T). Rank-nullity therefore appears as the rank-nullity theorem for matrices.

### Step 5 — Textbook-grade definition
Let V and W be finite-dimensional vector spaces over F, T ∈ L(V,W), B an ordered basis of V, C an ordered basis of W. The matrix of T with respect to B and C, denoted M(T; B, C) or [T]_{B,C}, is the unique m×n matrix A such that
$$[T(v)]_C = A [v]_B \quad \forall v \in V.$$

## 5. Worked examples

**Example 1 — Rotation matrix**
*Given:* T(x,y) = (−y,x) on R² with standard bases.  
*Find:* matrix of T.  
T(e1) = (0,1) → first column [0,1]^T.  
T(e2) = (−1,0) → second column [−1,0]^T.  
Matrix = [[0,−1],[1,0]].  
*Why* each column is the image of the corresponding basis vector.  
**Final answer**  
$$\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$$

*Reflection:* The example is simple yet shows that geometry directly supplies the columns; the same method works for any linear map.

**Example 2 — Differentiation operator**
*Given:* D: P₂ → P₂, D(p) = p′, bases B = C = {1,x,x²}.  
*Find:* matrix of D.  
D(1) = 0 → column [0,0,0]^T.  
D(x) = 1 → column [1,0,0]^T.  
D(x²) = 2x → column [0,2,0]^T.  
Matrix = [[0,1,0],[0,0,2],[0,0,0]].  
*Why* the factor 2 appears from the power rule.  
**Final answer**  
$$\begin{pmatrix} 0 & 1 & 0 \\ 0 & 0 & 2 \\ 0 & 0 & 0 \end{pmatrix}$$

*Reflection:* Even though the spaces are polynomial, coordinates turn the operator into ordinary matrix arithmetic.

**Example 3 — Composition**
*Given:* T and S above; compute matrix of S ∘ T.  
Matrix of S is B = [[0,−1],[−1,0]]; matrix of T is A above.  
BA = [[−1,0],[0,−1]].  
*Why* matrix multiplication order follows function composition order.  
**Final answer**  
$$\begin{pmatrix} -1 & 0 \\ 0 & -1 \end{pmatrix}$$

*Reflection:* Verifies that the abstract rule “matrix of composition = product of matrices” works numerically.

**Example 4 — Change of basis**
*Given:* T with matrix A = [[1,1],[0,2]] in standard basis; new basis B′ = {(1,1),(0,1)}.  
Change matrix P = [[1,0],[1,1]].  
New matrix = P^{-1} A P.  
Compute P^{-1} = [[1,0],[-1,1]], then P^{-1}AP = [[1,−1],[0,2]].  
**Final answer**  
$$\begin{pmatrix} 1 & -1 \\ 0 & 2 \end{pmatrix}$$

*Reflection:* Shows that the same linear map acquires a simpler matrix in a well-chosen basis.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Writing image of basis vectors in wrong basis | Students default to standard coordinates    | Always express T(vi) as linear combination of the chosen output basis |
| Reversing multiplication order    | Confusing map order with matrix order       | Remember: (S ∘ T)(v) gives matrix B A        |
| Forgetting that bases must be ordered | Treating sets as unordered                  | Write bases as ordered tuples                |
| Using row vectors instead of columns | Old habit from high-school                  | Consistently use column vectors              |
| Assuming matrix is unique without bases | Believing the map “is” the matrix           | Restate the bases every time you write a matrix |
| Computing kernel of wrong matrix  | Mixing domain and codomain bases            | Check that the matrix size matches the bases |
| Neglecting zero map or identity   | Treating them as trivial                    | Verify that identity always gives I and zero map gives 0 matrix |

## 7. The textbook-precise statement
Let V and W be finite-dimensional vector spaces over the field F, let T ∈ L(V,W), let β = (v₁,…,vₙ) be an ordered basis of V and γ = (w₁,…,wₘ) an ordered basis of W. The matrix of T with respect to β and γ, denoted M_γ^β(T) or [T]_γ^β, is the m×n matrix A whose j-th column is the γ-coordinate vector of T(vⱼ). Equivalently, for every v ∈ V we have [T(v)]_γ = A [v]_β. (Axler, *Linear Algebra Done Right*, 3e, §3.4, Theorem 3.4; Friedberg, Insel, Spence, *Linear Algebra*, 5e, §2.4, Definition 2.4.)

## 8. Visual — diagram or schematic
```
Domain V          Matrix A          Codomain W
basis β           columns =         basis γ
v1 ──┐            [T(v1)]_γ         w1
v2 ──┼──►  A  ──►  [T(v2)]_γ  ──►   w2
...  │            ...               ...
vn ──┘            [T(vn)]_γ         wm
          [v]_β  ──► A[v]_β = [T(v)]_γ
```
The left column lists input basis vectors; each arrow to the right produces the coordinate vector that becomes a column of A; the right column shows how any input coordinate vector is mapped to an output coordinate vector.

## 9. The memory technique
1. **The hook** — Picture the matrix as a vending machine: you insert a coordinate vector (coins) on the left and the machine’s internal wiring (the columns) dispenses the correct output coordinates on the right.
2. **What to overlearn** — The matrix columns are exactly the images of the input basis vectors expressed in the output basis; composition of maps becomes matrix multiplication in the same order.
3. **Spaced-repetition schedule** — Review the definition after 1 day, 3 days, 7 days, 16 days, 35 days; each time recompute the matrix of a small example from scratch.
4. **First-principles fallback** — If you forget the formula, return to the definition: apply T to each basis vector, write the result in the output basis, and place those coordinate columns side by side.

## 10. What this unlocks
Once you can move freely between a linear map and its matrix, every subsequent topic—diagonalization, Jordan form, singular-value decomposition, least-squares, Markov chains—becomes a statement about matrices that you already know how to manipulate.

- Eigenvalues appear as roots of the characteristic polynomial of the matrix.
- Invariant subspaces correspond to block-diagonal matrices after a suitable basis change.
- The rank-nullity theorem is simply rank(A) + nullity(A) = n.
- All coordinate-independent statements (trace, determinant, minimal polynomial) can be read off any matrix representation.

## 11. Self-check — five questions, no answers
1. Write the matrix of the projection onto the line y = x in R² with respect to the standard basis and also with respect to the basis {(1,1),(1,−1)}.
2. If A is the matrix of T with respect to bases B and C, and P changes B to B′, what is the matrix of T with respect to B′ and C?
3. Show that the matrix of the identity map is always the identity matrix, regardless of the basis chosen (provided the same basis is used for domain and codomain).
4. A student claims “the matrix of T is unique.” Give a counter-example with two different bases and compute both matrices.
5. Let T be the differentiation operator on P₃. Choose the basis {1,x,x²,x³} for both domain and codomain; compute the matrix of T and verify that its rank equals 3.