## 1. What it is — in plain English

Imagine you're trying to track a tiny, fast-moving drone that sometimes flies straight and sometimes zips around in curves. You have a rough idea where it started, and you get occasional blurry photos from a camera. A standard "Kalman Filter" is like having a really good guesser who can track things moving in straight lines with noisy measurements. It's excellent for predicting where things will be and then correcting those predictions with new information.

But what if the drone doesn't always fly in straight lines? What if its movement is curvy, or your camera measurements are distorted in a complicated way? The regular Kalman Filter gets confused because it assumes everything is "linear"—meaning straight lines and simple relationships.

The "Extended Kalman Filter" (EKF) is like giving your super guesser a special trick: when the drone moves in a curve, the guesser pretends, for a tiny moment, that the curve is actually a very short, straight line—the tangent line. It does this both for predicting the drone's next position and for understanding what its curvy camera view should look like. It constantly updates these "straight-line approximations" as the drone moves.

So, in essence, the EKF is a smart way to use the powerful Kalman Filter for systems that don't behave in perfectly straight lines or have perfectly simple measurements. It does this by constantly finding the "best straight-line fit" to the curvy behavior at the drone's current estimated location, allowing it to keep tracking even complex movements.

## 2. Why it matters — real-world applications

The Extended Kalman Filter is a cornerstone of modern estimation and control, particularly in fields where systems are inherently nonlinear but require robust state tracking. Its ability to handle nonlinearity makes it indispensable.

1.  **Aerospace Navigation and Control (GNC):** This is perhaps its most critical domain.
    *   **Spacecraft Orbit Determination:** Satellites and probes follow complex orbital mechanics (governed by inverse-square laws, which are highly nonlinear). EKF is used to estimate their precise position and velocity using noisy measurements from ground stations (range, range-rate) or onboard sensors (star trackers, accelerometers). This is vital for mission control, trajectory correction maneuvers, and rendezvous operations. Companies like SpaceX, NASA, ESA, and ULA heavily rely on such filtering techniques.
    *   **Unmanned Aerial Vehicles (UAVs)/Drones:** For autonomous flight, EKF is used to fuse data from various sensors (GPS, IMU - Inertial Measurement Unit, altimeter, magnetometers) to estimate the drone's 3D position, velocity, and orientation (attitude). The dynamics of flight (aerodynamic forces, thrust) are nonlinear, as are the sensor models (e.g., GPS accuracy varying with satellite geometry). This enables stable flight, waypoint navigation, and payload stabilization for companies like DJI, Skydio, and military contractors.
    *   **Missile Guidance:** Estimating the target's trajectory and the missile's own state in real-time under high-speed, dynamic conditions with nonlinear aerodynamics and sensor models is crucial for interception.

2.  **Autonomous Vehicles (Self-Driving Cars):** Cars move in complex, nonlinear paths (turns, accelerations, braking). EKF is used to combine data from GPS, LiDAR, radar, and cameras to estimate the car's precise position, velocity, and orientation, as well as the positions and velocities of other vehicles and pedestrians. This forms the backbone of perception and localization systems for companies like Waymo, Cruise, Tesla, and NVIDIA.

3.  **Robotics:** Mobile robots need to know where they are and how they are moving in an environment. EKF is extensively used in Simultaneous Localization and Mapping (SLAM) problems, where a robot builds a map of its surroundings while simultaneously tracking its own position within that map. The robot's motion model and sensor models (e.g., range sensors, cameras) are often nonlinear.

4.  **Human-Computer Interaction / Wearable Technology:** Estimating human motion from wearable sensors (like accelerometers and gyroscopes in smartwatches or VR controllers) involves highly nonlinear biomechanical models and sensor fusion. EKF can track limb positions and orientations, enabling applications in sports analysis, virtual reality, and medical rehabilitation.

## 3. Prerequisites — what you must know first

Before diving deep into the Extended Kalman Filter, ensure you have a solid grasp of the following concepts. If any of these are unfamiliar, pause and learn them thoroughly first.

*   **Calculus (Differential):**
    *   **Derivatives:** Understanding how to calculate the rate of change of a function.
    *   **Partial Derivatives:** How to find the rate of change of a multi-variable function with respect to one variable, holding others constant.
    *   **Taylor Series Expansion:** The concept of approximating a function with a polynomial, particularly the first-order approximation (tangent line/plane).
*   **Linear Algebra:**
    *   **Vectors and Matrices:** Operations like addition, subtraction, multiplication.
    *   **Matrix Transpose:** Swapping rows and columns ($A^T$).
    *   **Matrix Inverse:** Finding $A^{-1}$ such that $A A^{-1} = I$.
    *   **Identity Matrix:** A square matrix with ones on the diagonal and zeros elsewhere ($I$).
    *   **Vector and Matrix Norms:** Measures of "size" for vectors and matrices.
*   **Probability and Statistics:**
    *   **Mean (Expected Value):** The average value of a random variable.
    *   **Variance and Standard Deviation:** Measures of spread for a single variable.
    *   **Covariance:** How two variables change together.
    *   **Covariance Matrix:** A matrix representing the covariances between multiple variables in a vector.
    *   **Gaussian (Normal) Distribution:** The bell-curve distribution, its properties, and how it's represented by mean and covariance.
*   **State-Space Representation:**
    *   **System State:** A set of variables that completely describe the system's condition at any given time (e.g., position, velocity).
    *   **State Vector ($x$):** A column vector containing the system's state variables.
    *   **Process Model (or State Transition Model):** A function describing how the system's state evolves over time ($x_k = f(x_{k-1}, u_{k-1})$).
    *   **Measurement Model (or Observation Model):** A function describing how the system's state relates to measurements ($z_k = h(x_k)$).
*   **Kalman Filter (KF):**
    *   **Fundamental Idea:** Optimal estimation for linear systems with Gaussian noise.
    *   **Prediction Step:** How the filter projects the state and its uncertainty forward in time.
    *   **Update Step:** How the filter incorporates new measurements to refine the state estimate and reduce uncertainty.
    *   **Kalman Gain:** The factor that determines how much the measurements influence the state update.
    *   **Process Noise ($Q$):** Uncertainty in the system's dynamics.
    *   **Measurement Noise ($R$):** Uncertainty in the sensors.
    *   **State Estimate ($\hat{x}$):** The filter's best guess of the system's state.
    *   **Covariance Matrix ($P$):** The filter's estimate of the uncertainty in the state estimate.

## 4. The core idea — step by step

