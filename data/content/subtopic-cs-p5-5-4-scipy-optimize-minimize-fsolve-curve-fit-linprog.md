## What it is
`scipy.optimize` is a powerful Python library for finding solutions to mathematical problems that involve searching for the "best" input. It provides high-level algorithms for minimizing or maximizing functions (optimization), finding where functions are equal to zero (root-finding), and fitting models to data (curve fitting). It is the numerical workhorse for problems that lack a clean, analytical solution.

## Why it matters
This toolkit is fundamental to nearly every quantitative field. In machine learning, training a model is equivalent to minimizing a "loss function" to find the best model parameters. In aerospace engineering, `scipy.optimize` is used for trajectory optimization—finding the most fuel-efficient path for a spacecraft subject to the laws of physics and constraints of the vehicle. In physics, it's used to find the minimum energy state of a system, which defines its equilibrium.

## When to study it
Before tackling `scipy.optimize`, you must be comfortable with the following. If not, master them first.
*   **Mathematics:** Multivariable Calculus, specifically the concepts of a function's gradient ($\nabla f$) and Hessian matrix. You must understand that the gradient points in the direction of steepest ascent.
*   **Linear Algebra:** Vector and matrix operations. Understanding of linear systems of equations ($A\mathbf{x} = \mathbf{b}$).
*   **Programming:** Strong Python fundamentals, including defining functions (especially with `lambda`), and proficiency with NumPy for creating and manipulating arrays.

## How to study it (step by step)
1.  **Root-Finding with `fsolve`:** Start with the simplest case. Define a 1D function, e.g., $f(x) = \cos(x) - x$. Analytically, you cannot solve $x = \cos(x)$. Use `fsolve` with an initial guess to find the numerical root. See how different initial guesses can lead to the same root if the function is simple.
2.  **Minimization with `minimize` (1D):** Define a simple parabola, $f(x) = (x-3)^2 + 1$. Use `minimize` to find the value of $x$ that gives the lowest value of $f(x)$. Visualize the algorithm as a ball rolling down the curve to settle at the bottom.
3.  **Minimization with `minimize` (2D):** Now, use a 2D function like the Rosenbrock function, $f(x, y) = (1-x)^2 + 100(y-x^2)^2$. This is a classic hard test for optimizers. Provide an initial guess `x0 = [0, 0]` and see how the algorithm navigates a challenging, banana-shaped valley to find the minimum at `[1, 1]`. This builds intuition for higher-dimensional problems.
4.  **Curve Fitting with `curve_fit`:** Generate synthetic data. For example, create a set of `x` values, calculate `y` using $y = A \sin(\omega x + \phi)$, and add random noise from `numpy.random`. Use `curve_fit` to recover the parameters $A$, $\omega$, and $\phi$ from the noisy data. This directly connects optimization to experimental science.
5.  **Linear Programming with `linprog`:** Formulate a simple resource allocation problem. For example: maximize profit $P = 5x + 3y$ subject to constraints like $x+y \le 10$ and $2x+0.5y \le 12$. Learn how to translate these inequalities into the matrix format required by `linprog` and how to handle maximization by minimizing the negative of the objective function.

## Key ideas, with intuition
1.  **Optimization is Finding the Bottom of a Valley.** For `minimize`, imagine your function $f(\mathbf{x})$ is a landscape. The algorithm starts at an initial guess $\mathbf{x}_0$ and looks for the direction of steepest descent. This direction is the negative gradient, $-\nabla f(\mathbf{x})$. It then takes a step in that direction and repeats, iteratively walking "downhill" until it can't go any lower (i.e., the gradient is close to zero).
    $$ \mathbf{x}_{k+1} = \mathbf{x}_k - \gamma \nabla f(\mathbf{x}_k) $$
    where $\gamma$ is the step size (learning rate).

