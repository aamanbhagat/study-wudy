## What it is
**Fault detection** is the process of using sensor data to determine that something in a system has gone wrong, deviating from its expected behavior. **System identification** is the art of using a system's input and output data to build a mathematical model that describes its dynamics. In essence, you first identify the model for a healthy system, then use that model to detect when the real system's behavior faults, or diverges.

## Why it matters
In aerospace, these aren't academic exercises; they are fundamental to safety and performance. An autonomous fault detection system can identify a failing reaction wheel on a satellite and switch to a backup, saving a billion-dollar mission. System identification allows flight controllers for a new hypersonic vehicle to be designed and tested on an accurate simulation before the vehicle ever flies, and for that model to be updated in-flight as fuel is consumed and the vehicle's dynamics change.

## When to study it
You are ready for this topic if you have a firm grasp of the following. If not, master these first.
*   **Linear Algebra:** State-space representation, matrix operations, eigenvalues.
*   **Differential Equations:** Formulating and understanding ordinary differential equations (ODEs), particularly linear time-invariant (LTI) systems.
*   **Control Theory Basics:** The state-space equations ($\dot{\mathbf{x}} = A\mathbf{x} + B\mathbf{u}$, $\mathbf{y} = C\mathbf{x} + D\mathbf{u}$) must be second nature.
*   **Probability & Statistics:** Gaussian distributions, mean, variance, and the principle of least squares.
*   **Core ML:** Supervised learning, specifically linear regression.

## How to study it (step by step)
1.  **Model the Ideal System.** Write the state-space equations for a simple 1D mass-spring-damper system. This is your "digital twin" or ground truth model of a healthy system.
2.  **Simulate Noisy Data.** Use your model to generate perfect position data given a known force input. Then, add zero-mean Gaussian noise to the position data to simulate a real, noisy sensor. This is your baseline "healthy" data.
3.  **Simulate Faulty Data.** Introduce a fault into the simulation. A simple fault is a constant bias in the sensor, e.g., the position sensor always reports $0.1$ meters higher than the true value. Generate a new dataset with this fault.
4.  **Identify the System.** Ignore your original "true" parameters. Using only the healthy input (force) and noisy output (position) data, apply linear least squares to estimate the system parameters (the coefficients of your $A$ and $B$ matrices). This is system identification.
5.  **Detect the Fault.** Build a simple predictor using your *identified* model. Feed both the healthy and faulty datasets into it, one step at a time. Calculate the residual—the difference between your model's prediction and the "measured" data. Plot the residuals for both cases. Observe the clear difference in the residual's behavior, which is the signal of the fault.
6.  **Classify the Fault.** Introduce a second fault type, like a change in the damping coefficient. Generate data. Train a simple classifier (e.g., logistic regression) on features of the residual signal (like its mean and variance) to automatically distinguish "healthy," "bias fault," and "damper fault." This is the step from fault *detection* to fault *isolation*.

## Key ideas, with intuition
1.  **The Residual is the "Error Signal".** The core of model-based fault detection is the residual, $\mathbf{r}$. It's the difference between the actual sensor measurement, $\mathbf{y}$, and the prediction from your model of the healthy system, $\hat{\mathbf{y}}$.
    $$ \mathbf{r}_k = \mathbf{y}_k - \hat{\mathbf{y}}_k $$
    *Intuition:* Imagine you have a trusted friend (the model) who tells you what to expect. When reality (the measurement) consistently and significantly disagrees with your friend's prediction, you know something is wrong with reality, not your friend. A healthy system produces small, random residuals (sensor noise). A faulty system produces large, biased, or structured residuals.

2.  **System Identification is "Model Fitting on Steroids".** You know linear regression fits a line $y = mx + c$ to data. System identification does the same for dynamical systems. For a system described by $\ddot{z} = a\dot{z} + bu$, we use time-series data of the input $u$ and the state derivatives $(\ddot{z}, \dot{z})$ to find the best-fit parameters $a$ and $b$.
    *Intuition:* We are letting the system's own behavior "tell" us what its governing equations are. We poke it with inputs, watch its outputs, and find the mathematical rules that connect the two.

