## What it is
Heun's method, also known as the Modified Euler method, is a numerical procedure for solving ordinary differential equations (ODEs). It improves upon the basic Euler method by using a "predictor-corrector" approach: it first predicts the next point using a simple tangent step, then uses that prediction to get a better estimate of the slope over the interval, and finally takes a corrected step using the average of the initial and predicted slopes.

## Why it matters
This method is a foundational example of a second-order Runge-Kutta method, a family of algorithms that forms the bedrock of modern numerical ODE solvers. In aerospace, these solvers are critical for trajectory optimization and simulating vehicle dynamics. In physics, they are used to model everything from planetary orbits to the behavior of complex circuits, and in machine learning, they are conceptually related to solving neural ODEs.

## When to study it
Before tackling this, you must have a firm grasp of the following:
1.  **First-Order Initial Value Problems (IVPs):** The structure $y' = f(x, y)$ with an initial condition $y(x_0) = y_0$.
2.  **The Euler Method:** The formula $y_{i+1} = y_i + h f(x_i, y_i)$ and its geometric interpretation as stepping along a tangent line. You should understand why its accuracy is limited.
3.  **Taylor Series Expansion:** Specifically, how to expand a function $y(x+h)$ around $x$. This is essential for understanding the error analysis of numerical methods.
4.  **The Trapezoidal Rule for Integration:** Understanding that $\int_a^b g(x) dx \approx \frac{b-a}{2} [g(a) + g(b)]$ is one way to derive this method.

If any of these are weak, review them first. Proceeding without them will lead to memorization without understanding.

## How to study it (step by step)
1.  **Revisit Euler's Failure:** Take the IVP $y' = y, y(0)=1$ with a large step size $h=1$. Calculate one step with Euler's method. Compare the result, $y(1) \approx 2$, to the true solution $y(x) = e^x$, where $y(1) = e \approx 2.718$. Visually sketch how the tangent line at $x=0$ undershoots the convex curve.
2.  **Derive from Averaging Slopes:** Start with the goal: find a better slope to use over the interval $[x_i, x_{i+1}]$. The slope at the start is $k_1 = f(x_i, y_i)$. Use this slope to make a temporary "prediction" for $y_{i+1}$, let's call it $\tilde{y}_{i+1} = y_i + h k_1$. Now, calculate the slope at this predicted endpoint: $k_2 = f(x_{i+1}, \tilde{y}_{i+1})$. The logical next step is to average them: $k_{avg} = \frac{k_1 + k_2}{2}$. The final, corrected step is $y_{i+1} = y_i + h \cdot k_{avg}$. Write out the full formula.
3.  **Derive from the Trapezoidal Rule:** Start with the fundamental theorem of calculus: $y(x_{i+1}) - y(x_i) = \int_{x_i}^{x_{i+1}} y'(x) dx = \int_{x_i}^{x_{i+1}} f(x, y(x)) dx$. Apply the trapezoidal rule to the integral: $\int_{x_i}^{x_{i+1}} f(x, y(x)) dx \approx \frac{h}{2} [f(x_i, y_i) + f(x_{i+1}, y_{i+1})]$. Notice the problem: the term $f(x_{i+1}, y_{i+1})$ depends on $y_{i+1}$, which is what we are trying to find. Resolve this by substituting a simple Euler approximation for the $y_{i+1}$ *inside* the function: $y_{i+1} \approx y_i + h f(x_i, y_i)$. This substitution yields Heun's method directly.
4.  **Rework the Example:** Apply Heun's method to the IVP from step 1: $y' = y, y(0)=1, h=1$. Calculate the predictor, the second slope, the average slope, and the final corrected value for $y(1)$. The result is $y(1) \approx 2.5$. Note how much closer this is to the true value of $e \approx 2.718$ than the simple Euler result of $2$.
5.  **Error Analysis:** Compare the Taylor expansion of $y(x+h)$ with the formula for Heun's method. Show that the terms match up to $O(h^2)$, making the local truncation error $O(h^3)$ and the global error $O(h^2)$. This is one order of magnitude better than the Euler method.

## Key ideas, with intuition
1.  **The Problem with Tangents:** The Euler method assumes the slope is constant over an entire step. For any curve that is not a straight line, this is incorrect. Heun's method acknowledges that the slope *changes* over the interval.
2.  **Predictor-Corrector:** This is a powerful numerical pattern. We make a simple, low-accuracy guess (the **predictor**) to get a rough idea of where we are going. Then, we use information from that predicted location to improve our initial calculation and take a more accurate step (the **corrector**).
    $$ \text{Predictor: } \quad \tilde{y}_{i+1} = y_i + h f(x_i, y_i) $$
    This is just a standard Euler step to find a temporary point.
3.  **Averaging Slopes is Better:** The core insight is that the average of the slope at the beginning of an interval and an *estimate* of the slope at the end of the interval is a much better representative slope for the whole interval.
    $$ \text{Corrector: } \quad y_{i+1} = y_i + \frac{h}{2} \underbrace{[f(x_i, y_i)}_{\text{slope at start}} + \underbrace{f(x_{i+1}, \tilde{y}_{i+1})]}_{\text{slope at predicted end}} $$
    This structure is identical to the Trapezoidal Rule, which is known to be more accurate than the rectangular approximation that underlies the Euler method.

## Worked example
Solve the Initial Value Problem $y' = x + y$, with $y(0)=1$, to find $y(0.1)$ using a single step of Heun's method.

**1. Identify parameters and functions:**
-   The function is $f(x, y) = x + y$.
-   The initial point is $(x_0, y_0) = (0, 1)$.
-   The step size is $h = 0.1$.
-   Our goal is to find $y_1 \approx y(0.1)$.

**2. Predictor Step:**
First, calculate the slope at the starting point.
$$ k_1 = f(x_0, y_0) = f(0, 1) = 0 + 1 = 1 $$
Now, use this slope to make a preliminary prediction, $\tilde{y}_1$. This is a simple Euler step.
$$ \tilde{y}_1 = y_0 + h \cdot k_1 = 1 + 0.1 \cdot (1) = 1.1 $$

**3. Corrector Step:**
Next, calculate the slope at the *predicted* endpoint $(x_1, \tilde{y}_1) = (0.1, 1.1)$.
$$ k_2 = f(x_1, \tilde{y}_1) = f(0.1, 1.1) = 0.1 + 1.1 = 1.2 $$
Now, average the two slopes.
$$ k_{avg} = \frac{k_1 + k_2}{2} = \frac{1 + 1.2}{2} = 1.1 $$
Finally, use this average slope to take the corrected, final step from the original point $(x_0, y_0)$.
$$ y_1 = y_0 + h \cdot k_{avg} = 1 + 0.1 \cdot (1.1) = 1 + 0.11 = 1.11 $$

**4. Final Answer:**
The approximation is $y(0.1) \approx 1.11$.

**Reflection:** The initial slope was 1. The predicted slope at the end of the interval was 1.2. Heun's method effectively used an average slope of 1.1 for the entire step, which accounts for the fact that the solution curve is accelerating (its slope is increasing). The exact solution to this ODE is $y(x) = 2e^x - x - 1$, so $y(0.1) = 2e^{0.1} - 0.1 - 1 \approx 1.11034$. Our approximation is already very accurate.

## Diagrams
This diagram illustrates one step of Heun's method. The path from $A$ to $C$ is the final result.

```text
       y^
        |
        |
        |               /-- True solution curve
        |              C (x_i+1, y_i+1)
        |             /
        |         B~ (x_i+1, y~_i+1) <-- Predictor point
        |        /.
        |       / .<-- Slope k2 = f(x_i+1, y~_i+1)
        |      /  .
        |     /   .
        |    /....  <-- Final step uses avg slope (k1+k2)/2
        |   A (x_i, y_i)
        |  /
        | / <--- Initial slope k1 = f(x_i, y_i)
        |/
        +-----------------------------------> x
```

## Memory technique — remember this forever
1.  **The Mnemonic: "Predict, Re-evaluate, Average, Step" (PRAS)**
    -   **P**redict: Take a simple Euler step to a temporary point $\tilde{y}_{i+1}$.
    -   **R**e-evaluate: Calculate the slope $k_2$ at this new temporary point.
    -   **A**verage: Average the old slope $k_1$ and the new slope $k_2$.
    -   **S**tep: Take the final step from your original point using the averaged slope.

2.  **Formulas to Overlearn:**
    $$ \text{Predictor:} \quad \tilde{y}_{i+1} = y_i + h f(x_i, y_i) $$
    $$ \text{Corrector:} \quad y_{i+1} = y_i + \frac{h}{2} [f(x_i, y_i) + f(x_{i+1}, \tilde{y}_{i+1})] $$

3.  **Spaced Repetition Schedule:** Review this material and re-work the example at intervals of **1 day, 3 days, 7 days, 16 days, 35 days**.

4.  **First Principles Pathway:** If you forget the formula, re-derive it from the Trapezoidal Rule.
    -   Start with $y_{i+1} = y_i + \int_{x_i}^{x_{i+1}} f(x, y) dx$.
    -   Approximate the integral: $\approx y_i + \frac{h}{2}[f(x_i, y_i) + f(x_{i+1}, y_{i+1})]$.
    -   You don't know $y_{i+1}$ on the right side. Replace it with its simplest possible approximation: the Euler step, $y_{i+1} \approx y_i + hf(x_i, y_i)$. This substitution gives you Heun's method.

## Common mistakes
1.  **Using the wrong point for the second slope:** Calculating $f(x_i, \tilde{y}_{i+1})$ instead of the correct $f(x_{i+1}, \tilde{y}_{i+1})$. Remember, the second slope is at the *end* of the interval, so its x-value must be $x_{i+1}$.
2.  **Forgetting to average:** Calculating $y_{i+1} = y_i + h \cdot (k_1 + k_2)$ instead of $y_i + h \cdot \frac{k_1+k_2}{2}$. This is a very common slip-up.
3.  **"Double-stepping":** Calculating the final step from the predicted point $(\tilde{y}_{i+1})$ instead of from the original starting point $(y_i)$. The predictor point is temporary; it exists only to give you a slope estimate. The final step always launches from your known starting point, $(x_i, y_i)$.

## Self-check
1.  Use Heun's method to solve $y' = -2y$, with $y(0)=4$ and $h=0.2$. Find the value of $y(0.2)$. The exact solution is $y(x) = 4e^{-2x}$. Compare your result to the true value.
2.  Perform two steps of Heun's method for the IVP $y' = \sin(x) + \cos(y)$, with $y(0)=0$ and $h=0.5$, to find an approximation for $y(1)$.
3.  The global error for Heun's method is $O(h^2)$. If you solve an IVP from $x=0$ to $x=1$ with step size $h=0.1$ and get an error of $0.004$, what would you predict the error to be if you repeated the entire process with a step size of $h=0.05$? Explain your reasoning.