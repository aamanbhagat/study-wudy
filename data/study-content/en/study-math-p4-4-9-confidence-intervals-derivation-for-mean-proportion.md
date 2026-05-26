## 1. The one-sentence answer
**A confidence interval is the range of values for an unknown population parameter that is consistent with the observed sample at a chosen coverage probability, obtained by inverting the sampling distribution of a pivotal quantity.**

The interval is built from the fact that a properly standardized estimator follows a known distribution—most often standard normal or Student’s t—under repeated sampling. Once that distribution is fixed, the probability statement \(P(L \le \theta \le U) = 1 - \alpha\) is rearranged to solve for the unknown parameter \(\theta\) in terms of the observed data, yielding explicit lower and upper bounds \(L\) and \(U\).

For the mean of a normal population (or for any mean when the sample is large), the pivotal quantity is the standardized sample mean. For a proportion the pivotal quantity is the standardized sample proportion, again approximately normal for large \(n\). In both cases the width of the resulting interval shrinks with \(\sqrt{n}\) and grows with the chosen critical value.

> [!NOTE]
> The interval does not give the probability that the fixed but unknown parameter lies inside it; it gives the probability that the random interval, constructed before the data are seen, will contain the parameter.

## 2. Why this matters — concrete and current
In semiconductor process control, Intel uses 99 % confidence intervals on the mean critical-dimension measurement from scanning-electron micrographs to decide whether a lithography tool requires recalibration; the interval width directly determines the acceptable process window.

In clinical trials run by Pfizer, the primary efficacy endpoint for a vaccine is reported as a 95 % Wilson-score interval for the proportion of protected subjects; regulatory approval hinges on the lower bound exceeding a pre-specified threshold.

NASA’s Mars 2020 entry-descent-landing team constructs 3\(\sigma\) confidence intervals on the mean atmospheric density encountered by the spacecraft; these intervals feed the Monte-Carlo dispersion analysis that sets the final landing-ellipse size.

Large-scale A/B tests at Google Search rely on 95 % confidence intervals for the difference in click-through proportions; automated stopping rules halt an experiment only when the interval for the lift excludes zero.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|---------------------------------------------------------------------------------------|
| Sampling distribution of \(\bar{X}\) and \(\hat{p}\) | Supplies the probability law that lets us write \(P(-z_{\alpha/2} \le Z \le z_{\alpha/2}) = 1-\alpha\). |
| Central Limit Theorem    | Justifies normality of the standardized estimator when the population is unknown or non-normal but \(n\) is large. |
| Standard error           | Scales the critical value to the actual variability of the estimator.                 |
| Quantiles of \(N(0,1)\)  | Provide the numerical multipliers \(z_{\alpha/2}\) that enforce the coverage probability. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The sampling distribution is the sole source of randomness
A single sample yields one number, yet that number is random because the sample itself is random. The sampling distribution of the estimator therefore supplies the only probability statement we are allowed to make before the data arrive.

Example: Draw \(n=25\) i.i.d. observations from \(N(\mu, \sigma^2)\) with \(\sigma\) known. Then \(\bar{X} \sim N(\mu, \sigma^2/n)\).

$$P\left(\mu - 1.96\frac{\sigma}{\sqrt{n}} < \bar{X} < \mu + 1.96\frac{\sigma}{\sqrt{n}}\right) = 0.95.$$

> [!WARNING]
> Treating \(\mu\) as random after the sample is observed violates the fixed-parameter assumption and produces the common misinterpretation “there is 95 % probability that \(\mu\) lies inside the interval.”

### Step 2 — Standardize to obtain a pivotal quantity
Subtract the unknown mean and divide by the known standard deviation of \(\bar{X}\). The resulting random variable no longer depends on \(\mu\).

$$Z = \frac{\bar{X} - \mu}{\sigma / \sqrt{n}} \sim N(0,1).$$

### Step 3 — Write the probability statement that defines coverage
Choose \(\alpha\) (commonly 0.05) and read the critical value from the standard normal table.

$$P(-z_{\alpha/2} < Z < z_{\alpha/2}) = 1 - \alpha.$$

### Step 4 — Invert the inequality to isolate the parameter
Substitute the expression for \(Z\) and rearrange all terms involving \(\mu\) to the center.

