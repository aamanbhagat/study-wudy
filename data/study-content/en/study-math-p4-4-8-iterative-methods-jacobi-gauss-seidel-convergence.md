## 1. The one-sentence answer

**Iterative methods for linear systems replace direct inversion of \(A\) with repeated application of a simpler splitting \(A = M - N\) that produces a convergent sequence \(x^{(k+1)} = M^{-1}Nx^{(k)} + M^{-1}b\) whenever the spectral radius of the iteration matrix is strictly less than one.**

The underlying idea is fixed-point iteration applied to matrices. Write the equation \(Ax = b\) in the equivalent form \(x = Bx + c\) where \(B\) is constructed so that each new vector is cheap to compute from the previous one. If the map \(x \mapsto Bx + c\) contracts distances, repeated application pulls any starting vector toward the unique fixed point, which is the solution. Both Jacobi and Gauss-Seidel are concrete realizations of this splitting; they differ only in how much of the newest information they reuse at each step.

Convergence is not automatic. The same splitting that produces a simple algorithm can diverge for some matrices and converge for others. The decisive quantity is the spectral radius of \(B\): when it lies inside the unit disk the iterates settle; when it lies outside they grow without bound. This single number therefore separates the cases in which the method is useful from those in which it must be abandoned or preconditioned.

> [!NOTE]
> The decisive insight is that convergence is a property of the iteration matrix alone, independent of the right-hand side; once the matrix \(B\) is fixed, either every initial guess converges or none does.

## 2. Why this matters — concrete and current

Finite-element codes for aircraft structural analysis at Airbus routinely solve systems with several million degrees of freedom arising from discretized elasticity equations; Jacobi and Gauss-Seidel iterations, accelerated by multigrid, remain the inner kernels because they require only sparse matrix-vector products that map efficiently onto distributed memory.

Google’s original PageRank algorithm is exactly the power iteration \(x^{(k+1)} = \alpha Px^{(k)} + (1-\alpha)e\), a Jacobi-style method on a column-stochastic matrix; the same iteration still appears inside modern graph-embedding pipelines at Meta and Twitter when the adjacency matrices exceed RAM.

Semiconductor device simulation packages such as Sentaurus solve coupled drift-diffusion-Poisson systems on three-dimensional grids containing tens of millions of nodes; block Gauss-Seidel sweeps between the continuity and Poisson equations are the default smoother because they preserve positivity and require no matrix factorizations.

Climate models at the UK Met Office discretize the shallow-water equations on icosahedral grids; the resulting pressure-correction step produces a symmetric positive-definite system whose solution is obtained by a Chebyshev-accelerated Jacobi iteration whose convergence rate is known a priori from the eigenvalue bounds of the discrete Laplacian.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Matrix-vector multiplication | The iteration itself is nothing but repeated sparse matvecs |
| Eigenvalues and spectral radius | Convergence is decided exactly by \(\rho(B)<1\)            |
| Vector norms (\(\ell_\infty\), \(\ell_2\)) | Practical stopping criteria and error bounds rely on them |
| Strict diagonal dominance  | The simplest sufficient condition guaranteeing convergence |

## 4. Building the idea — from intuition to formalism

### Step 1 — Split the matrix into “easy” and “hard” parts
Any square matrix \(A\) can be written \(A = M - N\) where \(M\) is chosen to be cheaply invertible (often diagonal or triangular). Solving \(Ax = b\) is then equivalent to solving \(Mx = Nx + b\), or \(x = M^{-1}Nx + M^{-1}b\).  
Example: for the 2-by-2 matrix \(\begin{pmatrix}4&1\\1&3\end{pmatrix}\) take \(M=\operatorname{diag}(4,3)\).  
Formally: \(x = Bx + c\) with \(B=M^{-1}N\) and \(c=M^{-1}b\).  
> [!WARNING] Choosing \(M\) singular or nearly singular destroys the iteration even if \(A\) itself is invertible.

### Step 2 — Iterate the fixed-point relation
Replace the unknown \(x\) on the right by the current guess: \(x^{(k+1)}=Bx^{(k)}+c\). The sequence is completely determined once an initial vector \(x^{(0)}\) is supplied.  
Concrete run on the example above with \(b=(1,1)^\top\) and \(x^{(0)}=(0,0)^\top\) yields the first two iterates \((0.25,0.333)^\top\) and \((0.167,0.222)^\top\).  
Formally the recurrence is \(x^{(k+1)}=B^k x^{(0)}+\sum_{j=0}^{k-1}B^j c\).

### Step 3 — Identify the error propagation operator
Subtract the fixed-point equation from the iteration: \(e^{(k+1)}=Be^{(k)}\) where \(e^{(k)}=x^{(k)}-x^*\). Thus the error after \(k\) steps is exactly \(B^k e^{(0)}\).  
> [!WARNING] If any eigenvalue of \(B\) has modulus greater than one, \(B^k\) grows and the method diverges regardless of how small the initial error is.

### Step 4 — State the convergence criterion
The iteration converges for every initial vector if and only if \(\rho(B)<1\), where \(\rho\) denotes the spectral radius.  
A sufficient (but not necessary) practical test is \(\|B\|<1\) in any matrix norm.

### Step 5 — Specialize to Jacobi and Gauss-Seidel
Jacobi takes \(M=D\) (diagonal of \(A\)). Gauss-Seidel takes \(M=D-L\) (lower triangular part including diagonal). Both produce explicit component-wise formulae that avoid any matrix inversion beyond division by the diagonal entries.

### Step 6 — Derive the textbook convergence theorem
If \(A\) is strictly diagonally dominant, then both the Jacobi and Gauss-Seidel iteration matrices satisfy \(\rho(B)<1\), hence both methods converge.

## 5. Worked examples — every step shown

**Example 1 — Two-by-two diagonally dominant system**  
*Given:* Solve \(\begin{pmatrix}4&1\\1&3\end{pmatrix}x=\begin{pmatrix}1\\1\end{pmatrix}\) by Jacobi.  
*Find:* First three iterates starting from \(x^{(0)}=(0,0)^\top\).  
Step 1: \(x_1^{(k+1)}=(1-x_2^{(k)})/4\).  
*Why* — isolate the first equation using only old values.  
Step 2: \(x_2^{(k+1)}=(1-x_1^{(k)})/3\).  
*Why* — same for the second equation.  
\(x^{(1)}=(0.25,0.333)^\top\), \(x^{(2)}=(0.167,0.250)^\top\), \(x^{(3)}=(0.188,0.278)^\top\).  
**Final answer**  
\((0.188,0.278)^\top\) (after three iterations; true solution \(\approx(0.182,0.273)^\top\)).  
*Reflection* — the method is stable because the matrix is diagonally dominant; the same splitting on a non-dominant matrix would diverge.

**Example 2 — Same system with Gauss-Seidel**  
*Given:* Identical matrix and right-hand side.  
*Find:* First three iterates.  
Step 1: \(x_1^{(k+1)}=(1-x_2^{(k)})/4\).  
*Why* — same as Jacobi.  
Step 2: \(x_2^{(k+1)}=(1-x_1^{(k+1)})/3\).  
*Why* — immediately reuse the newest \(x_1\).  
\(x^{(1)}=(0.250,0.250)^\top\), \(x^{(2)}=(0.188,0.271)^\top\), \(x^{(3)}=(0.182,0.273)^\top\).  
**Final answer**  
\((0.182,0.273)^\top\) (already at machine precision after three steps).  
*Reflection* — Gauss-Seidel re-uses information inside the sweep and therefore converges roughly twice as fast on this matrix.

**Example 3 — Three-by-three system, check spectral radius**  
*Given:* \(A=\begin{pmatrix}3&1&1\\1&3&1\\1&1&3\end{pmatrix}\), \(b=(5,5,5)^\top\).  
*Find:* Whether Jacobi converges.  
Compute iteration matrix \(B=-D^{-1}(L+U)\). Eigenvalues of \(B\) are \(-1/3,-1/3,-2/3\).  
\(\rho(B)=2/3<1\), hence convergence is guaranteed.  
**Final answer**  
Method converges; asymptotic error reduction factor \(2/3\) per iteration.  
*Reflection* — explicit eigenvalue computation replaces the sufficient diagonal-dominance test when the matrix is only weakly dominant.

