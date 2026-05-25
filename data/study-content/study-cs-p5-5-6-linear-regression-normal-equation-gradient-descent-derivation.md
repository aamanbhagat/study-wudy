## 1. What it is — in plain English

Imagine you have a bunch of scattered dots on a graph, like plotting how much ice cream someone eats versus the temperature outside. You want to see if there's a pattern, specifically if higher temperatures generally lead to more ice cream. Linear regression is simply a fancy way of finding the "best straight line" that cuts through these dots.

This line isn't just any line; it's the one that minimizes the total "distance" or "error" between itself and all the dots. Think of it like trying to draw a single, straight trend line through a cloud of points, where the line tries to be as close as possible to every point, on average. If you draw it well, it can help you guess what might happen next – for example, if the temperature hits a new high, you can predict how much ice cream might be sold.

"Linear" means we're looking for a straight line (or a flat plane in higher dimensions), not a curvy one. "Regression" means we're trying to predict a continuous value (like temperature, price, or speed) rather than classifying something into categories (like "cat" or "dog"). So, linear regression is a tool for predicting a number by fitting a straight line to existing data.

## 2. Why it matters — real-world applications

Linear regression is a foundational algorithm in machine learning and statistics because of its simplicity, interpretability, and effectiveness for many problems. It's often the first model data scientists try.

1.  **Aerospace Engineering - Fuel Efficiency Prediction:** Imagine an airline wants to predict the fuel consumption of a new aircraft design. They can run test flights, collecting data on factors like altitude, airspeed, payload weight, and engine thrust. Linear regression can then be used to model the relationship between these factors (input features) and fuel consumption (output). This helps optimize flight paths, predict operational costs, and even inform design modifications for better efficiency. For example, a model might predict that for every additional 1000 feet of altitude, fuel consumption decreases by X liters per hour, holding other factors constant.

2.  **Financial Forecasting - Housing Price Prediction:** Real estate companies or individual investors often want to estimate the value of a house. They can gather data on various features like square footage, number of bedrooms, location (zip code), age of the house, and recent comparable sales. Linear regression can build a model that predicts a house's price based on these features. Zillow, for instance, uses sophisticated models that often incorporate linear components to estimate home values (their "Zestimate").

3.  **Physics and Experimental Data Analysis - Material Stress-Strain Curves:** In materials science, engineers conduct experiments to understand how materials behave under stress. They apply a force (stress) and measure the resulting deformation (strain). For many materials within their elastic limit, the relationship between stress and strain is linear (Hooke's Law). Linear regression is used to fit a line to experimental stress-strain data, determining the material's Young's Modulus (the slope of this line), which is a critical material property. This helps predict how a material will perform in structures like aircraft wings or bridge supports.

4.  **Healthcare - Drug Dosage Response:** Pharmaceutical companies developing new drugs need to understand the relationship between the dosage of a medication and its effect on patients (e.g., reduction in blood pressure, concentration in the bloodstream). By administering different dosages to patient groups and measuring the response, linear regression can model this dose-response relationship. This helps determine optimal safe and effective dosages for new treatments.

## 3. Prerequisites — what you must know first

Before diving deep into linear regression, ensure you have a solid grasp of these fundamental concepts. If any of these feel unfamiliar, pause and review them.

*   **Algebra:** Understanding variables, equations, manipulating algebraic expressions, and solving systems of linear equations.
*   **Calculus (Multivariable):** Knowledge of derivatives, partial derivatives, and the concept of finding minima/maxima of functions by setting derivatives to zero.
*   **Linear Algebra:** Familiarity with vectors, matrices, matrix multiplication, vector addition, matrix transpose, matrix inverse, and the dot product. This is crucial for the "normal equation" approach and for understanding the vectorized forms of equations.
*   **Basic Statistics:** An intuitive understanding of data points, averages (mean), and the concept of error or residual.
*   **Geometric Intuition:** The ability to visualize lines and planes in 2D and 3D space.

## 4. The core idea — step by step

Linear regression aims to model the relationship between a dependent variable (what we want to predict, often denoted $y$) and one or more independent variables (features, denoted $x$). For simplicity, we'll start with a single independent variable (simple linear regression) and then generalize to multiple variables.

### Step 1: The Goal - Find a Line

**Plain English:** We want to find a straight line that best describes the relationship between our input data ($x$) and our output data ($y$). This line will allow us to predict $y$ for a new $x$ value.

**Concrete Example:** Imagine we have data points for house size ($x$) and house price ($y$). We want to find a line that, given a new house size, can estimate its price. A straight line is defined by its slope and its y-intercept.

**Formal/Mathematical Version:** In simple linear regression (one feature), the equation of a line is:
$$ h_\theta(x) = \theta_0 + \theta_1 x $$
Here:
*   $h_\theta(x)$ is our "hypothesis" function. It's the predicted value of $y$ for a given $x$.
*   $\theta_0$ (theta-naught) is the y-intercept (the value of $y$ when $x=0$).
*   $\theta_1$ (theta-one) is the slope of the line (how much $y$ changes for a unit change in $x$).
*   The subscript $\theta$ indicates that $h$ is parameterized by $\theta_0$ and $\theta_1$. Our goal is to find the best values for these parameters.

For multiple features (multivariate linear regression), we extend this to:
$$ h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 x_2 + \dots + \theta_n x_n $$
where $x_1, x_2, \dots, x_n$ are the $n$ features.
This can be written more compactly using vector notation. We introduce a "dummy" feature $x_0 = 1$ for the intercept term. Then, $x$ becomes a vector $[x_0, x_1, \dots, x_n]^T$ and $\theta$ becomes a vector $[\theta_0, \theta_1, \dots, \theta_n]^T$.
$$ h_\theta(x) = \theta^T x $$
This is the standard vectorized form you'll see in machine learning.

**What could go wrong:** If the relationship between $x$ and $y$ is clearly not linear (e.g., it looks like a curve), trying to fit a straight line will result in a poor model. We might need polynomial regression or other non-linear models then.

### Step 2: What is "Best Fit"? - The Cost Function

**Plain English:** How do we decide which line is "best"? We need a way to measure how "wrong" a particular line is. For each data point, we can calculate the difference between its actual $y$ value and the $y$ value predicted by our line. We want to find the line where these differences are, on average, as small as possible. To prevent positive and negative differences from canceling out, we usually square these differences.

**Concrete Example:** Suppose we have a data point $(x^{(i)}, y^{(i)}) = (2, 5)$. If our line predicts $h_\theta(2) = 4$, the error is $5 - 4 = 1$. If it predicts $h_\theta(2) = 6$, the error is $5 - 6 = -1$. Squaring these errors gives $1^2 = 1$ and $(-1)^2 = 1$. We sum these squared errors over all our data points.

**Formal/Mathematical Version:** We define a **cost function** (or loss function), typically denoted $J(\theta)$, which measures the average squared difference between the predicted values and the actual values. This is also known as the Mean Squared Error (MSE), or more precisely, half the Mean Squared Error.
For $m$ training examples $(x^{(1)}, y^{(1)}), \dots, (x^{(m)}, y^{(m)})$:
$$ J(\theta_0, \theta_1) = \frac{1}{2m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})^2 $$
Or, in vectorized form:
$$ J(\theta) = \frac{1}{2m} (X\theta - y)^T (X\theta - y) $$
Here:
*   $m$ is the number of training examples.
*   $x^{(i)}$ and $y^{(i)}$ are the $i$-th training example's features and actual output.
*   $h_\theta(x^{(i)})$ is the predicted output for the $i$-th example.
*   The factor $\frac{1}{2m}$ is for convenience: $\frac{1}{m}$ averages the squared errors, and $\frac{1}{2}$ makes the derivative calculations cleaner (the 2 from the square term cancels out).
Our goal is to find the values of $\theta$ that **minimize** $J(\theta)$. This particular cost function is convex, meaning it has only one global minimum, which is great for optimization.

