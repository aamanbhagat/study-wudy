## What it is
A perfectly inelastic collision is an interaction where two or more objects collide and stick together, moving as a single mass afterward. In this type of collision, linear momentum is conserved, but the maximum possible amount of kinetic energy is converted into other forms like heat, sound, and permanent deformation. This is the "stickiest" possible collision.

## Why it matters
This concept is fundamental to analyzing any system where objects merge. In aerospace, it models spacecraft docking, the impact of micrometeoroids on a satellite, or even the (undesirable) "lithobraking" — crashing into a planetary surface. The reverse process, an explosion or rocket stage separation, is an inelastic collision run backward, where internal energy is converted into kinetic energy.

## When to study it
You must have a solid grasp of two prerequisite concepts before tackling this:
1.  **Conservation of Linear Momentum:** The total momentum of an isolated system remains constant ($ \vec{p}_{total, i} = \vec{p}_{total, f} $).
2.  **Kinetic Energy:** The definition of kinetic energy as $K = \frac{1}{2}mv^2$.

If you are not comfortable deriving and applying these two ideas, pause and review them first.

## How to study it (step by step)
1.  **Master the definition:** Write down the defining characteristic: "After the collision, all objects have the same final velocity." For two bodies, $v_{1f} = v_{2f} = V_f$. Internalize that this is the non-negotiable constraint.
2.  **Derive the final velocity:** Start with the conservation of momentum for a two-body system: $m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$. Apply the constraint from step 1 to substitute $V_f$ for the final velocities and solve for $V_f$.
3.  **Derive the kinetic energy loss:** Write the expressions for the total initial kinetic energy, $K_i = \frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2$, and the total final kinetic energy, $K_f = \frac{1}{2}(m_1 + m_2)V_f^2$. The change in kinetic energy is $\Delta K = K_f - K_i$. Substitute your expression for $V_f$ from step 2 into the $K_f$ equation and prove to yourself that $\Delta K$ is always less than or equal to zero.
4.  **Solve a canonical problem:** Find and solve a "ballistic pendulum" problem. This combines a perfectly inelastic collision (bullet into block) with conservation of energy (pendulum swing), forcing you to correctly separate the two physics principles.
5.  **Connect to the Center of Mass (CoM) frame:** Re-derive the kinetic energy loss in the CoM reference frame. You will find that in this frame, the final kinetic energy is exactly zero. This is the deep reason why the KE loss is *maximal*: all kinetic energy relative to the center of mass has been dissipated.

## Key ideas, with intuition
1.  **Momentum is King:** In any collision within an isolated system, momentum is *always* conserved. This is a direct consequence of Newton's Third Law. It is your most reliable tool.
2.  **Energy is Fickle:** Kinetic energy is only conserved in perfectly *elastic* collisions. In an inelastic collision, work is done to deform the objects, generate heat, and create sound waves. This work drains energy from the kinetic "account" and moves it into the thermal "account". A perfectly inelastic collision is the most efficient at this conversion.
3.  **"Sticking Together" is the Physical Constraint:** The core idea is that the objects become one. This simplifies the momentum equation significantly, as there is only one final velocity to solve for.
    $$ m_1 \vec{v}_{1i} + m_2 \vec{v}_{2i} = (m_1 + m_2) \vec{V}_f $$
4.  **Maximum Loss means Minimum Final KE (in the CoM frame):** The total kinetic energy of a system can be split into two parts: the kinetic energy *of* the center of mass, and the kinetic energy *relative to* the center of mass.
    $$ K_{total} = K_{CoM} + K_{internal} $$
    The conservation of momentum dictates that the velocity of the center of mass, $v_{CoM}$, cannot change. Therefore, $K_{CoM} = \frac{1}{2} M_{total} v_{CoM}^2$ is constant. The only energy available to be "lost" is the internal kinetic energy, $K_{internal}$. A perfectly inelastic collision is one where the final internal kinetic energy is zero, because all constituent parts are stationary relative to each other. This is why the loss is maximal.

## Worked example
**Problem:** A 10 g bullet traveling at 400 m/s strikes a 2.0 kg block of wood resting on a frictionless surface. The bullet embeds itself in the block. What is the final velocity of the block-bullet system, and what percentage of the initial kinetic energy was lost?

**Solution:**

1.  **Identify the system and principles.**
    The system is the bullet and the block. The collision is perfectly inelastic because the bullet embeds in the block. We must use conservation of momentum. Let $m_b$ be the bullet mass and $m_w$ be the wood block mass.

2.  **Define initial and final states.**
    *   Initial: $m_b = 0.01$ kg, $v_{bi} = 400$ m/s. $m_w = 2.0$ kg, $v_{wi} = 0$ m/s.
    *   Final: The combined mass is $M = m_b + m_w = 2.01$ kg. The final velocity is $V_f$.