3.  **State-Space Models Provide the "Grammar".** We need a structured way to write down the system's dynamics. The state-space formulation provides this universal grammar.
    $$ \dot{\mathbf{x}} = A\mathbf{x} + B\mathbf{u} \quad (\text{How the state evolves}) $$
    $$ \mathbf{y} = C\mathbf{x} + D\mathbf{u} \quad (\text{What we can measure}) $$
    *Intuition:* The state $\mathbf{x}$ (e.g., position, velocity, temperature) is the complete summary of the system at an instant. The $A$ matrix describes the internal physics (e.g., inertia, damping), and the $B$ matrix describes how external forces $\mathbf{u}$ affect it. System ID is often about finding the numerical values inside $A$ and $B$.

## Worked example
**Problem:** You are tasked with finding the moment of inertia, $I$, of a small satellite from telemetry data. The satellite's single-axis rotational dynamics are governed by Newton's second law for rotation, $I\ddot{\theta} = \tau$, where $\tau$ is the torque from a reaction wheel and $\ddot{\theta}$ is the resulting angular acceleration. You have commanded a series of torques and measured the resulting accelerations.

**Data:** You have $N=4$ data points:
*   $\tau$ (input) = [0.1, 0.2, -0.1, -0.2] Nm
*   $\ddot{\theta}$ (output) = [0.48, 1.05, -0.52, -0.95] rad/s²

**Step 1: Formulate as a Linear Problem.**
Our physical model is $\tau = I \ddot{\theta}$. This is exactly in the form $y = mx$, where $y = \tau$, $x = \ddot{\theta}$, and the parameter to identify is $m = I$. We want to find the value of $I$ that best fits our data.

**Step 2: Define the Cost Function.**
We use the sum of squared errors (residuals) as our cost function, $J$. The error for a single point $i$ is $(\tau_i - I\ddot{\theta}_i)$.
$$ J(I) = \sum_{i=1}^{N} (\tau_i - I\ddot{\theta}_i)^2 $$

**Step 3: Minimize the Cost Function.**
To find the minimum, we take the derivative of $J$ with respect to $I$ and set it to zero.
$$ \frac{dJ}{dI} = \sum_{i=1}^{N} 2(\tau_i - I\ddot{\theta}_i)(-\ddot{\theta}_i) = 0 $$
$$ \sum_{i=1}^{N} (-\tau_i \ddot{\theta}_i + I\ddot{\theta}_i^2) = 0 $$
$$ I \sum_{i=1}^{N} (\ddot{\theta}_i^2) = \sum_{i=1}^{N} (\tau_i \ddot{\theta}_i) $$

**Step 4: Solve for the Parameter I.**
This gives us the least-squares solution for $I$:
$$ \hat{I} = \frac{\sum_{i=1}^{N} \tau_i \ddot{\theta}_i}{\sum_{i=1}^{N} \ddot{\theta}_i^2} $$
The hat `^` denotes that this is an *estimate*.

**Step 5: Calculate with Data.**
*   Numerator: $(0.1)(0.48) + (0.2)(1.05) + (-0.1)(-0.52) + (-0.2)(-0.95) = 0.048 + 0.21 + 0.052 + 0.19 = 0.5$
*   Denominator: $(0.48)^2 + (1.05)^2 + (-0.52)^2 + (-0.95)^2 = 0.2304 + 1.1025 + 0.2704 + 0.9025 = 2.5058$
*   Estimate: $\hat{I} = \frac{0.5}{2.5058} \approx 0.1995$ kg·m²

**Reflection:** This worked because the unknown parameter, $I$, appeared linearly in the model equation. This allowed us to define a simple quadratic cost function whose minimum could be found analytically by taking one derivative. This is the core of linear least squares system identification.

## Diagrams
This diagram shows the logic of model-based fault detection. The real system runs in parallel with its mathematical model (a "digital twin"). The difference between their outputs, the residual, is the key indicator.

