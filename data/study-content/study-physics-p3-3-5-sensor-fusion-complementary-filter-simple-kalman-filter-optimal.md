## 1. What it is — in plain English

Imagine you're trying to figure out if your friend is coming towards you or moving away. You might listen to their voice (does it sound louder or softer?), or you might look at them (are they getting bigger or smaller?). Each "sense" gives you a piece of information, but neither is perfect on its own. Your ears might be fooled by echoes, and your eyes might be blurry in the dark. But if you combine the information from both your ears and your eyes, your brain can make a much more reliable guess about what your friend is doing.

"Sensor fusion" is exactly like this, but for machines. It's the art and science of combining data from multiple different sensors to get a more accurate, reliable, and complete understanding of a system's state than any single sensor could provide alone. Think of it as giving a robot or a rocket "super senses" by intelligently merging all the data it collects.

A "complementary filter" is a simple, straightforward way to do this, especially when you have two sensors that are good at different things. One might be great at capturing sudden, fast changes but tends to drift over time, while the other might be slow to react but very stable and accurate in the long run. The complementary filter basically says, "Let's trust the fast sensor for quick movements and the stable sensor for the overall, long-term picture."

The "Kalman filter" is a much more sophisticated and mathematically optimal way to combine sensor data. Instead of just picking and choosing based on speed or stability, it uses statistical models of how the system moves and how noisy each sensor is. It constantly predicts what should happen next, then compares that prediction to what the sensors actually measure, and finally, it updates its best guess by weighing the prediction and the measurement optimally, minimizing uncertainty. It's like a highly intelligent detective that always has a theory, but is always ready to adjust it based on new evidence, and knows exactly how much to trust each piece of evidence.

## 2. Why it matters — real-world applications

Sensor fusion is absolutely critical in any system that needs to know its position, orientation, or state accurately and reliably, especially when operating in dynamic or uncertain environments.

1.  **Aerospace Navigation and Control (Rockets, UAVs, Satellites):** A rocket needs to know its precise attitude (orientation in space) and velocity to stay on course. It combines data from Inertial Measurement Units (IMUs – accelerometers and gyroscopes), GPS receivers, star trackers, and magnetometers. IMUs provide high-frequency updates on changes in motion, but they drift. GPS provides absolute position but can be slow or blocked. Star trackers give very accurate attitude but are discrete and can be obscured. Sensor fusion, often using Kalman filters, combines these to provide a robust, highly accurate, and continuous estimate of the vehicle's state even if some sensors temporarily fail or are noisy. SpaceX's Falcon 9, for instance, relies heavily on advanced sensor fusion for its precision landing maneuvers.

2.  **Autonomous Vehicles (Self-Driving Cars, Robotics):** Self-driving cars need to build a detailed and reliable map of their surroundings and track their own position within it. They fuse data from cameras (identifying objects, lanes), LiDAR (precise distance and 3D mapping), radar (detecting objects and their velocity, especially in bad weather), and IMUs/GPS (own vehicle motion and position). A Kalman filter or its variants (Extended Kalman Filter, Unscented Kalman Filter) is often at the core of these systems, allowing the car to make robust decisions about navigation, obstacle avoidance, and path planning, even when individual sensors are imperfect or give conflicting information. Companies like Waymo and Tesla extensively use these techniques.

3.  **Consumer Electronics (Smartphones, Wearables):** Your smartphone uses sensor fusion to determine its orientation for screen rotation, augmented reality applications, and even step counting. It combines data from its accelerometer (detects gravity and motion), gyroscope (detects rotation), and magnetometer (detects magnetic north). A complementary filter is often sufficient for these applications due to its lower computational cost, providing a smooth and responsive user experience for things like gaming or compass apps. Fitness trackers use similar methods to estimate activity type and calorie burn.

4.  **Industrial Robotics and Manufacturing:** Robots in factories need to precisely know the position and orientation of their end-effectors (the "hands" of the robot) relative to workpieces. They might use encoders on joints (very accurate for relative position), vision systems (for absolute position relative to a workpiece), and force/torque sensors. Sensor fusion allows for more accurate manipulation, assembly, and quality control, enabling robots to perform delicate tasks with high repeatability and precision.

## 3. Prerequisites — what you must know first

To truly grasp sensor fusion, especially the Kalman filter, a solid foundation in several mathematical and scientific areas is essential. If any of these sound unfamiliar, it's highly recommended to pause and review them.

