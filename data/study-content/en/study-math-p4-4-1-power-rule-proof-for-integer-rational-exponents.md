## 1. The one-sentence answer
**The power rule asserts that \(\frac{d}{dx}(x^r)=r x^{r-1}\) for every rational number \(r\), established first for positive integers by induction on the binomial theorem, extended to negative integers by the quotient rule, and completed for rationals by implicit differentiation on the equation \(y^q=x^p\).**

The derivative of a power function measures its instantaneous rate of change. For the monomials \(x\), \(x^2\), and \(x^3\) the pattern is immediate from first principles: the slopes are 1, \(2x\), and \(3x^2\). The rule simply asserts that this pattern continues without exception for every integer or fractional exponent that can be written with integer numerator and denominator.

The proofs never invoke the general exponential or logarithm; they rely only on the limit definition of the derivative, the binomial theorem, the quotient rule, and the chain rule applied to algebraic identities. Once these four tools are granted, every rational case follows by finite algebraic manipulation.

> [!NOTE]
> The single deepest insight is that the exponent itself becomes the coefficient while the power drops by exactly one; this linear drop is what later permits the clean differentiation of every polynomial and every rational function.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 trajectory optimiser repeatedly differentiates polynomials whose degrees reach several hundred; the power rule supplies the exact first and second derivatives used inside the successive convexification loop that keeps the booster on its landing corridor.

In semiconductor process simulation, Synopsys TCAD solves Poisson equations whose doping profiles contain terms \(x^{1/2}\) and \(x^{-3/2}\); analytic Jacobians built from the rational power rule accelerate Newton iteration by more than an order of magnitude compared with finite-difference approximations.

Modern transformer training frameworks (PyTorch, JAX) automatically differentiate loss surfaces that contain embedding norms raised to fractional powers; the fused power-rule kernels reduce gradient computation time on an A100 GPU by roughly 12 % for models exceeding 100 billion parameters.

Radio-astronomy pipelines at the Square Kilometre Array must differentiate visibility amplitudes that scale as frequency to the power \(-2/3\) (synchrotron self-absorption); the exact derivative supplied by the rational power rule removes a systematic bias that previously limited dynamic range in 21 cm cosmology maps.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit definition of derivative | Supplies the only starting point for every proof          |
| Binomial theorem         | Expands \((x+h)^n\) when \(n\) is a positive integer      |
| Quotient rule            | Handles negative integer exponents written as reciprocals |
| Chain rule (or implicit differentiation) | Converts the algebraic relation \(y^q=x^p\) into a derivative formula |

## 4. Building the idea — from intuition to formalism

### Step 1 — Positive integer powers from the limit definition
The slope of \(x^n\) at any point is obtained directly by expanding the difference quotient.  
Concrete example: for \(n=3\),  
\[
\lim_{h\to 0}\frac{(x+h)^3-x^3}{h}=3x^2.
\]
Formally, the binomial theorem yields
\[
(x+h)^n-x^n=\sum_{k=1}^n\binom{n}{k}x^{n-k}h^k,
\]
so dividing by \(h\) and taking the limit isolates the single term \(n x^{n-1}\).

> [!WARNING]
> Omitting the binomial expansion and attempting to “cancel \(h\)” without it leaves the limit indeterminate and hides the coefficient \(n\).

### Step 2 — Extension to zero and negative integers
The case \(n=0\) is immediate: the derivative of the constant 1 is 0.  
For negative integers write \(x^{-m}=1/x^m\) where \(m>0\). The quotient rule then supplies
\[
\frac{d}{dx}(x^{-m})=-m x^{-m-1}.
\]
The same formula therefore holds for every integer exponent.

> [!WARNING]
> Treating \(x^{-m}\) as a new “base case” instead of applying the quotient rule creates an artificial gap that later blocks the rational proof.

### Step 3 — Rational exponents via an algebraic identity
Let \(r=p/q\) with \(p,q\) integers, \(q>0\). Set \(y=x^{p/q}\), so
\[
y^q=x^p.
\]
Differentiate both sides implicitly with respect to \(x\):
\[
q y^{q-1}\frac{dy}{dx}=p x^{p-1}.
\]
Solve for the derivative:
\[
\frac{dy}{dx}=\frac{p}{q}x^{p-1}y^{1-q}.
\]
Substitute back \(y=x^{p/q}\) to obtain the power-rule expression.

> [!WARNING]
> Forgetting to replace the remaining \(y\) terms by powers of \(x\) produces an answer that still contains the auxiliary variable \(y\).

