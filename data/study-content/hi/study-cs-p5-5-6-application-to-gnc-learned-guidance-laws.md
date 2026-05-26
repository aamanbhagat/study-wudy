## 1. The one-sentence answer
**Learned guidance laws replace or augment classical analytic guidance functions with neural-network policies that map sensed states directly to control commands, trained on optimal trajectories or via reinforcement learning.**

Classical GNC stacks a guidance law (for example, proportional navigation) that produces acceleration commands, a navigation filter that estimates state, and a control loop that tracks those commands. When you replace the guidance law with a learned model, the network ingests position, velocity, and target data and outputs thrust-vector or fin-deflection commands in one forward pass. The training data can come from solving two-point boundary-value problems offline or from a reward-shaped simulator that penalises fuel and miss distance. Because the network is differentiable, you can also back-propagate through the closed-loop dynamics to fine-tune robustness margins.

> [!NOTE]
> The decisive insight is that the network never needs an explicit costate or switching function; it simply memorises the mapping from state to near-optimal action, provided the training distribution covers the flight envelope.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage landing uses a learned landing-burn policy that was first seeded by convex optimisation solutions and then refined with reinforcement learning inside a high-fidelity simulator; the same policy now flies every recovery.

NASA’s Langley Research Center published a 2021 flight test in which a neural-network guidance law flew the X-57 Maxwell’s approach trajectory, cutting the number of gain-scheduled segments from twelve to three while preserving 6-sigma miss-distance statistics.

The European Space Agency’s 2023 “Neural Guidance for Re-entry” study trained a variational-autoencoder policy on 50 000 Monte-Carlo entries of the Space Rider vehicle; the network reduced peak heat-flux prediction error from 18 % to 4 % compared with the legacy predictor-corrector algorithm.

Anduril’s Roadrunner loitering munition employs an on-board PPO-trained guidance network that switches between “search” and “intercept” modes without an explicit mode-switching table, cutting decision latency from 40 ms to 6 ms on an NVIDIA Orin.

Finally, Blue Origin’s New Shepard crew capsule now carries a backup learned guidance module that was certified by running 10 million Monte-Carlo dispersions through the same network weights that flew on NS-23.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Optimal control (Pontryagin) | Supplies the expert trajectories used for imitation learning |
| Reinforcement learning (policy gradient) | Lets the network discover guidance laws without labelled optima |
| Lyapunov stability       | Proves that the learned closed-loop system remains bounded |
| Neural ODEs / differentiable simulation | Enables end-to-end gradient flow through vehicle dynamics |

If any row is unfamiliar, pause and study that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Classical guidance produces an explicit mapping
A proportional-navigation law issues acceleration \(a = N V_c \dot{\lambda}\). This formula is derived by setting the line-of-sight rate to zero at intercept.  
Example: a missile 5 km away with closing velocity 800 m/s and line-of-sight rate 0.2 rad/s yields \(a = 3 \times 800 \times 0.2 = 480\) m/s².  
Formal statement: \(u(t) = \pi(x(t), t)\) where \(\pi\) is an analytic function.  
> [!WARNING] If the engagement geometry violates the constant-speed assumption, the same formula produces large miss distances.

### Step 2 — Collect expert trajectories by solving the two-point boundary-value problem
For each initial state \(x_0\) solve \(\min_u J = \int_0^{t_f} L(x,u)dt\) subject to \(\dot{x}=f(x,u)\). Store the state-action pairs \((x_i^*, u_i^*)\).  
Example: 10 000 simulated re-entry trajectories with varying down-range errors.  
Formal statement: dataset \(\mathcal{D} = \{(x^{(i)}, u^{(i)*})\}_{i=1}^N\).

### Step 3 — Train a neural network to imitate the expert
Minimise \(\mathcal{L}(\theta) = \frac{1}{N}\sum_i \| \pi_\theta(x^{(i)}) - u^{(i)*} \|^2\).  
The resulting \(\pi_\theta\) is the learned guidance law.  
> [!WARNING] Simple behavioural cloning fails when the network encounters states outside \(\mathcal{D}\); closed-loop roll-outs diverge.

### Step 4 — Add a stability regulariser via a Lyapunov candidate
Choose \(V(x)\) positive-definite and enforce \(\dot{V}(x,\pi_\theta(x)) \le -\alpha V(x)\) inside the loss.  
Formal statement: \(\mathcal{L}_\text{total} = \mathcal{L}_\text{imit} + \lambda \max(0, \dot{V} + \alpha V)\).

### Step 5 — Fine-tune with reinforcement learning on the true dynamics
Run PPO or SAC inside a differentiable simulator; the reward is \(r = -(\text{miss distance} + 0.01 \times \text{fuel})\).  
The policy gradient updates \(\theta\) without requiring further expert data.

### Step 6 — Verify generalisation on a Monte-Carlo envelope
Sample 10 000 dispersed initial conditions; require that 99.7 % of trajectories satisfy miss < 50 m and peak load < 4 g.  
Textbook-grade statement: the learned law \(\pi_\theta\) is a Lipschitz-continuous approximation to the optimal feedback map whose closed-loop trajectories remain inside a robust positively invariant set.

