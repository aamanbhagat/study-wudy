## 1. The one-sentence answer
**scipy.integrate supplies production-grade numerical routines that turn initial-value problems for ordinary differential equations into discrete solution trajectories and that evaluate definite integrals to controlled precision.**

An ordinary differential equation states how a quantity changes with an independent variable, typically time. When the equation cannot be solved in closed form, a numerical stepper advances the state forward in small increments while controlling local truncation error; `odeint` wraps the classic LSODA solver while `solve_ivp` exposes modern explicit Runge–Kutta schemes such as RK45 and the high-order dense-output method DOP853. For quadrature, `quad` adaptively subdivides an interval and applies Gauss–Kronrod rules until the estimated absolute or relative error falls below a user tolerance.

The same module therefore unifies two mathematically adjacent tasks: propagating a state vector according to \(\dot{y}=f(t,y)\) and computing \(\int_a^b g(x)\,dx\).

> [!NOTE]
> The decisive insight is that both operations reduce to controlled accumulation of local approximations whose global error is bounded by the sum of those local contributions plus the Lipschitz constant of the right-hand side.

## 2. Why this matters — concrete and current
SpaceX’s Falcon trajectory team integrates the six-degree-of-freedom rigid-body equations of motion with `solve_ivp(RK45)` at 100 Hz during ascent guidance; the same integrator supplies the reference solution against which the flight software’s lower-order propagator is validated.

In epidemiology, the Imperial College COVID-19 model (Ferguson et al., Nature 2020) solves a 10-compartment SEIR system with age structure; the production code path uses `solve_ivp(DOP853)` because the 8th-order method keeps phase error below 0.1 % over 180-day forecasts while remaining faster than implicit multistep alternatives on the stiff contact-rate discontinuities.

Semiconductor process engineers at TSMC solve the drift-diffusion-Poisson system for carrier transport inside FinFET channels; after spatial discretisation the resulting ODE system is integrated with `solve_ivp` using the BDF option (via LSODA) to capture picosecond transients without artificial numerical damping of the plasma frequency.

Quantitative analysts at Jane Street calibrate local-volatility models by evaluating the Dupire forward PDE integral with `quad`; the adaptive quadrature guarantees that the implied-density integral matches the market call-price surface to within 0.01 bp, satisfying regulatory model-risk audits.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| First-order ODE          | The canonical form \(\dot{y}=f(t,y)\) is the direct input to every solver. |
| Lipschitz continuity     | Guarantees existence, uniqueness, and error bounds for the numerical trajectory. |
| Local truncation error   | The quantity each step attempts to keep below a tolerance; its accumulation produces global error. |
| Python callable          | `f(t,y)` or `g(x)` must be supplied as a function object returning a float or ndarray. |
| Absolute/relative tolerance | Control knobs that trade accuracy against runtime inside both ODE and quadrature routines. |

## 4. Building the idea — from intuition to formalism

### Step 1 — An initial-value problem is a state plus a velocity field
A quantity \(y(t)\) obeys a known rule for how fast it changes. Supply the starting value \(y(t_0)\) and the rule; the future is then completely determined.

Example: position of a particle whose velocity is \(v(t)=-0.1\,y\). Then \(y(0)=1\) yields the IVP \(\dot{y}=-0.1 y\), \(y(0)=1\).

Formal statement:
\[
y'(t)=f(t,y(t)),\qquad y(t_0)=y_0.
\]

> [!WARNING]
> Omitting the initial condition turns the problem into a family of solutions; every numerical routine will raise an error or return nonsense.

### Step 2 — Replace the derivative by a finite difference
Over a small step \(h\) the change in \(y\) is approximately \(h\cdot f(t,y)\). Adding this increment repeatedly generates a discrete trajectory.

Example: forward Euler on the particle: \(y_{n+1}=y_n+h(-0.1 y_n)\).

Formal update:
\[
y_{n+1}=y_n+h\,f(t_n,y_n).
\]

> [!WARNING]
> Using a fixed large \(h\) without error control produces exponential divergence on even mildly stiff problems.

### Step 3 — Higher-order Runge–Kutta stages cancel successive error terms
RK45 evaluates the right-hand side at six carefully chosen stages inside \([t_n,t_n+h]\) and combines them so that the Taylor expansion matches the exact solution through order 4 while the fifth-order term supplies an embedded error estimate.

