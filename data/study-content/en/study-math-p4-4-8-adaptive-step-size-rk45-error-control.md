## 1. The one-sentence answer
**Adaptive step-size control with RK45 uses an embedded pair of Runge-Kutta formulas (orders 4 and 5) to estimate local truncation error at each step and automatically adjust the step length so that the error stays below a user-specified tolerance.**

A fixed-step Runge-Kutta method marches forward with one chosen \(h\). When the solution changes rapidly the error grows; when it changes slowly the same \(h\) wastes work. The RK45 pair computes two approximations from the same set of stage values, one of order 4 and one of order 5. Their difference supplies a reliable estimate of the local error without any extra function evaluations.

That estimate is compared with a tolerance that may combine absolute and relative components. If the estimate exceeds the tolerance the step is rejected and retried with a smaller \(h\); otherwise the step is accepted and the next trial step is increased. The process repeats, producing a variable sequence of steps that automatically concentrates effort where the solution is stiff or rapidly varying.

> [!NOTE]
> The single “aha” is that one extra line of arithmetic (the difference between the two embedded solutions) turns an otherwise blind integrator into a self-monitoring algorithm that spends computational effort only where it is needed.

## 2. Why this matters — concrete and current
NASA’s trajectory design tools for the Artemis program integrate the restricted three-body problem with Dormand–Prince RK45; the adaptive controller keeps position error below 10 m while allowing steps of several hours when the spacecraft coasts far from the Moon.

Modern weather models at the European Centre for Medium-Range Weather Forecasts embed RK45 inside semi-Lagrangian advection schemes; local error control automatically shortens steps near fronts and lengthens them over calm ocean, cutting total runtime by roughly 30 % compared with fixed-step RK4.

Semiconductor device simulators such as Sentaurus Device solve drift-diffusion equations on unstructured meshes; the adaptive RK45 stepper detects carrier-density spikes at pn-junctions and refines the time step to picoseconds, preventing non-physical oscillations that would otherwise appear with a fixed step.

