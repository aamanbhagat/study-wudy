## What it is
Angular displacement ($\theta$), angular velocity ($\omega$), and angular acceleration ($\alpha$) are the rotational analogues of linear displacement ($x$), velocity ($v$), and acceleration ($a$). They describe how the orientation of a rigid body changes over time, how fast it is rotating, and how quickly that rotation rate is changing, respectively. These quantities are typically measured with respect to a fixed axis of rotation.

## Why it matters
These concepts are the bedrock of describing any rotating system. In rocket science, they are essential for attitude control—using gyroscopes and thrusters to orient a spacecraft. In computer science, they appear in computer graphics for rotating objects in 3D space and in the physics engines of games. In physics, understanding these is non-negotiable for studying planetary orbits, quantum mechanical spin, and the dynamics of rigid bodies.

## When to study it
You must have a solid grasp of single-variable calculus and linear kinematics. Specifically, ensure you understand:
1.  **Linear Kinematics:** The definitions of displacement ($x$), velocity ($v = dx/dt$), and acceleration ($a = dv/dt$).
2.  **Calculus:** The concepts of the derivative as a rate of change and the integral as an accumulation.
3.  **Trigonometry:** The definition of a radian as a unit of angle. All of rotational mechanics is built on radians.

If you are not comfortable with these, pause and review them. Using degrees here will lead to consistent errors.

## How to study it (step by step)
1.  **Master Radians:** Take a coin. Define its radius as $r$. Roll it along a ruler without slipping. Notice that when it has traveled a distance of $r$, the angle it has rotated through is one radian. Convince yourself that the arc length $s$ subtended by an angle $\theta$ is $s = r\theta$ *only* when $\theta$ is in radians.
2.  **Define the Analogs:** Write the linear definitions $v = dx/dt$ and $a = dv/dt$ on a piece of paper. Directly below them, write the angular definitions: $\omega = d\theta/dt$ and $\alpha = d\omega/dt$. Stare at them. The mathematical structure is identical.
3.  **Derive the Bridge Equations:** Start with the arc length formula $s=r\theta$. Differentiate both sides with respect to time, assuming a constant radius $r$. Use the chain rule implicitly: $ds/dt = r(d\theta/dt)$. Recognize that $ds/dt$ is the tangential velocity $v_t$ and $d\theta/dt$ is the angular velocity $\omega$. This gives you the first bridge equation: $v_t = r\omega$.
4.  **Derive the Second Bridge:** Differentiate $v_t = r\omega$ with respect to time. This yields $dv_t/dt = r(d\omega/dt)$. Recognize the terms as tangential acceleration $a_t$ and angular acceleration $\alpha$. This gives the second bridge: $a_t = r\alpha$.
5.  **Derive the Rotational Kinematic Equations:** Assume constant angular acceleration, $\alpha = \text{const}$. Integrate $\alpha = d\omega/dt$ with respect to time to get $\omega(t) = \omega_0 + \alpha t$. Then, integrate $\omega = d\theta/dt$ (substituting the previous result) to get $\theta(t) = \theta_0 + \omega_0 t + \frac{1}{2}\alpha t^2$. These derivations mirror the linear case exactly.
6.  **Solve Problems:** Work through five problems involving constant angular acceleration. For example: "A flywheel accelerates from rest at $2 \text{ rad/s}^2$. How many revolutions has it completed after 10 seconds?"

## Key ideas, with intuition
1.  **The Great Analogy:** All of introductory rotational kinematics is a direct translation of linear kinematics. If you understand one, you understand the other. The physics doesn't change, only the letters used to describe it.
    $$
    \begin{array}{c|c}
    \textbf{Linear Motion} & \textbf{Rotational Motion} \\
    \hline
    x \text{ (displacement)} & \theta \text{ (angular displacement)} \\
    v = dx/dt \text{ (velocity)} & \omega = d\theta/dt \text{ (angular velocity)} \\
    a = dv/dt \text{ (acceleration)} & \alpha = d\omega/dt \text{ (angular acceleration)} \\
    v_f = v_i + at & \omega_f = \omega_i + \alpha t \\
    x_f = x_i + v_i t + \frac{1}{2}at^2 & \theta_f = \theta_i + \omega_i t + \frac{1}{2}\alpha t^2 \\
    v_f^2 = v_i^2 + 2a\Delta x & \omega_f^2 = \omega_i^2 + 2\alpha\Delta \theta
    \end{array}
    $$
