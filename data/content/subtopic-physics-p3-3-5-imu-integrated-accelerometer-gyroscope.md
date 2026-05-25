## What it is
An Inertial Measurement Unit (IMU) is a self-contained electronic device that measures and reports a body's specific force, angular rate, and sometimes magnetic field using a combination of accelerometers and gyroscopes. It provides the raw data needed to determine a vehicle's motion—its linear acceleration and rotational velocity—relative to an inertial reference frame, without any external references. This process of calculating position and orientation from IMU data alone is called dead reckoning.

## Why it matters
The IMU is the heart of any modern Guidance, Navigation, and Control (GNC) system, from ballistic missiles and spacecraft to commercial drones and your smartphone. When external navigation aids like GPS are denied, jammed, or unavailable (e.g., underwater or during atmospheric re-entry), the IMU is the *only* source of information about the vehicle's state. Understanding its principles and, more importantly, its error characteristics is fundamental to designing robust navigation filters like the Kalman filter, which fuses IMU data with other sensor inputs.

## When to study it
You are ready for this topic if you have a firm grasp of the following:
*   **Newtonian Mechanics:** Specifically, Newton's second law ($\vec{F}=m\vec{a}$), the concept of inertial vs. non-inertial reference frames, and the nature of gravity as a body force.
*   **Rotational Dynamics:** You must understand angular velocity ($\vec{\omega}$), angular acceleration ($\vec{\alpha}$), and torque ($\vec{\tau}$).
*   **Vector Calculus:** Comfort with derivatives and integrals of vector quantities is essential. You should understand how to represent orientation, for instance with rotation matrices or quaternions, and how they relate to angular velocity.

If you are shaky on reference frames or rotational kinematics, review those first. Proceeding without them will lead to fundamental confusion.

## How to study it (step by step)
1.  **Principle of the Accelerometer:** Model a simple 1D accelerometer as a proof mass on a spring and damper. Use Newton's second law to derive the relationship between the displacement of the mass and the *specific force* acting on the IMU case. Note that specific force is $\vec{f} = \vec{a}_{total} - \vec{g}$.
2.  **Principle of the Gyroscope:** Research the operating principle of a modern MEMS (Micro-Electro-Mechanical Systems) gyroscope. Focus on the Coriolis effect on a vibrating structure. Understand that its output is a voltage proportional to the *rate of rotation*, not the angle itself.
3.  **From Body Frame to Inertial Frame:** Take the raw 3-axis accelerometer output, $\vec{f}_b$, and the raw 3-axis gyro output, $\vec{\omega}_b$. Realize these are in the vehicle's own coordinate system (the "body frame"). To use them for navigation, you must first use the vehicle's current attitude (orientation) to rotate the specific force vector into the fixed inertial frame (the "navigation frame").
4.  **Derive the Dead Reckoning Equations:** Write down the core integration steps. First, integrate the angular rate from the gyros to update attitude. Second, use the updated attitude to transform the specific force into the navigation frame. Third, subtract gravity to get true acceleration. Fourth, integrate acceleration once to get velocity, and a second time to get position.
5.  **Model the Errors:** The real challenge of IMUs is error. Research and write down the standard error model for an accelerometer and gyro, including: bias, scale factor error, and white noise. See how a constant bias in the gyro reading ($\omega_{measured} = \omega_{true} + b_{gyro}$) leads to an orientation error that grows linearly with time, and a position error that grows cubically with time. This is why IMUs alone are insufficient for long-duration navigation.

## Key ideas, with intuition
1.  **Accelerometers measure specific force, not acceleration.** This is the most critical concept. An accelerometer at rest on a table measures an upward force of $1g$ ($+9.8 \, \text{m/s}^2$). Why? The table is exerting a normal force on the proof mass inside the accelerometer to counteract gravity. In freefall, it reads zero. The quantity it measures is the non-gravitational force per unit mass.
    $$ \vec{f}_{\text{specific}} = \frac{\vec{F}_{\text{non-grav}}}{m} = \vec{a}_{\text{inertial}} - \vec{g} $$
    To get the true inertial acceleration for navigation, you must have a model of the local gravity vector $\vec{g}$ and add it back: $\vec{a}_{\text{inertial}} = \vec{f}_{\text{specific}} + \vec{g}$.

