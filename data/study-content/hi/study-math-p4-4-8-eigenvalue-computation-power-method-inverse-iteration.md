## 1. The one-sentence answer
**Power method aur inverse iteration dono iterative techniques hain jo matrix ke dominant ya closest eigenvalue aur uske eigenvector ko compute karte hain bina characteristic polynomial solve kiye.**

Power method matrix-vector multiplication ko repeat karta hai taaki largest-magnitude eigenvalue ubhar aaye. Inverse iteration shift aur inverse ko use karke kisi bhi desired eigenvalue ko target karti hai. Dono methods numerical linear algebra mein practical hain kyunki woh sparse matrices par bhi kaam karte hain aur convergence rate eigenvalue gap par depend karti hai.

Yeh techniques tab useful hain jab matrix badi ho aur exact algebraic solution impractical ho. Power method simple hai lekin sirf dominant pair deta hai; inverse iteration flexibility deta hai lekin har step mein linear solve karna padta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki repeated multiplication effectively matrix ke eigenvectors ko unke eigenvalues ke hisaab se scale karti hai, isliye largest |λ| wala direction dominate ho jaata hai.

## 2. Why this matters — concrete and current
Google’s PageRank algorithm originally used a variant of the power method on the web graph’s adjacency matrix to rank billions of pages by dominant eigenvector.

NASA’s structural dynamics simulations for spacecraft like James Webb Space Telescope employ inverse iteration to extract the lowest natural frequencies of large finite-element stiffness matrices.

In semiconductor device modelling, companies like TSMC use shifted inverse iteration inside TCAD tools to find critical eigenvalues of Jacobian matrices that determine stability of transistor operating points.

Modern machine-learning libraries such as scikit-learn’s spectral clustering call ARPACK’s implicitly restarted Arnoldi (a power-method descendant) to compute the few largest eigenvalues of graph Laplacians on datasets with millions of nodes.

Quantum chemistry packages like Gaussian and ORCA apply inverse iteration with shift-and-invert to locate interior eigenvalues of huge Hamiltonian matrices arising from configuration-interaction calculations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Matrix-vector multiplication | Core operation of every iteration in both methods         |
| Vector norm (2-norm)     | Normalisation step that prevents overflow and extracts Rayleigh quotient |
| Eigenvalue definition    | $A\mathbf{v}=\lambda\mathbf{v}$ explains why iteration converges to eigenvector |
| Linear system solve      | Required each step of inverse iteration                   |
| Convergence rate         | Governed by ratio of successive eigenvalues               |

Agar linear solve ya norms weak hain to pehle unhe revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Dominant direction emerges from repeated multiplication
Aap matrix A ko kisi random vector x par baar-baar multiply karte ho. Har multiplication us component ko zyada amplify karti hai jiska eigenvalue bada hota hai.

Example: $A=\begin{pmatrix}3&1\\1&2\end{pmatrix}$, $x_0=\begin{pmatrix}1\\0\end{pmatrix}$  
$A x_0=\begin{pmatrix}3\\1\end{pmatrix}$, $A^2 x_0=\begin{pmatrix}10\\5\end{pmatrix}$, $A^3 x_0=\begin{pmatrix}35\\20\end{pmatrix}$. Direction slowly (3,1) ki taraf badal rahi hai.

Formal statement: let $A\mathbf{x}_0=\sum c_i\mathbf{v}_i$, then $A^k\mathbf{x}_0=\sum c_i\lambda_i^k\mathbf{v}_i$. Agar $|\lambda_1|>|\lambda_j|$ sab j ke liye, to term $\lambda_1^k$ dominate karti hai.

> [!WARNING]
> Agar do eigenvalues ka magnitude exactly barabar ho to iteration oscillate karegi aur converge nahi hogi.

### Step 2 — Normalisation keeps numbers manageable
Har step ke baad vector ko unit norm karte hain. Isse overflow nahi hota aur Rayleigh quotient se eigenvalue estimate milta hai.

### Step 3 — Rayleigh quotient extracts eigenvalue estimate
$\mu_k=\frac{\mathbf{x}_k^T A\mathbf{x}_k}{\mathbf{x}_k^T\mathbf{x}_k}$ current vector se eigenvalue ka best estimate deta hai.

### Step 4 — Inverse iteration adds shift to target any eigenvalue
Agar aap (A−μI) ka inverse multiply karte ho to sabse chhota |λ−μ| wala eigenvalue dominate ho jaata hai.

Formal: let B=(A−μI)^{-1}. Power method on B finds eigenvalue 1/(λ−μ) sabse bada, yani λ sabse kareeb μ ke.

### Step 5 — Convergence criterion and deflation
||Ax−μx||<tol hone par ruk jaate hain. Agar aur eigenvalues chahiye to Hotelling deflation ya subspace iteration extend karte hain.

