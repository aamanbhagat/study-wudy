## What it is
Batch, mini-batch, and stochastic gradient descent are three variants of the gradient descent optimization algorithm. They differ only in the amount of data used to compute the gradient of the loss function at each step. Batch uses the entire dataset, stochastic uses a single data point, and mini-batch uses a small, random subset of the data.

## Why it matters
In aerospace, you train models on massive datasets from simulations (e.g., computational fluid dynamics) or sensors (e.g., engine telemetry). Batch gradient descent is computationally infeasible for such datasets. Mini-batch gradient descent is the de-facto standard for training deep neural networks for tasks like autonomous spacecraft navigation, real-time trajectory optimization, or predictive maintenance, as it balances computational efficiency with stable convergence.

## When to study it
You must be comfortable with the following before proceeding. If not, review them first.
1.  **Loss Functions:** You should understand what a loss function, $J(\theta)$, is and why we want to minimize it. Mean Squared Error (MSE) is a sufficient example.
2.  **Multivariable Calculus:** You must be able to compute the gradient of a function, $\nabla_{\theta} J(\theta)$.
3.  **Basic Gradient Descent:** You must understand the core update rule: $\theta_{new} = \theta_{old} - \eta \nabla_{\theta} J(\theta)$, where $\theta$ are the model parameters and $\eta$ is the learning rate.

## How to study it (step by step)
1.  **Derive the Batch Gradient:** Start with a simple linear model, $\hat{y}^{(i)} = \theta_1 x^{(i)} + \theta_0$, and the MSE loss function for $N$ data points, $J(\theta) = \frac{1}{N} \sum_{i=1}^{N} (\hat{y}^{(i)} - y^{(i)})^2$. Apply the chain rule to derive the gradient $\nabla_{\theta} J(\theta)$. Notice that this gradient is a sum over all $N$ points.
2.  **Derive the Stochastic Gradient:** Now, consider the loss for a *single* data point $(x^{(j)}, y^{(j)})$: $J^{(j)}(\theta) = (\hat{y}^{(j)} - y^{(j)})^2$. Derive the gradient $\nabla_{\theta} J^{(j)}(\theta)$. Compare its form to the batch gradient. This is the core of Stochastic Gradient Descent (SGD).
3.  **Derive the Mini-Batch Gradient:** Generalize the above. Consider the loss over a small batch of $B$ data points, where $1 < B < N$. The loss is $J_{batch}(\theta) = \frac{1}{B} \sum_{i \in \text{batch}} (\hat{y}^{(i)} - y^{(i)})^2$. Derive its gradient. See how it interpolates between the batch and stochastic cases.
4.  **Analyze the Trade-offs:** Create a table comparing the three methods across three axes: computational cost per step, variance of updates (noise), and memory requirement. Reason about each entry from your derivations.
5.  **Code a Toy Example:** Implement a simple linear regression in Python using NumPy. Write three functions, one for each update type. Use a small, fixed dataset and run each for a few epochs, printing the parameter values at each step. Observe how they converge differently.
6.  **Plot the Loss:** Using your toy example, plot the loss value versus the number of updates (iterations) for all three methods on the same graph. This will give you a powerful visual intuition for the noisy but fast convergence of SGD versus the smooth but slow convergence of Batch GD.

## Key ideas, with intuition
1.  **The Gradient is an Expectation:** The "true" gradient is the expectation of the gradient over the entire data distribution. Batch gradient descent computes this exactly for your training set. SGD and mini-batch use a small sample to *estimate* this expectation.
    $$
    \nabla_{\theta} J_{Batch}(\theta) = \frac{1}{N} \sum_{i=1}^{N} \nabla_{\theta} J^{(i)}(\theta) = \mathbb{E}_{i \sim \text{TrainingSet}}[\nabla_{\theta} J^{(i)}(\theta)]
    $$
    SGD uses one sample to estimate this expectation, which is why it's so noisy. Mini-batch uses $B$ samples, which reduces the noise (variance) of the estimate.

2.  **Computation vs. Accuracy Trade-off:** There is a fundamental tension.
    *   **Batch GD:** High computational cost per step (must process all $N$ points), but provides a very accurate, low-variance estimate of the true gradient. The path to the minimum is smooth.
    *   **SGD:** Very low computational cost per step (one point), but provides a high-variance, noisy estimate of the gradient. The path to the minimum zig-zags wildly.

3.  **Mini-Batch is the Practical Optimum:** Mini-batch gradient descent is the dominant method for a reason.
    *   It smooths out the noise of SGD, leading to more stable convergence.
    *   It avoids the massive computational cost of Batch GD.
    *   Crucially, it allows for hardware optimization. Modern GPUs are designed for vectorized and matrix operations. Processing a mini-batch of size $B$ (e.g., 32, 64, 128) is often almost as fast as processing a single point due to parallelization.

