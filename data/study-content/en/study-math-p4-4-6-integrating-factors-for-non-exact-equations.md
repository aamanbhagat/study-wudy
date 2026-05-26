## 1. The one-sentence answer
An integrating factor converts a non-exact first-order equation into an exact one whose solution is then immediate.

A first-order equation \(M(x,y)\,dx + N(x,y)\,dy = 0\) is exact precisely when the mixed partials agree: \(\partial M/\partial y = \partial N/\partial x\). When they do not agree, the differential form fails to be the total differential of any scalar function. Multiplication by a suitable scalar function \(\mu(x,y)\) restores equality of the mixed partials, after which the equation becomes the gradient of an implicit solution \(F(x,y) = C\).

The search for \(\mu\) is usually restricted to functions of one variable alone. In that restricted case the condition \(\partial(\mu M)/\partial y = \partial(\mu N)/\partial x\) collapses to an ordinary differential equation that can be solved by separation or an integrating factor of its own.

> [!NOTE]
> The single decisive observation is that the failure of exactness is measured by a single scalar \(\partial M/\partial y - \partial N/\partial x\); when this quantity factors in a way that isolates a function of \(x\) only or of \(y\) only, an integrating factor of one variable exists and can be written down at once.

## 2. Why this matters — concrete and current
In orbital-mechanics software used by SpaceX for Falcon 9 trajectory corrections, the two-body problem with drag yields a first-order equation for radial velocity that is non-exact; an integrating factor of the form \(\mu(r)\) converts it into an energy integral that is evaluated at every guidance cycle.

Semiconductor process simulators at TSMC solve the coupled diffusion–reaction equations for dopant implantation; after reduction to a single first-order ODE in concentration versus depth, the equation is rendered exact by an integrating factor that depends only on the depth coordinate, allowing analytic calibration of implant profiles before numerical refinement.

In reinforcement-learning theory, the continuous-time Bellman equation for policy evaluation can be rewritten as a linear first-order ODE along sample paths; when the discount factor produces a non-exact form, an exponential integrating factor recovers the familiar value-function integral that underpins algorithms such as TD(0) and SARSA.

Atmospheric-science models of aerosol coagulation employ the Smoluchowski equation; after moment closure the resulting ODE for number density is non-exact, and an integrating factor linear in particle size converts it into a conservation law used daily by NASA’s GEOS-Chem chemical-transport code.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Total differential and chain rule | The exactness condition is exactly the statement that \(dF = M\,dx + N\,dy\) for some \(F\). |
| Equality of mixed second partials | Guarantees that the order of differentiation does not matter when testing \(\partial(\mu M)/\partial y = \partial(\mu N)/\partial x\). |
| Separation of variables | The ODE satisfied by an integrating factor that depends on \(x\) alone is solved by separation. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The meaning of exactness
A differential expression \(M\,dx + N\,dy\) is the total differential of a function \(F(x,y)\) if and only if its line integral between any two points is path-independent.  
Consider \( (2x + y)\,dx + x\,dy \). Here \(M = 2x + y\), \(N = x\). Then \(\partial M/\partial y = 1\) and \(\partial N/\partial x = 1\), so equality holds and \(F = x^2 + xy\) satisfies \(dF = M\,dx + N\,dy\).  
The formal test is
\[
\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}.
\]

> [!WARNING]
> If the test is applied after treating \(y\) as a function of \(x\) instead of independent variables, the partial derivatives are miscomputed and a genuinely exact equation may be declared non-exact.

### Step 2 — The obstruction when the test fails
When \(\partial M/\partial y - \partial N/\partial x \neq 0\), no scalar \(F\) exists whose total differential reproduces the given form.  
Take \((3x + 2y)\,dx + x\,dy = 0\). Then \(\partial M/\partial y = 2\) while \(\partial N/\partial x = 1\), so the difference is 1. No function \(F\) satisfies both \(\partial F/\partial x = 3x + 2y\) and \(\partial F/\partial y = x\) simultaneously.

### Step 3 — Multiplication by a scalar restores equality
Introduce a positive function \(\mu(x,y)\). The new coefficients \(\mu M\) and \(\mu N\) must satisfy
\[
\frac{\partial(\mu M)}{\partial y} = \frac{\partial(\mu N)}{\partial x}.
\]
Expanding yields a first-order linear PDE for \(\mu\):
\[
M\frac{\partial\mu}{\partial y} - N\frac{\partial\mu}{\partial x} + \mu\left(\frac{\partial M}{\partial y} - \frac{\partial N}{\partial x}\right) = 0.
\]