*   **Linear Algebra:** Understanding vectors, matrices, matrix multiplication, transpose, and matrix inversion is crucial for representing system states, transformations, and solving the equations of the Kalman filter.
*   **Probability and Statistics:** Concepts like mean, variance, covariance, standard deviation, Gaussian (normal) distribution, and basic understanding of conditional probability and Bayes' theorem are fundamental to understanding how uncertainty is modeled and propagated.
*   **Calculus:** Basic understanding of derivatives and integrals is helpful for continuous-time system models and understanding how angular rates integrate into angles, or accelerations into velocities and positions.
*   **Control Systems Basics:** Familiarity with concepts like system dynamics, state-space representation (how to describe a system's behavior mathematically), and feedback loops will provide context for why we need accurate state estimates.
*   **Digital Signal Processing (DSP):** Understanding sampling, discrete-time systems, and the basic principles of low-pass and high-pass filters is directly relevant to the complementary filter.
*   **Physics (Kinematics & Dynamics):** Knowledge of Newton's laws of motion, how acceleration relates to velocity and position, and basic rigid body dynamics (for attitude estimation) is necessary to build the system models used in filters.

## 4. The core idea — step by step

Let's break down the fundamental concepts behind sensor fusion, moving from the general problem to specific filter types.

### ### Step 1: The Problem of Imperfect Sensors

**Plain English:** No sensor is perfect. Every measurement device has limitations. Some are fast but drift or have random jitters (noise). Others are slow but very stable over long periods. If you rely on just one, you'll either get a shaky, unreliable picture or a slow, unresponsive one.

**Concrete Example:** Imagine you're trying to measure the pitch angle (forward/backward tilt) of a drone.
*   An **accelerometer** can measure the direction of gravity. When the drone is stationary, the accelerometer directly tells you the pitch angle relative to the ground. It's stable over time. However, if the drone accelerates (moves forward or backward), the accelerometer can't tell the difference between acceleration and gravity, so its pitch reading becomes temporarily inaccurate. It's also prone to high-frequency noise from vibrations.
*   A **gyroscope** measures angular velocity (how fast the drone is rotating). By integrating this rate over time, you can calculate the change in pitch angle. It's very responsive to quick movements and unaffected by linear acceleration. However, integration accumulates small errors over time, causing the estimated angle to "drift" further and further from the true value.

**Formal/Mathematical Version:** Each sensor $S_i$ provides an observation $z_i(t)$ which is a noisy version of the true state $x(t)$:
$$ z_i(t) = h_i(x(t)) + \nu_i(t) $$
where $h_i$ is the measurement function (how the sensor relates to the true state) and $\nu_i(t)$ is the sensor noise. The noise $\nu_i(t)$ typically has characteristics like a mean of zero, but a certain variance $\sigma_i^2$.

**What could go wrong:** Relying solely on an accelerometer for pitch will give you incorrect readings during maneuvers. Relying solely on a gyroscope will give you an angle that drifts away from the true angle over time, making your drone eventually fly sideways without knowing it.

### ### Step 2: Complementary Filter - Combining Strengths

**Plain English:** This filter is a clever way to combine two sensors where one excels at high-frequency changes (like a gyroscope for quick rotations) and the other provides stable, low-frequency information (like an accelerometer for long-term orientation relative to gravity). It essentially uses a "smart average" where the fast-reacting sensor's data is high-pass filtered (only quick changes get through) and the slow, stable sensor's data is low-pass filtered (only the long-term trend gets through). Then, these two filtered signals are added together.

**Concrete Example:** For our drone's pitch angle:
*   The gyroscope provides angular rate $\omega_z$. Integrating this gives us a pitch estimate that's good for quick changes but drifts: $\theta_{gyro}(t) = \int \omega_z(t) dt$.
*   The accelerometer provides a pitch estimate $\theta_{accel}$ (derived from its measurement of gravity). This is stable long-term but noisy and inaccurate during acceleration.
The complementary filter combines them:
We use the gyroscope's *change* in angle for the high-frequency part and the accelerometer's *absolute* angle for the low-frequency part.

**Formal/Mathematical Version (Discrete Time):**
Let $\hat{\theta}_{k-1}$ be the previous best estimate of the angle.
Let $\omega_z$ be the angular velocity measured by the gyroscope at time step $k$.
Let $\Delta t$ be the time elapsed between samples.
Let $\theta_{accel}$ be the angle derived from the accelerometer at time step $k$.
The complementary filter computes the current estimate $\hat{\theta}_k$ as:
$$ \hat{\theta}_k = (1 - \alpha) (\hat{\theta}_{k-1} + \omega_z \Delta t) + \alpha \theta_{accel} $$
Here, $\alpha$ is a constant between 0 and 1.
*   The term $(\hat{\theta}_{k-1} + \omega_z \Delta t)$ is the gyroscope-based prediction of the current angle. It's effectively high-pass filtered because it only considers the *change* from the previous state.
*   The term $\alpha \theta_{accel}$ is the accelerometer-based measurement. It's effectively low-pass filtered because the small $\alpha$ means it only slowly pulls the estimate towards the accelerometer reading, filtering out high-frequency noise.
The value of $\alpha$ determines the crossover frequency: a small $\alpha$ (e.g., 0.02) means more trust in the gyro for quick changes and slower correction from the accelerometer.

**What could go wrong:**
*   **Tuning $\alpha$ is empirical:** You pick a value by trial and error, or based on experience, not from an optimal mathematical derivation.
*   **Assumes specific noise characteristics:** It works well when one sensor has high-frequency noise/drift and the other has low-frequency noise/stability. If noise characteristics are more complex, it performs poorly.
*   **Not optimal:** It doesn't formally account for the statistical properties of the noise or the system dynamics, so it won't give the "best possible" estimate in a statistical sense.

### ### Step 3: Introduction to Kalman Filter - Optimal Estimation

**Plain English:** The Kalman filter is a much more advanced "predictor-corrector" system. It continuously tries to answer two questions: "Where do I think I am going?" (Prediction) and "How does what I just measured compare to my prediction?" (Update). It then intelligently combines its prediction with the new measurement, taking into account how confident it is in both its prediction and the measurement, to produce the absolute best possible estimate of the system's state. It's "optimal" in the sense that it minimizes the mean squared error of the estimate, assuming linear system dynamics and Gaussian noise.

**Concrete Example:** Imagine tracking a rocket.
*   **Prediction:** Based on the last known position, velocity, and the current engine thrust, the filter predicts where the rocket *should* be in the next moment. It also calculates how uncertain this prediction is (e.g., due to small variations in thrust or air resistance).
*   **Measurement:** A GPS receiver provides a new measurement of the rocket's position. This measurement is also noisy (GPS isn't perfectly accurate).
*   **Update:** The filter then compares its predicted position with the GPS measurement. If the prediction was very confident and the GPS measurement is very noisy, it will mostly trust its prediction. If the prediction was uncertain and the GPS is very accurate, it will trust the GPS more. It finds the optimal balance to produce the *best* new estimate of the rocket's position and velocity, and simultaneously reduces its uncertainty about this new estimate.

**Formal/Mathematical Version (High-Level):** The Kalman filter operates in a recursive two-step process:
1.  **Predict (Time Update):** Projects the current state estimate and its uncertainty forward in time.
    *   State prediction: $\hat{\mathbf{x}}_k^- = \mathbf{F}_k \hat{\mathbf{x}}_{k-1} + \mathbf{B}_k \mathbf{u}_k$
    *   Covariance prediction: $\mathbf{P}_k^- = \mathbf{F}_k \mathbf{P}_{k-1} \mathbf{F}_k^T + \mathbf{Q}_k$
