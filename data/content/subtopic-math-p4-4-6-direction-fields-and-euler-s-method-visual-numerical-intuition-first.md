## What it is
A direction field is a graph that visualizes the behavior of a first-order ordinary differential equation (ODE) by drawing small line segments representing the slope of the solution curve at many points. Euler's method is a numerical algorithm that approximates a solution to an ODE by taking small, sequential steps, where the direction of each step is determined by the slope from the direction field at the beginning of that step. It is the simplest way to turn the visual map of a direction field into a concrete, calculated path.

## Why it matters
This is the foundation of computational physics and engineering. When an analytical solution to an ODE is impossible (which is most of the time for real-world systems), we must use numerical methods. Euler's method is the conceptual parent of the more sophisticated Runge-Kutta methods used to simulate everything from rocket trajectories and satellite orbits to the behavior of plasma in a fusion reactor or the training dynamics of a neural network.

## When to study it
You must be comfortable with single-variable calculus, specifically the geometric interpretation of the derivative $y'(x)$ as the slope of the tangent line to the function $y(x)$ at point $x$. You should also understand the form of a first-order ODE, $y' = f(x, y)$, which states that the slope of the solution curve depends on its position $(x, y)$. If you cannot look at $y' = -y/x$ and immediately say "the slope of the solution at point $(2, 3)$ is $-3/2$", you should review that concept first.

## How to study it (step by step)
1.  **Pick a simple ODE:** Start with $y' = y$.
2.  **Draw the direction field by hand:** Create a small grid for $x \in [-2, 2]$ and $y \in [-2, 2]$. At each integer coordinate $(x, y)$, calculate the slope $y' = y$. At $(1, 2)$, the slope is 2. At $(1, -1)$, the slope is -1. At any point where $y=0$, the slope is 0. Draw short line segments with these slopes at each point. Observe the pattern.
3.  **Trace a solution curve:** Pick a starting point (an initial condition), for example, $(0, 1)$. Starting from there, sketch a curve that is always tangent to the line segments it passes near. You are visually integrating the ODE.
4.  **Derive Euler's method:** Recall the definition of the derivative as a limit: $y'(x) = \lim_{h \to 0} \frac{y(x+h) - y(x)}{h}$. For a small, finite step size $h$, we can approximate this as $y'(x) \approx \frac{y(x+h) - y(x)}{h}$. Rearrange to solve for $y(x+h)$: $y(x+h) \approx y(x) + h \cdot y'(x)$. Since our ODE gives us $y' = f(x, y)$, we have our update rule.
5.  **Apply Euler's method:** Use the ODE $y' = y$ with initial condition $y(0) = 1$. Choose a step size, say $h=0.5$. Calculate the first few points of the approximate solution.
6.  **Compare with the exact solution:** The exact solution to $y' = y$ with $y(0)=1$ is $y(x) = e^x$. Compare your calculated points from step 5 to the true values from the exact solution. This will give you a feel for the approximation error.
7.  **Reflect on the error:** Notice that Euler's method always uses the slope at the *beginning* of an interval to step across the entire interval. If the true solution curve is bending, this assumption introduces error. How would making $h$ smaller reduce this error?

## Key ideas, with intuition
1.  **An ODE is a field of slopes.** The equation $y' = f(x, y)$ is not just an equation to be solved; it's a machine that gives you a specific slope (a direction) for any point $(x, y)$ you plug into it. The plane is filled with these instructions.
2.  **Solutions are paths through the field.** A solution curve $y(x)$ is a path that obeys the instructions at every point it passes through. Its tangent at any point $(x, y(x))$ must match the slope specified by the direction field at that point.
3.  **Euler's method is a "follow the leader" game.** Imagine you are at a point $(x_n, y_n)$. The direction field tells you the slope is $f(x_n, y_n)$. You treat this slope as constant for a small step $h$ and walk along a straight line in that direction. This takes you to a new point $(x_{n+1}, y_{n+1})$, where you look at the field again and repeat.
    $$
    \underbrace{y_{n+1}}_{\text{New position}} = \underbrace{y_n}_{\text{Old position}} + \underbrace{h}_{\text{Step size}} \cdot \underbrace{f(x_n, y_n)}_{\text{Slope at old position}}
    $$
4.  **It's a tangent line approximation, repeated.** Each step of Euler's method is just finding the tangent line at the current point and moving along it for a short distance $h$.
    $$
    \text{Equation of tangent at } (x_n, y_n): \quad Y - y_n = f(x_n, y_n)(X - x_n)
    $$
    Now, let $X = x_n + h = x_{n+1}$. The new $y$-value on this line, which we call $y_{n+1}$, is:
    $$
    y_{n+1} - y_n = f(x_n, y_n)((x_n+h) - x_n) \implies y_{n+1} = y_n + h \cdot f(x_n, y_n)
    $$

## Worked example
Approximate the value of $y(0.2)$ for the initial value problem $y' = x - 2y$ with $y(0) = 1$, using Euler's method with a step size of $h=0.1$.

**Step 1: Identify initial conditions and function**
Our starting point is $(x_0, y_0) = (0, 1)$.
Our slope function is $f(x, y) = x - 2y$.
Our step size is $h=0.1$.
We need to take two steps to get from $x=0$ to $x=0.2$.

