## 1. What it is — in plain English

Imagine you're trying to measure something in the real world, but everything is a bit random. Maybe you're counting how many heads you get from flipping a coin, or trying to figure out the average height of students in a new school. Because of this randomness, your measurements will vary.

Now, sometimes you need special "rulers" or "measuring sticks" to understand just how much this randomness is affecting your conclusions. That's where the Chi-squared, t, and F distributions come in. They are specific probability distributions that act like these specialized rulers, each designed for a particular kind of random measurement or comparison.

Think of them as tools in a statistician's toolbox. The **Chi-squared ($\chi^2$) distribution** is like a ruler you use when you're counting things and want to see if your observed counts match what you'd expect by chance. The **t-distribution** is like a ruler you use when you're trying to figure out an average from a small sample of data, especially when you're unsure about the true spread of the entire population. And the **F-distribution** is your ruler for comparing the "spread" or variability of two different groups of data.

Each of these rulers has a "knob" called **degrees of freedom**. This knob changes the shape of the ruler, making it more or less sensitive depending on how much information you have (usually related to your sample size). The more information you have, the more precise your ruler becomes, and its shape gets closer to a simpler, ideal distribution like the normal distribution.

## 2. Why it matters — real-world applications

These distributions are not just abstract mathematical constructs; they are fundamental tools used across science, engineering, business, and daily life to make informed decisions based on data.

1.  **A/B Testing in Software Development (t-distribution):** Companies like Google, Amazon, and Netflix constantly run A/B tests to optimize their websites and apps. For example, they might show half their users a new button design (Version A) and the other half the old design (Version B). The t-distribution is crucial for determining if a small observed difference in user engagement (e.g., click-through rates, conversion rates) between A and B is statistically significant or just due to random chance, especially when dealing with limited test periods or user segments. This helps decide whether to roll out a new feature or revert to an old one.

2.  **Quality Control and Manufacturing (F-distribution):** In aerospace manufacturing, precision is paramount. Suppose Boeing is sourcing a critical component from two different suppliers. They need to ensure not only that the components meet average specifications but also that their variability (consistency) is acceptable and comparable between suppliers. The F-distribution is used to compare the variances of measurements (e.g., thickness, tensile strength) from samples taken from each supplier. If one supplier's components show significantly higher variability, it indicates an issue with their production process, potentially leading to critical failures in aircraft.

3.  **Genetic Research and Medical Trials (Chi-squared distribution):** Biologists and pharmaceutical companies frequently use the Chi-squared distribution. In genetics, it's used to test if observed frequencies of genotypes or phenotypes in offspring fit expected Mendelian ratios. For example, after crossing two plants, if you expect a 3:1 ratio of purple to white flowers, you count the actual flowers and use a Chi-squared test to see if your observed counts are significantly different from the expected ratio, suggesting a deviation from Mendelian inheritance. In clinical trials, it can be used to compare the proportion of patients experiencing a side effect in a drug group versus a placebo group.

4.  **Machine Learning Model Comparison (F-distribution & t-distribution):** In advanced machine learning, when comparing the performance of different models (e.g., comparing a new neural network architecture against an existing one for image classification), researchers often use statistical tests. If comparing the overall variance explained by different regression models, the F-distribution is key (e.g., in an ANOVA test comparing multiple models). When comparing the mean prediction error of two specific models on different datasets, the t-distribution might be employed to ascertain if one model genuinely outperforms the other or if observed differences are merely random.

5.  **Astrophysics and Measurement Error (t-distribution):** When astrophysicists measure properties of distant stars or galaxies (e.g., luminosity, redshift), their measurements always come with uncertainty. Often, they have a limited number of observations or indirect measurements. If they want to estimate the true mean value of a stellar property and construct a confidence interval around it, especially when the true population variance of these measurements is unknown, the t-distribution is the appropriate tool. It allows them to account for the additional uncertainty introduced by estimating the variance from a small sample.

## 3. Prerequisites — what you must know first

To fully grasp the Chi-squared, t, and F distributions, you should have a solid understanding of the following foundational concepts:

*   **Probability Basics:** The fundamental rules of probability, including sample spaces, events, probability axioms, conditional probability, and independence.
*   **Random Variables:** Understanding discrete and continuous random variables, their probability mass functions (PMF) and probability density functions (PDF), and cumulative distribution functions (CDF).
*   **Expectation and Variance:** How to calculate the expected value (mean) and variance of a random variable, which describe its central tendency and spread.
*   **Common Distributions:** Familiarity with key probability distributions, especially:
    *   **Bernoulli Distribution:** For binary outcomes (success/failure).
    *   **Binomial Distribution:** For the number of successes in a fixed number of Bernoulli trials.
    *   **Poisson Distribution:** For the number of events in a fixed interval of time or space.
    *   **Uniform Distribution:** Where all outcomes in an interval are equally likely.
    *   **Normal (Gaussian) Distribution:** The ubiquitous bell-shaped curve, its properties, and its importance.
