## 1. The one-sentence answer
**Chi-squared, Student’s t, and F distributions are the exact sampling distributions of three quadratic forms built from independent standard normal random variables, each completely determined by one or two integer parameters called degrees of freedom.**

A single standard normal random variable \(Z\) has mean zero and variance one. Square it and you obtain a random variable whose distribution is called chi-squared with one degree of freedom. Square several independent copies and add the squares; the sum follows a chi-squared law whose single parameter equals the number of copies.  

Divide a fresh standard normal by the square root of an independent chi-squared divided by its degrees of freedom and the resulting ratio follows Student’s t distribution; the only parameter that survives is again the number of squares inside the chi-squared. Finally, take the ratio of two independent scaled chi-squared variables; the distribution that appears is the F distribution, now carrying two degree-of-freedom parameters. In every case the integer counts how many independent pieces of information were “used up” to form the quadratic expression.

> [!NOTE]
> Degrees of freedom are not decorative labels; they are the exact count of independent squared normals that remain after any linear constraints have been imposed, and they alone fix the entire shape, mean, variance, and tail behaviour of each distribution.

## 2. Why this matters — concrete and current
In the Higgs-boson discovery analyses at CERN, physicists minimise a chi-squared function over thousands of nuisance parameters; the resulting test statistic is compared with a chi-squared distribution whose degrees of freedom equal the number of free parameters after all detector-calibration constraints are applied.  

Modern genome-wide association studies at Illumina and 23andMe test millions of SNPs with linear regression; the squared t-statistic on each coefficient is referred to an F distribution whose numerator degrees of freedom is one and whose denominator degrees of freedom equals sample size minus the number of covariates.  

NASA’s Mars Climate Sounder retrieves atmospheric temperature profiles by inverting radiance measurements; the retrieval covariance matrix is obtained from the inverse of an F-distributed quadratic form whose two degrees of freedom are the number of spectral channels and the number of independent altitude layers.  

In large-scale A/B testing at Google and Meta, experimenters compare conversion-rate variances across thousands of variants using an F test whose denominator degrees of freedom equal the pooled residual degrees of freedom after stratification; the test controls false-discovery rate only when those degrees of freedom are computed exactly.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Standard normal pdf      | All three distributions are built directly from i.i.d. \(N(0,1)\) variables. |
| Independence             | Joint density factors only when the normals are independent; dependence destroys the chi-squared, t, and F forms. |
| Linear constraint        | Each linear restriction (e.g., sum-to-zero) reduces the count of free squared normals by exactly one. |
| Change-of-variable formula | Required to obtain the explicit densities from the joint normal density. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Squaring a single normal produces chi-squared with one degree of freedom
A standard normal can be positive or negative with equal probability; after squaring, only non-negative values remain and large deviations become more probable than under the normal.  
Take \(Z\sim N(0,1)\). Then \(X=Z^2\) satisfies  
\[
f_X(x)=\frac{1}{\sqrt{2\pi x}}e^{-x/2},\qquad x>0.
\]
> [!WARNING]
> Forgetting that the map \(z\to z^2\) folds the negative axis onto the positive axis doubles the density and yields an incorrect factor of 2.

### Step 2 — Adding independent chi-squared variables adds their degrees of freedom
Because independent normals remain independent after squaring, their squares add.  
If \(X_1\sim\chi^2_{k}\) and \(X_2\sim\chi^2_{m}\) are independent, then \(X_1+X_2\sim\chi^2_{k+m}\). The parameter simply counts the total number of squared normals.

### Step 3 — Normalising by estimated variance produces the t distribution
Replace the unknown \(\sigma\) in \(Z/\sigma\) by its estimate \(\sqrt{V/\nu}\) where \(V\sim\chi^2_\nu\). The ratio  
\[
T=\frac{Z}{\sqrt{V/\nu}}
\]
has density  
\[
f(t)=\frac{\Gamma((\nu+1)/2)}{\sqrt{\nu\pi}\Gamma(\nu/2)}\Bigl(1+\frac{t^2}{\nu}\Bigr)^{-(\nu+1)/2}.
\]
The single remaining integer \(\nu\) is the degrees of freedom of the t.

