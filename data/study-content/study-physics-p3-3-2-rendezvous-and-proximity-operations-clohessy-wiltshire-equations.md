## 1. What it is — in plain English

Imagine you're driving a car on a perfectly circular race track, and your friend is driving another car *very close* to you on the same track. You want to describe how your friend's car moves *relative* to yours – sometimes a little ahead, sometimes a little behind, sometimes a little to the side.

The Clohessy-Wiltshire (CW) equations do exactly this, but for spacecraft in orbit around Earth (or any celestial body). They are a set of mathematical formulas that describe the motion of one spacecraft (the "chaser") relative to another spacecraft (the "target"), assuming the target is in a perfectly circular orbit and the chaser is always very, very close to it.

Think of it like this: if you're sitting on the target spacecraft, looking out, the CW equations tell you exactly where the chaser spacecraft will appear to be, and how it will move, based on its initial position and velocity relative to you. It's a simplified model, but incredibly useful for planning how to bring two spacecraft together, like docking with the International Space Station.

These equations help us understand the subtle pushes and pulls of gravity and orbital mechanics that dictate how one object "drifts" around another in space, allowing us to predict and control these delicate dance moves.

## 2. Why it matters — real-world applications

The Clohessy-Wiltshire equations are fundamental to many critical space operations, especially those involving multiple spacecraft interacting closely.

1.  **International Space Station (ISS) Docking and Rendezvous:** When a cargo ship (like SpaceX Dragon or Northrop Grumman Cygnus) or a crew capsule (like Soyuz or Crew Dragon) approaches the ISS, its final approach trajectory is meticulously planned and executed using principles derived from the CW equations. They allow mission controllers to predict the relative path and velocity needed for a safe, controlled docking, ensuring the chaser spacecraft doesn't collide with or drift away from the station.
2.  **Satellite Servicing and Refueling:** Companies like Northrop Grumman with their Mission Extension Vehicle (MEV) or future on-orbit servicing missions rely on precise proximity operations. The MEV docks with geostationary satellites that are running low on fuel to provide propulsion services, extending their operational life. CW equations are crucial for planning the approach, capture, and eventual docking with a non-cooperative (or semi-cooperative) client satellite, ensuring no damage occurs during these delicate maneuvers.
3.  **Space Debris Removal and Active Debris Remediation:** As space debris becomes a growing threat, future missions aim to actively de-orbit or capture defunct satellites and rocket stages. These "chaser" spacecraft will need to approach and grapple debris objects, which might be tumbling or unpowered. CW equations provide the foundational understanding for designing guidance algorithms to safely intercept and interact with these objects, minimizing the risk of creating more debris.
4.  **Satellite Formation Flying and Constellations:** Large constellations of satellites, such as Starlink or future distributed aperture telescopes, require precise relative positioning to achieve their mission objectives. CW equations help engineers design the initial deployment strategies and subsequent station-keeping maneuvers to maintain desired relative geometries among multiple spacecraft. For example, a synthetic aperture radar system might use two or more satellites flying in a precise formation to achieve higher resolution imagery, and CW equations are used to maintain that formation.

## 3. Prerequisites — what you must know first

To truly grasp the Clohessy-Wiltshire equations, you should be comfortable with the following concepts:

*   **Newton's Law of Universal Gravitation:** Understanding how gravitational force depends on mass and distance ($F = G\frac{m_1 m_2}{r^2}$).
*   **Newton's Second Law of Motion:** The relationship between force, mass, and acceleration ($\vec{F} = m\vec{a}$).
*   **Kepler's Laws of Planetary Motion:** Especially the concept of orbital period and how it relates to orbital radius (for circular orbits, $T = 2\pi\sqrt{\frac{a^3}{\mu}}$).
*   **Orbital Elements:** Basic understanding of what defines an orbit (e.g., semi-major axis, eccentricity, inclination), particularly for circular orbits.
*   **Circular Orbit Velocity and Angular Velocity:** How to calculate the speed and angular speed of an object in a circular orbit ($v = \sqrt{\frac{\mu}{R}}$, $\omega = \frac{v}{R} = \sqrt{\frac{\mu}{R^3}}$).
*   **Reference Frames (Inertial vs. Rotating):** The difference between a non-accelerating (inertial) frame and an accelerating (rotating) frame, and how to transform between them, especially understanding fictitious forces like Coriolis and centrifugal force.
*   **Vector Calculus:** Basic operations like dot products, cross products, and time derivatives of vectors.
*   **Differential Equations:** Familiarity with solving second-order linear ordinary differential equations, particularly those with constant coefficients.
*   **Taylor Series Expansion:** How to approximate a function with a polynomial, especially for small deviations from a known point (e.g., $f(x) \approx f(a) + f'(a)(x-a)$). This is crucial for linearization.
*   **Relative Motion Kinematics:** How to describe the position, velocity, and acceleration of one object with respect to another.

## 4. The core idea — step by step

The Clohessy-Wiltshire equations are derived by taking Newton's laws of motion, applying them to two spacecraft in orbit, and then making some clever simplifications. Let's break down the process.

### Step 1: The Problem Setup - Two Satellites in Orbit

*   **Plain English:** We're interested in how a "chaser" spacecraft moves *relative* to a "target" spacecraft. Imagine the target is a big, important satellite like the ISS, and the chaser is a smaller supply vehicle. We want to know where the supply vehicle is from the perspective of someone on the ISS.
*   **Small concrete example:** The ISS is at an altitude of about 400 km. A Dragon capsule is approaching it, initially 1 km away. We want to predict its path relative to the ISS.
*   **Formal/Mathematical version:**
    We define the position of the target spacecraft as $\vec{r}_T$ and the chaser spacecraft as $\vec{r}_C$. Both are vectors from the center of the Earth. The relative position vector, which is what we care about, is $\vec{\rho} = \vec{r}_C - \vec{r}_T$.
    According to Newton's Second Law and Universal Gravitation, the equations of motion for each spacecraft in an inertial frame are:
    $$ \ddot{\vec{r}}_T = -\frac{\mu}{r_T^3}\vec{r}_T $$
    $$ \ddot{\vec{r}}_C = -\frac{\mu}{r_C^3}\vec{r}_C $$
    where $\mu = GM_{Earth}$ is the gravitational parameter of Earth, and $r_T = |\vec{r}_T|$, $r_C = |\vec{r}_C|$.
*   **What could go wrong:** If we tried to solve these two coupled, non-linear equations directly for $\vec{\rho}$, it would be extremely difficult. We need a simpler approach.

### Step 2: Choosing a Reference Frame - The Local Vertical, Local Horizontal (LVLH) Frame

*   **Plain English:** Instead of watching the spacecraft from a fixed point in space (like the center of the Earth), it's much easier to describe their relative motion if we "sit" on the target spacecraft and observe the chaser from there. But this frame of reference isn't fixed; it's constantly rotating with the target spacecraft.
*   **Small concrete example:** Imagine you're on a Ferris wheel. Your "up" direction is always away from the center of the wheel, and your "forward" direction is along the path of the wheel. The ground (an inertial frame) is moving relative to you.
*   **Formal/Mathematical version:**
    We define a rotating coordinate system, called the Local Vertical, Local Horizontal (LVLH) frame, centered on the target spacecraft. Its axes are:
    *   **x-axis (radial):** Points from the center of the Earth *through* the target spacecraft, outwards.
    *   **y-axis (along-track):** Points in the direction of the target spacecraft's velocity (in the orbital plane, tangent to the orbit).
    *   **z-axis (out-of-plane):** Completes the right-handed system, perpendicular to the orbital plane.
    The angular velocity of this frame is $\vec{\omega}$, which for a circular orbit is simply $\omega = \sqrt{\frac{\mu}{r_T^3}}$ in the negative z-direction (if the orbit is in the x-y plane).
    The relationship between acceleration in an inertial frame ($\ddot{\vec{r}}_{inertial}$) and acceleration in a rotating frame ($\ddot{\vec{\rho}}_{rel}$) is given by:
    $$ \ddot{\vec{r}}_{inertial} = \ddot{\vec{\rho}}_{rel} + 2\vec{\omega} \times \dot{\vec{\rho}}_{rel} + \vec{\omega} \times (\vec{\omega} \times \vec{\rho}_{rel}) + \dot{\vec{\omega}} \times \vec{\rho}_{rel} $$
    Here, $\vec{\rho}_{rel}$ is the relative position vector in the rotating frame. For a target in a circular orbit, $\dot{\vec{\omega}} = 0$ (angular velocity is constant).
*   **What could go wrong:** Forgetting the "fictitious forces" (Coriolis $2\vec{\omega} \times \dot{\vec{\rho}}_{rel}$ and centrifugal $\vec{\omega} \times (\vec{\omega} \times \vec{\rho}_{rel})$) that arise when transforming to a rotating frame. These terms are crucial for correctly describing motion in the LVLH frame.

### Step 3: Equations of Motion in the LVLH Frame (Newton's Second Law + Coriolis/Centrifugal)

*   **Plain English:** Now we combine the actual gravitational force with the fictitious forces from our rotating viewpoint. The net force on the chaser, as observed from the target, will determine its relative acceleration.
*   **Small concrete example:** If you try to walk straight across a spinning merry-go-round, you'll feel a sideways push (Coriolis effect). Similarly, objects in orbit feel these "pushes" when viewed from a rotating frame.
*   **Formal/Mathematical version:**
    The acceleration of the chaser in the inertial frame is $\ddot{\vec{r}}_C = -\frac{\mu}{r_C^3}\vec{r}_C$.
    The acceleration of the target in the inertial frame is $\ddot{\vec{r}}_T = -\frac{\mu}{r_T^3}\vec{r}_T$.
    The relative acceleration in the inertial frame is $\ddot{\vec{\rho}}_{inertial} = \ddot{\vec{r}}_C - \ddot{\vec{r}}_T$.
    Using the transformation from Step 2, we can write:
    $$ \ddot{\vec{\rho}}_{rel} + 2\vec{\omega} \times \dot{\vec{\rho}}_{rel} + \vec{\omega} \times (\vec{\omega} \times \vec{\rho}_{rel}) = -\frac{\mu}{r_C^3}\vec{r}_C + \frac{\mu}{r_T^3}\vec{r}_T $$
    This equation is still complex because $r_C$ depends on $\vec{\rho}_{rel}$ and $\vec{r}_T$.
*   **What could go wrong:** The right-hand side, the difference in gravitational accelerations, is still non-linear and difficult to work with directly. We need to simplify it.

### Step 4: Linearization and Assumptions

*   **Plain English:** The exact equations are too hard to solve. We make two key simplifications:
    1.  The target spacecraft is in a *perfectly circular* orbit. This means its radius $R$ and angular velocity $\omega$ are constant.
    2.  The chaser spacecraft is *very, very close* to the target. This means the relative position vector $\vec{\rho}$ is much smaller than the target's orbital radius $R$. This allows us to use a Taylor series approximation for the gravitational force.
*   **Small concrete example:** If you're standing on Earth, a tiny ant crawling on your shoe is "very close" to you. Its movement relative to you is much simpler to describe than its movement relative to the center of the Earth.
*   **Formal/Mathematical version:**
    We express $r_C$ in terms of $r_T$ and $\vec{\rho}$. Since $\vec{r}_C = \vec{r}_T + \vec{\rho}$, we have $r_C = |\vec{r}_T + \vec{\rho}|$.
    For small $\vec{\rho}$ relative to $R = |\vec{r}_T|$, we can use a Taylor expansion for the gravitational term $\frac{1}{r_C^3}\vec{r}_C$.
    Let $\vec{\rho} = (x, y, z)^T$. Then $r_C^2 = (R+x)^2 + y^2 + z^2$.
    The gravitational acceleration can be approximated as:
    $$ -\frac{\mu}{r_C^3}\vec{r}_C \approx -\frac{\mu}{R^3}\vec{r}_T - \frac{\mu}{R^3} \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} \vec{\rho} + \frac{3\mu}{R^5}(\vec{r}_T \cdot \vec{\rho})\vec{r}_T $$
    In the LVLH frame, $\vec{r}_T = (R, 0, 0)^T$ (by definition of the x-axis). So $\vec{r}_T \cdot \vec{\rho} = R x$.
    Substituting this into the previous equation and simplifying, the right-hand side of the relative motion equation becomes:
    $$ -\frac{\mu}{r_C^3}\vec{r}_C + \frac{\mu}{r_T^3}\vec{r}_T \approx -\frac{\mu}{R^3}\begin{pmatrix} -2x \\ y \\ z \end{pmatrix} $$
    Since $\omega^2 = \frac{\mu}{R^3}$ for a circular orbit, this simplifies to:
    $$ \approx \omega^2 \begin{pmatrix} 2x \\ -y \\ -z \end{pmatrix} $$
