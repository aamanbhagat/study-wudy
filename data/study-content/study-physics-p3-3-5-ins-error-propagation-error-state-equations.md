## 1. What it is — in plain English

Imagine you're trying to draw a perfect straight line on a piece of paper, but your hand shakes just a tiny bit, or your pen nib is slightly bent. Each tiny wobble or imperfection, even if you try your best, will make your line slightly off. If you keep drawing for a long time, these tiny, accumulated errors will mean your "straight" line ends up far from where it should be.

An Inertial Navigation System (INS) is like that pen. It tries to figure out where something is, how fast it's going, and what direction it's pointing, purely by measuring its movements (accelerations and rotations). It starts from a known point and then "dead reckons" its way forward, integrating these measurements over time.

"INS error propagation" is simply the study of how those tiny, unavoidable imperfections in the INS's sensors (like a shaky hand or bent pen nib) grow and spread over time, causing the calculated position, velocity, and attitude to drift away from the true values. It's about understanding *how* and *why* these errors get bigger.

"Error state equations" are the mathematical "forecasts" for these errors. They are a set of equations that describe exactly how a small error in an accelerometer, or a tiny drift in a gyroscope, or even an initial small mistake in knowing where you started, will evolve and affect the overall navigation solution (position, velocity, attitude) into the future. They help engineers predict how inaccurate an INS will become and design ways to correct it.

## 2. Why it matters — real-world applications

Understanding INS error propagation and using error state equations is absolutely critical for any system relying on precise navigation without external aids, or when external aids are intermittent.

1.  **Rocket Launch & Spacecraft Navigation (e.g., SpaceX Starship, Apollo Missions):** During a rocket launch, especially through the atmosphere, GPS signals might be unavailable or unreliable due to plasma sheath effects or high-G maneuvers. The rocket relies heavily on its INS to guide it to orbit. Error state equations are used to predict how much the rocket's position and velocity will drift over the few minutes of ascent, allowing engineers to design the INS with sufficient accuracy and to plan for mid-course corrections. For deep-space probes, INS errors accumulate over months or years, and these equations help determine the required frequency of star tracker updates or ground-based ranging.

2.  **Autonomous Vehicles (e.g., Waymo, Tesla Autopilot):** Self-driving cars use a blend of sensors, including INS. While GPS provides global position, it can be blocked in tunnels, urban canyons, or under heavy foliage. A robust INS, whose error characteristics are well understood via error state equations, allows the vehicle to maintain accurate localization for short periods without GPS. This is crucial for safety, enabling the car to know its lane position and velocity precisely even when satellite signals are lost, until other sensors (like lidar or cameras) or GPS re-acquisition can correct the drift.

3.  **Submarine Navigation (e.g., US Navy Nuclear Submarines):** Submarines operate underwater for extended periods, often unable to surface or deploy antennas for GPS or other radio navigation. They rely almost exclusively on high-precision INS. Error state equations are vital for predicting the drift in position over days or weeks, informing the crew when they might need to perform a brief "GPS fix" (e.g., by raising an antenna to periscope depth) to reset the INS errors, while minimizing their vulnerability.

4.  **Precision Agriculture & Surveying Drones:** Drones used for mapping fields, inspecting infrastructure, or delivering packages need very precise positioning. While GPS is often available, multi-rotor drones experience vibrations and quick maneuvers that can affect INS performance. Error state equations help in designing sensor fusion algorithms (e.g., Kalman filters) that optimally combine noisy GPS data with INS measurements, ensuring high-accuracy flight paths and data collection even in challenging dynamic environments.

5.  **Tactical Missile Guidance:** Short-range to intercontinental ballistic missiles rely on INS for guidance from launch to target. For unguided munitions or missiles with limited external guidance updates, the INS must be extremely accurate. Error state equations are used during the design phase to analyze the impact of sensor noise, biases, and alignment errors on the missile's terminal accuracy, influencing sensor selection and system calibration strategies.

## 3. Prerequisites — what you must know first

To fully grasp INS error propagation and error state equations, you should be comfortable with the following concepts:

*   **Inertial Navigation Systems (INS) Basics:** Understanding how accelerometers measure specific force and gyroscopes measure angular velocity, and how these measurements are integrated to derive position, velocity, and attitude.
*   **Reference Frames:** Familiarity with different coordinate systems like the Earth-Centered, Earth-Fixed (ECEF) frame, the Earth-Centered Inertial (ECI) frame, the Navigation (NED or ENU) frame, and the Body frame, and the transformations between them.
*   **Kinematics:** The study of motion without considering forces. Specifically, the relationships between position, velocity, acceleration, and angular velocity in various reference frames.
*   **Linear Algebra:** Vector and matrix operations (addition, multiplication, transpose, inverse), solving systems of linear equations, and understanding state-space representation of dynamic systems ($\dot{\mathbf{x}} = A\mathbf{x} + B\mathbf{u}$).
*   **Differential Equations:** How to solve first-order linear ordinary differential equations, particularly in matrix form.
*   **Calculus:** Differentiation (especially chain rule, partial derivatives for linearization) and integration.
*   **Rotations & Attitude Representation:** How to represent the orientation of one frame relative to another, typically using Direction Cosine Matrices (DCMs) or Quaternions, and how to perform rotations.
*   **Small Angle Approximations:** The approximations $\sin(\delta\theta) \approx \delta\theta$, $\cos(\delta\theta) \approx 1$, and $\tan(\delta\theta) \approx \delta\theta$ for small angles $\delta\theta$, which are crucial for linearizing non-linear equations.
*   **Error Modeling:** Basic understanding of sensor errors like bias (a constant offset), scale factor (a multiplicative error), random walk (noise that integrates over time), and misalignment.

## 4. The core idea — step by step

The core idea behind INS error propagation and error state equations is to take the complex, non-linear equations that govern an INS and linearize them around a nominal (estimated) trajectory. This allows us to describe the *deviation* from that nominal trajectory (the error) using simpler linear differential equations.

### Step 1: The True State vs. the Estimated State