*   **Standard Normal Distribution ($Z$):** A normal distribution with mean 0 and variance 1, often denoted $Z \sim N(0,1)$. This is the building block for all three distributions discussed here.
*   **Central Limit Theorem (CLT):** The theorem stating that the distribution of sample means (or sums) approaches a normal distribution as the sample size increases, regardless of the original population distribution.
*   **Law of Large Numbers (LLN):** The theorem stating that as the sample size grows, the sample mean converges to the true population mean.
*   **Sampling Distributions:** The concept that a statistic (like the sample mean or sample variance) itself has a probability distribution when samples are repeatedly drawn from a population.
*   **Hypothesis Testing:** The framework for making decisions about population parameters based on sample data, including null and alternative hypotheses, p-values, significance levels, and Type I/II errors.
*   **Point Estimation and Confidence Intervals:** How to estimate population parameters from sample statistics and how to construct intervals that likely contain the true parameter value.

If any of these concepts are unfamiliar, it is strongly recommended to pause and review them thoroughly before proceeding.

## 4. The core idea — step by step

Let's build these distributions from the ground up, starting with their fundamental building block: the standard normal distribution.

### ### Step 1: The Standard Normal Distribution ($Z$) - The Fundamental Building Block

*   **Plain English Statement:** Imagine a perfectly balanced, symmetrical bell curve. This is the standard normal distribution. It describes a random variable that tends to cluster around a central value of zero, with its spread standardized to one unit. It's the simplest, most fundamental form of the famous "bell curve."

*   **Small Concrete Example:** Think of standardized test scores, like an IQ score, where the average is set to 100 and the standard deviation to 15. If you convert an individual's IQ score to a Z-score, it tells you how many standard deviations away from the average their score is. A person with an IQ of 115 would have a Z-score of $+1$. A Z-score of 0 means exactly average.

*   **Formal/Mathematical Version:** A random variable $Z$ follows a standard normal distribution if its probability density function (PDF) is given by:
    $$ f_Z(z) = \frac{1}{\sqrt{2\pi}} e^{-z^2/2} \quad \text{for } -\infty < z < \infty $$
    We denote this as $Z \sim N(0, 1)$, where $0$ is the mean and $1$ is the variance (and thus the standard deviation).

*   **What Could Go Wrong:** Assuming that *any* bell-shaped distribution is a standard normal. The standard normal has specific parameters: mean 0 and variance 1. Other normal distributions have different means and variances. Also, assuming that data *is* normally distributed when it's not, which can invalidate many statistical tests built upon this assumption.

### ### Step 2: The Chi-squared ($\chi^2$) Distribution - The Sum of Squared Standard Normals

*   **Plain English Statement:** What if you take several independent standard normal variables, square each one (making them all positive), and then add them all up? The distribution of this sum is the Chi-squared distribution. The "degrees of freedom" for this distribution is simply the number of independent standard normal variables you added together. It's always positive, and its shape is skewed to the right, especially for small degrees of freedom.

*   **Small Concrete Example:** Imagine you have three different, very precise, digital thermometers. Each thermometer has tiny, independent random errors that follow a standard normal distribution. If you take a reading from each, square its error value, and sum these three squared errors, the resulting total error will follow a Chi-squared distribution with 3 degrees of freedom. This sum gives you a sense of the total squared "noise" from these three sources.

*   **Formal/Mathematical Version:** Let $Z_1, Z_2, \dots, Z_k$ be $k$ independent and identically distributed (i.i.d.) standard normal random variables, i.e., $Z_i \sim N(0,1)$ for $i=1, \dots, k$.
    Then the random variable $X$ defined as the sum of their squares:
    $$ X = \sum_{i=1}^k Z_i^2 $$
    is said to follow a Chi-squared distribution with $k$ degrees of freedom. We denote this as $X \sim \chi^2(k)$.

    The probability density function (PDF) for a $\chi^2(k)$ distribution is:
    $$ f_X(x; k) = \frac{1}{2^{k/2} \Gamma(k/2)} x^{k/2 - 1} e^{-x/2} \quad \text{for } x > 0 $$
    where $\Gamma(\cdot)$ is the Gamma function.
    The mean of a $\chi^2(k)$ distribution is $E[X] = k$, and its variance is $Var[X] = 2k$.

*   **What Could Go Wrong:** The most common mistake is miscounting the degrees of freedom ($k$). Also, if the underlying variables are not truly independent or not truly standard normal, the resulting sum will not follow a Chi-squared distribution. For instance, if you're using sample variance, the sum of squared deviations from the *sample mean* uses $n-1$ degrees of freedom, not $n$, because one degree of freedom is "lost" in estimating the mean.

### ### Step 3: The t-distribution - Normal Divided by Scaled Chi-squared

*   **Plain English Statement:** Sometimes you want to estimate the average of something (like the average height of a population) from a small sample. If you knew the *true* spread (standard deviation) of the entire population, you'd use the standard normal distribution. But usually, you don't know it, so you have to *estimate* the spread from your sample. This extra estimation introduces more uncertainty. The t-distribution is designed for this scenario: it's like a standard normal distribution but with "fatter tails," meaning it assigns more probability to extreme values, reflecting that increased uncertainty. As your sample size (and thus degrees of freedom) grows, your estimate of the spread gets better, and the t-distribution's tails get thinner, eventually looking just like the standard normal distribution.

*   **Small Concrete Example:** You want to know the average weight of a specific type of apple from a large orchard, but you can only pick 10 apples. You calculate the average weight and the standard deviation from these 10 apples. To construct a confidence interval for the true average weight of *all* apples in the orchard, you'd use the t-distribution with $10-1 = 9$ degrees of freedom because you're using the sample standard deviation as an estimate for the unknown population standard deviation.

