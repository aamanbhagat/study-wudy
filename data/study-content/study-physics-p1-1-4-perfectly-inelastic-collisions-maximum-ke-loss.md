## 1. What it is — in plain English

Imagine two blobs of super-sticky clay. If you throw one blob at another, what happens? They hit, they squish together, and then they move off as one bigger, combined blob. They don't bounce apart; they become a single object.

This "sticking together" and moving as one is the defining characteristic of a **perfectly inelastic collision**. It's the most extreme kind of collision where objects don't bounce. Think of it like a permanent merger.

When this happens, a lot of the energy that was in the motion (called kinetic energy) gets used up in other ways. It turns into heat, sound, or permanently changes the shape of the objects (like crumpling metal). This means the final combined object has less kinetic energy than the objects had initially. In fact, a perfectly inelastic collision loses the *maximum possible* amount of kinetic energy that a collision can lose, while still obeying the fundamental laws of physics.

So, in simple terms: objects hit, they stick, and they lose a lot of their "moving energy" in the process, turning it into other forms of energy.

## 2. Why it matters — real-world applications

Understanding perfectly inelastic collisions is crucial in many fields, from engineering safety to space exploration.

1.  **Automotive Safety and Crumple Zones:** Car manufacturers design vehicles with "crumple zones" that are meant to deform and absorb energy during a collision. When a car hits an obstacle and crumples, it's an inelastic collision. The goal is to maximize the kinetic energy lost through deformation of the car's structure, rather than transferring that energy to the occupants. This increases the time over which the impact occurs, reducing the force experienced by passengers and significantly improving survival rates.
2.  **Spacecraft Docking:** While ideally, spacecraft docking maneuvers are carefully controlled to minimize impact, the final "latch" between modules (like those on the International Space Station or during Apollo-Soyuz) can be modeled as a perfectly inelastic collision for the moment of connection. The two spacecraft essentially become one combined mass moving with a common velocity relative to their orbit. Engineers must account for the momentum transfer and any residual kinetic energy that might be dissipated as heat or vibration during the final locking mechanism engagement.
3.  **Ballistic Pendulums and Forensics:** A ballistic pendulum is a classic physics experiment used to measure the speed of a projectile (like a bullet). A bullet is fired into a large block of wood, embedding itself. This is a perfectly inelastic collision. By measuring how high the block (with the embedded bullet) swings afterwards, one can work backward to calculate the initial speed of the bullet. This principle is used in ballistics research and forensic science to analyze projectile impacts.
4.  **Impact Testing of Materials:** In material science, engineers perform impact tests (e.g., Charpy or Izod tests) where a pendulum or a falling weight strikes a material sample, often breaking it. These are highly inelastic collisions. By analyzing the energy absorbed by the material during the impact (the energy lost from the pendulum's swing), engineers can determine the material's toughness and its ability to withstand sudden forces, which is critical for designing everything from aerospace components to protective gear.

## 3. Prerequisites — what you must know first

Before diving deep into perfectly inelastic collisions, ensure you have a solid grasp of these fundamental concepts:

*   **Mass ($m$):** A measure of an object's inertia, its resistance to changes in motion. Measured in kilograms (kg).
*   **Velocity ($\vec{v}$):** The rate of change of an object's position, including both its speed and its direction. It is a vector quantity, measured in meters per second (m/s).
*   **Momentum ($\vec{p}$):** A fundamental vector quantity defined as the product of an object's mass and its velocity ($\vec{p} = m\vec{v}$). It represents the "quantity of motion" an object possesses. Measured in kg·m/s.
*   **Conservation of Momentum:** In an isolated system (one where no external forces act), the total linear momentum of the system remains constant, regardless of interactions within the system. This means the total momentum *before* a collision equals the total momentum *after* the collision.
*   **Kinetic Energy ($KE$):** The energy an object possesses due to its motion. It is a scalar quantity, calculated as $KE = \frac{1}{2}mv^2$. Measured in Joules (J).
*   **Conservation of Energy:** In a closed system, the total amount of energy remains constant; energy can transform from one form to another (e.g., kinetic to potential, or kinetic to heat and sound), but it is never created or destroyed.
*   **Elastic vs. Inelastic Collisions:** A basic understanding that collisions can range from perfectly elastic (where kinetic energy *is* conserved) to perfectly inelastic (where kinetic energy is *not* conserved and objects stick together).

If any of these terms are unfamiliar or unclear, pause here and review them before proceeding. They are the building blocks for understanding collisions.

## 4. The core idea — step by step

Let's break down the concept of perfectly inelastic collisions into its fundamental components, building intuition step by step.

### ### Step 1: The Definition of a Perfectly Inelastic Collision

*   **Plain-English Statement:** In a perfectly inelastic collision, the objects involved hit each other and then *stick together*, moving as a single combined mass after the impact. They do not bounce apart.
*   **Small Concrete Example:** Imagine a snowball hitting a snowman. If the snowball sticks to the snowman and becomes part of it, and the snowman (now slightly heavier) starts to slide a little, that's a perfectly inelastic collision.
*   **Formal/Mathematical Version:** The defining characteristic is that the final velocity of the first object ($\vec{v}_{1f}$) is equal to the final velocity of the second object ($\vec{v}_{2f}$), which we denote as a common final velocity ($\vec{v}_f$).
    $$ \vec{v}_{1f} = \vec{v}_{2f} = \vec{v}_f $$
*   **What Could Go Wrong:** Students sometimes confuse this with any inelastic collision. While all perfectly inelastic collisions are inelastic, not all inelastic collisions are perfectly inelastic. In a general inelastic collision, kinetic energy is lost, but the objects might still separate (e.g., two cars colliding and bouncing off, but with crumpled bumpers). The "sticking together" part is crucial for *perfectly* inelastic.

### ### Step 2: Conservation of Momentum is Key

*   **Plain-English Statement:** Even though the objects stick together and energy might change forms, the total "oomph" (momentum) of the entire system *before* the collision is exactly the same as the total "oomph" of the combined object *after* the collision. This is true for *all* collisions (as long as no outside forces are acting).
*   **Small Concrete Example:** If a bowling ball is rolling towards a stationary bowling pin, the total momentum of the ball and pin system before impact is just the momentum of the ball. If the ball picks up the pin and carries it along (a perfectly inelastic scenario), the total momentum of the ball-pin combo after impact must still equal the initial momentum of the ball.
*   **Formal/Mathematical Version:** For an isolated system, the total linear momentum before the collision ($\vec{p}_{total, initial}$) equals the total linear momentum after the collision ($\vec{p}_{total, final}$).
    $$ \vec{p}_{total, initial} = \vec{p}_{total, final} $$
    For two objects with masses $m_1$ and $m_2$ and initial velocities $\vec{v}_{1i}$ and $\vec{v}_{2i}$, and a common final velocity $\vec{v}_f$:
    $$ m_1 \vec{v}_{1i} + m_2 \vec{v}_{2i} = (m_1 + m_2) \vec{v}_f $$
    Remember that momentum is a vector, so this equation holds for each dimension (x, y, z) independently.
*   **What Could Go Wrong:** The most common mistake is forgetting that momentum is a vector. This means you must pay close attention to the direction of velocities (e.g., using positive and negative signs for 1D motion, or components for 2D motion). Another error is forgetting to sum the masses on the right side for the combined object.

### ### Step 3: Kinetic Energy is NOT Conserved

*   **Plain-English Statement:** Unlike some "bouncy" collisions (elastic ones), in a perfectly inelastic collision, the total energy of motion (kinetic energy) *decreases*. It doesn't disappear, but it gets transformed into other forms of energy, like heat (from friction and deformation), sound, or permanent deformation of the objects (like crumpling metal).
*   **Small Concrete Example:** When two cars crash and crumple together, you hear a loud noise, feel heat, and see the cars permanently deformed. All that sound, heat, and structural damage came from the initial kinetic energy of the cars. The combined, crumpled wreck moving slowly afterwards has much less kinetic energy than the cars had before.
*   **Formal/Mathematical Version:**
    The initial kinetic energy is:
    $$ KE_{initial} = \frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 $$
    The final kinetic energy is:
    $$ KE_{final} = \frac{1}{2}(m_1 + m_2) v_f^2 $$
    For a perfectly inelastic collision, we always have:
    $$ KE_{initial} > KE_{final} $$
    The difference, $\Delta KE = KE_{initial} - KE_{final}$, represents the kinetic energy converted into other forms.
*   **What Could Go Wrong:** A very common trap is to try and apply conservation of kinetic energy to a perfectly inelastic collision. This is incorrect. Kinetic energy is *only* conserved in *perfectly elastic* collisions. Always remember that for perfectly inelastic collisions, KE is lost.

### ### Step 4: The "Maximum KE Loss" Aspect

*   **Plain-English Statement:** A perfectly inelastic collision results in the *greatest possible loss* of kinetic energy. Think about it: if objects stick together, they move as one, meaning there's no relative motion between them *after* the collision. This complete lack of "bounciness" or relative motion signifies that the maximum amount of initial kinetic energy has been converted into other forms (heat, sound, deformation). Any collision where objects bounce even slightly would retain more kinetic energy.
*   **Small Concrete Example:** Imagine hitting a nail with a hammer. If the hammer bounces off the nail, some kinetic energy is retained by the hammer. If the hammer hits the nail and drives it completely into the wood, effectively "sticking" with the nail for a moment as it pushes it, more of the hammer's kinetic energy is transferred to the nail and dissipated into the wood as work done, heat, and sound. The "sticking" scenario represents maximum energy transfer (and thus maximum KE loss for the hammer-nail system if we consider the nail's motion as part of the "system's" KE).
*   **Formal/Mathematical Version:** The maximum loss of kinetic energy occurs when the relative velocity between the colliding objects after the collision is zero. This is precisely the condition for a perfectly inelastic collision ($v_{1f} = v_{2f} = v_f$).
    If you were to derive the kinetic energy loss for a general inelastic collision, you would find that the loss is maximized when the final relative velocity is zero.
