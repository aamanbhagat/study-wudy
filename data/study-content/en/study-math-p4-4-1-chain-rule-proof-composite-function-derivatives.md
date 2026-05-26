## 1. The one-sentence answer
**The chain rule states that the derivative of a composite function equals the derivative of the outer function evaluated at the inner function, multiplied by the derivative of the inner function.**

A composite function arises when one function is substituted inside another. Its rate of change therefore depends on how fast the outer function changes with respect to its argument and how fast that argument itself changes. The product of these two rates supplies the overall derivative.

This rule follows directly from the definition of the derivative as a limit. When the inner function varies by a small increment, the outer function responds according to its own local slope; the chain multiplies the two incremental ratios and passes to the limit.

> [!NOTE]
> The single most important insight is that composition multiplies instantaneous rates; every subsequent application of differentiation to nested expressions is simply repeated multiplication of these local slopes.

## 2. Why this matters — concrete and current
In training deep neural networks, back-propagation applies the chain rule layer by layer to compute gradients of the loss with respect to millions of weights; the algorithm used by PyTorch and TensorFlow is exactly this repeated multiplication of partial derivatives.

Orbital guidance software at NASA’s Johnson Space Center differentiates composite expressions that map thruster commands through nonlinear atmospheric drag and gravitational potentials; the resulting Jacobians steer real-time trajectory corrections for the Artemis missions.

Semiconductor process simulators at TSMC solve diffusion equations whose coefficients depend on temperature; automatic differentiation via the chain rule propagates sensitivity of device performance metrics back through the coupled heat and dopant equations.

High-frequency trading engines at Jane Street differentiate pricing formulas for path-dependent options whose volatility surfaces are themselves outputs of neural networks; the chain rule supplies the Greeks in microseconds.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit definition of derivative | The proof begins by writing the difference quotient of the composite and taking the limit. |
| Continuity of differentiable functions | Guarantees that the inner function approaches its value so the outer difference quotient is well-defined. |
| Function composition     | The object whose derivative we seek is \(f(g(x))\).       |
| Standard differentiation rules (power, sine, exponential) | These supply the “outer” and “inner” derivatives once the chain rule is applied. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Rates multiply under substitution
If \(y\) changes at rate 3 when \(u\) changes and \(u\) changes at rate 2 when \(x\) changes, then \(y\) changes at rate 6 when \(x\) changes.  
Example: let \(u = 2x\) and \(y = 3u\). Then \(y = 6x\), whose slope is visibly 6.  
Formal statement: \(\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}\).  
> [!WARNING] Treating the two rates as additive instead of multiplicative produces the wrong numerical value even in the simplest linear case.

### Step 2 — Write the difference quotient of the composite
Let \(y = f(u)\) and \(u = g(x)\). The difference quotient for \(y\) with respect to \(x\) is
\[
\frac{f(g(x+h))-f(g(x))}{h}.
\]
No algebraic simplification is yet possible.

### Step 3 — Insert and remove the increment in the inner function
Add and subtract \(f(g(x)+\Delta u)\) where \(\Delta u = g(x+h)-g(x)\):
\[
\frac{f(g(x)+\Delta u)-f(g(x))}{\Delta u}\cdot\frac{\Delta u}{h}.
\]
The first factor is the difference quotient for \(f\) at \(u = g(x)\); the second is the difference quotient for \(g\).

### Step 4 — Pass to the limit while controlling the inner increment
As \(h\to 0\), continuity of \(g\) (which follows from differentiability) forces \(\Delta u\to 0\). Therefore the first factor approaches \(f'(g(x))\) and the second approaches \(g'(x)\). The product of the limits equals the limit of the product, yielding
\[
\frac{d}{dx}f(g(x)) = f'(g(x))\,g'(x).
\]

### Step 5 — State the theorem for a single composition
If \(g\) is differentiable at \(x_0\) and \(f\) is differentiable at \(g(x_0)\), then \(f\circ g\) is differentiable at \(x_0\) and
\[
(f\circ g)'(x_0) = f'(g(x_0))\,g'(x_0).
\]

## 5. Worked examples — every step shown

**Example 1 — Linear composition**  
*Given:* \(f(u)=3u\), \(g(x)=2x\).  
*Find:* \(\frac{d}{dx}f(g(x))\).  

Let \(y=3(2x)\).  
Differentiate directly: \(\frac{dy}{dx}=6\).  
By chain rule: \(f'(u)=3\), \(g'(x)=2\), so \(3\cdot 2=6\).  
**6**  

*Reflection:* The example confirms the rule recovers the obvious slope; the only possible error is forgetting the inner factor of 2.

**Example 2 — Trigonometric outer function**  
*Given:* \(y=\sin(x^2)\).  
*Find:* \(\frac{dy}{dx}\).  

Outer derivative: \(\frac{d}{du}\sin u=\cos u\).  
Inner derivative: \(\frac{d}{dx}x^2=2x\).  
Chain rule: \(\cos(x^2)\cdot 2x\).  
**\(2x\cos(x^2)\)**  

