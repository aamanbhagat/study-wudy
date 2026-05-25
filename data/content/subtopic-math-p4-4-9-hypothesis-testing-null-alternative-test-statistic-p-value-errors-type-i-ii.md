## What it is
Hypothesis testing is a formal statistical method used to make decisions based on data. We start with a claim about a population, called the null hypothesis (the "default" or "no effect" state), and use sample data to determine if there is enough evidence to reject that claim in favor of an alternative hypothesis.

## Why it matters
This is the core logic behind scientific discovery and data-driven decision-making. In aerospace, you'll use it to determine if a new alloy is genuinely stronger or if a new flight control algorithm is truly more stable. In machine learning, it's the foundation of A/B testing, used to prove that a new model is a significant improvement, not just a lucky fluke on a test set.

## When to study it
You must be fluent in the following prerequisites. If not, master them first.
*   **Probability Distributions:** Specifically the Normal (Gaussian), Student's t, and Chi-squared distributions. You need to understand their parameters, probability density functions (PDFs), and how to find probabilities associated with them.
*   **Sampling Distributions & The Central Limit Theorem (CLT):** You must understand that a statistic calculated from a sample (like the sample mean, $\bar{X}$) has its own probability distribution. The CLT is the foundation for why we can often use the Normal distribution for this.
*   **Confidence Intervals:** Hypothesis testing and confidence intervals are two sides of the same coin. Understanding how to construct an interval estimate for a parameter is essential background.

## How to study it (step by step)
1.  **Frame the Hypotheses.** Find 5 real-world questions (e.g., "Does this new fertilizer increase crop yield?"). For each, write the null hypothesis ($H_0$) and alternative hypothesis ($H_a$ or $H_1$). Focus on making them precise, mutually exclusive, and testable (e.g., $H_0: \mu_{\text{new}} \le \mu_{\text{old}}$ vs. $H_a: \mu_{\text{new}} > \mu_{\text{old}}$).
2.  **Calculate a Test Statistic.** Take a simple dataset and the formula for a one-sample z-test. Calculate the test statistic. Your goal is to understand how it standardizes your sample result, mapping it onto a familiar distribution (the standard normal).
3.  **Find the p-value.** Using a z-table or statistical software, find the p-value for the test statistic you just calculated. Draw the normal curve and shade the area corresponding to this p-value. Verbally state the definition: "The probability of observing a result this extreme or more extreme, *if the null hypothesis were true*."
4.  **Draw a Conclusion.** Compare your p-value to a pre-determined significance level, $\alpha$ (e.g., 0.05). Practice writing the two-part conclusion: (1) The statistical decision ("We reject $H_0$") and (2) The contextual interpretation ("There is sufficient evidence to conclude that the fertilizer increases crop yield.").
5.  **Visualize the Errors.** Draw two overlapping normal distributions. Label one "$H_0$ is true" and the other "$H_a$ is true." On the $H_0$ distribution, shade the rejection region and label it $\alpha$ (Type I error). On the $H_a$ distribution, shade the area where you would fail to reject $H_0$ and label it $\beta$ (Type II error). This visualizes the inherent trade-off.

## Key ideas, with intuition
1.  **The Null Hypothesis ($H_0$) is the "Status Quo".**
    Think of $H_0$ as the boring, default state of the world: no effect, no change, no difference. We assume it's true, and the burden of proof is on the data to convince us otherwise. For example, $H_0: \mu = 50$ claims the population mean is 50. The alternative hypothesis, $H_a$, is what we suspect might be true instead (e.g., $H_a: \mu \neq 50$).

2.  **The Test Statistic Measures "Surprise".**
    This is a single number that quantifies how far your sample data deviates from what the null hypothesis predicted. A test statistic far from zero implies a "surprising" result if $H_0$ were true. The general structure is:
    $$ \text{Test Statistic} = \frac{\text{Observed Sample Statistic} - \text{Hypothesized Population Parameter}}{\text{Standard Error of the Statistic}} $$

3.  **The p-value is the "Probability of Surprise".**
    The p-value is the probability of observing a test statistic as extreme or *more extreme* than yours, *under the assumption that the null hypothesis is true*. It is **not** the probability that $H_0$ is true. A small p-value (e.g., 0.01) means your data is highly unlikely under the null hypothesis, providing evidence against it.