*   **What Could Go Wrong:** Not understanding *why* the KE loss is maximum. It's not arbitrary; it's a direct consequence of the objects moving with a common final velocity. If they had any relative velocity after the collision, that relative motion would itself represent kinetic energy that *wasn't* lost, meaning the loss wouldn't be maximal.

### ### Step 5: Calculating the Common Final Velocity

*   **Plain-English Statement:** Since we know momentum is conserved and the objects stick together, we can use the momentum conservation equation to find out how fast the combined object will move after the collision. It's like averaging the "oomph" of the individual objects, weighted by their masses.
*   **Small Concrete Example:** A 1 kg ball moving at 10 m/s hits a stationary 4 kg block and sticks to it. The total initial momentum is $1 \text{ kg} \times 10 \text{ m/s} = 10 \text{ kg}\cdot\text{m/s}$. After they stick, the total mass is $1 \text{ kg} + 4 \text{ kg} = 5 \text{ kg}$. So, $10 \text{ kg}\cdot\text{m/s} = 5 \text{ kg} \times v_f$, which means $v_f = 2 \text{ m/s}$.
*   **Formal/Mathematical Version:** Starting from the conservation of momentum equation:
    $$ m_1 \vec{v}_{1i} + m_2 \vec{v}_{2i} = (m_1 + m_2) \vec{v}_f $$
    We can solve for the common final velocity $\vec{v}_f$:
    $$ \vec{v}_f = \frac{m_1 \vec{v}_{1i} + m_2 \vec{v}_{2i}}{m_1 + m_2} $$
    This formula is extremely important for perfectly inelastic collisions.