2.  **Update (Measurement Update):** Incorporates a new measurement to refine the state estimate.
    *   Kalman Gain: $\mathbf{K}_k = \mathbf{P}_k^- \mathbf{H}_k^T (\mathbf{H}_k \mathbf{P}_k^- \mathbf{H}_k^T + \mathbf{R}_k)^{-1}$
    *   State update: $\hat{\mathbf{x}}_k = \hat{\mathbf{x}}_k^- + \mathbf{K}_k (\mathbf{z}_k - \mathbf{H}_k \hat{\mathbf{x}}_k^-)$
    *   Covariance update: $\mathbf{P}_k = (\mathbf{I} - \mathbf{K}_k \mathbf{H}_k) \mathbf{P}_k^-$
    (We will define these matrices in later steps).

**What could go wrong:** The Kalman filter requires accurate models of the system dynamics ($\mathbf{F}_k, \mathbf{B}_k$), how sensors relate to the state ($\mathbf{H}_k$), and the statistical properties of the process noise ($\mathbf{Q}_k$) and measurement noise ($\mathbf{R}_k$). If these models are inaccurate, the filter's performance degrades. It's also strictly optimal only for linear systems with Gaussian noise; for non-linear systems, variants like EKF or UKF are needed.

### ### Step 4: Kalman Filter - The Prediction Step (Time Update)

**Plain English:** This is where the filter uses its understanding of how the system *should* behave to forecast its next state. It takes the best estimate from the previous time step and projects it forward using the system's known physics or dynamics (e.g., "if it was here with this velocity, and this force was applied, it should be there next"). Crucially, it also predicts how much more uncertain it will be about this new prediction, because even perfect models have some inherent unpredictability (process noise).

**Concrete Example:** A simple 1D object moving with constant velocity.
*   **State:** We want to track its position ($p$) and velocity ($v$). So our state vector is $\mathbf{x} = \begin{bmatrix} p \\ v \end{bmatrix}$.
*   **Prediction:** If we know its current position $p_{k-1}$ and velocity $v_{k-1}$, and a time step $\Delta t$ passes, we predict its new position $p_k^-$ will be $p_{k-1} + v_{k-1}\Delta t$, and its new velocity $v_k^-$ will still be $v_{k-1}$.
*   **Uncertainty:** Even if we assume constant velocity, there might be small, unmodeled forces (e.g., air resistance, slight bumps) that introduce uncertainty into our velocity prediction. This uncertainty grows over time.

**Formal/Mathematical Version:**
Let $\hat{\mathbf{x}}_{k-1}$ be the *a posteriori* (after measurement) state estimate at time $k-1$.
Let $\mathbf{P}_{k-1}$ be the *a posteriori* error covariance matrix at time $k-1$.

The **prediction step** calculates the *a priori* (before measurement) state estimate $\hat{\mathbf{x}}_k^-$ and its error covariance $\mathbf{P}_k^-$ for time $k$:

1.  **Project the state estimate:**
    $$ \hat{\mathbf{x}}_k^- = \mathbf{F}_k \hat{\mathbf{x}}_{k-1} + \mathbf{B}_k \mathbf{u}_k $$
    *   $\hat{\mathbf{x}}_k^-$: The predicted state vector at time $k$.
    *   $\mathbf{F}_k$: The **state transition matrix** (or system matrix). It describes how the state evolves from $k-1$ to $k$ in the absence of external inputs. For a constant velocity model in 1D: $\mathbf{F}_k = \begin{bmatrix} 1 & \Delta t \\ 0 & 1 \end{bmatrix}$.
    *   $\hat{\mathbf{x}}_{k-1}$: The optimal state estimate from the previous time step.
    *   $\mathbf{B}_k$: The **control input matrix**. It describes how the control vector $\mathbf{u}_k$ affects the state. For our 1D example, if we have no control input, $\mathbf{B}_k \mathbf{u}_k$ would be $\mathbf{0}$. If we had an acceleration input $a_k$, then $\mathbf{B}_k \mathbf{u}_k = \begin{bmatrix} \frac{1}{2}\Delta t^2 \\ \Delta t \end{bmatrix} a_k$.
    *   $\mathbf{u}_k$: The control input vector (e.g., thrust, applied forces).

2.  **Project the error covariance:**
    $$ \mathbf{P}_k^- = \mathbf{F}_k \mathbf{P}_{k-1} \mathbf{F}_k^T + \mathbf{Q}_k $$
    *   $\mathbf{P}_k^-$: The predicted error covariance matrix at time $k$. This matrix represents the uncertainty in our state estimate. Larger values mean more uncertainty.
    *   $\mathbf{P}_{k-1}$: The previous *a posteriori* error covariance.
    *   $\mathbf{Q}_k$: The **process noise covariance matrix**. This accounts for the uncertainty in our system model itself – unmodeled disturbances, approximations in the dynamics, etc. It represents how much uncertainty is *added* to our state estimate by the system's evolution. It's usually a diagonal matrix where diagonal elements are variances of unmodeled accelerations/forces.

**What could go wrong:**
*   **Inaccurate $\mathbf{F}_k$ or $\mathbf{B}_k$:** If your system model doesn't accurately reflect the physics, your predictions will consistently be wrong.
*   **Incorrect $\mathbf{Q}_k$:** If $\mathbf{Q}_k$ is too small, the filter becomes overconfident in its predictions and may ignore measurements. If $\mathbf{Q}_k$ is too large, the filter is too uncertain and might become overly reliant on noisy measurements.

### ### Step 5: Kalman Filter - The Update Step (Measurement Update)

**Plain English:** Now we've made our prediction and know how uncertain it is. We then receive a new measurement from a sensor. The update step's job is to figure out how much to trust this new measurement compared to our prediction. It calculates a "Kalman Gain" which is essentially a weighting factor. This gain tells us how to optimally combine the prediction and the measurement to get a refined, more accurate estimate, and importantly, it also reduces our uncertainty about this new, improved estimate.

