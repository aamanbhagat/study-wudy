## 1. The one-sentence answer
**Power rule states that \(\frac{d}{dx}[x^n]=n x^{n-1}\) holds for every integer and rational exponent \(n\), proved from the limit definition of the derivative.**

Positive integers follow from the binomial theorem applied to the difference quotient. Negative integers reduce to the positive case via the quotient rule once you know the derivative of \(x^{-1}\). Rational exponents are handled by rewriting \(y=x^{p/q}\) as \(y^q=x^p\) and differentiating both sides implicitly. The proofs rely only on the limit definition, algebraic identities, and the chain rule for the rational case.

The same pattern later extends to real exponents via the exponential function, but that step requires logarithms and is outside this lesson.

> [!NOTE]
> The core “aha” is that you never need to memorise separate rules for each exponent; the algebraic structure of polynomials and roots forces the coefficient \(n\) to appear automatically once the limit is expanded correctly.

## 2. Why this matters — concrete and current
In aerospace trajectory optimisation, SpaceX’s guidance algorithms repeatedly differentiate polynomials whose degrees change with staging events; the power rule supplies the exact velocity and acceleration expressions without numerical differentiation.

In semiconductor device modelling, the drain current of a MOSFET in saturation is proportional to \((V_{GS}-V_{th})^2\); circuit simulators differentiate this quadratic thousands of times per transient analysis, and the analytic power-rule derivative keeps the Newton–Raphson iteration stable.

Modern automatic-differentiation frameworks inside PyTorch and JAX use the power rule as the base case when they build the computation graph for any monomial layer; every higher-order gradient for a neural network ultimately rests on this integer-exponent proof.

In orbital-mechanics packages such as NASA’s GMAT, specific orbital energy contains the term \(- \mu/r\); the derivative with respect to radial distance appears in the equations of motion and must be evaluated millions of times during a single Monte-Carlo dispersion run.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit definition of derivative | Supplies the starting expression that must be simplified for every exponent |
| Binomial theorem         | Expands \((x+h)^k\) when \(k\) is a positive integer      |
| Quotient rule            | Converts the negative-integer case back to the positive-integer result |
| Implicit differentiation | Handles the algebraic relation \(y^q=x^p\) for rational exponents |
| Chain rule               | Appears when differentiating both sides of \(y^q=x^p\)    |

If any row is unfamiliar, pause and master that single tool first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Positive integer exponents via binomial expansion
The difference quotient for \(f(x)=x^k\) expands directly with the binomial theorem.  
Example: let \(k=3\), then  
\[
\frac{(x+h)^3-x^3}{h}=3x^2+3xh+h^2.
\]
Taking the limit \(h\to0\) leaves exactly \(3x^2\).  
Formal statement:  
\[
\lim_{h\to0}\frac{(x+h)^n-x^n}{h}=\lim_{h\to0}\sum_{k=1}^n\binom{n}{k}x^{n-k}h^{k-1}=n x^{n-1}.
\]
> [!WARNING]
> If the binomial coefficients are miscounted, the coefficient of the linear term in \(h\) is lost and the limit yields the wrong multiple of \(x^{n-1}\).

### Step 2 — Zero exponent
\(x^0=1\) is constant, so its difference quotient is identically zero and the derivative is zero, matching \(0\cdot x^{-1}\).

### Step 3 — Negative integer exponents via quotient rule
Write \(x^{-n}=\frac{1}{x^n}\). Apply the quotient rule to the already-proved positive case:  
\[
\frac{d}{dx}(x^{-n})=-n x^{-n-1}.
\]
This matches the power-rule formula for exponent \(-n\).

### Step 4 — Rational exponents — algebraic setup
Let \(y=x^{p/q}\) where \(p,q\) are coprime integers, \(q>0\). Raise both sides to the \(q\)-th power:  
\[
y^q=x^p.
\]

### Step 5 — Implicit differentiation
Differentiate both sides with respect to \(x\):  
\[
q y^{q-1}\frac{dy}{dx}=p x^{p-1}.
\]
Solve for the derivative:  
\[
\frac{dy}{dx}=\frac{p}{q}x^{p-1}y^{1-q}.
\]
Substitute \(y=x^{p/q}\):  
\[
\frac{dy}{dx}=\frac{p}{q}x^{p-1}x^{(p/q)(1-q)}=\frac{p}{q}x^{p/q-1}.
\]

### Step 6 — Textbook-grade statement for all rational exponents
After verifying that the root function is differentiable for \(x>0\) (or \(x<0\) when \(q\) is odd), the power rule holds for every rational exponent.

## 5. Worked examples — har step show karo

