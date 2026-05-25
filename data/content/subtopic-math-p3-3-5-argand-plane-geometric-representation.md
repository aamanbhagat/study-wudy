## What it is
The Argand plane (or complex plane) is a two-dimensional geometric coordinate system used to visualize complex numbers. Instead of the standard $x$ and $y$ axes used for real numbers, it uses a horizontal axis to represent the real part of the number and a vertical axis to represent the imaginary part. A complex number $z = x + iy$ is plotted as a point $(x, y)$ or as a vector pointing from the origin to that point.

## Why it matters
By mapping algebra to geometry, the Argand plane allows us to visualize abstract algebraic operations as physical transformations. Addition becomes vector translation; multiplication becomes rotation and scaling. This geometric bridge is the mathematical foundation for analyzing alternating current (AC) circuits in electrical engineering, mapping fluid flow around airfoils using conformal transformations in aerodynamics, and describing phase shifts in quantum wavefunctions. 

## When to study it
You must already understand:
1. The basic algebraic definition of complex numbers ($i^2 = -1$, $z = x + iy$).
2. 2D Cartesian coordinate systems (plotting $(x,y)$ points).
3. Basic vector addition (tip-to-tail method).
4. The Pythagorean theorem and basic right-triangle trigonometry.

If you cannot confidently add two 2D vectors or do not know what $i$ is, stop and review those concepts first.

## How to study it (step by step)
1. **Plotting points (10 mins):** Take five random complex numbers (e.g., $2+3i$, $-1+i$, $-4i$, $5$, $-2-2i$). Draw a set of axes labeled $\text{Re}$ and $\text{Im}$. Plot them as points.
2. **Drawing vectors (10 mins):** Redraw those same five points, but draw an arrow from the origin $(0,0)$ to each point. You are now treating complex numbers as 2D position vectors.
3. **Deriving the Modulus (15 mins):** Draw the vector for $z = 3 + 4i$. Drop a vertical line to the real axis to form a right triangle. Use the Pythagorean theorem to find the length of the hypotenuse. This length is the "modulus" of $z$, denoted $|z|$.
4. **Visualizing Addition (15 mins):** Pick $z_1 = 1 + 2i$ and $z_2 = 3 + i$. Calculate $z_1 + z_2$ algebraically. Plot $z_1$, $z_2$, and $z_1+z_2$. Draw lines connecting them to see the vector parallelogram.
5. **Visualizing Multiplication by $i$ (20 mins):** Pick $z = 2 + i$. Plot it. Calculate $iz$ algebraically. Plot the result. Calculate $i(iz)$, plot it. Notice the geometric pattern (a $90^\circ$ counter-clockwise rotation).

## Key ideas, with intuition

**1. The Axes Map Components**
In $z = x + iy$, $x$ and $y$ are strictly real numbers. The $i$ is merely a directional marker telling you to move along the vertical axis. The point is $(x, y)$, not $(x, iy)$.

**2. Modulus as Absolute Distance**
The modulus $|z|$ is the absolute distance from the origin to the point $z$ in the Argand plane. Because it forms a right triangle with legs $x$ and $y$, it is given by:
$$|z| = \sqrt{x^2 + y^2}$$
Notice there is no $i$ in this formula. $|z|$ is always a non-negative real number. 

**3. Complex Addition is Vector Addition**
When you add $z_1 = x_1 + iy_1$ and $z_2 = x_2 + iy_2$, you group the real and imaginary parts: $(x_1 + x_2) + i(y_1 + y_2)$. Geometrically, this is identical to adding 2D vectors $\vec{v_1} = \langle x_1, y_1 \rangle$ and $\vec{v_2} = \langle x_2, y_2 \rangle$. They form a parallelogram.

**4. Multiplication by $i$ is a $90^\circ$ Rotation**
Let $z = 1$. Multiply by $i$: $1 \cdot i = i$. (Moved from the positive real axis to the positive imaginary axis).
Multiply by $i$ again: $i \cdot i = -1$. (Moved to the negative real axis).
Multiply by $i$ again: $-1 \cdot i = -i$. (Moved to the negative imaginary axis).
Multiply by $i$ again: $-i \cdot i = -(-1) = 1$. (Back to the start).
Algebraically, $i^2 = -1$. Geometrically, multiplying by $i$ rotates any complex vector exactly $90^\circ$ ($\pi/2$ radians) counter-clockwise.

