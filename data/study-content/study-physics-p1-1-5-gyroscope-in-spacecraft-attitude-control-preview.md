## 1. What it is — in plain English

Imagine a toy spinning top. When it's spinning really fast, it stands upright and seems very stable, even if you try to nudge it. It resists falling over. This resistance to changing its orientation is the core idea of a gyroscope.

A gyroscope, at its simplest, is just a heavy wheel or disk that's spinning very rapidly. Because of how physics works, once it's spinning, it develops a kind of "stubbornness" about its direction of spin. It wants to keep pointing the same way in space.

Now, think about a spacecraft, like a satellite orbiting Earth. It needs to point its cameras, antennas, or solar panels in very specific directions. This act of controlling its orientation in space is called "attitude control."

So, a gyroscope in spacecraft attitude control is essentially a very precisely engineered spinning wheel used inside a spacecraft. By cleverly changing the speed or angle of these internal spinning wheels, the spacecraft can subtly push itself to turn or reorient itself without firing noisy, fuel-consuming thrusters. It’s like using the "stubbornness" of the spinning wheel to maneuver the entire spacecraft.

## 2. Why it matters — real-world applications

The principles of gyroscopes are fundamental to controlling anything that moves in 3D space and needs to know or maintain its orientation.

1.  **Spacecraft Attitude Control:** This is the primary application we're discussing. Satellites like the **Hubble Space Telescope** use gyroscopes (specifically, reaction wheels and control moment gyroscopes) to precisely point at distant stars for observation. **Mars rovers** like Perseverance use them to maintain their orientation during complex maneuvers. **Starlink satellites** use them to point their antennas towards Earth and their solar panels towards the Sun. Without gyroscopes, these spacecraft would tumble uncontrollably or be unable to perform their missions.

2.  **Inertial Navigation Systems (INS):** Gyroscopes are the heart of INS, which allow vehicles to track their position and orientation without external signals (like GPS). **Submarines** rely on INS for navigation while submerged, as GPS signals cannot penetrate water. **Commercial aircraft** use INS as a primary navigation system, especially for long-haul flights. **Intercontinental ballistic missiles (ICBMs)** also use highly precise gyroscopes for guidance to their targets.

3.  **Consumer Electronics and Robotics:** Modern smartphones and drones wouldn't function as they do without miniature gyroscopes. Your **smartphone** uses a tiny MEMS (Micro-Electro-Mechanical System) gyroscope to detect its orientation, allowing the screen to rotate or enabling augmented reality applications. **Drones** use gyroscopes (often alongside accelerometers in an Inertial Measurement Unit, IMU) to maintain stable flight, resisting wind gusts and allowing for smooth control.

4.  **Stabilization Systems:** Gyroscopic principles are used in various stabilization applications. For instance, large **yachts** employ gyroscopic stabilizers to reduce roll motion in choppy seas, improving passenger comfort. High-end **camera gimbals** use gyroscopes to keep cameras steady, even during rapid movement, producing smooth video footage.

## 3. Prerequisites — what you must know first

Before diving deep into gyroscopes, ensure you have a solid grasp of these fundamental concepts from rotational mechanics and vector calculus. If any of these are unfamiliar, pause and review them thoroughly.

*   **Angular Velocity ($\vec{\omega}$):** A vector quantity that describes how fast an object is rotating and about which axis it is rotating. Its magnitude is the angular speed, and its direction is given by the right-hand rule along the axis of rotation.
*   **Angular Momentum ($\vec{L}$):** A vector quantity that measures an object's tendency to continue rotating. For a rigid body rotating about a fixed axis, it's the product of its moment of inertia and angular velocity ($\vec{L} = I\vec{\omega}$). Its direction is the same as $\vec{\omega}$.
*   **Torque ($\vec{\tau}$):** A vector quantity that is the rotational equivalent of force. It's what causes an object to change its rotational motion (i.e., change its angular momentum). It's calculated as the cross product of the position vector from the pivot to the point of force application and the force vector ($\vec{\tau} = \vec{r} \times \vec{F}$).
*   **Moment of Inertia ($I$):** A scalar quantity that represents an object's resistance to changes in its rotational motion. It depends on the object's mass and how that mass is distributed relative to the axis of rotation. (e.g., $I = mr^2$ for a point mass).
*   **Newton's Second Law for Rotation:** The rotational equivalent of $\vec{F} = m\vec{a}$, stating that the net external torque acting on an object is equal to the rate of change of its angular momentum: $\vec{\tau}_{\text{net}} = \frac{d\vec{L}}{dt}$.
*   **Vector Cross Product:** A binary operation on two vectors in 3D space that results in a third vector perpendicular to both original vectors. Its magnitude is $||\vec{A}|| \cdot ||\vec{B}|| \sin\theta$, and its direction is given by the right-hand rule. Essential for understanding the direction of torque and precession.
*   **Conservation of Angular Momentum:** In an isolated system (where the net external torque is zero), the total angular momentum remains constant, both in magnitude and direction. This principle is crucial for understanding how gyroscopes influence spacecraft motion.

