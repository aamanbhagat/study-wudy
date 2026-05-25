## 1. What it is — in plain English

Imagine you're trying to track a frisbee thrown by a friend. You know roughly where it started, how fast it was going, and you get occasional glimpses (measurements) of its position. A standard Kalman Filter is excellent for this if the frisbee flies in a simple, predictable arc. It uses math to combine your prediction with your noisy observations to get the best estimate of where the frisbee is.

But what if the frisbee hits a tree branch and bounces off in a completely unpredictable way, or what if your friend throws it with a spin that makes it swerve wildly? The path is no longer a simple, straight-ish line; it's highly curved or non-linear. A standard Kalman Filter struggles here because it tries to approximate these complex curves with simple straight lines, which can lead to big errors.

The Unscented Kalman Filter (UKF) is like a smarter version of that tracking system for these tricky, non-linear situations. Instead of trying to draw a tangent line to a curve (which is what the Extended Kalman Filter, EKF, does), the UKF takes a few carefully chosen "sample points" around its current best guess. Think of it like sending out a small team of scouts in different directions around your current estimated location.

These "scouts" (called "sigma points") are then individually pushed through the *actual* complex, non-linear rules of how the frisbee moves. After they've all moved according to the real physics, the UKF looks at where all the scouts ended up. From their new positions, it calculates a new, better estimate of the frisbee's most likely position and how uncertain it is about that position. This method captures the true curvature of the system much better than simply drawing a straight line.

## 2. Why it matters — real-world applications

The ability to accurately estimate the state of a system (like position, velocity, orientation) when its behavior is non-linear is critical in many advanced engineering fields. The UKF offers a robust and often more accurate alternative to the Extended Kalman Filter (EKF) in these scenarios.

1.  **Autonomous Vehicles (Self-Driving Cars, Drones):** Companies like Waymo, Cruise, and various drone manufacturers use filters like the UKF for sensor fusion. A self-driving car needs to estimate its own precise position, velocity, and orientation (its "state") in 3D space, often by combining data from GPS, LiDAR, radar, and cameras. The relationship between these raw sensor measurements and the car's actual state is highly non-linear (e.g., converting radar range and bearing to Cartesian coordinates). The UKF helps maintain accurate localization even in complex environments with varying speeds and turns.
2.  **Spacecraft Navigation and Attitude Estimation:** When a satellite or rocket is in orbit, its movement and orientation (attitude) are governed by complex non-linear equations, including gravitational perturbations, thruster firings, and aerodynamic drag (for lower orbits). Furthermore, measurements from star trackers, sun sensors, and magnetometers are often non-linear functions of the spacecraft's attitude. The UKF is used by space agencies like NASA and ESA to precisely estimate and control the orientation of spacecraft, critical for pointing antennas, solar panels, and scientific instruments.
3.  **Robotics (Simultaneous Localization and Mapping - SLAM):** In robotics, especially for mobile robots exploring unknown environments, SLAM is a fundamental problem. The robot needs to build a map of its surroundings while simultaneously figuring out its own position within that map. The measurements (e.g., from laser rangefinders or cameras) and the robot's motion model are highly non-linear. UKF-based SLAM algorithms (or variants like FastSLAM which often incorporate UKF for individual particle updates) are employed in industrial robots, exploration rovers, and even advanced household robots to navigate and understand their environment.
4.  **Human Motion Tracking and Biomechanics:** In fields like sports science or medical rehabilitation, researchers often track human body movements using inertial measurement units (IMUs) or optical motion capture systems. The kinematics and dynamics of human joints are inherently non-linear. The UKF can be used to fuse data from multiple sensors to accurately estimate joint angles, velocities, and accelerations, providing insights into performance, injury risk, or rehabilitation progress.
5.  **Financial Modeling:** Beyond physical systems, the UKF finds application in quantitative finance. For instance, in estimating parameters for stochastic volatility models or interest rate models, the underlying dynamics can be highly non-linear. The UKF can provide more accurate state estimates and predictions compared to linearized filters, helping in risk management and option pricing.

## 3. Prerequisites — what you must know first

Before diving deep into the Unscented Kalman Filter, a solid understanding of several foundational concepts is essential. If any of these feel unfamiliar, pause and review them.

*   **Linear Algebra:**
    *   **Vectors and Matrices:** Operations like addition, subtraction, multiplication, transposition.
    *   **Matrix Inversion:** How to find the inverse of a matrix.
    *   **Covariance Matrices:** Understanding what a covariance matrix represents (how different variables in a vector vary together).
    *   **Eigenvalues and Eigenvectors:** (Helpful for understanding positive semi-definite matrices and the geometric interpretation of covariance, though not strictly required for basic UKF implementation).
*   **Probability & Statistics:**
    *   **Probability Distributions:** Especially the Gaussian (Normal) distribution, its mean and variance/covariance.
    *   **Expected Value:** The average value of a random variable.
    *   **Bayes' Theorem:** The fundamental principle of updating beliefs based on new evidence.
    *   **Random Variables:** Understanding the concept of uncertainty and how it's modeled.
*   **Calculus:**
    *   **Derivatives:** Understanding rates of change.
    *   **Taylor Series Expansion:** Crucial for understanding *why* the EKF linearizes and its limitations.
*   **Kalman Filter (KF):**
    *   **Core Concepts:** The KF's two main steps: Prediction (propagating the state estimate forward in time) and Update (correcting the estimate with measurements).
    *   **Linear System Model:** How the KF assumes linear state transitions and linear measurement functions.
    *   **State Vector ($x_k$):** What it represents.
    *   **Covariance Matrix ($P_k$):** How it represents uncertainty.
    *   **Process Noise ($Q$) and Measurement Noise ($R$):** Their role in modeling uncertainty.
*   **Extended Kalman Filter (EKF):**
    *   **Linearization via Jacobians:** How the EKF uses partial derivatives (Jacobian matrices) to approximate non-linear functions as linear ones around the current operating point.
    *   **Limitations of EKF:** Understanding that linearization introduces errors, especially for highly non-linear functions or large uncertainties.

## 4. The core idea — step by step

