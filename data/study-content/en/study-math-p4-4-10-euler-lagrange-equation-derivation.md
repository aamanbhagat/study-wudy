## 1. The one-sentence answer
**The Euler-Lagrange equation is the differential equation obtained by setting the first variation of an integral functional to zero, thereby locating the stationary paths.**

A functional assigns a number to an entire function, typically by integrating a quantity that depends on the function and its derivative. To locate the function that extremizes this number, introduce a one-parameter family of nearby paths that agree at the endpoints and expand the resulting scalar function of the parameter to first order. The coefficient of the arbitrary perturbation must vanish identically, which produces a second-order ordinary differential equation relating the integrand to its partial derivatives.

This construction mirrors the familiar condition \(f'(x)=0\) for an ordinary function, except the derivative is replaced by a functional derivative that accounts for the integral dependence on both the value and the slope of the unknown function.

> [!NOTE]
> The equation is necessary but not always sufficient; it identifies candidates for extrema, after which second-variation tests or boundary conditions decide minimality, maximality, or saddle character.

## 2. Why this matters — concrete and current
In orbital mechanics, SpaceX trajectory designers minimize fuel consumption for Falcon 9 second-stage burns by solving the Euler-Lagrange equation for the thrust-angle profile subject to the rocket equation and gravity losses; the resulting primer-vector steering law is embedded in their onboard guidance software.

In semiconductor process optimization, ASML’s EUV lithography scanners employ variational calculus to compute the optimal scanning trajectory of the wafer stage that minimizes overlay error while respecting acceleration limits; the Euler-Lagrange stationarity condition supplies the smooth reference path later tracked by the servo controllers.

General-relativistic ray tracing used by the Event Horizon Telescope collaboration solves the geodesic equation, itself the Euler-Lagrange equation for the energy functional on the Schwarzschild or Kerr metric; the same code reconstructs photon paths around M87* to produce the 2019 image.

In robotics, Boston Dynamics’ Atlas control stack formulates whole-body motion planning as a finite-horizon optimal-control problem whose continuous-time necessary conditions reduce to a two-point boundary-value problem governed by the Euler-Lagrange equations; real-time solutions are obtained via direct collocation initialized from the analytic EL structure.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Riemann integral         | The functional is defined as an integral; every subsequent limit and differentiation occurs inside that integral. |
| Partial derivatives      | The integrand \(L(x,y,y')\) depends on three independent variables; the EL equation isolates two of its partials. |
| Integration by parts     | Converts the term containing the derivative of the variation into a boundary term plus an integral free of that derivative. |
| Fundamental lemma of calculus of variations | Guarantees that if \(\int \eta(x) f(x)\,dx = 0\) for all admissible \(\eta\), then \(f(x)=0\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — A functional assigns a scalar to an entire curve
A functional \(J\) maps a function \(y(x)\) to a real number via an integral whose integrand may involve \(y\) and \(y'\).  
Consider the arc-length functional \(J[y]=\int_0^1\sqrt{1+(y')^2}\,dx\); its value is the length of the graph of \(y\).  
Formally,  
\[
J[y]=\int_a^b L(x,y(x),y'(x))\,dx.
\]
> [!WARNING]
> Treating \(J\) as an ordinary function of a single variable hides the fact that its argument is an infinite-dimensional object; differentiation must therefore be performed with respect to a function, not a number.

### Step 2 — Introduce a one-parameter family of admissible paths
Fix the endpoints \(y(a)=A\), \(y(b)=B\). Let \(\eta(x)\) be any smooth function satisfying \(\eta(a)=\eta(b)=0\). The varied path is  
\[
y_\varepsilon(x)=y(x)+\varepsilon\eta(x).
\]
The scalar function \(\phi(\varepsilon)=J[y_\varepsilon]\) is now an ordinary function of one real variable.  
> [!WARNING]
> Omitting the endpoint condition on \(\eta\) produces extraneous boundary terms that destroy the clean interior equation.

### Step 3 — Stationarity requires the first derivative at \(\varepsilon=0\) to vanish
For \(y\) to extremize \(J\), \(\phi(\varepsilon)\) must be stationary at \(\varepsilon=0\):  
\[
\phi'(0)=0.
\]
Differentiating under the integral sign yields  
\[
\phi'(0)=\int_a^b\left(\frac{\partial L}{\partial y}\eta+\frac{\partial L}{\partial y'}\eta'\right)dx=0.
\]
> [!WARNING]
> Interchanging derivative and integral is valid only when \(L\) is continuously differentiable and the interval is finite; otherwise dominated-convergence arguments are required.

### Step 4 — Integrate the second term by parts
Integrate the \(\eta'\) term:  
\[
\int_a^b\frac{\partial L}{\partial y'}\eta'\,dx=\Bigl[\frac{\partial L}{\partial y'}\eta\Bigr]_a^b-\int_a^b\frac{d}{dx}\Bigl(\frac{\partial L}{\partial y'}\Bigr)\eta\,dx.
\]
The boundary term vanishes because \(\eta(a)=\eta(b)=0\). The stationarity condition therefore becomes  
\[
\int_a^b\left(\frac{\partial L}{\partial y}-\frac{d}{dx}\frac{\partial L}{\partial y'}\right)\eta\,dx=0.
\]
> [!WARNING]
> Forgetting that the total derivative \(\frac{d}{dx}(\partial L/\partial y')\) acts on the composite function of \(x\) produces an incorrect equation missing chain-rule terms.

### Step 5 — Invoke the fundamental lemma
Because the integral vanishes for every admissible \(\eta\), the integrand coefficient itself must be identically zero:  
\[
\frac{\partial L}{\partial y}-\frac{d}{dx}\Bigl(\frac{\partial L}{\partial y'}\Bigr)=0.
\]
This is the Euler-Lagrange equation.  
> [!WARNING]
> The lemma requires continuity of the coefficient; if \(L\) is merely \(C^1\), solutions must be interpreted in the weak sense.

## 5. Worked examples — every step shown

**Example 1 — Shortest path in the plane**  
*Given:* \(L=\sqrt{1+(y')^2}\), independent of \(y\) and \(x\).  
*Find:* the EL equation.  
Differentiate: \(\partial L/\partial y=0\).  
\[
\frac{d}{dx}\Bigl(\frac{\partial L}{\partial y'}\Bigr)=\frac{d}{dx}\Bigl(\frac{y'}{\sqrt{1+(y')^2}}\Bigr)=0.
\]
Hence \(y'/\sqrt{1+(y')^2}=C\), so \(y'=const\), i.e., straight lines.  
**Final answer**  
\[y(x)=mx+c.\]  
*Reflection:* The independence of \(L\) on \(y\) immediately yields a first integral; this pattern generalizes to any ignorable coordinate.

**Example 2 — Brachistochrone**  
*Given:* \(L=\sqrt{(1+(y')^2)/y}\).  
*Find:* the differential equation.  
\[
\frac{\partial L}{\partial y}=-\frac12\frac{\sqrt{1+(y')^2}}{y^{3/2}},\qquad
\frac{\partial L}{\partial y'}=\frac{y'}{\sqrt{y(1+(y')^2)}}.
\]
Differentiating the second term and setting the combination to zero produces the cycloid equation after one integration.  
**Final answer**  
\[x=r(\theta-\sin\theta),\quad y=r(1-\cos\theta).\]  
*Reflection:* The explicit \(y\)-dependence forces retention of the full second-order form until a Beltrami identity is recognized.

**Example 3 — Geodesic on the sphere**  
*Given:* \(L=\sqrt{\dot\theta^2+\sin^2\theta\,\dot\phi^2}\) (arc-length parametrization).  
*Find:* conserved quantities.  
Because \(L\) is independent of \(\phi\), \(\partial L/\partial\dot\phi=\sin^2\theta\,\dot\phi\) is constant (Clairaut integral).  
**Final answer**  
\[\sin^2\theta\,\dot\phi=C.\]  
*Reflection:* Coordinate independence yields first integrals without solving the full system.

**Example 4 — Higher-order Lagrangian**  
*Given:* \(L(y,y',y'')\).  
*Find:* the generalized EL equation.  
Two integrations by parts produce  
\[
\frac{\partial L}{\partial y}-\frac{d}{dx}\frac{\partial L}{\partial y'}+\frac{d^2}{dx^2}\frac{\partial L}{\partial y''}=0.
\]
**Final answer**  
The displayed fourth-order ODE.  
*Reflection:* Each extra derivative in \(L\) raises the order of the resulting equation by two.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating \(\partial L/\partial y'\) as an ordinary derivative instead of a partial | Students confuse total and partial differentiation when \(L\) depends on three variables | Always label the three arguments of \(L\) explicitly before differentiating. |
| Forgetting the chain rule inside \(d/dx(\partial L/\partial y')\) | The partial itself is a function of \(x\) through \(y(x)\) and \(y'(x)\) | Expand the total derivative as \(\partial^2L/\partial y'\partial x+\partial^2L/\partial y'\partial y\cdot y'+\partial^2L/\partial y'\partial y'\cdot y''\). |
| Applying the EL equation when endpoints are free | The boundary term no longer vanishes | Include natural boundary conditions \(\partial L/\partial y'=0\) at a free end. |
| Assuming every solution is a minimum | EL only locates stationary points | Compute the second variation or compare values. |
| Using the equation for non-differentiable \(L\) | Derivations assume \(C^2\) regularity | Switch to weak (distributional) form or check Lipschitz conditions. |
| Neglecting explicit \(x\)-dependence when forming Beltrami identity | The identity holds only when \(\partial L/\partial x=0\) | Verify \(\partial L/\partial x=0\) before replacing the EL equation by its first integral. |
| Incorrect variation when constraints are present | Unconstrained EL does not incorporate Lagrange multipliers | Augment \(L\) by \(\lambda g(x,y,y')\) before applying EL. |

## 7. The textbook-precise statement
Let \(L(x,y,p)\) be a \(C^2\) function on \([a,b]\times\mathbb{R}\times\mathbb{R}\). Define the functional  
\[
J[y]=\int_a^b L(x,y(x),y'(x))\,dx
\]  
on the space of \(C^2\) functions satisfying \(y(a)=A\), \(y(b)=B\). A necessary condition for \(y\) to render \(J\) stationary is that \(y\) satisfies the Euler-Lagrange equation  
\[
\frac{\partial L}{\partial y}(x,y,y')-\frac{d}{dx}\Bigl(\frac{\partial L}{\partial p}(x,y,y')\Bigr)=0.
\]
(Gelfand & Fomin, *Calculus of Variations*, §2, Theorem 1.)

## 8. Visual — diagram or schematic
```text
y
↑
|   y(x)  ────────────────●───────────────
|          \             / \
|           \           /   \
|            \         /     \
|             \       /       \
|              \     /         \
|               \   /           \
|   y_ε(x) ──────●───────────────●───────
|                       η(x)
+------------------------------------------→ x
a                  c                 b
```
Labelled elements: solid curve \(y(x)\), dashed curve \(y+\varepsilon\eta\), vertical distance \(\varepsilon\eta(c)\) at an interior point \(c\), fixed endpoints at \(x=a\) and \(x=b\).

## 9. The memory technique

**The hook**  
Picture a bead on a wire whose shape you can vary; the EL equation is the “force balance” that makes the travel time (or length) stationary—the bead feels zero net “variational force.”

**What to overlearn**  
1. The exact EL operator \(\frac{\partial L}{\partial y}-\frac{d}{dx}(\partial L/\partial y')\).  
2. The statement that \(\eta(a)=\eta(b)=0\) kills the boundary term.  
3. The fundamental lemma: integral zero for all test functions implies coefficient zero.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive from \(\phi'(0)=0\) by writing the integral, integrating the \(\eta'\) term by parts, and invoking the fundamental lemma.

## 10. What this unlocks
The Euler-Lagrange equation is the gateway to Hamiltonian mechanics via the Legendre transform, to Noether’s theorem linking symmetries to conserved quantities, and to the direct method in the calculus of variations for existence proofs. It also supplies the continuous-time necessary conditions for Pontryagin’s maximum principle in optimal control and the Euler-Lagrange residual used in physics-informed neural networks.

## 11. Self-check — five questions, no answers
1. Derive the EL equation for \(L=\frac12(y')^2-V(y)\) and identify the resulting Newtonian equation.  
2. Show that if \(L\) does not depend explicitly on \(x\), then \(L-y'\partial L/\partial y'\) is constant along extremals.  
3. Compute the first integral for the brachistochrone and verify it yields the cycloid parametric equations.  
4. A functional contains \(y''\). Write the correct fourth-order EL equation and state the natural boundary conditions at a free end.  
5. Explain why the straight line satisfies the EL equation for arc length yet a great circle satisfies the corresponding equation on the sphere; identify the geometric feature responsible for the difference.