**What could go wrong:**
*   Using absolute error ($|h_\theta(x^{(i)}) - y^{(i)}|$): This is less desirable because the absolute value function is not differentiable at zero, which complicates finding the minimum using calculus-based methods.
*   Not squaring the errors: If we just sum $(h_\theta(x^{(i)}) - y^{(i)})$, positive and negative errors would cancel out, potentially leading to a line that is far from the data but has a sum of errors close to zero.

### Step 3: Minimizing the Cost Function - Two Paths

**Plain English:** Now that we have a way to measure how good our line is (the cost function $J(\theta)$), we need a strategy to find the $\theta_0$ and $\theta_1$ values that make $J(\theta)$ as small as possible. Imagine $J(\theta)$ as a bowl-shaped surface. We're looking for the very bottom of that bowl. There are two main approaches to do this:

1.  **Directly solve for the minimum:** This is like finding the exact coordinates of the bottom of the bowl using algebra and calculus. This method is called the **Normal Equation**.
2.  **Iteratively walk downhill:** This is like starting at a random point on the bowl and taking small steps downwards until you reach the bottom. This method is called **Gradient Descent**.

**Concrete Example:** If you are trying to find the lowest point in a valley, you can either use a map with contour lines to calculate the exact lowest point (Normal Equation) or you can blindfold yourself, feel the slope, and take a small step downhill, repeating until you feel no more slope (Gradient Descent).

**Formal/Mathematical Version:** We are seeking $\theta = \arg\min_{\theta} J(\theta)$.

### Step 4: Path A - Normal Equation (Direct Solution)

**Plain English:** If our cost function is like a simple bowl, we can find its lowest point directly. In calculus, the minimum of a function occurs where its slope (derivative) is zero. So, we can take the derivative of our cost function with respect to each $\theta$ parameter, set those derivatives to zero, and solve the resulting system of equations.

**Concrete Example:** For a simple parabola $f(x) = x^2 - 4x + 5$, to find its minimum, we take the derivative $f'(x) = 2x - 4$, set it to zero: $2x - 4 = 0 \Rightarrow x = 2$. The minimum occurs at $x=2$. We apply the same logic to our cost function $J(\theta_0, \theta_1)$ which is a 3D bowl (paraboloid).

**Formal/Mathematical Version:**
Let's use the vectorized form for $J(\theta)$ as it generalizes easily to multiple features.
Recall $J(\theta) = \frac{1}{2m} (X\theta - y)^T (X\theta - y)$.
To find the minimum, we take the gradient of $J(\theta)$ with respect to $\theta$ and set it to the zero vector.
First, expand $(X\theta - y)^T (X\theta - y)$:
$(X\theta - y)^T (X\theta - y) = (X\theta)^T (X\theta) - (X\theta)^T y - y^T (X\theta) + y^T y$
$= \theta^T X^T X \theta - \theta^T X^T y - y^T X \theta + y^T y$
Since $y^T X \theta$ is a scalar (a $1 \times 1$ matrix), its transpose is itself: $(y^T X \theta)^T = \theta^T X^T y$.
So, $\theta^T X^T y$ and $y^T X \theta$ are the same.
Thus, $J(\theta) = \frac{1}{2m} (\theta^T X^T X \theta - 2\theta^T X^T y + y^T y)$.
Now, we take the derivative with respect to $\theta$. We use matrix calculus identities:
*   $\frac{\partial}{\partial \theta} (\theta^T A \theta) = (A + A^T)\theta$
*   $\frac{\partial}{\partial \theta} (c^T \theta) = c$
Applying these (with $A = X^T X$ and $c = X^T y$):
$$ \nabla_\theta J(\theta) = \frac{1}{2m} ( (X^T X + (X^T X)^T)\theta - 2 X^T y + 0 ) $$
Since $X^T X$ is always a symmetric matrix, $(X^T X)^T = X^T X$.
$$ \nabla_\theta J(\theta) = \frac{1}{2m} ( 2 X^T X \theta - 2 X^T y ) $$
Set the gradient to zero:
$$ \frac{1}{2m} ( 2 X^T X \theta - 2 X^T y ) = 0 $$
$$ X^T X \theta - X^T y = 0 $$
$$ X^T X \theta = X^T y $$
Now, if $(X^T X)$ is invertible, we can solve for $\theta$:
$$ \theta = (X^T X)^{-1} X^T y $$
This is the **Normal Equation**. It gives us the optimal $\theta$ values directly, without any iteration.
Note: $X$ is the "design matrix". Each row is a training example, and each column is a feature. We add a column of ones to $X$ for the intercept term $\theta_0$. So if we have $m$ examples and $n$ features, $X$ will be an $m \times (n+1)$ matrix. $y$ is an $m \times 1$ vector of target values.

