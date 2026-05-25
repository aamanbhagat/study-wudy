## What it is
In a system of particles, total momentum is conserved if the net external force on the system is zero. However, even when a net external force exists, the component of momentum along any axis where the net external force component is zero *is still conserved*. Furthermore, during events that happen over a very short time (like collisions or explosions), the system's momentum is approximately conserved because the impulse from external forces is negligible compared to the impulse from the massive internal forces.

## Why it matters
This concept is critical for analyzing rocket staging and spacecraft maneuvers. Gravity is a constant external force, but for the brief, violent moment of stage separation, we can treat the system as if its momentum is conserved. In orbital mechanics, understanding how external forces like atmospheric drag or solar wind change a satellite's momentum is fundamental to station-keeping and trajectory planning.

## When to study it
You must have a firm grasp of these prerequisites:
1.  **Newton's Second Law:** In its momentum form, $\vec{F} = \frac{d\vec{p}}{dt}$.
2.  **Newton's Third Law:** For every action, there is an equal and opposite reaction ($\vec{F}_{12} = -\vec{F}_{21}$).
3.  **Definition of a System:** The ability to define a boundary around a set of objects and distinguish between internal and external forces.
4.  **Vector Components:** Decomposing vectors into orthogonal components (e.g., x, y, z).

If you are not confident with these, pause and review them. This lesson builds directly upon them.

## How to study it (step by step)
1.  **Derive the Master Equation:** Start with a system of N particles. Write Newton's Second Law for a single particle $i$: $\vec{F}_i = \frac{d\vec{p}_i}{dt}$. The total force $\vec{F}_i$ is the sum of external forces and internal forces from all other particles $j$: $\vec{F}_i = \vec{F}_{i, ext} + \sum_{j \neq i} \vec{F}_{ij}$. Sum this equation over all $N$ particles in the system.
2.  **Apply Newton's Third Law:** In the sum from step 1, notice that for every internal force $\vec{F}_{ij}$, there is a corresponding $\vec{F}_{ji}$. Since $\vec{F}_{ij} = -\vec{F}_{ji}$, all internal forces will cancel out in pairs. Show yourself that the sum of all internal forces is zero.
3.  **State the Result:** The surviving terms give the foundational equation for system momentum: $\sum \vec{F}_{ext} = \frac{d\vec{P}_{tot}}{dt}$, where $\vec{P}_{tot} = \sum \vec{p}_i$ is the total momentum of the system.
4.  **Analyze by Component:** Decompose the master equation into its x, y, and z components. For example, in the x-direction: $(\sum \vec{F}_{ext})_x = \frac{dP_{tot,x}}{dt}$. This is the key insight. If the sum of external forces in a particular direction is zero, the momentum in that direction is conserved, regardless of what happens in other directions.
5.  **Solve a Component Problem:** Find a textbook problem where an object slides down a frictionless wedge, which is itself on a frictionless floor. The system is {object, wedge}. Gravity is an external force, so vertical momentum is not conserved. However, there are no external horizontal forces, so horizontal momentum *is* conserved. Solve for the final velocities using this principle.
6.  **Introduce Impulse:** Integrate the master equation over a short time interval $\Delta t$: $\int_{t_1}^{t_2} \sum \vec{F}_{ext} dt = \vec{P}_{tot,2} - \vec{P}_{tot,1} = \Delta \vec{P}_{tot}$. The left side is the external impulse. For a very short $\Delta t$ (like a collision), this integral is nearly zero, even if $\vec{F}_{ext}$ is non-zero (like gravity). This justifies why we can ignore gravity during a car crash analysis.

## Key ideas, with intuition
1.  **The Master Equation: Newton's Law for Systems**
    The core relationship for any system of particles is:
    $$ \sum \vec{F}_{ext} = \frac{d\vec{P}_{tot}}{dt} $$
    *Intuition:* This says that the total momentum of a system can only be changed by forces from *outside* the system. Internal forces (like the forces between atoms in a billiard ball, or the explosive force between rocket stages) just move momentum around *within* the system, but they cannot change the total momentum of the system as a whole.

