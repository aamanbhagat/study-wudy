## What it is
The **stream function** ($\psi$) and **velocity potential** ($\phi$) are mathematical tools used to describe fluid flow fields. The stream function is defined for 2D incompressible flows and its contours represent streamlines, while the velocity potential is defined for irrotational flows and its gradient gives the velocity vector. They simplify complex vector fields into scalar fields, making analysis much easier.

## Why it matters
These concepts are the bedrock of **potential flow theory**, which is used to get first-order approximations of lift and drag on airfoils and other bodies. In aerospace, this allows for rapid preliminary design of wings and fuselages. In computer science, methods for solving Laplace's equation (which both $\psi$ and $\phi$ satisfy under certain conditions) are fundamental in numerical simulation, including computational fluid dynamics (CFD) and electrostatics.

## When to study it
Before tackling this, you must have a firm grasp of the following. If not, study them first.
1.  **Vector Calculus**: Specifically, the gradient ($\nabla f$), divergence ($\nabla \cdot \vec{F}$), and curl ($\nabla \times \vec{F}$) operators in Cartesian coordinates.
2.  **Fluid Kinematics**: The physical meaning of streamlines, the continuity equation (conservation of mass), and the definition of vorticity (local fluid rotation).
3.  **Partial Differential Equations (PDEs)**: You should recognize the form and significance of Laplace's equation, $\nabla^2 f = 0$.

## How to study it (step by step)
1.  **Derive the Stream Function ($\psi$) from First Principles.** Start with the 2D incompressible continuity equation: $\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0$. Recognize this as the condition for an exact differential. Define $\psi$ such that $u = \frac{\partial\psi}{\partial y}$ and $v = -\frac{\partial\psi}{\partial x}$. Substitute these back into the continuity equation to prove it is automatically satisfied.
2.  **Derive the Velocity Potential ($\phi$) from First Principles.** Start with the condition for a 2D irrotational flow: vorticity is zero, $\omega_z = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = 0$. This implies that the velocity field $\vec{v}$ is conservative. A conservative vector field can always be expressed as the gradient of a scalar potential, so we define $\phi$ such that $\vec{v} = \nabla\phi$, which means $u = \frac{\partial\phi}{\partial x}$ and $v = \frac{\partial\phi}{\partial y}$.
3.  **Connect the Two.** Consider a flow that is both incompressible and irrotational (an "ideal" flow). Substitute the definitions from $\phi$ into the continuity equation. You will find that $\frac{\partial}{\partial x}(\frac{\partial\phi}{\partial x}) + \frac{\partial}{\partial y}(\frac{\partial\phi}{\partial y}) = 0$, which is Laplace's equation: $\nabla^2\phi = 0$. Do the same for $\psi$ and the irrotationality condition to find $\nabla^2\psi = 0$.
4.  **Understand the Geometry.** Prove that lines of constant $\psi$ (streamlines) are perpendicular to lines of constant $\phi$ (equipotential lines). Hint: Find the gradient vectors $\nabla\psi$ and $\nabla\phi$ and show their dot product is zero. This orthogonal grid is called a "flow net".
5.  **Practice.** Take a given velocity field, e.g., $\vec{v} = (2x)\hat{i} - (2y)\hat{j}$. First, check the conditions: Is it incompressible? Is it irrotational? Then, integrate the definitions to find $\psi(x,y)$ and $\phi(x,y)$.

## Key ideas, with intuition
1.  **Stream Function ($\psi$) is a Flow Rate Counter.** The value of $\psi$ is not as important as the *difference* in its value between two points. The volume flow rate (per unit depth) between two streamlines, $\psi_1$ and $\psi_2$, is simply $|\psi_2 - \psi_1|$. If you are on a line of constant $\psi$, you are on a streamline—a path that a fluid particle follows. No flow can cross a streamline, by definition.
    $$Q_{1 \to 2} = \int_1^2 \vec{v} \cdot d\vec{n} = \psi_2 - \psi_1$$
