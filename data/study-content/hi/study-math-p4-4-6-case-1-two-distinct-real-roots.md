## 1. The one-sentence answer
**Case 1: two distinct real roots** describes the solution form for a second-order linear homogeneous ODE with constant coefficients when its characteristic equation yields two different real numbers \(r_1\) and \(r_2\).

The general solution is then a linear combination of two independent exponential functions \(e^{r_1 x}\) and \(e^{r_2 x}\). Because the roots differ, these functions are linearly independent and span the full two-dimensional solution space. You therefore write every solution as \(y = C_1 e^{r_1 x} + C_2 e^{r_2 x}\), where the constants \(C_1\) and \(C_2\) are fixed by initial or boundary conditions.

The exponential functions grow or decay at different rates, so their linear combination can produce a rich variety of monotonic or single-inflection behaviours without oscillation.

> [!NOTE]
> The decisive “aha” is that distinct real roots automatically guarantee two linearly independent solutions; no extra work (such as reduction of order or multiplication by \(x\)) is required.

## 2. Why this matters — concrete and current
In aerospace guidance software at SpaceX, the pitch-channel error dynamics of Falcon 9 are modelled by a second-order linear ODE whose characteristic roots are real and distinct; the closed-form solution lets the flight computer predict settling time without numerical integration at every 10 ms cycle.

Semiconductor foundries such as TSMC use this case when analysing thermal RC networks inside 3 nm chips; the two distinct time constants determine how quickly a transistor junction returns to equilibrium after a power surge.

In reinforcement-learning theory, the continuous-time linear quadratic regulator (LQR) reduces to exactly this ODE when the state-cost matrix has two real eigenvalues; the explicit solution supplies the optimal feedback gain used by DeepMind’s MuZero planning module.

Earthquake-engineering packages at ARUP simulate base-isolated buildings with two-mass models whose natural frequencies produce distinct real poles; the closed-form displacement history is fed directly into structural-failure probability codes.

Fundamental-physics papers on neutrino flavour oscillation in matter occasionally linearise the effective Hamiltonian; when the resulting eigenvalues are real and unequal, the probability amplitudes evolve precisely as linear combinations of two real exponentials.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Characteristic equation  | Converts the ODE into an algebraic equation whose roots decide the solution form |
| Linear independence      | Guarantees that two exponential solutions span the full solution space |
| Exponential function     | The only functions that remain proportional to their own derivatives |

