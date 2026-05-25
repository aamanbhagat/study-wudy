## 1. What it is — in plain English

Imagine you're trying to land a paper airplane on a specific spot across the room. If it's a normal paper airplane, you throw it, and it goes where it goes. But what if it could *see* where it was going, *decide* the best way to get there, and then *adjust its own wings* to hit the target perfectly? That's essentially what autonomous GNC is for reusable rockets.

"GNC" stands for Guidance, Navigation, and Control. Think of it as the rocket's brain and nervous system. "Navigation" is knowing exactly where the rocket is, how fast it's moving, and in what direction – like knowing your current location on a map. "Guidance" is figuring out the best path to get from where it is to where it needs to be, like planning the best route on that map. And "Control" is actually making the rocket follow that path, like steering your car, pressing the accelerator, and braking to stay on your chosen route.

Now, add "autonomous" and "reusable." "Autonomous" means the rocket does all of this by itself, without a human constantly telling it what to do. It makes its own decisions in real-time, adapting to unexpected winds or engine performance changes. "Reusable" means the rocket isn't just a one-time use item; it's designed to come back, land gently, and be prepared for another flight, much like an airplane.

So, for reusable rockets like SpaceX's Falcon 9, autonomous GNC is the sophisticated system that allows the rocket's first stage to launch into space, separate from the second stage, then flip around, re-enter the Earth's atmosphere, and perform a powered, upright landing either on a drone ship in the ocean or back on a landing pad. It's the "self-driving" technology that enables a giant, multi-ton rocket booster to land itself with pinpoint precision.

## 2. Why it matters — real-world applications

Autonomous GNC for reusable rockets is a game-changer with profound implications, largely pioneered by SpaceX.

1.  **Massive Cost Reduction for Space Access:** Historically, rockets were expendable, meaning each launch required building a new first stage (the most expensive part). By enabling the first stage to return and be reflown, SpaceX has drastically cut the cost of launching payloads into orbit. This makes space more accessible for satellite deployment, scientific research, and even future space tourism. For instance, a Falcon 9 launch might cost around $67 million, but if the first stage is reused, the marginal cost of a subsequent launch can be significantly lower.
2.  **Increased Launch Cadence and Reliability:** The ability to rapidly refurbish and refly rocket stages means a single booster can perform multiple missions in a short timeframe. This increases the overall launch capacity, allowing more satellites to be deployed, more experiments to be conducted, and more ambitious space missions to be undertaken. SpaceX has demonstrated this by flying individual Falcon 9 boosters over 15 times, dramatically improving the efficiency of space operations.
3.  **Enabling Future Deep Space Exploration and Colonization:** The principles of autonomous GNC for reusable rockets are fundamental to SpaceX's long-term vision of colonizing Mars. The Starship system, designed to be fully reusable (both booster and upper stage), relies entirely on sophisticated autonomous GNC for its atmospheric re-entry, flip maneuvers, and powered landings on Earth, the Moon, and eventually Mars. Without this capability, establishing a sustainable presence on other planets would be economically unfeasible due to the immense cost of expendable systems.
4.  **Advancements in AI and Robotics for Extreme Environments:** The development of autonomous GNC systems for rockets pushes the boundaries of artificial intelligence, real-time control, and sensor fusion in extreme environments (high speeds, extreme temperatures, vacuum, atmospheric drag). The algorithms and techniques developed for rocket landings find applications in other fields requiring high-precision autonomy, such as self-driving cars operating in complex traffic, advanced robotics for hazardous industrial tasks, or even drone delivery systems navigating urban landscapes.

## 5. Prerequisites — what you must know first

Before diving deep into autonomous GNC, ensure you have a solid grasp of these foundational concepts:

*   **Classical Mechanics:** Newton's Laws of Motion, kinematics (position, velocity, acceleration), dynamics (forces, moments), conservation of momentum and energy, rotational dynamics, and basic orbital mechanics (Kepler's laws, orbital elements).
*   **Calculus:** Differential equations (solving equations of motion), optimization techniques (finding minimum/maximum values), vector calculus.
*   **Linear Algebra:** Vector and matrix operations, transformations, eigenvalues, eigenvectors, solving systems of linear equations. Essential for state-space representations and Kalman filters.
*   **Control Theory:** Feedback control systems, open-loop vs. closed-loop control, stability analysis (Bode plots, root locus), PID controllers, state-space control, optimal control principles.
*   **Navigation Systems:** Inertial Navigation Systems (INS) – accelerometers, gyroscopes; Global Positioning System (GPS) principles; sensor fusion techniques (e.g., Kalman filters) for combining noisy sensor data.
*   **Guidance Principles:** Trajectory generation, path planning, optimization algorithms (e.g., gradient descent, dynamic programming), basic understanding of thrust vectoring.
*   **Aerodynamics:** Basic concepts of drag, lift, atmospheric density, Mach number, shock waves, and how they affect vehicle motion, especially during re-entry.
*   **Rocket Propulsion:** Principles of thrust generation, specific impulse, mass flow rate, nozzle design, and how thrust can be vectored.
*   **Real-time Systems & Algorithms:** Understanding of computational efficiency, latency, sampling rates, and how algorithms are implemented in time-critical hardware.

## 4. The core idea — step by step

The core idea behind autonomous GNC for reusable rockets is a continuous, self-correcting loop that allows the rocket to precisely know where it is, intelligently decide where to go, and skillfully execute the maneuvers to get there, all without human intervention.

### Step 1: The Goal - Pinpoint Landing

**Plain English:** The rocket's ultimate objective is to land upright on a tiny target (like a drone ship or a landing pad) after traveling to space and back. It's like trying to drop a pencil from a skyscraper and have it land perfectly on a coin. This isn't just about hitting a general area; it's about hitting a specific spot with minimal error and a soft landing.

**Small Concrete Example:** After a Falcon 9 first stage separates, its target might be a 90m x 50m drone ship moving in the Atlantic Ocean, or a 100m diameter landing zone on land. The GNC system must account for the ship's motion, wind, and atmospheric conditions to hit the center.

**Formal/Mathematical Version:** The objective is to minimize the terminal position error and terminal velocity while satisfying path constraints and fuel consumption limits.
$$ \min_{u(t)} J = ||\mathbf{r}(t_f) - \mathbf{r}_{target}||^2 + ||\mathbf{v}(t_f) - \mathbf{v}_{target}||^2 $$
subject to:
$$ \dot{\mathbf{x}}(t) = f(\mathbf{x}(t), \mathbf{u}(t), t) $$
$$ \mathbf{u}_{min} \le \mathbf{u}(t) \le \mathbf{u}_{max} $$
$$ m(t_f) \ge m_{min} $$
where $\mathbf{r}$ is position, $\mathbf{v}$ is velocity, $t_f$ is final time, $\mathbf{u}(t)$ is the control input (e.g., thrust vector), $\mathbf{x}(t)$ is the state vector, and $m(t)$ is the mass.