*   **Plain-English Statement:** In any navigation system, there's the "real" or "true" state of the vehicle (its actual position, velocity, and attitude) and the "estimated" or "computed" state that the INS calculates. The difference between these two is the error.
*   **Concrete Example:** Imagine you're told to walk 100 meters north. Your true final position is 100m north of your start. But if you misjudged your stride length, you might *estimate* you walked 100m, but only truly walked 98m. The error in position is 2m.
*   **Formal/Mathematical Version:** We define the true state vector as $\mathbf{x}_t$ and the estimated state vector as $\mathbf{x}_e$. The error state vector, $\delta\mathbf{x}$, is then defined as the difference between the estimated and true states:
    $$ \delta\mathbf{x} = \mathbf{x}_e - \mathbf{x}_t $$
    This applies to all components of the state:
    $$ \mathbf{r}_e = \mathbf{r}_t + \delta\mathbf{r} \quad (\text{position error}) $$
    $$ \mathbf{v}_e = \mathbf{v}_t + \delta\mathbf{v} \quad (\text{velocity error}) $$
    $$ C_{b,e}^n = C_{b,t}^n \cdot (I + [\delta\boldsymbol{\psi} \times]) \quad (\text{attitude error, where } [\delta\boldsymbol{\psi} \times] \text{ is the skew-symmetric matrix of the attitude error vector } \delta\boldsymbol{\psi}) $$
    Here, $C_{b,e}^n$ is the estimated rotation matrix from body to navigation frame, and $C_{b,t}^n$ is the true rotation matrix. The attitude error $\delta\boldsymbol{\psi}$ represents a small rotation that takes the true body frame to the estimated body frame.
*   **What Could Go Wrong:** A common mistake is defining the error in the opposite direction ($\mathbf{x}_t - \mathbf{x}_e$). While mathematically consistent if applied uniformly, it can lead to sign errors if mixed with standard conventions. Stick to $\mathbf{x}_e - \mathbf{x}_t$.

### Step 2: Modeling Sensor Errors

*   **Plain-English Statement:** The accelerometers and gyroscopes inside the INS are not perfect. They have small, inherent imperfections that cause their measurements to be slightly off from the true physical values. These imperfections are called sensor errors.
*   **Concrete Example:** A bathroom scale might always read 0.5 kg higher than your true weight (a bias error). Or, if it's poorly calibrated, it might read 10% higher for heavy objects (a scale factor error). Similarly, a gyroscope might report a tiny rotation even when it's perfectly still (a bias), or an accelerometer might not measure acceleration perfectly along its axis (misalignment).
*   **Formal/Mathematical Version:** We model the measured specific force ($\mathbf{f}_m$) and angular velocity ($\boldsymbol{\omega}_m$) as the sum of the true specific force ($\mathbf{f}_t$) and angular velocity ($\boldsymbol{\omega}_t$), plus their respective errors ($\delta\mathbf{f}$ and $\delta\boldsymbol{\omega}$):
    $$ \mathbf{f}_m = \mathbf{f}_t + \delta\mathbf{f} $$
    $$ \boldsymbol{\omega}_m = \boldsymbol{\omega}_t + \delta\boldsymbol{\omega} $$
    These sensor errors can be further broken down into components like biases ($\mathbf{b}_a, \mathbf{b}_g$), scale factor errors ($S_a, S_g$), and random noise ($\mathbf{n}_a, \mathbf{n}_g$). For example, a common model for accelerometer error is:
    $$ \delta\mathbf{f} = \mathbf{b}_a + S_a \mathbf{f}_t + \mathbf{n}_a $$
    where $\mathbf{b}_a$ is the accelerometer bias, $S_a$ is the accelerometer scale factor error matrix, and $\mathbf{n}_a$ is the accelerometer measurement noise. Similar models exist for gyroscopes.
*   **What Could Go Wrong:** Neglecting certain error sources (e.g., assuming no scale factor error when it exists) or incorrectly modeling their behavior (e.g., assuming a bias is constant when it drifts over time).

### Step 3: Linearizing the Navigation Equations

*   **Plain-English Statement:** The fundamental equations that govern how position, velocity, and attitude change based on acceleration and angular velocity are complex and non-linear. To make them manageable for error analysis, we "straighten them out" or approximate them as linear equations, but only for small deviations around our current best guess of the vehicle's state.
*   **Concrete Example:** Imagine a curved road. If you only look at a very small segment of that road, it looks almost perfectly straight. But if you look at a long stretch, the curve is obvious. Linearization is like looking at a very small segment of the vehicle's trajectory and treating the equations as straight lines for those small errors.
*   **Formal/Mathematical Version:** This is typically done using a first-order Taylor series expansion. If we have a non-linear function $\dot{\mathbf{x}} = f(\mathbf{x}, \mathbf{u})$, where $\mathbf{x}$ is the state and $\mathbf{u}$ is the input, we can linearize it around a nominal (estimated) trajectory $\mathbf{x}_e, \mathbf{u}_e$:
    $$ \dot{\mathbf{x}}_t = f(\mathbf{x}_t, \mathbf{u}_t) $$
    We know $\mathbf{x}_t = \mathbf{x}_e - \delta\mathbf{x}$ and $\mathbf{u}_t = \mathbf{u}_e - \delta\mathbf{u}$. Substituting these and performing a Taylor expansion around $\mathbf{x}_e, \mathbf{u}_e$:
    $$ \dot{\mathbf{x}}_e - \delta\dot{\mathbf{x}} \approx f(\mathbf{x}_e, \mathbf{u}_e) + \frac{\partial f}{\partial \mathbf{x}} \Big|_{\mathbf{x}_e, \mathbf{u}_e} (-\delta\mathbf{x}) + \frac{\partial f}{\partial \mathbf{u}} \Big|_{\mathbf{x}_e, \mathbf{u}_e} (-\delta\mathbf{u}) $$
    Since $\dot{\mathbf{x}}_e = f(\mathbf{x}_e, \mathbf{u}_e)$ (the estimated dynamics), we can subtract this from both sides and multiply by -1 to get:
    $$ \delta\dot{\mathbf{x}} \approx \frac{\partial f}{\partial \mathbf{x}} \Big|_{\mathbf{x}_e, \mathbf{u}_e} \delta\mathbf{x} + \frac{\partial f}{\partial \mathbf{u}} \Big|_{\mathbf{x}_e, \mathbf{u}_e} \delta\mathbf{u} $$
    This is of the form $\delta\dot{\mathbf{x}} = F\delta\mathbf{x} + G\delta\mathbf{u}$, where $F$ is the Jacobian matrix of $f$ with respect to $\mathbf{x}$, and $G$ is the Jacobian with respect to $\mathbf{u}$. The inputs $\delta\mathbf{u}$ in this context are our sensor errors $\delta\mathbf{f}$ and $\delta\boldsymbol{\omega}$.
*   **What Could Go Wrong:** Incorrectly calculating the partial derivatives for the Jacobian matrices, or using this linear approximation when the errors $\delta\mathbf{x}$ are no longer "small," which would invalidate the first-order approximation.

### Step 4: Deriving the General Error State Equations

