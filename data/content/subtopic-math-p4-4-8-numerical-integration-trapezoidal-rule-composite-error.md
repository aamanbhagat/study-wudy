## What it is
The composite trapezoidal rule is a numerical method for approximating a definite integral $\int_a^b f(x) dx$. It works by dividing the integration interval $[a, b]$ into many smaller subintervals and approximating the area under the curve on each subinterval with a trapezoid. The total approximate area is then the sum of the areas of these trapezoids.

## Why it matters
This method is fundamental when an analytical solution to an integral is impossible or impractical, or when the function $f(x)$ is only known from a set of discrete data points. In aerospace, it's used to calculate total impulse from discrete thrust measurements of a rocket engine test firing. In physics, it can determine the work done by a force whose magnitude is measured at various points along a path.

## When to study it
You must be comfortable with the following before proceeding:
1.  **Definite Integrals:** The definition of $\int_a^b f(x) dx$ as the area under a curve.
2.  **Riemann Sums:** The idea of approximating area with rectangles. The trapezoidal rule is a direct improvement.
3.  **Taylor Series:** The error analysis relies on expanding the function using a Taylor polynomial with a remainder term. Specifically, you need to understand the expansion up to the second-order term.
4.  **Basic Geometry:** The formula for the area of a trapezoid.

If these are not solid, review them first.

## How to study it (step by step)
1.  **Derive the single-step rule.** Consider the integral $\int_{x_0}^{x_1} f(x) dx$. The interval width is $h = x_1 - x_0$. Approximate the area with a single trapezoid whose parallel sides are the vertical lines from the x-axis to $f(x_0)$ and $f(x_1)$. The area is $(\text{average height}) \times (\text{width}) = \frac{f(x_0) + f(x_1)}{2} h$.
2.  **Generalize to the composite rule.** Divide the full interval $[a, b]$ into $N$ equal subintervals, each of width $h = (b-a)/N$. The grid points are $x_i = a + ih$ for $i=0, 1, ..., N$. Write the total integral as a sum: $\int_a^b f(x) dx = \sum_{i=0}^{N-1} \int_{x_i}^{x_{i+1}} f(x) dx$.
3.  **Apply the single-step rule to each piece.** The approximation $T_N$ is $\sum_{i=0}^{N-1} \frac{h}{2} (f(x_i) + f(x_{i+1}))$. Write out the first few terms of this sum and notice how the interior points ($f(x_1), f(x_2), ...$) appear twice. Factor out common terms to arrive at the standard composite formula.
4.  **Derive the local error.** The error for a single trapezoid over $[x_i, x_{i+1}]$ is $E_i = \int_{x_i}^{x_{i+1}} f(x) dx - \frac{h}{2}(f(x_i) + f(x_{i+1}))$. Use Taylor series to expand $f(x)$ around the midpoint of the interval. Integrate the series and subtract the trapezoid term. You will find the leading error term is proportional to $h^3$ and $f''$.
5.  **Derive the global error.** The total error is $E_T = \sum_{i=0}^{N-1} E_i$. Summing the local error terms, which are all $-\frac{h^3}{12}f''(\xi_i)$, gives a total error proportional to $N \cdot h^3$. Since $N = (b-a)/h$, the global error becomes proportional to $\frac{1}{h} \cdot h^3 = h^2$. This is a critical result.
6.  **Solve a problem.** Apply the formula to a function you can integrate exactly, like $\int_0^1 x^2 dx$ with $N=4$. Calculate the numerical result, the exact result, and the actual error. Compare the actual error to the bound predicted by the global error formula.

## Key ideas, with intuition
1.  **Linear Approximation:** The core of the trapezoidal rule is approximating a potentially complex curve $f(x)$ on a small interval with a simple straight line connecting the endpoints. The area under this line is a trapezoid. This is one step better than a Riemann sum, which approximates the function with a flat, horizontal line (a rectangle).

