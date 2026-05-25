## 1. What it is — in plain English

Imagine something spinning. Maybe it's a top, a bicycle wheel, or even a planet. Angular momentum is a measure of how much "rotational oomph" that spinning object has. It tells you how hard it is to stop something that's spinning, or how much it will resist changing its spin.

Think of it like linear momentum, which is just "mass in motion." A bowling ball rolling quickly has a lot of linear momentum. Angular momentum is the rotational equivalent: it's "rotational mass in rotational motion." The heavier and more spread out an object's mass is (its "rotational mass," or moment of inertia), and the faster it's spinning, the more angular momentum it has.

Just like a rolling bowling ball tends to keep rolling, a spinning object tends to keep spinning. This tendency to maintain its state of rotation is a direct consequence of the conservation of angular momentum, one of the fundamental principles of physics. It's why gyroscopes are so stable, and why figure skaters spin faster when they pull their arms in.

## 2. Why it matters — real-world applications

Angular momentum is a cornerstone concept with profound implications across physics and engineering:

1.  **Satellite Stabilization (Aerospace):** Satellites in orbit often use **reaction wheels** or **control moment gyroscopes (CMGs)** to control their orientation. These are internal spinning masses. By changing the speed or tilt of these spinning wheels, engineers can precisely adjust the satellite's angular momentum, thereby rotating the satellite itself without expending propellant. This is crucial for pointing antennas, cameras, or solar panels accurately. Companies like SpaceX and Maxar Technologies rely heavily on this principle for their spacecraft.