2.  **Gyroscopes measure angular rate, not angle.** A gyro tells you how *fast* you are turning, not where you are pointing. To find your orientation (attitude), you must integrate the angular rate measurements over time.
    $$ \theta(t) = \theta_0 + \int_0^t \omega(\tau) d\tau $$
    This integration is a primary source of orientation drift, as small, constant errors in measuring $\omega$ accumulate into a large, growing error in $\theta$.

3.  **All measurements are in the Body Frame.** The IMU is bolted to the vehicle. Its x-axis points out the nose, its y-axis out the right wing, and its z-axis down. These are the "body frame" axes. To navigate, we need our position in a fixed frame, like one with its Z-axis pointing to the North Pole (the "inertial frame" or "navigation frame"). You cannot simply integrate the body-frame acceleration. You must first use your current attitude to rotate the measured acceleration vector into the fixed navigation frame.
    $$ \vec{a}_n = R_b^n \vec{a}_b $$
    Here, $\vec{a}_b$ is the acceleration measured in the body frame, $R_b^n$ is the rotation matrix from the body frame to the navigation frame, and $\vec{a}_n$ is the acceleration in the navigation frame, which can now be integrated.

## Worked example
**Problem:** A sounding rocket launches vertically from rest. For the first 2 seconds, its z-axis (downward-facing) accelerometer measures a constant specific force of $f_z = -49.05 \, \text{m/s}^2$. The rocket's body z-axis points straight down towards the Earth. Assuming standard gravity $g = 9.81 \, \text{m/s}^2$ (acting downwards), what is the rocket's altitude at $t=2 \, \text{s}$?

**Solution:**

1.  **Establish Frames and Coordinates:**
    Let the navigation frame have its z-axis, $z_n$, pointing vertically upwards from the launchpad. The rocket's body frame has its z-axis, $z_b$, pointing downwards. Therefore, a vector in the body frame is related to the navigation frame by a sign change in the z-component. The gravity vector in the navigation frame is $\vec{g}_n = [0, 0, -9.81]^T \, \text{m/s}^2$.

2.  **Find True Inertial Acceleration:**
    The accelerometer measures specific force in the body frame: $\vec{f}_b = [0, 0, -49.05]^T \, \text{m/s}^2$.
    First, convert this to the navigation frame. Since $z_n = -z_b$, we have $\vec{f}_n = [0, 0, +49.05]^T \, \text{m/s}^2$.
    Now, use the key equation $\vec{a}_n = \vec{f}_n + \vec{g}_n$.
    $$ \vec{a}_n = \begin{bmatrix} 0 \\ 0 \\ 49.05 \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ -9.81 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 39.24 \end{bmatrix} \, \text{m/s}^2 $$
    The rocket's true upward acceleration is a constant $39.24 \, \text{m/s}^2$.

3.  **Integrate for Velocity:**
    The rocket starts from rest, so $v_0 = 0$.
    $$ v(t) = v_0 + \int_0^t a(\tau) d\tau = 0 + \int_0^2 39.24 d\tau = 39.24 \tau \Big|_0^2 = 78.48 \, \text{m/s} $$

4.  **Integrate for Position (Altitude):**
    The rocket starts at altitude $z_0 = 0$.
    $$ z(t) = z_0 + \int_0^t v(\tau) d\tau = 0 + \int_0^2 (39.24\tau) d\tau = \frac{39.24}{2} \tau^2 \Big|_0^2 = 19.62 \cdot (2^2 - 0^2) = 78.48 \, \text{m} $$

**Reflection:** Each step was crucial. Step 1 defined our coordinate systems, which is non-negotiable. Step 2 applied the fundamental insight that accelerometers measure specific force, requiring us to add gravity back to get true acceleration. Steps 3 and 4 were direct applications of kinematics, integrating the result from Step 2 to find the final state. Skipping the frame transformation or the gravity correction would have given a completely wrong answer.

## Diagrams
A standard 6-DOF (Degrees of Freedom) IMU configuration.

```text
        ^ +Y (Body)
        |
        |
        +------> +X (Body, e.g., nose of aircraft)
       /
      /
     v +Z (Body, e.g., right wing)

IMU Block:
  - Accelerometer X (measures specific force along X-axis)
  - Accelerometer Y (measures specific force along Y-axis)
  - Accelerometer Z (measures specific force along Z-axis)

  - Gyroscope X (measures angular rate about X-axis, i.e., roll rate)
  - Gyroscope Y (measures angular rate about Y-axis, i.e., pitch rate)
  - Gyroscope Z (measures angular rate about Z-axis, i.e., yaw rate)
```

