## What it is
Limit laws are a set of algebraic rules that allow you to break down the limit of a complex function into the limits of its simpler component parts. Instead of evaluating a messy limit from scratch, you can distribute the limit operator across addition, multiplication, division, and scalar multiplication, provided the individual limits exist.

## Why it matters
In physics and aerospace engineering, you rarely analyze isolated, simple functions. You evaluate coupled systems—like calculating the limit of a drag-to-thrust ratio as velocity approaches a critical Mach number. Limit laws allow you to decompose these composite models into manageable pieces. In computer science, particularly in machine learning, the linearity of the derivative (which allows layer-by-layer backpropagation) is a direct mathematical consequence of the sum and constant multiple limit laws. 

## When to study it
You must already understand:
1. The concept of a function and basic algebraic manipulation (factoring, expanding).
2. The intuitive definition of a limit (what it means for $f(x)$ to approach $L$ as $x$ approaches $a$).
If you do not conceptually understand what $\lim_{x \to a} f(x) = L$ means, do not proceed. Review the graphical and numerical definitions of limits first.

## How to study it (step by step)
1. **Memorize the conditions:** Write down the prerequisite for all limit laws: they *only* apply if the individual limits $\lim_{x \to a} f(x)$ and $\lim_{x \to a} g(x)$ exist and are finite. 
2. **Master the linear laws:** Write out the Sum and Constant Multiple laws. Apply them to evaluate the limit of a generic quadratic polynomial $ax^2 + bx + c$.
3. **Master the product/quotient laws:** Write out the Product and Quotient laws. Note the strict caveat for quotients: the denominator's limit cannot be zero.
4. **Derive the product law intuitively:** Express $f(x)$ as its limit $L$ plus a small error term $\epsilon_1$, and $g(x)$ as $M + \epsilon_2$. Multiply them to see why the limit of the product is $LM$.
5. **Break the laws:** Intentionally construct a scenario where $\lim [f(x) + g(x)]$ exists, but $\lim f(x)$ and $\lim g(x)$ do not. This proves why the laws only work in one direction.

## Key ideas, with intuition

**1. The Linearity Laws (Sum, Difference, Constant Multiple)**
Limits are linear operators. If you scale a function by a constant $c$, its limit scales by $c$. If you add two functions, the limit of the sum is the sum of their limits. 
$$ \lim_{x \to a} [c f(x) + g(x)] = c \lim_{x \to a} f(x) + \lim_{x \to a} g(x) $$
*Intuition:* If vehicle A approaches 50 mph and vehicle B approaches 30 mph, their combined closing speed approaches $50 + 30 = 80$ mph.

**2. The Product Law**
The limit of a product is the product of the limits.
$$ \lim_{x \to a} [f(x)g(x)] = \left(\lim_{x \to a} f(x)\right) \left(\lim_{x \to a} g(x)\right) $$
*Intuition:* Think of $f(x)$ as the length of a rectangle and $g(x)$ as its width. If the length approaches $L$ and the width approaches $M$, the area of the rectangle approaches $L \times M$.

**3. The Quotient Law**
The limit of a quotient is the quotient of the limits, *provided the limit of the denominator is not zero*.
$$ \lim_{x \to a} \left[ \frac{f(x)}{g(x)} \right] = \frac{\lim_{x \to a} f(x)}{\lim_{x \to a} g(x)} \quad \text{if } \lim_{x \to a} g(x) \neq 0 $$
*Intuition:* Division is just multiplication by a reciprocal. As long as the denominator isn't shrinking to zero (which would cause the fraction to blow up to infinity), the limit behaves predictably.

## Worked example
Evaluate the following limit, justifying each step:
$$ \lim_{x \to 2} \frac{3x^2 + 5x}{x + 1} $$

**Step 1: Check the denominator.**
Before applying the Quotient Law, we must ensure the limit of the denominator is non-zero.
$$ \lim_{x \to 2} (x + 1) = \lim_{x \to 2} x + \lim_{x \to 2} 1 = 2 + 1 = 3 $$
*Reflection:* The limit is 3. Since $3 \neq 0$, the Quotient Law is valid.