**Concrete Example:** Continuing with the 1D object.
*   **Prediction:** We predicted the object is at $p_k^-$ with a certain uncertainty $P_k^-$.
*   **Measurement:** A GPS sensor measures the object's position $z_k$. This GPS measurement also has its own noise, say $\sigma_{GPS}^2$.
*   **Update:**
    *   If our prediction was very confident (small $P_k^-$) and the GPS is very noisy (large $\sigma_{GPS}^2$), the Kalman Gain will be small, meaning we mostly stick to our prediction.
    *   If our prediction was very uncertain (large $P_k^-$) and the GPS is very accurate (small $\sigma_{GPS}^2$), the Kalman Gain will be large, meaning we adjust our estimate significantly towards the GPS reading.
    *   The new estimate $\hat{x}_k$ will be somewhere between the prediction and the measurement, weighted optimally. The uncertainty $P_k$ will be smaller than $P_k^-$ because we just got new information.

**Formal/Mathematical Version:**
Let $\hat{\mathbf{x}}_k^-$ be the *a priori* state estimate from the prediction step.
Let $\mathbf{P}_k^-$ be the *a priori* error covariance matrix from the prediction step.
Let $\mathbf{z}_k$ be the actual measurement from the sensor at time $k$.

The **update step** calculates the *a posteriori* state estimate $\hat{\mathbf{x}}_k$ and its error covariance $\mathbf{P}_k$ for time $k$:

1.  **Calculate the Kalman Gain:**
    $$ \mathbf{K}_k = \mathbf{P}_k^- \mathbf{H}_k^T (\mathbf{H}_k \mathbf{P}_k^- \mathbf{H}_k^T + \mathbf{R}_k)^{-1} $$
    *   $\mathbf{K}_k$: The **Kalman Gain matrix**. It determines how much the measurements influence the state estimate. It's a balance between the prediction's uncertainty ($\mathbf{P}_k^-$) and the measurement's uncertainty ($\mathbf{R}_k$).
    *   $\mathbf{H}_k$: The **measurement matrix**. It relates the state vector $\mathbf{x}_k$ to the measurement vector $\mathbf{z}_k$. It effectively tells us what the sensor *should* measure if the state were $\mathbf{x}_k$. For our 1D example, if we measure position, $\mathbf{H}_k = \begin{bmatrix} 1 & 0 \end{bmatrix}$.
    *   $\mathbf{R}_k$: The **measurement noise covariance matrix**. This accounts for the uncertainty in the sensor measurements themselves (e.g., GPS accuracy). It represents how much uncertainty is inherent in the measurement process.

2.  **Update the state estimate:**
    $$ \hat{\mathbf{x}}_k = \hat{\mathbf{x}}_k^- + \mathbf{K}_k (\mathbf{z}_k - \mathbf{H}_k \hat{\mathbf{x}}_k^-) $$
    *   $\hat{\mathbf{x}}_k$: The *a posteriori* (optimal) state estimate at time $k$.
    *   $(\mathbf{z}_k - \mathbf{H}_k \hat{\mathbf{x}}_k^-)$: This is the **measurement residual** or **innovation**. It's the difference between the actual measurement and what the filter *predicted* the measurement should be, based on its *a priori* state estimate.
    *   The Kalman Gain $\mathbf{K}_k$ scales this residual and adds it to the predicted state, correcting it.

3.  **Update the error covariance:**
    $$ \mathbf{P}_k = (\mathbf{I} - \mathbf{K}_k \mathbf{H}_k) \mathbf{P}_k^- $$
    *   $\mathbf{P}_k$: The *a posteriori* error covariance matrix at time $k$. This new covariance is always smaller than or equal to $\mathbf{P}_k^-$, reflecting the fact that incorporating a new measurement (even a noisy one) reduces our uncertainty about the state.
    *   $\mathbf{I}$: The identity matrix.

**What could go wrong:**
*   **Incorrect $\mathbf{H}_k$:** If your measurement model is wrong, the filter won't correctly interpret the sensor data.
*   **Incorrect $\mathbf{R}_k$:** If $\mathbf{R}_k$ is too small, the filter will trust noisy measurements too much, leading to a jumpy, overreactive estimate. If $\mathbf{R}_k$ is too large, the filter will ignore good measurements, making the estimate slow to respond or drift.
*   **Non-invertible $(\mathbf{H}_k \mathbf{P}_k^- \mathbf{H}_k^T + \mathbf{R}_k)$:** This can happen if your measurements are redundant or if $\mathbf{R}_k$ is poorly defined, leading to mathematical errors.

### ### Step 6: Complementary vs. Kalman Filter

**Plain English:** Think of it like this: A complementary filter is a simple, effective tool for a specific job – combining a fast, noisy signal with a slow, stable one. It's easy to implement and computationally cheap. The Kalman filter, on the other hand, is a general-purpose, high-precision instrument. It requires more setup (defining models for everything) and more computation, but it delivers the statistically best possible estimate under its assumptions.

**Concrete Example:**
*   **Complementary Filter:** Good for a hobby drone's attitude estimation where computational resources are limited, and you just need "good enough" performance for stable flight, not extreme precision. It's like using a simple proportional-integral (PI) controller.
*   **Kalman Filter:** Essential for a rocket's guidance system, where every millimeter and millisecond of accuracy matters for orbital insertion or precision landing. It's like using a full optimal controller (e.g., Linear Quadratic Regulator, LQR) which requires a precise state estimate.

**Formal/Mathematical Version:**
*   **Complementary Filter:** A fixed-gain linear filter. Its structure (LPF/HPF) is chosen heuristically, and the gain parameter $\alpha$ is tuned empirically. It's often a specific implementation of a first-order filter.
*   **Kalman Filter:** A recursive Bayesian estimator that provides the minimum mean square error (MMSE) estimate for linear systems with Gaussian process and measurement noise. Its gain ($\mathbf{K}_k$) is dynamically calculated at each step based on the system's current uncertainty and noise characteristics. It explicitly models the system dynamics and the sensor's relationship to the state.

