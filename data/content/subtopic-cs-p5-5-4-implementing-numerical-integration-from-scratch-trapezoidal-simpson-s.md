## What it is
Numerical integration, or quadrature, is a method for approximating the value of a definite integral $ \int_a^b f(x) \, dx $. We use it when the antiderivative of $f(x)$ is impossible or impractical to find analytically. The core idea is to replace the complex area under the curve $f(x)$ with a sum of areas of simpler geometric shapes, like trapezoids or parabolas.

## Why it matters
This is a cornerstone of computational science and engineering. In rocket science, you'll integrate a time-varying thrust curve from engine test data to find the total impulse delivered. In physics, you'll integrate force over distance to find work, or a probability density function to find the likelihood of a particle being in a certain region. In machine learning, you might integrate to find the area under a ROC curve or to normalize a probability distribution.

## When to study it
You must be comfortable with the following before proceeding:
1.  **Calculus I:** A solid understanding of the definite integral $ \int_a^b f(x) \, dx $ as the "area under a curve."
2.  **Basic Python:** You need to write functions, use `for` loops, and handle lists or, preferably, NumPy arrays.
3.  **Coordinate Geometry:** Understand how to find the area of a trapezoid and the equation of a line passing through two points.

If you are not confident with the geometric meaning of the definite integral, pause and review that concept first. All numerical methods are built upon this intuition.

## How to study it (step by step)
1.  **Derive the single-panel trapezoidal rule.** On a small interval $[x_i, x_{i+1}]$, approximate $f(x)$ with a straight line connecting $(x_i, f(x_i))$ and $(x_{i+1}, f(x_{i+1}))$. Derive the formula for the area of this single trapezoid.
2.  **Generalize to the composite trapezoidal rule.** Sum the areas of $N$ such trapezoids over the full interval $[a, b]$. Pay close attention to how the interior points are counted twice.
3.  **Implement the composite trapezoidal rule in Python.** Write a function `trapezoid(f, a, b, N)` that takes a function `f`, integration limits `a` and `b`, and the number of intervals `N`. Test it on an easy integral like $\int_0^1 x^2 \, dx$.
4.  **Understand the need for a better approximation.** Notice that the trapezoidal rule performs poorly if the function is highly curved. This motivates using a shape that can curve: a parabola.
5.  **Derive the single-panel Simpson's 1/3 rule.** Approximate $f(x)$ over a wider interval $[x_i, x_{i+2}]$ using a unique parabola that passes through the three points $(x_i, f(x_i))$, $(x_{i+1}, f(x_{i+1}))$, and $(x_{i+2}, f(x_{i+2}))$. Integrate this quadratic polynomial exactly.
6.  **Generalize to the composite Simpson's rule.** Sum the areas under these parabolic segments over the full interval $[a, b]$. Note the pattern of weights: $1, 4, 2, 4, ..., 2, 4, 1$.
7.  **Implement and compare.** Write a function `simpson(f, a, b, N)` (where `N` must be even). Use both of your functions to approximate $\int_0^\pi \sin(x) \, dx = 2$ and observe how much more accurate Simpson's rule is for the same number of function evaluations.

## Key ideas, with intuition
1.  **Discretize and Approximate.** We cannot evaluate $f(x)$ everywhere. Instead, we sample it at a finite number of points $x_0, x_1, \dots, x_N$. Between these points, we approximate the true function $f(x)$ with a simpler function (a polynomial) that is easy to integrate.

2.  **The Trapezoidal Rule: Linear Approximation.** We connect adjacent points $(x_i, f(x_i))$ and $(x_{i+1}, f(x_{i+1}))$ with a straight line. The area under this line segment is a trapezoid.
    $$
    \text{Area}_i = \frac{1}{2} (f(x_i) + f(x_{i+1})) \cdot h
    $$
    where $h = x_{i+1} - x_i$ is the width of the interval. We sum these areas. This is equivalent to approximating the function with a piecewise linear function.

