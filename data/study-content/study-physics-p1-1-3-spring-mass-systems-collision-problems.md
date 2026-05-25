## 1. What it is — in plain English

Imagine you have a toy car rolling along a smooth floor, and it crashes into a Slinky (a spring) that's standing upright. What happens?

First, the car hits the Slinky. This is the "collision" part. The car's motion pushes the Slinky, causing it to squish or compress. As the Slinky squishes, it pushes back on the car, trying to resist being compressed. Eventually, the Slinky squishes as much as it can, and the car momentarily stops.

Then, the squished Slinky, having stored up all that energy, starts to expand back to its original shape. As it expands, it pushes the car away, sending it rolling back in the opposite direction (or continuing forward if the spring isn't fixed). This entire process, from the initial impact to the spring compressing and then expanding, is what we mean by a "spring-mass system collision problem."

Essentially, it's about understanding how energy and motion are transferred when an object (the "mass") crashes into a spring, and how that spring reacts by storing and releasing energy. We're looking at the before, during, and after of such an impact.

## 2. Why it matters — real-world applications

Understanding spring-mass system collision problems is fundamental because springs are ubiquitous in engineering and nature, and impacts are unavoidable.

1.  **Vehicle Suspension Systems:** Every car, truck, and motorcycle uses springs (coils, leaf springs, torsion bars) in its suspension. When your car hits a pothole (a collision), the springs absorb the impact energy, preventing it from being transferred directly to the chassis and passengers. Engineers design these systems to optimize ride comfort and handling, balancing spring stiffness and damping.
2.  **Aircraft Landing Gear:** When an aircraft lands, it experiences a significant impact with the runway. The landing gear incorporates complex spring-damper systems to absorb the massive kinetic energy of the plane, ensuring a smooth and safe touchdown without damaging the airframe. This is a large-scale, controlled collision problem.
3.  **Impact Protection and Packaging:** From designing crumple zones in cars to packaging delicate electronics, the principles of spring-mass collisions are used. Materials are chosen and structured to deform (like a spring) during an impact, absorbing energy and protecting the core product. Think of foam packaging around a sensitive rocket component during shipping.
4.  **Sports Equipment:** Golf clubs, tennis rackets, and trampolines all utilize spring-like properties. When a golf club hits a ball, the club head flexes slightly, storing and releasing energy to propel the ball further. A trampoline stores the kinetic energy of a jumper in its springs, then returns it to launch them upwards.
5.  **Seismic Dampers in Buildings:** In earthquake-prone regions, large buildings can be fitted with seismic dampers, which often use spring-like mechanisms (sometimes fluidic, but conceptually similar to energy storage and dissipation) to absorb the violent oscillations caused by ground motion, preventing catastrophic structural failure.

## 3. Prerequisites — what you must know first

Before diving into spring-mass collision problems, ensure you have a solid grasp of these foundational concepts:

*   **Newton's Laws of Motion:** Especially the Second Law ($F=ma$) and the Third Law (action-reaction pairs). These underpin all force interactions.
*   **Work-Energy Theorem:** The net work done on an object equals its change in kinetic energy ($W_{net} = \Delta K$). This links forces, displacement, and motion.
*   **Conservation of Energy:** In an isolated system where only conservative forces do work, the total mechanical energy (kinetic + potential) remains constant ($E_i = E_f$). This is crucial for analyzing the spring's compression and expansion phases.
*   **Conservation of Momentum:** In an isolated system, the total momentum before a collision equals the total momentum after the collision ($p_{initial} = p_{final}$). This is the go-to principle for analyzing the collision phase itself.
*   **Kinetic Energy:** The energy of motion, given by $K = \frac{1}{2}mv^2$.
*   **Potential Energy:** Stored energy. For springs, this is **Elastic Potential Energy** ($U_s = \frac{1}{2}kx^2$), where $k$ is the spring constant and $x$ is the displacement from equilibrium.
*   **Hooke's Law:** Describes the force exerted by a spring: $F_s = -kx$. The negative sign indicates the spring force opposes the displacement.
*   **Types of Collisions:**
    *   **Elastic Collision:** Both momentum and kinetic energy are conserved. Objects bounce off each other without deformation or heat loss.
    *   **Inelastic Collision:** Momentum is conserved, but kinetic energy is *not* conserved (some is lost to heat, sound, deformation).
    *   **Perfectly Inelastic Collision:** A special type of inelastic collision where objects stick together after impact, moving as a single mass. Momentum is conserved, but kinetic energy loss is maximized.

## 4. The core idea — step by step

The core idea behind solving spring-mass collision problems is to break the process down into distinct phases, applying the appropriate conservation laws (momentum or energy) for each phase.

### Step 1: Define the System and Initial State

**Plain English:** Before anything happens, what objects are involved, and how are they moving? Is the spring relaxed or already compressed/stretched?

**Example:** A block of mass $m_1$ is moving with speed $v_1$ towards a second block of mass $m_2$ which is initially at rest and attached to a spring. The spring is initially at its natural length.

**Formal/Mathematical Version:**
Identify all masses ($m_1, m_2, \dots$), their initial velocities ($v_{1i}, v_{2i}, \dots$), and the spring's initial compression/extension ($x_i$).
Total initial momentum: $P_i = m_1 v_{1i} + m_2 v_{2i} + \dots$
Total initial kinetic energy: $K_i = \frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 + \dots$
Total initial potential energy: $U_i = \frac{1}{2}kx_i^2$ (if the spring is not at equilibrium).
Total initial mechanical energy: $E_i = K_i + U_i$.

**What could go wrong:** Forgetting to include all masses in the system, or misidentifying the initial state of the spring (e.g., assuming it's relaxed when it's not).

### Step 2: Analyze the Collision Phase

**Plain English:** The moment the objects hit each other. Is it a bouncy collision (elastic) or do they stick together/deform (inelastic)?

**Example:** Block $m_1$ hits block $m_2$.

**Formal/Mathematical Version:**
*   **Always apply Conservation of Momentum:** For the system of colliding objects, the total momentum *just before* the collision equals the total momentum *just after* the collision.
    $$P_{before} = P_{after}$$
    $$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$$
    (Here, $v_{1f}, v_{2f}$ are velocities *immediately after* the collision, *before* the spring starts significant compression).

*   **If the collision is perfectly inelastic:** The objects stick together and move with a common final velocity, $v_f'$.
    $$m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2) v_f'$$
    In this case, kinetic energy is *not* conserved.

