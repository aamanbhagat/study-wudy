## What it is
Kinematic graphs are visual tools that plot an object's position ($x$), velocity ($v$), or acceleration ($a$) against time ($t$). The shape of each graph—specifically its slope and the area underneath it—provides a complete description of the object's one-dimensional motion. These graphs allow us to understand the relationships between these three kinematic quantities without complex algebra.

## Why it matters
This is the language of motion. In aerospace, engineers analyze telemetry from a rocket launch by plotting altitude, velocity, and g-force against time; these are just $x-t$, $v-t$, and $a-t$ graphs. In robotics and machine learning, planning the path for a robot arm or a self-driving car involves generating and following precise velocity and acceleration profiles to ensure smooth, efficient movement.

## When to study it
Before tackling this, you must have a solid grasp of the following:
*   **Definitions of Kinematic Quantities:** You must know what displacement ($x$), velocity ($v$), and acceleration ($a$) are, including the distinction between average and instantaneous values.
*   **Basic Algebra & Geometry:** You must be able to calculate the slope of a line ($m = \frac{y_2 - y_1}{x_2 - x_1}$) and find the area of simple shapes like rectangles and triangles.

A preliminary understanding of calculus (derivatives and integrals) is beneficial, as these graphical methods are the physical representation of those operations. We will build that intuition here.

## How to study it (step by step)
1.  **Master the Slopes.** Draw a position-time ($x-t$) graph that is a straight line, e.g., passing through $(0s, 2m)$ and $(4s, 10m)$. Calculate its slope. Note the units: $(10m - 2m) / (4s - 0s) = 8m / 4s = 2 \text{ m/s}$. This is velocity. Internalize: **The slope of an $x-t$ graph is velocity.** Repeat this for a $v-t$ graph to see that its slope is acceleration.
2.  **Master the Areas.** Draw a velocity-time ($v-t$) graph that is a horizontal line at $v = 5 \text{ m/s}$ from $t=0$ to $t=4$s. Calculate the area of the rectangle formed under the line. Note the units: $(5 \text{ m/s}) \times (4 \text{ s}) = 20 \text{ m}$. This is displacement. Internalize: **The area under a $v-t$ graph is displacement.** Repeat for an $a-t$ graph to see the area is the change in velocity.
3.  **Connect the Graphs (Forward).** Start with a simple $x-t$ graph of an object accelerating, which is a parabola opening upwards (e.g., $x = t^2$). At $t=0$, the slope is zero. At $t=1$, the slope is steeper. At $t=2$, it's steeper still. Sketch the corresponding $v-t$ graph: since the slope of $x-t$ is increasing steadily, the $v-t$ graph is a straight line with a positive slope. Now, what's the slope of that $v-t$ graph? It's a constant positive value. So, the $a-t$ graph is a horizontal line above the t-axis. You have just performed graphical differentiation.
4.  **Connect the Graphs (Backward).** Start with a simple $a-t$ graph: a horizontal line at $a = 2 \text{ m/s}^2$. Find the area under it from $t=0$ to $t=3$s. The area is $2 \times 3 = 6 \text{ m/s}$. This is the *change* in velocity, $\Delta v$. If $v_0=0$, the $v-t$ graph is a line from $(0,0)$ to $(3,6)$. Now find the area under that $v-t$ graph (a triangle). The area is $\frac{1}{2} \times 3 \times 6 = 9 \text{ m}$. This is the displacement, $\Delta x$. You have just performed graphical integration.
5.  **Solve a Piecewise Problem.** Find a problem with a $v-t$ graph shaped like a trapezoid (accelerate, cruise, decelerate). For each segment, calculate the slope (acceleration) and the area (displacement). Sum the areas to find the total displacement. Sketch the corresponding $a-t$ and $x-t$ graphs.

## Key ideas, with intuition
1.  **Slope is the Rate of Change.** The fundamental idea of a slope is "rise over run," or how much the vertical quantity changes for a given change in the horizontal quantity. In physics, time is almost always the "run."
    *   The slope of the position-time graph is the rate of change of position, which is the definition of velocity.
        $$v(t) = \frac{dx}{dt} \approx \frac{\Delta x}{\Delta t} = \text{slope of } x-t \text{ graph}$$
    *   The slope of the velocity-time graph is the rate of change of velocity, which is the definition of acceleration.
        $$a(t) = \frac{dv}{dt} \approx \frac{\Delta v}{\Delta t} = \text{slope of } v-t \text{ graph}$$

