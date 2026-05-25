## 1. What it is — in plain English

Imagine you're trying to teach a robot how to perform a complex task, like flying a drone through an obstacle course. You don't want to program every single turn and speed adjustment; that would be impossible for every unique situation. Instead, you want the robot to *learn* from its experiences.

"Policy gradient" is a family of methods in machine learning that helps an agent (like our drone robot) learn a good "policy." A policy is just a fancy word for its strategy or rulebook: "If I'm in this situation, what action should I take?" The "gradient" part means we're using calculus to figure out how to slightly adjust this rulebook to make it better, little by little.

REINFORCE is one of the simplest and foundational policy gradient algorithms. It works by having the agent try out different actions, see what rewards it gets, and then adjust its policy. If an action led to a good outcome (high reward), the algorithm makes that action more likely in similar situations in the future. If an action led to a bad outcome (low reward), it makes that action less likely. It's like a trial-and-error learning process, but guided by a mathematical compass.

Think of it like training a dog: when it does something you like (e.g., sits), you give it a treat, making it more likely to sit again. When it does something you don't like, you withhold the treat (or give a negative signal), making that action less likely. REINFORCE does this for complex, sequential decision-making, where the "treat" might only come much later after a series of actions.

## 2. Why it matters — real-world applications

Policy gradient methods, and REINFORCE as a foundational example, are crucial because they allow us to train agents for tasks where traditional supervised learning (learning from labeled examples) isn't feasible. They excel in scenarios requiring sequential decision-making and where the consequences of actions are delayed.

1.  **Autonomous Drone Navigation and Control (Aerospace):** Imagine a drone tasked with inspecting a wind turbine or navigating a complex urban environment. Programming every maneuver for every possible wind gust, obstacle, or sensor reading is impossible. REINFORCE (or its more advanced descendants) can train a drone's policy to make real-time decisions about flight path, speed, and altitude to complete its mission efficiently, avoid collisions, and adapt to changing conditions. This is vital for companies like Amazon (delivery drones) or defense contractors (surveillance drones).

