## What it is
Newton's Third Law states that forces always occur in pairs. For every "action" force that object A exerts on object B, there is an equal in magnitude and opposite in direction "reaction" force that object B exerts on object A. In short, you cannot touch without being touched back with the same force.

## Why it matters
This law is the fundamental principle behind propulsion. A rocket expels gas downwards (action), and the gas pushes the rocket upwards (reaction), allowing it to overcome gravity. It's also critical for understanding momentum conservation, collisions, structural analysis (forces within a bridge), and orbital mechanics (the gravitational pull of a satellite on a planet is matched by the planet's pull on the satellite).

## When to study it
You must have a solid grasp of Newton's First and Second Laws ($\sum \vec{F} = m\vec{a}$), the concept of vectors, and the ability to draw and interpret free-body diagrams. Without these, you will misapply the third law.

## How to study it (step by step)
1.  **Memorize the statement:** Write down "For every action, there is an equal and opposite reaction" and its mathematical form: $\vec{F}_{AB} = -\vec{F}_{BA}$. Verbally unpack this: "The force exerted *by object A on object B* is equal in magnitude and opposite in direction to the force exerted *by object B on object A*."

2.  **Identify pairs in a static case:** Place a book on a table. Draw two separate free-body diagrams: one for the book, and one for the table. Identify the two primary action-reaction pairs:
    *   Pair 1 (Gravity): The Earth pulls the book down ($\vec{F}_{Earth, book}$). The book pulls the Earth up ($\vec{F}_{book, Earth}$).
    *   Pair 2 (Contact): The table pushes the book up ($\vec{N}_{table, book}$). The book pushes the table down ($\vec{F}_{book, table}$). Notice the pairs act on *different* objects.

3.  **Address the acceleration misconception:** Consider a person pushing a large crate across a floor. The person pushes the crate (action), and the crate pushes the person back (reaction). If these forces are equal, why does the crate move? Answer this by drawing a free-body diagram for the crate *only*. The forces on the crate are the push from the person and friction from the floor. Its acceleration depends on the *net force on the crate*. The reaction force (crate pushing person) acts on the person, not the crate, so it doesn't affect the crate's acceleration.

4.  **Solve a simple two-body problem:** Work through the example of two blocks, $m_1$ and $m_2$, being pushed by a single external force. Calculate the acceleration of the system and then the magnitude of the internal action-reaction force between the blocks. This will solidify the idea of internal vs. external forces.

5.  **Apply to non-contact forces:** Imagine the Earth and the Moon. Draw the force vectors. The Earth pulls on the Moon with force $\vec{F}_{E,M}$. The Moon pulls on the Earth with force $\vec{F}_{M,E}$. By the third law, $\vec{F}_{E,M} = -\vec{F}_{M,E}$. The magnitudes are identical. Why does the Moon orbit the Earth and not the other way around? Because $m_{Earth} \gg m_{Moon}$, so the same force produces a much smaller acceleration on the Earth ($a=F/m$).

## Key ideas, with intuition
*   **Forces are interactions between two objects.** A force is not a property of a single object. It is a push or a pull that arises from the interaction *between* two objects. Therefore, forces must come in pairs.

*   **Action-reaction pairs act on different objects.** This is the most critical concept. The "action" and "reaction" forces never act on the same object. Therefore, they can *never* cancel each other out when analyzing the motion of a single object. The motion of an object is determined by the sum of forces acting *on it*, not by forces it exerts on other things.
    $$ \text{For object A: } \sum \vec{F}_{on A} = m_A \vec{a}_A $$
    $$ \text{For object B: } \sum \vec{F}_{on B} = m_B \vec{a}_B $$
    The force $\vec{F}_{BA}$ appears in the first sum. The force $\vec{F}_{AB}$ appears in the second sum. They don't appear in the same equation.

*   **The forces are always equal in magnitude.** It does not matter if one object is a sledgehammer and the other is a tiny nail, or if one is a planet and the other is a pebble. In the moment of interaction, the force the hammer exerts on the nail is exactly equal in magnitude to the force the nail exerts on the hammer. The *effects* (acceleration) are different because of their different masses.
    $$ |\vec{F}_{AB}| = |\vec{F}_{BA}| $$
    $$ a_A = \frac{|\vec{F}_{BA}|}{m_A} \quad \text{vs.} \quad a_B = \frac{|\vec{F}_{AB}|}{m_B} $$

*   **The pairs are of the same type.** The reaction to a gravitational force is another gravitational force. The reaction to an electrical force is another electrical force. The reaction to a normal force is another normal force.

## Worked example
**Problem:** A block of mass $m_1 = 3$ kg is pushed by a horizontal force $\vec{F}_{app}$ of magnitude 20 N. It is in contact with a second block of mass $m_2 = 5$ kg. The surface is frictionless. Find the acceleration of the system and the magnitude of the contact force between the blocks.

**Solution:**

1.  **Treat the system as a whole.** Since the blocks move together, we can consider them as a single object with total mass $M = m_1 + m_2 = 8$ kg. The only external horizontal force is $\vec{F}_{app}$.
    $$ \sum F_{ext} = M a $$
    $$ 20 \text{ N} = (8 \text{ kg}) a $$
    $$ a = \frac{20}{8} \text{ m/s}^2 = 2.5 \text{ m/s}^2 $$
    This is the acceleration of both blocks.

2.  **Isolate one block to find the internal force.** Let's draw the free-body diagram for $m_2$. The only horizontal force acting *on* $m_2$ is the contact force from $m_1$, which we'll call $\vec{F}_{12}$.
    $$ \sum F_{on \ m_2} = m_2 a $$
    $$ F_{12} = (5 \text{ kg})(2.5 \text{ m/s}^2) = 12.5 \text{ N} $$
    This is the "action" force.

