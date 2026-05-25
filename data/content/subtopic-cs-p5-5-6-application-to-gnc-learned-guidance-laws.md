## What it is
Learned guidance laws are functions, typically represented by neural networks, that map a vehicle's state (like position, velocity, and target information) directly to a guidance command (like a required acceleration). Instead of being derived from analytical principles of optimal control, these laws are "learned" by training the network on vast amounts of simulation data or through reinforcement learning to optimize a performance objective, such as minimizing miss distance or fuel consumption.

## Why it matters
This technique is critical for creating guidance systems that can operate effectively in highly complex, nonlinear, and uncertain environments where classical, model-based laws may fail or be suboptimal. For example, a learned guidance law for a hypersonic glide vehicle could implicitly account for poorly understood aerodynamic effects by learning from simulation, enabling it to hit a target with greater precision. This is at the frontier of autonomous systems, enabling faster, more adaptive, and more robust GNC for everything from planetary landers to missile defense interceptors.

## When to study it
You are ready for this topic if you have a firm grasp of the following prerequisites. If not, master them first.
- **Classical Mechanics & Orbital Dynamics:** State vectors ($ \vec{r}, \vec{v} $), relative motion, and equations of motion.
- **Control Theory Fundamentals:** State-space representation ($\dot{\vec{x}} = A\vec{x} + B\vec{u}$), feedback control, and the concept of a cost/objective function ($J$).
- **Classical Guidance Laws:** You must understand at least one classical law, like Proportional Navigation (Pro-Nav), to appreciate what is being replaced.
- **Machine Learning Fundamentals:** Supervised Learning (regression, function approximation) and Reinforcement Learning (states, actions, rewards, policy). You should be comfortable with the structure of a basic feedforward neural network.

## How to study it (step by step)
1.  **Review Proportional Navigation (Pro-Nav):** Write down the Pro-Nav law from first principles. The command acceleration is proportional to the line-of-sight (LOS) rate. Identify its inputs (LOS rate) and output (acceleration command). This is your "classical" baseline.
2.  **Formulate the GNC Problem for ML:** Re-frame the intercept problem. Define the state vector $s$ (e.g., relative positions and velocities: $s = [r_x, r_y, v_x, v_y]$). Define the action vector $a$ (e.g., commanded acceleration: $a = [a_x, a_y]$). Define the objective or reward function (e.g., minimize final miss distance and total control effort).
3.  **Sketch the Neural Network Architecture:** Draw a simple feedforward neural network. Label the input layer with the components of your state vector $s$. Label the output layer with the components of your action vector $a$. The network represents the guidance law: $a = \pi(s; \theta)$, where $\theta$ are the network weights.
4.  **Understand the Training Loop (Conceptually):** Read about a simple Reinforcement Learning (RL) algorithm like Deep Q-Learning or Policy Gradients. In your GNC context, this means: the "agent" (interceptor) takes an action $a_t$ in state $s_t$, the environment (physics simulation) evolves to a new state $s_{t+1}$ and gives a reward $r_t$. The RL algorithm updates the network weights $\theta$ to maximize the total expected reward.
5.  **Contrast and Compare:** Create a two-column table. In one column, list the properties of Pro-Nav (analytical, interpretable, model-based, optimal under specific assumptions). In the other, list the properties of a learned law (data-driven, black-box, model-free, potentially more robust to unmodeled dynamics).

## Key ideas, with intuition
1.  **Guidance Law as a Function Approximator:** A classical guidance law like Pro-Nav is a simple, explicit function: $a_c = N \cdot V_c \cdot \dot{\lambda}$. A learned guidance law is also a function, $a_c = \pi(s; \theta)$, but it's an incredibly complex and high-dimensional one represented by a neural network. The "learning" process is just a sophisticated form of function fitting, where we tune the parameters $\theta$ to find the best possible mapping from any given state $s$ to the optimal action $a_c$.

