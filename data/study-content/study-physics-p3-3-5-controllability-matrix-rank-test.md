## 1. What it is — in plain English

Imagine you have a remote-controlled toy car. "Controllability" is simply the question: can you steer that car from *any* starting spot to *any* other desired spot, and make it move at *any* desired speed, just by using your remote control? If you can, the car is "controllable." If there are some spots or speeds you can never reach, no matter how much you try, then it's not controllable.

Now, instead of a toy car, imagine a rocket. A rocket has engines that push it (your "remote control inputs") and it moves through space (its "state" – position and velocity). Controllability, in this context, asks if we can use the rocket's engines to guide it from its current position and velocity to *any* other desired position and velocity in space.

The "controllability matrix" is like a special checklist or a test that engineers use to quickly answer this question. Instead of actually trying every possible maneuver with the rocket (which would be impossible and very expensive!), we can do some math with the rocket's design equations. The "rank test" is the final step in this checklist: if the result of our math (the "rank" of the matrix) passes a certain threshold, then congratulations, your rocket is theoretically controllable! If it fails, then your rocket design, as it stands, has fundamental limitations in where it can go or how it can move.

Think of it like checking if you have all the necessary tools to build a complex machine. The controllability matrix is a collection of all possible ways your control inputs (your "tools") can influence the system's movement. The rank test then checks if you have *enough* distinct tools to affect *all* aspects of the machine's behavior. If the rank is too low, it means some parts of the machine's behavior are immune to your tools, making it uncontrollable.

## 2. Why it matters — real-world applications

The concept of controllability is absolutely fundamental in engineering, especially in aerospace, and its implications extend far beyond. Without understanding and ensuring controllability, designing any dynamic system becomes a shot in the dark.

1.  **Rocket Launch and Trajectory Correction:** When SpaceX designs a Falcon 9 rocket, they must ensure its flight path and orientation (its "state") are fully controllable. This means the thrust vectoring system (the "inputs") must be able to adjust the rocket's trajectory to reach orbit, perform orbital maneuvers, and even land the first stage back on Earth. If the system were not controllable, the rocket might veer off course uncontrollably, or be unable to achieve its mission objectives. The controllability matrix rank test is performed early in the design phase to validate the control authority of the thrusters.

2.  **Aircraft Autopilot Systems:** Modern commercial aircraft, like those from Boeing or Airbus, rely heavily on autopilots for stable flight, navigation, and landing. The autopilot's ability to maintain altitude, speed, and heading, or execute complex maneuvers, depends on the aircraft being controllable. The control surfaces (ailerons, rudder, elevator) are the "inputs." If, for instance, the rudder was somehow isolated from the control system's influence, the aircraft might be uncontrollable in yaw, making it impossible to steer effectively. Controllability analysis ensures that the chosen control surfaces provide enough authority over all six degrees of freedom of the aircraft.

3.  **Satellite Attitude Control:** Satellites in orbit, such as those in the Starlink constellation or GPS satellites, need to maintain precise orientation (attitude) for communication, power generation (solar panels facing the sun), or scientific observation. Reaction wheels, thrusters, or magnetic torquers are used as control inputs. The controllability matrix rank test helps determine if these actuators can collectively orient the satellite to *any* desired attitude. If the system is not controllable, the satellite might get stuck in an undesirable orientation, rendering it useless.

4.  **Robotics and Autonomous Vehicles:** Tesla's self-driving cars or Boston Dynamics' Spot robot dog are complex dynamic systems. For these systems to perform tasks autonomously, their movements (position, velocity, joint angles) must be controllable. The motors and actuators are the "inputs." Controllability analysis ensures that the robot can reach any desired configuration or execute any trajectory within its operational space. If a robot arm, for example, had a joint that couldn't be independently actuated, it might be uncontrollable in certain dimensions, limiting its dexterity.

## 3. Prerequisites — what you must know first

To fully grasp the "controllability matrix — rank test," you should be comfortable with the following concepts. If any of these feel unfamiliar, pause and review them first.

*   **Linear Algebra Fundamentals:**
    *   **Vectors and Matrices:** Understanding what vectors and matrices are, how to perform basic operations like addition, subtraction, and multiplication of matrices.
    *   **Matrix Transpose:** How to swap rows and columns of a matrix.
    *   **Matrix Inverse:** The concept of an inverse matrix $A^{-1}$ such that $AA^{-1} = I$.
    *   **Linear Independence:** The idea that a set of vectors is linearly independent if no vector in the set can be written as a linear combination of the others. This is crucial for understanding rank.
    *   **Vector Space:** The set of all possible linear combinations of a set of vectors.
    *   **Span of Vectors:** The set of all possible vectors that can be reached by taking linear combinations of a given set of vectors.
    *   **Rank of a Matrix:** The maximum number of linearly independent column vectors (or row vectors) in a matrix. This is the central concept for the rank test.
    *   **Null Space (Kernel):** The set of all vectors that a matrix maps to the zero vector. Related to rank.
    *   **Eigenvalues and Eigenvectors:** Special vectors that are only scaled by a linear transformation. These are fundamental to understanding system dynamics.

*   **Differential Equations and System Dynamics:**
    *   **Ordinary Differential Equations (ODEs):** How to represent system behavior using equations involving derivatives.
    *   **State-Space Representation:** A standard mathematical model for dynamic systems, representing them as a set of first-order differential equations. This involves the "state vector" $\mathbf{x}$, the "input vector" $\mathbf{u}$, and the system matrices $A$ and $B$.
    *   **State Vector ($\mathbf{x}$):** A vector containing all the variables that completely describe the system's current condition (e.g., position, velocity, orientation, angular rates).
    *   **Input Vector ($\mathbf{u}$):** A vector containing all the external forces or commands that influence the system (e.g., engine thrust, control surface deflection).
    *   **System Matrix ($A$):** A matrix that describes the internal dynamics of the system – how the state changes without any external input.
    *   **Input Matrix ($B$):** A matrix that describes how the input vector $\mathbf{u}$ directly affects the rate of change of the state vector.

*   **Basic Control Theory:**
    *   **System:** A collection of interconnected components designed to achieve a specific objective.
    *   **Control Input:** The signals or actions applied to a system to influence its behavior.
    *   **Output:** The measured variables or desired results from a system.

