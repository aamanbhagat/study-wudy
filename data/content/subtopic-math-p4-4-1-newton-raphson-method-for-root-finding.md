## What it is
The Newton-Raphson method is an iterative algorithm for finding successively better approximations to the roots of a real-valued function. Starting with an initial guess, each new approximation is found at the x-intercept of the tangent line to the function at the current guess. It is a powerful and typically very fast way to solve equations numerically.

## Why it matters
This method is the foundation for many powerful optimization algorithms used in machine learning and engineering. For instance, when training a neural network, you are often trying to find the minimum of a loss function; this is equivalent to finding a root of the derivative of that loss function. In aerospace, it's used to solve complex, non-linear equations governing trajectories, fluid dynamics, and structural analysis where closed-form solutions are impossible to find.

## When to study it
Before tackling this, you must have a firm grasp of the following:
1.  **Functions and Roots:** You must understand that a root of a function $f(x)$ is a value $x$ such that $f(x) = 0$.
2.  **Derivatives:** You must be able to compute the derivative, $f'(x)$, of common functions.
3.  **Geometric Interpretation of the Derivative:** You must understand that $f'(a)$ is the slope of the tangent line to the curve $y=f(x)$ at the point $(a, f(a))$.
4.  **Equation of a Line:** You must know the point-slope form of a line, $y - y_1 = m(x - x_1)$.

If any of these are weak, review them first. The method is a direct application of these concepts.

## How to study it (step by step)
1.  **Derive the Formula:** Start with the equation of the tangent line to the function $f(x)$ at an initial guess, $x_0$. The point is $(x_0, f(x_0))$ and the slope is $m = f'(x_0)$. The line's equation is $y - f(x_0) = f'(x_0)(x - x_0)$. Now, find the root of *this line* by setting $y=0$ and solving for $x$. This $x$-value will be your next, better guess, $x_1$. The result is the Newton-Raphson formula.
2.  **Formalize the Algorithm:** Write the result from step 1 as a general iterative rule: $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$. List the steps: (1) Choose an initial guess $x_0$. (2) Apply the formula to find $x_1$. (3) Apply it again to find $x_2$ from $x_1$, and so on. (4) Stop when the change $|x_{n+1} - x_n|$ is smaller than some desired tolerance.
3.  **Work a "Toy" Problem:** Use the method to approximate $\sqrt{3}$. This is equivalent to finding the positive root of $f(x) = x^2 - 3$. Start with an easy guess, like $x_0 = 2$. Compute $x_1$ and $x_2$ and see how quickly your answer approaches the true value (~1.732).
4.  **Visualize It:** Draw a simple curve like $y = x^2 - 3$. Mark your initial guess $x_0=2$ on the x-axis. Go up to the curve, draw the tangent line, and follow it down to the x-axis. That intersection is $x_1$. Repeat the process from $x_1$. This graphical exercise is crucial for building intuition.
5.  **Explore Failure Modes:** Consider the function $f(x) = x^3 - x + 1$ with an initial guess of $x_0 = 0$. What is $f'(0)$? What happens to the formula? Now sketch the function and see graphically why the method fails at that point.

## Key ideas, with intuition
1.  **Linear Approximation is King:** The core idea is that any smooth curve, when you zoom in enough, looks like a straight line (its tangent line). The Newton-Raphson method exploits this by replacing the difficult problem "find the root of this complicated function" with a sequence of easy problems: "find the root of this simple straight line."

2.  **The Tangent Points the Way:** The tangent line at a point $(x_n, f(x_n))$ is the best linear approximation of the function near that point. By finding where this line crosses the x-axis, we are making an educated guess for where the function *itself* will cross the x-axis.

