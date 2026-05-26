## 1. The one-sentence answer
**Hypothesis testing is a formal procedure that decides whether observed data provide sufficient evidence to reject a default claim (the null hypothesis) in favor of an alternative claim, while explicitly controlling the probabilities of two distinct kinds of error.**

The procedure begins with two mutually exclusive statements about an unknown parameter or distribution. One statement, called the null, is treated as true until the data force its rejection. The second statement, the alternative, is accepted only when the data are sufficiently improbable under the null. A single number, the test statistic, is computed from the data; its sampling distribution under the null is known or approximated. The p-value is then the probability, under that null distribution, of obtaining a test statistic at least as extreme as the one observed. If the p-value falls below a pre-chosen threshold, the null is rejected.

Two errors are possible. Rejecting the null when it is true is a Type I error; its probability is fixed in advance by the threshold. Failing to reject the null when the alternative is true is a Type II error; its probability depends on the true parameter value and the sample size. The entire framework therefore rests on comparing the observed evidence against a controlled risk of false rejection.

> [!NOTE]
> The p-value is **not** the probability that the null hypothesis is true; it is the probability of the observed (or more extreme) data assuming the null is true.

## 2. Why this matters — concrete and current
In large-scale A/B testing at Google and Meta, every user-interface change is evaluated by a hypothesis test on click-through rate or conversion. The null states that the new design produces no improvement; the test controls the daily risk of shipping a regression that actually harms engagement.

Particle physicists at CERN used hypothesis testing to claim the Higgs boson discovery in 2012. The null hypothesis was “background-only fluctuations explain the data”; the test statistic was a likelihood-ratio, and the reported p-value of approximately 3 × 10^{-7} corresponded to five-standard-deviation evidence before the null was rejected.

Semiconductor manufacturers such as TSMC apply hypothesis tests to every wafer lot. The null asserts that defect density meets the target specification; rejection triggers immediate process intervention, limiting the financial loss from shipping faulty chips.

In clinical trials for mRNA vaccines, regulators require a pre-specified hypothesis test on infection rates between vaccine and placebo arms. The Type I error rate is capped at 0.05 (or lower after multiplicity adjustment), directly determining whether emergency-use authorization is granted.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Random variables and their distributions | The test statistic is itself a random variable whose distribution under the null must be known. |
| Expectation and variance | Many test statistics are standardized means whose variance appears in the denominator. |
| Cumulative distribution function | The p-value is obtained by evaluating the CDF (or survival function) of the test statistic. |
| Independence and i.i.d. sampling | Standard error formulas and limiting distributions rely on independent observations. |

## 4. Building the idea — from intuition to formalism

### Step 1 — State the default claim that will be challenged
You begin by writing down the claim you are willing to maintain unless the data become embarrassing for it. This claim is the null hypothesis.  
Concrete example: a coin is fair, so \(p = 1/2\).  
Formal statement:  
\[H_0: \theta \in \Theta_0\]  
where \(\Theta_0\) is a set of parameter values.  
> [!WARNING]  
> Treating a scientific question as already settled by writing an overly narrow null (e.g., exactly zero effect) can make rejection trivial even when the practical difference is negligible.

### Step 2 — Write the competing claim you will accept if the data are awkward for the null
The alternative hypothesis contains every parameter value you are prepared to endorse once the null is rejected.  
Concrete example: the coin is biased toward heads, so \(p > 1/2\).  
Formal statement:  
\[H_a: \theta \in \Theta_a\]  
with \(\Theta_0 \cap \Theta_a = \emptyset\).

### Step 3 — Choose a single number that summarizes how far the data depart from the null
This number is the test statistic \(T = T(X_1,\dots,X_n)\). It is constructed so that large values are evidence against \(H_0\).  
Concrete example: number of heads in 100 tosses.  
Formal statement: \(T\) must have a known distribution \(F_0\) when \(H_0\) is true.