The Unscented Kalman Filter (UKF) addresses the limitations of the Extended Kalman Filter (EKF) by avoiding explicit linearization. Instead of approximating non-linear functions with tangents, it uses a deterministic sampling approach called the "Unscented Transform" to propagate the mean and covariance of a probability distribution through the non-linear functions.

### ### Step 1: The Problem with EKF (Linearization)

*   **Plain English Statement:** Imagine you have a blob of uncertainty (a Gaussian distribution) representing where you think a system is. If you pass this blob through a highly curved, non-linear function, the blob will warp and distort. The EKF tries to approximate this warping by finding the tangent line at the center of the blob and pushing only the center through that line. It then uses the slope of that line to estimate how the uncertainty (covariance) changes. This works okay if the curve is almost straight, but if the curve bends sharply, the tangent line is a poor representation, and the EKF's estimate of the new mean and uncertainty will be inaccurate.

*   **Small Concrete Example:** Consider a simple non-linear function $y = x^2$. If your current estimate for $x$ is $x_0 = 1$ with a small uncertainty, say $x \sim \mathcal{N}(1, 0.1^2)$, the EKF would linearize $f(x)=x^2$ around $x_0=1$. The derivative is $f'(x) = 2x$, so $f'(1) = 2$. The EKF would approximate $y \approx f(1) + f'(1)(x-1) = 1 + 2(x-1)$. If the uncertainty in $x$ is large, say $x \sim \mathcal{N}(1, 1^2)$, this linear approximation $y \approx 1+2(x-1)$ would be very poor for values of $x$ like $0$ or $2$, where $x^2$ is very different from $1+2(x-1)$.

*   **Formal/Mathematical Version:**
    The EKF predicts the state $x_k$ using a non-linear function $f$: $x_k = f(x_{k-1}, u_k) + w_k$, where $w_k$ is process noise. It linearizes $f$ around the current estimate $\hat{x}_{k-1|k-1}$ using a Taylor series expansion, keeping only the first-order terms. This involves computing the Jacobian matrix $F_k = \frac{\partial f}{\partial x}\Big|_{\hat{x}_{k-1|k-1}}$.
    The predicted mean is $\hat{x}_{k|k-1} = f(\hat{x}_{k-1|k-1}, u_k)$.
    The predicted covariance is $P_{k|k-1} = F_k P_{k-1|k-1} F_k^T + Q_k$.
    A similar linearization is done for the measurement function $h$.

*   **What Could Go Wrong:** The linear approximation might be valid only in a very small region around the mean. If the uncertainty (covariance) is large, or the non-linearity is severe, the linearization error can significantly degrade the filter's performance, leading to biased estimates or even divergence.

### ### Step 2: The UKF's Insight (Sigma Points)

*   **Plain English Statement:** Instead of linearizing, the UKF tries to capture the *shape* of the uncertainty distribution directly. It does this by deterministically picking a small, fixed number of points (called "sigma points") that symmetrically surround the current estimated mean. These points are specifically chosen so that their weighted mean and weighted covariance exactly match the current estimated mean and covariance of the state distribution. Think of it as creating a skeletal representation of your uncertainty blob.

*   **Small Concrete Example:** If your 1D state $x$ has a mean of $\mu=5$ and variance $\sigma^2=1$, a simple way to pick points might be $\mu$, $\mu+\sigma$, and $\mu-\sigma$. For the UKF, it's a bit more sophisticated, but the idea is the same: pick points that represent the mean and spread. For a 1D Gaussian, it might pick three points: one at the mean, and two others at a certain distance from the mean, scaled by the square root of the covariance.

*   **Formal/Mathematical Version:**
    Given a state vector $\hat{x}_{k-1|k-1}$ (mean) and its covariance $P_{k-1|k-1}$, we generate $2n+1$ sigma points, where $n$ is the dimension of the state vector.
    The sigma points $\mathcal{X}_{i,k-1|k-1}$ are generated as follows:
    $$ \mathcal{X}_{0,k-1|k-1} = \hat{x}_{k-1|k-1} $$
    $$ \mathcal{X}_{i,k-1|k-1} = \hat{x}_{k-1|k-1} + \left( \sqrt{(n+\lambda)P_{k-1|k-1}} \right)_i \quad \text{for } i=1, \dots, n $$
    $$ \mathcal{X}_{i,k-1|k-1} = \hat{x}_{k-1|k-1} - \left( \sqrt{(n+\lambda)P_{k-1|k-1}} \right)_{i-n} \quad \text{for } i=n+1, \dots, 2n $$
    Here, $\left( \sqrt{(n+\lambda)P} \right)_i$ denotes the $i$-th column of the matrix square root of $(n+\lambda)P$. The parameter $\lambda = \alpha^2(n+\kappa)-n$ helps control the spread of the sigma points. $\alpha$ and $\kappa$ are scaling parameters, and $\alpha$ is usually a small positive value (e.g., $10^{-3}$), $\kappa$ is often $0$ or $3-n$. There are also associated weights $W_i^m$ (for mean) and $W_i^c$ (for covariance) for each sigma point.

*   **What Could Go Wrong:** Incorrectly calculating the matrix square root (e.g., Cholesky decomposition) or using inappropriate scaling parameters ($\alpha, \beta, \kappa$) can lead to poorly distributed sigma points that don't accurately represent the distribution.

### ### Step 3: Propagating Sigma Points (Nonlinear Transformation)

*   **Plain English Statement:** Once you have your "scout team" of sigma points, you don't approximate their movement. Instead, you send *each individual scout* through the *actual, full, non-linear system equations*. This is the key difference from EKF. Each point gets transformed according to the true physics of the system, not a linearized approximation.

*   **Small Concrete Example:** If your non-linear function is $f(x) = x^2$, and your sigma points are $\mathcal{X}_0=5$, $\mathcal{X}_1=4$, $\mathcal{X}_2=6$, you would simply calculate:
    $f(\mathcal{X}_0) = 5^2 = 25$
    $f(\mathcal{X}_1) = 4^2 = 16$
    $f(\mathcal{X}_2) = 6^2 = 36$
    You apply the *exact* non-linear function to each point.