*   **Formal/Mathematical Version:** Let $Z$ be a standard normal random variable ($Z \sim N(0,1)$), and let $X$ be a Chi-squared random variable with $k$ degrees of freedom ($X \sim \chi^2(k)$). Assume $Z$ and $X$ are independent.
    Then the random variable $T$ defined as:
    $$ T = \frac{Z}{\sqrt{X/k}} $$
    is said to follow Student's t-distribution with $k$ degrees of freedom. We denote this as $T \sim t(k)$.

    The probability density function (PDF) for a $t(k)$ distribution is:
    $$ f_T(t; k) = \frac{\Gamma((k+1)/2)}{\sqrt{k\pi}\Gamma(k/2)} \left(1 + \frac{t^2}{k}\right)^{-(k+1)/2} \quad \text{for } -\infty < t < \infty $$
    The mean of a $t(k)$ distribution is $E[T] = 0$ for $k > 1$. Its variance is $Var[T] = \frac{k}{k-2}$ for $k > 2$. (Note: for $k=1$, the t-distribution is the Cauchy distribution, which has no defined mean or variance).

*   **What Could Go Wrong:** Using the t-distribution when the population standard deviation is *known* (in which case, the Z-distribution is appropriate). Also, miscalculating the degrees of freedom (typically $n-1$ for a single sample mean, or more complex for two-sample tests). Assuming the underlying data is approximately normal when it's highly skewed or has extreme outliers can invalidate the t-test, especially for small samples.

### ### Step 4: The F-distribution - The Ratio of Scaled Chi-squareds

*   **Plain English Statement:** Suppose you want to compare the "spread" or "consistency" of two different things – for example, two different manufacturing processes, or two different teaching methods. You can do this by looking at the ratio of their variances. Since variances are based on sums of squared errors (which relate to Chi-squared distributions), the F-distribution is what you get when you take the ratio of two independent Chi-squared variables, each scaled by its own degrees of freedom. It tells you if one group's variability is significantly different from another's. Like the Chi-squared, it's always positive and typically skewed to the right.

*   **Small Concrete Example:** A car manufacturer wants to compare the consistency of tire wear from two different tire brands. They test 10 tires from Brand A and 12 tires from Brand B. They measure the variance in tread depth reduction for each brand. To see if Brand A's tires are significantly more or less consistent than Brand B's, they would calculate the ratio of their sample variances. This ratio would follow an F-distribution with two sets of degrees of freedom: $10-1=9$ for the numerator (Brand A) and $12-1=11$ for the denominator (Brand B).

*   **Formal/Mathematical Version:** Let $X_1$ be a Chi-squared random variable with $k_1$ degrees of freedom ($X_1 \sim \chi^2(k_1)$), and let $X_2$ be an independent Chi-squared random variable with $k_2$ degrees of freedom ($X_2 \sim \chi^2(k_2)$).
    Then the random variable $F$ defined as the ratio of these scaled Chi-squared variables:
    $$ F = \frac{X_1/k_1}{X_2/k_2} $$
    is said to follow an F-distribution with $k_1$ numerator degrees of freedom and $k_2$ denominator degrees of freedom. We denote this as $F \sim F(k_1, k_2)$.

    The probability density function (PDF) for an $F(k_1, k_2)$ distribution is quite complex, involving the Beta function, but its general form is:
    $$ f_F(f; k_1, k_2) = \frac{\sqrt{\frac{(k_1 f)^{k_1} k_2^{k_2}}{(k_1 f + k_2)^{k_1+k_2}}}}{f \cdot B(k_1/2, k_2/2)} \quad \text{for } f > 0 $$
    where $B(x,y)$ is the Beta function.
    The mean of an $F(k_1, k_2)$ distribution is $E[F] = \frac{k_2}{k_2-2}$ for $k_2 > 2$.

*   **What Could Go Wrong:** The most critical error is assuming that the two Chi-squared variables (and thus the underlying sample variances) are independent when they are not. Incorrectly assigning $k_1$ and $k_2$ (numerator vs. denominator degrees of freedom) is also a common mistake, as the F-distribution is not symmetric. The order matters significantly for interpreting critical values. Also, the F-test is sensitive to departures from normality in the underlying data, especially for small sample sizes.

### ### Step 5: Degrees of Freedom (df) - The "Knob"

*   **Plain English Statement:** Degrees of freedom (df) is a fancy term for the number of values in a calculation that are "free to vary." Think of it as the amount of independent information you have available to estimate a parameter. When you estimate something from data, you often "use up" some of your independent pieces of information. For example, if you have 10 numbers and you know their average, only 9 of those numbers can be chosen freely; the 10th one is then fixed to make the average correct. So, you have 9 degrees of freedom. The more degrees of freedom you have, the more information you have, and the more precise your statistical estimates and tests become.

*   **Small Concrete Example:** Suppose you have a sample of $n=5$ observations: $x_1, x_2, x_3, x_4, x_5$. If you want to estimate the population mean, you calculate the sample mean $\bar{x}$. Now, if you want to calculate the sample variance, which involves deviations from the sample mean, $(x_i - \bar{x})^2$:
    You know that $\sum_{i=1}^n (x_i - \bar{x}) = 0$.
    So, if you know $(x_1 - \bar{x}), (x_2 - \bar{x}), (x_3 - \bar{x}), (x_4 - \bar{x})$, the last deviation $(x_5 - \bar{x})$ is automatically determined because they must sum to zero. Thus, only $n-1 = 4$ of these deviations are "free to vary." So, the sample variance has $n-1$ degrees of freedom.

