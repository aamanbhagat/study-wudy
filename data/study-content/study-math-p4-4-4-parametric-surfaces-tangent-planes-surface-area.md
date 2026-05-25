## 1. What it is — in plain English

Imagine you have a flat, rectangular sheet of rubber. You can stretch it, twist it, and bend it in three-dimensional space, but you can't tear it or glue parts together. The shape this rubber sheet forms in space is what we call a "surface."

Now, imagine that every point on this rubber sheet can be uniquely identified by two numbers, just like coordinates on a flat map. Let's call these numbers $u$ and $v$. As you stretch and bend the sheet, each $(u,v)$ pair on your original flat map corresponds to a specific $(x,y,z)$ location in 3D space.

A "parametric surface" is simply a mathematical way to describe such a surface. Instead of trying to write the surface as $z = f(x,y)$ (which only works for "height functions" and can't describe, say, a sphere), we use two parameters, $u$ and $v$, to "draw" or "trace out" every point on the surface. So, $x$, $y$, and $z$ are all functions of $u$ and $v$.

Think of it like this: if you're drawing a picture on a computer, you might tell it to draw a line by giving it a starting point and an ending point. For a surface, you're telling it how to draw a whole sheet of points by giving it a recipe for $x$, $y$, and $z$ based on two "internal" coordinates, $u$ and $v$.

## 2. Why it matters — real-world applications

Parametric surfaces are not just abstract mathematical constructs; they are fundamental tools used across many scientific and engineering disciplines to model and understand the complex curved shapes that make up our world.

1.  **Aerospace Engineering and Automotive Design:** When designing an airplane wing, a car body, or even a boat hull, engineers deal with incredibly complex, smooth, and aerodynamic surfaces. These are almost universally modeled using parametric surfaces, often a specific type called NURBS (Non-Uniform Rational B-Splines). This allows for precise control over the shape, ensuring optimal performance (e.g., minimizing drag, maximizing lift) and aesthetic appeal. Companies like Boeing, Airbus, Ford, and Ferrari rely heavily on CAD (Computer-Aided Design) software that uses parametric surfaces.

2.  **Computer Graphics and Animation:** Every 3D object you see in a video game, animated movie (e.g., Pixar films), or architectural visualization is typically represented by a mesh of parametric surfaces (or polygons approximating them). When a character's face needs to animate smoothly, or a car needs to reflect light realistically, the underlying mathematical description is often a parametric surface. This allows for smooth shading, deformation, and rendering of complex forms.

3.  **Physics and Engineering Simulations (e.g., CFD, FEA):** Many physical phenomena, such as fluid flow (Computational Fluid Dynamics - CFD) over a turbine blade or heat transfer through a car engine component, occur on or across curved surfaces. To simulate these, engineers need to accurately define the geometry of the surfaces. Parametric representations provide the necessary mathematical framework to discretize these surfaces into small elements for numerical analysis (e.g., Finite Element Analysis - FEA), allowing for accurate prediction of stress, strain, temperature distribution, or fluid pressures.

4.  **Robotics and Manufacturing:** When a robotic arm needs to perform a task on a curved object, such as welding a seam on a car chassis or sanding a surfboard, its path must be precisely controlled relative to the object's surface. Parametric descriptions of the object's surface allow for the generation of smooth, collision-free robot trajectories that follow the contours of the workpiece. This is crucial for automation in industries ranging from automotive to consumer goods manufacturing.

## 3. Prerequisites — what you must know first

Before diving into parametric surfaces, you should have a solid understanding of the following concepts. If any of these feel unfamiliar, pause and review them thoroughly.

*   **Vectors in 3D:**
    *   **Components:** Representing points and directions as $\langle x, y, z \rangle$.
    *   **Vector Operations:** Addition, subtraction, scalar multiplication.
    *   **Dot Product:** $\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}| |\mathbf{b}| \cos \theta$, used for projections and checking perpendicularity.
    *   **Cross Product:** $\mathbf{a} \times \mathbf{b}$ results in a vector perpendicular to both $\mathbf{a}$ and $\mathbf{b}$, with magnitude $|\mathbf{a}| |\mathbf{b}| \sin \theta$. Crucial for finding normal vectors and areas of parallelograms.
    *   **Magnitude of a Vector:** $|\mathbf{v}| = \sqrt{v_x^2 + v_y^2 + v_z^2}$, representing its length.

*   **Partial Derivatives:**
    *   Differentiating a function of multiple variables with respect to one variable, treating others as constants. E.g., $\frac{\partial f}{\partial x}$ for $f(x,y,z)$.

*   **Multivariable Functions:**
    *   Understanding functions like $f(x,y)$ or $g(x,y,z)$ where the output depends on multiple inputs.

*   **Vector-valued Functions (Parametric Curves):**
    *   Representing a curve in 2D or 3D space as $\mathbf{r}(t) = \langle x(t), y(t), z(t) \rangle$.
    *   The derivative $\mathbf{r}'(t) = \langle x'(t), y'(t), z'(t) \rangle$ gives a tangent vector to the curve at $t$.

*   **Planes in 3D:**
    *   **Normal Vector:** A vector perpendicular to a plane.
    *   **Equation of a Plane:** Given a normal vector $\mathbf{n} = \langle a, b, c \rangle$ and a point $P_0=(x_0, y_0, z_0)$ on the plane, the equation is $a(x-x_0) + b(y-y_0) + c(z-z_0) = 0$.

*   **Double Integrals:**
    *   Evaluating $\iint_D f(x,y) \, dA$ over a region $D$ in the $xy$-plane (or $uv$-plane). Used for calculating area, volume, mass, etc.

*   **Determinants of 2x2 and 3x3 matrices:**
    *   Essential for efficiently calculating cross products.

## 4. The core idea — step by step

Let's break down the concepts of parametric surfaces, tangent planes, and surface area, building intuition along the way.

### Step 1: Understanding Parametric Surfaces

**Plain English:** Imagine you have a flexible, two-dimensional grid (like graph paper). Each point on this grid can be identified by its coordinates, say $(u,v)$. Now, you take this grid and smoothly embed it into three-dimensional space. Every point $(u,v)$ on your original flat grid now corresponds to a specific location $(x,y,z)$ in 3D space. The "recipe" for how $x, y, z$ depend on $u, v$ defines the shape of the surface.

