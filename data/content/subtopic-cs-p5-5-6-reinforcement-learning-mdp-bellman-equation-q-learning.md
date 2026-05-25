## What it is
Reinforcement Learning (RL) is a paradigm where an agent learns to make optimal decisions by performing actions in an environment and observing the outcomes. The agent receives numerical rewards or penalties for its actions, and its goal is to learn a "policy"—a strategy for choosing actions—that maximizes its total cumulative reward over time. A Markov Decision Process (MDP) is the mathematical framework used to formalize this problem, the Bellman equation provides a recursive definition of optimal value, and Q-learning is a specific algorithm that learns the best actions to take, even without a complete model of the environment.

## Why it matters
This framework is fundamental for creating autonomous systems that can adapt and operate in complex, uncertain environments. In aerospace, RL is used to train agents for tasks like autonomous spacecraft docking, where the agent must learn a sequence of thruster firings to dock successfully while minimizing fuel consumption. It's also applied to UAVs for learning optimal flight paths through dynamic obstacles and for controlling robotic rovers to navigate challenging planetary surfaces without human intervention.

## When to study it
You should have a solid grasp of these prerequisites before diving in. If you are not comfortable with them, pause and review.
-   **Probability Theory:** Expected values, conditional probability, and the core concept of a Markov Chain. The "Markov Property" (the future is independent of the past, given the present) is the bedrock of MDPs.
-   **Linear Algebra:** Vectors and matrices. The Bellman equation can be expressed as a system of linear equations for a fixed policy.
-   **Calculus:** Basic optimization (finding the maximum or minimum of a function).
-   **Core Programming Concepts:** You must be comfortable with loops, dictionaries (or hash maps), and arrays to implement the algorithms.

