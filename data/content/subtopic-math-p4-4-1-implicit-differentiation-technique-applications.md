## What it is
Implicit differentiation is a technique used to find the derivative of a relation where the dependent variable ($y$) is not explicitly isolated in terms of the independent variable ($x$). Instead of solving for $y$ first, you apply the derivative operator to both sides of the equation simultaneously, treating $y$ as an unknown, embedded function of $x$ and applying the chain rule.

## Why it matters
In orbital mechanics, spacecraft trajectories are defined by implicit conic sections (ellipses, hyperbolas); implicit differentiation allows you to find velocity vectors without messy, often impossible algebraic inversions. In thermodynamics, state equations (like the Van der Waals equation) relate multiple variables implicitly, making this technique essential for finding rates of change between pressure, volume, and temperature. 

## When to study it
You must be completely fluent in the standard derivative rules: the power rule, product rule, quotient rule, and especially the **chain rule**. If you cannot instantly recognize that the derivative of $(f(x))^2$ is $2f(x)f'(x)$, do not attempt implicit differentiation yet.

## How to study it (step by step)
1. **Master the "y" derivative:** Practice differentiating expressions like $y^3$, $\sin(y)$, and $e^y$ with respect to $x$. Force yourself to write the $\frac{dy}{dx}$ chain rule factor every single time.
2. **Compare explicit vs. implicit:** Derive the slope of a circle ($x^2 + y^2 = r^2$) using implicit differentiation. Then, solve for $y$ explicitly ($y = \pm\sqrt{r^2 - x^2}$) and differentiate. Verify that both methods yield the exact same slope formula.
3. **Drill the mixed product rule:** Practice differentiating terms that combine variables, such as $x^2y^3$ or $x \cos(y)$. This is where most algebraic errors occur.
4. **Isolate the derivative:** Solve 3-5 full equations where you must differentiate, collect all $\frac{dy}{dx}$ terms on the left side, factor out $\frac{dy}{dx}$, and divide to isolate it.
5. **Find second derivatives:** Apply the technique to find $\frac{d^2y}{dx^2}$. You will need to differentiate your first derivative implicitly, and then substitute your original expression for $\frac{dy}{dx}$ back into the new equation to clear it.

## Key ideas, with intuition
* **$y$ is a Trojan Horse:** When you see $y$ in an equation, do not treat it as a static, independent variable like $x$. Treat it as a hidden function $y(x)$. Differentiating $y^3$ with respect to $x$ is not $3y^2$; it is $3y^2 \frac{dy}{dx}$ because of the chain rule. 
* **The Operator Approach:** Differentiation is an operation you apply to an entire equation, not just an isolated function. If the left-hand side equals the right-hand side, their rates of change with respect to $x$ must also be equal: 
  $$ \text{If } L = R, \text{ then } \frac{d}{dx}[L] = \frac{d}{dx}[R] $$
* **Algebraic Extraction:** After applying the derivative operator to both sides, the calculus is over. The term $\frac{dy}{dx}$ is now just an algebraic variable. Move all terms containing $\frac{dy}{dx}$ to one side, move everything else to the other, factor out $\frac{dy}{dx}$, and divide.

## Worked example
Find the equation of the tangent line to the Folium of Descartes, $x^3 + y^3 = 6xy$, at the point $(3,3)$.

**Step 1: Differentiate both sides with respect to $x$.**
$$ \frac{d}{dx}[x^3 + y^3] = \frac{d}{dx}[6xy] $$

**Step 2: Apply power rule, chain rule, and product rule.**
Treat $6xy$ as the product of $(6x)$ and $(y)$.
$$ 3x^2 + 3y^2 \frac{dy}{dx} = 6y + 6x \frac{dy}{dx} $$

**Step 3: Collect $\frac{dy}{dx}$ terms on one side.**
$$ 3y^2 \frac{dy}{dx} - 6x \frac{dy}{dx} = 6y - 3x^2 $$

**Step 4: Factor out $\frac{dy}{dx}$ and solve.**
$$ \frac{dy}{dx}(3y^2 - 6x) = 6y - 3x^2 $$
$$ \frac{dy}{dx} = \frac{6y - 3x^2}{3y^2 - 6x} = \frac{2y - x^2}{y^2 - 2x} $$

**Step 5: Evaluate at $(3,3)$ to find the slope $m$.**
$$ m = \frac{2(3) - (3)^2}{(3)^2 - 2(3)} = \frac{6 - 9}{9 - 6} = \frac{-3}{3} = -1 $$

**Step 6: Use point-slope form.**
$$ y - 3 = -1(x - 3) \implies y = -x + 6 $$

*Reflection:* The product rule on $6xy$ is the linchpin. By treating $y$ as $y(x)$, the derivative $\frac{d}{dx}(xy)$ yields $y + x\frac{dy}{dx}$, allowing us to extract the slope at a specific point on a self-intersecting curve without ever needing to isolate $y$ globally.

## Diagrams
Implicit curves often fail the vertical line test, meaning one $x$-value corresponds to multiple $y$-values. Implicit differentiation allows us to find the slope at a specific $(x,y)$ coordinate without breaking the curve into separate functions.

```text
      y
      ^
      |      Tangent at (x, y_1)
 y_1  +-------/---> m = f'(x, y_1)
      |     / |
      |   /   |
      | /     |
-----(+)------+--------> x
      | \     | x
      |   \   |
      |     \ |
 y_2  +-------\---> Tangent at (x, y_2)
      |         m = f'(x, y_2)
      |
```
*Notice that the slope $m$ depends on BOTH $x$ and $y$. Knowing $x$ alone is insufficient because the curve has two different slopes at that $x$-coordinate.*

## Memory technique — remember this forever
1. **The Hook:** "Tag the $y$." Every time you differentiate a $y$-variable with respect to $x$, you must immediately "tag" it with a $\frac{dy}{dx}$. 
2. **Formulas to overlearn:**
   * $\frac{d}{dx}[y^n] = n y^{n-1} \frac{dy}{dx}$
   * $\frac{d}{dx}[xy] = y + x\frac{dy}{dx}$ (The classic trap)
3. **Spaced-repetition schedule:** Review these core concepts at 1 day, 3 days, 7 days, 16 days, and 35 days. Solve one implicit differentiation problem at each interval.
4. **First principles pathway:** If you forget *why* you are tagging the $y$, remember the formal definition of the chain rule: $\frac{d}{dx} [f(y)] = \frac{df}{dy} \cdot \frac{dy}{dx}$. You differentiate with respect to $y$, then multiply by how $y$ changes with respect to $x$.

## Common mistakes
* **Ignoring the product rule on mixed terms:** Students frequently differentiate $xy$ as $1 \cdot \frac{dy}{dx}$. It is a product of two functions of $x$; you must use the product rule.
* **Forgetting the derivative of a constant is zero:** When differentiating an equation like $x^2 + y^2 = 25$, students often write $2x + 2y\frac{dy}{dx} = 25$. The right side must become $0$.
* **Dropping the tag:** Differentiating $y^2$ as $2y$ instead of $2y\frac{dy}{dx}$. This ruins the entire algebraic extraction phase.

## Self-check
1. Find $\frac{dy}{dx}$ for the equation $x^2y + y^2x = 10$.
2. Find the second derivative $\frac{d^2y}{dx^2}$ for the circle $x^2 + y^2 = r^2$. Express your final answer strictly in terms of $x$, $y$, and $r$.
3. Find the equation of the tangent line to the curve $\sin(x + y) = 2x - 2y$ at the point $(\pi, \pi)$.