## 4. The core idea — step by step

Let's break down the concept of the controllability matrix and its rank test into digestible steps, building from intuition to the formal mathematics.

### Step 1: Understanding "Controllability" in a System

*   **Plain English:** A system is "controllable" if you can steer it from *any* starting condition to *any* desired final condition within a finite amount of time, purely by manipulating its inputs. Think of driving a car: if you can get from any parking spot to any other parking spot, and achieve any speed in between, just by using the steering wheel and pedals, your car is controllable.
*   **Concrete Example:** Imagine a simple robotic arm with two joints. If you can move the end of the arm to any point in its workspace, and achieve any desired velocity at that point, by just controlling the motors at the two joints, then the arm is controllable. If, however, one of the motors is broken or designed such that it can only move the arm along a fixed line, then you wouldn't be able to reach all points, and the arm would not be fully controllable.
*   **Formal/Mathematical Version:** For a linear time-invariant (LTI) system described by the state-space equations:
    $$ \dot{\mathbf{x}}(t) = A\mathbf{x}(t) + B\mathbf{u}(t) $$
    $$ \mathbf{y}(t) = C\mathbf{x}(t) + D\mathbf{u}(t) $$
    where $\mathbf{x}(t) \in \mathbb{R}^n$ is the state vector, $\mathbf{u}(t) \in \mathbb{R}^m$ is the input vector, $A$ is the $n \times n$ system matrix, $B$ is the $n \times m$ input matrix, $C$ is the $p \times n$ output matrix, and $D$ is the $p \times m$ direct transmission matrix.
    The system is said to be **state controllable** if, for any initial state $\mathbf{x}(t_0)$ and any desired final state $\mathbf{x}(t_f)$, there exists an input $\mathbf{u}(t)$ defined on $[t_0, t_f]$ that drives the system from $\mathbf{x}(t_0)$ to $\mathbf{x}(t_f)$.
*   **What could go wrong:** Misinterpreting "controllable" as simply "able to move." A system might move, but not in all the ways you need it to, or not to all the places you want it to go. It must be able to reach *any* state.

### Step 2: The Role of the State-Space Representation

*   **Plain English:** The state-space representation is just a standardized way to write down the equations of motion for a system. It tells you how all the important variables (the "state") change over time, both on their own and when you apply an input. It's like a blueprint that shows all the moving parts and how they interact.
*   **Concrete Example:** For a mass-spring-damper system, the state might be position $x$ and velocity $\dot{x}$. The state-space equations would show how $\dot{x}$ and $\ddot{x}$ (rate of change of velocity) depend on $x$, $\dot{x}$, and any external force (input $u$).
    $$ \begin{bmatrix} \dot{x}_1 \\ \dot{x}_2 \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ -k/m & -c/m \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} + \begin{bmatrix} 0 \\ 1/m \end{bmatrix} u $$
    Here, $x_1 = x$ (position), $x_2 = \dot{x}$ (velocity), $A = \begin{bmatrix} 0 & 1 \\ -k/m & -c/m \end{bmatrix}$, and $B = \begin{bmatrix} 0 \\ 1/m \end{bmatrix}$.
*   **Formal/Mathematical Version:** As introduced in Step 1, the core is $\dot{\mathbf{x}}(t) = A\mathbf{x}(t) + B\mathbf{u}(t)$. The matrix $A$ dictates the natural evolution of the system, and matrix $B$ dictates how the control inputs $\mathbf{u}$ influence this evolution.
*   **What could go wrong:** Incorrectly deriving the $A$ and $B$ matrices from the physical equations of motion. A small error here will lead to a completely wrong controllability assessment.

### Step 3: How Inputs Influence States Over Time

*   **Plain English:** When you apply an input to a system, it doesn't just instantly change the state. The input's effect propagates through the system's internal dynamics over time. Think of pushing a heavy box: your push (input) directly changes its acceleration, which then changes its velocity, and then its position. These are all related over time. The $B$ matrix shows the *direct* influence, $AB$ shows the influence *after one step* of the system's internal dynamics, $A^2B$ after two steps, and so on.
*   **Concrete Example:** If you have a rocket engine (input $u$) that directly changes the acceleration (part of the state $\dot{x}_2$), then $B$ captures this. But acceleration affects velocity, and velocity affects position. The $A$ matrix describes how velocity affects position. So, the input's effect on position is mediated through $A$ and $B$.
    Consider the state transition equation for a linear system:
    $$ \mathbf{x}(t_f) = e^{A(t_f-t_0)}\mathbf{x}(t_0) + \int_{t_0}^{t_f} e^{A(t_f-\tau)} B\mathbf{u}(\tau) d\tau $$
    The integral term shows how the input $\mathbf{u}(\tau)$ at various times $\tau$ influences the final state $\mathbf{x}(t_f)$, with the effect being "filtered" by $e^{A(t_f-\tau)} B$.
    If we approximate this with a series expansion for $e^{A(t_f-\tau)}$, we get terms like $B$, $AB$, $A^2B$, etc., which represent how inputs affect the state directly, and then indirectly through the system's dynamics.
*   **Formal/Mathematical Version:** The key insight comes from the Cayley-Hamilton theorem and the state transition matrix. Any state $\mathbf{x}(t)$ can be reached if the input $\mathbf{u}(t)$ can effectively influence all dimensions of the state space. The vectors $B, AB, A^2B, \ldots, A^{n-1}B$ represent the directions in state space that the input can influence, either directly (through $B$) or indirectly through the system's internal dynamics (through $A$ multiplying $B$).
*   **What could go wrong:** Not understanding that the $A$ matrix "propagates" the influence of the $B$ matrix. It's not just about what $B$ can do *now*, but what $B$ can do *over time* as the system evolves.

### Step 4: Constructing the Controllability Matrix

