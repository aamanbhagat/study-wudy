## 1. What it is — in plain English

Imagine you're trying to steer a robot car from one point to another. You want it to get there quickly and smoothly, without overshooting or wobbling, and you don't want to waste too much battery power or wear out its tires. How do you figure out the *best* way to control its steering and speed at every moment?

This is exactly what the Linear Quadratic Regulator (LQR) helps us do. It's a fancy name for a powerful mathematical tool that finds the "best" way to control a system. "Linear" means we're dealing with systems whose behavior can be described by simple straight-line relationships (like how a force directly causes acceleration, not acceleration squared). "Quadratic" refers to how we measure "best" – we penalize deviations from our goal and control effort using squared terms, which makes the math solvable and ensures we always prefer smaller errors and less effort.

So, LQR is essentially a recipe for calculating the perfect set of instructions (a "control law") that tells our system (like a rocket, drone, or robot arm) what to do at every instant to achieve its goal while minimizing a specific "cost." This cost could be anything from fuel consumption to how much the system wobbles, or how long it takes to reach its target. It's all about finding that sweet spot between performance and efficiency.

## 2. Why it matters — real-world applications

LQR is a foundational technique in control engineering, widely used because it provides a systematic way to design optimal feedback controllers for linear systems. Its elegance and analytical solvability make it a go-to for many applications:

1.  **Aerospace Vehicle Stabilization and Trajectory Control:**
    *   **Satellite Attitude Control:** Companies like Maxar Technologies or Airbus Defence and Space use LQR (or its variants) to design controllers that maintain a satellite's orientation (pitch, roll, yaw) in orbit, ensuring antennas point correctly or cameras capture desired imagery, all while conserving precious propellant.
    *   **Rocket Launch Vehicle Steering:** During ascent, rockets like SpaceX's Falcon 9 or NASA's Space Launch System need precise steering to follow a pre-planned trajectory. LQR can be used to calculate the optimal gimbal angles for the engine nozzles to correct for deviations caused by winds or engine thrust variations, minimizing fuel use and ensuring accurate orbital insertion.
    *   **Drone Flight Control:** DJI and other drone manufacturers employ LQR principles for stable flight. The controller ensures the drone maintains its desired altitude, position, and orientation, even in gusty conditions, by optimally adjusting motor speeds to counteract disturbances and follow commands.

2.  **Robotics and Autonomous Systems:**
    *   **Robot Manipulator Control:** Industrial robots from companies like KUKA or FANUC use LQR to achieve smooth and precise movements of their arms and joints. This is crucial for tasks like assembly, welding, or painting, where accuracy and speed are paramount, and excessive joint torques (control effort) need to be avoided.
    *   **Autonomous Vehicle Path Following:** For self-driving cars, LQR can be applied to control steering and acceleration to follow a desired path. It helps the vehicle stay on track, smoothly navigate curves, and respond to changes in the road, balancing comfort (smoothness) with accuracy (staying on the path).

3.  **Chemical Process Control:**
    *   **Temperature and Pressure Regulation:** In chemical plants, maintaining precise temperatures and pressures in reactors is vital for product quality and safety. LQR can design controllers that optimally adjust heating/cooling rates or valve positions to keep these variables at their setpoints, minimizing energy consumption and preventing costly deviations.

## 3. Prerequisites — what you must know first

Before diving deep into LQR, ensure you have a solid grasp of these fundamental concepts. If any of these feel unfamiliar, pause and review them.

*   **Linear Algebra:**
    *   **Vectors and Matrices:** Understanding matrix addition, multiplication, transposition ($ \mathbf{A}^T $), and inversion ($ \mathbf{A}^{-1} $).
    *   **Eigenvalues and Eigenvectors:** Crucial for analyzing system stability and properties of quadratic forms.
    *   **Positive Definite Matrices:** Understanding what it means for a matrix to be positive definite ($ \mathbf{x}^T\mathbf{M}\mathbf{x} > 0 $ for all non-zero $ \mathbf{x} $), which is essential for the `Q` and `R` matrices in LQR.
*   **Calculus:**
    *   **Derivatives and Gradients:** For optimization problems, especially when deriving the necessary conditions.
    *   **Optimization (Lagrangian Multipliers):** Understanding how to find extrema of functions subject to constraints. The calculus of variations, which underpins optimal control, extends these ideas.
*   **Differential Equations:**
    *   **State-Space Representation of Linear Systems:** How to describe a system's dynamics using first-order differential equations in matrix form ($ \dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u} $ for continuous-time, or $ \mathbf{x}_{k+1} = \mathbf{A}\mathbf{x}_k + \mathbf{B}\mathbf{u}_k $ for discrete-time). This is the foundation of LQR.
*   **Control Systems Basics:**
    *   **Open-loop vs. Closed-loop Control:** Understanding the difference and why feedback (closed-loop) is superior for disturbance rejection.
    *   **Stability:** What it means for a system to be stable, asymptotically stable, and how eigenvalues relate to stability.
    *   **Feedback Control:** The concept of using system output to adjust input. LQR is a type of state-feedback control.

## 4. The core idea — step by step

LQR is about finding an optimal feedback control law for a linear system with a quadratic cost function. Let's break down the core ideas.

### Step 1: Describe Your System's Behavior (State-Space Model)

**Plain English:** Before we can control anything, we need to understand how it behaves. We describe our system (like a rocket) using a set of variables that completely capture its "state" at any given moment – its position, velocity, orientation, etc. Then, we write down equations that tell us how these state variables change over time, both naturally and when we apply a control action (like thrust).

**Concrete Example:** Imagine a simple rocket moving vertically. Its state might be its altitude ($x_1$) and its vertical velocity ($x_2$). Our control input ($u$) is the engine thrust.
The equations describing its motion could be:
*   Altitude changes by velocity: $\dot{x}_1 = x_2$
*   Velocity changes by thrust minus gravity (simplified): $\dot{x}_2 = u - g$ (where $g$ is gravity).
This is a linear system because the relationships are simple additions and multiplications, not squares or sines.

**Formal/Mathematical Version:** We represent the system's dynamics using a state-space model. For a continuous-time system, this is:
$$ \dot{\mathbf{x}}(t) = \mathbf{A}\mathbf{x}(t) + \mathbf{B}\mathbf{u}(t) $$
Where:
*   $ \mathbf{x}(t) \in \mathbb{R}^n $ is the state vector (e.g., position, velocity, angle, angular velocity).
*   $ \mathbf{u}(t) \in \mathbb{R}^m $ is the control input vector (e.g., thrust, torque, voltage).
*   $ \mathbf{A} \in \mathbb{R}^{n \times n} $ is the system matrix, describing the natural dynamics.
*   $ \mathbf{B} \in \mathbb{R}^{n \times m} $ is the input matrix, describing how control inputs affect the state.

