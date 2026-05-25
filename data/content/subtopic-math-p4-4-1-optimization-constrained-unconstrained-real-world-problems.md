## What it is
Optimization is the process of finding the maximum or minimum value of a function, which we call the *objective function*. Unconstrained optimization finds this extremum over the function's entire natural domain. Constrained optimization finds the extremum subject to one or more *constraints*, which are equations that limit the possible input values.

## Why it matters
This is one of the most widely applied ideas in calculus. In machine learning, you minimize a *loss function* to train a model. In aerospace, you minimize structural mass for a given strength constraint to reduce launch cost. In physics, principles like Fermat's principle of least time (for light) or the principle of least action are fundamental, describing nature as an optimizer.

## When to study it
You must be fluent with the following before proceeding:
1.  **Computing Derivatives:** You need to differentiate polynomials, trigonometric, exponential, and logarithmic functions flawlessly using the power, product, quotient, and chain rules.
2.  **Critical Points:** You must know that potential maxima and minima (extrema) occur at critical points, where the first derivative $f'(x)$ is zero or undefined.
3.  **First and Second Derivative Tests:** You must be able to use the sign of $f'(x)$ or the sign of the second derivative $f''(x)$ to classify a critical point as a local maximum, a local minimum, or neither.

If you are not confident in these three areas, pause and review them.

## How to study it (step by step)
1.  **Master Unconstrained Problems:** Start with simple polynomial functions like $f(x) = x^3 - 6x^2 + 5$. Find the critical points by setting $f'(x) = 0$. Use the Second Derivative Test to classify them as local maxima or minima. Do this until it is automatic.
2.  **Identify Objective and Constraint:** Work through several word problems with the sole goal of writing down two equations: the *objective* (the quantity to be maximized/minimized) and the *constraint* (the condition it must satisfy). Do not solve them yet. For example: "Maximize the area of a rectangle with a fixed perimeter of 100m." Objective: $A = lw$. Constraint: $2l + 2w = 100$.
3.  **Practice the Substitution Method:** Take the problems from step 2. Use the constraint equation to solve for one variable (e.g., $w = 50 - l$). Substitute this into the objective function to reduce it to a single variable (e.g., $A(l) = l(50-l)$). This transforms a constrained, multi-variable problem into an unconstrained, single-variable problem.
4.  **Solve and Verify:** Now, solve the single-variable optimization problems from step 3. Find the critical point, and use the First or Second Derivative Test to confirm it is the maximum/minimum you seek.
5.  **Check the Endpoints:** For problems defined on a closed interval (e.g., a physical length $x$ must be in $[0, L]$), the absolute maximum or minimum can occur at the interval's endpoints. Always evaluate the objective function at the critical points *and* at the endpoints to find the true absolute extremum. This is a consequence of the Extreme Value Theorem.

## Key ideas, with intuition
1.  **Extrema Occur at "Flat Spots":** The core intuition is that at the very peak of a smooth hill or the bottom of a valley, the ground is momentarily flat. The slope of the tangent line is zero. This is why we search for points where the derivative, which represents the slope, is zero.
    $$f'(c) = 0 \quad \text{or} \quad f'(c) \text{ is undefined} \implies c \text{ is a critical point}$$