2.  **Radians are a "Ghost Unit":** Radians are a ratio of lengths (arc length / radius), so they are technically dimensionless. This is why they can appear and disappear in equations. When you use $v_t = r\omega$, the left side is in m/s and the right is (m) * (rad/s). The radian "vanishes" to make the units match. This only works with radians, never degrees.
3.  **Vector Nature:** These quantities are vectors. For rotation in a plane, we use a sign convention: counter-clockwise (CCW) is positive, and clockwise (CW) is negative. The vector direction is technically along the axis of rotation, given by the right-hand rule (curl fingers in the direction of rotation, thumb points in the direction of the vector), but for 2D problems, the +/- convention is sufficient.

## Worked example
**Problem:** A satellite's reaction wheel is spun up from rest to a final angular velocity of $2000$ RPM (revolutions per minute) over a period of $30$ seconds. Assuming constant angular acceleration, (a) what is the angular acceleration? (b) Through how many radians does it turn?

**Solution:**

**Step 1: Identify knowns and convert units.**
The initial angular velocity is $\omega_i = 0$ rad/s (from rest).
The time interval is $\Delta t = 30$ s.
The final angular velocity $\omega_f$ needs to be converted from RPM to rad/s.
$$
\omega_f = 2000 \frac{\text{rev}}{\text{min}} \times \frac{2\pi \text{ rad}}{1 \text{ rev}} \times \frac{1 \text{ min}}{60 \text{ s}} = \frac{4000\pi}{60} \text{ rad/s} \approx 209.44 \text{ rad/s}
$$
*Reflection: The first step is always to get all quantities into base SI units (radians, seconds). Failing to convert RPM is a common source of error.*

**Step 2: Solve for angular acceleration ($\alpha$).**
We have $\omega_i$, $\omega_f$, and $\Delta t$. The kinematic equation relating these is $\omega_f = \omega_i + \alpha t$.
$$
\alpha = \frac{\omega_f - \omega_i}{\Delta t} = \frac{209.44 \text{ rad/s} - 0 \text{ rad/s}}{30 \text{ s}} \approx 6.98 \text{ rad/s}^2
$$
*Reflection: We chose the simplest kinematic equation that contained the unknown ($\alpha$) and three knowns. This is a standard problem-solving strategy.*

**Step 3: Solve for angular displacement ($\Delta\theta$).**
We can use the equation $\Delta\theta = \omega_i t + \frac{1}{2}\alpha t^2$.
$$
\Delta\theta = (0 \text{ rad/s})(30 \text{ s}) + \frac{1}{2}(6.98 \text{ rad/s}^2)(30 \text{ s})^2
$$
$$
\Delta\theta = \frac{1}{2}(6.98)(900) \text{ rad} = 3141 \text{ rad}
$$
Alternatively, we could use $\omega_f^2 = \omega_i^2 + 2\alpha\Delta\theta$.
$$
\Delta\theta = \frac{\omega_f^2 - \omega_i^2}{2\alpha} = \frac{(209.44)^2 - 0^2}{2(6.98)} \approx \frac{43865}{13.96} \approx 3142 \text{ rad}
$$
(The small difference is due to rounding $\omega_f$ and $\alpha$.)
*Reflection: Multiple kinematic equations can often solve for the same quantity. Using a different one is a good way to check your work.*

## Diagrams
A particle moving on a circular path, showing the relationship between $s$, $r$, and $\theta$.

