## 1. The one-sentence answer
**When the characteristic equation of a second-order linear homogeneous ODE with constant coefficients has two distinct real roots \(r_1\) and \(r_2\), the general solution is a linear combination of the two independent exponential functions \(e^{r_1 x}\) and \(e^{r_2 x}\).**

The second-order equation \(a y'' + b y' + c y = 0\) is converted into an algebraic quadratic by substituting the trial form \(y = e^{r x}\). The resulting quadratic \(a r^2 + b r + c = 0\) yields the growth or decay rates that the solution can sustain. Distinct real roots simply mean two different rates are admissible; each rate supplies one building-block solution, and the superposition principle lets any linear combination of those blocks solve the ODE.

This case arises precisely when the discriminant \(b^2 - 4ac > 0\). The two exponential functions are linearly independent because their ratio is never constant, guaranteeing that the two-parameter family spans the entire two-dimensional solution space.

> [!NOTE]
> The key insight is that distinct real roots produce pure exponential modes without oscillation or repeated factors; the solution never crosses zero more than once unless the constants are specially chosen.

## 2. Why this matters — concrete and current
In aerospace flight-control software at Boeing and Airbus, the longitudinal dynamics of an aircraft are approximated by a fourth-order system that factors into second-order blocks; when both roots of a block are real and negative the mode is overdamped subsidence, dictating the exact gain schedule that prevents pilot-induced oscillation during landing.

Semiconductor thermal-management simulators used by TSMC solve the heat equation on a chip stack by modal decomposition; each spatial eigenfunction reduces to an ODE whose overdamped (distinct real roots) solutions give the time constants that set the duration of a thermal transient after a core is power-gated.

In quantitative pharmacology, two-compartment pharmacokinetic models for monoclonal antibodies produce a biexponential clearance curve exactly when the eigenvalues of the transfer matrix are distinct and real; dosing regimens at Roche are computed from these closed-form expressions to keep plasma concentration above the minimum effective level.

Radioactive decay chains in nuclear-reactor monitoring (ITER instrumentation) obey coupled first-order equations whose second-order reduction yields distinct real roots; the resulting double-exponential activity curves are used to predict xenon poisoning transients after a scram.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Differentiation of \(e^{rx}\) | Verifies that \(e^{rx}\) is an eigenfunction of \(D^2\)   |
| Linear independence      | Guarantees two distinct exponentials span a two-dimensional space |
| Discriminant of quadratic| Classifies the three mutually exclusive root cases        |
| Superposition principle  | Allows arbitrary linear combinations to remain solutions  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Assume an exponential trial solution
Any constant-coefficient linear ODE is unchanged by a shift in the independent variable, so solutions that are pure exponentials are natural candidates.  
Consider the concrete equation \(y'' - 3y' + 2y = 0\). Substituting \(y = e^{rx}\) immediately produces the algebraic relation \(r^2 - 3r + 2 = 0\).  
Formally, the substitution \(y = e^{rx}\) converts
\[
a y'' + b y' + c y = (a r^2 + b r + c) e^{rx} = 0
\]
into the characteristic equation
\[
a r^2 + b r + c = 0.
\]
> [!WARNING]
> Treating the trial function as a polynomial or trigonometric guess at this stage produces an identity that is never satisfied for all \(x\).

### Step 2 — Solve the quadratic and identify the distinct-real-root regime
The quadratic formula supplies the two roots
\[
r = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}.
\]
When the discriminant \(D = b^2 - 4ac > 0\), the square root is real and the two roots \(r_1 \neq r_2\) are distinct.  
For the example above, \(D = 9 - 8 = 1 > 0\), yielding \(r_1 = 1\), \(r_2 = 2\).

### Step 3 — Each root produces an independent solution
Because the ODE is linear and homogeneous, both \(e^{r_1 x}\) and \(e^{r_2 x}\) satisfy it separately.  
Direct substitution confirms
\[
\frac{d^2}{dx^2} e^{r_i x} - 3 \frac{d}{dx} e^{r_i x} + 2 e^{r_i x} = (r_i^2 - 3 r_i + 2) e^{r_i x} = 0
\]
when \(r_i\) is a root.  
Thus two particular solutions exist:
\[
y_1 = e^{r_1 x}, \qquad y_2 = e^{r_2 x}.
\]

### Step 4 — Verify linear independence
The Wronskian determinant
\[
W(y_1, y_2) = r_2 e^{(r_1 + r_2)x} - r_1 e^{(r_1 + r_2)x} = (r_2 - r_1) e^{(r_1 + r_2)x}
\]
is never zero when \(r_1 \neq r_2\). Hence the functions are linearly independent on \(\mathbb{R}\).

### Step 5 — Form the general solution
By the existence-and-uniqueness theorem for second-order linear ODEs, the two-parameter family
\[
y = c_1 e^{r_1 x} + c_2 e^{r_2 x}
\]
contains every solution.  
This is the textbook statement for Case 1.

## 5. Worked examples — every step shown

**Example 1 — Basic distinct roots**  
*Given:* \(y'' - 3y' + 2y = 0\).  
*Find:* general solution.  
Assume \(y = e^{rx}\).  
Differentiate twice and substitute:
\[
r^2 e^{rx} - 3 r e^{rx} + 2 e^{rx} = 0 \implies r^2 - 3r + 2 = 0.
\]
*Why:* the exponential factor never vanishes, so the coefficient polynomial must be zero.  
Factor: \((r-1)(r-2)=0\), hence \(r_1=1\), \(r_2=2\).  
General solution:
\[
y = c_1 e^{x} + c_2 e^{2x}.
\]
**Final answer**  
\[ y = c_1 e^{x} + c_2 e^{2x} \]  
*Reflection:* The arithmetic is elementary; the only conceptual step is recognizing that distinct roots automatically give independent exponentials.

**Example 2 — Non-monic leading coefficient**  
*Given:* \(2y'' + 5y' + 2y = 0\).  
*Find:* general solution.  
Characteristic equation: \(2r^2 + 5r + 2 = 0\).  
Discriminant \(25-16=9>0\). Roots:
\[
r = \frac{-5 \pm 3}{4} \implies r_1 = -2,\ r_2 = -1/2.
\]
Solution:
\[
y = c_1 e^{-2x} + c_2 e^{-x/2}.
\]
**Final answer**  
\[ y = c_1 e^{-2x} + c_2 e^{-x/2} \]  
*Reflection:* Scaling the leading coefficient merely rescales the quadratic; the sign pattern of the roots still controls growth versus decay.

**Example 3 — One positive, one negative root**  
*Given:* \(y'' - y = 0\).  
*Find:* solution satisfying \(y(0)=3\), \(y'(0)=1\).  
Roots: \(r=\pm 1\).  
General solution \(y = c_1 e^{x} + c_2 e^{-x}\).  
Apply initial conditions:
\[
c_1 + c_2 = 3, \quad c_1 - c_2 = 1.
\]
Adding yields \(2c_1=4\) so \(c_1=2\); subtracting yields \(c_2=1\).  
**Final answer**  
\[ y = 2e^{x} + e^{-x} \]  
*Reflection:* Opposite-sign roots produce hyperbolic functions (sinh, cosh) after reparametrization, yet the exponential basis remains valid.

**Example 4 — Repeated differentiation check**  
*Given:* \(y'' - 5y' + 6y = 0\), verify that \(y = 2e^{2x} - 3e^{3x}\) solves it.  
Compute derivatives:
\[
y' = 4e^{2x} - 9e^{3x}, \quad y'' = 8e^{2x} - 27e^{3x}.
\]
Substitute:
\[
(8e^{2x}-27e^{3x}) - 5(4e^{2x}-9e^{3x}) + 6(2e^{2x}-3e^{3x}) = (8-20+12)e^{2x} + (-27+45-18)e^{3x}=0.
\]
**Final answer**  
The identity holds identically.  
*Reflection:* Direct verification after the general solution is written confirms both algebra and the absence of hidden resonance.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using the same constant for both terms | Students treat the two exponentials as multiples of a single arbitrary constant | Always write two distinct constants \(c_1, c_2\) from the outset |
| Forgetting to check the discriminant sign | Habit of writing the quadratic formula without testing \(D\) | Compute \(D\) first and label the case explicitly before extracting roots |
| Writing \(r_1 = r_2\) when \(D>0\) | Arithmetic slip in the \(\pm\) term | Keep the two expressions separate until numerical values are substituted |
| Applying the repeated-root formula \(x e^{rx}\) | Confusion between Case 1 and Case 2 | Verify \(r_1 \neq r_2\) before discarding the \(x e^{rx}\) term |
| Sign error in the characteristic equation | Differentiating \(e^{rx}\) yields positive powers of \(r\) | Write the substitution step explicitly each time |
| Omitting the domain of validity | Belief that exponential solutions are global only for constant coefficients | State that the solution is valid on the entire real line once coefficients are constant |
| Treating initial conditions before forming the general solution | Premature specialization | First obtain the two-parameter family, then apply auxiliary conditions |

## 7. The textbook-precise statement
Let \(a, b, c\) be real constants with \(a \neq 0\). Consider the initial-value problem
\[
a y'' + b y' + c y = 0, \quad y(x_0) = y_0, \quad y'(x_0) = y_1.
\]
If the discriminant \(D = b^2 - 4ac > 0\), the characteristic equation possesses two distinct real roots
\[
r_{1,2} = \frac{-b \pm \sqrt{D}}{2a}.
\]
The unique solution is
\[
y(x) = c_1 e^{r_1 x} + c_2 e^{r_2 x},
\]
where \(c_1, c_2\) are determined by the initial data. (Boyce & DiPrima, *Elementary Differential Equations*, 11e, §3.1, Theorem 3.1.)

## 8. Visual — diagram or schematic
```text
r-axis
-3   -2   -1    0    1    2    3
 |    |    |    |    |    |    |
          r2=-0.5     r1=2
          *           *
Solution shapes (qualitative):
e^{2x}   → grows rapidly rightward
e^{-0.5x}→ decays slowly rightward
Linear combination may cross zero once, then follow the dominant sign.
```

## 9. The memory technique
1. **The hook** — Picture two distinct highway lanes, each with its own constant speed limit \(r_1\) and \(r_2\); every solution is a weighted sum of traffic flowing at those two fixed speeds.  
2. **What to overlearn** — The solution template \(y = c_1 e^{r_1 x} + c_2 e^{r_2 x}\) and the condition \(D > 0\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by substituting \(y = e^{rx}\) into the ODE, obtain the quadratic, and invoke linear independence of distinct exponentials via the Wronskian.

## 10. What this unlocks
Mastery of the distinct-real-root case supplies the first building block for all subsequent constant-coefficient theory and for the method of undetermined coefficients when the non-homogeneous term is itself exponential.  

- Case 2 (repeated roots) and Case 3 (complex roots) become immediate extensions.  
- Variation of parameters for non-homogeneous equations uses the same fundamental set \(\{e^{r_1 x}, e^{r_2 x}\}\).  
- Laplace-transform inversion tables list exactly these two-exponential pairs.  
- Modal analysis of coupled linear systems reduces to the same characteristic polynomial.

## 11. Self-check — five questions, no answers
1. For the equation \(y'' + 5y' + 6y = 0\), compute the roots and write the general solution.  
2. Show that if \(r_1 \neq r_2\) then \(e^{r_1 x}\) and \(e^{r_2 x}\) are linearly independent on \(\mathbb{R}\).  
3. An overdamped mass-spring system has equation \(x'' + 8x' + 15x = 0\). Find the solution satisfying \(x(0)=0\), \(x'(0)=2\).  
4. Why does the Wronskian test succeed automatically when the roots differ?  
5. Construct a second-order equation whose characteristic roots are \(3\) and \(-4\); then verify that \(y = e^{3x} + 2e^{-4x}\) satisfies it.