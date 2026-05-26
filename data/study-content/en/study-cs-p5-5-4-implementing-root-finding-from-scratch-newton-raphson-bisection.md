## 1. The one-sentence answer
**Root-finding from scratch locates a value \(x^*\) such that \(f(x^*)=0\) for a continuous scalar function \(f\) by repeatedly shrinking an interval (bisection) or following the local linear approximation given by the derivative (Newton-Raphson).**

Bisection works because any continuous function that changes sign between two points must cross zero somewhere inside that interval; each step simply halves the interval at its midpoint and keeps the half that still brackets a sign change. Newton-Raphson instead draws the tangent line at the current guess and jumps to where that tangent crosses the axis, which is usually a much larger step when the function is nearly linear.

The two methods therefore trade guarantees for speed: bisection always converges when a root is bracketed but does so slowly and steadily, while Newton-Raphson converges quadratically near a simple root yet can diverge or cycle if the initial guess or the derivative is poorly behaved.

> [!NOTE]
> The decisive insight is that both algorithms replace an intractable global question (“where is the zero?”) with a sequence of trivial local decisions whose repeated application is guaranteed to approach the answer under clearly stated conditions.

## 2. Why this matters — concrete and current
NASA’s Jet Propulsion Laboratory uses safeguarded Newton-Raphson inside the MONTE navigation software to solve the nonlinear range-rate equations that convert Deep Space Network Doppler measurements into spacecraft trajectories; a single missed root can shift a Mars encounter by hundreds of kilometres.

Semiconductor foundries run bisection on the characteristic curves of FinFET transistors to extract the exact threshold voltage at which subthreshold leakage equals a process-specified limit; the extracted value is fed directly into SPICE model cards that determine whether a 3 nm chip passes qualification.

Modern automatic differentiation frameworks such as JAX and PyTorch implement Newton-style root solves inside their linear solvers for implicit layers; the same code path appears in the equilibrium-finding step of neural ODE training used by climate models at Lawrence Livermore National Laboratory.

High-frequency trading desks solve implied-volatility equations (Black–Scholes formula set equal to a market quote) millions of times per second; a hybrid bisection–Newton solver guarantees both robustness on far-from-the-money options and microsecond latency on at-the-money contracts.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Continuity on a closed interval | Guarantees the intermediate-value theorem that bisection relies upon.                |
| Derivative as slope of tangent | Supplies the linear model that Newton-Raphson follows.                               |
| Absolute versus relative tolerance | Determines when an iterate is “close enough” without wasting iterations.             |
| Floating-point rounding    | Explains why exact equality to zero is almost never observed and why safeguards are required. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A continuous function must cross zero inside a sign-changing interval
If \(f\) is continuous on \([a,b]\) and \(f(a)f(b)<0\), then at least one root lies in \((a,b)\).  
Example: \(f(x)=x^2-2\) on \([1,2]\) changes from negative to positive, so a root exists.  
The formal statement is the intermediate-value theorem:  
\[
\forall\,f\in C[a,b]\quad\bigl(f(a)f(b)<0\bigr)\implies\exists\,c\in(a,b)\text{ with }f(c)=0.
\]
> [!WARNING]  
> If the function is discontinuous, the sign change may occur at a jump and no root exists inside the interval.

### Step 2 — Bisection repeatedly halves the bracket while preserving the sign change
Replace the current interval \([a,b]\) by either \([a,m]\) or \([m,b]\) where \(m=(a+b)/2\), choosing the sub-interval whose endpoints still have opposite signs.  
The length of the interval after \(n\) steps is \((b-a)/2^n\).  
Formal recurrence:  
\[
a_{n+1},b_{n+1}=\begin{cases}
a_n,m_n & \text{if }f(a_n)f(m_n)<0,\\
m_n,b_n & \text{otherwise}.
\end{cases}
\]