**What could go wrong:**
*   **Non-invertibility of $X^T X$**: If $X^T X$ is singular (not invertible), we cannot use this formula directly. This can happen if:
    *   Features are linearly dependent (e.g., $x_1$ = size in sq ft, $x_2$ = size in sq meters; they convey the same information).
    *   Too many features compared to the number of training examples ($m \le n+1$).
    *   In such cases, regularization techniques or pseudo-inverse methods can be used.
*   **Computational Cost**: Calculating $(X^T X)^{-1}$ involves matrix inversion, which has a time complexity of approximately $O(n^3)$ (where $n$ is the number of features). For a very large number of features (e.g., $n > 10,000$), this can be computationally expensive and slow.

### Step 5: Path B - Gradient Descent (Iterative Solution)

**Plain English:** Instead of solving directly, we can start with some random line (random $\theta$ values) and then iteratively adjust the line to make it a little bit better. We look at the "slope" of the cost function at our current position. If the slope is positive, we know we need to decrease our $\theta$ value to go downhill. If the slope is negative, we need to increase our $\theta$ value. We take a small step in the direction opposite to the slope, and repeat.

**Concrete Example:** Imagine you're blindfolded on a mountain and want to reach the bottom. You feel the ground around you to find the steepest downhill direction. You take a small step in that direction. You repeat this process, always taking steps in the steepest downhill direction, until you reach a point where you feel no more slope (the bottom). The "steepness" is given by the gradient (derivative), and the "small step" is controlled by a learning rate.

**Formal/Mathematical Version:**
The gradient descent algorithm iteratively updates the parameters $\theta_j$ to minimize $J(\theta)$. The update rule is:
$$ \theta_j := \theta_j - \alpha \frac{\partial}{\partial \theta_j} J(\theta) $$
This update must be performed **simultaneously** for all $\theta_j$ (i.e., calculate all new $\theta_j$ values based on the old values, then update them all at once).
Here:
*   $\theta_j$ is the $j$-th parameter (e.g., $\theta_0, \theta_1$).
*   $\alpha$ (alpha) is the **learning rate**, a positive constant that determines the size of the step we take downhill.
*   $\frac{\partial}{\partial \theta_j} J(\theta)$ is the partial derivative of the cost function with respect to $\theta_j$. This tells us the slope of the cost function surface at our current $\theta$ values, in the direction of $\theta_j$.

Let's derive the partial derivatives for linear regression:
Recall $J(\theta) = \frac{1}{2m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})^2 = \frac{1}{2m} \sum_{i=1}^m (\theta^T x^{(i)} - y^{(i)})^2$.

For $\theta_j$:
$$ \frac{\partial}{\partial \theta_j} J(\theta) = \frac{\partial}{\partial \theta_j} \left[ \frac{1}{2m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})^2 \right] $$
Using the chain rule: $\frac{\partial}{\partial u} (u^2) = 2u \frac{\partial u}{\partial \theta_j}$. Here $u = (h_\theta(x^{(i)}) - y^{(i)})$.
$$ = \frac{1}{2m} \sum_{i=1}^m 2 (h_\theta(x^{(i)}) - y^{(i)}) \frac{\partial}{\partial \theta_j} (h_\theta(x^{(i)}) - y^{(i)}) $$
$$ = \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)}) \frac{\partial}{\partial \theta_j} \left( \sum_{k=0}^n \theta_k x_k^{(i)} - y^{(i)} \right) $$
The derivative $\frac{\partial}{\partial \theta_j} (\sum_{k=0}^n \theta_k x_k^{(i)} - y^{(i)})$ is simply $x_j^{(i)}$ (because all other terms $\theta_k x_k^{(i)}$ where $k \neq j$ are treated as constants, and $y^{(i)}$ is a constant).
So, the partial derivative is:
$$ \frac{\partial}{\partial \theta_j} J(\theta) = \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)}) x_j^{(i)} $$
Now, substitute this back into the gradient descent update rule:
$$ \theta_j := \theta_j - \alpha \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)}) x_j^{(i)} \quad \text{(for } j = 0, 1, \dots, n \text{)} $$
This is the **Gradient Descent update rule for linear regression**.
For the intercept term $\theta_0$, recall $x_0^{(i)} = 1$. So its update rule is:
$$ \theta_0 := \theta_0 - \alpha \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)}) $$

**What could go wrong:**
*   **Learning Rate ($\alpha$) too high**: The algorithm might overshoot the minimum, bounce around, or even diverge (fail to converge at all), leading to larger and larger $J(\theta)$.
*   **Learning Rate ($\alpha$) too low**: The algorithm will take very small steps and converge extremely slowly, requiring many iterations.
*   **Local Minima**: For complex, non-convex cost functions, gradient descent can get stuck in a local minimum that is not the global minimum. However, for linear regression with the squared error cost function, the cost function is convex, so gradient descent will always converge to the global minimum (assuming a suitable learning rate).
*   **Feature Scaling**: If features have very different scales (e.g., house size in sq ft vs. number of bedrooms), the contour plots of $J(\theta)$ will be very elongated, and gradient descent will take a long, winding path to the minimum, slowing convergence.

### Step 6: Feature Scaling (Important for Gradient Descent)

**Plain English:** Imagine you're trying to find the lowest point in a valley, but the valley is very long and narrow, like a deep trench. If you take steps in the direction of the steepest slope, you might zig-zag across the narrow dimension many times before making much progress along the long dimension. This is what happens if your features have wildly different ranges (e.g., one feature goes from 1 to 1000, another from 0 to 1). Feature scaling makes all features have a similar range, making the "valley" more circular and allowing gradient descent to converge much faster and more directly.

**Concrete Example:**
*   Feature 1: House size (100 - 2000 sq ft)
*   Feature 2: Number of bedrooms (1 - 5)
Without scaling, $\theta_1$ (for size) might need to be very small, while $\theta_2$ (for bedrooms) might be relatively large. The cost function contours would be very elongated.
After scaling, both features might range from -1 to 1.