2.  **Figure Skating and Diving (Sports Physics):** When a figure skater pulls her arms and legs close to her body, her rotational inertia (moment of inertia) decreases. To conserve her total angular momentum (since there's negligible external torque), her angular speed must increase dramatically, causing her to spin much faster. Divers use the same principle to perform multiple flips and twists in the air, tucking themselves into a compact shape to increase their rotation rate.

3.  **Gyroscopes and Navigation (Technology):** Gyroscopes, which are essentially rapidly spinning wheels, exhibit a strong resistance to changes in their orientation due due to their high angular momentum. This property is used in aircraft, ships, and even smartphones (MEMS gyroscopes) for navigation, stabilization, and orientation sensing. They provide a stable reference direction, allowing systems to detect changes in pitch, roll, and yaw.

4.  **Earth's Rotation and Climate (Planetary Science):** The Earth's immense angular momentum from its daily rotation is conserved. Events like major earthquakes or melting ice caps can cause tiny shifts in mass distribution, slightly altering the Earth's moment of inertia and thus minutely changing the length of a day. This also explains the precession of the equinoxes, where the Earth's tilted axis slowly wobbles over thousands of years, a phenomenon driven by the gravitational torques from the Sun and Moon acting on Earth's angular momentum.

5.  **Helicopter Design (Aerospace Engineering):** The main rotor of a helicopter possesses significant angular momentum. This large, spinning mass provides gyroscopic stability, helping to keep the helicopter level. Engineers must account for the gyroscopic effects (like precession) when designing control systems, as forces applied to the rotor disk will have effects 90 degrees later in the direction of rotation.

## 3. Prerequisites — what you must know first

Before diving deep into angular momentum, ensure you have a solid grasp of these foundational concepts:

*   **Linear Momentum ($\mathbf{p} = m\mathbf{v}$):** The product of an object's mass and its velocity, representing its "quantity of motion" in a straight line.
*   **Torque ($\boldsymbol{\tau} = \mathbf{r} \times \mathbf{F}$):** The rotational equivalent of force, describing the tendency of a force to cause rotation about an axis or point.
*   **Moment of Inertia ($I = \sum m_i r_i^2$ or $\int r^2 dm$):** The rotational equivalent of mass, quantifying an object's resistance to changes in its rotational motion.
*   **Rotational Kinematics ($\theta, \omega, \alpha$):** Concepts describing rotational motion: angular position, angular velocity, and angular acceleration.
*   **Vector Cross Product:** A binary operation on two vectors in three-dimensional space that results in a third vector perpendicular to the plane containing the first two. Crucial for determining the direction of angular momentum and torque.
*   **Newton's Laws of Motion (especially the rotational equivalent):** Understanding that net force causes linear acceleration, and by analogy, net torque causes angular acceleration ($\boldsymbol{\tau}_{net} = I\boldsymbol{\alpha}$).

## 4. The core idea — step by step

Let's build up the concept of angular momentum from its most fundamental definition to its more practical forms.

### Step 1: Review of Linear Momentum

**Plain English:** Linear momentum is a measure of how much "oomph" a moving object has in a straight line. It depends on both how heavy the object is and how fast it's going. A heavy object moving slowly can have the same momentum as a light object moving fast.

**Small Concrete Example:** Imagine a 1 kg bowling ball rolling at 10 m/s. Its linear momentum is $1 \text{ kg} \times 10 \text{ m/s} = 10 \text{ kg m/s}$. Now imagine a 0.1 kg tennis ball moving at 100 m/s. Its linear momentum is also $0.1 \text{ kg} \times 100 \text{ m/s} = 10 \text{ kg m/s}$. Both objects have the same linear momentum, despite vastly different masses and speeds.

**Formal/Mathematical Version:**
The linear momentum $\mathbf{p}$ of a particle of mass $m$ moving with velocity $\mathbf{v}$ is given by:
$$ \mathbf{p} = m\mathbf{v} $$
This is a vector quantity, meaning it has both magnitude and direction. Its direction is the same as the velocity vector $\mathbf{v}$.

**What could go wrong:** Confusing mass with momentum. An object at rest has mass but zero linear momentum. Momentum requires motion.

### Step 2: Introducing Angular Momentum for a Single Particle (General Case: $\mathbf{L} = \mathbf{r} \times \mathbf{p}$)

**Plain English:** Now, let's consider a single particle moving, but we want to know its "rotational oomph" *around a specific point* (often called the origin or pivot). This isn't just about how fast it's moving, but also how far it is from that point and in what direction it's moving relative to that point. It's like how effective a force is at *twisting* something (torque); angular momentum is how effective a *moving particle* is at *rotating* something.

**Small Concrete Example:** Imagine a small rock tied to a string, and you're swinging it around your hand (the origin). The rock has linear momentum $\mathbf{p}$. The vector from your hand to the rock is $\mathbf{r}$. The angular momentum $\mathbf{L}$ of the rock about your hand is found by taking the cross product of $\mathbf{r}$ and $\mathbf{p}$. If the rock is moving directly towards or away from your hand, its angular momentum about your hand is zero, even if it has linear momentum, because it's not causing any *rotation* around your hand.

**Formal/Mathematical Version:**
The angular momentum $\mathbf{L}$ of a particle with linear momentum $\mathbf{p}$ relative to an origin (or pivot point) is defined as the cross product of the position vector $\mathbf{r}$ (from the origin to the particle) and its linear momentum $\mathbf{p}$:
$$ \mathbf{L} = \mathbf{r} \times \mathbf{p} $$
Since $\mathbf{p} = m\mathbf{v}$, we can also write:
$$ \mathbf{L} = \mathbf{r} \times (m\mathbf{v}) = m(\mathbf{r} \times \mathbf{v}) $$
*   **Magnitude:** The magnitude of $\mathbf{L}$ is given by $|\mathbf{L}| = |\mathbf{r}| |\mathbf{p}| \sin\theta$, where $\theta$ is the angle between $\mathbf{r}$ and $\mathbf{p}$. This means angular momentum is maximized when $\mathbf{r}$ and $\mathbf{p}$ are perpendicular, and zero when they are parallel or anti-parallel.
*   **Direction:** The direction of $\mathbf{L}$ is perpendicular to both $\mathbf{r}$ and $\mathbf{p}$, and is determined by the right-hand rule. If you curl the fingers of your right hand from $\mathbf{r}$ to $\mathbf{p}$, your thumb points in the direction of $\mathbf{L}$.

**What could go wrong:** Forgetting that $\mathbf{r}$ is the vector *from the chosen origin* to the particle. The choice of origin is crucial and affects the value of $\mathbf{L}$. Also, misapplying the right-hand rule for the cross product.

### Step 3: Angular Momentum for a System of Particles / Rigid Body (Fixed Axis: $L = I\omega$)

**Plain English:** When we have many particles, or a solid object (a rigid body) spinning around a fixed axis, we can sum up the angular momentum of all its tiny parts. If the object is spinning predictably around a single, unmoving line, this sum simplifies beautifully. We don't need to do complex cross products for every tiny piece; instead, we can use the object's total "rotational mass" (moment of inertia, $I$) and how fast it's spinning (angular velocity, $\omega$).

**Small Concrete Example:** Consider a merry-go-round spinning around its central pole. The pole is the fixed axis. Each child on the merry-go-round has a certain mass and is moving in a circle. The farther a child is from the pole, the more they contribute to the total rotational oomph. Instead of calculating $\mathbf{r} \times \mathbf{p}$ for every child and every part of the merry-go-round, we can just find the merry-go-round's total moment of inertia $I$ and multiply it by its angular speed $\omega$.

**Formal/Mathematical Version:**
For a system of particles, the total angular momentum is the vector sum of the angular momenta of individual particles:
$$ \mathbf{L}_{total} = \sum_i \mathbf{L}_i = \sum_i (\mathbf{r}_i \times \mathbf{p}_i) $$
For a rigid body rotating about a *fixed axis* (say, the z-axis), the situation simplifies significantly. Consider a small mass element $dm$ at a perpendicular distance $r$ from the axis of rotation. Its linear velocity is $v = r\omega$, and its direction is tangential. Its linear momentum is $dp = (dm)v = (dm)r\omega$.
The angular momentum of this element about the axis of rotation has a magnitude $dL = r \cdot dp = r((dm)r\omega) = (dm)r^2\omega$. The direction of this $dL$ is along the axis of rotation.
Summing (integrating) over the entire rigid body:
$$ L = \int (dm)r^2\omega $$
Since $\omega$ is constant for all parts of a rigid body, we can pull it out of the integral:
$$ L = \left(\int r^2 dm\right) \omega $$
The term in parentheses is precisely the definition of the moment of inertia $I$ about that axis:
$$ I = \int r^2 dm $$
Therefore, for a rigid body rotating about a fixed axis:
$$ L = I\omega $$
In this special case, the angular momentum vector $\mathbf{L}$ is parallel to the angular velocity vector $\boldsymbol{\omega}$, and its direction is along the fixed axis of rotation (given by the right-hand rule curling fingers in direction of $\boldsymbol{\omega}$).

**What could go wrong:** Applying $L=I\omega$ when the axis is *not* fixed, or when the object is not a rigid body, or when $\mathbf{L}$ and $\boldsymbol{\omega}$ are not parallel (which happens if the axis of rotation is not a principal axis of inertia, a more advanced topic). For introductory physics, $L=I\omega$ is generally safe for fixed-axis rotation of rigid bodies.

### Step 4: The Vector Nature of Angular Momentum and the Right-Hand Rule

**Plain English:** Angular momentum isn't just a number; it has a direction. This direction tells us which way the object is spinning and around which axis. It's crucial for understanding how spinning objects behave, especially when they're tilted or subject to external twists.

**Small Concrete Example:** If you spin a bicycle wheel clockwise as viewed from above, its angular momentum vector points downwards (into the ground). If you spin it counter-clockwise, it points upwards. This direction is why a spinning top stays upright: its angular momentum vector resists being tipped over.

**Formal/Mathematical Version:**
As defined by $\mathbf{L} = \mathbf{r} \times \mathbf{p}$, angular momentum is a vector. Its direction is determined by the right-hand rule:
1.  Point the fingers of your right hand in the direction of the first vector ($\mathbf{r}$).
2.  Curl your fingers towards the direction of the second vector ($\mathbf{p}$).
3.  Your thumb will point in the direction of the resulting angular momentum vector ($\mathbf{L}$).

For a rigid body rotating about a fixed axis, the direction of $\mathbf{L}$ is along the axis of rotation, in the direction of the angular velocity vector $\boldsymbol{\omega}$. You can find this direction by curling the fingers of your right hand in the direction of rotation; your thumb points in the direction of $\boldsymbol{\omega}$ and thus $\mathbf{L}$.

**What could go wrong:** Incorrectly applying the right-hand rule or forgetting that angular momentum is a vector quantity, which means its direction can change even if its magnitude stays constant.

### Step 5: Conservation of Angular Momentum

**Plain English:** This is one of the most powerful ideas. If there are no external "twisting forces" (torques) acting on a system, then the total amount of rotational oomph in that system stays constant, no matter what changes happen internally. This means if an object changes its shape and its "rotational mass" (moment of inertia) changes, its spin rate must adjust to keep the total angular momentum the same.

**Small Concrete Example:** The figure skater example is perfect here. When she pulls her arms in, her moment of inertia $I$ decreases. Since there's negligible external torque from the ice or air, her total angular momentum $L = I\omega$ must remain constant. If $I$ goes down, $\omega$ must go up to compensate, making her spin faster.

**Formal/Mathematical Version:**
The rotational equivalent of Newton's Second Law states that the net external torque acting on a system is equal to the rate of change of its total angular momentum:
$$ \boldsymbol{\tau}_{net} = \frac{d\mathbf{L}}{dt} $$
If the net external torque $\boldsymbol{\tau}_{net}$ acting on a system is zero, then the rate of change of angular momentum is zero:
$$ \frac{d\mathbf{L}}{dt} = 0 \implies \mathbf{L} = \text{constant} $$
This is the principle of **conservation of angular momentum**. For a system where angular momentum is conserved, we can state:
$$ \mathbf{L}_{initial} = \mathbf{L}_{final} $$
For a fixed-axis rotation, this often simplifies to:
$$ I_{initial}\omega_{initial} = I_{final}\omega_{final} $$
It's crucial to remember that this conservation applies only when the net *external* torque is zero. Internal torques within the system can redistribute angular momentum among its parts, but they cannot change the total angular momentum of the system.

**What could go wrong:** Forgetting that *external* torques are what matter for conservation. If there's an external torque, angular momentum is *not* conserved. Also, confusing internal and external torques.

## 5. Worked examples — multiple, with every step shown

### Example 1: Angular Momentum of a Particle in Linear Motion

**Problem:** A particle of mass $m = 0.5 \text{ kg}$ is moving with a constant velocity $\mathbf{v} = (4.0 \hat{i}) \text{ m/s}$. Calculate its angular momentum $\mathbf{L}$ about the origin $(0,0,0)$ when its position vector is $\mathbf{r} = (3.0 \hat{j}) \text{ m}$.

**Given:**
*   Mass $m = 0.5 \text{ kg}$
*   Velocity $\mathbf{v} = (4.0 \hat{i}) \text{ m/s}$
*   Position vector $\mathbf{r} = (3.0 \hat{j}) \text{ m}$
*   Origin for calculation: $(0,0,0)$

**Want:** Angular momentum $\mathbf{L}$ about the origin.

**Solution:**

1.  **Identify the formula for angular momentum of a particle:**
    $$ \mathbf{L} = \mathbf{r} \times \mathbf{p} $$
    *This is the fundamental definition for a particle's angular momentum about a point.*

2.  **Calculate the linear momentum $\mathbf{p}$:**
    $$ \mathbf{p} = m\mathbf{v} $$
    $$ \mathbf{p} = (0.5 \text{ kg}) \times (4.0 \hat{i} \text{ m/s}) $$
    $$ \mathbf{p} = (2.0 \hat{i}) \text{ kg m/s} $$
    *Linear momentum is mass times velocity, a vector quantity.*

3.  **Perform the cross product $\mathbf{r} \times \mathbf{p}$:**
    $$ \mathbf{L} = (3.0 \hat{j} \text{ m}) \times (2.0 \hat{i} \text{ kg m/s}) $$
    *Substitute the known vectors for $\mathbf{r}$ and $\mathbf{p}$. Remember the properties of cross products for unit vectors: $\hat{j} \times \hat{i} = -\hat{k}$.*
    $$ \mathbf{L} = (3.0 \times 2.0) (\hat{j} \times \hat{i}) \text{ kg m}^2\text{/s} $$
    $$ \mathbf{L} = 6.0 (-\hat{k}) \text{ kg m}^2\text{/s} $$
    $$ \mathbf{L} = (-6.0 \hat{k}) \text{ kg m}^2\text{/s} $$
    *The magnitude is 6.0, and the direction is along the negative z-axis, perpendicular to both $\mathbf{r}$ (y-axis) and $\mathbf{p}$ (x-axis).*

**Final Answer:**
$$ \boxed{\mathbf{L} = (-6.0 \hat{k}) \text{ kg m}^2\text{/s}} $$

**Reflection:** This example highlights that even a particle moving in a straight line can have angular momentum about a point not on its path. The direction of $\mathbf{L}$ is crucial and is determined by the right-hand rule. Here, the particle is moving parallel to the x-axis, but it is located on the y-axis, causing a rotation about the z-axis.

---

### Example 2: Angular Momentum of a Spinning Disk (Fixed Axis)

**Problem:** A uniform solid disk of mass $M = 2.0 \text{ kg}$ and radius $R = 0.40 \text{ m}$ is rotating about a fixed axis through its center, perpendicular to its plane, with an angular speed of $\omega = 5.0 \text{ rad/s}$. Calculate the magnitude of its angular momentum.

**Given:**
*   Mass $M = 2.0 \text{ kg}$
*   Radius $R = 0.40 \text{ m}$
*   Angular speed $\omega = 5.0 \text{ rad/s}$
*   Object: Uniform solid disk, fixed axis through center.

**Want:** Magnitude of angular momentum $L$.

**Solution:**

1.  **Identify the formula for angular momentum of a rigid body about a fixed axis:**
    $$ L = I\omega $$
    *For a rigid body rotating about a fixed axis, this simplified formula is applicable. We need to find the moment of inertia $I$ first.*

2.  **Determine the moment of inertia $I$ for a uniform solid disk about its central axis:**
    From standard moment of inertia tables, for a uniform solid disk rotating about an axis through its center and perpendicular to its plane:
    $$ I = \frac{1}{2}MR^2 $$
    *This is a standard formula you should either know or be able to look up. It represents the "rotational mass" of the disk.*

3.  **Calculate the numerical value of $I$:**
    $$ I = \frac{1}{2}(2.0 \text{ kg})(0.40 \text{ m})^2 $$
    $$ I = \frac{1}{2}(2.0 \text{ kg})(0.16 \text{ m}^2) $$
    $$ I = 0.16 \text{ kg m}^2 $$
    *Substitute the given mass and radius values to get the moment of inertia.*

4.  **Calculate the angular momentum $L$:**
    $$ L = I\omega $$
    $$ L = (0.16 \text{ kg m}^2)(5.0 \text{ rad/s}) $$
    $$ L = 0.80 \text{ kg m}^2\text{/s} $$
    *Multiply the calculated moment of inertia by the given angular speed. The unit 'rad' is dimensionless in this context.*

**Final Answer:**
$$ \boxed{L = 0.80 \text{ kg m}^2\text{/s}} $$

**Reflection:** This example demonstrates the direct application of $L=I\omega$ for a common rigid body. The key is correctly identifying the moment of inertia for the specific object and axis of rotation.

---

### Example 3: Conservation of Angular Momentum (Disk and Ring)

**Problem:** A uniform solid disk ($M_1 = 2.0 \text{ kg}$, $R_1 = 0.40 \text{ m}$) is initially rotating at $\omega_1 = 5.0 \text{ rad/s}$ about a vertical axis through its center. A thin, uniform ring ($M_2 = 1.0 \text{ kg}$, $R_2 = 0.40 \text{ m}$) is dropped concentrically onto the rotating disk. The ring and disk eventually rotate together as a single unit. What is the final angular speed $\omega_f$ of the combined system? Assume no external torques act on the system during the process.

**Given:**
*   Disk: $M_1 = 2.0 \text{ kg}$, $R_1 = 0.40 \text{ m}$, initial $\omega_1 = 5.0 \text{ rad/s}$
*   Ring: $M_2 = 1.0 \text{ kg}$, $R_2 = 0.40 \text{ m}$ (same radius as disk)
*   No external torques.

**Want:** Final angular speed $\omega_f$.

**Solution:**

1.  **Identify the principle to use:** Since no external torques act on the disk-ring system, the total angular momentum of the system is conserved.
    $$ L_{initial} = L_{final} $$
    *This is the cornerstone of the problem. We are dealing with a closed system where only internal forces (friction between disk and ring) are at play.*

2.  **Calculate the initial angular momentum ($L_{initial}$):**
    Initially, only the disk is rotating.
    *   Moment of inertia of the disk ($I_1$):
        $$ I_1 = \frac{1}{2}M_1R_1^2 $$
        $$ I_1 = \frac{1}{2}(2.0 \text{ kg})(0.40 \text{ m})^2 = 0.16 \text{ kg m}^2 $$
        *This is the same calculation as in Example 2.*
    *   Initial angular momentum of the system:
        $$ L_{initial} = I_1\omega_1 $$
        $$ L_{initial} = (0.16 \text{ kg m}^2)(5.0 \text{ rad/s}) = 0.80 \text{ kg m}^2\text{/s} $$
        *The initial angular momentum is solely due to the spinning disk.*

3.  **Calculate the final moment of inertia ($I_{final}$):**
    After the ring is dropped, both the disk and the ring rotate together. The total moment of inertia is the sum of their individual moments of inertia.
    *   Moment of inertia of the disk ($I_1$): $I_1 = 0.16 \text{ kg m}^2$ (from step 2).
    *   Moment of inertia of a thin ring about its central axis ($I_2$):
        $$ I_2 = M_2R_2^2 $$
        $$ I_2 = (1.0 \text{ kg})(0.40 \text{ m})^2 = (1.0 \text{ kg})(0.16 \text{ m}^2) = 0.16 \text{ kg m}^2 $$
        *This is a standard formula for a thin ring. Note that the mass is entirely at radius $R_2$.*
    *   Total final moment of inertia ($I_{final}$):
        $$ I_{final} = I_1 + I_2 $$
        $$ I_{final} = 0.16 \text{ kg m}^2 + 0.16 \text{ kg m}^2 = 0.32 \text{ kg m}^2 $$
        *The system's "rotational mass" increases when the ring is added.*

4.  **Apply conservation of angular momentum to find $\omega_f$:**
    $$ L_{initial} = L_{final} $$
    $$ I_1\omega_1 = I_{final}\omega_f $$
    $$ 0.80 \text{ kg m}^2\text{/s} = (0.32 \text{ kg m}^2)\omega_f $$
    *Set the initial angular momentum equal to the final angular momentum expressed in terms of the final moment of inertia and angular speed.*

5.  **Solve for $\omega_f$:**
    $$ \omega_f = \frac{0.80 \text{ kg m}^2\text{/s}}{0.32 \text{ kg m}^2} $$
    $$ \omega_f = 2.5 \text{ rad/s} $$
    *As the moment of inertia increased, the angular speed decreased, as expected from conservation of angular momentum.*

**Final Answer:**
$$ \boxed{\omega_f = 2.5 \text{ rad/s}} $$

**Reflection:** This problem beautifully illustrates the conservation of angular momentum. By increasing the system's moment of inertia, its angular speed must decrease to keep the total angular momentum constant. This is the same principle that allows a figure skater to slow down by extending her arms.

---

### Example 4: Angular Momentum of a Projectile (General Case)

**Problem:** A particle of mass $m = 0.1 \text{ kg}$ is launched from the origin $(0,0,0)$ with an initial velocity $\mathbf{v}_0 = (10 \cos 30^\circ \hat{i} + 10 \sin 30^\circ \hat{j}) \text{ m/s}$. Neglecting air resistance, calculate the angular momentum $\mathbf{L}$ of the particle about the origin when it reaches its maximum height. Use $g = 9.8 \text{ m/s}^2$.

**Given:**
*   Mass $m = 0.1 \text{ kg}$
*   Initial velocity $\mathbf{v}_0 = (10 \cos 30^\circ \hat{i} + 10 \sin 30^\circ \hat{j}) \text{ m/s}$
    *   $v_{0x} = 10 \times \frac{\sqrt{3}}{2} = 5\sqrt{3} \approx 8.66 \text{ m/s}$
    *   $v_{0y} = 10 \times \frac{1}{2} = 5.0 \text{ m/s}$
*   $g = 9.8 \text{ m/s}^2$
*   Origin for calculation: $(0,0,0)$

**Want:** Angular momentum $\mathbf{L}$ about the origin at maximum height.

**Solution:**

1.  **Identify the formula for angular momentum of a particle:**
    $$ \mathbf{L} = \mathbf{r} \times \mathbf{p} = m(\mathbf{r} \times \mathbf{v}) $$
    *We need the position vector $\mathbf{r}$ and velocity vector $\mathbf{v}$ at the moment the particle reaches maximum height.*

2.  **Determine the time to reach maximum height ($t_{peak}$):**
    At maximum height, the vertical component of velocity ($v_y$) is zero.
    Using kinematics: $v_y = v_{0y} - gt$
    $$ 0 = v_{0y} - gt_{peak} $$
    $$ t_{peak} = \frac{v_{0y}}{g} = \frac{5.0 \text{ m/s}}{9.8 \text{ m/s}^2} \approx 0.510 \text{ s} $$
    *This is the time elapsed from launch until the particle momentarily stops rising.*

3.  **Determine the position vector $\mathbf{r}$ at maximum height:**
    The horizontal position ($x$) and vertical position ($y$) at $t_{peak}$:
    $$ x = v_{0x} t_{peak} = (5\sqrt{3} \text{ m/s})(0.510 \text{ s}) \approx 4.43 \text{ m} $$
    $$ y = v_{0y} t_{peak} - \frac{1}{2}gt_{peak}^2 = (5.0 \text{ m/s})(0.510 \text{ s}) - \frac{1}{2}(9.8 \text{ m/s}^2)(0.510 \text{ s})^2 $$
    $$ y = 2.55 \text{ m} - 1.275 \text{ m} \approx 1.275 \text{ m} $$
    So, the position vector at maximum height is:
    $$ \mathbf{r} = (4.43 \hat{i} + 1.275 \hat{j}) \text{ m} $$
    *We calculate the x and y coordinates of the particle at the time of peak height.*

4.  **Determine the velocity vector $\mathbf{v}$ at maximum height:**
    At maximum height, $v_y = 0$. The horizontal velocity $v_x$ remains constant (no air resistance).
    $$ v_x = v_{0x} = 5\sqrt{3} \text{ m/s} \approx 8.66 \text{ m/s} $$
    So, the velocity vector at maximum height is:
    $$ \mathbf{v} = (8.66 \hat{i}) \text{ m/s} $$
    *The y-component of velocity is zero at the peak of the trajectory.*

5.  **Calculate the angular momentum $\mathbf{L} = m(\mathbf{r} \times \mathbf{v})$:**
    $$ \mathbf{L} = (0.1 \text{ kg}) \times ((4.43 \hat{i} + 1.275 \hat{j}) \text{ m} \times (8.66 \hat{i}) \text{ m/s}) $$
    *Substitute the mass, position vector, and velocity vector into the angular momentum formula.*
    *Perform the cross product. Remember $\hat{i} \times \hat{i} = 0$ and $\hat{j} \times \hat{i} = -\hat{k}$.*
    $$ \mathbf{L} = (0.1 \text{ kg}) \times ((4.43 \times 8.66)(\hat{i} \times \hat{i}) + (1.275 \times 8.66)(\hat{j} \times \hat{i})) \text{ kg m}^2\text{/s} $$
    $$ \mathbf{L} = (0.1 \text{ kg}) \times (0 + (11.04)(- \hat{k})) \text{ kg m}^2\text{/s} $$
    $$ \mathbf{L} = (0.1 \text{ kg}) \times (-11.04 \hat{k}) \text{ kg m}^2\text{/s} $$
    $$ \mathbf{L} = (-1.104 \hat{k}) \text{ kg m}^2\text{/s} $$
    *The angular momentum is directed along the negative z-axis, which is consistent with the particle moving in the xy-plane and tending to rotate clockwise around the origin.*

**Final Answer:**
$$ \boxed{\mathbf{L} \approx (-1.10 \hat{k}) \text{ kg m}^2\text{/s}} $$

**Reflection:** This example demonstrates the general definition of angular momentum $\mathbf{L} = \mathbf{r} \times \mathbf{p}$ for a particle moving in a curved path. It requires careful calculation of the position and velocity vectors at a specific point in time and then performing the vector cross product. The angular momentum about the origin is generally *not* conserved in projectile motion because gravity exerts an external torque about the origin (unless the origin is chosen as the particle's center of mass, which is trivial, or if the origin is chosen to be the point where gravity acts, which is also generally not useful). Here, the torque due to gravity is $\mathbf{r} \times (m\mathbf{g})$, which is non-zero.

## 6. Common mistakes and traps

1.  **Confusing $L=I\omega$ with $\mathbf{L}=\mathbf{r}\times\mathbf{p}$:** Students often use $L=I\omega$ for a single particle or a non-fixed axis scenario, or try to use $\mathbf{r}\times\mathbf{p}$ for a rigid body instead of summing/integrating. Remember $L=I\omega$ is a special case for fixed-axis rotation of a rigid body where $\mathbf{L}$ and $\boldsymbol{\omega}$ are parallel.
2.  **Incorrect direction of $\mathbf{L}$:** Misapplying the right-hand rule for cross products, leading to incorrect vector directions (e.g., using left hand, or swapping $\mathbf{r}$ and $\mathbf{p}$ in the cross product).
3.  **Forgetting the "about a point/axis" aspect:** Angular momentum is always defined *relative to a specific origin or axis*. Its value changes if you change the reference point.
4.  **Using scalar $L=I\omega$ when $\mathbf{L}$ and $\boldsymbol{\omega}$ are not parallel:** In general 3D rigid body motion, $\mathbf{L}$ and $\boldsymbol{\omega}$ are not necessarily parallel. The relation is more complex, involving the inertia tensor. $L=I\omega$ only holds when rotation is about a principal axis or a fixed axis.
5.  **Not using the perpendicular component:** When calculating magnitude using $L = rp \sin\theta$, students might use the wrong angle or forget that $r$ and $p$ must be perpendicular components relative to each other for maximum effect. Alternatively, using $L = r_{\perp}p$ or $L = r p_{\perp}$ where $r_{\perp}$ is the perpendicular distance from the axis to the line of action of $\mathbf{p}$, or $p_{\perp}$ is the component of $\mathbf{p}$ perpendicular to $\mathbf{r}$.
6.  **Unit conversion errors:** Forgetting to convert angular speed from revolutions per minute (rpm) to radians per second (rad/s) when using formulas involving $\omega$.

## 7. Textbook-precise explanation

**Angular Momentum of a Particle:**
The angular momentum $\mathbf{L}$ of a particle with mass $m$ and linear momentum $\mathbf{p} = m\mathbf{v}$ about a specified origin $O$ is defined as the vector cross product of its position vector $\mathbf{r}$ (from $O$ to the particle) and its linear momentum $\mathbf{p}$:
$$ \mathbf{L} = \mathbf{r} \times \mathbf{p} $$
The magnitude of $\mathbf{L}$ is given by $L = rp \sin\theta$, where $\theta$ is the angle ($0 \le \theta \le \pi$) between $\mathbf{r}$ and $\mathbf{p}$. The direction of $\mathbf{L}$ is perpendicular to the plane formed by $\mathbf{r}$ and $\mathbf{p}$, and is determined by the right-hand rule. The SI unit for angular momentum is $\text{kg m}^2\text{/s}$.

**Angular Momentum of a System of Particles:**
For a system consisting of $N$ particles, the total angular momentum $\mathbf{L}_{sys}$ about a specified origin is the vector sum of the angular momenta of the individual particles:
$$ \mathbf{L}_{sys} = \sum_{i=1}^{N} \mathbf{L}_i = \sum_{i=1}^{N} (\mathbf{r}_i \times \mathbf{p}_i) $$

**Angular Momentum of a Rigid Body Rotating About a Fixed Axis:**
For a rigid body rotating with angular velocity $\boldsymbol{\omega}$ about a fixed axis, the angular momentum $\mathbf{L}$ about that axis can be expressed as:
$$ \mathbf{L} = I\boldsymbol{\omega} $$
where $I$ is the moment of inertia of the rigid body about the specified fixed axis. This relation holds when the axis of rotation is a principal axis of inertia, or more generally, when calculating the component of angular momentum along the axis of rotation. In this case, the angular momentum vector $\mathbf{L}$ is parallel to the angular velocity vector $\boldsymbol{\omega}$.

**Rotational Analog of Newton's Second Law:**
The net external torque $\boldsymbol{\tau}_{net}$ acting on a system is equal to the time rate of change of the system's total angular momentum $\mathbf{L}_{sys}$:
$$ \boldsymbol{\tau}_{net} = \frac{d\mathbf{L}_{sys}}{dt} $$
This fundamental relation is the rotational equivalent of Newton's second law, $\mathbf{F}_{net} = d\mathbf{p}/dt$.

**Conservation of Angular Momentum:**
If the net external torque acting on a system is zero ($\boldsymbol{\tau}_{net} = 0$), then the total angular momentum of the system $\mathbf{L}_{sys}$ remains constant both in magnitude and direction:
$$ \text{If } \boldsymbol{\tau}_{net} = 0 \text{, then } \frac{d\mathbf{L}_{sys}}{dt} = 0 \implies \mathbf{L}_{sys} = \text{constant} $$
This principle is known as the conservation of angular momentum.

*References: Halliday, Resnick, Walker, "Fundamentals of Physics," 11th ed., Chapter 10; Serway, Jewett, "Physics for Scientists and Engineers," 10th ed., Chapter 11.*

## 8. ASCII diagrams

Here are two ASCII diagrams to illustrate the concepts:

```text
Diagram 1: Angular Momentum of a Particle (L = r x p)

       ^ y
       |
       |  Particle (mass m)
       |  *
       |  |\
       |  | \ p (linear momentum)
       |  |  \
       |  |   v
       |  |    \
       |  r     \
       |  |      \
       |  |       \
       |  |        \
       O--+----------------> x
      (Origin)
        /
       / L (angular momentum, out of page)
      /
     v z (axis for L)

Description:
- O is the origin (0,0,0) about which angular momentum is calculated.
- r is the position vector from the origin to the particle.
- p is the linear momentum vector of the particle.
- The angle between r and p is theta (not explicitly shown but implied).
- L is the angular momentum vector, which is perpendicular to the plane
  formed by r and p. Using the right-hand rule (curl fingers from r to p),
  L points out of the page (along the positive z-axis in this specific setup).
  If p were pointing more towards +x, L would point more towards -z.
```

```text
Diagram 2: Angular Momentum of a Rigid Body (L = Iω)

       ^ Axis of Rotation (z-axis)
       |
       |   +-------------------+
       |   |                   |
       |   |                   |
       |   |      Disk         |
       |   |                   |
       |   |                   |
       +---O-------------------+----> x
           |
           |
           |   <-- ω (angular velocity, counter-clockwise from above)
           |   <-- L (angular momentum, along axis of rotation)
           |
           v

Description:
- O is the center of the disk and lies on the fixed axis of rotation (z-axis).
- The disk is rotating counter-clockwise when viewed from above.
- ω is the angular velocity vector, pointing along the axis of rotation
  (upwards in this case, using the right-hand rule for rotation).
- L is the angular momentum vector, which for a fixed axis of rotation
  through the center of mass (or a principal axis), is parallel to ω
  and points in the same direction.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **L = Iω (Fixed Axis):** Think of a **L**arge **I**ce skater **ω**hirling. Her "largeness" (moment of inertia) and "whirling" (angular velocity) define her rotational oomph. Imagine her spinning perfectly upright, so her angular momentum is directly along her body axis.
    *   **L = r × p (General):** Think of a **L**everage **r**otating a **p**ush. You need leverage (distance `r`) and a push (momentum `p`) to get a rotational effect. The "x" in `r x p` is your visual cue for the **cross product** and the **right-hand rule**. Visualize a wrench (r) turning a bolt (p) and your thumb showing the direction of rotation (L).

2.  **Formulas/Facts to Overlearn:**
    *   $\mathbf{L} = \mathbf{r} \times \mathbf{p}$ (The fundamental definition for a particle).
    *   $L = I\omega$ (The simplified form for fixed-axis rotation of a rigid body).
    *   $\boldsymbol{\tau}_{net} = \frac{d\mathbf{L}}{dt}$ (The rotational equivalent of Newton's 2nd Law, leading to conservation).
    *   Conservation of Angular Momentum: If $\boldsymbol{\tau}_{net} = 0$, then $\mathbf{L}_{initial} = \mathbf{L}_{final}$.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Immediately after this lesson. Re-read, re-derive, work through examples.
    *   **Day 3:** Review definitions, formulas, and the right-hand rule. Try one or two simple problems.
    *   **Day 7:** Review the conditions for conservation of angular momentum. Work through a conservation problem.
    *   **Day 16:** Review the differences between the two main formulas ($L=I\omega$ vs. $\mathbf{L}=\mathbf{r}\times\mathbf{p}$) and when to use each.
    *   **Day 35:** Attempt a challenging problem that combines both linear and rotational concepts. Explain the concepts in your own words without looking at notes.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the formulas, you can rebuild them:
    *   **Start with Linear Momentum:** $\mathbf{p} = m\mathbf{v}$. This is fundamental.
    *   **Define Angular Momentum for a Particle:** The rotational analogue of force (torque, $\mathbf{r} \times \mathbf{F}$) suggests the rotational analogue of momentum should involve $\mathbf{r}$ and $\mathbf{p}$. The cross product $\mathbf{r} \times \mathbf{p}$ naturally gives the correct vector properties. So, $\mathbf{L} = \mathbf{r} \times \mathbf{p}$.
    *   **Derive $L=I\omega$ from $\mathbf{L}=\mathbf{r}\times\mathbf{p}$ for a Fixed Axis:**
        1.  Consider a small particle $dm$ of a rigid body rotating in a circle of radius $r$ about a fixed axis with angular speed $\omega$.
        2.  Its linear speed is $v = r\omega$.
        3.  Its linear momentum magnitude is $dp = (dm)v = (dm)r\omega$.
        4.  Its angular momentum magnitude about the axis (since $\mathbf{r}$ and $\mathbf{p}$ are perpendicular for circular motion) is $dL = r \cdot dp = r((dm)r\omega) = (dm)r^2\omega$.
        5.  Sum (integrate) over all particles in the rigid body: $L = \int (dm)r^2\omega$.
        6.  Since $\omega$ is constant for all parts of a rigid body, pull it out: $L = (\int r^2 dm)\omega$.
        7.  Recognize $\int r^2 dm$ as the moment of inertia $I$.
        8.  Thus, $L = I\omega$.

## 10. Connections — what this leads to

The concept of angular momentum is incredibly powerful and forms the basis for understanding many advanced topics in physics and engineering:

*   **Precession and Nutation:** The complex wobbling motion of gyroscopes and spinning planets (like Earth's precession of the equinoxes) is a direct consequence of external torques interacting with a body's angular momentum, causing its angular momentum vector to change direction.
*   **Orbital Mechanics:** Kepler's second law of planetary motion (equal areas swept in equal times) is a direct consequence of the conservation of angular momentum for a planet orbiting the Sun under a central gravitational force (which produces zero torque about the Sun). This is fundamental to understanding satellite orbits and space mission design.
*   **Quantum Mechanics:** Angular momentum plays a central role in quantum mechanics, where it is quantized. Electron orbitals are characterized by orbital angular momentum, and particles possess intrinsic "spin" angular momentum, which is a fundamental property like mass or charge.
*   **Control Systems and Robotics:** Reaction wheels and control moment gyros (CMGs) used in spacecraft stabilization are direct applications of angular momentum conservation. Robotics often involves controlling the angular momentum of robot arms and manipulators.
*   **Fluid Dynamics:** In fluid mechanics, the concept of circulation is related to angular momentum, especially in understanding vortices and turbulent flows.
*   **Classical Field Theory and Noether's Theorem:** In advanced theoretical physics, the conservation of angular momentum is shown to be a direct consequence of the rotational symmetry of physical laws (Noether's Theorem).
*   **Lagrangian and Hamiltonian Mechanics:** Angular momentum is a crucial generalized momentum in these advanced formulations of classical mechanics, providing elegant ways to solve complex problems and derive conservation laws.

## 11. Self-check questions

1.  A particle of mass $0.2 \text{ kg}$ is moving in the xy-plane. At a certain instant, its position vector is $\mathbf{r} = (2.0 \hat{i} - 1.0 \hat{j}) \text{ m}$ and its velocity vector is $\mathbf{v} = (3.0 \hat{i} + 4.0 \hat{j}) \text{ m/s}$. Calculate the angular momentum of the particle about the origin at this instant.
2.  A uniform solid cylinder of mass $10 \text{ kg}$ and radius $0.5 \text{ m}$ is rotating about its central axis at $120 \text{ rpm}$. What is the magnitude of its angular momentum?
3.  A merry-go-round, modeled as a uniform disk of mass $100 \text{ kg}$ and radius $2.0 \text{ m}$, is initially at rest. A child of mass $30 \text{ kg}$ runs tangentially to the edge of the merry-go-round at a speed of $4.0 \text{ m/s}$ and jumps onto it. Assuming the child lands on the edge and then rotates with the merry-go-round, what is the final angular speed of the merry-go-round and child system?
4.  Consider a planet orbiting a star. Explain why the angular momentum of the planet about the star is conserved, assuming only the gravitational force acts between them. What implications does this have for the planet's speed at different points in its elliptical orbit?
5.  A rigid body is rotating about an axis that is *not* a principal axis of inertia. Can you still use $L=I\omega$ to describe its angular momentum? If not, why, and what is the more general relationship between $\mathbf{L}$ and $\boldsymbol{\omega}$?