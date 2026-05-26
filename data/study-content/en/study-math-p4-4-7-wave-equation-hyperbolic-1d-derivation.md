## 1. The one-sentence answer
The one-dimensional wave equation is the hyperbolic PDE \(u_{tt}=c^2u_{xx}\) obtained by applying Newton's second law to an infinitesimal segment of a taut string.

A vibrating string transmits transverse disturbances at finite speed because tension acts to restore any local curvature. The net vertical force on a short piece of string equals its mass times its vertical acceleration; when the tension magnitude is constant and the slope remains small, this force balance produces a second time derivative on the left and a second space derivative on the right. The constant \(c^2\) that appears is simply tension divided by linear density.

The same balance, written for every interior point, yields a single linear PDE whose solutions are arbitrary right- and left-going waves that propagate without distortion until they meet a boundary.

> [!NOTE]
> The derivation never assumes the shape of the solution; it only assumes local force balance and small slopes, yet the resulting PDE forces every solution to travel at exactly speed \(c\).

## 2. Why this matters — concrete and current
Seismic imaging companies such as Schlumberger solve the 1-D wave equation along vertical boreholes to convert travel-time data into subsurface velocity models used for oil-reservoir mapping.  

Fiber-optic sensing systems deployed by Google and Meta along submarine cables treat axial strain as a 1-D wave propagating in the glass; real-time solution of the wave equation extracts vibration signatures that locate earthquakes or ship traffic within metres.  

NASA’s Parker Solar Probe records transverse oscillations on its magnetometer booms; engineers back-propagate the measured signals with the 1-D wave equation to separate spacecraft motion from genuine solar-wind fluctuations.  

