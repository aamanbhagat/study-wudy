## 1. What it is — in plain English

Imagine you're trying to understand a very complicated machine, like a super-advanced robot. This robot's movements are intricate and unpredictable, changing in complex ways based on many factors. This is what we call a "nonlinear system" in mathematics – its behavior isn't simply proportional to its inputs; it can be wild and hard to predict.

Now, imagine you're only interested in what the robot does when it's standing perfectly still, or when it's making very tiny, almost invisible adjustments around that still position. If you zoom in incredibly close to that specific moment, the robot's tiny movements might start to look much simpler. Instead of complex curves and unpredictable swerves, its small wiggles might resemble straight lines or simple back-and-forth motions.

"Linearization" is precisely this act of zooming in. It's a mathematical trick where we take a complicated, nonlinear system and approximate its behavior with a much simpler, "linear" system, but *only* in a very small neighborhood around a specific, unchanging state (called an equilibrium point). It's like using a flat map to navigate a tiny area of a curved Earth – the map isn't perfectly accurate for the whole globe, but it's perfectly fine, and much easier to use, for a few blocks.

So, in essence, linearization lets us trade complexity for simplicity, but with the understanding that this simplicity is only valid locally. It's a powerful tool because linear systems are much, much easier to analyze and understand than their nonlinear counterparts.

## 2. Why it matters — real-world applications

Linearization is not just a mathematical curiosity; it's a cornerstone technique in engineering, physics, and even economics, allowing us to analyze and design complex systems that would otherwise be intractable.

1.  **Aerospace Engineering & Control Systems**: When designing autopilots for aircraft or rockets (like those developed by SpaceX), engineers often start by linearizing the highly nonlinear equations of motion around a specific operating point (e.g., cruising speed and altitude, or a stable hover for a rocket). This linearized model is then used to design control laws that ensure stability and desired performance. For instance, the small-angle approximation for a pendulum (which turns a sine function into its argument) is a classic example of linearization used to design stable flight control systems for drones or even satellites, ensuring they return to a desired orientation after a disturbance.

2.  **Robotics and Autonomous Systems**: For autonomous vehicles (cars, drones) or robotic arms, understanding how the system behaves around a desired trajectory or "steady state" is critical. Linearization helps predict how small deviations from the planned path will evolve, allowing control algorithms to quickly correct these errors. For example, in a self-driving car, the vehicle dynamics (how it moves, turns, accelerates) are highly nonlinear. Linearizing these dynamics around the current speed and steering angle helps the car's control system react smoothly and safely to minor disturbances or adjust to slight changes in the desired path.

3.  **Electrical Circuits and Signal Processing**: Many electronic components, like transistors or diodes, exhibit nonlinear current-voltage relationships. However, in amplifier design, engineers often want these components to behave linearly over a small operating range to avoid signal distortion. By biasing the transistor at a specific operating point and analyzing its behavior for small signal variations around that point, linearization allows them to design circuits that amplify signals faithfully, which is fundamental to audio equipment, radio communication, and sensor systems.

4.  **Population Dynamics and Epidemiology**: In biology, models for population growth (e.g., logistic growth) or disease spread (SIR models) are typically nonlinear. Linearization around equilibrium points (like a stable population size or an endemic disease level) can tell us about the stability of these states. For instance, epidemiologists might linearize an SIR model around a disease-free equilibrium to determine if a disease will die out or become endemic, based on the basic reproduction number $R_0$. This helps in predicting the outcome of public health interventions.

## 3. Prerequisites — what you must know first

Before diving deep into linearization, ensure you have a solid grasp of these fundamental mathematical concepts. If any of these feel unfamiliar, pause and review them first.

*   **Ordinary Differential Equations (ODEs)**: Understanding what an ODE is, how to classify them (linear vs. nonlinear), and basic methods for solving simple linear ODEs.
*   **Multivariable Calculus**:
    *   **Partial Derivatives**: How to compute derivatives of a function with respect to one variable while holding others constant. Essential for the Jacobian matrix.
    *   **Gradient**: The vector of all first-order partial derivatives of a scalar-valued function.
    *   **Taylor Series Expansion**: Especially the first-order approximation for single-variable functions and its generalization to multivariable functions. This is the mathematical backbone of linearization.
*   **Linear Algebra**:
    *   **Matrices and Vectors**: Basic operations like addition, multiplication, and understanding what a matrix represents.
    *   **Eigenvalues and Eigenvectors**: How to compute them and their significance in determining the behavior of linear systems. They are crucial for stability analysis of the linearized system.
    *   **Matrix Multiplication**: Understanding how to multiply a matrix by a vector and by another matrix.
*   **Equilibrium Points of ODEs**: How to find points where the rate of change of all variables in a system of ODEs is zero, i.e., where $\frac{d\mathbf{x}}{dt} = \mathbf{0}$.

## 4. The core idea — step by step

Linearization is a systematic process of approximating a complex nonlinear system with a simpler linear one around a specific point. Let's break it down step by step.

### ### Step 1: The Problem with Nonlinear Systems

**Plain English:** Most interesting real-world systems are not simple. Their behavior changes in complicated, non-proportional ways. This makes their governing equations (nonlinear ODEs) incredibly difficult, often impossible, to solve exactly using standard techniques. We need a way to make them manageable.

**Small Concrete Example:** Consider a simple pendulum. Its motion is described by the equation $\frac{d^2\theta}{dt^2} + \frac{g}{L}\sin\theta = 0$, where $\theta$ is the angle, $g$ is gravity, and $L$ is length. The $\sin\theta$ term makes this equation nonlinear. There's no simple formula for $\theta(t)$ that works for all initial conditions.

**Formal/Mathematical Version:** A general nonlinear system of first-order ODEs can be written as:
$$ \frac{d\mathbf{x}}{dt} = \mathbf{f}(\mathbf{x}) $$
where $\mathbf{x} = (x_1, x_2, \dots, x_n)^T$ is a vector of state variables, and $\mathbf{f}(\mathbf{x}) = (f_1(\mathbf{x}), f_2(\mathbf{x}), \dots, f_n(\mathbf{x}))^T$ is a vector-valued function where at least one $f_i$ is a nonlinear function of $\mathbf{x}$.

**What could go wrong:** Assuming that just because an ODE is written down, there must be an analytical solution. For most nonlinear ODEs, exact solutions are rare. This means we need approximation techniques.

### ### Step 2: Identify Equilibrium Points