2.  **Area is the Accumulation of Effect.** The fundamental idea of the area under a curve is multiplying the vertical quantity by the horizontal quantity and summing the results.
    *   The area under the velocity-time graph "accumulates" the effect of velocity over time. A velocity of $v$ applied for a time $\Delta t$ produces a displacement of $\Delta x = v \cdot \Delta t$. Summing these slivers of area gives the total displacement.
        $$\Delta x = \int v(t) dt = \text{Area under } v-t \text{ graph}$$
    *   The area under the acceleration-time graph accumulates the effect of acceleration over time. An acceleration $a$ applied for a time $\Delta t$ produces a change in velocity of $\Delta v = a \cdot \Delta t$. Summing these gives the total change in velocity.
        $$\Delta v = \int a(t) dt = \text{Area under } a-t \text{ graph}$$

3.  **The Hierarchy of Motion.** The three graphs are fundamentally linked. They form a hierarchy based on the operations of calculus (which we are treating graphically as slopes and areas).
    *   **Going "down" (from $x$ to $v$ to $a$):** You take the **slope**.
    *   **Going "up" (from $a$ to $v$ to $x$):** You find the **area**.

## Worked example
**Problem:** A car starts from rest and its motion is described by the velocity-time graph below.
a) Find the acceleration for each phase of the journey (A, B, C).
b) Calculate the total displacement of the car after 10 seconds.
c) Sketch the corresponding acceleration-time ($a-t$) graph.

**Graph for Problem:** A $v-t$ graph consisting of three line segments.
-   Segment A: from (0s, 0 m/s) to (4s, 8 m/s).
-   Segment B: from (4s, 8 m/s) to (8s, 8 m/s).
-   Segment C: from (8s, 8 m/s) to (10s, 0 m/s).

**Solution:**

**a) Find acceleration (slopes):**
*   **Phase A (0-4s):** Acceleration is the slope of the $v-t$ graph.
    $$a_A = \frac{\Delta v}{\Delta t} = \frac{8 \text{ m/s} - 0 \text{ m/s}}{4 \text{ s} - 0 \text{ s}} = \frac{8 \text{ m/s}}{4 \text{ s}} = 2 \text{ m/s}^2$$
*   **Phase B (4-8s):** The graph is a horizontal line.
    $$a_B = \frac{\Delta v}{\Delta t} = \frac{8 \text{ m/s} - 8 \text{ m/s}}{8 \text{ s} - 4 \text{ s}} = \frac{0 \text{ m/s}}{4 \text{ s}} = 0 \text{ m/s}^2$$
*   **Phase C (8-10s):** The slope is negative.
    $$a_C = \frac{\Delta v}{\Delta t} = \frac{0 \text{ m/s} - 8 \text{ m/s}}{10 \text{ s} - 8 \text{ s}} = \frac{-8 \text{ m/s}}{2 \text{ s}} = -4 \text{ m/s}^2$$

**b) Find total displacement (areas):**
We find the area under the graph for each phase and sum them. The shape is a trapezoid, which we can split into a triangle, a rectangle, and another triangle.
*   **Area A (triangle):**
    $$\Delta x_A = \frac{1}{2} \times \text{base} \times \text{height} = \frac{1}{2} \times (4 \text{ s}) \times (8 \text{ m/s}) = 16 \text{ m}$$
*   **Area B (rectangle):**
    $$\Delta x_B = \text{base} \times \text{height} = (8 \text{ s} - 4 \text{ s}) \times (8 \text{ m/s}) = (4 \text{ s}) \times (8 \text{ m/s}) = 32 \text{ m}$$
*   **Area C (triangle):**
    $$\Delta x_C = \frac{1}{2} \times \text{base} \times \text{height} = \frac{1}{2} \times (10 \text{ s} - 8 \text{ s}) \times (8 \text{ m/s}) = \frac{1}{2} \times (2 \text{ s}) \times (8 \text{ m/s}) = 8 \text{ m}$$
*   **Total Displacement:**
    $$\Delta x_{total} = \Delta x_A + \Delta x_B + \Delta x_C = 16 \text{ m} + 32 \text{ m} + 8 \text{ m} = 56 \text{ m}$$

