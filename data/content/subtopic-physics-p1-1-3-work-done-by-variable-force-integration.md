## What it is
Work is a measure of energy transfer when a force acts on an object over a displacement. When the force is not constant but changes with position, we can no longer use the simple formula $W = Fd$. Instead, we calculate work by summing up the work done over infinitesimally small displacements, a process mathematically defined by a definite integral.

## Why it matters
This concept is fundamental, not just an academic exercise. The gravitational force on a rocket changes significantly as it leaves Earth, so calculating the work done by gravity requires integration. In materials science, the force required to stretch a material isn't constant; integration tells us the energy stored. In machine learning, gradient descent algorithms navigate a "cost landscape," and the concept of a path integral (a 3D generalization of this idea) is central to understanding the optimization process.

## When to study it
You must be comfortable with two prerequisite concepts:
1.  **Work for a constant force:** You should understand that for a constant force $\vec{F}$ acting over a displacement $\vec{d}$, the work done is $W = \vec{F} \cdot \vec{d}$. In one dimension, this simplifies to $W = F_x \Delta x$.
2.  **Definite integrals:** You must understand that the definite integral $\int_{a}^{b} f(x) \, dx$ represents the "area under the curve" of the function $f(x)$ from $x=a$ to $x=b$.

If you are not solid on these, pause and review them first. Proceeding without them will lead to confusion.

## How to study it (step by step)
1.  **Revisit the constant force case graphically.** Draw a graph of a constant force $F$ versus displacement $x$. The work done moving from $x_i$ to $x_f$ is $W = F \cdot (x_f - x_i)$. Notice this is precisely the area of the rectangle under the F-x graph.
2.  **Approximate the variable force.** Now, draw a graph for a force $F(x)$ that varies with position. To find the work done from $x_i$ to $x_f$, we can't just multiply force by distance. Instead, divide the total displacement into many small intervals, each of width $\Delta x$.
3.  **Calculate the work for one small interval.** Over a very small interval $\Delta x$, the force $F(x)$ is *approximately* constant. The small amount of work done, $\Delta W$, is therefore $\Delta W \approx F(x) \Delta x$. This is the area of a thin rectangle on your graph.
4.  **Sum the approximations.** The total work is the sum of the work done over all the small intervals: $W \approx \sum F(x_i) \Delta x_i$. This is a Riemann sum, and it approximates the total area under the curve.
5.  **Take the limit.** To get the exact work, we make the intervals infinitesimally small. We let $\Delta x \to dx$. The sum $\sum$ becomes the integral symbol $\int$. This turns our approximation into an exact equation:
    $$W = \lim_{\Delta x \to 0} \sum F(x) \Delta x = \int_{x_i}^{x_f} F(x) \, dx$$
6.  **Solve problems.** Find functions for forces (e.g., Hooke's Law for a spring, Newton's Law of Universal Gravitation) and practice calculating the work done between two points by evaluating the definite integral.

## Key ideas, with intuition
1.  **Work is the area under the Force-Displacement graph.** This is the core intuition. For a constant force, the area is a simple rectangle. For a variable force, the area is a complex shape, and integration is the tool we use to calculate the area of complex shapes.

2.  **Integration is just a sophisticated way of adding.** We are chopping a complex problem (work done by a varying force) into an infinite number of simple problems (work done by a nearly-constant force over a tiny distance) and summing the results. The infinitesimal work $dW$ done by a force $F(x)$ over an infinitesimal displacement $dx$ is:
    $$dW = F(x) \, dx$$
    The total work $W$ is the sum (integral) of all these tiny pieces of work.

3.  **The integral is a path-dependent sum.** The work done depends on the starting point ($x_i$) and the ending point ($x_f$), which become the limits of our integral. It also depends on the function $F(x)$ that defines the "path" on the F-x graph.

## Worked example
**Problem:** A spring follows Hooke's Law, $F_s = -kx$, where $k$ is the spring constant and $x$ is the displacement from its equilibrium position. Calculate the work done *by the spring* on an object as the object moves, stretching the spring from $x=0$ to $x=L$.

**Solution:**

1.  **Identify the force function and limits.**
    The force exerted *by the spring* is given by $F(x) = -kx$.
    The displacement is from the initial position $x_i = 0$ to the final position $x_f = L$.

2.  **Set up the work integral.**
    We use the definition of work for a variable force:
    $$W = \int_{x_i}^{x_f} F(x) \, dx$$
    Substituting our function and limits:
    $$W = \int_{0}^{L} (-kx) \, dx$$

3.  **Evaluate the integral.**
    The constant $-k$ can be pulled out of the integral:
    $$W = -k \int_{0}^{L} x \, dx$$
    The integral of $x$ is $\frac{x^2}{2}$. We evaluate this from $0$ to $L$:
    $$W = -k \left[ \frac{x^2}{2} \right]_{0}^{L}$$
    $$W = -k \left( \frac{L^2}{2} - \frac{0^2}{2} \right)$$

