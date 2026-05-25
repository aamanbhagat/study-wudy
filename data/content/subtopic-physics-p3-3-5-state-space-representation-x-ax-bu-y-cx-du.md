## What it is
State-space representation is a mathematical framework that models physical systems using a set of coupled, first-order differential equations. Instead of tracking a single variable through a complex, high-order differential equation, it tracks the internal "state" of the system as a vector, mapping how current states and external inputs drive future states and observable outputs.

## Why it matters
This is the bedrock of modern Guidance, Navigation, and Control (GNC). Classical control theory (like Laplace transforms and transfer functions) struggles with Multiple-Input Multiple-Output (MIMO) systems, such as a rocket that must control pitch, yaw, and roll simultaneously using multiple thrusters. State-space handles complex, coupled dynamics natively using linear algebra. You will use this exact formulation to design Linear Quadratic Regulators (LQR) for optimal control and Kalman filters for spacecraft state estimation.

## When to study it
You must already understand:
1. **Linear Algebra:** Matrix multiplication, matrix inversion, and computing eigenvalues/eigenvectors.
2. **Calculus:** Ordinary Differential Equations (ODEs), specifically solving first-order linear systems.
3. **Newtonian Mechanics:** Setting up equations of motion using $F = ma$ or $\tau = I\alpha$.

If you cannot confidently write down the equations of motion for a basic mechanical system or multiply a $2 \times 2$ matrix by a $2 \times 1$ vector, stop and review those prerequisites first.

## How to study it (step by step)
1. **Define the system:** Write down the governing $n$-th order differential equation for your physical system (e.g., a second-order equation from Newton's second law).
2. **Define the state vector ($x$):** Choose variables that fully describe the system's current condition. For mechanical systems, this is almost always positions and velocities. Set $x_1 = \text{position}$, $x_2 = \text{velocity}$, etc.
3. **Derive the first-order ODEs:** Differentiate your state vector. Write $\dot{x}_1$ in terms of $x_2$, and use your governing equation to write the highest derivative ($\dot{x}_n$) in terms of the states and the input $u$.
4. **Formulate the Dynamics Equation:** Pack these first-order equations into the matrix form $\dot{x} = Ax + Bu$. Verify that the matrix dimensions align.
5. **Formulate the Output Equation:** Determine what sensors you actually have. Write the output equation $y = Cx + Du$ to map the internal states to your measurable sensor data.
6. **Analyze stability:** Compute the eigenvalues of the system matrix $A$. If any real part is positive, the unforced system is unstable.

## Key ideas, with intuition

**1. The State Vector ($x \in \mathbb{R}^n$)**
The state vector contains the absolute minimum amount of information required to predict the system's future behavior, assuming you know all future inputs. If you freeze time, $x$ is the complete snapshot of the system.

**2. The Dynamics Equation ($\dot{x} = Ax + Bu$)**
This equation describes how the system evolves over time.
*   **$A$ (System Matrix, $n \times n$):** The "Anatomy" of the system. It dictates how the system behaves on its own, without external interference. For example, how a pendulum swings due to gravity and friction.
*   **$B$ (Input Matrix, $n \times m$):** The "Brawn". It maps how your control inputs $u$ (like thruster forces or aerodynamic surface deflections) inject into the system's states.

**3. The Output Equation ($y = Cx + Du$)**
You rarely get to measure the entire state vector perfectly.
*   **$C$ (Output Matrix, $p \times n$):** The "Camera" or sensor matrix. It maps the true, hidden states $x$ to the outputs $y$ that your sensors can actually read.
*   **$D$ (Feedthrough Matrix, $p \times m$):** The "Direct" bypass. It represents inputs that instantly affect the output without passing through the state dynamics. In mechanical systems, $D$ is almost always a matrix of zeros.

## Worked example
Let us model a 1D rocket in a simplified hovering scenario, modeled as a mass-spring-damper system (representing aerodynamic drag and structural restoring forces). The equation of motion is:
$$ m\ddot{z} + c\dot{z} + kz = F $$
where $z$ is altitude, $m$ is mass, $c$ is drag coefficient, $k$ is stiffness, and $F$ is thrust (our input $u$).

**Step 1: Define states and inputs.**
Let the state vector be $x = \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} z \\ \dot{z} \end{bmatrix}$.
Let the input be $u = F$.

