## 1. The one-sentence answer
**Condition number ek scalar hai jo batata hai ki ek mathematical problem kitna sensitive hai input mein chhoti si perturbation ke liye, relative error amplification ko measure karta hai.**

Absolute condition number sirf absolute error ko dekhta hai, jabki relative condition number input aur output dono ki relative errors ko compare karta hai. Iska matlab yeh hai ki agar condition number bada hai to problem ill-conditioned hai aur numerical methods mein chhoti si rounding error bhi output ko completely galat kar sakti hai. University level par hum isko linear systems, root finding aur optimisation problems ke liye formally define karte hain.

> [!NOTE]
> Sabse badi aha yeh hai ki condition number problem ki property hai, algorithm ki nahi — agar problem ill-conditioned hai to koi bhi algorithm usko stable nahi bana sakta.

## 2. Why this matters — concrete and current
NASA ke Kepler telescope data analysis mein matrix inversion steps mein condition number > 10^12 wale systems aate the, jisse planet detection signals completely miss ho jaate the agar relative perturbation 1e-8 bhi hoti.

Google ke PageRank algorithm mein Google matrix ka condition number directly page ranking stability ko control karta hai; 2018 ke ek paper mein dikhaya gaya tha ki 0.85 damping factor par condition number 10^4 ke aas-paas rehta hai, warna rankings flip ho jaate hain.

TSMC aur Intel ke semiconductor process simulation software (TCAD tools) mein Poisson equation discretisation ke liye ill-conditioned stiffness matrices aati hain jinka condition number 10^8–10^10 hota hai, isliye double precision must hai warna doping profile galat calculate hota hai.

Modern neural network training mein (PyTorch/JAX) Hessian matrix ka condition number loss landscape ki sharpness batata hai; large condition number wale models (jaise GPT-2 scale par) gradient descent ko 10x zyada steps lagte hain, isliye Adam optimiser condition-number aware adaptive learning rates use karta hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Norm (vector & matrix) | Condition number norm par depend karta hai; ||A|| aur ||A^{-1}|| dono chahiye |
| Relative vs absolute error | Relative condition number relative error ratio deta hai   |
| Matrix inverse & singularity | Ill-conditioned problems nearly singular matrices se aati hain |
| Floating-point arithmetic | Rounding errors hi woh perturbations hain jo amplify hote hain |

Agar norm aur relative error clear nahi hain to pehle unko revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Absolute condition number as worst-case amplification
Aapko ek function f(x) diya gaya hai. Agar input x mein absolute perturbation δx aaye to output mein δf kitna badal sakta hai, uska maximum factor absolute condition number hai.

Example: f(x) = √x at x = 4. Agar δx = 0.01 to δf ≈ 0.0025, amplification factor 0.25.

Formally, absolute condition number K_abs(f,x) = |f'(x)|.

> [!WARNING]
> Agar derivative zero hai lekin higher-order terms dominate to yeh formula toot jaata hai aur local linearity assumption fail ho jaati hai.

### Step 2 — Relative condition number normalises by magnitudes
Relative version input aur output dono ko unki original values se divide karti hai taaki scale-independent measure mile.