2.  **Root-Finding is Finding Where a Path Crosses Sea Level.** For `fsolve`, imagine the function's graph is a path. You want to find where it crosses the horizontal axis ($y=0$). `fsolve` often uses Newton's method: at your current guess $x_k$, you approximate the function with its tangent line. You then find where this simple line crosses the axis, and that becomes your next, better guess, $x_{k+1}$.
    $$ x_{k+1} = x_k - \frac{f(x_k)}{f'(x_k)} $$

3.  **Curve Fitting is Minimizing the Error.** `curve_fit` is a specialized form of `minimize`. You have data points $(x_i, y_i)$ and a model function $g(x; \mathbf{p})$ with parameters $\mathbf{p}$. The goal is to find the parameters $\mathbf{p}$ that make the model's predictions as close as possible to the data. "Closeness" is measured by the sum of squared residuals (the vertical distances between the data points and the curve).
    $$ \text{Minimize } S(\mathbf{p}) = \sum_{i=1}^{N} [y_i - g(x_i; \mathbf{p})]^2 $$

4.  **Linear Programming is Finding the Best Corner of a Fenced-in Area.** `linprog` handles a special, constrained case. The objective function is linear, and the constraints are linear inequalities. These constraints define a multi-dimensional polygon (a polytope). A key theorem of linear programming states that the optimal solution must lie at one of the vertices ("corners") of this feasible region. `linprog` uses algorithms like the Simplex method to efficiently search these vertices.

## Worked example
Let's use `curve_fit` to find the parameters of a decaying exponential signal in noise, a common task in physics and engineering.

**Problem:** We have measured data that we believe follows the model $f(t) = A e^{-\lambda t}$. Find the initial amplitude $A$ and the decay constant $\lambda$.

**Step 1: Generate synthetic data (in a real scenario, this would be experimental data).**
We'll assume the true parameters are $A=5.0$ and $\lambda=1.5$.

```python
import numpy as np
from scipy.optimize import curve_fit
import matplotlib.pyplot as plt

# Define the model function
def model_func(t, A, lambda_):
    return A * np.exp(-lambda_ * t)

# True parameters
A_true = 5.0
lambda_true = 1.5

# Generate clean data
t_data = np.linspace(0, 4, 50)
y_clean = model_func(t_data, A_true, lambda_true)

# Add some noise to simulate a real measurement
noise = 0.5 * np.random.normal(size=t_data.size)
y_data = y_clean + noise
```

**Step 2: Use `curve_fit` to find the best-fit parameters.**
`curve_fit` takes the model function, the x-data, and the y-data as primary inputs. It returns the optimal parameters (`popt`) and the estimated covariance of the parameters (`pcov`).

```python
# The first argument of the model function, t, is the independent variable.
# The following arguments, A and lambda_, are the parameters to be fitted.
popt, pcov = curve_fit(model_func, t_data, y_data)

# Print the results
print(f"Fitted parameters: A = {popt[0]:.3f}, lambda = {popt[1]:.3f}")
# Expected output will be close to: A = 5.0, lambda = 1.5
```

**Step 3: Analyze and visualize the result.**
The `popt` array contains our best-fit values for $A$ and $\lambda$. We can plot the original data and our fitted curve to see how well we did.

```python
plt.figure()
plt.scatter(t_data, y_data, label='Noisy Data')
plt.plot(t_data, model_func(t_data, *popt), color='red', label='Fitted Curve')
plt.title('Curve Fitting Example')
plt.xlabel('Time (t)')
plt.ylabel('Amplitude')
plt.legend()
plt.grid(True)
plt.show()
```

**Reflection:**
*   Step 1 created a realistic scenario. Without this, we wouldn't have data to fit.
*   Step 2 is the core of the solution. We passed our model's structure (`model_func`) and our data (`t_data`, `y_data`) to the `curve_fit` solver. Internally, `curve_fit` set up a least-squares minimization problem and solved for the `popt` that minimized the sum of squared differences between `y_data` and the curve.
*   Step 3 is crucial for validation. A visual check confirms that the parameters found by the algorithm produce a curve that accurately represents the trend in the noisy data.

## Diagrams
Here is a diagram illustrating how `minimize` finds the minimum of a 1D function $f(x)$.

```text
       f(x)
        ^
        |
   x0   | *
        |  \
        |   \
        |    * x1
        |     \
        |      \
        |       * x2
        |        \
        |         \
        |----------*-- > x
                  x_min

* x0: Initial guess. Gradient is steep and negative.
* -->: Algorithm takes a step in the direction of -f'(x).
* x1: New point. Gradient is less steep, but still negative.
* -->: Algorithm takes another, smaller step.
* x2: Getting closer.
* x_min: Minimum, where f'(x) = 0. The algorithm stops here.
```

Here is a diagram illustrating the goal of `curve_fit`.

```text
      y
      ^
      |
      |   *
      |       /
      |      /
      |     /  <-- The fitted curve, g(x, p)
      |    *
      |   /|
      |  / | <-- Residual (error) for one point
      | /  *
      |/
      *------------> x

* The '*' are the noisy data points (x_i, y_i).
* The solid line is the model function g(x, p) with the best-fit parameters p.
* `curve_fit` works by adjusting the shape of the curve (by changing p) to make the sum of the squares of all the vertical residual lines as small as possible.
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**M**y **F**unny **C**at **L**oves Python"
    *   **M**inimize: Finds the **M**inimum (lowest point).
    *   **F**solve: **F**inds where $f(x)=0$.
    *   **C**urve_fit: Fits a **C**urve to data.
    *   **L**inprog: **L**inear programming with constraints.

2.  **Must-Overlearn Formulas/Signatures:**
    *   `result = scipy.optimize.minimize(fun, x0)`
    *   `popt, pcov = scipy.optimize.curve_fit(f, xdata, ydata)`
    *   The core concept: All these functions solve for an input $\mathbf{x}$ that satisfies a condition on a function $f(\mathbf{x})$. For `minimize`, the condition is $\nabla f(\mathbf{x}) = \mathbf{0}$. For `fsolve`, it's $f(\mathbf{x}) = \mathbf{0}$. For `curve_fit`, it's minimizing $\sum(f(x_i) - y_i)^2$.

3.  **Spaced Repetition Schedule:**
    *   Review this material and re-run the worked example in **1 day**.
    *   Solve a new, simple problem with each of the four functions in **3 days**.
    *   Re-read the "Key Ideas" section in **7 days**.
    *   Explain the difference between `minimize` and `curve_fit` to a wall or a friend in **16 days**.
    *   Solve a complex, multi-part problem using at least two of these functions in **35 days**.

4.  **First Principles Pathway:**
    If you forget the exact syntax, remember what you're trying to do.
    *   **For `minimize`:** You are trying to find where the function's slope is zero. The most basic way is Gradient Descent: start somewhere, calculate the slope, and take a small step downhill. Repeat. $x_{new} = x_{old} - \gamma \nabla f(x_{old})$.
    *   **For `curve_fit`:** You are trying to make a model match data. This means you need a function that calculates the total error (like sum of squared differences) between your model's predictions and the real data. Then, you can use a general-purpose minimizer on that error function to find the best model parameters. `curve_fit` is just a convenient wrapper for this common task.

## Common mistakes
1.  **Bad Initial Guess (`x0`):** Providing an initial guess that is too far from the actual solution can cause the optimizer to get stuck in a *local minimum* (a small dip that isn't the lowest overall point) or fail to find a solution at all.
2.  **Maximizing with `linprog`:** `linprog` is a minimizer. To maximize an objective function (e.g., profit $c^T x$), you must give `linprog` the *negative* of the coefficients, as minimizing $-c^T x$ is equivalent to maximizing $c^T x$.
3.  **Incorrect `curve_fit` Function Signature:** The model function passed to `curve_fit` *must* have the independent variable (e.g., `x` or `t`) as its first argument, followed by the parameters you want to fit. `def my_func(A, B, x): ...` is wrong. `def my_func(x, A, B): ...` is correct.
4.  **Ignoring Constraints/Bounds:** For `minimize`, if your parameters have physical limits (e.g., a mass must be positive), but you don't provide these via the `bounds` argument, the solver might return a nonsensical negative mass.

## Self-check
1.  **Easy:** Find the root of the function $f(x) = e^x - 5x$ that lies between $x=0$ and $x=1$. What initial guess should you provide to `fsolve`?
2.  **Medium:** You are given a set of data points `(x, y)`. You hypothesize they follow the quadratic model $y = ax^2 + bx + c$. Write a Python script using `curve_fit` to determine the optimal values for the coefficients $a, b, c$.
3.  **Hard:** A company manufactures two types of rocket engines, "Pulsar" and "Quasar".
    *   Pulsar: Profit of $12k per unit. Requires 200 hours of engineering and 300 hours of assembly.
    *   Quasar: Profit of $15k per unit. Requires 400 hours of engineering and 250 hours of assembly.
    *   You have a total of 30,000 engineering hours and 40,000 assembly hours available for the next production cycle.
    *   Set up and solve this problem using `scipy.optimize.linprog` to determine how many of each engine to build to maximize profit.