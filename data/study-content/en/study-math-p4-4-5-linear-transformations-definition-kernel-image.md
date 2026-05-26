## 1. The one-sentence answer
**A linear transformation is a map between vector spaces that preserves addition and scalar multiplication, its kernel is the subspace of vectors sent to zero, and its image is the subspace of vectors that are reached.**

Vector spaces are collections closed under addition and scaling. A map respects those operations when it sends sums to sums and scaled vectors to scaled results. Once that preservation holds, the set of inputs that disappear (the kernel) forms a subspace, and the set of outputs that appear (the image) also forms a subspace.

These two subspaces together quantify the “loss” and “gain” of the map. Their dimensions are linked by the rank-nullity theorem, which later becomes the central counting tool in linear algebra.

> [!NOTE]
> The kernel and image are not arbitrary sets; the linearity condition forces both to be subspaces, which is why every fact about subspaces applies to them automatically.

## 2. Why this matters — concrete and current
In computer graphics, every rigid-body motion, perspective projection, and lighting calculation used by Unreal Engine and Pixar’s RenderMan is a linear transformation (or an affine map built from one) applied to vertex coordinates in homogeneous space.

In machine-learning training, each layer of a neural network computes an affine transformation followed by a nonlinearity; the kernel of the weight matrix determines which input features are annihilated before the next layer, directly affecting gradient flow and model pruning at companies such as OpenAI and Google DeepMind.

In quantum mechanics, observables are represented by self-adjoint operators on Hilbert space; the kernel of an operator corresponds to states of zero measurement outcome, used daily in quantum-circuit simulators at IBM Quantum and Rigetti.

In semiconductor design, finite-element solvers for Maxwell’s equations at TSMC and Intel rely on sparse linear transformations whose kernels encode gauge freedoms; detecting these kernels prevents singular matrices during circuit simulation.

In data compression, the singular-value decomposition (used by Netflix for recommendation and by JPEG XL) factors a data matrix into linear maps whose kernels discard imperceptible components.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Vector space         | Domain and codomain of every linear transformation        |
| Subspace             | Kernel and image are proved to be subspaces               |
| Linear combination   | Definition of image uses all linear combinations of outputs |
| Basis                | Dimension arguments and matrix representations later rely on it |

## 4. Building the idea — from intuition to formalism

### Step 1 — Maps that respect structure
A function between ordinary sets can send any element anywhere. When the sets carry addition and scaling, we ask the function to commute with those operations.  
Example: the map \(f(x)=2x\) on \(\mathbb{R}\) sends \(3+4\) to 14 and \(2\cdot3+2\cdot4\) to the same value.  
Formally, a map \(T:V\to W\) satisfies  
\[
T(u+v)=T(u)+T(v),\qquad T(cu)=c\,T(u)
\]  
for all \(u,v\in V\) and scalars \(c\).  
> [!WARNING]  
> Replacing the second equation by \(T(cu)=T(c)+T(u)\) breaks homogeneity and produces maps that are not linear.

### Step 2 — Kernel as the “invisible” subspace
Apply \(T\) to the zero vector: linearity forces \(T(0)=0\). The set of all vectors that also map to zero is therefore nonempty.  
Example: projection onto the \(x\)-axis in \(\mathbb{R}^2\) sends every point \((0,y)\) to the origin.  
Formally,  
\[
\ker(T)=\{v\in V\mid T(v)=0_W\}.
\]  
Linearity immediately shows this set is closed under addition and scaling, hence a subspace.

### Step 3 — Image as the “reachable” subspace
The image collects every vector in \(W\) that is actually hit by some input.  
Example: the same projection reaches every point \((x,0)\) but nothing with nonzero second coordinate.  
Formally,  
\[
\operatorname{im}(T)=\{T(v)\mid v\in V\}.
\]  
Any linear combination of outputs \(T(v_1),\dots,T(v_k)\) equals \(T(c_1v_1+\dots+c_kv_k)\), so the image is a subspace.

### Step 4 — Subspace test for kernel and image
Both sets satisfy the three subspace axioms directly from the two linearity equations; no extra verification is required once \(T\) is known to be linear.

### Step 5 — Matrix representation
Choose bases for \(V\) and \(W\). Each linear map is completely determined by the images of basis vectors; stacking those images as columns produces a matrix \(A\) such that \(T(v)=Av\). Kernel and image then become the null space and column space of \(A\).

### Step 6 — Dimension relation
The rank-nullity theorem states  
\[
\dim V=\dim\ker(T)+\dim\operatorname{im}(T).
\]  
It follows at once by extending a basis of the kernel to a basis of \(V\) and showing the remaining vectors map to a basis of the image.

## 5. Worked examples — every step shown

**Example 1 — Checking linearity**  
*Given:* \(T:\mathbb{R}^2\to\mathbb{R}^2\) defined by \(T(x,y)=(x+y,2x)\).  
*Find:* Verify linearity.  
\(T((x_1,y_1)+(x_2,y_2))=T(x_1+x_2,y_1+y_2)=(x_1+x_2+y_1+y_2,2(x_1+x_2))\).  
*Why:* Expand by definition of \(T\).  
\(T(x_1,y_1)+T(x_2,y_2)=(x_1+y_1,2x_1)+(x_2+y_2,2x_2)=(x_1+x_2+y_1+y_2,2x_1+2x_2)\).  
*Why:* Vector addition in codomain.  
The two expressions match, and scalar multiplication is checked identically.  
**Final answer:** \(T\) is linear.

*Reflection:* The verification uses only the two defining equations; any map whose coordinate functions are not both linear will fail here.

