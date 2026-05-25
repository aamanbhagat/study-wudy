## 1. What it is — in plain English

Imagine you have a toy car, and you want it to behave in a very specific way: maybe accelerate smoothly, turn corners precisely, and stop quickly without skidding. Right now, it's a bit wild – it overshoots turns and takes too long to stop. "Pole placement" is like giving that car a complete personality makeover. It's a method to precisely tune its behavior.

In the world of engineering, systems (like rockets, drones, or even your car's cruise control) have inherent "personalities" or tendencies. These tendencies dictate how they react to inputs and disturbances. Some systems might be naturally wobbly, while others are sluggish. We represent these tendencies mathematically as "poles."

"Pole placement" is the process of deliberately moving these "poles" to new, desired locations. By doing this, we can make the system stable if it's wobbly, faster if it's sluggish, or smoother if it's jerky. It's about engineering the system's response to be exactly what we need for a specific task.

Ackermann's formula is a specific, elegant mathematical recipe that helps us achieve this pole placement. Instead of trial and error, or complex iterative calculations, Ackermann's formula provides a direct way to calculate the exact "tuning parameters" needed to shift the system's poles to our chosen locations, ensuring our toy car (or rocket!) behaves exactly as desired.

## 2. Why it matters — real-world applications

Pole placement, and Ackermann's formula as a tool to achieve it, is fundamental to designing robust and predictable control systems across many domains:

1.  **Aerospace Engineering (Rocket & Aircraft Stability):** When a rocket launches or an aircraft flies, engineers need precise control over its attitude (orientation) and trajectory. An unstable rocket could tumble, and an aircraft could become uncontrollable. Pole placement is used to design the feedback control systems that ensure stability, rapid response to pilot/autopilot commands, and damping of unwanted oscillations. For example, SpaceX uses advanced control algorithms to land its Falcon 9 boosters, where precise pole placement ensures the rocket maintains its vertical orientation and lands softly despite aerodynamic disturbances.

2.  **Autonomous Vehicles (Cruise Control & Active Suspension):** Modern cars use pole placement principles for features like adaptive cruise control, which maintains a safe distance from the car ahead, and active suspension systems, which adjust damping to improve ride comfort and handling. By carefully placing poles, engineers can ensure the vehicle responds smoothly to changes in speed limits or road conditions, avoiding jerky accelerations or uncomfortable bounces. Tesla's autopilot features, while complex, rely on fundamental control theory like pole placement for their underlying stability and response characteristics.

3.  **Robotics (Precision Manipulation & Navigation):** Industrial robot arms, surgical robots, and even drones performing intricate maneuvers require extremely precise control over their joint angles and end-effector positions. Pole placement helps design controllers that ensure these robots move smoothly, accurately, and without overshooting their targets, even when carrying varying loads. For instance, a KUKA industrial robot welding a car frame needs its joints to move with high precision and stability, which is achieved through well-tuned feedback controllers.

4.  **Power Systems (Grid Stability):** Large electrical grids are complex systems where fluctuations in generation or demand can lead to instability and blackouts. Control engineers use pole placement techniques to design controllers for generators and power converters that help stabilize the grid frequency and voltage, ensuring a reliable power supply. This is critical for national grids, preventing cascading failures across interconnected power stations.

## 3. Prerequisites — what you must know first

To fully grasp Ackermann's formula and pole placement, you should be comfortable with the following foundational concepts:

*   **Linear Algebra:**
    *   **Vectors and Matrices:** Operations like addition, subtraction, multiplication, and scalar multiplication of matrices.
    *   **Determinant of a Matrix:** A scalar value that provides information about the matrix (e.g., invertibility).
    *   **Matrix Inverse:** The matrix that, when multiplied by the original matrix, yields the identity matrix. Essential for solving matrix equations.
    *   **Eigenvalues and Eigenvectors:** Special scalars and vectors that characterize the behavior of a linear transformation; eigenvalues are directly related to system poles.
    *   **Characteristic Polynomial:** A polynomial whose roots are the eigenvalues of a matrix, typically found by $\det(sI - A)$.
*   **Differential Equations:**
    *   **State-Space Representation:** A mathematical model that describes a physical system as a set of first-order differential equations, using state variables.
*   **Control Systems Basics:**
    *   **Open-Loop vs. Closed-Loop Systems:** Understanding the difference between systems without feedback and those with feedback.
    *   **Feedback Control:** The concept of using system output to adjust system input.
    *   **Stability:** The property of a system to return to its equilibrium state after a disturbance.
    *   **Poles:** The roots of the characteristic equation of a system, which determine its stability and transient response.
    *   **Controllability:** The ability to move a system from any initial state to any desired final state using control inputs.

## 4. The core idea — step by step

Let's break down the concept of pole placement using Ackermann's formula, building from intuition to its mathematical form.

### Step 1: Understanding System Dynamics (State-Space Representation)

**Plain English:** Before we can control a system, we need to describe how it behaves. Think of it like making a detailed instruction manual for our toy car: how its speed changes when we press the accelerator, how its direction changes when we turn the wheel, and what its current speed and direction are. This "manual" is the state-space model.

**Small Concrete Example:** Consider a simple mass-spring-damper system. Its "state" might be its position and velocity. If you push it, its position and velocity change over time. The state-space model describes these changes.

**Formal/Mathematical Version:** A linear, time-invariant (LTI) system is typically described by its state-space equations:

$$
\dot{\mathbf{x}}(t) = A\mathbf{x}(t) + B\mathbf{u}(t) \\
\mathbf{y}(t) = C\mathbf{x}(t) + D\mathbf{u}(t)
$$

Where:
*   $\mathbf{x}(t)$ is the **state vector** (e.g., position, velocity, angle, angular velocity). It contains the minimum set of variables that completely describe the system's current condition.
*   $\dot{\mathbf{x}}(t)$ is the derivative of the state vector with respect to time (how the states are changing).
*   $\mathbf{u}(t)$ is the **input vector** (e.g., force, voltage, torque). These are the controls we apply.
*   $\mathbf{y}(t)$ is the **output vector** (what we measure, e.g., position, temperature).
*   $A$ is the **system matrix** (describes the internal dynamics).
*   $B$ is the **input matrix** (how inputs affect the states).
*   $C$ is the **output matrix** (how states relate to outputs).
*   $D$ is the **feedforward matrix** (how inputs directly affect outputs, often zero).

For pole placement, we primarily focus on the $A$ and $B$ matrices.

**What could go wrong:** If your state-space model (your $A$ and $B$ matrices) doesn't accurately represent the real system, your control design will be flawed. Garbage in, garbage out!

### Step 2: What are "Poles"?

**Plain English:** The "poles" of a system are like its fundamental resonant frequencies or natural modes of behavior. They tell us how the system will respond if you just poke it and let it go. Will it oscillate forever? Will it quickly settle down? Will it run away and become unstable? Each pole is a specific number (often complex) that dictates one aspect of this behavior.

**Small Concrete Example:** If you pluck a guitar string, it vibrates at certain frequencies. Those frequencies are analogous to poles. A system with poles in the right half of the complex plane is unstable (like a string that vibrates louder and louder until it breaks). Poles in the left half are stable (the vibration eventually dies out).

**Formal/Mathematical Version:** The poles of an LTI system are the eigenvalues of the system matrix $A$. They are the roots of the system's characteristic polynomial, given by:

$$
\det(sI - A) = 0
$$

Where $s$ is a complex variable, and $I$ is the identity matrix. The location of these poles in the complex plane determines the system's stability and transient response characteristics (e.g., speed of response, oscillation, damping).

**What could go wrong:** Miscalculating the poles means you don't truly understand your system's inherent behavior. This is a critical first step.

### Step 3: The Problem of Pole Placement

**Plain English:** Our system has its natural "personality" (its current poles). But we want it to have a *different*, desired personality (a new set of poles). For example, a rocket might naturally be a bit wobbly (poles close to the imaginary axis or in the right half-plane), but we want it to be very stable and quickly return to its desired orientation (poles far into the left half-plane). Pole placement is the act of designing a controller to make this happen.

**Small Concrete Example:** Imagine your toy car naturally drifts to the left. You want it to drive straight and respond quickly to steering. You decide you want its "driftiness" to be zero and its "steering response time" to be very short. You're choosing new, desired poles.

**Formal/Mathematical Version:** Given a system $\dot{\mathbf{x}} = A\mathbf{x} + B\mathbf{u}$, we want to find a state feedback gain matrix $K$ such that the eigenvalues of the closed-loop system matrix $(A-BK)$ are equal to a set of desired poles $\{\lambda_1, \lambda_2, \dots, \lambda_n\}$. These desired poles correspond to a desired characteristic polynomial $p_d(s) = (s-\lambda_1)(s-\lambda_2)\dots(s-\lambda_n)$.

**What could go wrong:** Choosing desired poles that are too aggressive (e.g., extremely fast response) can lead to very large control efforts, requiring powerful actuators that might not be physically possible or economically feasible. The desired poles must also come in complex conjugate pairs if they are complex, to ensure the resulting gain matrix $K$ is real.

### Step 4: Introducing State Feedback

**Plain English:** How do we change the system's personality? By continuously monitoring its current state (its position, velocity, etc.) and using that information to calculate a control input. This is called "state feedback." We feed the system's current "state" back into the control input to influence its behavior.

**Small Concrete Example:** When you drive a car, you constantly observe its speed, direction, and position on the road (its state). You then use this information to adjust the steering wheel and accelerator (your control input) to keep it on track. This is exactly what state feedback does, but mathematically.

**Formal/Mathematical Version:** We introduce a control law of the form:

$$
\mathbf{u}(t) = -K\mathbf{x}(t)
$$

Where $K$ is the **state feedback gain matrix**. Substituting this into the original state equation:

$$
\dot{\mathbf{x}}(t) = A\mathbf{x}(t) + B(-K\mathbf{x}(t)) \\
\dot{\mathbf{x}}(t) = (A - BK)\mathbf{x}(t)
$$

The new system matrix for the closed-loop system is $(A-BK)$. Our goal is to choose $K$ such that this new matrix $(A-BK)$ has the desired eigenvalues (poles).

**What could go wrong:** State feedback requires knowing all the state variables. In many real-world systems, not all states can be directly measured. This is where observers (like Kalman filters) come in, estimating unmeasured states. For now, assume all states are available.

### Step 5: The Characteristic Polynomial of the Closed-Loop System

**Plain English:** Once we apply state feedback, the system's "personality equation" changes. We can write down a new characteristic polynomial for this modified system. This new polynomial's roots are precisely the poles of our controlled system.

**Small Concrete Example:** If the original toy car's characteristic equation was like $s^2 + 2s + 5 = 0$ (meaning it oscillates a bit), after adding our feedback controller, the new equation might be $s^2 + 5s + 10 = 0$ (meaning it settles faster).

**Formal/Mathematical Version:** The characteristic polynomial of the closed-loop system is given by:

$$
p_{cl}(s) = \det(sI - (A - BK)) = 0
$$

We want to choose $K$ such that this polynomial $p_{cl}(s)$ is identical to our desired characteristic polynomial $p_d(s)$. That is, we want the coefficients of $s$ in $p_{cl}(s)$ to match the coefficients in $p_d(s)$.

**What could go wrong:** Equating coefficients can be algebraically intensive, especially for higher-order systems. This is where Ackermann's formula offers a direct, non-iterative solution for single-input systems.

### Step 6: Ackermann's Formula to the Rescue

**Plain English:** Instead of going through the tedious process of calculating $\det(sI - (A-BK))$, expanding it, and then equating coefficients with our desired polynomial, Ackermann's formula gives us a direct, one-shot way to calculate the feedback gain matrix $K$. It's like having a magic button that, given your system's characteristics ($A$, $B$) and your desired behavior ($p_d(s)$), instantly spits out the correct tuning parameters ($K$).

**Small Concrete Example:** Imagine you want to bake a specific cake. Instead of trying different amounts of flour, sugar, and eggs until it tastes right, Ackermann's formula is like a precise recipe that tells you exactly how much of each ingredient (the elements of $K$) to use to get your desired cake (the desired poles).

**Formal/Mathematical Version:** For a single-input (SISO) system (where $\mathbf{u}$ is a scalar, and $B$ is a column vector), if the system is controllable, Ackermann's formula for the state feedback gain $K$ is:

$$
K = \begin{bmatrix} 0 & 0 & \dots & 0 & 1 \end{bmatrix} \mathcal{C}^{-1} p_d(A)
$$

Where:
*   $\mathcal{C}$ is the **controllability matrix** (defined in Step 7).
*   $p_d(A)$ is the **desired characteristic polynomial evaluated at the matrix $A$**. If $p_d(s) = s^n + \alpha_{n-1}s^{n-1} + \dots + \alpha_1 s + \alpha_0$, then $p_d(A) = A^n + \alpha_{n-1}A^{n-1} + \dots + \alpha_1 A + \alpha_0 I$. (Note: $I$ is the identity matrix for the constant term $\alpha_0$).

**What could go wrong:** The most common errors are algebraic mistakes in calculating $p_d(A)$ or the inverse of the controllability matrix $\mathcal{C}^{-1}$. Also, Ackermann's formula is specifically for single-input systems; for multiple-input systems, more general pole placement algorithms are used.

### Step 7: Controllability

**Plain English:** Before you even *try* to place poles, you must ask: "Can I actually influence all the important aspects of this system using my available controls?" If you have a car but no steering wheel, you can't control its direction, no matter how clever your feedback algorithm is. This ability to influence all states is called "controllability." Ackermann's formula (and pole placement in general) only works if the system is controllable.

**Small Concrete Example:** If you have a boat with only a propeller (forward/backward thrust) but no rudder, you can control its speed, but not its direction. The "direction" state would be uncontrollable. You couldn't place poles to dictate its turning behavior.

**Formal/Mathematical Version:** A linear system $(A, B)$ is controllable if and only if the **controllability matrix** $\mathcal{C}$ has full rank. For an $n$-th order system (where $A$ is $n \times n$ and $B$ is $n \times 1$ for a single-input system), the controllability matrix is:

$$
\mathcal{C} = \begin{bmatrix} B & AB & A^2B & \dots & A^{n-1}B \end{bmatrix}
$$

The rank of $\mathcal{C}$ must be $n$. If $\det(\mathcal{C}) \neq 0$, then the system is controllable.

**What could go wrong:** If the system is not controllable, you simply cannot place the poles arbitrarily. Trying to apply Ackermann's formula will result in a singular controllability matrix (its determinant will be zero), meaning $\mathcal{C}^{-1}$ does not exist. Always check controllability first!

## 5. Worked examples — multiple, with every step shown

Let's walk through several examples to solidify your understanding.

### Example 1: Easy 2x2 System with Real Poles

**Problem:** Consider a system described by the state-space model:
$$
A = \begin{bmatrix} 0 & 1 \\ 2 & -1 \end{bmatrix}, \quad B = \begin{bmatrix} 0 \\ 1 \end{bmatrix}
$$
Design a state feedback controller $\mathbf{u} = -K\mathbf{x}$ such that the closed-loop system has desired poles at $s_1 = -2$ and $s_2 = -3$.

**Given:** System matrices $A$ and $B$, desired poles $s_1 = -2, s_2 = -3$.
**Want:** Feedback gain matrix $K = \begin{bmatrix} k_1 & k_2 \end{bmatrix}$.

**Step 1: Check Controllability.**
First, we need to ensure the system is controllable.
The system order is $n=2$.
The controllability matrix is $\mathcal{C} = \begin{bmatrix} B & AB \end{bmatrix}$.

$$
AB = \begin{bmatrix} 0 & 1 \\ 2 & -1 \end{bmatrix} \begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 1 \\ -1 \end{bmatrix}
$$
*Here, we calculate the product $AB$ as required for the controllability matrix.*

Now form $\mathcal{C}$:
$$
\mathcal{C} = \begin{bmatrix} 0 & 1 \\ 1 & -1 \end{bmatrix}
$$
*We assemble the columns $B$ and $AB$ into the controllability matrix.*

Calculate the determinant of $\mathcal{C}$:
$$
\det(\mathcal{C}) = (0)(-1) - (1)(1) = 0 - 1 = -1
$$
*The determinant is non-zero, so the system is controllable. We can proceed with pole placement.*

**Step 2: Determine the Desired Characteristic Polynomial.**
The desired poles are $s_1 = -2$ and $s_2 = -3$.
The desired characteristic polynomial $p_d(s)$ is:
$$
p_d(s) = (s - (-2))(s - (-3)) \\
p_d(s) = (s+2)(s+3) \\
p_d(s) = s^2 + 3s + 2s + 6 \\
p_d(s) = s^2 + 5s + 6
$$
*We construct the polynomial from the desired roots. This polynomial represents the "ideal" behavior we want.*
From this, we identify the coefficients: $\alpha_1 = 5$ and $\alpha_0 = 6$.

**Step 3: Calculate $p_d(A)$.**
Substitute the matrix $A$ into the desired characteristic polynomial. Remember to replace the constant term with $I$ (identity matrix).
$$
p_d(A) = A^2 + 5A + 6I
$$
*This is crucial: we evaluate the polynomial at the matrix $A$, not the scalar $s$.*

First, calculate $A^2$:
$$
A^2 = A \cdot A = \begin{bmatrix} 0 & 1 \\ 2 & -1 \end{bmatrix} \begin{bmatrix} 0 & 1 \\ 2 & -1 \end{bmatrix} = \begin{bmatrix} (0)(0)+(1)(2) & (0)(1)+(1)(-1) \\ (2)(0)+(-1)(2) & (2)(1)+(-1)(-1) \end{bmatrix} = \begin{bmatrix} 2 & -1 \\ -2 & 3 \end{bmatrix}
$$
*Perform matrix multiplication carefully.*

Now, substitute $A^2$, $A$, and $I$ into $p_d(A)$:
$$
p_d(A) = \begin{bmatrix} 2 & -1 \\ -2 & 3 \end{bmatrix} + 5 \begin{bmatrix} 0 & 1 \\ 2 & -1 \end{bmatrix} + 6 \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} \\
p_d(A) = \begin{bmatrix} 2 & -1 \\ -2 & 3 \end{bmatrix} + \begin{bmatrix} 0 & 5 \\ 10 & -5 \end{bmatrix} + \begin{bmatrix} 6 & 0 \\ 0 & 6 \end{bmatrix} \\
p_d(A) = \begin{bmatrix} 2+0+6 & -1+5+0 \\ -2+10+0 & 3-5+6 \end{bmatrix} = \begin{bmatrix} 8 & 4 \\ 8 & 4 \end{bmatrix}
$$
*Perform scalar multiplication and matrix addition.*

