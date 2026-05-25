## What it is
A parametric surface is a mapping from a two-dimensional parameter space, say the $uv$-plane, into three-dimensional $xyz$-space. Instead of defining a surface with an equation like $z=f(x,y)$ or $F(x,y,z)=k$, we define the $x, y,$ and $z$ coordinates of points on the surface as functions of two independent parameters, $u$ and $v$: $\vec{r}(u,v) = \langle x(u,v), y(u,v), z(u,v) \rangle$.

## Why it matters
This concept is fundamental in computer-aided design (CAD) and computational fluid dynamics (CFD). An aircraft wing or a turbine blade is not easily described by $z=f(x,y)$; it is built from parametric patches (NURBS surfaces) which allow for precise local control of curvature and smoothness. In physics, describing the flux of a vector field (like an electric field or fluid velocity) through a complex surface requires integrating over that surface, a process built directly on the parametric formulation.

## When to study it
You must be comfortable with the following before proceeding. If not, master them first.
1.  **Parametric curves:** A solid understanding of $\vec{r}(t) = \langle x(t), y(t), z(t) \rangle$ and its tangent vector $\vec{r}'(t)$.
2.  **Partial derivatives:** Calculating $\frac{\partial f}{\partial x}$ and understanding its geometric meaning as a rate of change along a coordinate axis.
3.  **The cross product of vectors:** Calculating $\vec{a} \times \vec{b}$ and knowing its geometric properties: it produces a vector orthogonal to $\vec{a}$ and $\vec{b}$, and its magnitude $\|\vec{a} \times \vec{b}\|$ is the area of the parallelogram they span.
4.  **Double integrals:** Setting up and evaluating integrals over regions in a 2D plane.

## How to study it (step by step)
1.  **Visualize the map.** Take the parameterization for a cylinder: $\vec{r}(u,v) = \langle \cos(u), \sin(u), v \rangle$ for $u \in [0, 2\pi], v \in [0, h]$. Recognize that the $uv$-plane is a rectangle, and the function $\vec{r}$ "rolls" this rectangle into a cylinder in $xyz$-space.
2.  **Derive the tangent vectors.** Hold one parameter constant and differentiate with respect to the other.
    *   Fix $v=v_0$. The curve $\vec{r}(u, v_0)$ is a path on the surface. Its tangent vector is $\vec{r}_u = \frac{\partial \vec{r}}{\partial u}$.
    *   Fix $u=u_0$. The curve $\vec{r}(u_0, v)$ is another path. Its tangent vector is $\vec{r}_v = \frac{\partial \vec{r}}{\partial v}$.
3.  **Construct the tangent plane.** The vectors $\vec{r}_u$ and $\vec{r}_v$ at a point $(u_0, v_0)$ lie in the tangent plane to the surface at the point $\vec{r}(u_0, v_0)$. Their cross product, $\vec{N} = \vec{r}_u \times \vec{r}_v$, is therefore a normal vector to the plane and the surface. Use this normal vector and the point to write the plane's equation.
4.  **Derive the surface area element.** Consider an infinitesimal rectangle $du \times dv$ in the parameter space. The mapping $\vec{r}$ transforms this into an infinitesimal parallelogram on the surface. The sides of this parallelogram are approximated by the vectors $\vec{r}_u du$ and $\vec{r}_v dv$. The area of this parallelogram, $dS$, is the magnitude of their cross product: $dS = \| (\vec{r}_u du) \times (\vec{r}_v dv) \| = \| \vec{r}_u \times \vec{r}_v \| du \, dv$.
5.  **Set up the surface area integral.** To find the total surface area, integrate the area element $dS$ over the entire domain $D$ of the parameters $u$ and $v$. This gives the fundamental formula: $A(S) = \iint_D \| \vec{r}_u \times \vec{r}_v \| \, du \, dv$.
6.  **Solve problems.** Work through parameterizing a sphere, a cone, and a paraboloid. For each, calculate the tangent plane at an arbitrary point and find the total surface area.

## Key ideas, with intuition
1.  **Grid Lines Define the Geometry.** Imagine the $uv$-plane as a piece of graph paper. The function $\vec{r}(u,v)$ wraps this paper into a shape in 3D space. The horizontal grid lines ($v=\text{const}$) become one set of curves on the surface, and the vertical grid lines ($u=\text{const}$) become another. The geometry of the surface is captured by how this grid stretches and bends.

2.  **Tangent Vectors are Velocities along Grid Lines.** The partial derivative $\vec{r}_u = \frac{\partial \vec{r}}{\partial u}$ is just the velocity vector of your motion along a $v=\text{const}$ grid line. Similarly, $\vec{r}_v$ is the velocity vector along a $u=\text{const}$ grid line. These two vectors at a point define the "local directions" on the surface.
    $$ \vec{r}_u = \left\langle \frac{\partial x}{\partial u}, \frac{\partial y}{\partial u}, \frac{\partial z}{\partial u} \right\rangle \quad \text{and} \quad \vec{r}_v = \left\langle \frac{\partial x}{\partial v}, \frac{\partial y}{\partial v}, \frac{\partial z}{\partial v} \right\rangle $$

