## What it is
A quadratic equation is a second-degree polynomial equation, fundamentally taking the standard form $ax^2 + bx + c = 0$. Factoring is the algebraic process of reverse-engineering this expression into a product of simpler linear terms, while completing the square is a geometric and algebraic technique used to manipulate the equation so that the variable $x$ is isolated inside a single squared binomial. 

## Why it matters
Quadratics model systems with constant acceleration. In physics and aerospace, they are the foundational equations for projectile motion, orbital mechanics, and calculating kinematic trajectories. In computer science and machine learning, quadratic cost functions are the gold standard because they form convex parabolas—meaning they possess a single, easily computable global minimum that optimization algorithms (like gradient descent) can reliably find.

## When to study it
You must already be fluent in basic algebraic manipulation, integer arithmetic, and the distributive property (specifically, expanding binomials via FOIL). If you cannot instantly expand $(x+3)(x-4)$ or reliably solve linear equations like $3x + 7 = -2$, you are missing the prerequisites. Go back and master linear algebra basics first.

## How to study it (step by step)
1. **Expand to understand:** Spend 20 minutes expanding abstract binomials like $(x+m)(x+n)$. Observe how the resulting polynomial is always $x^2 + (m+n)x + mn$. The middle coefficient is the sum; the constant is the product.
2. **Reverse the process (Factoring):** Practice finding two numbers that multiply to $c$ and add to $b$ for equations where $a=1$. Apply this to solve equations using the Zero Product Property.
3. **Draw the geometry:** Draw a physical square of side length $x$. Attach two rectangles of dimensions $x$ by $b/2$ to its sides. Calculate the area of the missing corner required to make the entire shape a perfect square.
4. **Complete the square algebraically ($a=1$):** Practice isolating the $x^2 + bx$ terms, calculating the missing $(b/2)^2$ area, and adding it to both sides of an equation to force a perfect square trinomial.
5. **Handle leading coefficients ($a \neq 1$):** Practice dividing the entire equation by $a$ (or factoring $a$ out of the $x$ terms) before attempting to complete the square. You cannot complete the square if the $x^2$ term has a coefficient other than 1.

## Key ideas, with intuition

**The Zero Product Property**
If you factor a quadratic into $(x-3)(x+2) = 0$, logic dictates that for a product to be zero, at least one of the multipliers must be zero. This is a profound simplification: it transforms one difficult second-degree equation into two trivial first-degree equations ($x-3=0$ or $x+2=0$). 

**The Geometric Reality of Completing the Square**
Algebra is just formalized geometry. To visualize $x^2 + bx$, imagine a square of area $x^2$ and two rectangles, each of area $\frac{b}{2}x$, attached to its right and bottom sides. To form a complete, larger square, you are missing a small corner piece. The dimensions of that missing corner are $\frac{b}{2}$ by $\frac{b}{2}$. Therefore, adding $(\frac{b}{2})^2$ "completes the square," allowing you to rewrite the total area as $(x + \frac{b}{2})^2$.

**Isolating the Variable**
In the form $x^2 + bx = c$, the variable $x$ appears in two different terms with different powers. You cannot isolate $x$ using basic arithmetic. Completing the square collapses those two terms into one: $(x + h)^2 = k$. Now, $x$ exists in only one place, and you can strip away the outer layers using a square root.

## Worked example
Solve $2x^2 - 12x + 10 = 0$ by completing the square.

**Step 1: Force $a=1$ by dividing the entire equation by 2.**
$$x^2 - 6x + 5 = 0$$

**Step 2: Move the constant to the right side.**
$$x^2 - 6x = -5$$

**Step 3: Find the missing square piece, $(b/2)^2$.**
Here, $b = -6$. 
$$\left(\frac{-6}{2}\right)^2 = (-3)^2 = 9$$

**Step 4: Add 9 to both sides to maintain equality.**
$$x^2 - 6x + 9 = -5 + 9$$
$$x^2 - 6x + 9 = 4$$

**Step 5: Factor the left side into a perfect square.**
$$(x - 3)^2 = 4$$

**Step 6: Take the square root of both sides.**
$$x - 3 = \pm 2$$

**Step 7: Solve for $x$.**
$$x = 3 \pm 2$$
$$x = 5 \quad \text{or} \quad x = 1$$

*Reflection:* Dividing by 2 was mandatory to make the leading coefficient 1, which enables the geometric trick. Adding 9 to both sides preserved the equation's balance while deliberately forcing the left side to collapse into a squared binomial, successfully reducing two $x$ terms into one.

## Diagrams

```text
Visualizing: x^2 + bx + (b/2)^2 = (x + b/2)^2

        x             b/2
      +-------------+-------+
      |             |       |
    x |    x^2      | bx/2  |
      |             |       |
      +-------------+-------+
      |             |       |
  b/2 |   bx/2      |  ???  |
      |             |       |
      +-------------+-------+

The total side length is (x + b/2).
The missing corner "???" has area (b/2) * (b/2) = (b/2)^2.
Add it, and you have a perfect square of area (x + b/2)^2.
```

## Memory technique — remember this forever
**The Hook:** "Half the middle, square it, add it."

**Facts to overlearn:**
1. The missing piece to add is ALWAYS $(\frac{b}{2})^2$.
2. The resulting factored form is ALWAYS $(x + \frac{b}{2})^2$.

**Spaced-repetition schedule:** Review this derivation and solve one problem at 1 day, 3 days, 7 days, 16 days, and 35 days.

**The First Principles Pathway:** 
If you forget the formula $(\frac{b}{2})^2$, derive it instantly by expanding a generic perfect square:
$$(x + d)^2 = x^2 + 2dx + d^2$$
You want this to match your equation's terms: $x^2 + bx$. 
By matching coefficients, $2d = b$, which means $d = \frac{b}{2}$. 
The constant term at the end is $d^2$, which must therefore be $(\frac{b}{2})^2$.

## Common mistakes
1. **Forgetting the $\pm$ when taking the square root.** If $X^2 = 16$, $X$ can be $4$ or $-4$. Forgetting the negative root means you lose half of your solutions.
2. **Adding $(b/2)^2$ to one side only.** An equation is a scale. If you add a number to the left side to complete the square, you must add the exact same number to the right side.
3. **Failing to factor out $a$.** You cannot use the $(b/2)^2$ rule on $3x^2 + 6x = 5$. You must divide by 3 first to get $x^2 + 2x = \frac{5}{3}$.

## Self-check
1. Solve $x^2 - 8x + 15 = 0$ by factoring.
2. Solve $x^2 + 10x - 3 = 0$ by completing the square. Leave your answer in exact radical form.
3. Derive the general Quadratic Formula by completing the square on the generic equation $ax^2 + bx + c = 0$. (Hint: follow the exact same steps as the worked example, but with letters).