**Plain English:** Before we can zoom in, we need a specific place to zoom in on. For dynamic systems, these "places" are called equilibrium points (or fixed points, or critical points). These are states where the system doesn't change over time; if you put the system there, it stays there forever, assuming no external disturbances.

**Small Concrete Example:** For the pendulum equation $\frac{d^2\theta}{dt^2} + \frac{g}{L}\sin\theta = 0$, we first convert it to a system of first-order ODEs. Let $x_1 = \theta$ and $x_2 = \frac{d\theta}{dt}$. Then:
$$ \frac{dx_1}{dt} = x_2 $$
$$ \frac{dx_2}{dt} = -\frac{g}{L}\sin x_1 $$
To find equilibrium points, we set both rates of change to zero:
$$ x_2 = 0 $$
$$ -\frac{g}{L}\sin x_1 = 0 $$
From the second equation, $\sin x_1 = 0$, which means $x_1 = n\pi$ for any integer $n$. So, the equilibrium points are $(n\pi, 0)$ for $n \in \mathbb{Z}$. Physically, these are the pendulum hanging straight down ($0, 2\pi, \dots$) and standing straight up ($\pi, 3\pi, \dots$).

**Formal/Mathematical Version:** An equilibrium point $\mathbf{x}_0$ of the system $\frac{d\mathbf{x}}{dt} = \mathbf{f}(\mathbf{x})$ is a constant vector such that:
$$ \mathbf{f}(\mathbf{x}_0) = \mathbf{0} $$
This means that if the system is at $\mathbf{x}_0$, then $\frac{d\mathbf{x}}{dt} = \mathbf{0}$, so $\mathbf{x}$ does not change.

**What could go wrong:** Missing some equilibrium points, especially if the nonlinear function has multiple roots (like $\sin x = 0$ having infinite solutions). Always solve $\mathbf{f}(\mathbf{x}) = \mathbf{0}$ thoroughly for all possible $\mathbf{x}_0$.

### ### Step 3: Zooming In with Taylor Series Approximation

**Plain English:** This is the core mathematical trick. If we're looking at a small region around a point, we can approximate a complex curve with a simple straight line (its tangent). For multivariable functions, this "straight line" becomes a "flat plane" or "hyperplane." The Taylor series gives us the formula for this approximation. We only care about the *first-order* terms because we're zooming in so close that higher-order (curvy) terms become negligible.

**Small Concrete Example:** For a single variable function $f(x)$, its Taylor expansion around a point $a$ is:
$$ f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \dots $$
If $x$ is very close to $a$, then $(x-a)$ is small, $(x-a)^2$ is even smaller, and so on. So, for $x \approx a$, we can approximate $f(x) \approx f(a) + f'(a)(x-a)$. This is the tangent line approximation.

**Formal/Mathematical Version:** For a vector-valued function $\mathbf{f}(\mathbf{x})$ around an equilibrium point $\mathbf{x}_0$, we let $\mathbf{x} = \mathbf{x}_0 + \mathbf{y}$, where $\mathbf{y}$ represents a small deviation from $\mathbf{x}_0$. Then, the multivariable Taylor expansion of $\mathbf{f}(\mathbf{x})$ around $\mathbf{x}_0$ is:
$$ \mathbf{f}(\mathbf{x}_0 + \mathbf{y}) = \mathbf{f}(\mathbf{x}_0) + J(\mathbf{x}_0)\mathbf{y} + O(||\mathbf{y}||^2) $$
Here, $O(||\mathbf{y}||^2)$ represents terms of order $(\mathbf{y})^2$ and higher, which become negligible when $\mathbf{y}$ is very small. $J(\mathbf{x}_0)$ is the **Jacobian matrix** of $\mathbf{f}$ evaluated at $\mathbf{x}_0$.

**What could go wrong:** Applying this approximation too far from the equilibrium point. The linearized system is only valid in a small neighborhood. Also, incorrectly assuming the Taylor expansion is always possible; the function $\mathbf{f}$ must be differentiable at $\mathbf{x}_0$.

### ### Step 4: The Jacobian Matrix

**Plain English:** The Jacobian matrix is like the "multivariable derivative" of our system's function $\mathbf{f}$. It's a table (matrix) that tells us how each component of the system's rate of change ($f_1, f_2, \dots$) is affected by small changes in each of the system's variables ($x_1, x_2, \dots$). It's the "slope" of the vector field at a given point.

**Small Concrete Example:** Consider a 2D system:
$$ \frac{dx_1}{dt} = f_1(x_1, x_2) = x_1 - x_1x_2 $$
$$ \frac{dx_2}{dt} = f_2(x_1, x_2) = x_1x_2 - x_2 $$
The Jacobian matrix $J(\mathbf{x})$ is:
$$ J(\mathbf{x}) = \begin{pmatrix} \frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} \\ \frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2} \end{pmatrix} $$
For this example:
$$ \frac{\partial f_1}{\partial x_1} = 1 - x_2 $$
$$ \frac{\partial f_1}{\partial x_2} = -x_1 $$
$$ \frac{\partial f_2}{\partial x_1} = x_2 $$
$$ \frac{\partial f_2}{\partial x_2} = x_1 - 1 $$
So, the Jacobian matrix is:
$$ J(x_1, x_2) = \begin{pmatrix} 1 - x_2 & -x_1 \\ x_2 & x_1 - 1 \end{pmatrix} $$

**Formal/Mathematical Version:** For a system $\frac{d\mathbf{x}}{dt} = \mathbf{f}(\mathbf{x})$ where $\mathbf{x} = (x_1, \dots, x_n)^T$ and $\mathbf{f} = (f_1, \dots, f_n)^T$, the Jacobian matrix $J(\mathbf{x})$ is an $n \times n$ matrix whose entry in the $i$-th row and $j$-th column is given by:
$$ J_{ij}(\mathbf{x}) = \frac{\partial f_i}{\partial x_j} $$
So,
$$ J(\mathbf{x}) = \begin{pmatrix} \frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} & \dots & \frac{\partial f_1}{\partial x_n} \\ \frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2} & \dots & \frac{\partial f_2}{\partial x_n} \\ \vdots & \vdots & \ddots & \vdots \\ \frac{\partial f_n}{\partial x_1} & \frac{\partial f_n}{\partial x_2} & \dots & \frac{\partial f_n}{\partial x_n} \end{pmatrix} $$
Crucially, for linearization, we evaluate this matrix at the specific equilibrium point $\mathbf{x}_0$, resulting in a constant matrix $J(\mathbf{x}_0)$.

