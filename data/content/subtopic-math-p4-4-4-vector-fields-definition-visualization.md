## What it is
A vector field is a function that assigns a vector (which has both magnitude and direction) to every point in a given region of space. In two dimensions, the function takes a point $(x, y)$ as input and outputs a 2D vector; in three dimensions, it takes a point $(x, y, z)$ and outputs a 3D vector. It's a map of vectors distributed over a space.

## Why it matters
Vector fields are the mathematical language for describing fields in physics and engineering. Gravitational fields, electric fields, and magnetic fields are all vector fields that assign a force vector to each point in space. In fluid dynamics and aerospace, the velocity of a fluid (like air over a wing) is described by a velocity vector field, where each vector shows the fluid's speed and direction at that point. In machine learning, the gradient of a multi-dimensional loss function forms a vector field that optimization algorithms like gradient descent navigate to find a minimum.

## When to study it
You must have a solid understanding of vectors and multivariable functions. Specifically, ensure you are fluent with:
1.  **Vector Operations:** Addition, scalar multiplication, magnitude (norm), and dot/cross products.
2.  **Coordinate Systems:** Cartesian coordinates in $\mathbb{R}^2$ and $\mathbb{R}^3$.
3.  **Multivariable Functions:** The concept of a function $f: \mathbb{R}^n \to \mathbb{R}^m$, particularly scalar-valued functions of multiple variables like $f(x, y)$.

If these are not second nature, review them first. Proceeding without them will lead to confusion.

## How to study it (step by step)
1.  **Write the formal definition.** Define a 2D vector field $\vec{F}$ on a domain $D \subset \mathbb{R}^2$ as a function $\vec{F}: D \to \mathbb{R}^2$ such that for each point $(x, y) \in D$, $\vec{F}(x, y) = \langle P(x, y), Q(x, y) \rangle$, where $P$ and $Q$ are scalar functions. Do the same for 3D. Internalize that the input is a point and the output is a vector.
2.  **Plot one by hand.** Take the vector field $\vec{F}(x, y) = \langle 1, y \rangle$. Choose a grid of nine points: $(-1, -1), (-1, 0), (-1, 1), (0, -1), \dots, (1, 1)$. For each point, calculate the output vector. Draw a set of axes and sketch each vector with its tail at the point it corresponds to.
3.  **Analyze the components.** Look at your hand-drawn plot. How does the $x$-component ($P(x,y)=1$) affect the arrows? How does the $y$-component ($Q(x,y)=y$) affect them? See that $P$ controls the horizontal part of the arrows and $Q$ controls the vertical part.
4.  **Use a plotter.** Use a tool like Python with Matplotlib or an online vector field plotter to visualize $\vec{F}(x, y) = \langle -y, x \rangle$. Observe the rotational pattern. Experiment by changing the signs, e.g., $\vec{F}(x, y) = \langle y, -x \rangle$, and predict the change before plotting.
5.  **Conceptualize in 3D.** Think about the gravitational field of a planet at the origin. Write it down: $\vec{F}(x, y, z) = -G M \frac{\langle x, y, z \rangle}{(x^2+y^2+z^2)^{3/2}}$. Without plotting, describe the vectors. They should all point towards the origin, and their magnitude should decrease as you move farther away (inverse-square law).

## Key ideas, with intuition
1.  **Input: Point, Output: Vector.** This is the fundamental structure. A vector field is a function whose domain is a set of points (in $\mathbb{R}^2$ or $\mathbb{R}^3$) and whose codomain is a set of vectors (in $\mathbb{R}^2$ or $\mathbb{R}^3$, respectively).
    $$
    \vec{F}( \underbrace{(x, y)}_{\text{Input point}} ) = \underbrace{\langle P(x, y), Q(x, y) \rangle}_{\text{Output vector}}
    $$
2.  **A Field is a Static Snapshot.** The arrows in a vector field do not represent motion or paths. They represent the force, velocity, or gradient that would be experienced *at that exact point*. Think of it as a field of weathervanes showing wind direction and strength at every location simultaneously, not the path a single leaf would take.
3.  **Components are Scalar Fields.** A vector field is built from ordinary scalar functions. For $\vec{F} = \langle P, Q \rangle$, the function $P(x, y)$ determines the horizontal component of the vector at $(x, y)$, and $Q(x, y)$ determines the vertical component. To understand a vector field, you can often analyze its scalar component fields separately.
4.  **Visualization Rule: Tail at the Point.** When you draw a vector field, the vector $\vec{v} = \vec{F}(x_0, y_0)$ that corresponds to the point $(x_0, y_0)$ must be drawn with its **tail** at $(x_0, y_0)$. This is a critical convention. Drawing it from the origin is a common and serious error.

## Worked example
**Problem:** Sketch the vector field $\vec{F}(x, y) = \langle -y, x \rangle$.

**Solution:**
We will select a few sample points and compute the corresponding vector at each point.

1.  **Point (1, 0):**
    $\vec{F}(1, 0) = \langle -0, 1 \rangle = \langle 0, 1 \rangle$. At the point (1, 0), we draw a vector pointing straight up.

2.  **Point (0, 1):**
    $\vec{F}(0, 1) = \langle -1, 0 \rangle$. At the point (0, 1), we draw a vector pointing left.

