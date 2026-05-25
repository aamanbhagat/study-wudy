## What it is
Potential flow is an idealized mathematical model of fluid motion that assumes the fluid is **inviscid** (has zero viscosity, meaning no internal friction) and **irrotational** (the fluid parcels do not rotate). These two simplifying assumptions allow the entire velocity field of the fluid to be described by the gradient of a single scalar function, the velocity potential $\phi$.

## Why it matters
This model provides the foundational theory for aerodynamics, allowing us to calculate the lift on an airfoil. Although it incorrectly predicts zero drag (d'Alembert's paradox), it gives a remarkably accurate picture of the pressure distribution and lift on streamlined bodies away from the surface boundary layer. The governing equation, Laplace's equation, appears everywhere in physics and engineering, from electrostatics to heat transfer, so mastering the techniques here pays dividends across multiple fields.

## When to study it
You must have a firm grasp of the following before proceeding:
*   **Vector Calculus:** Specifically, the gradient ($\nabla$), divergence ($\nabla \cdot$), and curl ($\nabla \times$) operators in Cartesian and cylindrical coordinates.
*   **Basic Fluid Kinematics:** Understand what a velocity field $\vec{u}(x, y, z, t)$ represents and the concept of streamlines.
*   **Conservation Laws:** You must understand the derivation and meaning of the continuity equation for an incompressible fluid, $\nabla \cdot \vec{u} = 0$.

If any of these are weak, pause and review them. The derivations that follow will be opaque otherwise.

## How to study it (step by step)
1.  **Grasp Irrotationality.** Start with the definition of vorticity, $\vec{\omega} = \nabla \times \vec{u}$. For an irrotational flow, $\vec{\omega} = \vec{0}$. Convince yourself that if a vector field is the gradient of some scalar function, its curl is identically zero. That is, prove $\nabla \times (\nabla \phi) = 0$ for any well-behaved scalar function $\phi$.
2.  **Define the Velocity Potential.** Since the flow is irrotational, we know a scalar potential $\phi$ must exist such that $\vec{u} = \nabla \phi$. This is the central definition. Write out the velocity components in Cartesian coordinates: $u = \frac{\partial \phi}{\partial x}$, $v = \frac{\partial \phi}{\partial y}$, $w = \frac{\partial \phi}{\partial z}$.
3.  **Derive the Governing Equation.** Take the definition from step 2, $\vec{u} = \nabla \phi$, and substitute it into the continuity equation for an incompressible fluid, $\nabla \cdot \vec{u} = 0$. This immediately yields the governing equation for potential flow: $\nabla \cdot (\nabla \phi) = \nabla^2 \phi = 0$. Recognize this as Laplace's equation.
4.  **Learn the Building Blocks.** Study the three fundamental potential flows. For each, write down its potential function $\phi$ and derive its velocity field $\vec{u}$.
    *   **Uniform Flow:** $\phi(x,y) = U x \cos\alpha + U y \sin\alpha$
    *   **Source/Sink:** $\phi(r, \theta) = \frac{m}{2\pi} \ln r$ (for a source, $m>0$; for a sink, $m<0$)
    *   **Vortex:** $\phi(r, \theta) = \frac{\Gamma}{2\pi} \theta$
5.  **Master Superposition.** Laplace's equation is linear. This means if $\phi_1$ and $\phi_2$ are solutions, then $\phi_{total} = c_1 \phi_1 + c_2 \phi_2$ is also a solution. Solve a simple problem: add a uniform flow ($\phi_1 = U x$) and a source at the origin ($\phi_2 = \frac{m}{2\pi} \ln \sqrt{x^2+y^2}$). Find the velocity field and locate the point where $\vec{u} = 0$ (the stagnation point).
6.  **Build a Cylinder.** The classic example is flow around a cylinder. This is formed by superimposing a uniform flow with a "doublet" (a source and sink pair brought infinitesimally close). The total potential is $\phi = U r \cos\theta + \frac{U R^2}{r} \cos\theta$. Work through the derivation of the velocity components on the surface of the cylinder ($r=R$) and use Bernoulli's equation to find the pressure.