3.  **The Update Formula is a "Correction":**
    $$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$
    Think of this as: `New Guess = Old Guess - Correction Term`.
    *   The numerator $f(x_n)$ is how far you are from the goal (the x-axis) in the vertical direction. If it's large, you need a bigger correction.
    *   The denominator $f'(x_n)$ is the slope. If the slope is steep (large $|f'(x_n)|$), a small step in $x$ will get you to the axis, so the correction is small. If the slope is shallow (small $|f'(x_n)|$), you need to take a huge step in $x$ to get to the axis, so the correction is large.

## Worked example
Let's find a root for $f(x) = \cos(x) - x$. A quick sketch shows a root exists somewhere between $0$ and $1$. Let's choose an initial guess $x_0 = 0.5$.

**Step 1: Find the derivative.**
$f'(x) = -\sin(x) - 1$.

**Step 2: Set up the iterative formula.**
$x_{n+1} = x_n - \frac{\cos(x_n) - x_n}{-\sin(x_n) - 1}$

**Step 3: Perform iterations (using radians for trigonometric functions).**

*   **Iteration 0 (Initial Guess):**
    $x_0 = 0.5$

*   **Iteration 1:**
    $f(x_0) = \cos(0.5) - 0.5 \approx 0.87758 - 0.5 = 0.37758$
    $f'(x_0) = -\sin(0.5) - 1 \approx -0.47943 - 1 = -1.47943$
    $x_1 = 0.5 - \frac{0.37758}{-1.47943} \approx 0.5 - (-0.25522) = 0.75522$

*   **Iteration 2:**
    $f(x_1) = \cos(0.75522) - 0.75522 \approx 0.72790 - 0.75522 = -0.02732$
    $f'(x_1) = -\sin(0.75522) - 1 \approx -0.68552 - 1 = -1.68552$
    $x_2 = 0.75522 - \frac{-0.02732}{-1.68552} \approx 0.75522 - 0.01621 = 0.73901$

*   **Iteration 3:**
    $f(x_2) = \cos(0.73901) - 0.73901 \approx 0.73914 - 0.73901 = 0.00013$
    $f'(x_2) = -\sin(0.73901) - 1 \approx -0.67423 - 1 = -1.67423$
    $x_3 = 0.73901 - \frac{0.00013}{-1.67423} \approx 0.73901 - (-0.000077) \approx 0.739087$

**Reflection:**
Each step refined the guess. The first step used the tangent at $x=0.5$ to jump much closer to the root. The second step, starting from a much better position, made a smaller, more precise correction. Notice how the value of $f(x_n)$ gets closer to zero with each step, confirming we are approaching a root. The number of correct decimal places roughly doubles with each iteration, a property known as quadratic convergence.

## Diagrams
Here is a graphical representation of one iteration. The curve is $y=f(x)$. We start at $x_n$, find the tangent line, and its x-intercept becomes our next guess, $x_{n+1}$.

```text
      y
      |
f(x_n)+      . . . . . . (x_n, f(x_n))
      |                 /
      |                / <- Tangent line
      |               /
      |              /
------+-------------/------------------+-------> x
      |            /|                  |
      |           / x_{n+1}            x_n
      |          /
      |         /
      |        /
      |      Root (where curve crosses)
```

## Memory technique — remember this forever
1.  **The Mnemonic:** "Newton's Tangent Slide". Imagine you are standing on the curve $y=f(x)$ at your current guess $x_n$. Your goal is to get to the x-axis (the "ground"). You can't see the whole curve, but you can feel the slope under your feet. So, you slide down the tangent line until you hit the ground. That's your new, better position, $x_{n+1}$. Repeat.

2.  **The Must-Know Formula:** Overlearn this until it is automatic.
    $$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

3.  **Spaced Repetition Schedule:**
    *   Review this entire mini-lesson in **1 day**.
    *   Derive the formula from first principles and work one example in **3 days**.
    *   Verbally explain the "Tangent Slide" and write the formula from memory in **7 days**.
    *   Work a new problem from scratch in **16 days**.
    *   Explain a failure mode (e.g., horizontal tangent) in **35 days**.

4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    *   Start with the point-slope equation for the tangent line at $(x_n, f(x_n))$:
        $y - f(x_n) = f'(x_n) (x - x_n)$
    *   The next guess, $x_{n+1}$, is the x-intercept of this line. Find it by setting $y=0$ and $x=x_{n+1}$:
        $0 - f(x_n) = f'(x_n) (x_{n+1} - x_n)$
    *   Now, just solve for $x_{n+1}$:
        $-\frac{f(x_n)}{f'(x_n)} = x_{n+1} - x_n$
        $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$

## Common mistakes
*   **Using $f(x)$ instead of $f'(x)$ in the denominator.** The denominator is the *slope* of the tangent, which is the derivative.
*   **Choosing a poor initial guess.** If you start near a local maximum or minimum, $f'(x_n) \approx 0$, the tangent will be nearly horizontal and shoot your next guess off to infinity. The method can fail.
*   **Algebraic errors in the derivative.** A mistake in calculating $f'(x)$ will corrupt every subsequent step. Double-check your derivative before you start iterating.
*   **Using degrees instead of radians.** For any function involving trigonometry, your calculator and all calculations must be in radians.

## Self-check
1.  Use Newton's method to perform two iterations to approximate a root of $f(x) = x^3 - 7$, starting with the initial guess $x_0 = 2$.
2.  Your goal is to compute $1/R$ for some number $R$ without using division. Re-frame this as a root-finding problem for some function $f(x)$ and write down the Newton-Raphson iterative formula. (Hint: if $x=1/R$, what equation involving $x$ and $R$ can you write that equals zero?)
3.  Sketch a function that has multiple roots. Show how two different initial guesses, $x_A$ and $x_B$, can lead the Newton-Raphson method to converge to two different roots.