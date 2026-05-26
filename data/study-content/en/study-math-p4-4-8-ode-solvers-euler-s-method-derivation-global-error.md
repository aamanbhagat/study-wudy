## 1. The one-sentence answer
**Euler's method replaces the unknown solution curve of an autonomous or non-autonomous first-order ODE with a piecewise-linear path whose slopes are taken from the right-hand side evaluated at successive mesh points.**

The differential equation \(y'=f(t,y)\) tells the instantaneous slope at every point in the \(t\)-\(y\) plane. At any known point \((t_n,y_n)\) the slope \(f(t_n,y_n)\) is therefore known exactly. The method draws the straight tangent segment of length \(h\) and lands at a new point whose ordinate is accepted as the approximate solution value at \(t_{n+1}=t_n+h\).

Repeating the process produces a chain of such segments. Because each segment uses only first-order information, the discrepancy between the true solution and the polygonal path after a fixed interval \(T\) shrinks proportionally to the step length \(h\); that discrepancy is the global error.

> [!NOTE]
> The global error of Euler's method is \(O(h)\), not \(O(h^2)\); the extra power of \(h\) is lost because truncation errors committed at every one of the \(T/h\) steps accumulate coherently.

## 2. Why this matters — concrete and current
NASA's Deep Space Network trajectory integrators still employ Euler steps inside higher-order multistep correctors when propagating spacecraft states over decades; the \(O(h)\) global error bound supplies the rigorous step-size limit that guarantees position errors remain below 100 m at Mars encounter.

Modern ensemble weather models at the European Centre for Medium-Range Weather Forecasts embed Euler micro-steps inside physics parametrizations for cloud microphysics; the linear dependence of global error on \(h\) determines the largest stable time step that keeps temperature biases below 0.1 K after 10-day forecasts.

Semiconductor process simulators such as Synopsys Sentaurus solve coupled diffusion-reaction ODEs on doping profiles; Euler's method supplies the first, unconditionally stable predictor that is later corrected by backward differentiation formulas, and its global error controls the mesh refinement needed to keep junction-depth error under 1 nm.

Chemical kinetics packages inside combustion chambers of rocket engines (SpaceX Raptor) integrate stiff Arrhenius ODEs; the explicit Euler step is used for non-stiff species while its truncation analysis supplies the switching criterion to implicit methods, keeping radical concentration errors below 0.5 % over millisecond burn times.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| First-order Taylor expansion | Supplies the exact local truncation term that becomes the building block of both local and global error bounds. |
| Lipschitz continuity of \(f\) | Guarantees uniqueness of the true solution and controls how local errors propagate into global error. |
| Definition of big-O notation | Distinguishes local \(O(h^2)\) from global \(O(h)\) statements cleanly. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Slope-field picture
The ODE \(y'=f(t,y)\) paints a direction field; every point \((t,y)\) carries an arrow of slope \(f(t,y)\). The true solution is the unique integral curve threading these arrows.

A concrete example is \(y'=y\), whose field consists of arrows whose slope equals height. The exact solution through \((0,1)\) is \(e^t\).

Formally, any \(C^1\) solution satisfies
\[
y(t)=\ y(t_0)+\int_{t_0}^t f(s,y(s))\,ds.
\]

> [!WARNING]
> Treating the arrows as constant over a finite interval already discards all curvature information; forgetting this produces the false belief that local error is zero.

### Step 2 — Tangent-line advance
At a known point \((t_n,y_n)\) the slope \(f(t_n,y_n)\) is known. The straight line through that point with exactly that slope intersects the vertical line \(t=t_n+h\) at height \(y_n+h f(t_n,y_n)\).

For the example \(y'=y\), \(y_0=1\), \(h=0.1\), the first step yields \(y_1=1+0.1\cdot1=1.1\).

The update rule is therefore
\[
y_{n+1}=y_n+h f(t_n,y_n).
\]

> [!WARNING]
> Using the slope at the left endpoint (forward Euler) rather than a centered slope introduces a systematic one-sided bias that cannot be removed by shrinking \(h\) alone.

### Step 3 — Local truncation error via Taylor
Expand the exact solution about \(t_n\):
\[
y(t_n+h)=y(t_n)+h y'(t_n)+\frac{h^2}{2}y''(\xi).
\]
Because \(y'(t_n)=f(t_n,y(t_n))\), the Euler step matches the first two terms and leaves a remainder \(\frac{h^2}{2}y''(\xi)\). Hence local truncation error is \(O(h^2)\).

### Step 4 — Propagation of one local error
A single local error \(\tau_{n+1}\) introduced at step \(n\) is subsequently multiplied by the Lipschitz factor of the flow. Under the assumption \(\|f_y\|\le L\), the amplification factor per step is at most \(e^{Lh}\). Over \(N=T/h\) steps the worst-case magnification is bounded by \(e^{LT}\), a constant independent of \(h\).

### Step 5 — Global error accumulation
There are \(N=T/h\) local errors, each of size \(O(h^2)\). After propagation each contributes \(O(h^2)\) to the final error. Summing \(N\) such contributions yields a total discrepancy bounded by
\[
C\cdot\frac{T}{h}\cdot h^2=CTh=O(h).
\]
Thus global error on a fixed interval \([t_0,T]\) is \(O(h)\).

### Step 6 — Textbook statement of convergence
If \(f\) is continuously differentiable and Lipschitz in \(y\) uniformly in \(t\), then the Euler polygons converge uniformly to the true solution on \([t_0,T]\) with rate exactly one in \(h\).

## 5. Worked examples — every step shown

**Example 1 — Linear scalar test**
*Given:* \(y'=y\), \(y(0)=1\), integrate to \(t=1\) with \(h=0.5\).
*Find:* Approximate value \(y_2\).
- \(y_0=1\) at \(t_0=0\)
  *Why*: initial datum.
- \(y_1=y_0+0.5 f(0,y_0)=1+0.5\cdot1=1.5\)
  *Why*: Euler step definition.
- \(y_2=y_1+0.5 f(0.5,y_1)=1.5+0.5\cdot1.5=2.25\)
  *Why*: second Euler step.
**2.25**

*Reflection*: Exact value is \(e\approx2.718\), relative error \(\approx17\%\); halving \(h\) halves this error, confirming \(O(h)\).

**Example 2 — Autonomous nonlinear**
*Given:* \(y'=-y^2\), \(y(0)=1\), \(h=0.25\), reach \(t=0.5\).
*Find:* \(y_2\).
- \(y_0=1\)
- \(y_1=1+0.25(-1)^2=0.75\)
- \(y_2=0.75+0.25(-0.75)^2=0.609375\)
**0.609375**

*Reflection*: Exact solution \(1/(1+t)\) gives 0.666…; error again scales linearly with \(h\).

**Example 3 — Non-autonomous**
*Given:* \(y'=t+y\), \(y(0)=0\), \(h=0.2\), two steps.
*Find:* \(y_2\).
- \(y_1=0+0.2(0+0)=0\)
- \(y_2=0+0.2(0.2+0)=0.04\)
**0.04**

*Reflection*: The forcing term \(t\) is sampled only at left endpoints; this one-sided sampling is the source of the leading \(O(h)\) term.

**Example 4 — Global-error verification**
*Given:* \(y'=y\), \(y(0)=1\), \(T=1\), compare \(h=0.1\) and \(h=0.05\).
*Find:* observed order.
- Euler with \(h=0.1\) yields \(y(1)\approx2.59374\), error \(\approx0.12454\)
- Euler with \(h=0.05\) yields \(y(1)\approx2.65330\), error \(\approx0.06496\)
- Ratio of errors \(\approx1.92\approx2\), confirming order 1.
**Order 1 verified**

*Reflection*: The doubling of accuracy when \(h\) is halved is the practical signature of global \(O(h)\) convergence.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Confusing local \(O(h^2)\) with global \(O(h)\) | Local analysis stops after one step; global sums \(T/h\) steps | Always multiply local size by number of steps before quoting final accuracy. |
| Taking \(h\) larger than the fastest time scale | Lipschitz constant \(L\) forces stability restriction \(h<2/L\) | Compute \(L\) or run a quick stability test before production runs. |
| Treating round-off error as truncation error | Floating-point noise is \(O(\varepsilon/h)\) while truncation is \(O(h)\); they cross at \(h\sim\sqrt{\varepsilon}\) | Choose \(h\) above this threshold or switch to higher-order methods. |
| Applying Euler to stiff systems without implicit treatment | Eigenvalues with large negative real part produce explosive growth | Use implicit Euler or BDF when \(\operatorname{Re}(\lambda)h\gg1\). |
| Forgetting that \(f\) must be Lipschitz | Without Lipschitz, local errors may be amplified exponentially in \(h\) | Verify or impose a uniform Lipschitz bound on the domain of interest. |
| Using inconsistent step-size sequences without re-deriving bounds | Error proofs assume uniform \(h\); variable steps change constants | Re-derive the accumulation factor for each new mesh family. |
| Expecting the numerical solution to be monotone when \(f\) changes sign | Euler follows the vector field exactly; oscillations of \(f\) are reproduced | Accept that the method inherits all qualitative features, including sign changes. |

## 7. The textbook-precise statement
Let \(f(t,y)\) be continuous on the rectangle \(D=[t_0,T]\times\mathbb{R}\) and Lipschitz continuous in \(y\) with constant \(L\) independent of \(t\). Let \(y(t)\) be the unique solution of the IVP \(y'=f(t,y)\), \(y(t_0)=y_0\). Define the uniform mesh \(t_n=t_0+nh\), \(n=0,\dots,N\) with \(h=(T-t_0)/N\). The Euler iterates satisfy
\[
y_{n+1}=y_n+h f(t_n,y_n),\qquad y_0\text{ given}.
\]
Then there exists a constant \(C\) depending only on \(T\), \(L\) and \(\max_D|f_y|\) such that
\[
\max_{0\le n\le N}|y(t_n)-y_n|\le C h.
\]
(Reference: Hairer, Nørsett & Wanner, *Solving Ordinary Differential Equations I*, 2nd ed., Springer 1993, Theorem 1.2 in Chapter II.)

## 8. Visual — diagram or schematic
```text
y
^
|               true solution  y(t)
|              /
|   *------->  /   Euler polygon
|  /     *--> /   (segments of slope f(t_n,y_n))
| /     /    /
|/     /    /
0-----|----|----|----> t
   t0   t1   t2   t3
```
Each slanted segment starts at a mesh point, follows the vector-field arrow evaluated at its left endpoint, and lands at the next mesh ordinate. The vertical gap between the polygon vertex and the smooth curve at each \(t_n\) is the global error; these gaps shrink linearly with segment length \(h\).

## 9. The memory technique

1. **The hook** — Picture a staircase (“Euler’s stairs”) climbing a curved hill; each tread is perfectly straight and its slope is taken from the hill’s steepness exactly where the previous riser ended. The final height deficit after many treads shrinks only as fast as the tread width.

2. **What to overlearn** — Update formula \(y_{n+1}=y_n+h f(t_n,y_n)\); global error statement “\(O(h)\) on fixed interval”; local truncation term \(\frac12 h^2 y''(\xi)\).

3. **Spaced-repetition schedule** — Re-derive the global-error bound at 1 day, 3 days, 7 days, 16 days, 35 days after first study.

4. **First-principles fallback** — Begin from the integral equation, replace the integrand by its left-endpoint value, subtract from the exact integral, apply the Lipschitz inequality, and sum the resulting geometric series.

## 10. What this unlocks
Euler’s method is the prototype for every explicit one-step scheme. Once its error mechanism is understood, the same Taylor-expansion technique immediately yields the order conditions for Runge–Kutta methods, the stability function for linear multistep methods, and the convergence theory for variable-step adaptive controllers.

- Local and global error analysis for any consistent one-step method
- Construction of embedded Runge–Kutta pairs (Fehlberg, Dormand–Prince)
- Backward Euler and implicit trapezoidal rules for stiff problems
- Convergence proofs for Galerkin methods in time-dependent PDEs

## 11. Self-check — five questions, no answers
1. For \(y'=y^2\), \(y(0)=1\), compute two Euler steps of size \(h=0.1\) and compare the result with the exact solution at \(t=0.2\).

2. Show that the global error bound derived in Step 5 becomes infinite when the Lipschitz constant \(L\) tends to infinity; interpret the blow-up physically.

3. A computation with \(h=0.01\) yields an error of \(1.2\times10^{-3}\) at a fixed final time. Predict the error for \(h=0.0025\) under the assumption that the observed order is exactly 1.

4. Explain why the explicit Euler method applied to \(y'=-100y\) with \(h=0.03\) produces growing oscillations even though the true solution decays.

5. Derive the precise constant \(C\) appearing in the global-error theorem when \(f(t,y)=\lambda y\) with \(\lambda\) real and negative; verify that \(C\) remains bounded as \(\lambda\to-\infty\) only if \(h\) satisfies a stability restriction.