```text
        ^ y
        |
        |
        |      P(x,y)
        |     /
        |    /
        |   /
        |  / ) θ
        | /
        +-----------> x
       O

Description:
- O is the origin (0,0) and the center of rotation.
- P is the particle at some point on a circular path.
- The line OP is the radius, r.
- The angle θ is the angular displacement, measured counter-clockwise from the positive x-axis.
- The arc length traveled from the x-axis to point P is s.
- The relationship is s = rθ.
- Positive ω and α would cause θ to increase (CCW rotation).
```

## Memory technique — remember this forever
1.  **The Mnemonic:** "The Greek Alphabet Swap." You already know linear kinematics. To get the rotational equations, just swap the Latin letters for their corresponding Greek characters.
    *   Displacement: $x \rightarrow \theta$ (theta)
    *   Velocity: $v \rightarrow \omega$ (omega)
    *   Acceleration: $a \rightarrow \alpha$ (alpha)
    The structure of the equations remains identical.

2.  **Must Overlearn:**
    *   Calculus definitions: $\omega = \frac{d\theta}{dt}$, $\alpha = \frac{d\omega}{dt}$
    *   The bridge equations (require radians): $v_t = r\omega$, $a_t = r\alpha$

3.  **Spaced Repetition Schedule:** Review these definitions and derivations at:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days
    Actively re-derive them from scratch each time.

4.  **First Principles Pathway:** If you forget a kinematic formula like $\Delta\theta = \omega_i t + \frac{1}{2}\alpha t^2$, rebuild it.
    *   Start with the definition of constant angular acceleration: $\alpha = \text{const}$.
    *   Integrate with respect to time: $\int \alpha \,dt = \int \frac{d\omega}{dt} \,dt \implies \omega(t) = \alpha t + C_1$. At $t=0$, $\omega=\omega_i$, so $C_1 = \omega_i$. This gives $\omega(t) = \omega_i + \alpha t$.
    *   Integrate again: $\int \omega(t) \,dt = \int \frac{d\theta}{dt} \,dt \implies \theta(t) = \int (\omega_i + \alpha t) \,dt = \omega_i t + \frac{1}{2}\alpha t^2 + C_2$. At $t=0$, $\theta=\theta_i$, so $C_2 = \theta_i$. This gives $\theta(t) = \theta_i + \omega_i t + \frac{1}{2}\alpha t^2$.

## Common mistakes
1.  **Degrees in Bridge Equations:** Calculating $v_t = r\omega$ when $\omega$ is in degrees/second or revolutions/minute. The bridge equations *only* work with radians. Always convert to rad/s first.
2.  **Mixing up Tangential and Centripetal Acceleration:** $a_t = r\alpha$ gives the acceleration component *along the path* of motion, which changes the object's speed. Do not forget the centripetal acceleration, $a_c = v_t^2/r = r\omega^2$, which points toward the center and changes the direction of the velocity vector. Total acceleration is the vector sum $\vec{a} = \vec{a_t} + \vec{a_c}$.
3.  **Ignoring Sign Conventions:** Forgetting that CCW rotation is positive and CW is negative. If an object is spinning CCW ($\omega > 0$) but slowing down, its angular acceleration $\alpha$ must be negative.

## Self-check
1.  A high-performance engine idles at 1000 RPM and can accelerate to 9000 RPM in 3.0 seconds. What is its average angular acceleration in rad/s$^2$?
2.  A spinning top with an initial angular velocity of $+15$ rad/s slows to a stop in 4.0 seconds due to friction. Assuming constant angular acceleration, how many revolutions did it make before stopping?
3.  The angular position of a robotic arm is given by $\theta(t) = 0.5t^3 - 2t^2 + 5$, where $t$ is in seconds and $\theta$ is in radians. At what time $t>0$ is the arm momentarily at rest (i.e., its angular velocity is zero)? What is its angular acceleration at that instant?