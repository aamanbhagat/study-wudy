## What it is
A double integral over a general region is a method for integrating a function of two variables, $f(x,y)$, over a two-dimensional domain $D$ that is not a simple rectangle. We accomplish this by expressing the limits of the inner integral as functions that trace the boundary of the region, effectively "slicing" the domain into infinitesimally thin strips. This extends the concept of finding the volume under a surface from rectangular bases to more complex shapes.

## Why it matters
This technique is fundamental for calculating physical quantities over non-uniform, non-rectangular objects. In aerospace, you will use this to find the mass or center of mass of an irregularly shaped fuselage panel with varying density. In machine learning, it's used to calculate probabilities from joint probability density functions over specific regions of the state space.

## When to study it
You must have a firm grasp of single-variable definite integrals (including the Fundamental Theorem of Calculus) and double integrals over rectangular regions. You should also be comfortable visualizing and sketching functions of one variable, like lines and parabolas, to define the integration domains. If you cannot confidently integrate $\int_0^1 \int_0^2 (x^2+y) \, dx \, dy$, review that topic first.

## How to study it (step by step)
1.  **Review Rectangular Regions:** Solve a simple double integral like $\int_0^1 \int_0^\pi y \sin(x) \, dx \, dy$. Notice how the limits are all constants. This is the foundation.
2.  **Visualize a Type I Region:** Draw the region bounded by $y=x^2$ and $y=x$. See that for any $x$ between 0 and 1, the region is bounded *below* by $g_1(x) = x^2$ and *above* by $g_2(x) = x$. This is the geometric meaning of a Type I ("vertically simple") region.
3.  **Set up the Type I Integral:** Based on the visualization, write the iterated integral. The outer integral has constant limits for $x$ (from $0$ to $1$). The inner integral has function limits for $y$ (from $x^2$ to $x$). The differential order must be $dy \, dx$.
4.  **Visualize a Type II Region:** Draw a new region, for instance the one bounded by $x=y^2$ and $x=1$. See that for any $y$ between -1 and 1, the region is bounded on the *left* by $h_1(y) = y^2$ and on the *right* by $h_2(y) = 1$. This is a Type II ("horizontally simple") region.
5.  **Set up the Type II Integral:** Write the iterated integral. The outer integral has constant limits for $y$. The inner integral has function limits for $x$. The differential order must be $dx \, dy$.
6.  **Practice Switching Order:** Take the region from step 2 and try to describe it as a Type II region. You'll need to rewrite the bounding functions as $x=y$ and $x=\sqrt{y}$. This is a critical skill for solving integrals that are difficult or impossible in one order.

## Key ideas, with intuition
1.  **Slicing the Domain:** The core idea is to slice the 2D domain $D$ into thin strips.
    *   **Type I:** We make vertical slices. For each slice at a fixed $x$, $y$ runs from a bottom curve $g_1(x)$ to a top curve $g_2(x)$. We then sum up these slices as $x$ moves from a constant $a$ to a constant $b$.
    *   **Type II:** We make horizontal slices. For each slice at a fixed $y$, $x$ runs from a left curve $h_1(y)$ to a right curve $h_2(y)$. We then sum up these slices as $y$ moves from a constant $c$ to a constant $d$.

2.  **Variable Limits of Integration:** The innovation is that the limits of the *inner* integral are functions. This is what allows us to handle curved boundaries. The inner integral evaluates to a function of the outer variable, which you then integrate.
    $$ \underbrace{\int_a^b \left[ \int_{g_1(x)}^{g_2(x)} f(x,y) \, dy \right] dx}_{\text{The inner integral results in a function of } x} $$

3.  **Outer Limits Must Be Constant:** The final result of a definite double integral must be a scalar value (e.g., volume, mass). This is only possible if the limits of the *outer* integral are constants. If they were functions, the final result would be a function, which makes no sense for this context.