### Step 4 — Ratio of two independent scaled chi-squared variables produces the F
Let \(U\sim\chi^2_m\) and \(V\sim\chi^2_n\) be independent. Then  
\[
F=\frac{U/m}{V/n}
\]
follows the F distribution with parameters \(m\) and \(n\). Both integers survive because neither chi-squared has been forced to share information with the other.

### Step 5 — Linear constraints reduce degrees of freedom by the rank of the constraint matrix
If \(Z\sim N(0,I_k)\) and \(A\) is an \(r\times k\) matrix of rank \(r\), then \(\|AZ\|^2\sim\chi^2_r\). The integer \(r\) equals the number of independent linear restrictions imposed.

### Step 6 — Textbook statement
A random variable \(X\) follows a chi-squared distribution with \(\nu\) degrees of freedom if  
\[
X\stackrel{d}{=}\sum_{i=1}^\nu Z_i^2,\qquad Z_i\text{ i.i.d. }N(0,1).
\]
Student’s t with \(\nu\) degrees of freedom is \(T=Z/\sqrt{V/\nu}\) where \(V\sim\chi^2_\nu\) independent of \(Z\). The F distribution with \((m,n)\) degrees of freedom is the law of \((U/m)/(V/n)\) for independent chi-squared variables \(U\sim\chi^2_m\), \(V\sim\chi^2_n\).

## 5. Worked examples — every step shown

**Example 1 — Single square**  
*Given:* \(Z\sim N(0,1)\).  
*Find:* density of \(X=Z^2\).  
Step 1: cdf \(F_X(x)=P(Z^2\le x)=P(-\sqrt{x}\le Z\le\sqrt{x})\).  
*Why:* definition of cdf and symmetry of normal.  
Step 2: differentiate to obtain pdf \(f_X(x)=\frac{2}{\sqrt{2\pi}}e^{-x/2}\cdot\frac{1}{2\sqrt{x}}\).  
*Why:* chain rule on each boundary.  
**\(\boldsymbol{f_X(x)=\frac{1}{\sqrt{2\pi x}}e^{-x/2},\ x>0}\)**  
*Reflection:* the factor \(1/\sqrt{x}\) arises purely from the Jacobian of the square-root map.

**Example 2 — Sum of two squares**  
*Given:* independent \(Z_1,Z_2\sim N(0,1)\).  
*Find:* distribution of \(X=Z_1^2+Z_2^2\).  
Step 1: joint density factors.  
*Why:* independence.  
Step 2: switch to polar coordinates; radius squared follows exponential rate 1/2.  
*Why:* area element \(r\,dr\,d\theta\).  
**\(X\sim\chi^2_2\)**  
*Reflection:* the same argument extends immediately to any number of dimensions.

**Example 3 — One-sample t statistic**  
*Given:* i.i.d. sample \(X_1,\dots,X_n\sim N(\mu,\sigma^2)\).  
*Find:* distribution of \(\sqrt{n}(\bar X-\mu)/S\).  
Step 1: \(\sqrt{n}(\bar X-\mu)/\sigma\sim N(0,1)\).  
*Why:* standardisation.  
Step 2: \((n-1)S^2/\sigma^2\sim\chi^2_{n-1}\).  
*Why:* sum of squared residuals after one linear constraint \(\sum e_i=0\).  
Step 3: ratio yields t with \(n-1\) degrees of freedom.  
**\(T\sim t_{n-1}\)**  
*Reflection:* the loss of one degree of freedom is exactly the rank of the constraint that forces the residuals to sum to zero.

