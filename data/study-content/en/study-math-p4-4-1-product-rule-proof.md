## 1. The one-sentence answer
**The product rule asserts that if \(f\) and \(g\) are differentiable at \(x\), then so is their product \(fg\), with \((fg)'(x) = f'(x)g(x) + f(x)g'(x)\).**

This identity follows directly from the limit definition of the derivative. Begin with the difference quotient of the product and rearrange the numerator by adding and subtracting the term \(f(x)g(x+h)\). The resulting expression factors into two separate limits, each of which recovers one of the individual derivatives multiplied by the remaining function. The algebraic manipulation is valid precisely because differentiability of each factor guarantees that the relevant limits exist and are finite.

The rule therefore converts the problem of differentiating a product into the simpler tasks of differentiating each factor separately and then combining the results linearly. It holds at every point where both functions are differentiable; no further global assumptions are required.

> [!NOTE]
> The key algebraic step—inserting and subtracting the same intermediate term—converts an apparently irreducible difference into two recognizable derivative limits; once seen, this device appears in nearly every subsequent differentiation rule.

## 2. Why this matters — concrete and current
In orbital-mechanics software used by SpaceX for Falcon 9 trajectory optimization, the product rule appears inside the automatic differentiation engine that computes partial derivatives of thrust-acceleration products with respect to time-varying mass and velocity; without it the real-time guidance loop would require finite-difference approximations that accumulate unacceptable round-off error.

Semiconductor foundries such as TSMC employ the product rule inside compact transistor models (BSIM-CMG) to obtain analytic expressions for drain-current derivatives with respect to gate voltage when both mobility and inversion charge are themselves voltage-dependent functions; these derivatives feed directly into SPICE simulators that size every transistor in a 3 nm chip.

In the training loop of large language models at OpenAI and Google DeepMind, back-propagation through element-wise multiplication layers (used in attention and gating mechanisms) applies the product rule at each scalar multiplication; the resulting gradient expressions are evaluated millions of times per second on GPU tensor cores.

High-energy physicists analyzing LHCb data at CERN differentiate products of efficiency functions and luminosity functions when extracting differential cross-sections; the product rule supplies the exact Jacobian needed for the subsequent maximum-likelihood fit.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit definition of derivative | Supplies the starting expression whose limit must be evaluated |
| Algebraic limit laws (sum, product, constant multiple) | Justifies splitting the manipulated difference quotient into two separate limits |
| Continuity of differentiable functions | Guarantees that \(f(x+h)\to f(x)\) as \(h\to 0\), allowing factors to pass through limits |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the definition
The derivative of any function \(p\) at \(x\) is the limit of its difference quotient. For the product \(p=fg\) this limit is
\[
\lim_{h\to 0}\frac{f(x+h)g(x+h)-f(x)g(x)}{h}.
\]
No further structure is visible yet; the numerator mixes increments of both functions.

> [!WARNING]
> Treating the numerator as a single indivisible increment leads to an expression that cannot be evaluated using known limits; algebraic rearrangement is mandatory.

### Step 2 — Insert and subtract an auxiliary term
Add and subtract the quantity \(f(x)g(x+h)\) inside the numerator:
\[
f(x+h)g(x+h)-f(x)g(x)=f(x+h)g(x+h)-f(x)g(x+h)+f(x)g(x+h)-f(x)g(x).
\]
The added term is chosen because it shares one factor with each of the original terms, enabling immediate factoring.

### Step 3 — Factor the numerator
The expression factors as
\[
g(x+h)\bigl(f(x+h)-f(x)\bigr)+f(x)\bigl(g(x+h)-g(x)\bigr).
\]
Division by \(h\) now yields two separate quotients:
\[
g(x+h)\cdot\frac{f(x+h)-f(x)}{h}+f(x)\cdot\frac{g(x+h)-g(x)}{h}.
\]

### Step 4 — Take the limit term by term
Because \(f\) and \(g\) are differentiable at \(x\), both difference quotients possess limits. The first factor \(g(x+h)\) converges to \(g(x)\) by continuity (which follows from differentiability). Consequently the limit splits into
\[
\lim_{h\to 0}g(x+h)\cdot\lim_{h\to 0}\frac{f(x+h)-f(x)}{h}+\,f(x)\cdot\lim_{h\to 0}\frac{g(x+h)-g(x)}{h}.
\]

### Step 5 — Identify the derivatives
The two limits are exactly \(f'(x)\) and \(g'(x)\), producing
\[
g(x)f'(x)+f(x)g'(x).
\]
This is the product rule.

### Step 6 — Verify domain of validity
The argument uses only the existence of \(f'(x)\) and \(g'(x)\) at the single point \(x\); the rule therefore holds at every such point independently.

## 5. Worked examples — every step shown

**Example 1 — Constant times linear function**  
*Given:* \(f(x)=3\), \(g(x)=x\).  
*Find:* \((fg)'(x)\) from the limit definition.  

Difference quotient:
\[
\frac{3(x+h)-3x}{h}=\frac{3h}{h}=3.
\]
Limit is 3.  
By product rule: \(f'(x)=0\), \(g'(x)=1\), so \(0\cdot x+3\cdot 1=3\).  
**3**  

*Reflection:* The zero derivative of the constant isolates the second term, confirming the rule reproduces the familiar constant-multiple rule.

**Example 2 — Two linear functions**  
*Given:* \(f(x)=x\), \(g(x)=x+1\).  
*Find:* derivative of product at \(x=2\).  

Difference quotient:
\[
\frac{(x+h)(x+h+1)-x(x+1)}{h}=\frac{(x+h)^2+(x+h)-x^2-x}{h}.
\]
Expand and simplify to obtain \(2x+h+1\).  
Limit: \(2x+1\).  
Product rule: \(1\cdot(x+1)+x\cdot 1=2x+1\).  
**2x+1** (hence 5 at \(x=2\))  

*Reflection:* The cross term \(h\) vanishes in the limit, illustrating how the extra summand in the proof disappears.

**Example 3 — Quadratic verification**  
*Given:* \(f(x)=x^2\), \(g(x)=x^3\).  
*Find:* \((fg)'(x)\) two ways.  

Direct expansion: \(x^5\), derivative \(5x^4\).  
Product rule: \(2x\cdot x^3+x^2\cdot 3x^2=5x^4\).  
**5x^4**  

*Reflection:* Agreement of both methods confirms the algebraic identity holds for polynomials of any degree.

**Example 4 — Trigonometric product at a point**  
*Given:* \(f(x)=\sin x\), \(g(x)=\cos x\), evaluate at \(x=\pi/4\).  

Difference quotient manipulation yields \(\cos^2 x-\sin^2 x\).  
Limit equals \(\cos(\pi/2)=0\).  
Product rule: \(\cos x\cdot\cos x+\sin x\cdot(-\sin x)=\cos^2 x-\sin^2 x=0\) at \(\pi/4\).  
**0**  

*Reflection:* The identity \(\sin 2x=2\sin x\cos x\) is recovered as a corollary, showing the rule generates further differentiation formulas.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to add and subtract the auxiliary term | The numerator looks irreducible | Always write the difference quotient first, then deliberately insert \(f(x)g(x+h)\) |
| Passing the limit inside without justifying continuity | Students treat \(g(x+h)\) as constant too early | Explicitly invoke continuity of \(g\) (which follows from differentiability) before moving it outside the limit |
| Confusing the product rule with the quotient rule | Both rules involve two functions | Derive the quotient rule from the product rule after mastering the latter |
| Applying the rule at a point where one factor is not differentiable | Over-generalization from polynomials | Check differentiability of each factor at the exact point before invoking the rule |
| Algebraic sign error when subtracting the auxiliary term | Minus sign is easily dropped | Write the added/subtracted term in a separate line before combining |
| Treating the rule as valid only for polynomials | Historical exposure limited to algebra | Re-derive the rule from the limit definition for any pair of differentiable functions |
| Neglecting the chain-rule extension when factors are composite | Later material intrudes | Keep the present proof strictly first-order; chain rule is introduced afterward |

## 7. The textbook-precise statement
Let \(f\) and \(g\) be real-valued functions defined on an open interval containing the point \(a\). Suppose \(f'(a)\) and \(g'(a)\) both exist. Then the product \(fg\) is differentiable at \(a\) and
\[
(fg)'(a)=f'(a)g(a)+f(a)g'(a).
\]
(Stewart, *Calculus*, 9e, §3.4, Theorem 3.)

## 8. Visual — diagram or schematic
```text
h-axis
  |               g(x+h)
  |              /
  |   f(x+h)    /
  |     \      /
  |      \    /
  |       \  /
  |        \/
  |        /\
  |       /  \
  |      /    \
  |     /      \
  |    /        \
  |   /          \
  |  f(x)         g(x)
  +------------------------- x-axis
       a                 a+h
```
The vertical segments at \(a\) and \(a+h\) represent the function values; the difference \(f(x+h)g(x+h)-f(x)g(x)\) is the area between the two “staircase” rectangles whose sides are the increments of \(f\) and \(g\). The auxiliary rectangle of area \(f(x)(g(x+h)-g(x))\) completes the factorization shown in Step 3.

## 9. The memory technique
1. **The hook** — Picture two ladders leaning against each other; when both slide, the total “covered ground” changes by the sum of each ladder’s own motion multiplied by the other’s stationary length.  
2. **What to overlearn** — The exact statement \((fg)'=f'g+fg'\) together with the auxiliary-term insertion \(f(x)g(x+h)\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Return to the difference quotient, insert the auxiliary term, factor, and pass to the limit using only the definition of derivative and continuity.

## 10. What this unlocks
Mastery of the product-rule proof supplies the template for every subsequent differentiation rule that begins from the limit definition.  

- Quotient rule derivation  
- Derivative of \(x^n\) by induction  
- Leibniz rule for higher-order products  
- Product rule inside the chain rule for composite products  
- Automatic-differentiation forward-mode accumulation  

## 11. Self-check — five questions, no answers
1. Using only the limit definition, prove the product rule for \(f(x)=x^2\) and \(g(x)=e^x\) at an arbitrary point \(x\).  
2. Where exactly does continuity of \(g\) enter the argument, and what would fail if \(g\) were discontinuous at \(x\)?  
3. Show that the product of two functions differentiable on \((a,b)\) is itself differentiable on \((a,b)\).  
4. Identify the step in the proof that would become invalid if one merely assumed the existence of one-sided derivatives.  
5. Derive the formula for the derivative of \(u(x)v(x)w(x)\) by applying the product rule twice; state the number of terms that appear.