3.  **The Cross Product Gives the Normal.** Since $\vec{r}_u$ and $\vec{r}_v$ define the tangent plane, their cross product must be perpendicular (normal) to it. This gives us a way to find the orientation of the surface at any point.
    $$ \vec{N} = \vec{r}_u \times \vec{r}_v $$

4.  **The Area Element is a Local Stretch Factor.** The term $\|\vec{r}_u \times \vec{r}_v\|$ tells you how much the area is distorted when mapping from the flat $uv$-plane to the curved surface. If you map a tiny $du \times dv$ square, its area on the surface becomes $\|\vec{r}_u \times \vec{r}_v\| \, du \, dv$. This factor is the magnitude of the normal vector, which is also the area of the parallelogram spanned by $\vec{r}_u$ and $\vec{r}_v$.

## Worked example
Find the equation of the tangent plane and the surface area of the part of the cylinder parameterized by $\vec{r}(u,v) = \langle 3\cos u, 3\sin u, v \rangle$ for $u \in [0, 2\pi]$ and $v \in [0, 4]$, at the point where $u=\pi/2, v=1$.

**Step 1: Find the point.**
Evaluate $\vec{r}(\pi/2, 1) = \langle 3\cos(\pi/2), 3\sin(\pi/2), 1 \rangle = \langle 0, 3, 1 \rangle$. This is our point of tangency, $P_0$.

**Step 2: Calculate the tangent vectors.**
Find the partial derivatives with respect to $u$ and $v$.
$$ \vec{r}_u = \frac{\partial \vec{r}}{\partial u} = \langle -3\sin u, 3\cos u, 0 \rangle $$
$$ \vec{r}_v = \frac{\partial \vec{r}}{\partial v} = \langle 0, 0, 1 \rangle $$
Evaluate these at $(u,v) = (\pi/2, 1)$:
$$ \vec{r}_u(\pi/2, 1) = \langle -3\sin(\pi/2), 3\cos(\pi/2), 0 \rangle = \langle -3, 0, 0 \rangle $$
$$ \vec{r}_v(\pi/2, 1) = \langle 0, 0, 1 \rangle $$

**Step 3: Find the normal vector.**
Take the cross product of the tangent vectors.
$$ \vec{N} = \vec{r}_u \times \vec{r}_v = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ -3 & 0 & 0 \\ 0 & 0 & 1 \end{vmatrix} = \mathbf{i}(0-0) - \mathbf{j}(-3-0) + \mathbf{k}(0-0) = \langle 0, 3, 0 \rangle $$
This is our normal vector at the point $P_0$.

**Step 4: Write the tangent plane equation.**
The equation of a plane is $\vec{N} \cdot (\vec{x} - \vec{x}_0) = 0$.
Here $\vec{x} = \langle x, y, z \rangle$ and $\vec{x}_0 = P_0 = \langle 0, 3, 1 \rangle$.
$$ \langle 0, 3, 0 \rangle \cdot \langle x-0, y-3, z-1 \rangle = 0 $$
$$ 0(x) + 3(y-3) + 0(z-1) = 0 \implies 3(y-3) = 0 \implies y=3 $$
*Reflection:* This makes sense. At the point $(0,3,1)$ on a cylinder of radius 3 centered on the z-axis, the tangent plane should be a vertical plane parallel to the xz-plane, which is exactly what $y=3$ is.

**Step 5: Calculate the magnitude of the general normal vector.**
We need $\|\vec{r}_u \times \vec{r}_v\|$ for the surface area integral. Let's compute the cross product with general $u,v$.
$$ \vec{r}_u \times \vec{r}_v = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ -3\sin u & 3\cos u & 0 \\ 0 & 0 & 1 \end{vmatrix} = \langle 3\cos u, 3\sin u, 0 \rangle $$
Now find its magnitude:
$$ \|\vec{r}_u \times \vec{r}_v\| = \sqrt{(3\cos u)^2 + (3\sin u)^2 + 0^2} = \sqrt{9\cos^2 u + 9\sin^2 u} = \sqrt{9(1)} = 3 $$

