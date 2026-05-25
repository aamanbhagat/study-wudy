## What it is
Optimization algorithms are the methods used to train machine learning models by iteratively adjusting their parameters (e.g., weights $\theta$) to minimize a loss function $J(\theta)$. Stochastic Gradient Descent (SGD) does this by taking small steps opposite to the gradient calculated on a small, random sample of data. Momentum improves on SGD by adding inertia, smoothing the updates, while Adam further enhances this by adapting the learning rate for each individual parameter.

## Why it matters
These algorithms are the workhorses of deep learning and are essential for training models in aerospace engineering. For instance, in training a neural network for autonomous spacecraft docking, the optimizer must navigate a high-dimensional, non-convex loss landscape to find parameters that ensure a safe and efficient maneuver. A well-chosen optimizer like Adam can find a solution in hours, whereas a simpler one like SGD might get stuck or take days, a critical difference when iterating on guidance, navigation, and control (GNC) systems.

## When to study it
Before tackling these derivations, you must have a solid grasp of the following prerequisites. If any are weak, review them first.
*   **Multivariable Calculus**: You must understand what a gradient ($\nabla J(\theta)$) is and how it represents the direction of steepest ascent. Partial derivatives are non-negotiable.
*   **Linear Algebra**: Comfort with vector addition, scalar multiplication, and element-wise operations is assumed.
*   **Core Machine Learning Concepts**: You should know what a loss function, model parameters, and the basic "vanilla" gradient descent algorithm are.

## How to study it (step by step)
1.  **Re-derive Vanilla Gradient Descent.** Start with a loss function $J(\theta)$ and Taylor-expand it around $\theta_t$. Show that to achieve $J(\theta_{t+1}) < J(\theta_t)$, the update step $\Delta \theta$ should be in the direction of $-\nabla J(\theta_t)$. This justifies the update rule: $\theta_{t+1} = \theta_t - \eta \nabla J(\theta_t)$.
2.  **Introduce Stochasticity.** Replace the full gradient $\nabla J(\theta_t) = \frac{1}{N}\sum_{i=1}^N \nabla J_i(\theta_t)$ with an estimate from a single sample or mini-batch, $g_t = \nabla J_i(\theta_t)$. Explain why this is a noisy but unbiased estimator of the true gradient, and why the speedup is essential for large datasets.
3.  **Derive Momentum.** State the problem: SGD oscillates in ravines. Propose a solution: average past gradients to smooth the path. Formulate this as an exponentially weighted moving average of gradients, which we call momentum $m_t$. Derive its update rule: $m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t$. The parameter update then becomes $\theta_{t+1} = \theta_t - \eta m_t$.
4.  **Derive the Adaptive Component (RMSProp).** State a new problem: different parameters might need different learning rates. Propose a solution: divide the learning rate by a measure of the recent magnitude of gradients for that parameter. Formulate this as an exponentially weighted moving average of *squared* gradients, $v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2$. The update would look like $\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{v_t}+\epsilon} g_t$.
5.  **Combine Momentum and RMSProp to get Adam.** Merge the two ideas. Use the momentum term $m_t$ as the numerator (the direction and magnitude of the step) and the adaptive term $\sqrt{v_t}$ as the per-parameter denominator (the scaling factor). This gives the core of Adam.
6.  **Derive the Bias Correction.** Show that because $m_0$ and $v_0$ are initialized to zero, the early estimates $m_t$ and $v_t$ are biased towards zero. Calculate the expected value of $m_t$ and show how dividing by $(1-\beta_1^t)$ corrects this bias. Do the same for $v_t$. This final step yields the complete Adam algorithm.

## Key ideas, with intuition
*   **Stochastic Gradient Descent (SGD): A Drunkard's Walk Downhill.**
    The true gradient requires summing over all data points—a slow process. SGD approximates this by using a tiny "mini-batch" of data. This makes each step fast but noisy. The path to the minimum is not direct but a random, zigzagging walk that, on average, heads in the right direction.
    $$ \theta_{t+1} = \theta_t - \eta \nabla_{\theta} J(\theta_t; x^{(i:i+B)}, y^{(i:i+B)}) $$
    Here, $B$ is the mini-batch size.