3.  **Simpson's Rule: Quadratic Approximation.** A straight line can't capture curvature. A parabola can. Simpson's rule takes *three* points—$(x_i, f(x_i))$, $(x_{i+1}, f(x_{i+1}))$, $(x_{i+2}, f(x_{i+2}))$—and fits a unique parabola through them. It then calculates the exact area under that parabola. This results in a much better approximation of the true area. The surprising result of this integration is:
    $$
    \text{Area}_{i, i+2} = \frac{h}{3} (f(x_i) + 4f(x_{i+1}) + f(x_{i+2}))
    $$
    The "magic" weights $(1, 4, 1)$ come directly from integrating the Lagrange interpolating polynomial of degree 2.

4.  **Composite Rules and Weighting.** To integrate over a large interval $[a, b]$, we sum the areas of these small panels. For the trapezoidal rule, every interior point is the right edge of one trapezoid and the left edge of another, so its value is counted twice. For Simpson's rule, a similar overlap leads to the characteristic $(1, 4, 2, 4, \dots, 4, 1)$ weighting pattern.

## Worked example
Let's approximate $I = \int_0^1 e^x \, dx$. The exact answer is $e^1 - e^0 = e - 1 \approx 1.71828$. We will use $N=4$ intervals.

**Setup:**
-   Function: $f(x) = e^x$
-   Interval: $[a, b] = [0, 1]$
-   Number of intervals: $N=4$
-   Step size: $h = (b-a)/N = (1-0)/4 = 0.25$
-   Evaluation points: $x_0=0, x_1=0.25, x_2=0.5, x_3=0.75, x_4=1.0$
-   Function values:
    -   $y_0 = f(0) = e^0 = 1$
    -   $y_1 = f(0.25) = e^{0.25} \approx 1.2840$
    -   $y_2 = f(0.5) = e^{0.5} \approx 1.6487$
    -   $y_3 = f(0.75) = e^{0.75} \approx 2.1170$
    -   $y_4 = f(1) = e^1 \approx 2.7183$

**1. Trapezoidal Rule Calculation:**
The formula is $I_T \approx \frac{h}{2} [y_0 + 2y_1 + 2y_2 + 2y_3 + y_4]$.
$$
I_T \approx \frac{0.25}{2} [1 + 2(1.2840) + 2(1.6487) + 2(2.1170) + 2.7183]
$$
$$
I_T \approx 0.125 [1 + 2.5680 + 3.2974 + 4.2340 + 2.7183]
$$
$$
I_T \approx 0.125 [13.8177] \approx 1.7272
$$
*Reflection:* This is straightforward. We applied the formula by summing the endpoints once and the interior points twice, then multiplied by the $h/2$ factor. The error is about $1.7272 - 1.71828 = 0.00892$.

**2. Simpson's Rule Calculation:**
The formula is $I_S \approx \frac{h}{3} [y_0 + 4y_1 + 2y_2 + 4y_3 + y_4]$.
$$
I_S \approx \frac{0.25}{3} [1 + 4(1.2840) + 2(1.6487) + 4(2.1170) + 2.7183]
$$
$$
I_S \approx \frac{0.25}{3} [1 + 5.1360 + 3.2974 + 8.4680 + 2.7183]
$$
$$
I_S \approx \frac{0.25}{3} [20.6197] \approx 1.71831
$$
*Reflection:* We applied the $(1, 4, 2, 4, 1)$ weights to the function values. Note that $N=4$ is an even number, as required. The error is about $1.71831 - 1.71828 = 0.00003$, which is drastically smaller than the trapezoidal rule's error for the same number of function evaluations. This demonstrates the power of using a higher-order approximation.

## Diagrams
Here is the intuition for the two methods.

**Trapezoidal Rule (Piecewise Linear Approximation):**
```text
      f(x)
        ^
        |
        |      /
        |     /
 f(x_i)_|----*
        |   /|\
        |  / | \
 f(x_0)_| *--|- \-----* f(x_2)
        |/   |  \   /|
        *----+---+--*--+-----> x
        a=x_0  x_1  x_2  b=x_3

The area is approximated by the sum of the areas of the three trapezoids.
The top "boundary" is made of straight line segments.
```