## 4. The core idea — step by step

The core idea of how gyroscopes work, especially in attitude control, revolves around the conservation of angular momentum and the unique response of a spinning object to an applied torque.

### Step 1: The Spinning Wheel and Angular Momentum

*   **Plain English Statement:** A heavy wheel spinning quickly has a lot of "rotational inertia" or "stubbornness." The faster it spins and the heavier its mass is distributed far from its center, the more it wants to keep spinning exactly as it is. This "stubbornness" is quantified by its angular momentum.
*   **Concrete Example:** Imagine a bicycle wheel. If you hold its axle and try to spin it, it takes some effort. Once it's spinning fast, try to stop it with your hand – it resists. Now, imagine its axle points straight up. Its angular momentum vector points straight up too.
*   **Formal/Mathematical Version:** For a rigid body rotating about a fixed axis, its angular momentum $\vec{L}$ is given by:
    $$ \vec{L} = I \vec{\omega} $$
    where $I$ is the moment of inertia (a measure of how mass is distributed around the axis of rotation) and $\vec{\omega}$ is the angular velocity vector. The direction of $\vec{L}$ is along the axis of rotation, following the right-hand rule (if your fingers curl in the direction of spin, your thumb points in the direction of $\vec{\omega}$ and $\vec{L}$).
*   **What Could Go Wrong:** Not understanding that angular momentum is a *vector*. Its direction is just as important as its magnitude. A wheel spinning clockwise has angular momentum in the opposite direction to one spinning counter-clockwise, even if their speeds are the same.

### Step 2: Gyroscopic Rigidity

*   **Plain English Statement:** A fast-spinning object strongly resists any attempt to change the *direction* of its spin axis. It wants to maintain its orientation in space. This resistance is what makes gyroscopes useful for stability.
*   **Concrete Example:** Hold a rapidly spinning bicycle wheel by its axle. Try to tilt the axle. You'll feel a strong resistance. It's surprisingly hard to change its orientation compared to a non-spinning wheel.
*   **Formal/Mathematical Version:** This "rigidity" is a direct consequence of Newton's Second Law for Rotation, $\vec{\tau} = \frac{d\vec{L}}{dt}$. To change the direction of the angular momentum vector $\vec{L}$, a torque $\vec{\tau}$ must be applied. If $\vec{L}$ is large (due to high $I$ and $\omega$), a large torque is required to change its direction significantly in a short amount of time. The gyroscope resists the *change* in $\vec{L}$.
*   **What Could Go Wrong:** Confusing "rigidity" with absolute immobility. A gyroscope *can* be moved; it just takes a significant torque to do so, and its response to that torque is often counter-intuitive (see Step 3).

### Step 3: Precession — The Counter-Intuitive Response to Torque

*   **Plain English Statement:** This is the most counter-intuitive part. If you apply a torque to a spinning gyroscope, instead of tilting in the direction you pushed, its spin axis will move *perpendicular* to the direction of your push. It seems to "turn sideways."
*   **Concrete Example:** Imagine the spinning bicycle wheel again, with its axle horizontal. If you push down on one end of the axle (applying a torque that would normally make it tilt down), the wheel's axle doesn't tilt down. Instead, it swings horizontally, perpendicular to your push! This horizontal movement is precession. A spinning top that is slightly tilted will precess, its axis slowly rotating around the vertical.
*   **Formal/Mathematical Version:** According to $\vec{\tau} = \frac{d\vec{L}}{dt}$, the applied torque $\vec{\tau}$ causes a change in angular momentum $d\vec{L}$ that is in the *same direction* as $\vec{\tau}$. If $\vec{\tau}$ is perpendicular to the initial angular momentum vector $\vec{L}$, then $d\vec{L}$ is also perpendicular to $\vec{L}$. This means the magnitude of $\vec{L}$ doesn't change, but its direction does. This change in direction, where $\vec{L}$ (and thus the spin axis) sweeps out a cone, is called precession. The angular velocity of precession, $\vec{\Omega}_P$, is related by:
    $$ \vec{\tau} = \vec{\Omega}_P \times \vec{L} $$
    Or, for the magnitude of precession rate:
    $$ \Omega_P = \frac{\tau}{L} = \frac{\tau}{I\omega} $$
    The direction of $\vec{\Omega}_P$ is perpendicular to both $\vec{\tau}$ and $\vec{L}$. Using the right-hand rule for the cross product, if you point your fingers in the direction of $\vec{\Omega}_P$ and curl them towards $\vec{L}$, your thumb points in the direction of $\vec{\tau}$.
