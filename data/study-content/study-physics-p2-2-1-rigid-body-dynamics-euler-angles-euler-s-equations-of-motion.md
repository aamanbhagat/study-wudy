## 1. What it is — in plain English

Imagine you have a toy spaceship floating in space. How do you describe exactly how it's oriented? Is its nose pointing up, down, or sideways? Is it spinning? This is where Euler angles come in. They give us a way to describe any 3D orientation by performing three specific, sequential rotations. Think of it like giving directions: first, turn the spaceship around its vertical axis (like a pirouette), then tilt its nose up or down, and finally, spin it around its own nose-to-tail axis. These three turns, in a specific order, can get the spaceship into any possible orientation.

Now, once that spaceship is oriented and perhaps spinning, what happens if a tiny thruster fires, or if it bumps into something? How does its spin change? This is where Euler's equations of motion step in. They are like Newton's famous "F=ma" (force equals mass times acceleration) but for *rotation* in three dimensions. Instead of force, we have torque (which makes things twist); instead of mass, we have the moment of inertia (which measures resistance to twisting); and instead of linear acceleration, we have angular acceleration (how quickly the spin changes).

The clever part about Euler's equations is that they are written from the perspective of the *object itself*. Imagine you're inside the spaceship. From your point of view, the equations describing how you spin become much simpler because the spaceship's "resistance to spin" (its moment of inertia) doesn't change as you rotate. This makes it much easier to predict how the spaceship will tumble and turn when forces act on it.

So, in essence: Euler angles tell us *how an object is oriented*, and Euler's equations tell us *how that orientation changes over time* when torques are applied. Together, they form the bedrock for understanding how anything from a spinning top to a complex satellite moves in 3D space.

## 2. Why it matters — real-world applications

Understanding Euler angles and Euler's equations is fundamental to nearly all fields dealing with 3D motion and orientation.

1.  **Spacecraft Attitude Control (Aerospace):** Companies like **SpaceX** and **NASA** use these concepts daily. When a satellite needs to point its antenna at Earth, or a telescope needs to fix its gaze on a distant star, its orientation (attitude) must be precisely controlled. Euler angles provide the language to specify the desired attitude, and Euler's equations are used to design the control systems that fire thrusters or spin reaction wheels to achieve and maintain that attitude against disturbances.
2.  **Aircraft and Drone Flight Dynamics (Aerospace):** Every airplane, helicopter, and drone uses Euler angles (often called roll, pitch, and yaw) to describe its orientation relative to the ground. Pilots and autopilot systems rely on these angles to understand the aircraft's state. Euler's equations are then used in the design of the aircraft's control surfaces (ailerons, elevators, rudder) and in the flight control software to predict how the aircraft will respond to pilot inputs or atmospheric turbulence, ensuring stable and controllable flight.
3.  **Robotics and Computer Graphics (ML/Physics):** In robotics, particularly for multi-jointed robot arms or humanoid robots, Euler angles are used to define the orientation of each limb and the end effector (gripper). This allows engineers to program complex movements and ensure the robot can interact with its environment correctly. In computer graphics and animation (e.g., in game engines like **Unity** or **Unreal Engine**), Euler angles are a common way for artists and developers to rotate 3D models and characters, making them move realistically within virtual worlds. Euler's equations, or their underlying principles, are used to simulate physically accurate rotations for objects in these environments.
4.  **Inertial Navigation Systems (Physics/Aerospace):** Gyroscopes, accelerometers, and magnetometers are combined in Inertial Measurement Units (IMUs) to track the orientation and movement of objects without external references. These systems are crucial in submarines, missiles, and even smartphones. The raw data from gyroscopes (angular velocities) must be integrated and transformed using principles derived from Euler angles and Euler's equations to continuously update the object's orientation in real-time, providing critical navigation information.

## 3. Prerequisites — what you must know first

Before diving deep into Euler angles and Euler's equations, ensure you have a solid grasp of these fundamental concepts:

*   **Vectors and Vector Algebra:** Understanding vector addition, subtraction, dot products (scalar product), and cross products (vector product) is essential for describing positions, velocities, forces, torques, and angular momentum in 3D space.
*   **Newton's Laws of Motion:** Specifically, Newton's second law for linear motion ($\vec{F} = m\vec{a}$) and its rotational analogue ($\vec{\tau} = I\vec{\alpha}$ or $\vec{\tau} = \frac{d\vec{L}}{dt}$) are the foundation.
*   **Rotational Kinematics:** Concepts like angular position, angular velocity ($\vec{\omega}$), and angular acceleration ($\vec{\alpha}$) are crucial for describing how objects rotate.
*   **Torque ($\vec{\tau}$):** The rotational equivalent of force, defined as $\vec{\tau} = \vec{r} \times \vec{F}$, which causes changes in rotational motion.
*   **Moment of Inertia ($I$):** A measure of an object's resistance to changes in its rotational motion. For 3D rigid bodies, this becomes a tensor, not just a scalar.
*   **Angular Momentum ($\vec{L}$):** The rotational equivalent of linear momentum, defined as $\vec{L} = I\vec{\omega}$ (for simple cases) or more generally using the inertia tensor.
*   **Coordinate Systems and Transformations:** The ability to work with different coordinate systems (e.g., an inertial frame fixed in space vs. a body-fixed frame attached to the rotating object) and to transform vectors and tensors between them using rotation matrices.
*   **Matrix Algebra:** Understanding matrix multiplication, inverse, and transpose is necessary for working with rotation matrices and the inertia tensor.
*   **Calculus (Differential Equations):** The equations of motion are differential equations, requiring knowledge of derivatives and integration, especially with respect to time.

## 4. The core idea — step by step

### Step 1: The Problem of 3D Orientation

**Plain-English Statement:** Imagine you have a camera in space. How do you tell someone exactly which way it's pointing and how it's tilted? You can't just say "up" or "left" because "up" depends on your own perspective. We need a universal way to describe its orientation.

**Small Concrete Example:** Think of a simple arrow. If it's pointing along the positive X-axis, that's one orientation. If it's pointing along the positive Y-axis, that's another. But what if it's pointing diagonally, and also tilted? We need three independent pieces of information to fully specify its orientation in 3D space.

**Formal/Mathematical Version:** The orientation of a rigid body in 3D space can be uniquely described by three independent parameters. These parameters define a transformation from a fixed (inertial) coordinate system to a body-fixed coordinate system. This transformation is typically represented by a $3 \times 3$ rotation matrix $R$.
A point $\vec{r}_{\text{inertial}}$ in the inertial frame is related to its coordinates $\vec{r}_{\text{body}}$ in the body-fixed frame by:
$$ \vec{r}_{\text{inertial}} = R \vec{r}_{\text{body}} $$
where $R$ is an orthogonal matrix ($R^T R = I$) with determinant $+1$.