**Step 2: First step (from $x_0=0$ to $x_1=0.1$)**
-   Calculate the slope at the starting point $(x_0, y_0) = (0, 1)$:
    $f(0, 1) = 0 - 2(1) = -2$.
-   Use the Euler update rule to find $y_1$:
    $y_1 = y_0 + h \cdot f(x_0, y_0)$
    $y_1 = 1 + (0.1) \cdot (-2) = 1 - 0.2 = 0.8$.
-   So, our first new point is $(x_1, y_1) = (0.1, 0.8)$.

**Step 3: Second step (from $x_1=0.1$ to $x_2=0.2$)**
-   Calculate the slope at our new point $(x_1, y_1) = (0.1, 0.8)$:
    $f(0.1, 0.8) = 0.1 - 2(0.8) = 0.1 - 1.6 = -1.5$.
-   Use the Euler update rule to find $y_2$:
    $y_2 = y_1 + h \cdot f(x_1, y_1)$
    $y_2 = 0.8 + (0.1) \cdot (-1.5) = 0.8 - 0.15 = 0.65$.
-   Our final point is $(x_2, y_2) = (0.2, 0.65)$.

**Reflection:**
The approximation for $y(0.2)$ is $0.65$. The first step assumed the slope was a constant $-2$ over the interval $[0, 0.1]$. The second step assumed the slope was a constant $-1.5$ over the interval $[0.1, 0.2]$. The accuracy is limited because the true solution curve is continuously changing its slope, but our method only re-evaluates it at discrete points.

## Diagrams
Here is an ASCII direction field for the ODE $y' = -x$. Slopes are positive for $x<0$ and negative for $x>0$. Slopes are zero along the y-axis ($x=0$).

```text
 y
 ^
 2 |  \   \   |   /   /
   |   \   \  |  /   /
 1 |   \   \  |  /   /
   |    \   \ | /   /
 0 +-----\---*---/-----> x
   |      \  \|/  /
-1 |       \  |  /
   |        \ | /
-2 |         \|/

   (Slopes shown near integer coordinates from x=-2 to x=2)
```
An Euler's method approximation for $y'=-x$ with $y(-2)=1$ and $h=1$ would look like this:
1. Start at $(-2, 1)$. Slope is $f(-2, 1) = -(-2) = 2$.
2. Step to $x=-1$: $y_1 = 1 + 1 \cdot (2) = 3$. New point is $(-1, 3)$.
3. From $(-1, 3)$, slope is $f(-1, 3) = -(-1) = 1$.
4. Step to $x=0$: $y_2 = 3 + 1 \cdot (1) = 4$. New point is $(0, 4)$.
The path is a series of straight line segments: $(-2, 1) \to (-1, 3) \to (0, 4) \to ...$

## Memory technique — remember this forever
1.  **Visual Hook:** Think of a boat in a river with complex currents. The direction field is a map of the water's velocity at every point. Euler's method is how you'd predict the boat's path: look at the current where you are, drift in that direction for one minute, then look at the current at your new spot and repeat. You are always using your *current* location's data to predict the *next* location.
2.  **Must Overlearn:**
    -   The ODE form: $y' = f(x, y)$
    -   The Euler update rule: $y_{n+1} = y_n + h \cdot f(x_n, y_n)$
3.  **Spaced Repetition:** Review this material and re-work the example at 1 day, 3 days, 7 days, 16 days, and 35 days from now.
4.  **First Principles Pathway:** If you forget the Euler formula, re-derive it from the fundamental approximation of the derivative.
    $$
    y'(x_n) \approx \frac{y(x_{n+1}) - y(x_n)}{h}
    $$
    Since $y'(x_n) = f(x_n, y_n)$ and $y(x_{n+1}) \approx y_{n+1}$, just rearrange the algebra:
    $$
    f(x_n, y_n) \approx \frac{y_{n+1} - y_n}{h} \implies h \cdot f(x_n, y_n) \approx y_{n+1} - y_n \implies y_{n+1} = y_n + h \cdot f(x_n, y_n)
    $$

## Common mistakes
1.  **Using the wrong slope.** Calculating the step from $(x_n, y_n)$ using the slope at the *end* point, $f(x_{n+1}, y_n)$, or some other combination. The slope $f(x_n, y_n)$ is fixed for the entire duration of the step from $x_n$ to $x_{n+1}$.
2.  **Step size confusion.** Forgetting to multiply the slope $f(x_n, y_n)$ by the step size $h$. The change in $y$ is $\Delta y \approx h \cdot y'$, not just $y'$.
3.  **Ignoring the dependence of $f$ on both variables.** For an ODE like $y' = x - 2y$, students sometimes forget to plug in the current $x_n$ and $y_n$ values, perhaps just using $y_n$ or $x_n$. Both are required.

## Self-check
1.  Sketch the direction field for the ODE $y' = 1$. What do the solution curves look like?
2.  For the initial value problem $y' = 2x + y$ with $y(0) = -1$, perform two steps of Euler's method with $h=0.5$ to approximate $y(1)$.
3.  Consider the ODE $y' = y^2$ with $y(0)=1$. If you compute an approximation using Euler's method, will your estimate for $y(x)$ where $x>0$ be an overestimate or an underestimate of the true solution? Justify your answer by considering the concavity of the solution curve. (Hint: how does the slope change as $y$ increases?)