**Small concrete example:** Consider a simple flat plane.
If you have a sheet of paper that is part of the $xy$-plane, then $x=u$, $y=v$, and $z=0$. So, the parametric representation would be $\mathbf{r}(u,v) = \langle u, v, 0 \rangle$. If you wanted a plane at a different height, say $z=5$, it would be $\mathbf{r}(u,v) = \langle u, v, 5 \rangle$. If you wanted a plane that's tilted, say $x+y+z=1$, you might let $x=u$ and $y=v$, then $z=1-u-v$. So, $\mathbf{r}(u,v) = \langle u, v, 1-u-v \rangle$.

**Formal/Mathematical Version:** A parametric surface $S$ is defined by a vector-valued function of two parameters, $u$ and $v$:
$$ \mathbf{r}(u,v) = \langle x(u,v), y(u,v), z(u,v) \rangle $$
where $(u,v)$ varies over a region $D$ in the $uv$-plane. The variables $u$ and $v$ are called **parameters**. The region $D$ is the **domain** of the parametrization.

**What could go wrong:** Students often confuse the parameters $u,v$ with the spatial coordinates $x,y,z$. Remember, $u$ and $v$ are like internal coordinates on the surface itself, while $x,y,z$ are its position in the ambient 3D space. The domain $D$ is crucial for defining the *extent* of the surface.

### Step 2: Grid Curves and Tangent Vectors

**Plain English:** Imagine drawing lines on your flexible grid before you embed it in 3D space. If you draw lines where $u$ is constant (e.g., $u=1, u=2, \dots$) and lines where $v$ is constant (e.g., $v=1, v=2, \dots$), these form a grid. When you bend the sheet into 3D space, these grid lines become curves on the surface. We can find vectors that are tangent to these curves at any point.

**Small concrete example:** Consider a sphere parametrized by spherical coordinates:
$\mathbf{r}(\phi, \theta) = \langle R \sin \phi \cos \theta, R \sin \phi \sin \theta, R \cos \phi \rangle$.
If we fix $\phi$ (latitude), we get a circle of constant latitude. If we fix $\theta$ (longitude), we get a great circle (a meridian) passing through the poles.
The tangent vector to a meridian (fixed $\phi$) is $\mathbf{r}_\theta = \frac{\partial \mathbf{r}}{\partial \theta}$.
The tangent vector to a circle of latitude (fixed $\theta$) is $\mathbf{r}_\phi = \frac{\partial \mathbf{r}}{\partial \phi}$.

**Formal/Mathematical Version:**
If we hold one parameter constant, say $v=v_0$, then $\mathbf{r}(u,v_0)$ becomes a vector function of a single parameter $u$. This describes a curve on the surface, called a **grid curve**. The tangent vector to this curve is given by the partial derivative with respect to $u$:
$$ \mathbf{r}_u = \frac{\partial \mathbf{r}}{\partial u} = \left\langle \frac{\partial x}{\partial u}, \frac{\partial y}{\partial u}, \frac{\partial z}{\partial u} \right\rangle $$
Similarly, if we hold $u=u_0$ constant, $\mathbf{r}(u_0,v)$ describes another grid curve, and its tangent vector is:
$$ \mathbf{r}_v = \frac{\partial \mathbf{r}}{\partial v} = \left\langle \frac{\partial x}{\partial v}, \frac{\partial y}{\partial v}, \frac{\partial z}{\partial v} \right\rangle $$
These two vectors, $\mathbf{r}_u$ and $\mathbf{r}_v$, lie in the tangent plane to the surface at the point corresponding to $(u,v)$. They are linearly independent (not parallel) as long as the surface is smooth at that point.

**What could go wrong:** Forgetting how to compute partial derivatives of vector functions. It's simply taking the partial derivative of each component function. Also, ensure you understand that these vectors are *tangent* to the surface at a specific point.

### Step 3: The Normal Vector to the Surface

**Plain English:** At any point on a smooth surface, there's a unique direction that points straight "out" or "in" from the surface, perpendicular to it. This direction is given by a vector called the **normal vector**. Since $\mathbf{r}_u$ and $\mathbf{r}_v$ are two vectors lying in the tangent plane, their cross product will give us a vector that is perpendicular to both of them, and therefore perpendicular to the tangent plane (and thus normal to the surface).

**Small concrete example:** For the flat plane $\mathbf{r}(u,v) = \langle u, v, 1-u-v \rangle$:
$\mathbf{r}_u = \langle 1, 0, -1 \rangle$
$\mathbf{r}_v = \langle 0, 1, -1 \rangle$
The normal vector is $\mathbf{r}_u \times \mathbf{r}_v = \langle 1, 0, -1 \rangle \times \langle 0, 1, -1 \rangle = \langle (0)(-1) - (-1)(1), (-1)(0) - (1)(-1), (1)(1) - (0)(0) \rangle = \langle 1, 1, 1 \rangle$.
This is indeed a normal vector to the plane $x+y+z=1$.

**Formal/Mathematical Version:** The normal vector $\mathbf{n}$ to the parametric surface $\mathbf{r}(u,v)$ at a point $(u,v)$ is given by the cross product of the tangent vectors $\mathbf{r}_u$ and $\mathbf{r}_v$:
$$ \mathbf{n}(u,v) = \mathbf{r}_u(u,v) \times \mathbf{r}_v(u,v) $$
This vector is perpendicular to the tangent plane at the point $\mathbf{r}(u,v)$. Note that $\mathbf{r}_v \times \mathbf{r}_u = -\mathbf{n}$, which points in the opposite direction. Both are valid normal vectors, just pointing "out" vs. "in". A surface is called **smooth** at a point if $\mathbf{n} \neq \mathbf{0}$ at that point.

**What could go wrong:** Incorrectly calculating the cross product. Remember the formula: $\langle a_1, a_2, a_3 \rangle \times \langle b_1, b_2, b_3 \rangle = \langle a_2 b_3 - a_3 b_2, a_3 b_1 - a_1 b_3, a_1 b_2 - a_2 b_1 \rangle$. If you get $\mathbf{0}$ for the normal vector, it means $\mathbf{r}_u$ and $\mathbf{r}_v$ are parallel, implying a "crease" or "cusp" in the surface at that point, where a unique tangent plane doesn't exist.

### Step 4: The Tangent Plane

**Plain English:** Once you have a point on the surface and a normal vector at that point, defining the tangent plane is straightforward. It's just a flat surface that "kisses" the curved surface at that single point, lying perfectly flat against it.