*   **Momentum: A Heavy Ball Rolling Downhill.**
    SGD struggles in long, narrow valleys (ravines), oscillating back and forth across the steep sides instead of making progress along the valley floor. Momentum adds inertia by computing an exponentially weighted moving average of past gradients. This average cancels out the oscillations and builds up speed in the consistent downhill direction.
    $$ m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t $$
    $$ \theta_{t+1} = \theta_t - \eta m_t $$
    The term $m_t$ is the "velocity" of our ball. $\beta_1$ is a friction-like coefficient, typically close to 1 (e.g., 0.9).

*   **Adam: An Adaptive Ball with Per-Direction Brakes.**
    Adam (Adaptive Moment Estimation) combines the idea of momentum with an adaptive, per-parameter learning rate. It maintains a second moving average, $v_t$, of the *squared* gradients. This term approximates the variance of the gradients for each parameter. The parameter update is then scaled inversely by the square root of this variance.
    $$ m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t \quad \text{(Momentum - 1st moment)}$$
    $$ v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2 \quad \text{(Uncentered Variance - 2nd moment)}$$
    The update divides the momentum $m_t$ by $\sqrt{v_t}$. This means if a parameter's gradient is consistently large (high variance), the effective learning rate for it is reduced. If its gradient is small or sparse, its effective learning rate is increased. This prevents overshooting on steep axes and allows faster progress on flatter ones.

*   **Bias Correction: A Necessary Warm-up.**
    Since the moment estimates $m_t$ and $v_t$ are initialized at 0, they are biased towards zero, especially during the first few steps. Adam corrects for this by dividing them by a factor that approaches 1 as time $t$ increases.
    $$ \hat{m}_t = \frac{m_t}{1 - \beta_1^t}, \quad \hat{v}_t = \frac{v_t}{1 - \beta_2^t} $$
    $$ \theta_{t+1} = \theta_t - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon} $$
    This correction gives a better estimate of the moments at the beginning of training.

## Worked example
Let's optimize the simple loss function $J(\theta) = 5\theta^2$, starting at $\theta_0 = 4$. The true minimum is at $\theta=0$. The gradient is $\nabla J(\theta) = 10\theta$.
We will perform one update step using Adam.
*   **Hyperparameters**: $\eta=0.1$, $\beta_1=0.9$, $\beta_2=0.999$, $\epsilon=10^{-8}$.
*   **Initial state**: $t=1$, $\theta_0=4$, $m_0=0$, $v_0=0$.

**Step 1: Compute the gradient at the current position.**
$$ g_1 = \nabla J(\theta_0) = 10 \times 4 = 40 $$

**Step 2: Update the first moment estimate (momentum).**
$$ m_1 = \beta_1 m_0 + (1-\beta_1) g_1 = (0.9)(0) + (0.1)(40) = 4 $$

**Step 3: Update the second moment estimate (uncentered variance).**
$$ v_1 = \beta_2 v_0 + (1-\beta_2) g_1^2 = (0.999)(0) + (0.001)(40^2) = 0.001 \times 1600 = 1.6 $$

**Step 4: Compute the bias-corrected moment estimates.**
The correction factor for $m_1$ is $1 - \beta_1^1 = 1 - 0.9 = 0.1$.
$$ \hat{m}_1 = \frac{m_1}{1 - \beta_1^1} = \frac{4}{0.1} = 40 $$
The correction factor for $v_1$ is $1 - \beta_2^1 = 1 - 0.999 = 0.001$.
$$ \hat{v}_1 = \frac{v_1}{1 - \beta_2^1} = \frac{1.6}{0.001} = 1600 $$

**Step 5: Perform the final parameter update.**
$$ \theta_1 = \theta_0 - \eta \frac{\hat{m}_1}{\sqrt{\hat{v}_1} + \epsilon} = 4 - 0.1 \times \frac{40}{\sqrt{1600} + 10^{-8}} $$
$$ \theta_1 = 4 - 0.1 \times \frac{40}{40} = 4 - 0.1 \times 1 = 3.9 $$

**Reflection:**
*   Step 1 found the direction of steepest ascent.
*   Steps 2 & 3 updated our memory of the average gradient and its squared value.
*   Step 4 corrected these memories for their initial zero-bias. Notice $\hat{m}_1$ equals the true gradient $g_1$, which makes sense on the first step.
*   Step 5 used these memories to take a scaled step. The adaptive part $\frac{\eta}{\sqrt{\hat{v}_1}} = \frac{0.1}{40} = 0.0025$ created a very small effective learning rate, resulting in a cautious step from 4.0 to 3.9.

