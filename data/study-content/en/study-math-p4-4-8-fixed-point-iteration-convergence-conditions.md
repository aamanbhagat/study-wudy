## 1. The one-sentence answer
**Fixed-point iteration converges locally to a fixed point \(p\) precisely when the iteration function \(g\) satisfies \(|g'(p)| < 1\).**

A fixed-point iteration rewrites an equation \(f(x) = 0\) as \(x = g(x)\) and repeatedly applies the map \(x_{n+1} = g(x_n)\). The sequence either homes in on the fixed point or drifts away, and the decisive local test is the slope of \(g\) at that point. When the absolute slope is smaller than one, successive errors shrink by a factor strictly less than one; when it exceeds one, errors grow.

The same geometric picture appears whether one is solving a scalar nonlinear equation or locating a steady state of a discrete dynamical system. The derivative condition therefore supplies the single, sharp criterion that separates reliable convergence from divergence or oscillation.

> [!NOTE]
> The value \(|g'(p)| = 1\) is the knife-edge case: convergence may still occur, but the test is inconclusive and a finer analysis (higher-order derivatives or global arguments) is required.

## 2. Why this matters — concrete and current
In aerospace trajectory design, NASA’s Copernicus tool converts Lambert’s orbital boundary-value problem into a fixed-point map whose convergence is guaranteed only after the derivative test confirms \(|g'(p)| < 1\) at the arrival-velocity fixed point; an undetected violation has produced divergent iterates on interplanetary transfers.

Semiconductor process simulators such as Synopsys Sentaurus solve the nonlinear Poisson–drift-diffusion system by fixed-point iteration on the electrostatic potential; the convergence monitor explicitly checks the spectral radius of the Jacobian of the iteration map, which is exactly \(|g'(p)|\) in the scalar reduction used for one-dimensional diode models.

Modern neural-network training frameworks occasionally employ fixed-point iterations to solve implicit layers (e.g., Deep Equilibrium Models). Facebook AI Research’s implementation aborts or switches to a Newton solver the moment the estimated Lipschitz constant of the layer map exceeds unity, preventing the training loss from exploding on ImageNet-scale runs.

Global climate models at the UK Met Office linearize the moist-convection parametrization and iterate to equilibrium; the dynamical core logs the maximum \(|g'|\) across grid cells each time step, because values greater than one have been shown to produce spurious grid-scale storms in the HadGEM3 simulations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit of a sequence      | Convergence is defined via \(\lim x_n = p\).              |
| Derivative               | The contraction factor is exactly \(|g'(p)|\).            |
| Mean-value theorem       | It converts the derivative bound into an error inequality.|
| Continuity               | Guarantees that \(|g'(x)|\) stays below 1 in a neighborhood.|

## 4. Building the idea — from intuition to formalism

### Step 1 — A fixed point is an unchanging value under iteration
If a number \(p\) satisfies \(p = g(p)\), feeding it into \(g\) leaves it unchanged.  
Example: \(g(x) = \cos x\) has fixed point \(p \approx 0.739085\).  
Formally, \(p\) is a **fixed point** of \(g\) when  
\[ g(p) = p. \]  
> [!WARNING]  
> Confusing a fixed point of \(g\) with a root of \(f\) leads to writing the wrong iteration function.

### Step 2 — The error after one iteration is governed by the slope
Suppose \(x_n\) is close to \(p\). The vertical distance from the graph of \(g\) to the line \(y = x\) at \(x_n\) determines how much closer (or farther) \(x_{n+1}\) lands.  
Example: if \(g'(p) = 0.5\), an error of \(0.01\) becomes roughly \(0.005\).  
By the definition of the derivative,  
\[ g(x) - g(p) = g'(p)(x - p) + o(x - p). \]  
> [!WARNING]  
> Using the derivative at a point other than \(p\) gives an incorrect contraction factor.

### Step 3 — The mean-value theorem turns the slope into an exact error relation
For \(x\) between \(x_n\) and \(p\) there exists \(\xi\) such that  
\[ g(x_n) - g(p) = g'(\xi)(x_n - p). \]  
Hence the exact error satisfies  
\[ e_{n+1} = g'(\xi) e_n. \]  
> [!WARNING]  
> Omitting the intermediate \(\xi\) makes the subsequent bound appear sharper than it is.

### Step 4 — A uniform bound less than one forces the error to zero
If \(|g'(x)| \le k < 1\) throughout an interval containing all iterates, then  
\[ |e_{n+1}| \le k |e_n|. \]  
Iterating yields  
\[ |e_n| \le k^n |e_0| \to 0 \quad \text{as } n \to \infty. \]  
> [!WARNING]  
> The bound must hold for every iterate; a single excursion outside the interval can destroy convergence.

### Step 5 — The textbook convergence theorem
If \(g\) is continuously differentiable in an open interval containing \(p\), \(g(p) = p\), and \(|g'(p)| < 1\), then there exists a neighborhood of \(p\) such that the iteration converges to \(p\) for every starting value inside that neighborhood.

## 5. Worked examples — every step shown

**Example 1 — Linear contraction**  
*Given:* \(g(x) = \frac12 x + 1\), \(p = 2\).  
*Find:* Does the iteration converge?  
Start with \(x_0 = 2.1\).  
\(x_1 = \frac12(2.1) + 1 = 2.05\) — *Why*: direct substitution.  
Error: \(e_1 = 0.05 = \frac12 \times 0.1\).  
\(x_2 = 2.025\), \(e_2 = 0.025 = \frac12 e_1\).  
Because \(|g'(x)| = \frac12 < 1\) everywhere, errors halve each step and \(\lim x_n = 2\).  
**Answer**  
Converges for any \(x_0\).  
*Reflection*: The constant slope makes the contraction global.

**Example 2 — Quadratic map near the fixed point**  
*Given:* \(g(x) = x^2/3 + 2/3\), \(p = 1\).  
*Find:* Convergence from \(x_0 = 1.2\).  
\(g'(x) = 2x/3\), so \(g'(1) = 2/3 < 1\).  
\(x_1 = g(1.2) = 1.28/3 + 2/3 \approx 1.0933\).  
Error shrinks by factor \(\approx 0.8\) initially.  
Subsequent terms approach 1 monotonically.  
**Answer**  
Sequence converges to 1.  
*Reflection*: Local derivative test suffices even though \(g'\) varies.

**Example 3 — Slope exactly one**  
*Given:* \(g(x) = x - x^3\), \(p = 0\).  
*Find:* Behavior of iterates.  
\(g'(0) = 1\). The test is inconclusive.  
Starting at \(x_0 = 0.1\), \(x_1 = 0.1 - 0.001 = 0.099\), slow drift away.  
**Answer**  
Diverges (albeit slowly).  
*Reflection*: Higher-order terms decide when the first derivative equals one.

**Example 4 — Two fixed points, only one attractive**  
*Given:* \(g(x) = 4x(1-x)\), fixed points 0 and 0.75.  
*Find:* Which attract?  
\(g'(x) = 4-8x\).  
\(g'(0) = 4 > 1\) (repelling).  
\(g'(0.75) = -2\), absolute value 2 > 1 (also repelling).  
Both diverge; logistic map at r=4 is chaotic.  
**Answer**  
No convergence to either fixed point.  
*Reflection*: Checking every fixed point is mandatory.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Checking \(|g'(x_0)|\) instead of \(|g'(p)|\) | Confusing starting slope with limit slope   | Evaluate derivative only after locating \(p\)        |
| Assuming global convergence         | Local theorem gives no basin information    | Verify iterates remain inside the contraction interval |
| Ignoring that \(k\) must be uniform | Using \(|g'(p)|\) alone without continuity  | Invoke continuity of \(g'\) to obtain a neighborhood |
| Forgetting \(g\) must map interval into itself | Iterates escape before contraction acts   | Prove invariance of a closed interval first          |
| Treating \(|g'(p)| = 1\) as convergence | Over-generalizing the strict inequality     | Switch to higher-order tests or global analysis      |
| Numerical differentiation error     | Finite-difference noise near \(p\)          | Use symbolic derivative or tight finite-difference tolerances |
| Multiple roots misidentified        | Same \(p\) for several algebraically different \(g\) | Re-derive \(g\) from \(f\) and re-test each version  |

## 7. The textbook-precise statement
Let \(g:I\to\mathbb{R}\) be continuously differentiable on an open interval \(I\) containing the fixed point \(p\). If \(g(p)=p\) and \(|g'(p)|<1\), then there exists \(\delta>0\) such that the sequence defined by \(x_{n+1}=g(x_n)\) converges to \(p\) whenever \(|x_0-p|<\delta\). (Burden, Faires & Burden, *Numerical Analysis*, 10e, Theorem 2.4.)

## 8. Visual — diagram or schematic
```text
y
↑
|               y = x
|              /
|             /
|            /     g(x)
|           /    .
|          /   .   \     attractive fixed point p
|         /  .       \
|        / .          \
|       /.             \
|      /                \
|-----+-------------------+----→ x
      0                   p
```
The line \(y=x\) intersects the curve \(y=g(x)\) at \(p\). Near \(p\) the curve is flatter than the 45-degree line precisely when \(|g'(p)|<1\), so vertical distances to \(y=x\) shrink at each iteration.

## 9. The memory technique
1. **The hook** — Picture a marble rolling inside a valley whose walls have slope less than 45 degrees; it always settles at the bottom. Slope ≥ 45 degrees and the marble escapes.
2. **What to overlearn** — The single inequality \(|g'(p)|<1\) together with the error relation \(|e_{n+1}|\le k|e_n|\), \(k<1\).
3. **Spaced-repetition schedule** — Review the theorem statement at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the contraction from the mean-value theorem: \(e_{n+1}=g'(\xi)e_n\), then bound \(|g'|\) by continuity.

## 10. What this unlocks
Mastery of the scalar convergence test is the gateway to the Banach fixed-point theorem on complete metric spaces and to the convergence theory of Newton’s method (where \(g'(p)=0\)). It also supplies the spectral-radius condition for linear fixed-point iterations that appear in multigrid solvers and in the analysis of value iteration for discounted Markov decision processes.

## 11. Self-check — five questions, no answers
1. For \(g(x)=\arctan x\), locate the fixed point and decide convergence without computing iterates.  
2. Construct an example where \(|g'(p)|=1\) yet the iteration still converges; prove it.  
3. Given \(f(x)=x^3-x-1\), produce two different fixed-point functions \(g\) and test which (if either) satisfies the convergence condition.  
4. Suppose \(|g'(p)|=0.999\). How many iterations are required to reduce an initial error of \(10^{-2}\) below \(10^{-10}\)?  
5. Identify the subtle flaw in the claim “if \(g\) is a contraction on \(\mathbb{R}\), then every orbit converges.”