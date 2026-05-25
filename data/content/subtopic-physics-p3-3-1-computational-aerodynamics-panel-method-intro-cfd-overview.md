## What it is
Computational aerodynamics uses numerical methods to solve the equations of fluid motion around bodies. The **panel method** is a simplified technique that models a body's surface with discrete "panels," each containing a flow singularity (like a source or vortex), to solve for inviscid, incompressible, potential flow. **Computational Fluid Dynamics (CFD)** is a more general and powerful approach that discretizes the entire fluid volume and solves the full governing equations (typically the Navier-Stokes equations), allowing for the simulation of complex phenomena like viscosity, turbulence, and compressibility.

## Why it matters
These methods are the bedrock of modern aerospace design, enabling engineers to analyze and optimize aircraft performance before building expensive physical prototypes. Panel methods are still used for rapid preliminary design of wings and bodies due to their speed, while full CFD is essential for detailed analysis of high-lift systems, engine integration, and supersonic/hypersonic flight. The same CFD principles are used to model everything from Formula 1 cars and turbine blades to blood flow in arteries and weather patterns.

## When to study it
Before tackling this, you must have a firm grasp of potential flow theory. Specifically, you need to be comfortable with:
1.  **Laplace's Equation:** $\nabla^2\phi = 0$ and its implications for incompressible, irrotational flow.
2.  **Elementary Flows:** The velocity fields for uniform flow, sources/sinks, and vortices.
3.  **Principle of Superposition:** The ability to add potential flow solutions to create more complex flows.
4.  **Vector Calculus:** Dot products, gradients, and coordinate transformations are essential.
5.  **Basic Linear Algebra:** You must understand how to formulate and solve a system of linear equations in matrix form, $A\vec{x} = \vec{b}$.

If these concepts are not solid, review them first. This topic builds directly upon them.

## How to study it (step by step)
1.  **Revisit Superposition:** Write down the potential function $\phi$ and velocity vector $\vec{V}$ for a uniform flow plus a single source. Convince yourself that the resulting velocity field is simply the vector sum of the individual velocity fields. This is the foundation.
2.  **Discretize a Surface:** Draw a simple symmetric airfoil. Now, approximate its continuous curve with 4-6 straight line segments (panels). Assign a unique index $i$ to each panel and define its midpoint (control point) and a normal vector $\hat{n}_i$ pointing out of the body.
3.  **Formulate the Boundary Condition:** The core physical constraint is that fluid cannot penetrate the solid surface. At the control point of each panel $i$, the total velocity vector $\vec{V}_{total}$ dotted with the normal vector $\hat{n}_i$ must be zero. Write this down: $\vec{V}_{total} \cdot \hat{n}_i = 0$.
4.  **Construct the Total Velocity:** The total velocity at any point is the sum of the freestream velocity $\vec{V}_\infty$ and the velocity induced by all the panels. For a simple non-lifting case, let's place a source of unknown strength $\sigma_j$ on each panel $j$. The total velocity at control point $i$ is $\vec{V}_{total, i} = \vec{V}_\infty + \sum_{j=1}^{N} \vec{V}_{induced, j \to i}$, where $\vec{V}_{induced, j \to i}$ is the velocity induced by panel $j$ at the control point of panel $i$.
5.  **Build the System of Equations:** Substitute the expression from step 4 into the boundary condition from step 3. This creates one linear equation for each panel $i$. Since you have $N$ panels (and thus $N$ unknown source strengths $\sigma_j$), you get $N$ equations for $N$ unknowns—a solvable linear system.
6.  **Contrast with CFD:** Now, imagine a box drawn around the airfoil. Instead of just panels on the surface, CFD requires you to fill this entire box with a grid of tiny cells (a "mesh"). You would then solve the Navier-Stokes equations within each cell, enforcing boundary conditions on the airfoil surface (e.g., no-slip) and at the far-field boundaries of the box. This is computationally orders of magnitude more expensive but captures far more physics.

## Key ideas, with intuition
1.  **Discretization: Trading Calculus for Algebra.** We can't solve the continuous problem for a complex shape analytically. So, we approximate the shape with many simple pieces (panels) for which we *do* know the solution. This transforms a differential equation problem into a large system of algebraic equations, which computers excel at solving.