Molecular-dynamics packages such as GROMACS use embedded RK45 for the deterministic part of Langevin integrators when high-accuracy sampling of rare events is required; the error controller guarantees that energy drift remains below 10^{-6} kT per nanosecond without manual tuning of the time step.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| First-order ODE initial-value problem \(y'=f(t,y)\), \(y(t_0)=y_0\) | The entire discussion is about advancing this equation   |
| Local truncation error of a Runge–Kutta method | Supplies the quantity that the controller tries to bound |
| Vector norms \(\|\cdot\|\) (usually 2-norm or max-norm) | Used to turn the error vector into a single scalar      |
| Elementary scaling arguments for step-size selection | Produces the formula that updates \(h\) after each step  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Two formulas from the same stages
A classical fourth-order Runge–Kutta method needs four stages. The Dormand–Prince pair re-uses those four stages plus two more to obtain a fifth-order result at essentially the same cost. The difference between the two results is therefore available “for free.”

### Step 2 — Local error estimate
Let \(y_{n+1}^{(4)}\) and \(y_{n+1}^{(5)}\) be the fourth- and fifth-order advances from \(t_n\). Their difference
\[
e_{n+1}=y_{n+1}^{(5)}-y_{n+1}^{(4)}
\]
is an asymptotically correct estimate of the local truncation error of the fourth-order method.

### Step 3 — Mixed absolute-relative tolerance
A scalar tolerance is formed as
\[
\text{tol}=\text{atol}+\text{rtol}\cdot\max(|y_n|,|y_{n+1}|).
\]
The normalized error is then \(\|e_{n+1}\|/\text{tol}\). This prevents both absolute and relative blow-up.

### Step 4 — Step-size update formula
If the normalized error \(\varepsilon>1\) the step is rejected and a new trial step is computed from
\[
h_{\text{new}}=h\cdot\min\bigl(0.9,\;0.8\,\varepsilon^{-1/4}\bigr).
\]
When \(\varepsilon\le1\) the step is accepted and the next trial step uses the milder exponent \(-1/5\):
\[
h_{\text{new}}=h\cdot\min\bigl(1.5,\;0.9\,\varepsilon^{-1/5}\bigr).
\]

### Step 5 — Safety factors and rejection logic
The constants 0.9, 0.8 and 1.5 are safety factors that keep the controller from oscillating. A rejected step is never advanced; the integrator simply recomputes the same interval with the reduced \(h\).

### Step 6 — Textbook statement of the algorithm
The complete procedure—stage evaluation, error estimation, acceptance test, and step-size adjustment—constitutes the adaptive Dormand–Prince RK45 method with error control.

## 5. Worked examples — every step shown

**Example 1 — Scalar test equation**  
*Given:* \(y'=y\), \(y(0)=1\), integrate to \(t=1\) with atol = rtol = 10^{-6}\).  
*Find:* first accepted step and its size.  
Compute the six stages of Dormand–Prince from \(t=0\), \(h=0.1\).  
Obtain \(y_1^{(4)}=1.105170\) and \(y_1^{(5)}=1.105171\).  
Error estimate: \(e=1.4\times10^{-6}\).  
Normalized error \(\varepsilon=1.4>1\), reject.  
New \(h=0.1\times0.8\times(1.4)^{-0.25}\approx0.072\).  
Recompute with \(h=0.072\); now \(\varepsilon=0.3<1\), accept.  
**Final answer**  
\(h=0.072\) accepted after one rejection.  

*Reflection*  
The first trial step was too large; the controller automatically discovered the correct scale in a single iteration.

**Example 2 — Linear system**  
*Given:* \(y'=-10y+10\), \(y(0)=0\), atol=10^{-8}\).  
*Find:* step sequence on \([0,0.5]\).  
The exact solution approaches 1 exponentially. Early steps shrink to \(h\approx0.01\) because the transient is fast; after \(t>0.3\) the controller enlarges steps to \(h\approx0.2\).  

*Reflection*  
Automatic step growth illustrates the method’s economy on problems with widely separated time scales.

**Example 3 — Nonlinear pendulum**  
*Given:* \(\theta''+\sin\theta=0\), \(\theta(0)=\pi-0.01\), \(\theta'(0)=0\).  
*Find:* maximum local error observed with rtol=10^{-4}.  
The adaptive controller keeps the fourth-order error below \(3\times10^{-5}\) throughout the long chaotic trajectory while using steps that vary by a factor of 12.  

*Reflection*  
Even when the solution is not smooth, the local-error test still guarantees the requested accuracy.

**Example 4 — Stiff linear test**  
*Given:* \(y'=-1000(y-\sin t)+\cos t\), \(y(0)=0\).  
*Find:* behaviour near \(t=0\).  
The controller immediately reduces \(h\) to \(O(10^{-3})\) and maintains it until the fast transient decays; thereafter steps grow.  

*Reflection*  
RK45 is not A-stable; the error controller compensates by shrinking \(h\) rather than by changing the method.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using only absolute tolerance on a solution that grows exponentially | atol alone cannot scale with the solution magnitude | Always combine atol and rtol                         |
| Accepting a step when the error vector is large in only one component | Component-wise max-norm hides the largest entry     | Use a consistent vector norm (usually 2-norm)        |
| Forgetting to recompute stages after a rejected step | The stage values were computed with the wrong \(h\) | Store stages only after acceptance                   |
| Setting the safety factor to 1.0    | Controller then oscillates between accept/reject    | Keep at least the conventional 0.8–0.9 factors       |
| Ignoring the minimum step-size floor | Machine underflow or infinite loop on impossible tolerance | Impose a sensible \(h_{\min}\) and warn the user     |
| Applying the controller to an explicit method on a stiff problem | Local error estimate becomes meaningless            | Switch to an implicit or Rosenbrock method           |
| Re-using the same \(h\) after many acceptances without checking | Solution may suddenly stiffen                       | Re-evaluate error at least every few dozen steps     |

## 7. The textbook-precise statement
An embedded Runge–Kutta pair of orders \(p\) and \(p+1\) consists of two formulas sharing the same nodes \(c_i\) and weights \(a_{ij}\). The local error of the lower-order formula satisfies
\[
y(t_n+h)-y_{n+1}^{(p)}=h^{p+1}\phi(t_n,y_n)+O(h^{p+2}).
\]
The difference \(y_{n+1}^{(p+1)}-y_{n+1}^{(p)}\) therefore supplies an asymptotically correct estimator of that leading term. Provided \(f\) is Lipschitz and the step-size sequence remains bounded away from zero, the adaptive algorithm produces a mesh such that the global error at the endpoint is bounded by a constant times the prescribed tolerance (Hairer, Nørsett & Wanner, *Solving Ordinary Differential Equations I*, 2nd ed., §II.4).

## 8. Visual — diagram or schematic
```text
t_n                  t_n+h
 |--------------------|
 |  stages 1..6       |  <-- same six evaluations
 |--------------------|
        |                       |
   y4 = order-4 result     y5 = order-5 result
        |                       |
        +--------- diff --------+
                  |
             error e
                  |
            compare |e| ? tol
             /           \
          >tol          <=tol
           |               |
        reject          accept
           |               |
      h := 0.8 h ε^{-1/4}   advance solution
           |               |
        retry            h := 0.9 h ε^{-1/5}
                           next interval
```

## 9. The memory technique
1. **The hook** — Picture a hiker who carries two watches: one cheap, one expensive. Their disagreement tells him whether he is walking too fast for the terrain; he slows down or speeds up accordingly. The two watches are the order-4 and order-5 solutions.

2. **What to overlearn**  
   - The update exponents: \(-1/4\) on rejection, \(-1/5\) on acceptance.  
   - The normalized tolerance definition atol + rtol·max(|y|).

3. **Spaced-repetition schedule** — Review the two exponents and the tolerance formula after 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Re-derive the step-size formula from the leading-term assumption \(e\propto h^{5}\) (order-5 accuracy) by solving for the factor that brings the predicted error exactly to tolerance.

## 10. What this unlocks
Mastery of RK45 error control is the gateway to production-grade ODE software and to the design of modern variable-step integrators.

- Implicit and Rosenbrock methods with embedded error estimators  
- Step-size control for delay differential equations  
- Adaptive mesh refinement in PDE solvers that use method-of-lines  
- Construction of high-order extrapolation codes (e.g., ODEX)  

## 11. Self-check — five questions, no answers
1. For the scalar test \(y'=y\), derive the exact factor by which \(h\) should be multiplied after an accepted step if the observed normalized error is exactly 0.01 and the safety factor is 0.9.

2. A user supplies atol = 0 and rtol = 10^{-8} for a solution that reaches magnitude 10^{12}. What numerical difficulty appears and why?

3. Explain why the controller uses the milder exponent \(-1/5\) rather than \(-1/4\) after a successful step.

4. Suppose the same six stages are evaluated but the order-5 weights are replaced by random numbers. Does the resulting “error estimate” still control the true local error? Give a one-sentence justification.

5. An adaptive RK45 code reports that 40 % of all attempted steps were rejected. Is this necessarily a sign of poor implementation, or can it be optimal? Support your answer with the asymptotic cost argument.