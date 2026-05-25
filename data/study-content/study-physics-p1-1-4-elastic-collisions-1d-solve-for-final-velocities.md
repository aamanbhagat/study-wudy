## 1. What it is — in plain English

Imagine two perfectly bouncy balls, like super-dense rubber balls or ideal billiard balls, rolling towards each other on a perfectly smooth, frictionless table. When they hit, they don't squish and stay squished, nor do they make any permanent dents. Instead, they bounce off each other perfectly, like springs that compress and expand back to their original shape without losing any energy to heat or sound.

An "elastic collision" is a scientific way of describing this kind of perfectly bouncy interaction. In such a collision, two main things are conserved: the total "oomph" (which we call momentum) of the system, and the total "energy of motion" (which we call kinetic energy). Think of it like a trade-off: the balls exchange momentum and kinetic energy, but the total amount of each remains exactly the same before and after the collision.

When we say "1D," we mean the collision happens along a single straight line. The objects involved don't veer off to the sides; they just move back and forth along that line. This simplifies things a lot because we don't have to worry about angles or multiple directions.

Finally, "solve for final velocities" means our goal is to figure out how fast and in what direction each object is moving *after* they collide, given their initial speeds and directions, and their masses. It's like predicting the outcome of that billiard ball shot if you know everything about the balls just before impact.

## 2. Why it matters — real-world applications

Understanding elastic collisions, even in one dimension, is foundational because it simplifies complex multi-dimensional interactions and provides a baseline for understanding energy transfer.

1.  **Nuclear Physics and Particle Accelerators**: When scientists smash subatomic particles together in accelerators like the Large Hadron Collider, they are essentially studying collisions. While many of these are inelastic (particles might combine or break apart), the fundamental principles of momentum and energy conservation, derived from elastic collision theory, are crucial for analyzing the resulting particle tracks and determining the properties of new particles. This helps us understand the fundamental building blocks of the universe.
2.  **Material Science and Impact Testing**: Engineers design materials to withstand impacts. While real-world impacts are rarely perfectly elastic, the theoretical framework of elastic collisions helps establish upper bounds for energy transfer and stress. For example, understanding how a small object impacts a larger structure (like a micrometeoroid hitting a spacecraft shield) starts with elastic collision models to predict energy distribution and potential damage, informing the design of resilient materials for aerospace applications.
3.  **Sports Equipment Design**: The "bounciness" or "coefficient of restitution" of sports equipment (like golf balls, tennis rackets, or baseball bats) is directly related to how elastic a collision is. Manufacturers use these principles to design equipment that maximizes energy transfer for optimal performance. For instance, a golf club hitting a golf ball aims for a highly elastic collision to transfer maximum kinetic energy to the ball, sending it further.
4.  **Robotics and Autonomous Systems**: For robots to navigate and interact with their environment safely, especially in scenarios involving potential contact or pushing, predicting collision outcomes is vital. Simple elastic collision models can inform algorithms for path planning, obstacle avoidance, and even soft robotic interactions, ensuring robots don't damage themselves or their surroundings during accidental bumps.
5.  **Astronomy and Celestial Mechanics**: While planets don't "collide" in the same way billiard balls do, the gravitational interactions between celestial bodies can be modeled, in certain simplified contexts, using principles analogous to elastic collisions, particularly for understanding orbital changes due to close encounters (gravitational slingshots). The conservation laws of momentum and energy are fundamental to predicting the trajectories of spacecraft performing planetary flybys.

## 3. Prerequisites — what you must know first

Before diving deep into elastic collisions, ensure you have a solid grasp of these fundamental physics concepts:

*   **Mass**: A measure of an object's inertia, or its resistance to changes in motion. It's a scalar quantity, typically measured in kilograms (kg).
*   **Velocity**: The rate at which an object changes its position, including both its speed and its direction. It's a vector quantity, typically measured in meters per second (m/s).
*   **Momentum**: A measure of the "quantity of motion" an object possesses, defined as its mass multiplied by its velocity ($p = mv$). It's a vector quantity, and its direction is the same as the velocity.
*   **Kinetic Energy**: The energy an object possesses due to its motion, defined as half its mass multiplied by the square of its speed ($KE = \frac{1}{2}mv^2$). It's a scalar quantity, always positive, and measured in Joules (J).
*   **Conservation of Momentum**: In an isolated system (where no external forces act), the total momentum before a collision is equal to the total momentum after the collision. This is a fundamental principle in physics.
*   **Algebraic Manipulation**: The ability to rearrange and solve systems of equations, including quadratic equations and simultaneous linear equations. This is crucial for solving for unknown velocities.
*   **Vector Components (1D simplified)**: Understanding that in one dimension, direction is indicated by the sign of the velocity (e.g., positive for right/forward, negative for left/backward).

## 4. The core idea — step by step

The core idea behind solving 1D elastic collisions for final velocities rests on applying two fundamental conservation laws simultaneously. Because the collision is elastic, both momentum and kinetic energy are conserved. This gives us a system of two equations with two unknowns (the two final velocities), which we can then solve.

### Step 1: Conservation of Momentum

