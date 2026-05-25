## What it is
The 3D coordinate system extends the familiar 2D Cartesian plane by adding a third axis, the $z$-axis, which is mutually perpendicular to both the $x$ and $y$ axes. This creates a spatial framework where any point is uniquely identified by an ordered triplet $(x, y, z)$. Instead of dividing a flat plane into four quadrants, the three intersecting coordinate planes divide 3D space into eight distinct regions called octants.

## Why it matters
You cannot design a rocket trajectory, model a rigid body's rotation in physics, or render 3D graphics without a strict coordinate system. In aerospace, defining the attitude and position of a spacecraft relies entirely on translating between different 3D coordinate frames (e.g., Earth-centered inertial vs. body-fixed). In machine learning, 3D coordinates serve as the vital conceptual bridge between the 2D plane and $N$-dimensional vector spaces. 

## When to study it
You must be completely fluent in 2D Cartesian geometry before starting this. If you cannot instantly plot $(x, y)$ coordinates, calculate the distance between two points in a plane, or find a 2D midpoint, go back and master those first. You should also have a solid grasp of the Pythagorean theorem.

## How to study it (step by step)
1. **Calibrate your axes:** Hold up your right hand. Point your index finger forward ($x$), your middle finger to the left ($y$), and your thumb up ($z$). This is the standard "Right-Hand Rule" for 3D axes. 
2. **Draw the axes:** Practice sketching the $x$, $y$, and $z$ axes on 2D paper. The standard convention on paper is $z$ pointing up, $y$ pointing right, and $x$ coming "out" of the page toward you (drawn at a downward-left angle).
3. **Plot points via prisms:** Pick a random triplet, like $(2, 3, 4)$. Draw it by sketching a rectangular prism starting from the origin, moving 2 units along $x$, 3 along $y$, and 4 along $z$. The opposite corner of the prism is your point.
4. **Map the octants:** Write out the sign combinations for all eight octants. The 1st octant is $(+, +, +)$. The remaining seven do not have a universally standardized numbering, but you must be able to instantly identify a point's signs.
5. **Derive the distance formula:** Draw a point in 3D. Use the Pythagorean theorem on the $xy$-plane to find the distance from the origin to $(x, y, 0)$. Then, use the Pythagorean theorem again with the $z$-height to find the true 3D distance.

## Key ideas, with intuition

**1. The Right-Hand Rule**
Mathematics standardizes on a "right-handed" coordinate system. If you curl the fingers of your right hand from the positive $x$-axis toward the positive $y$-axis, your thumb points in the direction of the positive $z$-axis. If you swap $x$ and $y$, you create a left-handed system. Do not do this; it will invert your cross products later in physics.

**2. Coordinate Planes as Walls**
In 2D, axes are lines. In 3D, pairs of axes form flat planes:
*   The **$xy$-plane** is the floor. Its equation is $z = 0$.
*   The **$xz$-plane** is the side wall. Its equation is $y = 0$.
*   The **$yz$-plane** is the front wall. Its equation is $x = 0$.
To project a point onto a plane, you simply set the missing coordinate to zero.

**3. The 3D Distance Formula**
The distance $d$ between two points $P_1(x_1, y_1, z_1)$ and $P_2(x_2, y_2, z_2)$ is a direct double-application of the Pythagorean theorem:
$$ d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2} $$

## Worked example
**Problem:** Find the distance between $P(1, -2, 3)$ and $Q(4, 2, -1)$. Identify the sign configuration of the octant for each point.

**Step 1: Identify octant signs.**
*   Point $P$ is $(+, -, +)$. It lies in the region where $x$ is positive, $y$ is negative, and $z$ is positive.
*   Point $Q$ is $(+, +, -)$. 

**Step 2: Calculate differences along each axis.**
*   $\Delta x = 4 - 1 = 3$
*   $\Delta y = 2 - (-2) = 4$
*   $\Delta z = -1 - 3 = -4$

**Step 3: Apply the 3D distance formula.**
$$ d = \sqrt{(\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2} $$
$$ d = \sqrt{(3)^2 + (4)^2 + (-4)^2} $$
$$ d = \sqrt{9 + 16 + 16} $$
$$ d = \sqrt{41} $$

**Reflection:** The 3D distance formula worked because we implicitly found the distance between the projections of $P$ and $Q$ on the $xy$-plane ($\sqrt{3^2 + 4^2} = 5$), and then used that as the base of a new right triangle with height $\Delta z = -4$. The hypotenuse of *that* triangle is $\sqrt{5^2 + (-4)^2} = \sqrt{41}$.

## Diagrams

```text
       z (up)
       ^
       |
       |       P(x,y,z)
       |      /|
       |    /  |  <-- z-height
       |  /    |
       +-------+ - - > y (right)
      / \      |
     /    \    |
    /       \  |
   v          \|
  x (out)      Q(x,y,0)  <-- Projection on xy-plane
```
*Notice how the distance from the origin to Q forms a right triangle on the floor. The distance from the origin to P forms a second right triangle "standing up" on the floor.*

## Memory technique — remember this forever
**1. The Visual Hook:** Look at the bottom corner of the room you are in. The wall to your left is the $xz$-plane. The wall to your right is the $yz$-plane. The floor is the $xy$-plane. The corner itself is the origin $(0,0,0)$.

**2. Formulas to Overlearn:**
*   Distance: $d = \sqrt{\Delta x^2 + \Delta y^2 + \Delta z^2}$
*   Midpoint: $M = \left( \frac{x_1+x_2}{2}, \frac{y_1+y_2}{2}, \frac{z_1+z_2}{2} \right)$

**3. Spaced-Repetition Schedule:**
Review the Right-Hand Rule, the equations of the coordinate planes, and the distance derivation at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

**4. First Principles Pathway:** 
If you forget the distance formula, draw a box. The distance between opposite corners of a box with side lengths $a, b, c$ is the hypotenuse of a right triangle with base $\sqrt{a^2+b^2}$ and height $c$. Squaring both yields $(a^2+b^2) + c^2$.

## Common mistakes
*   **Drawing left-handed axes:** Swapping the $x$ and $y$ labels on your paper. Always verify with your right hand: fingers curl $x \to y$, thumb points $z$.
*   **Confusing the equations of planes:** Assuming the $xy$-plane is defined by $x=0, y=0$. No. The $xy$-plane contains *all* $x$ and $y$ values; it is defined strictly by $z=0$.
*   **Miscalculating distance to an axis:** The distance from $(a,b,c)$ to the $x$-axis is not $a$. It is $\sqrt{b^2 + c^2}$. Students routinely project onto the axis rather than finding the perpendicular distance to it.

## Self-check
1. What is the perpendicular distance from the point $(3, -4, 5)$ to the $xz$-plane?
2. Find the coordinates of the projection of the point $(-2, 6, -3)$ onto the $y$-axis.
3. A cube has one vertex at the origin and the diametrically opposite vertex at $(a, a, a)$. What are the coordinates of the other six vertices?