## 1. What it is — in plain English

Imagine you're trying to predict exactly where a toy rocket will go after you launch it. You don't care if it spins or tumbles, just where its center will be at any given moment. That's essentially what "Equations of motion — 3DOF point mass (trajectory analysis)" is all about.

"3DOF" means "three degrees of freedom." Think of it like this: your rocket can move forward/backward (one dimension), left/right (a second dimension), and up/down (a third dimension). It can't rotate or change its orientation; it just moves through space in these three directions. We're treating the rocket as if it were a tiny, invisible dot – a "point mass" – that has all the rocket's weight but no size or shape. This simplifies things immensely, as we don't have to worry about how air pushes on different parts of its body or how it might spin.

"Equations of motion" are simply the mathematical rules that tell us how this invisible dot moves. They connect the forces acting on the rocket (like the push from its engine, the pull of gravity, or the resistance from the air) to how it speeds up or slows down and changes direction.

Finally, "trajectory analysis" means using these equations to figure out the rocket's entire path – its "trajectory" – from the moment it launches until it lands or goes into orbit. It's like drawing a precise map of where the point mass will be at every second of its flight.

## 2. Why it matters — real-world applications

Understanding and applying 3DOF point mass equations are fundamental in aerospace engineering and physics, serving as the bedrock for more complex analyses.

1.  **Rocket Launch Trajectory Prediction:** Companies like **SpaceX** and **NASA** use these equations extensively to predict the path of their rockets (e.g., Falcon 9, SLS) from the launch pad into space. This initial analysis helps determine optimal launch windows, ascent profiles, fuel consumption, and ensures the rocket doesn't stray into populated areas. It's the first step in mission planning before more complex 6DOF (six degrees of freedom) models are used for detailed control.

2.  **Missile Guidance Systems:** For military applications, precisely predicting the trajectory of a missile is critical for hitting its target. The initial design and guidance algorithms for ballistic missiles often start with 3DOF point mass models to calculate range, impact point, and flight time, considering factors like atmospheric drag and Earth's rotation (though the latter often requires more advanced frames).

3.  **Satellite Orbit Insertion Planning:** When a rocket launches a satellite, these equations are used to calculate the exact velocity and position required to place the satellite into a specific orbit (e.g., Low Earth Orbit, Geostationary Orbit). Engineers at organizations like the **European Space Agency (ESA)** or companies like **Maxar Technologies** use these principles to plan the burn times and directions for upper stages to achieve the desired orbital parameters.

