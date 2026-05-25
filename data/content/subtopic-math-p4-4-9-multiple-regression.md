## What it is
Multiple regression is a statistical technique used to model the relationship between a single dependent variable (the outcome) and two or more independent variables (the predictors). It extends simple linear regression by fitting a linear equation to the observed data, but in a higher-dimensional space. The goal is to find the "best fit" hyperplane that explains how the predictors collectively influence the outcome.

## Why it matters
This is a workhorse of quantitative analysis. In machine learning, it's often the first baseline model for prediction tasks. In aerospace, you might use it to model a rocket engine's specific impulse as a function of chamber pressure, nozzle expansion ratio, and propellant mixture ratio. In physics, it's used to analyze experimental data where an outcome depends on several controlled variables simultaneously.

## When to study it
You must have a solid grasp of these prerequisites. If not, master them first.
1.  **Simple Linear Regression:** You should understand the derivation and interpretation of $y = \beta_0 + \beta_1 x + \epsilon$.
2.  **Linear Algebra:** Essential. You must be comfortable with vectors, matrices, matrix multiplication, the transpose, and matrix inversion. The entire modern formulation of regression is in the language of linear algebra.
3.  **Multivariable Calculus:** Specifically, finding the minimum of a function of several variables by taking partial derivatives (the gradient) and setting them to zero.
4.  **Core Statistics:** Expectation, variance, and covariance.

## How to study it (step by step)
1.  **Generalize the Model:** Start with the simple linear regression model $y_i = \beta_0 + \beta_1 x_i + \epsilon_i$. Now, add more predictors: $y_i = \beta_0 + \beta_1 x_{i1} + \beta_2 x_{i2} + \dots + \beta_p x_{ip} + \epsilon_i$. Your first task is to rewrite this entire system of $n$ equations (for $n$ data points) in matrix form: $\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\epsilon}$. Explicitly write out the vector $\mathbf{y}$, the matrix $\mathbf{X}$ (the "design matrix"), and the vector $\boldsymbol{\beta}$ for a small case, say $n=3, p=2$.
2.  **Define the Objective Function:** The goal is to minimize the sum of squared residuals (or errors). The residual for the $i$-th observation is $e_i = y_i - \hat{y}_i$. The sum of squares is $S(\boldsymbol{\beta}) = \sum_{i=1}^n e_i^2$. Write this objective function using matrix notation: $S(\boldsymbol{\beta}) = (\mathbf{y} - \mathbf{X}\boldsymbol{\beta})^T (\mathbf{y} - \mathbf{X}\boldsymbol{\beta})$.
3.  **Derive the Normal Equations:** Minimize $S(\boldsymbol{\beta})$ by taking its gradient with respect to the vector $\boldsymbol{\beta}$ and setting it to the zero vector. Expand the matrix form: $S(\boldsymbol{\beta}) = \mathbf{y}^T\mathbf{y} - 2\boldsymbol{\beta}^T\mathbf{X}^T\mathbf{y} + \boldsymbol{\beta}^T\mathbf{X}^T\mathbf{X}\boldsymbol{\beta}$. Now compute $\nabla_{\boldsymbol{\beta}} S(\boldsymbol{\beta})$ and set it to $\mathbf{0}$. The result is the famous *Normal Equations*.
4.  **Solve for the Coefficients:** From the Normal Equations you derived, solve for the vector of estimated coefficients, $\hat{\boldsymbol{\beta}}$. This will give you the Ordinary Least Squares (OLS) estimator for multiple regression. You will need to use the matrix inverse.
5.  **Interpret the Solution:** The resulting formula, $\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$, is one of the most important results in statistics. Understand what each part means. The term $(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T$ is sometimes called the "pseudo-inverse" of $\mathbf{X}$.

## Key ideas, with intuition
1.  **A Hyperplane, Not a Line:** In simple regression, you fit a line in a 2D plane of $(x, y)$ points. With two predictors ($x_1, x_2$), you are now fitting a flat plane in a 3D space of $(x_1, x_2, y)$ points. With $p$ predictors, you are fitting a $p$-dimensional *hyperplane* in a $(p+1)$-dimensional space. The core idea is the same: find the surface that minimizes the sum of the squared vertical distances from each data point to that surface.

2.  **The Power of Matrix Notation:** The model for a single data point $i$ is $y_i = \beta_0 + \beta_1 x_{i1} + \dots + \beta_p x_{ip} + \epsilon_i$. Writing this out for all $n$ data points is cumbersome. The matrix equation $\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\epsilon}$ elegantly captures the entire system at once.
    $$
    \underbrace{
    \begin{bmatrix} y_1 \\ y_2 \\ \vdots \\ y_n \end{bmatrix}
    }_{\mathbf{y} \text{ (n x 1)}}
    =
    \underbrace{
    \begin{bmatrix}
    1 & x_{11} & x_{12} & \dots & x_{1p} \\
    1 & x_{21} & x_{22} & \dots & x_{2p} \\
    \vdots & \vdots & \vdots & \ddots & \vdots \\
    1 & x_{n1} & x_{n2} & \dots & x_{np}
    \end{bmatrix}
    }_{\mathbf{X} \text{ (n x (p+1))}}
    \underbrace{
    \begin{bmatrix} \beta_0 \\ \beta_1 \\ \vdots \\ \beta_p \end{bmatrix}
    }_{\boldsymbol{\beta} \text{ ((p+1) x 1)}}
    +
    \underbrace{
    \begin{bmatrix} \epsilon_1 \\ \epsilon_2 \\ \vdots \\ \epsilon_n \end{bmatrix}
    }_{\boldsymbol{\epsilon} \text{ (n x 1)}}
    $$
    The column of ones in $\mathbf{X}$ is the key to estimating the intercept term $\beta_0$.