### Step 4 — Compute the probability, under the null, of results at least as extreme as those observed
That probability is the p-value:  
\[p = P(T \ge t_{\text{obs}} \mid H_0).\]  
If the distribution is continuous and symmetric, the two-sided version doubles the tail probability.

### Step 5 — Fix in advance the maximum acceptable probability of rejecting a true null
This number \(\alpha\) is the significance level and equals the Type I error probability:  
\[\alpha = P(\text{reject } H_0 \mid H_0 \text{ true}).\]  
Rejection occurs when \(p < \alpha\).

### Step 6 — Define the second error and its probability
A Type II error occurs when the null is false yet is not rejected. Its probability \(\beta(\theta)\) is a function of the true parameter:  
\[\beta(\theta) = P(\text{accept } H_0 \mid \theta \in \Theta_a).\]  
Power is \(1 - \beta(\theta)\).

### Step 7 — State the decision rule that controls both error types
Reject \(H_0\) if and only if the observed test statistic falls inside the critical region whose probability under \(H_0\) equals \(\alpha\). All preceding quantities are thereby linked in a single coherent procedure.

## 5. Worked examples — every step shown

**Example 1 — Fair-coin test**  
*Given:* 100 tosses yield 62 heads. Test \(H_0: p = 0.5\) versus \(H_a: p > 0.5\) at \(\alpha = 0.05\).  
*Find:* p-value and decision.  
Under \(H_0\), \(T \sim \text{Bin}(100,0.5)\).  
Observed \(t = 62\).  
p-value = \(\sum_{k=62}^{100} \binom{100}{k} (0.5)^{100}\).  
Using normal approximation with continuity correction:  
\[Z = \frac{62 - 0.5 - 50}{\sqrt{25}} = 2.3,\]  
\[p \approx 1 - \Phi(2.3) = 0.0107.\]  
Since \(0.0107 < 0.05\), reject \(H_0\).  
**Reject \(H_0\) at \(\alpha = 0.05\)**  
*Reflection:* The continuity correction prevents overstatement of significance for discrete data; the same logic scales to any binomial test.

**Example 2 — One-sided z-test for mean**  
*Given:* \(n=25\), \(\bar{x}=52.1\), \(s=4.2\), test \(H_0: \mu=50\) versus \(H_a: \mu>50\) at \(\alpha=0.05\).  
*Find:* test statistic, p-value, decision.  
Test statistic:  
\[Z = \frac{52.1-50}{4.2/\sqrt{25}} = 2.50.\]  
p-value = \(1-\Phi(2.50)=0.0062\).  
Decision: reject.  
**Reject \(H_0\)**  
*Reflection:* The standardization step converts any location parameter into a pivotal quantity whose null distribution does not depend on unknown scale.

**Example 3 — Two-sided test with unknown variance**  
*Given:* same data as Example 2 but now test \(H_0: \mu=50\) versus \(H_a: \mu\neq50\).  
*Find:* appropriate statistic and critical value.  
Use  
\[t = \frac{52.1-50}{4.2/\sqrt{25}} = 2.50\]  
with 24 degrees of freedom.  
Critical value \(t_{0.025,24}\approx 2.064\).  
Since \(|2.50|>2.064\), reject.  
**Reject \(H_0\)**  
*Reflection:* Switching from z to t accounts for extra uncertainty in estimating \(\sigma\); the heavier tails of the t-distribution raise the bar for rejection.