*   **Formal/Mathematical Version:**
    Each sigma point $\mathcal{X}_{i,k-1|k-1}$ is transformed through the non-linear state transition function $f$:
    $$ \mathcal{X}_{i,k|k-1} = f(\mathcal{X}_{i,k-1|k-1}, u_k) \quad \text{for } i=0, \dots, 2n $$
    where $u_k$ is the control input at time $k$.

*   **What Could Go Wrong:** Errors in the non-linear system model $f$ itself will directly propagate through the sigma points, leading to an inaccurate representation of the future state. Also, if the non-linear function is discontinuous or poorly behaved, numerical issues can arise.

### ### Step 4: Reconstructing Mean and Covariance (Prediction Step)

*   **Plain English Statement:** After all the sigma points have been individually transformed by the non-linear function, they will be spread out in a new, potentially non-Gaussian way. The UKF then treats these transformed points as samples from the new, warped distribution. It calculates a new weighted mean (the predicted state) and a new weighted covariance (the predicted uncertainty) from these transformed points. This effectively captures the non-linear transformation of the original uncertainty distribution.

*   **Small Concrete Example:** Following the previous example, if your transformed points are $f(\mathcal{X}_0)=25$, $f(\mathcal{X}_1)=16$, $f(\mathcal{X}_2)=36$, and their weights are $W_0=0.5$, $W_1=0.25$, $W_2=0.25$, then the new mean would be $0.5 \times 25 + 0.25 \times 16 + 0.25 \times 36 = 12.5 + 4 + 9 = 25.5$. A new covariance would also be calculated based on these points and their weights.

*   **Formal/Mathematical Version:**
    The predicted state mean $\hat{x}_{k|k-1}$ is computed as the weighted sum of the transformed sigma points:
    $$ \hat{x}_{k|k-1} = \sum_{i=0}^{2n} W_i^m \mathcal{X}_{i,k|k-1} $$
    The predicted state covariance $P_{k|k-1}$ is computed as the weighted sum of the outer products of the deviations of the transformed sigma points from the predicted mean, plus the process noise covariance $Q_k$:
    $$ P_{k|k-1} = \sum_{i=0}^{2n} W_i^c (\mathcal{X}_{i,k|k-1} - \hat{x}_{k|k-1})(\mathcal{X}_{i,k|k-1} - \hat{x}_{k|k-1})^T + Q_k $$
    The weights $W_i^m$ and $W_i^c$ are specific to the Unscented Transform and depend on $n, \lambda, \alpha, \beta$.
    For $i=0$: $W_0^m = \frac{\lambda}{n+\lambda}$, $W_0^c = \frac{\lambda}{n+\lambda} + (1-\alpha^2+\beta)$.
    For $i=1, \dots, 2n$: $W_i^m = W_i^c = \frac{1}{2(n+\lambda)}$.

*   **What Could Go Wrong:** Incorrectly applying the weights or forgetting to add the process noise covariance $Q_k$ will lead to an inaccurate prediction of uncertainty. The choice of $\beta$ (which is typically $2$ for Gaussian distributions) is important for covariance accuracy.

### ### Step 5: Measurement Update (Kalman Gain)

*   **Plain English Statement:** This step is similar in spirit to the standard Kalman Filter update. We have a predicted state and its uncertainty from Step 4. Now, we get a new measurement. We need to compare our prediction with this measurement to refine our estimate. Just like in the prediction step, we use sigma points to propagate our state uncertainty through the *non-linear measurement function* $h$. We calculate a predicted measurement and its covariance, then use these to compute the Kalman gain, which tells us how much to trust the new measurement versus our prediction.

*   **Small Concrete Example:** If your non-linear measurement function is $z = \sqrt{x^2+y^2}$ (distance from origin), and you have transformed sigma points for $(x,y)$, you would apply this $\sqrt{x^2+y^2}$ to each of them to get predicted measurements. Then, you'd calculate the mean and covariance of these predicted measurements.

*   **Formal/Mathematical Version:**
    1.  **Generate sigma points for augmented state:** For the measurement update, it's often useful to augment the state with noise terms to properly account for their covariance. However, for simplicity here, we'll assume the sigma points $\mathcal{X}_{i,k|k-1}$ from the prediction step are used.
    2.  **Propagate sigma points through measurement function:** Each predicted sigma point $\mathcal{X}_{i,k|k-1}$ is transformed through the non-linear measurement function $h$:
        $$ \mathcal{Z}_{i,k|k-1} = h(\mathcal{X}_{i,k|k-1}) \quad \text{for } i=0, \dots, 2n $$
    3.  **Calculate predicted measurement mean:**
        $$ \hat{z}_{k|k-1} = \sum_{i=0}^{2n} W_i^m \mathcal{Z}_{i,k|k-1} $$
    4.  **Calculate innovation (measurement) covariance:** This is the covariance of the predicted measurements, plus the measurement noise covariance $R_k$.
        $$ P_{zz,k} = \sum_{i=0}^{2n} W_i^c (\mathcal{Z}_{i,k|k-1} - \hat{z}_{k|k-1})(\mathcal{Z}_{i,k|k-1} - \hat{z}_{k|k-1})^T + R_k $$
    5.  **Calculate cross-covariance between state and measurement:**
        $$ P_{xz,k} = \sum_{i=0}^{2n} W_i^c (\mathcal{X}_{i,k|k-1} - \hat{x}_{k|k-1})(\mathcal{Z}_{i,k|k-1} - \hat{z}_{k|k-1})^T $$
    6.  **Calculate Kalman Gain:**
        $$ K_k = P_{xz,k} P_{zz,k}^{-1} $$
    7.  **Update state estimate:**
        $$ \hat{x}_{k|k} = \hat{x}_{k|k-1} + K_k (z_k - \hat{z}_{k|k-1}) $$
    8.  **Update state covariance:**
        $$ P_{k|k} = P_{k|k-1} - K_k P_{zz,k} K_k^T $$

*   **What Could Go Wrong:** An incorrect measurement model $h$ or an inaccurate measurement noise covariance $R_k$ can lead to poor updates. Numerical instability can occur if $P_{zz,k}$ is ill-conditioned and cannot be inverted.

### ### Step 6: The Unscented Transform (General Idea)

