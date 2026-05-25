## 1. What it is — in plain English

Imagine you're trying to fly a drone perfectly straight, but there's a little bit of wind, and your drone's sensors aren't perfectly accurate. You want the drone to stay on a specific path, using the least amount of battery power possible.

To do this, you need two things: First, you need a really good guess of where your drone *actually* is and how fast it's moving, even with those noisy sensors and the wind pushing it around. This "best guesser" is like a super-smart detective, constantly sifting through imperfect clues to figure out the true situation. In our world, this detective is called a **Kalman filter**.

Second, once you have that best guess, you need to figure out the *best way* to steer the drone to get it back on track, or keep it on track, without wasting too much energy. This "best steerer" is like a brilliant strategist, always calculating the most efficient moves. In our world, this strategist is called a **Linear Quadratic Regulator (LQR)**.

The **LQG (Linear Quadratic Gaussian) controller** is simply the combination of these two superheroes: the Kalman filter (the best guesser) and the LQR (the best steerer). It's a control system that uses the best possible estimate of your system's state to make the best possible control decisions, all while dealing with uncertainty and aiming for efficiency. The amazing part, called the **separation principle**, is that you can design these two parts independently, and when you put them together, the whole system still works optimally. It's like having two specialized engineers who each do their job perfectly, and their combined work is just as good as if one super-engineer designed everything from scratch.

## 2. Why it matters — real-world applications

LQG controllers are foundational in modern control systems, especially when dealing with systems that are affected by noise, have imperfect measurements, and require optimal performance.

1.  **Rocket Guidance and Control (Aerospace):** Companies like SpaceX use sophisticated control algorithms for their Falcon 9 rockets. During ascent, the rocket's position, velocity, and attitude are estimated using an Inertial Measurement Unit (IMU) and GPS (Kalman filter). This estimated state is then fed into an LQR-like controller that calculates the optimal gimbal angles for the engines to keep the rocket on its trajectory, minimize fuel consumption, and achieve precise orbital insertion. The separation principle simplifies the design of these complex systems.
2.  **Autonomous Vehicles and Robotics (ML/Robotics):** Self-driving cars (e.g., Waymo, Cruise) and advanced robots rely heavily on state estimation and optimal control. A Kalman filter (or its non-linear variants like EKF/UKF) fuses data from LiDAR, radar, cameras, and GPS to estimate the vehicle's precise position, velocity, and orientation, as well as the positions of other vehicles and obstacles. This estimated state is then used by an LQR-based controller to determine optimal steering, acceleration, and braking commands for smooth, safe, and efficient navigation.
3.  **Satellite Attitude Control (Aerospace):** Satellites need to maintain a specific orientation in space for communication, Earth observation, or scientific experiments. Onboard sensors (star trackers, sun sensors, gyroscopes) provide noisy measurements of the satellite's attitude. A Kalman filter estimates the true attitude, and an LQR controller then computes optimal commands for reaction wheels or thrusters to reorient the satellite or maintain its desired pointing, often minimizing fuel usage or reaction wheel wear.
4.  **Aircraft Flight Control (Aerospace):** Modern fly-by-wire aircraft use LQG principles for stability augmentation and autopilot functions. Sensors measure the aircraft's pitch, roll, yaw rates, and angles, which are then filtered to provide a robust estimate of the aircraft's dynamic state. This state is fed to a controller that computes optimal deflections for control surfaces (ailerons, elevators, rudder) to maintain stable flight, execute maneuvers, or follow a flight path, even in turbulent conditions.

## 3. Prerequisites — what you must know first

Before diving deep into LQG, ensure you have a solid grasp of these fundamental concepts. If any of these are unfamiliar, pause and review them.

*   **Linear Algebra:**
    *   **Vectors and Matrices:** Operations (addition, multiplication), transpose, inverse.
    *   **Eigenvalues and Eigenvectors:** Understanding stability and system modes.
    *   **State-Space Representation:** Describing dynamic systems using matrices ($x_{k+1} = Ax_k + Bu_k$, $y_k = Cx_k + Du_k$).
*   **Calculus:**
    *   **Derivatives and Integrals:** For understanding rates of change and accumulation.
    *   **Optimization Basics:** Concepts of minimizing/maximizing functions, often involving derivatives.
*   **Probability & Statistics:**
    *   **Mean, Variance, Covariance:** Measures of central tendency and spread for random variables.
    *   **Gaussian (Normal) Distribution:** Its properties, especially how it behaves under linear transformations.
    *   **Stochastic Processes:** Understanding random signals, white noise, and their characteristics (mean, covariance).
*   **Control Theory Basics:**
    *   **Open-Loop vs. Closed-Loop Control:** The fundamental difference and advantages of feedback.
    *   **Feedback Control:** How measurements are used to adjust control inputs.
    *   **Stability:** What it means for a system to be stable, and how to assess it.
    *   **Controllability:** Can we drive the system to any desired state using control inputs?
    *   **Observability:** Can we determine the system's state from its outputs?
*   **Optimal Control:**
    *   **Cost Functions:** Quantifying desired performance and control effort.
    *   **Dynamic Programming / Variational Calculus (basic understanding):** The underlying mathematical tools for finding optimal control laws.
*   **LQR (Linear Quadratic Regulator):**
    *   **Problem Formulation:** Minimizing a quadratic cost function for a linear system.
    *   **Riccati Equation:** How it arises in solving the LQR problem.
    *   **Control Law:** $u_k = -Kx_k$.
*   **Kalman Filter:**
    *   **Problem Formulation:** Estimating the state of a linear system from noisy measurements and process noise.
    *   **Prediction and Update Steps:** The two-stage iterative process.
    *   **Covariance Propagation:** How uncertainty evolves and is reduced.
    *   **Kalman Gain:** The weighting factor that balances prediction and measurement.

## 4. The core idea — step by step

Let's break down the LQG controller and the separation principle piece by piece, building intuition along the way.

### Step 1: The Problem Statement (Stochastic Linear System)