For our rocket example, if we define $ \mathbf{x} = \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} $, then:
$$ \begin{bmatrix} \dot{x}_1 \\ \dot{x}_2 \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} + \begin{bmatrix} 0 \\ 1 \end{bmatrix} u + \begin{bmatrix} 0 \\ -g \end{bmatrix} $$
To fit the standard LQR form, we often assume the system is linearized around an equilibrium point, or we absorb constant terms into a reference state. For simplicity in LQR derivation, we usually consider a system where the origin $ \mathbf{x}=\mathbf{0} $ is the desired equilibrium, so we're regulating deviations from $ \mathbf{0} $. If we want to track a non-zero reference, we transform the problem into regulating the error.

**What could go wrong:** If your system is actually non-linear (e.g., aerodynamic drag depends on velocity squared), using a linear model will lead to inaccuracies. The LQR controller might work near the linearization point but fail far away. Also, if your model matrices (A and B) are incorrect, the controller won't perform as expected.

### Step 2: Define What "Optimal" Means (Quadratic Cost Function)

**Plain English:** "Optimal" isn't just about reaching the target; it's about doing it *well*. We need a way to quantify "well." LQR uses a "cost function" that adds up penalties for two things:
1.  How far the system is from its desired state (e.g., how far off target, how much it's wobbling). We want this error to be small.
2.  How much control effort we're expending (e.g., how much fuel we're burning, how hard we're pushing the engines). We want this effort to be small too.
We use squared terms for these penalties because it ensures positive costs (whether we're too far left or right, it's still bad) and makes the math solvable.

**Concrete Example:** For our rocket, we might want to minimize:
*   The square of its altitude deviation from zero: $x_1^2$.
*   The square of its velocity deviation from zero: $x_2^2$.
*   The square of the thrust applied: $u^2$.
We can put different "weights" on these terms. If we care a lot about altitude error, we give $x_1^2$ a bigger weight. If we want to save fuel, we give $u^2$ a bigger weight.

**Formal/Mathematical Version:** We define a quadratic cost function $J$ to be minimized. For an infinite-horizon continuous-time LQR problem, it is:
$$ J = \int_0^\infty (\mathbf{x}^T(t)\mathbf{Q}\mathbf{x}(t) + \mathbf{u}^T(t)\mathbf{R}\mathbf{u}(t)) dt $$
Where:
*   $ \mathbf{Q} \in \mathbb{R}^{n \times n} $ is a symmetric positive semi-definite matrix that penalizes deviations in the state $ \mathbf{x} $. A larger $ \mathbf{Q} $ means we care more about keeping $ \mathbf{x} $ close to zero.
*   $ \mathbf{R} \in \mathbb{R}^{m \times m} $ is a symmetric positive definite matrix that penalizes control effort $ \mathbf{u} $. A larger $ \mathbf{R} $ means we want to use less control effort.
The terms $ \mathbf{x}^T\mathbf{Q}\mathbf{x} $ and $ \mathbf{u}^T\mathbf{R}\mathbf{u} $ are quadratic forms. For instance, if $ \mathbf{x} = \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} $ and $ \mathbf{Q} = \begin{bmatrix} q_1 & 0 \\ 0 & q_2 \end{bmatrix} $, then $ \mathbf{x}^T\mathbf{Q}\mathbf{x} = q_1x_1^2 + q_2x_2^2 $.

**What could go wrong:**
*   **Poor choice of Q and R:** If $ \mathbf{Q} $ is too small relative to $ \mathbf{R} $, the controller might not bring the state to zero effectively (it's too "lazy"). If $ \mathbf{R} $ is too small, the controller might use excessive control effort, leading to saturation or instability. This is often the trickiest part of LQR design – tuning these matrices.
*   **Q not positive semi-definite or R not positive definite:** This can lead to mathematical issues, non-unique solutions, or a cost function that doesn't make physical sense (e.g., rewarding deviations).

### Step 3: Propose a Simple Control Strategy (Linear State Feedback)

**Plain English:** Instead of trying to guess what to do at every moment, LQR proposes a very specific type of control strategy: a "linear state feedback" controller. This means our control action ($u$) is simply a weighted sum of our current state variables ($x_1, x_2, \dots$). We're looking for the "weights" (a matrix called $K$) that will give us the optimal control. This is a common and powerful strategy because it's simple to implement and robust.

**Concrete Example:** For our rocket, the control input $u$ would be a combination of its altitude and velocity: $u = -k_1 x_1 - k_2 x_2$. The negative sign is standard in feedback control to indicate that the control acts to reduce the state deviation. Here, $k_1$ and $k_2$ are the "gains" we need to find.

**Formal/Mathematical Version:** The LQR problem seeks an optimal control law of the form:
$$ \mathbf{u}(t) = -\mathbf{K}\mathbf{x}(t) $$
Where:
*   $ \mathbf{K} \in \mathbb{R}^{m \times n} $ is the feedback gain matrix. This is what LQR calculates.
The negative sign indicates that it's a negative feedback controller, which is generally stabilizing.

**What could go wrong:** This control strategy assumes we can measure *all* the state variables ($ \mathbf{x} $). In reality, some states might not be directly measurable. In such cases, we'd need an "estimator" (like a Kalman Filter) to estimate the states, leading to a "Linear Quadratic Gaussian" (LQG) controller.

### Step 4: The Optimization Problem — How to Find K?

**Plain English:** Now we have our system model and our cost function. We want to find the specific feedback gain matrix $K$ that, when applied to our system, makes the cost $J$ as small as possible. This is a classic optimization problem. It's like trying to find the lowest point in a complex multi-dimensional landscape.

**Concrete Example:** Imagine trying to find the best $k_1$ and $k_2$ for our rocket. We could try a bunch of values, simulate the rocket's flight, calculate the cost $J$ for each pair, and pick the best. But this would take forever! LQR provides a direct mathematical way to find the absolute best $k_1$ and $k_2$.

**Formal/Mathematical Version:** The problem is to minimize $J$ subject to the system dynamics $ \dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u} $. This is a problem in the calculus of variations, or it can be solved using dynamic programming (specifically, the Hamilton-Jacobi-Bellman (HJB) equation). For linear systems with quadratic costs and an infinite horizon, the HJB equation simplifies significantly and leads directly to the Algebraic Riccati Equation.

