## What it is
Generalized momentum is the quantity whose rate of change is dictated by the forces in a system, as described within the Lagrangian framework. It is formally defined as the partial derivative of the Lagrangian with respect to a generalized velocity. A generalized force is the corresponding driver of this change, defined as the partial derivative of the Lagrangian with respect to a generalized coordinate.

## Why it matters
These concepts are the gateway to Hamiltonian mechanics, where phase space is described by coordinates and momenta, not coordinates and velocities. In aerospace, generalized forces correspond to torques and other influences that control a spacecraft's attitude. Understanding which generalized momenta are conserved is the key to simplifying complex dynamics problems, from orbital mechanics to the motion of robotic arms.

## When to study it
You must be comfortable with the principle of least action, the derivation of the Euler-Lagrange equation, and the concept of generalized coordinates ($q_j$). You should also have a solid grasp of multivariable calculus, particularly partial derivatives. If you cannot derive the Euler-Lagrange equation from scratch, review that first.

## How to study it (step by step)
1.  **Re-examine the Euler-Lagrange Equation.** Write it down: $\frac{d}{dt}\frac{\partial L}{\partial \dot{q}_j} - \frac{\partial L}{\partial q_j} = 0$. Stare at it. Recognize its structure is (Rate of change of something) - (Something else) = 0. This is a conservation law in disguise.
2.  **Isolate and Define Momentum.** Focus on the first term, specifically the part inside the time derivative: $p_j \equiv \frac{\partial L}{\partial \dot{q}_j}$. This is the *definition* of the generalized momentum conjugate to the coordinate $q_j$. Work out this derivative for a free particle ($L = \frac{1}{2}m\dot{x}^2$) to see that it recovers the familiar $p_x = m\dot{x}$.
3.  **Isolate and Define Force.** Now look at the second term: $Q_j \equiv \frac{\partial L}{\partial q_j}$. This is the *definition* of the generalized force corresponding to the coordinate $q_j$. With these definitions, the Euler-Lagrange equation becomes $\dot{p}_j = Q_j$. This now looks exactly like Newton's second law, $F = \dot{p}$.
4.  **Connect to Conservation.** Notice that if the Lagrangian $L$ does not explicitly depend on a coordinate $q_k$ (i.e., $\frac{\partial L}{\partial q_k} = 0$), then the Euler-Lagrange equation for that coordinate simplifies to $\dot{p}_k = 0$. This means the corresponding generalized momentum $p_k$ is conserved. A coordinate that does not appear in $L$ is called a *cyclic* or *ignorable* coordinate.
5.  **Solve a Problem with a Twist.** Model a simple pendulum, but use the horizontal displacement $x$ of the bob as the generalized coordinate, not the angle $\theta$. Find the generalized momentum and force for $x$. See for yourself that they are not the simple linear momentum and gravitational force. This builds intuition that these concepts depend entirely on the choice of coordinates.

## Key ideas, with intuition
1.  **Momentum is "Conjugate" to Velocity.** The definition $p_j = \frac{\partial L}{\partial \dot{q}_j}$ links a specific momentum $p_j$ to a specific velocity $\dot{q}_j$. They are a pair. If your generalized coordinate is an angle $\theta$, its conjugate momentum $p_\theta$ will be an angular momentum. If it's a position $x$, its conjugate momentum $p_x$ will be a linear momentum. The math tells you what kind of momentum it is.

2.  **Force is "Conjugate" to Position.** The definition $Q_j = \frac{\partial L}{\partial q_j}$ links a specific force $Q_j$ to a specific coordinate $q_j$. This $Q_j$ represents how the system's energy changes with a small displacement in $q_j$. If $q_j$ is an angle, $Q_j$ is a torque. If $q_j$ is a position, $Q_j$ is a conventional force.

