## What it is
A rectangular hyperbola is a specific type of hyperbola where the two asymptotes intersect at a perfect right angle ($90^\circ$). The equation $xy = c^2$ represents this exact curve after it has been rotated by $45^\circ$ so that its asymptotes lie perfectly along the x-axis and y-axis. As the x-coordinate grows infinitely large, the y-coordinate shrinks toward zero, and vice versa.

## Why it matters
In physics and engineering, $xy = c^2$ is the mathematical embodiment of inverse proportionality. It governs Boyle's Law for ideal gases ($PV = \text{constant}$), capacitor charging relations, and the relationship between frequency and wavelength. In orbital mechanics, when a spacecraft achieves escape velocity to leave a planet's gravity well, its trajectory is a hyperbola; the rectangular hyperbola provides the foundational geometry for understanding these high-energy asymptotic escape vectors.

## When to study it
You must already understand:
1. The standard hyperbola equation $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$.
2. The concept of asymptotes and limits.
3. Basic coordinate geometry (point-slope form, perpendicular lines).
4. Implicit differentiation.

If you cannot instantly identify the vertices and asymptotes of $x^2 - y^2 = a^2$, stop and review standard conic sections before proceeding.

## How to study it (step by step)
1. **Graph the base case:** Sketch $y = \frac{1}{x}$ by hand. Draw the line $y = x$ and visually confirm the curve's symmetry across this axis. 
2. **Prove the rotation:** Take the standard rectangular hyperbola $x^2 - y^2 = a^2$. Apply a $45^\circ$ coordinate rotation by substituting $x = \frac{X+Y}{\sqrt{2}}$ and $y = \frac{Y-X}{\sqrt{2}}$. Expand and simplify to prove it results in $XY = \frac{a^2}{2}$, which we write as $xy = c^2$.
3. **Master the parameterization:** Verify that for any non-zero real number $t$, the point $(ct, \frac{c}{t})$ satisfies $xy = c^2$. 
4. **Derive the tangent:** Use implicit differentiation on $xy = c^2$ to find $\frac{dy}{dx}$. Evaluate it at $(ct, \frac{c}{t})$ to find the slope of the tangent line.
5. **Prove the constant area property:** Find the x and y intercepts of the tangent line you just derived. Calculate the area of the right triangle formed by the tangent and the axes. You will find all $t$ variables cancel out.

## Key ideas, with intuition

**The Right-Angle Asymptotes**
A standard hyperbola $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ has asymptotes $y = \pm \frac{b}{a} x$. If we set $a = b$, the asymptotes become $y = \pm x$. These lines are perpendicular (slopes of $1$ and $-1$). This perpendicularity is what makes the hyperbola "rectangular".

**The Rotation to $xy = c^2$**
Working with slanted asymptotes $y = \pm x$ is algebraically tedious. By rotating the coordinate system $45^\circ$, the asymptotes become the x-axis ($y=0$) and y-axis ($x=0$). The equation simplifies beautifully to:
$$xy = c^2$$
where $c^2 = \frac{a^2}{2}$. 

**Parametric Coordinates**
In geometry, dealing with $x$ and $y$ simultaneously is a liability. We reduce the dimensionality by introducing a parameter $t \neq 0$. Any point on the curve can be defined as:
$$P\left(ct, \frac{c}{t}\right)$$
This turns complex locus problems into straightforward single-variable algebra.

## Worked example
**Problem:** Find the equation of the normal line to the rectangular hyperbola $xy = c^2$ at the point $P(ct, \frac{c}{t})$.

**Step 1: Find the derivative (slope of the tangent).**
Differentiate $xy = c^2$ implicitly with respect to $x$:
$$x \frac{dy}{dx} + y(1) = 0 \implies \frac{dy}{dx} = -\frac{y}{x}$$

**Step 2: Evaluate at point $P$.**
Substitute $x = ct$ and $y = \frac{c}{t}$ to find the tangent slope $m_T$:
$$m_T = \frac{-c/t}{ct} = -\frac{1}{t^2}$$

**Step 3: Find the slope of the normal.**
The normal is perpendicular to the tangent, so its slope $m_N$ is the negative reciprocal of $m_T$:
$$m_N = -\frac{1}{m_T} = t^2$$

**Step 4: Construct the line equation.**
Use the point-slope form $y - y_1 = m(x - x_1)$:
$$y - \frac{c}{t} = t^2 (x - ct)$$

**Step 5: Standardize the equation.**
Multiply through by $t$ to clear the denominator:
$$ty - c = t^3 x - ct^4$$
$$t^3 x - ty - ct^4 + c = 0$$

*Reflection:* By using parametric coordinates, we avoided square roots entirely. Implicit differentiation yielded the slope immediately. The final polynomial form is clean and reveals that up to four normals can be drawn from a given point to a rectangular hyperbola (since it is a degree-4 polynomial in $t$).

## Diagrams

```text
      y
      ^
      |        *  P(ct, c/t)
      |       * \
      |      *   \ Tangent line
      |    *      \
      |  *         \
------+-------------+---> x
    * |             \
  *   |              \
 *    |
*     |
      |
```
*Prose description for clarity:* The curve has two branches. One lies entirely in the first quadrant (top right, where $x>0, y>0$), sweeping down from the high y-axis and flattening out along the far x-axis. The second branch mirrors this in the third quadrant (bottom left, $x<0, y<0$). The tangent line at any point $P$ creates a right-angled triangle with the x and y axes.

## Memory technique — remember this forever
**1. The Visual Hook:** 
Think of $xy = c^2$ as the "Constant Area Curve". If you draw a rectangle using the origin $(0,0)$ and any point $(x,y)$ on the curve as opposite corners, the area of that rectangle is always exactly $c^2$. 

**2. Must Overlearn:**
*   **The Parametric Form:** $(ct, \frac{c}{t})$
*   **The Tangent Equation:** $x + t^2 y = 2ct$

**3. Spaced Repetition Schedule:**
Review this material at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days. On each review, derive the tangent equation from scratch.

**4. First Principles Pathway:**
If you forget the tangent equation, do not panic. 
1. Write $y = c^2 x^{-1}$.
2. Differentiate: $y' = -c^2 x^{-2}$.
3. Plug in $x = ct$: $y' = -c^2 / (c^2 t^2) = -1/t^2$.
4. Use $y - y_1 = m(x - x_1)$ with $(ct, c/t)$. 

## Common mistakes
1. **Forgetting the third quadrant branch.** The equation $xy = c^2$ has solutions when both $x$ and $y$ are negative. Students often only draw the first-quadrant branch.
2. **Confusing $c$ with the vertex distance.** In $xy = c^2$, the distance from the origin to the vertex is not $c$. The vertex occurs where $x=y$, meaning $x^2 = c^2 \implies x = c$. The coordinate is $(c, c)$. By the distance formula, the distance from the origin is $\sqrt{c^2 + c^2} = c\sqrt{2}$.
3. **Treating $t$ as an angle.** In ellipses, parameters are often angles (like $\theta$). In the rectangular hyperbola, $t$ is simply a dimensionless scalar. It is not an angle.

## Self-check
1. Find the coordinates of the two vertices of the rectangular hyperbola $xy = 16$.
2. Prove that the area of the triangle formed by the tangent to $xy = c^2$ at any point $t$ and the coordinate axes is exactly $2c^2$, independent of $t$.
3. A chord of $xy = c^2$ connects two points with parameters $t_1$ and $t_2$. Derive the equation of this chord, and find the mathematical condition on $t_1$ and $t_2$ for this chord to pass precisely through the origin.