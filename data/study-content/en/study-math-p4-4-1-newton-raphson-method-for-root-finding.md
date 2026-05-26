## 1. The one-sentence answer
**The Newton-Raphson method is an iterative algorithm that approximates a root of \(f(x)=0\) by repeatedly replacing the current guess with the x-intercept of the tangent line to the graph of \(f\) at that guess.**

Start with any reasonable initial guess \(x_0\). Draw the tangent line to \(y=f(x)\) at \(x_0\). That line crosses the x-axis at a new point \(x_1\) that is almost always closer to the true root than \(x_0\) was. Replace \(x_0\) by \(x_1\) and repeat. Each step uses only the function value and its derivative at the current point, so the arithmetic is cheap.

The process converts a hard global problem—locate a number where \(f\) changes sign—into a sequence of easy local linear problems. When the guess is already near the root and \(f'\) is not zero there, the error typically shrinks quadratically: the number of correct digits roughly doubles with every iteration.

> [!NOTE]
> The geometric picture is everything: each iterate is the exact root of the linear function that matches \(f\) and \(f'\) at the previous iterate; the method therefore inherits the local accuracy of the first-order Taylor expansion.

## 2. Why this matters — concrete and current
NASA’s Deep Space Network solves Kepler’s equation \(M=E-e\sin E=0\) millions of times per day to convert mean anomaly to eccentric anomaly for spacecraft trajectories; Newton-Raphson supplies the rapid, high-precision solutions required for real-time navigation.

In semiconductor process simulation, Synopsys TCAD tools repeatedly solve nonlinear drift-diffusion equations whose roots determine carrier concentrations; Newton-Raphson is the inner solver that keeps each bias-point calculation inside the allotted milliseconds.

Modern automatic differentiation frameworks such as JAX and PyTorch use a damped Newton iteration to solve the nonlinear systems that arise when training implicit layers or performing equilibrium propagation; the same code path also appears in interior-point solvers for large-scale convex optimization at Google and Meta.

Quantitative finance desks price American options by solving the early-exercise free-boundary problem via Newton-Raphson on the Black–Scholes PDE residual; a single pricing run may execute tens of thousands of such solves during calibration to the volatility surface.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Derivative as slope      | Supplies the direction of the tangent line                |
| First-order Taylor expansion | Justifies replacing \(f\) locally by its tangent        |
| Continuity of \(f\) and \(f'\) | Guarantees the tangent exists and the iteration is well-defined |
| Limit of a sequence      | Defines what “convergence to the root” means              |

## 4. Building the idea — from intuition to formalism

### Step 1 — Linear approximation at a point
If you already know a number \(a\) that is close to a root, the graph of \(f\) near \(a\) looks almost like its tangent line.  
Example: \(f(x)=x^2-2\), \(a=1.5\), tangent slope \(f'(1.5)=3\).  
The tangent line is \(L(x)=f(a)+f'(a)(x-a)\).  
> [!WARNING] Treating the tangent as globally accurate produces large errors far from \(a\).

### Step 2 — Finding the x-intercept of the tangent
Set \(L(x)=0\) and solve for \(x\):  
\[
x=a-\frac{f(a)}{f'(a)}.
\]
This new value is the exact root of the linear model.  
> [!WARNING] If \(f'(a)=0\) the division fails; the tangent is horizontal and never crosses the x-axis.

### Step 3 — Turning one step into an iteration
Replace the old guess by the new intercept and repeat:  
\[
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}.
\]
Each \(x_n\) is generated from the previous one by the same algebraic rule.  
> [!WARNING] The formula is undefined wherever \(f'(x_n)=0\), even if a root exists nearby.

### Step 4 — Local error analysis
Write the Taylor expansion of \(f\) about \(x_n\):  
\[
f(x_n+e)=f(x_n)+f'(x_n)e+\frac12f''(\xi)e^2.
\]
Setting the left side to zero and solving for \(e\) shows that the error after one Newton step is proportional to \(e^2\).  
> [!WARNING] Quadratic convergence holds only when \(f''\) is bounded and \(f'(x^*)\ne0\) at the root \(x^*\).

### Step 5 — Convergence basin
For a simple root the iteration map \(g(x)=x-f(x)/f'(x)\) satisfies \(g'(x^*)=0\). By the fixed-point theorem there exists a neighborhood around \(x^*\) inside which every starting value converges to \(x^*\).  
> [!WARNING] Outside that neighborhood the sequence may diverge or cycle.

### Step 6 — Textbook statement of the algorithm
Given \(f\) continuously differentiable, \(f'(x_0)\ne0\), and \(x_0\) sufficiently close to a simple root, the sequence defined by
\[
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)},\qquad n=0,1,2,\dots
\]
converges quadratically to that root.

## 5. Worked examples — every step shown

**Example 1 — Square-root extraction**  
*Given:* Solve \(x^2-2=0\), start at \(x_0=1\).  
*Find:* \(x_1\) and \(x_2\).  
\(x_1=1-\frac{1-2}{2\cdot1}=1.5\)  
*Why:* Direct substitution of the iteration formula.  
\(x_2=1.5-\frac{2.25-2}{3}=1.4166\ldots\)  
*Why:* Same rule applied to the new point.  
**1.4166…**

*Reflection:* The arithmetic is elementary yet already halves the error; the pattern continues for any positive initial guess.

**Example 2 — Cubic with one real root**  
*Given:* \(f(x)=x^3-x-1\), \(x_0=1\).  
*Find:* First two iterates.  
\(f(1)= -1\), \(f'(1)=3\), so \(x_1=1-(-1)/3=1.333\ldots\).  
*Why:* Tangent intercept formula.  
\(x_2=1.333-\frac{(1.333)^3-1.333-1}{3(1.333)^2}\approx1.3252\).  
**1.3252**

*Reflection:* Even though the function is cubic, two Newton steps already give four correct decimals.

**Example 3 — Transcendental equation**  
*Given:* \(f(x)=\cos x-x\), \(x_0=0.7\).  
*Find:* \(x_1\).  
\(x_1=0.7-\frac{\cos0.7-0.7}{-\sin0.7-1}\approx0.7391\).  
**0.7391**

*Reflection:* The same algebraic rule works verbatim for any differentiable \(f\), trigonometric or otherwise.

**Example 4 — Multiple root and damping**  
*Given:* \(f(x)=x^2\), start at \(x_0=1\).  
*Find:* Observe behavior.  
The iteration yields \(x_n=0\) after one step, but \(f'(0)=0\) halts further progress.  
*Why:* The root has multiplicity two and \(f'(x^*)=0\).  
**Convergence fails without modification.**

*Reflection:* Newton-Raphson must be altered (e.g., by damping or deflation) when roots are not simple.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Division by zero            | \(f'(x_n)=0\) at some iterate               | Check \(f'\) each step; switch to bisection if needed |
| Divergence from poor start  | Initial guess outside convergence basin     | Plot or bracket the root first               |
| Slow convergence at multiple roots | \(f'(x^*)=0\) makes linear term vanish   | Use modified Newton or Halley’s method       |
| Oscillation between two points | Periodic cycle of the iteration map      | Add a small relaxation factor \(x_{n+1}\leftarrow x_n-\omega f/f'\) |
| Loss of precision in floating point | Subtracting nearly equal quantities     | Use higher-precision arithmetic or analytic \(f'\) |
| Imaginary values for real problems | Negative argument under even root or log | Restrict domain or switch to complex arithmetic |
| Stopping too early          | Error estimate not yet quadratic            | Require two consecutive iterates to agree to desired tolerance |

## 7. The textbook-precise statement
Let \(f\) be continuously differentiable on an open interval containing a simple root \(x^*\) (i.e., \(f(x^*)=0\) and \(f'(x^*)\ne0\)). There exists \(\delta>0\) such that for every initial value \(x_0\) with \(|x_0-x^*|<\delta\) the sequence
\[
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}
\]
is well-defined and converges to \(x^*\) with order two:
\[
\lim_{n\to\infty}\frac{|x_{n+1}-x^*|}{|x_n-x^*|^2}=\frac{|f''(x^*)|}{2|f'(x^*)|}.
\]
(See Stewart, *Calculus*, 9e, §4.9.)

## 8. Visual — diagram or schematic
```text
y
^
|               f(x)
|              /
|   tangent   /
|     \      /
|      \    / 
|       \  /  
|        \/----> x-intercept = x_{n+1}
|        /\
|       /  \
|      /    x_n
|     /      
|    /
|   /
+--|--------------->
   x^*          x_n
```
The vertical line at \(x_n\) meets the curve; the tangent line from that point crosses the x-axis at \(x_{n+1}\), visibly closer to the true root \(x^*\).

## 9. The memory technique
1. **The hook** — Picture a skier racing down a slope: at each instant the skier aims straight along the fall line (the tangent) and instantly corrects toward the valley floor (the root).  
2. **What to overlearn** — The single update rule \(x\leftarrow x-f(x)/f'(x)\) and the fact that error squares at each step when close.  
3. **Spaced-repetition schedule** — Drill the update formula after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the intercept of the tangent line from the point-slope equation \(y-f(a)=f'(a)(x-a)\) set to zero.

## 10. What this unlocks
Newton-Raphson is the prototype for all higher-order root-finding and optimization algorithms that replace the function by a local polynomial model.

- Secant method (derivative-free variant)  
- Halley’s method (cubic convergence)  
- Newton’s method in several variables (Jacobian solve)  
- Interior-point and sequential-quadratic-programming solvers in nonlinear programming  
- Automatic differentiation pipelines that differentiate through iterative solvers

## 11. Self-check — five questions, no answers
1. Apply two Newton iterations to \(f(x)=x^3-3x+1\) starting at \(x_0=1\).  
2. Show that if \(f(x^*)=f'(x^*)=0\) but \(f''(x^*)\ne0\), the plain Newton iteration converges only linearly.  
3. Construct an initial guess for which Newton’s method applied to \(f(x)=\arctan x\) diverges.  
4. Derive the explicit iteration function \(g(x)\) for \(f(x)=e^x-2\) and compute \(g'(x^*)\) at the positive root.  
5. Suppose \(f'(x_n)\) is computed with a small relative error \(\varepsilon\). How does that error propagate into the correction term \(f(x_n)/f'(x_n)\)?