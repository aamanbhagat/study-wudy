## What it is
Euler's method is a numerical procedure for solving ordinary differential equations (ODEs) with a given initial value. It approximates the solution by taking small, sequential steps, using the tangent line at the beginning of each step to estimate the value at the end of the step. It is the simplest explicit method for numerical integration of ODEs.

## Why it matters
This method is the conceptual foundation for nearly all more sophisticated ODE solvers used in practice. You will encounter its direct application in simple physics simulations (e.g., calculating projectile motion with air resistance) and its descendants in complex trajectory optimization for spacecraft (n-body problem) and in modern machine learning models like Neural ODEs. Understanding its limitations, specifically its error accumulation, is critical for choosing the right tool for a problem.

## When to study it
Before tackling this, you must have a firm grasp of single-variable calculus, specifically the definition of a derivative and the concept of a Taylor series expansion. You should also understand what a first-order ODE of the form $y'(t) = f(t, y(t))$ represents: a function whose rate of change depends on its current value and/or the independent variable (often time). If you cannot derive a Taylor series or explain what an initial value problem is, review those topics first.

## How to study it (step by step)
1.  **Derive it from first principles.** Start with the Taylor series expansion for a function $y(t)$ around a point $t_n$. Write out the expansion for $y(t_n + h)$ and truncate it after the first-order term. Substitute $y'(t_n) = f(t_n, y_n)$ to arrive at the Euler's method formula.
2.  **Visualize the process.** Draw a coordinate plane. Sketch a smooth curve representing the true solution $y(t)$. Pick a starting point $(t_0, y_0)$ on the curve. Draw the tangent line at that point. Follow that tangent for a small step $h$ along the t-axis to find the next approximate point $(t_1, y_1)$. Repeat. Notice how your approximation drifts from the true curve.
3.  **Implement it.** Code the algorithm in a language of your choice. Solve a simple ODE like $y' = -y$ with $y(0)=1$ for $t \in [0, 2]$. Use a step size $h=0.5$.
4.  **Analyze the error.** For the problem in step 3, the exact solution is $y(t) = e^{-t}$. Calculate the absolute error $|y(t_n) - y_n|$ at each step. Now, repeat step 3 with $h=0.25$ and $h=0.1$. Observe how the error changes as $h$ decreases. Plot the results.
5.  **Distinguish local and global error.** For a single step, the error is proportional to $h^2$ (local truncation error). Over an entire interval of fixed length, the number of steps is proportional to $1/h$. Reason through why the total accumulated error (global error) is therefore proportional to $h$.

## Key ideas, with intuition
1.  **Linear Approximation is King.** The core assumption is that over a very small interval $[t_n, t_{n+1}]$, the solution curve $y(t)$ doesn't curve much. Therefore, we can approximate it with a straight line—the tangent line at $t_n$. The slope of this tangent is given by the ODE itself: $y'(t_n) = f(t_n, y_n)$.
2.  **The Formula is Just "Rise = Slope × Run".** The change in $y$ (the "rise") is approximated by the slope at the current point, $f(t_n, y_n)$, multiplied by the step size (the "run"), $h$. The next value is simply the current value plus this change.
    $$
    y_{n+1} = y_n + \Delta y \approx y_n + (\text{slope}) \times (\text{step}) = y_n + h \cdot f(t_n, y_n)
    $$
3.  **Error Comes from Neglected Curvature.** The method's error arises from the terms we ignored in the Taylor series expansion. The true value is:
    $$
    y(t_n+h) = y(t_n) + h y'(t_n) + \frac{h^2}{2!} y''(t_n) + \frac{h^3}{3!} y'''(t_n) + \dots
    $$
    Euler's method is just the first two terms. The *local truncation error* (the error made in a single step) is dominated by the first neglected term, which is proportional to $h^2$.
4.  **Errors Accumulate.** Each step starts from a slightly incorrect point calculated by the previous step. This means errors compound. If you halve the step size $h$, you double the number of steps needed to cross a given interval. The local error in each step is quartered ($h^2 \to (h/2)^2 = h^2/4$), but you take twice as many steps. The final *global error* is roughly halved: $(2N) \times (\text{Error}/4) = N \times \text{Error}/2$. This is why the global error is order $O(h)$, not $O(h^2)$.

## Worked example
**Problem:** Given the initial value problem $y' = t - y$ with $y(0) = 1$, approximate $y(0.4)$ using Euler's method with a step size $h=0.2$.

**Solution:**
1.  **Identify components.**
    -   The function is $f(t, y) = t - y$.
    -   The initial condition is $(t_0, y_0) = (0, 1)$.
    -   The step size is $h=0.2$.
    -   We need to find $y(0.4)$, which requires two steps: from $t=0$ to $t=0.2$, and from $t=0.2$ to $t=0.4$.

