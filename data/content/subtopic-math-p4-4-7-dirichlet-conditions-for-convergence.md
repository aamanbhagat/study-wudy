## What it is
The Dirichlet conditions are a set of sufficient, but not necessary, criteria that guarantee a periodic function's Fourier series converges. If a function $f(x)$ satisfies these "good behavior" rules, its Fourier series will converge to the function's value where it's continuous and to the midpoint of the jump where it's discontinuous.

## Why it matters
In physics and engineering, we solve PDEs like the heat equation or wave equation by representing initial conditions (e.g., an initial temperature distribution) as a Fourier series. The Dirichlet conditions ensure this infinite series representation is mathematically valid and physically meaningful—that our series solution actually adds up to the initial state we are trying to model. In signal processing, it guarantees that a well-behaved signal can be reliably decomposed into its constituent frequencies.

## When to study it
You must be comfortable with the following before proceeding:
1.  **Fourier Series:** You must know what a Fourier series is and how to calculate the coefficients ($a_0, a_n, b_n$) for a given function $f(x)$ over a period.
2.  **Calculus Fundamentals:** You need a solid grasp of periodicity, piecewise continuity, limits (especially one-sided limits, $f(x^+)$ and $f(x^-)$), and definite integrals.
3.  **Convergence of Series:** You should understand the basic concept of an infinite series converging to a specific value.

If you cannot write down the integral formulas for the Fourier coefficients from memory, review that topic first.

## How to study it (step by step)
1.  **State the Conditions:** Write down the three Dirichlet conditions clearly. Don't worry about the proof yet, just know what they are.
2.  **Visualize Each Condition:** For each condition, draw two simple graphs: one function that satisfies it (e.g., a square wave) and one that violates it (e.g., $\tan(x)$ for absolute integrability, or $\sin(1/x)$ for infinite extrema). This builds intuition.
3.  **Understand the Convergence Theorem:** Focus on the main result: where the series converges. Write down the convergence formula for a point of continuity ($f(x)$) and for a point of discontinuity ($\frac{1}{2}[f(x^+) + f(x^-)]$).
4.  **Connect to the Coefficients:** Look at the integral formulas for $a_n$ and $b_n$. Intuitively, see how a function violating the conditions (e.g., having an infinite value) would cause these integrals to diverge, making the coefficients undefined.
5.  **Work a Test Case:** Take a simple function like a sawtooth wave. Go through the three conditions one by one and state explicitly why the function satisfies each.
6.  **Solve a Convergence Problem:** For a square wave, calculate the value the Fourier series converges to at a point of continuity and at a point of discontinuity. Verify this matches the theorem.

## Key ideas, with intuition
1.  **Infinite Sums Need Guardrails:** A Fourier series is an infinite sum of sines and cosines. Infinite sums can do strange things: diverge, oscillate, or converge. The Dirichlet conditions are a set of "guardrails" ensuring the sum behaves well and converges to a predictable value.

2.  **"Finite Weirdness" is Allowed:** The conditions don't require the function to be perfectly smooth. It can have a *finite* number of jumps (piecewise continuous) and a *finite* number of sharp corners (finite extrema) within one period. The universe is often messy, and this allows us to model things like square pulses or sudden changes in temperature. The key is that the "weirdness" is localized and not infinitely dense or infinitely large.

3.  **The Democratic Compromise at Jumps:** At a jump discontinuity, the Fourier series can't choose one value over the other. It compromises by converging to the exact average of the values on either side of the jump.
    $$
    S(x_0) = \frac{1}{2} \left[ f(x_0^+) + f(x_0^-) \right]
    $$
    Here, $f(x_0^+)$ is the limit as you approach the jump from the right, and $f(x_0^-)$ is the limit from the left. This is a profound and practical result.

4.  **The Three Conditions (The Rules of Good Behavior):**
    *   **Absolutely Integrable:** The function can't "go to infinity" in a way that the area under it becomes infinite. The total "energy" in one period must be finite. Mathematically, for a function with period $2L$: $\int_{-L}^{L} |f(x)| \,dx < \infty$.
    *   **Finite Extrema:** The function can't have infinitely many wiggles in a finite interval. It can have hills and valleys, but not an infinite number of them. This prevents functions like $\sin(1/x)$ near $x=0$.
    *   **Finite Discontinuities:** The function can have jumps, but only a finite number of them in one period. All jumps must be of finite size.

## Worked example
Consider the square wave function $f(x)$ with period $2\pi$, defined as:
$$
f(x) = \begin{cases}
-1 & \text{if } -\pi < x < 0 \\
1 & \text{if } 0 < x < \pi
\end{cases}
$$
Let's check the Dirichlet conditions and determine the convergence of its Fourier series at $x=0$ and $x=\pi/2$.

**Step 1: Check Dirichlet Conditions**
1.  **Absolutely Integrable?** We check $\int_{-\pi}^{\pi} |f(x)| \,dx$.
    $$
    \int_{-\pi}^{\pi} |f(x)| \,dx = \int_{-\pi}^{0} |-1| \,dx + \int_{0}^{\pi} |1| \,dx = \int_{-\pi}^{0} 1 \,dx + \int_{0}^{\pi} 1 \,dx = \pi + \pi = 2\pi
    $$
    Since $2\pi < \infty$, the condition is met.

2.  **Finite Extrema?** In the interval $(-\pi, \pi)$, the function is composed of two flat lines. There are no local maxima or minima (extrema). The number of extrema is zero, which is finite. This condition is met.

3.  **Finite Discontinuities?** In the interval $(-\pi, \pi)$, there is one discontinuity at $x=0$. The function jumps from $-1$ to $1$. The number of discontinuities is one, which is finite. The jump size is $1 - (-1) = 2$, which is finite. This condition is met.

