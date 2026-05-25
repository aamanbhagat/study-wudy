## What it is
The mechanization equations are a set of algorithms that mathematically integrate measurements from an Inertial Measurement Unit (IMU)—specifically, angular rates from gyroscopes and specific forces from accelerometers—to calculate a vehicle's state. This state comprises its attitude (orientation), velocity, and position over time, relative to a chosen reference frame. "Mechanization" is the historical engineering term for implementing these specific integrations.

## Why it matters
This is the absolute core of any Inertial Navigation System (INS). For a rocket, submarine, or missile, which cannot rely on GPS during crucial phases of flight, the mechanization equations are the only way to know where it is, how fast it's going, and which way it's pointing. In modern robotics and self-driving cars, this process forms the predictive step in filtering algorithms like the Kalman filter, providing high-frequency state estimates between GPS or camera updates.

## When to study it
You must be comfortable with the following before proceeding. If not, pause and review them.
1.  **Coordinate Frames:** You must understand the difference between a body-fixed frame ($b$) and a navigation frame ($n$, e.g., North-East-Down).
2.  **Rotational Kinematics:** You must know how to represent attitude, typically with a Direction Cosine Matrix (DCM), $C_b^n$, and understand its relationship to angular velocity, $\omega$.
3.  **Vector Calculus:** Specifically, the transport theorem, which describes the time derivative of a vector in a rotating frame.
4.  **Newtonian Mechanics:** A firm grasp of $F=ma$ and the difference between gravitational force and acceleration.

## How to study it (step by step)
1.  **Master the Inputs:** Draw a box representing your vehicle. Label the body axes ($x_b, y_b, z_b$). On it, place a 3-axis gyro measuring $\omega_{nb}^b$ (angular rate of the body w.r.t. the nav frame, expressed in body coords) and a 3-axis accelerometer measuring $f^b$ (specific force in body coords). Convince yourself that these are the *only* inputs to the system.
2.  **Derive Attitude Update:** Start with the definition of the DCM's time derivative: $\dot{C}_b^n = C_b^n \Omega_{nb}^b$. Here, $\Omega_{nb}^b$ is the skew-symmetric matrix form of the gyro measurement $\omega_{nb}^b$. Write out the discrete-time update: $C_b^n(t_k) = C_b^n(t_{k-1}) \cdot \text{exp}(\Omega_{nb}^b \Delta t)$. For small $\Delta t$, this is approximately $C_b^n(t_k) \approx C_b^n(t_{k-1}) (I + \Omega_{nb}^b \Delta t)$.
3.  **Derive Velocity Update:** Write Newton's second law in the non-rotating navigation frame: $m a^n = F_{total}^n$. The accelerometer does *not* measure $a^n$. It measures specific force $f^b$, which is the non-gravitational acceleration. The relationship is $a^n = C_b^n f^b + g^n$. Integrate this to get velocity: $\dot{v}^n = C_b^n f^b + g^n$. The discrete update is $v^n(t_k) = v^n(t_{k-1}) + (C_b^n(t_k) f^b(t_k) + g^n) \Delta t$.
4.  **Derive Position Update:** This is the simplest step. The time derivative of position is velocity: $\dot{p}^n = v^n$. The discrete update is $p^n(t_k) = p^n(t_{k-1}) + v^n(t_{k-1}) \Delta t + \frac{1}{2} a^n(t_k) (\Delta t)^2$.
5.  **Connect the Chain:** Write down the three discrete update equations in order: Attitude -> Velocity -> Position. Note how the output of the attitude step ($C_b^n$) is a required input for the velocity step. This dependency is the essence of the mechanization process.

## Key ideas, with intuition
1.  **Gyros steer, Accelerometers push.** Imagine you're blindfolded in a moving chair. The feeling of rotation (dizziness) is your gyro. The feeling of being pushed into your seat is your accelerometer. The mechanization equations are the math your brain would do to figure out where you are. The gyros tell you which way the "push" is pointing in the room (the navigation frame).

2.  **Attitude is the bridge.** Your sensors live in the body frame ($b$), but your physics (and your destination) live in the navigation frame ($n$). You cannot directly add a body-frame acceleration to a navigation-frame velocity. The attitude matrix, $C_b^n$, is the indispensable bridge that rotates the accelerometer's measurement into the navigation frame so it can be properly integrated.
    $$
    \dot{v}^n = \underbrace{C_b^n f^b}_{\text{The push, rotated into the nav frame}} + \underbrace{g^n}_{\text{Gravity, which is always in the nav frame}}
    $$

