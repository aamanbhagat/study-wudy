## 1. What it is — in plain English

Imagine you're trying to understand how water flows in a river, or how air moves around an airplane wing. It's a complex dance of countless tiny particles. To make sense of it, we need tools that simplify this motion. That's where "stream function" and "velocity potential" come in.

Think of a "stream function" like the contour lines on a topographic map, but for fluid flow. On a regular map, contour lines connect points of the same elevation. If you drop a ball on a contour line, it won't roll along that line; it will roll *perpendicular* to it, downhill. For a stream function, the lines connect points where the fluid flow is "similar" in a specific way. If you imagine a tiny fluid particle, it will always travel *along* these stream function lines. These lines are called "streamlines," and they show the exact path a fluid particle would take.

Now, think of "velocity potential" like a hidden energy landscape that drives the fluid. Imagine a surface, and the fluid always wants to flow from higher points on this surface to lower points, much like water flowing downhill. The "steepness" and "direction" of this slope at any point tell you how fast and in what direction the fluid is moving. It's a way to describe the flow using a single scalar value (just a number) at each point, rather than a vector (direction and magnitude).

In essence, both are clever mathematical shortcuts. The stream function helps us visualize the paths fluid particles take, especially in 2D, by drawing lines that the fluid never crosses. The velocity potential helps us describe the *cause* of the flow, particularly when the fluid isn't swirling or rotating, allowing us to find the velocity by simply measuring the "slope" of this potential landscape.

## 2. Why it matters — real-world applications

These concepts are foundational in fluid dynamics and have profound implications across various engineering and scientific disciplines, especially when dealing with "ideal" (inviscid, incompressible, irrotational) fluid flows.

1.  **Aerodynamic Design (Aerospace):** When designing airfoils (like airplane wings or rocket fins), engineers often start with ideal fluid flow models to get a first approximation of lift and drag. The stream function and velocity potential allow for elegant mathematical solutions, including the use of complex analysis and conformal mapping, to predict how air flows around these shapes. This helps determine optimal wing shapes for efficiency and performance, reducing turbulence and improving lift-to-drag ratios. Companies like Boeing and SpaceX use advanced computational fluid dynamics (CFD) that build upon these fundamental principles, even when accounting for real-world complexities like viscosity.

2.  **Groundwater Hydrology and Seepage Analysis:** The flow of water through porous media (like soil or rock) in aquifers or under dams can often be modeled as potential flow. The velocity potential here represents the hydraulic head (a measure of fluid energy). Understanding the stream function helps visualize the paths groundwater takes, which is crucial for predicting pollutant transport, designing effective drainage systems, or assessing the stability of earth structures like levees, where seepage could lead to failure. Environmental engineering firms and geological survey agencies rely on these models.

3.  **Electrostatics and Heat Conduction (Physics Analogy):** While not direct fluid applications, the mathematical framework for velocity potential (Laplace's equation) is identical to that for electric potential in electrostatics or temperature distribution in steady-state heat conduction. This means that solutions derived for fluid flow can be directly applied or provide strong intuition for problems in these other fields. For example, understanding how an electric field lines (analogous to streamlines) behave around a charged object is directly paralleled by understanding fluid flow around an object. This cross-disciplinary utility is a testament to the power of these mathematical tools.

4.  **Oceanography and Weather Prediction:** Large-scale ocean currents and atmospheric flows can, under certain simplifying assumptions, be analyzed using potential flow concepts. While the real world is far more complex (viscosity, Coriolis effect, density stratification), these foundational models provide a baseline understanding of how large masses of fluid move, especially in regions where rotational effects are less dominant. This helps in understanding phenomena like ocean gyres or large-scale atmospheric pressure systems, contributing to climate modeling and weather forecasting by agencies like NOAA.

## 3. Prerequisites — what you must know first

To fully grasp stream functions and velocity potentials, you need a solid foundation in several areas of calculus and basic fluid mechanics. If any of these concepts are unfamiliar, pause and review them thoroughly.

*   **Vector Calculus:**
    *   **Partial Derivatives:** How to differentiate a function with respect to one variable while treating others as constants. Essential for defining components of velocity and for the operators below.
    *   **Gradient ($\nabla f$ or $\text{grad } f$):** A vector that points in the direction of the greatest rate of increase of a scalar function, and its magnitude is that maximum rate. Crucial for defining velocity potential.
    *   **Divergence ($\nabla \cdot \vec{v}$ or $\text{div } \vec{v}$):** A scalar measure of the "outward flux" of a vector field from an infinitesimal volume; represents how much a fluid is expanding or compressing at a point. Essential for the continuity equation and incompressibility.
    *   **Curl ($\nabla \times \vec{v}$ or $\text{curl } \vec{v}$):** A vector measure of the "rotation" of a vector field at a point. Crucial for defining irrotational flow and velocity potential.
    *   **Line Integrals:** How to integrate a function along a curve. Used in deriving potential functions.
    *   **Fundamental Theorem of Line Integrals:** Relates line integrals of gradient fields to the difference in the scalar function at the endpoints.

*   **Basic Fluid Mechanics:**
    *   **Velocity Field ($\vec{v}$):** A vector field that describes the velocity of fluid particles at every point in space and time, $\vec{v}(x,y,z,t) = u\hat{i} + v\hat{j} + w\hat{k}$.
    *   **Steady Flow:** Flow where fluid properties at any point in space do not change with time, i.e., $\partial/\partial t = 0$.
    *   **Incompressible Flow:** Flow where the fluid density remains constant, meaning the fluid volume does not change. Mathematically, this is expressed by the **Continuity Equation** for incompressible flow: $\nabla \cdot \vec{v} = 0$.
    *   **Irrotational Flow:** Flow where fluid particles do not rotate about their own axis. Mathematically, this means the **curl of the velocity field is zero**: $\nabla \times \vec{v} = \vec{0}$.
    *   **Ideal Fluid:** A hypothetical fluid that is both incompressible and inviscid (has no viscosity). Potential flow theory primarily applies to ideal fluids.
    *   **Streamlines:** Lines that are everywhere tangent to the instantaneous velocity vector of the fluid. They show the path a fluid particle would take in steady flow.

## 4. The core idea — step by step

Let's break down these concepts, building from the fundamental properties of fluid flow. We'll primarily focus on 2D, steady flow for simplicity, as this is where stream functions are most naturally introduced and where the relationship between stream function and velocity potential is most elegant.

### Step 1: Describing Fluid Motion with a Velocity Field

**Plain English:** To describe how a fluid moves, we assign a velocity vector (speed and direction) to every tiny point within the fluid at any given moment. This collection of vectors forms a "velocity field."

**Concrete Example:** Imagine a river flowing. At the center, the water might be moving fast downstream. Near the banks, it's slower. Near a rock, it might swirl. A velocity field captures all these individual velocities. In a 2D plane (like looking at the river from above), we'd describe the velocity at any point $(x,y)$ as $\vec{v}(x,y) = u(x,y)\hat{i} + v(x,y)\hat{j}$, where $u$ is the velocity component in the $x$-direction and $v$ is in the $y$-direction.

**Formal/Mathematical Version:** The velocity field $\vec{v}$ is a vector function of position and time:
$$ \vec{v}(x,y,z,t) = u(x,y,z,t)\hat{i} + v(x,y,z,t)\hat{j} + w(x,y,z,t)\hat{k} $$
For 2D steady flow, this simplifies to:
$$ \vec{v}(x,y) = u(x,y)\hat{i} + v(x,y)\hat{j} $$

**What could go wrong:** Assuming the flow is steady when it's actually changing over time (e.g., waves in the ocean). This would mean $u, v, w$ are also functions of $t$, making the analysis much harder.

### Step 2: The Incompressibility Condition (Conservation of Mass)

**Plain English:** Most liquids, and even gases at low speeds, behave as if they can't be squished or expanded. If fluid flows into a region, the same amount must flow out, or it would either pile up (compress) or leave a void (expand). This is a statement of mass conservation for a constant-density fluid.

**Concrete Example:** If water flows into a pipe at a certain rate, it must flow out at the same rate, assuming the pipe doesn't store water or leak. If you have a sponge full of water, squeezing it makes water come out; the water itself doesn't shrink.

**Formal/Mathematical Version:** For an incompressible fluid, the divergence of the velocity field is zero. This is the continuity equation for incompressible flow:
$$ \nabla \cdot \vec{v} = 0 $$
In Cartesian coordinates, for 2D flow ($w=0$):
$$ \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0 $$
For 3D flow:
$$ \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z} = 0 $$