*   **What Could Go Wrong:** Algebraic errors, especially when dealing with negative velocities (objects moving in opposite directions). It's crucial to assign a consistent positive direction and stick to it. Also, forgetting to sum the masses in the denominator.

## 5. Worked examples — multiple, with every step shown

### Example 1: One object moving, one stationary (1D)

**Problem:** A 2.0 kg block slides across a frictionless surface at 5.0 m/s and collides with a stationary 3.0 kg block. The two blocks stick together after the collision.
a) What is their common final velocity?
b) How much kinetic energy is lost during the collision?

**Given:**
*   $m_1 = 2.0 \text{ kg}$
*   $v_{1i} = 5.0 \text{ m/s}$
*   $m_2 = 3.0 \text{ kg}$
*   $v_{2i} = 0 \text{ m/s}$ (stationary)

**Want:**
*   $v_f$
*   $\Delta KE$

**Solution:**

**a) Calculate the common final velocity ($v_f$):**

1.  **Identify the type of collision:** The problem states the blocks "stick together," which immediately tells us this is a perfectly inelastic collision.
    *   *Explanation:* This allows us to use the conservation of momentum equation where the final masses combine and move with a common velocity.

2.  **Apply the principle of conservation of momentum:**
    $$ m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2) v_f $$
    *   *Explanation:* The total momentum before the collision (left side) must equal the total momentum after the collision (right side).

3.  **Substitute the given values into the equation:**
    $$ (2.0 \text{ kg})(5.0 \text{ m/s}) + (3.0 \text{ kg})(0 \text{ m/s}) = (2.0 \text{ kg} + 3.0 \text{ kg}) v_f $$
    *   *Explanation:* We're plugging in the known masses and initial velocities. Note that the second block's initial velocity is zero because it's stationary.

4.  **Perform the multiplications and additions:**
    $$ 10.0 \text{ kg}\cdot\text{m/s} + 0 \text{ kg}\cdot\text{m/s} = (5.0 \text{ kg}) v_f $$
    $$ 10.0 \text{ kg}\cdot\text{m/s} = (5.0 \text{ kg}) v_f $$
    *   *Explanation:* Simplify both sides of the equation.

5.  **Solve for $v_f$:**
    $$ v_f = \frac{10.0 \text{ kg}\cdot\text{m/s}}{5.0 \text{ kg}} $$
    $$ \boxed{v_f = 2.0 \text{ m/s}} $$
    *   *Explanation:* Divide the total initial momentum by the total final mass to find the common final velocity. The units cancel correctly to give m/s.

**b) Calculate the kinetic energy lost ($\Delta KE$):**

1.  **Calculate the initial kinetic energy ($KE_{initial}$):**
    $$ KE_{initial} = \frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 $$
    *   *Explanation:* This is the sum of the kinetic energies of each block before the collision.

2.  **Substitute values for initial kinetic energy:**
    $$ KE_{initial} = \frac{1}{2}(2.0 \text{ kg})(5.0 \text{ m/s})^2 + \frac{1}{2}(3.0 \text{ kg})(0 \text{ m/s})^2 $$
    $$ KE_{initial} = \frac{1}{2}(2.0 \text{ kg})(25.0 \text{ m}^2/\text{s}^2) + 0 $$
    $$ KE_{initial} = 25.0 \text{ J} $$
    *   *Explanation:* Square the velocities first, then multiply. The stationary block contributes zero initial kinetic energy.

3.  **Calculate the final kinetic energy ($KE_{final}$):**
    $$ KE_{final} = \frac{1}{2}(m_1 + m_2) v_f^2 $$
    *   *Explanation:* This is the kinetic energy of the combined mass moving at the common final velocity.

4.  **Substitute values for final kinetic energy (using $v_f$ from part a):**
    $$ KE_{final} = \frac{1}{2}(2.0 \text{ kg} + 3.0 \text{ kg})(2.0 \text{ m/s})^2 $$
    $$ KE_{final} = \frac{1}{2}(5.0 \text{ kg})(4.0 \text{ m}^2/\text{s}^2) $$
    $$ KE_{final} = 10.0 \text{ J} $$
    *   *Explanation:* Use the combined mass and the calculated final velocity.

5.  **Calculate the kinetic energy lost ($\Delta KE$):**
    $$ \Delta KE = KE_{initial} - KE_{final} $$
    $$ \Delta KE = 25.0 \text{ J} - 10.0 \text{ J} $$
    $$ \boxed{\Delta KE = 15.0 \text{ J}} $$
    *   *Explanation:* The lost kinetic energy is simply the difference between the initial and final kinetic energies. Since this is a perfectly inelastic collision, we expect $KE_{initial} > KE_{final}$, resulting in a positive value for energy lost.

**Reflection:** This example was straightforward because it was 1D and one object was initially stationary. The key was correctly applying momentum conservation and then separately calculating initial and final kinetic energies to find the loss. The positive value for $\Delta KE$ confirms that energy was indeed lost, as expected for a perfectly inelastic collision.

### Example 2: Two objects moving towards each other (1D)

**Problem:** A 1.5 kg cart moving to the right at 4.0 m/s collides head-on with a 2.5 kg cart moving to the left at 2.0 m/s. They stick together after the collision.
a) What is their common final velocity?
b) How much kinetic energy is lost during the collision?