*   **Plain-English Statement:** Now we combine the previous steps. We take the linearized navigation equations and substitute our definitions of position, velocity, and attitude errors, as well as the sensor errors. This process reveals how each type of error (e.g., accelerometer bias, initial velocity error, attitude error) influences the rate of change of other errors.
*   **Concrete Example:** If your accelerometer has a constant bias (error), that bias directly causes an error in the calculated acceleration. Integrating an acceleration error leads to a velocity error. Integrating a velocity error leads to a position error. So, a constant accelerometer bias causes a linearly growing velocity error and a quadratically growing position error. The error state equations capture this precise relationship.
*   **Formal/Mathematical Version:** The general form of the error state equation is a linear time-varying differential equation:
    $$ \delta\dot{\mathbf{x}}(t) = F(t)\delta\mathbf{x}(t) + G(t)\mathbf{w}(t) $$
    Where:
    *   $\delta\dot{\mathbf{x}}(t)$ is the derivative of the error state vector.
    *   $F(t)$ is the system dynamics matrix (also called the state transition matrix or Jacobian of the system dynamics with respect to the state). It describes how current errors propagate into future errors. Its elements depend on the current estimated trajectory.
    *   $\delta\mathbf{x}(t)$ is the error state vector (e.g., position, velocity, attitude errors, and often sensor biases).
    *   $G(t)$ is the input matrix (or noise coupling matrix). It describes how sensor errors (noise, biases) affect the error states.
    *   $\mathbf{w}(t)$ is the vector of sensor errors (e.g., accelerometer noise, gyro noise, biases).
    The specific elements of $F$ and $G$ are derived by perturbing the full INS kinematic equations (which involve specific force, Earth rotation, gravity) and then linearizing them.
*   **What Could Go Wrong:** Algebraic mistakes during the perturbation and linearization steps. Forgetting to account for all relevant forces and rotations (e.g., Coriolis effect, gravity).

### Step 5: Specific INS Error States and the F-Matrix Structure

*   **Plain-English Statement:** The full error state vector for an INS typically includes errors in position, velocity, and attitude, as well as the errors within the sensors themselves (like accelerometer and gyroscope biases). The $F$ matrix then shows how each of these errors affects the *rate of change* of all the others. For example, an attitude error will cause specific force to be projected incorrectly, leading to velocity errors. A velocity error, when integrated, leads to a position error.
*   **Concrete Example:** If your INS thinks it's pointing slightly left when it's actually going straight (attitude error), it will misinterpret the forward acceleration. This misinterpretation will cause it to calculate a velocity that's slightly off-course, which eventually leads to a position error that grows over time. The $F$ matrix captures these interconnected effects.
*   **Formal/Mathematical Version:** A common INS error state vector includes:
    $$ \delta\mathbf{x} = \begin{bmatrix} \delta\mathbf{r} \\ \delta\mathbf{v} \\ \delta\boldsymbol{\psi} \\ \delta\mathbf{b}_a \\ \delta\mathbf{b}_g \end{bmatrix} $$
    Where:
    *   $\delta\mathbf{r}$ is the 3x1 position error vector (e.g., North, East, Down).
    *   $\delta\mathbf{v}$ is the 3x1 velocity error vector.
    *   $\delta\boldsymbol{\psi}$ is the 3x1 attitude error vector (often called "psi-angle" error, representing small angular errors around the navigation frame axes).
    *   $\delta\mathbf{b}_a$ is the 3x1 accelerometer bias error vector.
    *   $\delta\mathbf{b}_g$ is the 3x1 gyroscope bias error vector.
    The system dynamics matrix $F$ (for the navigation frame, NED) then has a block structure:
    $$ F = \begin{bmatrix} F_{rr} & F_{rv} & F_{r\psi} & F_{rb_a} & F_{rb_g} \\ F_{vr} & F_{vv} & F_{v\psi} & F_{vb_a} & F_{vb_g} \\ F_{\psi r} & F_{\psi v} & F_{\psi\psi} & F_{\psi b_a} & F_{\psi b_g} \\ F_{b_a r} & F_{b_a v} & F_{b_a\psi} & F_{b_a b_a} & F_{b_a b_g} \\ F_{b_g r} & F_{b_g v} & F_{b_g\psi} & F_{b_g b_a} & F_{b_g b_g} \end{bmatrix} $$
    Some key blocks (simplified for intuition, exact forms are complex):
    *   $F_{rr}$: Relates position error to its rate of change. Often involves terms related to Earth's rotation and local gravity.
    *   $F_{rv}$: Relates velocity error to position error rate. Typically identity matrix $I_{3\times3}$ (since $\delta\dot{\mathbf{r}} = \delta\mathbf{v}$).
    *   $F_{vr}$: Relates position error to velocity error rate. Involves gravity gradient terms (how gravity changes with altitude/latitude) and Coriolis terms.
    *   $F_{vv}$: Relates velocity error to its rate of change. Involves Coriolis and centripetal terms.
    *   $F_{v\psi}$: Relates attitude error to velocity error rate. This is a crucial term, as attitude error causes mis-projection of specific force. It's often $C_{b,e}^n [\mathbf{f}_m \times]$, where $\mathbf{f}_m$ is the measured specific force.
    *   $F_{vb_a}$: Relates accelerometer bias to velocity error rate. Typically $C_{b,e}^n$.
    *   $F_{\psi\psi}$: Relates attitude error to its rate of change. Involves Earth rate and vehicle angular rate.
    *   $F_{\psi b_g}$: Relates gyro bias to attitude error rate. Typically $-C_{b,e}^n$.
    *   $F_{b_a b_a}$ and $F_{b_g b_g}$: Often zero, assuming biases are constant (or slowly varying, modeled as random walk, but not directly coupled to other states for their *rate of change*).
    The input matrix $G$ would map sensor noise directly to the velocity and attitude error rates:
    $$ G = \begin{bmatrix} 0 & 0 \\ C_{b,e}^n & 0 \\ 0 & -C_{b,e}^n \\ 0 & 0 \\ 0 & 0 \end{bmatrix} $$
    Where the first column corresponds to accelerometer noise and the second to gyroscope noise.
*   **What Could Go Wrong:** Incorrectly deriving the specific terms of the $F$ matrix, especially those involving Earth rotation, gravity, and Coriolis effects, or misinterpreting the physical meaning of each block.

### Step 6: The Role of Gravity and Earth Rotation

