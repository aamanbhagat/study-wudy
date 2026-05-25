## 1. What it is — in plain English

Imagine you're trying to track a frisky puppy running around a park. You can't see it perfectly clearly; sometimes a tree blocks your view, or it moves too fast. You have two sources of information:

1.  **Your best guess of where it *should* be:** Based on where it was a moment ago and how you expect it to move (e.g., "it usually runs straight for a bit, then turns left"). This is your *prediction*.
2.  **An actual, albeit fuzzy, sighting:** You glimpse it through the leaves. This is your *measurement*.

Both your prediction and your measurement are imperfect. Your prediction might be off because the puppy decided to zig-zag. Your measurement might be off because you only saw a blurry outline.

The Kalman filter is like a super-smart detective that takes these two imperfect pieces of information – your prediction and your measurement – and blends them together in the *best possible way* to figure out the puppy's true location. It doesn't just average them; it intelligently weighs them, giving more importance to the information it trusts more. If your prediction is usually very accurate but your sightings are often blurry, it'll lean more on the prediction. If your sightings are super clear but the puppy is unpredictable, it'll trust the measurement more.

The result is a much more accurate estimate of the puppy's location than either source could provide on its own. It's constantly predicting, then correcting with new measurements, in a continuous cycle.

## 2. Why it matters — real-world applications

The Kalman filter is one of the most widely used and powerful algorithms in modern engineering, especially in fields where accurate estimation from noisy data is crucial. Its ability to optimally fuse sensor data makes it indispensable.

1.  **Aerospace Navigation (GPS, Inertial Navigation Systems - INS):** Every commercial airliner, spacecraft, and missile uses Kalman filters. GPS receivers use them to combine noisy satellite signals with internal clock predictions to get a more accurate position fix. When GPS signals are unavailable (e.g., inside a tunnel or during signal jamming), the Kalman filter can fuse data from an INS (accelerometers and gyroscopes) with the last known GPS fix to provide continuous, albeit degrading, navigation. For example, SpaceX's Falcon 9 rockets use Kalman filters for precise trajectory estimation during launch, ascent, and landing.
2.  **Robotics and Autonomous Vehicles:** Self-driving cars (like those developed by Waymo or Cruise) and autonomous drones heavily rely on Kalman filters (and their variants like Extended Kalman Filters or Unscented Kalman Filters) for "sensor fusion." They combine data from LiDAR, radar, cameras, and wheel encoders to estimate the vehicle's own position, velocity, and orientation, as well as the positions and velocities of other vehicles and pedestrians around them. This creates a robust understanding of the environment, even when individual sensors are noisy or temporarily fail.
3.  **Financial Modeling:** While less direct than physical systems, Kalman filters are used in quantitative finance for tasks like estimating the true underlying volatility of a stock, predicting asset prices, or tracking economic indicators that are only observed with noise. For instance, a hedge fund might use a Kalman filter to estimate the "true" price of an asset, accounting for market noise and trading volume.
4.  **Weather Forecasting and Oceanography:** Meteorologists use Kalman filters in data assimilation to combine noisy observations from weather stations, satellites, and radar with complex atmospheric models. This helps to create more accurate initial conditions for numerical weather prediction models, leading to better forecasts. Similarly, oceanographers use them to track ocean currents or predict sea surface temperatures.

## 3. Prerequisites — what you must know first

To truly grasp the Kalman filter derivation, you need a solid foundation in several mathematical concepts. If any of these feel unfamiliar, pause and review them first.

*   **Linear Algebra:**
    *   **Vectors and Matrices:** Understanding what they are, how to represent them, and basic operations.
    *   **Matrix Addition, Subtraction, Multiplication:** Crucial for all Kalman filter equations. Pay special attention to dimension compatibility.
    *   **Matrix Transpose ($A^T$):** Swapping rows and columns. Used extensively in covariance propagation.
    *   **Matrix Inverse ($A^{-1}$):** The matrix equivalent of division. Essential for the Kalman gain calculation.
    *   **Identity Matrix ($I$):** The matrix equivalent of the number 1.
    *   **Covariance Matrices:** Understanding what a covariance matrix represents (how different variables in a vector relate to each other and their individual variances).
*   **Probability and Statistics:**
    *   **Mean (Expected Value):** The average value of a random variable.
    *   **Variance:** A measure of how spread out a single random variable is.
    *   **Covariance:** A measure of how two random variables change together.
    *   **Probability Distributions:** Especially the **Gaussian (Normal) Distribution**. The Kalman filter assumes all uncertainties are Gaussian. Understanding its bell curve shape and how its mean and variance define it is key.
    *   **Expected Value Operator ($E[\cdot]$):** How to calculate the mean of a random variable or function of random variables.
*   **Calculus (Optional but helpful for deeper understanding):**
    *   **Derivatives:** For understanding *why* the Kalman gain is optimal (by minimizing the error covariance using differentiation). For this derivation, we'll mostly present the result, but knowing derivatives helps appreciate the optimization.
*   **State-Space Representation:**
    *   **State Vector ($x$):** A set of variables that completely describe the system's condition at a given time (e.g., position, velocity, attitude).
    *   **State Transition Model:** How the state evolves over time (e.g., $x_{k+1} = F x_k + B u_k$).
    *   **Measurement Model:** How the state relates to what you observe (e.g., $z_k = H x_k$).

## 4. The core idea — step by step

The Kalman filter operates in a two-step cycle: **Predict** and **Update**. It uses a state-space model to describe the system and assumes all uncertainties are Gaussian. We'll denote estimates *before* a measurement update with a superscript $^-$ (e.g., $\hat{x}_k^-$ for predicted state) and estimates *after* a measurement update with a superscript $^+$ (e.g., $\hat{x}_k^+$ for updated state).

Let's define our system first:

*   **State Vector ($x_k$):** The true state of the system at time $k$. This is what we want to estimate. It's a vector containing all the variables we care about (e.g., position, velocity).
*   **State Transition Matrix ($F_k$):** This matrix describes how the state evolves from time $k-1$ to $k$ *without* any external inputs.
*   **Control Input Vector ($u_k$):** Any known external forces or commands applied to the system (e.g., engine thrust, steering input).
*   **Control Input Matrix ($B_k$):** Relates the control input to the state change.
*   **Process Noise Vector ($w_k$):** Represents unknown disturbances or inaccuracies in our system model (e.g., unmodeled air resistance, slight variations in engine thrust). We assume $w_k$ is Gaussian with zero mean and covariance $Q_k$: $w_k \sim N(0, Q_k)$.
*   **Measurement Vector ($z_k$):** The actual reading from our sensors at time $k$.
*   **Measurement Matrix ($H_k$):** This matrix relates the true state $x_k$ to what the sensor actually measures.
*   **Measurement Noise Vector ($v_k$):** Represents inaccuracies in the sensor readings (e.g., sensor calibration errors, electrical noise). We assume $v_k$ is Gaussian with zero mean and covariance $R_k$: $v_k \sim N(0, R_k)$.

Our system is described by these equations:

**State Equation (Process Model):**
$$x_k = F_k x_{k-1} + B_k u_k + w_k$$

**Measurement Equation (Observation Model):**
$$z_k = H_k x_k + v_k$$

Our goal is to find the *optimal estimate* of $x_k$, denoted $\hat{x}_k$, and its associated *error covariance matrix*, $P_k$. The error covariance matrix $P_k$ tells us how uncertain we are about our estimate $\hat{x}_k$. A smaller $P_k$ means we're more confident.

---

### Step 1: Initial State

Before we can do anything, we need a starting point.

*   **Plain-English:** "Where do we think the puppy is when we first start tracking it, and how sure are we about that initial guess?"
*   **Example:** If we're tracking a car, we might assume it starts at coordinates (0,0) with zero velocity. But we're not perfectly sure, so there's some initial uncertainty.
*   **Formal/Mathematical:** We need an initial estimate of the state, $\hat{x}_0^+$, and its initial error covariance, $P_0^+$.
    *   $\hat{x}_0^+$: Initial state estimate (mean of the initial Gaussian distribution).
    *   $P_0^+$: Initial error covariance matrix (describes the spread of the initial Gaussian distribution).
