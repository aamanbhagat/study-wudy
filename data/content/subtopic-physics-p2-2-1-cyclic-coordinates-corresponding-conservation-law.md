## What it is
A cyclic coordinate is a generalized coordinate that does not explicitly appear in the Lagrangian of a system. The corresponding conservation law, a direct consequence of the Euler-Lagrange equations, states that the generalized momentum conjugate to that cyclic coordinate is a conserved quantity (i.e., constant in time). This provides a powerful link between the symmetries of a system and its conserved quantities.

## Why it matters
This is your first concrete encounter with Noether's Theorem, one of the most profound ideas in physics: **symmetries imply conservation laws**. In astrodynamics, the conservation of angular momentum (arising from rotational symmetry) dictates that planets sweep out equal areas in equal times and keeps satellites in stable orbits. In robotics and control systems, identifying cyclic coordinates simplifies the equations of motion, allowing for more efficient simulation and control of complex systems like robotic arms or autonomous vehicles.

## When to study it
You must have a solid grasp of the Lagrangian formulation of mechanics. Specifically, be comfortable with:
1.  **Generalized Coordinates ($q_i$)**: Describing a system's configuration with the minimum number of independent variables.
2.  **The Lagrangian ($L = T - V$)**: Constructing the Lagrangian as the difference between kinetic ($T$) and potential ($V$) energy.
3.  **The Euler-Lagrange Equations**: Knowing and being able to apply the core equation of motion: $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right) - \frac{\partial L}{\partial q_i} = 0$.

If you cannot derive and solve the equations of motion for a simple pendulum using this framework, review that material first.

## How to study it (step by step)
1.  **Review the Euler-Lagrange (E-L) Equation.** Write it down from memory. Identify the two main terms: the time derivative of the "velocity part" and the "position part".
2.  **Formalize the definition.** A coordinate $q_k$ is cyclic if $\frac{\partial L}{\partial q_k} = 0$. Take the E-L equation and set this term to zero. What does the equation simplify to?
3.  **Derive the conservation law.** From your simplified equation in step 2, integrate with respect to time. This shows that the quantity $\frac{\partial L}{\partial \dot{q}_k}$ must be a constant. Define this quantity as the generalized momentum, $p_k$.
4.  **Solve a "trivial" case.** Write the Lagrangian for a free particle in 2D Cartesian coordinates $(x, y)$. Identify the cyclic coordinates and the conserved quantities. Interpret what these conserved quantities represent physically.
5.  **Solve the canonical case.** Write the Lagrangian for a particle moving under a central force $V(r)$ in 2D polar coordinates $(r, \theta)$. Identify the cyclic coordinate and derive the expression for the conserved generalized momentum. Recognize this quantity as angular momentum.

## Key ideas, with intuition
1.  **Symmetry is "Ignorability".** If you can move or rotate a system without changing its fundamental physics (i.e., its energy), that system has a symmetry. In the Lagrangian formalism, this means the Lagrangian $L$ is "ignorant" of the corresponding coordinate $q_k$; it simply doesn't appear in the formula for $L$. This coordinate is then called "cyclic" or "ignorable".
2.  **The E-L Equation as a "Force" Balance.** The Euler-Lagrange equation $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_k}\right) = \frac{\partial L}{\partial q_k}$ is the rotational/translational analogue of Newton's second law. The right side, $\frac{\partial L}{\partial q_k}$, is the "generalized force" $Q_k$. If a coordinate $q_k$ is cyclic, this generalized force is zero.
3.  **Zero Force implies Constant Momentum.** If the generalized force is zero, then the E-L equation becomes:
    $$ \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_k}\right) = 0 $$
    This says that the rate of change of the quantity in the parenthesis is zero. Therefore, that quantity must be constant. We define this conserved quantity as the generalized momentum conjugate to $q_k$:
    $$ p_k \equiv \frac{\partial L}{\partial \dot{q}_k} = \text{constant} $$
    This is the entire conservation law. It flows directly from the structure of the E-L equations when a coordinate is missing from the Lagrangian.

## Worked example
**Problem:** A particle of mass $m$ is constrained to move on the inner surface of a frictionless cone of half-angle $\alpha$, with its axis oriented vertically along the z-axis. Gravity $g$ acts downwards. Find the Lagrangian, identify any cyclic coordinates, and find the corresponding conserved quantity.

**Solution:**

1.  **Choose coordinates.** The geometry suggests cylindrical coordinates $(\rho, \phi, z)$. The cone's surface imposes a constraint: $z = \rho \cot \alpha$. We can use $\rho$ and $\phi$ as our generalized coordinates.

2.  **Express T and V.**
    -   The kinetic energy in cylindrical coordinates is $T = \frac{1}{2}m(\dot{\rho}^2 + \rho^2\dot{\phi}^2 + \dot{z}^2)$.
    -   Using the constraint, we find $\dot{z} = \dot{\rho} \cot \alpha$.
    -   Substitute $\dot{z}$ into $T$:
        $$ T = \frac{1}{2}m(\dot{\rho}^2 + \rho^2\dot{\phi}^2 + \dot{\rho}^2 \cot^2\alpha) = \frac{1}{2}m(\dot{\rho}^2(1+\cot^2\alpha) + \rho^2\dot{\phi}^2) $$
        Using the identity $1+\cot^2\alpha = \csc^2\alpha$:
        $$ T = \frac{1}{2}m(\dot{\rho}^2\csc^2\alpha + \rho^2\dot{\phi}^2) $$
    -   The potential energy is $V = mgz = mg\rho\cot\alpha$.