Example: upar wale √x case mein relative error ratio (δf/f) / (δx/x) = (x f'(x))/f(x) = 0.5 hota hai.

Formally, relative condition number κ(f,x) = |x f'(x)/f(x)|.

### Step 3 — Matrix case via operator norm
Linear system Ax = b ke liye perturbation δb aane par δx = A^{-1} δb hota hai. Maximum amplification ||A^{-1}|| deta hai.

Relative form: (||δx||/||x||) ≤ κ(A) (||δb||/||b||) jahaan κ(A) = ||A||·||A^{-1}||.

### Step 4 — Ill-conditioned problems definition
Agar κ(A) >> 1 (typically > 10^4 double precision mein) to problem ill-conditioned maana jaata hai kyunki chhoti si relative perturbation bhi output ko order-1 error de sakti hai.

### Step 5 — Condition number of a matrix problem
Textbook definition: κ(A) = ||A||_p ||A^{-1}||_p for any induced p-norm. 2-norm case mein yeh largest aur smallest singular values ka ratio hota hai.

## 5. Worked examples — har step show karo

**Example 1 — Scalar function relative condition**
*Given:* f(x) = x^2 at x = 3, δx = 0.001.
*Find:* relative condition number and output relative error bound.
Step: κ(f,x) = |x f'(x)/f(x)| = |3·6|/9 = 2.
*Why:* Formula directly relative error amplification deta hai.
Step: Bound = κ·(|δx|/|x|) = 2·(0.001/3) ≈ 0.000667.
**Final answer: 0.000667**
*Reflection:* Simple power function par condition number exponent ke barabar aata hai, general power rule ka special case.

**Example 2 — 2×2 matrix condition number**
*Given:* A = [[1, 1], [1, 1.0001]], 1-norm.
*Find:* κ_1(A).
Step: ||A||_1 = max column sum = 2.0001.
Step: det(A) = 0.0001, A^{-1} = [[10001, -10000], [-10000, 10000]].
Step: ||A^{-1}||_1 = 20001.
*Why:* Inverse calculate karke norm lena zaroori hai.
**Final answer: κ_1(A) ≈ 40003**
*Reflection:* Almost singular matrix ka condition number 10^4 order ka nikla, typical ill-conditioned case.

**Example 3 — Perturbed linear system**
*Given:* Ax = b with A above, b = [2, 2.0001]^T, δb = [1e-6, 0]^T.
*Find:* actual relative error vs bound.
Step: True x = [1, 1]^T.
Step: Perturbed solution x+δx ≈ [1.00001, 0.99999]^T.
Step: Actual rel error ≈ 10^{-5}, bound = κ·(||δb||/||b||) ≈ 0.02.
*Why:* Bound tight nahi hota lekin order sahi deta hai.
**Final answer: actual rel error 1e-5**
*Reflection:* Ill-conditioned systems mein bound conservative hota hai lekin warning deta hai.

**Example 4 — Hilbert matrix (escalating)**
*Given:* 5×5 Hilbert matrix H, 2-norm.
*Find:* approximate κ_2(H).
Step: Singular values known: σ_max ≈ 1.567, σ_min ≈ 3.5e-7.
Step: κ_2 = σ_max/σ_min ≈ 4.76×10^5.
*Why:* Hilbert matrix classic ill-conditioned example hai.
**Final answer: ≈ 4.76e5**
*Reflection:* Size badhane par condition number exponentially badhta hai.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using determinant alone to judge conditioning | det(A) small ho sakta hai lekin scaling se aata hai | Always compute κ = ||A||·||A^{-1}|| |
| Forgetting to normalise by ||b|| in relative error | Students absolute δb ko directly compare karte hain | Relative perturbation ||δb||/||b|| use karo |
| Choosing wrong norm | 1-norm aur 2-norm values alag hoti hain | Problem ke hisaab se consistent norm fix karo |
| Ignoring that κ depends on x in nonlinear case | Linear thinking carry over karte hain | Point-wise κ(f,x) evaluate karo |
| Assuming large κ means no solution exists | Ill-conditioned ≠ singular | Check rank separately, κ only sensitivity batata hai |
| Using single-precision for κ > 1e7 | Rounding error 1e-7 se bada ho jaata hai | Double ya higher precision choose karo |

## 7. The textbook-precise statement
Let f : D ⊂ ℝ^n → ℝ^m be continuously differentiable. The absolute condition number of f at an interior point x ∈ D is defined as  
K_abs(f,x) := lim_{ε→0} sup_{0<||δx||≤ε} ||f(x+δx)−f(x)|| / ||δx|| = ||Df(x)||,  
where ||·|| denotes any vector norm and the induced operator norm on the Jacobian.  
The relative condition number is  
κ(f,x) := lim_{ε→0} sup_{0<||δx||≤ε} (||f(x+δx)−f(x)||/||f(x)||) / (||δx||/||x||) = ||Df(x)|| · ||x|| / ||f(x)||,  
provided f(x) ≠ 0 and x ≠ 0.  
For the linear system Ax = b with A ∈ ℝ^{n×n} nonsingular, the matrix condition number in a subordinate matrix norm is κ(A) := ||A||·||A^{-1}||.  
A problem is called ill-conditioned when κ ≫ 1.  
(Source: Higham, *Accuracy and Stability of Numerical Algorithms*, 2e, §1.5 and §14.1.)

## 8. Visual — diagram or schematic
```text
Input x ──[small δx]──▶ f(x) ──▶ Output
          │                           │
          ▼                           ▼
     |δx| / |x|              |δf| / |f|
          │                           │
          └─────[κ]────▶ amplification factor
```
Diagram shows relative perturbation flow through the condition number multiplier.

## 9. The memory technique
1. **The hook** — Imagine a microphone (problem) standing on a wobbly table (ill-conditioned); even a tiny tap (rounding error) makes huge sound distortion (output error).
2. **What to overlearn** — κ(A) = ||A||·||A^{-1}|| and κ(f,x) = |x f'(x)/f(x)| for scalars.
3. **Spaced-repetition schedule** — Review definitions after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Derivative definition se limit leke relative error ratio derive kar lo.

## 10. What this unlocks
Condition number aage ke numerical stability analysis, backward error analysis aur algorithm selection (pivotting, preconditioning) ki foundation hai.

- Preconditioning techniques for linear solvers
- Backward stability proofs (Wilkinson)
- Adaptive precision arithmetic decisions
- Sensitivity analysis in optimisation (Hessian conditioning)

## 11. Self-check — five questions, no answers
1. Compute relative condition number of f(x) = e^x at x = 0.
2. For A = [[1, 1e8], [1e8, 1]], find κ_∞(A) and decide if ill-conditioned.
3. A linear system has κ = 10^12; if input relative error is 10^{-16}, what is worst-case output relative error?
4. Why can a matrix with very small determinant still be well-conditioned?
5. In the Hilbert matrix example, if we increase size from 5×5 to 10×10, qualitatively what happens to κ_2?