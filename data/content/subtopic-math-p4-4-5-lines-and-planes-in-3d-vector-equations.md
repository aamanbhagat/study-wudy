## What it is
Vector equations describe geometric objects like lines and planes as a set of points in space. A line is defined by a single point and a direction vector, while a plane is defined by a single point and two non-parallel direction vectors. These equations use parameters to trace out all the points on the object.

## Why it matters
These equations are fundamental to 3D computer graphics, robotics, and physics simulations. In aerospace, they model vehicle trajectories (lines) and control surfaces (planes). In machine learning, high-dimensional generalizations of planes, called hyperplanes, are used to separate data in classification algorithms like Support Vector Machines (SVMs).

## When to study it
You must have a solid grasp of basic vector operations in $\mathbb{R}^3$: vector addition, scalar multiplication, the dot product, and the cross product. You should understand vectors both algebraically (as tuples of numbers) and geometrically (as arrows in space). Familiarity with the concept of linear combinations is essential.

## How to study it (step by step)
1.  **Derive the line.** Start with the origin $O$, a known point $P_0$ on the line, and a non-zero direction vector $\vec{d}$ parallel to the line. Any point $P$ on the line can be reached by starting at the origin, moving to $P_0$ (vector $\vec{p}_0$), and then moving some scalar multiple $t$ of the direction vector $\vec{d}$. Write this down: $\vec{p} = \vec{p}_0 + t\vec{d}$. Convince yourself that as $t$ varies over all real numbers, you trace the entire infinite line.
2.  **Solve a line problem.** Given points $A=(1,2,3)$ and $B=(4,0,5)$, find the vector equation of the line passing through them. Reason that you can use $\vec{a}$ as the position vector and the vector from $A$ to $B$, $\vec{b}-\vec{a}$, as the direction vector.
3.  **Derive the plane (parametric form).** Extend the logic from the line. To specify a plane, you need a point $P_0$ on the plane and two *non-collinear* direction vectors, $\vec{u}$ and $\vec{v}$, that are parallel to the plane. Any point $P$ on the plane is reached by $\vec{p} = \vec{p}_0 + s\vec{u} + t\vec{v}$. Here, you have two parameters, $s$ and $t$, because a plane has two degrees of freedom for movement.
4.  **Solve a plane problem.** Given three non-collinear points $A, B, C$, find the parametric vector equation of the plane containing them. Use $\vec{a}$ as the position vector and find two direction vectors, for example $\vec{b}-\vec{a}$ and $\vec{c}-\vec{a}$.
5.  **Derive the plane (normal form).** Realize that a plane can also be defined by a point $P_0$ and a vector $\vec{n}$ that is normal (perpendicular) to the plane. For any point $P$ on the plane, the vector from $P_0$ to $P$ (which is $\vec{p} - \vec{p}_0$) must lie *in* the plane. Therefore, this vector must be orthogonal to $\vec{n}$. The condition for orthogonality is a dot product of zero: $\vec{n} \cdot (\vec{p} - \vec{p}_0) = 0$.
6.  **Connect the forms.** Given the parametric form from step 4, how would you find the normal form? Take the cross product of the two direction vectors: $\vec{n} = \vec{u} \times \vec{v}$. This gives a vector perpendicular to both, and thus normal to the plane.

## Key ideas, with intuition
*   **Degrees of Freedom:** A line is a 1-dimensional object, so its equation needs one free parameter ($t$). A plane is a 2-dimensional object, so its equation needs two free parameters ($s, t$). The parameters are the "control knobs" that move you around the object.
*   **Position Vector + Direction Vector(s):** All these equations share a common structure: $\text{Point} = \text{Initial Position} + \text{Movement}$. The position vector $\vec{p}_0$ anchors the object in space; it gets you from the origin to one point *on* the object. The direction vectors (scaled by parameters) describe all possible movements *within* the object from that anchor point.
    $$ \underbrace{\vec{r}(t)}_{\text{Any point on line}} = \underbrace{\vec{p}_0}_{\text{A specific point on line}} + \underbrace{t\vec{d}}_{\text{Movement along line}} $$
    $$ \underbrace{\vec{r}(s,t)}_{\text{Any point on plane}} = \underbrace{\vec{p}_0}_{\text{A specific point on plane}} + \underbrace{s\vec{u} + t\vec{v}}_{\text{Movement within plane}} $$
