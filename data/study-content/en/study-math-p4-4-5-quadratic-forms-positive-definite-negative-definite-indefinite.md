## 1. The one-sentence answer
**A quadratic form is a homogeneous quadratic polynomial \(Q(\mathbf{x})=\mathbf{x}^T A\mathbf{x}\) whose sign behavior is completely determined by the eigenvalues of the symmetric matrix \(A\)**.

A quadratic form maps every vector to a scalar by sandwiching a symmetric matrix between the vector and its transpose. The resulting scalar can be positive for every nonzero vector, negative for every nonzero vector, or positive for some vectors and negative for others. These three exhaustive possibilities are called positive definite, negative definite, and indefinite. The classification decides whether the associated multivariable function has a strict minimum, a strict maximum, or a saddle at the origin.

The eigenvalues of \(A\) supply the decisive test: all positive eigenvalues give a positive definite form, all negative give a negative definite form, and mixed signs give an indefinite form. Equivalently, the quadratic form can be diagonalized by an orthogonal change of variables into a sum of squares whose coefficients are precisely those eigenvalues.

> [!NOTE]
> The sign pattern of the eigenvalues is invariant under congruence, so the definiteness class is an intrinsic geometric property of the quadratic form, independent of any particular coordinate system.

## 2. Why this matters — concrete and current
In training large language models, the Hessian of the loss surface at a critical point is a symmetric matrix; its definiteness tells optimizers whether a found point is a local minimum (positive definite) or a saddle (indefinite), directly affecting whether training can stop or must continue.

Spacecraft attitude control systems linearize rotational kinetic energy as a quadratic form on angular-velocity space; positive-definiteness of the inertia matrix guarantees that total energy is a Lyapunov function, proving Lyapunov stability of the desired spin axis without solving the full nonlinear equations.

Semiconductor device physicists model electrostatic energy stored in a quantum-well heterostructure by a quadratic form whose positive-definiteness ensures that small perturbations in carrier density raise the total energy, implying local stability of the equilibrium charge distribution.

Portfolio optimization at quantitative hedge funds uses the covariance matrix of asset returns as the matrix of a quadratic risk form; positive-definiteness guarantees that any nonzero portfolio has strictly positive variance, preventing degenerate risk-free arbitrage opportunities that would otherwise appear in singular matrices.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Symmetric matrices             | Only symmetric matrices produce real quadratic forms via \(\mathbf{x}^T A\mathbf{x}\). |
| Eigenvalues and eigenvectors   | The definiteness classification reduces exactly to the signs of the eigenvalues. |
| Orthogonal diagonalization     | Real symmetric matrices are orthogonally diagonalizable, converting any quadratic form into a sum of squares. |
| Positive-definite matrices     | The definition of a positive-definite quadratic form is identical to the matrix \(A\) being positive definite. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A quadratic expression that scales with the square of the input
Any expression that doubles when the vector is doubled and vanishes at the origin is homogeneous of degree two.  
Example: \(Q(x,y)=3x^2-2xy+4y^2\).  
Formally, \(Q(\mathbf{x})=\mathbf{x}^T A\mathbf{x}\) where \(A\) is symmetric.  
> [!WARNING]  
> Treating a non-symmetric matrix as the matrix of a quadratic form leads to an incorrect associated bilinear form; always symmetrize first by replacing \(A\) with \((A+A^T)/2\).

### Step 2 — The quadratic form becomes a weighted sum of squares after rotation
An orthogonal change of variables \(\mathbf{x}=P\mathbf{y}\) with \(P^T P=I\) turns \(Q\) into \(\sum\lambda_i y_i^2\).  
Example: rotating the earlier form yields \(\lambda_1 y_1^2+\lambda_2 y_2^2\).  
Formally, \(Q(\mathbf{x})=\mathbf{y}^T D\mathbf{y}\) where \(D=\operatorname{diag}(\lambda_1,\dots,\lambda_n)\).  
> [!WARNING]  
> Using a non-orthogonal change of variables destroys the geometric meaning of lengths and angles, so the signs of the resulting coefficients no longer classify definiteness.

### Step 3 — The sign of each squared term is fixed by its coefficient
If every \(\lambda_i>0\), then \(Q(\mathbf{x})>0\) whenever \(\mathbf{x}\neq\mathbf{0}\).  
If every \(\lambda_i<0\), then \(Q(\mathbf{x})<0\) for \(\mathbf{x}\neq\mathbf{0}\).  
If some \(\lambda_i>0\) and some \(\lambda_j<0\), then \(Q\) takes both positive and negative values.  
Formally: positive definite when \(\lambda_i>0\) \(\forall i\); negative definite when \(\lambda_i<0\) \(\forall i\); indefinite otherwise.  
> [!WARNING]  
> Zero eigenvalues produce a semidefinite form that is neither definite nor indefinite; the zero eigenvalue must be excluded for strict definiteness.

### Step 4 — The classification is basis-independent
Because eigenvalues are preserved under orthogonal similarity, the sign pattern is the same in every orthonormal coordinate system.  
This yields the textbook statement: a quadratic form is positive definite if and only if all eigenvalues of its matrix are positive.

## 5. Worked examples — every step shown

**Example 1 — Two-variable positive definite form**  
*Given:* \(Q(x,y)=x^2+3xy+3y^2\).  
*Find:* definiteness class.  

Matrix:  
\[
A=\begin{pmatrix}1 & 3/2\\3/2 & 3\end{pmatrix}.
\]  
*Why:* coefficients of cross terms are halved when forming the symmetric matrix.  

