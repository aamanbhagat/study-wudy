## 1. What it is — in plain English

Imagine you have a bunch of things changing over time, and how each thing changes depends not just on itself, but also on all the other things. For example, think about a group of planets orbiting a star: each planet's movement affects the gravitational pull on every other planet, and vice-versa. We want to predict where they'll all be in the future.

In mathematics, when we describe how something changes using equations involving its rate of change, we call them **Ordinary Differential Equations (ODEs)**. When we have several of these equations linked together, describing multiple interacting things, we call it a **system of ODEs**.

Now, often, these systems of ODEs are too complicated to solve perfectly with pen and paper. That's where **Runge-Kutta 4th Order (RK4)** comes in. It's a clever recipe, a numerical method, for making really good guesses about how these systems will evolve over small steps of time. Instead of finding an exact formula, it gives us a very accurate sequence of points that trace out the path of all the interacting things.

So, "RK4 for systems of ODEs" means using this smart guessing method to predict the future behavior of multiple interconnected elements whose rates of change depend on each other. It's like having a sophisticated fortune-teller for dynamic, interacting scenarios, giving you a highly reliable step-by-step prediction.

## 2. Why it matters — real-world applications

The ability to accurately simulate systems of ODEs is fundamental to understanding and predicting complex dynamic phenomena across almost all scientific and engineering disciplines. RK4 is a workhorse for these tasks due to its balance of accuracy and computational cost.

1.  **Aerospace Engineering (Rocket Trajectories & Satellite Orbits):** When launching a rocket or planning a satellite's orbit, you're dealing with a system of ODEs. The rocket's position ($x, y, z$) and velocity ($v_x, v_y, v_z$) in 3D space are governed by gravity, thrust, and atmospheric drag. Each of these six variables (position and velocity components) changes over time, and their rates of change are interdependent. RK4 is used by companies like **SpaceX** or **NASA** to precisely calculate trajectories, predict fuel consumption, and ensure accurate rendezvous maneuvers in space.

2.  **Physics (N-body Simulations & Classical Mechanics):** Simulating the gravitational interactions of multiple celestial bodies (e.g., planets, moons, asteroids) is a classic N-body problem, represented as a large system of ODEs. Astronomers use RK4 (or more advanced integrators based on similar principles) to model the evolution of star clusters, galaxies, or even predict asteroid impacts. In classical mechanics, analyzing coupled oscillators (e.g., two pendulums connected by a spring) or the motion of particles in complex force fields also relies on solving systems of ODEs numerically. This is crucial for understanding phenomena from molecular dynamics to the design of mechanical systems.

3.  **Biology & Chemistry (Population Dynamics & Reaction Kinetics):**
    *   **Population Dynamics:** Models like the Lotka-Volterra predator-prey equations describe how the populations of different species change over time due to their interactions. Ecologists use RK4 to simulate these models, helping them understand ecosystem stability, predict population booms and busts, and inform conservation strategies.
    *   **Chemical Reaction Kinetics:** In chemistry, the rates at which different chemical species react and change their concentrations are often described by systems of ODEs. For instance, in a complex catalytic process or atmospheric chemistry, many reactions happen simultaneously. Chemical engineers at companies like **BASF** or **DuPont** use numerical methods like RK4 to simulate these reaction networks, optimizing reactor design, predicting product yields, and understanding reaction pathways.

## 3. Prerequisites — what you must know first

Before diving deep into RK4 for systems, ensure you have a solid grasp of the following concepts. If any of these feel unfamiliar, pause and review them first.