**Simpson's Rule (Piecewise Quadratic Approximation):**
```text
      f(x)
        ^
        |
        |      . . . Curve of f(x)
        |     /
        |    /
        |   /
        |  / . . . . . Parabolic Fit
 f(x_1)_| *
        |  \         /
 f(x_0)_|---*-------*--- f(x_2)
        |    \     /
        *-----+---+----*-----> x
        a=x_0  x_1   x_2

Over [x_0, x_2], we fit ONE parabola through the three points.
This single shape fits the curvature of f(x) much better than two trapezoids.
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you're paving a curved road. The **Trapezoid** method is a lazy worker who only uses straight boards of concrete. It leaves gaps and overlaps. **Simpson** is a master craftsman who creates custom-curved sections (parabolas) that fit the road's curve almost perfectly. Simpson's work is superior.

2.  **Formulas to Overlearn:** Let $h = (b-a)/N$.
    -   **Composite Trapezoidal Rule:**
        $$ \int_a^b f(x) dx \approx \frac{h}{2} \left[ f(x_0) + 2 \sum_{i=1}^{N-1} f(x_i) + f(x_N) \right] $$
    -   **Composite Simpson's Rule (N must be even):**
        $$ \int_a^b f(x) dx \approx \frac{h}{3} \left[ f(x_0) + 4 \sum_{i=1, \text{odd}}^{N-1} f(x_i) + 2 \sum_{i=2, \text{even}}^{N-2} f(x_i) + f(x_N) \right] $$
        (The pattern is easier to remember: $h/3 \times [y_0 + 4y_1 + 2y_2 + 4y_3 + \dots + 4y_{N-1} + y_N]$).

3.  **Spaced Repetition Schedule:** Review these formulas and their derivations at **1 day, 3 days, 7 days, 16 days, and 35 days**. Actively re-derive them from the single-panel case each time.

4.  **First Principles Pathway:** If you forget the composite formulas, rebuild them.
    -   **Trapezoid:** The area of one trapezoid is its average height times its width: $\frac{f(x_i) + f(x_{i+1})}{2} \cdot h$. Sum these from $i=0$ to $N-1$. Notice that all terms $f(x_1), \dots, f(x_{N-1})$ appear in two adjacent trapezoids, so they get a coefficient of 2. The endpoints $f(x_0)$ and $f(x_N)$ appear only once.
    -   **Simpson's:** This is harder to re-derive on the fly. Remember it comes from fitting a parabola over two intervals. The key is to remember the weighting pattern $(1, 4, 1)$ for a single panel and the pre-factor $h/3$. The composite rule just lays these panels end-to-end.

## Common mistakes
1.  **Off-by-One Errors:** Using $N$ points for $N$ intervals. Remember, $N$ intervals requires $N+1$ evaluation points. `for i in range(N)` is different from `for i in range(N+1)`.
2.  **Incorrect Loop Boundaries:** When implementing the weighted sums, students often incorrectly apply the weights to the first or last terms. The endpoints are *never* multiplied in the summation loop. Isolate them: `result = f(a) + f(b)`, then loop over the interior points `for i in range(1, N)`.
3.  **Forgetting Simpson's Requirement:** Simpson's rule *must* be used with an even number of intervals, $N$. This is because it groups intervals in pairs to form parabolas. Applying it with an odd $N$ is mathematically invalid.
4.  **Mixing up $h/2$ and $h/3$:** Trapezoid has two points, so its formula has a `/2`. Simpson's basic unit uses three points, and its formula has a `/3`. This is a loose but effective association.

## Self-check
1.  Calculate the approximation for $\int_1^5 x^2 \, dx$ using the trapezoidal rule with $N=4$ intervals. Do this by hand.
2.  Write a Python function `simpsons_rule(f, a, b, N)` that first checks if `N` is even and positive. If not, it should raise a `ValueError`. Test it by approximating $\int_{-1}^1 \cos(x) \, dx$.
3.  The error for the trapezoidal rule scales with $h^2$, while Simpson's scales with $h^4$. If you halve the step size $h$ (i.e., double $N$), by what factor would you expect the error to decrease for each method? Verify this by running your code for $\int_0^{2\pi} \sin(x) \, dx$ with $N=10$ and $N=20$.