**Conclusion:** The function satisfies all Dirichlet conditions. Its Fourier series will converge.

**Step 2: Determine Convergence Points**
*   **At $x=\pi/2$ (a point of continuity):**
    The function is continuous at $x=\pi/2$. The value is $f(\pi/2) = 1$.
    Therefore, the Fourier series $S(x)$ converges to the function's value:
    $$ S(\pi/2) = f(\pi/2) = 1 $$

*   **At $x=0$ (a point of discontinuity):**
    The function has a jump discontinuity at $x=0$. We use the midpoint formula.
    The limit from the left is $f(0^-) = \lim_{x \to 0^-} f(x) = -1$.
    The limit from the right is $f(0^+) = \lim_{x \to 0^+} f(x) = 1$.
    The series converges to the average:
    $$ S(0) = \frac{1}{2} [f(0^+) + f(0^-)] = \frac{1}{2} [1 + (-1)] = 0 $$

**Reflection:**
- Checking the conditions first gave us confidence that the series would converge meaningfully.
- For the continuous point, the process was trivial: the series converges to the function's value.
- For the discontinuous point, the key was to apply the midpoint convergence theorem, which correctly identifies the convergence value as the average of the jump, not the value of the function *at* the point (which isn't even defined in this case).

## Diagrams

A function satisfying the Dirichlet Conditions (Square Wave):
```text
      ^ f(x)
      |
   1  +---------+         +---------
      |         |         |
------+---------O---------+---------+------> x
      |         |         |         |
  -1  +---------+         +---------
      |
     -π         0         π        2π
```
*   `O` at $x=0$ indicates the midpoint where the series converges.
*   Finite jumps at $x=0, \pi, ...$
*   No local extrema (wiggles).
*   Clearly integrable over one period.

A function violating the Dirichlet Conditions near $x=0$ ($f(x) = \sin(1/x)$):
```text
      ^ f(x)
   1  +--/\-/\/\/\--
      | /  \
      |/    \
------+------------> x
      |\    /
      | \  /
  -1  +--\/-\/\/\/--
      |
```
*   This function has an infinite number of extrema (wiggles) as $x \to 0$. It violates the "finite extrema" condition.

## Memory technique — remember this forever
1.  **Mnemonic:** "The function must be **F.F.A.**"
    *   **F**inite Jumps: A finite number of finite discontinuities per period.
    *   **F**inite Wiggles: A finite number of maxima and minima per period.
    *   **A**bsolutely Integrable: $\int_{\text{period}} |f(x)| \,dx$ is finite.

2.  **Must-Know Formulas/Facts:**
    *   If $f$ is continuous at $x_0$: $S(x_0) = f(x_0)$.
    *   If $f$ is discontinuous at $x_0$: $S(x_0) = \frac{1}{2} [f(x_0^+) + f(x_0^-)]$.

3.  **Spaced Repetition Schedule:**
    *   Review this entire sheet in **1 day**.
    *   Attempt the self-check questions again in **3 days**.
    *   Re-derive the convergence at a jump for a square wave in **7 days**.
    *   Explain the "F.F.A." mnemonic to an imaginary student in **16 days**.
    *   Check if a new function (e.g., a triangular wave) satisfies the conditions in **35 days**.

4.  **First Principles Pathway:** If you forget the conditions, remember their purpose: to ensure the Fourier coefficient integrals make sense.
    $$ a_n = \frac{1}{L} \int_{-L}^{L} f(x) \cos\left(\frac{n\pi x}{L}\right) dx $$
    Ask yourself: What could make this integral fail?
    *   If $f(x)$ goes to infinity too fast (e.g., $1/x$ near $x=0$), the area might be infinite. This leads to the **Absolutely Integrable** condition.
    *   If $f(x)$ has infinite jumps, the integral becomes a sum of infinitely many pieces, which is problematic. This leads to **Finite Jumps**.
    *   If $f(x)$ wiggles infinitely fast, the integral might not settle on a value. This leads to **Finite Wiggles**.

## Common mistakes
1.  **Assuming convergence to $f(x)$ everywhere.** This is the most common error. Students forget that at a jump discontinuity, the series converges to the midpoint, not to either of the function's one-sided limits.
2.  **Confusing "continuous" with "satisfies Dirichlet."** A function can be discontinuous and still satisfy the conditions perfectly (e.g., a square wave). The conditions *permit* discontinuities, they don't forbid them.
3.  **Misinterpreting "finite number."** The conditions require a finite number of extrema and discontinuities *within any one period* (or any finite interval). A periodic function that satisfies this will still have an infinite number of discontinuities over the entire real line, which is perfectly acceptable.
4.  **Ignoring the absolute value in the integrability condition.** A function like $f(x) = 1/x$ on $[-\pi, \pi]$ might have its improper integral exist as a principal value (equal to 0), but $\int_{-\pi}^{\pi} |1/x| \,dx$ diverges. It must be *absolutely* integrable.

## Self-check
1.  Consider the sawtooth wave function defined by $f(x) = x$ on the interval $(-\pi, \pi)$ and extended periodically. Does this function satisfy the Dirichlet conditions? Where does its Fourier series converge at $x=\pi$?
2.  Why does the function $f(x) = \tan(x)$ on the interval $(-\pi, \pi)$ fail to satisfy the Dirichlet conditions? Be specific about which condition(s) it violates.
3.  Consider the function $f(x) = \sqrt[3]{x}$ on the interval $[-1, 1]$. Does it satisfy the Dirichlet conditions? (Hint: Think about the derivative and what it implies for the number of extrema).