2.  **Conservation by Component: The Axis Isolation Principle**
    This vector equation is really three separate scalar equations:
    $$ (\sum \vec{F}_{ext})_x = \frac{dP_{tot,x}}{dt} \quad , \quad (\sum \vec{F}_{ext})_y = \frac{dP_{tot,y}}{dt} \quad , \quad (\sum \vec{F}_{ext})_z = \frac{dP_{tot,z}}{dt} $$
    *Intuition:* Think of a boat on a perfectly calm river. You can walk back and forth on the deck (y-direction), and the boat will move to conserve the system's y-momentum. A wind blowing across the river (x-direction) is an external force that changes the system's x-momentum. The wind has no effect on the y-momentum conservation between you and the boat. You can analyze motion along each axis independently.

3.  **Impulsive vs. Non-Impulsive Forces: The "Collision Exception"**
    During a very short event ($\Delta t \to 0$), like an explosion or collision, the internal forces are often immense ($\vec{F}_{int} \gg \vec{F}_{ext}$). The change in momentum is the impulse, $\vec{J} = \int \vec{F} dt$.
    $$ \Delta \vec{P}_{tot} = \int_{t_1}^{t_2} \sum \vec{F}_{ext} dt $$
    *Intuition:* Imagine a grenade exploding in mid-air. The force of gravity is about $9.8 \text{ N}$ per kg. The force of the explosion is thousands of Newtons, but lasts for a millisecond. The *impulse* from gravity during that millisecond ($J_g = F_g \Delta t$) is tiny and can be ignored. Therefore, the momentum of the cloud of fragments *just after* the explosion is equal to the momentum of the grenade *just before*.

## Worked example
**Problem:** A projectile of mass $M=3$ kg is fired with an initial velocity such that it reaches an apex height of $H=100$ m. At the apex, its velocity is purely horizontal with speed $v_x = 50$ m/s. At this exact moment, an internal explosion splits the projectile into two fragments. Fragment 1, with mass $m_1=1$ kg, is shot straight down with a speed of $v_{1f} = 30$ m/s. What is the velocity vector of fragment 2 ($m_2=2$ kg) immediately after the explosion?

**Solution:**
1.  **Define the system and forces:** The system is the projectile {fragment 1, fragment 2}. The only external force is gravity, $\vec{F}_g = -Mg\hat{j}$, acting in the vertical (y) direction.
2.  **Analyze momentum conservation by component:**
    *   **Horizontal (x-direction):** The external force of gravity has no x-component. $(\sum \vec{F}_{ext})_x = 0$. Therefore, the total momentum in the x-direction must be conserved before and after the explosion.
    *   **Vertical (y-direction):** There is a non-zero external force. However, the explosion happens over an infinitesimally short time interval. The impulse due to gravity during this interval is negligible. Therefore, we can *approximate* that vertical momentum is also conserved *during the explosion*.
3.  **Set up conservation equations:**
    *   Let $\vec{P}_i$ be the initial momentum and $\vec{P}_f$ be the final momentum. $\vec{P}_i = \vec{P}_f$.
    *   Initial momentum (at apex): $\vec{P}_i = M v_x \hat{i} = (3 \text{ kg})(50 \text{ m/s})\hat{i} = 150 \hat{i} \text{ kg m/s}$.
    *   Final momentum: $\vec{P}_f = \vec{p}_{1f} + \vec{p}_{2f} = m_1 \vec{v}_{1f} + m_2 \vec{v}_{2f}$.
4.  **Solve for the velocity of fragment 2, $\vec{v}_{2f}$:**
    *   We are given $\vec{v}_{1f} = -30 \hat{j}$ m/s. Let $\vec{v}_{2f} = v_{2x}\hat{i} + v_{2y}\hat{j}$.
    *   Equate initial and final momentum vectors:
        $$ 150 \hat{i} + 0 \hat{j} = (m_1 \vec{v}_{1f}) + (m_2 \vec{v}_{2f}) $$
        $$ 150 \hat{i} = (1 \text{ kg})(-30 \hat{j} \text{ m/s}) + (2 \text{ kg})(v_{2x}\hat{i} + v_{2y}\hat{j}) $$
        $$ 150 \hat{i} = -30 \hat{j} + 2v_{2x}\hat{i} + 2v_{2y}\hat{j} $$
5.  **Equate components:**
    *   **x-components:** $150 = 2v_{2x} \implies v_{2x} = 75$ m/s.
    *   **y-components:** $0 = -30 + 2v_{2y} \implies v_{2y} = 15$ m/s.
6.  **Final Answer:** The velocity of fragment 2 is $\vec{v}_{2f} = (75\hat{i} + 15\hat{j})$ m/s.

