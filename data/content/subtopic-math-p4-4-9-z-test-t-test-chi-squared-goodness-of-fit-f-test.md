## What it is
The z-test, t-test, chi-squared test, and F-test are foundational tools in frequentist hypothesis testing. Each is a formal procedure for comparing observed data to a claim (a "hypothesis"), allowing us to decide if the observed effect is statistically significant or likely due to random chance. They differ based on the type of data (means, variances, or frequencies) and what is known about the underlying population (e.g., is its variance known?).

## Why it matters
These tests are the bedrock of scientific and engineering validation. In machine learning, they are used for A/B testing to determine if a new model is genuinely better than an old one. In aerospace, you would use a t-test to verify if a new alloy for a turbine blade has a significantly higher mean-time-to-failure, or an F-test to check if a new manufacturing process produces more *consistent* (less variable) rocket nozzle dimensions.

## When to study it
Before tackling these tests, you must have a firm grasp of the following. If you are not confident in these, pause and review them first.
*   **Descriptive Statistics:** Mean ($\mu, \bar{x}$), Variance ($\sigma^2, s^2$), Standard Deviation ($\sigma, s$).
*   **Probability Distributions:** The Normal (Gaussian) distribution is essential. You should also have been introduced to the Student's t, Chi-Squared ($\chi^2$), and F-distributions as sampling distributions.
*   **Central Limit Theorem (CLT):** Why the distribution of sample means tends to be normal, regardless of the population distribution, for large sample sizes.
*   **Hypothesis Testing Framework:** The logic of the null hypothesis ($H_0$) and alternative hypothesis ($H_a$), Type I and Type II errors, significance level ($\alpha$), and p-values.

## How to study it (step by step)
1.  **Build a Decision Tree:** Don't memorize each test in isolation. Create a flowchart or table that answers: "What am I comparing?" (means, variances, proportions, frequencies?) and "What do I know?" (population variance $\sigma^2$ known/unknown? sample size large/small?). This will guide you to the correct test.
2.  **Master the Test Statistic Formula:** For each test, identify the formula for its test statistic. Notice the pattern: many look like a "signal-to-noise" ratio: $ \frac{(\text{observed value}) - (\text{hypothesized value})}{\text{standard error}} $. Derive the standard error term for the z and t-tests from the properties of variance.
3.  **Connect Statistic to Distribution:** For each test, state clearly which probability distribution the test statistic follows *if the null hypothesis is true*. For a z-test, it's the standard normal $N(0,1)$. For a t-test, it's the t-distribution with $n-1$ degrees of freedom. This link is the entire basis for calculating the p-value.
4.  **Solve a One-Sample t-test by Hand:** Take a small dataset (e.g., 10 numbers). State a hypothesis about its mean. Calculate the sample mean and sample standard deviation. Compute the t-statistic. Look up the critical value in a t-table using your chosen $\alpha$ and degrees of freedom. Make a decision. This mechanical process builds deep understanding.
5.  **Contrast the z-test and t-test:** Plot a standard normal distribution. On the same axes, overlay a t-distribution with 2 degrees of freedom and another with 30 degrees of freedom. See how the t-distribution has "fatter tails" for small samples (reflecting more uncertainty) and converges to the normal distribution as the sample size increases.
6.  **Categorize the $\chi^2$ and F-tests:** Revisit your decision tree. Note that the $\chi^2$ test deals with categorical data (counts in bins), while the F-test deals with comparing variances. They answer different kinds of questions than the z/t-tests, which focus on means.

## Key ideas, with intuition
1.  **The Signal-to-Noise Ratio:** The core intuition for z- and t-tests is comparing a signal to background noise. The "signal" is the difference between what you observed ($\bar{x}$) and what you expected under the null hypothesis ($\mu_0$). The "noise" is the standard error of the sample mean, which measures how much you'd expect $\bar{x}$ to vary by random chance alone.
    $$ \text{Test Statistic} = \frac{\text{Signal}}{\text{Noise}} = \frac{\bar{x} - \mu_0}{\text{SE}} $$
    A large test statistic means you have a strong signal relative to the noise, suggesting the effect is real.

