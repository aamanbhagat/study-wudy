## 1. The one-sentence answer
**An exact equation is a first-order ODE \(M(x,y)\,dx + N(x,y)\,dy = 0\) whose left-hand side is the total differential of a scalar potential function \(F(x,y)\).**

When the equation is exact, its solutions are the level curves \(F(x,y) = C\). The existence of \(F\) is equivalent to the vector field \((M,N)\) being conservative, so the line integral between any two points is path-independent. This reduces solving the ODE to the purely algebraic task of recovering \(F\) by quadrature.

In practice one checks a single partial-derivative identity; if it holds, integration with respect to one variable followed by differentiation with respect to the other yields the remaining piece of \(F\).

> [!NOTE]
> The single identity \(\partial M/\partial y = \partial N/\partial x\) is both necessary and sufficient on a simply-connected domain; it is the precise two-variable version of “curl zero implies gradient.”

## 2. Why this matters — concrete and current
In thermodynamic modelling at NIST, the fundamental relation \(dU = T\,dS - P\,dV\) is exact; the equality of mixed partials recovers the Maxwell relations used daily in equation-of-state software.

In electrostatics, the electric field \(\mathbf{E} = -\nabla\phi\) satisfies \(\nabla\times\mathbf{E}=0\) precisely when the line integral for voltage is path-independent; circuit-simulation packages such as SPICE therefore integrate exact 1-forms on each branch.

In machine-learning gradient flows, the continuous-time limit of gradient descent on a loss \(L(\theta)\) is the exact equation \(dL = \nabla L\cdot d\theta = 0\); symplectic integrators preserve this exactness to machine precision, which is why they appear in recent papers on neural ODEs from Google Research.

In semiconductor process simulation, dopant diffusion fluxes are derived from exact differentials of chemical potential; the same condition guarantees that steady-state concentration profiles satisfy global mass conservation independent of mesh path.

In orbital mechanics at JPL, the two-body problem admits an exact energy integral; mission-design software therefore replaces numerical integration of one coordinate by an algebraic quadrature once the exactness test is verified.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Partial derivatives      | The exactness test and the reconstruction of \(F\) are statements about equality of mixed partials. |
| Total differential       | The left-hand side \(M\,dx + N\,dy\) must be recognised as \(dF\). |
| Simply-connected domains | The theorem requires path independence; holes in the plane can produce counter-examples. |
| Line integrals           | Exactness means the integral depends only on endpoints, not on path. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the ODE as a differential form
A first-order equation can always be rearranged into \(M(x,y)\,dx + N(x,y)\,dy = 0\). This is simply the statement that the slope field satisfies \(dy/dx = -M/N\) wherever \(N\neq0\).

Example: \( (2x + y)\,dx + (x + 2y)\,dy = 0 \).

Formal statement:
\[
M(x,y)\,dx + N(x,y)\,dy = 0.
\]

> [!WARNING]
> Treating \(M\) and \(N\) as functions of \(x\) alone or \(y\) alone will later break the partial-derivative test.

### Step 2 — Ask whether the form is the differential of a scalar
Suppose there exists \(F(x,y)\) such that \(dF = M\,dx + N\,dy\). Then the ODE says \(dF=0\), so \(F\) is constant along solution curves.

Example: For \(F=x^2 + xy + y^2\) one recovers exactly the coefficients above.

Formal statement:
\[
dF = \frac{\partial F}{\partial x}\,dx + \frac{\partial F}{\partial y}\,dy.
\]

> [!WARNING]
> If no such \(F\) exists, the same coefficients may still define a differential equation, but it cannot be solved by finding level sets of a single function.

### Step 3 — Differentiate the assumed equality
Differentiate \(M = \partial F/\partial x\) with respect to \(y\) and \(N = \partial F/\partial y\) with respect to \(x\). Equality of mixed partials forces
\[
\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}.
\]

Example: \(\partial(2x+y)/\partial y = 1\) and \(\partial(x+2y)/\partial x = 1\), equal.

Formal statement:
\[
\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}.
\]

> [!WARNING]
> Reversing the order of differentiation produces an opposite sign and will reject genuinely exact equations.