2.  **Satellite Constellation Management (Aerospace/Physics):** Managing a constellation of hundreds or thousands of satellites (e.g., SpaceX's Starlink) involves complex decisions about orbit adjustments, communication routing, and resource allocation. A policy gradient agent could learn optimal strategies to minimize fuel consumption for station-keeping, maximize data throughput by dynamically assigning communication links, or even coordinate collision avoidance maneuvers, all while considering the long-term impact of its actions on the entire network's performance.

3.  **Robotics and Manipulator Control:** From industrial robots on assembly lines to humanoid robots performing delicate surgical tasks, teaching robots fine motor control is challenging. Policy gradient methods allow robots to learn how to grasp objects, balance, or walk by trial and error in simulated or real environments. For instance, Boston Dynamics uses advanced RL techniques to train their highly agile robots (like Atlas) to perform complex movements and maintain balance in dynamic terrains.

4.  **Game Playing and AI Agents:** Policy gradient methods were instrumental in early successes of AI in games like Atari. While more advanced methods have since surpassed REINFORCE, the core idea remains: an agent learns a policy to play a game by trying actions, seeing the score, and adjusting its strategy. This is relevant for training AI opponents in video games or for research into general artificial intelligence.

5.  **Optimizing Chemical Reactions or Material Design (Physics/Chemistry):** In scientific computing, policy gradients can be used to explore vast parameter spaces to optimize complex processes. For example, an agent could learn a policy for adjusting temperature, pressure, and catalyst concentration in a chemical reactor to maximize yield, or to discover novel material compositions with desired properties by sequentially "choosing" components and observing simulated outcomes.

## 3. Prerequisites — what you must know first

To fully grasp REINFORCE, you should have a solid understanding of the following concepts. If any of these feel unfamiliar, pause and review them first.

*   **Reinforcement Learning (RL) Basics:**
    *   **Agent:** The entity that makes decisions and learns.
    *   **Environment:** The world the agent interacts with.
    *   **State ($s$):** A complete description of the environment at a given time.
    *   **Action ($a$):** A choice the agent makes to interact with the environment.
    *   **Reward ($r$):** A scalar feedback signal from the environment, indicating the desirability of the agent's last action.
    *   **Episode:** A sequence of states, actions, and rewards from an initial state to a terminal state.
    *   **Policy ($\pi$):** The agent's strategy, mapping states to probabilities of taking actions.
    *   **Value Function:** A prediction of the future reward from a given state or state-action pair.
*   **Markov Decision Process (MDP):** A mathematical framework for modeling sequential decision-making, defining states, actions, transition probabilities, and rewards.
*   **Probability & Statistics:**
    *   **Expectation ($E[\cdot]$):** The average value of a random variable.
    *   **Probability Distributions:** Understanding how probabilities are assigned to different outcomes (e.g., discrete, continuous).
    *   **Sampling:** Drawing observations from a distribution.
*   **Calculus:**
    *   **Derivatives:** The rate of change of a function.
    *   **Gradients ($\nabla$):** A vector of partial derivatives, pointing in the direction of the steepest ascent of a multi-variable function.
    *   **Chain Rule:** For differentiating composite functions.
    *   **Logarithm Properties:** Especially $\nabla_x \log f(x) = \frac{\nabla_x f(x)}{f(x)}$.
*   **Linear Algebra:** Basic understanding of vectors and matrices, especially for representing parameters of a policy.
*   **Deep Learning Basics (for practical applications):**
    *   **Neural Networks:** How they represent functions.
    *   **Parameters ($\theta$):** The weights and biases of a neural network.
    *   **Backpropagation:** The algorithm for computing gradients of a loss function with respect to network parameters.

## 4. The core idea — step by step

Let's break down the REINFORCE algorithm step by step, building intuition before diving into the math.

### Step 1: The Goal - Maximize Expected Return

*   **Plain English:** Our agent wants to find a "policy" (a strategy for choosing actions) that, over the long run, will lead to the highest possible total reward. It's not just about getting a good reward *now*, but about getting the most cumulative reward throughout an entire "episode" or sequence of interactions.

*   **Small concrete example:** Imagine a drone learning to deliver a package. It gets a small negative reward for fuel consumption at each step, a large negative reward for crashing, and a large positive reward for successfully delivering the package. Its goal is to maximize the total sum of these rewards (which means minimizing fuel, avoiding crashes, and delivering the package).

*   **Formal/Mathematical Version:** We define the "return" $G_t$ from time step $t$ as the total discounted future rewards:
    $$ G_t = \sum_{k=0}^{T-t-1} \gamma^k r_{t+k+1} $$
    where $r_{t+k+1}$ is the reward received at step $t+k+1$, $\gamma \in [0, 1]$ is the discount factor (future rewards are worth less), and $T$ is the total number of steps in the episode. Our objective is to find policy parameters $\theta$ that maximize the expected return from the start state:
    $$ J(\theta) = E_{\tau \sim \pi_\theta} [G_0] = E_{\tau \sim \pi_\theta} \left[ \sum_{t=0}^{T-1} \gamma^t r_{t+1} \right] $$
    Here, $\tau$ represents an entire trajectory (sequence of states, actions, rewards: $s_0, a_0, r_1, s_1, a_1, r_2, \dots, s_{T-1}, a_{T-1}, r_T, s_T$), and $\pi_\theta$ is the policy parameterized by $\theta$.

*   **What could go wrong:** If the discount factor $\gamma$ is too low, the agent might become too short-sighted, only caring about immediate rewards and potentially missing out on larger future rewards. If $\gamma$ is too high (close to 1), the agent might struggle to attribute rewards to distant past actions.

### Step 2: The Policy - Our Strategy

*   **Plain English:** The policy is the agent's decision-making rule. For REINFORCE, we typically use a *stochastic policy*, meaning it doesn't just pick one action, but rather assigns a probability to each possible action in a given state. This allows for exploration – trying out different things – which is crucial for learning. This policy is usually represented by a neural network whose output probabilities depend on its internal "parameters" ($\theta$).

*   **Small concrete example:** In a simple grid world, if the agent is in state $(x,y)$, its policy might say: "Move North with 40% probability, East with 30%, South with 20%, West with 10%." These probabilities are determined by the policy's parameters.

*   **Formal/Mathematical Version:** We denote the policy as $\pi_\theta(a|s)$, which is the probability of taking action $a$ when in state $s$, given the policy parameters $\theta$. For a neural network, $s$ would be the input, and the output layer (e.g., a softmax layer) would produce a probability distribution over the available actions.
    $$ \pi_\theta(a|s) = P(A_t=a | S_t=s; \theta) $$

*   **What could go wrong:** If the policy is too deterministic (probabilities are very skewed towards one action), the agent might not explore enough and get stuck in a suboptimal strategy. If it's too random, it might not learn anything useful.

### Step 3: Policy Gradient - How to Improve the Strategy

*   **Plain English:** Since our goal is to maximize the expected return $J(\theta)$, we need to know how to change the policy parameters $\theta$ to increase $J(\theta)$. In calculus, the "gradient" points in the direction of the steepest increase of a function. So, we want to compute the gradient of $J(\theta)$ with respect to $\theta$, denoted $\nabla_\theta J(\theta)$. We then update our parameters by moving a small step in that direction.

*   **Small concrete example:** If we slightly increase a parameter $\theta_1$, and that leads to a higher expected reward, then the gradient component for $\theta_1$ will be positive, telling us to keep increasing it. If it leads to a lower reward, the component will be negative, telling us to decrease it.

*   **Formal/Mathematical Version:** We want to compute:
    $$ \nabla_\theta J(\theta) $$
    This gradient will tell us how to adjust $\theta$ to make our expected return higher. The update rule for our parameters will then be:
    $$ \theta \leftarrow \theta + \alpha \nabla_\theta J(\theta) $$
    where $\alpha$ is a small positive learning rate.

*   **What could go wrong:** Calculating this gradient directly is hard because the expectation depends on the policy, and the rewards come from interacting with an environment whose dynamics might be unknown. This is where the "Policy Gradient Theorem" comes in.

### Step 4: The Policy Gradient Theorem (Intuition for REINFORCE)

*   **Plain English:** The clever trick of the Policy Gradient Theorem (and REINFORCE) is that we don't need to know the environment's internal workings (like how states transition or what rewards it will give). Instead, we can estimate the gradient by simply *sampling* trajectories (playing out episodes) and observing the actions taken and the rewards received. The key insight is that we can differentiate through the policy's probability of an action, and then weight that by the *total reward received after that action*.

*   **Small concrete example:** Suppose our drone takes action $A$ in state $S$. If, after taking action $A$, the drone goes on to achieve a very high total reward for the rest of the episode, then we want to make action $A$ *more likely* in state $S$. Conversely, if action $A$ leads to a crash and low total reward, we want to make it *less likely*. The gradient helps us achieve this.

*   **Formal/Mathematical Version:** The Policy Gradient Theorem states that for episodic tasks, the gradient can be written as:
    $$ \nabla_\theta J(\theta) = E_{\tau \sim \pi_\theta} \left[ \sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t|s_t) G_t \right] $$
    where $G_t$ is the return (total discounted future reward) from time step $t$ onwards.
    The term $\nabla_\theta \log \pi_\theta(a_t|s_t)$ is called the "score function" or "log-derivative trick." It's important because it allows us to compute the gradient without differentiating through the environment.
    Recall the identity: $\nabla_x \log f(x) = \frac{\nabla_x f(x)}{f(x)}$. So, $\nabla_\theta \log \pi_\theta(a_t|s_t) = \frac{\nabla_\theta \pi_\theta(a_t|s_t)}{\pi_\theta(a_t|s_t)}$. This means we're scaling the gradient of the action probability by the inverse of the action probability itself, and then by the return.