If any row is unfamiliar, pause and review that single idea before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Assume an exponential trial solution
You guess that a solution might look like \(y = e^{rx}\) because the derivative of an exponential is again an exponential.  
Concrete example: for \(y'' - 3y' + 2y = 0\), try \(y = e^{rx}\).  
Formal statement: substitute into \(ay'' + by' + cy = 0\) to obtain the characteristic equation  
\[a r^2 + b r + c = 0.\]  
> [!WARNING]  
> If you forget to divide by the leading coefficient \(a\) before solving, the numerical values of the roots become wrong and every subsequent constant will be incorrect.

### Step 2 — Solve the quadratic for two distinct real roots
The discriminant \(D = b^2 - 4ac > 0\) yields two different real numbers \(r_1 \neq r_2\).  
Example: \(r^2 - 3r + 2 = 0\) factors as \((r-1)(r-2)=0\), so \(r_1=1\), \(r_2=2\).

### Step 3 — Verify each exponential satisfies the ODE
Differentiate \(y_1 = e^{r_1 x}\) twice and substitute; the characteristic equation forces the result to zero. The same holds for \(y_2 = e^{r_2 x}\).

### Step 4 — Form the linear combination
Because the ODE is linear and homogeneous, any linear combination \(y = C_1 y_1 + C_2 y_2\) is also a solution.  
Formal statement:  
\[y(x) = C_1 e^{r_1 x} + C_2 e^{r_2 x}.\]

### Step 5 — Confirm linear independence via Wronskian
The Wronskian  
\[W = (r_2 - r_1) e^{(r_1 + r_2)x} \neq 0\]  
when \(r_1 \neq r_2\), proving the two functions form a fundamental set.

### Step 6 — Apply initial conditions to fix constants
Given \(y(0) = y_0\), \(y'(0) = v_0\), solve the 2-by-2 linear system for \(C_1\) and \(C_2\).

### Step 7 — Textbook-grade statement
If \(r_1\) and \(r_2\) are distinct real roots of the characteristic equation, the general solution on \(\mathbb{R}\) is exactly the expression in Step 4.

## 5. Worked examples — har step show karo

**Example 1 — Simple factorable equation**  
*Given:* \(y'' - 3y' + 2y = 0\), \(y(0)=3\), \(y'(0)=4\).  
*Find:* general and particular solution.  
Characteristic equation: \(r^2 - 3r + 2 = 0\) → \(r_1=1\), \(r_2=2\).  
General solution: \(y = C_1 e^x + C_2 e^{2x}\).  
Differentiate: \(y' = C_1 e^x + 2 C_2 e^{2x}\).  
Apply \(y(0)=3\): \(C_1 + C_2 = 3\).  
Apply \(y'(0)=4\): \(C_1 + 2 C_2 = 4\).  
Subtract: \(C_2 = 1\), so \(C_1 = 2\).  
**Final answer**  
\[y(x) = 2e^x + e^{2x}.\]  
*Reflection:* the arithmetic is trivial, yet the same pattern scales to any pair of real roots.

**Example 2 — Non-integer roots**  
*Given:* \(y'' - y' - 6y = 0\).  
Roots: \(r = \frac{1\pm\sqrt{25}}{2} = 3,-2\).  
General solution: \(y = C_1 e^{3x} + C_2 e^{-2x}\).  
**Final answer**  
\[y(x) = C_1 e^{3x} + C_2 e^{-2x}.\]  
*Reflection:* negative roots simply produce decay; the algebra never changes.

**Example 3 — Repeated initial conditions**  
*Given:* \(4y'' + 4y' - 3y = 0\), \(y(0)=1\), \(y'(0)=0\).  
Divide by 4: \(r^2 + r - 3/4 = 0\). Roots \(r = \frac{-1\pm\sqrt{4}}{2} = 0.5, -1.5\).  
General solution: \(y = C_1 e^{0.5x} + C_2 e^{-1.5x}\).  
System yields \(C_1 = 0.75\), \(C_2 = 0.25\).  
**Final answer**  
\[y(x) = 0.75 e^{0.5x} + 0.25 e^{-1.5x}.\]  
*Reflection:* fractions appear naturally; keep exact values until the end.

**Example 4 — Mixed sign roots with verification**  
*Given:* \(y'' + y' - 2y = 0\). Roots \(r=1,-2\).  
Solution: \(y = C_1 e^x + C_2 e^{-2x}\).  
Second derivative test: \(y'' = C_1 e^x + 4 C_2 e^{-2x}\).  
Substitute back: \(C_1 e^x + 4 C_2 e^{-2x} + C_1 e^x + 4 C_2 e^{-2x} - 2(C_1 e^x + C_2 e^{-2x}) = 0\).  
**Final answer**  
\[y(x) = C_1 e^x + C_2 e^{-2x}.\]  
*Reflection:* explicit verification builds that the characteristic-equation shortcut is valid.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using the same \(C\) for both terms | Students copy the first constant mechanically | Label constants \(C_1, C_2\) from the start |
| Forgetting to check \(r_1 \neq r_2\) | Over-reliance on quadratic formula output   | Always compute discriminant before writing solution |
| Sign error when dividing by leading coefficient | Equation written as \(r^2 + \frac{b}{a}r + \frac{c}{a}=0\) | Divide coefficients explicitly on paper      |
| Treating repeated-root case as distinct | Missing the discriminant test               | Compute \(D\) first; if \(D=0\) switch case   |
| Losing the factor of \(a\) in initial-condition system | Matrix row scaling omitted                  | Keep the coefficient matrix exactly as differentiated |
| Confusing \(e^{r_1 x}\) with \(e^{r_2 x}\) when roots are close | Numerically similar exponents               | Keep symbolic labels until final substitution |
| Applying boundary conditions at \(x=1\) instead of \(x=0\) | Misreading problem statement                | Circle the point where conditions are given  |

## 7. The textbook-precise statement
Let \(a, b, c\) be real constants with \(a \neq 0\). Consider the initial-value problem  
\[a y'' + b y' + c y = 0, \quad y(x_0) = y_0, \quad y'(x_0) = y_1.\]  
If the characteristic equation \(a r^2 + b r + c = 0\) has two distinct real roots \(r_1\) and \(r_2\), then the unique solution on \(\mathbb{R}\) is  
\[y(x) = C_1 e^{r_1(x-x_0)} + C_2 e^{r_2(x-x_0)},\]  
where \(C_1, C_2\) are determined by the initial data. (Boyce & DiPrima, *Elementary Differential Equations and Boundary Value Problems*, 11e, §3.1, Theorem 3.1.1, Case I.)

## 8. Visual — diagram or schematic
```
y
^
|          e^{2x}
|        /
|      /
|    /
|  /
|/
+-------------------> x
 \
  \
   \
    \
     e^{x}
```
Two curves start at different slopes at \(x=0\); their linear combination lies between them and never oscillates.

## 9. The memory technique

1. **The hook**  
   Picture two sprinters leaving the same starting line at different constant speeds; the distance each covers is exactly \(e^{r x}\). The solution is simply the weighted sum of their positions.

2. **What to overlearn**  
   - Formula: \(y = C_1 e^{r_1 x} + C_2 e^{r_2 x}\) when \(r_1 \neq r_2\).  
   - Discriminant test: \(D = b^2 - 4ac > 0\).  
   - Wronskian never zero for distinct roots.

3. **Spaced-repetition schedule**  
   Review the three items above after 1 day, 3 days, 7 days, 16 days, and 35 days.

4. **First-principles fallback**  
   If the formula is forgotten, restart from the substitution \(y = e^{rx}\) into the ODE, obtain the characteristic quadratic, and verify linear independence via the Wronskian.

## 10. What this unlocks
Mastery of this case lets you immediately recognise when a system will exhibit pure exponential growth or decay without oscillation. It is the gateway to:

- Case 2 (repeated roots) and Case 3 (complex roots) of the same ODE family,
- variation of parameters for non-homogeneous equations,
- eigenvalue analysis of 2-by-2 linear systems of ODEs,
- Laplace-transform inversion tables that list exactly these exponential pairs,
- stability classification of equilibria in nonlinear planar systems.

## 11. Self-check — five questions, no answers
1. Write the characteristic equation for \(3y'' - 5y' + 2y = 0\) and state whether Case 1 applies.  
2. For roots \(r_1 = 0\) and \(r_2 = -4\), sketch the qualitative shape of a typical solution that starts positive and has negative initial slope.  
3. Compute the Wronskian of \(e^{3x}\) and \(e^{-x}\) at \(x=1\).  
4. An engineer claims that the solution must contain a factor of \(x\) because the roots are “almost equal.” Identify the conceptual error.  
5. Given \(y'' - 5y' + 6y = 0\) with \(y(0)=0\), \(y'(0)=6\), find the exact value of \(y(1)\) without a calculator.