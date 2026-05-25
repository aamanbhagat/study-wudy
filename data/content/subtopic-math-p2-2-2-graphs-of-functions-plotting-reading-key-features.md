## What it is
A graph of a function is a visual representation of the relationship between inputs and outputs. By plotting the input $x$ on the horizontal axis and the output $f(x)$ on the vertical axis, we translate algebraic equations into geometric curves, allowing us to instantly see patterns, limits, and rates of change.

## Why it matters
In physics and rocket science, graphs are how you visualize trajectories, velocity over time, and energy wells. If you plot a rocket's altitude as a function of time, the graph's peak is the apogee, and its slope is the vertical velocity. In machine learning, training a model involves graphing a "loss function" and finding its lowest point (the minimum error) via gradient descent. Reading a graph fluently allows you to instantly diagnose where a system is stable, where it fails, and how it scales.

## When to study it
You must already understand:
1. The Cartesian coordinate system (how to plot $(x,y)$ points).
2. Basic algebraic evaluation (plugging a number into an expression and calculating the result).
3. The formal definition of a function (every input yields exactly one output).

If you cannot confidently evaluate $f(-2)$ for $f(x) = 3x^2 - 1$, or if you do not know which axis is $x$ and which is $y$, return to basic coordinate geometry and algebraic expressions.

## How to study it (step by step)
1. **Plot by brute force:** Choose a function, pick 5 to 7 integer values for $x$ (spanning negative, zero, and positive), calculate $f(x)$ for each, plot the $(x, f(x))$ points, and connect them smoothly. 
2. **Find the $y$-intercept:** Set $x = 0$ and evaluate $f(0)$. This is where the graph crosses the vertical axis.
3. **Find the $x$-intercepts (roots):** Set $f(x) = 0$ and solve for $x$. These are the points where the graph crosses the horizontal axis. 
4. **Identify extrema:** Visually scan the graph for local "peaks" (maxima) and "valleys" (minima). 
5. **Determine intervals of increase/decrease:** Trace the graph from left to right. Note the $x$-intervals where the $y$-values are rising (increasing) or falling (decreasing).
6. **Apply the Vertical Line Test:** Draw vertical lines through your graph. If any line touches the curve more than once, your curve does not represent a function.

## Key ideas, with intuition

**1. The Graph as an Infinite Set of Points**
The graph of a function $f$ is literally the set of all ordered pairs $(x, f(x))$ in the domain. 
Intuition: Imagine plotting a point for $x=1$, then $x=1.1$, then $x=1.01$. As you plot points for every conceivable real number, the infinite dots merge into a solid, continuous curve. 

**2. Intercepts (The Crossings)**
Intercepts are the anchors of a graph.
*   **$y$-intercept:** The output when the input is zero. In physics, this is often the "initial state" (e.g., launch height at $t=0$).
*   **$x$-intercepts (Roots/Zeros):** The inputs that yield an output of zero. In physics, this is often the "impact point" (when height is zero).

**3. Domain and Range (The Bounding Box)**
*   **Domain:** The shadow the graph casts on the $x$-axis. It is the set of all valid inputs.
*   **Range:** The shadow the graph casts on the $y$-axis. It is the set of all possible outputs.

**4. Extrema (Peaks and Valleys)**
A local maximum is a point higher than all points immediately around it; a local minimum is lower than all points around it. These represent optimal states—maximum altitude, minimum fuel consumption, or zero error.

## Worked example
Graph the function $f(x) = -x^2 + 4$ and identify its key features.

**Step 1: Find the $y$-intercept.**
Set $x = 0$:
$$f(0) = -(0)^2 + 4 = 4$$
The $y$-intercept is $(0, 4)$.

**Step 2: Find the $x$-intercepts.**
Set $f(x) = 0$:
$$-x^2 + 4 = 0$$
$$x^2 = 4$$
$$x = \pm 2$$
The $x$-intercepts are $(-2, 0)$ and $(2, 0)$.

**Step 3: Plot intermediate points.**
Choose $x = 1$: $f(1) = -(1)^2 + 4 = 3 \implies (1, 3)$.
Choose $x = -1$: $f(-1) = -(-1)^2 + 4 = 3 \implies (-1, 3)$.

**Step 4: Identify key features from the points.**
*   **Extrema:** The highest point is $(0, 4)$. This is the absolute maximum.
*   **Increasing/Decreasing:** The graph goes up from $x = -\infty$ to $x = 0$ (increasing). It goes down from $x = 0$ to $x = \infty$ (decreasing).
*   **Domain:** All real numbers, $x \in (-\infty, \infty)$.
*   **Range:** The highest $y$-value is 4, and it goes down forever. $y \in (-\infty, 4]$.

*Reflection:* By systematically finding the intercepts and the peak, we anchored the geometry of the parabola without needing to plot 50 random points. The math dictated the shape.

## Diagrams

```text
          y
          ^
          |
       (0,4)  <-- Maximum / y-intercept
        __*__
      /   |   \
   (1,3)  |  (-1,3)
    *     |     *
   /      |      \
--*-------+-------*--> x
(-2,0)    |     (2,0)  <-- x-intercepts (Roots)
 /        |        \
          |
```

## Memory technique — remember this forever

1. **The Visual Hook:** "X marks the ground, Y is the sky." 
   * $x$-intercepts are where the rocket hits the ground ($y=0$).
   * $y$-intercept is where the rocket is in the sky at launch ($x=0$).
2. **Must Overlearn:**
   * To find $y$-intercept: Calculate $f(0)$.
   * To find $x$-intercept: Solve $f(x) = 0$.
3. **Spaced-repetition schedule:** Review these definitions and plot one random quadratic or linear function at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget every rule about graphing, remember that a graph is just a collection of $(x, y)$ pairs where $y = f(x)$. You can *always* build a table of $x$ values, compute the $y$ values, and plot the dots. Brute force will always save you.

## Common mistakes
1. **Swapping zero-substitutions for intercepts:** Students frequently set $y=0$ when they want the $y$-intercept. Remember: to find where it crosses a specific axis, you set the *other* variable to zero.
2. **Reading increasing/decreasing wrong:** You must read graphs from left to right, just like an English book. If a line points to the top-left, it is *decreasing* because as $x$ moves right, $y$ moves down.
3. **Confusing domain limits with drawing limits:** Just because a textbook drawing of a line stops at $x=5$ doesn't mean the function's domain stops there. Unless there is a solid dot ending the line, assume it continues to infinity.

## Self-check
1. Find the $x$ and $y$ intercepts of the function $f(x) = 3x - 6$.
2. If a continuous graph has a local minimum at $(2, -5)$, what must be true about the function's increasing/decreasing behavior immediately before and after $x=2$?
3. Given the function $f(x) = \frac{1}{x}$, attempt to find the $y$-intercept. Why does this calculation fail, and what does that geometric failure look like on the graph?