*   **Plain-English Statement:** The Earth's rotation and its gravitational field are fundamental forces that affect how a vehicle moves and how its INS measures that movement. Errors in understanding or modeling these effects will directly contribute to navigation errors. For example, if the INS doesn't correctly account for the Coriolis effect (an apparent force due to Earth's rotation), it will misinterpret accelerations. Similarly, small errors in altitude will lead to errors in the assumed local gravity value.
*   **Concrete Example:** Imagine flying an airplane. If the INS doesn't correctly account for the Earth spinning underneath it, it would constantly think it's being pushed sideways, leading to a growing error in its East-West position. Gravity's direction also changes slightly with latitude and altitude; ignoring these details introduces subtle but accumulating errors.
*   **Formal/Mathematical Version:** The full navigation equations in the navigation frame are:
    $$ \dot{\mathbf{r}}^n = \mathbf{v}^n $$
    $$ \dot{\mathbf{v}}^n = C_b^n \mathbf{f}^b - (2\boldsymbol{\omega}_{ie}^n + \boldsymbol{\omega}_{en}^n) \times \mathbf{v}^n + \mathbf{g}^n $$
    $$ \dot{C}_b^n = C_b^n [\boldsymbol{\omega}_{ib}^b \times] - [\boldsymbol{\omega}_{nb}^n \times] C_b^n $$
    When perturbing these for error state equations:
    *   **Gravity ($\mathbf{g}^n$):** Errors in position ($\delta\mathbf{r}$) affect the calculated gravity vector ($\delta\mathbf{g}^n = \frac{\partial\mathbf{g}}{\partial\mathbf{r}}\delta\mathbf{r}$). This gravity gradient term directly impacts the $F_{vr}$ block.
    *   **Earth Rate ($\boldsymbol{\omega}_{ie}^n$):** The Earth's angular velocity. Errors in velocity ($\delta\mathbf{v}$) interacting with Earth rate lead to Coriolis-like terms that appear in $F_{vv}$ and $F_{vr}$. Also, attitude errors ($\delta\boldsymbol{\psi}$) cause mis-orientation of the navigation frame relative to the true Earth frame, affecting how $\boldsymbol{\omega}_{ie}^n$ is perceived, impacting $F_{\psi\psi}$.
    *   **Transport Rate ($\boldsymbol{\omega}_{en}^n$):** The angular velocity of the navigation frame relative to the ECEF frame, due to the vehicle's movement over the Earth's surface. Errors in position ($\delta\mathbf{r}$) and velocity ($\delta\mathbf{v}$) affect $\boldsymbol{\omega}_{en}^n$, leading to terms in $F_{rr}$, $F_{rv}$, $F_{vr}$, $F_{vv}$, and $F_{\psi\psi}$.
*   **What Could Go Wrong:** Ignoring these effects simplifies the equations but leads to highly inaccurate error predictions, especially for long durations or high-dynamic maneuvers. Incorrectly calculating the Coriolis term or the gravity gradient matrix.

## 5. Worked examples — multiple, with every step shown

We will focus on simplified 1D and 2D scenarios to illustrate the principles without getting bogged down in the full 15-state 3D INS equations, which are extremely lengthy to derive by hand.

### Example 1: 1D Constant Acceleration with Accelerometer Bias

**Problem:** A 1D INS is designed to measure acceleration along a single axis. It starts at rest ($\mathbf{v}(0)=0$) at position $\mathbf{r}(0)=0$. The true acceleration is constant, $a_t = 1 \text{ m/s}^2$. The accelerometer has a constant bias error, $b_a = 0.1 \text{ m/s}^2$. Derive the error state equations for position and velocity, and then solve for the position and velocity errors as a function of time.

**Given:**
*   True acceleration $a_t = 1 \text{ m/s}^2$
*   Accelerometer bias $b_a = 0.1 \text{ m/s}^2$
*   Initial true position $r_t(0) = 0$
*   Initial true velocity $v_t(0) = 0$
*   Initial estimated position $r_e(0) = 0$
*   Initial estimated velocity $v_e(0) = 0$ (meaning initial position and velocity errors are zero)

**We want:**
*   Error state equations for $\delta r$ and $\delta v$.
*   Expressions for $\delta r(t)$ and $\delta v(t)$.

**Step-by-step Solution:**

1.  **Define True and Estimated States:**
    *   True position: $r_t$
    *   True velocity: $v_t$
    *   Estimated position: $r_e$
    *   Estimated velocity: $v_e$

2.  **Define Error States:**
    *   Position error: $\delta r = r_e - r_t$
    *   Velocity error: $\delta v = v_e - v_t$

3.  **Define Measured Acceleration:**
    *   The measured acceleration $a_m$ is the true acceleration $a_t$ plus the accelerometer bias $b_a$.
    $$ a_m = a_t + b_a $$
    *   **WHY:** This models the sensor imperfection. The INS "sees" $a_m$, not $a_t$.

4.  **Write down the True Kinematic Equations:**
    *   $\dot{r}_t = v_t$
    *   $\dot{v}_t = a_t$
    *   **WHY:** These are the fundamental equations of motion: velocity is the derivative of position, and acceleration is the derivative of velocity.

5.  **Write down the Estimated Kinematic Equations (what the INS calculates):**
    *   $\dot{r}_e = v_e$
    *   $\dot{v}_e = a_m$
    *   **WHY:** The INS uses its *measured* acceleration ($a_m$) to update its estimated velocity.

6.  **Derive Error State Equations:**
    *   Take the derivative of the position error:
        $$ \delta\dot{r} = \dot{r}_e - \dot{r}_t $$
        Substitute from steps 4 and 5:
        $$ \delta\dot{r} = v_e - v_t $$
        Recognize $v_e - v_t$ as $\delta v$:
        $$ \delta\dot{r} = \delta v $$
        *   **WHY:** The rate of change of position error is simply the velocity error. If your estimated velocity is wrong, your estimated position will drift.

    *   Take the derivative of the velocity error:
        $$ \delta\dot{v} = \dot{v}_e - \dot{v}_t $$
        Substitute from steps 4 and 5:
        $$ \delta\dot{v} = a_m - a_t $$
        Substitute $a_m = a_t + b_a$ from step 3:
        $$ \delta\dot{v} = (a_t + b_a) - a_t $$
        $$ \delta\dot{v} = b_a $$
        *   **WHY:** The rate of change of velocity error is directly caused by the accelerometer bias. A constant bias will cause velocity error to grow linearly.

    *   So, the error state equations are:
        $$ \delta\dot{r} = \delta v $$
        $$ \delta\dot{v} = b_a $$

7.  **Solve the Error State Equations:**
    *   We have initial conditions: $\delta r(0) = r_e(0) - r_t(0) = 0 - 0 = 0$
    *   And $\delta v(0) = v_e(0) - v_t(0) = 0 - 0 = 0$
    *   Integrate $\delta\dot{v} = b_a$:
        $$ \int_0^t \delta\dot{v}(\tau) d\tau = \int_0^t b_a d\tau $$
        $$ \delta v(t) - \delta v(0) = b_a t $$
        Since $\delta v(0) = 0$:
        $$ \delta v(t) = b_a t $$
        *   **WHY:** A constant acceleration (from the bias) results in a linearly increasing velocity.

    *   Now substitute $\delta v(t)$ into $\delta\dot{r} = \delta v$:
        $$ \delta\dot{r} = b_a t $$
        Integrate this equation:
        $$ \int_0^t \delta\dot{r}(\tau) d\tau = \int_0^t b_a \tau d\tau $$
        $$ \delta r(t) - \delta r(0) = \frac{1}{2} b_a t^2 $$
        Since $\delta r(0) = 0$:
        $$ \delta r(t) = \frac{1}{2} b_a t^2 $$
        *   **WHY:** A linearly increasing velocity (from the bias) results in a quadratically increasing position.

**Final Answer:**
The error state equations are:
$$ \delta\dot{r} = \delta v $$
$$ \delta\dot{v} = b_a $$
The solutions for position and velocity errors are:
$$ \boxed{\delta v(t) = b_a t} $$
$$ \boxed{\delta r(t) = \frac{1}{2} b_a t^2} $$

**Reflection:** This example highlights how a constant sensor bias leads to a linearly growing velocity error and a quadratically growing position error. This quadratic growth is a hallmark of INS errors and why they become so large over time. The trickiest part is carefully defining true vs. estimated and then substituting consistently.

### Example 2: 1D Velocity Error with Accelerometer Bias and Initial Velocity Error

**Problem:** Consider the same 1D INS. The true acceleration is zero ($a_t = 0$). The accelerometer has a constant bias error, $b_a = 0.05 \text{ m/s}^2$. The INS starts with an initial velocity error of $\delta v(0) = 0.2 \text{ m/s}$ (i.e., $v_e(0) = v_t(0) + 0.2$). The initial position error is zero, $\delta r(0) = 0$. Solve for the velocity error $\delta v(t)$.

**Given:**
*   True acceleration $a_t = 0 \text{ m/s}^2$
*   Accelerometer bias $b_a = 0.05 \text{ m/s}^2$
*   Initial velocity error $\delta v(0) = 0.2 \text{ m/s}$
*   Initial position error $\delta r(0) = 0 \text{ m}$

**We want:**
*   Expression for $\delta v(t)$.

**Step-by-step Solution:**

1.  **Recall Error State Equations from Example 1:**
    *   $\delta\dot{r} = \delta v$
    *   $\delta\dot{v} = b_a$
    *   **WHY:** These equations are general for a 1D INS with accelerometer bias, regardless of the true acceleration (as $a_t$ cancels out in the derivation of $\delta\dot{v}$).

2.  **Apply Initial Condition for Velocity Error:**
    *   We need to integrate $\delta\dot{v} = b_a$.
    $$ \int_0^t \delta\dot{v}(\tau) d\tau = \int_0^t b_a d\tau $$
    $$ \delta v(t) - \delta v(0) = b_a t $$
    *   **WHY:** This is the standard way to solve a first-order differential equation with an initial condition.

3.  **Substitute the Given Initial Velocity Error:**
    *   We are given $\delta v(0) = 0.2 \text{ m/s}$.
    $$ \delta v(t) - 0.2 = b_a t $$
    $$ \delta v(t) = b_a t + 0.2 $$
    *   **WHY:** We are now including the initial "head start" of the error.

4.  **Substitute the Numerical Value for Bias:**
    *   Given $b_a = 0.05 \text{ m/s}^2$.
    $$ \delta v(t) = 0.05 t + 0.2 $$

**Final Answer:**
The velocity error as a function of time is:
$$ \boxed{\delta v(t) = 0.05 t + 0.2} $$

**Reflection:** This example shows that initial errors don't just disappear; they propagate alongside newly generated errors. The constant bias still causes a linear increase, but the entire error function is shifted up by the initial error. This is crucial because INS initialization errors (from alignment or initial position/velocity knowledge) are significant sources of overall error.

### Example 3: 2D Position/Velocity Error with Constant Accelerometer Bias (Matrix Form)

**Problem:** A 2D INS operates on a flat Earth. The true acceleration is zero ($\mathbf{a}_t = \mathbf{0}$). The accelerometer has a constant bias vector $\mathbf{b}_a = \begin{bmatrix} 0.01 \\ 0.02 \end{bmatrix} \text{ m/s}^2$. The initial position and velocity errors are zero: $\delta\mathbf{r}(0) = \mathbf{0}$ and $\delta\mathbf{v}(0) = \mathbf{0}$. Formulate the error state equations in matrix form and solve for $\delta\mathbf{r}(t)$ and $\delta\mathbf{v}(t)$.

**Given:**
*   True acceleration $\mathbf{a}_t = \mathbf{0}$
*   Accelerometer bias $\mathbf{b}_a = \begin{bmatrix} 0.01 \\ 0.02 \end{bmatrix} \text{ m/s}^2$
*   Initial position error $\delta\mathbf{r}(0) = \mathbf{0}$
*   Initial velocity error $\delta\mathbf{v}(0) = \mathbf{0}$

**We want:**
*   Error state equations in matrix form.
*   Expressions for $\delta\mathbf{r}(t)$ and $\delta\mathbf{v}(t)$.

**Step-by-step Solution:**

1.  **Define Error States:**
    *   Position error vector: $\delta\mathbf{r} = \begin{bmatrix} \delta x \\ \delta y \end{bmatrix}$
    *   Velocity error vector: $\delta\mathbf{v} = \begin{bmatrix} \delta v_x \\ \delta v_y \end{bmatrix}$

2.  **Define Measured Acceleration:**
    *   $\mathbf{a}_m = \mathbf{a}_t + \mathbf{b}_a$
    *   **WHY:** Same sensor model as 1D case, extended to 2D.

3.  **Write down True and Estimated Kinematic Equations (2D):**
    *   True: $\dot{\mathbf{r}}_t = \mathbf{v}_t$, $\dot{\mathbf{v}}_t = \mathbf{a}_t$
    *   Estimated: $\dot{\mathbf{r}}_e = \mathbf{v}_e$, $\dot{\mathbf{v}}_e = \mathbf{a}_m$
    *   **WHY:** Vector form of the 1D kinematics.

4.  **Derive Error State Equations (2D):**
    *   $\delta\dot{\mathbf{r}} = \dot{\mathbf{r}}_e - \dot{\mathbf{r}}_t = \mathbf{v}_e - \mathbf{v}_t = \delta\mathbf{v}$
    *   $\delta\dot{\mathbf{v}} = \dot{\mathbf{v}}_e - \dot{\mathbf{v}}_t = \mathbf{a}_m - \mathbf{a}_t = (\mathbf{a}_t + \mathbf{b}_a) - \mathbf{a}_t = \mathbf{b}_a$
    *   **WHY:** The derivations are identical to the 1D case, just with vectors instead of scalars.

5.  **Formulate in Matrix State-Space Form:**
    *   Let the error state vector be $\delta\mathbf{X} = \begin{bmatrix} \delta\mathbf{r} \\ \delta\mathbf{v} \end{bmatrix} = \begin{bmatrix} \delta x \\ \delta y \\ \delta v_x \\ \delta v_y \end{bmatrix}$.
    *   Then $\delta\dot{\mathbf{X}} = \begin{bmatrix} \delta\dot{\mathbf{r}} \\ \delta\dot{\mathbf{v}} \end{bmatrix} = \begin{bmatrix} \delta\mathbf{v} \\ \mathbf{b}_a \end{bmatrix}$.
    *   We want $\delta\dot{\mathbf{X}} = F\delta\mathbf{X} + G\mathbf{w}$. In this case, $\mathbf{w}$ is just $\mathbf{b}_a$.
    *   We can write:
        $$ \begin{bmatrix} \delta\dot{x} \\ \delta\dot{y} \\ \delta\dot{v}_x \\ \delta\dot{v}_y \end{bmatrix} = \begin{bmatrix} 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{bmatrix} \begin{bmatrix} \delta x \\ \delta y \\ \delta v_x \\ \delta v_y \end{bmatrix} + \begin{bmatrix} 0 & 0 \\ 0 & 0 \\ 1 & 0 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} b_{ax} \\ b_{ay} \end{bmatrix} $$
        Or more compactly using block matrices:
        $$ \begin{bmatrix} \delta\dot{\mathbf{r}} \\ \delta\dot{\mathbf{v}} \end{bmatrix} = \begin{bmatrix} \mathbf{0}_{2\times2} & I_{2\times2} \\ \mathbf{0}_{2\times2} & \mathbf{0}_{2\times2} \end{bmatrix} \begin{bmatrix} \delta\mathbf{r} \\ \delta\mathbf{v} \end{bmatrix} + \begin{bmatrix} \mathbf{0}_{2\times2} \\ I_{2\times2} \end{bmatrix} \mathbf{b}_a $$
        Where $\mathbf{0}_{2\times2}$ is a 2x2 zero matrix and $I_{2\times2}$ is a 2x2 identity matrix.
    *   **WHY:** This is the standard state-space representation. The $F$ matrix shows how position error rate depends on velocity error, and velocity error rate depends on nothing (from the state). The $G$ matrix shows how the accelerometer bias *directly* affects the velocity error rate.

