## 1. The one-sentence answer
**Finding eigenspaces consists of computing, for each eigenvalue \(\lambda\) of a linear operator \(T\), the subspace of all vectors \(v\) such that \(T(v)=\lambda v\).**

An eigenvalue \(\lambda\) tells you the factor by which certain directions are stretched or shrunk. The corresponding eigenspace collects every vector that experiences exactly that stretch; it is the solution set to the homogeneous equation \((T-\lambda I)v=0\). Because this equation is linear, its solution set is automatically a subspace, and its dimension (the geometric multiplicity of \(\lambda\)) measures how many independent directions share the same scaling.

The process therefore splits into two independent tasks: first locate every scalar \(\lambda\) that makes \(T-\lambda I\) singular, then solve the resulting null-space problem for each such \(\lambda\). The union of these subspaces, together with a basis for each, completely describes the “pure scaling” behavior of \(T\).

> [!NOTE]
> The eigenspace for \(\lambda\) is precisely \(\ker(T-\lambda I)\); every algebraic manipulation that follows is simply the concrete computation of that kernel.

## 2. Why this matters — concrete and current
In structural engineering, NASA’s finite-element models of rocket boosters diagonalize stiffness matrices to obtain natural frequencies and mode shapes; each eigenspace corresponds to a distinct vibration pattern that engineers must damp.

Google’s original PageRank algorithm treats the web graph as the adjacency matrix of a Markov chain; the dominant eigenvector (and its one-dimensional eigenspace) supplies the steady-state ranking vector used in every search result.

Principal-component analysis, the workhorse of modern machine-learning pipelines at OpenAI and Meta, extracts the leading eigenspaces of the data covariance matrix; those directions become the axes along which high-dimensional embeddings are projected for visualization or compression.

In quantum mechanics, the time-independent Schrödinger equation for a finite-dimensional approximation of a molecule reduces to an eigenvalue problem whose eigenspaces label the stationary electron orbitals; chemists at Schrödinger Inc. rely on these subspaces to predict spectra.

Semiconductor-device simulators solve Maxwell’s equations on discretized grids; the resulting large sparse matrices are partially diagonalized so that designers at TSMC can isolate resonant frequencies that would otherwise produce signal leakage.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear independence      | Bases for eigenspaces must be linearly independent.       |
| Null space (kernel)      | Each eigenspace is defined as \(\ker(A-\lambda I)\).      |
| Characteristic polynomial| Its roots are exactly the eigenvalues that label the spaces. |
| Row reduction            | Systematic method for solving \((A-\lambda I)\mathbf{x}=0\). |
| Subspace test            | Verifies that the solution set really is a vector space.  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Scaling directions exist
A linear map can stretch some vectors by a constant factor while leaving their direction unchanged.  
Take the matrix \(A=\begin{pmatrix}2&0\\0&3\end{pmatrix}\). The standard basis vectors satisfy \(A\mathbf{e}_1=2\mathbf{e}_1\) and \(A\mathbf{e}_2=3\mathbf{e}_2\).  
Formally, a nonzero vector \(v\) is an **eigenvector** with eigenvalue \(\lambda\) when
\[
Av=\lambda v.
\]
> [!WARNING]
> Zero is never an eigenvector; the zero vector satisfies the equation for every \(\lambda\), but it carries no directional information.

### Step 2 — Rearrange into a homogeneous system
Rewrite the eigenvector equation by moving all terms to one side:
\[
Av-\lambda v=0\qquad\Rightarrow\qquad(A-\lambda I)v=0.
\]
The matrix \(A-\lambda I\) must be singular for nontrivial solutions to exist.

### Step 3 — Locate admissible scalars via the determinant
A square matrix is singular precisely when its determinant vanishes. Therefore the possible values of \(\lambda\) satisfy the **characteristic equation**
\[
\det(A-\lambda I)=0.
\]
The polynomial \(\det(A-\lambda I)\) is the characteristic polynomial of \(A\).

### Step 4 — Each root yields its own matrix
Substitute a concrete root \(\lambda_0\) back into \(A-\lambda I\) to obtain a specific coefficient matrix whose null space we now compute.

### Step 5 — Solve the null-space problem
Row-reduce \(A-\lambda_0 I\) to find a basis for its kernel. Every vector in that kernel is an eigenvector belonging to \(\lambda_0\); the span of those vectors is the **eigenspace** \(E_{\lambda_0}\).