*   **The Normal as a Constraint:** The normal form of a plane, $\vec{n} \cdot (\vec{r} - \vec{p}_0) = 0$, works differently. It defines the plane not by telling you how to move within it, but by stating a condition that every point in the plane must satisfy. It says "a point $\vec{r}$ is on the plane if and only if the vector connecting it to $\vec{p}_0$ is perpendicular to the normal vector $\vec{n}$." This is a powerful geometric constraint.

## Worked example
Find the point of intersection of the line $L$ and the plane $\Pi$.

Line $L$: $\vec{r} = \begin{pmatrix} 1 \\ 0 \\ 2 \end{pmatrix} + t \begin{pmatrix} -1 \\ 1 \\ 0 \end{pmatrix}$

Plane $\Pi$: The plane containing the point $P_0 = (3, 2, 1)$ with normal vector $\vec{n} = \begin{pmatrix} 2 \\ 1 \\ 2 \end{pmatrix}$.

**Step 1: Write the equation for the plane.**
The normal form of the plane is $\vec{n} \cdot (\vec{r} - \vec{p}_0) = 0$.
Let $\vec{r} = \begin{pmatrix} x \\ y \\ z \end{pmatrix}$.
$$ \begin{pmatrix} 2 \\ 1 \\ 2 \end{pmatrix} \cdot \left( \begin{pmatrix} x \\ y \\ z \end{pmatrix} - \begin{pmatrix} 3 \\ 2 \\ 1 \end{pmatrix} \right) = 0 $$
$$ \begin{pmatrix} 2 \\ 1 \\ 2 \end{pmatrix} \cdot \begin{pmatrix} x-3 \\ y-2 \\ z-1 \end{pmatrix} = 0 $$
$$ 2(x-3) + 1(y-2) + 2(z-1) = 0 $$
$$ 2x - 6 + y - 2 + 2z - 2 = 0 $$
$$ 2x + y + 2z = 10 $$
This is the Cartesian equation of the plane.

**Step 2: Find the coordinates of a point on the line in terms of $t$.**
The vector equation for the line is $\vec{r} = \begin{pmatrix} x \\ y \\ z \end{pmatrix} = \begin{pmatrix} 1-t \\ t \\ 2 \end{pmatrix}$.
So, for any point on the line, its coordinates are $x = 1-t$, $y = t$, and $z = 2$.

**Step 3: Substitute the line coordinates into the plane equation.**
If a point lies on both the line and the plane, its coordinates must satisfy both equations. We substitute the expressions from Step 2 into the equation from Step 1.
$$ 2(1-t) + (t) + 2(2) = 10 $$

**Step 4: Solve for the parameter $t$.**
$$ 2 - 2t + t + 4 = 10 $$
$$ 6 - t = 10 $$
$$ t = -4 $$
This value of $t$ is the specific parameter that takes us from the line's starting point to the intersection point.

**Step 5: Find the intersection point.**
Substitute $t=-4$ back into the line's vector equation.
$$ \vec{r}_{\text{intersect}} = \begin{pmatrix} 1 \\ 0 \\ 2 \end{pmatrix} + (-4) \begin{pmatrix} -1 \\ 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \\ 2 \end{pmatrix} + \begin{pmatrix} 4 \\ -4 \\ 0 \end{pmatrix} = \begin{pmatrix} 5 \\ -4 \\ 2 \end{pmatrix} $$
The point of intersection is $(5, -4, 2)$.

**Reflection:** This method works because the line's equation generates *all* possible points on the line. The plane's equation acts as a *filter* or a test. By substituting, we ask: "Which of these infinite points on the line, if any, also satisfies the condition for being on the plane?" The solution for $t$ gives us the answer.

## Diagrams
A line in 3D space:
```text
      z
      |
      |     P(t)
      |    /
      |  /
      | /
    ->|/ d
 P_0 O-----------> y
   /
  /
 /
x
```
*   $O$ is the origin.
*   $\vec{p}_0$ (not drawn, but is the vector from $O$ to $P_0$) is the position vector to a point on the line.
*   $\vec{d}$ is the direction vector, parallel to the line.
*   $P(t)$ is a general point on the line, reached by $\vec{p}_0 + t\vec{d}$.