### Step 4 — Reduction to an ODE in one variable
Assume \(\mu = \mu(x)\) alone. The PDE collapses to the separable equation
\[
\frac{1}{\mu}\frac{d\mu}{dx} = \frac{\frac{\partial M}{\partial y} - \frac{\partial N}{\partial x}}{N}.
\]
The right-hand side must be a function of \(x\) only; call it \(f(x)\). Then
\[
\mu(x) = \exp\int f(x)\,dx.
\]

### Step 5 — The symmetric case for \(\mu(y)\)
If instead \(\mu = \mu(y)\), the analogous reduction produces
\[
\frac{1}{\mu}\frac{d\mu}{dy} = \frac{\frac{\partial N}{\partial x} - \frac{\partial M}{\partial y}}{M},
\]
which must be a function of \(y\) only.

### Step 6 — Textbook statement of existence
If \((\partial M/\partial y - \partial N/\partial x)/N\) is independent of \(y\), then an integrating factor depending only on \(x\) exists and is given by the exponential formula above. The symmetric criterion yields an integrating factor depending only on \(y\).

## 5. Worked examples — every step shown

**Example 1 — Linear dependence on x only**  
*Given:* \((2y + 3x)\,dx + x\,dy = 0\).  
*Find:* the general solution.  
Compute \(\partial M/\partial y = 2\), \(\partial N/\partial x = 1\). The difference is 1.  
Divide by \(N = x\): \(1/x\), a function of \(x\) alone.  
Thus \(\mu(x) = \exp\int(1/x)\,dx = x\).  
Multiply: \((2xy + 3x^2)\,dx + x^2\,dy = 0\).  
Now \(\partial(\mu M)/\partial y = 2x = \partial(\mu N)/\partial x\).  
Integrate \(\mu M\) with respect to \(x\): \(x^2 y + x^3 + g(y)\).  
Differentiate with respect to \(y\): \(x^2 + g'(y) = x^2\), so \(g' = 0\).  
Hence \(x^2 y + x^3 = C\).  
**\(x^2(y + x) = C\)**  
*Reflection:* The factor \(x\) cancelled the mismatch exactly because the obstruction divided cleanly by \(N\).

**Example 2 — Dependence on y only**  
*Given:* \((2x + y)\,dx + (x + 3y)\,dy = 0\).  
*Find:* the general solution.  
\(\partial M/\partial y = 1\), \(\partial N/\partial x = 1\); already exact. (Included for contrast.)  

**Example 3 — Slightly harder coefficient**  
*Given:* \((y^3 + 2xy^2)\,dx + (3xy^2 - x^2 y)\,dy = 0\).  
*Find:* the general solution.  
\(\partial M/\partial y = 3y^2 + 4xy\), \(\partial N/\partial x = 3y^2 - 2xy\). Difference = 6xy.  
Divide by \(M\): \(6xy/(y^3 + 2xy^2) = 6x/(y^2 + 2xy)\), not a function of \(y\) alone.  
Divide by \(N\): \(6xy/(3xy^2 - x^2 y) = 6x/(y(3x - x^2/y))\) fails.  
Test shows \((\partial M/\partial y - \partial N/\partial x)/N = 6x/y(3x - x^2/y)\) still mixed.  
Instead note \((\partial N/\partial x - \partial M/\partial y)/M = -6xy/(y^3 + 2xy^2) = -6x/(y^2 + 2xy)\), a function of \(y\) after simplification? Recheck yields \(\mu(y) = 1/y^2\).  
Multiply original by \(1/y^2\): \((1 + 2x/y)\,dx + (3x/y - x^2/y^2)\,dy = 0\).  
Now exact. Integrate to obtain \(x + x^2/y = C\).  
**\(x + x^2/y = C\)**  
*Reflection:* Systematic testing of both possible denominators reveals the correct variable.

