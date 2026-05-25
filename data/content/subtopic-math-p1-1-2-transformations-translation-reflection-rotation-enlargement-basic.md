## What it is
A geometric transformation is a mathematical rule that maps every point of a shape to a new, specific position on a plane. Translation slides the shape, reflection flips it across a line, rotation turns it around a fixed point, and enlargement scales its size. Together, they describe how objects move, orient, and scale in space.

## Why it matters
In aerospace engineering, transformations are the absolute foundation of rigid body dynamics; describing how a spacecraft translates along an orbit and rotates around its center of mass requires mastering these exact concepts in 3D. In computer science and machine learning, these transformations are the basic linear algebra operations used to render graphics, animate physics engines, and augment image data for training neural networks. Mastering them geometrically now makes the matrix algebra you will encounter later completely intuitive.

## When to study it
You must be completely comfortable with the Cartesian coordinate system ($x$ and $y$ axes) and plotting points. You also need a firm grasp of basic 2D shapes (triangles, squares) and their properties (vertices, angles, parallel lines). If you cannot plot a point like $(-3, 4)$ instantly, or if you do not know what a right angle is, go back and master the coordinate plane first.

## How to study it (step by step)
1. **Master the Slide (Translation):** Draw a triangle on graph paper. Pick a translation vector, say $(+2, -3)$. Add $2$ to every $x$-coordinate and subtract $3$ from every $y$-coordinate. Draw the new triangle. 
2. **Master the Flip (Reflection):** Plot a point $(4, 2)$. Reflect it across the $x$-axis. Notice the $y$-coordinate changes sign to $(4, -2)$. Repeat for the $y$-axis and the line $y=x$.
3. **Master the Turn (Rotation):** Plot the point $(3, 1)$. Draw a line from the origin to this point. Physically rotate your paper $90^\circ$ counter-clockwise. Record the new coordinates $(-1, 3)$. Find the algebraic pattern.
4. **Master the Scale (Enlargement):** Plot a square. Multiply all coordinates by a scale factor of $k=2$. Draw the new square. Notice how the side lengths double, but the area quadruples.
5. **Combine and Commute:** Apply a translation then a reflection to a point. Then, apply the exact same reflection followed by the translation. Notice that the final positions are different. Order matters.

## Key ideas, with intuition
**1. Isometry (Rigid Transformations)**
Translations, reflections, and rotations are "isometries." They preserve side lengths and angles. The shape moves, but its fundamental geometry is completely unchanged. Enlargement is *not* an isometry; it preserves angles (similarity) but changes side lengths.

**2. Translation as Vector Addition**
To translate a point $P(x,y)$ by a vector $\vec{v} = \begin{pmatrix} a \\ b \end{pmatrix}$, you simply add the components:
$$ P'(x', y') = (x + a, y + b) $$

**3. Reflection as Sign Flipping**
Reflecting across axes is just flipping signs. The mirror line acts as a boundary of symmetry.
* Across $x$-axis: The $x$ stays the same, $y$ flips. $(x, y) \to (x, -y)$
* Across $y$-axis: The $y$ stays the same, $x$ flips. $(x, y) \to (-x, y)$

**4. Rotation as Coordinate Swapping**
In mathematics, standard rotation is always **counter-clockwise (CCW)**. Rotating $90^\circ$ around the origin swaps the $x$ and $y$ magnitudes and flips one sign based on the quadrant.
* $90^\circ$ CCW: $(x, y) \to (-y, x)$
* $180^\circ$: $(x, y) \to (-x, -y)$

**5. Enlargement as Scalar Multiplication**
To enlarge a shape from the origin by a scale factor $k$, multiply every coordinate by $k$:
$$ (x, y) \to (kx, ky) $$
If $k > 1$, the shape grows. If $0 < k < 1$, it shrinks. If $k$ is negative, it scales *and* rotates $180^\circ$.

