## What it is
The equation of a line in 3D space is a mathematical description of a straight, infinite path. Because a single linear equation in 3D (like $ax + by + cz = d$) defines a 2D plane, not a 1D line, we must define a line using vectors. We express this in three equivalent ways: the vector form (a starting point plus a scaled direction), the parametric form (individual equations for $x, y,$ and $z$ based on a shared parameter), and the symmetric form (a continuous proportion linking $x, y,$ and $z$ directly).

## Why it matters
In aerospace and physics, these equations model linear trajectories: the path of a laser, the unperturbed velocity vector of a spacecraft, or a line of sight. In computer science, specifically 3D graphics and physics engines, they are the foundation of ray tracing and collision detection. You cannot calculate where a simulated photon strikes a polygon without mastering 3D line equations.

## When to study it
You must already understand:
1. 3D Cartesian coordinates.
2. Vector algebra: position vectors, direction vectors, vector addition, and scalar multiplication. 
If you cannot confidently subtract two points to find the vector between them, or scale a vector by a constant, stop and review fundamental vector operations first.

## How to study it (step by step)
1. **Understand the Anchor and Arrow:** Visualize a line as requiring a specific starting point (the anchor) and a vector pointing along the line (the arrow).
2. **Derive the Vector Form:** Use vector addition to show that any point on the line is reached by traveling to the anchor, then moving some distance along the direction vector.
3. **Expand to Parametric Form:** Break the vector equation into its $x, y,$ and $z$ components. Treat the scalar parameter $t$ as "time".
4. **Algebraically derive Symmetric Form:** Take the three parametric equations, isolate $t$ in each, and set them equal to one another.
5. **Handle Edge Cases:** Determine what happens to the symmetric form if the direction vector has a zero component (e.g., parallel to a coordinate plane).
6. **Practice Conversions:** Write down a line in symmetric form, convert it to parametric, then to vector form, and vice versa. 

## Key ideas, with intuition

**1. The Vector Form: $\vec{r} = \vec{a} + t\vec{b}$**
Think of $\vec{r}$ as the position vector of *any* generic point $(x, y, z)$ on the line. To get there from the origin, you first travel to a known point on the line using its position vector $\vec{a} = \langle x_0, y_0, z_0 \rangle$. From there, you travel along the line by adding a multiple of the direction vector $\vec{b} = \langle b_1, b_2, b_3 \rangle$. The scalar $t \in \mathbb{R}$ stretches or flips the direction vector to reach every possible point.

**2. The Parametric Form: The "Kinematic" View**
If we expand the vector equation into components:
$$ \langle x, y, z \rangle = \langle x_0, y_0, z_0 \rangle + t \langle b_1, b_2, b_3 \rangle $$
We get three independent equations linked by $t$:
$$ x = x_0 + b_1 t $$
$$ y = y_0 + b_2 t $$
$$ z = z_0 + b_3 t $$
Intuition: If $t$ is time, $(x_0, y_0, z_0)$ is your initial position at $t=0$, and $\langle b_1, b_2, b_3 \rangle$ is your constant velocity vector.

**3. The Symmetric Form: The "Geometric" View**
If we want to describe the line without the artificial parameter $t$, we solve for $t$ in all three parametric equations:
$$ t = \frac{x - x_0}{b_1}, \quad t = \frac{y - y_0}{b_2}, \quad t = \frac{z - z_0}{b_3} $$
Setting them equal yields the symmetric equations:
$$ \frac{x - x_0}{b_1} = \frac{y - y_0}{b_2} = \frac{z - z_0}{b_3} $$
This shows the strict proportional relationship between the coordinates. If you move along the line, the change in $x$ relative to $b_1$ must perfectly match the change in $y$ relative to $b_2$.

## Worked example
**Problem:** Find the vector, parametric, and symmetric equations of the line passing through points $P(1, -2, 3)$ and $Q(4, 0, -1)$.

**Step 1: Find the direction vector $\vec{b}$.**
The line goes through $P$ and $Q$, so the vector from $P$ to $Q$ lies on the line.
$$ \vec{b} = \vec{PQ} = Q - P = \langle 4 - 1, 0 - (-2), -1 - 3 \rangle = \langle 3, 2, -4 \rangle $$
*Reflection:* We could have used $\vec{QP}$. The line would be the same, just traced in reverse.

**Step 2: Write the vector form.**
Choose either $P$ or $Q$ as the anchor $\vec{a}$. We will use $P$.
$$ \vec{r} = \langle 1, -2, 3 \rangle + t \langle 3, 2, -4 \rangle $$
*Reflection:* This states: "Start at $P$, then move $t$ steps of $\vec{PQ}$."

**Step 3: Write the parametric form.**
Read the components directly from the vector form.
$$ x = 1 + 3t $$
$$ y = -2 + 2t $$
$$ z = 3 - 4t $$
*Reflection:* These are the coordinates of a particle moving along the line at time $t$.

**Step 4: Write the symmetric form.**
Solve for $t$ in each equation and equate them.
$$ \frac{x - 1}{3} = \frac{y + 2}{2} = \frac{z - 3}{-4} $$
*Reflection:* Notice the signs. The numerators are $(x - x_0)$, so a point of $(1, -2, 3)$ becomes $x-1$, $y+2$, $z-3$.

## Diagrams

```text
           z
           |
           |        Line L
           |       /
           |      /
           |     /  . R (x, y, z)  <-- r = a + tb
           |    /  /
           |   /  / tb
           |  /  /
           | /  /
           |/ . A (x0, y0, z0)  <-- Anchor point
          /| /
       a / |/
        /  +----------------- y
       /  Origin (0,0,0)
      /
     x

Vector Addition Triangle:
Origin -> A = Vector a
A -> R      = Vector tb
Origin -> R = Vector r = a + tb
```

## Memory technique — remember this forever
1. **The Mnemonic:** "Anchor + Time $\times$ Velocity". 
   * Anchor = Position vector $\vec{a}$. 
   * Time = scalar $t$. 
   * Velocity = Direction vector $\vec{b}$.
2. **Must overlearn:** 
   * $\vec{r} = \vec{a} + t\vec{b}$
   * $\frac{x - x_0}{b_1} = \frac{y - y_0}{b_2} = \frac{z - z_0}{b_3}$
3. **Spaced-repetition schedule:** Review this derivation and convert between all three forms at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the formulas, draw the triangle. Origin to Anchor ($\vec{a}$), Anchor to Point ($t\vec{b}$). Vector addition dictates the path from Origin to Point is $\vec{r} = \vec{a} + t\vec{b}$. From there, you can trivially derive the parametric and symmetric forms using basic algebra.

## Common mistakes
* **Confusing points and vectors:** Students often use a position vector as the direction vector. The direction vector $\vec{b}$ must be the *difference* between two points on the line, not the coordinates of a single point.
* **Non-unique equations:** Thinking your answer is wrong because it doesn't match the textbook's answer key. A line has infinitely many valid equations. If you pick a different anchor point, or scale the direction vector (e.g., $\langle 6, 4, -8 \rangle$ instead of $\langle 3, 2, -4 \rangle$), the equation looks different but represents the exact same geometric line.
* **Mishandling zeros in symmetric form:** If the direction vector is $\langle 2, 0, 5 \rangle$, you cannot write $\frac{y-y_0}{0}$. Instead, write the symmetric form for $x$ and $z$, and append the constant $y$ as a comma-separated condition: $\frac{x - x_0}{2} = \frac{z - z_0}{5}, \; y = y_0$.

## Self-check
1. Find the symmetric equations of the line passing through the origin and the point $(4, -7, 2)$.
2. A line is given by $\frac{x-3}{2} = \frac{y+1}{-1}, \; z = 4$. Write this line in vector form.
3. Determine if the line $\vec{r_1} = \langle 1, 2, 0 \rangle + t \langle 2, -1, 1 \rangle$ and the line $\vec{r_2} = \langle 3, 1, 1 \rangle + s \langle -4, 2, -2 \rangle$ are parallel, intersecting, or skew. (Hint: look closely at their direction vectors).