3.  **Apply Conservation of Momentum.**
    $$ p_i = p_f $$
    $$ m_b v_{bi} + m_w v_{wi} = (m_b + m_w) V_f $$
    $$ (0.01 \text{ kg})(400 \text{ m/s}) + (2.0 \text{ kg})(0 \text{ m/s}) = (2.01 \text{ kg}) V_f $$
    $$ 4.0 \text{ kg} \cdot \text{m/s} = (2.01 \text{ kg}) V_f $$
    $$ V_f = \frac{4.0}{2.01} \text{ m/s} \approx 1.99 \text{ m/s} $$
    *This step worked because momentum is always conserved in an isolated system, and the "sticking together" allowed us to combine the final masses.*

4.  **Calculate Initial Kinetic Energy ($K_i$).**
    $$ K_i = K_{bullet} + K_{wood} = \frac{1}{2}m_b v_{bi}^2 + \frac{1}{2}m_w v_{wi}^2 $$
    $$ K_i = \frac{1}{2}(0.01 \text{ kg})(400 \text{ m/s})^2 + 0 = 0.5 \times 0.01 \times 160000 \text{ J} = 800 \text{ J} $$
    *This is the total energy available to the system before the collision.*

5.  **Calculate Final Kinetic Energy ($K_f$).**
    $$ K_f = \frac{1}{2} M V_f^2 = \frac{1}{2}(2.01 \text{ kg})(1.99 \text{ m/s})^2 $$
    $$ K_f \approx \frac{1}{2}(2.01)(3.96) \text{ J} \approx 3.98 \text{ J} $$
    *This is the kinetic energy remaining in the combined object's bulk motion.*

6.  **Calculate the percentage loss.**
    $$ \text{Energy Lost} = K_i - K_f = 800 \text{ J} - 3.98 \text{ J} = 796.02 \text{ J} $$
    $$ \% \text{ Loss} = \frac{\text{Energy Lost}}{K_i} \times 100\% = \frac{796.02}{800} \times 100\% \approx 99.5\% $$
    *This final step quantifies the extreme inefficiency of the collision in preserving kinetic energy. The vast majority was converted to heat, sound, and the work of splintering wood.*

## Diagrams

**Before Collision:**
Two masses, $m_1$ and $m_2$, move independently.

```text
      v1 --->
   +-------+
   |  m1   |
   +-------+

                  v2 -->
               +-------+
               |  m2   |
               +-------+
-------------------------------------------> x-axis
```

**After Perfectly Inelastic Collision:**
The two masses are stuck together and move with a single final velocity, $V_f$.

```text
                      Vf --->
               +-------------+
               |   m1 + m2   |
               +-------------+
-------------------------------------------> x-axis
```

## Memory technique — remember this forever
1.  **Mnemonic/Hook:** "Perfectly **In**elastic = **In**separable." Think of two pieces of clay slamming into each other. They don't bounce; they become one inseparable lump.
2.  **Formulas to Overlearn:**
    *   Conservation of Momentum (inelastic case): $m_1 v_1 + m_2 v_2 = (m_1 + m_2) V_f$
    *   Kinetic Energy: $K = \frac{1}{2}mv^2$
3.  **Spaced Repetition Schedule:** Review this topic and solve one problem at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   Start with the most fundamental principle: $\sum \vec{p}_{initial} = \sum \vec{p}_{final}$.
    *   Write it for two bodies: $m_1\vec{v}_{1i} + m_2\vec{v}_{2i} = m_1\vec{v}_{1f} + m_2\vec{v}_{2f}$.
    *   Apply the single physical constraint for a perfectly inelastic collision: the objects stick together. This means they have a common final velocity: $\vec{v}_{1f} = \vec{v}_{2f} = \vec{V}_f$.
    *   Substitute this constraint into the momentum equation and solve for $\vec{V}_f$. You have just re-derived the key formula.

## Common mistakes
1.  **Conserving Kinetic Energy:** The most common mistake is to incorrectly apply conservation of kinetic energy to an inelastic collision. Remember: if they stick, KE is *not* conserved.
2.  **Algebraic Errors with Mass:** Forgetting to use the *combined* mass $(m_1 + m_2)$ for the final state kinetic energy and momentum calculations.
3.  **Ignoring Vectors:** In 1D, this means getting the signs wrong. Define a positive direction and stick to it. If an object moves left, its velocity is negative.
4.  **Confusing Frames:** The reason KE loss is "maximal" is best understood in the center-of-mass frame. However, most problems are solved in the lab frame. Do not mix calculations between frames unless you are explicitly performing a coordinate transformation.

## Self-check
1.  A 1000 kg car traveling east at 20 m/s collides with a 1500 kg truck traveling west at 10 m/s. They lock bumpers. What is their final velocity (magnitude and direction)?
2.  A 50 g dart is thrown at 15 m/s and embeds itself in a 450 g apple hanging from a string. What fraction of the dart's initial kinetic energy is lost in the collision?
3.  Two asteroids of equal mass $m$ are on a collision course. Asteroid A has velocity $\vec{v}$ and Asteroid B has velocity $-2\vec{v}$. They collide and stick together. In terms of $m$ and $v$, what is the total kinetic energy lost? Explain, without calculation, why this is not the maximum possible KE loss for this system.