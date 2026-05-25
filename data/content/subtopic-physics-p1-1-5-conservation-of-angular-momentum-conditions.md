## What it is
Conservation of angular momentum is a fundamental principle stating that the total angular momentum of a closed system remains constant over time. This means its rotational state—a combination of its mass, how that mass is distributed, and its angular velocity—will not change unless acted upon by a net external twisting force, known as a torque.

## Why it matters
This principle is crucial for controlling the orientation of satellites and spacecraft without using fuel, by employing internal reaction wheels or control moment gyroscopes. In astrophysics, it explains why collapsing gas clouds spin up to form stars and planetary disks. It's also a cornerstone of quantum mechanics, where the intrinsic angular momentum (spin) of particles is a conserved quantity in interactions.

## When to study it
You must have a solid grasp of the following before proceeding:
1.  **Newton's Second Law:** Both in its linear form ($\vec{F}_{\text{net}} = m\vec{a}$) and its momentum form ($\vec{F}_{\text{net}} = \frac{d\vec{p}}{dt}$).
2.  **Angular Momentum Definition:** For a point particle ($\vec{L} = \vec{r} \times \vec{p}$) and for a rigid body about a principal axis ($L = I\omega$).
3.  **Torque Definition:** $\vec{\tau} = \vec{r} \times \vec{F}$.
4.  **Rotational Analog of Newton's Second Law:** The relation $\vec{\tau}_{\text{net}} = \frac{d\vec{L}}{dt}$. If you are not able to derive this, you are not ready for this lesson.

## How to study it (step by step)
1.  **Derive the Condition:** Start with the rotational analog of Newton's Second Law, $\vec{\tau}_{\text{net}} = \frac{d\vec{L}}{dt}$. Ask yourself: "What mathematical condition makes a quantity constant?" The condition is that its time derivative is zero. Therefore, if $\vec{\tau}_{\text{net}} = \overrightarrow{0}$, then $\frac{d\vec{L}}{dt} = \overrightarrow{0}$, which mathematically implies $\vec{L} = \text{constant}$. This is the entire formal condition.
2.  **Internal vs. External Torques:** Consider a system of two particles interacting. By Newton's Third Law, the force particle 1 exerts on 2 ($\vec{F}_{12}$) is equal and opposite to the force particle 2 exerts on 1 ($\vec{F}_{21}$). The torques they exert on each other are $\vec{\tau}_{12} = \vec{r}_2 \times \vec{F}_{12}$ and $\vec{\tau}_{21} = \vec{r}_1 \times \vec{F}_{21}$. These internal torques do *not* necessarily cancel. However, for a *system*, the sum of all internal torques always cancels out. The key is that only *external* torques can change the *total* angular momentum of the system.
3.  **Solve the Skater Problem:** A figure skater is spinning with her arms out. Her moment of inertia is $I_i$ and angular velocity is $\omega_i$. She pulls her arms in, reducing her moment of inertia to $I_f < I_i$. The forces she uses to pull her arms in are internal to her body. Gravity and the normal force from the ice act vertically and produce no torque about her vertical spin axis. Therefore, $\vec{\tau}_{\text{net, ext}} = 0$. This means $L_i = L_f$, so $I_i \omega_i = I_f \omega_f$. Since $I_f < I_i$, it must be that $\omega_f > \omega_i$. Solve a numerical version of this.
4.  **Analyze a Collision:** Consider a stationary turntable (a disk) that is free to rotate. You throw a piece of clay, which hits the edge and sticks. Analyze the system of (turntable + clay). Is angular momentum conserved from just before impact to just after? Yes. The forces during the collision are internal to the system. There are no external torques about the axle. Therefore, the initial angular momentum of the clay is equal to the final angular momentum of the turntable-clay combination.

## Key ideas, with intuition
1.  **Torque is the agent of change for angular momentum.**
    This is the most important idea. Linear momentum ($\vec{p}$) is changed by a net external force ($\vec{F}$). Angular momentum ($\vec{L}$) is changed by a net external torque ($\vec{\tau}$). If there is no net external torque on a system, its angular momentum cannot change. Period.
    $$ \vec{\tau}_{\text{net, ext}} = \frac{d\vec{L}_{\text{sys}}}{dt} $$