3.  **Geometric Intuition: Orthogonal Projection:** The Normal Equations, $\mathbf{X}^T\mathbf{X}\hat{\boldsymbol{\beta}} = \mathbf{X}^T\mathbf{y}$, have a beautiful geometric meaning. They state that the residual vector $\mathbf{e} = \mathbf{y} - \mathbf{X}\hat{\boldsymbol{\beta}}$ must be orthogonal (perpendicular) to the column space of $\mathbf{X}$. In other words, the vector of predicted values, $\hat{\mathbf{y}} = \mathbf{X}\hat{\boldsymbol{\beta}}$, is the orthogonal projection of the actual data vector $\mathbf{y}$ onto the subspace spanned by the predictor columns in $\mathbf{X}$. This projection is the closest possible vector in the subspace to $\mathbf{y}$, which is precisely what minimizing the squared error achieves.

4.  **"Holding All Else Constant":** The interpretation of a coefficient, say $\hat{\beta}_j$, is the average change in $y$ for a one-unit increase in the predictor $x_j$, *while holding all other predictors in the model constant*. This is the most crucial part of interpretation. The value of $\hat{\beta}_1$ in a model with just $x_1$ will be different from the value of $\hat{\beta}_1$ in a model with $x_1, x_2,$ and $x_3$.

## Worked example
**Problem:** Predict a rocket's final velocity ($y$, in km/s) based on its fuel mass ($x_1$, in tons) and engine efficiency rating ($x_2$, from 1-10). We have the following data from 4 launches:

| Velocity (y) | Fuel (x1) | Efficiency (x2) |
|--------------|-----------|-----------------|
| 8            | 2         | 7               |
| 9            | 3         | 6               |
| 11           | 4         | 8               |
| 10           | 5         | 5               |

**Step 1: Construct the matrices $\mathbf{y}$ and $\mathbf{X}$.**
Remember to add a column of ones to $\mathbf{X}$ for the intercept.
$$
\mathbf{y} = \begin{bmatrix} 8 \\ 9 \\ 11 \\ 10 \end{bmatrix}
\quad
\mathbf{X} = \begin{bmatrix}
1 & 2 & 7 \\
1 & 3 & 6 \\
1 & 4 & 8 \\
1 & 5 & 5
\end{bmatrix}
$$

