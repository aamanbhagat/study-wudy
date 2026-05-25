## What it is
In statistics, we use sample data to guess a property of an entire population, like its mean. An **estimator** is the rule or formula we use to make this guess. The properties of estimators—unbiasedness, consistency, and efficiency—are criteria we use to determine if our guessing rule is "good."

## Why it matters
These concepts are the foundation of statistical inference and machine learning. In aerospace, the Kalman filter, used for state estimation in navigation systems (like on a rocket or satellite), is designed to be an optimal, unbiased estimator. In machine learning, the bias-variance tradeoff is a central problem; understanding estimator properties is crucial for building models that generalize well instead of just memorizing training data.

## When to study it
Before tackling this, you must have a firm grasp of the following:
*   **Random Variables:** The difference between a random variable and a realization of it.
*   **Probability Distributions:** Especially the Normal distribution.
*   **Expected Value and Variance:** You must be able to compute $E[X]$ and $Var(X)$ and know their properties, especially linearity of expectation.
*   **Population vs. Sample:** The distinction between a population parameter (e.g., true mean $\mu$) and a sample statistic (e.g., sample mean $\bar{X}$).

If any of these are weak, pause and review them. You cannot build a solid house on a shaky foundation.

## How to study it (step by step)
1.  **Solidify Definitions:** Write down the formal definitions of a parameter ($\theta$) and an estimator ($\hat{\theta}$). Internalize that $\theta$ is a fixed, unknown constant, while $\hat{\theta}$ is a random variable because it depends on the random sample.
2.  **Derive Unbiasedness of Sample Mean:** Take a random sample $X_1, X_2, \dots, X_n$ from a population with mean $\mu$. The estimator for the mean is $\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$. Use the linearity of expectation to prove, step-by-step, that $E[\bar{X}] = \mu$. This is the canonical example of an unbiased estimator.
3.  **Derive Bias of Sample Variance:** Now, investigate the estimator for variance, $S^2 = \frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^2$. Show that $E[S^2] \neq \sigma^2$. This is a crucial, non-obvious result. Then, show that using the $n-1$ denominator (Bessel's correction) in $S_{n-1}^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i - \bar{X})^2$ makes the estimator unbiased, i.e., $E[S_{n-1}^2] = \sigma^2$.
4.  **Connect Consistency to LLN:** Review the Law of Large Numbers (LLN). Understand that consistency is essentially the LLN applied to estimators. An estimator $\hat{\theta}_n$ is consistent if it converges in probability to the true parameter $\theta$ as the sample size $n$ grows.
5.  **Compare Efficiencies:** Find two different unbiased estimators for the same parameter and compare their variances. The one with the smaller variance is more efficient. For example, for a Normal population, compare the variance of the sample mean to the variance of the sample median.

## Key ideas, with intuition
1.  **Unbiasedness: Aiming at the right target.**
    An estimator is unbiased if its expected value (its average over many repeated samples) is equal to the true parameter you're trying to estimate. It doesn't mean any single estimate will be perfect, but it means your *method* has no systematic error. Think of it as a rifle that is perfectly sighted-in. The shots may cluster around the bullseye, but they don't systematically land high and to the right.
    $$
    \text{Bias}(\hat{\theta}) = E[\hat{\theta}] - \theta
    $$
    An estimator is unbiased if $\text{Bias}(\hat{\theta}) = 0$, or $E[\hat{\theta}] = \theta$.

2.  **Consistency: Getting closer with more information.**
    A consistent estimator is one that gets closer and closer to the true value of the parameter as you collect more data ($n \to \infty$). This is a bare-minimum requirement for a decent estimator. If gathering more data doesn't improve your estimate, your method is flawed. The sample mean is consistent because the Law of Large Numbers guarantees it converges to the true mean $\mu$.
    $$
    \hat{\theta}_n \xrightarrow{p} \theta \quad \text{as} \quad n \to \infty
    $$
    (The notation $\xrightarrow{p}$ means "converges in probability.")

3.  **Efficiency: A tighter shot group.**
    If you have two different unbiased estimators, which one is better? The one that is more *efficient*. Efficiency refers to the variance of the estimator. An estimator with a smaller variance will produce estimates that are more tightly clustered around the true parameter. Given two unbiased estimators $\hat{\theta}_1$ and $\hat{\theta}_2$, $\hat{\theta}_1$ is more efficient than $\hat{\theta}_2$ if $Var(\hat{\theta}_1) < Var(\hat{\theta}_2)$. The best possible unbiased estimator is the one with the lowest possible variance, called the Minimum Variance Unbiased Estimator (MVUE).

## Worked example
**Problem:** Let $X_1, X_2, \dots, X_n$ be an i.i.d. (independent and identically distributed) random sample from a population with mean $\mu$ and variance $\sigma^2$. Let's compare two estimators for $\mu$:
1.  $\hat{\mu}_1 = \bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$ (the sample mean)
2.  $\hat{\mu}_2 = \frac{X_1 + X_n}{2}$ (an estimator that just uses the first and last data points)

Which is better? Let's check the properties.

**Step 1: Check for Unbiasedness**

For $\hat{\mu}_1$:
$$
E[\hat{\mu}_1] = E\left[\frac{1}{n}\sum_{i=1}^n X_i\right] = \frac{1}{n}\sum_{i=1}^n E[X_i]
$$
Since each $X_i$ is from the same population, $E[X_i] = \mu$ for all $i$.
$$
E[\hat{\mu}_1] = \frac{1}{n}\sum_{i=1}^n \mu = \frac{1}{n}(n\mu) = \mu
$$
**Conclusion:** $\hat{\mu}_1$ is an unbiased estimator of $\mu$.

For $\hat{\mu}_2$:
$$
E[\hat{\mu}_2] = E\left[\frac{X_1 + X_n}{2}\right] = \frac{1}{2}(E[X_1] + E[X_n])
$$
Again, $E[X_1] = \mu$ and $E[X_n] = \mu$.
$$
E[\hat{\mu}_2] = \frac{1}{2}(\mu + \mu) = \mu
$$
**Conclusion:** $\hat{\mu}_2$ is also an unbiased estimator of $\mu$.

**Step 2: Check for Efficiency**

Since both are unbiased, we compare their variances. The one with lower variance is more efficient.

For $\hat{\mu}_1$:
$$
Var(\hat{\mu}_1) = Var\left(\frac{1}{n}\sum_{i=1}^n X_i\right)
$$
Since the $X_i$ are independent, $Var(A+B) = Var(A)+Var(B)$ and $Var(cX) = c^2Var(X)$.
$$
Var(\hat{\mu}_1) = \frac{1}{n^2}\sum_{i=1}^n Var(X_i) = \frac{1}{n^2}\sum_{i=1}^n \sigma^2 = \frac{1}{n^2}(n\sigma^2) = \frac{\sigma^2}{n}
$$

For $\hat{\mu}_2$:
$$
Var(\hat{\mu}_2) = Var\left(\frac{X_1 + X_n}{2}\right) = \frac{1}{4}(Var(X_1) + Var(X_n))
$$
Since $X_1$ and $X_n$ are independent.
$$
Var(\hat{\mu}_2) = \frac{1}{4}(\sigma^2 + \sigma^2) = \frac{2\sigma^2}{4} = \frac{\sigma^2}{2}
$$

**Step 3: Compare**

We compare $Var(\hat{\mu}_1) = \frac{\sigma^2}{n}$ with $Var(\hat{\mu}_2) = \frac{\sigma^2}{2}$.
For any sample size $n > 2$, we have $\frac{1}{n} < \frac{1}{2}$, which means $\frac{\sigma^2}{n} < \frac{\sigma^2}{2}$.
Therefore, $Var(\hat{\mu}_1) < Var(\hat{\mu}_2)$.

**Reflection:** Both estimators are unbiased, meaning they are correct "on average." However, the sample mean $\bar{X}$ is more efficient for any sample size greater than 2 because it uses all the information in the sample, resulting in estimates that are less spread out. The second estimator foolishly throws away data points $X_2, \dots, X_{n-1}$. This demonstrates why efficiency is a critical measure of an estimator's quality.

## Diagrams
This diagram illustrates the concepts of bias and variance (the square root of which is standard error, a measure related to efficiency). The center of the target is the true parameter $\theta$. Each dot is an estimate $\hat{\theta}$ from a different sample.

```text
       High Variance           Low Variance
     +------------------+  +------------------+
     |                  |  |                  |
H    |     *      *     |  |                  |
i    |   *     +    *   |  |   * * *   +      |
g    |      *     *     |  |   * * *          |
h    |   *           *  |  |                  |
     +------------------+  +------------------+
B    |                  |  |                  |
i    |                  |  |                  |
a    |                  |  |                  |
s    |                  |  |                  |
     |                  |  |                  |
     +------------------+  +------------------+
L    |                  |  |                  |
o    |     *      *     |  |                  |
w    |   *     +    *   |  |         + * *    |
     |      *     *     |  |           * *    |
B    |   *           *  |  |                  |
i    +------------------+  +------------------+
a             ^                     ^
s         Unbiased,           Biased,
          Inefficient         Inefficient
         (High Variance)     (High Variance)

     +------------------+  +------------------+
     |                  |  |                  |
H    |                  |  |                  |
i    |                  |  |                  |
g    |                  |  |                  |
h    |                  |  |                  |
     +------------------+  +------------------+
B    |                  |  |   * * *          |
i    |                  |  |   * * *   +      |
a    |                  |  |                  |
s    |                  |  |                  |
     |                  |  |                  |
     +------------------+  +------------------+
L    |                  |  |                  |
o    |                  |  |                  |
w    |         + * *    |  |                  |
     |           * *    |  |                  |
B    |                  |  |                  |
i    +------------------+  +------------------+
a             ^                     ^
s          Biased,                Unbiased,
           Efficient              Efficient
         (Low Variance)          (Low Variance) --> GOAL
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of an archer shooting at a target.
    *   **Unbiased:** The archer's average shot location is the bullseye. (No systematic error).
    *   **Consistent:** As the archer takes more and more shots, the average location of their shots gets closer and closer to the bullseye.
    *   **Efficient:** The archer's shots are tightly clustered. An efficient archer has a smaller grouping than an inefficient one.
    Your goal is to be an Unbiased, Consistent, and Efficient archer.

2.  **Must-know formulas:** Overlearn these until they are automatic.
    *   Unbiasedness: $E[\hat{\theta}] = \theta$
    *   Sample Mean: $\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$
    *   Variance of Sample Mean: $Var(\bar{X}) = \frac{\sigma^2}{n}$

3.  **Spaced Repetition Schedule:** Review your derivations and these key ideas at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read them. Re-derive them from scratch.

4.  **First Principles Pathway:** If you forget everything, you can re-derive the most important results from the **linearity of expectation**: $E[aX + bY] = aE[X] + bE[Y]$. Almost all unbiasedness proofs for common estimators start here. For the sample mean, the derivation is simple: $E[\bar{X}] = E[\frac{1}{n}\sum X_i] = \frac{1}{n}\sum E[X_i] = \frac{1}{n}(n\mu) = \mu$. You can always rebuild from this.

## Common mistakes
1.  **The $n$ vs. $n-1$ Trap:** Thinking the sample variance formula $S^2 = \frac{1}{n}\sum(X_i-\bar{X})^2$ is an unbiased estimator for $\sigma^2$. It is not. The use of $\bar{X}$ (which is calculated from the data itself) "sucks up" one degree of freedom, causing a slight downward bias. Dividing by $n-1$ corrects for this.
2.  **Believing Unbiased is Always Best:** An estimator with a small amount of bias but a much, much smaller variance can sometimes be superior in practice. This is the core of the bias-variance tradeoff in machine learning. A perfectly unbiased model might have high variance, leading it to "overfit" the training data.
3.  **Confusing Consistency and Unbiasedness:** An estimator can be biased for any finite sample size $n$, but still be consistent. For example, the biased sample variance estimator $S^2$ (with denominator $n$) is biased, but its bias $\to 0$ as $n \to \infty$, and it is consistent.

## Self-check
1.  Let $X_1, \dots, X_n$ be a sample from a symmetric distribution with mean $\mu$. Is the sample median an unbiased estimator for $\mu$? Justify your answer.
2.  Derive the bias of the standard sample variance estimator $S^2 = \frac{1}{n}\sum(X_i - \bar{X})^2$. You will need to use the fact that $E[\bar{X}^2] = Var(\bar{X}) + (E[\bar{X}])^2 = \frac{\sigma^2}{n} + \mu^2$.
3.  Let $\hat{\theta}_1$ and $\hat{\theta}_2$ be two independent, unbiased estimators for a parameter $\theta$, with $Var(\hat{\theta}_1) = \sigma^2$ and $Var(\hat{\theta}_2) = 2\sigma^2$. Consider a combined estimator $\hat{\theta}_3 = c\hat{\theta}_1 + (1-c)\hat{\theta}_2$. First, show that $\hat{\theta}_3$ is unbiased for any choice of $c$. Then, find the value of $c$ that makes $\hat{\theta}_3$ the most efficient (i.e., minimizes its variance).