The Extended Kalman Filter (EKF) is essentially a Kalman Filter applied to nonlinear systems by continually linearizing the system's dynamics and measurement models around the current state estimate. Let's break down this core idea.

### Step 1: The Problem with Nonlinearity

*   **Plain English:** The standard Kalman Filter (KF) is amazing, but it has a strict rule: everything must be "linear." This means if you plot how your system moves, it has to be a straight line, and if you plot how your sensors see the system, that also has to be a straight line. If you try to use the KF on a curvy movement or a complicated sensor reading, it will get confused and give bad estimates.
*   **Concrete Example:** Imagine tracking a ball thrown in the air. Its vertical motion is governed by gravity, which is a quadratic relationship (height changes with time squared). This is a curve, not a straight line. If your sensor measures range and bearing, these also relate to position in a curvy, trigonometric way. The KF can't directly handle $y = x^2$ or $z = \sqrt{x^2+y^2}$.
*   **Formal/Mathematical Version:**
    A linear system is described by:
    $$x_k = A_k x_{k-1} + B_k u_k + w_k$$
    $$z_k = C_k x_k + v_k$$
    where $A_k, B_k, C_k$ are matrices.
    A nonlinear system is described by:
    $$x_k = f(x_{k-1}, u_k) + w_k$$
    $$z_k = h(x_k) + v_k$$
    Here, $f(\cdot)$ and $h(\cdot)$ are *nonlinear* functions. The KF equations directly use $A_k$ and $C_k$ to propagate the mean and covariance. If $f$ and $h$ are nonlinear, there are no simple $A_k$ and $C_k$ matrices that work for the whole system.
*   **What could go wrong:** If you just plug in the nonlinear functions directly into the KF equations (ignoring the matrix multiplications), the math breaks down. If you try to approximate them with *fixed* linear matrices, your estimates will quickly diverge from the true state, especially if the system moves far from the point where you made your approximation.

### Step 2: Linearization via Taylor Series Expansion

*   **Plain English:** Since we can't use the full curvy function, we'll cheat a little. At any given moment, we have our *best guess* of the system's current state. We'll pretend that for a very small step around this best guess, the curvy function behaves *almost exactly* like a straight line (its tangent). We use this tangent line as our temporary "linear" model.
*   **Concrete Example:** Consider the function $y = x^2$. If our best guess for $x$ is $x=2$, then $y=4$. The derivative at $x=2$ is $2x = 4$. So, the tangent line at $x=2$ is $y - 4 = 4(x - 2)$, or $y = 4x - 4$. For values of $x$ very close to 2 (e.g., 2.01 or 1.99), $x^2$ is very close to $4x-4$. We use $4x-4$ as our "linear approximation."
*   **Formal/Mathematical Version:**
    A function $f(x)$ can be approximated around a point $a$ using its Taylor series expansion:
    $$f(x) \approx f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \dots$$
    For linearization, we only care about the *first-order* approximation (the tangent line):
    $$f(x) \approx f(a) + f'(a)(x-a)$$
    If $f$ is a multi-variable function $f(\mathbf{x})$, and we linearize around a point $\mathbf{a}$, this becomes:
    $$f(\mathbf{x}) \approx f(\mathbf{a}) + \frac{\partial f}{\partial \mathbf{x}}|_{\mathbf{x}=\mathbf{a}}(\mathbf{x}-\mathbf{a})$$
    The term $\frac{\partial f}{\partial \mathbf{x}}|_{\mathbf{x}=\mathbf{a}}$ is a matrix of partial derivatives, which we call the Jacobian matrix.
*   **What could go wrong:** This approximation is only good *very close* to the point of linearization. If the system moves far away, or if the nonlinearity is very severe (e.g., a sharp corner), the tangent line becomes a poor representation, and the filter's estimates will suffer.

### Step 3: The Jacobian Matrix

*   **Plain English:** When we have a function that takes multiple inputs and produces multiple outputs (like predicting a drone's 3D position and velocity from its previous 3D position and velocity), a single derivative isn't enough. We need a "multi-variable derivative" that captures how *each* output changes with respect to *each* input. This collection of all these partial derivatives is organized into a matrix called the Jacobian.
*   **Concrete Example:** Suppose a drone's next position $(x_k, y_k)$ depends on its previous position $(x_{k-1}, y_{k-1})$ and velocity $(v_{x,k-1}, v_{y,k-1})$ via some complex functions, and its next velocity depends on the previous velocity and some control input. The Jacobian matrix would tell you how a tiny change in $x_{k-1}$ affects $x_k$, $y_k$, $v_{x,k}$, etc., and similarly for changes in $y_{k-1}$, $v_{x,k-1}$, etc.
*   **Formal/Mathematical Version:**
    For a vector-valued function $\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^m$, where $\mathbf{f}(\mathbf{x}) = \begin{pmatrix} f_1(\mathbf{x}) \\ f_2(\mathbf{x}) \\ \vdots \\ f_m(\mathbf{x}) \end{pmatrix}$ and $\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}$, the Jacobian matrix $J$ is an $m \times n$ matrix defined as:
    $$J = \frac{\partial \mathbf{f}}{\partial \mathbf{x}} = \begin{pmatrix}
    \frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} & \dots & \frac{\partial f_1}{\partial x_n} \\
    \frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2} & \dots & \frac{\partial f_2}{\partial x_n} \\
    \vdots & \vdots & \ddots & \vdots \\
    \frac{\partial f_m}{\partial x_1} & \frac{\partial f_m}{\partial x_2} & \dots & \frac{\partial f_m}{\partial x_n}
    \end{pmatrix}$$
    In the EKF, we need two main Jacobians:
    1.  $F_k$: The Jacobian of the process model $f$ with respect to the state $x$, evaluated at the previous state estimate. This replaces the $A_k$ matrix.
    2.  $H_k$: The Jacobian of the measurement model $h$ with respect to the state $x$, evaluated at the predicted state estimate. This replaces the $C_k$ matrix.
*   **What could go wrong:** Calculating the Jacobians incorrectly is the most common source of errors in EKF implementation. Even a single sign error or a missed partial derivative can lead to filter divergence.

### Step 4: EKF Prediction Step