**Step 2: Calculate $\mathbf{X}^T\mathbf{X}$ and $\mathbf{X}^T\mathbf{y}$.**
$$
\mathbf{X}^T = \begin{bmatrix}
1 & 1 & 1 & 1 \\
2 & 3 & 4 & 5 \\
7 & 6 & 8 & 5
\end{bmatrix}
$$
$$
\mathbf{X}^T\mathbf{X} = \begin{bmatrix}
1 & 1 & 1 & 1 \\
2 & 3 & 4 & 5 \\
7 & 6 & 8 & 5
\end{bmatrix}
\begin{bmatrix}
1 & 2 & 7 \\
1 & 3 & 6 \\
1 & 4 & 8 \\
1 & 5 & 5
\end{bmatrix}
= \begin{bmatrix}
4 & 14 & 26 \\
14 & 54 & 90 \\
26 & 90 & 174
\end{bmatrix}
$$
$$
\mathbf{X}^T\mathbf{y} = \begin{bmatrix}
1 & 1 & 1 & 1 \\
2 & 3 & 4 & 5 \\
7 & 6 & 8 & 5
\end{bmatrix}
\begin{bmatrix} 8 \\ 9 \\ 11 \\ 10 \end{bmatrix}
= \begin{bmatrix}
38 \\
137 \\
248
\end{bmatrix}
$$

**Step 3: Calculate the inverse $(\mathbf{X}^T\mathbf{X})^{-1}$.**
For a 3x3 matrix, this is tedious but mechanical. For this example, the result is:
$$
(\mathbf{X}^T\mathbf{X})^{-1} \approx \begin{bmatrix}
11.275 & -1.225 & -1.375 \\
-1.225 & 0.225 & 0.125 \\
-1.375 & 0.125 & 0.25
\end{bmatrix}
$$

**Step 4: Calculate $\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$.**
$$
\hat{\boldsymbol{\beta}} = \begin{bmatrix} \hat{\beta}_0 \\ \hat{\beta}_1 \\ \hat{\beta}_2 \end{bmatrix} =
\begin{bmatrix}
11.275 & -1.225 & -1.375 \\
-1.225 & 0.225 & 0.125 \\
-1.375 & 0.125 & 0.25
\end{bmatrix}
\begin{bmatrix}
38 \\
137 \\
248
\end{bmatrix}
= \begin{bmatrix}
-80.125 \\
15.375 \\
17.0
\end{bmatrix}
$$
Wait, my calculation gives a different result. Let me re-calculate.
Re-calculating the inverse and product. The inverse is actually:
$$
(\mathbf{X}^T\mathbf{X})^{-1} = \frac{1}{176} \begin{bmatrix}
1284 & -196 & -220 \\
-196 & 44 & 28 \\
-220 & 28 & 40
\end{bmatrix} \approx \begin{bmatrix}
7.295 & -1.114 & -1.25 \\
-1.114 & 0.25 & 0.159 \\
-1.25 & 0.159 & 0.227
\end{bmatrix}
$$
Let's use the exact fraction to avoid rounding errors.
$$
\hat{\boldsymbol{\beta}} = \frac{1}{176} \begin{bmatrix}
1284 & -196 & -220 \\
-196 & 44 & 28 \\
-220 & 28 & 40
\end{bmatrix}
\begin{bmatrix}
38 \\
137 \\
248
\end{bmatrix}
= \frac{1}{176} \begin{bmatrix}
48792 - 26852 - 54560 \\
-7448 + 6028 + 6944 \\
-8360 + 3836 + 9920
\end{bmatrix}
= \frac{1}{176} \begin{bmatrix}
-32620 \\
5524 \\
5396
\end{bmatrix}
$$
This is not coming out nicely. Let me check the arithmetic for $\mathbf{X}^T\mathbf{X}$.
$1^2+1^2+1^2+1^2 = 4$.
$1*2+1*3+1*4+1*5 = 14$.
$1*7+1*6+1*8+1*5 = 26$.
$2^2+3^2+4^2+5^2 = 4+9+16+25 = 54$.
$2*7+3*6+4*8+5*5 = 14+18+32+25 = 89$. Ah, there is the error. The (2,3) entry is 89, not 90.

Let's restart the calculation with the correct matrix.
$$
\mathbf{X}^T\mathbf{X} = \begin{bmatrix}
4 & 14 & 26 \\
14 & 54 & 89 \\
26 & 89 & 174
\end{bmatrix}
$$
The determinant is $4(54 \cdot 174 - 89^2) - 14(14 \cdot 174 - 89 \cdot 26) + 26(14 \cdot 89 - 54 \cdot 26) = 4(1452) - 14(122) + 26(-160) = 5808 - 1708 - 4160 = -60$.
This is invertible. The calculations are becoming too tedious for a clean example. I will choose simpler numbers.

