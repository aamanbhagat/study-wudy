## What it is
Forming a quadratic equation from its given roots is the reverse process of solving a quadratic. Instead of starting with an equation to find where a parabola crosses the x-axis, you start with the x-intercepts (the roots) and algebraically build the equation that produces them.

## Why it matters
In control theory and aerospace engineering, engineers design systems by first deciding how they want the system to behave (defining its "poles" or roots) and then working backward to build the differential equation that yields that exact behavior. In physics, if you know the boundary conditions where a projectile launches and lands, you use this reverse-engineering process to reconstruct the equation of its trajectory.

## When to study it
You must already understand:
1. Basic algebraic expansion (the FOIL method).
2. Factoring quadratic equations.
3. The geometric meaning of a "root" or "x-intercept" on a Cartesian plane.

If you cannot comfortably expand $(x-3)(x+4)$ or solve $x^2 - x - 12 = 0$ by factoring, you are missing the prerequisites. Review polynomial expansion and factoring first.

## How to study it (step by step)
1. Start by defining two arbitrary roots, $x = \alpha$ and $x = \beta$. 
2. Rewrite these statements as zero-expressions: $(x - \alpha) = 0$ and $(x - \beta) = 0$.
3. Multiply these expressions together to form the factored quadratic: $(x - \alpha)(x - \beta) = 0$.
4. Expand the product to see exactly how the roots combine to form the $x$ coefficient and the constant term.
5. Compare your expanded equation to the standard form $ax^2 + bx + c = 0$.
6. Practice forming equations given integer roots. Once mastered, move to fractional roots, and finally to irrational conjugate roots (e.g., $1 + \sqrt{2}$ and $1 - \sqrt{2}$).

## Key ideas, with intuition

**1. The Factor Theorem Connection**
If a polynomial evaluates to zero at $x = r$, then $(x - r)$ must be a factor of that polynomial. Because a quadratic has exactly two roots (Fundamental Theorem of Algebra), let's call them $\alpha$ and $\beta$. The core structure of the quadratic is always the product of these factors: $(x - \alpha)(x - \beta) = 0$.

**2. Sum and Product of Roots (Vieta's Formulas)**
When you expand the factored form, a profound pattern emerges:
$$ (x - \alpha)(x - \beta) = 0 $$
$$ x^2 - \beta x - \alpha x + \alpha \beta = 0 $$
$$ x^2 - (\alpha + \beta)x + (\alpha \beta) = 0 $$
The coefficient of $x$ is the **negative sum** of the roots. The constant term is the **product** of the roots. This means you can bypass algebraic expansion entirely if you simply add and multiply the roots.

**3. The Scaling Factor**
The roots only dictate *where* the parabola crosses the x-axis. They tell you nothing about how steep the parabola is, or whether it opens upward or downward. Therefore, the most general form of the equation is:
$$ a[x^2 - (\alpha + \beta)x + \alpha\beta] = 0 $$
where $a$ is any non-zero real number. Setting $a=1$ gives the simplest "monic" polynomial, but an infinite family of parabolas share the same roots.

## Worked example
**Problem:** Find the quadratic equation with integer coefficients whose roots are $\frac{1}{2}$ and $-3$.

**Step 1:** Identify the roots. $\alpha = \frac{1}{2}$ and $\beta = -3$.
**Step 2:** Calculate the sum of the roots ($S$).
$$ S = \frac{1}{2} + (-3) = -\frac{5}{2} $$
**Step 3:** Calculate the product of the roots ($P$).
$$ P = \left(\frac{1}{2}\right)(-3) = -\frac{3}{2} $$
**Step 4:** Substitute $S$ and $P$ into the template $x^2 - Sx + P = 0$.
$$ x^2 - \left(-\frac{5}{2}\right)x + \left(-\frac{3}{2}\right) = 0 $$
$$ x^2 + \frac{5}{2}x - \frac{3}{2} = 0 $$
**Step 5:** Multiply the entire equation by 2 to clear the denominators and satisfy the "integer coefficients" requirement.
$$ 2x^2 + 5x - 3 = 0 $$

*Reflection:* Calculating the sum and product separately is much less error-prone than expanding $(x - \frac{1}{2})(x + 3) = 0$ directly. The final multiplication by 2 scales the parabola vertically (changing its $y$-intercept from $-1.5$ to $-3$) but preserves the $x$-intercepts because $0 \times 2 = 0$.

## Diagrams

```text
      y
      |
      |   *       *   <-- a > 1 (steep, same roots)
      |  /         \
      | /           \
  ----|/-------------|---- x
     /| \           /
    / |  \         /
   *  |   *-------*   <-- a = 1 (standard, same roots)
alpha |            beta
      |
```
*Notice that both parabolas cross the x-axis at the exact same $\alpha$ and $\beta$. The roots alone give you $x^2 - Sx + P = 0$. You need a third point to determine the vertical scaling factor $a$.*

## Memory technique — remember this forever

1. **The Hook:** "Minus Sum, Plus Product." Think of the equation as a sandwich. The $x^2$ and $=0$ are the bread. The filling is the sum (which gets a negative sign), and the dessert is the product (which stays positive).
2. **Formulas to overlearn:**
   * $x^2 - (\text{Sum})x + (\text{Product}) = 0$
   * $\text{Sum} = \alpha + \beta = -\frac{b}{a}$
   * $\text{Product} = \alpha\beta = \frac{c}{a}$
3. **Spaced-repetition schedule:** Review this concept and derive it from scratch at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you ever blank on the "Minus Sum, Plus Product" formula, do not panic. Write $x = \alpha$ and $x = \beta$. Move the roots to the left side: $(x - \alpha) = 0$ and $(x - \beta) = 0$. Multiply them: $(x - \alpha)(x - \beta) = 0$. Expand using FOIL. The formula will immediately reveal itself.

## Common mistakes
* **Forgetting the negative sign on the sum:** Students frequently write $x^2 + (\alpha + \beta)x + \alpha\beta = 0$. The formula requires you to *subtract* the sum of the roots.
* **Assuming $a=1$ is the absolute truth:** If a problem asks for "a" quadratic, $a=1$ is fine. If a problem gives you roots *and* another point (like a y-intercept), you must write $y = a(x^2 - Sx + P)$ and solve for $a$.
* **Brute-forcing conjugate roots:** If roots are $3 + \sqrt{2}$ and $3 - \sqrt{2}$, students try to expand $(x - (3+\sqrt{2}))(x - (3-\sqrt{2}))$. This is a nightmare of algebra. Instead, just find the Sum ($3+\sqrt{2} + 3-\sqrt{2} = 6$) and Product ($(3+\sqrt{2})(3-\sqrt{2}) = 9 - 2 = 7$). The equation is instantly $x^2 - 6x + 7 = 0$.

## Self-check
1. What is the simplest monic quadratic equation with roots $x = 4$ and $x = -7$?
2. Form a quadratic equation with integer coefficients whose roots are $x = \frac{2}{3}$ and $x = -\frac{1}{4}$.
3. A parabola crosses the x-axis at $x = 3 + \sqrt{5}$ and $x = 3 - \sqrt{5}$, and passes through the y-axis at $y = 16$. What is its exact equation?