## Key ideas, with intuition
1.  **Irrotationality means "No Local Spin".** Imagine a tiny paddlewheel placed in the flow. If the flow is irrotational, the paddlewheel will move along with the fluid but will not spin about its own axis. This is why we can use a potential. A flow with "hills" and "valleys" (a potential field) can't have whirlpools; water just flows downhill.
    $$ \nabla \times \vec{u} = \vec{0} $$
2.  **The Velocity Potential $\phi$ is a "Height Map" for Velocity.** The velocity vector $\vec{u}$ always points in the direction of the steepest "downhill" slope of $\phi$. The magnitude of the velocity is proportional to the steepness of that slope. This reduces the complexity of a 3-component vector field $\vec{u}$ to a single scalar field $\phi$.
    $$ \vec{u} = \nabla \phi $$
3.  **Incompressibility + Irrotationality = Laplace's Equation.** The two core physical assumptions combine to produce a single, powerful governing equation. Incompressibility ($\nabla \cdot \vec{u} = 0$) means "what flows in must flow out". Irrotationality ($\vec{u} = \nabla \phi$) provides the potential. Combining them gives the condition that the potential field has zero net curvature, which is exactly what Laplace's equation describes.
    $$ \nabla^2 \phi = \frac{\partial^2 \phi}{\partial x^2} + \frac{\partial^2 \phi}{\partial y^2} + \frac{\partial^2 \phi}{\partial z^2} = 0 $$
4.  **Superposition is a "Lego Block" Principle.** Because $\nabla^2$ is a linear operator, we can add simple solutions to create more complex and physically interesting ones. We can place sources, sinks, and vortices into a uniform flow to "sculpt" the flow around desired shapes. A uniform flow + a source creates a semi-infinite body. A uniform flow + a doublet creates a cylinder. A uniform flow + a doublet + a vortex creates a spinning, lifting cylinder.

## Worked example
**Problem:** Model the 2D flow around a cylinder of radius $R$ by superimposing a uniform flow of speed $U$ in the positive x-direction and a doublet of strength $\mu$ at the origin. Find the velocity on the surface of the cylinder.

**Solution:**

1.  **Write down the potentials.**
    *   Uniform flow: $\phi_U = U x = U r \cos\theta$.
    *   Doublet (aligned with the x-axis): $\phi_D = \frac{\mu}{r} \cos\theta$.
    *   The strength $\mu$ is related to the cylinder radius by $\mu = U R^2$. So, $\phi_D = \frac{U R^2}{r} \cos\theta$.

2.  **Superimpose the potentials.**
    The total potential $\phi$ is the sum of the individual potentials:
    $$ \phi = \phi_U + \phi_D = U r \cos\theta + \frac{U R^2}{r} \cos\theta = U \left( r + \frac{R^2}{r} \right) \cos\theta $$
    This is the velocity potential for the entire flow field.

3.  **Find the velocity components.**
    The velocity components in polar coordinates are $u_r = \frac{\partial \phi}{\partial r}$ and $u_\theta = \frac{1}{r}\frac{\partial \phi}{\partial \theta}$.
    $$ u_r = \frac{\partial}{\partial r} \left[ U \left( r + \frac{R^2}{r} \right) \cos\theta \right] = U \left( 1 - \frac{R^2}{r^2} \right) \cos\theta $$
    $$ u_\theta = \frac{1}{r} \frac{\partial}{\partial \theta} \left[ U \left( r + \frac{R^2}{r} \right) \cos\theta \right] = \frac{1}{r} U \left( r + \frac{R^2}{r} \right) (-\sin\theta) = -U \left( 1 + \frac{R^2}{r^2} \right) \sin\theta $$

4.  **Evaluate the velocity on the cylinder surface.**
    The surface of the cylinder is defined by $r=R$. We substitute this into our velocity component equations.
    *   Radial velocity: $u_r(R, \theta) = U \left( 1 - \frac{R^2}{R^2} \right) \cos\theta = U(1-1)\cos\theta = 0$.
    *   Tangential velocity: $u_\theta(R, \theta) = -U \left( 1 + \frac{R^2}{R^2} \right) \sin\theta = -2U \sin\theta$.

