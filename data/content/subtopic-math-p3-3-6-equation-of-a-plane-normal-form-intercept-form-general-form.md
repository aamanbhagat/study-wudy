## What it is
A plane is a perfectly flat, two-dimensional surface that extends infinitely in three-dimensional space. The "equation of a plane" is an algebraic constraint that a 3D point $(x,y,z)$ must satisfy to lie on this surface. We express this constraint in three primary ways: normal form (using a perpendicular vector), general form (an expanded polynomial), and intercept form (based on where it crosses the coordinate axes).

## Why it matters
In aerospace and physics, planes act as critical boundaries and projection surfaces. When modeling fluid flow over a wing or calculating orbital inclinations, you project 3D velocity vectors onto specific planes. In Computer Science and Machine Learning, a plane (or "hyperplane" in higher dimensions) is the fundamental decision boundary used in linear classifiers and Support Vector Machines (SVMs) to separate data points into distinct categories. 

## When to study it
You must have a rock-solid grasp of 3D Cartesian coordinates and vector algebra. Specifically, you need to understand vector addition, scalar multiplication, and the **dot product**. If you do not intuitively understand why the dot product of two perpendicular vectors is exactly zero ($\vec{u} \cdot \vec{v} = 0$), stop now and review vector operations. 

## How to study it (step by step)
1. **Master the Normal Form Derivation:** Draw a point and a vector perpendicular to it. Write out the dot product equation $\vec{n} \cdot (\vec{r} - \vec{a}) = 0$. Prove to yourself why this works.
2. **Expand to General Form:** Take the normal form equation and algebraically distribute the dot product. Group the constants to reveal $Ax + By + Cz + D = 0$. 
3. **Derive the Intercept Form:** Take the general form, move the constant $D$ to the right side, and divide the entire equation by $-D$. Simplify the fractions to arrive at $\frac{x}{a} + \frac{y}{b} + \frac{z}{c} = 1$.
4. **Practice Conversions:** Write down a random general form equation. Convert it to intercept form. Read the normal vector directly from the coefficients. 
5. **Handle Edge Cases:** Investigate what happens to the general form when the plane is parallel to the $z$-axis. Notice how the $z$ term vanishes ($C=0$) and the intercept form breaks down for that axis.

## Key ideas, with intuition

**1. The Normal Vector Dictates Everything (Normal Form)**
You cannot easily define a 3D plane by the vectors *inside* it, because there are infinitely many pointing in all directions. Instead, define the plane by the single direction it is *perpendicular* to. This is the normal vector, $\vec{n}$. 
If you have a known point $A$ (position vector $\vec{a}$) on the plane, and an arbitrary point $R$ (position vector $\vec{r}$) also on the plane, the vector connecting them is $(\vec{r} - \vec{a})$. Since this vector lies flat on the plane, it must be perpendicular to $\vec{n}$. Therefore, their dot product is zero:
$$ \vec{n} \cdot (\vec{r} - \vec{a}) = 0 $$

**2. The Coefficients are the Normal Vector (General Form)**
If we let $\vec{n} = \langle A, B, C \rangle$, $\vec{r} = \langle x, y, z \rangle$, and $\vec{a} = \langle x_0, y_0, z_0 \rangle$, expanding the dot product yields:
$$ A(x - x_0) + B(y - y_0) + C(z - z_0) = 0 $$
$$ Ax + By + Cz - (Ax_0 + By_0 + Cz_0) = 0 $$
Since $Ax_0 + By_0 + Cz_0$ is just a scalar constant, we replace it with $D$. This gives the general form:
$$ Ax + By + Cz + D = 0 $$
*Intuition:* The variables $x, y, z$ scale the normal vector components. The constant $D$ simply translates the plane away from the origin.

**3. Axis Slicing (Intercept Form)**
If a plane intersects the $x, y,$ and $z$ axes at points $(a,0,0)$, $(0,b,0)$, and $(0,0,c)$, its equation can be written as:
$$ \frac{x}{a} + \frac{y}{b} + \frac{z}{c} = 1 $$
*Intuition:* If you plug in $y=0$ and $z=0$, the equation collapses to $\frac{x}{a} = 1$, meaning $x = a$. It is a pure geometric convenience for visualization.

## Worked example
**Problem:** Find the equation of the plane passing through the point $(1, 2, 3)$ with a normal vector $\vec{n} = \langle 4, -1, 2 \rangle$. Express your final answer in normal, general, and intercept forms.

