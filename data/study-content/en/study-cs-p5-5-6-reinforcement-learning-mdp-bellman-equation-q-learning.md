## 1. The one-sentence answer
**Reinforcement learning framed as a Markov Decision Process solves sequential decision problems by letting an agent learn an optimal action-value function through the Bellman equation, which Q-learning estimates directly from experience without a model.**

An MDP is a formal description of an environment in which the next state depends only on the current state and the action taken. The agent receives a reward signal after each transition and seeks a policy that maximises the expected sum of future rewards. The Bellman equation expresses the value of a state-action pair recursively in terms of the immediate reward plus the value of the best next state-action pair, turning an apparently global optimisation task into a set of local consistency conditions.

Q-learning is an off-policy temporal-difference algorithm that iteratively updates an estimate of the action-value function by bootstrapping from its own current estimate of the maximum future value. Because the update uses the maximum over actions rather than the action actually taken, the learned Q-function converges to the optimal action-value function even when the behaviour policy that generates experience is exploratory.

> [!NOTE]
> The single deepest insight is that the Bellman optimality equation converts the credit-assignment problem across time into a fixed-point equation that can be solved by repeated local averaging; once this contraction mapping is recognised, convergence guarantees and algorithm design follow directly.

## 2. Why this matters — concrete and current
SpaceX has published internal results on using deep Q-network variants to optimise the boost-back and landing burn sequence of Falcon 9 first stages, replacing hand-tuned gain schedules with policies learned in high-fidelity six-degree-of-freedom simulators.

NASA’s Jet Propulsion Laboratory has applied model-free Q-learning to autonomous rover navigation on Mars analogue terrain, allowing the vehicle to select safe driving actions from monocular images while maximising a reward that penalises wheel slip and energy use.

Airbus Defence and Space has demonstrated reinforcement-learning-based attitude control for small satellites that must reject disturbances from reaction-wheel imbalances; the learned policy outperforms classical linear-quadratic regulators when actuator saturation and sensor noise are present.

Blue Origin’s New Shepard vehicle uses an MDP formulation inside its landing-footprint predictor; the Bellman backup is run in real time on the flight computer to recompute the safest divert trajectory after engine-out contingencies.