*   **Plain English:** This is where we guess where the system will be next. First, we use the *full nonlinear* motion model to predict the next state. Then, we use the Jacobian of this motion model to figure out how much the *uncertainty* in our state (represented by the covariance matrix) will spread out as the system moves. We're essentially saying, "If my current guess is here, and my uncertainty is this big, then my next guess will be there, and my uncertainty will be this much bigger, based on the local straight-line approximation of how things move."
*   **Concrete Example:** You're tracking a rocket. You know its current estimated position and velocity. You use the complex equations of motion (including gravity, thrust, drag—all nonlinear) to predict its *exact* position and velocity a second later. Then, you calculate the Jacobian of these motion equations around your *current estimated state*. This Jacobian tells you how errors in your current position/velocity will propagate to errors in your future position/velocity, allowing you to predict the uncertainty.
*   **Formal/Mathematical Version:**
    1.  **Project the state estimate:** We use the *nonlinear* process model $f$ to project the previous state estimate $\hat{x}_{k-1|k-1}$ forward in time to get the *predicted* state estimate $\hat{x}_{k|k-1}$.
        $$\hat{x}_{k|k-1} = f(\hat{x}_{k-1|k-1}, u_{k-1})$$
        where $u_{k-1}$ is the control input.
    2.  **Compute the Jacobian of the process model:** We calculate the Jacobian matrix $F_k$ of $f$ with respect to $x$, evaluated at the previous state estimate $\hat{x}_{k-1|k-1}$.
        $$F_k = \frac{\partial f}{\partial x}\bigg|_{x=\hat{x}_{k-1|k-1}, u=u_{k-1}}$$
    3.  **Project the error covariance:** We use this linearized $F_k$ to project the previous error covariance $P_{k-1|k-1}$ forward. We also add the process noise covariance $Q_k$.
        $$P_{k|k-1} = F_k P_{k-1|k-1} F_k^T + Q_k$$
*   **What could go wrong:** If the system is highly nonlinear and the time step is large, the linear approximation $F_k$ might not accurately represent the change in uncertainty, leading to overly optimistic or pessimistic covariance predictions.

### Step 5: EKF Update Step

*   **Plain English:** Now we've made a prediction, and we get a new measurement from our sensors. We need to combine our prediction with this new measurement. First, we figure out what our sensor *should* have seen if our predicted state was perfectly correct, using the *full nonlinear* measurement model. Then, we compare this "expected measurement" to the *actual* measurement we received. The difference is the "innovation" or "residual." We then use the Jacobian of the measurement model to figure out how to best "blend" this innovation with our predicted state and uncertainty. This Jacobian essentially tells us how our errors in state translate into errors in measurement, helping the filter decide how much to trust the new measurement.
*   **Concrete Example:** Your rocket's predicted position is $(X, Y, Z)$. Your sensor is a radar that measures range $R = \sqrt{X^2+Y^2+Z^2}$. You calculate the expected range $h(\hat{x}_{k|k-1})$. Then you get an actual radar reading $z_k$. The difference $z_k - h(\hat{x}_{k|k-1})$ is your residual. You then calculate the Jacobian of the range function $h$ with respect to $(X, Y, Z)$ at your predicted position. This Jacobian helps the filter understand how much a small error in $X, Y,$ or $Z$ would affect the range measurement, allowing it to correctly adjust the state.
*   **Formal/Mathematical Version:**
    1.  **Compute the expected measurement:** We use the *nonlinear* measurement model $h$ to predict what the measurement $z_k$ *should* be, given our predicted state $\hat{x}_{k|k-1}$.
        $$\hat{z}_{k|k-1} = h(\hat{x}_{k|k-1})$$
    2.  **Compute the measurement residual (innovation):** The difference between the actual measurement $z_k$ and the expected measurement $\hat{z}_{k|k-1}$.
        $$y_k = z_k - \hat{z}_{k|k-1}$$
    3.  **Compute the Jacobian of the measurement model:** We calculate the Jacobian matrix $H_k$ of $h$ with respect to $x$, evaluated at the *predicted* state estimate $\hat{x}_{k|k-1}$.
        $$H_k = \frac{\partial h}{\partial x}\bigg|_{x=\hat{x}_{k|k-1}}$$
    4.  **Compute the innovation covariance:** This represents the uncertainty in the measurement residual.
        $$S_k = H_k P_{k|k-1} H_k^T + R_k$$
        where $R_k$ is the measurement noise covariance.
    5.  **Compute the Kalman Gain:** This gain $K_k$ determines how much the measurement residual influences the state update.
        $$K_k = P_{k|k-1} H_k^T S_k^{-1}$$
    6.  **Update the state estimate:** We combine the predicted state with the weighted measurement residual.
        $$\hat{x}_{k|k} = \hat{x}_{k|k-1} + K_k y_k$$
    7.  **Update the error covariance:** We reduce the uncertainty in our state estimate based on the new measurement.
        $$P_{k|k} = (I - K_k H_k) P_{k|k-1}$$
*   **What could go wrong:** If the measurement function $h$ is highly nonlinear, the linear approximation $H_k$ might not accurately map state errors to measurement errors, leading to suboptimal or even diverging updates. Also, if $S_k$ is singular (non-invertible), the Kalman Gain calculation fails.

### Step 6: The Full EKF Cycle

*   **Plain English:** The EKF continuously repeats these prediction and update steps. It's an ongoing loop: guess, get a reading, correct your guess, then guess again, get another reading, correct again, and so on. The key is that at *each step*, it re-linearizes the system around its *latest best guess*. This makes it adaptive to the changing nonlinear behavior.
*   **Concrete Example:** A self-driving car continuously predicts its position based on its internal sensors and control commands. When it receives new data from its LiDAR (measurements), it updates its position estimate. Then, it immediately uses this *new, more accurate* position to predict where it will be next, and so on, thousands of times per second.
*   **Formal/Mathematical Version:** The EKF operates in a recursive loop:
    1.  **Initialization:** Set initial state estimate $\hat{x}_{0|0}$ and initial error covariance $P_{0|0}$.
    2.  **For each time step $k=1, 2, \dots$:**
        *   **Prediction (Time Update):**
            *   $\hat{x}_{k|k-1} = f(\hat{x}_{k-1|k-1}, u_{k-1})$
            *   $F_k = \frac{\partial f}{\partial x}\bigg|_{x=\hat{x}_{k-1|k-1}, u=u_{k-1}}$
            *   $P_{k|k-1} = F_k P_{k-1|k-1} F_k^T + Q_k$
        *   **Update (Measurement Update):**
            *   $\hat{z}_{k|k-1} = h(\hat{x}_{k|k-1})$
            *   $y_k = z_k - \hat{z}_{k|k-1}$
            *   $H_k = \frac{\partial h}{\partial x}\bigg|_{x=\hat{x}_{k|k-1}}$
            *   $S_k = H_k P_{k|k-1} H_k^T + R_k$
            *   $K_k = P_{k|k-1} H_k^T S_k^{-1}$
            *   $\hat{x}_{k|k} = \hat{x}_{k|k-1} + K_k y_k$
            *   $P_{k|k} = (I - K_k H_k) P_{k|k-1}$
