## What it is
The first derivative of a function, $f'(x)$, gives the slope of the tangent line at any point $x$. We use the *sign* of the first derivative to determine where the original function $f(x)$ is increasing (sloping up) or decreasing (sloping down). A local extremum (a local maximum or minimum) can only occur where the function changes direction, which corresponds to the derivative being zero or undefined.

## Why it matters
This is the foundation of optimization. In machine learning, you minimize a loss function by following the negative gradient (the multi-variable version of the derivative) downhill—a process called gradient descent. In aerospace engineering, calculating the point of maximum dynamic pressure ("Max Q") for a launch vehicle involves finding where the derivative of the pressure function is zero. In physics, finding the maximum height of a projectile occurs when its vertical velocity (the derivative of its position) is zero.

## When to study it
You must be proficient with the concept of the derivative as an instantaneous rate of change and the slope of a tangent line. You must have mastered the power, product, quotient, and chain rules for differentiation. You also need fluency in algebra, specifically solving polynomial equations ($f'(x)=0$) and inequalities ($f'(x)>0$).

## How to study it (step by step)
1.  **Revisit the definitions.** Write down the formal definitions of an increasing function ($x_1 < x_2 \implies f(x_1) < f(x_2)$) and a decreasing function. Draw a graph of each. Internalize that "increasing" means "slopes upward to the right."
2.  **Derive the connection.** Use the Mean Value Theorem to prove that if $f'(x) > 0$ for all $x$ in an interval $(a, b)$, then $f$ is strictly increasing on $(a, b)$. This formalizes the intuition that a positive slope means the function is rising.
3.  **Define critical points.** A critical point $c$ of a function $f$ is a point in its domain where either $f'(c) = 0$ or $f'(c)$ does not exist. Understand why these are the *only* candidates for local extrema: for the function to change from rising to falling, the slope must pass through zero or be undefined.
4.  **Master the procedure.** For a given function $f(x)$:
    a. Find the domain of $f(x)$.
    b. Calculate the derivative, $f'(x)$.
    c. Find all critical points by solving $f'(x)=0$ and finding where $f'(x)$ is undefined.
    d. Create a number line and mark the critical points. These points partition the line into intervals.
    e. Pick a test value within each interval and find the sign of $f'(x)$ at that point.
    f. Use the signs to determine intervals of increase/decrease and classify each critical point.
5.  **Solve targeted problems.** Work through 5-10 problems, ensuring they include polynomials, rational functions, and functions with cusps or corners (like $f(x) = x^{2/3}$), where the derivative is undefined.

## Key ideas, with intuition
1.  **The Derivative's Sign is the Function's Direction.** This is the core concept. The derivative $f'(x)$ is the slope.
    - If $f'(x) > 0$, the slope is positive. The function is going **up**.
    - If $f'(x) < 0$, the slope is negative. The function is going **down**.
    - If $f'(x) = 0$, the slope is zero. The function is momentarily **flat**.

2.  **Critical Points are the Only Candidates for Extrema.** A function cannot change from increasing to decreasing (or vice versa) without its derivative either passing through zero or being undefined. Think of climbing a hill: to go from climbing up to walking down, you must reach the peak, where the ground is momentarily flat ($f'=0$). Or, you could reach a sharp, pointy peak where the slope is undefined (a "cusp"). These locations are called **critical points**.
    $$
    \text{Critical Points } c \text{ are where } f'(c) = 0 \text{ or } f'(c) \text{ is undefined.}
    $$

3.  **The First Derivative Test Classifies Critical Points.** By looking at the sign of $f'$ on either side of a critical point $c$, we can determine if it's a local maximum, minimum, or neither.
    - **Local Maximum:** $f'$ changes from `+` to `-`. (The function was increasing, then decreasing).
    - **Local Minimum:** $f'$ changes from `-` to `+`. (The function was decreasing, then increasing).
    - **Neither:** $f'$ does not change sign. (e.g., $f(x)=x^3$ at $x=0$. It's flat for an instant, but then keeps increasing).

## Worked example
Find the intervals where $f(x) = 2x^3 + 3x^2 - 36x$ is increasing or decreasing, and classify all local extrema.

**Step 1: Find the derivative.**
The function is a polynomial, so it's differentiable everywhere.
$$
f'(x) = \frac{d}{dx}(2x^3 + 3x^2 - 36x) = 6x^2 + 6x - 36
$$
This step uses the power rule to find the rate of change of the function.

**Step 2: Find the critical points.**
Set the derivative to zero and solve for $x$. The derivative is never undefined.
$$
6x^2 + 6x - 36 = 0 \\
6(x^2 + x - 6) = 0 \\
6(x+3)(x-2) = 0
$$
The critical points are $x = -3$ and $x = 2$.
This step identifies the only points where the function's slope could change direction.

**Step 3: Create a sign chart for $f'(x)$.**
Draw a number line and mark the critical points. Test a value from each of the three resulting intervals: $(-\infty, -3)$, $(-3, 2)$, and $(2, \infty)$.

