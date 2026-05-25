## What it is
Linear approximation is the process of using the tangent line to a function at a specific point to estimate the function's values at nearby points. Differentials formalize this idea by relating the small change in the input, $dx$, to the corresponding approximate change in the output, $dy$, along that tangent line.

## Why it matters
This is the bedrock of numerical methods and perturbation theory. In physics and rocketry, you use it to simplify complex equations of motion for small deviations, like the small-angle approximation for a pendulum's swing. In machine learning, gradient descent works by repeatedly making a linear approximation of a complex loss function to find the direction of steepest descent and update model parameters.

## When to study it
You must have a solid grasp of the following before proceeding:
1.  The definition of the derivative, $f'(x)$, as the instantaneous rate of change.
2.  The geometric interpretation of the derivative as the slope of the tangent line to the curve $y=f(x)$.
3.  The point-slope form of a linear equation: $y - y_1 = m(x - x_1)$.
If you are not confident with these, review them first.

## How to study it (step by step)
1.  **Derive the Tangent Line Equation.** Start with the point-slope form for a line, $y - y_1 = m(x - x_1)$. To find the tangent line to a function $f(x)$ at the point $x=a$, what is our point $(x_1, y_1)$ and what is our slope $m$? The point is $(a, f(a))$ and the slope is the derivative evaluated at that point, $m = f'(a)$. Substitute these in and solve for $y$ to get the equation of the tangent line.
2.  **Define the Linearization.** The equation you just derived is the linear approximation, or linearization, of $f(x)$ at $x=a$. We call it $L(x)$. So, $L(x) = f(a) + f'(a)(x-a)$. For any $x$ very close to $a$, we assert that $f(x) \approx L(x)$.
3.  **Practice a Numerical Approximation.** Use this formula to estimate $\sqrt[3]{8.1}$. Let $f(x) = \sqrt[3]{x}$ and choose a "nice" point near 8.1, which is $a=8$. Calculate $f(a)$, $f'(x)$, and $f'(a)$. Plug them into the formula for $L(x)$ and evaluate $L(8.1)$. Compare your answer to the calculator value of $\sqrt[3]{8.1}$.
4.  **Introduce Differentials.** Let $\Delta x = x-a$ be the actual change in $x$. Let $\Delta y = f(x) - f(a)$ be the actual change in $y$. Now, define the *differentials* $dx$ and $dy$. We set the differential $dx$ to be equal to the actual change, so $dx = \Delta x$. We define the differential $dy$ to be the change along the *tangent line*: $dy = f'(a)dx$.
5.  **Connect the Concepts.** Look at the linearization formula: $L(x) = f(a) + f'(a)(x-a)$. Rearranging gives $L(x) - f(a) = f'(a)(x-a)$. The left side is the approximate change in $f$, which is $dy$. The right side is $f'(a)dx$. This gives the fundamental relationship: $dy = f'(a)dx$. Notice that $\Delta y \approx dy$.
6.  **Practice Error Propagation.** A machinist creates a spherical ball bearing with a target radius of $r=5$ mm. The machine has a tolerance of $\pm 0.02$ mm. Use differentials to estimate the potential error in the volume of the bearing, $V = \frac{4}{3}\pi r^3$. Here, $dr = 0.02$ is the error in radius. You need to find the corresponding error in volume, $dV$.

## Key ideas, with intuition
1.  **Local Linearity:** Any smooth (differentiable) curve looks like a straight line if you zoom in far enough. The tangent line *is* this local straight-line representation. Linear approximation is simply using this local "flat map" to navigate a short distance on a curved surface.