### Step 3 — Newton-Raphson follows the tangent line to its axis intercept
At a guess \(x_n\) the tangent line is \(y=f(x_n)+f'(x_n)(x-x_n)\). Setting \(y=0\) and solving for \(x\) yields the next iterate  
\[
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}.
\]
The formula is obtained by a single step of linear extrapolation.

### Step 4 — Local convergence of Newton is quadratic when \(f'(x^*)\ne0\)
Taylor expansion around the root shows the error satisfies  
\[
e_{n+1}\approx\frac{f''(x^*)}{2f'(x^*)}e_n^2,
\]  
so the number of correct digits roughly doubles each iteration once the guess is sufficiently close.

### Step 5 — Safeguarded hybrid algorithms switch between the two methods
When the Newton step would leave the current bracket or produce a non-descent iterate, fall back to bisection on that bracket. The resulting algorithm retains bisection’s global guarantee while achieving Newton’s asymptotic speed.

### Step 6 — Termination uses a mixed absolute/relative tolerance
Stop when either  
\[
|f(x_n)|<\varepsilon_{\text{abs}}\qquad\text{or}\qquad|x_n-x_{n-1}|<\varepsilon_{\text{rel}}|x_n|
\]  
holds, preventing useless iterations once floating-point noise dominates.

## 5. Worked examples — every step shown

**Example 1 — Bisection on a quadratic**  
*Given:* \(f(x)=x^2-2\), interval \([1,2]\), tolerance \(10^{-4}\).  
*Find:* approximation to \(\sqrt{2}\).  

- Midpoint \(m=1.5\), \(f(1.5)=-0.25<0\), so new interval \([1.5,2]\).  
  *Why:* sign change moved to right half.  
- Midpoint \(m=1.75\), \(f(1.75)=1.0625>0\), new interval \([1.5,1.75]\).  
  *Why:* sign change now on left.  
- Continue until interval length \(<10^{-4}\).  

**Final answer**  
\[
1.4142
\]

*Reflection:* The method needed 14 iterations; each step merely tests a sign, illustrating guaranteed but linear convergence.

**Example 2 — Newton-Raphson on the same quadratic**  
*Given:* \(f(x)=x^2-2\), \(f'(x)=2x\), start \(x_0=1\).  
*Find:* root.  

- \(x_1=1-\frac{1-2}{2}=1.5\).  
  *Why:* tangent intercept formula applied once.  
- \(x_2=1.5-\frac{2.25-2}{3}=1.4167\).  
  *Why:* quadratic error reduction visible.  
- \(x_3=1.414215686\).  

**Final answer**  
\[
1.414213562
\]

*Reflection:* Three iterations reached machine precision; the second error is already squared relative to the first.

**Example 3 — Newton step that leaves the bracket**  
*Given:* \(f(x)=\tanh(x)-0.5\), bracket \([0,1]\), guess \(x=0.1\).  
*Find:* safe next iterate.  

Newton proposes \(x\approx-0.3\) (outside bracket).  
Fallback: bisection at midpoint \(0.5\).  

**Final answer**  
Use \(0.5\) and keep bracket \([0.5,1]\).

*Reflection:* Safeguarding prevents divergence even when the local model is poor.

**Example 4 — Mixed tolerance on a flat function**  
*Given:* \(f(x)=x^3-x+10^{-8}\), start near multiple root.  
Newton produces tiny steps that satisfy relative tolerance but not absolute.  

**Final answer**  
Terminate only when both tolerances are met simultaneously.

*Reflection:* The extra absolute check protects against false convergence near plateaus.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Division by zero in Newton        | \(f'(x_n)=0\) at a horizontal tangent               | Test \(|f'(x_n)|>\delta\) before the update; else bisect     |
| Bisection on even-multiplicity root | Sign never changes                                  | Detect \(|f(m)|<\varepsilon\) and switch to derivative test |
| Starting Newton far from root     | Quadratic basin is local                            | Run a few bisection steps first to obtain a safe bracket |
| Using only absolute tolerance     | Large roots appear converged too early              | Always combine with relative tolerance               |
| Ignoring floating-point noise     | \(f(x_n)\) never exactly zero                       | Stop on interval length or change in \(x\), not on \(f=0\) |
| Cycling in Newton on periodic functions | Tangent map has period-2 orbit                      | Add a maximum iteration limit and a bracket safeguard |
| Overly tight tolerance            | Wasted iterations after rounding error dominates    | Set tolerance near \(\sqrt{\varepsilon_{\text{mach}}}\) |

## 7. The textbook-precise statement
Let \(f:[a,b]\to\mathbb{R}\) be continuous with \(f(a)f(b)<0\). The bisection sequence defined by repeated midpoint halving produces a nested sequence of intervals whose lengths tend to zero; by the nested-interval theorem the common intersection point \(x^*\) satisfies \(f(x^*)=0\) (Burden & Faires, *Numerical Analysis*, 10e, §2.1).  

Let \(f\) be twice continuously differentiable in a neighbourhood of a simple root \(x^*\) (\(f(x^*)=0\), \(f'(x^*)\ne0\)). Then there exists \(\delta>0\) such that Newton iteration started inside \((x^*-\delta,x^*+\delta)\) converges quadratically to \(x^*\) (Atkinson, *An Introduction to Numerical Analysis*, 3e, §2.3).  

Hybrid algorithms that accept a Newton step only when it remains inside the current bracket inherit both guarantees (Press et al., *Numerical Recipes*, 3e, §9.4).

## 8. Visual — diagram or schematic
```text
f(x)
 ^
 |   *               root
 |    \     Newton step
 |     \   /
 |      \ /  
 |-------*-------> x
 |      / \
 |     /   \
 |    /     \
 |   /       \
 +---|---|---|-------->
    a   m   b
```
Horizontal axis labelled with current bracket endpoints \(a\), midpoint \(m\), \(b\); vertical line at each shows \(f\) value; dashed line from \((x_n,f(x_n))\) to next Newton estimate illustrates the tangent intercept.

## 9. The memory technique
1. **The hook** — Picture a mountain path (the function) that must cross a river (zero). Bisection is a cautious hiker who always walks to the middle of the current ridge and checks which side still leads downhill to water; Newton is a skier who points skis straight down the tangent slope and shoots to the river in one jump.
2. **What to overlearn** — Bisection length formula \((b-a)/2^n\); Newton update \(x-f/f'\); quadratic error relation \(e_{n+1}\propto e_n^2\).
3. **Spaced-repetition schedule** — Review the three formulas at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Re-derive Newton from the tangent-line equation \(0=f(x_n)+f'(x_n)(x-x_n)\); re-derive bisection length from binary subdivision of an interval.

## 10. What this unlocks
These two building blocks appear inside every production nonlinear solver and supply the foundation for understanding quasi-Newton methods, secant updates, and continuation techniques used in bifurcation analysis.  

- Brent’s method ( safeguarded inverse quadratic interpolation)  
- Trust-region Newton–Krylov solvers in large-scale optimisation  
- Path-following algorithms for nonlinear eigenvalue problems  
- Implicit Runge–Kutta stage equations in stiff ODE integration  

## 11. Self-check — five questions, no answers
1. How many bisection iterations are required to guarantee an interval shorter than \(10^{-12}\) starting from \([0,1]\)?  
2. For \(f(x)=x^3-2x+2\) and initial guess \(x_0=-2\), compute the first two Newton iterates and state whether they converge.  
3. Construct a continuous function and an interval where bisection converges but Newton started at the midpoint diverges.  
4. A Newton iterate lands outside the current bracket; which algorithm should be invoked next and why?  
5. Explain why a tolerance test that only checks \(|f(x_n)|<\varepsilon\) can fail on \(f(x)=x^{100}-10^{-20}\) near its root.