**Example 1 — Positive integer**  
*Given:* \(f(x)=x^4\)  
*Find:* \(f'(x)\)  
\[
f'(x)=\lim_{h\to0}\frac{(x+h)^4-x^4}{h}=\lim_{h\to0}(4x^3+6x^2h+4xh^2+h^3)=4x^3.
\]
*Why:* Only the first term survives the limit.  
**4x^3**

*Reflection:* The binomial pattern generalises immediately to any fixed positive integer.

**Example 2 — Negative integer**  
*Given:* \(f(x)=x^{-2}\)  
*Find:* \(f'(x)\)  
Use quotient rule on \(1/x^2\):  
\[
f'(x)=\frac{0\cdot x^2-1\cdot2x}{x^4}=-2x^{-3}.
\]
*Why:* We already know the derivative of the denominator.  
**-2x^{-3}**

*Reflection:* Negative exponents never require a fresh limit; they inherit the result.

**Example 3 — Simple rational**  
*Given:* \(y=x^{2/3}\)  
*Find:* \(\frac{dy}{dx}\)  
Set \(y^3=x^2\), differentiate:  
\[
3y^2 y'=2x \implies y'=\frac{2x}{3y^2}=\frac{2}{3}x^{1-2/3}=\frac{2}{3}x^{1/3}.
\]
*Why:* Implicit step converts the root into a polynomial relation.  
**\frac{2}{3}x^{1/3}**

*Reflection:* Domain restriction \(x\neq0\) appears naturally because \(y^2\) is in the denominator.

**Example 4 — Negative rational**  
*Given:* \(y=x^{-3/2}\)  
*Find:* \(\frac{dy}{dx}\)  
Rewrite as \(y^2=x^{-3}\), differentiate implicitly:  
\[
2y y'=-3x^{-4}\implies y'=-\frac{3}{2}x^{-4}y^{-1}=-\frac{3}{2}x^{-4}x^{3/2}=-\frac{3}{2}x^{-5/2}.
\]
*Why:* Exponent arithmetic confirms the power-rule prediction.  
**-\frac{3}{2}x^{-5/2}**

*Reflection:* The same implicit engine works for any sign combination once the root is defined.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the chain-rule factor when differentiating \(y^q\) | Students treat \(y\) as independent | Always write \(q y^{q-1} y'\) |
| Applying power rule to \(x=0\) for negative exponents | Division by zero hidden in the limit | State domain \(x\neq0\) explicitly before differentiating |
| Using binomial theorem for fractional exponents | Binomial series is not taught yet | Restrict binomial step to positive integers only |
| Losing the sign when \(q\) is even | Implicit differentiation yields even powers | Check domain and sign of root separately |
| Confusing \(\frac{p}{q}\) with the final exponent | Arithmetic slip after substitution | Rewrite final exponent as \(\frac{p}{q}-1=\frac{p-q}{q}\) before simplifying |
| Assuming the derivative exists at \(x=0\) for fractional powers with even denominator | Vertical tangent or cusp | Verify one-sided limits before claiming differentiability |

## 7. The textbook-precise statement
Theorem (Power Rule for Rational Exponents). Let \(r=m/n\) where \(m\in\mathbb{Z}\), \(n\in\mathbb{N}\), \(\gcd(m,n)=1\). If \(f(x)=x^r\) is defined on an open interval \(I\) not containing zero (or on an interval excluding zero when \(n\) is even), then \(f\) is differentiable on \(I\) and  
\[
f'(x)=r x^{r-1}.
\]
Proof: see Stewart, *Calculus*, 9e, §3.4, Theorem 5 together with the implicit-function argument in §3.5.

## 8. Visual — diagram or schematic
```
x-axis:  ----(-∞)----0----(+∞)----
f(x)=x^{2/3}:   ^     |     ^
                    cusp at 0
slope left: +∞   slope right: +∞
f'(x)=(2/3)x^{1/3}:   +     0     +
```
The diagram shows the vertical tangent at the origin for an even-denominator rational power; the derivative still follows the power rule but is undefined at that single point.

## 9. The memory technique

1. **The hook** — Picture a ladder whose rungs are labelled by the exponent; each differentiation moves you down one rung and multiplies by the rung number you just left.
2. **What to overlearn** — The three-line mental script: “positive integer → binomial, negative → quotient, rational → implicit.”
3. **Spaced-repetition schedule** — Review the six steps at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to the limit definition, expand with binomial (integer) or rewrite as \(y^q=x^p\) (rational).

## 10. What this unlocks
Once the power rule is rigorous for rationals, every polynomial, rational function, and algebraic curve becomes differentiable by elementary operations.  

- Chain rule with power functions  
- Differentiation of \(x^r\) inside implicit algebraic relations  
- Taylor expansions of binomial and rational functions  
- Preparation for the exponential definition of \(a^x\) that finally covers irrational exponents

## 11. Self-check — five questions, no answers
1. Compute \(\frac{d}{dx}(x^7)\) directly from the limit definition and identify which binomial term survives.  
2. Show that the derivative of \(x^{-5}\) equals \(-5x^{-6}\) using only the quotient rule and the positive-integer case.  
3. Let \(y=x^{4/5}\). Use implicit differentiation to obtain \(y'\) and state the domain on which the derivative exists.  
4. Where exactly does the proof break if you try to apply the rational-exponent argument at \(x=0\) when the denominator is even?  
5. A student claims \(\frac{d}{dx}(x^{2/2})=2x^{0}\). Identify the hidden assumption that makes the claim false at \(x=0\).