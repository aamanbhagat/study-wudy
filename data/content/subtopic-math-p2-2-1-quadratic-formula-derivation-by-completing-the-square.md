## What it is
The quadratic formula is a universal algebraic expression that finds the roots (the $x$-values where the equation equals zero) of any quadratic function $ax^2 + bx + c = 0$. Deriving it by "completing the square" means manipulating this general equation to collapse the $x^2$ and $x$ terms into a single squared binomial, allowing you to isolate $x$ algebraically and prove exactly why the formula takes the shape it does.

## Why it matters
This is the foundational tool for solving second-order polynomial equations. In physics and rocket science, you will use it constantly to solve kinematic equations—for example, calculating the exact time a ballistic projectile hits the ground given its initial velocity and height. In machine learning, it is used to find the roots of parabolic cost functions during optimization. Relying on memorization without understanding the derivation leaves you blind to how higher-order polynomials are handled.

## When to study it
Do not attempt this derivation until you have mastered:
1. Basic algebraic manipulation (balancing equations, factoring out constants).
2. Operations with fractions and common denominators.
3. The geometric and algebraic concept of a perfect square trinomial: $(x+k)^2 = x^2 + 2kx + k^2$.
4. Completing the square with actual numbers (e.g., solving $x^2 + 6x - 7 = 0$).

## How to study it (step by step)
1. **Master the perfect square:** Write out the expansion of $(x + \frac{B}{2})^2$. Notice how the middle term is $Bx$ and the final term is $(\frac{B}{2})^2$.
2. **Standardize the equation:** Write $ax^2 + bx + c = 0$. Divide the entire equation by $a$ so the leading coefficient becomes $1$. 
3. **Clear the constant:** Move the constant term to the right side of the equals sign.
4. **Find the magic number:** Take the coefficient of the new $x$ term, divide it by $2$, and square it. 
5. **Complete the square:** Add this magic number to both sides of the equation.
6. **Factor and simplify:** Factor the left side into a perfect square binomial. Find a common denominator for the fractions on the right side.
7. **Isolate $x$:** Take the square root of both sides (do not forget the $\pm$ symbol) and solve for $x$.

## Key ideas, with intuition
**1. The Goal is Isolation**
In the equation $ax^2 + bx + c = 0$, the variable $x$ appears in two different powers ($x^2$ and $x$). You cannot isolate $x$ using basic inverse operations. Completing the square is an algebraic trick to collapse these two instances of $x$ into a single instance inside a parenthesis: $(x + \text{something})^2$. Once $x$ appears only once, isolation is trivial.

**2. The "Magic Number"**
If you have an expression $x^2 + Bx$, you can turn it into a perfect square by adding $(\frac{B}{2})^2$. 
$$x^2 + Bx + \left(\frac{B}{2}\right)^2 = \left(x + \frac{B}{2}\right)^2$$
In the general quadratic, after dividing by $a$, your $B$ is $\frac{b}{a}$. Therefore, the term you must add to both sides is $\left(\frac{b}{2a}\right)^2$.

**3. The Discriminant Emerges Naturally**
When you find a common denominator on the right side of the equation, the numerator becomes $b^2 - 4ac$. This is the discriminant. Because it sits under a square root in the final step, its sign dictates whether the roots are real, repeated, or complex.

## Worked example
We will derive the quadratic formula from first principles.

**Step 1: Start with the general quadratic equation.**
$$ax^2 + bx + c = 0$$

**Step 2: Divide by $a$ to make the $x^2$ coefficient $1$.**
$$x^2 + \frac{b}{a}x + \frac{c}{a} = 0$$

**Step 3: Move the constant term to the right side.**
$$x^2 + \frac{b}{a}x = -\frac{c}{a}$$

**Step 4: Add the square of half the linear coefficient to both sides.**
The linear coefficient is $\frac{b}{a}$. Half of it is $\frac{b}{2a}$. Squaring it gives $\frac{b^2}{4a^2}$.
$$x^2 + \frac{b}{a}x + \frac{b^2}{4a^2} = -\frac{c}{a} + \frac{b^2}{4a^2}$$