-   **Interval $(-\infty, -3)$:** Choose $x=-4$.
    $f'(-4) = 6(-4+3)(-4-2) = 6(-1)(-6) = 36 > 0$. So, $f'(x)$ is positive.
-   **Interval $(-3, 2)$:** Choose $x=0$.
    $f'(0) = 6(0+3)(0-2) = 6(3)(-2) = -36 < 0$. So, $f'(x)$ is negative.
-   **Interval $(2, \infty)$:** Choose $x=3$.
    $f'(3) = 6(3+3)(3-2) = 6(6)(1) = 36 > 0$. So, $f'(x)$ is positive.

This step systematically checks the behavior (the slope) of the function in the regions separated by the critical points.

**Step 4: Interpret the results.**
-   $f(x)$ is **increasing** on $(-\infty, -3) \cup (2, \infty)$ because $f'(x) > 0$.
-   $f(x)$ is **decreasing** on $(-3, 2)$ because $f'(x) < 0$.
-   At $x=-3$, the derivative changes from `+` to `-`. This indicates a **local maximum**. The value is $f(-3) = 2(-27) + 3(9) - 36(-3) = -54 + 27 + 108 = 81$.
-   At $x=2$, the derivative changes from `-` to `+`. This indicates a **local minimum**. The value is $f(2) = 2(8) + 3(4) - 36(2) = 16 + 12 - 72 = -44$.

This final step translates the information about the derivative back into conclusions about the original function's shape and features.

## Diagrams
A sign chart for the worked example's derivative, $f'(x) = 6(x+3)(x-2)$:

```text
Sign of f'(x):   +++++++++ | ----------- | +++++++++
<---------------------|-------------|--------------------> x
                     -3             2

Behavior of f(x):  Increasing   Decreasing   Increasing
                      /           \            /
                   Local Max     Local Min
```

A generic function showing the relationship between slope and extrema:
```text
      f(x)
        ^
        |       f'(x)>0  /-----\ f'(x)=0 (Local Max)
        |              /       \
        |             /         \ f'(x)<0
        |------------/           \
        |                         \
        |                          \
        |           f'(x)<0          \-------/ f'(x)=0 (Local Min)
        |                              /
        |                             / f'(x)>0
        +--------------------------------------------------> x
```

## Memory technique — remember this forever
1.  **Visual Hook:** Picture yourself walking along the graph of the function from left to right.
    -   $f' > 0$ (positive derivative): You are walking **uphill**.
    -   $f' < 0$ (negative derivative): You are walking **downhill**.
    -   A local maximum is the **peak of a hill**: you go from walking uphill to downhill (`+` to `-`).
    -   A local minimum is the **bottom of a valley**: you go from walking downhill to uphill (`-` to `+`).

2.  **Formulas to Overlearn:**
    -   If $f'(x) > 0$ on $(a, b)$, then $f$ is increasing on $(a, b)$.
    -   If $f'(x) < 0$ on $(a, b)$, then $f$ is decreasing on $(a, b)$.
    -   First Derivative Test at critical point $c$:
        -   `+` to `-` $\implies$ Local Maximum
        -   `-` to `+` $\implies$ Local Minimum

3.  **Spaced Repetition Schedule:** Review this topic and solve one problem at **1 day, 3 days, 7 days, 16 days, and 35 days**.

4.  **First Principles Pathway:** If you forget the test, don't panic. Remember that $f'(x)$ is just the slope. Draw a small peak (a local max). To the left, the slope is positive. To the right, the slope is negative. So the derivative must change from positive to negative. The logic for a local min is the reverse. You can re-derive the test in five seconds with a simple sketch.

## Common mistakes
1.  **Confusing $f$ and $f'$:** You use the *sign* of $f'$ to determine the *behavior* of $f$. When creating the sign chart, you plug test points into $f'(x)$, not $f(x)$. When finding the value of an extremum, you plug the critical point into $f(x)$.
2.  **Assuming all critical points are extrema:** The function $f(x) = x^3$ has a critical point at $x=0$ because $f'(0)=0$. However, $f'(x) = 3x^2$ is positive on both sides of $x=0$, so the function is always increasing. It is not a local extremum.
3.  **Forgetting critical points where $f'$ is undefined:** For a function like $f(x) = (x-1)^{2/3}$, the derivative is $f'(x) = \frac{2}{3(x-1)^{1/3}}$, which is undefined at $x=1$. This is a valid critical point (a cusp) and must be included on your sign chart.
4.  **Sloppy interval notation:** Intervals of increasing/decreasing are always open intervals, e.g., $(a, b)$, because at the endpoints (the critical points themselves), the function is neither increasing nor decreasing.

## Self-check
1.  Find the intervals of increase and decrease and all local extrema for $f(x) = x^4 - 8x^2 + 1$.
2.  Analyze the function $g(t) = t e^{-t}$. Where is it increasing and decreasing? Does it have any local extrema?
3.  Find all critical points and local extrema for $h(x) = x - 3x^{1/3}$. Be careful with the derivative.