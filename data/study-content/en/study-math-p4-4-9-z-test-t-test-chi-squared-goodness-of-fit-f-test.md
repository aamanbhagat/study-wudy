## 1. The one-sentence answer
**These four procedures are classical hypothesis tests that decide whether observed sample data are consistent with a stated null hypothesis about a population parameter or distribution.**

The z-test compares a sample mean to a hypothesized population mean when the population variance is known and the sampling distribution of the mean is normal. It produces a standardized statistic whose tail probability under the null supplies the p-value.

The t-test performs the same comparison when the population variance must be estimated from the sample itself; the resulting statistic follows a heavier-tailed distribution whose exact form depends on the sample size. The chi-squared goodness-of-fit test asks whether categorical counts match the frequencies predicted by a fully specified probability model; the test statistic is the sum of squared Pearson residuals and is asymptotically chi-squared. The F-test compares two independent sample variances or, more generally, the ratio of two independent chi-squared random variables scaled by their degrees of freedom; it appears in ANOVA and regression as a test of equality of variances or of linear restrictions.

> [!NOTE]
> All four tests rest on the same logical skeleton—state a null, derive the sampling distribution of a chosen statistic under that null, and reject when the observed value lies in a pre-specified tail—yet each statistic’s distribution changes with what is known or unknown about the population.

## 2. Why this matters — concrete and current
Intel’s semiconductor fabrication lines use z-tests on critical-dimension measurements taken from thousands of wafers each day; because the process variance has been stable for years, the known-sigma z-test triggers immediate tool recalibration when the mean drifts beyond 3\sigma.

Google’s internal A/B testing platform defaults to Welch t-tests for latency and conversion-rate experiments whose sample sizes are modest and whose variances are estimated on the fly; the platform processes more than 10 000 such experiments weekly.

The 1000 Genomes Project applied chi-squared goodness-of-fit tests to verify that observed SNP allele counts across 2 504 individuals matched Hardy–Weinberg equilibrium predictions, flagging systematic genotyping errors when p-values fell below 10^{-6}.

Pfizer’s phase-III vaccine trials employed F-tests inside mixed-model ANOVA to compare variability of neutralizing-antibody titers across manufacturing lots; rejection of equal-variance nulls prompted additional process controls before lot release.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Normal distribution            | Sampling distribution of the mean is exactly normal when data are i.i.d. normal or approximately normal by CLT. |
| Central limit theorem          | Justifies z-test for large n even when population is non-normal. |
| Degrees of freedom             | Determines the exact distribution of t, \chi^{2}, and F statistics. |
| p-value and significance level | Common decision rule for all four tests.                  |
| Independence and identical distribution | Required for the derived sampling distributions to hold.  |

## 4. Building the idea — from intuition to formalism

### Step 1 — State a null hypothesis about a parameter
A null hypothesis asserts a specific numerical value for an unknown population quantity.  
Concrete example: a filling machine is supposed to deliver 500 ml on average.  
Formal statement:  
$$H_0: \mu = 500.$$

> [!WARNING]
> Treating the sample mean itself as the null instead of the population parameter produces an immediate logical contradiction.

### Step 2 — Form the z-statistic when variance is known
Standardize the observed mean by its known standard error.  
Example: \sigma = 10 ml, n = 25, \bar x = 503.  
$$Z = \frac{\bar x - \mu_0}{\sigma / \sqrt n} = \frac{503-500}{10/5} = 1.5.$$
Under H_0 and normality, Z ∼ N(0,1).

> [!WARNING]
> Using the sample standard deviation in place of \sigma changes the distribution from normal to t; the p-value will be miscalculated if this substitution is ignored.

### Step 3 — Replace \sigma with s and obtain the t-statistic
When \sigma is unknown, the sample variance s^{2} introduces extra uncertainty.  
The statistic  
$$T = \frac{\bar x - \mu_0}{s / \sqrt n}$$  
follows a t-distribution with n−1 degrees of freedom.

> [!WARNING]
> For very small n the t-distribution has substantially heavier tails; using normal critical values understates the p-value.