*   **Plain English:** To check if our inputs can reach all parts of the state space, we collect all these influence vectors ($B, AB, A^2B$, etc.) into one big matrix. This "controllability matrix" is essentially a comprehensive list of all the ways our inputs can push or pull the system, directly and indirectly.
*   **Concrete Example:** If our system has $n=2$ states (e.g., position and velocity), we need to compute $B$ and $AB$. The controllability matrix would be $C = [B \ AB]$. If $n=3$, it would be $C = [B \ AB \ A^2B]$.
    Let $A = \begin{bmatrix} 0 & 1 \\ -1 & -2 \end{bmatrix}$ and $B = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$.
    First term: $B = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$.
    Second term: $AB = \begin{bmatrix} 0 & 1 \\ -1 & -2 \end{bmatrix} \begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 1 \\ -2 \end{bmatrix}$.
    The controllability matrix $C = [B \ AB] = \begin{bmatrix} 0 & 1 \\ 1 & -2 \end{bmatrix}$.
*   **Formal/Mathematical Version:** For a system with $n$ states and an input matrix $B$ (which can be $n \times m$, meaning $m$ inputs), the controllability matrix $\mathcal{C}$ (often denoted $P_c$ or $R$) is defined as:
    $$ \mathcal{C} = \begin{bmatrix} B & AB & A^2B & \cdots & A^{n-1}B \end{bmatrix} $$
    Each term $A^k B$ is an $n \times m$ matrix. So, $\mathcal{C}$ will be an $n \times (n \cdot m)$ matrix.
    The theorem that allows us to stop at $A^{n-1}B$ is a consequence of the Cayley-Hamilton theorem, which states that $A^n$ can be expressed as a linear combination of $I, A, \ldots, A^{n-1}$. This means any $A^k B$ for $k \ge n$ would be linearly dependent on the preceding terms.
*   **What could go wrong:** Calculating $A^k B$ incorrectly, especially for higher powers of $A$. Remember matrix multiplication is not commutative ($AB \ne BA$). Also, ensuring you calculate up to $A^{n-1}B$, not $A^n B$.

### Step 5: The Rank Test for Controllability

*   **Plain English:** Once we have our big controllability matrix, we perform the "rank test." The rank of a matrix tells us how many *independent* directions its column vectors point in. If this number (the rank) is equal to the number of states in our system ($n$), it means our inputs can independently influence all $n$ dimensions of the state space. If the rank is less than $n$, it means some dimensions are unreachable, and the system is not fully controllable.
*   **Concrete Example:** From Step 4, $C = \begin{bmatrix} 0 & 1 \\ 1 & -2 \end{bmatrix}$.
    For a $2 \times 2$ matrix, the rank is 2 if its determinant is non-zero.
    $\det(C) = (0)(-2) - (1)(1) = 0 - 1 = -1$.
    Since $\det(C) = -1 \ne 0$, the rank of $C$ is 2.
    Our system has $n=2$ states. Since $rank(C) = n = 2$, the system is controllable.
*   **Formal/Mathematical Version:** A linear time-invariant system $(A, B)$ is completely state controllable if and only if the rank of the controllability matrix $\mathcal{C}$ is equal to $n$, the number of states in the system.
    $$ \text{rank}(\mathcal{C}) = \text{rank} \begin{bmatrix} B & AB & A^2B & \cdots & A^{n-1}B \end{bmatrix} = n $$
    If $rank(\mathcal{C}) < n$, the system is not completely state controllable.
    To find the rank of a matrix:
    1.  For square matrices, if $\det(\mathcal{C}) \ne 0$, then $rank(\mathcal{C}) = n$.
    2.  For non-square matrices or if $\det(\mathcal{C}) = 0$, you can use Gaussian elimination to find the number of non-zero rows, or find the largest square submatrix with a non-zero determinant.
*   **What could go wrong:** Incorrectly calculating the rank. For larger matrices, simply checking the determinant is insufficient if the matrix is not square. Gaussian elimination or singular value decomposition (SVD) are more robust methods for rank determination.

### Step 6: Why the Rank Test Works (Intuition)

*   **Plain English:** Think of the columns of the controllability matrix as "influence vectors." Each column tells you a direction the system can be pushed in. If you have $n$ states, you need to be able to push the system in $n$ *independent* directions to reach *any* point in that $n$-dimensional space. If your influence vectors are all pointing in the same general directions (i.e., they are linearly dependent, and the rank is less than $n$), then you'll always be restricted to a smaller subspace, making some states unreachable.
*   **Concrete Example:** Imagine you want to move a ball on a 2D table (2 states: x, y position). If your control inputs can only push the ball horizontally (e.g., $B = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$ and $AB = \begin{bmatrix} 2 \\ 0 \end{bmatrix}$), then your controllability matrix $C = \begin{bmatrix} 1 & 2 \\ 0 & 0 \end{bmatrix}$ has a rank of 1. You can never move the ball vertically, so it's not controllable in 2D space. You need independent control over both x and y.
*   **Formal/Mathematical Version:** The column space of the controllability matrix $\mathcal{C}$ represents the set of all states that can be reached from the origin $\mathbf{x}(0) = \mathbf{0}$ by applying appropriate inputs $\mathbf{u}(t)$. If the rank of $\mathcal{C}$ is $n$, then its column vectors span the entire $n$-dimensional state space $\mathbb{R}^n$. This means any state in $\mathbb{R}^n$ can be expressed as a linear combination of these column vectors, and thus can be reached. If the rank is less than $n$, the column vectors only span a subspace of $\mathbb{R}^n$, meaning there are states outside this subspace that are unreachable.
*   **What could go wrong:** Forgetting the link between linear independence of vectors and the ability to span a space. The rank test is essentially checking if the "control directions" provided by $B, AB, \dots, A^{n-1}B$ are rich enough to cover the entire state space.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple 2x2 System (Controllable)

**Problem:** Determine if the following system is state controllable.
$$ \dot{\mathbf{x}}(t) = \begin{bmatrix} 0 & 1 \\ -2 & -3 \end{bmatrix} \mathbf{x}(t) + \begin{bmatrix} 0 \\ 1 \end{bmatrix} \mathbf{u}(t) $$

**Given:**
*   System matrix $A = \begin{bmatrix} 0 & 1 \\ -2 & -3 \end{bmatrix}$
*   Input matrix $B = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$
*   Number of states $n=2$ (since $A$ is $2 \times 2$)

**What we want:** To determine if the system is state controllable using the controllability matrix rank test.

