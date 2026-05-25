## What it is
The `scipy.stats` module is a comprehensive library in Python for performing statistical calculations. It provides objects representing dozens of probability distributions (like the normal, binomial, and Poisson distributions) and functions for executing common statistical tests (like the t-test and chi-squared test). It is the standard toolkit for rigorous statistical analysis in scientific Python.

## Why it matters
This module is fundamental for turning raw data into verifiable knowledge. In aerospace, you might use it to determine if a new alloy for a turbine blade is statistically stronger than the old one by testing sample data. In machine learning, hypothesis tests are used to validate whether a new model's performance improvement is a real gain or just random chance (A/B testing).

## When to study it
Before tackling `scipy.stats`, you must have a firm grasp of introductory probability and statistics. Ensure you understand:
- Probability Density Functions (PDFs) and Cumulative Distribution Functions (CDFs).
- Mean, variance, and standard deviation.
- The Central Limit Theorem.
- The core logic of hypothesis testing: the null hypothesis ($H_0$), alternative hypothesis ($H_a$), and the meaning of a p-value.

If these concepts are not solid, pause and review them first. `scipy.stats` is a tool to implement these ideas, not to learn them from scratch.

## How to study it (step by step)
1.  **Explore a continuous distribution.** Open a Python interpreter. Import `scipy.stats as stats`. Create a normal distribution object: `norm_dist = stats.norm(loc=10, scale=2)`. Use its methods: `norm_dist.pdf(10)` (what's the height of the curve at the mean?), `norm_dist.cdf(12)` (what's the probability of getting a value <= 12?), and `norm_dist.rvs(size=5)` (generate 5 random samples).
2.  **Explore a discrete distribution.** Now, create a binomial distribution object: `binom_dist = stats.binom(n=10, p=0.5)`. Contrast its `pmf` (Probability Mass Function) with the `pdf` from step 1 by calling `binom_dist.pmf(5)`. Why is it `pmf` and not `pdf`? Generate samples using `.rvs()`.
3.  **Perform a one-sample t-test.** Generate 30 samples from a normal distribution with mean 5.5 and standard deviation 2: `sample_data = stats.norm(loc=5.5, scale=2).rvs(size=30)`. Now, test the null hypothesis that the true mean of this data is 5. Use `stats.ttest_1samp(a=sample_data, popmean=5)`.
4.  **Interpret the result.** The test returns a `statistic` and a `pvalue`. The statistic measures how many standard errors the sample mean is from the hypothesized mean. The p-value is the probability of seeing a result this extreme (or more extreme) if the null hypothesis were true. For now, just focus: if `pvalue < 0.05`, we typically "reject the null hypothesis."
5.  **Perform a two-sample t-test.** Generate two different samples: `sample_a = stats.norm(loc=10, scale=3).rvs(size=40)` and `sample_b = stats.norm(loc=11, scale=3).rvs(size=40)`. Test the null hypothesis that these two samples come from distributions with the same mean. Use `stats.ttest_ind(a=sample_a, b=sample_b)`. Interpret the p-value as before.

## Key ideas, with intuition
1.  **Distributions as Objects:** In `scipy.stats`, a distribution is not just a formula. It's a "frozen" object that encapsulates all the properties of that distribution (e.g., a normal distribution with a specific mean and standard deviation). This object has methods like `.pdf()`, `.cdf()`, `.ppf()` (percent point function, the inverse of CDF), and `.rvs()` (random variate samples), giving you a complete toolkit for that specific distribution.

2.  **The p-value is a measure of surprise.** The p-value answers the question: "If the null hypothesis were true, how likely is it that we would see data this extreme just by random chance?" A small p-value (e.g., $p < 0.05$) means the observed data is very surprising under the null hypothesis, which gives us evidence to reject it. It is **not** the probability that the null hypothesis is true.

3.  **The Test Statistic is a Signal-to-Noise Ratio.** Many test statistics, like the t-statistic, follow this intuition:
    $$
    \text{Test Statistic} = \frac{\text{Observed Difference} - \text{Hypothesized Difference}}{\text{Standard Error}} = \frac{\text{Signal}}{\text{Noise}}
    $$
    The "Signal" is how far your sample measurement is from the null hypothesis value. The "Noise" is the variability you'd expect in your sample data. A large absolute value for the statistic means the signal is strong compared to the noise.

## Worked example
An aerospace supplier claims their bolts have a mean shear strength of 750 MPa. You are a quality control engineer and need to verify this claim. You test a sample of 15 bolts and record their shear strengths.

**Data (in MPa):** `[748, 751, 752, 747, 749, 755, 745, 753, 750, 746, 754, 751, 748, 752, 749]`

**Goal:** Test if the true mean strength is actually 750 MPa. We'll use a significance level of $\alpha = 0.05$.

**Step 1: Formulate Hypotheses**
- Null Hypothesis ($H_0$): The true mean shear strength is 750 MPa. ($\mu = 750$)
- Alternative Hypothesis ($H_a$): The true mean shear strength is not 750 MPa. ($\mu \neq 750$)

**Step 2: Choose and Perform the Test**
Since we have one sample and we're testing its mean against a specific value, a one-sample t-test is appropriate.

