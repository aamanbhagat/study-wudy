## What it is
A conic section is the set of all points in a plane whose distance to a fixed point (the focus) is a constant ratio to its perpendicular distance from a fixed line (the directrix). This constant ratio is a dimensionless number called the eccentricity, denoted by $e$. By varying $e$, this single geometric definition generates circles, ellipses, parabolas, and hyperbolas.

## Why it matters
This definition is the absolute bedrock of orbital mechanics and rocket science. When a spacecraft travels under the gravitational pull of a planet, its trajectory is precisely a conic section where the planet's center of mass sits at the focus. Understanding eccentricity $e$ allows you to instantly classify orbits: $e < 1$ means you are trapped in a closed orbit (ellipse), $e = 1$ is the minimum escape trajectory (parabola), and $e > 1$ means you are escaping the system with excess velocity (hyperbola).

## When to study it
You must be entirely comfortable with Cartesian coordinates, the Pythagorean distance formula, and the point-to-line distance formula. You should also understand the concept of a "locus"—a set of points satisfying a specific geometric condition. If you cannot confidently find the perpendicular distance from a point $(x,y)$ to an arbitrary line $Ax + By + C = 0$, review that before proceeding.

## How to study it (step by step)
1. **Memorize the locus condition:** Write down $d(P, F) = e \cdot d(P, L)$. Understand that $P$ is the variable point, $F$ is the focus, and $L$ is the directrix. 
2. **Derive the parabola:** Set $e=1$, place the focus at $(c, 0)$, and the directrix at $x = -c$. Use the distance formulas to derive the standard equation $y^2 = 4cx$. Do not look up the answer until you finish.
3. **Derive the ellipse:** Set $0 < e < 1$. Place the focus at the origin $(0,0)$ and the directrix at $x = d$. Solve for the Cartesian equation and complete the square to find its center.
4. **Graph and animate:** Open Desmos. Plot a fixed point $F$ and a fixed line $L$. Input the locus equation using the distance formulas, leaving $e$ as a slider. Drag $e$ from $0$ to $2$ and watch the curve warp from an ellipse to a parabola to a hyperbola.
5. **Tackle a tilted directrix:** Solve one problem where the directrix is not parallel to the axes (e.g., $y = x + 2$). The algebra will be heavy; push through it to prove to yourself that the definition holds regardless of coordinate rotation.

## Key ideas, with intuition
**1. The Master Equation**
Let the variable point be $P(x,y)$, the focus be $F(x_0, y_0)$, and the directrix be the line $L: Ax + By + C = 0$. The definition translates directly into this algebraic mandate:
$$ \sqrt{(x-x_0)^2 + (y-y_0)^2} = e \frac{|Ax + By + C|}{\sqrt{A^2 + B^2}} $$
Every standard conic equation you have ever memorized is just a simplified, algebraically rearranged version of this exact formula.

**2. Eccentricity as a "Shape" Parameter**
Eccentricity measures how much a conic deviates from being circular. 
*   $e = 0$: Circle (the directrix is pushed infinitely far away).
*   $0 < e < 1$: Ellipse (the distance to the focus is strictly less than the distance to the directrix, forcing the curve to close in on itself).
*   $e = 1$: Parabola (the boundary case; the curve opens up and never closes).
*   $e > 1$: Hyperbola (the distance to the focus is greater, allowing the curve to veer away indefinitely).

**3. The Polar Form Advantage**
In physics, we place the focus at the origin because the gravitational force emanates from the focus. If $F=(0,0)$ and the directrix is $x = -d$, the distance to the focus is simply $r$, and the distance to the directrix is $d + x = d + r\cos\theta$. 
$$ r = e(d + r\cos\theta) $$
Solving for $r$ yields the polar equation of a conic:
$$ r = \frac{ed}{1 - e\cos\theta} $$
This single equation describes all orbital trajectories.

## Worked example
**Problem:** Find the Cartesian equation of the conic with focus at $(2, 0)$, directrix $x = -2$, and $e = 1/2$. Classify the conic.

**Step 1: Set up the locus definition.**
Let $P(x,y)$ be a point on the curve. 
$$ d(P, F) = e \cdot d(P, L) $$

