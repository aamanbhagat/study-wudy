## What it is
Sensor fusion is the process of combining data from multiple, often imperfect, sensors to produce a state estimate that is more accurate, complete, or dependable than what could be determined from any single sensor alone. The complementary filter is a simple, frequency-based method for this, while the Kalman filter is an optimal, recursive algorithm that uses a system model and statistical noise information to compute the most likely state.

## Why it matters
In aerospace, your Inertial Measurement Unit (IMU) is the heart of your GNC system. A gyroscope gives you high-frequency orientation data but drifts over time; an accelerometer gives you a low-frequency, stable gravity vector but is noisy. Fusing them is non-negotiable for determining a rocket's or satellite's attitude. Kalman filters are the gold standard for navigation, from the Apollo missions' Command Module computer to modern GPS receivers and drone flight controllers.

## When to study it
Before tackling this, you must have a solid grasp of:
1.  **Linear Algebra:** Matrix multiplication, inversion, and transposition are the language of the Kalman filter.
2.  **Probability & Statistics:** You must understand Gaussian (normal) distributions, mean, variance, and covariance. The Kalman filter is fundamentally a probabilistic tool.
3.  **State-Space Representation:** You need to be comfortable with modeling a dynamic system using state vectors and matrices, i.e., equations of the form $\dot{\mathbf{x}} = A\mathbf{x} + B\mathbf{u}$.
4.  **Basic Control Theory:** Understanding concepts like system state, process models, and measurements is essential.

If these are not solid, pause and review them. You cannot derive or understand the Kalman filter without them.

## How to study it (step by step)
1.  **Model the problem:** Consider a simple IMU. Write down the equations for attitude estimation. An angle $\theta$ is the integral of the angular rate $\omega$ from a gyroscope: $\theta(t) = \int_0^t \omega_{gyro}(\tau) d\tau$. An accelerometer measures the gravity vector, giving an angle estimate $\theta_{accel} = \text{atan2}(a_y, a_z)$. Identify the weakness of each: the gyro integral drifts, and the accel is noisy and only works when the vehicle isn't accelerating.
2.  **Derive the Complementary Filter:** Realize the gyro is good for high-frequency changes, and the accel is good for the low-frequency (DC) level. In the frequency domain, this suggests a high-pass filter for the gyro data and a low-pass filter for the accel data. Combine them: $\theta_{est} = \alpha (\theta_{prev} + \omega_{gyro} \Delta t) + (1-\alpha) \theta_{accel}$. Derive the relationship between the filter constant $\alpha$ and the time constant $\tau$ of the underlying RC filters: $\alpha = \frac{\tau}{\tau + \Delta t}$.
3.  **Frame the Kalman Problem:** Re-frame the goal. We don't want a heuristic filter; we want the *optimal* one. The "state" is what we want to know (e.g., position, velocity). We have a *process model* that predicts how the state evolves (physics) and a *measurement model* that relates the state to what a sensor reads. Both are corrupted by noise, which we model as zero-mean Gaussian noise.
4.  **Trace the Kalman Cycle:** Walk through the two steps of the Kalman filter conceptually, without equations.
    *   **Predict:** Use your physics model to predict where the state will be at the next timestep. Since the model isn't perfect, your uncertainty (covariance) will grow.
    *   **Update:** Get a new measurement from a sensor. Compare this to your prediction. The difference is the "innovation" or "residual". Use this difference to correct your predicted state. The amount of correction depends on a calculated "Kalman Gain," which weighs the prediction's uncertainty against the measurement's uncertainty. Your final uncertainty will be smaller than it was before the measurement.
5.  **Derive the Kalman Gain (1D case):** For a single state variable $x$, assume your prediction gives a Gaussian belief $N(\hat{x}_{pred}, \sigma^2_{pred})$ and your measurement gives a likelihood $N(z, \sigma^2_{meas})$. The updated belief is the product of these two Gaussians. Prove that the product of two Gaussians is another Gaussian. Find the mean and variance of this new Gaussian. The new mean will be a weighted average of $\hat{x}_{pred}$ and $z$, where the weights are functions of the variances. This weighting term is the Kalman Gain $K$.

## Key ideas, with intuition
1.  **Complementary Nature of Sensors:** No single sensor is perfect. The key is to fuse sensors whose failure modes are *complementary*. A gyro has low short-term noise but high long-term drift. An accelerometer has high short-term noise but zero long-term drift (in a static case). The complementary filter literally combines a high-pass filtered gyro signal (rejecting the low-frequency drift) with a low-pass filtered accelerometer signal (rejecting the high-frequency noise).

2.  **State as a Probability Distribution:** The Kalman filter does not just track a single value for the state (e.g., altitude = 1000m). It tracks a *probability distribution* for the state, which is assumed to be Gaussian. The state estimate $\hat{\mathbf{x}}$ is the mean of this distribution, and the covariance matrix $P$ represents its uncertainty. A large diagonal element in $P$ means high uncertainty in that state variable.

