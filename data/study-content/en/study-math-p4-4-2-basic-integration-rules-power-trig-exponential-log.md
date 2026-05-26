## 1. The one-sentence answer
**Basic integration rules supply the explicit antiderivatives of the elementary power, trigonometric, exponential, and logarithmic functions.**

These rules arise because differentiation is a local operation that reduces the degree or cycles the function, so its inverse must raise the degree, reverse the cycle, or restore the original exponential growth. The power rule inverts the familiar \(nx^{n-1}\) factor; the trigonometric rules invert the derivative pairs \(\sin x \leftrightarrow \cos x\); the exponential rule inverts its own derivative; and the logarithmic rule inverts the derivative of \(\ln|x|\). Together they form the closed-form foundation on which every later technique of integration rests.

Once these formulas are known, any linear combination of the listed functions can be integrated term by term. The constant of integration appears because the derivative of a constant is zero, so every antiderivative is actually a one-parameter family.

> [!NOTE]
> The single most important insight is that integration is not a new set of memorized facts; each rule is simply the differentiation rule read backwards, and the “+C” records the information lost when we differentiate.

## 2. Why this matters — concrete and current
In orbital-mechanics software used by SpaceX, the power rule integrates the \(r^{-2}\) gravitational acceleration to obtain the vis-viva equation that predicts spacecraft speed at any altitude.  

Semiconductor foundries such as TSMC integrate the exponential diode equation over voltage to compute junction capacitance during process simulation, directly affecting transistor timing models in every 3 nm chip.  

In reinforcement-learning libraries (e.g., those underlying OpenAI’s training runs), the logarithm appears when integrating the entropy term of a policy distribution; the resulting expression yields the exact gradient needed for stable policy updates.  

High-energy physicists at CERN integrate trigonometric functions of scattering angles to convert differential cross-sections into total cross-sections for Higgs-boson events recorded by the ATLAS detector.  

Climate models at NASA GISS integrate exponential decay terms that describe methane’s atmospheric lifetime, producing the integrated radiative forcing values reported in IPCC Assessment Reports.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Derivative of \(x^n\)    | Supplies the exact template that the power rule inverts   |
| Derivative of \(\sin x\), \(\cos x\), \(e^x\), \(\ln|x|\) | Supplies the templates for the remaining four families    |
| Linearity of differentiation | Guarantees that sums and constant multiples integrate term by term |
| Definition of indefinite integral | Formalizes the “+C” that appears in every antiderivative  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Reversing the power rule
Differentiation lowers the exponent by one and multiplies by the old exponent. Therefore its inverse must raise the exponent by one and divide by the new exponent.  
Example: the derivative of \(x^3\) is \(3x^2\), so the antiderivative of \(x^2\) must be \(x^3/3\).  
\[
\int x^n\,dx = \frac{x^{n+1}}{n+1}+C,\qquad n\neq-1.
\]
> [!WARNING]
> Forgetting the “+1” in the exponent produces an answer whose derivative is off by a factor of \(n+1\).

### Step 2 — Handling the missing case \(n=-1\)
When \(n=-1\) the formula above divides by zero. The missing antiderivative is supplied by the natural logarithm, whose derivative is exactly \(1/x\).  
\[
\int\frac{1}{x}\,dx=\ln|x|+C.
\]
> [!WARNING]
> Omitting the absolute value yields an expression whose derivative is undefined for \(x<0\).

### Step 3 — Inverting the trigonometric cycle
Because \(\frac{d}{dx}\sin x=\cos x\) and \(\frac{d}{dx}\cos x=-\sin x\), the antiderivatives simply swap the functions and insert a minus sign where needed.  
\[
\int\sin x\,dx=-\cos x+C,\qquad\int\cos x\,dx=\sin x+C.
\]
> [!WARNING]
> Swapping the signs produces a result whose derivative has the wrong sign.

### Step 4 — Integrating the remaining basic trig functions
The derivatives of \(\tan x\), \(\cot x\), \(\sec x\), and \(\csc x\) are algebraic combinations of the same four functions; their antiderivatives follow at once.  
\[
\int\sec^2 x\,dx=\tan x+C,\qquad\int\csc^2 x\,dx=-\cot x+C.
\]
> [!WARNING]
> Confusing \(\sec^2 x\) with \(\tan^2 x+1\) leads to unnecessary rewriting.

### Step 5 — The exponential function is its own inverse
Since \(\frac{d}{dx}e^x=e^x\), the antiderivative is immediate.  
\[
\int e^x\,dx=e^x+C.
\]
> [!WARNING]
> Replacing \(e^x\) by \(a^x\) without inserting the extra factor \(1/\ln a\) is the most common slip.

