## What it is
Angular momentum, denoted $\vec{L}$, is the rotational equivalent of linear momentum. It measures the quantity of rotational motion an object has, taking into account its mass, its velocity, and how that mass is distributed relative to the axis of rotation. An object can have angular momentum from orbiting a point or from spinning about its own center.

## Why it matters
Conservation of angular momentum is a fundamental principle governing everything from planetary orbits (Kepler's second law is a direct consequence) to the stability of galaxies. In aerospace, it is critical for attitude control of satellites and spacecraft; reaction wheels spin up or down to change the spacecraft's angular momentum, allowing it to point precisely without using thrusters. In quantum mechanics, the intrinsic angular momentum of particles (spin) is a foundational property that determines chemical bonding and magnetic phenomena.

## When to study it
Before tackling angular momentum, you must have a firm grasp of the following prerequisites. If any of these are weak, master them first.
*   **Linear Momentum:** The definition $\vec{p} = m\vec{v}$ and the impulse-momentum theorem $\vec{F}_{net} = \frac{d\vec{p}}{dt}$.
*   **Vector Cross Product:** The definition, properties (especially anti-commutativity), and the right-hand rule for determining the direction of the resultant vector.
*   **Rotational Kinematics:** Definitions of angular position $\theta$, angular velocity $\vec{\omega}$, and angular acceleration $\vec{\alpha}$.
*   **Moment of Inertia ($I$):** The concept of rotational inertia as the resistance to angular acceleration. You should be able to calculate $I = \sum m_i r_i^2$ for discrete masses and know the formulas for common shapes (disk, sphere, rod).
*   **Torque:** The definition $\vec{\tau} = \vec{r} \times \vec{F}$ and its role as the rotational analog of force.

## How to study it (step by step)
1.  **Master the General Definition.** Start with a single particle. Its angular momentum $\vec{L}$ about an origin $O$ is defined as $\vec{L} = \vec{r} \times \vec{p}$. Here, $\vec{r}$ is the position vector from $O$ to the particle, and $\vec{p} = m\vec{v}$ is its linear momentum. Use the right-hand rule to find the direction of $\vec{L}$. Solve two or three simple problems of a point mass moving in a straight line, calculating its angular momentum about a point not on its path.
2.  **Derive the Fixed-Axis Formula.** Now consider a rigid body rotating about a fixed axis (say, the z-axis) with angular velocity $\vec{\omega}$. Model the body as a collection of particles $m_i$. The total angular momentum is $\vec{L} = \sum_i \vec{L}_i = \sum_i (\vec{r}_i \times \vec{p}_i)$. For a particle moving in a circle of radius $r_{i,\perp}$ in the xy-plane, its velocity is $v_i = \omega r_{i,\perp}$. Show that for this specific motion, the z-component of its angular momentum is $L_{i,z} = m_i r_{i,\perp}^2 \omega$. Summing over all particles gives $L_z = (\sum_i m_i r_{i,\perp}^2) \omega$. Recognize the term in parentheses as the moment of inertia $I$ about the z-axis. Thus, for a rigid body rotating about a fixed axis of symmetry, $\vec{L} = I\vec{\omega}$.
3.  **Connect Torque and Angular Momentum.** This is the most crucial theoretical step. Take the time derivative of the general definition: $\frac{d\vec{L}}{dt} = \frac{d}{dt}(\vec{r} \times \vec{p})$. Apply the product rule for cross products: $\frac{d\vec{L}}{dt} = (\frac{d\vec{r}}{dt} \times \vec{p}) + (\vec{r} \times \frac{d\vec{p}}{dt})$. The first term is $(\vec{v} \times m\vec{v})$, which is zero since $\vec{v}$ is parallel to itself. The second term is $\vec{r} \times \vec{F}_{net}$, which is the definition of net torque $\vec{\tau}_{net}$. This yields the rotational form of Newton's second law: $\vec{\tau}_{net} = \frac{d\vec{L}}{dt}$.
4.  **Solve Conservation Problems.** The equation $\vec{\tau}_{net} = \frac{d\vec{L}}{dt}$ implies that if the net external torque on a system is zero, then $\frac{d\vec{L}}{dt} = 0$, meaning $\vec{L}$ is constant. This is the **Principle of Conservation of Angular Momentum**. Find and solve problems involving this principle: an ice skater pulling in their arms, a diver tucking into a ball, a student on a rotating stool with weights.
5.  **Distinguish the Two Formulas.** Explicitly state the conditions under which you use each formula. Use $\vec{L} = \vec{r} \times \vec{p}$ for point particles or when the origin is not on the axis of rotation. Use $\vec{L} = I\vec{\omega}$ for rigid bodies rotating about a fixed principal axis.

## Key ideas, with intuition
1.  **Angular Momentum is "Moment of Momentum".** The name is a clue. Just as torque $\vec{\tau} = \vec{r} \times \vec{F}$ is the "moment of force", angular momentum $\vec{L} = \vec{r} \times \vec{p}$ is the "moment of momentum". The vector $\vec{r}$ acts as a lever arm. A small momentum $\vec{p}$ far from the origin can create a large angular momentum, while a large momentum close to the origin may create a small one.
2.  **Direction Defines the Plane of Rotation.** The direction of $\vec{L}$ is not the direction of motion; it is perpendicular to the plane of rotation, defined by the right-hand rule. For a record spinning on a turntable, $\vec{\omega}$ and $\vec{L}$ point straight up or down along the spindle. This vector nature is why a spinning top or gyroscope resists being tilted: doing so requires changing the direction of $\vec{L}$, which requires a torque.
3.  **Conservation Dictates Stability.** If no external twisting forces (torques) act on a system, its angular momentum vector must remain constant in both magnitude and direction. This is why a spinning bullet or a well-thrown football is stable in flight. It's also why Earth's axis of rotation remains pointed at Polaris (mostly) over long periods.

    $$ \text{If } \vec{\tau}_{net, ext} = 0, \text{ then } \frac{d\vec{L}}{dt} = 0 \implies \vec{L}_{initial} = \vec{L}_{final} $$

4.  **$L=I\omega$ is the Rotational Analog of $p=mv$.** This is the clearest analogy.
    *   $p$: Linear momentum
    *   $m$: Inertia (resistance to change in linear velocity)
    *   $v$: Linear velocity
    ---
    *   $L$: Angular momentum
    *   $I$: Rotational Inertia (resistance to change in angular velocity)
    *   $\omega$: Angular velocity

## Worked example
**Problem:** A 70 kg student stands on a frictionless platform that is rotating at 0.80 rad/s. The student's arms are outstretched, and in this position, their moment of inertia (excluding the weights they hold) is 5.0 kg·m². They hold a 5.0 kg weight in each hand, 1.0 m from the axis of rotation. The student then pulls the weights inward to a position 0.20 m from the axis of rotation. What is the new angular speed of the student?

**Solution:**
1.  **Identify the principle.** The platform is frictionless, and the student pulling their arms in is an internal force. Therefore, there is no net external torque on the student-platform-weights system. Angular momentum is conserved: $L_{initial} = L_{final}$.

2.  **Define initial and final states.**
    *   Initial State (i): Arms outstretched.
    *   Final State (f): Arms pulled in.
    The conservation equation is $I_i \omega_i = I_f \omega_f$.

3.  **Calculate the initial moment of inertia, $I_i$.**
    This is the sum of the student's moment of inertia and the moment of inertia of the two weights. Treat the weights as point masses, where $I_{weight} = mr^2$.
    $$ I_i = I_{student} + I_{weights, i} $$
    $$ I_i = 5.0 \text{ kg·m}^2 + 2 \times (5.0 \text{ kg}) \times (1.0 \text{ m})^2 $$
    $$ I_i = 5.0 + 10.0 = 15.0 \text{ kg·m}^2 $$

4.  **Calculate the final moment of inertia, $I_f$.**
    The student's moment of inertia is assumed to be the same. Only the position of the weights changes.
    $$ I_f = I_{student} + I_{weights, f} $$
    $$ I_f = 5.0 \text{ kg·m}^2 + 2 \times (5.0 \text{ kg}) \times (0.20 \text{ m})^2 $$
    $$ I_f = 5.0 + 2 \times 5.0 \times 0.04 = 5.0 + 0.4 = 5.4 \text{ kg·m}^2 $$

5.  **Solve for the final angular speed, $\omega_f$.**
    $$ I_i \omega_i = I_f \omega_f $$
    $$ \omega_f = \frac{I_i \omega_i}{I_f} $$
    $$ \omega_f = \frac{(15.0 \text{ kg·m}^2)(0.80 \text{ rad/s})}{5.4 \text{ kg·m}^2} $$
    $$ \omega_f = \frac{12.0}{5.4} \text{ rad/s} \approx 2.22 \text{ rad/s} $$

**Reflection:**
Each step followed a logical progression. We started by identifying the core physical principle (conservation of angular momentum) because there were no external torques. We then calculated the system's rotational inertia in the initial and final states. By decreasing the moment of inertia (pulling mass closer to the axis of rotation), the angular velocity had to increase to keep the product $I\omega$ constant.

## Diagrams
Diagram 1: The general definition, $\vec{L} = \vec{r} \times \vec{p}$.

```text
        ^ z (L vector points out of page, along z-axis)
        |
        |          /
        |         /
        |        * m
        |       / \
        |      /   \--> p (momentum)
        |     /
        |    /
        +---/------------> y
       /   r (position vector)
      /
     v x
```
*Description: This shows the xy-plane. A particle `m` is located by position vector `r` from the origin. It has linear momentum `p`. By the right-hand rule (curl fingers from `r` to `p`), the angular momentum vector `L` points out of the page, along the positive z-axis.*

Diagram 2: A rigid body, $L_z = I_z \omega_z$.
```text
        ^ z-axis (axis of rotation)
        |
      .---.
     /     \ <---- Disk rotating with angular velocity ω
    |   ^   |
    |   | L |
    |   | ω |
     \     /
      '---'
        |
        +------------> y
       /
      /
     v x
```
*Description: A solid disk rotates about the central z-axis. Both the angular velocity vector $\vec{\omega}$ and the angular momentum vector $\vec{L}$ point along this axis of rotation. Their direction (up or down) is determined by the right-hand rule based on the direction of rotation.*

## Memory technique — remember this forever
1.  **Visual Hook:** Picture a planet in an elliptical orbit around a star. When it's far away (large $r$), it moves slowly (small $p_{\perp}$). When it swoops in close (small $r$), it moves very fast (large $p_{\perp}$). Its angular momentum $\vec{L} = \vec{r} \times \vec{p}$ stays constant, causing it to sweep out equal areas in equal times. This is Conservation of Angular Momentum in action.
2.  **Must Overlearn:**
    *   $\vec{L} = \vec{r} \times \vec{p}$ (The fundamental definition. Always true.)
    *   $L = I\omega$ (The practical formula for a rigid body rotating about a fixed axis of symmetry.)
    *   $\vec{\tau}_{net} = \frac{d\vec{L}}{dt}$ (The cause-and-effect relationship. Torque changes angular momentum.)
3.  **Spaced Repetition Schedule:** Review these formulas and the planet visual hook right now. Then again in **1 day**, **3 days**, **7 days**, **16 days**, and **35 days**. Do not just read them; write them down from memory.
4.  **First Principles Pathway:** If you forget $L=I\omega$, you can rebuild it. Start with the absolute definition $\vec{L} = \sum_i \vec{r}_i \times \vec{p}_i$. For a body rotating about the z-axis, a particle $i$ moves in a circle of radius $r_{i, \perp}$ with speed $v_i = \omega r_{i, \perp}$. Its momentum is $p_i = m_i v_i$. The vectors $\vec{r}_i$ and $\vec{p}_i$ are perpendicular, so the magnitude of the cross product is just $r_i p_i$. The z-component is $L_{i,z} = r_{i, \perp} p_i = r_{i, \perp} (m_i \omega r_{i, \perp}) = m_i r_{i, \perp}^2 \omega$. Summing over all particles gives $L_z = (\sum_i m_i r_{i, \perp}^2) \omega$, which is $I\omega$.

## Common mistakes
1.  **Cross Product Order:** Calculating $\vec{p} \times \vec{r}$ instead of $\vec{r} \times \vec{p}$. The cross product is anti-commutative, so this will flip the sign (and direction) of your answer. Always "lever arm cross momentum".
2.  **Misusing $L=I\omega$:** This formula is a special case. It applies to a rigid body rotating about a fixed axis. For a single particle moving in a straight line, you *must* use $\vec{L} = \vec{r} \times \vec{p}$. Do not try to assign a moment of inertia to a single particle in this context.
3.  **Confusing Angular and Linear Momentum:** In collision problems, check if external torques are zero (for conservation of $L$) and if external forces are zero (for conservation of $p$). Often, one is conserved but the other is not. For example, a bullet hitting a door hinged at one end: angular momentum about the hinge is conserved, but linear momentum is not because the hinge exerts an external force.
4.  **Forgetting $r$ is a vector from the origin.** The vector $\vec{r}$ is the position of the particle *relative to the point about which you are calculating the angular momentum*. A different origin gives a different angular momentum.

## Self-check
1.  A 10 g particle has a velocity vector $\vec{v} = (300 \hat{i} - 400 \hat{j})$ m/s. Calculate its angular momentum vector $\vec{L}$ about the origin when it is at the position $\vec{r} = (2 \hat{i} + 2 \hat{j})$ m.
2.  A solid sphere ($I = \frac{2}{5}MR^2$) and a thin-walled hollow sphere ($I = \frac{2}{3}MR^2$) have the same mass $M$ and radius $R$. If they are rotating about their centers with the same angular velocity $\omega$, what is the ratio of the hollow sphere's angular momentum to the solid sphere's angular momentum?
3.  A horizontal wooden rod of mass $M$ and length $L$ is pivoted at one end. It is initially at rest. A ball of clay of mass $m$ is fired with horizontal velocity $v$ and hits the free end of the rod, sticking to it. What is the angular velocity of the rod-clay system immediately after the collision?