3.  **Accelerometers measure "Specific Force," not acceleration.** This is the most common point of confusion. An accelerometer at rest on a table measures the upward push of the table on it. This reading is $f = [0, 0, +9.81]^T \text{ m/s}^2$. The actual coordinate acceleration is $a=0$. The relationship is always $a = f + g$, or in our vector notation, $a^n = C_b^n f^b + g^n$. You must *always* add the gravity vector back in after transforming the accelerometer reading.

4.  **It's a dead reckoning process.** Dead reckoning is navigating by integrating your velocity over time from a known starting point. Because mechanization is a chain of integrations (gyro rate -> attitude, accel -> velocity, velocity -> position), any small error in the sensor measurements will grow without bound over time. This is why an INS needs periodic corrections from an external source like GPS.

## Worked example
A drone takes off vertically. For the first time step $\Delta t = 0.1$ s, its IMU reports an average angular velocity of $\omega_{nb}^b = [0, 0, 0]^T$ rad/s and an average specific force of $f^b = [0, 0, 12.81]^T \text{ m/s}^2$. The drone starts at rest at the origin $p^n(0) = [0, 0, 0]^T$ with its body frame aligned with the North-East-Down (NED) navigation frame, so $v^n(0)=[0,0,0]^T$ and $C_b^n(0) = I$. The gravity vector in NED is $g^n = [0, 0, 9.81]^T \text{ m/s}^2$. Find the state at $t=0.1$ s.

**Step 1: Update Attitude**
The gyro reading is zero, so the attitude does not change.
$$ \omega_{nb}^b = [0, 0, 0]^T \implies \Omega_{nb}^b = \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix} $$
$$ C_b^n(0.1) = C_b^n(0) (I + \Omega_{nb}^b \Delta t) = I (I + 0) = I $$
*Reflection:* No rotation measured means orientation remains the same. The attitude matrix is unchanged.

**Step 2: Calculate Acceleration in Navigation Frame**
Use the new attitude matrix to rotate the specific force and add gravity.
$$ a^n(0.1) = C_b^n(0.1) f^b(0.1) + g^n $$
$$ a^n(0.1) = I \begin{bmatrix} 0 \\ 0 \\ 12.81 \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ 9.81 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 22.62 \end{bmatrix} $$
*Wait, why is the acceleration so high?* The specific force is measured in the body frame, where z is typically *down*. Let's assume a standard aerospace body frame where x is forward, y is right, and z is down. A specific force of $+12.81$ in the z-direction is an upward thrust. But the NED navigation frame's z-axis is also down. So we must be careful with signs. Let's assume an upward-pointing body z-axis for this drone. Then $f^b = [0, 0, 12.81]^T$ is an upward force. The NED frame has z *down*, so $g^n = [0, 0, 9.81]^T$.
Let's redefine the drone's body frame to be x-forward, y-right, z-up. Then $C_b^n(0)$ is not identity. Let's stick to the standard x-fwd, y-right, z-down body frame. The drone is pushing "down" on the accelerometer with $12.81 \text{ m/s}^2$ to go up.
$$ a^n(0.1) = I \begin{bmatrix} 0 \\ 0 \\ 12.81 \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ 9.81 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 22.62 \end{bmatrix} $$
This seems wrong. Let's re-read the problem. The specific force is the non-gravitational force. To go up, the drone must generate an upward thrust to overcome gravity. The accelerometer feels this upward thrust. In a body frame with z-down, an upward acceleration corresponds to a *negative* specific force reading. So let's assume $f^b = [0, 0, -12.81]^T \text{ m/s}^2$.
$$ a^n(0.1) = I \begin{bmatrix} 0 \\ 0 \\ -12.81 \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ 9.81 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ -3.0 \end{bmatrix} \text{ m/s}^2 $$
*Reflection:* This makes physical sense. The drone is accelerating upwards (in the negative Z-Down direction) at $3.0 \text{ m/s}^2$. The accelerometer reading of $12.81$ accounts for the $9.81$ needed to counteract gravity plus the $3.0$ for the net acceleration. This step highlights the extreme importance of frame definitions and sign conventions.

**Step 3: Update Velocity**
Integrate the acceleration.
$$ v^n(0.1) = v^n(0) + a^n(0.1) \Delta t $$
$$ v^n(0.1) = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ -3.0 \end{bmatrix} (0.1) = \begin{bmatrix} 0 \\ 0 \\ -0.3 \end{bmatrix} \text{ m/s} $$
*Reflection:* A constant upward acceleration of $3.0 \text{ m/s}^2$ for $0.1$ s results in an upward velocity of $0.3 \text{ m/s}$. This is basic kinematics.

