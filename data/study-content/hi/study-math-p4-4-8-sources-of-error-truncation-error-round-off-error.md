## 1. The one-sentence answer
**Truncation error** arises when an infinite mathematical process is replaced by a finite approximation, while **round-off error** arises when real numbers are stored and operated upon with finite machine precision.

Truncation error is deterministic and shrinks as you increase the number of terms or steps in your algorithm. Round-off error is stochastic in sign but bounded by machine epsilon; it grows with the number of arithmetic operations and with the condition number of the problem. In any practical numerical computation both errors coexist, and the total error is usually minimised at an intermediate step size or iteration count rather than at the smallest possible value.

The central insight is that these two errors pull in opposite directions: making the truncation error smaller often forces more arithmetic operations and therefore larger round-off error.

> [!NOTE]
> The sweet spot where total error is smallest is never at the theoretical limit of infinite resolution or infinite precision; it is always a compromise dictated by the floating-point format you actually use.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover uses a 7th-order Runge–Kutta integrator for entry-descent-landing trajectory propagation; the integrator step size is deliberately chosen so that local truncation error stays below 10^{-9} while round-off accumulation over 10^5 steps remains below the same threshold.

In training a 175-billion-parameter GPT model, mixed-precision (FP16 + FP32) arithmetic is employed precisely because pure FP16 round-off would destroy gradient magnitudes, while pure FP32 would double memory traffic and halve throughput on NVIDIA A100 GPUs.

Semiconductor foundries simulate quantum-mechanical electron transport with the non-equilibrium Green’s function method; the energy integral is discretised with an adaptive quadrature whose truncation tolerance is set equal to the expected round-off floor of double-precision accumulation (≈ 2 × 10^{-16}).

Modern GPS receivers solve a 4 × 4 nonlinear least-squares problem for position fix; the normal-equation matrix is formed with single-precision arithmetic, and the algorithm switches to double precision only after the truncation error of the linearisation falls below the receiver’s 10 cm accuracy requirement.

High-frequency trading engines compute Black–Scholes implied volatility by Newton iteration; each iteration reduces truncation error quadratically, but after four iterations round-off in the vega denominator begins to dominate, so the loop is forcibly terminated.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Floating-point representation (IEEE 754) | Defines machine epsilon and the largest relative rounding error that can occur in one operation. |
| Taylor theorem with remainder | Supplies the explicit integral or Lagrange form for the truncation error of any polynomial approximation. |
| Condition number of a problem | Quantifies how much an input perturbation (round-off) is amplified in the output. |
| Big-O notation       | Lets you compare the asymptotic decay rates of truncation versus round-off contributions. |

If any of these four items is unfamiliar, pause and review them first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Finite representation forces rounding
Every real number that cannot be written with a finite binary mantissa must be replaced by a nearby floating-point number.  
Example: 1/10 = 0.1_{10} has the infinite binary expansion 0.0001100110011…_{2} and is stored as approximately 0.100000001490116119384765625 in double precision.  
Formally, if \(x\) is a real number inside the normalised range, its floating-point representation satisfies  
\[
fl(x) = x(1 + \delta),\qquad |\delta| \le u,
\]  
where \(u = 2^{-53} \approx 1.11 \times 10^{-16}\) is unit round-off for double precision.

> [!WARNING]
> Treating \(fl(x)\) as exactly equal to \(x\) will later produce an inconsistency between theoretical convergence rates and observed numerical behaviour.

### Step 2 — Arithmetic operations introduce fresh rounding
Addition, multiplication, etc. are performed exactly on the floating-point operands and then rounded again.  
Example: the computed sum satisfies  
\[
fl(a + b) = (a + b)(1 + \delta),\qquad |\delta| \le u.
\]  
This is the model used by all serious rounding-error analyses.

### Step 3 — Truncation replaces an infinite object by a finite one
A classic case is the Taylor expansion of \(e^x\) stopped after \(n\) terms. The remainder term is  
\[
R_n(x) = \frac{e^\xi x^{n+1}}{(n+1)!},\qquad \xi \in (0,x).
\]  
This is pure truncation error; it does not involve rounding.

### Step 4 — Both errors appear together in a concrete algorithm
Consider the forward-difference approximation  
\[
f'(x) \approx \frac{f(x+h) - f(x)}{h}.
\]  
Taylor expansion yields truncation error \(\frac12 f''(\xi)h\). Each function evaluation and each subtraction/division adds round-off of size roughly \(u \cdot |f(x)|/h\). The total error therefore behaves as  
\[
E(h) \approx C h + \frac{K u}{h}.
\]

### Step 5 — Optimal step size balances the two contributions
Differentiating \(E(h)\) and setting the derivative to zero gives the balancing relation  
\[
h_{\text{opt}} \approx \sqrt{\frac{K u}{C}}.
\]  
For double precision and a twice-differentiable function with \(|f''|\approx 1\), \(h_{\text{opt}}\) lies near \(10^{-8}\).

### Step 6 — Textbook-grade statement of the error budget
Let \(T(h)\) be the truncation error and \(R(h)\) the round-off error of a numerical procedure controlled by step-size parameter \(h\). Under standard Lipschitz and boundedness assumptions the total error satisfies  
\[
|E(h)| \le |T(h)| + |R(h)| \le C_1 h^p + C_2 u h^{-q}
\]  
for positive constants \(C_1,C_2,p,q\) that depend on the method but not on \(h\). The minimum of the right-hand side occurs at a finite, strictly positive \(h^*\).

## 5. Worked examples — har step show karo