**Formal/Mathematical Version:**
A common method for feature scaling is **mean normalization** combined with **standardization**:
$$ x'_j = \frac{x_j - \mu_j}{\sigma_j} $$
Where:
*   $x_j$ is the original value of feature $j$.
*   $\mu_j$ is the mean of all values for feature $j$ in the training set.
*   $\sigma_j$ is the standard deviation of all values for feature $j$ in the training set.
This transforms each feature to have zero mean and unit variance.
Another method is **min-max scaling**:
$$ x'_j = \frac{x_j - \min(x_j)}{\max(x_j) - \min(x_j)} $$
This scales features to a specific range, typically $[0, 1]$.

**What could go wrong:**
*   **Slow Convergence or Oscillations**: Without feature scaling, gradient descent can take a much longer time to converge, or it might oscillate wildly if the learning rate is too high for the unscaled features.
*   **Numerical Instability**: In extreme cases, if feature values are very large, numerical precision issues might arise.
*   **Not applying to test data**: It's crucial to apply the *same* scaling (using the mean and standard deviation/min/max from the *training data*) to any new test data or data used for prediction. Do not recalculate $\mu$ and $\sigma$ from the test set.

## 5. Worked examples — multiple, with every step shown

### Example 1 (Easy): Simple Linear Regression with Normal Equation

**Problem:** Given two data points $(x, y)$: $(1, 2)$ and $(3, 4)$, find the equation of the line $y = \theta_0 + \theta_1 x$ that perfectly fits these points using the Normal Equation.

**Given:**
*   Data points: $(x^{(1)}, y^{(1)}) = (1, 2)$, $(x^{(2)}, y^{(2)}) = (3, 4)$
*   Model: $h_\theta(x) = \theta_0 + \theta_1 x$

**What we want:** The values of $\theta_0$ and $\theta_1$.

**Solution:**
First, we need to construct our design matrix $X$ and target vector $y$.
For each training example $(x^{(i)}, y^{(i)})$, we represent it as a row in $X$ with $x_0^{(i)}=1$ and $x_1^{(i)}=x^{(i)}$.
1.  **Construct $X$ and $y$:**
    $$ X = \begin{pmatrix} 1 & x^{(1)} \\ 1 & x^{(2)} \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 3 \end{pmatrix} $$
    $$ y = \begin{pmatrix} y^{(1)} \\ y^{(2)} \end{pmatrix} = \begin{pmatrix} 2 \\ 4 \end{pmatrix} $$
    *   *Explanation:* The first column of $X$ is for the intercept term $\theta_0$ (always 1), and the second column is for the feature $x$. $y$ contains the actual output values.

2.  **Calculate $X^T X$:**
    $$ X^T = \begin{pmatrix} 1 & 1 \\ 1 & 3 \end{pmatrix} $$
    $$ X^T X = \begin{pmatrix} 1 & 1 \\ 1 & 3 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 1 & 3 \end{pmatrix} $$
    $$ X^T X = \begin{pmatrix} (1 \cdot 1) + (1 \cdot 1) & (1 \cdot 1) + (1 \cdot 3) \\ (1 \cdot 1) + (3 \cdot 1) & (1 \cdot 1) + (3 \cdot 3) \end{pmatrix} $$
    $$ X^T X = \begin{pmatrix} 2 & 4 \\ 4 & 10 \end{pmatrix} $$
    *   *Explanation:* We perform matrix multiplication. The element in row $i$, column $j$ of $X^T X$ is the dot product of row $i$ of $X^T$ and column $j$ of $X$.

3.  **Calculate $X^T y$:**
    $$ X^T y = \begin{pmatrix} 1 & 1 \\ 1 & 3 \end{pmatrix} \begin{pmatrix} 2 \\ 4 \end{pmatrix} $$
    $$ X^T y = \begin{pmatrix} (1 \cdot 2) + (1 \cdot 4) \\ (1 \cdot 2) + (3 \cdot 4) \end{pmatrix} $$
    $$ X^T y = \begin{pmatrix} 6 \\ 14 \end{pmatrix} $$
    *   *Explanation:* Again, matrix multiplication.