### Step 4 — Integrate to recover \(F\)
Integrate \(M\) with respect to \(x\), treating \(y\) as constant, then add an arbitrary function of \(y\) alone. Differentiate that expression with respect to \(y\) and match the result to \(N\) to determine the added function.

Formal statement:
\[
F(x,y) = \int M(x,y)\,dx + g(y).
\]

> [!WARNING]
> Forgetting that the “constant” of integration may depend on the other variable leaves an undetermined function that cannot be fixed later.

### Step 5 — Verify and write the implicit solution
Once \(F\) is obtained, the general solution is \(F(x,y) = C\). Direct substitution back into the differential confirms exactness was used correctly.

Formal statement (theorem):
If \(M,N\) and their first partials are continuous on a simply-connected open set and \(\partial M/\partial y = \partial N/\partial x\), then there exists \(F\) such that \(dF = M\,dx + N\,dy\) and the solutions are exactly the curves \(F(x,y)=C\).

## 5. Worked examples — every step shown

**Example 1 — Linear coefficients**
*Given:* \((2x+y)\,dx+(x+2y)\,dy=0\)
*Find:* implicit solution.

Integrate \(M\) wrt \(x\):
\[
F = x^2 + xy + g(y).
\]
*Why:* antiderivative of \(2x+y\) holding \(y\) fixed.

Differentiate wrt \(y\):
\[
\frac{\partial F}{\partial y} = x + g'(y).
\]
*Why:* chain rule on the \(xy\) term.

Set equal to \(N\):
\[
x + g'(y) = 2y \implies g'(y)=2y-x+ x \implies g(y)=y^2.
\]
*Why:* the \(x\) terms cancel, leaving an ODE for \(g\).

Thus \(F=x^2+xy+y^2=C\).

**Reflection**  
The example is linear; the only possible trap is forgetting \(g(y)\).

**Example 2 — Trigonometric term**
*Given:* \((\sin y + y\cos x)\,dx + (x\cos y + \sin x)\,dy=0\)
*Find:* solution.

Integrate \(M\) wrt \(x\):
\[
F = x\sin y + y\sin x + g(y).
\]
*Why:* \(\int y\cos x\,dx = y\sin x\).

Differentiate wrt \(y\):
\[
\frac{\partial F}{\partial y} = x\cos y + \sin x + g'(y).
\]
Set equal to \(N\):
\[
x\cos y + \sin x + g'(y) = x\cos y + \sin x \implies g'(y)=0.
\]
Hence \(F=x\sin y + y\sin x = C\).

**Reflection**  
The cross terms cancel identically; exactness is visible only after the partial test.

**Example 3 — Logarithmic potential**
*Given:* \((2x/y)\,dx + ((y^2-x^2)/y^2)\,dy=0\)
*Find:* solution.

Integrate \(M\) wrt \(x\):
\[
F = x^2/y + g(y).
\]
Differentiate wrt \(y\):
\[
\frac{\partial F}{\partial y} = -x^2/y^2 + g'(y).
\]
Match to \(N\):
\[
-x^2/y^2 + g'(y) = (y^2-x^2)/y^2 \implies g'(y)=1.
\]
So \(g(y)=y\), \(F=x^2/y + y = C\).

**Reflection**  
Negative powers require careful differentiation; the test \(\partial M/\partial y = -2x/y^2\) equals \(\partial N/\partial x = -2x/y^2\).

**Example 4 — Need to spot a missing term**
*Given:* \((e^y + 2xy)\,dx + (xe^y + x^2 + 3y^2)\,dy=0\)
*Find:* solution.

Integration of \(M\) yields \(F=xe^y + x^2 y + g(y)\).  
Matching forces \(g(y)=y^3\), giving \(F=xe^y + x^2 y + y^3 = C\).