*   **What could go wrong:** If the initial estimate $\hat{x}_{0|0}$ is far from the true state, or $P_{0|0}$ is too small (overconfident), the linear approximations might be made at a point where they are very inaccurate, causing the filter to diverge and never recover. The EKF is not guaranteed to be optimal or even stable for highly nonlinear systems.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple 1D Nonlinear System with Linear Measurement

**Problem:**
Consider a 1D system where the state is $x$. The process model is $x_k = x_{k-1}^2 + w_k$, where $w_k \sim \mathcal{N}(0, Q)$. The measurement model is linear: $z_k = x_k + v_k$, where $v_k \sim \mathcal{N}(0, R)$.
Given:
*   Initial state estimate: $\hat{x}_{0|0} = 1.5$
*   Initial covariance: $P_{0|0} = 0.1$
*   Process noise covariance: $Q = 0.01$
*   Measurement noise covariance: $R = 0.1$
*   At time $k=1$, the actual measurement is $z_1 = 1.8$.

Perform one EKF prediction and update step for $k=1$.

**Solution:**

**1. Define the models:**
*   Process model: $f(x) = x^2$
*   Measurement model: $h(x) = x$

**2. Calculate Jacobians:**
*   Process Jacobian $F_k$:
    $$F_k = \frac{\partial f}{\partial x} = \frac{\partial (x^2)}{\partial x} = 2x$$
*   Measurement Jacobian $H_k$:
    $$H_k = \frac{\partial h}{\partial x} = \frac{\partial x}{\partial x} = 1$$

---

**EKF Step for k=1:**

**A. Prediction Step:**

*   **1. Project the state estimate:**
    We use the nonlinear process model $f(x)$ with the previous state estimate $\hat{x}_{0|0}$.
    $$\hat{x}_{1|0} = f(\hat{x}_{0|0}) = (\hat{x}_{0|0})^2$$
    Substitute the given value $\hat{x}_{0|0} = 1.5$:
    $$\hat{x}_{1|0} = (1.5)^2 = 2.25$$
    *This is our best guess for the state at time 1, before seeing any new measurements.*

*   **2. Compute the Jacobian of the process model:**
    We evaluate $F_k = 2x$ at the *previous* state estimate $\hat{x}_{0|0}$.
    $$F_1 = 2 \cdot \hat{x}_{0|0} = 2 \cdot 1.5 = 3$$
    *This is the slope of the tangent line to $f(x)=x^2$ at $x=1.5$. It tells us how sensitive the state transition is to small changes in the previous state.*

*   **3. Project the error covariance:**
    We use the formula $P_{k|k-1} = F_k P_{k-1|k-1} F_k^T + Q_k$. Since this is 1D, $F_k^T = F_k$.
    $$P_{1|0} = F_1 P_{0|0} F_1 + Q$$
    Substitute values $F_1=3$, $P_{0|0}=0.1$, $Q=0.01$:
    $$P_{1|0} = (3)(0.1)(3) + 0.01$$
    $$P_{1|0} = 0.9 + 0.01 = 0.91$$
    *This is our predicted uncertainty for the state at time 1. Notice how the uncertainty grew significantly due to the squaring operation ($F_1$ being 3 means errors are magnified by a factor of 3, and then squared due to the $F_1 P F_1^T$ term).*

---

**B. Update Step:**

*   **1. Compute the expected measurement:**
    We use the nonlinear (in this case, linear) measurement model $h(x)$ with the *predicted* state estimate $\hat{x}_{1|0}$.
    $$\hat{z}_{1|0} = h(\hat{x}_{1|0}) = \hat{x}_{1|0}$$
    Substitute $\hat{x}_{1|0} = 2.25$:
    $$\hat{z}_{1|0} = 2.25$$
    *This is what we expected to measure if our prediction was perfect.*

*   **2. Compute the measurement residual (innovation):**
    The difference between the actual measurement $z_1$ and our expected measurement $\hat{z}_{1|0}$.
    $$y_1 = z_1 - \hat{z}_{1|0}$$
    Substitute $z_1 = 1.8$ and $\hat{z}_{1|0} = 2.25$:
    $$y_1 = 1.8 - 2.25 = -0.45$$
    *The actual measurement was lower than what we predicted, indicating our prediction was too high.*

*   **3. Compute the Jacobian of the measurement model:**
    We evaluate $H_k = 1$ at the *predicted* state estimate $\hat{x}_{1|0}$. Since $H_k$ is a constant, it's simply:
    $$H_1 = 1$$
    *This represents how changes in the state affect the measurement. Since it's a direct measurement of the state, the relationship is 1-to-1.*

*   **4. Compute the innovation covariance:**
    $$S_1 = H_1 P_{1|0} H_1^T + R$$
    Substitute $H_1=1$, $P_{1|0}=0.91$, $R=0.1$:
    $$S_1 = (1)(0.91)(1) + 0.1$$
    $$S_1 = 0.91 + 0.1 = 1.01$$
    *This is the total uncertainty in our measurement residual, combining the uncertainty from our prediction and the sensor's own noise.*

*   **5. Compute the Kalman Gain:**
    $$K_1 = P_{1|0} H_1^T S_1^{-1}$$
    Substitute $P_{1|0}=0.91$, $H_1=1$, $S_1=1.01$:
    $$K_1 = (0.91)(1)(1.01)^{-1}$$
    $$K_1 = \frac{0.91}{1.01} \approx 0.90099$$
    *The Kalman Gain tells us how much to trust the new measurement relative to our prediction. A value close to 1 means trust the measurement more, a value close to 0 means trust the prediction more. Here, it's quite high, indicating the measurement has significant weight.*

*   **6. Update the state estimate:**
    $$\hat{x}_{1|1} = \hat{x}_{1|0} + K_1 y_1$$
    Substitute $\hat{x}_{1|0}=2.25$, $K_1 \approx 0.90099$, $y_1=-0.45$:
    $$\hat{x}_{1|1} = 2.25 + (0.90099)(-0.45)$$
    $$\hat{x}_{1|1} = 2.25 - 0.4054455 \approx 1.84455$$
    *This is our refined, optimal estimate of the state at time 1, after incorporating the measurement.*

