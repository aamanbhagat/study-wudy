## 1. What it is — in plain English

Imagine you're trying to hit a moving target with a thrown object, like a frisbee. If the target is flying straight and level, you just aim a little ahead of it, and your frisbee follows a path that intercepts it. This basic idea, of steering to keep the line between you and the target rotating at a steady rate, is called **Proportional Navigation (PN)**. It's like a dog chasing a frisbee, constantly adjusting its run to stay on an intercept course.

Now, what if the frisbee you're throwing is heavy, and gravity is constantly pulling it downwards? If you just use the basic "aim ahead" strategy, your frisbee will likely fall short. To hit the target, you instinctively aim *above* it, compensating for the downward pull.

**Augmented Proportional Navigation (APN)** is like that "aiming above" adjustment. It takes the basic PN steering command and adds extra "correction terms" to make it more accurate. One of the most common and crucial of these correction terms is for **gravity compensation**.

So, in simple terms, **Augmented Proportional Navigation with gravity compensation** means steering your missile or spacecraft not just to intercept a target, but also specifically commanding it to generate extra thrust (or lift) to counteract the constant downward pull of gravity, ensuring it doesn't undershoot its mark. It's about giving the vehicle an "upward bias" to its steering to fight against the planet's gravitational pull.

## 2. Why it matters — real-world applications

Gravity compensation in guidance systems is not just an academic exercise; it's a critical component in many real-world aerospace applications where precision and reliability are paramount.

1.  **Missile Guidance Systems (e.g., Air-to-Air, Surface-to-Air Missiles):** When a missile is launched, especially over long ranges or at high altitudes, gravity has a significant effect on its trajectory. Without proper compensation, the missile would consistently fly below its intended interception point, missing the target. Modern missiles like the AIM-120 AMRAAM or the Patriot missile system employ advanced guidance laws, including gravity compensation, to ensure high probability of kill against maneuvering targets across various flight envelopes. This is crucial for national defense and air superiority.