*   **Plain-English Statement**: In any collision, as long as no outside forces (like friction from the table or air resistance) interfere, the total "oomph" (momentum) of all the objects combined before the collision is exactly the same as the total "oomph" after the collision. It just gets redistributed among the objects.
*   **Small Concrete Example**: Imagine a 2 kg bowling ball moving right at 5 m/s and a 1 kg soccer ball moving left at 3 m/s. Their total momentum *before* they hit must equal their total momentum *after* they hit, regardless of what happens in between.
*   **Formal/Mathematical Version**:
    Let $m_1$ and $m_2$ be the masses of the two objects.
    Let $v_{1i}$ and $v_{2i}$ be their initial velocities (before collision).
    Let $v_{1f}$ and $v_{2f}$ be their final velocities (after collision).
    The principle of conservation of momentum states:
    $$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$$
    Remember that velocities ($v$) are signed quantities in 1D; if an object moves left, its velocity is negative.
*   **What Could Go Wrong**: Forgetting that velocity is a vector and not just speed. If an object is moving in the negative direction, its velocity value *must* be negative in the equation. Also, ensure units are consistent (e.g., all masses in kg, all velocities in m/s).

### Step 2: Conservation of Kinetic Energy

*   **Plain-English Statement**: In an *elastic* collision, not only is the total "oomph" conserved, but the total "energy of motion" (kinetic energy) of all the objects combined is also conserved. No energy is lost to heat, sound, or deformation; it's all perfectly transferred or retained as motion.
*   **Small Concrete Example**: Using the same bowling ball and soccer ball, the sum of their kinetic energies before they hit must equal the sum of their kinetic energies after they hit, because it's an elastic collision. If it were an inelastic collision (like two sticky balls), some energy would be lost as heat or sound, and this principle wouldn't hold.
*   **Formal/Mathematical Version**:
    The principle of conservation of kinetic energy states:
    $$\frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 = \frac{1}{2}m_1 v_{1f}^2 + \frac{1}{2}m_2 v_{2f}^2$$
    We can simplify this by multiplying the entire equation by 2:
    $$m_1 v_{1i}^2 + m_2 v_{2i}^2 = m_1 v_{1f}^2 + m_2 v_{2f}^2$$
*   **What Could Go Wrong**: Using this equation for an *inelastic* collision. This is the definition of an elastic collision, so if the problem doesn't explicitly state it's elastic, you cannot assume kinetic energy is conserved. Also, remember that $v^2$ makes the sign of velocity irrelevant for kinetic energy calculation, but the *actual* velocity sign is crucial for momentum.

### Step 3: Setting up the System of Equations

*   **Plain-English Statement**: We now have two independent equations that describe the collision. Both equations contain the two unknown final velocities ($v_{1f}$ and $v_{2f}$). Our task is to solve these two equations simultaneously to find those unknowns.
*   **Small Concrete Example**: If you know $x+y=5$ and $2x-y=1$, you have a system of two equations for $x$ and $y$. Here, our "x" and "y" are $v_{1f}$ and $v_{2f}$.
*   **Formal/Mathematical Version**:
    Equation (1) (Momentum):
    $$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$$
    Equation (2) (Kinetic Energy, simplified):
    $$m_1 v_{1i}^2 + m_2 v_{2i}^2 = m_1 v_{1f}^2 + m_2 v_{2f}^2$$
    These are the two equations we need to solve for $v_{1f}$ and $v_{2f}$.
*   **What Could Go Wrong**: Making algebraic errors when trying to substitute one equation into the other. The kinetic energy equation involves squares, which can lead to quadratic terms and more complex algebra if not handled carefully.

### Step 4: Deriving the "Relative Velocity" Equation (The Shortcut!)