**Small concrete example:** Let's say we want the tangent plane to the sphere $\mathbf{r}(\phi, \theta) = \langle \sin \phi \cos \theta, \sin \phi \sin \theta, \cos \phi \rangle$ (for $R=1$) at the point where $\phi = \pi/4$ and $\theta = \pi/4$.
First, find the point:
$x = \sin(\pi/4) \cos(\pi/4) = (\sqrt{2}/2)(\sqrt{2}/2) = 1/2$
$y = \sin(\pi/4) \sin(\pi/4) = (\sqrt{2}/2)(\sqrt{2}/2) = 1/2$
$z = \cos(\pi/4) = \sqrt{2}/2$
So the point $P_0 = (1/2, 1/2, \sqrt{2}/2)$.
Next, find the normal vector.
$\mathbf{r}_\phi = \langle \cos \phi \cos \theta, \cos \phi \sin \theta, -\sin \phi \rangle$
$\mathbf{r}_\theta = \langle -\sin \phi \sin \theta, \sin \phi \cos \theta, 0 \rangle$
At $(\pi/4, \pi/4)$:
$\mathbf{r}_\phi(\pi/4, \pi/4) = \langle (\sqrt{2}/2)(\sqrt{2}/2), (\sqrt{2}/2)(\sqrt{2}/2), -(\sqrt{2}/2) \rangle = \langle 1/2, 1/2, -\sqrt{2}/2 \rangle$
$\mathbf{r}_\theta(\pi/4, \pi/4) = \langle -(\sqrt{2}/2)(\sqrt{2}/2), (\sqrt{2}/2)(\sqrt{2}/2), 0 \rangle = \langle -1/2, 1/2, 0 \rangle$
Now compute the cross product:
$\mathbf{n} = \mathbf{r}_\phi \times \mathbf{r}_\theta = \langle (1/2)(0) - (-\sqrt{2}/2)(1/2), (-\sqrt{2}/2)(-1/2) - (1/2)(0), (1/2)(1/2) - (1/2)(-1/2) \rangle$
$\mathbf{n} = \langle \sqrt{2}/4, \sqrt{2}/4, 1/4 + 1/4 \rangle = \langle \sqrt{2}/4, \sqrt{2}/4, 1/2 \rangle$.
We can use a simpler normal vector by scaling, e.g., $\mathbf{n}' = \langle \sqrt{2}, \sqrt{2}, 2 \rangle$.
The equation of the tangent plane is:
$\sqrt{2}(x - 1/2) + \sqrt{2}(y - 1/2) + 2(z - \sqrt{2}/2) = 0$
$\sqrt{2}x - \sqrt{2}/2 + \sqrt{2}y - \sqrt{2}/2 + 2z - \sqrt{2} = 0$
$\sqrt{2}x + \sqrt{2}y + 2z = 2\sqrt{2}$
Dividing by $\sqrt{2}$: $x+y+\sqrt{2}z=2$.

**Formal/Mathematical Version:** Let the point on the surface be $P_0 = \mathbf{r}(u_0,v_0) = \langle x_0, y_0, z_0 \rangle$. Let the normal vector at this point be $\mathbf{n} = \mathbf{r}_u(u_0,v_0) \times \mathbf{r}_v(u_0,v_0) = \langle a, b, c \rangle$.
The equation of the tangent plane at $P_0$ is:
$$ a(x-x_0) + b(y-y_0) + c(z-z_0) = 0 $$

**What could go wrong:** Forgetting to evaluate $\mathbf{r}_u$, $\mathbf{r}_v$, and thus $\mathbf{n}$ at the *specific* $(u_0,v_0)$ values that correspond to the desired point. The normal vector changes from point to point on a curved surface.

### Step 5: The Surface Area Element

**Plain English:** Imagine a tiny, tiny rectangle in the $uv$-plane with sides of length $du$ and $dv$. When this tiny rectangle is mapped onto the 3D surface, it becomes a tiny, slightly distorted parallelogram. We want to find the area of this tiny parallelogram. The sides of this parallelogram are approximately given by the vectors $\mathbf{r}_u \, du$ and $\mathbf{r}_v \, dv$. The area of a parallelogram formed by two vectors is the magnitude of their cross product.

**Small concrete example:** Think of a flat map of the Earth. A square on the map (in $uv$-space) looks like a square. But when you project it onto the curved Earth, especially near the poles, it gets stretched and distorted into a shape that's not quite a square anymore, but more like a parallelogram. The amount of "stretching" is captured by the magnitude of the cross product.

**Formal/Mathematical Version:** Consider an infinitesimal rectangle in the $uv$-plane with sides $du$ and $dv$. This rectangle is mapped to an infinitesimal parallelogram on the surface. The sides of this parallelogram are approximated by the vectors $\mathbf{r}_u \, du$ and $\mathbf{r}_v \, dv$.
The area of this infinitesimal parallelogram, denoted $dS$, is the magnitude of the cross product of these two vectors:
$$ dS = |(\mathbf{r}_u \, du) \times (\mathbf{r}_v \, dv)| $$
Using properties of cross products, this simplifies to:
$$ dS = |\mathbf{r}_u \times \mathbf{r}_v| \, du \, dv $$
The quantity $|\mathbf{r}_u \times \mathbf{r}_v|$ is often called the **surface element** or **area element** and represents how much a unit area in the $uv$-plane is stretched or shrunk when mapped to the surface. It can be thought of as a "scaling factor" for area.

**What could go wrong:** Forgetting to take the *magnitude* of the cross product. The cross product itself is a vector, but area is a scalar quantity. Also, misinterpreting $dS$ as just $du dv$. The $|\mathbf{r}_u \times \mathbf{r}_v|$ term is critical.

### Step 6: Calculating Surface Area

**Plain English:** To find the total surface area of a region on our parametric surface, we simply add up all these tiny surface area elements ($dS$) over the entire region in the $uv$-plane that defines our surface. This "adding up" is done using a double integral.

**Small concrete example:** Imagine trying to find the surface area of a crumpled piece of paper. You'd break it into tiny, tiny pieces, find the area of each piece, and then sum them all up. The double integral does this for us continuously.

**Formal/Mathematical Version:** The total surface area $A(S)$ of a parametric surface $S$ defined by $\mathbf{r}(u,v)$ over a domain $D$ in the $uv$-plane is given by the double integral of the surface area element $dS$:
$$ A(S) = \iint_D dS = \iint_D |\mathbf{r}_u(u,v) \times \mathbf{r}_v(u,v)| \, du \, dv $$
This is the fundamental formula for surface area of a parametric surface.

**What could go wrong:** The most common pitfalls here are errors in calculating the cross product, errors in finding its magnitude (often involving square roots that need careful simplification), and mistakes in setting up or evaluating the double integral, especially with the limits of integration for the domain $D$.

## 5. Worked examples — multiple, with every step shown