2.  **Sum of Local Areas:** The "composite" part simply means we apply this simple approximation repeatedly over many small intervals and sum the results. The global accuracy comes from making the intervals small enough that the linear approximation is very good on each one.
    $$
    \int_a^b f(x) dx \approx \sum_{i=0}^{N-1} \text{Area}(\text{Trapezoid}_i)
    $$

3.  **Error is Governed by Curvature:** If $f(x)$ is a straight line, its second derivative $f''(x)$ is zero, and the trapezoidal rule is exact. The error arises when the function *curves* away from the straight-line top of the trapezoid. The second derivative is the mathematical measure of curvature. A large $|f''(x)|$ means high curvature and thus higher error.
    $$
    \text{Error} \propto f''(x)
    $$

4.  **Global Error Scales Quadratically with Step Size:** The error for one small trapezoid (local error) is proportional to $h^3$. But to cover the whole interval $[a, b]$, you need $N=(b-a)/h$ trapezoids. The total (global) error is roughly $N \times (\text{local error})$.
    $$
    E_T \approx N \cdot (\text{const} \cdot h^3) = \frac{b-a}{h} \cdot (\text{const} \cdot h^3) = (\text{new const}) \cdot h^2
    $$
    This is the most important practical takeaway. If you double the number of steps (halve $h$), you quarter the error. This is called second-order accuracy.

## Worked example
**Problem:** Approximate $I = \int_0^1 e^{-x^2} dx$ using the composite trapezoidal rule with $N=4$ subintervals.

**Solution:**

1.  **Identify parameters:** The interval is $[a, b] = [0, 1]$. The number of subintervals is $N=4$.
2.  **Calculate step size:** The width of each subinterval is $h = \frac{b-a}{N} = \frac{1-0}{4} = 0.25$.
3.  **Determine the grid points:** The points $x_i = a + ih$ are:
    *   $x_0 = 0$
    *   $x_1 = 0.25$
    *   $x_2 = 0.5$
    *   $x_3 = 0.75$
    *   $x_4 = 1.0$
4.  **Evaluate the function at each grid point:** Let $f(x) = e^{-x^2}$.
    *   $f(x_0) = e^{-0^2} = 1$
    *   $f(x_1) = e^{-0.25^2} = e^{-0.0625} \approx 0.93941$
    *   $f(x_2) = e^{-0.5^2} = e^{-0.25} \approx 0.77880$
    *   $f(x_3) = e^{-0.75^2} = e^{-0.5625} \approx 0.56978$
    *   $f(x_4) = e^{-1^2} = e^{-1} \approx 0.36788$
5.  **Apply the composite trapezoidal rule formula:**
    $$
    T_N = \frac{h}{2} \left[ f(x_0) + 2 \sum_{i=1}^{N-1} f(x_i) + f(x_N) \right]
    $$
    $$
    T_4 = \frac{0.25}{2} \left[ f(x_0) + 2f(x_1) + 2f(x_2) + 2f(x_3) + f(x_4) \right]
    $$
    $$
    T_4 = 0.125 \left[ 1 + 2(0.93941) + 2(0.77880) + 2(0.56978) + 0.36788 \right]
    $$
    $$
    T_4 = 0.125 \left[ 1 + 1.87882 + 1.55760 + 1.13956 + 0.36788 \right]
    $$
    $$
    T_4 = 0.125 [5.94386] \approx 0.74298
    $$

**Reflection:**
Each step is mechanical and serves a clear purpose. Steps 1-3 set up the grid for our approximation. Step 4 gathers the data (the heights) at these grid points. Step 5 applies the core formula, which is just a weighted sum of these heights, to find the total area. The weights (1 for ends, 2 for interior) arise naturally from summing the areas of adjacent trapezoids.

## Diagrams
A curve $y=f(x)$ approximated by three trapezoids ($N=3$).