**What could go wrong:** Applying this to compressible flows (like air at high speeds, e.g., supersonic jets) where density changes significantly. The full continuity equation for compressible flow is $\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho \vec{v}) = 0$, which is more complex.

### Step 3: The Irrotational Flow Condition

**Plain English:** Imagine a tiny paddlewheel placed in the fluid. If the fluid is irrotational, this paddlewheel would simply be pushed along by the flow without spinning. It means there's no net "swirling" or rotation of the fluid elements themselves. The fluid might curve, but the individual particles don't rotate.

**Concrete Example:** Water flowing smoothly in a straight channel is irrotational. Water flowing around a bend might still be irrotational if the velocity profile is such that there's no net spin. However, water near a spinning propeller or in a strong vortex (like a whirlpool) *is* rotational.

**Formal/Mathematical Version:** For irrotational flow, the curl of the velocity field is zero:
$$ \nabla \times \vec{v} = \vec{0} $$
In 2D Cartesian coordinates, for flow in the $xy$-plane ($w=0$, and $\vec{v}$ has no $z$-component), the curl only has a $z$-component (often called the vorticity component $\omega_z$):
$$ \nabla \times \vec{v} = \left( \frac{\partial w}{\partial y} - \frac{\partial v}{\partial z} \right)\hat{i} + \left( \frac{\partial u}{\partial z} - \frac{\partial w}{\partial x} \right)\hat{j} + \left( \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} \right)\hat{k} $$
Since $w=0$ and flow is 2D, $\partial/\partial z = 0$, so this simplifies to:
$$ \nabla \times \vec{v} = \left( \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} \right)\hat{k} $$
So, for 2D irrotational flow, the condition is:
$$ \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = 0 \quad \text{or} \quad \frac{\partial v}{\partial x} = \frac{\partial u}{\partial y} $$

**What could go wrong:** Assuming irrotationality when there are significant viscous effects (like near a solid boundary, where friction causes shear and rotation) or strong vortices. Most real-world flows have some rotation.

### Step 4: The Velocity Potential ($\phi$) for Irrotational Flow

**Plain English:** If a fluid flow is irrotational, it's like a special kind of force field where you can define a "potential energy" landscape. The fluid's velocity is simply the "steepness" and "downhill direction" of this landscape. We call this scalar function the "velocity potential," $\phi$.

**Concrete Example:** Imagine a smooth hill. If you roll a ball, its velocity is determined by the slope of the hill. If the hill is smooth (no sharp edges or swirling valleys), you can define a single height value at every point. Similarly, if fluid flow is irrotational, we can define a single scalar value $\phi$ at every point, and the fluid's velocity components are found by taking partial derivatives of $\phi$.

**Formal/Mathematical Version:** A fundamental theorem of vector calculus states that if a vector field $\vec{F}$ has zero curl ($\nabla \times \vec{F} = \vec{0}$), then it can be expressed as the gradient of a scalar potential function, $\vec{F} = \nabla f$. Applying this to our velocity field $\vec{v}$:
If $\nabla \times \vec{v} = \vec{0}$, then there exists a scalar function $\phi(x,y,z,t)$ such that:
$$ \vec{v} = \nabla \phi $$
In Cartesian coordinates, this means:
$$ u = \frac{\partial \phi}{\partial x}, \quad v = \frac{\partial \phi}{\partial y}, \quad w = \frac{\partial \phi}{\partial z} $$
If the flow is *also* incompressible ($\nabla \cdot \vec{v} = 0$), we can substitute $\vec{v} = \nabla \phi$:
$$ \nabla \cdot (\nabla \phi) = 0 $$
This is Laplace's equation:
$$ \nabla^2 \phi = 0 \quad \text{or} \quad \frac{\partial^2 \phi}{\partial x^2} + \frac{\partial^2 \phi}{\partial y^2} + \frac{\partial^2 \phi}{\partial z^2} = 0 $$
For 2D flow:
$$ \frac{\partial^2 \phi}{\partial x^2} + \frac{\partial^2 \phi}{\partial y^2} = 0 $$
Solutions to Laplace's equation are called **harmonic functions**. This is incredibly powerful because it turns a vector problem into a scalar problem, and Laplace's equation is one of the most studied PDEs in physics.

**What could go wrong:** Trying to define a velocity potential for a rotational flow. If $\nabla \times \vec{v} \neq \vec{0}$, then no such scalar function $\phi$ exists. It's like trying to define a single "height" for a landscape that has a perpetual whirlpool in it – it wouldn't make sense.

### Step 5: The Stream Function ($\psi$) for Incompressible 2D Flow

