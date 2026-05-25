## What it is
Euler angles are a set of three angles used to describe the orientation of a rigid body with respect to a fixed coordinate system. Euler's equations of motion are a set of three differential equations that describe how a rigid body rotates, written from the perspective of a coordinate system attached to the body itself (the "body frame").

## Why it matters
This is the foundation of attitude dynamics for any rotating object. In aerospace, it's used to model and control the orientation (attitude) of satellites, rockets, and aircraft. In computer graphics and robotics, it's essential for animating and manipulating 3D objects and robotic arms.

## When to study it
Before tackling this, you must have a firm grasp of the following. If not, master them first.
*   **Newtonian Mechanics:** Specifically, the rotational analogue of Newton's second law, $\vec{\tau} = \frac{d\vec{L}}{dt}$, where $\vec{\tau}$ is torque and $\vec{L}$ is angular momentum.
*   **Vector Calculus:** Time derivatives of vectors and the cross product.
*   **Linear Algebra:** Rotation matrices and the concept of a tensor, specifically the inertia tensor $\mathbf{I}$.
*   **Rotating Reference Frames:** You must understand the transport theorem, which relates the time derivative of a vector in an inertial ("space") frame to its derivative in a rotating ("body") frame.

## How to study it (step by step)
1.  **Master the Transport Theorem.** Write out the derivation for $\left(\frac{d\vec{A}}{dt}\right)_{\text{space}} = \left(\frac{d\vec{A}}{dt}\right)_{\text{body}} + \vec{\omega} \times \vec{A}$. This is the single most important mathematical tool for this topic. Do not proceed until this equation is obvious to you.
2.  **Visualize Euler Angles.** Using the z-x'-z'' convention, draw the three rotations. First, rotate by $\phi$ about the space $z$-axis. Second, rotate by $\theta$ about the *new* $x'$-axis (the "line of nodes"). Third, rotate by $\psi$ about the final $z''$-axis. Understand that these three numbers uniquely define any orientation.
3.  **Derive Euler's Equations.** Start with $\vec{\tau} = \frac{d\vec{L}}{dt}$ in the space frame. Apply the transport theorem to move to the body frame. Substitute $\vec{L} = \mathbf{I}\vec{\omega}$. Crucially, choose your body axes to be the principal axes of the body, so the inertia tensor $\mathbf{I}$ is diagonal. Work through the cross product to arrive at the three scalar equations.
4.  **Solve the Torque-Free Case.** Set $\vec{\tau} = 0$ in Euler's equations. Analyze the motion of a symmetric top ($I_1 = I_2 \neq I_3$). This will introduce the concepts of precession and nutation.
5.  **Connect $\vec{\omega}$ to Euler Angles.** Derive the components of the angular velocity vector $\vec{\omega}$ in the body frame in terms of the Euler angles and their time derivatives ($\dot{\phi}, \dot{\theta}, \dot{\psi}$). This is algebraically intensive but mechanically links the geometry of orientation to the dynamics.

