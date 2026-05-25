## What it is
These equations are the bridge connecting the linear motion of a point on a rotating object to the rotational motion of the object as a whole. They state that the linear speed ($v$), tangential acceleration ($a_t$), and centripetal acceleration ($a_c$) of a point are directly proportional to its distance from the axis of rotation ($r$) and the object's angular velocity ($\omega$) or angular acceleration ($\alpha$).

## Why it matters
In aerospace, these relationships are fundamental to designing and analyzing any spinning component, from a satellite's reaction wheels and gyroscopes to the turbopumps in a rocket engine, where turbine blade tips can reach supersonic linear speeds. In physics, they are essential for describing planetary orbits and the motion of charged particles in magnetic fields. In computer science, they are used in robotics for manipulator arm kinematics and in graphics for realistic animation of rotating objects.

## When to study it
You must be comfortable with the following prerequisites. If not, master them first.
1.  **Basic Kinematics:** Definitions of linear displacement, velocity ($v$), and acceleration ($a$).
2.  **Calculus:** The concept of a time derivative ($d/dt$).
3.  **Circular Motion Fundamentals:** The definition of radius ($r$) and arc length ($s$).
4.  **Angular Kinematics:** The definitions of angular displacement ($\theta$), angular velocity ($\omega = d\theta/dt$), and angular acceleration ($\alpha = d\omega/dt$).
5.  **Radians:** You must understand that an angle in radians is defined as the ratio of arc length to radius, $\theta = s/r$. These formulas are invalid if you use degrees.

## How to study it (step by step)
1.  **Derive $v = r\omega$ from first principles.** Start with the definition of an angle in radians: $\theta = s/r$, where $s$ is the arc length. Rearrange to $s = r\theta$. Since linear velocity is the rate of change of linear displacement ($v = ds/dt$) and angular velocity is the rate of change of angular displacement ($\omega = d\theta/dt$), take the time derivative of $s = r\theta$. Assume the radius $r$ is constant for a rigid body.
    $$ v = \frac{ds}{dt} = \frac{d}{dt}(r\theta) = r \frac{d\theta}{dt} = r\omega $$
2.  **Derive $a_t = r\alpha$ from the velocity relation.** Tangential acceleration is the rate of change of linear *speed*, $a_t = dv/dt$. Take the time derivative of the result from step 1, $v = r\omega$. Again, assume $r$ is constant.
    $$ a_t = \frac{dv}{dt} = \frac{d}{dt}(r\omega) = r \frac{d\omega}{dt} = r\alpha $$
    This acceleration is *tangent* to the circular path. It only exists if the object is speeding up or slowing down its rotation ($\alpha \neq 0$).
3.  **Derive $a_c = r\omega^2$ from the definition of centripetal acceleration.** Recall from kinematics that for an object moving in a circle of radius $r$ at a constant speed $v$, there is an acceleration directed towards the center of the circle, $a_c = v^2/r$. This acceleration changes the *direction* of the velocity vector, not its magnitude. Substitute your result from step 1 ($v=r\omega$) into this equation.
    $$ a_c = \frac{v^2}{r} = \frac{(r\omega)^2}{r} = \frac{r^2\omega^2}{r} = r\omega^2 $$
4.  **Synthesize the two components of acceleration.** For an object in non-uniform circular motion (i.e., its rotational speed is changing), a point on the object experiences *both* tangential and centripetal acceleration. These two vectors, $\vec{a}_t$ and $\vec{a}_c$, are always perpendicular. The total linear acceleration is their vector sum: $\vec{a} = \vec{a}_t + \vec{a}_c$. The magnitude is $|\vec{a}| = \sqrt{a_t^2 + a_c^2}$.
5.  **Solve problems.** Work through 3-5 problems involving a spinning disk, a centrifuge, or a car rounding a bend. For each problem, explicitly calculate $v$, $a_t$, and $a_c$ for a point of interest. Draw the acceleration vectors.

## Key ideas, with intuition
1.  **Radius is the scaling factor.** Imagine two horses on a merry-go-round, one near the center and one at the edge. Both complete a full circle in the same amount of time, so their *angular velocity* $\omega$ is identical. But the horse on the edge traces a much larger circle, so it must have a greater *linear speed* $v$ to cover that distance. The radius $r$ is the lever that converts the shared angular motion into distinct linear motion.
2.  **Acceleration has two jobs: changing speed and changing direction.**
    *   **Tangential acceleration ($a_t = r\alpha$)** is responsible for changing the object's speed. It only exists if the angular velocity is changing ($\alpha \neq 0$). It points along the direction of motion (tangent to the circle).
    *   **Centripetal acceleration ($a_c = r\omega^2$)** is responsible for changing the object's direction. It always exists as long as the object is rotating ($\omega \neq 0$). It always points towards the center of the circle. These two jobs are orthogonal and independent.

3.  **Radians are a "natural" unit.** The formulas work because the radian is defined by geometry ($s/r$). If you use degrees, you are introducing an arbitrary human convention (360 degrees in a circle), and the clean relationship $s=r\theta$ breaks down, requiring a conversion factor ($\pi/180$) that propagates through all the derived formulas. Physics works in radians.

## Worked example
A wind turbine blade is 50 m long. It starts from rest and accelerates with a constant angular acceleration of $\alpha = 0.2 \text{ rad/s}^2$. What is the linear speed, tangential acceleration, and centripetal acceleration of the blade tip after 10 seconds?

**1. Identify knowns and unknowns.**
*   Radius: $r = 50 \text{ m}$
*   Initial angular velocity: $\omega_0 = 0 \text{ rad/s}$ (starts from rest)
*   Angular acceleration: $\alpha = 0.2 \text{ rad/s}^2$
*   Time: $t = 10 \text{ s}$
*   Unknowns: $v$, $a_t$, $a_c$ at $t=10 \text{ s}$.