4.  **State the final answer.**
    $$W = -\frac{1}{2}kL^2$$

**Reflection:**
*   Step 1 worked because we correctly identified the force function and the start/end points of the process.
*   Step 2 worked because we applied the fundamental definition of work as the integral of force with respect to displacement.
*   Step 3 was a straightforward application of calculus rules for integration.
*   The final answer is negative. This makes physical sense: the spring pulls in the opposite direction of the displacement (it wants to return to equilibrium), so the work done *by the spring* is negative. The work done *by the external agent* pulling the spring would be positive, $+ \frac{1}{2}kL^2$.

## Diagrams
Here is a Force vs. Displacement graph for a variable force $F(x)$. The total work done from $x_i$ to $x_f$ is the shaded area under the curve. We approximate this area with a series of thin rectangles.

```text
      Force (F)
        ^
        |
 F(x) --|          /----
        |         /
        |        /
        |       /|
        |      / |
        |     /  |
        +----|---|------------> Displacement (x)
             x_i  x_f

```

Each thin rectangle has a width $\Delta x$ and a height $F(x)$, representing the small amount of work $\Delta W \approx F(x)\Delta x$.

```text
      Force (F)
        ^
        |
        |        /----
        |       /
        |      /
        |     /
        |    |#|
        |    |#|
        +----|#|------------> Displacement (x)
             x  x+Δx

```

Taking the limit as $\Delta x \to 0$ and summing all the rectangles gives the exact area, which is the integral.

## Memory technique — remember this forever
1.  **Visual Hook:** Burn this into your mind: **"Work is the area under the Force-Displacement curve."** Every time you see a problem about work, visualize this graph. If the line is flat, it's a rectangle ($W=Fd$). If the line is curved, you need calculus to find the area ($W = \int F(x) dx$).

2.  **Formulas to Overlearn:**
    *   Infinitesimal work (the core concept): $dW = F(x) \, dx$
    *   Total work (the operational formula): $W = \int_{x_i}^{x_f} F(x) \, dx$

3.  **Spaced Repetition Schedule:**
    *   Review this lesson in **1 day**. Redo the spring example from memory.
    *   Review in **3 days**. Do the first self-check problem.
    *   Review in **7 days**. Do the second self-check problem.
    *   Review in **16 days**. Do the third self-check problem.
    *   Review in **35 days**. Invent a new problem with a different force function and solve it.

4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    *   "Work is force times distance." $W = F \cdot d$.
    *   "But my force is changing!"
    *   "Okay, let's look at a tiny distance $dx$ where the force $F(x)$ is almost constant."
    *   "The tiny bit of work is $dW = F(x) \, dx$."
    *   "To get the total work, I must sum up all the tiny bits."
    *   "The symbol for an infinite sum of tiny things is the integral: $W = \int dW = \int_{start}^{end} F(x) \, dx$."

## Common mistakes
1.  **Forgetting the limits of integration.** Writing $W = \int F(x) dx$ gives you an indefinite integral (a family of functions), not the definite work (a single scalar value). You must evaluate it between the start and end points.
2.  **Using the wrong force.** In the spring example, the work done *by the spring* is negative, but the work done *by you* to stretch the spring is positive. Read the question carefully to determine which force you are analyzing.
3.  **Integrating with respect to the wrong variable.** If a force is given as a function of time, $F(t)$, you cannot integrate it with respect to $x$. The work integral must be with respect to a spatial variable ($dx$, $dy$, etc.). You would need to find $x(t)$ to make a change of variables.

## Self-check
1.  A force acting on a particle is given by $F(x) = (4x^3 - 6) \, \text{N}$. How much work is done by this force as the particle moves from $x=1 \, \text{m}$ to $x=2 \, \text{m}$?
2.  The gravitational force of the Earth on a rocket of mass $m$ is given by $F(r) = -\frac{GMm}{r^2}$, where $r$ is the distance from the center of the Earth. The negative sign indicates the force is attractive (points toward the Earth). Calculate the work done *by gravity* on the rocket as it travels from the Earth's surface (radius $R_E$) to an altitude $h$ above the surface (a final distance of $R_E + h$ from the center). Is the work positive or negative? Does this make sense?
3.  The graph below shows the force exerted on a particle as a function of its position. Without doing any calculations, is the total work done on the particle as it moves from $x=0$ to $x=4$ positive, negative, or zero? Justify your answer by referencing the graph.
    ```text
          Force (F)
            ^
            |
         2 -+----/-\----
            |   / | \
            |  /  |  \
         0 -+--/---+---\--+--> Position (x)
            | /   |   \  |
            |/    |    \ |
        -2 -+-----|-----\-/
                  2      4
    ```