### Step 4 — Count expected frequencies and form the chi-squared goodness-of-fit statistic
For categorical data, compute  
$$\chi^2 = \sum_{i=1}^k \frac{(O_i - E_i)^2}{E_i},$$  
where E_i = n p_i under the hypothesized probabilities. Under H_0 the statistic converges to \chi^{2}_{k-1} for large n.

> [!WARNING]
> Expected counts below 5 in any cell invalidate the \chi^{2} approximation; the test then requires exact multinomial enumeration.

### Step 5 — Form the F-statistic as a ratio of scaled chi-squared variables
The ratio of two independent variance estimators, each divided by its degrees of freedom,  
$$F = \frac{S_1^2 / \nu_1}{S_2^2 / \nu_2}$$  
follows an F-distribution with (\nu_1, \nu_2) degrees of freedom. This is the exact distribution needed to test equality of two normal variances or linear restrictions in regression.

> [!WARNING]
> The F-distribution is derived under normality; modest departures from normality can produce large errors in the upper tail.

## 5. Worked examples — every step shown

**Example 1 — z-test for known variance**  
*Given:* Population \sigma = 2.5, n = 36, \bar x = 10.8, H_0: \mu = 10, \alpha = 0.05 two-sided.  
*Find:* p-value and decision.  
Step 1: Compute standard error \sigma/\sqrt n = 2.5/6 \approx 0.4167.  
*Why:* definition of standard error of the mean.  
Step 2: Z = (10.8 − 10)/0.4167 \approx 1.92.  
*Why:* standardization under H_0.  
Step 3: \Phi(−1.92) + (1 − \Phi(1.92)) = 2 \times 0.0274 = 0.0548.  
*Why:* symmetry of standard normal.  
**Final answer:** p = 0.0548 > 0.05, do not reject H_0.  
*Reflection:* The calculation is exact only because \sigma is treated as known; any estimation of \sigma would require the t-distribution.

**Example 2 — one-sample t-test**  
*Given:* n = 10, \bar x = 102.3, s = 4.8, H_0: \mu = 100.  
Step 1: s/\sqrt n = 4.8/\sqrt10 \approx 1.518.  
*Why:* estimated standard error.  
Step 2: T = (102.3 − 100)/1.518 \approx 1.515, df = 9.  
*Why:* definition of t-statistic.  
Step 3: Two-tailed p-value from t_9 tables or software \approx 0.164.  
**Final answer:** p > 0.05, insufficient evidence against H_0.  
*Reflection:* The heavier t-tails correctly widen the acceptance region for small samples.

**Example 3 — chi-squared goodness of fit**  
*Given:* 200 rolls of a die, observed counts [28, 35, 32, 41, 29, 35], H_0: fair die.  
Step 1: E_i = 200/6 \approx 33.333 each.  
*Why:* uniform probability under fairness.  
Step 2: \chi^{2} = \Sigma(O_i − 33.333)^{2}/33.333 \approx 4.12, df = 5.  
*Why:* Pearson’s formula.  
Step 3: p-value = P(\chi^{2}_5 > 4.12) \approx 0.532.  
**Final answer:** do not reject fairness.  
*Reflection:* All E_i > 5 satisfies the rule of thumb; otherwise an exact test would be required.

