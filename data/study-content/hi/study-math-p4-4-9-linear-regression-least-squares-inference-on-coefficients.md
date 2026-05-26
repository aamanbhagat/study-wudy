## 1. The one-sentence answer
**Linear regression via least squares finds the best-fit hyperplane by minimising the sum of squared residuals, after which we treat the coefficient estimates as random variables and perform inference using their exact or asymptotic sampling distributions.**

The model assumes a linear relationship plus random noise: observations are generated as \(y_i = \mathbf{x}_i^\top\boldsymbol{\beta} + \varepsilon_i\) where the \(\varepsilon_i\) are i.i.d. with mean zero. Least squares produces the explicit estimator \(\hat{\boldsymbol{\beta}} = (X^\top X)^{-1}X^\top\mathbf{y}\). Because \(\hat{\boldsymbol{\beta}}\) is a linear function of the random vector \(\mathbf{y}\), its distribution is known once the distribution of the noise is specified; under normality we obtain exact \(t\)- and \(F\)-tests for individual coefficients and linear combinations.

This separation—point estimation by geometry followed by inference by sampling theory—is what lets us move from “the line looks good” to “the slope is statistically different from zero at level \(\alpha\)”.

> [!NOTE]
> The single deepest insight is that the geometry of projection (orthogonal residuals) and the statistics of linear transformations are the same object: the hat matrix \(H = X(X^\top X)^{-1}X^\top\) simultaneously gives the fitted values and the covariance structure \(\operatorname{Var}(\hat{\boldsymbol{\beta}}) = \sigma^2(X^\top X)^{-1}\).

## 2. Why this matters — concrete and current
SpaceX uses ordinary least squares inside its trajectory reconstruction pipeline to convert noisy GPS and radar telemetry into smooth position-velocity estimates; the covariance matrix of the fitted coefficients directly feeds the Kalman filter that decides whether a booster landing burn must be aborted.

In semiconductor manufacturing, TSMC fits linear models relating critical-dimension measurements to dozens of process knobs (etch time, focus offset, dose). Inference on the coefficients tells process engineers which knobs are statistically active, allowing them to drop insignificant factors before running expensive DOE iterations.

Modern portfolio theory at Bridgewater Associates begins with a factor model whose betas are exactly the least-squares coefficients of asset returns on Fama–French factors; standard errors on those betas determine position sizing limits that keep the fund’s realised tracking error inside its risk budget.

High-energy physicists at CERN fit linear calibration curves to silicon-tracker alignment data taken between LHC fills. The \(t\)-statistics on the slope coefficients decide whether the detector geometry has drifted enough to require a full realignment before the next stable-beams period.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Matrix multiplication and inverses | The normal equations are \(X^\top X\hat{\boldsymbol{\beta}}=X^\top\mathbf{y}\); solving them requires \((X^\top X)^{-1}\). |
| Expectation and variance of linear forms | \(\hat{\boldsymbol{\beta}}\) is linear in \(\mathbf{y}\), so its mean and covariance follow immediately from those of \(\boldsymbol{\varepsilon}\). |
| Normal distribution and \(t\)-distribution | Under Gaussian noise the exact finite-sample distribution of \(\hat{\beta}_j/\widehat{\operatorname{se}}(\hat{\beta}_j)\) is Student’s \(t\). |
| Projection and orthogonality | Least-squares residuals are orthogonal to the column space of \(X\); this geometric fact yields \(\mathbb{E}[\hat{\boldsymbol{\beta}}]=\boldsymbol{\beta}\). |

If any row is unfamiliar, pause and review the corresponding linear-algebra or introductory probability section before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — The data-generating assumption
Aap imagine karte hain ki har observation ek straight-line relationship ke around thodi si random error ke saath bani hai. Concrete example: ten students’ study hours \(x_i\) aur test scores \(y_i\) record kiye; aap maan lete hain \(y_i = \beta_0 + \beta_1 x_i + \varepsilon_i\) with \(\varepsilon_i\) i.i.d. mean-zero. Formally the model is
\[
\mathbf{y}=X\boldsymbol{\beta}+\boldsymbol{\varepsilon},\qquad\mathbb{E}(\boldsymbol{\varepsilon})=\mathbf{0},\quad\operatorname{Var}(\boldsymbol{\varepsilon})=\sigma^2I.
\]
> [!WARNING]
> Agar aap yeh linearity ya i.i.d. assumption galat maan lete hain to baad ke saare standard errors aur p-values meaningless ho jaate hain.

### Step 2 — The least-squares objective
Aap squared vertical distances ka sum minimise karte hain kyunki badi errors ko disproportionately penalise karna chahte hain. The objective function is
\[
S(\boldsymbol{\beta})=\|\mathbf{y}-X\boldsymbol{\beta}\|^2.
\]
Differentiating with respect to \(\boldsymbol{\beta}\) and setting the gradient to zero produces the normal equations
\[
X^\top X\hat{\boldsymbol{\beta}}=X^\top\mathbf{y}.
\]