**Given:**
*   $m_1 = 1.5 \text{ kg}$
*   $v_{1i} = +4.0 \text{ m/s}$ (assuming right is positive)
*   $m_2 = 2.5 \text{ kg}$
*   $v_{2i} = -2.0 \text{ m/s}$ (moving left, so negative velocity)

**Want:**
*   $v_f$
*   $\Delta KE$

**Solution:**

**a) Calculate the common final velocity ($v_f$):**

1.  **Identify the type of collision:** The carts "stick together," indicating a perfectly inelastic collision.
    *   *Explanation:* This confirms we use combined mass and common final velocity in momentum conservation.

2.  **Define a positive direction:** Let's choose "right" as the positive direction. This means $v_{1i}$ is positive and $v_{2i}$ is negative.
    *   *Explanation:* Momentum is a vector, so direction is critical. Assigning signs consistently is essential for 1D problems.

3.  **Apply conservation of momentum:**
    $$ m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2) v_f $$
    *   *Explanation:* The total momentum before equals the total momentum after.

4.  **Substitute values, paying close attention to signs:**
    $$ (1.5 \text{ kg})(+4.0 \text{ m/s}) + (2.5 \text{ kg})(-2.0 \text{ m/s}) = (1.5 \text{ kg} + 2.5 \text{ kg}) v_f $$
    *   *Explanation:* The negative sign for $v_{2i}$ is crucial because the second cart is moving in the opposite direction.

5.  **Perform calculations:**
    $$ 6.0 \text{ kg}\cdot\text{m/s} - 5.0 \text{ kg}\cdot\text{m/s} = (4.0 \text{ kg}) v_f $$
    $$ 1.0 \text{ kg}\cdot\text{m/s} = (4.0 \text{ kg}) v_f $$
    *   *Explanation:* Calculate the momentum for each cart and sum them.

6.  **Solve for $v_f$:**
    $$ v_f = \frac{1.0 \text{ kg}\cdot\text{m/s}}{4.0 \text{ kg}} $$
    $$ \boxed{v_f = +0.25 \text{ m/s}} $$
    *   *Explanation:* The positive sign indicates that the combined carts move to the right after the collision.

**b) Calculate the kinetic energy lost ($\Delta KE$):**

1.  **Calculate the initial kinetic energy ($KE_{initial}$):**
    $$ KE_{initial} = \frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 $$
    *   *Explanation:* Sum of initial kinetic energies. Note that kinetic energy is a scalar, so the squaring of velocity makes the direction sign irrelevant for $v^2$.

2.  **Substitute values for initial kinetic energy:**
    $$ KE_{initial} = \frac{1}{2}(1.5 \text{ kg})(4.0 \text{ m/s})^2 + \frac{1}{2}(2.5 \text{ kg})(-2.0 \text{ m/s})^2 $$
    $$ KE_{initial} = \frac{1}{2}(1.5)(16) + \frac{1}{2}(2.5)(4) $$
    $$ KE_{initial} = 12.0 \text{ J} + 5.0 \text{ J} $$
    $$ KE_{initial} = 17.0 \text{ J} $$
    *   *Explanation:* Calculate each term. The negative sign for $v_{2i}$ becomes positive when squared.

3.  **Calculate the final kinetic energy ($KE_{final}$):**
    $$ KE_{final} = \frac{1}{2}(m_1 + m_2) v_f^2 $$
    *   *Explanation:* Kinetic energy of the combined mass.

4.  **Substitute values for final kinetic energy:**
    $$ KE_{final} = \frac{1}{2}(1.5 \text{ kg} + 2.5 \text{ kg})(+0.25 \text{ m/s})^2 $$
    $$ KE_{final} = \frac{1}{2}(4.0 \text{ kg})(0.0625 \text{ m}^2/\text{s}^2) $$
    $$ KE_{final} = 0.125 \text{ J} $$
    *   *Explanation:* Use the total mass and the calculated final velocity.

5.  **Calculate the kinetic energy lost ($\Delta KE$):**
    $$ \Delta KE = KE_{initial} - KE_{final} $$
    $$ \Delta KE = 17.0 \text{ J} - 0.125 \text{ J} $$
    $$ \boxed{\Delta KE = 16.875 \text{ J}} $$
    *   *Explanation:* Subtract final KE from initial KE. A positive result confirms energy loss.

**Reflection:** The trickiest part here was correctly handling the negative velocity for the cart moving left. For momentum, the sign matters. For kinetic energy, $v^2$ always results in a positive value. Notice how much kinetic energy was lost in this collision – a significant amount, as expected for a perfectly inelastic collision.

### Example 3: Ballistic Pendulum (combining momentum and energy conservation)

**Problem:** A 0.010 kg bullet is fired horizontally into a 2.0 kg wooden block initially at rest on a frictionless surface. The bullet embeds itself in the block, and the block (with the bullet) then slides up a ramp to a maximum vertical height of 0.050 m.
a) What is the speed of the bullet-block system immediately after the collision?
b) What was the initial speed of the bullet?

**Given:**
*   $m_b = 0.010 \text{ kg}$ (mass of bullet)
*   $m_w = 2.0 \text{ kg}$ (mass of wooden block)
*   $v_{wi} = 0 \text{ m/s}$ (initial velocity of block)
*   $h = 0.050 \text{ m}$ (maximum height reached)
*   $g = 9.8 \text{ m/s}^2$ (acceleration due to gravity)

**Want:**
*   $V_f$ (speed of bullet-block system immediately after collision)
*   $v_{bi}$ (initial speed of bullet)

**Solution:**

**a) Calculate the speed of the bullet-block system immediately after the collision ($V_f$):**