Google DeepMind, in collaboration with ESA, has explored Q-learning for on-board scheduling of Earth-observation satellites whose imaging opportunities must be traded against power and thermal constraints that evolve stochastically.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Basic probability        | Transition probabilities \(P(s'\mid s,a)\) and expectation over stochastic rewards define the MDP. |
| Dynamic programming      | Value iteration and policy iteration are the exact precursors that Q-learning approximates without a model. |
| Linear algebra           | The Bellman equation is a linear system whose contraction property guarantees unique fixed points. |
| Supervised learning basics | Q-learning can be viewed as regression onto a moving target; understanding loss surfaces helps when function approximation is introduced. |

## 4. Building the idea — from intuition to formalism

### Step 1 — States, actions, and the Markov property
Any sequential decision problem can be reduced to a tuple in which the future depends on the past only through the present state.  
Consider a drone that must reach a waypoint: its position and velocity at time \(t\) are sufficient to predict the distribution of positions at \(t+1\) once thrust is chosen.  
Formally an MDP is the tuple \((S,A,P,R,\gamma)\) where \(S\) is the state set, \(A\) the action set, \(P(s'\mid s,a)\) the transition kernel, \(R(s,a)\) the expected reward, and \(\gamma\in[0,1)\) the discount factor.  
> [!WARNING]
> Treating the state as Markov when hidden variables exist (e.g., wind gusts not measured by the drone) produces non-stationary value estimates that never converge.

### Step 2 — Policy and value function
A policy \(\pi(a\mid s)\) maps states to actions. Its quality is measured by the expected discounted return  
\[
G_t=\sum_{k=0}^\infty\gamma^k R_{t+k}.
\]
The state-value function is \(V^\pi(s)=\mathbb{E}_\pi[G_t\mid S_t=s]\).  
For the drone, \(V^\pi(s)\) tells how much total fuel it expects to save if it follows \(\pi\) from position \(s\).

### Step 3 — Action-value function
Because decisions are made by choosing actions, it is more useful to evaluate state-action pairs:  
\[
Q^\pi(s,a)=\mathbb{E}_\pi[G_t\mid S_t=s,A_t=a].
\]
The optimal action-value function satisfies \(Q^*(s,a)=\max_\pi Q^\pi(s,a)\).

### Step 4 — Bellman optimality equation
The optimal value of any state-action pair equals the immediate reward plus the discounted optimal value of the best successor:  
\[
Q^*(s,a)=R(s,a)+\gamma\sum_{s'}P(s'\mid s,a)\max_{a'}Q^*(s',a').
\]
This is a system of \(|S|\times|A|\) nonlinear equations whose unique solution is \(Q^*\).

### Step 5 — Q-learning update
Replace the expectation by a sample and the true \(Q^*\) by the current estimate:  
\[
Q(s,a)\leftarrow Q(s,a)+\alpha\Bigl[R+\gamma\max_{a'}Q(s',a')-Q(s,a)\Bigr].
\]
The algorithm repeatedly applies this backup along trajectories generated by any behaviour policy that visits every state-action pair infinitely often.

## 5. Worked examples — every step shown

**Example 1 — Deterministic 1-step chain**  
*Given:* Two states \(\{s_0,s_1\}\), one action \(a\), reward \(+1\) on entering \(s_1\), \(\gamma=0.9\), terminal at \(s_1\).  
*Find:* \(Q^*(s_0,a)\).  
Step 1: Write the Bellman equation for the single transition  
\[
Q(s_0,a)=1+0.9\cdot\max Q(s_1,\cdot).
\]  
*Why:* Immediate reward plus discounted optimal continuation.  
Step 2: Terminal state has value 0, therefore  
\[
Q(s_0,a)=1.
\]  
**\(Q^*(s_0,a)=1\)**

*Reflection:* The example isolates the recursive structure without stochasticity; the same algebra scales to larger MDPs.

**Example 2 — Stochastic reward**  
*Given:* Same states, but reward \(+2\) or \(0\) each with probability 0.5.  
*Find:* \(Q^*(s_0,a)\).  
Step 1: Expected immediate reward is 1, yielding the identical equation as above.  
**\(Q^*(s_0,a)=1\)**

*Reflection:* Only the expectation of the reward enters the Bellman equation; higher moments are irrelevant for risk-neutral agents.

**Example 3 — Two-action choice**  
*Given:* From \(s_0\) action \(a_1\) leads to \(s_1\) with reward 1; action \(a_2\) leads to \(s_2\) with reward 3, \(\gamma=0.5\). Both \(s_1,s_2\) terminal.  
*Find:* \(Q^*(s_0,a_2)\).  
Step 1:  
\[
Q(s_0,a_2)=3+0.5\cdot0=3.
\]  
**\(Q^*(s_0,a_2)=3\)**

*Reflection:* The max operator automatically discards the inferior action; the agent never needs to evaluate \(a_1\) at optimality.

**Example 4 — Q-learning iteration on a 2-state MDP**  
*Given:* Non-terminal states \(\{s_0,s_1\}\), actions \(\{L,R\}\), transition and reward data known, \(\alpha=0.1\), \(\gamma=0.9\), initial \(Q=0\). One observed transition: \(s_0\xrightarrow{R} s_1\), reward \(+2\).  
*Find:* Updated \(Q(s_0,R)\).  
Step 1: Compute TD target  
\[
2+0.9\max(0,0)=2.
\]  
*Why:* Current estimate of best continuation is still zero.  
Step 2: Apply update  
\[
Q(s_0,R)\leftarrow0+0.1(2-0)=0.2.
\]  
**\(Q(s_0,R)=0.2\)**

*Reflection:* Even a single sample moves the estimate; repeated sampling with decaying \(\alpha\) converges to the fixed point of the Bellman operator.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using \(\max\) inside on-policy updates | Confusing SARSA with Q-learning                     | Check whether the update uses the behaviour action or the greedy action |
| Forgetting that \(\gamma<1\) is required for infinite horizons | Return may diverge                                  | Always verify the spectral radius of \(\gamma P^\pi\) |
| Treating function-approximation bias as exploration noise | Deep Q-networks overestimate values                 | Use double Q-learning or target networks             |
| Assuming every state is visited under the optimal policy | Off-policy sampling can leave gaps                  | Maintain an exploration schedule that covers the entire state-action space |
| Ignoring terminal-state handling  | Value of terminal states is undefined or NaN        | Explicitly set \(Q(\text{terminal},\cdot)=0\) after every update |
| Overwriting the same Q-table entry without locking | Parallel simulators race on shared memory           | Use per-thread replay buffers or lock-free updates   |
| Discount factor set to 1.0 on continuing tasks | Mathematical expectation may be infinite            | Detect continuing tasks and enforce \(\gamma<1\)     |

## 7. The textbook-precise statement
A finite MDP is a tuple \((S,A,P,R,\gamma)\) with \(S,A\) finite, \(P\) a probability kernel, \(R\) bounded, and \(\gamma\in[0,1)\). The optimal action-value function \(Q^*\) is the unique fixed point of the Bellman optimality operator  
\[
(\mathcal{T}Q)(s,a)=R(s,a)+\gamma\sum_{s'}P(s'\mid s,a)\max_{a'}Q(s',a').
\]
Q-learning with step-size sequence \(\alpha_t\) satisfying \(\sum\alpha_t=\infty\) and \(\sum\alpha_t^2<\infty\) converges with probability 1 to \(Q^*\) provided every state-action pair is visited infinitely often (Sutton & Barto, *Reinforcement Learning: An Introduction*, 2nd ed., §6.5).

## 8. Visual — diagram or schematic
```text
          s0
       /      \
   a=L (R=1)  a=R (R=2)
      /          \
    s1           s2
 (terminal)   (terminal)
```
States are nodes, directed edges are actions labelled with expected reward. The Bellman update backs up values along each edge and retains only the maximum at the next state.

## 9. The memory technique
1. **The hook** — Picture a robot vacuum that keeps a mental spreadsheet; every time it bumps into a wall it writes “this square plus the best square I can reach next” and slowly the numbers stabilise into a map of long-term cleanliness.  
2. **What to overlearn** — The single-line update  
   \[
   Q(s,a)\leftarrow Q(s,a)+\alpha[R+\gamma\max_{a'}Q(s',a')-Q(s,a)]
   \]
   and the fact that \(\max\) makes the algorithm off-policy.  
3. **Spaced-repetition schedule** — Review the update rule at 1 day, 3 days, 7 days, 16 days, 35 days while running a 5-state toy MDP by hand each time.  
4. **First-principles fallback** — Re-derive the contraction mapping property of \(\mathcal{T}\) on the sup-norm to prove uniqueness of \(Q^*\).

## 10. What this unlocks
Mastery of MDP, Bellman, and Q-learning supplies the exact foundation for policy-gradient methods, actor-critic architectures, and model-based planning used in modern aerospace autonomy stacks.  
- Deep Q-Networks and their extensions (Double DQN, Rainbow)  
- Policy gradient theorems and REINFORCE  
- Monte-Carlo Tree Search combined with learned value functions  
- Safe reinforcement learning with constrained MDPs for certification

## 11. Self-check — five questions, no answers
1. Write the Bellman optimality equation for a deterministic MDP with two states and show that its solution is unique.  
2. In a continuing task with \(\gamma=1\), what happens to the return if the agent never reaches a zero-reward cycle?  
3. Given a Q-table after 1000 steps, how would you detect that exploration has been insufficient?  
4. Derive the fixed point of the Q-learning operator when the behaviour policy is greedy with respect to the current Q.  
5. A drone’s altitude measurement is corrupted by zero-mean noise; explain why simply adding the noisy altitude to the state may violate the Markov property and what remedy preserves it.