4.  **Noise Can Be a Feature:** The noisy updates of SGD and mini-batch can help the optimizer escape sharp, poor local minima and find better, flatter minima. This acts as a form of regularization, sometimes improving the model's ability to generalize to new data.

## Worked example
Let's perform one parameter update for a simple linear model $y = \theta x$ with loss function $J(\theta) = \frac{1}{N} \sum_{i=1}^{N} (y^{(i)} - \theta x^{(i)})^2$.
Our dataset has 4 points: $\{(x^{(1)}, y^{(1)})=(1, 2), (x^{(2)}, y^{(2)})=(2, 3), (x^{(3)}, y^{(3)})=(3, 5), (x^{(4)}, y^{(4)})=(4, 6)\}$.
Let initial parameter $\theta = 1$ and learning rate $\eta = 0.01$.

The gradient of the loss with respect to $\theta$ for a single point $(x^{(i)}, y^{(i)})$ is:
$$ \frac{\partial J^{(i)}}{\partial \theta} = \frac{\partial}{\partial \theta} (y^{(i)} - \theta x^{(i)})^2 = 2(y^{(i)} - \theta x^{(i)})(-x^{(i)}) = -2x^{(i)}(y^{(i)} - \theta x^{(i)}) $$

**1. Batch Gradient Descent**
*   **Goal:** Use all 4 points to compute the gradient.
*   **Step 1: Compute gradient for each point.**
    *   $i=1: -2(1)(2 - 1 \cdot 1) = -2$
    *   $i=2: -2(2)(3 - 1 \cdot 2) = -4$
    *   $i=3: -2(3)(5 - 1 \cdot 3) = -12$
    *   $i=4: -2(4)(6 - 1 \cdot 4) = -16$
*   **Step 2: Average the gradients.**
    *   $\nabla_{\theta} J = \frac{1}{4}(-2 - 4 - 12 - 16) = \frac{-34}{4} = -8.5$
*   **Step 3: Update the parameter.**
    *   $\theta_{new} = \theta - \eta \nabla_{\theta} J = 1 - 0.01(-8.5) = 1 + 0.085 = 1.085$

**2. Stochastic Gradient Descent (SGD)**
*   **Goal:** Use one randomly selected point. Let's pick point 3: $(x^{(3)}, y^{(3)})=(3, 5)$.
*   **Step 1: Compute gradient for this point.**
    *   $\nabla_{\theta} J^{(3)} = -2(3)(5 - 1 \cdot 3) = -12$
*   **Step 2: Update the parameter.**
    *   $\theta_{new} = \theta - \eta \nabla_{\theta} J^{(3)} = 1 - 0.01(-12) = 1 + 0.12 = 1.12$

**3. Mini-Batch Gradient Descent**
*   **Goal:** Use a mini-batch of size $B=2$. Let's pick points 1 and 2: $\{(1, 2), (2, 3)\}$.
*   **Step 1: Compute gradient for each point in the batch.**
    *   $i=1: -2(1)(2 - 1 \cdot 1) = -2$
    *   $i=2: -2(2)(3 - 1 \cdot 2) = -4$
*   **Step 2: Average the gradients in the batch.**
    *   $\nabla_{\theta} J_{batch} = \frac{1}{2}(-2 - 4) = -3$
*   **Step 3: Update the parameter.**
    *   $\theta_{new} = \theta - \eta \nabla_{\theta} J_{batch} = 1 - 0.01(-3) = 1 + 0.03 = 1.03$

**Reflection:** Each method produced a different update. The batch update is the "true" direction for the training set, while SGD gave a much larger, noisier update, and mini-batch was a compromise. Over many iterations, these differences compound to produce distinct convergence behaviors.

## Diagrams

**Diagram 1: Path to Minimum on a Loss Contour Plot**

```text
       Loss (Parameter 2)
         ^
         |
         |    (Start)
         |       X
         |      / \
         |     /   \ . . . . . . . (SGD Path - Noisy)
         |    /     \         .
         |   /       .       .
         |  /         .     .
         | (Batch Path)  .   .
         |  \           . .
         |   \         .
         |    \       .
         |     V     .
         |   (Minimum)
         +---------------------------> Loss (Parameter 1)
```
This diagram shows the parameter space. The concentric ellipses are contours of the loss function. Batch GD takes a smooth, direct path. SGD takes a noisy, zig-zagging path towards the minimum. Mini-batch would be a path somewhere in between.

**Diagram 2: Loss vs. Iterations**