**What could go wrong:**
*   **Using Complementary when optimality is critical:** If you need the absolute best estimate for a high-stakes application (like deep-space navigation), a complementary filter won't cut it.
*   **Using Kalman when simplicity and low computational cost are paramount:** For very simple applications or systems with extremely limited processing power, the overhead of a Kalman filter might be unnecessary and too expensive.
*   **Misapplying assumptions:** Assuming linearity and Gaussian noise for a complementary filter is often implicit and can lead to poor performance if violated. For a Kalman filter, these assumptions are explicit and fundamental to its optimality.

## 5. Worked examples — multiple, with every step shown

### Example 1: Complementary Filter for Pitch Angle Estimation

**Problem:** We want to estimate the pitch angle ($\theta$) of a small drone. We have a gyroscope that measures angular rate ($\omega_y$) around the y-axis (pitch rate) and an accelerometer that measures the components of gravity.
*   Gyroscope reading: $\omega_y = 0.5 \text{ rad/s}$
*   Accelerometer readings: $a_x = -0.1736 \text{ m/s}^2$, $a_z = 9.799 \text{ m/s}^2$ (assuming $g = 9.81 \text{ m/s}^2$)
*   Time step: $\Delta t = 0.01 \text{ s}$
*   Complementary filter gain: $\alpha = 0.05$
*   Initial estimated pitch angle: $\hat{\theta}_{k-1} = 0 \text{ rad}$

**What's given:** $\omega_y$, $a_x$, $a_z$, $\Delta t$, $\alpha$, $\hat{\theta}_{k-1}$.
**What we want:** The new estimated pitch angle $\hat{\theta}_k$.

**Steps:**

1.  **Calculate the accelerometer-derived pitch angle ($\theta_{accel}$):**
    The pitch angle from an accelerometer is typically calculated using the arctangent of the ratio of $a_x$ (x-acceleration) and $a_z$ (z-acceleration, which is mostly gravity) when the device is stationary or moving at constant velocity.
    $$ \theta_{accel} = \text{atan2}(-a_x, a_z) $$
    *   **Why this works:** When tilted by angle $\theta$, the gravity vector $\mathbf{g}$ has components $g_x = -g \sin\theta$ and $g_z = g \cos\theta$. So, $a_x = -g \sin\theta$ and $a_z = g \cos\theta$. Thus, $\frac{-a_x}{a_z} = \frac{g \sin\theta}{g \cos\theta} = \tan\theta$. `atan2` is used to handle all four quadrants correctly.
    $$ \theta_{accel} = \text{atan2}(-(-0.1736), 9.799) $$
    $$ \theta_{accel} = \text{atan2}(0.1736, 9.799) $$
    $$ \theta_{accel} \approx 0.0177 \text{ rad} $$
    *   **Why this works:** This is the pitch angle as measured by the accelerometer, which is stable over the long term but noisy and affected by linear acceleration.

2.  **Calculate the gyroscope-derived angle prediction:**
    The gyroscope measures angular *rate*. To get an angle, we integrate this rate over time. For a discrete step, we multiply the rate by the time step and add it to the previous angle estimate.
    $$ \theta_{gyro\_pred} = \hat{\theta}_{k-1} + \omega_y \Delta t $$
    *   **Why this works:** This uses the previous best estimate and adds the change in angle measured by the gyroscope. This part captures the high-frequency changes.
    $$ \theta_{gyro\_pred} = 0 \text{ rad} + (0.5 \text{ rad/s} \times 0.01 \text{ s}) $$
    $$ \theta_{gyro\_pred} = 0 + 0.005 \text{ rad} $$
    $$ \theta_{gyro\_pred} = 0.005 \text{ rad} $$

3.  **Apply the complementary filter formula:**
    $$ \hat{\theta}_k = (1 - \alpha) \theta_{gyro\_pred} + \alpha \theta_{accel} $$
    *   **Why this works:** This is the core of the complementary filter. It takes a weighted average. The $(1-\alpha)$ term gives weight to the gyroscope's prediction (high-pass part), and the $\alpha$ term gives weight to the accelerometer's measurement (low-pass part).
    $$ \hat{\theta}_k = (1 - 0.05) (0.005) + (0.05) (0.0177) $$
    $$ \hat{\theta}_k = (0.95) (0.005) + (0.05) (0.0177) $$
    $$ \hat{\theta}_k = 0.00475 + 0.000885 $$
    $$ \hat{\theta}_k = 0.005635 \text{ rad} $$

**Final Answer:**
$$ \boxed{\hat{\theta}_k \approx 0.0056 \text{ rad}} $$

**Reflection:** This example shows how the complementary filter gently nudges the gyroscope's estimate (which was $0.005 \text{ rad}$) towards the accelerometer's more stable but potentially noisy estimate ($0.0177 \text{ rad}$). Since $\alpha$ is small (0.05), the gyroscope's contribution dominates, but the accelerometer still provides a long-term correction. The value is slightly higher than the gyro-only prediction, indicating the accelerometer pulled it up a bit.

---

### Example 2: 1D Kalman Filter for Constant Velocity Object (Position Measurement)

**Problem:** A robot is moving in 1D. We want to estimate its position ($p$) and velocity ($v$). We assume constant velocity between measurements, but there's some process noise. We get noisy position measurements from a GPS.
*   Initial state estimate: $\hat{\mathbf{x}}_0 = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$ (position 0, velocity 0)
*   Initial error covariance: $\mathbf{P}_0 = \begin{bmatrix} 10 & 0 \\ 0 & 10 \end{bmatrix}$ (high uncertainty in initial state)
*   Time step: $\Delta t = 1 \text{ s}$
*   Process noise covariance: $\mathbf{Q} = \begin{bmatrix} 0.01 & 0 \\ 0 & 0.01 \end{bmatrix}$ (small uncertainty added by model)
*   Measurement noise covariance: $\mathbf{R} = \begin{bmatrix} 0.1 \end{bmatrix}$ (GPS position measurement noise variance)
*   Control input: $\mathbf{u}_k = 0$ (no external control force)
*   Measurement at $k=1$: $\mathbf{z}_1 = \begin{bmatrix} 1.2 \end{bmatrix}$ (GPS reports position 1.2m)