**What could go wrong:** Making errors in calculating partial derivatives. Be meticulous! Each entry must be correct.

### ### Step 5: Constructing the Linearized System

**Plain English:** Now we put it all together. We start with our original nonlinear system. We know that near an equilibrium point, the nonlinear function can be approximated by its linear Taylor expansion. Since the system doesn't change at the equilibrium point itself, the only changes we need to consider are due to small deviations from that point. This gives us a new, simpler system that describes these small deviations.

**Small Concrete Example:** Let's use the general form. We have $\frac{d\mathbf{x}}{dt} = \mathbf{f}(\mathbf{x})$.
Let $\mathbf{x} = \mathbf{x}_0 + \mathbf{y}$, where $\mathbf{y}$ is the small perturbation from the equilibrium point $\mathbf{x}_0$.
Then $\frac{d\mathbf{x}}{dt} = \frac{d}{dt}(\mathbf{x}_0 + \mathbf{y}) = \frac{d\mathbf{x}_0}{dt} + \frac{d\mathbf{y}}{dt}$. Since $\mathbf{x}_0$ is a constant equilibrium point, $\frac{d\mathbf{x}_0}{dt} = \mathbf{0}$.
So, $\frac{d\mathbf{x}}{dt} = \frac{d\mathbf{y}}{dt}$.
Now, substitute $\mathbf{x} = \mathbf{x}_0 + \mathbf{y}$ into the original system and use the Taylor approximation from Step 3:
$$ \frac{d\mathbf{y}}{dt} = \mathbf{f}(\mathbf{x}_0 + \mathbf{y}) \approx \mathbf{f}(\mathbf{x}_0) + J(\mathbf{x}_0)\mathbf{y} $$
Since $\mathbf{x}_0$ is an equilibrium point, we know $\mathbf{f}(\mathbf{x}_0) = \mathbf{0}$.
Therefore, the linearized system becomes:
$$ \frac{d\mathbf{y}}{dt} = J(\mathbf{x}_0)\mathbf{y} $$
This is a linear system of ODEs with constant coefficients, which we know how to solve!

**Formal/Mathematical Version:** Given the system $\frac{d\mathbf{x}}{dt} = \mathbf{f}(\mathbf{x})$ and an equilibrium point $\mathbf{x}_0$ such that $\mathbf{f}(\mathbf{x}_0) = \mathbf{0}$.
Let $\mathbf{y} = \mathbf{x} - \mathbf{x}_0$ be the perturbation vector. Then $\mathbf{x} = \mathbf{x}_0 + \mathbf{y}$.
Differentiating with respect to $t$:
$$ \frac{d\mathbf{x}}{dt} = \frac{d}{dt}(\mathbf{x}_0 + \mathbf{y}) = \frac{d\mathbf{x}_0}{dt} + \frac{d\mathbf{y}}{dt} = \mathbf{0} + \frac{d\mathbf{y}}{dt} = \frac{d\mathbf{y}}{dt} $$
Substituting into the original system:
$$ \frac{d\mathbf{y}}{dt} = \mathbf{f}(\mathbf{x}_0 + \mathbf{y}) $$
Using the first-order Taylor expansion of $\mathbf{f}$ around $\mathbf{x}_0$:
$$ \mathbf{f}(\mathbf{x}_0 + \mathbf{y}) = \mathbf{f}(\mathbf{x}_0) + J(\mathbf{x}_0)\mathbf{y} + O(||\mathbf{y}||^2) $$
Since $\mathbf{f}(\mathbf{x}_0) = \mathbf{0}$ and neglecting the higher-order terms $O(||\mathbf{y}||^2)$ for small $\mathbf{y}$, we obtain the linearized system:
$$ \frac{d\mathbf{y}}{dt} = J(\mathbf{x}_0)\mathbf{y} $$

**What could go wrong:** Forgetting the coordinate shift $\mathbf{y} = \mathbf{x} - \mathbf{x}_0$. This shift is crucial because it centers the system at the equilibrium point, making $\mathbf{f}(\mathbf{x}_0)$ disappear and simplifying the linearized system to a homogeneous one.

### ### Step 6: Analyzing the Linearized System

**Plain English:** We now have a simple linear system $\frac{d\mathbf{y}}{dt} = A\mathbf{y}$ (where $A = J(\mathbf{x}_0)$ is a constant matrix). The behavior of this linear system around the origin (which corresponds to the equilibrium point $\mathbf{x}_0$ in the original system) tells us a lot about the behavior of the *original nonlinear system* near $\mathbf{x}_0$. Specifically, we look at the eigenvalues of the matrix $A$.

**Small Concrete Example:** If the linearized system is $\frac{d\mathbf{y}}{dt} = \begin{pmatrix} -1 & 0 \\ 0 & -2 \end{pmatrix}\mathbf{y}$, the eigenvalues are $\lambda_1 = -1$ and $\lambda_2 = -2$. Since both eigenvalues are real and negative, the origin (and thus the original equilibrium point) is a stable node. Any small perturbation $\mathbf{y}$ will decay to zero, meaning the system returns to $\mathbf{x}_0$. If an eigenvalue had a positive real part, it would indicate instability.

**Formal/Mathematical Version:** The solutions to the linear system $\frac{d\mathbf{y}}{dt} = J(\mathbf{x}_0)\mathbf{y}$ are determined by the eigenvalues of the matrix $J(\mathbf{x}_0)$.
Let $\lambda_1, \lambda_2, \dots, \lambda_n$ be the eigenvalues of $J(\mathbf{x}_0)$.
*   If all eigenvalues have **negative real parts** (i.e., $\text{Re}(\lambda_i) < 0$ for all $i$), then the equilibrium point $\mathbf{x}_0$ is **locally asymptotically stable**. This means solutions starting near $\mathbf{x}_0$ will approach $\mathbf{x}_0$ as $t \to \infty$.
*   If at least one eigenvalue has a **positive real part** (i.e., $\text{Re}(\lambda_i) > 0$ for at least one $i$), then the equilibrium point $\mathbf{x}_0$ is **unstable**. Solutions starting near $\mathbf{x}_0$ will move away from $\mathbf{x}_0$.
*   If all eigenvalues have **non-positive real parts**, but some have **zero real parts** (e.g., purely imaginary eigenvalues), then the linearization is **inconclusive**. The higher-order terms that we neglected might determine the stability, or the system might exhibit more complex behavior like limit cycles. This is where the Hartman-Grobman Theorem (mentioned in Section 7) comes into play, stating that the local phase portrait of the nonlinear system is qualitatively the same as the linearized system *unless* there are eigenvalues with zero real parts.

