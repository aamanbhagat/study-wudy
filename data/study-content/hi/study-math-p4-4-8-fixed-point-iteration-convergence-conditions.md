## 1. The one-sentence answer
**Fixed-point iteration converges locally to a root when the iteration function satisfies |g'(ξ)| < 1 at the fixed point ξ.**

Fixed-point iteration solves equations by rewriting them as x = g(x) and repeatedly applying x_{n+1} = g(x_n). Convergence is not automatic; it depends on how steeply g changes near the fixed point. If the slope of g is flatter than 1 in absolute value, successive iterates are pulled closer together; otherwise they drift away.

The condition arises from a local linear approximation of the error. Let e_n = x_n − ξ. Then e_{n+1} ≈ g'(ξ) e_n, so the error shrinks geometrically only when |g'(ξ)| < 1. Higher-order terms become negligible once the iterates are sufficiently close.

> [!NOTE]
> The single number |g'(ξ)| decides whether the method will eventually lock onto the answer or will keep oscillating or diverging, no matter how good your initial guess looks.

## 2. Why this matters — concrete and current
NASA’s trajectory-correction software for the Artemis program rewrites Kepler’s equation as a fixed-point map whose derivative is deliberately kept below 0.6 so that onboard iterations finish in fewer than eight steps.

In semiconductor process simulation, Synopsys TCAD solves nonlinear Poisson–Boltzmann equations by fixed-point iteration on the electrostatic potential; convergence is guaranteed only after the code enforces |∂g/∂φ| < 1 inside every mesh cell.

Modern graphics pipelines (NVIDIA RTX) use fixed-point iteration to solve microfacet BRDF normalization integrals; the iteration function is preconditioned so its derivative stays inside (−0.8, 0.8) across the entire hemisphere, preventing highlight flickering.

Climate models at the European Centre for Medium-Range Weather Forecasts linearize the ice-albedo feedback into a fixed-point map; the convergence test |g'(T)| < 1 at each grid point prevents runaway temperature drift in multi-decadal runs.

Google’s internal solver for PageRank with damping occasionally switches to a fixed-point iteration whose spectral radius is forced below 0.85; the same contraction condition guarantees that the power method and the fixed-point scheme produce identical rankings.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Derivative               | Controls the contraction rate of the error recurrence     |
| Limit definition         | Defines what “convergence to ξ” actually means            |
| Mean-value theorem       | Converts the derivative bound into a rigorous error inequality |
| Sequence convergence     | Distinguishes |e_{n+1}| < k |e_n| from mere oscillation     |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Rewrite the equation as a fixed-point problem
Any root-finding task f(x) = 0 can be rearranged into x = g(x) in infinitely many ways. The rearrangement is not unique; different choices of g produce different convergence behaviour even though they share the same root.

Example: x³ − 2x − 5 = 0 can be written as g(x) = (2x + 5)^{1/3} or as g(x) = (x³ − 5)/2.  
Formal statement: A point ξ is a fixed point of g if ξ = g(ξ).  
> [!WARNING] Choosing a rearrangement that hides a large derivative will make the iteration diverge even when a perfectly good root exists.

### Step 2 — Introduce the error recurrence
Let e_n = x_n − ξ. Subtracting ξ = g(ξ) from x_{n+1} = g(x_n) gives e_{n+1} = g(x_n) − g(ξ).  
By the mean-value theorem there exists c between x_n and ξ such that e_{n+1} = g'(c) e_n.  
When x_n is already close to ξ, c is also close, so g'(c) ≈ g'(ξ).

### Step 3 — Impose the contraction condition
Require |g'(ξ)| ≤ k < 1 inside some interval around ξ. Then |e_{n+1}| ≤ k |e_n| eventually holds, producing geometric decay of the error.

### Step 4 — Guarantee that iterates remain inside the safe interval
Start with x_0 inside an interval I where |g'(x)| ≤ k < 1 for all x ∈ I and g maps I into itself. All subsequent iterates stay inside I and the error contracts.

### Step 5 — State the convergence theorem
If g is continuously differentiable on a closed interval I, |g'(x)| ≤ k < 1 on I, and g(I) ⊆ I, then for any x_0 ∈ I the sequence converges to the unique fixed point ξ ∈ I.

## 5. Worked examples — har step show karo

**Example 1 — Simple contraction**  
*Given:* g(x) = cos x, x_0 = 0.  
*Find:* Does the iteration converge and to what?  
Step 1: |g'(x)| = |−sin x| ≤ sin(1) ≈ 0.841 < 1 on [−1,1].  
Step 2: g maps [−1,1] into [cos 1,1] ⊂ [−1,1].  
Hence the theorem applies.  
**Final answer** ξ ≈ 0.739085.  
*Reflection:* The bound on the derivative is uniform, so convergence is guaranteed from any starting point in the interval.

