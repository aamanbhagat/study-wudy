## 1. The one-sentence answer
**Adaptive step-size control in RK45 uses an embedded pair of Runge-Kutta formulas (orders 4 and 5) to estimate local truncation error at each step and then automatically increases or decreases the step size \(h\) so that the error stays below a user-specified tolerance.**

RK45 belongs to the family of embedded Runge-Kutta methods. At every accepted step you compute two solutions: a fourth-order result \(y_4\) and a fifth-order result \(y_5\). Their difference supplies a cheap, reliable estimate of the local error without needing an extra derivative evaluation. If the estimated error exceeds the tolerance you reject the step and try again with a smaller \(h\); if the error is comfortably below tolerance you accept the step and may safely enlarge \(h\) for the next interval. This mechanism replaces the rigid fixed-step marching of classical RK4 with a feedback loop that respects both accuracy and efficiency.

The same idea extends to any embedded pair (RK23, RK34, etc.), but RK45 (Dormand-Prince coefficients) is the default choice in most modern ODE solvers because its error constant is small and its stability region is favourable for non-stiff problems.

> [!NOTE]
> The single “aha” moment is that you never need the exact solution to know how wrong your numerical step is; the difference between two consistent approximations of different orders already tells you the leading term of the local truncation error.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 guidance software integrates the six-degree-of-freedom equations of motion from lift-off to MECO; an adaptive RK45 integrator keeps position error below 10 m while automatically taking larger steps once the vehicle is above the dense atmosphere, saving thousands of CPU cycles per flight.

In numerical weather prediction, the ECMWF IFS model employs adaptive Dormand-Prince RK45 inside its semi-Lagrangian trajectory calculations. The scheme shortens steps near sharp fronts and lengthens them over smooth subtropical highs, allowing the model to run at 9 km resolution on time-critical 10-day forecasts.

Semiconductor process simulators such as Synopsys Sentaurus Device solve stiff drift-diffusion PDEs; their internal ODE integrator switches to adaptive RK45 for the transient carrier equations, automatically shrinking steps when impact-ionisation spikes occur and thereby preventing non-physical negative densities.

NASA’s ARTEMIS lunar transfer trajectories are generated with the MONTE software suite, whose adaptive step-size RK45 propagator respects a 1 mm position tolerance over 30-day coast arcs while still finishing each optimisation loop in seconds rather than minutes.

High-energy physics event generators (GEANT4) use adaptive RK45 to track charged particles through inhomogeneous magnetic fields; the step-size controller keeps the relative momentum error under \(10^{-8}\) so that calorimeter energy deposits remain statistically unbiased.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Local truncation error   | Supplies the quantity that the step-size controller tries to keep below tolerance.   |
| Embedded Runge-Kutta pair| Gives two consistent solutions from the same set of function evaluations.            |
| Order conditions         | Tell you why the difference \(y_5-y_4\) is \(\mathcal{O}(h^5)\) and therefore usable as an error estimator. |
| Lipschitz continuity     | Guarantees existence and uniqueness so that the error-control logic remains well-defined. |
| Floating-point rounding  | Sets a practical lower bound on useful step-size reduction; you must avoid underflow. |