*   **What could go wrong:** This formula uses the *actual* return $G_t$ from the sampled trajectory. This can be very noisy because one lucky or unlucky roll of the dice (random action) can lead to a very high or low $G_t$, even if the action itself wasn't inherently good or bad. This leads to high variance in the gradient estimate.

### Step 5: REINFORCE - The Algorithm

*   **Plain English:** REINFORCE is a direct application of the Policy Gradient Theorem. The algorithm works by:
    1.  Playing an entire episode (or multiple episodes) using the current policy to collect a sequence of states, actions, and rewards.
    2.  For each action taken in the episode, calculate the total reward obtained *from that point onwards* until the end of the episode (the "return").
    3.  Adjust the policy parameters: if an action led to a high return, increase its probability. If it led to a low return, decrease its probability. This adjustment is done using the gradient formula from Step 4.

*   **Small concrete example:** The drone flies through an obstacle course. It makes a turn at $t=5$. It eventually crashes at $t=10$. The total reward from $t=5$ onwards ($G_5$) is very low (negative). REINFORCE will look at that turn at $t=5$ and make it less likely in the future. If, in another episode, the drone makes a similar turn at $t=5$ and then successfully completes the course, $G_5$ will be high, and that turn will be made more likely.

*   **Formal/Mathematical Version:**
    The REINFORCE algorithm (also known as Monte Carlo Policy Gradient) proceeds as follows:
    1.  Initialize policy parameters $\theta$ randomly.
    2.  **Loop forever (or until convergence):**
        a.  Generate an episode $\tau = (s_0, a_0, r_1, s_1, a_1, r_2, \dots, s_{T-1}, a_{T-1}, r_T, s_T)$ by following policy $\pi_\theta$.
        b.  For each step $t=0, \dots, T-1$:
            i.  Calculate the return $G_t = \sum_{k=0}^{T-t-1} \gamma^k r_{t+k+1}$.
            ii. Compute the gradient contribution for this step: $\nabla_\theta \log \pi_\theta(a_t|s_t) G_t$.
        c.  Sum up all gradient contributions to get the estimated policy gradient:
            $$ \hat{g} = \sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t|s_t) G_t $$
            (Note: In practice, we often average over multiple episodes for a more stable estimate).
        d.  Update policy parameters:
            $$ \theta \leftarrow \theta + \alpha \hat{g} $$
            where $\alpha$ is the learning rate.

*   **What could go wrong:** The biggest issue with vanilla REINFORCE is its high variance. Because it uses the *entire* return $G_t$ for each action, a single good or bad outcome at the end of an episode can influence the gradients of *all* actions taken throughout that episode, even if some early actions were actually good. This can lead to very unstable learning and slow convergence.

### Step 6: The Baseline (Reducing Variance)

*   **Plain English:** To address the high variance problem, a common trick is to introduce a "baseline." Instead of scaling the log-probability of an action by the raw return $G_t$, we scale it by $(G_t - b(s_t))$, where $b(s_t)$ is a baseline function that estimates the *expected* return from state $s_t$. This doesn't change the *expected* value of the gradient (it's still correct), but it significantly reduces its variance. It makes the agent focus on whether an action was *better or worse than average* for that state, rather than just good or bad in absolute terms.

*   **Small concrete example:** If our drone consistently gets 100 points for completing a certain segment of its mission, and in one episode it gets 105 points, the baseline might be 100. So, the "advantage" for that segment is $105 - 100 = 5$. If it gets 95 points, the advantage is $95 - 100 = -5$. This makes the learning more sensitive to *relative* improvements or degradations. Without a baseline, 95 points would still be a positive reward, potentially encouraging actions that are actually suboptimal.

*   **Formal/Mathematical Version:** The policy gradient with a baseline $b(s_t)$ is:
    $$ \nabla_\theta J(\theta) = E_{\tau \sim \pi_\theta} \left[ \sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t|s_t) (G_t - b(s_t)) \right] $$
    A common choice for the baseline $b(s_t)$ is the state-value function $V(s_t) = E_{\pi_\theta}[G_t|S_t=s_t]$, which estimates the expected return from state $s_t$. This difference $(G_t - b(s_t))$ is often called the "advantage function" $A(s_t, a_t)$. The baseline $b(s_t)$ is typically learned by a separate neural network (a "value network") trained to predict $G_t$.

