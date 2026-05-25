## What it is
The Secant method is a numerical root-finding algorithm that approximates the root of a function $f(x)$. It works by iteratively drawing a secant line through the last two computed points on the function's graph and finding the x-intercept of that line. This intercept becomes the next guess for the root.

## Why it matters
This method is a workhorse in computational science when the derivative of a function is either unknown or computationally expensive to evaluate. In aerospace, it can solve for trajectory intersection points or optimal burn times. In machine learning, optimization algorithms that approximate second-derivative information (Hessians) use similar principles, making it a conceptual building block for quasi-Newton methods like BFGS.

## When to study it
You should understand these concepts first. If not, master them and return.
*   **Newton's Method:** The Secant method is a direct modification of Newton's method, replacing the derivative with a finite difference approximation.
*   **Calculus:** A firm grasp of functions, roots (zeros), and the geometric interpretation of a derivative as the slope of a tangent line.
*   **Linear Interpolation:** The core of the method is finding the x-intercept of a line defined by two points, which is a form of interpolation.

## How to study it (step by step)
1.  **Revisit Newton's Method:** Write down the formula for Newton's method: $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$. Articulate in one sentence what each part represents geometrically (the new guess is the old guess adjusted by the function's value scaled by its slope).
2.  **Approximate the Derivative:** Recall the definition of the derivative: $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$. If we don't take the limit, we get an approximation. Let $x = x_n$ and $x+h = x_{n-1}$. Then $h = x_{n-1} - x_n$. Substitute these to derive the finite difference approximation: $f'(x_n) \approx \frac{f(x_{n-1}) - f(x_n)}{x_{n-1} - x_n} = \frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$.
3.  **Derive the Secant Method Formula:** Substitute the approximation from step 2 into the Newton's method formula from step 1. Simplify the expression to arrive at the canonical Secant method recurrence relation.
4.  **Manual Calculation:** Find the first two iterations for the root of $f(x) = x^2 - 3$, starting with initial guesses $x_0 = 1$ and $x_1 = 2$. Do this by hand to feel the mechanics of the update rule.
5.  **Analyze Convergence:** Contrast the Secant method with Newton's method and the Bisection method. For each, state the information required (e.g., one point and a derivative, two points, a bracket) and its order of convergence (quadratic, superlinear, linear). Understand the trade-off: Secant method avoids the derivative at the cost of slightly slower convergence than Newton's.

## Key ideas, with intuition
1.  **Replacing the Tangent with a Secant:** Newton's method finds the root of the *tangent line* at $x_n$ to find $x_{n+1}$. This requires knowing the exact slope, $f'(x_n)$. The Secant method says: "I don't know the derivative, but I have two points, $(x_n, f(x_n))$ and $(x_{n-1}, f(x_{n-1}))$. The line connecting them—a secant line—is a reasonable approximation of the tangent." The next guess, $x_{n+1}$, is simply the root of this secant line.

2.  **The Recurrence Relation is Just Linear Interpolation:** The equation of the secant line passing through $(x_{n-1}, y_{n-1})$ and $(x_n, y_n)$ where $y=f(x)$ is:
    $$ y - y_n = \frac{y_n - y_{n-1}}{x_n - x_{n-1}} (x - x_n) $$
    We want to find the x-intercept, which is the point $(x_{n+1}, 0)$. We set $y=0$ and $x=x_{n+1}$:
    $$ 0 - f(x_n) = \frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}} (x_{n+1} - x_n) $$
    Solving for $x_{n+1}$ gives the update rule:
    $$ x_{n+1} = x_n - f(x_n) \frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})} $$

3.  **Superlinear Convergence:** The Secant method is faster than methods that only gain a fixed number of correct digits per iteration (linear convergence, like Bisection) but generally slower than Newton's method, which roughly doubles the number of correct digits each time (quadratic convergence). The order of convergence for the Secant method is the golden ratio, $\phi \approx 1.618$. This means the error at step $k+1$ is proportional to the error at step $k$ raised to the power of $\phi$, i.e., $|\epsilon_{k+1}| \propto |\epsilon_k|^\phi$. It strikes a powerful balance between speed and simplicity.

## Worked example
Find the root of $f(x) = e^{-x} - x$ using the Secant method, with initial guesses $x_0 = 0$ and $x_1 = 1$.

**Step 0: Initial setup**
We have $f(x) = e^{-x} - x$, $x_0 = 0$, and $x_1 = 1$.
First, evaluate the function at the initial points:
*   $f(x_0) = f(0) = e^{-0} - 0 = 1$
*   $f(x_1) = f(1) = e^{-1} - 1 \approx 0.36788 - 1 = -0.63212$

**Step 1: Calculate $x_2$**
Use the Secant method formula for $n=1$:
$$ x_2 = x_1 - f(x_1) \frac{x_1 - x_0}{f(x_1) - f(x_0)} $$
Substitute the values:
$$ x_2 = 1 - (-0.63212) \frac{1 - 0}{(-0.63212) - 1} $$
$$ x_2 = 1 - (-0.63212) \frac{1}{-1.63212} $$
$$ x_2 = 1 - 0.38729 \approx 0.61271 $$

*Reflection*: We drew a line between $(0, 1)$ and $(1, -0.63212)$. This line crossed the x-axis at approximately $0.61271$, which is our new, improved guess for the root.