*   **Formal/Mathematical Version:** In statistical modeling, degrees of freedom are generally calculated as:
    $$ \text{df} = (\text{number of independent observations}) - (\text{number of parameters estimated from the data}) $$
    For the distributions we've discussed:
    *   **Chi-squared ($\chi^2(k)$):** $k$ is typically the number of independent standard normal variables summed, or the number of categories minus the number of constraints (e.g., $(R-1)(C-1)$ for a contingency table, or $n-1$ for sample variance).
    *   **t-distribution ($t(k)$):** $k$ is typically related to the sample size minus the number of parameters estimated. For a one-sample t-test, $k = n-1$. For a two-sample t-test, it can be more complex, often approximated or calculated with Welch-Satterthwaite equation.
    *   **F-distribution ($F(k_1, k_2)$):** It has two degrees of freedom parameters. $k_1$ for the numerator and $k_2$ for the denominator, each calculated based on the number of observations minus estimated parameters in their respective variance estimates.

*   **What Could Go Wrong:** Incorrectly calculating degrees of freedom is arguably the most common and impactful mistake in applied statistics. It directly affects the shape of the distribution, leading to incorrect critical values, p-values, and ultimately, erroneous conclusions from hypothesis tests. Always double-check how degrees of freedom are defined for the specific test you are performing.

## 5. Worked examples — multiple, with every step shown

### Example 1: Easy Chi-squared Statistic Calculation

**Problem:** A researcher observes 120 individuals and records their blood types. The observed counts are: Type A: 50, Type B: 30, Type AB: 15, Type O: 25. Based on prior knowledge, the expected proportions in the population are: Type A: 40%, Type B: 20%, Type AB: 10%, Type O: 30%. Calculate the Chi-squared test statistic.

**What's Given:**
*   Total observed individuals ($N$) = 120
*   Observed counts ($O_i$): $O_A=50, O_B=30, O_{AB}=15, O_O=25$
*   Expected proportions ($P_i$): $P_A=0.40, P_B=0.20, P_{AB}=0.10, P_O=0.30$

**What We Want:** The Chi-squared test statistic ($\chi^2$).

**Solution:**

1.  **Calculate Expected Counts ($E_i$):**
    *   The expected count for each category is $E_i = N \times P_i$.
    *   $E_A = 120 \times 0.40 = 48$
    *   $E_B = 120 \times 0.20 = 24$
    *   $E_{AB} = 120 \times 0.10 = 12$
    *   $E_O = 120 \times 0.30 = 36$
    *   *Explanation:* We multiply the total number of observations by the expected proportion for each category to find out how many individuals we would expect in each group if the prior knowledge were perfectly accurate.

2.  **Calculate the Chi-squared contribution for each category:**
    *   The formula for the Chi-squared statistic is $\chi^2 = \sum \frac{(O_i - E_i)^2}{E_i}$. We will calculate $(O_i - E_i)^2 / E_i$ for each blood type.
    *   **Type A:** $(50 - 48)^2 / 48 = (2)^2 / 48 = 4 / 48 = 0.0833$
    *   **Type B:** $(30 - 24)^2 / 24 = (6)^2 / 24 = 36 / 24 = 1.5000$
    *   **Type AB:** $(15 - 12)^2 / 12 = (3)^2 / 12 = 9 / 12 = 0.7500$
    *   **Type O:** $(25 - 36)^2 / 36 = (-11)^2 / 36 = 121 / 36 = 3.3611$
    *   *Explanation:* For each category, we find the difference between the observed and expected counts, square it (to make it positive and emphasize larger differences), and then divide by the expected count. This scaling by $E_i$ makes the contribution of each category comparable, regardless of its size.

3.  **Sum the contributions to get the total Chi-squared statistic:**
    *   $\chi^2 = 0.0833 + 1.5000 + 0.7500 + 3.3611 = 5.6944$
    *   *Explanation:* The final Chi-squared statistic is the sum of these individual contributions. A larger value generally indicates a greater discrepancy between observed and expected counts.

**Final Answer:**
$$ \boxed{\chi^2 = 5.6944} $$

**Reflection:** This example was straightforward because it only involved calculating the statistic. The trickiest part is ensuring correct arithmetic and understanding that the Chi-squared statistic quantifies the *discrepancy* between observed and expected frequencies.

---

### Example 2: Medium t-statistic Calculation

**Problem:** A new fertilizer is tested on a sample of 25 plants. The average yield per plant is 120 grams, with a sample standard deviation of 15 grams. The manufacturer claims the average yield should be 125 grams. Calculate the t-statistic for testing this claim.

**What's Given:**
*   Sample size ($n$) = 25
*   Sample mean ($\bar{x}$) = 120 grams
*   Sample standard deviation ($s$) = 15 grams
*   Hypothesized population mean ($\mu_0$) = 125 grams

**What We Want:** The t-statistic.

**Solution:**

1.  **Identify the formula for the one-sample t-statistic:**
    *   The formula is $t = \frac{\bar{x} - \mu_0}{s/\sqrt{n}}$
    *   *Explanation:* This formula standardizes the difference between the sample mean and the hypothesized population mean by dividing it by the estimated standard error of the mean. This allows us to compare our observed difference to a t-distribution.