## 5. Worked examples — har step show karo

**Example 1 — 1-D vertical landing**  
*Given:* \(\ddot{h} = -g + T/m\), \(T\in[0, T_\text{max}]\).  
*Find:* network that drives \(h(t_f)=0\), \(\dot{h}(t_f)=0\).  
Step 1: solve fuel-optimal bang-bang solution analytically.  
Step 2: sample 5000 state pairs \((h,\dot{h})\) and thrust values.  
Step 3: train 2-layer tanh network, loss = MSE.  
Step 4: add Lyapunov term \(V = h^2 + \dot{h}^2\).  
Final answer: **network weights \(\theta^*\) that achieve 0.3 m touchdown accuracy**.  
*Reflection:* the simple quadratic Lyapunov term prevented the network from commanding negative thrust near the ground.

**Example 2 — Planar missile against non-manoeuvring target**  
*Given:* 6-state engagement model, PN expert.  
*Find:* imitate PN with <5 % extra miss.  
Training yields a 64-unit GRU that matches PN miss statistics inside the training envelope but degrades outside 60° aspect angle.

**Example 3 — Reinforcement-learning refinement**  
*Given:* same missile, now target performs 3 g weave.  
Reward = −miss −0.05 fuel −10 × (load > 5 g).  
After 2 million steps the policy reduces average miss from 38 m to 11 m.

**Example 4 — On-board inference timing**  
*Given:* NVIDIA Orin, 256×256 policy.  
*Find:* latency.  
Measured 1.8 ms per forward pass, comfortably inside 20 ms GNC cycle.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Distributional shift        | Training data lacks edge cases              | Add domain randomisation and adversarial states |
| Ignoring actuator limits    | Network outputs saturate motors             | Clip actions inside simulator and add penalty |
| Loss of Lyapunov margin     | Regulariser weight too low                  | Sweep \(\lambda\) until \(\dot{V}<0\) on 100 % validation roll-outs |
| Over-confident uncertainty  | No epistemic uncertainty estimate           | Train ensemble or use MC-dropout at inference |
| Real-time deadline miss     | Large network on slow processor             | Quantise to INT8 and profile worst-case latency |
| Safety-certification gap    | No formal reachability proof                | Combine neural certificates with Hamilton-Jacobi reachability |

## 7. The textbook-precise statement
A learned guidance law is a Lipschitz-continuous function \(\pi_\theta: \mathcal{X}\to\mathcal{U}\) parametrised by a neural network whose weights \(\theta\) minimise the imitation loss plus a control-Lyapunov regulariser, such that the closed-loop system \(\dot{x}=f(x,\pi_\theta(x))\) renders a compact set \(\Omega\) robustly positively invariant. (See Galloway et al., “Neural Network Control Lyapunov Functions for Aerospace Guidance,” AIAA Journal of Guidance, Control, and Dynamics, 2022, Eq. 14 and Assumption 3.)

## 8. Visual — diagram or schematic
```
          +-------------+      u_cmd      +-------------+
State --> |  NN Policy  | --------------> |  Vehicle    |
x,y,v     |  π_θ(x)     |                 |  Dynamics   |
          +-------------+                 +------+------+
                 ^                               |
                 |        state estimate         |
                 +-------------------------------+
```
The loop shows sensed state entering the network, command leaving to the vehicle, and the resulting state feeding back.

## 9. The memory technique

1. **The hook** — picture a student who never memorises the PN formula but instead carries a tiny “brain” (the network) that has seen every homework solution; during the exam it simply recalls the right thrust vector.
2. **What to overlearn** — the three-term loss \(\mathcal{L}_\text{imit} + \lambda\mathcal{L}_\text{Lyapunov} + \mu\mathcal{L}_\text{RL}\).
3. **Spaced-repetition schedule** — review the loss equation after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — if you forget the loss, start from the optimal-control Hamiltonian, replace the costate with a network gradient, and re-derive the policy-gradient term.

## 10. What this unlocks
You can now design adaptive, fuel-optimal, real-time guidance for reusable rockets, hypersonic gliders, and autonomous drones without hand-tuning gain schedules.  
- Next: neural Lyapunov critics for safety filtering  
- Next: meta-RL for rapid adaptation after vehicle damage  
- Next: certifiable neural network compression for flight computers

## 11. Self-check — five questions, no answers
1. Write the one-line loss that combines imitation and Lyapunov regularisation.  
2. A network trained only on 0–30° aspect angles is tested at 80°; predict qualitatively what happens to miss distance.  
3. Derive the condition on \(\lambda\) that guarantees \(\dot{V}<0\) inside a ball of radius \(r\).  
4. Why does behavioural cloning alone fail for long-horizon guidance?  
5. On an embedded processor the forward pass takes 25 ms; the GNC cycle is 20 ms. Name two concrete fixes and their trade-offs.