## What it is
The distance from a point to a plane is the shortest geometric length between a specific coordinate in 3D space and an infinite, flat 2D surface. Because the shortest path between a point and a surface is a perpendicular line, this distance is the length of the line segment dropped from the point that intersects the plane at exactly 90 degrees.

## Why it matters
In aerospace, this calculates the clearance distance between a spacecraft's trajectory (a point at a given time) and a planar constraint, like a solar panel array or an orbital boundary. In machine learning, Support Vector Machines (SVMs) rely entirely on this concept: the algorithm finds the hyperplane that maximizes the "margin" (the perpendicular distance) between the plane and the nearest data points. 

## When to study it
Do not attempt this until you have mastered:
1. 3D Cartesian coordinates.
2. Vector operations (specifically the dot product and vector magnitude).
3. The equations of a plane (both the Cartesian form $ax+by+cz+d=0$ and the vector form $\vec{n} \cdot (\vec{r} - \vec{r_0}) = 0$).
4. Vector projection (finding the component of one vector along another).

If you do not intuitively understand what a normal vector is, stop and review the equation of a plane.

## How to study it (step by step)
1. **Review scalar projection:** Recall that the length of vector $\vec{v}$ projected onto vector $\vec{u}$ is $\frac{|\vec{v} \cdot \vec{u}|}{|\vec{u}|}$.
2. **Draw the geometry:** Sketch a plane, its normal vector $\vec{n}$, a point $P$ floating above it, and a random point $A$ on the plane. 
3. **Form the connection:** Draw the vector $\vec{AP}$. Recognize that this vector is slanted; it is not the shortest distance.
4. **Project:** Mathematically project $\vec{AP}$ onto the normal vector $\vec{n}$. 
5. **Derive the formula:** Expand the dot product $\vec{AP} \cdot \vec{n}$ using coordinates to prove to yourself that it perfectly yields the standard Cartesian formula.
6. **Practice:** Compute the distance for 3 distinct point-plane pairs. For the first one, use the vector projection method. For the next two, use the Cartesian formula.

## Key ideas, with intuition

**1. The shortest path is orthogonal**
Any slanted path from the point to the plane forms the hypotenuse of a right-angled triangle. Since the hypotenuse is always the longest side, the perpendicular leg (parallel to the plane's normal vector) is strictly the shortest path.

**2. The normal vector is your ruler**
The plane's normal vector, $\vec{n} = \langle a, b, c \rangle$, defines the absolute "up/down" direction relative to the plane. To find the distance to the plane, we only care about movement in this specific direction.

**3. The Projection Principle**
Pick *any* point $A$ on the plane. Draw a vector from $A$ to your target point $P_0$. This vector $\vec{AP_0}$ bridges the gap, but it's slanted. To find the true perpendicular distance $D$, we just need to know how much of $\vec{AP_0}$ points in the direction of the normal vector $\vec{n}$. 

Mathematically, this is the scalar projection of $\vec{AP_0}$ onto $\vec{n}$:
$$D = \frac{|\vec{AP_0} \cdot \vec{n}|}{|\vec{n}|}$$

**4. The Cartesian Translation**
If $P_0 = (x_0, y_0, z_0)$ and the plane is $ax+by+cz+d=0$, the projection simplifies beautifully. The dot product $\vec{AP_0} \cdot \vec{n}$ evaluates exactly to $ax_0 + by_0 + cz_0 + d$. The magnitude of the normal vector is $\sqrt{a^2+b^2+c^2}$. Thus:
$$D = \frac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2+b^2+c^2}}$$

## Worked example
**Problem:** Find the distance from the point $P(2, -1, 4)$ to the plane $3x - 4y + 5z - 6 = 0$.

**Step 1: Identify the normal vector and its magnitude.**
From the plane equation, $\vec{n} = \langle 3, -4, 5 \rangle$.
$$|\vec{n}| = \sqrt{3^2 + (-4)^2 + 5^2} = \sqrt{9 + 16 + 25} = \sqrt{50} = 5\sqrt{2}$$

**Step 2: Evaluate the plane equation at the point $P$.**
Plug $(2, -1, 4)$ into the left side of the plane equation.
$$\text{Value} = 3(2) - 4(-1) + 5(4) - 6$$
$$\text{Value} = 6 + 4 + 20 - 6 = 24$$

**Step 3: Apply the formula.**
Take the absolute value of the result from Step 2, and divide by the magnitude from Step 1.
$$D = \frac{|24|}{5\sqrt{2}} = \frac{24}{5\sqrt{2}}$$
Rationalizing the denominator:
$$D = \frac{24\sqrt{2}}{10} = \frac{12\sqrt{2}}{5}$$

*Reflection:* Plugging the point into the plane equation gave us the unscaled projection. Dividing by $|\vec{n}|$ normalized our "ruler" so the result is a true spatial distance.

## Diagrams

```text
          P (x₀, y₀, z₀)
          *
         /|
        / |
  AP   /  | D (Distance)
      /   |
     /    |    n = <a, b, c>
    /     |    ^
   /      |    |
  *-------+----|------------------- Plane: ax + by + cz + d = 0
 A        |    |
          v    |
```
*Note: $\vec{n}$ is perpendicular to the plane. The distance $D$ is parallel to $\vec{n}$. Vector $\vec{AP}$ is projected onto $\vec{n}$ to yield $D$.*

## Memory technique — remember this forever

1. **The Mnemonic:** *"Plug and Normalize."* 
   To find the distance, **plug** the point into the plane's equation, and **normalize** it by dividing by the length of the normal vector.
2. **Must overlearn:** 
   $$D = \frac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2+b^2+c^2}}$$
3. **Spaced-repetition schedule:** Write the formula and derive it from a vector projection on days 1, 3, 7, 16, and 35.
4. **First principles pathway:** If you forget the formula, draw a point $P$ off the plane and a point $A$ on the plane. The distance is the projection of $\vec{AP}$ onto the normal vector $\vec{n}$. Write $D = \frac{|\vec{AP} \cdot \vec{n}|}{|\vec{n}|}$.

## Common mistakes
* **Ignoring the absolute value:** Distances cannot be negative. If you plug a point into the plane equation and get $-12$, the numerator is $|-12| = 12$. The sign only tells you *which side* of the plane the point is on.
* **Mismatched plane equation formats:** The formula assumes the plane is written as $ax+by+cz+d=0$. If you are given $2x + 3y - z = 5$, you must rewrite it as $2x + 3y - z - 5 = 0$ before extracting $d$. Failing to flip the sign of $d$ is a fatal error.
* **Dividing by the point's magnitude:** Students sometimes divide by $\sqrt{x_0^2+y_0^2+z_0^2}$. You must divide by the magnitude of the *normal vector* $\vec{n}$, which is $\sqrt{a^2+b^2+c^2}$.

## Self-check
1. Find the distance from the origin $(0,0,0)$ to the plane $2x - y + 2z = 6$.
2. Find the distance between the two parallel planes $x+y+z=4$ and $x+y+z=10$. *(Hint: Pick an arbitrary point on the first plane, then find its distance to the second plane).*
3. Let point $P$ be $(1, 1, 1)$ and the plane be $x - 2y + z = 0$. Calculate the distance. What does the result tell you about the geometric relationship between $P$ and the plane?