## 1. What it is — in plain English

Imagine you're on a giant, spinning merry-go-round. If you stand still on it, you feel a push outwards, away from the center. This feeling of being thrown outwards is what we call **centrifugal force**. It's not a "real" force in the usual sense, like gravity pulling you down; it's more like an apparent push that you only feel because you're in a spinning environment.

Now, imagine you try to roll a ball straight across this spinning merry-go-round. From your perspective on the merry-go-round, the ball won't roll in a straight line; it will seem to curve sideways. This apparent sideways deflection of moving objects in a rotating system is caused by the **Coriolis force**. Again, it's not a "real" force that's pushing the ball; it's just how the ball's straight-line motion *looks* to someone who is spinning.

These "forces" — centrifugal and Coriolis — are often called "fictitious" or "inertial" forces. They aren't caused by any physical interaction (like a push or a pull from another object). Instead, they pop up in our equations only when we decide to describe motion from the viewpoint of a spinning or accelerating reference frame, rather than from a steady, non-moving viewpoint. They are simply mathematical terms that account for the fact that our chosen viewpoint (the rotating frame) is itself accelerating.

So, in short: if you're spinning, centrifugal force makes you feel pushed outwards, and Coriolis force makes moving objects seem to curve sideways. These are just tricks of perspective when you're not looking from a stable, non-spinning place.

## 2. Why it matters — real-world applications

Understanding rotating frames and the fictitious forces that arise from them is absolutely crucial in many advanced fields of physics and engineering. Ignoring them can lead to catastrophic failures or incorrect predictions.

1.  **Rocket Trajectories and Spacecraft Guidance:** When launching a rocket from Earth, engineers must meticulously account for the Coriolis effect. Since the Earth is rotating, a rocket launched straight up will appear to drift eastward (in the Northern Hemisphere) or westward (in the Southern Hemisphere) due to the Coriolis force acting on its trajectory. Similarly, for satellites in orbit, the Earth's rotation influences ground tracking and orbital maneuvers. Inertial Measurement Units (IMUs) in spacecraft use gyroscopes (which rely on rotational dynamics) to maintain orientation, and their readings must be corrected for the spacecraft's own rotation.
2.  **Weather and Ocean Currents:** The Coriolis force is the primary reason for the large-scale circulation patterns of the Earth's atmosphere and oceans. Hurricanes and cyclones don't just form; they spin. This spin is a direct result of the Coriolis effect deflecting moving air masses. In the Northern Hemisphere, hurricanes spin counter-clockwise, while in the Southern Hemisphere, they spin clockwise. Ocean currents also form large gyres due to this force, influencing global climate and marine ecosystems (e.g., the Ekman spiral).
3.  **Navigation Systems (GPS, INS):** Modern navigation systems, especially Inertial Navigation Systems (INS) used in aircraft, submarines, and long-range missiles, rely heavily on understanding rotating frames. An INS measures accelerations and rotations relative to the vehicle itself. To convert these measurements into a position relative to a fixed point on Earth, or to guide a missile to a target, the Earth's rotation and the resulting Coriolis and centrifugal effects must be precisely calculated and compensated for.
4.  **Engineering of Rotating Machinery:** From high-speed centrifuges used in laboratories to separate substances, to massive turbines in power plants, to the intricate design of jet engines, engineers must consider the forces acting on components within rotating systems. Centrifugal forces can cause immense stress on materials, potentially leading to deformation or failure if not properly accounted for in design. Coriolis forces can also affect fluid flow within rotating pipes or channels.
5.  **Artillery and Ballistics:** For long-range artillery fire, the Coriolis effect becomes significant. A shell fired over many kilometers will be deflected from its intended target due to the Earth's rotation. Military strategists and engineers must incorporate these corrections into their targeting systems to ensure accuracy, especially for intercontinental ballistic missiles.

## 3. Prerequisites — what you must know first

Before diving deep into rotating frames, ensure you have a solid grasp of these foundational concepts:

*   **Newton's Laws of Motion:** The bedrock of dynamics, especially the second law ($\vec{F} = m\vec{a}$) and the concept of inertia (an object's resistance to changes in motion).
*   **Vectors:** Understanding vector addition, subtraction, scalar multiplication, dot products, and critically, **cross products** (magnitude and direction, right-hand rule).
*   **Kinematics:** The description of motion using position, velocity, and acceleration vectors, both in linear and angular contexts.
*   **Circular Motion:** Concepts like angular velocity ($\vec{\omega}$), angular acceleration ($\vec{\alpha}$), centripetal acceleration ($a_c = v^2/r = \omega^2 r$), and the relationship between linear and angular quantities ($\vec{v} = \vec{\omega} \times \vec{r}$).
*   **Reference Frames:** The distinction between **inertial frames** (where Newton's laws hold true without needing "fictitious" forces) and **non-inertial frames** (accelerating frames where Newton's laws appear to break down unless fictitious forces are introduced).
*   **Calculus:** Specifically, differentiation, including the chain rule and product rule, especially when applied to vectors that might be changing direction as well as magnitude.

## 4. The core idea — step by step

The core idea behind rotating frames is to relate the motion observed from a fixed, non-accelerating (inertial) viewpoint to the motion observed from a spinning (non-inertial) viewpoint. This involves a careful transformation of position, velocity, and acceleration vectors.

### Step 1: The Inertial Frame - Our "True" View

*   **Plain-English Statement:** An inertial frame is like the ultimate "unbiased" observer. It's a reference point that isn't speeding up, slowing down, or turning. From this viewpoint, Newton's laws of motion work perfectly, without any need for made-up forces. If nothing pushes or pulls on an object, it either stays still or moves in a straight line at a constant speed.
*   **Small Concrete Example:** Imagine you're standing on the ground, watching a car drive past at a constant speed on a straight road. You see it moving in a straight line. If the car accelerates, you see a real force (from its engine) causing that acceleration. The ground beneath you (ignoring Earth's rotation for a moment) is a good approximation of an inertial frame.
*   **Formal/Mathematical Version:** In an inertial frame, the sum of all *real* forces acting on an object is directly proportional to its acceleration:
    $$ \sum \vec{F}_{real} = m \vec{a}_{inertial} $$
    Here, $\vec{a}_{inertial}$ is the true acceleration relative to the inertial frame.
*   **What Could Go Wrong:** The biggest mistake here is assuming *any* frame is inertial. A car accelerating, a rocket launching, or a spinning merry-go-round are *not* inertial frames. Newton's laws, as stated, don't directly apply in these non-inertial frames.

