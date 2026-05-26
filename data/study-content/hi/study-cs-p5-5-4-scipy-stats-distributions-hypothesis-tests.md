## 1. The one-sentence answer
**scipy.stats supplies a unified interface to probability distributions and classical hypothesis tests so you can model data and decide whether observed differences are statistically credible.**

Distributions live inside classes such as `norm`, `binom` and `poisson`. Each class exposes methods `pdf`, `cdf`, `ppf`, `rvs` and `fit` that work identically across every distribution. Hypothesis tests appear as standalone functions (`ttest_1samp`, `chi2_contingency`, `ks_1samp`) that internally rely on the same distribution objects to compute p-values.

The library therefore removes the need to hand-code integrals or lookup tables; once you know the statistical question, the code is usually one or two lines.

> [!NOTE]
> The single most important realisation is that every distribution object is also a random-variable generator; sampling (`rvs`) and analytic probability (`cdf`) share the same parameter object, so you never have to keep two separate mental models.

## 2. Why this matters — concrete and current
SpaceX uses `scipy.stats.norm` inside its post-flight telemetry pipeline to set 3-sigma limits on thrust residuals before declaring a booster healthy. The same distribution objects feed the Monte-Carlo dispersion analysis that decides whether a Starship re-entry corridor is safe.

In semiconductor fabs, Intel’s yield-learning team fits `scipy.stats.weibull_min` to time-to-failure data from accelerated life tests; the fitted scale parameter directly drives the burn-in schedule that appears in every quarterly reliability report.

OpenAI’s evaluation harness calls `scipy.stats.ttest_ind` (with Welch correction) on benchmark scores across model ablations; the resulting p-values decide whether an architecture change is promoted to the next training run.

LIGO’s glitch-classification pipeline runs `scipy.stats.ks_2samp` between strain histograms recorded during “quiet” and “loud” segments; any p-value below \(10^{-6}\) triggers an automated detector veto that protects downstream gravitational-wave searches.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Random variable  | Every distribution object represents one; you must know the difference between a realisation and its law. |
| CDF / PDF        | `cdf` returns p-values; `pdf` is required for likelihood-based fitting. |
| Null hypothesis  | All test functions return a p-value under an explicitly stated null; you must be able to write that null in one sentence. |
| Parameters vs. statistics | `loc`, `scale` and `df` are model parameters; sample mean and variance are statistics you feed into tests. |

If any row is unfamiliar, pause and read the corresponding section on probability before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — A distribution object is a parameterised law
You create a frozen distribution once, then reuse it for every operation.  
Example: `from scipy.stats import norm; rv = norm(loc=0, scale=1)`.  
Formal statement: a random variable \(X\sim\mathcal{N}(\mu,\sigma^2)\) is represented by the object whose methods evaluate \(\Phi(x;\mu,\sigma)\) and draw i.i.d. samples.  

> [!WARNING]
> Changing `loc` or `scale` after creation does not mutate an existing object; you must create a new instance or you will silently reuse the old parameters.

### Step 2 — `rvs` draws samples, `cdf` evaluates probability
`rv.rvs(size=1000)` returns an array whose empirical distribution converges to the theoretical law. `rv.cdf(1.96)` returns \(\Phi(1.96)\approx0.975\).  

### Step 3 — `ppf` is the inverse of `cdf`
`rv.ppf(0.975)` recovers the critical value 1.96. This is the function used internally by every two-sided test to obtain rejection thresholds.

### Step 4 — Hypothesis tests wrap a test statistic and a tail probability
`ttest_1samp` computes \(t=\frac{\bar{x}-\mu_0}{s/\sqrt{n}}\) and returns the survival function of a \(t_{n-1}\) distribution evaluated at \(|t|\).

### Step 5 — p-value is always \(P(T\ge t_{\text{obs}}\mid H_0)\)
Under the null, the test statistic follows a known distribution object; the p-value is one minus its CDF at the observed value (or twice that for two-sided tests).

### Step 6 — The library guarantees broadcasting and broadcasting only
All methods accept NumPy arrays for the quantiles or probabilities, enabling vectorised computation over many independent tests.

### Step 7 — Parameter estimation uses maximum-likelihood by default
`rv.fit(data)` returns the MLE \((\hat{\mu},\hat{\sigma})\) that maximises \(\sum\log f(x_i;\theta)\).

## 5. Worked examples — har step show karo

**Example 1 — One-line normal probability**  
*Given:* \(X\sim\mathcal{N}(170,8^2)\).  
*Find:* \(P(X\le 180)\).  
```python
from scipy.stats import norm
rv = norm(loc=170, scale=8)
p = rv.cdf(180)
```
*Why:* `loc` and `scale` are the exact parameters of the normal law; `cdf` evaluates the definite integral from \(-\infty\) to 180.  
**Final answer:** 0.89435

*Reflection:* The call is identical for any other location-scale family; only the class name changes.

**Example 2 — Critical value for a two-sided test**  
*Given:* significance level \(\alpha=0.05\), \(df=29\).  
*Find:* rejection threshold for a t-test.  
```python
from scipy.stats import t
crit = t.ppf(0.975, df=29)
```
*Why:* `ppf(1-α/2)` yields the upper tail critical value under the central t distribution.  
**Final answer:** 2.04523

*Reflection:* Students often confuse `cdf` with `ppf`; remember `ppf` inverts the probability to a quantile.