**c) Sketch the $a-t$ graph:**
We plot the constant acceleration values we found in part (a) for each time interval. The result is a step function.

**Reflection:**
Each step used one of the key ideas. For part (a), we needed the rate of change of velocity, so we took the **slope** of the $v-t$ graph. For part (b), we needed the total accumulated position change, so we found the **area** under the $v-t$ graph. Part (c) is a direct plot of the results from part (a), showing how the $a-t$ graph relates directly to the slope of the $v-t$ graph.

## Diagrams

The relationship between the graphs:

```text
x(t) |          ...
     |       .
     |     .
     |   .
     | .
     +----------------> t
       (curved: parabola)
            |
            | take slope (dx/dt)
            V
v(t) |      /
     |     /
     |    /
     |   /
     |  /
     +----------------> t
       (linear: constant slope)
            |
            | take slope (dv/dt)
            V
a(t) |
     |  -----------
     |
     |
     |
     +----------------> t
       (constant)
```

The $v-t$ graph for the worked example:

```text
v (m/s)
  ^
8 +      / \ B /---------\ C
  |     /   \   /         \
  |    /     \ /           \
  |   /   A   \             \
  |  /         \             \
--+------------------------------> t (s)
  0      4          8      10
```

## Memory technique — remember this forever
1.  **Mnemonic:** Think of the variables in order of complexity: **x, v, a**.
    To move **D**own the list (from x to v, or v to a), you find the slope, which is a form of **D**ifferentiation.
    To move **U**p the list (from a to v, or v to x), you find the area **U**nder the curve, which is a form of integration.
    **D for Down/Differentiate/slope. U for Up/Under/integrate.**

2.  **Formulas to overlearn:**
    *   $v = \text{slope of } x-t \text{ graph} = \frac{\Delta x}{\Delta t}$
    *   $a = \text{slope of } v-t \text{ graph} = \frac{\Delta v}{\Delta t}$
    *   $\Delta x = \text{Area under } v-t \text{ graph}$

3.  **Spaced Repetition Schedule:** Re-derive these relationships and solve a new problem on Day 1, Day 3, Day 7, Day 16, and Day 35. Do not skip this.

4.  **First Principles Pathway:** If you forget, start from the definitions.
    *   Velocity is the *rate of change* of position. "Rate of change" is the definition of slope. So, $v$ is the slope of $x-t$.
    *   Acceleration is the *rate of change* of velocity. So, $a$ is the slope of $v-t$.
    *   The inverse of finding a rate of change (slope) is accumulation (area). Therefore, to go from $a$ to $v$, you must find the area. To go from $v$ to $x$, you must find the area.

## Common mistakes
1.  **Confusing Constant Velocity with Being Stationary:** A horizontal line on a **$v-t$ graph** means the object is moving with a constant, non-zero velocity. A horizontal line on an **$x-t$ graph** means the object is stationary ($v=0$). Do not mix these up.
2.  **Ignoring Negative Areas:** If the $v-t$ graph goes below the t-axis, the velocity is negative. The area in that region is also negative, representing displacement in the negative direction. Forgetting this will give you the wrong total displacement. Total *distance* travelled would require you to treat that area as positive.
3.  **Drawing Curves as Straight Lines:** When acceleration is constant and non-zero, the $v-t$ graph is a straight line, but the corresponding $x-t$ graph is a **parabola**. The position does not change linearly when the velocity is changing. The curve must bend upwards for positive acceleration and downwards for negative acceleration.

## Self-check
1.  An object's velocity is described by the $v-t$ graph below: a straight line from (0s, 10 m/s) to (5s, 0 m/s). Sketch the $x-t$ and $a-t$ graphs, assuming $x(0)=0$.
2.  The $x-t$ graph of a particle is a parabola given by $x(t) = -2t^2 + 8t$. At what time is the particle momentarily at rest? What is its acceleration at that time?
3.  An $a-t$ graph shows a constant acceleration of $+4 \text{ m/s}^2$ from $t=0$ to $t=2$s, and then zero acceleration from $t=2$s to $t=5$s. If the object started from rest at the origin ($v(0)=0, x(0)=0$), what is its final position at $t=5$s?