3.  **Newton's Second Law in a New Suit.** The Euler-Lagrange equation is not magic; it's a powerful restatement of Newton's laws. The form $\dot{p}_j = Q_j$ makes this explicit.
    $$
    \frac{d}{dt}\underbrace{\left(\frac{\partial L}{\partial \dot{q}_j}\right)}_{p_j} = \underbrace{\frac{\partial L}{\partial q_j}}_{Q_j}
    $$
    This is the central idea: the time derivative of the generalized momentum is the generalized force.

4.  **Symmetry is Conservation.** This is the heart of Noether's Theorem. If the Lagrangian is unchanged by a change in a coordinate $q_j$ (e.g., shifting the whole system in the $x$ direction doesn't change its physics), then that coordinate is cyclic.
    $$
    \frac{\partial L}{\partial q_j} = 0 \implies Q_j = 0 \implies \dot{p}_j = 0 \implies p_j = \text{constant}
    $$
    A symmetry (invariance under translation in $q_j$) implies a conserved quantity (the conjugate momentum $p_j$). This is one of the deepest principles in physics.

## Worked example
**Problem:** A bead of mass $m$ slides on a frictionless wire rotating in a horizontal plane with constant angular velocity $\omega$. The bead is at a radial distance $r$ from the center. Find the generalized momentum and force for the coordinate $r$.

**Solution:**
1.  **Identify Generalized Coordinates.** The system has one degree of freedom, the radial position of the bead, $r$. The angle $\theta$ is not a degree of freedom because its motion is prescribed: $\theta(t) = \omega t$, so $\dot{\theta} = \omega$. Our generalized coordinate is $q_1 = r$.

2.  **Write the Lagrangian.** We need the kinetic energy $T$ and potential energy $V$.
    The velocity in polar coordinates is $\vec{v} = \dot{r}\hat{r} + r\dot{\theta}\hat{\theta}$.
    The kinetic energy is $T = \frac{1}{2}m|\vec{v}|^2 = \frac{1}{2}m(\dot{r}^2 + (r\dot{\theta})^2)$.
    Substitute $\dot{\theta} = \omega$: $T = \frac{1}{2}m(\dot{r}^2 + r^2\omega^2)$.
    Since the plane is horizontal, we can set potential energy $V=0$.
    The Lagrangian is $L = T - V = \frac{1}{2}m(\dot{r}^2 + r^2\omega^2)$.

3.  **Calculate Generalized Momentum.** The generalized momentum $p_r$ is conjugate to the velocity $\dot{r}$.
    $$
    p_r = \frac{\partial L}{\partial \dot{r}} = \frac{\partial}{\partial \dot{r}}\left[\frac{1}{2}m(\dot{r}^2 + r^2\omega^2)\right] = \frac{1}{2}m(2\dot{r}) = m\dot{r}
    $$
    In this case, the generalized momentum is just the familiar radial linear momentum.

4.  **Calculate Generalized Force.** The generalized force $Q_r$ is conjugate to the coordinate $r$.
    $$
    Q_r = \frac{\partial L}{\partial r} = \frac{\partial}{\partial r}\left[\frac{1}{2}m(\dot{r}^2 + r^2\omega^2)\right] = \frac{1}{2}m(2r\omega^2) = mr\omega^2
    $$
    This is the centrifugal force. The Lagrangian formalism automatically produces fictitious forces that arise in non-inertial frames.

5.  **Write the Equation of Motion.** Using $\dot{p}_r = Q_r$:
    $$
    \frac{d}{dt}(m\dot{r}) = mr\omega^2 \implies m\ddot{r} = mr\omega^2 \implies \ddot{r} = r\omega^2
    $$

**Reflection:**
- Step 1 defined the problem's space.
- Step 2 translated the physical system into the language of Lagrangian mechanics.
- Step 3 applied the formal definition of generalized momentum. It worked because we treated $\dot{r}$ as the variable and all other terms ($r$, $\omega$) as constants for the partial derivative.
- Step 4 did the same for the generalized force, treating $r$ as the variable. This step revealed a force (the centrifugal force) that is not from a potential but from the kinematics of the rotating system, which is elegantly captured by the Lagrangian.
- Step 5 assembled the pieces to recover the equation of motion, confirming our results are physically sensible.