**Step 1: Identify the number of states ($n$).**
The system matrix $A$ is a $2 \times 2$ matrix, so the number of states $n=2$.
*Explanation:* The dimension of the state vector $\mathbf{x}$ determines $n$. For a $2 \times 2$ $A$ matrix, $\mathbf{x}$ must be a $2 \times 1$ vector.

**Step 2: Construct the controllability matrix $\mathcal{C}$.**
For $n=2$, the controllability matrix is $\mathcal{C} = \begin{bmatrix} B & AB \end{bmatrix}$. We need to calculate $B$ and $AB$.
*Explanation:* The formula for the controllability matrix requires terms up to $A^{n-1}B$. Since $n=2$, we need $A^{2-1}B = AB$.

**Step 2a: Identify $B$.**
$$ B = \begin{bmatrix} 0 \\ 1 \end{bmatrix} $$
*Explanation:* This is directly given in the problem statement.

**Step 2b: Calculate $AB$.**
$$ AB = \begin{bmatrix} 0 & 1 \\ -2 & -3 \end{bmatrix} \begin{bmatrix} 0 \\ 1 \end{bmatrix} $$
$$ AB = \begin{bmatrix} (0)(0) + (1)(1) \\ (-2)(0) + (-3)(1) \end{bmatrix} $$
$$ AB = \begin{bmatrix} 0 + 1 \\ 0 - 3 \end{bmatrix} $$
$$ AB = \begin{bmatrix} 1 \\ -3 \end{bmatrix} $$
*Explanation:* We perform standard matrix multiplication: (row of A) dot (column of B).

**Step 2c: Assemble $\mathcal{C}$.**
$$ \mathcal{C} = \begin{bmatrix} B & AB \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ 1 & -3 \end{bmatrix} $$
*Explanation:* We place the calculated vectors $B$ and $AB$ side-by-side as columns in the controllability matrix.

**Step 3: Determine the rank of $\mathcal{C}$.**
For a square matrix like $\mathcal{C}$ (which is $2 \times 2$), we can calculate its determinant. If the determinant is non-zero, the rank is equal to its dimension ($n=2$).
$$ \det(\mathcal{C}) = (0)(-3) - (1)(1) $$
$$ \det(\mathcal{C}) = 0 - 1 $$
$$ \det(\mathcal{C}) = -1 $$
*Explanation:* The determinant of a $2 \times 2$ matrix $\begin{bmatrix} a & b \\ c & d \end{bmatrix}$ is $ad - bc$.

**Step 4: Compare the rank to $n$.**
The rank of $\mathcal{C}$ is 2 (since $\det(\mathcal{C}) = -1 \ne 0$).
The number of states $n$ is 2.
Since $rank(\mathcal{C}) = n$, the system is completely state controllable.

**Final Answer:**
The system is **completely state controllable**.

**Reflection:** This example was straightforward because the determinant test for rank worked perfectly for the $2 \times 2$ square controllability matrix. The calculations for $AB$ were simple.

---

### Example 2: Simple 2x2 System (Uncontrollable)

**Problem:** Determine if the following system is state controllable.
$$ \dot{\mathbf{x}}(t) = \begin{bmatrix} 1 & 0 \\ 0 & 2 \end{bmatrix} \mathbf{x}(t) + \begin{bmatrix} 1 \\ 0 \end{bmatrix} \mathbf{u}(t) $$

**Given:**
*   System matrix $A = \begin{bmatrix} 1 & 0 \\ 0 & 2 \end{bmatrix}$
*   Input matrix $B = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$
*   Number of states $n=2$

**What we want:** To determine if the system is state controllable.

**Step 1: Identify the number of states ($n$).**
The system matrix $A$ is $2 \times 2$, so $n=2$.
*Explanation:* Same as Example 1.

**Step 2: Construct the controllability matrix $\mathcal{C}$.**
For $n=2$, $\mathcal{C} = \begin{bmatrix} B & AB \end{bmatrix}$.

**Step 2a: Identify $B$.**
$$ B = \begin{bmatrix} 1 \\ 0 \end{bmatrix} $$
*Explanation:* Directly from the problem.

**Step 2b: Calculate $AB$.**
$$ AB = \begin{bmatrix} 1 & 0 \\ 0 & 2 \end{bmatrix} \begin{bmatrix} 1 \\ 0 \end{bmatrix} $$
$$ AB = \begin{bmatrix} (1)(1) + (0)(0) \\ (0)(1) + (2)(0) \end{bmatrix} $$
$$ AB = \begin{bmatrix} 1 + 0 \\ 0 + 0 \end{bmatrix} $$
$$ AB = \begin{bmatrix} 1 \\ 0 \end{bmatrix} $$
*Explanation:* Matrix multiplication. Notice that $AB$ is identical to $B$ in this case.

**Step 2c: Assemble $\mathcal{C}$.**
$$ \mathcal{C} = \begin{bmatrix} B & AB \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix} $$
*Explanation:* Placing the calculated vectors as columns.

**Step 3: Determine the rank of $\mathcal{C}$.**
Calculate the determinant of $\mathcal{C}$:
$$ \det(\mathcal{C}) = (1)(0) - (1)(0) $$
$$ \det(\mathcal{C}) = 0 - 0 $$
$$ \det(\mathcal{C}) = 0 $$
*Explanation:* The determinant is zero, which immediately tells us the rank is less than $n$.