2.  **Substitute the given values into the formula:**
    *   $t = \frac{120 - 125}{15/\sqrt{25}}$
    *   *Explanation:* We plug in the values for the sample mean ($\bar{x}$), hypothesized population mean ($\mu_0$), sample standard deviation ($s$), and sample size ($n$).

3.  **Calculate the square root of $n$:**
    *   $\sqrt{25} = 5$
    *   *Explanation:* This is the first step in simplifying the denominator.

4.  **Calculate the standard error of the mean ($s/\sqrt{n}$):**
    *   $15 / 5 = 3$
    *   *Explanation:* The standard error of the mean estimates how much the sample mean is expected to vary from the population mean.

5.  **Calculate the difference between the sample mean and the hypothesized mean:**
    *   $120 - 125 = -5$
    *   *Explanation:* This is the numerator, representing the observed deviation from the hypothesized value.

6.  **Calculate the final t-statistic:**
    *   $t = \frac{-5}{3} = -1.6667$
    *   *Explanation:* Divide the difference calculated in step 5 by the standard error calculated in step 4.

**Final Answer:**
$$ \boxed{t = -1.6667} $$

**Reflection:** This example highlights the role of the sample standard deviation in estimating the population standard deviation, which is a key reason for using the t-distribution instead of the Z-distribution. The negative sign indicates the sample mean is below the hypothesized mean.

---

### Example 3: Medium F-statistic Calculation

**Problem:** Two different machines (Machine A and Machine B) produce identical parts. A quality control engineer wants to compare the variability of the parts produced by each machine. She takes a sample of 21 parts from Machine A and finds a sample variance of $s_A^2 = 36 \text{ mm}^2$. She takes a sample of 16 parts from Machine B and finds a sample variance of $s_B^2 = 25 \text{ mm}^2$. Calculate the F-statistic to compare the variances, assuming the null hypothesis is that the variances are equal ($\sigma_A^2 = \sigma_B^2$).

**What's Given:**
*   Sample size for Machine A ($n_A$) = 21
*   Sample variance for Machine A ($s_A^2$) = 36
*   Sample size for Machine B ($n_B$) = 16
*   Sample variance for Machine B ($s_B^2$) = 25

**What We Want:** The F-statistic.

**Solution:**

1.  **Identify the formula for the F-statistic for comparing two variances:**
    *   The formula is $F = \frac{s_1^2}{s_2^2}$, where $s_1^2$ is the larger sample variance and $s_2^2$ is the smaller sample variance. This convention ensures $F \ge 1$, which simplifies table lookups for right-tailed tests.
    *   *Explanation:* The F-statistic is simply the ratio of two sample variances. If the population variances are truly equal, this ratio should be close to 1. Large deviations from 1 (either much larger or much smaller) suggest a difference in population variances. By putting the larger variance in the numerator, we always get $F \ge 1$.

2.  **Identify the larger and smaller sample variances:**
    *   $s_A^2 = 36$ (larger)
    *   $s_B^2 = 25$ (smaller)
    *   *Explanation:* We identify which sample variance is greater to ensure the F-statistic is $\ge 1$.

3.  **Substitute the variances into the F-statistic formula:**
    *   $F = \frac{s_A^2}{s_B^2} = \frac{36}{25}$
    *   *Explanation:* The larger variance goes in the numerator, and the smaller variance goes in the denominator.

4.  **Calculate the final F-statistic:**
    *   $F = 1.44$
    *   *Explanation:* Perform the division.

5.  **Determine the degrees of freedom:**
    *   Numerator degrees of freedom ($k_1$) = $n_A - 1 = 21 - 1 = 20$
    *   Denominator degrees of freedom ($k_2$) = $n_B - 1 = 16 - 1 = 15$
    *   *Explanation:* Each sample variance contributes $n-1$ degrees of freedom to the F-statistic. The numerator's degrees of freedom correspond to the variance in the numerator, and the denominator's to the variance in the denominator.

**Final Answer:**
$$ \boxed{F = 1.44 \quad \text{with } k_1=20, k_2=15 \text{ degrees of freedom}} $$

**Reflection:** This example demonstrates the direct calculation of the F-statistic. The crucial part is correctly identifying which variance goes into the numerator and remembering that the degrees of freedom for each variance are $n-1$.

---

### Example 4: Harder Chi-squared Goodness-of-Fit Test with Table Lookup

**Problem:** A geneticist crosses two pea plants and expects the offspring to display four phenotypes in a 9:3:3:1 ratio (Mendelian inheritance). Out of 160 total offspring, the observed counts are:
*   Round Yellow: 98
*   Round Green: 28
*   Wrinkled Yellow: 24
*   Wrinkled Green: 10

Perform a Chi-squared goodness-of-fit test to determine if the observed counts significantly differ from the expected Mendelian ratio at a significance level of $\alpha = 0.05$.

**What's Given:**
*   Total offspring ($N$) = 160
*   Observed counts ($O_i$): $O_{RY}=98, O_{RG}=28, O_{WY}=24, O_{WG}=10$
*   Expected ratio: 9:3:3:1

**What We Want:** The Chi-squared test statistic, degrees of freedom, critical value, and conclusion.

**Solution:**

