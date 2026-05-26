## 1. The one-sentence answer
**Iterative methods like Jacobi and Gauss-Seidel solve large linear systems Ax = b by repeatedly refining an initial guess until the updates become negligible, with convergence guaranteed only when the spectral radius of the iteration matrix is strictly less than one.**

These methods replace direct solvers such as Gaussian elimination when the matrix is sparse and huge, which is common in university-level numerical work. You start with any reasonable vector x^(0), then generate a sequence x^(k) whose limit satisfies the original equation if the process settles. The difference between Jacobi and Gauss-Seidel lies only in whether you use the newest values immediately or wait until the whole vector is updated.

The convergence question is decided entirely by the eigenvalues of a derived matrix; if any of them has magnitude 1 or larger, the iterates diverge no matter how small the residual looks at first.

> [!NOTE]
> The single deepest insight is that convergence is a property of the matrix splitting, not of how close your first guess happens to be; a bad splitting will diverge from every starting point except the exact solution itself.

## 2. Why this matters — concrete and current
NASA’s finite-element models of next-generation reusable rockets use Gauss-Seidel smoothing inside multigrid solvers to handle the 10-million-degree-of-freedom structural matrices that arise from carbon-composite tanks; each outer iteration re-uses the previous time-step solution as the initial vector, cutting wall-clock time by roughly 40 percent compared with restarted GMRES.

In semiconductor TCAD tools such as Synopsys Sentaurus, the Poisson–drift-diffusion system on a 3-D device mesh is solved by a block-Jacobi iteration whose diagonal blocks are factored once and reused across bias points; the method converges because the mesh is diagonally dominant after proper scaling of the electrostatic potential.

Modern graph neural networks trained on billion-edge social graphs employ a Jacobi-style message-passing layer whose fixed-point iteration is unrolled for a fixed number of steps; convergence analysis of the underlying iteration matrix tells engineers whether adding more layers will stabilize or oscillate.

Climate models at the European Centre for Medium-Range Weather Forecasts solve the semi-implicit discretization of the shallow-water equations with a Gauss-Seidel sweep over latitude bands; the spectral-radius test performed at compile time guarantees that the chosen time step keeps the iteration contractive.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Matrix–vector multiplication | Every iteration is exactly one sparse matvec plus a diagonal scaling |
| Eigenvalues and spectral radius | Convergence criterion is ρ(B) < 1 where B is the iteration matrix |
| Vector norms (∞-norm easiest) | Termination tests and error bounds are stated in a chosen norm |
| Diagonal dominance       | A sufficient (but not necessary) condition that guarantees ρ(B) < 1 |
| Fixed-point iteration    | Both methods are instances of x = Gx + c; the same contraction-mapping ideas apply |

If any row is missing, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Split the matrix into diagonal and off-diagonal pieces
Write A = D − L − U where D holds the diagonal entries, −L the strictly lower triangular part, and −U the strictly upper triangular part. This algebraic split is always possible for any square matrix with nonzero diagonal.

Take the 2 × 2 system whose matrix is [[2, −1], [−1, 2]]. Then D = diag(2,2), L = [[0,0],[1,0]], U = [[0,1],[0,0]].

Formally,
$$
A = D - L - U.
$$

> [!WARNING]
> If any diagonal entry is zero you must reorder equations first; otherwise the iteration matrices are undefined.

### Step 2 — Derive the Jacobi iteration matrix
Replace Ax = b by Dx = (L + U)x + b and solve for the new iterate using only old values:
$$
x^{(k+1)} = D^{-1}(L + U)x^{(k)} + D^{-1}b.
$$
The iteration matrix is therefore B_J = D^{-1}(L + U).

For the same 2 × 2 example, B_J = [[0, 1/2], [1/2, 0]] whose eigenvalues are ±1/2, so ρ(B_J) = 1/2 < 1 and Jacobi converges.