### Step 2: The Rotating Frame - A New Perspective

*   **Plain-English Statement:** Now, imagine you *are* the observer who is spinning. You set up your own coordinate system that spins with you. When you look at an object, you describe its position and motion relative to *your* spinning axes. This is a "rotating frame."
*   **Small Concrete Example:** You're on the merry-go-round, and you've drawn X and Y axes on its floor, with the origin at the center. When you describe where a ball is, you're giving its coordinates (x, y) relative to *your* spinning axes.
*   **Formal/Mathematical Version:** Let's define two coordinate systems:
    *   An inertial frame, $S$, with fixed axes $(\hat{i}, \hat{j}, \hat{k})$.
    *   A rotating frame, $S'$, with axes $(\hat{i}', \hat{j}', \hat{k}')$ that rotate with angular velocity $\vec{\omega}$ relative to $S$.
    The origin of $S'$ can also be moving relative to $S$. Let $\vec{R}$ be the position vector of the origin of $S'$ relative to $S$. Let $\vec{r}'$ be the position vector of a particle $P$ relative to $S'$. Then the position vector of $P$ relative to $S$ is:
    $$ \vec{r} = \vec{R} + \vec{r}' $$
*   **What Could Go Wrong:** Forgetting that the basis vectors $(\hat{i}', \hat{j}', \hat{k}')$ of the rotating frame are themselves changing direction with time when viewed from the inertial frame. This is the key insight that drives the entire derivation.

### Step 3: Velocity Transformation

*   **Plain-English Statement:** How does the speed and direction of an object, as seen by the spinning observer, relate to its actual speed and direction as seen by the non-spinning observer? It's not just a simple addition because the spinning observer's own viewpoint is constantly sweeping around.
*   **Small Concrete Example:** A bug crawls radially outwards on a spinning record. From your perspective (spinning with the record), the bug seems to move straight out. But from an overhead, non-spinning perspective, the bug is actually moving outwards *and* sweeping around in a spiral path. The "extra" velocity comes from the record's rotation.
*   **Formal/Mathematical Version:** We need to find the time derivative of $\vec{r}$ in the inertial frame.
    $$ \vec{v}_{inertial} = \frac{d\vec{r}}{dt}|_{inertial} = \frac{d\vec{R}}{dt}|_{inertial} + \frac{d\vec{r}'}{dt}|_{inertial} $$
    The crucial step is how to differentiate $\vec{r}' = x'\hat{i}' + y'\hat{j}' + z'\hat{k}'$ in the inertial frame. Since $\hat{i}', \hat{j}', \hat{k}'$ are rotating, their derivatives are non-zero:
    $$ \frac{d\hat{i}'}{dt} = \vec{\omega} \times \hat{i}' $$
    $$ \frac{d\hat{j}'}{dt} = \vec{\omega} \times \hat{j}' $$
    $$ \frac{d\hat{k}'}{dt} = \vec{\omega} \times \hat{k}' $$
    Applying the product rule to $\vec{r}'$:
    $$ \frac{d\vec{r}'}{dt}|_{inertial} = \left( \frac{dx'}{dt}\hat{i}' + \frac{dy'}{dt}\hat{j}' + \frac{dz'}{dt}\hat{k}' \right) + (x'\frac{d\hat{i}'}{dt} + y'\frac{d\hat{j}'}{dt} + z'\frac{d\hat{k}'}{dt}) $$
    The first term in parentheses is simply the velocity of the particle as observed in the rotating frame, $\vec{v}_{rot}$. The second term simplifies to $\vec{\omega} \times \vec{r}'$.
    So, the general velocity transformation equation is:
    $$ \vec{v}_{inertial} = \vec{V}_{origin} + \vec{v}_{rot} + \vec{\omega} \times \vec{r}' $$
    where $\vec{V}_{origin} = \frac{d\vec{R}}{dt}|_{inertial}$ is the velocity of the rotating frame's origin relative to the inertial frame.
*   **What Could Go Wrong:** Forgetting the $\vec{\omega} \times \vec{r}'$ term. This term represents the velocity due to the rotation of the frame itself. It's the speed at which a point fixed in the rotating frame (at position $\vec{r}'$) would be moving relative to the inertial frame.

### Step 4: Acceleration Transformation - The Fictitious Forces Emerge

*   **Plain-English Statement:** This is the big one! We take the velocity transformation and apply the same differentiation process again. When we do, a bunch of "extra" terms pop out. These terms are what we call the fictitious forces (centrifugal, Coriolis, Euler) when we rearrange Newton's second law for the rotating frame. They appear because the rotating frame itself is accelerating (both linearly if its origin moves, and angularly because it's spinning).
*   **Small Concrete Example:** If you're on the merry-go-round and try to describe the acceleration of the ball from Step 3, you'll find that its acceleration isn't just what you directly observe. You'll need to add terms that account for the merry-go-round's spin.
*   **Formal/Mathematical Version:** We differentiate the velocity transformation equation with respect to time in the inertial frame:
    $$ \vec{a}_{inertial} = \frac{d\vec{v}_{inertial}}{dt}|_{inertial} = \frac{d}{dt}|_{inertial} \left( \vec{V}_{origin} + \vec{v}_{rot} + \vec{\omega} \times \vec{r}' \right) $$
    This is a lengthy derivation, but the result is:
    $$ \vec{a}_{inertial} = \vec{A}_{origin} + \vec{a}_{rot} + 2\vec{\omega} \times \vec{v}_{rot} + \vec{\omega} \times (\vec{\omega} \times \vec{r}') + \dot{\vec{\omega}} \times \vec{r}' $$
    where $\vec{A}_{origin} = \frac{d\vec{V}_{origin}}{dt}|_{inertial}$ is the acceleration of the rotating frame's origin relative to the inertial frame, and $\vec{a}_{rot} = \frac{d\vec{v}_{rot}}{dt}|_{rot}$ is the acceleration of the particle relative to the rotating frame.
*   **What Could Go Wrong:** This is where most errors occur due to the complexity. Missing any of the terms, especially the factor of 2 in the Coriolis term, or confusing the order of cross products, are common pitfalls.

### Step 5: Centrifugal Force

*   **Plain-English Statement:** This is the outward push you feel when you're in any rotating system. If you're on a spinning ride, you feel flung outwards. It's not a direct push from outside; it's your inertia trying to make you go in a straight line, while the rotating system forces you into a curve. From the rotating frame's perspective, this "force" appears to be pushing you out.
*   **Small Concrete Example:** When a car turns a sharp corner, you feel pressed against the outside door. That's the centrifugal effect. Your body wants to continue in a straight line (due to inertia), but the car is turning, so it's a fictitious force in the car's non-inertial frame.
*   **Formal/Mathematical Version:** From Step 4, the term $\vec{\omega} \times (\vec{\omega} \times \vec{r}')$ is related to the centripetal acceleration. If we substitute the acceleration transformation into Newton's second law ($\vec{F}_{real} = m \vec{a}_{inertial}$), and rearrange to solve for the "apparent" force in the rotating frame ($\vec{F}_{rot} = m\vec{a}_{rot}$), we get:
    $$ m\vec{a}_{rot} = \vec{F}_{real} - m\vec{A}_{origin} - 2m(\vec{\omega} \times \vec{v}_{rot}) - m(\vec{\omega} \times (\vec{\omega} \times \vec{r}')) - m(\dot{\vec{\omega}} \times \vec{r}') $$
    The centrifugal force is the term:
    $$ \vec{F}_{centrifugal} = -m(\vec{\omega} \times (\vec{\omega} \times \vec{r}')) $$
    This force is always directed radially outwards from the axis of rotation. Note that $\vec{\omega} \times (\vec{\omega} \times \vec{r}')$ is the centripetal acceleration, directed inwards. So the centrifugal force is equal in magnitude and opposite in direction to the centripetal force required to keep the object in circular motion *if it were stationary in the rotating frame*.
*   **What Could Go Wrong:** Confusing centrifugal force with centripetal force. **Centripetal force is a real force** (e.g., tension in a string, gravity) that causes an object to move in a circle. **Centrifugal force is a fictitious force** observed *only* in a rotating frame, appearing to push objects outwards.

### Step 6: Coriolis Force

*   **Plain-English Statement:** This is the apparent sideways deflection of a moving object as seen from a rotating frame. If you throw a ball straight across a spinning merry-go-round, it appears to curve to the side. This is the Coriolis force at work. It only affects objects that are *moving* relative to the rotating frame.
*   **Small Concrete Example:** Imagine you're on a large turntable spinning counter-clockwise. You throw a ball straight from the center towards the edge. From your perspective, the ball curves to its right. If you throw it from the edge towards the center, it also curves to its right.
*   **Formal/Mathematical Version:** From the acceleration transformation in Step 4, the Coriolis force term is:
    $$ \vec{F}_{Coriolis} = -2m(\vec{\omega} \times \vec{v}_{rot}) $$
    The direction of the Coriolis force is perpendicular to both the angular velocity vector $\vec{\omega}$ and the velocity of the object in the rotating frame $\vec{v}_{rot}$. Its magnitude is $2m\omega v_{rot} \sin\theta$, where $\theta$ is the angle between $\vec{\omega}$ and $\vec{v}_{rot}$.
*   **What Could Go Wrong:** Forgetting the factor of 2. Incorrectly determining the direction of the cross product (use the right-hand rule carefully). Remembering that it only acts on objects *moving* in the rotating frame ($\vec{v}_{rot} \neq 0$).

### Step 7: Euler Force (Angular Acceleration)

*   **Plain-English Statement:** This force appears if the *rate* at which the rotating frame is spinning is changing – either speeding up or slowing down. If the merry-go-round suddenly speeds up, you feel a push that's different from the outward centrifugal push.
*   **Small Concrete Example:** You're on a merry-go-round, and it suddenly starts spinning faster. You feel a push *backwards* (tangential to the rotation) as it accelerates. This is the Euler force.
*   **Formal/Mathematical Version:** From the acceleration transformation in Step 4, the Euler force term is:
    $$ \vec{F}_{Euler} = -m(\dot{\vec{\omega}} \times \vec{r}') $$
    where $\dot{\vec{\omega}}$ is the angular acceleration of the rotating frame. This force is tangential to the circular path and is present only when the angular velocity $\vec{\omega}$ is changing (i.e., the frame is angularly accelerating).
*   **What Could Go Wrong:** Often overlooked because many problems assume constant angular velocity ($\dot{\vec{\omega}} = 0$).

## 5. Worked examples — multiple, with every step shown

We will use the general equation for the apparent force in a rotating frame, assuming the origin of the rotating frame is fixed relative to the inertial frame ($\vec{A}_{origin} = 0$) and the angular velocity is constant ($\dot{\vec{\omega}} = 0$):

$$ m\vec{a}_{rot} = \vec{F}_{real} - m(\vec{\omega} \times (\vec{\omega} \times \vec{r}')) - 2m(\vec{\omega} \times \vec{v}_{rot}) $$
Or, expressed with the fictitious forces explicitly:
$$ m\vec{a}_{rot} = \vec{F}_{real} + \vec{F}_{centrifugal} + \vec{F}_{Coriolis} $$

### Example 1: Centrifugal Force on a Stationary Object on a Rotating Disk

**Problem:** A small block of mass $m=0.5 \text{ kg}$ is placed on a horizontal turntable that rotates with a constant angular velocity of $\vec{\omega} = (0, 0, 2\pi) \text{ rad/s}$ (i.e., $2\pi \text{ rad/s}$ counter-clockwise about the z-axis). The block is located at a position $\vec{r}' = (0.2, 0, 0) \text{ m}$ relative to the center of the turntable. Calculate the centrifugal force acting on the block as observed from the rotating frame.

**Given:**
*   Mass $m = 0.5 \text{ kg}$
*   Angular velocity $\vec{\omega} = (0, 0, 2\pi) \text{ rad/s}$
*   Position vector $\vec{r}' = (0.2, 0, 0) \text{ m}$ (in the rotating frame)
*   The block is stationary relative to the rotating frame, so $\vec{v}_{rot} = (0, 0, 0) \text{ m/s}$.

**We want:** The centrifugal force $\vec{F}_{centrifugal}$.

**Solution:**

1.  **Recall the formula for centrifugal force:**
    $$ \vec{F}_{centrifugal} = -m(\vec{\omega} \times (\vec{\omega} \times \vec{r}')) $$
    *This is the defining equation for centrifugal force in a rotating frame.*

2.  **Calculate the inner cross product $\vec{\omega} \times \vec{r}'$:**
    $$ \vec{\omega} \times \vec{r}' = \begin{vmatrix} \hat{i}' & \hat{j}' & \hat{k}' \\ 0 & 0 & 2\pi \\ 0.2 & 0 & 0 \end{vmatrix} $$
    *We set up the determinant for the cross product of the angular velocity vector and the position vector.*
    $$ = \hat{i}'(0 \cdot 0 - 2\pi \cdot 0) - \hat{j}'(0 \cdot 0 - 2\pi \cdot 0.2) + \hat{k}'(0 \cdot 0 - 0 \cdot 0.2) $$
    *Expand the determinant. Remember the signs for each component.*
    $$ = \hat{i}'(0) - \hat{j}'(-0.4\pi) + \hat{k}'(0) $$
    *Simplify the terms.*
    $$ = (0, 0.4\pi, 0) \text{ m/s} $$
    *This intermediate vector represents the tangential velocity that a point fixed at $\vec{r}'$ would have relative to the inertial frame. Its direction is along the positive y-axis, perpendicular to both $\vec{\omega}$ (z-axis) and $\vec{r}'$ (x-axis).*

3.  **Calculate the outer cross product $\vec{\omega} \times (\vec{\omega} \times \vec{r}')$:**
    Let $\vec{A} = \vec{\omega} \times \vec{r}' = (0, 0.4\pi, 0)$.
    $$ \vec{\omega} \times \vec{A} = \begin{vmatrix} \hat{i}' & \hat{j}' & \hat{k}' \\ 0 & 0 & 2\pi \\ 0 & 0.4\pi & 0 \end{vmatrix} $$
    *Now we perform the cross product of $\vec{\omega}$ with the result from step 2.*
    $$ = \hat{i}'(0 \cdot 0 - 2\pi \cdot 0.4\pi) - \hat{j}'(0 \cdot 0 - 2\pi \cdot 0) + \hat{k}'(0 \cdot 0.4\pi - 0 \cdot 0) $$
    *Expand the determinant.*
    $$ = \hat{i}'(-0.8\pi^2) - \hat{j}'(0) + \hat{k}'(0) $$
    *Simplify the terms.*
    $$ = (-0.8\pi^2, 0, 0) \text{ m/s}^2 $$
    *This vector represents the centripetal acceleration, which is directed towards the center of rotation (negative x-direction, opposite to $\vec{r}'$).*

4.  **Calculate the centrifugal force $\vec{F}_{centrifugal}$:**
    $$ \vec{F}_{centrifugal} = -m(\vec{\omega} \times (\vec{\omega} \times \vec{r}')) $$
    *Substitute the mass and the result from step 3 into the centrifugal force formula.*
    $$ \vec{F}_{centrifugal} = -(0.5 \text{ kg})(-0.8\pi^2, 0, 0) \text{ m/s}^2 $$
    $$ \vec{F}_{centrifugal} = (0.4\pi^2, 0, 0) \text{ N} $$
    *Multiply by the negative mass. The negative sign flips the direction from centripetal (inwards) to centrifugal (outwards).*

5.  **Calculate the numerical value:**
    $$ \vec{F}_{centrifugal} \approx (0.4 \cdot (3.14159)^2, 0, 0) \text{ N} $$
    $$ \vec{F}_{centrifugal} \approx (0.4 \cdot 9.8696, 0, 0) \text{ N} $$
    $$ \boxed{\vec{F}_{centrifugal} \approx (3.948, 0, 0) \text{ N}} $$
    *Perform the final numerical calculation. The force is directed outwards along the positive x-axis, as expected.*

**Reflection:** This example demonstrates that for an object stationary in a rotating frame, only the centrifugal force term is active among the fictitious forces (assuming constant $\vec{\omega}$ and fixed origin). The direction of the centrifugal force is always radially outwards, opposite to the position vector $\vec{r}'$ from the axis of rotation, if $\vec{\omega}$ is perpendicular to the plane of rotation.

---

### Example 2: Coriolis Force on a Radially Moving Object on a Rotating Disk

**Problem:** A puck of mass $m=0.1 \text{ kg}$ is sliding outwards on a frictionless horizontal turntable. The turntable rotates counter-clockwise with a constant angular velocity $\vec{\omega} = (0, 0, 5) \text{ rad/s}$. When the puck is at $\vec{r}' = (0.3, 0, 0) \text{ m}$, its velocity relative to the turntable is $\vec{v}_{rot} = (2, 0, 0) \text{ m/s}$ (radially outwards). Calculate the Coriolis force acting on the puck.

**Given:**
*   Mass $m = 0.1 \text{ kg}$
*   Angular velocity $\vec{\omega} = (0, 0, 5) \text{ rad/s}$
*   Position vector $\vec{r}' = (0.3, 0, 0) \text{ m}$ (in the rotating frame)
*   Velocity relative to rotating frame $\vec{v}_{rot} = (2, 0, 0) \text{ m/s}$

**We want:** The Coriolis force $\vec{F}_{Coriolis}$.

**Solution:**

1.  **Recall the formula for Coriolis force:**
    $$ \vec{F}_{Coriolis} = -2m(\vec{\omega} \times \vec{v}_{rot}) $$
    *This is the defining equation for Coriolis force in a rotating frame.*

2.  **Calculate the cross product $\vec{\omega} \times \vec{v}_{rot}$:**
    $$ \vec{\omega} \times \vec{v}_{rot} = \begin{vmatrix} \hat{i}' & \hat{j}' & \hat{k}' \\ 0 & 0 & 5 \\ 2 & 0 & 0 \end{vmatrix} $$
    *Set up the determinant for the cross product of the angular velocity vector and the velocity vector in the rotating frame.*
    $$ = \hat{i}'(0 \cdot 0 - 5 \cdot 0) - \hat{j}'(0 \cdot 0 - 5 \cdot 2) + \hat{k}'(0 \cdot 0 - 0 \cdot 2) $$
    *Expand the determinant.*
    $$ = \hat{i}'(0) - \hat{j}'(-10) + \hat{k}'(0) $$
    *Simplify the terms.*
    $$ = (0, 10, 0) \text{ m/s}^2 $$
    *This vector points along the positive y-axis. According to the right-hand rule, if $\vec{\omega}$ is along +z and $\vec{v}_{rot}$ is along +x, then $\vec{\omega} \times \vec{v}_{rot}$ is along +y.*

3.  **Calculate the Coriolis force $\vec{F}_{Coriolis}$:**
    $$ \vec{F}_{Coriolis} = -2m(\vec{\omega} \times \vec{v}_{rot}) $$
    *Substitute the mass and the result from step 2 into the Coriolis force formula.*
    $$ \vec{F}_{Coriolis} = -2(0.1 \text{ kg})(0, 10, 0) \text{ m/s}^2 $$
    $$ \vec{F}_{Coriolis} = (0, -2, 0) \text{ N} $$
    *Multiply by $-2m$. The negative sign flips the direction from +y to -y.*

    $$ \boxed{\vec{F}_{Coriolis} = (0, -2, 0) \text{ N}} $$
    *The Coriolis force is directed along the negative y-axis. This means it deflects the puck to its right (if moving in the +x direction on a counter-clockwise rotating platform).*

**Reflection:** This example shows that the Coriolis force acts perpendicular to the direction of motion relative to the rotating frame and to the axis of rotation. For a counter-clockwise rotation (positive z-axis) and outward radial motion (positive x-axis), the Coriolis force points to the "right" (negative y-axis). This is consistent with the Northern Hemisphere's weather patterns (deflection to the right).

---

### Example 3: Projectile Motion on a Rotating Earth (Simplified)

**Problem:** A projectile of mass $m=10 \text{ kg}$ is fired vertically upwards from the equator. The Earth's angular velocity is $\vec{\omega} \approx (0, 0, 7.29 \times 10^{-5}) \text{ rad/s}$ (pointing along the North Pole). The initial velocity of the projectile relative to the Earth's surface is $\vec{v}_{rot} = (0, 0, 100) \text{ m/s}$. The projectile is at the equator, so its initial position vector from the center of the Earth to the launch point is $\vec{r}' = (R_E, 0, 0)$, where $R_E \approx 6.37 \times 10^6 \text{ m}$. We want to find the initial Coriolis force acting on the projectile. (Assume a coordinate system where x-axis points from Earth's center to the launch point, z-axis points North, and y-axis points East).

**Given:**
*   Mass $m = 10 \text{ kg}$
*   Earth's angular velocity $\vec{\omega} = (0, 0, \Omega_E)$ where $\Omega_E = 7.29 \times 10^{-5} \text{ rad/s}$
*   Initial velocity relative to Earth's surface $\vec{v}_{rot} = (0, 0, v_z)$ where $v_z = 100 \text{ m/s}$
*   Initial position vector $\vec{r}' = (R_E, 0, 0)$ where $R_E = 6.37 \times 10^6 \text{ m}$

**We want:** The initial Coriolis force $\vec{F}_{Coriolis}$.

**Solution:**

1.  **Recall the formula for Coriolis force:**
    $$ \vec{F}_{Coriolis} = -2m(\vec{\omega} \times \vec{v}_{rot}) $$
    *This is the fundamental equation for Coriolis force.*

2.  **Identify the vectors in the given coordinate system:**
    *   $\vec{\omega} = (0, 0, \Omega_E)$
    *   $\vec{v}_{rot} = (0, 0, v_z)$
    *The Earth's angular velocity vector is along the z-axis (North Pole). The projectile is fired vertically, which is also along the z-axis in this simplified setup at the equator.*

3.  **Calculate the cross product $\vec{\omega} \times \vec{v}_{rot}$:**
    $$ \vec{\omega} \times \vec{v}_{rot} = \begin{vmatrix} \hat{i}' & \hat{j}' & \hat{k}' \\ 0 & 0 & \Omega_E \\ 0 & 0 & v_z \end{vmatrix} $$
    *Set up the determinant for the cross product.*
    $$ = \hat{i}'(0 \cdot v_z - \Omega_E \cdot 0) - \hat{j}'(0 \cdot v_z - \Omega_E \cdot 0) + \hat{k}'(0 \cdot 0 - 0 \cdot 0) $$
    *Expand the determinant.*
    $$ = \hat{i}'(0) - \hat{j}'(0) + \hat{k}'(0) $$
    *Simplify the terms.*
    $$ = (0, 0, 0) $$
    *The cross product of two parallel vectors is zero. In this case, both $\vec{\omega}$ and $\vec{v}_{rot}$ are along the z-axis.*

4.  **Calculate the Coriolis force $\vec{F}_{Coriolis}$:**
    $$ \vec{F}_{Coriolis} = -2m(\vec{\omega} \times \vec{v}_{rot}) $$
    *Substitute the result from step 3.*
    $$ \vec{F}_{Coriolis} = -2(10 \text{ kg})(0, 0, 0) \text{ m/s}^2 $$
    $$ \boxed{\vec{F}_{Coriolis} = (0, 0, 0) \text{ N}} $$

**Reflection:** This example highlights a critical point: the Coriolis force is zero if the velocity of the object relative to the rotating frame is parallel or anti-parallel to the angular velocity vector of the frame ($\vec{v}_{rot} \parallel \vec{\omega}$). In this simplified scenario, firing a projectile vertically upwards from the equator means its initial velocity is parallel to Earth's rotation axis, thus experiencing no initial Coriolis deflection. This is a common trap! Real-world projectile motion on Earth is more complex, as the local vertical direction is generally not parallel to the Earth's rotation axis (except at the poles). At the equator, the local vertical is perpendicular to the rotation axis. Let's re-evaluate the setup for a more realistic scenario.

---

### Example 4: Coriolis Force on a Projectile Fired Eastward from the Equator (More Realistic)

**Problem:** A projectile of mass $m=10 \text{ kg}$ is fired eastward from the equator. The Earth's angular velocity is $\vec{\omega} = (0, \Omega_E, 0)$ where $\Omega_E = 7.29 \times 10^{-5} \text{ rad/s}$ (now we orient the coordinate system such that the y-axis is along the Earth's rotation axis, x-axis towards the projectile, z-axis eastward). The initial velocity of the projectile relative to the Earth's surface is $\vec{v}_{rot} = (0, 0, 100) \text{ m/s}$ (eastward). Calculate the initial Coriolis force.

**Given:**
*   Mass $m = 10 \text{ kg}$
*   Earth's angular velocity $\vec{\omega} = (0, \Omega_E, 0)$ where $\Omega_E = 7.29 \times 10^{-5} \text{ rad/s}$ (y-axis points North)
*   Initial velocity relative to Earth's surface $\vec{v}_{rot} = (0, 0, v_z)$ where $v_z = 100 \text{ m/s}$ (z-axis points East)

**We want:** The initial Coriolis force $\vec{F}_{Coriolis}$.

**Solution:**

1.  **Recall the formula for Coriolis force:**
    $$ \vec{F}_{Coriolis} = -2m(\vec{\omega} \times \vec{v}_{rot}) $$
    *This is the fundamental equation for Coriolis force.*

2.  **Identify the vectors in the given coordinate system:**
    *   $\vec{\omega} = (0, \Omega_E, 0)$ (angular velocity along y-axis, North)
    *   $\vec{v}_{rot} = (0, 0, v_z)$ (velocity along z-axis, East)
    *This setup is more appropriate for the equator. The local vertical is perpendicular to the Earth's axis of rotation, and horizontal motion at the equator is perpendicular to the axis of rotation.*

3.  **Calculate the cross product $\vec{\omega} \times \vec{v}_{rot}$:**
    $$ \vec{\omega} \times \vec{v}_{rot} = \begin{vmatrix} \hat{i}' & \hat{j}' & \hat{k}' \\ 0 & \Omega_E & 0 \\ 0 & 0 & v_z \end{vmatrix} $$
    *Set up the determinant for the cross product.*
    $$ = \hat{i}'(\Omega_E \cdot v_z - 0 \cdot 0) - \hat{j}'(0 \cdot v_z - 0 \cdot 0) + \hat{k}'(0 \cdot 0 - \Omega_E \cdot 0) $$
    *Expand the determinant.*
    $$ = \hat{i}'(\Omega_E v_z) - \hat{j}'(0) + \hat{k}'(0) $$
    *Simplify the terms.*
    $$ = (\Omega_E v_z, 0, 0) $$
    *This vector points along the positive x-axis. Using the right-hand rule, if $\vec{\omega}$ is along +y (North) and $\vec{v}_{rot}$ is along +z (East), then $\vec{\omega} \times \vec{v}_{rot}$ is along +x (outwards, away from Earth's center).*

4.  **Calculate the Coriolis force $\vec{F}_{Coriolis}$:**
    $$ \vec{F}_{Coriolis} = -2m(\vec{\omega} \times \vec{v}_{rot}) $$
    *Substitute the mass and the result from step 3.*
    $$ \vec{F}_{Coriolis} = -2(10 \text{ kg})(\Omega_E v_z, 0, 0) $$
    $$ \vec{F}_{Coriolis} = (-20 \Omega_E v_z, 0, 0) \text{ N} $$
    *Multiply by $-2m$. The negative sign flips the direction from +x to -x.*

5.  **Calculate the numerical value:**
    $$ \vec{F}_{Coriolis} = (-20 \cdot (7.29 \times 10^{-5}) \cdot 100, 0, 0) \text{ N} $$
    $$ \vec{F}_{Coriolis} = (-2000 \cdot 7.29 \times 10^{-5}, 0, 0) \text{ N} $$
    $$ \vec{F}_{Coriolis} = (-0.1458, 0, 0) \text{ N} $$
    $$ \boxed{\vec{F}_{Coriolis} \approx (-0.146, 0, 0) \text{ N}} $$
    *The Coriolis force is directed along the negative x-axis, which is downwards (towards the center of the Earth) in this coordinate system. So, a projectile fired eastward from the equator experiences a downward Coriolis force.*

**Reflection:** This example demonstrates that projectiles fired eastward from the equator experience a downward Coriolis force. This is a real effect: objects launched eastward travel faster than the Earth's surface and thus experience a reduced effective gravity, causing them to "float" slightly. Conversely, objects launched westward experience an upward Coriolis force. This is a crucial consideration for orbital launches (launching eastward from the equator gets a "boost" from Earth's rotation). The magnitude of this force is small for typical projectiles but significant for long-range ballistics or atmospheric phenomena.

## 6. Common mistakes and traps

1.  **Confusing Centripetal and Centrifugal Forces:** This is perhaps the most common mistake. **Centripetal force is a real force** (e.g., tension, gravity, friction) that *causes* circular motion by pulling an object towards the center. **Centrifugal force is a fictitious force** that *appears* to push objects outwards only when viewed from a rotating (non-inertial) frame. They are equal in magnitude but opposite in direction.
2.  **Forgetting the Factor of 2 in the Coriolis Force:** The Coriolis force formula is $\vec{F}_{Coriolis} = -2m(\vec{\omega} \times \vec{v}_{rot})$. Students often forget the '2', leading to incorrect magnitudes.
3.  **Incorrect Cross Product Direction:** Vector cross products $(\vec{A} \times \vec{B})$ are crucial. Mistakes in applying the right-hand rule or the determinant expansion can lead to incorrect directions for both centrifugal and Coriolis forces, which is critical for understanding their effects.
4.  **Applying Fictitious Forces in an Inertial Frame:** Fictitious forces are *only* introduced to make Newton's second law valid in a non-inertial (accelerating or rotating) frame. If you are working in an inertial frame, you should *only* consider real forces. Including fictitious forces in an inertial frame is a fundamental conceptual error.
5.  **Not Identifying the Correct Reference Frame:** Before solving any problem, clearly define your chosen reference frame. Is it inertial or rotating? This dictates whether you need to include fictitious forces. Many problems are simpler if solved in an inertial frame, but some (like weather patterns) are more intuitively described in a rotating frame.
6.  **Overlooking the Euler Force:** While often simplified away for constant angular velocity, if the rate of rotation of the frame is changing ($\dot{\vec{\omega}} \neq 0$), the Euler force term $\vec{F}_{Euler} = -m(\dot{\vec{\omega}} \times \vec{r}')$ must be included.

## 7. Textbook-precise explanation

In classical mechanics, Newton's laws of motion are strictly valid only in **inertial reference frames**. An inertial frame is one in which an isolated object (experiencing no net force) moves with constant velocity. Any frame moving at a constant velocity relative to an inertial frame is also an inertial frame.

However, many physical phenomena and engineering problems are more conveniently analyzed from the perspective of a **non-inertial reference frame**, which is a frame that is accelerating (linearly or angularly) relative to an inertial frame. When we apply Newton's second law ($\vec{F}_{real} = m\vec{a}$) in a non-inertial frame, we find that it appears to fail. To "save" the form of Newton's second law in a non-inertial frame, we introduce **fictitious forces** (also known as inertial forces). These are not forces arising from physical interactions but are mathematical artifacts that account for the acceleration of the reference frame itself.

Consider an inertial frame $S$ with origin $O$ and a non-inertial rotating frame $S'$ with origin $O'$ and axes $(\hat{i}', \hat{j}', \hat{k}')$ rotating with angular velocity $\vec{\omega}$ relative to $S$. Let $\vec{R}$ be the position vector of $O'$ relative to $O$, and $\vec{r}'$ be the position vector of a particle $P$ relative to $O'$. The position vector of $P$ relative to $O$ is $\vec{r} = \vec{R} + \vec{r}'$.

The time derivative of a vector $\vec{Q}$ observed from an inertial frame ($d\vec{Q}/dt|_S$) versus a rotating frame ($d\vec{Q}/dt|_{S'}$) is given by the operator relationship:
$$ \frac{d}{dt}\Big|_S = \frac{d}{dt}\Big|_{S'} + \vec{\omega} \times $$
Applying this operator twice to the position vector $\vec{r}'$ (relative to the rotating frame) to find its acceleration relative to the inertial frame, and incorporating the acceleration of the rotating frame's origin, yields the general acceleration transformation:
$$ \vec{a}_S = \vec{A}_{O'} + \vec{a}_{S'} + 2\vec{\omega} \times \vec{v}_{S'} + \vec{\omega} \times (\vec{\omega} \times \vec{r}') + \dot{\vec{\omega}} \times \vec{r}' $$
Where:
*   $\vec{a}_S$: Acceleration of the particle in the inertial frame $S$.
*   $\vec{A}_{O'}$: Acceleration of the origin $O'$ of the rotating frame $S'$ relative to the inertial frame $S$.
*   $\vec{a}_{S'}$: Acceleration of the particle relative to the rotating frame $S'$.
*   $\vec{v}_{S'}$: Velocity of the particle relative to the rotating frame $S'$.
*   $\vec{\omega}$: Angular velocity of the rotating frame $S'$ relative to the inertial frame $S$.
*   $\dot{\vec{\omega}}$: Angular acceleration of the rotating frame $S'$ relative to the inertial frame $S$.

Substituting this into Newton's second law $\vec{F}_{real} = m\vec{a}_S$, we get:
$$ \vec{F}_{real} = m\left( \vec{A}_{O'} + \vec{a}_{S'} + 2\vec{\omega} \times \vec{v}_{S'} + \vec{\omega} \times (\vec{\omega} \times \vec{r}') + \dot{\vec{\omega}} \times \vec{r}' \right) $$
Rearranging to express the apparent force in the rotating frame ($m\vec{a}_{S'}$):
$$ m\vec{a}_{S'} = \vec{F}_{real} - m\vec{A}_{O'} - 2m(\vec{\omega} \times \vec{v}_{S'}) - m(\vec{\omega} \times (\vec{\omega} \times \vec{r}')) - m(\dot{\vec{\omega}} \times \vec{r}') $$
The terms on the right-hand side, besides the real force $\vec{F}_{real}$, are the fictitious forces:

1.  **Translational Fictitious Force:** $\vec{F}_{translational} = -m\vec{A}_{O'}$. This force arises if the origin of the rotating frame is linearly accelerating.
2.  **Coriolis Force:** $\vec{F}_{Coriolis} = -2m(\vec{\omega} \times \vec{v}_{S'})$. This force acts on objects moving relative to the rotating frame and is perpendicular to both $\vec{\omega}$ and $\vec{v}_{S'}$. It is responsible for deflecting paths of moving objects.
3.  **Centrifugal Force:** $\vec{F}_{centrifugal} = -m(\vec{\omega} \times (\vec{\omega} \times \vec{r}'))$. This force is directed radially outwards from the axis of rotation and is present even for objects stationary in the rotating frame. It can also be written as $m\omega^2 \vec{r}_{\perp}$ where $\vec{r}_{\perp}$ is the component of $\vec{r}'$ perpendicular to $\vec{\omega}$.
4.  **Euler Force:** $\vec{F}_{Euler} = -m(\dot{\vec{\omega}} \times \vec{r}')$. This force arises if the angular velocity of the rotating frame is changing (i.e., the frame is angularly accelerating). It is tangential to the circular path.

Thus, in a rotating frame, Newton's second law takes the form:
$$ \vec{F}_{net, apparent} = m\vec{a}_{S'} = \vec{F}_{real} + \vec{F}_{translational} + \vec{F}_{Coriolis} + \vec{F}_{centrifugal} + \vec{F}_{Euler} $$
This formal derivation is standard in classical mechanics textbooks such as *Classical Mechanics* by John R. Taylor, Chapter 9, or *Mechanics* by L.D. Landau and E.M. Lifshitz, Chapter 4.

## 8. ASCII diagrams

```text
       ^ North Pole (omega vector points out of page)
       |
       |
       |  . . . . . . . . . . . . . . . . . . . .
       |  .                                   .
       |  .    O (Center of Merry-Go-Round)   .
       |  .    |                              .
       |  .    |                              .
       |  .    v_rot (object velocity in rot frame)
       |  .    |                              .
       |  .    |                              .
       |  .    * (Object)                     .
       |  .      \                            .
       |  .       \ Coriolis deflection      .
       |  .        \ (to the right in NH)    .
       |  .         \                       .
       |  . . . . . . . . . . . . . . . . . . . .
       |
       |
       v
      South Pole

    Figure 1: Coriolis effect on a merry-go-round (top-down view).
              The merry-go-round rotates counter-clockwise (angular velocity
              vector 'omega' points upwards, out of the page).
              An object moves radially outwards from the center (O) with
              velocity v_rot.
              From the perspective of an observer on the merry-go-round,
              the object appears to be deflected to its right.
              This deflection is caused by the Coriolis force.
```

```text
       +-------------------------------------------------+
       |                                                 |
       |             Inertial Frame (Fixed Observer)     |
       |                                                 |
       |                                                 |
       |           O -----------------> P                |
       |           (Origin) (Path is a straight line)    |
       |                                                 |
       |                                                 |
       +-------------------------------------------------+


       +-------------------------------------------------+
       |                                                 |
       |            Rotating Frame (Spinning Observer)   |
       |            (Observer at O, spinning CCW)        |
       |                                                 |
       |                                                 |
       |           O                                     |
       |            \                                    |
       |             \                                   |
       |              \                                  |
       |               P (Path appears curved)           |
       |                                                 |
       +-------------------------------------------------+

    Figure 2: Apparent path of an object in inertial vs. rotating frames.
              Top: In an inertial frame, an object (P) launched from O
                   travels in a straight line.
              Bottom: In a rotating frame (spinning counter-clockwise),
                      the same object launched from O appears to curve.
                      The fictitious forces (Coriolis, centrifugal) are
                      introduced to explain this apparent curve within
                      the rotating frame.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   For **Centrifugal Force**: Think of a "Centrifuge" in a lab – it spins really fast and *flings* things *outwards*. The "fugal" part of centrifugal sounds like "fugitive" or "fleeing," always trying to flee the center.
    *   For **Coriolis Force**: Imagine a "Corpse" (Coriolis sounds like this) trying to walk straight across a spinning merry-go-round. The corpse keeps getting *pushed sideways* unexpectedly. Alternatively, "Coriolis: The Two-Headed Serpent that Twists" - "Two" for the $2m$ factor, "Serpent" for the twisting, deflecting motion.

2.  **The 1-3 Formulas/Facts You MUST Overlearn:**
    *   **Centrifugal Force:** $\vec{F}_{centrifugal} = -m(\vec{\omega} \times (\vec{\omega} \times \vec{r}'))$. Always outwards from the axis of rotation.
    *   **Coriolis Force:** $\vec{F}_{Coriolis} = -2m(\vec{\omega} \times \vec{v}_{rot})$. Always perpendicular to both $\vec{\omega}$ and $\vec{v}_{rot}$, and only acts on moving objects.
    *   **The Big Picture:** Fictitious forces are *only* used in non-inertial (accelerating/rotating) frames to make Newton's second law appear valid. They are not interaction forces.

3.  **Spaced-Repetition Schedule:**
    *   **Initial Review:** Immediately after this lesson.
    *   **Day 1:** Review the definitions, formulas, and the general acceleration transformation. Try to explain them in your own words.
    *   **Day 3:** Rework one example from memory. Focus on the cross product directions.
    *   **Day 7:** Review the common mistakes. Try to derive the velocity transformation from first principles.
    *   **Day 16:** Rework a harder example. Try to derive the full acceleration transformation (or at least the fictitious force terms).
    *   **Day 35:** Explain the concepts to someone else (even if it's just an imaginary person). Connect it to real-world applications.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the exact formulas, you can always rebuild them by remembering the fundamental relationship between derivatives in inertial and rotating frames:
    *   **Step 1 (Position):** Start with $\vec{r} = \vec{R} + \vec{r}'$, where $\vec{r}$ is inertial position, $\vec{R}$ is origin of rotating frame, and $\vec{r}'$ is position in rotating frame.
    *   **Step 2 (Velocity):** Differentiate $\vec{r}$ with respect to time in the inertial frame. Remember that the basis vectors of $\vec{r}'$ are rotating, so $\frac{d\hat{u}'}{dt} = \vec{\omega} \times \hat{u}'$. This leads to $\frac{d\vec{r}'}{dt}|_{inertial} = \frac{d\vec{r}'}{dt}|_{rot} + \vec{\omega} \times \vec{r}'$. Combine this to get $\vec{v}_{inertial} = \vec{V}_{origin} + \vec{v}_{rot} + \vec{\omega} \times \vec{r}'$.
    *   **Step 3 (Acceleration):** Differentiate the velocity equation from Step 2 with respect to time in the inertial frame. Apply the same derivative operator rule to *every* term involving a vector defined in the rotating frame (like $\vec{v}_{rot}$ and $\vec{r}'$). Be careful with the product rule for $\vec{\omega} \times \vec{r}'$ (it becomes $(\dot{\vec{\omega}} \times \vec{r}') + (\vec{\omega} \times \vec{v}_{rot}) + (\vec{\omega} \times (\vec{\omega} \times \vec{r}'))$).
    *   **Step 4 (Forces):** Once you have the full acceleration transformation, substitute it into $\vec{F}_{real} = m\vec{a}_{inertial}$ and rearrange to solve for $m\vec{a}_{rot}$. All the terms you move to the right side will be the fictitious forces.

## 10. Connections — what this leads to

Understanding rotating frames and fictitious forces is a cornerstone for many advanced topics in physics and engineering:

*   **Gyroscopic Precession and Nutation:** The behavior of gyroscopes, crucial in navigation and control systems, is fundamentally explained by the interplay of angular momentum and torques in a rotating frame, leading to phenomena like precession (the slow rotation of the gyroscope's axis) and nutation (wobbling).
*   **Foucault Pendulum:** This famous experiment, demonstrating the Earth's rotation, is a direct manifestation of the Coriolis force acting on the pendulum's swing plane.
*   **General Relativity:** While seemingly distant, the concept of fictitious forces provides an intuitive bridge to general relativity. Einstein's equivalence principle states that locally, the effects of gravity are indistinguishable from the effects of acceleration. This means that a gravitational field can be thought of as a fictitious force arising from being in an accelerating (or curved) spacetime frame.
*   **Orbital Mechanics and Perturbations:** The precise calculation of satellite orbits, especially those influenced by the non-spherical shape of Earth or other celestial bodies, requires accounting for the Earth's rotation and other rotational effects.
*   **Control Systems for Spacecraft:** Designing attitude control systems for satellites and rockets heavily relies on understanding rotational dynamics, including how to use reaction wheels or thrusters to counteract or induce rotation, and how to interpret sensor data from IMUs in a rotating craft.
*   **Advanced Fluid Dynamics:** The study of large-scale fluid flows (like atmospheric and oceanic currents) on rotating planets is governed by the Navier-Stokes equations, which explicitly include Coriolis and centrifugal terms. This leads to concepts like geostrophic flow, Ekman layers, and Rossby waves.
*   **Plasma Physics:** In magnetically confined plasmas (e.g., in fusion reactors), particles move in complex paths due to electromagnetic forces, and the analysis often benefits from considering rotating frames to simplify the equations of motion.

## 11. Self-check questions

1.  Explain in your own words the fundamental difference between centripetal force and centrifugal force. Under what circumstances would an observer experience or measure each?
2.  A child is riding a bicycle on a perfectly flat, frictionless, giant merry-go-round that is rotating counter-clockwise at a constant angular velocity. If the child tries to ride straight from the center of the merry-go-round towards its edge, describe the apparent path of the bicycle as observed by the child and by an observer standing still on the ground next to the merry-go-round. What fictitious force is primarily responsible for the child's observation?
3.  Derive the expression for the Coriolis force, $\vec{F}_{Coriolis} = -2m(\vec{\omega} \times \vec{v}_{rot})$, starting from the general acceleration transformation equation and assuming a fixed origin and constant angular velocity. Clearly identify which terms are neglected.
4.  Consider a simplified model of Earth where a coordinate system is fixed at the North Pole, with the z-axis aligned with Earth's rotation axis. A projectile is fired horizontally (in the x-y plane) from the North Pole towards the equator. Describe the direction of the Coriolis force acting on the projectile. How would this differ if the projectile was fired from the equator towards the North Pole?
5.  A high-speed centrifuge spins a sample at $100,000 \text{ rpm}$ (revolutions per minute). A particle of mass $10^{-12} \text{ kg}$ is located $5 \text{ cm}$ from the axis of rotation and is moving radially outwards at $1 \text{ mm/s}$ relative to the centrifuge. Calculate the magnitude of both the centrifugal force and the Coriolis force acting on the particle. Which force is dominant in this scenario, and why?