3.  **Verify with the other block.** Now, draw the free-body diagram for $m_1$. There are two horizontal forces acting on it: the applied force $\vec{F}_{app}$ to the right (+) and the contact force from $m_2$, $\vec{F}_{21}$, to the left (-). By Newton's Third Law, $\vec{F}_{21} = -\vec{F}_{12}$, so its magnitude is also 12.5 N.
    $$ \sum F_{on \ m_1} = F_{app} - F_{21} = m_1 a $$
    $$ 20 \text{ N} - 12.5 \text{ N} = (3 \text{ kg})(2.5 \text{ m/s}^2) $$
    $$ 7.5 \text{ N} = 7.5 \text{ N} $$
    The result is consistent.

**Reflection:** Step 1 worked because internal forces (like the contact force between blocks) cancel out when considering the whole system. Step 2 worked because isolating an object allows us to relate the net force on it to its acceleration, revealing the magnitude of one of the internal forces. Step 3 confirms the result and demonstrates the application of the Third Law: $F_{12}$ acts on $m_2$ and $F_{21}$ acts on $m_1$. They are an action-reaction pair.

## Diagrams
A book on a table, showing the distinction between balanced forces and action-reaction pairs.

**Diagram 1: Free-Body Diagram of the Book**
```text
        ^ N_tb (Normal force from table on book)
        |
      +---+
      |   |
      +---+
        |
        v W_eb (Weight: force from Earth on book)
```
Here, for a stationary book, $\vec{N}_{tb} = -\vec{W}_{eb}$. These are balanced forces, but **not** an action-reaction pair because they both act on the same object (the book).

**Diagram 2: Identifying the Action-Reaction Pairs**
```text
     Book pushes down on table
     with force F_bt = -N_tb
           +-------+
           | Table |
           +-------+
               ^
               |
      (Reaction to N_tb)

     ----------------------------------

     Book pulls up on Earth
     with force F_be = -W_eb
           .-'-.
          /     \
         | Earth |
          \     /
           '-.-'
               ^
               |
      (Reaction to W_eb)
```
The true action-reaction pair for $\vec{N}_{tb}$ is $\vec{F}_{bt}$ (book on table). The true pair for $\vec{W}_{eb}$ is $\vec{F}_{be}$ (book on Earth). Notice the pairs connect two different objects.

## Memory technique — remember this forever
1.  **Mnemonic/Story:** "You can't punch a wall without the wall punching you back." The force is the same, but your hand is fragile and the wall is sturdy. The *force* is equal, the *outcome* is not. The force from your fist acts *on the wall*; the force from the wall acts *on your fist*. Different objects.

2.  **Formula to overlearn:**
    $$ \vec{F}_{AB} = -\vec{F}_{BA} $$
    (The vector force exerted by A on B is equal in magnitude and opposite in direction to the vector force exerted by B on A.)

3.  **Spaced Repetition Schedule:** Review this concept and re-derive the worked example at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget, rebuild it from the **Conservation of Momentum**. For an isolated system of two particles, A and B, the total momentum $\vec{p}_{sys} = \vec{p}_A + \vec{p}_B$ is constant. Therefore, its time derivative is zero.
    $$ \frac{d\vec{p}_{sys}}{dt} = \frac{d\vec{p}_A}{dt} + \frac{d\vec{p}_B}{dt} = 0 $$
    By Newton's Second Law, the net force on a particle is the rate of change of its momentum ($\vec{F} = d\vec{p}/dt$). The force on A is from B ($\vec{F}_{BA}$), and the force on B is from A ($\vec{F}_{AB}$).
    $$ \vec{F}_{BA} + \vec{F}_{AB} = 0 $$
    $$ \implies \vec{F}_{AB} = -\vec{F}_{BA} $$
    The Third Law is a direct consequence of the conservation of momentum.

## Common mistakes
1.  **Confusing action-reaction pairs with balanced forces.** For a book on a table, the upward normal force from the table and the downward force of gravity are balanced forces *on the book*. They are not an action-reaction pair. The reaction to the normal force is the book pushing *down on the table*.
2.  **Thinking equal forces mean zero acceleration.** The "horse and cart" problem. The horse pulls the cart forward, and the cart pulls the horse backward with an equal force. The system moves because the horse also pushes the ground backward with its hooves, and the ground pushes the horse forward (action-reaction). The forward push from the ground on the horse is greater than the backward pull from the cart on the horse, so the horse accelerates. You must analyze the forces *on each object separately*.
3.  **Assuming the more massive object exerts a greater force.** When a truck hits a fly, the force the truck exerts on the fly is *exactly equal* in magnitude to the force the fly exerts on the truck. The fly's acceleration is enormous ($a = F/m_{fly}$), while the truck's is negligible ($a = F/m_{truck}$).

## Self-check
1.  An apple hangs from the branch of a tree. Identify the two primary action-reaction pairs of forces involved. Draw two separate free-body diagrams to support your answer.
2.  You are floating in a canoe next to a dock. You push off the dock to move away. Use Newton's Third Law to explain why you move. What is the action? What is the reaction? Why doesn't the dock move (or move very little)?
3.  Two asteroids, $A$ ($m_A = 10^4$ kg) and $B$ ($m_B = 10^5$ kg), are in deep space. They exert a gravitational force on each other. Which asteroid experiences a greater magnitude of force? Which experiences a greater magnitude of acceleration? Calculate the ratio of their accelerations, $a_A/a_B$.