**What could go wrong:** Misinterpreting the eigenvalues (e.g., confusing stability with instability). Also, assuming that the stability of the linearized system tells you everything about the global behavior of the nonlinear system. It only provides *local* information.

## 5. Worked examples — multiple, with every step shown

### Example 1: Single 1D Nonlinear ODE

**Problem Statement:** Consider the logistic growth equation with harvesting:
$$ \frac{dx}{dt} = x(1-x) - hx $$
where $x$ is population size and $h$ is a harvesting rate. Linearize this system around its equilibrium points and determine their stability for $h = 0.5$.

**Given:** Nonlinear ODE $\frac{dx}{dt} = x(1-x) - hx$. We want to linearize around equilibrium points and analyze stability for $h=0.5$.

**Step 1: Rewrite the ODE as $\frac{dx}{dt} = f(x)$**
$$ f(x) = x(1-x) - hx $$
$$ f(x) = x - x^2 - hx $$
$$ f(x) = (1-h)x - x^2 $$
*Explanation: Expand and simplify the given function to make it easier for differentiation.*

**Step 2: Find the equilibrium points**
Set $f(x) = 0$:
$$ (1-h)x - x^2 = 0 $$
Factor out $x$:
$$ x(1-h-x) = 0 $$
This gives two equilibrium points:
$$ x_0 = 0 \quad \text{and} \quad x_1 = 1-h $$
*Explanation: Equilibrium points are where the rate of change is zero. We solve the algebraic equation $f(x)=0$ to find these points.*

**Step 3: Calculate the Jacobian (which is just $f'(x)$ for 1D systems)**
$$ f'(x) = \frac{d}{dx}((1-h)x - x^2) $$
$$ f'(x) = 1-h - 2x $$
*Explanation: For a 1D system, the Jacobian matrix is simply the first derivative of the function $f(x)$.*

**Step 4: Evaluate the Jacobian at each equilibrium point for $h=0.5$**
First, substitute $h=0.5$ into $f(x)$ and $f'(x)$:
$$ f(x) = (1-0.5)x - x^2 = 0.5x - x^2 $$
$$ f'(x) = 1-0.5 - 2x = 0.5 - 2x $$
Now, find the equilibrium points for $h=0.5$:
$$ x_0 = 0 $$
$$ x_1 = 1 - 0.5 = 0.5 $$
Evaluate $f'(x)$ at $x_0 = 0$:
$$ J(0) = f'(0) = 0.5 - 2(0) = 0.5 $$
Evaluate $f'(x)$ at $x_1 = 0.5$:
$$ J(0.5) = f'(0.5) = 0.5 - 2(0.5) = 0.5 - 1 = -0.5 $$
*Explanation: We substitute the value of $h$ and then each equilibrium point into the derivative to get a numerical value for the Jacobian at each point.*

**Step 5: Construct the linearized system and determine stability**
For a 1D system $\frac{dx}{dt} = f(x)$, the linearized system around an equilibrium point $x^*$ is $\frac{dy}{dt} = f'(x^*)y$, where $y = x - x^*$. The eigenvalue is simply $f'(x^*)$.

*   **For $x_0 = 0$:**
    The eigenvalue is $\lambda_0 = J(0) = 0.5$.
    Since $\text{Re}(\lambda_0) = 0.5 > 0$, this equilibrium point is **unstable**.
    *Explanation: A positive eigenvalue means solutions move away from the equilibrium.*

*   **For $x_1 = 0.5$:**
    The eigenvalue is $\lambda_1 = J(0.5) = -0.5$.
    Since $\text{Re}(\lambda_1) = -0.5 < 0$, this equilibrium point is **locally asymptotically stable**.
    *Explanation: A negative eigenvalue means solutions move towards the equilibrium.*

**Final Answer:**
For $h=0.5$:
*   The equilibrium point $x=0$ is **unstable**.
*   The equilibrium point $x=0.5$ is **locally asymptotically stable**.

**Reflection:** This example was straightforward because it was a 1D system. The Jacobian simplifies to a single derivative, and eigenvalues are just the value of that derivative. It clearly showed how the sign of the derivative at an equilibrium point dictates its stability.

---

### Example 2: 2D Nonlinear System (Predator-Prey without carrying capacity)

**Problem Statement:** Consider a simplified predator-prey system:
$$ \frac{dx}{dt} = x - xy $$
$$ \frac{dy}{dt} = xy - y $$
where $x$ is prey population and $y$ is predator population. Linearize this system around its equilibrium points and determine their stability.

**Given:** System of ODEs: $\frac{dx}{dt} = f_1(x,y) = x - xy$ and $\frac{dy}{dt} = f_2(x,y) = xy - y$.

**Step 1: Identify the functions $f_1(x,y)$ and $f_2(x,y)$**
$$ f_1(x,y) = x(1-y) $$
$$ f_2(x,y) = y(x-1) $$
*Explanation: This is already done for us, just noting the components of $\mathbf{f}(\mathbf{x})$.*

**Step 2: Find the equilibrium points**
Set $f_1(x,y) = 0$ and $f_2(x,y) = 0$:
$$ x(1-y) = 0 \quad (Eq. 1) $$
$$ y(x-1) = 0 \quad (Eq. 2) $$
From (Eq. 1), either $x=0$ or $y=1$.
*   **Case 1: $x=0$**
    Substitute $x=0$ into (Eq. 2):
    $$ y(0-1) = 0 \implies -y = 0 \implies y=0 $$
    This gives the equilibrium point $\mathbf{x}_0 = (0,0)$.
*   **Case 2: $y=1$**
    Substitute $y=1$ into (Eq. 2):
    $$ 1(x-1) = 0 \implies x-1 = 0 \implies x=1 $$
    This gives the equilibrium point $\mathbf{x}_1 = (1,1)$.
*Explanation: We solve the system of algebraic equations to find all points where both rates of change are zero. This involves considering different cases based on the factored forms.*

**Step 3: Calculate the Jacobian matrix $J(x,y)$**
$$ J(x,y) = \begin{pmatrix} \frac{\partial f_1}{\partial x} & \frac{\partial f_1}{\partial y} \\ \frac{\partial f_2}{\partial x} & \frac{\partial f_2}{\partial y} \end{pmatrix} $$
Calculate the partial derivatives:
$$ \frac{\partial f_1}{\partial x} = \frac{\partial}{\partial x}(x - xy) = 1 - y $$
$$ \frac{\partial f_1}{\partial y} = \frac{\partial}{\partial y}(x - xy) = -x $$
$$ \frac{\partial f_2}{\partial x} = \frac{\partial}{\partial x}(xy - y) = y $$
$$ \frac{\partial f_2}{\partial y} = \frac{\partial}{\partial y}(xy - y) = x - 1 $$
So, the Jacobian matrix is:
$$ J(x,y) = \begin{pmatrix} 1-y & -x \\ y & x-1 \end{pmatrix} $$
*Explanation: We compute each of the four partial derivatives as defined by the Jacobian matrix structure.*

**Step 4: Evaluate the Jacobian at each equilibrium point**

*   **For $\mathbf{x}_0 = (0,0)$:**
    $$ J(0,0) = \begin{pmatrix} 1-0 & -0 \\ 0 & 0-1 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} $$
