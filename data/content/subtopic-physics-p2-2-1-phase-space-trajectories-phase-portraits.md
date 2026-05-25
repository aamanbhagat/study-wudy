## What it is
Phase space is a mathematical space where every possible state of a physical system is represented by a unique point. For a simple mechanical system, a "state" is completely defined by its position $q$ and its momentum $p$. The path a system follows through time, traced out in this space, is called its phase space trajectory.

## Why it matters
Phase space is the natural arena for Hamiltonian mechanics and is fundamental to statistical mechanics, where ensembles of systems are represented as distributions of points in phase space. In aerospace, it's used to analyze the stability of orbits and the attitude dynamics of spacecraft. In machine learning, the concept of a "state space" is central to reinforcement learning and control theory, where an agent's policy is a map from states to actions.

## When to study it
You should be comfortable with Newtonian mechanics, particularly the concepts of potential energy $V(q)$, kinetic energy $T(p)$, and conservation of energy. You must understand basic single-variable calculus (derivatives) and have a foundational grasp of solving simple ordinary differential equations. A prior introduction to Lagrangian mechanics and generalized coordinates ($q_i, \dot{q}_i$) is highly recommended, as phase space is the next logical step.

## How to study it (step by step)
1.  **Define the space for a 1D system.** Consider a single particle moving in one dimension. Its configuration is just its position $q=x$. Its state requires both position and momentum, $p=m\dot{x}$. The phase space is the 2D plane with coordinates $(q, p)$.
2.  **Connect energy to geometry.** For a conservative system, the total energy $E = T+V = \frac{p^2}{2m} + V(q)$ is constant. This equation, $H(q,p) = E$, defines a curve in the $(q,p)$ plane. This curve *is* the phase space trajectory.
3.  **Draw your first phase portrait.** For the simple harmonic oscillator (SHO), $V(q) = \frac{1}{2}kq^2$. The energy equation is $\frac{p^2}{2m} + \frac{1}{2}kq^2 = E$. Recognize this as the equation of an ellipse. Draw a few nested ellipses, each corresponding to a different, constant energy $E$. This set of curves is the phase portrait.
4.  **Determine the direction of flow.** A trajectory is a directed path. Use the fundamental dynamics to find the direction. By definition, $\dot{q} = p/m$. So, if $p > 0$, $q$ must be increasing (motion to the right). If $p < 0$, $q$ must be decreasing. This will establish a clockwise flow on the ellipses for the SHO.
5.  **Formalize the flow.** The "velocity" in phase space, $(\dot{q}, \dot{p})$, is given by Hamilton's equations: $\dot{q} = \frac{\partial H}{\partial p}$ and $\dot{p} = -\frac{\partial H}{\partial q}$. For the SHO, verify that these equations give $\dot{q} = p/m$ and $\dot{p} = -kq$, which confirms the flow direction you found in the previous step.
6.  **Analyze a more complex system.** Sketch the phase portrait for a simple pendulum. Identify regions of different behavior: closed loops near the origin (oscillation) and wavy lines far from the origin (rotation). The boundary between them is a special trajectory called a separatrix.

## Key ideas, with intuition
1.  **A Point is a Complete State.** A single point $(q_0, p_0)$ in phase space is a perfect snapshot of the system at an instant. It contains not just *where* the system is ($q_0$), but also *where it's going* ($p_0$). Because the laws of mechanics are deterministic, this single point is enough to determine the entire past and future trajectory.

2.  **Trajectories Never Cross.** If two trajectories were to cross at a point $(q, p)$, it would imply that from that single state, the system could evolve in two different ways. This violates the determinism of classical mechanics. Each point in phase space has a unique "velocity" vector $(\dot{q}, \dot{p})$ tangent to the trajectory passing through it.

3.  **Energy Contours are Trajectories.** For a conservative system, energy is constant. The system can only evolve to other states $(q, p)$ that have the same total energy. Therefore, the trajectory is confined to a level set (a contour line) of the Hamiltonian function $H(q, p) = E$. The phase portrait is simply a contour map of the energy landscape.
    $$H(q,p) = E = \text{constant}$$

4.  **The Flow is Governed by Hamilton's Equations.** The phase space is not static; a point representing the system flows along its trajectory. The velocity of this flow at any point $(q, p)$ is a vector field given by Hamilton's equations.
    $$
    \dot{q} = \frac{\partial H}{\partial p} \quad \text{and} \quad \dot{p} = -\frac{\partial H}{\partial q}
    $$
    These equations tell you precisely how $q$ and $p$ change over an infinitesimal time step, defining the path. Notice the elegant symmetry: the change in one coordinate is given by the derivative of the Hamiltonian with respect to the *other* coordinate (with a minus sign for $\dot{p}$).

## Worked example
**System:** A simple harmonic oscillator (mass $m$, spring constant $k$).

**1. Define the Hamiltonian:**
The kinetic energy is $T = \frac{1}{2}m\dot{q}^2 = \frac{p^2}{2m}$. The potential energy is $V = \frac{1}{2}kq^2$.
The Hamiltonian $H$ is the total energy:
$$H(q, p) = T + V = \frac{p^2}{2m} + \frac{1}{2}kq^2$$

