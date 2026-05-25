## 1. What it is — in plain English

Imagine you're in space, far from any planets or stars, holding a perfectly balanced object like a brick or a book. If you give it a spin and then let go, what happens? It will keep spinning! But not necessarily in a simple, steady way.

"Torque-free rotation" means there are no external forces trying to twist or turn the object. Think of it like a perfectly thrown football that isn't wobbling due to air resistance, or a satellite smoothly spinning in the vacuum of space. The total "amount of spin" (which we call angular momentum) stays constant.

However, even if the total amount of spin is constant, the way the object is oriented and how it tumbles can change over time. If the object isn't perfectly symmetrical (like a sphere), its rotation can be quite complex, even mesmerizing. This complex, constant-angular-momentum spin is what we study with "Euler's equations" for an "asymmetric top." An asymmetric top is just a fancy name for any rigid object that isn't perfectly symmetrical in its mass distribution – like our brick or book.

## 2. Why it matters — real-world applications

Understanding torque-free rotation, especially for asymmetric tops, is crucial in many advanced fields:

1.  **Satellite Attitude Control:** When a satellite is launched into space, it needs to maintain a specific orientation (attitude) for its antennas to communicate, its solar panels to face the sun, or its cameras to point at Earth. Without active control, a satellite might experience torque-free tumbling due to initial launch conditions or small internal disturbances. Euler's equations help engineers predict and understand this natural motion, allowing them to design reaction wheels or thruster systems to stabilize the satellite. SpaceX and NASA constantly deal with this.
2.  **Space Debris and Asteroid Dynamics:** Millions of pieces of space debris, from defunct satellites to rocket fragments, are tumbling in orbit. Many asteroids also rotate freely in space. Predicting their rotation and long-term stability is vital for collision avoidance (for debris) and for understanding planetary formation (for asteroids). Euler's equations provide the fundamental framework for modeling these complex rotational dynamics.
3.  **Molecular Dynamics and Spectroscopy:** At the microscopic level, molecules can be thought of as tiny rigid bodies. Their rotational energy levels and how they interact with electromagnetic radiation (spectroscopy) are governed by the principles of torque-free rotation. Understanding the rotational states of molecules helps chemists and physicists analyze their structure, composition, and even temperature in distant nebulae.
4.  **Sports Physics (e.g., Diving, Figure Skating):** While not perfectly torque-free due to air resistance, the principles are highly relevant. A diver or figure skater tucking in their limbs changes their moments of inertia, dramatically altering their spin rate. The complex tumbling of a diver performing multiple twists and somersaults before hitting the water is a macroscopic example of an asymmetric body undergoing rotation, albeit with some external torques.
5.  **Gyroscopes and Inertial Navigation:** Although gyroscopes are often subject to external torques for their functionality, the underlying principles of angular momentum conservation and rigid body rotation are essential. Understanding how a body *would* rotate without external torques is the baseline for designing systems that *use* torques to achieve desired orientations, like in aircraft or submarine navigation systems.

## 3. Prerequisites — what you must know first

Before diving into Euler's equations and asymmetric tops, ensure you have a solid grasp of these foundational concepts:

*   **Vectors and Vector Calculus:** Understanding vector addition, subtraction, dot products, cross products, and time derivatives of vectors.
*   **Newton's Laws of Motion:** Especially the rotational equivalent, $\vec{\tau} = \frac{d\vec{L}}{dt}$.
*   **Rotational Kinematics:** Concepts like angular position, angular velocity ($\vec{\omega}$), and angular acceleration ($\vec{\alpha}$).
*   **Rotational Dynamics:** Understanding torque ($\vec{\tau}$), angular momentum ($\vec{L}$), and their relationship.
*   **Rigid Body Definition:** What constitutes a rigid body (fixed distances between all constituent particles).
*   **Moment of Inertia:** The scalar $I = \sum m_i r_i^2$ for simple cases, and the more general concept of the **Inertia Tensor** ($\mathbf{I}$). This is crucial, as it relates angular momentum to angular velocity: $\vec{L} = \mathbf{I} \vec{\omega}$.
*   **Principal Axes and Principal Moments of Inertia:** The special set of orthogonal axes within a rigid body where the inertia tensor is diagonal. This simplifies calculations significantly.
*   **Matrix Algebra:** How to multiply matrices and vectors, and understanding diagonal matrices.
*   **Rotating Reference Frames:** How to take the time derivative of a vector in a frame that is itself rotating relative to an inertial frame. This is perhaps the most critical mathematical prerequisite.

## 4. The core idea — step by step

The core idea is to describe the complex tumbling of an object that's spinning without any external twists, by picking a special set of axes fixed to the object itself. This makes the object's properties (like its "resistance to twisting") constant, even though the object is moving.

### Step 1: The Inertial Frame and the Body Frame