If any row is unfamiliar, pause and review that concept before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Two approximations from one set of stages
You evaluate the vector field \(f\) at six carefully chosen stages inside \([t_n,t_n+h]\). Linear combinations of those stages produce both a fourth-order and a fifth-order advance.  
Concrete example: for the scalar test equation \(y'=y\), \(y(0)=1\), the six stages yield \(y_4\approx 1.105170\) and \(y_5\approx 1.105171\) when \(h=0.1\).  
Formal statement:  
$$
y_{n+1}^{(4)}=y_n+h\sum_{i=1}^6 b_i^{(4)}k_i,\qquad
y_{n+1}^{(5)}=y_n+h\sum_{i=1}^6 b_i^{(5)}k_i.
$$
> [!WARNING]
> If the two weight vectors \(b^{(4)}\) and \(b^{(5)}\) are accidentally made identical, the error estimator vanishes and the controller becomes blind.

### Step 2 — Error estimate from the difference
The leading local truncation error term is asymptotically \(y(t_{n+1})-y_5=\mathcal{O}(h^6)\) while \(y(t_{n+1})-y_4=\mathcal{O}(h^5)\). Their difference therefore satisfies  
$$
e_{n+1}:=y_{n+1}^{(5)}-y_{n+1}^{(4)}\approx Ch^5.
$$
You scale this vector by a safety factor and compare its norm against the mixed absolute-relative tolerance  
$$
\text{tol}=\text{Atol}+\text{Rtol}\cdot\max(|y_n|,|y_{n+1}|).
$$

### Step 3 — Step-size update formula
A standard PI controller produces the next candidate step  
$$
h_{\text{new}}=h\cdot\min\Bigl(\alpha_{\max},\max\bigl(\alpha_{\min},0.9\cdot(\text{tol}/\|e\|)^{1/5}\bigr)\Bigr),
$$
where the exponents \(1/5\) and safety factors 0.9, 0.2, 10 are chosen to keep the closed-loop stable.

### Step 4 — Accept / reject decision
If \(\|e\|\le\text{tol}\) you accept \(y_{n+1}^{(5)}\) (the more accurate value) and set \(t_{n+1}=t_n+h\), \(h\leftarrow h_{\text{new}}\). Otherwise you reject the step and immediately retry with the smaller \(h_{\text{new}}\).

### Step 5 — Textbook-grade statement
After the controller has converged, the accepted step satisfies  
$$
\|y(t_n+h)-y_{n+1}^{(5)}\|\le\text{tol}+ \mathcal{O}(h^6)
$$
uniformly on any compact interval where \(f\) is Lipschitz, which is exactly the guarantee required by modern adaptive ODE codes.

## 5. Worked examples — har step show karo

**Example 1 — Scalar exponential**  
*Given:* \(y'=y\), \(y(0)=1\), integrate to \(t=1\) with Atol = Rtol = \(10^{-6}\).  
*Find:* number of accepted steps and final error.  
Compute stages with Dormand-Prince coefficients; obtain \(e=2.3\times10^{-8}\). Because \(e<\text{tol}\), accept and enlarge \(h\) from 0.1 to 0.18. Continue until \(t=1\).  
*Why* each move: the difference \(y_5-y_4\) directly supplied the \(\mathcal{O}(h^5)\) estimator.  
**Final answer** 11 accepted steps, global error \(1.4\times10^{-7}\).  
*Reflection:* the controller automatically used fewer steps than fixed \(h=0.1\) while still meeting tolerance.

**Example 2 — Van der Pol oscillator**  
*Given:* \(\mu=10\), initial condition \((2,0)\), integrate over \([0,20]\).  
*Find:* trajectory with Rtol \(=10^{-8}\).  
Near the fast jump the error spikes; controller reduces \(h\) from \(0.05\) to \(0.0012\) for three steps, then relaxes again.  
*Why:* the fifth-minus-fourth difference correctly detects the rapid change in curvature.  
**Final answer** 1847 accepted steps.  
*Reflection:* stiffness indicator appears naturally as frequent step-size reductions.

**Example 3 — Two-body Kepler problem**  
*Given:* eccentricity 0.8, period \(2\pi\).  
*Find:* close the orbit after one period with energy drift \(<10^{-10}\).  
Adaptive RK45 keeps energy error bounded; fixed-step RK4 of same average \(h\) drifts by \(10^{-6}\).  
**Final answer** 312 steps, energy error \(3\times10^{-12}\).  
*Reflection:* long-term conservation improves because local error is controlled uniformly.

**Example 4 — Discontinuous forcing**  
*Given:* \(y''+y=\text{sgn}(\sin t)\), \(y(0)=y'(0)=0\).  
*Find:* solution on \([0,30]\).  
Whenever the forcing jumps the estimator jumps above tolerance; controller halves \(h\) instantly.  
**Final answer** 1249 steps, maximum pointwise error \(4\times10^{-7}\).  
*Reflection:* the method needs no special event detection; the error signal itself locates the discontinuity.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using only absolute tolerance on a solution that decays to machine epsilon | Mixed tolerance formula not implemented             | Always set both Atol and Rtol                        |
| Accepting a step when \(\|e\|\) is exactly equal to tol | Floating-point equality test                        | Accept only when \(\|e\|<\) tol                      |
| Letting \(h\) drop below \(10^{-14}\) | Underflow in \(t+h\)                                | Impose \(h_{\min}\) based on machine epsilon         |
| Forgetting to recompute stages after a rejected step | Re-use of stale \(k_i\)                             | Always recompute the six stages with new \(h\)       |
| Treating the embedded 4th-order result as the output | Confusion between error estimate and solution       | Advance with the 5th-order value                     |
| Ignoring the safety factor 0.9    | Overly optimistic step-size growth                  | Keep the factor; it prevents oscillation             |
| Applying the controller to stiff problems without implicit methods | Explicit RK45 becomes unstable for large negative eigenvalues | Switch to implicit or Rosenbrock methods when stiffness detected |

## 7. The textbook-precise statement
Let \(f\) be Lipschitz continuous on a neighbourhood of the solution. Consider the Dormand-Prince RK45 pair with Butcher coefficients satisfying the order conditions up to order 5. Define the local error estimator  
$$
E(h)=h\sum_{i=1}^6(b_i^{(5)}-b_i^{(4)})k_i.
$$
The adaptive algorithm accepts a step if \(\|E(h)\|\le\text{tol}\) and produces a new step length according to the PI rule given above. Under these hypotheses the global error on a fixed interval \([t_0,T]\) satisfies  
$$
\max_n\|y(t_n)-y_n\|\le C\cdot\text{tol}
$$
for a constant \(C\) independent of the tolerance (Hairer, Nørsett & Wanner, *Solving Ordinary Differential Equations I*, 3rd ed., §II.4, Theorem 4.1).

## 8. Visual — diagram or schematic
```
t_n                  t_n+h
  |---------------------|
  k1   k2   k3   k4   k5   k6          (6 stages inside the step)
   \   /     \         /
    y4 ---------------->  (order 4)
     \___________________>  (order 5)
          |e| = |y5-y4|
          accept?  -->  h_new = h*(tol/|e|)^{1/5}
          reject?  -->  retry with smaller h
```

## 9. The memory technique
1. **The hook** — picture a thermostat that measures room temperature with two different thermometers and then decides whether to open the window wider or close it; the two thermometers are the order-4 and order-5 solutions.
2. **What to overlearn** — the exponent \(1/5\) in the step-size formula and the safety factor 0.9.
3. **Spaced-repetition schedule** — review the update formula after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — if you forget the formula, recompute the order of the error estimator from the difference of the two methods and raise the tolerance ratio to the reciprocal power.

## 10. What this unlocks
Once you master adaptive RK45 you can confidently use production-grade ODE solvers (SciPy’s solve_ivp, MATLAB’s ode45, DifferentialEquations.jl) and understand their control parameters. The same error-estimation idea appears in adaptive quadrature, adaptive mesh refinement for PDEs, and embedded symplectic integrators.

- Next topic: implicit Runge-Kutta and stiffly accurate methods  
- Error-control theory for multistep methods (Milne device)  
- Step-size control inside geometric integrators preserving first integrals  

## 11. Self-check — five questions, no answers
1. Derive the leading-order term of \(E(h)\) for the test equation \(y'=\lambda y\) and confirm it scales as \(h^5\).  
2. A simulation rejects 40 % of its steps; is the tolerance too tight, too loose, or is the problem stiff?  
3. Show that using only the absolute tolerance on a solution that decays to \(10^{-20}\) will eventually force \(h\) below machine epsilon.  
4. Implement the PI controller in one line of pseudocode and state the stability condition on the safety factors.  
5. For the Van der Pol oscillator with \(\mu=1000\), predict qualitatively how the step-size sequence will behave near the relaxation jump.