## What it is
A stiff differential equation is one that describes a system with multiple time scales, where some components change very rapidly while others change slowly. An implicit numerical method, like Backward Euler, is an algorithm for solving such equations that avoids the prohibitively small time steps required by standard (explicit) methods by calculating the future state using information about the future state itself.

## Why it matters
Stiffness is the default behavior in many real-world systems. In aerospace, the chemical kinetics of rocket fuel combustion involve reactions that occur on timescales from nanoseconds to seconds. In electronics, simulating a circuit involves components with vastly different response times. Using an explicit method would be computationally impossible; implicit methods are the only feasible approach.

## When to study it
You must be comfortable with ordinary differential equations (ODEs) of the form $y' = f(t, y)$. You should have already studied and implemented the Forward Euler method ($y_{n+1} = y_n + h f(t_n, y_n)$) and understand the concept of numerical stability, specifically why Forward Euler becomes unstable if the step size $h$ is too large for a given problem. Familiarity with basic linear algebra (matrix inversion) is also required.

## How to study it (step by step)
1.  **Review Stability:** Take the test equation $y' = -\lambda y$ with $\lambda > 0$. Apply Forward Euler and show that the numerical solution $y_n$ decays to zero only if $|1 - h\lambda| < 1$, which implies $h < 2/\lambda$. Note how a large $\lambda$ (a fast-decaying component) forces a very small step size $h$.
2.  **Derive Backward Euler:** Start with the same finite difference approximation for the derivative, but center it at the next step, $t_{n+1}$: $y'(t_{n+1}) \approx \frac{y_{n+1} - y_n}{h}$. Substitute $y'(t_{n+1}) = f(t_{n+1}, y_{n+1})$ and rearrange to get the Backward Euler formula.
3.  **Analyze Backward Euler's Stability:** Apply your derived formula to the same test equation, $y' = -\lambda y$. Solve for $y_{n+1}$ in terms of $y_n$. Show that the amplification factor is $1/(1+h\lambda)$. Prove that for any $\lambda > 0$ and any step size $h > 0$, this factor is always less than 1, meaning the method is unconditionally stable for this problem.
4.  **Understand the Cost:** For a general nonlinear function $f(t, y)$, the Backward Euler formula $y_{n+1} = y_n + h f(t_{n+1}, y_{n+1})$ is an implicit equation for $y_{n+1}$. Recognize that you can't just calculate the right-hand side; you must *solve* for $y_{n+1}$, often using a root-finding method like Newton's method at each time step. This makes each step more computationally expensive than an explicit method.
5.  **Work a Stiff Problem:** Use the example in the "Worked example" section below. First, try to solve it with Forward Euler with a "reasonable" step size like $h=0.01$ and watch it fail spectacularly. Then, solve it with Backward Euler using the same step size and see its stability.

## Key ideas, with intuition
1.  **Stiffness is about stability, not accuracy.** A stiff problem has a fast-decaying transient component. Once that transient is gone, we don't care about resolving it accurately anymore, but an explicit method's stability is still constrained by it. This forces tiny time steps even when the solution is changing very slowly. Imagine needing to take millimeter-sized steps for a marathon because you stumbled once at the start.
2.  **Explicit vs. Implicit is about information flow.** Explicit methods use only information from the present ($t_n$) to compute the future ($t_{n+1}$). They are computationally cheap but can be unstable.
    $$
    y_{n+1} = y_n + h \cdot (\text{slope at } t_n)
    $$
    Implicit methods use information from the future ($t_{n+1}$) to compute the future. This creates an equation that must be solved, but it results in superior stability.
    $$
    y_{n+1} = y_n + h \cdot (\text{slope at } t_{n+1})
    $$
    This is like saying "where I will be is a function of the forces acting on me where I will be."
3.  **A-Stability is the goal.** A method is A-stable if its region of absolute stability contains the entire left half of the complex plane. For the test equation $y'=\lambda y$, this means the method is stable for any step size $h>0$ as long as $\text{Re}(\lambda) < 0$ (i.e., the true solution decays). Backward Euler is the simplest A-stable method.

## Worked example
Consider the stiff ODE:
$$
y'(t) = -100(y - \cos(t)) - \sin(t), \quad y(0) = 2
$$
The true solution is $y(t) = \cos(t) + e^{-100t}$. The $e^{-100t}$ term is a fast transient that decays almost instantly, while the $\cos(t)$ term is the slow, long-term behavior. The "stiffness" comes from the large coefficient, $\lambda=100$.

Let's compute the first step to find $y(0.1)$ using a step size $h=0.1$.
Here, $t_0=0$, $y_0=2$, $t_1=0.1$.

**Attempt with Forward Euler (will fail):**
The formula is $y_{n+1} = y_n + h f(t_n, y_n)$.
$f(t_0, y_0) = f(0, 2) = -100(2 - \cos(0)) - \sin(0) = -100(2-1)-0 = -100$.
$y_1 = y_0 + h f(t_0, y_0) = 2 + 0.1 \times (-100) = 2 - 10 = -8$.
The true value is $y(0.1) = \cos(0.1) + e^{-100 \times 0.1} \approx 0.995 + 4.5 \times 10^{-5} \approx 0.995$. Our result of -8 is wildly incorrect and oscillating. The stability limit requires $h < 2/\lambda = 2/100 = 0.02$. Our step of $0.1$ is too large.

