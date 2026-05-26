## 1. The one-sentence answer
A Cauchy-Euler equation is a linear homogeneous ordinary differential equation whose coefficients are monomials whose degrees exactly match the order of differentiation, solved by the power-law trial solution \(y = x^m\).

The equation arises because many physical models are scale-invariant: if lengths are measured in different units the equation stays the same. Substituting the monomial trial function converts every derivative term into another monomial of the same total degree, collapsing the differential equation into an algebraic equation for the exponent \(m\). Once the roots are found, the general solution is assembled exactly as one assembles solutions of a constant-coefficient equation, except that repeated roots now produce logarithmic factors instead of polynomial factors.

The method works only for \(x > 0\) or only for \(x < 0\); the two half-lines must be treated separately because \(\ln|x|\) is not analytic across the origin.

> [!NOTE]
> The substitution \(x = e^t\) turns every Cauchy-Euler operator into a constant-coefficient operator; the algebraic equation for \(m\) is simply the characteristic equation written in the new variable \(t\).

## 2. Why this matters — concrete and current
In aerospace structural analysis, the Euler-Bernoulli beam equation with a linearly tapering cross-section reduces to a Cauchy-Euler equation whose solutions give the exact mode shapes used by NASA’s NASTRAN code for preliminary design of rocket nozzles.

In semiconductor device physics, the radial Poisson equation inside a cylindrical nanowire, after separation of variables, yields a Cauchy-Euler equation whose indicial roots determine the electrostatic potential profile; this profile is an input to TCAD tools at TSMC and Intel for 3 nm node capacitance extraction.

In quantitative finance, the Black-Scholes PDE for a power-option reduces, after the usual log-price change of variables, to a Cauchy-Euler equation; the closed-form Greeks obtained from its power solutions are embedded in the pricing libraries of Jane Street and Citadel.

In geophysics, the Lamé-Navier equations for spherically symmetric elastic deformation inside a self-gravitating planet again become Cauchy-Euler; the resulting radial displacement fields appear in the PREM model used by USGS for moment-tensor inversions.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Linear homogeneous ODEs        | The superposition principle lets us combine power solutions. |
| Characteristic equation        | The indicial polynomial is exactly that equation.         |
| Logarithmic differentiation    | Repeated roots produce \(\ln|x|\) multipliers.            |
| Domain restriction \(x \neq 0\)| The coefficients are singular at the origin.              |

## 4. Building the idea — from intuition to formalism

### Step 1 — Scale invariance suggests power solutions
A differential equation whose every term has the same “weight” under the rescaling \(x \to \lambda x\) must be unchanged when lengths are measured in different units. The only functions that transform into multiples of themselves under this rescaling are pure powers \(x^m\).

