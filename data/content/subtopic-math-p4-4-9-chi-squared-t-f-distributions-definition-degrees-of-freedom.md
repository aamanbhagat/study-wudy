## What it is
The Chi-squared ($\chi^2$), Student's t, and F-distributions are fundamental *sampling distributions* derived from the Normal distribution. They describe the distribution of statistics (like variance or mean) calculated from samples drawn from a normally distributed population. Their shapes are governed by a parameter called *degrees of freedom*, which quantifies the amount of independent information used to calculate the statistic.

## Why it matters
These distributions are the bedrock of classical hypothesis testing. The $\chi^2$ test is used for goodness-of-fit (e.g., in particle physics, checking if observed event counts match a theoretical model) and testing independence. The t-test is essential for comparing the means of two groups with small sample sizes, a common scenario in everything from A/B testing in machine learning to validating the thrust of a new rocket engine prototype. The F-distribution is central to Analysis of Variance (ANOVA), used to compare the means of multiple groups simultaneously and in regression analysis to test the overall significance of a model.

## When to study it
You must have a solid, working understanding of the following before proceeding:
1.  **Probability Density Functions (PDFs):** What they are, how to use them (integration to find probability), and the concept of a random variable.
2.  **The Normal Distribution:** Specifically, the standard normal distribution $Z \sim N(0, 1)$, its PDF, mean, and variance.
3.  **Sampling and Statistics:** The distinction between a population parameter (e.g., population mean $\mu$) and a sample statistic (e.g., sample mean $\bar{x}$).
4.  **Change of Variables Technique:** For deriving the distribution of a function of a random variable.

If you are not fluent in these, stop and review them now.

## How to study it (step by step)
1.  **Start with the parent.** Write down the PDF for a standard normal random variable, $Z \sim N(0,1)$. Square it: let $Y = Z^2$. Use the change of variables formula to derive the PDF of $Y$. You have just derived the $\chi^2_1$ distribution (Chi-squared with one degree of freedom).
2.  **Generalize to k dimensions.** Define a random variable $X = \sum_{i=1}^k Z_i^2$, where each $Z_i$ is an independent standard normal. This is the definition of a $\chi^2_k$ random variable with $k$ degrees of freedom. Intuitively, you are summing $k$ independent sources of squared error.
3.  **Construct the t-distribution.** Define a new random variable $T = \frac{Z}{\sqrt{X/k}}$, where $Z \sim N(0,1)$ and $X \sim \chi^2_k$ are independent. This is the definition of a t-distribution with $k$ degrees of freedom. Think of it as a standard normal, but where the variance is not known and must be estimated (the $\sqrt{X/k}$ term is related to a sample standard deviation).
4.  **Construct the F-distribution.** Define $F = \frac{U/d_1}{V/d_2}$, where $U \sim \chi^2_{d_1}$ and $V \sim \chi^2_{d_2}$ are independent. This is the F-distribution with $d_1$ and $d_2$ degrees of freedom. You are comparing two independent estimates of variance.
5.  **Connect to statistics.** For each distribution, find the corresponding sample statistic. The sample variance formula leads to a $\chi^2$ distribution. The t-statistic $(\bar{x} - \mu)/(s/\sqrt{n})$ follows a t-distribution. The ratio of two sample variances follows an F-distribution. Work through the proofs.

## Key ideas, with intuition
1.  **The Normal Distribution is the Parent.** All three distributions are built from standard normal random variables ($Z \sim N(0,1)$). They describe the behavior of quantities you can compute from a sample taken from a normal population.
    *   $\chi^2$: Sum of squared normals. Think "sum of squared errors."
    *   $t$: A normal divided by the square root of a $\chi^2$. Think "signal-to-noise ratio when noise is estimated."
    *   $F$: Ratio of two $\chi^2$ variables. Think "ratio of two estimated variances."