**Revised Worked Example:**
Data:
(y, x1, x2) = (6, 2, 0), (8, 1, 2), (9, 3, 1)

**Step 1:**
$$
\mathbf{y} = \begin{bmatrix} 6 \\ 8 \\ 9 \end{bmatrix}
\quad
\mathbf{X} = \begin{bmatrix}
1 & 2 & 0 \\
1 & 1 & 2 \\
1 & 3 & 1
\end{bmatrix}
$$
**Step 2:**
$$
\mathbf{X}^T\mathbf{X} = \begin{bmatrix}
1 & 1 & 1 \\
2 & 1 & 3 \\
0 & 2 & 1
\end{bmatrix}
\begin{bmatrix}
1 & 2 & 0 \\
1 & 1 & 2 \\
1 & 3 & 1
\end{bmatrix}
= \begin{bmatrix}
3 & 6 & 3 \\
6 & 14 & 5 \\
3 & 5 & 5
\end{bmatrix}
$$
$$
\mathbf{X}^T\mathbf{y} = \begin{bmatrix}
1 & 1 & 1 \\
2 & 1 & 3 \\
0 & 2 & 1
\end{bmatrix}
\begin{bmatrix} 6 \\ 8 \\ 9 \end{bmatrix}
= \begin{bmatrix}
23 \\
47 \\
25
\end{bmatrix}
$$
**Step 3:**
$$
(\mathbf{X}^T\mathbf{X})^{-1} = \frac{1}{18} \begin{bmatrix}
45 & -15 & -12 \\
-15 & 6 & 3 \\
-12 & 3 & 6
\end{bmatrix}
$$
**Step 4:**
$$
\hat{\boldsymbol{\beta}} = \frac{1}{18} \begin{bmatrix}
45 & -15 & -12 \\
-15 & 6 & 3 \\
-12 & 3 & 6
\end{bmatrix}
\begin{bmatrix}
23 \\
47 \\
25
\end{bmatrix}
= \frac{1}{18} \begin{bmatrix}
1035 - 705 - 300 \\
-345 + 282 + 75 \\
-276 + 141 + 150
\end{bmatrix}
= \frac{1}{18} \begin{bmatrix}
30 \\
12 \\
15
\end{bmatrix}
= \begin{bmatrix}
5/3 \\
2/3 \\
5/6
\end{bmatrix} \approx \begin{bmatrix}
1.67 \\
0.67 \\
0.83
\end{bmatrix}
$$
**Step 5: Write and interpret the final model.**
The regression equation is $\hat{y} = 1.67 + 0.67 x_1 + 0.83 x_2$.
-   **Intercept ($\hat{\beta}_0=1.67$):** The predicted velocity is 1.67 km/s when both fuel mass and efficiency are zero.
-   **Fuel Coeff ($\hat{\beta}_1=0.67$):** For each additional ton of fuel, the velocity is predicted to increase by 0.67 km/s, holding engine efficiency constant.
-   **Efficiency Coeff ($\hat{\beta}_2=0.83$):** For each one-point increase in efficiency rating, the velocity is predicted to increase by 0.83 km/s, holding fuel mass constant.

*Reflection:* Each step is a direct application of the derived formula. Constructing the matrices correctly is the first critical gate. The matrix multiplications are mechanical. The inverse is the most computationally intensive step. The final multiplication yields the coefficients that define the best-fit plane.

## Diagrams

A regression with two predictors can be visualized as a plane in 3D space.

```text
       y ^
         |
         |         .
         |       /
         |     /
         |   / E <-- residual (error)
         | / . P
         o----------- > x2
        /  /
       / /
      /
     v x1

P = Actual data point (y, x1, x2)
E = Predicted point on the regression plane (ŷ, x1, x2)
The goal of OLS is to minimize the sum of (length of E-P)^2 for all points.
```

The geometric view of the OLS solution as a projection.