1.  **Identify the two phases:** This problem has two distinct phases:
    *   **Phase 1: Collision** (bullet hits block and embeds) - This is a perfectly inelastic collision where momentum is conserved, but kinetic energy is *not*.
    *   **Phase 2: Ascent** (bullet-block system slides up ramp) - After the collision, the combined system moves, and its kinetic energy is converted into gravitational potential energy. Here, *mechanical energy is conserved* (assuming frictionless ramp).
    *   *Explanation:* Recognizing these phases is critical. We can't use energy conservation across the collision, nor momentum conservation for the ascent.

2.  **Focus on Phase 2 (Ascent) first, using conservation of mechanical energy:**
    The kinetic energy of the combined system immediately after the collision ($KE_{after\_coll}$) is converted into gravitational potential energy ($PE_g$) at the maximum height.
    $$ KE_{after\_coll} = PE_{g, max} $$
    $$ \frac{1}{2}(m_b + m_w)V_f^2 = (m_b + m_w)gh $$
    *   *Explanation:* The total mass $(m_b + m_w)$ moves with velocity $V_f$ and reaches height $h$. The mass term cancels out, simplifying the calculation.

3.  **Solve for $V_f$:**
    $$ \frac{1}{2}V_f^2 = gh $$
    $$ V_f^2 = 2gh $$
    $$ V_f = \sqrt{2gh} $$
    *   *Explanation:* Isolate $V_f$ algebraically.

4.  **Substitute values and calculate $V_f$:**
    $$ V_f = \sqrt{2(9.8 \text{ m/s}^2)(0.050 \text{ m})} $$
    $$ V_f = \sqrt{0.98 \text{ m}^2/\text{s}^2} $$
    $$ \boxed{V_f \approx 0.990 \text{ m/s}} $$
    *   *Explanation:* Plug in the given values for $g$ and $h$. This is the speed of the combined bullet-block system right after the collision.

**b) Calculate the initial speed of the bullet ($v_{bi}$):**

1.  **Focus on Phase 1 (Collision), using conservation of momentum:**
    $$ m_b v_{bi} + m_w v_{wi} = (m_b + m_w)V_f $$
    *   *Explanation:* This applies to the instantaneous moment of collision. The initial momentum of the bullet plus the block equals the final momentum of the combined system.

2.  **Substitute known values (including $V_f$ from part a):**
    $$ (0.010 \text{ kg})v_{bi} + (2.0 \text{ kg})(0 \text{ m/s}) = (0.010 \text{ kg} + 2.0 \text{ kg})(0.990 \text{ m/s}) $$
    *   *Explanation:* The block's initial velocity is zero. We use the calculated $V_f$ for the combined system.

3.  **Perform calculations:**
    $$ (0.010 \text{ kg})v_{bi} = (2.010 \text{ kg})(0.990 \text{ m/s}) $$
    $$ (0.010 \text{ kg})v_{bi} = 1.990 \text{ kg}\cdot\text{m/s} $$
    *   *Explanation:* Simplify both sides.

4.  **Solve for $v_{bi}$:**
    $$ v_{bi} = \frac{1.990 \text{ kg}\cdot\text{m/s}}{0.010 \text{ kg}} $$
    $$ \boxed{v_{bi} \approx 199 \text{ m/s}} $$
    *   *Explanation:* Divide by the bullet's mass to find its initial velocity.

**Reflection:** This example is harder because it combines two different conservation laws over two distinct time intervals. The key is to recognize *when* each conservation law applies: momentum for the collision (perfectly inelastic), and mechanical energy for the subsequent motion. Trying to conserve kinetic energy across the collision would be a major error.

### Example 4: Two objects colliding at right angles (2D)

**Problem:** A 1.0 kg block ($m_1$) moving east at 3.0 m/s collides with a 2.0 kg block ($m_2$) moving north at 2.0 m/s. The blocks stick together after the collision.
a) What is the magnitude and direction of their common final velocity?
b) How much kinetic energy is lost during the collision?

**Given:**
*   $m_1 = 1.0 \text{ kg}$
*   $\vec{v}_{1i} = (3.0 \text{ m/s}, 0)$ (moving east, so x-direction)
*   $m_2 = 2.0 \text{ kg}$
*   $\vec{v}_{2i} = (0, 2.0 \text{ m/s})$ (moving north, so y-direction)

**Want:**
*   Magnitude and direction of $\vec{v}_f$
*   $\Delta KE$

**Solution:**

**a) Calculate the common final velocity ($\vec{v}_f$):**

1.  **Identify the collision type and coordinate system:** "Stick together" means perfectly inelastic. We'll use a standard Cartesian coordinate system where East is +x and North is +y.
    *   *Explanation:* For 2D collisions, momentum conservation must be applied independently in the x and y directions.

2.  **Apply conservation of momentum in the x-direction:**
    $$ (m_1 v_{1i,x}) + (m_2 v_{2i,x}) = (m_1 + m_2) v_{f,x} $$
    *   *Explanation:* The sum of initial x-momenta equals the final x-momentum of the combined mass.

3.  **Substitute values for x-direction:**
    $$ (1.0 \text{ kg})(3.0 \text{ m/s}) + (2.0 \text{ kg})(0 \text{ m/s}) = (1.0 \text{ kg} + 2.0 \text{ kg}) v_{f,x} $$
    $$ 3.0 \text{ kg}\cdot\text{m/s} = (3.0 \text{ kg}) v_{f,x} $$
    $$ v_{f,x} = \frac{3.0 \text{ kg}\cdot\text{m/s}}{3.0 \text{ kg}} = 1.0 \text{ m/s} $$
    *   *Explanation:* Block 2 has no initial x-velocity.