```text
  y
  ^
  |
  | f(x_0)
  | . . . . . . . . . . . . . . . . . . . . . . . f(x)
  | |~._                                      _.~
  | |   ~.                                  .~
f(x_1)| |     ~.                              .~
  | +-------+~._                          .~
  | | T_1   |   ~.                      .~
f(x_2)| |       +-------+~._              .~
  | |       | T_2   |   ~.          .~
  | +-------+-------+-------+~.     .~
  | |       |       | T_3   |  ~. .~
  +--------------------------------------------------> x
    a=x_0     x_1     x_2     x_3=b

    <----h---->
```
The diagram shows the interval $[a, b]$ divided into three subintervals of width $h$. The area under the curve $f(x)$ in each subinterval is approximated by the area of a trapezoid ($T_1, T_2, T_3$). The top of each trapezoid is a straight line connecting $(x_i, f(x_i))$ to $(x_{i+1}, f(x_{i+1}))$. The error is the sum of the small areas between the curve and the straight-line tops.

## Memory technique — remember this forever
1.  **Mnemonic:** "Half the step, times the ends plus twice the guts."
    *   "Half the step" $\rightarrow \frac{h}{2}$
    *   "the ends" $\rightarrow f(x_0) + f(x_N)$
    *   "plus twice the guts" $\rightarrow + 2 \sum_{i=1}^{N-1} f(x_i)$ (the interior points)

2.  **Must-know formulas:**
    *   **Composite Rule:** $T_N = \frac{h}{2} \left[ f(x_0) + 2 \sum_{i=1}^{N-1} f(x_i) + f(x_N) \right]$, where $h = \frac{b-a}{N}$.
    *   **Global Error:** $E_T = -\frac{(b-a)}{12} h^2 f''(\xi)$ for some $\xi \in [a, b]$. The key part is $E_T \propto h^2$.

3.  **Spaced Repetition Schedule:** Review this material and re-derive the formulas from first principles after **1 day, 3 days, 7 days, 16 days, and 35 days**.

4.  **First Principles Pathway:** If you forget the composite formula, re-derive it.
    *   The integral is the sum of smaller integrals: $\int_a^b \approx \sum_{i=0}^{N-1} \int_{x_i}^{x_{i+1}}$.
    *   Area of one trapezoid is (average height) $\times$ width: $\frac{f(x_i) + f(x_{i+1})}{2} h$.
    *   Write out the sum: $\frac{h}{2}(f_0+f_1) + \frac{h}{2}(f_1+f_2) + \dots + \frac{h}{2}(f_{N-1}+f_N)$.
    *   Factor out $\frac{h}{2}$ and collect terms: $\frac{h}{2}[f_0 + (f_1+f_1) + (f_2+f_2) + \dots + f_N]$. The pattern of weights (1, 2, 2, ..., 2, 1) becomes immediately obvious.

## Common mistakes
1.  **Forgetting the $\frac{1}{2}$ factor.** Students often write the formula with $h$ instead of $\frac{h}{2}$. Remember it comes from the average of the two heights.
2.  **Incorrectly weighting points.** A common mistake is to multiply all points by 2, or none of the interior points. Remember the mnemonic: only "the guts" get doubled.
3.  **Off-by-one error with $N$.** $N$ is the number of *intervals* or trapezoids. This means there are $N+1$ grid *points* (from $x_0$ to $x_N$).
4.  **Confusing local and global error order.** The local error for one step is $O(h^3)$. The global error for the whole interval is $O(h^2)$. Do not mix them up. The global error's order is what determines the method's efficiency.

## Self-check
1.  Use the composite trapezoidal rule with $N=4$ to approximate $\int_1^2 \frac{1}{x} dx$.
2.  For the integral $I = \int_0^\pi \sin(x) dx$, the exact value is 2. The composite trapezoidal rule with $N$ intervals gives an error $E_N$. If you use $2N$ intervals to get an error $E_{2N}$, what is the approximate value of the ratio $E_N / E_{2N}$? Justify your answer without performing the full calculation.
3.  The error formula is $E_T = -\frac{(b-a)}{12} h^2 f''(\xi)$. For which class of functions $f(x)$ is the trapezoidal rule *exact* (i.e., error is zero)? Use the formula to justify your answer.