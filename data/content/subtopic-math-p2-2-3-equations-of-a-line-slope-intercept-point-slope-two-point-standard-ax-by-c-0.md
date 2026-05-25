## What it is
An equation of a line is an algebraic rule that holds true for the $(x, y)$ coordinates of every point on that specific straight line, and false for any point not on the line. The slope-intercept, point-slope, two-point, and standard forms are simply different algebraic arrangements of this exact same rule, chosen based on what initial information you possess.

## Why it matters
In calculus, the point-slope form is how you will construct tangent lines to curves, which is the foundation of linear approximation. In machine learning, the slope-intercept form ($y = wx + b$) is the fundamental architecture of a perceptron, where $w$ is the "weight" and $b$ is the "bias." In aerospace, standard form is used to define linear constraints in optimization problems (like fuel burn vs. payload) because it handles vertical boundaries gracefully, unlike forms that require a defined slope.

## When to study it
You must already understand:
1. The Cartesian coordinate system (plotting $(x,y)$ points).
2. Basic algebraic manipulation (isolating variables, distributing).
3. The geometric definition of slope: $m = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1}$.
If you cannot reliably calculate the slope between two points or solve $3x + 4 = 10$ for $x$, return to basic algebra before proceeding.

## How to study it (step by step)
1. **Master the slope formula:** Write down $m = \frac{y - y_1}{x - x_1}$. Understand that $(x_1, y_1)$ is a fixed point, and $(x, y)$ is *any* other point on the line.
2. **Derive Point-Slope:** Multiply both sides of the slope formula by $(x - x_1)$. You have just derived the point-slope form. 
3. **Derive Two-Point:** Substitute the definition of slope ($m = \frac{y_2 - y_1}{x_2 - x_1}$) directly into the point-slope form. 
4. **Derive Slope-Intercept:** Take your point-slope equation, distribute the slope $m$, and isolate $y$. 
5. **Derive Standard Form:** Move all $x$ and $y$ terms to one side of the equals sign so it looks like $Ax + By + C = 0$. 
6. **Translate fluently:** Pick two random points. Write the equation in point-slope form, then algebraically convert it into the other three forms. Repeat until flawless.

## Key ideas, with intuition

**1. Point-Slope Form:** $$y - y_1 = m(x - x_1)$$
*Intuition:* This is the most powerful form. It says: "To find the vertical position $y$, start at a known vertical position $y_1$, and add the slope $m$ times the horizontal distance you've traveled from $x_1$." It is the direct algebraic translation of "rise equals slope times run."

**2. Slope-Intercept Form:** $$y = mx + b$$
*Intuition:* This is a special case of point-slope form where your known point is the $y$-intercept, $(0, b)$. It is an explicit function: you input $x$, and it immediately outputs $y$. It is the easiest form to graph.

**3. Two-Point Form:** $$y - y_1 = \frac{y_2 - y_1}{x_2 - x_1} (x - x_1)$$
*Intuition:* This is literally just the point-slope form, but you are forced to calculate the slope $m$ inline because you were only given two points.

**4. Standard Form:** $$Ax + By + C = 0$$
*Intuition:* Unlike the other forms, standard form treats $x$ and $y$ symmetrically. This is critical because a vertical line has an infinite (undefined) slope. You cannot write a vertical line in $y = mx + b$ form. In standard form, a vertical line is simply $Ax + C = 0$ (where $B=0$). 

## Worked example
**Problem:** Find the equation of the line passing through $(2, -3)$ and $(4, 1)$ in all four forms.

**Step 1: Find the slope.**
$$m = \frac{1 - (-3)}{4 - 2} = \frac{4}{2} = 2$$

**Step 2: Two-Point / Point-Slope Form.**
Using the slope $m=2$ and the first point $(2, -3)$:
$$y - (-3) = 2(x - 2)$$
$$y + 3 = 2(x - 2)$$
*(Reflection: We stop here for point-slope. It perfectly encodes our starting point and trajectory.)*

**Step 3: Slope-Intercept Form.**
Isolate $y$ from the equation above:
$$y + 3 = 2x - 4$$
$$y = 2x - 7$$
*(Reflection: The line crosses the y-axis at -7, and goes up 2 for every 1 it goes right.)*

**Step 4: Standard Form.**
Move all terms to one side from $y = 2x - 7$:
$$-2x + y + 7 = 0 \quad \text{or} \quad 2x - y - 7 = 0$$
*(Reflection: Standard form conventionally uses integer coefficients and a positive leading term.)*

## Diagrams

```text
      y
      ^
      |                 / y = 2x + 2 (Slope-Intercept)
      |               / 
      |             /  
  2 - + - - - - - * (0, 2)  <-- y-intercept (b)
      |         / |
      |       /   | rise = 2
      |     /     |
      |   /       |
-1    | /         | run = 1
<-----*-----------+---------> x
   (-1,0)         |
      |
```

## Memory technique — remember this forever

1. **The Hook:** "Point-Slope is the seed, Slope-Intercept is the tree, Standard is the forest." 
   * *Seed:* You build everything from Point-Slope.
   * *Tree:* Slope-Intercept is the visible, easy-to-climb structure (easy to graph).
   * *Forest:* Standard form maps the whole landscape, including the vertical boundaries.
2. **Must Overlearn:** 
   * $$y - y_1 = m(x - x_1)$$
   * $$y = mx + b$$
3. **Spaced Repetition Schedule:** Review these derivations and convert one set of two points into all forms at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget every formula, remember the definition of slope: $m = \frac{\Delta y}{\Delta x}$. Replace $\Delta y$ with $(y - y_1)$ and $\Delta x$ with $(x - x_1)$. Multiply the denominator to the other side. You instantly have Point-Slope form.

## Common mistakes
* **Sign errors with negative coordinates:** When plugging $(-3, 4)$ into point-slope, students write $y - 4 = m(x - 3)$. It must be $x - (-3)$, which becomes $x + 3$.
* **Assuming $A$ is the slope in Standard Form:** In $Ax + By + C = 0$, the slope is *not* $A$. If you isolate $y$, you get $y = -\frac{A}{B}x - \frac{C}{B}$. The slope is $-\frac{A}{B}$.
* **Mixing up $x$ and $y$ in the slope formula:** Writing $m = \frac{x_2 - x_1}{y_2 - y_1}$. Always remember: rise (vertical, $y$) over run (horizontal, $x$).

## Self-check
1. Write the slope-intercept form of a line passing through $(-1, 4)$ with a slope of $-3$.
2. Convert $3x - 4y + 12 = 0$ into slope-intercept form. What are the $x$ and $y$ intercepts?
3. A rocket's altitude $h$ increases linearly with time $t$. At $t=2$ seconds, $h=150$ meters. At $t=5$ seconds, $h=600$ meters. Write the equation in point-slope form, then find the altitude at $t=10$ seconds.