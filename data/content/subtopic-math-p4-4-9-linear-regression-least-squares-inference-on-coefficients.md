## What it is
Linear regression is a statistical method for modeling the relationship between a dependent variable and one or more independent (or explanatory) variables by fitting a linear equation to observed data. The "method of least squares" is the standard approach to find the best-fitting line by minimizing the sum of the squared vertical distances (the "residuals") between the observed data points and the line. Inference on coefficients involves using statistical tests to determine whether these relationships are statistically significant or likely due to random chance.

## Why it matters
This is a foundational tool in nearly every quantitative field. In machine learning, it's the simplest and most interpretable predictive model. In physics, you'll use it constantly to fit experimental data to a theoretical linear model (e.g., verifying Ohm's Law, $V=IR$, by regressing voltage on current). In aerospace, it can be used to model relationships like rocket engine thrust versus propellant flow rate or to predict satellite battery degradation over time based on operational parameters.

## When to study it
You must have a solid grasp of the following prerequisites. If you are weak in any of these, review them first.
*   **Multivariable Calculus**: Specifically, finding the minimum of a function of multiple variables by taking partial derivatives and setting the gradient to zero.
*   **Linear Algebra**: Matrix and vector operations (transpose, multiplication, inverse), vector spaces (especially column space), and the concept of orthogonality and projections. The entire derivation is cleanest in matrix form.
*   **Probability & Statistics**: Random variables, expected value, variance, covariance, the Normal distribution, and the basics of hypothesis testing (null hypothesis, p-values, t-distribution).

## How to study it (step by step)
1.  **Derive the Simple Case:** For a model $\hat{y}_i = \beta_0 + \beta_1 x_i$, define the sum of squared errors $S(\beta_0, \beta_1) = \sum_{i=1}^n (y_i - (\beta_0 + \beta_1 x_i))^2$. Use calculus: take the partial derivatives $\frac{\partial S}{\partial \beta_0}$ and $\frac{\partial S}{\partial \beta_1}$, set both to zero, and solve the resulting system of two linear equations (the "normal equations") for $\beta_0$ and $\beta_1$.
2.  **Generalize with Linear Algebra:** Rewrite the model as $\mathbf{y} = X\beta + \epsilon$. Define the sum of squared residuals as the squared norm of the residual vector: $S(\beta) = \|\mathbf{y} - X\beta\|^2 = (\mathbf{y} - X\beta)^T(\mathbf{y} - X\beta)$. Expand this and take the gradient with respect to the vector $\beta$. Set $\nabla_\beta S = \mathbf{0}$ and solve for $\beta$ to derive the master equation: $\hat{\beta} = (X^T X)^{-1} X^T \mathbf{y}$.
3.  **Understand the Assumptions:** The least squares *calculation* requires no assumptions. However, for the *inference* (confidence intervals, hypothesis tests) to be valid, we need the Gauss-Markov assumptions. List and understand what each one means: Linearity, Independence of errors, Homoscedasticity (constant variance of errors), and Normality of errors.
4.  **Connect to Geometry:** Realize that $X\hat{\beta}$ is the orthogonal projection of the data vector $\mathbf{y}$ onto the column space of the design matrix $X$. The residual vector $\mathbf{e} = \mathbf{y} - X\hat{\beta}$ is therefore orthogonal to the column space of $X$. This is the geometric meaning of the normal equations.
5.  **Study Inference:** Understand that since $\mathbf{y}$ is a random vector, $\hat{\beta} = (X^T X)^{-1} X^T \mathbf{y}$ is also a random vector. Derive its sampling distribution. Under the assumptions, $\hat{\beta} \sim \mathcal{N}(\beta, \sigma^2(X^T X)^{-1})$. This result is the foundation for all inference.
6.  **Perform a t-test:** Learn the formula for the t-statistic for a single coefficient $\hat{\beta}_j$: $t = (\hat{\beta}_j - \beta_{j,0}) / \text{SE}(\hat{\beta}_j)$, where $\beta_{j,0}$ is the value under the null hypothesis (usually 0). Understand that the standard error $\text{SE}(\hat{\beta}_j)$ is the square root of the j-th diagonal element of the variance-covariance matrix $\hat{\sigma}^2(X^T X)^{-1}$.

## Key ideas, with intuition
1.  **The Model is a Statement About Reality:** The core idea is that the true, underlying relationship is linear, but our observations are corrupted by random noise.
    $$ \mathbf{y} = X\beta + \epsilon $$
    Here, $\mathbf{y}$ is the $n \times 1$ vector of observations. $X$ is the $n \times (p+1)$ "design matrix" of predictors (with a leading column of ones for the intercept). $\beta$ is the $(p+1) \times 1$ vector of true, unknown coefficients we want to estimate. $\epsilon$ is an $n \times 1$ vector of unobserved random errors, typically assumed $\epsilon_i \sim \mathcal{N}(0, \sigma^2)$.

2.  **Least Squares is a Projection:** We can't solve for the true $\beta$ because of the noise $\epsilon$. Instead, we find the "best" estimate $\hat{\beta}$ that makes our predicted values, $\hat{\mathbf{y}} = X\hat{\beta}$, as close as possible to the observed values $\mathbf{y}$. "As close as possible" is defined as minimizing the squared Euclidean distance $\|\mathbf{y} - \hat{\mathbf{y}}\|^2$. The solution to this minimization problem is to make $\hat{\mathbf{y}}$ the orthogonal projection of $\mathbf{y}$ onto the subspace spanned by the columns of $X$.

3.  **The Normal Equations are the Result of Orthogonality:** For the residual vector $\mathbf{e} = \mathbf{y} - X\hat{\beta}$ to be orthogonal to the column space of $X$, it must be orthogonal to every column of $X$. This can be stated compactly as:
    $$ X^T \mathbf{e} = \mathbf{0} $$
    Substituting $\mathbf{e}$:
    $$ X^T (\mathbf{y} - X\hat{\beta}) = \mathbf{0} \implies X^T\mathbf{y} - X^TX\hat{\beta} = \mathbf{0} $$
    Solving for $\hat{\beta}$ gives the famous result, assuming $X^TX$ is invertible:
    $$ \hat{\beta} = (X^T X)^{-1} X^T \mathbf{y} $$

4.  **Coefficients are Random Variables:** Because our data $\mathbf{y}$ is a random sample, our calculated coefficients $\hat{\beta}$ are also random variables. If we took a different sample of data, we would get a different $\hat{\beta}$. The entire purpose of inference is to quantify the uncertainty in $\hat{\beta}$ by describing its sampling distribution, allowing us to ask questions like "How likely is it that we observed a coefficient this large if the true coefficient were actually zero?"

## Worked example
Let's model the relationship between a predictor $x$ and a response $y$ with the model $y = \beta_0 + \beta_1 x + \epsilon$. We have three data points: $(x_1, y_1) = (1, 2)$, $(x_2, y_2) = (2, 3)$, and $(x_3, y_3) = (3, 5)$.

**Step 1: Construct the design matrix $X$ and response vector $\mathbf{y}$.**
The first column of $X$ is all ones for the intercept $\beta_0$. The second column contains the $x$ values.
$$
X = \begin{pmatrix} 1 & 1 \\ 1 & 2 \\ 1 & 3 \end{pmatrix}, \quad \mathbf{y} = \begin{pmatrix} 2 \\ 3 \\ 5 \end{pmatrix}
$$

**Step 2: Calculate $X^T X$ and its inverse.**
$$
X^T X = \begin{pmatrix} 1 & 1 & 1 \\ 1 & 2 & 3 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 1 & 2 \\ 1 & 3 \end{pmatrix} = \begin{pmatrix} 3 & 6 \\ 6 & 14 \end{pmatrix}
$$
The inverse of a $2 \times 2$ matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ is $\frac{1}{ad-bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.
$$
(X^T X)^{-1} = \frac{1}{3(14) - 6(6)} \begin{pmatrix} 14 & -6 \\ -6 & 3 \end{pmatrix} = \frac{1}{6} \begin{pmatrix} 14 & -6 \\ -6 & 3 \end{pmatrix} = \begin{pmatrix} 7/3 & -1 \\ -1 & 1/2 \end{pmatrix}
$$

**Step 3: Calculate $X^T \mathbf{y}$.**
$$
X^T \mathbf{y} = \begin{pmatrix} 1 & 1 & 1 \\ 1 & 2 & 3 \end{pmatrix} \begin{pmatrix} 2 \\ 3 \\ 5 \end{pmatrix} = \begin{pmatrix} 2+3+5 \\ 2+6+15 \end{pmatrix} = \begin{pmatrix} 10 \\ 23 \end{pmatrix}
$$

**Step 4: Calculate the coefficient vector $\hat{\beta}$.**
$$
\hat{\beta} = (X^T X)^{-1} X^T \mathbf{y} = \begin{pmatrix} 7/3 & -1 \\ -1 & 1/2 \end{pmatrix} \begin{pmatrix} 10 \\ 23 \end{pmatrix} = \begin{pmatrix} 70/3 - 23 \\ -10 + 23/2 \end{pmatrix} = \begin{pmatrix} 1/3 \\ 3/2 \end{pmatrix}
$$
So, our estimated regression line is $\hat{y} = \frac{1}{3} + \frac{3}{2}x$.

**Step 5: Perform inference on $\hat{\beta}_1$ (the slope).**
Let's test the null hypothesis $H_0: \beta_1 = 0$.
First, find the residuals: $\hat{\mathbf{y}} = X\hat{\beta} = \begin{pmatrix} 1 & 1 \\ 1 & 2 \\ 1 & 3 \end{pmatrix} \begin{pmatrix} 1/3 \\ 3/2 \end{pmatrix} = \begin{pmatrix} 1/3+3/2 \\ 1/3+3 \\ 1/3+9/2 \end{pmatrix} = \begin{pmatrix} 11/6 \\ 10/3 \\ 29/6 \end{pmatrix} \approx \begin{pmatrix} 1.83 \\ 3.33 \\ 4.83 \end{pmatrix}$.
The residual vector is $\mathbf{e} = \mathbf{y} - \hat{\mathbf{y}} = \begin{pmatrix} 2 - 11/6 \\ 3 - 10/3 \\ 5 - 29/6 \end{pmatrix} = \begin{pmatrix} 1/6 \\ -1/3 \\ 1/6 \end{pmatrix}$.
The sum of squared residuals is $SSR = (1/6)^2 + (-1/3)^2 + (1/6)^2 = 1/36 + 4/36 + 1/36 = 6/36 = 1/6$.
Estimate the error variance: $\hat{\sigma}^2 = \frac{SSR}{n-p-1} = \frac{1/6}{3-1-1} = 1/6$. (Here $n=3$ data points, $p=1$ predictor).
The variance-covariance matrix of $\hat{\beta}$ is estimated as $\hat{\sigma}^2(X^T X)^{-1} = \frac{1}{6} \begin{pmatrix} 7/3 & -1 \\ -1 & 1/2 \end{pmatrix} = \begin{pmatrix} 7/18 & -1/6 \\ -1/6 & 1/12 \end{pmatrix}$.
The variance of $\hat{\beta}_1$ is the bottom-right element, $1/12$. The standard error is $\text{SE}(\hat{\beta}_1) = \sqrt{1/12} \approx 0.2887$.
The t-statistic is $t = \frac{\hat{\beta}_1 - 0}{\text{SE}(\hat{\beta}_1)} = \frac{1.5}{0.2887} \approx 5.19$.
With $n-p-1 = 1$ degree of freedom, this t-value is highly significant, providing strong evidence to reject the null hypothesis that the true slope is zero.

*Reflection*: Each step is a mechanical application of a derived formula. Step 1 sets up the problem in matrix form. Steps 2-4 solve for the coefficients using the normal equation. Step 5 uses that result and the model's statistical assumptions to quantify the uncertainty in our slope estimate.

## Diagrams
A scatter plot showing the data points, the fitted line, and the residuals.

```text
      ^ y
      |
    5 + . . . . . . . . . . . . . . . . . . . . . . . . . . o (3, 5)
      |                                                 . ' |
    4 +                                               .   ' | e_3
      |                                             .     ' v
    3 + . . . . . . . . . . . . . . . o (2, 3)    .       '
      |                             . |       .         '
    2 + . . . o (1, 2)            .   '     .           '
      |       | ' |             .     '   .             '
    1 +       v ' | e_1       .       ' .               '
      |       ' e_2 . . . . . . . . . ' . . . . . . . . . . .
      |     . ' . . . . . . . . . . . ' . . . . . . . . . . .
    0 +------------------------------------------------------------> x
      0     1     2     3     4     5

Key:
o          - Data point (y_i)
...........  - Fitted line (ŷ_i)
' | '      - Residual (e_i = y_i - ŷ_i)
```

Geometric interpretation in 3D space (since we have $n=3$ observations). The vector $\mathbf{y} = (2, 3, 5)$ is projected onto the plane spanned by the two column vectors of $X$, which are $\mathbf{c}_0 = (1, 1, 1)$ and $\mathbf{c}_1 = (1, 2, 3)$. The resulting projection is the vector $\hat{\mathbf{y}}$. The residual vector $\mathbf{e}$ is the vector connecting $\hat{\mathbf{y}}$ to $\mathbf{y}$ and is orthogonal to the plane.

## Memory technique — remember this forever
1.  **The Story:** Imagine you are an artillery officer. Your target is the data vector $\mathbf{y}$, which lives in a high-dimensional space. Your cannon can only fire along combinations of your basis vectors (the columns of $X$), so you can only hit targets in the "column space" plane. You can't hit $\mathbf{y}$ directly because it's floating above the plane due to random "wind" (the error $\epsilon$). The best you can do is aim for the spot on the plane directly underneath it. That spot is the projection, $\hat{\mathbf{y}}$. The formula $\hat{\beta} = (X^T X)^{-1} X^T \mathbf{y}$ is your targeting computer's calculation to find the combination of basis vectors ($\hat{\beta}$) that gets you there.
2.  **Must-Overlearn Formulas:**
    *   The model: $\mathbf{y} = X\beta + \epsilon$
    *   The least squares solution: $\hat{\beta} = (X^T X)^{-1} X^T \mathbf{y}$
    *   The t-statistic for a coefficient: $t = \frac{\text{estimate} - \text{hypothesized value}}{\text{standard error}} = \frac{\hat{\beta}_j - \beta_{j,0}}{\text{SE}(\hat{\beta}_j)}$
3.  **Spaced Repetition Schedule:** Review this material and re-derive the normal equations from the matrix form at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget the formula for $\hat{\beta}$, remember the objective: **Minimize the sum of squared residuals**. Write down $S(\beta) = (\mathbf{y} - X\beta)^T(\mathbf{y} - X\beta)$. Expand it to $S(\beta) = \mathbf{y}^T\mathbf{y} - 2\beta^T X^T \mathbf{y} + \beta^T X^T X \beta$. Take the gradient with respect to the vector $\beta$ (using matrix calculus rules $\nabla_\beta (\mathbf{a}^T\beta) = \mathbf{a}$ and $\nabla_\beta (\beta^T A \beta) = 2A\beta$ for symmetric $A$). Set it to zero: $\nabla_\beta S = -2X^T\mathbf{y} + 2X^TX\beta = \mathbf{0}$. Solve for $\beta$. You can always rebuild it from the minimization principle.

## Common mistakes
1.  **Forgetting the Intercept:** Not including a column of ones in the design matrix $X$. This forces your regression line to pass through the origin, which is almost always incorrect.
2.  **Misinterpreting Statistical Significance:** A tiny p-value for a coefficient does not mean the predictor has a large or practically important effect. It only means there is strong evidence that the effect is not *exactly* zero. The magnitude of the coefficient $\hat{\beta}_j$ tells you the effect size.
3.  **Ignoring Multicollinearity:** If two predictor columns in $X$ are highly correlated, the matrix $X^T X$ becomes nearly singular (its determinant is close to zero). This makes its inverse $(X^T X)^{-1}$ explode, leading to very large standard errors and unstable coefficient estimates. You might see a high $R^2$ for the model but no individually significant coefficients.
4.  **Extrapolating Unjustifiably:** The model is only validated for the range of predictor values present in your data. Using it to make predictions far outside this range is a pure guess and highly unreliable.

## Self-check
1.  Given the data points (0, 1), (1, 3), (2, 4), set up and solve the normal equations for the simple linear regression model $\hat{y} = \beta_0 + \beta_1 x$.
2.  Your colleague runs a regression of rocket fuel efficiency ($y$) on engine temperature ($x_1$) and ambient pressure ($x_2$). For the temperature coefficient, they report $\hat{\beta}_1 = 0.5$ with a 95% confidence interval of $[-0.1, 1.1]$. At a significance level of $\alpha = 0.05$, can you reject the null hypothesis that temperature has no effect on efficiency? Why or why not?
3.  Explain, using the language of linear algebra, why the sum of the residuals, $\sum_{i=1}^n e_i$, in any linear regression model that includes an intercept term must be exactly zero. (Hint: What is the first column of the design matrix $X$ and what does the orthogonality condition $X^T\mathbf{e} = \mathbf{0}$ imply?)