## Diagrams
A simple pendulum, the canonical example for generalized coordinates.

```text
      |
      | O  <-- Pivot
      |/
      / \
     /   \ l
    /     \
   /   .   \
  /     θ)  \
 m ---------O <-- Bob
        |
        |
      (y=0)
```
Here, the generalized coordinate is the angle $\theta$. The generalized velocity is $\dot{\theta}$. The conjugate momentum $p_\theta$ is the angular momentum, and the conjugate force $Q_\theta$ is the torque due to gravity.

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of the Lagrangian $L(q, \dot{q}, t)$ as a "potential for dynamics". To find the players, you "differentiate with respect to the cast".
    - To find **Momentum**, you need **Motion** (velocity, $\dot{q}$). So, you differentiate $L$ with respect to $\dot{q}$.
    - To find **Force**, you need a **Position** to act on ($q$). So, you differentiate $L$ with respect to $q$.
    The dot in $\dot{q}$ for momentum is your visual hook.

2.  **Must-know formulas:**
    - Generalized momentum: $p_j = \frac{\partial L}{\partial \dot{q}_j}$
    - Generalized force: $Q_j = \frac{\partial L}{\partial q_j}$
    - Euler-Lagrange as Newton's Second Law: $\dot{p}_j = Q_j$

3.  **Spaced Repetition Schedule:** Review these definitions and the worked example at these intervals:
    - 1 day (tomorrow)
    - 3 days from now
    - 7 days from now
    - 16 days from now
    - 35 days from now
    Actively re-derive them each time.

4.  **First Principles Pathway:** If you forget everything, start with the Euler-Lagrange equation:
    $$
    \frac{d}{dt}\frac{\partial L}{\partial \dot{q}_j} - \frac{\partial L}{\partial q_j} = 0
    $$
    Remember that this is just $F=ma$ in a different form. The term with the time derivative must be related to momentum's rate of change, so the thing *inside* the derivative must be the momentum. The other term must be the force. This reconstructs the definitions from the equation of motion itself.

## Common mistakes
1.  **Assuming $p_j = m\dot{q}_j$.** This is only true in specific cases (e.g., Cartesian coordinates for a free particle). For a pendulum, $p_\theta = ml^2\dot{\theta}$, which is angular momentum. Always compute the derivative $\frac{\partial L}{\partial \dot{q}_j}$; do not guess.
2.  **Confusing Total and Partial Time Derivatives.** The Euler-Lagrange equation has a total time derivative $\frac{d}{dt}$ and partial derivatives $\frac{\partial}{\partial \dot{q}}$. When computing $\dot{p}_j = \frac{d}{dt}(\frac{\partial L}{\partial \dot{q}_j})$, remember that $\frac{\partial L}{\partial \dot{q}_j}$ can depend on both $q$ and $\dot{q}$, so the chain rule is often required.
3.  **Mistreating Constraints.** In the worked example, $\dot{\theta}=\omega$ was a given constraint, not a variable. If $\omega$ were not constant, $\theta$ would be another generalized coordinate with its own equation of motion. Be clear about which quantities are the true degrees of freedom.

## Self-check
1.  A particle of mass $m$ moves in a 2D plane. Write the Lagrangian in polar coordinates $(r, \theta)$. Find the generalized momenta $p_r$ and $p_\theta$. What familiar physical quantities do they represent?
2.  Consider a system described by the Lagrangian $L = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2) - \frac{1}{2}k(x^2 + (y-a)^2)$, where $a$ is a constant. Is either generalized momentum conserved? Why or why not?
3.  A particle of mass $m$ is constrained to move on the surface of a cone with its vertex at the origin, axis along the z-axis, and half-angle $\alpha$. Gravity acts in the $-z$ direction. Using cylindrical coordinates $(r, \phi, z)$, first use the cone constraint to eliminate one coordinate and write the Lagrangian in terms of the remaining two generalized coordinates. Then, identify any cyclic coordinates and state the corresponding conserved generalized momentum.