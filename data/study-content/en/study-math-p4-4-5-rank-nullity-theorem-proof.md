## 1. The one-sentence answer
**The rank-nullity theorem states that for any linear map \(T\) from a finite-dimensional vector space \(V\) to another vector space, the dimension of \(V\) equals the dimension of the kernel of \(T\) plus the dimension of the image of \(T\).**

This equality decomposes the “size” of the domain into the part that \(T\) collapses to zero and the part that survives as output. The kernel measures directions of collapse; the image measures the effective output span. Their dimensions therefore add back to the original dimension because a basis of the kernel can always be enlarged to a basis of the whole domain whose remaining vectors map onto a basis of the image.

The proof therefore reduces to constructing such an extended basis and verifying that the images of the added vectors are linearly independent and span the image.

> [!NOTE]
> The single algebraic fact that makes the theorem work is that the image of a linear combination is the linear combination of the images; this transfers linear independence from the domain to the codomain once the kernel vectors have been removed.

## 2. Why this matters — concrete and current
In Google’s PageRank algorithm the Google matrix is a linear map on a 25-billion-dimensional space of web pages; its kernel dimension is 1 (the all-ones vector) and its rank is therefore one less than the ambient dimension, which forces the existence of a unique stationary distribution up to scaling.

In the JPEG image-compression pipeline the discrete cosine transform is a linear map whose kernel consists of the high-frequency coefficients that are discarded; the rank-nullity relation tells engineers exactly how many coefficients must be retained to keep a chosen fraction of the original information.

In semiconductor device simulation the Poisson equation on a mesh yields a sparse matrix whose nullity equals the number of floating potentials; rank-nullity therefore predicts the exact dimension of the solution space before any numerical solver is invoked.

In the transformer architecture used by GPT-4 the attention matrix is a linear map whose rank is deliberately reduced by low-rank approximations; the theorem supplies the precise trade-off between the dimension of the discarded null-space and the retained representational capacity.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Subspace             | Kernel and image are subspaces whose dimensions are compared |
| Basis and dimension  | The theorem equates two dimensions, so bases must exist   |
| Linear map           | Kernel and image are defined only for linear maps         |
| Linear independence  | The proof must show that certain image vectors remain independent |
| Basis-extension theorem | A basis of the kernel must be enlarged to a basis of \(V\) |

## 4. Building the idea — from intuition to formalism

### Step 1 — Kernel and image are the two natural subspaces
A linear map \(T:V\to W\) sends some vectors to zero and stretches others into the output space. The set of vectors sent to zero forms the kernel; the set of all outputs forms the image. Both are subspaces because \(T\) preserves linear combinations.

**Concrete example.** Let \(T:\mathbb{R}^2\to\mathbb{R}^2\) be projection onto the x-axis: \(T(x,y)=(x,0)\). Then \(\ker T=\{(0,y)\}\) and \(\operatorname{im} T=\{(x,0)\}\), each one-dimensional.

Formally,
\[
\ker T=\{v\in V\mid T(v)=0\},\qquad\operatorname{im} T=\{T(v)\mid v\in V\}.
\]

> [!WARNING]
> Treating the kernel as merely “the zero vector” loses the whole subspace structure needed for dimension counting.

### Step 2 — Choose a basis for the kernel
Let \(\dim\ker T=k\). Select any basis \(\{u_1,\dots,u_k\}\) of \(\ker T\). Every vector in the kernel is then a unique linear combination of these \(k\) vectors.

### Step 3 — Extend the kernel basis to a basis of the whole domain
By the basis-extension theorem there exist vectors \(v_1,\dots,v_r\in V\) such that
\[
\{u_1,\dots,u_k,v_1,\dots,v_r\}
\]
is a basis of \(V\). The integer \(r\) will turn out to be \(\dim\operatorname{im} T\).

### Step 4 — The images of the extension vectors span the image
Any vector \(w\in\operatorname{im} T\) is \(w=T(v)\) for some \(v\in V\). Write \(v\) in the extended basis:
\[
v=\sum a_i u_i+\sum b_j v_j.
\]
Apply \(T\):
\[
w=T(v)=\sum b_j T(v_j),
\]
because \(T(u_i)=0\). Hence \(\{T(v_1),\dots,T(v_r)\}\) spans \(\operatorname{im} T\).

### Step 5 — The images are linearly independent
Suppose \(\sum c_j T(v_j)=0\). Then \(T(\sum c_j v_j)=0\), so \(\sum c_j v_j\in\ker T\). But \(\ker T\) is spanned by the \(u_i\), and the whole set is a basis, so all coefficients of the \(v_j\) must vanish. Thus the \(c_j\) are zero.

### Step 6 — Dimension count
The set \(\{T(v_1),\dots,T(v_r)\}\) is therefore a basis of \(\operatorname{im} T\), proving \(\dim\operatorname{im} T=r\). Adding the dimensions of the two parts of the basis of \(V\) yields
\[
\dim V=k+r=\dim\ker T+\dim\operatorname{im} T.
\]

### Step 7 — Matrix form
If \(A\) is the matrix of \(T\) with respect to any bases, then \(\operatorname{rank} A=\dim\operatorname{im} T\) and \(\operatorname{nullity} A=\dim\ker T\), so the same equality reads
\[
\operatorname{rank} A+\operatorname{nullity} A=n.
\]

## 5. Worked examples — every step shown