4.  **Errors are Unavoidable and a Trade-off.**
    We make decisions with incomplete (sample) data, so we can be wrong.
    *   **Type I Error (False Positive):** You reject $H_0$ when it was actually true. The probability of this is your chosen significance level, $\alpha$. This is like a false alarm.
    *   **Type II Error (False Negative):** You fail to reject $H_0$ when it was actually false. The probability of this is $\beta$. This is a missed discovery.
    *   Decreasing your tolerance for one type of error (e.g., lowering $\alpha$) necessarily increases the probability of the other ($\beta$), all else being equal.

## Worked example
**Problem:** A supplier of bolts for a rocket assembly claims their bolts have a mean shearing strength of 75.5 ksi. You test a random sample of $n=36$ bolts and find a sample mean strength of $\bar{x} = 74.8$ ksi. From historical data, the population standard deviation is known to be $\sigma = 3$ ksi. Is there sufficient evidence at the $\alpha = 0.01$ significance level to conclude that the true mean strength is *less than* 75.5 ksi?

**Step 1: State Hypotheses.**
The claim we want to find evidence *for* is the alternative.
*   Null Hypothesis ($H_0$): The true mean strength is 75.5 ksi or greater. $H_0: \mu \ge 75.5$.
*   Alternative Hypothesis ($H_a$): The true mean strength is less than 75.5 ksi. $H_a: \mu < 75.5$. (This is a one-tailed, left-tailed test).

**Step 2: Choose Test and Significance Level.**
*   The population standard deviation $\sigma$ is known, and $n > 30$, so we use a one-sample z-test.
*   Significance level is given: $\alpha = 0.01$.

**Step 3: Calculate the Test Statistic.**
*   The formula for the z-statistic is $z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}$.
*   Plugging in our values: $\bar{x} = 74.8$, $\mu_0 = 75.5$, $\sigma = 3$, $n = 36$.
    $$ z = \frac{74.8 - 75.5}{3 / \sqrt{36}} = \frac{-0.7}{3 / 6} = \frac{-0.7}{0.5} = -1.40 $$

**Step 4: Determine the p-value.**
*   We want the probability of getting a z-statistic as extreme or more extreme than -1.40. Since this is a left-tailed test, this is the area to the left of -1.40 on the standard normal curve.
*   $p\text{-value} = P(Z \le -1.40)$.
*   Using a standard normal table or calculator, this probability is approximately $0.0808$.

**Step 5: Make a Decision.**
*   Compare the p-value to $\alpha$. Here, $0.0808 > 0.01$.
*   Since the p-value is greater than the significance level, we fail to reject the null hypothesis.

**Step 6: State the Conclusion.**
*   At the $\alpha = 0.01$ level of significance, there is not sufficient statistical evidence to conclude that the true mean shearing strength of the bolts is less than 75.5 ksi. The observed lower sample mean could plausibly be due to random sampling variability.

**Reflection:** The hypotheses in Step 1 defined the goal. The test statistic in Step 3 quantified our evidence as a standardized score. The p-value in Step 4 translated that score into a probability, which we compared against our pre-defined threshold ($\alpha$) in Step 5 to make an objective decision, which was then translated back to the real world in Step 6.

## Diagrams
A one-tailed test visualization:
```text
      Probability Density
           ^
           |
           |         .:::.
           |       .:'   ':.
           |      :/       \:         <-- Standard Normal Curve (Z-dist)
           |     ::         ::             (Mean=0, SD=1)
       ....|..../:...........:\....
       '   |   / |           | \   '
       .   |  /  |           |  \  .
   --------+-----------------------+---------> Z-score
          -3  -2      -1      0   1   2   3

Shaded Area = p-value = P(Z <= -1.40) = 0.0808
   <--|
      z = -1.40
(our test statistic)
```