**Example 2 — Kernel of a projection**  
*Given:* Same \(T\).  
*Find:* \(\ker(T)\).  
Solve \(T(x,y)=(0,0)\), i.e., \(x+y=0\) and \(2x=0\).  
*Why:* Definition of kernel.  
From second equation \(x=0\), then first gives \(y=0\).  
**Final answer:** \(\ker(T)=\{(0,0)\}\).

*Reflection:* The only invisible vector is the origin; the map is injective.

**Example 3 — Image via column space**  
*Given:* \(T:\mathbb{R}^3\to\mathbb{R}^2\), \(T(x,y,z)=(x+y,2x+2y)\).  
*Find:* \(\operatorname{im}(T)\).  
The matrix is \(\begin{pmatrix}1&1&0\\2&2&0\end{pmatrix}\).  
*Why:* Columns are images of standard basis vectors.  
Second row equals twice the first, so column space is spanned by \((1,2)^\top\).  
**Final answer:** \(\operatorname{im}(T)=\operatorname{span}\{(1,2)\}\).

*Reflection:* Row reduction reveals linear dependence among columns without solving systems for each output vector.

**Example 4 — Kernel via null space**  
*Given:* Same \(T\).  
*Find:* \(\ker(T)\).  
Solve \(x+y=0\), \(2x+2y=0\) (redundant).  
*Why:* Both components zero.  
Free variable \(z\) arbitrary, \(y=-x\).  
Basis vector: \((1,-1,0)^\top\).  
**Final answer:** \(\ker(T)=\operatorname{span}\{(1,-1,0)\}\).

*Reflection:* The extra free variable \(z\) shows that the kernel dimension equals nullity, matching rank-nullity: \(3=1+2\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Assuming every map given by a formula is linear | Coordinate-wise formulas look similar       | Always test both linearity axioms on arbitrary vectors |
| Confusing kernel with “set where output is zero” for nonlinear maps | Definition only applies after linearity is proved | Verify linearity first                              |
| Forgetting that image is a subspace of the codomain | Image lives in \(W\), not in \(V\)           | Write \(\operatorname{im}(T)\subseteq W\) explicitly |
| Treating \(\{0\}\) as the only possible kernel | Projection examples dominate early intuition | Solve the equation \(T(v)=0\) systematically        |
| Writing \(\operatorname{im}(T)=T(V)\) without checking span | Notation hides the subspace property        | Prove closure under linear combinations each time   |
| Using row reduction on the wrong matrix | Confusing domain and codomain bases         | Keep track of which space each basis belongs to     |
| Claiming \(\dim\ker(T)=0\) implies surjectivity | Misses the codomain dimension               | Apply rank-nullity to both dimensions               |

## 7. The textbook-precise statement
Let \(V\) and \(W\) be vector spaces over the same field \(F\). A map \(T:V\to W\) is a **linear transformation** if  
\[
T(u+v)=T(u)+T(v)\quad\text{and}\quad T(\lambda u)=\lambda T(u)
\]  
for all \(u,v\in V\) and \(\lambda\in F\). The **kernel** is the subspace  
\[
\ker(T)=\{v\in V\mid T(v)=0_W\}
\]  
and the **image** is the subspace  
\[
\operatorname{im}(T)=\{w\in W\mid w=T(v)\text{ for some }v\in V\}.
\]  
(Axler, *Linear Algebra Done Right*, 3e, §3.1–3.2.)

## 8. Visual — diagram or schematic
```text
          V = R^2                          W = R^2
   (x,y) ─────────────────────► (x+y, 2x)
     │                              │
     │                              │
  kernel = {0}                  image = span{(1,2)}
     │                              │
     ▼                              ▼
   origin                       line through origin
```
The horizontal arrow represents \(T\); the vertical arrows indicate that only the zero vector is collapsed and that every output lies on the line spanned by \((1,2)\).

## 9. The memory technique
1. **The hook** — Picture the kernel as a black hole that swallows vectors without trace; the image is the bright cone of light that escapes.
2. **What to overlearn** — The two linearity equations, the subspace definitions of kernel and image, and the rank-nullity identity \(\dim V=\dim\ker(T)+\dim\operatorname{im}(T)\).
3. **Spaced-repetition schedule** — Review definitions after 1 day, prove subspace properties after 3 days, compute kernel and image of three new maps after 7 days, derive rank-nullity from scratch after 16 days, and reconstruct the entire section after 35 days.
4. **First-principles fallback** — Start from the two preservation rules, substitute the zero vector, then close the kernel and image under the vector-space operations.

## 10. What this unlocks
Kernel and image supply the vocabulary for every subsequent structure theorem in linear algebra.  

- Quotient spaces are built by collapsing the kernel.  
- The rank-nullity theorem becomes the dimension formula for exact sequences.  
- Matrix factorizations (LU, QR, SVD) are statements about kernels and images of successive maps.  
- Jordan canonical form classifies linear operators by the kernels of powers of \((T-\lambda I)\).  
- Dual spaces and annihilators are defined via kernels of evaluation maps.

## 11. Self-check — five questions, no answers
1. Prove that the map \(T(x,y,z)=(x-y, y-z, z-x)\) is linear and compute both kernel and image.  
2. Give an explicit linear map \(T:\mathbb{R}^3\to\mathbb{R}^2\) whose kernel is the plane \(x+y+z=0\).  
3. Suppose \(\dim\ker(T)=2\) and \(\dim V=5\). What is the largest possible dimension of \(\operatorname{im}(T)\)?  
4. If \(T\) and \(S\) are linear and \(\ker(T)\subseteq\ker(S)\), must \(\operatorname{im}(S)\subseteq\operatorname{im}(T)\)? Provide a counter-example or proof.  
5. A student claims “the image of a linear map is always the whole codomain.” Construct the smallest counter-example and compute its kernel dimension.