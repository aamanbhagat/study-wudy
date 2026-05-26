## 1. The one-sentence answer
**The sum, difference, and constant-multiple rules state that differentiation is a linear operation: the derivative of a sum (or difference) is the sum (or difference) of the derivatives, and constants factor out of the derivative.**

These rules let you differentiate any polynomial or linear combination of functions once you know how to differentiate the individual pieces. They follow directly from the limit definition of the derivative and require no new limit evaluations after the basic power rule is known. In practice they reduce every differentiation of an algebraic expression to a sequence of mechanical steps rather than repeated limit computations.

The rules hold wherever the individual derivatives exist; no extra continuity assumptions are needed beyond the existence of those derivatives. They are the first structural properties that turn the derivative into an algebraic tool rather than an isolated limit.

> [!NOTE]
> The single deepest insight is that differentiation respects vector-space operations, so the set of differentiable functions forms a vector space and the derivative is a linear map on that space.

## 2. Why this matters — concrete and current
In aerospace trajectory optimization, SpaceX’s guidance algorithms differentiate sums of thrust, drag, and gravitational terms thousands of times per second; the linearity rules let the onboard computer replace each new limit with a handful of already-computed partial derivatives.

In semiconductor timing analysis, Synopsys PrimeTime computes slew-rate derivatives of summed RC-network responses; the constant-multiple rule scales the contribution of each wire segment without re-deriving the entire delay function.

Machine-learning frameworks such as PyTorch and JAX rely on these rules inside automatic-differentiation engines; every linear layer’s gradient is assembled from sums and scalar multiples of simpler tensor derivatives, which is why back-propagation on a million-parameter network remains computationally tractable.

In fundamental physics, the Lagrangian of the Standard Model is a sum of kinetic, potential, and interaction terms; the Euler-Lagrange equations inherit linearity, so the equations of motion for each field can be written separately and then superposed.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit definition of derivative | The rules are proved by writing each derivative as a limit and using limit laws for sums and scalars. |
| Power rule for \(x^n\)   | Supplies the base cases that the linearity rules then combine. |
| Limit laws for sums and constant multiples | The algebraic justification that lets the derivative operator pass inside parentheses. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Derivatives respect addition
If two quantities change independently, their combined rate of change is simply the sum of the separate rates.  
Example: position \(x(t) = t^2 + 3t\). The first term grows at rate \(2t\), the second at rate 3; together the growth rate is \(2t + 3\).  
Formal statement:
\[
\frac{d}{dx}[f(x) + g(x)] = \lim_{h\to 0}\frac{f(x+h)+g(x+h)-(f(x)+g(x))}{h} = \lim_{h\to 0}\Bigl(\frac{f(x+h)-f(x)}{h} + \frac{g(x+h)-g(x)}{h}\Bigr) = f'(x) + g'(x).
\]
> [!WARNING]
> Forgetting to split the single fraction into two separate fractions before taking the limit produces an indeterminate form that cannot be evaluated term-by-term.

### Step 2 — Derivatives respect subtraction
The identical splitting works when a minus sign appears, because subtraction is addition of the negative.  
Example: \(x(t) = t^2 - 3t\) yields derivative \(2t - 3\).

### Step 3 — Constants factor out of the limit
A constant \(c\) can be pulled in front of any limit:
\[
\lim_{h\to 0}\frac{c\cdot f(x+h) - c\cdot f(x)}{h} = c\lim_{h\to 0}\frac{f(x+h)-f(x)}{h}.
\]
This yields the constant-multiple rule.

### Step 4 — Combine the three operations
Any finite linear combination may be differentiated term by term.  
Formal statement:
\[
\frac{d}{dx}\Bigl(\sum_{i=1}^n c_i f_i(x)\Bigr) = \sum_{i=1}^n c_i f_i'(x).
\]

### Step 5 — Reach the textbook statement
The three elementary rules together constitute the linearity of differentiation.

## 5. Worked examples — every step shown