**Step 4: Calculate $\mathcal{C}^{-1}$.**
We found $\mathcal{C} = \begin{bmatrix} 0 & 1 \\ 1 & -1 \end{bmatrix}$.
For a $2 \times 2$ matrix $\begin{bmatrix} a & b \\ c & d \end{bmatrix}$, its inverse is $\frac{1}{ad-bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$.
$$
\mathcal{C}^{-1} = \frac{1}{-1} \begin{bmatrix} -1 & -1 \\ -1 & 0 \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}
$$
*Calculate the inverse of the controllability matrix.*

**Step 5: Apply Ackermann's Formula.**
The formula is $K = \begin{bmatrix} 0 & \dots & 0 & 1 \end{bmatrix} \mathcal{C}^{-1} p_d(A)$.
For a $2 \times 2$ system, the first part is $\begin{bmatrix} 0 & 1 \end{bmatrix}$.

$$
K = \begin{bmatrix} 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix} \begin{bmatrix} 8 & 4 \\ 8 & 4 \end{bmatrix}
$$
*We are now multiplying the three matrices in sequence. Order matters!*

First, multiply $\begin{bmatrix} 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}$:
$$
\begin{bmatrix} (0)(1)+(1)(1) & (0)(1)+(1)(0) \end{bmatrix} = \begin{bmatrix} 1 & 0 \end{bmatrix}
$$