## 5. Worked examples — har step show karo

**Example 1 — Simple power iteration on 2×2 matrix**  
*Given:* $A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$, $x_0=\begin{pmatrix}1\\1\end{pmatrix}$  
*Find:* dominant eigenvalue after 3 iterations.  
Step 1: $Ax_0=\begin{pmatrix}5\\5\end{pmatrix}$, normalise $x_1=\begin{pmatrix}1/\sqrt{2}\\1/\sqrt{2}\end{pmatrix}$.  
*Why:* multiplication amplifies components.  
Step 2: $Ax_1\approx\begin{pmatrix}3.535\\3.535\end{pmatrix}$, Rayleigh $\mu=4$.  
Final answer **4.0** (exact dominant eigenvalue).  
*Reflection:* yeh matrix symmetric hai isliye convergence tezi se hui.

**Example 2 — Power method with normalisation tracking**  
*Given:* same A, continue till ||x_{k+1}−x_k||<0.01.  
After 5 iterations vector (0.894,0.447) par stabilise hota hai, eigenvalue 4.999.  
*Why:* each normalisation Rayleigh quotient ko update karti hai.

**Example 3 — Inverse iteration for smallest eigenvalue**  
*Given:* A above, μ=2.5, solve (A−2.5I)y=x repeatedly.  
After 4 steps eigenvalue 2.0 milta hai.  
*Why:* shift ne target kiya smallest gap wale eigenvalue ko.

**Example 4 — Shifted inverse with linear solve**  
*Given:* 3×3 matrix, μ=1.0, use LU solve each step.  
Shows how one linear solve per iteration replaces explicit inverse.  
Final answer **1.0** with eigenvector (1,−2,1).  
*Reflection:* practical code mein inverse kabhi nahi banate, sirf solve karte hain.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting normalisation    | Numbers overflow or underflow               | Always divide by current 2-norm              |
| Choosing μ exactly on eigenvalue | Matrix becomes singular                     | Add small random perturbation to shift       |
| Stopping only on eigenvalue change | Eigenvector still rotating                  | Check residual ||Ax−μx|| as well               |
| Ignoring complex eigenvalues | Power method oscillates                     | Use real-imaginary parts or switch to Arnoldi|
| Not orthogonalising multiple vectors | Repeatedly finds same eigenvector           | Use deflation or orthogonalise against known vectors |

## 7. The textbook-precise statement
Trefethen & Bau, *Numerical Linear Algebra*, 1997, Lecture 24: Let A be an n×n diagonalizable matrix with eigenvalues satisfying |λ₁| > |λ₂| ≥ ⋯ ≥ |λₙ|. For almost all starting vectors x₀ the iterates x_{k+1}=Ax_k/‖Ax_k‖₂ converge to a unit eigenvector belonging to λ₁ and the Rayleigh quotients converge to λ₁. For inverse iteration (Lecture 26), if μ is closer to a simple eigenvalue λ_j than to any other eigenvalue, the same iteration applied to (A−μI)^{-1} converges to the eigenvector of λ_j.

## 8. Visual — diagram or schematic
```
x0 ----> A ----> scale ----> x1 ----> A ----> scale ----> x2 ...
          |                               |
          Rayleigh quotient               Rayleigh quotient
          (approx λ1)                     (closer to λ1)
```
Arrow labels show repeated multiplication; each scale box normalises to unit length.

## 9. The memory technique
1. **The hook** — Imagine a crowd of people (eigenvectors) being repeatedly stretched by a rubber sheet (matrix); the tallest person (dominant eigenvector) eventually stands out.
2. **What to overlearn** — Power update x ← Ax/‖Ax‖₂ and Rayleigh quotient μ = xᵀAx.
3. **Spaced-repetition schedule** — Review algorithm 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Start from A v = λ v, divide both sides by λ, iterate; convergence follows from spectral radius argument.

## 10. What this unlocks
- Subspace iteration and Arnoldi/Lanczos methods for multiple eigenvalues.
- Shift-and-invert preconditioning inside GMRES or Jacobi-Davidson.
- Model-order reduction in control theory and vibration analysis.

- QR algorithm with implicit shifts (next standard dense eigensolver).
- Randomized SVD and Nyström methods in large-scale ML.

## 11. Self-check — five questions, no answers
1. Apply two power iterations to diag(5,3) starting from (1,1) and state the Rayleigh quotients.
2. Why does inverse iteration with μ=0 recover the smallest-magnitude eigenvalue?
3. If two eigenvalues have identical magnitude but opposite sign, what happens in power method?
4. Derive the convergence factor |λ₂/λ₁| for power method on a symmetric matrix.
5. In code, how would you detect that your shift μ landed exactly on an eigenvalue?