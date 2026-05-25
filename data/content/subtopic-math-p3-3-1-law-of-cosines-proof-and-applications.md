## What it is
The Law of Cosines is a geometric theorem that relates the lengths of the sides of any triangle to the cosine of one of its angles. It is the generalized form of the Pythagorean theorem, allowing you to calculate unknown side lengths or angles in oblique (non-right) triangles.

## Why it matters
In physics, this law is the backbone of vector addition, used constantly to find the resultant magnitude of two forces or velocities acting at an arbitrary angle. In aerospace, it is essential for calculating distances between waypoints on a plane or determining orbital separation distances when the central angle between two satellites is known. In robotics, it is the primary tool for solving inverse kinematics—calculating the required joint angles to place a robotic arm at a specific spatial coordinate.

## When to study it
Do not attempt this until you have mastered:
1. Right-triangle trigonometry (sine, cosine, tangent).
2. The Pythagorean theorem.
3. The Cartesian coordinate system and the distance formula.
4. The unit circle, specifically the fact that the cosine of an obtuse angle ($90^\circ < \theta < 180^\circ$) is negative. 

If you do not intuitively grasp why $\cos(120^\circ) = -0.5$, review the unit circle first.

## How to study it (step by step)
1. **Draw the setup:** Place an arbitrary triangle on a Cartesian coordinate system with one vertex at the origin $(0,0)$ and one side along the positive x-axis.
2. **Assign coordinates:** Write the coordinates of the three vertices in terms of the side lengths and the angle at the origin.
3. **Derive the law:** Apply the distance formula between the two vertices not at the origin. Expand the squared binomials and simplify using the identity $\sin^2(\theta) + \cos^2(\theta) = 1$.
4. **Solve a Side-Angle-Side (SAS) problem:** Given two sides and the included angle, use the law to find the third side.
5. **Solve a Side-Side-Side (SSS) problem:** Given all three sides, rearrange the formula to solve for an unknown angle.
6. **Test the boundary condition:** Plug in $\theta = 90^\circ$ and verify that the formula collapses perfectly into the Pythagorean theorem.

## Key ideas, with intuition

**1. The Pythagorean Correction Factor**
The formula is:
$$c^2 = a^2 + b^2 - 2ab\cos(C)$$
Think of $- 2ab\cos(C)$ as the "correction factor" for not having a right angle. 
* If $C = 90^\circ$, $\cos(90^\circ) = 0$. The correction vanishes, leaving $c^2 = a^2 + b^2$.
* If $C < 90^\circ$ (acute), $\cos(C)$ is positive. You subtract a positive number, making $c^2$ smaller than $a^2 + b^2$. This makes sense: closing the hinge of the angle brings the endpoints closer together.
* If $C > 90^\circ$ (obtuse), $\cos(C)$ is negative. Subtracting a negative number adds to $a^2 + b^2$, making $c$ longer. Opening the hinge pushes the endpoints further apart.

**2. The Coordinate Geometry Proof**
Place vertex $C$ at the origin $(0,0)$. Place vertex $B$ at $(a, 0)$. Vertex $A$ is located at a distance $b$ from the origin, at an angle $C$. Using basic trigonometry, the coordinates of $A$ are $(b\cos C, b\sin C)$.
The length $c$ is the distance between $A$ and $B$. Using the distance formula squared:
$$c^2 = (x_A - x_B)^2 + (y_A - y_B)^2$$
$$c^2 = (b\cos C - a)^2 + (b\sin C - 0)^2$$
$$c^2 = b^2\cos^2 C - 2ab\cos C + a^2 + b^2\sin^2 C$$
Group the $b^2$ terms:
$$c^2 = a^2 + b^2(\cos^2 C + \sin^2 C) - 2ab\cos C$$
Since $\cos^2 C + \sin^2 C = 1$, we get:
$$c^2 = a^2 + b^2 - 2ab\cos C$$

## Worked example
**Problem:** A robotic arm has two links. Link 1 ($a$) is 5 units long, and Link 2 ($b$) is 8 units long. The joint between them is actuated to an angle of $C = 60^\circ$. What is the straight-line distance ($c$) from the base of Link 1 to the tip of Link 2?

**Step 1: State the formula.**
$$c^2 = a^2 + b^2 - 2ab\cos(C)$$

**Step 2: Substitute the known values.**
$$c^2 = 5^2 + 8^2 - 2(5)(8)\cos(60^\circ)$$

**Step 3: Evaluate the trigonometric function.**
$$\cos(60^\circ) = 0.5$$

**Step 4: Execute the arithmetic (respecting order of operations).**
$$c^2 = 25 + 64 - 80(0.5)$$
$$c^2 = 89 - 40$$
$$c^2 = 49$$

**Step 5: Solve for $c$.**
$$c = \sqrt{49} = 7$$

*Reflection:* The calculation shows that closing the angle to $60^\circ$ makes the opposite side shorter than if it were a right angle ($\sqrt{89} \approx 9.43$). The order of operations is critical: we multiplied $80 \times 0.5$ *before* subtracting it from 89.

## Diagrams

```text
                     A (b*cos(C), b*sin(C))
                    / \
                   /   \
                b /     \ c
                 /       \
                /         \
               /           \
              /             \
             /               \
      (0,0) C ---------------- B (a, 0)
                    a
```
*Note: The angle $C$ is situated at the origin. The side $c$ is strictly opposite the angle $C$. The coordinates of $A$ and $B$ allow for a direct application of the Cartesian distance formula.*

## Memory technique — remember this forever
1. **The Hook:** "Pythagoras with a penalty." The equation is just $c^2 = a^2 + b^2$, but because the angle isn't a perfect $90^\circ$, you pay a "penalty" of $-2ab\cos(C)$. 
2. **Must overlearn:** 
   $$c^2 = a^2 + b^2 - 2ab\cos(C)$$
   $$\cos(C) = \frac{a^2 + b^2 - c^2}{2ab}$$ (This rearranged form is mandatory for SSS problems).
3. **Spaced-repetition schedule:** Review and re-derive at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the penalty term, drop a triangle onto the $xy$-axis, put an angle at $(0,0)$, label the vertices $(a,0)$ and $(b\cos\theta, b\sin\theta)$, and use the distance formula. The algebra will hand you the formula.

## Common mistakes
1. **Order of operations failure:** Students often write $c^2 = 25 + 64 - 80\cos(60^\circ)$, compute $25 + 64 - 80 = 9$, and then multiply $9$ by $\cos(60^\circ)$. This is mathematically fatal. Multiplication precedes subtraction.
2. **Ignoring the negative sign on obtuse angles:** If $C = 120^\circ$, $\cos(120^\circ) = -0.5$. The formula becomes $c^2 = a^2 + b^2 - 2ab(-0.5) = a^2 + b^2 + ab$. Students frequently drop the negative and subtract anyway.
3. **Mismatched side and angle:** The angle $C$ in the formula *must* be strictly opposite the side $c$ isolated on the left side of the equals sign.

## Self-check
1. A triangle has sides of length 3, 5, and 7. Calculate the measure of the largest angle in degrees.
2. Two spacecraft leave a space station at the same time. Craft Alpha travels at 15 km/s. Craft Beta travels at 20 km/s. The angle between their flight paths is $100^\circ$. How far apart are they after 2 seconds?
3. Prove algebraically that if the sides of a triangle satisfy $c^2 = a^2 + b^2 + ab$, then the angle opposite side $c$ is exactly $120^\circ$.