*   **7. Update the error covariance:**
    $$P_{1|1} = (I - K_1 H_1) P_{1|0}$$
    Substitute $K_1 \approx 0.90099$, $H_1=1$, $P_{1|0}=0.91$:
    $$P_{1|1} = (1 - (0.90099)(1)) (0.91)$$
    $$P_{1|1} = (1 - 0.90099) (0.91)$$
    $$P_{1|1} = (0.09901) (0.91) \approx 0.09010$$
    *This is the reduced uncertainty in our updated state estimate. It's smaller than $P_{1|0}$, as expected, because the measurement helped us reduce uncertainty.*

**Final Answer:**
The updated state estimate is $\boxed{\hat{x}_{1|1} \approx 1.84455}$
The updated covariance is $\boxed{P_{1|1} \approx 0.09010}$

**Reflection:**
The trickiness here was primarily in remembering to evaluate $F_k$ at the *previous* state estimate ($\hat{x}_{k-1|k-1}$) and $H_k$ at the *predicted* state estimate ($\hat{x}_{k|k-1}$). Also, the significant increase in $P_{1|0}$ from $P_{0|0}$ highlights how nonlinearity can quickly amplify uncertainty. The Kalman Gain was high, indicating the measurement pulled the estimate significantly towards itself (from 2.25 to 1.84).

---

### Example 2: 2D System with Nonlinear Motion and Linear Measurement

**Problem:**
A 2D object moves according to the following nonlinear process model:
$$x_k = \begin{pmatrix} x_{1,k} \\ x_{2,k} \end{pmatrix} = \begin{pmatrix} x_{1,k-1} + x_{2,k-1} \\ 0.1 x_{1,k-1}^2 + w_{2,k} \end{pmatrix} + \begin{pmatrix} w_{1,k} \\ 0 \end{pmatrix}$$
where $w_k \sim \mathcal{N}(0, Q)$.
The measurement model is linear, observing only the first state component:
$$z_k = x_{1,k} + v_k$$
where $v_k \sim \mathcal{N}(0, R)$.

Given:
*   Initial state estimate: $\hat{x}_{0|0} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$
*   Initial covariance: $P_{0|0} = \begin{pmatrix} 0.1 & 0 \\ 0 & 0.1 \end{pmatrix}$
*   Process noise covariance: $Q = \begin{pmatrix} 0.01 & 0 \\ 0 & 0.01 \end{pmatrix}$
*   Measurement noise covariance: $R = 0.05$
*   At time $k=1$, the actual measurement is $z_1 = 1.2$.

Perform one EKF prediction and update step for $k=1$.

**Solution:**

**1. Define the models:**
*   Process model: $f(x) = \begin{pmatrix} f_1(x) \\ f_2(x) \end{pmatrix} = \begin{pmatrix} x_1 + x_2 \\ 0.1 x_1^2 \end{pmatrix}$
*   Measurement model: $h(x) = x_1$

**2. Calculate Jacobians:**
*   Process Jacobian $F_k$:
    $$F_k = \frac{\partial f}{\partial x} = \begin{pmatrix}
    \frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} \\
    \frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2}
    \end{pmatrix} = \begin{pmatrix}
    \frac{\partial (x_1 + x_2)}{\partial x_1} & \frac{\partial (x_1 + x_2)}{\partial x_2} \\
    \frac{\partial (0.1 x_1^2)}{\partial x_1} & \frac{\partial (0.1 x_1^2)}{\partial x_2}
    \end{pmatrix} = \begin{pmatrix}
    1 & 1 \\
    0.2 x_1 & 0
    \end{pmatrix}$$
*   Measurement Jacobian $H_k$:
    $$H_k = \frac{\partial h}{\partial x} = \begin{pmatrix}
    \frac{\partial h}{\partial x_1} & \frac{\partial h}{\partial x_2}
    \end{pmatrix} = \begin{pmatrix}
    \frac{\partial x_1}{\partial x_1} & \frac{\partial x_1}{\partial x_2}
    \end{pmatrix} = \begin{pmatrix} 1 & 0 \end{pmatrix}$$

---

**EKF Step for k=1:**

**A. Prediction Step:**

*   **1. Project the state estimate:**
    Use the nonlinear process model $f(x)$ with $\hat{x}_{0|0} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.
    $$\hat{x}_{1|0} = f(\hat{x}_{0|0}) = \begin{pmatrix} \hat{x}_{1,0|0} + \hat{x}_{2,0|0} \\ 0.1 \hat{x}_{1,0|0}^2 \end{pmatrix}$$
    Substitute values:
    $$\hat{x}_{1|0} = \begin{pmatrix} 1 + 0 \\ 0.1 (1)^2 \end{pmatrix} = \begin{pmatrix} 1 \\ 0.1 \end{pmatrix}$$
    *This is our best guess for the 2D state at time 1, before incorporating measurements.*

*   **2. Compute the Jacobian of the process model:**
    Evaluate $F_k = \begin{pmatrix} 1 & 1 \\ 0.2 x_1 & 0 \end{pmatrix}$ at the *previous* state estimate $\hat{x}_{0|0} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.
    $$F_1 = \begin{pmatrix} 1 & 1 \\ 0.2 \cdot (1) & 0 \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 0.2 & 0 \end{pmatrix}$$
    *This matrix linearizes the process model around our initial state. It tells us how small changes in $x_1$ and $x_2$ at $k=0$ propagate to changes in $x_1$ and $x_2$ at $k=1$.*