**Step 5: Factor the left side into a perfect square.**
$$\left(x + \frac{b}{2a}\right)^2 = -\frac{c}{a} + \frac{b^2}{4a^2}$$

**Step 6: Find a common denominator for the right side.**
Multiply $-\frac{c}{a}$ by $\frac{4a}{4a}$ to get $-\frac{4ac}{4a^2}$.
$$\left(x + \frac{b}{2a}\right)^2 = \frac{b^2 - 4ac}{4a^2}$$

**Step 7: Take the square root of both sides.**
Remember that $\sqrt{u^2} = |u|$, which gives the $\pm$ on the right side.
$$x + \frac{b}{2a} = \pm \sqrt{\frac{b^2 - 4ac}{4a^2}}$$
$$x + \frac{b}{2a} = \pm \frac{\sqrt{b^2 - 4ac}}{2a}$$

**Step 8: Isolate $x$.**
$$x = -\frac{b}{2a} \pm \frac{\sqrt{b^2 - 4ac}}{2a}$$
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

*Reflection:* Every step was a basic algebraic operation aimed at reducing the number of places $x$ appears from two to one. The complex-looking formula is just the inevitable result of keeping the equation balanced.

## Diagrams
Here is the geometric intuition for "completing the square" of $x^2 + Bx$. 

```text
      x             B/2
   +-------------+-------+
   |             |       |
 x |   x^2       | (B/2)x|
   |             |       |
   +-------------+-------+
   |             |       |
B/2|   (B/2)x    |  ???  |
   |             |       |
   +-------------+-------+
```
To make this shape a perfect square with side length $(x + B/2)$, you must add the missing area in the bottom right corner. That area is exactly $(B/2) \times (B/2) = (B/2)^2$. 

## Memory technique — remember this forever
1. **Mnemonic:** "A **negative boy** ($-b$) couldn't decide (**plus or minus**, $\pm$) whether to go to a **radical** ($\sqrt{}$) party. The boy was **square** ($b^2$) so he missed out on **4 awesome chicks** ($-4ac$). The party was all **over at 2 am** (all divided by $2a$)."
2. **Formulas to overlearn:** 
   * The formula: $$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
   * The magic addition term: $$\left(\frac{b}{2a}\right)^2$$
3. **Spaced-repetition schedule:** Derive the formula from a blank sheet of paper on day 1, day 3, day 7, day 16, and day 35. 
4. **First principles pathway:** If you forget the formula, write $ax^2 + bx + c = 0$, divide by $a$, move the constant, add $(\frac{b}{2a})^2$ to both sides, factor, and square root.

## Common mistakes
* **Dividing only the square root by $2a$:** The entire numerator $-b \pm \sqrt{b^2 - 4ac}$ must be divided by $2a$. Writing $x = -b \pm \frac{\sqrt{b^2-4ac}}{2a}$ is a fatal error.
* **Forgetting the $\pm$:** When taking the square root of both sides, forgetting the $\pm$ discards one of the two valid solutions to the quadratic.
* **Sign errors in the discriminant:** When calculating $b^2 - 4ac$, if $c$ is negative, the term becomes positive (e.g., $-4(1)(-3) = +12$). Students frequently subtract when they should add.

## Self-check
1. Derive the roots for the specific equation $3x^2 + 5x - 2 = 0$ by completing the square. Do not plug the numbers into the final quadratic formula; execute the derivation steps.
2. Look at the step where we take the square root: $\left(x + \frac{b}{2a}\right)^2 = \frac{b^2 - 4ac}{4a^2}$. If $b^2 - 4ac < 0$, what happens algebraically, and what does this mean geometrically for the graph of the parabola?
3. Derive the quadratic formula for an equation where the linear coefficient is even: $ax^2 + 2kx + c = 0$. How does the final formula simplify compared to the standard quadratic formula?