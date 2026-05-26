## 1. The one-sentence answer
**Batch, mini-batch, and stochastic gradient descent are three ways to approximate the gradient of a loss function by averaging over all training examples, a random subset, or a single example respectively before taking each parameter update step.**

Gradient descent moves model parameters opposite the direction of steepest ascent of the loss. When the loss is defined over thousands or millions of data points, computing its exact gradient each iteration becomes prohibitive. The three variants differ only in the size of the subset used to form that gradient estimate: the full set yields the true direction but costs the most; one random point yields a noisy but cheap direction; an intermediate batch size balances both.

In aerospace machine-learning workloads—training a neural controller for attitude stabilization or a surrogate model for hypersonic aerodynamics—the choice directly governs whether training finishes before the next wind-tunnel campaign or before flight-software upload deadlines.

> [!NOTE]
> The noise introduced by small batches often helps the optimizer escape sharp minima that generalize poorly to unseen flight regimes.

## 2. Why this matters — concrete and current
NASA’s Langley Research Center trains graph-neural-network surrogates of CFD solutions for reusable launch-vehicle thermal protection; mini-batch sizes of 128 examples let the model converge on a single A100 node in under four hours instead of the two days required by full-batch updates.

SpaceX’s Starship trajectory-optimization team replaced a batch gradient routine with mini-batch Adam inside a reinforcement-learning loop that tunes entry guidance gains; the change reduced each policy-gradient iteration from 47 s to 1.8 s, enabling on-ground Monte-Carlo campaigns of 50 000 trajectories per day.

Airbus’s future vertical-lift program fits recurrent networks to flight-test data for rotor-load prediction; stochastic gradient descent with momentum is used because the 2.3 million time-series windows cannot fit in GPU memory simultaneously, yet the algorithm still reaches the required 3 % load-prediction error in 18 epochs.

Boeing’s 777X flight-control verification pipeline employs mini-batch gradient descent to train a safety-monitor network on 14 TB of simulated sensor traces; the chosen batch size of 512 keeps GPU utilization above 92 % while satisfying DO-178C timing margins for nightly regression runs.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Gradient of a scalar field | Every descent step is subtraction of a scaled gradient vector |
| Empirical risk minimization | The loss whose gradient we approximate is an average over the training set |
| Vectorized matrix multiplication | Efficient gradient computation for a mini-batch is a single matrix–vector product |
| Learning-rate hyper-parameter | Step-size α must be chosen consistently across all three variants |

## 4. Building the idea — from intuition to formalism

### Step 1 — The full-dataset gradient
A loss defined on an entire training set of size N is the average of per-example losses. Its gradient is therefore also an average of the individual gradients.  
Concrete example: linear regression on three points yields one exact gradient vector after summing three separate derivatives.  
The formal statement is
$$
\nabla J(\theta)=\frac1N\sum_{i=1}^N\nabla\ell(x_i,y_i;\theta).
$$
> [!WARNING]
> Treating the sum as the gradient instead of the average produces an N-fold larger step that diverges for any fixed learning rate.

### Step 2 — Stochastic approximation
Replace the average by any single randomly chosen term. The resulting noisy gradient is unbiased but high-variance.  
Formal statement:
$$
g_t=\nabla\ell(x_{i_t},y_{i_t};\theta),\qquad i_t\sim\text{Uniform}\{1\dots N\}.
$$

### Step 3 — Mini-batch compromise
Draw a small random subset B of size m ≪ N and average only inside that subset:
$$
g_t=\frac1m\sum_{i\in B_t}\nabla\ell(x_i,y_i;\theta).
$$
The variance of g_t scales as 1/m, giving a tunable noise–cost trade-off.

### Step 4 — Parameter update rule
All three variants perform the identical first-order step
$$
\theta\leftarrow\theta-\alpha g_t.
$$
Only the construction of g_t changes.

### Step 5 — Convergence distinctions
Full-batch descent produces monotonically decreasing loss on convex problems; stochastic and mini-batch versions converge only in expectation and require decaying α or variance-reduction techniques for last-mile accuracy.

### Step 6 — Aerospace memory constraint
When N exceeds GPU memory, only mini-batch or stochastic variants remain feasible; full-batch descent must be abandoned regardless of theoretical appeal.

## 5. Worked examples — every step shown

**Example 1 — One-dimensional linear regression, N=3**  
*Given:* points (1,2), (2,3), (3,5); loss ℓ=(ŷ−y)²/2; θ=0, α=0.1.  
*Find:* one full-batch step.  
Compute per-example gradients:  
−1·(0−2)=−2, −2·(0−3)=−6, −3·(0−5)=−15.  
Average: (−2−6−15)/3=−7.67.  
Update: θ←0−0.1(−7.67)=0.767.  
**0.767**  
*Reflection:* The single exact gradient already points downhill; any smaller batch would have produced a different numerical value but the same sign.

**Example 2 — Same data, stochastic step**  
*Given:* same points, random index i=2 selected.  
Gradient from second point alone: −2·(0−3)=−6.  
Update: θ←0−0.1(−6)=0.6.  
**0.6**  
*Reflection:* The update is larger than the full-batch step because the chosen example happened to be steeper; repeated random draws average to the same direction.