2.  **The Approximation Formula:**
    $$L(x) = f(a) + f'(a)(x-a)$$
    Think of this as `Approximation = Start Value + (Rate of Change) * (Change in Input)`. You start at a known point $(a, f(a))$ and then move along the tangent line (with slope $f'(a)$) for a small step $(x-a)$ to find your new, estimated height.

3.  **Actual Change ($\Delta y$) vs. Approximate Change ($dy$):**
    *   $\Delta y = f(a+\Delta x) - f(a)$ is the *true* change in the function's value as you move from $a$ to $a+\Delta x$. Geometrically, it's the change in height along the curve itself.
    *   $dy = f'(a)dx$ is the change in the tangent line's value as you move the same horizontal distance. It's the change in height along the local flat map.
    *   For small $dx$, these two values are extremely close: $\Delta y \approx dy$.

## Worked example
Use a linear approximation to estimate the value of $\cos(32^\circ)$.

**1. Identify the function and the center of approximation.**
The function is $f(x) = \cos(x)$. We need to choose a point $a$ near $32^\circ$ where we know the value of cosine and its derivative. The natural choice is $a=30^\circ$.
Crucially, calculus with trigonometric functions requires radians.
$a = 30^\circ = \frac{\pi}{6}$ radians.
The point we want to approximate is $x = 32^\circ = 32 \cdot \frac{\pi}{180} = \frac{8\pi}{45}$ radians.

**2. Find the necessary components for the linearization formula.**
The formula is $L(x) = f(a) + f'(a)(x-a)$.
*   $f(a) = \cos(\frac{\pi}{6}) = \frac{\sqrt{3}}{2}$.
*   $f'(x) = -\sin(x)$.
*   $f'(a) = -\sin(\frac{\pi}{6}) = -\frac{1}{2}$.
*   $x-a = 32^\circ - 30^\circ = 2^\circ$. In radians, $x-a = 2 \cdot \frac{\pi}{180} = \frac{\pi}{90}$.

**3. Assemble the linear approximation.**
$f(x) \approx L(x) = f(a) + f'(a)(x-a)$
$\cos(32^\circ) \approx \cos(\frac{\pi}{6}) + (-\sin(\frac{\pi}{6})) \cdot (2^\circ \text{ in radians})$
$\cos(32^\circ) \approx \frac{\sqrt{3}}{2} - \frac{1}{2} \left(\frac{\pi}{90}\right)$
$\cos(32^\circ) \approx \frac{\sqrt{3}}{2} - \frac{\pi}{180}$

**4. Calculate the numerical value.**
Using $\sqrt{3} \approx 1.732$ and $\pi \approx 3.1416$:
$\cos(32^\circ) \approx \frac{1.732}{2} - \frac{3.1416}{180} \approx 0.8660 - 0.01745 = 0.84855$

**Reflection:**
*   Step 1 worked because we chose a point $a$ that was both close to our target $x$ and easy to evaluate for $f(x)$ and $f'(x)$. Converting to radians was essential.
*   Step 2 was a direct application of differentiation and evaluation.
*   Step 3 correctly substituted all parts into the linearization formula.
*   The final result, $0.84855$, is very close to the true calculator value of $\cos(32^\circ) \approx 0.84804$. The approximation is accurate because $2^\circ$ is a small deviation.

## Diagrams

This diagram shows the key geometric relationship. The curve is $y=f(x)$. The straight line is the tangent at $x=a$. Notice that for a small step $\Delta x = dx$, the true change $\Delta y$ along the curve is very close to the change $dy$ along the tangent line.

```text
       y ^
         |
         |              /
         |     f(x) -- | ----------- Q (x, f(x))
         |          | | \
         |          | |  \  <-- y=f(x) curve
         |       Δy | |dy
         |          | |  /
         | f(a) ----- P ----------- R (x, L(x))
         |          | /   /
         |          |/   /  <-- Tangent line L(x)
         +----------a---x------> x
                    |---|
                     Δx = dx
```
*   Point P is $(a, f(a))$, our point of tangency.
*   Point Q is $(x, f(x))$, the actual point on the curve.
*   Point R is $(x, L(x))$, the point on the tangent line.
*   $\Delta y = f(x) - f(a)$ is the vertical distance from P to Q.
*   $dy = L(x) - f(a)$ is the vertical distance from P to R.

## Memory technique — remember this forever
1.  **The Story: The Ant on the Orange.** Imagine you are a tiny ant standing on a perfectly smooth orange. To you, the world looks flat. This "flat world" is the tangent plane (or line). If you want to predict your altitude after taking a tiny step, you don't need to solve the equation for a sphere. You just use your flat-world approximation: `new altitude = old altitude + slope * step_size`. That's all linear approximation is.

2.  **Must-Know Formulas:** Overlearn these until they are automatic.
    *   Linearization of $f$ at $a$: $$L(x) = f(a) + f'(a)(x-a)$$
    *   The differential relationship: $$dy = f'(x)dx$$

3.  **Spaced Repetition Schedule:**
    *   Review this lesson and re-derive the formulas in 1 day.
    *   Solve 3 new problems in 3 days.
    *   Explain the concept to a friend (or a rubber duck) in 7 days.
    *   Solve a harder error propagation problem in 16 days.
    *   Review again in 35 days.

4.  **First Principles Pathway:** If you forget the formula for $L(x)$, rebuild it.
    *   "I need the equation of a line."
    *   "What do I need for a line? A point and a slope."
    *   "What's my point? The point of tangency, $(a, f(a))$."
    *   "What's my slope? The definition of the derivative at that point, $m = f'(a)$."
    *   "Now, use the point-slope formula: $y - y_1 = m(x - x_1)$."
    *   Substitute: $y - f(a) = f'(a)(x-a)$.
    *   Solve for y: $y = f(a) + f'(a)(x-a)$. This is $L(x)$.

## Common mistakes
1.  **Forgetting the base value $f(a)$:** Students often write the approximation as just $f'(a)(x-a)$. This term is the *change* in height, not the final estimated height. You must add it to the starting height, $f(a)$.
2.  **Using $f'(x)$ instead of $f'(a)$:** The slope of the tangent line is a single number, not a function. You must evaluate the derivative at the point of tangency, $a$. The approximation should be $L(x) = f(2) + f'(2)(x-2)$, NOT $L(x) = f(2) + f'(x)(x-2)$.
3.  **Using degrees in trig functions:** The derivative formulas $(\sin x)'=\cos x$ and $(\cos x)'=-\sin x$ are only valid when $x$ is in radians. Always convert degrees to radians before applying calculus.

## Self-check
1.  Use a linear approximation to estimate the value of $(8.06)^{2/3}$.
2.  The side length of a cube is measured to be $s = 20$ cm with a possible measurement error of $\pm 0.1$ cm. Use differentials to estimate the maximum possible error in the calculated surface area of the cube.
3.  For what values of $x$ is the linear approximation of $f(x) = \frac{1}{1-x}$ at $a=0$ accurate to within $0.1$?