## What it is
The Integral Test for Convergence is a method for determining whether an infinite series with positive terms converges or diverges. It works by comparing the sum of the series to the value of an improper integral of a related function. If the integral converges to a finite value, the series also converges; if the integral diverges to infinity, the series also diverges.

## Why it matters
This test provides a powerful link between discrete sums (series) and continuous integration, a theme central to physics and engineering. In aerospace, calculating the total gravitational potential from a series of discrete masses can be approximated by an integral. In machine learning, understanding the convergence of optimization algorithms often relies on analyzing series whose behavior mirrors that of integrals, such as in the analysis of stochastic gradient descent.

## When to study it
You must be proficient with the following before proceeding:
1.  **Definition of Series Convergence:** Understand what it means for the sequence of partial sums, $S_N = \sum_{n=1}^{N} a_n$, to have a finite limit as $N \to \infty$.
2.  **Improper Integrals:** You must be able to set up and evaluate improper integrals of the form $\int_{a}^{\infty} f(x) \,dx = \lim_{b \to \infty} \int_{a}^{b} f(x) \,dx$.
3.  **Functions and Derivatives:** Be able to determine if a function is positive and decreasing on an interval, typically by analyzing its first derivative.

If any of these are weak, review them first. The logic of the test will be opaque otherwise.

## How to study it (step by step)
1.  **Visualize the connection.** Draw the function $f(x) = 1/x^2$. On the same graph, draw rectangles of width 1 for $x \in [1, \infty)$. See if you can arrange the rectangles to be entirely under the curve or entirely over the curve. This is the geometric heart of the proof.
2.  **Derive the core inequality.** Formalize your drawing from step 1. By comparing the area of the rectangles (the series terms) to the area under the curve (the integral), derive the inequality: $\int_{1}^{\infty} f(x) \,dx \le \sum_{n=1}^{\infty} a_n \le a_1 + \int_{1}^{\infty} f(x) \,dx$.
3.  **Prove the test.** Use the inequality from step 2 and the Monotone Convergence Theorem (or simply the definition of convergence for positive-term series) to argue why if the integral converges, the series must converge, and if the integral diverges, the series must diverge.
4.  **Master the conditions.** For a series $\sum a_n$, find the corresponding function $f(x)$ such that $f(n)=a_n$. For each of the following series, verify if $f(x)$ is positive, continuous, and decreasing for $x \ge 1$: $\sum 1/n^3$, $\sum n/(n+1)$, $\sum 1/(n \ln n)$.
5.  **Derive the p-series test.** Apply the Integral Test to the general series $\sum_{n=1}^{\infty} \frac{1}{n^p}$. Evaluate the integral $\int_{1}^{\infty} \frac{1}{x^p} \,dx$ for different values of $p$ (specifically $p=1$, $p>1$, and $p<1$). This single application generates one of the most important convergence results.
6.  **Solve problems.** Use the Integral Test to determine the convergence of $\sum_{n=2}^{\infty} \frac{1}{n (\ln n)^2}$ and $\sum_{n=1}^{\infty} ne^{-n}$.

## Key ideas, with intuition
1.  **A Series is a Riemann Sum:** The fundamental intuition is that a series $\sum_{n=1}^{\infty} a_n$ is a discrete version of an integral $\int_1^{\infty} f(x) dx$, where $f(n) = a_n$. Specifically, it's a Riemann sum with $\Delta x = 1$. The question is whether this "area" is finite.

2.  **Bounding the Sum with an Area:** We can trap the value of the series by comparing it to the area under the curve $y=f(x)$.
    *   **Lower Bound:** The sum of rectangles starting from $n=2$ (using the right endpoint for height) is *less* than the area under the curve from $x=1$ to $\infty$.
        $$ \sum_{n=2}^{\infty} a_n = \sum_{n=2}^{\infty} f(n) \le \int_1^{\infty} f(x) \,dx $$
    *   **Upper Bound:** The sum of rectangles starting from $n=1$ (using the left endpoint for height) is *greater* than the area under the curve from $x=1$ to $\infty$.
        $$ \int_1^{\infty} f(x) \,dx \le \sum_{n=1}^{\infty} f(n) = \sum_{n=1}^{\infty} a_n $$
    If the integral is finite, the sum is squeezed and must also be finite. If the integral is infinite, the sum (which is larger than the integral, minus the first term) must also be infinite.

