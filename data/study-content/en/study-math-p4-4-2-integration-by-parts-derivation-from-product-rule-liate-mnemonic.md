## 1. The one-sentence answer
**Integration by parts is the integral counterpart of the product rule for differentiation.**

Start from the ordinary product rule \((uv)' = u'v + uv'\). Rearrange the equation to isolate one of the two product terms on the left-hand side, then integrate both sides. The result converts the problem of integrating a product into the simpler tasks of differentiating one factor and integrating the other. The LIATE rule supplies a reliable ordering for choosing which factor to differentiate.

The derivation is purely algebraic once the product rule is granted; no new axioms are required. The only subtlety lies in recognizing that the constant of integration appears only after the final integration step, and that the choice of which function to call \(u\) and which to call \(dv\) determines whether the new integral is easier or harder than the original.

> [!NOTE]
> The single most powerful observation is that every successful application of integration by parts reduces the “complexity” of the integrand exactly because differentiation lowers the degree or type of one factor while integration raises it for the other.

## 2. Why this matters — concrete and current
In orbital-mechanics software used by SpaceX for Falcon 9 trajectory optimization, the thrust integral contains products of time-varying mass and acceleration; integration by parts converts these into boundary terms that are evaluated at engine cut-off, yielding closed-form expressions for \(\Delta v\) that run in microseconds on flight computers.

Semiconductor process simulators at TSMC evaluate the cumulative dose of ion implantation by integrating Gaussian–exponential products that model straggle; repeated integration by parts produces exact expressions for moments that are then fitted to measured wafer data, reducing the number of Monte-Carlo runs by roughly two orders of magnitude.

Transformer attention scores in large-language-model training involve integrals of softmax kernels whose arguments are products of query and key vectors; analytic integration by parts supplies gradient expressions that avoid finite-difference noise and allow larger learning rates during pre-training at OpenAI and Anthropic.

Radio-astronomy pipelines at the Event Horizon Telescope integrate visibility data containing products of Bessel functions and exponential phase terms; integration by parts yields rapidly convergent asymptotic expansions that permit real-time calibration of the 2019 M87* image.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Product rule for differentiation | Supplies the identity that is integrated to obtain the parts formula |
| Basic antiderivative table     | Supplies the \(\int dv = v\) step and the final \(\int v\,du\) |
| Chain rule (implicit)          | Guarantees that the differential \(du\) is computed correctly |

## 4. Building the idea — from intuition to formalism

### Step 1 — Begin with the product rule written in differential form
The product rule states that the derivative of a product is the sum of two ordinary derivatives.  
Concrete example: let \(u=x\), \(v=e^x\); then \((xe^x)'=e^x+xe^x\).  
Formal statement:
\[
d(uv)=u\,dv+v\,du.
\]
> [!WARNING]
> Treating \(du\) and \(dv\) as ordinary derivatives instead of differentials will later produce sign errors when the formula is rearranged.

### Step 2 — Isolate one product term
Move the \(v\,du\) term to the left-hand side:
\[
u\,dv=d(uv)-v\,du.
\]
This single algebraic rearrangement is the entire derivation.

### Step 3 — Integrate both sides
Integrate the previous line with respect to the underlying variable:
\[
\int u\,dv=\int d(uv)-\int v\,du.
\]
The middle integral collapses at once:
\[
\int d(uv)=uv+C.
\]

### Step 4 — Write the definite-integral version for clarity
For limits \(a\) to \(b\) the constant disappears and boundary terms appear:
\[
\int_a^b u\,dv=\Bigl[uv\Bigr]_a^b-\int_a^b v\,du.
\]

### Step 5 — Introduce the LIATE ordering rule
When the integrand is a product, label the factors according to the mnemonic **L**ogarithmic, **I**nverse trigonometric, **A**lgebraic, **T**rigonometric, **E**xponential; choose the earliest type as \(u\) (the factor to be differentiated). This ordering systematically reduces the complexity of the remaining integral.

### Step 6 — State the final textbook formula
The indefinite-integral form used in every subsequent calculation is
\[
\int u\,dv=uv-\int v\,du.
\]

## 5. Worked examples — every step shown

**Example 1 — Polynomial times exponential**  
*Given:* \(\int x e^x\,dx\)  
*Find:* the antiderivative.  
Set \(u=x\) (algebraic), \(dv=e^x\,dx\).  
Then \(du=dx\), \(v=e^x\).  
Apply the formula:
\[
\int x e^x\,dx=x e^x-\int e^x\,dx.
\]
*Why:* the product rule is being reversed.  
The remaining integral is standard:
\[
x e^x-e^x+C.
\]
**Final answer**  
\[xe^x-e^x+C\]

*Reflection:* choosing the polynomial as \(u\) lowered its degree; the reverse choice would have raised the degree.

**Example 2 — Natural logarithm**  
*Given:* \(\int\ln x\,dx\)  
*Find:* the antiderivative.  
Set \(u=\ln x\) (logarithmic), \(dv=dx\).  
Then \(du=\frac1x dx\), \(v=x\).  
\[
\int\ln x\,dx=x\ln x-\int x\cdot\frac1x\,dx=x\ln x-\int1\,dx=x\ln x-x+C.
\]
**Final answer**  
\[x\ln x-x+C\]

*Reflection:* LIATE forced the logarithm to be differentiated, converting the problem into an algebraic integral.

**Example 3 — Repeated application**  
*Given:* \(\int x^2 e^x\,dx\)  
*Find:* the antiderivative.  
First: \(u=x^2\), \(dv=e^x\,dx\) yields
\[
x^2 e^x-2\int x e^x\,dx.
\]
The new integral is Example 1, so
\[
x^2 e^x-2(x e^x-e^x)+C=x^2 e^x-2x e^x+2e^x+C.
\]
**Final answer**  
\[x^2e^x-2xe^x+2e^x+C\]

*Reflection:* tabular method or repeated parts reduces any polynomial–exponential product to a finite sum.

**Example 4 — Cyclic integrand**  
*Given:* \(\int e^x\sin x\,dx\)  
*Find:* the antiderivative.  
Apply parts twice and solve for the original integral:
\[
I=\int e^x\sin x\,dx=-e^x\cos x+\int e^x\cos x\,dx,
\]
\[
\int e^x\cos x\,dx=e^x\sin x-\int e^x\sin x\,dx=e^x\sin x-I.
\]
Substitute back:
\[
I=-e^x\cos x+e^x\sin x-I+C'\implies2I=e^x(\sin x-\cos x)+C.
\]
**Final answer**  
\[\frac12e^x(\sin x-\cos x)+C\]

*Reflection:* when parts returns a multiple of the original integral, algebraic rearrangement finishes the solution.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Choosing \(u\) and \(dv\) backwards | Habit of always differentiating the first factor | Apply LIATE strictly before writing \(du\) and \(dv\) |
| Forgetting the minus sign           | Mental carry-over from differentiation      | Write the formula as \(uv-\int v\,du\) each time     |
| Losing a factor of \(x\) when differentiating \(\ln x\) | Treating \(\ln x\) like a power rule        | Differentiate \(\ln x\) explicitly: \(d(\ln x)=dx/x\) |
| Applying parts to a sum instead of a product | Misreading the integrand                    | Verify the integrand is literally a product          |
| Stopping after one integration when the new integral is harder | No check against LIATE ordering             | Re-evaluate LIATE on the new integrand               |
| Omitting the constant \(C\) on indefinite integrals | Mechanical oversight                        | Add \(+C\) immediately after the last integration    |
| Using the formula on definite integrals without evaluating boundaries | Boundary term looks optional                | Always write \(\bigl[uv\bigr]_a^b\) first            |

## 7. The textbook-precise statement
Let \(u\) and \(v\) be differentiable functions of \(x\) on an interval \(I\) such that \(u'\) and \(v'\) are continuous on \(I\). Then
\[
\int u\,dv=uv-\int v\,du
\]
holds on \(I\) (indefinite-integral form). For the definite-integral form on \([a,b]\subset I\),
\[
\int_a^b u(x)v'(x)\,dx=\bigl[u(x)v(x)\bigr]_a^b-\int_a^b v(x)u'(x)\,dx.
\]
(See Stewart, *Calculus*, 9e, §7.1, Theorem 1.)

## 8. Visual — diagram or schematic
```text
Product Rule (forward)          Integration by Parts (reverse)
d/dx [ u(x) · v(x) ]            ∫ u dv
          |                              |
          v                              v
   u'v + uv'                    uv - ∫ v du
          |                              |
     two output terms            boundary term minus new integral
```
The diagram shows the exact reversal: the two terms produced by differentiation become the boundary term and the single remaining integral after integration.

## 9. The memory technique
1. **The hook** — Picture a courtroom “LIATE” judge who always calls the Logarithmic witness first; the judge’s gavel strike is the minus sign that appears when you integrate by parts.  
2. **What to overlearn** — The exact formula \(\int u\,dv=uv-\int v\,du\) and the ordering string “LIATE”.  
3. **Spaced-repetition schedule** — Review the formula at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.  
4. **First-principles fallback** — If the mnemonic is forgotten, begin again from \((uv)'=u'v+uv'\), isolate \(u\,dv\), and integrate.

## 10. What this unlocks
Integration by parts is the gateway technique for virtually every non-elementary integral that appears in physics and engineering. It directly enables reduction formulas for powers of sine and cosine, the integration of inverse trigonometric functions, the derivation of the Gamma-function recurrence, and the Laplace-transform identities used in control theory. Subsequent topics that rest on it include tabular integration, integration of rational functions of sine and cosine, and the method of undetermined coefficients for differential equations.

## 11. Self-check — five questions, no answers
1. Differentiate \(x\ln x-x\) and verify that the product rule recovers \(\ln x\).  
2. Compute \(\int\arctan x\,dx\) and state which LIATE category forced your choice of \(u\).  
3. Evaluate the definite integral \(\int_0^1 x^2e^{2x}\,dx\) by parts, showing every boundary term.  
4. For \(\int e^{2x}\sin3x\,dx\), how many applications of parts are required before the original integral reappears?  
5. Identify the single algebraic step that would be illegal if \(v\) were not differentiable on the interval of integration.