```text
                  +-----------+       +----------------+
                  |           |------>|                |
Real World System |  (State x)  |       | Sensor         |
(e.g., Rocket)    |           |       | (Measurement y)|
                  +-----------+       +----------------+
                        ^                     |
                        | u (Control Input)   |
                        |                     v
                  +-----------+       +----------------+      +----------+
                  |           |<------|                |----->|          |
Digital Twin /    | Model     |       | Residual (r)   |      | Decision |
Model             | (State x_hat) |------>| y - y_hat      |      | Logic    |--> FAULT?
                  |           |       |                |      |          |
                  +-----------+       +----------------+      +----------+
```

## Memory technique — remember this forever
1.  **The Story:** You are an old-school spacecraft navigator with a perfect stopwatch and a star chart (your **Model**). You tell the pilot to fire thrusters for 5 seconds (the **Input**). Your model predicts you should see the star Polaris shift 2 degrees (the **Predicted Output**). You look through the telescope and see it only shifted 1.5 degrees (the **Measured Output**). The 0.5-degree difference is the **Residual**. Your immediate thought: "The thruster is underperforming." You have just performed fault detection.

2.  **Formulas to Overlearn:**
    *   State-Space Model: $\dot{\mathbf{x}} = A\mathbf{x} + B\mathbf{u}$, $\mathbf{y} = C\mathbf{x} + D\mathbf{u}$. (The language of dynamics).
    *   Residual: $\mathbf{r}_k = \mathbf{y}_k - \hat{\mathbf{y}}_k$. (The symptom of a fault).
    *   Least-Squares Estimator (for $y=ax$): $\hat{a} = (\sum x_i y_i) / (\sum x_i^2)$. (The simplest system ID tool).

3.  **Spaced Repetition Schedule:** Review these ideas and formulas at **1 day, 3 days, 7 days, 16 days, 35 days**. Actively rewrite them from memory.

4.  **First Principles Pathway:** If you forget the least squares formula, re-derive it.
    *   Start with the goal: Minimize the sum of squared errors.
    *   Write the error: $e_i = y_i - \hat{y}_i = y_i - a x_i$.
    *   Write the cost function: $J = \sum e_i^2 = \sum (y_i - a x_i)^2$.
    *   Use calculus: Find the minimum by solving $\frac{dJ}{da} = 0$. This will always lead you back to the correct formula.

## Common mistakes
1.  **Confusing Noise and Faults:** A fault is a systematic, persistent deviation. Noise is random and zero-mean. Setting a fault detection threshold too low (e.g., "any residual > 0.01 is a fault") will lead to constant false alarms from normal sensor noise. The key is to look for residuals that are statistically unlikely to be just noise.
2.  **Assuming a Perfect Model:** Your fault detection system is only as good as your model of the healthy system. If your "healthy" model is inaccurate (model mismatch), you will have large residuals even when no fault exists. This is a primary challenge in the real world.
3.  **Applying Linear ID to Non-linear Systems:** The simple least-squares method shown above only works if the unknown parameters appear linearly. For a model like $y = \sin(ax)$, you cannot use this method to find $a$. You need more advanced non-linear system identification techniques.

## Self-check
1.  You are monitoring a temperature sensor on a rocket engine. Your model, based on fuel flow, predicts a temperature of 1500 K. The sensor reads 1505 K. The sensor's specified noise level (standard deviation) is 6 K. Is this measurement a strong indicator of a fault? Why or why not?
2.  An aircraft's drag force is modeled as $F_D = c_D v^2$. You can measure velocity $v$ and you have an estimate of the drag force $F_D$ from engine thrust. How can you rearrange this equation and define your variables to use *linear* least squares to estimate the drag coefficient $c_D$?
3.  A fault occurs in a satellite's star tracker, causing it to report a slightly incorrect attitude (orientation). You are running a Kalman filter that fuses star tracker data with gyroscope data. The gyros are perfectly healthy. Describe what will happen to the residuals for both the star tracker measurements and the gyro measurements immediately after the fault occurs.