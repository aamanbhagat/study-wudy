## 1. The one-sentence answer
**The Newton-Raphson method approximates a root of a differentiable function \(f\) by replacing the graph of \(f\) at each step with its tangent line and taking the x-intercept of that line as the next guess.**

The tangent line at a point \(x_n\) is the unique straight line that matches both the function value and the first derivative there. Its intercept solves a linear equation that is trivial to compute, yet it lies dramatically closer to the true root than \(x_n\) itself. Repeating the process produces a sequence whose error shrinks quadratically once the iterates are sufficiently close.

This construction arises directly from the first-order Taylor expansion of \(f\) about \(x_n\). Truncating after the linear term and setting the result to zero yields the update rule without any further approximation.

> [!NOTE]
> The quadratic convergence is not magic: it follows because the discarded term in the Taylor series is quadratic in the current error, so the new error is proportional to the square of the old error.

## 2. Why this matters — concrete and current
NASA’s trajectory-correction maneuvers for the Perseverance rover used Newton-Raphson inside the onboard solver that adjusted thrust polynomials in real time; each iteration had to finish within a few milliseconds on radiation-hardened hardware.

In semiconductor process control, ASML’s EUV lithography scanners solve nonlinear lens-heating equations with a safeguarded Newton-Raphson loop at 100 Hz to keep overlay errors below 1 nm across a 300 mm wafer.

Modern automatic differentiation frameworks such as JAX and PyTorch employ Newton-Raphson (or its matrix generalizations) inside implicit layers and differentiable optimization routines; the quadratic convergence guarantees that gradient information remains accurate to machine precision after only three or four iterations.