Now, multiply the result by $p_d(A)$:
$$
K = \begin{bmatrix} 1 & 0 \end{bmatrix} \begin{bmatrix} 8 & 4 \\ 8 & 4 \end{bmatrix} \\
K = \begin{bmatrix} (1)(8)+(0)(8) & (1)(4)+(0)(4) \end{bmatrix} \\
K = \begin{bmatrix} 8 & 4 \end{bmatrix}
$$
*The final result is the feedback gain matrix $K$.*

**Final Answer:**
$$
\boxed{K = \begin{bmatrix} 8 & 4 \end{bmatrix}}
$$

**Reflection:** This example was straightforward because the system was 2x2 and the desired poles were real and distinct. The steps involved direct matrix calculations and polynomial evaluation. The trickiest part is usually the careful matrix arithmetic.

---

### Example 2: Medium 2x2 System with Complex Conjugate Poles

**Problem:** Given the system:
$$
A = \begin{bmatrix} 1 & 0 \\ 1 & 2 \end{bmatrix}, \quad B = \begin{bmatrix} 1 \\ 0 \end{bmatrix}
$$
Find the state feedback gain $K$ to place the closed-loop poles at $s_1 = -1 + j$ and $s_2 = -1 - j$.

**Given:** System matrices $A$ and $B$, desired poles $s_1 = -1 + j, s_2 = -1 - j$.
**Want:** Feedback gain matrix $K = \begin{bmatrix} k_1 & k_2 \end{bmatrix}$.

