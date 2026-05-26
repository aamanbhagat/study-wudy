## 1. The one-sentence answer
**A quadratic form on a real vector space is a homogeneous quadratic polynomial \( q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x} \) whose definiteness is completely determined by the eigenvalues of the symmetric matrix \( A \).**

A quadratic form tells you how a single number changes when you stretch or compress vectors in different directions. Positive definite means the number is always strictly positive except at the zero vector; negative definite means it is always strictly negative; indefinite means it takes both positive and negative values. The sign pattern of the eigenvalues of \( A \) decides which case holds.

Once you know the definiteness, you immediately know whether the associated surface \( q(\mathbf{x}) = c \) is an ellipsoid, a hyperboloid, or degenerate. This single piece of information controls convexity, stability, and the existence of minima in optimisation problems built on top of the form.

> [!NOTE]
> The “aha” moment is that definiteness is not about the polynomial itself but about the inertia (the triple of positive, negative, and zero eigenvalues) of its matrix; Sylvester’s law says this triple is invariant under any change of basis.

## 2. Why this matters — concrete and current
In aerospace, the kinetic-energy quadratic form of a rigid body appears in the inertia tensor; NASA’s attitude-control algorithms for the James Webb Space Telescope rely on checking that this 3-by-3 matrix remains positive definite after each thermal distortion so that the Lyapunov function used for detumbling stays valid.

In modern portfolio theory, BlackRock’s risk models treat asset-return covariance matrices as quadratic forms; a portfolio optimiser rejects any weight vector whose quadratic risk form is not positive definite, because an indefinite covariance would imply arbitrage opportunities that the market does not actually allow.

Inside the TensorFlow Probability library, the variational inference engine for Gaussian-process models repeatedly factorises the precision matrix; the Cholesky factor exists if and only if the quadratic form defined by the precision matrix is positive definite, and the library raises a concrete “not positive definite” error when this test fails on GPU.

In semiconductor device simulation, Synopsys TCAD solves Poisson’s equation on a mesh whose discretised energy functional is a quadratic form; negative eigenvalues appear precisely when the mesh contains inverted elements, immediately flagging a bad finite-element grid before any transient simulation begins.

In quantum mechanics, the expectation value of an observable is the quadratic form defined by its Hermitian operator; the sign of this form on a trial wave-function tells an experimentalist at CERN whether a proposed variational ansatz can possibly lower the ground-state energy of the Higgs sector.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Symmetric matrices       | Only symmetric matrices produce real quadratic forms whose eigenvalues are guaranteed real and whose definiteness is basis-independent. |
| Eigenvalues and eigenvectors | The signs of the eigenvalues of \( A \) are exactly the definiteness signature of \( q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x} \). |
| Change-of-basis matrices | Congruence transformations \( P^T A P \) preserve the inertia; you must know why similarity is not enough. |
| Positive-definite inner product | The standard dot product lets you rewrite \( q(\mathbf{x}) \) as \( \langle \mathbf{x}, A\mathbf{x}\rangle \), the language used in all proofs. |

If any row is missing, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — From quadratic polynomial to matrix
A general quadratic polynomial in \( n \) variables contains linear and constant terms, yet only the pure quadratic part survives when we evaluate definiteness at the origin.  
Example: \( q(x,y) = 3x^2 - 2xy + 4y^2 \) already has no linear terms, so its matrix is immediate.  
Formally, any quadratic form admits a unique symmetric matrix \( A \) such that
\[
q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}.
\]
> [!WARNING]
> If you forget to symmetrise the off-diagonal entries (halving the coefficient of \( xy \)), the eigenvalues become wrong and the definiteness test fails.

### Step 2 — Eigenvalue test for definiteness
Diagonalise the symmetric matrix: \( A = QDQ^T \) with \( D \) diagonal. Then
\[
q(\mathbf{x}) = \mathbf{y}^T D \mathbf{y} = \sum_{i=1}^n \lambda_i y_i^2, \quad \mathbf{y}=Q^T\mathbf{x}.
\]
The sign of every \( \lambda_i \) decides the sign of \( q \).  
> [!WARNING]
> Using similarity \( P^{-1}AP \) instead of congruence \( P^TAP \) destroys the quadratic form; the new matrix no longer represents the same function.