*   **Plain-English Statement:** When an object spins, we can describe its motion from two perspectives: from a stationary observer (the "inertial frame") or from an observer "riding" on the object itself (the "body-fixed frame"). For torque-free rotation, the total angular momentum is constant in the inertial frame.
*   **Concrete Example:** Imagine a satellite tumbling in space. An astronaut floating nearby (inertial frame) sees its orientation changing. An accelerometer inside the satellite (body-fixed frame) feels the rotation relative to itself.
*   **Formal/Mathematical Version:**
    Let $S$ be an inertial frame and $S'$ be a body-fixed frame rotating with angular velocity $\vec{\omega}$ relative to $S$. For any vector $\vec{A}$, its time derivative in the inertial frame is related to its time derivative in the body-fixed frame by:
    $$ \left(\frac{d\vec{A}}{dt}\right)_S = \left(\frac{d\vec{A}}{dt}\right)_{S'} + \vec{\omega} \times \vec{A} $$
*   **What could go wrong:** Confusing which frame you're taking the derivative in. Always be clear if you're looking at how a vector changes from an outside perspective or from within the spinning object.

### Step 2: Angular Momentum and Torque

*   **Plain-English Statement:** The "amount of spin" an object has is its angular momentum. Changes in this amount of spin are caused by twists, or torques. If there are no twists, the total amount of spin in the universe (or at least for our object) stays constant.
*   **Concrete Example:** If you spin a bicycle wheel and let it go, it keeps spinning with a certain angular momentum. If you try to tilt it, you feel a resistance – that's the torque you're applying, trying to change its angular momentum.
*   **Formal/Mathematical Version:**
    The fundamental equation relating torque and angular momentum is:
    $$ \vec{\tau} = \left(\frac{d\vec{L}}{dt}\right)_S $$
    For torque-free rotation, $\vec{\tau} = 0$, which implies:
    $$ \left(\frac{d\vec{L}}{dt}\right)_S = 0 $$
    This means the angular momentum vector $\vec{L}$ is constant in magnitude and direction in the inertial frame.
*   **What could go wrong:** Forgetting that $\vec{L}$ is a vector, so "constant" means both its magnitude and direction are fixed in the inertial frame.

### Step 3: The Inertia Tensor

*   **Plain-English Statement:** How hard it is to spin an object around a particular axis depends on its mass distribution. A long, thin object is easy to spin around its long axis but hard to spin end-over-end. The inertia tensor is a mathematical tool that captures this "resistance to rotation" for *any* axis.
*   **Concrete Example:** A pencil spins easily around its length, but wobbles if you try to spin it around its middle, perpendicular to its length. A bowling ball, being symmetrical, spins similarly around any axis through its center.
*   **Formal/Mathematical Version:**
    Angular momentum $\vec{L}$ is related to angular velocity $\vec{\omega}$ by the inertia tensor $\mathbf{I}$:
    $$ \vec{L} = \mathbf{I} \vec{\omega} $$
    In component form, where $\mathbf{I}$ is a $3 \times 3$ matrix:
    $$ \begin{pmatrix} L_x \\ L_y \\ L_z \end{pmatrix} = \begin{pmatrix} I_{xx} & I_{xy} & I_{xz} \\ I_{yx} & I_{yy} & I_{yz} \\ I_{zx} & I_{zy} & I_{zz} \end{pmatrix} \begin{pmatrix} \omega_x \\ \omega_y \\ \omega_z \end{pmatrix} $$
*   **What could go wrong:** Assuming $\vec{L}$ is always parallel to $\vec{\omega}$. This is only true if $\vec{\omega}$ is aligned with a principal axis of inertia, or for spherically symmetric objects. For a general rigid body, $\vec{L}$ and $\vec{\omega}$ can point in different directions.

### Step 4: Using the Body-Fixed Frame for Derivation

*   **Plain-English Statement:** Since the object's "resistance to twisting" (its inertia tensor) is fixed relative to the object itself, it's much easier to describe its properties if we use axes that are bolted to the object. We can then use the rotating frame derivative rule to link this back to the inertial frame where angular momentum is constant.
*   **Concrete Example:** If you're designing a satellite, you want to know its moments of inertia relative to its own structure, not relative to some arbitrary direction in space that keeps changing.
*   **Formal/Mathematical Version:**
    Start with the torque-free condition in the inertial frame:
    $$ \left(\frac{d\vec{L}}{dt}\right)_S = 0 $$
    Now, apply the rotating frame derivative rule from Step 1 to $\vec{L}$:
    $$ \left(\frac{d\vec{L}}{dt}\right)_{S'} + \vec{\omega} \times \vec{L} = 0 $$
    This is the crucial step. It relates the change of angular momentum *as seen from the body* to the rotation of the body itself.
*   **What could go wrong:** Forgetting the $\vec{\omega} \times \vec{L}$ term. This term is what accounts for the change in direction of $\vec{L}$ in the inertial frame due to the rotation of the body frame.

### Step 5: Principal Axes and Simplifying the Inertia Tensor

*   **Plain-English Statement:** Every rigid object has at least three special, mutually perpendicular axes (like the length, width, and height axes of a brick) for which its "resistance to twisting" is simplest. If we align our body-fixed coordinate system with these "principal axes," the inertia tensor becomes a diagonal matrix, making calculations much simpler.
*   **Concrete Example:** For a rectangular brick, the axes through the center of mass parallel to its length, width, and height are principal axes. For a sphere, *any* axis through its center is a principal axis.
*   **Formal/Mathematical Version:**
    If we choose our body-fixed coordinate system $(x_1, x_2, x_3)$ to align with the principal axes, the inertia tensor $\mathbf{I}$ becomes diagonal:
    $$ \mathbf{I} = \begin{pmatrix} I_1 & 0 & 0 \\ 0 & I_2 & 0 \\ 0 & 0 & I_3 \end{pmatrix} $$
    where $I_1, I_2, I_3$ are the principal moments of inertia. In this coordinate system, the angular momentum components are simply:
    $$ L_1 = I_1 \omega_1 \\ L_2 = I_2 \omega_2 \\ L_3 = I_3 \omega_3 $$
*   **What could go wrong:** Trying to use a non-principal axis system for Euler's equations. While possible, it's far more complex and usually unnecessary for studying torque-free rotation.

### Step 6: Deriving Euler's Equations

*   **Plain-English Statement:** Now we combine everything: the angular momentum in the body frame, the principal axes, and the rotating frame derivative. This gives us three coupled equations that describe how the angular velocity components change over time as seen from the spinning object. These are Euler's equations.
*   **Concrete Example:** If you spin a book around its longest axis, it might wobble slightly. Euler's equations tell you exactly how that wobble (the tiny changes in $\omega_2$ and $\omega_3$) evolves.
*   **Formal/Mathematical Version:**
    Substitute $\vec{L} = (I_1 \omega_1, I_2 \omega_2, I_3 \omega_3)$ into $\left(\frac{d\vec{L}}{dt}\right)_{S'} + \vec{\omega} \times \vec{L} = 0$.
    The components of $\left(\frac{d\vec{L}}{dt}\right)_{S'}$ are $(I_1 \dot{\omega}_1, I_2 \dot{\omega}_2, I_3 \dot{\omega}_3)$.
    The components of $\vec{\omega} \times \vec{L}$ are:
    $$ (\omega_2 L_3 - \omega_3 L_2, \quad \omega_3 L_1 - \omega_1 L_3, \quad \omega_1 L_2 - \omega_2 L_1) $$
    Substituting $L_i = I_i \omega_i$:
    $$ (\omega_2 I_3 \omega_3 - \omega_3 I_2 \omega_2, \quad \omega_3 I_1 \omega_1 - \omega_1 I_3 \omega_3, \quad \omega_1 I_2 \omega_2 - \omega_2 I_1 \omega_1) $$
    Setting the sum of these components to zero:
    $$ I_1 \dot{\omega}_1 + (I_3 - I_2) \omega_2 \omega_3 = 0 \\ I_2 \dot{\omega}_2 + (I_1 - I_3) \omega_3 \omega_1 = 0 \\ I_3 \dot{\omega}_3 + (I_2 - I_1) \omega_1 \omega_2 = 0 $$
    These are **Euler's Equations for Torque-Free Rotation** for an asymmetric top.
*   **What could go wrong:** Sign errors in the cross product terms, or mixing up the indices (e.g., $I_1$ with $\omega_2$).

### Step 7: Stability of Rotation

*   **Plain-English Statement:** Even if an object is spinning around one of its principal axes, it might not stay that way if slightly disturbed. It turns out that rotation around the axis with the largest "resistance to twisting" (largest moment of inertia) and the axis with the smallest "resistance to twisting" (smallest moment of inertia) is stable. Rotation around the intermediate axis is unstable – a small nudge will cause it to tumble wildly.
*   **Concrete Example:** The famous "tennis racket theorem" or "Dzhanibekov effect" demonstrates this: if you spin a tennis racket around its shortest or longest axis, it spins stably. But if you try to spin it around its intermediate axis (perpendicular to the handle, parallel to the strings), it will invariably flip over.
*   **Formal/Mathematical Version:**
    Consider rotation about the $x_1$ axis. So $\omega_1 = \Omega$ (constant), and $\omega_2 = \omega_3 = 0$.
    Now, introduce small perturbations: $\omega_1 = \Omega + \delta\omega_1$, $\omega_2 = \delta\omega_2$, $\omega_3 = \delta\omega_3$.
    Substitute these into Euler's equations and linearize (neglect terms like $\delta\omega_2 \delta\omega_3$).
    For rotation about $x_1$:
    $I_1 (\dot{\Omega} + \delta\dot{\omega}_1) + (I_3 - I_2) (\Omega + \delta\omega_1) \delta\omega_3 = 0 \implies I_1 \delta\dot{\omega}_1 \approx 0$ (since $\Omega$ is constant and $\delta\omega_3$ is small)
    $I_2 \delta\dot{\omega}_2 + (I_1 - I_3) \Omega \delta\omega_3 = 0$
    $I_3 \delta\dot{\omega}_3 + (I_2 - I_1) \Omega \delta\omega_2 = 0$
    These two coupled equations for $\delta\omega_2$ and $\delta\omega_3$ can be combined to form a second-order differential equation. The stability depends on the sign of $(I_1 - I_3)(I_2 - I_1)$.
    *   If $I_1$ is the largest or smallest moment of inertia, then $(I_1 - I_3)$ and $(I_2 - I_1)$ will have opposite signs (e.g., if $I_1 > I_2$ and $I_1 > I_3$, then $I_1-I_3 > 0$ and $I_2-I_1 < 0$, so their product is negative). This leads to oscillatory solutions for $\delta\omega_2, \delta\omega_3$, meaning the perturbation is stable (the object wobbles but returns to its axis).
    *   If $I_1$ is the intermediate moment of inertia, then $(I_1 - I_3)$ and $(I_2 - I_1)$ will have the same sign (e.g., if $I_3 < I_1 < I_2$, then $I_1-I_3 > 0$ and $I_2-I_1 > 0$, so their product is positive). This leads to exponentially growing solutions, meaning the perturbation is unstable (the object tumbles).
*   **What could go wrong:** Incorrectly interpreting the signs of the terms in the stability analysis. The key is whether the product $(I_1 - I_3)(I_2 - I_1)$ is positive or negative.

## 5. Worked examples — multiple, with every step shown

### Example 1: Initial Angular Acceleration of a Tumbling Satellite

**Problem:** A satellite is shaped such that its principal moments of inertia are $I_1 = 100 \, \text{kg m}^2$, $I_2 = 50 \, \text{kg m}^2$, and $I_3 = 80 \, \text{kg m}^2$. At a certain instant, its angular velocity components in the body-fixed principal axes are $\omega_1 = 2 \, \text{rad/s}$, $\omega_2 = 1 \, \text{rad/s}$, and $\omega_3 = 3 \, \text{rad/s}$. Assuming torque-free rotation, what are the instantaneous angular accelerations ($\dot{\omega}_1, \dot{\omega}_2, \dot{\omega}_3$)?

**Given:**
*   $I_1 = 100 \, \text{kg m}^2$
*   $I_2 = 50 \, \text{kg m}^2$
*   $I_3 = 80 \, \text{kg m}^2$
*   $\omega_1 = 2 \, \text{rad/s}$
*   $\omega_2 = 1 \, \text{rad/s}$
*   $\omega_3 = 3 \, \text{rad/s}$

**Wanted:** $\dot{\omega}_1, \dot{\omega}_2, \dot{\omega}_3$

**Solution:**

We use Euler's equations for torque-free rotation:
$$ I_1 \dot{\omega}_1 + (I_3 - I_2) \omega_2 \omega_3 = 0 \quad (1) \\ I_2 \dot{\omega}_2 + (I_1 - I_3) \omega_3 \omega_1 = 0 \quad (2) \\ I_3 \dot{\omega}_3 + (I_2 - I_1) \omega_1 \omega_2 = 0 \quad (3) $$

**Step 1: Calculate $\dot{\omega}_1$ using equation (1).**
$$ I_1 \dot{\omega}_1 = - (I_3 - I_2) \omega_2 \omega_3 $$
$$ 100 \, \text{kg m}^2 \cdot \dot{\omega}_1 = - (80 \, \text{kg m}^2 - 50 \, \text{kg m}^2) (1 \, \text{rad/s}) (3 \, \text{rad/s}) $$
*We substitute the given values for $I_1, I_2, I_3, \omega_2, \omega_3$ into the first Euler equation.*
$$ 100 \dot{\omega}_1 = - (30) (3) $$
*We simplify the terms in the parentheses and multiply the angular velocities.*
$$ 100 \dot{\omega}_1 = - 90 $$
*Perform the multiplication.*
$$ \dot{\omega}_1 = \frac{-90}{100} $$
*Divide to solve for $\dot{\omega}_1$.*
$$ \dot{\omega}_1 = -0.9 \, \text{rad/s}^2 $$

**Step 2: Calculate $\dot{\omega}_2$ using equation (2).**
$$ I_2 \dot{\omega}_2 = - (I_1 - I_3) \omega_3 \omega_1 $$
$$ 50 \, \text{kg m}^2 \cdot \dot{\omega}_2 = - (100 \, \text{kg m}^2 - 80 \, \text{kg m}^2) (3 \, \text{rad/s}) (2 \, \text{rad/s}) $$
*Substitute the given values for $I_1, I_2, I_3, \omega_1, \omega_3$ into the second Euler equation.*
$$ 50 \dot{\omega}_2 = - (20) (6) $$
*Simplify and multiply.*
$$ 50 \dot{\omega}_2 = - 120 $$
*Perform the multiplication.*
$$ \dot{\omega}_2 = \frac{-120}{50} $$
*Divide to solve for $\dot{\omega}_2$.*
$$ \dot{\omega}_2 = -2.4 \, \text{rad/s}^2 $$

**Step 3: Calculate $\dot{\omega}_3$ using equation (3).**
$$ I_3 \dot{\omega}_3 = - (I_2 - I_1) \omega_1 \omega_2 $$
$$ 80 \, \text{kg m}^2 \cdot \dot{\omega}_3 = - (50 \, \text{kg m}^2 - 100 \, \text{kg m}^2) (2 \, \text{rad/s}) (1 \, \text{rad/s}) $$
*Substitute the given values for $I_1, I_2, I_3, \omega_1, \omega_2$ into the third Euler equation.*
$$ 80 \dot{\omega}_3 = - (-50) (2) $$
*Simplify and multiply. Note the double negative.*
$$ 80 \dot{\omega}_3 = 100 $$
*Perform the multiplication.*
$$ \dot{\omega}_3 = \frac{100}{80} $$
*Divide to solve for $\dot{\omega}_3$.*
$$ \dot{\omega}_3 = 1.25 \, \text{rad/s}^2 $$

**Final Answer:**
$$ \boxed{\dot{\omega}_1 = -0.9 \, \text{rad/s}^2, \quad \dot{\omega}_2 = -2.4 \, \text{rad/s}^2, \quad \dot{\omega}_3 = 1.25 \, \text{rad/s}^2} $$

**Reflection:** This example was straightforward, primarily testing the ability to correctly substitute values into Euler's equations and perform basic algebra. The "trick" (if any) is careful calculation and avoiding sign errors, especially when subtracting moments of inertia. It shows that even in torque-free rotation, the angular velocity components in the body frame *can* change, leading to complex tumbling motion.

---

### Example 2: Conservation of Energy and Angular Momentum Magnitude

**Problem:** A rigid body is rotating torque-free. Show that both its rotational kinetic energy and the magnitude of its angular momentum are conserved.

**Given:**
*   A rigid body undergoing torque-free rotation.
*   Euler's equations:
    $I_1 \dot{\omega}_1 + (I_3 - I_2) \omega_2 \omega_3 = 0$
    $I_2 \dot{\omega}_2 + (I_1 - I_3) \omega_3 \omega_1 = 0$
    $I_3 \dot{\omega}_3 + (I_2 - I_1) \omega_1 \omega_2 = 0$

**Wanted:**
1.  Show that rotational kinetic energy $T = \frac{1}{2} \vec{\omega} \cdot \vec{L}$ is constant.
2.  Show that the magnitude of angular momentum $|\vec{L}|^2 = L_1^2 + L_2^2 + L_3^2$ is constant.

**Solution:**

**Part 1: Conservation of Rotational Kinetic Energy**

**Step 1: Express rotational kinetic energy in terms of principal axes components.**
The rotational kinetic energy is given by:
$$ T = \frac{1}{2} \vec{\omega} \cdot \vec{L} $$
Since we are using principal axes, $\vec{L} = (I_1 \omega_1, I_2 \omega_2, I_3 \omega_3)$ and $\vec{\omega} = (\omega_1, \omega_2, \omega_3)$.
$$ T = \frac{1}{2} (I_1 \omega_1^2 + I_2 \omega_2^2 + I_3 \omega_3^2) $$
*This is the standard formula for rotational kinetic energy when expressed in principal axes coordinates.*

**Step 2: Take the time derivative of the kinetic energy.**
To show conservation, we need to show $\frac{dT}{dt} = 0$.
$$ \frac{dT}{dt} = \frac{1}{2} \frac{d}{dt} (I_1 \omega_1^2 + I_2 \omega_2^2 + I_3 \omega_3^2) $$
*We apply the chain rule for differentiation.*
$$ \frac{dT}{dt} = \frac{1}{2} (I_1 \cdot 2\omega_1 \dot{\omega}_1 + I_2 \cdot 2\omega_2 \dot{\omega}_2 + I_3 \cdot 2\omega_3 \dot{\omega}_3) $$
$$ \frac{dT}{dt} = I_1 \omega_1 \dot{\omega}_1 + I_2 \omega_2 \dot{\omega}_2 + I_3 \omega_3 \dot{\omega}_3 $$
*The factor of 1/2 cancels with the 2 from the chain rule.*

**Step 3: Substitute Euler's equations into the expression for $\frac{dT}{dt}$.**
From Euler's equations, we can express $\dot{\omega}_1, \dot{\omega}_2, \dot{\omega}_3$:
$$ I_1 \dot{\omega}_1 = - (I_3 - I_2) \omega_2 \omega_3 $$
$$ I_2 \dot{\omega}_2 = - (I_1 - I_3) \omega_3 \omega_1 $$
$$ I_3 \dot{\omega}_3 = - (I_2 - I_1) \omega_1 \omega_2 $$
Substitute these back into the $\frac{dT}{dt}$ equation:
$$ \frac{dT}{dt} = \omega_1 [-(I_3 - I_2) \omega_2 \omega_3] + \omega_2 [-(I_1 - I_3) \omega_3 \omega_1] + \omega_3 [-(I_2 - I_1) \omega_1 \omega_2] $$
*We replace each $I_k \dot{\omega}_k$ term with its equivalent from Euler's equations.*
$$ \frac{dT}{dt} = - \omega_1 \omega_2 \omega_3 (I_3 - I_2) - \omega_1 \omega_2 \omega_3 (I_1 - I_3) - \omega_1 \omega_2 \omega_3 (I_2 - I_1) $$
*Factor out the common term $-\omega_1 \omega_2 \omega_3$.*
$$ \frac{dT}{dt} = - \omega_1 \omega_2 \omega_3 [ (I_3 - I_2) + (I_1 - I_3) + (I_2 - I_1) ] $$
*Combine the terms inside the square brackets.*
$$ \frac{dT}{dt} = - \omega_1 \omega_2 \omega_3 [ I_3 - I_2 + I_1 - I_3 + I_2 - I_1 ] $$
$$ \frac{dT}{dt} = - \omega_1 \omega_2 \omega_3 [ 0 ] $$
$$ \frac{dT}{dt} = 0 $$
*All the moment of inertia terms cancel out, demonstrating that the time derivative of the kinetic energy is zero.*

Thus, the rotational kinetic energy $T$ is conserved.

**Part 2: Conservation of Angular Momentum Magnitude**

**Step 1: Express the square of the angular momentum magnitude in terms of principal axes components.**
The magnitude squared of the angular momentum vector is:
$$ |\vec{L}|^2 = L_1^2 + L_2^2 + L_3^2 $$
Using $L_k = I_k \omega_k$:
$$ |\vec{L}|^2 = (I_1 \omega_1)^2 + (I_2 \omega_2)^2 + (I_3 \omega_3)^2 $$
$$ |\vec{L}|^2 = I_1^2 \omega_1^2 + I_2^2 \omega_2^2 + I_3^2 \omega_3^2 $$
*This is the magnitude squared of the angular momentum vector expressed in principal axes coordinates.*

**Step 2: Take the time derivative of $|\vec{L}|^2$.**
To show conservation, we need to show $\frac{d}{dt} (|\vec{L}|^2) = 0$.
$$ \frac{d}{dt} (|\vec{L}|^2) = \frac{d}{dt} (I_1^2 \omega_1^2 + I_2^2 \omega_2^2 + I_3^2 \omega_3^2) $$
*Apply the chain rule.*
$$ \frac{d}{dt} (|\vec{L}|^2) = I_1^2 (2\omega_1 \dot{\omega}_1) + I_2^2 (2\omega_2 \dot{\omega}_2) + I_3^2 (2\omega_3 \dot{\omega}_3) $$
$$ \frac{d}{dt} (|\vec{L}|^2) = 2 (I_1^2 \omega_1 \dot{\omega}_1 + I_2^2 \omega_2 \dot{\omega}_2 + I_3^2 \omega_3 \dot{\omega}_3) $$

**Step 3: Substitute Euler's equations into the expression for $\frac{d}{dt} (|\vec{L}|^2)$.**
Again, we use the expressions for $I_k \dot{\omega}_k$ from Euler's equations:
$$ I_1 \dot{\omega}_1 = - (I_3 - I_2) \omega_2 \omega_3 \implies \dot{\omega}_1 = -\frac{(I_3 - I_2)}{I_1} \omega_2 \omega_3 $$
$$ I_2 \dot{\omega}_2 = - (I_1 - I_3) \omega_3 \omega_1 \implies \dot{\omega}_2 = -\frac{(I_1 - I_3)}{I_2} \omega_3 \omega_1 $$
$$ I_3 \dot{\omega}_3 = - (I_2 - I_1) \omega_1 \omega_2 \implies \dot{\omega}_3 = -\frac{(I_2 - I_1)}{I_3} \omega_1 \omega_2 $$
Substitute these into the derivative of $|\vec{L}|^2$:
$$ \frac{d}{dt} (|\vec{L}|^2) = 2 \left[ I_1^2 \omega_1 \left(-\frac{(I_3 - I_2)}{I_1} \omega_2 \omega_3\right) + I_2^2 \omega_2 \left(-\frac{(I_1 - I_3)}{I_2} \omega_3 \omega_1\right) + I_3^2 \omega_3 \left(-\frac{(I_2 - I_1)}{I_3} \omega_1 \omega_2\right) \right] $$
*Substitute the expressions for $\dot{\omega}_k$. The $I_k$ terms will partially cancel.*
$$ \frac{d}{dt} (|\vec{L}|^2) = 2 \left[ -I_1 (I_3 - I_2) \omega_1 \omega_2 \omega_3 - I_2 (I_1 - I_3) \omega_1 \omega_2 \omega_3 - I_3 (I_2 - I_1) \omega_1 \omega_2 \omega_3 \right] $$
*Simplify the terms, canceling one $I_k$ from the numerator and denominator.*
$$ \frac{d}{dt} (|\vec{L}|^2) = -2 \omega_1 \omega_2 \omega_3 \left[ I_1 (I_3 - I_2) + I_2 (I_1 - I_3) + I_3 (I_2 - I_1) \right] $$
*Factor out the common term $-2 \omega_1 \omega_2 \omega_3$.*
$$ \frac{d}{dt} (|\vec{L}|^2) = -2 \omega_1 \omega_2 \omega_3 \left[ I_1 I_3 - I_1 I_2 + I_2 I_1 - I_2 I_3 + I_3 I_2 - I_3 I_1 \right] $$
*Expand the terms inside the square brackets.*
$$ \frac{d}{dt} (|\vec{L}|^2) = -2 \omega_1 \omega_2 \omega_3 [ 0 ] $$
$$ \frac{d}{dt} (|\vec{L}|^2) = 0 $$
*All the terms inside the brackets cancel out, demonstrating that the time derivative of the angular momentum magnitude squared is zero.*

Thus, the magnitude of angular momentum $|\vec{L}|$ is conserved.

**Final Answer:**
$$ \boxed{\text{Rotational kinetic energy } T \text{ is conserved, and magnitude of angular momentum } |\vec{L}| \text{ is conserved.}} $$

**Reflection:** This example demonstrates two fundamental conservation laws that hold for any torque-free rigid body rotation. The mathematical derivation requires careful algebraic manipulation and substitution of Euler's equations. The cancellation of terms at the end is a beautiful confirmation of these physical principles. It's important to remember that while the *magnitude* of $\vec{L}$ is constant in the body frame (and thus in the inertial frame), the *components* of $\vec{\omega}$ (and thus $\vec{L}$) in the body frame *can* change, leading to complex motion.

---

### Example 3: Stability Analysis of Rotation about a Principal Axis (Intermediate Axis)

**Problem:** Consider a rigid body with principal moments of inertia $I_1 < I_2 < I_3$. Analyze the stability of rotation about the intermediate principal axis ($x_2$).

**Given:**
*   Principal moments of inertia: $I_1, I_2, I_3$ with $I_1 < I_2 < I_3$.
*   Euler's equations for torque-free rotation.

**Wanted:** Show that rotation about the $x_2$ (intermediate) axis is unstable.

**Solution:**

**Step 1: Set up the unperturbed rotation.**
Assume the body is initially rotating purely about the $x_2$ axis with a constant angular velocity $\Omega$.
So, the unperturbed angular velocity components are:
$$ \omega_1 = 0 \\ \omega_2 = \Omega \\ \omega_3 = 0 $$
Substitute these into Euler's equations:
$$ I_1 \dot{\omega}_1 + (I_3 - I_2) (0)(\Omega) = 0 \implies I_1 \dot{\omega}_1 = 0 $$
$$ I_2 \dot{\omega}_2 + (I_1 - I_3) (\Omega)(0) = 0 \implies I_2 \dot{\omega}_2 = 0 $$
$$ I_3 \dot{\omega}_3 + (I_2 - I_1) (0)(\Omega) = 0 \implies I_3 \dot{\omega}_3 = 0 $$
These equations are satisfied if $\dot{\omega}_1 = \dot{\omega}_2 = \dot{\omega}_3 = 0$, meaning pure rotation about the $x_2$ axis is a valid steady state.

**Step 2: Introduce small perturbations.**
Now, let's assume there are small perturbations to this steady rotation:
$$ \omega_1 = \delta\omega_1 \\ \omega_2 = \Omega + \delta\omega_2 \\ \omega_3 = \delta\omega_3 $$
where $\delta\omega_1, \delta\omega_2, \delta\omega_3$ are small time-varying quantities.

**Step 3: Substitute perturbed angular velocities into Euler's equations and linearize.**
We neglect terms involving products of two or more small perturbations (e.g., $\delta\omega_1 \delta\omega_3$).

**Equation 1:** $I_1 \dot{\omega}_1 + (I_3 - I_2) \omega_2 \omega_3 = 0$
$$ I_1 \delta\dot{\omega}_1 + (I_3 - I_2) (\Omega + \delta\omega_2) (\delta\omega_3) = 0 $$
$$ I_1 \delta\dot{\omega}_1 + (I_3 - I_2) (\Omega \delta\omega_3 + \delta\omega_2 \delta\omega_3) = 0 $$
Linearizing (dropping $\delta\omega_2 \delta\omega_3$):
$$ I_1 \delta\dot{\omega}_1 + (I_3 - I_2) \Omega \delta\omega_3 = 0 \quad (A) $$

**Equation 2:** $I_2 \dot{\omega}_2 + (I_1 - I_3) \omega_3 \omega_1 = 0$
$$ I_2 (\dot{\Omega} + \delta\dot{\omega}_2) + (I_1 - I_3) (\delta\omega_3) (\delta\omega_1) = 0 $$
Since $\Omega$ is constant, $\dot{\Omega}=0$. Linearizing (dropping $\delta\omega_3 \delta\omega_1$):
$$ I_2 \delta\dot{\omega}_2 = 0 \quad (B) $$
This implies $\delta\omega_2$ is constant. Since it's a perturbation, we assume it's zero or negligible in terms of its effect on stability, meaning the primary instability comes from $\delta\omega_1$ and $\delta\omega_3$.

**Equation 3:** $I_3 \dot{\omega}_3 + (I_2 - I_1) \omega_1 \omega_2 = 0$
$$ I_3 \delta\dot{\omega}_3 + (I_2 - I_1) (\delta\omega_1) (\Omega + \delta\omega_2) = 0 $$
Linearizing (dropping $\delta\omega_1 \delta\omega_2$):
$$ I_3 \delta\dot{\omega}_3 + (I_2 - I_1) \Omega \delta\omega_1 = 0 \quad (C) $$

**Step 4: Solve the coupled linear differential equations for $\delta\omega_1$ and $\delta\omega_3$.**
From (A): $\delta\dot{\omega}_1 = -\frac{(I_3 - I_2) \Omega}{I_1} \delta\omega_3$
From (C): $\delta\dot{\omega}_3 = -\frac{(I_2 - I_1) \Omega}{I_3} \delta\omega_1$

Differentiate the first equation with respect to time:
$$ \delta\ddot{\omega}_1 = -\frac{(I_3 - I_2) \Omega}{I_1} \delta\dot{\omega}_3 $$
Now substitute $\delta\dot{\omega}_3$ from the second equation:
$$ \delta\ddot{\omega}_1 = -\frac{(I_3 - I_2) \Omega}{I_1} \left( -\frac{(I_2 - I_1) \Omega}{I_3} \delta\omega_1 \right) $$
$$ \delta\ddot{\omega}_1 = \frac{(I_3 - I_2)(I_2 - I_1) \Omega^2}{I_1 I_3} \delta\omega_1 $$
This is a second-order linear differential equation of the form $\ddot{x} = kx$.
Let $K = \frac{(I_3 - I_2)(I_2 - I_1) \Omega^2}{I_1 I_3}$.
So, $\delta\ddot{\omega}_1 = K \delta\omega_1$.

**Step 5: Analyze the sign of K for stability.**
The general solution for $\ddot{x} = Kx$ depends on the sign of $K$:
*   If $K < 0$, the solution is oscillatory (e.g., $\sin(\sqrt{|K|}t)$), indicating stability.
*   If $K > 0$, the solution is exponential (e.g., $e^{\sqrt{K}t}$), indicating instability.

We are given $I_1 < I_2 < I_3$. Let's examine the terms in $K$:
*   $I_1, I_3$ are positive moments of inertia, so $I_1 I_3 > 0$.
*   $\Omega^2$ is positive (assuming $\Omega \neq 0$).
*   $(I_3 - I_2)$: Since $I_3 > I_2$, this term is **positive**.
*   $(I_2 - I_1)$: Since $I_2 > I_1$, this term is **positive**.

Therefore, the product $(I_3 - I_2)(I_2 - I_1)$ is positive.
This means $K = \frac{(\text{positive})(\text{positive})(\text{positive})}{(\text{positive})} = \text{positive}$.

Since $K > 0$, the solutions for $\delta\omega_1$ (and similarly for $\delta\omega_3$) are of the form $C_1 e^{\sqrt{K}t} + C_2 e^{-\sqrt{K}t}$. The $e^{\sqrt{K}t}$ term grows exponentially over time.

**Conclusion:**
An exponentially growing perturbation means that any tiny deviation from pure rotation about the intermediate axis will grow larger and larger, causing the body to tumble away from that axis. Therefore, rotation about the intermediate principal axis ($x_2$) is unstable.

**Final Answer:**
$$ \boxed{\text{Rotation about the intermediate principal axis } (I_2) \text{ is unstable.}} $$

**Reflection:** This is a crucial and famous result, often demonstrated with a tennis racket or a book (the Dzhanibekov effect). The mathematical rigor of the linearization and analysis of the differential equation clearly shows why this instability occurs. The trick is to correctly set up the perturbed equations and identify the sign of the coefficient in the second-order differential equation.

---

### Example 4: Precession of $\vec{\omega}$ around $\vec{L}$ for an Axially Symmetric Top

**Problem:** Consider an axially symmetric top, where $I_1 = I_2 \neq I_3$. Suppose the angular velocity vector $\vec{\omega}$ is not aligned with the symmetry axis ($x_3$). Show that $\vec{\omega}$ precesses around the angular momentum vector $\vec{L}$ (which is fixed in the inertial frame) and find the precession frequency.

**Given:**
*   Axially symmetric top: $I_1 = I_2 \neq I_3$. Let $I_1 = I_2 = I_{\perp}$ and $I_3 = I_{\parallel}$.
*   Torque-free rotation.
*   Euler's equations.

**Wanted:**
1.  Show $\vec{\omega}$ precesses around $\vec{L}$.
2.  Find the precession frequency.

**Solution:**

**Step 1: Write Euler's equations for an axially symmetric top.**
Substitute $I_1 = I_{\perp}$, $I_2 = I_{\perp}$, $I_3 = I_{\parallel}$ into Euler's equations:
$$ I_{\perp} \dot{\omega}_1 + (I_{\parallel} - I_{\perp}) \omega_2 \omega_3 = 0 \quad (1) \\ I_{\perp} \dot{\omega}_2 + (I_{\perp} - I_{\parallel}) \omega_3 \omega_1 = 0 \quad (2) \\ I_{\parallel} \dot{\omega}_3 + (I_{\perp} - I_{\perp}) \omega_1 \omega_2 = 0 \quad (3) $$

**Step 2: Simplify the equations.**
Equation (3) immediately simplifies:
$$ I_{\parallel} \dot{\omega}_3 + (0) \omega_1 \omega_2 = 0 \implies I_{\parallel} \dot{\omega}_3 = 0 $$
This means $\dot{\omega}_3 = 0$, so $\omega_3$ is constant. Let $\omega_3 = \Omega_3 = \text{constant}$.
Now, rewrite equations (1) and (2):
$$ \dot{\omega}_1 = - \frac{(I_{\parallel} - I_{\perp})}{I_{\perp}} \omega_2 \omega_3 = - \frac{(I_{\parallel} - I_{\perp})}{I_{\perp}} \Omega_3 \omega_2 \\ \dot{\omega}_2 = - \frac{(I_{\perp} - I_{\parallel})}{I_{\perp}} \omega_3 \omega_1 = - \frac{-(I_{\parallel} - I_{\perp})}{I_{\perp}} \Omega_3 \omega_1 = \frac{(I_{\parallel} - I_{\perp})}{I_{\perp}} \Omega_3 \omega_1 $$
Let $\Omega_p = \frac{(I_{\parallel} - I_{\perp})}{I_{\perp}} \Omega_3$.
Then the equations become:
$$ \dot{\omega}_1 = - \Omega_p \omega_2 \quad (A) \\ \dot{\omega}_2 = \Omega_p \omega_1 \quad (B) $$

**Step 3: Solve the coupled differential equations.**
Differentiate (A) with respect to time:
$$ \ddot{\omega}_1 = - \Omega_p \dot{\omega}_2 $$
Substitute (B) into this:
$$ \ddot{\omega}_1 = - \Omega_p (\Omega_p \omega_1) = - \Omega_p^2 \omega_1 $$
This is the equation for simple harmonic motion. The solutions are:
$$ \omega_1(t) = A \cos(\Omega_p t + \phi) $$
And from (A), $\omega_2(t) = -\frac{1}{\Omega_p} \dot{\omega}_1(t)$:
$$ \omega_2(t) = -\frac{1}{\Omega_p} [-A \Omega_p \sin(\Omega_p t + \phi)] = A \sin(\Omega_p t + \phi) $$
*We have found that $\omega_1$ and $\omega_2$ oscillate sinusoidally with angular frequency $\Omega_p$ and are $90^\circ$ out of phase. This indicates a rotation in the $x_1-x_2$ plane.*

**Step 4: Interpret the solution as precession.**
The angular velocity vector in the body frame is $\vec{\omega}(t) = (\omega_1(t), \omega_2(t), \Omega_3)$.
The components $\omega_1$ and $\omega_2$ trace out a circle in the $x_1-x_2$ plane. This means the projection of $\vec{\omega}$ onto the $x_1-x_2$ plane rotates around the $x_3$ (symmetry) axis with angular frequency $\Omega_p$. This is the **precession of $\vec{\omega}$ around the body's symmetry axis**.

Now, we need to show that $\vec{\omega}$ precesses around $\vec{L}$.
Recall that $\vec{L}$ is constant in the inertial frame.
In the body frame, $\vec{L} = (I_{\perp} \omega_1, I_{\perp} \omega_2, I_{\parallel} \omega_3)$.
Since $\omega_1$ and $\omega_2$ are oscillating, $L_1$ and $L_2$ are also oscillating:
$$ L_1(t) = I_{\perp} A \cos(\Omega_p t + \phi) \\ L_2(t) = I_{\perp} A \sin(\Omega_p t + \phi) \\ L_3 = I_{\parallel} \Omega_3 = \text{constant} $$
The angular momentum vector $\vec{L}$ also rotates around the $x_3$ axis in the body frame with frequency $\Omega_p$.
Since $\vec{L}$ is constant in the inertial frame, for $\vec{L}$ to rotate in the body frame, the body frame itself must be rotating relative to $\vec{L}$. This is precisely what precession means. The body-fixed $x_3$ axis (and thus $\vec{\omega}$) is precessing around the fixed $\vec{L}$ vector in the inertial frame.

The precession frequency of $\vec{\omega}$ around the body's symmetry axis is $\Omega_p = \frac{(I_{\parallel} - I_{\perp})}{I_{\perp}} \Omega_3$. This is called **nutation** or **free precession** in the body frame.
The precession of the body's symmetry axis (and thus $\vec{\omega}$) around the *fixed* angular momentum vector $\vec{L}$ in the inertial frame also occurs at this same frequency $\Omega_p$.

The angular velocity vector $\vec{\omega}$ is given by $(\omega_1, \omega_2, \Omega_3)$. The angular momentum vector $\vec{L}$ is given by $(I_{\perp}\omega_1, I_{\perp}\omega_2, I_{\parallel}\Omega_3)$.
Since $\omega_1$ and $\omega_2$ are varying sinusoidally with frequency $\Omega_p$, both $\vec{\omega}$ and the body-fixed principal axes are rotating around the $x_3$ axis at $\Omega_p$.
The vector $\vec{L}$ is constant in the inertial frame. The vector $\vec{\omega}$ is fixed relative to the body's symmetry axis.
The motion of the body is such that the $\vec{\omega}$ vector (and the body's symmetry axis) traces out a cone around the fixed $\vec{L}$ vector. This is the definition of precession.

**Final Answer:**
$$ \boxed{\text{The angular velocity vector } \vec{\omega} \text{ precesses around the angular momentum vector } \vec{L} \text{ with a frequency } \Omega_p = \frac{I_{\parallel} - I_{\perp}}{I_{\perp}} \omega_3.} $$

**Reflection:** This example highlights a common type of torque-free motion: the precession of an axially symmetric top. The key is that one of the angular velocity components ($\omega_3$) becomes constant, simplifying the Euler equations into a pair of coupled equations that describe harmonic motion. This harmonic motion in the $\omega_1, \omega_2$ components directly translates to a conical motion (precession) of the $\vec{\omega}$ vector around the symmetry axis in the body frame, and equivalently, the symmetry axis (and $\vec{\omega}$) around the fixed $\vec{L}$ vector in the inertial frame. The "trick" is recognizing the structure of the differential equations and interpreting the physical meaning of the solution.

## 6. Common mistakes and traps

1.  **Confusing Inertial and Body-Fixed Frames:** The most common error. Euler's equations are formulated in the body-fixed frame, but the angular momentum $\vec{L}$ is conserved in the inertial frame. Mixing these up leads to incorrect derivatives and cross product terms. Remember the $\left(\frac{d\vec{A}}{dt}\right)_S = \left(\frac{d\vec{A}}{dt}\right)_{S'} + \vec{\omega} \times \vec{A}$ relation.
2.  **Assuming $\vec{L}$ is Parallel to $\vec{\omega}$:** This is only true if the object is rotating purely about a principal axis, or if it's spherically symmetric. For an asymmetric top, $\vec{L}$ and $\vec{\omega}$ are generally not parallel, which is why the inertia tensor is crucial.
3.  **Incorrectly Applying Principal Axes:** Euler's equations in their simplified form ($I_1 \dot{\omega}_1 + (I_3 - I_2) \omega_2 \omega_3 = 0$, etc.) *only* apply when the chosen body-fixed axes are the principal axes. If you use arbitrary body-fixed axes, the inertia tensor will have off-diagonal terms, and the equations become far more complex.
4.  **Sign Errors in Cross Products:** The cross product terms $(\vec{\omega} \times \vec{L})$ are prone to sign errors. Double-check the order of terms and the resulting signs (e.g., $\omega_2 L_3 - \omega_3 L_2$).
5.  **Misinterpreting "Constant Angular Momentum":** While the *vector* $\vec{L}$ is constant in the inertial frame, its *components* $(L_1, L_2, L_3)$ in the body-fixed frame (and thus $\omega_1, \omega_2, \omega_3$) are generally *not* constant for an asymmetric top. They evolve according to Euler's equations.
6.  **Forgetting Conservation Laws:** Even though Euler's equations describe complex motion, the total angular momentum magnitude and the rotational kinetic energy are always conserved in torque-free rotation. These can be used as checks for your calculations or to simplify certain problems.

## 7. Textbook-precise explanation

For a rigid body undergoing torque-free rotation, its angular momentum $\vec{L}$ is conserved in an inertial frame of reference. However, the description of the body's motion is significantly simplified by employing a body-fixed coordinate system whose axes coincide with the principal axes of inertia of the rigid body. Let these principal axes be denoted by $x_1, x_2, x_3$, and the corresponding principal moments of inertia be $I_1, I_2, I_3$.

The angular velocity vector of the rigid body, $\vec{\omega}$, can be expressed in this body-fixed frame as $\vec{\omega} = \omega_1 \hat{e}_1 + \omega_2 \hat{e}_2 + \omega_3 \hat{e}_3$. The angular momentum vector $\vec{L}$ in this frame is then given by:
$$ \vec{L} = I_1 \omega_1 \hat{e}_1 + I_2 \omega_2 \hat{e}_2 + I_3 \omega_3 \hat{e}_3 $$
where $\hat{e}_1, \hat{e}_2, \hat{e}_3$ are the unit vectors along the principal axes.

The fundamental equation of rotational dynamics in an inertial frame is $\vec{\tau} = \left(\frac{d\vec{L}}{dt}\right)_S$. For torque-free rotation, $\vec{\tau} = 0$, so $\left(\frac{d\vec{L}}{dt}\right)_S = 0$.

To relate the inertial frame derivative to the body-fixed frame, we use the general formula for the time derivative of a vector in a rotating frame:
$$ \left(\frac{d\vec{A}}{dt}\right)_S = \left(\frac{d\vec{A}}{dt}\right)_{S'} + \vec{\omega} \times \vec{A} $$
Applying this to the angular momentum vector $\vec{L}$:
$$ \left(\frac{d\vec{L}}{dt}\right)_S = \left(\frac{d\vec{L}}{dt}\right)_{S'} + \vec{\omega} \times \vec{L} = 0 $$
In the body-fixed principal axes frame, the moments of inertia $I_1, I_2, I_3$ are constant. Thus, the components of $\left(\frac{d\vec{L}}{dt}\right)_{S'}$ are:
$$ \left(\frac{d\vec{L}}{dt}\right)_{S'} = I_1 \dot{\omega}_1 \hat{e}_1 + I_2 \dot{\omega}_2 \hat{e}_2 + I_3 \dot{\omega}_3 \hat{e}_3 $$
The cross product term $\vec{\omega} \times \vec{L}$ is:
$$ \vec{\omega} \times \vec{L} = (\omega_1 \hat{e}_1 + \omega_2 \hat{e}_2 + \omega_3 \hat{e}_3) \times (I_1 \omega_1 \hat{e}_1 + I_2 \omega_2 \hat{e}_2 + I_3 \omega_3 \hat{e}_3) $$
$$ = (I_3 - I_2) \omega_2 \omega_3 \hat{e}_1 + (I_1 - I_3) \omega_3 \omega_1 \hat{e}_2 + (I_2 - I_1) \omega_1 \omega_2 \hat{e}_3 $$
Summing these two parts and setting them to zero, component by component, yields **Euler's Equations for Torque-Free Rotation**:
$$ I_1 \dot{\omega}_1 + (I_3 - I_2) \omega_2 \omega_3 = 0 $$
$$ I_2 \dot{\omega}_2 + (I_1 - I_3) \omega_3 \omega_1 = 0 $$
$$ I_3 \dot{\omega}_3 + (I_2 - I_1) \omega_1 \omega_2 = 0 $$
These are a set of coupled, non-linear first-order differential equations that describe the evolution of the angular velocity components $\omega_1, \omega_2, \omega_3$ in the body-fixed principal axes frame. The solutions to these equations characterize the complex tumbling motion of an asymmetric rigid body in the absence of external torques. These equations demonstrate the conservation of both rotational kinetic energy and the magnitude of angular momentum, as shown in Example 2. Furthermore, analysis of these equations reveals that stable rotation occurs only about the principal axes corresponding to the largest and smallest moments of inertia, while rotation about the intermediate principal axis is unstable.

*Reference: Goldstein, H., Poole, C. P., & Safko, J. L. (2002). Classical Mechanics (3rd ed.). Addison Wesley. (Chapter 5, Rigid Body Motion)*
*Reference: Thornton, S. T., & Marion, J. B. (2004). Classical Dynamics of Particles and Systems (5th ed.). Brooks Cole. (Chapter 10, Dynamics of Rigid Bodies)*

## 8. ASCII diagrams

```text
       ^ x3 (principal axis 3)
       |
       |
       |
       +-------> x2 (principal axis 2)
      /
     /
    v x1 (principal axis 1)

      (Center of Mass)
      +------------------+
     /|                  |\
    / |                  | \
   +----------------------+  |
   |  |                  |  |
   |  +------------------+--+
   | /                  | /
   |/                   |/
   +--------------------+

   Illustration of a general asymmetric rigid body (like a brick)
   with its three principal axes (x1, x2, x3) originating from its
   center of mass. These axes are fixed to the body.

   ---

       ^ Inertial Z-axis
       |
       |  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     .
       | .                                                                                     