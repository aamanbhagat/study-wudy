## 1. What it is — in plain English

Imagine you have a bunch of objects, or even just one complex object, like a wrench flying through the air. Instead of trying to track every single part of that object, we can find a special point called the "center of mass" (CM). Think of this point as the "average position" of all the mass in the system. If you could balance the entire object on a single fingertip, that fingertip would be at the center of mass.

Now, here's the really cool part: when you look at how this special point moves, it behaves as if *all* the mass of the system is concentrated there, and *only* the forces coming from *outside* the system affect its motion.

This means that if you have a system of particles (like a rocket with fuel, or a gymnast in mid-air), any forces *between* those particles (like the gymnast's muscles contracting, or the rocket fuel pushing on the engine) will *not* change the overall path of the system's center of mass. Only gravity, air resistance, or the thrust from the rocket engine (which comes from *ejecting* mass *outside* the defined system) can alter the trajectory of that imaginary center point.

So, in short: the center of mass is the system's "balance point," and its journey through space is solely dictated by the pushes and pulls from the outside world, completely ignoring any internal commotion.

## 2. Why it matters — real-world applications

Understanding the motion of the center of mass is foundational across many fields:

1.  **Rocket Science & Spacecraft Propulsion:** When a rocket launches, its engines produce thrust by expelling exhaust gases. This thrust is an *external* force acting on the rocket-fuel system. The acceleration of the rocket's center of mass is directly determined by this external thrust (minus gravity and drag). Internal forces, like fuel sloshing around or astronauts moving inside, do not change the overall trajectory of the rocket's CM. This principle is critical for calculating orbital maneuvers, trajectory corrections, and understanding the fundamental rocket equation.
2.  **Robotics and Humanoid Locomotion (e.g., Boston Dynamics):** For robots to walk, run, or maintain balance, engineers must precisely control the robot's center of mass. While the robot's internal motors and actuators create internal forces to move its limbs, the *overall* stability and motion path of the robot (its CM) is influenced by external forces like gravity, ground reaction forces, and any pushes or pulls it experiences. Advanced control algorithms predict and adjust the robot's CM to prevent falls and execute complex movements.
3.  **Sports Physics (Diving, Gymnastics, Figure Skating):** A diver launching off a springboard, a gymnast performing a flip, or a figure skater spinning in the air all exhibit fascinating motion. While their bodies twist, tuck, and extend (using internal muscle forces), their center of mass *always* follows a predictable parabolic trajectory once airborne (assuming only gravity acts externally). Coaches and athletes use this understanding to maximize rotation for spins or reduce it for a clean entry into water, knowing that the CM's path is fixed, but the body's orientation around it can be manipulated.
4.  **Collision Analysis (Automotive Safety, Forensics):** In car crashes or other collisions, understanding the motion of the center of mass of the colliding objects (e.g., two cars) is crucial. Even if the vehicles deform significantly due to internal forces during the crash, the total momentum of the system's center of mass is conserved if external forces (like friction with the road) are negligible or accounted for. This allows investigators to reconstruct accident scenarios and determine pre-collision velocities.

## 3. Prerequisites — what you must know first

Before diving deep into the motion of the center of mass, ensure you have a solid grasp of these fundamental concepts:

*   **Newton's Laws of Motion:** Especially Newton's Second Law ($\vec{F} = m\vec{a}$) and Newton's Third Law (for every action, there is an equal and opposite reaction). These are the bedrock of this topic.
*   **Vectors:** Understanding position ($\vec{r}$), velocity ($\vec{v}$), and acceleration ($\vec{a}$) as vector quantities, including vector addition, subtraction, and components.
*   **Mass:** The scalar quantity representing inertia, and how it contributes to the total mass of a system.
*   **Center of Mass (CM):** The definition and calculation of the center of mass for both discrete particle systems and continuous objects. This is a direct precursor.
*   **Internal vs. External Forces:** The critical distinction between forces acting *between* parts of a system (internal) and forces acting *on* the system from its surroundings (external).
*   **Momentum:** The definition of linear momentum ($\vec{p} = m\vec{v}$) and its relation to force ($\vec{F} = \frac{d\vec{p}}{dt}$). While the conservation of momentum is a consequence, the concept of momentum itself is helpful.

## 4. The core idea — step by step

Let's build up the concept of how external forces dictate the motion of the center of mass.

### Step 1: What is the Center of Mass (CM) again?

**Plain English:** The center of mass is like the "balancing point" or the "average location" of all the mass in a system. If you could condense all the system's mass into a single point, that point would be the CM. It's a purely mathematical concept, but it often behaves like a real particle.

**Small Concrete Example:** Imagine a dumbbell. If the weights at each end are equal, the CM is exactly in the middle of the bar. If one weight is heavier, the CM shifts closer to the heavier end. For a human, the CM is typically around the navel, but it moves as you change your body position (e.g., raising your arms shifts it upwards).

**Formal/Mathematical Version:** For a system of $N$ discrete particles, each with mass $m_i$ and position vector $\vec{r}_i$, the position vector of the center of mass, $\vec{R}_{CM}$, is given by:

$$
\vec{R}_{CM} = \frac{m_1 \vec{r}_1 + m_2 \vec{r}_2 + \dots + m_N \vec{r}_N}{m_1 + m_2 + \dots + m_N} = \frac{\sum_{i=1}^{N} m_i \vec{r}_i}{\sum_{i=1}^{N} m_i} = \frac{\sum_{i=1}^{N} m_i \vec{r}_i}{M_{total}}
$$

where $M_{total} = \sum_{i=1}^{N} m_i$ is the total mass of the system.

**What could go wrong:** Students often confuse the center of mass with the geometric center. For a uniformly dense object, they coincide. But for an irregularly shaped object or one with varying density, they can be quite different. The CM doesn't even have to be *inside* the object (e.g., a donut's CM is in its hole).

### Step 2: How does the CM move? Velocity and Acceleration.