**What could go wrong:** Miscalculation of the target's position (e.g., drone ship drift), incorrect landing site coordinates, or an overly ambitious landing trajectory leading to insufficient fuel.

### Step 2: Sensing the World (Navigation)

**Plain English:** Before the rocket can do anything, it needs to know exactly where it is, how fast it's going, and its orientation in space. This is like a human using their eyes, ears, and sense of balance to understand their surroundings. The rocket uses its "senses" – a suite of sensors – to constantly update this information.

**Small Concrete Example:** During re-entry, the rocket uses accelerometers to measure how quickly its speed is changing, gyroscopes to measure how it's rotating, and GPS receivers to get its global position. By combining these, it can estimate its precise location, velocity, and attitude (pitch, yaw, roll).

**Formal/Mathematical Version:** The state of the rocket $\mathbf{x}(t)$ is estimated using sensor measurements $\mathbf{z}(t)$ and a dynamic model of the rocket. This is typically done using a Kalman Filter or Extended Kalman Filter (EKF).
The state vector usually includes position, velocity, and attitude:
$$ \mathbf{x}(t) = [x, y, z, \dot{x}, \dot{y}, \dot{z}, \phi, \theta, \psi, \dot{\phi}, \dot{\theta}, \dot{\psi}]^T $$
The Kalman filter predicts the next state and then corrects it using measurements:
$$ \hat{\mathbf{x}}_k^- = \mathbf{F}_k \hat{\mathbf{x}}_{k-1}^+ + \mathbf{B}_k \mathbf{u}_k $$
$$ \hat{\mathbf{x}}_k^+ = \hat{\mathbf{x}}_k^- + \mathbf{K}_k (\mathbf{z}_k - \mathbf{H}_k \hat{\mathbf{x}}_k^-) $$
where $\hat{\mathbf{x}}$ is the estimated state, $\mathbf{F}$ is the state transition matrix, $\mathbf{B}$ is the control input matrix, $\mathbf{u}$ is the control vector, $\mathbf{K}$ is the Kalman gain, $\mathbf{z}$ is the measurement, and $\mathbf{H}$ is the measurement matrix.

**What could go wrong:** GPS signal loss during re-entry (due to plasma blackout), errors in accelerometer or gyroscope readings (drift), or unexpected atmospheric disturbances that the sensors don't accurately capture.

### Step 3: Planning the Path (Guidance)

**Plain English:** Once the rocket knows exactly where it is, it needs to figure out the best way to get to the landing spot. This isn't just a straight line; it's a complex dance involving slowing down from orbital speeds, surviving atmospheric re-entry, and aligning perfectly for a vertical landing. The guidance system calculates the optimal trajectory, considering fuel efficiency, structural limits, and precise timing.

**Small Concrete Example:** The guidance system calculates the "entry burn" (to slow down before hitting dense atmosphere), the "belly flop" maneuver (for aerodynamic braking), the "flip maneuver" (to reorient for landing), and the "landing burn" (to decelerate for touchdown). It continuously updates these burn timings and thrust profiles based on the latest navigation data.

**Formal/Mathematical Version:** This involves solving an optimal control problem to generate a reference trajectory. Techniques like Model Predictive Control (MPC) or iterative guidance algorithms (e.g., Powered Descent Guidance, or PDG, used by Apollo, adapted for reusable rockets) are employed. The objective is often to minimize fuel consumption while meeting terminal constraints.
A common approach is to use a "pin-point guidance" algorithm that continuously computes the required thrust vector to nullify position and velocity errors at the target.
For instance, the desired acceleration $\mathbf{a}_d$ might be calculated based on the current state and target:
$$ \mathbf{a}_d = \mathbf{a}_{gravity} + \mathbf{a}_{drag} + \mathbf{a}_{thrust} $$
The guidance algorithm determines the required $\mathbf{a}_{thrust}$ to steer the vehicle to the target. This often involves solving a boundary value problem or using a closed-form solution derived from optimal control theory for simplified dynamics.

**What could go wrong:** Unexpected high-altitude winds pushing the rocket off course, a guidance algorithm that doesn't converge quickly enough, or a pre-calculated trajectory that becomes infeasible due to unforeseen events (e.g., engine underperformance).

### Step 4: Executing the Plan (Control)

**Plain English:** The control system is the rocket's "muscles" and "reflexes." It takes the path planned by the guidance system and translates it into actual commands for the rocket's hardware: adjusting the engine's thrust, swiveling the engines (thrust vectoring), and deploying aerodynamic surfaces like grid fins. It constantly monitors how well the rocket is following the plan and makes immediate adjustments to correct any deviations.

**Small Concrete Example:** If the guidance system says "thrust at 70% and gimbal engine 1 by 2 degrees to the left," the control system sends those commands to the engine's throttle and gimbal actuators. If a gust of wind then pushes the rocket slightly off course, the control system immediately detects this through the navigation data and makes tiny, rapid corrections to the engine gimbals to bring it back onto the desired path.

**Formal/Mathematical Version:** This is typically a feedback control loop. A Proportional-Integral-Derivative (PID) controller or more advanced state-space controllers (e.g., Linear Quadratic Regulator, LQR) are used. The control input $\mathbf{u}$ (e.g., thrust magnitude and direction) is computed based on the error between the desired state $\mathbf{x}_d$ (from guidance) and the estimated current state $\hat{\mathbf{x}}$ (from navigation).
For thrust vector control (TVC), the desired thrust vector $\mathbf{T}_d$ is generated by guidance. The control system then calculates the gimbal angles $\delta_x, \delta_y$ for each engine:
$$ \mathbf{T}_{actual} = \sum_{i=1}^{N_{engines}} \mathbf{T}_i(\delta_{ix}, \delta_{iy}) $$
The control law aims to drive the error $\mathbf{e} = \mathbf{x}_d - \hat{\mathbf{x}}$ to zero. For a simple PID controller:
$$ u(t) = K_P e(t) + K_I \int e(t) dt + K_D \frac{de(t)}{dt} $$
For rocket attitude control, this is often implemented as a cascaded loop, with an outer loop controlling attitude and an inner loop controlling angular rates.