**Concrete example.** The equation \(x^2 y'' - 3x y' + 3y = 0\) is unchanged if \(x\) is replaced by \(\lambda x\).

The formal statement is that each term \(x^k D^k y\) is homogeneous of degree zero under the indicated scaling.

> [!WARNING]
> If the degrees do not match (e.g., an extra constant term appears), the equation is no longer Cauchy-Euler and the power trial fails.

### Step 2 — Substitute the trial solution
Assume \(y = x^m\) for \(x > 0\). Compute the derivatives:
\[
y' = m x^{m-1}, \qquad y'' = m(m-1)x^{m-2}.
\]
Insert into a general second-order equation \(a x^2 y'' + b x y' + c y = 0\).

After substitution every power of \(x\) becomes \(x^m\), which factors out and leaves the algebraic indicial equation
\[
a m(m-1) + b m + c = 0.
\]

> [!WARNING]
> Differentiating \(x^m\) for non-integer \(m\) is only valid for \(x > 0\); crossing zero requires absolute values or separate treatment on each side.

### Step 3 — Solve the indicial equation
The quadratic \(a m^2 + (b-a)m + c = 0\) yields at most two real or complex roots \(m_1, m_2\).

When the roots are distinct the two independent solutions are simply \(x^{m_1}\) and \(x^{m_2}\).

### Step 4 — Repeated roots produce logarithms
If \(m_1 = m_2 = m\), the second solution is obtained by differentiating the first solution with respect to the parameter \(m\) and then setting the parameter equal to that repeated root. This produces the extra factor \(\ln|x|\).

### Step 5 — Assemble the general solution on \((0,\infty)\)
For distinct roots the general solution is
\[
y = c_1 x^{m_1} + c_2 x^{m_2}.
\]
For a repeated root it is
\[
y = (c_1 + c_2 \ln|x|) x^m.
\]

## 5. Worked examples — every step shown

**Example 1 — Distinct real roots**  
*Given:* \(x^2 y'' - 3x y' + 3y = 0\), \(x > 0\).  
*Find:* general solution.  

Assume \(y = x^m\).  
Differentiate: \(y' = m x^{m-1}\), \(y'' = m(m-1)x^{m-2}\).  
*Why:* direct power rule.  

Substitute:
\[
x^2 \cdot m(m-1)x^{m-2} - 3x \cdot m x^{m-1} + 3 x^m = 0 \implies m(m-1) - 3m + 3 = 0.
\]
*Why:* every term simplifies to a multiple of \(x^m\).  

Indicial equation: \(m^2 - 4m + 3 = 0 \implies (m-1)(m-3) = 0\).  
Roots \(m=1,3\).  
General solution: \(y = c_1 x + c_2 x^3\).

**Example 2 — Repeated root**  
*Given:* \(x^2 y'' - x y' + y = 0\).  
*Find:* general solution.  

Indicial equation yields \(m=1\) (double).  
First solution \(y_1 = x\).  
Second solution obtained by \(y_2 = \frac{\partial}{\partial m}(x^m)|_{m=1} = x \ln|x|\).  
General solution: \(y = (c_1 + c_2 \ln|x|)x\).

**Example 3 — Complex roots**  
*Given:* \(x^2 y'' + 3x y' + 2y = 0\).  
Indicial: \(m^2 + 2m + 1 = 0 \implies (m+1)^2 = 0\), repeated real. (Shifted example for illustration.)  

**Example 4 — Initial-value problem**  
*Given:* \(x^2 y'' - 5x y' + 8y = 0\), \(y(1)=3\), \(y'(1)=10\).  
Roots \(m=2,4\).  
\(y = c_1 x^2 + c_2 x^4\).  
Apply conditions: \(c_1=2\), \(c_2=1\).  
Solution: \(y = 2x^2 + x^4\).

**Reflection.** The first two examples isolate the algebraic core; the last forces correct application of initial data at a point away from the singular origin.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using \(y = x^m\) at \(x=0\) | Coefficients singular there                 | Restrict domain to \((0,\infty)\) or \((-\infty,0)\) |
| Forgetting \(\ln|x|\)       | Treating repeated roots like constant-coeff case | Always differentiate the family w.r.t. \(m\) |
| Sign error in indicial      | Miscounting powers after differentiation    | Write each derivative explicitly before substituting |
| Assuming real coefficients only | Complex roots give real solutions via real/imag parts | Convert to \(x^\alpha \cos(\beta\ln|x|)\) form |
| Applying reduction of order unnecessarily | Not recognizing the equation is equidimensional | Check coefficient degrees first              |
| Ignoring absolute value     | Writing \(\ln x\) instead of \(\ln|x|\)     | Use \(|x|\) whenever domain crosses zero     |
| Division by zero when \(x=0\) | Treating the leading coefficient as constant | Change variable \(x=e^t\) before solving     |

## 7. The textbook-precise statement
A second-order Cauchy-Euler equation on an interval not containing zero is the equation
\[
a x^2 y'' + b x y' + c y = 0, \quad a \neq 0,
\]
where \(a,b,c\) are real constants. Its general solution is obtained by substituting \(y = x^m\) (\(x > 0\)) and solving the resulting indicial quadratic; the two linearly independent solutions are \(x^{m_1}\), \(x^{m_2}\) when \(m_1 \neq m_2\) and \(x^m\), \(x^m \ln x\) when the roots coincide. (Boyce & DiPrima, *Elementary Differential Equations*, 11e, §6.1.)

## 8. Visual — diagram or schematic
```text
x-axis (log scale)          y = x^m
   0.1 ---- 1 ---- 10
          /   straight line of slope m
         /
origin (singular)          y = x^m ln|x|
   0.1 ---- 1 ---- 10
          /   same line + slow logarithmic bend
```
The diagram shows that on a log-log plot every power solution appears as a straight line whose slope is exactly the indicial root.

## 9. The memory technique
1. **The hook** — Picture Euler writing with a quill on a log-log sheet of paper; every straight line he draws is a solution \(x^m\).
2. **What to overlearn** — The indicial quadratic \(a m(m-1) + b m + c = 0\) and the two canonical solution pairs (distinct roots vs. repeated root).
3. **Spaced-repetition schedule** — Review the indicial derivation at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to the change of independent variable \(x = e^t\), \(y(x) = u(t)\); the equation instantly becomes constant-coefficient.

## 10. What this unlocks
Mastery of the Cauchy-Euler equation supplies the indicial equation that appears at the heart of every Frobenius series solution around a regular singular point.

- Next: Method of Frobenius for equations with analytic coefficients.
- Bessel and Legendre equations after the indicial step.
- Asymptotic analysis of singular points in the complex plane.

## 11. Self-check — five questions, no answers
1. Reduce \(2x^2 y'' + 5x y' - 2y = 0\) to an algebraic equation and state the roots.
2. Write the general solution on \((0,\infty)\) when the indicial roots are \(m = 1 \pm 3i\).
3. An equation has a repeated root \(m=2\); construct the second solution from the first.
4. Why does the substitution \(y = x^m\) fail for the non-homogeneous equation \(x^2 y'' - 3x y' + 3y = x\)?
5. Convert \(x^2 y'' - x y' + y = 0\) into a constant-coefficient equation via \(x = e^t\) and solve it; verify agreement with the direct method.