**What's given:** $\hat{\mathbf{x}}_0$, $\mathbf{P}_0$, $\Delta t$, $\mathbf{Q}$, $\mathbf{R}$, $\mathbf{u}_k$, $\mathbf{z}_1$.
**What we want:** The updated state estimate $\hat{\mathbf{x}}_1$ and its covariance $\mathbf{P}_1$.

**System Matrices Setup:**
*   **State vector:** $\mathbf{x}_k = \begin{bmatrix} p_k \\ v_k \end{bmatrix}$
*   **State transition matrix $\mathbf{F}_k$ (from $p_{k-1}, v_{k-1}$ to $p_k, v_k$):**
    $p_k = p_{k-1} + v_{k-1}\Delta t$
    $v_k = v_{k-1}$
    So, $\mathbf{F}_k = \begin{bmatrix} 1 & \Delta t \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}$
*   **Control input matrix $\mathbf{B}_k$:** Since $\mathbf{u}_k=0$, we can ignore this term or set $\mathbf{B}_k = \mathbf{0}$.
*   **Measurement matrix $\mathbf{H}_k$ (we measure position only):**
    $z_k = p_k$
    So, $\mathbf{H}_k = \begin{bmatrix} 1 & 0 \end{bmatrix}$

**Steps (for $k=1$):**

**A. Prediction Step:**

1.  **Predict the state estimate ($\hat{\mathbf{x}}_1^-$):**
    $$ \hat{\mathbf{x}}_1^- = \mathbf{F}_1 \hat{\mathbf{x}}_0 + \mathbf{B}_1 \mathbf{u}_1 $$
    *   **Why this works:** We project the previous best estimate forward in time using our system model.
    $$ \hat{\mathbf{x}}_1^- = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 0 \\ 0 \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \end{bmatrix} $$
    $$ \hat{\mathbf{x}}_1^- = \begin{bmatrix} (1 \times 0) + (1 \times 0) \\ (0 \times 0) + (1 \times 0) \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix} $$
    *   **Interpretation:** Our prediction is that the robot is still at position 0 with velocity 0, because our initial estimate was 0, and we have no control input.

2.  **Predict the error covariance ($\mathbf{P}_1^-$):**
    $$ \mathbf{P}_1^- = \mathbf{F}_1 \mathbf{P}_0 \mathbf{F}_1^T + \mathbf{Q}_1 $$
    *   **Why this works:** We propagate the uncertainty from the previous step and add the uncertainty introduced by the system model itself (process noise).
    First, calculate $\mathbf{F}_1 \mathbf{P}_0$:
    $$ \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 10 & 0 \\ 0 & 10 \end{bmatrix} = \begin{bmatrix} (1 \times 10) + (1 \times 0) & (1 \times 0) + (1 \times 10) \\ (0 \times 10) + (1 \times 0) & (0 \times 0) + (1 \times 10) \end{bmatrix} = \begin{bmatrix} 10 & 10 \\ 0 & 10 \end{bmatrix} $$
    Next, calculate $(\mathbf{F}_1 \mathbf{P}_0) \mathbf{F}_1^T$:
    $$ \mathbf{F}_1^T = \begin{bmatrix} 1 & 0 \\ 1 & 1 \end{bmatrix} $$
    $$ \begin{bmatrix} 10 & 10 \\ 0 & 10 \end{bmatrix} \begin{bmatrix} 1 & 0 \\ 1 & 1 \end{bmatrix} = \begin{bmatrix} (10 \times 1) + (10 \times 1) & (10 \times 0) + (10 \times 1) \\ (0 \times 1) + (10 \times 1) & (0 \times 0) + (10 \times 1) \end{bmatrix} = \begin{bmatrix} 20 & 10 \\ 10 & 10 \end{bmatrix} $$
    Finally, add $\mathbf{Q}_1$:
    $$ \mathbf{P}_1^- = \begin{bmatrix} 20 & 10 \\ 10 & 10 \end{bmatrix} + \begin{bmatrix} 0.01 & 0 \\ 0 & 0.01 \end{bmatrix} = \begin{bmatrix} 20.01 & 10 \\ 10 & 10.01 \end{bmatrix} $$
    *   **Interpretation:** The uncertainty in position and velocity has increased, and now there's a covariance between them (10), meaning if position estimate is high, velocity estimate is also likely high.

**B. Update Step:**

1.  **Calculate the Kalman Gain ($\mathbf{K}_1$):**
    $$ \mathbf{K}_1 = \mathbf{P}_1^- \mathbf{H}_1^T (\mathbf{H}_1 \mathbf{P}_1^- \mathbf{H}_1^T + \mathbf{R}_1)^{-1} $$
    *   **Why this works:** The Kalman gain optimally weights the measurement and prediction.
    First, calculate $\mathbf{H}_1 \mathbf{P}_1^-$:
    $$ \begin{bmatrix} 1 & 0 \end{bmatrix} \begin{bmatrix} 20.01 & 10 \\ 10 & 10.01 \end{bmatrix} = \begin{bmatrix} 20.01 & 10 \end{bmatrix} $$
    Next, calculate $(\mathbf{H}_1 \mathbf{P}_1^-) \mathbf{H}_1^T$:
    $$ \begin{bmatrix} 20.01 & 10 \end{bmatrix} \begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix} 20.01 \end{bmatrix} $$
    Then, add $\mathbf{R}_1$:
    $$ \begin{bmatrix} 20.01 \end{bmatrix} + \begin{bmatrix} 0.1 \end{bmatrix} = \begin{bmatrix} 20.11 \end{bmatrix} $$
    Now, take the inverse:
    $$ (\mathbf{H}_1 \mathbf{P}_1^- \mathbf{H}_1^T + \mathbf{R}_1)^{-1} = \begin{bmatrix} 20.11 \end{bmatrix}^{-1} = \begin{bmatrix} \frac{1}{20.11} \end{bmatrix} \approx \begin{bmatrix} 0.0497 \end{bmatrix} $$
    Finally, calculate $\mathbf{K}_1 = \mathbf{P}_1^- \mathbf{H}_1^T (\ldots)^{-1}$:
    $$ \mathbf{P}_1^- \mathbf{H}_1^T = \begin{bmatrix} 20.01 & 10 \\ 10 & 10.01 \end{bmatrix} \begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix} 20.01 \\ 10 \end{bmatrix} $$
    $$ \mathbf{K}_1 = \begin{bmatrix} 20.01 \\ 10 \end{bmatrix} \begin{bmatrix} 0.0497 \end{bmatrix} = \begin{bmatrix} 20.01 \times 0.0497 \\ 10 \times 0.0497 \end{bmatrix} \approx \begin{bmatrix} 0.9945 \\ 0.4970 \end{bmatrix} $$
    *   **Interpretation:** The Kalman gain values are close to 1 for position and 0.5 for velocity. This means the filter will heavily adjust the position estimate towards the measurement, and also significantly adjust the velocity estimate.