4.  **Apply conservation of momentum in the y-direction:**
    $$ (m_1 v_{1i,y}) + (m_2 v_{2i,y}) = (m_1 + m_2) v_{f,y} $$
    *   *Explanation:* The sum of initial y-momenta equals the final y-momentum of the combined mass.

5.  **Substitute values for y-direction:**
    $$ (1.0 \text{ kg})(0 \text{ m/s}) + (2.0 \text{ kg})(2.0 \text{ m/s}) = (1.0 \text{ kg} + 2.0 \text{ kg}) v_{f,y} $$
    $$ 4.0 \text{ kg}\cdot\text{m/s} = (3.0 \text{ kg}) v_{f,y} $$
    $$ v_{f,y} = \frac{4.0 \text{ kg}\cdot\text{m/s}}{3.0 \text{ kg}} \approx 1.33 \text{ m/s} $$
    *   *Explanation:* Block 1 has no initial y-velocity.

6.  **Calculate the magnitude of the final velocity ($|\vec{v}_f|$):**
    $$ |\vec{v}_f| = \sqrt{v_{f,x}^2 + v_{f,y}^2} $$
    $$ |\vec{v}_f| = \sqrt{(1.0 \text{ m/s})^2 + (1.33 \text{ m/s})^2} $$
    $$ |\vec{v}_f| = \sqrt{1.0 \text{ m}^2/\text{s}^2 + 1.7689 \text{ m}^2/\text{s}^2} $$
    $$ |\vec{v}_f| = \sqrt{2.7689 \text{ m}^2/\text{s}^2} $$
    $$ \boxed{|\vec{v}_f| \approx 1.66 \text{ m/s}} $$
    *   *Explanation:* Use the Pythagorean theorem for vector magnitudes.

7.  **Calculate the direction of the final velocity ($\theta$):**
    $$ \theta = \arctan\left(\frac{v_{f,y}}{v_{f,x}}\right) $$
    $$ \theta = \arctan\left(\frac{1.33 \text{ m/s}}{1.0 \text{ m/s}}\right) $$
    $$ \theta \approx \arctan(1.33) $$
    $$ \boxed{\theta \approx 53.1^\circ \text{ North of East}} $$
    *   *Explanation:* Use the arctangent function. Since both components are positive, the angle is in the first quadrant (North of East).

**b) Calculate the kinetic energy lost ($\Delta KE$):**

1.  **Calculate the initial kinetic energy ($KE_{initial}$):**
    $$ KE_{initial} = \frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 $$
    *   *Explanation:* Sum of initial kinetic energies.

2.  **Substitute values for initial kinetic energy:**
    $$ KE_{initial} = \frac{1}{2}(1.0 \text{ kg})(3.0 \text{ m/s})^2 + \frac{1}{2}(2.0 \text{ kg})(2.0 \text{ m/s})^2 $$
    $$ KE_{initial} = \frac{1}{2}(1.0)(9.0) + \frac{1}{2}(2.0)(4.0) $$
    $$ KE_{initial} = 4.5 \text{ J} + 4.0 \text{ J} $$
    $$ KE_{initial} = 8.5 \text{ J} $$
    *   *Explanation:* Calculate each term.

3.  **Calculate the final kinetic energy ($KE_{final}$):**
    $$ KE_{final} = \frac{1}{2}(m_1 + m_2) |\vec{v}_f|^2 $$
    *   *Explanation:* Kinetic energy of the combined mass using the magnitude of the final velocity.

4.  **Substitute values for final kinetic energy:**
    $$ KE_{final} = \frac{1}{2}(1.0 \text{ kg} + 2.0 \text{ kg})(1.66 \text{ m/s})^2 $$
    $$ KE_{final} = \frac{1}{2}(3.0 \text{ kg})(2.7556 \text{ m}^2/\text{s}^2) $$
    $$ KE_{final} = 4.1334 \text{ J} $$
    *   *Explanation:* Use the total mass and the calculated magnitude of the final velocity.

5.  **Calculate the kinetic energy lost ($\Delta KE$):**
    $$ \Delta KE = KE_{initial} - KE_{final} $$
    $$ \Delta KE = 8.5 \text{ J} - 4.1334 \text{ J} $$
    $$ \boxed{\Delta KE \approx 4.37 \text{ J}} $$
    *   *Explanation:* Subtract final KE from initial KE.

**Reflection:** This 2D example highlights the vector nature of momentum. It's crucial to break down velocities into components, apply momentum conservation for each component separately, and then recombine the final velocity components using Pythagorean theorem and arctangent. Kinetic energy, being a scalar, doesn't require component breakdown, but relies on the magnitude of velocities.

## 6. Common mistakes and traps

1.  **Forgetting momentum is a vector:** Many students treat velocity as a scalar in 1D problems, forgetting to assign negative signs for objects moving in the opposite direction. In 2D, they might forget to conserve momentum in both x and y directions independently.
2.  **Assuming kinetic energy is conserved:** This is the most prevalent mistake. Perfectly inelastic collisions *by definition* involve a loss of kinetic energy. Only perfectly elastic collisions conserve kinetic energy.
3.  **Incorrectly summing masses:** On the right-hand side of the momentum conservation equation for a perfectly inelastic collision, the masses *must* be summed as $(m_1 + m_2)$ because the objects move as a single unit. Forgetting this or trying to keep them separate is an error.
4.  **Algebraic errors with signs or squaring:** Be meticulous with arithmetic, especially when squaring negative velocities for kinetic energy calculations (where $(-v)^2 = v^2$) versus using negative velocities for momentum (where direction matters).
5.  **Mixing up initial and final states:** Carefully distinguish between initial velocities ($v_i$) and final velocities ($v_f$), and initial kinetic energy ($KE_i$) and final kinetic energy ($KE_f$).
6.  **Not understanding *why* KE is lost:** Simply stating that KE is lost isn't enough. A deeper understanding involves recognizing that the energy is transformed into other forms (heat, sound, deformation) and that the "sticking together" condition (zero relative velocity after collision) inherently implies maximum KE loss.

