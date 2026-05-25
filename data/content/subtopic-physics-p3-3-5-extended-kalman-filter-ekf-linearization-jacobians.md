## What it is
The Extended Kalman Filter (EKF) is a version of the Kalman Filter for nonlinear systems. It handles nonlinearity by performing a local, linear approximation of the system's dynamics and measurement models at the current state estimate. This approximation is achieved using a first-order Taylor series expansion, where the linear transformation matrices are replaced by Jacobian matrices.

## Why it matters
Nearly all real-world dynamic systems, from a satellite's orbit under atmospheric drag to a missile's trajectory, are nonlinear. The EKF is the classic, industry-standard algorithm for estimating the state (e.g., position, velocity, orientation) of such systems in real-time. It is the backbone of navigation systems in aircraft, spacecraft, drones, and even your phone's GPS.

## When to study it
Before tackling this, you must have a firm grasp of three topics:
1.  **The Linear Kalman Filter:** You must understand the predict and update steps, and the roles of the state transition matrix ($F$), measurement matrix ($H$), process noise covariance ($Q$), and measurement noise covariance ($R$).
2.  **Multivariable Calculus:** You must be able to compute partial derivatives and construct the Jacobian matrix of a vector-valued function.
3.  **Taylor Series Expansions:** You must understand how to approximate a function near a point using its value and its derivative at that point.

If you are not confident in these three areas, master them first. The EKF is a direct application of these concepts to the linear KF framework.

## How to study it (step by step)
1.  **Write down the linear KF equations.** Specifically, focus on the state prediction ($x_k = Fx_{k-1}$) and measurement prediction ($z_k = Hx_k$). Keep them visible.
2.  **Write down the *nonlinear* system model.** The state transition is now $x_k = f(x_{k-1}, u_k)$ and the measurement is $z_k = h(x_k)$. Identify precisely why the linear KF equations can no longer be applied directly to propagate the state and covariance.
3.  **Derive the first-order Taylor expansion of a generic vector function** $g(x)$ around a point $x_0$. The result is $g(x) \approx g(x_0) + \frac{\partial g}{\partial x}\vert_{x_0}(x-x_0)$. Recognize the partial derivative term as the Jacobian matrix.
4.  **Apply this approximation to the nonlinear models.** Linearize $f(x_{k-1})$ around the best available estimate, $\hat{x}_{k-1|k-1}$. Linearize $h(x_k)$ around the predicted state, $\hat{x}_{k|k-1}$.
5.  **Identify the Jacobians.** Define $F_k = \frac{\partial f}{\partial x}\vert_{\hat{x}_{k-1|k-1}}$ and $H_k = \frac{\partial h}{\partial x}\vert_{\hat{x}_{k|k-1}}$.
6.  **Substitute.** Modify the linear KF equations. Where you previously used the constant matrices $F$ and $H$ to update the covariance and calculate the Kalman gain, you now use the state-dependent Jacobians $F_k$ and $H_k$. Note that for the state prediction itself, you still use the full nonlinear function $f$.

## Key ideas, with intuition
1.  **Problem: The Kalman Filter is for a world of lines.** The standard KF assumes that if your state uncertainty is a Gaussian distribution (an ellipsoid), it remains a Gaussian after being transformed by the system dynamics ($F$) and measurement model ($H$). Linear transformations preserve Gaussians. Nonlinear transformations do not; they warp, stretch, and skew them.

2.  **Solution: Pretend the world is locally linear.** We can't make a curve into a line everywhere, but at any single point, we can find its tangent line. This tangent is the *best possible linear approximation* of the curve at that point. The EKF's core idea is to replace the nonlinear function with its tangent line at the current best estimate of the state.

3.  **The Jacobian is the "slope" of the tangent.** For a single-variable function $f(x)$, the slope of the tangent at $x_0$ is the derivative $f'(x_0)$. For a multi-dimensional vector function $f(x)$, where $x$ is a vector, the "slope" of the tangent hyperplane is given by the **Jacobian matrix**, which is simply the matrix of all possible partial derivatives.
    $$
    F_k = \frac{\partial f}{\partial x} = 
    \begin{bmatrix}
        \frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} & \cdots \\
        \frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2} & \cdots \\
        \vdots & \vdots & \ddots
    \end{bmatrix}
    $$
    The EKF calculates this matrix at each time step using the most recent state estimate, effectively re-calculating the tangent line as the estimate moves.

