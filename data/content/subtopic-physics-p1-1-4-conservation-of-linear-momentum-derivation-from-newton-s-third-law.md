## What it is
Conservation of linear momentum states that for any system of interacting objects, the total momentum remains constant, provided no net external forces are acting on the system. In simpler terms, in an isolated "billiard ball universe," the total amount of directed motion never changes, it just gets redistributed among the balls during collisions.

## Why it matters
This principle is fundamental to analyzing any interaction involving motion, from particle collisions in the LHC to orbital mechanics. For rocket science, it is the core principle of propulsion: a rocket expels mass (exhaust gas) backward at high velocity, and by conservation of momentum, the rocket must gain an equal and opposite amount of momentum, propelling it forward. In computer science, physics engines for games and simulations rely on this principle to model collisions realistically.

## When to study it
You must have a solid grasp of these prerequisites. If not, master them first.
1.  **Newton's Laws of Motion:** Specifically, the second law in its momentum formulation ($F = \frac{dp}{dt}$) and the third law (action-reaction pairs, $F_{AB} = -F_{BA}$).
2.  **Definition of Linear Momentum:** You must know that momentum $\vec{p}$ is a vector quantity defined as the product of mass and velocity, $\vec{p} = m\vec{v}$.
3.  **Basic Calculus:** You need to understand that the derivative of a constant is zero.

## How to study it (step by step)
1.  **Revisit Newton's Second Law:** Write down Newton's second law as $\vec{F} = \frac{d\vec{p}}{dt}$. Internalize the meaning: a force is that which causes a change in momentum over time.
2.  **Isolate a Two-Body System:** Consider two particles, 1 and 2, interacting with each other but isolated from the rest of the universe. The only forces they feel are the ones they exert on each other: $\vec{F}_{12}$ (the force on particle 1 from particle 2) and $\vec{F}_{21}$ (the force on particle 2 from particle 1).
3.  **Apply Newton's Laws:** Write the second law for each particle:
    *   $\vec{F}_{12} = \frac{d\vec{p}_1}{dt}$
    *   $\vec{F}_{21} = \frac{d\vec{p}_2}{dt}$
    Now, apply Newton's third law, which states that these internal forces are an action-reaction pair: $\vec{F}_{12} = -\vec{F}_{21}$.
4.  **Derive the Conservation Law:** Substitute the expressions from step 3 into the third law:
    $$ \frac{d\vec{p}_1}{dt} = -\frac{d\vec{p}_2}{dt} $$
    Rearrange the equation so all terms are on one side:
    $$ \frac{d\vec{p}_1}{dt} + \frac{d\vec{p}_2}{dt} = 0 $$
    Using the sum rule for derivatives, combine the terms:
    $$ \frac{d}{dt}(\vec{p}_1 + \vec{p}_2) = 0 $$
    This equation says that the time derivative of the total momentum of the system ($\vec{P}_{\text{total}} = \vec{p}_1 + \vec{p}_2$) is zero. The only way the derivative of a quantity can be zero is if that quantity is constant. Therefore, $\vec{P}_{\text{total}} = \text{constant}$. This is the law of conservation of linear momentum for a two-body system.
5.  **Generalize:** Extend this logic to a system of N particles. The total force on any particle $i$ is the sum of forces from all other particles $j$ plus any external force: $\vec{F}_i = \sum_{j \neq i} \vec{F}_{ij} + \vec{F}_{i, \text{ext}}$. The rate of change of the total momentum is $\frac{d\vec{P}_{\text{total}}}{dt} = \sum_i \frac{d\vec{p}_i}{dt} = \sum_i \vec{F}_i$. By Newton's third law, all internal forces cancel in pairs ($\vec{F}_{ij} + \vec{F}_{ji} = 0$), so the sum of all internal forces is zero. The only remaining term is the sum of external forces. Thus, $\frac{d\vec{P}_{\text{total}}}{dt} = \sum \vec{F}_{\text{ext}}$. If the system is isolated, $\sum \vec{F}_{\text{ext}} = 0$, and total momentum is conserved.
6.  **Solve a Problem:** Find a simple 1D inelastic collision problem (e.g., two carts sticking together) and solve it by equating the total initial momentum to the total final momentum.

## Key ideas, with intuition
1.  **Momentum is "Inertia in Motion":** A truck is hard to stop (high inertia), but a parked truck has zero momentum. A moving truck has massive momentum. It's a measure of how much "oomph" an object's motion has, and it has a direction.
2.  **Forces are Momentum Faucets:** Think of force not just as a push or pull, but as a rate of transfer of momentum. Applying a force to an object is like opening a faucet that pours momentum into it (or drains it out).
3.  **Newton's Third Law Guarantees a Closed System:** The action-reaction law is the key to the derivation. It ensures that for any momentum particle A gives to particle B, particle B gives an equal and opposite amount of momentum back to A. Within the system, momentum is just shuffled around; no new momentum is created, and none is lost. The net change is always zero.
    $$ \Delta \vec{p}_1 = -\Delta \vec{p}_2 \implies \Delta \vec{p}_1 + \Delta \vec{p}_2 = 0 $$
4.  **The System Must Be Isolated:** This is the most important condition. If an external force like friction or gravity acts on the system, it's like an external faucet pouring momentum in or draining it out. The total momentum inside will then change. Conservation only holds when $\sum \vec{F}_{\text{ext}} = 0$.