**2. Define the Trajectory Equation:**
For a given constant energy $E$, the system must satisfy $H(q,p) = E$.
$$\frac{p^2}{2m} + \frac{1}{2}kq^2 = E$$
To see the geometry, we rearrange this into the standard form for an ellipse, $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$.
$$\frac{q^2}{2E/k} + \frac{p^2}{2mE} = 1$$
This is an ellipse in the $(q,p)$ plane centered at the origin. The semi-major axis in $q$ is $a = \sqrt{2E/k}$ (the maximum displacement) and the semi-major axis in $p$ is $b = \sqrt{2mE}$ (the maximum momentum).

**3. Determine the Direction of Flow:**
We use Hamilton's equations to find the phase space velocity vector $(\dot{q}, \dot{p})$.
$$\dot{q} = \frac{\partial H}{\partial p} = \frac{\partial}{\partial p} \left( \frac{p^2}{2m} + \frac{1}{2}kq^2 \right) = \frac{p}{m}$$
$$\dot{p} = -\frac{\partial H}{\partial q} = -\frac{\partial}{\partial q} \left( \frac{p^2}{2m} + \frac{1}{2}kq^2 \right) = -kq$$
Let's test a point. Consider a point in the first quadrant, where $q > 0$ and $p > 0$.
- $\dot{q} = p/m > 0$, so $q$ is increasing (moving to the right).
- $\dot{p} = -kq < 0$, so $p$ is decreasing (moving down).
Moving right and down from the first quadrant traces a clockwise path. This holds for the entire ellipse.

**4. Sketch the Phase Portrait:**
The phase portrait is a set of nested ellipses, centered at the origin, with arrows indicating clockwise flow. The larger the ellipse, the higher the energy $E$ of the oscillator.

**Reflection:**
- Step 1 translated the physical system into the Hamiltonian language.
- Step 2 used the principle of energy conservation to find the geometric shape of the path in phase space.
- Step 3 used the fundamental equations of motion (Hamilton's equations) to determine the *direction* of travel along that path.
- Step 4 generalized from a single trajectory to the full portrait, showing all possible motions.

## Diagrams
Here is the phase portrait for the simple harmonic oscillator.

```text
      p
      ^
      |
 b ---|----------,
      |        ,' ',
      |      ,'     ',
      |     /    <--  \
      |    ;           ;
 -----|----o----------->---- q
-a    |    ;           ;    a
      |     \   -->   /
      |      ',     ,'
      |        ', ,'
-b ---|----------'
      |
```
The diagram shows a single elliptical trajectory for a constant energy $E$. The axes are position $q$ and momentum $p$. The arrows indicate the clockwise flow of the system's state over time. A full phase portrait would be a series of such ellipses nested inside one another.

## Memory technique — remember this forever
1.  **Mnemonic:** "Phase Space is a **State Place**." A map where each location is a complete state. The trajectory is the **Fated Path** determined by energy.

2.  **Must-Know Formulas:** Overlearn these until they are automatic.
    - The state: $(q, p)$
    - The path equation: $H(q, p) = E$
    - The flow equations: $\dot{q} = \frac{\partial H}{\partial p}, \quad \dot{p} = -\frac{\partial H}{\partial q}$

3.  **Spaced Repetition Schedule:** Re-derive the SHO example from scratch on these days: Day 1, Day 3, Day 7, Day 16, Day 35.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    - **What is the space?** It must contain all information. That means position $q$ and momentum $p$.
    - **What path does the system take?** For a conservative system, energy is constant. So write down the energy $E = T(p) + V(q)$. This equation *is* the path.
    - **Which way does it go?** Think about the definitions. $\dot{q}$ is velocity, which is related to $p$ (e.g., $p/m$). $\dot{p}$ is the rate of change of momentum, which is force. Force is related to potential ($F = -dV/dq$). This logic will allow you to reconstruct the direction of flow even if you forget Hamilton's formal equations.

## Common mistakes
1.  **Confusing Phase Space with Configuration Space.** Plotting a trajectory in the $(q, \dot{q})$ plane is common, but it's not phase space. Phase space uses momentum $p$, not velocity $\dot{q}$. For simple systems $p=m\dot{q}$, they look similar, but for complex systems with generalized coordinates, they are very different.
2.  **Drawing Flow in the Wrong Direction.** Always check the direction using Hamilton's equations or first principles. A common mistake is to draw the SHO flow as counter-clockwise.
3.  **Assuming Trajectories Can Cross.** They cannot. If your sketch shows crossing paths (outside of a fixed point), it is incorrect. This would violate the uniqueness of solutions to the equations of motion.
4.  **Forgetting the Axes.** A phase portrait without labeled axes ($q$ and $p$) is meaningless.

## Self-check
1.  A free particle has $V(q)=0$. What is its Hamiltonian? Sketch its phase portrait. What kind of motion do the trajectories represent?
2.  A particle is dropped from rest at height $h$ in a uniform gravitational field, $V(q)=mgq$. Sketch its specific phase space trajectory until it hits the ground at $q=0$.
3.  Sketch the phase portrait for a particle with potential energy $V(q) = -\frac{1}{2}q^2 + \frac{1}{4}q^4$. Identify the equilibrium points (where $\dot{q}=0, \dot{p}=0$). Classify them as stable or unstable based on the nearby flow.