4.  **Atmospheric Re-entry Trajectory Analysis:** Planning the safe return of spacecraft (like the **Orion capsule** or **SpaceX's Starship**) involves understanding how they will decelerate and heat up as they plunge back into the atmosphere. 3DOF models help predict the re-entry corridor, peak heating rates, and landing locations, which are crucial for crew safety and vehicle integrity.

5.  **Ballistics and Sports Physics:** While not always "rocket science," the same principles apply. Analyzing the trajectory of a golf ball, a baseball, or an artillery shell uses 3DOF point mass models. Factors like air resistance, spin (which 3DOF doesn't model directly but can be approximated by modifying drag/lift coefficients), and initial velocity dictate its path. This is used in sports science to optimize equipment or in military ballistics to calculate firing solutions.

## 3. Prerequisites — what you must know first

To fully grasp the concepts of 3DOF point mass trajectory analysis, you should have a solid understanding of the following:

*   **Newton's Laws of Motion:** Especially the Second Law ($\sum \vec{F} = m \vec{a}$), which forms the core of all dynamics.
*   **Vector Calculus:** The ability to work with vectors for position ($\vec{r}$), velocity ($\vec{v}$), acceleration ($\vec{a}$), and forces ($\vec{F}$), including vector addition, subtraction, and differentiation.
*   **Basic Kinematics:** Understanding the relationships between position, velocity, and acceleration, particularly how they relate through differentiation and integration.
*   **Forces:** Knowledge of common forces like gravitational force, thrust (from an engine), and aerodynamic drag, and how to model their magnitudes and directions.
*   **Coordinate Systems:** Familiarity with Cartesian coordinate systems (x, y, z) and how to resolve vectors into their components within a chosen frame of reference.
*   **Differential Equations:** A basic understanding of what ordinary differential equations (ODEs) are, how they describe rates of change, and the concept of solving them (either analytically or numerically).
*   **Calculus Fundamentals:** Differentiation and integration, especially with respect to time, are essential for relating acceleration, velocity, and position.

## 4. The core idea — step by step

The core idea behind 3DOF point mass trajectory analysis is to use Newton's Second Law ($\vec{F} = m\vec{a}$) to describe how a rocket (treated as a point) moves under the influence of various forces. We break down the motion into three independent directions, allowing us to track its position and velocity over time.

### Step 1: Define the System and Coordinate System

*   **Plain English:** Before we can describe motion, we need a common reference point and a way to measure directions. Where is our "zero" point, and which way is "up," "north," and "east"?
*   **Concrete Example:** For a rocket launching from Cape Canaveral, Florida, we might choose the launch pad as our origin $(0,0,0)$. We could define the Z-axis as straight up (normal to the Earth's surface at the launch pad), the X-axis as North, and the Y-axis as East. This is an Earth-fixed, local vertical, local horizontal (LVLH) coordinate system. For short-duration flights or relative motion, we often approximate this as an inertial frame.
*   **Formal/Mathematical Version:** We establish an **inertial reference frame**, typically a Cartesian coordinate system $(x, y, z)$. The position of the point mass is given by the position vector $\vec{r} = x\hat{i} + y\hat{j} + z\hat{k}$. Its velocity is $\vec{v} = \dot{x}\hat{i} + \dot{y}\hat{j} + \dot{z}\hat{k}$, and its acceleration is $\vec{a} = \ddot{x}\hat{i} + \ddot{y}\hat{j} + \ddot{z}\hat{k}$.
*   **What could go wrong:** Choosing a non-inertial frame (one that is accelerating or rotating) without accounting for fictitious forces (like Coriolis or centrifugal forces) will lead to incorrect results. For long-duration or orbital flights, an Earth-Centered Inertial (ECI) frame is often preferred.

### Step 2: Identify All Forces Acting on the Point Mass

*   **Plain English:** What are all the pushes and pulls acting on our tiny rocket dot? We need to list them all and understand their direction and magnitude.
*   **Concrete Example:** For a rocket climbing through the atmosphere:
    1.  **Gravity:** Always pulling straight down towards the Earth's center.
    2.  **Thrust:** The force from the engine, pushing the rocket in the direction its nozzle is pointing.
    3.  **Aerodynamic Drag:** The resistance from the air, always opposing the rocket's direction of motion.
*   **Formal/Mathematical Version:** We sum all external forces acting on the point mass:
    $$ \sum \vec{F} = \vec{F}_g + \vec{F}_T + \vec{F}_D + \dots $$
    Where:
    *   $\vec{F}_g$ is the gravitational force.
    *   $\vec{F}_T$ is the thrust force.
    *   $\vec{F}_D$ is the aerodynamic drag force.
    *   ...and any other relevant forces (e.g., lift if the rocket has significant wings and angle of attack, or Coriolis/centrifugal if in a rotating frame).
*   **What could go wrong:** Forgetting to include a significant force (e.g., ignoring drag when the rocket is moving fast in dense atmosphere) or incorrectly modeling a force (e.g., assuming constant gravity over large altitude changes).

### Step 3: Apply Newton's Second Law

*   **Plain English:** Once we know all the forces, we use the fundamental rule that the total force acting on an object equals its mass times its acceleration.
*   **Concrete Example:** If our rocket has a total upward thrust of 100,000 Newtons, a downward gravity of 50,000 Newtons, and a downward drag of 10,000 Newtons, the net upward force is 40,000 Newtons. If the rocket's mass is 10,000 kg, its upward acceleration is 40,000 N / 10,000 kg = 4 m/s².
*   **Formal/Mathematical Version:**
    $$ \sum \vec{F} = m \vec{a} $$
    Here, $m$ is the instantaneous mass of the rocket, which can change over time as fuel is consumed. $\vec{a}$ is the acceleration vector.
*   **What could go wrong:** Assuming mass is constant when it's actually changing (e.g., a rocket burning fuel). This means $m$ might be a function of time, $m(t)$.

### Step 4: Decompose Forces and Acceleration into Components

*   **Plain English:** Since we're working in three dimensions (x, y, z), we need to break down our total force and acceleration into their individual components along each axis. This turns one vector equation into three separate scalar equations.
*   **Concrete Example:** If gravity acts purely in the negative Z direction, its components are $(0, 0, -F_g)$. If thrust is angled, say 30 degrees from the Z-axis in the X-Z plane, its components would involve $\sin(30^\circ)$ and $\cos(30^\circ)$. Drag always acts opposite to the velocity vector, so if $\vec{v} = (v_x, v_y, v_z)$, then $\vec{F}_D$ will have components proportional to $(-v_x, -v_y, -v_z)$.
*   **Formal/Mathematical Version:**
    $$ \sum F_x = m a_x $$
    $$ \sum F_y = m a_y $$
    $$ \sum F_z = m a_z $$
    Where $F_x, F_y, F_z$ are the sums of the x, y, z components of all individual forces, and $a_x, a_y, a_z$ are the components of the acceleration vector.
*   **What could go wrong:** Incorrectly resolving vector components using trigonometry. A common error is mixing up sine and cosine, or using the wrong angle relative to the chosen axes.

### Step 5: Formulate Differential Equations of Motion

*   **Plain English:** Acceleration is the rate at which velocity changes, and velocity is the rate at which position changes. So, we can rewrite our force equations in terms of how position changes over time. This gives us a set of equations that describe the motion.
*   **Concrete Example:** If we know that the net force in the x-direction is $F_x$, then $m \ddot{x} = F_x$. Similarly for y and z. These are second-order differential equations because they involve second derivatives of position with respect to time.
*   **Formal/Mathematical Version:** Since $a_x = \ddot{x}$, $a_y = \ddot{y}$, and $a_z = \ddot{z}$, we get:
    $$ m \ddot{x} = \sum F_x(x, y, z, \dot{x}, \dot{y}, \dot{z}, t) $$
    $$ m \ddot{y} = \sum F_y(x, y, z, \dot{x}, \dot{y}, \dot{z}, t) $$
    $$ m \ddot{z} = \sum F_z(x, y, z, \dot{x}, \dot{y}, \dot{z}, t) $$
    Notice that the forces themselves can be functions of position (e.g., gravity changes with altitude), velocity (e.g., drag depends on speed), and time (e.g., thrust might vary or engine cutoff). These are a set of coupled ordinary differential equations (ODEs).
*   **What could go wrong:** Incorrectly defining the functional dependencies of the forces (e.g., using a constant drag coefficient when it should vary with Mach number, or assuming constant thrust when it's actually decaying).

### Step 6: Solve the Differential Equations (Analytically or Numerically)

*   **Plain English:** Now that we have the equations describing how acceleration changes, we need to "undo" the differentiation to find out how velocity and then position change. This involves integration. For simple cases, we can do this directly. For complex real-world rockets, we usually need computers.
*   **Concrete Example:** If $m \ddot{z} = -mg$ (only gravity acting), then $\ddot{z} = -g$. Integrating once gives $\dot{z}(t) = -gt + C_1$. Integrating again gives $z(t) = -\frac{1}{2}gt^2 + C_1 t + C_2$. These are the familiar projectile motion equations. For more complicated force models (e.g., drag proportional to $v^2$), analytical solutions become very difficult or impossible, so we use numerical methods like Runge-Kutta.
*   **Formal/Mathematical Version:** We integrate the acceleration equations to find velocity, and then integrate velocity equations to find position:
    $$ \vec{v}(t) = \int \vec{a}(t) dt $$
    $$ \vec{r}(t) = \int \vec{v}(t) dt $$
    For complex systems, these integrals cannot be solved in closed form. Instead, we use numerical integration techniques (e.g., Euler's method, Runge-Kutta 4th order) to step through time, calculating the acceleration at each small time step $\Delta t$, then updating velocity, and then updating position.
*   **What could go wrong:** Incorrectly performing the integration steps, especially when dealing with variable mass or complex force functions. For numerical solutions, choosing too large a time step can lead to instability or inaccurate results.

### Step 7: Incorporate Initial Conditions

*   **Plain English:** To get a unique path for our rocket, we need to know where it started and how fast it was going at the very beginning. These are our "initial conditions."
*   **Concrete Example:** At the moment of launch ($t=0$), the rocket is at the launch pad, so its initial position is $(x_0, y_0, z_0) = (0,0,0)$. If it lifts off vertically, its initial velocity might be $\vec{v}_0 = (0, 0, v_{z0})$. These values are used to determine the constants of integration (like $C_1$ and $C_2$ from Step 6).
*   **Formal/Mathematical Version:** We specify the initial position vector $\vec{r}(t_0) = \vec{r}_0$ and the initial velocity vector $\vec{v}(t_0) = \vec{v}_0$. These are crucial for solving the differential equations and obtaining a specific trajectory.
*   **What could go wrong:** Forgetting to apply initial conditions, which would leave arbitrary constants in the solution, meaning you have a family of possible trajectories instead of a single, specific one.

## 5. Worked examples — multiple, with every step shown

### Example 1 (Easy): Projectile Motion (2DOF, constant gravity, no drag, constant mass)

**Problem Statement:** A small probe is launched from the ground with an initial velocity of $v_0 = 100 \text{ m/s}$ at an angle of $\theta = 30^\circ$ above the horizontal. Assuming constant gravitational acceleration $g = 9.81 \text{ m/s}^2$ and neglecting air resistance, find the equations for its position $(x(t), z(t))$ and velocity $(v_x(t), v_z(t))$ over time.

**What's Given:**
*   Initial velocity magnitude: $v_0 = 100 \text{ m/s}$
*   Launch angle: $\theta = 30^\circ$
*   Gravitational acceleration: $g = 9.81 \text{ m/s}^2$
*   Initial position: $(x_0, z_0) = (0,0)$
*   Mass: $m$ (constant, but not needed for acceleration since gravity is the only force)

**What We Want:**
*   Equations for $x(t), z(t), v_x(t), v_z(t)$.

**Solution:**

**Step 1: Define Coordinate System and Initial Conditions.**
We'll use a 2D Cartesian coordinate system: $x$ for horizontal distance, $z$ for vertical altitude. Origin $(0,0)$ at the launch point.

Initial velocity components:
$$ v_{x0} = v_0 \cos \theta = 100 \text{ m/s} \cdot \cos(30^\circ) = 100 \cdot \frac{\sqrt{3}}{2} = 50\sqrt{3} \approx 86.6 \text{ m/s} $$
$$ v_{z0} = v_0 \sin \theta = 100 \text{ m/s} \cdot \sin(30^\circ) = 100 \cdot \frac{1}{2} = 50 \text{ m/s} $$
Initial position:
$$ x_0 = 0 \text{ m} $$
$$ z_0 = 0 \text{ m} $$

**Step 2: Identify Forces.**
The only force acting on the projectile is gravity, which acts purely in the negative $z$ direction.
$$ \vec{F}_g = -mg\hat{k} $$
There is no force in the $x$ direction.

**Step 3: Apply Newton's Second Law and Decompose.**
$$ \sum \vec{F} = m\vec{a} $$
Decomposing into components:
In the $x$ direction:
$$ \sum F_x = m a_x $$
$$ 0 = m a_x $$
$$ a_x = 0 $$
*This means there is no acceleration in the horizontal direction.*

In the $z$ direction:
$$ \sum F_z = m a_z $$
$$ -mg = m a_z $$
$$ a_z = -g $$
*This means the acceleration in the vertical direction is constant and equal to $-g$.*

**Step 4: Formulate and Solve Differential Equations.**

For $x$-motion:
$$ a_x = \frac{dv_x}{dt} = 0 $$
Integrate once to find $v_x(t)$:
$$ \int dv_x = \int 0 \, dt $$
$$ v_x(t) = C_1 $$
*Integrating a constant gives a constant.*
Apply initial condition $v_x(0) = v_{x0}$:
$$ v_{x0} = C_1 $$
So,
$$ v_x(t) = v_{x0} = 50\sqrt{3} \text{ m/s} $$
*The horizontal velocity remains constant because there are no horizontal forces.*

Integrate again to find $x(t)$:
$$ \frac{dx}{dt} = v_x(t) = v_{x0} $$
$$ \int dx = \int v_{x0} \, dt $$
$$ x(t) = v_{x0} t + C_2 $$
*Integrating a constant velocity gives linear position change.*
Apply initial condition $x(0) = x_0$:
$$ x_0 = v_{x0}(0) + C_2 \implies C_2 = x_0 $$
So,
$$ x(t) = v_{x0} t + x_0 = (50\sqrt{3})t + 0 $$
$$ \boxed{x(t) = 50\sqrt{3}t \text{ m}} $$

For $z$-motion:
$$ a_z = \frac{dv_z}{dt} = -g $$
Integrate once to find $v_z(t)$:
$$ \int dv_z = \int -g \, dt $$
$$ v_z(t) = -gt + C_3 $$
*Integrating a constant acceleration gives linear velocity change.*
Apply initial condition $v_z(0) = v_{z0}$:
$$ v_{z0} = -g(0) + C_3 \implies C_3 = v_{z0} $$
So,
$$ v_z(t) = -gt + v_{z0} = -9.81t + 50 $$
$$ \boxed{v_z(t) = 50 - 9.81t \text{ m/s}} $$

Integrate again to find $z(t)$:
$$ \frac{dz}{dt} = v_z(t) = -gt + v_{z0} $$
$$ \int dz = \int (-gt + v_{z0}) \, dt $$
$$ z(t) = -\frac{1}{2}gt^2 + v_{z0}t + C_4 $$
*Integrating a linear velocity gives quadratic position change.*
Apply initial condition $z(0) = z_0$:
$$ z_0 = -\frac{1}{2}g(0)^2 + v_{z0}(0) + C_4 \implies C_4 = z_0 $$
So,
$$ z(t) = -\frac{1}{2}gt^2 + v_{z0}t + z_0 = -\frac{1}{2}(9.81)t^2 + 50t + 0 $$
$$ \boxed{z(t) = 50t - 4.905t^2 \text{ m}} $$

**Reflection:** This example is "easy" because gravity is constant, there's no air resistance, and mass is constant. This allows for direct analytical integration. The key is to correctly decompose initial velocity and then integrate acceleration twice with respect to time for each dimension, applying initial conditions at each step.

---

### Example 2 (Medium): Vertical Rocket Launch (1DOF, constant thrust, variable mass, constant gravity, no drag)

**Problem Statement:** A rocket launches vertically from rest. Its initial mass is $m_0 = 1000 \text{ kg}$. It burns fuel at a constant rate of $\dot{m} = 10 \text{ kg/s}$ for the first 50 seconds. The engine provides a constant thrust $T = 20,000 \text{ N}$. Assume constant gravitational acceleration $g = 9.81 \text{ m/s}^2$ and neglect air resistance. Find the equation for the rocket's vertical acceleration $a_z(t)$ during the burn phase.

**What's Given:**
*   Initial mass: $m_0 = 1000 \text{ kg}$
*   Mass flow rate: $\dot{m} = 10 \text{ kg/s}$
*   Burn duration: $t_{burn} = 50 \text{ s}$
*   Thrust: $T = 20,000 \text{ N}$
*   Gravitational acceleration: $g = 9.81 \text{ m/s}^2$
*   Initial velocity: $v_z(0) = 0 \text{ m/s}$ (from rest)
*   Initial position: $z(0) = 0 \text{ m}$ (from ground)

**What We Want:**
*   Equation for $a_z(t)$ during the burn phase ($0 \le t \le 50 \text{ s}$).

**Solution:**

**Step 1: Define Coordinate System and Initial Conditions.**
We'll use a 1D Cartesian coordinate system: $z$ for vertical altitude. Positive $z$ is upwards. Origin $(0)$ at the launch point.
Initial conditions: $z(0)=0$, $v_z(0)=0$.

**Step 2: Identify Forces.**
1.  **Thrust ($\vec{F}_T$):** Acts purely in the positive $z$ direction. Magnitude $T = 20,000 \text{ N}$.
2.  **Gravity ($\vec{F}_g$):** Acts purely in the negative $z$ direction. Magnitude $mg$.

**Step 3: Account for Variable Mass.**
The mass of the rocket changes over time due to fuel consumption.
The mass at time $t$ is:
$$ m(t) = m_0 - \dot{m}t $$
*The mass decreases linearly with time during the burn.*
Substitute the given values:
$$ m(t) = 1000 - 10t $$

**Step 4: Apply Newton's Second Law and Decompose (1D here).**
$$ \sum \vec{F} = m(t)\vec{a} $$
In the $z$ direction (our only dimension):
$$ \sum F_z = m(t) a_z $$
The forces in the $z$ direction are thrust (positive) and gravity (negative):
$$ T - m(t)g = m(t) a_z $$
*The net force is thrust minus gravity, and this equals the time-varying mass times acceleration.*

**Step 5: Formulate the Differential Equation for Acceleration.**
We want to solve for $a_z(t)$:
$$ a_z(t) = \frac{T - m(t)g}{m(t)} $$
Substitute the expression for $m(t)$:
$$ a_z(t) = \frac{T - (m_0 - \dot{m}t)g}{m_0 - \dot{m}t} $$
$$ a_z(t) = \frac{T}{m_0 - \dot{m}t} - g $$
*This is the differential equation for acceleration. It's an explicit function of time.*

Now, substitute the given numerical values:
$$ a_z(t) = \frac{20000}{1000 - 10t} - 9.81 $$
$$ \boxed{a_z(t) = \frac{2000}{100 - t} - 9.81 \text{ m/s}^2} $$
This equation is valid for $0 \le t \le 50 \text{ s}$.

**Reflection:** This example is "medium" because it introduces variable mass, which makes the acceleration a function of time, not a constant. This means direct application of constant acceleration kinematic equations is not possible. The key is to correctly model the mass as a function of time and then substitute it into Newton's Second Law. To find velocity and position, one would need to integrate this expression for $a_z(t)$, which would require specific integration techniques for the $\frac{1}{A-Bt}$ form (natural logarithm).

---

### Example 3 (Harder - Setup for Numerical Solution): 3DOF Rocket with Constant Thrust, Variable Mass, Constant Gravity, and Linear Drag

**Problem Statement:** A rocket with initial mass $m_0 = 5000 \text{ kg}$ burns fuel at a constant rate $\dot{m} = 25 \text{ kg/s}$. Its engine provides a constant thrust $T = 100,000 \text{ N}$. It launches at an angle of $60^\circ$ from the horizontal in the X-Z plane (i.e., initial velocity vector has no Y-component). Assume constant gravitational acceleration $g = 9.81 \text{ m/s}^2$ acting in the negative $z$ direction. The aerodynamic drag force is modeled as $F_D = k|\vec{v}|$, where $k = 50 \text{ Ns/m}$ is a constant drag coefficient and $|\vec{v}|$ is the magnitude of the velocity vector. Set up the coupled differential equations of motion for $x(t), y(t), z(t)$ that would be solved numerically.

**What's Given:**
*   Initial mass: $m_0 = 5000 \text{ kg}$
*   Mass flow rate: $\dot{m} = 25 \text{ kg/s}$
*   Thrust: $T = 100,000 \text{ N}$
*   Launch angle: $60^\circ$ from horizontal in X-Z plane.
*   Gravitational acceleration: $g = 9.81 \text{ m/s}^2$
*   Drag coefficient: $k = 50 \text{ Ns/m}$
*   Initial position: $(x_0, y_0, z_0) = (0,0,0)$
*   Initial velocity: $v_0 = 50 \text{ m/s}$ (let's assume a small initial velocity to ensure drag is present from the start, otherwise it's undefined at $v=0$).
    *   $v_{x0} = v_0 \cos(60^\circ) = 50 \cdot 0.5 = 25 \text{ m/s}$
    *   $v_{y0} = 0 \text{ m/s}$
    *   $v_{z0} = v_0 \sin(60^\circ) = 50 \cdot \frac{\sqrt{3}}{2} \approx 43.3 \text{ m/s}$

**What We Want:**
*   The three coupled second-order ordinary differential equations for $\ddot{x}, \ddot{y}, \ddot{z}$ in terms of $x, y, z, \dot{x}, \dot{y}, \dot{z}, t$.

**Solution:**

**Step 1: Define Coordinate System and Initial Conditions.**
We'll use a 3D Cartesian coordinate system $(x,y,z)$ with the origin at the launch site. Positive $z$ is upwards, $x$ is horizontal in the launch plane, $y$ is perpendicular to the launch plane.
Initial position: $\vec{r}(0) = (0,0,0)$.
Initial velocity: $\vec{v}(0) = (25, 0, 43.3) \text{ m/s}$.

**Step 2: Model Variable Mass.**
During the burn phase, the mass is:
$$ m(t) = m_0 - \dot{m}t = 5000 - 25t $$

**Step 3: Identify and Model Forces.**

1.  **Gravitational Force ($\vec{F}_g$):**
    Acts purely in the negative $z$ direction.
    $$ \vec{F}_g = -m(t)g \hat{k} = -(5000 - 25t)g \hat{k} $$
    Components: $F_{gx} = 0$, $F_{gy} = 0$, $F_{gz} = -(5000 - 25t)g$.

2.  **Thrust Force ($\vec{F}_T$):**
    The problem states the rocket launches at $60^\circ$ from horizontal in the X-Z plane. We need to assume the thrust vector *maintains* this direction relative to the chosen coordinate system (e.g., via thrust vectoring or fixed nozzle).
    Let $\alpha = 60^\circ$ be the angle with the x-axis.
    $$ \vec{F}_T = T \cos \alpha \hat{i} + T \sin \alpha \hat{k} $$
    $$ \vec{F}_T = 100000 \cos(60^\circ) \hat{i} + 100000 \sin(60^\circ) \hat{k} $$
    $$ \vec{F}_T = 50000 \hat{i} + 50000\sqrt{3} \hat{k} \approx 50000 \hat{i} + 86602.5 \hat{k} \text{ N} $$
    Components: $F_{Tx} = 50000$, $F_{Ty} = 0$, $F_{Tz} = 86602.5$.

3.  **Aerodynamic Drag Force ($\vec{F}_D$):**
    Drag always opposes the velocity vector.
    The velocity vector is $\vec{v} = v_x \hat{i} + v_y \hat{j} + v_z \hat{k}$.
    The magnitude of velocity is $|\vec{v}| = \sqrt{v_x^2 + v_y^2 + v_z^2}$.
    The unit vector in the direction of velocity is $\hat{v} = \frac{\vec{v}}{|\vec{v}|}$.
    The drag force is $F_D = k|\vec{v}|$.
    So, the drag vector is $\vec{F}_D = -F_D \hat{v} = -k|\vec{v}| \frac{\vec{v}}{|\vec{v}|} = -k\vec{v}$.
    *This simplification works for linear drag $F_D = k|\vec{v}|$. If it were $F_D = k|\vec{v}|^2$, then $\vec{F}_D = -k|\vec{v}|\vec{v}$.*
    $$ \vec{F}_D = -k (v_x \hat{i} + v_y \hat{j} + v_z \hat{k}) = -50 (v_x \hat{i} + v_y \hat{j} + v_z \hat{k}) $$
    Components: $F_{Dx} = -50v_x$, $F_{Dy} = -50v_y$, $F_{Dz} = -50v_z$.

**Step 4: Apply Newton's Second Law and Decompose.**
$$ \sum \vec{F} = m(t)\vec{a} $$
$$ (\sum F_x)\hat{i} + (\sum F_y)\hat{j} + (\sum F_z)\hat{k} = m(t)(\ddot{x}\hat{i} + \ddot{y}\hat{j} + \ddot{z}\hat{k}) $$

Summing forces in each direction:

**X-direction:**
$$ \sum F_x = F_{Tx} + F_{gx} + F_{Dx} = m(t) \ddot{x} $$
$$ 50000 + 0 - 50v_x = (5000 - 25t) \ddot{x} $$
$$ \ddot{x} = \frac{50000 - 50v_x}{5000 - 25t} $$
$$ \boxed{\ddot{x} = \frac{50000 - 50\dot{x}}{5000 - 25t}} $$

**Y-direction:**
$$ \sum F_y = F_{Ty} + F_{gy} + F_{Dy} = m(t) \ddot{y} $$
$$ 0 + 0 - 50v_y = (5000 - 25t) \ddot{y} $$
$$ \ddot{y} = \frac{-50v_y}{5000 - 25t} $$
$$ \boxed{\ddot{y} = \frac{-50\dot{y}}{5000 - 25t}} $$

**Z-direction:**
$$ \sum F_z = F_{Tz} + F_{gz} + F_{Dz} = m(t) \ddot{z} $$
$$ 86602.5 - (5000 - 25t)g - 50v_z = (5000 - 25t) \ddot{z} $$
$$ \ddot{z} = \frac{86602.5 - (5000 - 25t)g - 50v_z}{5000 - 25t} $$
$$ \boxed{\ddot{z} = \frac{86602.5 - (5000 - 25t)(9.81) - 50\dot{z}}{5000 - 25t}} $$

**Reflection:** This example is "harder" because it involves all three dimensions, variable mass, and a velocity-dependent drag force. The resulting differential equations are coupled (e.g., $\ddot{x}$ depends on $\dot{x}$, $\ddot{z}$ depends on $\dot{z}$, and the mass depends on $t$). They are also non-linear due to the mass term in the denominator. Such a system cannot be solved analytically in a closed form. Instead, these equations would be implemented in a computer program (e.g., using Python with `scipy.integrate.solve_ivp` or MATLAB's `ode45`) that numerically integrates them forward in time, given the initial conditions. The solution would be a table or plot of $x(t), y(t), z(t), v_x(t), v_y(t), v_z(t)$.

---

### Example 4 (Hardest - Conceptual): Setup for Full 3DOF Rocket with Non-Constant Gravity, Non-Linear Drag, Thrust Vectoring, and Mass Variation

**Problem Statement:** Outline the setup for the equations of motion for a full-scale rocket launch from Earth, including:
1.  **Non-constant gravity:** Using the inverse square law.
2.  **Non-linear drag:** Proportional to $v^2$.
3.  **Thrust vectoring:** Thrust direction can change.
4.  **Mass variation:** Due to fuel burn.
5.  **Earth-Centered Inertial (ECI) frame:** For long-range trajectory.

**What's Given (Conceptual):**
*   Initial state vector: $\vec{r}_0 = (x_0, y_0, z_0)$, $\vec{v}_0 = (v_{x0}, v_{y0}, v_{z0})$ in ECI.
*   Rocket initial mass: $m_0$.
*   Mass flow rate: $\dot{m}(t)$ (can be variable).
*   Thrust magnitude: $T(t)$ (can be variable).
*   Thrust direction unit vector: $\hat{u}_T(t)$ (controlled by GNC).
*   Earth's gravitational parameter: $\mu = GM_E$.
*   Atmospheric density model: $\rho(h)$ (function of altitude $h$).
*   Drag coefficient: $C_D(M)$ (function of Mach number $M$).
*   Reference area: $A$.

**What We Want:**
*   The system of first-order differential equations suitable for numerical integration.

**Solution:**

**Step 1: Define Coordinate System and State Vector.**
We use an Earth-Centered Inertial (ECI) frame. The origin is the center of the Earth. The X-Y plane is Earth's equatorial plane, and the Z-axis is aligned with Earth's rotational axis.
The state vector for numerical integration will typically be $[\vec{r}, \vec{v}]^T = [x, y, z, v_x, v_y, v_z]^T$.
We need to find expressions for $\frac{d\vec{r}}{dt} = \vec{v}$ and $\frac{d\vec{v}}{dt} = \vec{a}$.

**Step 2: Model Variable Mass.**
The mass $m(t)$ changes due to fuel consumption.
$$ \frac{dm}{dt} = -\dot{m}(t) $$
So, $m(t) = m_0 - \int_0^t \dot{m}(\tau) d\tau$. If $\dot{m}$ is constant, $m(t) = m_0 - \dot{m}t$.

**Step 3: Identify and Model Forces.**

1.  **Gravitational Force ($\vec{F}_g$):**
    Using the inverse square law, directed towards the center of the Earth (the origin of our ECI frame).
    Let $\vec{r}$ be the position vector from the Earth's center to the rocket. Its magnitude is $r = |\vec{r}| = \sqrt{x^2 + y^2 + z^2}$.
    $$ \vec{F}_g = -\frac{\mu m(t)}{r^3} \vec{r} $$
    Where $\mu = GM_E$ is the Earth's gravitational parameter.
    Components: $F_{gx} = -\frac{\mu m(t)}{r^3} x$, $F_{gy} = -\frac{\mu m(t)}{r^3} y$, $F_{gz} = -\frac{\mu m(t)}{r^3} z$.

2.  **Thrust Force ($\vec{F}_T$):**
    Thrust magnitude $T(t)$ and direction $\hat{u}_T(t)$ are controlled.
    $$ \vec{F}_T = T(t) \hat{u}_T(t) $$
    Components: $F_{Tx} = T(t) u_{Tx}$, $F_{Ty} = T(t) u_{Ty}$, $F_{Tz} = T(t) u_{Tz}$.
    The unit vector $\hat{u}_T(t)$ is typically determined by the guidance system.

3.  **Aerodynamic Drag Force ($\vec{F}_D$):**
    Drag opposes the velocity vector relative to the atmosphere.
    First, calculate the rocket's velocity relative to the atmosphere, $\vec{v}_{rel}$. If the atmosphere is rotating with the Earth, and $\vec{\omega}_E$ is Earth's angular velocity vector, then $\vec{v}_{rel} = \vec{v} - \vec{\omega}_E \times \vec{r}$.
    The magnitude of relative velocity is $V_{rel} = |\vec{v}_{rel}|$.
    The atmospheric density $\rho$ is a function of altitude $h = r - R_E$ (where $R_E$ is Earth's radius). So $\rho(h) = \rho(r)$.
    The Mach number $M = V_{rel} / c$, where $c$ is the speed of sound (also depends on altitude/temperature).
    The drag coefficient $C_D$ is a function of Mach number, $C_D(M)$.
    The drag force magnitude is $F_D = \frac{1}{2} \rho(r) V_{rel}^2 C_D(M) A$.
    The drag vector is directed opposite to $\vec{v}_{rel}$:
    $$ \vec{F}_D = -\frac{1}{2} \rho(r) V_{rel} C_D(M) A \vec{v}_{rel} $$
    Components: $F_{Dx} = -\frac{1}{2} \rho V_{rel} C_D A v_{rel,x}$, etc.

**Step 4: Apply Newton's Second Law and Decompose.**
$$ \sum \vec{F} = \vec{F}_g + \vec{F}_T + \vec{F}_D = m(t)\vec{a} $$
The acceleration vector is $\vec{a} = \frac{\sum \vec{F}}{m(t)}$.
$$ \vec{a} = \frac{1}{m(t)} \left( -\frac{\mu m(t)}{r^3} \vec{r} + T(t) \hat{u}_T(t) -\frac{1}{2} \rho(r) V_{rel} C_D(M) A \vec{v}_{rel} \right) $$
This gives us the components of acceleration:
$$ \ddot{x} = a_x = \frac{1}{m(t)} \left( -\frac{\mu m(t)}{r^3} x + T(t) u_{Tx} -\frac{1}{2} \rho(r) V_{rel} C_D(M) A v_{rel,x} \right) $$
$$ \ddot{y} = a_y = \frac{1}{m(t)} \left( -\frac{\mu m(t)}{r^3} y + T(t) u_{Ty} -\frac{1}{2} \rho(r) V_{rel} C_D(M) A v_{rel,y} \right) $$
$$ \ddot{z} = a_z = \frac{1}{m(t)} \left( -\frac{\mu m(t)}{r^3} z + T(t) u_{Tz} -\frac{1}{2} \rho(r) V_{rel} C_D(M) A v_{rel,z} \right) $$

**Step 5: Formulate First-Order System for Numerical Integration.**
To numerically integrate, we convert the second-order ODEs into a system of first-order ODEs.
Let $x_1 = x$, $x_2 = y$, $x_3 = z$, $x_4 = v_x$, $x_5 = v_y$, $x_6 = v_z$.
Then:
$$ \dot{x}_1 = x_4 $$
$$ \dot{x}_2 = x_5 $$
$$ \dot{x}_3 = x_6 $$
$$ \dot{x}_4 = a_x(x_1, x_2, x_3, x_4, x_5, x_6, t) $$
$$ \dot{x}_5 = a_y(x_1, x_2, x_3, x_4, x_5, x_6, t) $$
$$ \dot{x}_6 = a_z(x_1, x_2, x_3, x_4, x_5, x_6, t) $$
Where $a_x, a_y, a_z$ are the expressions derived in Step 4, explicitly written in terms of $x_1...x_6$ and $t$. This system, along with the initial conditions $x_1(0)...x_6(0)$, would be fed into a numerical ODE solver.

**Reflection:** This example demonstrates the complexity of real-world rocket trajectory analysis. Every force model is more detailed and dependent on the current state of the rocket (position, velocity, time). The thrust direction is itself a control variable, making this a problem in optimal control or guidance. The only practical way to solve such a system is through numerical integration, which involves breaking the flight into tiny time steps and iteratively calculating the acceleration, then updating velocity, then position. This setup is the foundation of sophisticated flight simulators and trajectory optimization software used in the aerospace industry.

## 6. Common mistakes and traps

1.  **Ignoring Mass Variation:** For rockets, mass is constantly decreasing due to fuel burn. Treating mass as a constant ($m_0$) when it's actually $m(t) = m_0 - \dot{m}t$ (or more complex) will lead to significant errors in acceleration and, consequently, trajectory.
2.  **Incorrectly Resolving Vector Components:** This is a very common trigonometric error. Misidentifying the angle with the axis, confusing sine and cosine, or using the wrong sign for a component can completely invalidate the force balance in each direction.
3.  **Neglecting Aerodynamic Forces:** For vehicles moving through an atmosphere, drag (and potentially lift for winged vehicles or high angles of attack) is a crucial force. Ignoring it, especially at high speeds or in dense atmosphere, will result in an overestimation of range and altitude.
4.  **Assuming Constant Gravity:** While acceptable for short-range, low-altitude flights, assuming $g = 9.81 \text{ m/s}^2$ at all altitudes is incorrect for rockets reaching high altitudes or orbit. Gravity follows an inverse square law, $\vec{F}_g = -\frac{GMm}{r^2}\hat{r}$, and its magnitude decreases significantly with distance from the Earth's center.
5.  **Using a Non-Inertial Frame Improperly:** If you choose a rotating coordinate system (like an Earth-fixed frame for orbital mechanics), you *must* include fictitious forces (Coriolis and centrifugal forces) in your force balance. Failing to do so is a fundamental error. For most basic 3DOF point mass *trajectory* problems starting from a launch pad, a local inertial frame is often a reasonable approximation for short durations.
6.  **Algebraic Errors During Integration:** Even for simple analytical solutions, mistakes in integration constants, signs, or exponents are common. For numerical solutions, errors can arise from improper step size selection (too large leads to inaccuracy/instability, too small leads to excessive computation time).

## 7. Textbook-precise explanation

The motion of a point mass rocket in three dimensions is governed by Newton's Second Law of Motion. In an inertial reference frame, the sum of all external forces acting on the rocket equals the product of its instantaneous mass and its acceleration.

Let $\vec{r}(t)$ be the position vector of the point mass rocket, $\vec{v}(t) = \frac{d\vec{r}}{dt}$ its velocity vector, and $\vec{a}(t) = \frac{d\vec{v}}{dt} = \frac{d^2\vec{r}}{dt^2}$ its acceleration vector. The instantaneous mass of the rocket is $m(t)$.

The fundamental equation of motion is:
$$ \sum \vec{F}(t, \vec{r}, \vec{v}) = m(t) \vec{a}(t) $$
The total force $\sum \vec{F}$ is the vector sum of all forces acting on the rocket. For typical rocket flight mechanics, these forces include:

1.  **Gravitational Force ($\vec{F}_g$):**
    For flight near Earth, especially for long trajectories or orbital insertion, the inverse square law for gravity must be used. Assuming an Earth-Centered Inertial (ECI) frame with origin at the Earth's center, the gravitational force on the rocket is:
    $$ \vec{F}_g = -\frac{G M_E m(t)}{|\vec{r}|^3} \vec{r} $$
    where $G$ is the universal gravitational constant, $M_E$ is the mass of the Earth, and $\vec{r}$ is the position vector from the Earth's center to the rocket. For short-range, low-altitude flights, a constant gravitational acceleration approximation, $\vec{F}_g = m(t) \vec{g}_0$, where $\vec{g}_0$ is the local gravitational acceleration vector (e.g., $(0, 0, -9.81) \text{ m/s}^2$), may be used.

2.  **Thrust Force ($\vec{F}_T$):**
    The force generated by the rocket engine, typically directed along the rocket's longitudinal axis. Its magnitude $T(t)$ and direction $\hat{u}_T(t)$ can vary with time and control inputs.
    $$ \vec{F}_T = T(t) \hat{u}_T(t) $$
    The mass of the rocket changes due to the expulsion of propellant, modeled by $\frac{dm}{dt} = -\dot{m}(t)$, where $\dot{m}(t)$ is the propellant mass flow rate.

3.  **Aerodynamic Drag Force ($\vec{F}_D$):**
    The resistive force exerted by the atmosphere, opposing the rocket's velocity relative to the air.
    $$ \vec{F}_D = -\frac{1}{2} \rho V_{rel}^2 C_D A \hat{v}_{rel} $$
    where:
    *   $\rho$ is the atmospheric density, a function of altitude.
    *   $V_{rel}$ is the magnitude of the rocket's velocity relative to the atmosphere.
    *   $C_D$ is the drag coefficient, typically a function of Mach number and angle of attack (though for a point mass, angle of attack effects are often absorbed into an effective $C_D$).
    *   $A$ is the reference area (e.g., maximum cross-sectional area).
    *   $\hat{v}_{rel}$ is the unit vector in the direction of the relative velocity.
    For an Earth-fixed rotating atmosphere, $\vec{v}_{rel} = \vec{v} - \vec{\omega}_E \times \vec{r}$, where $\vec{\omega}_E$ is Earth's angular velocity vector.

Substituting these forces into Newton's Second Law and decomposing the vector equation into its Cartesian components yields a system of three coupled second-order ordinary differential equations:
$$ m(t)\ddot{x} = \sum F_x(t, x, y, z, \dot{x}, \dot{y}, \dot{z}) $$
$$ m(t)\ddot{y} = \sum F_y(t, x, y, z, \dot{x}, \dot{y}, \dot{z}) $$
$$ m(t)\ddot{z} = \sum F_z(t, x, y, z, \dot{x}, \dot{y}, \dot{z}) $$
These equations are typically non-linear and time-varying, making analytical solutions difficult or impossible for realistic scenarios. Therefore, they are usually transformed into a system of first-order differential equations and solved numerically using methods such as the Runge-Kutta algorithm, given initial conditions for position $\vec{r}(t_0)$ and velocity $\vec{v}(t_0)$.

**References:**
*   Sutton, George P., and Oscar Biblarz. *Rocket Propulsion Elements*. 9th ed., Wiley, 2017. (Chapter 3: Nozzle Theory and Thermodynamic Relations, Chapter 4: Flight Performance)
*   Curtis, Howard D. *Orbital Mechanics for Engineering Students*. 4th ed., Elsevier, 2020. (Chapter 2: Newton's Laws and Gravitation, Chapter 3: Orbital Mechanics)
*   Bate, Roger R., Donald D. Mueller, and Jerry E. White. *Fundamentals of Astrodynamics*. Dover Publications, 1971. (Chapter 2: The Two-Body Problem)

## 8. ASCII diagrams

Here's an ASCII representation of a rocket as a point mass, with the forces acting upon it in a 3D Cartesian coordinate system.

```text
       ^ Z (Altitude)
       |
       |           . P (Rocket's position at (x,y,z))
       |          /|\
       |         / | \  <-- F_thrust (T_vec)
       |        /  |  \    (direction determined by nozzle)
       |       /   |   \
       |      /    v    \ <-- F_drag (D_vec) (always opposite to V_vec_relative)
       |     /     |
       |    /      | <-- F_gravity (G_vec) (towards Earth's center, or -Z for local approx.)
       |   /       |
       +-----------------> Y (East)
      /
     /
    v X (North)

    Coordinate System (Example: Local Horizontal, Local Vertical):
    - Origin: Launch site (0,0,0)
    - X-axis: North
    - Y-axis: East
    - Z-axis: Up (Normal to Earth's surface)

    Key Vectors at Point P:
    - Position Vector:  r_vec = (x, y, z)
    - Velocity Vector:  v_vec = (vx, vy, vz)
    - Acceleration Vector: a_vec = (ax, ay, az)
    - Forces:
        - F_gravity (G_vec):  (0, 0, -mg) for constant g approx.
                              (-mu*m/r^3 * x, -mu*m/r^3 * y, -mu*m/r^3 * z) for inverse square law
        - F_thrust (T_vec):   (Tx, Ty, Tz) based on engine direction
        - F_drag (D_vec):     (-Dx, -Dy, -Dz) where D_vec opposes v_vec_relative
```

**Figure Description:** The diagram illustrates a point mass 'P' (representing the rocket) in a 3D Cartesian coordinate system. The Z-axis points upwards (altitude), the X-axis points North, and the Y-axis points East. Three principal force vectors are shown originating from the point mass:
1.  **F_gravity (G_vec):** Depicted as pointing downwards along the negative Z-axis (for a local approximation) or towards the origin (for an Earth-centered model).
2.  **F_thrust (T_vec):** Shown pointing generally upwards and forwards, representing the engine's push. Its exact direction depends on thrust vectoring.
3.  **F_drag (D_vec):** Illustrated as opposing the general direction of motion (e.g., slightly downwards and backwards if the rocket is moving upwards and forwards). This vector's direction is always opposite to the velocity vector relative to the atmosphere.

The diagram visually reinforces that all forces are applied at a single point, and their vector sum determines the acceleration of that point.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of a **"Force-ACCELERATOR"** machine. You feed in all the **FORCES** (gravity, thrust, drag) and the **MASS** of the rocket, and out pops the **ACCELERATION** in 3D. Then, you just have to "un-accelerate" twice (integrate) to get the velocity and position.
    *   **F**orces: Identify them all.
    *   **A**pply Newton's 2nd Law: $\sum \vec{F} = m\vec{a}$.
    *   **C**omponents: Break into x, y, z.
    *   **C**alculus: Integrate twice (or set up for numerical integration).
    *   **E**stablish initial conditions.
    *   **L**ook at the trajectory.
    *   **E**valuate and iterate.
    *   **R**emember mass changes!
    *   **A**erodynamic forces matter!
    *   **T**hrust is key!
    *   **O**utcome is trajectory.
    *   **R**epeat for accuracy.

2.  **Formulas/Facts to Overlearn:**
    *   **Newton's Second Law (Vector Form):** $\sum \vec{F} = m(t) \vec{a}$
    *   **Kinematic Relations:** $\vec{a} = \frac{d\vec{v}}{dt} = \frac{d^2\vec{r}}{dt^2}$
    *   **Key Force Models:**
        *   Gravity: $\vec{F}_g = -\frac{GMm}{r^3}\vec{r}$ (inverse square) or $\vec{F}_g = m\vec{g}_0$ (constant approx.)
        *   Thrust: $\vec{F}_T = T(t)\hat{u}_T(t)$
        *   Drag: $\vec{F}_D = -\frac{1}{2}\rho V_{rel}^2 C_D A \hat{v}_{rel}$
    *   **Mass Variation:** $m(t) = m_0 - \dot{m}t$ (for constant burn rate)

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** Immediately after this lesson (today).
    *   **Review 2:** In 3 days.
    *   **Review 3:** In 7 days.
    *   **Review 4:** In 16 days.
    *   **Review 5:** In 35 days.
    *   *Focus on re-deriving the core equations and recalling the force models.*

4.  **First-Principles Re-derivation Pathway:**
    If you forget the specific formulas for the equations of motion, you can always rebuild them from first principles:
