## What it is
A parabola is the set of all points in a plane that are exactly the same distance from a fixed point (the focus) and a fixed straight line (the directrix). It is the geometric shape formed by slicing a cone with a plane parallel to its slant edge.

## Why it matters
In physics, any object in free fall under uniform gravity traces a parabolic path. In rocket science and orbital mechanics, a parabolic trajectory represents the exact boundary between a closed orbit (ellipse) and an escape trajectory (hyperbola); it is the path of an object with exactly zero total orbital energy. Furthermore, parabolic reflectors possess the unique geometric property of focusing all parallel incoming rays to a single point, making them indispensable for radio telescopes, satellite dishes, and optical mirrors.

## When to study it
You must have a rock-solid grasp of:
1. Coordinate geometry (specifically the distance formula and equations of straight lines).
2. Algebraic manipulation (specifically completing the square).
3. Quadratic equations.
If you cannot flawlessly complete the square of $2x^2 - 12x + 5 = 0$ in your head or on scratch paper in under 30 seconds, go back and master that first.

## How to study it (step by step)
1. **Derive the standard form:** Place the focus at $(a, 0)$ and the directrix at $x = -a$. Use the distance formula to equate the distance from a point $(x,y)$ to the focus and to the directrix. Square both sides to derive $y^2 = 4ax$. (20 mins)
2. **Map the four orientations:** Repeat the derivation mentally for focuses at $(-a, 0)$, $(0, a)$, and $(0, -a)$. Write down the resulting four standard equations. (15 mins)
3. **Derive the Latus Rectum:** The latus rectum is the chord passing through the focus and parallel to the directrix. Plug the focus's coordinate into your standard equation and solve for the endpoints to prove its length is $4a$. (15 mins)
4. **Translate the vertex:** Shift the vertex from $(0,0)$ to $(h,k)$ by replacing $x$ with $(x-h)$ and $y$ with $(y-k)$. Practice expanding and re-completing the square. (30 mins)
5. **Sketching:** Draw all four orientations. Label the vertex, focus, directrix, axis of symmetry, and the endpoints of the latus rectum for each. (20 mins)

## Key ideas, with intuition
**1. The Locus Definition and Derivation**
Every property of the parabola flows from one rule: Distance to focus = Distance to directrix. 
Let the focus be $F(a, 0)$ and the directrix be the line $x = -a$. For any point $P(x,y)$ on the parabola:
$$ \sqrt{(x-a)^2 + (y-0)^2} = |x - (-a)| $$
Square both sides:
$$ x^2 - 2ax + a^2 + y^2 = x^2 + 2ax + a^2 $$
Cancel like terms to get the standard form:
$$ y^2 = 4ax $$

**2. The Four Orientations**
The linear (non-squared) variable dictates the axis of symmetry. The sign dictates the direction it opens.
*   $y^2 = 4ax$: Opens Right (Axis: $y=0$)
*   $y^2 = -4ax$: Opens Left (Axis: $y=0$)
*   $x^2 = 4ay$: Opens Up (Axis: $x=0$)
*   $x^2 = -4ay$: Opens Down (Axis: $x=0$)

**3. Anatomy of the Parabola**
*   **Axis of symmetry:** The line passing through the focus and perpendicular to the directrix.
*   **Vertex:** The midpoint between the focus and the directrix. It is the sharpest turn of the curve.
*   **Latus Rectum:** The line segment through the focus, perpendicular to the axis, with endpoints on the parabola. For $y^2 = 4ax$, the focus is at $x=a$. Substitute $x=a$ into the equation: $y^2 = 4a(a) = 4a^2 \implies y = \pm 2a$. The distance between $(a, 2a)$ and $(a, -2a)$ is $4a$.

## Worked example
**Problem:** Find the vertex, focus, directrix, and length of the latus rectum for the parabola given by $x^2 + 6x - 8y + 25 = 0$.