2.  **Known vs. Unknown Variance (z vs. t):** If you magically know the true population standard deviation $\sigma$, the Central Limit Theorem guarantees the distribution of the sample mean $\bar{x}$ is normal. The standard error is $\text{SE} = \sigma/\sqrt{n}$. This leads to the **z-test**. In reality, you almost never know $\sigma$. You must estimate it with the sample standard deviation $s$. This introduces extra uncertainty, especially for small samples. To account for this, we use the **t-distribution**, which has fatter tails than the normal distribution. The standard error is $\text{SE} = s/\sqrt{n}$.

3.  **Sum of Squared Deviations ($\chi^2$ test):** The chi-squared test for goodness of fit asks if the observed frequencies in several categories match some expected frequencies. The test statistic is a sum of normalized squared differences.
    $$ \chi^2 = \sum_{\text{all categories}} \frac{(O_i - E_i)^2}{E_i} $$
    Where $O_i$ is the observed count and $E_i$ is the expected count for category $i$. We square the difference so that deviations in either direction contribute positively. We divide by $E_i$ to scale the deviation relative to what was expected. A large $\chi^2$ value means the observations are far from the expectations.

4.  **Ratio of Variances (F-test):** The F-test is used to compare the variances of two different populations. The F-statistic is simply the ratio of the two sample variances.
    $$ F = \frac{s_1^2}{s_2^2} $$
    If the null hypothesis is true (that the population variances are equal, $\sigma_1^2 = \sigma_2^2$), then we'd expect the sample variances $s_1^2$ and $s_2^2$ to be close, and the F-statistic to be close to 1. An F-statistic far from 1 suggests the underlying population variances are different.

## Worked example
**Scenario:** A rocket engine component must withstand a mean pressure of 3500 psi. You take a sample of $n=16$ components from a new, cheaper manufacturing process and find a sample mean strength of $\bar{x} = 3460$ psi with a sample standard deviation of $s = 100$ psi. Is there statistically significant evidence at the $\alpha = 0.05$ level that the new process produces components with a different mean strength?

**1. State Hypotheses:**
*   Null Hypothesis $H_0$: The true mean strength is 3500 psi. ($\mu = 3500$)
*   Alternative Hypothesis $H_a$: The true mean strength is not 3500 psi. ($\mu \neq 3500$). This is a two-tailed test.

**2. Choose the Test:**
*   We are testing a single population mean.
*   The population standard deviation $\sigma$ is unknown; we only have the sample standard deviation $s$.
*   The sample size $n=16$ is small.
*   Therefore, we must use a **one-sample t-test**.

**3. Calculate the Test Statistic:**
The formula for the t-statistic is $t = \frac{\bar{x} - \mu_0}{s/\sqrt{n}}$.
$$ t = \frac{3460 - 3500}{100/\sqrt{16}} = \frac{-40}{100/4} = \frac{-40}{25} = -1.6 $$

**4. Determine the Critical Value:**
*   The significance level is $\alpha = 0.05$. Since it's a two-tailed test, we split this into two tails of area $\alpha/2 = 0.025$.
*   The degrees of freedom are $df = n - 1 = 16 - 1 = 15$.
*   Using a t-distribution table or calculator for $df=15$ and an upper tail area of 0.025, we find the critical t-value: $t_{crit} = \pm 2.131$.

**5. Make a Decision:**
We compare our calculated t-statistic, $t = -1.6$, to the critical region, which is any value less than $-2.131$ or greater than $+2.131$.
Since $-2.131 < -1.6 < +2.131$, our test statistic does not fall in the rejection region.

**6. State the Conclusion:**
At the $\alpha=0.05$ significance level, there is not sufficient evidence to conclude that the new manufacturing process produces components with a mean strength different from 3500 psi. We fail to reject the null hypothesis.

**Reflection:** Each step was necessary. Stating the hypotheses defined the goal. Choosing the test identified the right tool based on the problem's constraints (unknown $\sigma$, small $n$). The calculation produced our evidence (the t-statistic). The critical value set our threshold for significance. The final comparison led to a clear, evidence-based conclusion.

## Diagrams
Here is a diagram showing how the t-distribution (for a small sample) compares to the standard normal (z) distribution. The t-distribution has "fatter tails," meaning extreme values are more likely, which reflects the added uncertainty from having to estimate the population standard deviation.