*   **Plain English Statement:** The entire process described in Steps 2-4 (generating sigma points, passing them through a non-linear function, and then reconstructing the mean and covariance) is known as the "Unscented Transform." It's a general method for propagating the mean and covariance of a random variable through an arbitrary non-linear function. The UKF simply applies this Unscented Transform twice: once for the state prediction through the system dynamics, and once for the measurement prediction through the measurement model.

*   **Small Concrete Example:** If you want to know the mean and covariance of $y = \sin(x)$ where $x \sim \mathcal{N}(\mu_x, \Sigma_x)$, you'd use the Unscented Transform. Generate sigma points for $x$, apply $\sin(\cdot)$ to each, then reconstruct the mean and covariance of $y$ from the transformed points.

*   **Formal/Mathematical Version:**
    Let $X$ be a random variable with mean $\bar{x}$ and covariance $P_x$. Let $y = g(X)$ be a non-linear transformation. The Unscented Transform approximates the mean $\bar{y}$ and covariance $P_y$ of $Y$ as follows:
    1.  Generate sigma points $\mathcal{X}_i$ and their weights $W_i^m, W_i^c$ from $\bar{x}, P_x$.
    2.  Transform each sigma point: $\mathcal{Y}_i = g(\mathcal{X}_i)$.
    3.  Compute approximate mean: $\bar{y} = \sum_i W_i^m \mathcal{Y}_i$.
    4.  Compute approximate covariance: $P_y = \sum_i W_i^c (\mathcal{Y}_i - \bar{y})(\mathcal{Y}_i - \bar{y})^T$.

*   **What Could Go Wrong:** The Unscented Transform is exact for linear transformations and accurate to the 3rd order (Taylor series) for non-linear transformations for Gaussian inputs. It is not perfect, especially if the underlying distribution is highly non-Gaussian, or if the non-linear function has very sharp discontinuities or multiple modes.

## 5. Worked examples — multiple, with every step shown

Let's illustrate the UKF with a few examples. We'll start simple and build complexity.

### Example 1: 1D State, Non-linear Dynamics

**Problem Statement:**
Consider a 1D system with a non-linear dynamics model:
$x_k = x_{k-1}^2 + q_k$
where $q_k \sim \mathcal{N}(0, Q)$ is process noise.
We have an initial estimate for the state at $k=0$: $\hat{x}_{0|0} = 1.5$ and $P_{0|0} = 0.1$.
The process noise covariance is $Q = 0.05$.
We want to predict the state $\hat{x}_{1|0}$ and its covariance $P_{1|0}$ at time $k=1$.

**What's Given:**
*   Initial state estimate: $\hat{x}_{0|0} = 1.5$
*   Initial covariance: $P_{0|0} = 0.1$
*   Process noise covariance: $Q = 0.05$
*   Non-linear dynamics function: $f(x) = x^2$
*   State dimension $n=1$.
*   UKF parameters: Let's use $\alpha=1$, $\beta=2$, $\kappa=0$.
    *   This gives $\lambda = \alpha^2(n+\kappa)-n = 1^2(1+0)-1 = 0$.
    *   Weights for mean: $W_0^m = \frac{\lambda}{n+\lambda} = \frac{0}{1+0} = 0$.
    *   Weights for covariance: $W_0^c = \frac{\lambda}{n+\lambda} + (1-\alpha^2+\beta) = 0 + (1-1^2+2) = 2$.
    *   For $i=1, 2$: $W_i^m = W_i^c = \frac{1}{2(n+\lambda)} = \frac{1}{2(1+0)} = 0.5$.

**What We Want:**
*   Predicted state mean $\hat{x}_{1|0}$
*   Predicted state covariance $P_{1|0}$

---

**Step-by-Step Solution:**

**1. Generate Sigma Points:**
We have $n=1$ (1D state), so we'll generate $2n+1 = 3$ sigma points.
The formula for sigma points is:
$\mathcal{X}_0 = \hat{x}$
$\mathcal{X}_1 = \hat{x} + \sqrt{(n+\lambda)P}$
$\mathcal{X}_2 = \hat{x} - \sqrt{(n+\lambda)P}$

First, calculate the scaling factor $\sqrt{(n+\lambda)P}$:
$$ \sqrt{(n+\lambda)P_{0|0}} = \sqrt{(1+0) \times 0.1} = \sqrt{0.1} \approx 0.3162 $$
Now, generate the sigma points:
$$ \mathcal{X}_{0,0|0} = \hat{x}_{0|0} = 1.5 $$
This is the central sigma point, equal to the current mean.
$$ \mathcal{X}_{1,0|0} = \hat{x}_{0|0} + \sqrt{(n+\lambda)P_{0|0}} = 1.5 + 0.3162 = 1.8162 $$
This is the first positive deviation sigma point.
$$ \mathcal{X}_{2,0|0} = \hat{x}_{0|0} - \sqrt{(n+\lambda)P_{0|0}} = 1.5 - 0.3162 = 1.1838 $$
This is the first negative deviation sigma point.

**2. Propagate Sigma Points through Non-linear Dynamics:**
Apply the non-linear function $f(x) = x^2$ to each sigma point.
$$ \mathcal{X}_{0,1|0} = f(\mathcal{X}_{0,0|0}) = (1.5)^2 = 2.25 $$
The central point transformed.
$$ \mathcal{X}_{1,1|0} = f(\mathcal{X}_{1,0|0}) = (1.8162)^2 = 3.2986 $$
The positive deviation point transformed.
$$ \mathcal{X}_{2,1|0} = f(\mathcal{X}_{2,0|0}) = (1.1838)^2 = 1.4013 $$
The negative deviation point transformed.

**3. Reconstruct Predicted Mean:**
Use the weighted sum of the transformed sigma points:
$$ \hat{x}_{1|0} = \sum_{i=0}^{2n} W_i^m \mathcal{X}_{i,1|0} $$
Recall $W_0^m = 0$, $W_1^m = 0.5$, $W_2^m = 0.5$.
$$ \hat{x}_{1|0} = W_0^m \mathcal{X}_{0,1|0} + W_1^m \mathcal{X}_{1,1|0} + W_2^m \mathcal{X}_{2,1|0} $$
$$ \hat{x}_{1|0} = (0)(2.25) + (0.5)(3.2986) + (0.5)(1.4013) $$
$$ \hat{x}_{1|0} = 0 + 1.6493 + 0.70065 = 2.34995 $$
This is our predicted mean state for the next time step.