**Step 6: Set up and evaluate the surface area integral.**
$$ A(S) = \iint_D \| \vec{r}_u \times \vec{r}_v \| \, dA = \int_{0}^{4} \int_{0}^{2\pi} 3 \, du \, dv $$
$$ A(S) = 3 \int_{0}^{4} [u]_{0}^{2\pi} \, dv = 3 \int_{0}^{4} 2\pi \, dv = 6\pi [v]_{0}^{4} = 6\pi(4) = 24\pi $$
*Reflection:* The surface area of a cylinder is its circumference times its height. Here, circumference is $2\pi r = 2\pi(3) = 6\pi$ and height is $4$. The area is $(6\pi)(4) = 24\pi$. The formula worked perfectly. The constant magnitude $\|\vec{r}_u \times \vec{r}_v\|=3$ indicates that our parameterization maps area from the $uv$-plane to the surface with a constant stretch factor, which is true for this "unrolling" parameterization of a cylinder.

## Diagrams
A diagram of the mapping from parameter space to 3D space:
```text
      (u,v) - plane                (x,y,z) - space
      (Parameter Space)                  (Surface)

  v ^
    |
  h +-------+
    |       |
    |   D   |  --- r(u,v) -->
    |       |
    +-------+------> u
    0      2π

                                      z ^
                                        |
                                      h +-------+
                                        | //////|
                                        |/ P    |
                                        +-------+---> y
                                       /
                                      /
                                     x
```
A local view at a point P on the surface:
```text
              ^ N = r_u x r_v
              |
              |
        , - ~ ~ ~ - ,
    , '   r_v       ' ,
  ,       ^         ,
 ,        |         ,
,         | P       ,
,         +-----> r_u ,
 ,       /         ,
  ,     /         ,
    ' - , _ , _ '
        (Tangent Plane)
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you are a tiny bug standing on a curved sheet of metal (the surface). To get your bearings, you walk a tiny step in the "u" direction (vector $\vec{r}_u du$) and a tiny step in the "v" direction (vector $\vec{r}_v dv$). These two steps define a tiny parallelogram you're standing on. To find which way is "up", you take the **cross product** of your two steps, giving the **Normal** vector $\vec{N}$. The **area** of your parallelogram is the **magnitude** of that normal vector.

2.  **Must Overlearn Formulas:**
    *   Normal Vector: $\vec{N} = \vec{r}_u \times \vec{r}_v$
    *   Surface Area Element: $dS = \|\vec{r}_u \times \vec{r}_v\| \, du \, dv$
    *   Surface Area Integral: $A(S) = \iint_D \|\vec{r}_u \times \vec{r}_v\| \, dA$

3.  **Spaced Repetition Schedule:** Review this material and re-derive the formulas from the "parallelogram" idea at:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget the surface area formula, rebuild it.
    *   A surface is parameterized by $\vec{r}(u,v)$.
    *   A small change $du$ moves you along the surface by $\vec{r}_u du$.
    *   A small change $dv$ moves you along the surface by $\vec{r}_v dv$.
    *   These two vectors form an infinitesimal parallelogram.
    *   The area of a parallelogram spanned by vectors $\vec{a}$ and $\vec{b}$ is $\|\vec{a} \times \vec{b}\|$.
    *   So, the area of the infinitesimal patch is $dS = \|(\vec{r}_u du) \times (\vec{r}_v dv)\| = \|\vec{r}_u \times \vec{r}_v\| du \, dv$.
    *   To get total area, sum them all up: $\iint dS$.

## Common mistakes
1.  **Forgetting the Magnitude:** Calculating the surface area integral as $\iint (\vec{r}_u \times \vec{r}_v) \, dA$. The integrand must be the scalar magnitude $\|\vec{r}_u \times \vec{r}_v}\|$, not the normal vector itself.
2.  **Incorrect Parameterization:** Using the wrong bounds or formulas for standard shapes. For a sphere, a common error is mixing up the roles of $\phi$ (polar angle) and $\theta$ (azimuthal angle) and their respective ranges.
3.  **Evaluating Too Early:** Plugging in the specific values of $(u_0, v_0)$ *before* calculating the cross product for the surface area integral. The magnitude $\|\vec{r}_u \times \vec{r}_v\|$ must be kept as a function of $u$ and $v$ inside the integral. You only use specific values for finding a tangent plane at a single point.

## Self-check
1.  Parameterize the plane $x+2y+3z=6$. Calculate $\vec{r}_u$, $\vec{r}_v$, and the normal vector $\vec{N}$. Does your result relate to the coefficients of the plane's equation as you expect?
2.  Set up the integral for the surface area of a sphere of radius $R$ using the standard parameterization $\vec{r}(\phi, \theta) = \langle R\sin\phi\cos\theta, R\sin\phi\sin\theta, R\cos\phi \rangle$. Evaluate it to confirm you get $4\pi R^2$.
3.  Consider the parameterization of the $xy$-plane given by $\vec{r}(u,v) = \langle u+v, u+v, 0 \rangle$. Calculate $\|\vec{r}_u \times \vec{r}_v\|$. What does the result tell you about this parameterization? Why is it not suitable for calculating area?