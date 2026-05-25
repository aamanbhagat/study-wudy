## What it is
Finding the area between curves is the process of using a definite integral to calculate the area of a two-dimensional region bounded by the graphs of two or more functions. We accomplish this by summing the areas of an infinite number of infinitesimally thin rectangular strips, which can be oriented either vertically or horizontally.

## Why it matters
This concept is fundamental to calculating quantities defined over two-dimensional domains. In aerospace engineering, you will use this to find the cross-sectional area of an airfoil to compute lift, or the area of a rocket nozzle throat to analyze thrust. In physics, it's the first step toward finding the center of mass of a lamina (a thin, flat plate) or calculating the work done by a non-uniform pressure field over a surface.

## When to study it
You must have a solid grasp of definite integrals and the Fundamental Theorem of Calculus. Specifically, you should be able to set up and evaluate an integral of the form $\int_a^b f(x) \, dx$ and understand its interpretation as the net signed area between the curve $y=f(x)$ and the x-axis. You also need the algebra skills to find the intersection points of two functions.

## How to study it (step by step)
1.  **Revisit the Riemann Sum.** Remind yourself that $\int_a^b f(x) \, dx$ is the limit of a sum of areas of rectangles, $\lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x$. This is the foundation.
2.  **Derive the Vertical Slice Formula.** Consider two functions, $f(x)$ and $g(x)$, where $f(x) \ge g(x)$ on an interval $[a, b]$. The area of a thin vertical rectangle at position $x$ with width $dx$ has a height of $f(x) - g(x)$. The area of this single rectangle is $dA = [f(x) - g(x)] \, dx$. To find the total area, we sum (integrate) these infinitesimal areas from the leftmost intersection $a$ to the rightmost intersection $b$.
3.  **Solve a canonical vertical slice problem.** Find the area between $y = x$ and $y = x^2$. Find their intersections, identify the "top" and "bottom" functions, set up the integral, and solve.
4.  **Introduce the Horizontal Slice.** Now, consider functions of $y$, like $x = h(y)$ and $x = k(y)$, where $h(y) \ge k(y)$ on an interval $[c, d]$. A thin horizontal rectangle at height $y$ with height $dy$ has a width of $h(y) - k(y)$. Its area is $dA = [h(y) - k(y)] \, dy$.
5.  **Solve a canonical horizontal slice problem.** Find the area between $x = y^2$ and $x = y+2$. Find intersections, identify the "right" and "left" functions, set up the integral with respect to $y$, and solve.
6.  **Practice choosing the right tool.** For a given region, determine which slicing method is more efficient. The key question is: "Does the top/bottom (or right/left) boundary curve change within the region?" If you have to split the integral one way but not the other, the latter is usually simpler.

## Key ideas, with intuition
1.  **Area is a Sum of Infinite Rectangles.** The core idea is unchanged from basic definite integrals. We are just making the rectangles more general. Instead of their height being defined by a single function and the x-axis, their height (or width) is defined by the *difference* between two functions.

2.  **Vertical Slices: `(Top - Bottom) dx`**. Imagine a very thin vertical rectangle at a specific $x$-coordinate. Its width is an infinitesimal change in $x$, which we call $dx$. Its height is the distance from the lower curve to the upper curve. This is simply the y-value of the top curve minus the y-value of the bottom curve.
    $$ \text{Area of one vertical rectangle} = dA = [\underbrace{y_{\text{top}}}_{f(x)} - \underbrace{y_{\text{bottom}}}_{g(x)}] \, \underbrace{dx}_{\text{width}} $$
    The total area is the sum over all possible $x$ values in the region:
    $$ A = \int_{x_{\text{min}}}^{x_{\text{max}}} [f(x) - g(x)] \, dx $$