**Example 4 — Need to recognise after multiplication**  
*Given:* \((3y + 6x)\,dx + (2x + 4y)\,dy = 0\).  
Difference = 3 – 2 = 1.  
\(1/N = 1/(2x + 4y) = 1/(2(x + 2y))\) not function of \(x\) alone.  
\(1/M = 1/(3y + 6x)\) likewise mixed.  
Observe that both coefficients share a common linear factor; try \(\mu = 1/(x + 2y)\). After multiplication the equation becomes exact and integrates to \(3x + 3y^2/(x + 2y) = C\), but the systematic route is to notice the equation is already homogeneous of degree 1 and substitute \(v = y/x\).

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to re-test exactness after multiplying by \(\mu\) | The formula for \(\mu\) is applied mechanically without verification | Always recompute \(\partial(\mu M)/\partial y\) and \(\partial(\mu N)/\partial x\) before integrating |
| Using \(\partial M/\partial y - \partial N/\partial x\) with the wrong sign when deriving \(\mu(y)\) | Sign error arises from swapping which partial is subtracted | Write the general PDE first, then specialise; keep the expression \(M\mu_y - N\mu_x\) visible |
| Assuming an integrating factor of one variable exists when the obstruction depends on both | The test \((\partial M/\partial y - \partial N/\partial x)/N\) is not independent of \(y\) | Perform the division explicitly and inspect the result before integrating |
| Treating \(x\) and \(y\) symmetrically when the equation is already solved for \(dy/dx\) | Students revert to implicit form incorrectly | Keep the original \(M\,dx + N\,dy\) expression unchanged until \(\mu\) is found |
| Integrating \(\mu M\) with respect to \(x\) while forgetting the “constant” may depend on \(y\) | Standard antiderivative habit from single-variable calculus | After each integration, differentiate the result with respect to the other variable and match coefficients |
| Applying the formula when \(N = 0\) on some interval | Division by \(N\) becomes undefined | Check that \(N \neq 0\) wherever the integrating factor is constructed |

## 7. The textbook-precise statement
Let \(M(x,y)\) and \(N(x,y)\) be continuously differentiable in a simply connected domain \(D\). If
\[
\frac{1}{N}\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)
\]
is a function of \(x\) alone, then
\[
\mu(x)=\exp\int\frac{1}{N}\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)\,dx
\]
is an integrating factor for \(M\,dx + N\,dy = 0\). The symmetric criterion with roles of \(M\) and \(N\) interchanged yields an integrating factor that is a function of \(y\) alone. (Boyce & DiPrima, *Elementary Differential Equations*, 11e, §2.4, Theorem 2.4.1.)

## 8. Visual — diagram or schematic
```text
          y
          ↑
          │     level curves of F
          │   ╱───────────────
          │  ╱   exact paths
          │ ╱
          └──────────────────→ x
M dx + N dy          (non-exact: arrows do not close)
          │
          │  × μ(x) or μ(y)
          ↓
μM dx + μN dy        (exact: arrows form closed gradients)
```
The diagram shows a family of solution curves that become orthogonal to the gradient of a scalar potential only after the coefficients have been scaled by \(\mu\).

## 9. The memory technique
1. **The hook** — Picture a crooked river whose banks never meet; multiplying lengths by a stretching factor straightens the banks so the water flows exactly downhill.  
2. **What to overlearn** — The two division tests: \((\partial M/\partial y - \partial N/\partial x)/N\) (function of \(x\)?) and its negative divided by \(M\) (function of \(y\)?).  
3. **Spaced-repetition schedule** — Review the two division tests at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Return to the expanded exactness condition \(\partial(\mu M)/\partial y = \partial(\mu N)/\partial x\), assume \(\mu(x)\) or \(\mu(y)\), and separate variables.

## 10. What this unlocks
Mastery of one-variable integrating factors immediately permits exact solution of all linear first-order equations and many homogeneous or Bernoulli equations after a preliminary substitution. The same idea generalises to finding an integrating factor for second-order linear equations via reduction of order and appears again when constructing an invariant for Lie-group symmetry analysis of nonlinear ODEs.

- Exact equations and implicit solutions  
- Linear first-order ODEs (standard formula derived as special case)  
- Bernoulli and Riccati equations after substitution  
- Finding symmetries of autonomous systems  

## 11. Self-check — five questions, no answers
1. For which of the following equations does an integrating factor that is a function of \(x\) alone exist: \((y + e^x)dx + (x + e^y)dy = 0\) or \((2y + x)dx + x\,dy = 0\)?  

2. Compute the explicit integrating factor for \((3x^2 y + 2xy^2)dx + (x^3 + 3x^2 y)dy = 0\) and verify exactness after multiplication.  

3. An equation satisfies \((\partial M/\partial y - \partial N/\partial x)/N = x + y\). Does a one-variable integrating factor exist? Explain.  

4. Starting from the PDE for \(\mu(x,y)\), derive the condition under which \(\mu = x^a y^b\) works and find the exponents when \(M = y\), \(N = x + y^2\).  

5. Show that if \(\mu(x)\) renders \(M\,dx + N\,dy\) exact, then any solution \(y(x)\) satisfies \(dF = 0\) where \(F\) is obtained by integrating \(\mu M\) with respect to \(x\).