**Step 1: Check Controllability.**
System order $n=2$.
Controllability matrix $\mathcal{C} = \begin{bmatrix} B & AB \end{bmatrix}$.

$$
AB = \begin{bmatrix} 1 & 0 \\ 1 & 2 \end{bmatrix} \begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix} (1)(1)+(0)(0) \\ (1)(1)+(2)(0) \end{bmatrix} = \begin{bmatrix} 1 \\ 1 \end{bmatrix}
$$
*Calculate $AB$ for the controllability matrix.*

Form $\mathcal{C}$:
$$
\mathcal{C} = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}
$$
*Assemble the columns $B$ and $AB$.*

Calculate $\det(\mathcal{C})$:
$$
\det(\mathcal{C}) = (1)(1) - (1)(0) = 1 - 0 = 1
$$
*Determinant is non-zero, so the system is controllable.*

**Step 2: Determine the Desired Characteristic Polynomial.**
Desired poles are $s_1 = -1 + j$ and $s_2 = -1 - j$.
$$
p_d(s) = (s - (-1+j))(s - (-1-j)) \\
p_d(s) = ((s+1) - j)((s+1) + j)
$$
*Group terms to simplify the multiplication of complex conjugates.*
This is in the form $(X-Y)(X+Y) = X^2 - Y^2$, where $X = (s+1)$ and $Y = j$.
$$
p_d(s) = (s+1)^2 - j^2 \\
p_d(s) = (s^2 + 2s + 1) - (-1) \\
p_d(s) = s^2 + 2s + 2
$$
*Complex conjugate poles always result in a real characteristic polynomial, which is essential for a real feedback gain $K$.*
From this, we have $\alpha_1 = 2$ and $\alpha_0 = 2$.

**Step 3: Calculate $p_d(A)$.**
$$
p_d(A) = A^2 + 2A + 2I
$$
*Substitute $A$ into the desired characteristic polynomial.*

First, calculate $A^2$:
$$
A^2 = A \cdot A = \begin{bmatrix} 1 & 0 \\ 1 & 2 \end{bmatrix} \begin{bmatrix} 1 & 0 \\ 1 & 2 \end{bmatrix} = \begin{bmatrix} (1)(1)+(0)(1) & (1)(0)+(0)(2) \\ (1)(1)+(2)(1) & (1)(0)+(2)(2) \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 3 & 4 \end{bmatrix}
$$
*Perform matrix multiplication for $A^2$.*

Now, substitute $A^2$, $A$, and $I$ into $p_d(A)$:
$$
p_d(A) = \begin{bmatrix} 1 & 0 \\ 3 & 4 \end{bmatrix} + 2 \begin{bmatrix} 1 & 0 \\ 1 & 2 \end{bmatrix} + 2 \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} \\
p_d(A) = \begin{bmatrix} 1 & 0 \\ 3 & 4 \end{bmatrix} + \begin{bmatrix} 2 & 0 \\ 2 & 4 \end{bmatrix} + \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix} \\
p_d(A) = \begin{bmatrix} 1+2+2 & 0+0+0 \\ 3+2+0 & 4+4+2 \end{bmatrix} = \begin{bmatrix} 5 & 0 \\ 5 & 10 \end{bmatrix}
$$
*Perform scalar multiplication and matrix addition.*

**Step 4: Calculate $\mathcal{C}^{-1}$.**
We found $\mathcal{C} = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}$.
$$
\mathcal{C}^{-1} = \frac{1}{1} \begin{bmatrix} 1 & -1 \\ -0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & -1 \\ 0 & 1 \end{bmatrix}
$$
*Calculate the inverse of the controllability matrix.*