3.  **Horizontal Slices: `(Right - Left) dy`**. Now, imagine a very thin horizontal rectangle at a specific $y$-coordinate. Its height is an infinitesimal change in $y$, which we call $dy$. Its width is the distance from the left curve to the right curve. This is the x-value of the right curve minus the x-value of the left curve.
    $$ \text{Area of one horizontal rectangle} = dA = [\underbrace{x_{\text{right}}}_{h(y)} - \underbrace{x_{\text{left}}}_{k(y)}] \, \underbrace{dy}_{\text{height}} $$
    The total area is the sum over all possible $y$ values in the region:
    $$ A = \int_{y_{\text{min}}}^{y_{\text{max}}} [h(y) - k(y)] \, dy $$

4.  **Intersection Points define Integration Bounds.** The limits of your integral ($a, b$ or $c, d$) are the coordinates where the bounding curves cross, defining the extent of your region. You must solve for these points algebraically before setting up the integral.

## Worked example
Find the area of the region bounded by the curves $y = \sqrt{x}$, $y = x-2$, and the x-axis ($y=0$).

**1. Sketch the region and find intersections.**
- $y = \sqrt{x}$ is the top half of a sideways parabola.
- $y = x-2$ is a line with slope 1, y-intercept -2.
- $y = 0$ is the x-axis.

Intersections:
- $\sqrt{x} = x-2 \implies x = (x-2)^2 = x^2 - 4x + 4 \implies x^2 - 5x + 4 = 0 \implies (x-4)(x-1)=0$.
  - $x=4 \implies y=2$. This is a valid intersection.
  - $x=1 \implies y=1$. But for $y=x-2$, $y=-1$. This is an extraneous solution from squaring.
- $y = \sqrt{x}$ and $y=0$ intersect at $(0,0)$.
- $y = x-2$ and $y=0$ intersect at $(2,0)$.

The region is a shape with vertices at $(0,0)$, $(2,0)$, and $(4,2)$.

**2. Choose a slicing method.**
- **Vertical Slices (dx):** If we integrate with respect to $x$, the "bottom" curve changes at $x=2$.
  - From $x=0$ to $x=2$, the top curve is $y=\sqrt{x}$ and the bottom is $y=0$.
  - From $x=2$ to $x=4$, the top curve is $y=\sqrt{x}$ and the bottom is $y=x-2$.
  - This requires two separate integrals: $A = \int_0^2 (\sqrt{x} - 0) \, dx + \int_2^4 (\sqrt{x} - (x-2)) \, dx$. This is doable, but complex.

- **Horizontal Slices (dy):** If we integrate with respect to $y$, the region extends from $y=0$ to $y=2$.
  - For any $y$ in this range, the "right" boundary is the line and the "left" boundary is the parabola.
  - We must express the boundaries as functions of $y$:
    - $y = x-2 \implies x = y+2$ (Right curve, $x_{\text{right}}$)
    - $y = \sqrt{x} \implies x = y^2$ (Left curve, $x_{\text{left}}$)
  - This requires only one integral. This is the superior method.

**3. Set up and evaluate the integral.**
We will use the horizontal slice method. The bounds are from $y=0$ to $y=2$.
$$ A = \int_{c}^{d} [x_{\text{right}} - x_{\text{left}}] \, dy $$
$$ A = \int_{0}^{2} [(y+2) - (y^2)] \, dy $$
$$ A = \int_{0}^{2} (-y^2 + y + 2) \, dy $$
Now, find the antiderivative:
$$ A = \left[ -\frac{y^3}{3} + \frac{y^2}{2} + 2y \right]_0^2 $$
Evaluate using the Fundamental Theorem of Calculus:
$$ A = \left( -\frac{2^3}{3} + \frac{2^2}{2} + 2(2) \right) - \left( -\frac{0^3}{3} + \frac{0^2}{2} + 2(0) \right) $$
$$ A = \left( -\frac{8}{3} + \frac{4}{2} + 4 \right) - 0 $$
$$ A = -\frac{8}{3} + 2 + 4 = -\frac{8}{3} + 6 = -\frac{8}{3} + \frac{18}{3} = \frac{10}{3} $$