*   **What could go wrong:** Applying this linearization when $\vec{\rho}$ is not small compared to $R$. The CW equations are only valid for proximity operations, not for large transfers.

### Step 5: Deriving the Clohessy-Wiltshire Equations

*   **Plain English:** Now we put all the pieces together: the relative acceleration in the rotating frame, the Coriolis and centrifugal terms, and the linearized gravitational difference. This gives us the final set of three coupled linear differential equations.
*   **Small concrete example:** Imagine three separate equations, one for how the chaser moves radially (x), one for how it moves along the orbit (y), and one for how it moves perpendicular to the orbit (z). These equations tell us how its relative position and velocity change over time.
*   **Formal/Mathematical version:**
    Let $\vec{\rho} = (x, y, z)^T$ and $\dot{\vec{\rho}} = (\dot{x}, \dot{y}, \dot{z})^T$.
    The angular velocity vector is $\vec{\omega} = (0, 0, \omega)^T$ (assuming the target orbit is in the x-y plane).
    Let's calculate the terms from Step 2:
    $\vec{\omega} \times \dot{\vec{\rho}}_{rel} = (0, 0, \omega)^T \times (\dot{x}, \dot{y}, \dot{z})^T = (-\omega\dot{y}, \omega\dot{x}, 0)^T$
    $\vec{\omega} \times (\vec{\omega} \times \vec{\rho}_{rel}) = (0, 0, \omega)^T \times (-\omega y, \omega x, 0)^T = (-\omega^2 x, -\omega^2 y, 0)^T$
    Substituting these into the relative motion equation from Step 3 and equating to the linearized gravity term from Step 4:
    $$ \begin{pmatrix} \ddot{x} \\ \ddot{y} \\ \ddot{z} \end{pmatrix} + 2 \begin{pmatrix} -\omega\dot{y} \\ \omega\dot{x} \\ 0 \end{pmatrix} + \begin{pmatrix} -\omega^2 x \\ -\omega^2 y \\ 0 \end{pmatrix} = \omega^2 \begin{pmatrix} 2x \\ -y \\ -z \end{pmatrix} $$
    Rearranging the terms, we get the Clohessy-Wiltshire (or Hill-Clohessy-Wiltshire, HCW) equations:
    $$ \ddot{x} - 2\omega\dot{y} - \omega^2 x = 2\omega^2 x \implies \ddot{x} - 3\omega^2 x - 2\omega\dot{y} = 0 $$
    $$ \ddot{y} + 2\omega\dot{x} - \omega^2 y = -\omega^2 y \implies \ddot{y} + 2\omega\dot{x} = 0 $$
    $$ \ddot{z} = -\omega^2 z \implies \ddot{z} + \omega^2 z = 0 $$
*   **What could go wrong:** Algebraic errors are common here, especially with the signs of the Coriolis and centrifugal terms. It's crucial to be meticulous.

### Step 6: Solving the Clohessy-Wiltshire Equations

*   **Plain English:** We now have a set of linear differential equations. We can solve these to find explicit formulas for $x(t)$, $y(t)$, and $z(t)$ that tell us the chaser's relative position at any time $t$, given its initial relative position and velocity.
*   **Small concrete example:** If you know where the chaser is and how fast it's moving *right now* relative to the target, these solutions will tell you where it will be 5 minutes from now.
*   **Formal/Mathematical version:**
    The $z$ equation is a simple harmonic oscillator: $\ddot{z} + \omega^2 z = 0$.
    Its general solution is:
    $$ z(t) = A \cos(\omega t) + B \sin(\omega t) $$
    Using initial conditions $z(0) = z_0$ and $\dot{z}(0) = \dot{z}_0$:
    $$ z(t) = z_0 \cos(\omega t) + \frac{\dot{z}_0}{\omega} \sin(\omega t) $$
    The $x$ and $y$ equations are coupled. We can solve them by integrating the second equation for $\dot{y}$ and substituting into the first, or by using characteristic equations. The general solutions are:
    $$ x(t) = C_1 \cos(\omega t) + C_2 \sin(\omega t) + C_3 $$
    $$ y(t) = 2 C_2 \cos(\omega t) - 2 C_1 \sin(\omega t) - 3 C_3 \omega t + C_4 $$
    Applying initial conditions $x(0)=x_0$, $y(0)=y_0$, $\dot{x}(0)=\dot{x}_0$, $\dot{y}(0)=\dot{y}_0$:
    $$ x(t) = (4x_0 + \frac{2}{\omega}\dot{y}_0) - (3x_0 + \frac{2}{\omega}\dot{y}_0)\cos(\omega t) + \frac{\dot{x}_0}{\omega}\sin(\omega t) $$
    $$ y(t) = (6x_0 + \frac{4}{\omega}\dot{y}_0)\sin(\omega t) - (6\omega x_0 + 3\dot{y}_0)t + y_0 - \frac{2}{\omega}\dot{x}_0\cos(\omega t) + \frac{2}{\omega}\dot{x}_0 $$
    Note: Some textbooks present $y(t)$ slightly differently by combining constants, but the form above explicitly shows the dependence on initial conditions. The secular term $-3\omega x_0 t$ (or related terms involving $\dot{y}_0$) is particularly important as it represents a continuous drift in the along-track direction.
*   **What could go wrong:** Incorrectly applying initial conditions or making algebraic errors when solving the differential equations. The $y(t)$ solution is particularly prone to errors due to its complexity and the presence of the secular term.

