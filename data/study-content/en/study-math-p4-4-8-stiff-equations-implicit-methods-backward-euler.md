## 1. The one-sentence answer
**Stiff equations are initial-value problems whose solutions contain components that decay on widely separated time scales, forcing explicit integrators to use impractically small steps for stability, while the backward Euler method removes this restriction by solving an implicit algebraic equation at each step.**

The core difficulty appears when a differential equation has both fast and slow modes. An explicit scheme such as forward Euler evaluates the right-hand side only at the current point; any fast-decaying mode then imposes a strict upper bound on the allowable step size, even after that mode has become negligible. Implicit schemes evaluate the right-hand side at the unknown future point, converting the update into a nonlinear equation whose solution can remain stable for arbitrarily large steps.

Backward Euler is the simplest such implicit scheme. It replaces the forward difference with a backward difference and therefore inherits the damping property of the exact solution for linear problems with negative eigenvalues. The price is that a (usually cheap) nonlinear solve replaces the explicit function evaluation.

> [!NOTE]
> The decisive property is A-stability: the method remains stable for every positive step size whenever the exact solution itself is stable, a guarantee that no explicit Runge–Kutta method of order greater than zero can ever possess.

## 2. Why this matters — concrete and current
Circuit simulators such as SPICE solve systems containing transistors whose time constants range from picoseconds to milliseconds; without an implicit integrator the transient analysis of a single logic gate would require billions of steps.

Chemical kinetics codes used by combustion engineers integrate reaction networks whose rate constants span ten or more orders of magnitude; NASA’s CEA and Cantera packages rely on implicit multistep methods descended from backward Euler to advance stiff ignition problems in engine design.

Atmospheric chemistry models run inside global climate simulations must advance ozone cycles whose photochemical lifetimes vary from seconds in the stratosphere to days in the troposphere; the implicit treatment allows daily time steps instead of sub-second ones while preserving mass conservation.