## Key ideas, with intuition
1.  **Space Frame vs. Body Frame:** Physics is simple in an inertial "space" frame (Newton's laws hold). But a body's properties, like its inertia tensor $\mathbf{I}$, are simple and *constant* in a "body" frame fixed to the object. The entire challenge is translating between these two perspectives.
2.  **The Inertia Tensor is a Nuisance:** In the space frame, the inertia tensor $\mathbf{I}(t)$ changes as the body rotates, making $\frac{d\vec{L}}{dt} = \frac{d}{dt}(\mathbf{I}(t)\vec{\omega})$ a nightmare to compute. By jumping into the body frame, $\mathbf{I}$ becomes constant. This is the primary motivation for using the body frame.
3.  **The Transport Theorem is the Bridge:** The equation that lets us jump between frames is the transport theorem.
    $$ \left(\frac{d\vec{A}}{dt}\right)_{\text{space}} = \left(\frac{d\vec{A}}{dt}\right)_{\text{body}} + \vec{\omega} \times \vec{A} $$
    The term $\vec{\omega} \times \vec{A}$ is the "price" we pay for using a rotating frame. It accounts for the fact that the body frame's basis vectors are themselves rotating.
4.  **Euler's Equations are just $\vec{\tau} = \frac{d\vec{L}}{dt}$ in Disguise:**
    We start with Newton's law in the inertial space frame: $\vec{\tau} = \left(\frac{d\vec{L}}{dt}\right)_{\text{space}}$.
    Apply the transport theorem to $\vec{L}$: $\vec{\tau} = \left(\frac{d\vec{L}}{dt}\right)_{\text{body}} + \vec{\omega} \times \vec{L}$.
    Now, express everything in the principal body axes $(\hat{e}_1, \hat{e}_2, \hat{e}_3)$. In this frame, $\mathbf{I}$ is diagonal, so $\vec{L} = \mathbf{I}\vec{\omega} = I_1\omega_1\hat{e}_1 + I_2\omega_2\hat{e}_2 + I_3\omega_3\hat{e}_3$.
    Since the basis vectors are fixed in the body frame, $\left(\frac{d\vec{L}}{dt}\right)_{\text{body}} = I_1\dot{\omega}_1\hat{e}_1 + I_2\dot{\omega}_2\hat{e}_2 + I_3\dot{\omega}_3\hat{e}_3$.
    Evaluating the cross product $\vec{\omega} \times \vec{L}$ and collecting components for each axis yields Euler's equations. For the first component:
    $$ \tau_1 = I_1 \dot{\omega}_1 + (I_3 - I_2) \omega_2 \omega_3 $$
    The other two equations are found by cyclically permuting the indices $(1, 2, 3)$.

## Worked example
**Problem:** An asymmetric rigid body with principal moments of inertia $I_1 = 1, I_2 = 2, I_3 = 3$ (in some units) is in torque-free motion. At $t=0$, its angular velocity is $\vec{\omega}(0) = (\epsilon, \omega_0, \epsilon)$, where $\omega_0$ is large and $\epsilon$ is a small perturbation. Describe the stability of rotation about the second (intermediate) axis.

**Solution:**
1.  **Write Euler's Equations for the torque-free ($\vec{\tau}=0$) case:**
    $$ I_1 \dot{\omega}_1 + (I_3 - I_2) \omega_2 \omega_3 = 0 \implies 1 \dot{\omega}_1 + (3 - 2) \omega_2 \omega_3 = 0 \implies \dot{\omega}_1 = -\omega_2 \omega_3 $$
    $$ I_2 \dot{\omega}_2 + (I_1 - I_3) \omega_3 \omega_1 = 0 \implies 2 \dot{\omega}_2 + (1 - 3) \omega_3 \omega_1 = 0 \implies \dot{\omega}_2 = \omega_3 \omega_1 $$
    $$ I_3 \dot{\omega}_3 + (I_2 - I_1) \omega_1 \omega_2 = 0 \implies 3 \dot{\omega}_3 + (2 - 1) \omega_1 \omega_2 = 0 \implies \dot{\omega}_3 = -\frac{1}{3}\omega_1 \omega_2 $$

2.  **Linearize the equations for small perturbations.**
    We assume $\omega_2 \approx \omega_0$ (constant) and $\omega_1, \omega_3$ are small (close to $\epsilon$). This allows us to neglect products of small quantities, like $\omega_1 \omega_2 \approx \epsilon \omega_0$ but $\omega_1 \omega_3 \approx \epsilon^2 \approx 0$.
    *   The second equation becomes $\dot{\omega}_2 = \omega_3 \omega_1 \approx 0$, which confirms that $\omega_2$ is approximately constant, $\omega_2(t) \approx \omega_0$.
    *   The first equation becomes: $\dot{\omega}_1 = -\omega_2 \omega_3 \approx -\omega_0 \omega_3$.
    *   The third equation becomes: $\dot{\omega}_3 = -\frac{1}{3}\omega_1 \omega_2 \approx -\frac{\omega_0}{3} \omega_1$.

3.  **Solve the system of linear differential equations.**
    We have a system:
    $$ \dot{\omega}_1 = -\omega_0 \omega_3 $$
    $$ \dot{\omega}_3 = -\frac{\omega_0}{3} \omega_1 $$
    Differentiate the first equation with respect to time: $\ddot{\omega}_1 = -\omega_0 \dot{\omega}_3$.
    Substitute the second equation into this: $\ddot{\omega}_1 = -\omega_0 \left(-\frac{\omega_0}{3} \omega_1\right) = \frac{\omega_0^2}{3} \omega_1$.
    The equation is $\ddot{\omega}_1 - \left(\frac{\omega_0^2}{3}\right)\omega_1 = 0$.

4.  **Analyze the solution.**
    This is the differential equation for exponential growth/decay, not oscillation. The general solution is $\omega_1(t) = A e^{\lambda t} + B e^{-\lambda t}$, where $\lambda = \frac{\omega_0}{\sqrt{3}}$. Since our initial perturbation $\epsilon$ is non-zero, the $A e^{\lambda t}$ term will be present and will grow exponentially. The small perturbation $\omega_1$ (and similarly $\omega_3$) will grow without bound.

**Reflection:**
*   Step 1 was a direct application of the core formulas.
*   Step 2 (linearization) is a standard physics technique to analyze stability near an equilibrium point. We assumed the main rotation was stable and tested if perturbations would die out or grow.
*   Step 3 involved solving a simple system of ODEs, a prerequisite skill.
*   Step 4 showed that the solution grows exponentially, meaning the initial state is unstable. This demonstrates the "tennis racket theorem": rotation about the principal axis with the intermediate moment of inertia is unstable.

## Diagrams

**Euler Angles (z-x'-z'' or 3-1-3 Convention)**
This sequence of rotations takes the space frame (x, y, z) to the body frame (x'', y'', z'').

```text
       z, z'
        ^
        |
        |  /
        | /
        |/  <-- First rotation by phi about z
        +-----------> y
       /|
      / |
     v  |
     x  v
        y'
       x'

          z'
           ^
           |
           |  /
           | /
           |/ <-- Second rotation by theta about x'
           +-----------> y'
          / \
         /   \
        v     v
       z''     y''
        x', x''

The final rotation is by psi about the z'' axis. Visualizing all three simultaneously in ASCII is difficult, but the key is that each rotation is about an axis of the *newly created* frame.
```

**Space and Body Frames**
```text
          z (Space)     z'' (Body)
           ^             ^
           |            /
           |           /
           |          /  <-- Body frame is tipped
           |         /       relative to space frame.
           |        /
           +----------------> y (Space)
          /
         /
        /
       v
      x (Space)

      The vectors L (angular momentum) and w (angular velocity)
      are generally NOT aligned.
      In the space frame, I(t) is changing.
      In the body frame, I is constant.
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you are a tiny astronaut standing on a spinning potato in space. The potato's axes (let's call them 1, 2, 3) are your "body frame." From your perspective, the moments of inertia ($I_1, I_2, I_3$) are constant. When you look at the stars, they are spinning wildly (that's the "space frame"). Euler's equations are simply Newton's laws from your point of view on the potato. The weird $(I_3-I_2)\omega_2\omega_3$ terms are "fictitious" torques (like the Coriolis force) that appear because your frame is rotating.

2.  **Formulas to Overlearn:**
    *   The Transport Theorem:
        $$ \left(\frac{d\vec{A}}{dt}\right)_{\text{space}} = \left(\frac{d\vec{A}}{dt}\right)_{\text{body}} + \vec{\omega} \times \vec{A} $$
    *   Euler's Equations (memorize the pattern):
        $$ I_1 \dot{\omega}_1 + (I_3 - I_2) \omega_2 \omega_3 = \tau_1 $$
        $$ I_2 \dot{\omega}_2 + (I_1 - I_3) \omega_3 \omega_1 = \tau_2 $$
        $$ I_3 \dot{\omega}_3 + (I_2 - I_1) \omega_1 \omega_2 = \tau_3 $$
        Notice the cyclic permutation of indices: (1,2,3) -> (2,3,1) -> (3,1,2).

3.  **Spaced Repetition Schedule:** Review these derivations and formulas at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget Euler's equations, rebuild them.
    *   Start: $\vec{\tau}_{\text{ext}} = \left(\frac{d\vec{L}}{dt}\right)_{\text{space}}$. This is fundamental.
    *   Translate: Apply the transport theorem to $\vec{L}$.
    *   Simplify: Move to the principal body axis frame where $\mathbf{I}$ is diagonal and constant.
    *   Expand: Write out $\vec{L} = (I_1\omega_1, I_2\omega_2, I_3\omega_3)$ and $\vec{\omega} = (\omega_1, \omega_2, \omega_3)$ and compute the cross product $\vec{\omega} \times \vec{L}$. The components of the resulting vector equation are Euler's equations.

## Common mistakes
*   **Confusing Frames:** Writing $\vec{L} = \mathbf{I}\vec{\omega}$ and then taking a simple time derivative $\dot{\vec{L}} = \mathbf{I}\dot{\vec{\omega}}$ in the space frame. This is wrong because $\mathbf{I}$ is also a function of time in the space frame. You *must* use the transport theorem.
*   **Assuming $\vec{L}$ and $\vec{\omega}$ are Parallel:** They are only parallel if the body is rotating about a principal axis. In general, $\vec{L} = \mathbf{I}\vec{\omega}$ shows that the matrix $\mathbf{I}$ transforms the vector $\vec{\omega}$ into $\vec{L}$, and they won't point in the same direction unless $\vec{\omega}$ is an eigenvector of $\mathbf{I}$.
*   **Mixing up Euler Angle Conventions:** The z-x'-z'' (3-1-3) convention is common in physics, while z-y'-x'' (3-2-1, "yaw, pitch, roll") is common in aerospace engineering. Always state your convention. The formulas connecting $\vec{\omega}$ to the angle rates depend on this choice.

## Self-check
1.  A uniform sphere is spinning in space with no external torques. Write down Euler's equations for this system and solve them. What does the solution tell you?
2.  For the torque-free motion of an asymmetric body ($I_1 < I_2 < I_3$), prove that rotation about the axes corresponding to $I_1$ and $I_3$ is stable against small perturbations.
3.  A spinning top has its tip fixed on the ground. Gravity exerts a torque on it. Write the torque vector in the body frame, and then write out the full Euler's equations for this "heavy symmetric top." Do not solve them, but set them up correctly.