**What could go wrong:** The mathematical derivation is complex. Incorrectly applying the necessary conditions for optimality or making algebraic errors will lead to a suboptimal or unstable controller.

### Step 5: Enter the Riccati Equation

**Plain English:** The heart of LQR is solving a special matrix equation called the "Algebraic Riccati Equation" (ARE). This equation looks intimidating, but its solution, a matrix $P$, tells us the "cost-to-go" from any state. Once we have $P$, finding the optimal gain $K$ is simple. Think of $P$ as a map that tells you the minimum possible total future cost if you start from a particular state and always use the optimal control.

**Concrete Example:** For our simple 1D system ($ \dot{x} = ax + bu $, $ J = \int_0^\infty (qx^2 + ru^2) dt $), the Riccati equation would simplify to a quadratic equation for a scalar $p$: $2ap - p^2 b^2/r + q = 0$. Solving this quadratic equation gives us $p$, and then $k = pb/r$.

**Formal/Mathematical Version:** The optimal cost-to-go function (or value function) $ V(\mathbf{x}) $ for the LQR problem is found to be quadratic in the state: $ V(\mathbf{x}) = \mathbf{x}^T\mathbf{P}\mathbf{x} $, where $ \mathbf{P} $ is a symmetric positive definite matrix. Substituting this into the HJB equation and solving for the optimal $ \mathbf{u} $ leads to the Algebraic Riccati Equation (ARE):
$$ \mathbf{A}^T\mathbf{P} + \mathbf{P}\mathbf{A} - \mathbf{P}\mathbf{B}\mathbf{R}^{-1}\mathbf{B}^T\mathbf{P} + \mathbf{Q} = \mathbf{0} $$
This is the continuous-time Algebraic Riccati Equation (CARE). For discrete-time systems, there's a Discrete Algebraic Riccati Equation (DARE). We are looking for the unique positive definite solution $ \mathbf{P} $.

**What could go wrong:**
*   **Solving the ARE:** For larger systems, solving this matrix equation analytically is often impossible. Numerical methods (like the Schur decomposition method) are typically used. These methods can sometimes fail to converge or find non-positive definite solutions if the problem is ill-posed (e.g., system is not stabilizable or detectable).
*   **Multiple solutions:** The Riccati equation can have multiple solutions for $ \mathbf{P} $. We are specifically interested in the unique positive definite solution that guarantees stability of the closed-loop system.

### Step 6: Calculate the Optimal Gain K

**Plain English:** Once we've solved the Riccati equation and found the matrix $P$, calculating the optimal feedback gain matrix $K$ is a straightforward matrix multiplication. It's like having the map ($P$) and then simply reading off the best path ($K$) from it.

**Concrete Example:** For our 1D example, once we found $p$, the gain was $k = pb/r$. This is a direct application of the formula.

**Formal/Mathematical Version:** The optimal feedback gain matrix $ \mathbf{K} $ is given by:
$$ \mathbf{K} = \mathbf{R}^{-1}\mathbf{B}^T\mathbf{P} $$
This $ \mathbf{K} $ ensures that the control input $ \mathbf{u}(t) = -\mathbf{K}\mathbf{x}(t) $ minimizes the cost function $ J $. The resulting closed-loop system is $ \dot{\mathbf{x}}(t) = (\mathbf{A} - \mathbf{B}\mathbf{K})\mathbf{x}(t) $, which will be asymptotically stable if the LQR problem conditions are met.

**What could go wrong:** If $ \mathbf{R} $ is not invertible (which it must be for $ \mathbf{R}^{-1} $ to exist), this step fails. This reinforces why $ \mathbf{R} $ must be positive definite. Also, if $ \mathbf{P} $ was not correctly found (e.g., not the positive definite solution), then $ \mathbf{K} $ will not be optimal, and the closed-loop system might not be stable.

## 5. Worked examples — multiple, with every step shown

Let's work through some examples to solidify understanding. We'll focus on continuous-time LQR.

### Example 1: Simple 1D System (Scalar LQR)

**Problem Statement:** Consider a simple scalar system described by $ \dot{x}(t) = ax(t) + bu(t) $. We want to find the optimal control $ u(t) = -kx(t) $ that minimizes the cost function $ J = \int_0^\infty (qx^2(t) + ru^2(t)) dt $.
Given: $ a = 2 $, $ b = 1 $, $ q = 1 $, $ r = 1 $.

**What's given:**
*   System dynamics: $ \dot{x} = 2x + u $
*   Cost function parameters: $ Q = 1 $, $ R = 1 $ (scalar equivalent of matrices).
**What we want:**
*   The optimal feedback gain $ k $.

**Step-by-step solution:**

1.  **Identify the system matrices and cost weights:**
    *   From $ \dot{x} = ax + bu $, we have $ A = 2 $, $ B = 1 $.
    *   From $ J = \int_0^\infty (qx^2 + ru^2) dt $, we have $ Q = 1 $, $ R = 1 $.
    *   *Explanation:* We're mapping the given scalar values to their matrix equivalents for consistency with the general LQR formulation.

2.  **Write down the Algebraic Riccati Equation (ARE):**
    *   The general continuous-time ARE is $ \mathbf{A}^T\mathbf{P} + \mathbf{P}\mathbf{A} - \mathbf{P}\mathbf{B}\mathbf{R}^{-1}\mathbf{B}^T\mathbf{P} + \mathbf{Q} = \mathbf{0} $.
    *   For this scalar case, $ \mathbf{P} $ becomes a scalar $ p $. $ \mathbf{A}^T $ is just $ A $, $ \mathbf{B}^T $ is just $ B $. $ \mathbf{R}^{-1} $ is $ R^{-1} $.
    *   So, the scalar ARE is: $ Ap + pA - pBR^{-1}Bp + Q = 0 $.
    *   *Explanation:* We're substituting the scalar variables into the general matrix ARE formula. Note that for scalars, $A^T = A$ and $B^T = B$.

3.  **Substitute the given values into the ARE:**
    *   $ (2)p + p(2) - p(1)(1)^{-1}(1)p + 1 = 0 $
    *   $ 2p + 2p - p(1)(1)p + 1 = 0 $
    *   $ 4p - p^2 + 1 = 0 $
    *   *Explanation:* Performing the matrix multiplications (which are just scalar multiplications here) with the given values.

