## 1. The one-sentence answer
**First-order optimality conditions state that if a differentiable function attains a local extremum at an interior point, then its gradient must vanish there.**

A function of several variables rises or falls most steeply in the direction of its gradient vector. At a smooth peak or valley that point cannot be crossed without the slope changing sign in every direction; the only vector compatible with that requirement is the zero vector. Consequently the equation \(\nabla f(x^*)=0\) becomes the necessary first test any candidate solution must satisfy.

The same geometric fact appears in one variable as \(f'(x^*)=0\). In higher dimensions the gradient simply assembles all partial derivatives into a single vector that must be the zero vector. The condition is local and first-order; it says nothing about whether the point is a minimum, maximum or saddle, nor does it apply at boundaries or non-differentiable points.

> [!NOTE]
> The gradient points uphill; therefore the only place where every possible small step is neither uphill nor downhill is where that vector has length zero.

## 2. Why this matters — concrete and current
In training large language models at Google DeepMind and OpenAI, the cross-entropy loss is minimized by driving its gradient to zero (or numerically near zero) via variants of gradient descent; the resulting stationary points define the learned weights.

NASA’s trajectory-optimization software for the Artemis lunar missions solves constrained optimal-control problems whose first-order necessary conditions reduce to a system of equations requiring the Hamiltonian gradient with respect to thrust direction to vanish along the optimal path.

Semiconductor foundries such as TSMC use gradient-based optical-proximity correction to adjust mask shapes; the objective measuring printed-image error is driven to a stationary point where its gradient with respect to millions of mask parameters equals zero.

In computational chemistry, density-functional-theory codes locate equilibrium molecular geometries by iterating until the nuclear gradient of the total-energy functional is smaller than a chosen tolerance; that zero-gradient configuration is the equilibrium structure used for subsequent property predictions.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Partial derivatives      | They are the components of the gradient vector.           |
| Directional derivative   | It shows that the gradient encodes the slope in every direction. |
| Open set / interior point| The theorem applies only away from boundaries.            |
| Local minimum / maximum  | The very objects whose existence forces the gradient to vanish. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Slope in one dimension
If a differentiable function of one variable has a local minimum at an interior point, the tangent line must be horizontal.  
Consider \(f(x)=x^2\) at \(x=0\); the difference quotient \((f(h)-f(0))/h= h\) tends to 0 as \(h\to0\) from both sides.  
Thus
\[
f'(x^*)=0.
\]
> [!WARNING]  
> Forgetting that the point must be interior allows counter-examples such as \(f(x)=x\) on \([0,1]\), where the minimum occurs at the endpoint and the derivative is never zero.

### Step 2 — All directions must be flat
In several variables a small step can be taken in any direction \(u\) with \(\|u\|=1\). The directional derivative in that direction is \(\nabla f(x^*)\cdot u\).  
For \(x^*\) to be a local extremum every such directional derivative must be zero; otherwise a descent or ascent direction exists.  
Hence
\[
\nabla f(x^*)\cdot u=0 \quad\text{for all unit vectors }u.
\]

### Step 3 — The only vector orthogonal to everything is zero
The sole vector orthogonal to every unit vector is the zero vector.  
Choosing \(u\) parallel to \(\nabla f(x^*)\) itself immediately yields \(\|\nabla f(x^*)\|=0\).  
Therefore
\[
\nabla f(x^*)=0.
\]

### Step 4 — Formal statement for unconstrained problems
Let \(f:\mathbb{R}^n\to\mathbb{R}\) be continuously differentiable on an open set \(U\). If \(x^*\in U\) is a local minimizer (or maximizer), then
\[
\nabla f(x^*)=0.
\]

## 5. Worked examples — every step shown

**Example 1 — Simple quadratic**  
*Given:* \(f(x,y)=x^2+y^2\).  
*Find:* stationary points.  

Compute the gradient:
\[
\nabla f=\begin{pmatrix}2x\\2y\end{pmatrix}.
\]
Set each component to zero:
\[
2x=0,\qquad 2y=0.
\]
The unique solution is \((x,y)=(0,0)\).  
**Answer:** \((0,0)\) is the only stationary point.  

*Reflection:* The example is radially symmetric; every direction yields the same second-derivative test, confirming a minimum.

**Example 2 — Function with saddle**  
*Given:* \(f(x,y)=x^2-y^2\).  
*Find:* stationary points.  

Gradient:
\[
\nabla f=\begin{pmatrix}2x\\-2y\end{pmatrix}=0
\]
implies \(x=0\), \(y=0\).  
**Answer:** \((0,0)\) is a stationary point (saddle).  

*Reflection:* First-order conditions locate the point; higher-order tests are required to classify it.

**Example 3 — Exponential interaction**  
*Given:* \(f(x,y)=e^{x}+y^2-2y\).  
*Find:* stationary points.  

Partial derivatives:
\[
\frac{\partial f}{\partial x}=e^x=0 \quad\text{(never zero)},
\]
so no stationary points exist.  
**Answer:** The function has none.  

*Reflection:* The gradient never vanishes because the exponential term has strictly positive derivative.

**Example 4 — Cubic with multiple candidates**  
*Given:* \(f(x,y)=x^3-3x+y^2\).  
*Find:* stationary points.  

Gradient:
\[
\nabla f=\begin{pmatrix}3x^2-3\\2y\end{pmatrix}=0
\]
yields \(y=0\) and \(x=\pm1\).  
**Answer:** Two stationary points: \((1,0)\) and \((-1,0)\).  

*Reflection:* Solving the system component-wise separates variables; each coordinate is handled independently once the gradient is written.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Setting only some partials to zero  | Treating variables sequentially instead of simultaneously | Write the full vector equation \(\nabla f=0\) first. |
| Applying the test at a boundary     | Overlooking that the domain is required to be open  | Verify the candidate lies in the interior.           |
| Confusing \(\nabla f=0\) with sufficiency | Textbooks often list only the necessary condition   | Always follow with the Hessian test or other checks. |
| Ignoring points where \(\nabla f\) does not exist | Non-differentiable kinks or cusps                   | Check differentiability before invoking the theorem. |
| Numerical tolerance misread as exact zero | Floating-point gradient descent stops near zero     | Distinguish mathematical stationarity from algorithmic termination. |
| Forgetting that saddles also satisfy the condition | Expecting every stationary point to be an extremum  | Classify after location using second-derivative information. |

## 7. The textbook-precise statement
Let \(U\subset\mathbb{R}^n\) be open and let \(f:U\to\mathbb{R}\) be differentiable. Suppose \(x^*\in U\) is a local minimizer of \(f\). Then
\[
\nabla f(x^*)=0.
\]
(The identical conclusion holds if \(x^*\) is a local maximizer.)  
Reference: Nocedal & Wright, *Numerical Optimization*, 2nd ed., Theorem 2.2.

## 8. Visual — diagram or schematic
```text
          y
          ^
          |
     +----|----+
    /     |     \
   /      |      \     level curves of f
  /   --> | <--   \
 /        |        \
+---------+---------+--> x
          *
      grad=0 here
```
Contour ellipses surround the stationary point marked “*”. Gradient arrows on either side point toward or away from “*” and shrink to zero length exactly at the center.

## 9. The memory technique
1. **The hook** — Picture a marble resting at the bottom of a perfectly smooth bowl; every direction looks flat, so the slope vector (gradient) must be the zero vector.  
2. **What to overlearn** — The vector equation \(\nabla f(x^*)=0\) together with the interior-point hypothesis.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the directional-derivative definition: if any direction yields a non-zero slope, a descent step exists.

## 10. What this unlocks
Mastery of the first-order necessary condition is the gateway to the entire edifice of unconstrained and constrained optimization theory.  

- Second-order sufficient conditions (Hessian positive definite)  
- Lagrange multipliers for equality constraints  
- Karush–Kuhn–Tucker conditions for inequalities  
- Gradient-based algorithms (steepest descent, Newton, quasi-Newton)  
- Sensitivity analysis and implicit-function theorems in parametric optimization  

## 11. Self-check — five questions, no answers
1. State the precise hypotheses under which \(\nabla f(x^*)=0\) is guaranteed at a local minimizer.  
2. Construct a \(C^1\) function on \(\mathbb{R}^2\) whose gradient vanishes at the origin yet the origin is neither a local minimum nor a local maximum.  
3. A particle’s potential energy is \(V(x,y,z)=x^2+y^2-z\). Does an equilibrium configuration exist? If so, locate it.  
4. Explain why the same first-order condition applies to both minima and maxima, and give a one-line geometric reason.  
5. In an iterative numerical solver the computed gradient norm is \(10^{-8}\). Does this prove that a mathematical stationary point has been reached? Why or why not?