**Example 4 — F test for two variances**  
*Given:* independent samples sizes \(n,m\) from two normals.  
*Find:* distribution of \((S_1^2/S_2^2)\).  
Step 1: each sample variance scaled by \(\sigma_i^2\) is chi-squared over its degrees of freedom.  
*Why:* previous example.  
Step 2: ratio of the two scaled chi-squared variables is F.  
**\((S_1^2/\sigma_1^2)/(S_2^2/\sigma_2^2)\sim F_{n-1,m-1}\)**  
*Reflection:* the two degree-of-freedom parameters remain separate because the samples are independent.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating “degrees of freedom = sample size” | Confusing number of observations with number of free squared normals after constraints | Count the rank of the residual projection matrix |
| Using \(\chi^2\) tables for t or F | Forgetting that t and F are ratios, not sums of squares | Always verify whether the statistic is a single quadratic form or a ratio |
| Dropping the scaling constants \(m\) and \(n\) in the F definition | Notation abuse in software output | Write the statistic explicitly as \((U/m)/(V/n)\) before looking up tables |
| Assuming independence when variables share data | Subtle linear dependence induced by estimating a common mean | Check that the two chi-squared variables are formed from disjoint sets of residuals |
| Reporting “\(\nu=\infty\)” for large samples without justification | Asymptotic approximation hides finite-sample skewness | Keep exact \(\nu\) until \(n>100\) and skewness has been checked |
| Confusing numerator and denominator df in F | Asymmetric roles of the two chi-squared variables | Always place the hypothesis of interest in the numerator |
| Forgetting that \(\chi^2_0\) is degenerate at zero | Edge case when no free parameters remain | Verify that at least one squared normal survives every constraint |

## 7. The textbook-precise statement
Let \(Z_1,\dots,Z_k\) be i.i.d. \(N(0,1)\). Define  
\[
\chi^2_k=\sum_{i=1}^k Z_i^2.
\]
If \(A\) is any \(k\times r\) matrix with orthonormal columns, then \(\|A^\top Z\|^2\sim\chi^2_r\). Student’s t random variable with \(\nu\) degrees of freedom is  
\[
T=\frac{Z}{\sqrt{V/\nu}},\qquad Z\sim N(0,1),\ V\sim\chi^2_\nu\text{ independent}.
\]
The F random variable with \((m,n)\) degrees of freedom is  
\[
F=\frac{U/m}{V/n},\qquad U\sim\chi^2_m,\ V\sim\chi^2_n\text{ independent}.
\]
(Casella & Berger, *Statistical Inference*, 2nd ed., §3.3 and §5.3.)

## 8. Visual — diagram or schematic
```text
Normal(0,1) ──square──► χ²(1)
     │
     └──► χ²(ν) = sum of ν independent squares
               │
               ├──► T = Z / sqrt(χ²(ν)/ν)   (t with ν df)
               │
               └──► F = (χ²(m)/m) / (χ²(n)/n)   (F with (m,n) df)
```
Each arrow preserves independence; each integer counts the number of squared normals that have not been annihilated by linear constraints.

## 9. The memory technique
1. **The hook** — picture a choir of independent standard normals; each singer who is “silenced” by a linear constraint (a conductor’s hand) reduces the choir size by one—the remaining singers squared give the degrees of freedom.  
2. **What to overlearn** — \(\chi^2_\nu=\sum_{i=1}^\nu Z_i^2\), \(T=Z/\sqrt{V/\nu}\), \(F=(U/m)/(V/n)\); the three defining representations.  
3. **Spaced-repetition schedule** — review the three representations at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — start from the joint density of i.i.d. normals, impose the linear constraints by orthogonal projection, then apply the change-of-variable formula to the resulting quadratic form.

## 10. What this unlocks
These three distributions are the exact null distributions of the most common test statistics in linear models, ANOVA, and likelihood-ratio tests.  

- One-way ANOVA F-tests  
- Multiple linear regression t- and F-tests  
- Likelihood-ratio tests for nested normal models  
- Hotelling’s \(T^2\) (multivariate t)  
- Wilks’ lambda in MANOVA  

## 11. Self-check — five questions, no answers
1. If five independent standard normals are squared and summed, what is the resulting distribution and its single parameter?  
2. A linear model with 30 observations and 4 regressors (including intercept) produces residuals whose sum of squares follows which distribution? State the degrees of freedom.  
3. Show that the square of a t random variable with \(\nu\) degrees of freedom follows an F distribution; identify both parameters.  
4. Two independent samples of sizes 12 and 15 yield sample variances \(s_1^2\) and \(s_2^2\). Under normality and equal variances, what is the exact distribution of \((s_1^2/s_2^2)\)?  
5. In a chi-squared goodness-of-fit test with 8 cells and 3 parameters estimated from the data, why must the degrees of freedom be 4 rather than 7?