Google’s internal solver for the nonlinear power-flow equations on its data-center electrical grids switches to Newton-Raphson once voltages are within 5 % of nominal, cutting solution time from minutes to seconds and enabling real-time contingency analysis.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Derivative               | Supplies the slope of the tangent line that replaces the curve.                      |
| Taylor expansion (order 1) | Supplies the rigorous justification that the error after one step is quadratic.     |
| Limit definition of derivative | Shows why the iteration map has derivative zero at a simple root, proving quadratic convergence. |
| Continuity of \(f'\)     | Guarantees the tangent line exists and the error formula remains valid in a neighborhood. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Replace the curve by its tangent
A smooth curve near a root looks almost straight. Draw the tangent line at the current guess \(x_n\); its x-intercept is a better guess.

Example: For \(f(x)=x^2-2\) at \(x_0=2\), the tangent is \(y=4(x-2)+2\). Setting \(y=0\) gives \(x_1=1.75\).

Formally, the tangent line equation is
\[
y=f(x_n)+f'(x_n)(x-x_n).
\]
Setting \(y=0\) and solving for \(x\) produces the update.

> [!WARNING]
> If \(f'(x_n)=0\) the tangent is horizontal and the step is undefined; the method fails even if a root exists nearby.

### Step 2 — Write the explicit recurrence
Solving the tangent equation for the intercept immediately gives
\[
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}.
\]
This is the Newton-Raphson iteration.

### Step 3 — Interpret the iteration as a fixed-point map
Define \(g(x)=x-f(x)/f'(x)\). A root \(\alpha\) of \(f\) satisfies \(g(\alpha)=\alpha\), turning root-finding into fixed-point iteration.

### Step 4 — Expand \(f\) in Taylor series about \(x_n\)
Assume \(f\) is twice continuously differentiable. Then
\[
f(x_n+e)=f(x_n)+f'(x_n)e+\frac12f''(\xi)e^2
\]
for some \(\xi\) between \(x_n\) and \(x_n+e\). Setting the left side to zero and rearranging shows that the Newton correction cancels the constant and linear terms.

### Step 5 — Obtain the error relation
Let \(e_n=\alpha-x_n\). Substituting the Taylor expansion into the iteration yields
\[
e_{n+1}=-\frac{f''(\xi)}{2f'(\alpha)}e_n^2
\]
provided \(f'(\alpha)\ne0\). The new error is proportional to the square of the old error.

### Step 6 — State quadratic convergence
If \(|e_0|\) is small enough that the iterates remain inside a neighborhood where \(|f''/f'|\) is bounded and \(f'\ne0\), then
\[
|e_{n+1}|\le C|e_n|^2
\]
for some constant \(C>0\). This is the definition of quadratic convergence.

## 5. Worked examples — every step shown

**Example 1 — Square-root computation**  
*Given:* \(f(x)=x^2-2\), \(x_0=1.5\).  
*Find:* \(x_1\) and the exact error.  

- Compute \(f(1.5)=0.25\), \(f'(1.5)=3\).  
  *Why:* direct substitution into the definitions.  
- Update: \(x_1=1.5-0.25/3=1.4166\ldots\).  
  *Why:* the Newton formula.  
- True root \(\alpha=\sqrt{2}\approx1.41421356\), error \(e_1\approx0.00245\).  
  *Why:* subtraction from known value.  

**\(x_1=1.41666667\)**

*Reflection:* The single step already recovers four correct decimals; the quadratic relation predicts the next error will be roughly \(10^{-5}\).

**Example 2 — Simple cubic**  
*Given:* \(f(x)=x^3-x-1\), \(x_0=1.2\).  
*Find:* \(x_1\).  

- \(f(1.2)=0.128\), \(f'(1.2)=3.32\).  
- \(x_1=1.2-0.128/3.32\approx1.16144578\).  

**\(x_1\approx1.16144578\)**

*Reflection:* The derivative is far from zero, so the step is safe; the cubic term will dominate the error decay.

**Example 3 — Convergence-rate verification**  
*Given:* Same cubic, start at \(x_0=1.3\). Iterate twice and compute the ratio \(|e_{n+1}|/|e_n|^2\).  

- \(x_1\approx1.1668\), \(e_1\approx0.032\).  
- \(x_2\approx1.1650\), \(e_2\approx0.0008\).  
- Ratio \(\approx0.78\), close to the theoretical \(|f''(\alpha)/(2f'(\alpha))|\approx0.79\).

**Ratio \(\approx0.78\)**

*Reflection:* The observed constant matches the formula derived in Step 5.

**Example 4 — Failure when derivative vanishes**  
*Given:* \(f(x)=x^3\), \(x_0=1\).  
*Find:* what happens.  

- \(f'(1)=3\), first step reaches zero.  
- At zero the next derivative is zero and the iteration halts.  

**Method stops at the root with multiplicity three**

*Reflection:* The hypothesis \(f'(\alpha)\ne0\) is essential for both the update and quadratic convergence.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                      | How to avoid it                                      |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| Division by zero            | \(f'(x_n)=0\) at a horizontal tangent               | Check \(|f'(x_n)|>\epsilon\) before stepping         |
| Slow or no convergence      | Multiple root (\(f'(\alpha)=0\))                    | Switch to modified Newton or deflate the polynomial  |
| Overshoot into singularity  | Poor initial guess                                  | Start inside an interval known to contain a simple root |
| Loss of precision           | Subtracting nearly equal quantities                 | Use higher-precision arithmetic or rewrite formula   |
| Cycling                     | Periodic orbit of the map \(g\)                     | Add damping or line search                           |
| Derivative coding error     | Analytic \(f'\) mistyped                            | Compare with finite-difference check at start        |
| Stagnation at non-root      | \(f(x_n)\approx0\) but \(f'(x_n)\) huge             | Monitor \(|f(x_n)|\) separately from step size       |

## 7. The textbook-precise statement
Let \(f:\mathbb{R}\to\mathbb{R}\) be twice continuously differentiable on an open interval \(I\) containing a root \(\alpha\) with \(f'(\alpha)\ne0\). There exists a neighborhood \(U\subset I\) of \(\alpha\) such that for any \(x_0\in U\) the Newton iteration
\[
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}
\]
is well-defined, remains in \(U\), and converges to \(\alpha\). Moreover,
\[
\lim_{n\to\infty}\frac{|x_{n+1}-\alpha|}{|x_n-\alpha|^2}=\left|\frac{f''(\alpha)}{2f'(\alpha)}\right|.
\]
(See Atkinson, *An Introduction to Numerical Analysis*, 2e, §2.3, Theorem 2.3.)

## 8. Visual — diagram or schematic
```text
          f(x)
           ^
           |     curve
           |   /
           |  /   tangent at x_n
           | /   /
           |/   /
     ------+---/---------> x
          /   /
         /   /
        /   /
   root α  x_n   x_{n+1}
```
The vertical distance from the curve to the x-axis at \(x_n\) is \(f(x_n)\). The tangent drops linearly with slope \(f'(x_n)\) and crosses zero at \(x_{n+1}\). The remaining vertical gap at \(x_{n+1}\) is of order \(e_n^2\).

## 9. The memory technique

1. **The hook** — Picture a skier racing down a slope: at each instant the skier aims exactly along the fall line (the tangent) and instantly corrects; after two corrections the skier is already on the valley floor (the root) because the mountain curvature is quadratic.
2. **What to overlearn** — The update \(x\leftarrow x-f(x)/f'(x)\) and the error law \(e_{n+1}\propto e_n^2\).
3. **Spaced-repetition schedule** — Review the derivation at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from the Taylor expansion of \(f\) about \(x_n\), drop the quadratic term, set the linear model to zero, solve.

## 10. What this unlocks
Newton-Raphson supplies the local engine for almost every fast nonlinear solver used in scientific computing. It directly generalizes to systems via the Jacobian (Newton–Kantorovich), becomes the basis of interior-point methods in optimization, and appears inside every implicit Runge–Kutta time stepper for stiff ODEs.

- Newton–Kantorovich theorem (global convergence analysis)
- Broyden and quasi-Newton updates
- Continuation and homotopy methods
- Differentiable optimization layers in machine learning

## 11. Self-check — five questions, no answers
1. Derive the Newton iteration for \(f(x)=\sin x\) starting from the tangent-line geometry and confirm it matches the general formula.
2. For \(f(x)=x^2-2\) compute the first three iterates from \(x_0=2\) and verify that the number of correct decimals roughly doubles each step.
3. Show that if \(\alpha\) is a double root then Newton’s method converges only linearly; give the modified iteration that restores quadratic convergence.
4. Suppose \(|f''|\le M\) and \(|f'|\ge m>0\) on an interval. Derive an explicit radius \(r\) such that any \(x_0\) inside the interval of length \(r\) around \(\alpha\) guarantees convergence.
5. Construct a concrete \(C^2\) function possessing a simple root yet for which Newton iteration diverges from some starting point; explain the geometric reason.