4.  **Rearrange the ARE into a standard quadratic equation:**
    *   $ -p^2 + 4p + 1 = 0 $
    *   $ p^2 - 4p - 1 = 0 $
    *   *Explanation:* Multiplying by -1 to make the $p^2$ term positive, which is standard for solving quadratic equations.

5.  **Solve the quadratic equation for $p$ using the quadratic formula:**
    *   The quadratic formula is $ p = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} $. Here, $ a=1, b=-4, c=-1 $.
    *   $ p = \frac{-(-4) \pm \sqrt{(-4)^2 - 4(1)(-1)}}{2(1)} $
    *   $ p = \frac{4 \pm \sqrt{16 + 4}}{2} $
    *   $ p = \frac{4 \pm \sqrt{20}}{2} $
    *   $ p = \frac{4 \pm 2\sqrt{5}}{2} $
    *   $ p = 2 \pm \sqrt{5} $
    *   *Explanation:* Applying the standard quadratic formula to find the roots of the equation.

6.  **Choose the positive definite solution for $p$:**
    *   We have two solutions: $ p_1 = 2 + \sqrt{5} \approx 2 + 2.236 = 4.236 $ and $ p_2 = 2 - \sqrt{5} \approx 2 - 2.236 = -0.236 $.
    *   For a scalar, positive definite means $ p > 0 $. So, we choose $ p = 2 + \sqrt{5} $.
    *   *Explanation:* The LQR theory dictates that the solution $P$ (or $p$ in this scalar case) must be positive definite to guarantee a stable closed-loop system and a meaningful cost function.

7.  **Calculate the optimal gain $k$:**
    *   The formula for the optimal gain is $ \mathbf{K} = \mathbf{R}^{-1}\mathbf{B}^T\mathbf{P} $.
    *   For the scalar case: $ k = R^{-1}Bp $.
    *   $ k = (1)^{-1}(1)(2 + \sqrt{5}) $
    *   $ k = 1 \cdot 1 \cdot (2 + \sqrt{5}) $
    *   $ k = 2 + \sqrt{5} $
    *   *Explanation:* Plugging the calculated $p$ and the given $R$ and $B$ values into the optimal gain formula.

8.  **Final Answer:**
    The optimal feedback gain is $ \mathbf{k = 2 + \sqrt{5} \approx 4.236} $.

**Reflection:** This example was tricky because it involved solving a quadratic equation and choosing the correct root. The key is remembering that $P$ (or $p$) must be positive definite.

### Example 2: 2D System (Double Integrator)

**Problem Statement:** Consider a double integrator system, often used to model position and velocity, described by:
$ \begin{bmatrix} \dot{x}_1 \\ \dot{x}_2 \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} + \begin{bmatrix} 0 \\ 1 \end{bmatrix} u $.
We want to find the optimal control $ u = -\mathbf{K}\mathbf{x} $ that minimizes the cost function $ J = \int_0^\infty (\mathbf{x}^T\mathbf{Q}\mathbf{x} + \mathbf{u}^T\mathbf{R}\mathbf{u}) dt $.
Given: $ \mathbf{Q} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} $ and $ \mathbf{R} = [1] $.

**What's given:**
*   System dynamics: $ \mathbf{A} = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} $, $ \mathbf{B} = \begin{bmatrix} 0 \\ 1 \end{bmatrix} $.
*   Cost function parameters: $ \mathbf{Q} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} $, $ \mathbf{R} = [1] $.
**What we want:**
*   The optimal feedback gain matrix $ \mathbf{K} $.

**Step-by-step solution:**

1.  **Identify the system matrices and cost weights:**
    *   $ \mathbf{A} = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} $, $ \mathbf{B} = \begin{bmatrix} 0 \\ 1 \end{bmatrix} $.
    *   $ \mathbf{Q} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} $, $ \mathbf{R} = [1] $.
    *   *Explanation:* Directly extracting the given matrices.

2.  **Write down the Algebraic Riccati Equation (ARE):**
    *   $ \mathbf{A}^T\mathbf{P} + \mathbf{P}\mathbf{A} - \mathbf{P}\mathbf{B}\mathbf{R}^{-1}\mathbf{B}^T\mathbf{P} + \mathbf{Q} = \mathbf{0} $.
    *   Let $ \mathbf{P} = \begin{bmatrix} p_{11} & p_{12} \\ p_{12} & p_{22} \end{bmatrix} $ (since $ \mathbf{P} $ must be symmetric).
    *   *Explanation:* We assume $P$ is a symmetric matrix of appropriate dimensions (2x2 for a 2-state system).

3.  **Calculate the terms in the ARE:**

    *   **$ \mathbf{A}^T\mathbf{P} $:**
        $ \mathbf{A}^T = \begin{bmatrix} 0 & 0 \\ 1 & 0 \end{bmatrix} $
        $ \mathbf{A}^T\mathbf{P} = \begin{bmatrix} 0 & 0 \\ 1 & 0 \end{bmatrix} \begin{bmatrix} p_{11} & p_{12} \\ p_{12} & p_{22} \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ p_{11} & p_{12} \end{bmatrix} $
        *Explanation:* Matrix multiplication of $A^T$ and $P$.

    *   **$ \mathbf{P}\mathbf{A} $:**
        $ \mathbf{P}\mathbf{A} = \begin{bmatrix} p_{11} & p_{12} \\ p_{12} & p_{22} \end{bmatrix} \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} = \begin{bmatrix} 0 & p_{11} \\ 0 & p_{12} \end{bmatrix} $
        *Explanation:* Matrix multiplication of $P$ and $A$.

    *   **$ \mathbf{P}\mathbf{B} $:**
        $ \mathbf{P}\mathbf{B} = \begin{bmatrix} p_{11} & p_{12} \\ p_{12} & p_{22} \end{bmatrix} \begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} p_{12} \\ p_{22} \end{bmatrix} $
        *Explanation:* Matrix multiplication of $P$ and $B$.

    *   **$ \mathbf{R}^{-1} $:**
        $ \mathbf{R} = [1] \implies \mathbf{R}^{-1} = [1] $
        *Explanation:* The inverse of a 1x1 matrix is simply its reciprocal.

    *   **$ \mathbf{B}^T\mathbf{P} $:**
        $ \mathbf{B}^T = \begin{bmatrix} 0 & 1 \end{bmatrix} $
        $ \mathbf{B}^T\mathbf{P} = \begin{bmatrix} 0 & 1 \end{bmatrix} \begin{bmatrix} p_{11} & p_{12} \\ p_{12} & p_{22} \end{bmatrix} = \begin{bmatrix} p_{12} & p_{22} \end{bmatrix} $
        *Explanation:* Matrix multiplication of $B^T$ and $P$.

    *   **$ \mathbf{P}\mathbf{B}\mathbf{R}^{-1}\mathbf{B}^T\mathbf{P} $:**
        $ (\mathbf{P}\mathbf{B})\mathbf{R}^{-1}(\mathbf{B}^T\mathbf{P}) = \begin{bmatrix} p_{12} \\ p_{22} \end{bmatrix} [1] \begin{bmatrix} p_{12} & p_{22} \end{bmatrix} $
        $ = \begin{bmatrix} p_{12} \\ p_{22} \end{bmatrix} \begin{bmatrix} p_{12} & p_{22} \end{bmatrix} $
        $ = \begin{bmatrix} p_{12}^2 & p_{12}p_{22} \\ p_{12}p_{22} & p_{22}^2 \end{bmatrix} $
        *Explanation:* Multiplying the three terms. Note that $ \mathbf{R}^{-1} $ is just a scalar here, so it effectively doesn't change the vector-matrix product.

