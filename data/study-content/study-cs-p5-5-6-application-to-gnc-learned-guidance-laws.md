## 1. What it is — in plain English

Imagine you're trying to throw a paper airplane to hit a specific spot on the wall. The first time, it might miss. You adjust how you throw it – maybe a bit harder, a different angle. You learn from each attempt until you get closer. "Learned guidance laws" for spacecraft or airplanes are similar, but instead of a human learning, a computer program learns.

In aerospace, "Guidance, Navigation, and Control" (GNC) is the brain of a vehicle. **Guidance** figures out the best path to follow to get from where it is to where it needs to be. **Navigation** tells the vehicle exactly where it is and how it's moving. **Control** makes sure the vehicle actually follows the path by adjusting things like engine thrust or wing flaps.

Traditionally, the guidance part uses fixed mathematical rules, programmed in advance. But what if there are unexpected winds, or the target moves, or an engine doesn't produce as much power as expected? That's where "learned guidance laws" come in. It means using techniques from Machine Learning (ML) to allow the vehicle's guidance system to *learn* the best path or actions, either by practicing in simulations or by observing expert examples, so it can adapt to situations that weren't perfectly predicted beforehand.

Think of it like a very smart, self-improving GPS that not only tells you the best route but also dynamically changes its mind about the route based on real-time traffic, weather, and even how your car is performing, all without a human needing to reprogram it every time. It's about making aerospace vehicles more intelligent, adaptable, and autonomous.

## 2. Why it matters — real-world applications

Learned guidance laws are crucial for pushing the boundaries of what autonomous aerospace systems can achieve, especially in complex, uncertain, or dynamic environments.

1.  **SpaceX Starship Landing:** The precise vertical landing of large rockets like Starship requires incredible accuracy and robustness to atmospheric disturbances, engine performance variations, and even slight changes in landing pad conditions. Learned guidance laws, often developed through extensive simulations using Reinforcement Learning, allow these vehicles to execute complex, fuel-efficient, and highly precise maneuvers that would be extremely difficult to pre-program for every possible scenario. This enables reusability, which is key to reducing space travel costs.

2.  **Autonomous Drone Delivery and Inspection:** Companies like Amazon (Prime Air) and Wing (Alphabet subsidiary) are developing drones for package delivery. These drones need to navigate complex urban or suburban environments, avoid dynamic obstacles (other drones, birds, power lines), handle varying wind conditions, and land precisely at designated spots. Learned guidance laws enable them to develop robust obstacle avoidance strategies and adaptive flight paths in real-time, making deliveries safer and more reliable than rigid, pre-programmed routes.

3.  **Satellite Rendezvous and Docking:** For missions like refueling satellites, servicing the International Space Station, or assembling large structures in orbit, two spacecraft must precisely approach and connect. This is a highly delicate operation requiring extreme precision, minimal fuel consumption, and robust handling of sensor noise or thruster imperfections. Learned guidance laws can optimize the approach trajectory and control commands to minimize fuel, ensure soft contact, and adapt to any drift or unexpected movement from either spacecraft, reducing the risk of collision.

4.  **Hypersonic Re-entry Vehicles:** Vehicles re-entering Earth's atmosphere at hypersonic speeds (many times the speed of sound) face extreme heat, rapidly changing atmospheric density, and complex aerodynamic forces. Minor errors can lead to significant deviations or structural failure. Learned guidance laws can enable these vehicles to adapt their flight path and control surface deflections in real-time based on actual atmospheric conditions and vehicle state, ensuring a safe and accurate descent to a target landing zone, even if the atmosphere behaves differently than predicted.

5.  **Missile Defense Systems:** Intercepting highly maneuverable ballistic or hypersonic missiles is an immense challenge. The interceptor missile needs to predict the target's trajectory, account for its own dynamics, and make real-time adjustments to achieve a hit. Learned guidance laws can process vast amounts of sensor data to predict target maneuvers, optimize interception trajectories, and generate adaptive control commands, potentially improving the probability of a successful intercept against increasingly sophisticated threats.

## 3. Prerequisites — what you must know first

To deeply understand learned guidance laws, you should have a solid grasp of the following concepts. If any of these are unfamiliar, it's highly recommended to pause and study them first.

*   **Calculus (Differential & Integral):** Understanding rates of change (derivatives) for modeling motion and accumulation (integrals) for calculating total change or area under curves. Essential for dynamics and optimization.
*   **Linear Algebra:** Knowledge of vectors, matrices, transformations, eigenvalues, and eigenvectors. Crucial for representing states, control inputs, system dynamics, and for understanding how neural networks process data.
*   **Differential Equations:** The ability to formulate and solve ordinary differential equations (ODEs) and partial differential equations (PDEs) is fundamental, as aerospace vehicle dynamics are almost universally described by differential equations.
*   **Control Theory (Basics):** Concepts like feedback control, open-loop vs. closed-loop systems, stability (e.g., Lyapunov stability), transfer functions, and basic controllers (e.g., PID controllers). This provides the traditional framework that learned guidance aims to enhance or replace.
*   **Optimization (Basics):** Understanding how to find the minimum or maximum of a function, including gradient descent, cost functions, and constraints. Machine learning is fundamentally an optimization problem.
*   **Machine Learning (Fundamentals):** Core concepts of supervised learning (regression, classification), unsupervised learning, neural networks (architecture, activation functions, backpropagation), and especially the basics of Reinforcement Learning (agents, environments, states, actions, rewards, policies, value functions).
*   **Aerospace Dynamics (Basics):** Understanding Newton's laws of motion, forces acting on an aircraft/spacecraft (thrust, drag, lift, gravity), basic equations of motion for rigid bodies, and coordinate systems.
*   **Probability & Statistics:** Concepts like probability distributions, expected values, variance, and statistical inference. Essential for dealing with uncertainty, sensor noise, and evaluating model performance.

## 4. The core idea — step by step

Learned guidance laws represent a paradigm shift from purely model-based, pre-programmed guidance to data-driven, adaptive guidance. Let's break down the core idea.

### ### Step 1: Traditional Guidance — The Fixed Rulebook

*   **Plain English Statement:** Imagine a robot trying to walk a straight line. Traditional guidance gives it a very specific, pre-written set of instructions: "Move left leg forward 10cm, then right leg forward 10cm, repeat." These instructions are based on a perfect understanding of the robot's mechanics and environment.