3.  **Construct the Lagrangian $L = T - V$.**
    $$ L = \frac{1}{2}m(\dot{\rho}^2\csc^2\alpha + \rho^2\dot{\phi}^2) - mg\rho\cot\alpha $$

4.  **Identify cyclic coordinates.** We inspect $L$ for coordinates that do not appear explicitly.
    -   $\rho$ and $\dot{\rho}$ appear, so $\rho$ is not cyclic.
    -   $\dot{\phi}$ appears, but $\phi$ itself does not. Therefore, $\phi$ is the cyclic coordinate.

5.  **Find the conserved momentum.** The generalized momentum conjugate to $\phi$ is $p_\phi$.
    $$ p_\phi = \frac{\partial L}{\partial \dot{\phi}} $$
    $$ p_\phi = \frac{\partial}{\partial \dot{\phi}} \left[ \frac{1}{2}m(\dot{\rho}^2\csc^2\alpha + \rho^2\dot{\phi}^2) - mg\rho\cot\alpha \right] $$
    $$ p_\phi = m\rho^2\dot{\phi} $$
    Since $\phi$ is cyclic, the Euler-Lagrange equation for $\phi$ guarantees that $\frac{d p_\phi}{dt} = 0$.
    Thus, $p_\phi = m\rho^2\dot{\phi}$ is a conserved quantity.

**Reflection:**
-   Step 1 (Coordinates): Choosing coordinates that respect the system's symmetry made the cyclic coordinate obvious.
-   Step 2 & 3 (Lagrangian): Correctly expressing $T$ and $V$ and applying the constraint was purely mechanical.
-   Step 4 (Identification): The key insight. By simply *looking* at the final expression for $L$, we found the symmetry. The coordinate $\phi$, representing rotation around the cone's axis, is absent. This makes physical sense: the physics (gravity, cone surface) doesn't care how you're oriented rotationally around the axis.
-   Step 5 (Conservation): Applying the definition of generalized momentum yielded the conserved quantity, which we recognize as the z-component of the particle's angular momentum.

## Diagrams
A diagram of the cone problem.

```text
      z
      ^
      |
      |   /
      |  / \
      | /   \  <-- Particle m at (rho, phi, z)
      |/     \
      /|      \
     / |alpha  \
    /  |        \
   /___|_________\ > rho
  /    |          \
 O
```

## Memory technique — remember this forever
1.  **Mnemonic:** "If a coordinate is **C**yclic, its **C**onjugate momentum is **C**onserved." The **C-C-C rule**. A cyclic coordinate is one you can cycle through (like rotating) without changing the system's energy description.

2.  **Must-know formulas:**
    $$ p_k \equiv \frac{\partial L}{\partial \dot{q}_k} \quad (\text{Definition of generalized momentum}) $$
    $$ \frac{\partial L}{\partial q_k} = 0 \implies \frac{d p_k}{dt} = 0 \quad (\text{The conservation law}) $$

3.  **Spaced Repetition Schedule:** Review this concept and re-derive the main result at **1 day, 3 days, 7 days, 16 days, and 35 days**. Do one new problem from a textbook at each interval.

4.  **First Principles Pathway:** If you forget everything, rebuild it from the Euler-Lagrange equation:
    $$ \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_k}\right) - \frac{\partial L}{\partial q_k} = 0 $$
    Remember the definition of "cyclic": the coordinate $q_k$ is not in $L$. This means the second term is zero: $\frac{\partial L}{\partial q_k} = 0$. The equation becomes $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_k}\right) = 0$. This directly states that the quantity $\frac{\partial L}{\partial \dot{q}_k}$ is constant. That's the whole law.

## Common mistakes
1.  **Confusing Cyclic with Constant:** A coordinate $q_k$ being cyclic ($\frac{\partial L}{\partial q_k}=0$) does *not* mean its velocity $\dot{q}_k$ is zero or constant. In the cone example, $\dot{\phi}$ is generally not constant, but the combination $m\rho^2\dot{\phi}$ is.
2.  **Coordinate System Dependence:** A conservation law exists independent of coordinates, but a coordinate is only "cyclic" in a system that reflects the underlying symmetry. The central force problem has a cyclic coordinate $\theta$ in polar coordinates, but no cyclic coordinates in Cartesian coordinates $(x, y)$, because both $x$ and $y$ would appear in the potential $V(\sqrt{x^2+y^2})$.
3.  **Sloppy Partial Derivatives:** Forgetting to treat other coordinates and velocities as constants when taking a partial derivative. When calculating $\frac{\partial L}{\partial \dot{\phi}}$, you must treat $\rho$ and $\dot{\rho}$ as fixed parameters.

## Self-check
1.  Write the Lagrangian for a free particle of mass $m$ in 3D spherical coordinates $(r, \theta, \phi)$. Identify all cyclic coordinates and their corresponding conserved momenta. What do these momenta represent physically?
2.  A dumbbell consists of two masses $m$ at either end of a rigid, massless rod of length $l$. The dumbbell's center is fixed at the origin, but it is free to rotate in 3D space. Using Euler angles $(\theta, \phi, \psi)$ as generalized coordinates, write the kinetic energy (there is no potential energy). Identify the cyclic coordinates and the conserved quantities.
3.  Consider the Lagrangian $L = \frac{1}{2}(\dot{x}^2 + \dot{y}^2) - V(x-y)$. Does this system have a conserved linear momentum in the x or y direction? Perform a coordinate transformation to $u_1 = x-y$ and $u_2 = x+y$. Rewrite the Lagrangian in terms of $u_1$ and $u_2$. Now, identify the cyclic coordinate and the corresponding conserved generalized momentum.