*   **For $\mathbf{x}_1 = (1,1)$:**
    $$ J(1,1) = \begin{pmatrix} 1-1 & -1 \\ 1 & 1-1 \end{pmatrix} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} $$
*Explanation: Substitute the $x$ and $y$ coordinates of each equilibrium point into the general Jacobian matrix to get a constant matrix for each point.*

**Step 5: Determine the eigenvalues for each Jacobian matrix and analyze stability**

*   **For $\mathbf{x}_0 = (0,0)$:**
    The Jacobian is $A = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$.
    The eigenvalues are found by solving $\det(A - \lambda I) = 0$:
    $$ \det \begin{pmatrix} 1-\lambda & 0 \\ 0 & -1-\lambda \end{pmatrix} = (1-\lambda)(-1-\lambda) - (0)(0) = 0 $$
    $$ (1-\lambda)(-1-\lambda) = 0 $$
    This gives eigenvalues $\lambda_1 = 1$ and $\lambda_2 = -1$.
    Since one eigenvalue is positive ($\lambda_1 = 1 > 0$), the equilibrium point $(0,0)$ is **unstable**. (Specifically, it's a saddle point).
    *Explanation: We find the eigenvalues of the constant matrix. Because there's a positive real part, the equilibrium is unstable.*

*   **For $\mathbf{x}_1 = (1,1)$:**
    The Jacobian is $A = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$.
    The eigenvalues are found by solving $\det(A - \lambda I) = 0$:
    $$ \det \begin{pmatrix} -\lambda & -1 \\ 1 & -\lambda \end{pmatrix} = (-\lambda)(-\lambda) - (-1)(1) = 0 $$
    $$ \lambda^2 + 1 = 0 $$
    $$ \lambda^2 = -1 $$
    This gives eigenvalues $\lambda_1 = i$ and $\lambda_2 = -i$.
    Since both eigenvalues are purely imaginary ($\text{Re}(\lambda_1) = 0, \text{Re}(\lambda_2) = 0$), the linearization is **inconclusive**. The Hartman-Grobman theorem does not apply directly. For purely imaginary eigenvalues, the nonlinear terms determine stability (it could be a center, or a stable/unstable spiral). In this specific predator-prey system, it's known to be a center (stable oscillations) for the undamped case.
    *Explanation: Purely imaginary eigenvalues mean the linearized system exhibits oscillations. The stability of the nonlinear system cannot be determined solely from the linearization in this case.*

**Final Answer:**
*   The equilibrium point $(0,0)$ is **unstable** (a saddle point).
*   The equilibrium point $(1,1)$ is **inconclusive** based on linearization alone (purely imaginary eigenvalues).

**Reflection:** This example introduced a 2D system, requiring explicit calculation of a $2 \times 2$ Jacobian and its eigenvalues. The result for $(1,1)$ highlights a limitation of linearization: when eigenvalues have zero real parts, the method is inconclusive, and higher-order terms or other analytical techniques are needed.

---

### Example 3: 2D Nonlinear System (Damped Pendulum)

**Problem Statement:** Consider a damped pendulum system:
$$ \frac{d^2\theta}{dt^2} + k\frac{d\theta}{dt} + \frac{g}{L}\sin\theta = 0 $$
where $k > 0$ is the damping coefficient. Linearize this system around its equilibrium points and determine their stability. Assume $k=1$, $g/L=1$.

**Given:** Nonlinear ODE: $\frac{d^2\theta}{dt^2} + k\frac{d\theta}{dt} + \frac{g}{L}\sin\theta = 0$. We will use $k=1$, $g/L=1$.

**Step 1: Convert to a system of first-order ODEs**
Let $x_1 = \theta$ and $x_2 = \frac{d\theta}{dt}$.
Then:
$$ \frac{dx_1}{dt} = x_2 = f_1(x_1, x_2) $$
$$ \frac{dx_2}{dt} = -k\frac{d\theta}{dt} - \frac{g}{L}\sin\theta = -kx_2 - \frac{g}{L}\sin x_1 = f_2(x_1, x_2) $$
Substitute $k=1$ and $g/L=1$:
$$ f_1(x_1, x_2) = x_2 $$
$$ f_2(x_1, x_2) = -x_2 - \sin x_1 $$
*Explanation: A second-order ODE is converted into an equivalent system of two first-order ODEs by introducing new state variables. This is standard practice for analyzing higher-order systems.*

**Step 2: Find the equilibrium points**
Set $f_1(x_1, x_2) = 0$ and $f_2(x_1, x_2) = 0$:
$$ x_2 = 0 \quad (Eq. 1) $$
$$ -x_2 - \sin x_1 = 0 \quad (Eq. 2) $$
From (Eq. 1), we have $x_2=0$.
Substitute $x_2=0$ into (Eq. 2):
$$ -0 - \sin x_1 = 0 \implies \sin x_1 = 0 $$
This means $x_1 = n\pi$ for any integer $n$.
So, the equilibrium points are $(n\pi, 0)$ for $n \in \mathbb{Z}$.
We will analyze the two distinct types of equilibrium points:
*   $\mathbf{x}_0 = (0,0)$ (pendulum hanging straight down)
*   $\mathbf{x}_1 = (\pi,0)$ (pendulum standing straight up)
*Explanation: We solve for the values of $x_1$ and $x_2$ where both derivatives are zero. The trigonometric function $\sin x_1$ leads to infinitely many solutions, but they fall into two distinct categories for stability analysis due to periodicity.*

**Step 3: Calculate the Jacobian matrix $J(x_1, x_2)$**
$$ J(x_1, x_2) = \begin{pmatrix} \frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} \\ \frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2} \end{pmatrix} $$
Calculate the partial derivatives:
$$ \frac{\partial f_1}{\partial x_1} = \frac{\partial}{\partial x_1}(x_2) = 0 $$
$$ \frac{\partial f_1}{\partial x_2} = \frac{\partial}{\partial x_2}(x_2) = 1 $$
$$ \frac{\partial f_2}{\partial x_1} = \frac{\partial}{\partial x_1}(-x_2 - \sin x_1) = -\cos x_1 $$
$$ \frac{\partial f_2}{\partial x_2} = \frac{\partial}{\partial x_2}(-x_2 - \sin x_1) = -1 $$
So, the Jacobian matrix is:
$$ J(x_1, x_2) = \begin{pmatrix} 0 & 1 \\ -\cos x_1 & -1 \end{pmatrix} $$
*Explanation: We meticulously compute each partial derivative from the system functions $f_1$ and $f_2$.*