4.  **Two Approximations, Two Jacobians.** We have two nonlinear functions, so we need two Jacobians:
    *   The state transition function $x_k = f(x_{k-1}, u_k)$. We linearize this to propagate the covariance matrix: $P_{k|k-1} = F_k P_{k-1|k-1} F_k^T + Q$. Here, $F_k$ is the Jacobian of $f$ with respect to the state $x$, evaluated at the previous state estimate $\hat{x}_{k-1|k-1}$.
    *   The measurement function $z_k = h(x_k)$. We linearize this to calculate the Kalman gain and update the covariance. Here, $H_k$ is the Jacobian of $h$ with respect to the state $x$, evaluated at the *predicted* state $\hat{x}_{k|k-1}$.

## Worked example
**Problem:** A radar at the origin $(0,0)$ measures the range $r$ and bearing (angle) $\theta$ to a target. Our state vector is the target's position in Cartesian coordinates, $x = [p_x, p_y]^T$. The measurement model is nonlinear. Find the measurement Jacobian $H_k$ needed for an EKF.

**State and Measurement Models:**
*   State vector: $x = \begin{bmatrix} p_x \\ p_y \end{bmatrix}$
*   Measurement vector: $z = \begin{bmatrix} r \\ \theta \end{bmatrix}$
*   Nonlinear measurement function $z = h(x)$:
    $$
    h(x) = \begin{bmatrix} \sqrt{p_x^2 + p_y^2} \\ \operatorname{atan2}(p_y, p_x) \end{bmatrix}
    $$

**Step 1: Define the Jacobian Matrix**
The Jacobian of the measurement function, $H$, is defined as $H = \frac{\partial h}{\partial x}$. Since $h$ has 2 components ($h_1=r, h_2=\theta$) and $x$ has 2 components ($p_x, p_y$), $H$ will be a $2 \times 2$ matrix:
$$
H = \begin{bmatrix}
\frac{\partial h_1}{\partial p_x} & \frac{\partial h_1}{\partial p_y} \\
\frac{\partial h_2}{\partial p_x} & \frac{\partial h_2}{\partial p_y}
\end{bmatrix}
$$

**Step 2: Calculate the Partial Derivatives**
Let's compute each element:
*   $\frac{\partial h_1}{\partial p_x} = \frac{\partial}{\partial p_x} \sqrt{p_x^2 + p_y^2} = \frac{1}{2\sqrt{p_x^2 + p_y^2}}(2p_x) = \frac{p_x}{\sqrt{p_x^2 + p_y^2}}$
*   $\frac{\partial h_1}{\partial p_y} = \frac{\partial}{\partial p_y} \sqrt{p_x^2 + p_y^2} = \frac{1}{2\sqrt{p_x^2 + p_y^2}}(2p_y) = \frac{p_y}{\sqrt{p_x^2 + p_y^2}}$
*   $\frac{\partial h_2}{\partial p_x} = \frac{\partial}{\partial p_x} \operatorname{atan}(\frac{p_y}{p_x}) = \frac{1}{1 + (p_y/p_x)^2} \cdot (-\frac{p_y}{p_x^2}) = \frac{-p_y}{p_x^2 + p_y^2}$
*   $\frac{\partial h_2}{\partial p_y} = \frac{\partial}{\partial p_y} \operatorname{atan}(\frac{p_y}{p_x}) = \frac{1}{1 + (p_y/p_x)^2} \cdot (\frac{1}{p_x}) = \frac{p_x}{p_x^2 + p_y^2}$

**Step 3: Assemble the Jacobian Matrix**
$$
H = \begin{bmatrix}
\frac{p_x}{\sqrt{p_x^2 + p_y^2}} & \frac{p_y}{\sqrt{p_x^2 + p_y^2}} \\
\frac{-p_y}{p_x^2 + p_y^2} & \frac{p_x}{p_x^2 + p_y^2}
\end{bmatrix}
$$

**Step 4: Evaluate the Jacobian at the current state estimate**
For the EKF update step, we need $H_k$. This is the matrix $H$ evaluated at the predicted state $\hat{x}_{k|k-1} = [\hat{p}_{x, k|k-1}, \hat{p}_{y, k|k-1}]^T$. Let's denote $\hat{r} = \sqrt{\hat{p}_{x, k|k-1}^2 + \hat{p}_{y, k|k-1}^2}$.
$$
H_k = \begin{bmatrix}
\frac{\hat{p}_{x, k|k-1}}{\hat{r}} & \frac{\hat{p}_{y, k|k-1}}{\hat{r}} \\
\frac{-\hat{p}_{y, k|k-1}}{\hat{r}^2} & \frac{\hat{p}_{x, k|k-1}}{\hat{r}^2}
\end{bmatrix}
$$