### Step 4 — Domain and sign restrictions
The identity \(y^q=x^p\) is defined for \(x>0\) when \(q\) is even. When both \(p\) and \(q\) are odd the function extends continuously to \(x<0\). The derivative formula remains valid on each connected component of the domain.

> [!WARNING]
> Applying the formula at \(x=0\) when the exponent is negative produces division by zero; the original function is undefined there.

### Step 5 — Textbook statement of the completed result
After the four preceding steps the single compact statement below holds for every rational exponent.

## 5. Worked examples — every step shown

**Example 1 — Positive integer, direct expansion**  
*Given:* \(f(x)=x^4\).  
*Find:* \(f'(x)\).  
Step 1: Write the difference quotient  
\[
\frac{(x+h)^4-x^4}{h}.
\]  
*Why:* definition of derivative.  
Step 2: Expand via binomial theorem  
\[
(x+h)^4=x^4+4x^3h+6x^2h^2+4xh^3+h^4,
\]  
so the numerator is \(4x^3h+6x^2h^2+4xh^3+h^4\).  
*Why:* binomial coefficients give the exact powers of \(h\).  
Step 3: Cancel the common factor \(h\)  
\[
4x^3+6x^2h+4xh^2+h^3.
\]  
*Why:* valid for \(h\neq0\).  
Step 4: Take the limit  
\[
\lim_{h\to0}(4x^3+6x^2h+4xh^2+h^3)=4x^3.
\]  
*Why:* every term containing \(h\) vanishes.  

**\(4x^3\)**

*Reflection:* The coefficient 4 appears exactly once, from the linear term in the binomial expansion; this pattern generalises to any positive integer.

**Example 2 — Negative integer via quotient rule**  
*Given:* \(f(x)=x^{-2}\).  
*Find:* \(f'(x)\).  
Step 1: Rewrite as \(f(x)=1/x^2\).  
*Why:* negative exponent definition.  
Step 2: Apply quotient rule with numerator 1 (derivative 0) and denominator \(x^2\) (derivative \(2x\))  
\[
f'(x)=\frac{0\cdot x^2-1\cdot 2x}{(x^2)^2}=-\frac{2x}{x^4}=-2x^{-3}.
\]  
*Why:* quotient-rule formula.  

**-2x^{-3}**

*Reflection:* The sign flip and the new exponent \(-3\) both arise automatically once the quotient rule is applied to a positive power already proved.

**Example 3 — Simple rational exponent**  
*Given:* \(f(x)=x^{2/3}\).  
*Find:* \(f'(x)\).  
Step 1: Set \(y=x^{2/3}\), raise to third power: \(y^3=x^2\).  
*Why:* clears the denominator.  
Step 2: Differentiate implicitly  
\[
3y^2 y'=2x.
\]  
*Why:* chain rule on left, power rule on right (already known for integer 2).  
Step 3: Solve  
\[
y'=\frac{2x}{3y^2}.
\]  
Step 4: Substitute \(y=x^{2/3}\)  
\[
y'=\frac{2x}{3(x^{2/3})^2}=\frac{2x}{3x^{4/3}}=\frac{2}{3}x^{1-4/3}=\frac{2}{3}x^{-1/3}.
\]  
*Why:* exponent arithmetic \(2-4/3=2/3\) then subtract 1.  

**\(\frac{2}{3}x^{-1/3}\)**

*Reflection:* The only non-obvious move is restoring every occurrence of \(y\) to a power of \(x\); once done, the exponent arithmetic is mechanical.

**Example 4 — Negative rational exponent**  
*Given:* \(f(x)=x^{-3/2}\).  
*Find:* \(f'(x)\).  
Step 1: Write \(y=x^{-3/2}\), so \(y^{-2}=x^3\) or equivalently \(x^3 y^2=1\).  
*Why:* multiply through by \(y^2\) to obtain positive exponents.  
Step 2: Differentiate implicitly  
\[
3x^2 y^2 + x^3\cdot 2y y'=0.
\]  
*Why:* product rule on left.  
Step 3: Solve for \(y'\)  
\[
2x^3 y y'=-3x^2 y^2 \implies y'=-\frac{3x^2 y^2}{2x^3 y}=-\frac{3}{2}x^{-1}y.
\]  
Step 4: Substitute \(y=x^{-3/2}\)  
\[
y'=-\frac{3}{2}x^{-1}x^{-3/2}=-\frac{3}{2}x^{-5/2}.
\]  
*Why:* exponents add: \(-1-3/2=-5/2\).  

**\(-\frac{3}{2}x^{-5/2}\)**

*Reflection:* The algebraic rearrangement that produces a positive power of \(y\) before differentiation avoids fractional exponents inside the implicit step.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating the rational case as “just plug in \(n=p/q\)” without proof | Pattern recognition replaces derivation | Always begin from \(y^q=x^p\) and differentiate |
| Applying the formula at \(x=0\) for negative exponents | Function undefined, yet formula looks algebraic | Check domain before differentiating |
| Forgetting to replace auxiliary \(y\) by \(x^{p/q}\) at the end | Implicit step feels finished too early | Keep a checklist: “substitute back” |
| Using the chain rule on \(x^{p/q}\) without first proving the integer case | Circular reasoning | Prove integers first, then rationals |
| Confusing \(\frac{d}{dx}x^{1/2}\) with \(\frac12 x^{-1/2}\) at \(x<0\) | Square-root domain restriction ignored | State domain explicitly for each example |
| Losing the coefficient when \(q\) is even and \(x<0\) | Sign of root ambiguous | Restrict to \(x>0\) unless both numerator and denominator odd |
| Writing the derivative of \(x^{-m}\) as \(-m x^{-m}\) instead of \(-m x^{-m-1}\) | Exponent drop forgotten | Always subtract exactly 1 from the exponent |

## 7. The textbook-precise statement
Let \(r=p/q\in\mathbb{Q}\) with \(p\in\mathbb{Z}\), \(q\in\mathbb{N}\), \(\gcd(p,q)=1\). Then the function \(f:(0,\infty)\to\mathbb{R}\) given by \(f(x)=x^r\) is differentiable and
\[
f'(x)=r x^{r-1}.
\]
When both \(p\) and \(q\) are odd the same formula holds on \((-\infty,0)\) as well.  
(Stewart, *Calculus*, 9e, §3.4, Theorem 5, and the subsequent corollary for rational powers.)

## 8. Visual — diagram or schematic
```text
y
^
|               curve y = x^{3/2}
|            .
|         .     slope at x=4 is (3/2)*4^{1/2}=3
|      .
|   .
| .
+---------------------> x
0   1   4   9
```
Tangent line at \(x=4\) has slope 3 and touches the curve; the vertical distance from curve to tangent grows quadratically, illustrating that the first-order approximation is locally linear.

## 9. The memory technique
**The hook** — Picture an hourglass: the exponent sits in the upper chamber; when you differentiate, the sand (the exponent) pours down to become the coefficient while the chamber itself drops one level.

**What to overlearn**  
- \( \frac{d}{dx}x^n=nx^{n-1} \) for every integer \(n\).  
- Implicit step: if \(y^q=x^p\) then \(q y^{q-1}y'=p x^{p-1}\).  
- Final substitution always replaces every \(y\) by \(x^{p/q}\).

**Spaced-repetition schedule** — Review the integer proof at 1 day, the implicit rational step at 3 days, a full worked negative-rational example at 7 days, and a domain-edge case at 16 and 35 days.

**First-principles fallback** — Return to the binomial expansion for integers and to the identity \(y^q=x^p\) for rationals; both derivations use only the limit definition and elementary algebra.

## 10. What this unlocks
Mastery of the rational power rule supplies the derivative of every monomial that appears inside polynomials, rational functions, and algebraic curves; it is the indispensable prerequisite for the chain rule applied to compositions, for logarithmic differentiation of more complicated powers, and for the construction of Taylor polynomials of any algebraic function.

- Chain rule on \((f(x))^{p/q}\)
- Implicit differentiation of algebraic curves \(F(x,y)=0\)
- Derivative of \(x^x\) via logarithmic differentiation
- Arc-length integrals containing \(\sqrt{1+(f')^2}\)
- Optimisation problems with fractional exponents

## 11. Self-check — five questions, no answers
1. Using only the binomial theorem, compute the derivative of \(x^5\) from the limit definition and identify the single term that survives.

2. Derive the derivative of \(x^{-5}\) by rewriting it as a quotient and applying the quotient rule; state the domain explicitly.

3. Let \(y=x^{4/5}\). Form the auxiliary equation, differentiate implicitly, and obtain \(y'\) expressed solely in powers of \(x\).

4. For which rational exponents does the power rule remain valid at \(x=0\)? Give a one-sentence justification.

5. A student claims that \(\frac{d}{dx}x^{-2/3}=-2x^{-5/3}\). Locate the error and supply the correct derivative with every algebraic step shown.