2.  **Update the state estimate ($\hat{\mathbf{x}}_1$):**
    $$ \hat{\mathbf{x}}_1 = \hat{\mathbf{x}}_1^- + \mathbf{K}_1 (\mathbf{z}_1 - \mathbf{H}_1 \hat{\mathbf{x}}_1^-) $$
    *   **Why this works:** We correct our prediction using the new measurement, scaled by the Kalman gain.
    First, calculate the innovation $(\mathbf{z}_1 - \mathbf{H}_1 \hat{\mathbf{x}}_1^-)$:
    $$ \mathbf{H}_1 \hat{\mathbf{x}}_1^- = \begin{bmatrix} 1 & 0 \end{bmatrix} \begin{bmatrix} 0 \\ 0 \end{bmatrix} = \begin{bmatrix} 0 \end{bmatrix} $$
    $$ \mathbf{z}_1 - \mathbf{H}_1 \hat{\mathbf{x}}_1^- = \begin{bmatrix} 1.2 \end{bmatrix} - \begin{bmatrix} 0 \end{bmatrix} = \begin{bmatrix} 1.2 \end{bmatrix} $$
    Now, update the state:
    $$ \hat{\mathbf{x}}_1 = \begin{bmatrix} 0 \\ 0 \end{bmatrix} + \begin{bmatrix} 0.9945 \\ 0.4970 \end{bmatrix} \begin{bmatrix} 1.2 \end{bmatrix} $$
    $$ \hat{\mathbf{x}}_1 = \begin{bmatrix} 0 \\ 0 \end{bmatrix} + \begin{bmatrix} 0.9945 \times 1.2 \\ 0.4970 \times 1.2 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix} + \begin{bmatrix} 1.1934 \\ 0.5964 \end{bmatrix} $$
    $$ \hat{\mathbf{x}}_1 = \begin{bmatrix} 1.1934 \\ 0.5964 \end{bmatrix} $$
    *   **Interpretation:** The filter estimates the robot is at position $1.1934 \text{ m}$ and has a velocity of $0.5964 \text{ m/s}$. The position estimate is very close to the measurement of $1.2 \text{ m}$ because our initial prediction was very uncertain. The velocity estimate is non-zero, inferred from the change in position.

3.  **Update the error covariance ($\mathbf{P}_1$):**
    $$ \mathbf{P}_1 = (\mathbf{I} - \mathbf{K}_1 \mathbf{H}_1) \mathbf{P}_1^- $$
    *   **Why this works:** Incorporating the measurement reduces our uncertainty.
    First, calculate $\mathbf{K}_1 \mathbf{H}_1$:
    $$ \begin{bmatrix} 0.9945 \\ 0.4970 \end{bmatrix} \begin{bmatrix} 1 & 0 \end{bmatrix} = \begin{bmatrix} 0.9945 & 0 \\ 0.4970 & 0 \end{bmatrix} $$
    Next, calculate $(\mathbf{I} - \mathbf{K}_1 \mathbf{H}_1)$:
    $$ \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} - \begin{bmatrix} 0.9945 & 0 \\ 0.4970 & 0 \end{bmatrix} = \begin{bmatrix} 1 - 0.9945 & 0 - 0 \\ 0 - 0.4970 & 1 - 0 \end{bmatrix} = \begin{bmatrix} 0.0055 & 0 \\ -0.4970 & 1 \end{bmatrix} $$
    Finally, calculate $\mathbf{P}_1$:
    $$ \mathbf{P}_1 = \begin{bmatrix} 0.0055 & 0 \\ -0.4970 & 1 \end{bmatrix} \begin{bmatrix} 20.01 & 10 \\ 10 & 10.01 \end{bmatrix} $$
    $$ \mathbf{P}_1 = \begin{bmatrix} (0.0055 \times 20.01) + (0 \times 10) & (0.0055 \times 10) + (0 \times 10.01) \\ (-0.4970 \times 20.01) + (1 \times 10) & (-0.4970 \times 10) + (1 \times 10.01) \end{bmatrix} $$
    $$ \mathbf{P}_1 \approx \begin{bmatrix} 0.1100 & 0.0550 \\ -9.9050 + 10 & -4.9700 + 10.01 \end{bmatrix} $$
    $$ \mathbf{P}_1 \approx \begin{bmatrix} 0.1100 & 0.0550 \\ 0.0950 & 5.0400 \end{bmatrix} $$
    (Note: Due to rounding, off-diagonal elements might not be perfectly symmetric. In practice, $\mathbf{P}_k$ should be symmetric. Using more precision would yield a more symmetric result.)