1.  **Formulate Hypotheses:**
    *   Null Hypothesis ($H_0$): The observed phenotype distribution fits the 9:3:3:1 Mendelian ratio.
    *   Alternative Hypothesis ($H_1$): The observed phenotype distribution does not fit the 9:3:3:1 Mendelian ratio.
    *   *Explanation:* We set up the hypotheses to test whether the observed data aligns with the theoretical expectation.

2.  **Calculate Expected Proportions and Counts:**
    *   The total ratio parts are $9+3+3+1 = 16$.
    *   Expected Proportions ($P_i$):
        *   $P_{RY} = 9/16 = 0.5625$
        *   $P_{RG} = 3/16 = 0.1875$
        *   $P_{WY} = 3/16 = 0.1875$
        *   $P_{WG} = 1/16 = 0.0625$
    *   Expected Counts ($E_i = N \times P_i$):
        *   $E_{RY} = 160 \times 0.5625 = 90$
        *   $E_{RG} = 160 \times 0.1875 = 30$
        *   $E_{WY} = 160 \times 0.1875 = 30$
        *   $E_{WG} = 160 \times 0.0625 = 10$
    *   *Explanation:* We convert the given ratio into proportions and then calculate the expected number of offspring for each phenotype based on the total observed offspring.

3.  **Calculate the Chi-squared Test Statistic ($\chi^2$):**
    *   $\chi^2 = \sum \frac{(O_i - E_i)^2}{E_i}$
    *   **Round Yellow:** $(98 - 90)^2 / 90 = (8)^2 / 90 = 64 / 90 = 0.7111$
    *   **Round Green:** $(28 - 30)^2 / 30 = (-2)^2 / 30 = 4 / 30 = 0.1333$
    *   **Wrinkled Yellow:** $(24 - 30)^2 / 30 = (-6)^2 / 30 = 36 / 30 = 1.2000$
    *   **Wrinkled Green:** $(10 - 10)^2 / 10 = (0)^2 / 10 = 0 / 10 = 0.0000$
    *   $\chi^2 = 0.7111 + 0.1333 + 1.2000 + 0.0000 = 2.0444$
    *   *Explanation:* We apply the Chi-squared formula, summing the squared differences between observed and expected counts, scaled by expected counts.

4.  **Determine Degrees of Freedom (df):**
    *   Number of categories ($C$) = 4 (Round Yellow, Round Green, Wrinkled Yellow, Wrinkled Green)
    *   Number of parameters estimated from data = 0 (we used fixed theoretical proportions)
    *   df = $C - 1 = 4 - 1 = 3$
    *   *Explanation:* For a goodness-of-fit test, the degrees of freedom are the number of categories minus 1.

5.  **Find the Critical Value from Chi-squared Table:**
    *   Significance level ($\alpha$) = 0.05
    *   Degrees of freedom (df) = 3
    *   Looking up a Chi-squared table for df=3 and $\alpha=0.05$ (right-tail probability), the critical value is $7.815$.
    *   *Explanation:* The critical value is the threshold from the Chi-squared distribution. If our calculated $\chi^2$ statistic exceeds this value, it's considered extreme enough to reject the null hypothesis.

6.  **Make a Decision:**
    *   Calculated $\chi^2 = 2.0444$
    *   Critical Value = $7.815$
    *   Since $2.0444 < 7.815$, we **fail to reject the null hypothesis**.
    *   *Explanation:* Our calculated statistic is not in the "rejection region" (the extreme tail of the distribution), meaning the observed differences are likely due to random chance, not a true deviation from the expected ratio.

**Final Answer:**
$$ \boxed{\text{Calculated } \chi^2 = 2.0444, \text{ df} = 3, \text{ Critical Value} = 7.815. \text{ Fail to reject } H_0.} $$
There is no significant evidence at $\alpha=0.05$ to conclude that the observed phenotype distribution differs from the 9:3:3:1 Mendelian ratio.

**Reflection:** This example is harder because it involves the full hypothesis testing procedure, including formulating hypotheses, calculating expected values, determining degrees of freedom, and using a statistical table to find a critical value. The key takeaway is understanding how the Chi-squared statistic is compared to its theoretical distribution to make a probabilistic decision.

---

### Example 5: Harder Two-Sample t-Test with Table Lookup

**Problem:** A company wants to compare the effectiveness of two different training programs for new employees (Program A and Program B). 15 employees are randomly assigned to Program A, and 12 employees to Program B. After training, their productivity scores are recorded.

*   **Program A:** $n_A = 15$, $\bar{x}_A = 85$, $s_A = 10$
*   **Program B:** $n_B = 12$, $\bar{x}_B = 80$, $s_B = 12$

Assume the population variances are equal. Test if there is a significant difference in productivity scores between the two programs at a significance level of $\alpha = 0.01$.

**What's Given:**
*   Sample size A ($n_A$) = 15
*   Sample mean A ($\bar{x}_A$) = 85
*   Sample standard deviation A ($s_A$) = 10
*   Sample size B ($n_B$) = 12
*   Sample mean B ($\bar{x}_B$) = 80
*   Sample standard deviation B ($s_B$) = 12
*   Significance level ($\alpha$) = 0.01
*   Assumption: Population variances are equal.

**What We Want:** The t-statistic, degrees of freedom, critical value, and conclusion.

**Solution:**

1.  **Formulate Hypotheses:**
    *   Null Hypothesis ($H_0$): There is no difference in mean productivity scores between the two programs ($\mu_A = \mu_B$).
    *   Alternative Hypothesis ($H_1$): There is a difference in mean productivity scores between the two programs ($\mu_A \ne \mu_B$).
    *   *Explanation:* This is a two-tailed test because we are looking for *any* significant difference, not just that A is better than B or vice-versa.