**Reflection**  
The cubic term appears only in \(N\); missing it produces an inconsistent \(g'(y)\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Checking \(\partial M/\partial x = \partial N/\partial y\) | Reversed order of differentiation           | Always differentiate \(M\) wrt \(y\) first           |
| Treating the integration “constant” as numeric | Forgetting dependence on the second variable | Write \(g(y)\) explicitly before differentiating     |
| Applying the test on a domain with holes | Curl-zero is only locally sufficient        | Verify simple connectedness or restrict the domain   |
| Dividing by \(N\) before testing  | Converts exact equation into non-exact slope field | Keep the form \(M\,dx+N\,dy=0\) until after the test |
| Integrating \(N\) wrt \(y\) but forgetting the \(x\)-dependent “constant” | Symmetric error to the \(g(y)\) case        | Choose one variable consistently and finish with the other |
| Sign error when moving terms      | Algebraic slip when rewriting \(dy/dx=-M/N\) | Stay inside differential form until solution is obtained |
| Assuming exactness implies separability | Two independent properties                  | Test exactness first; separability is a different route |

## 7. The textbook-precise statement
Let \(M(x,y)\) and \(N(x,y)\) be continuously differentiable on an open rectangle (or more generally a simply-connected open set) \(D\subset\mathbb{R}^2\). The equation
\[
M(x,y)\,dx + N(x,y)\,dy = 0
\]
is **exact** on \(D\) if and only if
\[
\frac{\partial M}{\partial y}(x,y) = \frac{\partial N}{\partial x}(x,y)\quad\text{for all }(x,y)\in D.
\]
When the equality holds there exists a twice-continuously-differentiable function \(F:D\to\mathbb{R}\) such that
\[
dF = M\,dx + N\,dy,
\]
and the general solution is given implicitly by \(F(x,y)=C\). (Boyce & DiPrima, *Elementary Differential Equations*, 11e, §2.4, Theorem 2.4.1.)

## 8. Visual — diagram or schematic
```text
y
↑
│     level curve F(x,y)=C₂
│    ╱───────────────╲
│   ╱                 ╲   vector (M,N) tangent to curve
│  ╱   (M,N)            ╲
│ ╱──────────────────────╲
│╱     F(x,y)=C₁          ╲
└────────────────────────────→ x
```
Level curves of \(F\) are everywhere orthogonal to \(\nabla F^\perp\) and tangent to the direction \((M,N)\). The exactness condition guarantees that these curves never cross.

## 9. The memory technique

**The hook**  
Picture a frictionless ball rolling on a hill whose height is \(F(x,y)\); the equation \(dF=0\) means the ball stays on a contour line forever. The test \(\partial M/\partial y=\partial N/\partial x\) is the statement that the hill has no “twist.”

**What to overlearn**  
1. The exactness test: \(\partial M/\partial y \equiv \partial N/\partial x\).  
2. Reconstruction recipe: integrate \(M\) wrt \(x\), differentiate wrt \(y\), match \(N\), integrate the remainder wrt \(y\).

**Spaced-repetition schedule**  
Review the test identity after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
If the test is forgotten, return to the definition \(dF=M\,dx+N\,dy\) and equate mixed partials of \(F\); the identity reappears automatically.

## 10. What this unlocks
Exactness supplies the first systematic integration technique beyond separation of variables and linear equations. It immediately generalises to finding integrating factors when the test fails, to exactness in three or more variables, and to the construction of first integrals for autonomous systems.

- Integrating factors depending on \(x\) only or \(y\) only  
- Exact equations in three variables and Pfaffian systems  
- First integrals of two-dimensional autonomous vector fields  
- Variational principles and the Euler–Lagrange equation  
- Conservation laws derived from symmetries (Noether)

## 11. Self-check — five questions, no answers
1. Verify exactness and solve: \((3x^2y + y^2)\,dx + (x^3 + 2xy)\,dy = 0\).

2. Show that \((y e^{xy} + 2x)\,dx + (x e^{xy} + 2y)\,dy = 0\) is exact, then recover \(F\) without performing any integration until the final step.

3. Construct a counter-example on the punctured plane where \(\partial M/\partial y = \partial N/\partial x\) everywhere yet no single-valued continuous \(F\) exists.

4. Suppose \(M = y/x\) and \(N = -x/y\). Does the exactness test hold? If not, can a simple integrating factor restore exactness?

5. Given an exact equation whose solution is \(F(x,y)=C\), differentiate the implicit relation with respect to \(x\) and recover the original ODE; state the theorem that guarantees this reversal is valid.