**Reflection:**
- Sketching the graph was critical to understanding the region's geometry.
- Analyzing both slicing methods beforehand saved significant work; the horizontal slice approach required only one integral instead of two.
- Expressing the boundary curves in terms of the variable of integration ($x$ as a function of $y$) was a necessary algebraic step.
- The final calculation was a straightforward application of the Fundamental Theorem of Calculus.

## Diagrams

**Vertical Slicing (`dx`)**
A representative rectangle has height `Top - Bottom` and width `dx`.

```text
      y
      |
      |      f(x) (Top curve)
      |     /
      |    /|
      |   | | } h = f(x) - g(x)
      |    \|
      |     \
      |      g(x) (Bottom curve)
      |
--a---|----|-|--b------------------ x
      |    dx
```

**Horizontal Slicing (`dy`)**
A representative rectangle has width `Right - Left` and height `dy`.

```text
      y
      |
  d --|---------/----
      |        /|
      |       / |
      |      |--|-- dy
      | k(y) | w | h(y)
      | (Left)  (Right)
      |      \  |
      |       \ |
  c --|--------\|----
      |
------|---------------------------- x
      |
      w = h(y) - k(y)
```

## Memory technique — remember this forever
1.  **The Visual Hook:** Think of a **"Vertical Rainstorm"** vs. a **"Horizontal Laser Scan"**.
    - For a **Vertical Rainstorm**, raindrops fall straight down. The length of a single raindrop streak inside the region is `Top y - Bottom y`. You sum these streaks along the x-axis, so you integrate `(Top - Bottom) dx`.
    - For a **Horizontal Laser Scan**, a laser beam sweeps up from the bottom. The length of the beam inside the region is `Right x - Left x`. You sum these sweeps along the y-axis, so you integrate `(Right - Left) dy`.

2.  **Formulas to Overlearn:**
    - Vertical Slices: $$A = \int_a^b [y_{\text{top}}(x) - y_{\text{bottom}}(x)] \, dx$$
    - Horizontal Slices: $$A = \int_c^d [x_{\text{right}}(y) - x_{\text{left}}(y)] \, dy$$

3.  **Spaced Repetition Schedule:** Review this concept and re-work one problem at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, rebuild it from a single rectangle.
    - Draw the region.
    - Draw one thin rectangle inside it (either vertical or horizontal).
    - Label its dimensions. A vertical rectangle has width $dx$. Its height is the difference in y-coordinates: $y_{top} - y_{bottom}$.
    - Write the area of that one rectangle: $dA = (y_{top} - y_{bottom})dx$.
    - The total area $A$ is the "sum" (integral) of all these little areas: $A = \int dA$. This forces you to derive the correct formula on the spot.

## Common mistakes
1.  **`Top - Bottom` becomes `Bottom - Top`:** Subtracting in the wrong order gives a negative area. Area is a physical quantity and must be positive. Always do `(Larger coordinate) - (Smaller coordinate)`. For vertical slices, this is `Top y - Bottom y`. For horizontal slices, it's `Right x - Left x`.
2.  **Mixing Variables:** Setting up an integral like $\int_a^b (y^2 - 2y) \, dx$. The function being integrated must be in terms of the variable of integration. If you have a $dx$, all variables inside must be $x$. If you have a $dy$, all variables must be $y$.
3.  **Incorrect Bounds:** Using y-values for a $dx$ integral or x-values for a $dy$ integral. The bounds must always correspond to the variable of integration. Find the intersection points and use the correct coordinate.
4.  **Failure to Split Integrals:** If the "top" curve or the "right" curve changes partway through the region, you must split the integral at that point. A single integral can only handle one `Top - Bottom` or `Right - Left` relationship.

## Self-check
1.  Find the area of the finite region enclosed by the parabolas $y = x^2$ and $y = 2x - x^2$.
2.  Find the area of the region enclosed by the line $y=x-1$ and the parabola $y^2 = 2x+6$. Which slicing method is more direct?
3.  Set up the integral(s) to find the area of the triangle with vertices at $(0,0)$, $(2,4)$, and $(6,2)$. Solve it using both vertical and horizontal slices. Verify you get the same answer.