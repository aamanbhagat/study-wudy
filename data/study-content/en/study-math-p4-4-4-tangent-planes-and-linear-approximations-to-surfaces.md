## 1. The one-sentence answer
**A tangent plane is the unique flat surface that matches both the height and the first-order slopes of a given surface at a chosen point, supplying the linear approximation used for all local analysis.**

A surface \(z = f(x,y)\) curves in space. At any interior point the two partial derivatives supply the instantaneous slopes along the coordinate directions. These two slopes together determine a unique plane that touches the surface at that point and has identical tilt. Replacing the original function by the equation of this plane yields a linear function whose values differ from \(f\) only by higher-order terms that vanish upon magnification.

The construction is the direct multivariable extension of the single-variable tangent line. Once the plane is obtained, every nearby point on the surface can be replaced, for first-order calculations, by the corresponding point on the plane. This replacement converts nonlinear problems into linear algebra while the error remains controllable.

> [!NOTE]
> The tangent plane exists precisely when both partial derivatives exist and are continuous at the point; mere existence of the partials is not enough, because the surface may still fold in a way that prevents a single well-defined plane.

## 2. Why this matters — concrete and current
In computational fluid dynamics, Boeing’s CFD solvers linearize the Navier–Stokes equations about a current flight state by replacing the nonlinear convective terms with their tangent-plane approximations; the resulting sparse linear systems are solved at each time step of a transonic simulation.

Inside modern neural-network training, frameworks such as PyTorch and JAX compute the tangent plane (the Jacobian) of a loss surface with respect to millions of weights; the optimizer then takes a step along that plane, turning an intractable high-dimensional minimization into a sequence of cheap linear updates.

Semiconductor process engineers at TSMC use linear approximations of etch-rate surfaces to predict how a 0.1 nm change in chamber pressure alters critical dimension across a 300 mm wafer; the tangent-plane model supplies the sensitivity coefficients fed directly into run-to-run control algorithms.

In general-relativistic ray tracing for the Event Horizon Telescope, null geodesics are integrated by replacing the curved space-time metric with its tangent-plane approximation inside each adaptive step, reducing the cost of photon-orbit calculations by orders of magnitude while keeping truncation error below the instrument’s resolution.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Partial derivatives      | Supply the two slopes that define the plane’s tilt        |
| Continuity of functions  | Guarantees the linear error term actually vanishes        |
| Single-variable tangent line | Supplies the exact analogy that generalizes without change of logic |
| Limit definition of derivative | Underpins the rigorous statement that the approximation error is \(o(\sqrt{h^2+k^2})\) |

## 4. Building the idea — from intuition to formalism

### Step 1 — A surface is locally a graph
A surface near a point can be described by a height function \(z = f(x,y)\). Fix the point \((x_0,y_0)\) and write every nearby location as \((x_0+h,y_0+k)\). The change in height is then \(\Delta z = f(x_0+h,y_0+k)-f(x_0,y_0)\).

### Step 2 — Partial slopes give directional rise
The partial derivative \(f_x(x_0,y_0)\) tells how much height changes when only \(x\) moves; likewise for \(f_y\). These two numbers are the components of tilt along the coordinate axes.

### Step 3 — The candidate plane equation
The unique plane whose height at \((x_0,y_0)\) equals \(f(x_0,y_0)\) and whose partial slopes match those of \(f\) is
\[
z = f(x_0,y_0) + f_x(x_0,y_0)(x-x_0) + f_y(x_0,y_0)(y-y_0).
\]
This is the tangent plane.

### Step 4 — Linear approximation defined
The right-hand side above is called the linearization or tangent-plane approximation \(L(x,y)\). For any nearby \((x,y)\),
\[
f(x,y) \approx L(x,y).
\]

### Step 5 — Error vanishes faster than distance
The approximation is first-order when
\[
\lim_{(h,k)\to(0,0)}\frac{f(x_0+h,y_0+k)-L(x_0+h,y_0+k)}{\sqrt{h^2+k^2}}=0.
\]
This limit forces every higher-order curvature term to become negligible relative to distance.

### Step 6 — Textbook statement reached
When the partial derivatives exist and are continuous in a neighborhood, the limit condition holds automatically and the tangent plane exists.

> [!WARNING]
> If the partial derivatives exist but are discontinuous, the limit may fail and no tangent plane exists even though both \(f_x\) and \(f_y\) are defined.

## 5. Worked examples — every step shown

**Example 1 — Simple paraboloid**  
*Given:* \(f(x,y)=x^2+y^2\) at \((1,2)\).  
*Find:* tangent plane and linear approximation.  

Compute the partials:  
\(f_x=2x\), so \(f_x(1,2)=2\).  
*Why:* differentiate treating \(y\) constant.  

\(f_y=2y\), so \(f_y(1,2)=4\).  
*Why:* differentiate treating \(x\) constant.  

Plane equation:  
\[
z=1^2+2^2+2(x-1)+4(y-2)=5+2(x-1)+4(y-2).
\]
**Final answer**  
\[
z=2(x-1)+4(y-2)+5.
\]

*Reflection:* The surface is quadratic, so the tangent plane captures the linear part exactly; the quadratic remainder is invisible to first order.

**Example 2 — Trigonometric surface**  
*Given:* \(f(x,y)=\sin x\cos y\) at \((\pi/2,0)\).  
*Find:* linear approximation.  

Partials:  
\(f_x=\cos x\cos y\), value \(0\).  
*Why:* chain rule on \(\sin x\).  

\(f_y=-\sin x\sin y\), value \(-1\).  
*Why:* product rule.  