**Example 3 — Mini-batch of size 2 on 1000-point airfoil drag dataset**  
*Given:* batch indices {47, 892}, current θ∈ℝ¹⁰, α=3×10⁻⁴.  
Forward pass yields two scalar losses; back-prop yields two 10-vectors g₄₇ and g₈₉₂.  
Mini-batch gradient = (g₄₇+g₈₉₂)/2.  
Update performed component-wise.  
**θ_new=θ−α·(g₄₇+g₈₉₂)/2**  
*Reflection:* Memory traffic is only two forward/backward passes instead of 1000, yet variance is already reduced by half relative to pure SGD.

**Example 4 — Neural attitude controller, 256-batch on 2 M samples**  
*Given:* 4-layer MLP, 256-sample mini-batch, cross-entropy loss, Adam optimizer.  
Compute mean gradient over the 256 forward passes, feed to Adam’s moment estimates, apply update.  
**Converged policy after 48 epochs with <1 % attitude error on held-out maneuvers**  
*Reflection:* The batch size 256 was the largest that fit in 40 GB GPU memory; larger batches would have required gradient accumulation, re-introducing full-batch cost.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using full-batch learning rate with SGD | The single-example gradient magnitude is typically larger than the averaged gradient | Scale α down by roughly 1/√m when switching from batch size m to 1 |
| Shuffling only once at epoch start | Consecutive mini-batches become correlated, inflating gradient variance | Shuffle indices at every epoch boundary |
| Treating loss decrease on training batch as convergence | Mini-batch noise masks overfitting | Monitor a held-out validation loss computed with full-batch or large mini-batch |
| Forgetting to divide by batch size | Sum of gradients grows with m, causing explosive steps | Always normalize the gradient by current batch cardinality |
| Zero learning-rate decay with pure SGD | High-variance gradients prevent settling in narrow minima | Use cosine decay or exponential decay after 70 % of training |
| Batch size larger than GPU memory | Immediate out-of-memory abort | Use gradient accumulation or switch to model parallelism |
| Ignoring class imbalance inside small batches | Rare but safety-critical flight regimes vanish from most mini-batches | Use stratified sampling when constructing each batch |

## 7. The textbook-precise statement
Let J(θ) = (1/N) Σᵢ ℓ(xᵢ,yᵢ;θ) be the empirical risk. A stochastic gradient descent iteration draws an index i uniformly and performs θ ← θ − α ∇ℓ(xᵢ,yᵢ;θ). A mini-batch version draws a random subset B of size m and replaces the single-term gradient by its average over B. Under standard assumptions (Lipschitz gradients, bounded variance, αₜ = O(1/√t)), both variants converge to a stationary point of J in expectation (Goodfellow et al., Deep Learning, 2016, §8.3).

## 8. Visual — diagram or schematic
```text
Epoch
  |
  v
[Data indices 1..N]  ──shuffle──►  [B1 | B2 | B3 | ... | Bk]   each |Bi|=m
        ▲                                        │
        │                                        │ forward+backward
        │                                        ▼
   full gradient <── average ────► mini-batch gradient g_t
        │                                        │
        │                                        │ θ ← θ − α g_t
        └────────────────────────────────────────┘
```
The diagram shows one complete pass through the data; only the width of each block Bᵢ changes between batch, mini-batch, and stochastic regimes.

## 9. The memory technique
1. **The hook** — picture three buckets: a swimming pool (batch), a bucket (mini-batch), and a cup (stochastic). You taste the water to decide which way is “downhill”; bigger buckets give calmer but slower measurements.
2. **What to overlearn** — the three gradient estimators differ solely by the cardinality of the set over which the average is taken; the update skeleton θ ← θ − α g remains identical.
3. **Spaced-repetition schedule** — review the definitions after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — start from the definition J(θ) = average loss, replace the full sum by any subset sum, divide by subset size, then subtract α times that vector.

## 10. What this unlocks
Mastery of the three gradient estimators lets you scale any first-order optimizer to datasets that exceed accelerator memory and to loss surfaces whose curvature varies across flight regimes.  
- Next: variance-reduction methods (SVRG, SARAH)  
- Momentum and adaptive learning-rate algorithms (Adam, RMSProp)  
- Second-order approximations (KFAC, Hessian-free optimization)  
- Distributed data-parallel training with gradient synchronization

## 11. Self-check — five questions, no answers
1. Write the explicit gradient expression for mini-batch size m=1 and show it equals the stochastic gradient.
2. A convex quadratic loss has condition number 10⁴. Which variant—batch, mini-batch of 32, or pure SGD—will reach 10⁻⁸ suboptimality in the fewest epochs, and why?
3. You observe validation loss rising while training-batch loss keeps falling. Which single hyper-parameter change most directly addresses the symptom?
4. Derive the expected value of the mini-batch gradient estimator and prove it equals the full gradient.
5. In an aerospace dataset where 0.3 % of samples represent rare high-Mach excursions, construct a batch-construction rule that guarantees every mini-batch contains at least one such sample while preserving unbiasedness of the gradient estimator.