*   **What could go wrong:** If your initial guess $\hat{x}_0^+$ is very far from the true state, or if your $P_0^+$ is unrealistically small (meaning you're overconfident), the filter might take a long time to converge or even diverge.

---

### Step 2: The Predict Step (Time Update)

This step uses the system's dynamics to project the state and its uncertainty forward in time from $k-1$ to $k$. It's essentially making a forecast.

#### Step 2a: Predict the State Estimate

*   **Plain-English:** "Based on where we thought the puppy was a moment ago ($\hat{x}_{k-1}^+$) and what we know it was *supposed* to do (move according to $F_k$ and $B_k u_k$), where do we predict it will be now?"
*   **Example:** If a car was at (10m, 0m) with velocity (5m/s, 0m/s) and we know it accelerates at (1m/s$^2$, 0m/s$^2$), we can predict its new position and velocity.
*   **Formal/Mathematical:** We use the state equation, but since we don't know the process noise $w_k$ (its expected value is zero), we simply omit it in the prediction.
    *   Let $\hat{x}_{k-1}^+$ be our best estimate of the state at time $k-1$.
    *   The predicted state at time $k$, denoted $\hat{x}_k^-$, is:
        $$\hat{x}_k^- = F_k \hat{x}_{k-1}^+ + B_k u_k$$
    *   Here, $\hat{x}_k^-$ is the *a priori* (before measurement) state estimate.
*   **What could go wrong:** If your state transition matrix $F_k$ or control input matrix $B_k$ are incorrect, or if the control input $u_k$ is wrong, your prediction will consistently be biased.

#### Step 2b: Predict the Error Covariance

*   **Plain-English:** "How much more uncertain are we about our new predicted location for the puppy? This uncertainty comes from two sources: the uncertainty we *already had* from the previous step, and the *new uncertainty* introduced by the unpredictable process noise (the puppy's random wiggles)."
*   **Example:** If we were uncertain about the car's position before, that uncertainty propagates. Plus, there's always some unpredictable road bumps or engine variations that add to the uncertainty.
*   **Formal/Mathematical:** We need to propagate the previous error covariance $P_{k-1}^+$ through the state transition and add the process noise covariance $Q_k$.
    *   Recall: $x_k = F_k x_{k-1} + B_k u_k + w_k$.
    *   The error at time $k$ is $e_k^- = x_k - \hat{x}_k^-$.
    *   Substitute the state equation and predicted state equation:
        $$e_k^- = (F_k x_{k-1} + B_k u_k + w_k) - (F_k \hat{x}_{k-1}^+ + B_k u_k)$$
        $$e_k^- = F_k (x_{k-1} - \hat{x}_{k-1}^+) + w_k$$
        $$e_k^- = F_k e_{k-1}^+ + w_k$$
    *   The predicted error covariance $P_k^-$ is defined as $E[e_k^- (e_k^-)^T]$.
        $$P_k^- = E[(F_k e_{k-1}^+ + w_k)(F_k e_{k-1}^+ + w_k)^T]$$
        $$P_k^- = E[F_k e_{k-1}^+ (e_{k-1}^+)^T F_k^T + F_k e_{k-1}^+ w_k^T + w_k (e_{k-1}^+)^T F_k^T + w_k w_k^T]$$
    *   Since process noise $w_k$ is uncorrelated with the previous state error $e_{k-1}^+$ (and has zero mean), $E[F_k e_{k-1}^+ w_k^T] = 0$ and $E[w_k (e_{k-1}^+)^T F_k^T] = 0$.
    *   Therefore:
        $$P_k^- = F_k E[e_{k-1}^+ (e_{k-1}^+)^T] F_k^T + E[w_k w_k^T]$$
        $$P_k^- = F_k P_{k-1}^+ F_k^T + Q_k$$
    *   Here, $P_k^-$ is the *a priori* (before measurement) error covariance.
*   **What could go wrong:** If your process noise covariance $Q_k$ is too small, the filter will be overconfident in its predictions and might ignore measurements. If $Q_k$ is too large, it will distrust its predictions too much. Incorrect $F_k$ will also cause problems.

---

### Step 3: The Update Step (Measurement Update)

This step incorporates the new sensor measurement to refine the predicted state and reduce its uncertainty. This is where the "magic" of blending happens.

#### Step 3a: Calculate the Measurement Residual (Innovation)

*   **Plain-English:** "We predicted the puppy would be at location A, but our sensor just saw it at location B. What's the difference between what we *expected* to see and what we *actually* saw?"
*   **Example:** We predicted the car to be at (15m, 0m), but the GPS says (16m, 0.5m). The difference is (1m, 0.5m).
*   **Formal/Mathematical:**
    *   The predicted measurement, $\hat{z}_k^-$, is what we *expect* to measure given our predicted state $\hat{x}_k^-$. From the measurement equation $z_k = H_k x_k + v_k$, we predict:
        $$\hat{z}_k^- = H_k \hat{x}_k^-$$
    *   The measurement residual (or innovation), $y_k$, is the difference between the actual measurement $z_k$ and the predicted measurement $\hat{z}_k^-$.
        $$y_k = z_k - H_k \hat{x}_k^-$$
    *   This $y_k$ represents the "surprise" or new information from the measurement.
*   **What could go wrong:** If $H_k$ is incorrect, the residual will be consistently wrong, leading to bad updates.

#### Step 3b: Calculate the Innovation Covariance

*   **Plain-English:** "How uncertain is that 'surprise' we just calculated? This uncertainty comes from two places: the uncertainty in our *prediction* (which affects $\hat{z}_k^-$) and the inherent *noise in the measurement itself*."
*   **Example:** How reliable is that (1m, 0.5m) difference? It depends on how sure we were about our prediction *and* how noisy the GPS reading is.
*   **Formal/Mathematical:** The covariance of the innovation $y_k$, denoted $S_k$, is:
    *   $y_k = z_k - H_k \hat{x}_k^- = (H_k x_k + v_k) - H_k \hat{x}_k^- = H_k (x_k - \hat{x}_k^-) + v_k = H_k e_k^- + v_k$.
    *   $S_k = E[y_k y_k^T] = E[(H_k e_k^- + v_k)(H_k e_k^- + v_k)^T]$
    *   Again, assuming $e_k^-$ and $v_k$ are uncorrelated and $v_k$ has zero mean:
        $$S_k = H_k E[e_k^- (e_k^-)^T] H_k^T + E[v_k v_k^T]$$
        $$S_k = H_k P_k^- H_k^T + R_k$$
*   **What could go wrong:** If $R_k$ (measurement noise covariance) is too small, the filter will trust noisy measurements too much. If $R_k$ is too large, it will largely ignore good measurements.

#### Step 3c: Calculate the Optimal Kalman Gain

*   **Plain-English:** "This is the crucial weighting factor. It tells us *how much* to adjust our prediction based on the new 'surprise' ($y_k$). If our measurement is very reliable (small $R_k$) and our prediction is very uncertain (large $P_k^-$), the Kalman Gain will be large, meaning we trust the measurement more. If our prediction is very confident and the measurement is noisy, the Kalman Gain will be small."
*   **Example:** If the GPS is super accurate but our car model is shaky, we'll adjust our car's position almost entirely to match the GPS. If the GPS is flaky but our car model is perfect, we'll barely adjust.
*   **Formal/Mathematical:** The Kalman Gain, $K_k$, is derived by minimizing the trace of the *posterior* error covariance matrix $P_k^+$ (the uncertainty *after* the update). This is a complex optimization problem involving matrix calculus.
    *   The updated state estimate $\hat{x}_k^+$ is a linear combination of the predicted state $\hat{x}_k^-$ and the innovation $y_k$:
        $$\hat{x}_k^+ = \hat{x}_k^- + K_k y_k$$
    *   The error $e_k^+ = x_k - \hat{x}_k^+$.
    *   Substituting the above: $e_k^+ = x_k - (\hat{x}_k^- + K_k y_k) = (x_k - \hat{x}_k^-) - K_k y_k = e_k^- - K_k (H_k e_k^- + v_k)$
        $$e_k^+ = (I - K_k H_k) e_k^- - K_k v_k$$
    *   The posterior error covariance $P_k^+ = E[e_k^+ (e_k^+)^T]$.
        $$P_k^+ = E[((I - K_k H_k) e_k^- - K_k v_k)((I - K_k H_k) e_k^- - K_k v_k)^T]$$
        $$P_k^+ = (I - K_k H_k) P_k^- (I - K_k H_k)^T + K_k R_k K_k^T$$
    *   To find the optimal $K_k$, we take the derivative of $P_k^+$ with respect to $K_k$ and set it to zero. This leads to:
        $$K_k = P_k^- H_k^T (H_k P_k^- H_k^T + R_k)^{-1}$$
    *   Notice the term $(H_k P_k^- H_k^T + R_k)$ is exactly $S_k$, the innovation covariance. So, a more compact form is:
        $$K_k = P_k^- H_k^T S_k^{-1}$$
*   **What could go wrong:** Incorrect calculation of $P_k^-$, $H_k$, or $R_k$ will lead to a suboptimal Kalman gain, meaning the filter won't blend the information optimally. If $S_k$ is singular (not invertible), the filter will crash. This often happens if $R_k$ is set to zero (meaning perfect measurements, which is unrealistic).

#### Step 3d: Update the State Estimate

*   **Plain-English:** "Now that we know how much to trust the 'surprise' ($y_k$), we use it to adjust our predicted location ($\hat{x}_k^-$) to get our final, best estimate ($\hat{x}_k^+$)."
*   **Example:** We take our predicted car position, add the (1m, 0.5m) difference, but scaled by the Kalman gain (e.g., if the gain is 0.7, we add 0.7 * (1m, 0.5m)).
*   **Formal/Mathematical:** This is the equation we introduced when deriving the Kalman gain:
    $$\hat{x}_k^+ = \hat{x}_k^- + K_k y_k$$
    *   Here, $\hat{x}_k^+$ is the *a posteriori* (after measurement) state estimate, which is our new best guess for the true state.
*   **What could go wrong:** If $K_k$ or $y_k$ are wrong, the update will be incorrect.

#### Step 3e: Update the Error Covariance

*   **Plain-English:** "Since we just incorporated a new measurement, our uncertainty about the puppy's location should *decrease*. This step calculates that reduced uncertainty."
*   **Example:** After getting a GPS fix, we are much more certain about the car's position than we were just based on prediction.
*   **Formal/Mathematical:** We use the derived $P_k^+$ from the Kalman gain derivation.
    *   The most common and numerically stable form is:
        $$P_k^+ = (I - K_k H_k) P_k^-$$
    *   Other equivalent forms exist, such as:
        $$P_k^+ = P_k^- - K_k H_k P_k^-$$
        $$P_k^+ = (I - K_k H_k) P_k^- (I - K_k H_k)^T + K_k R_k K_k^T$$
        The first form is often preferred for numerical stability.
*   **What could go wrong:** If $P_k^+$ doesn't decrease (or remains positive semi-definite), it indicates an issue, possibly with $R_k$ or $Q_k$ values being too high/low, or numerical instability.

---

**Summary of Kalman Filter Equations (for one cycle $k-1 \to k$):**

**Initialization:**
*   Set $\hat{x}_0^+$ and $P_0^+$

**Predict (Time Update):**
1.  **Predicted State Estimate:**
    $$\hat{x}_k^- = F_k \hat{x}_{k-1}^+ + B_k u_k$$
2.  **Predicted Error Covariance:**
    $$P_k^- = F_k P_{k-1}^+ F_k^T + Q_k$$

**Update (Measurement Update):**
3.  **Measurement Residual (Innovation):**
    $$y_k = z_k - H_k \hat{x}_k^-$$
4.  **Innovation Covariance:**
    $$S_k = H_k P_k^- H_k^T + R_k$$
5.  **Kalman Gain:**
    $$K_k = P_k^- H_k^T S_k^{-1}$$
6.  **Updated State Estimate:**
    $$\hat{x}_k^+ = \hat{x}_k^- + K_k y_k$$
7.  **Updated Error Covariance:**
    $$P_k^+ = (I - K_k H_k) P_k^-$$

The cycle then repeats for the next time step, using $\hat{x}_k^+$ and $P_k^+$ as the new $\hat{x}_{k-1}^+$ and $P_{k-1}^+$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple 1D Position Estimation (Constant Velocity)

**Problem:** A robot is moving in 1D space. We want to estimate its position. We have a noisy sensor that measures its position directly. Assume constant velocity and no control input.

**Given:**
*   Initial state estimate $\hat{x}_0^+ = [0]^T$ (position).
*   Initial error covariance $P_0^+ = [1]^T$.
*   Process noise covariance $Q = [0.01]^T$ (small uncertainty in constant velocity model).
*   Measurement noise covariance $R = [0.1]^T$ (noisy sensor).
*   State transition matrix $F = [1]^T$ (position at $k$ is position at $k-1$ for constant velocity).
*   Measurement matrix $H = [1]^T$ (sensor directly measures position).
*   No control input, so $B_k u_k = 0$.
*   At time $k=1$, we get a measurement $z_1 = [0.5]^T$.

**What we want:** Estimate the robot's position at $k=1$ ($\hat{x}_1^+$) and its uncertainty ($P_1^+$).

---

**Step 0: Initialization (Given)**
*   $\hat{x}_0^+ = [0]$
*   $P_0^+ = [1]$

**Step 1: Predict Step (Time Update) for k=1**

1a. **Predicted State Estimate ($\hat{x}_1^-$):**
    *   Formula: $\hat{x}_k^- = F_k \hat{x}_{k-1}^+ + B_k u_k$
    *   Substitute values for $k=1$: $\hat{x}_1^- = F \hat{x}_0^+ + 0$
    *   Calculation: $\hat{x}_1^- = [1] \cdot [0] = [0]$
    *   *Explanation:* Based on our initial estimate of 0 and the assumption of constant velocity (no change), our prediction for the position at time 1 is still 0.

1b. **Predicted Error Covariance ($P_1^-$):**
    *   Formula: $P_k^- = F_k P_{k-1}^+ F_k^T + Q_k$
    *   Substitute values for $k=1$: $P_1^- = F P_0^+ F^T + Q$
    *   Calculation: $P_1^- = [1] \cdot [1] \cdot [1]^T + [0.01]$
    *   $P_1^- = [1] \cdot [1] + [0.01]$
    *   $P_1^- = [1] + [0.01] = [1.01]$
    *   *Explanation:* Our uncertainty has slightly increased. The previous uncertainty (1) is propagated, and a small amount of process noise (0.01) is added, reflecting that our prediction model isn't perfect.

**Step 2: Update Step (Measurement Update) for k=1**

2a. **Measurement Residual ($y_1$):**
    *   Formula: $y_k = z_k - H_k \hat{x}_k^-$
    *   Substitute values for $k=1$: $y_1 = z_1 - H \hat{x}_1^-$
    *   Given $z_1 = [0.5]$
    *   Calculation: $y_1 = [0.5] - [1] \cdot [0] = [0.5]$
    *   *Explanation:* We predicted the position to be 0, but the sensor measured 0.5. The "surprise" or difference is 0.5.

2b. **Innovation Covariance ($S_1$):**
    *   Formula: $S_k = H_k P_k^- H_k^T + R_k$
    *   Substitute values for $k=1$: $S_1 = H P_1^- H^T + R$
    *   Calculation: $S_1 = [1] \cdot [1.01] \cdot [1]^T + [0.1]$
    *   $S_1 = [1.01] + [0.1] = [1.11]$
    *   *Explanation:* This is the total uncertainty associated with the "surprise" $y_1$. It combines the uncertainty in our prediction ($P_1^-$ propagated through $H$) and the uncertainty in the measurement itself ($R$).

2c. **Kalman Gain ($K_1$):**
    *   Formula: $K_k = P_k^- H_k^T S_k^{-1}$
    *   Substitute values for $k=1$: $K_1 = P_1^- H^T S_1^{-1}$
    *   Calculation: $K_1 = [1.01] \cdot [1]^T \cdot [1.11]^{-1}$
    *   $K_1 = [1.01] \cdot \frac{1}{1.11}$
    *   $K_1 \approx [0.9099]$
    *   *Explanation:* This is our weighting factor. Since $P_1^-$ (1.01) is much larger than $R$ (0.1), the filter trusts the measurement more, so the gain is close to 1.

2d. **Updated State Estimate ($\hat{x}_1^+$):**
    *   Formula: $\hat{x}_k^+ = \hat{x}_k^- + K_k y_k$
    *   Substitute values for $k=1$: $\hat{x}_1^+ = \hat{x}_1^- + K_1 y_1$
    *   Calculation: $\hat{x}_1^+ = [0] + [0.9099] \cdot [0.5]$
    *   $\hat{x}_1^+ = [0] + [0.45495]$
    *   $\hat{x}_1^+ \approx [0.4550]$
    *   *Explanation:* We adjusted our predicted position (0) by adding a large fraction (0.9099) of the observed difference (0.5). The new best estimate is 0.4550.

2e. **Updated Error Covariance ($P_1^+$):**
    *   Formula: $P_k^+ = (I - K_k H_k) P_k^-$
    *   Substitute values for $k=1$: $P_1^+ = (I - K_1 H) P_1^-$
    *   Calculation: $P_1^+ = ([1] - [0.9099] \cdot [1]) \cdot [1.01]$
    *   $P_1^+ = ([1] - [0.9099]) \cdot [1.01]$
    *   $P_1^+ = [0.0901] \cdot [1.01]$
    *   $P_1^+ \approx [0.0910]$
    *   *Explanation:* Our uncertainty has significantly decreased from 1.01 to 0.0910 because we incorporated the measurement. We are now much more confident in our estimate.

**Final Answer:**
The estimated position at $k=1$ is $\boxed{\hat{x}_1^+ = [0.4550]}$ with an associated uncertainty of $\boxed{P_1^+ = [0.0910]}$.

**Reflection:** This example shows how the filter moves the estimate towards the measurement, but not entirely, because of the prediction's initial uncertainty. The uncertainty (covariance) decreases after the measurement update, as expected.

---

### Example 2: 1D Position and Velocity Estimation (with Control Input)

**Problem:** A car is moving in 1D. We want to estimate its position and velocity. We have a noisy sensor that measures its position. We also know its acceleration (control input).

**Given:**
*   State vector $x_k = \begin{bmatrix} \text{position} \\ \text{velocity} \end{bmatrix}$.
*   Initial state estimate $\hat{x}_0^+ = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$.
*   Initial error covariance $P_0^+ = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$.
*   Time step $\Delta t = 1$ second.
*   Process noise covariance $Q = \begin{bmatrix} 0.01 & 0 \\ 0 & 0.01 \end{bmatrix}$.
*   Measurement noise covariance $R = [0.1]$.
*   State transition matrix $F = \begin{bmatrix} 1 & \Delta t \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}$.
*   Control input matrix $B = \begin{bmatrix} 0.5 \Delta t^2 \\ \Delta t \end{bmatrix} = \begin{bmatrix} 0.5 \\ 1 \end{bmatrix}$.
*   At time $k=1$, we apply a control input (acceleration) $u_1 = [1]$ (1 m/s$^2$).
*   At time $k=1$, we get a measurement $z_1 = [1.2]$ (position).
*   Measurement matrix $H = \begin{bmatrix} 1 & 0 \end{bmatrix}$ (sensor measures position only).