**Step 2: Apply the Quotient Law.**
$$ \frac{\lim_{x \to 2} (3x^2 + 5x)}{\lim_{x \to 2} (x + 1)} $$
*Reflection:* We have successfully decoupled the numerator and denominator.

**Step 3: Apply Sum and Constant Multiple Laws to the numerator.**
$$ \frac{3 \left(\lim_{x \to 2} x^2\right) + 5 \left(\lim_{x \to 2} x\right)}{3} $$
*Reflection:* The limit operator distributes across addition and passes through scalar constants.

**Step 4: Apply the Product Law and evaluate.**
$$ \lim_{x \to 2} x^2 = \left(\lim_{x \to 2} x\right) \left(\lim_{x \to 2} x\right) = (2)(2) = 4 $$
$$ \frac{3(4) + 5(2)}{3} = \frac{12 + 10}{3} = \frac{22}{3} $$
*Reflection:* By breaking the function down to the fundamental limit $\lim_{x \to a} x = a$, we evaluate the complex expression purely through arithmetic.

## Diagrams
Here is a geometric intuition for the Product Law. As $x \to a$, the dimensions of the rectangle $f(x)$ and $g(x)$ approach $L$ and $M$. The total area $f(x)g(x)$ approaches the target area $L \times M$.

```text
      g(x)
       ^
       |
       |-----------------------+  <-- M + error_2
   M - |                       |
       |     Target Area       |
       |       (L * M)         |
       |                       |
       +-----------------------+--------> f(x)
                               L      L + error_1

As x -> a:
error_1 -> 0
error_2 -> 0
Area -> L * M
```

## Memory technique — remember this forever
1. **The Mnemonic:** "Limits are polite guests." When a limit walks into a house (a bracketed expression), it shakes hands with *every single term* (distributes over sums, products, and quotients), **unless** the floor is missing (denominator limit is zero) or a person is a ghost (an individual limit does not exist).
2. **Overlearn these facts:**
   * $\lim [f(x) \circ g(x)] = \lim f(x) \circ \lim g(x)$ for $\circ \in \{+, -, \times, \div\}$
   * **Condition 1:** Both $\lim f(x)$ and $\lim g(x)$ MUST exist.
   * **Condition 2:** For division, $\lim g(x) \neq 0$.
3. **Spaced-repetition schedule:** Review this concept and re-derive the error-term proof at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget the product law, derive it from the error definition. Let $f(x) = L + \epsilon_1$ and $g(x) = M + \epsilon_2$, where $\epsilon \to 0$ as $x \to a$.
   $$ f(x)g(x) = (L + \epsilon_1)(M + \epsilon_2) = LM + L\epsilon_2 + M\epsilon_1 + \epsilon_1\epsilon_2 $$
   As $x \to a$, both $\epsilon_1, \epsilon_2 \to 0$. The last three terms vanish, leaving exactly $LM$.

## Common mistakes
1. **Applying the quotient law when the denominator approaches zero.** If $\lim g(x) = 0$, the quotient law is entirely invalid. You must use algebraic manipulation (like factoring or rationalizing) to cancel the zero-causing term before taking the limit.
2. **Assuming the converse is true.** If $\lim_{x \to a} [f(x) + g(x)]$ exists, it does *not* mean $\lim_{x \to a} f(x)$ and $\lim_{x \to a} g(x)$ exist. (Example: $f(x) = 1/x$ and $g(x) = -1/x$ as $x \to 0$. The sum is 0, which has a limit, but the individual limits diverge).
3. **Distributing limits across infinite sums.** Limit laws only apply to a *finite* number of terms. You cannot apply the sum law to an infinite series; that requires convergence tests studied in Calculus II.

## Self-check
1. Evaluate $\lim_{x \to -1} (4x^3 - 2x^2 + x - 7)$ using the limit laws. State which law you use at each step.
2. Why can you not immediately apply the quotient law to $\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$? What must you do first?
3. Suppose $\lim_{x \to 0} f(x)$ does not exist, but $\lim_{x \to 0} g(x) = 0$. Is it possible for $\lim_{x \to 0} [f(x)g(x)]$ to exist? Provide an example to justify your answer.