## 1. The one-sentence answer
**REINFORCE is a Monte Carlo policy-gradient method that updates the parameters of a stochastic policy by ascending an unbiased estimate of the gradient of expected return, obtained solely from complete episode trajectories.**

A policy in reinforcement learning is a mapping from states to action probabilities. When that mapping is differentiable and parameterized by a vector θ, the objective becomes finding the θ that maximizes the expected return J(θ). REINFORCE obtains an estimate of ∇J(θ) by running full episodes, recording the return G_t that follows each action, and weighting the score function ∇log π(a_t|s_t;θ) by that return. The resulting update moves probability mass toward actions that produced higher-than-average returns and away from those that produced lower returns.

Because the estimator relies only on sampled trajectories and requires no model of the environment dynamics, it belongs to the model-free, policy-search family. Its variance is high precisely because each update waits until the end of an episode; later refinements such as baselines and actor-critic architectures were invented to reduce that variance while preserving unbiasedness.

> [!NOTE]
> The single conceptual leap is realizing that the seemingly intractable derivative of an expectation over trajectories can be rewritten, via the likelihood-ratio (score-function) identity, as an expectation of a quantity you can sample directly: return multiplied by the gradient of the log-probability of the chosen action.

## 2. Why this matters — concrete and current
NASA’s Autonomous Systems and Operations project has used policy-gradient controllers trained with variants of REINFORCE to generate attitude-control policies for CubeSats that must reorient under uncertain solar-radiation pressure; the learned policies run on radiation-hardened flight processors and have been validated on the ASTERIA mission data.

SpaceX’s Starlink constellation employs onboard reinforcement-learning agents for collision-avoidance maneuvers; the policy parameters are initialized with gradients estimated by REINFORCE-style rollouts in a high-fidelity six-degree-of-freedom simulator before being fine-tuned with real telemetry.

Airbus Defence and Space has published results on using REINFORCE-trained policies for autonomous de-orbiting of satellites at end-of-life, where the agent must trade fuel consumption against a probabilistic re-entry corridor constraint derived from atmospheric-density forecasts.

In hypersonic vehicle research, Sandia National Laboratories has demonstrated REINFORCE-optimized guidance laws that steer a maneuvering re-entry vehicle through unknown wind fields while satisfying heating-rate limits; the same code base later flew on a sounding-rocket test article.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Expected value           | The objective J(θ) is defined as an expectation over trajectories; all gradient estimators are expectations of sampled quantities. |
| Chain rule / score function | The identity ∇_θ E[f] = E[f ∇_θ log p] converts an intractable derivative into a sampleable expression. |
| Stochastic policy        | REINFORCE requires a differentiable probability distribution π(a|s;θ) so that log π is defined. |
| Return G_t               | The Monte Carlo estimate of cumulative reward that serves as the scalar multiplier for each gradient step. |
| Unbiased estimator       | Guarantees that repeated application of the update converges (in expectation) to a local optimum of J(θ). |

## 4. Building the idea — from intuition to formalism

### Step 1 — The performance objective
The designer’s goal is to maximize the scalar performance measure J(θ) = E_τ∼p(τ;θ)[R(τ)], where τ denotes a full trajectory and R(τ) its return.  
Concrete example: a two-action bandit with actions “left” and “right”; θ controls the probability of choosing left.  
Formally,
$$
J(\theta)=\sum_{\tau} p(\tau;\theta)R(\tau).
$$
> [!WARNING]
> Treating J(θ) as an ordinary function and differentiating under the sum without accounting for the dependence of p(τ;θ) on θ produces an incorrect gradient.

### Step 2 — The likelihood-ratio identity
Differentiating the expectation yields
$$
\nabla J(\theta)=\sum_{\tau} \nabla p(\tau;\theta)R(\tau)=\sum_{\tau} p(\tau;\theta)R(\tau)\nabla\log p(\tau;\theta).
$$
This is an expectation under the same distribution that generates trajectories, so it can be estimated by sampling.

### Step 3 — Trajectory probability factorization
Because a trajectory factors as p(τ;θ)=p(s_0)∏_t π(a_t|s_t;θ)p(s_{t+1}|s_t,a_t), the gradient of the log probability reduces to a sum of policy log-probability gradients:
$$
\nabla\log p(\tau;\theta)=\sum_t\nabla\log\pi(a_t|s_t;\theta).
$$

### Step 4 — Per-timestep return weighting
Substituting and taking the Monte Carlo average over N complete episodes produces the REINFORCE estimator
$$
\nabla J(\theta)\approx\frac1N\sum_{i=1}^N\sum_{t=0}^{T_i}G_t^{(i)}\nabla\log\pi(a_t^{(i)}|s_t^{(i)};\theta).
$$

### Step 5 — Stochastic gradient ascent
The parameter update is therefore
$$
\theta\leftarrow\theta+\alpha\frac1N\sum_{i=1}^N\sum_{t}G_t^{(i)}\nabla\log\pi(a_t^{(i)}|s_t^{(i)};\theta).
$$
This is the textbook statement of the REINFORCE algorithm.

## 5. Worked examples — every step shown

**Example 1 — Single-step bandit**  
*Given:* Two actions, π(left;θ)=σ(θ), return +1 for left and −1 for right.  
*Find:* ∇J(θ) at θ=0.  
Sample one episode: action = left, G=+1.  
Score-function term: ∇logπ(left)=1−σ(0)=0.5.  
Estimator: 1·0.5=0.5.  
**0.5**  
*Reflection:* The sign of G directly scales the gradient; a negative return would have produced a negative update.

