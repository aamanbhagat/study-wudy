## What it is
A function of several variables is a rule that assigns a single output value to a combination of multiple input values. We visualize these functions using graphs (which live in a higher dimension) or by "slicing" them to create level curves and level surfaces, which are sets of all input points that produce the same constant output.

## Why it matters
This is the language for describing fields and distributions in science and engineering. In physics, gravitational and electric potential are functions of position $(x, y, z)$, and their level surfaces (equipotential surfaces) are fundamental. In machine learning, the "loss function" measures a model's error as a function of its many parameters (weights); level sets of this function guide optimization algorithms like gradient descent to find the minimum error.

## When to study it
You must have a firm grasp of single-variable functions, their graphs ($y=f(x)$), and the 2D/3D Cartesian coordinate systems. You should also be comfortable recognizing the equations for basic curves (lines, circles, parabolas, hyperbolas) and surfaces (planes, spheres, cylinders). If you cannot immediately identify $x^2 + y^2 = 9$ as a circle in the plane, review that first.

## How to study it (step by step)
1.  **Solidify the dimension jump.** Take $f(x, y) = x^2 + y^2$. The inputs $(x, y)$ live in $\mathbb{R}^2$. The output $z = f(x, y)$ adds a dimension. The graph is the set of all points $(x, y, z)$ satisfying the equation, which is a surface in $\mathbb{R}^3$. Convince yourself that the graph of $f: \mathbb{R}^n \to \mathbb{R}$ lives in $\mathbb{R}^{n+1}$.
2.  **Master the "slicing" analogy for level curves.** For $z = x^2 + y^2$, set the output $z$ to a constant, $c$. For $c=1$, you get $x^2+y^2=1$. For $c=4$, you get $x^2+y^2=4$. These are the *level curves*.
3.  **Connect the graph and the level curves.** Imagine the graph of $z = x^2 + y^2$ (a paraboloid, like a bowl). The level curve $x^2+y^2=4$ is the intersection of this bowl with the horizontal plane $z=4$. A contour map is just the projection of these intersection curves onto the $xy$-plane.
4.  **Solve for level curves.** Take a new function, e.g., $f(x, y) = x - y^2$. Systematically set $f(x, y) = c$ for several values of $c$ (e.g., $c = -1, 0, 1$) and sketch the resulting curves ($x - y^2 = -1$, $x - y^2 = 0$, etc.) in the $xy$-plane. Label each curve with its $c$-value.
5.  **Extend to level surfaces.** Now consider $w = f(x, y, z) = x^2 + y^2 + z^2$. Its graph lives in 4D, which we cannot visualize. Instead, we analyze its level surfaces by setting $w=c$. For $c=1$, we get $x^2+y^2+z^2=1$ (a sphere of radius 1). For $c=4$, we get $x^2+y^2+z^2=4$ (a sphere of radius 2). These concentric spheres are the level surfaces.

## Key ideas, with intuition
1.  **Graphs live one dimension up.** The graph of a function $f$ with an $n$-dimensional domain is a set of points in an $(n+1)$-dimensional space.
    *   For $f: \mathbb{R}^1 \to \mathbb{R}$, the graph of $y=f(x)$ is a curve in $\mathbb{R}^2$.
    *   For $f: \mathbb{R}^2 \to \mathbb{R}$, the graph of $z=f(x,y)$ is a surface in $\mathbb{R}^3$.
    *   For $f: \mathbb{R}^3 \to \mathbb{R}$, the graph of $w=f(x,y,z)$ is a "hypersurface" in $\mathbb{R}^4$.

2.  **Level sets live in the domain.** A level set is created by fixing the *output* and finding all *inputs* that produce it. This reduces the problem's dimension, making it visualizable.
    *   **Level Curve:** For $f(x,y)$, the level set is the collection of points $(x,y)$ in the domain $\mathbb{R}^2$ such that $f(x,y)=c$. This is a curve.
        $$ \text{Level Curve} = \{ (x,y) \in \mathbb{R}^2 \mid f(x,y) = c \} $$
    *   **Level Surface:** For $f(x,y,z)$, the level set is the collection of points $(x,y,z)$ in the domain $\mathbb{R}^3$ such that $f(x,y,z)=c$. This is a surface.
        $$ \text{Level Surface} = \{ (x,y,z) \in \mathbb{R}^3 \mid f(x,y,z) = c \} $$

3.  **Level curves encode steepness.** Just like on a topographic map, where closely packed contour lines indicate a steep cliff, closely packed level curves indicate that the function's value is changing rapidly. This is a visual precursor to the concept of the gradient.

## Worked example
**Problem:** Analyze the function $f(x, y) = x^2 - y^2$ by sketching its level curves for $c = -1, 0, 1$. Describe the 3D graph based on these curves.

**Solution:**
We find the level curves by setting $f(x, y) = c$ for the given values of $c$.