2.  **Velocity Potential ($\phi$) is a "Topographical Map" for Velocity.** Think of $\phi$ as height on a hill. The velocity vector $\vec{v} = \nabla\phi$ always points in the direction of the steepest ascent of $\phi$. Fluid "flows uphill" on the potential map. Lines of constant $\phi$ are like contour lines on a topographical map.
3.  **The Conditions are the Key.** The existence of these functions is not guaranteed. They are consequences of physical assumptions about the flow.
    *   **Incompressible Flow ($\nabla \cdot \vec{v} = 0$) $\implies$ A Stream Function $\psi$ exists.**
    *   **Irrotational Flow ($\nabla \times \vec{v} = 0$) $\implies$ A Velocity Potential $\phi$ exists.**
4.  **Orthogonality Creates a "Flow Net".** For ideal flows (incompressible and irrotational), the streamlines ($\psi = \text{const}$) and equipotential lines ($\phi = \text{const}$) cross at right angles. This provides an incredibly powerful way to visualize and solve 2D flow problems.

## Worked example
Consider a uniform flow with velocity $U$ in the positive x-direction, so $\vec{v} = U\hat{i} + 0\hat{j}$.
1.  Find the velocity potential $\phi(x,y)$.
2.  Find the stream function $\psi(x,y)$.

**Solution:**

**Step 1: Find the velocity potential $\phi$.**
The flow is clearly irrotational, since the velocity components $u=U$ and $v=0$ are constants, so $\frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = 0 - 0 = 0$. Thus, a potential $\phi$ exists.

By definition, $u = \frac{\partial\phi}{\partial x}$ and $v = \frac{\partial\phi}{\partial y}$.
Using the first component:
$$ \frac{\partial\phi}{\partial x} = U $$
Integrate with respect to $x$:
$$ \phi(x,y) = \int U \, dx = Ux + f(y) $$
Here, $f(y)$ is an arbitrary function of $y$, since we treated $y$ as a constant.

Now use the second component to find $f(y)$:
$$ \frac{\partial\phi}{\partial y} = v = 0 $$
Differentiate our expression for $\phi$ with respect to $y$:
$$ \frac{\partial}{\partial y} (Ux + f(y)) = 0 + f'(y) $$
Comparing these, we get $f'(y) = 0$, which means $f(y) = C$, a constant. We can set this constant to zero as the absolute value of the potential is not physically meaningful.
So, the velocity potential is:
$$ \phi(x,y) = Ux $$

**Step 2: Find the stream function $\psi$.**
The flow is also incompressible, since $\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0 + 0 = 0$. Thus, a stream function $\psi$ exists.

By definition, $u = \frac{\partial\psi}{\partial y}$ and $v = -\frac{\partial\psi}{\partial x}$.
Using the first component:
$$ \frac{\partial\psi}{\partial y} = u = U $$
Integrate with respect to $y$:
$$ \psi(x,y) = \int U \, dy = Uy + g(x) $$
Here, $g(x)$ is an arbitrary function of $x$.