**Example 2 — Two-step chain**  
*Given:* States s0→s1→terminal, deterministic transitions, actions a0,a1 each chosen with probability π(a|s;θ).  
*Find:* Contribution of the first action to the gradient when G=5.  
The return G multiplies ∇logπ(a0|s0) once; the second action contributes separately with the same G.  
**5∇logπ(a0|s0;θ)**  
*Reflection:* Every action inside an episode is credited with the identical full-episode return.

**Example 3 — Baseline subtraction**  
*Given:* Same episode as Example 2 but subtract a constant baseline b=2.  
The estimator becomes (G−b)∇logπ.  
**3∇logπ(a0|s0;θ)**  
*Reflection:* Subtracting any state-dependent baseline that does not depend on the action leaves the estimator unbiased while lowering variance.

**Example 4 — Multi-episode average**  
*Given:* Three independent episodes with returns 4, −2, 7 and corresponding summed score vectors g1,g2,g3.  
Estimator = (4g1−2g2+7g3)/3.  
**Average of the three weighted gradients**  
*Reflection:* Increasing the number of episodes reduces the variance of the Monte Carlo estimate without changing its expectation.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using per-step rewards instead of G_t | Confuses immediate reward with the quantity that actually appears in the policy-gradient theorem | Always accumulate the discounted return from each time step to episode end |
| Forgetting that the estimator is unbiased only for complete episodes | Early stopping or bootstrapping introduces bias | Run full episodes or switch to an actor-critic method that uses a learned value function |
| Treating the baseline as a function of action | Violates the proof that any state-dependent baseline preserves unbiasedness | Ensure baseline b(s) is independent of a |
| Ignoring the stochasticity of π when coding the gradient | Autodiff frameworks require explicit log-probability nodes | Always compute loss = −logπ(a|s;θ)·G and let the optimizer differentiate |
| Scaling learning rate by episode length | Length bias appears when longer episodes contribute more terms | Normalize by dividing the summed gradient by total steps across the batch |
| Applying the update after every step | Destroys the unbiased Monte Carlo property | Buffer all steps of an episode, then perform one update |
| Using a deterministic policy | logπ is undefined or its gradient is zero almost everywhere | Maintain a stochastic policy; add exploration noise explicitly if needed |

## 7. The textbook-precise statement
Let π(a|s;θ) be a differentiable stochastic policy, let p(s′|s,a) be the unknown transition kernel, and let R(τ)=∑_{t=0}^T γ^t r_{t+1} be the discounted return of trajectory τ. Define
$$
J(\theta)=\mathbb{E}_{\tau\sim p(\cdot;\theta)}[R(\tau)].
$$
Then
$$
\nabla J(\theta)=\mathbb{E}_{\tau\sim p(\cdot;\theta)}\Bigl[\sum_{t=0}^T\nabla_\theta\log\pi(a_t|s_t;\theta)G_t\Bigr],
$$
where G_t=∑_{k=t}^T γ^{k-t}r_{k+1}. The REINFORCE algorithm replaces the expectation by a sample average over complete episodes and performs stochastic gradient ascent. (Sutton & Barto, *Reinforcement Learning: An Introduction*, 2nd ed., §13.3.)

## 8. Visual — diagram or schematic
```text
Trajectory τ
s0 --a0--> s1 --a1--> s2 --a2--> ... --aT--> terminal
       ↑       ↑       ↑               ↑
     G0= r1+γr2+...   G1= r2+γr3+...   GT=rT+1
       │       │       │               │
       └───► multiply each by ∇logπ(at|st;θ) and average
```
The diagram shows that every action receives the same scalar multiplier G_t computed from its own onward return; the policy gradient is the average of these weighted score vectors.

## 9. The memory technique
1. **The hook** — Picture a marksman who only remembers the final score of each shooting session; after every session he slightly adjusts his stance in proportion to how well he scored and to how “surprising” each trigger pull felt under his current stance.  
2. **What to overlearn** — The update θ ← θ + α G ∇logπ and the fact that G is the return from the chosen action onward.  
3. **Spaced-repetition schedule** — Review the score-function identity at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the likelihood-ratio identity starting from ∇∑pR = ∑(∇p)R and rewriting ∇p = p∇logp.

## 10. What this unlocks
REINFORCE supplies the foundational unbiased gradient estimator that later algorithms refine. It directly enables the derivation of actor-critic methods, natural policy gradients, trust-region policy optimization (TRPO), and proximal policy optimization (PPO). In aerospace it also opens the door to guided policy search and model-based policy gradients that combine learned dynamics with the same score-function estimator.

- Next concept: Actor-critic architectures (value-function baseline)  
- Next theorem: Policy-gradient theorem with state-value function  
- Next technique: Natural gradient / Fisher-information preconditioning  
- Next application: Continuous-control torque policies for satellite reaction wheels

## 11. Self-check — five questions, no answers
1. Write the REINFORCE estimator for a deterministic environment with a single fixed starting state.  
2. Prove that subtracting any baseline b(s) that does not depend on a leaves the estimator unbiased.  
3. An episode yields returns [3, 1, −2]. Compute the three scalar multipliers that multiply the three ∇logπ terms when γ=0.9.  
4. Identify the precise line in the derivation where the Markov assumption is used and where it is not.  
5. Suppose you replace the Monte Carlo return G_t by the one-step TD error δ_t = r_{t+1}+γV(s_{t+1})−V(s_t). Does the resulting estimator remain unbiased for ∇J(θ)? Why or why not?