*   **If the collision is elastic:** Both momentum and kinetic energy are conserved.
    $$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$$
    $$\frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 = \frac{1}{2}m_1 v_{1f}^2 + \frac{1}{2}m_2 v_{2f}^2$$
    These two equations allow you to solve for the two unknown final velocities ($v_{1f}, v_{2f}$).

**What could go wrong:** Applying conservation of *kinetic energy* during an inelastic collision. Remember, kinetic energy is usually lost as heat, sound, or deformation in real-world collisions. Momentum, however, is almost always conserved if the system is isolated.

### Step 3: Analyze the Spring Compression/Extension Phase

**Plain English:** After the collision, the object(s) move and interact with the spring. The spring compresses (or stretches), slowing down the object(s) and storing energy. We usually want to find the maximum compression.

**Example:** After $m_1$ and $m_2$ collide (and perhaps stick together, or $m_2$ is now moving), they move towards the spring, compressing it. At maximum compression, the object(s) momentarily stop relative to the spring's equilibrium position (or relative to their common center of mass if they are oscillating).

**Formal/Mathematical Version:**
*   **Apply Conservation of Mechanical Energy:** Once the collision is over and the objects are moving together (or one object is moving and interacting with the spring), and assuming no external non-conservative forces (like friction or air resistance) are doing work, mechanical energy is conserved.
    $$E_{initial\_spring\_phase} = E_{final\_spring\_phase}$$
    $$K_{initial\_spring\_phase} + U_{s, initial\_spring\_phase} = K_{final\_spring\_phase} + U_{s, final\_spring\_phase}$$
    At *maximum compression* (or extension), the kinetic energy of the mass(es) connected to the spring is momentarily zero (relative to the spring's equilibrium position, or relative to the center of mass if the spring is oscillating with the masses). This is a crucial point for solving for maximum compression.
    So, if $v_{final\_spring\_phase} = 0$ at max compression $x_{max}$:
    $$\frac{1}{2}M v_{f}'^2 + \frac{1}{2}kx_{initial}^2 = \frac{1}{2}k x_{max}^2$$
    (where $M$ is the total mass interacting with the spring, and $v_f'$ is the velocity of that mass *just after* the collision, which is the *initial* velocity for this phase).

**What could go wrong:** Forgetting to include the initial potential energy of the spring if it was already compressed/stretched. Incorrectly identifying the kinetic energy of the system (e.g., only one mass when two are moving together). Applying energy conservation *across* the inelastic collision boundary.

### Step 4: Analyze the Rebound/Separation Phase (if applicable)

**Plain English:** After maximum compression, the spring pushes the object(s) back. If the object(s) are not permanently attached to the spring, they might separate.

**Example:** The compressed spring pushes the combined mass $(m_1+m_2)$ back. If $m_1$ was just resting against $m_2$ (which is attached to the spring), $m_1$ might eventually separate from $m_2$.

**Formal/Mathematical Version:**
*   **Apply Conservation of Mechanical Energy (again):** From the point of maximum compression back to the point where the spring returns to its natural length (or some other defined point).
    $$E_{max\_compression} = E_{after\_rebound}$$
    $$\frac{1}{2}k x_{max}^2 = \frac{1}{2}M v_{rebound}^2$$
    (Assuming the spring returns to its natural length, and $U_s = 0$ at that point).

*   **If separation occurs:** Once the spring returns to its natural length and pushes the mass(es) away, the spring no longer exerts a force. The mass(es) will then move with a constant velocity (ignoring friction).

**What could go wrong:** Assuming the object remains attached to the spring when it might separate. Incorrectly defining the final state for this phase.

### Step 5: Final State Analysis

**Plain English:** What is the final velocity of the objects after all interactions with the spring are complete?

**Example:** After being pushed back by the spring, block $m_1$ (or the combined $m_1+m_2$) moves with a final velocity $v_{final}$.

**Formal/Mathematical Version:**
This step typically follows directly from the energy conservation in Step 4. If an object separates from the spring, its velocity at the moment of separation is its final velocity (again, assuming no further forces like friction).

**What could go wrong:** Not clearly distinguishing between velocities *just after collision*, *at max compression*, and *after separation*.

## 5. Worked examples — multiple, with every step shown

### Example 1: Block Colliding with a Fixed Spring (Easy)

**Problem:** A block of mass $m = 2.0 \text{ kg}$ slides on a frictionless horizontal surface with a speed of $v = 4.0 \text{ m/s}$. It collides with a light spring (negligible mass) that is initially at its natural length. The spring has a spring constant $k = 200 \text{ N/m}$. Calculate the maximum compression of the spring.

**Given:**
*   Mass of block, $m = 2.0 \text{ kg}$
*   Initial speed of block, $v = 4.0 \text{ m/s}$
*   Spring constant, $k = 200 \text{ N/m}$
*   Frictionless surface (implies mechanical energy is conserved after the collision starts interacting with the spring)
*   Spring initially at natural length ($x_{initial} = 0$)

**Want:** Maximum compression of the spring, $x_{max}$.

**Solution:**

1.  **Identify the system and phases:**
    *   System: The block and the spring.
    *   Phase: The block's kinetic energy is converted into the spring's potential energy. There's no "collision" in the momentum-conserving sense, as the spring is fixed to an immovable wall (effectively infinite mass).

2.  **Apply Conservation of Mechanical Energy:**
    *   We consider the state *just before* the block touches the spring and the state *at maximum compression*.
    *   Initial state (before compression): The block has kinetic energy, and the spring has zero potential energy (natural length).
    *   Final state (at maximum compression): The block momentarily stops (zero kinetic energy), and the spring has maximum potential energy.
    *   Since the surface is frictionless, mechanical energy is conserved.

    $$E_{initial} = E_{final}$$
    This means the sum of kinetic and potential energies at the start equals the sum at the end.

    $$K_{initial} + U_{s, initial} = K_{final} + U_{s, final}$$
    Substitute the formulas for kinetic and spring potential energy:

    $$\frac{1}{2}mv^2 + \frac{1}{2}kx_{initial}^2 = \frac{1}{2}m(0)^2 + \frac{1}{2}kx_{max}^2$$
    At maximum compression, the block momentarily stops, so its final velocity is 0. The spring's initial compression is 0.

    $$\frac{1}{2}mv^2 + 0 = 0 + \frac{1}{2}kx_{max}^2$$
    Simplify the equation:

    $$\frac{1}{2}mv^2 = \frac{1}{2}kx_{max}^2$$
    We can cancel out the $\frac{1}{2}$ on both sides:

    $$mv^2 = kx_{max}^2$$
    Now, rearrange to solve for $x_{max}$:

    $$x_{max}^2 = \frac{mv^2}{k}$$
    $$x_{max} = \sqrt{\frac{mv^2}{k}}$$
    Plug in the given values:

    $$x_{max} = \sqrt{\frac{(2.0 \text{ kg})(4.0 \text{ m/s})^2}{200 \text{ N/m}}}$$
    $$x_{max} = \sqrt{\frac{(2.0)(16)}{200}}$$
    $$x_{max} = \sqrt{\frac{32}{200}}$$
    $$x_{max} = \sqrt{0.16}$$
    $$x_{max} = 0.4 \text{ m}$$

    **The maximum compression of the spring is $\boxed{0.4 \text{ m}}$.**

**Reflection:** This example was straightforward because there was no "collision" between two moving masses. It was a direct conversion of kinetic energy into elastic potential energy. The key was recognizing that at maximum compression, the block's kinetic energy becomes zero.

---

### Example 2: Perfectly Inelastic Collision with a Spring (Medium)

**Problem:** A block of mass $m_1 = 1.0 \text{ kg}$ moving at $v_1 = 6.0 \text{ m/s}$ collides *perfectly inelastically* with a second block of mass $m_2 = 2.0 \text{ kg}$ that is initially at rest. Block $m_2$ is attached to a light spring with a spring constant $k = 300 \text{ N/m}$. The spring is initially at its natural length. The surface is frictionless. Find the maximum compression of the spring.

**Given:**
*   $m_1 = 1.0 \text{ kg}$
*   $v_1 = 6.0 \text{ m/s}$
*   $m_2 = 2.0 \text{ kg}$
*   $v_2 = 0 \text{ m/s}$ (at rest)
*   Collision type: Perfectly inelastic
*   $k = 300 \text{ N/m}$
*   Frictionless surface
*   Spring initially at natural length ($x_{initial} = 0$)

**Want:** Maximum compression of the spring, $x_{max}$.

**Solution:**

This problem has two distinct phases: the collision itself, and then the compression of the spring.

**Phase 1: The Perfectly Inelastic Collision**

1.  **Apply Conservation of Momentum:** During a perfectly inelastic collision, momentum is conserved, but kinetic energy is not. The two blocks stick together and move as a single combined mass.
    $$P_{before\_collision} = P_{after\_collision}$$
    $$m_1 v_1 + m_2 v_2 = (m_1 + m_2) v_f$$
    Here, $v_f$ is the common velocity of the combined mass *immediately after* the collision.

    Substitute the given values:
    $$(1.0 \text{ kg})(6.0 \text{ m/s}) + (2.0 \text{ kg})(0 \text{ m/s}) = (1.0 \text{ kg} + 2.0 \text{ kg}) v_f$$
    $$6.0 \text{ kg} \cdot \text{m/s} = (3.0 \text{ kg}) v_f$$
    Solve for $v_f$:
    $$v_f = \frac{6.0 \text{ kg} \cdot \text{m/s}}{3.0 \text{ kg}}$$
    $$v_f = 2.0 \text{ m/s}$$
    *This is the initial velocity for the next phase, where the combined mass interacts with the spring.*

**Phase 2: Spring Compression**

1.  **Identify the system and states:**
    *   System: The combined mass $(m_1+m_2)$ and the spring.
    *   Initial state (for this phase): The combined mass $(m_1+m_2)$ moves with velocity $v_f = 2.0 \text{ m/s}$, and the spring is at natural length ($U_s = 0$).
    *   Final state (at maximum compression): The combined mass momentarily stops ($K=0$), and the spring has maximum potential energy ($U_s = \frac{1}{2}kx_{max}^2$).

2.  **Apply Conservation of Mechanical Energy:** Since the surface is frictionless and there are no other non-conservative forces, mechanical energy is conserved during the spring compression.
    $$E_{initial\_spring\_phase} = E_{final\_spring\_phase}$$
    $$K_{initial} + U_{s, initial} = K_{final} + U_{s, final}$$
    Substitute the formulas, using $M = m_1 + m_2$ for the combined mass:
    $$\frac{1}{2}M v_f^2 + \frac{1}{2}kx_{initial}^2 = \frac{1}{2}M(0)^2 + \frac{1}{2}kx_{max}^2$$
    Since $x_{initial} = 0$ and the final kinetic energy is zero at max compression:
    $$\frac{1}{2}M v_f^2 = \frac{1}{2}kx_{max}^2$$
    Cancel out $\frac{1}{2}$ and solve for $x_{max}$:
    $$M v_f^2 = kx_{max}^2$$
    $$x_{max}^2 = \frac{M v_f^2}{k}$$
    $$x_{max} = \sqrt{\frac{M v_f^2}{k}}$$
    Plug in the values: $M = 3.0 \text{ kg}$, $v_f = 2.0 \text{ m/s}$, $k = 300 \text{ N/m}$.
    $$x_{max} = \sqrt{\frac{(3.0 \text{ kg})(2.0 \text{ m/s})^2}{300 \text{ N/m}}}$$
    $$x_{max} = \sqrt{\frac{(3.0)(4.0)}{300}}$$
    $$x_{max} = \sqrt{\frac{12.0}{300}}$$
    $$x_{max} = \sqrt{0.04}$$
    $$x_{max} = 0.2 \text{ m}$$

    **The maximum compression of the spring is $\boxed{0.2 \text{ m}}$.**

**Reflection:** The trick here was to correctly identify the two phases and apply the correct conservation law to each. Momentum conservation for the collision, then energy conservation for the spring compression. It's a common mistake to try and apply energy conservation across the entire process if the collision is inelastic.

---

### Example 3: Elastic Collision with a Spring (Harder)

**Problem:** A block of mass $m_1 = 1.0 \text{ kg}$ moving at $v_1 = 4.0 \text{ m/s}$ undergoes an *elastic collision* with a second block of mass $m_2 = 3.0 \text{ kg}$ that is initially at rest. Block $m_2$ is attached to a light spring with a spring constant $k = 100 \text{ N/m}$. The spring is initially at its natural length. The surface is frictionless. Find the maximum compression of the spring.

**Given:**
*   $m_1 = 1.0 \text{ kg}$
*   $v_1 = 4.0 \text{ m/s}$
*   $m_2 = 3.0 \text{ kg}$
*   $v_2 = 0 \text{ m/s}$ (at rest)
*   Collision type: Elastic
*   $k = 100 \text{ N/m}$
*   Frictionless surface
*   Spring initially at natural length ($x_{initial} = 0$)

**Want:** Maximum compression of the spring, $x_{max}$.

**Solution:**

Again, two phases: the elastic collision, then the spring compression.

**Phase 1: The Elastic Collision**

1.  **Apply Conservation of Momentum:**
    $$m_1 v_1 + m_2 v_2 = m_1 v_{1f} + m_2 v_{2f}$$
    $$(1.0)(4.0) + (3.0)(0) = (1.0)v_{1f} + (3.0)v_{2f}$$
    $$4.0 = v_{1f} + 3v_{2f} \quad (\text{Equation 1})$$

2.  **Apply Conservation of Kinetic Energy:** For an elastic collision, kinetic energy is also conserved.
    $$\frac{1}{2}m_1 v_1^2 + \frac{1}{2}m_2 v_2^2 = \frac{1}{2}m_1 v_{1f}^2 + \frac{1}{2}m_2 v_{2f}^2$$
    Cancel out $\frac{1}{2}$:
    $$m_1 v_1^2 + m_2 v_2^2 = m_1 v_{1f}^2 + m_2 v_{2f}^2$$
    $$(1.0)(4.0)^2 + (3.0)(0)^2 = (1.0)v_{1f}^2 + (3.0)v_{2f}^2$$
    $$16 = v_{1f}^2 + 3v_{2f}^2 \quad (\text{Equation 2})$$

3.  **Solve the system of equations for $v_{2f}$:**
    From Equation 1, express $v_{1f}$ in terms of $v_{2f}$:
    $$v_{1f} = 4.0 - 3v_{2f}$$
    Substitute this into Equation 2:
    $$16 = (4.0 - 3v_{2f})^2 + 3v_{2f}^2$$
    $$16 = (16 - 24v_{2f} + 9v_{2f}^2) + 3v_{2f}^2$$
    $$16 = 16 - 24v_{2f} + 12v_{2f}^2$$
    Subtract 16 from both sides:
    $$0 = -24v_{2f} + 12v_{2f}^2$$
    Factor out $12v_{2f}$:
    $$0 = 12v_{2f} (v_{2f} - 2)$$
    This gives two possible solutions for $v_{2f}$:
    *   $v_{2f} = 0 \text{ m/s}$ (This corresponds to no collision, or $m_1$ passing through $m_2$ without interaction, which is not physically relevant here).
    *   $v_{2f} = 2.0 \text{ m/s}$
    So, the velocity of block $m_2$ *immediately after* the elastic collision is $v_{2f} = 2.0 \text{ m/s}$.
    (We can also find $v_{1f} = 4 - 3(2) = -2.0 \text{ m/s}$, meaning $m_1$ rebounds).

    *This $v_{2f}$ is the initial velocity for the next phase, where $m_2$ interacts with the spring.*

**Phase 2: Spring Compression**

1.  **Identify the system and states:**
    *   System: Block $m_2$ and the spring. (Block $m_1$ is no longer interacting with $m_2$ or the spring).
    *   Initial state (for this phase): Block $m_2$ moves with velocity $v_{2f} = 2.0 \text{ m/s}$, and the spring is at natural length ($U_s = 0$).
    *   Final state (at maximum compression): Block $m_2$ momentarily stops ($K=0$), and the spring has maximum potential energy ($U_s = \frac{1}{2}kx_{max}^2$).

2.  **Apply Conservation of Mechanical Energy:**
    $$E_{initial\_spring\_phase} = E_{final\_spring\_phase}$$
    $$K_{initial} + U_{s, initial} = K_{final} + U_{s, final}$$
    $$\frac{1}{2}m_2 v_{2f}^2 + \frac{1}{2}kx_{initial}^2 = \frac{1}{2}m_2(0)^2 + \frac{1}{2}kx_{max}^2$$
    Since $x_{initial} = 0$ and the final kinetic energy is zero:
    $$\frac{1}{2}m_2 v_{2f}^2 = \frac{1}{2}kx_{max}^2$$
    Cancel out $\frac{1}{2}$ and solve for $x_{max}$:
    $$m_2 v_{2f}^2 = kx_{max}^2$$
    $$x_{max} = \sqrt{\frac{m_2 v_{2f}^2}{k}}$$
    Plug in the values: $m_2 = 3.0 \text{ kg}$, $v_{2f} = 2.0 \text{ m/s}$, $k = 100 \text{ N/m}$.
    $$x_{max} = \sqrt{\frac{(3.0 \text{ kg})(2.0 \text{ m/s})^2}{100 \text{ N/m}}}$$
    $$x_{max} = \sqrt{\frac{(3.0)(4.0)}{100}}$$
    $$x_{max} = \sqrt{\frac{12.0}{100}}$$
    $$x_{max} = \sqrt{0.12}$$
    $$x_{max} \approx 0.346 \text{ m}$$

    **The maximum compression of the spring is approximately $\boxed{0.346 \text{ m}}$.**

**Reflection:** This problem was harder because the initial collision was elastic, requiring solving a system of two equations (momentum and kinetic energy conservation) to find the velocity of $m_2$ *before* it started compressing the spring. It's critical to remember that $m_1$ is no longer part of the system once $m_2$ starts compressing the spring, as $m_1$ has rebounded.

---

### Example 4: Block Colliding with a Spring-Mass System Already Compressed (Hardest)

**Problem:** A block of mass $m_1 = 0.5 \text{ kg}$ slides on a frictionless horizontal surface with a speed of $v_1 = 5.0 \text{ m/s}$. It collides *perfectly inelastically* with a second block of mass $m_2 = 1.5 \text{ kg}$ that is initially at rest. Block $m_2$ is attached to a light spring with a spring constant $k = 400 \text{ N/m}$. The spring is initially *compressed* by $x_{initial} = 0.1 \text{ m}$ from its natural length. Find the additional compression of the spring after the collision.

**Given:**
*   $m_1 = 0.5 \text{ kg}$
*   $v_1 = 5.0 \text{ m/s}$
*   $m_2 = 1.5 \text{ kg}$
*   $v_2 = 0 \text{ m/s}$ (at rest)
*   Collision type: Perfectly inelastic
*   $k = 400 \text{ N/m}$
*   Frictionless surface
*   Spring initially compressed by $x_{initial} = 0.1 \text{ m}$

**Want:** Additional compression of the spring, $\Delta x$. (Note: This means the *total* compression will be $x_{initial} + \Delta x$). Let's call the total maximum compression $x_{final}$. Then $\Delta x = x_{final} - x_{initial}$.

**Solution:**

Again, two phases: the perfectly inelastic collision, then the spring compression.

**Phase 1: The Perfectly Inelastic Collision**

1.  **Apply Conservation of Momentum:**
    $$P_{before\_collision} = P_{after\_collision}$$
    $$m_1 v_1 + m_2 v_2 = (m_1 + m_2) v_f$$
    $$(0.5 \text{ kg})(5.0 \text{ m/s}) + (1.5 \text{ kg})(0 \text{ m/s}) = (0.5 \text{ kg} + 1.5 \text{ kg}) v_f$$
    $$2.5 \text{ kg} \cdot \text{m/s} = (2.0 \text{ kg}) v_f$$
    Solve for $v_f$:
    $$v_f = \frac{2.5 \text{ kg} \cdot \text{m/s}}{2.0 \text{ kg}}$$
    $$v_f = 1.25 \text{ m/s}$$
    *This is the initial velocity of the combined mass for the next phase.*

**Phase 2: Spring Compression (from an already compressed state)**

1.  **Identify the system and states:**
    *   System: The combined mass $(m_1+m_2)$ and the spring.
    *   Initial state (for this phase): The combined mass $M = m_1+m_2 = 2.0 \text{ kg}$ moves with velocity $v_f = 1.25 \text{ m/s}$. The spring is already compressed by $x_{initial} = 0.1 \text{ m}$.
    *   Final state (at maximum compression): The combined mass momentarily stops ($K=0$). The spring has maximum total potential energy at its final compression $x_{final}$.

2.  **Apply Conservation of Mechanical Energy:**
    $$E_{initial\_spring\_phase} = E_{final\_spring\_phase}$$
    $$K_{initial} + U_{s, initial} = K_{final} + U_{s, final}$$
    $$\frac{1}{2}M v_f^2 + \frac{1}{2}kx_{initial}^2 = \frac{1}{2}M(0)^2 + \frac{1}{2}kx_{final}^2$$
    Substitute the known values:
    $$\frac{1}{2}(2.0 \text{ kg})(1.25 \text{ m/s})^2 + \frac{1}{2}(400 \text{ N/m})(0.1 \text{ m})^2 = 0 + \frac{1}{2}(400 \text{ N/m})x_{final}^2$$
    Calculate the terms:
    $$\frac{1}{2}(2.0)(1.5625) + \frac{1}{2}(400)(0.01) = \frac{1}{2}(400)x_{final}^2$$
    $$1.5625 + 2.0 = 200 x_{final}^2$$
    $$3.5625 = 200 x_{final}^2$$
    Solve for $x_{final}^2$:
    $$x_{final}^2 = \frac{3.5625}{200}$$
    $$x_{final}^2 = 0.0178125$$
    Solve for $x_{final}$:
    $$x_{final} = \sqrt{0.0178125}$$
    $$x_{final} \approx 0.13346 \text{ m}$$
    This is the *total* maximum compression from the spring's natural length.

3.  **Calculate the additional compression ($\Delta x$):**
    The problem asks for the *additional* compression.
    $$\Delta x = x_{final} - x_{initial}$$
    $$\Delta x = 0.13346 \text{ m} - 0.1 \text{ m}$$
    $$\Delta x = 0.03346 \text{ m}$$

    **The additional compression of the spring is approximately $\boxed{0.0335 \text{ m}}$.**

**Reflection:** This problem was tricky because the spring already had initial potential energy. It's crucial to include this $U_{s, initial}$ term in the energy conservation equation. Also, pay close attention to what the question asks for – total compression or *additional* compression.

## 6. Common mistakes and traps

1.  **Applying Conservation of Mechanical Energy During an Inelastic Collision:** This is the most frequent and significant error. In an inelastic collision, kinetic energy is *not* conserved; it's converted into other forms (heat, sound, deformation). You *must* use conservation of momentum for the collision phase and then switch to conservation of mechanical energy *after* the collision (for the spring interaction), assuming no friction.
2.  **Incorrectly Defining the System:** Failing to include all relevant masses (e.g., only considering one block when two are moving together) or including objects that are no longer interacting with the system (e.g., the first block after an elastic collision when it has rebounded and separated).
3.  **Forgetting Initial Spring Potential Energy:** If the spring is already compressed or stretched before the collision or before the subsequent compression phase, its initial elastic potential energy ($\frac{1}{2}kx_{initial}^2$) must be included in the energy conservation equation.
4.  **Misidentifying Velocities at Maximum Compression:** At maximum compression (or extension) of the spring, the velocity of the mass(es) attached to the spring, *relative to the spring's equilibrium position*, is momentarily zero. This is a critical point for setting $K_{final} = 0$ in the energy conservation equation.
5.  **Sign Errors with Hooke's Law or Displacement:** While Hooke's Law $F_s = -kx$ is about force direction, potential energy $U_s = \frac{1}{2}kx^2$ depends on $x^2$, so the sign of $x$ doesn't matter for energy storage. However, ensure $x$ represents the *change* in length from equilibrium.
6.  **Mixing Up Collision and Spring Interaction Phases:** Treat the collision and the spring compression/expansion as distinct events. First, analyze the collision using momentum conservation to find the velocities *immediately after* the impact. Then, use these velocities as the initial conditions for the energy conservation analysis involving the spring.

## 7. Textbook-precise explanation

A spring-mass system undergoing a collision involves the dynamic interaction between one or more masses and a spring element, typically characterized by a spring constant $k$. The analysis of such systems necessitates the judicious application of fundamental conservation laws, segmented into distinct phases corresponding to the dominant physical processes.

Consider a system comprising multiple masses, $m_i$, and a linear elastic spring. The process is generally divided into two primary stages:

1.  **The Collision Event:** This is the instantaneous interaction between masses. During this brief interval, external forces (e.g., gravity, normal force) are often negligible compared to the impulsive internal forces of the collision. Consequently, the **total linear momentum of the system of colliding masses is conserved**.
    *   For $N$ masses, $m_1, m_2, \dots, m_N$, with initial velocities $\vec{v}_{1i}, \vec{v}_{2i}, \dots, \vec{v}_{Ni}$ and final velocities $\vec{v}_{1f}, \vec{v}_{2f}, \dots, \vec{v}_{Nf}$ (immediately after the collision):
        $$\sum_{j=1}^{N} m_j \vec{v}_{ji} = \sum_{j=1}^{N} m_j \vec{v}_{jf}$$
    *   **Elastic Collisions:** If the collision is elastic, internal forces are conservative, and thus **total kinetic energy is also conserved** during the collision:
        $$\sum_{j=1}^{N} \frac{1}{2} m_j v_{ji}^2 = \sum_{j=1}^{N} \frac{1}{2} m_j v_{jf}^2$$
    *   **Inelastic Collisions:** If the collision is inelastic, kinetic energy is *not* conserved; a portion is transformed into internal energy (heat, sound, deformation). Momentum, however, remains conserved.
    *   **Perfectly Inelastic Collisions:** A special case of inelastic collision where the masses stick together after impact, moving with a common final velocity $\vec{V}_f$. In this scenario, kinetic energy loss is maximized.
        $$\sum_{j=1}^{N} m_j \vec{v}_{ji} = \left(\sum_{j=1}^{N} m_j\right) \vec{V}_f$$

2.  **The Spring Interaction Phase:** Following the collision, the mass(es) interact with the spring. Assuming the system is isolated from non-conservative external forces (e.g., friction, air resistance) and the spring itself is ideal (massless, obeys Hooke's Law), the **total mechanical energy of the mass-spring system is conserved**.
    *   The total mechanical energy $E$ is the sum of the kinetic energy $K$ of the mass(es) and the elastic potential energy $U_s$ stored in the spring.
        $$E = K + U_s$$
        $$K = \sum \frac{1}{2} m_j v_j^2$$
        $$U_s = \frac{1}{2} k x^2$$
        where $x$ is the displacement of the spring from its natural (equilibrium) length.
    *   Thus, between any two points in this phase (e.g., immediately after collision and at maximum spring compression):
        $$K_{initial} + U_{s, initial} = K_{final} + U_{s, final}$$
    *   A critical point in solving these problems is identifying the state of **maximum spring compression (or extension)**. At this instant, the relative velocity between the mass(es) and the spring's equilibrium point is momentarily zero, implying that the kinetic energy of the system is minimal (often zero if the spring is fixed or the system is oscillating about its center of mass). This allows for the calculation of the maximum stored potential energy.

The analysis sequence typically involves:
1.  Determining the velocities of the masses *immediately after* the collision using conservation of momentum (and kinetic energy for elastic collisions).
2.  Using these post-collision velocities as the initial conditions for an energy conservation analysis to determine the spring's maximum compression or other subsequent motion.

(See, for example, "Halliday, Resnick, Walker, *Fundamentals of Physics*, Chapter 9: Center of Mass and Linear Momentum, and Chapter 7: Kinetic Energy and Work, Chapter 8: Potential Energy and Conservation of Energy.")

## 8. ASCII diagrams

Here's an ASCII diagram illustrating a common scenario: a block colliding with a spring.

```text
Scenario: Block Colliding with a Spring (initially at natural length)

Phase 1: Before Collision
  ---------------------------------------------------> v_initial
  | m |                                             |
  ---                                               |
                                                    |  wwwwwwwww
                                                    |--| Block 2
  Smooth Horizontal Surface ------------------------|--| (at rest)
                                                    |  wwwwwwwww
                                                    |
                                                    | Fixed Wall
                                                    |
                                                    |
  Block 1 (moving)                                  Spring (k)

Phase 2: During Compression (at maximum compression)
  ---------------------------------------------------
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 |
  |                                                 