**Plain English:** For fluid that can't be squished (incompressible) and flows in 2D, we can draw lines that the fluid always follows. These are called streamlines. The stream function, $\psi$, is a scalar value such that its contour lines are exactly these streamlines. The value of $\psi$ between two streamlines tells you the volume flow rate (or mass flow rate) between them.

**Concrete Example:** Imagine water flowing in a wide, shallow channel. You can draw lines on the surface showing where a tiny leaf would travel. These are streamlines. If you pick two adjacent streamlines, the amount of water flowing between them per second is constant. The difference in the stream function values between these two lines tells you exactly that flow rate.

**Formal/Mathematical Version:** For 2D incompressible flow, the continuity equation is $\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0$.
This equation is satisfied automatically if we define a scalar function $\psi(x,y)$ such that:
$$ u = \frac{\partial \psi}{\partial y} \quad \text{and} \quad v = -\frac{\partial \psi}{\partial x} $$
Let's check this:
$$ \frac{\partial}{\partial x}\left(\frac{\partial \psi}{\partial y}\right) + \frac{\partial}{\partial y}\left(-\frac{\partial \psi}{\partial x}\right) = \frac{\partial^2 \psi}{\partial x \partial y} - \frac{\partial^2 \psi}{\partial y \partial x} = 0 $$
This holds true as long as $\psi$ is continuous and has continuous second partial derivatives (Schwarz's theorem).
The physical meaning: A streamline is a line along which $\psi = \text{constant}$. To show this, consider a differential displacement $d\vec{r} = dx\hat{i} + dy\hat{j}$ along a streamline. The velocity vector $\vec{v} = u\hat{i} + v\hat{j}$ is tangent to the streamline, so $\vec{v} \cdot d\vec{r} = 0$.
$$ u\,dx + v\,dy = 0 $$
From the definition of $\psi$:
$$ \left(\frac{\partial \psi}{\partial y}\right)dx + \left(-\frac{\partial \psi}{\partial x}\right)dy = 0 $$
This is exactly the total differential $d\psi = \frac{\partial \psi}{\partial x}dx + \frac{\partial \psi}{\partial y}dy = 0$ if we multiply by $-1$.
So, $d\psi = 0$ along a streamline, meaning $\psi$ is constant along a streamline.
The difference in $\psi$ between two streamlines, $\psi_2 - \psi_1$, represents the volume flow rate (per unit width perpendicular to the 2D plane) between those two streamlines.

**What could go wrong:** Trying to use this 2D stream function directly for 3D flows. While 3D stream functions exist, they are more complex (often involving two scalar functions, or defined for axisymmetric flows). The simple definition above is strictly for 2D or axisymmetric flows. Also, the choice of signs ($u = \partial \psi / \partial y$ and $v = -\partial \psi / \partial x$) is a convention; some textbooks might use the opposite, leading to a stream function that increases in the opposite direction. Always be consistent!

### Step 6: The Relationship between Velocity Potential ($\phi$) and Stream Function ($\psi$)

**Plain English:** When a flow is *both* incompressible AND irrotational (which we call "potential flow"), the velocity potential and stream function are like two sides of the same coin. Their contour lines are always perpendicular to each other, forming a grid that perfectly describes the flow.

**Concrete Example:** Imagine a map where contour lines show elevation (like $\phi$) and other lines show the path water takes downhill (like $\psi$). These two sets of lines would always cross at right angles. In potential fluid flow, the equipotential lines (constant $\phi$) and streamlines (constant $\psi$) form an orthogonal grid.

**Formal/Mathematical Version:**
For a 2D potential flow, we have:
From velocity potential:
$$ u = \frac{\partial \phi}{\partial x} \quad \text{and} \quad v = \frac{\partial \phi}{\partial y} $$
From stream function:
$$ u = \frac{\partial \psi}{\partial y} \quad \text{and} \quad v = -\frac{\partial \psi}{\partial x} $$
Equating the expressions for $u$ and $v$:
$$ \frac{\partial \phi}{\partial x} = \frac{\partial \psi}{\partial y} $$
$$ \frac{\partial \phi}{\partial y} = -\frac{\partial \psi}{\partial x} $$
These are the **Cauchy-Riemann equations**, which are fundamental in complex analysis. This means that if we define a complex potential $W(z)$ where $z = x + iy$:
$$ W(z) = \phi(x,y) + i\psi(x,y) $$
Then $W(z)$ is an analytic function of the complex variable $z$. This connection to complex analysis is incredibly powerful for solving 2D potential flow problems.
Furthermore, since both $\phi$ and $\psi$ are defined for potential flow, they both must satisfy Laplace's equation:
From irrotationality for $\psi$:
$$ \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = 0 $$
Substitute $u = \partial \psi / \partial y$ and $v = -\partial \psi / \partial x$:
$$ \frac{\partial}{\partial x}\left(-\frac{\partial \psi}{\partial x}\right) - \frac{\partial}{\partial y}\left(\frac{\partial \psi}{\partial y}\right) = 0 $$
$$ -\frac{\partial^2 \psi}{\partial x^2} - \frac{\partial^2 \psi}{\partial y^2} = 0 \quad \implies \quad \frac{\partial^2 \psi}{\partial x^2} + \frac{\partial^2 \psi}{\partial y^2} = 0 $$
So, $\nabla^2 \psi = 0$. Both $\phi$ and $\psi$ are harmonic functions. This means that for 2D potential flow, both the velocity potential and the stream function satisfy Laplace's equation.

**What could go wrong:** Assuming this elegant relationship holds for flows that are *not* potential flows (i.e., either compressible or rotational, or both). The Cauchy-Riemann equations and the direct application of complex analysis are strictly for 2D incompressible, irrotational flow.

## 5. Worked examples — multiple, with every step shown

### Example 1: Uniform Flow

**Problem:** A 2D steady flow field is given by $\vec{v} = U\hat{i}$, where $U$ is a constant positive velocity.
(a) Is this flow incompressible?
(b) Is this flow irrotational?
(c) Find the velocity potential $\phi(x,y)$.
(d) Find the stream function $\psi(x,y)$.

**Given:** $\vec{v} = U\hat{i}$, so $u = U$ and $v = 0$. $U$ is a constant.
**We want:** (a) Incompressibility check, (b) Irrotationality check, (c) $\phi(x,y)$, (d) $\psi(x,y)$.

---

**(a) Is this flow incompressible?**

*   **Step 1: Recall the incompressibility condition.**
    For 2D incompressible flow, the continuity equation states:
    $$ \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0 $$
    *This equation ensures that fluid is neither created nor destroyed, nor does its density change.*

*   **Step 2: Calculate the partial derivatives of $u$ and $v$.**
    Given $u = U$ (a constant) and $v = 0$.
    $$ \frac{\partial u}{\partial x} = \frac{\partial}{\partial x}(U) = 0 $$
    $$ \frac{\partial v}{\partial y} = \frac{\partial}{\partial y}(0) = 0 $$
    *Since $U$ is a constant, its derivative with respect to $x$ is zero. The derivative of $0$ is also zero.*

*   **Step 3: Substitute the derivatives into the continuity equation.**
    $$ 0 + 0 = 0 $$
    *The equation holds true.*

*   **Step 4: Conclude.**
    Since $\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0$, the flow is **incompressible**.
    *This makes sense: uniform flow doesn't squish or stretch the fluid.*

---

**(b) Is this flow irrotational?**

*   **Step 1: Recall the irrotationality condition.**
    For 2D irrotational flow, the $z$-component of the curl (vorticity) must be zero:
    $$ \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = 0 $$
    *This condition means that fluid particles are not rotating about their own axis.*

*   **Step 2: Calculate the required partial derivatives.**
    Given $u = U$ and $v = 0$.
    $$ \frac{\partial v}{\partial x} = \frac{\partial}{\partial x}(0) = 0 $$
    $$ \frac{\partial u}{\partial y} = \frac{\partial}{\partial y}(U) = 0 $$
    *Again, derivatives of constants are zero.*

*   **Step 3: Substitute the derivatives into the irrotationality condition.**
    $$ 0 - 0 = 0 $$
    *The equation holds true.*

*   **Step 4: Conclude.**
    Since $\frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = 0$, the flow is **irrotational**.
    *This also makes sense: uniform flow is perfectly smooth and has no swirling motion.*

---

**(c) Find the velocity potential $\phi(x,y)$.**

*   **Step 1: Recall the definition of velocity potential.**
    For irrotational flow, $\vec{v} = \nabla \phi$, which means:
    $$ u = \frac{\partial \phi}{\partial x} \quad \text{and} \quad v = \frac{\partial \phi}{\partial y} $$
    *We are looking for a scalar function $\phi$ whose partial derivatives give us the velocity components.*

*   **Step 2: Integrate the expression for $u$.**
    We have $u = U$. So,
    $$ \frac{\partial \phi}{\partial x} = U $$
    Integrate with respect to $x$:
    $$ \phi(x,y) = \int U\,dx = Ux + f(y) $$
    *When integrating a partial derivative, the "constant of integration" can be any function of the other variables (here, $y$), because its derivative with respect to $x$ would be zero.*

*   **Step 3: Differentiate $\phi$ with respect to $y$ and compare with $v$.**
    We know $v = 0$. From our expression for $\phi$:
    $$ \frac{\partial \phi}{\partial y} = \frac{\partial}{\partial y}(Ux + f(y)) = 0 + f'(y) $$
    So, $f'(y) = 0$.
    *We differentiate our partially integrated $\phi$ with respect to $y$ and set it equal to the known $v$ component.*

*   **Step 4: Integrate $f'(y)$ to find $f(y)$.**
    $$ \int f'(y)\,dy = \int 0\,dy \implies f(y) = C $$
    where $C$ is an arbitrary constant.
    *Integrating $0$ gives a constant.*

*   **Step 5: Substitute $f(y)$ back into the expression for $\phi$.**
    $$ \phi(x,y) = Ux + C $$
    *The constant $C$ is usually set to zero as it doesn't affect the velocity components (only the absolute value of potential, which is arbitrary).*

*   **Step 6: Final Answer.**
    The velocity potential is:
    $$ \boxed{\phi(x,y) = Ux} $$
    *(assuming $C=0$)*

---

**(d) Find the stream function $\psi(x,y)$.**

*   **Step 1: Recall the definition of stream function.**
    For 2D incompressible flow:
    $$ u = \frac{\partial \psi}{\partial y} \quad \text{and} \quad v = -\frac{\partial \psi}{\partial x} $$
    *We are looking for a scalar function $\psi$ whose partial derivatives give us the velocity components according to these specific sign conventions.*

*   **Step 2: Integrate the expression for $u$.**
    We have $u = U$. So,
    $$ \frac{\partial \psi}{\partial y} = U $$
    Integrate with respect to $y$:
    $$ \psi(x,y) = \int U\,dy = Uy + g(x) $$
    *Again, the "constant of integration" is a function of the other variable, $x$.*

*   **Step 3: Differentiate $\psi$ with respect to $x$ and compare with $v$.**
    We know $v = 0$. From our expression for $\psi$:
    $$ -\frac{\partial \psi}{\partial x} = -\frac{\partial}{\partial x}(Uy + g(x)) = -(0 + g'(x)) = -g'(x) $$
    So, $-g'(x) = 0$, which means $g'(x) = 0$.
    *We differentiate our partially integrated $\psi$ with respect to $x$, negate it, and set it equal to the known $v$ component.*

*   **Step 4: Integrate $g'(x)$ to find $g(x)$.**
    $$ \int g'(x)\,dx = \int 0\,dx \implies g(x) = C' $$
    where $C'$ is an arbitrary constant.
    *Integrating $0$ gives a constant.*

*   **Step 5: Substitute $g(x)$ back into the expression for $\psi$.**
    $$ \psi(x,y) = Uy + C' $$
    *The constant $C'$ is usually set to zero.*

*   **Step 6: Final Answer.**
    The stream function is:
    $$ \boxed{\psi(x,y) = Uy} $$
    *(assuming $C'=0$)*

**Reflection:** This example was straightforward because the velocity field was very simple (constant in one direction). It confirmed that uniform flow is both incompressible and irrotational, and showed the basic integration steps to find $\phi$ and $\psi$. The key takeaway is understanding the definitions and the integration process while carefully handling integration constants.

### Example 2: Source Flow

**Problem:** A 2D flow field is given by the velocity potential $\phi(r,\theta) = \frac{m}{2\pi} \ln r$, where $m$ is a constant and $(r,\theta)$ are polar coordinates.
(a) Find the velocity components $v_r$ and $v_\theta$ in polar coordinates.
(b) Find the stream function $\psi(r,\theta)$.

**Given:** $\phi(r,\theta) = \frac{m}{2\pi} \ln r$.
**We want:** (a) $v_r, v_\theta$, (b) $\psi(r,\theta)$.

---

**(a) Find the velocity components $v_r$ and $v_\theta$.**

*   **Step 1: Recall the definition of velocity potential in polar coordinates.**
    For irrotational flow, $\vec{v} = \nabla \phi$. In polar coordinates, the velocity components are given by:
    $$ v_r = \frac{\partial \phi}{\partial r} \quad \text{and} \quad v_\theta = \frac{1}{r}\frac{\partial \phi}{\partial \theta} $$
    *The radial component is the direct derivative, but the tangential component requires division by $r$ due to the nature of polar coordinate derivatives.*

*   **Step 2: Calculate the partial derivatives of $\phi$.**
    Given $\phi(r,\theta) = \frac{m}{2\pi} \ln r$.
    $$ \frac{\partial \phi}{\partial r} = \frac{\partial}{\partial r}\left(\frac{m}{2\pi} \ln r\right) = \frac{m}{2\pi} \cdot \frac{1}{r} $$
    $$ \frac{\partial \phi}{\partial \theta} = \frac{\partial}{\partial \theta}\left(\frac{m}{2\pi} \ln r\right) = 0 $$
    *The derivative of $\ln r$ with respect to $r$ is $1/r$. Since $\phi$ does not depend on $\theta$, its derivative with respect to $\theta$ is zero.*

*   **Step 3: Substitute the derivatives into the velocity component formulas.**
    $$ v_r = \frac{m}{2\pi r} $$
    $$ v_\theta = \frac{1}{r}(0) = 0 $$
    *This means the flow is purely radial, emanating outwards if $m>0$. This is characteristic of a source flow.*

*   **Step 4: Final Answer.**
    The velocity components are:
    $$ \boxed{v_r = \frac{m}{2\pi r}, \quad v_\theta = 0} $$

---

**(b) Find the stream function $\psi(r,\theta)$.**

*   **Step 1: Recall the definition of stream function in polar coordinates.**
    For 2D incompressible flow, the velocity components are given by:
    $$ v_r = \frac{1}{r}\frac{\partial \psi}{\partial \theta} \quad \text{and} \quad v_\theta = -\frac{\partial \psi}{\partial r} $$
    *These definitions ensure that the continuity equation in polar coordinates is satisfied.*

*   **Step 2: Use the expression for $v_r$ to find $\psi$.**
    We have $v_r = \frac{m}{2\pi r}$. So,
    $$ \frac{1}{r}\frac{\partial \psi}{\partial \theta} = \frac{m}{2\pi r} $$
    Multiply by $r$:
    $$ \frac{\partial \psi}{\partial \theta} = \frac{m}{2\pi} $$
    Integrate with respect to $\theta$:
    $$ \psi(r,\theta) = \int \frac{m}{2\pi}\,d\theta = \frac{m}{2\pi}\theta + f(r) $$
    *The "constant of integration" is a function of $r$.*

*   **Step 3: Use the expression for $v_\theta$ to find $f(r)$.**
    We have $v_\theta = 0$. From our expression for $\psi$:
    $$ -\frac{\partial \psi}{\partial r} = -\frac{\partial}{\partial r}\left(\frac{m}{2\pi}\theta + f(r)\right) = -(0 + f'(r)) = -f'(r) $$
    So, $-f'(r) = 0$, which means $f'(r) = 0$.
    *We differentiate our partially integrated $\psi$ with respect to $r$, negate it, and set it equal to the known $v_\theta$ component.*

*   **Step 4: Integrate $f'(r)$ to find $f(r)$.**
    $$ \int f'(r)\,dr = \int 0\,dr \implies f(r) = C $$
    where $C$ is an arbitrary constant.
    *Integrating $0$ gives a constant.*

*   **Step 5: Substitute $f(r)$ back into the expression for $\psi$.**
    $$ \psi(r,\theta) = \frac{m}{2\pi}\theta + C $$
    *The constant $C$ is usually set to zero.*

*   **Step 6: Final Answer.**
    The stream function is:
    $$ \boxed{\psi(r,\theta) = \frac{m}{2\pi}\theta} $$
    *(assuming $C=0$)*

**Reflection:** This example moved to polar coordinates, which is common in fluid mechanics for flows with radial or angular symmetry. The main challenge is remembering the correct forms of $\nabla \phi$ and the stream function definitions in polar coordinates. The result shows that streamlines for a source flow are radial lines (constant $\theta$), which makes sense, as fluid flows purely outwards from the origin.

### Example 3: Vortex Flow

**Problem:** A 2D flow field is given by the stream function $\psi(x,y) = -\frac{\Gamma}{2\pi} \ln r$, where $\Gamma$ is a constant and $r = \sqrt{x^2+y^2}$.
(a) Find the velocity components $u$ and $v$ in Cartesian coordinates.
(b) Is this flow irrotational?
(c) Find the velocity potential $\phi(x,y)$.

**Given:** $\psi(x,y) = -\frac{\Gamma}{2\pi} \ln r = -\frac{\Gamma}{4\pi} \ln(x^2+y^2)$.
**We want:** (a) $u, v$, (b) Irrotationality check, (c) $\phi(x,y)$.

---

**(a) Find the velocity components $u$ and $v$ in Cartesian coordinates.**

*   **Step 1: Recall the definition of stream function in Cartesian coordinates.**
    For 2D incompressible flow:
    $$ u = \frac{\partial \psi}{\partial y} \quad \text{and} \quad v = -\frac{\partial \psi}{\partial x} $$
    *These definitions ensure the continuity equation is satisfied.*

*   **Step 2: Calculate the partial derivatives of $\psi$.**
    It's easier to work with $\psi = -\frac{\Gamma}{4\pi} \ln(x^2+y^2)$.
    $$ \frac{\partial \psi}{\partial y} = -\frac{\Gamma}{4\pi} \frac{\partial}{\partial y}(\ln(x^2+y^2)) $$
    Using the chain rule: $\frac{\partial}{\partial y}(\ln(x^2+y^2)) = \frac{1}{x^2+y^2} \cdot (2y) = \frac{2y}{r^2}$.
    So,
    $$ u = -\frac{\Gamma}{4\pi} \frac{2y}{r^2} = -\frac{\Gamma y}{2\pi r^2} $$
    $$ -\frac{\partial \psi}{\partial x} = -\left(-\frac{\Gamma}{4\pi} \frac{\partial}{\partial x}(\ln(x^2+y^2))\right) $$
    Using the chain rule: $\frac{\partial}{\partial x}(\ln(x^2+y^2)) = \frac{1}{x^2+y^2} \cdot (2x) = \frac{2x}{r^2}$.
    So,
    $$ v = \frac{\Gamma}{4\pi} \frac{2x}{r^2} = \frac{\Gamma x}{2\pi r^2} $$
    *Careful application of the chain rule is crucial here. Remember $r^2 = x^2+y^2$.*

*   **Step 3: Final Answer.**
    The velocity components are:
    $$ \boxed{u = -\frac{\Gamma y}{2\pi r^2}, \quad v = \frac{\Gamma x}{2\pi r^2}} $$

---

**(b) Is this flow irrotational?**

*   **Step 1: Recall the irrotationality condition.**
    For 2D irrotational flow:
    $$ \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = 0 $$
    *We need to calculate the derivatives of the velocity components we just found.*

*   **Step 2: Calculate $\frac{\partial v}{\partial x}$.**
    $v = \frac{\Gamma x}{2\pi (x^2+y^2)}$. Use the quotient rule: $\frac{d}{dx}\left(\frac{f}{g}\right) = \frac{f'g - fg'}{g^2}$.
    $f = \Gamma x$, $f' = \Gamma$. $g = 2\pi(x^2+y^2)$, $g' = 2\pi(2x) = 4\pi x$.
    $$ \frac{\partial v}{\partial x} = \frac{\Gamma \cdot 2\pi(x^2+y^2) - \Gamma x \cdot 4\pi x}{(2\pi(x^2+y^2))^2} = \frac{2\pi\Gamma(x^2+y^2) - 4\pi\Gamma x^2}{4\pi^2(x^2+y^2)^2} $$
    $$ = \frac{2\pi\Gamma(y^2-x^2)}{4\pi^2(x^2+y^2)^2} = \frac{\Gamma(y^2-x^2)}{2\pi r^4} $$

*   **Step 3: Calculate $\frac{\partial u}{\partial y}$.**
    $u = -\frac{\Gamma y}{2\pi (x^2+y^2)}$. Use the quotient rule.
    $f = -\Gamma y$, $f' = -\Gamma$. $g = 2\pi(x^2+y^2)$, $g' = 2\pi(2y) = 4\pi y$.
    $$ \frac{\partial u}{\partial y} = \frac{-\Gamma \cdot 2\pi(x^2+y^2) - (-\Gamma y) \cdot 4\pi y}{(2\pi(x^2+y^2))^2} = \frac{-2\pi\Gamma(x^2+y^2) + 4\pi\Gamma y^2}{4\pi^2(x^2+y^2)^2} $$
    $$ = \frac{2\pi\Gamma(y^2-x^2)}{4\pi^2(x^2+y^2)^2} = \frac{\Gamma(y^2-x^2)}{2\pi r^4} $$

*   **Step 4: Substitute into the irrotationality condition.**
    $$ \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = \frac{\Gamma(y^2-x^2)}{2\pi r^4} - \frac{\Gamma(y^2-x^2)}{2\pi r^4} = 0 $$
    *The condition holds true.*

*   **Step 5: Conclude.**
    Since $\frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = 0$, the flow is **irrotational**.
    *This is a key characteristic of an ideal vortex: it is irrotational everywhere except at the origin ($r=0$), where the velocity becomes infinite.*

---

**(c) Find the velocity potential $\phi(x,y)$.**

*   **Step 1: Recall the definition of velocity potential.**
    For irrotational flow, $\vec{v} = \nabla \phi$:
    $$ u = \frac{\partial \phi}{\partial x} \quad \text{and} \quad v = \frac{\partial \phi}{\partial y} $$
    *We will use the velocity components found in part (a).*

*   **Step 2: Integrate the expression for $u$.**
    We have $u = -\frac{\Gamma y}{2\pi (x^2+y^2)}$.
    $$ \frac{\partial \phi}{\partial x} = -\frac{\Gamma y}{2\pi (x^2+y^2)} $$
    Integrate with respect to $x$:
    $$ \phi(x,y) = \int -\frac{\Gamma y}{2\pi (x^2+y^2)}\,dx $$
    Recall that $\int \frac{1}{a^2+x^2}\,dx = \frac{1}{a}\arctan\left(\frac{x}{a}\right)$. Here, $a=y$.
    $$ \phi(x,y) = -\frac{\Gamma y}{2\pi} \int \frac{1}{y^2+x^2}\,dx = -\frac{\Gamma y}{2\pi} \left(\frac{1}{y}\arctan\left(\frac{x}{y}\right)\right) + f(y) $$
    $$ \phi(x,y) = -\frac{\Gamma}{2\pi} \arctan\left(\frac{x}{y}\right) + f(y) $$
    *This integration requires knowledge of standard integral forms. The arctangent function is often related to angles.*

*   **Step 3: Differentiate $\phi$ with respect to $y$ and compare with $v$.**
    We have $v = \frac{\Gamma x}{2\pi (x^2+y^2)}$.
    $$ \frac{\partial \phi}{\partial y} = \frac{\partial}{\partial y}\left(-\frac{\Gamma}{2\pi} \arctan\left(\frac{x}{y}\right) + f(y)\right) $$
    Recall $\frac{d}{dy}(\arctan(\frac{x}{y})) = \frac{1}{1+(x/y)^2} \cdot (-\frac{x}{y^2}) = \frac{y^2}{y^2+x^2} \cdot (-\frac{x}{y^2}) = -\frac{x}{x^2+y^2}$.
    So,
    $$ \frac{\partial \phi}{\partial y} = -\frac{\Gamma}{2\pi} \left(-\frac{x}{x^2+y^2}\right) + f'(y) = \frac{\Gamma x}{2\pi (x^2+y^2)} + f'(y) $$
    Comparing with $v$:
    $$ \frac{\Gamma x}{2\pi (x^2+y^2)} + f'(y) = \frac{\Gamma x}{2\pi (x^2+y^2)} $$
    This implies $f'(y) = 0$.
    *This step is crucial for consistency. If $f'(y)$ wasn't zero, it would mean there's an error in the original velocity field or the integration.*

*   **Step 4: Integrate $f'(y)$ to find $f(y)$.**
    $$ \int f'(y)\,dy = \int 0\,dy \implies f(y) = C $$
    where $C$ is an arbitrary constant.

*   **Step 5: Substitute $f(y)$ back into the expression for $\phi$.**
    $$ \phi(x,y) = -\frac{\Gamma}{2\pi} \arctan\left(\frac{x}{y}\right) + C $$
    The $\arctan(x/y)$ term can be related to the polar angle $\theta$. If we define $\theta$ such that $\tan\theta = y/x$, then $\arctan(x/y) = \pi/2 - \theta$ (or similar depending on quadrant). More simply, $\arctan(x/y)$ is the angle from the positive $y$-axis to the point $(x,y)$. However, it's conventional to use $\theta$ as the angle from the positive $x$-axis. In that case, $x=r\cos\theta, y=r\sin\theta$, so $y/x = \tan\theta$. So $\arctan(y/x)=\theta$. If we use $\arctan(x/y)$, it's $\pi/2 - \theta$.
    For a vortex, the equipotential lines are radial lines (constant angle), so $\phi$ should be proportional to $\theta$.
    Let's use polar coordinates for $\phi$:
    $\phi = -\frac{\Gamma}{2\pi} \arctan\left(\frac{x}{y}\right)$.
    If $x=r\cos\theta, y=r\sin\theta$, then $\frac{x}{y} = \frac{\cos\theta}{\sin\theta} = \cot\theta$.
    So $\phi = -\frac{\Gamma}{2\pi} \arctan(\cot\theta)$.
    Since $\arctan(\cot\theta) = \frac{\pi}{2} - \theta$ (for $\theta \in (0, \pi)$), or more generally, related to $\theta$.
    A common convention for vortex potential is $\phi = -\frac{\Gamma}{2\pi} \theta$. Let's check this:
    In polar coordinates, $v_r = \frac{\partial \phi}{\partial r}$ and $v_\theta = \frac{1}{r}\frac{\partial \phi}{\partial \theta}$.
    If $\phi = -\frac{\Gamma}{2\pi}\theta$:
    $v_r = 0$.
    $v_\theta = \frac{1}{r} \frac{\partial}{\partial \theta}(-\frac{\Gamma}{2\pi}\theta) = \frac{1}{r} (-\frac{\Gamma}{2\pi}) = -\frac{\Gamma}{2\pi r}$.
    Now convert $v_r, v_\theta$ to $u,v$:
    $u = v_r \cos\theta - v_\theta \sin\theta = 0 - (-\frac{\Gamma}{2\pi r})\sin\theta = \frac{\Gamma \sin\theta}{2\pi r} = \frac{\Gamma (y/r)}{2\pi r} = \frac{\Gamma y}{2\pi r^2}$.
    $v = v_r \sin\theta + v_\theta \cos\theta = 0 + (-\frac{\Gamma}{2\pi r})\cos\theta = -\frac{\Gamma \cos\theta}{2\pi r} = -\frac{\Gamma (x/r)}{2\pi r} = -\frac{\Gamma x}{2\pi r^2}$.
    Wait, my $u$ and $v$ from part (a) were $u = -\frac{\Gamma y}{2\pi r^2}$ and $v = \frac{\Gamma x}{2\pi r^2}$.
    This means the sign convention for $\phi$ or the relationship between $\arctan(x/y)$ and $\theta$ might be different depending on the quadrant or the definition of $\theta$.
    Let's re-evaluate $\arctan(x/y)$. The angle $\theta$ is usually defined counter-clockwise from the positive $x$-axis. $\arctan(y/x)$ gives this angle, but only in $(-\pi/2, \pi/2)$.
    $\arctan(x/y)$ is the angle from the positive $y$-axis, clockwise for positive $x$.
    The standard velocity potential for a vortex is $\phi = -\frac{\Gamma}{2\pi} \theta$, where $\theta$ is the polar angle.
    Let's verify the derivatives of $\phi = -\frac{\Gamma}{2\pi}\theta$.
    $\frac{\partial \phi}{\partial x} = -\frac{\Gamma}{2\pi} \frac{\partial \theta}{\partial x}$. Since $\theta = \arctan(y/x)$,
    $\frac{\partial \theta}{\partial x} = \frac{1}{1+(y/x)^2} \cdot (-\frac{y}{x^2}) = \frac{x^2}{x^2+y^2} \cdot (-\frac{y}{x^2}) = -\frac{y}{x^2+y^2} = -\frac{y}{r^2}$.
    So, $u = \frac{\partial \phi}{\partial x} = (-\frac{\Gamma}{2\pi})(-\frac{y}{r^2}) = \frac{\Gamma y}{2\pi r^2}$.
    This value of $u$ does not match the $u$ we found in part (a). This means the flow given by $\psi = -\frac{\Gamma}{2\pi} \ln r$ is a **clockwise vortex**, while the standard $\phi = -\frac{\Gamma}{2\pi}\theta$ corresponds to a **counter-clockwise vortex**.
    Let's stick to the direct integration from $u$ and $v$ in Cartesian coordinates.
    The integration $\int -\frac{\Gamma y}{2\pi (x^2+y^2)}\,dx = -\frac{\Gamma}{2\pi} \arctan\left(\frac{x}{y}\right)$ is correct.
    So, the potential is $\phi(x,y) = -\frac{\Gamma}{2\pi} \arctan\left(\frac{x}{y}\right)$.
    This is equivalent to $\phi(x,y) = -\frac{\Gamma}{2\pi} (\frac{\pi}{2} - \theta)$ which is $\phi(x,y) = -\frac{\Gamma}{4} + \frac{\Gamma}{2\pi}\theta$.
    If we set the constant of integration to $C = -\frac{\Gamma}{4}$, then $\phi(x,y) = \frac{\Gamma}{2\pi}\theta$.
    Let's re-check the definition of the stream function for a vortex.
    A common definition for a counter-clockwise vortex is $\psi = -\frac{\Gamma}{2\pi}\ln r$.
    Then $u = \frac{\partial \psi}{\partial y} = -\frac{\Gamma}{2\pi} \frac{1}{r} \frac{\partial r}{\partial y} = -\frac{\Gamma}{2\pi r} \frac{y}{r} = -\frac{\Gamma y}{2\pi r^2}$.
    And $v = -\frac{\partial \psi}{\partial x} = -(-\frac{\Gamma}{2\pi} \frac{1}{r} \frac{\partial r}{\partial x}) = \frac{\Gamma}{2\pi r} \frac{x}{r} = \frac{\Gamma x}{2\pi r^2}$.
    These match my results from part (a). So the given $\psi$ is indeed for a counter-clockwise vortex.
    Now, let's re-derive $\phi$ using $u = \frac{\partial \phi}{\partial x}$ and $v = \frac{\partial \phi}{\partial y}$.
    $u = \frac{\Gamma y}{2\pi r^2}$. So $\frac{\partial \phi}{\partial x} = \frac{\Gamma y}{2\pi (x^2+y^2)}$.
    $\phi(x,y) = \int \frac{\Gamma y}{2\pi (x^2+y^2)}\,dx = \frac{\Gamma y}{2\pi} \int \frac{1}{x^2+y^2}\,dx = \frac{\Gamma y}{2\pi} \left(\frac{1}{y}\arctan\left(\frac{x}{y}\right)\right) + f(y) = \frac{\Gamma}{2\pi} \arctan\left(\frac{x}{y}\right) + f(y)$.
    Now use $v = \frac{\partial \phi}{\partial y}$.
    $v = \frac{\Gamma x}{2\pi r^2}$.
    $\frac{\partial \phi}{\partial y} = \frac{\partial}{\partial y}\left(\frac{\Gamma}{2\pi} \arctan\left(\frac{x}{y}\right) + f(y)\right) = \frac{\Gamma}{2\pi} \left(-\frac{x}{x^2+y^2}\right) + f'(y)$.
    So, $\frac{\Gamma x}{2\pi (x^2+y^2)} = -\frac{\Gamma x}{2\pi (x^2+y^2)} + f'(y)$.
    This implies $f'(y) = \frac{2\Gamma x}{2\pi (x^2+y^2)} = \frac{\Gamma x}{\pi r^2}$.
    This is a function of $x$ and $y$, which means $f(y)$ cannot be solely a function of $y$. This indicates an inconsistency or a misunderstanding of the integration process.

    Let's retry the integration for $\phi$ using the polar form for $u, v$ and $\phi$ directly in polar coordinates.
    We know $v_r = 0$ and $v_\theta = \frac{\Gamma}{2\pi r}$. (From $u = -\frac{\Gamma y}{2\pi r^2}$ and $v = \frac{\Gamma x}{2\pi r^2}$, we can convert to polar: $v_r = u\cos\theta + v\sin\theta = -\frac{\Gamma y}{2\pi r^2}\frac{x}{r} + \frac{\Gamma x}{2\pi r^2}\frac{y}{r} = 0$. And $v_\theta = -u\sin\theta + v\cos\theta = -(-\frac{\Gamma y}{2\pi r^2})\frac{y}{r} + (\frac{\Gamma x}{2\pi r^2})\frac{x}{r} = \frac{\Gamma (y^2+x^2)}{2\pi r^3} = \frac{\Gamma r^2}{2\pi r^3} = \frac{\Gamma}{2\pi r}$.)
    So, $v_r = 0$ and $v_\theta = \frac{\Gamma}{2\pi r}$.
    Now, for $\phi$ in polar coordinates:
    $v_r = \frac{\partial \phi}{\partial r} = 0 \implies \phi = f(\theta)$.
    $v_\theta = \frac{1}{r}\frac{\partial \phi}{\partial \theta} = \frac{\Gamma}{2\pi r}$.
    So $\frac{\partial \phi}{\partial \theta} = \frac{\Gamma}{2\pi}$.
    Integrate with respect to $\theta$:
    $\phi(\theta) = \int \frac{\Gamma}{2\pi}\,d\theta = \frac{\Gamma}{2\pi}\theta + C$.
    This is consistent. The potential for a counter-clockwise vortex is indeed $\phi = \frac{\Gamma}{2\pi}\theta$.
    The issue was trying to integrate $\frac{\partial \phi}{\partial x}$ and $\frac{\partial \phi}{\partial y}$ in Cartesian coordinates for a vortex. While mathematically possible, the resulting functions are tricky with arctan and require careful handling of multiple integration paths or direct use of polar coordinates.
    The fact that the flow is irrotational (except at the origin) means a potential function *does* exist.

*   **Step 5: Final Answer.**
    The velocity potential is:
    $$ \boxed{\phi(r,\theta) = \frac{\Gamma}{2\pi}\theta} $$
    *(assuming $C=0$)*

**Reflection:** This example was harder due to the complexity of derivatives and integrals involving $r=\sqrt{x^2+y^2}$ and the transition between Cartesian and polar coordinates. The key challenge was correctly calculating the partial derivatives for $u$ and $v$, then the second derivatives for irrotationality, and finally integrating to find $\phi$. It also highlighted the importance of choosing the right coordinate system (polar for vortex flow) and being careful with sign conventions and definitions of angles. The initial attempt to find $\phi$ in Cartesian coordinates directly from $u$ and $v$ failed because of the nature of the arctangent function and its relation to the angle $\theta$, which is best handled in polar coordinates.

### Example 4: Stagnation Point for Uniform Flow over a Source

**Problem:** A 2D flow field is formed by the superposition of a uniform flow $\vec{v}_\text{uniform} = U\hat{i}$ and a source flow with velocity potential $\phi_\text{source} = \frac{m}{2\pi}\ln r$.
(a) Find the combined velocity potential $\phi(x,y)$.
(b) Find the combined velocity components $u(x,y)$ and $v(x,y)$.
(c) Find the location(s) of any stagnation point(s), where the velocity is zero.

**Given:** $\phi_\text{uniform} = Ux$ (from Example 1), $\phi_\text{source} = \frac{m}{2\pi}\ln r$.
**We want:** (a) $\phi_\text{total}$, (b) $u, v$, (c) Stagnation point(s).

---

**(a) Find the combined velocity potential $\phi(x,y)$.**

*   **Step 1: Understand superposition.**
    For potential flows, if two flows are both irrotational and incompressible, their velocity potentials can simply be added to get the potential of the combined flow.
    *This is a powerful property of linear systems, and Laplace's equation is linear.*

*   **Step 2: Express both potentials in consistent coordinates.**
    $\phi_\text{uniform} = Ux$.
    $\phi_\text{source} = \frac{m}{2\pi}\ln r = \frac{m}{2\pi}\ln(\sqrt{x^2+y^2}) = \frac{m}{4\pi}\ln(x^2+y^2)$.
    *It's generally easier to work with Cartesian coordinates for combined flows unless there's overwhelming radial symmetry.*

*   **Step 3: Add the potentials.**
    $$ \phi(x,y) = \phi_\text{uniform} + \phi_\text{source} $$
    $$ \phi(x,y) = Ux + \frac{m}{4\pi}\ln(x^2+y^2) $$

*   **Step 4: Final Answer.**
    The combined velocity potential is:
    $$ \boxed{\phi(x,y) = Ux + \frac{m}{4\pi}\ln(x^2+y^2)} $$

---

**(b) Find the combined velocity components $u(x,y)$ and $v(x,y)$.**

*   **Step 1: Recall the definition of velocity components from potential.**
    $$ u = \frac{\partial \phi}{\partial x} \quad \text{and} \quad v = \frac{\partial \phi}{\partial y} $$
    *We will differentiate the combined potential found in part (a).*

*   **Step 2: Calculate $u = \frac{\partial \phi}{\partial x}$.**
    $$ u = \frac{\partial}{\partial x}\left(Ux + \frac{m}{4\pi}\ln(x^2+y^2)\right) $$
    $$ u = U + \frac{m}{4\pi} \frac{1}{x^2+y^2} (2x) $$
    $$ u = U + \frac{mx}{2\pi(x^2+y^2)} $$

*   **Step 3: Calculate $v = \frac{\partial \phi}{\partial y}$.**
    $$ v = \frac{\partial}{\partial y}\left(Ux + \frac{m}{4