## 5. Worked examples — multiple, with every step shown

We'll use Earth's gravitational parameter $\mu = 3.986 \times 10^{14} \text{ m}^3/\text{s}^2$ for all examples.

### Example 1: Simple Out-of-Plane Motion

**Problem:** A target spacecraft is in a circular orbit at an altitude of 400 km. A chaser spacecraft is initially at $x_0=0, y_0=0$, but $z_0 = 10 \text{ m}$ (10 meters out of the orbital plane) with an initial out-of-plane velocity $\dot{z}_0 = 0.5 \text{ m/s}$. Describe the chaser's out-of-plane motion $z(t)$ for the next 10 minutes.

**Given:**
*   Target altitude $h = 400 \text{ km} = 400,000 \text{ m}$
*   Earth radius $R_E = 6378 \text{ km} = 6,378,000 \text{ m}$
*   Initial relative position: $x_0=0, y_0=0, z_0 = 10 \text{ m}$
*   Initial relative velocity: $\dot{x}_0=0, \dot{y}_0=0, \dot{z}_0 = 0.5 \text{ m/s}$
*   Time $t = 10 \text{ min} = 600 \text{ s}$

**What we want:** The out-of-plane position $z(t)$ at $t=600 \text{ s}$.

**Step-by-step solution:**

1.  **Calculate the target's orbital radius $R$:**
    $$ R = R_E + h $$
    $$ R = 6,378,000 \text{ m} + 400,000 \text{ m} $$
    $$ R = 6,778,000 \text{ m} $$
    *Explanation:* The orbital radius is the sum of the Earth's radius and the altitude of the orbit.

2.  **Calculate the target's orbital angular velocity $\omega$:**
    $$ \omega = \sqrt{\frac{\mu}{R^3}} $$
    $$ \omega = \sqrt{\frac{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}{(6.778 \times 10^6 \text{ m})^3}} $$
    $$ \omega = \sqrt{\frac{3.986 \times 10^{14}}{3.118 \times 10^{20}}} $$
    $$ \omega = \sqrt{1.278 \times 10^{-6}} $$
    $$ \omega \approx 0.001130 \text{ rad/s} $$
    *Explanation:* This is the angular speed of the target spacecraft around the Earth, which is also the rotation rate of our LVLH frame.

3.  **Use the $z(t)$ Clohessy-Wiltshire solution:**
    The out-of-plane motion is described by:
    $$ z(t) = z_0 \cos(\omega t) + \frac{\dot{z}_0}{\omega} \sin(\omega t) $$
    *Explanation:* This is the specific form of the simple harmonic oscillator solution tailored to the CW equations for the z-axis.

4.  **Substitute the given values and calculate $z(t)$:**
    $$ z(600) = (10 \text{ m}) \cos(0.001130 \text{ rad/s} \times 600 \text{ s}) + \frac{0.5 \text{ m/s}}{0.001130 \text{ rad/s}} \sin(0.001130 \text{ rad/s} \times 600 \text{ s}) $$
    $$ z(600) = 10 \cos(0.678) + \frac{0.5}{0.001130} \sin(0.678) $$
    $$ z(600) = 10 \cos(0.678 \text{ rad}) + 442.478 \sin(0.678 \text{ rad}) $$
    Make sure your calculator is in radians for trigonometric functions.
    $$ \cos(0.678 \text{ rad}) \approx 0.778 $$
    $$ \sin(0.678 \text{ rad}) \approx 0.628 $$
    $$ z(600) = 10 \times 0.778 + 442.478 \times 0.628 $$
    $$ z(600) = 7.78 + 277.89 $$
    $$ \boxed{z(600) \approx 285.67 \text{ m}} $$
    *Explanation:* We plug in the initial conditions, the calculated angular velocity, and the time, then evaluate the trigonometric functions to find the final relative position.

**Reflection:** This example was straightforward because the z-motion is decoupled from x and y, simplifying the calculation to a basic harmonic oscillator. It highlights that even small initial out-of-plane velocities can lead to significant out-of-plane excursions over time due to the oscillatory nature of the motion.

### Example 2: In-Plane Motion (V-bar approach)

**Problem:** A chaser spacecraft is performing a "V-bar" approach to a target in a circular orbit at 400 km altitude. This means it starts directly ahead of the target along the velocity vector (y-axis) and has zero relative velocity. Specifically, $x_0=0, y_0 = -100 \text{ m}$ (100m behind the target), $z_0=0$. Initial relative velocities are $\dot{x}_0=0, \dot{y}_0=0, \dot{z}_0=0$. What are its relative positions $x(t)$ and $y(t)$ after 10 minutes?

**Given:**
*   Target altitude $h = 400 \text{ km}$ (same as Example 1)
*   Initial relative position: $x_0=0, y_0 = -100 \text{ m}, z_0=0$
*   Initial relative velocity: $\dot{x}_0=0, \dot{y}_0=0, \dot{z}_0=0$
*   Time $t = 10 \text{ min} = 600 \text{ s}$

**What we want:** The in-plane positions $x(t)$ and $y(t)$ at $t=600 \text{ s}$.

**Step-by-step solution:**

1.  **Calculate the target's orbital radius $R$ and angular velocity $\omega$:**
    From Example 1:
    $$ R = 6,778,000 \text{ m} $$
    $$ \omega \approx 0.001130 \text{ rad/s} $$
    *Explanation:* These values are dependent only on the target's orbit, which is the same as in Example 1.

2.  **Use the $x(t)$ Clohessy-Wiltshire solution:**
    $$ x(t) = (4x_0 + \frac{2}{\omega}\dot{y}_0) - (3x_0 + \frac{2}{\omega}\dot{y}_0)\cos(\omega t) + \frac{\dot{x}_0}{\omega}\sin(\omega t) $$
    *Explanation:* This is the general solution for the radial component of relative motion.