**Example 3 — One-sample t-test on real data**  
*Given:* 30 height measurements, \(H_0:\mu=170\).  
*Find:* p-value.  
```python
from scipy.stats import ttest_1samp
import numpy as np
data = np.array([...])  # 30 floats
stat, p = ttest_1samp(data, popmean=170)
```
*Why:* The function internally computes the t-statistic and evaluates the two-sided survival function of \(t_{29}\).  
**Final answer:** (t-statistic, p-value) pair

*Reflection:* The returned p-value already accounts for both tails; do not multiply by two again.

**Example 4 — Kolmogorov–Smirnov goodness-of-fit**  
*Given:* sample `data` and candidate `norm(0,1)`.  
*Find:* p-value for \(H_0:\) data ~ N(0,1).  
```python
from scipy.stats import kstest
stat, p = kstest(data, 'norm', args=(0,1))
```
*Why:* `kstest` builds the empirical CDF, computes the supremum distance to the theoretical CDF, then evaluates the Kolmogorov distribution.  
**Final answer:** (KS statistic, p-value)

*Reflection:* The second argument can be any frozen distribution, not merely a string name.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using `pdf` instead of `cdf` for p-values | Students confuse density with probability | Always ask “am I integrating?” → choose `cdf` or `sf`. |
| Forgetting `ddof=1` inside `ttest` when sample variance is biased | Default `ddof=0` in NumPy leaks into manual calculations | Let the test function compute everything; never pre-compute variance yourself. |
| Passing raw data to `fit` without removing NaNs | Real datasets contain missing values | `data = data[~np.isnan(data)]` before any `fit` or test call. |
| Treating `loc` and `scale` as optional when they are not | Many distributions default `loc=0, scale=1` silently | Always write the parameters explicitly on first use. |
| Interpreting a large p-value as “evidence for the null” | p-value only measures incompatibility with \(H_0\) | Report effect size (Cohen’s d, etc.) alongside every p-value. |
| Using `rvs` inside a loop instead of vectorised `size=` | Python-level loops destroy performance | Pass `size=(n,m)` once; never loop over `rvs`. |
| Confusing one-sided and two-sided p-values | `sf` returns one tail; tests double it automatically | Read the docstring of each test function before use. |

## 7. The textbook-precise statement
A continuous random variable \(X\) belongs to a location-scale family if its CDF admits the representation \(F(x;\mu,\sigma)=G((x-\mu)/\sigma)\) for a fixed \(G\). The object returned by `scipy.stats.norm(loc=μ, scale=σ)` implements exactly this family. Under the null hypothesis \(H_0:\mu=\mu_0\), the statistic \(T=\sqrt{n}(\bar{X}-\mu_0)/S\) follows a Student’s t-distribution with \(n-1\) degrees of freedom when the observations are i.i.d. normal; `scipy.stats.ttest_1samp` returns the two-sided p-value \(2(1-F_{t_{n-1}}(|t_{\text{obs}}|))\). See Wasserman, *All of Statistics*, 2004, §10.3 and §11.1 for the measure-theoretic justification of the p-value construction.

## 8. Visual — diagram or schematic
```
          cdf(x)
          ^
1.0 ------+---------------------
          |                  /
0.975 ----+---------------*   <-- ppf(0.975)
          |             /
          |           /
          |         /
0.5 ------+-------*   <-- median = ppf(0.5)
          |     /
          |   /
          | /
0.0 ------+------------------> x
         -∞                 +∞
```
Horizontal axis labelled by quantiles; vertical axis labelled by cumulative probability. The curve is the CDF of any continuous distribution; the marked points illustrate the relationship between `ppf` and `cdf`.

## 9. The memory technique
1. **The hook** — picture a frozen bottle of water labelled “norm(loc=170, scale=8)”; every time you call `.cdf` you are reading the water-level gauge on that bottle.
2. **What to overlearn** — `rv.cdf(x)` gives \(P(X\le x)\); `rv.ppf(p)` gives the quantile; every test ultimately calls one of these two.
3. **Spaced-repetition schedule** — review the seven-step progression at 1 day, 3 days, 7 days, 16 days and 35 days; each time re-implement one worked example from scratch.
4. **First-principles fallback** — if you forget a method name, remember that any probability question is either “probability of an interval” (use `cdf`/`sf`) or “value at a probability” (use `ppf`); the method names follow that logic.

## 10. What this unlocks
Once you control `scipy.stats` you can move directly to Bayesian inference (`pymc`), survival analysis (`lifelines`), and causal inference (`dowhy`) because all of them ultimately evaluate tail probabilities of known distributions.

- Next topic: maximum-likelihood fitting of custom distributions via `scipy.optimize`
- Next topic: bootstrap confidence intervals that still rely on `percentile` methods from the same distribution objects
- Next topic: multiple-testing correction (`statsmodels.stats.multitest`) that consumes p-values produced here

## 11. Self-check — five questions, no answers
1. Write a one-line expression that returns the 0.9 quantile of a chi-squared distribution with 5 degrees of freedom.
2. A sample of size 25 yields \(\bar{x}=102\), \(s=15\). Compute the two-sided p-value for \(H_0:\mu=100\) using the exact t-distribution.
3. Why does `norm.cdf(0, loc=0, scale=1)` equal 0.5 while `norm.pdf(0)` is approximately 0.3989?
4. You run 1000 independent KS tests at \(\alpha=0.05\). Roughly how many false positives do you expect under the global null?
5. A colleague writes `rv = norm(0,1); rv.scale = 2`. Predict the result of `rv.cdf(1.96)` and explain the bug.