A plane in 3D space (parametric):
```text
      z
      |
      |      . P(s,t)
      |    .'
      |  .'
 P_0 O-----------> y
   /|\`u
  / | \
 /  v  \
x
```
*   The shaded parallelogram represents a piece of the infinite plane.
*   $\vec{p}_0$ is the position vector to point $P_0$ on the plane.
*   $\vec{u}$ and $\vec{v}$ are two non-collinear direction vectors in the plane.
*   Any point $P(s,t)$ is reached by $\vec{p}_0 + s\vec{u} + t\vec{v}$.

## Memory technique — remember this forever
1.  **The "Treasure Map" Story:**
    *   A vector equation is a treasure map. $\vec{p}_0$ is the first instruction: "Start at the origin and go to the big rock."
    *   For a **line**, the next instruction is: "From the rock, walk any distance ($t$) along the path (direction $\vec{d}$)."
    *   For a **plane**, it's: "From the rock, you can walk any distance ($s$) East (direction $\vec{u}$) and any distance ($t$) North (direction $\vec{v}$)."

2.  **Formulas to Overlearn:**
    *   Line (parametric): $\vec{r} = \vec{p}_0 + t\vec{d}$
    *   Plane (parametric): $\vec{r} = \vec{p}_0 + s\vec{u} + t\vec{v}$
    *   Plane (normal): $\vec{n} \cdot (\vec{r} - \vec{p}_0) = 0$

3.  **Spaced Repetition Schedule:**
    Review these formulas and the treasure map story at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Each time, re-derive them from the geometric picture.

4.  **First Principles Pathway:**
    If you forget everything, rebuild from geometry.
    *   **Line:** "What do I need to uniquely define a line?" Answer: A point and a direction. "How do I write that with vectors?" Vector to the point ($\vec{p}_0$) plus some amount ($t$) of the direction vector ($\vec{d}$).
    *   **Plane:** "What do I need to uniquely define a plane?" Answer: A point and *two* independent directions. "How do I write that?" Vector to the point ($\vec{p}_0$) plus some amount ($s$) of the first direction ($\vec{u}$) plus some amount ($t$) of the second ($\vec{v}$). OR... "What's another way?" A point and a perpendicular direction ($\vec{n}$). "What does perpendicular mean?" Dot product is zero. The vector from my known point to any other point, $(\vec{r}-\vec{p}_0)$, must be perpendicular to $\vec{n}$.

## Common mistakes
*   **Defining a plane with collinear vectors.** If you try to define a plane with $\vec{r} = \vec{p}_0 + s\vec{u} + t(2\vec{u})$, the two direction vectors are parallel. You can only move back and forth along one direction; you've defined a line, not a plane.
*   **Confusing position and direction vectors.** The vector $\vec{p}_0 = \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$ represents a specific *location*. The vector $\vec{d} = \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$ represents a *displacement* or direction. A line equation needs one of each.
*   **Incorrectly calculating the normal vector.** The normal vector $\vec{n}$ must be perpendicular to the plane. If you have two vectors $\vec{u}, \vec{v}$ in the plane, the normal is $\vec{n} = \vec{u} \times \vec{v}$, not $\vec{v} \times \vec{u}$ (which points the opposite way, though this is often acceptable) and certainly not the dot product or sum.
*   **Assuming lines in 3D must intersect or be parallel.** Unlike in 2D, two lines in 3D can also be *skew*: not parallel and never intersecting.

## Self-check
1.  Find the vector equation of the line passing through the points $A = (1, 1, 0)$ and $B = (-2, 3, 5)$. Is the point $C = (4, -1, -5)$ on this line?
2.  Find both the parametric and normal-form vector equations for the plane containing the points $P = (1, 0, 0)$, $Q = (0, 1, 0)$, and $R = (0, 0, 1)$.
3.  Consider the line from question 1 and the plane from question 2. Do they intersect? If so, where? If not, are they parallel?