Semiconductor device modeling at companies such as Intel and TSMC solves drift-diffusion equations whose carrier recombination terms produce eigenvalues of magnitude 10^12 s^-1; backward-Euler-based Newton solvers keep the mesh motion stable across bias points that would otherwise trigger numerical blow-up.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| First-order autonomous ODE \( y' = f(t,y) \) | The definition of stiffness and every integrator begins from this equation. |
| Forward Euler update formula | Backward Euler is obtained by a one-line sign change; stability comparison is immediate. |
| Linear test equation \( y' = \lambda y \), \( \operatorname{Re}\lambda < 0 \) | All stability statements for stiff problems reduce to this scalar case via linearization. |
| Absolute stability region in the complex \( h\lambda \)-plane | Determines whether a method permits large steps on stiff spectra. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The source of stiffness
A linear system \( y' = Ay \) is stiff when the eigenvalues of \( A \) differ by many orders of magnitude and all lie in the left half-plane.  
Consider \( y' = -100y + 1 \), \( y(0)=0 \). The exact solution is \( y(t) = \frac{1}{100}(1-e^{-100t}) \). After \( t \approx 0.05 \) the transient has vanished, yet any explicit integrator must still respect the fast scale.  
Formally, stiffness ratio \( \max|\lambda_i|/\min|\lambda_i| \gg 1 \).  
> [!WARNING]  
> Treating stiffness as mere “rapid variation of the solution” leads to the false belief that adaptive step-size control alone solves the problem; the restriction is stability, not accuracy.

### Step 2 — Explicit versus implicit discretization
Forward Euler replaces \( y'(t_n) \) by \( (y_{n+1}-y_n)/h \), yielding an explicit formula. Backward Euler replaces \( y'(t_{n+1}) \) by the same difference, producing an implicit algebraic equation.  
For the test equation the forward step is \( y_{n+1} = (1+h\lambda)y_n \); the backward step is \( y_{n+1} = y_n/(1-h\lambda) \).  
> [!WARNING]  
> Confusing the evaluation time of \( f \) with the location of the difference quotient produces the wrong sign in the stability function and reverses stability conclusions.

### Step 3 — Derivation of the backward Euler step
Start from the integral form \( y(t_{n+1}) = y(t_n) + \int_{t_n}^{t_{n+1}} f(s,y(s))\,ds \). Approximate the integrand by its value at the right endpoint.  
The resulting formula is  
\[ y_{n+1} = y_n + h f(t_{n+1},y_{n+1}). \]  
For a general nonlinear \( f \) this is a nonlinear equation in the unknown \( y_{n+1} \).  
> [!WARNING]  
> Omitting the implicit dependence when differentiating for Newton’s method yields an incorrect Jacobian and loss of quadratic convergence.

### Step 4 — Linear stability function
Substitute the test equation into the update:  
\[ y_{n+1} = \frac{1}{1-h\lambda} y_n. \]  
The amplification factor \( R(z) = 1/(1-z) \), \( z = h\lambda \), satisfies \( |R(z)| < 1 \) for all \( z \) with \( \operatorname{Re} z < 0 \). This is the definition of A-stability.  
> [!WARNING]  
> Plotting only the real axis hides the fact that the stability region of backward Euler contains the entire left half-plane; many students therefore underestimate its damping on complex eigenvalues.

### Step 5 — Convergence order and consistency
Taylor expansion about \( t_n \) shows that the local truncation error is \( O(h^2) \), hence global order 1. The method is consistent and zero-stable, therefore convergent by the Dahlquist equivalence theorem.  
> [!WARNING]  
> Increasing order by extrapolation does not automatically preserve A-stability; the implicit trapezoidal rule is A-stable of order 2, but higher-order explicit methods never are.

## 5. Worked examples — every step shown

**Example 1 — Scalar linear test**  
*Given:* \( y' = -20y \), \( y(0)=1 \), integrate to \( t=1 \) with \( h=0.2 \).  
*Find:* \( y_1 \) produced by backward Euler.  
Step: write the update  
\[ y_1 = y_0 + 0.2(-20 y_1). \]  
*Why:* the right-hand side is evaluated at the unknown point \( t_1 \).  
Solve the linear equation:  
\[ y_1 + 4 y_1 = 1 \implies y_1 = 0.2. \]  
**0.2**  
*Reflection:* the exact value is \( e^{-4}\approx 0.018 \); the method over-damps but remains bounded, whereas forward Euler with the same step produces \( |1-4|=3>1 \) and diverges.

**Example 2 — Nonlinear scalar**  
*Given:* \( y' = -y^3 \), \( y(0)=1 \), \( h=1 \).  
*Find:* \( y_1 \).  
The implicit equation is \( y_1 = 1 - y_1^3 \).  
Rearrange to the cubic \( y_1^3 + y_1 - 1 = 0 \).  
Newton iteration starting at 0.7 yields \( y_1 \approx 0.6823 \) after two steps.  
**0.6823**  
*Reflection:* the algebraic solve replaces the explicit evaluation; for scalar problems a few Newton iterations are cheaper than reducing the step size of an explicit method.

**Example 3 — Linear system**  
*Given:* \( y' = A y \) with \( A = \operatorname{diag}(-1,-100) \), \( y(0)=(1,1)^\top \), \( h=0.5 \).  
*Find:* \( y_1 \).  
Backward Euler gives the linear system \( (I - h A) y_1 = y_0 \).  
The matrix \( I - h A \) is diagonal with entries 1.5 and 51; inversion is immediate and both components remain positive.  
**\( y_1 = (2/3, 1/51)^\top \)**  
*Reflection:* the fast component is damped by a factor 1/51 regardless of step size; explicit Euler would require \( h<0.02 \).

**Example 4 — Newton solve for a small nonlinear system**  
*Given:* the two-dimensional autonomous system  
\[ y_1' = -y_1 + y_2^2, \quad y_2' = -100 y_2, \]  
with initial value \( (1,1)^\top \) and \( h=0.1 \).  
*Find:* one backward-Euler step.  
The nonlinear map is  
\[ F(Y) = Y - y_n - h f(Y) = 0. \]  
Jacobian \( J = I - h Df \).  
One Newton iteration from the predictor \( Y^{(0)}=y_n \) already produces a residual below \( 10^{-8} \).  
**\( Y \approx (0.913, 0.377) \)**  
*Reflection:* the stiff eigenvalue forces the implicit solve, yet the Newton correction remains small because the fast transient has already decayed.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using forward Euler with adaptive step size on a stiff problem | Local error control does not detect linear instability | Monitor the Lipschitz constant or switch to an implicit method when step-size reductions exceed a threshold |
| Solving the implicit equation with fixed-point iteration | Spectral radius of the iteration matrix exceeds 1 for large \( |h\lambda| \) | Always use Newton or a stiff solver; fixed-point iteration converges only for \( h < 2/|\lambda| \) |
| Forgetting that order 1 limits global accuracy | Students expect higher-order behaviour from A-stable methods | Compare with the implicit trapezoidal rule when moderate accuracy is required |
| Applying backward Euler to index-2 DAEs without projection | Hidden algebraic constraints are not preserved | Use a specialized DAE solver or reduce index first |
| Treating the nonlinear residual tolerance independently of \( h \) | Truncation error and algebraic error become unbalanced | Set the Newton tolerance proportional to \( h^2 \) (local error order) |
| Assuming A-stability implies damping of oscillatory modes | Backward Euler damps oscillations too strongly (L-stability) | Switch to the trapezoidal rule when phase accuracy matters |
| Implementing the method without reusing the Jacobian | Cost appears prohibitive | Freeze the Jacobian over several steps; the convergence radius remains large for mildly nonlinear problems |

## 7. The textbook-precise statement
A linear multistep method is A-stable if its stability region contains the closed left half-plane. Backward Euler, given by the formula
\[ y_{n+1} - y_n = h f(t_{n+1},y_{n+1}), \]
is a consistent, zero-stable, A-stable method of order 1. For any fixed \( T>0 \) and any mesh with \( h\le h_0 \), the global error on \( [0,T] \) satisfies
\[ \max_n \| y(t_n) - y_n \| \le C h \]
provided \( f \) is Lipschitz and the exact solution is sufficiently smooth. (Hairer & Wanner, *Solving Ordinary Differential Equations II*, 2nd ed., Springer 1996, Theorem 3.4 and Corollary 3.5.)

## 8. Visual — diagram or schematic
```
t-axis: 0 ---------------- h ---------------- 2h ...
          y0               y1                 y2
          |                |                  |
forward:  f(t0,y0) ---->   y1 explicit
backward:                f(t1,y1) <--- solve for y1
```
The arrow for backward Euler points leftward, indicating that the derivative at the future point determines the step; the algebraic loop must be closed by a nonlinear solver before advancing.

## 9. The memory technique
1. **The hook** — picture a fast skier racing down a steep slope while a slow hiker follows the same trail; explicit methods must crawl at the skier’s pace, backward Euler lets you teleport the hiker forward in one safe leap because the mountain itself pulls the solution back.  
2. **What to overlearn** — the update \( y_{n+1}=y_n + h f(t_{n+1},y_{n+1}) \), the stability function \( R(z)=1/(1-z) \), and the statement “A-stable of order 1”.  
3. **Spaced-repetition schedule** — derive the stability function at 1 day, solve a two-dimensional stiff system at 3 days, compare global errors with forward Euler at 7 days, implement Newton with frozen Jacobian at 16 days, and state the Dahlquist second barrier at 35 days.  
4. **First-principles fallback** — begin from the integral equation, replace the integrand by its right-endpoint value, obtain the implicit relation, linearize about the test equation, and verify \( |R(z)|<1 \) for \( \operatorname{Re} z<0 \).

## 10. What this unlocks
Backward Euler supplies the prototype for every subsequent implicit method used on stiff problems.  

- Implicit trapezoidal and midpoint rules improve order while retaining A-stability.  
- BDF methods extend the same idea to variable-order multistep formulas.  
- Stiffly accurate Runge–Kutta methods (Radau IIA, Lobatto IIIC) inherit L-stability from the backward-Euler concept.  
- Modern exponential integrators and Rosenbrock–Wanner schemes linearize the same implicit relation.  
- DAE integrators (e.g., RADAU5) rely on the same Newton–Krylov infrastructure first exercised on backward Euler.

## 11. Self-check — five questions, no answers
1. For the scalar equation \( y'=- \lambda y \) with \( \lambda>0 \), compute the largest \( h \) such that forward Euler remains stable; repeat for backward Euler.  
2. Show that the stability region of backward Euler contains the disk \( |z+1|<1 \) and the entire left half-plane.  
3. Derive the iteration matrix of Newton’s method applied to the backward-Euler equation for \( y'=f(y) \).  
4. A linear system has eigenvalues \( -1 \) and \( -10^6 \). Which step-size restriction, if any, does backward Euler impose for stability on an interval of length 10?  
5. Explain why replacing the Newton tolerance by a fixed absolute tolerance independent of \( h \) can destroy the observed order of the method on a nonlinear stiff problem.