## 7. Textbook-precise explanation

A **perfectly inelastic collision** is a type of collision in an isolated system where the colliding bodies stick together after impact and move as a single combined entity. This condition implies that the relative velocity between the colliding objects is zero immediately after the collision.

In such a collision, the total linear momentum of the system *is conserved*. For two bodies with masses $m_1$ and $m_2$ and initial velocities $\vec{v}_{1i}$ and $\vec{v}_{2i}$, and a common final velocity $\vec{v}_f$:

$$ m_1 \vec{v}_{1i} + m_2 \vec{v}_{2i} = (m_1 + m_2) \vec{v}_f $$

This equation is a vector equation and must be applied component-wise in multiple dimensions.

However, the total kinetic energy of the system *is not conserved*. Instead, a perfectly inelastic collision results in the *maximum possible loss* of kinetic energy consistent with the conservation of linear momentum. This lost kinetic energy is converted into other forms of energy, primarily internal energy (heat, sound, and energy associated with permanent deformation of the colliding bodies).

The initial kinetic energy of the system is given by:
$$ KE_{initial} = \frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 $$
The final kinetic energy of the combined system is:
$$ KE_{final} = \frac{1}{2}(m_1 + m_2) v_f^2 $$
The kinetic energy lost, $\Delta KE$, is:
$$ \Delta KE = KE_{initial} - KE_{final} $$
For a perfectly inelastic collision, $\Delta KE > 0$. The maximum kinetic energy loss occurs because the final state has the minimum possible kinetic energy while still preserving the total linear momentum of the system. This minimum kinetic energy corresponds to the kinetic energy of the center of mass of the system, as all relative motion (which contributes to kinetic energy) has ceased.

(See, for instance, Serway & Jewett, *Physics for Scientists and Engineers*, 10e, Chapter 9, Section 9.4; or Halliday, Resnick, & Walker, *Fundamentals of Physics*, 11e, Chapter 9, Section 9.7.)

## 8. ASCII diagrams

Here are a couple of ASCII diagrams to visualize perfectly inelastic collisions:

**1. One-Dimensional Collision (Objects merging)**

This depicts two objects moving along a line, colliding, and then moving together as a single unit.

```text
  Before Collision:
  -----------------------------------------------------> (positive direction)

  (m1) ----> v1i         (m2) ----> v2i
  (e.g., v1i > 0, v2i can be 0, positive, or negative)


  During Collision (brief moment of impact and deformation):
  (m1)====(m2)  <-- Energy being dissipated (heat, sound, deformation)


  After Collision:
  -----------------------------------------------------> (positive direction)

          (m1+m2) ----> vf
          (moving as one combined mass)
```

**2. Ballistic Pendulum (Collision followed by motion due to gravity)**

This illustrates a bullet striking a block and embedding, causing the block to swing upwards. The collision is perfectly inelastic, and the subsequent swing conserves mechanical energy.