3.  **The Conditions are Essential:** The test requires $f(x)$ to be **continuous**, **positive**, and **decreasing** (for all $x$ past some starting point $N$).
    *   **Positive:** We are comparing areas. Negative terms would complicate the geometry.
    *   **Continuous:** The integral $\int f(x) \,dx$ is not well-defined otherwise.
    *   **Decreasing:** This is the crucial condition that guarantees the "trapping" shown in the diagrams. If the function jumps up and down, a rectangle could be much larger than the corresponding slice of area under the curve, breaking the inequality.

4.  **The p-Series is the Canonical Example:** The series $\sum_{n=1}^{\infty} \frac{1}{n^p}$ is the most important series you can test with the Integral Test. The result is a rule you must memorize:
    $$ \sum_{n=1}^{\infty} \frac{1}{n^p} \quad \begin{cases} \text{converges} & \text{if } p > 1 \\ \text{diverges} & \text{if } p \le 1 \end{cases} $$
    The case $p=1$ is the famous **harmonic series**, which diverges. The integral $\int_1^\infty \frac{1}{x} dx = \ln(x) |_1^\infty$ goes to infinity very slowly, and so does the series. For $p>1$, the function $1/x^p$ decays fast enough for the area to be finite.

## Worked example
Determine if the series $\sum_{n=2}^{\infty} \frac{1}{n \ln(n)}$ converges or diverges.

**Step 1: Define the function and check conditions.**
Let $a_n = \frac{1}{n \ln(n)}$. We define the corresponding function $f(x) = \frac{1}{x \ln(x)}$ for $x \ge 2$.
*   **Positive?** For $x \ge 2$, both $x$ and $\ln(x)$ are positive, so $f(x)$ is positive. Yes.
*   **Continuous?** The function is a composition of continuous functions and is only undefined at $x=1$ and $x=0$. It is continuous on $[2, \infty)$. Yes.
*   **Decreasing?** We check the derivative, $f'(x)$. Using the quotient rule or chain rule on $(x \ln x)^{-1}$:
    $$ f'(x) = -1(x \ln x)^{-2} \cdot \frac{d}{dx}(x \ln x) = -\frac{1 + \ln(x)}{(x \ln x)^2} $$
    For $x \ge 2$, the numerator $1+\ln(x)$ is positive and the denominator $(x \ln x)^2$ is positive. The leading negative sign makes $f'(x) < 0$. Thus, $f(x)$ is decreasing on $[2, \infty)$. Yes.
The conditions for the Integral Test are met.

**Step 2: Evaluate the corresponding improper integral.**
We now evaluate $\int_{2}^{\infty} \frac{1}{x \ln(x)} \,dx$.
$$ \int_{2}^{\infty} \frac{1}{x \ln(x)} \,dx = \lim_{b \to \infty} \int_{2}^{b} \frac{1}{x \ln(x)} \,dx $$
This integral calls for a u-substitution. Let $u = \ln(x)$, so $du = \frac{1}{x} \,dx$.
We change the limits of integration:
*   When $x=2$, $u = \ln(2)$.
*   When $x=b$, $u = \ln(b)$.
The integral becomes:
$$ \lim_{b \to \infty} \int_{\ln(2)}^{\ln(b)} \frac{1}{u} \,du = \lim_{b \to \infty} [\ln|u|]_{\ln(2)}^{\ln(b)} $$
$$ = \lim_{b \to \infty} (\ln(\ln(b)) - \ln(\ln(2))) $$
As $b \to \infty$, $\ln(b) \to \infty$, and therefore $\ln(\ln(b)) \to \infty$.

**Step 3: State the conclusion.**
The integral $\int_{2}^{\infty} \frac{1}{x \ln(x)} \,dx$ diverges.
By the Integral Test, the series $\sum_{n=2}^{\infty} \frac{1}{n \ln(n)}$ must also **diverge**.

**Reflection:** Each step was necessary. Verifying the three conditions in Step 1 legitimized the use of the test. The integral evaluation in Step 2 required recognizing the correct technique (u-substitution) and properly handling the limit definition of an improper integral. Step 3 is a direct application of the test's theorem, linking the integral's behavior to the series' behavior.

## Diagrams

**Diagram 1: Series as an upper bound (Right-hand sum)**
This shows how the integral is bounded by the series. The area of the rectangles is $\sum_{n=1}^{\infty} a_n$. The area under the curve is $\int_1^\infty f(x) dx$.