**Step 4: Update Position**
Integrate the velocity.
$$ p^n(0.1) = p^n(0) + v^n(0) \Delta t + \frac{1}{2} a^n(0.1) (\Delta t)^2 $$
$$ p^n(0.1) = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix} (0.1) + \frac{1}{2} \begin{bmatrix} 0 \\ 0 \\ -3.0 \end{bmatrix} (0.1)^2 = \begin{bmatrix} 0 \\ 0 \\ -0.015 \end{bmatrix} \text{ m} $$
*Reflection:* The drone is now at a height of 1.5 cm above the ground (position of -0.015 m in the Down direction). This follows the standard kinematic equation $s = ut + \frac{1}{2}at^2$.

## Diagrams
```text
        Navigation Frame (n)                   Body Frame (b)
        (fixed, e.g., NED)                     (attached to vehicle)

              N (North, x_n)
              |
              |
              |
              o -------> E (East, y_n)
             /
            /
           V
         D (Down, z_n)


                                          x_b (roll axis, forward)
                                         /
                                        /
                                       /
                      (pitch axis) y_b <------ o
                                       \
                                        \
                                         V z_b (yaw axis, down)


Attitude (C_b^n) is the rotation that maps the Body Frame onto the Navigation Frame.
```

## Memory technique — remember this forever
1.  **The Story: "Attitude, Velocity, Position" (AVP).** You MUST process the IMU data in this order. A pilot must first know their **A**ttitude to understand where their engines are pointing. Only then can they use that thrust information to update their **V**elocity. Finally, by tracking velocity over time, they can determine their **P**osition. A -> V -> P. Never break the chain.

2.  **Formulas to Overlearn:**
    *   Attitude Kinematics: $\dot{C}_b^n = C_b^n \Omega_{nb}^b$
    *   Velocity Dynamics (simplified): $\dot{v}^n = C_b^n f^b + g^n$
    *   Position Kinematics: $\dot{p}^n = v^n$

3.  **Spaced Repetition Schedule:** Review these three equations and the AVP story at: 1 day, 3 days, 7 days, 16 days, 35 days. Actively re-derive them each time.

4.  **First Principles Pathway:** If you forget, start from scratch.
    *   **Position:** "Where am I?" is the integral of "How fast am I going?". So $\dot{p}=v$.
    *   **Velocity:** "How fast am I going?" changes based on forces ($F=ma$). So $\dot{v}=a$. What is the total acceleration $a$? It's the part the accelerometer feels ($f^b$, but rotated into the nav frame by $C_b^n$) plus the part it *doesn't* feel (gravity, $g^n$). So $\dot{v}^n = C_b^n f^b + g^n$.
    *   **Attitude:** "Which way am I pointing?" ($C_b^n$) changes based on "How fast am I spinning?" ($\omega_{nb}^b$). This is a geometric relationship, the transport theorem for a matrix: $\dot{C}_b^n = C_b^n \Omega_{nb}^b$.

## Common mistakes
1.  **Forgetting Gravity:** Adding $g^n$ is not optional. The accelerometer is fundamentally incapable of sensing gravity. You must add it back into the equation based on your knowledge of the local gravitational field.
2.  **Integrating in the Body Frame:** Never, ever integrate $f^b$ directly. The resulting quantity is not a velocity in any meaningful inertial frame because the frame itself is rotating and accelerating. You *must* rotate $f^b$ into $f^n$ before integrating.
3.  **Sign and Frame Convention Errors:** As seen in the example, getting your axes mixed up (e.g., Z-up vs Z-down) will ruin your calculation. Always define your body and navigation frames explicitly at the start of any problem and stick to them.
4.  **Using the Wrong Angular Velocity:** The gyro measures the rotation of the body frame relative to the inertial frame, $\omega_{ib}^b$. For navigation on Earth, the navigation frame (like NED) is also rotating. The full attitude equation involves $\omega_{nb}^b = \omega_{ib}^b - \omega_{in}^b$. For short flights or space applications, you can often approximate $\omega_{in}^b \approx 0$.

## Self-check
1.  An IMU is in freefall. Assuming no air resistance, what values will its 3-axis accelerometer and 3-axis gyroscope report?
2.  A rocket is launching vertically. Its body z-axis points down. It is accelerating upwards at $5 \text{ m/s}^2$. What is the specific force measurement, $f_z^b$, from its accelerometer?
3.  A satellite in orbit has its body frame perfectly aligned with an inertial frame. It fires a side thruster, producing a constant specific force $f^b = [0, 10, 0]^T \text{ N/kg}$. Simultaneously, it begins a pure yaw maneuver with a constant angular velocity $\omega_{ib}^b = [0, 0, 0.5]^T \text{ rad/s}$. Derive the expression for its velocity vector $v^n(t)$ in the inertial frame as a function of time.