*   **Plain English:** We're dealing with a system whose behavior can be described by simple equations (linear), but it's not perfectly predictable. There are random disturbances affecting its motion (process noise), and our sensors that measure it are also imperfect (measurement noise). We want to control this system optimally.

*   **Small concrete example:** Imagine a drone hovering. Its altitude might drift slightly due to tiny air currents (process noise). When you measure its altitude with an altimeter, the reading isn't perfectly precise; it has some static or jitter (measurement noise). We want to control its thrust to keep it at a desired altitude.

*   **Formal/Mathematical version:**
    We model our system in discrete time using state-space equations:
    $$x_{k+1} = A x_k + B u_k + w_k$$
    $$y_k = C x_k + v_k$$
    Where:
    *   $x_k \in \mathbb{R}^n$ is the state vector at time $k$ (e.g., position, velocity, attitude).
    *   $u_k \in \mathbb{R}^m$ is the control input vector at time $k$ (e.g., thrust, torque).
    *   $y_k \in \mathbb{R}^p$ is the measurement vector at time $k$ (e.g., sensor readings).
    *   $A$, $B$, $C$ are known system matrices.
    *   $w_k \in \mathbb{R}^n$ is the process noise, representing unmodeled disturbances or inaccuracies in the system model. We assume $w_k$ is a zero-mean Gaussian white noise with covariance $Q_w$. That is, $w_k \sim \mathcal{N}(0, Q_w)$.
    *   $v_k \in \mathbb{R}^p$ is the measurement noise, representing sensor inaccuracies. We assume $v_k$ is a zero-mean Gaussian white noise with covariance $R_v$. That is, $v_k \sim \mathcal{N}(0, R_v)$.
    *   We also assume $w_k$ and $v_k$ are uncorrelated with each other and with the initial state $x_0$.

*   **What could go wrong:** If the system is highly non-linear, or if the noise isn't Gaussian or white, these equations won't accurately describe the system, and LQG's optimality guarantees will break down.

### Step 2: The Need for State Estimation (Kalman Filter)

*   **Plain English:** Since our system is noisy and our measurements are noisy, we never know the *true* state $x_k$ exactly. To control the system effectively, we need the best possible estimate of $x_k$ based on all the information we have (past measurements and control inputs). The Kalman filter is the optimal linear estimator for systems described in Step 1.

*   **Small concrete example:** A rocket's guidance computer can't directly "see" its exact position and velocity in space. It gets noisy readings from accelerometers, gyroscopes, and GPS. The Kalman filter takes all these imperfect readings, combines them intelligently with predictions based on the rocket's known dynamics and engine firings, and produces the most probable estimate of the rocket's true position and velocity.

*   **Formal/Mathematical version:**
    The Kalman filter provides an estimate of the state, denoted $\hat{x}_k$, which is the conditional mean of the state given all past measurements and controls: $\hat{x}_k = E[x_k | y_0, ..., y_{k-1}, u_0, ..., u_{k-1}]$.
    The filter operates in two steps:
    1.  **Prediction (Time Update):** Propagate the state estimate and its covariance forward in time using the system model.
        $$\hat{x}_{k|k-1} = A \hat{x}_{k-1|k-1} + B u_{k-1}$$
        $$P_{k|k-1} = A P_{k-1|k-1} A^T + Q_w$$
    2.  **Update (Measurement Update):** Correct the predicted state and covariance using the new measurement $y_k$.
        $$K_k = P_{k|k-1} C^T (C P_{k|k-1} C^T + R_v)^{-1}$$
        $$\hat{x}_{k|k} = \hat{x}_{k|k-1} + K_k (y_k - C \hat{x}_{k|k-1})$$
        $$P_{k|k} = (I - K_k C) P_{k|k-1}$$
    Where:
    *   $\hat{x}_{k|k-1}$ is the *a priori* state estimate (before measurement $y_k$).
    *   $\hat{x}_{k|k}$ is the *a posteriori* state estimate (after measurement $y_k$).
    *   $P_{k|k-1}$ and $P_{k|k}$ are the *a priori* and *a posteriori* error covariance matrices, respectively.
    *   $K_k$ is the Kalman gain, which determines how much the measurement corrects the prediction.

*   **What could go wrong:** If the assumed noise covariances ($Q_w$, $R_v$) are far from reality, the Kalman filter can give poor estimates, potentially leading to divergence (the estimate drifting far from the true state).

### Step 3: The Need for Optimal Control (LQR)

*   **Plain English:** Once we have the best possible estimate of the system's state, we need to decide what control action $u_k$ to take. We want to do this "optimally," which usually means getting the system to behave as desired (e.g., reaching a target, staying on a path) while using minimal control effort or avoiding excessive deviations. The LQR finds the control input that minimizes a quadratic cost function.

*   **Small concrete example:** For our drone, once the Kalman filter tells us its best estimated position and velocity, the LQR decides exactly how much to increase or decrease the thrust and tilt the drone. It does this not just to reach the desired altitude, but to do it smoothly, without overshooting, and without burning too much battery by making wild adjustments.

*   **Formal/Mathematical version:**
    The LQR problem aims to find a control law $u_k$ that minimizes a quadratic cost function $J$:
    $$J = E \left[ \sum_{k=0}^{N-1} (x_k^T Q x_k + u_k^T R u_k) + x_N^T S x_N \right]$$
    Where:
    *   $Q \ge 0$ (positive semi-definite) and $S \ge 0$ are state weighting matrices. They penalize deviations of the state $x_k$ from zero (or a reference trajectory, if we transform the problem). Larger values mean we care more about keeping the state close to zero.
    *   $R > 0$ (positive definite) is the control weighting matrix. It penalizes large control efforts. Larger values mean we want to use less control effort.
    *   $N$ can be finite or infinite (for steady-state control).
    For an infinite horizon ($N \to \infty$), the optimal control law is a linear state-feedback:
    $$u_k = -K x_k$$
    The gain matrix $K$ is constant and is found by solving the algebraic Riccati equation (ARE):
    $$P = A^T P A - (A^T P B)(R + B^T P B)^{-1}(B^T P A) + Q$$
    Then, the optimal gain $K$ is:
    $$K = (R + B^T P B)^{-1} B^T P A$$
    Here, $P$ is the unique positive semi-definite solution to the ARE.