2.  **The Constraint Reduces Your Freedom:** Think of the objective function as a landscape of possible outcomes (e.g., all possible areas of a rectangle). A constraint is like a fence or a trail that you're not allowed to leave. You can no longer search the entire landscape; you can only search for the highest or lowest point *along that trail*. Mathematically, the constraint equation lets you eliminate a variable, reducing the dimensionality of the problem.
3.  **The Second Derivative Test Measures Curvature:** Once you find a flat spot ($f'(c)=0$), you need to know if it's a peak or a valley. The second derivative tells you this.
    -   If $f''(c) < 0$, the function is concave down (like an unhappy face $\frown$), so you've found a **local maximum**.
    -   If $f''(c) > 0$, the function is concave up (like a happy face $\smile$), so you've found a **local minimum**.
4.  **The Objective is What You Care About:** In any word problem, the first and most important step is identifying the single quantity you are being asked to maximize or minimize. This becomes your objective function, $f(x)$. All other information is likely part of the constraint.

## Worked example
**Problem:** You have 400 meters of fencing to enclose a rectangular field adjacent to a long, straight river. No fencing is needed along the river side. What are the dimensions of the field that has the largest possible area?

**Solution:**

1.  **Define Variables and Diagram:** Let $w$ be the width of the field (the sides perpendicular to the river) and $l$ be the length (the side parallel to the river).

2.  **Identify Objective and Constraint:**
    -   **Objective:** Maximize the area, $A$. The formula is $A = lw$.
    -   **Constraint:** The total fencing is 400m. This is used for two widths and one length. The formula is $2w + l = 400$.

3.  **Reduce to a Single Variable:** Use the constraint to express one variable in terms of the other. Solving for $l$ is simpler: $l = 400 - 2w$. Substitute this into the objective function:
    $$A(w) = (400 - 2w)w = 400w - 2w^2$$
    This function $A(w)$ now represents the area for any valid width $w$. The domain for $w$ is $(0, 200)$, since $w$ must be positive and if $w=200$, $l=0$.

4.  **Find Critical Points:** Take the derivative of $A(w)$ with respect to $w$ and set it to zero.
    $$A'(w) = \frac{dA}{dw} = 400 - 4w$$
    Set $A'(w) = 0$:
    $$400 - 4w = 0 \implies 4w = 400 \implies w = 100 \text{ meters}$$

5.  **Verify the Extremum:** Use the Second Derivative Test to confirm this is a maximum.
    $$A''(w) = -4$$
    Since $A''(w)$ is always negative, the function is concave down everywhere, and our critical point $w=100$ must be a local (and in this case, absolute) maximum.

6.  **Find Final Dimensions and State Answer:** We found the optimal width. Now find the corresponding length using the constraint equation:
    $$l = 400 - 2(100) = 400 - 200 = 200 \text{ meters}$$
    The dimensions of the field with the largest area are 100m by 200m. The maximum area is $A = 100 \times 200 = 20,000 \, \text{m}^2$.

**Reflection:** Each step had a clear purpose. Defining variables and equations translated the real-world problem into math. Substitution reduced a 2-variable problem to a 1-variable calculus problem. Finding the derivative and setting it to zero located the "flat spot". The second derivative confirmed it was a peak, not a valley. Finally, we solved for all required quantities to answer the original question completely.

## Diagrams

A diagram for the worked example:
```text
      <---------- l ---------->
    +-------------------------+
    |                         |
    |                         | w
    |                         |
    +-------------------------+
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ~ ~ ~ ~ RIVER ~ ~ ~ ~ ~ ~
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

A diagram illustrating a local maximum where the derivative is zero:
```text
      f(x)
        ^
        |
        |        /-----\
        |       /       \
   f(c) - - - -|- - - - -|- - - - f'(c) = 0 (tangent is horizontal)
        |     /           \
        |    /             \
        +----------------------> x
              c
```

## Memory technique — remember this forever
1.  **The Story:** "Objective, Constraint, Substitute, Solve" (OCSS). Imagine you are a spy. Your **Objective** is to find the highest point in a landscape to set up surveillance. Your **Constraint** is that you must stay on a specific road. You **Substitute** your map of the road onto the topographical map of the landscape. Then you **Solve** for the highest point along that combined path.

2.  **Must-Know Facts:**
    $$
    \begin{aligned}
    &\text{1. Critical points exist where } f'(c) = 0 \text{ or } f'(c) \text{ is undefined.} \\
    &\text{2. If } f'(c)=0 \text{ and } f''(c) < 0 \implies \text{local max at } c. \\
    &\text{3. If } f'(c)=0 \text{ and } f''(c) > 0 \implies \text{local min at } c.
    \end{aligned}
    $$

3.  **Spaced Repetition Schedule:** Review this entire lesson sheet at these intervals:
    -   24 hours
    -   3 days
    -   7 days
    -   16 days
    -   35 days

4.  **First Principles Pathway:** If you forget the Second Derivative Test, return to the **First Derivative Test**. Check the sign of $f'(x)$ on either side of the critical point $c$. If the slope changes from positive to negative ($+\to-$), you went up and then down, so $c$ is a maximum. If the slope changes from negative to positive ($-\to+$), you went down and then up, so $c$ is a minimum. This is more fundamental than the second derivative test.

## Common mistakes
1.  **Forgetting to Check Endpoints:** In problems with a restricted domain (e.g., length $x \in [a, b]$), the absolute maximum/minimum might be at $a$ or $b$, not at a critical point where $f'(c)=0$. Always check the endpoints.
2.  **Confusing Constraint and Objective:** Students sometimes try to take the derivative of the constraint. Remember: you optimize the objective, you use the constraint to eliminate variables.
3.  **Solving for $x$ But Not $f(x)$:** The question might ask for the *dimensions* that maximize an area (e.g., $w=100, l=200$) or for the *maximum area itself* ($A=20,000$). Read the question carefully and answer what it asks for.
4.  **Assuming a Critical Point is the Right Kind of Extremum:** Finding $f'(c)=0$ is not enough. You must use the first or second derivative test to prove it's a maximum if you're maximizing, or a minimum if you're minimizing.

## Self-check
1.  Find the coordinates of the absolute minimum of the function $f(x) = x^4 - 8x^2 + 3$ on the interval $[-3, 3]$.
2.  You are designing a cylindrical can that must hold 1 liter (1000 cm$^3$) of liquid. Find the radius and height of the can that will minimize the amount of metal used (i.e., minimize the surface area).
3.  A rocket's trajectory is given by $h(t) = v_0 t - \frac{1}{2}gt^2$, where $v_0$ is initial velocity and $g$ is acceleration due to gravity. At the same time, the atmospheric heating rate is proportional to the cube of the velocity, $Q'(t) \propto v(t)^3$. Find the time $t > 0$ at which the heating rate is maximum. Assume $v(t) = h'(t)$. Does your answer depend on $v_0$ or $g$?