4.  **Calculate $(X^T X)^{-1}$:**
    For a $2 \times 2$ matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, its inverse is $\frac{1}{ad-bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.
    Here, $a=2, b=4, c=4, d=10$.
    Determinant: $ad-bc = (2 \cdot 10) - (4 \cdot 4) = 20 - 16 = 4$.
    $$ (X^T X)^{-1} = \frac{1}{4} \begin{pmatrix} 10 & -4 \\ -4 & 2 \end{pmatrix} = \begin{pmatrix} 2.5 & -1 \\ -1 & 0.5 \end{pmatrix} $$
    *   *Explanation:* We use the formula for the inverse of a $2 \times 2$ matrix. The determinant must be non-zero for the inverse to exist.

5.  **Calculate $\theta = (X^T X)^{-1} X^T y$:**
    $$ \theta = \begin{pmatrix} 2.5 & -1 \\ -1 & 0.5 \end{pmatrix} \begin{pmatrix} 6 \\ 14 \end{pmatrix} $$
    $$ \theta = \begin{pmatrix} (2.5 \cdot 6) + (-1 \cdot 14) \\ (-1 \cdot 6) + (0.5 \cdot 14) \end{pmatrix} $$
    $$ \theta = \begin{pmatrix} 15 - 14 \\ -6 + 7 \end{pmatrix} $$
    $$ \theta = \begin{pmatrix} 1 \\ 1 \end{pmatrix} $$
    *   *Explanation:* Final matrix multiplication to get the parameter vector $\theta$.

**Final Answer:**
The parameters are $\theta_0 = 1$ and $\theta_1 = 1$.
Thus, the equation of the line is $\boxed{h_\theta(x) = 1 + 1x}$.

**Reflection:** This example was easy because two points uniquely define a line, so the line perfectly fits the data and the Normal Equation provides an exact solution. It's a good way to see the matrix operations clearly.

---

### Example 2 (Medium): Multivariate Linear Regression with Normal Equation

**Problem:** Given three data points with two features $(x_1, x_2, y)$: $(1, 2, 5)$, $(2, 1, 4)$, $(3, 3, 9)$. Find the parameters $\theta_0, \theta_1, \theta_2$ for the model $h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 x_2$ using the Normal Equation.

**Given:**
*   Data points: $(x_1^{(1)}, x_2^{(1)}, y^{(1)}) = (1, 2, 5)$, $(x_1^{(2)}, x_2^{(2)}, y^{(2)}) = (2, 1, 4)$, $(x_1^{(3)}, x_2^{(3)}, y^{(3)}) = (3, 3, 9)$
*   Model: $h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 x_2$

**What we want:** The values of $\theta_0, \theta_1, \theta_2$.

**Solution:**
1.  **Construct $X$ and $y$:**
    Remember to add a column of ones for $\theta_0$.
    $$ X = \begin{pmatrix} 1 & x_1^{(1)} & x_2^{(1)} \\ 1 & x_1^{(2)} & x_2^{(2)} \\ 1 & x_1^{(3)} & x_2^{(3)} \end{pmatrix} = \begin{pmatrix} 1 & 1 & 2 \\ 1 & 2 & 1 \\ 1 & 3 & 3 \end{pmatrix} $$
    $$ y = \begin{pmatrix} y^{(1)} \\ y^{(2)} \\ y^{(3)} \end{pmatrix} = \begin{pmatrix} 5 \\ 4 \\ 9 \end{pmatrix} $$
    *   *Explanation:* $X$ is an $m \times (n+1)$ matrix, where $m=3$ (examples) and $n=2$ (features).

2.  **Calculate $X^T X$:**
    $$ X^T = \begin{pmatrix} 1 & 1 & 1 \\ 1 & 2 & 3 \\ 2 & 1 & 3 \end{pmatrix} $$
    $$ X^T X = \begin{pmatrix} 1 & 1 & 1 \\ 1 & 2 & 3 \\ 2 & 1 & 3 \end{pmatrix} \begin{pmatrix} 1 & 1 & 2 \\ 1 & 2 & 1 \\ 1 & 3 & 3 \end{pmatrix} $$
    $$ X^T X = \begin{pmatrix} (1+1+1) & (1+2+3) & (2+1+3) \\ (1+2+3) & (1+4+9) & (2+2+9) \\ (2+1+3) & (2+2+9) & (4+1+9) \end{pmatrix} $$
    $$ X^T X = \begin{pmatrix} 3 & 6 & 6 \\ 6 & 14 & 13 \\ 6 & 13 & 14 \end{pmatrix} $$
    *   *Explanation:* Careful matrix multiplication. Dimensions: $(3 \times 3) \cdot (3 \times 3) = (3 \times 3)$.

3.  **Calculate $X^T y$:**
    $$ X^T y = \begin{pmatrix} 1 & 1 & 1 \\ 1 & 2 & 3 \\ 2 & 1 & 3 \end{pmatrix} \begin{pmatrix} 5 \\ 4 \\ 9 \end{pmatrix} $$
    $$ X^T y = \begin{pmatrix} (1 \cdot 5) + (1 \cdot 4) + (1 \cdot 9) \\ (1 \cdot 5) + (2 \cdot 4) + (3 \cdot 9) \\ (2 \cdot 5) + (1 \cdot 4) + (3 \cdot 9) \end{pmatrix} $$
    $$ X^T y = \begin{pmatrix} 5+4+9 \\ 5+8+27 \\ 10+4+27 \end{pmatrix} = \begin{pmatrix} 18 \\ 40 \\ 41 \end{pmatrix} $$
    *   *Explanation:* Dimensions: $(3 \times 3) \cdot (3 \times 1) = (3 \times 1)$.

4.  **Calculate $(X^T X)^{-1}$:**
    This is a $3 \times 3$ matrix inverse, which is more involved. We'll use a computational tool or a formula for $3 \times 3$ inverse.
    Determinant of $X^T X$: $3(14 \cdot 14 - 13 \cdot 13) - 6(6 \cdot 14 - 13 \cdot 6) + 6(6 \cdot 13 - 14 \cdot 6)$
    $= 3(196 - 169) - 6(84 - 78) + 6(78 - 84)$
    $= 3(27) - 6(6) + 6(-6)$
    $= 81 - 36 - 36 = 9$.
    Since the determinant is non-zero, the inverse exists.
    Using a calculator or software (e.g., NumPy in Python):
    $$ (X^T X)^{-1} = \frac{1}{9} \begin{pmatrix} 27 & -12 & -6 \\ -12 & 6 & 3 \\ -6 & 3 & 6 \end{pmatrix} = \begin{pmatrix} 3 & -4/3 & -2/3 \\ -4/3 & 2/3 & 1/3 \\ -2/3 & 1/3 & 2/3 \end{pmatrix} $$
    *   *Explanation:* For larger matrices, manual inversion is tedious and error-prone. In practice, you'd use a linear algebra library.

5.  **Calculate $\theta = (X^T X)^{-1} X^T y$:**
    $$ \theta = \begin{pmatrix} 3 & -4/3 & -2/3 \\ -4/3 & 2/3 & 1/3 \\ -2/3 & 1/3 & 2/3 \end{pmatrix} \begin{pmatrix} 18 \\ 40 \\ 41 \end{pmatrix} $$
    $$ \theta_0 = (3 \cdot 18) + (-\frac{4}{3} \cdot 40) + (-\frac{2}{3} \cdot 41) = 54 - \frac{160}{3} - \frac{82}{3} = 54 - \frac{242}{3} = \frac{162-242}{3} = -\frac{80}{3} $$
    $$ \theta_1 = (-\frac{4}{3} \cdot 18) + (\frac{2}{3} \cdot 40) + (\frac{1}{3} \cdot 41) = -24 + \frac{80}{3} + \frac{41}{3} = -24 + \frac{121}{3} = \frac{-72+121}{3} = \frac{49}{3} $$
    $$ \theta_2 = (-\frac{2}{3} \cdot 18) + (\frac{1}{3} \cdot 40) + (\frac{2}{3} \cdot 41) = -12 + \frac{40}{3} + \frac{82}{3} = -12 + \frac{122}{3} = \frac{-36+122}{3} = \frac{86}{3} $$
    $$ \theta = \begin{pmatrix} -80/3 \\ 49/3 \\ 86/3 \end{pmatrix} \approx \begin{pmatrix} -26.67 \\ 16.33 \\ 28.67 \end{pmatrix} $$
    *   *Explanation:* Perform the final matrix-vector multiplication.

**Final Answer:**
The parameters are $\theta_0 = -80/3$, $\theta_1 = 49/3$, and $\theta_2 = 86/3$.
Thus, the equation of the plane is $\boxed{h_\theta(x) = -\frac{80}{3} + \frac{49}{3} x_1 + \frac{86}{3} x_2}$.

**Reflection:** This example demonstrates the application of the Normal Equation to multivariate regression. The main challenge is the increased complexity of matrix operations, especially matrix inversion. For larger numbers of features, this becomes computationally prohibitive without specialized linear algebra libraries.

---

### Example 3 (Medium-Hard): One Step of Gradient Descent

**Problem:** Given a single data point $(x, y) = (2, 6)$, and an initial guess for the parameters $\theta_0 = 0$, $\theta_1 = 0$. Use a learning rate $\alpha = 0.01$ to perform one step of gradient descent for simple linear regression $h_\theta(x) = \theta_0 + \theta_1 x$.

**Given:**
*   Data point: $(x^{(1)}, y^{(1)}) = (2, 6)$ (so $m=1$)
*   Initial parameters: $\theta_0 = 0$, $\theta_1 = 0$
*   Learning rate: $\alpha = 0.01$
*   Model: $h_\theta(x) = \theta_0 + \theta_1 x$

**What we want:** The updated values of $\theta_0$ and $\theta_1$ after one iteration.

**Solution:**
We use the gradient descent update rules derived earlier:
$$ \theta_0 := \theta_0 - \alpha \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)}) x_0^{(i)} $$
$$ \theta_1 := \theta_1 - \alpha \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)}) x_1^{(i)} $$
In our case, $m=1$ and $x_0^{(1)}=1$, $x_1^{(1)}=x^{(1)}=2$.