3.  **Substitute initial conditions into $x(t)$:**
    Given $x_0=0, \dot{y}_0=0, \dot{x}_0=0$:
    $$ x(t) = (4(0) + \frac{2}{\omega}(0)) - (3(0) + \frac{2}{\omega}(0))\cos(\omega t) + \frac{0}{\omega}\sin(\omega t) $$
    $$ x(t) = 0 - 0 + 0 $$
    $$ x(t) = 0 $$
    *Explanation:* With zero initial radial position and zero initial radial and tangential velocities, and starting along the y-axis, the chaser remains at $x=0$. This is a specific characteristic of a pure V-bar approach with zero relative velocity.

4.  **Use the $y(t)$ Clohessy-Wiltshire solution:**
    $$ y(t) = (6x_0 + \frac{4}{\omega}\dot{y}_0)\sin(\omega t) - (6\omega x_0 + 3\dot{y}_0)t + y_0 - \frac{2}{\omega}\dot{x}_0\cos(\omega t) + \frac{2}{\omega}\dot{x}_0 $$
    *Explanation:* This is the general solution for the along-track component of relative motion.

5.  **Substitute initial conditions into $y(t)$:**
    Given $x_0=0, y_0 = -100 \text{ m}, \dot{x}_0=0, \dot{y}_0=0$:
    $$ y(t) = (6(0) + \frac{4}{\omega}(0))\sin(\omega t) - (6\omega (0) + 3(0))t + (-100) - \frac{2}{\omega}(0)\cos(\omega t) + \frac{2}{\omega}(0) $$
    $$ y(t) = 0 - 0 + (-100) - 0 + 0 $$
    $$ y(t) = -100 \text{ m} $$
    *Explanation:* With zero initial relative velocity, and starting directly behind the target, the chaser *should* maintain its relative position according to the CW equations. This shows that if there are no initial relative velocities, the relative position remains constant. This is a common simplification for V-bar approaches where the chaser is "held" at a point relative to the target.

6.  **Final Answer:**
    $$ \boxed{x(600) = 0 \text{ m}} $$
    $$ \boxed{y(600) = -100 \text{ m}} $$

**Reflection:** This example demonstrates a "hold point" in a V-bar approach. When initial relative velocities are zero, the CW equations predict that the relative position remains constant. This is a simplified scenario, as in reality, small perturbations or control inputs would be needed to truly maintain such a station.

### Example 3: Relative Circular Orbit Around the Target

**Problem:** A chaser spacecraft is to fly in a circular orbit of radius $r_{rel} = 50 \text{ m}$ around a target spacecraft. The target is in a 400 km circular orbit. The relative orbit should be in the target's orbital plane (x-y plane) and appear counter-clockwise when viewed from above (positive z-axis). At $t=0$, the chaser is at $x_0 = 50 \text{ m}, y_0 = 0, z_0 = 0$. What are the required initial relative velocities $\dot{x}_0, \dot{y}_0, \dot{z}_0$?

**Given:**
*   Target altitude $h = 400 \text{ km}$
*   Relative orbit radius $r_{rel} = 50 \text{ m}$
*   Initial relative position: $x_0=50 \text{ m}, y_0=0, z_0=0$
*   Desired motion: circular relative orbit, counter-clockwise, in x-y plane.

**What we want:** Initial relative velocities $\dot{x}_0, \dot{y}_0, \dot{z}_0$.

**Step-by-step solution:**

1.  **Calculate the target's orbital radius $R$ and angular velocity $\omega$:**
    From Example 1:
    $$ R = 6,778,000 \text{ m} $$
    $$ \omega \approx 0.001130 \text{ rad/s} $$
    *Explanation:* These fundamental values are derived from the target's orbit.

2.  **Analyze the $z$-motion:**
    Since the relative orbit is in the x-y plane, we require $z(t)=0$ and $\dot{z}(t)=0$ for all $t$.
    From the $z(t)$ solution: $z(t) = z_0 \cos(\omega t) + \frac{\dot{z}_0}{\omega} \sin(\omega t)$.
    For $z(t)=0$ for all $t$, we must have $z_0=0$ and $\dot{z}_0=0$.
    The problem statement gives $z_0=0$, which is consistent.
    Therefore, we need $\boxed{\dot{z}_0 = 0 \text{ m/s}}$.
    *Explanation:* The z-motion is simple harmonic. To remain at $z=0$, both initial position and velocity in z must be zero.

3.  **Analyze the $x(t)$ and $y(t)$ solutions for a circular path:**
    For a circular relative orbit of radius $r_{rel}$ centered on the target, the relative position should be:
    $$ x(t) = r_{rel} \cos(\Omega t + \phi_0) $$
    $$ y(t) = r_{rel} \sin(\Omega t + \phi_0) $$
    where $\Omega$ is the angular velocity of the relative orbit, and $\phi_0$ is the initial phase.
    At $t=0$, we are given $x_0 = r_{rel}$, $y_0 = 0$. This implies $\phi_0 = 0$.
    So, we want:
    $$ x(t) = r_{rel} \cos(\Omega t) $$
    $$ y(t) = r_{rel} \sin(\Omega t) $$
    The velocities are:
    $$ \dot{x}(t) = -r_{rel} \Omega \sin(\Omega t) $$
    $$ \dot{y}(t) = r_{rel} \Omega \cos(\Omega t) $$
    At $t=0$:
    $$ x_0 = r_{rel} $$
    $$ y_0 = 0 $$
    $$ \dot{x}_0 = 0 $$
    $$ \dot{y}_0 = r_{rel} \Omega $$
    *Explanation:* We define the desired relative trajectory and its corresponding velocities. For a circular motion, the initial velocity must be purely tangential.