2.  **The Cost Function is the Teacher:** How does the system "learn" what a good guidance command is? Through the cost function $J$ or its RL equivalent, the reward signal. A simple cost function for an interceptor might be:
    $$
    J = w_1 \cdot || \vec{r}_{\text{final}} ||^2 + w_2 \cdot \int_{0}^{t_f} || \vec{a}(t) ||^2 dt
    $$
    The first term penalizes the final miss distance. The second term penalizes control effort (fuel). The training algorithm's sole job is to adjust the neural network's weights to find a policy $\pi(s)$ that produces actions $\vec{a}(t)$ that make $J$ as small as possible over many simulations.

3.  **Generalization is the Superpower:** You could create a giant lookup table mapping every possible state to the best action. This is computationally impossible. The power of a neural network is its ability to *generalize*. After training on thousands of different intercept scenarios, it learns the underlying patterns and can produce a sensible, near-optimal command for a new scenario it has never seen before. It interpolates between known good solutions in a highly nonlinear way.

## Worked example
**Problem:** Frame the problem of learning a 2D planetary landing guidance law. The goal is to land at a specific target point $(0,0)$ with zero velocity, minimizing fuel.

**1. Define State and Action Spaces:**
- The vehicle operates in a 2D plane with constant gravity $g$.
- **State vector $s$:** We need position and velocity relative to the landing site. Let's define it as $s = [x, y, v_x, v_y]$, where $(x,y)$ is the position and $(v_x, v_y)$ is the velocity.
- **Action vector $a$:** The vehicle has a main engine that can be throttled and vectored. The action is the commanded thrust vector: $a = [T_x, T_y]$. We assume constraints like $||a|| \le T_{\text{max}}$.

**2. Define the Dynamics:**
The equations of motion describe how the state evolves given an action.
$$
\begin{align*}
\dot{x} &= v_x \\
\dot{y} &= v_y \\
\dot{v}_x &= \frac{T_x}{m} \\
\dot{v}_y &= \frac{T_y}{m} - g
\end{align*}
$$
Here, $m$ is the vehicle's mass (assumed constant for simplicity).

**3. Define the Cost Function:**
We want to minimize final error and fuel. The cost function $J$ for a single landing trajectory is:
$$
J = w_p \cdot (x_f^2 + y_f^2) + w_v \cdot (v_{xf}^2 + v_{yf}^2) + w_T \cdot \int_{0}^{t_f} \sqrt{T_x(t)^2 + T_y(t)^2} dt
$$
- $w_p, w_v, w_T$ are weights to balance position error, velocity error, and fuel usage.
- The subscript $f$ denotes the final state at time $t_f$.

**4. The Learned Law:**
Our goal is to learn a policy (the guidance law) $\pi: s \rightarrow a$. This will be a neural network that takes the 4-element state vector $s = [x, y, v_x, v_y]$ as input and outputs the 2-element action vector $a = [T_x, T_y]$.

**5. Training (Conceptual):**
- We would use an RL algorithm. An "episode" starts by placing the lander at a random initial state $(x_0, y_0, v_{x0}, v_{y0})$.
- At each time step, the network (our current policy $\pi$) observes the state $s_t$ and outputs a thrust command $a_t$.
- A physics simulator integrates the dynamics for a small time step $\Delta t$ to get the next state $s_{t+1}$.
- A reward is given. For example, a small negative reward at each step for fuel used, and a large positive reward at the end for a successful landing (or a large negative reward for crashing).
- The RL algorithm updates the network's weights based on the rewards received, slowly improving the policy. After millions of simulated landings, the network $\pi(s)$ becomes a robust guidance law.

**Reflection:** We replaced a complex, analytical optimal control problem (which for this "powered descent" case is famous and has solutions like the "gravity turn") with a function approximation problem. The network learns the shape of the optimal control solution from scratch, purely by trial and error guided by the cost function.

## Diagrams
Here is the geometry for a 2D intercept problem, which is analogous to the landing problem.