**Step 2: Calculate $x_3$**
Now, our two points are $(x_1, f(x_1))$ and $(x_2, f(x_2))$. The new guess $x_3$ will be generated from these.
First, we need $f(x_2)$:
*   $f(x_2) = f(0.61271) = e^{-0.61271} - 0.61271 \approx 0.54185 - 0.61271 = -0.07086$

Use the formula for $n=2$:
$$ x_3 = x_2 - f(x_2) \frac{x_2 - x_1}{f(x_2) - f(x_1)} $$
Substitute the values:
$$ x_3 = 0.61271 - (-0.07086) \frac{0.61271 - 1}{(-0.07086) - (-0.63212)} $$
$$ x_3 = 0.61271 - (-0.07086) \frac{-0.38729}{0.56126} $$
$$ x_3 = 0.61271 - 0.04890 \approx 0.56381 $$

*Reflection*: We drew a new secant line between $(1, -0.63212)$ and $(0.61271, -0.07086)$. Its x-intercept, $0.56381$, is even closer to the true root (which is approximately $0.56714$). The algorithm is converging as expected.

## Diagrams
Here is a depiction of the first iteration from the worked example.

```text
      y-axis
        ^
 f(x_0) + (x_0, f(x_0))
      1 | .
        |  ` .
        |     ` .  <-- Secant line from x_0 to x_1
        |        ` .
--------+-----------`----------------> x-axis
        | x_0=0      ` x_2     x_1=1
        |             ` .
        |                ` .
        |                   . (x_1, f(x_1))
 f(x_1) +                  -0.63
        |
```
**Description of the process:**
1.  We start with two points on the curve, $(x_0, f(x_0))$ and $(x_1, f(x_1))$.
2.  A straight line (the secant) is drawn connecting these two points.
3.  The point where this secant line intersects the x-axis is our next approximation, $x_2$.
4.  To find $x_3$, we would discard the point $(x_0, f(x_0))$ and repeat the process using a new secant line connecting $(x_1, f(x_1))$ and $(x_2, f(x_2))$.

## Memory technique — remember this forever
1.  **The Story:** Newton is a physicist who calculates the *instantaneous* velocity (the derivative/tangent) to predict where a particle will cross the x-axis. The Secant method is for an engineer who doesn't have a speedometer; instead, she takes two position readings (two points), calculates the *average* velocity between them (the secant slope), and uses that to make her prediction. It's a practical approximation.

2.  **Formula to Overlearn:**
    $$ x_{n+1} = x_n - f(x_n) \frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})} $$
    Memorize its structure: "The next guess ($x_{n+1}$) is the current guess ($x_n$) corrected by the function value ($f(x_n)$) scaled by an approximation of the inverse slope ($1/m$)."

3.  **Spaced Repetition Schedule:** Review this material and re-derive the formula from first principles on this schedule:
    *   1 day from now.
    *   3 days from now.
    *   7 days from now.
    *   16 days from now.
    *   35 days from now.

4.  **First Principles Pathway:** If you forget the formula, rebuild it from the geometry of a line.
    *   **Goal:** Find the x-intercept of the line through $(x_n, f(x_n))$ and $(x_{n-1}, f(x_{n-1}))$.
    *   **Step A:** Write the slope, $m = \frac{\Delta y}{\Delta x} = \frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$.
    *   **Step B:** Use the point-slope form of a line starting from $(x_n, f(x_n))$: $y - f(x_n) = m(x - x_n)$.
    *   **Step C:** The x-intercept is the point $(x_{n+1}, 0)$. Substitute these values: $0 - f(x_n) = m(x_{n+1} - x_n)$.
    *   **Step D:** Solve for $x_{n+1}$: $x_{n+1} = x_n - \frac{f(x_n)}{m}$. Substitute $m$ from Step A. This always works.

## Common mistakes
*   **Index Errors:** A frequent mistake is swapping $x_n$ and $x_{n-1}$ or $f(x_n)$ and $f(x_{n-1})$ in the numerator or denominator of the fraction. Always write the formula carefully.
*   **Poor Initial Guesses:** If $f(x_0)$ is very close to $f(x_1)$ but the points are not near a root, the secant line will be nearly horizontal. Its x-intercept will be very far away, potentially causing the iteration to diverge wildly.
*   **Forgetting to Update Points:** After calculating $x_2$ from $(x_0, x_1)$, the next calculation for $x_3$ must use $(x_1, x_2)$. Do not reuse $x_0$. The method only remembers the two most recent points.

## Self-check
1.  **Easy:** For the function $f(x) = x^3 - 5$, perform two iterations of the Secant method using initial guesses $x_0 = 1$ and $x_1 = 2$.
2.  **Medium:** Consider the function $f(x) = \frac{1}{1+x^2} - 0.1$. Suppose you choose initial guesses $x_0 = -3$ and $x_1 = 3$. What is $f(x_0)$? What is $f(x_1)$? What will happen on the first iteration of the Secant method and why?
3.  **Hard:** The rate of convergence for the Secant method is $\phi \approx 1.618$. For Newton's method, it is $2$. If both methods start with an error of $\epsilon_0 = 0.1$, estimate the error after 3 iterations for each method ($\epsilon_3$). What does this tell you about their relative performance for a well-behaved function?