**Step 1: Group variables and complete the square.**
Keep $x$ terms on the left, move $y$ and constants to the right.
$$ x^2 + 6x = 8y - 25 $$
Complete the square for $x$: add $(\frac{6}{2})^2 = 9$ to both sides.
$$ x^2 + 6x + 9 = 8y - 16 $$
$$ (x + 3)^2 = 8(y - 2) $$

**Step 2: Identify orientation and parameters.**
This is in the form $(x-h)^2 = 4a(y-k)$. 
The squared term is $x$, and the coefficient of $y$ is positive. It opens **upwards**.
Vertex $(h,k) = (-3, 2)$.
$4a = 8 \implies a = 2$.

**Step 3: Extract components based on $a=2$ and vertex $(-3,2)$.**
*   **Focus:** Shift $a$ units *up* from the vertex (inside the curve). $\implies (-3, 2+2) = (-3, 4)$.
*   **Directrix:** Shift $a$ units *down* from the vertex (outside the curve). $\implies y = 2 - 2 \implies y = 0$.
*   **Latus Rectum Length:** $4a = 8$.

*Reflection:* Completing the square isolates the geometric center (vertex). Factoring out the $4a$ coefficient reveals the focal length $a$. Because it opens upwards, the focus and directrix only affect the $y$-coordinates.

## Diagrams

```text
Orientation: y^2 = 4ax (Opens Right)

               |                      . (a, 2a)  <-- Endpoint of Latus Rectum
               |                    . |
               |                  .   |
               |                .     |
 Directrix     |              .       |
 x = -a        |            .         |
       |       |          .           |
       |       |        .             |
       v       |      .               v
-------|-------+----O-----------------F(a,0)--------- Axis of Symmetry (y=0)
       |       |      .               ^
       |       |        .             | Length = 4a
       |       |          .           |
               |            .         |
               |              .       |
               |                .     |
               |                  .   |
               |                    . |
               |                      . (a, -2a) <-- Endpoint of Latus Rectum
               V
             Vertex (0,0)
```

## Memory technique — remember this forever
1. **The Hook:** "The lonely variable points the way." The variable that is *not* squared tells you the axis of symmetry. If it's $y^2 = 4ax$, $x$ is lonely, so it wraps around the $x$-axis. The sign of the lonely variable tells you positive or negative direction.
2. **Must Overlearn:** 
   * Standard form: $y^2 = 4ax$
   * Focal distance: $a$
   * Latus Rectum length: $4a$
3. **Spaced-repetition schedule:** Review this derivation and mapping at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget everything, draw a point $F(a,0)$ and a line $x=-a$. Write $\sqrt{(x-a)^2 + y^2} = x+a$. Square it. You have just rebuilt the entire subtopic.

## Common mistakes
*   **Confusing $a$ with $4a$:** Students often look at $y^2 = 12x$ and think the focus is at $(12,0)$. The coefficient is $4a$, so $4a = 12 \implies a = 3$. The focus is $(3,0)$.
*   **Applying the wrong shift:** For a parabola opening left/right, the directrix is vertical ($x = \dots$). For up/down, it is horizontal ($y = \dots$). Students frequently mix up $x$ and $y$ when writing the directrix equation.
*   **Forgetting to factor out the coefficient completely:** When completing the square to get $(x-h)^2 = 4a(y-k)$, students might write $(x-3)^2 = 2y - 4$ and fail to factor it to $2(y-2)$. The $y$ (or $x$) inside the parenthesis *must* have a coefficient of 1.

## Self-check
1. Find the vertex, focus, directrix, and axis of symmetry for $y^2 = -10x$.
2. Derive the standard equation of a parabola whose vertex is at $(4, -1)$, axis of symmetry is parallel to the $y$-axis, and which passes through the point $(8, 3)$.
3. Prove that the tangent lines at the endpoints of the latus rectum intersect at right angles on the directrix. *(Hint: You will need implicit differentiation to find the slopes).*