## 1. What it is — in plain English

Imagine you have a toy rocket spinning in space. We want to know exactly where it's pointing at all times, and how that pointing direction changes as it spins. This "pointing direction" is called its orientation or attitude.

Quaternions are a special kind of number, like a super complex number, that are really good at describing rotations in 3D space. They're like a compact, elegant way to say "this object is turned this much around that axis."

"Kinematics" is just a fancy word for describing motion, but without worrying about the forces that *cause* the motion. So, we're not asking *why* the rocket is spinning, just *how* it's spinning and how its orientation changes as a result.

So, "Quaternion kinematics — q̇ = ½Ξ(q)ω" is simply a mathematical rule that tells us how fast a quaternion (our orientation tracker) is changing (that's q̇, pronounced "q-dot") based on its current orientation (q) and how fast the object is spinning (ω, pronounced "omega"). It's the fundamental equation for tracking an object's orientation over time using quaternions.

## 2. Why it matters — real-world applications

This equation is absolutely central to anything that needs to precisely track or control the orientation of an object in 3D space, especially in aerospace.

1.  **Spacecraft Attitude Determination and Control (ADACS/GNC):** Every satellite, rocket, and space probe needs to know exactly which way it's pointing and how its orientation is changing. This equation is the heart of the software that processes sensor data (like gyroscopes) to update the spacecraft's estimated orientation quaternion. Companies like SpaceX, Boeing, and NASA use this for everything from pointing antennas to maneuvering for docking.
2.  **Inertial Navigation Systems (INS) for Aircraft and Drones:** Modern aircraft, drones, and even some advanced cars use INS to track their position and orientation without relying on external signals like GPS for short periods. Gyroscopes measure angular velocity (ω), and this equation is used to integrate that data over time to continuously update the vehicle's orientation quaternion. This is critical for autonomous flight and precision navigation.
3.  **Robotics and Humanoid Robots:** For a robotic arm to grasp an object or a humanoid robot to maintain balance, it needs to precisely track the orientation of its various joints and end-effectors. Quaternions offer a robust and computationally efficient way to do this. Companies like Boston Dynamics and ABB integrate this into their control systems for smooth, singularity-free motion planning.
4.  **Virtual Reality (VR) and Augmented Reality (AR):** Headsets like the Oculus Quest or Apple Vision Pro track the user's head orientation to render the virtual world correctly. Inertial Measurement Units (IMUs) in these devices provide angular velocity data, which is then fed into this quaternion kinematic equation to update the virtual camera's orientation in real-time, providing an immersive experience.
5.  **Computer Graphics and Animation:** Animators use quaternions to define rotations of characters, cameras, and objects because they avoid issues like "gimbal lock" (which we'll discuss later) and allow for smooth, predictable interpolation between different orientations. Game engines like Unity and Unreal Engine use quaternions extensively for object rotations.

## 3. Prerequisites — what you must know first

Before diving deep into quaternion kinematics, ensure you have a solid grasp of these fundamental concepts:

*   **Vectors:** Quantities with both magnitude and direction (e.g., position, velocity, force).
*   **Matrices:** Rectangular arrays of numbers used to represent linear transformations and systems of equations. You should be comfortable with matrix multiplication.
*   **Calculus (Derivatives):** The concept of a rate of change, denoted by a dot over a variable (e.g., $\dot{x}$ for velocity, $\dot{q}$ for the rate of change of a quaternion).
*   **3D Rotations (Basics):** How objects rotate in three dimensions, including concepts like rotation axis, angle of rotation, and different representations like Euler angles and rotation matrices.
*   **Quaternions (Fundamentals):** What a quaternion is ($q = q_0 + q_1\mathbf{i} + q_2\mathbf{j} + q_3\mathbf{k}$), its scalar ($q_0$) and vector ($\mathbf{q}_v = [q_1, q_2, q_3]^T$) parts, how to multiply two quaternions, find their inverse, and normalize them (i.e., ensure its magnitude is 1).
*   **Angular Velocity:** A vector that describes how fast an object is rotating and about which axis. For a rigid body, it's typically expressed in the body's own coordinate frame.

## 4. The core idea — step by step

The core idea is to find a way to continuously update an object's orientation using its rotational speed, in a way that is robust, efficient, and avoids common pitfalls.

### Step 1: The Problem with Traditional Rotation Representations

*   **Plain English:** Imagine you're trying to describe how an airplane is oriented. You could use three angles: roll, pitch, and yaw (Euler angles). But sometimes, if the airplane points straight up or down, two of these angles become redundant, making it impossible to uniquely describe certain rotations. This is called "gimbal lock." Another way is to use a 3x3 rotation matrix, which works well but uses 9 numbers to describe 3 degrees of freedom, leading to redundancy and potential numerical drift.
*   **Small concrete example:** If an airplane is flying straight up (pitch = 90 degrees), trying to define its roll and yaw becomes ambiguous. Rolling left or right changes both the roll and yaw angles simultaneously in a confusing way. Mathematically, the transformation becomes singular.
*   **Formal/Mathematical version:**
    *   **Euler Angles:** A sequence of three rotations about principal axes (e.g., Z-Y-X or X-Y-Z). While intuitive, they suffer from **gimbal lock**, where two of the axes align, losing a degree of freedom. This makes it impossible to uniquely represent certain orientations and causes issues in smooth interpolation.
    *   **Rotation Matrices:** A $3 \times 3$ matrix $R$ where $R^T R = I$ and $\det(R) = 1$. They have 9 elements but only 3 degrees of freedom. Maintaining orthogonality and unit determinant during integration (as orientation changes) requires complex re-normalization, which is computationally expensive and prone to numerical error.
*   **What could go wrong:** Using Euler angles in a system that requires continuous, singularity-free orientation tracking will inevitably lead to crashes or unpredictable behavior when gimbal lock occurs. Using rotation matrices without careful re-orthonormalization will lead to the matrix no longer representing a pure rotation, distorting the object.

### Step 2: Quaternions as a Superior Rotation Representation

*   **Plain English:** Quaternions are a clever mathematical tool that uses four numbers to represent a 3D rotation. They don't suffer from gimbal lock, are more compact than rotation matrices, and are computationally efficient for composition (combining rotations). Think of them as a "spin-friendly" way to store orientation.
*   **Small concrete example:** Instead of saying "roll 30 degrees, then pitch 45 degrees, then yaw 60 degrees," a quaternion simply says "this object is currently oriented this way." It's a direct representation of the final orientation, not a sequence of steps.
*   **Formal/Mathematical version:** A quaternion $q$ is defined as $q = q_0 + q_1\mathbf{i} + q_2\mathbf{j} + q_3\mathbf{k}$, where $q_0, q_1, q_2, q_3$ are real numbers, and $\mathbf{i}, \mathbf{j}, \mathbf{k}$ are imaginary units satisfying $\mathbf{i}^2 = \mathbf{j}^2 = \mathbf{k}^2 = \mathbf{ijk} = -1$. For rotations, we use **unit quaternions** where $||q||^2 = q_0^2 + q_1^2 + q_2^2 + q_3^2 = 1$. The scalar part is $q_0$ and the vector part is $\mathbf{q}_v = [q_1, q_2, q_3]^T$.
*   **What could go wrong:** Forgetting that quaternions used for rotation *must* be unit quaternions. If $||q|| \neq 1$, the quaternion no longer represents a pure rotation and will scale or distort the object. You must regularly normalize the quaternion.

### Step 3: Understanding Kinematics in this Context

*   **Plain English:** Kinematics here means studying how the quaternion (our orientation tracker) changes over time. We're given how fast the object is spinning (angular velocity), and we want to find the rate of change of its orientation. It's like asking: if a car is moving at 60 mph, how fast is its position changing?
*   **Small concrete example:** If a spacecraft is slowly rotating, its quaternion will change slowly. If it's tumbling rapidly, its quaternion will change very quickly. The rate of change of the quaternion, $\dot{q}$, directly reflects this rotational speed.
*   **Formal/Mathematical version:** If $q(t)$ represents the orientation quaternion at time $t$, then $\dot{q}(t) = \frac{dq}{dt}$ is the instantaneous rate of change of the quaternion with respect to time. This is what we need to compute to update the orientation.
*   **What could go wrong:** Confusing kinematics (describing motion) with dynamics (describing forces that *cause* motion). Here, we are given the angular velocity (the motion) and want to find the change in orientation, not calculate the forces required to achieve that angular velocity.

### Step 4: Introducing Angular Velocity and its Quaternion Representation

*   **Plain English:** Every spinning object has an angular velocity, which tells us both the axis it's spinning around and how fast it's spinning. We usually measure this in the object's own coordinate frame (the "body frame"). To make it play nicely with quaternions, we'll represent this 3D angular velocity vector as a special kind of quaternion.
*   **Small concrete example:** A gyroscope on a drone measures its angular velocity, say, 1 rad/s around its roll axis, 0.5 rad/s around its pitch axis, and 0.1 rad/s around its yaw axis. This gives us a vector $\omega = [1, 0.5, 0.1]^T$. We then convert this into a "pure vector quaternion" by setting its scalar part to zero: $\omega_q = [0, 1, 0.5, 0.1]^T$.
*   **Formal/Mathematical version:** Let $\omega = [\omega_x, \omega_y, \omega_z]^T$ be the angular velocity vector of the body frame with respect to the inertial frame, expressed in the body frame. We represent this as a pure vector quaternion $\omega_q = [0, \omega_x, \omega_y, \omega_z]^T$.
*   **What could go wrong:** Using an angular velocity vector expressed in the *inertial frame* directly in the equation. The standard kinematic equation $q̇ = ½q \otimes \omega_q$ assumes $\omega$ is measured in the *body frame*. If you have inertial frame angular velocity, you must first transform it to the body frame.

### Step 5: The Quaternion Derivative Formula

*   **Plain English:** This is the heart of it! The rate at which the orientation quaternion changes ($\dot{q}$) is directly proportional to its current orientation ($q$) and the object's angular velocity ($\omega$). The "half" factor and the quaternion multiplication make sure everything works out correctly.
*   **Small concrete example:** If your current orientation is $q = [1, 0, 0, 0]$ (no rotation) and your angular velocity is $\omega_q = [0, 0.1, 0, 0]$ (small rotation around x-axis), then $\dot{q}$ will be a small quaternion indicating a change mainly in the $q_1$ component, causing the object to start rolling.
*   **Formal/Mathematical version:** The quaternion kinematic equation is:
    $$ \dot{q} = \frac{1}{2} q \otimes \omega_q $$
    where $q$ is the unit quaternion representing the current orientation, $\omega_q = [0, \omega_x, \omega_y, \omega_z]^T$ is the angular velocity vector represented as a pure quaternion, and $\otimes$ denotes quaternion multiplication.
*   **What could go wrong:** Incorrectly performing the quaternion multiplication. Quaternion multiplication is not commutative ($q \otimes \omega_q \neq \omega_q \otimes q$). Also, forgetting the factor of $1/2$.

### Step 6: The Matrix Form for Calculation

*   **Plain English:** While quaternion multiplication is defined, it can be a bit cumbersome to do by hand or mentally. We can represent the multiplication by $\omega_q$ (or $q$) as a matrix operation. This makes it easier to implement in computer code and to see the structure of the equation. The matrix $\Xi(q)$ (sometimes called $\Omega(\omega)$ or $Q(q)$ depending on convention) effectively "packages" the quaternion multiplication into a standard matrix-vector product.
*   **Small concrete example:** Instead of calculating $q \otimes \omega_q$ element by element, we can write $\dot{q} = \frac{1}{2} \Xi(q) \omega$, where $\omega$ is now the 3D vector $[\omega_x, \omega_y, \omega_z]^T$, and $\Xi(q)$ is a $4 \times 3$ matrix derived from the components of $q$.
*   **Formal/Mathematical version:**
    If $q = [q_0, q_1, q_2, q_3]^T$ and $\omega = [\omega_x, \omega_y, \omega_z]^T$, then the quaternion kinematic equation can be written as:
    $$ \dot{q} = \frac{1}{2} \begin{pmatrix} -q_1 & -q_2 & -q_3 \\ q_0 & -q_3 & q_2 \\ q_3 & q_0 & -q_1 \\ -q_2 & q_1 & q_0 \end{pmatrix} \begin{pmatrix} \omega_x \\ \omega_y \\ \omega_z \end{pmatrix} $$
    The $4 \times 3$ matrix is often denoted as $\Xi(q)$ or $Q_L(q)$ (for left multiplication).
    Alternatively, one can define a $4 \times 4$ matrix $\Omega(\omega_q)$ such that $q \otimes \omega_q = \Omega(\omega_q)q$, but the $4 \times 3$ matrix relating $\dot{q}$ directly to the 3-vector $\omega$ is more common for this specific equation.
    Let's define the $\Xi(q)$ matrix more explicitly, which is derived from the quaternion product $q \otimes \omega_q$:
    If $q = q_0 + q_1\mathbf{i} + q_2\mathbf{j} + q_3\mathbf{k}$ and $\omega_q = 0 + \omega_x\mathbf{i} + \omega_y\mathbf{j} + \omega_z\mathbf{k}$, then their product $q \otimes \omega_q$ is:
    $$ q \otimes \omega_q = \begin{pmatrix} q_0 & -q_1 & -q_2 & -q_3 \\ q_1 & q_0 & -q_3 & q_2 \\ q_2 & q_3 & q_0 & -q_1 \\ q_3 & -q_2 & q_1 & q_0 \end{pmatrix} \begin{pmatrix} 0 \\ \omega_x \\ \omega_y \\ \omega_z \end{pmatrix} $$
    This simplifies to:
    $$ q \otimes \omega_q = \begin{pmatrix} -q_1\omega_x - q_2\omega_y - q_3\omega_z \\ q_0\omega_x - q_3\omega_y + q_2\omega_z \\ q_3\omega_x + q_0\omega_y - q_1\omega_z \\ -q_2\omega_x + q_1\omega_y + q_0\omega_z \end{pmatrix} $$
    Comparing this with the $4 \times 3$ matrix form, we can identify $\Xi(q)$ as:
    $$ \Xi(q) = \begin{pmatrix} -q_1 & -q_2 & -q_3 \\ q_0 & -q_3 & q_2 \\ q_3 & q_0 & -q_1 \\ -q_2 & q_1 & q_0 \end{pmatrix} $$
    So, $\dot{q} = \frac{1}{2} \Xi(q) \omega$. This is the form most commonly used for computation.
*   **What could go wrong:** Incorrectly constructing the $\Xi(q)$ matrix, especially sign errors or misplaced elements. There are variations in how this matrix is defined in literature (e.g., some define it for $\omega_q \otimes q$ or with different sign conventions), so always be consistent with your chosen definition.

## 5. Worked examples — multiple, with every step shown

### Example 1: Calculate $\dot{q}$ for a given $q$ and $\omega$

**Problem:** A spacecraft has an current orientation represented by the quaternion $q = [0.707, 0, 0.707, 0]^T$. It is rotating with an angular velocity of $\omega = [0.1, 0.2, 0.3]^T$ rad/s in its body frame. Calculate the rate of change of its orientation quaternion, $\dot{q}$.

**Given:**
*   Quaternion $q = [q_0, q_1, q_2, q_3]^T = [0.707, 0, 0.707, 0]^T$
*   Angular velocity $\omega = [\omega_x, \omega_y, \omega_z]^T = [0.1, 0.2, 0.3]^T$ rad/s

**Wanted:** $\dot{q}$

**Solution:**

1.  **Recall the quaternion kinematic equation:**
    $$ \dot{q} = \frac{1}{2} \Xi(q) \omega $$
    *This is the fundamental formula we need to apply.*

2.  **Construct the $\Xi(q)$ matrix using the given quaternion components:**
    The matrix $\Xi(q)$ is defined as:
    $$ \Xi(q) = \begin{pmatrix} -q_1 & -q_2 & -q_3 \\ q_0 & -q_3 & q_2 \\ q_3 & q_0 & -q_1 \\ -q_2 & q_1 & q_0 \end{pmatrix} $$
    Substitute $q_0 = 0.707$, $q_1 = 0$, $q_2 = 0.707$, $q_3 = 0$:
    $$ \Xi(q) = \begin{pmatrix} -0 & -0.707 & -0 \\ 0.707 & -0 & 0.707 \\ 0 & 0.707 & -0 \\ -0.707 & 0 & 0.707 \end{pmatrix} = \begin{pmatrix} 0 & -0.707 & 0 \\ 0.707 & 0 & 0.707 \\ 0 & 0.707 & 0 \\ -0.707 & 0 & 0.707 \end{pmatrix} $$
    *We are plugging the specific values of $q_0, q_1, q_2, q_3$ into the matrix template.*

3.  **Perform the matrix-vector multiplication $\Xi(q) \omega$:**
    $$ \Xi(q) \omega = \begin{pmatrix} 0 & -0.707 & 0 \\ 0.707 & 0 & 0.707 \\ 0 & 0.707 & 0 \\ -0.707 & 0 & 0.707 \end{pmatrix} \begin{pmatrix} 0.1 \\ 0.2 \\ 0.3 \end{pmatrix} $$
    $$ = \begin{pmatrix} (0)(0.1) + (-0.707)(0.2) + (0)(0.3) \\ (0.707)(0.1) + (0)(0.2) + (0.707)(0.3) \\ (0)(0.1) + (0.707)(0.2) + (0)(0.3) \\ (-0.707)(0.1) + (0)(0.2) + (0.707)(0.3) \end{pmatrix} $$
    $$ = \begin{pmatrix} -0.1414 \\ 0.0707 + 0.2121 \\ 0.1414 \\ -0.0707 + 0.2121 \end{pmatrix} = \begin{pmatrix} -0.1414 \\ 0.2828 \\ 0.1414 \\ 0.1414 \end{pmatrix} $$
    *This is standard matrix multiplication. Each row of the matrix is multiplied by the column vector, summing the products.*

4.  **Multiply by the scalar factor of $\frac{1}{2}$:**
    $$ \dot{q} = \frac{1}{2} \begin{pmatrix} -0.1414 \\ 0.2828 \\ 0.1414 \\ 0.1414 \end{pmatrix} = \begin{pmatrix} -0.0707 \\ 0.1414 \\ 0.0707 \\ 0.0707 \end{pmatrix} $$
    *The final step is to apply the $1/2$ factor from the kinematic equation.*

**Final Answer:**
$$ \boxed{\dot{q} = \begin{pmatrix} -0.0707 \\ 0.1414 \\ 0.0707 \\ 0.0707 \end{pmatrix}} $$

**Reflection:** This example was straightforward, primarily testing the ability to correctly set up the $\Xi(q)$ matrix and perform matrix-vector multiplication. The initial quaternion $q$ was chosen to be a simple rotation (90 degrees around the Y-axis, since $q_0 = q_2 = \cos(45^\circ) = \sqrt{2}/2 \approx 0.707$).

---

### Example 2: Calculate $\dot{q}$ using quaternion multiplication

**Problem:** A drone's orientation is given by $q = [0.8, 0.3, 0.4, 0.3]^T$. Its body-frame angular velocity is $\omega = [-0.5, 0.1, 0.2]^T$ rad/s. Calculate $\dot{q}$ using the direct quaternion multiplication form.

**Given:**
*   Quaternion $q = [q_0, q_1, q_2, q_3]^T = [0.8, 0.3, 0.4, 0.3]^T$
*   Angular velocity $\omega = [\omega_x, \omega_y, \omega_z]^T = [-0.5, 0.1, 0.2]^T$ rad/s

**Wanted:** $\dot{q}$

**Solution:**

1.  **Recall the quaternion kinematic equation (quaternion product form):**
    $$ \dot{q} = \frac{1}{2} q \otimes \omega_q $$
    *This is the alternative form of the fundamental equation.*

2.  **Represent the angular velocity as a pure quaternion $\omega_q$:**
    $$ \omega_q = [0, \omega_x, \omega_y, \omega_z]^T = [0, -0.5, 0.1, 0.2]^T $$
    *The scalar part of a pure vector quaternion is always zero.*

3.  **Perform quaternion multiplication $q \otimes \omega_q$:**
    Let $q = q_0 + q_1\mathbf{i} + q_2\mathbf{j} + q_3\mathbf{k}$ and $\omega_q = \omega_{q0} + \omega_{q1}\mathbf{i} + \omega_{q2}\mathbf{j} + \omega_{q3}\mathbf{k}$.
    The product $q \otimes \omega_q$ is given by:
    $$ (q_0\omega_{q0} - q_1\omega_{q1} - q_2\omega_{q2} - q_3\omega_{q3}) + (q_0\omega_{q1} + q_1\omega_{q0} + q_2\omega_{q3} - q_3\omega_{q2})\mathbf{i} + (q_0\omega_{q2} - q_1\omega_{q3} + q_2\omega_{q0} + q_3\omega_{q1})\mathbf{j} + (q_0\omega_{q3} + q_1\omega_{q2} - q_2\omega_{q1} + q_3\omega_{q0})\mathbf{k} $$
    Substitute $q_0=0.8, q_1=0.3, q_2=0.4, q_3=0.3$ and $\omega_{q0}=0, \omega_{q1}=-0.5, \omega_{q2}=0.1, \omega_{q3}=0.2$:

    *   Scalar part $(q \otimes \omega_q)_0$:
        $$(0.8)(0) - (0.3)(-0.5) - (0.4)(0.1) - (0.3)(0.2)$$
        $$= 0 + 0.15 - 0.04 - 0.06 = 0.05$$

    *   $\mathbf{i}$ part $(q \otimes \omega_q)_1$:
        $$(0.8)(-0.5) + (0.3)(0) + (0.4)(0.2) - (0.3)(0.1)$$
        $$= -0.4 + 0 + 0.08 - 0.03 = -0.35$$

    *   $\mathbf{j}$ part $(q \otimes \omega_q)_2$:
        $$(0.8)(0.1) - (0.3)(0.2) + (0.4)(0) + (0.3)(-0.5)$$
        $$= 0.08 - 0.06 + 0 - 0.15 = -0.13$$

    *   $\mathbf{k}$ part $(q \otimes \omega_q)_3$:
        $$(0.8)(0.2) + (0.3)(0.1) - (0.4)(-0.5) + (0.3)(0)$$
        $$= 0.16 + 0.03 + 0.2 + 0 = 0.39$$

    So, $q \otimes \omega_q = [0.05, -0.35, -0.13, 0.39]^T$.
    *This step involves careful application of the quaternion multiplication rule. It's easy to make sign errors or mix up terms.*

4.  **Multiply by the scalar factor of $\frac{1}{2}$:**
    $$ \dot{q} = \frac{1}{2} \begin{pmatrix} 0.05 \\ -0.35 \\ -0.13 \\ 0.39 \end{pmatrix} = \begin{pmatrix} 0.025 \\ -0.175 \\ -0.065 \\ 0.195 \end{pmatrix} $$
    *Finally, apply the $1/2$ factor.*

**Final Answer:**
$$ \boxed{\dot{q} = \begin{pmatrix} 0.025 \\ -0.175 \\ -0.065 \\ 0.195 \end{pmatrix}} $$

**Reflection:** This example demonstrates the quaternion product method, which is mathematically equivalent to the matrix form but requires careful attention to the multiplication rules. It's a good way to double-check understanding of quaternion algebra. A common trap is misremembering the signs in the quaternion product formula.

---

### Example 3: One step of Euler integration and normalization

**Problem:** A rocket starts with an initial orientation $q_{initial} = [1, 0, 0, 0]^T$ (identity quaternion, no rotation). It experiences a constant angular velocity of $\omega = [0.02, 0.01, -0.03]^T$ rad/s for a small time step $\Delta t = 0.1$ seconds. Estimate its new orientation $q_{new}$ after this time step using Euler integration, and then normalize the result.

**Given:**
*   Initial quaternion $q_{initial} = [1, 0, 0, 0]^T$
*   Angular velocity $\omega = [0.02, 0.01, -0.03]^T$ rad/s
*   Time step $\Delta t = 0.1$ s

**Wanted:** $q_{new}$ (normalized)

**Solution:**

1.  **Calculate $\dot{q}$ at the initial state:**
    First, construct the $\Xi(q_{initial})$ matrix:
    $$ \Xi(q_{initial}) = \begin{pmatrix} -0 & -0 & -0 \\ 1 & -0 & 0 \\ 0 & 1 & -0 \\ -0 & 0 & 1 \end{pmatrix} = \begin{pmatrix} 0 & 0 & 0 \\ 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
    *We substitute $q_0=1, q_1=0, q_2=0, q_3=0$ into the $\Xi(q)$ matrix.*

    Now, calculate $\Xi(q_{initial})\omega$:
    $$ \Xi(q_{initial}) \omega = \begin{pmatrix} 0 & 0 & 0 \\ 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 0.02 \\ 0.01 \\ -0.03 \end{pmatrix} = \begin{pmatrix} 0 \\ 0.02 \\ 0.01 \\ -0.03 \end{pmatrix} $$
    *Standard matrix-vector multiplication.*

    Finally, calculate $\dot{q}$:
    $$ \dot{q} = \frac{1}{2} \begin{pmatrix} 0 \\ 0.02 \\ 0.01 \\ -0.03 \end{pmatrix} = \begin{pmatrix} 0 \\ 0.01 \\ 0.005 \\ -0.015 \end{pmatrix} $$
    *Apply the $1/2$ factor.*

2.  **Perform Euler integration to find the unnormalized new quaternion $q_{temp}$:**
    Euler integration formula: $q_{new} \approx q_{initial} + \dot{q} \Delta t$
    $$ q_{temp} = \begin{pmatrix} 1 \\ 0 \\ 0 \\ 0 \end{pmatrix} + \begin{pmatrix} 0 \\ 0.01 \\ 0.005 \\ -0.015 \end{pmatrix} (0.1) $$
    $$ q_{temp} = \begin{pmatrix} 1 \\ 0 \\ 0 \\ 0 \end{pmatrix} + \begin{pmatrix} 0 \\ 0.001 \\ 0.0005 \\ -0.0015 \end{pmatrix} = \begin{pmatrix} 1 \\ 0.001 \\ 0.0005 \\ -0.0015 \end{pmatrix} $$
    *This is a simple linear approximation of the change. For small $\Delta t$, it's reasonably accurate. For larger $\Delta t$, more advanced integration methods (like Runge-Kutta) would be needed.*

3.  **Normalize $q_{temp}$ to get $q_{new}$:**
    First, calculate the magnitude of $q_{temp}$:
    $$ ||q_{temp}|| = \sqrt{1^2 + (0.001)^2 + (0.0005)^2 + (-0.0015)^2} $$
    $$ ||q_{temp}|| = \sqrt{1 + 0.000001 + 0.00000025 + 0.00000225} $$
    $$ ||q_{temp}|| = \sqrt{1.0000045} \approx 1.00000225 $$
    *The magnitude will slightly deviate from 1 due to the linear approximation in Euler integration.*

    Now, divide each component of $q_{temp}$ by its magnitude:
    $$ q_{new} = \frac{1}{1.00000225} \begin{pmatrix} 1 \\ 0.001 \\ 0.0005 \\ -0.0015 \end{pmatrix} $$
    $$ q_{new} \approx \begin{pmatrix} 0.99999775 \\ 0.00099999775 \\ 0.00049999887 \\ -0.0014999966 \end{pmatrix} $$
    *Normalization ensures the quaternion remains a valid rotation representation. This is a critical step in any real-world application.*

**Final Answer:**
$$ \boxed{q_{new} \approx \begin{pmatrix} 0.99999775 \\ 0.00099999775 \\ 0.00049999887 \\ -0.0014999966 \end{pmatrix}} $$

**Reflection:** This example introduces the concept of integrating the kinematic equation over time and highlights the crucial step of normalizing the quaternion after each integration step. Without normalization, numerical errors would accumulate, causing the quaternion magnitude to drift away from 1, leading to incorrect rotations. The initial quaternion was chosen as the identity to simplify the initial $\Xi(q)$ matrix.

---

### Example 4: Angular velocity in a different frame (conceptual application)

**Problem:** A satellite's attitude is given by $q = [0.5, 0.5, -0.5, 0.5]^T$. A ground station measures its angular velocity in the *inertial frame* as $\omega_{inertial} = [0.03, -0.01, 0.02]^T$ rad/s. To use the kinematic equation $\dot{q} = \frac{1}{2}\Xi(q)\omega$, the angular velocity must be in the *body frame*. Calculate the body-frame angular velocity $\omega_{body}$ first, then find $\dot{q}$.

**Given:**
*   Quaternion $q = [0.5, 0.5, -0.5, 0.5]^T$ (representing rotation from inertial to body frame)
*   Inertial frame angular velocity $\omega_{inertial} = [0.03, -0.01, 0.02]^T$ rad/s

**Wanted:** $\dot{q}$

**Solution:**

1.  **Understand the relationship between inertial and body frame angular velocity:**
    The angular velocity measured in the inertial frame ($\omega_{inertial}$) and the angular velocity measured in the body frame ($\omega_{body}$) are related by the rotation matrix $R(q)$ that transforms vectors from the body frame to the inertial frame. Specifically, if $q$ represents the rotation from the inertial frame to the body frame (i.e., $v_{body} = q \otimes v_{inertial} \otimes q^{-1}$), then $\omega_{inertial} = R(q) \omega_{body}$.
    To get $\omega_{body}$ from $\omega_{inertial}$, we need to apply the inverse rotation: $\omega_{body} = R(q)^T \omega_{inertial}$ (since $R(q)^T = R(q)^{-1}$).
    The rotation matrix $R(q)$ from quaternion $q = [q_0, q_1, q_2, q_3]^T$ is:
    $$ R(q) = \begin{pmatrix} 1-2(q_2^2+q_3^2) & 2(q_1q_2-q_0q_3) & 2(q_1q_3+q_0q_2) \\ 2(q_1q_2+q_0q_3) & 1-2(q_1^2+q_3^2) & 2(q_2q_3-q_0q_1) \\ 2(q_1q_3-q_0q_2) & 2(q_2q_3+q_0q_1) & 1-2(q_1^2+q_2^2) \end{pmatrix} $$
    *This is a crucial step: the kinematic equation requires body-frame angular velocity. If it's given in another frame, it must be transformed.*

2.  **Calculate the rotation matrix $R(q)$ from $q$:**
    Given $q = [0.5, 0.5, -0.5, 0.5]^T$:
    *   $q_0 = 0.5$
    *   $q_1 = 0.5$
    *   $q_2 = -0.5$
    *   $q_3 = 0.5$

    $q_1^2 = 0.25$, $q_2^2 = 0.25$, $q_3^2 = 0.25$
    $q_0q_1 = 0.25$, $q_0q_2 = -0.25$, $q_0q_3 = 0.25$
    $q_1q_2 = -0.25$, $q_1q_3 = 0.25$
    $q_2q_3 = -0.25$

    $R_{11} = 1-2(q_2^2+q_3^2) = 1-2(0.25+0.25) = 1-2(0.5) = 0$
    $R_{12} = 2(q_1q_2-q_0q_3) = 2(-0.25-0.25) = 2(-0.5) = -1$
    $R_{13} = 2(q_1q_3+q_0q_2) = 2(0.25-0.25) = 0$

    $R_{21} = 2(q_1q_2+q_0q_3) = 2(-0.25+0.25) = 0$
    $R_{22} = 1-2(q_1^2+q_3^2) = 1-2(0.25+0.25) = 1-2(0.5) = 0$
    $R_{23} = 2(q_2q_3-q_0q_1) = 2(-0.25-0.25) = 2(-0.5) = -1$

    $R_{31} = 2(q_1q_3-q_0q_2) = 2(0.25-(-0.25)) = 2(0.5) = 1$
    $R_{32} = 2(q_2q_3+q_0q_1) = 2(-0.25+0.25) = 0$
    $R_{33} = 1-2(q_1^2+q_2^2) = 1-2(0.25+0.25) = 1-2(0.5) = 0$

    So, $R(q) = \begin{pmatrix} 0 & -1 & 0 \\ 0 & 0 & -1 \\ 1 & 0 & 0 \end{pmatrix}$.
    *This is a specific rotation matrix. It's a common source of error to make mistakes in this calculation.*

3.  **Calculate $\omega_{body}$:**
    $\omega_{body} = R(q)^T \omega_{inertial}$
    $$ R(q)^T = \begin{pmatrix} 0 & 0 & 1 \\ -1 & 0 & 0 \\ 0 & -1 & 0 \end{pmatrix} $$
    $$ \omega_{body} = \begin{pmatrix} 0 & 0 & 1 \\ -1 & 0 & 0 \\ 0 & -1 & 0 \end{pmatrix} \begin{pmatrix} 0.03 \\ -0.01 \\ 0.02 \end{pmatrix} $$
    $$ \omega_{body} = \begin{pmatrix} (0)(0.03) + (0)(-0.01) + (1)(0.02) \\ (-1)(0.03) + (0)(-0.01) + (0)(0.02) \\ (0)(0.03) + (-1)(-0.01) + (0)(0.02) \end{pmatrix} = \begin{pmatrix} 0.02 \\ -0.03 \\ 0.01 \end{pmatrix} $$
    *We use the transpose of the rotation matrix to transform from inertial to body frame.*

4.  **Construct the $\Xi(q)$ matrix for the given $q$:**
    Given $q = [0.5, 0.5, -0.5, 0.5]^T$:
    $$ \Xi(q) = \begin{pmatrix} -q_1 & -q_2 & -q_3 \\ q_0 & -q_3 & q_2 \\ q_3 & q_0 & -q_1 \\ -q_2 & q_1 & q_0 \end{pmatrix} = \begin{pmatrix} -0.5 & 0.5 & -0.5 \\ 0.5 & -0.5 & -0.5 \\ 0.5 & 0.5 & -0.5 \\ 0.5 & 0.5 & 0.5 \end{pmatrix} $$
    *Plug in the components of $q$ into the matrix template.*

5.  **Perform the matrix-vector multiplication $\Xi(q) \omega_{body}$:**
    $$ \Xi(q) \omega_{body} = \begin{pmatrix} -0.5 & 0.5 & -0.5 \\ 0.5 & -0.5 & -0.5 \\ 0.5 & 0.5 & -0.5 \\ 0.5 & 0.5 & 0.5 \end{pmatrix} \begin{pmatrix} 0.02 \\ -0.03 \\ 0.01 \end{pmatrix} $$
    $$ = \begin{pmatrix} (-0.5)(0.02) + (0.5)(-0.03) + (-0.5)(0.01) \\ (0.5)(0.02) + (-0.5)(-0.03) + (-0.5)(0.01) \\ (0.5)(0.02) + (0.5)(-0.03) + (-0.5)(0.01) \\ (0.5)(0.02) + (0.5)(-0.03) + (0.5)(0.01) \end{pmatrix} $$
    $$ = \begin{pmatrix} -0.01 - 0.015 - 0.005 \\ 0.01 + 0.015 - 0.005 \\ 0.01 - 0.015 - 0.005 \\ 0.01 - 0.015 + 0.005 \end{pmatrix} = \begin{pmatrix} -0.03 \\ 0.02 \\ -0.01 \\ 0 \end{pmatrix} $$
    *Standard matrix multiplication.*

6.  **Multiply by the scalar factor of $\frac{1}{2}$:**
    $$ \dot{q} = \frac{1}{2} \begin{pmatrix} -0.03 \\ 0.02 \\ -0.01 \\ 0 \end{pmatrix} = \begin{pmatrix} -0.015 \\ 0.01 \\ -0.005 \\ 0 \end{pmatrix} $$
    *Final application of the $1/2$ factor.*

**Final Answer:**
$$ \boxed{\dot{q} = \begin{pmatrix} -0.015 \\ 0.01 \\ -0.005 \\ 0 \end{pmatrix}} $$

**Reflection:** This example highlights a critical practical consideration: the frame of reference for the angular velocity. The quaternion kinematic equation is typically formulated for body-frame angular velocity. If $\omega$ is provided in another frame (like the inertial frame here), it must first be transformed into the body frame using the current orientation quaternion. This adds a significant layer of calculation involving the rotation matrix derived from the quaternion.

## 6. Common mistakes and traps

1.  **Forgetting Quaternion Normalization:** After integrating $\dot{q}$ over time (e.g., using Euler integration), the resulting quaternion will almost certainly have a magnitude slightly different from 1 due to numerical errors. Failing to re-normalize it will cause the quaternion to drift, leading to incorrect attitude representation and potential scaling of transformed vectors.
2.  **Incorrect Quaternion Multiplication Order:** Quaternion multiplication is not commutative ($q_a \otimes q_b \neq q_b \otimes q_a$). The kinematic equation is $\dot{q} = \frac{1}{2} q \otimes \omega_q$. Swapping the order to $\frac{1}{2} \omega_q \otimes q$ will yield an incorrect result.
3.  **Sign Errors in the $\Xi(q)$ Matrix:** The $\Xi(q)$ matrix (or $Q_L(q)$) has a specific pattern of signs and quaternion components. It's very easy to misplace a negative sign or a $q_0$ vs. $q_1$ component, leading to incorrect $\dot{q}$ calculations. Double-check the matrix definition.
4.  **Confusing Body-Frame and Inertial-Frame Angular Velocity:** The angular velocity $\omega$ in $q̇ = ½Ξ(q)ω$ *must* be the angular velocity of the body frame with respect to the inertial frame, expressed in the *body frame*. If you are given $\omega$ in the inertial frame, you must first rotate it into the body frame using the current quaternion.
5.  **Forgetting the Factor of $\frac{1}{2}$:** The equation includes a factor of $\frac{1}{2}$. It's a common oversight to forget this, leading to results that are twice the correct value.
6.  **Incorrectly Representing Angular Velocity as a Quaternion:** When using the quaternion product form ($q \otimes \omega_q$), the angular velocity $\omega$ must be represented as a pure quaternion $\omega_q = [0, \omega_x, \omega_y, \omega_z]^T$. Forgetting the zero scalar part or treating it as a standard quaternion with a non-zero scalar part will lead to errors.

## 7. Textbook-precise explanation

Let $q = q_0 + q_1\mathbf{i} + q_2\mathbf{j} + q_3\mathbf{k}$ be a unit quaternion representing the orientation of a rigid body's body-fixed coordinate frame $\{B\}$ with respect to an inertial coordinate frame $\{I\}$. The quaternion $q$ transforms a vector $\mathbf{r}_B$ in the body frame to a vector $\mathbf{r}_I$ in the inertial frame via the conjugation operation:
$$ \mathbf{r}_I = q \otimes \mathbf{r}_B \otimes q^{-1} $$
where $\mathbf{r}_B$ is treated as a pure quaternion $[0, \mathbf{r}_B^T]^T$.

Let $\omega = [\omega_x, \omega_y, \omega_z]^T$ be the angular velocity vector of the body frame $\{B\}$ relative to the inertial frame $\{I\}$, expressed in the body frame $\{B\}$. This angular velocity can be represented as a pure quaternion $\omega_q = [0, \omega_x, \omega_y, \omega_z]^T$.

The quaternion kinematic equation, which describes the rate of change of the orientation quaternion $\dot{q}$ as a function of the current orientation $q$ and the body-frame angular velocity $\omega$, is given by:
$$ \dot{q} = \frac{1}{2} q \otimes \omega_q $$
This equation can be expanded into a matrix-vector form for computational convenience. Let $q = [q_0, q_1, q_2, q_3]^T$ and $\omega = [\omega_x, \omega_y, \omega_z]^T$. Then, the quaternion derivative $\dot{q} = [\dot{q}_0, \dot{q}_1, \dot{q}_2, \dot{q}_3]^T$ can be expressed as:
$$ \dot{q} = \frac{1}{2} \begin{pmatrix} -q_1 & -q_2 & -q_3 \\ q_0 & -q_3 & q_2 \\ q_3 & q_0 & -q_1 \\ -q_2 & q_1 & q_0 \end{pmatrix} \begin{pmatrix} \omega_x \\ \omega_y \\ \omega_z \end{pmatrix} $$
The $4 \times 3$ matrix in this expression is often denoted as $\Xi(q)$ or $Q_{vec}(q)$, where the subscript 'vec' emphasizes its operation on a 3-vector angular velocity. Thus,
$$ \dot{q} = \frac{1}{2} \Xi(q) \omega $$
For continuous operation in real-time systems, the unit norm of the quaternion must be maintained. During numerical integration of $\dot{q}$ to obtain $q(t+\Delta t)$, small numerical errors accumulate, causing $||q|| \neq 1$. Therefore, periodic re-normalization of the quaternion is essential:
$$ q_{normalized} = \frac{q}{||q||} $$
This ensures that the quaternion continues to represent a pure rotation without scaling or distortion.

References:
*   Kuipers, Jack B. *Quaternions and Rotation Sequences: A Primer with Applications to Orbits, Aerospace, and Virtual Reality*. Princeton University Press, 1999. (Chapter 6: Quaternion Kinematics)
*   Shuster, Malcolm D. "A survey of attitude representations." *The Journal of the Astronautical Sciences* 41.4 (1993): 439-517. (Section 4.1.3: Quaternion Kinematics)
*   Sidi, Marcel J. *Spacecraft Dynamics and Control: A Practical Engineering Approach*. Cambridge University Press, 1997. (Chapter 6: Attitude Kinematics)

## 8. ASCII diagrams

Let's visualize the relationship between the inertial frame, body frame, and angular velocity.

```text
       Inertial Frame {I}
       ^ Z_I
       |
       |
       +------> X_I
      /
     /
    Y_I


       Body Frame {B} (rotated relative to {I})
       ^ Z_B
       |
       |  / (Angular Velocity vector omega)
       | /
       +------> X_B
      /
     /
    Y_B

Imagine a satellite. The Inertial Frame {I} is fixed in space (e.g., aligned with Earth's axes or a star field).
The Body Frame {B} is fixed to the satellite, rotating with it.
The quaternion 'q' describes the orientation of {B} relative to {I}.
The angular velocity vector 'omega' (ω) shows the axis and rate of rotation of {B} relative to {I},
but critically, 'omega' is expressed in the Body Frame {B} itself.

   +-------------------------------------------------+
   |                                                 |
   |   q (current orientation)                       |
   |   +-------------------------------------------> |   q_dot (rate of change of orientation)
   |   |                                             |
   |   |                                             |
   |   |                                             |
   |   |                                             |
   |   |                                             |
   |   |                                             |
   |   |                                             |
   |   |                                             |
   |   |                                             |
   |   v                                             |
   |                                                 |
   |   omega (body frame angular velocity)           |
   |                                                 |
   +-------------------------------------------------+
   
This diagram visually represents the inputs (q, omega) and output (q_dot) of the kinematic equation.
The current orientation 'q' and the current angular velocity 'omega' (in the body frame)
are used to calculate how the orientation 'q' is changing at that instant.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Imagine a **Q**uaternion **Dot** (q̇) is like a **Half**-eaten **Q**uiche **Omega**.
    *   **Q**uaternion **Dot** $\rightarrow \dot{q}$
    *   **Half** $\rightarrow \frac{1}{2}$
    *   **Q**uiche $\rightarrow q$ (the quaternion itself)
    *   **Omega** $\rightarrow \omega_q$ (the angular velocity quaternion)
    The "Quiche Omega" part also helps remember it's a *quaternion product* with angular velocity, not just a scalar multiplication.

2.  **Formulas/Facts to Overlearn:**
    *   **The Kinematic Equation:** $\dot{q} = \frac{1}{2} q \otimes \omega_q$ (or $\dot{q} = \frac{1}{2} \Xi(q) \omega$)
    *   **$\Xi(q)$ Matrix:**
        $$ \Xi(q) = \begin{pmatrix} -q_1 & -q_2 & -q_3 \\ q_0 & -q_3 & q_2 \\ q_3 & q_0 & -q_1 \\ -q_2 & q_1 & q_0 \end{pmatrix} $$
    *   **Normalization:** $q_{norm} = q / ||q||$ (must be applied after integration steps).
    *   **$\omega$ frame:** Angular velocity $\omega$ must be in the **body frame**.

3.  **Spaced-Repetition Schedule:**
    *   **Today:** Review this entire lesson. Work through all examples again.
    *   **1 Day Later:** Re-derive the $\Xi(q)$ matrix from the quaternion product. Try to write down the main equation and its conditions.
    *   **3 Days Later:** Solve a new problem from scratch, including normalization. Explain to yourself (or a rubber duck) why body-frame $\omega$ is used.
    *   **7 Days Later:** Write a short program (pseudo-code is fine) to implement one step of quaternion integration, including the $\Xi(q)$ matrix and normalization.
    *   **16 Days Later:** Explain the advantages of quaternions over Euler angles and rotation matrices in the context of kinematics.
    *   **35 Days Later:** Try to recall the full derivation pathway (below) without looking it up.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the exact form of $\dot{q} = \frac{1}{2} q \otimes \omega_q$, you can rebuild it from the definition of how quaternions rotate vectors and the definition of angular velocity. This is a more advanced derivation, but knowing the path is powerful:
    1.  Start with the quaternion rotation formula for a vector $\mathbf{r}$ (represented as a pure quaternion $r_q = [0, \mathbf{r}^T]^T$): $r_q(t) = q(t) \otimes r_{q, body} \otimes q^{-1}(t)$, where $r_{q, body}$ is the vector fixed in the body frame.
    2.  Differentiate this equation with respect to time, using the product rule for quaternion derivatives. This will introduce $\dot{q}$ and $\dot{q}^{-1}$.
    3.  Recall that $\dot{q}^{-1} = -q^{-1} \otimes \dot{q} \otimes q^{-1}$ (for unit quaternions).
    4.  Relate the time derivative of the vector in the inertial frame ($\dot{r}_q(t)$) to the angular velocity. The fundamental relationship is $\dot{\mathbf{r}}_I = \omega_I \times \mathbf{r}_I$, which can also be expressed with quaternions.
    5.  Through algebraic manipulation and careful identification of terms, you will arrive at the kinematic equation. This derivation is non-trivial and often involves several pages of algebra, but it's the ultimate source of the formula. (A good starting point for this derivation is often found by considering the definition of angular velocity as $\dot{R}R^T = [\omega_x]_\times$, where $[\omega_x]_\times$ is the skew-symmetric matrix of angular velocity, and relating $R$ to $q$).

## 10. Connections — what this leads to

Understanding quaternion kinematics is a foundational pillar that unlocks numerous advanced topics in aerospace engineering, robotics, and computational physics:

*   **Attitude Estimation Algorithms:** This equation is the core of how Inertial Measurement Units (IMUs) are processed. It's used within Kalman Filters, Extended Kalman Filters (EKF), Unscented Kalman Filters (UKF), and complementary filters to combine gyroscope data (which provides $\omega$) with accelerometer and magnetometer data to produce robust and accurate real-time attitude estimates for spacecraft, drones, and autonomous vehicles.
*   **Spacecraft Attitude Control Systems (ADACS/GNC):** Once the current attitude is known, control laws (e.g., PID controllers, LQR, sliding mode control) use this equation to determine the required angular acceleration (and thus torques) to steer the spacecraft to a desired orientation or maintain a stable one. The quaternion error kinematics are often used here.
*   **Rigid Body Dynamics Simulations:** To simulate how a rigid body (like a rocket or satellite) moves under the influence of forces and torques, you need to integrate both its translational motion (using Newton's laws) and its rotational motion. This quaternion kinematic equation is integrated alongside Euler's equations of motion for rigid bodies to fully describe the body's six degrees of freedom.
*   **Trajectory Planning and Control in Robotics:** For robotic manipulators or mobile robots, this equation is used to plan smooth, singularity-free rotational trajectories and to implement control loops that ensure the robot's end-effector or body follows the desired orientation path.
*   **Sensor Fusion:** In any system where multiple sensors (gyroscopes, accelerometers, magnetometers, GPS, cameras) are used to determine orientation, the quaternion kinematic equation provides the propagation model for the gyroscope data, which is then corrected by the other sensors in a sensor fusion framework.
*   **Modeling of Complex Systems:** From simulating the flight of a projectile with spin to modeling the dynamics of a satellite experiencing various disturbances, this equation is indispensable for accurately tracking and predicting rotational behavior.

## 11. Self-check questions

1.  A small CubeSat is initially oriented with $q = [0.999, 0.01, 0.03, -0.02]^T$. Its body-frame angular velocity is measured as $\omega = [0.05, -0.02, 0.01]^T$ rad/s. Calculate $\dot{q}$.
2.  Explain why Euler angles are generally avoided for continuous attitude propagation in aerospace applications, and how quaternions address this issue.
3.  Given $q = [0.707, 0.707, 0, 0]^T$ and $\omega = [0, 0, 0.1]^T$ rad/s. If you perform one step of Euler integration with $\Delta t = 0.5$ s, what is the *unnormalized* new quaternion $q_{temp}$?
4.  A navigation system outputs an angular velocity vector in the *inertial frame*, $\omega_{inertial} = [0.1, 0, 0]^T$ rad/s. The current orientation of the vehicle (body frame relative to inertial) is $q = [0, 0.707, 0, 0.707]^T$. What is the angular velocity vector $\omega_{body}$ that should be used in the quaternion kinematic equation? (Hint: You'll need to construct $R(q)$).
5.  Derive the scalar part of the $\dot{q}$ equation (i.e., $\dot{q}_0$) directly from the quaternion product $\frac{1}{2} q \otimes \omega_q$, assuming $q = q_0 + q_1\mathbf{i} + q_2\mathbf{j} + q_3\mathbf{k}$ and $\omega_q = 0 + \omega_x\mathbf{