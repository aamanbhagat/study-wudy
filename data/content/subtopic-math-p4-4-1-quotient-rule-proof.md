## What it is
The quotient rule is a foundational theorem in calculus that provides a formula for finding the derivative of a function that is the ratio of two differentiable functions. The proof of the quotient rule demonstrates algebraically why the derivative of $\frac{f(x)}{g(x)}$ evaluates to $\frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}$, typically by applying the limit definition of the derivative or by combining the product and chain rules.

## Why it matters
Rational functions (ratios of polynomials or other functions) govern the physical world. In aerospace engineering, optimizing a rocket's thrust-to-weight ratio over time requires differentiating a quotient. In physics, calculating the terminal velocity of a falling object with air resistance involves quotients of changing forces. Mastering the *proof* of this rule, rather than just memorizing the result, trains you in the algebraic manipulation of limits and differentials—a critical skill for deriving numerical methods in machine learning and solving differential equations.

## When to study it
Do not attempt this proof until you have mastered:
1. The limit definition of the derivative.
2. Basic limit laws (specifically, the limit of a product/quotient is the product/quotient of the limits, provided the denominator is non-zero).
3. The proof of the product rule. 
If you cannot confidently derive the product rule from first principles using the "add and subtract a strategic zero" technique, go back and learn that first.

## How to study it (step by step)
1. Write down the limit definition of the derivative for $Q(x) = \frac{f(x)}{g(x)}$. 
2. Find a common denominator to combine the complex fraction in the numerator.
3. Introduce a "strategic zero" in the numerator by adding and subtracting $f(x)g(x)$. 
4. Group the terms to factor out $f(x)$ and $g(x)$, thereby revealing the limit definitions of $f'(x)$ and $g'(x)$.
5. Evaluate the limit as $h \to 0$, applying limit laws to separate the numerator and denominator.
6. As a secondary exercise, prove the rule again without limits by rewriting $Q(x) = f(x)[g(x)]^{-1}$ and applying the product and chain rules.

## Key ideas, with intuition
**1. The Implicit Product**
Instead of viewing division as a new operation, view it as an implicit multiplication. If $Q(x) = \frac{f(x)}{g(x)}$, then $f(x) = Q(x)g(x)$. The area of a rectangle with sides $Q$ and $g$ is $f$. If you know how a rectangle's area ($f$) and width ($g$) change, you can deduce how its height ($Q$) must change. 

**2. The Strategic Zero**
When using the limit definition, you will encounter the expression $f(x+h)g(x) - f(x)g(x+h)$. To evaluate this, you must uncouple the changes in $f$ and $g$. You do this by adding $0 = -f(x)g(x) + f(x)g(x)$ in the middle of the expression. This creates a bridge that allows you to factor and isolate the difference quotients for $f$ and $g$.

## Worked example
We will prove the quotient rule using the limit definition of the derivative.

Let $Q(x) = \frac{f(x)}{g(x)}$. Assume $f$ and $g$ are differentiable at $x$, and $g(x) \neq 0$.

$$ Q'(x) = \lim_{h \to 0} \frac{\frac{f(x+h)}{g(x+h)} - \frac{f(x)}{g(x)}}{h} $$

**Step 1: Find a common denominator for the numerator.**
$$ Q'(x) = \lim_{h \to 0} \frac{\frac{f(x+h)g(x) - f(x)g(x+h)}{g(x+h)g(x)}}{h} $$
$$ Q'(x) = \lim_{h \to 0} \frac{f(x+h)g(x) - f(x)g(x+h)}{h \cdot g(x+h)g(x)} $$

**Step 2: Add and subtract the strategic zero, $f(x)g(x)$, in the numerator.**
$$ Q'(x) = \lim_{h \to 0} \frac{f(x+h)g(x) \mathbf{- f(x)g(x) + f(x)g(x)} - f(x)g(x+h)}{h \cdot g(x+h)g(x)} $$

