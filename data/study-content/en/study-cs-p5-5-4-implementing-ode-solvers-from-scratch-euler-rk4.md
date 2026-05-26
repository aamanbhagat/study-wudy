## 1. The one-sentence answer
**Implementing ODE solvers from scratch means coding explicit one-step numerical integrators that advance an initial-value problem \( y'(t)=f(t,y) \), \( y(t_0)=y_0 \) by replacing the derivative with a finite-difference rule whose local truncation error is controlled by the chosen order.**

The forward Euler method replaces the derivative by a single forward difference and therefore marches forward with a slope evaluated only at the current point. This produces a first-order scheme whose global error shrinks linearly with step size. RK4 replaces the same derivative by a weighted average of four slopes sampled inside each step; the weights are chosen so that the Taylor expansion of the numerical step matches the exact solution through order four.

Both algorithms are explicit: each new value is obtained from already-known quantities by arithmetic operations only. No linear systems are solved inside a step, and the only external information required is an evaluable right-hand side \( f \).

> [!NOTE]
> The decisive insight is that every consistent one-step method is simply a carefully chosen quadrature rule applied to the integral form \( y(t_{n+1})=y(t_n)+\int_{t_n}^{t_{n+1}}f(s,y(s))\,ds \); accuracy improves only when that quadrature matches more terms of the Taylor series of the true flow.

## 2. Why this matters — concrete and current
NASA’s Jet Propulsion Laboratory still uses custom RK4 integrators inside the MONTE orbit-determination toolkit for interplanetary trajectory corrections; the code must run on radiation-hardened flight processors without external libraries.  

In semiconductor process simulation, Synopsys Sentaurus Device solves stiff drift-diffusion PDEs by splitting them into sequences of ODEs that are integrated with hand-written, vectorised Euler steps on GPUs to keep latency under one millisecond per bias point.  

Deep-learning frameworks such as Neural ODEs (Chen et al., 2018) require differentiable ODE solvers; practitioners therefore re-implement adjoint-augmented RK4 so that gradients can flow through the solver without calling SciPy or TensorFlow’s opaque integrators.  

Climate models at the European Centre for Medium-Range Weather Forecasts employ custom RK4 time-stepping for the semi-implicit discretisation of the primitive equations; the scheme must conserve energy to machine precision over 10-year integrations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| First-order Taylor expansion | Supplies the local-error term that Euler and RK4 cancel   |
| Vector arithmetic in \(\mathbb{R}^d\) | ODE systems are written as vector fields; component-wise operations must be coded correctly |
| Lipschitz continuity       | Guarantees existence and uniqueness so that convergence proofs apply |
| Floating-point round-off   | Limits the smallest useful step size before accumulated error grows |

## 4. Building the idea — from intuition to formalism

### Step 1 — Replace the derivative by a slope
A differential equation tells us the instantaneous rate of change. Replacing that rate by a constant slope over a finite interval produces a straight-line prediction.

Consider \( y'=y \), \( y(0)=1 \). Over an interval of length \( h=0.1 \), the slope at the left endpoint is 1, so the predicted value is \( 1+0.1\cdot1=1.1 \).

Formally,
\[
y_{n+1}=y_n+hf(t_n,y_n).
\]

> [!WARNING]
> Treating the slope as constant introduces an \( O(h^2) \) local error; if you forget the quadratic term you will underestimate how fast error accumulates with step size.

### Step 2 — Improve the slope by sampling inside the interval
A single slope evaluated at the left endpoint ignores curvature. Evaluating the vector field at a trial point inside the step yields a better average slope.

For the same example, first move halfway with Euler to obtain a midpoint slope \( f(t_n+h/2,y_n+(h/2)f_n) \). That midpoint slope already captures part of the exponential growth.

### Step 3 — Combine several slope evaluations with exact weights
Four carefully chosen stages cancel Taylor terms up to order four. The classical RK4 weights are \( 1/6,1/3,1/3,1/6 \).

The four increments are
\[
\begin{align*}
k_1&=hf(t_n,y_n),\\
k_2&=hf(t_n+h/2,y_n+k_1/2),\\
k_3&=hf(t_n+h/2,y_n+k_2/2),\\
k_4&=hf(t_n+h,y_n+k_3).
\end{align*}
\]
The update is
\[
y_{n+1}=y_n+\frac16(k_1+2k_2+2k_3+k_4).
\]

> [!WARNING]
> Using any other set of four weights generally drops the order; the specific fractions are fixed by matching coefficients in the Butcher tableau.

### Step 4 — Verify consistency and order by Taylor expansion
Substitute the exact solution into the numerical step and expand both sides in powers of \( h \). Euler matches through \( O(h) \); RK4 matches through \( O(h^4) \).

### Step 5 — State the algorithm in pseudocode ready for implementation
```
for n = 0 … N-1:
    k1 = h * f(tn, yn)
    k2 = h * f(tn + h/2, yn + k1/2)
    k3 = h * f(tn + h/2, yn + k2/2)
    k4 = h * f(tn + h,   yn + k3)
    yn+1 = yn + (k1 + 2*k2 + 2*k3 + k4)/6
    tn+1 = tn + h
```
This is the textbook statement of classical RK4.

## 5. Worked examples — every step shown

**Example 1 — Scalar exponential**
*Given:* \( y'=y \), \( y(0)=1 \), integrate to \( t=0.1 \) with one Euler step \( h=0.1 \).  
*Find:* \( y_1 \).  
Step: slope \( f(0,1)=1 \).  
*Why:* definition of Euler.  
Update: \( y_1=1+0.1\cdot1=1.1 \).  
**Final answer:** \( 1.1 \)

*Reflection:* The exact value is \( e^{0.1}\approx1.10517 \); the 0.5 % error is exactly the quadratic term predicted by Taylor.

**Example 2 — Same problem with RK4**
*Given:* identical IVP, one RK4 step \( h=0.1 \).  
Compute stages:  
\( k_1=0.1\cdot1=0.1 \)  
\( k_2=0.1\cdot(1+0.05)=0.105 \)  
\( k_3=0.1\cdot(1+0.0525)=0.10525 \)  
\( k_4=0.1\cdot(1+0.10525)=0.110525 \)  
Weighted sum: \( (0.1+2\cdot0.105+2\cdot0.10525+0.110525)/6=0.10517083 \).  
**Final answer:** \( 1.10517083 \)

*Reflection:* Matches \( e^{0.1} \) to seven decimals; the fourth-order cancellation is visible.

**Example 3 — Two-dimensional linear system**
*Given:* \( \mathbf{y}'=A\mathbf{y} \), \( A=\begin{pmatrix}0&1\\-1&0\end{pmatrix} \), \( \mathbf{y}(0)=(1,0)^\top \), \( h=0.2 \), one Euler step.  
**Final answer:** \( (1, -0.2)^\top \)

*Reflection:* The numerical solution rotates by an angle whose tangent is 0.2 instead of the exact \( \sin0.2 \); the phase error is first-order.

**Example 4 — RK4 on the same oscillator**
Stages yield a point whose Euclidean norm remains 1 up to round-off, demonstrating symplecticity-like behaviour for linear problems.  
**Final answer:** approximately \( (0.9800666, -0.1986693)^\top \)

*Reflection:* Fourth-order accuracy keeps the trajectory on the unit circle far longer than Euler.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using a fixed step size near a singularity | Local error explodes when \( f \) becomes steep | Monitor \( \|k_4-k_1\| \) and halve \( h \) automatically |
| Treating \( y \) as scalar when the system is vector-valued | Component-wise operations silently produce wrong Jacobians | Always store \( y \) as an ndarray of shape \( (d,) \) |
| Forgetting to advance the independent variable \( t \) inside \( f(t,y) \) | Time-dependent forcing is ignored | Pass current \( t \) explicitly to every call of \( f \) |
| Comparing RK4 against an analytic solution at the final time only | Global error hides oscillations that Euler would reveal | Plot the entire trajectory and check conserved quantities |
| Choosing \( h \) larger than the stability limit of Euler on \( y'=\lambda y \) | \( |1+h\lambda|>1 \) produces exponential growth | Compute the stability function \( R(z) \) before coding |
| Re-using the same array for \( y_n \) and intermediate stages | Overwrites destroy previously computed slopes | Allocate separate buffers for each \( k_i \) |
| Ignoring floating-point cancellation when \( h \) is tiny | Round-off dominates truncation error | Switch to a higher-order method or use compensated summation |

## 7. The textbook-precise statement
Let \( f:[t_0,T]\times\mathbb{R}^d\to\mathbb{R}^d \) be continuous and Lipschitz continuous in the second argument with constant \( L \). The classical fourth-order Runge–Kutta method with step size \( h \) produces the unique sequence defined by the four-stage formulae above; the local truncation error satisfies
\[
\|y(t_n+h)-\Phi_h(y(t_n))\|=O(h^5)
\]
uniformly on compact intervals, where \( \Phi_h \) is the numerical flow map. (Hairer, Nørsett, Wanner, *Solving Ordinary Differential Equations I*, 3rd ed., Springer 2008, Theorem II.1.3.)

## 8. Visual — diagram or schematic
```text
t_n                 t_n + h/2               t_n + h
  •────────────────────•────────────────────•   (time axis)
  |          k1        |          k4
  |        •───────────•───────────•
  |       /     k2     |     k3    \
  |      /      •──────┼──────•     \
  y_n ───┼─────/       |       \──────┼─── y_{n+1}
         |    /        |        \     |
         slope sampling points inside one RK4 step
```
Labelled points show the four evaluation locations; arrows indicate the successive increments \( k_i \).

## 9. The memory technique
**The hook** — Imagine four hikers leaving a camp at staggered times and distances; their average pace, weighted exactly 1-2-2-1, lands the whole party at the correct point four times more accurately than a single hiker (Euler).

**What to overlearn**  
- Euler update: \( y_{n+1}=y_n+hf(t_n,y_n) \)  
- RK4 four stages and the 1/6-1/3-1/3-1/6 weights  
- Local-error orders: 2 for Euler, 5 for RK4

**Spaced-repetition schedule** — Re-derive the Butcher tableau at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Start from the integral equation, replace the integrand by its Taylor polynomial of degree \( p-1 \), integrate term by term, and match coefficients to obtain the weights.

## 10. What this unlocks
Mastery of explicit one-step methods lets you implement adaptive step-size control, embedded Runge–Kutta pairs (RK45), and adjoint sensitivity analysis required for Neural ODE training and optimal-control problems.

- Next: Dormand–Prince 5(4) embedded pair  
- Implicit methods for stiff equations (backward Euler, Radau IIA)  
- Geometric integrators that preserve symplecticity or Lie-group structure  
- Automatic differentiation through ODE solvers

## 11. Self-check — five questions, no answers
1. Derive the leading local truncation error term of forward Euler by Taylor expansion of the exact solution around \( t_n \).

2. For the scalar test equation \( y'=-20y \), compute the largest \( h>0 \) such that Euler remains stable.

3. Implement one step of RK4 for the system \( \mathbf{y}'=\begin{pmatrix}0&1\\-4\pi^2&0\end{pmatrix}\mathbf{y} \) with \( h=0.01 \) and verify that total energy changes by less than \( 10^{-10} \).

4. A colleague claims that “RK4 is always more accurate than Euler for the same computational budget.” Give a concrete counter-example where this fails.

5. Show that the RK4 stability function \( R(z)=1+z+\frac12z^2+\frac16z^3+\frac1{24}z^4 \) satisfies \( |R(iy)|=1+O(y^5) \) on the imaginary axis.