**Reflection:** The problem was solvable because we could isolate the conditions for conservation. Horizontal momentum was strictly conserved because there were no horizontal external forces. Vertical momentum was approximately conserved because the explosion was an impulsive event, allowing us to ignore the non-impulsive force of gravity during that instant.

## Diagrams
```text
Diagram 1: Projectile at Apex (Just Before Explosion)

        ^ y
        |
        |
        |      v_x -->
        * (M)
        |
        |
        +------------> x
        |
      F_g |
          V

System: Projectile (Mass M)
External Force: Gravity (F_g)
Initial Momentum: P_i = M * v_x * i_hat
```

```text
Diagram 2: Fragments (Just After Explosion)

        ^ y
        |
        |
        |           v_2y ^
        |                |   /
        |                * (m2) ---> v_2x
        |               /
        +------------> x
        |      * (m1)
        |      |
        |      V v_1f
        |
      F_g |
          V

System: {Fragment 1, Fragment 2}
External Force: Gravity (F_g)
Final Momentum: P_f = m1*v1 + m2*v2
Conservation: P_i = P_f (during the instant of explosion)
```

## Memory technique — remember this forever
1.  **Mnemonic:** **"Isolate The Axis."** When you see an external force, don't give up on momentum conservation entirely. Isolate the axis (or axes) perpendicular to the force. Momentum is safe there. For collisions, remember **"Impulsive Inside, Weak Outside,"** meaning internal forces are huge, external forces are weak by comparison over that short time.

2.  **Must-know formula:**
    $$ \sum \vec{F}_{ext} = \frac{d\vec{P}_{tot}}{dt} $$
    This is the source of truth. If the left side is zero (or a component is zero), then the corresponding total momentum (or its component) is constant.

3.  **Spaced Repetition Schedule:**
    *   Review this lesson in: **1 day**.
    *   Then again in: **3 days**.
    *   Then again in: **7 days**.
    *   Then again in: **16 days**.
    *   Final review in: **35 days**.
    Actively re-derive the master equation each time.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   Start with $\vec{F} = \frac{d\vec{p}}{dt}$ for one particle.
    *   Write it for a system of two particles: $\vec{F}_{1,ext} + \vec{F}_{21} = \frac{d\vec{p}_1}{dt}$ and $\vec{F}_{2,ext} + \vec{F}_{12} = \frac{d\vec{p}_2}{dt}$.
    *   Add the two equations. By Newton's Third Law, $\vec{F}_{12} + \vec{F}_{21} = 0$.
    *   You are left with $\vec{F}_{1,ext} + \vec{F}_{2,ext} = \frac{d(\vec{p}_1 + \vec{p}_2)}{dt}$, which is the master equation.

## Common mistakes
1.  **Global vs. Component Thinking:** Seeing gravity ($\vec{F}_g$) and immediately declaring "momentum is not conserved." This is wrong. Only the component of momentum *in the direction of gravity* is not conserved.
2.  **Misapplying the Impulse Approximation:** Assuming momentum is conserved for a block sliding down a ramp for 10 seconds just because there's a collision at the end. The approximation only works for the *instant* of the collision/explosion, not for the long process before or after.
3.  **System Boundary Errors:** In the worked example, if you define the system as just "fragment 1", its momentum is certainly not conserved, as the explosive force from fragment 2 is now an external force. Defining the system correctly is the first and most critical step.
4.  **Confusing Momentum and Energy:** In the worked example, total momentum was conserved, but kinetic energy was not. The explosion added a significant amount of kinetic energy to the system. They are separate conservation laws with different conditions.

## Self-check
1.  A hockey puck slides on perfectly frictionless ice and collides with the wall of the rink. The collision is perfectly elastic. Is the momentum of the puck conserved during the collision? Explain by analyzing the external forces and their components.
2.  A person is standing on a canoe in still water. They walk from the back of the canoe to the front. The system is {person, canoe}. Is the horizontal momentum of the system conserved? Is the vertical momentum conserved? (Hint: What force keeps the person and canoe from sinking?)
3.  A satellite in a stable circular orbit around the Earth fires its thrusters for 0.5 seconds in the direction of its velocity. Is the momentum of the satellite-and-expelled-gas system conserved during the burn? Why is it more accurate to use momentum principles here than to analyze the change in the gravitational force as it moves slightly farther from Earth during the burn?