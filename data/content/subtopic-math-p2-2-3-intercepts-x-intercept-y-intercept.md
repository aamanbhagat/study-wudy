## What it is
Intercepts are the exact coordinate points where a graph (such as a line or a curve) crosses the axes of a Cartesian coordinate system. The $x$-intercept is the point where the graph crosses the horizontal $x$-axis, and the $y$-intercept is the point where it crosses the vertical $y$-axis. 

## Why it matters
In physics and rocket science, intercepts represent initial conditions or final states. The $y$-intercept of a velocity-time graph is the initial velocity of a rocket at engine ignition ($t=0$). The $x$-intercept is the exact moment an object hits the ground or comes to rest. In machine learning, the $y$-intercept is the "bias" term in linear regression, shifting the model up or down to fit the data regardless of the input weights.

## When to study it
You must already understand the Cartesian coordinate system (how to plot $(x,y)$ points), how to evaluate algebraic equations by substituting values, and how to solve one-variable linear equations (e.g., $3x + 6 = 0$). If you cannot reliably solve for $x$ when $y$ is replaced by $0$, you must review linear equations before proceeding.

## How to study it (step by step)
1. **Plot by brute force:** Take a simple equation like $y = 2x - 4$. Create a table of values for $x \in \{-1, 0, 1, 2, 3\}$. Plot these points on a graph and draw the line.
2. **Observe the crossings:** Look at the exact points where your drawn line crosses the $x$-axis and the $y$-axis. Write down their $(x,y)$ coordinates. 
3. **Connect geometry to algebra:** Notice that the point on the $x$-axis has a $y$-coordinate of exactly $0$. Notice that the point on the $y$-axis has an $x$-coordinate of exactly $0$.
4. **Calculate the $y$-intercept algebraically:** Take a standard form equation, like $3x + 4y = 12$. Substitute $x = 0$ into the equation and solve for $y$. 
5. **Calculate the $x$-intercept algebraically:** Take the same equation, substitute $y = 0$, and solve for $x$.
6. **Graph using intercepts:** Plot only the two intercepts you just calculated. Draw a straight line through them. This is the fastest way to graph linear equations by hand.

## Key ideas, with intuition

**1. The Zero-Coordinate Rule**
An axis is defined by the *other* coordinate being zero. The $x$-axis is not just a line; it is literally the set of all points where $y=0$. Therefore, finding an $x$-intercept means finding the intersection of your function with the line $y=0$. You force $y=0$ in your equation to find it.

**2. The $y$-intercept as the "Starting Point"**
In the slope-intercept form of a line:
$$y = mx + b$$
If you plug in $x=0$ (which often represents time zero, or zero input), the $mx$ term vanishes completely. You are left with $y = b$. Thus, $b$ is the $y$-intercept. It is the baseline value of your system before any $x$ is applied.

**3. Intercepts as Boundary Conditions**
In physical systems, intercepts tell you the boundaries of your reality. When does the rocket run out of fuel? Set the mass of the fuel to zero ($y=0$) and solve for time ($x$). What was the temperature of the engine before we started heating it? Set time to zero ($x=0$) and solve for temperature ($y$).

## Worked example
Find the $x$-intercept and $y$-intercept of the line given by the equation $3x - 4y = 12$, and write them as coordinate pairs.

**Step 1: Find the $x$-intercept.**
To find where the line crosses the $x$-axis, the height ($y$) must be zero. Set $y = 0$.
$$3x - 4(0) = 12$$

**Step 2: Solve for $x$.**
$$3x - 0 = 12$$
$$3x = 12$$
$$x = 4$$
The $x$-intercept is the point $(4, 0)$.

**Step 3: Find the $y$-intercept.**
To find where the line crosses the $y$-axis, the horizontal distance ($x$) must be zero. Set $x = 0$.
$$3(0) - 4y = 12$$

**Step 4: Solve for $y$.**
$$0 - 4y = 12$$
$$-4y = 12$$
$$y = -3$$
The $y$-intercept is the point $(0, -3)$.

*Reflection:* By deliberately zeroing out one variable, we isolate the other. This algebraic trick directly translates to finding the geometric intersection with the axes. Two points uniquely define a line, so plotting $(4,0)$ and $(0,-3)$ is all we need to graph this equation.

## Diagrams

```text
          y-axis
            ^
            |
          2 +
            |
          1 +
            |
------------+---+---+---+---*---> x-axis
 -2  -1     |   1   2   3   4
         -1 +              / (4, 0) : x-intercept
            |             /
         -2 +            /
            |           /
 (0, -3) -3 *----------/
y-intercept |
         -4 +
            |
```

## Memory technique — remember this forever

**The Mnemonic:**
"To find the intercept of one, make the *other* one none (zero)."

**Must Overlearn:**
1. **$x$-intercept:** Set $y=0$, solve for $x$. Format: $(x, 0)$.
2. **$y$-intercept:** Set $x=0$, solve for $y$. Format: $(0, y)$.

**Spaced Repetition Schedule:**
Review these rules and solve one standard-form equation (like $2x - 5y = 10$) at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.

**First Principles Pathway:**
If you forget the rule, draw a coordinate plane. Place a dot anywhere on the horizontal axis. Ask yourself: "What are the coordinates of this dot?" You will see it is something like $(5, 0)$ or $(-2, 0)$. You will immediately deduce that every point on the $x$-axis has a $y$-coordinate of $0$. The algebra naturally follows the geometry.

## Common mistakes

1. **Swapping the zeros:** Students often set $x=0$ when asked for the $x$-intercept. This is a fatal error. Setting $x=0$ restricts you to the $y$-axis. Always set the *opposite* variable to zero.
2. **Writing the intercept as a scalar:** An intercept is a location in 2D space, not a single number. If you solve and get $x=4$, the intercept is the coordinate pair $(4, 0)$. Writing just "4" is sloppy and loses points in rigorous grading.
3. **Dropping negative signs:** When solving for the $y$-intercept in equations like $2x - 5y = 10$, students often write $5y = 10 \implies y = 2$. The term is $-5y$. The correct math is $-5y = 10 \implies y = -2$.

## Self-check

1. Find the $x$-intercept and $y$-intercept of the equation $5x + 2y = 20$. Express your answers as coordinate pairs.
2. A sounding rocket's altitude $h$ (in meters) after $t$ seconds is given by the equation $h = -5t^2 + 100t + 200$. What is the $h$-intercept, and what specific physical quantity does it represent?
3. Prove algebraically that for any line written in the "intercept form" $\frac{x}{a} + \frac{y}{b} = 1$ (where $a$ and $b$ are non-zero constants), the $x$-intercept is always $(a,0)$ and the $y$-intercept is always $(0,b)$.