Here are several examples to solidify your understanding.

### Example 1: Tangent Plane to a Plane

**Problem:** Find the equation of the tangent plane to the parametric surface $\mathbf{r}(u,v) = \langle 2u+v, u-v, 3u+2v \rangle$ at the point $(3,0,5)$.

**Given:** Parametric surface $\mathbf{r}(u,v) = \langle 2u+v, u-v, 3u+2v \rangle$.
**Want:** Equation of the tangent plane at $(3,0,5)$.

**Step 1: Find the parameters $(u,v)$ that correspond to the given point.**
We set the components of $\mathbf{r}(u,v)$ equal to the coordinates of the point $(3,0,5)$:
$$ 2u+v = 3 \quad (1) $$
$$ u-v = 0 \quad (2) $$
$$ 3u+2v = 5 \quad (3) $$
From equation (2), we get $u=v$.
Substitute $u=v$ into equation (1):
$2v+v = 3 \implies 3v = 3 \implies v=1$.
Since $u=v$, then $u=1$.
Check with equation (3): $3(1)+2(1) = 3+2 = 5$. This is consistent.
So, the point $(3,0,5)$ corresponds to $(u,v) = (1,1)$.
*Explanation: We need to know which values of $u$ and $v$ generate the point where we want to find the tangent plane. This is often the first step in these problems.*

**Step 2: Calculate the partial derivatives $\mathbf{r}_u$ and $\mathbf{r}_v$.**
$$ \mathbf{r}_u = \frac{\partial}{\partial u} \langle 2u+v, u-v, 3u+2v \rangle = \langle 2, 1, 3 \rangle $$
$$ \mathbf{r}_v = \frac{\partial}{\partial v} \langle 2u+v, u-v, 3u+2v \rangle = \langle 1, -1, 2 \rangle $$
*Explanation: These vectors are tangent to the grid curves on the surface. They will lie in the tangent plane.*

**Step 3: Calculate the normal vector $\mathbf{n} = \mathbf{r}_u \times \mathbf{r}_v$.**
$$ \mathbf{n} = \langle 2, 1, 3 \rangle \times \langle 1, -1, 2 \rangle $$
$$ = \langle (1)(2) - (3)(-1), (3)(1) - (2)(2), (2)(-1) - (1)(1) \rangle $$
$$ = \langle 2 - (-3), 3 - 4, -2 - 1 \rangle $$
$$ = \langle 5, -1, -3 \rangle $$
*Explanation: The cross product of two vectors lying in a plane gives a vector perpendicular (normal) to that plane. This normal vector is crucial for defining the tangent plane's orientation.*

**Step 4: Write the equation of the tangent plane.**
The tangent plane passes through the point $(x_0,y_0,z_0) = (3,0,5)$ and has a normal vector $\mathbf{n} = \langle 5, -1, -3 \rangle$.
The equation is $a(x-x_0) + b(y-y_0) + c(z-z_0) = 0$:
$$ 5(x-3) + (-1)(y-0) + (-3)(z-5) = 0 $$
$$ 5x - 15 - y + 0 - 3z + 15 = 0 $$
$$ 5x - y - 3z = 0 $$
*Explanation: This is the standard formula for a plane given a point and a normal vector. We substitute the values we found.*

**Final Answer:**
The equation of the tangent plane is $\boxed{5x - y - 3z = 0}$.

*Reflection:* This example was relatively easy because the surface itself is a plane, so the tangent plane is just the surface itself. The normal vector we found, $\langle 5, -1, -3 \rangle$, is indeed a normal vector to the plane $5x-y-3z=0$. This confirms our steps.

---

### Example 2: Tangent Plane to a Paraboloid

**Problem:** Find the equation of the tangent plane to the parametric surface $\mathbf{r}(u,v) = \langle u, v, u^2+v^2 \rangle$ at the point $(1,2,5)$.

**Given:** Parametric surface $\mathbf{r}(u,v) = \langle u, v, u^2+v^2 \rangle$. This is a paraboloid $z=x^2+y^2$.
**Want:** Equation of the tangent plane at $(1,2,5)$.

**Step 1: Find the parameters $(u,v)$ that correspond to the given point.**
Set the components equal:
$u = 1$
$v = 2$
$u^2+v^2 = 1^2+2^2 = 1+4 = 5$.
This is consistent. So, the point $(1,2,5)$ corresponds to $(u,v) = (1,2)$.
*Explanation: Simple substitution here, as $x=u$ and $y=v$.*

**Step 2: Calculate the partial derivatives $\mathbf{r}_u$ and $\mathbf{r}_v$.**
$$ \mathbf{r}_u = \frac{\partial}{\partial u} \langle u, v, u^2+v^2 \rangle = \langle 1, 0, 2u \rangle $$
$$ \mathbf{r}_v = \frac{\partial}{\partial v} \langle u, v, u^2+v^2 \rangle = \langle 0, 1, 2v \rangle $$
*Explanation: Differentiate each component with respect to $u$ (treating $v$ as constant) and then with respect to $v$ (treating $u$ as constant).*

**Step 3: Evaluate $\mathbf{r}_u$ and $\mathbf{r}_v$ at $(u,v) = (1,2)$.**
$$ \mathbf{r}_u(1,2) = \langle 1, 0, 2(1) \rangle = \langle 1, 0, 2 \rangle $$
$$ \mathbf{r}_v(1,2) = \langle 0, 1, 2(2) \rangle = \langle 0, 1, 4 \rangle $$
*Explanation: The tangent vectors depend on $u$ and $v$, so we must evaluate them at the specific point $(u,v)=(1,2)$ to get the vectors relevant to the desired tangent plane.*

**Step 4: Calculate the normal vector $\mathbf{n} = \mathbf{r}_u \times \mathbf{r}_v$.**
$$ \mathbf{n} = \langle 1, 0, 2 \rangle \times \langle 0, 1, 4 \rangle $$
$$ = \langle (0)(4) - (2)(1), (2)(0) - (1)(4), (1)(1) - (0)(0) \rangle $$
$$ = \langle 0 - 2, 0 - 4, 1 - 0 \rangle $$
$$ = \langle -2, -4, 1 \rangle $$
*Explanation: Cross product calculation.*

**Step 5: Write the equation of the tangent plane.**
The tangent plane passes through $(x_0,y_0,z_0) = (1,2,5)$ and has a normal vector $\mathbf{n} = \langle -2, -4, 1 \rangle$.
$$ -2(x-1) + (-4)(y-2) + 1(z-5) = 0 $$
$$ -2x + 2 - 4y + 8 + z - 5 = 0 $$
$$ -2x - 4y + z + 5 = 0 $$
$$ 2x + 4y - z = 5 $$
*Explanation: Substitute the point and normal vector into the plane equation formula.*