2.  **The "System" is your choice, but you must be consistent.**
    You define the boundaries of your system. A motor spinning a flywheel: if the flywheel is your system, the motor provides an external torque, and $\vec{L}$ is not conserved. If the (flywheel + motor + power source + Earth) is your system, then all torques are internal, and the total angular momentum of this enormous system is conserved (the Earth's rotation changes by an infinitesimal amount). The key is to choose a system where the forces you don't know or care about are internal.

3.  **Conservation is a Vector Statement.**
    Angular momentum $\vec{L}$ is a vector. The conservation law $\vec{L}_{\text{initial}} = \vec{L}_{\text{final}}$ means conservation holds for each component separately. It's possible for a torque to exist in the x-y plane, changing $L_x$ and $L_y$, while $L_z$ remains perfectly conserved because there is no z-component of the torque. This is what happens in gyroscopic precession.

## Worked example
**Problem:** A turntable with a moment of inertia $I_d = 2.0 \, \text{kg} \cdot \text{m}^2$ rotates freely at an initial angular velocity of $\omega_i = 10.0 \, \text{rad/s}$ about a frictionless vertical axle. A piece of putty with mass $m_p = 0.5 \, \text{kg}$ is dropped from above and sticks to the turntable at a radius $r = 0.8 \, \text{m}$ from the center. What is the final angular velocity, $\omega_f$, of the turntable-putty system?

**Solution:**
1.  **Define the system.** Our system is the {turntable + putty}. The forces during the collision (friction, adhesion) are internal to this system. The external forces are gravity and the normal force from the axle, which are vertical and produce no torque about the vertical axis of rotation. Thus, $\tau_{\text{net, ext}} = 0$. Angular momentum is conserved.

2.  **Calculate Initial Angular Momentum ($L_i$).** Before the collision, only the turntable is rotating. The putty is falling vertically and has zero angular momentum about the axis of rotation.
    $$ L_i = L_{\text{disk}} + L_{\text{putty, initial}} = I_d \omega_i + 0 $$
    $$ L_i = (2.0 \, \text{kg} \cdot \text{m}^2)(10.0 \, \text{rad/s}) = 20.0 \, \text{kg} \cdot \text{m}^2/\text{s} $$

3.  **Calculate Final Moment of Inertia ($I_f$).** After the collision, the putty sticks to the turntable, forming a single rotating object. The total moment of inertia is the sum of the individual moments of inertia. We treat the putty as a point mass.
    $$ I_f = I_d + I_{\text{putty}} = I_d + m_p r^2 $$
    $$ I_f = 2.0 \, \text{kg} \cdot \text{m}^2 + (0.5 \, \text{kg})(0.8 \, \text{m})^2 $$
    $$ I_f = 2.0 + 0.5 \cdot 0.64 = 2.0 + 0.32 = 2.32 \, \text{kg} \cdot \text{m}^2 $$

4.  **Apply Conservation of Angular Momentum.**
    $$ L_i = L_f $$
    $$ 20.0 \, \text{kg} \cdot \text{m}^2/\text{s} = I_f \omega_f $$
    $$ 20.0 = (2.32 \, \text{kg} \cdot \text{m}^2) \omega_f $$
    $$ \omega_f = \frac{20.0}{2.32} \approx 8.62 \, \text{rad/s} $$

**Reflection:**
- Step 1 worked because we correctly identified a system where the messy interaction forces were internal, and the external forces (gravity) produced no torque about the axis of interest.
- Step 2 worked because we correctly identified the initial state of motion for all parts of the system.
- Step 3 worked because we correctly calculated the moment of inertia for the final composite object.
- Step 4 applied the conservation principle, which was justified in step 1, to connect the initial and final states and solve for the unknown.

## Diagrams
A figure skater demonstrating conservation of angular momentum.

```text
       Arms Outward                     Arms Inward
    (Large I, Small ω)               (Small I, Large ω)

          \ O /                           |O|
           /|\                           /|\
           / \                           / \
      <---- R ---->                     <r>

         L = Iω                        L = (I/k) * (kω)
```

Top-down view of the worked example.

```text
      Initial State                      Final State
  (Disk rotates, Putty falls)       (Disk + Putty rotate together)

           ω_i                                 ω_f
            ^                                   ^
            |                                   |
      /`---------`\                       /`---------`\
     /             \                     /           . <-- putty (m_p)
    |      (+)      |                   |      (+)----| r
     \             /                     \             /
      \`---------`/                       \`---------`/
          I_d                               I_f = I_d + m_p*r^2
```

## Memory technique — remember this forever
1.  **Mnemonic/Visual Hook:** The "Cosmic Figure Skater". Imagine a spinning deity in space. Without any external hand to push or twist her, she can change her spin *rate* by pulling galaxies closer or pushing them apart, but her *total amount of spin* (her angular momentum) is an immutable property of her being. **No external twist, no change in total spin.**

2.  **Must Overlearn:**
    *   The Law: $\vec{\tau}_{\text{net, ext}} = \frac{d\vec{L}_{\text{sys}}}{dt}$
    *   The Condition: If $\vec{\tau}_{\text{net, ext}} = \overrightarrow{0}$, then $\vec{L}_{\text{initial}} = \vec{L}_{\text{final}}$.

3.  **Spaced Repetition Schedule:** Review this concept and re-derive the main formula from first principles at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, rebuild it from $\vec{F} = \frac{d\vec{p}}{dt}$.
    *   Take the cross product with $\vec{r}$: $\vec{r} \times \vec{F} = \vec{r} \times \frac{d\vec{p}}{dt}$.
    *   The left side is torque, $\vec{\tau}$.
    *   Recall the definition $\vec{L} = \vec{r} \times \vec{p}$. Differentiate it using the product rule: $\frac{d\vec{L}}{dt} = \frac{d\vec{r}}{dt} \times \vec{p} + \vec{r} \times \frac{d\vec{p}}{dt}$.
    *   The first term is $\vec{v} \times (m\vec{v})$. Since $\vec{v}$ is parallel to itself, this cross product is zero.
    *   This leaves $\frac{d\vec{L}}{dt} = \vec{r} \times \frac{d\vec{p}}{dt}$.
    *   Equating the two results gives $\vec{\tau} = \frac{d\vec{L}}{dt}$. The conservation condition immediately follows.

## Common mistakes
1.  **Ignoring External Torques:** A classic mistake is applying conservation when there is a clear external torque. For example, if a chain unwraps from a cylinder and is pulled by gravity, the weight of the hanging part of the chain provides an external torque. You cannot use conservation of angular momentum for the cylinder.
2.  **Choosing the Wrong System:** A child runs and jumps onto a stationary merry-go-round. If you choose the merry-go-round as your system, the child exerts an external torque on it, and its angular momentum is not conserved. If you choose {child + merry-go-round} as the system, the torque is internal, and the total angular momentum *is* conserved.
3.  **Energy Confusion:** In the worked example, kinetic energy is *not* conserved. The collision where the putty sticks is inelastic. Students often mistakenly try to apply conservation of energy to problems where only momentum (linear or angular) is conserved.

## Self-check
1.  A figure skater has a moment of inertia of $4.0 \, \text{kg} \cdot \text{m}^2$ with her arms extended and is spinning at $2.0 \, \text{rev/s}$. She pulls her arms in, and her moment of inertia decreases to $1.2 \, \text{kg} \cdot \text{m}^2$. What is her new angular speed in revolutions per second?
2.  A large horizontal platform (moment of inertia $I_p$) is rotating at angular speed $\omega_i$. A person (mass $m$) is standing at the center. The person walks out to the edge of the platform, a distance $R$ from the center. What is the new angular speed of the platform? Treat the person as a point mass.
3.  A satellite is spinning about its z-axis. A small internal motor moves a weight from a position $(r, \theta, z)$ to a new position $(r, \theta, -z)$ in cylindrical coordinates. Does this action conserve the total angular momentum of the satellite? Does it conserve the angular momentum vector's z-component? Why might an engineer design such a mechanism?