4.  **Substitute these desired initial conditions into the general CW solutions for $x(t)$ and $y(t)$:**
    $$ x(t) = (4x_0 + \frac{2}{\omega}\dot{y}_0) - (3x_0 + \frac{2}{\omega}\dot{y}_0)\cos(\omega t) + \frac{\dot{x}_0}{\omega}\sin(\omega t) $$
    $$ x(t) = (4r_{rel} + \frac{2}{\omega}(r_{rel} \Omega)) - (3r_{rel} + \frac{2}{\omega}(r_{rel} \Omega))\cos(\omega t) + \frac{0}{\omega}\sin(\omega t) $$
    $$ x(t) = r_{rel} (4 + \frac{2\Omega}{\omega}) - r_{rel} (3 + \frac{2\Omega}{\omega})\cos(\omega t) $$
    We want $x(t) = r_{rel} \cos(\Omega t)$. This means the solution must be a simple cosine wave with angular frequency $\Omega$. The CW solution is a combination of a constant, a cosine wave at $\omega$, and a sine wave at $\omega$. For these to match, we need:
    *   The constant term to be zero: $r_{rel} (4 + \frac{2\Omega}{\omega}) = 0 \implies 4 + \frac{2\Omega}{\omega} = 0 \implies \Omega = -2\omega$.
    *   The coefficient of $\cos(\omega t)$ to be $r_{rel}$ (for $x(t) = r_{rel} \cos(\omega t)$).
        If $\Omega = -2\omega$, then $r_{rel} (3 + \frac{2(-2\omega)}{\omega}) = r_{rel} (3 - 4) = -r_{rel}$.
        So, $x(t) = 0 - (-r_{rel})\cos(\omega t) = r_{rel}\cos(\omega t)$.
        This implies that the relative orbit angular velocity $\Omega$ must be equal to the orbital angular velocity $\omega$, but with a negative sign (meaning it appears to rotate clockwise relative to the LVLH frame).
        However, we want a counter-clockwise relative orbit. This is a common point of confusion. The CW solutions describe the motion *in the rotating frame*. A "circular orbit" in the LVLH frame is not necessarily a simple circle.

    Let's re-evaluate. A relative circular orbit *around the target* (not just a periodic solution) is a specific type of solution. The general solutions are:
    $$ x(t) = C_1 \cos(\omega t) + C_2 \sin(\omega t) + C_3 $$
    $$ y(t) = -2C_1 \sin(\omega t) + 2C_2 \cos(\omega t) - 3C_3 \omega t + C_4 $$
    For a truly periodic relative orbit (like a circle or ellipse) without secular drift, the $C_3$ term must be zero.
    $C_3 = 4x_0 + \frac{2}{\omega}\dot{y}_0$. So, $4x_0 + \frac{2}{\omega}\dot{y}_0 = 0$.
    Given $x_0 = r_{rel}$, we have $4r_{rel} + \frac{2}{\omega}\dot{y}_0 = 0 \implies \dot{y}_0 = -2\omega r_{rel}$.

    Now let's find $\dot{x}_0$.
    From the general solutions, $C_1 = - (3x_0 + \frac{2}{\omega}\dot{y}_0)$ and $C_2 = \frac{\dot{x}_0}{\omega}$.
    Using $C_3=0$, we have $C_1 = - (3x_0 - 4x_0) = x_0$.
    So, $x(t) = x_0 \cos(\omega t) + \frac{\dot{x}_0}{\omega} \sin(\omega t)$.
    And $y(t) = -2x_0 \sin(\omega t) + 2\frac{\dot{x}_0}{\omega} \cos(\omega t) + C_4$.
    We also know $y_0 = 0$.
    $C_4 = y_0 - 2\frac{\dot{x}_0}{\omega} = 0 - 2\frac{\dot{x}_0}{\omega} = -2\frac{\dot{x}_0}{\omega}$.
    So, $y(t) = -2x_0 \sin(\omega t) + 2\frac{\dot{x}_0}{\omega} \cos(\omega t) - 2\frac{\dot{x}_0}{\omega}$.

    We want a circular path of radius $r_{rel}$ starting at $(r_{rel}, 0)$.
    So, $x(t) = r_{rel} \cos(\omega_{rel} t)$ and $y(t) = r_{rel} \sin(\omega_{rel} t)$.
    Comparing $x(t)$ with $x_0 \cos(\omega t) + \frac{\dot{x}_0}{\omega} \sin(\omega t)$:
    For $x(t) = r_{rel} \cos(\omega t)$, we need $x_0 = r_{rel}$ and $\dot{x}_0 = 0$.
    If $\dot{x}_0 = 0$, then $y(t) = -2x_0 \sin(\omega t)$.
    This means the motion would be $x(t) = r_{rel} \cos(\omega t)$ and $y(t) = -2r_{rel} \sin(\omega t)$. This is an ellipse, not a circle. The semi-major axis is $r_{rel}$ radially, and $2r_{rel}$ tangentially, with clockwise motion.

    For a true circular relative orbit *at the same angular velocity as the target* (i.e., $\Omega = \omega$ for the relative motion in the inertial frame, which translates to a specific periodic motion in the LVLH frame), we need a specific set of initial conditions.
    A common "naturally circular" relative orbit in the LVLH frame is one where $x(t) = r_{rel} \cos(\omega t)$ and $y(t) = -2r_{rel} \sin(\omega t)$. This is an ellipse with semi-major axis $2r_{rel}$ along-track and $r_{rel}$ radial. This is *not* a circular orbit around the target.

    Let's reconsider the requirement: "circular orbit of radius $r_{rel}$ around a target spacecraft... appear counter-clockwise."
    This means the relative position vector $(x(t), y(t))$ should trace a circle of radius $r_{rel}$ in the LVLH frame.
    So, $x(t) = r_{rel} \cos(\Omega_{rel} t)$ and $y(t) = r_{rel} \sin(\Omega_{rel} t)$ for some $\Omega_{rel}$.
    At $t=0$, $x_0 = r_{rel}, y_0 = 0$.
    Then $\dot{x}_0 = 0$ and $\dot{y}_0 = r_{rel} \Omega_{rel}$.

    Substitute into the CW solutions:
    $$ x(t) = (4r_{rel} + \frac{2}{\omega}r_{rel}\Omega_{rel}) - (3r_{rel} + \frac{2}{\omega}r_{rel}\Omega_{rel})\cos(\omega t) + 0 $$
    $$ y(t) = (6r_{rel} + \frac{4}{\omega}r_{rel}\Omega_{rel})\sin(\omega t) - (6\omega r_{rel} + 3r_{rel}\Omega_{rel})t + 0 - 0 + 0 $$
    For $x(t) = r_{rel} \cos(\Omega_{rel} t)$ and $y(t) = r_{rel} \sin(\Omega_{rel} t)$ to hold, we need the coefficients to match. This is only possible if $\Omega_{rel} = \omega$ or $\Omega_{rel} = -\omega$.
    And crucially, the secular term in $y(t)$ must be zero: $6\omega r_{rel} + 3r_{rel}\Omega_{rel} = 0$.
    This implies $3r_{rel}(2\omega + \Omega_{rel}) = 0$. Since $r_{rel} \ne 0$, we must have $\Omega_{rel} = -2\omega$.

    Now, let's plug $\Omega_{rel} = -2\omega$ into the expressions for $x(t)$ and $y(t)$:
    $$ x(t) = r_{rel} (4 + \frac{2(-2\omega)}{\omega}) - r_{rel} (3 + \frac{2(-2\omega)}{\omega})\cos(\omega t) $$
    $$ x(t) = r_{rel} (4 - 4) - r_{rel} (3 - 4)\cos(\omega t) $$
    $$ x(t) = 0 - r_{rel}(-1)\cos(\omega t) = r_{rel}\cos(\omega t) $$
    This matches $x(t) = r_{rel} \cos(\Omega_{rel} t)$ if $\Omega_{rel} = \omega$. But we just found $\Omega_{rel} = -2\omega$. This is a contradiction.

    This means a simple circular relative orbit *centered at the target* with constant radius $r_{rel}$ and constant angular velocity $\Omega_{rel}$ is *not* a natural solution to the CW equations. The natural solutions are ellipses (often called "flower petals") or lines in the LVLH frame.

    Let's re-interpret "circular orbit of radius $r_{rel}$ around a target spacecraft." This is usually interpreted as a periodic trajectory in the LVLH frame that *looks* circular. The specific periodic solutions of the CW equations are:
    $$ x(t) = A \cos(\omega t) + B \sin(\omega t) $$
    $$ y(t) = -2A \sin(\omega t) + 2B \cos(\omega t) + C $$
    For a closed, periodic orbit, we need the secular term to be zero, which implies $C_3 = 0$.
    So $4x_0 + \frac{2}{\omega}\dot{y}_0 = 0 \implies \dot{y}_0 = -2\omega x_0$.
    Also, $C_4 = y_0 - \frac{2}{\omega}\dot{x}_0$.
    The general solutions become:
    $$ x(t) = x_0 \cos(\omega t) + \frac{\dot{x}_0}{\omega} \sin(\omega t) $$
    $$ y(t) = -2x_0 \sin(\omega t) + (y_0 - \frac{2}{\omega}\dot{x}_0) + \frac{2}{\omega}\dot{x}_0 \cos(\omega t) $$
    This is not a simple circle. The standard "flower petal" solutions are typically ellipses. A specific case is a relative ellipse where the radial amplitude is $A$ and the along-track amplitude is $2A$.

    Let's assume the question implies a *periodic* relative orbit, and we want to find initial conditions that produce a relative path that *starts* at $(50,0,0)$ and *looks* circular for one period.
    The most common periodic relative orbits are "V-bar hops" (purely along-track ellipses) or "R-bar hops" (purely radial ellipses), or combinations.
    A purely circular relative orbit in the LVLH frame is not a natural solution of the CW equations.
    However, if we want the relative motion to be $x(t) = r_{rel} \cos(\omega t)$ and $y(t) = r_{rel} \sin(\omega t)$ for a limited time, this implies an active control.

    Let's assume the question meant a specific type of periodic orbit that is often *approximated* as circular for certain maneuvers. A common solution for a periodic relative orbit (sometimes called a "natural orbit") is such that $x(t) = A \cos(\omega t)$ and $y(t) = -2A \sin(\omega t)$. This is an ellipse with major axis $2A$ along-track and minor axis $A$ radial.
    If we want $x_0 = 50 \text{ m}$, then $A=50 \text{ m}$.
    So, $x(t) = 50 \cos(\omega t)$ and $y(t) = -100 \sin(\omega t)$.
    At $t=0$: $x_0 = 50 \text{ m}$, $y_0 = 0$.
    $\dot{x}(t) = -50\omega \sin(\omega t) \implies \dot{x}_0 = 0$.
    $\dot{y}(t) = -100\omega \cos(\omega t) \implies \dot{y}_0 = -100\omega$.

    Let's check if these initial conditions produce the desired $x(t)$ and $y(t)$ using the full CW solutions.
    Initial conditions: $x_0=50, y_0=0, \dot{x}_0=0, \dot{y}_0=-100\omega$.
    $\omega \approx 0.001130 \text{ rad/s}$.
    $\dot{y}_0 = -100 \times 0.001130 = -0.1130 \text{ m/s}$.

    Substitute into $x(t)$:
    $$ x(t) = (4x_0 + \frac{2}{\omega}\dot{y}_0) - (3x_0 + \frac{2}{\omega}\dot{y}_0)\cos(\omega t) + \frac{\dot{x}_0}{\omega}\sin(\omega t) $$
    $$ x(t) = (4(50) + \frac{2}{\omega}(-100\omega)) - (3(50) + \frac{2}{\omega}(-100\omega))\cos(\omega t) + 0 $$
    $$ x(t) = (200 - 200) - (150 - 200)\cos(\omega t) $$
    $$ x(t) = 0 - (-50)\cos(\omega t) = 50\cos(\omega t) $$
    This matches the desired $x(t)$.

    Substitute into $y(t)$:
    $$ y(t) = (6x_0 + \frac{4}{\omega}\dot{y}_0)\sin(\omega t) - (6\omega x_0 + 3\dot{y}_0)t + y_0 - \frac{2}{\omega}\dot{x}_0\cos(\omega t) + \frac{2}{\omega}\dot{x}_0 $$
    $$ y(t) = (6(50) + \frac{4}{\omega}(-100\omega))\sin(\omega t) - (6\omega (50) + 3(-100\omega))t + 0 - 0 + 0 $$
    $$ y(t) = (300 - 400)\sin(\omega t) - (300\omega - 300\omega)t $$
    $$ y(t) = -100\sin(\omega t) - 0t $$
    $$ y(t) = -100\sin(\omega t) $$
    This matches the desired $y(t)$.

    So, the "circular orbit" of radius $r_{rel}$ around the target, starting at $x_0=r_{rel}, y_0=0$ and appearing counter-clockwise, is actually an ellipse in the LVLH frame with radial amplitude $r_{rel}$ and along-track amplitude $2r_{rel}$, and it moves clockwise in the LVLH frame. The question's wording "appear counter-clockwise" is tricky and often refers to the inertial frame view, or a specific relative orbit. Here, the solution we found is a clockwise motion in LVLH. If it were counter-clockwise, the $y(t)$ would be positive $100\sin(\omega t)$. This would require $\dot{y}_0 = 100\omega$. Let's re-evaluate for counter-clockwise.

    If we want $x(t) = r_{rel} \cos(\omega t)$ and $y(t) = r_{rel} \sin(\omega t)$ (a true circle in the LVLH frame, rotating at $\omega$), this is *not* a natural solution.
    The "natural" periodic solutions of the CW equations are ellipses.
    The most common periodic relative orbit used for rendezvous is the V-bar approach or R-bar approach, which are effectively linear segments or ellipses.
    A true circular relative orbit in the LVLH frame requires continuous thrust.

    Let's assume the question implicitly refers to a "natural" periodic orbit that *appears* circular when projected in some way. The most common interpretation is the natural relative elliptical orbit derived from the CW equations.
    The most common periodic relative orbit is given by:
    $x(t) = A \cos(\omega t) + B \sin(\omega t)$
    $y(t) = -2A \sin(\omega t) + 2B \cos(\omega t) + C_4$
    For a closed orbit, the secular term must be zero, so $\dot{y}_0 = -2\omega x_0$.
    If we start at $x_0=r_{rel}$, $y_0=0$, then $\dot{y}_0 = -2\omega r_{rel}$.
    And we want $y_0=0$.
    If $\dot{x}_0=0$, then:
    $x(t) = x_0 \cos(\omega t)$
    $y(t) = -2x_0 \sin(\omega t) + y_0$
    This is an ellipse with $x$-amplitude $x_0$ and $y$-amplitude $2x_0$.
    Given $x_0 = 50 \text{ m}$, this would be $x(t) = 50 \cos(\omega t)$ and $y(t) = -100 \sin(\omega t)$.
    This starts at $(50,0)$ and traces a clockwise ellipse.

    If the question *insists* on a counter-clockwise circle of radius $r_{rel}$ starting at $(r_{rel},0)$, this means we are looking for a solution that is *not* a natural CW solution, but one that implies a specific set of initial conditions that would lead to this behavior *if* the CW equations were simpler.
    However, since this is a CW lesson, we must work within its framework.
    The "naturally occurring" periodic solutions in the LVLH frame are ellipses. A pure circle is not one of them.
    The closest to a circular path is the ellipse described above.

    Let's assume the problem meant to ask for the initial conditions for the natural periodic orbit (ellipse) that starts at $x_0=50 \text{ m}, y_0=0$ and has $\dot{x}_0=0$.
    Then from the derivations above:
    $$ \dot{z}_0 = 0 \text{ m/s} $$
    $$ \dot{x}_0 = 0 \text{ m/s} $$
    And for a closed periodic orbit, the secular term must be zero: $C_3 = 0 \implies 4x_0 + \frac{2}{\omega}\dot{y}_0 = 0$.
    $$ 4(50) + \frac{2}{\omega}\dot{y}_0 = 0 $$
    $$ 200 + \frac{2}{\omega}\dot{y}_0 = 0 $$
    $$ \frac{2}{\omega}\dot{y}_0 = -200 $$
    $$ \dot{y}_0 = -100\omega $$
    $$ \dot{y}_0 = -100 \times 0.001130 \text{ rad/s} $$
    $$ \dot{y}_0 \approx -0.1130 \text{ m/s} $$

    With these initial conditions, the relative path is $x(t) = 50 \cos(\omega t)$, $y(t) = -100 \sin(\omega t)$. This is an ellipse with axes $50 \text{ m}$ (radial) and $100 \text{ m}$ (along-track), traversed clockwise.

    **Final Answer (based on the most common interpretation of "periodic relative orbit" within CW):**
    $$ \boxed{\dot{x}_0 = 0 \text{ m/s}} $$
    $$ \boxed{\dot{y}_0 = -0.1130 \text{ m/s}} $$
    $$ \boxed{\dot{z}_0 = 0 \text{ m/s}} $$