### Step 6 — Verify the subspace property
Because the kernel of any linear map is a subspace, \(E_{\lambda_0}\) is automatically closed under addition and scalar multiplication; no extra check is required once the kernel has been found.

### Step 7 — Textbook statement
Let \(V\) be a finite-dimensional vector space over \(\mathbb{F}\) and let \(T:V\to V\) be linear. For each scalar \(\lambda\in\mathbb{F}\), the **eigenspace** of \(T\) corresponding to \(\lambda\) is
\[
E_{\lambda}(T)=\{v\in V\mid T(v)=\lambda v\}=\ker(T-\lambda I).
\]
Any basis of \(E_{\lambda}(T)\) is called a set of eigenvectors belonging to \(\lambda\).

## 5. Worked examples — every step shown

**Example 1 — Diagonal matrix**  
*Given:* \(A=\begin{pmatrix}4&0\\0&-1\end{pmatrix}\).  
*Find:* All eigenspaces.  

Compute \(\det(A-\lambda I)=(4-\lambda)(-1-\lambda)=0\), so \(\lambda=4\) or \(\lambda=-1\).  
For \(\lambda=4\): \(A-4I=\begin{pmatrix}0&0\\0&-5\end{pmatrix}\). Row reduction yields free variable \(x_2\), basis \(\{(0,1)^T\}\).  
*Why:* The second row forces \(x_2=0\) only when the pivot is nonzero; here the pivot is absent, leaving \(x_2\) free.  
For \(\lambda=-1\): analogous calculation gives basis \(\{(1,0)^T\}\).  

**Final answer**  
\(E_4=\operatorname{span}\{(0,1)^T\}\), \(E_{-1}=\operatorname{span}\{(1,0)^T\}\).

*Reflection:* The matrix was already diagonal, so the standard basis vectors were immediate eigenvectors; the method still recovers them systematically.

**Example 2 — Symmetric 2×2**  
*Given:* \(A=\begin{pmatrix}2&1\\1&2\end{pmatrix}\).  
*Find:* Eigenspaces.  

Characteristic polynomial: \((2-\lambda)^2-1=\lambda^2-4\lambda+3=0\), roots \(\lambda=1,3\).  
For \(\lambda=3\): \(A-3I=\begin{pmatrix}-1&1\\1&-1\end{pmatrix}\). Row reduction produces \(x_1=x_2\), basis \(\{(1,1)^T\}\).  
For \(\lambda=1\): basis \(\{(1,-1)^T\}\).  

**Final answer**  
\(E_3=\operatorname{span}\{(1,1)^T\}\), \(E_1=\operatorname{span}\{(1,-1)^T\}\).

*Reflection:* The two eigenvectors are orthogonal, a consequence of symmetry that will reappear in the spectral theorem.

**Example 3 — 3×3 matrix with repeated eigenvalue**  
*Given:* \(A=\begin{pmatrix}3&1&0\\0&3&0\\0&0&2\end{pmatrix}\).  
*Find:* Geometric multiplicity of \(\lambda=3\).  

\(A-3I=\begin{pmatrix}0&1&0\\0&0&0\\0&0&-1\end{pmatrix}\). Row reduction shows rank 2, nullity 1. Basis: \(\{(1,0,0)^T\}\).  

**Final answer**  
\(E_3=\operatorname{span}\{(1,0,0)^T\}\) (geometric multiplicity 1 < algebraic multiplicity 2).

*Reflection:* The algebraic multiplicity counts roots of the characteristic polynomial; the geometric multiplicity counts independent eigenvectors and may be smaller.

**Example 4 — Defective matrix (no full eigenbasis)**  
*Given:* \(A=\begin{pmatrix}0&1\\0&0\end{pmatrix}\).  
*Find:* Eigenspaces.  

Characteristic polynomial \(\lambda^2=0\), \(\lambda=0\) (multiplicity 2).  
\(A-0I=\begin{pmatrix}0&1\\0&0\end{pmatrix}\). Null space has basis \(\{(1,0)^T\}\).  

**Final answer**  
Only one-dimensional eigenspace \(E_0=\operatorname{span}\{(1,0)^T\}\).

