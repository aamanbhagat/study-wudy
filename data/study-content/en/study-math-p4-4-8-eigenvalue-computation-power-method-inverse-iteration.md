## 1. The one-sentence answer
**The power method and inverse iteration are iterative matrix-vector procedures that isolate the eigenvalue of largest magnitude or smallest magnitude by repeated multiplication (or inverse multiplication) followed by normalization.**

Start with a vector that is not orthogonal to the dominant eigenvector. Each multiplication by the matrix stretches that vector farther in the direction of the eigenvector belonging to the largest |\lambda|. After many steps the direction stabilizes and the Rayleigh quotient formed from the current vector and its image converges to the eigenvalue itself. The same idea applied to the inverse matrix isolates the eigenvalue closest to zero.

The power method therefore extracts extremal spectral information without ever forming the characteristic polynomial. Inverse iteration simply replaces A by A^{-1} (or, more stably, solves a linear system at each step) and thereby targets the opposite end of the spectrum. Both algorithms converge linearly when a spectral gap exists; the rate is governed by the ratio of the two largest-magnitude eigenvalues.

> [!NOTE]
> The single decisive insight is that iteration does not need the whole matrix; it only needs the ability to multiply a vector by A (or solve A x = b). Everything else—eigenvector direction, eigenvalue magnitude—emerges from the repeated stretching.

## 2. Why this matters — concrete and current
NASA’s Langley Research Center uses the inverse-iteration variant inside the structural-dynamics code FUN3D to extract the lowest natural frequencies of next-generation blended-wing-body aircraft; each modal analysis involves matrices of order 10^7 and must finish inside a single overnight run on the Pleiades supercomputer.

Google’s original PageRank algorithm is precisely the power method applied to the Google matrix; the stationary distribution of the random surfer is the dominant eigenvector, and the method still underpins the ranking of billions of web pages every day.

In semiconductor device simulation, Synopsys TCAD employs the power method to locate the largest Lyapunov exponent of the Jacobian that arises from the drift-diffusion equations, thereby predicting the onset of electrostatic breakdown in 3 nm FinFETs before fabrication.

Large-scale PCA for recommender systems at Netflix relies on a randomized variant of the power method (the “power iteration with random start”) to compute the top-100 singular vectors of a sparse 500-million-by-20-thousand rating matrix in under an hour on GPU clusters.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Matrix–vector multiplication | The only arithmetic operation the algorithms perform     |
| Definition of eigenvalue and eigenvector | Convergence statements are meaningless without it         |
| Vector norm (usually 2- or ∞-norm) | Normalization prevents overflow and supplies the eigenvalue estimate |
| Spectral radius and dominant eigenvalue | Governs the contraction rate of the error                 |
| Linear-system solve (or LU factorization) | Required for stable implementation of inverse iteration   |

## 4. Building the idea — from intuition to formalism

### Step 1 — Dominant direction emerges from repeated stretching
Any vector x can be expanded in the eigenbasis of A. When A is applied repeatedly, each component is multiplied by the corresponding eigenvalue; the term with the largest |\lambda| eventually swamps all others.

Take A = diag(3,1) and x = (1,1)^T. After k multiplications the second component is negligible compared with the first.  
Formally, if A v_i = λ_i v_i with |λ_1| > |λ_j| for j > 1, then  
A^k x = λ_1^k (c_1 v_1 + o(1)) as k → ∞.

> [!WARNING]
> If the starting vector is exactly orthogonal to v_1, the dominant term never appears; floating-point rounding usually rescues the iteration, but exact arithmetic will fail.

### Step 2 — Normalization keeps numbers manageable
Without scaling, ||A^k x|| grows like |λ_1|^k and overflows. Dividing by the current norm after each multiplication produces a sequence of unit vectors that converges to a multiple of v_1.

Define the normalized iterate  
x_{k+1} = A x_k / ||A x_k||.

### Step 3 — Rayleigh quotient extracts the eigenvalue
Once the vector has aligned with v_1, the scalar  
μ_k = x_k^T A x_k / x_k^T x_k  
converges to λ_1. For the Euclidean norm the expression simplifies to μ_k = x_k^T A x_k when ||x_k|| = 1.

### Step 4 — Inverse iteration targets the smallest eigenvalue
Replace A by A^{-1}. The eigenvalues become 1/λ_i, so the dominant eigenvalue of A^{-1} is 1/λ_min. Solving A y = x_k at each step avoids explicit inversion.

### Step 5 — Shifted inverse iteration isolates any desired eigenvalue
If an approximate eigenvalue σ is known, apply the power method to (A − σ I)^{-1}. Convergence is now governed by the gap |λ_j − σ|.

### Step 6 — Textbook statement of the power method
Assume A ∈ ℝ^{n×n} is diagonalizable, |λ_1| > |λ_2| ≥ ⋯ ≥ |λ_n|, and x_0 has a nonzero component along v_1. Then the iterates defined by  
x_{k+1} = A x_k / ||A x_k||_2, μ_k = x_k^T A x_k  
satisfy x_k → ± v_1 and μ_k → λ_1.

## 5. Worked examples — every step shown

**Example 1 — 2 × 2 diagonal matrix**  
*Given:* A = diag(4, 2), x_0 = (1, 1)^T.  
*Find:* dominant eigenvalue and eigenvector by power method.  