```text
  Phase 1: Collision (Perfectly Inelastic)
  -----------------------------------------------------> (horizontal surface)

  Bullet (m) --> v_bullet,initial
                 |
                 V
               +-----+
               |     | Block (M) at rest
               |     |
               +-----+

  Immediately After Collision:
               +-----+
               | m+M | --> V_combined
               |     |
               +-----+
               (Bullet embedded, moving as one)


  Phase 2: Swing (Mechanical Energy Conservation)
  -----------------------------------------------------> (horizontal reference)

  From:
               +-----+
               | m+M | --> V_combined
               |     |
               +-----+

  To:
                       (at max height h)
                       +-----+
                       | m+M |
                       |     |
                       +-----+
                         ^
                         | h
                         |
                       (initial height)

  (The combined mass swings up, converting kinetic energy into gravitational potential energy until it momentarily stops at height h.)
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"Sticky & Lost"**: Think of two blobs of **sticky** Play-Doh smashing together. They become one blob (**perfectly inelastic**), and the energy of their motion is **lost** as they squish and deform. The "lost" part specifically reminds you that Kinetic Energy is NOT conserved.
    *   **Visual:** Picture two cars crashing head-on, crumpling completely, and locking together into a single, mangled wreck. The sound, the twisted metal, the heat – all that initial kinetic energy is gone from the motion.

2.  **Formulas/Facts to Overlearn:**
    *   **Conservation of Momentum (for perfectly inelastic collisions):**
        $$ m_1 \vec{v}_{1i} + m_2 \vec{v}_{2i} = (m_1 + m_2) \vec{v}_f $$
        (This is the workhorse equation. Know it cold.)
    *   **Kinetic Energy (and its non-conservation):**
        $$ KE = \frac{1}{2}mv^2 $$
        (Crucially, remember that $KE_{initial} > KE_{final}$ for this type of collision.)
    *   **Defining characteristic:** Objects *stick together* and have a *common final velocity*.

3.  **Spaced-Repetition Schedule:**
    *   **Today:** Review this lesson thoroughly. Do the self-check questions.
    *   **1 Day Later:** Briefly review the "Sticky & Lost" mnemonic, the two key formulas/facts, and mentally re-derive the common final velocity.
    *   **3 Days Later:** Work through one or two of the worked examples again, without looking at the solution, then check your work.
    *   **7 Days Later:** Attempt the hardest self-check question. Explain the concept of "maximum KE loss" in your own words.
    *   **16 Days Later:** Review the entire lesson. Can you explain every section without looking?
    *   **35 Days Later:** Create your own perfectly inelastic collision problem and solve it.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the specific formula for $v_f$ in a perfectly inelastic collision, you can always rebuild it from first principles:
    *   **Start with Newton's Second Law in Impulse-Momentum form:** For each object, $\vec{F}_{net} \Delta t = \Delta \vec{p}$. For an isolated system during collision, internal forces are equal and opposite (Newton's 3rd Law), so they cancel out when summed.
    *   **Sum the momentum changes:** For objects 1 and 2, $\Delta \vec{p}_1 + \Delta \vec{p}_2 = 0$.
    *   **Expand momentum changes:** $(m_1 \vec{v}_{1f} - m_1 \vec{v}_{1i}) + (m_2 \vec{v}_{2f} - m_2 \vec{v}_{2i}) = 0$.
    *   **Rearrange to initial = final:** $m_1 \vec{v}_{1i} + m_2 \vec{v}_{2i} = m_1 \vec{v}_{1f} + m_2 \vec{v}_{2f}$. (This is general conservation of momentum).
    *   **Apply the "perfectly inelastic" condition:** For perfectly inelastic, $\vec{v}_{1f} = \vec{v}_{2f} = \vec{v}_f$.
    *   **Substitute the condition:** $m_1 \vec{v}_{1i} + m_2 \vec{v}_{2i} = m_1 \vec{v}_f + m_2 \vec{v}_f$.
    *   **Factor out $\vec{v}_f$:** $m_1 \vec{v}_{1i} + m_2 \vec{v}_{2i} = (m_1 + m_2) \vec{v}_f$.
    *   **Solve for $\vec{v}_f$ (if needed):** $\vec{v}_f = \frac{m_1 \vec{v}_{1i} + m_2 \vec{v}_{2i}}{m_1 + m_2}$.

This pathway ensures that even if you blank on the exact formula, you can derive it from the fundamental principle of momentum conservation and the definition of a perfectly inelastic collision.

## 10. Connections — what this leads to

Understanding perfectly inelastic collisions is a foundational step that unlocks several more advanced and related topics in physics and engineering:

*   **General Inelastic Collisions:** Perfectly inelastic collisions are an extreme case of inelastic collisions. This topic sets the stage for understanding collisions where kinetic energy is lost but objects *do* separate, requiring more complex analysis of energy dissipation.
*   **Impulse and Impact Forces:** The concept of momentum transfer during collisions is directly related to impulse ($\vec{J} = \Delta \vec{p}$) and average impact forces ($\vec{F}_{avg} = \vec{J}/\Delta t$). Understanding how momentum changes allows engineers to calculate the forces involved in a crash, which is vital for safety design.
*   **Center of Mass Motion:** The total momentum of a system is equal to the total mass times the velocity of its center of mass ($P_{total} = M_{total} V_{CM}$). In a perfectly inelastic collision, the final velocity of the combined object is precisely the velocity of the center of mass of the initial system. This connection is crucial for understanding how systems of particles behave.
*   **Rocket Propulsion (Advanced):** While rocket exhaust is typically treated as an elastic process in terms of relative velocity, the underlying principles of momentum conservation are identical. Understanding how mass is ejected to create thrust relies on the same fundamental momentum principles. Furthermore, understanding impact dynamics is crucial for designing rocket components that can withstand launch vibrations and stage separation impacts.
*   **Rotational Collisions and Angular Momentum:** The principles of momentum conservation extend to rotational motion (angular momentum). Perfectly inelastic rotational collisions, where objects stick and rotate together, are analyzed similarly, conserving angular momentum.
*   **Energy Dissipation and Material Science:** The "lost" kinetic energy in perfectly inelastic collisions is not truly lost but transformed. This leads to studies in material science about how materials absorb impact energy through deformation, fracture, and heat generation, informing the design of protective gear, blast shields, and earthquake-resistant structures.
*   **Relativistic Collisions:** At very high speeds approaching the speed of light, classical momentum and energy equations need to be modified by Einstein's theory of special relativity. The concepts of momentum and energy conservation still hold, but their mathematical forms change, and even mass can be seen to change.

## 11. Self-check questions

1.  A 50 g golf ball moving at 20 m/s strikes a 200 g block of clay that is at rest. The golf ball embeds itself in the clay. What is the final velocity of the combined golf ball and clay block?
2.  Two freight cars, one with a mass of 10,000 kg moving at 3.0 m/s and another with a mass of 15,000 kg moving in the opposite direction at 2.0 m/s, collide and couple together. What is their final velocity, and in which direction do they move?
3.  A 0.005 kg bullet is fired into a 1.2 kg wooden block hanging from a string. The bullet embeds in the block, and the block (with bullet) swings up to a height of 0.08 m above its initial position. What was the initial speed of the bullet? (Assume $g = 9.8 \text{ m/s}^2$)
4.  A 3.0 kg object moving at 4.0 m/s along the x-axis collides with a 2.0 kg object moving at 6.0 m/s along the y-axis. They stick together after the collision.
    a) Calculate the magnitude and direction of the final velocity of the combined object.
    b) Calculate the percentage of kinetic energy lost during this collision.
5.  Consider a perfectly inelastic collision between two objects of equal mass, $m$. Object 1 is moving with velocity $v_0$ and object 2 is at rest.
    a) Derive a general expression for the final velocity of the combined mass in terms of $v_0$.
    b) Derive a general expression for the fraction of initial kinetic energy that is lost in this collision. Explain why this fraction represents the maximum possible loss.