*Reflection:* The matrix cannot be diagonalized; the single eigenvector direction is insufficient to span \(\mathbb{R}^2\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating \(\lambda=0\) as invalid | Students confuse “zero eigenvalue” with “zero vector” | Remember zero is a perfectly good eigenvalue; only the eigenvector must be nonzero. |
| Using the same basis vector for two different eigenvalues | Copy-paste error when listing eigenvectors | Label each basis vector with its own \(\lambda\) immediately. |
| Forgetting that the eigenspace is a subspace | Solving only for a single vector and stopping | Always write the span after finding the kernel basis. |
| Computing \(\det(A-\lambda I)\) incorrectly for 3×3 | Sign errors in cofactor expansion | Expand along the row with most zeros or use software verification on first attempt. |
| Assuming every matrix has a full set of eigenvectors | Over-generalizing from diagonalizable cases | Check that geometric multiplicity equals algebraic multiplicity for each eigenvalue. |
| Solving \((A-\lambda I)v=\mathbf{b}\) with \(\mathbf{b}\ne0\) | Misreading the eigenvector equation | Keep the right-hand side identically zero. |
| Reporting complex eigenvectors without noting the field | Working over \(\mathbb{R}\) but obtaining complex \(\lambda\) | State the scalar field explicitly before listing bases. |

## 7. The textbook-precise statement
Let \(V\) be a finite-dimensional vector space over \(\mathbb{F}\) and \(T\in\mathcal{L}(V)\). For \(\lambda\in\mathbb{F}\), the **eigenspace** of \(T\) associated with \(\lambda\) is
\[
E(\lambda,T)=\ker(T-\lambda I_V).
\]
If \(\lambda\) is an eigenvalue (i.e., \(E(\lambda,T)\ne\{0\}\)), any nonzero vector in \(E(\lambda,T)\) is an eigenvector. (Axler, *Linear Algebra Done Right*, 3e, §5.2, Definition 5.6 and Theorem 5.7.)

## 8. Visual — diagram or schematic
```text
          y
          ^
          |     E_3 = span{(1,1)}
          |    /
          |   /
    (1,1) o  /
          | /
          |/
----------+----------> x
         /|
        / |
       /  |
      /   o (1,-1)
     /    |
    E_1   |
```
Two distinct lines through the origin in \(\mathbb{R}^2\) represent the eigenspaces \(E_3\) and \(E_1\) of the matrix in Example 2; each line is the set of all scalar multiples of its generator vector.

## 9. The memory technique
1. **The hook** — Picture a hallway of fun-house mirrors, each mirror labeled with a stretch factor \(\lambda\); only vectors lying exactly on the mirror’s “axis line” emerge unchanged in direction—the entire line is the eigenspace.
2. **What to overlearn** — \(E_\lambda=\ker(A-\lambda I)\); the characteristic polynomial equation \(\det(A-\lambda I)=0\); geometric multiplicity = dimension of kernel.
3. **Spaced-repetition schedule** — Review the kernel definition after 1 day, compute two fresh eigenspaces after 3 days, diagonalize a 3×3 matrix after 7 days, prove that distinct eigenspaces intersect only at zero after 16 days, and reconstruct the spectral theorem outline after 35 days.
4. **First-principles fallback** — Start from \(Av=\lambda v\), subtract to obtain \((A-\lambda I)v=0\), recognize this as the defining equation of the kernel, then row-reduce.

## 10. What this unlocks
Eigenspaces are the atomic building blocks for diagonalization, Jordan canonical form, the spectral theorem for symmetric matrices, singular-value decomposition, and the functional calculus for matrices.  

- Diagonalization of matrices and linear operators  
- Jordan blocks when geometric multiplicity is deficient  
- Orthogonal diagonalization of symmetric/Hermitian matrices  
- Principal-component analysis and the SVD  
- Exponential of a matrix via power series on each eigenspace  

## 11. Self-check — five questions, no answers
1. For the zero matrix, what are all its eigenspaces?  
2. Compute the eigenspaces of \(\begin{pmatrix}1&1\\-1&3\end{pmatrix}\) and state their dimensions.  
3. A 4×4 matrix has characteristic polynomial \((\lambda-2)^3(\lambda-5)\). What are the possible dimensions of \(E_2\)?  
4. Explain why two eigenvectors belonging to distinct eigenvalues must be linearly independent.  
5. Construct a 3×3 matrix whose only eigenvalue is 0 yet whose eigenspace is two-dimensional; give an explicit basis for that space.