4.  **Substitute all terms back into the ARE:**
    $ \begin{bmatrix} 0 & 0 \\ p_{11} & p_{12} \end{bmatrix} + \begin{bmatrix} 0 & p_{11} \\ 0 & p_{12} \end{bmatrix} - \begin{bmatrix} p_{12}^2 & p_{12}p_{22} \\ p_{12}p_{22} & p_{22}^2 \end{bmatrix} + \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix} $
    *Explanation:* Summing and subtracting the matrices as per the ARE.

5.  **Combine the terms to form a single matrix equation:**
    $ \begin{bmatrix} 0 - p_{12}^2 + 1 & p_{11} - p_{12}p_{22} \\ p_{11} - p_{12}p_{22} & 2p_{12} - p_{22}^2 + 1 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix} $
    *Explanation:* Performing the matrix addition/subtraction element-wise.

6.  **Set each element of the resulting matrix to zero to get a system of equations:**
    *   Equation (1,1): $ 1 - p_{12}^2 = 0 $
    *   Equation (1,2): $ p_{11} - p_{12}p_{22} = 0 $
    *   Equation (2,2): $ 2p_{12} - p_{22}^2 + 1 = 0 $
    *   *Explanation:* For two matrices to be equal, all their corresponding elements must be equal.

7.  **Solve the system of equations for $p_{11}, p_{12}, p_{22}$:**
    *   From (1,1): $ p_{12}^2 = 1 \implies p_{12} = \pm 1 $.
        Since $ \mathbf{P} $ must be positive definite, it can be shown that $ p_{12} $ must be positive for this system. So, $ p_{12} = 1 $.
        *Explanation:* Solving for $p_{12}$. The positive definite requirement for $P$ often implies positive values for certain elements, or at least ensures the overall matrix is positive definite. For a stabilizable system, the unique positive definite solution exists.

    *   Substitute $ p_{12} = 1 $ into (2,2):
        $ 2(1) - p_{22}^2 + 1 = 0 $
        $ 3 - p_{22}^2 = 0 $
        $ p_{22}^2 = 3 \implies p_{22} = \pm \sqrt{3} $.
        Again, for $ \mathbf{P} $ to be positive definite, $ p_{22} $ must be positive. So, $ p_{22} = \sqrt{3} $.
        *Explanation:* Solving for $p_{22}$ using the derived $p_{12}$.

    *   Substitute $ p_{12} = 1 $ and $ p_{22} = \sqrt{3} $ into (1,2):
        $ p_{11} - (1)(\sqrt{3}) = 0 $
        $ p_{11} = \sqrt{3} $
        *Explanation:* Solving for $p_{11}$ using the derived $p_{12}$ and $p_{22}$.

8.  **Form the optimal P matrix:**
    $ \mathbf{P} = \begin{bmatrix} \sqrt{3} & 1 \\ 1 & \sqrt{3} \end{bmatrix} $
    *Explanation:* Assembling the $P$ matrix from its calculated elements. We can verify that this $P$ is symmetric and positive definite (eigenvalues are $ \sqrt{3} \pm 1 $, both positive).

9.  **Calculate the optimal gain matrix $ \mathbf{K} $:**
    *   The formula is $ \mathbf{K} = \mathbf{R}^{-1}\mathbf{B}^T\mathbf{P} $.
    *   $ \mathbf{K} = [1] \begin{bmatrix} 0 & 1 \end{bmatrix} \begin{bmatrix} \sqrt{3} & 1 \\ 1 & \sqrt{3} \end{bmatrix} $
    *   $ \mathbf{K} = \begin{bmatrix} 0 & 1 \end{bmatrix} \begin{bmatrix} \sqrt{3} & 1 \\ 1 & \sqrt{3} \end{bmatrix} $
    *   $ \mathbf{K} = \begin{bmatrix} 0 \cdot \sqrt{3} + 1 \cdot 1 & 0 \cdot 1 + 1 \cdot \sqrt{3} \end{bmatrix} $
    *   $ \mathbf{K} = \begin{bmatrix} 1 & \sqrt{3} \end{bmatrix} $
    *   *Explanation:* Performing the matrix multiplications in the order specified by the formula.

10. **Final Answer:**
    The optimal feedback gain matrix is $ \mathbf{K = \begin{bmatrix} 1 & \sqrt{3} \end{bmatrix}} $.
    This means $ u = -x_1 - \sqrt{3}x_2 $.

**Reflection:** This example was significantly more involved due to matrix algebra. The trickiest part is carefully performing all matrix multiplications and then solving the resulting system of non-linear equations for the elements of $P$. The requirement for $P$ to be positive definite is crucial for selecting the correct roots.

### Example 3: Discrete-Time LQR (DARE)

**Problem Statement:** Consider a discrete-time system: $ \mathbf{x}_{k+1} = \mathbf{A}\mathbf{x}_k + \mathbf{B}\mathbf{u}_k $.
We want to find the optimal control $ \mathbf{u}_k = -\mathbf{K}\mathbf{x}_k $ that minimizes the cost function $ J = \sum_{k=0}^\infty (\mathbf{x}_k^T\mathbf{Q}\mathbf{x}_k + \mathbf{u}_k^T\mathbf{R}\mathbf{u}_k) $.
Given: $ \mathbf{A} = [1] $, $ \mathbf{B} = [1] $, $ \mathbf{Q} = [1] $, $ \mathbf{R} = [1] $.