**4. Reconstruct Predicted Covariance:**
Use the weighted sum of the outer products of deviations from the predicted mean, plus process noise:
$$ P_{1|0} = \sum_{i=0}^{2n} W_i^c (\mathcal{X}_{i,1|0} - \hat{x}_{1|0})(\mathcal{X}_{i,1|0} - \hat{x}_{1|0})^T + Q $$
Recall $W_0^c = 2$, $W_1^c = 0.5$, $W_2^c = 0.5$.
First, calculate the deviations:
$$ \mathcal{X}_{0,1|0} - \hat{x}_{1|0} = 2.25 - 2.34995 = -0.09995 $$
$$ \mathcal{X}_{1,1|0} - \hat{x}_{1|0} = 3.2986 - 2.34995 = 0.94865 $$
$$ \mathcal{X}_{2,1|0} - \hat{x}_{1|0} = 1.4013 - 2.34995 = -0.94865 $$
Now, compute the weighted sum of squared deviations (since it's 1D, outer product is just squaring):
$$ P_{1|0} = (2)(-0.09995)^2 + (0.5)(0.94865)^2 + (0.5)(-0.94865)^2 + Q $$
$$ P_{1|0} = (2)(0.00999) + (0.5)(0.9006) + (0.5)(0.9006) + 0.05 $$
$$ P_{1|0} = 0.01998 + 0.4503 + 0.4503 + 0.05 $$
$$ P_{1|0} = 0.97058 $$
This is our predicted covariance for the next time step.

---

**Final Answer:**
The predicted state mean is $\boxed{\hat{x}_{1|0} = 2.350}$
The predicted state covariance is $\boxed{P_{1|0} = 0.971}$

**Reflection:**
This example shows how the UKF captures the non-linear transformation. Notice that the mean $1.5^2 = 2.25$ is not the predicted mean $2.35$. This is because the squaring function $x^2$ is convex, which shifts the mean of the transformed distribution upwards. The EKF, by linearizing around $1.5$, would predict $2.25$ as the mean, which would be biased. The UKF, by sampling points across the distribution, correctly captures this shift. The covariance also increased significantly due to the non-linearity spreading out the points.

---

### Example 2: 2D State, Non-linear Measurement

**Problem Statement:**
A robot's 2D position is described by state vector $x = [p_x, p_y]^T$.
At time $k$, its estimated state is $\hat{x}_{k|k} = [1.0, 2.0]^T$ and its covariance is $P_{k|k} = \begin{pmatrix} 0.1 & 0 \\ 0 & 0.2 \end{pmatrix}$.
The robot takes a measurement $z_k$ which is its distance from the origin:
$z_k = \sqrt{p_x^2 + p_y^2} + r_k$
where $r_k \sim \mathcal{N}(0, R)$ is measurement noise with $R = 0.01$.
A new measurement $z_k = 2.5$ is received.
We want to perform the measurement update step of the UKF.

**What's Given:**
*   Predicted state mean (from previous prediction step): $\hat{x}_{k|k-1} = [1.0, 2.0]^T$
*   Predicted state covariance: $P_{k|k-1} = \begin{pmatrix} 0.1 & 0 \\ 0 & 0.2 \end{pmatrix}$
*   Measurement noise covariance: $R = 0.01$
*   Non-linear measurement function: $h(p_x, p_y) = \sqrt{p_x^2 + p_y^2}$
*   Actual measurement: $z_k = 2.5$
*   State dimension $n=2$.
*   UKF parameters: Let's use $\alpha=1$, $\beta=2$, $\kappa=0$.
    *   This gives $\lambda = \alpha^2(n+\kappa)-n = 1^2(2+0)-2 = 0$.
    *   Weights for mean: $W_0^m = \frac{\lambda}{n+\lambda} = \frac{0}{2+0} = 0$.
    *   Weights for covariance: $W_0^c = \frac{\lambda}{n+\lambda} + (1-\alpha^2+\beta) = 0 + (1-1^2+2) = 2$.
    *   For $i=1, \dots, 2n$: $W_i^m = W_i^c = \frac{1}{2(n+\lambda)} = \frac{1}{2(2+0)} = 0.25$.

**What We Want:**
*   Updated state mean $\hat{x}_{k|k}$
*   Updated state covariance $P_{k|k}$

---

**Step-by-Step Solution:**

**1. Generate Sigma Points (for the predicted state):**
We have $n=2$ (2D state), so we'll generate $2n+1 = 5$ sigma points.
The formula for sigma points uses $\sqrt{(n+\lambda)P_{k|k-1}}$.
$$ (n+\lambda)P_{k|k-1} = (2+0) \begin{pmatrix} 0.1 & 0 \\ 0 & 0.2 \end{pmatrix} = \begin{pmatrix} 0.2 & 0 \\ 0 & 0.4 \end{pmatrix} $$
Now, calculate the matrix square root. For a diagonal matrix, this is simply taking the square root of each diagonal element:
$$ \sqrt{(n+\lambda)P_{k|k-1}} = \begin{pmatrix} \sqrt{0.2} & 0 \\ 0 & \sqrt{0.4} \end{pmatrix} \approx \begin{pmatrix} 0.4472 & 0 \\ 0 & 0.6325 \end{pmatrix} $$
Let $S = \sqrt{(n+\lambda)P_{k|k-1}}$. Its columns are $S_1 = [0.4472, 0]^T$ and $S_2 = [0, 0.6325]^T$.

Now, generate the sigma points $\mathcal{X}_{i,k|k-1}$:
$$ \mathcal{X}_{0,k|k-1} = \hat{x}_{k|k-1} = \begin{pmatrix} 1.0 \\ 2.0 \end{pmatrix} $$
$$ \mathcal{X}_{1,k|k-1} = \hat{x}_{k|k-1} + S_1 = \begin{pmatrix} 1.0 \\ 2.0 \end{pmatrix} + \begin{pmatrix} 0.4472 \\ 0 \end{pmatrix} = \begin{pmatrix} 1.4472 \\ 2.0 \end{pmatrix} $$
$$ \mathcal{X}_{2,k|k-1} = \hat{x}_{k|k-1} + S_2 = \begin{pmatrix} 1.0 \\ 2.0 \end{pmatrix} + \begin{pmatrix} 0 \\ 0.6325 \end{pmatrix} = \begin{pmatrix} 1.0 \\ 2.6325 \end{pmatrix} $$
$$ \mathcal{X}_{3,k|k-1} = \hat{x}_{k|k-1} - S_1 = \begin{pmatrix} 1.0 \\ 2.0 \end{pmatrix} - \begin{pmatrix} 0.4472 \\ 0 \end{pmatrix} = \begin{pmatrix} 0.5528 \\ 2.0 \end{pmatrix} $$
$$ \mathcal{X}_{4,k|k-1} = \hat{x}_{k|k-1} - S_2 = \begin{pmatrix} 1.0 \\ 2.0 \end{pmatrix} - \begin{pmatrix} 0 \\ 0.6325 \end{pmatrix} = \begin{pmatrix} 1.0 \\ 1.3675 \end{pmatrix} $$

**2. Propagate Sigma Points through Non-linear Measurement Function:**
Apply $h(p_x, p_y) = \sqrt{p_x^2 + p_y^2}$ to each sigma point to get $\mathcal{Z}_{i,k|k-1}$.
$$ \mathcal{Z}_{0,k|k-1} = \sqrt{(1.0)^2 + (2.0)^2} = \sqrt{1+4} = \sqrt{5} \approx 2.2361 $$
$$ \mathcal{Z}_{1,k|k-1} = \sqrt{(1.4472)^2 + (2.0)^2} = \sqrt{2.0949 + 4} = \sqrt{6.0949} \approx 2.4688 $$
$$ \mathcal{Z}_{2,k|k-1} = \sqrt{(1.0)^2 + (2.6325)^2} = \sqrt{1 + 6.9309} = \sqrt{7.9309} \approx 2.8162 $$
$$ \mathcal{Z}_{3,k|k-1} = \sqrt{(0.5528)^2 + (2.0)^2} = \sqrt{0.3056 + 4} = \sqrt{4.3056} \approx 2.0749 $$
$$ \mathcal{Z}_{4,k|k-1} = \sqrt{(1.0)^2 + (1.3675)^2} = \sqrt{1 + 1.8701} = \sqrt{2.8701} \approx 1.6941 $$

**3. Calculate Predicted Measurement Mean:**
Use the weighted sum of the transformed measurement sigma points:
$$ \hat{z}_{k|k-1} = \sum_{i=0}^{2n} W_i^m \mathcal{Z}_{i,k|k-1} $$
Recall $W_0^m = 0$, $W_i^m = 0.25$ for $i=1, \dots, 4$.
$$ \hat{z}_{k|k-1} = (0)(2.2361) + (0.25)(2.4688) + (0.25)(2.8162) + (0.25)(2.0749) + (0.25)(1.6941) $$
$$ \hat{z}_{k|k-1} = 0 + 0.6172 + 0.70405 + 0.518725 + 0.423525 = 2.2635 $$
This is the UKF's predicted measurement. Note the actual measurement is $z_k=2.5$.

**4. Calculate Innovation (Measurement) Covariance ($P_{zz,k}$):**
$$ P_{zz,k} = \sum_{i=0}^{2n} W_i^c (\mathcal{Z}_{i,k|k-1} - \hat{z}_{k|k-1})^2 + R $$
Recall $W_0^c = 2$, $W_i^c = 0.25$ for $i=1, \dots, 4$.
$$ \text{Deviations: } $$
$$ \mathcal{Z}_{0,k|k-1} - \hat{z}_{k|k-1} = 2.2361 - 2.2635 = -0.0274 $$
$$ \mathcal{Z}_{1,k|k-1} - \hat{z}_{k|k-1} = 2.4688 - 2.2635 = 0.2053 $$
$$ \mathcal{Z}_{2,k|k-1} - \hat{z}_{k|k-1} = 2.8162 - 2.2635 = 0.5527 $$
$$ \mathcal{Z}_{3,k|k-1} - \hat{z}_{k|k-1} = 2.0749 - 2.2635 = -0.1886 $$
$$ \mathcal{Z}_{4,k|k-1} - \hat{z}_{k|k-1} = 1.6941 - 2.2635 = -0.5694 $$
$$ P_{zz,k} = (2)(-0.0274)^2 + (0.25)(0.2053)^2 + (0.25)(0.5527)^2 + (0.25)(-0.1886)^2 + (0.25)(-0.5694)^2 + R $$
$$ P_{zz,k} = (2)(0.00075076) + (0.25)(0.042148) + (0.25)(0.305478) + (0.25)(0.035569) + (0.25)(0.324216) + 0.01 $$
$$ P_{zz,k} = 0.00150152 + 0.010537 + 0.0763695 + 0.00889225 + 0.081054 + 0.01 $$
$$ P_{zz,k} = 0.18835427 $$
This is the covariance of the predicted measurement, including measurement noise.

**5. Calculate Cross-Covariance ($P_{xz,k}$):**
This is the covariance between the state sigma points and the transformed measurement sigma points.
$$ P_{xz,k} = \sum_{i=0}^{2n} W_i^c (\mathcal{X}_{i,k|k-1} - \hat{x}_{k|k-1})(\mathcal{Z}_{i,k|k-1} - \hat{z}_{k|k-1})^T $$
Recall $W_0^c = 2$, $W_i^c = 0.25$ for $i=1, \dots, 4$.
Let $\delta \mathcal{X}_i = \mathcal{X}_{i,k|k-1} - \hat{x}_{k|k-1}$ and $\delta \mathcal{Z}_i = \mathcal{Z}_{i,k|k-1} - \hat{z}_{k|k-1}$.
$$ \delta \mathcal{X}_0 = \begin{pmatrix} 0 \\ 0 \end{pmatrix} $$
$$ \delta \mathcal{X}_1 = \begin{pmatrix} 0.4472 \\ 0 \end{pmatrix} $$
$$ \delta \mathcal{X}_2 = \begin{pmatrix} 0 \\ 0.6325 \end{pmatrix} $$
$$ \delta \mathcal{X}_3 = \begin{pmatrix} -0.4472 \\ 0 \end{pmatrix} $$
$$ \delta \mathcal{X}_4 = \begin{pmatrix} 0 \\ -0.6325 \end{pmatrix} $$
$$ P_{xz,k} = W_0^c \delta \mathcal{X}_0 \delta \mathcal{Z}_0^T + W_1^c \delta \mathcal{X}_1 \delta \mathcal{Z}_1^T + W_2^c \delta \mathcal{X}_2 \delta \mathcal{Z}_2^T + W_3^c \delta \mathcal{X}_3 \delta \mathcal{Z}_3^T + W_4^c \delta \mathcal{X}_4 \delta \mathcal{Z}_4^T $$
$$ P_{xz,k} = (2)\begin{pmatrix} 0 \\ 0 \end{pmatrix}(-0.0274) + (0.25)\begin{pmatrix} 0.4472 \\ 0 \end{pmatrix}(0.2053) + (0.25)\begin{pmatrix} 0 \\ 0.6325 \end{pmatrix}(0.5527) + (0.25)\begin{pmatrix} -0.4472 \\ 0 \end{pmatrix}(-0.1886) + (0.25)\begin{pmatrix} 0 \\ -0.6325 \end{pmatrix}(-0.5694) $$
$$ P_{xz,k} = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix} + \begin{pmatrix} 0.0229 \\ 0 \end{pmatrix} + \begin{pmatrix} 0 \\ 0.0874 \end{pmatrix} + \begin{pmatrix} 0.0211 \\ 0 \end{pmatrix} + \begin{pmatrix} 0 \\ 0.0902 \end{pmatrix} $$
$$ P_{xz,k} = \begin{pmatrix} 0.0229+0.0211 & 0 \\ 0 & 0.0874+0.0902 \end{pmatrix} = \begin{pmatrix} 0.0440 \\ 0.1776 \end{pmatrix} $$
This is a column vector (since $x$ is $2 \times 1$ and $z$ is $1 \times 1$, $P_{xz}$ is $2 \times 1$).

