## 1. The one-sentence answer
**Stochastic Gradient Descent (SGD), Momentum, and Adam are first-order iterative methods that locate a local minimum of a differentiable loss by repeatedly subtracting a suitably scaled estimate of the gradient.**

Gradient descent begins with the observation that the direction of steepest descent of a smooth function is the negative of its gradient. When the loss is an average over many data points, computing the full gradient at every step is expensive; SGD replaces that average with a single randomly chosen term, producing an unbiased but noisy direction. Momentum augments this update with an exponentially decaying average of past gradients, effectively adding inertia that damns oscillations and accelerates motion along consistent directions. Adam further normalizes each coordinate by an exponentially decaying average of squared gradients, yielding an adaptive per-parameter learning rate while retaining the momentum effect.

The resulting recurrence relations are obtained by expanding the definitions of these running averages and substituting them into the basic gradient step. All three algorithms therefore share the same first-order information yet differ only in how they accumulate and rescale that information.

> [!NOTE]
> The decisive insight is that the only information available at each iteration is a noisy linear approximation to the loss; everything else—momentum buffers, second-moment estimates—is bookkeeping that reuses past linear approximations to reduce variance or rescale steps without ever forming a Hessian.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover uses a neural-network terrain classifier trained with Adam to select safe landing sites from monocular images; the optimizer must converge reliably on embedded hardware with only a few thousand labeled Mars images.

SpaceX trains recurrent networks that predict residual aerodynamic forces on Falcon 9 stages; the loss surface is non-convex and high-dimensional, and Adam’s adaptive scaling prevents coordinate-wise gradient explosion that would otherwise stall training after the first few epochs.

Airbus employs physics-informed neural networks to surrogate Reynolds-averaged Navier–Stokes solutions around wing sections; the training loop runs thousands of Adam steps per design iteration, and the momentum term is essential to traverse the flat regions that appear when the network learns conservation laws.

The European Space Agency’s Φ-sat-1 satellite runs on-board cloud-detection models updated via federated SGD; communication constraints force the use of single-example gradient estimates, making the stochastic formulation indispensable.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Gradient of a scalar function | Supplies the first-order direction of descent             |
| Expectation and unbiased estimator | Justifies replacing the full-batch gradient by a single sample |
| Exponential moving average | Defines the momentum and second-moment buffers            |
| Chain rule for back-propagation | Computes the gradient that SGD/Momentum/Adam consume      |

## 4. Building the idea — from intuition to formalism

### Step 1 — Direction of steepest descent
A differentiable loss \(L(\theta)\) decreases most rapidly when we move opposite its gradient.  
Concrete example: \(L(\theta)=\frac12\theta^2\) has \(\nabla L=\theta\); stepping to \(\theta\leftarrow\theta-\eta\theta\) shrinks \(|\theta|\).  
Formal statement:
\[
\theta_{t+1}=\theta_t-\eta\nabla L(\theta_t).
\]
> [!WARNING]
> If the step size \(\eta\) exceeds \(2/L\) where \(L\) is the Lipschitz constant of the gradient, the iteration diverges even on a convex quadratic.

### Step 2 — Stochastic approximation
When \(L(\theta)=\mathbb{E}_{x\sim\mathcal{D}}[\ell(\theta;x)]\), the full gradient is replaced by an unbiased sample:
\[
g_t=\nabla_\theta\ell(\theta_t;x_t),\qquad\mathbb{E}[g_t]=\nabla L(\theta_t).
\]
The update becomes
\[
\theta_{t+1}=\theta_t-\eta g_t.
\]

### Step 3 — Momentum as exponentially weighted velocity
Define a velocity vector that blends the current gradient with the previous velocity:
\[
v_t=\beta v_{t-1}+(1-\beta)g_t.
\]
The parameter update uses velocity instead of raw gradient:
\[
\theta_{t+1}=\theta_t-\eta v_t.
\]
This is equivalent to a low-pass filter on the gradient sequence.

### Step 4 — Bias correction for constant initialization
If \(v_0=0\), the early estimates are biased toward zero. The corrected velocity is
\[
\hat v_t=\frac{v_t}{1-\beta^t}.
\]

### Step 5 — Adaptive scaling via second-moment estimate
Adam maintains an additional buffer of squared gradients:
\[
s_t=\beta_2 s_{t-1}+(1-\beta_2)g_t^2,\qquad\hat s_t=\frac{s_t}{1-\beta_2^t}.
\]
The coordinate-wise step size is then \(\eta/(\sqrt{\hat s_t}+\epsilon)\), yielding the Adam update
\[
\theta_{t+1}=\theta_t-\frac{\eta}{\sqrt{\hat s_t}+\epsilon}\hat v_t.
\]

### Step 6 — Textbook statement
Under standard assumptions (unbiased gradients with bounded variance, \(\beta_1,\beta_2\in[0,1)\), \(\eta>0\) sufficiently small), the Adam iteration converges to a stationary point of a smooth non-convex loss; the proof follows by showing that the expected squared gradient norm vanishes (Kingma & Ba, ICLR 2015).

## 5. Worked examples — every step shown

**Example 1 — Plain SGD on a quadratic**  
*Given:* \(L(\theta)=\frac12\theta^2\), single sample gradient \(g_t=\theta_t\).  
*Find:* \(\theta_1\) after one step with \(\eta=0.5\), \(\theta_0=2\).  
Step 1: compute gradient \(g_0=2\). *Why:* definition of derivative.  
Step 2: \(\theta_1=2-0.5\cdot2=1\). *Why:* SGD update rule.  
**\(\theta_1=1\)**

*Reflection:* The example isolates the effect of step size; any larger \(\eta\) would overshoot the minimum.