**Step 4: Evaluate the Jacobian at each type of equilibrium point**

*   **For $\mathbf{x}_0 = (0,0)$ (and $(2n\pi, 0)$ in general):**
    $$ J(0,0) = \begin{pmatrix} 0 & 1 \\ -\cos(0) & -1 \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ -1 & -1 \end{pmatrix} $$
*   **For $\mathbf{x}_1 = (\pi,0)$ (and $((2n+1)\pi, 0)$ in general):**
    $$ J(\pi,0) = \begin{pmatrix} 0 & 1 \\ -\cos(\pi) & -1 \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ -(-1) & -1 \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ 1 & -1 \end{pmatrix} $$
*Explanation: Substitute the coordinates of the chosen equilibrium points into the general Jacobian matrix.*

**Step 5: Determine the eigenvalues for each Jacobian matrix and analyze stability**

*   **For $\mathbf{x}_0 = (0,0)$:**
    The Jacobian is $A = \begin{pmatrix} 0 & 1 \\ -1 & -1 \end{pmatrix}$.
    Characteristic equation $\det(A - \lambda I) = 0$:
    $$ \det \begin{pmatrix} -\lambda & 1 \\ -1 & -1-\lambda \end{pmatrix} = (-\lambda)(-1-\lambda) - (1)(-1) = 0 $$
    $$ \lambda^2 + \lambda + 1 = 0 $$
    Using the quadratic formula $\lambda = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$:
    $$ \lambda = \frac{-1 \pm \sqrt{1^2 - 4(1)(1)}}{2(1)} = \frac{-1 \pm \sqrt{1 - 4}}{2} = \frac{-1 \pm \sqrt{-3}}{2} = \frac{-1 \pm i\sqrt{3}}{2} $$
    The eigenvalues are $\lambda_1 = -\frac{1}{2} + i\frac{\sqrt{3}}{2}$ and $\lambda_2 = -\frac{1}{2} - i\frac{\sqrt{3}}{2}$.
    Both eigenvalues have negative real parts ($\text{Re}(\lambda) = -0.5 < 0$).
    Therefore, the equilibrium point $(0,0)$ is **locally asymptotically stable** (a stable spiral).
    *Explanation: Negative real parts mean the system returns to equilibrium. The imaginary parts indicate oscillatory behavior while returning.*

*   **For $\mathbf{x}_1 = (\pi,0)$:**
    The Jacobian is $A = \begin{pmatrix} 0 & 1 \\ 1 & -1 \end{pmatrix}$.
    Characteristic equation $\det(A - \lambda I) = 0$:
    $$ \det \begin{pmatrix} -\lambda & 1 \\ 1 & -1-\lambda \end{pmatrix} = (-\lambda)(-1-\lambda) - (1)(1) = 0 $$
    $$ \lambda^2 + \lambda - 1 = 0 $$
    Using the quadratic formula:
    $$ \lambda = \frac{-1 \pm \sqrt{1^2 - 4(1)(-1)}}{2(1)} = \frac{-1 \pm \sqrt{1 + 4}}{2} = \frac{-1 \pm \sqrt{5}}{2} $$
    The eigenvalues are $\lambda_1 = \frac{-1 + \sqrt{5}}{2}$ and $\lambda_2 = \frac{-1 - \sqrt{5}}{2}$.
    Numerically, $\sqrt{5} \approx 2.236$.
    $\lambda_1 \approx \frac{-1 + 2.236}{2} \approx 0.618$
    $\lambda_2 \approx \frac{-1 - 2.236}{2} \approx -1.618$
    Since one eigenvalue is positive ($\lambda_1 \approx 0.618 > 0$), the equilibrium point $(\pi,0)$ is **unstable** (a saddle point).
    *Explanation: A positive eigenvalue means solutions move away from equilibrium, making it unstable. The presence of both positive and negative real eigenvalues indicates a saddle point behavior.*

**Final Answer:**
For $k=1, g/L=1$:
*   The equilibrium points $(2n\pi, 0)$ (e.g., $(0,0)$) are **locally asymptotically stable** (stable spirals).
*   The equilibrium points $((2n+1)\pi, 0)$ (e.g., $(\pi,0)$) are **unstable** (saddle points).

**Reflection:** This example demonstrates how to handle a second-order ODE by converting it to a system, and how the physical interpretation (pendulum hanging down vs. standing up) aligns with the mathematical stability results. The presence of damping ($k>0$) is crucial, as an undamped pendulum would yield purely imaginary eigenvalues for the $(0,0)$ point, making it inconclusive.

---

### Example 4: 3D Nonlinear System (Setting up the Jacobian)

**Problem Statement:** Consider a simplified model of a chemical reaction with three interacting species $x, y, z$:
$$ \frac{dx}{dt} = -x + yz $$
$$ \frac{dy}{dt} = 1 - y - xz $$
$$ \frac{dz}{dt} = x^2 - z $$
Find the equilibrium points and set up the Jacobian matrix for linearization. (Do not perform eigenvalue analysis.)

**Given:** System of ODEs:
$f_1(x,y,z) = -x + yz$
$f_2(x,y,z) = 1 - y - xz$
$f_3(x,y,z) = x^2 - z$

**Step 1: Identify the functions $f_1, f_2, f_3$**
$$ f_1(x,y,z) = -x + yz $$
$$ f_2(x,y,z) = 1 - y - xz $$
$$ f_3(x,y,z) = x^2 - z $$
*Explanation: Just listing the components of the vector field $\mathbf{f}(\mathbf{x})$.*

