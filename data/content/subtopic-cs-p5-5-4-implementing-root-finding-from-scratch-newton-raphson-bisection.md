## What it is
Root-finding is the process of numerically finding a value $x$ for which a function evaluates to zero, i.e., solving $f(x)=0$. These solutions are called the "roots" or "zeros" of the function. The bisection and Newton-Raphson methods are two fundamental algorithms for finding roots iteratively.

## Why it matters
Root-finding is the backbone of solving most non-linear equations in science and engineering. In aerospace, you use it to solve trajectory optimization problems, like finding the precise launch angle to hit a target. In machine learning, optimizing a model is often equivalent to finding the root of the loss function's derivative (i.e., where the gradient is zero).

## When to study it
Before tackling this, you must have a solid grasp of single-variable calculus and introductory Python. Specifically:
1.  **Calculus:** Understand the definition of a derivative as the slope of a tangent line. Be familiar with the Intermediate Value Theorem, which is the mathematical guarantee behind the bisection method. A basic grasp of Taylor series is needed to understand Newton's method's performance.
2.  **Python:** You must be comfortable writing functions, using `while` loops, and working with floating-point numbers.

If you are not confident with the Intermediate Value Theorem or the geometric meaning of a derivative, review them first. The algorithms will seem like magic otherwise.

## How to study it (step by step)
1.  **Derive Bisection from a Picture:** Draw a continuous function that crosses the x-axis. Pick two points, $a$ and $b$, on opposite sides of the root. The Intermediate Value Theorem guarantees a root exists between them. Write down the logic: find the midpoint, check the sign of the function there, and discard the half of the interval that *doesn't* contain the root.
2.  **Implement Bisection:** Write a Python function `bisection(f, a, b, tol=1e-9)` that takes a function `f`, an interval `[a, b]`, and a tolerance `tol`. Use a `while` loop that continues as long as the interval width `(b - a)` is greater than the tolerance. Test it on a simple function like $f(x) = x^2 - 5$.
3.  **Derive Newton-Raphson Geometrically:** Draw a curve and a point $x_n$ on the x-axis. Go up to the function at $(x_n, f(x_n))$. Draw the tangent line at that point. The point where this tangent line hits the x-axis is your next, better guess, $x_{n+1}$. Use the point-slope form of a line to derive the update formula.
4.  **Implement Newton-Raphson:** Write a Python function `newton(f, df, x0, tol=1e-9)` that takes a function `f`, its derivative `df`, an initial guess `x0`, and a tolerance. The core is a `while` loop that applies the update rule until the step size `abs(x_new - x_old)` is smaller than the tolerance.
5.  **Compare Convergence:** Use both of your implementations to find $\sqrt{5}$ by finding the root of $f(x) = x^2 - 5$. Print the guess at each iteration. Notice how many iterations each method takes to reach the same tolerance. This will give you a visceral feel for the speed difference.

## Key ideas, with intuition
1.  **Bisection: The Bracketing Guarantee.** The bisection method is built on the **Intermediate Value Theorem**. If you have a continuous function $f$ and an interval $[a, b]$ where $f(a)$ and $f(b)$ have opposite signs, a root *must* lie between them. The algorithm works by repeatedly halving this interval, or "bracket," while ensuring the root remains trapped inside. It is slow but incredibly reliable. The condition to check is $f(a) \cdot f(b) < 0$.

2.  **Newton-Raphson: Linear Approximation as a Guide.** Near any point $x_n$, a differentiable function looks a lot like its tangent line. The core idea of Newton's method is to pretend the function *is* its tangent line. Finding the root of a line is trivial. This gives a new guess, $x_{n+1}$, which is usually much closer to the true root. You then repeat the process. This is why it requires the derivative, $f'(x)$, which gives the slope of that tangent.

3.  **The Update Rule from First Principles.** The equation for the tangent line at $(x_n, f(x_n))$ is $y - f(x_n) = f'(x_n)(x - x_n)$. We want to find the root of this line, which is the point $(x_{n+1}, 0)$. Substitute these values in:
    $$0 - f(x_n) = f'(x_n)(x_{n+1} - x_n)$$
    Now, solve for $x_{n+1}$:
    $$-\frac{f(x_n)}{f'(x_n)} = x_{n+1} - x_n$$
    $$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$
    This isn't a magic formula; it's just the root of the line that best approximates the function at your current guess.

## Worked example
Let's find the positive root of $f(x) = x^3 - 7 = 0$, which is $\sqrt[3]{7}$. We will use the Newton-Raphson method.

1.  **Define the function and its derivative:**
    $f(x) = x^3 - 7$
    $f'(x) = 3x^2$

2.  **Choose an initial guess:** $7$ is between $1^3=1$ and $2^3=8$, so the root is between 1 and 2. Let's start with $x_0 = 2$.

3.  **Apply the Newton-Raphson update rule:** $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} = x_n - \frac{x_n^3 - 7}{3x_n^2}$.

4.  **Iteration 1:**
    $$x_1 = x_0 - \frac{x_0^3 - 7}{3x_0^2} = 2 - \frac{2^3 - 7}{3(2^2)} = 2 - \frac{8 - 7}{12} = 2 - \frac{1}{12} \approx 1.916666...$$

