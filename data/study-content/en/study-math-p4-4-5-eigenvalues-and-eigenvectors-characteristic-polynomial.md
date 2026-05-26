## 1. The one-sentence answer
**Eigenvalues and eigenvectors of a square matrix \(A\) are the scalars \(\lambda\) and nonzero vectors \(v\) satisfying \(Av = \lambda v\), and they are found by computing the roots of the characteristic polynomial \(\det(A - \lambda I) = 0\).**

This equation encodes a geometric fact: certain directions remain unchanged (apart from scaling) when the linear transformation represented by \(A\) is applied. The characteristic polynomial is the explicit algebraic device that locates those directions and scalings without guessing.

To see why the polynomial appears, rearrange \(Av = \lambda v\) to \((A - \lambda I)v = 0\). A nonzero vector \(v\) exists precisely when the matrix \(A - \lambda I\) fails to be invertible, which occurs exactly when its determinant vanishes. The resulting determinant, viewed as a function of \(\lambda\), is a monic polynomial whose degree equals the size of the matrix.

> [!NOTE]
> The characteristic polynomial converts an abstract geometric condition into a concrete algebraic computation whose roots are the eigenvalues; once they are known, the corresponding eigenvectors are recovered by solving a homogeneous linear system.

## 2. Why this matters — concrete and current
Google’s PageRank algorithm models the web as a giant stochastic matrix and extracts its dominant eigenvector; that eigenvector supplies the ranking scores displayed to users. The same matrix is diagonalized via its eigenvalues to accelerate the power iteration that computes the ranking nightly.

In quantum mechanics the Hamiltonian operator of a physical system is represented, after discretization, by a Hermitian matrix. Its eigenvalues are the allowed energy levels; the eigenvectors are the stationary states whose time evolution is a simple phase factor. Modern density-functional codes diagonalize matrices of size \(10^5\) or larger to predict molecular spectra.

Vibration analysis of an aircraft wing or a semiconductor wafer uses the finite-element stiffness and mass matrices. The natural frequencies are square roots of the eigenvalues of the generalized problem \(Kv = \lambda Mv\); resonance avoidance depends on accurate computation of the lowest dozen eigenvalues.

Principal-component analysis in machine-learning pipelines centers a data matrix and computes its singular values, which are the square roots of the eigenvalues of the covariance matrix. Dimensionality reduction in image compression and in transformer attention layers rests on this spectral decomposition.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Matrix–vector multiplication   | The defining relation \(Av = \lambda v\) is matrix multiplication. |
| Linear independence and span   | Eigenvectors belonging to distinct eigenvalues are linearly independent. |
| Determinant                    | The characteristic polynomial is defined via \(\det(A - \lambda I)\). |
| Invertibility and null space   | \(A - \lambda I\) must be singular for a nonzero eigenvector to exist. |
| Polynomial roots               | Eigenvalues are exactly the roots of the characteristic polynomial. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Linear maps stretch selected directions by constant factors
A linear transformation may rotate or shear most vectors, yet a few special vectors are merely scaled. These are the eigenvectors; the scaling factor is the eigenvalue.  
For the matrix \(A = \begin{pmatrix} 2 & 1 \\ 0 & 3 \end{pmatrix}\), the vector \(\begin{pmatrix} 1 \\ 0 \end{pmatrix}\) is sent to \(\begin{pmatrix} 2 \\ 0 \end{pmatrix}\), which is exactly twice the original vector, so \(\lambda = 2\) is an eigenvalue.  
Formally, a nonzero vector \(v\) is an eigenvector of \(A\) with eigenvalue \(\lambda\) when
\[
Av = \lambda v.
\]
> [!WARNING]
> If you allow the zero vector, every scalar satisfies the equation; the definition therefore explicitly excludes zero.

### Step 2 — Rearrangement produces a homogeneous system
Subtract \(\lambda v\) from both sides:
\[
(A - \lambda I)v = 0.
\]
The matrix \(A - \lambda I\) must map a nonzero vector to zero, hence cannot be invertible.  
> [!WARNING]
> Treating \(\lambda\) as already known at this stage leads to circular reasoning; \(\lambda\) is the unknown.

### Step 3 — Singularity is detected by a vanishing determinant
A square matrix is singular if and only if its determinant is zero. Therefore the admissible values of \(\lambda\) satisfy
\[
\det(A - \lambda I) = 0.
\]
The left-hand side expands to a polynomial of degree \(n\) for an \(n \times n\) matrix; it is called the characteristic polynomial \(p_A(\lambda)\).

### Step 4 — The characteristic polynomial is monic of degree \(n\)
Expanding the determinant yields
\[
p_A(\lambda) = (-1)^n \lambda^n + \cdots + (-1)^n \det(A),
\]
so the leading coefficient is always \((-1)^n\). The eigenvalues are the roots of this polynomial counted with algebraic multiplicity.