Type I ($\alpha$) and Type II ($\beta$) errors:
```text
           Dist. if H0 is True        Dist. if Ha is True
                  / \                        / \
                 /   \                      /   \
                /     \..'.                /     \
               /       '.' \              /       \
              /         '..'\            /         \
             /           '.'.\          /           \
------------|-------------C--|----------|------------> Measured Value
            |             ^  |          |
            |   (Fail to  |  (Reject H0) |
            |   Reject H0)|              |
                          |
                   Critical Value

Area under H0 curve to the right of C = alpha (Type I Error)
Area under Ha curve to the left of C  = beta (Type II Error)
```

## Memory technique — remember this forever
1.  **The Courtroom Analogy:**
    *   **Null Hypothesis ($H_0$):** The defendant is innocent. (This is the default assumption).
    *   **Data:** The evidence presented in court.
    *   **Alternative Hypothesis ($H_a$):** The defendant is guilty.
    *   **Reject $H_0$:** Convict the defendant. You only do this if the evidence is "beyond a reasonable doubt."
    *   **"Reasonable Doubt" Threshold:** The significance level, $\alpha$. A small p-value means the evidence is very unlikely if the defendant were innocent, so you convict.
    *   **Type I Error:** Convicting an innocent person.
    *   **Type II Error:** Letting a guilty person go free.

2.  **Must-Overlearn Formulas:**
    *   General Test Statistic: $ \text{Test Stat} = \frac{\text{Statistic} - \text{Parameter}}{\text{Std. Error}} $
    *   The Golden Rule: If $p\text{-value} < \alpha$, Reject $H_0$.

3.  **Spaced Repetition Schedule:**
    Review this entire lesson at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Actively solve a new problem at each review.

4.  **First Principles Pathway:**
    If you forget the formula for a test statistic, rebuild it from the Central Limit Theorem. The CLT says $\bar{X} \sim \mathcal{N}(\mu, \sigma^2/n)$. To standardize this, you subtract the mean and divide by the standard deviation:
    $$ Z = \frac{\bar{X} - \mu_{\bar{X}}}{\sigma_{\bar{X}}} = \frac{\bar{X} - \mu}{\sigma/\sqrt{n}} $$
    This is the z-test statistic. All other test statistics follow this same fundamental logic of standardizing a sample result.

## Common mistakes
*   **Misinterpreting the p-value.** Stating "The p-value is 0.03, so there is a 3% chance the null hypothesis is true." **WRONG.** The correct statement is: "If the null hypothesis were true, there would be a 3% chance of observing data this extreme or more extreme."
*   **"Accepting" the Null Hypothesis.** You never accept $H_0$. You either "reject $H_0$" or "fail to reject $H_0$." Failing to find evidence of guilt does not prove innocence. Your sample may have been too small or the effect too weak to detect.
*   **Confusing Statistical vs. Practical Significance.** With a massive dataset, you can find a statistically significant result (p < 0.05) for a minuscule, meaningless effect. A new rocket nozzle that improves efficiency by 0.001% might be statistically significant but is not practically significant.
*   **Forgetting to check assumptions.** Using a t-test assumes the underlying data is approximately normal, especially for small samples. Applying a test without verifying its assumptions invalidates your conclusion.

## Self-check
1.  You are testing a new composite material. $H_0$: "The new material is not stronger than the old material." You run an experiment and your analysis yields a p-value of 0.45. Using a significance level of $\alpha=0.05$, what is your statistical decision and what is your conclusion in the context of the problem?
2.  A space agency is testing a critical life-support component. Failure means loss of life. They set up a hypothesis test: $H_0$: "The component meets the minimum safety standard." In this scenario, which is the more dangerous error: Type I or Type II? Should they use a very small $\alpha$ (e.g., 0.001) or a larger one (e.g., 0.10)? Justify your choice by describing the real-world consequence of each error.
3.  You believe a new manufacturing process reduces the variance $\sigma^2$ in the diameter of a bearing. The old variance was $\sigma_0^2 = 0.25 \text{ mm}^2$. You sample 20 new bearings and find a sample variance of $s^2 = 0.15 \text{ mm}^2$. The test statistic for this (a Chi-squared test for variance) is $\chi^2 = \frac{(n-1)s^2}{\sigma_0^2}$. Calculate the test statistic. Given your result, would you expect the p-value to be large or small? Why?