2.  **Calculate the Pooled Standard Deviation ($s_p$):**
    *   Since we assume equal population variances, we use a pooled standard deviation.
    *   $s_p^2 = \frac{(n_A - 1)s_A^2 + (n_B - 1)s_B^2}{n_A + n_B - 2}$
    *   $s_A^2 = 10^2 = 100$
    *   $s_B^2 = 12^2 = 144$
    *   $s_p^2 = \frac{(15 - 1)(100) + (12 - 1)(144)}{15 + 12 - 2}$
    *   $s_p^2 = \frac{(14)(100) + (11)(144)}{25}$
    *   $s_p^2 = \frac{1400 + 1584}{25} = \frac{2984}{25} = 119.36$
    *   $s_p = \sqrt{119.36} \approx 10.925$
    *   *Explanation:* The pooled standard deviation is a weighted average of the two sample standard deviations, giving more weight to the larger sample size. It's used when we assume the underlying population variances are the same.

3.  **Calculate the t-statistic:**
    *   $t = \frac{(\bar{x}_A - \bar{x}_B) - (\mu_A - \mu_B)}{s_p \sqrt{\frac{1}{n_A} + \frac{1}{n_B}}}$
    *   Under $H_0$, $\mu_A - \mu_B = 0$.
    *   $t = \frac{(85 - 80) - 0}{10.925 \sqrt{\frac{1}{15} + \frac{1}{12}}}$
    *   $t = \frac{5}{10.925 \sqrt{0.066667 + 0.083333}}$
    *   $t = \frac{5}{10.925 \sqrt{0.15}}$
    *   $t = \frac{5}{10.925 \times 0.3873} = \frac{5}{4.2327}$
    *   $t \approx 1.181$
    *   *Explanation:* This formula calculates how many standard errors the difference between the sample means is from the hypothesized difference (which is 0 under the null hypothesis).

4.  **Determine Degrees of Freedom (df):**
    *   df = $n_A + n_B - 2 = 15 + 12 - 2 = 25$
    *   *Explanation:* For a two-sample t-test with pooled variance, the degrees of freedom are the sum of the sample sizes minus 2.

5.  **Find the Critical Value from t-distribution Table:**
    *   Significance level ($\alpha$) = 0.01
    *   Since it's a two-tailed test, we look for $\alpha/2 = 0.005$ in each tail.
    *   Degrees of freedom (df) = 25
    *   Looking up a t-table for df=25 and a right-tail probability of 0.005, the critical value is $t_{0.005, 25} = 2.787$.
    *   So, the critical values are $\pm 2.787$.
    *   *Explanation:* For a two-tailed test, we need two critical values, one positive and one negative, that define the rejection regions in both tails of the t-distribution.

6.  **Make a Decision:**
    *   Calculated $t = 1.181$
    *   Critical Values = $\pm 2.787$
    *   Since $-2.787 < 1.181 < 2.787$, we **fail to reject the null hypothesis**.
    *   *Explanation:* Our calculated t-statistic falls within the acceptance region, meaning the observed difference in mean productivity scores is not statistically significant at the $\alpha=0.01$ level.

**Final Answer:**
$$ \boxed{\text{Calculated } t = 1.181, \text{ df} = 25, \text{ Critical Values} = \pm 2.787. \text{ Fail to reject } H_0.} $$
There is no significant evidence at $\alpha=0.01$ to conclude a difference in mean productivity scores between Program A and Program B.

**Reflection:** This is a comprehensive example involving a two-sample t-test. The complexity comes from calculating the pooled standard deviation and correctly determining the degrees of freedom for a two-sample test. It reinforces the process of hypothesis testing from calculation to conclusion using a statistical table.

## 6. Common mistakes and traps

Students often stumble on specific points when working with Chi-squared, t, and F distributions. Being aware of these common pitfalls can help you avoid them:

1.  **Incorrectly Determining Degrees of Freedom (df):** This is by far the most frequent and impactful error. Each test and scenario has a specific way to calculate df (e.g., $n-1$, $k-1$, $(R-1)(C-1)$, $n_1+n_2-2$). An incorrect df leads to using the wrong distribution shape, which means incorrect critical values and p-values, and ultimately wrong conclusions.
2.  **Confusing When to Use Which Distribution:**
    *   **Chi-squared:** For categorical data (counts, frequencies), comparing observed vs. expected, or for variances.
    *   **t-distribution:** For means, especially when the population standard deviation is unknown and estimated from a small sample.
    *   **F-distribution:** For comparing *variances* of two or more groups (ANOVA), or for overall model significance in regression.
    Using a Z-test instead of a t-test when the population standard deviation is unknown is a classic error.
3.  **Violating Assumptions:** These distributions rely on certain assumptions about the underlying data:
    *   **Normality:** The data (or the sampling distribution of the statistic) should be approximately normal. For large samples, the CLT helps, but for small samples, non-normal data can invalidate t-tests and F-tests.
    *   **Independence:** Observations must be independent. Dependent samples (e.g., repeated measures on the same individuals) require different tests (e.g., paired t-test).
    *   **Equal Variances (for pooled t-tests and some F-tests):** Assuming equal population variances when they are vastly different can lead to incorrect results.