**Step 5: Apply Ackermann's Formula.**
For a $2 \times 2$ system, $K = \begin{bmatrix} 0 & 1 \end{bmatrix} \mathcal{C}^{-1} p_d(A)$.

$$
K = \begin{bmatrix} 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & -1 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 5 & 0 \\ 5 & 10 \end{bmatrix}
$$
*Multiply the three matrices.*

First, multiply $\begin{bmatrix} 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & -1 \\ 0 & 1 \end{bmatrix}$:
$$
\begin{bmatrix} (0)(1)+(1)(0) & (0)(-1)+(1)(1) \end{bmatrix} = \begin{bmatrix} 0 & 1 \end{bmatrix}
$$

Now, multiply the result by $p_d(A)$:
$$
K = \begin{bmatrix} 0 & 1 \end{bmatrix} \begin{bmatrix} 5 & 0 \\ 5 & 10 \end{bmatrix} \\
K = \begin{bmatrix} (0)(5)+(1)(5) & (0)(0)+(1)(10) \end{bmatrix} \\
K = \begin{bmatrix} 5 & 10 \end{bmatrix}
$$
*The final feedback gain matrix $K$.*

**Final Answer:**
$$
\boxed{K = \begin{bmatrix} 5 & 10 \end{bmatrix}}
$$

**Reflection:** This example introduced complex conjugate poles. The key takeaway is that when desired poles are complex, they *must* come in conjugate pairs to ensure the resulting characteristic polynomial (and thus the feedback gain $K$) is purely real. The algebraic steps are similar, but careful expansion of the desired polynomial is needed.

---

### Example 3: Harder 3x3 System with Real and Complex Poles

**Problem:** Consider a 3rd-order system:
$$
A = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & -2 & -3 \end{bmatrix}, \quad B = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}
$$
Place the closed-loop poles at $s_1 = -1$, $s_2 = -1+j$, $s_3 = -1-j$.

**Given:** System matrices $A$ and $B$, desired poles $s_1 = -1, s_2 = -1+j, s_3 = -1-j$.
**Want:** Feedback gain matrix $K = \begin{bmatrix} k_1 & k_2 & k_3 \end{bmatrix}$.

**Step 1: Check Controllability.**
System order $n=3$.
Controllability matrix $\mathcal{C} = \begin{bmatrix} B & AB & A^2B \end{bmatrix}$.

$$
AB = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & -2 & -3 \end{bmatrix} \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 0 \\ 1 \\ -3 \end{bmatrix}
$$
*Calculate $AB$.*

$$
A^2B = A(AB) = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & -2 & -3 \end{bmatrix} \begin{bmatrix} 0 \\ 1 \\ -3 \end{bmatrix} = \begin{bmatrix} (0)(0)+(1)(1)+(0)(-3) \\ (0)(0)+(0)(1)+(1)(-3) \\ (0)(0)+(-2)(1)+(-3)(-3) \end{bmatrix} = \begin{bmatrix} 1 \\ -3 \\ 7 \end{bmatrix}
$$
*Calculate $A^2B$. This requires multiplying $A$ by the result of $AB$.*

Form $\mathcal{C}$:
$$
\mathcal{C} = \begin{bmatrix} 0 & 0 & 1 \\ 0 & 1 & -3 \\ 1 & -3 & 7 \end{bmatrix}
$$
*Assemble the columns $B$, $AB$, and $A^2B$.*

Calculate $\det(\mathcal{C})$:
Using cofactor expansion along the first row:
$$
\det(\mathcal{C}) = 0 \cdot \det \begin{bmatrix} 1 & -3 \\ -3 & 7 \end{bmatrix} - 0 \cdot \det \begin{bmatrix} 0 & -3 \\ 1 & 7 \end{bmatrix} + 1 \cdot \det \begin{bmatrix} 0 & 1 \\ 1 & -3 \end{bmatrix} \\
\det(\mathcal{C}) = 0 - 0 + 1 \cdot ((0)(-3) - (1)(1)) \\
\det(\mathcal{C}) = 1 \cdot (-1) = -1
$$
*Determinant is non-zero, so the system is controllable.*

**Step 2: Determine the Desired Characteristic Polynomial.**
Desired poles are $s_1 = -1$, $s_2 = -1+j$, $s_3 = -1-j$.
$$
p_d(s) = (s - (-1))(s - (-1+j))(s - (-1-j)) \\
p_d(s) = (s+1) \cdot ((s+1)^2 - j^2) \\
p_d(s) = (s+1) \cdot (s^2 + 2s + 1 - (-1)) \\
p_d(s) = (s+1)(s^2 + 2s + 2) \\
p_d(s) = s(s^2 + 2s + 2) + 1(s^2 + 2s + 2) \\
p_d(s) = s^3 + 2s^2 + 2s + s^2 + 2s + 2 \\
p_d(s) = s^3 + 3s^2 + 4s + 2
$$
*Construct the polynomial. Again, complex poles combine to a real quadratic term. Then multiply by the real pole factor.*
From this, we have $\alpha_2 = 3$, $\alpha_1 = 4$, $\alpha_0 = 2$.

**Step 3: Calculate $p_d(A)$.**
$$
p_d(A) = A^3 + 3A^2 + 4A + 2I
$$
*Substitute $A$ into the desired characteristic polynomial.*

We already have $A$ and $A^2B$. Let's compute $A^2$ and $A^3$:
$$
A^2 = A \cdot A = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & -2 & -3 \end{bmatrix} \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & -2 & -3 \end{bmatrix} = \begin{bmatrix} 0 & 0 & 1 \\ 0 & -2 & -3 \\ 0 & 6 & 7 \end{bmatrix}
$$
*Calculate $A^2$.*

$$
A^3 = A \cdot A^2 = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & -2 & -3 \end{bmatrix} \begin{bmatrix} 0 & 0 & 1 \\ 0 & -2 & -3 \\ 0 & 6 & 7 \end{bmatrix} = \begin{bmatrix} 0 & -2 & -3 \\ 0 & 6 & 7 \\ 0 & -14 & -15 \end{bmatrix}
$$
*Calculate $A^3$.*