**What's given:**
*   System dynamics: $ \mathbf{A} = [1] $, $ \mathbf{B} = [1] $.
*   Cost function parameters: $ \mathbf{Q} = [1] $, $ \mathbf{R} = [1] $.
**What we want:**
*   The optimal feedback gain $ \mathbf{K} $.

**Step-by-step solution:**

1.  **Identify the system matrices and cost weights:**
    *   $ \mathbf{A} = [1] $, $ \mathbf{B} = [1] $.
    *   $ \mathbf{Q} = [1] $, $ \mathbf{R} = [1] $.
    *   *Explanation:* Directly extracting the given scalar values (represented as 1x1 matrices).

2.  **Write down the Discrete Algebraic Riccati Equation (DARE):**
    *   The general DARE is: $ \mathbf{P} = \mathbf{A}^T\mathbf{P}\mathbf{A} - \mathbf{A}^T\mathbf{P}\mathbf{B}(\mathbf{R} + \mathbf{B}^T\mathbf{P}\mathbf{B})^{-1}\mathbf{B}^T\mathbf{P}\mathbf{A} + \mathbf{Q} $.
    *   For this scalar case, $ \mathbf{P} $ becomes a scalar $ p $. $ \mathbf{A}^T $ is $ A $, $ \mathbf{B}^T $ is $ B $.
    *   So, the scalar DARE is: $ p = A p A - A p B (R + B p B)^{-1} B p A + Q $.
    *   *Explanation:* This is the discrete-time equivalent of the CARE. It looks more complex due to the inverse term.

3.  **Substitute the given values into the DARE:**
    *   $ p = (1)p(1) - (1)p(1)(1 + (1)p(1))^{-1}(1)p(1) + 1 $
    *   $ p = p - p(1+p)^{-1}p + 1 $
    *   *Explanation:* Performing scalar multiplications with the given values.

4.  **Simplify and rearrange the DARE:**
    *   $ p = p - \frac{p^2}{1+p} + 1 $
    *   $ 0 = -\frac{p^2}{1+p} + 1 $
    *   $ \frac{p^2}{1+p} = 1 $
    *   $ p^2 = 1+p $
    *   $ p^2 - p - 1 = 0 $
    *   *Explanation:* Isolating the terms and bringing them to one side to form a quadratic equation.

5.  **Solve the quadratic equation for $p$:**
    *   Using the quadratic formula: $ p = \frac{-(-1) \pm \sqrt{(-1)^2 - 4(1)(-1)}}{2(1)} $
    *   $ p = \frac{1 \pm \sqrt{1 + 4}}{2} $
    *   $ p = \frac{1 \pm \sqrt{5}}{2} $
    *   *Explanation:* Applying the quadratic formula.

6.  **Choose the positive definite solution for $p$:**
    *   We have $ p_1 = \frac{1 + \sqrt{5}}{2} \approx 1.618 $ (the golden ratio) and $ p_2 = \frac{1 - \sqrt{5}}{2} \approx -0.618 $.
    *   For a scalar, positive definite means $ p > 0 $. So, we choose $ p = \frac{1 + \sqrt{5}}{2} $.
    *   *Explanation:* As with the continuous-time case, $P$ must be positive definite.

7.  **Calculate the optimal gain $ \mathbf{K} $:**
    *   The formula for the optimal gain in discrete time is $ \mathbf{K} = (\mathbf{R} + \mathbf{B}^T\mathbf{P}\mathbf{B})^{-1}\mathbf{B}^T\mathbf{P}\mathbf{A} $.
    *   For the scalar case: $ k = (R + B p B)^{-1} B p A $.
    *   $ k = (1 + (1)p(1))^{-1}(1)p(1) $
    *   $ k = (1 + p)^{-1}p $
    *   $ k = \frac{p}{1+p} $
    *   Substitute $ p = \frac{1 + \sqrt{5}}{2} $:
    *   $ k = \frac{\frac{1 + \sqrt{5}}{2}}{1 + \frac{1 + \sqrt{5}}{2}} = \frac{\frac{1 + \sqrt{5}}{2}}{\frac{2 + 1 + \sqrt{5}}{2}} = \frac{1 + \sqrt{5}}{3 + \sqrt{5}} $
    *   To rationalize the denominator:
        $ k = \frac{1 + \sqrt{5}}{3 + \sqrt{5}} \cdot \frac{3 - \sqrt{5}}{3 - \sqrt{5}} = \frac{3 - \sqrt{5} + 3\sqrt{5} - 5}{9 - 5} = \frac{-2 + 2\sqrt{5}}{4} = \frac{-1 + \sqrt{5}}{2} $
    *   *Explanation:* Plugging the calculated $p$ and the given $A, B, R$ values into the discrete-time optimal gain formula and simplifying.

8.  **Final Answer:**
    The optimal feedback gain is $ \mathbf{k = \frac{\sqrt{5} - 1}{2} \approx 0.618} $.

**Reflection:** The DARE is algebraically more complex than the CARE due to the inverse term involving $P$. The process of simplification and solving the quadratic equation is similar, but the gain formula is also different.

### Example 4: Tuning Q and R (Conceptual)

**Problem Statement:** Revisit the 2D double integrator system from Example 2:
$ \mathbf{A} = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} $, $ \mathbf{B} = \begin{bmatrix} 0 \\ 1 \end{bmatrix} $.
Instead of fixed $ \mathbf{Q} $ and $ \mathbf{R} $, let's explore how different choices affect the optimal gain $ \mathbf{K} $ and the system's behavior.

**What's given:**
*   System dynamics: $ \mathbf{A} = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} $, $ \mathbf{B} = \begin{bmatrix} 0 \\ 1 \end{bmatrix} $.
**What we want:**
*   To understand the impact of $ \mathbf{Q} $ and $ \mathbf{R} $ on $ \mathbf{K} $.

**Step-by-step conceptual analysis:**

1.  **Recall the general LQR problem:**
    *   Minimize $ J = \int_0^\infty (\mathbf{x}^T\mathbf{Q}\mathbf{x} + \mathbf{u}^T\mathbf{R}\mathbf{u}) dt $.
    *   Optimal gain $ \mathbf{K} = \mathbf{R}^{-1}\mathbf{B}^T\mathbf{P} $, where $ \mathbf{P} $ solves the ARE.
    *   *Explanation:* These are the fundamental equations.