Since $\det(\mathcal{C}) = 0$, the rank of $\mathcal{C}$ is not 2.
To find the exact rank, we can observe the columns: $\begin{bmatrix} 1 \\ 0 \end{bmatrix}$ and $\begin{bmatrix} 1 \\ 0 \end{bmatrix}$. These two columns are linearly dependent (they are identical). There is only one linearly independent column.
Therefore, $rank(\mathcal{C}) = 1$.
*Explanation:* When the determinant is zero for a square matrix, its rank is less than its dimension. For a $2 \times 2$ matrix, if the determinant is zero, the rank is 1 (unless it's the zero matrix, in which case rank is 0).

**Step 4: Compare the rank to $n$.**
The rank of $\mathcal{C}$ is 1.
The number of states $n$ is 2.
Since $rank(\mathcal{C}) < n$ ($1 < 2$), the system is not completely state controllable.

**Final Answer:**
The system is **not completely state controllable**.

**Reflection:** This example demonstrates an uncontrollable system. The key observation was that $AB$ was identical to $B$, leading to linearly dependent columns in $\mathcal{C}$ and a zero determinant. This means the input can only influence one dimension of the state space, even though the system has two states. Physically, the input $\mathbf{u}$ only affects the first state variable, and the second state variable $x_2$ evolves independently ($\dot{x}_2 = 2x_2$) without any influence from $\mathbf{u}$.

---

### Example 3: 3x3 System (Controllable)

**Problem:** Determine if the following system is state controllable.
$$ \dot{\mathbf{x}}(t) = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ -6 & -11 & -6 \end{bmatrix} \mathbf{x}(t) + \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix} \mathbf{u}(t) $$

**Given:**
*   System matrix $A = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ -6 & -11 & -6 \end{bmatrix}$
*   Input matrix $B = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}$
*   Number of states $n=3$

**What we want:** To determine if the system is state controllable.

**Step 1: Identify the number of states ($n$).**
The system matrix $A$ is $3 \times 3$, so $n=3$.

**Step 2: Construct the controllability matrix $\mathcal{C}$.**
For $n=3$, $\mathcal{C} = \begin{bmatrix} B & AB & A^2B \end{bmatrix}$.

**Step 2a: Identify $B$.**
$$ B = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix} $$

**Step 2b: Calculate $AB$.**
$$ AB = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ -6 & -11 & -6 \end{bmatrix} \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix} $$
$$ AB = \begin{bmatrix} (0)(0) + (1)(0) + (0)(1) \\ (0)(0) + (0)(0) + (1)(1) \\ (-6)(0) + (-11)(0) + (-6)(1) \end{bmatrix} $$
$$ AB = \begin{bmatrix} 0 \\ 1 \\ -6 \end{bmatrix} $$

**Step 2c: Calculate $A^2B$.**
First, $A^2 = A \cdot A$:
$$ A^2 = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ -6 & -11 & -6 \end{bmatrix} \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ -6 & -11 & -6 \end{bmatrix} $$
$$ A^2 = \begin{bmatrix} (0)(0)+(1)(0)+(0)(-6) & (0)(1)+(1)(0)+(0)(-11) & (0)(0)+(1)(1)+(0)(-6) \\ (0)(0)+(0)(0)+(1)(-6) & (0)(1)+(0)(0)+(1)(-11) & (0)(0)+(0)(1)+(1)(-6) \\ (-6)(0)+(-11)(0)+(-6)(-6) & (-6)(1)+(-11)(0)+(-6)(-11) & (-6)(0)+(-11)(1)+(-6)(-6) \end{bmatrix} $$
$$ A^2 = \begin{bmatrix} 0 & 0 & 1 \\ -6 & -11 & -6 \\ 36 & 60 & 25 \end{bmatrix} $$
Now, calculate $A^2B$:
$$ A^2B = \begin{bmatrix} 0 & 0 & 1 \\ -6 & -11 & -6 \\ 36 & 60 & 25 \end{bmatrix} \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix} $$
$$ A^2B = \begin{bmatrix} (0)(0) + (0)(0) + (1)(1) \\ (-6)(0) + (-11)(0) + (-6)(1) \\ (36)(0) + (60)(0) + (25)(1) \end{bmatrix} $$
$$ A^2B = \begin{bmatrix} 1 \\ -6 \\ 25 \end{bmatrix} $$

**Step 2d: Assemble $\mathcal{C}$.**
$$ \mathcal{C} = \begin{bmatrix} B & AB & A^2B \end{bmatrix} = \begin{bmatrix} 0 & 0 & 1 \\ 0 & 1 & -6 \\ 1 & -6 & 25 \end{bmatrix} $$

**Step 3: Determine the rank of $\mathcal{C}$.**
Since $\mathcal{C}$ is a $3 \times 3$ square matrix, we can calculate its determinant.
$$ \det(\mathcal{C}) = 0 \cdot \det \begin{bmatrix} 1 & -6 \\ -6 & 25 \end{bmatrix} - 0 \cdot \det \begin{bmatrix} 0 & -6 \\ 1 & 25 \end{bmatrix} + 1 \cdot \det \begin{bmatrix} 0 & 1 \\ 1 & -6 \end{bmatrix} $$
$$ \det(\mathcal{C}) = 0 - 0 + 1 \cdot ((0)(-6) - (1)(1)) $$
$$ \det(\mathcal{C}) = 1 \cdot (0 - 1) $$
$$ \det(\mathcal{C}) = -1 $$

Since $\det(\mathcal{C}) = -1 \ne 0$, the rank of $\mathcal{C}$ is 3.

**Step 4: Compare the rank to $n$.**
The rank of $\mathcal{C}$ is 3.
The number of states $n$ is 3.
Since $rank(\mathcal{C}) = n$, the system is completely state controllable.

**Final Answer:**
The system is **completely state controllable**.

**Reflection:** This example involved more complex matrix multiplications for $A^2$ and $A^2B$, and a $3 \times 3$ determinant calculation. The "companion form" of matrix A (where the last row contains coefficients of the characteristic polynomial and the rest is structured with ones and zeros) often leads to controllable systems when the input B is a column vector with a 1 at the bottom.

---

### Example 4: 3x3 System (Uncontrollable)

**Problem:** Determine if the following system is state controllable.
$$ \dot{\mathbf{x}}(t) = \begin{bmatrix} 1 & 1 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{bmatrix} \mathbf{x}(t) + \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix} \mathbf{u}(t) $$

**Given:**
*   System matrix $A = \begin{bmatrix} 1 & 1 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{bmatrix}$
*   Input matrix $B = \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}$
*   Number of states $n=3$

**What we want:** To determine if the system is state controllable.

**Step 1: Identify the number of states ($n$).**
The system matrix $A$ is $3 \times 3$, so $n=3$.

**Step 2: Construct the controllability matrix $\mathcal{C}$.**
For $n=3$, $\mathcal{C} = \begin{bmatrix} B & AB & A^2B \end{bmatrix}$.