**Example 4 — Divergent case**  
*Given:* \(A=\begin{pmatrix}1&2\\3&4\end{pmatrix}\).  
*Find:* Behaviour of Jacobi iteration.  
\(B=\begin{pmatrix}0&-2\\-3&0\end{pmatrix}\). Eigenvalues \(\pm\sqrt{6}\), \(\rho(B)>1\).  
Iterates grow without bound from any nonzero start.  
**Final answer**  
Diverges.  
*Reflection* — absence of diagonal dominance correctly predicts failure; the same matrix requires a different splitting or a direct solver.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using the method on a matrix whose spectral radius exceeds one | The sufficient diagonal-dominance test is omitted | Compute or bound \(\rho(B)\) before iterating |
| Stopping solely on \(\|x^{(k+1)}-x^{(k)}\|\) without residual check | The iteration may be converging very slowly | Monitor \(\|Ax^{(k)}-b\|\) in addition to the difference |
| Treating Gauss-Seidel as always faster than Jacobi | Counter-examples exist for non-symmetric matrices | Benchmark both on the concrete matrix |
| Forgetting that the iteration matrix changes when rows are reordered | Gauss-Seidel is ordering-dependent | Fix a consistent ordering or switch to symmetric Gauss-Seidel |
| Applying the methods to dense matrices larger than a few thousand | Cost per iteration becomes \(O(n^2)\) | Use only on sparse or structured matrices |
| Assuming convergence implies accuracy | Round-off can still accumulate | Combine with a few steps of iterative refinement |
| Confusing the spectral radius with the infinity-norm bound | \(\|B\|_\infty<1\) is only sufficient | Use the tighter \(\rho(B)<1\) test when possible |

## 7. The textbook-precise statement

Let \(A\in\mathbb{R}^{n\times n}\) be nonsingular and write \(A=D-L-U\) with \(D\) diagonal and \(L,U\) strictly lower and upper triangular. The Jacobi iteration matrix is \(B_J=D^{-1}(L+U)\); the Gauss-Seidel iteration matrix is \(B_{GS}=(D-L)^{-1}U\). Both methods converge for every initial vector if and only if \(\rho(B)<1\). A sufficient condition is that \(A\) be strictly diagonally dominant: \(|a_{ii}|>\sum_{j\neq i}|a_{ij}|\) for each \(i\). (Quarteroni, Sacco & Saleri, *Numerical Mathematics*, 2e, §4.2, Theorem 4.4.)

## 8. Visual — diagram or schematic

```text
x^{(0)} ----> x^{(1)} ----> x^{(2)} ----> ... ----> x^*  (fixed point)
               |             |             |
               v             v             v
            Bx^{(0)}+c   Bx^{(1)}+c   Bx^{(2)}+c
```
Each arrow multiplies the current error by the iteration matrix \(B\). When all eigenvalues of \(B\) lie inside the unit circle the distance to \(x^*\) shrinks geometrically.

## 9. The memory technique

1. **The hook** — Picture a relay race: Jacobi runners each carry only yesterday’s baton; Gauss-Seidel runners snatch the fresh baton from the teammate who just finished and keep running.
2. **What to overlearn** — The splitting \(A=D-L-U\), the iteration matrices \(B_J\) and \(B_{GS}\), and the single test \(\rho(B)<1\).
3. **Spaced-repetition schedule** — Review the three matrices at 1 day, 3 days, 7 days, 16 days, 35 days; each time recompute \(\rho(B)\) on a fresh 2-by-2 example.
4. **First-principles fallback** — Re-derive the error relation \(e^{(k+1)}=Be^{(k)}\) from \(Ax=b\) by subtracting the fixed-point equation; the spectral-radius claim follows from the Jordan form of \(B\).

## 10. What this unlocks

Mastery of these classical iterations supplies the language and the convergence theory needed for every modern Krylov method and for multigrid smoothing analysis.  

- Successive over-relaxation (SOR) and symmetric SOR  
- Conjugate-gradient and GMRES convergence theory  
- Multigrid restriction and prolongation operators  
- Domain-decomposition preconditioners  
- Preconditioned iterative solvers inside machine-learning optimizers  

## 11. Self-check — five questions, no answers

1. For the matrix \(\begin{pmatrix}2&1.9\\1.9&2\end{pmatrix}\), compute the Jacobi iteration matrix and decide whether \(\rho(B_J)<1\).

2. Starting from \(x^{(0)}=(0,0)^\top\), perform two Gauss-Seidel iterations on the system in Example 2 and compare the residual norm with the Jacobi residual after the same number of sweeps.

3. Construct a 2-by-2 matrix that is not diagonally dominant yet still yields a convergent Gauss-Seidel iteration; verify numerically.

4. Prove that if \(A\) is symmetric positive definite then \(\rho(B_{GS})<1\) (use the energy norm).

5. A code reports that after 100 Jacobi iterations the residual has dropped only by a factor of 0.9. Give the most likely explanation and the cheapest diagnostic that confirms it.