**Final Answer:**
$$ \boxed{\hat{\mathbf{x}}_1 = \begin{bmatrix} 1.1934 \\ 0.5964 \end{bmatrix}, \quad \mathbf{P}_1 \approx \begin{bmatrix} 0.1100 & 0.0550 \\ 0.0950 & 5.0400 \end{bmatrix}} $$

**Reflection:** This example demonstrates the core Kalman filter cycle. The initial high uncertainty in $\mathbf{P}_0$ meant the filter was very open to the first measurement. The measurement pulled the position estimate significantly from 0 to 1.1934. Crucially, even though we only measured position, the filter *inferred* a velocity of $0.5964 \text{ m/s}$ because the position changed from 0 to 1.2 over 1 second. The uncertainty in position dropped drastically (from 20.01 to 0.11), while the uncertainty in velocity also decreased but is still higher (5.04).

---

### Example 3: 2D Kalman Filter for Constant Acceleration Object (Position Measurement)

**Problem:** A projectile is launched in 2D (x, y plane) under constant gravity (acting in -y direction). We want to estimate its position and velocity in both dimensions. We get noisy position measurements from a radar.
*   State vector: $\mathbf{x}_k = \begin{bmatrix} p_x \\ v_x \\ p_y \\ v_y \end{bmatrix}$ (position x, velocity x, position y, velocity y)
*   Initial state estimate: $\hat{\mathbf{x}}_0 = \begin{bmatrix} 0 \\ 10 \\ 0 \\ 15 \end{bmatrix}$ (initial launch from (0,0) with $v_x=10, v_y=15$)
*   Initial error covariance: $\mathbf{P}_0 = \text{diag}([1, 1, 1, 1])$ (small initial uncertainty)
*   Time step: $\Delta t = 0.1 \text{ s}$
*   Process noise covariance: $\mathbf{Q} = \text{diag}([0.001, 0.001, 0.001, 0.001])$
*   Measurement noise covariance: $\mathbf{R} = \text{diag}([0.5, 0.5])$ (radar measures x, y position with variance 0.5 each)
*   Control input: Constant acceleration due to gravity $a_y = -9.81 \text{ m/s}^2$. So, $\mathbf{u}_k = \begin{bmatrix} 0 \\ -9.81 \end{bmatrix}$
*   Measurement at $k=1$: $\mathbf{z}_1 = \begin{bmatrix} 0.9 \\ 1.4 \end{bmatrix}$ (radar reports position (0.9, 1.4))

**What's given:** $\hat{\mathbf{x}}_0$, $\mathbf{P}_0$, $\Delta t$, $\mathbf{Q}$, $\mathbf{R}$, $\mathbf{u}_k$, $\mathbf{z}_1$.
**What we want:** The updated state estimate $\hat{\mathbf{x}}_1$ and its covariance $\mathbf{P}_1$.

**System Matrices Setup:**
*   **State Transition Matrix $\mathbf{F}_k$:**
    $p_x(k) = p_x(k-1) + v_x(k-1)\Delta t$
    $v_x(k) = v_x(k-1)$
    $p_y(k) = p_y(k-1) + v_y(k-1)\Delta t$
    $v_y(k) = v_y(k-1)$
    $$ \mathbf{F}_k = \begin{bmatrix} 1 & \Delta t & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & \Delta t \\ 0 & 0 & 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 0.1 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0.1 \\ 0 & 0 & 0 & 1 \end{bmatrix} $$
*   **Control Input Matrix $\mathbf{B}_k$ and Control Vector $\mathbf{u}_k$:**
    $p_x(k) = p_x(k-1) + v_x(k-1)\Delta t + \frac{1}{2}a_x\Delta t^2$
    $v_x(k) = v_x(k-1) + a_x\Delta t$
    $p_y(k) = p_y(k-1) + v_y(k-1)\Delta t + \frac{1}{2}a_y\Delta t^2$
    $v_y(k) = v_y(k-1) + a_y\Delta t$
    We have $a_x = 0$, $a_y = -9.81$.
    $$ \mathbf{B}_k = \begin{bmatrix} \frac{1}{2}\Delta t^2 & 0 \\ \Delta t & 0 \\ 0 & \frac{1}{2}\Delta t^2 \\ 0 & \Delta t \end{bmatrix} = \begin{bmatrix} 0.005 & 0 \\ 0.1 & 0 \\ 0 & 0.005 \\ 0 & 0.1 \end{bmatrix}, \quad \mathbf{u}_k = \begin{bmatrix} 0 \\ -9.81 \end{bmatrix} $$
*   **Measurement Matrix $\mathbf{H}_k$ (we measure $p_x, p_y$):**
    $z_x = p_x$
    $z_y = p_y$
    $$ \mathbf{H}_k = \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 0 & 1 & 0 \end{bmatrix} $$

**Steps (for $k=1$):**

**A. Prediction Step:**

1.  **Predict the state estimate ($\hat{\mathbf{x}}_1^-$):**
    $$ \hat{\mathbf{x}}_1^- = \mathbf{F}_1 \hat{\mathbf{x}}_0 + \mathbf{B}_1 \mathbf{u}_1 $$
    *   **Why this works:** Projecting the initial state forward using the system dynamics and control input.
    $$ \mathbf{F}_1 \hat{\mathbf{x}}_0 = \begin{bmatrix} 1 & 0.1 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0.1 \\ 0 & 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 0 \\ 10 \\ 0 \\ 15 \end{bmatrix} = \begin{bmatrix} 0 + 0.1 \times 10 + 0 + 0 \\ 0 + 1 \times 10 + 0 + 0 \\ 0 + 0 + 0 + 0.1 \times 15 \\ 0 + 0 + 0 + 1 \times 15 \end{bmatrix} = \begin{bmatrix} 1 \\ 10 \\ 1.5 \\ 15 \end{bmatrix} $$
    $$ \mathbf{B}_1 \mathbf{u}_1 = \begin{bmatrix} 0.005 & 0 \\ 0.1 & 0 \\ 0 & 0.005 \\ 0 & 0.1 \end{bmatrix} \begin{bmatrix} 0 \\ -9.81 \end{bmatrix} = \begin