### Step 3 — Solving for the estimator
Jab \(X\) full column rank hai, \(X^\top X\) invertible hoti hai aur
\[
\hat{\boldsymbol{\beta}}=(X^\top X)^{-1}X^\top\mathbf{y}
\]
milta hai. Yeh formula simultaneously sab coefficients deta hai.

### Step 4 — Geometry of residuals
The residual vector \(\mathbf{e}=\mathbf{y}-X\hat{\boldsymbol{\beta}}\) column space of \(X\) ke orthogonal hota hai, i.e., \(X^\top\mathbf{e}=\mathbf{0}\). Isi orthogonality se unbiasedness \(\mathbb{E}(\hat{\boldsymbol{\beta}})=\boldsymbol{\beta}\) nikalti hai.

### Step 5 — Sampling distribution under normality
Agar \(\boldsymbol{\varepsilon}\sim N(\mathbf{0},\sigma^2I)\) to \(\hat{\boldsymbol{\beta}}\) bhi multivariate normal hai:
\[
\hat{\boldsymbol{\beta}}\sim N\left(\boldsymbol{\beta},\sigma^2(X^\top X)^{-1}\right).
\]
\(\sigma^2\) unknown hone par unbiased estimator \(s^2=\|\mathbf{e}\|^2/(n-p)\) use karte hain aur har coefficient ke liye
\[
\frac{\hat{\beta}_j-\beta_j}{s\sqrt{c_{jj}}}\sim t_{n-p}
\]
milta hai, jahaan \(c_{jj}\) \((X^\top X)^{-1}\) ka \(j\)-th diagonal element hai.

### Step 6 — Hypothesis testing and intervals
Null \(H_0:\beta_j=0\) reject karne ke liye observed \(t\) statistic ko \(t_{n-p}\) critical value se compare karte hain ya equivalent \(p\)-value nikaalte hain. 95 % confidence interval \(\hat{\beta}_j\pm t_{n-p,0.975}s\sqrt{c_{jj}}\) hota hai.

## 5. Worked examples

**Example 1 — Single-point slope**
*Given:* Two points \((0,1)\), \((1,3)\).  
*Find:* \(\hat{\beta}_1\).  
Step 1: \(X=\begin{bmatrix}1&0\\1&1\end{bmatrix}\).  
Step 2: \(X^\top X=\begin{bmatrix}2&1\\1&1\end{bmatrix}\), inverse \(\begin{bmatrix}1&-1\\-1&2\end{bmatrix}\).  
Step 3: \(\hat{\boldsymbol{\beta}}=(X^\top X)^{-1}X^\top\mathbf{y}\) gives \(\hat{\beta}_1=2\).  
*Why* each matrix step: multiplication counts how many times each \(\beta\) appears; inversion solves the two-equation system.  
**Final answer** \(\hat{\beta}_1=2\)  
*Reflection:* Even with \(n=2\) the formula works; the geometry is a perfect line through both points.

**Example 2 — Simple linear regression with three points**
*Given:* \((1,2)\), \((2,3)\), \((3,5)\).  
*Find:* \(\hat{\beta}_0,\hat{\beta}_1\) and \(s^2\).  
Algebra yields \(\hat{\beta}_0=0.333\), \(\hat{\beta}_1=1.5\), \(s^2=0.0833\).  
*Why* we divide by \(n-2=1\): one degree of freedom lost for each estimated parameter.  
**Final answer** \(\hat{\beta}_1=1.5\) (significant at 5 %).  
*Reflection:* Residual sum of squares is tiny, hinting the linear model fits well.

**Example 3 — Inference on slope**
*Given:* The fit above plus \(\operatorname{se}(\hat{\beta}_1)=0.289\).  
*Find:* 95 % CI for \(\beta_1\).  
\(t_{1,0.975}=12.706\), interval \([1.5\pm12.706\times0.289]\) = \([-2.17,5.17]\).  
*Why* wide interval: only one degree of freedom.  
**Final answer** \([-2.17,5.17]\)  
*Reflection:* Small \(n\) produces wide intervals even when point estimate looks reasonable.