*   **3. Project the error covariance:**
    $$P_{1|0} = F_1 P_{0|0} F_1^T + Q$$
    Substitute values:
    $$P_{1|0} = \begin{pmatrix} 1 & 1 \\ 0.2 & 0 \end{pmatrix} \begin{pmatrix} 0.1 & 0 \\ 0 & 0.1 \end{pmatrix} \begin{pmatrix} 1 & 0.2 \\ 1 & 0 \end{pmatrix} + \begin{pmatrix} 0.01 & 0 \\ 0 & 0.01 \end{pmatrix}$$
    First, calculate $F_1 P_{0|0}$:
    $$\begin{pmatrix} 1 & 1 \\ 0.2 & 0 \end{pmatrix} \begin{pmatrix} 0.1 & 0 \\ 0 & 0.1 \end{pmatrix} = \begin{pmatrix} 1 \cdot 0.1 + 1 \cdot 0 & 1 \cdot 0 + 1 \cdot 0.1 \\ 0.2 \cdot 0.1 + 0 \cdot 0 & 0.2 \cdot 0 + 0 \cdot 0.1 \end{pmatrix} = \begin{pmatrix} 0.1 & 0.1 \\ 0.02 & 0 \end{pmatrix}$$
    Next, multiply by $F_1^T$:
    $$\begin{pmatrix} 0.1 & 0.1 \\ 0.02 & 0 \end{pmatrix} \begin{pmatrix} 1 & 0.2 \\ 1 & 0 \end{pmatrix} = \begin{pmatrix} 0.1 \cdot 1 + 0.1 \cdot 1 & 0.1 \cdot 0.2 + 0.1 \cdot 0 \\ 0.02 \cdot 1 + 0 \cdot 1 & 0.02 \cdot 0.2 + 0 \cdot 0 \end{pmatrix} = \begin{pmatrix} 0.2 & 0.02 \\ 0.02 & 0.004 \end{pmatrix}$$
    Finally, add $Q$:
    $$P_{1|0} = \begin{pmatrix} 0.2 & 0.02 \\ 0.02 & 0.004 \end{pmatrix} + \begin{pmatrix} 0.01 & 0 \\ 0 & 0.01 \end{pmatrix} = \begin{pmatrix} 0.21 & 0.02 \\ 0.02 & 0.014 \end{pmatrix}$$
    *This is our predicted uncertainty matrix for the state at time 1. Notice how the nonlinearity (via $F_1$) and process noise ($Q$) contribute to spreading out the uncertainty.*

---

**B. Update Step:**

*   **1. Compute the expected measurement:**
    Use the measurement model $h(x)$ with the *predicted* state estimate $\hat{x}_{1|0} = \begin{pmatrix} 1 \\ 0.1 \end{pmatrix}$.
    $$\hat{z}_{1|0} = h(\hat{x}_{1|0}) = \hat{x}_{1,1|0}$$
    Substitute value:
    $$\hat{z}_{1|0} = 1$$
    *This is what we expected to measure for $x_1$ if our prediction was perfectly accurate.*

*   **2. Compute the measurement residual (innovation):**
    $$y_1 = z_1 - \hat{z}_{1|0}$$
    Substitute $z_1 = 1.2$ and $\hat{z}_{1|0} = 1$:
    $$y_1 = 1.2 - 1 = 0.2$$
    *The actual measurement of $x_1$ was higher than our prediction, so our prediction was too low.*

*   **3. Compute the Jacobian of the measurement model:**
    Evaluate $H_k = \begin{pmatrix} 1 & 0 \end{pmatrix}$ at the *predicted* state estimate $\hat{x}_{1|0}$. Since $H_k$ is constant, it's simply:
    $$H_1 = \begin{pmatrix} 1 & 0 \end{pmatrix}$$
    *This matrix describes how errors in the state components ($x_1, x_2$) affect the measurement. Only $x_1$ directly impacts the measurement.*

*   **4. Compute the innovation covariance:**
    $$S_1 = H_1 P_{1|0} H_1^T + R$$
    Substitute $H_1=\begin{pmatrix} 1 & 0 \end{pmatrix}$, $P_{1|0}=\begin{pmatrix} 0.21 & 0.02 \\ 0.02 & 0.014 \end{pmatrix}$, $R=0.05$:
    $$S_1 = \begin{pmatrix} 1 & 0 \end{pmatrix} \begin{pmatrix} 0.21 & 0.02 \\ 0.02 & 0.014 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \end{pmatrix} + 0.05$$
    First, calculate $H_1 P_{1|0}$:
    $$\begin{pmatrix} 1 & 0 \end{pmatrix} \begin{pmatrix} 0.21 & 0.02 \\ 0.02 & 0.014 \end{pmatrix} = \begin{pmatrix} 0.21 & 0.02 \end{pmatrix}$$
    Next, multiply by $H_1^T$:
    $$\begin{pmatrix} 0.21 & 0.02 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \end{pmatrix} = 0.21 \cdot 1 + 0.02 \cdot 0 = 0.21$$
    Finally, add $R$:
    $$S_1 = 0.21 + 0.05 = 0.26$$
    *This is the total uncertainty in our measurement residual.*

*   **5. Compute the Kalman Gain:**
    $$K_1 = P_{1|0} H_1^T S_1^{-1}$$
    Substitute $P_{1|0}=\begin{pmatrix} 0.21 & 0.02 \\ 0.02 & 0.014 \end{pmatrix}$, $H_1^T=\begin{pmatrix} 1 \\ 0 \end{pmatrix}$, $S_1^{-1} = (0.26)^{-1} \approx 3.846$:
    $$K_1 = \begin{pmatrix} 0.21 & 0.02 \\ 0.02 & 0.014 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \end{pmatrix} (3.846)$$
    $$K_1 = \begin{pmatrix} 0.21 \\ 0.02 \end{pmatrix} (3.846) = \begin{pmatrix} 0.80766 \\ 0.07692 \end{pmatrix}$$
    *The Kalman Gain is a vector here because our state is 2D and our measurement is 1D. It tells us how much to adjust each component of our state estimate based on the measurement residual. The first component of the state is adjusted much more, as expected, since the measurement directly relates to $x_1$.*

*   **6. Update the state estimate:**
    $$\hat{x}_{1|1} = \hat{x}_{1|0} + K_1 y_1$$
    Substitute $\hat{x}_{1|0}=\begin{pmatrix} 1 \\ 0.1 \end{pmatrix}$, $K_1=\begin{pmatrix} 0.80766 \\ 0.07692 \end{pmatrix}$, $y_1=0.2$:
    $$\hat{x}_{1|1} = \begin{pmatrix} 1 \\ 0.1 \end{pmatrix} + \begin{pmatrix} 0.80766 \\ 0.07692 \end{pmatrix} (0.2)$$
    $$\hat{x}_{1|1} = \begin{pmatrix} 1 \\ 0.1 \end{pmatrix} + \begin{pmatrix} 0.161532 \\ 0.015384 \end{pmatrix} = \begin{pmatrix} 1.161532 \\ 0.115384 \end{pmatrix}$$
    *Our updated state estimate. Both components have been adjusted upwards, with $x_1$ seeing a larger correction.*