4.  **Fubini's Theorem for General Regions:** This theorem guarantees that if $f(x,y)$ is continuous on a region $D$ that is both Type I and Type II, then both orders of integration will yield the same result.
    $$ \int_a^b \int_{g_1(x)}^{g_2(x)} f(x,y) \, dy \, dx = \int_c^d \int_{h_1(y)}^{h_2(y)} f(x,y) \, dx \, dy $$
    Choosing the right order can make an impossible integral trivial.

## Worked example
Calculate $\iint_D (x+2y) \, dA$ where $D$ is the region bounded by the parabolas $y=2x^2$ and $y=1+x^2$.

**Step 1: Sketch the region and classify it.**
First, find the intersection points by setting the equations equal: $2x^2 = 1+x^2 \implies x^2=1 \implies x = \pm 1$. The intersection points are $(-1, 2)$ and $(1, 2)$.
The region is bounded below by $y=2x^2$ and above by $y=1+x^2$ for $x \in [-1, 1]$. This is a classic Type I region.

**Step 2: Set up the iterated integral.**
The region is defined by $-1 \le x \le 1$ and $2x^2 \le y \le 1+x^2$.
The integral is:
$$ I = \int_{-1}^{1} \int_{2x^2}^{1+x^2} (x+2y) \, dy \, dx $$

**Step 3: Evaluate the inner integral (with respect to $y$).**
Treat $x$ as a constant.
$$ \int_{2x^2}^{1+x^2} (x+2y) \, dy = \left[ xy + y^2 \right]_{y=2x^2}^{y=1+x^2} $$
$$ = \left( x(1+x^2) + (1+x^2)^2 \right) - \left( x(2x^2) + (2x^2)^2 \right) $$
$$ = (x+x^3 + 1+2x^2+x^4) - (2x^3 + 4x^4) $$
$$ = -3x^4 - x^3 + 2x^2 + x + 1 $$

**Step 4: Evaluate the outer integral (with respect to $x$).**
Now we integrate the result from Step 3.
$$ I = \int_{-1}^{1} (-3x^4 - x^3 + 2x^2 + x + 1) \, dx $$
$$ = \left[ -\frac{3}{5}x^5 - \frac{1}{4}x^4 + \frac{2}{3}x^3 + \frac{1}{2}x^2 + x \right]_{-1}^{1} $$
$$ = \left(-\frac{3}{5} - \frac{1}{4} + \frac{2}{3} + \frac{1}{2} + 1\right) - \left(\frac{3}{5} - \frac{1}{4} - \frac{2}{3} + \frac{1}{2} - 1\right) $$
Notice that the terms with even powers ($x^4, x^2$) will cancel out, and the terms with odd powers ($x^5, x^3, x$) will double.
$$ = 2 \left(-\frac{3}{5} + \frac{2}{3} + 1\right) = 2 \left(\frac{-9+10+15}{15}\right) = 2 \left(\frac{16}{15}\right) = \frac{32}{15} $$

**Reflection:**
- Sketching the region in Step 1 was essential. It immediately revealed the structure as Type I and gave us the constant bounds for $x$.
- Setting up the integral in Step 2 required translating the "top" and "bottom" curves into the upper and lower limits of the inner integral.
- The inner integration in Step 3 correctly treated $x$ as a constant.
- The final integration in Step 4 was a standard single-variable integral, which is always the last step.

## Diagrams
A Type I (vertically simple) region:
```text
      y
      ^
      |
      | . . . . . . . . . . . . . y = g2(x)
      |           . . . . .
      |         . | .       .
      |       .   |   .       .
      |     .     |     .       .  <-- A vertical slice at a fixed x
      |   .       |       .       .
      | . . . . . | . . . . . . . .
      | . . . . . . . . . . . . . y = g1(x)
      |
      +---|---------|-------------|-----> x
          a         x             b
```

A Type II (horizontally simple) region:
```text
      y
      ^
      |
      d + . . . . . . . . . . . . .
      |   .         .
      |     .         .
      y ----.-----------.-----------  <-- A horizontal slice at a fixed y
      |     .         .
      |   .         .
      c + . . . . . . . . . . . . .
      |
      +-----------------------------> x
        x=h1(y)   x=h2(y)
```

