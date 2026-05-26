## 1. The one-sentence answer
**A linear homogeneous ordinary differential equation with constant coefficients is solved by converting it into an algebraic polynomial equation whose roots determine the form of the solution.**

The equation takes the shape \(a_n y^{(n)} + \cdots + a_1 y' + a_0 y = 0\). Because every coefficient is constant, the derivatives of an exponential function \(e^{rt}\) remain multiples of the same function. Substituting this trial solution therefore replaces every derivative with a power of \(r\) and yields a polynomial whose coefficients are exactly the original \(a_i\).

The polynomial is called the characteristic equation. Its roots supply the admissible values of \(r\). When those roots are known, the general solution is assembled from the corresponding exponential terms (or their modifications when roots repeat or are complex).

> [!NOTE]
> The exponential trial works because differentiation is a linear operator that maps the one-dimensional space spanned by \(e^{rt}\) into itself; the characteristic polynomial is simply the matrix of that operator in the exponential basis.

## 2. Why this matters — concrete and current
In the design of Boeing 787 flight-control laws, engineers model the short-period longitudinal dynamics as a second-order equation with constant coefficients; the roots of its characteristic equation directly give the damping ratio and natural frequency that must satisfy certification requirements.

Semiconductor firms such as TSMC use the same technique to analyse on-chip LC oscillators whose small-signal equations are linear with constant coefficients; the characteristic roots predict the oscillation frequency and the start-up margin before any nonlinear simulation is run.

Spacecraft attitude control at JPL for the Perseverance rover employed fourth-order linear models of reaction-wheel assemblies; the characteristic polynomial supplied the pole-placement targets used in the onboard gain-scheduling algorithm.

In quantitative finance, the Vasicek interest-rate model reduces to a first-order linear ODE whose characteristic root determines the speed of mean reversion; this root appears explicitly in closed-form bond-pricing formulas used by major banks for risk calculations.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Linearity of differentiation | Guarantees that linear combinations of solutions remain solutions |
| Exponential function and its derivatives | Supplies the trial solution whose derivatives stay inside the same family |
| Polynomial algebra (roots, factoring, quadratic formula) | Converts the differential equation into an algebraic problem whose solutions are immediately usable |
| Complex numbers (polar form) | Handles the oscillatory case that arises when roots are non-real |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the equation class
A linear homogeneous equation with constant coefficients has the form
\[
a_n y^{(n)} + a_{n-1} y^{(n-1)} + \cdots + a_1 y' + a_0 y = 0,
\]
where each \(a_i\) is a real constant and \(a_n \neq 0\). No forcing term appears on the right-hand side.

### Step 2 — Propose an exponential trial solution
Because every derivative of \(e^{rt}\) is again a constant multiple of \(e^{rt}\), the function \(y = e^{rt}\) is mapped to itself (up to scaling) by any constant-coefficient linear differential operator. This suggests trying
\[
y = e^{rt}
\]
for an undetermined constant \(r\).

### Step 3 — Substitute and factor
Differentiating term by term and dividing out the never-zero factor \(e^{rt}\) produces the algebraic equation
\[
a_n r^n + a_{n-1} r^{n-1} + \cdots + a_1 r + a_0 = 0.
\]
This is the characteristic equation.

> [!WARNING]
> Forgetting to divide by \(e^{rt}\) leaves an identity that is true for all \(r\) and therefore useless; the division step is mandatory.

### Step 4 — Solve the characteristic polynomial
Find all roots \(r_1, r_2, \dots, r_n\) (counting multiplicities) using the quadratic formula, factoring, or numerical methods as appropriate.

### Step 5 — Translate roots into solution basis functions
- Distinct real root \(r_k\) contributes the term \(e^{r_k t}\).
- Real root \(r\) of multiplicity \(m\) contributes the terms \(e^{rt}, t e^{rt}, \dots, t^{m-1} e^{rt}\).
- Complex conjugate pair \(\alpha \pm i\beta\) contributes the real pair \(e^{\alpha t} \cos(\beta t)\) and \(e^{\alpha t} \sin(\beta t)\); multiplicity extends these by powers of \(t\).

### Step 6 — Write the general solution
The general solution is the linear combination of the \(n\) independent basis functions obtained above, with arbitrary constants determined by initial or boundary conditions.

## 5. Worked examples — every step shown

**Example 1 — Distinct real roots**  
*Given:* \(y'' - 3y' + 2y = 0\).  
*Find:* general solution.  

Assume \(y = e^{rt}\).  
Differentiate twice: \(y' = r e^{rt}\), \(y'' = r^2 e^{rt}\).  
*Why:* each differentiation multiplies by another factor of \(r\).  

Substitute:
\[
r^2 e^{rt} - 3r e^{rt} + 2 e^{rt} = 0.
\]
*Why:* the original equation must hold identically.  

Divide by \(e^{rt}\):
\[
r^2 - 3r + 2 = 0 \quad \Rightarrow \quad (r-1)(r-2)=0.
\]
*Why:* exponential never vanishes, so the polynomial alone must be zero.  

Roots: \(r=1,2\).  
General solution:
\[
y = c_1 e^{t} + c_2 e^{2t}.
\]
**Final answer**  
\[ y = c_1 e^{t} + c_2 e^{2t} \]  

*Reflection:* The two distinct roots immediately give two independent exponentials; no further modification is required.

**Example 2 — Repeated root**  
*Given:* \(y'' - 4y' + 4y = 0\).  
*Find:* general solution.  

Characteristic equation:
\[
r^2 - 4r + 4 = (r-2)^2 = 0.
\]
*Why:* repeated factor signals linear dependence of plain exponentials.  

Basis: \(e^{2t}\) and \(t e^{2t}\).  
General solution:
\[
y = c_1 e^{2t} + c_2 t e^{2t}.
\]
**Final answer**  
\[ y = c_1 e^{2t} + c_2 t e^{2t} \]  

*Reflection:* Multiplicity forces the extra polynomial factor \(t\); the pattern generalises to higher multiplicity.

**Example 3 — Complex roots**  
*Given:* \(y'' + 2y' + 5y = 0\).  
*Find:* general solution.  

Characteristic equation:
\[
r^2 + 2r + 5 = 0 \quad \Rightarrow \quad r = -1 \pm 2i.
\]
*Why:* quadratic formula yields conjugate pair.  

Real and imaginary parts give:
\[
y = e^{-t}(c_1 \cos 2t + c_2 \sin 2t).
\]
**Final answer**  
\[ y = e^{-t}(c_1 \cos 2t + c_2 \sin 2t) \]  

*Reflection:* The real part of the root supplies the exponential envelope; the imaginary part supplies the frequency.

**Example 4 — Third-order mixed roots**  
*Given:* \(y''' - y'' - y' + y = 0\).  
*Find:* general solution.  

Characteristic polynomial factors as
\[
(r-1)^2 (r+1) = 0.
\]
Roots: \(r=1\) (multiplicity 2), \(r=-1\) (simple).  
Basis functions: \(e^{t}\), \(t e^{t}\), \(e^{-t}\).  
General solution:
\[
y = (c_1 + c_2 t) e^{t} + c_3 e^{-t}.
\]
**Final answer**  
\[ y = (c_1 + c_2 t) e^{t} + c_3 e^{-t} \]  

*Reflection:* Each distinct root contributes its own family; multiplicity is handled locally.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Sign error when moving coefficients to characteristic polynomial | Students copy the ODE coefficients with the original signs | Write the operator \(a(D)\) explicitly before substituting \(D \to r\) |
| Treating complex roots as two separate real roots | Forgetting conjugates must appear together | Always replace \(\alpha \pm i\beta\) by the real pair \(e^{\alpha t}\cos\beta t\), \(e^{\alpha t}\sin\beta t\) |
| Omitting the \(t^k\) factors for repeated roots | Believing any \(n\) roots give \(n\) independent exponentials | Check the dimension of the solution space; multiplicity reduces independence |
| Dividing by zero when \(r=0\) is a root | Special case of constant solution | Verify separately that constant functions satisfy the ODE when the constant term vanishes |
| Using the same arbitrary constants for different cases | Copy-paste from previous example | Label constants distinctly for each independent family |
| Forgetting initial conditions determine constants after the basis is built | Rushing to numerical values too early | First write the general solution with arbitrary constants, then apply conditions |

## 7. The textbook-precise statement
Let \(L = a_n D^n + \cdots + a_0\) be a monic constant-coefficient linear differential operator of order \(n\). The equation \(L y = 0\) admits a basis of solutions constructed from the roots of the characteristic polynomial \(p(r) = a_n r^n + \cdots + a_0\). If the roots are \(r_k\) with algebraic multiplicity \(m_k\), the corresponding solution space is spanned by the functions \(t^j e^{r_k t}\) (real case) or the real and imaginary parts of \(t^j e^{(\alpha+i\beta)t}\) (complex case). (See Boyce & DiPrima, *Elementary Differential Equations*, 11e, §3.1–3.4.)

## 8. Visual — diagram or schematic
```text
Characteristic roots → Solution families
          |
   +------+------+
   |             |
real r      complex α±iβ
   |             |
distinct   →  e^{rt}          →  e^{αt} cos βt, e^{αt} sin βt
repeated m →  {t^k e^{rt}} k=0..m-1
```
The diagram shows the decision tree: real versus complex roots, then multiplicity handling.

## 9. The memory technique
1. **The hook** — Picture the characteristic polynomial as a “barcode” stamped on the exponential \(e^{rt}\); each root is a permitted “price tag” that lets the exponential survive the differential operator.
2. **What to overlearn** — The three canonical basis sets: distinct real exponentials, repeated-root polynomials times exponential, and the damped-oscillator pair \(e^{\alpha t}\cos\beta t\), \(e^{\alpha t}\sin\beta t\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by substituting \(y=e^{rt}\) into the ODE and dividing out the exponential; the resulting polynomial is inevitable.

## 10. What this unlocks
Mastery of the characteristic equation supplies the explicit solution operator for any constant-coefficient linear system, which is the foundation for variation of parameters, undetermined coefficients, Laplace transforms, and the state-space theory of linear control.

- Higher-order scalar equations reduce to first-order vector systems via companion matrices.
- Qualitative behaviour (stability, oscillation) is read directly from root locations.
- Resonance and forced problems become transparent once the homogeneous solution is known.

## 11. Self-check — five questions, no answers
1. Write the characteristic equation for \(y''' + 3y'' + 3y' + y = 0\) and list all roots with multiplicity.
2. For which values of \(a\) does \(y'' + a y' + 4y = 0\) possess two distinct real roots?
3. Construct the general real solution when the characteristic roots are \(2,2,3+i,3-i\).
4. A student obtains the basis \(\{e^{t},e^{2t},e^{3t}\}\) for a third-order equation; explain why this cannot be correct if the characteristic polynomial is known to have a repeated root.
5. Given initial conditions \(y(0)=1\), \(y'(0)=0\) for the equation in Example 3, set up (but do not solve) the linear system that determines the arbitrary constants.