*   **Small Concrete Example:** A simple missile guidance system might use "Proportional Navigation (PN)." This law dictates that the missile should turn at a rate proportional to the line-of-sight rate (how fast the target appears to be moving across the missile's field of view). It's a fixed mathematical formula:
    $$ \dot{\psi}_M = N \dot{\lambda} $$
    where $\dot{\psi}_M$ is the missile's turning rate, $N$ is the navigation constant (a fixed number, usually between 3 and 5), and $\dot{\lambda}$ is the line-of-sight rate.

*   **Formal/Mathematical Version:** A traditional guidance law is often a deterministic function $u = g(x, x_D, t)$ where $u$ is the control command (e.g., thrust, control surface deflection), $x$ is the current state of the vehicle (position, velocity, orientation), $x_D$ is the desired state or trajectory, and $t$ is time. This function $g$ is derived from known physics, control theory, and optimization principles, and is typically fixed before launch.

*   **What Could Go Wrong:** This approach works well if the environment is perfectly predictable and the vehicle's behavior exactly matches its mathematical model. However, real-world scenarios are rarely perfect. Unexpected wind gusts, engine malfunctions, or unpredicted target maneuvers can cause the vehicle to deviate significantly, and the fixed rulebook might not have an optimal response.

### ### Step 2: The Need for Adaptability — When the Rules Break

*   **Plain English Statement:** Now, imagine our robot walking on uneven ground, or a sudden gust of wind pushes it. If it only follows the fixed instructions, it might stumble or fall. It needs to *adapt* its walking style based on what it senses from the environment.

*   **Small Concrete Example:** A drone is programmed to fly a straight path to deliver a package. Suddenly, a strong, unpredictable crosswind hits it. The pre-programmed control commands, designed for calm conditions, might cause it to drift off course significantly or even lose stability. The drone needs to adjust its control inputs (e.g., motor speeds) in real-time beyond what simple feedback loops can achieve, to counteract this unknown disturbance.

*   **Formal/Mathematical Version:** The system dynamics are often represented as $\dot{x} = f(x, u, d)$, where $d$ represents unknown disturbances or model uncertainties. Traditional guidance often assumes $d \approx 0$ or that $d$ is a known, bounded quantity. When $d$ becomes significant or unpredictable, the pre-computed optimal control $u^*$ for $d=0$ is no longer optimal, or even feasible. We need a way to learn about $d$ or learn a control policy that is robust to $d$.

*   **What Could Go Wrong:** Without adaptability, the vehicle might fail its mission, waste excessive fuel trying to correct, or even become unstable and crash when faced with conditions not explicitly accounted for in its design.

### ### Step 3: Introducing Machine Learning — Learning the Best Response

*   **Plain English Statement:** Instead of giving the robot fixed instructions, we let it *learn* how to walk. We give it a goal (stay upright, move forward) and let it try different leg movements. If it stays upright and moves forward, it gets a "good job!" signal. If it falls, it gets a "try something else" signal. Over time, it learns the best way to walk in various situations.

*   **Small Concrete Example:** Consider a simple game where an AI controls a spaceship trying to navigate through an asteroid field. The AI doesn't know the exact physics of the ship or the asteroids beforehand. Instead, it tries different thrust commands (actions) based on its current view of the game (state). If it avoids an asteroid and moves towards the goal, it gets points (reward). If it crashes, it loses points. The ML algorithm uses these experiences to figure out which actions are best in which situations.

*   **Formal/Mathematical Version:** Machine Learning provides frameworks to derive a policy $\pi(s) \rightarrow a$ (mapping observed state $s$ to an action $a$) or a model $\hat{f}(x, u) \approx f(x, u)$ (learning the system dynamics) directly from data or experience. This policy or model is then used to generate guidance commands. The learning process involves optimizing a performance metric (e.g., minimizing a loss function in supervised learning, maximizing cumulative reward in reinforcement learning).

*   **What Could Go Wrong:** The ML model might learn an inefficient or even dangerous policy if the training data is insufficient, biased, or if the "reward" system isn't perfectly aligned with the true mission objective. It might also struggle to generalize to situations significantly different from its training experience.

### ### Step 4: Reinforcement Learning (RL) for Guidance — Learning by Doing

*   **Plain English Statement:** This is the "trial and error" method. The vehicle is like a student who learns by repeatedly trying to achieve a goal. It gets a "score" (reward) for its actions. A high score means it did well, a low score (or penalty) means it did poorly. It then adjusts its strategy to get higher scores next time.

*   **Small Concrete Example:** Imagine training a lunar lander in a simulator. The lander tries different thrust vectors and durations.
    *   If it lands softly and precisely on the target, it gets a large positive reward (e.g., +1000).
    *   If it crashes, a large negative reward (e.g., -1000).
    *   For every unit of fuel consumed, a small negative reward (e.g., -1 per kg).
    *   For every step it's far from the target, a small negative reward (e.g., -0.1 * distance).
    Over thousands of simulated landings, the RL agent learns a policy that maximizes its total accumulated reward, essentially learning to land softly, accurately, and fuel-efficiently.

*   **Formal/Mathematical Version:** RL problems are often framed as Markov Decision Processes (MDPs) defined by a tuple $(\mathcal{S}, \mathcal{A}, P, R, \gamma)$.
    *   $\mathcal{S}$: State space (e.g., position, velocity, fuel remaining).
    *   $\mathcal{A}$: Action space (e.g., thrust magnitude and direction).
    *   $P(s' | s, a)$: Transition probability, the likelihood of reaching state $s'$ from $s$ after taking action $a$.
    *   $R(s, a, s')$: Reward function, the immediate feedback for taking action $a$ in state $s$ and landing in $s'$.
    *   $\gamma$: Discount factor, balancing immediate vs. future rewards.
    The goal is to find an optimal policy $\pi^*(s) \rightarrow a$ that maximizes the expected cumulative discounted reward:
    $$ J(\pi) = E_{\pi} \left[ \sum_{t=0}^{\infty} \gamma^t R(s_t, a_t, s_{t+1}) \right] $$
    Algorithms like Q-learning or Policy Gradients are used to find $\pi^*$.

*   **What Could Go Wrong:** RL can be very data-intensive, requiring many trials (often in simulation). Designing an effective reward function is critical and often tricky ("reward hacking" is a common issue, where the agent finds unintended ways to maximize reward without achieving the true objective). Ensuring safety during exploration (especially in real-world applications) is a major challenge.

### ### Step 5: Supervised Learning (SL) for Guidance — Learning by Imitation

*   **Plain English Statement:** This is the "learn by watching an expert" method. Instead of trial and error, we show the computer many examples of an expert (e.g., a human pilot or a highly optimized traditional controller) performing the task. The computer then tries to mimic the expert's actions given the same situations.

*   **Small Concrete Example:** To train an autonomous drone to fly safely in a complex environment, we could have a skilled human pilot fly the drone through various scenarios (e.g., navigating tight spaces, avoiding obstacles, landing). During these flights, we record the drone's state (position, velocity, sensor readings from cameras/LIDAR) and the pilot's control inputs (joystick commands, throttle). We then use this dataset to train a neural network. The network takes the drone's state as input and tries to predict the pilot's control inputs as output.

*   **Formal/Mathematical Version:** Given a dataset of expert demonstrations $D = \{(s_i, a_i)\}_{i=1}^N$, where $s_i$ is the observed state and $a_i$ is the expert's action in that state. The goal is to train a function approximator (e.g., a neural network) $\pi_{\theta}(s)$ parameterized by $\theta$ such that $\pi_{\theta}(s_i) \approx a_i$. This is typically achieved by minimizing a loss function, such as Mean Squared Error (MSE) for continuous actions:
    $$ \mathcal{L}(\theta) = \frac{1}{N} \sum_{i=1}^N || \pi_{\theta}(s_i) - a_i ||^2 $$
    This process is known as "Imitation Learning" or "Behavioral Cloning."

*   **What Could Go Wrong:** The learned policy is only as good as the expert it imitates. If the expert makes mistakes, the learned policy will too. It also struggles with "out-of-distribution" states – situations not encountered in the training data. If the drone encounters a novel obstacle configuration, it might not know how to react because the expert never showed it. This can lead to compounding errors.

### ### Step 6: Hybrid Approaches and Online Learning — Combining the Best

*   **Plain English Statement:** Sometimes, it's best to combine the strengths of both worlds. Use the reliable "rulebook" for most situations, but let the "learner" step in and adapt when things get tricky or for fine-tuning. Also, sometimes the system needs to keep learning *while* it's operating, not just during training.

*   **Small Concrete Example:** A Mars rover might use a robust, pre-programmed path planner for navigating large, known terrains. However, when it encounters a patch of loose sand or an unexpected rock formation, a learned guidance module (trained via RL or SL) could take over locally to adjust wheel speeds and steering angles to safely traverse the obstacle. The rover might also continuously update its internal models based on new sensor data (online learning) to better predict terrain properties for future navigation.

*   **Formal/Mathematical Version:** Hybrid approaches often involve:
    1.  **Model Predictive Control (MPC) with Learned Models:** An MPC controller uses a predictive model of the system to optimize future control actions. If this model $f(x, u)$ is partially unknown or time-varying, an ML model $\hat{f}(x, u, \theta)$ can be trained online to estimate the unknown parts or disturbances. The MPC then uses this adaptive model for its optimization.
    2.  **Adaptive Control with Learned Components:** A traditional adaptive controller might adjust gains based on system identification. ML can be used to identify complex non-linearities or to directly learn the adaptive laws.
    3.  **Hierarchical Control:** A high-level ML policy sets mission goals or selects among different traditional guidance modes, while low-level traditional controllers execute the specific maneuvers.
    4.  **Online Reinforcement Learning/Transfer Learning:** An agent trained in simulation (offline) can fine-tune its policy in the real world (online) with limited real-world experience, or transfer knowledge from one task to a similar one.

*   **What Could Go Wrong:** Increased complexity in design, verification, and validation. Ensuring stability and safety during online learning or adaptation is a significant challenge, as an incorrect online update could lead to catastrophic failure. There's also the computational overhead of running complex ML models in real-time on embedded hardware.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple Disturbance Compensation (Conceptual)

**Problem:** A drone is designed to fly along a straight line (x-axis) at a constant velocity $V_x$. Its traditional guidance system issues a thrust command $T_x$ to maintain this velocity. However, it experiences a small, consistent crosswind disturbance $D_y$ in the y-direction, causing it to drift. We want to conceptualize how a simple learned component could compensate for this drift.

**Given:**
*   Desired velocity: $V_x = 10 \text{ m/s}$
*   Nominal thrust command: $T_x = 10 \text{ N}$ (to maintain $V_x$)
*   Crosswind disturbance: $D_y = 2 \text{ N}$ (constant, unknown to nominal guidance)
*   Drone's state at time $t$: $(x_t, y_t, \dot{x}_t, \dot{y}_t)$
*   A sensor measures the lateral drift $\Delta y_t = y_t - y_{desired}$ (where $y_{desired}=0$).

**What we want:** A learned correction $T_y^{learned}$ to be added to the control output to counteract $D_y$.

**Show every algebraic / logical step:**

**Step 1: Understand the Nominal Guidance (without learning)**
*   The drone's nominal guidance system is designed to maintain $V_x$ and $y=0$. It provides $T_x = 10 \text{ N}$ and assumes $T_y = 0 \text{ N}$ (no lateral thrust needed).
*   Due to $D_y$, the drone will experience an acceleration in the y-direction, causing $\dot{y}_t$ to become non-zero and $y_t$ to drift away from $0$.

**Step 2: Observe the Error**
*   Let's say after some time, the drone has drifted to $y_t = 5 \text{ m}$.
*   The lateral error is $\Delta y_t = y_t - 0 = 5 \text{ m}$.
*   The nominal guidance system doesn't account for this, so it continues to command $T_y = 0$.

**Step 3: Conceptualize a Learned Correction**
*   We want to find a $T_y^{learned}$ that, when applied, cancels out $D_y$.
*   Since $D_y$ is constant, we might expect $T_y^{learned}$ to also be a constant value, or a value that depends on the observed drift.
*   Let's assume we collect data over several flights where we observe different crosswind conditions and the resulting drift. For simplicity, imagine we have observed that a constant crosswind of $2 \text{ N}$ *always* leads to a steady drift that can be corrected by a constant lateral thrust of $2 \text{ N}$ in the opposite direction.

**Step 4: Formulate a Simple Learning Problem**
*   We can frame this as a supervised learning problem: predict the required lateral thrust $T_y^{learned}$ based on the observed lateral error $\Delta y_t$ and perhaps the lateral velocity $\dot{y}_t$.
*   For this very simple case, if we know $D_y = 2 \text{ N}$ is causing the drift, the ideal $T_y^{learned}$ would be $-2 \text{ N}$ to perfectly counteract it.
*   A very basic "learner" could be a simple proportional controller that has *learned* its gain.
    $$ T_y^{learned} = -K_P \cdot y_t - K_D \cdot \dot{y}_t $$
    *   Let's say we simulated the drone in wind and found that setting $K_P = 0.5$ and $K_D = 1.0$ effectively cancels the drift. These $K_P, K_D$ values are the "learned parameters" in this simple model.

**Step 5: Apply the Learned Correction**
*   If the drone is at $y_t = 5 \text{ m}$ and $\dot{y}_t = 0.5 \text{ m/s}$ (still drifting).
*   The learned guidance would compute:
    $$ T_y^{learned} = -0.5 \cdot (5 \text{ m}) - 1.0 \cdot (0.5 \text{ m/s}) $$
    $$ T_y^{learned} = -2.5 \text{ N} - 0.5 \text{ N} $$
    $$ \boxed{T_y^{learned} = -3.0 \text{ N}} $$
*   This $-3.0 \text{ N}$ lateral thrust would then be added to the drone's control commands to push it back towards $y=0$.

**Reflection:** This example is highly simplified. The "learning" here is just finding good PID gains, which is typically done through tuning. However, it illustrates the core idea: observing an error (drift), and then using a *model* (even a simple one like a proportional-derivative controller) whose *parameters* ($K_P, K_D$) were determined through a data-driven process (e.g., simulation, optimization) to generate a corrective action. In more complex ML scenarios, the model would be a neural network, and its parameters (weights and biases) would be learned through backpropagation from vast amounts of data. The "trick" here was to connect the idea of "learning" to finding optimal controller parameters, rather than a full RL agent.

---

### Example 2: Simplified 2D Rocket Landing with Reinforcement Learning (Conceptual Reward)

**Problem:** A rocket needs to land vertically at a target point $(x_T, y_T) = (0, 0)$ from an initial state $(x_0, y_0, \dot{x}_0, \dot{y}_0, m_0) = (100, 100, -10, -10, 1000)$. It has limited fuel and a maximum thrust. We want to define a reward function for a Reinforcement Learning agent to learn an optimal landing policy.

**Given:**
*   Initial state: $s_0 = (x=100, y=100, \dot{x}=-10, \dot{y}=-10, m=1000)$
*   Target: $(x_T, y_T) = (0, 0)$
*   Max thrust: $T_{max} = 20000 \text{ N}$ (vertical thrust only for simplicity, or thrust vector with magnitude up to $T_{max}$)
*   Fuel consumption rate: $\dot{m} = k_f \cdot T$, where $k_f = 0.01 \text{ kg/N}$
*   Gravity: $g = 9.81 \text{ m/s}^2$ (acting in -y direction)
*   Landing conditions: $|x| < 1 \text{ m}$, $|y| < 1 \text{ m}$, $|\dot{x}| < 0.5 \text{ m/s}$, $|\dot{y}| < 0.5 \text{ m/s}$

**What we want:** A reward function $R(s, a, s')$ that guides an RL agent to learn a policy to land safely, accurately, and fuel-efficiently.

**Show every algebraic / logical step:**

**Step 1: Define the State and Action Spaces (for context)**
*   **State $s$**: $(x, y, \dot{x}, \dot{y}, m)$ – position, velocity, mass.
*   **Action $a$**: (Thrust_x, Thrust_y) – where $T_x^2 + T_y^2 \le T_{max}^2$. For simplicity, let's assume we can control thrust magnitude $T \in [0, T_{max}]$ and angle $\alpha \in [-\pi/2, \pi/2]$ relative to vertical. So, $T_x = T \sin \alpha$, $T_y = T \cos \alpha$.

**Step 2: Identify Key Objectives**
1.  **Reach Target:** Land at $(0,0)$.
2.  **Soft Landing:** Small velocities at touchdown.
3.  **Fuel Efficiency:** Minimize fuel used.
4.  **Avoid Crash:** Don't hit the ground too hard or run out of fuel mid-air.

**Step 3: Design the Reward Function Components**

*   **Proximity to Target (Negative Reward - Cost):** We want to penalize the agent for being far from the target. A common choice is the negative Euclidean distance.
    $$ R_{dist} = -C_{dist} \cdot \sqrt{x^2 + y^2} $$
    Let $C_{dist} = 0.1$. So, $R_{dist} = -0.1 \sqrt{x^2 + y^2}$.

*   **Velocity at Landing (Negative Reward - Cost):** Penalize high velocities, especially near the ground.
    $$ R_{vel} = -C_{vel} \cdot (\dot{x}^2 + \dot{y}^2) $$
    Let $C_{vel} = 0.5$. So, $R_{vel} = -0.5 (\dot{x}^2 + \dot{y}^2)$.

*   **Fuel Consumption (Negative Reward - Cost):** Penalize fuel usage. This is typically applied at each time step based on the thrust applied.
    $$ R_{fuel} = -C_{fuel} \cdot \Delta m $$
    where $\Delta m$ is the mass of fuel consumed in the current time step. $\Delta m = k_f \cdot T \cdot \Delta t$.
    Let $C_{fuel} = 10$. So, $R_{fuel} = -10 \cdot k_f \cdot T \cdot \Delta t$.

*   **Successful Landing (Positive Reward - Bonus):** A large positive reward for meeting all landing criteria. This is a terminal reward (given only once when the episode ends successfully).
    Let $R_{success} = +10000$.
    This reward is given if: $|x| < 1$, $|y| < 1$, $|\dot{x}| < 0.5$, $|\dot{y}| < 0.5$.

*   **Crashing / Running out of Fuel (Negative Reward - Penalty):** A large negative reward for mission failure. This is also a terminal reward.
    Let $R_{crash} = -5000$.
    This reward is given if: $y \le 0$ AND (not a successful landing) OR if $m \le 0$ (ran out of fuel).

**Step 4: Combine the Reward Components**

The total reward for a time step $t$ (from state $s_t$ taking action $a_t$ to state $s_{t+1}$) would be:

$$ R(s_t, a_t, s_{t+1}) = R_{dist}(s_{t+1}) + R_{vel}(s_{t+1}) + R_{fuel}(a_t) + R_{terminal} $$

Where $R_{terminal}$ is zero for most steps, but becomes $R_{success}$ or $R_{crash}$ if the episode terminates.

**Example Calculation (Hypothetical time step):**
Suppose at time $t$, the rocket is at $s_t = (x=10, y=5, \dot{x}=-1, \dot{y}=-2, m=500)$. It applies thrust $T=5000 \text{ N}$ for $\Delta t = 0.1 \text{ s}$.
This leads to $s_{t+1} = (x=9.9, y=4.8, \dot{x}=-0.9, \dot{y}=-1.8, m=495)$ (simplified dynamics).

1.  **$R_{dist}$:** $x=9.9, y=4.8$. $\sqrt{9.9^2 + 4.8^2} = \sqrt{98.01 + 23.04} = \sqrt{121.05} \approx 11.0$.
    $R_{dist} = -0.1 \cdot 11.0 = -1.1$
2.  **$R_{vel}$:** $\dot{x}=-0.9, \dot{y}=-1.8$. $\dot{x}^2 + \dot{y}^2 = (-0.9)^2 + (-1.8)^2 = 0.81 + 3.24 = 4.05$.
    $R_{vel} = -0.5 \cdot 4.05 = -2.025$
3.  **$R_{fuel}$:** $T=5000 \text{ N}$, $\Delta t = 0.1 \text{ s}$. $\Delta m = 0.01 \cdot 5000 \cdot 0.1 = 5 \text{ kg}$.
    $R_{fuel} = -10 \cdot 5 = -50$
4.  **$R_{terminal}$:** Not a terminal state, so $0$.

Total reward for this step: $R = -1.1 - 2.025 - 50 = -53.125$

If the next state $s_{t+1}$ was a successful landing:
*   $R_{dist}$ and $R_{vel}$ would be very small (close to 0).
*   $R_{fuel}$ would be calculated for the last step.
*   $R_{terminal}$ would be $R_{success} = +10000$.

$$ \boxed{R(s, a, s') = -0.1\sqrt{x'^2+y'^2} - 0.5(\dot{x}'^2+\dot{y}'^2) - 10 \cdot k_f \cdot T \cdot \Delta t + R_{terminal}} $$

**Reflection:** The "trick" here is balancing the different objectives. The large positive reward for success drives the agent towards the goal, while the continuous negative rewards for distance, velocity, and fuel consumption shape the trajectory to be efficient and smooth. The coefficients ($C_{dist}, C_{vel}, C_{fuel}$) are hyper-parameters that need careful tuning. If $C_{fuel}$ is too high, the agent might never reach the target. If $R_{success}$ is too low, the agent might not prioritize landing. This example shows how designing a good reward function is key to successful RL for guidance.

---

### Example 3: Imitation Learning for Drone Trajectory Following

**Problem:** Train a neural network (NN) to mimic an expert drone pilot's commands to follow a complex 3D trajectory while avoiding obstacles.

**Given:**
*   **Expert Trajectory Dataset:** $D = \{(s_i, a_i)\}_{i=1}^N$. Each pair $(s_i, a_i)$ consists of:
    *   **State $s_i$**: A vector of observations at time $i$. For a drone, this could include:
        *   Position: $(x, y, z)$
        *   Velocity: $(\dot{x}, \dot{y}, \dot{z})$
        *   Orientation: (roll, pitch, yaw)
        *   Angular rates: $(\omega_x, \omega_y, \omega_z)$
        *   Relative position to nearest obstacle: $(d_{obs\_x}, d_{obs\_y}, d_{obs\_z})$
        *   Distance to target waypoint: $d_{target}$
    *   **Action $a_i$**: A vector of the expert pilot's control commands at time $i$. For a quadrotor, this could be:
        *   Desired collective thrust: $T_{collective}$
        *   Desired roll torque: $\tau_{roll}$
        *   Desired pitch torque: $\tau_{pitch}$
        *   Desired yaw torque: $\tau_{yaw}$
*   A neural network architecture $\pi_{\theta}(s)$ with parameters $\theta$.

**What we want:** The trained neural network $\pi_{\theta}(s)$ that outputs control actions $a$ that closely match the expert's actions for any given state $s$.

**Show every algebraic / logical step:**

**Step 1: Data Collection and Preprocessing**
*   **Collect expert data:** A human pilot flies the drone through various trajectories, obstacles, and maneuvers. Simultaneously, the drone's state $s_i$ (from sensors) and the pilot's control inputs $a_i$ are recorded at a high frequency.
    *   Example: Pilot flies drone through a forest. Data points:
        *   $s_1 = (pos=(0,0,10), vel=(1,0,0), orient=(0,0,0), \omega=(0,0,0), obs\_dist=(5,2,0), target\_dist=100)$
        *   $a_1 = (T_{coll}=10, \tau_{roll}=0.1, \tau_{pitch}=0, \tau_{yaw}=0)$
        *   ...
        *   $s_N = (pos=(10,5,8), vel=(0.5,0.2,-0.1), orient=(0.1,0.05,0.2), \omega=(0.01,0.02,0.03), obs\_dist=(1,0.5,0.2), target\_dist=10)$
        *   $a_N = (T_{coll}=9.5, \tau_{roll}=-0.05, \tau_{pitch}=0.02, \tau_{yaw}=0.1)$
*   **Normalize data:** Scale all input features (state variables) and output targets (actions) to a common range (e.g., [-1, 1] or [0, 1]). This helps the neural network train more effectively.
    $$ s_{i,normalized} = (s_i - \mu_s) / \sigma_s $$
    $$ a_{i,normalized} = (a_i - \mu_a) / \sigma_a $$

**Step 2: Design Neural Network Architecture**
*   **Input Layer:** Number of neurons equals the dimensionality of the state vector $s$.
    *   Example: If $s$ has 16 components (3 pos, 3 vel, 3 orient, 3 ang_rates, 3 obs_dist, 1 target_dist), the input layer has 16 neurons.
*   **Hidden Layers:** One or more fully connected (dense) layers with non-linear activation functions (e.g., ReLU). The number of layers and neurons per layer are hyper-parameters.
    *   Example: Two hidden layers with 128 and 64 neurons, respectively.
    *   Layer 1: $h_1 = \text{ReLU}(W_1 s + b_1)$
    *   Layer 2: $h_2 = \text{ReLU}(W_2 h_1 + b_2)$
*   **Output Layer:** Number of neurons equals the dimensionality of the action vector $a$. No activation function (or linear activation) for regression tasks where actions are continuous values.
    *   Example: If $a$ has 4 components (collective thrust, 3 torques), the output layer has 4 neurons.
    *   Output: $\hat{a} = W_3 h_2 + b_3$

**Step 3: Define the Loss Function**
*   Since we are predicting continuous control commands, Mean Squared Error (MSE) is a common choice. It measures the average squared difference between the network's predicted actions $\hat{a}_i = \pi_{\theta}(s_i)$ and the expert's actual actions $a_i$.
    $$ \mathcal{L}(\theta) = \frac{1}{N} \sum_{i=1}^N || \pi_{\theta}(s_i) - a_i ||^2 $$
    *   In expanded form for $M$ action components:
        $$ \mathcal{L}(\theta) = \frac{1}{N} \sum_{i=1}^N \sum_{j=1}^M (\pi_{\theta}(s_i)_j - a_{i,j})^2 $$

**Step 4: Training Process (Optimization)**
*   **Initialize $\theta$**: Randomly initialize the weights and biases of the neural network.
*   **Iterate (Epochs):** Repeat the following steps multiple times over the entire dataset.
    *   **Batching:** Divide the dataset $D$ into smaller batches.
    *   **Forward Pass:** For each batch, feed the state inputs $s_i$ through the network to get predicted actions $\hat{a}_i$.
    *   **Calculate Loss:** Compute $\mathcal{L}(\theta)$ using the predicted $\hat{a}_i$ and the true expert actions $a_i$.
    *   **Backward Pass (Backpropagation):** Calculate the gradients of the loss function with respect to each parameter $\theta$ (weights and biases). This tells us how much each parameter contributes to the error.
        $$ \frac{\partial \mathcal{L}}{\partial \theta} $$
    *   **Parameter Update:** Adjust the parameters $\theta$ in the direction that reduces the loss, using an optimization algorithm like Adam or Stochastic Gradient Descent (SGD).
        $$ \theta_{new} = \theta_{old} - \alpha \frac{\partial \mathcal{L}}{\partial \theta} $$
        where $\alpha$ is the learning rate.

**Step 5: Evaluation and Deployment**
*   After training, the network's performance is evaluated on a separate **validation set** (data not used during training) to check for generalization.
*   If performance is satisfactory, the trained network $\pi_{\theta}(s)$ can be deployed on the drone. It will take real-time sensor inputs ($s$) and output control commands ($\hat{a}$) to follow the trajectory.

$$ \boxed{\text{Trained Neural Network } \pi_{\theta}(s) \text{ mapping drone state to control actions}} $$

**Reflection:** The "trick" in imitation learning is ensuring the expert data covers all relevant scenarios the drone might encounter. If the expert never encountered a specific type of obstacle or extreme wind, the learned policy might fail in those situations. This is known as the "covariate shift" problem – the distribution of states encountered during deployment might differ from the training data. Advanced techniques like DAgger (Dataset Aggregation) can mitigate this by iteratively collecting more data from the learned policy's errors.

---

### Example 4: Adaptive Guidance for Re-entry with Atmospheric Uncertainty (Conceptual)

**Problem:** A re-entry vehicle needs to hit a specific landing target on Earth, but the actual atmospheric density profile is uncertain and can deviate significantly from the nominal model. This uncertainty directly affects drag forces and thus the vehicle's trajectory. We want to conceptualize how a learned component can adapt the guidance law in real-time to compensate for this uncertainty.

**Given:**
*   **Vehicle State:** $s = (x, y, z, \dot{x}, \dot{y}, \dot{z}, \text{orientation})$
*   **Nominal Atmospheric Model:** $\rho_{nom}(h)$, where $h$ is altitude.
*   **Actual Atmospheric Density:** $\rho_{actual}(h) = \rho_{nom}(h) \cdot (1 + \delta(h))$, where $\delta(h)$ is an unknown, time-varying deviation.
*   **Drag Force:** $F_D = \frac{1}{2} \rho v^2 S C_D$, where $\rho$ is density, $v$ is velocity, $S$ is reference area, $C_D$ is drag coefficient.
*   **Control Input:** $u = (\alpha, \beta)$, where $\alpha$ is angle of attack and $\beta$ is bank angle (affecting lift and drag).
*   **Sensors:** Accelerometers measure total acceleration, from which actual drag can be inferred.

**What we want:** An adaptive guidance strategy that uses real-time sensor measurements to estimate the actual atmospheric density and modify the control inputs to stay on the target trajectory.

**Show every algebraic / logical step:**

**Step 1: Nominal Guidance Law (Pre-computed Trajectory)**
*   Based on $\rho_{nom}(h)$, a nominal guidance law is pre-computed. This law determines the sequence of control inputs $(u_0, u_1, ..., u_N)$ (angles of attack and bank angles) that guide the vehicle along a reference trajectory $s_{ref}$ to the target.
*   This could be an optimal control solution for the nominal atmosphere.
    $$ u_{nominal}(s, t) = \text{OptimalGuidance}(\rho_{nom}(h), s, \text{target}) $$

**Step 2: Real-time Observation of Discrepancy**
*   During re-entry, the vehicle measures its actual acceleration $\vec{a}_{measured}$.
*   From this, we can estimate the actual drag force: $\vec{F}_{D,measured} = m (\vec{a}_{measured} - \vec{g} - \vec{a}_{thrust})$.
*   Using the measured velocity $v$ and known $S, C_D$, we can infer the *actual* local atmospheric density $\rho_{inferred}$:
    $$ \rho_{inferred} = \frac{2 ||\vec{F}_{D,measured}||}{v^2 S C_D} $$
*   We compare $\rho_{inferred}$ with $\rho_{nom}(h)$ at the current altitude $h$.
    $$ \text{Density Error} = \rho_{inferred} - \rho_{nom}(h) $$
    If this error is significant, the vehicle is experiencing more or less drag than expected.

**Step 3: Introduce a Learned Disturbance Observer / Model Corrector**
*   This is where ML comes in. Instead of trying to analytically derive how to correct for $\delta(h)$, we can train an ML model (e.g., a neural network) to estimate $\delta(h)$ or directly predict the required control correction.
*   Let's define a "density correction factor" $\hat{\delta}$ that the ML model will learn to predict.
    *   **Input to ML Model:** Current state $s$, nominal density $\rho_{nom}(h)$, observed density error $\rho_{inferred} - \rho_{nom}(h)$, and perhaps historical values of these errors.
    *   **Output of ML Model:** An estimated correction factor $\hat{\delta}$ or a direct adjustment to the control command.
    *   The ML model $\mathcal{M}$ is trained (e.g., in simulations with varying atmospheric profiles) to output $\hat{\delta}$ such that $\rho_{nom}(h) \cdot (1 + \hat{\delta}) \approx \rho_{actual}(h)$.
        $$ \hat{\delta} = \mathcal{M}(s, \rho_{nom}(h), \rho_{inferred} - \rho_{nom}(h), \text{history}) $$

**Step 4: Adaptive Guidance Law (Integration of Learned Component)**
*   The nominal guidance law provides $u_{nominal}(s,t)$.
*   The learned component provides $\hat{\delta}$.
*   The adaptive guidance law then modifies $u_{nominal}$ based on $\hat{\delta}$. For example, if $\hat{\delta}$ indicates higher-than-nominal density (more drag), the vehicle might need to reduce its angle of attack or adjust its bank angle to reduce lift and increase drag slightly, or vice-versa, to stay on the intended trajectory.
*   A common way to integrate this is to use the learned $\hat{\delta}$ to update the effective atmospheric model used by a real-time guidance algorithm (like a Model Predictive Control or a closed-loop guidance law).
    $$ \rho_{effective}(h) = \rho_{nom}(h) \cdot (1 + \hat{\delta}) $$
    Then, the real-time guidance computes control actions using this $\rho_{effective}$:
    $$ u_{adaptive}(s, t) = \text{RealtimeGuidance}(\rho_{effective}(h), s, \text{target}) $$
*   Alternatively, the ML model could directly output a perturbation $\Delta u$ to the nominal control:
    $$ \Delta u = \mathcal{M}'(s, \rho_{inferred} - \rho_{nom}(h)) $$
    $$ u_{adaptive} = u_{nominal} + \Delta u $$

**Step 5: Closed-Loop Execution and Continuous Adaptation**
*   The vehicle executes $u_{adaptive}$.
*   It continuously measures its state and actual drag.
*   This information feeds back into the ML model, which refines its estimate of $\hat{\delta}$ (or $\Delta u$), allowing the guidance to adapt throughout the re-entry phase.

$$ \boxed{u_{adaptive} = \text{RealtimeGuidance}(\rho_{nom}(h) \cdot (1 + \mathcal{M}(\dots)), s, \text{target})} $$

**Reflection:** This example highlights a crucial aspect of learned guidance: it doesn't always replace the entire traditional guidance system. Often, ML is used to *enhance* traditional methods by providing real-time estimates of uncertainties or by learning complex, non-linear corrective actions. The "trick" here is that the ML model acts as an "uncertainty estimator" or "disturbance compensator" that allows the underlying, robust traditional guidance algorithms to perform optimally even in the face of unknown environmental variations. The training of $\mathcal{M}$ would involve extensive simulations with many different atmospheric profiles.

## 6. Common mistakes and traps

1.  **Overfitting to Training Data (Supervised Learning):** The learned guidance policy performs exceptionally well on the data it was trained on, but fails dramatically when encountering new, unseen scenarios (e.g., a drone trained only in calm weather failing in gusty conditions).
    *   *Why it happens:* The model learns to memorize specific examples rather than generalizing the underlying principles.

2.  **Reward Hacking (Reinforcement Learning):** The RL agent finds an unintended, often undesirable, way to maximize its reward function without actually achieving the desired mission objective. (e.g., a rocket getting reward for "being close to target" might hover indefinitely near the target without landing, just to accumulate proximity rewards).
    *   *Why it happens:* The reward function is poorly designed or incomplete, not perfectly aligning the agent's goal with the true mission objective.

3.  **Ignoring Safety Constraints:** Learned policies, especially from RL, might discover highly efficient but unsafe maneuvers (e.g., an autonomous aircraft taking extreme turns or operating close to stall limits) because the reward function didn't adequately penalize unsafe actions or provide hard constraints.
    *   *Why it happens:* Safety is often complex and hard to encode perfectly in a simple reward signal or loss function. Exploration in RL can lead to dangerous states.

4.  **Computational Complexity and Real-time Constraints:** Deploying complex neural networks on embedded aerospace hardware with limited processing power, memory, and energy budgets can be challenging. The guidance law needs to compute actions within milliseconds.
    *   *Why it happens:* ML models can be very large. The inference time (time to compute an output from an input) for complex models might exceed real-time requirements.

5.  **Lack of Explainability and Interpretability:** When a learned guidance system makes an unexpected or incorrect decision, it can be very difficult to understand *why* it did so, especially with deep neural networks (the "black box" problem). This hinders debugging, verification, and certification.
    *   *Why it happens:* Deep learning models learn highly abstract, non-linear relationships that are not easily translated into human-understandable rules or insights.

6.  **Data Scarcity or Quality (Imitation Learning):** Training an effective imitation learning policy requires a large, diverse, and high-quality dataset of expert demonstrations. If the data is sparse, noisy, or doesn't cover all critical operating conditions, the learned policy will be deficient.
    *   *Why it happens:* Collecting expert data can be expensive, time-consuming, or dangerous. Imperfect sensors or human error can introduce noise or bias.

## 7. Textbook-precise explanation

In the context of aerospace guidance, a "guidance law" is a mathematical algorithm or rule that determines the desired trajectory or control commands for a vehicle to achieve a specified objective, given its current state and environmental conditions. Traditionally, these laws are derived from principles of optimal control theory, classical control theory, and kinematics, assuming precise knowledge of vehicle dynamics and environmental models.

**Learned guidance laws** represent a modern paradigm wherein the functional form or parameters of a guidance policy are acquired or refined through data-driven machine learning techniques, rather than being entirely hand-engineered from first principles. This approach is particularly advantageous for systems operating under significant uncertainties, non-linear dynamics, or in highly complex, dynamic environments.

Formally, the problem of guidance can be stated as finding a control policy $\pi: \mathcal{S} \rightarrow \mathcal{A}$ that maps the vehicle's state $s \in \mathcal{S}$ to an action $a \in \mathcal{A}$ such that a performance objective is optimized. The vehicle's dynamics are governed by a differential equation:
$$ \dot{\mathbf{x}}(t) = \mathbf{f}(\mathbf{x}(t), \mathbf{u}(t), \mathbf{d}(t)) $$
where $\mathbf{x}(t)$ is the state vector (e.g., position, velocity, orientation, mass), $\mathbf{u}(t)$ is the control input vector (e.g., thrust, control surface deflections), and $\mathbf{d}(t)$ represents disturbances and uncertainties (e.g., atmospheric variations, unmodeled dynamics). The objective is to minimize a cost function $J(\mathbf{u})$ or maximize a reward function $R(\mathbf{u})$, often over a finite or infinite horizon, subject to state and control constraints.

**Reinforcement Learning (RL) for Guidance:**
In RL, the guidance problem is cast as a Markov Decision Process (MDP) $(\mathcal{S}, \mathcal{A}, P, R, \gamma)$. An agent learns an optimal policy $\pi^*: \mathcal{S} \rightarrow \mathcal{A}$ by interacting with the environment (often a high-fidelity simulator) and receiving scalar rewards $R(s,a,s')$. The objective is to maximize the expected cumulative discounted reward:
$$ J(\pi) = E_{\pi} \left[ \sum_{t=0}^{\infty} \gamma^t R(s_t, a_t, s_{t+1}) \right] $$
Modern RL algorithms, such as Deep Q-Networks (DQN), Proximal Policy Optimization (PPO), or Soft Actor-Critic (SAC), utilize deep neural networks to approximate the policy $\pi(s)$ or value functions $V(s)$ or $Q(s,a)$. The learned policy can then directly output control commands $\mathbf{u}(t)$ based on the current state $\mathbf{x}(t)$.
*   **Reference:** Sutton, R. S., & Barto, A. G. (2018). *Reinforcement Learning: An Introduction* (2nd ed.). MIT Press.

**Supervised Learning (SL) / Imitation Learning for Guidance:**
In this approach, a neural network $\pi_{\theta}(\mathbf{x})$ is trained to mimic the actions of an "expert" (e.g., a human pilot, a traditional optimal controller, or a high-fidelity simulator). Given a dataset of expert state-action pairs $D = \{(\mathbf{x}_i, \mathbf{u}_i)\}_{i=1}^N$, the network's parameters $\theta$ are optimized to minimize a loss function, typically the Mean Squared Error (MSE) between its predictions and the expert's actions:
$$ \mathcal{L}(\theta) = \frac{1}{N} \sum_{i=1}^N || \pi_{\theta}(\mathbf{x}_i) - \mathbf{u}_i ||^2 $$
The trained network then serves as the guidance law, mapping observed vehicle states to control commands. This is often referred to as Behavioral Cloning.
*   **Reference:** Pomerleau, D. A. (1989). *ALVINN: An autonomous land vehicle in a neural network*. Advances in Neural Information Processing Systems, 1, 305-313. (Early work on behavioral cloning for autonomous driving).

**Hybrid and Adaptive Approaches:**
Learned guidance laws frequently operate in conjunction with traditional control and estimation techniques. Examples include:
*   **Model Predictive Control (MPC) with Learned Models:** An MPC framework uses an internal model of the system dynamics to predict future states and optimize control inputs. If the system dynamics $\mathbf{f}$ are uncertain or non-linear, an ML model can be trained (online or offline) to learn a more accurate dynamics model $\hat{\mathbf{f}}(\mathbf{x}, \mathbf{u}, \mathbf{d})$ or to estimate disturbances $\hat{\mathbf{d}}$. This learned model is then incorporated into the MPC's optimization problem.
*   **Adaptive Control with Neural Networks:** Neural networks can be used as approximators for unknown system dynamics or to directly learn the adaptive control laws that adjust controller gains in real-time to maintain performance in the presence of uncertainties.
*   **Hierarchical Control:** ML can operate at a higher level, making strategic decisions (e.g., trajectory selection, mode switching), while lower-level traditional controllers execute the specific maneuvers.

These learned guidance methods offer significant advantages in terms of adaptability, robustness to uncertainties, and the ability to discover non-intuitive optimal strategies, pushing the envelope for autonomous aerospace systems.

## 8. ASCII diagrams

```text
+---------------------+
|                     |
|  Aerospace Vehicle  |
| (Rocket, Drone, etc)|
|                     |
+----------^----------+
           |
           | Actions (Thrust, Torques, Flaps)
           |
+----------+----------+
|                     |
|   Control Actuators |
|  (Engines, Servos)  |
|                     |
+----------^----------+
           |
           | Control Commands (u)
           |
+----------+------------------------------------------------+
|          |                                                |
|          |                                                |
|   Sensors (IMU, GPS, Vision)                              |
|          |                                                |
|          v                                                |
|   +-------------------+                                   |
|   |                   |                                   |
|   |  State Estimator  |  (e.g., Kalman Filter)            |
|   | (Position, Vel,   |                                   |
|   |  Orientation, etc)|                                   |
|   +---------+---------+                                   |
|             |                                             |
|             | Current State (s)                           |
|             |                                             |
|             v                                             |
|   +-----------------------------------------------------+ |
|   |                                                     | |
|   |               LEARNED GUIDANCE LAW                  | |
|   |                                                     | |
|   |   (Neural Network / RL Policy / Adaptive Model)     | |
|   |                                                     | |
|   |   Input: Current State (s)                          | |
|   |   Output: Desired Control Commands (u)              | |
|   |                                                     | |
|   +-----------------------------------------------------+ |
|                                                           |
|                 Guidance, Navigation, Control (GNC)       |
+-----------------------------------------------------------+
```
**Figure 1: Simplified Feedback Loop with Learned Guidance Law**
This diagram illustrates how a learned guidance law fits into the overall GNC architecture. Sensors provide raw data, which is processed by a state estimator to determine the vehicle's current state. This state is fed into the "Learned Guidance Law" block, which is typically a neural network or a learned policy. This block then computes the necessary control commands (e.g., thrust, torque) to achieve the mission objective. These commands are sent to the control actuators, which physically manipulate the vehicle. This forms a closed-loop feedback system, allowing the vehicle to continuously adjust its actions based on its current state.

```text
             ^ Y (Altitude)
             |
             |
             |  Desired Trajectory (Pre-computed / Optimal)
             |  ...........................................
             | /                                         \
             |/                                           \
             |---------------------------------------------\-----> X (Range)
             |                                              \
             |                                               \
             |                                                \
             |                                                 \
             |                                                  \
             |                                                   \
             |                                                    \
             |                                                     \
             |                                                      \
             |                                                       \
             |                                                        \
             |                                                         \
             |                                                          \
             |                                                           \
             |                                                            \
             |                                                             \
             |                                                              \
             |                                                               \
             |                                                                \
             |                                                                 \
             |                                                                  \
             |                                                                   \
             |                                                                    \
             |                                                                     \
             |                                                                      \
             |                                                                       \
             |                                                                        \
             |                                                                         \
             |                                                                          \
             |                                                                           \
             |                                                                            \
             |                                                                             \
             |                                                                              \
             |                                                                               \
             |                                                                                \
             |                                                                                 \
             |                                                                                  \
             |                                                                                   \
             |                                                                                    \
             |                                                                                     \
             |                                                                                      \
             |                                                                                       \
             |                                                                                        \
             |                                                                                         \
             |                                                                                          \
             |                                                                                           \
             |                                                                                            \
             |                                                                                             \
             |                                                                                              \
             |                                                                                               \
             |                                                                                                \
             |                                                                                                 \
             |                                                                                                  \
             |                                                                                                   \
             |                                                                                                    \
             |                                                                                                     \
             |                                                                                                      \
             |                                                                                                       \
             |                                                                                                        \
             |                                                                                                         \
             |                                                                                                          \
             |                                                                                                           \
             |                                                                                                            \
             |                                                                                                             \
             |                                                                                                              \
             |                                                                                                               \
             |                                                                                                                \
             |                                                                                                                 \
             |                                                                                                                  \
             |                                                                                                                   \
             |                                                                                                                    \
             |                                                                                                                     \
             |                                                                                                                      \
             |                                                                                                                       \
             |                                                                                                                        \
             |                                                                                                                         \
             |                                                                                                                          \
             |                                                                                                                           \
             |                                                                                                                            \
             |                                                                                                                             \
             |                                                                                                                              \
             |                                                                                                                               \
             |                                                                                                                                \
             |                                                                                                                                 \
             |                                                                                                                                  \
             |                                                                                                                                   \
             |                                                                                                                                    \
             |                                                                                                                                     \
             |                                                                                                                                      \
             |                                                                                                                                       \
             |                                                                                                                                        \
             |                                                                                                                                         \
             |                                                                                                                                          \
             |                                                                                                                                           \
             |                                                                                                                                            \
             |                                                                                                                                             \
             |                                                                                                                                              \
             |                                                                                                                                               \
             |                                                                                                                                                \
             |                                                                                                                                                 \
             |                                                                                                                                                  \
             |                                                                                                                                                   \
             |                                                                                                                                                    \
             |                                                                                                                                                     \
             |                                                                                                                                                      \
             |                                                                                                                                                       \
             |                                                                                                                                                        \
             |                                                                                                                                                         \
             |                                                                                                                                                          \
             |                                                                                                                                                           \
             |                                                                                                                                                            \
             |                                                                                                                                                             \
             |                                                                                                                                                              \
             |                                                                                                                                                               \
             |                                                                                                                                                                \
             |                               