3.  **The Predict-Update Cycle:** The filter lives in a two-stroke cycle.
    *   **Predict:** You use your system model (e.g., kinematics) to project your current state and its uncertainty forward in time. This is your "prior" belief before seeing new evidence. Physics says if I'm at $x_0$ with velocity $v_0$, I'll be at $x_0 + v_0\Delta t$ next. My uncertainty grows because my model of physics isn't perfect (e.g., unmodeled drag).
        $$ \hat{\mathbf{x}}_{k|k-1} = A \hat{\mathbf{x}}_{k-1|k-1} \quad \text{(Predict state)} $$
        $$ P_{k|k-1} = A P_{k-1|k-1} A^T + Q \quad \text{(Predict covariance)}$$
    *   **Update:** You get a new measurement. This is new evidence. You combine your prior belief with this evidence using Bayes' rule. The result is your "posterior" belief, which is more certain than before. The Kalman Gain $K$ is the blending factor that decides how much you trust the new measurement versus your prediction. If the sensor is very accurate ($R$ is small), $K$ is large, and you trust the measurement more. If your prediction is very accurate ($P$ is small), $K$ is small, and you stick closer to your prediction.
        $$ \hat{\mathbf{x}}_{k|k} = \hat{\mathbf{x}}_{k|k-1} + K_k (\mathbf{z}_k - H \hat{\mathbf{x}}_{k|k-1}) \quad \text{(Update state)} $$
        $$ P_{k|k} = (I - K_k H) P_{k|k-1} \quad \text{(Update covariance)} $$

## Worked example
**Problem:** Estimate the altitude of a rocket in 1D. Our state is just altitude $x$. We have a simple model that it has a constant vertical velocity of $v=50 \text{ m/s}$. The process is measured every second ($\Delta t=1$). Our altimeter is noisy.

**Setup:**
*   State vector: $\mathbf{x} = [x]$ (just altitude)
*   Initial state estimate: $\hat{x}_{k-1} = 0 \text{ m}$
*   Initial uncertainty (variance): $P_{k-1} = 500 \text{ m}^2$
*   Process model: $x_k = x_{k-1} + v \Delta t$. In matrix form, $A=1$, $B= \Delta t = 1$, $u=v=50$. So, $\hat{x}_k = \hat{x}_{k-1} + 50$.
*   Process noise covariance $Q$: Let's say our velocity model has some uncertainty, $Q = 0.1 \text{ m}^2$.
*   Measurement model: Our altimeter measures altitude directly. So, $H=1$.
*   Measurement noise covariance $R$: The altimeter spec sheet says its variance is $R = 4 \text{ m}^2$.
*   First measurement: At $k=1$, the altimeter reads $z_1 = 55 \text{ m}$.

**Steps:**

1.  **Predict Step:**
    *   Predict the next state based on the model:
        $$ \hat{x}_{k|k-1} = A \hat{x}_{k-1|k-1} + B u_{k-1} = 1 \cdot 0 + 1 \cdot 50 = 50 \text{ m} $$
    *   Predict the uncertainty (it grows):
        $$ P_{k|k-1} = A P_{k-1|k-1} A^T + Q = 1 \cdot 500 \cdot 1^T + 0.1 = 500.1 \text{ m}^2 $$
    *   *Reflection:* Our best guess is 50 m, but we're very uncertain about it.

2.  **Update Step:**
    *   Calculate the Kalman Gain $K_k$. This decides how much to trust the measurement.
        $$ K_k = \frac{P_{k|k-1} H^T}{H P_{k|k-1} H^T + R} = \frac{500.1 \cdot 1}{1 \cdot 500.1 \cdot 1 + 4} = \frac{500.1}{504.1} \approx 0.992 $$
    *   *Reflection:* The gain is very close to 1. This is because our prediction was highly uncertain ($P=500.1$) while our measurement was quite certain ($R=4$). The filter chooses to trust the measurement almost completely.
    *   Update the state estimate with the measurement $z_1 = 55 \text{ m}$.
        $$ \hat{x}_{k|k} = \hat{x}_{k|k-1} + K_k (z_k - H \hat{x}_{k|k-1}) = 50 + 0.992 (55 - 1 \cdot 50) = 50 + 0.992(5) \approx 54.96 \text{ m} $$
    *   *Reflection:* Our new estimate is pulled from our prediction (50 m) very close to the measurement (55 m), which makes sense given the high gain.
    *   Update the uncertainty (it shrinks).
        $$ P_{k|k} = (I - K_k H) P_{k|k-1} = (1 - 0.992 \cdot 1) \cdot 500.1 = 0.008 \cdot 500.1 \approx 4.0 \text{ m}^2 $$
    *   *Reflection:* Our uncertainty has collapsed from 500.1 m$^2$ to just 4.0 m$^2$. We are now much more certain about the rocket's altitude. This new state $(\hat{x}_{k|k}, P_{k|k})$ becomes the input for the next cycle.