**6. Calculate Kalman Gain ($K_k$):**
$$ K_k = P_{xz,k} P_{zz,k}^{-1} $$
$$ K_k = \begin{pmatrix} 0.0440 \\ 0.1776 \end{pmatrix} (0.18835427)^{-1} = \begin{pmatrix} 0.0440 \\ 0.1776 \end{pmatrix} (5.3091) $$
$$ K_k = \begin{pmatrix} 0.0440 \times 5.3091 \\ 0.1776 \times 5.3091 \end{pmatrix} = \begin{pmatrix} 0.2336 \\ 0.9429 \end{pmatrix} $$
This is the Kalman Gain, a $2 \times 1$ vector.

**7. Update State Estimate ($\hat{x}_{k|k}$):**
$$ \hat{x}_{k|k} = \hat{x}_{k|k-1} + K_k (z_k - \hat{z}_{k|k-1}) $$
$$ \hat{x}_{k|k} = \begin{pmatrix} 1.0 \\ 2.0 \end{pmatrix} + \begin{pmatrix} 0.2336 \\ 0.9429 \end{pmatrix} (2.5 - 2.2635) $$
$$ \hat{x}_{k|k} = \begin{pmatrix} 1.0 \\ 2.0 \end{pmatrix} + \begin{pmatrix} 0.2336 \\ 0.9429 \end{pmatrix} (0.2365) $$
$$ \hat{x}_{k|k} = \begin{pmatrix} 1.0 \\ 2.0 \end{pmatrix} + \begin{pmatrix} 0.2336 \times 0.2365 \\ 0.9429 \times 0.2365 \end{pmatrix} = \begin{pmatrix} 1.0 \\ 2.0 \end{pmatrix} + \begin{pmatrix} 0.0552 \\ 0.2229 \end{pmatrix} $$
$$ \hat{x}_{k|k} = \begin{pmatrix} 1.0552 \\ 2.2229 \end{pmatrix} $$
This is our updated state estimate.