2.  **Degrees of Freedom (d.f.) is the Number of Free Variables.** This is the most crucial concept. It's the number of independent pieces of information that go into calculating a statistic. If you have a sample of size $n$, you have $n$ independent data points. If you then calculate the sample mean $\bar{x}$, you have used up one degree of freedom. The quantity $\sum_{i=1}^n (x_i - \bar{x})^2$ has only $n-1$ degrees of freedom because if you know $\bar{x}$ and the first $n-1$ deviations, the last deviation is fixed.
    $$ \sum_{i=1}^n (x_i - \bar{x}) = 0 \implies (x_n - \bar{x}) = -\sum_{i=1}^{n-1} (x_i - \bar{x}) $$
    The last term is not free. This is why the sample variance uses $n-1$ in the denominator.

3.  **Shape Depends on Degrees of Freedom.** Low d.f. implies more uncertainty from a small sample, which changes the distribution's shape.
    *   **$\chi^2_k$:** Positively skewed. As $k \to \infty$, it approaches a Normal distribution by the Central Limit Theorem.
    *   **$t_k$:** Symmetric and bell-shaped like the Normal, but with "heavier tails." This means extreme values are more likely, reflecting the extra uncertainty from estimating the variance. As $k \to \infty$, the uncertainty in the variance estimate vanishes, and $t_k \to N(0,1)$.
    *   **$F_{d_1, d_2}$:** Positively skewed. Its shape is controlled by two d.f. parameters.

## Worked example
**Problem:** A rocket engine manufacturer claims their new engine has a mean thrust of 300 kN. A sample of $n=10$ engines is tested, yielding a sample mean $\bar{x} = 295$ kN and a sample standard deviation $s = 8$ kN. Is there significant evidence at the $\alpha = 0.05$ level to suggest the true mean thrust is less than 300 kN? Assume thrust is normally distributed.

**Solution:**
1.  **State Hypotheses.** We are testing a claim about the population mean $\mu$. The null hypothesis ($H_0$) is that the claim is true. The alternative hypothesis ($H_a$) is what we are trying to find evidence for.
    *   $H_0: \mu = 300$
    *   $H_a: \mu < 300$

2.  **Choose the Test Statistic.** The population standard deviation $\sigma$ is unknown; we only have the sample standard deviation $s$. The sample size is small ($n < 30$). This is the classic scenario for a one-sample t-test. The test statistic is:
    $$ t = \frac{\bar{x} - \mu_0}{s / \sqrt{n}} $$
    This statistic follows a t-distribution with $n-1$ degrees of freedom.

3.  **Calculate the Test Statistic.**
    *   Degrees of freedom: $df = n - 1 = 10 - 1 = 9$.
    *   Plug in the values:
        $$ t_{calc} = \frac{295 - 300}{8 / \sqrt{10}} = \frac{-5}{8 / 3.162} = \frac{-5}{2.53} \approx -1.976 $$

4.  **Determine the Critical Region.** We are conducting a one-tailed test (since $H_a: \mu < 300$) with a significance level of $\alpha = 0.05$. We need to find the critical value $t_{crit}$ from a t-distribution table with $df=9$ such that $P(T < t_{crit}) = 0.05$.
    *   Looking up $t_{0.05, 9}$ in a table, we find the critical value is $-1.833$. (The table gives $1.833$ for the upper tail; by symmetry, the lower tail critical value is negative).
    *   Our rejection region is any $t_{calc} \le -1.833$.

5.  **Make a Decision.**
    *   Our calculated t-statistic is $t_{calc} = -1.976$.
    *   Since $-1.976 < -1.833$, our test statistic falls into the rejection region.
    *   We reject the null hypothesis $H_0$.

6.  **Conclusion.** There is sufficient statistical evidence at the 5% significance level to conclude that the true mean thrust of the engine is less than 300 kN.

**Reflection:** Each step was necessary. Hypotheses framed the question. The choice of the t-test was dictated by the small sample size and unknown population variance. The calculation produced a standardized value ($t_{calc}$) that we could compare to a known theoretical distribution ($t_9$). The critical value defined the threshold for "unusualness," and our result crossed it, leading to a rejection of the initial claim.

## Diagrams
```text
      Chi-squared (χ²) Distributions             Student's t Distributions
      f(x)                                    f(t)
      ^                                       ^
      | k=1                                   |           k=1 (heavy tails)
 0.4 -+ .                                  0.4 -+-.         .
      |  '.                                   |   '.       .'
      |    ` . k=2                            |     ` . . '
 0.2 -+-----`-.                              0.2 -+------`.'------
      |         ` . k=5                       |      .'   '.  k=5
      |            `-.                        |   .'         '.
 0.0 -+---------------+------> x          0.0 -+--'-------------`----> t
      0               5                       -4      0       4
      (Skewed right, approaches              (Symmetric, approaches N(0,1)
       normal as k increases)                  as k increases)