## Diagrams
A complementary filter block diagram:
```text
                  +-------+
Gyro rate (w) --> | ∫ dt  | --+--> High-pass Filter --+
                  +-------+   |                       |
                              |                       V      +---+
                              +--------------------->(+)----> | θ | (Fused Angle)
                                                      ^      +---+
                                                      |
Accelerometer (a) -> atan2(ax,ay) -> Low-pass Filter --+

```

The Kalman filter recursive cycle:
```text
      +-----------------------------------------------------+
      |                                                     |
      |   +-----------------+      +--------------------+   |
      +-->|   Predict Step  |----->|    Update Step     |---+
          | using model     |      | using measurement  |
          | (A, B, Q)       |      | (H, R, z)          |
          |                 |      |                    |
          | x_hat_k|k-1     |      | x_hat_k|k          |
          | P_k|k-1         |      | P_k|k              |
          +-----------------+      +--------------------+
               ^                                |
               |                                |
               +---- (Previous State Estimate) -+
```

## Memory technique — remember this forever
1.  **Mnemonic:** The "Skeptical Physicist".
    *   The filter is a physicist. It **PREDICTS** where an object will go using a physics model ($A, B$). Because the model isn't perfect, it becomes less certain (covariance $P$ grows).
    *   Then, a noisy intern (the sensor) shouts a **MEASUREMENT** ($z$).
    *   The physicist is skeptical. It calculates a "skepticism" value called the Kalman Gain ($K$). If the intern is usually reliable (low sensor noise $R$), the skepticism is low (high $K$). If the physicist's own prediction was already very certain (low $P$), skepticism is high (low $K$).
    *   Finally, it **UPDATES** its belief, moving it slightly from its prediction toward the intern's measurement. The final belief is more certain than either was alone.

2.  **Formulas to Overlearn:**
    *   State Update: $\hat{\mathbf{x}}_{k|k} = \hat{\mathbf{x}}_{k|k-1} + K_k (\mathbf{z}_k - H \hat{\mathbf{x}}_{k|k-1})$
    *   Kalman Gain: $K_k = P_{k|k-1} H^T (H P_{k|k-1} H^T + R)^{-1}$
    *   Covariance Update: $P_{k|k} = (I - K_k H) P_{k|k-1}$

3.  **Spaced Repetition Schedule:** Review this material and re-derive the 1D Kalman gain at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, remember this: the Kalman filter update is just finding the most probable state given two pieces of information: your prediction, and your measurement. Model both as Gaussian distributions. The updated state is the mean of the Gaussian you get by *multiplying* those two probability density functions together. All the equations are just the result of carrying out that multiplication.

## Common mistakes
1.  **Confusing Process Noise ($Q$) and Measurement Noise ($R$):** $Q$ is how bad your *model* is. If your rocket's thrust is unpredictable, $Q$ is high. $R$ is how bad your *sensor* is. If you have a cheap, noisy altimeter, $R$ is high. Setting $Q=0$ means you believe your physics model is perfect, which is never true.
2.  **Tuning by Guessing:** If your filter output is very laggy and slow to respond to measurements, you are trusting your model too much. Your Kalman gain is too low. This means you've set $R$ too high or $Q$ too low. Conversely, if the output is noisy and jumps around with every measurement, you are trusting the sensor too much. You've set $R$ too low or $Q$ too high.
3.  **Applying to a Nonlinear System:** The standard Kalman filter equations shown here *only* work for linear systems ($\dot{\mathbf{x}} = A\mathbf{x}$). For a real rocket with nonlinear dynamics (e.g., trigonometric functions in attitude, drag as $v^2$), you must use a variant like the Extended Kalman Filter (EKF) or Unscented Kalman Filter (UKF), which linearize the system at each timestep.

## Self-check
1.  A simple complementary filter is used to estimate pitch angle from a gyro and an accelerometer. What happens to the long-term accuracy of the angle estimate if the aircraft enters a sustained, coordinated turn where it experiences a constant 1.5g acceleration?
2.  In the 1D Kalman filter, you have a very, very precise sensor, so its measurement noise variance $R \to 0$. What does the Kalman Gain $K$ approach? What does this imply about your updated state estimate $\hat{x}_{k|k}$?
3.  Given the state update equation $\hat{\mathbf{x}}_{k|k} = \hat{\mathbf{x}}_{k|k-1} + K_k (\mathbf{z}_k - H \hat{\mathbf{x}}_{k|k-1})$, show that the estimation error covariance $P_{k|k} = E[(\mathbf{x}_k - \hat{\mathbf{x}}_{k|k})(\mathbf{x}_k - \hat{\mathbf{x}}_{k|k})^T]$ simplifies to the famous Joseph form of the covariance update: $P_{k|k} = (I - K_k H) P_{k|k-1} (I - K_k H)^T + K_k R K_k^T$.