### Step 3 — Positive definite criterion
\( q \) is positive definite when every eigenvalue satisfies \( \lambda_i > 0 \). Equivalently, all leading principal minors are positive (Sylvester’s criterion).  
Concrete check for \( 2\times2 \): \( a>0 \) and \( \det A >0 \).

### Step 4 — Negative definite and indefinite cases
If every \( \lambda_i < 0 \), \( q \) is negative definite. If both positive and negative eigenvalues exist, \( q \) is indefinite and the surface \( q(\mathbf{x})=1 \) is a hyperboloid. Zero eigenvalues produce cylinders or cones.

### Step 5 — Congruence invariance (Sylvester’s law of inertia)
Any invertible change of variables \( \mathbf{x}=P\mathbf{y} \) replaces \( A \) by the congruent matrix \( P^TAP \). The numbers of positive, negative, and zero eigenvalues remain exactly the same; therefore definiteness is an intrinsic property of the quadratic form, not of any particular coordinate system.

### Step 6 — Link to definiteness of the Hessian
At a critical point of a twice-differentiable function \( f \), the Hessian matrix \( H \) defines the quadratic form of the second-order Taylor expansion. Positive-definiteness of \( H \) guarantees a strict local minimum.

## 5. Worked examples — har step show karo

**Example 1 — Simple 2-by-2 test**  
*Given:* \( q(x,y)=2x^2+3xy+2y^2 \).  
*Find:* definiteness.  
Matrix:
\[
A=\begin{pmatrix}2&1.5\\1.5&2\end{pmatrix}.
\]
Leading minors: \( 2>0 \), \( \det A=4-2.25=1.75>0 \).  
*Why:* both conditions of Sylvester’s criterion hold, therefore positive definite.  
**Positive definite.**  
*Reflection:* the example is diagonal-dominant, so the test is easy; the same matrix with a larger off-diagonal term would flip the determinant sign and become indefinite.

**Example 2 — Eigenvalue route**  
*Given:* \( A=\begin{pmatrix}1&2\\2&1\end{pmatrix} \).  
*Find:* definiteness via eigenvalues.  
Characteristic polynomial \( \lambda^2-2\lambda-3=0 \) yields \( \lambda=3,-1 \).  
*Why:* one positive, one negative eigenvalue implies the form takes both signs.  
**Indefinite.**  
*Reflection:* computing eigenvalues is more expensive than minors but immediately gives the inertia triple needed for later classification of level sets.

**Example 3 — 3-by-3 negative definite case**  
*Given:* \( A=\begin{pmatrix}-2&1&0\\1&-2&1\\0&1&-2\end{pmatrix} \).  
All leading minors alternate in sign starting with negative: \( -2<0 \), \( \det\begin{pmatrix}-2&1\\1&-2\end{pmatrix}=3>0 \), full determinant \( =-4<0 \).  
*Why:* Sylvester’s criterion for negative definiteness is satisfied.  
**Negative definite.**  
*Reflection:* the tridiagonal pattern appears in discrete Laplacians with Dirichlet boundaries; the same test proves the discrete energy is negative definite.

**Example 4 — Indefinite form with kernel**  
*Given:* \( A=\begin{pmatrix}1&0&0\\0&-1&0\\0&0&0\end{pmatrix} \).  
Eigenvalues: \( 1,-1,0 \).  
*Why:* zero eigenvalue produces a line of vectors where \( q=0 \), so the form is neither definite nor semidefinite.  
**Indefinite (with degeneracy).**  
*Reflection:* degeneracy must be reported separately; many optimisation routines assume non-degenerate Hessians and will fail here.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using similarity instead of congruence | Students confuse diagonalisation of linear operators with quadratic-form change of variables | Always replace \( A \) by \( P^TAP \) when substituting \( \mathbf{x}=P\mathbf{y} \). |
| Forgetting to halve cross-term coefficients | The matrix must be symmetric; raw polynomial coefficients place twice the off-diagonal entry | Write the coefficient of \( xy \) as \( 2a_{12} \) before reading the matrix. |
| Checking only the determinant for \( n>2 \) | Determinant alone cannot detect a single negative eigenvalue hidden among positives | Use the full sequence of leading principal minors or compute all eigenvalues. |
| Declaring semidefinite when zero eigenvalues exist | Zero eigenvalues make the form only positive or negative semi-definite | Always count the multiplicity of the zero eigenvalue and state “semi” explicitly. |
| Applying the test to a non-symmetric matrix | Definiteness is only defined for symmetric (or Hermitian) matrices | Symmetrise first: replace \( A \) by \( (A+A^T)/2 \). |
| Confusing positive definite with positive entries | A matrix with positive entries can still have negative eigenvalues (e.g., \( \begin{pmatrix}1&3\\3&1\end{pmatrix} \)) | Never rely on entry signs; always run the eigenvalue or minor test. |
| Ignoring floating-point round-off in numerical checks | Tiny negative eigenvalues appear because of rounding | Use a small tolerance relative to the matrix norm or refactor with pivoted Cholesky. |