5.  **Iteration 2:**
    $$x_2 = x_1 - \frac{x_1^3 - 7}{3x_1^2} \approx 1.916666 - \frac{(1.916666)^3 - 7}{3(1.916666)^2} \approx 1.916666 - \frac{7.04178 - 7}{11.0208} \approx 1.912938...$$

6.  **Iteration 3:**
    $$x_3 = x_2 - \frac{x_2^3 - 7}{3x_2^2} \approx 1.912938 - \frac{(1.912938)^3 - 7}{3(1.912938)^2} \approx 1.912938 - \frac{7.00006 - 7}{11.0065} \approx 1.912931...$$

**Reflection:**
- Step 1 defined our problem space.
- Step 2 made a reasonable starting guess. A bad guess could have sent us astray.
- Step 3 established the iterative procedure.
- Steps 4-6 executed the procedure. Notice how the number of correct decimal places roughly doubles with each step (from 1.9... to 1.9129...). This is the signature of the method's *quadratic convergence* and is why it's so powerful.

## Diagrams
**Bisection Method:** The algorithm traps the root in a shrinking interval `[a, b]`.

```text
      y
      | f(x)
      |     /
 -----+----/--b----- x
      |   / |
      a--/- m
      | /
      |/
```
At each step, we compute the midpoint $m = (a+b)/2$. Since $f(a)$ and $f(m)$ have opposite signs, the new interval becomes $[a, m]$. We discard $[m, b]$.

**Newton-Raphson Method:** The algorithm follows the tangent line to find the next guess.

```text
         y
         | f(x)
         |     . (x_n, f(x_n))
         |    /|
         |   / | Tangent line
         |  /  |
---------|-/---+---- x
         |/    x_n
        x_{n+1}
```
The next guess, $x_{n+1}$, is the x-intercept of the tangent line drawn at the current point $(x_n, f(x_n))$.

## Memory technique — remember this forever
1.  **The Story:**
    *   **Bisection is a "Binary Search Detective":** You've cornered the suspect (the root) in a building with rooms in a line (the interval). You ask: "Is the suspect in the first half of the rooms?" Based on the answer (the sign of $f(m)$), you close off half the building and repeat. It's slow, methodical, and guaranteed.
    *   **Newton-Raphson is a "Calculus Daredevil":** You're on a mountain in thick fog, trying to ski to the lowest point in the valley (the root). You can only feel the steepness under your skis (the derivative). You point your skis in the steepest downhill direction and go, assuming the slope is constant. You cover ground incredibly fast, but if you start near a flat spot ($f'(x) \approx 0$) or a weird ridge, you might fly off into nowhere.

2.  **Overlearn these formulas:**
    *   Bisection Logic: `m = (a+b)/2`. If `sign(f(a)) != sign(f(m))`, then `b = m`, else `a = m`.
    *   Newton-Raphson Update: $$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

3.  **Spaced Repetition Schedule:** Review your code and the derivations at **1 day, 3 days, 7 days, 16 days, 35 days**. Do not skip this. Re-implement one of them from scratch at each review.

4.  **First Principles Pathway:** If you forget the Newton-Raphson formula, re-derive it.
    *   Start with the point-slope equation for a line: $y - y_1 = m(x - x_1)$.
    *   Your point is $(x_n, f(x_n))$ and your slope is $m = f'(x_n)$.
    *   Your line is $y - f(x_n) = f'(x_n)(x - x_n)$.
    *   You want the root of this line, so find $x$ when $y=0$. Call it $x_{n+1}$.
    *   Solve $0 - f(x_n) = f'(x_n)(x_{n+1} - x_n)$ for $x_{n+1}$. The formula will reappear.

## Common mistakes
1.  **Bad Brackets (Bisection):** Initializing the bisection method with an interval $[a, b]$ where $f(a)$ and $f(b)$ have the same sign. The algorithm requires $f(a) \cdot f(b) < 0$. Always check this precondition.
2.  **Horizontal Tangents (Newton):** The method fails spectacularly if $f'(x_n) = 0$ for any $x_n$ in the sequence. Your code will raise a `ZeroDivisionError`. This happens at local minima/maxima.
3.  **Poor Initial Guess (Newton):** Starting Newton's method too far from the actual root can cause it to diverge (the guesses get worse and worse) or converge to a different root than the one you intended.
4.  **Unsafe Stopping Condition:** Never use `f(x) == 0.0` as your stopping condition due to floating-point inaccuracies. Instead, check if the interval width or step size is below a tolerance: `abs(b-a) < tol` or `abs(x_new - x_old) < tol`.

## Self-check
1.  Find the root of $f(x) = e^x - 5$ using the bisection method on the interval $[1, 2]$. What are the first three intervals the algorithm considers?
2.  The equation for a planet's orbit might involve solving Kepler's equation: $M = E - e \sin(E)$, where $M$ is the mean anomaly, $e$ is the eccentricity, and $E$ is the eccentric anomaly. For $M=0.8$ and $e=0.1$, the equation is $0.8 = E - 0.1 \sin(E)$. Rewrite this as a root-finding problem $f(E)=0$ and find the first two Newton-Raphson iterations starting from $E_0 = 0.8$.
3.  Consider the function $f(x) = \arctan(x)$. You want to find the root at $x=0$. What happens if you start Newton's method with an initial guess $x_0 = 1.5$? Why does it fail? (Hint: compute $x_1$ and $x_2$ and observe their behavior).