*Reflection:* Students often omit the \(2x\); writing the outer derivative first and then multiplying by the inner derivative prevents the omission.

**Example 3 — Nested radicals**  
*Given:* \(y=\sqrt{3+\sqrt{x}}\).  
*Find:* \(\frac{dy}{dx}\).  

Rewrite: \(y=(3+x^{1/2})^{1/2}\).  
First application: \(\frac12(3+x^{1/2})^{-1/2}\cdot\frac12 x^{-1/2}\).  
Second application already complete.  
**\(\frac{1}{4\sqrt{3+\sqrt{x}}\sqrt{x}}\)**  

*Reflection:* Two successive chain-rule factors appear; keeping them in fractional form avoids sign errors later.

**Example 4 — Exponential of a quotient**  
*Given:* \(y=e^{x/(x+1)}\).  
*Find:* \(\frac{dy}{dx}\).  

Let \(u=x/(x+1)\).  
\(\frac{dy}{dx}=e^u\cdot u'\).  
Quotient rule: \(u'=\frac{(x+1)-x}{(x+1)^2}=\frac{1}{(x+1)^2}\).  
**\(\frac{e^{x/(x+1)}}{(x+1)^2}\)**  

*Reflection:* The inner quotient rule is independent of the outer exponential; separating the two differentiations clarifies the arithmetic.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Omitting the inner derivative     | Treating the outer function as if its argument were already \(x\) | Write “outer at inner” then multiply by inner derivative explicitly |
| Confusing chain rule with product rule | Both rules involve two functions            | Check whether the expression is \(f(g(x))\) or \(f(x)g(x)\) |
| Applying chain rule to constants inside | Misreading a constant as a variable         | Verify every symbol that depends on the independent variable |
| Sign error with negative inner derivatives | Losing track of signs in powers or trig     | Keep the inner derivative as a separate factor until the end |
| Forgetting the chain rule on the outer exponential base | Treating \(a^u\) as if base were \(e\)      | Rewrite \(a^u=e^{u\ln a}\) before differentiating |
| Differentiating only the outermost layer in triple compositions | Cognitive overload with multiple nestings   | Apply the rule from inside out, one layer at a time |
| Using the rule when inner function is not differentiable | Overlooking corners or cusps                | Check differentiability of \(g\) at the point before invoking the theorem |

## 7. The textbook-precise statement
If \(g\) is differentiable at \(x\) and \(f\) is differentiable at \(g(x)\), then the composite \(f\circ g\) is differentiable at \(x\) and
\[
(f\circ g)'(x)=f'(g(x))g'(x).
\]
(Stewart, *Calculus*, 9e, §3.4, Theorem 3.)

## 8. Visual — diagram or schematic
```text
x ──[g]──▶ u ──[f]──▶ y
     │          │
   g'(x)      f'(u)
     │          │
     └── multiply ──▶ (f∘g)'(x)
```
Horizontal arrows represent function evaluation; vertical arrows represent the local derivative (slope) taken at that instant; the final multiplication assembles the composite slope.

## 9. The memory technique
**The hook** — Picture a bicycle chain: each link multiplies the motion of the previous link; the whole chain’s speed is the product of every gear ratio.

**What to overlearn** — \((f\circ g)'=f'(g)g'\); the single-line statement of the theorem; the mnemonic “outer prime at inner times inner prime.”

**Spaced-repetition schedule** — Review the statement and one worked example at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Return to the difference quotient
\[
\frac{f(g(x+h))-f(g(x))}{h}=\frac{f(g(x)+\Delta u)-f(g(x))}{\Delta u}\cdot\frac{\Delta u}{h}
\]
and take the limit using continuity of \(g\).

## 10. What this unlocks
Mastery of the chain rule permits immediate differentiation of any explicitly nested expression and supplies the mechanical engine behind implicit differentiation, related-rates problems, and the multivariable chain rule.

- Implicit differentiation of \(F(x,y)=0\)
- Related-rates word problems
- Derivatives of inverse functions via the chain rule in reverse
- Back-propagation in neural networks
- Higher-order chain-rule formulas (Faà di Bruno)

## 11. Self-check — five questions, no answers
1. Differentiate \(y=\tan^3(5x)\) and simplify.

2. Let \(f(u)=\sqrt{u}\) and \(g(x)=x^2+1\). Compute \((f\circ g)'(3)\) directly from the definition of the derivative and again via the chain rule; verify numerical agreement.

3. A student claims that \(\frac{d}{dx}\sin(x^2)=\cos(2x)\). Identify the precise algebraic mistake and correct it.

4. Write the chain-rule expression for \(\frac{d}{dx}e^{\sin(1/x)}\) without evaluating any derivative.

5. Suppose \(h(x)=f(g(x))\) where \(f'(2)=3\), \(g(1)=2\), and \(g'(1)=4\). Evaluate \(h'(1)\). If in addition \(g\) is not differentiable at \(x=0\), what can be said about \(h'(0)\)?