### Step 3 — Derive the Gauss-Seidel iteration matrix
Now use newest values immediately, which replaces the lower triangle as well:
$$
(D - L)x^{(k+1)} = Ux^{(k)} + b,
$$
so the iteration matrix is B_GS = (D − L)^{-1}U.

In the example, B_GS = [[0, 1/2], [0, 1/4]] and ρ(B_GS) = 1/4 < 1/2, showing faster asymptotic convergence.

### Step 4 — State the necessary and sufficient convergence criterion
The sequence x^(k) converges to the unique solution for every initial vector if and only if the spectral radius of the iteration matrix satisfies ρ(B) < 1. This follows directly from writing the error recurrence e^(k+1) = B e^(k) and taking the Jordan form of B.

### Step 5 — Give a practical sufficient condition
If A is strictly diagonally dominant,
$$
|a_{ii}| > \sum_{j\neq i}|a_{ij}| \quad\text{for all }i,
$$
then both ρ(B_J) < 1 and ρ(B_GS) < 1. The proof uses the infinity norm: ||B_J||_∞ < 1 implies ρ(B_J) ≤ ||B_J||_∞ < 1.

## 5. Worked examples — har step show karo

**Example 1 — 2 × 2 diagonally dominant system**
*Given:* Solve
$$
\begin{cases}
4x_1 - x_2 = 2 \\
-x_1 + 4x_2 = 6
\end{cases}
$$
with x^(0) = (0,0)^T using Jacobi.
*Find:* x^(3) and the exact solution.
Step 1: D = diag(4,4), L+U = [[0,1],[1,0]].  
*Why:* This isolates the diagonal scaling.  
Step 2: x1^(1) = (2 + 0)/4 = 0.5, x2^(1) = (6 + 0)/4 = 1.5.  
*Why:* Apply the Jacobi formula directly.  
Step 3: Continue two more iterations to obtain x^(3) ≈ (0.71875, 1.71875).  
**Final answer**  
Exact solution (1,2)^T; after three iterations the vector is already within 0.3 of truth.

*Reflection:* The example is easy because diagonal dominance is obvious; the same arithmetic scales unchanged to sparse matrices stored in CSR format.

**Example 2 — Same system with Gauss-Seidel**
*Given:* Same 2 × 2 system, same initial vector.  
*Find:* x^(3).  
Step 1: First component identical to Jacobi: x1^(1) = 0.5.  
*Why:* Lower triangle is still zero at first step.  
Step 2: Second component now uses new x1: x2^(1) = (6 + 0.5)/4 = 1.625.  
*Why:* Immediate reuse is the only algorithmic difference.  
After three iterations the error is already smaller than Jacobi’s by roughly a factor of two.

**Final answer**  
x^(3) ≈ (0.875, 1.96875).

*Reflection:* Gauss-Seidel extracts extra information from each sweep without extra matrix storage.

**Example 3 — Detect divergence**
*Given:* Matrix [[1,2],[3,1]], b = (3,4)^T.  
*Find:* Does Jacobi converge?  
Compute B_J = [[0,−2],[−3,0]]. Eigenvalues satisfy λ² = 6, so |λ| = √6 > 1.  
**Final answer**  
ρ(B_J) > 1 ⇒ Jacobi diverges from every starting vector except the solution itself.

*Reflection:* Always compute or bound the spectral radius before running thousands of iterations on a large problem.

**Example 4 — Convergence test on a 3 × 3 matrix**
*Given:* A tridiagonal matrix with 4 on diagonal and −1 on off-diagonals.  
*Find:* Verify ρ(B_GS) < 1.  
The eigenvalues of B_GS are known analytically: λ_m = cos²( mπ/(2n+2) ), all < 1 for n = 3.  
**Final answer**  
ρ < 1, hence Gauss-Seidel converges.