Now use the second component to find $g(x)$:
$$ -\frac{\partial\psi}{\partial x} = v = 0 $$
Differentiate our expression for $\psi$ with respect to $x$ and negate it:
$$ -\frac{\partial}{\partial x} (Uy + g(x)) = -(0 + g'(x)) = -g'(x) $$
Comparing these, we get $-g'(x) = 0$, which means $g(x) = K$, a constant. We can set this constant to zero.
So, the stream function is:
$$ \psi(x,y) = Uy $$

**Reflection:**
Each step followed directly from the definitions. We integrated one component's definition to get a partial solution, then used the other component's definition to solve for the unknown function of integration. The equipotential lines ($\phi = Ux = \text{const}$) are vertical lines ($x=\text{const}$), and the streamlines ($\psi = Uy = \text{const}$) are horizontal lines ($y=\text{const}$), which are indeed orthogonal, as expected for this simple uniform flow.

## Diagrams
Here is an ASCII diagram of a "flow net" for flow in a 90-degree corner. The solid lines are streamlines ($\psi = \text{const}$) showing the path of the fluid. The dashed lines are equipotential lines ($\phi = \text{const}$). Note they are mutually orthogonal.

```text
      ^ y
      |
      |   /
      |  /
      | /
      |/  <-- Streamlines (solid)
 -----/---------------------> x
     /| \
    / |  \
   /  |   \  <-- Equipotential lines (dashed, imagine curves)
  /   |    \
 /    |     \
```
*Description for a better mental image:* Imagine the positive x and y axes forming a solid corner. Fluid flows towards this corner from the upper right, splits, and flows out along the axes. The streamlines are hyperbolas ($xy = \text{const}$) that hug the axes. The equipotential lines are also hyperbolas ($x^2 - y^2 = \text{const}$) that are perpendicular to the streamlines everywhere, forming a perfect grid of curved squares.

## Memory technique — remember this forever
1.  **The Story:** Think of **P**otential ($\phi$) as "pushing" and **S**tream ($\psi$) as "slicing".
    *   **P**otential **P**ushes: Velocity is the gradient (the "push") of $\phi$. $\vec{v} = \nabla\phi$. This requires the flow to be irrotational (no local spin, so the push is well-defined everywhere).
    *   **S**tream function **S**lices: Streamlines are slices of constant $\psi$. Velocity is found by differentiating $\psi$ across the slices. To remember the signs, think of a standard $(x,y)$ coordinate system. To get the positive x-velocity ($u$), you must differentiate in the positive y-direction: $u = \partial\psi/\partial y$. To get the positive y-velocity ($v$), you must differentiate in the *negative* x-direction: $v = -\partial\psi/\partial x$.

2.  **Formulas to Overlearn:**
    *   **Velocity Potential:** $\vec{v} = \nabla\phi \implies u = \frac{\partial\phi}{\partial x}, \quad v = \frac{\partial\phi}{\partial y}$ (Condition: $\nabla \times \vec{v} = 0$)
    *   **Stream Function:** $u = \frac{\partial\psi}{\partial y}, \quad v = -\frac{\partial\psi}{\partial x}$ (Condition: $\nabla \cdot \vec{v} = 0$)

3.  **Spaced Repetition Schedule:** Review these definitions and derivations at the end of today. Then again in 1 day, 3 days, 7 days, 16 days, and 35 days. Actively re-derive them from the conditions each time.

4.  **First Principles Pathway:**
    *   If you forget the **stream function** formulas: Write down the 2D incompressibility condition $\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0$. Rewrite it as $\frac{\partial u}{\partial x} = -\frac{\partial v}{\partial y}$. This structure demands the existence of a function $\psi(x,y)$ such that $u = \frac{\partial\psi}{\partial y}$ and $v = -\frac{\partial\psi}{\partial x}$. The cross-derivatives will then match the continuity equation.
    *   If you forget the **velocity potential** formulas: Write down the 2D irrotationality condition $\frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = 0$. Rewrite it as $\frac{\partial v}{\partial x} = \frac{\partial u}{\partial y}$. This is the condition for a vector field $(u,v)$ to be the gradient of a scalar function $\phi$. Thus, $\vec{v} = \nabla\phi$, or $u = \frac{\partial\phi}{\partial x}$ and $v = \frac{\partial\phi}{\partial y}$.

## Common mistakes
1.  **Sign Error in the Stream Function:** Forgetting the minus sign in $v = -\frac{\partial\psi}{\partial x}$. This is the most frequent error. Use the mnemonic above to lock it in.
2.  **Applying Functions Incorrectly:** Using the velocity potential $\phi$ to describe a flow that has vorticity (e.g., a real vortex with a solid-body core), or using the stream function $\psi$ for a 3D or compressible flow. Always check the conditions first.
3.  **Botching the Integration:** When finding $\psi$ from $u = \frac{\partial\psi}{\partial y}$, the integral is $\psi = \int u \, dy + g(x)$, not $+C$. Forgetting that the "constant" of integration is a function of the other variable is a critical error.
4.  **Mixing up Coordinates:** The definitions provided are for Cartesian coordinates. The formulas change for polar coordinates, and it's a common mistake to apply the Cartesian form to a problem naturally described in polar coordinates.

## Self-check
1.  A 2D velocity field is given by $\vec{v} = y\hat{i} - x\hat{j}$. Does a stream function exist? Does a velocity potential exist? If so, find them.
2.  The stream function for a certain flow is $\psi(r, \theta) = U r \sin\theta - \frac{Ua^2}{r}\sin\theta$ (in polar coordinates). This represents flow around a cylinder of radius $a$. Find the velocity components $v_r$ and $v_\theta$ and identify where the velocity is maximum on the cylinder's surface ($r=a$).
3.  Prove from the definitions of $\psi$ and $\phi$ that for a 2D, incompressible, irrotational flow, $\nabla\psi \cdot \nabla\phi = 0$. What is the geometric significance of this result?