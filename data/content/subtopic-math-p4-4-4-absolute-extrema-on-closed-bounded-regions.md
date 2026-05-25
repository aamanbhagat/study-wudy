## What it is
Finding the absolute extrema of a function $z = f(x, y)$ on a closed, bounded region $R$ in the $xy$-plane is the process of locating the absolute highest and lowest points on the surface defined by $f$ over that specific domain. A "closed" region includes its boundary (like a square including its edges), and a "bounded" region can be enclosed in a finite disk (it doesn't go off to infinity). The Extreme Value Theorem guarantees that a continuous function on such a region will always have an absolute maximum and an absolute minimum.

## Why it matters
This is the core of constrained optimization, a fundamental problem in science and engineering. In aerospace, you might need to find the maximum temperature or stress on a component like a turbine blade, where the domain is the physical shape of the blade. In machine learning, you often optimize a loss function subject to constraints on the parameters (e.g., weights must be within a certain range), which defines a closed, bounded region in a high-dimensional space.

## When to study it
You must be proficient with the following before tackling this topic:
1.  **Single-Variable Extrema:** Finding absolute extrema for a function $g(x)$ on a closed interval $[a, b]$. The method here is a direct generalization of that.
2.  **Partial Derivatives:** Calculating $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$.
3.  **Finding Critical Points:** Solving the system of equations $\nabla f(x, y) = \vec{0}$, which is $\frac{\partial f}{\partial x} = 0$ and $\frac{\partial f}{\partial y} = 0$.
4.  **Parametrizing Curves:** Describing a curve (like the boundary of your region) as a function of a single variable, e.g., $(x(t), y(t))$.

If any of these are weak, master them first. There is no way to succeed here without them.

## How to study it (step by step)
1.  **Re-derive the 1D case.** Take a function $g(x)$ on $[a, b]$. Remind yourself why the absolute extremum must occur either where $g'(x) = 0$ or at the endpoints $x=a, x=b$. This is the foundational logic.
2.  **Understand the guarantee.** Read and internalize the Extreme Value Theorem for functions of two variables. The key takeaway is: for a continuous function $f$ on a closed, bounded set $R$, a solution is *guaranteed* to exist. Your job is just to find it.
3.  **Master the algorithm.** Write down and commit to memory the three-step procedure:
    a. Find all critical points of $f$ that lie in the *interior* of $R$.
    b. Find the extreme values of $f$ on the *boundary* of $R$.
    c. Compare the function values from all points found in steps (a) and (b). The largest is the absolute maximum, and the smallest is the absolute minimum.
4.  **Practice boundary analysis on a rectangle.** Take a simple polynomial $f(x, y)$ and a rectangular region. The boundary consists of four line segments. For each segment, you substitute the line's equation (e.g., $y=c$) into $f(x, y)$ to get a single-variable function, then find its extrema on the relevant interval. This is the most direct application of step (3b).
5.  **Practice boundary analysis on a triangle.** Repeat the process for a triangular region. Now the boundary segments are lines like $y = mx+b$. The substitution will be more involved, but the principle is identical.
6.  **Practice boundary analysis on a disk.** For a region like $x^2 + y^2 \le 1$, the boundary is the circle $x^2 + y^2 = 1$. Here, you must use parametrization: $x(t) = \cos(t)$, $y(t) = \sin(t)$ for $t \in [0, 2\pi]$. Substitute these into $f(x, y)$ to get a function $g(t) = f(\cos t, \sin t)$, and find its extrema using 1D calculus.

## Key ideas, with intuition
1.  **The Mountain and the Shoreline.** Imagine the surface $z = f(x, y)$ is a mountainous island. The closed, bounded region $R$ is the map of the island. You are looking for the highest and lowest points on the island. Logically, the highest point must either be a peak somewhere in the interior of the island, or a high point on a seaside cliff, right at the boundary. The same is true for the lowest point. There are no other possibilities.
2.  **Interior Peaks are Flat.** A "peak" in the interior (a local max or min) must be a place where the surface is locally flat. This is the geometric meaning of a critical point, where the tangent plane is horizontal.
    $$ \nabla f(x, y) = \left\langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \right\rangle = \vec{0} $$
3.  **The Boundary is a 1D Problem in Disguise.** Analyzing the entire boundary seems hard. But you can "walk along the shoreline" by parametrizing it. This reduces the two-variable function $f(x, y)$ to a single-variable function of the parameter you used (e.g., $t$). Now you are just finding the max/min of a function $g(t)$ on an interval, a problem you have already solved.

## Worked example
Find the absolute maximum and minimum values of $f(x, y) = 2x^2 + y^2 - 4x - 2y + 3$ on the rectangular region $R$ defined by $0 \le x \le 3$ and $0 \le y \le 2$.

**Step 1: Find interior critical points.**
First, compute the partial derivatives and set them to zero.
$$ \frac{\partial f}{\partial x} = 4x - 4 = 0 \implies x = 1 $$
$$ \frac{\partial f}{\partial y} = 2y - 2 = 0 \implies y = 1 $$
The only critical point is $(1, 1)$. Is this point in the interior of $R$? Yes, since $0 < 1 < 3$ and $0 < 1 < 2$.
We evaluate $f$ at this point: $f(1, 1) = 2(1)^2 + (1)^2 - 4(1) - 2(1) + 3 = 2+1-4-2+3 = 0$.
This is our first candidate value.

**Step 2: Find extreme values on the boundary.**
The boundary consists of four line segments. We analyze each one.

*   **L1 (Bottom edge):** $y=0$, for $0 \le x \le 3$.
    $g_1(x) = f(x, 0) = 2x^2 - 4x + 3$.
    To find extrema on $[0, 3]$, we check the derivative: $g_1'(x) = 4x - 4 = 0 \implies x=1$.
    This gives a candidate point $(1, 0)$. We must also check the endpoints of the segment, $(0, 0)$ and $(3, 0)$.
*   **L2 (Right edge):** $x=3$, for $0 \le y \le 2$.
    $g_2(y) = f(3, y) = 2(3)^2 + y^2 - 4(3) - 2y + 3 = 18 + y^2 - 12 - 2y + 3 = y^2 - 2y + 9$.
    $g_2'(y) = 2y - 2 = 0 \implies y=1$.
    This gives a candidate point $(3, 1)$. We also check the endpoints, $(3, 0)$ and $(3, 2)$.
*   **L3 (Top edge):** $y=2$, for $0 \le x \le 3$.
    $g_3(x) = f(x, 2) = 2x^2 + (2)^2 - 4x - 2(2) + 3 = 2x^2 - 4x + 3$.
    This is the same function as $g_1(x)$. The critical point is at $x=1$.
    This gives a candidate point $(1, 2)$. The endpoints are $(0, 2)$ and $(3, 2)$.
*   **L4 (Left edge):** $x=0$, for $0 \le y \le 2$.
    $g_4(y) = f(0, y) = y^2 - 2y + 3$.
    $g_4'(y) = 2y - 2 = 0 \implies y=1$.
    This gives a candidate point $(0, 1)$. The endpoints are $(0, 0)$ and $(0, 2)$.

**Step 3: Compare all candidate values.**
We have a list of candidate points: the interior point $(1, 1)$ and all the points from the boundary analysis (critical points on edges and all four corners). Let's evaluate $f$ at each unique point.
*   $f(1, 1) = 0$ (Interior critical point)
*   $f(1, 0) = 2(1)^2 - 4(1) + 3 = 1$
*   $f(0, 0) = 3$
*   $f(3, 0) = 2(3)^2 - 4(3) + 3 = 18 - 12 + 3 = 9$
*   $f(3, 1) = (1)^2 - 2(1) + 9 = 8$
*   $f(3, 2) = (2)^2 - 2(2) + 9 = 9$
*   $f(1, 2) = 2(1)^2 - 4(1) + 3 = 1$
*   $f(0, 1) = (1)^2 - 2(1) + 3 = 2$
*   $f(0, 2) = (2)^2 - 2(2) + 3 = 3$

Scanning the list of values $\{0, 1, 3, 9, 8, 1, 2, 3\}$, the maximum value is 9 and the minimum value is 0.

**Conclusion:**
*   The absolute maximum is $9$, which occurs at $(3, 0)$ and $(3, 2)$.
*   The absolute minimum is $0$, which occurs at $(1, 1)$.

**Reflection:** Each step was necessary. Step 1 found the "valley" in the middle of the region. Step 2 systematically checked the four "walls" of the region, finding their highest and lowest points. Step 3 was a simple comparison to declare the overall winner. Forgetting any step could lead to missing an extremum.

## Diagrams
Here is the region $R$ in the $xy$-plane with the candidate points marked. `C` is the interior critical point, `B` are boundary critical points, and `V` are the vertices (corners).

```text
      y
      ^
      |
    2 + V-(B)-V -----> x=3, y=2
      | |     |
      | B     B
      | |     |
    1 + B--C--B -----> y=1
      | |     |
      | B     B
      | |     |
    0 + V-(B)-V -----> x=3, y=0
      +---------------------> x
        0  1  2  3
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Inside and Out" or "The King of the Island". To find the absolute ruler (extremum), you must check the capital city in the **inside** (interior critical points) and patrol the entire border **out**post by outpost (boundary analysis). The king could be at an inland peak or on a coastal cliff.

2.  **Formulas/Facts to Overlearn:** This is not about a formula, but a procedure. Burn this into your mind:
    *   **Step 1:** Find $(x, y)$ in the interior of $R$ where $\nabla f(x, y) = \vec{0}$.
    *   **Step 2:** Find extrema of $f$ on the boundary of $R$.
    *   **Step 3:** Compare all values from steps 1 and 2.

3.  **Spaced Repetition Schedule:** Do a new problem of this type at these intervals:
    *   1 day from now.
    *   3 days from now.
    *   7 days from now.
    *   16 days from now.
    *   35 days from now.

4.  **First Principles Pathway:** If you forget the procedure, re-derive it from logic. An absolute extremum of a continuous function on a closed, bounded set must exist (EVT). It can either be in the interior or on the boundary. If it's in the interior and the function is differentiable, its tangent plane must be horizontal, so $\nabla f = \vec{0}$. If it's on the boundary, then it must be an extremum *relative to the boundary*. This reduces the problem to analyzing the boundary, which is a 1D curve, a problem you already know how to solve from single-variable calculus.

## Common mistakes
1.  **Forgetting the boundary.** The most common error is to only find the interior critical points using $\nabla f = \vec{0}$ and stop, completely ignoring the boundary.
2.  **Only checking the corners.** Students sometimes check the interior points and then only the vertices (corners) of the region, forgetting that an extremum on the boundary can occur *between* the corners.
3.  **Ignoring the domain.** Finding a critical point $(x_0, y_0)$ and then failing to check if it is actually *inside* the region $R$. If it's outside, you discard it.
4.  **Algebraic errors in boundary reduction.** When you substitute $y = g(x)$ into $f(x, y)$, the resulting single-variable function can be complex. A simple mistake here will corrupt the entire analysis for that boundary segment. Be meticulous.

## Self-check
1.  Find the absolute extrema of $f(x, y) = 5 - 3x + 4y$ on the triangular region with vertices $(0, 0)$, $(4, 0)$, and $(4, 5)$.
2.  Find the absolute extrema of $f(x, y) = xy^2$ on the region $R = \{(x, y) | x \ge 0, y \ge 0, x^2 + y^2 \le 3\}$.
3.  A flat circular plate has the shape of the region $x^2 + y^2 \le 1$. The temperature at any point $(x, y)$ is given by $T(x, y) = x^2 + 2y^2 - x$. Find the temperatures at the hottest and coldest points on the plate.