```text
                y
                ^
                | \
                |   \
                |     \ e = y - ŷ  (residual vector)
                |       \
                |-- - - ->ŷ = Xβ̂ (prediction vector)
                o---------------------->
               /
              /
             /
            Column Space of X (a plane)

The vector y is projected orthogonally onto the subspace (plane) spanned by
the columns of X. The projection is ŷ. The residual vector e is orthogonal
to the subspace, which means X^T * e = 0. This is the source of the
Normal Equations.
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you're a god trying to create a universe governed by a simple linear law, $\mathbf{y} = \mathbf{X}\boldsymbol{\beta}$. You know the design $\mathbf{X}$ and the law $\boldsymbol{\beta}$, so you can predict the outcomes $\mathbf{y}$. But a trickster adds random noise, $\boldsymbol{\epsilon}$, so what we mortals observe is $\mathbf{y}_{obs} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\epsilon}$. Our job as statisticians is to reverse this. We have $\mathbf{y}_{obs}$ and $\mathbf{X}$, and we want to find the best possible estimate for the true law, $\hat{\boldsymbol{\beta}}$. The formula is our tool to undo the trickster's noise as best as possible. The formula $(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$ is the recipe to find the "least wrong" set of laws.

2.  **Must-Know Formulas:**
    *   The Model: $\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\epsilon}$
    *   The OLS Solution: $\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$

3.  **Spaced Repetition Schedule:** Review this material and re-derive the solution from scratch at **1 day, 3 days, 7 days, 16 days, 35 days**. Do not skip this.

4.  **First Principles Pathway:** If you forget the solution formula, you can always re-derive it.
    *   Start with the goal: Minimize the sum of squared errors.
    *   Write it in vector form: $S(\boldsymbol{\beta}) = (\mathbf{y} - \mathbf{X}\boldsymbol{\beta})^T (\mathbf{y} - \mathbf{X}\boldsymbol{\beta})$.
    *   Expand: $S(\boldsymbol{\beta}) = \mathbf{y}^T\mathbf{y} - 2\boldsymbol{\beta}^T\mathbf{X}^T\mathbf{y} + \boldsymbol{\beta}^T\mathbf{X}^T\mathbf{X}\boldsymbol{\beta}$.
    *   Take the gradient w.r.t. $\boldsymbol{\beta}$: $\nabla_{\boldsymbol{\beta}} S = -2\mathbf{X}^T\mathbf{y} + 2\mathbf{X}^T\mathbf{X}\boldsymbol{\beta}$.
    *   Set to zero and solve: $2\mathbf{X}^T\mathbf{X}\boldsymbol{\beta} = 2\mathbf{X}^T\mathbf{y} \implies \mathbf{X}^T\mathbf{X}\boldsymbol{\beta} = \mathbf{X}^T\mathbf{y}$. This gives you the Normal Equations, which you can solve with a matrix inverse.

## Common mistakes
1.  **Forgetting the Intercept Column:** Failing to add a column of 1s to the design matrix $\mathbf{X}$. This forces the regression hyperplane to pass through the origin, which is almost always an incorrect assumption and will bias your results.
2.  **Interpreting $\beta_j$ in Isolation:** Stating "a one-unit increase in $x_j$ leads to a $\beta_j$ change in $y$" is incomplete and wrong. You MUST add the condition "...holding all other predictors in the model constant."
3.  **Ignoring Multicollinearity:** If two of your predictor variables are highly correlated (e.g., using both a person's height in inches and height in centimeters as predictors), the matrix $\mathbf{X}^T\mathbf{X}$ becomes nearly singular (non-invertible). The model can't distinguish the individual effects of the predictors, leading to extremely unstable and unreliable coefficient estimates.

## Self-check
1.  For a regression model with 100 observations and 5 predictor variables (plus an intercept), what are the dimensions of the vector $\mathbf{y}$, the matrix $\mathbf{X}$, the vector $\boldsymbol{\beta}$, and the matrix $\mathbf{X}^T\mathbf{X}$?
2.  A colleague claims their multiple regression model is superior because they got a large value for $\hat{\beta}_1 = 150.2$. You notice the corresponding predictor, $x_1$, was "rocket mass in grams". Another predictor, $x_2$, was "rocket mass in kilograms". Why is your colleague's interpretation of $\hat{\beta}_1$ likely meaningless?
3.  Starting from the geometric intuition that the residual vector $\mathbf{e}$ must be orthogonal to every column of the design matrix $\mathbf{X}$, show how this leads directly to the Normal Equations $\mathbf{X}^T\mathbf{X}\hat{\boldsymbol{\beta}} = \mathbf{X}^T\mathbf{y}$.