**Step 2a: Identify $B$.**
$$ B = \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix} $$

**Step 2b: Calculate $AB$.**
$$ AB = \begin{bmatrix} 1 & 1 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{bmatrix} \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix} $$
$$ AB = \begin{bmatrix} (1)(1) + (1)(1) + (0)(0) \\ (0)(1) + (2)(1) + (0)(0) \\ (0)(1) + (0)(1) + (3)(0) \end{bmatrix} $$
$$ AB = \begin{bmatrix} 1 + 1 \\ 0 + 2 \\ 0 + 0 \end{bmatrix} $$
$$ AB = \begin{bmatrix} 2 \\ 2 \\ 0 \end{bmatrix} $$

**Step 2c: Calculate $A^2B$.**
We can calculate $A^2B = A(AB)$.
$$ A^2B = \begin{bmatrix} 1 & 1 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{bmatrix} \begin{bmatrix} 2 \\ 2 \\ 0 \end{bmatrix} $$
$$ A^2B = \begin{bmatrix} (1)(2) + (1)(2) + (0)(0) \\ (0)(2) + (2)(2) + (0)(0) \\ (0)(2) + (0)(2) + (3)(0) \end{bmatrix} $$
$$ A^2B = \begin{bmatrix} 2 + 2 \\ 0 + 4 \\ 0 + 0 \end{bmatrix} $$
$$ A^2B = \begin{bmatrix} 4 \\ 4 \\ 0 \end{bmatrix} $$

**Step 2d: Assemble $\mathcal{C}$.**
$$ \mathcal{C} = \begin{bmatrix} B & AB & A^2B \end{bmatrix} = \begin{bmatrix} 1 & 2 & 4 \\ 1 & 2 & 4 \\ 0 & 0 & 0 \end{bmatrix} $$

**Step 3: Determine the rank of $\mathcal{C}$.**
Calculate the determinant of $\mathcal{C}$:
$$ \det(\mathcal{C}) = 1 \cdot \det \begin{bmatrix} 2 & 4 \\ 0 & 0 \end{bmatrix} - 2 \cdot \det \begin{bmatrix} 1 & 4 \\ 0 & 0 \end{bmatrix} + 4 \cdot \det \begin{bmatrix} 1 & 2 \\ 0 & 0 \end{bmatrix} $$
$$ \det(\mathcal{C}) = 1 \cdot ((2)(0) - (4)(0)) - 2 \cdot ((1)(0) - (4)(0)) + 4 \cdot ((1)(0) - (2)(0)) $$
$$ \det(\mathcal{C}) = 1 \cdot (0) - 2 \cdot (0) + 4 \cdot (0) $$
$$ \det(\mathcal{C}) = 0 $$
Since $\det(\mathcal{C}) = 0$, the rank of $\mathcal{C}$ is less than 3.

To find the actual rank, let's look at the columns:
Column 1: $\begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}$
Column 2: $\begin{bmatrix} 2 \\ 2 \\ 0 \end{bmatrix} = 2 \cdot \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}$ (Column 2 is a multiple of Column 1)
Column 3: $\begin{bmatrix} 4 \\ 4 \\ 0 \end{bmatrix} = 4 \cdot \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}$ (Column 3 is a multiple of Column 1)

All three columns are linearly dependent; they all lie along the same direction $\begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}$.
Therefore, there is only one linearly independent column.
Thus, $rank(\mathcal{C}) = 1$.
*Explanation:* The columns are not independent. The maximum number of linearly independent columns is 1. We could also use Gaussian elimination to confirm this, which would result in only one non-zero row.

**Step 4: Compare the rank to $n$.**
The rank of $\mathcal{C}$ is 1.
The number of states $n$ is 3.
Since $rank(\mathcal{C}) < n$ ($1 < 3$), the system is not completely state controllable.

**Final Answer:**
The system is **not completely state controllable**.

**Reflection:** This example clearly shows how linear dependence among the columns of the controllability matrix leads to uncontrollability. All generated columns $(B, AB, A^2B)$ are scalar multiples of the initial $B$ vector. This means the control input can only ever influence the system along a single direction in the 3D state space, leaving two dimensions uncontrollable. Notice that the third state variable $x_3$ evolves independently ($\dot{x}_3 = 3x_3$) and is never affected by the input $\mathbf{u}$ because the third element of $B$ is zero. This is a common structure for uncontrollable systems.

## 6. Common mistakes and traps