**Step 2: Find the equilibrium points**
Set $f_1=0, f_2=0, f_3=0$:
$$ -x + yz = 0 \quad (Eq. 1) $$
$$ 1 - y - xz = 0 \quad (Eq. 2) $$
$$ x^2 - z = 0 \quad (Eq. 3) $$
From (Eq. 3), $z = x^2$.
Substitute $z=x^2$ into (Eq. 1):
$$ -x + y(x^2) = 0 $$
$$ x(-1 + yx) = 0 $$
This gives two possibilities: $x=0$ or $yx=1$.

*   **Case 1: $x=0$**
    If $x=0$, then from $z=x^2$, we get $z=0$.
    Substitute $x=0$ and $z=0$ into (Eq. 2):
    $$ 1 - y - (0)(0) = 0 \implies 1 - y = 0 \implies y=1 $$
    This gives the equilibrium point $\mathbf{x}_0 = (0,1,0)$.

*   **Case 2: $yx=1$**
    If $yx=1$, then $y = 1/x$. (Note: $x \neq 0$ in this case).
    Substitute $y=1/x$ and $z=x^2$ into (Eq. 2):
    $$ 1 - \frac{1}{x} - x(x^2) = 0 $$
    $$ 1 - \frac{1}{x} - x^3 = 0 $$
    Multiply by $x$ (since $x \neq 0$):
    $$ x - 1 - x^4 = 0 $$
    $$ x^4 - x + 1 = 0 $$
    This is a quartic equation. We need to find its real roots. Let $g(x) = x^4 - x + 1$.
    $g'(x) = 4x^3 - 1$. Setting $g'(x)=0$, we get $x^3 = 1/4$, so $x = (1/4)^{1/3} \approx 0.63$.
    $g''(x) = 12x^2 > 0$, so $x \approx 0.63$ is a global minimum.
    $g((1/4)^{1/3}) = (1/4)^{4/3} - (1/4)^{1/3} + 1 > 0$.
    Since the minimum value of $g(x)$ is positive, $g(x)$ has no real roots.
    Therefore, there are no equilibrium points from Case 2.

The only equilibrium point is $\mathbf{x}_0 = (0,1,0)$.
*Explanation: We systematically solve the system of nonlinear algebraic equations. This often involves substitution and careful handling of multiple cases. Sometimes, as here, a case might not yield any real solutions.*

**Step 3: Calculate the Jacobian matrix $J(x,y,z)$**
$$ J(x,y,z) = \begin{pmatrix} \frac{\partial f_1}{\partial x} & \frac{\partial f_1}{\partial y} & \frac{\partial f_1}{\partial z} \\ \frac{\partial f_2}{\partial x} & \frac{\partial f_2}{\partial y} & \frac{\partial f_2}{\partial z} \\ \frac{\partial f_3}{\partial x} & \frac{\partial f_3}{\partial y} & \frac{\partial f_3}{\partial z} \end{pmatrix} $$
Calculate the partial derivatives:
$$ \frac{\partial f_1}{\partial x} = -1 $$
$$ \frac{\partial f_1}{\partial y} = z $$
$$ \frac{\partial f_1}{\partial z} = y $$
$$ \frac{\partial f_2}{\partial x} = -z $$
$$ \frac{\partial f_2}{\partial y} = -1 $$
$$ \frac{\partial f_2}{\partial z} = -x $$
$$ \frac{\partial f_3}{\partial x} = 2x $$
$$ \frac{\partial f_3}{\partial y} = 0 $$
$$ \frac{\partial f_3}{\partial z} = -1 $$
So, the Jacobian matrix is:
$$ J(x,y,z) = \begin{pmatrix} -1 & z & y \\ -z & -1 & -x \\ 2x & 0 & -1 \end{pmatrix} $$
*Explanation: This is the most tedious part for higher dimensions, requiring careful and accurate computation of each partial derivative.*

**Step 4: Evaluate the Jacobian at the equilibrium point $\mathbf{x}_0 = (0,1,0)$**
Substitute $x=0, y=1, z=0$ into $J(x,y,z)$:
$$ J(0,1,0) = \begin{pmatrix} -1 & 0 & 1 \\ -0 & -1 & -0 \\ 2(0) & 0 & -1 \end{pmatrix} $$
$$ J(0,1,0) = \begin{pmatrix} -1 & 0 & 1 \\ 0 & -1 & 0 \\ 0 & 0 & -1 \end{pmatrix} $$
*Explanation: We substitute the coordinates of the found equilibrium point into the general Jacobian matrix to get a constant matrix.*

**Final Answer:**
*   The only equilibrium point is $\mathbf{x}_0 = (0,1,0)$.
*   The Jacobian matrix evaluated at this equilibrium point is:
    $$ \boxed{ J(0,1,0) = \begin{pmatrix} -1 & 0 & 1 \\ 0 & -1 & 0 \\ 0 & 0 & -1 \end{pmatrix} } $$

**Reflection:** This example demonstrates the process for a 3D system. The main challenges are solving the system of algebraic equations for equilibrium points (which can be very hard or even impossible analytically for more complex systems) and meticulously calculating the $3 \times 3$ Jacobian matrix. The eigenvalue analysis would then proceed by finding the roots of the characteristic polynomial $\det(J - \lambda I) = 0$, which for a $3 \times 3$ matrix involves solving a cubic equation. In this specific case, the matrix is upper triangular, so the eigenvalues are simply the diagonal entries: $\lambda_1 = -1, \lambda_2 = -1, \lambda_3 = -1$, indicating a stable equilibrium.

## 6. Common mistakes and traps

