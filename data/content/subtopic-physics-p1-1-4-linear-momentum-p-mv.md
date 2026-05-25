## What it is
Linear momentum is a measure of an object's "mass in motion." It is a vector quantity, defined as the product of an object's mass and its velocity. An object can have a large momentum if it has a large mass, a large velocity, or both.

## Why it matters
Momentum is central to one of the most powerful concepts in physics: conservation laws. The Law of Conservation of Momentum states that the total momentum of an isolated system remains constant, which is the principle behind rocket propulsion (expelling exhaust mass backward to move the rocket forward). In computer science, collision detection and response in physics engines for games and simulations are built directly on calculations of momentum transfer.

## When to study it
You must have a solid grasp of basic kinematics and Newton's Laws of Motion. Specifically, you need to be fluent with the concepts of mass ($m$), velocity ($\vec{v}$), acceleration ($\vec{a}$), and force ($\vec{F}$). If you are not comfortable with vectors and Newton's Second Law ($\vec{F}=m\vec{a}$), review them first.

## How to study it (step by step)
1.  **Revisit Newton's Second Law.** Newton's original formulation was not $\vec{F}=m\vec{a}$. He stated that the net force is proportional to the rate of change of the "quantity of motion," which is what we now call momentum. Start by seeing the law in this more fundamental form.
2.  **Derive the relationship.** Start with the definition $\vec{p} = m\vec{v}$. Take the time derivative of both sides, $\frac{d\vec{p}}{dt}$. Apply the product rule. For the common case where mass is constant, show how this simplifies to $\vec{F}=m\vec{a}$. This connects the new concept to what you already know.
3.  **Solve one-dimensional problems.** Calculate the momentum of a 1500 kg car moving at 20 m/s. Then calculate the momentum of a 0.008 kg bullet moving at 400 m/s. Compare them. This builds intuition for the trade-off between mass and velocity.
4.  **Focus on the vector nature.** Calculate the momentum of a 2 kg object with velocity $\vec{v} = (3\hat{i} - 4\hat{j})$ m/s. Find the magnitude and direction of the momentum vector. This will prevent you from treating momentum as a scalar.
5.  **Analyze change in momentum.** Consider a 0.5 kg ball hitting a wall at 10 m/s and bouncing back at 8 m/s. Calculate the change in momentum, $\Delta\vec{p} = \vec{p}_f - \vec{p}_i$. Pay close attention to the signs (directions). This is the key to understanding impulse.

## Key ideas, with intuition
*   **Momentum is "Inertia in Motion".**
    You know that inertia (mass, $m$) is an object's resistance to a *change* in its state of motion. Momentum ($\vec{p}$) is the amount of motion it currently *has*. A heavy truck moving slowly and a light bullet moving quickly can have the same momentum—the same "quantity of motion" that must be dealt with to stop them.
    $$ \vec{p} = m\vec{v} $$

*   **Force is the Rate of Change of Momentum.**
    This is the truest form of Newton's Second Law. To change an object's momentum, you must apply a net external force. A small force applied for a long time can produce the same change in momentum as a large force applied for a short time.
    $$ \vec{F}_{net} = \frac{d\vec{p}}{dt} $$
    This explains why catching a fast baseball stings: your hand applies a large force over a short time to bring the ball's momentum to zero. If you move your hand back as you catch it, you increase the time, which decreases the force required.

*   **Momentum is a Vector.**
    Direction is non-negotiable. Two cars of identical mass and speed moving toward each other in a head-on collision have a total system momentum of zero. Their individual momenta are equal in magnitude but opposite in direction, so they cancel out when added as vectors.
    $$ \vec{p}_{total} = \vec{p}_1 + \vec{p}_2 = m\vec{v} + m(-\vec{v}) = \vec{0} $$

## Worked example
**Problem:** A 0.15 kg baseball is thrown with a velocity of 40 m/s in the positive x-direction. It is struck by a bat, after which its velocity is 55 m/s in the negative x-direction. What is the change in momentum ($\Delta\vec{p}$) of the ball?

**Solution:**
1.  **Identify the goal.** We need to find the change in momentum, which is defined as the final momentum minus the initial momentum: $\Delta\vec{p} = \vec{p}_f - \vec{p}_i$.

2.  **Define a coordinate system.** Let the initial direction of the ball be the positive x-direction ($+\hat{i}$). Therefore, the final direction is the negative x-direction ($-\hat{i}$).