LIGO’s suspension fibers are modelled by the same equation to predict thermal-noise resonances that limit gravitational-wave sensitivity below 100 Hz; the derived mode shapes directly inform the choice of fused-silica diameter now installed in both Hanford and Livingston detectors.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Partial derivatives      | Displacement \(u(x,t)\) depends on two independent variables; the PDE contains \(u_{tt}\) and \(u_{xx}\). |
| Newton’s second law      | Net force on a material element equals mass times acceleration; this supplies the equality that becomes the PDE. |
| Taylor expansion (order 2) | Linearisation of tension components at the ends of an infinitesimal segment produces the second spatial derivative. |
| Linear density \(\rho\)  | Converts mass of the segment into \(\rho\Delta x\), which cancels to leave the constant \(c^2=T/\rho\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the physical object and variables
Consider a perfectly flexible string stretched along the x-axis with constant tension \(T\) and uniform linear density \(\rho\). Let \(u(x,t)\) denote the small transverse displacement at position \(x\) and time \(t\).

A concrete example is a guitar string of length 0.65 m; at any interior point the string element has moved up or down by a few millimetres while the slope stays below 0.1.

Formally, the unknown is the scalar field
\[
u:\mathbb{R}\times[0,\infty)\to\mathbb{R},\qquad (x,t)\mapsto u(x,t).
\]

> [!WARNING]
> If the string is allowed to stretch longitudinally, tension is no longer constant and the derivation collapses.

### Step 2 — Isolate an infinitesimal control volume
Cut the string at \(x\) and \(x+\Delta x\). The segment between these points has mass \(\rho\Delta x\) and moves only vertically under the assumption of small slopes.

### Step 3 — Resolve the tension vectors
At the right end the tension vector is approximately \(T(\partial_x u(x+\Delta x,t),1)\) (normalised for small slope). Its vertical component is \(T\partial_x u(x+\Delta x,t)\). At the left end the vertical component is \(-T\partial_x u(x,t)\).

### Step 4 — Apply Newton’s second law in the vertical direction
Net vertical force equals mass times vertical acceleration:
\[
T\bigl(\partial_x u(x+\Delta x,t)-\partial_x u(x,t)\bigr)=\rho\Delta x\cdot\partial_{tt}u(x,t).
\]

### Step 5 — Divide by \(\Delta x\) and take the limit
\[
T\frac{\partial_x u(x+\Delta x,t)-\partial_x u(x,t)}{\Delta x}=\rho\partial_{tt}u(x,t).
\]
Let \(\Delta x\to0\); the difference quotient becomes a partial derivative:
\[
T\partial_{xx}u=\rho\partial_{tt}u.
\]

### Step 6 — Introduce wave speed and obtain the canonical form
Define
\[
c=\sqrt{\frac{T}{\rho}}.
\]
The equation simplifies to the textbook statement
\[
\partial_{tt}u=c^2\partial_{xx}u.
\]

## 5. Worked examples — every step shown

**Example 1 — Constant-tension string**  
*Given:* \(T=100\,\text{N}\), \(\rho=0.01\,\text{kg/m}\).  
*Find:* the numerical value of \(c\).  
Divide: \(c^2=100/0.01=10000\), hence \(c=100\,\text{m/s}\).  
*Why* the division is valid: both quantities are given as constants, so the ratio is immediate.  
**\(c=100\,\text{m/s}\)**  

*Reflection:* The only arithmetic step already reveals that wave speed grows with the square root of tension.

**Example 2 — Derivation with variable density**  
*Given:* \(\rho(x)=\rho_0(1+x/L)\).  
*Find:* the PDE that replaces the constant-coefficient wave equation.  
Mass of segment: \(\rho(x)\Delta x\). Net force unchanged: \(T(\partial_x u|_{x+\Delta x}-\partial_x u|_x)\).  
Divide by \(\Delta x\) and pass to the limit:
\[
T\partial_{xx}u=\rho(x)\partial_{tt}u.
\]
*Why* density stays inside: it is no longer constant and cannot be cancelled.  
**\(T u_{xx}=\rho(x)u_{tt}\)**  

*Reflection:* The derivation is identical until the last algebraic cancellation; variable coefficients appear naturally.

**Example 3 — Inclusion of gravity**  
*Given:* uniform gravity \(g\) acting downward.  
*Find:* the modified PDE.  
Add body force \(-\rho g\Delta x\) on the right-hand side of Newton’s law. After dividing by \(\Delta x\) and taking \(\Delta x\to0\):
\[
T u_{xx}-\rho g=\rho u_{tt}.
\]
*Why* the extra term survives: gravity is distributed, not a boundary force.  
**\(u_{tt}=c^2u_{xx}-g\)**  

*Reflection:* The equilibrium solution is a catenary; the dynamic wave equation rides on top of that static shape.

**Example 4 — Small-slope linearisation check**  
*Given:* exact tension angle \(\theta=\arctan u_x\).  
*Find:* the precise vertical component and its small-slope limit.  
Exact vertical component at right end: \(T\sin\theta=T u_x/\sqrt{1+u_x^2}\).  
Taylor expand for \(|u_x|\ll1\): \(\sqrt{1+u_x^2}\approx1\), recovering \(T u_x\).  
*Why* the approximation is taken after force balance: the PDE itself is already linear.  
**Linearised vertical force recovers \(T\partial_x u\)**  

*Reflection:* The step that produces linearity is the only place where the small-slope hypothesis enters; everything else is exact.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating tension as a vector of length \(T\Delta x\) | Confusing force with force density          | Always resolve the unit tangent at each cut. |
| Forgetting the minus sign on the left-end tension   | Misidentifying inward versus outward normals | Draw the free-body diagram every time.       |
| Cancelling \(\rho\) when it is \(\rho(x)\)          | Habit from constant-density problems        | Keep \(\rho\) on the right until the limit.  |
| Writing ordinary rather than partial derivatives    | Thinking of \(u(x)\) only                   | Write \(u_{tt}\) and \(u_{xx}\) explicitly.  |
| Omitting the limit \(\Delta x\to0\)                 | Believing the finite-difference equation is already the PDE | State the difference quotient then pass to the limit in one sentence. |
| Adding a damping term without justification         | Importing the telegraph equation too early  | Introduce damping only after the ideal derivation is complete. |
| Confusing \(c\) with phase velocity of a single Fourier mode | Not realising every wavenumber travels at the same \(c\) | Verify that \(c=\sqrt{T/\rho}\) is independent of wavelength. |

## 7. The textbook-precise statement
Let \(\Omega=(0,L)\times(0,\infty)\). Suppose the string is perfectly flexible, tension \(T>0\) is constant, linear density \(\rho>0\) is constant, and slopes remain small. Then the transverse displacement \(u\in C^2(\Omega)\) satisfies the initial-boundary-value problem
\[
\begin{cases}
u_{tt}=c^2u_{xx} & \text{in }\Omega,\\
u(0,t)=u(L,t)=0 & t>0,\\
u(x,0)=f(x),\quad u_t(x,0)=g(x) & x\in(0,L),
\end{cases}
\]
where \(c=\sqrt{T/\rho}\). (Evans, *Partial Differential Equations*, 2nd ed., §2.4.1.)

## 8. Visual — diagram or schematic
```text
x-axis: 0 ---------------- x ---------------- x+Δx ---------------- L
String at rest:  -------------------------------------------
Displaced:          ^u(x)               ^u(x+Δx)
Tension arrows:     T↗ (angle θ)        T↘ (angle φ)
Vertical components: +T sinθ            –T sinφ
Segment mass:       ρ Δx
Acceleration:       u_tt (upward positive)
```
The diagram shows a short element of length \(\Delta x\) whose ends carry tension vectors whose vertical projections differ by the curvature term that becomes \(T u_{xx}\Delta x\).

## 9. The memory technique
1. **The hook** — Picture a tiny piece of string “being yanked back by two neighbours that disagree on slope”; the disagreement is exactly the second derivative.  
2. **What to overlearn** — The constant \(c=\sqrt{T/\rho}\) and the canonical operator \(\partial_{tt}-c^2\partial_{xx}\).  
3. **Spaced-repetition schedule** — Re-derive the PDE from Newton’s law at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start with an arbitrary segment \(\Delta x\), write the two tension vectors, apply \(F=ma\), divide by \(\Delta x\), pass to the limit.

## 10. What this unlocks
The 1-D wave equation is the gateway PDE for the method of characteristics, d’Alembert’s explicit solution formula, energy methods, and the classification of second-order PDEs into hyperbolic, parabolic and elliptic types.  

- d’Alembert’s formula for the infinite line  
- Separation of variables on finite intervals  
- Domain of dependence and finite propagation speed  
- Energy conservation identity \(\frac{d}{dt}\int(\rho u_t^2+T u_x^2)dx=0\)  
- Numerical schemes (leapfrog, characteristics) that generalise to higher-dimensional hyperbolic systems

## 11. Self-check — five questions, no answers
1. Derive the wave equation when the string lies on a smooth horizontal table that exerts a restoring force \(-ku\) per unit length.  
2. Show that if \(\rho=\rho(x)\) the quantity \(c^2=T/\rho(x)\) is no longer constant; write the resulting PDE.  
3. A student writes \(u_{tt}=c^2u_x\); identify the precise algebraic mistake that produced this first-order equation.  
4. Compute the dimensions of \(c\) from \(T\) and \(\rho\) and verify they match metres per second.  
5. Explain why the same derivation fails for a beam that resists bending (Euler–Bernoulli).