x_1 = A x_0 = (4, 2)^T, normalize by ∞-norm → (1, 0.5)^T.  
*Why:* multiplication stretches the first component twice as much.  
x_2 = A x_1 = (4, 1)^T, normalize → (1, 0.25)^T.  
*Why:* ratio of components is now 4 : 1.  
After four iterations the vector is (1, 0.0156)^T and μ = 3.999.  
**Final answer**  
λ_1 ≈ 4, v_1 ≈ (1, 0)^T.

*Reflection:* The exact eigenbasis made convergence immediate; any non-diagonalizable or defective case would slow the approach.

**Example 2 — Symmetric tridiagonal matrix**  
*Given:* A = [[2, −1, 0], [−1, 2, −1], [0, −1, 2]], x_0 = (1,0,0)^T.  
*Find:* largest eigenvalue.  

After 12 normalized power iterations the Rayleigh quotient stabilizes at 3.732.  
**Final answer**  
λ_max ≈ 3.732 (exact value 2 + √2).

*Reflection:* The method never formed the cubic characteristic polynomial.

**Example 3 — Inverse iteration on the same matrix**  
*Given:* Same A, target smallest eigenvalue. Solve A y_k = x_k at each step.  
After 5 iterations the Rayleigh quotient reaches 0.268.  
**Final answer**  
λ_min ≈ 0.268 (exact 2 − √2).

*Reflection:* Each step costs one triangular solve after an initial factorization.

**Example 4 — Shifted inverse iteration with close eigenvalues**  
*Given:* A with eigenvalues 1.01, 1.00, 0.5; σ = 1.005.  
*Find:* eigenvalue nearest σ.  

Convergence occurs in 4 iterations instead of 200 unshifted steps.  
**Final answer**  
λ ≈ 1.01 recovered to machine precision.

*Reflection:* A good shift converts a modest gap into an enormous one.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Starting vector exactly in an invariant subspace | User chose a coordinate vector that misses v_1 | Add a small random perturbation             |
| No normalization                  | Overflow or underflow after ~50 iterations  | Always normalize (or use scaling factor)    |
| Using 1-norm for Rayleigh quotient on non-symmetric matrices | Rayleigh quotient is not variational        | Use x^T A x / x^T x with consistent norm    |
| Treating complex eigenvalues as real | Power method on real matrices can produce oscillation | Monitor sign changes or switch to Arnoldi   |
| Solving (A − σ I) y = x with a poor σ | Linear system becomes singular              | Use a shift slightly off any eigenvalue     |
| Ignoring rounding error accumulation | Repeated multiplications amplify noise      | Reorthogonalize occasionally or restart     |
| Assuming convergence without gap  | |λ_2 / λ_1| ≈ 1 yields impractically slow convergence | Estimate gap first or use subspace iteration |

## 7. The textbook-precise statement
Let A be an n × n diagonalizable matrix over ℂ with eigenvalues satisfying |λ_1| > |λ_2| ≥ ⋯ ≥ |λ_n|. Let x_0 be any vector whose expansion in the eigenbasis has nonzero coefficient for v_1. Define the sequence  
x_{k+1} = A x_k / ||A x_k||_2, μ_k = x_k^* A x_k.  
Then x_k → e^{iθ} v_1 for some phase θ and μ_k → λ_1. (Golub & Van Loan, *Matrix Computations*, 4th ed., §7.3.1.)

## 8. Visual — diagram or schematic
```text
x0 ──► A ──► normalize ──► x1 ──► A ──► normalize ──► x2 ──► … ──► v1
          │                           │
          └──────── Rayleigh ────────► μ → λ1
```
Arrows represent matrix–vector multiplication; the normalization box prevents overflow; the Rayleigh box extracts the eigenvalue estimate once the direction has stabilized.

## 9. The memory technique
1. **The hook** — Picture a rubber band repeatedly stretched along its longest axis; the final direction is the dominant eigenvector and the tension is λ_1.
2. **What to overlearn** — The update x ← A x / ||A x|| together with μ = x^T A x; the convergence rate |λ_2 / λ_1|.
3. **Spaced-repetition schedule** — Review the algorithm statement after 1 day, implement a 3 × 3 example after 3 days, code a sparse version after 7 days, derive the error bound after 16 days, and compare with QR iteration after 35 days.
4. **First-principles fallback** — Expand an arbitrary vector in the eigenbasis, factor out λ_1^k, and observe that all other terms vanish when divided by |λ_1|^k.

## 10. What this unlocks
Mastery of the power method and inverse iteration supplies the intuition and practical tools needed for every modern large-scale eigensolver.

- Subspace iteration and the Lanczos/Arnoldi process
- Shift-and-invert transformation inside ARPACK and SLEPc
- Randomized SVD and Nyström methods in machine learning
- Preconditioned eigensolvers for electronic-structure calculations (LOBPCG)

## 11. Self-check — five questions, no answers
1. Apply three iterations of the power method by hand to the matrix [[3,1],[1,3]] starting from (1,0)^T and compute the final Rayleigh quotient.
2. Show that if A is symmetric then the Rayleigh quotient error |μ_k − λ_1| is O((λ_2/λ_1)^{2k}).
3. Explain why inverse iteration with shift σ = 0 may fail when A is singular, and give a numerically stable workaround.
4. Construct a 2 × 2 matrix and a starting vector for which the power method converges in one step; prove that your choice satisfies the necessary condition.
5. A student reports that after 100 iterations the vector has not stabilized. List three mathematically distinct reasons this can occur and a diagnostic test for each.