## What it is
Simpson's rules are methods for numerical integration, which means approximating the value of a definite integral $\int_a^b f(x) dx$. The 1/3 rule approximates the function $f(x)$ over small intervals using parabolas (2nd-degree polynomials), while the 3/8 rule uses cubic polynomials. The composite versions apply these rules repeatedly over a larger interval to achieve higher accuracy.

## Why it matters
These methods are fundamental in scientific computing when an analytical solution to an integral is impossible or impractical. In aerospace, this includes calculating the aerodynamic forces on a fuselage from pressure distribution data or determining the total impulse of a rocket engine from thrust measurements over time. In physics, they are used to solve differential equations numerically or to calculate quantities like the work done by a variable force.

## When to study it
Before tackling this, you must have a solid grasp of single-variable calculus, specifically the definition and properties of the definite integral. You should also be familiar with the concept of polynomial interpolation, particularly Lagrange or Newton forms. Understanding the simpler Trapezoidal Rule provides excellent context for why Simpson's Rule is an improvement.

## How to study it (step by step)
1.  **Revisit the Trapezoidal Rule:** Quickly review how it approximates $f(x)$ with a straight line (a 1st-degree polynomial) over an interval. Note its error characteristics. This sets the stage for a better approximation.
2.  **Derive the Basic Simpson's 1/3 Rule:** Take three equally spaced points. Fit a unique parabola (a 2nd-degree polynomial) through them using Lagrange interpolation. Integrate this polynomial exactly. This is the core of the lesson.
3.  **Generalize to the Composite 1/3 Rule:** Apply the basic rule repeatedly across an interval divided into an even number of subintervals, $n$. Sum the results and observe how the coefficients for the interior points combine.
4.  **Understand the 3/8 Rule:** Recognize this is the same idea, but with four points and a cubic polynomial. State the formula and note that it requires the number of subintervals to be a multiple of 3. The derivation is analogous to the 1/3 rule but algebraically heavier, so focus on the conceptual parallel.
5.  **Analyze the Error:** Look up the error terms for both rules. Notice that the 1/3 rule's error depends on the fourth derivative ($f^{(4)}$) and the 3/8 rule's also on the fourth derivative. This explains why the 1/3 rule is often more efficient and accurate than expected.
6.  **Solve Problems:** Apply both composite rules to integrals you can solve analytically (e.g., $\int_0^{\pi} \sin(x) dx$) to verify the accuracy. Then, apply them to an integral that cannot be solved analytically (e.g., $\int_0^1 e^{-x^2} dx$).

## Key ideas, with intuition
1.  **Approximation by Integration of a Simpler Function:** The fundamental idea is to replace a complicated function $f(x)$ with a simpler function $P(x)$ (a polynomial) that is easy to integrate. We accept a small error in exchange for the ability to get a numerical answer.
    $$ \int_a^b f(x) dx \approx \int_a^b P(x) dx $$
