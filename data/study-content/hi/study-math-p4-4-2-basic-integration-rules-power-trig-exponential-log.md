## 1. The one-sentence answer
**Basic integration rules are the direct antiderivative formulas that reverse differentiation for power functions, trigonometric functions, exponentials, and logarithms.**

These rules form the foundation of every integration technique you will meet later. Aap already know how to differentiate \(x^n\), \(\sin x\), \(e^x\), and \(\ln x\); integration simply runs those operations backward while adding the constant of integration. Once you internalise the four families of formulas, most elementary indefinite integrals become immediate lookups rather than derivations.

The power rule handles polynomials and rational powers, trigonometric rules cover the six basic circular functions and their inverses, the exponential rule is almost unchanged from differentiation, and the logarithmic rule appears when you differentiate products or quotients that produce \(\frac{1}{x}\). Together they let you integrate any linear combination of these functions without substitution or parts.

> [!NOTE]
> The single most important “aha” is that every integration rule is the derivative rule written in reverse; if you can differentiate fluently, you already know the integration table—you only need to flip the direction and remember the constant \(+C\).

## 2. Why this matters — concrete and current
SpaceX uses analytic integrals of polynomial thrust profiles to compute real-time velocity and position updates during Falcon 9 ascent; the power rule supplies the closed-form expressions that run inside the flight computer.  

In semiconductor process simulation, Synopsys TCAD tools integrate exponential dopant diffusion equations to predict junction depths; the exponential integral rule appears inside every diffusion step of the solver.  

LIGO gravitational-wave data analysis pipelines integrate trigonometric window functions against detector noise spectra; the sine and cosine integrals determine the optimal matched-filter templates that extracted GW150914.  

Modern quantitative finance libraries (for example, QuantLib) integrate the exponential and logarithmic terms that arise from the Black–Scholes PDE under continuous compounding; a single sign error in the log rule produces arbitrage violations in pricing engines.  

Population-dynamics models at the Pasteur Institute integrate exponential growth modulated by logarithmic saturation terms to forecast antibiotic-resistance spread; the combined exp-log integrals feed directly into policy simulators used by WHO.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Derivative of \(x^n\)    | Power rule is its exact reversal                          |
| Derivatives of \(\sin x\), \(\cos x\), \(e^x\), \(\ln x\) | Trigonometric, exponential and logarithmic integrals are their reversals |
| Constant multiple and sum rules for differentiation | They carry over unchanged to integration                  |
| Definition of indefinite integral as family of antiderivatives | Explains why \(+C\) must appear                           |

If any row is shaky, pause and review the corresponding differentiation section first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Reverse the power rule
Aap already know \(\frac{d}{dx}[x^{n+1}] = (n+1)x^n\). Running the operation backward immediately gives the antiderivative of \(x^n\).

Example: differentiate \(x^3\) to obtain \(3x^2\); therefore the antiderivative of \(x^2\) must be \(\frac{1}{3}x^3\).

Formal statement:
\[
\int x^n\,dx = \frac{x^{n+1}}{n+1}+C \qquad (n\neq -1).
\]

> [!WARNING]
> Forgetting the “\(n\neq -1\)” clause produces division by zero; the missing case \(\int\frac{1}{x}\,dx\) must be treated separately with the logarithm.

### Step 2 — Handle the trigonometric quartet
Differentiation cycles sine to cosine and cosine to negative sine. Reversing both directions yields the four standard trig integrals.

Example: \(\frac{d}{dx}[\sin x]=\cos x\), so \(\int\cos x\,dx=\sin x+C\).

Formal statement:
\[
\int\sin x\,dx=-\cos x+C,\qquad\int\cos x\,dx=\sin x+C.
\]

### Step 3 — Integrate the exponential
The exponential is its own derivative, therefore it is also its own antiderivative up to a constant multiple.

Formal statement:
\[
\int e^x\,dx=e^x+C.
\]

### Step 4 — Recover the logarithm
Because \(\frac{d}{dx}[\ln|x|]=\frac{1}{x}\), the missing power-rule case is supplied by the natural logarithm.

Formal statement:
\[
\int\frac{1}{x}\,dx=\ln|x|+C.
\]

### Step 5 — Extend by linearity
Any linear combination of integrable functions is integrated term by term; constants factor out exactly as in differentiation.

Formal statement:
\[
\int\bigl(af(x)+bg(x)\bigr)\,dx=a\int f(x)\,dx+b\int g(x)\,dx+C.
\]

### Step 6 — Textbook-grade summary
All six families together constitute the “standard table of integrals” that every subsequent technique (substitution, parts, partial fractions) ultimately reduces to.

## 5. Worked examples — har step show karo

**Example 1 — Simple power**
*Given:* \(\int 3x^4\,dx\)  
*Find:* the indefinite integral.  
Step 1: factor out constant, \(3\int x^4\,dx\).  
*Why:* linearity lets the coefficient travel unchanged.  
Step 2: apply power rule, \(3\cdot\frac{x^5}{5}+C\).  
*Why:* exponent increases by 1, divide by new exponent.  
**Final answer**  
\[ \frac{3}{5}x^5+C \]

*Reflection:* The example is easy, yet it already shows that constants must be handled before the power rule is applied.

**Example 2 — Trigonometric integral with sign**
*Given:* \(\int 4\sin x\,dx\)  
*Find:* the indefinite integral.  
Step 1: factor, \(4\int\sin x\,dx\).  
*Why:* linearity again.  
Step 2: reverse derivative, \(4(-\cos x)+C\).  
*Why:* derivative of cosine is negative sine, so antiderivative carries the minus.  
**Final answer**  
\[ -4\cos x+C \]

