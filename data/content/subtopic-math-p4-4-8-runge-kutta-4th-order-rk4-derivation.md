## What it is
The fourth-order Runge-Kutta method (RK4) is a numerical technique for approximating the solution of ordinary differential equations (ODEs). It improves upon simpler methods like Euler's method by taking a weighted average of four slope estimates within each step, yielding a much more accurate result for the same step size. Its high accuracy and relative simplicity make it a workhorse method in computational science.

## Why it matters
RK4 is the default "go-to" algorithm for solving many ODEs in practice, from orbital mechanics in aerospace engineering to simulating physical systems in game engines. In machine learning, modern ODE-based models like Neural ODEs often use adaptive Runge-Kutta methods for backpropagation through the solver. Understanding its derivation reveals the principle of matching Taylor series expansions, a core concept in the design of high-order numerical schemes for a vast range of problems.

## When to study it
Before tackling this, you must be proficient with single-variable calculus, particularly Taylor series expansions. You should also have a solid grasp of what an ordinary differential equation is and have already studied and implemented the forward Euler method. Familiarity with the multivariable Taylor series for a function $f(t, y)$ is highly beneficial, as it is the foundation of the formal derivation.

## How to study it (step by step)
1.  **Review Taylor's Theorem:** Write down the Taylor expansion for a single-variable function $y(t+h)$ around $t$. Now, write the Taylor expansion for a two-variable function $f(t+h, y+k)$ around $(t,y)$. This is the key mathematical tool.
2.  **State the Goal:** The goal is to find a numerical update rule $y_{n+1} = y_n + h \cdot \Phi(t_n, y_n, h)$ that approximates the true solution $y(t_{n+1})$. We want the local truncation error of this rule to be $O(h^5)$, making the method fourth-order accurate.
3.  **Expand the True Solution:** Write out the Taylor series for the true solution $y(t_{n+1}) = y(t_n+h)$ around $t_n$. Express all higher derivatives of $y$ ($y'', y'''$, etc.) in terms of the function $f(t,y)$ and its partial derivatives using the chain rule, since $y' = f(t,y)$. Do this up to the $h^4$ term.
4.  **Expand the RK4 Formula:** Write down the general form of the RK4 update: $y_{n+1} = y_n + h(w_1 k_1 + w_2 k_2 + w_3 k_3 + w_4 k_4)$, where each $k_i$ is a slope estimate. Substitute the definitions of the $k_i$ values and expand the entire expression as a power series in $h$.
5.  **Match Coefficients:** Place the two expansions (from step 3 and step 4) side-by-side. Systematically match the coefficients of the powers of $h$ ($h^0, h^1, h^2, h^3, h^4$). This will produce a system of algebraic equations for the unknown weights ($w_i$) and parameters in the $k_i$ definitions.
6.  **Solve the System:** Solve the system of equations. You will find there is a family of solutions. The standard RK4 method is one specific, elegant choice from this family.

## Key ideas, with intuition
1.  **A Weighted Average of Slopes:** Euler's method takes one slope at the beginning of an interval and assumes it's constant across the whole step. This is naive. RK4 computes four "smarter" slopes and combines them. The intuition is that a weighted average of slopes sampled at different points within the interval will give a much better estimate of the *average* slope across that interval.

2.  **Predictor-Corrector Structure:** The calculation of the four slopes ($k_1, k_2, k_3, k_4$) has a nested, bootstrapping structure.
    *   $k_1$: Slope at the start. (This is the Euler slope).
    *   $k_2$: Use $k_1$ to "predict" the value of $y$ at the midpoint of the interval. Then calculate the slope $k_2$ at that midpoint.
    *   $k_3$: Use the *corrected* midpoint slope $k_2$ to make a better prediction for $y$ at the midpoint. Calculate the slope $k_3$ there.
    *   $k_4$: Use the second midpoint slope $k_3$ to predict the value of $y$ at the *end* of the interval. Calculate the slope $k_4$ there.
    The final answer is a weighted sum of these four slopes.

3.  **Matching Taylor Series is the Goal:** The entire derivation is an exercise in "making the math look right." We have the Taylor series for the true solution, which is our gold standard. Our goal is to invent a formula (the RK4 update rule) whose own Taylor series expansion matches the true one as far as possible. For RK4, we force the terms for $h^0, h^1, h^2, h^3,$ and $h^4$ to be identical, which guarantees the error is of order $h^5$ for a single step.

Let the ODE be $y' = f(t,y)$. The Taylor expansion for the true solution $y(t+h)$ is:
$$
y(t+h) = y(t) + h y'(t) + \frac{h^2}{2} y''(t) + \frac{h^3}{6} y'''(t) + \frac{h^4}{24} y^{(4)}(t) + O(h^5)
$$
We must re-write $y'', y'''$, etc. in terms of $f$ and its partial derivatives. For example, $y'' = \frac{d}{dt}f(t,y) = f_t + f_y y' = f_t + f_y f$. This gets algebraically intensive fast.

The RK4 formula is:
$$
y_{n+1} = y_n + \frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)
$$
The derivation involves expanding the $k_i$ values in a multivariable Taylor series and substituting them into this formula. When you expand it all out as a power series in $h$, you find that the coefficients on $h, h^2, h^3, h^4$ match the true Taylor series perfectly. The weights $\frac{1}{6}, \frac{2}{6}, \frac{2}{6}, \frac{1}{6}$ are the specific values that make this matching work. This is highly reminiscent of Simpson's rule for numerical integration, $\int_a^b g(x) dx \approx \frac{b-a}{6}[g(a) + 4g(\frac{a+b}{2}) + g(b)]$, and this is not a coincidence.

## Worked example
Let's approximate the solution to the ODE $y' = y$ with initial condition $y(0) = 1$. We will take one step of size $h=0.1$. The exact solution is $y(t)=e^t$, so we know the true value at $t=0.1$ is $y(0.1) = e^{0.1} \approx 1.1051709$.

Here, $f(t,y) = y$, $t_0=0$, $y_0=1$, and $h=0.1$.

**Step 1: Calculate $k_1$**
This is the slope at the starting point $(t_0, y_0)$.
$$
k_1 = f(t_0, y_0) = f(0, 1) = 1
$$

**Step 2: Calculate $k_2$**
This is the slope at the midpoint in time, using $k_1$ to estimate the $y$ value.
$$
k_2 = f(t_0 + \frac{h}{2}, y_0 + \frac{h}{2}k_1) = f(0 + 0.05, 1 + 0.05 \cdot 1) = f(0.05, 1.05) = 1.05
$$

**Step 3: Calculate $k_3$**
This is another slope at the midpoint in time, but now using the better slope estimate $k_2$ to find the $y$ value.
$$
k_3 = f(t_0 + \frac{h}{2}, y_0 + \frac{h}{2}k_2) = f(0 + 0.05, 1 + 0.05 \cdot 1.05) = f(0.05, 1.0525) = 1.0525
$$

**Step 4: Calculate $k_4$**
This is the slope at the end of the interval, using $k_3$ to estimate the final $y$ value.
$$
k_4 = f(t_0 + h, y_0 + h k_3) = f(0 + 0.1, 1 + 0.1 \cdot 1.0525) = f(0.1, 1.10525) = 1.10525
$$

**Step 5: Combine them to find $y_1$**
Now we take the weighted average.
$$
y_1 = y_0 + \frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)
$$
$$
y_1 = 1 + \frac{0.1}{6}(1 + 2(1.05) + 2(1.0525) + 1.10525)
$$
$$
y_1 = 1 + \frac{0.1}{6}(1 + 2.1 + 2.105 + 1.10525) = 1 + \frac{0.1}{6}(6.31025)
$$
$$
y_1 \approx 1 + 0.105170833... \approx 1.105170833
$$

**Reflection:**
The true value is $1.105170918...$. Our RK4 estimate is accurate to seven decimal places with just a single step of size $h=0.1$. An Euler step would have given $y_1 = y_0 + h f(t_0, y_0) = 1 + 0.1(1) = 1.1$, which is only accurate to one decimal place. Each step in the RK4 calculation builds on the last, providing a successively refined estimate of the trajectory within the step, leading to this high accuracy.

## Diagrams
This diagram shows the four slopes used in a single RK4 step. The solid curve is the (unknown) true solution. We start at $(t_n, y_n)$.

```text
 y^
  |
  |                                 .------> k4 (slope at end point estimate)
  |                              .
  |                           .
  |                 .--------> k3 (slope at better midpoint estimate)
  |              .
  |            .-----------> k2 (slope at first midpoint estimate)
  |         .
  |      /
  |     /
  |    /------> k1 (slope at start)
  |   .
  +---.-------------------------------------> t
  |   t_n        t_n + h/2         t_n + h
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you're trying to cross a river with a current ($f(t,y)$).
    *   **$k_1$**: You first measure the current where you stand.
    *   **$k_2$**: You aim for the halfway point across, correcting for the current you just measured. You get there and measure the current again.
    *   **$k_3$**: You realize your estimate was a bit off. From your starting point, you re-aim for the halfway point, but this time using the *midpoint current* ($k_2$) you just found. You measure the current there again. It's a better estimate.
    *   **$k_4$**: From your starting point, you now aim for the *far bank*, using the best midpoint current you have ($k_3$) to guide your entire path. You measure the current when you get there.
    *   **Final Step**: Your total path is a clever average of these attempts: mostly guided by your two good midpoint estimates ($2k_2, 2k_3$), and a little bit by your initial and final estimates ($k_1, k_4$).

2.  **Formulas to Overlearn:**
    $$
    y_{n+1} = y_n + \frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)
    $$
    Where:
    $$
    k_1 = f(t_n, y_n)
    $$
    $$
    k_2 = f(t_n + \frac{h}{2}, y_n + \frac{h}{2}k_1)
    $$
    $$
    k_3 = f(t_n + \frac{h}{2}, y_n + \frac{h}{2}k_2)
    $$
    $$
    k_4 = f(t_n + h, y_n + h k_3)
    $$

3.  **Spaced Repetition Schedule:** Review and re-derive the logic for these formulas from scratch at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget the formulas, remember the core principle: "Find the coefficients for a weighted average of four slopes that make its Taylor series match the true solution's Taylor series up to the $h^4$ term." You don't need to perform the full derivation, but remembering this *goal* is enough to reconstruct the logic and look up the specific coefficients with confidence.

## Common mistakes
1.  **Chaining dependencies incorrectly:** A very common mistake is to use the wrong $k$ value in the next step. For example, calculating $k_3$ using $y_n + \frac{h}{2}k_1$ instead of the correct $y_n + \frac{h}{2}k_2$. Always use the *most recently computed* appropriate slope.
2.  **Incorrect step size in arguments:** Using $h$ where you should use $h/2$. Remember $k_2$ and $k_3$ are midpoint evaluations, so they use $h/2$. $k_4$ is an endpoint evaluation, so it uses $h$.
3.  **Forgetting the weights:** Forgetting to apply the $\frac{1}{6}(1, 2, 2, 1)$ weights in the final sum, or forgetting the $h$ factor. The final update is an *average slope* multiplied by the step width $h$.
4.  **Treating $k$ as a value, not a slope:** Remember that each $k_i$ is a *slope* ($dy/dt$). The term you add to $y_n$ is always of the form $h \times (\text{slope})$, which has units of $y$.

## Self-check
1.  Consider the ODE $y' = -2ty^2$ with $y(0)=1$. Using a step size of $h=0.2$, calculate the values of $k_1, k_2, k_3, k_4$ and the final approximation $y_1$.
2.  In the RK4 formula, the weights for the two midpoint slopes ($k_2, k_3$) are double the weights for the endpoint slopes ($k_1, k_4$). In one sentence, explain the intuition behind this weighting.
3.  What would be the consequence for the method's order of accuracy if we defined $k_4 = f(t_n + h, y_n + h k_2)$ instead of using $k_3$? Justify your reasoning based on the derivation principle.