## Diagrams
Here is a depiction of how SGD and Momentum behave in a narrow ravine-like loss function.

```text
       w2 ^
          |
          |   (Start)
          |     X
          |    / \
          |   /   \   <-- SGD path (large oscillations)
          |  /     \
          | /       \
          |/         \
          +-----------#------> w1
         / \         /
        /   \       /
       /     \     /
      /       \   /
     V         \ /
 (Minimum)      V

       w2 ^
          |
          |   (Start)
          |     X
          |      \
          |       \  <-- Momentum path (dampened oscillations,
          |        \      faster progress along the valley)
          |         \
          |          \
          +-----------#------> w1
         /             \
        /               \
       /                 \
      V                   V
 (Minimum)
```

## Memory technique — remember this forever
1.  **The Story: The Blind Hiker in an Exoskeleton.**
    *   **SGD**: You are a blind hiker. You feel the slope at your feet ($g_t$) and take a small step downhill. Your path is erratic because you only have local information.
    *   **Momentum**: You are now in a heavy, motorized ball ($m_t$). It builds inertia, smoothing out your path and helping you roll through flat spots. $\beta_1$ is the 'coast' factor.
    *   **Adam**: You upgrade to a smart exoskeleton. It has the momentum ball ($m_t$), but also pressure sensors under each foot ($v_t$). On very steep, rocky terrain (high $v_t$), it shortens your stride to be careful. On flat, even ground (low $v_t$), it lengthens your stride to cover more ground. The bias correction is the suit's boot-up calibration sequence.

2.  **Formulas to Overlearn:**
    *   **Momentum update**: $m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t$
    *   **Adam parameter update**: $\theta_{t+1} = \theta_t - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}$
    *   **Bias correction (general form)**: $\hat{x}_t = \frac{x_t}{1 - \beta^t}$

3.  **Spaced Repetition Schedule:**
    Review the story and these three formulas at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Actively write them out from memory each time.

4.  **First Principles Pathway:**
    If you forget everything, rebuild it.
    *   Start with Gradient Descent: $\theta_{t+1} = \theta_t - \eta g_t$.
    *   Problem: Noisy gradients. Solution: Smooth them with an exponential moving average. This gives you **Momentum**.
    *   Problem: Same learning rate for all parameters is suboptimal. Solution: Normalize the update for each parameter by its historical magnitude. This gives you the adaptive part ($\sqrt{v_t}$).
    *   Combine both ideas to get **Adam**.
    *   Problem: Initial estimates are biased to zero. Solution: Analyze the expected value and derive the **bias correction** term.

## Common mistakes
*   **Forgetting the Bias Correction.** In an exam or implementation, omitting the $\hat{m}_t = m_t / (1-\beta_1^t)$ and $\hat{v}_t = v_t / (1-\beta_2^t)$ steps. This makes the initial steps of the optimizer far too small and hinders convergence.
*   **Element-wise Operations.** Forgetting that the operations in Adam's update—the square in $g_t^2$, the square root, and the division—are all performed element-wise on the vectors.
*   **Numerical Instability.** Setting the small constant $\epsilon$ to zero. If any element of $\hat{v}_t$ becomes zero, this will cause a division-by-zero error. Its purpose is purely for numerical stability.
*   **Misinterpreting Adam's "Learning Rate".** Thinking that $\eta$ in Adam is the "true" learning rate. The effective learning rate is actually $\eta / (\sqrt{\hat{v}_t} + \epsilon)$, which changes for every parameter at every timestep.

## Self-check
1.  You are using Adam to train a model. After many iterations, you notice that for a specific weight $\theta_i$, the gradient $g_i$ is consistently very close to zero. What will the effective learning rate for this parameter look like, and how will its value $\theta_i$ change over time?
2.  Derive the bias correction for $m_t$. Assume the gradient $g_t$ is drawn from a stationary distribution with true mean $E[g]$. Show that $E[m_t]$ is biased and that $E[\hat{m}_t]$ is an unbiased estimator of $E[g]$.
3.  Suppose you set $\beta_2 \to 1$ in the Adam algorithm. What does the term $\sqrt{\hat{v}_t}$ now represent, and how does the algorithm's behavior change? Compare it to another known optimization algorithm.