**Plain English:** Just like any other point, the center of mass can have a velocity (how fast it's moving and in what direction) and an acceleration (how its velocity is changing). We can find these by simply taking the derivatives of the CM's position with respect to time.

**Small Concrete Example:** If you throw a baseball, its CM follows a smooth parabolic arc. If you throw a spinning football, its CM still follows a parabola, even while the football itself tumbles. The CM has a velocity and acceleration that describe this overall translational motion.

**Formal/Mathematical Version:**
The velocity of the center of mass, $\vec{V}_{CM}$, is the time derivative of its position vector:

$$
\vec{V}_{CM} = \frac{d\vec{R}_{CM}}{dt} = \frac{\sum_{i=1}^{N} m_i \frac{d\vec{r}_i}{dt}}{M_{total}} = \frac{\sum_{i=1}^{N} m_i \vec{v}_i}{M_{total}}
$$

Similarly, the acceleration of the center of mass, $\vec{A}_{CM}$, is the time derivative of its velocity vector:

$$
\vec{A}_{CM} = \frac{d\vec{V}_{CM}}{dt} = \frac{\sum_{i=1}^{N} m_i \frac{d\vec{v}_i}{dt}}{M_{total}} = \frac{\sum_{i=1}^{N} m_i \vec{a}_i}{M_{total}}
$$

**What could go wrong:** Forgetting that $\vec{V}_{CM}$ and $\vec{A}_{CM}$ are *vector* quantities. Direction matters! Also, sometimes students mistakenly think that if the individual particles are accelerating, the CM must also be accelerating *in the same way*. Not necessarily, it's the *weighted average* of their accelerations.

### Step 3: Forces and Newton's Second Law for a System.

**Plain English:** We know that a net force causes an acceleration ($\vec{F}=m\vec{a}$). What if we apply this idea to a whole system of particles? We need to consider all the forces acting on *all* the particles in the system.

**Small Concrete Example:** Imagine a car. Many forces act on it: gravity, the road pushing up, engine pushing the wheels, air resistance. Each part of the car (engine, wheels, chassis) experiences forces. We want to relate the *total* force on the *entire car* to the acceleration of its CM.

**Formal/Mathematical Version:**
Let's consider the acceleration of each individual particle $i$ in the system. According to Newton's Second Law:

$$
\vec{F}_i = m_i \vec{a}_i
$$

where $\vec{F}_i$ is the net force acting on particle $i$.
Now, let's sum this equation over all particles in the system:

$$
\sum_{i=1}^{N} \vec{F}_i = \sum_{i=1}^{N} m_i \vec{a}_i
$$

From Step 2, we know that $\sum_{i=1}^{N} m_i \vec{a}_i = M_{total} \vec{A}_{CM}$.
So, we can write:

$$
\sum_{i=1}^{N} \vec{F}_i = M_{total} \vec{A}_{CM}
$$

**What could go wrong:** At this stage, it's easy to get lost in the sum $\sum \vec{F}_i$. We need to break down what kind of forces make up this sum. This leads us to the next step.

### Step 4: Distinguishing Internal and External Forces.

**Plain English:** Forces can be categorized based on whether they originate *within* the system or *outside* it. "Internal forces" are interactions between particles *inside* our defined system (e.g., the tension in a rope connecting two blocks, the force of a spring between them, or the explosion within a firecracker). "External forces" come from *outside* our system (e.g., gravity acting on the system, a push from a person outside, friction from the ground, air resistance).

**Small Concrete Example:**
*   **System: Two connected blocks on a table.**
    *   Internal force: The tension in the rope connecting the blocks.
    *   External forces: Gravity on each block, normal force from the table on each block, friction on each block, a hand pushing one block.
*   **System: A firecracker.**
    *   Internal force: The explosive force pushing pieces apart.
    *   External forces: Gravity, air resistance.

**Formal/Mathematical Version:**
The total force on any particle $i$, $\vec{F}_i$, can be split into forces from other particles *within* the system (internal forces) and forces from *outside* the system (external forces):

$$
\vec{F}_i = \sum_{j \neq i} \vec{f}_{ij} + \vec{F}_{i, ext}
$$

where $\vec{f}_{ij}$ is the force exerted on particle $i$ by particle $j$, and $\vec{F}_{i, ext}$ is the net external force on particle $i$.

Now, let's substitute this back into our sum from Step 3:

$$
\sum_{i=1}^{N} \vec{F}_i = \sum_{i=1}^{N} \left( \sum_{j \neq i} \vec{f}_{ij} + \vec{F}_{i, ext} \right) = \sum_{i=1}^{N} \sum_{j \neq i} \vec{f}_{ij} + \sum_{i=1}^{N} \vec{F}_{i, ext}
$$

**What could go wrong:** The most common mistake is incorrectly defining the boundaries of the system. If you include something in your system, then forces from that "something" are internal. If you exclude it, they're external. For example, if your system is "rocket + fuel," then the force of the exhaust gas pushing on the rocket is internal. But if your system is just "the rocket structure," then the thrust from the exhaust is external. The choice of system is crucial!

### Step 5: The Grand Reveal — External Force Determines CM Acceleration.

**Plain English:** This is the punchline! When we sum up all the internal forces in a system, they *always* cancel out due to Newton's Third Law. For every internal push or pull, there's an equal and opposite internal push or pull. So, the only forces left that can affect the *overall* motion of the system's center of mass are the forces coming from *outside* the system.

**Small Concrete Example:** A high diver performs a complex series of twists and flips. Her muscles exert tremendous internal forces to change her body's shape and orientation. However, once she leaves the springboard, her center of mass continues to follow a perfect parabolic path, just like a simple ball thrown through the air. The internal forces change her *rotation* around her CM, but not the CM's *translational* path. Only gravity (an external force) affects her CM's trajectory.

**Formal/Mathematical Version:**
Consider the term $\sum_{i=1}^{N} \sum_{j \neq i} \vec{f}_{ij}$ from Step 4. This is the sum of all internal forces. According to Newton's Third Law, for every force $\vec{f}_{ij}$ (force on particle $i$ by particle $j$), there is an equal and opposite force $\vec{f}_{ji}$ (force on particle $j$ by particle $i$). That is, $\vec{f}_{ij} = -\vec{f}_{ji}$.

Therefore, when we sum over all pairs of internal forces, they cancel out:

$$
\sum_{i=1}^{N} \sum_{j \neq i} \vec{f}_{ij} = \vec{0}
$$

For example, $\vec{f}_{12} + \vec{f}_{21} + \vec{f}_{13} + \vec{f}_{31} + \dots = \vec{0}$.

So, the equation from Step 3 simplifies dramatically:

$$
\sum_{i=1}^{N} \vec{F}_i = \sum_{i=1}^{N} \vec{F}_{i, ext} = M_{total} \vec{A}_{CM}
$$

Let's define $\vec{F}_{external, total} = \sum_{i=1}^{N} \vec{F}_{i, ext}$ as the net external force acting on the entire system.
Then, the fundamental equation for the motion of the center of mass is:

$$
\vec{F}_{external, total} = M_{total} \vec{A}_{CM}
$$

This equation is profound. It states that the center of mass of any system of particles moves as if all the system's mass were concentrated at that point, and all the external forces acting on the system were applied directly to that point. Internal forces have absolutely no effect on the translational motion of the center of mass.

**What could go wrong:** Students might intuitively feel that internal forces *must* play a role, especially when they see parts of a system moving around. It's crucial to remember that internal forces can change the *relative* motion of particles *within* the system, and can cause the system to *rotate* around its CM, but they cannot change the CM's overall translational path.

## 5. Worked examples — multiple, with every step shown

### Example 1: Two Blocks and a Spring

**Problem:** Two blocks, $m_1 = 2 \text{ kg}$ and $m_2 = 3 \text{ kg}$, are connected by a light spring on a frictionless horizontal surface. A constant external force $\vec{F}_{ext} = (10 \text{ N})\hat{i}$ is applied to $m_1$. What is the acceleration of the center of mass of the two-block system?

**Given:**
*   Mass of block 1, $m_1 = 2 \text{ kg}$
*   Mass of block 2, $m_2 = 3 \text{ kg}$
*   External force on $m_1$, $\vec{F}_{ext} = (10 \text{ N})\hat{i}$
*   Surface is frictionless (no external friction force)
*   Spring is light (massless)

**Want:** The acceleration of the center of mass, $\vec{A}_{CM}$.

**Solution:**

1.  **Define the system:** Our system is the two blocks ($m_1$ and $m_2$) and the spring connecting them.
    *   *Explanation:* Clearly defining the system boundary is the first crucial step. All components within this boundary are part of the system.

2.  **Identify internal and external forces:**
    *   **Internal forces:** The force exerted by the spring on $m_1$ and on $m_2$. Let these be $\vec{F}_{s1}$ and $\vec{F}_{s2}$. By Newton's Third Law, $\vec{F}_{s1} = -\vec{F}_{s2}$.
        *   *Explanation:* The spring acts between the two blocks, which are *inside* our defined system. Therefore, the spring forces are internal.
    *   **External forces:**
        *   The applied force $\vec{F}_{ext}$ on $m_1$.
        *   Gravity on $m_1$ ($m_1 \vec{g}$) and on $m_2$ ($m_2 \vec{g}$).
        *   Normal force on $m_1$ ($\vec{N}_1$) and on $m_2$ ($\vec{N}_2$) from the horizontal surface.
        *   *Explanation:* These forces originate from *outside* our system (the hand applying force, the Earth, the surface).

3.  **Apply the equation for CM motion:** The equation states that the net external force on the system determines the acceleration of the center of mass:
    $$
    \vec{F}_{external, total} = M_{total} \vec{A}_{CM}
    $$
    *   *Explanation:* This is the core principle we are using. Internal forces are explicitly excluded from this sum.

4.  **Calculate the total mass of the system:**
    $$
    M_{total} = m_1 + m_2 = 2 \text{ kg} + 3 \text{ kg} = 5 \text{ kg}
    $$
    *   *Explanation:* The total mass is simply the sum of the masses of all particles in the system.

5.  **Sum the external forces:**
    In the vertical direction (y-axis):
    The gravitational forces ($m_1\vec{g}$, $m_2\vec{g}$) are balanced by the normal forces ($\vec{N}_1$, $\vec{N}_2$) because the blocks are on a horizontal surface and not accelerating vertically. So, $\sum F_{ext, y} = 0$.
    *   *Explanation:* We resolve forces into components. Since there's no vertical motion, the net vertical external force is zero.

    In the horizontal direction (x-axis):
    The only external force acting horizontally is the applied force $\vec{F}_{ext}$.
    $$
    \vec{F}_{external, total} = (10 \text{ N})\hat{i}
    $$
    *   *Explanation:* We only include external forces. The spring force is internal and does not contribute to the net external force.

6.  **Solve for $\vec{A}_{CM}$:**
    $$
    \vec{A}_{CM} = \frac{\vec{F}_{external, total}}{M_{total}}
    $$
    $$
    \vec{A}_{CM} = \frac{(10 \text{ N})\hat{i}}{5 \text{ kg}}
    $$
    $$
    \boxed{\vec{A}_{CM} = (2 \text{ m/s}^2)\hat{i}}
    $$
    *   *Explanation:* Rearrange the CM equation to solve for acceleration. The unit for acceleration is $\text{N/kg} = (\text{kg} \cdot \text{m/s}^2)/\text{kg} = \text{m/s}^2$.

**Reflection:** This example demonstrates how simple the problem becomes once you correctly identify the system and distinguish between internal and external forces. The spring's behavior (stretching, compressing) might affect the individual accelerations of $m_1$ and $m_2$ relative to each other, but it has no bearing on the *overall* acceleration of the system's center of mass.

### Example 2: Exploding Projectile

**Problem:** A projectile is launched from the ground with an initial velocity of $50 \text{ m/s}$ at an angle of $37^\circ$ above the horizontal. At the peak of its trajectory, it explodes into two fragments. One fragment, with mass $m_1 = 0.6 M_{total}$ (where $M_{total}$ is the original projectile mass), immediately falls straight down to the ground. Assuming negligible air resistance and $g = 9.8 \text{ m/s}^2$, how far from the launch point does the second fragment land?

**Given:**
*   Initial velocity, $v_0 = 50 \text{ m/s}$
*   Launch angle, $\theta = 37^\circ$
*   Mass of fragment 1, $m_1 = 0.6 M_{total}$
*   Fragment 1 falls straight down from peak.
*   $g = 9.8 \text{ m/s}^2$

**Want:** Horizontal distance of the second fragment from the launch point.

**Solution:**

1.  **Define the system:** The system is the projectile before and after the explosion.
    *   *Explanation:* The explosion is an *internal* event. The fragments are part of the system.

2.  **Identify external forces:** The only external force acting on the projectile (and its fragments) after launch is gravity. Air resistance is negligible.
    *   *Explanation:* Gravity acts on all parts of the system. The explosion forces are internal.

3.  **Consequence of external forces:** Since the only external force is gravity, the center of mass of the system (the original projectile and its fragments) will continue to follow the same parabolic trajectory it would have if no explosion occurred.
    *   *Explanation:* This is the core principle. Internal forces (the explosion) cannot change the CM's path.

4.  **Calculate the range of the original projectile's CM:**
    First, find the initial horizontal and vertical velocity components:
    $v_{0x} = v_0 \cos\theta = 50 \text{ m/s} \cdot \cos(37^\circ) \approx 50 \text{ m/s} \cdot 0.7986 \approx 39.93 \text{ m/s}$
    $v_{0y} = v_0 \sin\theta = 50 \text{ m/s} \cdot \sin(37^\circ) \approx 50 \text{ m/s} \cdot 0.6018 \approx 30.09 \text{ m/s}$
    *   *Explanation:* Break down initial velocity into components.

    Time to reach the peak height ($t_{peak}$):
    At the peak, $v_y = 0$. Using $v_y = v_{0y} - gt$:
    $0 = 30.09 \text{ m/s} - (9.8 \text{ m/s}^2) t_{peak}$
    $t_{peak} = \frac{30.09 \text{ m/s}}{9.8 \text{ m/s}^2} \approx 3.07 \text{ s}$
    *   *Explanation:* Use kinematic equations for vertical motion to find the time to the highest point.

    Total time of flight ($t_{total}$):
    Since the trajectory is symmetric, $t_{total} = 2 \cdot t_{peak} = 2 \cdot 3.07 \text{ s} = 6.14 \text{ s}$.
    *   *Explanation:* For a projectile launched and landing at the same height, total flight time is twice the time to peak.

    Horizontal range ($R_{CM}$):
    $R_{CM} = v_{0x} \cdot t_{total} = 39.93 \text{ m/s} \cdot 6.14 \text{ s} \approx 245.18 \text{ m}$
    *   *Explanation:* Horizontal velocity is constant (no horizontal external forces), so range is simply velocity times time. This is where the CM would land if it didn't explode.

5.  **Determine the position of the explosion:**
    The explosion occurs at the peak of the trajectory.
    Horizontal position at peak ($x_{peak}$):
    $x_{peak} = v_{0x} \cdot t_{peak} = 39.93 \text{ m/s} \cdot 3.07 \text{ s} \approx 122.58 \text{ m}$
    *   *Explanation:* The horizontal distance covered by the CM until the explosion.

    Vertical height at peak ($y_{peak}$):
    $y_{peak} = v_{0y} t_{peak} - \frac{1}{2}gt_{peak}^2 = (30.09 \text{ m/s})(3.07 \text{ s}) - \frac{1}{2}(9.8 \text{ m/s}^2)(3.07 \text{ s})^2 \approx 46.20 \text{ m}$
    *   *Explanation:* The vertical height of the explosion.

6.  **Analyze the first fragment's motion:**
    Fragment 1 ($m_1 = 0.6 M_{total}$) falls straight down from $y_{peak}$. This means its horizontal velocity is zero at the moment of explosion.
    Time for fragment 1 to fall:
    Using $y = y_0 + v_{0y}t + \frac{1}{2}at^2$: $0 = 46.20 \text{ m} + 0 \cdot t - \frac{1}{2}(9.8 \text{ m/s}^2)t^2$
    $t_{fall} = \sqrt{\frac{2 \cdot 46.20}{9.8}} \approx \sqrt{9.428} \approx 3.07 \text{ s}$
    *   *Explanation:* Since it falls straight down, its initial vertical velocity at the moment of explosion is 0 (relative to the CM's vertical velocity at that instant, which is also 0). It takes the same time to fall as it took to reach the peak.

    Landing position of fragment 1 ($x_1$):
    Since it falls straight down from $x_{peak}$, its landing position is $x_1 = x_{peak} \approx 122.58 \text{ m}$.
    *   *Explanation:* No horizontal motion for fragment 1 after the explosion.

7.  **Calculate the mass of the second fragment:**
    $m_2 = M_{total} - m_1 = M_{total} - 0.6 M_{total} = 0.4 M_{total}$
    *   *Explanation:* Conservation of mass.

8.  **Use the CM position formula at landing:**
    The CM of the system lands at $R_{CM} \approx 245.18 \text{ m}$.
    Let $x_2$ be the landing position of the second fragment.
    The CM position at landing is given by:
    $$
    R_{CM} = \frac{m_1 x_1 + m_2 x_2}{M_{total}}
    $$
    *   *Explanation:* The CM equation applies at any instant, including when all fragments have landed.

    Substitute known values:
    $245.18 \text{ m} = \frac{(0.6 M_{total})(122.58 \text{ m}) + (0.4 M_{total})x_2}{M_{total}}$
    *   *Explanation:* Substitute the masses in terms of $M_{total}$ and the known landing position of fragment 1.

    The $M_{total}$ terms cancel out:
    $245.18 = 0.6 \cdot 122.58 + 0.4 \cdot x_2$
    $245.18 = 73.548 + 0.4 x_2$
    $0.4 x_2 = 245.18 - 73.548$
    $0.4 x_2 = 171.632$
    $x_2 = \frac{171.632}{0.4}$
    $$
    \boxed{x_2 \approx 429.08 \text{ m}}
    $$
    *   *Explanation:* Solve algebraically for $x_2$.

**Reflection:** This problem beautifully illustrates that even with an internal explosion dramatically altering the individual paths of the fragments, the center of mass of the *entire system* (all fragments combined) continues its original, undisturbed parabolic trajectory. This allows us to use the known CM trajectory to find unknown fragment positions. The trickiest part is often correctly calculating the original CM trajectory.

### Example 3: Person Walking on a Boat

**Problem:** A $70 \text{ kg}$ person walks from the bow (front) to the stern (back) of a $200 \text{ kg}$ boat. The boat is $5 \text{ m}$ long. Assume the boat is initially at rest in still water, and there is no friction or water resistance. How far does the boat move relative to the shore?

**Given:**
*   Mass of person, $m_p = 70 \text{ kg}$
*   Mass of boat, $m_b = 200 \text{ kg}$
*   Length of boat, $L = 5 \text{ m}$
*   Initial state: boat and person at rest.
*   No external friction/resistance.

**Want:** Displacement of the boat, $\Delta x_b$.

**Solution:**

1.  **Define the system:** The system consists of the person and the boat.
    *   *Explanation:* This choice is crucial because the forces between the person and the boat (friction, normal force) are then internal to the system.

2.  **Identify external forces:**
    *   Gravity on the person ($m_p \vec{g}$) and on the boat ($m_b \vec{g}$).
    *   Normal force from the water on the boat ($\vec{N}_w$).
    *   *Explanation:* These are external. However, in the horizontal direction, there are *no* external forces (since friction/water resistance are negligible).

3.  **Consequence of no net horizontal external force:** Since there are no external forces acting in the horizontal direction, the total horizontal momentum of the system is conserved. Equivalently, the horizontal velocity of the center of mass of the system remains constant. Since the system starts at rest, the horizontal velocity of the CM is initially zero, and therefore remains zero. This means the horizontal position of the center of mass of the system *does not change*.
    $$
    \vec{F}_{external, total} = M_{total} \vec{A}_{CM}
    $$
    Since $\vec{F}_{external, total, x} = 0$, then $\vec{A}_{CM, x} = 0$.
    If $\vec{A}_{CM, x} = 0$, and the system starts at rest ($\vec{V}_{CM, x, initial} = 0$), then $\vec{V}_{CM, x, final} = 0$.
    If $\vec{V}_{CM, x} = 0$ for all time, then $\vec{R}_{CM, x}$ must be constant.
    $$
    \Delta \vec{R}_{CM, x} = 0
    $$
    *   *Explanation:* This is the key insight. The internal forces of the person pushing the boat and vice-versa can cause individual parts to move, but the *system's* CM stays put horizontally.

4.  **Set up coordinate system and initial positions:**
    Let the origin ($x=0$) be at the initial position of the boat's stern.
    Assume the boat's center of mass is at its geometric center, $L/2$.
    Initial position of boat's CM: $x_{b, initial} = L/2 = 2.5 \text{ m}$.
    Initial position of person: The person starts at the bow. So, $x_{p, initial} = L = 5 \text{ m}$.
    *   *Explanation:* Choose a convenient origin. The person starts at the front (bow).

5.  **Calculate the initial position of the system's CM:**
    $$
    R_{CM, initial} = \frac{m_p x_{p, initial} + m_b x_{b, initial}}{m_p + m_b}
    $$
    $$
    R_{CM, initial} = \frac{(70 \text{ kg})(5 \text{ m}) + (200 \text{ kg})(2.5 \text{ m})}{70 \text{ kg} + 200 \text{ kg}}
    $$
    $$
    R_{CM, initial} = \frac{350 \text{ kg}\cdot\text{m} + 500 \text{ kg}\cdot\text{m}}{270 \text{ kg}} = \frac{850 \text{ kg}\cdot\text{m}}{270 \text{ kg}} \approx 3.148 \text{ m}
    $$
    *   *Explanation:* Calculate the initial CM position using the definition.

6.  **Set up final positions:**
    The person walks to the stern. The boat moves by some distance $\Delta x_b$.
    Final position of boat's stern relative to shore: $\Delta x_b$.
    Final position of boat's CM relative to shore: $x_{b, final} = \Delta x_b + L/2 = \Delta x_b + 2.5 \text{ m}$.
    Final position of person relative to shore: The person is now at the stern of the boat. So, $x_{p, final} = \Delta x_b$.
    *   *Explanation:* The boat moves, so its CM and the person's position must be expressed relative to the shore, incorporating the boat's displacement.

7.  **Calculate the final position of the system's CM:**
    $$
    R_{CM, final} = \frac{m_p x_{p, final} + m_b x_{b, final}}{m_p + m_b}
    $$
    $$
    R_{CM, final} = \frac{(70 \text{ kg})(\Delta x_b) + (200 \text{ kg})(\Delta x_b + 2.5 \text{ m})}{270 \text{ kg}}
    $$
    *   *Explanation:* Express the final CM position in terms of the unknown boat displacement.

8.  **Equate initial and final CM positions:**
    Since $\Delta R_{CM, x} = 0$, $R_{CM, initial} = R_{CM, final}$.
    $$
    3.148 \text{ m} = \frac{70 \Delta x_b + 200 \Delta x_b + 200 \cdot 2.5}{270}
    $$
    $$
    3.148 \cdot 270 = 270 \Delta x_b + 500
    $$
    $$
    850 = 270 \Delta x_b + 500
    $$
    $$
    270 \Delta x_b = 850 - 500
    $$
    $$
    270 \Delta x_b = 350
    $$
    $$
    \Delta x_b = \frac{350}{270} \approx 1.296 \text{ m}
    $$
    $$
    \boxed{\Delta x_b \approx 1.30 \text{ m}}
    $$
    *   *Explanation:* Solve the algebraic equation for $\Delta x_b$. The boat moves in the opposite direction to the person to keep the system's CM fixed.

**Reflection:** This is a classic problem demonstrating the power of the CM concept. Without it, you'd have to deal with forces between the person and the boat, and their changing velocities, which is much more complex. By recognizing that the CM's horizontal position is fixed, the problem simplifies dramatically. The boat moves in the opposite direction to the person's movement.

### Example 4: Rocket with Varying Mass

**Problem:** A rocket of initial total mass $M_0$ (including fuel) is launched vertically upwards from rest. It expels exhaust gases downwards at a constant relative speed $v_e$ with respect to the rocket. The engine generates a constant thrust $T$. Assuming constant gravitational acceleration $g$ and negligible air resistance, find the acceleration of the rocket's center of mass at an instant when its total mass is $M(t)$.

**Given:**
*   Initial total mass, $M_0$
*   Exhaust velocity relative to rocket, $v_e$ (constant magnitude, downwards)
*   Thrust, $T$ (constant magnitude, upwards)
*   Gravitational acceleration, $g$ (constant, downwards)
*   Mass of rocket at time $t$, $M(t)$

**Want:** Acceleration of the rocket's center of mass, $\vec{A}_{CM}$, at time $t$.

**Solution:**

1.  **Define the system:** The system is the rocket body *plus* the fuel currently inside it.
    *   *Explanation:* This choice is critical. If we define the system as just the rocket body, then the thrust would be an internal force from the exhaust gases. By including the fuel, the thrust becomes an external force.

2.  **Identify external forces acting on the system:**
    *   **Thrust ($\vec{T}$):** This is the force exerted by the expelled exhaust gases on the rocket. If our system is the rocket *plus* the fuel *still inside*, then the exhaust gases that have *already left* the rocket are *outside* our system. The force they exert on the rocket (thrust) is therefore an **external force**. It acts upwards.
        *   *Explanation:* This requires careful thought. If the system is "rocket + all fuel," then the expulsion is internal. If the system is "rocket + *remaining* fuel," then the expelled mass is outside, and its reaction force (thrust) is external. This is the standard interpretation in rocket science.
    *   **Gravity ($\vec{F}_g$):** The force of gravity acting on the current total mass of the rocket and its remaining fuel, $M(t)g$. It acts downwards.
    *   *Explanation:* Gravity is always an external force from the Earth.

3.  **Apply the equation for CM motion:**
    $$
    \vec{F}_{external, total} = M_{total} \vec{A}_{CM}
    $$
    *   *Explanation:* This is the fundamental equation relating external forces to the acceleration of the system's center of mass.

4.  **Sum the external forces (vectorially):**
    Let's choose the upward direction as positive.
    The thrust $\vec{T}$ is upwards, so its component is $+T$.
    The gravitational force $\vec{F}_g$ is downwards, so its component is $-M(t)g$.
    $$
    \vec{F}_{external, total} = T\hat{j} - M(t)g\hat{j} = (T - M(t)g)\hat{j}
    $$
    *   *Explanation:* We sum the external forces, paying attention to their directions.

5.  **Substitute into the CM equation and solve for $\vec{A}_{CM}$:**
    $$
    (T - M(t)g)\hat{j} = M(t) \vec{A}_{CM}
    $$
    $$
    \vec{A}_{CM} = \frac{(T - M(t)g)}{M(t)}\hat{j}
    $$
    $$
    \boxed{\vec{A}_{CM} = \left(\frac{T}{M(t)} - g\right)\hat{j}}
    $$
    *   *Explanation:* Divide by the current total mass $M(t)$ to find the acceleration. The acceleration is in the vertical direction.

**Reflection:** This problem highlights the crucial role of external forces in rocket propulsion. The "thrust" is the external force, and it directly contributes to the acceleration of the rocket's center of mass. Notice that the acceleration of the rocket's CM increases as fuel is expended ($M(t)$ decreases), even if thrust $T$ remains constant. This is a simplified version of the Tsiolkovsky rocket equation, where the thrust term $T$ is usually expressed as $-v_e \frac{dM}{dt}$. This problem elegantly shows that even for a system with changing mass, the $\vec{F}_{ext} = M_{total} \vec{A}_{CM}$ equation still holds, provided $M_{total}$ is the *instantaneous* mass of the system.

## 6. Common mistakes and traps

1.  **Confusing Center of Mass with Geometric Center:** Students often assume the CM is always at the geometric center of an object. This is only true for uniformly dense, symmetrically shaped objects. For a donut, the CM is in the hole; for a hammer, it's closer to the head.
2.  **Including Internal Forces in $\vec{F}_{external, total}$:** This is the most common and fundamental error. Forces between particles *within* the defined system (e.g., spring forces between blocks, muscle forces in a gymnast, explosive forces in a projectile) cancel out in pairs due to Newton's Third Law and therefore do not affect the *overall* translational motion of the CM. Only forces from *outside* the system matter.
3.  **Incorrectly Defining the System:** The choice of "the system" is paramount. If you choose a system that includes the source of a force, that force becomes internal. If you exclude it, it's external. For rocket thrust, if the system is "rocket + all fuel," thrust is internal. If the system is "rocket + *remaining* fuel," thrust is external. Be explicit about your system boundaries.
4.  **Forgetting Vector Nature:** Position, velocity, acceleration, and force are all vector quantities. Students sometimes forget to account for direction, especially in multi-dimensional problems or when summing forces.
5.  **Assuming CM is at a physical location:** The center of mass is a mathematical point. It doesn't have to be where any actual mass is located. For example, the CM of a ring is at its center, where there is no material.
6.  **Confusing CM motion with individual particle motion:** Internal forces can cause individual particles within a system to accelerate wildly, or the system to rotate. This can lead students to incorrectly assume the CM's motion is also erratic. The CM's translational path, however, remains smooth and predictable, solely governed by external forces.

## 7. Textbook-precise explanation

The concept of the motion of the center of mass is a direct consequence of Newton's Laws applied to a system of particles.

Consider a system composed of $N$ particles, with masses $m_1, m_2, \dots, m_N$ and position vectors $\vec{r}_1, \vec{r}_2, \dots, \vec{r}_N$ relative to a chosen origin in an inertial frame.

The position vector of the center of mass ($\vec{R}_{CM}$) of this system is defined as:
$$
\vec{R}_{CM} = \frac{\sum_{i=1}^{N} m_i \vec{r}_i}{M}
$$
where $M = \sum_{i=1}^{N} m_i$ is the total mass of the system.

The velocity of the center of mass ($\vec{V}_{CM}$) is found by taking the time derivative of $\vec{R}_{CM}$:
$$
\vec{V}_{CM} = \frac{d\vec{R}_{CM}}{dt} = \frac{1}{M} \sum_{i=1}^{N} m_i \frac{d\vec{r}_i}{dt} = \frac{\sum_{i=1}^{N} m_i \vec{v}_i}{M}
$$
The linear momentum of the system ($\vec{P}_{total}$) is given by $\sum_{i=1}^{N} \vec{p}_i = \sum_{i=1}^{N} m_i \vec{v}_i$. Thus, $\vec{P}_{total} = M \vec{V}_{CM}$.

The acceleration of the center of mass ($\vec{A}_{CM}$) is found by taking the time derivative of $\vec{V}_{CM}$:
$$
\vec{A}_{CM} = \frac{d\vec{V}_{CM}}{dt} = \frac{1}{M} \sum_{i=1}^{N} m_i \frac{d\vec{v}_i}{dt} = \frac{\sum_{i=1}^{N} m_i \vec{a}_i}{M}
$$

Now, let's consider the forces acting on the system. For each particle $i$, according to Newton's Second Law:
$$
\vec{F}_i = m_i \vec{a}_i
$$
where $\vec{F}_i$ is the net force acting on particle $i$. The force $\vec{F}_i$ can be decomposed into two types:
1.  **Internal forces ($\vec{f}_{ij}$):** Forces exerted on particle $i$ by other particles $j$ *within* the system.
2.  **External forces ($\vec{F}_{i, ext}$):** Forces exerted on particle $i$ by agents *outside* the system.
So, $\vec{F}_i = \sum_{j \neq i} \vec{f}_{ij} + \vec{F}_{i, ext}$.

Summing Newton's Second Law over all particles in the system:
$$
\sum_{i=1}^{N} \vec{F}_i = \sum_{i=1}^{N} m_i \vec{a}_i
$$
Substituting the decomposition of $\vec{F}_i$:
$$
\sum_{i=1}^{N} \left( \sum_{j \neq i} \vec{f}_{ij} + \vec{F}_{i, ext} \right) = \sum_{i=1}^{N} m_i \vec{a}_i
$$
This can be rewritten as:
$$
\sum_{i=1}^{N} \sum_{j \neq i} \vec{f}_{ij} + \sum_{i=1}^{N} \vec{F}_{i, ext} = \sum_{i=1}^{N} m_i \vec{a}_i
$$

By Newton's Third Law, for every internal force $\vec{f}_{ij}$ (force on $i$ by $j$), there is an equal and opposite force $\vec{f}_{ji}$ (force on $j$ by $i$), such that $\vec{f}_{ij} = -\vec{f}_{ji}$. Therefore, the sum of all internal forces within the system cancels out pairwise:
$$
\sum_{i=1}^{N} \sum_{j \neq i} \vec{f}_{ij} = \vec{0}
$$

Let $\vec{F}_{external, total} = \sum_{i=1}^{N} \vec{F}_{i, ext}$ be the net external force acting on the entire system.
Substituting the cancellation of internal forces and the definition of $\vec{A}_{CM}$:
$$
\vec{F}_{external, total} = M \vec{A}_{CM}
$$

This equation states that the net external force acting on a system of particles is equal to the total mass of the system multiplied by the acceleration of its center of mass. This means the center of mass of a system moves as if all the system's mass were concentrated at that point and all external forces were applied there. Internal forces have no effect on the translational motion of the center of mass.

**Reference:** This derivation is standard in introductory mechanics textbooks. For example, see:
*   **Kleppner, D., & Kolenkow, R. J. (2014). *An Introduction to Mechanics* (2nd ed.). Cambridge University Press. Chapter 3, Section 3.2.**
*   **Resnick, R., Halliday, D., & Krane, K. S. (2002). *Physics, Volume 1* (5th ed.). John Wiley & Sons. Chapter 9, Section 9-1.**

## 8. ASCII diagrams

```text
       Thrown Wrench (Rotates while CM follows parabola)

        Launch Point
             o
             | \
             |  \
             |   \
             |    \
             |     \
             |      \
             |       \
             |        \
             |         \
             |          \
             |           \
             |            \
             |             \
             |              \
             |               \
             |                \
             |                 \
             |                  \
             |                   \
             |                    \
             |                     \
             |                      \
             |                       \
             |                        \
             |                         \
             |                          \
             |                           \
             |                            \
             |                             \
             |                              \
             |                               \
             |                                \
             |                                 \
             |                                  \
             |                                   \
             |                                    \
             |                                     \
             |                                      \
             |                                       \
             |                                        \
             |                                         \
             |                                          \
             |                                           \
             |                                            \
             |                                             \
             |                                              \
             |                                               \
             |                                                \
             |                                                 \
             |                                                  \
             |                                                   \
             |                                                    \
             |                                                     \
             |                                                      \
             |                                                       \
             |                                                        \
             |                                                         \
             |                                                          \
             |                                                           \
             |                                                            \
             |                                                             \
             |                                                              \
             |                                                               \
             |                                                                \
             |                                                                 \
             |                                                                  \
             |                                                                   \
             |                                                                    \
             |                                                                     \
             |                                                                      \
             |                                                                       \
             |                                                                        \
             |                                                                         \
             |                                                                          \
             |                                                                           \
             |                                                                            \
             |                                                                             \
             |                                                                              \
             |                                                                               \
             |                                                                                \
             |                                                                                 \
             |                                                                                  \
             |                                                                                   \
             |                                                                                    \
             |                                                                                     \
             |                                                                                      \
             |                                                                                       \
             |                                                                                        \
             |                                                                                         \
             |                                                                                          \
             |                                                                                           \
             |                                                                                            \
             |                                                                                             \
             |                                                                                              \
             |                                                                                               \
             |                                                                                                \
             |                                                                                                 \
             |                                                                                                  \
             |                                                                                                   \
             |                                                                                                    \
             |                                                                                                     \
             |                                                                                                      \
             |                                                                                                       \
             |                                                                                                        \
             |                                                                                                         \
             |                                                                                                          \
             |                                                                                                           \
             |                                                                                                            \
             |                                                                                                             \
             |                                                                                                              \
             |                                                                                                               \
             |                                                                                                                \
             |                                                                                                                 \
             |                                                                                                                  \
             |                                                                                                                   \
             |                                                                                                                    \
             |                                                                                                                     \
             |                                                                                                                      \
             |                                                                                                                       \
             |                                                                                                                        \
             |                                                                                                                         \
             |                                                                                                                          \
             |                                                                                                                           \
             |                                                                                                                            \
             |                                                                                                                             \
             |                                                                                                                              \
             |                                                                                                                               \
             |                                                                                                                                \
             |                                                                                                                                 \
             |                                                                                                                                  \
             |                                                                                                                                   \
             |                                                                                                                                    \
             |                                                                                                                                     \
             |                                                                                                                                      \
             |                                                                                                                                       \
             |                                                                                                                                        \
             |                                                                                                                                         \
             |                                                                                                                                          \
             |                                                                                                                                           \
             |                                                                                                                                            \
             |                                                                                                                                             \
             |                                                                                                                                              \
             |                                                                                                                                               \
             |                                                                                                                                                \
             |                                                                                                                                                 \
             |                                                                                                                                                  \
             |                                                                                                                                                   \
             |                                                                                                                                                    \
             |                                                                                                                                                     \
             |                                                                                                                                                      \
             |                                                                                                                                                       \
             |                                                                                                                                                        \
             |                                                                                                                                                         \
             |                                                                                                                                                          \
             |                                                                                                                                                           \
             |                                                                                                                                                            \
             |                                                                                                                                                             \
             |                                                                                                                                                              \
             |                                                                                                                                                               \
             |                                                                                                                                                                \
             |                                                                                                                                                                 \
             |                                                                                                                                                                  \
             |                                                                                                                                                                   \
             |                                                                                                                                                                    \
             |                                                                                                                                                                     \
             |                                                                                                                                                                      \
             |                                                                                                                                                                       \
             |                                                                                                                                                                        \
             |                                                                                                                                                                         \
             |                                                                                                                                                                          \
             |                                                                                                                                                                           \
             |                                                                                                                                                                            \
             |                                                                                                                                                                             \
             |                                                                                                                                                                              \
             |                                                                                                                                                                               \
             |                                                                                                                                                                                \
             |                                                                                                                                                                                 \
             |                                                                                                                                                                                  \
             |                                                                                                                                                                                   \
             |                                                                                                                                                                                    \
             |                                                                                                                                                                                     \
             |                                                                                                                                                                                      \
             |                                                                                                                                                                                       \
             |                                                                                                                                                                                        \
             |                                                                                                                                                                                         \
             |                                                                                                                                                                                          \
             |                                                                                                                                                                                           \
             |                                                                                                                                                                                            \
             |                                                                                                                                                                                             \
             |                                                                                                                                                                                              \
             |                                                                                                                                                                                               \
             |                                                                                                                                                                                                \
             |                                                                                                                                                                                                 \
             |                                                                                                                                                                                                  \
             |                                                                                                                                                                                                   \
             |                                                                                                                                                                                                    \
             |                                                                                                                                                                                                     \
             |                                                                                                                                                                                                      \
             |                                                                                                                                                                                                       \
             |                                                                                                                                                                                                        \
             |                                                                                                                                                                                                         \
             |                                                                                                                                                                                                          \
             |                                                                                                                                                                                                           \
             |                                                                                                                                                                                                            \
             |                                                                                                                                                                                                             \
             |                                                                                                                                                                                                              \
             |                                                                                                                                                                                                               \
             |                                                                                                                                                                                                                \
             |                                                                                                                                                                                                                 \
             |                                                                                                                                                                                                                  \
             |                                                                                                                                                                                                                   \
             |                                                                                                                                                                                                                    \
             |                                                                                                                                                                                                                     \
             |                                                                                                                                                                                                                      \
             |                                                                                                                                                                                                                       \
             |                                                                                                                                                                                                                        \
             |                                                                                                                                                                                                                         \
             |                                                                                                                                                                                                                          \
             |                                                                                                                                                                                                                           \
             |                                                                                                                                                                                                                            \
             |                                                                                                                                                                                                                             \
             |                                                                                                                                                                                                                              \
             |                                                                                                                                                                                                                               \
             |                                                                                                                                                                                                                                \
             |                                                                                                                                                                                                                                 \
             |                                                                                                                                                                                                                                  \
             |                                                                                                                                                                                                                                   \
             |                                                                                                                                                                                                                                    \
             |                                                                                                                                                                                                                                     \
             |                                                                                                                                                                                                                                      \
             |                                                                                                                                                                                                                                       \
             |                                                                                                                                                                                                                                        \
             |                                                                                                                                                                                                                                         \
             |                                                                                                                                                                                                                                          \
             |                                                                                                                                                                                                                                           \
             |                                                                                                                                                                                                                                            \
             |                                                                                                                                                                                                                                             \
             |                                                                                                                                                                                                                                              \
             |                                                                                                                                                                                                                                               \
             |                                                                                                                                                                                                                                                \
             |                                                                                                                                                                                                                                                 \
             |                                                                                                                                                                                                                                                  \
             |                                                                                                                                                                                                                                                   \
             |                                                                                                                                                                                                                                                    \
             |                                                                                                                                                                                                                                                     \
             |                                                                                                                                                                                                                                                      \
             |                                                                                                                                                                                                                                                       \
             |                                                                                                                                                                                                                                                        \
             |                                                                                                                                                                                                                                                         \
             |                                                                                                                                                                                                                                                          \
             |                                                                                                                                                                                                                                                           \
             |                                                                                                                                                                                                                                                            \
             |                                                                                                                                                                                                                                                             \
             |                                                                                                                                                                                                                                                              \
             |                                                                                                                                                                                                                                                               \
             |                                                                                                                                                                                                                                                                \
             |                                                                                                                                                                                                                                                                 \
             |                                                                                                                                                                                                                                                                  \
             |                                                                                                                                                                                                                                                                   \
             |                                                                                                                                                                                                                                                                    \
             |                                                                                                                                                                                                                                                                     \
             |                                                                                                                                                                                                                                                                      \
             |                                                                                                                                                                                                                                                                       \
             |                                                                                                                                                                                                                                                                        \
             |                                                                                                                                                                                                                                                                         \
             |                                                                                                                                                                                                                                                                          \
             |                                                                                                                                                                                                                                                                           \
             |                                                                                                                                                                                                                                                                            \
             |                                                                                                                                                                                                                                                                             \
             |                                                                                                                                                                                                                                                                              \
             |                                                                                                                                                                                                                                                                               \
             |                                                                                                                                                                                                                                                                                \
             |                                                                                                                                                                                                                                                                                 \
             |                                                                                                                                                                                                                                                                                  \
             |                                                                                                                                                                                                                                                                                   \
             |                                                                                                                                                                                                                                                                                    \
             |                                                                                                                                                                                                                                                                                     \
             |                                                                                                                                                                                                                                                                                      \
             |                                                                                                                                                                                                                                                                                       \
             |                                                                                                                                                                                                                                                                                        \
             |                                                                                                                                                                                                                                                                                         \
             |                                                                                                                                                                                                                                                                                          \
             |                                                                                                                                                                                                                                                                                           \
             |                                                                                                                                                                                                                                                                                            \
             |                                                                                                                                                                                                                                                                                             \
             |                                                                                                                                                                                                                                                                                              \
             |                                                                                                                                                                                                                                                                                               \
             |                                                                                                                                                                                                                                                                                                \
             |                                                                                                                                                                                                                                                                                                 \
             |                                                                                                                                                                                                                                                                                                  \
             |                                                                                                                                                                                                                                                                                                   \
             |                                                                                                                                                                                                                                                                                                    \
             |                                                                                                                                                                                                                                                                                                     \
             |                                                                                                                                                                                                                                                                                                      \
             |                                                                                                                                                                                                                                                                                                       \
             |                                                                                                                                                                                                                                                                                                        \
             |                                                                                                                                                                                                                                                                                                         \
             |                                                                                                                                                                                                                                                                                                          \
             |                                                                                                                                                                                                                                                                                                           \
             |                                                                                                                                                                                                                                                                                                            \
             |                                                                                                                                                                                                                                                                                                             \
             |                                                                                                                                                                                                                                                                                                              \
             |                                                                                                                                                                                                                                                                                                               \
             |                                                                                                                                                                                                                                                                                                                \
             |                                                                                                                                                                                                                                                                                                                 \
             |                                                                                                                                                                                                                                                                                                                  \
             |                                                                                                                                                                                                                                                                                                                   \
             |                                                                                                                                                                                                                                                                                                                    \
             |                                                                                                                                                                                                                                                                                                                     \
             |                                                                                                                                                                                                                                                                                                                      \
             |                                                                                                                                                                                                                                                                                                                       \
             |                                                                                                                                                                                                                                                                                                                        \
             |                                                                                                                                                                                                                                                                                                                         \
             |                                                                                                                                                                                                                                                                                                                          \
             |                                                                                                                                                                                                                                                                                                                           \
             |                                                                                                                                                                                                                                                                                                                            \
             |                                                                                                                                                                                                                                                                                                                             \
             |                                                                                                                                                                                                                                                                                                                              \
             |                                                                                                                                                                                                                                                                                                                               \
             |                                                                                                                                                                                                                                                                                                                                \
             |                                                                                                                                                                                                                                                                                                                                 \
             |                                                                                                                                                                                                                                                                                                                                  \
             |                                                                                                                                                                                                                                                                                                                                   \
             |                                                                                                                                                                                                                                                                                                                                    \
             |                                                                                                                                                                                                                                                                                                                                     \
             |                                                                                                                                                                                                                                                                                                                                      \
             |                                                                                                                                                                                                                                                                                                                                       \
             |                                                                                                                                                           