*   **What could go wrong:** Choosing inappropriate $Q$ and $R$ matrices can lead to a controller that is too aggressive (small R, large Q, leading to oscillations or actuator saturation) or too sluggish (large R, small Q, leading to poor tracking). Also, the LQR assumes access to the *true* state $x_k$, which we don't have in a stochastic system.

### Step 4: Combining Estimation and Control (LQG)

*   **Plain English:** This is where the magic of LQG happens. We simply take the best state estimate provided by the Kalman filter ($\hat{x}_k$) and feed it directly into the LQR controller. The LQR then calculates the optimal control input $u_k$ based on this estimate.

*   **Small concrete example:** The drone's Kalman filter outputs its estimated position and velocity. This estimated information is then immediately used by the LQR part, which calculates the exact motor speeds and tilt angles needed to keep the drone stable and on its desired path. The drone never "knows" its true state, only its best guess, and it acts optimally based on that guess.

*   **Formal/Mathematical version:**
    The LQG controller structure is straightforward:
    1.  Use the Kalman filter equations (from Step 2) to compute the optimal state estimate $\hat{x}_k$.
    2.  Apply the LQR control law (from Step 3) using this estimate:
        $$u_k = -K \hat{x}_k$$
    The overall closed-loop system dynamics with the LQG controller can be represented by combining the system, filter, and controller equations.

*   **What could go wrong:** If the Kalman filter's estimate is consistently poor (e.g., due to unmodeled system dynamics or highly non-Gaussian noise), the LQR controller, despite being "optimal" for the estimated state, will not perform optimally for the true system state. However, the separation principle explains why this combination is still optimal *under the given assumptions*.

### Step 5: The Separation Principle

*   **Plain English:** This is a truly remarkable result. It states that for linear systems with Gaussian noise and quadratic cost functions, you can design the optimal state estimator (Kalman filter) and the optimal state-feedback controller (LQR) completely independently. You don't need to consider that the LQR is using an *estimate* rather than the *true* state when designing the LQR gain, nor do you need to consider the control actions when designing the Kalman filter gain. The combined LQG controller will still be optimal. It's like building two separate, perfectly optimized engines, and when you put them together, they run as efficiently as if they were designed as one unit.

*   **Small concrete example:** Imagine two engineering teams working on a new rocket. One team is solely focused on building the most accurate navigation system possible (Kalman filter). They worry about sensor noise, IMU drift, and GPS accuracy. The other team is solely focused on building the most efficient steering system (LQR). They worry about engine thrust, gimbal response, and fuel efficiency. The separation principle says that if both teams do their job perfectly, the rocket will fly optimally when their systems are integrated, without either team needing to compromise their design due to the other's limitations (as long as the underlying assumptions hold).

*   **Formal/Mathematical version:**
    The separation principle for LQG states that the optimal control law for the stochastic linear system (Step 1) with quadratic cost (Step 3) and Gaussian noise is achieved by:
    1.  Designing an optimal state estimator (the Kalman filter, Step 2) to provide $\hat{x}_k$.
    2.  Designing an optimal full-state feedback controller (the LQR, Step 3) using the *true* state $x_k$ (i.e., calculate $K$ as if $x_k$ were available).
    3.  Implementing the controller by replacing $x_k$ with its estimate $\hat{x}_k$, so $u_k = -K \hat{x}_k$.

    The proof of the separation principle typically involves showing that the expected value of the quadratic cost function can be separated into two independent parts: one related to the control performance assuming perfect state knowledge, and another related to the estimation error. Since the Kalman filter minimizes the estimation error covariance, and the LQR minimizes the control cost given the true state, the combination minimizes the total expected cost. This holds true because the estimation error is uncorrelated with the true state and the control input under Gaussian noise assumptions.

*   **What could go wrong:** The separation principle is powerful, but it relies on strict assumptions: linearity of the system, quadratic cost, and Gaussian white noise. If any of these are violated (e.g., highly non-linear dynamics, state-dependent noise, non-Gaussian disturbances), the principle no longer guarantees optimality, and designing the estimator and controller separately might lead to suboptimal or even unstable performance. In such cases, more advanced techniques like Non-linear Model Predictive Control (NMPC) or techniques based on Extended/Unscented Kalman Filters (EKF/UKF) might be needed, where the estimation and control designs are often more coupled.

## 5. Worked examples — multiple, with every step shown

We'll work through examples for discrete-time systems.

### Example 1: 1D System, Illustrating the LQG Structure

**Problem Statement:**
Consider a 1D discrete-time system described by:
$x_{k+1} = 0.9 x_k + 0.5 u_k + w_k$
$y_k = 1.0 x_k + v_k$
where $w_k \sim \mathcal{N}(0, Q_w = 0.1)$ and $v_k \sim \mathcal{N}(0, R_v = 0.2)$.
The LQR controller gain is given as $K = 0.7$, and the Kalman filter gain is given as $K_k = 0.4$ (assume steady-state for simplicity).
We want to show how the LQG controller operates for one time step.
Assume initial state estimate $\hat{x}_{0|0} = 0$ and initial input $u_{-1} = 0$.
The first measurement $y_0 = 1.5$.

**Given:**
*   System: $A=0.9, B=0.5, C=1.0$
*   Noise covariances: $Q_w=0.1, R_v=0.2$
*   LQR gain: $K=0.7$
*   Kalman filter gain (steady-state): $K_k=0.4$
*   Initial estimate: $\hat{x}_{0|0} = 0$
*   Initial control input (for prediction): $u_{-1} = 0$
*   First measurement: $y_0 = 1.5$