**Example 4 — Multiple regression coefficient test**
*Given:* Two predictors, \(n=30\), \(X^\top X\) known, \(\hat{\beta}_2=0.47\), \(\operatorname{se}=0.19\).  
*Find:* \(t\)-test for \(H_0:\beta_2=0\).  
\(t=0.47/0.19=2.47\), \(p\)-value \(\approx0.02\) (two-sided, \(t_{27}\)).  
**Final answer** Reject at \(\alpha=0.05\).  
*Reflection:* Standard error already incorporates the correlation between the two columns of \(X\).

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to check rank of \(X\) | Students treat \((X^\top X)^{-1}\) as always existing | Compute \(\operatorname{rank}(X)\) or condition number before inverting |
| Using \(n\) instead of \(n-p\) for \(s^2\) | Confusing ML estimator with unbiased estimator | Always divide by residual degrees of freedom \(n-p\) |
| Interpreting \(p\)-value as P(\(\beta_j=0\mid data\)) | Classic Bayesian–frequentist mix-up | Remember \(p\)-value is P(data or more extreme \(\mid\beta_j=0\)) |
| Ignoring multicollinearity | High correlation between columns makes \(X^\top X\) nearly singular | Check VIF or condition number; centre and scale predictors |
| Reporting \(\hat{\beta}\) without its standard error | Over-confidence in point estimate | Always accompany every coefficient with \(\operatorname{se}(\hat{\beta}_j)\) or CI |
| Extrapolating far outside the observed \(x\)-range | Linear model may be local only | State the convex hull of the training \(x\)’s as the validity region |

## 7. The textbook-precise statement
Let \(X\in\mathbb{R}^{n\times p}\) have full column rank \(p\). The linear model is \(\mathbf{y}=X\boldsymbol{\beta}+\boldsymbol{\varepsilon}\) with \(\boldsymbol{\varepsilon}\sim N(\mathbf{0},\sigma^2I_n)\). The least-squares estimator is
\[
\hat{\boldsymbol{\beta}}=(X^\top X)^{-1}X^\top\mathbf{y}.
\]
Then \(\hat{\boldsymbol{\beta}}\sim N(\boldsymbol{\beta},\sigma^2(X^\top X)^{-1})\) and, independently,
\[
\frac{(n-p)s^2}{\sigma^2}\sim\chi^2_{n-p},\qquad s^2=\frac{\|\mathbf{y}-X\hat{\boldsymbol{\beta}}\|^2}{n-p}.
\]
Consequently, for each \(j\),
\[
\frac{\hat{\beta}_j-\beta_j}{s\sqrt{c_{jj}}}\sim t_{n-p}.
\]
(Seber & Lee, *Linear Regression Analysis*, 2nd ed., §3.2–3.3.)

## 8. Visual
```text
y
↑
|          •   (observed points)
|       •      •
|    •            •
|  •________________  fitted line  (Xβ̂)
| /   |   |   |   \
|/__|___|___|___|___\→ x
   residuals (vertical arrows)
```
The vertical arrows are the residuals; their lengths squared and summed are minimised. The projection of y onto the column space lands on the line.

## 9. The memory technique
1. **The hook** — Picture the residuals as springs pulling the line; least squares finds the equilibrium where net “force” (gradient) is zero.  
2. **What to overlearn** — \(\hat{\boldsymbol{\beta}}=(X^\top X)^{-1}X^\top\mathbf{y}\) and \(\operatorname{Var}(\hat{\boldsymbol{\beta}})=\sigma^2(X^\top X)^{-1}\).  
3. **Spaced-repetition schedule** — Review the normal equations after 1 day, the \(t\)-statistic formula after 3 days, a full worked inference example after 7 days, then again at 16 and 35 days.  
4. **First-principles fallback** — If the formula is forgotten, start from \(S(\boldsymbol{\beta})=\|\mathbf{y}-X\boldsymbol{\beta}\|^2\), differentiate, set gradient to zero, solve the resulting linear system.

## 10. What this unlocks
Once you control inference on coefficients you can test entire sub-models with the extra-sum-of-squares \(F\)-test, build polynomial and interaction terms safely, and move to generalised linear models where the same projection geometry appears inside iteratively reweighted least squares.

- Multiple linear regression diagnostics (leverage, Cook’s distance)  
- ANOVA decomposition as a special case of linear models  
- Ridge and lasso as penalised extensions of the same normal equations  
- Causal inference under ignorability when treatment indicators are columns of \(X\)

## 11. Self-check — five questions, no answers
1. Derive the normal equations from the least-squares objective for a simple intercept-only model and show that \(\hat{\beta}_0=\bar{y}\).  
2. For the design matrix whose first column is all ones and second column is \(\{1,2,3\}\), compute \((X^\top X)^{-1}\) explicitly.  
3. A fitted slope equals 1.8 with standard error 0.6 and 20 residual degrees of freedom. Give the two-sided \(p\)-value for \(H_0:\beta_1=0\) without a calculator.  
4. Explain why the residuals are orthogonal to every column of \(X\) and why that orthogonality is lost if you add an extra unnecessary predictor that is a linear combination of existing ones.  
5. Suppose two predictors are perfectly collinear. What happens to the standard errors of their individual coefficients, and what single diagnostic number would have warned you beforehand?