1.  **Case $c = -1$:**
    The equation is $x^2 - y^2 = -1$.
    To match the standard form of a hyperbola, we rewrite this as $y^2 - x^2 = 1$.
    This is a hyperbola that opens along the $y$-axis, passing through $(0, 1)$ and $(0, -1)$.

2.  **Case $c = 0$:**
    The equation is $x^2 - y^2 = 0$.
    This factors as $(x-y)(x+y) = 0$.
    The solution is $x-y=0$ or $x+y=0$, which corresponds to the two lines $y=x$ and $y=-x$. These lines intersect at the origin.

3.  **Case $c = 1$:**
    The equation is $x^2 - y^2 = 1$.
    This is a hyperbola that opens along the $x$-axis, passing through $(1, 0)$ and $(-1, 0)$.

**Sketch:**
(See ASCII diagram in the next section)

**Reflection on the graph:**
*   The level curve for $c=0$ shows two lines crossing at the origin. This suggests something special is happening at $(0,0)$.
*   For positive $c$, the curves are hyperbolas opening along the $x$-axis. This means if you walk along the $x$-axis away from the origin, the function value increases ($f(x,0) = x^2$).
*   For negative $c$, the curves are hyperbolas opening along the $y$-axis. This means if you walk along the $y$-axis away from the origin, the function value decreases ($f(0,y) = -y^2$).
*   Putting this together, the 3D graph of $z = x^2 - y^2$ must look like a saddle, curving up in the $x$-direction and down in the $y$-direction. This shape is called a hyperbolic paraboloid, or a "saddle surface". Each step worked because it reduced a 3D problem ($z=f(x,y)$) to a series of 2D problems ($f(x,y)=c$) that involved familiar shapes.

## Diagrams
Here is the contour plot for the worked example, $f(x, y) = x^2 - y^2$.

```text
      y
      ^
      |
   \  |  /  c=1
    \ | /
  c=-1|c=-1
 -----+-----> x
      |
    / | \
   /  |  \  c=1
      |
   c=0 is the
   pair of lines
   y=x and y=-x
```
Description of a 3D figure: Imagine the contour plot above is drawn on the floor (the $xy$-plane). The $c=1$ hyperbolas are lifted up to a height of $z=1$. The $c=-1$ hyperbolas are pushed down to a depth of $z=-1$. The lines for $c=0$ remain on the floor at $z=0$. Connecting these smoothly creates a surface that resembles a horse's saddle, centered at the origin.

## Memory technique — remember this forever
1.  **The Mnemonic:** "Topographic Map".
    *   $f(x, y)$ is the **altitude** at map coordinates $(x, y)$.
    *   A level curve, $f(x, y) = c$, is a **contour line** showing all points at the same altitude, $c$.
    *   The graph, $z = f(x, y)$, is the **actual 3D terrain**. You cannot see the 3D terrain from a 2D map, but the map's contour lines let you reconstruct it in your mind.

2.  **Must-Know Formulas:** Overlearn these definitions. Do not paraphrase.
    *   Graph of $f(x,y)$: The set of points $(x, y, z)$ in $\mathbb{R}^3$ such that $z = f(x, y)$.
    *   Level Curve of $f(x,y)$: The set of points $(x, y)$ in $\mathbb{R}^2$ such that $f(x, y) = c$.
    *   Level Surface of $f(x,y,z)$: The set of points $(x, y, z)$ in $\mathbb{R}^3$ such that $f(x, y, z) = c$.

3.  **Spaced Repetition Schedule:** Review this material and re-do the worked example from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget, remember the core operation is **fixing the output**. A function takes an input and gives an output. A "level set" is just asking the reverse question: "For a fixed output value $c$, what are all the possible inputs that give me that output?" The geometry of that set of inputs is the level curve or surface.

## Common mistakes
1.  **Confusing the graph and a level set.** The graph of $f(x,y)$ is a surface in $\mathbb{R}^3$. A level curve is a curve in $\mathbb{R}^2$. They are not the same object and do not live in the same space.
2.  **Drawing level curves floating in 3D space.** Level curves belong in the domain, the $xy$-plane. They are the *projections* of the slices of the 3D graph.
3.  **Forgetting to label level curves.** A contour map is useless without labels indicating the "altitude" $c$ of each curve.
4.  **Assuming level sets are always "nice" curves/surfaces.** For a function like $f(x,y) = \sin(x) + \sin(y)$, the level curves can be complex and are not simple conic sections. The technique is general.

## Self-check
1.  Describe and sketch the level curves of the linear function $f(x, y) = x - 2y$. What is the graph of this function?
2.  Consider the function $f(x, y) = \frac{1}{x^2+y^2}$. Sketch the level curves for $c = 1, 4, 100$. What happens to the curves as $c \to \infty$? What does this imply about the graph of $f$ near the origin?
3.  Describe the level surfaces of the function $f(x, y, z) = x^2 + y^2 - z$. What is the geometric shape of the level surface for a given constant $c$? How do the surfaces change as $c$ increases?