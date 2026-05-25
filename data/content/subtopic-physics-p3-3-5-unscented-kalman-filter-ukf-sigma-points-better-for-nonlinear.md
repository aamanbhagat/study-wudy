## What it is
The Unscented Kalman Filter (UKF) is a state estimation algorithm that handles nonlinear systems more accurately than the Extended Kalman Filter (EKF). Instead of linearizing the system dynamics and measurement models (which introduces errors), the UKF uses a small, deterministically chosen set of points, called "sigma points," to capture the mean and covariance of the state's probability distribution. These points are then propagated through the true nonlinear functions, and their resulting statistics provide a better estimate of the new state distribution.

## Why it matters
The UKF is critical in modern aerospace GNC for tasks where system dynamics are highly nonlinear, such as spacecraft attitude estimation (using quaternions), satellite rendezvous and docking, and hypersonic vehicle tracking. The EKF's linearization can lead to filter divergence (catastrophic failure) in these cases, while the UKF remains stable and accurate. Its principles are also foundational in robotics for Simultaneous Localization and Mapping (SLAM) and in advanced sensor fusion applications.

## When to study it
You must have a firm grasp of the standard **Kalman Filter (KF)** and the **Extended Kalman Filter (EKF)**. Without understanding the EKF's reliance on Jacobians and Taylor series linearization, the UKF's motivation and elegance will be lost. You also need to be proficient in linear algebra (covariance matrices, matrix square roots like Cholesky decomposition) and probability theory (Gaussian distributions, mean, variance).

## How to study it (step by step)
1.  **Revisit the EKF's Flaw:** Draw the function $y = x^2$. Imagine a Gaussian distribution for $x$ centered at $x=0.5$. The EKF approximates this with a tangent line at $x=0.5$. Sketch this tangent and see how quickly it diverges from the true parabola. This visualizes the linearization error the UKF aims to solve.
2.  **Understand the Unscented Transform (UT):** The UT is the core of the UKF. Read about its central claim: "It is easier to approximate a probability distribution than it is to approximate an arbitrary nonlinear function." The goal is to find a set of points whose sample mean and covariance match the true mean and covariance of a Gaussian.
3.  **Derive the Sigma Points:** For an $n$-dimensional state with mean $\mu$ and covariance $P$, the sigma points $\mathcal{X}$ are generated. Work through the math for the standard scaled formulation:
    *   $\mathcal{X}_0 = \mu$
    *   $\mathcal{X}_i = \mu + (\sqrt{(n+\lambda)P})_i$ for $i=1, ..., n$
    *   $\mathcal{X}_i = \mu - (\sqrt{(n+\lambda)P})_{i-n}$ for $i=n+1, ..., 2n$
    Here, $(\sqrt{M})_i$ is the $i$-th column of the matrix square root of $M$, and $\lambda = \alpha^2(n+\kappa)-n$ is a scaling parameter.
4.  **Trace the UKF Predict Step:** Take the sigma points from step 3. Pass each one through the nonlinear process model: $\mathcal{X}'_i = f(\mathcal{X}_i)$. Then, recombine them using weighted sums to find the predicted state mean $\mu'$ and covariance $P'$.
5.  **Trace the UKF Update Step:** Take the predicted sigma points $\mathcal{X}'_i$. Pass them through the nonlinear measurement model: $\mathcal{Z}_i = h(\mathcal{X}'_i)$. Recombine to find the predicted measurement $\hat{z}$. Use this, along with the cross-covariance, to calculate the Kalman gain and update the state estimate. Notice no Jacobians were ever calculated.
6.  **Code a 1D Example:** Implement a UKF for a simple system like $x_{k+1} = \frac{1}{2}x_k + \frac{25x_k}{1+x_k^2} + w_k$. This will solidify your understanding of how the weights and sigma points are manipulated in a real algorithm.