6.  **Solve the Error State Equations:**
    *   From $\delta\dot{\mathbf{v}} = \mathbf{b}_a$:
        $$ \int_0^t \delta\dot{\mathbf{v}}(\tau) d\tau = \int_0^t \mathbf{b}_a d\tau $$
        $$ \delta\mathbf{v}(t) - \delta\mathbf{v}(0) = \mathbf{b}_a t $$
        Given $\delta\mathbf{v}(0) = \mathbf{0}$:
        $$ \delta\mathbf{v}(t) = \mathbf{b}_a t $$
        *   **WHY:** Each component of velocity error integrates the corresponding component of bias independently.

    *   From $\delta\dot{\mathbf{r}} = \delta\mathbf{v}$:
        $$ \int_0^t \delta\dot{\mathbf{r}}(\tau) d\tau = \int_0^t \delta\mathbf{v}(\tau) d\tau $$
        $$ \delta\mathbf{r}(t) - \delta\mathbf{r}(0) = \int_0^t \mathbf{b}_a \tau d\tau $$
        Given $\delta\mathbf{r}(0) = \mathbf{0}$:
        $$ \delta\mathbf{r}(t) = \frac{1}{2} \mathbf{b}_a t^2 $$
        *   **WHY:** Similar to the 1D case, integrating the linear velocity error gives quadratic position error.