**Success with Backward Euler:**
The formula is $y_{n+1} = y_n + h f(t_{n+1}, y_{n+1})$.
$y_1 = y_0 + h f(t_1, y_1)$.
$y_1 = 2 + 0.1 \times [-100(y_1 - \cos(0.1)) - \sin(0.1)]$.
This is an equation for $y_1$. We must solve it.
$y_1 = 2 - 10(y_1 - \cos(0.1)) - 0.1\sin(0.1)$
$y_1 = 2 - 10y_1 + 10\cos(0.1) - 0.1\sin(0.1)$
$11y_1 = 2 + 10\cos(0.1) - 0.1\sin(0.1)$
Using $\cos(0.1) \approx 0.9950$ and $\sin(0.1) \approx 0.0998$:
$11y_1 \approx 2 + 10(0.9950) - 0.1(0.0998) = 2 + 9.95 - 0.00998 = 11.94002$
$y_1 \approx \frac{11.94002}{11} \approx 1.085$.

**Reflection:**
The Forward Euler step was simple arithmetic but gave a nonsensical result because the step size was too large for the stability region. The Backward Euler step required rearranging and solving a linear equation for $y_1$. This extra work was essential; it yielded a stable and much more reasonable answer (1.085 vs the true value of 0.995), correctly capturing the rapid decay toward the slow solution.

## Diagrams

A sketch of the numerical solutions for the worked example:

```text
      y(t)
      ^
  2.0 +     y_0 *
      |        \
      |         \
  1.0 +----------*---------------------> True solution y(t)
      |           \
      |            * y_1 (Backward Euler)
  0.0 +---------------------------------- t
      |
      |
      |
 -8.0 +            * y_1 (Forward Euler)
      |
```

Stability regions in the complex plane for $y'=\lambda y$. The method is stable if $h\lambda$ is inside the shaded region.

```text
Forward Euler (Explicit)           Backward Euler (Implicit)

      Im(h*lambda)                       Im(h*lambda)
      ^                                  ^
      |                                  |
      |      Unstable                    |      Stable
      |                                  |
<-----+-----.-----> Re(h*lambda)   <-----+-----------> Re(h*lambda)
 -2   |    -1 `-.  0                 -1  |      0
      | Stable `-.                      |
      |     (Circle)                     |
      |      Unstable                    |      Unstable
      v                                  v
```
Notice the entire left-half plane, where solutions decay ($\text{Re}(\lambda)<0$), is inside Backward Euler's stability region.

## Memory technique — remember this forever
1.  **The Story:** Imagine you're trying to land a rocket.
    - **Forward Euler** is a naive pilot who only looks at their current speed and direction to decide where they'll be in one second. If a sudden gust of wind (the stiff term) hits, they overcorrect wildly and fly off course.
    - **Backward Euler** is a sophisticated autopilot. It calculates: "To be on the correct trajectory in one second, what must my thrust be *now*?" It solves for the correct action, anticipating the future forces. It "looks backward" from a desired future state.

2.  **Must-Know Formulas:**
    - Forward (Explicit) Euler: $y_{n+1} = y_n + h f(t_n, y_n)$
    - Backward (Implicit) Euler: $y_{n+1} = y_n + h f(t_{n+1}, y_{n+1})$

3.  **Spaced Repetition Schedule:** Review this material and re-derive the stability results in 1 day, 3 days, 7 days, 16 days, and 35 days.

4.  **First Principles Pathway:** If you forget the Backward Euler formula, re-derive it. Start with the fundamental approximation of a derivative, but evaluate it at the *end* of the interval $[t_n, t_{n+1}]$:
    $$
    y'(t_{n+1}) \approx \frac{y(t_{n+1}) - y(t_n)}{h}
    $$
    Now, substitute the differential equation $y' = f(t,y)$ at the point $(t_{n+1}, y_{n+1})$:
    $$
    f(t_{n+1}, y_{n+1}) \approx \frac{y_{n+1} - y_n}{h}
    $$
    Rearrange to get the formula: $y_{n+1} \approx y_n + h f(t_{n+1}, y_{n+1})$.

## Common mistakes
1.  **Writing the code as if it's explicit.** A common bug is to write `y_new = y_old + h * f(t_new, y_old)`. Notice the use of `y_old` in the function call. This is not Backward Euler. The formula `y_new = y_old + h * f(t_new, y_new)` requires you to *solve* for `y_new`.
2.  **Believing implicit methods are "more accurate".** They are not, necessarily. Their primary advantage for stiff problems is stability, which allows for a much larger step size $h$. A large $h$ will reduce accuracy, but it will at least produce a stable, non-exploding solution.
3.  **Confusing stiffness with singularity.** A stiff equation's solution is typically smooth and well-behaved. The *problem* is numerical, a mismatch between the solver's step size and the system's timescales. A singular problem is one where the solution itself blows up.

## Self-check
1.  Given the ODE $y' = -5y$ with $y(0)=10$, take a single step of size $h=1$ using the Backward Euler method to find an approximation for $y(1)$.
2.  Consider the linear system $\mathbf{y}' = A\mathbf{y}$, where $\mathbf{y}$ is a vector in $\mathbb{R}^2$ and $A$ is a 2x2 matrix. Write down the Backward Euler update rule $\mathbf{y}_{n+1} = (\dots) \mathbf{y}_n$. What matrix must be inverted at each step?
3.  A system has eigenvalues $\lambda_1 = -10^6$ and $\lambda_2 = -0.1$. Why is this system stiff? Explain in one sentence why Backward Euler is a good choice, and in another sentence why Forward Euler is a bad choice for finding the solution at $t=100$.