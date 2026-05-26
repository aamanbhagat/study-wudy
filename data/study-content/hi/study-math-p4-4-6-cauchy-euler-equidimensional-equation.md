## 1. The one-sentence answer
A **Cauchy-Euler equation** is a linear homogeneous ordinary differential equation whose coefficients are powers of the independent variable that exactly match the order of each derivative.

Iska matlab yeh hai ki har term mein \(x\) ki power derivative ke order ke barabar hoti hai, jaise \(x^2 y'' + a x y' + b y = 0\). Is wajah se equation scale-invariant hoti hai: agar aap independent variable ko \(kx\) se replace karo to equation ka form nahi badalta. Is property ki wajah se ek simple substitution \(x = e^t\) poore equation ko constant-coefficient linear ODE mein badal deti hai jise aap already solve karna jaante ho.

> [!NOTE]
> The single "aha" moment is that the monomial trial solution \(y = x^m\) turns differentiation into multiplication, exactly the way \(y = e^{rx}\) works for constant-coefficient equations; the powers of \(x\) in the coefficients are what make this miracle possible.

## 2. Why this matters — concrete and current
In petroleum reservoir simulation, radial Darcy flow through porous rock produces a Cauchy-Euler pressure equation whose exact solution gives the logarithmic pressure profile used by Schlumberger’s Eclipse software.

In structural acoustics, the transverse vibration of a thin circular plate clamped at the center yields an equidimensional equation whose indicial roots determine the natural frequencies measured in Brüel & Kjær modal-analysis systems.

In electrostatics inside a coaxial cable, the potential in the annular region between cylinders satisfies a Cauchy-Euler equation; the resulting power-law solution is hard-coded in COMSOL’s 2-D axisymmetric electrostatics module.

In quantum mechanics on a half-line with inverse-square potential, the radial Schrödinger equation reduces to Cauchy-Euler form; its indicial equation supplies the effective angular momentum that appears in every modern treatment of the Calogero-Moser system.

In semiconductor drift-diffusion modeling, the minority-carrier continuity equation with linearly graded doping produces an equidimensional ODE whose closed-form solution accelerates the Newton iteration inside Synopsys Sentaurus Device.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Second-order linear ODEs       | The equation is always linear and of fixed order          |
| Characteristic equation        | After substitution the problem reduces to one             |
| Change of independent variable | The map \(x = e^t\) converts variable coefficients to constant |
| Indicial roots / repeated roots| Determines whether solution basis contains \(\ln x\)      |

If any row is unfamiliar, pause and review constant-coefficient linear ODEs first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Spotting the equidimensional structure
A second-order equation is Cauchy-Euler precisely when each coefficient is a monomial whose degree equals the derivative order.  
Concrete example: \(x^2 y'' - 3x y' + 4y = 0\) satisfies the pattern; \(x^2 y'' + y = 0\) does not.  
Formally, the general homogeneous equation is
\[
\sum_{k=0}^n a_k x^k y^{(k)}(x) = 0, \qquad a_n \neq 0.
\]
> [!WARNING]
> If even one coefficient has the wrong degree, the monomial trial solution fails and the substitution \(x = e^t\) no longer produces constant coefficients.

### Step 2 — The power-law trial solution
Because every term must scale the same way under \(x \to \lambda x\), assume \(y = x^m\).  
Differentiating gives \(y' = m x^{m-1}\), \(y'' = m(m-1)x^{m-2}\). Substituting into the example above immediately yields the algebraic equation \(m(m-1) - 3m + 4 = 0\).

### Step 3 — The logarithmic substitution
Set \(x = e^t\), \(t = \ln x\), and define \(u(t) = y(e^t)\). Chain rule produces
\[
\frac{dy}{dx} = e^{-t} \frac{du}{dt}, \qquad x^2 \frac{d^2 y}{dx^2} = \frac{d^2 u}{dt^2} - \frac{du}{dt}.
\]
Every \(x^k D_x^k\) operator becomes a polynomial in \(D_t\) with constant coefficients.

### Step 4 — Reduction to constant-coefficient ODE
After substitution the original equation becomes an ordinary constant-coefficient equation in \(u(t)\). Solve it by the familiar characteristic equation.

### Step 5 — Recovering the solution in \(x\)
Replace \(t = \ln x\) and multiply by the appropriate powers of \(x\). Distinct roots \(m_1, m_2\) give the basis \(\{x^{m_1}, x^{m_2}\}\); a repeated root gives the extra factor \(\ln x\).

### Step 6 — General solution and Wronskian check
The two linearly independent solutions form the general solution on \((0,\infty)\) or \((-\infty,0)\). Their Wronskian is never zero precisely when the indicial roots differ by a non-integer, confirming completeness.

## 5. Worked examples — har step show karo

**Example 1 — Distinct real roots**  
*Given:* \(x^2 y'' - 3x y' + 3y = 0\).  
*Find:* general solution on \((0,\infty)\).  
Assume \(y = x^m\):  
\(m(m-1) - 3m + 3 = 0 \implies m^2 - 4m + 3 = 0 \implies (m-1)(m-3)=0\).  
Roots \(m=1,3\).  
*Why:* characteristic equation comes directly from substituting the monomial.  
**\(y = c_1 x + c_2 x^3\)**

*Reflection:* simplest case; no logarithms appear.

**Example 2 — Repeated root**  
*Given:* \(x^2 y'' - x y' + y = 0\).  
*Find:* general solution.  
Indicial: \(m(m-1) - m + 1 = m^2 - 2m + 1 = 0 \implies (m-1)^2 = 0\).  
One root \(m=1\) of multiplicity two.  
Second solution obtained by multiplying by \(\ln x\).  
*Why:* multiplicity forces the extra factor, exactly as in constant-coefficient theory.  
**\(y = (c_1 + c_2 \ln x) x\)**

*Reflection:* the logarithm is forced by the algebraic multiplicity.

**Example 3 — Complex roots**  
*Given:* \(x^2 y'' + 3x y' + 5y = 0\).  
Indicial: \(m(m-1) + 3m + 5 = m^2 + 2m + 5 = 0\).  
Roots \(-1 \pm 2i\).  
Solution: \(y = x^{-1}(c_1 \cos(2\ln x) + c_2 \sin(2\ln x))\).  
*Why:* Euler’s formula converts complex exponentials back to real trigonometric functions of \(\ln x\).

**Example 4 — Non-homogeneous forcing**  
*Given:* \(x^2 y'' - 3x y' + 3y = x^2 \ln x\).  
First solve homogeneous part (Example 1). Variation of parameters with \(y_1 = x\), \(y_2 = x^3\) yields particular solution \(\frac12 x^3 \ln x - \frac14 x^3\).  
*Why:* undetermined coefficients fails because right-hand side is not a monomial; variation of parameters always works once basis is known.  
**General solution: \(y = c_1 x + c_2 x^3 + \frac12 x^3 \ln x - \frac14 x^3\)**

*Reflection:* non-homogeneous term only changes the particular solution; homogeneous basis stays the same.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting domain \(x > 0\)         | Students treat equation on whole real line          | Always state interval \((0,\infty)\) or \((-\infty,0)\) explicitly |
| Using \(y = e^{mx}\) instead of \(x^m\) | Habit from constant-coefficient case                | Check coefficient degrees before choosing trial form |
| Missing \(\ln x\) for repeated roots| Algebraic multiplicity overlooked                   | Always factor the indicial polynomial completely     |
| Sign error in substitution          | Chain-rule sign for \(D_x = e^{-t} D_t\) forgotten  | Write the three transformation formulas once and reuse |
| Applying reduction of order when unnecessary | Over-generalizing technique                         | Use monomial trial first; reduction only if order >2 |
| Division by zero when \(x=0\)       | Equation singular at origin                         | Never evaluate solution or coefficients at \(x=0\)   |
| Confusing \(x^m\) with \(m^x\)      | Notation mix-up                                     | Keep exponent on the base variable, not the coefficient |

## 7. The textbook-precise statement
A Cauchy-Euler equation of order \(n\) is the linear equation
\[
\sum_{k=0}^n a_k x^k \frac{d^k y}{dx^k} = g(x), \qquad a_n \neq 0,
\]
where each \(a_k\) is constant and the equation is considered on an interval not containing the origin. When \(g(x) \equiv 0\) the equation is homogeneous. The change of independent variable \(x = e^t\) (\(t \in \mathbb{R}\)) converts the homogeneous equation into a constant-coefficient linear ODE whose characteristic polynomial is exactly the indicial polynomial
\[
\sum_{k=0}^n a_k m(m-1)\cdots(m-k+1) = 0.
\]
(Boyce & DiPrima, *Elementary Differential Equations and Boundary Value Problems*, 11e, §4.4.)

## 8. Visual — diagram or schematic
```text
x-axis (positive):  0  ───────────────► ∞
                    |                 |
                 singular         regular
                    |                 |
t = ln x:      -∞  ───────────────► +∞
                    constant-coeff ODE lives here
```

The map \(x = e^t\) stretches the singular point at zero to \(t = -\infty\) and sends every power \(x^m\) into an ordinary exponential \(e^{m t}\).

## 9. The memory technique
1. **The hook** — picture a ruler whose markings are powers of \(x\); each derivative “slides” one mark and multiplies by the exponent, exactly what the indicial equation encodes.  
2. **What to overlearn** — the substitution formulas
   \[
   x\frac{d}{dx} \to \frac{d}{dt}, \qquad x^2\frac{d^2}{dx^2} \to \frac{d^2}{dt^2} - \frac{d}{dt}
   \]
   and the fact that repeated roots always insert a factor \(\ln x\).  
3. **Spaced-repetition schedule** — review the three transformation identities after 1 day, 3 days, 7 days, 16 days, and 35 days.  
4. **First-principles fallback** — if the substitution is forgotten, return to the monomial assumption \(y = x^m\), differentiate term-by-term, and equate the resulting polynomial in \(m\) to zero.

## 10. What this unlocks
Mastery lets you solve every equidimensional equation that appears inside series-solution methods, Bessel equations of integer order, and many variable-coefficient problems that admit exact closed form.  
- Next: reduction of order for non-homogeneous Cauchy-Euler equations  
- Next: Frobenius method when the singularity is regular but not equidimensional  
- Next: Euler-type systems in several variables arising in continuum mechanics

## 11. Self-check — five questions, no answers
1. Write the general solution of \(x^2 y'' + 5x y' + 4y = 0\) on \((0,\infty)\).  
2. Does the equation \(x y'' + y' + y = 0\) belong to the Cauchy-Euler class? Justify in one sentence.  
3. Find the Wronskian of the two independent solutions of \(x^2 y'' - x y' + y = 0\).  
4. A student claims the substitution \(x = e^t\) works for any linear equation with polynomial coefficients. Identify the precise algebraic condition that must hold for the claim to be true.  
5. Solve \(x^2 y'' - x y' + y = x^2\) completely and verify that the particular solution you obtained is linearly independent from the homogeneous basis.