**Example 1 — Forward difference at a known point**  
*Given:* \(f(x) = \sin x\), \(x = 1\), \(h = 10^{-8}\).  
*Find:* numerical derivative and observed total error.  
Compute \(f(1) = 0.8414709848078965\), \(f(1+h) = 0.8414709927908937\).  
Difference quotient = 0.7982986268.  
True derivative \(\cos(1) = 0.5403023058681398\).  
Absolute error = 0.25799632.  
*Why:* the subtraction cancelled seven significant digits, exposing round-off that is now larger than the truncation term \(O(h)\).  
**Final answer** 0.25799632 (dominated by round-off).

**Example 2 — Same derivative with optimal step**  
Using \(h = 10^{-8}\) again but now with the analytic optimum derived above yields an observed error of \(1.2 \times 10^{-8}\), two orders of magnitude smaller.  
*Reflection:* choosing \(h\) without regard to round-off produces a result worse than the coarsest possible \(h\).

**Example 3 — Series truncation for \(\exp(0.1)\)**  
Truncating after four terms gives truncation error \(\approx 4.17 \times 10^{-9}\). Adding the next term reduces truncation but the accumulated round-off in five additions is already \(\approx 5u \approx 5.5 \times 10^{-16}\).  
**Final answer** 1.105170918 (correct to all shown digits).

**Example 4 — Matrix condition number effect**  
Solving \(Ax = b\) with \(\kappa_2(A) = 10^8\) in double precision loses roughly eight digits to round-off propagation even when truncation (Gaussian elimination without pivoting) is negligible.  
*Reflection:* ill-conditioning multiplies round-off; truncation control alone is insufficient.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(h = \sqrt{\varepsilon}\) indiscriminately for every derivative | Students remember the balancing formula but forget that constants \(C,K\) are problem-dependent | Estimate \(C\) and \(K\) from a few trial values of \(h\) before locking the step size |
| Reporting “error = 0” when \(h < 10^{-16}\) | Round-off has already saturated; further reduction of \(h\) only increases noise | Always plot or tabulate error versus \(h\) on a log-log scale |
| Ignoring that subtraction of nearly equal quantities magnifies relative round-off | Cancellation reduces the number of correct significant digits | Rewrite the expression (e.g., use \(f(x+h)-f(x) = h\cdot f'(x) + O(h^2)\)) or employ compensated arithmetic |
| Treating truncation error as always positive | The Lagrange remainder can change sign; only its magnitude is bounded | Use interval arithmetic or compute two successive approximations to obtain an empirical error sign |
| Forgetting that iterative refinement itself accumulates round-off | Each iteration adds at least one rounding per matrix entry | Limit the number of refinement steps to roughly \(\log_{10}\kappa(A)\) |
| Assuming double precision always gives 16 correct digits | Condition number and cancellation can destroy all digits | Compute an a-posteriori residual \(\|Ax-b\|\) and scale by \(\kappa(A)\) to estimate forward error |

## 7. The textbook-precise statement
In Burden & Faires, *Numerical Analysis*, 10th ed., §1.2, truncation error for a method of order \(p\) is defined by the existence of a constant \(C\) independent of \(h\) such that  
\[
|T(h)| \le C h^p
\]  
for all sufficiently small \(h > 0\). Round-off error is modelled by the floating-point axiom  
\[
fl(x \circ y) = (x \circ y)(1 + \delta),\qquad |\delta| \le u,
\]  
where \(\circ\) denotes any of the four arithmetic operations and \(u\) is unit round-off. The total error of a numerical procedure is therefore bounded by the sum of the two contributions; no smaller bound is possible without additional assumptions on the data or the algorithm.

## 8. Visual — diagram or schematic
```
h (log scale)
   ^
   |                  total error
   |               /\
   |              /  \   <--- minimum here
   |   round-off /    \
   |            /      \ truncation
   |           /        \
   +----------+----------+---> h
          1e-16       1e-4
```
The left branch rises as \(1/h\) (round-off), the right branch falls as \(h\) (truncation). Their intersection is the practical optimum.

## 9. The memory technique

1. **The hook** — Picture a tug-of-war: truncation pulls left (smaller \(h\)), round-off pulls right (larger \(h\)); the rope knot is the optimal step.
2. **What to overlearn** — Double-precision unit round-off \(u \approx 1.11 \times 10^{-16}\); forward-difference total-error model \(E(h) \approx Ch + Ku/h\).
3. **Spaced-repetition schedule** — Review the tug-of-war diagram after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the optimal \(h\) by setting the derivative of \(Ch + Ku/h\) to zero; you recover \(h^* = \sqrt{Ku/C}\).

## 10. What this unlocks
Once you can quantify and balance truncation against round-off you can design reliable adaptive step-size controllers, choose floating-point formats for machine-learning kernels, and certify the accuracy of large-scale simulations.

- Adaptive quadrature and ODE solvers (embedded Runge–Kutta pairs)
- Mixed-precision iterative refinement in dense linear algebra
- Automatic differentiation in reverse mode with floating-point noise analysis
- Verified numerical methods that propagate both truncation and round-off intervals

## 11. Self-check — five questions, no answers
1. For the central-difference formula, derive the optimal step size that minimises the sum of truncation and round-off contributions when \(|f'''|\le M\).
2. A computed inner product of two length-\(n\) vectors in double precision has absolute round-off roughly \(n u \|x\|_2\|y\|_2\). How large must \(n\) be before this term exceeds \(10^{-8}\) for unit vectors?
3. Why does the observed error of a forward-difference derivative first decrease and then increase when \(h\) is successively halved from \(10^{-4}\) to \(10^{-16}\)?
4. In IEEE-754 binary64 arithmetic, what is the smallest positive \(h\) such that \(1+h\) is exactly representable and greater than 1?
5. Suppose the truncation error of a method is \(O(h^4)\) while round-off per step is \(O(u)\). After \(N=1/h\) steps the accumulated round-off is \(O(Nu)\). Find the scaling of total error with \(h\).