2.  **Case A: Prioritize state error (large Q, small R)**
    *   Let $ \mathbf{Q} = \begin{bmatrix} 100 & 0 \\ 0 & 100 \end{bmatrix} $ and $ \mathbf{R} = [1] $. (Compared to Example 2, Q is 100x larger).
    *   *Expected outcome:* A large $ \mathbf{Q} $ means we heavily penalize deviations from the desired state (origin). A relatively small $ \mathbf{R} $ means we are willing to use a lot of control effort.
    *   *Impact on K:* The solution for $ \mathbf{P} $ will generally have larger values, leading to a larger $ \mathbf{K} $. A larger $ \mathbf{K} $ means a more aggressive controller.
    *   *System behavior:* The system will respond very quickly to bring the state back to zero, often with higher control inputs and potentially more oscillations (though LQR generally ensures stability, the damping might be lower). It will be "stiff" and fast.
    *   *Explanation:* High Q means high penalty for state error, so the controller will work harder (higher K, higher u) to reduce that error quickly.

3.  **Case B: Prioritize control effort (small Q, large R)**
    *   Let $ \mathbf{Q} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} $ and $ \mathbf{R} = [100] $. (Compared to Example 2, R is 100x larger).
    *   *Expected outcome:* A relatively small $ \mathbf{Q} $ means we are tolerant of some state deviation. A large $ \mathbf{R} $ means we heavily penalize control effort.
    *   *Impact on K:* The solution for $ \mathbf{P} $ will generally have smaller values, leading to a smaller $ \mathbf{K} $. A smaller $ \mathbf{K} $ means a less aggressive controller.
    *   *System behavior:* The system will respond more slowly and gently, using minimal control inputs. It might take longer to return to the desired state, but it will do so smoothly and efficiently. It will be "soft" and slow.
    *   *Explanation:* High R means high penalty for control effort, so the controller will be "lazy" (lower K, lower u) to save resources, even if it means taking longer to reach the target.

4.  **Case C: Prioritize specific states (diagonal Q with varying entries)**
    *   Let $ \mathbf{Q} = \begin{bmatrix} 100 & 0 \\ 0 & 1 \end{bmatrix} $ and $ \mathbf{R} = [1] $.
    *   *Expected outcome:* We heavily penalize $x_1$ (position error) but are more tolerant of $x_2$ (velocity error).
    *   *Impact on K:* The elements of $ \mathbf{P} $ and consequently $ \mathbf{K} $ will reflect this weighting. The controller will prioritize reducing $x_1$ quickly, even if it means higher velocity for a short period.
    *   *System behavior:* The system will quickly correct position errors, but might allow velocity to build up more before correcting it, compared to a controller that penalizes velocity equally.
    *   *Explanation:* By making $q_{11}$ large, we tell the LQR to prioritize minimizing $x_1^2$.

**Reflection:** This example highlights that LQR is not just a calculation, but a design tool. The choice of $ \mathbf{Q} $ and $ \mathbf{R} $ matrices is critical and often involves iteration and engineering judgment to achieve the desired performance trade-offs (e.g., speed vs. fuel efficiency). The ratio of $ \mathbf{Q} $ to $ \mathbf{R} $ is generally more important than their absolute values.

## 6. Common mistakes and traps

