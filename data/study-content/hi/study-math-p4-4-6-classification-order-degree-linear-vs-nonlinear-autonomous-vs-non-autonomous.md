## 1. The one-sentence answer
**Classification of an ordinary differential equation tells you its order, degree, whether it is linear or nonlinear, and whether it is autonomous or non-autonomous; these four labels together decide which solution methods can even be attempted.**

Order counts the highest derivative present. Degree is the power to which the highest-order derivative is raised after the equation is polynomial in all derivatives. Linearity requires that the unknown function and all its derivatives appear only to the first power and never multiplied by each other. Autonomy means the independent variable does not appear explicitly on the right-hand side.  
Taken together, these labels partition the universe of ODEs into families that share the same existence theorems, the same numerical schemes, and often the same closed-form techniques.  

> [!NOTE]
> The single most important “aha” is that linearity plus autonomy together give you the strongest existence-uniqueness theorem and the richest set of explicit solution methods; every other combination forces you to accept weaker guarantees or numerical approximation from the start.

## 2. Why this matters — concrete and current
In orbital mechanics, SpaceX’s guidance software classifies the two-body problem as a second-order autonomous nonlinear system; the autonomy lets them reduce it to a first-order autonomous system via conservation of energy before integrating numerically with high-order Runge–Kutta schemes.  
Semiconductor process engineers at TSMC model dopant diffusion with a fourth-order linear parabolic PDE that reduces to a linear non-autonomous ODE after separation of variables; the linearity guarantees that superposition of error functions remains valid even when the diffusion coefficient changes with time.  
In reinforcement-learning continuous-control benchmarks, the MuJoCo physics engine treats rigid-body dynamics as a first-order autonomous nonlinear system; autonomy allows the same learned policy to be time-invariant, which is why PPO and SAC converge faster than on explicitly time-dependent variants.  
Climate models at ECMWF linearise the primitive equations around a reference trajectory, producing a non-autonomous linear system whose stability is analysed with Floquet theory; the non-autonomy arises from the seasonal forcing term and forces the use of periodic-coefficient solvers rather than constant-coefficient eigenvalue routines.  
Epidemiologists fitting SEIR models to real-time COVID data treat the classic equations as first-order autonomous nonlinear until they introduce time-varying contact rates; the switch to non-autonomous immediately rules out phase-plane analysis and forces them to use adjoint-based parameter estimation instead.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Derivative               | Order and degree are defined directly from the highest derivative present.           |
| Polynomial               | Degree is only defined after the equation is polynomial in the derivatives.          |
| Function of several variables | Autonomy hinges on whether the right-hand side depends explicitly on the independent variable. |