## 7. The textbook-precise statement
Let \( V \) be a finite-dimensional real vector space and let \( q:V\to\mathbb{R} \) be a quadratic form. There exists a unique symmetric bilinear form \( B:V\times V\to\mathbb{R} \) such that \( q(v)=B(v,v) \). Choosing any ordered basis, the matrix \( A \) of \( B \) is symmetric and satisfies \( q(\mathbf{x})=\mathbf{x}^T A\mathbf{x} \). The quadratic form \( q \) is positive definite if \( q(v)>0 \) for all \( v\neq0 \), negative definite if \( q(v)<0 \) for all \( v\neq0 \), and indefinite if there exist \( v,w \) with \( q(v)>0 \) and \( q(w)<0 \). By Sylvester’s law of inertia the triple \( (n_+,n_-,n_0) \) of positive, negative and zero eigenvalues of \( A \) (counted with multiplicity) is independent of the basis. Consequently the definiteness class of \( q \) is an intrinsic property of the pair \( (V,q) \). (Reference: Axler, *Linear Algebra Done Right*, 3e, §7.C and §8.B.)

## 8. Visual — diagram or schematic
```
          y
          ^
          |
   q>0    |    q<0
  (pos)   |   (neg)
----------+----------> x
          |
   q<0    |    q>0
  (neg)   |   (pos)
```
The four open quadrants show the sign pattern of an indefinite quadratic form whose matrix has eigenvalues of opposite sign; the axes themselves are the asymptotic lines where \( q=0 \).

## 9. The memory technique
1. **The hook** — Picture a saddle surface in a playground: you slide downhill in one direction (negative) and uphill in the perpendicular direction (positive); the saddle is the visual signature of an indefinite quadratic form.
2. **What to overlearn** — For any symmetric \( 2\times2 \) matrix the two conditions \( a>0 \) and \( \det A>0 \) instantly certify positive definiteness; the inertia triple \( (n_+,n_-,n_0) \) is the only information you ever need to store.
3. **Spaced-repetition schedule** — Review the eigenvalue test after 1 day, Sylvester’s criterion after 3 days, the saddle-surface picture after 7 days, and a 3-by-3 numerical example after 16 and 35 days.
4. **First-principles fallback** — If you forget the criteria, return to the diagonalised expression \( \sum\lambda_i y_i^2 \); the sign of each term is visible at once.

## 10. What this unlocks
Mastery of quadratic-form definiteness lets you classify critical points of multivariable functions, certify convexity of optimisation objectives, and guarantee existence of solutions for elliptic PDEs.  

- Second-derivative test in several variables  
- Cholesky factorisation and its numerical stability  
- Lyapunov stability criteria for linear dynamical systems  
- Support-vector-machine kernel positive-definiteness checks  
- Finite-element energy estimates in structural mechanics  

## 11. Self-check — five questions, no answers
1. For the matrix \( A=\begin{pmatrix}5&-1\\-1&2\end{pmatrix} \), is the associated quadratic form positive definite?  
2. Give a 3-by-3 symmetric matrix whose quadratic form is indefinite but has a one-dimensional kernel.  
3. Why does Sylvester’s law require congruence rather than similarity?  
4. A Hessian matrix at a critical point has eigenvalues 2, 2, −3. What does this imply about the nature of the critical point?  
5. Construct a quadratic form on \( \mathbb{R}^2 \) that is positive on the unit circle except at two antipodal points where it vanishes; prove that it cannot be positive semidefinite.