3.  **Point (-1, 0):**
    $\vec{F}(-1, 0) = \langle -0, -1 \rangle = \langle 0, -1 \rangle$. At the point (-1, 0), we draw a vector pointing straight down.

4.  **Point (0, -1):**
    $\vec{F}(0, -1) = \langle -(-1), 0 \rangle = \langle 1, 0 \rangle$. At the point (0, -1), we draw a vector pointing right.

5.  **Point (1, 1):**
    $\vec{F}(1, 1) = \langle -1, 1 \rangle$. At (1, 1), we draw a vector pointing up and to the left.

6.  **Point (2, 0):**
    $\vec{F}(2, 0) = \langle -0, 2 \rangle = \langle 0, 2 \rangle$. This vector is parallel to the one at (1,0) but twice as long.

**Reflection:**
*   Step 1-4 established a pattern. The vectors seem to be rotating counter-clockwise around the origin.
*   The magnitude of the vector at $(x, y)$ is $\|\vec{F}(x, y)\| = \sqrt{(-y)^2 + x^2} = \sqrt{x^2+y^2}$, which is the distance from the origin. This explains why the vector at (2,0) was longer than the one at (1,0).
*   The dot product of the position vector $\vec{r} = \langle x, y \rangle$ and the field vector $\vec{F}(x, y) = \langle -y, x \rangle$ is $\vec{r} \cdot \vec{F} = (x)(-y) + (y)(x) = 0$. This proves the vectors are always orthogonal to the position vector, confirming the circular pattern.

## Diagrams
A sketch of the vector field $\vec{F}(x, y) = \langle -y, x \rangle$.

```text
      y
      ^
      |
  <-- O <-- O
  ^   |   ^   |
  |   ^   |   v
  <---@--->---O---> x
  ^   |   v   |
  |   v   |   v
  O --> O -->
      |
```
**Description:** The diagram shows the origin `@` and axes `x` and `y`. At several points `O` on a grid, arrows (`<`, `>`, `^`, `v`) indicate the direction of the vector field. The arrows show a counter-clockwise rotation around the origin. For example, on the positive x-axis, the arrow points up (`^`); on the positive y-axis, it points left (`<`).

## Memory technique — remember this forever
1.  **Visual Hook:** Think of an **"Infinite Field of Weathervanes."** Each point in space has a weathervane nailed to it. The weathervane doesn't move *from* its point, it just pivots and stretches to show the wind's direction and speed *at that exact location*. A vector field is a static snapshot of all these weathervanes at once.

2.  **Must-Know Formulas:**
    *   2D Field: $\vec{F}(x, y) = \langle P(x, y), Q(x, y) \rangle$
    *   3D Field: $\vec{F}(x, y, z) = \langle P(x, y, z), Q(x, y, z), R(x, y, z) \rangle$

3.  **Spaced Repetition Schedule:** Review this concept and re-draw the worked example from memory at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:** If you forget everything, start from the definition of a function. A function maps inputs to outputs. What's the input here? A point, like $(x, y)$. What's the output? A vector, like $\vec{v}$. So a vector field is a function $\vec{F}: \text{point} \to \text{vector}$. A 2D vector has two components, so the output must look like $\langle \text{something}, \text{something else} \rangle$. Since the output vector depends on the input point, those "somethings" must be functions of $x$ and $y$. This rebuilds the formula $\vec{F}(x, y) = \langle P(x, y), Q(x, y) \rangle$.

## Common mistakes
1.  **Confusing the Field with a Path:** Students often think the arrows show the trajectory of a particle. The field shows the *instantaneous* velocity/force at each point; the path (a streamline) is found by "following" the arrows, which requires solving a differential equation.
2.  **Drawing Vectors from the Origin:** A very common error is to calculate $\vec{F}(2, 3) = \langle -1, 5 \rangle$ and then draw the vector from $(0, 0)$ to $(-1, 5)$. **Incorrect.** The vector $\langle -1, 5 \rangle$ must be drawn with its tail starting *at the point* $(2, 3)$.
3.  **Scaling Issues:** When sketching, students often draw all vectors the same length. The magnitude $\|\vec{F}(x, y)\|$ usually changes with position. You don't need perfect scaling, but longer vectors should be visibly longer than shorter ones.

## Self-check
1.  Sketch the vector field $\vec{F}(x, y) = \langle 0, -1 \rangle$. Describe it in one sentence.
2.  Consider the radial vector field $\vec{F}(\vec{r}) = \vec{r}$, where $\vec{r} = \langle x, y, z \rangle$. What is the relationship between a point's position vector and the field vector at that point? How does the magnitude of the field vectors change as you move away from the origin along the line $y=x, z=0$?
3.  The vector field for a simplified electric dipole might look like $\vec{F}(x, y) = \langle \frac{x-1}{( (x-1)^2 + y^2 )^{3/2}} - \frac{x+1}{( (x+1)^2 + y^2 )^{3/2}}, \frac{y}{( (x-1)^2 + y^2 )^{3/2}} - \frac{y}{( (x+1)^2 + y^2 )^{3/2}} \rangle$. Without calculating, deduce what is located at the points $(1,0)$ and $(-1,0)$ and describe the general behavior of the field vectors far away from the origin.