**What could go wrong:** Actuator limits (engines can only gimbal so far or throttle so quickly), engine response delays, control system instability (overcorrecting and oscillating), or mechanical failure of a gimbal actuator or grid fin.

### Step 5: The Iterative Loop

**Plain English:** GNC isn't a one-and-done process. It's a continuous, real-time loop. The rocket constantly senses its environment, updates its position and velocity, re-plans its path if necessary, and then adjusts its controls. This loop runs many times per second, allowing the rocket to adapt to changing conditions like wind gusts, atmospheric density variations, or even slight engine performance differences.

**Small Concrete Example:** Imagine you're walking a tightrope. You constantly look where you're going (navigation), decide where to place your next foot (guidance), and adjust your balance with your arms (control). If a sudden breeze hits you, you immediately sense it, re-evaluate your balance, and make a quick, small adjustment. A rocket does this thousands of times per second during a landing.

**Formal/Mathematical Version:** This represents the closed-loop nature of GNC. At each time step $k$:
1.  **Navigation:** Acquire sensor data $\mathbf{z}_k$. Estimate state $\hat{\mathbf{x}}_k$ using filter (e.g., Kalman filter).
2.  **Guidance:** Compute desired state $\mathbf{x}_{d,k}$ and control commands $\mathbf{u}_{g,k}$ based on $\hat{\mathbf{x}}_k$ and target.
3.  **Control:** Compute actuator commands $\mathbf{u}_{c,k}$ to track $\mathbf{x}_{d,k}$ (or $\mathbf{u}_{g,k}$) using feedback.
4.  **Actuation:** Execute commands $\mathbf{u}_{c,k}$ on the physical system.
This process repeats at a high frequency (e.g., 100 Hz or 1000 Hz).

**What could go wrong:** Latency in the loop (delay between sensing and acting), insufficient processing power to run the algorithms fast enough, or a cascading error where a small navigation error leads to a guidance correction that then causes a control instability.

### Step 6: SpaceX Specifics - Grid Fins & Landing Legs

**Plain English:** SpaceX's Falcon 9 reusable first stage uses some clever additions to make its autonomous landing even more robust. "Grid fins" are like small, steerable wings that pop out during atmospheric re-entry. They help steer the rocket through the air, much like a plane's wings, but are much more compact. "Landing legs" are self-deploying struts that absorb the shock of touchdown, allowing for a soft, upright landing.

**Small Concrete Example:** During the "belly flop" maneuver, the Falcon 9 uses its four grid fins to precisely control its orientation and trajectory as it falls through the atmosphere. They act like air brakes and rudders. Just before touchdown, the four landing legs swing out and lock into place, providing a stable base for the final landing burn.

**Formal/Mathematical Version:**
**Grid Fins:** These provide aerodynamic control authority, especially during the hypersonic and supersonic phases of re-entry where engine thrust vectoring might be less effective or efficient. The control system calculates the required deflection angles for each grid fin ($\alpha_i$) to generate desired aerodynamic forces and moments ($\mathbf{F}_{aero}, \mathbf{M}_{aero}$).
$$ \mathbf{M}_{aero} = \sum_{i=1}^{N_{fins}} \mathbf{r}_i \times \mathbf{F}_{fin,i}(\alpha_i, v_{atm}, \rho_{atm}) $$
where $\mathbf{r}_i$ is the moment arm, $\mathbf{F}_{fin,i}$ is the force from fin $i$, $v_{atm}$ is atmospheric velocity, and $\rho_{atm}$ is atmospheric density.

**Landing Legs:** These are actuated mechanisms. Their deployment is a discrete event triggered by the GNC system at a specific altitude and velocity. The control system must ensure the rocket's attitude is perfectly vertical and its descent rate is minimal at touchdown. The landing legs absorb kinetic energy upon impact, reducing the peak force experienced by the rocket structure.
$$ F_{impact} = k \cdot \Delta x + c \cdot \Delta \dot{x} $$
where $k$ is leg stiffness, $c$ is damping coefficient, $\Delta x$ is leg compression, and $\Delta \dot{x}$ is compression rate. The GNC ensures the impact velocity is within the leg's absorption capability.

**What could go wrong:** Grid fin actuator failure, causing loss of aerodynamic control; structural damage to a grid fin during re-entry; or a landing leg failing to deploy or lock, leading to a tip-over upon touchdown.

### Step 7: Deep Learning/AI (Future/Advanced SpaceX)

**Plain English:** While current reusable rocket GNC is primarily based on classical control theory, the future, and potentially some advanced elements in current SpaceX systems, involves teaching the rocket to "learn" from its experiences. This could mean it gets better at predicting winds, identifying engine anomalies, or adapting its control strategy in real-time by processing vast amounts of flight data, much like how a human learns from practice.

**Small Concrete Example:** An AI system could analyze millions of data points from previous landings (wind profiles, engine performance, sensor noise) to build a more accurate predictive model for future flights. It might even be able to detect a subtle engine anomaly early and adapt the landing burn profile to compensate, something a purely rule-based system might struggle with.

**Formal/Mathematical Version:** This involves integrating machine learning techniques, such as neural networks or reinforcement learning, into the GNC loop. For example, a neural network could be used for advanced state estimation (replacing or augmenting Kalman filters), anomaly detection, or even as a direct policy for control.
$$ \mathbf{u}(t) = \text{NN}(\hat{\mathbf{x}}(t), \mathbf{x}_{target}) $$
Reinforcement Learning (RL) agents could be trained in simulation to optimize landing trajectories under various environmental conditions. The policy $\pi$ maps states to actions:
$$ \pi(\mathbf{a}_t | \mathbf{s}_t) = P(\mathbf{a}_t | \mathbf{s}_t) $$
where $\mathbf{s}_t$ is the state and $\mathbf{a}_t$ is the action. The goal is to maximize cumulative reward $R = \sum_{t=0}^{T} \gamma^t r_t$.

**What could go wrong:** "Black box" problem (difficulty in understanding why an AI made a certain decision), insufficient training data for rare failure modes, or over-reliance on learned patterns that don't generalize well to truly novel situations.

## 5. Worked examples — multiple, with every step shown

### Example 1 (Easy): Basic Kinematics for Landing Site Prediction

**Problem:** A rocket booster at an altitude of $h = 500 \text{ m}$ above the landing pad has a purely vertical downward velocity of $v_y = -10 \text{ m/s}$ and no horizontal velocity. Assume negligible air resistance and constant gravitational acceleration $g = 9.81 \text{ m/s}^2$. If the engines suddenly fail, where will the rocket land relative to the point directly below it?