## Worked example
**Problem:** Take the point $A(2, 3)$. Apply the following transformations in order:
1. Translate by vector $\begin{pmatrix} -5 \\ 1 \end{pmatrix}$.
2. Reflect across the $x$-axis.
3. Enlarge by a scale factor of $2$ from the origin.

**Step 1: Translation**
Add the vector components to the coordinates of $A$.
$$ A_1 = (2 + (-5), 3 + 1) = (-3, 4) $$
*Why it works:* We slid the point 5 units left and 1 unit up.

**Step 2: Reflection**
Reflect $A_1(-3, 4)$ across the $x$-axis. The distance to the $x$-axis is $4$ units up; the reflection must be $4$ units down.
$$ A_2 = (-3, -4) $$
*Why it works:* The $x$-axis acts as a horizontal mirror, so only the vertical position ($y$-coordinate) inverts.

**Step 3: Enlargement**
Multiply the coordinates of $A_2(-3, -4)$ by the scale factor $k=2$.
$$ A_3 = (2 \cdot -3, 2 \cdot -4) = (-6, -8) $$
*Why it works:* The distance from the origin to the point is doubled along the same line of sight.

## Diagrams

```text
Translation of a Triangle by vector (+4, +2)
y
|
5|          A'(5,5)
4|         /|
3| A(1,3) / |
2|  /|   B'(3,3)---C'(5,3)
1| B(1,1)---C(3,1)
0+-------------------- x
   1   2   3   4   5

Notice how every vertex moves exactly 4 units right and 2 units up.
A(1,3) -> A'(1+4, 3+2) -> A'(5,5)
```

## Memory technique — remember this forever
1. **The Hook:** Remember the acronym **TRRE** (Tree). **T**ranslate (Slide), **R**eflect (Flip), **R**otate (Turn), **E**nlarge (Scale). 
2. **The Facts to Overlearn:**
   * Translate $(a,b)$: $(x, y) \to (x+a, y+b)$
   * Reflect $x$-axis: $(x, y) \to (x, -y)$
   * Rotate $90^\circ$ CCW: $(x, y) \to (-y, x)$
3. **Spaced Repetition Schedule:** Review these mappings at 1 day, 3 days, 7 days, 16 days, and 35 days. Test yourself by applying them to the point $(3, 4)$.
4. **First Principles Pathway:** If you forget the $90^\circ$ rotation formula, draw the point $(2, 1)$ on an axis. Draw a rectangle from the origin to $(2, 1)$—it is 2 units wide and 1 unit tall. Physically turn the paper $90^\circ$ left. The rectangle is now 1 unit wide (left of the $y$-axis) and 2 units tall. The new point is $(-1, 2)$. You have just re-derived $(x, y) \to (-y, x)$.

## Common mistakes
* **Assuming clockwise:** Unless specified, "rotate $90^\circ$" means counter-clockwise. Defaulting to clockwise will put your shape in the wrong quadrant.
* **Ignoring the center of rotation/enlargement:** Students often assume transformations happen around the origin $(0,0)$. If a problem says "enlarge from point $(1,1)$", you cannot simply multiply the coordinates by $k$. You must find the distance from $(1,1)$, scale *that* distance, and add it back to $(1,1)$.
* **Thinking negative scale factors are impossible:** A scale factor of $k = -2$ is perfectly legal. It means the object gets twice as big *and* gets projected backward through the center of enlargement (effectively a $180^\circ$ rotation).

## Self-check
1. A point $P(-4, 7)$ is translated by the vector $\begin{pmatrix} 6 \\ -2 \end{pmatrix}$. What are the coordinates of the new point $P'$?
2. A point $Q(5, 2)$ is rotated $90^\circ$ counter-clockwise around the origin, and then reflected across the $y$-axis. What are the final coordinates?
3. A triangle has an area of $10$ square units. It undergoes an enlargement with a scale factor of $k=3$. What is the area of the new triangle? (Hint: think about how scaling side lengths affects area).