**What we want:** Estimate the car's position and velocity at $k=1$ ($\hat{x}_1^+$) and its uncertainty ($P_1^+$).

---

**Step 0: Initialization (Given)**
*   $\hat{x}_0^+ = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$
*   $P_0^+ = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$

**Step 1: Predict Step (Time Update) for k=1**

1a. **Predicted State Estimate ($\hat{x}_1^-$):**
    *   Formula: $\hat{x}_k^- = F_k \hat{x}_{k-1}^+ + B_k u_k$
    *   Substitute values for $k=1$: $\hat{x}_1^- = F \hat{x}_0^+ + B u_1$
    *   Calculation:
        $\hat{x}_1^- = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 0 \\ 0 \end{bmatrix} + \begin{bmatrix} 0.5 \\ 1 \end{bmatrix} [1]$
        $\hat{x}_1^- = \begin{bmatrix} 0 \\ 0 \end{bmatrix} + \begin{bmatrix} 0.5 \\ 1 \end{bmatrix}$
        $\hat{x}_1^- = \begin{bmatrix} 0.5 \\ 1 \end{bmatrix}$
    *   *Explanation:* Based on zero initial position/velocity and an acceleration of 1 m/s$^2$ for 1 second, the predicted position is 0.5m and velocity is 1 m/s.