**Step 2: Apply distance formulas.**
Distance to focus $F(2,0)$: $\sqrt{(x-2)^2 + y^2}$
Distance to directrix $x = -2$ (which is $x + 2 = 0$): $|x + 2|$
$$ \sqrt{(x-2)^2 + y^2} = \frac{1}{2}|x+2| $$

**Step 3: Square both sides to eliminate the radical and absolute value.**
$$ (x-2)^2 + y^2 = \frac{1}{4}(x+2)^2 $$

**Step 4: Expand and group terms.**
$$ x^2 - 4x + 4 + y^2 = \frac{1}{4}(x^2 + 4x + 4) $$
Multiply by 4 to clear fractions:
$$ 4x^2 - 16x + 16 + 4y^2 = x^2 + 4x + 4 $$
$$ 3x^2 - 20x + 4y^2 + 12 = 0 $$

**Step 5: Complete the square to reveal the standard form.**
$$ 3\left(x^2 - \frac{20}{3}x\right) + 4y^2 = -12 $$
$$ 3\left(x^2 - \frac{20}{3}x + \frac{100}{9}\right) + 4y^2 = -12 + 3\left(\frac{100}{9}\right) $$
$$ 3\left(x - \frac{10}{3}\right)^2 + 4y^2 = \frac{64}{3} $$
Divide by $64/3$:
$$ \frac{\left(x - \frac{10}{3}\right)^2}{64/9} + \frac{y^2}{16/3} = 1 $$

*Reflection:* Because $e = 1/2 < 1$, we expected an ellipse. The final equation has positive coefficients for both the $x^2$ and $y^2$ terms, confirming it is indeed an ellipse. The center has shifted to $(10/3, 0)$ due to the asymmetric placement of the focus and directrix relative to the origin.

## Diagrams
```text
      y
      |                      P(x,y)
      |                     /|
      |                    / |
      |           d_F     /  |
      |                  /   |
      |                 /    |
------|----------------F-----|------- x
      |                |     |
      |      d_L       |     |
      |<-------------->|     |
      |                      |
    x=-d                  x-coord
 (Directrix L)            of P
 
 Definition: d_F = e * d_L
```

## Memory technique — remember this forever
1. **The Mnemonic:** "Eccentricity is the **Escape** parameter." 
   * $e < 1$: You don't have enough energy. You are trapped (Ellipse).
   * $e = 1$: You have *exactly* escape velocity. You break free, but coast to a halt at infinity (Parabola).
   * $e > 1$: You have excess energy. You escape and fly away forever (Hyperbola).
2. **The Facts to Overlearn:** 
   * $d(P,F) = e \cdot d(P,L)$
   * $e < 1 \implies$ Ellipse; $e = 1 \implies$ Parabola; $e > 1 \implies$ Hyperbola.
3. **Spaced-repetition schedule:** Review this concept at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget a standard conic formula (like $a^2 - b^2 = c^2$), do not panic. Place a focus at $(c,0)$, a directrix at $x = a^2/c$, set $e = c/a$, and run the Pythagorean theorem. You can rebuild the entire geometry of conics from $d(P,F) = e \cdot d(P,L)$.

## Common mistakes
* **Hand-waving the absolute value:** When writing the distance to the directrix, students often write $(x - d)$ instead of $|x - d|$. While squaring both sides hides this error, it will destroy your logic if you try to evaluate the linear distance directly.
* **Forgetting to square $e$:** When squaring both sides of the locus equation, students frequently write $(x-x_0)^2 + (y-y_0)^2 = e(Ax+By+C)^2 / (A^2+B^2)$. It must be $e^2$. 
* **Confusing the directrix with the axis of symmetry:** The directrix is a line *perpendicular* to the axis of symmetry. The focus lies *on* the axis of symmetry, never on the directrix.

## Self-check
1. Set up and simplify the Cartesian equation of the conic with focus $(0,3)$, directrix $y=-3$, and $e=1$. What specific shape is this?
2. A conic has the equation $r = \frac{4}{1 + 2\cos\theta}$ in polar coordinates. What is its eccentricity, and what type of conic is it?
3. Derive the general Cartesian equation for a conic with focus at the origin $(0,0)$, directrix $3x + 4y - 10 = 0$, and eccentricity $e=2$. (Expect cross terms like $xy$—this means the conic is rotated!).