Characteristic polynomial:  
\[
\det(A-\lambda I)=(1-\lambda)(3-\lambda)-(9/4)=\lambda^2-4\lambda+3/4=0.
\]  
*Why:* expand the 2-by-2 determinant.  

Roots: \(\lambda= (4\pm\sqrt{16-3})/2= (4\pm\sqrt{13})/2\), both positive.  
*Why:* discriminant positive and sum and product positive.  

**Positive definite.**  

*Reflection:* the cross term required symmetrization; eigenvalue signs gave the answer without completing the square.

**Example 2 — Negative definite form**  
*Given:* \(Q(x,y)=-x^2-4xy-5y^2\).  
*Find:* class.  

Matrix:  
\[
A=\begin{pmatrix}-1 & -2\\-2 & -5\end{pmatrix}.
\]  
Eigenvalues: both negative by trace \(-6<0\) and determinant \(5-4=1>0\).  
**Negative definite.**  

*Reflection:* sign pattern of the quadratic immediately suggests negativity; eigenvalue test confirms it rigorously.

**Example 3 — Indefinite form**  
*Given:* \(Q(x,y)=x^2-y^2\).  
*Find:* class.  

Matrix diag(1,-1). Eigenvalues +1 and −1.  
**Indefinite.**  

*Reflection:* opposite signs produce saddle behavior; no further computation needed once eigenvalues are read off.

**Example 4 — Three-variable borderline case**  
*Given:* \(Q(x,y,z)=x^2+y^2\).  
*Find:* class.  

Matrix has eigenvalues 1,1,0.  
**Positive semidefinite but not definite.**  

*Reflection:* the zero eigenvalue forces the form to vanish along the z-axis, illustrating why “definite” excludes zero.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting to symmetrize \(A\)    | Cross-term coefficients written twice       | Always replace \(A\) by \((A+A^T)/2\) before testing |
| Confusing “semidefinite” with “definite” | Zero eigenvalue produces non-strict inequality | Check that all eigenvalues are strictly nonzero      |
| Using non-orthogonal diagonalization | Loses Euclidean geometry                    | Insist on orthogonal \(P\) so \(\|x\|\) is preserved |
| Checking only leading principal minors incorrectly | Sylvester criterion requires all leading minors | Apply the full sequence of leading principal minors  |
| Assuming complex eigenvalues possible | Forgetting symmetry guarantees real spectrum | Verify \(A\) is symmetric before computing eigenvalues |
| Treating the zero form as indefinite | Zero form takes neither positive nor negative values | Classify the zero form separately as semidefinite    |
| Ignoring multiplicity of eigenvalues | Repeated roots may hide sign changes        | Count algebraic multiplicity when listing signs      |

## 7. The textbook-precise statement
Let \(A\) be a real symmetric \(n\times n\) matrix. The quadratic form \(Q(\mathbf{x})=\mathbf{x}^T A\mathbf{x}\) is  
- positive definite if \(\mathbf{x}^T A\mathbf{x}>0\) for all \(\mathbf{x}\neq\mathbf{0}\),  
- negative definite if \(\mathbf{x}^T A\mathbf{x}<0\) for all \(\mathbf{x}\neq\mathbf{0}\),  
- indefinite if there exist \(\mathbf{x},\mathbf{y}\) with \(Q(\mathbf{x})>0\) and \(Q(\mathbf{y})<0\).  

These three cases are equivalent, respectively, to all eigenvalues of \(A\) being positive, all negative, or of mixed sign. (Horn & Johnson, *Matrix Analysis*, 2nd ed., §4.2, Theorem 4.2.2.)

## 8. Visual — diagram or schematic
```text
Eigenvalue axis
      +λ
       |     • λ>0  → positive definite (bowl)
       |     
   ----0----→ mixed signs → indefinite (saddle/hyperbolic)
       |     
       |     • λ<0  → negative definite (upside-down bowl)
      -λ
```
The diagram shows the real line of eigenvalues; any point strictly above zero yields a positive-definite form, any point strictly below yields negative-definite, and any configuration containing points on both sides yields indefinite.

## 9. The memory technique
1. **The hook** — Picture a paraboloid bowl sitting upright (positive definite), an upside-down bowl (negative definite), or a saddle-shaped Pringle chip (indefinite); the eigenvalues are the curvatures along the principal axes.  
2. **What to overlearn** — \(Q\) is positive definite ⇔ every eigenvalue >0; the matrix of any quadratic form must be symmetrized.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by completing the square or by computing the characteristic polynomial of the 2-by-2 or 3-by-3 matrix at hand.

## 10. What this unlocks
Mastery of definiteness lets you read the local geometry of any twice-differentiable function from its Hessian and decide stability, convexity, or the existence of constrained extrema.  

- Second-derivative test for functions of several variables  
- Sylvester’s criterion via leading principal minors  
- Cholesky factorization for positive-definite systems  
- Lyapunov stability theory in dynamical systems  
- Convex optimization and interior-point methods  

## 11. Self-check — five questions, no answers
1. Classify the quadratic form \(Q(x,y,z)=x^2+2y^2+3z^2-2xy+4xz\) by computing its eigenvalues.  
2. Give a 3-by-3 symmetric matrix whose quadratic form is indefinite yet has two positive eigenvalues.  
3. Prove that if \(A\) is positive definite then every leading principal submatrix is also positive definite.  
4. Find a quadratic form that vanishes on a line yet is positive elsewhere; explain why it is not called “positive definite.”  
5. A Hessian matrix at a critical point has eigenvalues −1, 2, 2. Describe the local shape of the function and state whether the critical point is a local minimum, maximum, or neither.