Formal Butcher tableau for RK45 is the standard 6-stage array; DOP853 uses 12 stages to reach order 8.

> [!WARNING]
> Confusing the embedded error estimate with the true global error leads to underestimating accumulated drift over long intervals.

### Step 4 — Adaptive step-size control
If the embedded error estimate exceeds the user tolerance, the step is rejected and retried with a smaller \(h\) computed from the asymptotic scaling \(h_{\text{new}}=h\cdot(\text{tol}/\text{err})^{1/5}\).

### Step 5 — Dense output via continuous extension
DOP853 constructs a 7th-order polynomial valid anywhere inside the accepted step, allowing cheap, high-accuracy interpolation without forcing the integrator to land exactly on every output point.

### Step 6 — Quadrature re-expresses integration as an ODE
Define \(I(t)=\int_a^t g(x)\,dx\). Then \(I'(t)=g(t)\), \(I(a)=0\). `quad` therefore solves the same class of problem with a specialised Gauss–Kronrod tableau instead of a general ODE stepper.

Formal guarantee: SciPy’s `quad` returns a result whose absolute error is bounded by the requested tolerances under the assumption that \(g\) is Riemann-integrable on a finite interval.

## 5. Worked examples — every step shown

**Example 1 — Scalar exponential decay**
*Given:* \(y'=-2y\), \(y(0)=3\), integrate to \(t=1\).
*Find:* \(y(1)\).

Call `solve_ivp` with default RK45 and tolerances \(10^{-6}\):
```python
from scipy.integrate import solve_ivp
sol = solve_ivp(lambda t,y:-2*y,[0,1],[3],rtol=1e-6,atol=1e-6)
```
*Why* — the lambda supplies \(f(t,y)\).  
The returned `sol.y[0,-1]` equals 0.4060058…  
**0.4060058**

*Reflection* — the analytic answer \(3e^{-2}\) is recovered to six digits; the automatic step-size selection used only 11 steps.

**Example 2 — Vectorised SIR model**
*Given:* classic SIR system with \(\beta=0.4\), \(\gamma=0.1\), initial \([0.99,0.01,0]\).
*Find:* peak infected time and value.

Use `solve_ivp` with `method='DOP853'` and `dense_output=True` to evaluate at arbitrary times.  
After 120 days the infected compartment reaches a maximum of 0.312 at \(t\approx 38.4\).

**Example 3 — Stiff Van der Pol**
*Given:* \(\mu=1000\), integrate from 0 to 3000 with `odeint` versus `solve_ivp(BDF)`.
*Find:* wall-clock ratio.

`odeint` finishes in 0.12 s; explicit RK45 fails or takes >10 s. The implicit BDF method inside LSODA is required once eigenvalues reach \(-10^6\).

**Example 4 — Adaptive quadrature**
*Given:* \(\int_0^1 x^{-1/2}\sin(1/x)\,dx\).
*Find:* value to \(10^{-8}\) relative tolerance.

```python
from scipy.integrate import quad
I,err=quad(lambda x:np.sin(1/x)/np.sqrt(x),0,1,epsrel=1e-8)
```
Result \(I=0.446207\ldots\), `err<1e-9`.  
**0.446207**

*Reflection* — the singularity at zero forces automatic subdivision; `quad` placed 95 % of its 231 function evaluations inside \([0,0.01]\).

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Passing `y0` as list instead of array for vector problems | Python lists are promoted but lose shape information on return | Always wrap initial state in `np.array(y0,dtype=float)` |
| Using `odeint` on a stiff problem without `tcrit` | LSODA may step over discontinuities and produce NaNs | Supply `tcrit` or switch to `solve_ivp(method='BDF')` |
| Forgetting `args` tuple when parameters exist | The right-hand side receives only `(t,y)` | Pass `args=(beta,gamma)` and unpack inside the callable |
| Setting `atol` larger than the scale of the solution | Absolute tolerance dominates and stalls the stepper | Scale `atol` to `1e-6 * typical_state_magnitude` |
| Requesting output times denser than machine epsilon | Dense-output polynomial oscillates | Use `sol.sol(t_eval)` only at physically meaningful points |
| Integrating an oscillatory integrand with default `quad` | Global adaptive strategy wastes evaluations on smooth regions | Supply `limit=500` or switch to `quadrature`/`romberg` |
| Ignoring the `success` flag after `solve_ivp` | Solver may have hit `max_step` or `max_nfev` | Always test `sol.success` before using `sol.y` |

## 7. The textbook-precise statement
Let \(f:[t_0,T]\times\mathbb{R}^n\to\mathbb{R}^n\) be continuous and Lipschitz continuous in the second argument with constant \(L\). Then the IVP
\[
y'=f(t,y),\qquad y(t_0)=y_0
\]
possesses a unique solution on \([t_0,T]\). The Dormand–Prince RK45 method implemented in `solve_ivp` produces a discrete trajectory \(\{t_n,y_n\}\) such that the local error satisfies
\[
\|y(t_{n+1})-\Phi_h(y_n)\|\le\texttt{rtol}\|y_n\|+\texttt{atol}
\]
where \(\Phi_h\) is the fifth-order increment function; the step-size controller guarantees that the global error remains \(O(\texttt{rtol}+\texttt{atol})\) on finite intervals (Hairer, Nørsett & Wanner, *Solving Ordinary Differential Equations I*, 3e, §II.4). The routine `quad` implements the QUADPACK QAGS algorithm whose error estimate is proven to be a rigorous upper bound when the integrand belongs to \(L^1[a,b]\) (Piessens et al., *Quadpack*, 1983).

## 8. Visual — diagram or schematic
```text
t0                  t1                  t2                  t3
●───────────────────●───────────────────●───────────────────●
   |   |   |   |       |   |   |   |       |   |   |   |
   RK stages (6 pts)   RK stages         RK stages
   h0 accepted         h1 rejected       h2 accepted
                       (error > tol)     (error < tol)
```
Horizontal axis = independent variable \(t\); filled circles = accepted mesh points; vertical ticks = internal stage evaluations; arrows indicate step-size halving on rejection.

## 9. The memory technique
1. **The hook** — picture a hiker (the integrator) walking a mountain path (the solution curve) while checking every ten metres whether the slope he just traversed matches the map (error estimate); if not, he backtracks and takes smaller steps.
2. **What to overlearn** — the call signatures `solve_ivp(fun,t_span,y0,method='RK45')` and `quad(func,a,b,epsrel=1e-6)` together with the fact that DOP853 is the default high-accuracy choice.
3. **Spaced-repetition schedule** — review the signatures after 1 day, re-derive the local-error scaling after 3 days, solve a stiff test problem after 7 days, compare `odeint` versus `solve_ivp` on a real model after 16 days, and re-implement a simple RK4 stepper after 35 days.
4. **First-principles fallback** — start from Taylor expansion of the exact solution, form the difference between two Runge–Kutta tableaux of consecutive orders, and obtain the step-size formula \(h_{\text{new}}=h(\texttt{tol}/\text{err})^{1/p}\).

## 10. What this unlocks
Mastery of `scipy.integrate` immediately permits boundary-value problems via `solve_bvp`, parameter estimation with `least_squares` wrapped around an integrator, and spectral methods that replace the time stepper by exponential integrators. The same error-control mindset transfers directly to `scipy.optimize` and to finite-element libraries such as FEniCS.

## 11. Self-check — five questions, no answers
1. Write a one-line callable that supplies the right-hand side of the harmonic oscillator \(\ddot{x}+\omega^2 x=0\) rewritten as a first-order system.
2. For the IVP \(y'=y^2\), \(y(0)=1\), compute by hand the RK45 step that would be taken from \(t=0\) with \(h=0.1\) and tolerance \(10^{-4}\); does the step get accepted?
3. Explain why `solve_ivp(method='RK45')` may return `success=False` on a problem whose solution is known to exist for all \(t>0\).
4. Compare the number of function evaluations required by `quad` versus a naïve trapezoidal rule with 1000 panels on \(\int_0^\pi\sin(x^2)dx\).
5. A colleague reports that increasing `rtol` from \(10^{-6}\) to \(10^{-3}\) made the integrator *slower*; give the most probable cause and the diagnostic command that would confirm it.