1.  **Incorrectly calculating $A^k B$ terms:** This is the most frequent error. Matrix multiplication requires careful attention to order and dimensions. A common mistake is multiplying $B A$ instead of $A B$, or making arithmetic errors in the matrix entries.
2.  **Stopping the controllability matrix calculation too early or too late:** The controllability matrix is $\mathcal{C} = \begin{bmatrix} B & AB & A^2B & \cdots & A^{n-1}B \end{bmatrix}$. Students sometimes stop at $A^{n-2}B$ or go all the way to $A^nB$. Remember it's $A^{n-1}B$, where $n$ is the number of states (dimension of $A$).
3.  **Misinterpreting "rank" for non-square matrices:** For a square matrix, a non-zero determinant implies full rank. However, the controllability matrix $\mathcal{C}$ is often *not* square (it's $n \times (n \cdot m)$). For non-square matrices or square matrices with zero determinants, simply checking the determinant is insufficient. One must use methods like Gaussian elimination (row reduction) to find the number of non-zero rows, or identify the largest square submatrix with a non-zero determinant.
4.  **Confusing state controllability with output controllability or observability:** These are distinct concepts. State controllability concerns the ability to move the *internal states* of the system. Output controllability concerns the ability to move the *outputs*. Observability is about being able to infer the *internal states* from the *outputs*. They are related but not interchangeable.
5.  **Applying the test to non-linear systems without linearization:** The controllability matrix rank test (Kalman's controllability test) is strictly for **linear time-invariant (LTI)** systems. Applying it directly to non-linear systems without first linearizing them around an operating point will yield incorrect results. Non-linear systems require more advanced (and complex) controllability analyses.
6.  **Ignoring the physical meaning:** Sometimes, the math works out to "uncontrollable," but a student might not connect this back to the physical system. Forgetting that a zero row in $B$ (like in Example 4) for a particular state means that input has no direct effect on that state, which can be a strong indicator of uncontrollability, is a missed opportunity for intuition.

## 7. Textbook-precise explanation

For a linear time-invariant (LTI) system described by the state-space equations:
$$ \dot{\mathbf{x}}(t) = A\mathbf{x}(t) + B\mathbf{u}(t) $$
where $\mathbf{x}(t) \in \mathbb{R}^n$ is the state vector, $\mathbf{u}(t) \in \mathbb{R}^m$ is the input vector, $A$ is the $n \times n$ system matrix, and $B$ is the $n \times m$ input matrix.

The system $(A, B)$ is said to be **completely state controllable** if and only if for any initial state $\mathbf{x}(t_0)$ and any desired final state $\mathbf{x}(t_f)$, there exists a piecewise continuous input $\mathbf{u}(t)$ on $[t_0, t_f]$ that drives the system from $\mathbf{x}(t_0)$ to $\mathbf{x}(t_f)$.

**Kalman's Controllability Rank Condition (also known as Kalman's Test):**
The system $(A, B)$ is completely state controllable if and only if the rank of the $n \times (nm)$ controllability matrix $\mathcal{C}$ is equal to $n$.

The controllability matrix $\mathcal{C}$ is constructed as:
$$ \mathcal{C} = \begin{bmatrix} B & AB & A^2B & \cdots & A^{n-1}B \end{bmatrix} $$
where $n$ is the dimension of the state vector (the number of states) and $m$ is the dimension of the input vector (the number of inputs). The terms $A^k B$ are matrices of dimension $n \times m$.

Thus, the condition for complete state controllability is:
$$ \text{rank}(\mathcal{C}) = n $$

**Proof Sketch (based on the reachability Gramian, not detailed here):**
The set of all states reachable from the origin $\mathbf{x}(0) = \mathbf{0}$ at time $t_f$ is given by the range space of the reachability Gramian matrix $W_c(t_f) = \int_0^{t_f} e^{A\tau} B B^T e^{A^T\tau} d\tau$. The system is controllable if and only if $W_c(t_f)$ is positive definite (i.e., invertible), which implies its rank is $n$.
A fundamental result in linear system theory (derived from the Cayley-Hamilton theorem and properties of matrix exponentials) states that the range space of $W_c(t_f)$ is identical to the column space of the matrix $\mathcal{C}$ defined above. Therefore, the system is controllable if and only if the column space of $\mathcal{C}$ spans $\mathbb{R}^n$, which is equivalent to $rank(\mathcal{C}) = n$.

**References:**
*   Ogata, K. (2010). *Modern Control Engineering* (5th ed.). Prentice Hall. (See Chapter 10, "Design of Control Systems in State Space")
*   Dorf, R. C., & Bishop, R. H. (2017). *Modern Control Systems* (13th ed.). Pearson. (See Chapter 10, "State Variable Models")
*   Franklin, G. F., Powell, J. D., & Emami-Naeini, A. (2014). *Feedback Control of Dynamic Systems* (7th ed.). Pearson. (See Chapter 6, "State-Space Design")

## 8. ASCII diagrams

Here's a conceptual ASCII diagram representing the state-space system and the flow of information for the controllability test.

```text
                               +-----------------+
  u(t) (Input) --------------->|                 |
(m x 1 vector)                 |      System     |
                               |  (A, B Matrices)|
                               |                 |
                               +--------+--------+
                                        |
                                        V
                                      x(t) (State)
                                    (n x 1 vector)
                                        |
                                        V
                                      y(t) (Output)
                                    (p x 1 vector)


Conceptual View of Controllability:
-----------------------------------

Imagine the 'State Space' as an n-dimensional room.

       State Space (n-dimensional)
          ^
          |   . x_desired
          |  /
          | /
          |/
   x(t) --+----------------->
  (Current Position)

  The 'Controllability Matrix' C = [B  AB  A^2B ... A^(n-1)B]
  Its columns are 'directions of influence' or 'control vectors'.

  If rank(C) = n:
  The control vectors (columns of C) span the entire n-dimensional
  state space. You can reach ANY point (state) in the room.

  Example for n=2 (2D room):
  
          ^ x2
          |   
          |  /  <-- B (initial push direction)
          | /
          |/
  --------+-------> x1
          |\
          | \
          |  \ <-- AB (push direction after one step of system dynamics)

  If B and AB are linearly independent, they can span the entire 2D plane.
  You can reach any (x1, x2) state.
  
  
  If rank(C) < n:
  The control vectors only span a subspace. You are restricted to a
  smaller "corridor" or "plane" within the room. Some states are unreachable.

  Example for n=2 (2D room), but rank(C)=1:

          ^ x2
          |   
          |  /  <-- B
          | /
          |/
  --------+-------> x1
          |\
          | \ <-- AB (same direction as B, just scaled)
          |  \

  Here, B and AB are linearly dependent. They only span a line.
  You can only move along this line, not to any arbitrary (x1, x2) state.
  The system is uncontrollable in the full 2D space.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of the controllability matrix as a "Control Influence Chain."
    *   **B** is the direct push (immediate influence).
    *   **A** is the system's inherent dynamics (how things naturally evolve).
    *   **AB** is the direct push, *then* followed by one step of natural evolution.
    *   **A²B** is the direct push, *then* followed by two steps of natural evolution.
    *   ...and so on, up to **Aⁿ⁻¹B**.
    Visualize a domino effect: You push the first domino (B), which then triggers a chain reaction (A, A², ...). The matrix collects all these "trigger points" and their propagated effects. If these collected effects cover all dimensions (full rank), you can control the entire chain.

2.  **Formulas/Facts to Overlearn:**
    *   The state-space representation: $\dot{\mathbf{x}}(t) = A\mathbf{x}(t) + B\mathbf{u}(t)$
    *   The Controllability Matrix: $\mathcal{C} = \begin{bmatrix} B & AB & A^2B & \cdots & A^{n-1}B \end{bmatrix}$
    *   The Rank Test: System is controllable if and only if $rank(\mathcal{C}) = n$ (where $n$ is the number of states).

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review the entire lesson. Work through Example 1 and 2 again without looking at the solutions.
    *   **Day 3:** Review the definition, the formula for $\mathcal{C}$, and the rank test. Try to explain it in your own words. Work through Example 3.
    *   **Day 7:** Review the common mistakes. Try to derive $\mathcal{C}$ for a new $2 \times 2$ system from scratch.
    *   **Day 16:** Review the "why it works" section. Try Example 4 again.
    *   **Day 35:** Draw the ASCII diagram from memory. Explain the concept to a rubber duck (or a friend). Think of a real-world system and how you'd apply the test.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the exact formula for $\mathcal{C}$, you can rebuild it from the fundamental definition of controllability and the state transition equation:
    *   **Start with the state transition equation:**
        $$ \mathbf{x}(t) = e^{At}\mathbf{x}(0) + \int_0^t e^{A(t-\tau)} B\mathbf{u}(\tau) d\tau $$
    *   **Assume $\mathbf{x}(0) = \mathbf{0}$ for simplicity (reachability from origin):**
        $$ \mathbf{x}(t) = \int_0^t e^{A(t-\tau)} B\mathbf{u}(\tau) d\tau $$
    *   **Expand the matrix exponential $e^{A(t-\tau)}$ using its Taylor series:**
        $$ e^{A(t-\tau)} = I + A(t-\tau) + \frac{A^2(t-\tau)^2}{2!} + \frac{A^3(t-\tau)^3}{3!} + \cdots $$
    *   **Substitute this into the integral:**
        $$ \mathbf{x}(t) = \int_0^t \left( I + A(t-\tau) + \frac{A^2(t-\tau)^2}{2!} + \cdots \right) B\mathbf{u}(\tau) d\tau $$
        $$ \mathbf{x}(t) = \int_0^t \left( B\mathbf{u}(\tau) + A B(t-\tau)\mathbf{u}(\tau) + A^2 B \frac{(t-\tau)^2}{2!}\mathbf{u}(\tau) + \cdots \right) d\tau $$
    *   **Recognize that the terms $B, AB, A^2B, \ldots$ are the key components.** The Cayley-Hamilton theorem tells us that any matrix power $A^k$ for $k \ge n$ can be expressed as a linear combination of $I, A, \ldots, A^{n-1}$. This means that any term $A^k B$ for $k \ge n$ will be linearly dependent on the preceding terms. Therefore, to check if the system can reach *any* state, we only need to consider the influence vectors up to $A^{n-1}B$.
    *   **Conclude that the ability to span the state space depends on the linear independence of the set $\{B, AB, A^2B, \ldots, A^{n-1}B\}$.** This directly leads to the construction of $\mathcal{C}$ and the rank test.

## 10. Connections — what this leads to

Understanding controllability is not an isolated concept; it forms the bedrock for many advanced topics in control theory and system design.

1.  **Pole Placement (State Feedback Control):** If a system is controllable, it is possible to design a state feedback controller (i.e., choose a gain matrix $K$ such that $\mathbf{u} = -K\mathbf{x}$) to place the closed-loop system's eigenvalues (poles) at *any* desired locations. This allows engineers to tune the system's transient response (e.g., make it faster, less oscillatory, more stable). Without controllability, pole placement is impossible for all modes.

2.  **Linear Quadratic Regulator (LQR) and Optimal Control:** LQR is a powerful optimal control technique that finds the control input $\mathbf{u}$ that minimizes a quadratic cost function (balancing control effort and state deviation). A fundamental requirement for the LQR problem to have a unique, stabilizing solution is that the system must be controllable (or at least the unstable modes must be controllable).

3.  **Observability (Duality Principle):** Controllability has a mathematical "dual" concept called observability. Observability determines if you can infer the internal states of a system by only looking at its outputs. Kalman's observability test uses an "observability matrix" which is structurally similar to the controllability matrix but involves $A^T$ and $C^T$. The duality principle states that a system $(A, B)$ is controllable if and only if the system $(A^T, B^T)$ is observable. This provides a deep theoretical link between these two critical properties.

4.  **System Decomposition (Kalman Decomposition):** If a system is not completely controllable, it can be decomposed into controllable and uncontrollable subspaces. This decomposition allows engineers to analyze and design control laws only for the controllable part of the system, understanding that the uncontrollable part will evolve independently. This is crucial for designing controllers for complex systems where some parts might inherently be beyond control.

5.  **Robust Control and Adaptive Control:** These advanced control strategies deal with uncertainties and changing system dynamics. Knowing a system's controllability is a prerequisite, as it ensures that even with uncertainties, there's a fundamental ability to influence the system.

6.  **Model Predictive Control (MPC):** MPC uses a model of the system to predict future behavior and optimize control actions over a receding horizon. The accuracy and effectiveness of MPC rely on the underlying system being sufficiently controllable to execute the planned trajectories.

7.  **System Design and Actuator Placement:** In the early design phases of rockets, aircraft, or robots, controllability analysis helps determine the optimal placement and sizing of actuators (engines, control surfaces, motors). If initial analysis shows uncontrollability, it signals a fundamental flaw in the design that needs to be addressed by adding more actuators, changing their locations, or modifying the system's inherent dynamics.

## 11. Self-check questions

1.  Explain in your own words what it means for a rocket to be "state controllable." Why is this property critical for a rocket's mission success?
2.  Given a system with $n=4$ states and $m=1$ input, write down the general form of its controllability matrix $\mathcal{C}$. What is the required rank of this matrix for the system to be completely state controllable?
3.  Consider a simplified 2D drone dynamics represented by the state-space model:
    $$ \dot{\mathbf{x}}(t) = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} \mathbf{x}(t) + \begin{bmatrix} 0 \\ 1 \end{bmatrix} \mathbf{u}(t) $$
    where $x_1$ is position and $x_2$ is velocity. Is this system completely state controllable? Show all steps.
4.  A system has the following state-space representation:
    $$ A = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & -1 \end{bmatrix}, \quad B = \begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix} $$
    Determine if this system is completely state controllable. If not, identify which state variable (or combination of variables) is uncontrollable and explain why intuitively.
5.  Discuss a scenario where a system might be "output controllable" but not "state controllable." Provide a conceptual example and explain the distinction.