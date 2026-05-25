## What it is
The calculus of variations generalizes the calculus of functions to the calculus of *functionals*. A functional is a mapping from a set of functions to the real numbers. The functional derivative is the analog of the ordinary derivative; it measures how a functional's value changes in response to an infinitesimal change in its input function.

## Why it matters
This is the mathematical foundation for most of fundamental physics and optimal control theory. The Principle of Least Action, which governs classical mechanics (Lagrangian/Hamiltonian), electromagnetism, and general relativity, states that nature evolves along a path that minimizes a certain functional (the action). In aerospace, it's used to calculate the most fuel-efficient trajectory for a spacecraft (an optimal control problem).

## When to study it
You must have a firm grasp of single-variable and multi-variable calculus. Specifically, you need to be an expert at partial differentiation, the chain rule for multiple variables, and integration by parts. A foundational understanding of ordinary differential equations is also necessary. If these are not second nature, you will struggle.

## How to study it (step by step)
1.  **Revisit the ordinary derivative.** Write down the definition of the derivative $f'(x)$ from first principles: $f'(x) = \lim_{\epsilon \to 0} \frac{f(x+\epsilon) - f(x)}{\epsilon}$. The key idea is a small perturbation $\epsilon$ to the *input variable* $x$.
2.  **Define a functional and a variation.** Consider the arc length functional $J[y] = \int_a^b \sqrt{1 + [y'(x)]^2} dx$. Here, the input is the entire function $y(x)$. How do we perturb a function? We add another small function: $y(x) \to \tilde{y}(x) = y(x) + \epsilon \eta(x)$, where $\eta(x)$ is an arbitrary function that is zero at the endpoints ($\eta(a) = \eta(b) = 0$), and $\epsilon$ is a small number.
3.  **Calculate the first variation.** Substitute $\tilde{y}(x)$ into a general functional $J[y] = \int_a^b L(x, y, y') dx$. This gives $J[y+\epsilon\eta]$. Now, treat this as a function of $\epsilon$ and find its derivative with respect to $\epsilon$, evaluated at $\epsilon=0$. This is called the *first variation*, $\delta J$.
    $$ \delta J = \left. \frac{dJ[y+\epsilon\eta]}{d\epsilon} \right|_{\epsilon=0} $$
4.  **Derive the Euler-Lagrange equation.** For $J$ to be at an extremum (minimum or maximum), its first variation $\delta J$ must be zero for *any* choice of perturbation $\eta(x)$. Carry out the differentiation from step 3 using the chain rule. Then, use integration by parts to move all derivatives off of $\eta(x)$. The resulting integral must be zero for any $\eta(x)$, which implies the integrand itself (excluding $\eta(x)$) must be zero. This gives the Euler-Lagrange equation.

## Key ideas, with intuition
1.  **Functionals are "Functions of Functions".**
    A function $f(x)$ takes a number $x$ and gives you a number $f(x)$. A functional $J[y]$ takes a *function* $y(x)$ over an interval $[a, b]$ and gives you a single number $J[y]$.
    *   *Example:* The arc length functional. You feed it a curve (a function $y(x)$), and it returns the length of that curve (a number). A straight line will give a small number. A wiggly curve will give a large number.

2.  **The "Directional Derivative" in Function Space.**
    In multivariable calculus, the directional derivative tells you how a function $f(x, y)$ changes as you move in a specific direction $\vec{v}$. The functional derivative is the same concept, but in an infinite-dimensional space of functions. The perturbation $\eta(x)$ defines the "direction" you are "moving" away from the function $y(x)$. The first variation $\delta J$ is the rate of change of the functional in that "direction".

3.  **Extrema Require Zero Variation in ALL Directions.**
    For a function $f(x, y)$ to be at a minimum, its directional derivative must be zero in *every* direction. Similarly, for a functional $J[y]$ to be at an extremum, its first variation $\delta J$ must be zero for *every possible* perturbation function $\eta(x)$. This is a very powerful constraint.

4.  **The Euler-Lagrange Equation is the Core Result.**
    The condition that $\delta J = 0$ for all $\eta(x)$ leads directly to a differential equation that the extremizing function $y(x)$ must satisfy. For a functional of the form $J[y] = \int_{x_1}^{x_2} L(x, y, y') dx$, this differential equation is the Euler-Lagrange equation:
    $$ \frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = 0 $$
    Solving this equation gives you the candidate function(s) that minimize or maximize the functional.

## Worked example
**Problem:** Find the curve $y(x)$ of shortest length connecting the points $(0,0)$ and $(1,1)$.

**1. Formulate the functional.**
The problem asks to minimize the arc length. The functional for arc length between $x_1$ and $x_2$ is:
$$ J[y] = \int_{x_1}^{x_2} \sqrt{1 + (y')^2} \, dx $$
Here, our points are $(0,0)$ and $(1,1)$, so we are integrating from $x_1=0$ to $x_2=1$. The "Lagrangian" is the integrand:
$$ L(x, y, y') = \sqrt{1 + (y')^2} $$

**2. Apply the Euler-Lagrange equation.**
The equation is $\frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = 0$. We compute the partial derivatives first.
*   $\frac{\partial L}{\partial y}$: The Lagrangian $L$ does not explicitly depend on $y$. So,
    $$ \frac{\partial L}{\partial y} = 0 $$
*   $\frac{\partial L}{\partial y'}$: Treat $y'$ as the variable.
    $$ \frac{\partial L}{\partial y'} = \frac{\partial}{\partial y'} (1 + (y')^2)^{1/2} = \frac{1}{2}(1 + (y')^2)^{-1/2} \cdot (2y') = \frac{y'}{\sqrt{1 + (y')^2}} $$

**3. Substitute into the Euler-Lagrange equation and solve.**
$$ 0 - \frac{d}{dx}\left(\frac{y'}{\sqrt{1 + (y')^2}}\right) = 0 $$
This means the term inside the derivative must be a constant, let's call it $c$.
$$ \frac{y'}{\sqrt{1 + (y')^2}} = c $$
Now, we solve for $y'$. Square both sides:
$$ \frac{(y')^2}{1 + (y')^2} = c^2 \implies (y')^2 = c^2(1 + (y')^2) \implies (y')^2(1-c^2) = c^2 \implies y' = \sqrt{\frac{c^2}{1-c^2}} $$
The entire right side is just another constant. Let's call it $m$.
$$ y' = m $$
Integrating with respect to $x$ gives:
$$ y(x) = mx + b $$
This is the equation of a straight line, as expected.

**4. Apply boundary conditions.**
The curve must pass through $(0,0)$ and $(1,1)$.
*   $y(0) = 0 \implies m(0) + b = 0 \implies b=0$.
*   $y(1) = 1 \implies m(1) + 0 = 1 \implies m=1$.
The solution is $y(x) = x$.

**Reflection:** The Euler-Lagrange equation converted a minimization problem over an infinite space of functions into a simple ordinary differential equation. Solving that ODE and applying the boundary conditions gave the unique path that minimizes the arc length functional: a straight line.

## Diagrams
This diagram illustrates a function $y(x)$ and a small variation, $\tilde{y}(x) = y(x) + \epsilon\eta(x)$. The calculus of variations seeks the function $y(x)$ for which the value of a functional $J[y]$ is stationary (e.g., a minimum) with respect to all such small variations.

```text
      ^ y
      |
      |                     . . . . . . . . . . . . . . . (x_2, y_2)
      |                  . '   \                          .
      |               . '       \ epsilon * eta(x)         .
      |            . '           \                        .
      |         . ' <--- y(x) + epsilon * eta(x)         .
      |      . '                                        .
      |   . ' <-------------------- y(x) ---------------.
      | .
(x_1, y_1)
      +------------------------------------------------------------> x
```

## Memory technique — remember this forever
1.  **Story:** Think of yourself as a hiker in a vast, foggy mountain range trying to find the lowest point. You can't see the whole landscape (the entire space of functions). So, you stand on one path ($y(x)$) and you check every possible direction you could step ($\eta(x)$). If *every single direction* leads uphill or is flat, you must be at a local minimum. The Euler-Lagrange equation is the mathematical tool that checks all directions at once. Finding the function that satisfies it is like finding the path at the bottom of the valley.

2.  **Must-know formulas:**
    *   The general functional: $J[y] = \int_{x_1}^{x_2} L(x, y(x), y'(x)) \, dx$
    *   The Euler-Lagrange Equation: $\frac{\partial L}{\partial y} - \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) = 0$

3.  **Spaced repetition schedule:** Review the derivation of the Euler-Lagrange equation and the worked example at: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read it; reproduce it from a blank sheet of paper.

4.  **First principles pathway:** If you forget the Euler-Lagrange equation, derive it.
    *   Start with $J[y] = \int L(x, y, y') dx$.
    *   Introduce the variation: $\tilde{y} = y + \epsilon\eta$.
    *   Write $J[y+\epsilon\eta] = \int L(x, y+\epsilon\eta, y'+\epsilon\eta') dx$.
    *   Take the derivative w.r.t. $\epsilon$ and set $\epsilon=0$. This is $\delta J$.
        $\delta J = \int \left( \frac{\partial L}{\partial y}\eta + \frac{\partial L}{\partial y'}\eta' \right) dx$.
    *   Use integration by parts on the second term: $\int \frac{\partial L}{\partial y'}\eta' dx = \left[ \frac{\partial L}{\partial y'}\eta \right]_{x_1}^{x_2} - \int \eta \frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right) dx$.
    *   The boundary term is zero because $\eta(x_1)=\eta(x_2)=0$.
    *   Set $\delta J = \int \left( \frac{\partial L}{\partial y} - \frac{d}{dx}\frac{\partial L}{\partial y'} \right) \eta(x) \, dx = 0$.
    *   Since this must hold for *any* $\eta(x)$, the term in the parenthesis must be zero. That's the Euler-Lagrange equation.

## Common mistakes
1.  **Confusing total and partial derivatives.** In the term $\frac{d}{dx}\left(\frac{\partial L}{\partial y'}\right)$, the inner derivative $\frac{\partial}{\partial y'}$ treats $x, y, y'$ as independent. The outer derivative $\frac{d}{dx}$ is a *total* derivative, which must account for the fact that $y$ and $y'$ are functions of $x$, often requiring the chain rule.
2.  **Incorrectly applying the Euler-Lagrange equation.** The equation we derived works *only* for functionals of the form $\int L(x, y, y') dx$. If the functional involves higher derivatives (like $y''$) or multiple functions, the equation changes.
3.  **Forgetting boundary conditions.** Solving the Euler-Lagrange equation gives a general solution (a family of functions). You must use the problem's boundary conditions to find the specific constant values and identify the unique solution.
4.  **Assuming a minimum.** The Euler-Lagrange equation finds *extrema*—minima, maxima, or saddle points. Proving that a solution is a minimum requires checking the "second variation," analogous to the second derivative test, which is a more advanced topic.

## Self-check
1.  A curve $y(x)$ is rotated around the x-axis. Write down the functional $S[y]$ that represents the surface area of the resulting shape between $x=a$ and $x=b$. Identify the Lagrangian $L(x, y, y')$.
2.  The brachistochrone problem seeks the path $y(x)$ that minimizes the time for a bead to slide under gravity from point A to point B. The functional is $T[y] = \frac{1}{\sqrt{2g}} \int_A^B \frac{\sqrt{1+(y')^2}}{\sqrt{y}} dx$. Find the Euler-Lagrange equation for this problem. (You do not need to solve it).
3.  Derive the Euler-Lagrange equations for a functional that depends on two functions, $y_1(x)$ and $y_2(x)$:
    $$ J[y_1, y_2] = \int_{x_1}^{x_2} L(x, y_1, y_2, y_1', y_2') \, dx $$
    (Hint: Consider variations $\eta_1(x)$ and $\eta_2(x)$ and require that the first variation be zero for any choice of either.)