**Step 3: Group terms and factor.**
$$ Q'(x) = \lim_{h \to 0} \frac{g(x)[f(x+h) - f(x)] - f(x)[g(x+h) - g(x)]}{h \cdot g(x+h)g(x)} $$

**Step 4: Split the fraction and apply the limit as $h \to 0$.**
$$ Q'(x) = \lim_{h \to 0} \frac{1}{g(x+h)g(x)} \cdot \left[ g(x)\frac{f(x+h) - f(x)}{h} - f(x)\frac{g(x+h) - g(x)}{h} \right] $$

Because $f$ and $g$ are differentiable, their limits as $h \to 0$ are $f'(x)$ and $g'(x)$. Because $g$ is differentiable, it is continuous, so $\lim_{h \to 0} g(x+h) = g(x)$.

$$ Q'(x) = \frac{1}{g(x) \cdot g(x)} \cdot \left[ g(x)f'(x) - f(x)g'(x) \right] $$
$$ Q'(x) = \frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2} $$

*Reflection:* The proof hinges entirely on algebraic manipulation. By forcing the expression into a form where we recognize $\frac{f(x+h)-f(x)}{h}$, we transition from an intractable limit into known derivatives.

## Diagrams
We can visualize the quotient rule by looking at the implicit product $f = Q \cdot g$. Imagine a rectangle of area $f$. 

```text
       Width = g
   +----------------+
   |                |
   |   Area = f     | Height = Q
   |                |
   +----------------+
```
If the area $f$ changes by a small amount $\Delta f$, it is due to a change in width ($\Delta g$) and a change in height ($\Delta Q$).
From the product rule geometry: 
$\Delta f \approx Q \Delta g + g \Delta Q$

Solve for the change in height, $\Delta Q$:
$g \Delta Q \approx \Delta f - Q \Delta g$
$\Delta Q \approx \frac{\Delta f - Q \Delta g}{g}$

Substitute $Q = \frac{f}{g}$:
$\Delta Q \approx \frac{\Delta f - (\frac{f}{g})\Delta g}{g} = \frac{g \Delta f - f \Delta g}{g^2}$

Divide by $\Delta x$ and take the limit to get the exact quotient rule.

## Memory technique — remember this forever
1. **The Mnemonic:** "Low D-High minus High D-Low, draw a line and square below." 
   * Low = $g(x)$
   * D-High = $f'(x)$
   * High = $f(x)$
   * D-Low = $g'(x)$
   * Square below = $[g(x)]^2$
2. **The Formula to overlearn:** 
   $$ \left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2} $$
3. **Spaced-repetition schedule:** Review this proof (write it out from scratch) at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **The "First Principles" Pathway:** If you forget the formula and the mnemonic, do not panic. Rewrite the quotient as a product with a negative exponent: $\frac{d}{dx}[f(x) \cdot (g(x))^{-1}]$. Apply the product rule and the chain rule. You will derive the exact same formula in three lines of algebra.

## Common mistakes
1. **Reversing the numerator:** Subtraction is not commutative. Writing $f(x)g'(x) - f'(x)g(x)$ will give you the negative of the correct answer. The derivative of the *numerator* ($f'$) must come first.
2. **Forgetting to square the denominator:** In the heat of a complex physics problem, students often write the numerator perfectly but leave the denominator as $g(x)$ instead of $[g(x)]^2$.
3. **Misdistributing the negative sign:** When taking the derivative of a complex numerator, students often fail to distribute the minus sign across all terms in $f(x)g'(x)$. Use brackets aggressively: $f'g - [fg']$.

## Self-check
1. Derive the quotient rule strictly by applying the product rule and chain rule to $Q(x) = f(x)[g(x)]^{-1}$. 
2. Use the limit definition of the derivative to prove the reciprocal rule: $\frac{d}{dx}\left[\frac{1}{g(x)}\right] = \frac{-g'(x)}{[g(x)]^2}$. 
3. Assume the product rule is true. If $f(x) = Q(x)g(x)$, differentiate both sides with respect to $x$ using the product rule, and then solve algebraically for $Q'(x)$. Does your result match the quotient rule?