3.  **Calculate the initial momentum ($\vec{p}_i$).**
    Use the definition $\vec{p} = m\vec{v}$.
    $m = 0.15$ kg
    $\vec{v}_i = 40 \hat{i}$ m/s
    $$ \vec{p}_i = (0.15 \text{ kg})(40 \hat{i} \text{ m/s}) = 6.0 \hat{i} \text{ kg} \cdot \text{m/s} $$

4.  **Calculate the final momentum ($\vec{p}_f$).**
    The velocity is now in the negative direction.
    $\vec{v}_f = -55 \hat{i}$ m/s
    $$ \vec{p}_f = (0.15 \text{ kg})(-55 \hat{i} \text{ m/s}) = -8.25 \hat{i} \text{ kg} \cdot \text{m/s} $$

5.  **Calculate the change in momentum ($\Delta\vec{p}$).**
    Subtract the initial vector from the final vector.
    $$ \Delta\vec{p} = \vec{p}_f - \vec{p}_i = (-8.25 \hat{i}) - (6.0 \hat{i}) $$
    $$ \Delta\vec{p} = -14.25 \hat{i} \text{ kg} \cdot \text{m/s} $$

**Reflection:** Each step was necessary. Defining the coordinate system (Step 2) was crucial for assigning the correct signs to the velocities. Calculating initial and final momentum separately (Steps 3 & 4) kept the work organized. The final vector subtraction (Step 5) correctly showed that the change in momentum was large and directed opposite to the ball's initial motion, which makes intuitive sense—the bat had to provide a large force in that direction to cause such a drastic change.

## Diagrams
Here is a vector diagram for the worked example. It shows the initial and final momentum vectors, and the resulting change in momentum vector $\Delta \vec{p}$.

```text
Before Bat Hit:
                  pi
   -------------->
   (pi = +6.0 i)

After Bat Hit:
        pf
<--------------
(pf = -8.25 i)


Change in Momentum (Δp = pf - pi):
To subtract pi, we add (-pi).
   (-pi)          pf
<---------- <--------------

Resulting Δp:
<-----------------------
   (Δp = -14.25 i)
```

## Memory technique — remember this forever
1.  **The Mnemonic:** Think of momentum, $\vec{p}$, as the "push" an object has. A massive, slow-moving object can have the same "push" as a light, fast-moving one. To change its "push", you need a force ($\vec{F}$) over time.

2.  **Formulas to Overlearn:**
    $$ \vec{p} = m\vec{v} $$
    $$ \vec{F}_{net} = \frac{d\vec{p}}{dt} $$

3.  **Spaced Repetition Schedule:** Review this concept and re-derive the formulas at these intervals:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget everything, rebuild from Newton's Second Law. You will always remember $\vec{F}=m\vec{a}$.
    *   Start: $\vec{F} = m\vec{a}$
    *   Recall the definition of acceleration: $\vec{a} = \frac{d\vec{v}}{dt}$
    *   Substitute: $\vec{F} = m \frac{d\vec{v}}{dt}$
    *   If mass $m$ is constant, you can bring it inside the derivative: $\vec{F} = \frac{d(m\vec{v})}{dt}$
    *   Define the quantity in the parentheses as momentum, $\vec{p} = m\vec{v}$. This recovers both core formulas.

## Common mistakes
*   **Forgetting it's a vector.** The most common error. When a ball bounces off a wall, its speed might be the same, but its velocity has reversed. The change in momentum is non-zero. Always assign a coordinate system and use signs or vector components.
*   **Confusing momentum and kinetic energy.** Momentum is $\vec{p}=m\vec{v}$ (a vector, linear in $v$). Kinetic energy is $K = \frac{1}{2}mv^2$ (a scalar, quadratic in $v$). They are not the same and are not conserved under the same conditions. An object can have momentum but zero kinetic energy is impossible (unless $m=0$), but a system can have zero total momentum with large kinetic energy (e.g., two cars in a head-on collision).
*   **Using inconsistent units.** Mass must be in kilograms (kg) and velocity in meters per second (m/s) to get the standard SI unit of momentum, kg·m/s. Do not use grams or km/h without converting first.

## Self-check
1.  A 2000 kg truck is moving at 10 m/s. A 1 kg peregrine falcon is diving at 90 m/s. Which has greater momentum? Calculate both values.
2.  A 0.05 kg golf ball is at rest. A club strikes it, and 0.001 seconds later, the ball is moving at 70 m/s. What was the change in the ball's momentum? What was the average force exerted by the club on the ball?
3.  Two particles, A and B, have the same kinetic energy. Particle A has four times the mass of particle B. What is the ratio of the magnitude of particle A's momentum to that of particle B ($p_A / p_B$)?