Linearization:  
\[
L(x,y)=1+0\cdot(x-\pi/2)-1\cdot(y-0)=1-y.
\]
**Final answer**  
\[
L(x,y)=1-y.
\]

*Reflection:* Even though the original function is nonlinear, the tangent plane is a simple plane because the \(x\)-slope vanishes at the chosen point.

**Example 3 — Exponential of two variables**  
*Given:* \(f(x,y)=e^{x+2y}\) at \((0,1)\).  
*Find:* tangent plane.  

\(f_x=e^{x+2y}\), value \(e^2\).  
\(f_y=2e^{x+2y}\), value \(2e^2\).  

Plane:  
\[
z=e^2+e^2 x+2e^2(y-1).
\]
**Final answer**  
\[
z=e^2(1+x+2y-2).
\]

*Reflection:* The exponential factors out, illustrating that the tangent plane scales the same way the function itself scales.

**Example 4 — Failure case (discontinuous partials)**  
*Given:* \(f(x,y)=\frac{xy}{x^2+y^2}\) for \((x,y)\ne(0,0)\), \(f(0,0)=0\).  
*Find:* does a tangent plane exist at origin?  

Both partials at origin equal zero, yet along \(y=x\) the function equals \(1/2\), so the difference quotient does not tend to zero.  
**Final answer**  
No tangent plane exists.

*Reflection:* Existence of partial derivatives is insufficient; continuity of the partials is required for the error limit.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using the normal vector instead of the plane equation | Students remember \(\nabla F\) points normal but forget to convert to Cartesian form | Always write the plane as \(z=L(x,y)\) after computing partials of \(f\) |
| Evaluating partials at the wrong point | Mechanical habit of differentiating after substitution | Differentiate first, then substitute the fixed coordinates |
| Forgetting the constant term \(f(x_0,y_0)\) | Treating the plane as passing through the origin | Anchor the plane by adding the actual height value |
| Confusing \(\Delta z\) with the total differential | Notation overlap in older texts | Keep \(\Delta z\) for actual change and \(dz\) strictly for the linear part |
| Assuming the plane exists whenever partials exist | Counter-examples are rarely shown in first exposure | Always verify continuity of \(f_x\) and \(f_y\) before claiming the tangent plane |
| Using the same symbol \(f\) for both surface and plane | Sloppy variable reuse | Introduce \(L(x,y)\) explicitly as the linear replacement |
| Neglecting domains where \(f\) is not differentiable | Surfaces with edges or cusps | Check the open set on which partials are continuous before applying the theorem |

## 7. The textbook-precise statement
Let \(f\) be defined on an open disk \(D\) centered at \((x_0,y_0)\) and suppose the partial derivatives \(f_x\) and \(f_y\) exist on \(D\) and are continuous at \((x_0,y_0)\). Then the tangent plane to the surface \(z=f(x,y)\) at \((x_0,y_0,f(x_0,y_0))\) is given by
\[
z=f(x_0,y_0)+f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0).
\]
Moreover,
\[
f(x,y)=f(x_0,y_0)+f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0)+o(\sqrt{(x-x_0)^2+(y-y_0)^2})
\]
as \((x,y)\to(x_0,y_0)\). (Stewart, *Calculus*, 9e, §14.4, Theorem 3.)

## 8. Visual — diagram or schematic
```text
      z
      ↑
      |     surface z=f(x,y)
      |   ,-'''-.
      |  /       \
      | /   ● P   \     ← point (x0,y0,f(x0,y0))
      |/     \     \
      +-------\-----+------→ y
      |        \    |
      |         \   |   tangent plane
      |          \  |
      |           \ |
     /             \|
    /               \
   /                 \
  x
```
The diagram shows a curved surface, a marked point P, and the flat tangent plane touching only at P with matching slopes along x and y.

## 9. The memory technique
1. **The hook** — Picture the tangent plane as the still water surface that just kisses a floating curved leaf at one point; any nearby ripple on the leaf lies above or below the water by an amount too small to see at first glance.  
2. **What to overlearn** — The plane formula itself and the precise limit condition that defines first-order contact.  
3. **Spaced-repetition schedule** — Re-derive the plane equation at 1 day, 3 days, 7 days, 16 days, and 35 days.  
4. **First-principles fallback** — Start from the single-variable tangent line along each axis, then combine the two linear pieces into one plane equation.

## 10. What this unlocks
Tangent planes are the gateway to the full differential calculus of several variables.  

- The total differential and the gradient vector appear as immediate corollaries.  
- The chain rule for composite functions receives its cleanest proof via linear approximations.  
- Taylor expansions of order two and higher rest on repeated differentiation of the tangent-plane remainder.  
- Constrained optimization (Lagrange multipliers) linearizes both objective and constraint surfaces at candidate points.  
- Numerical methods such as Newton’s method in several variables are simply repeated tangent-plane steps.

## 11. Self-check — five questions, no answers
1. Compute the tangent plane to \(f(x,y)=x^3-y^2\) at \((1,1)\).  
2. Show that \(f(x,y)=(x y)^{1/3}\) has partial derivatives at the origin yet possesses no tangent plane there.  
3. If the linear approximation of \(f\) at \((2,3)\) is \(L(x,y)=4+5(x-2)-6(y-3)\), recover \(f(2,3)\), \(f_x(2,3)\) and \(f_y(2,3)\).  
4. Explain why continuity of the partial derivatives is required in the theorem even though the definition of differentiability only demands the limit condition.  
5. A surface is known to be differentiable at every point of an open set. Must its tangent planes vary continuously from point to point? Construct a counter-example or prove continuity.