## Worked example
**Problem:** Given $z = 3 + 2i$, calculate $w = i \cdot z$. Find the modulus of both $z$ and $w$. Verify geometrically that the vectors are perpendicular.

**Step 1: Calculate $w$ algebraically.**
$$w = i(3 + 2i) = 3i + 2i^2$$
Since $i^2 = -1$:
$$w = -2 + 3i$$
*Reflection:* The algebraic distribution of $i$ naturally swaps the $x$ and $y$ magnitudes and flips one sign.

**Step 2: Calculate the moduli.**
$$|z| = \sqrt{3^2 + 2^2} = \sqrt{9 + 4} = \sqrt{13}$$
$$|w| = \sqrt{(-2)^2 + 3^2} = \sqrt{4 + 9} = \sqrt{13}$$
*Reflection:* The lengths are identical. Multiplying by $i$ rotates the vector but does not scale it (since $|i| = 1$).

**Step 3: Verify perpendicularity using vector dot product.**
Treat $z$ as $\vec{v_1} = \langle 3, 2 \rangle$ and $w$ as $\vec{v_2} = \langle -2, 3 \rangle$.
$$\vec{v_1} \cdot \vec{v_2} = (3)(-2) + (2)(3) = -6 + 6 = 0$$
*Reflection:* A dot product of zero proves the vectors are orthogonal ($90^\circ$ apart). The algebra perfectly matches the geometry.

## Diagrams

```text
       Im (Imaginary Axis)
        ^
      3 |        w = -2 + 3i
        |       * 
      2 |       | \ .  (90 deg angle)
        |       |   . \
      1 |       |     . \  z = 3 + 2i
        |       |       . *
 - - - -+ - - - - - - - - | - - > Re (Real Axis)
       0|       1   2   3 |
     -1 |                 |
```
*Note: The vector $z$ is drawn from $(0,0)$ to $(3,2)$. The vector $w$ is drawn from $(0,0)$ to $(-2,3)$. The angle between them at the origin is exactly $90^\circ$.*

## Memory technique — remember this forever
1. **The Hook:** *"i is a quarter-turn."* Every time you see an $i$, do not just think of $\sqrt{-1}$. Think of a steering wheel turning $90^\circ$ to the left.
2. **Must-know formulas:**
   * Coordinate mapping: $z = x + iy \iff (x,y)$
   * Modulus: $|z| = \sqrt{x^2 + y^2}$
3. **Spaced-repetition schedule:** Review this concept and redraw the rotation diagram at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the modulus formula, draw the point $(x,y)$ on a Cartesian plane, drop a vertical line to the x-axis, and use $a^2 + b^2 = c^2$ to find the distance to the origin.

## Common mistakes
* **Including $i$ in the coordinates:** Students often plot $z = 3 + 4i$ as the point $(3, 4i)$. The axes are already defined as Real and Imaginary. The point is simply $(3, 4)$.
* **Including $i$ in the modulus:** Calculating $|3 + 4i| = \sqrt{3^2 + (4i)^2} = \sqrt{9 - 16} = \sqrt{-7}$. This is fatal. The formula is $\sqrt{x^2 + y^2}$. The $y$ component is $4$, not $4i$. Modulus is a physical distance; it must be real and positive.
* **Confusing the complex plane with the Cartesian plane:** In Cartesian $(x,y)$, the point represents two distinct variables. In the Argand plane, the point $(x,y)$ represents a *single* number, $z$. 

## Self-check
1. Plot $z = -3 - 4i$ on an Argand diagram. Calculate its modulus.
2. Let $z_1 = 2 + i$ and $z_2 = -1 + 2i$. Plot $z_1$, $z_2$, and their sum $z_1 + z_2$. Verify visually that they form a parallelogram with the origin.
3. Let $z = x + iy$. Geometrically, what transformation occurs when you multiply $z$ by $-i$? Prove this by calculating $-i \cdot z$ algebraically and taking the dot product of the resulting coordinate vector with $\langle x, y \rangle$.