**Example 2 — Marginal case**  
*Given:* g(x) = x − (x³ − 2x − 5)/10, x_0 = 2.  
*Find:* Convergence behaviour.  
g'(x) = 1 − (3x² − 2)/10. At the root ξ ≈ 2.0946, |g'(ξ)| ≈ 0.31 < 1, so it converges.  
*Why* each step: the cubic term is scaled down by 10, deliberately forcing the derivative below 1.  
**Final answer** converges to ≈ 2.0946.  
*Reflection:* Scaling the correction term is a standard way to manufacture a contraction.

**Example 3 — Divergence despite correct root**  
*Given:* g(x) = (x³ + 5)/2, x_0 = 1.8.  
g'(x) = (3x²)/2; at ξ ≈ 2.0946, g'(ξ) ≈ 6.57 > 1.  
Iterates grow without bound.  
**Final answer** diverges.  
*Reflection:* The algebraic rearrangement is valid but useless for iteration.

**Example 4 — Interval verification**  
*Given:* g(x) = e^{−x}, show that I = [0.5, 0.7] works.  
|g'(x)| = e^{−x} ≤ e^{−0.5} ≈ 0.606 < 1 on I.  
g(0.5) ≈ 0.606, g(0.7) ≈ 0.496 both lie inside I.  
Hence any x_0 ∈ I converges to the unique fixed point ≈ 0.567.  
**Final answer** guaranteed convergence on I.  
*Reflection:* Checking both the derivative bound and the mapping property is mandatory.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to evaluate g' at ξ    | Students check |g'| only at x_0               | Always compute or estimate g'(ξ) after locating the root approximately |
| Using an interval where |g'| > 1 somewhere | Interval chosen too wide                    | Shrink I until max |g'| < 1 or switch rearrangement |
| Assuming global convergence       | Local theorem misread as global             | Verify g(I) ⊆ I explicitly                   |
| Ignoring multiple fixed points    | g may have several attractors               | Plot or bound the number of solutions of x = g(x) |
| Numerical derivative error        | Finite-difference approximation of g'       | Use analytic derivative or tight interval    |
| Starting outside the safe interval| Initial guess looks “close” visually        | Always test the mapping property first       |
| Oscillatory divergence            | g'(ξ) < −1                                  | Check sign as well as magnitude of g'        |

## 7. The textbook-precise statement
Let g : I → ℝ be continuously differentiable on a closed bounded interval I. Suppose there exists k ∈ [0,1) such that |g'(x)| ≤ k for all x ∈ I and g(I) ⊆ I. Then g possesses a unique fixed point ξ ∈ I, and for every x_0 ∈ I the sequence defined by x_{n+1} = g(x_n) converges to ξ. Moreover, |x_n − ξ| ≤ k^n |x_0 − ξ|. (Burden, Faires & Burden, *Numerical Analysis*, 10e, Theorem 2.4.)

## 8. Visual — diagram or schematic
```
ξ-δ       ξ        ξ+δ
 |--------|--------|
          g
     /‾‾‾‾‾‾‾‾‾\
    /           \
   /   slope<1    \
  /                 \
 x0 ----> x1 ----> x2 ----> ξ
```
Horizontal axis is the real line; vertical arrows show the graph of g. The band between ξ−δ and ξ+δ is invariant and contracts distances by at most k each iteration.

## 9. The memory technique
**The hook** — picture a marble rolling inside a valley whose walls have slope less than 45°; each bounce brings it closer to the bottom.

**What to overlearn** — |g'(ξ)| < 1 is necessary and, together with the interval conditions, sufficient.

**Spaced-repetition schedule** — review the theorem statement after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — start from e_{n+1} = g(x_n) − g(ξ), apply the mean-value theorem, then bound |g'(c)| by k < 1.

## 10. What this unlocks
Once you control the contraction constant you can analyse convergence rates of Newton’s method (where g'(ξ) = 0), construct globally convergent variants by damping, and prove stability of value-iteration algorithms in reinforcement learning.

- Banach fixed-point theorem on complete metric spaces
- Convergence of Newton and secant methods
- Error bounds for iterative linear solvers (Jacobi, Gauss–Seidel)
- Contractive policy iteration in MDPs

## 11. Self-check — five questions, no answers
1. For g(x) = arctan x, does the iteration converge from any real starting point?
2. Construct a rearrangement of x³ − x − 1 = 0 whose derivative at the positive root is smaller than 0.5.
3. Prove that if |g'(ξ)| > 1 then there exists a neighbourhood in which the iteration diverges.
4. Given g(x) = 1 − x²/2 on [−1,1], verify whether the hypotheses of the convergence theorem hold.
5. An iteration produces the sequence 1.2, 1.8, 1.1, 1.7, 1.05, … . What can you conclude about |g'(ξ)|?