2.  **Step 1: Calculate $y_1 \approx y(0.2)$.**
    -   Start with the Euler formula: $y_{n+1} = y_n + h \cdot f(t_n, y_n)$.
    -   For $n=0$: $y_1 = y_0 + h \cdot f(t_0, y_0)$.
    -   Substitute known values: $t_0=0, y_0=1, h=0.2$.
    -   Calculate the slope at $(t_0, y_0)$: $f(0, 1) = 0 - 1 = -1$.
    -   Compute $y_1$: $y_1 = 1 + 0.2 \cdot (-1) = 1 - 0.2 = 0.8$.
    -   So, our approximation is $(t_1, y_1) = (0.2, 0.8)$.

3.  **Step 2: Calculate $y_2 \approx y(0.4)$.**
    -   Now we use the result from the previous step as our new starting point.
    -   For $n=1$: $y_2 = y_1 + h \cdot f(t_1, y_1)$.
    -   Substitute known values: $t_1=0.2, y_1=0.8, h=0.2$.
    -   Calculate the slope at $(t_1, y_1)$: $f(0.2, 0.8) = 0.2 - 0.8 = -0.6$.
    -   Compute $y_2$: $y_2 = 0.8 + 0.2 \cdot (-0.6) = 0.8 - 0.12 = 0.68$.
    -   Our final approximation is $(t_2, y_2) = (0.4, 0.68)$.

**Result:** The approximation is $y(0.4) \approx 0.68$.

**Reflection:** Each step used the output of the previous step as its input. Step 1 calculated the slope at the known starting point to project forward. Step 2 used the *approximated* point $(0.2, 0.8)$ to calculate a new slope and project forward again. This chain of linear approximations forms the solution.

## Diagrams
This diagram shows one step of Euler's method. The solid curve is the true solution $y(t)$. We start at $(t_n, y_n)$, calculate the slope $y'(t_n)$ (the tangent line), and follow it for a step $h$ to find the next approximate point $(t_{n+1}, y_{n+1})$. Note the local error, which is the vertical distance between the true solution and the approximation at $t_{n+1}$.

```text
      y^
       |
       |           /
       |          /       . y(t) [true solution]
       |         /     .
       |        /   .
 y(t_n+1)+ - - - - * [true value at t_n+1]
       |       /| .
 y_n+1   + - - - * [Euler approximation: (t_n+1, y_n+1)]
       |     /   |
       |    /    | Local Error
       |   /     |
   y_n   *-------+--
       |  /      |
       | /       |
       +-------------------> t
             t_n    t_n+1
                    <--->
                      h
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you are lost in a thick fog on a rolling hillside. You can only see the slope of the ground directly under your feet. To get to a destination a mile away, you check the slope, walk straight in that direction for 10 paces, then stop. You check the new slope under your feet and repeat the process. This is Euler's method: a series of short, straight-line walks based on the local slope, approximating a curved path.

2.  **Must-Memorize Formulas:**
    *   The update rule: $y_{n+1} = y_n + h f(t_n, y_n)$
    *   Global error order: Global Error $\propto h$

3.  **Spaced Repetition Schedule:** Review this material and re-derive the formula at these intervals:
    *   24 hours
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget the formula, re-derive it.
    *   Start with the Taylor expansion of $y(t)$ around $t_n$:
        $$y(t_n + h) = y(t_n) + h y'(t_n) + O(h^2)$$
    *   Recognize that $t_{n+1} = t_n + h$. Let $y_{n+1}$ be our approximation of $y(t_{n+1})$ and $y_n$ be our approximation of $y(t_n)$.
    *   The ODE gives us the derivative: $y'(t_n) = f(t_n, y(t_n))$.
    *   Substitute and truncate the series:
        $$y_{n+1} \approx y_n + h f(t_n, y_n)$$

## Common mistakes
1.  **Using the wrong slope.** A common error is to calculate the slope at the *end* of the interval, $f(t_{n+1}, y_n)$, or some average. For the basic Euler method, the slope is *always* calculated at the *beginning* of the step: $(t_n, y_n)$.
2.  **Confusing local and global error.** Students often see the local error is $O(h^2)$ and assume the method is more accurate than it is. Remember that the accumulation of these small errors over many steps degrades the accuracy, making the final global error only $O(h)$.
3.  **Applying it blindly.** Euler's method is unstable for certain types of ODEs ("stiff" equations). Applying it with too large a step size $h$ can lead to an approximation that diverges wildly to infinity, even when the true solution is stable and decays to zero. Always test with a smaller $h$ to see if the solution changes drastically.

## Self-check
1.  Given $y' = 2y$ and $y(0) = 3$, use Euler's method with $h=0.1$ to estimate $y(0.2)$.
2.  The ODE $y' = -\sin(t)$ with $y(0)=1$ has the exact solution $y(t) = \cos(t)$. Compute the Euler approximation for $y(\pi/2)$ using $h=\pi/4$. What is the absolute global error of your approximation? How would you expect the error to change if you used $h=\pi/8$?
3.  Consider the ODE $y' = -15y$ with $y(0)=1$. The true solution $y(t) = e^{-15t}$ decays rapidly to zero. Try to compute $y(1)$ using Euler's method with a step size of $h=0.2$. What happens to your numerical solution? Why might this be occurring?