**Reflection:** This example highlights a common misconception: a "circular orbit around the target" in the LVLH frame is generally *not* a natural solution to the CW equations. The natural periodic solutions are ellipses, which are often called "flower petal" orbits. The specific initial conditions determined here result in an ellipse with a 2:1 ratio of along-track to radial amplitude, traversed clockwise in the LVLH frame. If a true circle or counter-clockwise motion is desired, continuous thrust would be required, which is beyond the scope of the unforced CW equations.

### Example 4: Rendezvous Maneuver (Hard)

**Problem:** A chaser spacecraft is initially at $x_0 = 100 \text{ m}$, $y_0 = -500 \text{ m}$, $z_0 = 0$ relative to a target in a 400 km circular orbit. Its initial relative velocities are $\dot{x}_0 = 0, \dot{y}_0 = 0, \dot{z}_0 = 0$. We want to rendezvous with the target (i.e., reach $x(t_f)=0, y(t_f)=0, z(t_f)=0$ with $\dot{x}(t_f)=0, \dot{y}(t_f)=0, \dot{z}(t_f)=0$) in exactly half an orbit of the target spacecraft. Calculate the impulsive velocity changes ($\Delta v_x, \Delta v_y, \Delta v_z$) required at $t=0$ to achieve this rendezvous.

**Given:**
*   Target altitude $h = 400 \text{ km}$
*   Initial relative position: $x_0 = 100 \text{ m}, y_0 = -500 \text{ m}, z_0 = 0$
*   Initial relative velocity: $\dot{x}_0 = 0, \dot{y}_0 = 0, \dot{z}_0 = 0$ (before the burn)
*   Final relative