Now, substitute $A^3, A^2, A, I$ into $p_d(A)$:
$$
p_d(A) = \begin{bmatrix} 0 & -2 & -3 \\ 0 & 6 & 7 \\ 0 & -14 & -15 \end{bmatrix} + 3 \begin{bmatrix} 0 & 0 & 1 \\ 0 & -2 & -3 \\ 0 & 6 & 7 \end{bmatrix} + 4 \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & -2 & -3 \end{bmatrix} + 2 \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} \\
p_d(A) = \begin{bmatrix} 0 & -2 & -3 \\ 0 & 6 & 7 \\ 0 & -14 & -15 \end{bmatrix} + \begin{bmatrix} 0 & 0 & 3 \\ 0 & -6 & -9 \\ 0 & 18 & 21 \end{bmatrix} + \begin{bmatrix} 0 & 4 & 0 \\ 0 & 0 & 4 \\ 0 & -8 & -12 \end{bmatrix} + \begin{bmatrix} 2 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 2 \end{bmatrix} \\
p_d(A) = \begin{bmatrix} 0+0+0+2 & -2+0+4+0 & -3+3+0+0 \\ 0+0+0+0 & 6-6+0+2 & 7-9+4+0 \\ 0+0+0+0 & -14+18-8+0 & -15+21-12+2 \end{bmatrix} = \begin{bmatrix} 2 & 2 & 0 \\ 0 & 2 & 2 \\ 0 & -4 & -4 \end{bmatrix}
$$
*Perform all scalar multiplications and matrix additions carefully. This is the most error-prone step for larger systems.*

**Step 4: Calculate $\mathcal{C}^{-1}$.**
We found $\mathcal{C} = \begin{bmatrix} 0 & 0 & 1 \\ 0 & 1 & -3 \\ 1 & -3 & 7 \end{bmatrix}$.
To find the inverse of a $3 \times 3$ matrix, we can use the adjugate matrix method: $\mathcal{C}^{-1} = \frac{1}{\det(\mathcal{C})} \text{adj}(\mathcal{C})$.
We know $\det(\mathcal{C}) = -1$.

Cofactor matrix $M$:
$M_{11} = \det \begin{bmatrix} 1 & -3 \\ -3 & 7 \end{bmatrix} = 7-9 = -2$
$M_{12} = \det \begin{bmatrix} 0 & -3 \\ 1 & 7 \end{bmatrix} = 0-(-3) = 3$
$M_{13} = \det \begin{bmatrix} 0 & 1 \\ 1 & -3 \end{bmatrix} = 0-1 = -1$
$M_{21} = \det \begin{bmatrix} 0 & 1 \\ -3 & 7 \end{bmatrix} = 0-(-3) = 3$
$M_{22} = \det \begin{bmatrix} 0 & 1 \\ 1 & 7 \end{bmatrix} = 0-1 = -1$
$M_{23} = \det \begin{bmatrix} 0 & 0 \\ 1 & -3 \end{bmatrix} = 0-0 = 0$
$M_{31} = \det \begin{bmatrix} 0 & 1 \\ 1 & -3 \end{bmatrix} = 0-1 = -1$
$M_{32} = \det \begin{bmatrix} 0 & 1 \\ 0 & -3 \end{bmatrix} = 0-0 = 0$
$M_{33} = \det \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix} = 0-0 = 0$

Cofactor matrix $Cof(\mathcal{C})$ (applying signs $(-1)^{i+j}$):
$$
Cof(\mathcal{C}) = \begin{bmatrix} -2 & -3 & -1 \\ -3 & -1 & 0 \\ -1 & 0 & 0 \end{bmatrix}
$$
Adjugate matrix $\text{adj}(\mathcal{C}) = (Cof(\mathcal{C}))^T$:
$$
\text{adj}(\mathcal{C}) = \begin{bmatrix} -2 & -3 & -1 \\ -3 & -1 & 0 \\ -1 & 0 & 0 \end{bmatrix}
$$
Finally, $\mathcal{C}^{-1} = \frac{1}{-1} \text{adj}(\mathcal{C})$:
$$
\mathcal{C}^{-1} = \begin{bmatrix} 2 & 3 & 1 \\ 3 & 1 & 0 \\ 1 & 0 & 0 \end{bmatrix}
$$
*Calculating the inverse of a 3x3 matrix is significantly more involved. Care with signs and arithmetic is paramount.*

**Step 5: Apply Ackermann's Formula.**
For a $3 \times 3$ system, $K = \begin{bmatrix} 0 & 0 & 1 \end{bmatrix} \mathcal{C}^{-1} p_d(A)$.

$$
K = \begin{bmatrix} 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 2 & 3 & 1 \\ 3 & 1 & 0 \\ 1 & 0 & 0 \end{bmatrix} \begin{bmatrix} 2 & 2 & 0 \\ 0 & 2 & 2 \\ 0 & -4 & -4 \end{bmatrix}
$$
*Multiply the three matrices.*

First, multiply $\begin{bmatrix} 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 2 & 3 & 1 \\ 3 & 1 & 0 \\ 1 & 0 & 0 \end{bmatrix}$:
$$
\begin{bmatrix} (0)(2)+(0)(3)+(1)(1) & (0)(3)+(0)(1)+(1)(0) & (0)(1)+(0)(0)+(1)(0) \end{bmatrix} = \begin{bmatrix} 1 & 0 & 0 \end{bmatrix}
$$

Now, multiply the result by $p_d(A)$:
$$
K = \begin{bmatrix} 1 & 0 & 0 \end{bmatrix} \begin{bmatrix} 2 & 2 & 0 \\ 0 & 2 & 2 \\ 0 & -4 & -4 \end{bmatrix} \\
K = \begin{bmatrix} (1)(2)+(0)(0)+(0)(0) & (1)(2)+(0)(2)+(0)(-4) & (1)(0)+(0)(2)+(0)(-4) \end{bmatrix} \\
K = \begin{bmatrix} 2 & 2 & 0 \end{bmatrix}
$$
*The final feedback gain matrix $K$.*

**Final Answer:**
$$
\boxed{K = \begin{bmatrix} 2 & 2 & 0 \end{bmatrix}}
$$

**Reflection:** This example highlights the increasing complexity of calculations for higher-order systems. $A^2$, $A^3$, and $\mathcal{C}^{-1}$ become much more tedious to compute by hand. This is where computational tools (like MATLAB or Python with NumPy) become indispensable in practice. However, understanding the manual steps is crucial for debugging and conceptual understanding.

---

### Example 4: Application-Oriented - Simple Rocket Pitch Control

