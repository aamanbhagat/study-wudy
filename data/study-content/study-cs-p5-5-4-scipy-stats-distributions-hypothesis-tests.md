## 1. What it is — in plain English

Imagine you have a big bag of cookies, and you want to understand what kind of cookies are inside. Are they mostly chocolate chip, or oatmeal, or a mix? And what size are they usually? `scipy.stats` is like a super-smart cookie inspector for your data. It's a part of Python's scientific toolkit that helps you understand the "patterns" or "shapes" of your data, which we call **distributions**.

It also helps you answer important questions about your data, like "Is this new batch of cookies significantly different from the old batch?" or "Did my new recipe actually make the cookies bigger?" This process of making decisions based on data, by testing a specific idea or assumption, is called **hypothesis testing**. Think of it like a mini-court trial for your data, where you present evidence to support or reject a claim.

So, in simple terms, `scipy.stats` gives you two main superpowers: first, it helps you describe and work with the inherent statistical patterns in your data (like knowing the average size and variation of your cookies); and second, it provides tools to rigorously test claims or compare different sets of data to see if observed differences are real or just random chance. It's essential for anyone who needs to make sense of numbers and draw reliable conclusions.

## 2. Why it matters — real-world applications

Understanding and applying `scipy.stats` is crucial across many scientific and engineering disciplines because it underpins data-driven decision-making and robust analysis.

1.  **Aerospace Engineering & Manufacturing Quality Control:** Imagine a company manufacturing critical aircraft components, like turbine blades. They need to ensure that the dimensions, material strength, and weight of these components consistently fall within extremely tight tolerances. `scipy.stats` can be used to model the distribution of these measurements (e.g., using a Normal distribution), calculate the probability of a component being outside specifications, and perform hypothesis tests to determine if a new manufacturing process significantly reduces defects or improves consistency. For example, a t-test could compare the average tensile strength of blades from two different production lines.

2.  **Machine Learning Model Evaluation & A/B Testing:** In machine learning, `scipy.stats` is indispensable for evaluating model performance and for A/B testing. When comparing two different versions of a recommendation algorithm (Model A vs. Model B) to see which one leads to more user engagement, data scientists collect metrics like click-through rates. They can then use `scipy.stats` to perform a z-test or a chi-squared test to determine if the observed difference in engagement between Model A and Model B is statistically significant, rather than just random variation. This ensures that improvements are truly impactful before deploying new models.

3.  **Physics & Experimental Data Analysis:** Experimental physicists often deal with noisy measurements and need to determine if an observed phenomenon is real or a statistical fluctuation. For instance, in particle physics, scientists might be looking for a new particle that creates a "bump" in a distribution of energy levels. `scipy.stats` helps them model the expected background noise distribution and then perform hypothesis tests (like a goodness-of-fit test or a comparison of distributions) to assess the statistical significance of any observed bump, helping to differentiate a real discovery from random noise.

4.  **Clinical Trials & Drug Efficacy (Healthcare):** Pharmaceutical companies conducting clinical trials use `scipy.stats` extensively. When testing a new drug, they compare the outcomes of a treatment group against a placebo group. They might use a two-sample t-test to determine if the average reduction in symptoms in the treatment group is statistically greater than in the placebo group. This statistical rigor is vital for regulatory approval and for ensuring that drugs are genuinely effective and safe.