**Final Answer:**
The equation of the tangent plane is $\boxed{2x + 4y - z = 5}$.

*Reflection:* This is a more typical example of finding a tangent plane to a curved surface. The normal vector is specific to the point of tangency. If we had chosen a different point, we would get a different normal vector and a different tangent plane.

---

### Example 3: Surface Area of a Cone

**Problem:** Find the surface area of the part of the cone $z = \sqrt{x^2+y^2}$ that lies between the planes $z=1$ and $z=3$.

**Given:** Cone $z = \sqrt{x^2+y^2}$, bounded by $z=1$ and $z=3$.
**Want:** Surface area.

**Step 1: Parametrize the surface.**
A common parametrization for a cone is to use cylindrical coordinates.
Let $x = u \cos v$ and $y = u \sin v$.
Since $z = \sqrt{x^2+y^2}$, we have $z = \sqrt{(u \cos v)^2 + (u \sin v)^2} = \sqrt{u^2 \cos^2 v + u^2 \sin^2 v} = \sqrt{u^2(\cos^2 v + \sin^2 v)} = \sqrt{u^2} = u$ (assuming $u \ge 0$, which is typical for radius).
So, our parametrization is:
$$ \mathbf{r}(u,v) = \langle u \cos v, u \sin v, u \rangle $$
*Explanation: We transform the Cartesian equation into a parametric form using $u$ and $v$. Cylindrical coordinates are natural for cones. Here $u$ represents the radius in the $xy$-plane and also the $z$-coordinate, while $v$ is the angle.*

**Step 2: Determine the domain $D$ for $(u,v)$.**
The cone is bounded by $z=1$ and $z=3$.
Since $z=u$ in our parametrization, this means $1 \le u \le 3$.
For the angle $v$, a full cone goes all the way around, so $0 \le v \le 2\pi$.
Thus, the domain $D$ is $1 \le u \le 3$, $0 \le v \le 2\pi$.
*Explanation: The limits of integration for $u$ and $v$ are derived from the problem description.*

**Step 3: Calculate the partial derivatives $\mathbf{r}_u$ and $\mathbf{r}_v$.**
$$ \mathbf{r}_u = \frac{\partial}{\partial u} \langle u \cos v, u \sin v, u \rangle = \langle \cos v, \sin v, 1 \rangle $$
$$ \mathbf{r}_v = \frac{\partial}{\partial v} \langle u \cos v, u \sin v, u \rangle = \langle -u \sin v, u \cos v, 0 \rangle $$
*Explanation: Standard partial differentiation.*

**Step 4: Calculate the normal vector $\mathbf{n} = \mathbf{r}_u \times \mathbf{r}_v$.**
$$ \mathbf{n} = \langle \cos v, \sin v, 1 \rangle \times \langle -u \sin v, u \cos v, 0 \rangle $$
$$ = \langle (\sin v)(0) - (1)(u \cos v), (1)(-u \sin v) - (\cos v)(0), (\cos v)(u \cos v) - (\sin v)(-u \sin v) \rangle $$
$$ = \langle -u \cos v, -u \sin v, u \cos^2 v + u \sin^2 v \rangle $$
$$ = \langle -u \cos v, -u \sin v, u(\cos^2 v + \sin^2 v) \rangle $$
$$ = \langle -u \cos v, -u \sin v, u \rangle $$
*Explanation: Cross product calculation, using $\cos^2 v + \sin^2 v = 1$ for simplification.*

**Step 5: Calculate the magnitude of the normal vector, $|\mathbf{n}| = |\mathbf{r}_u \times \mathbf{r}_v|$.**
$$ |\mathbf{n}| = \sqrt{(-u \cos v)^2 + (-u \sin v)^2 + u^2} $$
$$ = \sqrt{u^2 \cos^2 v + u^2 \sin^2 v + u^2} $$
$$ = \sqrt{u^2(\cos^2 v + \sin^2 v) + u^2} $$
$$ = \sqrt{u^2(1) + u^2} $$
$$ = \sqrt{2u^2} $$
$$ = u\sqrt{2} \quad (\text{since } u \ge 0) $$
*Explanation: The magnitude is the length of the normal vector. This term is the surface area element scaling factor.*

**Step 6: Set up and evaluate the double integral for the surface area.**
$$ A(S) = \iint_D |\mathbf{r}_u \times \mathbf{r}_v| \, du \, dv $$
$$ A(S) = \int_0^{2\pi} \int_1^3 u\sqrt{2} \, du \, dv $$
First, integrate with respect to $u$:
$$ \int_1^3 u\sqrt{2} \, du = \sqrt{2} \int_1^3 u \, du = \sqrt{2} \left[ \frac{u^2}{2} \right]_1^3 $$
$$ = \sqrt{2} \left( \frac{3^2}{2} - \frac{1^2}{2} \right) = \sqrt{2} \left( \frac{9}{2} - \frac{1}{2} \right) = \sqrt{2} \left( \frac{8}{2} \right) = 4\sqrt{2} $$
Now, integrate with respect to $v$:
$$ A(S) = \int_0^{2\pi} 4\sqrt{2} \, dv = 4\sqrt{2} [v]_0^{2\pi} $$
$$ = 4\sqrt{2} (2\pi - 0) = 8\pi\sqrt{2} $$
*Explanation: We integrate the surface area element over the defined domain $D$. The order of integration doesn't matter here since the integrand is separable.*

**Final Answer:**
The surface area of the cone is $\boxed{8\pi\sqrt{2}}$.

*Reflection:* This example demonstrates the full process of finding surface area. The parametrization choice is key, and cylindrical coordinates are often useful for surfaces with rotational symmetry. The algebra for the cross product and its magnitude can be tricky, so careful step-by-step calculation is essential.

---

### Example 4: Surface Area of a Spherical Cap

**Problem:** Find the surface area of the part of the sphere $x^2+y^2+z^2=R^2$ that lies above the plane $z=R/2$.

**Given:** Sphere $x^2+y^2+z^2=R^2$, above $z=R/2$.
**Want:** Surface area of the spherical cap.

**Step 1: Parametrize the surface.**
Spherical coordinates are ideal for a sphere.
$$ \mathbf{r}(\phi, \theta) = \langle R \sin \phi \cos \theta, R \sin \phi \sin \theta, R \cos \phi \rangle $$
*Explanation: This is the standard parametrization for a sphere of radius $R$. $\phi$ is the polar angle (from positive $z$-axis) and $\theta$ is the azimuthal angle (around the $z$-axis).*