*   **What could go wrong:** Choosing a poor baseline (e.g., a constant baseline, or a baseline that's not well-estimated) might not reduce variance effectively, or in extreme cases, could even increase it. The baseline itself needs to be learned, adding another component to the learning system.

## 5. Worked examples — multiple, with every step shown

Let's walk through some examples to solidify the understanding. We'll start with a very simple discrete state-action space, then move towards a more complex scenario.

### Example 1: Simple 2-State, 2-Action MDP - Single Step Gradient

**Problem:**
Consider a very simple environment with two states, $S_1$ and $S_2$. From $S_1$, the agent can take two actions: $A_1$ or $A_2$.
The policy is parameterized by $\theta$. Let's define the policy probabilities from $S_1$ using a softmax function with a single parameter $\theta_1$:
$$ P(A_1|S_1; \theta) = \frac{e^{\theta_1}}{e^{\theta_1} + e^0} $$
$$ P(A_2|S_1; \theta) = \frac{e^0}{e^{\theta_1} + e^0} $$
(We implicitly assume $\theta_2=0$ for action $A_2$ for simplicity, so only $\theta_1$ is learned).
Suppose the agent is in $S_1$, takes action $A_1$, and receives an immediate reward $r_1=10$. The episode then terminates.
Assume $\gamma=1$ (no discount).
Calculate the gradient $\nabla_{\theta_1} \log \pi_\theta(A_1|S_1) G_0$ for this single step and single episode.
Let the initial $\theta_1 = 0$.

**Given:**
*   State: $S_1$
*   Action taken: $A_1$
*   Reward received: $r_1 = 10$
*   Policy parameter: $\theta_1$
*   Policy probabilities: $\pi_\theta(A_1|S_1) = \frac{e^{\theta_1}}{e^{\theta_1} + 1}$, $\pi_\theta(A_2|S_1) = \frac{1}{e^{\theta_1} + 1}$
*   Initial $\theta_1 = 0$
*   Discount factor $\gamma = 1$

**What we want:**
The gradient contribution for this step: $\nabla_{\theta_1} \log \pi_\theta(A_1|S_1) G_0$.

**Show every step:**

1.  **Calculate the return $G_0$:**
    Since the episode terminates after one step and $\gamma=1$, $G_0$ is simply the immediate reward.
    $$ G_0 = r_1 = 10 $$
    *Explanation:* The return $G_t$ is the sum of future discounted rewards. Here, we are at $t=0$, and the only future reward is $r_1$ at $t=1$. With $\gamma=1$, $G_0 = \gamma^0 r_1 = 1 \times 10 = 10$.

2.  **Calculate $\pi_\theta(A_1|S_1)$ with $\theta_1=0$:**
    $$ \pi_\theta(A_1|S_1) = \frac{e^0}{e^0 + 1} = \frac{1}{1 + 1} = \frac{1}{2} = 0.5 $$
    *Explanation:* We substitute the current value of $\theta_1$ into our policy function to find the probability of taking action $A_1$ in state $S_1$.

3.  **Calculate $\log \pi_\theta(A_1|S_1)$:**
    $$ \log \pi_\theta(A_1|S_1) = \log(0.5) \approx -0.693 $$
    *Explanation:* We take the natural logarithm of the probability. This is part of the score function $\nabla_\theta \log \pi_\theta(a|s)$.

4.  **Calculate the derivative $\nabla_{\theta_1} \log \pi_\theta(A_1|S_1)$:**
    We use the identity $\nabla_x \log f(x) = \frac{\nabla_x f(x)}{f(x)}$.
    Let $f(\theta_1) = \pi_\theta(A_1|S_1) = \frac{e^{\theta_1}}{e^{\theta_1} + 1}$.
    First, find $\nabla_{\theta_1} f(\theta_1)$:
    Using the quotient rule $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$:
    $u = e^{\theta_1} \implies u' = e^{\theta_1}$
    $v = e^{\theta_1} + 1 \implies v' = e^{\theta_1}$
    $$ \nabla_{\theta_1} \pi_\theta(A_1|S_1) = \frac{e^{\theta_1}(e^{\theta_1} + 1) - e^{\theta_1}(e^{\theta_1})}{(e^{\theta_1} + 1)^2} = \frac{e^{2\theta_1} + e^{\theta_1} - e^{2\theta_1}}{(e^{\theta_1} + 1)^2} = \frac{e^{\theta_1}}{(e^{\theta_1} + 1)^2} $$
    Now, substitute this back into the log-derivative identity:
    $$ \nabla_{\theta_1} \log \pi_\theta(A_1|S_1) = \frac{\nabla_{\theta_1} \pi_\theta(A_1|S_1)}{\pi_\theta(A_1|S_1)} = \frac{\frac{e^{\theta_1}}{(e^{\theta_1} + 1)^2}}{\frac{e^{\theta_1}}{e^{\theta_1} + 1}} $$
    $$ = \frac{e^{\theta_1}}{(e^{\theta_1} + 1)^2} \times \frac{e^{\theta_1} + 1}{e^{\theta_1}} = \frac{1}{e^{\theta_1} + 1} $$
    Now, substitute $\theta_1=0$:
    $$ \nabla_{\theta_1} \log \pi_\theta(A_1|S_1) = \frac{1}{e^0 + 1} = \frac{1}{1 + 1} = \frac{1}{2} = 0.5 $$
    *Explanation:* This is the core calculus step. We're finding how a tiny change in $\theta_1$ affects the log-probability of taking action $A_1$. For a softmax distribution, the derivative of the log-probability of an action is simply $(1 - \text{probability of that action})$ if it's the chosen action, or $(-\text{probability of the chosen action})$ if it's not the chosen action. In our case, for action $A_1$, it's $(1 - \pi_\theta(A_1|S_1))$. Since $\pi_\theta(A_1|S_1)=0.5$, the derivative is $1 - 0.5 = 0.5$.

5.  **Calculate the final gradient contribution:**
    Multiply the log-probability gradient by the return $G_0$:
    $$ \nabla_{\theta_1} J(\theta) \approx \nabla_{\theta_1} \log \pi_\theta(A_1|S_1) G_0 = (0.5) \times (10) = 5 $$

**Final Answer:**
The gradient contribution for this step is $\boxed{5}$.

**Reflection:**
This example shows that since action $A_1$ was taken and led to a positive reward, the gradient is positive. This means if we update $\theta_1 \leftarrow \theta_1 + \alpha \times 5$, we will increase $\theta_1$. A higher $\theta_1$ will increase $P(A_1|S_1)$ (since $e^{\theta_1}$ grows faster than $e^0$), making action $A_1$ more likely in state $S_1$ in the future, which is exactly what we want because it led to a good reward.

---

### Example 2: Simple 2-State, 2-Action MDP - Full Episode Gradient

**Problem:**
Using the same policy setup as Example 1, but now consider an episode with multiple steps.
Initial $\theta_1 = 0$. $\gamma = 0.9$.
The episode is:
$S_0=S_1 \xrightarrow{A_1} R_1=5, S_1 \xrightarrow{A_2} R_2=10, S_2 \xrightarrow{A_1} R_3=20, S_2 \text{ (terminal)}$
Calculate the total policy gradient $\hat{g} = \sum_{t=0}^{T-1} \nabla_{\theta_1} \log \pi_\theta(a_t|s_t) G_t$ for this episode.
Assume the policy parameters $\theta$ remain fixed for the duration of the episode (i.e., we don't update them mid-episode).

**Given:**
*   Episode: $(S_0=S_1, A_0=A_1, R_1=5, S_1, A_1=A_2, R_2=10, S_2, A_2=A_1, R_3=20, S_2)$
*   Policy parameters $\theta_1=0$ (constant for the episode)
*   Policy probabilities (from Example 1, with $\theta_1=0$):
    *   $\pi_\theta(A_1|S_1) = 0.5$
    *   $\pi_\theta(A_2|S_1) = 0.5$
    *   Assume from $S_2$, $\pi_\theta(A_1|S_2)$ and $\pi_\theta(A_2|S_2)$ are also $0.5$ for simplicity (or just that the $\theta_1$ parameter only affects $S_1$). For this problem, we're only learning $\theta_1$ which affects $S_1$.
*   Discount factor $\gamma = 0.9$

**What we want:**
The total policy gradient $\hat{g}$ for the episode.

**Show every step:**

The episode has $T=3$ steps where actions are taken ($t=0, 1, 2$).
We need to calculate $G_t$ and $\nabla_{\theta_1} \log \pi_\theta(a_t|s_t)$ for each step where an action is taken.

**Step 1: Calculate Returns ($G_t$) for each action taken.**
*   **For $t=2$ (Action $A_2=A_1$ in $S_2$):**
    The return $G_2$ is the reward from $t=3$ onwards.
    $$ G_2 = r_3 = 20 $$
    *Explanation:* $G_t = \sum_{k=0}^{T-t-1} \gamma^k r_{t+k+1}$. For $t=2$, $T-t-1 = 3-2-1 = 0$. So $G_2 = \gamma^0 r_{2+0+1} = r_3 = 20$.

*   **For $t=1$ (Action $A_1=A_2$ in $S_1$):**
    The return $G_1$ is $r_2 + \gamma r_3$.
    $$ G_1 = r_2 + \gamma r_3 = 10 + (0.9)(20) = 10 + 18 = 28 $$
    *Explanation:* $G_1 = \sum_{k=0}^{3-1-1} \gamma^k r_{1+k+1} = \gamma^0 r_2 + \gamma^1 r_3 = 1 \times 10 + 0.9 \times 20 = 28$.

*   **For $t=0$ (Action $A_0=A_1$ in $S_1$):**
    The return $G_0$ is $r_1 + \gamma r_2 + \gamma^2 r_3$.
    $$ G_0 = r_1 + \gamma r_2 + \gamma^2 r_3 = 5 + (0.9)(10) + (0.9)^2(20) = 5 + 9 + (0.81)(20) = 5 + 9 + 16.2 = 30.2 $$
    *Explanation:* $G_0 = \sum_{k=0}^{3-0-1} \gamma^k r_{0+k+1} = \gamma^0 r_1 + \gamma^1 r_2 + \gamma^2 r_3 = 1 \times 5 + 0.9 \times 10 + 0.81 \times 20 = 30.2$.

**Step 2: Calculate $\nabla_{\theta_1} \log \pi_\theta(a_t|s_t)$ for each action taken *from state $S_1$***.
Recall from Example 1, for a softmax with parameter $\theta_1$ for $A_1$ and $0$ for $A_2$:
$\nabla_{\theta_1} \log \pi_\theta(A_1|S_1) = 1 - \pi_\theta(A_1|S_1)$
$\nabla_{\theta_1} \log \pi_\theta(A_2|S_1) = -\pi_\theta(A_1|S_1)$ (this is because $A_2$ is the "other" action, and increasing $\theta_1$ makes $A_1$ more likely, thus $A_2$ less likely).
At $\theta_1=0$, $\pi_\theta(A_1|S_1) = 0.5$.

*   **For $t=0$ (Action $A_0=A_1$ in $S_0=S_1$):**
    $$ \nabla_{\theta_1} \log \pi_\theta(A_1|S_1) = 1 - \pi_\theta(A_1|S_1) = 1 - 0.5 = 0.5 $$
    *Explanation:* This is the derivative of the log-probability of the chosen action ($A_1$) with respect to $\theta_1$.

*   **For $t=1$ (Action $A_1=A_2$ in $S_1=S_1$):**
    $$ \nabla_{\theta_1} \log \pi_\theta(A_2|S_1) = -\pi_\theta(A_1|S_1) = -0.5 $$
    *Explanation:* This is the derivative of the log-probability of the chosen action ($A_2$) with respect to $\theta_1$. Since $A_2$ is the alternative action, increasing $\theta_1$ would make $A_1$ more likely, and thus $A_2$ less likely.

*   **For $t=2$ (Action $A_2=A_1$ in $S_2$):**
    The parameter $\theta_1$ only affects the policy in state $S_1$. Since the action is taken in $S_2$, the gradient with respect to $\theta_1$ is 0.
    $$ \nabla_{\theta_1} \log \pi_\theta(A_1|S_2) = 0 $$
    *Explanation:* Our policy parameter $\theta_1$ is defined to control the probabilities of actions *only from state $S_1$*. Therefore, changes in $\theta_1$ have no direct impact on the probability of taking an action from state $S_2$.

**Step 3: Calculate individual gradient contributions and sum them.**
The total gradient $\hat{g} = \sum_{t=0}^{T-1} \nabla_{\theta_1} \log \pi_\theta(a_t|s_t) G_t$.

*   **For $t=0$:**
    $$ \text{Contribution}_0 = \nabla_{\theta_1} \log \pi_\theta(A_1|S_1) G_0 = (0.5) \times (30.2) = 15.1 $$
    *Explanation:* Action $A_1$ was taken in $S_1$ and led to a high return. This positive contribution will make $A_1$ more likely in $S_1$.

*   **For $t=1$:**
    $$ \text{Contribution}_1 = \nabla_{\theta_1} \log \pi_\theta(A_2|S_1) G_1 = (-0.5) \times (28) = -14 $$
    *Explanation:* Action $A_2$ was taken in $S_1$ and also led to a high return. However, relative to $A_1$, $A_2$ has a negative gradient contribution *with respect to $\theta_1$* because $\theta_1$ primarily promotes $A_1$. If $A_2$ got a good return, it means we want to make $A_2$ more likely, which implies *decreasing* $\theta_1$.

*   **For $t=2$:**
    $$ \text{Contribution}_2 = \nabla_{\theta_1} \log \pi_\theta(A_1|S_2) G_2 = (0) \times (20) = 0 $$
    *Explanation:* As explained, $\theta_1$ does not influence actions from $S_2$.

*   **Total Gradient $\hat{g}$:**
    $$ \hat{g} = \text{Contribution}_0 + \text{Contribution}_1 + \text{Contribution}_2 = 15.1 + (-14) + 0 = 1.1 $$

**Final Answer:**
The total policy gradient for this episode is $\boxed{1.1}$.

**Reflection:**
The positive gradient of $1.1$ suggests that increasing $\theta_1$ (which makes $A_1$ more likely and $A_2$ less likely in $S_1$) is generally a good direction for this episode. This is a subtle point: even though $A_2$ at $t=1$ led to a good return, the *overall* effect of the episode (especially the very high $G_0$ for $A_1$) pushes $\theta_1$ to increase. This highlights the high variance issue: a single episode's trajectory dictates the update direction.

---

### Example 3: Policy Network with Softmax Output - Single Episode Update

**Problem:**
Consider a policy network with a single input feature $s$ (a scalar), and two output actions $A_1, A_2$. The network has one linear layer with weights $w_1, w_2$ and biases $b_1, b_2$ for the logits of actions $A_1, A_2$ respectively.
The logits are:
$z_1 = w_1 s + b_1$
$z_2 = w_2 s + b_2$
The probabilities are given by softmax:
$$ \pi_\theta(A_1|s) = \frac{e^{z_1}}{e^{z_1} + e^{z_2}} $$
$$ \pi_\theta(A_2|s) = \frac{e^{z_2}}{e^{z_1} + e^{z_2}} $$
The policy parameters are $\theta = \{w_1, b_1, w_2, b_2\}$.
Assume an episode:
$s_0=1, a_0=A_1, r_1=0$
$s_1=2, a_1=A_2, r_2=10$
The episode terminates after $a_1$.
Initial parameters: $w_1=0.5, b_1=0.1, w_2=-0.5, b_2=0.2$.
Discount factor $\gamma = 0.5$. Learning rate $\alpha=0.1$.
Perform one REINFORCE update to $\theta$ after this episode.

**Given:**
*   Episode: $(s_0=1, a_0=A_1, r_1=0, s_1=2, a_1=A_2, r_2=10)$
*   Policy parameters: $w_1=0.5, b_1=0.1, w_2=-0.5, b_2=0.2$
*   Discount factor $\gamma = 0.5$
*   Learning rate $\alpha = 0.1$

**What we want:**
The updated policy parameters $\theta_{new} = \{w_1', b_1', w_2', b_2'\}$.

**Show every step:**

**Part A: Calculate Returns ($G_t$)**

1.  **For $t=1$ (Action $a_1=A_2$ in $s_1=2$):**
    $$ G_1 = r_2 = 10 $$
    *Explanation:* This is the final action, so its return is just the immediate reward $r_2$.

2.  **For $t=0$ (Action $a_0=A_1$ in $s_0=1$):**
    $$ G_0 = r_1 + \gamma G_1 = 0 + (0.5)(10) = 5 $$
    *Explanation:* The return for $t=0$ includes the immediate reward $r_1$ plus the discounted future return $G_1$.

**Part B: Calculate Log-Probability Gradients ($\nabla_\theta \log \pi_\theta(a_t|s_t)$)**

Recall for softmax, if $a$ is the chosen action and $k$ is any action:
$\nabla_\theta \log \pi_\theta(a|s) = \nabla_\theta z_a - \sum_k \pi_\theta(A_k|s) \nabla_\theta z_k$
Alternatively, for the chosen action $a$: $\nabla_\theta \log \pi_\theta(a|s) = \nabla_\theta z_a - \nabla_\theta \log (\sum_k e^{z_k})$.
And for a specific parameter (e.g., $w_i$ for action $A_i$):
$\frac{\partial}{\partial w_i} \log \pi_\theta(A_i|s) = s (1 - \pi_\theta(A_i|s))$
$\frac{\partial}{\partial b_i} \log \pi_\theta(A_i|s) = 1 - \pi_\theta(A_i|s)$
And for a specific parameter (e.g., $w_j$ for action $A_j$, where $j \neq i$):
$\frac{\partial}{\partial w_j} \log \pi_\theta(A_i|s) = -s \pi_\theta(A_j|s)$
$\frac{\partial}{\partial b_j} \log \pi_\theta(A_i|s) = -\pi_\theta(A_j|s)$

Let's calculate the logits and probabilities first for each step:

*   **For $t=0$ ($s_0=1$):**
    $z_1 = w_1 s_0 + b_1 = (0.5)(1) + 0.1 = 0.6$
    $z_2 = w_2 s_0 + b_2 = (-0.5)(1) + 0.2 = -0.3$
    $$ \pi_\theta(A_1|s_0) = \frac{e^{0.6}}{e^{0.6} + e^{-0.3}} = \frac{1.822}{1.822 + 0.741} = \frac{1.822}{2.563} \approx 0.711 $$
    $$ \pi_\theta(A_2|s_0) = \frac{e^{-0.3}}{e^{0.6} + e^{-0.3}} = \frac{0.741}{2.563} \approx 0.289 $$
    Action taken: $a_0=A_1$.

    Now calculate the gradients for $t=0$:
    $$ \nabla_{w_1} \log \pi_\theta(A_1|s_0) = s_0 (1 - \pi_\theta(A_1|s_0)) = 1 \times (1 - 0.711) = 0.289 $$
    $$ \nabla_{b_1} \log \pi_\theta(A_1|s_0) = (1 - \pi_\theta(A_1|s_0)) = (1 - 0.711) = 0.289 $$
    $$ \nabla_{w_2} \log \pi_\theta(A_1|s_0) = -s_0 \pi_\theta(A_2|s_0) = -1 \times 0.289 = -0.289 $$
    $$ \nabla_{b_2} \log \pi_\theta(A_1|s_0) = -\pi_\theta(A_2|s_0) = -0.289 $$
    *Explanation:* These gradients tell us how to adjust $w_1, b_1, w_2, b_2$ to increase the log-probability of taking action $A_1$ in state $s_0=1$. Since $A_1$ was chosen, we want to increase its parameters and decrease the parameters of $A_2$. The magnitude is scaled by $s_0$ for weights, and by the probabilities themselves.

*   **For $t=1$ ($s_1=2$):**
    $z_1 = w_1 s_1 + b_1 = (0.5)(2) + 0.1 = 1.1$
    $z_2 = w_2 s_1 + b_2 = (-0.5)(2) + 0.2 = -0.8$
    $$ \pi_\theta(A_1|s_1) = \frac{e^{1.1}}{e^{1.1} + e^{-0.8}} = \frac{3.004}{3.004 + 0.449} = \frac{3.004}{3.453} \approx 0.870 $$
    $$ \pi_\theta(A_2|s_1) = \frac{e^{-0.8}}{e^{1.1} + e^{-0.8}} = \frac{0.449}{3.453} \approx 0.130 $$
    Action taken: $a_1=A_2$.

    Now calculate the gradients for $t=1$:
    $$ \nabla_{w_1} \log \pi_\theta(A_2|s_1) = -s_1 \pi_\theta(A_1|s_1) = -2 \times 0.870 = -1.740 $$
    $$ \nabla_{b_1} \log \pi_\theta(A_2|s_1) = -\pi_\theta(A_1|s_1) = -0.870 $$
    $$ \nabla_{w_2} \log \pi_\theta(A_2|s_1) = s_1 (1 - \pi_\theta(A_2|s_1)) = 2 \times (1 - 0.130) = 2 \times 0.870 = 1.740 $$
    $$ \nabla_{b_2} \log \pi_\theta(A_2|s_1) = (1 - \pi_\theta(A_2|s_1)) = (1 - 0.130) = 0.870 $$
    *Explanation:* Similarly, these gradients tell us how to adjust parameters to increase the log-probability of taking action $A_2$ in state $s_1=2$. Since $A_2$ was chosen, we want to increase its parameters and decrease the parameters of $A_1$.

**Part C: Calculate Total Gradient $\hat{g}$ and Update Parameters**

The total gradient $\hat{g} = \sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t|s_t) G_t$.
We calculate the contribution for each parameter:

*   **For $w_1$:**
    $$ \hat{g}_{w_1} = (\nabla_{w_1} \log \pi_\theta(A_1|s_0) G_0) + (\nabla_{w_1} \log \pi_\theta(A_2|s_1) G_1) $$
    $$ = (0.289 \times 5) + (-1.740 \times 10) = 1.445 - 17.40 = -15.955 $$
*   **For $b_1$:**
    $$ \hat{g}_{b_1} = (\nabla_{b_1} \log \pi_\theta(A_1|s_0) G_0) + (\nabla_{b_1} \log \pi_\theta(A_2|s_1) G_1) $$
    $$ = (0.289 \times 5) + (-0.870 \times 10) = 1.445 - 8.70 = -7.255 $$
*   **For $w_2$:**
    $$ \hat{g}_{w_2} = (\nabla_{w_2} \log \pi_\theta(A_1|s_0) G_0) + (\nabla_{w_2} \log \pi_\theta(A_2|s_1) G_1) $$
    $$ = (-0.289 \times 5) + (1.740 \times 10) = -1.445 + 17.40 = 15.955 $$
*   **For $b_2$:**
    $$ \hat{g}_{b_2} = (\nabla_{b_2} \log \pi_\theta(A_1|s_0) G_0) + (\nabla_{b_2} \log \pi_\theta(A_2|s_1) G_1) $$
    $$ = (-0.289 \times 5) + (0.870 \times 10) = -1.445 + 8.70 = 7.255 $$

Now, update the parameters using $\theta_{new} = \theta_{old} + \alpha \hat{g}$:

*   **$w_1'$:** $0.5 + 0.1 \times (-15.955) = 0.5 - 1.5955 = -1.0955$
*   **$b_1'$:** $0.1 + 0.1 \times (-7.255) = 0.1 - 0.7255 = -0.6255$
*   **$w_2'$:** $-0.5 + 0.1 \times (15.955) = -0.5 + 1.5955 = 1.0955$
*   **$b_2'$:** $0.2 + 0.1 \times (7.255) = 0.2 + 0.7255 = 0.9255$

**Final Answer:**
The updated policy parameters are:
$w_1' = \boxed{-1.0955}$
$b_1' = \boxed{-0.6255}$
$w_2' = \boxed{1.0955}$
$b_2' = \boxed{0.9255}$

**Reflection:**
Notice that $w_1$ and $b_1$ (parameters for $A_1$) decreased, while $w_2$ and $b_2$ (parameters for $A_2$) increased. This makes sense:
*   At $t=0$, $A_1$ was taken, but its return $G_0=5$ was relatively low compared to $G_1=10$.
*   At $t=1$, $A_2$ was taken, and its return $G_1=10$ was high.
The overall effect of the episode, especially the strong positive reward for $A_2$ at $s_1=2$, pushed the policy to make $A_2$ more likely and $A_1$ less likely. This demonstrates how REINFORCE learns by attributing positive returns to actions, even if they occurred much earlier in the episode.

---

### Example 4: Conceptual Understanding of Baseline Impact

**Problem:**
Consider a scenario where an agent is in state $S$. It can take action $A_1$ or $A_2$.
In one episode, it takes $A_1$ and gets a total return $G_0 = 10$.
In another episode, it takes $A_2$ and gets a total return $G_0 = 8$.
The current policy parameters $\theta$ lead to $\pi_\theta(A_1|S) = 0.6$ and $\pi_\theta(A_2|S) = 0.4$.
The gradients of the log-probabilities are:
$\nabla_\theta \log \pi_\theta(A_1|S) = \mathbf{v_1}$ (a vector)
$\nabla_\theta \log \pi_\theta(A_2|S) = \mathbf{v_2}$
Assume for simplicity that $\mathbf{v_1} = [1, -0.5]$ and $\mathbf{v_2} = [-1, 0.5]$ (i.e., making $A_1$ more likely means making $A_2$ less likely, and vice versa).

Now, consider two scenarios for calculating the policy gradient update:
1.  **No baseline:** The standard REINFORCE update.
2.  **With a baseline:** We use a baseline $b(S) = 9$.

Compare the update direction and magnitude for $\theta$ in both scenarios, assuming we average the gradients from these two episodes.

**Given:**
*   Episode 1: Action $A_1$, Return $G_0^{(1)} = 10$
*   Episode 2: Action $A_2$, Return $G_0^{(2)} = 8$
*   Log-probability gradients: $\nabla_\theta \log \pi_\theta(A_1|S) = \mathbf{v_1} = [1, -0.5]$, $\nabla_\theta \log \pi_\theta(A_2|S) = \mathbf{v_2} = [-1, 0.5]$
*   Baseline $b(S) = 9$

**What we want:**
Compare the average policy gradient $\hat{g}$ for $\theta$ with and without the baseline.

**Show every step:**

**Scenario 1: No Baseline**

1.  **Gradient from Episode 1:**
    $$ \hat{g}^{(1)} = \nabla_\theta \log \pi_\theta(A_1|S) G_0^{(1)} = \mathbf{v_1} \times 10 = [1, -0.5] \times 10 = [10, -5] $$
    *Explanation:* Since $A_1$ was chosen and got a positive return, we push $\theta$ in the direction that makes $A_1$ more likely.

2.  **Gradient from Episode 2:**
    $$ \hat{g}^{(2)} = \nabla_\theta \log \pi_\theta(A_2|S) G_0^{(2)} = \mathbf{v_2} \times 8 = [-1, 0.5] \times 8 = [-8, 4] $$
    *Explanation:* Since $A_2$ was chosen and got a positive return, we push $\theta$ in the direction that makes $A_2$ more likely.

3.  **Average Gradient (No Baseline):**
    $$ \hat{g}_{\text{no baseline}} = \frac{\hat{g}^{(1)} + \hat{g}^{(2)}}{2} = \frac{[10, -5] + [-8, 4]}{2} = \frac{[2, -1]}{2} = [1, -0.5] $$
    *Explanation:* We average the gradient contributions from both episodes. The overall direction is positive for $\mathbf{v_1}$'s first component and negative for its second, meaning it slightly favors making $A_1$ more likely.

**Scenario 2: With Baseline $b(S) = 9$**

1.  **Gradient from Episode 1:**
    $$ \hat{g}^{(1)}_{\text{baseline}} = \nabla_\theta \log \pi_\theta(A_1|S) (G_0^{(1)} - b(S)) = \mathbf{v_1} \times (10 - 9) = \mathbf{v_1} \times 1 = [1, -0.5] $$
    *Explanation:* Action $A_1$ resulted in a return of 10, which is 1 point *better* than the baseline of 9. So, we make $A_1$ slightly more likely.

2.  **Gradient from Episode 2:**
    $$ \hat{g}^{(2)}_{\text{baseline}} = \nabla_\theta \log \pi_\theta(A_2|S) (G_0^{(2)} - b(S)) = \mathbf{v_2} \times (8 - 9) = \mathbf{v_2} \times (-1) = [-1, 0.5] \times (-1) = [1, -0.5] $$
    *Explanation:* Action $A_2$ resulted in a return of 8, which is 1 point *worse* than the baseline of 9. So, we make $A_2$ slightly *less* likely. Since $\mathbf{v_2}$ is the direction that makes $A_2$ more likely, multiplying by $-1$ reverses this, making $A_2$ less likely (and thus $A_1$ more likely).

3.  **Average Gradient (With Baseline):**
    $$ \hat{g}_{\text{with baseline}} = \frac{\hat{g}^{(1)}_{\text{baseline}} + \hat{g}^{(2)}_{\text{baseline}}}{2} = \frac{[1, -0.5] + [1, -0.5]}{2} = \frac{[2, -1]}{2} = [1, -0.5] $$

**Final Answer:**
*   Average gradient **without baseline**: $\boxed{[1, -0.5]}$
*   Average gradient **with baseline**: $\boxed{[1, -0.5]}$

**Reflection:**
Notice that the *average direction* of the gradient is the same in both cases! This demonstrates a crucial property of baselines: they reduce variance *without changing the expected value* of the gradient.
However, the *magnitude* of the individual gradient contributions changed.
Without a baseline, $A_1$ (return 10) had a much stronger positive push (scaled by 10) than $A_2$ (return 8) had a negative push (scaled by 8).
With the baseline, $A_1$ (return 10, advantage +1) had a small positive push (scaled by 1), and $A_2$ (return 8, advantage -1) had a small negative push (scaled by -1, which becomes a positive push for $\mathbf{v_1}$).
The baseline made the individual gradient contributions more balanced and less susceptible to the absolute scale of the rewards, focusing instead on whether an action was *better or worse than average*. This reduces the variance of the gradient estimate, leading to more stable learning.

## 6. Common mistakes and traps

1.  **Confusing $R_t$ with $G_t$:** A very common error is to use the immediate reward $r_{t+1}$ instead of the full return $G_t$ (sum of *all* future discounted rewards from time $t+1$ onwards) in the policy gradient update. The REINFORCE algorithm explicitly needs $G_t$ to correctly attribute long-term consequences to actions.
    *   *Why it happens:* Simplicity, misunderstanding the "return" concept.
2.  **Incorrectly applying the discount factor $\gamma$:** When calculating $G_t$, ensure the discount factor is applied correctly for each future reward. The reward $r_{t+k+1}$ should be discounted by $\gamma^k$.
    *   *Why it happens:* Careless indexing or forgetting that rewards further in the future are discounted more heavily.
3.  **High variance leading to unstable learning:** REINFORCE is notorious for its high variance. If