$$P\left(\bar{X} - z_{\alpha/2}\frac{\sigma}{\sqrt{n}} < \mu < \bar{X} + z_{\alpha/2}\frac{\sigma}{\sqrt{n}}\right) = 1 - \alpha.$$

The random interval \([\bar{X} - z_{\alpha/2}\sigma/\sqrt{n},\ \bar{X} + z_{\alpha/2}\sigma/\sqrt{n}]\) therefore covers the fixed \(\mu\) with probability \(1-\alpha\).

### Step 5 — Replace \(\sigma\) by \(s\) when it is unknown (Student’s t)
When the population variance must be estimated, the pivotal quantity becomes \(T = (\bar{X}-\mu)/(s/\sqrt{n})\) which follows a \(t_{n-1}\) distribution. The same inversion yields the interval that uses \(t_{n-1,\alpha/2}\).

### Step 6 — Adapt the same logic to a proportion
For \(X\sim\text{Bin}(n,p)\) the sample proportion \(\hat{p}=X/n\) satisfies, by the CLT,
$$\sqrt{n}(\hat{p}-p)/\sqrt{p(1-p)}\approx N(0,1).$$
Inverting the inequality with the estimated standard error \(\sqrt{\hat{p}(1-\hat{p})/n}\) produces the Wald interval; the Wilson score interval improves the approximation by centering at a different point.

## 5. Worked examples — every step shown

**Example 1 — Known-variance normal mean**  
*Given:* \(n=25\), \(\bar{x}=102\), \(\sigma=15\), desired coverage 95 %.  
*Find:* 95 % CI for \(\mu\).

Step 1: \(z_{0.025}=1.96\).  
*Why:* Standard normal quantile that leaves tail probability 0.025 on each side.  
Step 2: Margin of error \(=1.96\times15/\sqrt{25}=5.88\).  
*Why:* Multiply critical value by exact standard error.  
Step 3: Interval \([102-5.88,\ 102+5.88]\).  
**Final answer**  
\([96.12,\ 107.88]\)

*Reflection:* The calculation is exact because both normality and \(\sigma\) are given; the only randomness is the location of \(\bar{X}\).

**Example 2 — Unknown-variance normal mean**  
*Given:* Same data, but \(s=14.2\).  
Step 1: Degrees of freedom \(=24\), \(t_{24,0.025}=2.064\).  
*Why:* Student’s t replaces \(z\) once \(\sigma\) is estimated.  
Step 2: Margin \(=2.064\times14.2/\sqrt{25}=5.84\).  
**Final answer**  
\([96.16,\ 107.84]\)

*Reflection:* The interval widens slightly because extra uncertainty in \(s\) is acknowledged.

**Example 3 — Large-sample proportion (Wald)**  
*Given:* \(n=400\), \(x=240\), 95 % coverage.  
Step 1: \(\hat{p}=0.6\), \(\widehat{\text{SE}}=\sqrt{0.6\times0.4/400}=0.0245\).  
Step 2: Margin \(=1.96\times0.0245=0.048\).  
**Final answer**  
\([0.552,\ 0.648]\)

*Reflection:* The normal approximation is acceptable because \(np\) and \(n(1-p)\) both exceed 10.

**Example 4 — Small-sample proportion (Wilson)**  
*Given:* \(n=20\), \(x=3\).  
Step 1: Solve the quadratic obtained by inverting \(|(\hat{p}-p)/\sqrt{p(1-p)/n}|<1.96\).  
*Why:* The Wilson interval recenters the variance at the boundary values, removing the zero-width problem when \(\hat{p}=0\) or 1.  
**Final answer**  
\([0.081,\ 0.379]\)

*Reflection:* The Wald interval would have been \([−0.014,\ 0.314]\), which is nonsensical; the Wilson construction automatically respects [0,1].

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Interpreting the CI as “95 % probability that \(\mu\) lies inside” | Confusion between the random interval before observation and the fixed interval after observation | Always state “the random interval covers \(\mu\) with probability 0.95 before sampling.” |
| Using \(z\) when \(n<30\) and \(\sigma\) unknown | Over-reliance on the CLT without checking degrees of freedom | Switch to the t-distribution whenever \(\sigma\) is estimated. |
| Reporting a CI for \(p\) when \(np<5\) or \(n(1-p)<5\) | Normal approximation fails in the tails | Use Wilson, Clopper-Pearson, or Agresti-Coull intervals. |
| Treating overlapping CIs as evidence of no difference | Overlap rule ignores correlation between estimators | Construct a CI for the difference directly. |
| Forgetting that coverage is a long-run frequency | Single-interval intuition feels like a probability statement | Simulate many intervals from the same \(\theta\) and count how many contain \(\theta\). |
| Plugging \(\hat{p}\) into the standard error before deciding sample size | Circular dependence on unknown parameter | Use a conservative value \(p=0.5\) or an adaptive two-stage design. |
| Reporting one-sided bounds as two-sided intervals | Misreading software output that prints only the upper or lower limit | Verify the \(\alpha/2\) split in each tail. |

