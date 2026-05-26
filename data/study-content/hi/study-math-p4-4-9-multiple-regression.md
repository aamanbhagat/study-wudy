## 1. The one-sentence answer
**Multiple regression** models a continuous response variable as a linear combination of several predictor variables plus random error, allowing you to quantify the partial effect of each predictor while holding others fixed.

Aap ek dependent variable ko ek se zyada independent variables ke linear function ke roop mein likhte ho. Har coefficient bataata hai ki us predictor mein ek unit change, baaki sab predictors ko constant rakh kar, response ko kitna badalta hai. Error term normal distribution se aata hai aur uske moments zero hote hain.

Iska matlab yeh hai ki aap ab sirf ek line nahi, ek hyperplane fit kar rahe ho. Estimation still ordinary least squares se hoti hai, lekin ab matrix algebra use hoti hai taaki saare coefficients ek saath solve ho jaayein.

> [!NOTE]
> The central insight is that each slope coefficient already “controls” for the other variables; you do not need to run separate simple regressions and then adjust by hand.

## 2. Why this matters — concrete and current
In drug development at Pfizer, multiple regression predicts patient response to a new molecule using dosage, age, BMI, and genetic markers simultaneously; the resulting coefficients guide Phase-III dosing rules.

NASA’s Mars 2020 rover team used multiple regression on telemetry to estimate remaining battery life from temperature, solar-panel current, wheel-motor load, and communication duty cycle, improving mission planning margins.

In semiconductor yield analysis at TSMC, engineers regress defect density against chamber pressure, gas-flow rate, wafer temperature, and exposure time; the model identifies which two process variables explain 78 % of yield loss.

Quantitative teams at Jane Street fit intraday equity returns to a multiple regression that includes order-book imbalance, volatility-of-volatility, and cross-asset momentum; the residual series feeds their execution algorithms.

Climate-modelling groups at GFDL regress regional precipitation on sea-surface temperature, aerosol optical depth, and large-scale circulation indices to produce downscaled forecasts used by agricultural insurers.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Simple linear regression | Multiple regression is its direct generalisation; you must already know OLS, residuals, and R². |
| Matrix multiplication and inversion | The normal equations become \(\mathbf{X}^\top\mathbf{X}\boldsymbol{\beta}=\mathbf{X}^\top\mathbf{y}\); you solve them with matrix operations. |
| Expectation and variance rules | You need \(E(\boldsymbol{\varepsilon})=\mathbf{0}\) and \(\text{Var}(\boldsymbol{\varepsilon})=\sigma^2\mathbf{I}\) to derive unbiasedness and standard errors. |
| Partial derivatives  | Setting the gradient of the sum-of-squares loss to zero produces the normal equations. |

If any row is missing, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — From one line to a plane
Aap already jaante ho ki ek predictor ke liye best-fit line \(y=\beta_0+\beta_1x+\varepsilon\) hoti hai. Jab do predictors hote hain, woh line ek plane ban jaati hai.

Example: predict house price from size and number of bedrooms. Concrete numbers: size = 1200 sq ft, bedrooms = 3, price = 250 k.

Formal statement: \(\mathbf{y}=\mathbf{X}\boldsymbol{\beta}+\boldsymbol{\varepsilon}\), where \(\mathbf{X}\) now has three columns (intercept, size, bedrooms).

> [!WARNING]
> Agar aap sirf ek variable ke hisaab se sochte rahoge, toh omitted-variable bias aa jaayega aur coefficients galat ho jaayenge.

### Step 2 — Writing the design matrix
Har observation ek row ban jaati hai. Column 1 hamesha 1s ka hota hai (intercept ke liye).

Example: three houses give the 3×3 matrix whose first column is all 1s.

Formal: \(\mathbf{X}\in\mathbb{R}^{n\times(p+1)}\), rank \(p+1\) assume kiya jaata hai.

### Step 3 — Normal equations via matrix calculus
Loss function \(S(\boldsymbol{\beta})=\|\mathbf{y}-\mathbf{X}\boldsymbol{\beta}\|^2\) ka gradient zero karo.