**Example 4 — two-sample F-test**  
*Given:* s_{1}^{2} = 12.4 (n_{1} = 15), s_{2}^{2} = 7.1 (n_{2} = 12), H_0: \sigma_{1}^{2} = \sigma_{2}^{2}.  
Step 1: F = 12.4/7.1 \approx 1.746, df = (14,11).  
*Why:* ratio of unbiased variance estimators.  
Step 2: Upper-tail p-value \approx 0.18 (software).  
**Final answer:** fail to reject equality of variances.  
*Reflection:* The test is highly sensitive to non-normality; Levene’s test is often preferred in practice.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using z critical values with s instead of \sigma | Habit of always standardizing by sample sd         | Check whether \sigma is truly known before choosing z |
| Ignoring df when reporting t or F | Treating all t or F tables as interchangeable      | Always state the degrees of freedom with the statistic |
| Applying \chi^{2} when any E_i < 5 | Asymptotic approximation breaks down                | Collapse categories or use exact multinomial test    |
| Assuming F-test robustness        | Belief that variance ratios are distribution-free  | Verify normality or switch to Levene/Brown–Forsythe  |
| Two-sided p-value reported as one-sided | Misreading software output                         | Double the one-tail probability when the alternative is two-sided |
| Forgetting that \chi^{2} GOF tests a fully specified distribution | Treating estimated parameters as fixed             | Subtract extra df for each estimated parameter       |
| Pooling variances without an F-test first | Automatic assumption of homoscedasticity           | Perform preliminary F-test or use Welch adjustment   |

## 7. The textbook-precise statement
Let X_{1},…,Xₙ be i.i.d. N(\mu,\sigma^{2}).  
If \sigma^{2} is known, then under H_{0}: \mu = \mu_{0} the statistic  
$$Z = \sqrt n (\bar X - \mu_0)/\sigma \sim N(0,1).$$  
If \sigma^{2} is unknown, replace \sigma by S and obtain  
$$T = \sqrt n (\bar X - \mu_0)/S \sim t_{n-1}.$$  
For multinomial counts with probabilities p = (p_{1},…,p_k) fully specified, the Pearson statistic converges in distribution to \chi^{2}_{k−1}.  
For two independent normal samples the ratio of sample variances follows F_{\nu_1,\nu_2}.  
Reference: Casella & Berger, *Statistical Inference*, 2nd ed., Sections 8.3.1–8.3.4 and 9.2.

## 8. Visual — diagram or schematic
```text
Decision tree for choosing the test
                ┌──────────────────────┐
                │  Data type?          │
                └──────────┬───────────┘
          ┌────────────────┼────────────────┐
       Numeric                        Categorical
          │                                │
   Variance known?                 Goodness-of-fit
   ┌──────┴──────┐                       │
  Yes           No                  \chi^{2} GOF
   │             │
   Z-test       t-test
                 │
            Compare two variances?
                 │
               Yes → F-test
```

## 9. The memory technique
1. **The hook** — picture four courtroom witnesses: “Z” wears a lab coat with the population \sigma printed on it, “T” carries a small-sample warning label, “Chi” holds a bag of colored marbles, and “F” balances two scales.
2. **What to overlearn** — Z = (\bar x − \mu_{0})/(\sigma/\sqrt n), T uses s, \chi^{2} = \Sigma(O−E)^{2}/E with df = k−1, F = (s_{1}^{2}/\nu_{1})/(s_{2}^{2}/\nu_{2}).
3. **Spaced-repetition schedule** — review the four formulas at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — re-derive each statistic by writing the likelihood ratio or by transforming the normal density to the desired pivot.

## 10. What this unlocks
Mastery of these four tests supplies the inferential engine for linear regression, ANOVA, and generalized linear models. Subsequent topics include likelihood-ratio tests, Wald and score tests, bootstrap confidence intervals, and multiple-comparison corrections such as Bonferroni and Benjamini–Hochberg.

## 11. Self-check — five questions, no answers
1. A sample of size 4 yields s = 3.2; the population \sigma is claimed to be 2.5. Which test is valid for H_{0}: \mu = 10 and why?
2. Observed counts in four categories are 9, 11, 8, 12. After fitting a one-parameter model the expected counts become 10 each. What is the correct reference distribution for the goodness-of-fit statistic?
3. An F-statistic equals 0.4 with (10,15) degrees of freedom. Is this value in the rejection region for a two-sided test of equal variances at \alpha = 0.05?
4. Explain why the z-test p-value is always smaller than the corresponding t-test p-value for the same data when n < 30.
5. In a 2\times2 contingency table the chi-squared statistic is 4.2. After Yates’ continuity correction the statistic drops to 2.9. Which result should be reported and under what condition?