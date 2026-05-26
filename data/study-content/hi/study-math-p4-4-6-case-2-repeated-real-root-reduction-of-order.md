## 1. The one-sentence answer
**When the characteristic equation of a second-order linear homogeneous ODE has a repeated real root \(r\), one solution is \(e^{rt}\) and the second independent solution is \(t e^{rt}\), obtained via reduction of order.**

Reduction of order works because the repeated root makes the two exponential solutions linearly dependent, so you must multiply the known solution by an unknown function \(v(t)\) and solve for it. This produces a first-order equation in \(v'\) that integrates directly to \(v(t) = t\). The method stays inside the constant-coefficient setting yet already shows the general technique used for variable-coefficient equations later.

The key point is that the Wronskian of \(e^{rt}\) and \(t e^{rt}\) is never zero, guaranteeing that these two functions span the full two-dimensional solution space.

> [!NOTE]
> The factor \(t\) appears precisely because the root is repeated; it is the simplest function whose derivative cancels the extra identical root in the characteristic polynomial.

## 2. Why this matters — concrete and current
In structural dynamics, Boeing and Airbus use repeated-root models to describe the damped vibration of control surfaces when two natural frequencies coincide; the \(t e^{rt}\) term captures the linear growth in amplitude that appears exactly at resonance before nonlinear saturation.

Semiconductor laser rate equations (used by companies such as Intel and Coherent) reduce to a second-order linear system whose characteristic roots become repeated at the onset of relaxation oscillation; the \(t e^{rt}\) solution predicts the exact timing of intensity spikes that must be suppressed by feedback circuits.

In orbital mechanics, the Clohessy–Wiltshire equations for relative satellite motion admit a repeated zero root; the resulting secular term \(t\) describes along-track drift that mission designers at NASA and ESA must cancel with periodic station-keeping burns.

Quantum optics papers on exceptional points (Nature Photonics, 2022) treat the repeated-root case of the non-Hermitian Schrödinger equation; the linear-in-time factor governs the algebraic rather than exponential decay observed in PT-symmetric micro-resonators.

Control-theory software (MATLAB’s `ode45` and Julia’s `DifferentialEquations.jl`) automatically switches to the repeated-root formula when the eigenvalue multiplicity test returns true, avoiding numerical cancellation that would otherwise produce spurious oscillations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| First-order linear ODE    | The reduction step always produces a first-order equation in \(v'\) |
| Wronskian determinant     | Proves linear independence after you obtain \(t e^{rt}\)  |
| Characteristic equation   | Tells you immediately when a root is repeated             |
| Exponential function      | Serves as the known first solution \(y_1 = e^{rt}\)       |

If any row is unfamiliar, pause and review that single concept before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Spot the repeated root
You are given \(ay'' + by' + cy = 0\). Form the characteristic polynomial \(ar^2 + br + c = 0\). When its discriminant \(b^2 - 4ac = 0\), a single root \(r = -b/(2a)\) appears with multiplicity two.  
**Concrete example.** Take \(y'' - 2y' + y = 0\). The polynomial \(r^2 - 2r + 1 = (r-1)^2\) has repeated root \(r=1\).  
Formal statement: if \(r\) satisfies both \(p(r)=0\) and \(p'(r)=0\), then \(e^{rt}\) is a solution but supplies only one dimension of the solution space.  
> [!WARNING]  
> Treating the repeated root as two distinct roots and writing \(c_1 e^{rt} + c_2 e^{rt}\) collapses to a single arbitrary constant; you lose the second independent solution.

### Step 2 — Assume the second solution has the form \(v(t) y_1(t)\)
Let \(y_1 = e^{rt}\). Seek \(y_2 = v(t) e^{rt}\). Differentiate twice and substitute into the ODE. All terms containing \(v\) (without derivatives) cancel because \(y_1\) already solves the equation.  
**Concrete example.** For the equation above, substitute \(y = v e^t\):  
\(y' = v' e^t + v e^t\),  
\(y'' = v'' e^t + 2v' e^t + v e^t\).  
The ODE reduces to \(v'' e^t = 0\), hence \(v'' = 0\).  
Formal step: after substitution the coefficient of \(v\) vanishes identically, leaving a first-order equation in \(w = v'\).  
> [!WARNING]  
> Forgetting to recompute \(y''\) fully (especially the product-rule terms) produces an extra non-zero \(v\) term that ruins the cancellation.

### Step 3 — Solve the resulting first-order equation for \(w = v'\)
After cancellation you obtain an equation of the form \(a w' + (2a r + b) w = 0\). Because \(r\) is repeated we have \(2a r + b = 0\), so the equation collapses to \(a w' = 0\).  
Thus \(w = C\), a constant.  
**Concrete example.** In the earlier calculation \(v'' = 0\) integrates at once to \(v' = C\).  
Formal statement: \(w(t) = C \exp\left(-\int \frac{2ar+b}{a}\,dt\right)\). The exponent vanishes, leaving a constant.  
> [!WARNING]  
> If you do not notice that \(2ar + b = 0\), you will integrate an unnecessary exponential and obtain a wrong extra factor.

### Step 4 — Integrate to recover \(v(t)\) and form \(y_2\)
\(v(t) = \int w\,dt = C t + D\). The constant \(D\) merely reproduces a multiple of \(y_1\), so the new solution is carried by the \(C t\) term.  
Hence \(y_2 = t e^{rt}\).  
Formal statement: the general solution is  
\[y = (c_1 + c_2 t) e^{rt}.\]  
> [!WARNING]  
> Dropping the integration constant that multiplies \(t\) loses the second arbitrary constant required for a second-order equation.

### Step 5 — Verify linear independence via the Wronskian
Compute  
\[W(y_1,y_2) = \begin{vmatrix} e^{rt} & t e^{rt} \\ r e^{rt} & (1 + r t) e^{rt} \end{vmatrix} = e^{2rt} \neq 0.\]  
Since \(W \neq 0\), the pair spans the full solution space.  
This finishes the rigorous derivation.

## 5. Worked examples — har step show karo

**Example 1 — Basic repeated root**  
*Given:* \(y'' - 4y' + 4y = 0\).  
*Find:* general solution.  
Characteristic equation: \(r^2 - 4r + 4 = (r-2)^2 = 0\), repeated root \(r=2\).  
Assume \(y_2 = v e^{2t}\).  
After substitution: \(v'' e^{2t} = 0 \implies v'' = 0 \implies v' = C \implies v = C t + D\).  
Thus \(y_2 = t e^{2t}\).  
General solution: \(y = (c_1 + c_2 t) e^{2t}\).  
**Why each move:** the vanishing of the first-derivative coefficient after substitution is forced by the repeated-root condition.  
**Final answer**  
\[ y = (c_1 + c_2 t) e^{2t} \]  
*Reflection:* the example is the simplest possible case; the same algebra appears unchanged in every later example.

**Example 2 — Non-homogeneous forcing added later**  
*Given:* \(y'' - 2y' + y = 4e^t\).  
*Find:* particular solution using undetermined coefficients informed by the repeated-root solution.  
Homogeneous solution already known: \(y_h = (c_1 + c_2 t) e^t\).  
Because \(e^t\) and \(t e^t\) are both in \(y_h\), multiply the usual guess by another \(t\): \(y_p = A t^2 e^t\).  
Differentiate twice, substitute, collect coefficients of \(t^2 e^t, t e^t, e^t\); the \(t^2\) and \(t\) terms cancel, leaving \(2A = 4\), so \(A=2\).  
**Final answer**  
\[ y_p = 2 t^2 e^t \]  
*Reflection:* recognition that the forcing function already solves the homogeneous equation forces the extra \(t\) factor—exactly the same mechanism that produced the repeated-root solution.

**Example 3 — Initial-value problem**  
*Given:* \(y'' + 6y' + 9y = 0\), \(y(0)=2\), \(y'(0)=-3\).  
Repeated root \(r=-3\).  
General solution \(y = (c_1 + c_2 t) e^{-3t}\).  
Apply \(y(0)=2\): \(c_1 = 2\).  
\(y' = -3(c_1 + c_2 t)e^{-3t} + c_2 e^{-3t}\).  
\(y'(0) = -3c_1 + c_2 = -3 \implies c_2 = 6\).  
**Final answer**  
\[ y = (2 + 6t) e^{-3t} \]  
*Reflection:* initial conditions simply fix the two arbitrary constants; no new technique appears.

**Example 4 — Higher-order reduction insight**  
*Given:* \((D-1)^3 y = 0\).  
One solution is \(e^t\). Reduction of order applied twice yields the chain \(e^t, t e^t, t^2 e^t\).  
After first reduction you obtain a repeated-root equation of order 2 whose solution we already know; the second reduction repeats the identical procedure.  
**Final answer**  
\[ y = (c_1 + c_2 t + c_3 t^2) e^t \]  
*Reflection:* the pattern \(t^k e^{rt}\) for multiplicity \(k+1\) is generated by iterated reduction of order.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Writing \(c_1 e^{rt} + c_2 e^{rt}\) | Forgetting that identical roots give dependent functions | Always test the Wronskian after writing the candidate pair |
| Missing the product-rule terms in \(y''\) | Rushing substitution                                | Write every derivative explicitly before plugging in |
| Treating the equation as variable-coefficient too early | Not noticing that coefficients are constant         | Check that \(a,b,c\) are numbers before starting     |
| Losing the integration constant that multiplies \(t\) | Thinking constants are irrelevant                   | Keep both constants until the very end               |
| Sign error in the characteristic root | Arithmetic slip when \(r = -b/(2a)\)                | Recalculate the root from the quadratic formula each time |
| Using \(t^2 e^{rt}\) for a double root | Confusing multiplicity 2 with multiplicity 3        | Count the algebraic multiplicity of the root first   |
| Forgetting to verify the final pair solves the ODE | Over-reliance on the method without checking        | Substitute \(y_2 = t e^{rt}\) back into the ODE once |

## 7. The textbook-precise statement
Let \(a y'' + b y' + c y = 0\) with \(a \neq 0\) and constant real coefficients. Suppose the characteristic polynomial \(p(r) = a r^2 + b r + c\) possesses a repeated real root \(r_0\) (i.e., \(p(r_0) = p'(r_0) = 0\)). Then the functions \(y_1(t) = e^{r_0 t}\) and \(y_2(t) = t e^{r_0 t}\) are linearly independent solutions on \(\mathbb{R}\), and the general solution is
\[
y(t) = (c_1 + c_2 t) e^{r_0 t}, \qquad c_1, c_2 \in \mathbb{R}.
\]
(Boyce & DiPrima, *Elementary Differential Equations*, 11e, §3.4, Theorem 3.4.2.)

## 8. Visual — diagram or schematic
```text
t-axis
  |
  |          y2 = t e^{rt}   (line with slope, through origin)
  |         /
  |        /
  |  y1 = e^{rt}   (pure exponential, always positive)
  |     *
  |    *
  +------------------------> t
```
Both curves share the same initial slope direction at t=0 when r>0; the linear factor t makes y2 grow faster for large t.

## 9. The memory technique
1. **The hook** — picture a single runner (the exponential) suddenly forced to carry a backpack labelled “t”; the backpack appears only when two identical roots try to occupy the same lane.
2. **What to overlearn** — the pair \(\{e^{rt}, t e^{rt}\}\) and the Wronskian identity \(W = e^{2rt}\).
3. **Spaced-repetition schedule** — review the derivation at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — if you forget the formula, start from \(y = v(t) e^{rt}\), substitute, notice the coefficient of \(v\) vanishes, integrate the resulting \(v'' = 0\).

## 10. What this unlocks
You now possess the complete solution set for any constant-coefficient second-order equation. The same reduction-of-order idea extends immediately to:
- Cauchy–Euler equations,
- reduction of order for non-homogeneous terms (variation of parameters),
- higher-order equations with repeated roots,
- series solutions about ordinary points when an indicial root repeats.

## 11. Self-check — five questions, no answers
1. For \(y'' + 2y' + y = 0\), write the two independent solutions and compute their Wronskian.
2. Show that if \(r\) is a repeated root then \(t e^{rt}\) cannot be written as any constant multiple of \(e^{rt}\).
3. Solve \(y'' - 6y' + 9y = 0\) with \(y(0)=1\), \(y'(0)=3\); plot the solution mentally for \(t>0\).
4. Why does the substitution \(y = v(t) e^{rt}\) always reduce the order by exactly one when \(y_1\) is already known?
5. Identify the mistake: a student claims the general solution of \(y'' - 4y' + 4y = 0\) is \(c_1 e^{2t} + c_2 e^{2t}\).