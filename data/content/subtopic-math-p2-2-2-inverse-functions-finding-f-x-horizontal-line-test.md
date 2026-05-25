## What it is
An inverse function "undoes" the action of the original function. If a function $f$ maps an input $x$ to an output $y$, its inverse $f^{-1}$ maps $y$ back to $x$. The horizontal line test is a visual method to determine if a function *can* have an inverse; it checks that no two different inputs produce the same output.

## Why it matters
Inversions are fundamental to solving equations. In orbital mechanics, if you have a function for altitude over time $h(t)$, finding the inverse $t(h)$ tells you exactly *when* a rocket will reach a specific staging altitude. In computer science, cryptographic algorithms rely heavily on functions that are easy to compute but mathematically difficult to invert (trapdoor functions). Every time you solve for a variable, you are applying an inverse function.

## When to study it
Do not attempt this until you have mastered:
1. Basic algebra (manipulating equations to isolate a variable).
2. The definition of a function and the vertical line test.
3. Function composition (evaluating $f(g(x))$).
If you cannot confidently solve $3x - 4 = 5y$ for $x$, go back and review linear algebra fundamentals.

## How to study it (step by step)
1. **Understand one-to-one (injective) mappings.** A function can only be inverted if every output comes from exactly *one* input. 
2. **Apply the Horizontal Line Test.** Graph a function. If any horizontal line intersects the graph more than once, the function is not one-to-one and has no inverse (unless you restrict its domain).
3. **Master the algebraic swap.** To find an inverse algebraically: replace $f(x)$ with $y$, swap the variables $x$ and $y$, and solve for the new $y$.
4. **Verify via composition.** Always check your work by proving that $f(f^{-1}(x)) = x$ and $f^{-1}(f(x)) = x$. 
5. **Visualize the geometry.** Graph a function and its inverse. Notice that they are perfect reflections of each other across the diagonal line $y = x$.

## Key ideas, with intuition

**1. The Horizontal Line Test**
A function passes the vertical line test because an input $x$ can only have one output $y$. If we are going to reverse the function, the old outputs become the new inputs. Therefore, the original function must pass a *horizontal* line test to ensure that an output $y$ only came from one input $x$. If it fails, the inverse would fail the vertical line test.

**2. Domain and Range Swap**
Because the inverse swaps inputs and outputs, the domain of $f$ becomes the range of $f^{-1}$. The range of $f$ becomes the domain of $f^{-1}$. 

**3. The Algebraic Mechanism**
Finding an inverse is just changing your perspective on the independent variable. 
Let $y = 2x + 1$. Here, $y$ depends on $x$. 
To find the inverse, we want $x$ to depend on $y$. 
Solve for $x$: $x = \frac{y - 1}{2}$. 
By convention, we rename the independent variable back to $x$ to graph them on the same plane: $f^{-1}(x) = \frac{x - 1}{2}$.

## Worked example
**Problem:** Find the inverse of the rational function $f(x) = \frac{2x + 3}{x - 1}$.

**Step 1: Replace $f(x)$ with $y$.**
$$y = \frac{2x + 3}{x - 1}$$

**Step 2: Swap $x$ and $y$.**
$$x = \frac{2y + 3}{y - 1}$$

**Step 3: Solve for $y$.**
Multiply both sides by $(y - 1)$ to clear the denominator:
$$x(y - 1) = 2y + 3$$
Distribute the $x$:
$$xy - x = 2y + 3$$
Move all terms containing $y$ to one side, and all other terms to the other side:
$$xy - 2y = x + 3$$
Factor out the $y$:
$$y(x - 2) = x + 3$$
Divide by $(x - 2)$ to isolate $y$:
$$y = \frac{x + 3}{x - 2}$$

**Step 4: Replace $y$ with $f^{-1}(x)$.**
$$f^{-1}(x) = \frac{x + 3}{x - 2}$$

*Reflection:* The trickiest part is Step 3. When the variable you want to isolate appears in both the numerator and denominator, you must clear the fraction, expand, and gather the target variable on one side to factor it out. 

## Diagrams

**Diagram 1: The Horizontal Line Test**
```text
      y
      |   f(x) = x^2 (Fails test)
  4   |   *       *
      |    *     *
  2 --|-----*---*------- Horizontal line y=2 hits twice!
      |      * *
______|_______*_______ x
     -2   0   2

Because y=2 comes from both x=-1.41 and x=1.41, 
the inverse wouldn't know which x to return.
```

**Diagram 2: Reflection across y = x**
```text
      y
      |       / y = x (Mirror)
      |      /    *  f(x) = 2x
      |     /   *
      |    /  *
      |   / *      * f^-1(x) = 0.5x
      |  /       *
      | /      *
______|/_____*________ x
      /
```

## Memory technique — remember this forever
1. **The Hook:** "Inverse is a Mirror and a Swap." Geometrically, you mirror across $y=x$. Algebraically, you swap $x$ and $y$.
2. **Must overlearn:** 
   * $f(f^{-1}(x)) = x$
   * $f^{-1}(x) \neq \frac{1}{f(x)}$ (Inverse is NOT reciprocal).
3. **Spaced-repetition schedule:** Review this concept at 1 day, 3 days, 7 days, 16 days, and 35 days. Solve one rational function inverse each time.
4. **First principles pathway:** If you forget the steps, remember the core definition: an inverse answers the question, "If I know the output, what was the input?" Just write the equation and solve for the input variable.

## Common mistakes
1. **Confusing inverse with reciprocal.** $f^{-1}(x)$ means the inverse function. $(f(x))^{-1}$ or $\frac{1}{f(x)}$ means the reciprocal. They are completely different. The inverse of $y = 2x$ is $y = 0.5x$. The reciprocal is $y = \frac{1}{2x}$.
2. **Failing to restrict the domain.** Students will blindly find the inverse of $f(x) = x^2$ as $f^{-1}(x) = \pm\sqrt{x}$. But $\pm\sqrt{x}$ is not a function (it fails the vertical line test). You must restrict the original domain to $x \ge 0$ so the inverse is just $f^{-1}(x) = \sqrt{x}$.
3. **Algebraic grouping errors.** In rational functions (like the worked example), students frequently fail to factor out the $y$ after bringing the $y$-terms to one side. 

## Self-check
1. Find the inverse of the linear function $f(x) = 5x - 9$.
2. Why does $f(x) = |x|$ fail the horizontal line test? What domain restriction would allow it to have an inverse?
3. Find the inverse of $f(x) = \frac{3x - 1}{x + 4}$. State the domain of $f(x)$ and the domain of $f^{-1}(x)$. What do you notice?