*   **7. Update the error covariance:**
    $$P_{1|1} = (I - K_1 H_1) P_{1|0}$$
    First, calculate $I - K_1 H_1$:
    $$I - K_1 H_1 = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} - \begin{pmatrix} 0.80766 \\ 0.07692 \end{pmatrix} \begin{pmatrix} 1 & 0 \end{pmatrix}$$
    $$I - K_1 H_1 = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} - \begin{pmatrix} 0.80766 \cdot 1 & 0.80766 \cdot 0 \\ 0.07692 \cdot 1 & 0.07692 \cdot 0 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} - \begin{pmatrix} 0.80766 & 0 \\ 0.07692 & 0 \end{pmatrix}$$
    $$I - K_1 H_1 = \begin{pmatrix} 1 - 0.80766 & 0 - 0 \\ 0 - 0.07692 & 1 - 0 \end{pmatrix} = \begin{pmatrix} 0.19234 & 0 \\ -0.07692 & 1 \end{pmatrix}$$
    Now, multiply by $P_{1|0}$:
    $$P_{1|1} = \begin{pmatrix} 0.19234 & 0 \\ -0.07692 & 1 \end{pmatrix} \begin{pmatrix} 0.21 & 0.02 \\ 0.02 & 0.014 \end{pmatrix}$$
    $$P_{1|1} = \begin{pmatrix}
    0.19234 \cdot 0.21 + 0 \cdot 0.02 & 0.19234 \cdot 0.02 + 0 \cdot 0.014 \\
    -0.07692 \cdot 0.21 + 1 \cdot 0.02 & -0.07692 \cdot 0.02 + 1 \cdot 0.014
    \end{pmatrix}$$
    $$P_{1|1} = \begin{pmatrix}
    0.0403914 & 0.0038468 \\
    -0.0161532 + 0.02 & -0.0015384 + 0.014
    \end{pmatrix}$$
    $$P_{1|1} = \begin{pmatrix}
    0.04039 & 0.00385 \\
    0.00385 & 0.01246
    \end{pmatrix}$$
    *Our updated uncertainty matrix. The diagonal elements (variances) have decreased, indicating reduced uncertainty, and the off-diagonal elements show the correlation between the errors in $x_1$ and $x_2$.*

**Final Answer:**
The updated state estimate is $\boxed{\hat{x}_{1|1} \approx \begin{pmatrix} 1.1615 \\ 0.1154 \end{pmatrix}}$
The updated covariance is $\boxed{P_{1|1} \approx \begin{pmatrix} 0.0404 & 0.0038 \\ 0.0038 & 0.0125 \end{pmatrix}}$

**Reflection:**
This example involved matrix multiplication and evaluation of a Jacobian with a variable ($x_1$). The process was similar to the 1D case but required careful matrix algebra. The key takeaway is that even though only $x_1$ was measured, the correlation in the covariance matrix allowed the filter to make an informed (though smaller) update to $x_2$ as well.

---

### Example 3: 2D System with Nonlinear Motion and Nonlinear Measurement (Range-Bearing Sensor)

**Problem:**
A robot moves in 2D space. Its state is $x = \begin{pmatrix} p_x \\ p_y \end{pmatrix}$, representing its $(x, y)$ position.
The process model is:
$$x_k = \begin{pmatrix} p_{x,k-1} + 0.1 \cos(p_{y,k-1}) \\ p_{y,k-1} + 0.1 \sin(p_{x,k-1}) \end{pmatrix} + w_k$$
where $w_k \sim \mathcal{N}(0, Q)$. This is a simplified, highly nonlinear motion.
The robot uses a range-bearing sensor located at the origin $(0,0)$ to measure a landmark's range $r$ and bearing $\theta$ relative to the robot's current position. The landmark is fixed at $L = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$. The measurement model is:
$$z_k = \begin{pmatrix} r_k \\ \theta_k \end{pmatrix} = \begin{pmatrix} \sqrt{(L_x - p_x)^2 + (L_y - p_y)^2} \\ \operatorname{atan2}(L_y - p_y, L_x - p_x) \end{pmatrix} + v_k$$
where $v_k \sim \mathcal{N}(0, R)$.

Given:
*   Initial state estimate: $\hat{x}_{0|0} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$
*   Initial covariance: $P_{0|0} = \begin{pmatrix} 0.1 & 0 \\ 0 & 0.1 \end{pmatrix}$
*   Process noise covariance: $Q = \begin{pmatrix} 0.001 & 0 \\ 0 & 0.001 \end{pmatrix}$
*   Measurement noise covariance: $R = \begin{pmatrix} 0.01 & 0 \\ 0 & 0.005 \end{pmatrix}$ (range variance, bearing variance)
*   At time $k=1$, the actual measurement is $z_1 = \begin{pmatrix} 1.4 \\ 0.8 \end{pmatrix}$ (range, bearing in radians).

Perform one EKF prediction and update step for $k=1$.

**Solution:**

**1. Define the models:**
*   Process model: $f(x) = \begin{pmatrix} f_1(x) \\ f_2(x) \end{pmatrix} = \begin{pmatrix} x_1 + 0.1 \cos(x_2) \\ x_2 + 0.1 \sin(x_1) \end{pmatrix}$
*   Measurement model: $h(x) = \begin{pmatrix} h_1(x) \\ h_2(x) \end{pmatrix} = \begin{pmatrix} \sqrt{(1 - x_1)^2 + (1 - x_2)^2} \\ \operatorname{atan2}(1 - x_2, 1 - x_1) \end{pmatrix}$
    Let $dx = 1 - x_1$ and $dy = 1 - x_2$. Then $h_1(x) = \sqrt{dx^2 + dy^2}$ and $h_2(x) = \operatorname{atan2}(dy, dx)$.

**2. Calculate Jacobians:**
*   Process Jacobian $F_k$:
    $$F_k = \frac{\partial f}{\partial x} = \begin{pmatrix}
    \frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} \\
    \frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2}
    \end{pmatrix} = \begin{pmatrix}
    \frac{\partial (x_1 + 0.1 \cos(x_2))}{\partial x_1} & \frac{\partial (x_1 + 0.1 \cos(x_2))}{\partial x_2} \\
    \frac{\partial (x_2 + 0.1 \sin(x_1))}{\partial x_1} & \frac{\partial (x_2 + 0.1 \sin(x_1))}{\partial x_2}
    \end{pmatrix}$$
    $$F_k = \begin{pmatrix}
    1 & -0.1 \sin(x_2) \\
    0.1 \cos(x_1) & 1
    \end{pmatrix}$$