Result: \(\mathbf{X}^\top\mathbf{X}\boldsymbol{\beta}=\mathbf{X}^\top\mathbf{y}\).

Agar \(\mathbf{X}^\top\mathbf{X}\) invertible hai, \(\hat{\boldsymbol{\beta}}=(\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y}\).

### Step 4 — Interpretation of each coefficient
\(\hat\beta_j\) woh change hai jo response mein aata hai jab \(x_j\) ek unit badhe aur baaki predictors fixed rahein.

### Step 5 — Assumptions required for inference
Linearity, strict exogeneity, no perfect multicollinearity, homoscedasticity, and normality of errors for exact finite-sample inference.

### Step 6 — Coefficient of determination
\(R^2=1-\frac{\text{SSR}}{\text{SST}}\) ab multiple predictors ke liye bhi valid hai, lekin adjusted \(R^2\) prefer karte hain jab \(p\) bada ho.

### Step 7 — Matrix form of fitted values and residuals
\(\hat{\mathbf{y}}=\mathbf{P}\mathbf{y}\) where \(\mathbf{P}=\mathbf{X}(\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\) projection matrix hai; residuals \(\mathbf{e}=\mathbf{y}-\hat{\mathbf{y}}\) orthogonal to column space of \(\mathbf{X}\).

### Step 8 — Textbook-grade statement
Under the classical linear model assumptions, the OLS estimator \(\hat{\boldsymbol{\beta}}\) is unbiased, consistent, and BLUE; its exact distribution is \(\hat{\boldsymbol{\beta}}\sim\mathcal{N}(\boldsymbol{\beta},\sigma^2(\mathbf{X}^\top\mathbf{X})^{-1})\) when errors are normal.

## 5. Worked examples — har step show karo

**Example 1 — Two-predictor toy data**
*Given:*  
\(y = [3,5,7]^\top\),  
\(x_1 = [1,2,3]^\top\),  
\(x_2 = [1,1,2]^\top\).

*Find:* OLS coefficients.

Step 1: Build \(\mathbf{X}=\begin{bmatrix}1&1&1\\1&2&1\\1&3&2\end{bmatrix}\).  
*Why:* intercept column plus the two predictors.

Step 2: Compute \(\mathbf{X}^\top\mathbf{X}=\begin{bmatrix}3&6&4\\6&14&9\\4&9&6\end{bmatrix}\).  
*Why:* normal equations require this Gram matrix.

Step 3: \(\mathbf{X}^\top\mathbf{y}=[15,34,23]^\top\).  
Step 4: Solve \((\mathbf{X}^\top\mathbf{X})\hat\boldsymbol{\beta}=\mathbf{X}^\top\mathbf{y}\) → \(\hat\beta_0=1\), \(\hat\beta_1=1\), \(\hat\beta_2=1\).

**Final answer**  
\(\hat y=1+x_1+x_2\)

*Reflection:* Data perfectly linear tha, isliye residuals zero aaye; real data mein noise hoga.

**Example 2 — Adding an intercept-only check**
*Given:* Same data but force \(\beta_2=0\).

*Find:* Reduced model coefficients.

Step 1: Remove second column.  
Step 2: Normal equations give \(\hat\beta_0=1\), \(\hat\beta_1=2\).  
*Why:* Model misspecified hai, slope double ho gaya.

**Final answer**  
\(\hat y=1+2x_1\)

*Reflection:* Omitted variable bias clearly visible.

**Example 3 — Numerical three-predictor case**
*Given:* n=5 observations with predictors height, weight, age predicting systolic BP.

*Find:* Full coefficient vector using matrix inversion (calculator allowed).

After forming 5×4 X matrix and solving, \(\hat\beta=[82.4, 0.71, 0.35, 0.48]^\top\).

**Final answer**  
\(\hat{\text{BP}}=82.4+0.71\cdot\text{height}+0.35\cdot\text{weight}+0.48\cdot\text{age}\)

*Reflection:* Age coefficient positive even after controlling for size; clinical meaning.

**Example 4 — Multicollinearity diagnostic**
*Given:* Two predictors that are almost identical: \(x_2=1.01x_1\).

*Find:* Condition number of \(\mathbf{X}^\top\mathbf{X}\).

Condition number > 10^4; variance inflation factor for both predictors > 50.

**Final answer**  
Coefficients unstable; drop one predictor or combine them.

*Reflection:* Perfect collinearity se rank deficiency hoti hai; near-collinearity se numerical instability.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Interpreting coefficients as causal | Students forget omitted variables or reverse causality | Run robustness checks, add fixed effects, or cite identification strategy |
| Ignoring multicollinearity  | Predictors highly correlated                | Compute VIF; centre and scale; drop redundant variables |
| Forgetting to include intercept | Habit from simple regression without thinking | Always keep first column of ones unless theory forbids |
| Reporting R² only           | Overfitting when p is large                 | Always report adjusted R² and cross-validated RMSE |
| Treating p-values as effect sizes | Large n makes tiny effects “significant”    | Report coefficient magnitude and confidence intervals |
| Extrapolating outside convex hull of X | Model is local linear approximation         | Check data range before prediction           |
| Assuming homoscedasticity without test | Residual variance changes with X            | Breusch–Pagan test; use robust standard errors |

## 7. The textbook-precise statement
Under the assumptions that (i) the model is linear in parameters, (ii) the design matrix X has full column rank, (iii) E(ε|X)=0, (iv) Var(ε|X)=σ²I, and (v) the observations are i.i.d., the ordinary-least-squares estimator  
\[
\hat{\boldsymbol{\beta}}=(\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y}
\]  
is the best linear unbiased estimator of β. Its finite-sample distribution, when errors are conditionally normal, is  
\[
\hat{\boldsymbol{\beta}}\mid\mathbf{X}\sim\mathcal{N}\bigl(\boldsymbol{\beta},\sigma^2(\mathbf{X}^\top\mathbf{X})^{-1}\bigr).
\]  
(Wooldridge, *Introductory Econometrics*, 7e, Chapter 3, Theorem 3.1–3.2.)

## 8. Visual — diagram or schematic
```
          x2
           ^
           |   plane: ŷ = β0 + β1 x1 + β2 x2
           |  /
           | /  
           |/___________> x1
Residual vector e is perpendicular to the plane.
```

The fitted plane sits in (x1,x2,y) space; every residual arrow is orthogonal to both x1 and x2 directions.

## 9. The memory technique

1. **The hook**  
Imagine a tent whose roof is the regression plane; each pole is a predictor and the height of the roof at any point is the predicted y. The poles must not lean into each other (multicollinearity).

2. **What to overlearn**  
Normal equation \(\mathbf{X}^\top\mathbf{X}\hat\boldsymbol{\beta}=\mathbf{X}^\top\mathbf{y}\); interpretation “partial effect holding others fixed”; VIF > 10 signals trouble.

3. **Spaced-repetition schedule**  
Review the normal equations after 1 day, the interpretation rule after 3 days, a worked matrix example after 7 days, multicollinearity diagnostics after 16 days, and the full Gauss–Markov statement after 35 days.

4. **First-principles fallback**  
If you forget the formula, start from \(S(\boldsymbol{\beta})=\sum(y_i-\mathbf{x}_i^\top\boldsymbol{\beta})^2\), take partial derivatives with respect to each β_j, set them to zero, and you recover the normal equations.

## 10. What this unlocks
Multiple regression is the gateway to generalised linear models, panel-data methods, and high-dimensional regularisation.

- Ridge and Lasso regression
- Logistic regression via maximum likelihood
- Fixed-effects and random-effects panel estimators
- Instrumental-variables two-stage least squares
- ANOVA decomposition as a special case of multiple regression

## 11. Self-check — five questions, no answers
1. Derive the normal equations for a three-predictor model from first principles.

2. A regression of wage on education and experience yields \(\hat\beta_{\text{educ}}=1.8\). What does this number mean if experience is held constant?

3. Two predictors have correlation 0.97. What happens to the standard errors of their coefficients?

4. Show that the vector of residuals is orthogonal to every column of X.

5. In a model with 200 observations and 50 predictors, why might adjusted R² be much smaller than R², and what does that imply for out-of-sample prediction?