**8. Update State Covariance ($P_{k|k}$):**
$$ P_{k|k} = P_{k|k-1} - K_k P_{zz,k} K_k^T $$
$$ P_{k|k} = \begin{pmatrix} 0.1 & 0 \\ 0 & 0.2 \end{pmatrix} - \begin{pmatrix} 0.2336 \\ 0.9429 \end{pmatrix} (0.18835427) \begin{pmatrix} 0.2336 & 0.9429 \end{pmatrix} $$
First, calculate $K_k P_{zz,k} K_k^T$:
$$ \begin{pmatrix} 0.2336 \\ 0.9429 \end{pmatrix} (0.18835427) \begin{pmatrix} 0.2336 & 0.9429 \end{pmatrix} = \begin{pmatrix} 0.04399 & 0.1776 \\ 0.1776 & 0.7163 \end{pmatrix} \times 0.18835427 $$
$$ \begin{pmatrix} 0.04399 \times 0.18835427 & 0.1776 \times 0.18835427 \\ 0.1776 \times 0.18835427 & 0.7163 \times 0.18835427 \end{pmatrix} = \begin{pmatrix} 0.00828 & 0.03346 \\ 0.03346 & 0.13490 \end{pmatrix} $$
Now subtract from $P_{k|k-1}$:
$$ P_{k|k} = \begin{pmatrix} 0.1 & 0 \\ 0 & 0.2 \end{pmatrix} - \begin{pmatrix} 0.00828 & 0.03346 \\ 0.03346 & 0.13490 \end{pmatrix} $$
$$ P_{k|k} = \begin{pmatrix} 0.1 - 0.00828 & 0 - 0.03346 \\ 0 - 0.03346 & 0.2 - 0.13490 \end{pmatrix} = \begin{pmatrix} 0.09172 & -0.03346 \\ -0.03346 & 0.06510 \end{pmatrix} $$
This is our updated state covariance.

---

**Final Answer:**
The updated state mean is $\boxed{\hat{x}_{k|k} = \begin{pmatrix} 1.055 \\ 2.223 \end{pmatrix}}$
The updated state covariance is $\boxed{P_{k|k} = \begin{pmatrix} 0.0917 & -0.0335 \\ -0.0335 & 0.0651 \end{pmatrix}}$