*   Measurement Jacobian $H_k$:
    Let $r = \sqrt{dx^2 + dy^2}$.
    $\frac{\partial h_1}{\partial x_1} = \frac{\partial r}{\partial x_1} = \frac{1}{2\sqrt{dx^2+dy^2}} \cdot 2(dx)(-1) = \frac{-dx}{r}$
    $\frac{\partial h_1}{\partial x_2} = \frac{\partial r}{\partial x_2} = \frac{1}{2\sqrt{dx^2+dy^2}} \cdot 2(dy)(-1) = \frac{-dy}{r}$
    $\frac{\partial h_2}{\partial x_1} = \frac{\partial \operatorname{atan2}(dy, dx)}{\partial x_1} = \frac{1}{1 + (dy/dx)^2} \cdot \frac{\partial (dy/dx)}{\partial x_1} = \frac{dx^2}{dx^2+dy^2} \cdot \frac{0 \cdot dx - dy \cdot (-1)}{dx^2} = \frac{dy}{dx^2+dy^2} = \frac{dy}{r^2}$
    $\frac{\partial h_2}{\partial x_2} = \frac{\partial \operatorname{atan2}(dy, dx)}{\partial x_2} = \frac{1}{1 + (dy/dx)^2} \cdot \frac{\partial (dy/dx)}{\partial x_2} = \frac{dx^2}{dx^2+dy^2} \cdot \frac{(-1) \cdot dx - dy \cdot 0}{dx^2} = \frac{-dx}{dx^2+dy^2} = \frac{-dx}{r^2}$
    So,
    $$H_k = \begin{pmatrix}
    \frac{-dx}{r} & \frac{-dy}{r} \\
    \frac{dy}{r^2} & \frac{-dx}{r^2}
    \end{pmatrix}$$
    where $dx = 1 - x_1$, $dy = 1 - x_2$, and $r = \sqrt{dx^2 + dy^2}$.

---

**EKF Step for k=1:**

**A. Prediction Step:**

*   **1. Project the state estimate:**
    Use $f(x)$ with $\hat{x}_{0|0} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.
    $$\hat{x}_{1|0} = f(\hat{x}_{0|0}) = \begin{pmatrix} \hat{x}_{1,0|0} + 0.1 \cos(\hat{x}_{2,0|0}) \\ \hat{x}_{2,0|0} + 0.1 \sin(\hat{x}_{1,0|0}) \end{pmatrix}$$
    Substitute values:
    $$\hat{x}_{1|0} = \begin{pmatrix} 0 + 0.1 \cos(0) \\ 0 + 0.1 \sin(0) \end{pmatrix} = \begin{pmatrix} 0 + 0.1 \cdot 1 \\ 0 + 0.1 \cdot 0 \end{pmatrix} = \begin{pmatrix} 0.1 \\ 0 \end{pmatrix}$$
    *Predicted position of the robot.*

*   **2. Compute the Jacobian of the process model:**
    Evaluate $F_k = \begin{pmatrix} 1 & -0.1 \sin(x_2) \\ 0.1 \cos(x_1) & 1 \end{pmatrix}$ at $\hat{x}_{0|0} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.
    $$F_1 = \begin{pmatrix}
    1 & -0.1 \sin(0) \\
    0.1 \cos(0) & 1
    \end{pmatrix} = \begin{pmatrix}
    1 & 0 \\
    0.1 & 1
    \end{pmatrix}$$
    *Linear approximation of the robot's motion dynamics.*

*   **3. Project the error covariance:**
    $$P_{1|0} = F_1 P_{0|0} F_1^T + Q$$
    $$P_{1|0} = \begin{pmatrix} 1 & 0 \\ 0.1 & 1 \end{pmatrix} \begin{pmatrix} 0.1 & 0 \\ 0 & 0.1 \end{pmatrix} \begin{pmatrix} 1 & 0.1 \\ 0 & 1 \end{pmatrix} + \begin{pmatrix} 0.001 & 0 \\ 0 & 0.001 \end{pmatrix}$$
    $F_1 P_{0|0} = \begin{pmatrix} 0.1 & 0 \\ 0.01 & 0.1 \end{pmatrix}$
    $(F_1 P_{0|0}) F_1^T = \begin{pmatrix} 0.1 & 0 \\ 0.01 & 0.1 \end{pmatrix} \begin{pmatrix} 1 & 0.1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 0.1 & 0.01 \\ 0.01 & 0.01 + 0.1 \end{pmatrix} = \begin{pmatrix} 0.1 & 0.01 \\ 0.01 & 0.11 \end{pmatrix}$
    $$P_{1|0} = \begin{pmatrix} 0.1 & 0.01 \\ 0.01 & 0.11 \end{pmatrix} + \begin{pmatrix} 0.001 & 0 \\ 0 & 0.001 \end{pmatrix} = \begin{pmatrix} 0.101 & 0.01 \\ 0.01 & 0.111 \end{pmatrix}$$
    *Predicted uncertainty in the robot's position.*

---

**B. Update Step:**

*   **1. Compute the expected measurement:**
    Use $h(x)$ with $\hat{x}_{1|0} = \begin{pmatrix} 0.1 \\ 0 \end{pmatrix}$.
    $dx = 1 - \hat{x}_{1,1|0} = 1 - 0.1 = 0.9$
    $dy = 1 - \hat{x}_{2,1|0} = 1 - 0 = 1$
    $r = \sqrt{dx^2 + dy^2} = \sqrt{(0.9)^2 + (1)^2} = \sqrt{0.81 + 1} = \sqrt{1.81} \approx 1.34536$
    $\theta = \operatorname{atan2}(dy, dx) = \operatorname{atan2}(1, 0.9) \approx 0.8398$ radians
    $$\hat{z}_{1|0} = \begin{pmatrix} 1.34536 \\ 0.8398 \end{pmatrix}$$
    *Expected range and bearing to the landmark from our predicted robot position.*

*   **2. Compute the measurement residual (innovation):**
    $$y_1 = z_1 - \hat{z}_{1|0}$$
    $$y_1 = \begin{pmatrix} 1.4 \\ 0.8 \end{pmatrix} - \begin{pmatrix} 1.34536 \\ 0.8398 \end{pmatrix} = \begin{pmatrix} 0.05464 \\ -0.0398 \end{pmatrix}$$
    *The actual range was slightly higher, and the actual bearing was slightly lower than predicted.*

*   **3. Compute the Jacobian of the measurement model:**
    Evaluate $H_k = \begin{pmatrix} \frac{-dx}{r} & \frac{-dy}{r} \\ \frac{dy}{r^2} & \frac{-dx}{r^2} \end{pmatrix}$ at $\hat{x}_{1|0} = \begin{pmatrix} 0.1 \\ 