**Example 1 — Projection in \(\mathbb{R}^2\)**
*Given:* \(T(x,y)=(x,0)\).
*Find:* Verify rank-nullity.
A basis of \(\ker T\) is \(\{(0,1)\}\), so \(k=1\). Extend by \((1,0)\). Then \(T(1,0)=(1,0)\) spans the image, which is one-dimensional. Hence \(1+1=2=\dim\mathbb{R}^2\).

*Why* the extension works: the two vectors are linearly independent and span \(\mathbb{R}^2\).

**Example 2 — Zero map on \(\mathbb{R}^3\)**
*Given:* \(T(v)=0\) for all \(v\).
*Find:* Dimensions.
\(\ker T=\mathbb{R}^3\), basis \(\{e_1,e_2,e_3\}\). No extension vectors needed, \(r=0\). Image is \(\{0\}\), dimension 0. Sum is 3.

*Why* independence holds trivially: the empty set of image vectors is independent.

**Example 3 — Differentiation on polynomials of degree \(\le 2\)**
*Given:* \(D:p(x)\mapsto p'(x)\) from \(P_2\) to \(P_2\).
*Find:* Rank and nullity.
Kernel is the constants, dimension 1, basis \(\{1\}\). Extend by \(\{x,x^2\}\). Images \(\{1,2x\}\) form a basis of the image (all linear polynomials), dimension 2. Sum \(1+2=3\).

*Why* the images are independent: suppose \(a\cdot1+b\cdot(2x)=0\) implies \(a=b=0\).

**Example 4 — Matrix with repeated rows**
*Given:* 
\[
A=\begin{pmatrix}1&2\\1&2\\0&0\end{pmatrix}.
\]
*Find:* Rank plus nullity.
Row reduce to obtain two nonzero rows after scaling, but they are identical, so rank 1. Nullity: solve \(Ax=0\) yields one free variable, nullity 2. Sum \(1+2=3=n\).

*Why* the count matches: the two identical rows contribute only one independent direction in the image.

**Reflection.** Each example forces explicit basis construction; the same pattern scales to any finite-dimensional domain.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to prove linear independence of the image vectors | The spanning argument feels sufficient | Always write the linear-dependence relation and use the direct-sum decomposition of the basis |
| Assuming the extension vectors lie in the kernel | Confusion between the two parts of the basis | Keep the original kernel basis separate and never include kernel vectors among the extension set |
| Using an infinite-dimensional space without checking | Theorem requires finite dimension for “basis extension” | Verify \(\dim V<\infty\) before invoking the count |
| Confusing column rank with row rank mid-proof | Matrix and abstract versions mixed | Fix one language (maps or matrices) for the entire argument |
| Claiming \(\dim\operatorname{im} T=n-k\) without showing the images form a basis | Dimension subtraction taken as automatic | Explicitly verify both spanning and independence |
| Neglecting the zero map or identity map edge cases | They appear trivial | Check them first: nullity \(n\) or 0 recovers the theorem instantly |
| Misidentifying the codomain dimension | Image lives inside \(W\), not necessarily equaling \(\dim W\) | Rank-nullity never involves \(\dim W\) |

## 7. The textbook-precise statement
Let \(V\) and \(W\) be vector spaces over the same field, with \(V\) finite-dimensional. Let \(T:V\to W\) be linear. Then
\[
\dim V=\dim(\ker T)+\dim(\operatorname{im} T).
\]
(Axler, *Linear Algebra Done Right*, 3e, Theorem 3.4.)

## 8. Visual — diagram or schematic
```text
V (dim = n)
├── ker T (dim = k)
│   └── basis {u₁ … uₖ}
└── complement (dim = r)
    └── extension {v₁ … vᵣ}
        └── T(vⱼ) → basis of im T (dim = r)
```
The diagram shows the direct-sum decomposition \(V=\ker T\oplus\operatorname{span}\{v_j\}\). The map \(T\) annihilates the first summand and sends the second isomorphically onto the image.

## 9. The memory technique

1. **The hook** — Picture a garden hose: the kernel is the part of the hose that stays flat on the ground (no water out), the image is the spray that actually reaches the lawn; together they recover the full length of the hose.
2. **What to overlearn** — The equality \(\dim V=\dim\ker T+\dim\operatorname{im} T\) and the phrase “extend kernel basis, map the rest.”
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing any vector in the extended basis, applying \(T\), and counting the free coefficients.

## 10. What this unlocks
Rank-nullity is the dimension-counting engine behind the four fundamental subspaces, the rank theorem for matrices, and the classification of linear maps up to equivalence.

- Fundamental theorem of linear algebra (row space = column space dimension)
- Sylvester’s law of nullity for composed maps
- Dimension formula for quotient spaces \(V/\ker T\cong\operatorname{im} T\)
- Later proofs of the spectral theorem via invariant subspaces

## 11. Self-check — five questions, no answers
1. Prove rank-nullity for the differentiation operator on the space of polynomials of degree at most 4.
2. A \(5\times7\) matrix has nullity 3. What is its rank? Construct an explicit example.
3. Suppose \(T:V\to V\) satisfies \(T^2=T\). Show that \(\dim\ker T+\dim\operatorname{im} T=\dim V\) without using the theorem directly, then verify it recovers the theorem.
4. Identify the flaw: “Since \(\dim\ker T=n-r\) and \(\dim\operatorname{im} T=r\), their sum is \(n\).”
5. Let \(S,T:V\to W\) be linear maps with \(\operatorname{im} S\subseteq\ker T\). What inequality does rank-nullity give for \(\operatorname{rank}(T\circ S)\)?