1.  **Incorrectly choosing Q and R matrices:** This is the most frequent mistake. If $ \mathbf{Q} $ or $ \mathbf{R} $ are not positive (semi-)definite, the mathematical conditions for LQR are violated, leading to non-unique or unstable solutions. Even if mathematically valid, poor weighting (e.g., $ \mathbf{Q} $ too small, $ \mathbf{R} $ too large) results in a sluggish controller, while the opposite can lead to excessive control effort or oscillations.
2.  **Applying continuous LQR to discrete systems (and vice versa):** The Algebraic Riccati Equations (AREs) for continuous-time and discrete-time systems are different. Using the wrong one will yield incorrect results.
3.  **Numerical instability when solving the Riccati equation:** For high-dimensional systems, solving the ARE numerically can be challenging. Standard software packages (like MATLAB's `care` or `dare` functions) are robust, but understanding their limitations and potential numerical issues is important.
4.  **Ignoring the stability/controllability/observability conditions:** The existence of a unique positive definite solution to the ARE (and thus a stable LQR controller) depends on the system being stabilizable and detectable. If these conditions are not met, LQR might not yield a stable controller.
5.  **Misinterpreting the cost function's physical meaning:** The quadratic cost function implies that small deviations are penalized less than large ones, and that control effort is also penalized quadratically. If the actual physical penalties are linear or have hard constraints, LQR might not be the most appropriate optimal control method (though it can be a good starting point).
6.  **Applying LQR directly to highly non-linear systems:** LQR is designed for linear systems. While it can be applied to linearized versions of non-linear systems, its performance might degrade significantly far from the linearization point. This often necessitates techniques like gain scheduling or Model Predictive Control (MPC) for robust non-linear control.

## 7. Textbook-precise explanation

The Linear Quadratic Regulator (LQR) is a method for designing an optimal state-feedback controller for linear systems with a quadratic performance index.

Consider a linear time-invariant (LTI) continuous-time system in state-space form:
$$ \dot{\mathbf{x}}(t) = \mathbf{A}\mathbf{x}(t) + \mathbf{B}\mathbf{u}(t) $$
where $ \mathbf{x}(t) \in \mathbb{R}^n $ is the state vector, $ \mathbf{u}(t) \in \mathbb{R}^m $ is the control input vector, $ \mathbf{A} \in \mathbb{R}^{n \times n} $ is the system matrix, and $ \mathbf{B} \in \mathbb{R}^{n \times m} $ is the input matrix.

The objective of LQR is to find a state-feedback control law of the form $ \mathbf{u}(t) = -\mathbf{K}\mathbf{x}(t) $ that minimizes the infinite-horizon quadratic cost function:
$$ J = \int_0^\infty (\mathbf{x}^T(t)\mathbf{Q}\mathbf{x}(t) + \mathbf{u}^T(t)\mathbf{R}\mathbf{u}(t)) dt $$
where $ \mathbf{Q} \in \mathbb{R}^{n \times n} $ is a symmetric positive semi-definite matrix ($ \mathbf{Q} \geq 0 $) that penalizes state deviations from the origin, and $ \mathbf{R} \in \mathbb{R}^{m \times m} $ is a symmetric positive definite matrix ($ \mathbf{R} > 0 $) that penalizes control effort.

The solution to this optimal control problem is found by applying the Hamilton-Jacobi-Bellman (HJB) equation or Pontryagin's Minimum Principle. For this specific problem structure (linear system, quadratic cost, infinite horizon), the HJB equation simplifies, and the optimal cost-to-go function is found to be $ V(\mathbf{x}) = \mathbf{x}^T\mathbf{P}\mathbf{x} $, where $ \mathbf{P} \in \mathbb{R}^{n \times n} $ is a unique symmetric positive definite solution to the **Algebraic Riccati Equation (ARE)**:
$$ \mathbf{A}^T\mathbf{P} + \mathbf{P}\mathbf{A} - \mathbf{P}\mathbf{B}\mathbf{R}^{-1}\mathbf{B}^T\mathbf{P} + \mathbf{Q} = \mathbf{0} $$
The existence of a unique positive definite solution $ \mathbf{P} $ is guaranteed if the system $ (\mathbf{A}, \mathbf{B}) $ is stabilizable and $ (\mathbf{A}, \mathbf{Q}^{1/2}) $ is detectable (where $ \mathbf{Q}^{1/2} $ is any matrix such that $ \mathbf{Q}^{1/2T}\mathbf{Q}^{1/2} = \mathbf{Q} $).

Once the unique positive definite solution $ \mathbf{P} $ to the ARE is found, the optimal feedback gain matrix $ \mathbf{K} $ is given by:
$$ \mathbf{K} = \mathbf{R}^{-1}\mathbf{B}^T\mathbf{P} $$
The resulting closed-loop system, with $ \mathbf{u}(t) = -\mathbf{K}\mathbf{x}(t) $, is $ \dot{\mathbf{x}}(t) = (\mathbf{A} - \mathbf{B}\mathbf{K})\mathbf{x}(t) $. This closed-loop system is guaranteed to be asymptotically stable.

For discrete-time systems, $ \mathbf{x}_{k+1} = \mathbf{A}\mathbf{x}_k + \mathbf{B}\mathbf{u}_k $, and the cost function $ J = \sum_{k=0}^\infty (\mathbf{x}_k^T\mathbf{Q}\mathbf{x}_k + \mathbf{u}_k^T\mathbf{R}\mathbf{u}_k) $, the Discrete Algebraic Riccati Equation (DARE) is:
$$ \mathbf{P} = \mathbf{A}^T\mathbf{P}\mathbf{A} - \mathbf{A}^T\mathbf{P}\mathbf{B}(\mathbf{R} + \mathbf{B}^T\mathbf{P}\mathbf{B})^{-1}\mathbf{B}^T\mathbf{P}\mathbf{A} + \mathbf{Q} $$
And the optimal discrete-time gain $ \mathbf{K} $ is:
$$ \mathbf{K} = (\mathbf{R} + \mathbf{B}^T\mathbf{P}\mathbf{B})^{-1}\mathbf{B}^T\mathbf{P}\mathbf{A} $$

**References:**
*   Ogata, K. (2010). *Modern Control Engineering* (5th ed.). Prentice Hall. (Chapter 11: Optimal Control)
*   Franklin, G. F., Powell, J. D., & Emami-Naeini, A. (2014). *Feedback Control of Dynamic Systems* (7th ed.). Pearson. (Chapter 5: State-Space Design, specifically section on LQR)
*   Lewis, F. L., Vrabie, D., & Syrmos, V. L. (2012). *Optimal Control* (3rd ed.). Wiley. (Chapter 3: The Linear Quadratic Regulator)

## 8. ASCII diagrams

Here's a block diagram illustrating the LQR control loop:

```text
                  +-------------------------------------------------+
                  |                                                 |
                  |                Optimal Control Law              |
                  |                                                 |
                  |   Minimize J = ∫(x'Qx + u'Ru)dt subject to     |
                  |             .                                   |
                  |            x = Ax + Bu                          |
                  |                                                 |
                  +-------------------------------------------------+
                                       |
                                       | Algebraic Riccati Equation (ARE)
                                       |   A'P + PA - PBR⁻¹B'P + Q = 0
                                       |   Solve for P
                                       |
                                       v
                  +-------------------------------------------------+
                  |                                                 |
                  |       Optimal Feedback Gain Calculation         |
                  |                                                 |
                  |             K = R⁻¹B'P                          |
                  |                                                 |
                  +-------------------------------------------------+
                                       |
                                       |
                                       v
        +------------------------------------------------------------------+
        |                                                                  |
        |        +-------------------+           +-------------------+   |
        |        |                   |           |                   |   |
        |        |     Controller    |           |       Plant       |   |
        |        |    u = -Kx        |---------> |    .              |   |
        |        |                   |     u     |   x = Ax + Bu     |   |
        |        +-------------------+           |                   |   |
        |                  ^                     +---------^---------+   |
        |                  |                               |             |
        |                  |                               |             |
        |                  |                               |             |
        |                  +-------------------------------+             |
        |                                 x (state)                      |
        +------------------------------------------------------------------+
                             (Closed-loop system)
```

**Description of the Diagram:**
The diagram illustrates the overall LQR design process and the resulting closed-loop control system.
1.  **Optimal Control Law Box (Top):** This box represents the theoretical problem statement: minimizing the quadratic cost function $J$ subject to the linear system dynamics.
2.  **Algebraic Riccati Equation (ARE) Arrow:** The solution to the optimal control problem leads to the ARE. This arrow indicates that the ARE is derived from the optimal control problem. We solve this equation for the matrix $P$.
3.  **Optimal Feedback Gain Calculation Box (Middle):** Once $P$ is found from the ARE, the optimal feedback gain matrix $K$ is calculated using the formula $K = R^{-1}B^TP$.
4.  **Closed-loop System Box (Bottom):** This represents the final control system.
    *   **Plant:** This is the physical system we want to control ($ \dot{x} = Ax + Bu $). Its state $x$ is measured.
    *   **Controller:** This is the LQR controller, which implements the optimal linear state feedback law $u = -Kx$. It takes the current state $x$ as input and outputs the control command $u$.
    *   **Feedback Loop:** The state $x$ from the Plant is fed back to the Controller, which then computes the control input $u$ that goes back into the Plant. This forms a closed loop, where the system continuously adjusts its inputs based on its current state.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **"A Priori, Ponder B-R-B, Ponder Q"** for the Continuous-time Algebraic Riccati Equation (CARE):
        $ \mathbf{A}^T\mathbf{P} + \mathbf{P}\mathbf{A} - \mathbf{P}\mathbf{B}\mathbf{R}^{-1}\mathbf{B}^T\mathbf{P} + \mathbf{Q} = \mathbf{0} $
        *   **A Priori (A'P):** Starts with $A^T P$.
        *   **Ponder (PA):**