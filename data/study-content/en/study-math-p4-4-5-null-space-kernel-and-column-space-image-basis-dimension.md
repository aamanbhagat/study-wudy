## 1. The one-sentence answer
**The null space (kernel) of a matrix \(A\) is the set of all vectors \(\mathbf{x}\) satisfying \(A\mathbf{x}=\mathbf{0}\), while the column space (image) is the span of the columns of \(A\); bases for these subspaces determine their dimensions, which are linked by the rank-nullity theorem.**

A linear map \(T\) sends vectors from one space to another. Some vectors are sent exactly to the zero vector; those form the kernel. The outputs that actually appear form the image. Both are subspaces, so each possesses a basis whose cardinality is the dimension.

To locate these subspaces you row-reduce \(A\). The free variables in the reduced system label a basis for the kernel; the pivot columns of the original matrix label a basis for the column space. The dimensions satisfy \(\dim(\ker A)+\dim(\operatorname{im} A)=n\), where \(n\) is the number of columns.

> [!NOTE]
> The dimension of the column space equals the number of pivots, not the number of nonzero rows; this single number controls both how many independent equations you truly have and how large the solution set can be.

## 2. Why this matters — concrete and current
In spacecraft attitude control at NASA’s Jet Propulsion Laboratory, the null space of the thruster configuration matrix identifies combinations of thruster firings that produce no net torque; engineers solve for minimum-fuel corrections inside that kernel while staying inside actuator limits.

In large language-model training at OpenAI and Google DeepMind, the column space of the embedding matrix spans the linear features that survive the first layer; rank analysis of activation matrices reveals redundant directions that can be pruned without loss of downstream accuracy.

Semiconductor foundries use singular-value decomposition of the process-variation matrix; the dimension of its column space quantifies how many independent process parameters must be controlled to keep transistor thresholds inside specification across a wafer.

In quantum error correction, the parity-check matrix of a stabilizer code has a null space whose dimension equals the number of logical qubits; Microsoft Quantum and IBM Quantum both compute this dimension to certify code distance before fabrication.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector space, subspace   | Kernel and column space are subspaces of \(\mathbb{R}^n\) and \(\mathbb{R}^m\). |
| Linear independence      | Bases are maximal linearly independent sets inside each subspace. |
| Span                       | Column space is defined as the span of the matrix columns. |
| Row reduction (RREF)     | Pivot positions and free variables locate the two bases.  |

## 4. Building the idea — from intuition to formalism

### Step 1 — The kernel collects everything mapped to zero
Any linear map collapses an entire line or plane onto the origin. That entire set is the kernel.

For the matrix
\[
A=\begin{pmatrix}1&2\\3&6\end{pmatrix},
\]
the equation \(A\mathbf{x}=\mathbf{0}\) forces \(x_1+2x_2=0\) and \(3x_1+6x_2=0\). All solutions are scalar multiples of \((-2,1)\).

Formally,
\[
\ker A=\{\mathbf{x}\in\mathbb{R}^n\mid A\mathbf{x}=\mathbf{0}\}.
\]

> [!WARNING]
> Treating the kernel as merely “the zero vector” misses every nontrivial solution that still maps to zero.

### Step 2 — The image is the set of reachable outputs
The image consists of every vector that can be written as a linear combination of the columns.

In the same matrix the two columns are multiples of each other, so
\[
\operatorname{im} A=\operatorname{span}\{(1,3)\}.
\]

Formally,
\[
\operatorname{im} A=\{A\mathbf{x}\mid\mathbf{x}\in\mathbb{R}^n\}.
\]

> [!WARNING]
> Using the reduced matrix instead of the original matrix for the column space produces the wrong subspace.

### Step 3 — Pivot columns of the original matrix give a column-space basis
Row reduction reveals which original columns are independent; those columns, taken from \(A\) itself, form a basis for the image.

### Step 4 — Free-variable vectors give a null-space basis
After back-substitution, each free variable set to 1 (others to 0) produces a basis vector for the kernel.

### Step 5 — Rank-nullity theorem connects the two dimensions
The number of pivot columns plus the number of free columns equals the total number of columns:
\[
\operatorname{rank}(A)+\operatorname{nullity}(A)=n.
\]

### Step 6 — The formal statement
Let \(A\) be an \(m\times n\) matrix. Then \(\ker A\) and \(\operatorname{im} A\) are subspaces of \(\mathbb{R}^n\) and \(\mathbb{R}^m\) respectively, and
\[
\dim(\ker A)+\dim(\operatorname{im} A)=n.
\]

## 5. Worked examples — every step shown

**Example 1 — 2-by-2 matrix with nontrivial kernel**

*Given:* \(A=\begin{pmatrix}1&-1\\-2&2\end{pmatrix}\).

*Find:* bases for \(\ker A\) and \(\operatorname{im} A\), and their dimensions.

Row-reduce:
\[
\begin{pmatrix}1&-1\\-2&2\end{pmatrix}\to\begin{pmatrix}1&-1\\0&0\end{pmatrix}.
\]
One pivot, one free variable \(x_2\).

Set \(x_2=1\), then \(x_1=1\). Kernel basis: \(\{(1,1)\}\).

Pivot column 1 of original \(A\) gives column-space basis \(\{(1,-2)\}\).

**Final answer**
\[
\ker A=\operatorname{span}\{(1,1)\},\quad\dim=1;\qquad\operatorname{im} A=\operatorname{span}\{(1,-2)\},\quad\dim=1.
\]