**Step 2: Determine the domain $D$ for $(\phi, \theta)$.**
The sphere is above the plane $z=R/2$.
From the $z$-component of our parametrization, $z = R \cos \phi$.
So, we need $R \cos \phi \ge R/2$.
Dividing by $R$ (assuming $R>0$), we get $\cos \phi \ge 1/2$.
For $\phi \in [0, \pi]$ (the usual range for polar angle on a sphere), this means $0 \le \phi \le \pi/3$.
The cap goes all the way around the $z$-axis, so $0 \le \theta \le 2\pi$.
Thus, the domain $D$ is $0 \le \phi \le \pi/3$, $0 \le \theta \le 2\pi$.
*Explanation: We use the given condition ($z \ge R/2$) to establish the bounds for our parameters $\phi$ and $\theta$. The $\phi$ range defines the "height" of the cap, and $\theta$ defines its full rotation.*

**Step 3: Calculate the partial derivatives $\mathbf{r}_\phi$ and $\mathbf{r}_\theta$.**
$$ \mathbf{r}_\phi = \frac{\partial}{\partial \phi} \langle R \sin \phi \cos \theta, R \sin \phi \sin \theta, R \cos \phi \rangle = \langle R \cos \phi \cos \theta, R \cos \phi \sin \theta, -R \sin \phi \rangle $$
$$ \mathbf{r}_\theta = \frac{\partial}{\partial \theta} \langle R \sin \phi \cos \theta, R \sin \phi \sin \theta, R \cos \phi \rangle = \langle -R \sin \phi \sin \theta, R \sin \phi \cos \theta, 0 \rangle $$
*Explanation: Differentiate each component with respect to $\phi$ (treating $\theta$ as constant) and then with respect to $\theta$ (treating $\phi$ as constant).*

**Step 4: Calculate the normal vector $\mathbf{n} = \mathbf{r}_\phi \times \mathbf{r}_\theta$.**
$$ \mathbf{n} = \langle R \cos \phi \cos \theta, R \cos \phi \sin \theta, -R \sin \phi \rangle \times \langle -R \sin \phi \sin \theta, R \sin \phi \cos \theta, 0 \rangle $$
The $x$-component: $(R \cos \phi \sin \theta)(0) - (-R \sin \phi)(R \sin \phi \cos \theta) = R^2 \sin^2 \phi \cos \theta$
The $y$-component: $(-R \sin \phi)(-R \sin \phi \sin \theta) - (R \cos \phi \cos \theta)(0) = R^2 \sin^2 \phi \sin \theta$
The $z$-component: $(R \cos \phi \cos \theta)(R \sin \phi \cos \theta) - (R \cos \phi \sin \theta)(-R \sin \phi \sin \theta) $$
$$ = R^2 \cos \phi \sin \phi \cos^2 \theta + R^2 \cos \phi \sin \phi \sin^2 \theta $$
$$ = R^2 \cos \phi \sin \phi (\cos^2 \theta + \sin^2 \theta) = R^2 \cos \phi \sin \phi $$
So,
$$ \mathbf{n} = \langle R^2 \sin^2 \phi \cos \theta, R^2 \sin^2 \phi \sin \theta, R^2 \cos \phi \sin \phi \rangle $$
*Explanation: This cross product calculation is more involved. Be careful with signs and trigonometric identities.*

**Step 5: Calculate the magnitude of the normal vector, $|\mathbf{n}| = |\mathbf{r}_\phi \times \mathbf{r}_\theta|$.**
$$ |\mathbf{n}| = \sqrt{(R^2 \sin^2 \phi \cos \theta)^2 + (R^2 \sin^2 \phi \sin \theta)^2 + (R^2 \cos \phi \sin \phi)^2} $$
$$ = \sqrt{R^4 \sin^4 \phi \cos^2 \theta + R^4 \sin^4 \phi \sin^2 \theta + R^4 \cos^2 \phi \sin^2 \phi} $$
Factor out $R^4 \sin^4 \phi$ from the first two terms:
$$ = \sqrt{R^4 \sin^4 \phi (\cos^2 \theta + \sin^2 \theta) + R^4 \cos^2 \phi \sin^2 \phi} $$
$$ = \sqrt{R^4 \sin^4 \phi + R^4 \cos^2 \phi \sin^2 \phi} $$
Factor out $R^4 \sin^2 \phi$:
$$ = \sqrt{R^4 \sin^2 \phi (\sin^2 \phi + \cos^2 \phi)} $$
$$ = \sqrt{R^4 \sin^2 \phi (1)} $$
$$ = \sqrt{R^4 \sin^2 \phi} $$
$$ = R^2 |\sin \phi| $$
Since $0 \le \phi \le \pi/3$, $\sin \phi \ge 0$, so $|\sin \phi| = \sin \phi$.
$$ |\mathbf{n}| = R^2 \sin \phi $$
*Explanation: This is the most complex algebraic step. Careful factoring and use of $\sin^2 x + \cos^2 x = 1$ is crucial. The result $R^2 \sin \phi$ is a well-known surface element for a sphere in spherical coordinates.*

**Step 6: Set up and evaluate the double integral for the surface area.**
$$ A(S) = \iint_D |\mathbf{r}_\phi \times \mathbf{r}_\theta| \, d\phi \, d\theta $$
$$ A(S) = \int_0^{2\pi} \int_0^{\pi/3} R^2 \sin \phi \, d\phi \, d\theta $$
First, integrate with respect to $\phi$:
$$ \int_0^{\pi/3} R^2 \sin \phi \, d\phi = R^2 [-\cos \phi]_0^{\pi/3} $$
$$ = R^2 (-\cos(\pi/3) - (-\cos(0))) $$
$$ = R^2 (-1/2 - (-1)) = R^2 (-1/2 + 1) = R^2 (1/2) = \frac{R^2}{2} $$
Now, integrate with respect to $\theta$:
$$ A(S) = \int_0^{2\pi} \frac{R^2}{2} \, d\theta = \frac{R^2}{2} [\theta]_0^{2\pi} $$
$$ = \frac{R^2}{2} (2\pi - 0) = \pi R^2 $$
*Explanation: Integrate the simplified surface element over the domain. The result is the known formula for the surface area of a spherical cap where height $h = R - R\cos(\pi/3) = R - R/2 = R/2$, which is $2\pi R h = 2\pi R (R/2) = \pi R^2$.*

**Final Answer:**
The surface area of the spherical cap is $\boxed{\pi R^2}$.