1b. **Predicted Error Covariance ($P_1^-$):**
    *   Formula: $P_k^- = F_k P_{k-1}^+ F_k^T + Q_k$
    *   Substitute values for $k=1$: $P_1^- = F P_0^+ F^T + Q$
    *   Calculation:
        $P_1^- = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 0 \\ 1 & 1 \end{bmatrix} + \begin{bmatrix} 0.01 & 0 \\ 0 & 0.01 \end{bmatrix}$
        First, $F P_0^+ = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}$
        Then, $F P_0^+ F^T = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 0 \\ 1 & 1 \end{bmatrix} = \begin{bmatrix} 1 \cdot 1 + 1 \cdot 1 & 1 \cdot 0 + 1 \cdot 1 \\ 0 \cdot 1 + 1 \cdot 1 & 0 \cdot 0 + 1 \cdot 1 \end{bmatrix} = \begin{bmatrix} 2 & 1 \\ 1 & 1 \end{bmatrix}$
        Finally, $P_1^- = \begin{bmatrix} 2 & 1 \\ 1 & 1 \end{bmatrix} + \begin{bmatrix} 0.01 & 0 \\ 0 & 0.01 \end{bmatrix} = \begin{bmatrix} 2.01 & 1 \\ 1 & 1.01 \end{bmatrix}$
    *   *Explanation:* The uncertainty has increased. The initial uncertainty is propagated through the dynamics (position uncertainty now depends on velocity uncertainty) and process noise is added. Notice the off-diagonal terms, indicating correlation between position and velocity uncertainties.

**Step 2: Update Step (Measurement Update) for k=1**