*Reflection:* Sign errors appear precisely when students forget the chain of derivatives for sine and cosine.

**Example 3 — Exponential plus power**
*Given:* \(\int(e^x+5x^{-2})\,dx\)  
*Find:* the indefinite integral.  
Step 1: split, \(\int e^x\,dx+5\int x^{-2}\,dx\).  
*Why:* linearity permits term-by-term integration.  
Step 2: integrate each, \(e^x+5\cdot\frac{x^{-1}}{-1}+C\).  
*Why:* power rule works for negative exponents provided the exponent is not −1.  
**Final answer**  
\[ e^x-5/x+C \]

*Reflection:* Mixing families in one integrand is the first step toward realistic problems.

**Example 4 — Logarithmic case with absolute value**
*Given:* \(\int\frac{3}{x}\,dx\)  
*Find:* the indefinite integral.  
Step 1: factor, \(3\int\frac{1}{x}\,dx\).  
*Why:* constant moves outside.  
Step 2: apply log rule, \(3\ln|x|+C\).  
*Why:* absolute value keeps the expression defined for negative \(x\).  
**Final answer**  
\[ 3\ln|x|+C \]

*Reflection:* Omitting the absolute value is the most common source of domain errors on exams.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting \(+C\)           | Treating indefinite integral as definite    | Always write “+C” before boxing the answer   |
| Using power rule at \(n=-1\) | Over-generalising the formula               | Check exponent first; switch to \(\ln|x|\)   |
| Sign error in \(\int\sin x\) | Confusing derivative cycle                  | Memorise the cycle “sin→cos→−sin→−cos”      |
| Dropping absolute value     | Thinking \(\ln x\) is enough                | Write \(\ln|x|\) until substitution justifies dropping it |
| Treating \(\int e^{kx}\) as \(e^x\) | Ignoring chain-rule constant                | Always insert \(\frac{1}{k}e^{kx}\)          |
| Integrating term-by-term without linearity check | Applying rule to products                   | Verify the integrand is a sum before splitting |
| Confusing \(\int\frac{1}{x}\) with \(\int x^{-1}\) derivative | Notation slip                               | Keep the differential \(dx\) visible         |

## 7. The textbook-precise statement
The indefinite integrals of the elementary functions are given by the following formulas (valid on the largest intervals where the integrands are continuous):

\[
\int x^n\,dx=\frac{x^{n+1}}{n+1}+C\ (n\neq-1),\qquad
\int\frac{1}{x}\,dx=\ln|x|+C,
\]
\[
\int\sin x\,dx=-\cos x+C,\qquad
\int\cos x\,dx=\sin x+C,
\]
\[
\int e^x\,dx=e^x+C.
\]

These identities follow at once from the corresponding differentiation formulas and the fact that two antiderivatives of the same function differ by a constant (Stewart, *Calculus*, 9e, §4.1 and §4.2).

## 8. Visual — diagram or schematic
```text
Function family          Derivative                  Antiderivative
x^n  (n≠−1)   ────►  n x^{n−1}          ◄────  x^{n+1}/(n+1) + C
1/x               ────►  1/x^2               ◄────  ln|x| + C
sin x             ────►  cos x               ◄──── −cos x + C
cos x             ────► −sin x               ◄────  sin x + C
e^x               ────►  e^x                 ◄────  e^x + C
```
Arrows point both ways; each right-hand column entry is obtained by reversing the left-hand differentiation step and adding \(+C\).

## 9. The memory technique

1. **The hook**  
   Picture a rocket (power), a spinning wheel (trig), a growing colony of bacteria (exponential), and a slow dripping tap (log) all moving along the same number line; each object “undoes” its own motion when you integrate.

2. **What to overlearn**  
   - \(\int x^n\,dx=\frac{x^{n+1}}{n+1}+C\) (\(n\neq-1\))  
   - \(\int\sin x\,dx=-\cos x+C\), \(\int\cos x\,dx=\sin x+C\)  
   - \(\int e^x\,dx=e^x+C\), \(\int\frac{1}{x}\,dx=\ln|x|+C\)

3. **Spaced-repetition schedule**  
   Review the six formulas after 1 day, 3 days, 7 days, 16 days and 35 days; each time write them from memory without looking.

4. **First-principles fallback**  
   If any formula is forgotten, differentiate the candidate antiderivative; the result must recover the original integrand. This single check rebuilds the entire table.

## 10. What this unlocks
Mastery of these rules is the prerequisite for every advanced integration method.  

- Substitution (u-sub) reduces complicated integrands to the basic table.  
- Integration by parts converts products into sums that the table can finish.  
- Trigonometric substitution and partial fractions ultimately produce combinations of powers, trig functions, exponentials and logs.  
- Definite-integral applications (area, volume, arc length, work) rely on evaluating these same antiderivatives at limits.  
- Differential equations in physics and engineering are solved by integrating both sides using exactly these rules.

## 11. Self-check — five questions, no answers
1. Compute \(\int(2x^3-4x+7)\,dx\) and verify by differentiation.  
2. Evaluate \(\int(3\cos x-2\sin x)\,dx\). Where does the sign pattern come from?  
3. Find \(\int(e^{2x}+\frac{5}{x})\,dx\). What adjustment appears because of the coefficient 2?  
4. A student writes \(\int x^{-1}\,dx=\frac{x^0}{0}+C\). Identify the error and give the correct antiderivative.  
5. Without looking at notes, list the six basic antiderivative families and state the precise domain restriction that applies to the power rule.