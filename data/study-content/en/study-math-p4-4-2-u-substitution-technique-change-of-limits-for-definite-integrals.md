## 1. The one-sentence answer
**U-substitution replaces the inner function of a composite integrand with a new variable \(u\), converts the differential accordingly, and—when the integral is definite—maps the original limits directly onto new limits expressed in \(u\)**.

This works because the chain rule produces exactly the product of an outer derivative and an inner derivative that appears in many integrands. By setting \(u\) equal to the inner expression, the entire product collapses into the elementary form \(\int f(u)\,du\). The technique therefore converts an apparently complicated integral into one that can be evaluated by the power rule, logarithm rule, or any other standard antiderivative.

When the integral is definite, the same substitution changes the endpoints. The lower limit \(x=a\) becomes \(u=g(a)\) and the upper limit \(x=b\) becomes \(u=g(b)\), where \(g\) is the inner function. The resulting definite integral in \(u\) already incorporates the correct numerical bounds, so there is never any need to return to \(x\) before evaluating.

> [!NOTE]
> The decisive insight is that the differential \(du = g'(x)\,dx\) carries the inner derivative; once it is written, every occurrence of the inner function must be replaced by \(u\) and the limits must be rewritten at the same moment—otherwise the numerical value of the definite integral is altered.

## 2. Why this matters — concrete and current
In orbital-mechanics software used by SpaceX to compute fuel-optimal trajectories, the thrust integral contains a composite expression arising from the inverse-square gravitational force; u-substitution with a change of limits converts the definite integral over true anomaly into a simpler integral over eccentric anomaly, allowing rapid numerical quadrature inside the onboard flight computer.

Semiconductor process engineers at TSMC evaluate the total dopant dose implanted beneath a transistor gate by integrating a Gaussian profile whose argument is quadratic in depth; the substitution \(u = x^2/(2\sigma^2)\) together with adjusted limits yields an error-function value that is compared against measured sheet resistance in every process-control run.

In the training loop of large language models at OpenAI, the KL-divergence regularizer between policy and reference distributions produces an integral whose integrand is the product of a log-ratio and a softmax; the substitution that linearizes the exponent reduces each mini-batch gradient step to a single call to the cumulative distribution function rather than a numerical quadrature.

High-energy physicists at CERN’s ATLAS experiment reconstruct missing transverse energy by integrating a composite Breit–Wigner lineshape over a finite detector acceptance window; the substitution that centers the resonance converts the definite integral into a standard arctangent form whose limits are pre-computed once per luminosity block.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Chain rule (differentiation) | U-substitution is its exact reversal; without recognizing the outer-times-inner structure, the correct \(du\) cannot be written. |
| Antiderivative of elementary functions | After substitution the integral must reduce to a form whose antiderivative is already known. |
| Evaluation of definite integrals | The fundamental theorem supplies the numerical value once the antiderivative is obtained at the transformed limits. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Spot the inner function
Look for an integrand that is visibly a product of a function of some expression and the derivative of that same expression.  
Example: \(\int 2x\sqrt{x^2+1}\,dx\).  
The inner expression is \(x^2+1\), its derivative \(2x\) sits in front.  
Formally, if \(F'(u(x))u'(x)\) appears, the integral is \(\int F'(u(x))u'(x)\,dx\).

> [!WARNING]
> If the factor in front is not precisely \(u'(x)\), the substitution will leave stray \(x\) terms and the integral will not simplify.

### Step 2 — Introduce the new variable
Set \(u = g(x)\) where \(g\) is the inner function.  
In the example, \(u = x^2 + 1\).  
Differentiate both sides to obtain the differential relation \(du = g'(x)\,dx\).

### Step 3 — Rewrite the integrand completely in \(u\)
Replace every occurrence of the inner expression by \(u\) and replace \(g'(x)\,dx\) by \(du\).  
The example becomes \(\int\sqrt{u}\,du = \int u^{1/2}\,du\).

### Step 4 — Integrate with respect to \(u\)
Obtain the antiderivative in the \(u\)-variable: \(\frac{2}{3}u^{3/2} + C\).

### Step 5 — Change the limits (definite case)
When limits are present, evaluate the inner function at each endpoint.  
For \(\int_0^1 2x\sqrt{x^2+1}\,dx\) the lower limit \(x=0\) gives \(u=1\) and the upper limit \(x=1\) gives \(u=2\).  
The definite integral is now \(\int_1^2 u^{1/2}\,du\).

### Step 6 — Evaluate and back-substitute if needed
Compute \(\Bigl[\frac{2}{3}u^{3/2}\Bigr]_1^2 = \frac{2}{3}(2\sqrt{2}-1)\).  
Because the limits were changed, no return to \(x\) is required.

### Step 7 — Textbook statement of the substitution rule for definite integrals
Let \(g'\) be continuous on \([a,b]\) and let \(f\) be continuous on the range of \(g\). Then
\[
\int_a^b f(g(x))g'(x)\,dx = \int_{g(a)}^{g(b)} f(u)\,du.
\]

## 5. Worked examples — every step shown

**Example 1 — Linear inner function**  
*Given:* \(\int_0^2 3(3x+1)^4\,dx\)  
*Find:* its exact value.  

Set \(u=3x+1\). Then \(du=3\,dx\), so \(dx=du/3\).  
When \(x=0\), \(u=1\); when \(x=2\), \(u=7\).  
The integral becomes
\[
\int_1^7 u^4\,du = \Bigl[\frac15 u^5\Bigr]_1^7 = \frac{1}{5}(16807-1)=3361.2.
\]
**3361.2**  
*Reflection:* The coefficient 3 in front exactly matched \(du\), so the substitution was frictionless; this pattern appears whenever a constant multiple sits outside a power.

**Example 2 — Quadratic with square root**  
*Given:* \(\int_1^2\frac{x}{\sqrt{x^2-1}}\,dx\)  
*Find:* its value.  

Let \(u=x^2-1\), \(du=2x\,dx\), hence \(\frac12 du = x\,dx\).  
Limits: \(x=1\) gives \(u=0\); \(x=2\) gives \(u=3\).  
\[
\frac12\int_0^3 u^{-1/2}\,du = \frac12\Bigl[2u^{1/2}\Bigr]_0^3 = \sqrt{3}.
\]
**\(\sqrt{3}\)**  
*Reflection:* The factor \(x\,dx\) is half of \(du\), illustrating that algebraic rearrangement of the differential is often required.

**Example 3 — Trigonometric composite**  
*Given:* \(\int_0^{\pi/2}\sin^3\theta\cos\theta\,d\theta\)  
*Find:* its value.  

Let \(u=\sin\theta\), \(du=\cos\theta\,d\theta\).  
Limits: \(\theta=0\) gives \(u=0\); \(\theta=\pi/2\) gives \(u=1\).  
\[
\int_0^1 u^3\,du = \Bigl[\frac14 u^4\Bigr]_0^1 = \frac14.
\]
**\(\frac14\)**  
*Reflection:* The extra \(\cos\theta\) is precisely \(du\), a common occurrence with odd powers of sine.

**Example 4 — Definite integral requiring back-substitution check**  
*Given:* \(\int_0^1\frac{e^x}{1+e^{2x}}\,dx\)  
*Find:* its value.  

Let \(u=e^x\), \(du=e^x\,dx\). Limits become \(u=1\) to \(u=e\).  
\[
\int_1^e\frac{1}{1+u^2}\,du = \arctan u\Big|_1^e = \arctan e - \arctan 1 = \arctan e - \frac{\pi}{4}.
\]
**\(\arctan e - \pi/4\)**  
*Reflection:* The substitution produced an arctangent whose numerical limits could not be simplified further; the answer remains exact.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting to change the limits   | Habit from indefinite integrals             | Write the new limits immediately after writing \(du\) |
| Omitting the differential factor  | Treating \(du\) as optional                 | Always replace the entire \(g'(x)\,dx\) term         |
| Substituting only part of the integrand | Overlooking leftover \(x\) terms          | After substitution, scan for any remaining \(x\)     |
| Reversing limit order             | \(g(a)>g(b)\) when \(g\) is decreasing      | Keep the numerical order; insert a minus sign if needed |
| Using the same variable after substitution | Notation collision                        | Replace every \(x\) systematically before integrating |
| Differentiating \(u\) incorrectly | Chain-rule slip on complicated \(g(x)\)     | Verify \(du\) by explicit differentiation            |
| Evaluating the antiderivative at old limits | Mechanical carry-over from earlier steps | Box the transformed limits before any evaluation     |

## 7. The textbook-precise statement
Let \(g\) be continuously differentiable on the closed interval \([a,b]\) and let \(f\) be continuous on the closed interval whose endpoints are \(g(a)\) and \(g(b)\). Then
\[
\int_a^b f(g(x))g'(x)\,dx = \int_{g(a)}^{g(b)} f(u)\,du.
\]
(Stewart, *Calculus*, 9e, §5.5, Theorem 2.)

## 8. Visual — diagram or schematic
```text
x-axis:   a ---------------- b
          |                  |
g(x):     g(a) ------------ g(b)   (assume g increasing)
          |                  |
u-axis:   u_lower -------- u_upper

Arrow labeled "u = g(x), du = g'(x) dx" maps each vertical line
from the x-interval onto the corresponding u-interval.
```

## 9. The memory technique

1. **The hook** — Picture the inner function as a “tunnel”; \(du\) is the width of the tunnel’s mouth. You slide the entire integrand through that mouth and the limits travel with it.
2. **What to overlearn** — The exact statement \(\int_a^b f(g(x))g'(x)\,dx = \int_{g(a)}^{g(b)} f(u)\,du\); also the three-line ritual “set \(u=\dots\), compute \(du=\dots\), rewrite limits”.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to the chain-rule differentiation of \(F(g(x))\) and integrate both sides between the original limits; the intermediate \(u\) disappears and the transformed limits appear automatically.

## 10. What this unlocks
Mastery of u-substitution with limit changes is the gateway to every subsequent integration technique that relies on a change of variables.  

- Trigonometric substitutions in radical integrals  
- Integration by parts when one factor suggests a derivative pair  
- Partial-fraction integrals after a preliminary substitution  
- Multiple integrals in polar or spherical coordinates  
- Differential-equation substitutions such as \(u=y/x\)  
- Probability transformations of random variables  

## 11. Self-check — five questions, no answers
1. Evaluate \(\int_0^1 2x(x^2+1)^3\,dx\) by u-substitution with changed limits.  
2. Without computing the integral, state the new limits after the substitution \(u=\ln x\) is applied to \(\int_1^e\frac{1}{x}\sqrt{\ln x}\,dx\).  
3. Identify the error: a student sets \(u=x^2\) in \(\int_0^2 x\sqrt{x^2+1}\,dx\) yet leaves the factor \(x\,dx\) untouched.  
4. Show that \(\int_0^{\pi/6}\tan\theta\,d\theta\) becomes \(\int_0^{1/\sqrt{3}}\frac{u}{1+u^2}\,du\) under a suitable substitution; name the substitution.  
5. Suppose \(g\) is strictly decreasing. How must the inequality between \(g(a)\) and \(g(b)\) be handled when writing the transformed definite integral?