**Reflection:**
*   Step 1 worked because we knew the standard forms for the basic flows.
*   Step 2 relied on the linearity of Laplace's equation, allowing simple addition.
*   Step 3 was a direct application of the definition of the velocity potential in polar coordinates.
*   Step 4 gives the physical result. The radial velocity $u_r$ is zero on the surface, which makes sense: the fluid cannot flow *into* or *out of* the solid cylinder. The tangential velocity $u_\theta$ varies with $\theta$, being zero at the front and back stagnation points ($\theta=0, \pi$) and maximum at the top and bottom ($\theta = \pm \pi/2$).

## Diagrams
Flow around a cylinder, formed by a uniform flow and a doublet. Streamlines are shown.

```text
      -->      _________________________
      -->     /         .--.          \
      -->    |         /    \         |
      -->----|--------(      )--------|---->
      -->    |         \    /         |
      -->     \         '--'          /
      -->      -------------------------

      ^        ^          ^          ^
      |        |          |          |
      y-axis   Streamlines Cylinder  x-axis
               (flow from left)
```

## Memory technique — remember this forever
1.  **The Story:** Think of potential flow as "perfect, polite flow." The fluid particles are perfect (inviscid) and polite (irrotational, they don't spin into each other). Their motion is governed by a gentle landscape (the potential $\phi$), and they all slide downhill. To build a complex landscape, you just add simpler hills and valleys together (superposition).

2.  **Must-Know Formulas:**
    $$ \nabla \times \vec{u} = 0 \quad (\text{Irrotational}) $$
    $$ \vec{u} = \nabla \phi \quad (\text{Potential Definition}) $$
    $$ \nabla^2 \phi = 0 \quad (\text{Governing Equation}) $$

3.  **Spaced Repetition Schedule:** Review these ideas and re-derive the governing equation from the two assumptions in 1 day, 3 days, 7 days, 16 days, and 35 days.

4.  **First Principles Pathway:** If you forget everything, rebuild from the two assumptions.
    *   **Assumption 1: Irrotational.** The curl of velocity is zero: $\nabla \times \vec{u} = 0$.
    *   **Vector Calculus Identity:** A field with zero curl can always be expressed as the gradient of a scalar potential. So, invent $\phi$ such that $\vec{u} = \nabla \phi$.
    *   **Assumption 2: Incompressible.** The divergence of velocity is zero: $\nabla \cdot \vec{u} = 0$.
    *   **Combine:** Substitute the potential definition into the incompressibility condition: $\nabla \cdot (\nabla \phi) = 0$. This is, by definition, Laplace's equation: $\nabla^2 \phi = 0$.

## Common mistakes
*   **Applying it inside the boundary layer.** Potential flow is invalid near surfaces where viscosity creates a boundary layer and generates vorticity. It's an outer-flow approximation.
*   **Confusing potential $\phi$ and stream function $\psi$.** They are related (Cauchy-Riemann equations in 2D) but distinct. $\nabla \phi$ gives velocity, while lines of constant $\psi$ are the streamlines.
*   **Believing the zero-drag result.** D'Alembert's paradox (zero drag on a body in potential flow) is a direct result of the inviscid assumption. It highlights a limitation of the model, not a calculation error. Drag is primarily caused by viscosity (skin friction) and flow separation (pressure drag), both of which are ignored here.

## Self-check
1.  What are the two primary physical assumptions of potential flow, and what mathematical constraint does each one impose on the velocity field $\vec{u}$?
2.  Superimpose a uniform flow $\phi_U = U x$ and a sink at the origin $\phi_{sink} = -\frac{m}{2\pi} \ln r$. Find the velocity field $\vec{u}(x,y)$ and determine the location of the stagnation point(s).
3.  To model the lift on a symmetric airfoil at a small angle of attack, you would superimpose a uniform flow, a doublet, and other elements. Which fundamental potential flow element must be added to generate a net lift force, and why does its inclusion not violate the irrotationality condition in the flow field *away* from the origin?