*   **Plain-English Statement**: Solving the system from Step 3 directly can be quite messy due to the squares in the kinetic energy equation. Fortunately, there's a powerful algebraic shortcut that emerges from combining the two conservation laws. It tells us something profound about how the objects approach and separate from each other.
*   **Small Concrete Example**: Imagine two cars approaching each other. The speed at which they close the distance between them is their "relative approach speed." After they bounce off, the speed at which they move apart is their "relative separation speed." This shortcut tells us these two relative speeds are equal for an elastic collision.
*   **Formal/Mathematical Version**:
    Let's rearrange the momentum equation (1) and the kinetic energy equation (2):
    From (1): $m_1 (v_{1i} - v_{1f}) = m_2 (v_{2f} - v_{2i})$ (Eq. 1')
    From (2): $m_1 (v_{1i}^2 - v_{1f}^2) = m_2 (v_{2f}^2 - v_{2i}^2)$
    We can factor the difference of squares: $a^2 - b^2 = (a-b)(a+b)$
    So, $m_1 (v_{1i} - v_{1f})(v_{1i} + v_{1f}) = m_2 (v_{2f} - v_{2i})(v_{2f} + v_{2i})$ (Eq. 2')

    Now, divide Eq. 2' by Eq. 1' (assuming $v_{1i} \ne v_{1f}$ and $v_{2f} \ne v_{2i}$, which is true unless there's no collision or one object is infinitely massive):
    $$\frac{m_1 (v_{1i} - v_{1f})(v_{1i} + v_{1f})}{m_1 (v_{1i} - v_{1f})} = \frac{m_2 (v_{2f} - v_{2i})(v_{2f} + v_{2i})}{m_2 (v_{2f} - v_{2i})}$$
    This simplifies to:
    $$v_{1i} + v_{1f} = v_{2f} + v_{2i}$$
    Rearranging this gives us the "relative velocity" equation:
    $$v_{1i} - v_{2i} = -(v_{1f} - v_{2f})$$
    This equation states that the relative speed of approach ($v_{1i} - v_{2i}$) before an elastic collision is equal to the negative of the relative speed of separation ($v_{1f} - v_{2f}$) after the collision. The negative sign means that if they were approaching, they are now separating, and vice-versa.
*   **What Could Go Wrong**: Forgetting this shortcut and trying to solve the quadratic system directly, which is much more prone to algebraic errors and takes significantly more time. This equation is a powerful tool for elastic collisions.

### Step 5: Solving for Final Velocities Using the Shortcut

*   **Plain-English Statement**: Now we have a simpler system of two *linear* equations (no squares!) for our two unknowns. We can use substitution or elimination to find $v_{1f}$ and $v_{2f}$. This is much easier than dealing with quadratic terms.
*   **Small Concrete Example**: From the relative velocity equation, you can express $v_{1f}$ in terms of $v_{2f}$ (or vice versa). For example, $v_{1f} = v_{2f} + v_{2i} - v_{1i}$. Then you substitute this expression into the momentum conservation equation, which only has linear terms, and solve for the remaining unknown.
*   **Formal/Mathematical Version**:
    Our simplified system is:
    1.  Momentum: $m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$
    2.  Relative Velocity: $v_{1i} - v_{2i} = -(v_{1f} - v_{2f}) \implies v_{1f} = v_{2f} + v_{2i} - v_{1i}$ (or $v_{2f} = v_{1f} + v_{1i} - v_{2i}$)

    Substitute one expression into the other. For example, substitute the expression for $v_{1f}$ from the relative velocity equation into the momentum equation:
    $$m_1 v_{1i} + m_2 v_{2i} = m_1 (v_{2f} + v_{2i} - v_{1i}) + m_2 v_{2f}$$
    Now, expand and rearrange to solve for $v_{2f}$:
    $$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{2f} + m_1 v_{2i} - m_1 v_{1i} + m_2 v_{2f}$$
    $$m_1 v_{1i} + m_2 v_{2i} + m_1 v_{1i} - m_1 v_{2i} = m_1 v_{2f} + m_2 v_{2f}$$
    $$2m_1 v_{1i} + (m_2 - m_1) v_{2i} = (m_1 + m_2) v_{2f}$$
    $$v_{2f} = \frac{2m_1 v_{1i} + (m_2 - m_1) v_{2i}}{m_1 + m_2}$$
    Once you have $v_{2f}$, substitute it back into the relative velocity equation ($v_{1f} = v_{2f} + v_{2i} - v_{1i}$) to find $v_{1f}$.
    Alternatively, you can derive $v_{1f}$ similarly:
    $$v_{1f} = \frac{(m_1 - m_2) v_{1i} + 2m_2 v_{2i}}{m_1 + m_2}$$
    These two equations are the general solutions for 1D elastic collisions.
*   **What Could Go Wrong**: Algebraic errors during substitution and rearrangement. It's easy to drop a sign or misdistribute a term. Double-check every step. If you derive these general formulas, make sure to memorize them or be able to re-derive them quickly.

## 5. Worked examples — multiple, with every step shown

### Example 1: Equal Masses, One Stationary

**Problem**: A 2 kg ball (Ball 1) moving at 5 m/s to the right collides elastically with a stationary 2 kg ball (Ball 2). What are the final velocities of both balls?

**Given**:
*   $m_1 = 2 \text{ kg}$
*   $v_{1i} = +5 \text{ m/s}$ (positive indicates right)
*   $m_2 = 2 \text{ kg}$
*   $v_{2i} = 0 \text{ m/s}$

**Want**:
*   $v_{1f}$
*   $v_{2f}$

**Solution**:

We will use the conservation of momentum and the relative velocity equation.

1.  **Conservation of Momentum**:
    $$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$$
    Substitute the given values:
    $$(2 \text{ kg})(+5 \text{ m/s}) + (2 \text{ kg})(0 \text{ m/s}) = (2 \text{ kg}) v_{1f} + (2 \text{ kg}) v_{2f}$$
    $$10 \text{ kg} \cdot \text{m/s} + 0 = 2 v_{1f} + 2 v_{2f}$$
    $$10 = 2 v_{1f} + 2 v_{2f}$$
    Divide by 2 to simplify:
    $$5 = v_{1f} + v_{2f} \quad \text{(Equation A)}$$
    *Explanation*: This step applies the principle that the total momentum before and after the collision is constant. We substitute the known masses and initial velocities, then simplify the resulting equation.

2.  **Relative Velocity Equation**:
    $$v_{1i} - v_{2i} = -(v_{1f} - v_{2f})$$
    Substitute the given values:
    $$+5 \text{ m/s} - 0 \text{ m/s} = -(v_{1f} - v_{2f})$$
    $$5 = -v_{1f} + v_{2f} \quad \text{(Equation B)}$$
    *Explanation*: This step uses the derived shortcut for elastic collisions, stating that the relative speed of approach equals the relative speed of separation. We substitute the initial velocities.

3.  **Solve the System of Equations**:
    We have two linear equations:
    (A) $5 = v_{1f} + v_{2f}$
    (B) $5 = -v_{1f} + v_{2f}$

    Add Equation (A) and Equation (B) together to eliminate $v_{1f}$:
    $$(5) + (5) = (v_{1f} + v_{2f}) + (-v_{1f} + v_{2f})$$
    $$10 = v_{1f} - v_{1f} + v_{2f} + v_{2f}$$
    $$10 = 0 + 2 v_{2f}$$
    $$10 = 2 v_{2f}$$
    $$v_{2f} = \frac{10}{2}$$
    $$v_{2f} = +5 \text{ m/s}$$
    *Explanation*: We use the method of elimination to solve for one of the unknown final velocities. Adding the two equations directly cancels out $v_{1f}$, allowing us to solve for $v_{2f}$.

    Now, substitute $v_{2f} = +5 \text{ m/s}$ back into Equation (A) to find $v_{1f}$:
    $$5 = v_{1f} + v_{2f}$$
    $$5 = v_{1f} + (+5)$$
    $$5 - 5 = v_{1f}$$
    $$v_{1f} = 0 \text{ m/s}$$
    *Explanation*: With $v_{2f}$ known, we substitute it back into one of the simpler equations to find the remaining unknown, $v_{1f}$.

**Final Answer**:
The final velocity of Ball 1 is $\boxed{0 \text{ m/s}}$.
The final velocity of Ball 2 is $\boxed{+5 \text{ m/s}}$.

**Reflection**: This is a classic result for elastic collisions between equal masses when one is initially stationary. The moving ball stops, and the stationary ball takes on the exact initial velocity of the first ball. Think of a head-on collision between two identical billiard balls.

---

### Example 2: Unequal Masses, One Stationary

**Problem**: A 4 kg block (Block 1) moving at 6 m/s to the right collides elastically with a stationary 2 kg block (Block 2). What are the final velocities of both blocks?

**Given**:
*   $m_1 = 4 \text{ kg}$
*   $v_{1i} = +6 \text{ m/s}$
*   $m_2 = 2 \text{ kg}$
*   $v_{2i} = 0 \text{ m/s}$

**Want**:
*   $v_{1f}$
*   $v_{2f}$

**Solution**:

We will use the general formulas derived in Step 5 of the core idea.

General formulas:
$$v_{1f} = \frac{(m_1 - m_2) v_{1i} + 2m_2 v_{2i}}{m_1 + m_2}$$
$$v_{2f} = \frac{2m_1 v_{1i} + (m_2 - m_1) v_{2i}}{m_1 + m_2}$$

1.  **Calculate $v_{1f}$**:
    Substitute the given values into the formula for $v_{1f}$:
    $$v_{1f} = \frac{(4 \text{ kg} - 2 \text{ kg}) (+6 \text{ m/s}) + 2(2 \text{ kg}) (0 \text{ m/s})}{4 \text{ kg} + 2 \text{ kg}}$$
    $$v_{1f} = \frac{(2 \text{ kg}) (+6 \text{ m/s}) + 0}{6 \text{ kg}}$$
    $$v_{1f} = \frac{12 \text{ kg} \cdot \text{m/s}}{6 \text{ kg}}$$
    $$v_{1f} = +2 \text{ m/s}$$
    *Explanation*: We directly apply the pre-derived formula for the final velocity of the first object, plugging in all known masses and initial velocities.

2.  **Calculate $v_{2f}$**:
    Substitute the given values into the formula for $v_{2f}$:
    $$v_{2f} = \frac{2(4 \text{ kg}) (+6 \text{ m/s}) + (2 \text{ kg} - 4 \text{ kg}) (0 \text{ m/s})}{4 \text{ kg} + 2 \text{ kg}}$$
    $$v_{2f} = \frac{2(4 \text{ kg}) (+6 \text{ m/s}) + (-2 \text{ kg}) (0 \text{ m/s})}{6 \text{ kg}}$$
    $$v_{2f} = \frac{48 \text{ kg} \cdot \text{m/s} + 0}{6 \text{ kg}}$$
    $$v_{2f} = \frac{48 \text{ kg} \cdot \text{m/s}}{6 \text{ kg}}$$
    $$v_{2f} = +8 \text{ m/s}$$
    *Explanation*: Similarly, we apply the pre-derived formula for the final velocity of the second object, ensuring all signs and values are correctly substituted.

**Final Answer**:
The final velocity of Block 1 is $\boxed{+2 \text{ m/s}}$.
The final velocity of Block 2 is $\boxed{+8 \text{ m/s}}$.

**Reflection**: When a heavier object hits a lighter stationary object, the heavier object slows down but continues in the same direction, while the lighter object speeds up significantly, also moving in the same direction as the initial heavier object.

---

### Example 3: Both Objects Moving Towards Each Other

**Problem**: A 3 kg cart (Cart 1) moving at +4 m/s collides elastically with a 5 kg cart (Cart 2) moving at -2 m/s (towards Cart 1). What are their final velocities?

**Given**:
*   $m_1 = 3 \text{ kg}$
*   $v_{1i} = +4 \text{ m/s}$
*   $m_2 = 5 \text{ kg}$
*   $v_{2i} = -2 \text{ m/s}$ (negative indicates left)

**Want**:
*   $v_{1f}$
*   $v_{2f}$

**Solution**:

We will use the general formulas derived in Step 5 of the core idea.

General formulas:
$$v_{1f} = \frac{(m_1 - m_2) v_{1i} + 2m_2 v_{2i}}{m_1 + m_2}$$
$$v_{2f} = \frac{2m_1 v_{1i} + (m_2 - m_1) v_{2i}}{m_1 + m_2}$$

1.  **Calculate $v_{1f}$**:
    Substitute the given values into the formula for $v_{1f}$:
    $$v_{1f} = \frac{(3 \text{ kg} - 5 \text{ kg}) (+4 \text{ m/s}) + 2(5 \text{ kg}) (-2 \text{ m/s})}{3 \text{ kg} + 5 \text{ kg}}$$
    $$v_{1f} = \frac{(-2 \text{ kg}) (+4 \text{ m/s}) + (10 \text{ kg}) (-2 \text{ m/s})}{8 \text{ kg}}$$
    $$v_{1f} = \frac{-8 \text{ kg} \cdot \text{m/s} - 20 \text{ kg} \cdot \text{m/s}}{8 \text{ kg}}$$
    $$v_{1f} = \frac{-28 \text{ kg} \cdot \text{m/s}}{8 \text{ kg}}$$
    $$v_{1f} = -3.5 \text{ m/s}$$
    *Explanation*: We apply the formula for $v_{1f}$, paying careful attention to the signs of the initial velocities. Since Cart 2 is moving left, its initial velocity $v_{2i}$ is negative.

2.  **Calculate $v_{2f}$**:
    Substitute the given values into the formula for $v_{2f}$:
    $$v_{2f} = \frac{2(3 \text{ kg}) (+4 \text{ m/s}) + (5 \text{ kg} - 3 \text{ kg}) (-2 \text{ m/s})}{3 \text{ kg} + 5 \text{ kg}}$$
    $$v_{2f} = \frac{(6 \text{ kg}) (+4 \text{ m/s}) + (2 \text{ kg}) (-2 \text{ m/s})}{8 \text{ kg}}$$
    $$v_{2f} = \frac{24 \text{ kg} \cdot \text{m/s} - 4 \text{ kg} \cdot \text{m/s}}{8 \text{ kg}}$$
    $$v_{2f} = \frac{20 \text{ kg} \cdot \text{m/s}}{8 \text{ kg}}$$
    $$v_{2f} = +2.5 \text{ m/s}$$
    *Explanation*: Similarly, we apply the formula for $v_{2f}$, ensuring the negative sign for $v_{2i}$ is correctly handled.

**Final Answer**:
The final velocity of Cart 1 is $\boxed{-3.5 \text{ m/s}}$.
The final velocity of Cart 2 is $\boxed{+2.5 \text{ m/s}}$.

**Reflection**: Both carts reverse direction after the collision. The lighter cart (Cart 1) reverses with a higher speed than the heavier cart (Cart 2). This makes sense, as the heavier cart has more inertia and will resist changing its direction and speed as much as the lighter one.

---

### Example 4: Chasing Collision (Derivation from scratch for practice)

**Problem**: A 1 kg ball (Ball A) moving at +10 m/s catches up and collides elastically with a 3 kg ball (Ball B) moving at +2 m/s in the same direction. What are their final velocities?

**Given**:
*   $m_A = 1 \text{ kg}$
*   $v_{Ai} = +10 \text{ m/s}$
*   $m_B = 3 \text{ kg}$
*   $v_{Bi} = +2 \text{ m/s}$

**Want**:
*   $v_{Af}$
*   $v_{Bf}$

**Solution**:

This time, let's solve by setting up the system of equations from scratch, just like in Example 1, to reinforce the method.

1.  **Conservation of Momentum**:
    $$m_A v_{Ai} + m_B v_{Bi} = m_A v_{Af} + m_B v_{Bf}$$
    Substitute the given values:
    $$(1 \text{ kg})(+10 \text{ m/s}) + (3 \text{ kg})(+2 \text{ m/s}) = (1 \text{ kg}) v_{Af} + (3 \text{ kg}) v_{Bf}$$
    $$10 \text{ kg} \cdot \text{m/s} + 6 \text{ kg} \cdot \text{m/s} = v_{Af} + 3 v_{Bf}$$
    $$16 = v_{Af} + 3 v_{Bf} \quad \text{(Equation P)}$$
    *Explanation*: We set up the momentum conservation equation, substituting the given masses and initial velocities. Both initial velocities are positive as they move in the same direction.

2.  **Relative Velocity Equation**:
    $$v_{Ai} - v_{Bi} = -(v_{Af} - v_{Bf})$$
    Substitute the given values:
    $$+10 \text{ m/s} - (+2 \text{ m/s}) = -(v_{Af} - v_{Bf})$$
    $$8 = -v_{Af} + v_{Bf} \quad \text{(Equation R)}$$
    *Explanation*: We apply the relative velocity equation, which is a shortcut for elastic collisions.

3.  **Solve the System of Equations**:
    We have two linear equations:
    (P) $16 = v_{Af} + 3 v_{Bf}$
    (R) $8 = -v_{Af} + v_{Bf}$

    From Equation (R), we can express $v_{Af}$ in terms of $v_{Bf}$:
    $$v_{Af} = v_{Bf} - 8 \quad \text{(Equation R')}$$
    *Explanation*: We isolate one variable from the simpler relative velocity equation to prepare for substitution.

    Substitute Equation (R') into Equation (P):
    $$16 = (v_{Bf} - 8) + 3 v_{Bf}$$
    $$16 = 4 v_{Bf} - 8$$
    Add 8 to both sides:
    $$16 + 8 = 4 v_{Bf}$$
    $$24 = 4 v_{Bf}$$
    $$v_{Bf} = \frac{24}{4}$$
    $$v_{Bf} = +6 \text{ m/s}$$
    *Explanation*: We substitute the expression for $v_{Af}$ into the momentum equation. This eliminates $v_{Af}$ from the equation, allowing us to solve for $v_{Bf}$.

    Now, substitute $v_{Bf} = +6 \text{ m/s}$ back into Equation (R') to find $v_{Af}$:
    $$v_{Af} = v_{Bf} - 8$$
    $$v_{Af} = (+6) - 8$$
    $$v_{Af} = -2 \text{ m/s}$$
    *Explanation*: With $v_{Bf}$ known, we substitute it back into the expression for $v_{Af}$ to find its value.

**Final Answer**:
The final velocity of Ball A is $\boxed{-2 \text{ m/s}}$.
The final velocity of Ball B is $\boxed{+6 \text{ m/s}}$.

**Reflection**: Ball A (lighter, faster) hits Ball B (heavier, slower). Ball A bounces backward, indicating it transferred a lot of its momentum to the heavier ball. Ball B speeds up, but not as dramatically as Ball A's change in direction and speed, which is consistent with its larger mass resisting a large acceleration. The relative speed of approach was $10 - 2 = 8$ m/s. The relative speed of separation is $v_{Bf} - v_{Af} = 6 - (-2) = 8$ m/s. This confirms the relative velocity equation!

## 6. Common mistakes and traps

1.  **Forgetting Velocity Signs**: In 1D, direction matters! Positive for one direction, negative for the opposite. A common mistake is treating all velocities as speeds (always positive) in the momentum equation.
2.  **Using Kinetic Energy Conservation for Inelastic Collisions**: The kinetic energy conservation equation ($\frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 = \frac{1}{2}m_1 v_{1f}^2 + \frac{1}{2}m_2 v_{2f}^2$) is *only* valid for elastic collisions. If the problem doesn't explicitly state "elastic," or if objects stick together, this equation cannot be used.
3.  **Algebraic Errors**: The derivation of the general formulas or solving the system of equations involves careful algebraic manipulation. Dropping a negative sign, misdistributing a term, or errors in combining like terms are very common.
4.  **Incorrectly Applying the Relative Velocity Equation**: While $v_{1i} - v_{2i} = -(v_{1f} - v_{2f})$ is a powerful shortcut, some students might incorrectly write $v_{1i} + v_{2i} = v_{1f} + v_{2f}$ or similar variations, leading to incorrect results. Remember it's about relative approach speed equaling relative separation speed.
5.  **Confusing Initial and Final States**: Mixing up initial ($i$) and final ($f$) velocities in the equations, or assigning them to the wrong objects, will lead to incorrect answers. Clearly label all variables.
6.  **Units Inconsistency**: Using a mix of units (e.g., grams for mass and meters for distance, or km/h for velocity) without converting them to a consistent system (like SI units: kg, m, s) will produce incorrect numerical answers.

## 7. Textbook-precise explanation

An **elastic collision** is a type of collision in which the total kinetic energy of the system is conserved, in addition to the total linear momentum. For a one-dimensional (1D) elastic collision involving two objects, particle 1 and particle 2, with masses $m_1$ and $m_2$ respectively, and initial velocities $v_{1i}$ and $v_{2i}$, and final velocities $v_{1f}$ and $v_{2f}$:

The principle of **conservation of linear momentum** dictates that the total momentum of the isolated system before the collision is equal to the total momentum after the collision. In 1D, this is expressed as:
$$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f} \quad (1)$$

The condition for an elastic collision is the **conservation of kinetic energy**, meaning the total kinetic energy of the system before the collision is equal to the total kinetic energy after the collision. In 1D, this is expressed as:
$$\frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 = \frac{1}{2}m_1 v_{1f}^2 + \frac{1}{2}m_2 v_{2f}^2 \quad (2)$$
Multiplying Equation (2) by 2 simplifies it to:
$$m_1 v_{1i}^2 + m_2 v_{2i}^2 = m_1 v_{1f}^2 + m_2 v_{2f}^2 \quad (2')$$

To solve for the two unknown final velocities, $v_{1f}$ and $v_{2f}$, we rearrange Equations (1) and (2'):
From (1): $m_1(v_{1i} - v_{1f}) = m_2(v_{2f} - v_{2i})$
From (2'): $m_1(v_{1i}^2 - v_{1f}^2) = m_2(v_{2f}^2 - v_{2i}^2)$
Factoring the differences of squares, $a^2 - b^2 = (a-b)(a+b)$:
$m_1(v_{1i} - v_{1f})(v_{1i} + v_{1f}) = m_2(v_{2f} - v_{2i})(v_{2f} + v_{2i})$

Dividing the factored kinetic energy equation by the momentum equation (assuming $v_{1i} \ne v_{1f}$ and $v_{2f} \ne v_{2i}$ to avoid division by zero, which implies a non-trivial collision):
$$\frac{m_1(v_{1i} - v_{1f})(v_{1i} + v_{1f})}{m_1(v_{1i} - v_{1f})} = \frac{m_2(v_{2f} - v_{2i})(v_{2f} + v_{2i})}{m_2(v_{2f} - v_{2i})}$$
This algebraic manipulation yields the crucial relationship for 1D elastic collisions:
$$v_{1i} + v_{1f} = v_{2f} + v_{2i}$$
Rearranging this, we get the **relative velocity equation**:
$$v_{1i} - v_{2i} = -(v_{1f} - v_{2f}) \quad (3)$$
This equation states that the relative speed of approach between the two objects before the collision is equal to their relative speed of separation after the collision.

Equations (1) and (3) form a system of two linear equations with two unknowns ($v_{1f}, v_{2f}$), which can be solved simultaneously. Substituting $v_{1f} = v_{2f} + v_{2i} - v_{1i}$ (from Eq. 3) into Eq. (1) and solving for $v_{2f}$ yields:
$$v_{2f} = \frac{2m_1 v_{1i} + (m_2 - m_1) v_{2i}}{m_1 + m_2} \quad (4)$$
Similarly, substituting $v_{2f} = v_{1f} + v_{1i} - v_{2i}$ (from Eq. 3) into Eq. (1) and solving for $v_{1f}$ yields:
$$v_{1f} = \frac{(m_1 - m_2) v_{1i} + 2m_2 v_{2i}}{m_1 + m_2} \quad (5)$$

These general solutions (Equations 4 and 5) allow for direct calculation of the final velocities given the masses and initial velocities of the two colliding objects in a 1D elastic collision.

*Reference: Halliday, Resnick, & Walker, Fundamentals of Physics, 11th Edition, Chapter 9, §9.9.*

## 8. ASCII diagrams

Here's a simple ASCII diagram illustrating a 1D elastic collision. Imagine a number line, and the objects moving along it.

```text
       Object 1 (m1)              Object 2 (m2)
Initial State:
<--------------------------------------------------------------------> (x-axis)
       v1i -->                           <-- v2i
       O========O                      O========O
          m1                             m2

Collision: (brief moment of interaction, not shown explicitly in 1D)

Final State:
<--------------------------------------------------------------------> (x-axis)
       <-- v1f                           v2f -->
       O========O                      O========O
          m1                             m2
```

**Description**:
The diagram shows two objects, Object 1 with mass $m_1$ and Object 2 with mass $m_2$.
In the "Initial State", Object 1 is moving to the right with initial velocity $v_{1i}$ (indicated by `-->`). Object 2 is moving to the left with initial velocity $v_{2i}$ (indicated by `<--`). Note that $v_{2i}$ would be a negative value in our coordinate system.
The "Collision" is an instantaneous event where the objects interact.
In the "Final State", Object 1 is now moving to the left with final velocity $v_{1f}$ (indicated by `<--`), meaning $v_{1f}$ would be a negative value. Object 2 is now moving to the right with final velocity $v_{2f}$ (indicated by `-->`), meaning $v_{2f}$ would be a positive value.
The entire motion occurs along a single horizontal line (the x-axis).

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook**:
    *   **"Momentum is Always, KE is Only When Elastic"**: This helps distinguish elastic from inelastic collisions. Momentum is *always* conserved in an isolated system, but Kinetic Energy (KE) is *only* conserved when the collision is elastic.
    *   **"Relative Velocity Reversal"**: For the relative velocity equation ($v_{1i} - v_{2i} = -(v_{1f} - v_{2f})$), visualize two cars approaching each other at a certain relative speed. After an elastic collision, they separate at the *same* relative speed, just in the opposite "direction" of relative motion. It's like they hit a perfectly bouncy wall between them, and that wall bounces them apart with the same closing speed.

2.  **The 1-3 Formulas/Facts They MUST Overlearn**:
    *   **Conservation of Momentum**: $m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$
    *   **Relative Velocity Equation (for elastic collisions)**: $v_{1i} - v_{2i} = -(v_{1f} - v_{2f})$
    *   **The Problem-Solving Strategy**: Always start with these two equations. They are your twin pillars for 1D elastic collisions.

3.  **Spaced-Repetition Schedule**:
    *   **Day 1**: Review the core idea and work through Example 1 and 2.
    *   **Day 3**: Review the core idea and work through Example 3 and 4. Try to derive the general formulas again.
    *   **Day 7**: Review the core idea, the formulas, and attempt to solve a new problem from a textbook or online without looking at the solution first.
    *   **Day 16**: Review the concepts and formulas. Focus on the derivation of the relative velocity equation.
    *   **Day 35**: Review all of the above. Can you explain the concept and derive the formulas to someone else? Can you quickly solve any 1D elastic collision problem?

4.  **First-Principles Re-derivation Pathway**:
    If you ever forget the general formulas for $v_{1f}$ and $v_{2f}$ (or even the relative velocity equation), you can always rebuild them from the ground up:
    1.  **Start with the two fundamental conservation laws**:
        *   Momentum: $m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$
        *   Kinetic Energy: $\frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 = \frac{1}{2}m_1 v_{1f}^2 + \frac{1}{2}m_2 v_{2f}^2$
    2.  **Rearrange the momentum equation**: Group terms by mass:
        $m_1(v_{1i} - v_{1f}) = m_2(v_{2f} - v_{2i})$
    3.  **Rearrange and factor the kinetic energy equation**: Multiply by 2, then group terms by mass and factor differences of squares:
        $m_1(v_{1i}^2 - v_{1f}^2) = m_2(v_{2f}^2 - v_{2i}^2)$
        $m_1(v_{1i} - v_{1f})(v_{1i} + v_{1f}) = m_2(v_{2f} - v_{2i})(v_{2f} + v_{2i})$
    4.  **Divide the factored KE equation by the rearranged momentum equation**: This cancels out the $(v_{1i} - v_{1f})$ and $(v_{2f} - v_{2i})$ terms, leaving you with:
        $v_{1i} + v_{1f} = v_{2f} + v_{2i}$
        This is your crucial "relative velocity" equation.
    5.  **Now you have a system of two linear equations**:
        *   $m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$
        *   $v_{1i} + v_{1f} = v_{2f} + v_{2i}$
        From here, you can use substitution (e.g., solve for $v_{1f}$ in the second equation and plug it into the first) to derive the general formulas for $v_{1f}$ and $v_{2f}$. This re-derivation process strengthens your understanding and ensures you're not just memorizing.

## 10. Connections — what this leads to

Understanding 1D elastic collisions is a critical stepping stone that unlocks several more advanced and complex topics in physics and engineering:

*   **Two-Dimensional (2D) and Three-Dimensional (3D) Collisions**: The conservation laws of momentum and kinetic energy extend directly to higher dimensions. In 2D, velocities become vectors with x and y components (and z for 3D), requiring vector addition and separate equations for each dimension. This is essential for analyzing glancing blows, nuclear scattering experiments, and pool ball physics.
*   **Inelastic Collisions**: Once you grasp elastic collisions, the next logical step is inelastic collisions, where kinetic energy is *not* conserved (it's converted to heat, sound, deformation). Understanding the difference and how to handle situations where kinetic energy is lost is fundamental. Perfectly inelastic collisions (where objects stick together) are a special case.
*   **Coefficient of Restitution**: This dimensionless quantity quantifies the "bounciness" of a collision, ranging from 1 for perfectly elastic collisions to 0 for perfectly inelastic collisions. It's directly derived from the relative velocity concept you've learned and is crucial in engineering design (e.g., sports equipment, crash safety).
*   **Impulse and Force**: Momentum conservation can be linked to the concept of impulse ($J = \Delta p$) and the average force exerted during a collision ($F_{avg} = \Delta p / \Delta t$). This allows for the analysis of the forces involved in impacts, which is vital in fields like automotive safety and material science.
*   **Center of Mass**: The concept of the center of mass (CM) and its motion is often introduced in conjunction with collisions. The velocity of the center of mass of an isolated system remains constant during any type of collision, elastic or inelastic. Analyzing collisions from the perspective of the center of mass frame can simplify calculations.
*   **Rocket Propulsion**: While not a direct collision, rocket propulsion fundamentally relies on the conservation of momentum. A rocket expels mass (exhaust) in one direction, and by conservation of momentum, the rocket itself gains momentum in the opposite direction. This is an application of momentum conservation in a variable-mass system.
*   **Quantum Mechanics (Scattering Theory)**: At the subatomic level, particles interact through scattering events. The principles of momentum and energy conservation, derived from classical collision theory, are foundational to understanding these quantum scattering processes, even though the mechanics are very different.

## 11. Self-check questions

1.  A 1 kg superball moving at +8 m/s collides head-on and elastically with a 3 kg bowling ball moving at -2 m/s. What are the final velocities of both balls?
2.  Two identical billiard balls ($m_1 = m_2 = m$) collide elastically. Ball 1 is initially moving at $v_{1i}$ and Ball 2 is initially at rest ($v_{2i} = 0$). Prove that after the collision, Ball 1 is at rest and Ball 2 moves with $v_{1i}$. Show all steps using the general formulas.
3.  A 5 kg block initially at rest is struck by a 1 kg projectile moving at +15 m/s. If the collision is elastic, what are the final velocities of both objects?
4.  Consider an elastic collision where a very light object ($m_1 \approx 0$) collides with a very massive object ($m_2 \gg m_1$) that is initially at rest ($v_{2i} = 0$). Using the general formulas, show that the light object essentially reverses its velocity ($v_{1f} \approx -v_{1i}$) and the massive object remains approximately at rest ($v_{2f} \approx 0$). This models a ball bouncing off a wall.
5.  A 2 kg mass moving at +6 m/s collides elastically with a 4 kg mass moving at +3 m/s. Determine their final velocities. Double-check your answer by verifying both momentum and kinetic energy are conserved.