**Reflection:**
Each step was a direct application of multivariable calculus. Step 1 set up the structure based on the dimensions of the input and output vectors. Step 2 was mechanical computation of partial derivatives. Step 3 assembled the symbolic matrix. Step 4 is the crucial EKF-specific step: we substitute our current best *guess* for the state into this symbolic matrix to get the concrete linear approximation we'll use for this single time step's update.

## Diagrams
This diagram illustrates the core concept of linearization. The true state propagates along the curved (nonlinear) path. The EKF approximates this by taking a straight-line step (linearization) from the previous estimate, using the tangent.

```text
       ^ State (e.g., position)
       |
       |                   * True state at time k
       |                  /
       |                 /
       |                /
       |         xxxxxxx <-- Linear approximation (tangent)
       |        /   * Predicted state (from linearization)
       |       /
       |      /
       |     *
       |  True state / estimate at time k-1
       |
       +-------------------------------------> Time
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine the standard Kalman Filter is a train on a perfectly straight track (a linear system). The Extended Kalman Filter is a train on a *curvy* track. At every moment, the driver (the algorithm) can only see a few feet ahead. So, they pretend the track is straight for that short distance. The **Jacobian** is the steering angle they use to aim the train down that short, straight path. They have to re-calculate this steering angle at every single step.

2.  **Must-know formulas:** The only change from the linear KF is replacing the static matrices $F$ and $H$ with their time-varying, state-dependent Jacobian counterparts in the covariance and gain equations.
    $$
    F_k = \frac{\partial f}{\partial x}\bigg|_{\hat{x}_{k-1|k-1}, u_k}
    $$
    $$
    H_k = \frac{\partial h}{\partial x}\bigg|_{\hat{x}_{k|k-1}}
    $$
    You still use the full nonlinear functions for the state prediction: $\hat{x}_{k|k-1} = f(\hat{x}_{k-1|k-1}, u_k)$.

3.  **Spaced Repetition Schedule:** Review this material and re-derive the example Jacobian at 1 day, 3 days, 7 days, 16 days, and 35 days.

4.  **First Principles Pathway:** If you forget the EKF equations, rebuild them.
    *   Start with the linear KF equations.
    *   Remember the goal: adapt them for nonlinear functions $f$ and $h$.
    *   How do you approximate a nonlinear function with a linear one? A first-order Taylor series: $g(x) \approx g(x_0) + G(x-x_0)$, where $G$ is the Jacobian $\frac{\partial g}{\partial x}$ evaluated at $x_0$.
    *   The KF uses $F$ and $H$ to transform *covariance*. The Jacobian is the matrix that describes how a linear transformation locally stretches and rotates space. So, replace $F$ and $H$ with the Jacobians $F_k$ and $H_k$ in the covariance propagation and Kalman gain equations.

## Common mistakes
1.  **Using the Jacobian for State Prediction:** A very common error is to predict the next state using the Jacobian: $\hat{x}_{k|k-1} = F_k \hat{x}_{k-1|k-1}$. This is wrong. You must use the full nonlinear function: $\hat{x}_{k|k-1} = f(\hat{x}_{k-1|k-1}, u_k)$. The Jacobian is only for propagating uncertainty (the covariance matrix).
2.  **Evaluating the Jacobian at the Wrong Point:** The state transition Jacobian $F_k$ is evaluated at the last *updated* state ($\hat{x}_{k-1|k-1}$). The measurement Jacobian $H_k$ is evaluated at the current *predicted* state ($\hat{x}_{k|k-1}$). Mixing these up will degrade performance.
3.  **Incorrect Jacobian Dimensions:** Always check your work. If your state vector $x$ is $n$-dimensional and your measurement vector $z$ is $m$-dimensional, your measurement Jacobian $H_k$ *must* be an $m \times n$ matrix.

## Self-check
1.  Your state vector is $x = [p_x, v_x, p_y, v_y]^T$. Your nonlinear state transition function includes a drag term proportional to velocity squared, acting on both $x$ and $y$ axes. What are the dimensions of the state transition Jacobian $F_k$? Write out the symbolic expression for the element at row 2, column 2, which is $\frac{\partial f_2}{\partial v_x}$.
2.  Linearization is an approximation. Under what conditions would you expect the EKF to perform poorly or even diverge? (Hint: Think about the relationship between the curve and its tangent line).
3.  A spacecraft's state is its 3D position and velocity ($x \in \mathbb{R}^6$). A ground station measures its azimuth, elevation, and range. Write down the symbolic form of the state vector $x$, the measurement vector $z$, the nonlinear measurement function $h(x)$, and the dimensions of the Jacobian $H_k$.