1.  **Calculate initial hypothesis $h_\theta(x^{(1)})$:**
    With current $\theta_0 = 0$ and $\theta_1 = 0$:
    $$ h_\theta(x^{(1)}) = \theta_0 + \theta_1 x^{(1)} = 0 + 0 \cdot 2 = 0 $$
    *   *Explanation:* This is our model's prediction for the given $x$ value, before any updates.

2.  **Calculate the error term $(h_\theta(x^{(1)}) - y^{(1)})$:**
    $$ \text{Error} = h_\theta(x^{(1)}) - y^{(1)} = 0 - 6 = -6 $$
    *   *Explanation:* This is how far off our prediction is from the actual value.

3.  **Calculate the partial derivative for $\theta_0$:**
    $$ \frac{\partial}{\partial \theta_0} J(\theta) = \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)}) x_0^{(i)} $$
    For $m=1$ and $x_0^{(1)}=1$:
    $$ \frac{\partial}{\partial \theta_0} J(\theta) = \frac{1}{1} (-6) \cdot 1 = -6 $$
    *   *Explanation:* This is the gradient (slope) of the cost function with respect to $\theta_0$. A negative slope means we need to increase $\theta_0$ to go downhill.

4.  **Calculate the partial derivative for $\theta_1$: **
    $$ \frac{\partial}{\partial \theta_1} J(\theta) = \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)}) x_1^{(i)} $$
    For $m=1$ and $x_1^{(1)}=2$:
    $$ \frac{\partial}{\partial \theta_1} J(\theta) = \frac{1}{1} (-6) \cdot 2 = -12 $$
    *   *Explanation:* This is the gradient with respect to $\theta_1$. A negative slope means we need to increase $\theta_1$.

5.  **Update $\theta_0$:**
    $$ \theta_0 := \theta_0 - \alpha \left( \frac{\partial}{\partial \theta_0} J(\theta) \right) $$
    $$ \theta_0 := 0 - 0.01 \cdot (-6) $$
    $$ \theta_0 := 0 + 0.06 = 0.06 $$
    *   *Explanation:* We take a step in the opposite direction of the gradient, scaled by the learning rate.

6.  **Update $\theta_1$:**
    $$ \theta_1 := \theta_1 - \alpha \left( \frac{\partial}{\partial \theta_1} J(\theta) \right) $$
    $$ \theta_1 := 0 - 0.01 \cdot (-12) $$
    $$ \theta_1 := 0 + 0.12 = 0.12 $$
    *   *Explanation:* Same update rule for $\theta_1$.

**Final Answer:**
After one step of gradient descent, the new parameters are $\boxed{\theta_0 = 0.06, \theta_1 = 0.12}$.

**Reflection:** This example shows the mechanics of a single gradient descent step. Notice that both $\theta_0$ and $\theta_1$ increased because the initial line ($y=0$) was predicting values much lower than the actual $y=6$, so the model needs to shift upwards. Performing many such steps would eventually lead to the optimal line.

---

### Example 4 (Hard): Conceptual Comparison & Feature Scaling for Gradient Descent

**Problem:** You have a dataset with $m=10,000$ training examples and $n=5$ features: `house_size` (ranging from 500 to 5000 sq ft), `num_bedrooms` (1 to 6), `age` (0 to 100 years), `zip_code` (e.g., 90210 to 90212, treated as a numerical feature for simplicity), and `distance_to_city_center` (1 to 50 miles).
Discuss the advantages and disadvantages of using the Normal Equation vs. Gradient Descent for this problem.
Additionally, explain how you would apply feature scaling to this dataset for gradient descent, using mean normalization and standardization.

**Given:**
*   $m=10,000$ training examples.
*   $n=5$ features with diverse ranges.

**What we want:**
1.  Comparison of Normal Equation vs. Gradient Descent for this scenario.
2.  Detailed steps for feature scaling using mean normalization and standardization.

**Solution:**

**Part 1: Comparison of Normal Equation vs. Gradient Descent**

