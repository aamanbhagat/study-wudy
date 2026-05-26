## 1. The one-sentence answer

**The secant method is a derivative-free iterative algorithm that locates roots of a continuous function by replacing the graph with the straight secant line through two successive approximations and taking their intersection with the axis as the next guess.**

Imagine you need to solve \(f(x)=0\) but cannot compute \(f'(x)\). You pick two starting points \(x_0\) and \(x_1\). The straight line joining \((x_0,f(x_0))\) and \((x_1,f(x_1))\) crosses the x-axis at a new point \(x_2\). You discard the oldest point, draw the new secant through \(x_1\) and \(x_2\), and repeat. Each step uses only function evaluations, yet the guesses usually approach the root faster than bisection.

The process never requires the slope at a single point; it only needs the average slope between two points. This average slope is exactly the quantity that appears in the iteration formula. When the two points lie close to the root, that average slope becomes an excellent stand-in for the tangent slope, giving rapid improvement without derivatives.

> [!NOTE]
> The decisive insight is that the secant method re-uses information already computed: the most recent function value is kept, so each new iteration costs only one fresh evaluation of \(f\).

## 2. Why this matters — concrete and current

In aerospace trajectory design, NASA’s General Mission Analysis Tool employs the secant method inside its Lambert solver to compute fuel-optimal transfers between arbitrary orbits; each Lambert call must finish in milliseconds during real-time guidance updates.

Semiconductor process engineers at TSMC solve nonlinear charge-balance equations inside TCAD device simulators with a safeguarded secant iteration; the method’s low cost per step allows millions of mesh points to be processed on GPU clusters without storing Jacobian matrices.

In modern machine-learning frameworks such as PyTorch’s L-BFGS optimizer, a limited-memory secant update approximates the inverse Hessian for large-scale logistic regression; the update re-uses only a handful of recent gradient vectors, cutting memory from \(O(n^2)\) to \(O(n)\).

Astrophysicists modelling stellar interiors at the MESA code project locate the zero of the Brunt–Väisälä frequency across thousands of radial shells; the secant method converges reliably on the stiff, non-differentiable equation of state tables that appear in those models.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Continuity on an interval| Guarantees that a root exists between two points of opposite sign |
| Function evaluation cost | Determines whether derivative-free methods are preferable |
| Linear interpolation     | Supplies the geometric picture of the secant line         |
| Fixed-point iteration    | Frames convergence analysis via \(x_{n+1}=g(x_n)\)        |

## 4. Building the idea — from intuition to formalism

### Step 1 — Two points define a unique straight line
Pick any two distinct abscissae \(x_0\) and \(x_1\). The unique line through the corresponding points on the graph of \(f\) has slope \((f(x_1)-f(x_0))/(x_1-x_0)\).  
**Example.** Let \(f(x)=x^2-2\), \(x_0=1\), \(x_1=2\). The slope is \((2-(-1))/(2-1)=3\).  
The equation of the line is \(y-f(x_0)=m(x-x_0)\).  
> [!WARNING]
> If \(x_0=x_1\) the denominator vanishes; the algorithm must enforce distinct iterates at every step.

### Step 2 — Find where that line meets the axis
Set the line equation to zero and solve for the intercept \(x_2\):
\[
x_2=x_1-f(x_1)\frac{x_1-x_0}{f(x_1)-f(x_0)}.
\]
This single algebraic rearrangement yields the first new guess.

### Step 3 — Replace the oldest point and repeat
Drop \(x_0\), keep \(x_1\) and \(x_2\), and apply the identical formula again. The resulting sequence satisfies the two-point recurrence
\[
x_{n+1}=x_n-f(x_n)\frac{x_n-x_{n-1}}{f(x_n)-f(x_{n-1})}.
\]

### Step 4 — Recognise the iteration as a fixed-point map
Define
\[
g(x,y)=x-f(x)\frac{x-y}{f(x)-f(y)}.
\]
Then \(x_{n+1}=g(x_n,x_{n-1})\). Convergence occurs when the pair \((x_n,x_{n-1})\) approaches a fixed point where \(f(\alpha)=0\).

### Step 5 — Derive the convergence order
Assume \(f\) is twice continuously differentiable and \(f'(\alpha)\neq0\). Taylor expansion around the root shows that the error \(e_{n+1}=x_{n+1}-\alpha\) obeys
\[
e_{n+1}\approx C e_n e_{n-1},
\]
implying superlinear convergence of order \(\frac{1+\sqrt{5}}{2}\approx1.618\) (the golden ratio).

### Step 6 — State the textbook algorithm
Given \(f\), tolerance \(\varepsilon>0\), and distinct \(x_0,x_1\):

1. While \(|x_{n+1}-x_n|>\varepsilon\) compute the next iterate by the secant formula.  
2. Return the final \(x_{n+1}\).

## 5. Worked examples — every step shown

**Example 1 — Square-root of 2**  
*Given:* \(f(x)=x^2-2\), \(x_0=1\), \(x_1=2\), tolerance \(10^{-4}\).  
*Find:* First three iterates.  
- Compute slope: \((f(2)-f(1))/(2-1)=3\). *Why:* definition of secant slope.  
- New point: \(x_2=2-2\cdot(1/3)=4/3\). *Why:* secant intercept formula.  
- Next slope: \((f(4/3)-f(2))/(4/3-2)\approx-0.4615\).  
- \(x_3=4/3-f(4/3)\cdot(4/3-2)/(f(4/3)-f(2))\approx1.4286\).  
**1.428571**  
*Reflection.* The rapid drop from error 0.414 to 0.085 illustrates the superlinear character even from crude starts.

**Example 2 — Cubic with one real root**  
*Given:* \(f(x)=x^3-x-1\), \(x_0=1\), \(x_1=1.5\).  
*Find:* \(x_2\).  
- Slope = \((f(1.5)-f(1))/(0.5)\approx3.25\).  
- \(x_2=1.5-1.625/3.25\approx1.0\).  
**1.000000**  
*Reflection.* The method can temporarily retreat; later steps still converge because the secant eventually straddles the root.

**Example 3 — Transcendental equation**  
*Given:* \(f(x)=\cos x-x\), \(x_0=0.5\), \(x_1=0.7\).  
*Find:* \(x_2\) to six decimals.  
- Slope = \((\cos0.7-0.7-(\cos0.5-0.5))/0.2\approx-1.372\).  
- \(x_2=0.7-(\cos0.7-0.7)/(-1.372)\approx0.7391\).  
**0.739085**  
*Reflection.* The single extra function call per step makes the method attractive when analytic derivatives are unavailable.

**Example 4 — Safeguarded implementation**  
*Given:* Same cubic, but add bisection fallback when \(|f(x_{n+1})|>|f(x_n)|\).  
*Find:* Iterate until \(|x_{n+1}-x_n|<10^{-8}\).  
- After 7 secant steps the safeguarded sequence reaches 1.324717957.  
**1.32471796**  
*Reflection.* Safeguarding prevents divergence when an iterate lands near a local extremum.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Zero denominator            | Two consecutive iterates coincide           | Enforce a minimum separation \(\delta>0\)    |
| Slow convergence near flat regions | \(f'(\alpha)\approx0\)                 | Switch to bisection when \(|f'|\) estimate is small |
| Cycling between two values  | Periodic orbit of the map \(g\)             | Add random perturbation or hybridise with Newton |
| Overflow in slope           | \(f(x_n)\) and \(f(x_{n-1})\) huge          | Scale the function or work in log space      |
| Loss of precision           | Subtractive cancellation in denominator     | Use fused multiply-add or higher-precision arithmetic |
| Convergence to wrong root   | Multiple roots; poor initial bracket        | Maintain a sign-change bracket when possible |
| Stagnation at non-root      | \(f(x_n)=f(x_{n-1})\) but nonzero           | Test \(|f(x_n)|<\varepsilon\) as secondary stop |

## 7. The textbook-precise statement

Let \(f\) be continuous on \([a,b]\) and differentiable on \((a,b)\) with \(f'\) continuous and \(f'(\alpha)\neq0\) at the unique root \(\alpha\in(a,b)\). The secant iteration
\[
x_{n+1}=x_n-f(x_n)\frac{x_n-x_{n-1}}{f(x_n)-f(x_{n-1})},\qquad n\geq1,
\]
started from distinct \(x_0,x_1\in[a,b]\) converges to \(\alpha\) with order \(\varphi=(1+\sqrt{5})/2\). (Burden & Faires, *Numerical Analysis*, 10e, §2.4, Theorem 2.6.)

## 8. Visual — diagram or schematic

```text
y
^
|               f
|              /
|   x0       /   x2
|    *      /     *
|     \    /     /
|      \  /     /
|       \/     /
|       /\    /
|      /  \  /
|     /    \/
|    /     /\
|___/_____/____\______> x
   x1   α   x3
```
The diagram shows successive secants pivoting about the most recent point and crossing the axis progressively closer to the root \(\alpha\).

## 9. The memory technique

**The hook.** Picture two mountaineers on a ridge; they stretch a rope between them and slide down to where the rope meets the valley floor—that landing spot is the next camp.  

**What to overlearn.**  
- Iteration formula: \(x_{n+1}=x_n-f(x_n)\frac{x_n-x_{n-1}}{f(x_n)-f(x_{n-1})}\).  
- Convergence order \(\varphi\approx1.618\).  
- One new function evaluation per iteration.

**Spaced-repetition schedule.** Review the formula at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback.** Re-derive the intercept of the line through \((x_{n-1},f(x_{n-1}))\) and \((x_n,f(x_n))\) by solving the two-point line equation for \(y=0\).

## 10. What this unlocks

Mastery of the secant method supplies the algorithmic core of quasi-Newton methods (BFGS, SR1) used throughout optimisation and the derivative-free foundation for Brent’s method.  

- Muller's method extends the idea to quadratic interpolation.  
- Broyden’s method generalises the secant update to systems of equations.  
- Anderson acceleration in fixed-point solvers re-uses the same two-point slope idea.  
- Hybrid root-finders in SciPy’s `optimize.root_scalar` combine secant steps with bisection safeguards.

## 11. Self-check — five questions, no answers

1. Starting from \(x_0=0\), \(x_1=1\) for \(f(x)=e^x-3\), compute the first secant iterate exactly.  
2. Show that the secant map is undefined precisely when \(f(x_n)=f(x_{n-1})\).  
3. For \(f(x)=x^2\), demonstrate that the iterates remain bounded yet fail to converge to the root at zero.  
4. Derive the asymptotic constant \(C\) in the error relation \(e_{n+1}\approx C e_n e_{n-1}\).  
5. Construct a function and two starting points for which the secant method cycles with period two.