### Step 5 — Eigenvectors are recovered after the eigenvalues are known
For each root \(\lambda_i\), solve the homogeneous system
\[
(A - \lambda_i I)x = 0
\]
by row reduction; any nonzero solution is an eigenvector. The geometric multiplicity is the dimension of that null space.

## 5. Worked examples — every step shown

**Example 1 — 2×2 matrix with distinct eigenvalues**  
*Given:* \(A = \begin{pmatrix} 4 & 2 \\ 1 & 3 \end{pmatrix}\).  
*Find:* eigenvalues and eigenvectors.  

Compute the characteristic matrix:
\[
A - \lambda I = \begin{pmatrix} 4-\lambda & 2 \\ 1 & 3-\lambda \end{pmatrix}.
\]
*Why:* subtract \(\lambda\) on the diagonal.  
Determinant:
\[
\det(A - \lambda I) = (4-\lambda)(3-\lambda) - 2 = \lambda^2 - 7\lambda + 10.
\]
*Why:* product of diagonals minus product of off-diagonals.  
Set equal to zero:
\[
\lambda^2 - 7\lambda + 10 = 0 \implies (\lambda-2)(\lambda-5)=0.
\]
*Why:* factor quadratic.  
Eigenvalues: \(\lambda=2,5\).  

For \(\lambda=2\):
\[
\begin{pmatrix} 2 & 2 \\ 1 & 1 \end{pmatrix} x = 0 \implies x_1 + x_2 = 0.
\]
*Why:* row-reduce; second row is half the first.  
Eigenvector: \(v_1 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}\).  

For \(\lambda=5\):
\[
\begin{pmatrix} -1 & 2 \\ 1 & -2 \end{pmatrix} x = 0 \implies -x_1 + 2x_2 = 0.
\]
*Why:* same row reduction yields one free variable.  
Eigenvector: \(v_2 = \begin{pmatrix} 2 \\ 1 \end{pmatrix}\).  

**Final answer**  
Eigenvalues \(2,5\); eigenvectors \(\begin{pmatrix}1\\-1\end{pmatrix}\), \(\begin{pmatrix}2\\1\end{pmatrix}\).

*Reflection:* The determinant step is mechanical; the only algebraic care needed is correct expansion of the 2×2 determinant.

**Example 2 — Repeated eigenvalue, geometric multiplicity 1**  
*Given:* \(A = \begin{pmatrix} 3 & 1 \\ 0 & 3 \end{pmatrix}\).  
*Find:* eigenvalues and a basis of eigenvectors.  

Characteristic polynomial:
\[
\det\begin{pmatrix}3-\lambda & 1 \\ 0 & 3-\lambda\end{pmatrix} = (3-\lambda)^2.
\]
*Why:* upper-triangular, determinant is product of diagonals.  
Root \(\lambda=3\) of algebraic multiplicity 2.  

Solve \((A-3I)x=0\):
\[
\begin{pmatrix}0 & 1 \\ 0 & 0\end{pmatrix}x=0 \implies x_2=0.
\]
*Why:* second column forces the second coordinate to vanish.  
Only eigenvectors are multiples of \(\begin{pmatrix}1\\0\end{pmatrix}\); geometric multiplicity 1.

**Final answer**  
Eigenvalue 3 (algebraic multiplicity 2, geometric multiplicity 1); eigenspace spanned by \(\begin{pmatrix}1\\0\end{pmatrix}\).

*Reflection:* Algebraic multiplicity does not guarantee a full set of eigenvectors; the matrix is defective.

**Example 3 — 3×3 matrix**  
*Given:* \(A = \begin{pmatrix}2&0&0\\1&3&1\\0&0&4\end{pmatrix}\).  
*Find:* characteristic polynomial and eigenvalues.  

\[
A-\lambda I = \begin{pmatrix}2-\lambda&0&0\\1&3-\lambda&1\\0&0&4-\lambda\end{pmatrix}.
\]
Determinant expands along first row:
\[
(2-\lambda)\det\begin{pmatrix}3-\lambda&1\\0&4-\lambda\end{pmatrix} = (2-\lambda)(3-\lambda)(4-\lambda).
\]
*Why:* the 2×2 minor is itself triangular.  
Eigenvalues: 2, 3, 4.

**Final answer**  
Characteristic polynomial \((2-\lambda)(3-\lambda)(4-\lambda)\); eigenvalues 2, 3, 4.

*Reflection:* When a matrix is block-triangular the characteristic polynomial factors immediately.

**Example 4 — Characteristic polynomial via trace and determinant**  
*Given:* \(A = \begin{pmatrix}1&-1\\2&3\end{pmatrix}\).  
*Find:* characteristic polynomial without expanding the determinant from scratch.  

Trace \(=4\), determinant \(=5\). For a 2×2 matrix the characteristic polynomial is always
\[
\lambda^2 - (\operatorname{tr} A)\lambda + \det A.
\]
*Why:* coefficients are elementary symmetric functions of the eigenvalues.  
Thus
\[
p_A(\lambda) = \lambda^2 - 4\lambda + 5.
\]