## Key ideas, with intuition
1.  **Linearization is the Enemy:** The EKF approximates a nonlinear function with a tangent line (a first-order Taylor expansion). If the function is highly curved, the tangent is a poor representation, especially for states far from the mean. This approximation error is the primary weakness the UKF addresses.
    $$
    f(x) \approx f(\mu) + \nabla f(\mu)(x-\mu) \quad \leftarrow \text{EKF's flawed premise for nonlinear } f
    $$
2.  **The Unscented Transform: Approximate the Distribution, Not the Function:** Instead of simplifying the function $f$, we choose a handful of points (sigma points) that represent the original Gaussian distribution. We pass these points through the *exact*, nonlinear function $f$. The resulting transformed points give us a highly accurate estimate of the new distribution's mean and covariance, even if the new distribution is no longer perfectly Gaussian.
3.  **Sigma Points are "Smart" Samples:** These are not random Monte Carlo samples. They are a deterministic set of points, symmetrically placed around the mean, whose weighted sample mean and covariance are *identical* to the original distribution's mean and covariance. For an $n$-dimensional state, you only need $2n+1$ sigma points to capture this second-order information perfectly.
4.  **Weights for Recombination:** After propagating the sigma points, you can't just take a simple average. The central point and the outer points contribute differently to the statistics. The UKF uses one set of weights ($W^{(m)}$) to calculate the new mean and another set ($W^{(c)}$) for the new covariance.
    $$
    \mu' = \sum_{i=0}^{2n} W_i^{(m)} f(\mathcal{X}_i) \quad \leftarrow \text{Weighted mean of transformed points}
    $$
    $$
    P' = \sum_{i=0}^{2n} W_i^{(c)} (f(\mathcal{X}_i) - \mu')(f(\mathcal{X}_i) - \mu')^T \quad \leftarrow \text{Weighted covariance}
    $$

## Worked example
Let's perform a single predict step for a 1D system.

**System:**
- State: $x \in \mathbb{R}^1$ (so $n=1$)
- Initial state estimate: $\hat{x}_{k-1} = 2$, with covariance $P_{k-1} = 4$.
- Nonlinear process model: $x_k = f(x_{k-1}) + w_k = 0.5 x_{k-1}^2 + w_k$
- Process noise variance: $Q = 1$.

**Goal:** Calculate the predicted state $\hat{x}_k^-$ and predicted covariance $P_k^-$.

**Step 1: Choose UKF parameters.**
We'll use standard parameters for a 1D system: $n=1$, $\alpha=1$, $\beta=2$, $\kappa=0$.
The scaling parameter $\lambda$ is:
$\lambda = \alpha^2(n+\kappa) - n = 1^2(1+0) - 1 = 0$.

**Step 2: Generate Sigma Points.**
We need $2n+1 = 3$ sigma points.
- $\mathcal{X}_0 = \hat{x}_{k-1} = 2$
- The term $\sqrt{(n+\lambda)P_{k-1}} = \sqrt{(1+0) \cdot 4} = \sqrt{4} = 2$.
- $\mathcal{X}_1 = \hat{x}_{k-1} + \sqrt{(n+\lambda)P_{k-1}} = 2 + 2 = 4$
- $\mathcal{X}_2 = \hat{x}_{k-1} - \sqrt{(n+\lambda)P_{k-1}} = 2 - 2 = 0$
Our sigma points are $\{2, 4, 0\}$.

**Step 3: Propagate Sigma Points through the nonlinear function $f(x) = 0.5x^2$.**
- $\mathcal{Y}_0 = f(\mathcal{X}_0) = 0.5 \cdot (2)^2 = 2$
- $\mathcal{Y}_1 = f(\mathcal{X}_1) = 0.5 \cdot (4)^2 = 8$
- $\mathcal{Y}_2 = f(\mathcal{X}_2) = 0.5 \cdot (0)^2 = 0$
The propagated points are $\{2, 8, 0\}$.

**Step 4: Calculate Weights.**
- $W_0^{(m)} = \frac{\lambda}{n+\lambda} = \frac{0}{1+0} = 0$
- $W_0^{(c)} = \frac{\lambda}{n+\lambda} + (1-\alpha^2+\beta) = \frac{0}{1+0} + (1-1^2+2) = 2$
- $W_i^{(m)} = W_i^{(c)} = \frac{1}{2(n+\lambda)} = \frac{1}{2(1+0)} = 0.5$ for $i=1, 2$.

**Step 5: Recombine to get predicted mean and covariance.**
- Predicted mean $\hat{x}_k^-$:
$$
\hat{x}_k^- = \sum_{i=0}^{2} W_i^{(m)} \mathcal{Y}_i = (0)(2) + (0.5)(8) + (0.5)(0) = 4
$$
- Predicted covariance $P_k^-$:
$$
P_k^- = \sum_{i=0}^{2} W_i^{(c)} (\mathcal{Y}_i - \hat{x}_k^-)^2 + Q \\
= W_0^{(c)}(\mathcal{Y}_0 - 4)^2 + W_1^{(c)}(\mathcal{Y}_1 - 4)^2 + W_2^{(c)}(\mathcal{Y}_2 - 4)^2 + Q \\
= (2)(2-4)^2 + (0.5)(8-4)^2 + (0.5)(0-4)^2 + 1 \\
= (2)(-2)^2 + (0.5)(4)^2 + (0.5)(-4)^2 + 1 \\
= (2)(4) + (0.5)(16) + (0.5)(16) + 1 \\
= 8 + 8 + 8 + 1 = 25
$$

**Reflection:**
- We generated symmetric points ($\{0, 2, 4\}$) around our initial mean of 2.
- We passed them through the true nonlinear function $0.5x^2$, getting asymmetric results ($\{0, 2, 8\}$).
- We used weighted averages to find a new mean (4) and a new variance (24, before adding process noise). Notice the mean shifted significantly, and the variance grew substantially, capturing the nonlinear effect of the squaring function. The EKF would have linearized around $x=2$ and produced a much different, less accurate result.

## Diagrams
Here is a conceptual diagram of how sigma points capture a distribution.

```text
       ^ P(x)
       |
       |        .--.
       |       /    \
       |      /      \
       |     /        \
       |    |          |
       +----+----------+----------+----> x
            ^          ^          ^
            |          |          |
         X_2         X_0         X_1
      (sigma pt)   (mean)    (sigma pt)

Diagram 1: A 1D Gaussian distribution for state x. The UKF selects the mean (X_0)
and two outer sigma points (X_1, X_2) at a specific distance from the mean,
determined by the covariance. These three points perfectly capture the
mean and variance of the distribution.
```

And a comparison of EKF vs. UKF propagation.

```text
       ^ y
       |
       |                      . . . . . UKF propagated points (Y_i)
       |                   .
       |                 .  <-- True function y = f(x)
       | EKF linear approx .
       | . . . . . . . . .
       |           .
       |         .
       |       .
       +-------------------------------------> x
             ^
             |
           Initial mean (mu)

Diagram 2: EKF vs. UKF. The EKF approximates f(x) with a tangent line at the mean
and propagates the Gaussian along that line. The UKF propagates the individual
sigma points (X_i) through the true curve f(x) to get the points (Y_i), then
calculates the statistics of the Y_i points, resulting in a more accurate estimate.
```

## Memory technique — remember this forever
1.  **The Story:** The EKF is a lazy general who stands at the center of his army (the mean) and assumes the entire battlefield is flat (linearization). The UKF is a smart commander who doesn't make assumptions. He sends out a small constellation of "Sigma Spies" ($\sigma$-points) to scout the real, curved terrain. The spies report back from their positions, and the commander combines their intel (weighted average) to get a far superior map of the battlefield (the state estimate). The filter is "unscented" because it can't stand the "scent" of messy derivatives (Jacobians).

2.  **Formulas to Overlearn:** The heart of the UKF is the Unscented Transform. Burn these into memory.
    *   **Sigma Point Generation:** $\mathcal{X}_0 = \mu$, and $\mathcal{X}_{i} = \mu \pm (\sqrt{(n+\lambda)P})_i$
    *   **Weighted Mean Recovery:** $\mu' = \sum W_i^{(m)} \mathcal{Y}_i$
    *   **Weighted Covariance Recovery:** $P' = \sum W_i^{(c)} (\mathcal{Y}_i - \mu')(\mathcal{Y}_i - \mu')^T + Q$

3.  **Spaced Repetition Schedule:** Review this material at:
    *   1 day (tomorrow)
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget the formulas, reconstruct the process from the core idea: "I need a small set of points whose weighted mean and covariance exactly match my Gaussian's $\mu$ and $P$."
    1.  Start with the goal: $\sum W_i \mathcal{X}_i = \mu$ and $\sum W_i (\mathcal{X}_i - \mu)(\mathcal{X}_i - \mu)^T = P$.
    2.  Assume a symmetric structure for the points: one at the mean $\mu$, and pairs at $\mu \pm c_i$.
    3.  Solve for the weights $W_i$ and distances $c_i$ that satisfy the goal. This is non-trivial but leads you back to the structure of the UKF formulas. The process is always: **Generate Points -> Propagate Points -> Recombine Points.**

## Common mistakes
1.  **Mishandling Matrix Square Roots:** The term $\sqrt{P}$ is a matrix square root, not element-wise. Use a Cholesky decomposition ($P = LL^T$). If $P$ is not positive semi-definite due to numerical errors, Cholesky will fail. Robust UKF versions handle this.
2.  **Forgetting to Add Noise:** Students often correctly compute the covariance of the propagated points but forget to add the process noise $Q$ in the predict step or the measurement noise $R$ in the update step.
3.  **Weight Sums:** The weights for the mean ($W^{(m)}$) must sum to 1. The weights for the covariance ($W^{(c)}$) do not necessarily sum to 1 due to the $(1-\alpha^2+\beta)$ term. Confusing the two sets of weights is a common error.
4.  **Incorrect Dimensions:** When dealing with a state of size $n$ and measurements of size $m$, the matrices for cross-covariance ($P_{xz}$) will have dimensions $n \times m$. A simple dimensional analysis sanity check can catch many implementation bugs.

## Self-check
1.  A spacecraft is performing a re-entry maneuver. Its drag coefficient is a highly nonlinear function of its velocity and altitude. Why is a UKF a much better choice than an EKF for tracking its trajectory?
2.  You have a 2D system with state mean $\mu = [1, -2]^T$ and covariance $P = \begin{pmatrix} 4 & 0 \\ 0 & 9 \end{pmatrix}$. Using the parameters $n=2, \alpha=1, \beta=2, \kappa=0$, calculate the five sigma points.
3.  Consider a system where the state is the 2D position $(x, y)$ and the measurement is the angle (bearing) to the origin, $z = \operatorname{atan2}(y, x)$. The current state estimate is centered at $\mu = [0, 1]^T$ with some covariance $P$. Why would the EKF struggle with this measurement update, and how would the UKF handle it more gracefully? (Hint: Think about the behavior of $\operatorname{atan2}$ near the y-axis).