*Reflection:* Analytic spectral-radius formulas exist only for very special matrices; in practice you estimate it by power iteration on B.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using zero diagonal entries without pivoting | Code assumes D is invertible                | Check diag(A) before splitting               |
| Stopping when residual is small but error is not | Residual can be small while error is large if cond(A) ≫ 1 | Monitor ||x^(k+1)−x^(k)|| instead of ||Ax−b|| alone |
| Declaring convergence after fixed 100 iterations | No mathematical guarantee that 100 steps suffice | Run until ||e^(k)|| drops below tolerance or ρ(B) test fails |
| Forgetting that Gauss-Seidel needs sequential access | Parallel code applies old values everywhere | Use colouring or asynchronous variants only after convergence theory is re-proven |
| Applying the methods to indefinite matrices without checking | Diagonal dominance fails                    | Compute Gershgorin disks or a cheap norm estimate of B first |
| Storing full matrices instead of sparse diagonals | Memory explosion on million-row problems    | Keep only the three vectors D, L, U          |

## 7. The textbook-precise statement
Let A = D − L − U be a splitting with D nonsingular. The Jacobi iteration is x^(k+1) = D^{-1}(L+U)x^(k) + D^{-1}b. The Gauss-Seidel iteration is x^(k+1) = (D−L)^{-1}Ux^(k) + (D−L)^{-1}b. Both sequences converge to the unique solution of Ax = b for every initial vector x^(0) if and only if the spectral radius of the respective iteration matrix is strictly less than one (Theorem 4.5, Burden & Faires, Numerical Analysis, 10e, §4.2).

## 8. Visual — diagram or schematic
```
x2
 ^
 |          *  (old Jacobi point)
 |         /
 |        /   GS moves here first
 |       *-----------------> new GS point
 |      /
 |     /
 +-------------------------> x1
```
The diagram shows one iteration: Jacobi lands at the intersection of the two old horizontal/vertical lines; Gauss-Seidel immediately slides along the newest row to a point closer to the true intersection (marked by the star).

## 9. The memory technique

1. **The hook** — Picture two painters repainting a long wall: Jacobi waits until both finish their current pass before either starts the next; Gauss-Seidel starts using fresh paint the moment the other painter hands it over. The second painter finishes sooner.
2. **What to overlearn** — ρ(B) < 1 is necessary and sufficient; ||B||_∞ < 1 is an easy sufficient test; Gauss-Seidel’s asymptotic constant is usually the square of Jacobi’s for the same matrix.
3. **Spaced-repetition schedule** — Review the spectral-radius definition after 1 day, the two iteration matrices after 3 days, a worked 3 × 3 example after 7 days, and the divergence counter-example after 16 days.
4. **First-principles fallback** — If you forget the formulas, return to Ax = b, move every off-diagonal term to the right-hand side, divide by the diagonal, and decide whether the right-hand side is evaluated with old or mixed values.

## 10. What this unlocks
Mastery of these classical splittings lets you analyse modern Krylov accelerators (GMRES, BiCGSTAB) because each of them is built on top of a similar matrix splitting. You will also recognise the same contraction-mapping argument when you meet value iteration in reinforcement learning and multigrid smoothers in computational fluid dynamics.

- Successive Over-Relaxation (SOR) with optimal ω
- Convergence theory of stationary iterative methods in operator form
- Preconditioner construction for conjugate-gradient-type algorithms

## 11. Self-check — five questions, no answers
1. For the matrix [[2,−1],[−1,2]], compute ρ(B_J) and ρ(B_GS) exactly.
2. Construct a 2 × 2 matrix that is not diagonally dominant yet still yields a convergent Jacobi iteration.
3. Show that if Gauss-Seidel converges then Jacobi also converges (for the same matrix).
4. In the infinity norm, prove that strict diagonal dominance forces ||B_J||_∞ < 1.
5. Given a large sparse matrix stored in CSR format, write the exact arithmetic operations needed for one Gauss-Seidel sweep without ever forming L or U explicitly.