## 7. The textbook-precise statement
Let \(X_1,\dots,X_n\) be i.i.d. \(N(\mu,\sigma^2)\) with \(\sigma\) known. Then the interval
\[
\left[\bar{X}-z_{\alpha/2}\frac{\sigma}{\sqrt{n}},\ \bar{X}+z_{\alpha/2}\frac{\sigma}{\sqrt{n}}\right]
\]
satisfies
\[
P\left(\mu\in\left[\bar{X}-z_{\alpha/2}\frac{\sigma}{\sqrt{n}},\ \bar{X}+z_{\alpha/2}\frac{\sigma}{\sqrt{n}}\right]\right)=1-\alpha
\]
for every \(\mu\in\mathbb{R}\). (Casella & Berger, *Statistical Inference*, 2e, Theorem 9.2.1.)

When \(\sigma\) is unknown the same coverage statement holds after replacing \(z_{\alpha/2}\) by \(t_{n-1,\alpha/2}\) and \(\sigma\) by \(s\). For a binomial proportion the Wald interval is the direct analogue obtained from the CLT; its coverage converges to \(1-\alpha\) as \(n\to\infty\) provided \(p\in(0,1)\).

## 8. Visual — diagram or schematic
```text
          Density
            ^
            |          95 % coverage
            |     ___________________________
            |    /                           \
            |   /     2.5 % tail     2.5 % tail \
   ---------|------------------------------------|--------> Z
           -1.96                               +1.96
                 |<---------- 95 % ---------->|
```
The horizontal axis is the standard-normal scale. Vertical lines at \(\pm1.96\) mark the quantiles that leave exactly 2.5 % probability in each tail. The shaded central region corresponds to the event that the random interval covers the true parameter.

## 9. The memory technique

1. **The hook**  
   Picture a fisherman casting a net of fixed width; in the long run 95 out of every 100 casts will enclose the fish (the parameter). The fish does not move; the net does.

2. **What to overlearn**  
   - \(z_{0.025}=1.96\) and \(t_{\infty,0.025}=1.96\) (they coincide).  
   - Standard error of the mean: \(\sigma/\sqrt{n}\).  
   - Standard error of the proportion: \(\sqrt{\hat{p}(1-\hat{p})/n}\).

3. **Spaced-repetition schedule**  
   Review the derivation at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

4. **First-principles fallback**  
   Begin with the sampling distribution of \(\bar{X}\), standardize to \(Z\), write \(P(-z<Z<z)=1-\alpha\), and algebraically isolate \(\mu\).

## 10. What this unlocks
Confidence intervals are the gateway to hypothesis testing, sample-size calculations, and meta-analysis. The same inversion technique yields intervals for differences of means, ratios of variances, regression coefficients, and hazard ratios. Mastery here permits immediate transition to the Neyman-Pearson lemma, likelihood-ratio tests, and bootstrap percentile intervals.

## 11. Self-check — five questions, no answers
1. A sample of size 9 from \(N(\mu,9)\) yields \(\bar{x}=20\). Give the exact 95 % CI for \(\mu\) when \(\sigma=3\) is known.

2. The same data are observed but \(\sigma\) is replaced by \(s=3.2\). How does the interval change and why?

3. In a poll of 900 voters, 495 support candidate A. Compute both the Wald and Wilson 95 % intervals for the population proportion.

4. Explain why a 99 % interval is wider than a 95 % interval even though both are centered at the same point estimate.

5. A researcher claims: “Because the 95 % CI for \(\mu\) is [12.3, 14.7], there is a 95 % probability that \(\mu\) lies between 12.3 and 14.7.” Identify the precise statistical error in the claim.