*   **What Could Go Wrong:** Expecting the gyroscope's axis to align with the applied torque. The key is that the torque causes a *change* in $\vec{L}$, not an alignment *with* $\vec{L}$.

### Step 4: Nutation (Brief Introduction)

*   **Plain English Statement:** Sometimes, on top of the smooth precessional motion, a gyroscope's axis might also wobble slightly up and down. This wobbling is called nutation. It's often seen in a spinning top just before it falls, or if it's started with an initial "jiggle."
*   **Concrete Example:** A child's spinning top that's slightly off-balance or given a slight push will not only precess but also exhibit a small, rapid oscillation of its axis up and down.
*   **Formal/Mathematical Version:** Nutation arises from oscillations of the gyroscope's axis about the precessional path. It occurs when the initial conditions are not perfectly aligned with steady precession, or when there are rapid changes in the applied torque. It's a more complex phenomenon involving the inertia tensor and Euler's equations of motion. For this preview, understanding it as a "wobble" superimposed on precession is sufficient.
*   **What Could Go Wrong:** Getting bogged down in the complex mathematics of nutation at this introductory stage. It's important to know it exists but not to master its derivation yet.

### Step 5: Applying Gyroscopic Principles to Spacecraft Attitude Control

*   **Plain English Statement:** Spacecraft use internal spinning wheels (called reaction wheels or control moment gyroscopes) to change their orientation. When a spacecraft wants to turn one way, it spins up or slows down one of these internal wheels in the opposite direction. Because of the conservation of angular momentum, the spacecraft itself will slowly turn.
*   **Concrete Example:** Imagine you're floating in space holding a bicycle wheel. If you spin the wheel clockwise, your body will slowly start to rotate counter-clockwise. This is because the total angular momentum of you + wheel must remain zero (if you started from rest). Similarly, if a spacecraft needs to turn its nose to the left, it spins a reaction wheel inside to the right. The wheel's angular momentum pointing right causes the spacecraft's angular momentum to point left.
*   **Formal/Mathematical Version:** The spacecraft and its internal gyroscopes form a closed system (ignoring external torques from solar radiation pressure, gravity gradients, etc., for simplicity). The total angular momentum of this system, $\vec{L}_{\text{total}}$, is conserved.
    $$ \vec{L}_{\text{total}} = \vec{L}_{\text{spacecraft}} + \sum \vec{L}_{\text{gyros}} = \text{constant} $$
    If a gyroscope's angular momentum $\vec{L}_{\text{gyro}}$ changes (either by changing its spin speed or by tilting its axis), then the spacecraft's angular momentum $\vec{L}_{\text{spacecraft}}$ must change by an equal and opposite amount to keep $\vec{L}_{\text{total}}$ constant.
    $$ \Delta \vec{L}_{\text{spacecraft}} = - \Delta \sum \vec{L}_{\text{gyros}} $$
    Since $\Delta \vec{L}_{\text{spacecraft}} = I_{\text{spacecraft}} \Delta \vec{\omega}_{\text{spacecraft}}$, the spacecraft's orientation changes. Reaction wheels primarily change their spin speed, while Control Moment Gyroscopes (CMGs) primarily tilt their spin axis.
*   **What Could Go Wrong:** Forgetting that this mechanism works on the principle of *internal* torques. The gyroscopes don't apply torque to the *outside world*; they apply torque *to the spacecraft structure*, and the spacecraft applies an equal and opposite torque *to the gyroscopes*. The net external torque on the *entire system* (spacecraft + gyros) is what dictates the conservation of total angular momentum.

## 5. Worked examples — multiple, with every step shown

### Example 1: Angular Momentum of a Reaction Wheel

**Problem Statement:** A reaction wheel in a small satellite has a moment of inertia of $I = 0.05 \text{ kg} \cdot \text{m}^2$. It is spun up to an angular speed of $3000 \text{ revolutions per minute (RPM)}$. Calculate the magnitude of its angular momentum.

**What's Given:**
*   Moment of inertia, $I = 0.05 \text{ kg} \cdot \text{m}^2$
*   Angular speed, $\omega_{\text{RPM}} = 3000 \text{ RPM}$

**What We Want:**
*   Magnitude of angular momentum, $L$

**Solution:**