**Reflection:**
The update shifted the estimated position from $[1.0, 2.0]^T$ to $[1.055, 2.223]^T$. The original predicted distance from the origin was $\hat{z}_{k|k-1} = 2.2635$, while the actual measurement was $2.5$. The filter moved the estimate in a direction that increases the estimated distance, making it closer to the measurement. The covariance matrix also changed, showing a reduction in uncertainty and a negative correlation between $p_x$ and $p_y$, meaning if $p_x$ is slightly higher than its mean, $p_y$ is likely slightly lower, and vice-versa, to maintain the measured distance.

---

### Example 3: Full UKF Prediction Step (2D State, Non-linear Dynamics)

**Problem Statement:**
Consider a 2D state $x = [p_x, p_y]^T$ where a vehicle moves in a 2D plane.
The dynamics are given by a non-linear model, for instance, a constant turn rate and velocity (CTRV) model simplified for 2D position only:
$p_{x,k} = p_{x,k-1} + v_k \Delta t \cos(\theta_{k-1} + \omega \Delta t / 2)$
$p_{y,k} = p_{y,k-1} + v_k \Delta t \sin(\theta_{k-1} + \omega \Delta t / 2)$
where $v_k$ is velocity, $\theta_{k-1}$ is heading, $\omega$ is turn rate.
For this example, let's simplify the state to $[p_x, p_y]^T$ and assume the non-linear dynamics are:
$p_{x,k} = p_{x,k-1} + \sin(p_{y,k-1}) \Delta t$
$p_{y,k} = p_{y,k-1} + \cos(p_{x,k-1}) \Delta t$
Let $\Delta t = 1$ second.
Initial state estimate: $\hat{x}_{0|0} = [0.5, 0.5]^T$
Initial covariance: $P_{0|0} = \begin{pmatrix} 0.05 & 0 \\ 0 & 0.05 \end{pmatrix}$
Process noise covariance: $Q = \begin{pmatrix} 0.01 & 0 \\ 0 & 0.01 \end{pmatrix}$

**What's Given:**
*   Initial state estimate: $\hat{x}_{0|0} = [0.5, 0.5]^T$
*   Initial covariance: $P_{0|0} = \begin{pmatrix} 0.05 & 0 \\ 0 & 0.05 \end{pmatrix}$
*   Process noise covariance: $Q = \begin{pmatrix} 0.01 & 0 \\ 0 & 0.01 \end{pmatrix}$
*   Non-linear dynamics function: $f(x) = \begin{pmatrix} x_1 + \sin(x_2) \\ x_2 + \cos(x_1) \end{pmatrix}$ (since $\Delta t = 1$)
*   State dimension $n=2$.
*   UKF parameters: $\alpha=1$, $\beta=2$, $\kappa=0$. (Same as Example 2).
    *   $W_0^m = 0$, $W_0^c = 2$.
    *   $W_i^m = W_i^c = 0.25$ for $i=1, \dots, 4$.

**What We Want:**
*   Predicted state mean $\hat{x}_{1|0}$
*   Predicted state covariance $P_{1|0}$

---

**Step-by-Step Solution:**

**1. Generate Sigma Points:**
We have $n=2$, so $2n+1 = 5$ sigma points.
Calculate $(n+\lambda)P_{0|0}$:
$$ (2+0) \begin{pmatrix} 0.05 & 0 \\ 0 & 0.05 \end{pmatrix} = \begin{pmatrix} 0.1 & 0 \\ 0 & 0.1 \end{pmatrix} $$
Matrix square root $S = \sqrt{(n+\lambda)P_{0|0}}$:
$$ S = \begin{pmatrix} \sqrt{0.1} & 0 \\ 0 & \sqrt{0.1} \end{pmatrix} \approx \begin{pmatrix} 0.3162 & 0 \\ 0 & 0.3162 \end{pmatrix} $$
Columns of $S$ are $S_1 = [0.3162, 0]^T$ and $S_2 = [0, 0.3162]^T$.

Generate sigma points $\mathcal{X}_{i,0|0}$:
$$ \mathcal{X}_{0,0|0} = \hat{x}_{0|0} = \begin{pmatrix} 0.5 \\ 0.5 \end{pmatrix} $$
$$ \mathcal{X}_{1,0|0} = \hat{x}_{0|0} + S_1 = \begin{pmatrix} 0.5 \\ 0.5 \end{pmatrix} + \begin{pmatrix} 0.3162 \\ 0 \end{pmatrix} = \begin{pmatrix} 0.8162 \\ 0.5 \end{pmatrix} $$
$$ \mathcal{X}_{2,0|0} = \hat{x}_{0|0} + S_2 = \begin{pmatrix} 0.5 \\ 0.5 \end{pmatrix} + \begin{pmatrix} 0 \\ 0.3162 \end{pmatrix} = \begin{pmatrix} 0.5 \\ 0.8162 \end{pmatrix} $$
$$ \mathcal{X}_{3,0|0} = \hat{x}_{0|0} - S_1 = \begin{pmatrix} 0.5 \\ 0.5 \end{pmatrix} - \begin{pmatrix} 0.3162 \\ 0 \end{pmatrix} = \begin{pmatrix} 0.1838 \\ 0.5 \end{pmatrix} $$
$$ \mathcal{X}_{4,0|0} = \hat{x}_{0|0} - S_2 = \begin{pmatrix} 0.5 \\ 0.5 \end{pmatrix} - \begin{pmatrix} 0 \\ 0.3162 \end{pmatrix} = \begin{pmatrix} 0.5 \\ 0.1838 \end{pmatrix} $$

**2. Propagate Sigma Points through Non-linear Dynamics:**
Apply $f(x_1, x_2) = \begin{pmatrix} x_1 + \sin(x_2) \\ x_2 + \cos(x_1) \end{pmatrix}$ to each $\mathcal{X}_{i,0|0}$ to get $\mathcal{X}_{i,1|0}$.
(Remember $\sin(0.5 \text{ rad}) \approx 0.4794$, $\cos(0.5 \text{ rad}) \approx 0.8776$)
$$ \mathcal{X}_{0,1|0} = \begin{pmatrix} 0.5 + \sin(0.5) \\ 0.5 + \cos