**Step 2: Find the first derivatives.**
$$ \dot{x}_1 = \dot{z} = x_2 $$
$$ \dot{x}_2 = \ddot{z} = -\frac{k}{m}z - \frac{c}{m}\dot{z} + \frac{1}{m}F = -\frac{k}{m}x_1 - \frac{c}{m}x_2 + \frac{1}{m}u $$

**Step 3: Build the Dynamics Equation ($\dot{x} = Ax + Bu$).**
$$ \begin{bmatrix} \dot{x}_1 \\ \dot{x}_2 \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ -\frac{k}{m} & -\frac{c}{m} \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} + \begin{bmatrix} 0 \\ \frac{1}{m} \end{bmatrix} u $$

**Step 4: Build the Output Equation ($y = Cx + Du$).**
Assume we only have an altimeter. We can only measure position ($x_1$), not velocity ($x_2$).
$$ y = \begin{bmatrix} 1 & 0 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} + [0]u $$

*Reflection:* Notice how the second-order ODE was cleanly sliced into two first-order equations. The $A$ matrix captures the physics (stiffness and damping), $B$ captures how thrust accelerates the rocket, and $C$ explicitly states our sensor limitations.

## Diagrams

The block diagram below illustrates the flow of signals in a state-space model. Notice the feedback loop created by the $A$ matrix—the current state $x$ loops back to influence its own derivative $\dot{x}$.

```text
          +-------------------------------------------------+
          |                     +---+                       |
u(t) -----+-------------------> | D | ----------------------+----> (+) ---> y(t)
          |                     +---+                       |       ^
          |                                                 |       |
          v   +---+       +---+       +---+                 v     +---+
          +-> | B | ----> |(+)| ----> |int| ----> x(t) ---------> | C |
              +---+       +---+       +---+         |             +---+
                            ^           |           |
                            |   +---+   |           |
                            +-- | A | <-+           |
                                +---+               |
                                                    |
```
*Legend:* `int` = Integrator ($\int \dot{x} dt = x$). `(+)` = Summing junction.

## Memory technique — remember this forever

**1. The Mnemonic:**
*   **A**natomy (System dynamics)
*   **B**rawn (Control inputs)
*   **C**amera (Sensors/Outputs)
*   **D**irect (Feedthrough)

**2. The Core Formulas:**
$$ \dot{x} = Ax + Bu $$
$$ y = Cx + Du $$

**3. Spaced Repetition Schedule:**
Review this formulation and derive the mass-spring-damper example from memory at intervals of: 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. The First Principles Pathway:**
If you forget the matrix structure, remember the goal: **reduce an $n$-th order ODE to $n$ first-order ODEs**. Write out $x_1 = y$, $x_2 = \dot{y}$, $x_3 = \ddot{y}$. Take the derivative of each to see that $\dot{x}_1 = x_2$, $\dot{x}_2 = x_3$, etc. The matrix $A$ simply organizes this exact chain of equalities.

## Common mistakes

1.  **Dimension Mismatches:** Students frequently mess up matrix dimensions. Remember: $A$ must be square ($n \times n$). If you have $n$ states and $m$ inputs, $B$ must be $n \times m$. If you have $p$ sensors, $C$ must be $p \times n$.
2.  **Confusing States with Outputs:** The state vector $x$ is what *actually exists* in physical reality. The output $y$ is what your *sensors report*. They are rarely the same. Do not put sensor noise or sensor limits into the $A$ matrix.
3.  **Applying Linear State-Space to Highly Nonlinear Systems:** $\dot{x} = Ax + Bu$ is a *linear* equation. If your system has $\sin(\theta)$ or $v^2$ drag, you cannot directly put it into a constant $A$ matrix without linearizing it first (usually via Taylor expansion around an equilibrium point).

## Self-check

1.  Convert the unforced simple pendulum equation $\ddot{\theta} + \frac{g}{L}\theta = 0$ into state-space form. What is the $A$ matrix?
2.  A system has a $4 \times 4$ $A$ matrix, a $4 \times 2$ $B$ matrix, and a $3 \times 4$ $C$ matrix. How many states, control inputs, and sensors does this system have?
3.  Write the state-space representation for a kinematic system where the input directly commands acceleration ($\ddot{x} = u$) and the sensor measures both position and velocity. What are the $A$, $B$, $C$, and $D$ matrices?