*Reflection:* The single free variable directly supplied the kernel dimension; the original pivot column preserved the correct image vector.

**Example 2 — 3-by-3 full-rank matrix**

*Given:* identity matrix \(I_3\).

*Find:* kernel and column-space bases.

RREF is itself. Three pivots, no free variables.

Kernel basis: empty set (dimension 0). Column-space basis: the three standard basis vectors.

**Final answer**
\[
\ker I_3=\{\mathbf{0}\},\quad\operatorname{im} I_3=\mathbb{R}^3.
\]

*Reflection:* Full rank forces trivial kernel; the column space fills the whole codomain.

**Example 3 — 3-by-2 matrix, rank 1**

*Given:* \(A=\begin{pmatrix}1&2\\2&4\\3&6\end{pmatrix}\).

*Find:* bases and dimensions.

RREF yields one pivot in column 1. Free variable \(x_2\).

Kernel basis: \(\{(-2,1)\}\).

Column-space basis: first column of \(A\), \(\{(1,2,3)\}\).

**Final answer**
\[
\dim\ker A=1,\quad\dim\operatorname{im} A=1.
\]

*Reflection:* Two identical directions in the columns collapse the image dimension to one.

**Example 4 — inhomogeneous system consistency check via column space**

*Given:* solve \(A\mathbf{x}=\mathbf{b}\) where \(A\) is the matrix of Example 3 and \(\mathbf{b}=(3,6,9)^T\).

*Find:* whether a solution exists.

\(\mathbf{b}\) lies in \(\operatorname{im} A\) because it equals three times the first column. Hence solutions exist; the general solution is a particular solution plus the kernel.

**Final answer**
Solutions exist; affine space of dimension 1.

*Reflection:* Membership in the column space is the precise consistency test.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using reduced columns for image   | Forgetting the image lives in the original codomain | Always extract pivot columns from the unreduced matrix |
| Confusing row space with column space | Both appear during elimination             | Keep separate: row space uses rows of RREF, column space uses original pivot columns |
| Declaring kernel trivial when free variables exist | Miscounting free variables                  | Count non-pivot columns explicitly                   |
| Taking dimension of image as number of nonzero rows | Rows may be linearly dependent before reduction | Use pivot count only                                 |
| Forgetting that kernel basis vectors live in domain | Mixing domain and codomain dimensions       | Verify each kernel vector has length equal to number of columns |
| Assuming rank equals min(m,n)     | Overlooking hidden dependencies             | Always compute RREF                                  |
| Adding dimensions instead of subtracting from n | Misremembering rank-nullity                | Write the equation \(\operatorname{rank}+\operatorname{nullity}=n\) each time |

## 7. The textbook-precise statement
Let \(V\) and \(W\) be vector spaces over \(\mathbb{F}\) and let \(T:V\to W\) be linear. The kernel
\[
\ker T=\{v\in V\mid T(v)=\mathbf{0}\}
\]
and the image
\[
\operatorname{im} T=\{T(v)\mid v\in V\}
\]
are subspaces of \(V\) and \(W\) respectively. If \(\dim V=n<\infty\), then
\[
\dim(\ker T)+\dim(\operatorname{im} T)=n.
\]
(See Axler, *Linear Algebra Done Right*, 3e, Theorem 3.4 and §3.22.)

## 8. Visual — diagram or schematic
```text
Domain R^n ----------------> R^m  Codomain
          |                       ^
          | A                     | projection
          v                       |
   ker(A) ----> {0}          im(A)
   (free vars)               (pivot cols)
```
Horizontal arrow labelled \(A\) carries the whole domain onto the image; the kernel collapses onto zero; the complementary subspace (spanned by pivot columns) is mapped isomorphically onto the image.

## 9. The memory technique
1. **The hook** — Picture a factory machine \(A\): anything thrown into the “null chute” disappears (kernel), while the “output bin” contains everything the machine can actually produce (column space).

2. **What to overlearn** — (i) pivot count = column-space dimension; (ii) free-variable count = kernel dimension; (iii) their sum equals number of columns.

3. **Spaced-repetition schedule** — Review the rank-nullity statement at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Re-derive by counting pivot versus free columns after Gaussian elimination; the arithmetic identity “pivots + free = total columns” immediately yields the dimension relation.

## 10. What this unlocks
Mastery of kernel and image bases supplies the linear-algebraic engine behind solvability of \(Ax=b\), diagonalization, the four fundamental subspaces, and the singular-value decomposition.

- Rank-nullity theorem applications in coding theory
- Least-squares projections via orthogonal complement of the column space
- Jordan canonical form via generalized eigenspace kernels
- Principal-component analysis in statistics

## 11. Self-check — five questions, no answers
1. For a \(5\times 3\) matrix of rank 2, what are the possible dimensions of its kernel?

2. Construct a concrete \(3\times 3\) matrix whose kernel is spanned by \((1,1,1)\) and whose image is the plane \(x+y+z=0\).

3. If the columns of \(A\) are linearly dependent, must the kernel be nontrivial? Prove or give a counter-example.

4. A student extracts the pivot columns from the RREF instead of from \(A\). Which subspace is computed incorrectly?

5. Let \(A\) be \(m\times n\) with \(m>n\). Can the kernel be trivial? If so, what does that imply about the image?