*   **Differential Equations (DEs):** An equation that relates a function with its derivatives. It describes how a quantity changes.
*   **Ordinary Differential Equations (ODEs):** A type of DE where the unknown function depends on only one independent variable (e.g., time $t$).
*   **Initial Value Problems (IVPs):** An ODE along with a specified value of the unknown function at a given point (the "initial condition"). This ensures a unique solution.
*   **Systems of ODEs:** A set of two or more ODEs that are coupled, meaning the rate of change of one variable depends on other variables in the system. Often written in vector form.
*   **Higher-Order ODEs:** ODEs involving second derivatives ($y''$), third derivatives ($y'''$), etc. You should know how to convert these into a system of first-order ODEs.
*   **Vector Calculus Basics:** Understanding vectors, vector addition, scalar multiplication of vectors, and vector-valued functions.
*   **Numerical Methods for ODEs (Elementary):**
    *   **Euler's Method:** The simplest numerical method for ODEs. It approximates the next point using the current slope. Understanding its limitations (accuracy, stability) is helpful.
    *   **Runge-Kutta 4th Order (RK4) for Single ODEs:** You should be familiar with the RK4 algorithm for a single equation $y' = f(t, y)$, including the calculation of the four $k$ values and the final weighted average. This lesson will generalize that concept.
*   **Basic Algebra and Calculus:** Differentiation, integration (conceptual understanding of what it means to "solve" a DE), and algebraic manipulation.

## 4. The core idea — step by step

The core idea behind RK4 for systems is a direct generalization of RK4 for a single ODE. Instead of tracking one variable, we're tracking a *vector* of variables, and all the "slopes" we calculate become *vectors* of slopes.

### Step 1: Understand a System of ODEs in Vector Form

**Plain-English Statement:** When you have multiple things changing, you can package all those "things" into a single mathematical list (a vector). Then, the rules for how they change can also be packaged into a single rule for how that entire list changes.

**Concrete Example:**
Consider a simple predator-prey model where $x(t)$ is the prey population and $y(t)$ is the predator population. Their interaction might be described by:
$$ \frac{dx}{dt} = 0.5x - 0.01xy $$
$$ \frac{dy}{dt} = -0.2y + 0.005xy $$
Here, $x$ and $y$ are coupled. The rate of change of $x$ depends on $y$, and vice-versa.

**Formal/Mathematical Version:**
We represent the system of $N$ first-order ODEs as a single vector ODE:
$$ \frac{d\mathbf{y}}{dt} = \mathbf{f}(t, \mathbf{y}) $$
where:
*   $\mathbf{y}(t) = \begin{pmatrix} y_1(t) \\ y_2(t) \\ \vdots \\ y_N(t) \end{pmatrix}$ is a vector of $N$ dependent variables.
*   $\frac{d\mathbf{y}}{dt} = \begin{pmatrix} dy_1/dt \\ dy_2/dt \\ \vdots \\ dy_N/dt \end{pmatrix}$ is a vector of their derivatives with respect to $t$.
*   $\mathbf{f}(t, \mathbf{y}) = \begin{pmatrix} f_1(t, y_1, \dots, y_N) \\ f_2(t, y_1, \dots, y_N) \\ \vdots \\ f_N(t, y_1, \dots, y_N) \end{pmatrix}$ is a vector-valued function that defines the rates of change for each component, potentially depending on $t$ and all current values of $y_i$.

For our predator-prey example, $\mathbf{y} = \begin{pmatrix} x \\ y \end{pmatrix}$ and $\mathbf{f}(t, \mathbf{y}) = \begin{pmatrix} 0.5x - 0.01xy \\ -0.2y + 0.005xy \end{pmatrix}$.

**What could go wrong:** Not correctly identifying the components of $\mathbf{y}$ and $\mathbf{f}$. Each $f_i$ function must correspond to $dy_i/dt$. Also, failing to convert higher-order ODEs (like $y'' = f(t, y, y')$) into a system of first-order ODEs first (e.g., by letting $y_1=y, y_2=y'$, so $y_1'=y_2, y_2'=f(t, y_1, y_2)$).

### Step 2: Recall RK4 for a Single ODE

**Plain-English Statement:** For a single changing quantity, RK4 takes four different "estimates" of how fast it's changing over a small time step. It then cleverly averages these estimates (giving more weight to the middle ones) to get a very accurate idea of the total change.

**Concrete Example:**
Suppose we want to solve $y' = t^2 - y$ with $y(0)=0.5$ and step size $h=0.1$.
To find $y(0.1)$, RK4 would calculate four slopes:
1.  Slope at the beginning.
2.  Slope at the midpoint, using the first slope to guess the value there.
3.  Another slope at the midpoint, using the second slope to guess the value there.
4.  Slope at the end, using the third slope to guess the value there.
Then it combines them: $y_{n+1} = y_n + \frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)$.

**Formal/Mathematical Version:**
For $y' = f(t, y)$, to advance from $(t_n, y_n)$ to $(t_{n+1}, y_{n+1})$ with step size $h$:
$$ k_1 = f(t_n, y_n) $$
$$ k_2 = f(t_n + \frac{h}{2}, y_n + \frac{h}{2}k_1) $$
$$ k_3 = f(t_n + \frac{h}{2}, y_n + \frac{h}{2}k_2) $$
$$ k_4 = f(t_n + h, y_n + hk_3) $$
$$ y_{n+1} = y_n + \frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4) $$

**What could go wrong:** Forgetting the specific arguments for $f$ in $k_2, k_3, k_4$ (e.g., using $y_n$ instead of $y_n + \frac{h}{2}k_1$). The factors of $h/2$ and $h$ are crucial.

### Step 3: Generalize RK4 to a System (Vectorization)

**Plain-English Statement:** The beautiful thing is that the "smart averaging" idea works exactly the same way for vectors! Instead of calculating a single slope $k_1$, we calculate a *vector* of slopes $\mathbf{k}_1$, where each component tells us how fast a particular variable is changing. And when we "guess" the value at the midpoint, we add a vector of changes.

**Concrete Example:**
For our predator-prey system, $\mathbf{y} = \begin{pmatrix} x \\ y \end{pmatrix}$ and $\mathbf{f}(t, \mathbf{y}) = \begin{pmatrix} f_x(t,x,y) \\ f_y(t,x,y) \end{pmatrix}$.
The first "slope" calculation, $\mathbf{k}_1$, would be:
$$ \mathbf{k}_1 = \mathbf{f}(t_n, \mathbf{y}_n) = \begin{pmatrix} f_x(t_n, x_n, y_n) \\ f_y(t_n, x_n, y_n) \end{pmatrix} $$
This $\mathbf{k}_1$ is a vector. For example, if $x_n=100, y_n=10$, then $\mathbf{k}_1$ might be $\begin{pmatrix} 0.5(100) - 0.01(100)(10) \\ -0.2(10) + 0.005(100)(10) \end{pmatrix} = \begin{pmatrix} 50 - 10 \\ -2 + 5 \end{pmatrix} = \begin{pmatrix} 40 \\ 3 \end{pmatrix}$. This means at $(t_n, \mathbf{y}_n)$, $x$ is increasing at 40 units/time and $y$ is increasing at 3 units/time.

**Formal/Mathematical Version:**
The $k$ values now become vectors:
$$ \mathbf{k}_1 = \mathbf{f}(t_n, \mathbf{y}_n) $$
$$ \mathbf{k}_2 = \mathbf{f}(t_n + \frac{h}{2}, \mathbf{y}_n + \frac{h}{2}\mathbf{k}_1) $$
$$ \mathbf{k}_3 = \mathbf{f}(t_n + \frac{h}{2}, \mathbf{y}_n + \frac{h}{2}\mathbf{k}_2) $$
$$ \mathbf{k}_4 = \mathbf{f}(t_n + h, \mathbf{y}_n + h\mathbf{k}_3) $$
Notice the bolding: $\mathbf{k}_1, \mathbf{k}_2, \mathbf{k}_3, \mathbf{k}_4$ are all vectors. When we add $\frac{h}{2}\mathbf{k}_1$ to $\mathbf{y}_n$, it's vector addition.

**What could go wrong:** The most common mistake here is trying to apply the RK4 formulas component-wise without respecting the vector nature. For instance, calculating $k_{1,x}$ and $k_{1,y}$ separately, and then using $k_{1,x}$ in the $x$-component's $k_2$ calculation, but using $y_n + \frac{h}{2}k_{1,y}$ in the $y$-component's $k_2$ calculation. This is incorrect. The *entire vector* $\mathbf{y}_n + \frac{h}{2}\mathbf{k}_1$ is passed to $\mathbf{f}$ to get $\mathbf{k}_2$.

### Step 4: The RK4 Algorithm for Systems

**Plain-English Statement:** To take one step forward in time for all our interacting variables, we first figure out four "vector slopes" (each vector slope containing the individual slopes for every variable). Then, we combine these four vector slopes using the same 1-2-2-1 weighted average, and add that combined change to our current vector of variables to get the new vector of variables.

**Formal/Mathematical Version:**
Given an initial value problem $\frac{d\mathbf{y}}{dt} = \mathbf{f}(t, \mathbf{y})$ with $\mathbf{y}(t_0) = \mathbf{y}_0$, and a step size $h$:
To compute $\mathbf{y}_{n+1}$ from $(t_n, \mathbf{y}_n)$:
1.  Calculate the first vector slope:
    $$ \mathbf{k}_1 = \mathbf{f}(t_n, \mathbf{y}_n) $$
2.  Calculate the second vector slope (at midpoint, using $\mathbf{k}_1$ for estimate):
    $$ \mathbf{k}_2 = \mathbf{f}(t_n + \frac{h}{2}, \mathbf{y}_n + \frac{h}{2}\mathbf{k}_1) $$
3.  Calculate the third vector slope (at midpoint, using $\mathbf{k}_2$ for estimate):
    $$ \mathbf{k}_3 = \mathbf{f}(t_n + \frac{h}{2}, \mathbf{y}_n + \frac{h}{2}\mathbf{k}_2) $$
4.  Calculate the fourth vector slope (at endpoint, using $\mathbf{k}_3$ for estimate):
    $$ \mathbf{k}_4 = \mathbf{f}(t_n + h, \mathbf{y}_n + h\mathbf{k}_3) $$
5.  Update the state vector $\mathbf{y}$ to the next time step:
    $$ \mathbf{y}_{n+1} = \mathbf{y}_n + \frac{h}{6}(\mathbf{k}_1 + 2\mathbf{k}_2 + 2\mathbf{k}_3 + \mathbf{k}_4) $$
    And update the time: $t_{n+1} = t_n + h$.

**What could go wrong:** Numerical precision issues if $h$ is too small (round-off error) or too large (truncation error). Incorrectly performing vector arithmetic (e.g., adding a scalar to a vector, or multiplying vectors component-wise when vector addition/scalar multiplication is needed).

### Step 5: Initial Conditions and Iteration

**Plain-English Statement:** You need to know where everything starts (initial conditions). Then, you just keep repeating the RK4 algorithm step-by-step, moving forward in time, until you reach the desired end time or number of steps. Each step gives you the new state of all variables.

**Concrete Example:**
If we start with $\mathbf{y}(0) = \begin{pmatrix} 100 \\ 10 \end{pmatrix}$ and $h=0.1$.
*   We calculate $\mathbf{y}(0.1)$ using the RK4 algorithm with $t_0=0, \mathbf{y}_0=\begin{pmatrix} 100 \\ 10 \end{pmatrix}$.
*   Then, to find $\mathbf{y}(0.2)$, we use $t_1=0.1, \mathbf{y}_1=\mathbf{y}(0.1)$ (the result from the previous step) and repeat the RK4 algorithm.
*   We continue this process for as many steps as needed.

**Formal/Mathematical Version:**
Given $\mathbf{y}(t_0) = \mathbf{y}_0$.
For $n = 0, 1, 2, \dots, N-1$:
1.  Set $t_n$ and $\mathbf{y}_n$.
2.  Compute $\mathbf{k}_1, \mathbf{k}_2, \mathbf{k}_3, \mathbf{k}_4$ using the formulas from Step 4.
3.  Compute $\mathbf{y}_{n+1} = \mathbf{y}_n + \frac{h}{6}(\mathbf{k}_1 + 2\mathbf{k}_2 + 2\mathbf{k}_3 + \mathbf{k}_4)$.
4.  Set $t_{n+1} = t_n + h$.
The desired solution is the sequence of points $(t_n, \mathbf{y}_n)$.

**What could go wrong:** Incorrectly using the previous step's $t$ and $\mathbf{y}$ values. Forgetting to update $t$ as well as $\mathbf{y}$.

## 5. Worked examples — multiple, with every step shown

We will use a step size $h=0.1$ for all examples for simplicity.

### Example 1: Simple Linear System

**Problem:** Solve the system of ODEs for one step from $t=0$ to $t=0.1$:
$$ \frac{dy_1}{dt} = y_2 $$
$$ \frac{dy_2}{dt} = -y_1 $$
with initial conditions $y_1(0)=0$ and $y_2(0)=1$.

**Given:**
*   System of ODEs: $\frac{d\mathbf{y}}{dt} = \mathbf{f}(t, \mathbf{y})$ where $\mathbf{y} = \begin{pmatrix} y_1 \\ y_2 \end{pmatrix}$ and $\mathbf{f}(t, \mathbf{y}) = \begin{pmatrix} y_2 \\ -y_1 \end{pmatrix}$.
*   Initial conditions: $t_0 = 0$, $\mathbf{y}_0 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$. So, $y_{1,0}=0, y_{2,0}=1$.
*   Step size: $h=0.1$.

**What we want:** $\mathbf{y}(0.1) = \begin{pmatrix} y_1(0.1) \\ y_2(0.1) \end{pmatrix}$.

**Step-by-step solution:**

1.  **Define $\mathbf{f}(t, \mathbf{y})$:**
    $$ \mathbf{f}(t, y_1, y_2) = \begin{pmatrix} y_2 \\ -y_1 \end{pmatrix} $$
    *This is the function that gives us the rates of change for $y_1$ and $y_2$ at any given $t, y_1, y_2$ combination.*

2.  **Calculate $\mathbf{k}_1$:**
    $$ \mathbf{k}_1 = \mathbf{f}(t_0, \mathbf{y}_0) = \mathbf{f}(0, 0, 1) $$
    $$ \mathbf{k}_1 = \begin{pmatrix} 1 \\ -0 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} $$
    *We evaluate the derivative function $\mathbf{f}$ at the starting point $(t_0, y_{1,0}, y_{2,0})$. This gives us the initial "slope vector".*

3.  **Calculate $\mathbf{k}_2$:**
    $$ \mathbf{k}_2 = \mathbf{f}(t_0 + \frac{h}{2}, \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_1) $$
    $$ t_0 + \frac{h}{2} = 0 + \frac{0.1}{2} = 0.05 $$
    $$ \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_1 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \frac{0.1}{2}\begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \begin{pmatrix} 0.05 \\ 0 \end{pmatrix} = \begin{pmatrix} 0.05 \\ 1 \end{pmatrix} $$
    $$ \mathbf{k}_2 = \mathbf{f}(0.05, 0.05, 1) = \begin{pmatrix} 1 \\ -0.05 \end{pmatrix} $$
    *We estimate the state at the midpoint using $\mathbf{k}_1$, then evaluate $\mathbf{f}$ at this estimated midpoint to get a second "slope vector".*

4.  **Calculate $\mathbf{k}_3$:**
    $$ \mathbf{k}_3 = \mathbf{f}(t_0 + \frac{h}{2}, \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_2) $$
    $$ t_0 + \frac{h}{2} = 0.05 $$
    $$ \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \frac{0.1}{2}\begin{pmatrix} 1 \\ -0.05 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \begin{pmatrix} 0.05 \\ -0.0025 \end{pmatrix} = \begin{pmatrix} 0.05 \\ 0.9975 \end{pmatrix} $$
    $$ \mathbf{k}_3 = \mathbf{f}(0.05, 0.05, 0.9975) = \begin{pmatrix} 0.9975 \\ -0.05 \end{pmatrix} $$
    *We estimate the state at the midpoint again, but this time using $\mathbf{k}_2$, and then evaluate $\mathbf{f}$ at this new estimated midpoint to get a third "slope vector".*

5.  **Calculate $\mathbf{k}_4$:**
    $$ \mathbf{k}_4 = \mathbf{f}(t_0 + h, \mathbf{y}_0 + h\mathbf{k}_3) $$
    $$ t_0 + h = 0 + 0.1 = 0.1 $$
    $$ \mathbf{y}_0 + h\mathbf{k}_3 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + 0.1\begin{pmatrix} 0.9975 \\ -0.05 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \begin{pmatrix} 0.09975 \\ -0.005 \end{pmatrix} = \begin{pmatrix} 0.09975 \\ 0.995 \end{pmatrix} $$
    $$ \mathbf{k}_4 = \mathbf{f}(0.1, 0.09975, 0.995) = \begin{pmatrix} 0.995 \\ -0.09975 \end{pmatrix} $$
    *We estimate the state at the endpoint using $\mathbf{k}_3$, then evaluate $\mathbf{f}$ at this estimated endpoint to get the final "slope vector".*

6.  **Calculate $\mathbf{y}_1$ (the next state vector):**
    $$ \mathbf{y}_1 = \mathbf{y}_0 + \frac{h}{6}(\mathbf{k}_1 + 2\mathbf{k}_2 + 2\mathbf{k}_3 + \mathbf{k}_4) $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \frac{0.1}{6}\left( \begin{pmatrix} 1 \\ 0 \end{pmatrix} + 2\begin{pmatrix} 1 \\ -0.05 \end{pmatrix} + 2\begin{pmatrix} 0.9975 \\ -0.05 \end{pmatrix} + \begin{pmatrix} 0.995 \\ -0.09975 \end{pmatrix} \right) $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \frac{0.1}{6}\left( \begin{pmatrix} 1 \\ 0 \end{pmatrix} + \begin{pmatrix} 2 \\ -0.1 \end{pmatrix} + \begin{pmatrix} 1.995 \\ -0.1 \end{pmatrix} + \begin{pmatrix} 0.995 \\ -0.09975 \end{pmatrix} \right) $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \frac{0.1}{6}\begin{pmatrix} 1+2+1.995+0.995 \\ 0-0.1-0.1-0.09975 \end{pmatrix} $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \frac{0.1}{6}\begin{pmatrix} 5.99 \\ -0.29975 \end{pmatrix} $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \begin{pmatrix} 0.0998333\dots \\ -0.0049958\dots \end{pmatrix} $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 0.0998333\dots \\ 0.9950041\dots \end{pmatrix} $$
    *We combine the weighted slope vectors and add the total change to our initial state vector to get the solution at $t=0.1$.*

**Final Answer:**
$$ \mathbf{y}(0.1) \approx \boxed{\begin{pmatrix} 0.09983 \\ 0.99500 \end{pmatrix}} $$

**Reflection:** This example was relatively easy because the function $\mathbf{f}$ did not depend on $t$ explicitly, and its components were simple linear functions of $y_1$ and $y_2$. The exact solution for this system is $y_1(t) = \sin(t)$ and $y_2(t) = \cos(t)$. At $t=0.1$, the exact values are $y_1(0.1) = \sin(0.1) \approx 0.0998334$ and $y_2(0.1) = \cos(0.1) \approx 0.9950042$. Our RK4 approximation is extremely close, highlighting its accuracy.

### Example 2: Predator-Prey Model (Lotka-Volterra)

**Problem:** Solve the Lotka-Volterra predator-prey system for one step from $t=0$ to $t=0.1$:
$$ \frac{dx}{dt} = 0.5x - 0.01xy $$
$$ \frac{dy}{dt} = -0.2y + 0.005xy $$
with initial conditions $x(0)=100$ and $y(0)=10$.

**Given:**
*   System of ODEs: $\frac{d\mathbf{y}}{dt} = \mathbf{f}(t, \mathbf{y})$ where $\mathbf{y} = \begin{pmatrix} x \\ y \end{pmatrix}$ and $\mathbf{f}(t, \mathbf{y}) = \begin{pmatrix} 0.5x - 0.01xy \\ -0.2y + 0.005xy \end{pmatrix}$.
*   Initial conditions: $t_0 = 0$, $\mathbf{y}_0 = \begin{pmatrix} 100 \\ 10 \end{pmatrix}$. So, $x_0=100, y_0=10$.
*   Step size: $h=0.1$.

**What we want:** $\mathbf{y}(0.1) = \begin{pmatrix} x(0.1) \\ y(0.1) \end{pmatrix}$.

**Step-by-step solution:**

1.  **Define $\mathbf{f}(t, \mathbf{y})$:**
    $$ \mathbf{f}(t, x, y) = \begin{pmatrix} 0.5x - 0.01xy \\ -0.2y + 0.005xy \end{pmatrix} $$
    *This function defines the rates of change for prey ($x$) and predator ($y$) populations based on their current numbers.*

2.  **Calculate $\mathbf{k}_1$:**
    $$ \mathbf{k}_1 = \mathbf{f}(t_0, \mathbf{y}_0) = \mathbf{f}(0, 100, 10) $$
    $$ \mathbf{k}_1 = \begin{pmatrix} 0.5(100) - 0.01(100)(10) \\ -0.2(10) + 0.005(100)(10) \end{pmatrix} = \begin{pmatrix} 50 - 10 \\ -2 + 5 \end{pmatrix} = \begin{pmatrix} 40 \\ 3 \end{pmatrix} $$
    *At the start, prey are increasing rapidly, and predators are also increasing.*

3.  **Calculate $\mathbf{k}_2$:**
    $$ \mathbf{k}_2 = \mathbf{f}(t_0 + \frac{h}{2}, \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_1) $$
    $$ t_0 + \frac{h}{2} = 0 + 0.05 = 0.05 $$
    $$ \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_1 = \begin{pmatrix} 100 \\ 10 \end{pmatrix} + 0.05\begin{pmatrix} 40 \\ 3 \end{pmatrix} = \begin{pmatrix} 100 \\ 10 \end{pmatrix} + \begin{pmatrix} 2 \\ 0.15 \end{pmatrix} = \begin{pmatrix} 102 \\ 10.15 \end{pmatrix} $$
    $$ \mathbf{k}_2 = \mathbf{f}(0.05, 102, 10.15) = \begin{pmatrix} 0.5(102) - 0.01(102)(10.15) \\ -0.2(10.15) + 0.005(102)(10.15) \end{pmatrix} $$
    $$ \mathbf{k}_2 = \begin{pmatrix} 51 - 10.353 \\ -2.03 + 5.1765 \end{pmatrix} = \begin{pmatrix} 40.647 \\ 3.1465 \end{pmatrix} $$
    *Using the initial growth rates to estimate the midpoint populations, we find the rates of change are still positive for both.*

4.  **Calculate $\mathbf{k}_3$:**
    $$ \mathbf{k}_3 = \mathbf{f}(t_0 + \frac{h}{2}, \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_2) $$
    $$ t_0 + \frac{h}{2} = 0.05 $$
    $$ \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_2 = \begin{pmatrix} 100 \\ 10 \end{pmatrix} + 0.05\begin{pmatrix} 40.647 \\ 3.1465 \end{pmatrix} = \begin{pmatrix} 100 \\ 10 \end{pmatrix} + \begin{pmatrix} 2.03235 \\ 0.157325 \end{pmatrix} = \begin{pmatrix} 102.03235 \\ 10.157325 \end{pmatrix} $$
    $$ \mathbf{k}_3 = \mathbf{f}(0.05, 102.03235, 10.157325) = \begin{pmatrix} 0.5(102.03235) - 0.01(102.03235)(10.157325) \\ -0.2(10.157325) + 0.005(102.03235)(10.157325) \end{pmatrix} $$
    $$ \mathbf{k}_3 = \begin{pmatrix} 51.016175 - 10.3666 \\ -2.031465 + 5.1833 \end{pmatrix} = \begin{pmatrix} 40.649575 \\ 3.151835 \end{pmatrix} $$
    *A refined estimate of midpoint populations leads to slightly different growth rates, but still positive.*

5.  **Calculate $\mathbf{k}_4$:**
    $$ \mathbf{k}_4 = \mathbf{f}(t_0 + h, \mathbf{y}_0 + h\mathbf{k}_3) $$
    $$ t_0 + h = 0.1 $$
    $$ \mathbf{y}_0 + h\mathbf{k}_3 = \begin{pmatrix} 100 \\ 10 \end{pmatrix} + 0.1\begin{pmatrix} 40.649575 \\ 3.151835 \end{pmatrix} = \begin{pmatrix} 100 \\ 10 \end{pmatrix} + \begin{pmatrix} 4.0649575 \\ 0.3151835 \end{pmatrix} = \begin{pmatrix} 104.0649575 \\ 10.3151835 \end{pmatrix} $$
    $$ \mathbf{k}_4 = \mathbf{f}(0.1, 104.0649575, 10.3151835) = \begin{pmatrix} 0.5(104.0649575) - 0.01(104.0649575)(10.3151835) \\ -0.2(10.3151835) + 0.005(104.0649575)(10.3151835) \end{pmatrix} $$
    $$ \mathbf{k}_4 = \begin{pmatrix} 52.03247875 - 10.7356 \\ -2.0630367 + 5.3678 \end{pmatrix} = \begin{pmatrix} 41.29687875 \\ 3.3047633 \end{pmatrix} $$
    *Finally, we estimate the endpoint populations using the third growth rate, and calculate the rates of change at this estimated endpoint.*

6.  **Calculate $\mathbf{y}_1$ (the next state vector):**
    $$ \mathbf{y}_1 = \mathbf{y}_0 + \frac{h}{6}(\mathbf{k}_1 + 2\mathbf{k}_2 + 2\mathbf{k}_3 + \mathbf{k}_4) $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 100 \\ 10 \end{pmatrix} + \frac{0.1}{6}\left( \begin{pmatrix} 40 \\ 3 \end{pmatrix} + 2\begin{pmatrix} 40.647 \\ 3.1465 \end{pmatrix} + 2\begin{pmatrix} 40.649575 \\ 3.151835 \end{pmatrix} + \begin{pmatrix} 41.29687875 \\ 3.3047633 \end{pmatrix} \right) $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 100 \\ 10 \end{pmatrix} + \frac{0.1}{6}\left( \begin{pmatrix} 40 \\ 3 \end{pmatrix} + \begin{pmatrix} 81.294 \\ 6.293 \end{pmatrix} + \begin{pmatrix} 81.29915 \\ 6.30367 \end{pmatrix} + \begin{pmatrix} 41.29687875 \\ 3.3047633 \end{pmatrix} \right) $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 100 \\ 10 \end{pmatrix} + \frac{0.1}{6}\begin{pmatrix} 40+81.294+81.29915+41.29687875 \\ 3+6.293+6.30367+3.3047633 \end{pmatrix} $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 100 \\ 10 \end{pmatrix} + \frac{0.1}{6}\begin{pmatrix} 243.89002875 \\ 18.9014333 \end{pmatrix} $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 100 \\ 10 \end{pmatrix} + \begin{pmatrix} 4.06483381 \\ 0.31502388 \end{pmatrix} $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 104.06483381 \\ 10.31502388 \end{pmatrix} $$

**Final Answer:**
$$ \mathbf{y}(0.1) \approx \boxed{\begin{pmatrix} 104.0648 \\ 10.3150 \end{pmatrix}} $$
(Prey population $\approx 104.06$, Predator population $\approx 10.32$)

**Reflection:** This example was harder due to the non-linear terms ($xy$) in the derivative functions. This means the rates of change are more sensitive to the populations themselves. The calculations involved more decimal places and were more prone to arithmetic errors. The RK4 method effectively captures these complex interactions over the time step.

### Example 3: Damped Harmonic Oscillator (Second-Order ODE to System)

**Problem:** Solve the damped harmonic oscillator equation for one step from $t=0$ to $t=0.1$:
$$ y'' + 2y' + 10y = 0 $$
with initial conditions $y(0)=0$ and $y'(0)=1$.

**Given:**
*   Second-order ODE: $y'' + 2y' + 10y = 0$.
*   Initial conditions: $y(0)=0, y'(0)=1$.
*   Step size: $h=0.1$.

**What we want:** $y(0.1)$ and $y'(0.1)$.

**Step-by-step solution:**

1.  **Convert the second-order ODE to a system of first-order ODEs:**
    Let $y_1 = y$ and $y_2 = y'$.
    Then:
    $$ \frac{dy_1}{dt} = y' = y_2 $$
    $$ \frac{dy_2}{dt} = y'' = -2y' - 10y = -2y_2 - 10y_1 $$
    So, the system is:
    $$ \frac{d\mathbf{y}}{dt} = \mathbf{f}(t, \mathbf{y}) \quad \text{where} \quad \mathbf{y} = \begin{pmatrix} y_1 \\ y_2 \end{pmatrix} \quad \text{and} \quad \mathbf{f}(t, \mathbf{y}) = \begin{pmatrix} y_2 \\ -2y_2 - 10y_1 \end{pmatrix} $$
    *This is a crucial first step for any higher-order ODE. We transform it into the vector form that RK4 expects.*

2.  **Identify initial conditions for the system:**
    $t_0 = 0$, $\mathbf{y}_0 = \begin{pmatrix} y_1(0) \\ y_2(0) \end{pmatrix} = \begin{pmatrix} y(0) \\ y'(0) \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$. So, $y_{1,0}=0, y_{2,0}=1$.
    *We use the given initial conditions directly for our new system variables.*

3.  **Calculate $\mathbf{k}_1$:**
    $$ \mathbf{k}_1 = \mathbf{f}(t_0, \mathbf{y}_0) = \mathbf{f}(0, 0, 1) $$
    $$ \mathbf{k}_1 = \begin{pmatrix} 1 \\ -2(1) - 10(0) \end{pmatrix} = \begin{pmatrix} 1 \\ -2 \end{pmatrix} $$
    *The initial velocity is 1, and the initial acceleration is -2.*

4.  **Calculate $\mathbf{k}_2$:**
    $$ \mathbf{k}_2 = \mathbf{f}(t_0 + \frac{h}{2}, \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_1) $$
    $$ t_0 + \frac{h}{2} = 0.05 $$
    $$ \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_1 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + 0.05\begin{pmatrix} 1 \\ -2 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \begin{pmatrix} 0.05 \\ -0.1 \end{pmatrix} = \begin{pmatrix} 0.05 \\ 0.9 \end{pmatrix} $$
    $$ \mathbf{k}_2 = \mathbf{f}(0.05, 0.05, 0.9) = \begin{pmatrix} 0.9 \\ -2(0.9) - 10(0.05) \end{pmatrix} = \begin{pmatrix} 0.9 \\ -1.8 - 0.5 \end{pmatrix} = \begin{pmatrix} 0.9 \\ -2.3 \end{pmatrix} $$
    *At the estimated midpoint, the velocity is 0.9 and the acceleration is -2.3.*

5.  **Calculate $\mathbf{k}_3$:**
    $$ \mathbf{k}_3 = \mathbf{f}(t_0 + \frac{h}{2}, \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_2) $$
    $$ t_0 + \frac{h}{2} = 0.05 $$
    $$ \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + 0.05\begin{pmatrix} 0.9 \\ -2.3 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \begin{pmatrix} 0.045 \\ -0.115 \end{pmatrix} = \begin{pmatrix} 0.045 \\ 0.885 \end{pmatrix} $$
    $$ \mathbf{k}_3 = \mathbf{f}(0.05, 0.045, 0.885) = \begin{pmatrix} 0.885 \\ -2(0.885) - 10(0.045) \end{pmatrix} = \begin{pmatrix} 0.885 \\ -1.77 - 0.45 \end{pmatrix} = \begin{pmatrix} 0.885 \\ -2.22 \end{pmatrix} $$
    *A refined midpoint estimate gives velocity 0.885 and acceleration -2.22.*

6.  **Calculate $\mathbf{k}_4$:**
    $$ \mathbf{k}_4 = \mathbf{f}(t_0 + h, \mathbf{y}_0 + h\mathbf{k}_3) $$
    $$ t_0 + h = 0.1 $$
    $$ \mathbf{y}_0 + h\mathbf{k}_3 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + 0.1\begin{pmatrix} 0.885 \\ -2.22 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \begin{pmatrix} 0.0885 \\ -0.222 \end{pmatrix} = \begin{pmatrix} 0.0885 \\ 0.778 \end{pmatrix} $$
    $$ \mathbf{k}_4 = \mathbf{f}(0.1, 0.0885, 0.778) = \begin{pmatrix} 0.778 \\ -2(0.778) - 10(0.0885) \end{pmatrix} = \begin{pmatrix} 0.778 \\ -1.556 - 0.885 \end{pmatrix} = \begin{pmatrix} 0.778 \\ -2.441 \end{pmatrix} $$
    *At the estimated endpoint, velocity is 0.778 and acceleration is -2.441.*

7.  **Calculate $\mathbf{y}_1$ (the next state vector):**
    $$ \mathbf{y}_1 = \mathbf{y}_0 + \frac{h}{6}(\mathbf{k}_1 + 2\mathbf{k}_2 + 2\mathbf{k}_3 + \mathbf{k}_4) $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \frac{0.1}{6}\left( \begin{pmatrix} 1 \\ -2 \end{pmatrix} + 2\begin{pmatrix} 0.9 \\ -2.3 \end{pmatrix} + 2\begin{pmatrix} 0.885 \\ -2.22 \end{pmatrix} + \begin{pmatrix} 0.778 \\ -2.441 \end{pmatrix} \right) $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \frac{0.1}{6}\left( \begin{pmatrix} 1 \\ -2 \end{pmatrix} + \begin{pmatrix} 1.8 \\ -4.6 \end{pmatrix} + \begin{pmatrix} 1.77 \\ -4.44 \end{pmatrix} + \begin{pmatrix} 0.778 \\ -2.441 \end{pmatrix} \right) $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \frac{0.1}{6}\begin{pmatrix} 1+1.8+1.77+0.778 \\ -2-4.6-4.44-2.441 \end{pmatrix} $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \frac{0.1}{6}\begin{pmatrix} 5.348 \\ -13.481 \end{pmatrix} $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \begin{pmatrix} 0.0891333\dots \\ -0.2246833\dots \end{pmatrix} $$
    $$ \mathbf{y}_1 = \begin{pmatrix} 0.0891333\dots \\ 0.7753166\dots \end{pmatrix} $$

**Final Answer:**
$$ \mathbf{y}(0.1) \approx \boxed{\begin{pmatrix} 0.08913 \\ 0.77532 \end{pmatrix}} $$
(So, $y(0.1) \approx 0.08913$ and $y'(0.1) \approx 0.77532$)

**Reflection:** This example highlights the critical first step of converting a higher-order ODE into a system of first-order ODEs. Without this transformation, RK4 (or most standard numerical solvers) cannot be directly applied. The calculations are similar to previous examples but reinforce the importance of careful variable substitution. The exact solution for this system involves complex exponentials and trigonometric functions, which would be tedious to calculate by hand, again demonstrating the utility of numerical methods.

### Example 4: Three-Equation System with Time Dependence

**Problem:** Solve the system for one step from $t=0$ to $t=0.1$:
$$ \frac{dy_1}{dt} = y_2 + t $$
$$ \frac{dy_2}{dt} = y_3 - t $$
$$ \frac{dy_3}{dt} = y_1 + y_2 $$
with initial conditions $y_1(0)=1, y_2(0)=0, y_3(0)=1$.

**Given:**
*   System of ODEs: $\frac{d\mathbf{y}}{dt} = \mathbf{f}(t, \mathbf{y})$ where $\mathbf{y} = \begin{pmatrix} y_1 \\ y_2 \\ y_3 \end{pmatrix}$ and $\mathbf{f}(t, \mathbf{y}) = \begin{pmatrix} y_2 + t \\ y_3 - t \\ y_1 + y_2 \end{pmatrix}$.
*   Initial conditions: $t_0 = 0$, $\mathbf{y}_0 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}$. So, $y_{1,0}=1, y_{2,0}=0, y_{3,0}=1$.
*   Step size: $h=0.1$.

**What we want:** $\mathbf{y}(0.1) = \begin{pmatrix} y_1(0.1) \\ y_2(0.1) \\ y_3(0.1) \end{pmatrix}$.

**Step-by-step solution:**

1.  **Define $\mathbf{f}(t, \mathbf{y})$:**
    $$ \mathbf{f}(t, y_1, y_2, y_3) = \begin{pmatrix} y_2 + t \\ y_3 - t \\ y_1 + y_2 \end{pmatrix} $$
    *Our function now takes $t$ as an explicit argument and returns a 3-component vector.*

2.  **Calculate $\mathbf{k}_1$:**
    $$ \mathbf{k}_1 = \mathbf{f}(t_0, \mathbf{y}_0) = \mathbf{f}(0, 1, 0, 1) $$
    $$ \mathbf{k}_1 = \begin{pmatrix} 0 + 0 \\ 1 - 0 \\ 1 + 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix} $$
    *Initial rates of change for $y_1, y_2, y_3$.*

3.  **Calculate $\mathbf{k}_2$:**
    $$ \mathbf{k}_2 = \mathbf{f}(t_0 + \frac{h}{2}, \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_1) $$
    $$ t_0 + \frac{h}{2} = 0 + 0.05 = 0.05 $$
    $$ \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_1 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} + 0.05\begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} + \begin{pmatrix} 0 \\ 0.05 \\ 0.05 \end{pmatrix} = \begin{pmatrix} 1 \\ 0.05 \\ 1.05 \end{pmatrix} $$
    $$ \mathbf{k}_2 = \mathbf{f}(0.05, 1, 0.05, 1.05) = \begin{pmatrix} 0.05 + 0.05 \\ 1.05 - 0.05 \\ 1 + 0.05 \end{pmatrix} = \begin{pmatrix} 0.1 \\ 1 \\ 1.05 \end{pmatrix} $$
    *Estimated rates at the midpoint.*

4.  **Calculate $\mathbf{k}_3$:**
    $$ \mathbf{k}_3 = \mathbf{f}(t_0 + \frac{h}{2}, \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_2) $$
    $$ t_0 + \frac{h}{2} = 0.05 $$
    $$ \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_2 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} + 0.05\begin{pmatrix} 0.1 \\ 1 \\ 1.05 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} + \begin{pmatrix} 0.005 \\ 0.05 \\ 0.0525 \end{pmatrix} = \begin{pmatrix} 1.005 \\ 0.05 \\ 1.0525 \end{pmatrix} $$
    $$ \mathbf{k}_3 = \mathbf{f}(0.05, 1.005, 0.05, 1.0525) = \begin{pmatrix} 0.05 + 0.05 \\ 1.0525 - 0.05 \\ 1.005 + 0.05 \end{pmatrix} = \begin{pmatrix} 0.1 \\ 1.0025 \\ 1.055 \end{pmatrix} $$
    *Refined estimated rates at the midpoint.*

5.  **Calculate $\mathbf{k}_4$:**
    $$ \mathbf{k}_4 = \mathbf{f}(t_0 + h, \mathbf{y}_0 + h\mathbf{k}_3) $$
    $$ t_0 + h = 0.1 $$
    $$ \mathbf{y}_0 + h\mathbf{k}_3 = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} + 0.1\begin{pmatrix} 0.1 \\ 1.0025 \\ 1.055 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} + \begin{pmatrix} 0.01 \\ 0.10025 \\ 0.1055 \end{pmatrix} = \begin{pmatrix} 1.01 \\ 0.10025 \\ 1.1055 \end{pmatrix} $$
    $$ \mathbf{k}_4 = \mathbf{f}(0.1, 1.01, 0.10025, 1.1055) = \begin{pmatrix} 0.10025 + 0.1 \\ 1.1055 - 0.1 \\ 1.01 + 0.10025 \end{pmatrix} = \begin{pmatrix} 0.20025 \\ 1.0055 \\ 1.11025 \end{pmatrix} $$
    *Estimated rates at the endpoint.*

6.  **Calculate $\mathbf{y}_1$ (the next state vector):**
    $$ \mathbf{y}_1 = \mathbf{y}_0 + \frac{h}{6}(\mathbf{k}_1 + 2\mathbf{k}_2 + 2\mathbf{k}_3 + \mathbf{k}_4) $$
    $$ \mathbf{y}_1 = \begin{pmatrix