1.  **Forgetting to find all equilibrium points:** Nonlinear systems can have multiple equilibrium points. Missing one means you're not fully characterizing the system's behavior. Always thoroughly solve $\mathbf{f}(\mathbf{x}) = \mathbf{0}$.
2.  **Incorrectly computing partial derivatives:** The Jacobian matrix is built from partial derivatives. A single error here will lead to an incorrect Jacobian, wrong eigenvalues, and flawed stability analysis. Double-check every derivative.
3.  **Not evaluating the Jacobian at the equilibrium point:** The Jacobian is a function of $\mathbf{x}$. For linearization, it *must* be evaluated at each specific equilibrium point $\mathbf{x}_0$ to become a constant matrix $J(\mathbf{x}_0)$. Using $J(\mathbf{x})$ directly in the linearized system is incorrect.
4.  **Misinterpreting the meaning of the linearized system (local vs. global):** Linearization provides information about the system's behavior *only in a small neighborhood* around an equilibrium point. It cannot predict global phenomena like limit cycles, chaotic behavior, or what happens far from equilibrium.
5.  **Forgetting the coordinate shift:** The linearized system is $\frac{d\mathbf{y}}{dt} = J(\mathbf{x}_0)\mathbf{y}$, where $\mathbf{y} = \mathbf{x} - \mathbf{x}_0$. Forgetting this shift means you're analyzing perturbations around the origin, not around the actual equilibrium point $\mathbf{x}_0$.
6.  **Inconclusive cases (zero real part eigenvalues):** When the Jacobian's eigenvalues have zero real parts (e.g., purely imaginary eigenvalues), linearization is inconclusive. It does not provide definitive stability information, and relying on it can lead to incorrect conclusions. Higher-order terms or other methods are required.
7.  **Applying linearization to non-differentiable systems:** The Taylor series expansion requires the function $\mathbf{f}(\mathbf{x})$ to be differentiable at the equilibrium point. If the system has discontinuities or sharp corners, linearization might not be applicable.

## 7. Textbook-precise explanation

Consider an autonomous system of $n$ first-order ordinary differential equations given by:
$$ \frac{d\mathbf{x}}{dt} = \mathbf{f}(\mathbf{x}) $$
where $\mathbf{x} = (x_1, x_2, \dots, x_n)^T \in \mathbb{R}^n$ is the state vector and $\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^n$ is a vector-valued function, typically assumed to be continuously differentiable ($C^1$).

An **equilibrium point** (or fixed point, or critical point) $\mathbf{x}_0$ of the system is a constant solution such that $\mathbf{f}(\mathbf{x}_0) = \mathbf{0}$. If the system starts at $\mathbf{x}_0$, it remains there for all time.

To analyze the behavior of the system near an equilibrium point $\mathbf{x}_0$, we introduce a small perturbation $\mathbf{y}$ such that $\mathbf{x} = \mathbf{x}_0 + \mathbf{y}$. Here, $\mathbf{y}$ represents the deviation of the state from the equilibrium. Since $\mathbf{x}_0$ is a constant vector, its derivative with respect to time is zero: $\frac{d\mathbf{x}_0}{dt} = \mathbf{0}$. Thus, $\frac{d\mathbf{x}}{dt} = \frac{d\mathbf{y}}{dt}$.

Substituting $\mathbf{x} = \mathbf{x}_0 + \mathbf{y}$ into the original system, we get:
$$ \frac{d\mathbf{y}}{dt} = \mathbf{f}(\mathbf{x}_0 + \mathbf{y}) $$
Assuming $\mathbf{f}$ is continuously differentiable, we can expand $\mathbf{f}(\mathbf{x}_0 + \mathbf{y})$ using a multivariable Taylor series around $\mathbf{x}_0$:
$$ \mathbf{f}(\mathbf{x}_0 + \mathbf{y}) = \mathbf{f}(\mathbf{x}_0) + J(\mathbf{x}_0)\mathbf{y} + O(||\mathbf{y}||^2) $$
where $J(\mathbf{x}_0)$ is the **Jacobian matrix** of $\mathbf{f}$ evaluated at $\mathbf{x}_0$. The Jacobian matrix is an $n \times n$ matrix whose entries are given by $J_{ij}(\mathbf{x}) = \frac{\partial f_i}{\partial x_j}$. The term $O(||\mathbf{y}||^2)$ denotes terms of order $||\mathbf{y}||^2$ and higher, which become negligible for sufficiently small $||\mathbf{y}||$.

Since $\mathbf{x}_0$ is an equilibrium point, $\mathbf{f}(\mathbf{x}_0) = \mathbf{0}$. Neglecting the higher-order terms $O(||\mathbf{y}||^2)$ for small $\mathbf{y}$, the system simplifies to the **linearized system**:
$$ \frac{d\mathbf{y}}{dt} = J(\mathbf{x}_0)\mathbf{y} $$
This is a linear system of ODEs with constant coefficients, where $A = J(\mathbf{x}_0)$ is a constant matrix. The behavior of this linear system near the origin (which corresponds to the equilibrium point $\mathbf{x}_0$ in the original system) can be analyzed by examining the eigenvalues of $J(\mathbf{x}_0)$.

Let $\lambda_1, \dots, \lambda_n$ be the eigenvalues of $J(\mathbf{x}_0)$.
1.  If all eigenvalues have **negative real parts** ($\text{Re}(\lambda_i) < 0$ for all $i$), then $\mathbf{x}_0$ is a **locally asymptotically stable** equilibrium point. Solutions starting near $\mathbf{x}_0$ will approach $\mathbf{x}_0$ as $t \to \infty$.
2.  If at least one eigenvalue has a **positive real part** ($\text{Re}(\lambda_i) > 0$ for at least one $i$), then $\mathbf{x}_0$ is an **unstable** equilibrium point. Solutions starting near $\mathbf{x}_0$ will move away from $\mathbf{x}_0$.
3.  If all eigenvalues have non-positive real parts, but some have **zero real parts** ($\text{Re}(\lambda_i) = 0$ for some $i$), then the linearization is **inconclusive**. The stability of $\mathbf{x}_0$ cannot be determined solely from the linearized system, and higher-order terms or other methods are required.

This crucial connection between the stability of the linearized system and the original nonlinear system is formalized by the **Hartman-Grobman Theorem**. This theorem states that if $J(\mathbf{x}_0)$ has no eigenvalues with zero real part (i.e., $\mathbf{x}_0$ is a hyperbolic equilibrium point), then the local phase portrait of the nonlinear system near $\mathbf{x}_0$ is qualitatively the same (topologically conjugate) as the phase portrait of its linearized system.

**References:**
*   Strogatz, Steven H. *Nonlinear Dynamics and Chaos: With Applications to Physics, Biology, Chemistry, and Engineering*. 2nd ed., Westview Press, 2015. (Chapter 5: Linear Stability Analysis)
*   Perko, Lawrence. *Differential Equations and Dynamical Systems*. 3rd ed., Springer, 2001. (Chapter 2: Planar Autonomous Systems)

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the concept of local approximation for a 1D function. Imagine the curve is your nonlinear function, and the straight line is its linearization at a specific point.

```text
       ^ f(x)
       |
       |  /
       | /
       |/
       +------------------ (x_0, f(x_0))  <-- Equilibrium point
      /| \
     / |  \
    /  |   \
  --+--+----+------------- > x
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |
    |  |