## Worked example
**Problem:** A 10,000 kg railroad freight car is coasting at 2.0 m/s. It collides and couples with a 20,000 kg freight car, which was initially at rest. Ignoring friction, what is the final velocity of the coupled cars?

**Solution:**
1.  **Define the system and state the principle.**
    The system consists of the two freight cars. Since friction is ignored, there are no net external horizontal forces. Therefore, the total linear momentum of the system is conserved.
2.  **Write the conservation of momentum equation.**
    The total momentum before the collision must equal the total momentum after the collision.
    $$ \vec{P}_{\text{initial}} = \vec{P}_{\text{final}} $$
    $$ m_1\vec{v}_{1,i} + m_2\vec{v}_{2,i} = (m_1 + m_2)\vec{v}_f $$
    Let's define the initial direction of motion as the positive x-direction.
3.  **Substitute known values.**
    *   $m_1 = 10,000$ kg
    *   $v_{1,i} = +2.0$ m/s
    *   $m_2 = 20,000$ kg
    *   $v_{2,i} = 0$ m/s
    $$ (10000 \text{ kg})(2.0 \text{ m/s}) + (20000 \text{ kg})(0 \text{ m/s}) = (10000 \text{ kg} + 20000 \text{ kg}) v_f $$
4.  **Solve for the unknown final velocity, $v_f$.**
    $$ 20000 \text{ kg} \cdot \text{m/s} + 0 = (30000 \text{ kg}) v_f $$
    $$ v_f = \frac{20000 \text{ kg} \cdot \text{m/s}}{30000 \text{ kg}} $$
    $$ v_f = \frac{2}{3} \text{ m/s} \approx 0.67 \text{ m/s} $$
The final velocity of the coupled cars is approximately 0.67 m/s in the original direction of motion.

**Reflection:**
*   Step 1 identified the core physics principle and its justification (isolated system).
*   Step 2 translated this principle into a mathematical equation, correctly identifying that the final mass is the sum of the initial masses because they couple.
*   Step 3 involved careful substitution of given data.
*   Step 4 was algebraic manipulation to find the result. The positive sign of the result confirms the direction is unchanged, as expected.

## Diagrams
A two-body interaction illustrating Newton's Third Law:

```text
System Boundary (Isolated)
---------------------------------------------
|                                           |
|      m1                  m2               |
|     <---- F_12         F_21 ---->         |
|      o ------------------ o               |
|                                           |
|   p1 = m1*v1           p2 = m2*v2         |
|                                           |
---------------------------------------------

Newton's Third Law: F_12 = -F_21
The force on body 1 from body 2 is equal in magnitude
and opposite in direction to the force on body 2 from body 1.
```

## Memory technique — remember this forever
1.  **The Story:** Imagine two astronauts floating in space, initially at rest. They push off each other. One goes left, the other goes right. Their individual momenta have changed, but because they started with zero total momentum, their new momenta must be equal and opposite ($\vec{p}_1 = -\vec{p}_2$) so that the total momentum of the *system* remains zero. The push was an *internal* force.
2.  **Must-learn Formulas:**
    *   $\vec{p} = m\vec{v}$ (The definition)
    *   $\sum \vec{F}_{\text{ext}} = \frac{d\vec{P}_{\text{total}}}{dt}$ (The cause of momentum change)
    *   If $\sum \vec{F}_{\text{ext}} = 0$, then $\vec{P}_{\text{initial}} = \vec{P}_{\text{final}}$ (The consequence)
3.  **Spaced Repetition Schedule:** Review this derivation and solve one problem on Day 1, Day 3, Day 7, Day 16, and Day 35.
4.  **First Principles Pathway:** If you forget the law, re-derive it.
    *   Start with two bodies, 1 and 2.
    *   Force on 1 from 2: $\vec{F}_{12} = d\vec{p}_1/dt$.
    *   Force on 2 from 1: $\vec{F}_{21} = d\vec{p}_2/dt$.
    *   Newton's Third Law: $\vec{F}_{12} = -\vec{F}_{21}$.
    *   Substitute: $d\vec{p}_1/dt = -d\vec{p}_2/dt$.
    *   Rearrange: $d/dt(\vec{p}_1 + \vec{p}_2) = 0$.
    *   Integrate: $\vec{p}_1 + \vec{p}_2 = \text{Constant}$.

## Common mistakes
1.  **Forgetting Vectors:** Momentum is a vector. In 2D or 3D problems, you must conserve momentum independently along each axis ($P_{x,i} = P_{x,f}$ and $P_{y,i} = P_{y,f}$). Do not just add magnitudes.
2.  **Ignoring External Forces:** Applying conservation of momentum when there is a clear net external force. For example, analyzing a car braking to a stop (friction is an external force) or a ball falling (gravity is an external force). The principle does not apply to the car or ball alone in these cases.
3.  **Confusing Momentum and Energy:** Kinetic energy ($K = \frac{1}{2}mv^2$) is a scalar and is *only* conserved in perfectly elastic collisions. Momentum is a vector and is conserved in *all* isolated collisions, elastic or inelastic. They are not interchangeable.

## Self-check
1.  A 1 kg ball moving at 5 m/s to the right hits a stationary 4 kg ball. The two balls stick together. What is their final velocity?
2.  A 2 kg rifle fires a 10 g (0.01 kg) bullet at a speed of 500 m/s. What is the recoil velocity of the rifle?
3.  A bomb, initially at rest, explodes into two pieces. A 3 kg piece flies off to the west at 100 m/s. The other piece has a mass of 1 kg. What is the velocity (magnitude and direction) of the 1 kg piece?