```text
       Target (T)
         ^
         | v_T
         |
         +------>
         |     /
         |    /
         |   /  r_rel (relative position)
         |  /
         | /
         |/
  I -----+----------------> x-axis
(Interceptor)
    |
    v_I
    |
    v
  y-axis

Line of Sight (LOS) is the line connecting I and T.
The angle of the LOS is λ.
The guidance law's job is to compute an acceleration command for I
based on the state (relative position r_rel, relative velocity, etc.)
to make r_rel -> 0.
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of a **"Learned Pilot."** A rookie human pilot (a blank neural network) starts by making random control inputs. An instructor (the reward function) yells "Good!" when they do something right (get closer to the runway) and "Bad!" when they do something wrong (use too much fuel, stall). After thousands of hours (training episodes), the pilot develops an intuitive, instantaneous mapping from their senses (state: altitude, speed, attitude) to control actions. They aren't solving differential equations in their head; they have *learned a policy*.

2.  **Formulas to Overlearn:**
    -   **The Goal:** Find $\pi^*$ that minimizes the expected cost: $\pi^* = \arg\min_{\pi} \mathbb{E}[J]$.
    -   **The Law:** $a = \pi(s; \theta)$. Action is a function of state, parameterized by weights $\theta$.
    -   **The Cost (Generic Form):** $J = \text{Terminal Cost} + \int \text{Running Cost} \, dt$. (e.g., final miss distance + integrated fuel usage).

3.  **Spaced Repetition Schedule:**
    -   Review this entire sheet in **1 day**. Re-derive the worked example setup.
    -   In **3 days**, explain the "Learned Pilot" analogy to a friend.
    -   In **7 days**, write down the three overlearn formulas from memory.
    -   In **16 days**, sketch the intercept diagram and label the state/action components.
    -   In **35 days**, re-read the "Common mistakes" section and ensure you haven't fallen into them.

4.  **First Principles Pathway:** If you forget everything, start here: "Guidance is a function that takes the current state and tells me what to do (the action). I need the *best* function. 'Best' means it minimizes some cost (like error and fuel). A neural network is a universal function approximator. Therefore, I can use a training algorithm to search the space of all possible functions (by adjusting network weights) to find the one that results in the lowest cost."

## Common mistakes
1.  **Ignoring the Physics (Garbage In, Garbage Out):** Feeding the network a poorly chosen state vector. If the state representation $s$ doesn't contain enough information to uniquely determine the optimal action, the network cannot succeed. Forgetting to normalize inputs is a classic error.
2.  **Poor Reward Shaping:** Designing a reward/cost function that incentivizes the wrong behavior. For example, if you only penalize miss distance, the agent might learn to take a wildly inefficient path that uses all its fuel just to hit the target.
3.  **Treating it as a Magic Black Box:** A trained network is not guaranteed to be stable or robust. It can behave unpredictably for states far outside its training distribution ("out-of-distribution" problem). Real systems require rigorous verification, validation, and safety guarantees, which are very difficult for learned policies.
4.  **Forgetting Constraints:** The real world has constraints (e.g., max thrust $T_{\text{max}}$, max g-load). These must be built into the simulation environment and the action space, or the learned law will be useless as it will command physically impossible actions.

## Self-check
1.  A classical Pro-Nav law for an interceptor is $a_c = N \cdot V_c \cdot \dot{\lambda}$. What is the minimal state information required to implement this law? How does that compare to the state vector $s$ we might define for a learned guidance law for the same problem?
2.  You are tasked with training a guidance law for a reusable rocket booster's landing. The booster has fins for aerodynamic control and a gimbaled engine. How would you define the state vector $s$ and the action vector $a$? Justify your choices.
3.  A learned guidance law performs perfectly in 99.9% of simulations but fails catastrophically in 0.1% by commanding maximum opposite thrust just before landing. What could be the potential causes related to the training process, state representation, or reward function? How might you begin to diagnose and fix this?