7.  **Substitute Numerical Values:**
    *   $\mathbf{b}_a = \begin{bmatrix} 0.01 \\ 0.02 \end{bmatrix}$
    *   $\delta\mathbf{v}(t) = \begin{bmatrix} 0.01 \\ 0.02 \end{bmatrix} t = \begin{bmatrix} 0.01t \\ 0.02t \end{bmatrix}$
    *   $\delta\mathbf{r}(t) = \frac{1}{2} \begin{bmatrix} 0.01 \\ 0.02 \end{bmatrix} t^2 = \begin{bmatrix} 0.005t^2 \\ 0.01t^2 \end{bmatrix}$

**Final Answer:**
The error state equations in matrix form are:
$$ \boxed{\begin{bmatrix} \delta\dot{\mathbf{r}} \\ \delta\dot{\mathbf{v}} \end{bmatrix} = \begin{bmatrix} \mathbf{0}_{2\times2} & I_{2\times2} \\ \mathbf{0}_{2\times2} & \mathbf{0}_{2\times2} \end{bmatrix} \begin{bmatrix} \delta\mathbf{r} \\ \delta\mathbf{v} \end{bmatrix} + \begin{bmatrix} \mathbf{0}_{2\times2} \\ I_{2\times2} \end{bmatrix} \mathbf{b}_a} $$
The solutions for position and velocity errors are:
$$ \boxed{\delta\mathbf{v}(t) = \begin{bmatrix} 0.01t \\ 0.02t \end{bmatrix}} $$
$$ \boxed{\delta\mathbf{r}(t) = \begin{bmatrix} 0.005t^2 \\ 0.01t^2 \end{bmatrix}} $$

**Reflection:** This example demonstrates how the matrix formulation naturally handles multiple dimensions. Each component of the bias propagates independently in this simplified scenario. The block matrix structure is a precursor to the much larger F-matrix for full 3D INS.

### Example 4: Simplified 1-Axis Attitude Error Propagation with Gyro Bias

**Problem:** A 1-axis INS (e.g., a spinning top) is measuring angular rate around its Z-axis. The true angular rate is constant, $\omega_{tz} = 10 \text{ deg/s}$. The gyroscope measuring this rate has a constant bias $b_{gz} = 0.1 \text{ deg/s}$. The initial attitude error around the Z-axis is zero, $\delta\psi_z(0) = 0$. The true attitude is $\psi_t(0) = 0$. Derive the error state equation for $\delta\psi_z$ and solve for $\delta\psi_z(t)$.

**Given:**
*   True angular rate $\omega_{tz} = 10 \text{ deg/s}$
*   Gyro bias $b_{gz} = 0.1 \text{ deg/s}$
*   Initial attitude error $\delta\psi_z(0) = 0$

**We want:**
*   Error state equation for $\delta\psi_z$.
*   Expression for $\delta\psi_z(t)$.

**Step-by-step Solution:**

1.  **Define True and Estimated Attitudes:**
    *   True attitude: $\psi_t$ (angle around Z-axis)
    *   Estimated attitude: $\psi_e$ (angle around Z-axis)