**Problem:** A simplified model for rocket pitch dynamics (angle $\theta$ and angular velocity $\dot{\theta}$) can be given by:
$$
\begin{bmatrix} \dot{\theta} \\ \ddot{\theta} \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} \theta \\ \dot{\theta} \end{bmatrix} + \begin{bmatrix} 0 \\ 1 \end{bmatrix} u
$$
where $u$ is the thrust vectoring command. We want to design a controller that makes the rocket quickly return to zero pitch and zero angular velocity without oscillation. Specifically, place the closed-loop poles at $s_1 = -5$ and $s_2 = -6$.

**Given:** System matrices $A = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}, B = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$, desired poles $s_1 = -5, s_2 = -6$.
**Want:** Feedback gain matrix $K = \begin{bmatrix} k_1 & k_2 \end{bmatrix}$.

**Step 1: Check Controllability.**
System order $n=2$.
Controllability matrix $\mathcal{C} = \begin{bmatrix} B & AB \end{bmatrix}$.

$$
AB = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 1 \\ 0 \end{bmatrix}
$$
*Calculate $AB$.*

Form $\mathcal{C}$:
$$
\mathcal{C} = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}
$$
*Assemble the columns $B$ and $AB$.*

Calculate $\det(\mathcal{C})$:
$$
\det(\mathcal{C}) = (0)(0) - (1)(1) = -1
$$
*Determinant is non-zero, so the system is controllable.*

**Step 2: Determine the Desired Characteristic Polynomial.**
Desired poles are $s_1 = -5$ and $s_2 = -6$.
$$
p_d(s) = (s - (-5))(s - (-6)) \\
p_d(s) = (s+5)(s+6) \\
p_d(s) = s^2 + 6s + 5s + 30 \\
p_d(s) = s^2 + 11s + 30
$$
*Construct the polynomial from the desired roots. These roots, being real and negative, indicate a stable, non-oscillatory, and fast response.*
From this, we have $\alpha_1 = 11$ and $\alpha_0 = 30$.

**Step 3: Calculate $p_d(A)$.**
$$
p_d(A) = A^2 + 11A + 30I
$$
*Substitute $A$ into the desired characteristic polynomial.*

First, calculate $A^2$:
$$
A^2 = A \cdot A = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}
$$
*For this specific system, $A^2$ is the zero matrix.*

Now, substitute $A^2$, $A$, and $I$ into $p_d(A)$:
$$
p_d(A) = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix} + 11 \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} + 30 \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} \\
p_d(A) = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix} + \begin{bmatrix} 0 & 11 \\ 0 & 0 \end{bmatrix} + \begin{bmatrix} 30 & 0 \\ 0 & 30 \end{bmatrix} \\
p_d(A) = \begin{bmatrix} 0+0+30 & 0+11+0 \\ 0+0+0 & 0+0+30 \end{bmatrix} = \begin{bmatrix} 30 & 11 \\ 0 & 30 \end{bmatrix}
$$
*Perform scalar multiplication and matrix addition.*

**Step 4: Calculate $\mathcal{C}^{-1}$.**
We found $\mathcal{C} = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$.
$$
\mathcal{C}^{-1} = \frac{1}{-1} \begin{bmatrix} 0 & -1 \\ -1 & 0 \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}
$$
*Calculate the inverse of the controllability matrix. Interestingly, for this specific matrix, $\mathcal{C}^{-1} = \mathcal{C}$.*

**Step 5: Apply Ackermann's Formula.**
For a $2 \times 2$ system, $K = \begin{bmatrix} 0 & 1 \end{bmatrix} \mathcal{C}^{-1} p_d(A)$.

$$
K = \begin{bmatrix} 0 & 1 \end{bmatrix} \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} \begin{bmatrix} 30 & 11 \\ 0 & 30 \end{bmatrix}
$$
*Multiply the three matrices.*

First, multiply $\begin{bmatrix} 0 & 1 \end{bmatrix} \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$:
$$
\begin{bmatrix} (0)(0)+(1)(1) & (0)(1)+(1)(0) \end{bmatrix} = \begin{bmatrix} 1 & 0 \end{bmatrix}
$$

Now, multiply the result by $p_d(A)$:
$$
K = \begin{bmatrix} 1 & 0 \end{bmatrix} \begin{bmatrix} 30 & 11 \\ 0 & 30 \end{bmatrix} \\
K = \begin{bmatrix} (1)(30)+(0)(0) & (1)(11)+(0)(30) \end{bmatrix} \\
K = \begin{bmatrix} 30 & 11 \end{bmatrix}
$$
*The final feedback gain matrix $K$.*

**Final Answer:**
$$
\boxed{K = \begin{bmatrix} 30 & 11 \end{bmatrix}}
$$

**Reflection:** This example demonstrates how Ackermann's formula is applied to a real (though simplified) physical system. The choice of desired poles reflects a common control objective: stable, fast, and non-oscillatory response. The structure of matrix $A$ (a double integrator) simplified $A^2$ to the zero matrix, which is a common occurrence in mechanical systems. This specific $K$ means the control input $u$ will be $u = -30\theta - 11\dot{\theta}$, a proportional-derivative (PD) like controller that uses both pitch angle and pitch rate to stabilize the rocket.

## 6. Common mistakes and traps

1.  **Forgetting to check Controllability:** Ackermann's formula (and pole placement in general) is only applicable if the system is controllable. If $\det(\mathcal{C}) = 0$, the formula will break (you can't invert $\mathcal{C}$), and it means you cannot arbitrarily place the poles with the given input. Always check this first.
2.  **Algebraic Errors in $p_d(A)$:** Calculating $A^2, A^3, \dots$ and then summing them with scalar multiples and $I$ is prone to arithmetic mistakes, especially for larger systems. Double-check every matrix multiplication and addition.
3.  **Incorrectly Forming the Controllability Matrix $\mathcal{C}$:** Ensure the columns are in the correct order: $B, AB, A^2B, \dots, A^{n-1}B$. A single misplaced column will lead to a wrong inverse and thus a wrong $K$.
4.  **Miscalculating $\mathcal{C}^{-1}$:** Matrix inversion, particularly for $3 \times 3$ or higher, is tedious and error-prone. Be meticulous with determinants and cofactors.
5.  **Desired Poles Not in Conjugate Pairs:** If you choose complex desired poles, they *must* appear in complex conjugate pairs (e.g., $-1+j$ and $-1-j$). If not, your desired characteristic polynomial $p_d(s)$ will have complex coefficients, leading to a complex feedback gain $K$, which is physically impossible for real-world systems.
6.  **Confusing $p_d(s)$ with $p_d(A)$:** Remember that $p_d(s)$ is a polynomial in the scalar variable $s$, while $p_d(A)$ is the matrix polynomial where $s$ is replaced by the matrix $A$, and any constant terms are replaced by the constant times the identity matrix $I$.