*Reflection:* This example highlights the power of choosing the right parametrization (spherical coordinates for a sphere). The calculation of the normal vector's magnitude can be very involved algebraically, but often simplifies nicely using trigonometric identities. The final result matches a known geometric formula, providing a good check.

## 6. Common mistakes and traps

Students often stumble in specific areas when working with parametric surfaces, tangent planes, and surface area. Here are some common traps:

1.  **Forgetting to evaluate partial derivatives at the specific point for tangent planes:** The normal vector $\mathbf{n} = \mathbf{r}_u \times \mathbf{r}_v$ is a function of $u$ and $v$. For the tangent plane at a *specific point* $P_0$, you must first find the $(u_0, v_0)$ values corresponding to $P_0$, and *then* evaluate $\mathbf{r}_u(u_0,v_0)$ and $\mathbf{r}_v(u_0,v_0)$ before computing their cross product.
2.  **Incorrectly calculating cross products:** This is a fundamental vector operation, but errors in signs or component order are frequent. Double-check your cross product calculations, perhaps by using the determinant formula.
3.  **Forgetting the magnitude for surface area:** The surface area element is $dS = |\mathbf{r}_u \times \mathbf{r}_v| \, du \, dv$. It's the *magnitude* of the normal vector (scaled by $du dv$), not the normal vector itself. Area is a scalar quantity.
4.  **Errors in trigonometric identities or algebraic simplification:** Especially when dealing with spheres or cones, the magnitude of the normal vector often involves square roots of trigonometric expressions. Mistakes in applying $\sin^2 x + \cos^2 x = 1$ or factoring can lead to incorrect integrands.
5.  **Incorrectly determining the domain of integration $D$:** The limits for $u$ and $v$ in the double integral must accurately reflect the portion of the surface whose area you're trying to find. Carefully translate geometric bounds (e.g., "above $z=R/2$", "between $x=0$ and $x=1$") into parameter bounds.
6.  **Confusing the parameters $(u,v)$ with Cartesian coordinates $(x,y,z)$:** Remember that $u$ and $v$ are independent variables that *define* $x,y,z$. They are not necessarily $x$ and $y$. This distinction is crucial when calculating partial derivatives and setting up integral limits.

## 7. Textbook-precise explanation

A **parametric surface** $S$ is the image of a continuous vector-valued function $\mathbf{r}(u,v)$ defined on a region $D$ in the $uv$-plane.
$$ \mathbf{r}(u,v) = x(u,v)\mathbf{i} + y(u,v)\mathbf{j} + z(u,v)\mathbf{k} $$
where $(u,v) \in D$.

A surface $S$ is called **smooth** if the partial derivatives $\mathbf{r}_u = \frac{\partial \mathbf{r}}{\partial u}$ and $\mathbf{r}_v = \frac{\partial \mathbf{r}}{\partial v}$ are continuous and the normal vector $\mathbf{n} = \mathbf{r}_u \times \mathbf{r}_v$ is non-zero at every point $(u,v)$ in the interior of $D$. The vectors $\mathbf{r}_u$ and $\mathbf{r}_v$ are tangent to the grid curves on the surface where $v$ or $u$ is held constant, respectively.

At a point $P_0 = \mathbf{r}(u_0,v_0)$ on a smooth parametric surface, the **tangent plane** is the plane that passes through $P_0$ and is orthogonal to the normal vector $\mathbf{n}(u_0,v_0) = \mathbf{r}_u(u_0,v_0) \times \mathbf{r}_v(u_0,v_0)$. If $\mathbf{n}(u_0,v_0) = \langle a,b,c \rangle$, then the equation of the tangent plane is:
$$ a(x-x_0) + b(y-y_0) + c(z-z_0) = 0 $$

The **surface area** of a smooth parametric surface $S$ defined by $\mathbf{r}(u,v)$ over a domain $D$ is given by the double integral of the magnitude of the normal vector:
$$ A(S) = \iint_D |\mathbf{r}_u \times \mathbf{r}_v| \, dA $$
where $dA$ can be $du \, dv$ or $dv \, du$. The quantity $dS = |\mathbf{r}_u \times \mathbf{r}_v| \, du \, dv$ is known as the **surface area element**.

This definition and formulas are standard in advanced calculus textbooks. For instance, see **Stewart, Calculus, 9e, Chapter 15.6, "Parametric Surfaces and Their Areas."**

## 8. ASCII diagrams

Here's an ASCII diagram illustrating a parametric surface, its grid curves, tangent vectors, and the normal vector.