2.  **Define Error State:**
    *   Attitude error: $\delta\psi_z = \psi_e - \psi_t$

3.  **Define Measured Angular Rate:**
    *   The measured angular rate $\omega_{mz}$ is the true rate $\omega_{tz}$ plus the gyro bias $b_{gz}$.
    $$ \omega_{mz} = \omega_{tz} + b_{gz} $$
    *   **WHY:** This is the sensor model for the gyroscope.

4.  **Write down the True and Estimated Kinematic Equations for Attitude:**
    *   True: $\dot{\psi}_t = \omega_{tz}$
    *   Estimated: $\dot{\psi}_e = \omega_{mz}$
    *   **WHY:** The rate of change of attitude is the angular rate. The INS uses its *measured* angular rate.

5.  **Derive the Error State Equation:**
    *   Take the derivative of the attitude error:
        $$ \delta\dot{\psi}_z = \dot{\psi}_e - \dot{\psi}_t $$
        Substitute from step 4:
        $$ \delta\dot{\psi}_z = \omega_{mz} - \omega_{tz} $$
        Substitute $\omega_{mz} = \omega_{tz} + b_{gz}$ from step 3:
        $$ \delta\dot{\psi}_z = (\omega_{tz} + b_{gz}) - \omega_{tz} $$
        $$ \delta\dot{\psi}_z = b_{gz} $$
        *   **WHY:** The rate of change of attitude error is directly caused by the gyroscope bias. A constant gyro bias causes attitude error to grow linearly.

6.  **Solve the Error State Equation:**
    *   We have the initial condition $\delta\psi_z(0) = 0$.
    *   Integrate $\delta\dot{\psi}_z = b_{gz}$:
        $$ \int_0^t \delta\dot{\psi}_z(\tau) d\tau = \int_0^t b_{gz} d\tau $$
        $$ \delta\psi_z(t) - \delta\psi_z(0) = b_{gz} t $$
        Since $\delta\psi_z(0) = 0$:
        $$ \delta\psi_z(t) = b_{gz} t $$
        *   **WHY:** A constant angular rate (from the bias) results in a linearly increasing angle.

7.  **Substitute Numerical Value for Bias:**
    *   Given $b_{gz} = 0.1 \text{ deg/s}$.
    $$ \delta\psi_z(t) = 0.1 t $$

**Final Answer:**
The error state equation for attitude error is:
$$ \boxed{\delta\dot{\psi}_z = b_{gz}} $$
The solution for attitude error is:
$$ \boxed{\delta\psi_z(t) = 0.1 t} $$

**Reflection:** This example shows that gyroscope biases lead to linearly growing attitude errors. While this seems simple, attitude errors are particularly insidious because they misorient the accelerometer measurements. A small attitude error can cause a large specific force to be projected incorrectly onto the navigation frame, leading to significant velocity and position errors (as seen in the $F_{v\psi}$ term in Step 5 of the core idea). This coupling is what makes full 3D INS error propagation complex.

## 6. Common mistakes and traps

1.  **Confusing True vs. Estimated States:** Students often mix up which variable represents the true value and which is the INS's computed value. This leads to sign errors in the error definitions ($\delta\mathbf{x} = \mathbf{x}_e - \mathbf{x}_t$ vs. $\mathbf{x}_t - \mathbf{x}_e$) and incorrect setup of the propagation equations.
2.  **Incorrect Linearization (Taylor Expansion Errors):** Forgetting terms in the Taylor series, making algebraic errors during partial differentiation, or assuming a linear relationship where it's not valid for larger errors. This is especially tricky with rotation matrices and quaternion kinematics.
3.  **Ignoring Coupling Between States:** Treating position, velocity, and attitude errors as independent. Forgetting that an attitude error directly impacts how specific force is transformed, thus causing velocity errors, which then cause position errors. Or that position errors affect gravity.
4.  **Incorrect Reference Frame Transformations:** Failing to properly transform vectors (like specific force or angular velocity) or error states between body, navigation, and ECEF frames. Forgetting to account for Earth's rotation or the Coriolis effect in the navigation equations.
5.  **Sign Errors in Coriolis and Gravity Terms:** The terms involving Earth rate ($\boldsymbol{\omega}_{ie}$) and gravity ($\mathbf{g}$) in the navigation equations, and subsequently in the $F$ matrix, are prone to sign errors due to vector cross products and coordinate system conventions.
6.  **Assuming Constant Sensor Errors:** Many derivations simplify sensor biases as constant. In reality, biases drift over time, and noise is stochastic. While constant bias is a good starting point, neglecting drift or random walk leads to inaccurate long-term error predictions.

## 7. Textbook-precise explanation

The error state equations for an Inertial Navigation System (INS) are derived by perturbing the full non-linear navigation equations and linearizing them around a nominal (estimated) trajectory. This results in a set of linear, time-varying differential equations that describe the evolution of the navigation errors.

Let the true state of the vehicle be $\mathbf{X}_t(t)$ and the estimated state from the INS be $\mathbf{X}_e(t)$. The navigation equations are generally expressed as:
$$ \dot{\mathbf{X}}_t = f(\mathbf{X}_t, \mathbf{u}_t, t) $$
where $\mathbf{u}_t$ represents the true sensor inputs (specific force and angular velocity). The INS computes its state using measured sensor inputs $\mathbf{u}_m$:
$$ \dot{\mathbf{X}}_e = f(\mathbf{X}_e, \mathbf{u}_m, t) $$
We define the error state vector as $\delta\mathbf{X}(t) = \mathbf{X}_e(t) - \mathbf{X}_t(t)$. The measured sensor inputs are related to the true inputs by $\mathbf{u}_m = \mathbf{u}_t + \delta\mathbf{u}$, where $\delta\mathbf{u}$ represents sensor errors (e.g., accelerometer bias, gyro bias, noise).

By substituting $\mathbf{X}_t = \mathbf{X}_e - \delta\mathbf{X}$ and $\mathbf{u}_t = \mathbf{u}_m - \delta\mathbf{u}$ into the true dynamics equation and performing a first-order Taylor series expansion around the estimated state $\mathbf{X}_e$ and measured input $\mathbf{u}_m$, we obtain the linearized error state equation:
$$ \delta\dot{\mathbf{X}}(t) = F(t)\delta\mathbf{X}(t) + G(t)\delta\mathbf{u}(t) $$
Here:
*   $\delta\mathbf{X}(t)$ is the error state vector, typically defined as:
    $$ \delta\mathbf{X} = \begin{bmatrix} \delta\mathbf{r}^n \\ \delta\mathbf{v}^n \\ \delta\boldsymbol{\psi}^n \\ \delta\mathbf{b}_a \\ \delta\mathbf{b}_g \\ \delta\mathbf{g} \\ \dots \end{bmatrix} $$
    where $\delta\mathbf{r}^n$ is position error in the navigation frame, $\delta\mathbf{v}^n$ is velocity error in the navigation frame, $\delta\boldsymbol{\psi}^n$ is the attitude error vector (representing the small angle rotation from the true navigation frame to the estimated navigation frame), $\delta\mathbf{b}_a$ is accelerometer bias error, $\delta\mathbf{b}_g$ is gyroscope bias error, and potentially other sensor errors or environmental errors like gravity anomaly error $\delta\mathbf{g}$.