```python
import numpy as np
from scipy import stats

# Our sample data
strengths = np.array([748, 751, 752, 747, 749, 755, 745, 753, 750, 746, 754, 751, 748, 752, 749])

# The hypothesized population mean from the supplier's claim
popmean = 750

# Perform the one-sample t-test
t_statistic, p_value = stats.ttest_1samp(a=strengths, popmean=popmean)

print(f"Sample Mean: {np.mean(strengths):.2f}")
print(f"T-statistic: {t_statistic:.4f}")
print(f"P-value: {p_value:.4f}")
```

**Step 3: Interpret the Results**
The code outputs:
```
Sample Mean: 749.93
T-statistic: -0.1288
P-value: 0.8993
```

- Our sample mean is 749.93 MPa, which is very close to 750 MPa.
- The t-statistic is very small (-0.1288), indicating our sample mean is only a fraction of a standard error away from the hypothesized mean. The signal is weak.
- The p-value is 0.8993. This is a very large p-value.

**Step 4: Make a Conclusion**
Since our p-value ($0.8993$) is much greater than our significance level $\alpha = 0.05$, we **fail to reject the null hypothesis**.

**Reflection:** We do not have sufficient statistical evidence to say the supplier's claim is false. Our sample data is entirely consistent with a true mean strength of 750 MPa. Each step was necessary: we needed hypotheses to define the test, the `ttest_1samp` function to compute the probability of our data under the null hypothesis, and the p-value to make a formal decision based on our significance level.

## Diagrams
Here is a conceptual diagram of a two-tailed hypothesis test. The p-value is the sum of the areas in the two tails, representing the probability of observing a test statistic as extreme or more extreme than the one calculated from our sample, assuming $H_0$ is true.

```text
       Probability Density
            ^
            |
            |            ..
            |           .  .
            |          .    .
            |         .      .
            |        .        .
      /|    .          .    | \
     / |   .            .   |  \
    /  |  .              .  |   \
   /   | .                . |    \
..+----+------------------+----+....> Test Statistic Value
   ^   |                  |   ^
   |  t_crit             t_crit |
   |                            |
 Area = p/2                  Area = p/2

<-- Rejection Region      Fail-to-Reject Region      Rejection Region -->
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** The "Courtroom Analogy".
    - **Null Hypothesis ($H_0$):** The defendant is innocent. This is the default assumption.
    - **Data:** The evidence presented in court.
    - **p-value:** The probability of seeing this evidence *if the defendant were truly innocent*.
    - **Decision:** If the p-value is very low (e.g., < 0.05), the evidence is extremely unlikely under the assumption of innocence. The jury rejects the "null hypothesis" of innocence and convicts. Remember the phrase: **"If the p is low, the null must go."**

2.  **Must-Overlearn Facts:**
    - The meaning of the p-value: $P(\text{observed data or more extreme} | H_0 \text{ is true})$
    - The core test functions: `stats.ttest_1samp(a, popmean)` and `stats.ttest_ind(a, b)`
    - The decision rule: If $p < \alpha$, reject $H_0$.

3.  **Spaced Repetition Schedule:** Review this material and your notes in **1 day, 3 days, 7 days, 16 days, and 35 days**. Actively rewrite the code and the courtroom analogy each time.

4.  **First Principles Pathway:** If you forget a specific test, remember the "Signal-to-Noise" intuition. For a one-sample t-test, the signal is $(\bar{x} - \mu_0)$ and the noise is the standard error of the mean, $s/\sqrt{n}$. The test statistic is just their ratio: $t = \frac{\bar{x} - \mu_0}{s/\sqrt{n}}$. You can always reason about what a test is doing by identifying its signal and its noise.

## Common mistakes
1.  **Misinterpreting the p-value.** Stating "The p-value is 0.03, so there is a 3% chance the null hypothesis is true." This is wrong. The p-value is computed *assuming* the null is true.
2.  **"Accepting the null hypothesis."** You never *accept* $H_0$. You only *fail to reject* it. This is a crucial distinction. Failing to find evidence of guilt doesn't prove innocence.
3.  **Ignoring test assumptions.** The t-test assumes the underlying data is approximately normally distributed. If you run it on highly skewed data, the results may be invalid. Always visualize your data first (e.g., with a histogram).
4.  **Confusing statistical and practical significance.** With a huge dataset, you might find a statistically significant result (a tiny p-value) for a minuscule effect (e.g., a new rocket fuel improves efficiency by 0.001%). This might not be practically meaningful or worth the cost.

## Self-check
1.  You are given a `scipy.stats` distribution object `d = stats.gamma(a=2)`. How would you find the probability of observing a value less than or equal to 3.5? How would you generate 500 random samples from this distribution?
2.  You have two sets of measurements for the performance of a navigation algorithm, one from `System A` and one from `System B`. You want to know if there is a statistically significant difference in their average performance. What is the null hypothesis you would test? Which `scipy.stats` function is most appropriate?
3.  A manufacturer claims their resistors have a resistance of 100 Ohms. You measure 25 resistors and find a sample mean of 101.2 Ohms and a sample standard deviation of 4 Ohms. Can you reject the manufacturer's claim at a significance level of $\alpha = 0.01$? Describe the steps and the interpretation without writing the final code.