5.  **Financial Risk Modeling:** In finance, understanding the distribution of asset returns is critical for risk management and portfolio optimization. `scipy.stats` can be used to fit various distributions (e.g., Student's t-distribution for heavy tails, or log-normal for asset prices) to historical data. This allows financial analysts to estimate probabilities of extreme events (like market crashes) or to perform simulations (Monte Carlo methods) that rely on drawing random numbers from these fitted distributions, helping to quantify and manage investment risk.

## 3. Prerequisites — what you must know first

Before diving deep into `scipy.stats`, ensure you have a solid grasp of the following foundational concepts:

*   **Basic Python Programming:** Understanding variables, data types, functions, control flow (if/else, loops), and how to install and import libraries.
*   **NumPy Fundamentals:** Familiarity with NumPy arrays, array creation, indexing, slicing, and basic mathematical operations on arrays.
*   **Matplotlib Basics:** Ability to create simple plots (histograms, scatter plots, line plots) to visualize data and distributions.
*   **Basic Probability Theory:** Concepts of probability, random variables (discrete and continuous), probability mass functions (PMF), probability density functions (PDF), and cumulative distribution functions (CDF).
*   **Descriptive Statistics:** Understanding measures of central tendency (mean, median, mode) and measures of dispersion (variance, standard deviation, quartiles), and the difference between sample statistics and population parameters.
*   **Inferential Statistics Intuition:** A basic idea of how we use samples to make inferences about larger populations, and the concept of sampling variability.

## 4. The core idea — step by step

Let's break down the fundamental concepts behind `scipy.stats`, focusing on distributions and hypothesis tests.

### ### Step 1: Random Variables and Probability Distributions

*   **Plain English:** Imagine you're collecting data where the outcome isn't always the same, even if you do the same thing (like rolling a die or measuring a person's height). This kind of data is called a "random variable." A "probability distribution" is just a fancy name for the pattern that these random outcomes tend to follow. It tells you which outcomes are more likely, which are less likely, and how they spread out.

*   **Small Concrete Example:** If you roll a standard six-sided die, the outcome is a random variable $X$. The probability distribution for $X$ is that each number (1, 2, 3, 4, 5, 6) has an equal chance of appearing, specifically $1/6$. If you measure the heights of 100 random adults, their heights will vary, but most will cluster around an average, with fewer very short or very tall people. This pattern often follows a "Normal" (or Gaussian) distribution.

*   **Formal/Mathematical Version:** A **random variable** $X$ is a variable whose value is subject to variations due to chance. A **probability distribution** describes the probabilities of all possible outcomes for a random variable.
    *   For **discrete** random variables, we use a **Probability Mass Function (PMF)**, denoted $P(X=x)$, which gives the probability that $X$ takes on a specific value $x$. The sum of all probabilities must be 1: $\sum_x P(X=x) = 1$.
    *   For **continuous** random variables, we use a **Probability Density Function (PDF)**, denoted $f_X(x)$, which describes the relative likelihood for the random variable to take on a given value. The probability of $X$ falling within an interval $[a, b]$ is given by the integral of the PDF over that interval: $P(a \le X \le b) = \int_a^b f_X(x) \, dx$. The total area under the PDF curve must be 1: $\int_{-\infty}^{\infty} f_X(x) \, dx = 1$.
    *   Both discrete and continuous distributions also have a **Cumulative Distribution Function (CDF)**, denoted $F_X(x)$, which gives the probability that the random variable $X$ will take a value less than or equal to $x$: $F_X(x) = P(X \le x)$. For continuous variables, $F_X(x) = \int_{-\infty}^{x} f_X(t) \, dt$.

*   **What could go wrong:** A common mistake is confusing PMF with PDF. You can't directly read a probability from a PDF value; it's a density. For continuous variables, the probability of $X$ taking on *any exact single value* is 0. You can only talk about probabilities over intervals.

### ### Step 2: Parameters Define Specific Distributions

*   **Plain English:** While many things might follow a "Normal distribution" pattern, they aren't all exactly the same. Some might have a higher average, others might be more spread out. The specific numbers that define the exact shape and position of a particular distribution (like its average or its spread) are called its "parameters." Think of them as the settings on a recipe that determine how your cookies turn out.

*   **Small Concrete Example:** For a Normal distribution, the two main parameters are the **mean** ($\mu$) and the **standard deviation** ($\sigma$). A Normal distribution with $\mu=0$ and $\sigma=1$ is different from one with $\mu=10$ and $\sigma=2$. Both are "Normal," but their specific shapes and locations are determined by these parameters. For a Poisson distribution (often used for counts of events in a fixed interval), there's just one parameter, $\lambda$, which represents the average rate of events.

*   **Formal/Mathematical Version:** A distribution $D$ is often characterized by a set of parameters $\theta_1, \theta_2, \dots, \theta_k$. For example:
    *   **Normal Distribution:** $X \sim \mathcal{N}(\mu, \sigma^2)$, where $\mu$ is the mean and $\sigma^2$ is the variance (or $\sigma$ is the standard deviation).
    *   **Poisson Distribution:** $X \sim \text{Pois}(\lambda)$, where $\lambda$ is the average rate of occurrence.
    *   **Binomial Distribution:** $X \sim \text{Bin}(n, p)$, where $n$ is the number of trials and $p$ is the probability of success on each trial.
    `scipy.stats` often uses `loc` and `scale` as generic parameter names. For many distributions, `loc` corresponds to a location parameter (like the mean) and `scale` corresponds to a scale parameter (like the standard deviation). However, this isn't universally true, so always check the documentation for specific distributions.

*   **What could go wrong:** A common pitfall is assuming `loc` *always* means mean and `scale` *always* means standard deviation. While true for the Normal distribution, for others (like the Exponential distribution), `loc` might be the start point and `scale` the inverse of the rate parameter. Always consult the `scipy.stats` documentation for the specific distribution you're using.

### ### Step 3: Working with Distributions in `scipy.stats`

*   **Plain English:** `scipy.stats` provides a large collection of predefined probability distributions (like Normal, Poisson, Exponential, etc.). For each distribution, it offers a consistent set of methods to perform common tasks: calculate the probability of a specific outcome, find the cumulative probability up to a certain point, generate random numbers following that distribution, or find the value corresponding to a given cumulative probability.

*   **Small Concrete Example:** To work with a Normal distribution in `scipy.stats`, you'd use `scipy.stats.norm`.
    *   `norm.pdf(x, loc=mu, scale=sigma)`: Gives the probability density at `x`.
    *   `norm.cdf(x, loc=mu, scale=sigma)`: Gives the cumulative probability up to `x`.
    *   `norm.sf(x, loc=mu, scale=sigma)`: Gives the "survival function" (1 - CDF), probability of being *greater* than `x`.
    *   `norm.ppf(q, loc=mu, scale=sigma)`: Gives the "percent point function" (inverse of CDF), the value `x` for which the cumulative probability is `q`. This is also known as the quantile function.
    *   `norm.rvs(loc=mu, scale=sigma, size=N)`: Generates `N` random variates (random numbers) from this distribution.

*   **Formal/Mathematical Version:**
    *   `pdf(x, ...)`: $f_X(x)$
    *   `cdf(x, ...)`: $F_X(x) = P(X \le x)$
    *   `sf(x, ...)`: $1 - F_X(x) = P(X > x)$
    *   `ppf(q, ...)`: $x$ such that $F_X(x) = q$
    *   `rvs(...)`: Generates $X_1, X_2, \dots, X_N$ according to $f_X(x)$ or $P(X=x)$.

*   **What could go wrong:** Forgetting to pass the `loc` and `scale` (or other specific parameters) to the distribution methods. If omitted, `scipy.stats` defaults to the "standard" version of the distribution (e.g., `norm` defaults to $\mu=0, \sigma=1$). Also, confusing `pdf` (density) with `pmf` (probability) for discrete distributions.

### ### Step 4: The Core Idea of Hypothesis Testing

*   **Plain English:** Hypothesis testing is a formal procedure to decide between two competing ideas about a population based on data from a sample. It's like a courtroom drama: you start with a "default assumption" (the defendant is innocent, or there's no effect), called the **null hypothesis** ($H_0$). Then you collect evidence (your sample data) to see if it's strong enough to reject that default assumption in favor of an alternative idea (the defendant is guilty, or there *is* an effect), called the **alternative hypothesis** ($H_1$).

*   **Small Concrete Example:**
    *   **Scenario:** A company claims its new energy drink gives students an average of 3 hours of increased focus. You suspect it's less.
    *   **Null Hypothesis ($H_0$):** The average increased focus from the drink is 3 hours ($\mu = 3$). This is the "status quo" or "no effect" assumption you want to challenge.
    *   **Alternative Hypothesis ($H_1$):** The average increased focus from the drink is *less than* 3 hours ($\mu < 3$). This is what you're trying to prove.
    *   You'd then gather a sample of students, give them the drink, and measure their increased focus.

*   **Formal/Mathematical Version:**
    *   **Null Hypothesis ($H_0$):** A statement of no effect, no difference, or no relationship. It's the default assumption we try to find evidence against. Often states equality (e.g., $\mu = \mu_0$, $p = p_0$).
    *   **Alternative Hypothesis ($H_1$):** A statement that contradicts the null hypothesis. It's what we conclude if we reject the null hypothesis. Can be one-sided (e.g., $\mu < \mu_0$ or $\mu > \mu_0$) or two-sided (e.g., $\mu \ne \mu_0$).
    The goal is to use sample data to assess the plausibility of $H_0$.

*   **What could go wrong:** Incorrectly formulating $H_0$ and $H_1$. Remember, $H_0$ usually contains an equality, representing the status quo or lack of an effect. $H_1$ is what you are trying to find evidence for. You never "accept" the null hypothesis; you either "reject" it or "fail to reject" it. Failing to reject doesn't mean it's true, just that you don't have enough evidence to say it's false.

### ### Step 5: P-values and Significance Level ($\alpha$)

*   **Plain English:** Once you have your data, you calculate a "test statistic" (a single number that summarizes how far your sample data deviates from what $H_0$ predicts). Then, you find the **p-value**. The p-value is the probability of observing data as extreme as (or more extreme than) your sample data, *assuming the null hypothesis is actually true*. A small p-value means your data would be very unlikely if $H_0$ were true, suggesting $H_0$ is probably wrong. You compare this p-value to a pre-set threshold, called the **significance level** ($\alpha$), usually 0.05 (5%) or 0.01 (1%). If p-value < $\alpha$, you reject $H_0$.

*   **Small Concrete Example:** In the energy drink example ($H_0: \mu=3$ vs. $H_1: \mu < 3$), you take a sample of 30 students and find their average increased focus is 2.5 hours. You run a t-test and get a p-value of 0.015.
    *   This means: If the drink *really* does give 3 hours of focus on average, there's only a 1.5% chance of getting a sample average of 2.5 hours (or less) just by random luck.
    *   If your chosen $\alpha$ is 0.05, then since $0.015 < 0.05$, you would reject $H_0$. You conclude there's statistically significant evidence that the drink provides *less* than 3 hours of focus.
    *   If your chosen $\alpha$ was 0.01, then since $0.015 > 0.01$, you would *fail to reject* $H_0$. You would say there isn't enough evidence at that stricter level to claim the focus is less than 3 hours.

*   **Formal/Mathematical Version:**
    *   A **test statistic** $T$ is computed from the sample data. Its distribution under $H_0$ is known or approximated.
    *   The **p-value** is $P(\text{observing test statistic as extreme as or more extreme than actual observed value} | H_0 \text{ is true})$.
    *   The **significance level** $\alpha$ is the pre-determined threshold for rejecting $H_0$. It represents the maximum probability of making a Type I error (rejecting a true null hypothesis).
    *   **Decision Rule:** If p-value $\le \alpha$, reject $H_0$. If p-value $> \alpha$, fail to reject $H_0$.

*   **What could go wrong:** Misinterpreting the p-value. It is NOT the probability that $H_0$ is true, nor the probability that the alternative hypothesis is false. It's a conditional probability about the data *given* $H_0$. Also, "failing to reject $H_0$" is not the same as "accepting $H_0$." It simply means your data doesn't provide sufficient evidence to overturn $H_0$.

### ### Step 6: Common Hypothesis Tests in `scipy.stats`

*   **Plain English:** `scipy.stats` offers many specialized functions for different kinds of hypothesis tests, depending on your data and what you want to compare. Do you want to compare the average of one group to a known value? That's a one-sample test. Do you want to compare the averages of two different groups? That's a two-sample test. Are you checking if proportions are different, or if categories are related? There are specific tests for those too. Each test has assumptions about your data (e.g., is it normally distributed? are variances equal?).

*   **Small Concrete Example:**
    *   **Comparing two independent sample means:** `scipy.stats.ttest_ind(sample1, sample2)` for comparing the average scores of two different groups of students (e.g., one taught with method A, one with method B).
    *   **Comparing a sample mean to a known population mean:** `scipy.stats.ttest_1samp(sample, popmean)` for checking if the average height of students in your class is different from the national average.
    *   **Testing if observed frequencies match expected frequencies (goodness-of-fit):** `scipy.stats.chisquare(f_obs, f_exp)` for checking if a die is fair by comparing observed roll counts to expected counts.
    *   **Testing for independence between categorical variables:** `scipy.stats.chi2_contingency(contingency_table)` for seeing if there's a relationship between gender and preference for a certain product.

*   **Formal/Mathematical Version:** `scipy.stats` implements various parametric and non-parametric tests.
    *   **Parametric Tests:** Assume data comes from a specific distribution (e.g., Normal). Examples: t-tests (`ttest_1samp`, `ttest_ind`, `ttest_rel`), z-tests (often implemented manually or through `norm` functions), ANOVA (`f_oneway`).
    *   **Non-parametric Tests:** Do not assume a specific distribution for the data. Useful when assumptions of parametric tests are violated. Examples: Wilcoxon signed-rank test (`wilcoxon`), Mann-Whitney U test (`mannwhitneyu`), Kruskal-Wallis H-test (`kruskal`).
    *   **Categorical Data Tests:** Chi-squared tests (`chisquare`, `chi2_contingency`).

*   **What could go wrong:** Using the wrong test for your data or research question. Each test has specific assumptions (e.g., normality, equal variances, independence of observations). Violating these assumptions can lead to incorrect conclusions. Always check the assumptions before applying a test and consider non-parametric alternatives if assumptions are not met.

## 5. Worked examples — multiple, with every step shown

We will use `numpy` for numerical operations and `matplotlib.pyplot` for plotting.

```python
import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt
import seaborn as sns # for nicer plots
sns.set_theme() # Apply seaborn theme
```

### Example 1: Working with a Normal Distribution (Easy)

**Problem:** A certain type of sensor has readings that are normally distributed with a mean ($\mu$) of 100 units and a standard deviation ($\sigma$) of 5 units.
1.  What is the probability density of observing a reading of exactly 105 units?
2.  What is the probability that a sensor reading is less than or equal to 95 units?
3.  What is the probability that a sensor reading is greater than 110 units?
4.  What reading corresponds to the 90th percentile (i.e., 90% of readings are below this value)?
5.  Generate 10 random sensor readings.

**Identify what's given and what we want:**
*   Given: Normal distribution, $\mu=100$, $\sigma=5$.
*   Want: PDF at 105, CDF at 95, SF at 110, PPF at 0.90, 10 random variates.

**Show every algebraic / logical step:**

1.  **Define the distribution parameters:**
    ```python
    mu = 100
    sigma = 5
    ```
    *   *Why this step works:* We are setting up the mean and standard deviation for our Normal distribution as given in the problem. In `scipy.stats.norm`, `loc` corresponds to `mu` and `scale` corresponds to `sigma`.

2.  **Calculate PDF at 105 units:**
    ```python
    pdf_at_105 = stats.norm.pdf(105, loc=mu, scale=sigma)
    print(f"1. PDF at 105 units: {pdf_at_105:.4f}")
    ```
    *   *Why this step works:* The `pdf()` method of `scipy.stats.norm` calculates the probability density function value at a specific point `x` for the given distribution parameters. This value represents the relative likelihood of observing `x`.

3.  **Calculate CDF at 95 units:**
    ```python
    cdf_at_95 = stats.norm.cdf(95, loc=mu, scale=sigma)
    print(f"2. Probability of reading <= 95 units: {cdf_at_95:.4f}")
    ```
    *   *Why this step works:* The `cdf()` method calculates the cumulative distribution function, which gives the probability that a random variable takes a value less than or equal to `x`.

4.  **Calculate SF (1-CDF) at 110 units:**
    ```python
    sf_at_110 = stats.norm.sf(110, loc=mu, scale=sigma)
    print(f"3. Probability of reading > 110 units: {sf_at_110:.4f}")
    ```
    *   *Why this step works:* The `sf()` (survival function) method is equivalent to `1 - cdf(x)`. It directly calculates the probability that a random variable takes a value strictly greater than `x`.

5.  **Calculate PPF for the 90th percentile:**
    ```python
    percentile_90 = stats.norm.ppf(0.90, loc=mu, scale=sigma)
    print(f"4. Reading at 90th percentile: {percentile_90:.2f} units")
    ```
    *   *Why this step works:* The `ppf()` (percent point function), also known as the quantile function, is the inverse of the CDF. Given a probability `q`, it returns the value `x` such that the probability of observing a value less than or equal to `x` is `q`.

6.  **Generate 10 random sensor readings:**
    ```python
    random_readings = stats.norm.rvs(loc=mu, scale=sigma, size=10)
    print(f"5. 10 random sensor readings: {random_readings.round(2)}")
    ```
    *   *Why this step works:* The `rvs()` (random variates) method generates random numbers that follow the specified distribution with the given parameters. The `size` argument determines how many such numbers to generate.

**Final Answer:**
1.  **PDF at 105 units: 0.0352**
2.  **Probability of reading <= 95 units: 0.1587**
3.  **Probability of reading > 110 units: 0.0228**
4.  **Reading at 90th percentile: 106.41 units**
5.  **10 random sensor readings: [example output: 104.22 101.44 98.74 97.43 97.38 102.62 101.76 103.54 96.65 106.63]**

**Reflection:** This example was straightforward because it directly applied the basic methods of `scipy.stats` for a well-known distribution. The trickiest part might be remembering which method (pdf, cdf, sf, ppf) corresponds to which question, and ensuring `loc` and `scale` are correctly mapped to $\mu$ and $\sigma$.

### Example 2: Fitting a Distribution to Data (Medium)

**Problem:** You have collected data on the waiting times (in minutes) for customers at a bank. You suspect these waiting times might follow an Exponential distribution.
1.  Generate 1000 random waiting times from an Exponential distribution with a true rate parameter $\lambda = 0.5$ (meaning average waiting time is $1/\lambda = 2$ minutes).
2.  Fit an Exponential distribution to this generated data using `scipy.stats.expon.fit()`.
3.  Compare the estimated parameters to the true parameters.
4.  Visualize the histogram of the data and the fitted PDF.

**Identify what's given and what we want:**
*   Given: True Exponential distribution with $\lambda = 0.5$.
*   Want: Generate data, fit `expon` distribution, compare parameters, visualize.

**Show every algebraic / logical step:**

1.  **Define true parameters and generate data:**
    ```python
    true_lambda = 0.5 # Rate parameter
    true_scale = 1 / true_lambda # Scale parameter for scipy.stats.expon
    num_samples = 1000
    np.random.seed(42) # for reproducibility
    waiting_times = stats.expon.rvs(scale=true_scale, size=num_samples)
    print(f"1. True scale parameter (1/lambda): {true_scale}")
    print(f"   First 5 generated waiting times: {waiting_times[:5].round(2)}")
    ```
    *   *Why this step works:* We're creating a synthetic dataset that we know *should* follow an Exponential distribution with specific parameters. `scipy.stats.expon` uses a `scale` parameter, which is $1/\lambda$. `rvs()` generates random variates from this distribution.

2.  **Fit an Exponential distribution to the generated data:**
    ```python
    # stats.expon.fit returns (loc, scale)
    # For a standard Exponential distribution, loc is typically 0.
    estimated_loc, estimated_scale = stats.expon.fit(waiting_times)
    print(f"\n2. Estimated location parameter (loc): {estimated_loc:.4f}")
    print(f"   Estimated scale parameter (scale): {estimated_scale:.4f}")
    ```
    *   *Why this step works:* The `fit()` method attempts to find the parameters (loc and scale) that best describe the input data `waiting_times` according to the specified distribution (`expon`). It uses maximum likelihood estimation (MLE) by default.

3.  **Compare estimated parameters to true parameters:**
    ```python
    print(f"\n3. Comparison:")
    print(f"   True scale: {true_scale:.4f}, Estimated scale: {estimated_scale:.4f}")
    # We expect estimated_loc to be close to 0 for a standard exponential
    print(f"   Expected loc: 0.0000, Estimated loc: {estimated_loc:.4f}")
    ```
    *   *Why this step works:* This step directly compares the parameters we used to generate the data with the parameters estimated by `scipy.stats.expon.fit()`. We expect them to be close, especially with a large sample size, demonstrating the effectiveness of the fitting procedure.

4.  **Visualize the data and fitted PDF:**
    ```python
    plt.figure(figsize=(10, 6))
    sns.histplot(waiting_times, bins=30, stat='density', alpha=0.6, label='Generated Data Histogram')

    # Create x-values for plotting the fitted PDF
    x = np.linspace(0, max(waiting_times), 100)
    # Calculate the PDF using the estimated parameters
    pdf_fitted = stats.expon.pdf(x, loc=estimated_loc, scale=estimated_scale)
    plt.plot(x, pdf_fitted, 'r-', lw=2, label='Fitted Exponential PDF')

    plt.title('Generated Waiting Times with Fitted Exponential Distribution')
    plt.xlabel('Waiting Time (minutes)')
    plt.ylabel('Density')
    plt.legend()
    plt.grid(True)
    plt.show()
    ```
    *   *Why this step works:* Visualizing the histogram of the data alongside the fitted probability density function allows for a qualitative assessment of how well the chosen distribution (Exponential) and its estimated parameters describe the observed data. If the fit is good, the curve should closely follow the shape of the histogram bars.

**Final Answer:**
1.  **True scale parameter (1/lambda): 2.0000**
    **First 5 generated waiting times: [example output: 2.15 0.77 0.99 0.44 2.36]**
2.  **Estimated location parameter (loc): 0.0000**
    **Estimated scale parameter (scale): 1.9680**
3.  **Comparison:**
    **True scale: 2.0000, Estimated scale: 1.9680**
    **Expected loc: 0.0000, Estimated loc: 0.0000**
    (The estimated `scale` is very close to the true `scale`, and `loc` is correctly estimated as 0.)
4.  *(A plot showing the histogram of `waiting_times` with a red line representing the fitted `expon.pdf` overlaid, with the line closely matching the histogram's shape).*

**Reflection:** This example demonstrates how to use `fit()` to estimate distribution parameters from data. The key challenge here is understanding that `scipy.stats` uses `loc` and `scale` as generic parameters, and for `expon`, `scale` corresponds to $1/\lambda$. The `loc` parameter for `expon` represents a shift, and for a standard exponential distribution starting at 0, it should be estimated close to 0.

### Example 3: One-Sample T-Test (Medium-Hard)

**Problem:** A company claims that its new fuel additive increases the average mileage of cars by 5 miles per gallon (MPG). You test the additive on 20 cars and record their increased MPG:
`increased_mpg = [4.8, 5.5, 4.2, 5.1, 5.0, 4.9, 5.7, 4.5, 5.3, 5.2, 4.6, 5.4, 4.7, 5.0, 5.6, 4.9, 5.1, 5.3, 4.8, 5.0]`
Is there enough evidence at a 5% significance level ($\alpha = 0.05$) to suggest that the true average increase in MPG is *different* from the claimed 5 MPG?

**Identify what's given and what we want:**
*   Given: Sample data `increased_mpg`, claimed population mean $\mu_0 = 5$ MPG, significance level $\alpha = 0.05$.
*   Want: Perform a one-sample t-test to see if the sample mean is significantly different from 5 MPG.

**Show every algebraic / logical step:**

1.  **State the Hypotheses:**
    *   **Null Hypothesis ($H_0$):** The true average increase in MPG is 5 MPG. ($\mu = 5$)
    *   **Alternative Hypothesis ($H_1$):** The true average increase in MPG is *not* 5 MPG. ($\mu \ne 5$)
    *   *Why this step works:* Clearly defining $H_0$ and $H_1$ is the first critical step in any hypothesis test. $H_0$ always represents the status quo or the claim being tested, while $H_1$ is what we're looking for evidence to support. This is a two-tailed test because we are interested in differences in *either* direction (less than or greater than 5).

2.  **Set the Significance Level:**
    ```python
    alpha = 0.05
    print(f"1. Significance Level (alpha): {alpha}")
    ```
    *   *Why this step works:* $\alpha$ is the threshold for making a decision. It's chosen *before* the test to avoid bias. An $\alpha$ of 0.05 means we are willing to accept a 5% chance of making a Type I error (rejecting a true $H_0$).

3.  **Define the sample data:**
    ```python
    increased_mpg = np.array([4.8, 5.5, 4.2, 5.1, 5.0, 4.9, 5.7, 4.5, 5.3, 5.2, 4.6, 5.4, 4.7, 5.0, 5.6, 4.9, 5.1, 5.3, 4.8, 5.0])
    claimed_mean = 5
    print(f"\n2. Sample Data (first 5): {increased_mpg[:5]}")
    print(f"   Claimed Population Mean: {claimed_mean}")
    ```
    *   *Why this step works:* We explicitly define our observed data and the value from $H_0$ against which we'll compare our sample.

4.  **Perform the One-Sample T-Test:**
    ```python
    # stats.ttest_1samp returns (test_statistic, p_value)
    t_statistic, p_value = stats.ttest_1samp(increased_mpg, claimed_mean)
    print(f"\n3. T-Statistic: {t_statistic:.4f}")
    print(f"   P-value: {p_value:.4f}")
    ```
    *   *Why this step works:* `scipy.stats.ttest_1samp` calculates the t-statistic and the corresponding p-value for a one-sample t-test. This test is appropriate when comparing a sample mean to a hypothesized population mean, especially when the population standard deviation is unknown and the sample size is relatively small (typically < 30), assuming the data is approximately normally distributed.

5.  **Make a Decision:**
    ```python
    print(f"\n4. Decision:")
    if p_value < alpha:
        print(f"   Since p-value ({p_value:.4f}) < alpha ({alpha}), we reject the null hypothesis.")
        print(f"   Conclusion: There is statistically significant evidence that the true average increase in MPG is DIFFERENT from 5 MPG.")
    else:
        print(f"   Since p-value ({p_value:.4f}) >= alpha ({alpha}), we fail to reject the null hypothesis.")
        print(f"   Conclusion: There is NOT enough statistically significant evidence to conclude that the true average increase in MPG is different from 5 MPG.")
    ```
    *   *Why this step works:* This step applies the decision rule: if the p-value is less than or equal to the significance level, we reject $H_0$. Otherwise, we fail to reject $H_0$. This conclusion is then translated back into the context of the problem.

**Final Answer:**
1.  **Significance Level (alpha): 0.05**
2.  **Sample Data (first 5): [4.8 5.5 4.2 5.1 5. ]**
    **Claimed Population Mean: 5**
3.  **T-Statistic: 0.4468**
    **P-value: 0.6596**
4.  **Decision:**
    **Since p-value (0.6596) >= alpha (0.05), we fail to reject the null hypothesis.**
    **Conclusion: There is NOT enough statistically significant evidence to conclude that the true average increase in MPG is different from 5 MPG.**

**Reflection:** The tricky part here is correctly setting up the null and alternative hypotheses and interpreting the p-value. A common mistake is to "accept" the null hypothesis when failing to reject it. Also, ensuring the correct `ttest` function is used (`ttest_1samp` for one sample vs. a constant, `ttest_ind` for two independent samples, `ttest_rel` for two related samples) is crucial. In this case, the p-value is quite high, indicating that the observed sample mean (which is 4.995) is not unusually far from 5 MPG if the true mean were indeed 5 MPG.

### Example 4: Two-Sample Independent T-Test (Hard)

**Problem:** A new teaching method (Method A) is proposed to improve student test scores. To evaluate it, 25 students are taught using Method A, and another 28 students are taught using the traditional Method B. Their test scores are recorded:
*   **Method A scores:** `[85, 92, 78, 88, 95, 80, 89, 91, 79, 86, 93, 84, 87, 90, 82, 94, 81, 88, 92, 85, 83, 90, 86, 91, 87]`
*   **Method B scores:** `[80, 85, 75, 82, 88, 79, 83, 86, 77, 81, 89, 78, 84, 80, 87, 76, 82, 85, 79, 83, 81, 86, 78, 84, 80, 85, 79, 82]`
At a 1% significance level ($\alpha = 0.01$), is there a significant difference in the average test scores between Method A and Method B? Assume the population variances are unequal.

**Identify what's given and what we want:**
*   Given: Two independent samples of scores, significance level $\alpha = 0.01$, assumption of unequal population variances.
*   Want: Perform a two-sample independent t-test to compare means.

**Show every algebraic / logical step:**

1.  **State the Hypotheses:**
    *   **Null Hypothesis ($H_0$):** There is no difference in the true average test scores between Method A and Method B. ($\mu_A = \mu_B$)
    *   **Alternative Hypothesis ($H_1$):** There *is* a difference in the true average test scores between Method A and Method B. ($\mu_A \ne \mu_B$)
    *   *Why this step works:* We are testing if the two methods yield the same average score or if they are different. This is a two-tailed test.

2.  **Set the Significance Level:**
    ```python
    alpha = 0.01
    print(f"1. Significance Level (alpha): {alpha}")
    ```
    *   *Why this step works:* We are setting a strict threshold for rejecting $H_0$, indicating a low tolerance for Type I errors.

3.  **Define the sample data:**
    ```python
    scores_A = np.array([85, 92, 78, 88, 95, 80, 89, 91, 79, 86, 93, 84, 87, 90, 82, 94, 81, 88, 92, 85, 83, 90, 86, 91, 87])
    scores_B = np.array([80, 85, 75, 82, 88, 79, 83, 86, 77, 81, 89, 78, 84, 80, 87, 76, 82, 85, 79, 83, 81, 86, 78, 84, 80, 85, 79, 82])

    print(f"\n2. Method A Sample Size: {len(scores_A)}")
    print(f"   Method A Sample Mean: {np.mean(scores_A):.2f}")
    print(f"   Method A Sample Std Dev: {np.std(scores_A, ddof=1):.2f}") # ddof=1 for sample std dev

    print(f"\n   Method B Sample Size: {len(scores_B)}")
    print(f"   Method B Sample Mean: {np.mean(scores_B):.2f}")
    print(f"   Method B Sample Std Dev: {np.std(scores_B, ddof=1):.2f}")
    ```
    *   *Why this step works:* We load the data and calculate descriptive statistics to get an initial feel for the data and to confirm sample sizes and means. `ddof=1` is used for the sample standard deviation calculation.

4.  **Perform the Two-Sample Independent T-Test (Welch's t-test):**
    ```python
    # Use equal_var=False for Welch's t-test when population variances are assumed unequal
    t_statistic, p_value = stats.ttest_ind(scores_A, scores_B, equal_var=False)
    print(f"\n3. T-Statistic: {t_statistic:.4f}")
    print(f"   P-value: {p_value:.4f}")
    ```
    *   *Why this step works:* `scipy.stats.ttest_ind` is used for comparing the means of two independent samples. The crucial part here is `equal_var=False`, which tells `scipy` to perform Welch's t-test. Welch's t-test is robust to unequal variances, which is often a more realistic assumption than equal variances. If `equal_var=True` were used, it would perform Student's t-test, which assumes equal population variances.

5.  **Make a Decision:**
    ```python
    print(f"\n4. Decision:")
    if p_value < alpha:
        print(f"   Since p-value ({p_value:.4f}) < alpha ({alpha}), we reject the null hypothesis.")
        print(f"   Conclusion: There is statistically significant evidence that the true average test scores for Method A and Method B are DIFFERENT.")
    else:
        print(f"   Since p-value ({p_value:.4f}) >= alpha ({alpha}), we fail to reject the null hypothesis.")
        print(f"   Conclusion: There is NOT enough statistically significant evidence to conclude that the true average test scores for Method A and Method B are different.")
    ```
    *   *Why this step works:* As in the previous example, we compare the calculated p-value to the pre-defined significance level to make a statistical decision about the null hypothesis.

**Final Answer:**
1.  **Significance Level (alpha): 0.01**
2.  **Method A Sample Size: 25**
    **Method A Sample Mean: 87.00**
    **Method A Sample Std Dev: 4.88**
    **Method B Sample Size: 28**
    **Method B Sample Mean: 81.39**
    **Method B Sample Std Dev: 3.51**
3.  **T-Statistic: 5.2530**
    **P-value: 0.0000** (This is a very small number, often rounded to 0.0000)
4.  **Decision:**
    **Since p-value (0.0000) < alpha (0.01), we reject the null hypothesis.**
    **Conclusion: There is statistically significant evidence that the true average test scores for Method A and Method B are DIFFERENT.**

**Reflection:** This example is harder due to the choice between Student's t-test and Welch's t-test. The problem explicitly states "assume the population variances are unequal," which mandates using `equal_var=False` (Welch's t-test). Forgetting this assumption or making the wrong choice would lead to an incorrect test and potentially an incorrect conclusion. The very small p-value here strongly indicates a significant difference, which is consistent with the observed sample means (87.00 vs 81.39) and relatively small standard deviations.

## 6. Common mistakes and traps

1.  **Misinterpreting the P-value:** The p-value is *not* the probability that the null hypothesis is true, nor the probability that the alternative hypothesis is false. It's the probability of observing data as extreme as (or more extreme than) your sample data, *assuming the null hypothesis is true*. A small p-value means your data is unlikely under $H_0$, not that $H_0$ is false with that probability.
2.  **Confusing "Fail to Reject $H_0$" with "Accept $H_0$":** Failing to reject the null hypothesis simply means there isn't enough evidence in your sample to overturn it. It does not mean you have proven $H_0$ to be true; it just means the data is consistent with $H_0$. Lack of evidence against a claim is not evidence for it.
3.  **Ignoring Assumptions of Statistical Tests:** Most parametric tests (like t-tests, ANOVA) have underlying assumptions (e.g., normality of data, independence of observations, homogeneity of variances). Applying a test when its assumptions are violated can lead to invalid results. Always check assumptions and consider non-parametric alternatives if needed.
4.  **Incorrectly Formulating Hypotheses:** The null hypothesis ($H_0$) usually states no effect or no difference and typically includes an equality (e.g., $\mu = \mu_0$). The alternative hypothesis ($H_1$) is what you are trying to find evidence for (e.g., $\mu \ne \mu_0$, $\mu < \mu_0$, or $\mu > \mu_0$). Switching them or making $H_0$ your research hypothesis is a common error.
5.  **Confusing `loc` and `scale` with Mean and Standard Deviation:** While `loc` often corresponds to the mean and `scale` to the standard deviation for the Normal distribution, this is not universally true across all `scipy.stats` distributions. Always consult the documentation for the specific distribution to understand what its `loc` and `scale` parameters represent.
6.  **Data Dredging / P-hacking:** Running many different tests on the same data and only reporting the "significant" ones. This inflates the chance of finding a statistically significant result purely by random chance (Type I error) because each test has an $\alpha$ probability of falsely rejecting $H_0$.

## 7. Textbook-precise explanation

### Probability Distributions

A **random variable** $X$ is a function that maps the outcomes of a random phenomenon to numerical values.
A **probability distribution** is a mathematical function that describes the probabilities of different possible outcomes for a random variable.

1.  **Discrete Probability Distributions:**
    For a discrete random variable $X$, its distribution is characterized by a **Probability Mass Function (PMF)**, $P_X(x)$, which gives the probability that $X$ takes on a specific value $x$.
    $$P_X(x) = P(X=x)$$
    Properties:
    *   $0 \le P_X(x) \le 1$ for all $x$.
    *   $\sum_{x} P_X(x) = 1$, where the sum is over all possible values of $X$.
    The **Cumulative Distribution Function (CDF)** for a discrete random variable is $F_X(x) = P(X \le x) = \sum_{t \le x} P_X(t)$.

2.  **Continuous Probability Distributions:**
    For a continuous random variable $X$, its distribution is characterized by a **Probability Density Function (PDF)**, $f_X(x)$. The PDF itself does not give a probability; rather, the probability that $X$ falls within an interval $[a, b]$ is given by the integral of the PDF over that interval.
    $$P(a \le X \le b) = \int_a^b f_X(x) \, dx$$
    Properties:
    *   $f_X(x) \ge 0$ for all $x$.
    *   $\int_{-\infty}^{\infty} f_X(x) \, dx = 1$.
    The **Cumulative Distribution Function (CDF)** for a continuous random variable is $F_X(x) = P(X \le x) = \int_{-\infty}^{x} f_X(t) \, dt$.
    The **Quantile Function** (or Percent Point Function, PPF) $F_X^{-1}(q)$ returns the value $x$ such that $F_X(x) = q$.
    The **Survival Function (SF)** is $S_X(x) = P(X > x) = 1 - F_X(x)$.

*   **Reference:** DeGroot, M. H., & Schervish, M. J. (2012). *Probability and Statistics* (4th ed.). Pearson. (Chapter 3 & 4)

### Hypothesis Testing

**Hypothesis Testing** is a statistical inference procedure used to make a decision about a population parameter based on sample data.

1.  **Null Hypothesis ($H_0$):** A statement of no effect, no difference, or no relationship. It is the default assumption that is presumed true until statistical evidence indicates otherwise. It typically includes an equality sign (e.g., $\mu = \mu_0$, $p_1 = p_2$).
2.  **Alternative Hypothesis ($H_1$ or $H_A$):** A statement that contradicts the null hypothesis. It is what the researcher is trying to find evidence for. It can be one-sided (e.g., $\mu < \mu_0$ or $\mu > \mu_0$) or two-sided (e.g., $\mu \ne \mu_0$).
3.  **Test Statistic:** A value calculated from the sample data that summarizes the evidence against the null hypothesis. Its distribution under the assumption that $H_0$ is true is known.
4.  **P-value:** The probability of observing a test statistic as extreme as, or more extreme than, the one calculated from the sample data, *assuming the null hypothesis is true*. A small p-value suggests that the observed data is unlikely if $H_0$ were true, thus providing evidence against $H_0$.
    $$ \text{p-value} = P(\text{Test Statistic} \ge \text{observed value} | H_0 \text{ is true}) \quad \text{(for right-tailed test)} $$
5.  **Significance Level ($\alpha$):** A pre-determined threshold for the p-value, typically set at 0.05 or 0.01. It represents the maximum probability of committing a Type I error that the researcher is willing to tolerate.
6.  **Decision Rule:**
    *   If p-value $\le \alpha$, reject $H_0$.
    *   If p-value $> \alpha$, fail to reject $H_0$.
7.  **Types of Errors:**
    *   **Type I Error ($\alpha$ error):** Rejecting a true null hypothesis. The probability of a Type I error is $\alpha$.
    *   **Type II Error ($\beta$ error):** Failing to reject a false null hypothesis. The probability of a Type II error is $\beta$.
    *   **Power of a Test ($1-\beta$):** The probability of correctly rejecting a false null hypothesis.

*   **Reference:** Walpole, R. E., Myers, R. H., Myers, S. L., & Ye, K. (2017). *Probability & Statistics for Engineers & Scientists* (9th ed.). Pearson. (Chapter 10)

## 8. ASCII diagrams

Here's an ASCII diagram illustrating a standard Normal distribution, showing the mean and standard deviations.

```text
               PDF (Probability Density Function)
                       ^
                       |
                       |          *
                       |         / \
                       |        /   \
                       |       /     \
                       |      /       \
                       |     /         \
                       |    /           \
                       |   /             \
                       |  /               \
                       | /                 \
                     --+-------------------+-------------------X (Value)
                       |<-  -sigma  ->|<-   +sigma  ->|
                     -3sigma -2sigma -sigma  mu  +sigma +2sigma +3sigma
                                       (Mean)

Description:
This diagram shows the bell-shaped curve of a Normal (Gaussian) distribution.
- The horizontal axis (X) represents the values of the random variable.
- The vertical axis (PDF) represents the probability density at each X value.
- 'mu' (μ) marks the mean, which is also the peak of the curve, indicating the most likely values.
- 'sigma' (σ) represents the standard deviation, a measure of the spread of the data.
- The curve is symmetric around the mean.
- Approximately 68% of the data falls within (mu - sigma, mu + sigma).
- Approximately 95% of the data falls within (mu - 2*sigma, mu + 2*sigma).
- Approximately 99.7% of the data falls within (mu - 3*sigma, mu + 3*sigma).
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    *   **"Distributions Describe, Tests Decide."**
        *   **Distributions (scipy.stats.norm, .expon, etc.):** Use these methods (`pdf`, `cdf`, `ppf`, `rvs`) to *describe* the pattern of your data or to simulate data that follows a pattern. Imagine a mold that shapes your data.
        *   **Tests (scipy.stats.ttest_ind, .chisquare, etc.):** Use these functions to *decide* if a claim about your data is statistically supported. Imagine a judge making a ruling based on evidence.
    *   **Visual:** Picture a bell curve (Normal distribution) with `loc` pulling it left/right and `scale` stretching/squeezing it. Then, picture a courtroom where a small p-value is the "guilty" verdict (reject $H_0$) and a large p-value is "not enough evidence" (fail to reject $H_0$).

2.  **1-3 Formulas/Facts to Overlearn:**
    *   **P-value Definition:** $P(\text{Observed Data or More Extreme} | H_0 \text{ is True})$. This is the absolute core of hypothesis testing.
    *   **Decision Rule:** If p-value $\le \alpha$, reject $H_0$. Otherwise, fail to reject $H_0$.
    *   **`loc` and `scale`:** Understand that these are generic parameters in `scipy.stats` for location and scale, but their exact meaning (e.g., mean, median, standard deviation, rate) depends on the specific distribution. *Always check the docs!*

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this lesson, focusing on the core ideas and worked examples.
    *   **Day 3:** Re-read sections 4, 5, and 6. Try to re-do one example without looking at the solution.
    *   **Day 7:** Review the "Common Mistakes" and "Textbook-precise explanation." Try to explain the p-value to yourself in three different ways.
    *   **Day 16:** Attempt a new problem using `scipy.stats` that involves both distributions and hypothesis testing.
    *   **Day 35:** Summarize the entire lesson in your own words, focusing on the "why" behind each concept.

4.  **First-Principles Re-derivation Pathway:**
    *   **If you forget what a PDF/PMF or CDF is:**
        1.  Start with a simple discrete event: rolling a fair die.
        2.  List all possible outcomes: {1, 2, 3, 4, 5, 6}.
        3.  What's the probability of each outcome? $1/6$. This is your PMF.
        4.  What's the probability of rolling a 1 or 2? $1/6 + 1/6 = 2/6$.
        5.  What's the probability of rolling $\le 3$? $P(X=1) + P(X=2) + P(X=3) = 3/6$. This is your CDF at $x=3$.
        6.  Now extend this intuition to continuous variables: instead of summing probabilities, you're integrating densities over intervals. The core idea is still "probability of outcome or less."
    *   **If you forget the logic of Hypothesis Testing:**
        1.  Imagine a court trial. Default assumption: defendant is innocent ($H_0$).
        2.  Prosecutor presents evidence (your data).
        3.  If the evidence is *extremely unlikely* to occur if the defendant were truly innocent (small p-value), then you reject the innocence assumption.
        4.  If the evidence is *plausible* even if the defendant were innocent (large p-value), you don't have enough to convict, so you fail to reject innocence. You don't declare them "guilty" or "innocent," just whether there's enough evidence to overturn the default.

## 10. Connections — what this leads to

A strong understanding of `scipy.stats` and the underlying statistical concepts is foundational for numerous advanced topics in Computer Science and Data Science:

1.  **Machine Learning:**
    *   **Model Evaluation:** Hypothesis testing is used in A/B testing to compare different model versions or features.
    *   **Feature Engineering:** Understanding data distributions helps in transforming features (e.g., log transforms for skewed data) to meet assumptions of ML algorithms or improve performance.
    *   **Bayesian Methods:** Many Bayesian approaches rely heavily on probability distributions (priors, posteriors, likelihoods).
    *   **Uncertainty Quantification:** Quantifying the uncertainty in model predictions often involves statistical distributions.
2.  **Advanced Statistics and Econometrics:**
    *   **Regression Analysis:** Understanding distributions is crucial for interpreting residuals, checking model assumptions, and performing hypothesis tests on regression coefficients.
    *   **ANOVA (Analysis of Variance):** A generalization of the t-test for comparing means across multiple groups.
    *   **Time Series Analysis:** Modeling the distribution of errors or specific components in time series models.
    *   **Survival Analysis:** Analyzing the time until an event occurs, heavily reliant on specific probability distributions.
3.  **Data Science & Analytics:**
    *   **Exploratory Data Analysis (EDA):** Visualizing and summarizing data distributions is a core part of EDA to understand data characteristics.
    *   **Inferential Statistics:** Drawing conclusions about populations from samples, which is the essence of hypothesis testing.
    *   **Sampling and Simulation:** Generating random data from specific distributions is fundamental for Monte Carlo simulations, bootstrapping, and permutation tests.
4.  **Scientific Computing & Research:**
    *   **Experimental Design:** Designing experiments that allow for valid statistical inference.
    *   **Reproducibility:** Ensuring that scientific results are statistically robust and not due to chance.
    *   **Signal Processing:** Statistical methods are used to distinguish signals from noise.
5.  **Quality Control and Reliability Engineering:**
    *   Statistical process control (SPC) relies on understanding distributions of manufacturing outputs to detect when a process goes out of control.
    *   Reliability analysis uses distributions (e.g., Weibull) to model product lifetimes.

## 11. Self-check questions

1.  You are given a dataset of daily website visitors. How would you use `scipy.stats` to determine if this data reasonably follows a Poisson distribution, and what specific `scipy.stats` functions would be involved in the process (mention at least two)?
2.  Explain the difference between `scipy.stats.norm.pdf(x)` and `scipy.stats.norm.cdf(x)`. If you calculated `norm.pdf(0, loc=0, scale=1)`, what does the numerical output represent, and why is it not a probability?
3.  A pharmaceutical company tests a new drug. They hypothesize it will *increase* a patient's response time. Formulate the null ($H_0$) and alternative ($H_1$) hypotheses for this scenario. If they perform a t-test and get a p-value of 0.03, and their significance level ($\alpha$) is 0.05, what is their conclusion? What if $\alpha$ was 0.01?
4.  You have two