**What we want:**
*   Calculate the state estimate $\hat{x}_{0|0}$ (already given, but we'll re-evaluate the first update)
*   Calculate the next control input $u_0$
*   Calculate the predicted state $\hat{x}_{1|0}$

**Solution:**

**Step 1: Kalman Filter - Prediction (for $k=0$)**
We need $\hat{x}_{0|-1}$ (prediction of $x_0$ before $y_0$ is available). Since we start at $k=0$ with $\hat{x}_{0|0}$ given, we actually need to first do the update step for $k=0$ to get $\hat{x}_{0|0}$ (if it wasn't given as an initial condition). Let's assume we have $\hat{x}_{-1|-1}$ and $u_{-1}$ to predict $\hat{x}_{0|-1}$.
Let's assume $\hat{x}_{-1|-1} = 0$ and $u_{-1} = 0$.

$$ \hat{x}_{0|-1} = A \hat{x}_{-1|-1} + B u_{-1} $$
$$ \hat{x}_{0|-1} = (0.9)(0) + (0.5)(0) $$
$$ \hat{x}_{0|-1} = 0 $$
This is the *a priori* estimate for $x_0$.

**Step 2: Kalman Filter - Update (for $k=0$)**
Now we use the measurement $y_0 = 1.5$ to update our estimate of $x_0$.
$$ \hat{x}_{0|0} = \hat{x}_{0|-1} + K_k (y_0 - C \hat{x}_{0|-1}) $$
*   We use the predicted state $\hat{x}_{0|-1}=0$.
*   We use the measurement $y_0=1.5$.
*   The output matrix $C=1.0$.
*   The Kalman gain $K_k=0.4$.

$$ \hat{x}_{0|0} = 0 + 0.4 (1.5 - (1.0)(0)) $$
$$ \hat{x}_{0|0} = 0.4 (1.5) $$
$$ \hat{x}_{0|0} = 0.6 $$
This is our best estimate of the state $x_0$ after incorporating the measurement.

**Step 3: LQR Controller - Calculate Control Input (for $k=0$)**
Now, we use this updated estimate $\hat{x}_{0|0}$ to calculate the control input $u_0$.
$$ u_0 = -K \hat{x}_{0|0} $$
*   The LQR gain $K=0.7$.
*   The current state estimate $\hat{x}_{0|0}=0.6$.

$$ u_0 = -(0.7)(0.6) $$
$$ u_0 = -0.42 $$
This is the control input that will be applied to the system.

**Step 4: Kalman Filter - Prediction (for $k=1$)**
Finally, we predict the next state $\hat{x}_{1|0}$ using the system model, the current estimate $\hat{x}_{0|0}$, and the control input $u_0$ we just calculated.
$$ \hat{x}_{1|0} = A \hat{x}_{0|0} + B u_0 $$
*   System matrix $A=0.9$.
*   Control matrix $B=0.5$.
*   Current state estimate $\hat{x}_{0|0}=0.6$.
*   Control input $u_0=-0.42$.

$$ \hat{x}_{1|0} = (0.9)(0.6) + (0.5)(-0.42) $$
$$ \hat{x}_{1|0} = 0.54 - 0.21 $$
$$ \hat{x}_{1|0} = 0.33 $$
This is the predicted state for the next time step, which will be updated when the next measurement $y_1$ becomes available.

**Summary of Results:**
*   **Estimated state $\hat{x}_{0|0} = \mathbf{0.6}$**
*   **Control input $u_0 = \mathbf{-0.42}$**
*   **Predicted state $\hat{x}_{1|0} = \mathbf{0.33}$**

**Reflection:**
This example primarily illustrates the sequential flow of information in an LQG controller: estimate, then control, then predict for the next step. It simplifies the Riccati equations by providing the gains directly. The tricky part is keeping track of the indices for the prediction and update steps of the Kalman filter.

### Example 2: 1D System, Calculating Steady-State Gains

**Problem Statement:**
Consider a 1D discrete-time system:
$x_{k+1} = x_k + u_k + w_k$
$y_k = x_k + v_k$
where $w_k \sim \mathcal{N}(0, Q_w = 0.1)$ and $v_k \sim \mathcal{N}(0, R_v = 0.5)$.
Design an LQG controller for this system using an infinite horizon LQR with cost function weights $Q=1$ and $R=0.5$.
Calculate the steady-state LQR gain $K$ and the steady-state Kalman filter gain $K_k$.

**Given:**
*   System matrices: $A=1, B=1, C=1$
*   Process noise covariance: $Q_w=0.1$
*   Measurement noise covariance: $R_v=0.5$
*   LQR cost weights: $Q=1, R=0.5$

**What we want:**
*   Steady-state LQR gain $K$
*   Steady-state Kalman filter gain $K_k$

**Solution:**

**Part A: Calculate Steady-State LQR Gain $K$**
The LQR gain $K$ is found by solving the Algebraic Riccati Equation (ARE) for $P$:
$$P = A^T P A - (A^T P B)(R + B^T P B)^{-1}(B^T P A) + Q$$
For a 1D system, $A=1, B=1, Q=1, R=0.5$. $P$ will be a scalar.
$$P = (1)^T P (1) - ((1)^T P (1))(0.5 + (1)^T P (1))^{-1}((1)^T P (1)) + 1$$
$$P = P - (P)(0.5 + P)^{-1}(P) + 1$$
$$P = P - \frac{P^2}{0.5 + P} + 1$$
Subtract $P$ from both sides:
$$0 = - \frac{P^2}{0.5 + P} + 1$$
$$ \frac{P^2}{0.5 + P} = 1 $$
$$ P^2 = 0.5 + P $$
$$ P^2 - P - 0.5 = 0 $$
This is a quadratic equation for $P$. We use the quadratic formula $P = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$:
$$ P = \frac{-(-1) \pm \sqrt{(-1)^2 - 4(1)(-0.5)}}{2(1)} $$
$$ P = \frac{1 \pm \sqrt{1 + 2}}{2} $$
$$ P = \frac{1 \pm \sqrt{3}}{2} $$
We need the positive solution for $P$ (since $P$ in LQR is positive semi-definite, and for 1D, it must be positive).
$$ P = \frac{1 + \sqrt{3}}{2} \approx \frac{1 + 1.732}{2} \approx \frac{2.732}{2} $$
$$ P \approx 1.366 $$
Now, calculate the LQR gain $K$:
$$ K = (R + B^T P B)^{-1} B^T P A $$
$$ K = (0.5 + (1)(1.366)(1))^{-1} (1)(1.366)(1) $$
$$ K = (0.5 + 1.366)^{-1} (1.366) $$
$$ K = (1.866)^{-1} (1.366) $$
$$ K = \frac{1.366}{1.866} $$
$$ K \approx 0.732 $$
So, the steady-state LQR gain is $\mathbf{K \approx 0.732}$.

**Part B: Calculate Steady-State Kalman Filter Gain $K_k$**
The steady-state Kalman filter gain $K_k$ is found by solving a dual Algebraic Riccati Equation for the error covariance $P_{k|k-1}$ (often denoted $P_{ss}$ or $\Sigma$). The equations are analogous to LQR, but with $A^T, C^T, Q_w, R_v$ taking the roles of $A, B, Q, R$.
The prediction error covariance $P_{k|k-1}$ (let's call it $\Sigma$) is found from:
$$\Sigma = A \Sigma A^T - (A \Sigma C^T)(C \Sigma C^T + R_v)^{-1}(C \Sigma A^T) + Q_w$$
For a 1D system, $A=1, C=1, Q_w=0.1, R_v=0.5$. $\Sigma$ will be a scalar.
$$\Sigma = (1) \Sigma (1)^T - ((1) \Sigma (1)^T)((1) \Sigma (1)^T + 0.5)^{-1}((1) \Sigma (1)^T) + 0.1$$
$$\Sigma = \Sigma - (\Sigma)(\Sigma + 0.5)^{-1}(\Sigma) + 0.1$$
$$\Sigma = \Sigma - \frac{\Sigma^2}{\Sigma + 0.5} + 0.1$$
Subtract $\Sigma$ from both sides:
$$0 = - \frac{\Sigma^2}{\Sigma + 0.5} + 0.1$$
$$ \frac{\Sigma^2}{\Sigma + 0.5} = 0.1 $$
$$ \Sigma^2 = 0.1 (\Sigma + 0.5) $$
$$ \Sigma^2 = 0.1 \Sigma + 0.05 $$
$$ \Sigma^2 - 0.1 \Sigma - 0.05 = 0 $$
Using the quadratic formula for $\Sigma$:
$$ \Sigma = \frac{-(-0.1) \pm \sqrt{(-0.1)^2 - 4(1)(-0.05)}}{2(1)} $$
$$ \Sigma = \frac{0.1 \pm \sqrt{0.01 + 0.2}}{2} $$
$$ \Sigma = \frac{0.1 \pm \sqrt{0.21}}{2} $$
$$ \Sigma \approx \frac{0.1 \pm 0.4583}{2} $$
We need the positive solution for $\Sigma$:
$$ \Sigma = \frac{0.1 + 0.4583}{2} \approx \frac{0.5583}{2} $$
$$ \Sigma \approx 0.27915 $$
Now, calculate the steady-state Kalman gain $K_k$:
$$ K_k = \Sigma C^T (C \Sigma C^T + R_v)^{-1} $$
$$ K_k = (0.27915)(1)^T ((1)(0.27915)(1)^T + 0.5)^{-1} $$
$$ K_k = 0.27915 (0.27915 + 0.5)^{-1} $$
$$ K_k = 0.27915 (0.77915)^{-1} $$
$$ K_k = \frac{0.27915}{0.77915} $$
$$ K_k \approx 0.35828 $$
So, the steady-state Kalman filter gain is $\mathbf{K_k \approx 0.358}$.

**Summary of Results:**
*   **Steady-state LQR gain $K = \mathbf{0.732}$**
*   **Steady-state Kalman filter gain $K_k = \mathbf{0.358}$**

**Reflection:**
This example demonstrates the calculation of the steady-state gains for both the LQR and Kalman filter components by solving their respective Algebraic Riccati Equations. For 1D systems, these reduce to quadratic equations. The tricky part is correctly setting up and solving the Riccati equations, especially remembering to choose the positive definite solution for $P$ and $\Sigma$. The duality between the LQR and Kalman filter equations is evident here.

### Example 3: 2D System, Setup and Conceptual Steps

**Problem Statement:**
Consider a 2D discrete-time system representing a mass-spring-damper system:
$$ x_{k+1} = \begin{pmatrix} 1 & T \\ 0 & 1 \end{pmatrix} x_k + \begin{pmatrix} T^2/2 \\ T \end{pmatrix} u_k + w_k $$
$$ y_k = \begin{pmatrix} 1 & 0 \end{pmatrix} x_k + v_k $$
where $T$ is the sampling time. Let $T=0.1$ s.
The state $x_k = \begin{pmatrix} p_k \\ v_k \end{pmatrix}$ where $p_k$ is position and $v_k$ is velocity.
Assume process noise $w_k \sim \mathcal{N}(0, Q_w)$ and measurement noise $v_k \sim \mathcal{N}(0, R_v)$, with:
$$ Q_w = \begin{pmatrix} 0.01 & 0 \\ 0 & 0.01 \end{pmatrix} \quad R_v = 0.1 $$
Design an LQG controller for this system. The LQR cost function weights are:
$$ Q = \begin{pmatrix} 10 & 0 \\ 0 & 1 \end{pmatrix} \quad R = 0.1 $$
Describe the steps to find the steady-state LQR gain $K$ and the steady-state Kalman filter gain $K_k$, and then form the LQG controller.

**Given:**
*   System matrices:
    $$ A = \begin{pmatrix} 1 & 0.1 \\ 0 & 1 \end{pmatrix} \quad B = \begin{pmatrix} 0.1^2/2 \\ 0.1 \end{pmatrix} = \begin{pmatrix} 0.005 \\ 0.1 \end{pmatrix} \quad C = \begin{pmatrix} 1 & 0 \end{pmatrix} $$
*   Process noise covariance: $Q_w = \begin{pmatrix} 0.01 & 0 \\ 0 & 0.01 \end{pmatrix}$
*   Measurement noise covariance: $R_v = 0.1$ (scalar)
*   LQR cost weights: $Q = \begin{pmatrix} 10 & 0 \\ 0 & 1 \end{pmatrix}$ and $R = 0.1$ (scalar)

**What we want:**
*   Outline the steps to calculate steady-state LQR gain $K$.
*   Outline the steps to calculate steady-state Kalman filter gain $K_k$.
*   Formulate the LQG controller equations.

**Solution:**

**Part A: Steps to Calculate Steady-State LQR Gain $K$**

1.  **Define the Algebraic Riccati Equation (ARE) for LQR:**
    We need to find the unique positive semi-definite solution $P$ to the ARE:
    $$P = A^T P A - (A^T P B)(R + B^T P B)^{-1}(B^T P A) + Q$$
    Here, $P$ will be a $2 \times 2$ symmetric matrix: $P = \begin{pmatrix} p_{11} & p_{12} \\ p_{12} & p_{22} \end{pmatrix}$.
    Substitute the given $A, B, Q, R$ matrices into this equation. This will result in a system of non-linear algebraic equations for the elements of $P$.

    *   $A^T P A$: Calculate the product $(A^T P)(A)$.
    *   $B^T P B$: Calculate the scalar product $(B^T P)(B)$.
    *   $(R + B^T P B)^{-1}$: Since $R$ and $B^T P B$ are scalars, this is simply $1 / (R + B^T P B)$.
    *   $(A^T P B)(R + B^T P B)^{-1}(B^T P A)$: This involves matrix-scalar-matrix multiplication.

2.  **Solve the ARE for $P$:**
    Solving this system of non-linear equations analytically can be very tedious for higher-dimensional systems. In practice, numerical methods are used (e.g., `dare` function in MATLAB or SciPy's `scipy.signal.lqr`). The solution $P$ must be positive semi-definite.

3.  **Calculate the LQR Gain $K$:**
    Once $P$ is found, the optimal feedback gain $K$ is calculated as:
    $$K = (R + B^T P B)^{-1} B^T P A$$
    Since $B$ is $2 \times 1$ and $A$ is $2 \times 2$, $K$ will be a $1 \times 2$ matrix, i.e., $K = \begin{pmatrix} k_1 & k_2 \end{pmatrix}$.

**Part B: Steps to Calculate Steady-State Kalman Filter Gain $K_k$**

1.  **Define the Algebraic Riccati Equation (ARE) for Kalman Filter:**
    We need to find the unique positive semi-definite solution $\Sigma$ (often denoted $P_{ss}$ in KF literature) to the dual ARE:
    $$\Sigma = A \Sigma A^T - (A \Sigma C^T)(C \Sigma C^T + R_v)^{-1}(C \Sigma A^T) + Q_w$$
    Here, $\Sigma$ will also be a $2 \times 2$ symmetric matrix: $\Sigma = \begin{pmatrix} \sigma_{11} & \sigma_{12} \\ \sigma_{12} & \sigma_{22} \end{pmatrix}$.
    Substitute the given $A, C, Q_w, R_v$ matrices into this equation. This again results in a system of non-linear algebraic equations for the elements of $\Sigma$.

    *   $A \Sigma A^T$: Calculate the product $(A \Sigma)(A^T)$.
    *   $C \Sigma C^T$: Calculate the scalar product $(C \Sigma)(C^T)$.
    *   $(C \Sigma C^T + R_v)^{-1}$: This is $1 / (C \Sigma C^T + R_v)$.
    *   $(A \Sigma C^T)(C \Sigma C^T + R_v)^{-1}(C \Sigma A^T)$: This involves matrix-scalar-matrix multiplication.

2.  **Solve the ARE for $\Sigma$:**
    Similar to the LQR case, this is typically solved numerically. The solution $\Sigma$ must be positive semi-definite.

3.  **Calculate the Kalman Filter Gain $K_k$:**
    Once $\Sigma$ is found, the optimal steady-state Kalman gain $K_k$ is calculated as:
    $$K_k = \Sigma C^T (C \Sigma C^T + R_v)^{-1}$$
    Since $C$ is $1 \times 2$ and $\Sigma$ is $2 \times 2$, $K_k$ will be a $2 \times 1$ matrix, i.e., $K_k = \begin{pmatrix} k_{k1} \\ k_{k2} \end{pmatrix}$.

**Part C: Formulating the LQG Controller Equations**

Once $K$ and $K_k$ are found, the LQG controller operates as follows:

1.  **Kalman Filter Prediction Step:**
    $$\hat{x}_{k|k-1} = A \hat{x}_{k-1|k-1} + B u_{k-1}$$
    *   $\hat{x}_{k-1|k-1}$ is the previous best estimate.
    *   $u_{k-1}$ is the control input applied at the previous step.

2.  **Kalman Filter Update Step:**
    $$K_k = \Sigma C^T (C \Sigma C^T + R_v)^{-1}$$
    (This is the steady-state gain, so it's pre-computed and constant.)
    $$\hat{x}_{k|k} = \hat{x}_{k|k-1} + K_k (y_k - C \hat{x}_{k|k-1})$$
    *   $y_k$ is the current measurement.
    *   The term $(y_k - C \hat{x}_{k|k-1})$ is the measurement residual, representing the difference between the actual measurement and what the filter predicted the measurement would be.

3.  **LQR Control Law:**
    $$u_k = -K \hat{x}_{k|k}$$
    *   The control input $u_k$ is calculated using the LQR gain $K$ and the most recent state estimate $\hat{x}_{k|k}$.

**Summary of Results:**
The full numerical calculation of $P, K, \Sigma, K_k$ for a 2D system is beyond a "worked example" by hand due to the complexity of solving matrix Riccati equations. However, the conceptual steps are:
*   **LQR Gain $K$:** Solve $P = A^T P A - (A^T P B)(R + B^T P B)^{-1}(B^T P A) + Q$ for $P$, then $K = (R + B^T P B)^{-1} B^T P A$.
*   **Kalman Gain $K_k$:** Solve $\Sigma = A \Sigma A^T - (A \Sigma C^T)(C \Sigma C^T + R_v)^{-1}(C \Sigma A^T) + Q_w$ for $\Sigma$, then $K_k = \Sigma C^T (C \Sigma C^T + R_v)^{-1}$.
*   **LQG Controller:** Implement the Kalman filter prediction and update steps using $K_k$ to get $\hat{x}_{k|k}$, then apply $u_k = -K \hat{x}_{k|k}$.

**Reflection:**
This example highlights that for multi-dimensional systems, solving the Riccati equations by hand becomes impractical. Numerical tools are essential. The main takeaway is understanding the structure of the equations and the duality between the LQR and Kalman filter problems. The matrix dimensions must be carefully tracked.

### Example 4: Conceptual Application - Satellite Attitude Control

**Problem Statement:**
You are tasked with designing an LQG controller for a small Earth-orbiting satellite to maintain a desired attitude (orientation) relative to a fixed inertial frame. The satellite is subject to environmental disturbances (e.g., solar radiation pressure, atmospheric drag) and its attitude sensors (star trackers, gyroscopes) provide noisy measurements. Reaction wheels are used as actuators. Describe how LQG would be applied, identifying the physical meaning of the matrices and variables.

**Given:**
*   Satellite attitude control problem.
*   Disturbances (process noise).
*   Noisy sensors (measurement noise).
*   Reaction wheels (actuators).

**What we want:**
*   Map the physical system to the LQG mathematical framework ($A, B, C, x, u, y, w, v, Q_w, R_v, Q, R$).
*   Explain the role of LQR and Kalman filter in this context.

**Solution:**

**1. Define the State Vector ($x_k$):**
*   **Plain English:** The state describes the satellite's orientation and how it's changing.
*   **Physical Meaning:** For attitude control, $x_k$ typically includes:
    *   **Attitude:** Often represented by quaternions or Euler angles (e.g., pitch, roll, yaw relative to the desired orientation). If using Euler angles, linearization around the desired attitude is critical.
    *   **Angular Velocity:** The rates of change of pitch, roll, and yaw.
*   **Example:** If we linearize around a desired zero-attitude, $x_k = \begin{pmatrix} \delta\phi_k \\ \delta\theta_k \\ \delta\psi_k \\ \omega_{xk} \\ \omega_{yk} \\ \omega_{zk} \end{pmatrix}$, where $\delta\phi, \delta\theta, \delta\psi$ are small attitude errors and $\omega_x, \omega_y, \omega_z$ are angular velocities. This would be a 6-dimensional state vector.

**2. Define the Control Input ($u_k$):**
*   **Plain English:** The commands sent to the actuators to change the satellite's orientation.
*   **Physical Meaning:** For reaction wheels, $u_k$ would be the commanded torques to each wheel (or a combination of torques in orthogonal directions).
*   **Example:** $u_k = \begin{pmatrix} \tau_{xk} \\ \tau_{yk} \\ \tau_{zk} \end{pmatrix}$, representing torques about the x, y, z axes.

**3. Define the Measurement Vector ($y_k$):**
*   **Plain English:** The raw, noisy readings from the satellite's sensors.
*   **Physical Meaning:**
    *   **Star Trackers:** Provide precise attitude measurements by identifying constellations.
    *   **Gyroscopes:** Measure angular rates.
    *   **Sun Sensors/Magnetometers:** Provide less precise but useful attitude information.
*   **Example:** $y_k$ could combine attitude measurements from star trackers and angular rate measurements from gyroscopes.

**4. Define System Dynamics ($A, B, C$):**
*   **Plain English:** These matrices describe how the satellite's state changes over time based on its current state and control inputs, and how the true state translates into measurements.
*   **Physical Meaning:**
    *   **$A$ matrix:** Derived from the linearized equations of rotational motion (Euler's equations) for the satellite, incorporating its inertia properties. It describes how attitude and angular velocity evolve without control or disturbances.
    *   **$B$ matrix:** Relates the control torques ($u_k$) from the reaction wheels to changes in the satellite's angular velocity (and thus attitude).
    *   **$C$ matrix:** Maps the true attitude and angular velocity ($x_k$) to the expected sensor readings ($y_k$). If sensors measure attitude directly, $C$ would have ones in the appropriate places.

**5. Define Noise Characteristics ($w_k, v_k, Q_w, R_v$):**
*   **Plain English:** Quantify the uncertainty in the system's dynamics and sensors.
*   **Physical Meaning:**
    *   **$w_k$ (process noise):** Represents unmodeled torques (solar pressure, drag), small inaccuracies in the satellite's inertia model, or reaction wheel imperfections. $Q_w$ is its covariance matrix, reflecting how much these disturbances affect each state component.
    *   **$v_k$ (measurement noise):** Represents the inherent inaccuracy and jitter in the star tracker, gyroscope, and other sensor readings. $R_v$ is its covariance matrix, reflecting the noise level of each sensor.

**6. Kalman Filter's Role:**
*   **Plain English:** The Kalman filter fuses all the noisy sensor data ($y_k$) with the predicted attitude and angular velocity (from the $A$ and $B$ matrices and previous control $u_{k-1}$) to produce the *best possible estimate* ($\hat{x}_k$) of the satellite's true attitude and angular velocity. It optimally weighs the confidence in the prediction versus the confidence in the new measurement.
*   **Physical Meaning:** It provides a smooth, accurate, and robust estimate of the satellite's orientation, even if one sensor temporarily fails or provides very noisy data.

**7. LQR Controller's Role:**
*   **Plain English:** The LQR takes the Kalman filter's best estimate of the satellite's state ($\hat{x}_k$) and calculates the optimal torques ($u_k$) for the reaction wheels. "Optimal" here means minimizing a trade-off between keeping the satellite precisely at its desired attitude (small $Q$ weights on attitude errors) and minimizing the control effort (small $R$ weights on reaction wheel torques).
*   **Physical Meaning:**
    *   **$Q$ matrix:** Penalizes deviations from the desired attitude and angular velocity. A large $Q$ for attitude errors means the controller will aggressively correct any pointing errors.
    *   **$R$ matrix:** Penalizes the magnitude of the commanded torques. A large $R$ means the controller will try to use less fuel/power and put less stress on the reaction wheels, potentially allowing for larger attitude errors.
*   **Control Law:** $u_k = -K \hat{x}_k$. The gain matrix $K$ determines how strongly each estimated state component influences the commanded torques.

**8. Separation Principle in Action:**
*   The Kalman filter is designed to minimize the estimation error covariance, considering $A, C, Q_w, R_v$.
*   The LQR controller is designed to minimize the quadratic cost function, considering $A, B, Q, R$.
*   Because these designs are independent (due to the separation principle), the satellite's control system can be developed and tuned by specialized teams, and when integrated, the overall system will achieve optimal performance in terms of attitude stability and control effort, given the linear model and Gaussian noise assumptions.

**Reflection:**
This example shows how abstract mathematical concepts ($A, B, C, Q_w, R_v, Q, R$) map to concrete physical parameters and design choices in a real-world aerospace application. The key is understanding that LQG provides a systematic, optimal framework for dealing with both uncertainty (estimation) and control objectives (regulation). The choice of weighting matrices $Q, R, Q_w, R_v$ becomes the primary tuning knobs for balancing performance, robustness, and control effort.

## 6. Common mistakes and traps

1.  **Ignoring the Assumptions of the Separation Principle:** The most critical trap. The optimality of LQG and the validity of the separation principle strictly depend on the system being **linear**, the noise being **Gaussian and white**, and the cost function being **quadratic**. Applying LQG to highly non-linear systems or systems with non-Gaussian noise (e.g., impulsive noise, sensor dropouts) without appropriate modifications (like EKF/UKF for non-linearities, or particle filters for non-Gaussian noise) will lead to suboptimal or even unstable performance.
2.  **Misinterpreting "Optimal":** LQG is optimal *within its defined framework* (linear system, quadratic cost, Gaussian noise). It does not guarantee global optimality for all possible control problems. For instance, it doesn't inherently handle actuator saturation or hard constraints on states, which often require Model Predictive Control (MPC).
3.  **Poor Tuning of Weighting Matrices ($Q, R$ for LQR; $Q_w, R_v$ for Kalman Filter):**
    *   **LQR ($Q, R$):** Choosing $Q$ and $R$ inappropriately can lead to a controller that is too aggressive (small $R$, large $Q$ resulting in high control effort and potential instability or actuator saturation) or too sluggish (large $R$, small $Q$ resulting in poor tracking and large state deviations). Tuning is often an iterative process balancing performance and control effort.
    *   **Kalman Filter ($Q_w, R_v$):** Incorrectly estimating the process noise covariance ($Q_w$) or measurement noise covariance ($R_v$) can severely degrade filter performance. If $Q_w$ is too small, the filter will trust its model too much and be slow to react to actual disturbances. If $Q_w$ is too large, it will be too sensitive to noise. If $R_v$ is too small, the filter will over-rely on noisy measurements. If $R_v$ is too large, it will under-utilize valid measurement information.
4.  **Assuming Perfect System Models ($A, B, C$):** The performance of LQG is highly sensitive to the accuracy of the system's dynamic model. If the true system dynamics differ significantly from the assumed $A, B, C$ matrices, the designed controller and filter will not be optimal and may even lead to instability. This is where robust control techniques become important.
5.  **Ignoring Observability and Controllability:** Before even attempting LQG, ensure the system is controllable (for LQR to work) and observable (for the Kalman filter to work). If the system is not controllable, no amount of control effort can drive it to a desired state. If it's not observable, its state cannot be reliably estimated from measurements.
6.  **Computational Burden for High-Dimensional Systems:** For systems with many states, solving the matrix Riccati equations for $P$ and $\Sigma$ can be computationally intensive. While modern numerical solvers are efficient, it's a practical consideration. Real-time implementation constraints also apply to the filter and control law computations at each time step.

## 7. Textbook-precise explanation

The Linear Quadratic Gaussian (LQG) control problem addresses the optimal control of linear systems corrupted by Gaussian white noise, where only noisy measurements of the state are available. The solution to the LQG problem is achieved by combining an optimal state estimator (the Kalman filter) with an optimal full-state feedback controller (the Linear Quadratic Regulator, LQR), due to the **separation principle**.

Consider a discrete-time linear stochastic system described by:
$$x_{k+1} = A x_k + B u_k + w_k$$
$$y_k = C x_k + v_k$$
where:
*   $x_k \in \mathbb{R}^n$ is the state vector.
*   $u_k \in \mathbb{R}^m$ is the control input vector.
*   $y_k \in \mathbb{R}^p$ is the measurement vector.
*   $A \in \mathbb{R}^{n \times n}$, $B \in \mathbb{R}^{n \times m}$, $C \in \mathbb{R}^{p \times n}$ are known system matrices.
*   $w_k \in \mathbb{R}^n$ is the process noise, assumed to be zero-mean Gaussian white noise with covariance $E[w_k w_j^T] = Q_w \delta_{kj}$, where $Q_w \ge 0$.
*   $v_k \in \mathbb{R}^p$ is the measurement noise, assumed to be zero-mean Gaussian white noise with covariance $E[v_k v_j^T] = R_v \delta_{kj}$, where $R_v > 0$.
*   $w