## How to study it (step by step)
1.  **Internalize the MDP framework.** On paper, design a simple 3x3 grid world. Label a start state, a goal state (+10 reward), and a hazard state (-10 reward). Define the actions (Up, Down, Left, Right) and write down the reward for every other transition (e.g., -0.1 for each step to encourage efficiency).
2.  **Introduce stochasticity.** For one state in your grid, write out the transition probabilities $P(s'|s, a)$. For example, if the action is 'Up' from the center square, assume an 80% chance of moving up, a 10% chance of slipping left, and a 10% chance of slipping right. This forces you to think in terms of expectations.
3.  **Derive the Bellman Equation from first principles.** Start with the definition of the state-value function, $V(s) = \mathbb{E}[\sum_{t=0}^{\infty} \gamma^t r_{t+1} | s_0=s]$. Expand this sum one step into the future: $V(s) = \mathbb{E}[r_1 + \gamma \sum_{t=0}^{\infty} \gamma^t r_{t+2} | s_0=s]$. Recognize that the second term is the discounted value of the next state, $V(s')$. This will lead you directly to the Bellman equation.
4.  **Perform value iteration by hand.** Use your grid world from step 1. Initialize the value of all states $V(s)$ to 0. Apply the Bellman update rule iteratively to each state. Watch how the values from the goal and hazard states "propagate" outwards to their neighbors with each iteration.
5.  **Distinguish between $V(s)$ and $Q(s, a)$.** Write down the definition of the action-value function $Q(s, a)$. Now, write an equation that defines $V(s)$ in terms of $Q(s, a)$ for an optimal policy. This clarifies why Q-functions are more direct for action selection.
6.  **Derive the Q-learning update rule.** Start with the Bellman Optimality Equation for Q-values. This equation involves an expectation over the next state $s'$. Q-learning approximates this expectation with a single observed sample $(s, a, r, s')$. Formulate this as an update rule where you move your old estimate $Q(s, a)$ a small amount $\alpha$ in the direction of the new, better estimate $r + \gamma \max_{a'} Q(s', a')$.

## Key ideas, with intuition
1.  **The Markov Decision Process (MDP): $(S, A, P, R, \gamma)$**
    This is the formal specification of the "game" the agent is playing.
    -   $S$: A set of states. (e.g., positions on a grid).
    -   $A$: A set of actions. (e.g., Up, Down, Left, Right).
    -   $P(s'|s, a)$: The probability of transitioning to state $s'$ given you are in state $s$ and take action $a$. This is the "physics" of the world.
    -   $R(s, a, s')$: The reward received after transitioning from $s$ to $s'$ via action $a$. This defines the agent's goal.
    -   $\gamma$ (gamma): The discount factor, $0 \le \gamma < 1$. It makes immediate rewards more valuable than distant future rewards.
    *Intuition:* An MDP is a precise description of a world where only the present matters, and actions have probabilistic outcomes with associated rewards.

2.  **The Value Function, $V(s)$ — "How good is this state?"**
    The value of a state is the total amount of reward an agent can expect to accumulate in the future, starting from that state.
    $$ V^\pi(s) = \mathbb{E}_\pi \left[ \sum_{t=0}^{\infty} \gamma^t r_{t+1} \, \middle| \, s_0 = s \right] $$
    This depends on the agent's policy, $\pi$, which is its strategy for choosing actions.
    *Intuition:* A high-value state isn't necessarily one with a high immediate reward; it's a state from which it is easy to reach many high-reward states. It represents future potential.

3.  **The Bellman Equation — "The value here depends on the value there."**
    This is the fundamental recursive relationship in RL. It states that the value of your current state is the immediate reward you expect plus the discounted value of the state you expect to land in.
    $$ V^\pi(s) = \sum_{a} \pi(a|s) \sum_{s'} P(s'|s,a) \left[ R(s,a,s') + \gamma V^\pi(s') \right] $$
    *Intuition:* If you want to know the value of your house, you could say it's the enjoyment you get from it this year, plus its discounted sale price next year. The Bellman equation applies this logic to every state in the MDP, linking their values together.

4.  **The Q-Function, $Q(s, a)$ — "How good is this action in this state?"**
    The Q-function gives the expected total future reward for taking a specific action $a$ in a specific state $s$, and following the policy thereafter. This is more direct for making decisions: in any state $s$, just choose the action $a$ that has the highest $Q(s, a)$.
    $$ Q^*(s, a) = \mathbb{E}_{s' \sim P} \left[ r + \gamma \max_{a'} Q^*(s', a') \, \middle| \, s, a \right] $$
    This is the Bellman Optimality Equation for Q-values, which states that the value of the optimal Q-function is the expected immediate reward plus the discounted *maximum* Q-value achievable from the next state.

5.  **Q-Learning — Learning from experience.**
    Q-learning is an algorithm that learns the optimal $Q^*(s, a)$ function without needing to know the transition probabilities $P$ or rewards $R$ in advance. It learns by taking actions and observing the outcomes. Its core is the update rule:
    $$ Q(s_t, a_t) \leftarrow Q(s_t, a_t) + \alpha \left[ \underbrace{r_{t+1} + \gamma \max_{a'} Q(s_{t+1}, a')}_{\text{TD Target}} - Q(s_t, a_t) \right] $$
    *Intuition:* After taking action $a_t$ in state $s_t$ and observing reward $r_{t+1}$ and next state $s_{t+1}$, the agent computes a "target" value based on this real experience. It then "nudges" its old estimate, $Q(s_t, a_t)$, a little bit (determined by the learning rate $\alpha$) closer to this new, more accurate target.

## Worked example
Let's use a simple two-state environment.
-   **States:** $S = \{s_A, s_B\}$. $s_B$ is a terminal state.
-   **Actions:** From $s_A$, you can go `to_B`. From $s_B$, there are no actions.
-   **Rewards:** The transition from $s_A$ to $s_B$ gives a reward of $+10$.
-   **Parameters:** Discount factor $\gamma = 0.9$, Learning rate $\alpha = 0.5$.
-   **Q-table:** We only need to learn one value: $Q(s_A, \text{to_B})$. Let's initialize it to 0.

**Episode 1:**
1.  **Initial State:** The agent starts in $s_t = s_A$. The Q-table is $\{ Q(s_A, \text{to_B}): 0 \}$.
2.  **Choose Action:** There is only one action possible, $a_t = \text{to_B}$.
3.  **Observe Outcome:** The agent takes the action, receives reward $r_{t+1} = +10$, and transitions to the next state $s_{t+1} = s_B$. The episode ends because $s_B$ is terminal.
4.  **Update Q-value:** We apply the Q-learning update rule to $Q(s_A, \text{to_B})$.
    -   Old Value: $Q(s_A, \text{to_B}) = 0$.
    -   New Information (TD Target): $r_{t+1} + \gamma \max_{a'} Q(s_{t+1}, a')$.
    -   Since $s_{t+1}=s_B$ is a terminal state, the future value from it is 0. So, $\max_{a'} Q(s_B, a') = 0$.
    -   TD Target = $10 + 0.9 \times 0 = 10$.
    -   Update:
        $Q(s_A, \text{to_B}) \leftarrow 0 + 0.5 \times [10 - 0]$
        $Q(s_A, \text{to_B}) \leftarrow 5$.
5.  **End of Episode:** The Q-table is now $\{ Q(s_A, \text{to_B}): 5 \}$.

**Reflection:**
-   The process started with a guess ($Q=0$).
-   It used a real experience $(s_A, \text{to_B}, +10, s_B)$ to form a better, more informed target value (10).
-   It updated its original guess to move closer to the target, moderated by the learning rate. After one episode, the learned value is already halfway to the true discounted reward. Subsequent identical episodes would continue to push it closer to 10.

## Diagrams
```text
An MDP representing a simple grid world:

(s1) --R:-1--> (s2) --R:-1--> (s3)
 |               |               |
 v R:-1          v R:-1          v R:-1
(s4) --R:-1--> (s5) --R:-1--> (s6)
 |               |               |
 v R:-1          v R:-1          v R:-1
(s7) --R:-1--> (s8) --R:-1--> (s9) Goal
                                 [R:+10]

Arrows represent actions (e.g., 'Right', 'Down').
R is the immediate reward for taking that action.
The agent's goal is to find a path from a start state (e.g., s1)
to the goal state (s9) that maximizes the sum of rewards.
```

```text
The Q-Learning Update Cycle:

+----------------------------+
|  1. Observe current state s|
|                            |
|  2. Choose action a        |-----> To Environment
|     (e.g., epsilon-greedy) |
+-------------^--------------+
              |
              | 4. Update Q(s,a) using the Bellman
              |    update and the observed r, s'
              |
+-------------|--------------+
|  <----- From Environment   |
|                            |
|  3. Observe reward r       |
|     and new state s'       |
+----------------------------+
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of Q-learning as training a "Quality" inspector for decisions.
    -   The agent is in a state ($s$) and considers an action ($a$). It looks up the current estimated **Quality** of that decision, $Q(s, a)$.
    -   It tries the action and gets a real-world result: a reward ($r$) and a new state ($s'$).
    -   From this new state $s'$, the agent looks ahead and finds the **maximum possible Quality** it could get from there, $\max_{a'} Q(s', a')$.
    -   The "true" quality of the original action is now revealed to be the reward it just got, plus the discounted future quality: `r + γ * max_Q`.
    -   The inspector then files an error report: `Error = (new "true" quality) - (old estimated quality)`.
    -   Finally, it updates the original estimate by adding a fraction ($\alpha$) of the error: `New Q = Old Q + α * Error`.

2.  **Formulas to Overlearn:**
    -   **Bellman Optimality for Q:** $Q^*(s, a) = \mathbb{E}[r + \gamma \max_{a'} Q^*(s', a')]$
    -   **Q-Learning Update:** $Q(s, a) \leftarrow Q(s, a) + \alpha [r + \gamma \max_{a'} Q(s', a') - Q(s, a)]$

3.  **Spaced Repetition Schedule:**
    -   Review this material and re-derive the Q-learning update in **1 day**.
    -   Repeat in **3 days**.
    -   Repeat in **7 days**.
    -   Repeat in **16 days**.
    -   Repeat in **35 days**. Each time, start from the Bellman equation.

4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    -   Start with the idea: "The value of an action now is the immediate reward plus the discounted value of the best thing I can do next."
    -   This gives the Bellman Optimality equation (the first formula above).
    -   Q-learning is a way to solve this without knowing the environment's probabilities ($P$). We replace the expectation $\mathbb{E}[\dots]$ with a single sample from reality: $(r, s')$.
    -   This gives our "target" to learn towards: $T = r + \gamma \max_{a'} Q(s', a')$.
    -   The learning rule for any iterative estimation is: `NewEstimate = OldEstimate + StepSize * (Target - OldEstimate)`.
    -   Substitute the terms: $Q_{new}(s, a) = Q_{old}(s, a) + \alpha [