2a. **Measurement Residual ($y_1$):**
    *   Formula: $y_k = z_k - H_k \hat{x}_k^-$
    *   Substitute values for $k=1$: $y_1 = z_1 - H \hat{x}_1^-$
    *   Given $z_1 = [1.2]$
    *   Calculation: $y_1 = [1.2] - \begin{bmatrix} 1 & 0 \end{bmatrix} \begin{bmatrix} 0.5 \\ 1 \end{bmatrix}$
    *   $y_1 = [1.2] - [0.5]$
    *   $y_1 = [0.7]$
    *   *Explanation:* We predicted the position to be 0.5m, but the sensor measured 1.2m. The difference is 0.7m.

2b. **Innovation Covariance ($S_1$):**
    *   Formula: $S_k = H_k P_k^- H_k^T + R_k$
    *   Substitute values for $k=1$: $S_1 = H P_1^- H^T + R$
    *   Calculation:
        $S_1 = \begin{bmatrix} 1 & 0 \end{bmatrix} \begin{bmatrix} 2.01 & 1 \\ 1 & 1.01 \end{bmatrix} \begin{bmatrix} 1 \\ 0 \end{bmatrix} + [0.1]$
        First, $H P_1^- = \begin{bmatrix} 1 & 0 \end{bmatrix} \begin{bmatrix} 2.01 & 1 \\ 1 & 1.01 \end{bmatrix} = \begin{bmatrix} 2.01 & 1 \end{bmatrix}$
        Then, $H P_1^- H^T = \begin{bmatrix} 2.01 & 1 \end{bmatrix} \begin{bmatrix} 1 \\ 0 \end{bmatrix} = [2.01 \cdot 1 + 1 \cdot 0] = [2.01]$
        Finally, $S_1 = [2.01] + [0.1] = [2.11]$
    *   *Explanation:* This is the total uncertainty in our measurement residual. It combines the predicted uncertainty in position (from $P_1^-$) and the sensor's own noise ($R$).

2c. **Kalman Gain ($K_1$):**
    *   Formula: $K_k = P_k^- H_k^T S_k^{-1}$
    *   Substitute values for $k=1$: $K_1 = P_1^- H^T S_1^{-1}$
    *   Calculation:
        $K_1 = \begin{bmatrix} 2.01 & 1 \\ 1 & 1.01 \end{bmatrix} \begin{bmatrix} 1 \\ 0 \end{bmatrix} [2.11]^{-1}$
        First, $P_1^- H^T = \begin{bmatrix} 2.01 & 1 \\ 1 & 1.01 \end{bmatrix} \begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix} 2.01 \\ 1 \end{bmatrix}$
        Then, $K_1 = \begin{bmatrix} 2.01 \\ 1 \end{bmatrix} \cdot \frac{1}{2.11}$
        $K_1 = \begin{bmatrix} 2.01/2.11 \\ 1/2.11 \end{bmatrix} \approx \begin{bmatrix} 0.9526 \\ 0.4739 \end{bmatrix}$
    *   *Explanation:* The Kalman gain is a vector. The top component (0.9526) tells us how much to adjust the position estimate based on the measurement residual. The bottom component (0.4739) tells us how much to adjust the velocity estimate based on the same position measurement residual. Since the measurement is only position, the velocity update comes from the correlation between position and velocity errors in $P_1^-$.

2d. **Updated State Estimate ($\hat{x}_1^+$):**
    *   Formula: $\hat{x}_k^+ = \hat{x}_k^- + K_k y_k$
    *   Substitute values for $k=1$: $\hat{x}_1^+ = \hat{x}_1^- + K_1 y_1$
    *   Calculation:
        $\hat{x}_1^+ = \begin{bmatrix} 0.5 \\ 1 \end{bmatrix} + \begin{bmatrix} 0.9526 \\ 0.4739 \end{bmatrix} [0.7]$
        $\hat{x}_1^+ = \begin{bmatrix} 0.5 \\ 1 \end{bmatrix} + \begin{bmatrix} 0.9526 \cdot 0.7 \\ 0.4739 \cdot 0.7 \end{bmatrix}$
        $\hat{x}_1^+ = \begin{bmatrix} 0.5 \\ 1 \end{bmatrix} + \begin{bmatrix} 0.6668 \\ 0.3317 \end{bmatrix}$
        $\hat{x}_1^+ = \begin{bmatrix} 1.1668 \\ 1.3317 \end{bmatrix}$
    *   *Explanation:* The predicted position (0.5) is adjusted significantly towards the measurement (1.2) by adding 0.6668. The velocity (1) is also adjusted upwards by 0.3317, because if the car is already further ahead than predicted, it likely had a higher velocity.

2e. **Updated Error Covariance ($P_1^+$):**
    *   Formula: $P_k^+ = (I - K_k H_k) P_k^-$
    *   Substitute values for $k=1$: $P_1^+ = (I - K_1 H) P_1^-$
    *   Calculation:
        First, $K_1 H = \begin{bmatrix} 0.9526 \\ 0.4739 \end{bmatrix} \begin{bmatrix} 1 & 0 \end{bmatrix} = \begin{bmatrix} 0.9526 & 0 \\ 0.4739 & 0 \end{bmatrix}$
        Then, $I - K_1 H = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} - \begin{bmatrix} 0.9526 & 0 \\ 0.4739 & 0 \end{bmatrix} = \begin{bmatrix} 0.0474 & 0 \\ -0.4739 & 1 \end{bmatrix}$
        Finally, $P_1^+ = \begin{bmatrix} 0.0474 & 0 \\ -0.4739 & 1 \end{bmatrix} \begin{bmatrix} 2.01 & 1 \\ 1 & 1.01 \end{bmatrix}$
        $P_1^+ = \begin{bmatrix} 0.0474 \cdot 2.01 + 0 \cdot 1 & 0.0474 \cdot 1 + 0 \cdot 1.01 \\ -0.4739 \cdot 2.01 + 1 \cdot 1 & -0.4739 \cdot 1 + 1 \cdot 1.01 \end{bmatrix}$
        $P_1^+ = \begin{bmatrix} 0.0953 & 0.0474 \\ 0.0474 & 0.5361 \end{bmatrix}$ (rounding to 4 decimal places)
    *   *Explanation:* The uncertainty in our estimate has decreased significantly, especially for position (from 2.01 to 0.0953). The off-diagonal terms still show correlation, which is expected.