2.  **Boundary Conditions Enforce the Physics.** The governing equations (like Laplace's) are universal, but the specific flow pattern is determined by the object's shape. We enforce the shape by demanding that the flow behaves correctly at the boundary. For a panel method, the key condition is flow tangency (no penetration):
    $$ (\vec{V}_\infty + \vec{V}_{induced}) \cdot \hat{n} = 0 $$
    This says: "The component of the total velocity normal to the surface must be zero."

3.  **Influence Coefficients: Every Panel Affects Every Other.** The velocity induced by panel $j$ at the control point of panel $i$ can be written as $\sigma_j \cdot \vec{v}_{ij}$, where $\vec{v}_{ij}$ is a purely geometric term representing the velocity at $i$ due to a unit-strength source at $j$. The set of all these geometric terms forms the "influence matrix" $A$ in the system $A\vec{\sigma} = \vec{b}$. $A_{ij}$ is the normal velocity induced at panel $i$ by a unit source on panel $j$.

4.  **Panel Method vs. CFD: Surface vs. Volume.** This is the crucial distinction.
    *   **Panel Method:** Solves a boundary integral equation on the 2D surface of the body. The domain is the surface itself. It's fast but limited to inviscid, incompressible flow.
    *   **CFD:** Solves partial differential equations in the 3D volume of fluid surrounding the body. The domain is the entire fluid field. It's slow and complex but can handle viscosity, turbulence, compressibility, heat transfer, etc.

## Worked example
Let's set up the system for a simple, symmetric, non-lifting body approximated by two panels in a uniform flow $\vec{V}_\infty = U_\infty \hat{i}$.

**Geometry:**
*   Panel 1: From $(-1, 0.1)$ to $(0, 0.1)$. Control point $P_1 = (-0.5, 0.1)$. Normal vector $\hat{n}_1 = \hat{j}$.
*   Panel 2: From $(0, 0.1)$ to $(1, 0.1)$. Control point $P_2 = (0.5, 0.1)$. Normal vector $\hat{n}_2 = \hat{j}$.
*   For simplicity, we'll use a very crude approximation for the velocity induced by a source panel $j$ of strength $\sigma_j$ at a point $P_i$: $\vec{V}_{j \to i} \approx \frac{\sigma_j}{2\pi r_{ij}} \hat{r}_{ij}$, where $r_{ij}$ is the distance from the center of panel $j$ to point $P_i$. *Note: This is an approximation; the true formula is an integral.*

**Step 1: Write the boundary condition for each panel.**
The total velocity at control point $i$ must have no component normal to panel $i$.
*   For Panel 1: $(\vec{V}_\infty + \vec{V}_{1 \to 1} + \vec{V}_{2 \to 1}) \cdot \hat{n}_1 = 0$
*   For Panel 2: $(\vec{V}_\infty + \vec{V}_{1 \to 2} + \vec{V}_{2 \to 2}) \cdot \hat{n}_2 = 0$

**Step 2: Decompose the freestream velocity.**
$\vec{V}_\infty = U_\infty \hat{i} + 0 \hat{j}$.
The normal component of the freestream on both panels is:
$\vec{V}_\infty \cdot \hat{n}_1 = (U_\infty \hat{i}) \cdot (\hat{j}) = 0$.
$\vec{V}_\infty \cdot \hat{n}_2 = (U_\infty \hat{i}) \cdot (\hat{j}) = 0$.
Our right-hand side vector is $\{b\} = \begin{pmatrix} -\vec{V}_\infty \cdot \hat{n}_1 \\ -\vec{V}_\infty \cdot \hat{n}_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$. This makes sense for a flow aligned with the body.

**Step 3: Calculate the influence coefficients.**
Let $A_{ij}$ be the normal velocity at panel $i$ due to a unit source on panel $j$.
*   $A_{11}$: Influence of panel 1 on itself. The velocity is purely normal at the panel's center. $\vec{V}_{1 \to 1} = \frac{\sigma_1}{2}\hat{n}_1$. So, $(\frac{1}{2}\hat{n}_1) \cdot \hat{n}_1 = 1/2$. Thus $A_{11} = 0.5$.
*   $A_{22}$: Influence of panel 2 on itself. By symmetry, $A_{22} = 0.5$.
*   $A_{12}$: Influence of panel 1 on panel 2. The vector from center of 1 to center of 2 is $\vec{r}_{12} = (0.5 - (-0.5))\hat{i} = 1.0\hat{i}$. The distance is $r_{12}=1.0$. The velocity induced by a unit source on panel 1 at $P_2$ is $\vec{v}_{1 \to 2} = \frac{1}{2\pi r_{12}}\hat{r}_{12} = \frac{1}{2\pi}\hat{i}$. The normal component at panel 2 is $(\frac{1}{2\pi}\hat{i}) \cdot \hat{n}_2 = (\frac{1}{2\pi}\hat{i}) \cdot (\hat{j}) = 0$. So, $A_{12} = 0$.
*   $A_{21}$: Influence of panel 2 on panel 1. By symmetry, $A_{21} = 0$.

**Step 4: Assemble and solve the matrix system $A\vec{\sigma} = \vec{b}$.**
$$
\begin{pmatrix}
A_{11} & A_{12} \\
A_{21} & A_{22}
\end{pmatrix}
\begin{pmatrix}
\sigma_1 \\
\sigma_2
\end{pmatrix}
=
\begin{pmatrix}
-\vec{V}_\infty \cdot \hat{n}_1 \\
-\vec{V}_\infty \cdot \hat{n}_2
\end{pmatrix}
$$
$$
\begin{pmatrix}
0.5 & 0 \\
0 & 0.5
\end{pmatrix}
\begin{pmatrix}
\sigma_1 \\
\sigma_2
\end{pmatrix}
=
\begin{pmatrix}
0 \\
0
\end{pmatrix}
$$
The solution is trivial: $\sigma_1 = 0$ and $\sigma_2 = 0$.

**Reflection:**
This result seems boring, but it's correct. For a freestream perfectly aligned with a flat plate, no sources are needed to satisfy the no-penetration condition. If we had set an angle of attack, $\vec{V}_\infty = U_\infty (\cos\alpha \hat{i} + \sin\alpha \hat{j})$, the right-hand side would become non-zero, leading to non-zero source strengths $\sigma_j$ required to "cancel" the normal component of the freestream. Each step systematically translated a physical constraint (no penetration) into a solvable mathematical form (linear algebra).

## Diagrams
Panel Method Discretization:
```text
        Freestream V_inf -->
                                     ^ n_3
                                    /
             P_3 (Control Point) --+----
            /                   \  |
      Panel 3                    \
       /                          \
  n_2 ^--> P_2-------------------- Panel 4
     /
   P_1
  /
Panel 1 (with source sigma_1)
```

Panel Method (Surface Mesh) vs. CFD (Volume Mesh):
```text
      PANEL METHOD                      CFD (Computational Fluid Dynamics)
**********************         ********************************************
*                      *         * +--+--+--+--+-+--+--+--+--+--+--+--+--+ *
*      Flow field      *         * |  |  |  | / /|  |  |  |  |  |  |  |  | *
*   (calculated from   *         * |  |  | / / / |  |  |  |  |  |  |  |  | *
*   surface sources)   *         * +--+-/ / / /--+--+--+--+--+--+--+--+--+ *
*                      *         * |  | / / / / / |  |  |  |  |  |  |  |  | *
*        .-----.       *         * | / / / / / / /|  |  |  |  |  |  |  |  | *
*       /       \      *         * +/ / /-----/ / /+--+--+--+--+--+--+--+--+ *
*      |    o    |     *         * / / /       \ \ \ |  |  |  |  |  |  |  | *
*       \       /      *         * | | |    o    | | |  |  |  |  |  |  |  | *
*        '-----'       *         * \ \ \       / / / |  |  |  |  |  |  |  | *
*    ^                 *         * +\ \ \-----/ / /--+--+--+--+--+--+--+--+ *
*    |                 *         * | \ \ \ \ \ \ \|  |  |  |  |  |  |  |  | *
*  Surface panels only *         * |  \ \ \ \ \  |  |  |  |  |  |  |  |  | *
*                      *         * +---\ \ \ \---+--+--+--+--+--+--+--+--+ *
*                      *         * |  | \ \ \  |  |  |  |  |  |  |  |  |  | *
*                      *         * +--+--+--+--+--+--+--+--+--+--+--+--+--+ *
**********************         ********************************************
                                 ^
                                 |
                                 Entire fluid volume is meshed
```

## Memory technique — remember this forever
1.  **The Story: The Raincoat Defense.** Imagine you are a point on an airfoil's surface. Your job is to stay dry in a rainstorm (the freestream, $\vec{V}_\infty$). The rain is coming at you with a component that would get you wet (the normal component, $\vec{V}_\infty \cdot \hat{n}$). To stay dry, you deploy a tiny, personal fan (a source, $\sigma$) that blows exactly hard enough to cancel out that normal component of the rain. The panel method is just organizing a team of millions of points, each with their own fan, and calculating the exact fan speed ($\sigma_i$) each one needs, considering that their fans also blow on their neighbors.

2.  **Must-know formulas:**
    *   The No-Penetration Boundary Condition:
        $$ \vec{V}_{total} \cdot \hat{n}_i = 0 $$
    *   The resulting linear system for $N$ source panels:
        $$ \sum_{j=1}^{N} A_{ij} \sigma_j = -(\vec{V}_\infty \cdot \hat{n}_i) \quad \text{for } i=1, ..., N $$
        Where $A_{ij}$ is the normal velocity at panel $i$ from a unit source on panel $j$.

3.  **Spaced Repetition Schedule:**
    *   Review tomorrow (1 day)
    *   Review in 3 days
    *   Review in 1 week (7 days)
    *   Review in ~2 weeks (16 days)
    *   Review in ~5 weeks (35 days)

4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    *   Physics: Flow cannot penetrate the surface.
    *   Math: The total velocity vector dotted with the surface normal vector is zero. $\vec{V}_{total} \cdot \hat{n} = 0$.
    *   Superposition: The total velocity is the freestream plus the sum of velocities from all singularities. $\vec{V}_{total} = \vec{V}_\infty + \sum \vec{V}_{induced, j}$.
    *   Combine: $(\vec{V}_\infty + \sum \vec{V}_{induced, j}) \cdot \hat{n} = 0$.
    *   Discretize: This must hold at the control point $i$ for every panel. $(\vec{V}_\infty \cdot \hat{n}_i) + \sum_{j=1}^{N} (\vec{V}_{induced, j \to i} \cdot \hat{n}_i) = 0$. This is the linear system.

## Common mistakes
1.  **Applying Panel Methods Incorrectly:** Trying to use this method for problems with strong shocks, thick boundary layers, or flow separation. Panel methods are based on potential flow and are blind to these viscous and compressible phenomena.
2.  **Confusing Surface and Volume Meshes:** Stating that a panel method requires a "3D mesh." It does not. It requires a 2D surface mesh that exists in 3D space. CFD requires a true 3D volume mesh.
3.  **Forgetting the Kutta Condition:** For an airfoil that needs to generate lift, source panels alone are not enough. You must add vortex panels and apply the Kutta condition (flow leaves the sharp trailing edge smoothly) to get a unique solution with the correct circulation and lift. Forgetting this leads to physically meaningless results.

## Self-check
1.  A thin, flat plate is modeled with two panels, one from $(-1,0)$ to $(0,0)$ and the other from $(0,0)$ to $(1,0)$. The freestream is $\vec{V}_\infty = U_\infty(\cos\alpha \hat{i} + \sin\alpha \hat{j})$. Write out the right-hand side vector $\{b\}$ for the system of equations $A\vec{\sigma} = \vec{b}$.
2.  To model lift on a cambered airfoil, you must add vortex panels to the source panels. Why are source panels, which are excellent at controlling the thickness of a body, insufficient on their own to produce lift? (Hint: Relate lift to circulation).
3.  An engineer runs a panel code and a RANS CFD simulation for the same wing at a high angle of attack near stall. The panel code predicts a lift coefficient that is 20% higher than the CFD result. What specific physical phenomenon, absent in the potential flow model of the panel code, is the CFD simulation capturing that likely explains this discrepancy?