**Example 1 — Simple polynomial**  
*Given:* \(f(x) = 4x^3 - 7x + 2\)  
*Find:* \(f'(x)\)  

Apply constant-multiple rule to first term:  
\[
\frac{d}{dx}(4x^3) = 4\cdot 3x^2 = 12x^2 \qquad \text{Why: constant factors out, power rule on \(x^3\)}.
\]  
Apply constant-multiple and power rule to second term:  
\[
\frac{d}{dx}(-7x) = -7\cdot 1 = -7 \qquad \text{Why: constant multiple of derivative of \(x\)}.
\]  
Derivative of constant is zero:  
\[
\frac{d}{dx}(2) = 0 \qquad \text{Why: constant-multiple rule with zero derivative}.
\]  
Add the three results:  
\[
f'(x) = 12x^2 - 7.
\]  
**\(12x^2 - 7\)**

*Reflection:* The only algebraic work was distributing the constants; the linearity rules removed any need to expand the limit definition three separate times.

**Example 2 — Sum of two power functions**  
*Given:* \(g(x) = x^5 + x^{-2}\)  
*Find:* \(g'(x)\)  

Differentiate each term separately:  
\[
\frac{d}{dx}(x^5) = 5x^4, \qquad \frac{d}{dx}(x^{-2}) = -2x^{-3}.
\]  
Add:  
\[
g'(x) = 5x^4 - 2x^{-3}.
\]  
**\(5x^4 - 2x^{-3}\)**

*Reflection:* Negative exponents are handled identically once the power rule is known; the sum rule never changes.

**Example 3 — Linear combination with parameter**  
*Given:* \(h(x) = a x^2 + b x + c\) where \(a,b,c\) are constants  
*Find:* \(h'(x)\)  

\[
h'(x) = 2a x + b.
\]  
**\(2a x + b\)**

*Reflection:* The constants \(a\) and \(b\) survive differentiation; \(c\) disappears, illustrating that only the variable terms contribute to the slope.

**Example 4 — Nested linear combination**  
*Given:* \(k(x) = 3(x^4 - 2x^2) + 5x\)  
*Find:* \(k'(x)\)  

Distribute the constant 3 first:  
\[
k(x) = 3x^4 - 6x^2 + 5x.
\]  
Differentiate term by term:  
\[
k'(x) = 12x^3 - 12x + 5.
\]  
**\(12x^3 - 12x + 5\)**

*Reflection:* The inner parentheses are removed by the constant-multiple rule before differentiation; attempting to differentiate inside without distributing would violate the rule.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating the derivative of a sum as the product of derivatives | Confusion with the product rule | Always write the sum rule explicitly before computing. |
| Forgetting the constant factor when the constant is written after the function | Notation \(x^2\cdot 3\) looks different from \(3x^2\) | Rewrite every expression in standard form \(c\cdot f(x)\) first. |
| Applying the rules to a product or quotient | Over-generalization of linearity | Check that the expression is literally a sum or scalar multiple before using these rules. |
| Differentiating only one term of a sum | Cognitive load of multiple terms | Underline every term that must be differentiated. |
| Losing the minus sign in a difference | Subtraction is mentally converted to addition too early | Keep the difference symbol until the derivative is written. |
| Assuming the rule works at points where a term is undefined | Limit laws require each limit to exist separately | Verify the domain of each derivative before combining. |
| Confusing the constant-multiple rule with the chain rule | Both involve coefficients | Use the constant-multiple rule only when the coefficient is independent of \(x\). |

## 7. The textbook-precise statement
Let \(f\) and \(g\) be functions differentiable at \(x_0\), and let \(c\) be a constant. Then \(f+g\), \(f-g\), and \(cf\) are differentiable at \(x_0\) and
\[
(f+g)'(x_0) = f'(x_0)+g'(x_0),\qquad
(f-g)'(x_0) = f'(x_0)-g'(x_0),\qquad
(cf)'(x_0) = c\,f'(x_0).
\]
(Stewart, *Calculus*, 9e, §3.3, Theorem 3.)

## 8. Visual — diagram or schematic
```text
y
↑
|          f(x) = x²
|         /
|        /   g(x) = 3x
|       /   /
|      /   /
|     /   /
|    /   /
|   /   /
|  /   /
| /   /
|/   /
+--------------------→ x
   f+g = x
² + 3x   (slope at any x is 2x+3)
```
The vertical distances add; therefore the slopes add. The constant 3 stretches the line vertically, multiplying its slope by 3.

## 9. The memory technique

1. **The hook** — Picture a checkout counter: two customers’ items are placed on the same conveyor belt; the total price changes at the sum of the individual rates, and any item bought in quantity \(c\) simply multiplies its price change by \(c\).

2. **What to overlearn**  
   \[
   (f+g)'=f'+g',\qquad(f-g)'=f'-g',\qquad(cf)'=c f'.
   \]

3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Return to the limit definition, split the fraction, and invoke the sum and scalar limit laws.

## 10. What this unlocks
These rules let you differentiate every polynomial instantly and prepare the ground for the product, quotient, and chain rules. They also justify term-by-term differentiation of power series inside the radius of convergence and are the foundation for the linearity of the integral operator that appears two semesters later.

- Product rule  
- Quotient rule  
- Higher-order polynomial derivatives  
- Derivatives of power series  
- Linear differential operators  

## 11. Self-check — five questions, no answers
1. Differentiate \(f(x)=7x^4-2x^3+5x-1\) using only the three rules and the power rule.  
2. Suppose \(f'(2)=3\) and \(g'(2)=-1\). Compute \((5f-4g)'(2)\).  
3. Explain why the constant-multiple rule would fail if the “constant” were allowed to depend on \(x\).  
4. A student writes \((x^2+3x)'=2x+3x\). Identify the error and correct it.  
5. Prove, from the limit definition alone, that \(\frac{d}{dx}(f(x)-g(x))=f'(x)-g'(x)\).