```

## Memory technique — remember this forever
1.  **The Story: The Normal Family.**
    *   The parent is the Standard Normal, $Z$. He's perfect, mean 0, variance 1.
    *   $Z$ has children. When you square one, you get a $\chi^2_1$. It's a bit skewed and angry.
    *   When $k$ of these $\chi^2_1$ children get together, they form a $\chi^2_k$ distribution. The more of them there are, the more they behave like a well-adjusted (Normal) group.
    *   The **t**-distribution is a cautious child, $Z$, who doesn't know his own true variance. He has to estimate it by looking at his $\chi^2_k$ sibling, so he's less certain and has heavier tails in his distribution. $t = \frac{\text{Normal}}{\sqrt{\text{Chi-squared}/k}}$.
    *   The **F**-distribution is a family feud. It's the ratio of two $\chi^2$ siblings, each scaled by their d.f., arguing over who has more variance. $F = \frac{\chi^2_1/d_1}{\chi^2_2/d_2}$.

2.  **Formulas to Overlearn:**
    *   If $Z_i \sim N(0,1)$ are independent, then $\sum_{i=1}^k Z_i^2 \sim \chi^2_k$.
    *   If $Z \sim N(0,1)$ and $U \sim \chi^2_k$ are independent, then $T = \frac{Z}{\sqrt{U/k}} \sim t_k$.
    *   If $U \sim \chi^2_{d_1}$ and $V \sim \chi^2_{d_2}$ are independent, then $F = \frac{U/d_1}{V/d_2} \sim F_{d_1, d_2}$.

3.  **Spaced Repetition Schedule:** Review these definitions and the story at **1 day, 3 days, 7 days, 16 days, 35 days**. Do not just read them. Write them down from memory.

4.  **First Principles Pathway:** If you forget everything, start with $Z \sim N(0,1)$.
    *   How can I measure total squared error from a standard? Sum of squares: $\sum Z_i^2 \implies \chi^2$.
    *   How can I standardize a value if I have to estimate its standard deviation? Ratio of value to its estimated std. dev.: $Z / \sqrt{\hat{\sigma}^2} \implies t$.
    *   How can I compare two different error estimates? Ratio of variances: $\hat{\sigma}_1^2 / \hat{\sigma}_2^2 \implies F$.

## Common mistakes
1.  **Using $n$ for degrees of freedom instead of $n-1$.** When calculating sample variance or using a t-test, one degree of freedom is lost to estimating the sample mean. Remember the constraint.
2.  **Using a t-test when $\sigma$ is known.** If you know the true population standard deviation $\sigma$, you have more information. You should use the more powerful Z-test, $Z = (\bar{x} - \mu)/(\sigma/\sqrt{n})$. The t-test is specifically for when $\sigma$ is unknown.
3.  **Swapping numerator and denominator d.f. for the F-test.** The F-distribution $F_{d_1, d_2}$ is not the same as $F_{d_2, d_1}$. The numerator d.f. ($d_1$) always comes from the variance estimate in the numerator of the ratio.
4.  **Ignoring the normality assumption.** These tests are derived assuming the underlying population is normal. If the population is heavily skewed or non-normal, especially with small sample sizes, the results of these tests may be invalid.

## Self-check
1.  As the degrees of freedom $k \to \infty$, the $t_k$ distribution converges to which distribution? Explain intuitively why this happens.
2.  Let $X_1, \dots, X_6$ be independent random variables with $X_i \sim N(0,1)$. Let $U = X_1^2 + X_2^2$ and $V = X_3^2 + X_4^2 + X_5^2 + X_6^2$. What is the distribution of the random variable $Y = \frac{2U}{V}$?
3.  Derive the probability density function (PDF) for a $\chi^2_1$ random variable. Start with the PDF of $Z \sim N(0,1)$ and use the change of variable technique for $Y=Z^2$.