```text
      y
      |
f(1)  +-----+
      |     |
      | f(x)|
f(2)  +--+--+-----------
      |  |  |`.
      |  |  |  `.
f(3)  +--+--+--+--`.-------
      |  |  |  |  | ` .
      +--+--+--+--+---+--+------> x
      0  1  2  3  4   5  6

Rectangles use left-endpoints for height. Area = a_1 + a_2 + ...
Area(Rectangles) >= Area(Under Curve from 1 to inf)
So if ∫f(x)dx diverges, so does ∑a_n.
```

**Diagram 2: Series as a lower bound (Left-hand sum)**
This shows how the series is bounded by the integral. The area of the rectangles shown is $\sum_{n=2}^{\infty} a_n$.

```text
      y
      |
f(1)  +
      |`.
      |  `.
f(2)  +-----+-----------
      |     |`.
      |     |  `.
f(3)  +-----+--+--`.-------
      |     |  |  | ` .
      +--+--+--+--+---+--+------> x
      0  1  2  3  4   5  6

Rectangles use right-endpoints for height. Area = a_2 + a_3 + ...
Area(Rectangles) <= Area(Under Curve from 1 to inf)
So if ∫f(x)dx converges, so does ∑a_n.
```

## Memory technique — remember this forever
1.  **Visual Hook:** Picture a continuous, smooth hill ($y=f(x)$) rolling downwards. Now, build a blocky staircase (`Σ a_n`) on top of it. **The staircase and the hill go on forever together, or they both stop at a finite place.** They are linked. If the area under the hill is infinite, the staircase built on it must also be infinite. If the area is finite, the staircase can't be infinite either.

2.  **Must Overlearn:**
    *   **Conditions:** $f(x)$ must be **continuous, positive, and decreasing** for $x \ge N$.
    *   **p-series test:** $\sum_{n=1}^{\infty} \frac{1}{n^p}$ **converges if $p > 1$**, diverges if $p \le 1$.

3.  **Spaced Repetition Schedule:**
    *   Review this material in **1 day**. (Draw the diagrams from memory).
    *   Review again in **3 days**. (Re-derive the p-series result).
    *   Review again in **7 days**. (Solve the worked example without looking).
    *   Review again in **16 days**. (Explain the proof to an imaginary student).
    *   Review again in **35 days**. (Do the self-check problems).

4.  **First Principles Pathway:** If you forget the test, you can rebuild it.
    *   Start with a decreasing positive function $f(x)$.
    *   Draw it.
    *   Draw rectangles of width 1, with heights $f(1), f(2), \dots$.
    *   Observe that the sum of the areas of the rectangles, $\sum f(n)$, is a Riemann sum.
    *   Visually compare the sum of the areas of the rectangles to the area under the curve, $\int f(x) dx$. The diagrams you drew will re-emerge, and the entire test logic will follow from that picture.

## Common mistakes
1.  **Forgetting to check the conditions.** The most common error is to apply the test to a series whose corresponding function is not decreasing (e.g., $\sum \frac{2+\sin(n)}{n^2}$). Always verify: positive, continuous, decreasing.
2.  **Equating the sum and the integral.** The test tells you they *both converge* or *both diverge*. It does **not** say they converge to the same value. In general, $\sum_{n=1}^{\infty} a_n \neq \int_{1}^{\infty} f(x) \,dx$.
3.  **The Harmonic Series Trap.** Forgetting that the p-series diverges for $p=1$. The terms $1/n$ go to zero, but they don't go to zero "fast enough" for the sum to be finite. Burn $\sum 1/n \to \infty$ into your memory.
4.  **Sloppy integral evaluation.** Making errors with limits, u-substitution, or integration by parts when evaluating the improper integral, leading to a wrong conclusion about the series.

## Self-check
1.  Does the series $\sum_{n=1}^{\infty} \frac{1}{n\sqrt{n}}$ converge or diverge? Justify your answer using the most efficient method.
2.  Determine if $\sum_{n=1}^{\infty} \frac{n}{e^{n}}$ converges or diverges. You will need to use a derivative to prove one of the conditions.
3.  The integral test requires $f(x)$ to be eventually decreasing. Consider the series $\sum_{n=1}^{\infty} \frac{100}{n^2 + \sin(n)}$. Does the function $f(x) = \frac{100}{x^2 + \sin(x)}$ satisfy the decreasing condition for all $x \ge 1$? Can you still determine the convergence of this series? How?