*   $F(t) = \frac{\partial f}{\partial \mathbf{X}} \Big|_{\mathbf{X}_e, \mathbf{u}_m}$ is the system dynamics matrix (also known as the state transition matrix or Jacobian of the system dynamics with respect to the state). It describes how current errors propagate into future errors. Its elements are derived from the partial derivatives of the navigation equations with respect to each state variable and are evaluated along the estimated trajectory.
*   $G(t) = \frac{\partial f}{\partial \mathbf{u}} \Big|_{\mathbf{X}_e, \mathbf{u}_m}$ is the input matrix (or noise coupling matrix). It describes how sensor errors (modeled as $\delta\mathbf{u}$) affect the rate of change of the error states.
*   $\delta\mathbf{u}(t)$ is the vector of sensor errors and other perturbing inputs.

For a typical INS operating in a local navigation frame (e.g., North-East-Down), the $F$ matrix for the state vector $\delta\mathbf{X} = [\delta\mathbf{r}^T, \delta\mathbf{v}^T, \delta\boldsymbol{\psi}^T, \delta\mathbf{b}_a^T, \delta\mathbf{b}_g^T]^T$ takes the block-matrix form:
$$ F = \begin{bmatrix}
\mathbf{0} & I & \mathbf{0} & \mathbf{0} & \mathbf{0} \\
F_{vr} & F_{vv} & F_{v\psi} & C_b^n & \mathbf{0} \\
\mathbf{0} & \mathbf{0} & F_{\psi\psi} & \mathbf{0} & -C_b^n \\
\mathbf{0} & \mathbf{0} & \mathbf{0} & \mathbf{0} & \mathbf{0} \\
\mathbf{0} & \mathbf{0} & \mathbf{0} & \mathbf{0} & \mathbf{0}
\end{bmatrix} $$
where $I$ is the identity matrix, $\mathbf{0}$ is a zero matrix of appropriate dimensions, and $C_b^n$ is the estimated body-to-navigation frame direction cosine matrix. The non-zero sub-matrices are:
*   $F_{vr} = -(2\boldsymbol{\omega}_{ie}^n + \boldsymbol{\omega}_{en}^n) \times \frac{\partial \mathbf{v}^n}{\partial \mathbf{r}^n} + \frac{\partial \mathbf{g}^n}{\partial \mathbf{r}^n}$ (gravity gradient and Coriolis terms)
*   $F_{vv} = -(2\boldsymbol{\omega}_{ie}^n + \boldsymbol{\omega}_{en}^n) \times I - [\boldsymbol{\omega}_{en}^n \times]$ (Coriolis and transport rate effects)
*   $F_{v\psi} = [C_b^n \mathbf{f}_m^b \times]$ (effect of attitude error on specific force projection)
*   $F_{\psi\psi} = -[\boldsymbol{\omega}_{in}^n \times]$ (effect of attitude error on navigation frame rotation)
Here, $\boldsymbol{\omega}_{ie}^n$ is Earth's rotation rate in the navigation frame, $\boldsymbol{\omega}_{en}^n$ is the navigation frame's angular rate relative to ECEF, and $\boldsymbol{\omega}_{in}^n = \boldsymbol{\omega}_{ie}^n + \boldsymbol{\omega}_{en}^n$. The terms for $\delta\mathbf{b}_a$ and $\delta\mathbf{b}_g$ are often modeled as random walk processes, making their $\dot{\mathbf{b}}$ terms zero in the deterministic $F$ matrix, but they would be driven by noise in the $G\mathbf{w}$ term.

This framework is fundamental for designing Kalman filters (specifically the Extended Kalman Filter or Error-State Kalman Filter) for INS/GPS integration, where external measurements are used to observe and correct these propagating errors.

**References:**
*   **Titterton, D. H., & Weston, J. L. (2004). *Strapdown Inertial Navigation Technology* (2nd ed.). American Institute of Aeronautics and Astronautics.** (Chapter 6: Error Analysis and System Performance)
*   **Grewal, M. S., Weill, L. R., & Andrews, A. P. (2007). *Global Positioning Systems, Inertial Navigation, and Integration* (2nd ed.). John Wiley & Sons.** (Chapter 6: Inertial Navigation System Errors)
*   **Savage, P. G. (2007). *Strapdown Analytics*. Strapdown Associates, Inc.** (A highly detailed and practical reference for INS equations and error analysis).

## 8. ASCII diagrams

Here's a conceptual diagram illustrating the relationship between true, estimated, and error states, and how sensor errors feed into the system.

```text
+---------------------+      +---------------------+
|   TRUE WORLD        |      |   INS ESTIMATION    |
| (Actual Physics)    |      | (Computer Model)    |
+---------------------+      +---------------------+
|                     |      |                     |
| True Position (rt)  |      | Estimated Position (re)
| True Velocity (vt)  |      | Estimated Velocity (ve)
| True Attitude (Ct)  |      | Estimated Attitude (Ce)
|                     |      |                     |
| True Specific Force |      | Measured Specific   |
|     (ft)            +----->+     Force (fm)      |
| True Angular Rate   |      | Measured Angular    |
|     (ωt)            +----->+     Rate (ωm)       |
|                     |      |                     |
+----------^----------+      +----------^----------+
           | Sensor Errors (δf, δω)
           | (Bias, Noise, Scale Factor, etc.)
           |
           v
+---------------------------------------------------+
|               ERROR STATE (δX = Xe - Xt)          |
|                                                   |
|   δr = re - rt      (Position Error)              |
|   δv = ve - vt      (Velocity Error)              |
|   δψ = ψe - ψt      (Attitude Error)              |
|   δba               (Accelerometer Bias Error)    |
|   δbg               (Gyroscope Bias Error)        |
|                                                   |
|   Propagated by:  δX_dot = F * δX + G * w         |
|                                                   |
+---------------------------------------------------+
```

**Description of the Diagram:**

The diagram shows two main realms: the "True World" (what's actually happening) and the "INS Estimation" (what the INS calculates). The INS tries to estimate the true position, velocity, and attitude by integrating measured specific force and angular rate.

*   **True Inputs:** The true specific force ($\mathbf