```text
       Z
       |
       |     . P(x,y,z)
       |    /| \
       |   / |  \
       |  /  |   \   <- Tangent plane at P
       | /   |    \
       |/    |     \
      /------|-------\
     /       |        \
    /        |         \
   /         |          \
  /          |           \
 /___________|____________\  Surface S
(u,v) in D  /
           /
          /
         /
        Y
       /
      /
     X

At point P on the surface:
  
      ^ n (normal vector, perpendicular to surface)
      |
      |   /---> r_v (tangent vector along v-grid curve)
      |  /
      | /
      |/
      * P
     /|
    / |
   /  v
  r_u (tangent vector along u-grid curve)

This diagram shows:
- A curved surface S in 3D space.
- A point P on the surface, corresponding to (u,v) in the parameter domain D.
- Two tangent vectors, r_u and r_v, which lie in the tangent plane at P.
  - r_u is tangent to the curve where v is constant.
  - r_v is tangent to the curve where u is constant.
- The normal vector n, which is the cross product of r_u and r_v (n = r_u x r_v),
  and is perpendicular to the tangent plane at P.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Imagine you're trying to measure the surface area of a crumpled sheet. You're using a tiny, flexible measuring tape.
    *   **R**ubber sheet: $\mathbf{r}(u,v)$ is your flexible sheet.
    *   **RU**b your fingers along one direction: $\mathbf{r}_u$ is a tangent vector.
    *   **RV**b your fingers along the other direction: $\mathbf{r}_v$ is the other tangent vector.
    *   **RUxRV** (R-U-cross-R-V) gives you the **N**ormal vector (imagine pushing your fingers together to pop out a thumb).
    *   **Magnitude of RUxRV** is how much a tiny square on your original rubber sheet got stretched into a tiny parallelogram on the crumpled sheet. This is your **dS** (differential Surface area).
    *   **Integrate dS** over the whole sheet to get the total area.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Parametric Surface:** $\mathbf{r}(u,v) = \langle x(u,v), y(u,v), z(u,v) \rangle$
    *   **Normal Vector:** $\mathbf{n} = \mathbf{r}_u \times \mathbf{r}_v$ (used for tangent planes)
    *   **Surface Area Element:** $dS = |\mathbf{r}_u \times \mathbf{r}_v| \, du \, dv$ (used for surface area integrals)

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** After 1 day. Re-derive the formulas and work through one easy example.
    *   **Review 2:** After 3 days. Work through a medium example, focusing on the cross product and magnitude steps.
    *   **Review 3:** After 7 days. Work through a hard example, paying attention to setting up the integration limits.
    *   **Review 4:** After 16 days. Explain the concepts in your own words to an imaginary friend, then solve a new problem.
    *   **Review 5:** After 35 days. Attempt a comprehensive problem that requires both tangent plane and surface area calculations.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the formulas, you can always rebuild them:
    *   **Parametric Surface:** Start with the idea of a 2D domain $(u,v)$ mapping to 3D space $(x,y,z)$. This naturally leads to $\mathbf{r}(u,v) = \langle x(u,v), y(u,v), z(u,v) \rangle$.
    *   **Tangent Vectors:** If you fix $v$, you get a curve in $u$. The tangent to this curve is $\frac{d\mathbf{r}}{du} = \mathbf{r}_u$. Similarly for $\mathbf{r}_v$.
    *   **Normal Vector:** You need a vector perpendicular to the surface. Since $\mathbf{r}_u$ and $\mathbf{r}_v$ lie in the tangent plane, their cross product $\mathbf{r}_u \times \mathbf{r}_v$ will be perpendicular to both, and thus normal to the plane.
    *   **Tangent Plane Equation:** A plane is defined by a point and a normal vector. You have the point $\mathbf{r}(u_0,v_0)$ and the normal $\mathbf{n}$. Use the standard formula $a(x-x_0) + b(y-y_0) + c(z-z_0) = 0$.
    *   **Surface Area Element:** Consider an infinitesimal rectangle $du \times dv$ in the $uv$-plane. When mapped to the surface, it becomes an infinitesimal parallelogram with sides $\mathbf{r}_u \, du$ and $\mathbf{r}_v \, dv$. The area of a parallelogram formed by vectors $\mathbf{A}$ and $\mathbf{B}$ is $|\mathbf{A} \times \mathbf{B}|$. So, the area element $dS = |(\mathbf{r}_u \, du) \times (\mathbf{r}_v \, dv)| = |\mathbf{r}_u \times \mathbf{r}_v| \, du \, dv$.
    *   **Total Surface Area:** To get the total area, sum up all these infinitesimal areas using a double integral: $\iint_D dS$.

## 10. Connections — what this leads to

Understanding parametric surfaces, tangent planes, and surface area is a cornerstone for many advanced topics in multivariable calculus, differential geometry, and applied mathematics.

*   **Surface Integrals:** This is the immediate next step. Just as line integrals integrate functions along curves, surface integrals integrate functions (scalar fields or vector fields) over surfaces.
    *   **Scalar Surface Integrals:** Used to calculate properties like the mass of a surface (if density is given), center of mass, or moment of inertia. The formula is $\iint_S f(x,y,z) \, dS$, where $dS = |\mathbf{r}_u \times \mathbf{r}_v| \, du \, dv$.
    *   **Vector Surface Integrals (Flux Integrals):** Used to calculate the flux of a vector field across a surface (e.g., fluid flow, electric field flux, heat flow). The formula is $\iint_S \mathbf{F} \cdot d\mathbf{S} = \iint_D \mathbf{F}(\mathbf{r}(u,v)) \cdot (\mathbf{r}_u \times \mathbf{r}_v) \, du \, dv$. The normal vector $\mathbf{r}_u \times \mathbf{r}_v$ determines the orientation of the surface.

*   **Stokes' Theorem:** This fundamental theorem relates a line integral around a closed curve to a surface integral over any surface bounded by that curve. It heavily relies on the concept of surface orientation determined by the normal vector.

*   **Gauss's Divergence Theorem:** This theorem relates a surface integral over a closed surface to a triple integral over the solid region enclosed by the surface. Again, the surface integral component requires a deep understanding of surface parameterization and normal vectors.

*   **Differential Geometry:** This entire field is built upon the concepts introduced here. Parametric surfaces are the basic objects of study. Concepts like the **First Fundamental Form** ($E du^2 + 2F du dv + G dv^2$) are directly related to the surface area element. The magnitude $|\mathbf{r}_u \times \mathbf{r}_v|$ is actually $\sqrt{EG-F^2}$ where $E=|\mathbf{r}_u|^2$, $G=|\mathbf{r}_v|^2$, and $F=\mathbf{r}_u \cdot \mathbf{r}_v$. This leads to the study of curvature, geodesics, and other intrinsic properties of surfaces.

*   **Manifold Theory:** In higher mathematics, surfaces are examples of 2-dimensional manifolds. The ideas of local parameterization and tangent spaces generalize to higher dimensions, forming the basis of differential manifolds, crucial in general relativity and advanced physics.

*   **Numerical Methods:** For complex surfaces that cannot be integrated analytically, numerical methods (like finite element analysis) discretize the surface into small elements. The area of these elements, and properties like their normal vectors, are calculated using principles derived from parametric surface theory.

## 11. Self-check questions

1.  Consider the surface defined by $\mathbf{r}(u,v) = \langle u \cos v, u \sin v, v \rangle$ for $0 \le u \le 2$ and $0 \le v \le \pi$.
    a.  Describe the shape of this surface. What happens when $u=0$?
    b.  Find the equation of the tangent plane at the point where $u=1$ and $v=\pi/2$.

2.  Parametrize the portion of the plane $x+2y+3z=6$ that lies in the first octant (where $x,y,z \ge 0$). Then, calculate its surface area using the parametric surface formula.

3.  Find the surface area of the part of the sphere $x^2+y^2+z^2=4$ that lies inside the cylinder $x^2+y^2=1$.

4.  A surface is given by $\mathbf{r}(u,v) = \langle u, v^2, u+v \rangle$.
    a.  Calculate the normal vector $\mathbf{n}(u,v)$.
    b.  Is this surface smooth at all points? If not, identify where it might not be smooth.
    c.  Find the surface area of the part of the surface where $0 \le u \le 1$ and $0 \le v \le 1$.

5.  Consider a torus (doughnut shape) parametrized by:
    $\mathbf{r}(u,v) = \langle (R+r\cos u)\cos v, (R+r\cos u)\sin v, r\sin u \rangle$
    where $0 \le u \le 2\pi$