If any of these three ideas feels shaky, pause and review single-variable calculus and elementary algebra of polynomials before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the order
Order is simply the highest derivative that appears, regardless of its power or the presence of other terms.  
Consider the equation  
\[
\frac{d^3 y}{dx^3} + \left(\frac{dy}{dx}\right)^2 = 0.
\]  
The highest derivative is the third, so the order is 3.  
**Formal statement.** The order of an ODE is the positive integer \(n\) such that the equation can be written  
\[
F(x,y,y',\dots,y^{(n)})=0
\]  
and \(y^{(n)}\) actually occurs.  

> [!WARNING]
> Students often miscount when the equation is given in implicit form or after differentiation; always locate the literal highest derivative symbol before assigning the number.

### Step 2 — Check whether degree is defined
Degree exists only after the ODE has been written as a polynomial equation in the derivatives; fractional or negative powers make degree undefined.  
Rewrite  
\[
\left(\frac{d^2 y}{dx^2}\right)^3 + y = 0
\]  
as a polynomial of degree 3 in \(y''\).  
**Formal statement.** If the ODE can be expressed as a polynomial of degree \(m\) in the highest derivative \(y^{(n)}\) while lower derivatives appear with any powers, the degree is \(m\).

### Step 3 — Test linearity
An ODE is linear when every term containing \(y\) or any derivative is multiplied only by a function of the independent variable and never by another copy of \(y\) or its derivatives.  
The general first-order linear form is  
\[
\frac{dy}{dx} + P(x)y = Q(x).
\]  
Any product such as \(y\cdot y'\) immediately renders the equation nonlinear.  

> [!WARNING]
> Autonomy is irrelevant to linearity; a nonlinear autonomous equation is still nonlinear.

### Step 4 — Test autonomy
An ODE is autonomous when the independent variable does not appear explicitly once the equation is solved for the highest derivative.  
\[
\frac{dy}{dx} = y^2
\]  
is autonomous;  
\[
\frac{dy}{dx} = x y
\]  
is non-autonomous.  

### Step 5 — Combine the four labels
Every ODE now receives a four-tuple label: (order, degree-or-undefined, linear/nonlinear, autonomous/non-autonomous).  
This tuple determines the applicable existence theorem, the possibility of an integrating factor, and whether phase-plane methods are admissible.

### Step 6 — Link labels to solution strategy
First-order linear autonomous equations admit separation of variables; second-order linear non-autonomous equations with variable coefficients usually require series methods; nonlinear autonomous systems of order greater than one generally demand qualitative or numerical treatment.

## 5. Worked examples — har step show karo

**Example 1 — Simple first-order linear autonomous**  
*Given:* \(\frac{dy}{dx}=3y\).  
*Find:* Full classification.  
The highest derivative is first, so order = 1.  
The equation is already polynomial of degree 1 in \(y'\).  
No product of \(y\) with itself or its derivatives appears, hence linear.  
Right-hand side contains no explicit \(x\), hence autonomous.  
**Classification: (1,1,linear,autonomous).**  

*Reflection:* The labels immediately tell us separation of variables will succeed and an explicit exponential solution exists.

**Example 2 — Second-order nonlinear non-autonomous**  
*Given:* \(y'' + x(y')^2 + y = \sin x\).  
*Find:* Full classification.  
Highest derivative is second, order = 2.  
Polynomial of degree 1 in \(y''\), degree = 1.  
The term \((y')^2\) is a product of the derivative with itself, hence nonlinear.  
Explicit \(x\) on both sides, hence non-autonomous.  
**Classification: (2,1,nonlinear,non-autonomous).**

*Reflection:* Phase-plane reduction is impossible; numerical integration or perturbation methods are required.

**Example 3 — Degree undefined**  
*Given:* \(\sqrt{y''} + y = 0\).  
*Find:* Degree.  
Square both sides to obtain a polynomial, but the original equation is not polynomial in \(y''\); degree is therefore undefined.  
**Classification: (2,undefined,nonlinear,autonomous).**

*Reflection:* Many existence theorems assume polynomial dependence; this equation falls outside their hypotheses.

**Example 4 — System written as a single high-order equation**  
*Given:* \(\frac{d^4 y}{dt^4} + 2\frac{d^2 y}{dt^2} + y = 0\).  
*Find:* Full classification.  
Order 4, degree 1, linear, autonomous.  
**Classification: (4,1,linear,autonomous).**

*Reflection:* The characteristic equation method applies directly because of the linear autonomous structure.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Confusing order with degree | Students see a squared derivative and call the order 2 | Always locate the derivative symbol first, then examine its exponent separately |
| Declaring an equation linear because “no obvious products” | Hidden products appear after clearing denominators | Expand every term and check that \(y^{(k)}\) never multiplies another \(y^{(m)}\) |
| Forgetting that autonomy is checked after solving for the highest derivative | The independent variable may hide inside coefficients | Isolate the highest derivative and inspect the right-hand side only |
| Assigning degree when radicals remain | The equation looks polynomial until radicals are removed | Verify the original expression is polynomial in all derivatives before stating degree |
| Treating systems as single equations without converting | Order of a system is defined via the vector of first-order equations | Convert any system to first-order vector form before classifying order |
| Assuming constant-coefficient implies autonomous | Time-dependent forcing can still appear | Check explicit presence of the independent variable, not coefficient constancy |
| Misreading implicit differentiation as raising order | Extra derivatives introduced during implicit differentiation | Classify the equation exactly as presented, not after further differentiation |

## 7. The textbook-precise statement
An ordinary differential equation of order \(n\) is an equation of the form  
\[
F(x,y,y',\dots,y^{(n)})=0,
\]  
where \(F\) is a given function of \(n+2\) variables. The equation is said to be linear if it can be written  
\[
a_n(x)y^{(n)}+\dots+a_1(x)y'+a_0(x)y=g(x)
\]  
with \(a_n(x)\not\equiv0\); otherwise it is nonlinear. The equation is autonomous if \(F\) does not depend explicitly on \(x\) once solved for the highest derivative; otherwise it is non-autonomous. Degree is defined only when the equation, after clearing radicals and negative powers, is polynomial in the derivatives; it is then the highest power of \(y^{(n)}\). (Boyce & DiPrima, *Elementary Differential Equations and Boundary Value Problems*, 11e, Section 1.1.)

## 8. Visual — diagram or schematic
```
Order ──► 1          2          ≥3
          │          │           │
Degree    │          │           │
 1        L/A   L/NA   NL/A   NL/NA
undefined  same branches
Legend: L=linear, NL=nonlinear, A=autonomous, NA=non-autonomous
```
Read left to right: first fix order, then degree (or undefined), then linearity, then autonomy. Each terminal leaf tells you the admissible solution family.

## 9. The memory technique
**The hook** — Picture an old lantern (OLD LAN) hanging above your desk: Order, Linearity, Degree, Autonomy, Non-autonomy.  
**What to overlearn** — (i) order = highest derivative index, (ii) linear ⇔ no products among \(y\) and derivatives, (iii) autonomous ⇔ no explicit \(x\) after isolating highest derivative.  
**Spaced-repetition schedule** — Review the four labels on day 1, day 3, day 7, day 16, day 35.  
**First-principles fallback** — If you forget a definition, start from the differential equation, isolate the highest derivative, count its index for order, inspect its exponent for degree, scan for multiplicative \(y\) terms for linearity, and check whether \(x\) survives on the right-hand side for autonomy.

## 10. What this unlocks
These four labels are the gatekeepers to every subsequent technique in the course.  
- First-order linear equations open the door to integrating factors.  
- Autonomous nonlinear first-order equations permit separation and phase-line analysis.  
- Linear constant-coefficient equations of any order admit characteristic polynomials.  
- Non-autonomous linear equations lead to variation of parameters and Green’s functions.  
- Higher-order nonlinear autonomous systems introduce the centre-manifold and Lyapunov-function machinery.  
Without the classification step, you cannot even decide which of the above tools is mathematically justified.

## 11. Self-check — five questions, no answers
1. Classify \(\frac{d^2y}{dx^2}+x^2y=0\) completely and state which solution method is immediately admissible.  
2. Give an example of a second-order equation whose degree is undefined; justify in one sentence.  
3. A student claims “\(\frac{dy}{dt}=y^2+t\) is linear because \(y^2\) is only on the right.” Identify the precise error.  
4. Convert the system \(x'=y\), \(y'=-x+ty\) into a single second-order equation and classify the result.  
5. Why does autonomy alone not guarantee an explicit solution even for first-order equations? Provide a concrete counter-example.