### Step 6 — Linearity completes the set
Because differentiation is linear, integration is linear. Any finite sum or scalar multiple may be integrated term by term.  
\[
\int\bigl(af(x)+bg(x)\bigr)\,dx=a\int f(x)\,dx+b\int g(x)\,dx.
\]
> [!WARNING]
> Treating a product or quotient as a sum produces an incorrect answer that cannot be checked by differentiation.

### Step 7 — Assembling the complete table
Collecting the six preceding results yields the standard short table of basic integrals that every subsequent technique presupposes.

## 5. Worked examples — every step shown

**Example 1 — Simple power**  
*Given:* \(\int 3x^4\,dx\)  
*Find:* the antiderivative.  
Apply the constant-multiple rule:  
\[
3\int x^4\,dx.
\]  
*Why:* linearity permits the constant to exit the integral.  
Apply the power rule:  
\[
3\cdot\frac{x^5}{5}+C=\frac{3}{5}x^5+C.
\]  
*Why:* the exponent increases by one and we divide by the new exponent.  
**\(\frac{3}{5}x^5+C\)**  

*Reflection:* The only possible error is forgetting the denominator 5; the pattern generalises to any constant coefficient.

**Example 2 — Logarithmic case**  
*Given:* \(\int\frac{2}{x}\,dx\)  
*Find:* the antiderivative.  
Factor out the constant:  
\[
2\int\frac{1}{x}\,dx.
\]  
*Why:* linearity.  
Apply the special rule for \(n=-1\):  
\[
2\ln|x|+C.
\]  
*Why:* the derivative of \(\ln|x|\) is exactly \(1/x\).  
**\(2\ln|x|+C\)**  

*Reflection:* Absolute value is required; without it the answer fails on negative domains.

**Example 3 — Trigonometric mixture**  
*Given:* \(\int(4\cos x-5\sin x)\,dx\)  
*Find:* the antiderivative.  
Integrate term by term:  
\[
4\int\cos x\,dx-5\int\sin x\,dx.
\]  
*Why:* linearity.  
Apply the basic trig rules:  
\[
4\sin x-5(-\cos x)+C=4\sin x+5\cos x+C.
\]  
*Why:* each function returns its partner with the correct sign.  
**\(4\sin x+5\cos x+C\)**  

*Reflection:* Sign errors are eliminated by always differentiating the answer as a check.

**Example 4 — Exponential plus power**  
*Given:* \(\int(e^x+7x^{-3})\,dx\)  
*Find:* the antiderivative.  
Split into two integrals:  
\[
\int e^x\,dx+7\int x^{-3}\,dx.
\]  
*Why:* linearity.  
Apply the exponential rule and the power rule:  
\[
e^x+7\cdot\frac{x^{-2}}{-2}+C=e^x-\frac{7}{2}x^{-2}+C.
\]  
*Why:* the power rule works for any real exponent except −1.  
**\(e^x-\frac{7}{2}x^{-2}+C\)**  

*Reflection:* Negative exponents are handled identically to positive ones once the rule is applied.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(\frac{x^{n+1}}{n}\) instead of \(\frac{x^{n+1}}{n+1}\) | Confusing the differentiation multiplier with the integration divisor | Always differentiate the answer immediately  |
| Writing \(\ln x\) without absolute value | Forgetting the domain of the logarithm      | Insert \(|x|\) automatically for every \(\int\frac{1}{x}\) |
| Sign error on \(\int\sin x\)      | Mixing up the cyclic derivatives            | Memorise the ordered pair \(\sin\to-\cos\to-\sin\) |
| Treating \(\int e^{kx}\) as \(e^{kx}\) | Over-generalising the base-\(e\) case       | Insert the factor \(1/k\) and verify by differentiation |
| Integrating a product as a sum    | Misreading linearity as applying to products | Check whether the integrand is a sum before splitting |
| Dropping “+C” on indefinite integrals | Treating the antiderivative as unique       | Write “+C” on every indefinite-integral line |
| Applying the power rule to \(x^{-1}\) | Not noticing the special case               | Test the exponent first; route −1 to ln      |

## 7. The textbook-precise statement
Let \(f\) be any function whose derivative is one of the six elementary forms below. Then the corresponding indefinite integrals are

\[
\begin{align*}
\int x^n\,dx&=\frac{x^{n+1}}{n+1}+C&&n\neq-1,\\
\int\frac{1}{x}\,dx&=\ln|x|+C,\\
\int\sin x\,dx&=<|eos|>