2.  **Higher-Degree Polynomials Hug the Curve Better:** A straight line (Trapezoidal rule) can be a poor fit for a curve. A parabola (Simpson's 1/3 rule) can bend to match the curve's curvature, leading to a much better approximation. A cubic (Simpson's 3/8 rule) can capture even more complex behavior.

3.  **Derivation via Lagrange Polynomials:** The formula for Simpson's 1/3 rule comes directly from integrating a 2nd-degree Lagrange interpolating polynomial. For three points $(x_0, y_0), (x_1, y_1), (x_2, y_2)$ with spacing $h$, we can shift coordinates for simplicity so that $x_0 = -h, x_1 = 0, x_2 = h$. The integral is:
    $$ \int_{-h}^{h} f(x) dx \approx \int_{-h}^{h} P_2(x) dx $$
    Where $P_2(x) = y_0 \frac{x(x-h)}{2h^2} + y_1 \frac{(x+h)(x-h)}{-h^2} + y_2 \frac{x(x+h)}{2h^2}$. Integrating this term by term gives the result:
    $$ \int_{-h}^{h} P_2(x) dx = y_0 \left(\frac{h}{3}\right) + y_1 \left(\frac{4h}{3}\right) + y_2 \left(\frac{h}{3}\right) = \frac{h}{3}(y_0 + 4y_1 + y_2) $$
4.  **The Composite Rule's Coefficient Pattern:** When we apply the basic 1/3 rule across a long interval, we sum up many small segments. An interior point like $x_2$ is the *end* of the first parabolic segment but the *start* of the second. This "double counting" changes its coefficient.
    - First segment $[x_0, x_2]$: $\frac{h}{3}(f_0 + 4f_1 + f_2)$
    - Second segment $[x_2, x_4]$: $\frac{h}{3}(f_2 + 4f_3 + f_4)$
    - Sum: $\frac{h}{3}(f_0 + 4f_1 + 2f_2 + 4f_3 + f_4)$. This creates the famous `1, 4, 2, 4, ..., 2, 4, 1` pattern.

## Worked example
Approximate $I = \int_0^1 x^4 dx$ using the composite Simpson's 1/3 rule with $n=4$ subintervals.

**1. Setup:**
The exact value is $I = [\frac{x^5}{5}]_0^1 = \frac{1}{5} = 0.2$.
The interval is $[a, b] = [0, 1]$. The number of subintervals is $n=4$.
The step size is $h = \frac{b-a}{n} = \frac{1-0}{4} = 0.25$.

**2. Evaluate the function at the nodes:**
We need the function values at $x_0, x_1, x_2, x_3, x_4$.
$x_0 = 0.00 \implies y_0 = f(0.00) = (0.00)^4 = 0.0000$
$x_1 = 0.25 \implies y_1 = f(0.25) = (0.25)^4 = 0.00390625$
$x_2 = 0.50 \implies y_2 = f(0.50) = (0.50)^4 = 0.0625$
$x_3 = 0.75 \implies y_3 = f(0.75) = (0.75)^4 = 0.31640625$
$x_4 = 1.00 \implies y_4 = f(1.00) = (1.00)^4 = 1.0000$

**3. Apply the Composite Simpson's 1/3 Rule Formula:**
The formula for $n=4$ is:
$$ I \approx \frac{h}{3} [f(x_0) + 4f(x_1) + 2f(x_2) + 4f(x_3) + f(x_4)] $$
Substitute the values:
$$ I \approx \frac{0.25}{3} [0 + 4(0.00390625) + 2(0.0625) + 4(0.31640625) + 1.0000] $$

**4. Calculate:**
$$ I \approx \frac{0.25}{3} [0 + 0.015625 + 0.125 + 1.265625 + 1.0000] $$
$$ I \approx \frac{0.25}{3} [2.40625] $$
$$ I \approx 0.08333... \times 2.40625 = 0.20052083... $$

**Reflection:**
- Step 1 defined the problem parameters ($h$, $n$). This is always the starting point.
- Step 2 created a table of values, the raw data for the approximation.
- Step 3 correctly applied the formula with the `1, 4, 2, 4, 1` coefficient pattern. This is the core algorithm.
- Step 4 performed the arithmetic. The result (0.20052...) is very close to the true value (0.2), demonstrating the rule's accuracy. The error is only about 0.26%.

## Diagrams
This diagram shows a function $f(x)$ being approximated by two parabolic segments ($P_1$ and $P_2$) using the composite Simpson's 1/3 rule with $n=4$.

```text
      y ^
        |
        |     /---\
        |    /     ---\     f(x)
        |   /          \
        |  . . . . . . . . . . P_2 (parabola)
        |  .            .
        | / .            .
        |/   .            .
        |. . . . . . . . P_1 (parabola)
        .   .            .
      --|---+------------+------------+------------+------------> x
        |  x_0          x_1          x_2          x_3          x_4
        | (a)                                                 (b)
        |
        |<---- h ---->|
```
The area under the curve $f(x)$ from $a$ to $b$ is approximated by the sum of the areas under the parabolas $P_1$ (from $x_0$ to $x_2$) and $P_2$ (from $x_2$ to $x_4$).

## Memory technique — remember this forever
1.  **The Mnemonic/Hook:**
    - **"1/3 Rule"**: The name tells you the fraction: $\frac{h}{3}$. It uses **3** points to fit a parabola. The coefficients are **1-4-1**. Think of it as a narrow base (1), a wide middle (4), and a narrow top (1).
    - **"3/8 Rule"**: The name tells you the fraction: $\frac{3h}{8}$. It uses **4** points to fit a cubic. The coefficients are **1-3-3-1**, just like the third row of Pascal's triangle.

2.  **Formulas to Overlearn:**
    - **Composite Simpson's 1/3 Rule ($n$ is even):**
      $$ \int_a^b f(x) dx \approx \frac{h}{3} \left[ f_0 + 4f_1 + 2f_2 + 4f_3 + \dots + 2f_{n-2} + 4f_{n-1} + f_n \right] $$
    - **Composite Simpson's 3/8 Rule ($n$ is a multiple of 3):**
      $$ \int_a^b f(x) dx \approx \frac{3h}{8} \left[ f_0 + 3f_1 + 3f_2 + 2f_3 + 3f_4 + 3f_5 + \dots + 2f_{n-3} + 3f_{n-2} + 3f_{n-1} + f_n \right] $$

3.  **Spaced Repetition Schedule:**
    Review these formulas and the derivation concept at **1 day, 3 days, 7 days, 16 days, 35 days**. Actively write them out from memory each time.

4.  **First Principles Pathway:**
    If you forget the formula, remember the core idea: **"Fit a polynomial, then integrate it."** For the 1/3 rule:
    a. Take 3 points: $(-h, y_0), (0, y_1), (h, y_2)$.
    b. Write the Lagrange polynomial $P_2(x)$ that passes through them.
    c. Calculate $\int_{-h}^{h} P_2(x) dx$. The algebra will give you back $\frac{h}{3}(y_0 + 4y_1 + y_2)$.

## Common mistakes
1.  **Incorrect Number of Intervals:** Applying the 1/3 rule when $n$ is odd, or the 3/8 rule when $n$ is not a multiple of 3. The coefficient patterns rely on these constraints.
2.  **Mixing up $n$ and the number of points:** Remember, $n$ intervals means you need to evaluate the function at $n+1$ points. A common mistake is stopping at $f_{n-1}$.
3.  **Incorrect Coefficient Pattern:** Messing up the composite rule pattern. For 1/3 rule, it's `1, 4, 2, 4, 2, ..., 4, 1`. The `2`'s are on the interior points that are endpoints of a parabolic segment, and the `4`'s are on the midpoints. Forgetting that the last coefficient is always `1`.
4.  **Error in $h$ calculation:** Using $h = (b-a)/(n-1)$ instead of the correct $h = (b-a)/n$.

## Self-check
1.  Use the basic (non-composite) Simpson's 1/3 rule to evaluate $\int_1^3 (x^2 + x + 1) dx$. Why should your answer be perfectly exact?
2.  Set up the full expression for approximating $\int_0^2 \cos(x^2) dx$ using the composite Simpson's 3/8 rule with $n=6$. Do not calculate the final number, but write out the complete formula with the correct $h$ and all function evaluation terms.
3.  Simpson's 1/3 rule is derived from a quadratic approximation, yet it is known to be exact for any cubic polynomial. From the perspective of the error term, which involves the fourth derivative of $f(x)$, explain precisely why this is true.