## Memory technique — remember this forever
1.  **Visual Hook:**
    *   **Type I**: The Roman numeral **I** is a **V**ertical line. Integrate with respect to **y** first (the vertical axis). Your slices are vertical.
    *   **Type II**: Imagine rotating the Roman numeral **II** by 90 degrees. It looks like an equals sign `=`, which is **H**orizontal. Integrate with respect to **x** first (the horizontal axis). Your slices are horizontal.

2.  **Formulas to Overlearn:** Burn these into your memory.
    *   **Type I (Vertical Slices):**
        $$ \iint_D f(x,y) \, dA = \int_a^b \int_{g_1(x)}^{g_2(x)} f(x,y) \, dy \, dx $$
        ($y$ is a function of $x$, $x$ has constant bounds)
    *   **Type II (Horizontal Slices):**
        $$ \iint_D f(x,y) \, dA = \int_c^d \int_{h_1(y)}^{h_2(y)} f(x,y) \, dx \, dy $$
        ($x$ is a function of $y$, $y$ has constant bounds)

3.  **Spaced Repetition Schedule:**
    *   Review these formulas and the visual hook in **1 day**.
    *   Solve a new problem in **3 days**.
    *   Re-derive the setup for a triangular region in **7 days**.
    *   Explain the difference between Type I and Type II to an imaginary student in **16 days**.
    *   Solve a problem that requires changing the order of integration in **35 days**.

4.  **First Principles Pathway:** If you forget everything, rebuild from the idea of volume. The integral $\iint_D f(x,y) \, dA$ is the volume under the surface $z=f(x,y)$ over the domain $D$. You can calculate this volume by slicing.
    *   Pick an axis to slice along, say the x-axis. A slice at a particular $x_i$ is a 2D cross-section.
    *   The area of this cross-section is $A(x_i) = \int_{g_1(x_i)}^{g_2(x_i)} f(x_i, y) \, dy$. This is the inner integral.
    *   To get the total volume, you "add up" the volumes of all the thin slices, $A(x) \Delta x$, which in the limit becomes the outer integral: $V = \int_a^b A(x) \, dx$.
    *   Combine them: $V = \int_a^b \left( \int_{g_1(x)}^{g_2(x)} f(x,y) \, dy \right) dx$. You have just re-derived the Type I formula.

## Common mistakes
1.  **Function on the Outer Limits:** Never write an integral like $\int_{x^2}^x \int_a^b \dots$. The outer limits *must* be constants for the final answer to be a number.
2.  **Mismatched Differentials:** The limits must match the variable of integration. Writing $\int_a^b \int_{g_1(x)}^{g_2(x)} f(x,y) \, \mathbf{dx \, dy}$ is wrong. The inner limits are functions of $x$, so the inner differential must be $dy$.
3.  **Incorrectly Changing Integration Order:** When you switch from $dy \, dx$ to $dx \, dy$, you cannot simply swap the limits. You must redraw the region and re-derive the new limits from the geometry. For the region bounded by $y=x$, $y=0$, and $x=1$, the integral $\int_0^1 \int_0^x \dots dy \, dx$ becomes $\int_0^1 \int_y^1 \dots dx \, dy$, not $\int_0^x \int_0^1 \dots dx \, dy$.

## Self-check
1.  Set up the double integral to find the volume under the plane $z=2x+y$ over the region $D$ bounded by $y=x$ and $y=x^2-2$. Do not evaluate.
2.  Consider the integral $\int_0^1 \int_{\sqrt{x}}^1 \sin(y^3) \, dy \, dx$. Why is this difficult to evaluate as written? Sketch the region of integration and set up the equivalent integral with the order of integration reversed.
3.  Set up the integral(s) to find the area of the region bounded by the x-axis, the line $y=x-1$, and the line $y=-x+3$. You may need to split the region into two parts.