**2. Find the angular velocity at $t=10 \text{ s}$.**
Use the rotational kinematic equation $\omega_f = \omega_0 + \alpha t$.
$$ \omega_{10} = 0 + (0.2 \text{ rad/s}^2)(10 \text{ s}) = 2.0 \text{ rad/s} $$
*This step is necessary because both $v$ and $a_c$ depend on $\omega$. We need the instantaneous angular velocity at the specified time.*

**3. Calculate the tangential acceleration, $a_t$.**
This depends on $\alpha$, which is constant.
$$ a_t = r\alpha = (50 \text{ m})(0.2 \text{ rad/s}^2) = 10 \text{ m/s}^2 $$
*This step is straightforward. The tangential acceleration is constant because the angular acceleration is constant.*

**4. Calculate the linear speed, $v$.**
This depends on the instantaneous angular velocity $\omega_{10}$.
$$ v = r\omega_{10} = (50 \text{ m})(2.0 \text{ rad/s}) = 100 \text{ m/s} $$
*This step connects the angular speed we found in step 2 to the linear speed at the tip.*

**5. Calculate the centripetal acceleration, $a_c$.**
This also depends on the instantaneous angular velocity $\omega_{10}$.
$$ a_c = r\omega_{10}^2 = (50 \text{ m})(2.0 \text{ rad/s})^2 = (50 \text{ m})(4.0 \text{ rad}^2/\text{s}^2) = 200 \text{ m/s}^2 $$
*This step calculates the acceleration required to keep the blade tip moving in a circle at its current speed. Note how much larger it is than the tangential component.*

**Final Answer:** After 10 seconds, the blade tip has a tangential acceleration of $10 \text{ m/s}^2$, a centripetal acceleration of $200 \text{ m/s}^2$, and a linear speed of $100 \text{ m/s}$.

## Diagrams

A point P on a rotating disk.
```text
           ^ y
           |
           |      P
           |    / ^
           |   /  | a_t
           |  /   |
           | /  <--- v
           |<--a_c--
       +---|------------> x
           | (origin)
           |
           |
```
*Description: A point P is shown on a circular path centered at the origin. The velocity vector `v` is tangent to the circle, pointing counter-clockwise. The centripetal acceleration vector `a_c` points from P directly towards the origin. The tangential acceleration vector `a_t` is also tangent to the circle, pointing in the same direction as `v` (assuming the disk is speeding up).*

## Memory technique — remember this forever
1.  **Visual Hook:** Picture a slingshot. The length of the rope is $r$. How fast you spin it is $\omega$. The speed of the stone at the end is $v$. To make the stone go faster ($v$), you can either use a longer rope (increase $r$) or spin it faster (increase $\omega$). So, $v=r\omega$. The other two relations follow by taking the time derivative ($a_t = r\alpha$) or by substituting into the known formula for centripetal acceleration ($a_c = v^2/r$).

2.  **Formulas to Overlearn:**
    $$ v = r\omega $$
    $$ a_t = r\alpha $$
    $$ a_c = r\omega^2 = \frac{v^2}{r} $$

3.  **Spaced Repetition Schedule:** Review these derivations and formulas at **1 day, 3 days, 7 days, 16 days, and 35 days**. Do not just read them. Re-derive them from scratch on a blank sheet of paper each time.

4.  **First Principles Pathway:** If you forget everything, start with the definition of an angle in radians.
    $$ \theta = \frac{s}{r} \implies s = r\theta $$
    Differentiate once with respect to time to get velocity:
    $$ \frac{ds}{dt} = r \frac{d\theta}{dt} \implies v = r\omega $$
    Differentiate again to get tangential acceleration:
    $$ \frac{dv}{dt} = r \frac{d\omega}{dt} \implies a_t = r\alpha $$
    For centripetal acceleration, you must recall its definition from linear kinematics, $a_c = v^2/r$, and then substitute $v=r\omega$.

## Common mistakes
1.  **Units Mismatch (Radians vs. Degrees):** Using angular velocities or accelerations in degrees or revolutions per minute (RPM) directly in these formulas. You MUST convert to radians per second (rad/s) and radians per second squared (rad/s²) first.
2.  **Confusing $a_t$ and $a_c$:** Forgetting that $a_t$ only exists if the rotation is speeding up or slowing down ($\alpha \neq 0$), while $a_c$ always exists as long as there is rotation ($\omega \neq 0$). They are perpendicular vectors representing different physical effects.
3.  **Using a single 'a' for acceleration:** Students often calculate one component of acceleration and forget the other. The total linear acceleration $\vec{a}$ is the vector sum $\vec{a}_t + \vec{a}_c$.

## Self-check
1.  A car's tire has a radius of 0.3 m. If the car is moving at a constant 30 m/s, what is the angular velocity of the tire? What is the centripetal acceleration of a point on the tire's edge? What is its tangential acceleration?
2.  A centrifuge with a radius of 15 cm accelerates uniformly from rest to 10,000 RPM in 30 seconds. What is the magnitude of the total linear acceleration of a sample at the outer edge at the instant the centrifuge reaches its final speed?
3.  Consider two points on a spinning record player that is slowing down. Point A is at radius $r_A$ and Point B is at radius $r_B = 2r_A$. Compare the two points' (a) angular velocity $\omega$, (b) angular acceleration $\alpha$, (c) linear speed $v$, (d) tangential acceleration $a_t$, and (e) centripetal acceleration $a_c$. For each quantity, state if it's the same for both points or larger for one, and by what factor.