**Step 1: Normal Form**
Using $\vec{n} \cdot (\vec{r} - \vec{a}) = 0$:
$$ \langle 4, -1, 2 \rangle \cdot \langle x - 1, y - 2, z - 3 \rangle = 0 $$

**Step 2: General Form**
Evaluate the dot product:
$$ 4(x - 1) - 1(y - 2) + 2(z - 3) = 0 $$
$$ 4x - 4 - y + 2 + 2z - 6 = 0 $$
$$ 4x - y + 2z - 8 = 0 $$

**Step 3: Intercept Form**
Move the constant to the right side:
$$ 4x - y + 2z = 8 $$
Divide the entire equation by 8 to force the right side to be 1:
$$ \frac{4x}{8} - \frac{y}{8} + \frac{2z}{8} = 1 $$
$$ \frac{x}{2} + \frac{y}{-8} + \frac{z}{4} = 1 $$

*Reflection:* The normal form locked the plane's orientation and position. Expanding it gave the general form, where we can clearly see the normal vector components $(4, -1, 2)$ as the coefficients. Rearranging into intercept form reveals the plane slices the axes at $x=2$, $y=-8$, and $z=4$.

## Diagrams

```text
NORMAL FORM GEOMETRY
          
           ^ n = <A, B, C>  (Normal vector, perpendicular to plane)
           |
           |
           |    (r - a) lies entirely IN the plane
           |   /-------------------------> R(x, y, z)
           |  /
           | /
           |/
           A(x0, y0, z0)
          / 
         /  Plane Surface
        /___________________________________
```

```text
INTERCEPT FORM GEOMETRY
       z
       ^
       |  .(0, 0, c)
       |  |\
       |  | \
       |  |  \
       |  |   \
       |  |    \ .(0, b, 0)
       |  |    / \
       |  |   /   \
       |  |  /     \
       |  | /       \
       |  |/         \
-------+--/-----------\---------> y
       | /.(a, 0, 0)
       |/
       x
```

## Memory technique — remember this forever
**1. The Visual Hook:** Think of the plane as a wooden board, and the normal vector as a steel nail driven perfectly straight through it. The nail ($A, B, C$) dictates the tilt of the board. The constant $D$ is just how far you slide the board up or down along the nail.

**2. The Formulas to Overlearn:**
*   **Normal:** $\vec{n} \cdot (\vec{r} - \vec{a}) = 0$
*   **General:** $Ax + By + Cz + D = 0$
*   **Intercept:** $\frac{x}{a} + \frac{y}{b} + \frac{z}{c} = 1$

**3. Spaced-Repetition Schedule:**
Review these derivations and formulas at 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. First Principles Pathway:**
If you forget everything, remember this logical chain: 
*A plane is flat.* $\rightarrow$ *Any vector drawn between two points on the plane is flat.* $\rightarrow$ *A vector perpendicular to the plane must be perpendicular to that flat vector.* $\rightarrow$ *Perpendicular means dot product is zero.* $\rightarrow$ $\vec{n} \cdot (\vec{r} - \vec{a}) = 0$.

## Common mistakes
*   **Confusing point coordinates with the normal vector:** In $Ax + By + Cz + D = 0$, students sometimes plug the point $(x_0, y_0, z_0)$ into $A, B, C$. The point goes into $x, y, z$ to solve for $D$; the normal vector *is* $A, B, C$.
*   **Misinterpreting $D$ as distance:** In $Ax + By + Cz + D = 0$, $D$ is **not** the distance from the origin to the plane unless the normal vector $\langle A, B, C \rangle$ is a *unit* vector (magnitude of 1). 
*   **Dividing by zero in intercept form:** If a plane is parallel to the $z$-axis, it never intercepts it. Its general form will lack a $z$ term (e.g., $2x + 3y = 6$). Students will blindly try to force it into $\frac{z}{c}$ and fail. Recognize that missing variables mean parallel axes.

## Self-check
1. Given the plane $3x - 6y + 2z - 12 = 0$, what is the normal vector, and what are the $x, y,$ and $z$ intercepts?
2. A plane passes through the origin and contains the vectors $\vec{u} = \langle 1, 0, -1 \rangle$ and $\vec{v} = \langle 0, 2, 1 \rangle$. What is its general form equation? *(Hint: How do you find a vector perpendicular to two other vectors?)*
3. A plane has the intercept form $\frac{x}{2} + \frac{y}{-2} + \frac{z}{1} = 1$. Convert this to general form, extract the normal vector, and determine the shortest distance from the origin to this plane.