1.  **Convert angular speed from RPM to radians per second ($\text{rad/s}$):**
    The formula for angular momentum requires angular velocity in $\text{rad/s}$.
    There are $2\pi$ radians in 1 revolution and 60 seconds in 1 minute.
    $$ \omega = 3000 \text{ rev/min} \times \frac{2\pi \text{ rad}}{1 \text{ rev}} \times \frac{1 \text{ min}}{60 \text{ s}} $$
    $$ \omega = \frac{3000 \times 2\pi}{60} \text{ rad/s} $$
    $$ \omega = 50 \times 2\pi \text{ rad/s} $$
    $$ \omega = 100\pi \text{ rad/s} $$
    This step converts the given angular speed into the standard SI units required for physics calculations.

2.  **Calculate the magnitude of angular momentum:**
    Use the formula for angular momentum: $L = I\omega$.
    $$ L = (0.05 \text{ kg} \cdot \text{m}^2) \times (100\pi \text{ rad/s}) $$
    $$ L = 5\pi \text{ kg} \cdot \text{m}^2\text{/s} $$
    $$ L \approx 5 \times 3.14159 \text{ kg} \cdot \text{m}^2\text{/s} $$
    $$ L \approx 15.708 \text{ kg} \cdot \text{m}^2\text{/s} $$
    Here, we directly apply the definition of angular momentum using the calculated angular velocity and the given moment of inertia.

**Final Answer:**
The magnitude of the reaction wheel's angular momentum is $\boxed{15.708 \text{ kg} \cdot \text{m}^2\text{/s}}$.

**Reflection:** This example was straightforward, mainly testing unit conversion and the basic definition of angular momentum. The trickiest part is often ensuring consistent units.

---

### Example 2: Precession Rate of a Simple Gyroscope

**Problem Statement:** A child's toy gyroscope has a spinning disk with a moment of inertia $I = 2 \times 10^{-4} \text{ kg} \cdot \text{m}^2$ and spins at an angular speed of $1500 \text{ RPM}$. It is supported at one end of its axle, which is $5 \text{ cm}$ long. The mass of the disk is $0.05 \text{ kg}$. Calculate the precession rate of the gyroscope due to gravity.

**What's Given:**
*   Moment of inertia, $I = 2 \times 10^{-4} \text{ kg} \cdot \text{m}^2$
*   Angular speed, $\omega_{\text{RPM}} = 1500 \text{ RPM}$
*   Axle length (distance from pivot to center of mass), $r = 5 \text{ cm} = 0.05 \text{ m}$
*   Mass of the disk, $m = 0.05 \text{ kg}$
*   Acceleration due to gravity, $g = 9.8 \text{ m/s}^2$

**What We Want:**
*   Precession rate, $\Omega_P$

**Solution:**

1.  **Convert angular speed from RPM to radians per second:**
    $$ \omega = 1500 \text{ rev/min} \times \frac{2\pi \text{ rad}}{1 \text{ rev}} \times \frac{1 \text{ min}}{60 \text{ s}} $$
    $$ \omega = \frac{1500 \times 2\pi}{60} \text{ rad/s} $$
    $$ \omega = 25 \times 2\pi \text{ rad/s} $$
    $$ \omega = 50\pi \text{ rad/s} $$
    This standardizes the angular speed for calculations.

2.  **Calculate the angular momentum of the spinning disk:**
    $$ L = I\omega $$
    $$ L = (2 \times 10^{-4} \text{ kg} \cdot \text{m}^2) \times (50\pi \text{ rad/s}) $$
    $$ L = 100\pi \times 10^{-4} \text{ kg} \cdot \text{m}^2\text{/s} $$
    $$ L = 0.01\pi \text{ kg} \cdot \text{m}^2\text{/s} $$
    $$ L \approx 0.031416 \text{ kg} \cdot \text{m}^2\text{/s} $$
    This calculates the "stubbornness" of the gyroscope that resists changes in its orientation.

3.  **Calculate the torque exerted by gravity:**
    The torque is caused by the weight of the disk acting at its center of mass, which is at the end of the axle, $r$ from the pivot. The force of gravity $mg$ acts downwards, perpendicular to the axle (assuming the axle is horizontal for maximal torque).
    $$ \tau = r \times F = r \times (mg) $$
    $$ \tau = (0.05 \text{ m}) \times (0.05 \text{ kg}) \times (9.8 \text{ m/s}^2) $$
    $$ \tau = 0.0025 \times 9.8 \text{ N} \cdot \text{m} $$
    $$ \tau = 0.0245 \text{ N} \cdot \text{m} $$
    This is the external torque trying to make the gyroscope fall.