```text
       ^
       |
 P(x)  |                  ..
       |                .    .
       |               .      .
       |              .        .  <-- Standard Normal (z)
       |             .          .
       |           .. .. .. .. .. ..
       |          . .          . .  . <-- t-distribution (df=3)
       |         .   .        .   .
       |       ..     .      .     ..
       |......'.......'......'.......'......>
                                       x
            <-- Fatter tails -->
```

Here is a diagram of a chi-squared ($\chi^2$) distribution. Note that it is not symmetric and is only defined for positive values, as it's based on a sum of squares.

```text
       ^
 P(x)  |
       |         ,--.
       |       ,'    `.
       |      /        `.
       |     /            `.
       |    /                `-.
       |   /                      `-.
       |__/__________________________`-->
       0                                x (value of chi-squared)
```

## Memory technique — remember this forever
1.  **The "Statistical Consultant" Story:** Imagine you're a consultant and a client brings you a problem. Your first questions determine the tool you use:
    *   "Are you comparing **C**ategories/Counts?" -> Use **C**hi-Squared ($\chi^2$).
    *   "Are you comparing the means? Do you know the **Z**ealously-guarded true population variance?" -> If yes, use **Z**-test. (This is rare).
    *   "No? Is your sample size **T**iny?" -> Use **T**-test. (This is common).
    *   "Are you comparing how much two groups **F**luctuate (their variances)?" -> Use **F**-test.

2.  **Must-Overlearn Formulas:**
    *   z-statistic: $ z = \frac{\bar{x} - \mu_0}{\sigma/\sqrt{n}} $
    *   t-statistic: $ t = \frac{\bar{x} - \mu_0}{s/\sqrt{n}} $
    *   $\chi^2$-statistic: $ \chi^2 = \sum \frac{(O - E)^2}{E} $

3.  **Spaced Repetition Schedule:** Review these concepts and re-do the worked example at: 1 day, 3 days, 7 days, 16 days, 35 days. On each review, try to recreate the "Statistical Consultant" story and the decision process from scratch.

4.  **First Principles Pathway:** If you forget everything, remember the "Signal-to-Noise" ratio. The numerator is always `(what you saw) - (what you expected)`. The denominator is a measure of the random error in your measurement. For means, this error is the standard error of the mean. For the z-test, you know the true source of error ($\sigma$). For the t-test, you have to estimate it ($s$), which is why the distribution changes.

## Common mistakes
*   **Using a z-test when $\sigma$ is unknown:** This is the most common error. If you are using the sample standard deviation ($s$), you *must* use a t-test, especially if the sample size is small. Using a z-test will make you overconfident in your results (smaller p-values) because it ignores the uncertainty in estimating $\sigma$.
*   **Confusing one-tailed and two-tailed tests:** If the research question is "is the new alloy *stronger*?", that's a one-tailed test ($H_a: \mu > \mu_0$). If the question is "is the new alloy *different*?", that's a two-tailed test ($H_a: \mu \neq \mu_0$). Your choice affects the critical value and p-value.
*   **Ignoring assumptions:** These tests assume the data is sampled randomly. The z-test and t-test also assume the underlying data is approximately normally distributed (or the sample size is large enough for the CLT to apply). The $\chi^2$ test assumes expected counts in each category are not too small (e.g., > 5). Violating these assumptions invalidates your conclusions.

## Self-check
1.  An engineer claims a new battery for a satellite has a mean life of exactly 15 years. You test 121 batteries and find a sample mean of 14.8 years with a sample standard deviation of 0.9 years. Which test should you use to evaluate her claim and why?
2.  A quality control process for carbon fiber sheets specifies that the variance in thickness must not exceed 0.05 mm$^2$. You sample a batch from Supplier A and find a sample variance of 0.061 mm$^2$. You sample a batch from Supplier B and find a sample variance of 0.045 mm$^2$. Which test would you use to determine if the variability in thickness is significantly different between the two suppliers?
3.  A simulation of particle decay predicts that out of 1000 trials, you will observe 60% Type A decays, 30% Type B, and 10% Type C. An actual experiment is run, and you observe 580 Type A, 330 Type B, and 90 Type C decays. Set up the null hypothesis and the formula for the test statistic you would use to determine if the experimental results are consistent with the simulation's predictions.