**Given:**
*   Initial altitude $y_0 = 500 \text{ m}$
*   Initial vertical velocity $v_{y0} = -10 \text{ m/s}$
*   Initial horizontal velocity $v_{x0} = 0 \text{ m/s}$
*   Gravitational acceleration $g = 9.81 \text{ m/s}^2$ (downwards, so we'll use a positive value in the equation and consider the direction)

**Want:**
*   Horizontal displacement $\Delta x$ when the rocket hits the ground ($y = 0$).

**Solution:**

**Step 1: Determine the time to impact.**
We use the kinematic equation for vertical motion:
$$ y = y_0 + v_{y0}t + \frac{1}{2}at^2 $$
Here, $y$ is the final altitude (0 m), $y_0$ is the initial altitude (500 m), $v_{y0}$ is the initial vertical velocity (-10 m/s), and $a$ is the acceleration due to gravity ($-g = -9.81 \text{ m/s}^2$).
$$ 0 = 500 + (-10)t + \frac{1}{2}(-9.81)t^2 $$
This simplifies to a quadratic equation:
$$ -4.905t^2 - 10t + 500 = 0 $$
We can use the quadratic formula $t = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ where $a = -4.905$, $b = -10$, $c = 500$.
$$ t = \frac{-(-10) \pm \sqrt{(-10)^2 - 4(-4.905)(500)}}{2(-4.905)} $$
This is the quadratic formula to solve for time $t$.
$$ t = \frac{10 \pm \sqrt{100 - (-9810)}}{-9.81} $$
Simplify the term under the square root.
$$ t = \frac{10 \pm \sqrt{100 + 9810}}{-9.81} $$
Continue simplifying the square root.
$$ t = \frac{10 \pm \sqrt{9910}}{-9.81} $$
Calculate the square root.
$$ t = \frac{10 \pm 99.55}{-9.81} $$
We'll get two possible values for $t$.
$$ t_1 = \frac{10 + 99.55}{-9.81} = \frac{109.55}{-9.81} \approx -11.17 \text{ s} $$
This negative time is not physically meaningful for impact *after* the initial moment.
$$ t_2 = \frac{10 - 99.55}{-9.81} = \frac{-89.55}{-9.81} \approx 9.13 \text{ s} $$
This is the physically meaningful time to impact.
So, the time to impact is $t = 9.13 \text{ s}$.

**Step 2: Determine the horizontal displacement.**
Since there is no initial horizontal velocity ($v_{x0} = 0$) and we assumed no air resistance, there is no horizontal acceleration.
$$ x = x_0 + v_{x0}t + \frac{1}{2}a_xt^2 $$
Here, $x_0 = 0$ (starting directly above the landing pad), $v_{x0} = 0$, and $a_x = 0$.
$$ x = 0 + (0)(9.13) + \frac{1}{2}(0)(9.13)^2 $$
$$ x = 0 \text{ m} $$
The horizontal displacement is $0 \text{ m}$.

**Final Answer:**
The rocket will land **0 m** horizontally from the point directly below it.

**Reflection:** This example highlights a crucial aspect of GNC: understanding the physics of motion. Even in this simplified scenario, accurately predicting the impact time is critical. The "trick" was recognizing that with no initial horizontal velocity and no horizontal forces, the rocket would land directly below its starting horizontal position, regardless of vertical motion. This forms the basis for more complex trajectory predictions where horizontal forces (like wind or engine thrust) are present.

### Example 2 (Medium): Simple PID for Thrust Control

**Problem:** A rocket is hovering at a target altitude of $100 \text{ m}$. Its current altitude is $y = 98 \text{ m}$ and its vertical velocity is $v_y = -0.5 \text{ m/s}$. We want to use a simplified PID controller to determine the required thrust correction. Assume the rocket's mass is $1000 \text{ kg}$, and the controller outputs an additional force.
Given PID gains: $K_P = 2000 \text{ N/m}$, $K_I = 500 \text{ N/(m·s)}$, $K_D = 1000 \text{ N/(m/s)}$.
Assume the integral error from previous steps is $I_{prev} = -1.5 \text{ m·s}$.
The time step for derivative and integral calculation is $\Delta t = 0.1 \text{ s}$.

**Given:**
*   Target altitude $y_{target} = 100 \text{ m}$
*   Current altitude $y_{current} = 98 \text{ m}$
*   Current vertical velocity $v_y = -0.5 \text{ m/s}$
*   Rocket mass $m = 1000 \text{ kg}$
*   Proportional gain $K_P = 2000 \text{ N/m}$
*   Integral gain $K_I = 500 \text{ N/(m·s)}$
*   Derivative gain $K_D = 1000 \text{ N/(m/s)}$
*   Previous integral error $I_{prev} = -1.5 \text{ m·s}$
*   Time step $\Delta t = 0.1 \text{ s}$

**Want:**
*   Total thrust correction $F_{PID}$ required.

**Solution:**

**Step 1: Calculate the position error (proportional term).**
The error $e(t)$ is the difference between the target altitude and the current altitude.
$$ e(t) = y_{target} - y_{current} $$
Substitute the given values.
$$ e(t) = 100 \text{ m} - 98 \text{ m} $$
Calculate the error.
$$ e(t) = 2 \text{ m} $$

**Step 2: Calculate the derivative of the error.**
The derivative of the error $de(t)/dt$ is the negative of the current vertical velocity, as an increasing altitude error means the rocket is moving downwards (negative velocity).
$$ \frac{de(t)}{dt} = -v_y $$
Substitute the given velocity.
$$ \frac{de(t)}{dt} = -(-0.5 \text{ m/s}) $$
Calculate the derivative of the error.
$$ \frac{de(t)}{dt} = 0.5 \text{ m/s} $$

**Step 3: Update the integral error.**
The integral error accumulates over time. We'll use a discrete approximation:
$$ I_{current} = I_{prev} + e(t) \cdot \Delta t $$
Substitute the given values.
$$ I_{current} = -1.5 \text{ m·s} + (2 \text{ m}) \cdot (0.1 \text{ s}) $$
Calculate the current integral error.
$$ I_{current} = -1.5 \text{ m·s} + 0.2 \text{ m·s} $$
$$ I_{current} = -1.3 \text{ m·s} $$

**Step 4: Calculate the proportional, integral, and derivative terms.**
Proportional term $P$:
$$ P = K_P \cdot e(t) $$
Substitute $K_P$ and $e(t)$.
$$ P = (2000 \text{ N/m}) \cdot (2 \text{ m}) $$
$$ P = 4000 \text{ N} $$
Integral term $I$:
$$ I = K_I \cdot I_{current} $$
Substitute $K_I$ and $I_{current}$.
$$ I = (500 \text{ N/(m·s)}) \cdot (-1.3 \text{ m·s}) $$
$$ I = -650 \text{ N} $$
Derivative term $D$:
$$ D = K_D \cdot \frac{de(t)}{dt} $$
Substitute $K_D$ and $de(t)/dt$.
$$ D = (1000 \text{ N/(m/s)}) \cdot (0.5 \text{ m/s}) $$
$$ D = 500 \text{ N} $$

**Step 5: Calculate the total thrust correction.**
The total PID output is the sum of the three terms.
$$ F_{PID} = P + I + D $$
Substitute the calculated terms.
$$ F_{PID} = 4000 \text{ N} + (-650 \text{ N}) + 500 \text{ N} $$
$$ F_{PID} = 3350 \text{ N} + 500 \text{ N} $$
$$ F_{PID} = 3850 \text{ N} $$

**Final Answer:**
The required thrust correction from the PID controller is $\mathbf{3850 \text{ N}}$.

**Reflection:** This example demonstrates how a control system calculates an immediate action based on current errors. The positive thrust correction makes sense: the rocket is 2 meters too low and moving downwards, so it needs to increase thrust to move up. The integral term helps correct for steady-state errors (like gravity, if not explicitly accounted for elsewhere), and the derivative term anticipates future error based on the rate of change, providing damping. A key "trick" here is correctly interpreting the derivative of the error as the negative of the velocity and understanding how the integral term accumulates.

### Example 3 (Harder): State Estimation with a Noisy Sensor (Simplified Kalman-like Update)

**Problem:** A rocket's altimeter (a noisy sensor) reports an altitude of $z_{alt} = 101.5 \text{ m}$. From its Inertial Measurement Unit (IMU) and previous calculations, the rocket's predicted altitude is $z_{pred} = 100.8 \text{ m}$. We want to combine these two pieces of information to get a better estimate of the true altitude. Assume the altimeter's uncertainty (variance) is $\sigma_{alt}^2 = 2.25 \text{ m}^2$ and the predicted altitude's uncertainty (variance) is $\sigma_{pred}^2 = 0.81 \text{ m}^2$. Use a weighted average approach, similar to a simplified Kalman filter update.

**Given:**
*   Altimeter measurement $z_{alt} = 101.5 \text{ m}$
*   Altimeter variance $\sigma_{alt}^2 = 2.25 \text{ m}^2$
*   Predicted altitude $z_{pred} = 100.8 \text{ m}$
*   Predicted altitude variance $\sigma_{pred}^2 = 0.81 \text{ m}^2$

**Want:**
*   Optimized altitude estimate $\hat{z}$
*   Optimized altitude variance $\sigma_{\hat{z}}^2$

**Solution:**

**Step 1: Calculate the Kalman Gain (or weighting factor).**
In a simplified 1D scenario, the Kalman gain $K$ determines how much we trust the new measurement relative to our prediction.
$$ K = \frac{\sigma_{pred}^2}{\sigma_{pred}^2 + \sigma_{alt}^2} $$
Substitute the given variances.
$$ K = \frac{0.81}{0.81 + 2.25} $$
Calculate the denominator.
$$ K = \frac{0.81}{3.06} $$
Calculate the Kalman gain.
$$ K \approx 0.2647 $$
This value indicates that we weigh the prediction more heavily than the measurement because the prediction has lower uncertainty ($0.81 < 2.25$).

**Step 2: Update the altitude estimate.**
The new estimate is a weighted average of the prediction and the measurement, using the Kalman gain.
$$ \hat{z} = z_{pred} + K(z_{alt} - z_{pred}) $$
Substitute the values.
$$ \hat{z} = 100.8 \text{ m} + 0.2647(101.5 \text{ m} - 100.8 \text{ m}) $$
Calculate the difference between measurement and prediction.
$$ \hat{z} = 100.8 \text{ m} + 0.2647(0.7 \text{ m}) $$
Multiply the gain by the difference.
$$ \hat{z} = 100.8 \text{ m} + 0.18529 \text{ m} $$
Calculate the updated altitude estimate.
$$ \hat{z} = 100.98529 \text{ m} $$

**Step 3: Update the uncertainty (variance) of the estimate.**
The uncertainty of the new estimate is reduced because we've combined two pieces of information.
$$ \sigma_{\hat{z}}^2 = (1 - K)\sigma_{pred}^2 $$
Substitute the values.
$$ \sigma_{\hat{z}}^2 = (1 - 0.2647)(0.81 \text{ m}^2) $$
Calculate $(1 - K)$.
$$ \sigma_{\hat{z}}^2 = (0.7353)(0.81 \text{ m}^2) $$
Calculate the updated variance.
$$ \sigma_{\hat{z}}^2 \approx 0.5956 \text{ m}^2 $$

**Final Answer:**
The optimized altitude estimate is $\mathbf{100.985 \text{ m}}$ with an optimized variance of $\mathbf{0.596 \text{ m}^2}$.

**Reflection:** This example demonstrates the fundamental concept of sensor fusion, a cornerstone of navigation. The "trick" is understanding that we don't just blindly trust the sensors; we combine them with our existing knowledge (the prediction) based on their respective uncertainties. The Kalman gain acts as an intelligent weighting factor. Notice how the final variance ($0.596 \text{ m}^2$) is lower than both the altimeter's variance ($2.25 \text{ m}^2$) and the prediction's variance ($0.81 \text{ m}^2$), indicating a more confident estimate.

### Example 4 (Conceptual/Algorithmic): Trajectory Point Generation (Constant Jerk Profile)

**Problem:** A rocket needs to move from an initial vertical position $y_0 = 0 \text{ m}$ with initial velocity $v_0 = 0 \text{ m/s}$ to a final position $y_f = 100 \text{ m}$ with final velocity $v_f = 0 \text{ m/s}$ in a total time $T = 10 \text{ s}$. We want to generate a smooth trajectory profile for acceleration. A common approach for smooth transitions is to use a constant jerk profile (jerk is the derivative of acceleration). Assuming constant jerk $j$ for the first half of the trajectory ($0 \le t \le T/2$) and constant jerk $-j$ for the second half ($T/2 < t \le T$). Determine the required constant jerk $j$ and the maximum acceleration.

**Given:**
*   Initial position $y_0 = 0 \text{ m}$
*   Initial velocity $v_0 = 0 \text{ m/s}$
*   Final position $y_f = 100 \text{ m}$
*   Final velocity $v_f = 0 \text{ m/s}$
*   Total time $T = 10 \text{ s}$
*   Jerk profile: $j(t) = j$ for $0 \le t \le T/2$, and $j(t) = -j$ for $T/2 < t \le T$.

**Want:**
*   The constant jerk $j$.
*   The maximum acceleration $a_{max}$.

**Solution:**

**Step 1: Define the equations of motion for position, velocity, and acceleration based on jerk.**
Jerk $j(t)$ is the derivative of acceleration $a(t)$.
Acceleration $a(t)$ is the derivative of velocity $v(t)$.
Velocity $v(t)$ is the derivative of position $y(t)$.

For $0 \le t \le T/2$:
$$ a(t) = a_0 + \int_0^t j(\tau) d\tau = a_0 + jt $$
$$ v(t) = v_0 + \int_0^t a(\tau) d\tau = v_0 + a_0t + \frac{1}{2}jt^2 $$
$$ y(t) = y_0 + \int_0^t v(\tau) d\tau = y_0 + v_0t + \frac{1}{2}a_0t^2 + \frac{1}{6}jt^3 $$
Given $y_0 = 0$ and $v_0 = 0$. Also, assuming $a_0 = 0$ (starting from rest with no initial acceleration).
So for $0 \le t \le T/2$:
$$ a(t) = jt $$
$$ v(t) = \frac{1}{2}jt^2 $$
$$ y(t) = \frac{1}{6}jt^3 $$

**Step 2: Evaluate conditions at the midpoint $t_m = T/2$.**
At $t_m = T/2 = 5 \text{ s}$:
$$ a_m = j(T/2) = j(5) = 5j $$
$$ v_m = \frac{1}{2}j(T/2)^2 = \frac{1}{2}j(5)^2 = \frac{25}{2}j = 12.5j $$
$$ y_m = \frac{1}{6}j(T/2)^3 = \frac{1}{6}j(5)^3 = \frac{125}{6}j \approx 20.833j $$

**Step 3: Define equations of motion for the second half ($T/2 < t \le T$).**
For this phase, jerk is $-j$. We need to use the values at $t_m$ as initial conditions. Let $\tau = t - T/2$ be the time elapsed since the midpoint.
$$ a(\tau) = a_m + \int_0^\tau (-j) d\sigma = a_m - j\tau $$
$$ v(\tau) = v_m + \int_0^\tau a(\sigma) d\sigma = v_m + a_m\tau - \frac{1}{2}j\tau^2 $$
$$ y(\tau) = y_m + \int_0^\tau v(\sigma) d\sigma = y_m + v_m\tau + \frac{1}{2}a_m\tau^2 - \frac{1}{6}j\tau^3 $$

**Step 4: Apply final conditions at $t=T$ (which means $\tau = T/2$).**
At $t=T$ (so $\tau = T/2 = 5 \text{ s}$), we have $y(T) = y_f = 100 \text{ m}$ and $v(T) = v_f = 0 \text{ m/s}$.
Using the velocity equation:
$$ v_f = v_m + a_m(T/2) - \frac{1}{2}j(T/2)^2 $$
Substitute $v_f=0$, $v_m=12.5j$, $a_m=5j$, $T/2=5$.
$$ 0 = 12.5j + (5j)(5) - \frac{1}{2}j(5)^2 $$
$$ 0 = 12.5j + 25j - \frac{25}{2}j $$
$$ 0 = 12.5j + 25j - 12.5j $$
$$ 0 = 25j $$
This implies $j=0$, which is incorrect. The assumption $a_0=0$ was implicitly assuming a symmetric acceleration profile. Let's re-evaluate the acceleration profile.

A common "S-curve" or "trapezoidal velocity profile" with constant jerk is described as:
- Phase 1 (jerk $j$): $0 \le t \le T/2$
- Phase 2 (jerk $-j$): $T/2 < t \le T$

Let's use the property that for a symmetric profile (starting and ending at rest), the acceleration must be zero at $t=0$ and $t=T$.
Also, the velocity must be zero at $t=0$ and $t=T$.

Consider the acceleration profile:
$a(t) = jt$ for $0 \le t \le T/2$.
At $t=T/2$, $a(T/2) = j(T/2)$. This is the maximum acceleration, $a_{max}$.
For $T/2 < t \le T$, the jerk is $-j$.
So, $a(t) = a_{max} - j(t - T/2)$ for $T/2 < t \le T$.
At $t=T$, $a(T) = a_{max} - j(T - T/2) = a_{max} - j(T/2)$.
For the profile to be symmetric and end at $a(T)=0$, we must have $a_{max} - j(T/2) = 0$, which means $a_{max} = j(T/2)$. This is consistent with our definition of $a_{max}$.

Now, for velocity:
$v(t) = \int a(t) dt$.
For $0 \le t \le T/2$: $v(t) = \int_0^t j\tau d\tau = \frac{1}{2}jt^2$. (Since $v(0)=0$)
At $t=T/2$: $v(T/2) = \frac{1}{2}j(T/2)^2$. This is the maximum velocity, $v_{max}$.
For $T/2 < t \le T$:
$v(t) = v(T/2) + \int_{T/2}^t (a_{max} - j(\tau - T/2)) d\tau$
$v(t) = v_{max} + a_{max}(t - T/2) - \frac{1}{2}j(t - T/2)^2$
At $t=T$: $v(T) = v_{max} + a_{max}(T/2) - \frac{1}{2}j(T/2)^2$.
Since $v(T)=0$ and $a_{max} = j(T/2)$:
$0 = v_{max} + j(T/2)(T/2) - \frac{1}{2}j(T/2)^2$
$0 = v_{max} + j(T/2)^2 - \frac{1}{2}j(T/2)^2$
$0 = v_{max} + \frac{1}{2}j(T/2)^2$.
Substitute $v_{max} = \frac{1}{2}j(T/2)^2$:
$0 = \frac{1}{2}j(T/2)^2 + \frac{1}{2}j(T/2)^2 = j(T/2)^2$.
This again implies $j=0$.

This specific constant jerk profile (jerk $j$ then $-j$) only works if the initial and final velocities are equal and non-zero, or if the total displacement is zero.
A more appropriate constant jerk profile for point-to-point motion with $v_0=v_f=0$ is a "bang-coast-bang" or "bang-bang-bang" jerk profile, usually three phases: constant jerk, zero jerk, constant negative jerk, or constant jerk, constant negative jerk, constant jerk (for a more complex S-curve).

Let's re-evaluate the problem statement to fit a known solution for constant jerk, point-to-point motion with zero initial/final velocity.
For a smooth S-curve trajectory with $y_0, v_0, a_0 = 0$ and $y_f, v_f, a_f = 0$ over time $T$, the simplest form is a "constant jerk, constant negative jerk" profile, but it needs to be $j, -2j, j$ or similar to achieve $a_f=0$.

Let's consider a simpler common trajectory: **trapezoidal velocity profile**, which implies a **triangular acceleration profile**. This means acceleration increases linearly to a max, then decreases linearly to zero. This is equivalent to constant jerk for the first half and constant negative jerk for the second half, *if the initial and final accelerations are zero*.

Let's assume the problem implicitly wants a symmetric acceleration profile, where $a(0)=0$ and $a(T)=0$.
Also, $v(0)=0$ and $v(T)=0$.
And $y(0)=0, y(T)=y_f$.

From $a(t) = jt$ for $0 \le t \le T/2$ and $a(t) = j(T/2) - j(t-T/2)$ for $T/2 < t \le T$.
The maximum acceleration occurs at $t = T/2$: $a_{max} = j(T/2)$.

The velocity profile:
$v(t) = \frac{1}{2}jt^2$ for $0 \le t \le T/2$.
$v(T/2) = \frac{1}{2}j(T/2)^2$. This is $v_{max}$ for the half-segment.
For $T/2 < t \le T$:
$v(t) = v(T/2) + \int_{T/2}^t (j(T/2) - j(\tau - T/2)) d\tau$
$v(t) = \frac{1}{2}j(T/2)^2 + j(T/2)(t-T/2) - \frac{1}{2}j(t-T/2)^2$.
At $t=T$, $v(T)=0$.
$0 = \frac{1}{2}j(T/2)^2 + j(T/2)(T/2) - \frac{1}{2}j(T/2)^2$
$0 = j(T/2)^2$. This still leads to $j=0$.

This specific problem setup (constant jerk then constant negative jerk over $T/2$ each) implies that the velocity profile will be a parabola up to $T/2$ and then a parabola down to $T$. For $v(T)=0$, the area under the acceleration curve from $T/2$ to $T$ must be equal and opposite to the area from $0$ to $T/2$.
This is true for the acceleration profile $a(t) = jt$ (up) and $a(t) = j(T-t)$ (down).
Let's redefine the acceleration profile for the second half: $a(t) = j(T-t)$. This means the jerk is $j$ for $0 \le t \le T/2$ and $-j$ for $T/2 < t \le T$, but the initial acceleration for the second half is not $a(T/2)$. This is a common confusion.

Let's use the known solution for a symmetric velocity profile where $v(0)=v(T)=0$ and $y(0)=0, y(T)=y_f$.
The velocity profile is a triangle, peaking at $v_{max}$ at $T/2$.
$v_{max}$ is reached when $a(t)$ is integrated from $0$ to $T/2$.
The acceleration profile is a square wave from $a_{max}$ to $-a_{max}$ (bang-bang acceleration), or a triangle (constant jerk then negative constant jerk). The latter is what the problem is asking for.

For a triangular acceleration profile (constant jerk $j$ for $0 \le t \le T/2$, then constant jerk $-j$ for $T/2 < t \le T$), with $a(0)=0$ and $a(T)=0$:
The acceleration at $T/2$ is $a_{max} = j(T/2)$.
The velocity $v(t)$ is the integral of $a(t)$.
$v(t) = \frac{1}{2}jt^2$ for $0 \le t \le T/2$.
$v_{max} = v(T/2) = \frac{1}{2}j(T/2)^2$.
For $T/2 < t \le T$: $a(t) = a_{max} - j(t - T/2)$.
$v(t) = v_{max} + \int_{T/2}^t (a_{max} - j(\tau - T/2)) d\tau$
$v(t) = \frac{1}{2}j(T/2)^2 + j(T/2)(t - T/2) - \frac{1}{2}j(t - T/2)^2$.
At $t=T$, $v(T)=0$.
$0 = \frac{1}{2}j(T/2)^2 + j(T/2)(T/2) - \frac{1}{2}j(T/2)^2 = j(T/2)^2$. This still means $j=0$.

The problem statement "constant jerk $j$ for the first half ... and constant jerk $-j$ for the second half" is typically used for a *trapezoidal acceleration profile* which implies a *cubic position profile*.
Let's assume the problem means a symmetric S-curve where $a(0)=0$, $v(0)=0$, $y(0)=0$, and $a(T)=0$, $v(T)=0$, $y(T)=y_f$.
For such a profile, the jerk is $j$ for $0 \le t \le T/4$, then $-j$ for $T/4 < t \le 3T/4$, then $j$ for $3T/4 < t \le T$. This is a "double S-curve".

Given the simplicity of "first half, second half", it's more likely implying a **triangular acceleration profile**.
This means $a(t)$ goes from $0$ to $a_{max}$ (at $T/2$) and then back to $0$ (at $T$).
This is achieved by:
$j(t) = j_0$ for $0 \le t \le T/2$
$j(t) = -j_0$ for $T/2 < t \le T$
This profile would result in $a(0)=0$, $a(T/2)=j_0(T/2)$, $a(T)=0$.
And $v(0)=0$, $v(T)=0$.
This is possible if the total displacement is $y_f$.

Let's use the equations for $y(t)$ and $v(t)$ again, assuming $a(0)=0, v(0)=0, y(0)=0$.
For $0 \le t \le T/2$:
$a(t) = j t$
$v(t) = \frac{1}{2}j t^2$
$y(t) = \frac{1}{6}j t^3$

At $t_m = T/2$:
$a_m = j(T/2)$
$v_m = \frac{1}{2}j(T/2)^2$
$y_m = \frac{1}{6}j(T/2)^3$

For $T/2 < t \le T$:
The jerk is $-j$.
$a(t) = a_m + \int_{T/2}^t (-j) d\tau = j(T/2) - j(t - T/2)$
$v(t) = v_m + \int_{T/2}^t (j(T/2) - j(\tau - T/2)) d\tau = v_m + j(T/2)(t - T/2) - \frac{1}{2}j(t - T/2)^2$
$y(t) = y_m + \int_{T/2}^t v(\tau) d\tau = y_m + v_m(t - T/2) + \frac{1}{2}j(T/2)(t - T/2)^2 - \frac{1}{6}j(t - T/2)^3$

Now, apply the final conditions at $t=T$, which means $(t-T/2) = T/2$:
$a(T) = j(T/2) - j(T/2) = 0$. (This is consistent)
$v(T) = v_m + j(T/2)(T/2) - \frac{1}{2}j(T/2)^2 = v_m + j(T/2)^2 - \frac{1}{2}j(T/2)^2 = v_m + \frac{1}{2}j(T/2)^2$.
We need $v(T)=0$. So, $0 = v_m + \frac{1}{2}j(T/2)^2$.
Substitute $v_m = \frac{1}{2}j(T/2)^2$:
$0 = \frac{1}{2}j(T/2)^2 + \frac{1}{2}j(T/2)^2 = j(T/2)^2$.
This still implies $j=0$.

This means the "constant jerk $j$ for the first half and constant jerk $-j$ for the second half" profile *cannot* achieve $v_f=0$ and $y_f \ne 0$ if $v_0=0$ and $a_0=0$. It can only achieve $v_f=0$ if $y_f=0$.

Let's adjust the interpretation of the problem to a standard **"S-curve" profile for position**, which means a **trapezoidal velocity profile**, which means a **triangular acceleration profile**, which means a **bang-bang jerk profile (constant jerk then constant negative jerk)**.
The specific phrasing "constant jerk $j$ for the first half... and constant jerk $-j$ for the second half" typically refers to the *acceleration profile* being triangular.
If acceleration is triangular:
$a(t) = j t$ for $0 \le t \le T/2$ (jerk is $j$)
$a(t) = j(T-t)$ for $T/2 < t \le T$ (jerk is $-j$)
This ensures $a(0)=0$ and $a(T)=0$.
Now let's re-derive $v(t)$ and $y(t)$.

**Step 1 (Revised): Define the equations of motion based on triangular acceleration.**
Given $y_0 = 0, v_0 = 0, a_0 = 0$.
For $0 \le t \le T/2$:
$a(t) = j t$
$v(t) = \int_0^t j\tau d\tau = \frac{1}{2}jt^2$
$y(t) = \int_0^t \frac{1}{2}j\tau^2 d\tau = \frac{1}{6}jt^3$

At $t_m = T/2$:
$a_m = j(T/2)$
$v_m = \frac{1}{2}j(T/2)^2$
$y_m = \frac{1}{6}j(T/2)^3$

For $T/2 < t \le T$:
$a(t) = j(T-t)$
$v(t) = v_m + \int_{T/2}^t j(T-\tau) d\tau = v_m + j[T\tau - \frac{1}{2}\tau^2]_{T/2}^t$
$v(t) = v_m + j(Tt - \frac{1}{2}t^2) - j(T(T/2) - \frac{1}{2}(T/2)^2)$
$v(t) = v_m + j(Tt - \frac{1}{2}t^2) - j(\frac{1}{2}T^2 - \frac{1}{8}T^2) = v_m + j(Tt - \frac{1}{2}t^2) - j(\frac{3}{8}T^2)$
Let's check $v(T)$:
$v(T) = v_m + j(T^2 - \frac{1}{2}T^2) - j(\frac{3}{8}T^2) = v_m + j(\frac{1}{2}T^2) - j(\frac{3}{8}T^2) = v_m + j(\frac{4-3}{8}T^2) = v_m + \frac{1}{8}jT^2$.
Substitute $v_m = \frac{1}{2}j(T/2)^2 = \frac{1}{8}jT^2$.
$v(T) = \frac{1}{8}jT^2 + \frac{1}{8}jT^2 = \frac{1}{4}jT^2$.
We need $v(T)=0$. This means $j=0$.

My interpretation of the "constant jerk $j$ for the first half and constant jerk $-j$ for the second half" is consistently leading to $j=0$ if $v_f=0$ and $y_f \ne 0$. This implies the problem statement, as literally translated to jerk, is not for a standard point-to-point trajectory.

Let's assume the problem meant a **bang-bang acceleration profile** (constant positive acceleration then constant negative acceleration). This is a very common and simpler profile for minimum time/fuel.
If $a(t) = a_{max}$ for $0 \le t \le T/2$ and $a(t) = -a_{max}$ for $T/2 < t \le T$.
This is a standard "bang-bang" acceleration profile, which results in a trapezoidal velocity profile.
Let's re-solve with this interpretation, as it's a more common "simple" trajectory. The "constant jerk" phrasing is a red herring or a misstatement for this type of problem.

**Problem (Re-interpreted):** A rocket needs to move from $y_0 = 0 \text{ m}$ with $v_0 = 0 \text{ m/s}$ to $y_f = 100 \text{ m}$ with $v_f = 0 \text{ m/s}$ in $T = 10 \text{ s}$. Determine the required constant acceleration $a_{max}$ for a symmetric "bang-bang" acceleration profile (i.e., $a_{max}$ for $0 \le t \le T/2$, then $-a_{max}$ for $T/2 < t \le T$).

**Given (Re-interpreted):**
*   Initial position $y_0 = 0 \text{ m}$
*   Initial velocity $v_0 = 0 \text{ m/s}$
*   Final position $y_f = 100 \text{ m}$
*   Final velocity $v_f = 0 \text{ m/s}$
*   Total time $T = 10 \text{ s}$
*   Acceleration profile: $a(t) = a_{max}$ for $0 \le t \le T/2$, and $a(t) = -a_{max}$ for $T/2 < t \le T$.

**Want:**
*   The constant acceleration $a_{max}$.

**Solution (Re-interpreted):**

**Step 1: Define the equations of motion for velocity and position for the first half.**
For $0 \le t \le T/2$:
$$ a(t) = a_{max} $$
$$ v(t) = v_0 + \int_0^t a_{max} d\tau = 0 + a_{max}t $$
$$ y(t) = y_0 + \int_0^t a_{max}\tau d\tau = 0 + \frac{1}{2}a_{max}t^2 $$

**Step 2: Evaluate conditions at the midpoint $t_m = T/2$.**
At $t_m = T/2 = 5 \text{ s}$:
$$ v_m = a_{max}(T/2) = a_{max}(5) = 5a_{max} $$
$$ y_m = \frac{1}{2}a_{max}(T/2)^2 = \frac{1}{2}a_{max}(5)^2 = \frac{25}{2}a_{max} = 12.5a_{max} $$

**Step 3: Define equations of motion for velocity and position for the second half.**
For $T/2 < t \le T$:
$$ a(t) = -a_{max} $$
Let $\tau = t - T/2$ be the time elapsed since the midpoint.
$$ v(t) = v_m + \int_0^\tau (-a_{max}) d\sigma = v_m - a_{max}\tau $$
$$ y(t) = y_m + \int_0^\tau (v_m - a_{max}\sigma) d\sigma = y_m + v_m\