## What it is
Adaptive step-size methods solve ordinary differential equations (ODEs) by dynamically adjusting the step size, $h$, at each iteration. Instead of using a fixed step, the algorithm takes small steps in regions where the solution changes rapidly and large steps where it changes slowly. The Runge-Kutta-Fehlberg method (RK45) is a classic implementation of this, which cleverly estimates the local error to decide whether the current step size is acceptable.

## Why it matters
This is the default, workhorse method for solving ODEs in scientific computing and engineering. In aerospace, simulating an eccentric orbit requires tiny steps near the planet (high velocity, high gravitational gradient) but can afford huge steps at the far point of the orbit; adaptive methods do this automatically, saving immense computational cost. In physics and ML, simulating chaotic systems or training continuous-time models (Neural ODEs) requires precision where the dynamics are sensitive, and efficiency elsewhere, a perfect use case for adaptive solvers.

## When to study it
Before tackling this, you must have a firm grasp of the following:
1.  **Ordinary Differential Equations (ODEs):** Specifically, what an initial value problem (IVP) is.
2.  **Numerical Methods Basics:** You must understand Euler's method and the classic, fixed-step Runge-Kutta 4th order (RK4) method.
3.  **Error Analysis:** You need to know the concepts of local truncation error and global error, and how error is related to step size, typically as $O(h^p)$.

If you are not comfortable deriving the classic RK4 method and explaining why its local error is $O(h^5)$, you should review that first.

## How to study it (step by step)
1.  **The Core Problem:** Start with a fixed-step RK4 method. Solve $y' = -10y, y(0)=1$ with $h=0.5$. The true solution is $y(t) = e^{-10t}$. Note the massive error and instability. This motivates the need for a better way to choose $h$.
2.  **The Idea of Error Estimation:** How can you estimate error without the true solution? The key is to compute the next step, $y_{n+1}$, using two different methods of different orders, say order $p$ and order $p+1$. The difference between their results is a good proxy for the error of the lower-order method.
3.  **Derive the Step-Size Control Law:** Assume the local error, $E$, of a $p$-th order method is proportional to the step size to the $(p+1)$-th power: $E \approx C h^{p+1}$. Let $\Delta$ be our current error estimate with step $h_{old}$, and $\epsilon$ be our desired error tolerance. Derive the formula for the optimal next step, $h_{new}$, by setting up a ratio: $\frac{\epsilon}{\Delta} \approx \frac{C h_{new}^{p+1}}{C h_{old}^{p+1}}$. Solve for $h_{new}$.
4.  **Explore the "Embedded" Method:** Look up the Butcher Tableau for the Dormand-Prince pair (the basis for MATLAB's `ode45`) or the original Fehlberg RKF45. Notice that the coefficients for the 4th-order and 5th-order methods are structured so that they share most of the intermediate function evaluations ($k_i$). This is the computational trick that makes the method efficient.
5.  **Code the Logic:** Implement a simple adaptive solver for an easy ODE like $y' = y, y(0)=1$. Don't implement the full RK45 at first. Use a simpler embedded pair, like Euler's method (1st order) and Heun's method (2nd order), to get the adaptive logic correct: calculate two estimates, find the error, decide to accept/reject the step, and calculate the next step size.

## Key ideas, with intuition
1.  **Two Estimates for the Price of (Almost) One:** The central idea of an embedded Runge-Kutta method is to compute two separate approximations for the next step, one with order $p$ and another with order $p+1$. For RK45, we compute a 4th-order and a 5th-order solution. The genius of Fehlberg, Dormand, and Prince was finding sets of coefficients that allow most of the expensive function evaluations to be shared between the two calculations.

2.  **The Higher-Order Solution is "Truth":** We don't know the true analytical solution, but the $(p+1)$-order result is assumed to be a much better approximation than the $p$-order result. We therefore treat it as a proxy for the truth to estimate the error of the lower-order method.
    $$
    \Delta = |y_{n+1}^{(p+1)} - y_{n+1}^{(p)}| \approx \text{Local Error of the } p\text{-th order method}
    $$
    For RK45, we use the 5th-order result, $y^{(5)}_{n+1}$, as the "truth" to estimate the error in the 4th-order result, $y^{(4)}_{n+1}$.

3.  **The Goldilocks Controller:** The algorithm lives by a simple rule, comparing the estimated error $\Delta$ to a user-defined tolerance $\epsilon$:
    *   If $\Delta > \epsilon$: The error is too big ("This porridge is too hot!"). The step is **rejected**. We must retry the same step with a smaller step size, $h_{new} < h_{old}$.
    *   If $\Delta \le \epsilon$: The error is acceptable ("This porridge is just right!"). The step is **accepted**. We advance the solution to $y_{n+1}$ (using the more accurate higher-order result) and use our formula to calculate a potentially larger step size, $h_{new}$, for the *next* step.

4.  **The Step-Size Control Law:** This formula is the heart of the controller. It stems from the assumption that the local error of the 4th-order method is $E \approx C h^5$.
    $$
    h_{new} = S \cdot h_{old} \left( \frac{\epsilon_{tol}}{\Delta} \right)^{1/5}
    $$
    Here, $S$ is a safety factor (typically ~0.9) to prevent the algorithm from being too aggressive. The exponent is $1/(p+1)$, and since we are controlling the error of the 4th-order method, $p=4$. If our error $\Delta$ was half the tolerance $\epsilon$, this formula suggests we could double our step size (since $(2)^{1/5} \approx 1.15$, the increase is more modest).

## Worked example
Let's illustrate the core logic with a simpler 1st/2nd-order embedded method (Euler/Heun) on a single step.

**Problem:** Solve $y' = -2ty^2$, with $y(0)=1$. Take one adaptive step with an initial guess of $h=0.2$ and a tolerance of $\epsilon = 0.001$.

**1. Define the methods:**
*   **Lower-order (p=1, Euler):** $y_{n+1}^{(1)} = y_n + h f(t_n, y_n)$
*   **Higher-order (p=2, Heun):** $y_{n+1}^{(2)} = y_n + \frac{h}{2} [f(t_n, y_n) + f(t_n+h, y_n + h f(t_n, y_n))]$

**2. Perform the calculations for the first step:**
*   Initial conditions: $t_0=0, y_0=1, h=0.2$.
*   Function: $f(t,y) = -2ty^2$.
*   First, calculate the lower-order (Euler) estimate:
    $$
    y_1^{(1)} = y_0 + h f(t_0, y_0) = 1 + 0.2 \times (-2 \cdot 0 \cdot 1^2) = 1 + 0 = 1.0
    $$
*   Next, calculate the higher-order (Heun) estimate. Notice it re-uses the $f(t_0, y_0)$ calculation.
    *   $k_1 = f(t_0, y_0) = 0$
    *   $k_2 = f(t_0+h, y_0+h k_1) = f(0.2, 1 + 0.2 \cdot 0) = f(0.2, 1.0) = -2(0.2)(1.0)^2 = -0.4$
    $$
    y_1^{(2)} = y_0 + \frac{h}{2}(k_1 + k_2) = 1 + \frac{0.2}{2}(0 - 0.4) = 1 - 0.04 = 0.96
    $$

**3. Estimate the error and make a decision:**
*   Error estimate: $\Delta = |y_1^{(2)} - y_1^{(1)}| = |0.96 - 1.0| = 0.04$.
*   Compare to tolerance: $\Delta = 0.04 > \epsilon = 0.001$. The error is much larger than our tolerance.
*   **Decision: Reject the step.**

**4. Calculate the new step size:**
*   The lower-order method is Euler, so $p=1$. We use the control law with a safety factor $S=0.9$.
    $$
    h_{new} = S \cdot h_{old} \left( \frac{\epsilon}{\Delta} \right)^{1/(p+1)} = 0.9 \cdot (0.2) \left( \frac{0.001}{0.04} \right)^{1/2}
    $$
    $$
    h_{new} = 0.18 \left( \frac{1}{40} \right)^{1/2} = 0.18 \cdot \frac{1}{\sqrt{40}} \approx 0.18 \cdot \frac{1}{6.32} \approx 0.0285
    $$

**Reflection:** Our initial guess for the step size, $h=0.2$, was too large and produced an unacceptable error. The adaptive mechanism rejected this result and computed a much smaller, more appropriate step size, $h \approx 0.0285$, to use for the next attempt from the same starting point $(t_0, y_0)$. This feedback loop is the essence of adaptive control.

## Diagrams
A diagram illustrating the concept:
```text
      |
      | Solution y(t)
      |
      |....................* <-- Large step is OK here (slow change)
      |                   .
      |                  .
      |                 .
      |                *
      |               .
      |              .
      |             *
      |            .
      |           *
      |          /
      |         /
      |        * <-- Small steps needed here (fast change)
      |       /
      |      *
      |     /
      |    *
      |   /
      +--------------------------------------> Time t

      <------> h_small      <------------> h_large
```

A flowchart of the core logic for one step:
```text
      +-----------------------------+
      | Start: t_n, y_n, h_current  |
      +--------------+--------------+
                     |
                     v
      +-----------------------------+
      | Compute y_n+1^(p) and       |
      |         y_n+1^(p+1)         |
      +--------------+--------------+
                     |
                     v
      +-----------------------------+
      | Estimate Error              |
      | Δ = |y_n+1^(p+1)-y_n+1^(p)| |
      +--------------+--------------+
                     |
                     v
      +-----------------------------+
      | Is Δ <= ε_tol ?             |----NO--->+----------------------------+
      +--------------+--------------+          | Reject Step.               |
                     | YES                      | h_new = calc_new_h(h,Δ,ε)  |
                     v                          | h_current = h_new          |
      +-----------------------------+          | (Retry from t_n, y_n)      |
      | Accept Step.                |          +----------------------------+
      | y_n+1 = y_n+1^(p+1)         |
      | t_n+1 = t_n + h_current     |
      | h_new = calc_new_h(h,Δ,ε)   |
      | h_current = h_new           |
      +--------------+--------------+
                     |
                     v
      +-----------------------------+
      | Proceed to next step        |
      +-----------------------------+
```

## Memory technique — remember this forever
1.  **The Story: "The Two Scouts"**
    You are mapping a dangerous, unknown river (the ODE solution). At each point, you send two scouts ahead: a fast but slightly reckless **Rookie (4th-order)** and a careful, precise **Veteran (5th-order)**. They use mostly the same path (shared function evaluations). When they report back, the distance between their final positions ($\Delta$) tells you how treacherous the next section of river is.
    *   If they are far apart ($\Delta > \epsilon$), the terrain is tricky. You call them back, shorten their leash ($h_{new} < h_{old}$), and send them out again.
    *   If they are close together ($\Delta \le \epsilon$), the path is clear. You trust the Veteran's position ($y_{n+1} = y_{n+1}^{(5)}$) and let them scout further ahead on the next leg ($h_{new} \ge h_{old}$).

2.  **Must-Overlearn Formulas:**
    *   Error Estimate: $\Delta = |y_{n+1}^{(p+1)} - y_{n+1}^{(p)}|$
    *   Step-Size Control: $h_{new} = S \cdot h_{old} \left( \frac{\epsilon_{tol}}{\Delta} \right)^{1/(p+1)}$

3.  **Spaced Repetition Schedule:**
    Review this material and re-derive the control law at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:**
    If you forget the control law, you can always re-derive it. The logic is:
    *   My current error is $\Delta$, and I know from theory that $\Delta \approx C \cdot (h_{old})^{p+1}$.
    *   My desired error is $\epsilon_{tol}$, and I want to find an $h_{new}$ such that $\epsilon_{tol} \approx C \cdot (h_{new})^{p+1}$.
    *   The constant $C$ is the same. Divide the second equation by the first:
        $$
        \frac{\epsilon_{tol}}{\Delta} \approx \frac{C \cdot (h_{new})^{p+1}}{C \cdot (h_{old})^{p+1}} = \left(\frac{h_{new}}{h_{old}}\right)^{p+1}
        $$
    *   Solve for $h_{new}$:
        $$
        h_{new} \approx h_{old} \left( \frac{\epsilon_{tol}}{\Delta} \right)^{1/(p+1)}
        $$

## Common mistakes
1.  **Using the wrong order `p`:** For RK45, the error $\Delta$ is an estimate of the 4th-order method's error. Therefore, $p=4$, and the exponent in the control law is $1/5$. Students often mistakenly use $p=5$.
2.  **Advancing with the wrong solution:** After a step is *accepted*, the new solution $y_{n+1}$ should be the more accurate, higher-order estimate ($y_{n+1}^{(5)}$ in RK45). Using the lower-order one throws away accuracy.
3.  **Forgetting the safety factor:** Not using a safety factor ($S \approx 0.9$) can make the algorithm "chatter." It might aggressively increase the step size, only for the next step to be immediately rejected, leading to inefficiency.
4.  **Infinite rejection loops:** If the ODE becomes singular or extremely stiff, the calculated $h_{new}$ can become smaller than machine precision. A robust implementation needs a check for a minimum allowable step size to prevent getting stuck.

## Self-check
1.  You are using an embedded RK23 method to control the error of the 2nd-order solution. After taking a step, you find the error estimate $\Delta$ is exactly half of your tolerance $\epsilon$. What is the optimal size for the *next* step, $h_{next}$, in terms of the step you just took, $h_{current}$? (Ignore safety factors).
2.  An RK45 solver is used with a tolerance $\epsilon=10^{-8}$. It attempts a step of size $h=0.1$ and calculates an error estimate $\Delta=3.2 \times 10^{-7}$. Should the step be accepted or rejected? What is the new step size the algorithm will compute for its next move? Use a safety factor of $S=0.9$.
3.  Derive the step-size control law, but this time assume you are setting a *relative* tolerance, $\epsilon_{rel}$. The error check is now $\Delta \le \epsilon_{rel} \cdot |y_n|$. How does this change the formula for $h_{new}$?