## 7. Textbook-precise explanation

The problem of pole placement in linear, time-invariant (LTI) systems is to design a state feedback control law that assigns the eigenvalues (poles) of the closed-loop system to a set of desired locations in the complex plane. This technique is fundamental for shaping the transient response and stability characteristics of a system.

Consider a single-input LTI system described by the state-space equations:
$$
\dot{\mathbf{x}}(t) = A\mathbf{x}(t) + B u(t)
$$
where $\mathbf{x}(t) \in \mathbb{R}^n$ is the state vector, $u(t) \in \mathbb{R}$ is the scalar control input, $A \in \mathbb{R}^{n \times n}$ is the system matrix, and $B \in \mathbb{R}^{n \times 1}$ is the input matrix.

The state feedback control law is given by:
$$
u(t) = -K\mathbf{x}(t)
$$
where $K \in \mathbb{R}^{1 \times n}$ is the state feedback gain vector. Substituting this into the state equation yields the closed-loop system:
$$
\dot{\mathbf{x}}(t) = (A - BK)\mathbf{x}(t)
$$
The eigenvalues of the closed-loop system matrix $(A-BK)$ are the closed-loop poles. Our objective is to choose $K$ such that these eigenvalues match a pre-specified set of desired poles $\{\lambda_1, \lambda_2, \dots, \lambda_n\}$. These desired poles define the desired characteristic polynomial:
$$
p_d(s) = (s - \lambda_1)(s - \lambda_2)\dots(s - \lambda_n) = s^n + \alpha_{n-1}s^{n-1} + \dots + \alpha_1 s + \alpha_0
$$
For the desired poles to be achievable using real feedback gains, they must either be real or appear in complex conjugate pairs.

A necessary and sufficient condition for arbitrary pole placement for a single-input system is that the system $(A, B)$ must be **controllable**. The controllability matrix $\mathcal{C}$ is defined as:
$$
\mathcal{C} = \begin{bmatrix} B & AB & A^2B & \dots & A^{n-1}B \end{bmatrix}
$$
The system is controllable if and only if $\text{rank}(\mathcal{C}) = n$, which for a square matrix $\mathcal{C}$ means $\det(\mathcal{C}) \neq 0$.

If the system $(A, B)$ is controllable, then Ackermann's formula provides a direct method to compute the state feedback gain vector $K$:
$$
K = \begin{bmatrix} 0 & 0 & \dots & 0 & 1 \end{bmatrix} \mathcal{C}^{-1} p_d(A)
$$
where $\begin{bmatrix} 0 & 0 & \dots & 0 & 1 \end{bmatrix}$ is a row vector of length $n$, and $p_d(A)$ is the desired characteristic polynomial evaluated at the matrix $A$:
$$
p_d(A) = A^n + \alpha_{n-1}A^{n-1} + \dots + \alpha_1 A + \alpha_0 I
$$
This formula is derived from the Cayley-Hamilton theorem, which states that every square matrix satisfies its own characteristic polynomial. Specifically, for the closed-loop system, $p_{cl}(A-BK) = 0$. By carefully constructing a similarity transformation to the controllable canonical form, the relationship between $K$ and $p_d(A)$ can be explicitly derived.

**References:**
*   Ogata, K. (2010). *Modern Control Engineering* (5th ed.). Prentice Hall. (Chapter 10: Design of Control Systems in State Space)
*   Dorf, R. C., & Bishop, R. H. (2017). *Modern Control Systems* (13th ed.). Pearson. (Chapter 7: State Variable Models)
*   Franklin, G. F., Powell, J. D., & Emami-Naeini, A. (2014). *Feedback Control of Dynamic Systems* (7th ed.). Pearson. (Chapter 7: State-Space Design)

## 8. ASCII diagrams

Here's a block diagram illustrating the state feedback control system, which is the setup for pole placement using Ackermann's formula:

```text
                                  +-------------------+
                                  |                   |
                                  |     Controller    |
                                  |                   |
                                  +---------+---------+
                                            |
                                            | (u) Control Input
                                            v
     +------+   +-------+   +-----+     +-----+     +-----+
R ---| +    |---| K_r   |---| +   |---> |  B  |---> |     |
     |      |   +-------+   |     |     +-----+     |     |
     | Sum  |               | Sum |                   |     |
     |      |               |     |                   | A   |---> x_dot
     | -    |<--------------| -   |<------------------|     |
     +------+               +-----+                   |     |
            ^                                         |     |
            | (x_ref - x) Error                       +-----+
            |                                           ^
            |                                           | (x) State Vector
            |                                           |
            +-------------------------------------------+
                                |
                                |
                                +-------------------+
                                |                   |
                                |    Measurements   |
                                |    (Sensors)      |
                                |                   |
                                +-------------------+
                                            |
                                            v
                                            (x) State Vector
                                            |
                                            | (Feedback Gain K)
                                            |
                                            +---------+
                                            |   -K    |
                                            +---------+
```

**Description of the Diagram:**

*   **R (Reference Input):** The desired state or setpoint for the system (e.g., target pitch angle for a rocket).
*   **Summing Junctions:** The circles with '+' and '-' signs represent summing junctions.
    *   The first one calculates the error between the reference and the actual state.
    *   The second one combines the reference input (scaled by $K_r$, if used for tracking) and the feedback signal from the state vector.
*   **K_r (Reference Gain):** An optional feedforward gain used for tracking non-zero reference inputs, ensuring the output tracks the reference without steady-state error. For pure pole placement (regulating to zero), this is often omitted or implicitly handled.
*   **-K (Feedback Gain Matrix):** This is the gain matrix calculated by Ackermann's formula. It multiplies the state vector $\mathbf{x}$ to produce the feedback control signal. The negative sign is standard for negative feedback.
*   **u (Control Input):** The final control signal applied to the plant (e.g., thrust vectoring command).
*   **Plant (A, B):** Represents the dynamic system we are trying to control, described by its state-space matrices $A