2.  **Rocket Launch and Re-entry Vehicles:** While launching, rockets constantly fight against gravity. During the ascent phase, the guidance system continuously calculates the thrust vector needed to achieve the desired orbit, and this calculation inherently includes overcoming the gravitational pull. Similarly, for re-entry vehicles (like SpaceX's Dragon capsule returning to Earth or even the Space Shuttle), precise guidance is needed to hit a specific landing zone. Gravity's influence during the atmospheric descent phase is immense, and guidance algorithms must account for it to ensure a safe and accurate landing.

3.  **Autonomous Drone Delivery Systems:** Companies like Amazon Prime Air or Wing (Alphabet's drone delivery service) are developing drones for package delivery. For longer-range deliveries, or in windy conditions, the drone's flight path is significantly affected by gravity. An augmented proportional navigation system with gravity compensation would enable these drones to maintain precise altitude and trajectory, ensuring packages are delivered accurately and safely, even when encountering varying payloads or atmospheric conditions.

4.  **Planetary Lander Guidance:** When a spacecraft attempts to land on another celestial body (e.g., Mars rovers like Perseverance, or lunar landers), its guidance system must precisely compensate for the local gravitational field. The "gravity compensation" term would be adjusted for the specific planet's gravity ($g_{Mars} \approx 3.7 \text{ m/s}^2$, $g_{Moon} \approx 1.62 \text{ m/s}^2$). Without this, the lander would either crash into the surface or waste excessive fuel trying to correct for an uncompensated descent, jeopardizing the mission.

## 3. Prerequisites — what you must know first

To fully grasp Augmented Proportional Navigation with gravity compensation, ensure you have a solid understanding of these fundamental concepts:

*   **Vectors:** Quantities possessing both magnitude and direction (e.g., position, velocity, acceleration, force).
*   **Newton's Laws of Motion:** Especially Newton's Second Law ($\vec{F} = m\vec{a}$) and the concept of gravitational force.
*   **Kinematics:** The study of motion without considering its causes, specifically position ($\vec{r}$), velocity ($\vec{v} = d\vec{r}/dt$), and acceleration ($\vec{a} = d\vec{v}/dt$).
*   **Calculus (Derivatives):** The mathematical tool for understanding rates of change, essential for calculating velocity from position and acceleration from velocity.
*   **Proportional Navigation (PN):** The basic guidance law where the commanded acceleration is proportional to the line-of-sight (LOS) rate and perpendicular to the LOS vector.
*   **Relative Motion:** How to describe the motion of one object with respect to another, crucial for defining relative position and velocity between a missile and a target.
*   **Coordinate Systems:** Understanding how to represent vectors in different frames (e.g., inertial frame, body frame) and perform transformations if necessary.

## 4. The core idea — step by step

Let's break down how gravity compensation is integrated into proportional navigation.

### Step 1: Recall Basic Proportional Navigation (PN)

*   **Plain English:** The fundamental idea of PN is to steer a missile so that the line connecting it to the target (the "line-of-sight" or LOS) rotates at a rate proportional to how fast the missile is closing in on the target. More simply, it tries to keep the target's bearing constant in the missile's frame of reference. If the bearing stays constant, you're on a collision course.
*   **Small Concrete Example:** Imagine you're driving a car and want to intercept another car. If the other car appears to be moving neither left nor right in your windshield, but just getting bigger, you're on an intercept course. If it's drifting left, you steer left; if it's drifting right, you steer right. The amount you steer is proportional to how fast it's drifting.
*   **Formal/Mathematical Version:** The commanded acceleration of the missile, $\vec{a}_m$, is perpendicular to the line-of-sight vector $\vec{R}$ (from missile to target) and proportional to the product of the closing velocity $V_c$ and the line-of-sight rate $\dot{\lambda}$.
    $$ \vec{a}_m = N V_c \dot{\lambda} \hat{e}_{\lambda} $$
    Where:
    *   $N$ is the dimensionless navigation constant (typically between 3 and 5).
    *   $V_c$ is the closing velocity, the rate at which the distance between missile and target is decreasing.
    *   $\dot{\lambda}$ is the line-of-sight angular rate (how fast the LOS is rotating).
    *   $\hat{e}_{\lambda}$ is a unit vector perpendicular to the LOS vector $\vec{R}$ in the plane of rotation.
    More rigorously, using vector cross products:
    Let $\vec{R} = \vec{r}_T - \vec{r}_M$ be the relative position vector (target position - missile position).
    Let $\vec{V} = \vec{v}_T - \vec{v}_M$ be the relative velocity vector (target velocity - missile velocity).
    Then the line-of-sight rate vector is $\vec{\omega}_{LOS} = \frac{\vec{R} \times \vec{V}}{|\vec{R}|^2}$.
    The commanded acceleration perpendicular to the LOS is:
    $$ \vec{a}_m = N \vec{\omega}_{LOS} \times \vec{V} = N \left( \frac{\vec{R} \times \vec{V}}{|\vec{R}|^2} \right) \times \vec{V} $$
    The component of this acceleration perpendicular to $\vec{R}$ is what the missile generates. The magnitude of $\dot{\lambda}$ is $|\vec{\omega}_{LOS}|$.
*   **What could go wrong:** Basic PN assumes the missile and target are in an ideal, force-free environment. It doesn't account for external forces like gravity, or for target maneuvers. If gravity is present, the missile will consistently undershoot.

### Step 2: The Problem Introduced by Gravity

*   **Plain English:** Gravity is a constant, downward pull on any object with mass. If a missile is flying, gravity is always trying to drag it towards the center of the Earth. If our guidance system only tells the missile to steer based on the target's position (PN), it won't know to fight this downward pull. It's like trying to hit a target with a water balloon, but forgetting that the balloon will arc downwards.
*   **Small Concrete Example:** A missile is launched horizontally towards a target. The basic PN command will tell it to fly straight. However, gravity will immediately start pulling the missile downwards, causing it to drop below the intended straight-line path and pass under the target.
*   **Formal/Mathematical Version:** The actual acceleration of the missile, $\vec{a}_{M, \text{actual}}$, is not just the commanded acceleration $\vec{a}_{M, \text{commanded}}$ but also includes the effect of gravity, $\vec{g}$.
    $$ \vec{a}_{M, \text{actual}} = \vec{a}_{M, \text{commanded}} + \vec{g} $$
    Here, $\vec{g}$ is the local gravitational acceleration vector, pointing downwards. If the missile only commands $\vec{a}_{M, \text{commanded}} = \vec{a}_{PN}$, then its actual path will be curved downwards by $\vec{g}$, leading to a miss.
*   **What could go wrong:** Without compensating for $\vec{g}$, the missile's trajectory will sag, leading to a significant miss, especially over long ranges or during low-energy flight phases. This wastes fuel as the missile might try to make large, inefficient corrections late in the flight.

### Step 3: Introducing Augmented Proportional Navigation (APN)

*   **Plain English:** Augmented PN is an upgrade to basic PN. It adds extra terms to the guidance command to account for factors that basic PN ignores, like target acceleration, missile acceleration limits, or external forces. It's about making the guidance smarter by giving it more information and more tools to react to the real world.
*   **Small Concrete Example:** If the target suddenly accelerates, basic PN would react slowly. An APN system might include a term that predicts the target's future position based on its acceleration, allowing the missile to anticipate and react faster. Gravity compensation is just one such "augmentation."
*   **Formal/Mathematical Version:** The general form of APN is:
    $$ \vec{a}_m = \vec{a}_{PN} + \vec{a}_{\text{augmentation terms}} $$
    Where $\vec{a}_{\text{augmentation terms}}$ can include terms for target acceleration, missile acceleration limits, and, crucially, gravity.
*   **What could go wrong:** Adding the wrong augmentation terms, or poorly estimating the parameters for these terms (e.g., target acceleration), can actually degrade performance, leading to instability or even larger misses. Each augmentation must be carefully derived and validated.

### Step 4: The Gravity Compensation Term

*   **Plain English:** To counteract gravity, the missile needs to generate an acceleration equal in magnitude and opposite in direction to the gravitational acceleration it experiences. If gravity pulls it down at $9.8 \text{ m/s}^2$, the missile must command an upward acceleration of $9.8 \text{ m/s}^2$ just to stay on its intended path *as if gravity wasn't there*.
*   **Small Concrete Example:** If gravity is pulling the missile straight down along the Z-axis with an acceleration of $\vec{g} = (0, 0, -9.81) \text{ m/s}^2$, the gravity compensation term, $\vec{a}_{GC}$, would be $(0, 0, +9.81) \text{ m/s}^2$. This term is added to the PN command.
*   **Formal/Mathematical Version:** The gravity compensation term, $\vec{a}_{GC}$, is simply the negative of the local gravitational acceleration vector acting on the missile:
    $$ \vec{a}_{GC} = -\vec{g} $$
    Where $\vec{g}$ is the gravitational acceleration vector at the missile's current position. Note that $\vec{g}$ is a vector pointing towards the center of the Earth. Its magnitude is approximately $9.81 \text{ m/s}^2$ near the Earth's surface, but varies with altitude.
*   **What could go wrong:**
    1.  **Incorrect direction:** Applying compensation in the wrong direction (e.g., adding $\vec{g}$ instead of $-\vec{g}$) would make the problem worse, causing the missile to dive even faster.
    2.  **Incorrect magnitude:** Using a constant $g$ value when the missile changes altitude significantly can lead to over or under-compensation.
    3.  **Coordinate system issues:** If $\vec{g}$ is defined in one coordinate system and the missile's commanded acceleration in another, proper transformation is needed.

### Step 5: Combining PN and Gravity Compensation

*   **Plain English:** The final guidance command for the missile is the sum of the basic PN command (to steer towards the target) and the gravity compensation term (to fight gravity). It's like telling the missile: "Steer this way to hit the target, AND push up this much to stay aloft against gravity."
*   **Small Concrete Example:** If the PN command tells the missile to accelerate $5 \text{ m/s}^2$ to the right (X-direction) and $2 \text{ m/s}^2$ upwards (Z-direction), and gravity pulls it down at $9.81 \text{ m/s}^2$ (so $\vec{g} = (0, 0, -9.81)$), then the total commanded acceleration would be:
    $\vec{a}_m = (5, 0, 2) - (0, 0, -9.81) = (5, 0, 2 + 9.81) = (5, 0, 11.81) \text{ m/s}^2$.
    The missile is commanded to accelerate $5 \text{ m/s}^2$ right and $11.81 \text{ m/s}^2$ upwards.
*   **Formal/Mathematical Version:** The total commanded acceleration for the missile, $\vec{a}_m$, is given by:
    $$ \vec{a}_m = N \left( \frac{\vec{R} \times \vec{V}}{|\vec{R}|^2} \right) \times \vec{V} - \vec{g} $$
    Where:
    *   $\vec{R} = \vec{r}_T - \vec{r}_M$ is the relative position vector.
    *   $\vec{V} = \vec{v}_T - \vec{v}_M$ is the relative velocity vector.
    *   $N$ is the navigation constant.
    *   $\vec{g}$ is the local gravitational acceleration vector.
    The missile will then attempt to generate this acceleration using its control surfaces and/or engine thrust.
*   **What could go wrong:** The missile's physical capabilities (maximum thrust, aerodynamic limits) might not be sufficient to generate the commanded acceleration, especially if $N$ is too high or if the gravity compensation term requires significant sustained thrust. This can lead to saturation or a miss.

## 5. Worked examples — multiple, with every step shown

We'll use a Cartesian coordinate system where the positive Z-axis points upwards, and gravity acts along the negative Z-axis. Thus, $\vec{g} = (0, 0, -g)$, where $g \approx 9.81 \text{ m/s}^2$.

### Example 1: Pure Gravity Compensation (Hovering)

**Problem:** A drone is commanded to hover at a fixed altitude. What is the required vertical acceleration command from its flight controller if it needs to compensate for gravity? Assume it's already at the correct horizontal position and velocity.

**Given:**
*   Gravitational acceleration magnitude $g = 9.81 \text{ m/s}^2$.
*   Desired motion: hover (zero net acceleration).

**What we want:** The vertical acceleration command $\vec{a}_{commanded}$ to achieve hovering.

**Solution:**

1.  **Identify the force acting on the drone:**
    Gravity is pulling the drone downwards. In our coordinate system (Z-axis up), the gravity vector is:
    $$ \vec{g} = (0, 0, -9.81) \text{ m/s}^2 $$
    *Explanation: Gravity always acts downwards. If positive Z is up, then downward is negative Z.*

2.  **Determine the required compensation:**
    To counteract gravity and achieve zero net acceleration (hover), the drone must generate an acceleration equal in magnitude and opposite in direction to gravity. This is the gravity compensation term.
    $$ \vec{a}_{GC} = -\vec{g} $$
    *Explanation: If gravity pulls down, we must push up. The negative sign flips the direction of the vector.*

3.  **Calculate the gravity compensation term:**
    Substitute the value of $\vec{g}$:
    $$ \vec{a}_{GC} = -(0, 0, -9.81) \text{ m/s}^2 $$
    $$ \vec{a}_{GC} = (0, 0, +9.81) \text{ m/s}^2 $$
    *Explanation: Multiplying a vector by -1 changes the sign of each component.*

4.  **State the final command:**
    Since the drone is already at the correct horizontal position and velocity (implying no PN component needed for horizontal motion), the total commanded acceleration is just the gravity compensation.
    $$ \vec{a}_{commanded} = \vec{a}_{GC} $$
    $$ \boxed{\vec{a}_{commanded} = (0, 0, +9.81) \text{ m/s}^2} $$
    *Explanation: The drone must command an upward acceleration of $9.81 \text{ m/s}^2$ to perfectly balance the downward pull of gravity.*

**Reflection:** This example highlights the core idea of gravity compensation in its simplest form. It shows that even for a stationary object, an active control system needs to continuously command an acceleration to counteract gravity. The "PN" part of APN is zero here because there's no relative motion to track.

### Example 2: Horizontal Missile Flight with Gravity Compensation

**Problem:** A missile is flying horizontally at a constant velocity $\vec{v}_M = (200, 0, 0) \text{ m/s}$ towards a stationary target at $\vec{r}_T = (10000, 0, 0) \text{ m}$. The missile is currently at $\vec{r}_M = (0, 0, 100) \text{ m}$. Assume $N=4$ and $g=9.81 \text{ m/s}^2$. Calculate the total commanded acceleration $\vec{a}_M$ for the missile.

**Given:**
*   Missile velocity $\vec{v}_M = (200, 0, 0) \text{ m/s}$
*   Target position $\vec{r}_T = (10000, 0, 0) \text{ m}$
*   Missile position $\vec{r}_M = (0, 0, 100) \text{ m}$
*   Target velocity $\vec{v}_T = (0, 0, 0) \text{ m/s}$ (stationary)
*   Navigation Constant $N = 4$
*   Gravitational acceleration $\vec{g} = (0, 0, -9.81) \text{ m/s}^2$

**What we want:** The total commanded acceleration $\vec{a}_M$.

**Solution:**

1.  **Calculate the relative position vector $\vec{R}$:**
    $$ \vec{R} = \vec{r}_T - \vec{r}_M $$
    $$ \vec{R} = (10000, 0, 0) - (0, 0, 100) $$
    $$ \vec{R} = (10000, 0, -100) \text{ m} $$
    *Explanation: $\vec{R}$ points from the missile to the target. It represents how far and in what direction the target is relative to the missile.*

2.  **Calculate the relative velocity vector $\vec{V}$:**
    $$ \vec{V} = \vec{v}_T - \vec{v}_M $$
    $$ \vec{V} = (0, 0, 0) - (200, 0, 0) $$
    $$ \vec{V} = (-200, 0, 0) \text{ m/s} $$
    *Explanation: $\vec{V}$ represents the target's velocity relative to the missile. Since the target is stationary and the missile is moving in the positive X direction, the target appears to be moving in the negative X direction relative to the missile.*

3.  **Calculate the closing velocity $V_c$:**
    The closing velocity is the negative of the component of relative velocity along the line-of-sight.
    $$ V_c = -\frac{\vec{R} \cdot \vec{V}}{|\vec{R}|} $$
    First, find $|\vec{R}|$:
    $$ |\vec{R}| = \sqrt{(10000)^2 + (0)^2 + (-100)^2} = \sqrt{100000000 + 10000} = \sqrt{100010000} \approx 10000.5 \text{ m} $$
    Next, find $\vec{R} \cdot \vec{V}$:
    $$ \vec{R} \cdot \vec{V} = (10000)(-200) + (0)(0) + (-100)(0) = -2000000 $$
    Now, calculate $V_c$:
    $$ V_c = -\frac{-2000000}{10000.5} \approx 199.99 \text{ m/s} $$
    *Explanation: $V_c$ is the rate at which the distance between the missile and target is decreasing. A positive $V_c$ means they are getting closer.*

4.  **Calculate the line-of-sight rate vector $\vec{\omega}_{LOS}$:**
    $$ \vec{\omega}_{LOS} = \frac{\vec{R} \times \vec{V}}{|\vec{R}|^2} $$
    First, calculate $\vec{R} \times \vec{V}$:
    $$ \vec{R} \times \vec{V} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 10000 & 0 & -100 \\ -200 & 0 & 0 \end{vmatrix} $$
    $$ = \hat{i}((0)(0) - (-100)(0)) - \hat{j}((10000)(0) - (-100)(-200)) + \hat{k}((10000)(0) - (0)(-200)) $$
    $$ = \hat{i}(0) - \hat{j}(0 - 20000) + \hat{k}(0) $$
    $$ = (0, 20000, 0) $$
    Now, calculate $\vec{\omega}_{LOS}$:
    $$ \vec{\omega}_{LOS} = \frac{(0, 20000, 0)}{(10000.5)^2} = \frac{(0, 20000, 0)}{100010000} \approx (0, 0.0002, 0) \text{ rad/s} $$
    *Explanation: The cross product $\vec{R} \times \vec{V}$ gives a vector perpendicular to both $\vec{R}$ and $\vec{V}$, representing the angular momentum. Dividing by $|\vec{R}|^2$ gives the angular velocity of the LOS vector.*

5.  **Calculate the PN commanded acceleration $\vec{a}_{PN}$:**
    $$ \vec{a}_{PN} = N \vec{\omega}_{LOS} \times \vec{V} $$
    $$ \vec{a}_{PN} = 4 \times (0, 0.0002, 0) \times (-200, 0, 0) $$
    First, calculate $\vec{\omega}_{LOS} \times \vec{V}$:
    $$ \vec{\omega}_{LOS} \times \vec{V} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 0 & 0.0002 & 0 \\ -200 & 0 & 0 \end{vmatrix} $$
    $$ = \hat{i}((0.0002)(0) - (0)(0)) - \hat{j}((0)(0) - (0)(-200)) + \hat{k}((0)(0) - (0.0002)(-200)) $$
    $$ = \hat{i}(0) - \hat{j}(0) + \hat{k}(0.04) $$
    $$ = (0, 0, 0.04) \text{ m/s}^2 $$
    Now, multiply by $N$:
    $$ \vec{a}_{PN} = 4 \times (0, 0, 0.04) = (0, 0, 0.16) \text{ m/s}^2 $$
    *Explanation: This is the acceleration required by basic PN to null the line-of-sight rate. It's an upward acceleration because the missile is slightly below the target, and thus the LOS is pointing slightly downwards. To bring the LOS back to horizontal (or keep it from rotating downwards), the missile needs to accelerate upwards.*

6.  **Calculate the gravity compensation term $\vec{a}_{GC}$:**
    $$ \vec{a}_{GC} = -\vec{g} $$
    $$ \vec{a}_{GC} = -(0, 0, -9.81) \text{ m/s}^2 $$
    $$ \vec{a}_{GC} = (0, 0, +9.81) \text{ m/s}^2 $$
    *Explanation: The missile needs to command an acceleration directly opposite to gravity to counteract its downward pull.*

7.  **Calculate the total commanded acceleration $\vec{a}_M$:**
    $$ \vec{a}_M = \vec{a}_{PN} + \vec{a}_{GC} $$
    $$ \vec{a}_M = (0, 0, 0.16) + (0, 0, 9.81) $$
    $$ \boxed{\vec{a}_M = (0, 0, 9.97) \text{ m/s}^2} $$
    *Explanation: The total commanded acceleration is the sum of the PN component (to adjust for the target's relative position) and the gravity compensation component (to fight gravity). In this case, both components are purely vertical and additive.*

**Reflection:** This example shows how even for a seemingly simple horizontal flight, gravity demands a significant upward acceleration command. The PN component is small because the missile is already mostly on target, but the gravity compensation term is dominant, ensuring the missile doesn't just fall to Earth.

### Example 3: 2D Engagement with Gravity Compensation

**Problem:** A missile is at $\vec{r}_M = (0, 0, 0) \text{ m}$ with velocity $\vec{v}_M = (300, 0, 50) \text{ m/s}$. A target is at $\vec{r}_T = (1000, 0, 200) \text{ m}$ with velocity $\vec{v}_T = (100, 0, 0) \text{ m/s}$. The navigation constant $N=3$. Gravitational acceleration is $\vec{g} = (0, 0, -9.81) \text{ m/s}^2$. Calculate the total commanded acceleration $\vec{a}_M$ for the missile.

**Given:**
*   Missile position $\vec{r}_M = (0, 0, 0) \text{ m}$
*   Missile velocity $\vec{v}_M = (300, 0, 50) \text{ m/s}$
*   Target position $\vec{r}_T = (1000, 0, 200) \text{ m}$
*   Target velocity $\vec{v}_T = (100, 0, 0) \text{ m/s}$
*   Navigation Constant $N = 3$
*   Gravitational acceleration $\vec{g} = (0, 0, -9.81) \text{ m/s}^2$

**What we want:** The total commanded acceleration $\vec{a}_M$.

**Solution:**

1.  **Calculate the relative position vector $\vec{R}$:**
    $$ \vec{R} = \vec{r}_T - \vec{r}_M $$
    $$ \vec{R} = (1000, 0, 200) - (0, 0, 0) $$
    $$ \vec{R} = (1000, 0, 200) \text{ m} $$

2.  **Calculate the relative velocity vector $\vec{V}$:**
    $$ \vec{V} = \vec{v}_T - \vec{v}_M $$
    $$ \vec{V} = (100, 0, 0) - (300, 0, 50) $$
    $$ \vec{V} = (-200, 0, -50) \text{ m/s} $$

3.  **Calculate the magnitude of $\vec{R}$:**
    $$ |\vec{R}| = \sqrt{(1000)^2 + (0)^2 + (200)^2} = \sqrt{1000000 + 40000} = \sqrt{1040000} \approx 1019.8 \text{ m} $$

4.  **Calculate the line-of-sight rate vector $\vec{\omega}_{LOS}$:**
    $$ \vec{\omega}_{LOS} = \frac{\vec{R} \times \vec{V}}{|\vec{R}|^2} $$
    First, calculate $\vec{R} \times \vec{V}$:
    $$ \vec{R} \times \vec{V} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 1000 & 0 & 200 \\ -200 & 0 & -50 \end{vmatrix} $$
    $$ = \hat{i}((0)(-50) - (200)(0)) - \hat{j}((1000)(-50) - (200)(-200)) + \hat{k}((1000)(0) - (0)(-200)) $$
    $$ = \hat{i}(0) - \hat{j}(-50000 - (-40000)) + \hat{k}(0) $$
    $$ = \hat{i}(0) - \hat{j}(-10000) + \hat{k}(0) $$
    $$ = (0, 10000, 0) $$
    Now, calculate $\vec{\omega}_{LOS}$:
    $$ \vec{\omega}_{LOS} = \frac{(0, 10000, 0)}{(1019.8)^2} = \frac{(0, 10000, 0)}{1040000} \approx (0, 0.009615, 0) \text{ rad/s} $$

5.  **Calculate the PN commanded acceleration $\vec{a}_{PN}$:**
    $$ \vec{a}_{PN} = N \vec{\omega}_{LOS} \times \vec{V} $$
    $$ \vec{a}_{PN} = 3 \times (0, 0.009615, 0) \times (-200, 0, -50) $$
    First, calculate $\vec{\omega}_{LOS} \times \vec{V}$:
    $$ \vec{\omega}_{LOS} \times \vec{V} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 0 & 0.009615 & 0 \\ -200 & 0 & -50 \end{vmatrix} $$
    $$ = \hat{i}((0.009615)(-50) - (0)(0)) - \hat{j}((0)(-50) - (0)(-200)) + \hat{k}((0)(0) - (0.009615)(-200)) $$
    $$ = \hat{i}(-0.48075) - \hat{j}(0) + \hat{k}(1.923) $$
    $$ = (-0.48075, 0, 1.923) \text{ m/s}^2 $$
    Now, multiply by $N$:
    $$ \vec{a}_{PN} = 3 \times (-0.48075, 0, 1.923) $$
    $$ \vec{a}_{PN} = (-1.44225, 0, 5.769) \text{ m/s}^2 $$
    *Explanation: This acceleration vector is perpendicular to the line-of-sight. It has a negative X component (turn left) and a positive Z component (turn up). This is to correct the relative motion and null the LOS rate.*

6.  **Calculate the gravity compensation term $\vec{a}_{GC}$:**
    $$ \vec{a}_{GC} = -\vec{g} $$
    $$ \vec{a}_{GC} = -(0, 0, -9.81) \text{ m/s}^2 $$
    $$ \vec{a}_{GC} = (0, 0, +9.81) \text{ m/s}^2 $$

7.  **Calculate the total commanded acceleration $\vec{a}_M$:**
    $$ \vec{a}_M = \vec{a}_{PN} + \vec{a}_{GC} $$
    $$ \vec{a}_M = (-1.44225, 0, 5.769) + (0, 0, 9.81) $$
    $$ \boxed{\vec{a}_M = (-1.44225, 0, 15.579) \text{ m/s}^2} $$

**Reflection:** Here, both the PN term and the gravity compensation term contribute significantly. The PN term commands a turn to the left and upwards to intercept the target, while the gravity compensation adds an additional strong upward push to counteract gravity. Notice that the Y-component remains zero throughout, as the motion is confined to the X-Z plane.

### Example 4: Missile with Varying Altitude and Gravity Model

**Problem:** A missile is at $\vec{r}_M = (0, 0, 10000) \text{ m}$ (10 km altitude) with velocity $\vec{v}_M = (500, 0, -100) \text{ m/s}$ (descending). A target is at $\vec{r}_T = (20000, 0, 5000) \text{ m}$ (5 km altitude) with velocity $\vec{v}_T = (200, 0, 0) \text{ m/s}$. The navigation constant $N=4$. Use an altitude-dependent gravity model where $g(h) = g_0 \left( \frac{R_E}{R_E + h} \right)^2$, with $g_0 = 9.81 \text{ m/s}^2$ (gravity at Earth's surface) and $R_E = 6.371 \times 10^6 \text{ m}$ (Earth's radius). Calculate the total commanded acceleration $\vec{a}_M$.

**Given:**
*   Missile position $\vec{r}_M = (0, 0, 10000) \text{ m}$
*   Missile velocity $\vec{v}_M = (500, 0, -100) \text{ m/s}$
*   Target position $\vec{r}_T = (20000, 0, 5000) \text{ m}$
*   Target velocity $\vec{v}_T = (200, 0, 0) \text{ m/s}$
*   Navigation Constant $N = 4$
*   $g_0 = 9.81 \text{ m/s}^2$
*   $R_E = 6.371 \times 10^6 \text{ m}$

**What we want:** The total commanded acceleration $\vec{a}_M$.

**Solution:**

1.  **Calculate the relative position vector $\vec{R}$:**
    $$ \vec{R} = \vec{r}_T - \vec{r}_M $$
    $$ \vec{R} = (20000, 0, 5000) - (0, 0, 10000) $$
    $$ \vec{R} = (20000, 0, -5000) \text{ m} $$

2.  **Calculate the relative velocity vector $\vec{V}$:**
    $$ \vec{V} = \vec{v}_T - \vec{v}_M $$
    $$ \vec{V} = (200, 0, 0) - (500, 0, -100) $$
    $$ \vec{V} = (-300, 0, 100) \text{ m/s} $$

3.  **Calculate the magnitude of $\vec{R}$:**
    $$ |\vec{R}| = \sqrt{(20000)^2 + (0)^2 + (-5000)^2} = \sqrt{400000000 + 25000000} = \sqrt{425000000} \approx 20615.53 \text{ m} $$

4.  **Calculate the line-of-sight rate vector $\vec{\omega}_{LOS}$:**
    $$ \vec{\omega}_{LOS} = \frac{\vec{R} \times \vec{V}}{|\vec{R}|^2} $$
    First, calculate $\vec{R} \times \vec{V}$:
    $$ \vec{R} \times \vec{V} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 20000 & 0 & -5000 \\ -300 & 0 & 100 \end{vmatrix} $$
    $$ = \hat{i}((0)(100) - (-5000)(0)) - \hat{j}((20000)(100) - (-5000)(-300)) + \hat{k}((20000)(0) - (0)(-300)) $$
    $$ = \hat{i}(0) - \hat{j}(2000000 - 1500000) + \hat{k}(0) $$
    $$ = \hat{i}(0) - \hat{j}(500000) + \hat{k}(0) $$
    $$ = (0, -500000, 0) $$
    Now, calculate $\vec{\omega}_{LOS}$:
    $$ \vec{\omega}_{LOS} = \frac{(0, -500000, 0)}{(20615.53)^2} = \frac{(0, -500000, 0)}{425000000} \approx (0, -0.001176, 0) \text{ rad/s} $$

5.  **Calculate the PN commanded acceleration $\vec{a}_{PN}$:**
    $$ \vec{a}_{PN} = N \vec{\omega}_{LOS} \times \vec{V} $$
    $$ \vec{a}_{PN} = 4 \times (0, -0.001176, 0) \times (-300, 0, 100) $$
    First, calculate $\vec{\omega}_{LOS} \times \vec{V}$:
    $$ \vec{\omega}_{LOS} \times \vec{V} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 0 & -0.001176 & 0 \\ -300 & 0 & 100 \end{vmatrix} $$
    $$ = \hat{i}((-0.001176)(100) - (0)(0)) - \hat{j}((0)(100) - (0)(-300)) + \hat{k}((0)(0) - (-0.001176)(-300)) $$
    $$ = \hat{i}(-0.1176) - \hat{j}(0) + \hat{k}(-0.3528) $$
    $$ = (-0.1176, 0, -0.3528) \text{ m/s}^2 $$
    Now, multiply by $N$:
    $$ \vec{a}_{PN} = 4 \times (-0.1176, 0, -0.3528) $$
    $$ \vec{a}_{PN} = (-0.4704, 0, -1.4112) \text{ m/s}^2 $$
    *Explanation: The PN command has negative X and Z components. This means the missile needs to accelerate left and downwards to correct its trajectory and null the LOS rate. The missile is currently above the target and moving faster in X, but also descending. The target is lower and moving slower. The PN command is aiming to bring the LOS towards the target's relative trajectory.*

6.  **Calculate the gravity compensation term $\vec{a}_{GC}$:**
    First, calculate the magnitude of gravity at the missile's altitude $h = 10000 \text{ m}$:
    $$ g(h) = g_0 \left( \frac{R_E}{R_E + h} \right)^2 $$
    $$ g(10000) = 9.81 \left( \frac{6.371 \times 10^6}{6.371 \times 10^6 + 10000} \right)^2 $$
    $$ g(10000) = 9.81 \left( \frac{6371000}{6381000} \right)^2 $$
    $$ g(10000) = 9.81 \times (0.998432)^2 $$
    $$ g(10000) = 9.81 \times 0.996866 \approx 9.778 \text{ m/s}^2 $$
    Now, construct the gravity vector $\vec{g}$:
    $$ \vec{g} = (0, 0, -9.778) \text{ m/s}^2 $$
    The gravity compensation term is:
    $$ \vec{a}_{GC} = -\vec{g} $$
    $$ \vec{a}_{GC} = -(0, 0, -9.778) \text{ m/s}^2 $$
    $$ \vec{a}_{GC} = (0, 0, +9.778) \text{ m/s}^2 $$
    *Explanation: Gravity is slightly weaker at 10 km altitude than at the surface. The compensation term still acts purely upwards, but its magnitude reflects the local gravity.*

7.  **Calculate the total commanded acceleration $\vec{a}_M$:**
    $$ \vec{a}_M = \vec{a}_{PN} + \vec{a}_{GC} $$
    $$ \vec{a}_M = (-0.4704, 0, -1.4112) + (0, 0, 9.778) $$
    $$ \boxed{\vec{a}_M = (-0.4704, 0, 8.3668) \text{ m/s}^2} $$

**Reflection:** This example demonstrates the importance of using an accurate gravity model, especially for missions involving significant altitude changes. The PN term here has a downward component, meaning that relative to the target, the missile needs to reduce its altitude or vertical velocity. However, the gravity compensation term is much larger and upward, resulting in a net upward command in the Z-direction. This ensures the missile doesn't just plummet due to gravity while trying to adjust its relative trajectory. This scenario is trickier because the missile is descending, but the overall effect of gravity still needs to be counteracted for precise control.

## 6. Common mistakes and traps

1.  **Forgetting the vector nature of gravity:** Gravity is not just a scalar magnitude ($g$) but a vector ($\vec{g}$) pointing in a specific direction (towards the center of mass, usually approximated as vertically downwards). Incorrectly applying it as a scalar or in the wrong direction is a common error.
2.  **Confusing missile acceleration with relative acceleration:** The PN law commands the missile's *absolute* acceleration, but it's derived from *relative* position and velocity. Gravity compensation is added to the missile's absolute commanded acceleration.
3.  **Incorrectly calculating line-of-sight rate:** The LOS rate $\dot{\lambda}$ is crucial. Errors in vector cross products, magnitudes, or using the wrong coordinate system will propagate and lead to incorrect PN commands.
4.  **Applying gravity compensation in the wrong direction:** The compensation term must be $-\vec{g}$, not $+\vec{g}$. Adding gravity instead of subtracting it would double the effect of gravity, causing a rapid dive.
5.  **Neglecting the navigation constant N:** $N$ is a critical tuning parameter. Forgetting to multiply the LOS rate term by $N$ will result in an under-responsive guidance law.
6.  **Assuming constant gravity over long ranges/altitudes:** For short-range, low-altitude flights, $g \approx 9.81 \text{ m/s}^2$ is often sufficient. However, for high-altitude missions, orbital mechanics, or interplanetary travel, gravity varies significantly with distance from the central body. Using a simple constant $g$ can lead to large errors.
7.  **Ignoring missile kinematic limits:** The calculated commanded acceleration might exceed the missile's physical capabilities (e.g., maximum thrust, maximum G-load). A real guidance system must include saturation logic to handle such scenarios, but a common mistake in theory is to assume infinite maneuverability.

## 7. Textbook-precise explanation

Augmented Proportional Navigation (APN) with gravity compensation is a class of guidance laws that extends the fundamental Proportional Navigation (PN) principle by incorporating additional terms to account for known disturbances or improve performance. In the context of gravity compensation, the guidance law commands an acceleration that not only drives the line-of-sight (LOS) rate to zero but also actively counteracts the gravitational acceleration experienced by the interceptor.

Let $\vec{r}_M$ and $\vec{v}_M$ be the position and velocity vectors of the missile (interceptor), and $\vec{r}_T$ and $\vec{v}_T$ be those of the target, all expressed in an inertial reference frame.

The relative position vector from the missile to the target is $\vec{R} = \vec{r}_T - \vec{r}_M$.
The relative velocity vector is $\vec{V} = \vec{v}_T - \vec{v}_M$.

The line-of-sight (LOS) unit vector is $\hat{R} = \frac{\vec{R}}{|\vec{R}|}$.
The line-of-sight angular rate vector, $\vec{\omega}_{LOS}$, which describes the rotation of the LOS vector, is given by:
$$ \vec{\omega}_{LOS} = \frac{\vec{R} \times \vec{V}}{|\vec{R}|^2} $$
The magnitude of the LOS rate is $\dot{\lambda} = |\vec{\omega}_{LOS}|$.

The basic Proportional Navigation (PN) guidance law commands an acceleration $\vec{a}_{PN}$ perpendicular to the LOS vector, with a magnitude proportional to the product of the navigation constant $N$ and the LOS rate $\dot{\lambda}$, multiplied by the closing velocity $V_c$. A more robust vector form for the PN command, perpendicular to $\vec{R}$, is:
$$ \vec{a}_{PN} = N \vec{\omega}_{LOS} \times \vec{V} $$
This can also be expressed as:
$$ \vec{a}_{PN} = N \frac{\vec{R} \times \vec{V}}{|\vec{R}|^2} \times \vec{V} $$

To incorporate gravity compensation, we recognize that the missile's guidance system must command an additional acceleration to nullify the effect of the local gravitational acceleration, $\vec{g}$, acting on the missile. If the missile were to follow only the $\vec{a}_{PN}$ command, its actual acceleration would be $\vec{a}_{PN} + \vec{g}$. To ensure its actual acceleration matches the desired $\vec{a}_{PN}$, the guidance system must command an acceleration that includes a term equal to $-\vec{g}$.

Therefore, the total commanded acceleration for the missile, $\vec{a}_M$, under Augmented Proportional Navigation with gravity compensation, is:
$$ \vec{a}_M = \vec{a}_{PN} - \vec{g} $$
Substituting the vector form of $\vec{a}_{PN}$:
$$ \vec{a}_M = N \frac{\vec{R} \times \vec{V}}{|\vec{R}|^2} \times \vec{V} - \vec{g} $$
Here, $\vec{g}$ is the gravitational acceleration vector at the missile's current position, typically pointing towards the center of the Earth. Its magnitude may vary with altitude.

This guidance law ensures that the missile's effective acceleration, after accounting for gravity, is precisely what is needed to drive the LOS rate to zero and achieve interception. This formulation is widely used in tactical missile guidance.

**Reference:**
*   Zarchan, P. (2012). *Tactical and Strategic Missile Guidance* (6th ed.). American Institute of Aeronautics and Astronautics. (Specifically, Chapter 1 and Chapter 2 discuss PN and its augmentations, including gravity compensation).
*   Sidi, M. J. (1998). *Missile Guidance and Control Systems*. Hemisphere Publishing Corporation. (Chapter 3 covers proportional navigation and its variants).

## 8. ASCII diagrams

```text
  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
 |                                                                                     |
 |                                                                                     |
 |                                                                                     |
 |                                                Target (T)                           |
 |                                                /                                    |
 |                                               /                                     |
 |                                              /                                      |
 |                                             /                                       |
 |                                            /                                        |
 |                                           /                                         |
 |                                          /                                          |
 |                                         /                                           |
 |                                        /                                            |
 |                                       /                                             |
 |                                      /                                              |
 |                                     /                                               |
 |                                    /                                                |
 |                                   /                                                 |
 |                                  /                                                  |
 |                                 /                                                   |
 |                                /                                                    |
 |                               /                                                     |
 |         Missile (M) -------->-------------------------------------------------------|
 |                |      \                                                             |
 |                |       \                                                            |
 |                |        \                                                           |
 |                V         \                                                          |
 |               Gravity (g) \                                                         |
 |                            \                                                        |
 |                             \                                                       |
 |                              \                                                      |
 |                               Line-of-Sight (LOS) Vector R                          |
 |                                                                                     |
 |                                                                                     |
 |                                                                                     |
 |_____________________________________________________________________________________|

Figure 1: Basic Missile-Target Geometry with Gravity.
The missile (M) is pursuing the target (T). The vector R points from M to T.
Gravity (g) pulls the missile downwards. If uncompensated, the missile will undershoot.


      ^ Z
      |
      |
      |          _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
      |         /                                                \
      |        /                                                  \
      |       /                                                    \
      |      /        a_PN (perpendicular to LOS)                   \
      |     /                                                        \
      |    /                                                          \
      |   /                                                            \
      |  /                                                              \
      | /                                                                \
      |/                                                                  \
      M -------------------------------------------------------------------- T
      |\                                                                  /
      | \                                                                /
      |  \                                                              /
      |   \                                                            /
      |    \                                                          /
      |     \                                                        /
      |      \                                                      /
      |       \                                                    /
      |        \                                                  /
      |         \                                                /
      |          \_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
      |
      |
      |                     ^ a_GC = -g (upwards)
      |                     |
      |                     |
      |                     V g (downwards)
      |
      +--------------------------------------------------------------------> X

Figure 2: Components of Commanded Acceleration.
The missile M generates two main acceleration components:
1.  `a_PN`: The Proportional Navigation component, perpendicular to the LOS vector R,
    aiming to null the LOS rate. Its direction depends on the relative geometry.
2.  `a_GC`: The Gravity Compensation component, which is equal in magnitude and
    opposite in direction to the local gravity vector `g`. It always points upwards.
The total commanded acceleration is the vector sum: `a_M = a_PN + a_GC`.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Imagine a missile flying like a superhero. Its main mission is to catch the villain (target) by always pointing its "gaze" directly at them (PN). But there's a giant invisible hand (gravity) constantly trying to pull the superhero down. To stay on target, the superhero has to constantly flex its muscles and push *up* against that hand.
    **"PN is for Pursuing Normally, but APN-GC means Always Pushing UP against Gravity's Call."**

2.  **Formulas/Facts to Overlearn:**
    *   **The total commanded acceleration is the sum of PN and gravity compensation:**
        $$ \vec{a}_M = \vec{a}_{PN} - \vec{g} $$
    *   **The vector form of the PN command:**
        $$ \vec{a}_{PN} = N \left( \frac{\vec{R} \times \vec{V}}{|\vec{R}|^2} \right) \times \vec{V} $$
    *   **Gravity compensation is simply the negative of the gravity vector:**
        $$ \vec{a}_{GC} = -\vec{g} $$
    *   **Key Insight:** Gravity compensation is a *feedforward* term. It's applied proactively based on a known disturbance ($\vec{g}$), rather than reactively based on an error signal (like PN's response to LOS rate).

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** In 1 day (tomorrow). Re-derive the core equation and explain each term.
    *   **Review 2:** In 3 days. Work through Example 3 again without looking at the solution.
    *   **Review 3:** In 7 days. Explain the difference between basic PN and APN with gravity compensation to an imaginary peer.
    *   **Review 4:** In 16 days. Consider a scenario where gravity varies with altitude and explain how the compensation term would change.
    *   **Review 5:** In 35 days. Re-derive the full vector equation from first principles of relative motion and force balance.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the exact formula, you can always rebuild it:
    *   **Start with Newton's Second Law:** The actual acceleration of the missile is due to the forces it generates ($\vec{F}_M$) and external forces ($\vec{F}_{ext}$). So, $m\vec{a}_{M, \text{actual}} = \vec{F}_M + \vec{F}_{ext}$.
    *   **Identify external forces:** The primary external force is gravity, $\vec{F}_g = m\vec{g}$. So, $m\vec{a}_{M, \text{actual}} = \vec{F}_M + m\vec{g}$.
    *   **Relate missile force to commanded acceleration:** The missile's control system generates forces to achieve a *commanded* acceleration, $\vec{a}_{M, \text{commanded}}$. So, $\vec{F}_M = m\vec{a}_{M, \text{commanded}}$.
    *   **Substitute:** $m\vec{a}_{M, \text{actual}} = m\vec{a}_{M, \text{commanded}} + m\vec{g}$. Divide by $m$: $\vec{a}_{M, \text{actual}} = \vec{a}_{M, \text{commanded}} + \vec{g}$.
    *   **Desired actual acceleration:** For effective guidance, the *actual* acceleration of the missile (what PN wants it to do) should be $\vec{a}_{PN}$. So, we want $\vec{a}_{M, \text{actual}} = \vec{a}_{PN}$.
    *   **Solve for commanded acceleration:** Substitute this into the equation: $\vec{a}_{PN} = \vec{a}_{M, \text{commanded}} + \vec{g}$.
    *   **Rearrange:** $\vec{a}_{M, \text{commanded}} = \vec{a}_{PN} - \vec{g}$.
    This shows that the missile must command an acceleration that is the PN term *minus* the gravity vector to achieve the desired PN acceleration in the presence of gravity.

## 10. Connections — what this leads to

Understanding Augmented Proportional Navigation with gravity compensation is a foundational step, unlocking many more advanced topics in GNC and aerospace engineering:

*   **Advanced APN Laws (Target Acceleration Compensation):** Just as gravity compensation accounts for a known disturbance (gravity), other APN laws account for target maneuvers by estimating target acceleration and adding a corresponding term to the guidance command. This leads to more sophisticated intercept strategies against agile targets.
*   **Optimal Guidance Laws:** APN with gravity compensation is a heuristic approach. Optimal guidance laws (e.g., those derived from optimal control theory, such as Linear Quadratic Regulator (LQR) or state-dependent Riccati equation (SDRE) guidance) mathematically determine the best possible control strategy to minimize a cost function (e.g., fuel consumption, time to intercept) while accounting for all forces and constraints, including gravity.
*   **Robust Control:** Real-world systems have uncertainties (e.g., imprecise knowledge of missile mass, atmospheric drag, target acceleration, or even the exact local gravity). Robust control techniques are designed to ensure guidance performance remains acceptable despite these uncertainties. Gravity compensation makes the baseline guidance more robust by removing a major known disturbance.
*   **Multi-Stage Missile Guidance:** Long-range missiles often have multiple propulsion stages. The guidance law, including gravity compensation, must adapt as the missile sheds stages, changes mass, and operates in different atmospheric or exo-atmospheric regimes.
*   **Spacecraft Trajectory Optimization:** For missions involving orbital transfers, rendezvous, or planetary landings, precise calculation and compensation for gravitational forces (from multiple celestial bodies) are paramount. This extends the concept of gravity compensation to complex n-body problems.
*   **Navigation Filters (Kalman Filters):** To implement APN, accurate estimates of missile and target position, velocity, and sometimes acceleration are needed. Navigation filters, like the Kalman filter, process noisy sensor data to provide these state estimates, which are then fed into the guidance law.
*   **Control System Design:** The commanded acceleration from the guidance law must be translated into actual control surface deflections or thrust vectoring. This involves designing inner-loop control systems that ensure the missile accurately follows the guidance commands despite its own dynamics and external disturbances.

## 11. Self-check questions

1.  Explain in your own words why basic Proportional Navigation is insufficient when gravity is present, and how gravity compensation addresses this deficiency.
2.  A missile is flying straight up. If its guidance system only used basic PN, how would its actual trajectory differ from its intended path? What would the gravity compensation term look like in this specific scenario?
3.  Derive the vector form of the PN commanded acceleration, $\vec{a}_{PN} = N \vec{\omega}_{LOS} \times \vec{V}$, starting from the definition that $\vec{a}_{PN}$ is perpendicular to $\vec{R}$ and proportional to $N V_c \dot{\lambda}$.
4.  Consider a missile operating in a vacuum near Earth, so air resistance is negligible, but gravity is present. The missile