**What could go wrong:** Trying to describe 3D orientation with fewer than three parameters will lead to ambiguity or incomplete descriptions. Using parameters that are not independent (e.g., trying to describe 2D rotation with three angles) is redundant and can cause issues.

### Step 2: Introducing Euler Angles (The "What")

**Plain-English Statement:** Euler angles are a specific, standardized way to use three sequential rotations to achieve any desired 3D orientation. It's like a set of instructions: "First, spin around this axis; then, tilt around that axis; finally, spin around a third axis." Each rotation is around an axis that might have changed its orientation due to the previous rotation.

**Small Concrete Example:** Let's use the common Z-Y'-X'' sequence (also known as yaw, pitch, roll).
1.  **Yaw ($\phi$):** Rotate the object around the *initial* Z-axis (like turning your head left or right). This changes the X and Y axes.
2.  **Pitch ($\theta$):** Rotate the object around the *new* Y-axis (the Y'-axis, like tilting your head up or down). This changes the X and Z axes again.
3.  **Roll ($\psi$):** Rotate the object around the *newest* X-axis (the X''-axis, like tilting your head sideways).

**Formal/Mathematical Version:** There are several conventions for Euler angles, but the most common for analytical mechanics is the Z-X-Z convention (often called "classical" or "standard" Euler angles).
Let the inertial frame be $(X, Y, Z)$ and the body-fixed frame be $(x, y, z)$.
1.  **Precession ($\phi$):** Rotate the $(X, Y, Z)$ frame about the $Z$-axis by an angle $\phi$. This produces an intermediate frame $(x', y', z')$, where $z' = Z$. The rotation matrix is $R_Z(\phi)$.
2.  **Nutation ($\theta$):** Rotate the $(x', y', z')$ frame about the $x'$-axis (the "line of nodes") by an angle $\theta$. This produces a second intermediate frame $(x'', y'', z'')$, where $x'' = x'$. The rotation matrix is $R_{x'}(\theta)$.
3.  **Intrinsic Rotation ($\psi$):** Rotate the $(x'', y'', z'')$ frame about the $z''$-axis (which is the body's $z$-axis) by an angle $\psi$. This produces the final body-fixed frame $(x, y, z)$, where $z = z''$. The rotation matrix is $R_{z''}(\psi)$.

The full rotation matrix $R$ that transforms coordinates from the body frame to the inertial frame is the product of these three successive rotations:
$$ R = R_Z(\phi) R_{x'}(\theta) R_{z''}(\psi) $$
Each individual rotation matrix is:
$$ R_Z(\phi) = \begin{pmatrix} \cos\phi & -\sin\phi & 0 \\ \sin\phi & \cos\phi & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
$$ R_{x'}(\theta) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \cos\theta & -\sin\theta \\ 0 & \sin\theta & \cos\theta \end{pmatrix} $$
$$ R_{z''}(\psi) = \begin{pmatrix} \cos\psi & -\sin\psi & 0 \\ \sin\psi & \cos\psi & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
The final rotation matrix $R$ (from body to inertial) is $R_Z(\phi) R_{x'}(\theta) R_{z''}(\psi)$.
*Note: Some conventions define $R$ as the transformation from inertial to body, in which case it would be $R^{-1} = R^T$. The order of multiplication also depends on whether rotations are active or passive and which frame they are applied to.*

**What could go wrong:** The most common mistake is mixing up the order of rotations or the axes around which the rotations occur. Different conventions (e.g., Z-Y-X vs. Z-X-Z) yield different results. It's crucial to stick to one convention consistently. Another pitfall is **gimbal lock**, which occurs when two of the rotation axes become aligned, leading to a loss of one degree of freedom and ambiguity in the angle representation.

### Step 3: Angular Velocity in Body-Fixed Frame

**Plain-English Statement:** When an object is spinning and tumbling, its angular velocity ($\vec{\omega}$) is a vector describing its instantaneous axis of rotation and how fast it's spinning around that axis. For Euler's equations, it's most convenient to describe this angular velocity from the perspective of the object itself (in its body-fixed frame). We need to express $\vec{\omega}$ using the rates of change of the Euler angles ($\dot{\phi}, \dot{\theta}, \dot{\psi}$).

**Small Concrete Example:** Imagine a spinning top. It's precessing ($\dot{\phi}$), nutating ($\dot{\theta}$), and spinning on its own axis ($\dot{\psi}$). Each of these rates contributes to the total angular velocity. We need to sum up these contributions, making sure to express them all in the same coordinate system, usually the body-fixed frame.

**Formal/Mathematical Version:** The total angular velocity vector $\vec{\omega}$ is the sum of the angular velocities associated with each Euler angle rotation. However, these rotations occur about different axes in different intermediate frames. To express $\vec{\omega}$ in the body-fixed frame $(x, y, z)$, we must project each component onto the body axes.
Using the Z-X-Z convention:
1.  $\dot{\phi}$ is a rotation about the inertial $Z$-axis.
2.  $\dot{\theta}$ is a rotation about the $x'$-axis (the line of nodes).
3.  $\dot{\psi}$ is a rotation about the body $z$-axis.

We need to express the unit vectors for $Z$ and $x'$ in terms of the body-fixed unit vectors $(\hat{i}, \hat{j}, \hat{k})$.
The transformation yields:
$$ \vec{\omega} = \dot{\phi} \hat{Z} + \dot{\theta} \hat{x'} + \dot{\psi} \hat{k} $$
Converting $\hat{Z}$ and $\hat{x'}$ into the body frame $(\hat{i}, \hat{j}, \hat{k})$:
$$ \hat{Z} = \sin\theta \sin\psi \hat{i} + \sin\theta \cos\psi \hat{j} + \cos\theta \hat{k} $$
$$ \hat{x'} = \cos\psi \hat{i} - \sin\psi \hat{j} $$
Substituting these into the expression for $\vec{\omega}$ gives the components of $\vec{\omega}$ in the body-fixed frame:
$$ \omega_x = \dot{\phi} \sin\theta \sin\psi + \dot{\theta} \cos\psi $$
$$ \omega_y = \dot{\phi} \sin\theta \cos\psi - \dot{\theta} \sin\psi $$
$$ \omega_z = \dot{\phi} \cos\theta + \dot{\psi} $$
So, $\vec{\omega}_{\text{body}} = \omega_x \hat{i} + \omega_y \hat{j} + \omega_z \hat{k}$.

**What could go wrong:** A common error is simply adding $\dot{\phi}$, $\dot{\theta}$, and $\dot{\psi}$ as if they were all rotations about fixed, orthogonal axes, which they are not. Each rate must be projected onto the chosen coordinate system (usually the body frame) using the appropriate trigonometric factors.

### Step 4: Moment of Inertia Tensor

**Plain-English Statement:** For a simple object like a point mass, we use mass ($m$). For a simple rotating object like a wheel around a fixed axle, we use a scalar moment of inertia ($I$). But for a complex 3D object tumbling in space, its "resistance to rotation" depends on *which axis* it's trying to spin around. The moment of inertia tensor is a $3 \times 3$ matrix that captures this directional dependence of rotational inertia. It tells us how mass is distributed relative to all possible rotation axes.

**Small Concrete Example:** Imagine a brick. It's much easier to spin it around its longest axis than its shortest axis. The moment of inertia tensor quantifies this difference. If you pick a special set of axes (called principal axes), the tensor becomes diagonal, meaning the resistance to rotation around one axis is independent of the rotation around another.

**Formal/Mathematical Version:** For a rigid body, the angular momentum $\vec{L}$ is related to the angular velocity $\vec{\omega}$ by the moment of inertia tensor $I$:
$$ \vec{L} = I \vec{\omega} $$
In component form, if $\vec{\omega} = (\omega_x, \omega_y, \omega_z)^T$ and $\vec{L} = (L_x, L_y, L_z)^T$, then:
$$ \begin{pmatrix} L_x \\ L_y \\ L_z \end{pmatrix} = \begin{pmatrix} I_{xx} & I_{xy} & I_{xz} \\ I_{yx} & I_{yy} & I_{yz} \\ I_{zx} & I_{zy} & I_{zz} \end{pmatrix} \begin{pmatrix} \omega_x \\ \omega_y \\ \omega_z \end{pmatrix} $$
The components of the inertia tensor are defined as:
$$ I_{xx} = \int (y^2 + z^2) dm \quad I_{yy} = \int (x^2 + z^2) dm \quad I_{zz} = \int (x^2 + y^2) dm $$
$$ I_{xy} = I_{yx} = -\int xy \, dm \quad I_{xz} = I_{zx} = -\int xz \, dm \quad I_{yz} = I_{zy} = -\int yz \, dm $$
The off-diagonal terms are called products of inertia. The inertia tensor is symmetric ($I_{ij} = I_{ji}$).
Crucially, if we choose the body-fixed axes to align with the **principal axes of inertia**, then the products of inertia are zero, and the tensor becomes diagonal:
$$ I = \begin{pmatrix} I_1 & 0 & 0 \\ 0 & I_2 & 0 \\ 0 & 0 & I_3 \end{pmatrix} $$
where $I_1, I_2, I_3$ are the principal moments of inertia. This choice of axes *greatly simplifies* Euler's equations.

**What could go wrong:** Incorrectly assuming a scalar moment of inertia for 3D rotation, or failing to choose principal axes when deriving Euler's equations, which would lead to a much more complex form with off-diagonal terms.

### Step 5: Euler's Equations of Motion (The "How it Moves")

**Plain-English Statement:** These are the rotational equivalent of Newton's second law ($\vec{F}=m\vec{a}$), but adapted for rigid bodies in 3D. They tell us how the angular velocity of a spinning object changes when external torques act on it. The key insight is that we write these equations in a coordinate system that's *fixed to the object itself* (the body-fixed frame). This makes the moment of inertia tensor constant, simplifying the math, but introduces an extra term that accounts for the fact that the body frame is rotating.

**Small Concrete Example:** Imagine a satellite in space, initially spinning around its long axis. If a small thruster fires, creating a torque perpendicular to that axis, the satellite won't just speed up its spin. It will also start to wobble or precess because the torque tries to change the spin axis, and the existing angular momentum resists this change in a complex way. Euler's equations predict this wobbling motion.

**Formal/Mathematical Version:** Newton's second law for rotation states that the net external torque equals the rate of change of angular momentum:
$$ \vec{\tau}_{\text{inertial}} = \left(\frac{d\vec{L}}{dt}\right)_{\text{inertial}} $$
However, $\vec{L} = I \vec{\omega}$, and $I$ is constant only in the body-fixed frame. To take the time derivative of $\vec{L}$ in the inertial frame, while expressing $\vec{L}$ in the body frame, we use the rotating frame derivative formula:
$$ \left(\frac{d\vec{A}}{dt}\right)_{\text{inertial}} = \left(\frac{d\vec{A}}{dt}\right)_{\text{body}} + \vec{\omega} \times \vec{A} $$
Applying this to $\vec{L}$:
$$ \vec{\tau}_{\text{body}} = \left(\frac{d(I\vec{\omega})}{dt}\right)_{\text{body}} + \vec{\omega}_{\text{body}} \times (I\vec{\omega}_{\text{body}}) $$
Since $I$ is constant in the body frame, $(d(I\vec{\omega})/dt)_{\text{body}} = I (d\vec{\omega}/dt)_{\text{body}} = I \vec{\dot{\omega}}_{\text{body}}$.
Thus, Euler's equations in vector form are:
$$ \vec{\tau}_{\text{body}} = I \vec{\dot{\omega}}_{\text{body}} + \vec{\omega}_{\text{body}} \times (I\vec{\omega}_{\text{body}}) $$
If we choose the body-fixed axes to be the principal axes of inertia, then $I$ is diagonal ($I_1, I_2, I_3$). Let $\vec{\omega} = (\omega_x, \omega_y, \omega_z)^T$ and $\vec{\tau} = (\tau_x, \tau_y, \tau_z)^T$.
The scalar components of Euler's equations are:
$$ \tau_x = I_1 \dot{\omega}_x - (I_2 - I_3)\omega_y \omega_z $$
$$ \tau_y = I_2 \dot{\omega}_y - (I_3 - I_1)\omega_z \omega_x $$
$$ \tau_z = I_3 \dot{\omega}_z - (I_1 - I_2)\omega_x \omega_y $$

**What could go wrong:** The most frequent mistake is forgetting the crucial $\vec{\omega} \times (I\vec{\omega})$ term, which arises from the rotation of the body-fixed frame. This term accounts for gyroscopic effects and the precession/nutation observed in real-world spinning objects. Another error is attempting to use these equations in an inertial frame where the inertia tensor would be time-varying.

### Step 6: Free Precession of a Symmetric Top

**Plain-English Statement:** "Free precession" means an object is spinning without any external torques acting on it (like a perfectly balanced football thrown into the air, or a satellite after its engines cut off). A "symmetric top" is an object with two equal principal moments of inertia (e.g., a sphere, a cylinder, a discus, or a football). When such an object spins freely, it doesn't just spin around a fixed axis; its spin axis itself will slowly rotate around the angular momentum vector. This wobbling is called precession.

**Small Concrete Example:** Throw a perfectly balanced American football with a slight wobble. You'll see it spin primarily around its long axis, but that long axis itself will slowly trace a cone in space. This is free precession. The angular momentum vector (which is conserved because there are no external torques) remains fixed in space, but the angular velocity vector and the body's symmetry axis precess around it.

**Formal/Mathematical Version:** For free precession, $\vec{\tau} = 0$. For a symmetric top, we have $I_1 = I_2 \ne I_3$. Let's set $I_1 = I_2 = I_T$ (transverse moment of inertia) and $I_3 = I_A$ (axial moment of inertia).
Euler's equations become:
$$ 0 = I_T \dot{\omega}_x - (I_T - I_A)\omega_y \omega_z $$
$$ 0 = I_T \dot{\omega}_y - (I_A - I_T)\omega_z \omega_x $$
$$ 0 = I_A \dot{\omega}_z - (I_T - I_T)\omega_x \omega_y \implies I_A \dot{\omega}_z = 0 $$
From the last equation, $\dot{\omega}_z = 0$, which means $\omega_z$ is constant.
The first two equations can be rewritten as:
$$ \dot{\omega}_x = \frac{I_T - I_A}{I_T} \omega_y \omega_z $$
$$ \dot{\omega}_y = \frac{I_A - I_T}{I_T} \omega_z \omega_x = -\frac{I_T - I_A}{I_T} \omega_z \omega_x $$
Let $\Omega_p = \frac{I_A - I_T}{I_T} \omega_z$. This is the precession frequency.
Then, $\dot{\omega}_x = -\Omega_p \omega_y$ and $\dot{\omega}_y = \Omega_p \omega_x$.
These are the equations for simple harmonic motion. The solutions are:
$$ \omega_x(t) = A \cos(\Omega_p t + \delta) $$
$$ \omega_y(t) = A \sin(\Omega_p t + \delta) $$
This shows that the transverse components of $\vec{\omega}$ rotate in the body frame with angular frequency $\Omega_p$. This means the angular velocity vector $\vec{\omega}$ rotates around the body's $z$-axis (the symmetry axis) with this frequency. This is the phenomenon of free precession. The body's symmetry axis itself also precesses in space around the fixed angular momentum vector $\vec{L}$.

**What could go wrong:** Confusing the precession frequency $\Omega_p$ (which is the rate at which $\vec{\omega}$ rotates around the body's symmetry axis) with the body's spin rate $\omega_z$. Also, forgetting that $\vec{L}$ is conserved and fixed in space, while $\vec{\omega}$ is not necessarily fixed in space or aligned with $\vec{L}$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple Rotation Matrix (Easy)

**Problem Statement:** A rigid body's orientation is described by Euler angles (Z-Y-X convention, also known as Yaw-Pitch-Roll) with $\phi = 30^\circ$, $\theta = 45^\circ$, and $\psi = 60^\circ$. Calculate the rotation matrix $R$ that transforms coordinates from the body-fixed frame to the inertial frame.

**Given:**
*   Euler angles: $\phi = 30^\circ$, $\theta = 45^\circ$, $\psi = 60^\circ$
*   Convention: Z-Y-X (Yaw-Pitch-Roll)
**Want:** The rotation matrix $R_{\text{body} \to \text{inertial}}$.

**Solution:**
The Z-Y-X convention means the rotations are performed in the order:
1.  Rotation about the initial Z-axis by $\phi$ ($R_Z(\phi)$).
2.  Rotation about the *new* Y-axis by $\theta$ ($R_Y(\theta)$).
3.  Rotation about the *newest* X-axis by $\psi$ ($R_X(\psi)$).
The composite rotation matrix $R$ (from body to inertial) is given by the product $R_Z(\phi) R_Y(\theta) R_X(\psi)$.

**Step 1: Write down the individual rotation matrices.**
For a rotation around the Z-axis by $\phi$:
$$ R_Z(\phi) = \begin{pmatrix} \cos\phi & -\sin\phi & 0 \\ \sin\phi & \cos\phi & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
For a rotation around the Y-axis by $\theta$:
$$ R_Y(\theta) = \begin{pmatrix} \cos\theta & 0 & \sin\theta \\ 0 & 1 & 0 \\ -\sin\theta & 0 & \cos\theta \end{pmatrix} $$
For a rotation around the X-axis by $\psi$:
$$ R_X(\psi) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \cos\psi & -\sin\psi \\ 0 & \sin\psi & \cos\psi \end{pmatrix} $$
*Explanation: These are standard rotation matrices for rotations about the principal axes.*

**Step 2: Substitute the given angle values.**
$\phi = 30^\circ \implies \cos 30^\circ = \frac{\sqrt{3}}{2}$, $\sin 30^\circ = \frac{1}{2}$
$\theta = 45^\circ \implies \cos 45^\circ = \frac{\sqrt{2}}{2}$, $\sin 45^\circ = \frac{\sqrt{2}}{2}$
$\psi = 60^\circ \implies \cos 60^\circ = \frac{1}{2}$, $\sin 60^\circ = \frac{\sqrt{3}}{2}$

$$ R_Z(30^\circ) = \begin{pmatrix} \frac{\sqrt{3}}{2} & -\frac{1}{2} & 0 \\ \frac{1}{2} & \frac{\sqrt{3}}{2} & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
$$ R_Y(45^\circ) = \begin{pmatrix} \frac{\sqrt{2}}{2} & 0 & \frac{\sqrt{2}}{2} \\ 0 & 1 & 0 \\ -\frac{\sqrt{2}}{2} & 0 & \frac{\sqrt{2}}{2} \end{pmatrix} $$
$$ R_X(60^\circ) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \frac{1}{2} & -\frac{\sqrt{3}}{2} \\ 0 & \frac{\sqrt{3}}{2} & \frac{1}{2} \end{pmatrix} $$
*Explanation: We're plugging in the numerical values for the trigonometric functions to get concrete matrices.*

**Step 3: Multiply the matrices in the correct order.**
$R = R_Z(\phi) R_Y(\theta) R_X(\psi)$

First, calculate $R_Y(\theta) R_X(\psi)$:
$$ R_{YX} = \begin{pmatrix} \frac{\sqrt{2}}{2} & 0 & \frac{\sqrt{2}}{2} \\ 0 & 1 & 0 \\ -\frac{\sqrt{2}}{2} & 0 & \frac{\sqrt{2}}{2} \end{pmatrix} \begin{pmatrix} 1 & 0 & 0 \\ 0 & \frac{1}{2} & -\frac{\sqrt{3}}{2} \\ 0 & \frac{\sqrt{3}}{2} & \frac{1}{2} \end{pmatrix} $$
$$ R_{YX} = \begin{pmatrix}
\frac{\sqrt{2}}{2}(1) + 0(0) + \frac{\sqrt{2}}{2}(0) & \frac{\sqrt{2}}{2}(0) + 0(\frac{1}{2}) + \frac{\sqrt{2}}{2}(\frac{\sqrt{3}}{2}) & \frac{\sqrt{2}}{2}(0) + 0(-\frac{\sqrt{3}}{2}) + \frac{\sqrt{2}}{2}(\frac{1}{2}) \\
0(1) + 1(0) + 0(0) & 0(0) + 1(\frac{1}{2}) + 0(\frac{\sqrt{3}}{2}) & 0(0) + 1(-\frac{\sqrt{3}}{2}) + 0(\frac{1}{2}) \\
-\frac{\sqrt{2}}{2}(1) + 0(0) + \frac{\sqrt{2}}{2}(0) & -\frac{\sqrt{2}}{2}(0) + 0(\frac{1}{2}) + \frac{\sqrt{2}}{2}(\frac{\sqrt{3}}{2}) & -\frac{\sqrt{2}}{2}(0) + 0(-\frac{\sqrt{3}}{2}) + \frac{\sqrt{2}}{2}(\frac{1}{2})
\end{pmatrix} $$
$$ R_{YX} = \begin{pmatrix}
\frac{\sqrt{2}}{2} & \frac{\sqrt{6}}{4} & \frac{\sqrt{2}}{4} \\
0 & \frac{1}{2} & -\frac{\sqrt{3}}{2} \\
-\frac{\sqrt{2}}{2} & \frac{\sqrt{6}}{4} & \frac{\sqrt{2}}{4}
\end{pmatrix} $$
*Explanation: Matrix multiplication is associative, so we can multiply $R_Y$ and $R_X$ first, then multiply the result by $R_Z$. This helps manage the complexity.*

Now, multiply $R_Z(\phi)$ by $R_{YX}$:
$$ R = \begin{pmatrix} \frac{\sqrt{3}}{2} & -\frac{1}{2} & 0 \\ \frac{1}{2} & \frac{\sqrt{3}}{2} & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix}
\frac{\sqrt{2}}{2} & \frac{\sqrt{6}}{4} & \frac{\sqrt{2}}{4} \\
0 & \frac{1}{2} & -\frac{\sqrt{3}}{2} \\
-\frac{\sqrt{2}}{2} & \frac{\sqrt{6}}{4} & \frac{\sqrt{2}}{4}
\end{pmatrix} $$
$$ R = \begin{pmatrix}
\frac{\sqrt{3}}{2}\frac{\sqrt{2}}{2} + (-\frac{1}{2})(0) + 0(-\frac{\sqrt{2}}{2}) & \frac{\sqrt{3}}{2}\frac{\sqrt{6}}{4} + (-\frac{1}{2})(\frac{1}{2}) + 0(\frac{\sqrt{6}}{4}) & \frac{\sqrt{3}}{2}\frac{\sqrt{2}}{4} + (-\frac{1}{2})(-\frac{\sqrt{3}}{2}) + 0(\frac{\sqrt{2}}{4}) \\
\frac{1}{2}\frac{\sqrt{2}}{2} + \frac{\sqrt{3}}{2}(0) + 0(-\frac{\sqrt{2}}{2}) & \frac{1}{2}\frac{\sqrt{6}}{4} + \frac{\sqrt{3}}{2}(\frac{1}{2}) + 0(\frac{\sqrt{6}}{4}) & \frac{1}{2}\frac{\sqrt{2}}{4} + \frac{\sqrt{3}}{2}(-\frac{\sqrt{3}}{2}) + 0(\frac{\sqrt{2}}{4}) \\
0(\frac{\sqrt{2}}{2}) + 0(0) + 1(-\frac{\sqrt{2}}{2}) & 0(\frac{\sqrt{6}}{4}) + 0(\frac{1}{2}) + 1(\frac{\sqrt{6}}{4}) & 0(\frac{\sqrt{2}}{4}) + 0(-\frac{\sqrt{3}}{2}) + 1(\frac{\sqrt{2}}{4})
\end{pmatrix} $$
$$ R = \begin{pmatrix}
\frac{\sqrt{6}}{4} & \frac{3\sqrt{2}}{8} - \frac{1}{4} & \frac{\sqrt{6}}{8} + \frac{\sqrt{3}}{4} \\
\frac{\sqrt{2}}{4} & \frac{\sqrt{6}}{8} + \frac{\sqrt{3}}{4} & \frac{\sqrt{2}}{8} - \frac{3}{4} \\
-\frac{\sqrt{2}}{2} & \frac{\sqrt{6}}{4} & \frac{\sqrt{2}}{4}
\end{pmatrix} $$
Let's simplify the terms:
$ \frac{3\sqrt{2}}{8} - \frac{1}{4} = \frac{3\sqrt{2}-2}{8} $
$ \frac{\sqrt{6}}{8} + \frac{\sqrt{3}}{4} = \frac{\sqrt{6}+2\sqrt{3}}{8} $
$ \frac{\sqrt{2}}{8} - \frac{3}{4} = \frac{\sqrt{2}-6}{8} $

$$ \boxed{R = \begin{pmatrix}
\frac{\sqrt{6}}{4} & \frac{3\sqrt{2}-2}{8} & \frac{\sqrt{6}+2\sqrt{3}}{8} \\
\frac{\sqrt{2}}{4} & \frac{\sqrt{6}+2\sqrt{3}}{8} & \frac{\sqrt{2}-6}{8} \\
-\frac{\sqrt{2}}{2} & \frac{\sqrt{6}}{4} & \frac{\sqrt{2}}{4}
\end{pmatrix}} $$
*Explanation: The final multiplication combines the last two rotations with the first one, yielding the complete transformation matrix.*

**Reflection:** This example highlights the importance of correct matrix multiplication order for Euler angles. Even for simple angles, the arithmetic can become tedious, emphasizing why computational tools are often used. The Z-Y-X convention is common in aerospace (roll-pitch-yaw), so understanding its matrix form is practical.

### Example 2: Angular Velocity from Euler Rates (Medium)

**Problem Statement:** A spacecraft's orientation is described by Z-X-Z Euler angles. At a certain instant, the angles are $\phi = 90^\circ$, $\theta = 45^\circ$, $\psi = 0^\circ$. The rates of change of these angles are $\dot{\phi} = 0.1$ rad/s, $\dot{\theta} = 0.2$ rad/s, $\dot{\psi} = 0.3$ rad/s. Find the components of the angular velocity vector $\vec{\omega}$ in the body-fixed frame $(x, y, z)$.

**Given:**
*   Euler angles (Z-X-Z): $\phi = 90^\circ$, $\theta = 45^\circ$, $\psi = 0^\circ$
*   Euler rates: $\dot{\phi} = 0.1$ rad/s, $\dot{\theta} = 0.2$ rad/s, $\dot{\psi} = 0.3$ rad/s
**Want:** $\omega_x, \omega_y, \omega_z$ in the body-fixed frame.

**Solution:**
For the Z-X-Z Euler angle convention, the components of the angular velocity vector $\vec{\omega}$ in the body-fixed frame are given by:
$$ \omega_x = \dot{\phi} \sin\theta \sin\psi + \dot{\theta} \cos\psi $$
$$ \omega_y = \dot{\phi} \sin\theta \cos\psi - \dot{\theta} \sin\psi $$
$$ \omega_z = \dot{\phi} \cos\theta + \dot{\psi} $$
*Explanation: These are the standard formulas derived in Step 3 for the Z-X-Z convention, expressing the total angular velocity in the body frame as a sum of contributions from each Euler rate, projected onto the body axes.*

**Step 1: Calculate the trigonometric values for the given angles.**
$\phi = 90^\circ \implies \sin 90^\circ = 1, \cos 90^\circ = 0$
$\theta = 45^\circ \implies \sin 45^\circ = \frac{\sqrt{2}}{2}, \cos 45^\circ = \frac{\sqrt{2}}{2}$
$\psi = 0^\circ \implies \sin 0^\circ = 0, \cos 0^\circ = 1$
*Explanation: We need the numerical values of the sines and cosines to substitute into the formulas.*

**Step 2: Substitute the angle values and rates into the $\omega_x$ equation.**
$$ \omega_x = (0.1 \text{ rad/s}) (\sin 45^\circ) (\sin 0^\circ) + (0.2 \text{ rad/s}) (\cos 0^\circ) $$
$$ \omega_x = (0.1) (\frac{\sqrt{2}}{2}) (0) + (0.2) (1) $$
$$ \omega_x = 0 + 0.2 $$
$$ \omega_x = 0.2 \text{ rad/s} $$
*Explanation: We are carefully substituting each numerical value into the expression for $\omega_x$ and performing the arithmetic.*

**Step 3: Substitute the angle values and rates into the $\omega_y$ equation.**
$$ \omega_y = (0.1 \text{ rad/s}) (\sin 45^\circ) (\cos 0^\circ) - (0.2 \text{ rad/s}) (\sin 0^\circ) $$
$$ \omega_y = (0.1) (\frac{\sqrt{2}}{2}) (1) - (0.2) (0) $$
$$ \omega_y = 0.1 \frac{\sqrt{2}}{2} - 0 $$
$$ \omega_y = \frac{0.1\sqrt{2}}{2} \approx 0.0707 \text{ rad/s} $$
*Explanation: Similar to $\omega_x$, we substitute and calculate for $\omega_y$.*

**Step 4: Substitute the angle values and rates into the $\omega_z$ equation.**
$$ \omega_z = (0.1 \text{ rad/s}) (\cos 45^\circ) + (0.3 \text{ rad/s}) $$
$$ \omega_z = (0.1) (\frac{\sqrt{2}}{2}) + (0.3) $$
$$ \omega_z = \frac{0.1\sqrt{2}}{2} + 0.3 \approx 0.0707 + 0.3 $$
$$ \omega_z = 0.3707 \text{ rad/s} $$
*Explanation: And finally for $\omega_z$.*

**Final Answer:**
The components of the angular velocity vector in the body-fixed frame are:
$$ \boxed{\vec{\omega}_{\text{body}} = (0.2 \hat{i} + 0.0707 \hat{j} + 0.3707 \hat{k}) \text{ rad/s}} $$

**Reflection:** This example demonstrates the direct application of the formulas relating Euler rates to body-fixed angular velocity components. The trickiest part is remembering the correct formulas for the chosen Euler angle convention and performing the trigonometric and algebraic substitutions accurately. It shows how the overall spin of an object is a combination of its individual "turns."

### Example 3: Euler's Equations for a Spinning Top (Hard)

**Problem Statement:** A symmetric top (e.g., a gyroscope rotor) spins with its tip fixed at the origin. Its symmetry axis (body $z$-axis) is initially aligned with the inertial $Z$-axis. It is given an initial spin $\omega_z = \Omega$ around its symmetry axis. There are no external torques, except for gravity acting on the center of mass, which is a distance $h$ from the origin along the symmetry axis. The principal moments of inertia are $I_1=I_2=I_T$ and $I_3=I_A$. Analyze the precession of the top under gravity. Specifically, show that the precession rate $\dot{\phi}$ is approximately constant for a fast-spinning top.

**Given:**
*   Symmetric top: $I_1=I_2=I_T$, $I_3=I_A$.
*   Tip fixed at origin.
*   Center of mass at $(0, 0, h)$ in body frame.
*   Initial spin $\omega_z = \Omega$.
*   Gravity torque: $\vec{\tau} = \vec{r}_{\text{CM}} \times (m\vec{g})$.
**Want:** The precession rate $\dot{\phi}$ and its behavior.

**Solution:**
We use the Z-X-Z Euler angle convention. The body $z$-axis is the symmetry axis. The angle $\theta$ is the angle between the inertial $Z$-axis and the body $z$-axis. The angular velocity components in the body frame are:
$$ \omega_x = \dot{\phi} \sin\theta \sin\psi + \dot{\theta} \cos\psi $$
$$ \omega_y = \dot{\phi} \sin\theta \cos\psi - \dot{\theta} \sin\psi $$
$$ \omega_z = \dot{\phi} \cos\theta + \dot{\psi} $$

**Step 1: Calculate the external torque.**
The force of gravity is $\vec{F}_g = (0, 0, -mg)$ in the inertial frame.
The position of the center of mass in the body frame is $\vec{r}_{\text{CM}, \text{body}} = (0, 0, h)$.
We need to express $\vec{F}_g$ in the body frame, or $\vec{r}_{\text{CM}}$ in the inertial frame. Let's express $\vec{r}_{\text{CM}}$ in the inertial frame.
The body z-axis $\hat{k}$ has components $(\sin\theta \sin\phi, -\sin\theta \cos\phi, \cos\theta)$ in the inertial frame.
The position vector of the CM in the inertial frame is $\vec{r}_{\text{CM}, \text{inertial}} = h \hat{k}_{\text{body}} = h (\sin\theta \sin\phi, -\sin\theta \cos\phi, \cos\theta)$.
The torque is $\vec{\tau}_{\text{inertial}} = \vec{r}_{\text{CM}, \text{inertial}} \times \vec{F}_g$.
$$ \vec{\tau}_{\text{inertial}} = h \begin{pmatrix} \sin\theta \sin\phi \\ -\sin\theta \cos\phi \\ \cos\theta \end{pmatrix} \times \begin{pmatrix} 0 \\ 0 \\ -mg \end{pmatrix} = \begin{pmatrix} h(-\sin\theta \cos\phi)(-mg) - h(\cos\theta)(0) \\ h(\cos\theta)(0) - h(\sin\theta \sin\phi)(-mg) \\ h(\sin\theta \sin\phi)(0) - h(-\sin\theta \cos\phi)(0) \end{pmatrix} $$
$$ \vec{\tau}_{\text{inertial}} = \begin{pmatrix} mgh \sin\theta \cos\phi \\ mgh \sin\theta \sin\phi \\ 0 \end{pmatrix} $$
Now, we need to express this torque in the body frame. The transformation from inertial to body frame is $R^T$.
$$ \vec{\tau}_{\text{body}} = R^T \vec{\tau}_{\text{inertial}} $$
For the Z-X-Z convention, the transformation matrix from body to inertial is:
$$ R = \begin{pmatrix} \cos\phi\cos\psi - \sin\phi\cos\theta\sin\psi & -\cos\phi\sin\psi - \sin\phi\cos\theta\cos\psi & \sin\phi\sin\theta \\ \sin\phi\cos\psi + \cos\phi\cos\theta\sin\psi & -\sin\phi\sin\psi + \cos\phi\cos\theta\cos\psi & -\cos\phi\sin\theta \\ \sin\theta\sin\psi & \sin\theta\cos\psi & \cos\theta \end{pmatrix} $$
It's easier to project the inertial torque components directly onto the body axes $(\hat{i}, \hat{j}, \hat{k})$.
The torque is in the XY-plane of the inertial frame. The body axes are related to the inertial axes by the Euler angles.
The torque vector $\vec{\tau}_{\text{inertial}}$ is perpendicular to the $Z$-axis and has magnitude $mgh \sin\theta$. It lies in the plane formed by the $X, Y$ inertial axes.
The components of the torque in the body frame are:
$$ \tau_x = mgh \sin\theta \sin\psi $$
$$ \tau_y = mgh \sin\theta \cos\psi $$
$$ \tau_z = 0 $$
*Explanation: The torque is due to gravity acting on the CM. We find its components in the inertial frame, then transform them to the body frame. The torque is always perpendicular to the body's symmetry axis (z-axis) and the line of nodes (x'-axis), and thus has no z-component in the body frame.*

**Step 2: Write Euler's equations for a symmetric top with this torque.**
With $I_1=I_2=I_T$ and $I_3=I_A$:
$$ \tau_x = I_T \dot{\omega}_x - (I_T - I_A)\omega_y \omega_z $$
$$ \tau_y = I_T \dot{\omega}_y - (I_A - I_T)\omega_z \omega_x $$
$$ \tau_z = I_A \dot{\omega}_z - (I_T - I_T)\omega_x \omega_y \implies I_A \dot{\omega}_z = 0 $$
Substituting the torque components:
$$ mgh \sin\theta \sin\psi = I_T \dot{\omega}_x - (I_T - I_A)\omega_y \omega_z \quad (1) $$
$$ mgh \sin\theta \cos\psi = I_T \dot{\omega}_y - (I_A - I_T)\omega_z \omega_x \quad (2) $$
$$ 0 = I_A \dot{\omega}_z \quad (3) $$
*Explanation: We're applying the general Euler's equations to our specific system, using the calculated torque and the properties of a symmetric top.*

**Step 3: Analyze the equations and simplify for a fast-spinning top.**
From (3), $\dot{\omega}_z = 0$, so $\omega_z = \text{constant}$. This is the spin of the top around its own axis. Let $\omega_z = \Omega$.
For a fast-spinning top, $\Omega$ is very large. In this scenario, the change in the nutation angle $\theta$ is often very small, so we can approximate $\dot{\theta} \approx 0$.
Also, for a steady precession, we assume $\dot{\psi}$ is constant, and $\dot{\phi}$ is constant.
If $\dot{\theta} \approx 0$, then:
$$ \omega_x = \dot{\phi} \sin\theta \sin\psi $$
$$ \omega_y = \dot{\phi} \sin\theta \cos\psi $$
$$ \omega_z = \dot{\phi} \cos\theta + \dot{\psi} = \Omega $$
Now, let's find $\dot{\omega}_x$ and $\dot{\omega}_y$:
$$ \dot{\omega}_x = \dot{\phi} \sin\theta \cos\psi \dot{\psi} $$
$$ \dot{\omega}_y = -\dot{\phi} \sin\theta \sin\psi \dot{\psi} $$
*Explanation: We simplify the angular velocity components by assuming steady precession ($\dot{\theta} \approx 0$). This is a common approximation for gyroscopic motion.*

**Step 4: Substitute $\omega_x, \omega_y, \dot{\omega}_x, \dot{\omega}_y$ into equations (1) and (2).**
From (1):
$$ mgh \sin\theta \sin\psi = I_T (\dot{\phi} \sin\theta \cos\psi \dot{\psi}) - (I_T - I_A)(\dot{\phi} \sin\theta \cos\psi)(\Omega) $$
$$ mgh \sin\theta \sin\psi = I_T \dot{\phi} \sin\theta \cos\psi \dot{\psi} - (I_T - I_A) \Omega \dot{\phi} \sin\theta \cos\psi $$
From (2):
$$ mgh \sin\theta \cos\psi = I_T (-\dot{\phi} \sin\theta \sin\psi \dot{\psi}) - (I_A - I_T)(\Omega)(\dot{\phi} \sin\theta \sin\psi) $$
$$ mgh \sin\theta \cos\psi = -I_T \dot{\phi} \sin\theta \sin\psi \dot{\psi} + (I_T - I_A) \Omega \dot{\phi} \sin\theta \sin\psi $$
These equations look complicated. Let's look for a simpler approach by combining them.
Multiply (1) by $\cos\psi$ and (2) by $\sin\psi$:
$(1) \times \cos\psi: mgh \sin\theta \sin\psi \cos\psi = I_T \dot{\omega}_x \cos\psi - (I_T - I_A)\omega_y \omega_z \cos\psi$
$(2) \times \sin\psi: mgh \sin\theta \cos\psi \sin\psi = I_T \dot{\omega}_y \sin\psi - (I_A - I_T)\omega_z \omega_x \sin\psi$
Subtracting these two equations:
$0 = I_T (\dot{\omega}_x \cos\psi - \dot{\omega}_y \sin\psi) - (I_T - I_A)\omega_z (\omega_y \cos\psi + \omega_x \sin\psi)$
This path is getting messy. Let's reconsider the definition of $\vec{L}$ and its time derivative.

**Alternative Step 4: Use angular momentum conservation in the inertial frame.**
The total angular momentum $\vec{L}$ is NOT conserved because there's an external torque. However, the component of $\vec{L}$ along the inertial Z-axis, $L_Z$, *is* conserved if the torque has no Z-component.
The torque is $\vec{\tau}_{\text{inertial}} = (mgh \sin\theta \cos\phi, mgh \sin\theta \sin\phi, 0)$. Indeed, $\tau_Z = 0$.
So, $L_Z = \text{constant}$.
The angular momentum in the body frame is $\vec{L}_{\text{body}} = (I_T \omega_x, I_T \omega_y, I_A \omega_z)$.
The projection of $\vec{L}_{\text{body}}$ onto the inertial $Z$-axis is $L_Z = \vec{L}_{\text{body}} \cdot \hat{Z}_{\text{body}}$.
We know $\hat{Z}_{\text{body}} = (\sin\theta \sin\psi, \sin\theta \cos\psi, \cos\theta)$ in the body frame.
So, $L_Z = I_T \omega_x \sin\theta \sin\psi + I_T \omega_y \sin\theta \cos\psi + I_A \omega_z \cos\theta$.
Substitute $\omega_x, \omega_y, \omega_z$ in terms of Euler rates (assuming $\dot{\theta}=0$ for steady precession):
$\omega_x = \dot{\phi} \sin\theta \sin\psi$
$\omega_y = \dot{\phi} \sin\theta \cos\psi$
$\omega_z = \dot{\phi} \cos\theta + \dot{\psi}$ (let's use $\Omega$ for $\omega_z$ for the fast-spinning case, so $\dot{\psi} = \Omega - \dot{\phi}\cos\theta$)

$L_Z = I_T (\dot{\phi} \sin\theta \sin\psi) \sin\theta \sin\psi + I_T (\dot{\phi} \sin\theta \cos\psi) \sin\theta \cos\psi + I_A (\Omega) \cos\theta$
$L_Z = I_T \dot{\phi} \sin^2\theta (\sin^2\psi + \cos^2\psi) + I_A \Omega \cos\theta$
$$ L_Z = I_T \dot{\phi} \sin^2\theta + I_A \Omega \cos\theta = \text{constant} $$
*Explanation: For a system with a fixed point and gravity, the torque is always perpendicular to the inertial Z-axis (vertical). This means the angular momentum component along the Z-axis is conserved. This is a very powerful shortcut.*

**Step 5: Use the energy conservation.**
The total mechanical energy $E = \frac{1}{2} \vec{\omega} \cdot (I \vec{\omega}) + V(\theta)$ is also conserved.
The kinetic energy is $T = \frac{1}{2} (I_T \omega_x^2 + I_T \omega_y^2 + I_A \omega_z^2)$.
Since $\dot{\theta} = 0$, $\omega_x = \dot{\phi} \sin\theta \sin\psi$ and $\omega_y = \dot{\phi} \sin\theta \cos\psi$.
So, $\omega_x^2 + \omega_y^2 = (\dot{\phi} \sin\theta)^2 (\sin^2\psi + \cos^2\psi) = (\dot{\phi} \sin\theta)^2$.
$T = \frac{1}{2} I_T (\dot{\phi} \sin\theta)^2 + \frac{1}{2} I_A \Omega^2$.
The potential energy is $V(\theta) = mgh \cos\theta$.
Thus, $E = \frac{1}{2} I_T (\dot{\phi} \sin\theta)^2 + \frac{1}{2} I_A \Omega^2 + mgh \cos\theta = \text{constant}$.
*Explanation: Energy conservation is another powerful tool in analytical mechanics. For steady precession, the nutation angle $\theta$ is constant, so the potential energy is constant. This allows us to relate the precession rate to the spin.*

**Step 6: Combine conservation laws to find the precession rate.**
From Euler's equations (1) and (2), for steady precession ($\dot{\omega}_x = \dot{\omega}_y = 0$):
$$ mgh \sin\theta \sin\psi = -(I_T - I_A)\omega_y \omega_z $$
$$ mgh \sin\theta \cos\psi = -(I_A - I_T)\omega_z \omega_x $$
Substitute $\omega_x = \dot{\phi} \sin\theta \sin\psi$, $\omega_y = \dot{\phi} \sin\theta \cos\psi$, $\omega_z = \Omega$:
$$ mgh \sin\theta \sin\psi = -(I_T - I_A)(\dot{\phi} \sin\theta \cos\psi) \Omega $$
$$ mgh \sin\theta \cos\psi = -(I_A - I_T)(\Omega)(\dot{\phi} \sin\theta \sin\psi) $$
The first equation becomes:
$$ mgh \sin\theta \sin\psi = (I_A - I_T) \Omega \dot{\phi} \sin\theta \cos\psi $$
The second equation becomes:
$$ mgh \sin\theta \cos\psi = (I_A - I_T) \Omega \dot{\phi} \sin\theta \sin\psi $$
These two equations are consistent if we divide by $\sin\psi$ or $\cos\psi$. Let's use the first one (assuming $\sin\psi \ne 0$):
$$ mgh = (I_A - I_T) \Omega \dot{\phi} \cos\psi $$
This implies $\cos\psi$ must be constant. If $\cos\psi$ is constant, and $\dot{\psi}$ is typically non-zero, this means $\psi$ itself is not constant. This indicates an issue with the assumption of $\dot{\omega}_x = \dot{\omega}_y = 0$.
The assumption for steady precession is that $\theta$ and $\dot{\phi}$ are constant, and $\dot{\psi}$ is constant. This means $\omega_x, \omega_y$ are *not* zero, but rather rotate with $\psi$.
Let's go back to the original Euler's equations for the body frame, but now substitute the angular velocities:
$$ \omega_x = \dot{\phi} \sin\theta \sin\psi + \dot{\theta} \cos\psi $$
$$ \omega_y = \dot{\phi} \sin\theta \cos\psi - \dot{\theta} \sin\psi $$
$$ \omega_z = \dot{\phi} \cos\theta + \dot{\psi} $$
And their derivatives:
$$ \dot{\omega}_x = \dot{\phi} \cos\theta \dot{\theta} \sin\psi + \dot{\phi} \sin\theta \cos\psi \dot{\psi} + \ddot{\theta} \cos\psi - \dot{\theta} \sin\psi \dot{\psi} $$
$$ \dot{\omega}_y = \dot{\phi} \cos\theta \dot{\theta} \cos\psi - \dot{\phi} \sin\theta \sin\psi \dot{\psi} - \ddot{\theta} \sin\psi - \dot{\theta} \cos\psi \dot{\psi} $$
For steady precession, $\theta = \text{constant}$ (so $\dot{\theta}=0, \ddot{\theta}=0$), and $\dot{\phi} = \text{constant}$. This simplifies:
$$ \omega_x = \dot{\phi} \sin\theta \sin\psi $$
$$ \omega_y = \dot{\phi} \sin\theta \cos\psi $$
$$ \omega_z =