4.  **Calculate the precession rate:**
    Use the formula $\Omega_P = \frac{\tau}{L}$.
    $$ \Omega_P = \frac{0.0245 \text{ N} \cdot \text{m}}{0.01\pi \text{ kg} \cdot \text{m}^2\text{/s}} $$
    $$ \Omega_P = \frac{0.0245}{0.031416} \text{ rad/s} $$
    $$ \Omega_P \approx 0.7798 \text{ rad/s} $$
    This step shows how the applied torque and the gyroscope's angular momentum determine how fast its axis will precess.

**Final Answer:**
The precession rate of the gyroscope is approximately $\boxed{0.780 \text{ rad/s}}$.

**Reflection:** This example demonstrates the classic gyroscope precession, where gravity provides the torque. The key is correctly identifying the torque and angular momentum, and remembering the formula for precession rate. Pay attention to units, especially for $r$ and $g$.

---

### Example 3: Spacecraft Rotation from a Reaction Wheel

**Problem Statement:** A spacecraft, initially at rest and isolated in space, has a moment of inertia $I_{\text{sc}} = 120 \text{ kg} \cdot \text{m}^2$ about its yaw axis. It uses a reaction wheel with a moment of inertia $I_{\text{rw}} = 0.08 \text{ kg} \cdot \text{m}^2$. To rotate the spacecraft by $10^\circ$ about the yaw axis, the reaction wheel is spun up from rest to an angular speed of $4000 \text{ RPM}$ relative to the spacecraft. What is the final angular speed of the spacecraft?

**What's Given:**
*   Spacecraft moment of inertia, $I_{\text{sc}} = 120 \text{ kg} \cdot \text{m}^2$
*   Reaction wheel moment of inertia, $I_{\text{rw}} = 0.08 \text{ kg} \cdot \text{m}^2$
*   Initial state: Spacecraft and reaction wheel are at rest.
*   Final reaction wheel speed (relative to spacecraft), $\omega_{\text{rw, rel}} = 4000 \text{ RPM}$

**What We Want:**
*   Final angular speed of the spacecraft, $\omega_{\text{sc}}$

**Solution:**

1.  **Convert the reaction wheel's relative angular speed to radians per second:**
    $$ \omega_{\text{rw, rel}} = 4000 \text{ rev/min} \times \frac{2\pi \text{ rad}}{1 \text{ rev}} \times \frac{1 \text{ min}}{60 \text{ s}} $$
    $$ \omega_{\text{rw, rel}} = \frac{4000 \times 2\pi}{60} \text{ rad/s} $$
    $$ \omega_{\text{rw, rel}} = \frac{400\pi}{3} \text{ rad/s} $$
    This provides the relative speed in standard units.

2.  **Apply the Conservation of Angular Momentum:**
    The system (spacecraft + reaction wheel) is isolated, so its total angular momentum is conserved. Since it starts from rest, the total initial angular momentum is zero.
    $$ \vec{L}_{\text{total, initial}} = \vec{0} $$
    $$ \vec{L}_{\text{total, final}} = \vec{L}_{\text{sc}} + \vec{L}_{\text{rw}} = \vec{0} $$
    Therefore, $\vec{L}_{\text{sc}} = - \vec{L}_{\text{rw}}$. The angular momentum of the spacecraft must be equal in magnitude and opposite in direction to the angular momentum of the reaction wheel.