*   **Normal Equation: $\theta = (X^T X)^{-1} X^T y$**
    *   **Advantages:**
        *   **No learning rate ($\alpha$) tuning:** You don't need to choose a learning rate, which can be tricky for gradient descent.
        *   **Direct solution:** It gives the exact optimal $\theta$ in one step (assuming $X^T X$ is invertible). No need for iterations.
    *   **Disadvantages:**
        *   **Computational Cost:** The primary bottleneck is computing $(X^T X)^{-1}$. For $n$ features, $X^T X$ is an $(n+1) \times (n+1)$ matrix. Matrix inversion generally has a complexity of $O((n+1)^3)$. In this case, $n=5$, so $(n+1)=6$. Computing a $6 \times 6$ matrix inverse is very fast. However, if $n$ were, say, $1000$, then $O(1000^3) = 10^9$ operations, which is prohibitively slow.
        *   **Non-invertibility:** If $X^T X$ is singular (e.g., due to linearly dependent features or $m < n+1$), the inverse doesn't exist, and the normal equation cannot be used directly. For $m=10,000$ and $n=5$, $m \gg n+1$, so this is unlikely to be an issue unless features are perfectly correlated.
    *   **Conclusion for this problem ($n=5$):** For $n=5$ features, the Normal Equation is likely the preferred method. The computational cost of inverting a $6 \times 6$ matrix is negligible, and it provides an exact solution without the hassle of tuning $\alpha$.

*   **Gradient Descent: $\theta_j := \theta_j - \alpha \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)}) x_j^{(i)}$**
    *   **Advantages:**
        *   **Scales well to many features:** Each iteration involves matrix-vector multiplications, which typically have a complexity of $O(n^2)$ or $O(mn)$ depending on the specific implementation (batch gradient descent). For very large $n$, it's much faster than matrix inversion.
        *   **Applicable when $X^T X$ is not invertible:** It doesn't require matrix inversion.
    *   **Disadvantages:**
        *   **Requires choosing learning rate ($\alpha$):** A good $\alpha$ is crucial for efficient convergence. Too large, it diverges; too small, it's very slow.
        *   **Requires many iterations:** It's an iterative algorithm, so it takes many steps to converge to the minimum.
        *   **Requires feature scaling:** As discussed in Step 6, features with different scales will cause the cost function contours to be elongated, slowing down convergence significantly.
    *   **Conclusion for this problem ($m=10,000, n=5$):** While feasible, Gradient Descent would require careful tuning of $\alpha$ and crucially, **feature scaling** for efficient convergence. Given $n=5$, it's likely overkill and less efficient than the Normal Equation for this specific problem size. However, if $n$ were much larger (e.g., $n=1000$), gradient descent would be the only practical choice.

**Part 2: Feature Scaling for Gradient Descent**

