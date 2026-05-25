## What it is
The proofs of the derivatives of $e^x$ and $a^x$ establish the exact mathematical rate at which exponential functions grow. They demonstrate rigorously why $e^x$ is the unique function whose rate of change is perfectly equal to its current value, and how any other base $a$ scales this property by a constant factor.

## Why it matters
In physics and aerospace, systems where the rate of change depends on the current amount are governed by $e^x$. This includes radioactive decay, atmospheric pressure gradients, and the Tsiolkovsky rocket equation (where a rocket burns off its own mass to accelerate). In machine learning, exponentials are foundational to softmax and sigmoid activation functions; you cannot compute backpropagation gradients without understanding how to differentiate $e^x$. 

## When to study it
You must already have a rock-solid grasp of:
1. The limit definition of the derivative: $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$
2. Exponent rules (specifically $x^{a+b} = x^a x^b$)
3. Properties of the natural logarithm ($\ln(a^b) = b \ln a$ and $e^{\ln x} = x$)
4. The Chain Rule

If you do not understand the Chain Rule or basic logarithm properties, stop and review them. You cannot prove the derivative of $a^x$ efficiently without them.

## How to study it (step by step)
1. Write out the limit definition of the derivative for $f(x) = e^x$. Use exponent rules to factor out $e^x$.
2. Review the fundamental limit $\lim_{h \to 0} \frac{e^h - 1}{h} = 1$. Recognize that this limit is the mathematical definition of the number $e$.
3. Combine steps 1 and 2 to finalize the proof that $\frac{d}{dx} e^x = e^x$.
4. Rewrite the general exponential $f(x) = a^x$ using base $e$: $a^x = e^{x \ln a}$.
5. Apply the Chain Rule to $e^{x \ln a}$ to derive the formula for $\frac{d}{dx} a^x$.
6. Solve 5 practice problems applying the Chain Rule to composite exponential functions (e.g., $e^{3x^2}$, $2^{\sin x}$).

## Key ideas, with intuition
**The uniqueness of $e$**
The number $e \approx 2.718$ is specifically defined as the base for which the tangent line to the curve $y = e^x$ at $x=0$ has a slope of exactly $1$. 
Because the slope at $x=0$ is $1$, the limit definition at $x=0$ yields:
$$ \lim_{h \to 0} \frac{e^{0+h} - e^0}{h} = \lim_{h \to 0} \frac{e^h - 1}{h} = 1 $$
This limit is the engine of the entire proof.

**Factoring the limit**
When applying the limit definition to $e^x$ at any point $x$, the $+h$ in the exponent becomes multiplication:
$$ \frac{e^{x+h} - e^x}{h} = \frac{e^x e^h - e^x}{h} = e^x \left( \frac{e^h - 1}{h} \right) $$
Because $e^x$ does not depend on $h$, it acts as a constant relative to the limit and pulls out to the front. The remaining limit evaluates to $1$, leaving just $e^x$.

**Base conversion for $a^x$**
Any exponential growth is just base-$e$ growth in disguise. Base $a$ is mathematically identical to base $e$ with a built-in scaling factor of $\ln a$ in the exponent. By rewriting $a^x$ as $e^{x \ln a}$, you bypass the need to evaluate a new, difficult limit and can instead rely on the Chain Rule.

## Worked example
**Goal:** Prove that $\frac{d}{dx} a^x = a^x \ln a$ for $a > 0$.

**Step 1:** Rewrite $a^x$ using base $e$.
$$ f(x) = a^x = e^{\ln(a^x)} $$
*Why it works: $e^x$ and $\ln x$ are inverse functions, so $e^{\ln(\text{anything})} = \text{anything}$.*

**Step 2:** Use logarithm properties to pull the exponent $x$ down.
$$ f(x) = e^{x \ln a} $$
*Why it works: $\ln(a^b) = b \ln a$. This transforms an exponential base into a constant multiplier in the exponent.*

**Step 3:** Differentiate using the Chain Rule. Let $u = x \ln a$.
$$ \frac{d}{dx} e^u = e^u \cdot \frac{du}{dx} $$
*Why it works: The derivative of $e^u$ is $e^u$ times the derivative of the inside function.*

**Step 4:** Compute $\frac{du}{dx}$.
$$ \frac{d}{dx} (x \ln a) = \ln a $$
*Why it works: $\ln a$ is just a constant number (like $5$). The derivative of $5x$ is $5$; the derivative of $(\ln a)x$ is $\ln a$.*

**Step 5:** Substitute back into the Chain Rule expression.
$$ \frac{d}{dx} a^x = e^{x \ln a} \cdot \ln a $$

**Step 6:** Revert $e^{x \ln a}$ back to its original form, $a^x$.
$$ \frac{d}{dx} a^x = a^x \ln a $$
*Conclusion: The derivative of $a^x$ is itself, scaled by the natural log of the base.*

## Diagrams
```text
      y
      ^
      |        / y = e^x
    e + - - - /
      |      /| 
      |     / | slope = e
      |    /  |
    1 + - /   |
      |  /    |
  ----+-------+-----> x
      | 0     1
```
*Notice that at $x=1$, the y-value is $e^1 = e$. The slope of the tangent line at this exact point is also $e$. The function's height and its slope are always identical.*

## Memory technique — remember this forever
1. **The Hook:** "The Power Rule is for variables on the ground ($x^2$). The Exponential Rule is for variables in the attic ($2^x$). When the variable is in the attic, the house stays exactly the same, but the attic's foundation ($\ln a$) falls out."
2. **Formulas to overlearn:**
   * $\frac{d}{dx} e^x = e^x$
   * $\frac{d}{dx} a^x = a^x \ln a$
3. **Spaced-repetition schedule:** Review these proofs and formulas at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the formula for $a^x$, you can *always* recover it by writing $a^x = e^{x \ln a}$ and applying the Chain Rule.

## Common mistakes
* **Applying the Power Rule to exponentials:** Students frequently write $\frac{d}{dx} 2^x = x 2^{x-1}$. This is a fatal error. The Power Rule only applies when the base is a variable and the exponent is a constant ($x^n$). 
* **Forgetting the Chain Rule:** When differentiating $e^{f(x)}$, students write $e^{f(x)}$ and stop. It must be $e^{f(x)} \cdot f'(x)$. Example: $\frac{d}{dx} e^{3x} = 3e^{3x}$, not just $e^{3x}$.
* **Dividing by $\ln a$:** Students sometimes write $\frac{d}{dx} a^x = \frac{a^x}{\ln a}$. This is the formula for the *integral* (antiderivative) of $a^x$, not the derivative.

## Self-check
1. Differentiate $f(x) = e^{\pi x}$. (Hint: $\pi$ is just a constant).
2. Use the limit definition of the derivative directly on $f(x) = 10^x$ to show that $f'(x) = 10^x \lim_{h \to 0} \frac{10^h - 1}{h}$. (Assume $\lim_{h \to 0} \frac{10^h - 1}{h} = \ln 10$).
3. Differentiate $f(x) = x^x$. (Hint: You cannot use the Power Rule OR the basic Exponential Rule because both the base and the exponent are variables. Rewrite it as $e^{x \ln x}$ and use the Chain Rule and Product Rule).