3.  **Express the angular velocities:**
    Let $\omega_{\text{sc}}$ be the angular speed of the spacecraft relative to inertial space.
    Let $\omega_{\text{rw}}$ be the angular speed of the reaction wheel relative to inertial space.
    The problem gives the speed of the reaction wheel *relative to the spacecraft*: $\omega_{\text{rw, rel}} = \omega_{\text{rw}} - \omega_{\text{sc}}$.
    Therefore, $\omega_{\text{rw}} = \omega_{\text{rw, rel}} + \omega_{\text{sc}}$. (Assuming both spacecraft and wheel spin in the same direction, which is typical for relative speed definitions. However, for angular momentum conservation, it's simpler to consider the directions directly).

    Let's use a convention: if the reaction wheel spins in the positive direction, the spacecraft spins in the negative direction.
    So, $\vec{L}_{\text{sc}} = I_{\text{sc}} \vec{\omega}_{\text{sc}}$ and $\vec{L}_{\text{rw}} = I_{\text{rw}} \vec{\omega}_{\text{rw}}$.
    From conservation: $I_{\text{sc}} \omega_{\text{sc}} + I_{\text{rw}} \omega_{\text{rw}} = 0$.
    The angular velocity of the reaction wheel *relative to the spacecraft* is $\omega_{\text{rw, rel}}$.
    If the spacecraft rotates at $\omega_{\text{sc}}$ (say, counter-clockwise), and the reaction wheel spins at $\omega_{\text{rw, rel}}$ (say, clockwise) *relative to the spacecraft*, then the absolute angular velocity of the reaction wheel in inertial space is $\omega_{\text{rw}} = \omega_{\text{sc}} - \omega_{\text{rw, rel}}$. (The subtraction accounts for the opposite directions of rotation).

    Substitute this into the conservation equation:
    $$ I_{\text{sc}} \omega_{\text{sc}} + I_{\text{rw}} (\omega_{\text{sc}} - \omega_{\text{rw, rel}}) = 0 $$
    This step is the core of applying angular momentum conservation, relating the absolute angular velocities using the given relative velocity.

4.  **Solve for the spacecraft's angular speed, $\omega_{\text{sc}}$:**
    $$ I_{\text{sc}} \omega_{\text{sc}} + I_{\text{rw}} \omega_{\text{sc}} - I_{\text{rw}} \omega_{\text{rw, rel}} = 0 $$
    $$ (I_{\text{sc}} + I_{\text{rw}}) \omega_{\text{sc}} = I_{\text{rw}} \omega_{\text{rw, rel}} $$
    $$ \omega_{\text{sc}} = \frac{I_{\text{rw}} \omega_{\text{rw, rel}}}{I_{\text{sc}} + I_{\text{rw}}} $$
    This algebraic manipulation isolates the desired unknown.

5.  **Plug in the values:**
    $$ \omega_{\text{sc}} = \frac{(0.08 \text{ kg} \cdot \text{m}^2) \times (\frac{400\pi}{3} \text{ rad/s})}{120 \text{ kg} \cdot \text{m}^2 + 0.08 \text{ kg} \cdot \text{m}^2} $$
    $$ \omega_{\text{sc}} = \frac{\frac{32\pi}{3} \text{ kg} \cdot \text{m}^2\text{/s}}{120.08 \text{ kg} \cdot \text{m}^2} $$
    $$ \omega_{\text{sc}} = \frac{32\pi}{3 \times 120.08} \text{ rad/s} $$
    $$ \omega_{\text{sc}} \approx \frac{32 \times 3.14159}{360.24} \text{ rad/s} $$
    $$ \omega_{\text{sc}} \approx \frac{100.53}{360.24} \text{ rad/s} $$
    $$ \omega_{\text{sc}} \approx 0.2791 \text{ rad/s} $$
    Numerical calculation to get the final answer. Note that the $10^\circ$ rotation information was extraneous to finding the *final angular speed*; it would be relevant if we wanted to find the *time* to achieve that rotation.

**Final Answer:**
The final angular speed of the spacecraft is approximately $\boxed{0.279 \text{ rad/s}}$.

**Reflection:** This problem highlights the crucial principle of conservation of angular momentum in an isolated system. The main trap is correctly handling the relative angular velocity of the reaction wheel and ensuring the directions are consistent in the conservation equation. The spacecraft rotates in the opposite direction to the reaction wheel's spin relative to the spacecraft. The $10^\circ$ target rotation is a distractor for this specific question.

---

### Example 4: Torque Required for Gyroscope Reorientation (CMG principle)

**Problem Statement:** A Control Moment Gyroscope (CMG) in a satellite has a constant angular momentum magnitude of $L = 50 \text{ N} \cdot \text{m} \cdot \text{s}$ (or $\text{kg} \cdot \text{m}^2\text{/s}$). The CMG's spin axis is gimbaled (can be tilted). If the satellite needs to generate a torque of $0.1 \text{ N} \cdot \text{m}$ about a specific axis, what angular velocity (precession rate) must the CMG's spin axis be commanded to rotate at?

**What's Given:**
*   Magnitude of CMG angular momentum, $L = 50 \text{ N} \cdot \text{m} \cdot \text{s}$
*   Desired torque magnitude, $\tau = 0.1 \text{ N} \cdot \text{m}$

**What We Want:**
*   Precession rate (angular velocity of the CMG's spin axis), $\Omega_P$

**Solution:**

1.  **Recall the relationship between torque, precession rate, and angular momentum:**
    For precession, the torque is related to the precession rate and angular momentum by:
    $$ \vec{\tau} = \vec{\Omega}_P \times \vec{L} $$
    The magnitude of this relationship is:
    $$ \tau = \Omega_P L \sin\theta $$
    where $\theta$ is the angle between $\vec{\Omega}_P$ and $\vec{L}$.
    For maximum torque generation, the precession axis is typically commanded to be perpendicular to the spin axis of the gyroscope, so $\theta = 90^\circ$ and $\sin\theta = 1$. This is the most efficient way to generate torque.
    $$ \tau = \Omega_P L $$
    This is the fundamental equation for CMG operation, showing how tilting the gyro's axis generates torque.

2.  **Solve for the precession rate, $\Omega_P$:**
    $$ \Omega_P = \frac{\tau}{L} $$
    Rearranging the formula to solve for the unknown.

3.  **Plug in the values:**
    $$ \Omega_P = \frac{0.1 \text{ N} \cdot \text{m}}{50 \text{ N} \cdot \text{m} \cdot \text{s}} $$
    $$ \Omega_P = 0.002 \text{ rad/s} $$
    The units cancel to give rad/s, which is appropriate for an angular velocity.

**Final Answer:**
The CMG's spin axis must be commanded to rotate (precess) at an angular velocity of $\boxed{0.002 \text{ rad/s}}$.

**Reflection:** This example demonstrates the operational principle of a Control Moment Gyroscope (CMG). Unlike reaction wheels which change their spin speed, CMGs generate torque by *tilting* their already spinning wheel. The key here is understanding the vector cross product relationship between precession, angular momentum, and generated torque, and recognizing that for efficiency, the precession axis is usually perpendicular to the gyro's spin axis.

## 6. Common mistakes and traps

1.  **Confusing Angular Velocity ($\vec{\omega}$) with Angular Momentum ($\vec{L}$):** While related ($\vec{L} = I\vec{\omega}$), they are distinct concepts. Angular velocity describes the rate of rotation; angular momentum describes the *quantity* of rotational motion, including mass distribution. A common error is using $\omega$ where $L$ is required in equations like $\Omega_P = \tau/L$.
2.  **Misunderstanding the Direction of Precession:** This is the most counter-intuitive aspect. Students often expect a gyroscope's axis to tilt *into* the applied torque, similar to linear forces causing acceleration in their direction. Remember, the torque causes a change in the *direction* of the angular momentum vector, leading to motion perpendicular to the applied torque.
3.  **Forgetting Conservation of Angular Momentum in Isolated Systems:** When considering a spacecraft with internal reaction wheels, remember that internal torques (between the spacecraft body and the wheel) do not change the *total* angular momentum of the system. If the wheel gains angular momentum in one direction, the spacecraft body must gain an equal amount in the opposite direction.
4.  **Neglecting the Vector Nature of Torque and Angular Momentum:** These are vector quantities, meaning both their magnitude and direction are critical. Using scalar equations where vector cross products are required (e.g., for precession) will lead to incorrect results or a lack of understanding of the direction of motion.
5.  **Assuming Gyroscopes *Prevent* Rotation Rather Than *Control* It:** Gyroscopes don't stop a spacecraft from rotating; they enable precise control over its rotation. Reaction wheels *induce* rotation in the spacecraft by spinning up, and CMGs *generate torque* by precessing, both causing the spacecraft to reorient.
6.  **Incorrectly Applying the Right-Hand Rule:** The right-hand rule is crucial for determining the direction of angular momentum, torque, and precession. A common mistake is misapplying it, leading to incorrect directions for the resulting motion. Practice it for $\vec{L} = I\vec{\omega}$, $\vec{\tau} = \vec{r} \times \vec{F}$, and $\vec{\tau} = \vec{\Omega}_P \times \vec{L}$.

## 7. Textbook-precise explanation

A **gyroscope** is fundamentally a rapidly spinning rigid body, typically a massive rotor, whose axis of rotation is free to assume any orientation in space. Its utility in attitude control stems from its inherent property of **gyroscopic rigidity** and its unique response to applied torques, known as **precession**.

The rotational dynamics of a rigid body are governed by Euler's equations of motion, which are derived from Newton's Second Law for rotation:
$$ \vec{\tau}_{\text{ext}} = \frac{d\vec{L}}{dt} $$
where $\vec{\tau}_{\text{ext}}$ is the net external torque acting on the body, and $\vec{L}$ is its angular momentum vector. For a body rotating about a principal axis, $\vec{L} = I\vec{\omega}$, where $I$ is the moment of inertia and $\vec{\omega}$ is the angular velocity.

When an external torque $\vec{\tau}_{\text{ext}}$ is applied to a spinning gyroscope, and this torque is perpendicular to the gyroscope's angular momentum vector $\vec{L}$, the magnitude of $\vec{L}$ remains constant, but its direction changes. This change in direction manifests as **precession**, where the spin axis of the gyroscope sweeps out a cone in space. The angular velocity of precession, $\vec{\Omega}_P$, is related to the applied torque and the gyroscope's angular momentum by:
$$ \vec{\tau}_{\text{ext}} = \vec{\Omega}_P \times \vec{L} $$
The magnitude of the precession rate is given by $\Omega_P = \frac{\tau_{\text{ext}}}{L}$, assuming $\vec{\Omega}_P$ and $\vec{L}$ are perpendicular.

In spacecraft attitude control, gyroscopes are employed in two primary configurations:

1.  **Reaction Wheels (RWs):** These are flywheels whose spin axis is fixed relative to the spacecraft body. Attitude control is achieved by changing the spin speed of the reaction wheel. According to the conservation of angular momentum for the spacecraft-RW system (assuming no external torques), if the wheel's angular momentum $\vec{L}_{\text{RW}}$ changes by $\Delta \vec{L}_{\text{RW}}$, the spacecraft's angular momentum $\vec{L}_{\text{SC}}$ must change by an equal and opposite amount:
    $$ \Delta \vec{L}_{\text{SC}} = - \Delta \vec{L}_{\text{RW}} $$
    This change in $\vec{L}_{\text{SC}}$ results in a change in the spacecraft's angular velocity, thereby reorienting it. RWs are suitable for fine attitude adjustments and maintaining stability.

2.  **Control Moment Gyroscopes (CMGs):** These devices consist of a rapidly spinning rotor whose spin axis can be actively tilted or "gimbaled" by motors. By precessing the CMG's angular momentum vector $\vec{L}_{\text{CMG}}$ (i.e., changing its direction), a reaction torque $\vec{\tau}_{\text{reaction}}$ is generated on the spacecraft body.
    $$ \vec{\tau}_{\text{reaction}} = - \frac{d\vec{L}_{\text{CMG}}}{dt} = - (\vec{\Omega}_P \times \vec{L}_{\text{CMG}}) $$
    where $\vec{\Omega}_P$ is the commanded precession rate of the CMG's spin axis. CMGs can generate much larger torques than RWs for a given momentum storage capacity and are typically used for agile maneuvering of larger spacecraft (e.g., International Space Station, Hubble Space Telescope).

The stability of a gyroscope and its response to torques are crucial for attitude determination and control systems (ADCS). The phenomenon of **nutation**, a superimposed wobble on the precessional motion, can occur due to initial conditions or varying torques and is typically damped in practical systems.

**References:**
*   Bong Wie, *Spacecraft Dynamics and Control: A Practical Engineering Approach*, AIAA Education Series. (Chapter 6: "Attitude Control Using Momentum Exchange Devices")
*   Richard H. Battin, *An Introduction to the Mathematics and Methods of Astrodynamics*, AIAA Education Series. (Chapter 10: "Rotational Dynamics")

## 8. ASCII diagrams

Here are two ASCII diagrams to illustrate a simple gyroscope and its precession, and a conceptual reaction wheel in a spacecraft.

```text
       ^ Z (Spin Axis)
       |
       |  /
       | /
       |/
       O------- (Pivot Point)
      /|\
     / | \
    /  |  \
   /   |   \
  /    |    \
 /     |     \
+------+------+
|             |  <-- Gyroscope Disk (spinning rapidly)
|             |
+------+------+
       |
       |
       |
       V

Figure 1: Simple Gyroscope. The disk spins around the Z-axis.
The angular momentum vector L points along the Z-axis.
```

```text
       ^ Z
       |
       |    /----- Spin Axis of Gyro
       |   /
       |  /  (L vector)
       | /
       O---------------------> Y (Precession Direction)
       |\
       | \
       |  \
       |   \
       |    \
       V X (Torque Direction)

Figure 2: Gyroscope Precession.
- If the gyroscope's spin axis (and L) is along the Z-axis.
- And a torque (τ) is applied along the X-axis (e.g., gravity pulling down on the right side).
- The gyroscope's spin axis will precess (rotate) around the Y-axis.
  The direction of precession (Ω_P) is perpendicular to both L and τ.
  (Using Right Hand Rule: L (Z) x Ω_P (Y) = τ (X) is incorrect. It's τ = Ω_P x L.
   So, if L is Z and τ is X, then Ω_P must be Y.
   Curl fingers from Ω_P (Y) to L (Z), thumb points to τ (X). This is correct.)
```

```text
                  +-----------------------+
                  |                       |
                  |                       |
                  |      Spacecraft       |
                  |       Body (I_sc)     |
                  |                       |
                  |                       |
                  +-----------------------+
                           |   ^ Z (Yaw Axis)
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |
                           |   |