**Final answer**  
\(\lambda^2 - 4\lambda + 5\).

*Reflection:* Trace and determinant give the polynomial instantly for 2×2 matrices; the same idea generalizes via Newton identities for larger matrices.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Computing \(\det(\lambda I - A)\) instead of \(\det(A - \lambda I)\) | Sign error in the leading term | Fix the order \(A - \lambda I\) once and never reverse it. |
| Forgetting that eigenvectors must be nonzero | Zero trivially satisfies the equation | State “nonzero vector” every time the definition is written. |
| Confusing algebraic and geometric multiplicity | Both are called “multiplicity” in casual speech | Always qualify: algebraic = root multiplicity; geometric = dim ker. |
| Row-reducing \(A - \lambda I\) before substituting a numerical \(\lambda\) | Symbolic row reduction hides free variables | Substitute the concrete eigenvalue first. |
| Assuming every matrix has a full eigenbasis | Defective matrices exist | Check geometric multiplicity after finding each eigenvalue. |
| Treating the characteristic polynomial as monic with positive leading coefficient for odd dimension | Sign \((-1)^n\) is overlooked | Write the leading term explicitly as \((-1)^n\lambda^n\). |
| Using the same symbol \(\lambda\) for both eigenvalue and dummy variable in the polynomial | Notation collision | Distinguish \(p_A(t) = \det(A - t I)\) from the root \(\lambda\). |

## 7. The textbook-precise statement
Let \(A\) be an \(n \times n\) matrix over a field \(F\). The characteristic polynomial of \(A\) is the monic polynomial
\[
p_A(t) := \det(tI - A) \in F[t]
\]
of degree \(n\). A scalar \(\lambda \in F\) is an eigenvalue of \(A\) if there exists a nonzero vector \(v \in F^n\) such that \(Av = \lambda v\). Equivalently, \(\lambda\) is an eigenvalue if and only if \(p_A(\lambda) = 0\). The eigenspace belonging to \(\lambda\) is \(\ker(A - \lambda I)\); its dimension is the geometric multiplicity of \(\lambda\). (Axler, *Linear Algebra Done Right*, 3e, §5.1–5.2.)

## 8. Visual — diagram or schematic
```text
λ-axis
   ↑
   │     p(λ)
   │   ↗   ↘
   │  /     \
───┼─┼───────┼──→ λ
   │ root   root
   │ (ev)   (ev)
```
The graph of the characteristic polynomial crosses or touches the λ-axis exactly at the eigenvalues; each crossing corresponds to a direction that the matrix merely stretches.

## 9. The memory technique
1. **The hook** — Picture the matrix as a pane of glass; most vectors are bent, but a few “eigen-rays” pass straight through, only brighter or dimmer—their brightness change is \(\lambda\).

2. **What to overlearn**  
   - Definition: \(Av = \lambda v\), \(v \neq 0\).  
   - Characteristic polynomial: \(\det(A - \lambda I) = 0\).  
   - For 2×2: \(\lambda^2 - (\operatorname{tr} A)\lambda + \det A\).

3. **Spaced-repetition schedule** — Review the definition after 1 day, recompute a 3×3 example after 3 days, prove that eigenvectors for distinct eigenvalues are independent after 7 days, derive the 2×2 shortcut after 16 days, and reconstruct the full argument from first principles after 35 days.

4. **First-principles fallback** — Start from \(Av = \lambda v\), subtract, demand a nontrivial kernel, set the determinant to zero; every later fact follows.

## 10. What this unlocks
The characteristic polynomial is the gateway to diagonalization, Jordan form, spectral theorem, and the functional calculus.  

- Diagonalization and matrix powers \(A^k = PDP^{-1}\).  
- Cayley–Hamilton theorem: every matrix satisfies its own characteristic equation.  
- Minimal polynomial and Jordan canonical form.  
- Spectral theorem for symmetric/Hermitian matrices.  
- Differential equations \(\dot x = Ax\) solved by \(e^{At}\).  
- Singular-value decomposition via eigenvalues of \(A^*A\).

## 11. Self-check — five questions, no answers
1. Compute the characteristic polynomial of \(\begin{pmatrix}1&2\\3&4\end{pmatrix}\) and verify that its roots satisfy the trace–determinant relations.

2. Show that if \(v\) is an eigenvector of \(A\) with eigenvalue \(\lambda\), then \(v\) is also an eigenvector of \(A^2\) with eigenvalue \(\lambda^2\).

3. Give an example of a 2×2 matrix whose characteristic polynomial has no real roots; explain geometrically what this means for the linear transformation.

4. Prove that the sum of the eigenvalues (counted with algebraic multiplicity) equals the trace; do so without finding the eigenvalues explicitly.

5. A matrix \(A\) satisfies \(A^2 = A\). What are the only possible eigenvalues? Construct the characteristic polynomial of a projection matrix of rank 2 in \(\mathbb{R}^4\).