**Final Answer:**
The estimated state (position and velocity) at $k=1$ is $\boxed{\hat{x}_1^+ = \begin{bmatrix} 1.1668 \\ 1.3317 \end{bmatrix}}$ with an associated uncertainty of $\boxed{P_1^+ = \begin{bmatrix} 0.0953 & 0.0474 \\ 0.0474 & 0.5361 \end{bmatrix}}$.

**Reflection:** This example demonstrates how a measurement of only position can also improve the estimate of velocity, thanks to the correlations captured in the covariance matrix and the Kalman gain. The system's dynamics allow the filter to infer velocity changes from observed position discrepancies.

---

### Example 3: 2D Position and Velocity Estimation (Standard Application)

**Problem:** A drone is flying in a 2D plane. We want to estimate its (x, y) position and (vx, vy) velocity. We have a noisy GPS sensor that measures its (x, y) position. No control input for simplicity.

**Given:**
*   State vector $x_k = \begin{bmatrix} x \\ y \\ v_x \\ v_y \end{bmatrix}$.
*   Initial state estimate $\hat{x}_0^+ = \begin{bmatrix} 0 \\ 0 \\ 0 \\ 0 \end{bmatrix}$.
*   Initial error covariance $P_0^+ = \text{diag}(1, 1, 1, 1)$ (identity matrix, assuming initial uncertainty of 1 for each state component).
*   Time step $\Delta t = 0.5$ seconds.
*   Process noise covariance $Q = \text{diag}(0.1, 0.1, 0.1, 0.1)$ (some uncertainty in the constant velocity model).
*   Measurement noise covariance $R = \text{diag}(0.5, 0.5)$ (noisy GPS, measures x and y with uncertainty 0.5).
*   State transition matrix $F = \begin{bmatrix} 1 & 0 & \Delta t & 0 \\ 0 & 1 & 0 & \Delta t \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 0 & 0.5 & 0 \\ 0 & 1 & 0 & 0.5 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$.
*   Measurement matrix $H = \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \end{bmatrix}$ (sensor measures x and y position).
*   No control input, so $B_k u_k = 0$.
*   At time $k=1$, we get a measurement $z_1 = \begin{bmatrix} 1.0 \\ 0.8 \end{bmatrix}$.

**What we want:** Estimate the drone's state at $k=1$ ($\hat{x}_1^+$) and its uncertainty ($P_1^+$).

---

**Step 0: Initialization (Given)**
*   $\hat{x}_0^+ = \begin{bmatrix} 0 \\ 0 \\ 0 \\ 0 \end{bmatrix}$
*   $P_0^+ = \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$

**Step 1: Predict Step (Time Update) for k=1**

1a. **Predicted State Estimate ($\hat{x}_1^-$):**
    *   Formula: $\hat{x}_k^- = F_k \hat{x}_{k-1}^+ + B_k u_k$
    *   Substitute values for $k=1$: $\hat{x}_1^- = F \hat{x}_0^+ + 0$
    *   Calculation:
        $\hat{x}_1^- = \begin{bmatrix} 1 & 0 & 0.5 & 0 \\ 0 & 1 & 0 & 0.5 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 0 \\ 0 \\ 0 \\ 0 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 0 \\ 0 \end{bmatrix}$
    *   *Explanation:* Starting at rest, and with no control input, our prediction is that the drone stays at (0,0) with zero velocity.

1b. **Predicted Error Covariance ($P_1^-$):**
    *   Formula: $P_k^- = F_k P_{k-1}^+ F_k^T + Q_k$
    *   Substitute values for $k=1$: $P_1^- = F P_0^+ F^T + Q$
    *   Calculation:
        $F P_0^+ = \begin{bmatrix} 1 & 0 & 0.5 & 0 \\ 0 & 1 & 0 & 0.5 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 0 & 0.5 & 0 \\ 0 & 1 & 0 & 0.5 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$
        $F^T = \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0.5 & 0 & 1 & 0 \\ 0 & 0.5 & 0 & 1 \end{bmatrix}$
        $F P_0^+ F^T = \begin{bmatrix} 1 & 0 & 0.5 & 0 \\ 0 & 1 & 0 & 0.5 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0.5 & 0 & 1 & 0 \\ 0 & 0.5 & 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 \cdot 1 + 0.5 \cdot 0.5 & 0.5 \cdot 0.5 & 0.5 & 0 \\ 0.5 \cdot 0.5 & 1 \cdot 1 + 0.5 \cdot 0.5 & 0 & 0.5 \\ 0.5 & 0 & 1 & 0 \\ 0 & 0.5 & 0 & 1 \end{bmatrix}$
        $F P_0^+ F^T = \begin{bmatrix} 1.25 & 0 & 0.5 & 0 \\ 0 & 1.25 & 0 & 0.5 \\ 0.5 & 0 & 1 & 0 \\ 0 & 0.5 & 0 & 1 \end{bmatrix}$
        Finally, $P_1^- = \begin{bmatrix} 1.25 & 0 & 0.5 & 0 \\ 0 & 1.25 & 0 & 0.5 \\ 0.5 & 0 & 1 & 0 \\ 0 & 0.5 & 0 & 1 \end{bmatrix} + \begin{bmatrix} 0.1 & 0 & 0 & 0 \\ 0 & 0.1 & 0 & 0 \\ 0 & 0 & 0.1 & 0 \\ 0 & 0 & 0 & 0.1 \end{bmatrix} = \begin{bmatrix} 1.35 & 0 & 0.5 & 0 \\ 0 & 1.35 & 0 & 0.5 \\ 0.5 & 0 & 1.1 & 0 \\ 0 & 0.5 & 0 & 1.1 \end{bmatrix}$
    *   *Explanation:* Uncertainty has increased. The off-diagonal terms between position and velocity show that uncertainty in velocity contributes to uncertainty in position over time. Process noise further adds to the uncertainty.

**Step 2: Update Step (Measurement Update) for k=1**