Relationship between Body Frame and Navigation (Inertial) Frame.

```text
      ^ z_n (Up)
      |
      |
      |_________> y_n (East)
     /
    /
   v x_n (North)
  [Navigation Frame]

      z_b (Down) ^
                 |  /
                 | /
     <-----------+-----> x_b (Nose)
          y_b (Right Wing)
    [Body Frame, pitched up and rolled right relative to Nav Frame]

To navigate, measurements in the Body Frame (x_b, y_b, z_b) must be
mathematically rotated into the Navigation Frame (x_n, y_n, z_n)
using the current attitude (roll, pitch, yaw angles).
```

## Memory technique — remember this forever
1.  **The Mnemonic Story:** Think of an IMU as a blindfolded person in a box, trying to figure out where they are.
    *   The **accelerometers** are like feeling the floor push up on their feet. They can't feel the constant pull of gravity, only forces that *change* their motion relative to freefall (the floor, a rocket engine). This is **specific force**.
    *   The **gyroscopes** are their sense of balance (inner ear). They can feel when they are *turning*, but if they turn slowly, they quickly lose track of which way they are facing. This is **integrating angular rate**.
    *   Their final calculated position is a "drunken walk"—every small error in sensing motion or rotation sends them further off course. This is **error propagation/drift**.

2.  **Must-Overlearn Formulas:**
    *   Specific Force Definition: $\vec{f} = \vec{a} - \vec{g}$ (The accelerometer reading is true acceleration MINUS local gravity vector).
    *   Navigation Frame Acceleration: $\vec{a}_n = R_b^n \vec{f}_b + \vec{g}_n$ (To get usable acceleration, you must ROTATE the body-frame specific force and ADD BACK the gravity vector).

3.  **Spaced Repetition Schedule:** Review these concepts and re-derive the worked example at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read it; force yourself to reproduce it from a blank sheet.

4.  **First Principles Pathway:** If you forget everything, rebuild from here:
    *   **Accelerometer:** It's just a mass on a spring. The spring's compression is proportional to force. What forces act on it? The casing pushing it (non-gravitational force) and gravity. $\sum \vec{F} = m\vec{a}_{inertial}$. The sensor measures the spring force, which is $\vec{F}_{spring} = m\vec{a}_{inertial} - m\vec{g}$. The output is force-per-mass, so $\vec{f} = \vec{a}_{inertial} - \vec{g}$.
    *   **Gyroscope:** Its output is $\vec{\omega} = d\vec{\theta}/dt$. To get orientation $\vec{\theta}$, you must integrate.
    *   **Navigation:** Position is the double integral of acceleration. Velocity is the first integral. This is just kinematics.

## Common mistakes
1.  **Forgetting Gravity.** Students often take the accelerometer output as the true acceleration. This is only correct in deep space or perfect freefall. On Earth, you must add the gravity vector back to the specific force measurement.
2.  **Integrating in the Wrong Frame.** Integrating body-frame acceleration `[ax, ay, az]` directly. This is meaningless if the vehicle is rotating. The direction of `ax` is constantly changing in the world. You *must* rotate the acceleration vector into a fixed navigation frame before integrating.
3.  **Confusing Rate with Angle.** Taking the gyro output (e.g., 10 deg/s) and using it directly as an angle. You must integrate the rate over a time step to get the change in angle: $\Delta \theta = \omega \cdot \Delta t$.
4.  **Ignoring Sensor Errors.** In academic problems, you might assume perfect sensors. In any real application, the first step is to characterize and compensate for sensor bias. A small, constant bias on a gyro will quickly destroy your attitude estimate.

## Self-check
1.  An IMU is sealed in a box and dropped from a tall building (ignore air resistance). What are the ideal outputs of its three accelerometers and three gyroscopes during the fall?
2.  A satellite is spinning at a constant $5$ RPM about its body z-axis. What is the ideal output of its z-axis gyroscope in radians per second? To calculate the satellite's position by integrating its accelerometer data, what is the minimum frequency at which you must perform the body-to-inertial frame rotation?
3.  You are given a log file from a car's IMU as it drives a perfect circle at constant speed. The car is not skidding. Describe the expected output of the x-accelerometer (forward-facing), y-accelerometer (right-facing), and z-gyroscope (up-facing). Which sensor readings would be zero, and which would be non-zero and constant?