4.  **Incorrectly Interpreting One-tailed vs. Two-tailed Tests:** Especially with the t-distribution, students might mistakenly use a one-tailed critical value for a two-tailed hypothesis (or vice-versa), or misinterpret the sign of the t-statistic. For F-tests, it's typically a one-tailed (right-tailed) test because we're usually looking for significantly *larger* variance in the numerator.
5.  **Order of Variances in F-test:** For comparing two variances, the convention is often to place the larger sample variance in the numerator to ensure $F \ge 1$. If this is not done, or if the order is simply arbitrary, the interpretation of the critical value from standard tables (which are typically right-tailed) becomes more complex.
6.  **Miscalculating Standard Error:** Errors in the denominator of the t-statistic (e.g., forgetting the square root of $n$, or using standard deviation instead of standard error) are common.

## 7. Textbook-precise explanation

This section provides the formal, rigorous definitions as they would appear in a university-level mathematical statistics textbook.

### The Chi-squared ($\chi^2$) Distribution

**Definition:** Let $Z_1, Z_2, \dots, Z_k$ be $k$ independent and identically distributed (i.i.d.) random variables, each following a standard normal distribution, i.e., $Z_i \sim N(0,1)$ for $i=1, \dots, k$.
Then the random variable $X$ defined as the sum of their squares,
$$ X = \sum_{i=1}^k Z_i^2 $$
is said to follow a Chi-squared distribution with $k$ degrees of freedom. This is denoted as $X \sim \chi^2(k)$.

**Probability Density Function (PDF):** The PDF of a $\chi^2(k)$ random variable $X$ is given by:
$$ f_X(x; k) = \frac{1}{2^{k/2} \Gamma(k/2)} x^{k/2 - 1} e^{-x/2} \quad \text{for } x > 0 $$
where $\Gamma(\cdot)$ is the Gamma function, defined as $\Gamma(z) = \int_0^\infty t^{z-1} e^{-t} dt$.

**Properties:**
*   Mean: $E[X] = k$
*   Variance: $Var[X] = 2k$
*   The Chi-squared distribution is a special case of the Gamma distribution, specifically $\chi^2(k) \sim \text{Gamma}(k/2, 1/2)$.

**Citation:** Hogg, R. V., McKean, J. W., & Craig, A. T. (2019). *Introduction to Mathematical Statistics* (8th ed., Chapter 3). Pearson.

### Student's t-Distribution

**Definition:** Let $Z$ be a standard normal random variable ($Z \sim N(0,1)$), and let $X$ be a Chi-squared random variable with $k$ degrees of freedom ($X \sim \chi^2(k)$). Assume that $Z$ and $X$ are independent.
Then the random variable $T$ defined as:
$$ T = \frac{Z}{\sqrt{X/k}} $$
is said to follow Student's t-distribution with $k$ degrees of freedom. This is denoted as $T \sim t(k)$.

**Probability Density Function (PDF):** The PDF of a $t(k)$ random variable $T$ is given by:
$$ f_T(t; k) = \frac{\Gamma((k+1)/2)}{\sqrt{k\pi}\Gamma(k/2)} \left(1 + \frac{t^2}{k}\right)^{-(k+1)/2} \quad \text{for } -\infty < t < \infty $$

**Properties:**
*   Mean: $E[T] = 0$ for $k > 1$. (Undefined for $k=1$).
*   Variance: $Var[T] = \frac{k}{k-2}$ for $k > 2$. (Undefined for $k=1,2$).
*   As $k \to \infty$, the t-distribution approaches the standard normal distribution, i.e., $t(k) \to N(0,1)$.

**Citation:** Casella, G., & Berger, R. L. (2002). *Statistical Inference* (2nd ed., Chapter 5). Duxbury Press.

### The F-Distribution

**Definition:** Let $X_1$ be a Chi-squared random variable with $k_1$ degrees of freedom ($X_1 \sim \chi^2(k_1)$), and let $X_2$ be an independent Chi-squared random variable with $k_2$ degrees of freedom ($X_2 \sim \chi^2(k_2)$).
Then the random variable $F$ defined as the ratio of these scaled Chi-squared variables:
$$ F = \frac{X_1/k_1}{X_2/k_2} $$
is said to follow an F-distribution with $k_1$ numerator degrees of freedom and $k_2$ denominator degrees of freedom. This is denoted as $F \sim F(k_1, k_2)$.

**Probability Density Function (PDF):** The PDF of an $F(k_1, k_2)$ random variable $F$ is given by:
$$ f_F(f; k_1, k_2) = \frac{\Gamma\left(\frac{k_1+k_2}{2}\right)}{\Gamma\left(\frac{k_1}{2}\right)\Gamma\left(\frac{k_2}{2}\right)} \left(\frac{k_1}{k_2}\right)^{k_1/2} f^{k_1/2 - 1} \left(1 + \frac{k_1 f}{k_2}\right)^{-(k_1+k_2)/2} \quad \text{for } f > 0 $$

**Properties:**
*   Mean: $E[F] = \frac{k_2}{k_2-2}$ for $k_2 > 2$.
*   Variance: $Var[F] = \frac{2k_2^2(k_1+k_2-2)}{k_1(k_2-2)^2(k_2-4)}$ for $k_2 > 4$.
*   Relationship to t-distribution: If $T \sim t(k)$, then $T^2 \sim F(1, k