2a. **Measurement Residual ($y_1$):**
    *   Formula: $y_k = z_k - H_k \hat{x}_k^-$
    *   Substitute values for $k=1$: $y_1 = z_1 - H \hat{x}_1^-$
    *   Given $z_1 = \begin{bmatrix} 1.0 \\ 0.8 \end{bmatrix}$
    *   Calculation:
        $y_1 = \begin{bmatrix} 1.0 \\ 0.8 \end{bmatrix} - \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \end{bmatrix} \begin{bmatrix} 0 \\ 0 \\ 0 \\ 0 \end{bmatrix}$
        $y_1 = \begin{bmatrix} 1.0 \\ 0.8 \end{bmatrix} - \begin{bmatrix} 0 \\ 0 \end{bmatrix} = \begin{bmatrix} 1.0 \\ 0.8 \end{bmatrix}$
    *   *Explanation:* We predicted the drone to be at (0,0), but the GPS measured (1.0, 0.8). The residual is the full measurement, as our prediction was zero.

2b. **Innovation Covariance ($S_1$):**
    *   Formula: $S_k = H_k P_k^- H_k^T + R_k$
    *   Substitute values for $k=1$: $S_1 = H P_1^- H^T + R$
    *   Calculation:
        $H P_1^- = \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \end{bmatrix} \begin{bmatrix} 1.35 & 0 & 0.5 & 0 \\ 0 & 1.35 & 0 & 0.5 \\ 0.5 & 0 & 1.1 & 0 \\ 0 & 0.5 & 0 & 1.1 \end{bmatrix} = \begin{bmatrix} 1.35 & 0 & 0.5 & 0 \\ 0 & 1.35 & 0 & 0.5 \end{bmatrix}$
        $H P_1^- H^T = \begin{bmatrix} 1.35 & 0 & 0.5 & 0 \\ 0 & 1.35 & 0 & 0.5 \end{bmatrix} \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \\ 0 & 0 \end{bmatrix} = \begin{bmatrix} 1.35 & 0 \\ 0 & 1.35 \end{bmatrix}$
        Finally, $S_1 = \begin{bmatrix} 1.35 & 0 \\ 0 & 1.35 \end{bmatrix} + \begin{bmatrix} 0.5 & 0 \\ 0 & 0.5 \end{bmatrix} = \begin{bmatrix} 1.85 & 0 \\ 0 & 1.85 \end{bmatrix}$
    *   *Explanation:* This is the total uncertainty in our measurement residual for x and y. It combines the predicted uncertainty in position (from $P_1^-$) and the GPS sensor's own noise ($R$).

2c. **Kalman Gain ($K_1$):**
    *   Formula: $K_k = P_k^- H_k^T S_k^{-1}$
    *   Substitute values for $k=1$: $K_1 = P_1^- H^T S_1^{-1}$
    *   Calculation:
        $H^T = \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \\ 0 & 0 \end{bmatrix}$
        $S_1^{-1} = \begin{bmatrix} 1/1.85 & 0 \\ 0 & 1/1.85 \end{bmatrix} \approx \begin{bmatrix} 0.5405 & 0 \\ 0 & 0.5405 \end{bmatrix}$
        $P_1^- H^T = \begin{bmatrix} 1.35 & 0 & 0.5 & 0 \\ 0 & 1.35 & 0 & 0.5 \\ 0.5 & 0 & 1.1 & 0 \\ 0 & 0.5 & 0 & 1.1 \end{bmatrix} \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \\ 0 & 0 \end{bmatrix} = \begin{bmatrix} 1.35 & 0 \\ 0 & 1.35 \\ 0.5 & 0 \\ 0 & 0.5 \end{bmatrix}$
        $K_1 = \begin{bmatrix} 1.35 & 0 \\ 0 & 1.35 \\ 0.5 & 0 \\ 0 & 0.5 \end{bmatrix} \begin{bmatrix} 0.5405 & 0 \\ 0 & 0.5405 \end{bmatrix} = \begin{bmatrix} 1.35 \cdot 0.5405 & 0 \\ 0 & 1.35 \cdot 0.5405 \\ 0.5 \cdot 0.5405 & 0 \\ 0 & 0.5 \cdot 0.5405 \end{bmatrix}$
        $K_1 = \begin{bmatrix} 0.7297 & 0 \\ 0 & 0.7297 \\ 0.2703 & 0 \\ 0 & 0.2703 \end{bmatrix}$
    *   *Explanation:* The Kalman gain is now a $4 \times 2$ matrix. The top left $2 \times 2$ block (0.7297 on diagonal) tells us how much to adjust position estimates based on position measurements. The bottom left $2 \times 2$ block (0.2703 on diagonal) tells us how much to adjust velocity estimates based on position measurements.

2d. **Updated State Estimate ($\hat{x}_1^+$):**
    *   Formula: $\hat{x}_k^+ = \hat{x}_k^- + K_k y_k$
    *   Substitute values for $k=1$: $\hat{x}_1^+ = \hat{x}_1^- + K_1 y_1$
    *   Calculation:
        $\hat{x}_1^+ = \begin{bmatrix} 0 \\ 0 \\ 0 \\ 0 \end{bmatrix} + \begin{bmatrix} 0.7297 & 0 \\ 0 & 0.7297 \\ 0.2703 & 0 \\ 0 & 0.2703 \end{bmatrix} \begin{bmatrix} 1.0 \\ 0.8 \end{bmatrix}$
        $\hat{x}_1^+ = \begin{bmatrix} 0 \\ 0 \\ 0 \\ 0 \end{bmatrix} + \begin{bmatrix} 0.7297 \cdot 1.0 + 0 \cdot 0.8 \\ 0 \cdot 1.0 + 0.7297 \cdot 0.8 \\ 0.2703 \cdot 1.0 + 0 \cdot 0.8 \\ 0 \cdot 1.0 + 0.2703 \cdot 0.8 \end{bmatrix}$
        $\hat{x}_1^+ = \begin{bmatrix} 0 \\ 0 \\ 0 \\ 0 \end{bmatrix} + \begin{bmatrix} 0.7297 \\ 0.5838 \\ 0.2703 \\ 0.2162 \end{bmatrix} = \begin{bmatrix} 0.7297 \\ 0.5838 \\ 0.2703 \\ 0.2162 \end{bmatrix}$
    *   *Explanation:* The estimated position is now (0.7297, 0.5838), a weighted average between the prediction (0,0) and measurement (1.0, 0.8). The estimated velocity is (0