**Example 2 — Momentum on the same quadratic**  
*Given:* \(\beta=0.9\), \(\eta=0.5\), \(\theta_0=2\), \(v_0=0\).  
Step 1: \(g_0=2\).  
Step 2: \(v_1=0.9\cdot0+(1-0.9)\cdot2=0.2\).  
Step 3: \(\theta_1=2-0.5\cdot0.2=1.9\).  
**\(\theta_1=1.9\)**

*Reflection:* Momentum produces a smaller first step, illustrating the smoothing effect.

**Example 3 — Bias-corrected momentum**  
*Given:* same values, now at iteration \(t=2\).  
After computing \(v_2=0.9\cdot0.2+0.1\cdot g_2\), divide by \(1-0.9^2\).  
**Corrected velocity \(\hat v_2=v_2/0.19\)**

*Reflection:* Shows why early training would otherwise be crippled by initialization bias.

**Example 4 — Full Adam step**  
*Given:* \(g_t=[0.1,0.4]\), \(\beta_1=0.9\), \(\beta_2=0.999\), \(\eta=0.001\), \(v_{t-1}=[0,0]\), \(s_{t-1}=[0,0]\), \(t=1\).  
Compute \(v_t\), \(s_t\), bias-correct, then apply coordinate-wise scaling.  
**Final update \(\Delta\theta\approx[-0.001, -0.001]\)** (approximately, after normalization).

*Reflection:* Demonstrates per-coordinate adaptation; the larger gradient component receives a relatively smaller effective step.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using raw gradient without bias correction | Early moving averages start at zero         | Always apply \(\hat v_t=v_t/(1-\beta_1^t)\)  |
| Setting \(\beta_2=0.999\) with tiny batches | Second-moment estimate becomes noisy        | Increase batch size or lower \(\beta_2\)     |
| Learning-rate too large for Adam  | Adaptive denominator can still explode      | Grid-search \(\eta\) on a log scale          |
| Forgetting \(\epsilon\) in denominator | Division by zero when gradient is exactly zero | Keep \(\epsilon=10^{-8}\)                    |
| Treating momentum as “just another hyper-parameter” | Velocity couples consecutive steps          | Tune \(\beta\) jointly with \(\eta\)         |
| Assuming SGD with momentum equals Nesterov | Different gradient evaluation point         | Verify implementation against original paper |
| Ignoring gradient clipping before Adam | Heavy-tailed gradients corrupt moment estimates | Clip to \(\|\,g\,\|_2\le C\) before buffers  |

## 7. The textbook-precise statement
Let \(L:\mathbb{R}^d\to\mathbb{R}\) be \(L\)-smooth and bounded below. Let \(g_t\) be an unbiased estimator of \(\nabla L(\theta_t)\) with bounded variance. The Adam iteration with parameters \(0\le\beta_1<\beta_2<1\), \(\eta>0\), \(\epsilon>0\) is
\[
\begin{align*}
v_t&=\beta_1 v_{t-1}+(1-\beta_1)g_t,\\
s_t&=\beta_2 s_{t-1}+(1-\beta_2)g_t^2,\\
\theta_{t+1}&=\theta_t-\eta\frac{v_t/(1-\beta_1^t)}{\sqrt{s_t/(1-\beta_2^t)}+\epsilon}.
\end{align*}
\]
Under the above assumptions the sequence satisfies \(\liminf_{t\to\infty}\mathbb{E}[\|\nabla L(\theta_t)\|^2]=0\) (Kingma & Ba, “Adam: A Method for Stochastic Optimization,” ICLR 2015).

## 8. Visual — diagram or schematic
```text
Loss surface (1-D slice)
          ^
          |               *  <- Adam step lands here
          |            *     (adaptive step shrinks)
          |         *        (momentum carries past flat)
          |      *           (SGD zig-zags)
          |   *              (raw gradient points down)
          +------------------------>
               theta
Legend:
- Raw gradient: steep arrow
- Momentum: smoothed arrow continuing past curvature change
- Adam: arrow length scaled by 1/sqrt(second moment)
```

## 9. The memory technique
1. **The hook** — picture a hockey puck sliding on ice whose friction decreases when the surface has been traversed often (second-moment memory); the puck’s velocity is momentum.
2. **What to overlearn** — the three coupled recurrences for \(v_t\), \(s_t\) and the bias-corrected Adam step; the values \(\beta_1=0.9\), \(\beta_2=0.999\), \(\epsilon=10^{-8}\).
3. **Spaced-repetition schedule** — review derivations at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — start from the definition of an exponentially weighted moving average, impose unbiasedness by dividing by the sum of the geometric series, then substitute into the basic gradient step.

## 10. What this unlocks
Mastery of these derivations lets you read any modern optimizer paper and implement variants (AMSGrad, AdamW, Lion) without guesswork.  
- Next: second-order methods (KFAC, Shampoo) that maintain curvature estimates.  
- Next: learning-rate schedules derived from regret bounds (AdaGrad, cosine decay).  
- Next: distributed training analyses that quantify how momentum interacts with gradient compression.

## 11. Self-check — five questions, no answers
1. Derive the bias-correction factor \(1-\beta^t\) from the closed-form sum of a geometric series.  
2. Show that plain SGD with constant step size on a quadratic can oscillate when \(\eta>2/L\).  
3. Compute the effective step size of Adam in a coordinate whose gradient is constant versus one whose gradient alternates in sign.  
4. Explain why increasing batch size interacts differently with momentum than with the second-moment buffer.  
5. Identify the hidden assumption in the convergence proof that fails when gradients are heavy-tailed, and propose a practical mitigation.