Given the features:
*   `house_size`: 500 to 5000 sq ft
*   `num_bedrooms`: 1 to 6
*   `age`: 0 to 100 years
*   `zip_code`: e.g., 90210 to 90212 (let's assume these are actual numerical values and not categorical labels for this problem)
*   `distance_to_city_center`: 1 to 50 miles

We will use mean normalization and standardization: $x'_j = \frac{x_j - \mu_j}{\sigma_j}$.

**Steps:**

1.  **Calculate Mean ($\mu_j$) for each feature:**
    *   Go through all $m=10,000$ training examples.
    *   For `house_size`, sum all 10,000 values and divide by 10,000 to get $\mu_{\text{size}}$.
    *   Do the same for `num_bedrooms` to get $\mu_{\text{bedrooms}}$.
    *   Do the same for `age` to get $\mu_{\text{age}}$.
    *   Do the same for `zip_code` to get $\mu_{\text{zip}}$.
    *   Do the same for `distance_to_city_center` to get $\mu_{\text{distance}}$.
    *   *Example (hypothetical):* $\mu_{\text{size}} = 2000$, $\mu_{\text{bedrooms}} = 3$, $\mu_{\text{age}} = 30$, $\mu_{\text{zip}} = 90211$, $\mu_{\text{distance}} = 15$.
    *   *Explanation:* The mean centers the data around zero.

2.  **Calculate Standard Deviation ($\sigma_j$) for each feature:**
    *   For each feature, use the formula $\sigma_j = \sqrt{\frac{1}{m} \sum_{i=1}^m (x_j^{(i)} - \mu_j)^2}$.
    *   Calculate $\sigma_{\text{size}}$, $\sigma_{\text{bedrooms}}$, $\sigma_{\text{age}}$, $\sigma_{\text{zip}}$, $\sigma_{\text{distance}}$.
    *   *Example (hypothetical):* $\sigma_{\text{size}} = 750$, $\sigma_{\text{bedrooms}} = 1.2$, $\sigma_{\text{age}} = 20$, $\sigma_{\text{zip}} = 0.8$, $\sigma_{\text{distance}} = 10$.
    *   *Explanation:* The standard deviation scales the data, so most values fall within a few standard deviations of the mean.

3.  **Apply Scaling to each feature value:**
    *   For every training example $i$ and every feature $j$:
        $$ x_j^{(i)'} = \frac{x_j^{(i)} - \mu_j}{\sigma_j} $$
    *   **Example for a single house:**
        *   Original house: `house_size` = 2500, `num_bedrooms` = 4, `age` = 10, `zip_code` = 90210, `distance_to_city_center` = 5.
        *   Scaled `house_size`: $(2500 - 2000) / 750 = 500 / 750 \approx 0.67$
        *   Scaled `num_bedrooms`: $(4 - 3) / 1.2 = 1 / 1.2 \approx 0.83$
        *   Scaled `age`: $(10 - 30) / 20 = -20 / 20 = -1.0$
        *   Scaled `zip_code`: $(90210 - 90211) / 0.8 = -1 / 0.8 = -1.25$
        *   Scaled `distance_to_city_center`: $(5 - 15) / 10 = -10 / 10 = -1.0$
    *   *Explanation:* After scaling, all features will have roughly similar ranges (most values between -3 and 3), centered around 0. This makes the cost function contours more spherical, allowing gradient descent to converge much faster.

**Final Answer:**
For this problem, the **Normal Equation is generally preferred** due to the relatively small number of features ($n=5$), which makes matrix inversion computationally cheap and avoids the need for hyperparameter tuning. If Gradient Descent were chosen, **feature scaling is critical** and would involve calculating the mean and standard deviation for each feature across the entire training set, then applying the transformation $x'_j = (x_j - \mu_j) / \sigma_j$ to all feature values.

**Reflection:** This example highlights the practical considerations when choosing between optimization algorithms and the importance of data preprocessing steps like feature scaling for iterative methods like gradient descent. The "hard" aspect comes from the conceptual understanding of tradeoffs and the meticulous application of scaling.

## 6. Common mistakes and traps

1.  **Forgetting the intercept term ($\theta_0$ or $x_0=1$):** Many students forget to add the column of ones to the design matrix $X$ for the intercept term. This means the model will be forced to pass through the origin $(0,0)$, which is usually not what you want.
2.  **Not performing feature scaling for Gradient Descent:** This is a very common pitfall. If features have vastly different ranges, gradient descent will converge very slowly or oscillate, and you might mistakenly conclude that a good learning rate doesn't exist.
3.  **Incorrectly updating parameters in Gradient Descent (not simultaneous):** Gradient descent requires all $\theta_j$ to be updated using the *old* values of $\theta_j$ from the previous iteration. If you update $\theta_0$, then use that new $\theta_0$ to calculate the update for $\theta_1$ within the same iteration, it's not proper batch gradient descent and can lead to incorrect convergence or divergence.
4.  **Misinterpreting $X^T X$ non-invertibility:** When $X^T X$ is singular, it means there's a redundancy in your features (e.g., perfect multicollinearity) or you have more features than data points. Students might just give up, but it's a signal to address feature engineering or use alternative methods (like pseudo-inverse or gradient descent).
5.  **Using the wrong cost function or derivative:** While squared error is standard for linear regression, using other error metrics (e.g., absolute error) requires different derivatives and can change the convexity properties, making optimization harder.
6.  **Confusing training error with generalization error:** A model that fits the training data perfectly might not perform well on unseen data (overfitting). Linear regression is less prone to severe overfitting than more complex models, but it's a general machine learning trap.

## 7. Textbook-precise explanation

Linear regression is a supervised learning algorithm that models the linear relationship between a dependent variable $y$ and one or more independent variables $x$.

Given a training set of $m$ examples, $\{(x^{(1)}, y^{(1)}), \dots, (x^{(m)}, y^{(m)}) \}$, where each $x^{(i)}$ is an $n$-dimensional feature vector $x^{(i)} \in \mathbb{R}^n$ and $y^{(i)} \in \mathbb{R}$ is the target variable. To account for an intercept term, we augment each feature vector $x^{(i)}$ with a dummy feature $x_0^{(i)}=1$, making $x^{(i)} \in \mathbb{R}^{n+1}$.

The **hypothesis function** $h_\theta(x)$ is defined as a linear combination of the features:
$$ h_\theta(x) = \theta_0 x_0 + \theta_1 x_1 + \dots + \theta_n x_n = \theta^T x $$
where $\theta = [\theta_0, \theta_1, \dots, \theta_n]^T$ is the vector of model parameters.

The objective is to find the parameters $\theta$ that minimize the **cost function**, which is typically the Mean Squared Error (MSE) divided by 2:
$$ J(\theta) = \frac{1}{2m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})^2 $$
This cost function is a convex quadratic function, ensuring a unique global minimum.

There are two primary methods to find the optimal $\theta$:

**A. Normal Equation (Analytical Solution)**
The Normal Equation provides a closed-form solution for $\theta$. We construct the design matrix $X$ of size $m \times (n+1)$, where each row $i$ is $(x^{(i)})^T$. The target values are assembled into a vector $y \in \mathbb{R}^m$.
The cost function can be expressed in matrix form as:
$$ J(\theta) = \frac{1}{2m} (X\theta - y)^T (X\theta - y) $$
To find the minimum, we take the gradient of $J(\theta)$ with respect to $\theta$ and set it to the zero vector:
$$ \nabla_\theta J(\theta) = \frac{1}{m} (X^T X \theta - X^T y) = 0 $$
Solving for $\theta$ yields the **Normal Equation**:
$$ \theta = (X^T X)^{-1} X^T y $$
This solution exists if the matrix $X^T X$ is invertible (i.e., non-singular). If $X^T X$ is singular, it implies linear dependencies among features, and a pseudo-inverse (Moore-Penrose inverse) can be used, or one can resort to iterative methods like gradient descent.
*   **Reference:** Andrew Ng, CS229 Lecture Notes, Stanford University. (Often referred to as the standard resource for this derivation). Also, Hastie, Tibshirani, Friedman, *The Elements of Statistical Learning*, Chapter 3.

**B. Gradient Descent (Iterative Solution)**
Gradient descent is an iterative optimization algorithm that starts with an initial guess for $\theta$ and repeatedly updates $\theta$ in the direction opposite to the gradient of the cost function.
The update rule for each parameter $\theta_j$ is:
$$ \theta_j := \theta_j - \alpha \frac{\partial}{\partial \theta_j} J(\theta) $$
where $\alpha > 0$ is the learning rate.
The partial derivative of $J(\theta)$ with respect to $\theta_j$ is:
$$ \frac{\partial}{\partial \theta_j} J(\theta) = \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)}) x_j^{(i)} $$
Substituting this into the update rule, we get the **batch gradient descent update**:
$$ \theta_j := \theta_j - \alpha \frac{1}{m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)}) x_j^{(i)} \quad \text{(for } j = 0, \dots, n \text{)} $$
All $\theta_j$ values must be updated simultaneously in each iteration.
For efficient convergence of gradient descent, **feature scaling** is often applied, typically by normalizing features to have zero mean and unit variance ($x'_j = (x_j - \mu_j) / \sigma_j$).
*   **Reference:** Goodfellow, Bengio, Courville, *Deep Learning*, Chapter 4 (for optimization algorithms). Also, Andrew Ng, CS229 Lecture Notes.

## 8. ASCII diagrams

```text
                  ^ y
                  |
                8 +       . (x3,y3)
                  |
                6 +     . (x2,y2)
                  |
                4 +   . (x1,y1)
                  |
                2 +
                  |
        ----------+-----------------> x
                  0 1   2   3   4

  Figure 1: Data points and a potential linear regression line.
            The line aims to minimize the vertical distance (error)
            between itself and each data point.
            The 'best fit' line would pass closely through (x1,y1), (x2,y2), (x3,y3).
            (x1,y1) = (1,4)
            (x2,y2) = (2,6)
            (x3,y3) = (3,8)
            A perfect fit here would be y = 2 + 2x.


                  ^ J(theta) (Cost Function Value)
                  |
                / | \
               /  |  \
              /   |   \
             /    |    \
            /     |     \
           /      |      \
          /       |       \
         /        |        \
        /         |         \
       /----------+----------\
      /           |           \
     /            |            \
    /             |             \