**Example 4 — Power calculation**  
*Given:* same design as Example 2, true \(\mu=52\).  
*Find:* Type II error probability at \(\alpha=0.05\).  
Under true mean 52 the non-centrality parameter is  
\[\delta = \frac{52-50}{4.2/5} = 2.38.\]  
\(\beta = P(Z < 1.645 - 2.38) = \Phi(-0.735) \approx 0.231\).  
**\(\beta \approx 0.231\)**  
*Reflection:* Power depends on the distance between null and true value; increasing sample size reduces both \(\alpha\) and \(\beta\) simultaneously only through larger \(n\).

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Interpreting p-value as \(P(H_0 \mid \text{data})\) | Confuses probability of data given hypothesis with probability of hypothesis given data | Always state “probability of data or more extreme, assuming null true” |
| Treating failure to reject as proof of the null | Absence of evidence is not evidence of absence when power is low | Report power or confidence interval alongside the test |
| Changing \(\alpha\) after seeing the p-value | Inflates Type I error | Pre-register significance level and analysis plan |
| Using one-sided test when two-sided question was posed | Selective reporting | Justify direction before collecting data |
| Ignoring multiple testing | Family-wise error rate grows with number of tests | Apply Bonferroni, FDR, or pre-specify primary endpoint |
| Assuming normality without checking | Central-limit theorem requires large n or known distribution | Verify residuals or use non-parametric alternative |
| Equating statistical significance with practical importance | Large n can make tiny effects “significant” | Always report effect size and confidence interval |

## 7. The textbook-precise statement
Let \(X_1,\dots,X_n\) be i.i.d. with distribution \(P_\theta\), \(\theta\in\Theta\). A test of \(H_0:\theta\in\Theta_0\) versus \(H_a:\theta\in\Theta_a\) at level \(\alpha\) is a measurable function \(\phi(X)\) such that  
\[E_\theta[\phi(X)]\le\alpha\quad\text{for all }\theta\in\Theta_0.\]  
The power function is \(\beta(\theta)=E_\theta[\phi(X)]\). The p-value is the smallest \(\alpha\) for which the observed data lead to rejection. (Casella & Berger, *Statistical Inference*, 2nd ed., §8.2–8.3.)

## 8. Visual — diagram or schematic
```text
Density
  ^
  |          Alternative (μ=52)
  |         /\
  |        /  \
  |  Null /    \  Rejection
  |  (μ=50)     \   region
  |     /        \____
  |    /              \
  +----+----+----+----+---->  x̄
     50   51   52   53   54
          α = 0.05 tail
```
Horizontal axis: sample mean. Vertical axis: density. Two overlapping bell curves centered at 50 and 52. Vertical line at the critical value corresponding to α = 0.05 under the null; area to the right of the line under the null curve is shaded and labelled “Type I error region”; area to the left of the line under the alternative curve is labelled “Type II error region”.

## 9. The memory technique
1. **The hook** — Picture a courtroom: the defendant is presumed innocent (null) until the prosecutor presents evidence so extreme that the jury rejects innocence; the p-value is the probability of seeing that much evidence if the defendant really is innocent.  
2. **What to overlearn** — \(p = P(T\ge t_{\text{obs}} \mid H_0)\), \(\alpha = P(\text{Type I})\), power = \(1-\beta(\theta)\).  
3. **Spaced-repetition schedule** — Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days after first study.  
4. **First-principles fallback** — Re-derive the rejection region by fixing the tail probability of the known null distribution of the test statistic and computing the complementary probability under a chosen alternative.

## 10. What this unlocks
Mastery of hypothesis testing supplies the logical skeleton for every subsequent inferential procedure that must decide between competing models while controlling error rates.  

- Construction of uniformly most powerful tests (Neyman–Pearson lemma)  
- Likelihood-ratio, Wald, and score tests  
- Multiple-comparison corrections and false-discovery-rate control  
- Sequential analysis and adaptive clinical-trial designs  
- Bayesian hypothesis testing via Bayes factors (as a contrasting framework)

## 11. Self-check — five questions, no answers
1. A test yields p = 0.03. Does this imply that the probability the null is true is 0.03? Explain.  
2. For fixed α and effect size, how does β change when n is doubled?  
3. Why is it impossible to compute a single numerical value for β without specifying the true parameter?  
4. A researcher runs 20 independent tests at α = 0.05 and obtains one p-value of 0.01. What is the probability of at least one false rejection if all nulls are true?  
5. Derive the exact critical value for a two-sided binomial test with n = 20, α = 0.05 under H₀: p = 0.5.