```text
    Loss
      ^
      |
      |---\
      |    \ . . . . . . . . . . . (SGD - high variance)
      |     \ . . . . . . . . . .
      |      \
      |       \------------------ (Batch GD - smooth)
      |        \
      |         \ .'.'.'.'.'.'.'.' (Mini-batch - less variance)
      |          \'.'.'.'.'.'.'.'
      +---------------------------------> Iterations/Updates
```
This shows that for a given number of parameter updates, SGD and Mini-batch make much faster initial progress but their loss function is noisy. Batch GD is slow to update (each iteration requires a full pass) but decreases the loss smoothly.

## Memory technique — remember this forever
1.  **The Story: The Three Generals.**
    Imagine you are a general trying to find the lowest point in a foggy valley. You have an army of 10,000 soldiers spread out.
    *   **Batch GD:** You are a cautious general. You command every single soldier to report their altitude and the slope at their position. You average all 10,000 reports to get a perfect map of the terrain around you, then take one, very accurate step. This is slow but sure.
    *   **Stochastic GD (SGD):** You are an impulsive general. You radio one random soldier, get their report, and immediately move in their recommended direction. This is fast but erratic and you might walk in circles for a bit.
    *   **Mini-Batch GD:** You are a pragmatic general. You radio a nearby squadron of 100 soldiers, have them average their reports, and you move based on their consensus. This is much faster than waiting for the whole army, and much more reliable than listening to a single soldier. This is why it's the winning strategy.

2.  **Formulas to Overlearn:**
    Let $N$ be total data size, $B$ be mini-batch size, $\eta$ be learning rate.
    *   **Batch:** $\theta := \theta - \eta \cdot \frac{1}{N} \sum_{i=1}^{N} \nabla_{\theta} J^{(i)}(\theta)$
    *   **Stochastic:** $\theta := \theta - \eta \cdot \nabla_{\theta} J^{(i)}(\theta)$ (for a single random $i$)
    *   **Mini-Batch:** $\theta := \theta - \eta \cdot \frac{1}{B} \sum_{i \in \text{batch}} \nabla_{\theta} J^{(i)}(\theta)$

3.  **Spaced Repetition Schedule:**
    Review this material (especially the formulas and the "Three Generals" story) at: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:**
    If you forget, start here: "Gradient descent is about moving parameters $\theta$ opposite to the gradient of the loss, $\nabla_{\theta} J(\theta)$." The only question is, "How do we calculate $J(\theta)$?" The total loss is the average loss over all data points: $J(\theta) = \frac{1}{N}\sum J^{(i)}(\theta)$. The gradient of a sum is the sum of the gradients. From there, you can re-derive the Batch gradient. The other two are just approximations of this sum using one sample (Stochastic) or $B$ samples (Mini-Batch).

## Common mistakes
1.  **Confusing Epochs and Iterations.** An *epoch* is one full pass through the entire training dataset. An *iteration* (or step) is a single parameter update. In Batch GD, 1 epoch = 1 iteration. In SGD with $N$ data points, 1 epoch = $N$ iterations. In Mini-batch GD with batch size $B$, 1 epoch = $N/B$ iterations.
2.  **Forgetting to Shuffle Data.** For SGD and Mini-batch, you *must* shuffle the dataset at the beginning of every epoch. If you don't, the model will see the data in the same order every time, which can lead to biased gradients and poor convergence, especially if the data has some inherent ordering.
3.  **Using the Same Learning Rate.** A learning rate that works for Batch GD will often be too large for SGD. The high variance of SGD updates requires a smaller learning rate to prevent the loss from diverging. Often, learning rate schedules are used to decrease $\eta$ over time.
4.  **Thinking Batch is "Better".** While the batch gradient is more accurate, it's not always better. The computational cost is prohibitive for large datasets, and the noisy nature of mini-batch updates can help escape poor local minima, often leading to models that generalize better.

## Self-check
1.  You have a dataset of 5,000,000 satellite images. Your mini-batch size is 256. How many iterations are required to complete one epoch?
2.  You are training a neural network to predict the remaining useful life of a rocket engine component based on real-time sensor data streamed from a test stand. The data arrives sequentially. Which of the three gradient descent methods is most naturally suited to this online learning problem, and why?
3.  The update rule for SGD is $\theta_{t+1} = \theta_t - \eta \nabla J^{(i)}(\theta_t)$. Show that the expectation of the stochastic gradient is equal to the true batch gradient, i.e., $\mathbb{E}_{i \sim U\{1,...,N\}}[\nabla J^{(i)}(\theta_t)] = \nabla J(\theta_t)$. What does this imply about SGD's updates "on average"?