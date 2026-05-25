## What it is
Numerical error is the discrepancy between an exact, analytical value and its computed, numerical approximation. **Truncation error** arises from using a finite approximation for an infinite mathematical process, like cutting off a Taylor series after a few terms. **Round-off error** arises from the computer's inability to represent real numbers with infinite precision, forcing it to store them in a finite number of bits.

## Why it matters
These errors are not academic curiosities; they dictate the feasibility and reliability of complex simulations. In aerospace, the accumulation of tiny errors in an orbital mechanics simulation can lead to a trajectory that misses its target by thousands of kilometers. In machine learning, round-off error can stall the convergence of optimization algorithms like gradient descent, while truncation error from simplified models can limit predictive accuracy.

## When to study it
Before tackling this, you must have a firm grasp of two concepts:
1.  **Taylor Series:** You need to be able to expand a function $f(x)$ around a point and, critically, understand the formula for the remainder term (Lagrange form is sufficient). This is the foundation for analyzing truncation error.
2.  **Floating-Point Representation:** You should understand the basics of how numbers are stored in a computer (e.g., IEEE 754 standard), including the concepts of mantissa and exponent. This is the source of round-off error.

If you are not confident with Taylor's theorem, review it now. The entire analysis of truncation error depends on it.

## How to study it (step by step)
1.  **Derive Truncation Error for a Derivative:** Take the function $f(x) = \sin(x)$. Write down its Taylor series expansion around $x$. Use this expansion to derive the forward difference formula for the derivative, $f'(x) \approx \frac{f(x+h) - f(x)}{h}$, and explicitly state the truncation error term.
2.  **Code the Trade-off:** Write a short script (Python/Julia/MATLAB) that calculates the derivative of $f(x) = \sin(x)$ at $x=1$ using the forward difference formula. Loop through decreasing values of the step size $h$ (from $10^{-1}$ down to $10^{-17}$).
3.  **Plot the Result:** Plot the absolute error between your numerical result and the true value, $\cos(1)$, as a function of $h$. Use a log-log scale. You should see a characteristic V-shaped or U-shaped curve.
4.  **Annotate the Plot:** Identify the region on your plot where the error decreases as $h$ decreases. This is where truncation error dominates. Identify the region where the error *increases* as $h$ decreases. This is where round-off error dominates.
5.  **Investigate Catastrophic Cancellation:** In your code, print the values of $f(x+h)$ and $f(x)$ when $h$ is very small (e.g., $10^{-15}$). Notice how close they are. Reflect on what happens to the significant digits when you subtract two nearly identical numbers in finite precision.

## Key ideas, with intuition
1.  **Truncation is a Math Choice, Round-off is a Hardware Limit.** You, the mathematician, *choose* to truncate a series. The error comes from the terms you discard. Round-off is imposed on you by the computer's architecture; it's an unavoidable consequence of finite memory.

2.  **Taylor's Theorem is the Tool for Analyzing Truncation Error.** The core idea is to represent a function locally by a polynomial plus a remainder. The approximation uses the polynomial part; the truncation error *is* the remainder part. For the forward difference approximation of a derivative:
    $$ f(x+h) = f(x) + hf'(x) + \frac{h^2}{2}f''(\xi) \quad \text{for some } \xi \in (x, x+h) $$
    Rearranging gives:
    $$ \underbrace{f'(x)}_{\text{Exact Value}} = \underbrace{\frac{f(x+h) - f(x)}{h}}_{\text{Approximation}} \underbrace{- \frac{h}{2}f''(\xi)}_{\text{Truncation Error}} $$
    The truncation error is proportional to $h$, written as $O(h)$. As you make your step size $h$ smaller, this error shrinks.

3.  **The Error Trade-off is Universal.** Decreasing step size $h$ reduces truncation error. However, a smaller $h$ means you are subtracting two numbers, $f(x+h)$ and $f(x)$, that are closer and closer together. This leads to *catastrophic cancellation*—a major source of round-off error—where significant digits are lost. The total error is the sum of these two competing effects, leading to an optimal step size that is not the smallest possible.
    $$ \text{Total Error} \approx \underbrace{C_1 h^p}_{\text{Truncation}} + \underbrace{\frac{C_2 \epsilon_{\text{mach}}}{h^q}}_{\text{Round-off}} $$
    Here, $\epsilon_{\text{mach}}$ is the machine epsilon (the smallest number such that $1+\epsilon_{\text{mach}} \neq 1$), and $p, q$ depend on the algorithm. Minimizing this sum with respect to $h$ yields an optimal $h$, not $h \to 0$.

## Worked example
Let's find the numerical derivative of $f(x) = e^x$ at $x=1$ using the forward difference formula, and analyze the error for a step size $h=10^{-8}$. The true value is $f'(1) = e^1 \approx 2.718281828459045$. We will assume our computer uses standard double-precision floating-point arithmetic, where machine epsilon $\epsilon_{\text{mach}} \approx 2.22 \times 10^{-16}$.

**Step 1: The Analytical Setup**
From Taylor's theorem, the forward difference formula is:
$$ f'(x) = \frac{f(x+h) - f(x)}{h} - \frac{h}{2}f''(\xi) $$
For $f(x) = e^x$, we have $f''(x) = e^x$. At $x=1$, the truncation error is approximately $-\frac{h}{2}e^1$.

**Step 2: Calculate Truncation Error**
With $h=10^{-8}$:
$$ E_{\text{trunc}} \approx \left| -\frac{10^{-8}}{2} e^1 \right| \approx \frac{10^{-8}}{2} \times 2.718 \approx 1.36 \times 10^{-8} $$
This is the error we expect from our mathematical approximation.

**Step 3: Calculate Round-off Error**
The value $f(x+h)$ will be stored with some round-off error, say $\tilde{f}(x+h) = f(x+h)(1+\epsilon_1)$, and similarly $\tilde{f}(x) = f(x)(1+\epsilon_2)$, where $|\epsilon_i| \le \epsilon_{\text{mach}}$.
The computed difference is $\tilde{f}(x+h) - \tilde{f}(x)$. The error in this subtraction is approximately $2 \epsilon_{\text{mach}} |f(x)|$.
The round-off error in the final result is this error divided by $h$:
$$ E_{\text{round}} \approx \frac{2 \epsilon_{\text{mach}} |f(x)|}{h} $$
With our values:
$$ E_{\text{round}} \approx \frac{2 \times (2.22 \times 10^{-16}) \times e^1}{10^{-8}} \approx \frac{1.2 \times 10^{-15}}{10^{-8}} = 1.2 \times 10^{-7} $$

**Step 4: Combine and Reflect**
The total error is the sum of these two components:
$$ E_{\text{total}} \approx E_{\text{trunc}} + E_{\text{round}} \approx 1.36 \times 10^{-8} + 1.2 \times 10^{-7} \approx 1.34 \times 10^{-7} $$
Notice that for this choice of $h$, the round-off error is an order of magnitude *larger* than the truncation error. A smaller $h$ would reduce $E_{\text{trunc}}$ but make $E_{\text{round}}$ even worse. This example demonstrates that simply pushing $h$ to zero is not a viable strategy; we are limited by the precision of our machine.

## Diagrams
This diagram shows the characteristic relationship between total error and step size ($h$) on a log-log plot for a numerical method like differentiation.

```text
      log(Total Error)
          ^
          |
          | \                     /
          |  \                   /
          |   \                 /
          |    \               /   <-- Round-off Error Dominates
          |     \             /      (Error ~ 1/h)
          |      \           /
          |       \         /
  Truncation Error \       /
  Dominates (Error ~ h^p) \     /
          |                \   /
          |                 \ / <-- Optimal h
          |                  *
          +--------------------------------------> log(h)
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Imagine you are tailoring a suit.
    *   **Truncation Error** is like using a rough pattern for the suit. You *truncated* the design details. To make it better, you need a more detailed pattern (a higher-order method, or smaller steps). This is a *design* error.
    *   **Round-off Error** is the limit of your scissors' sharpness. No matter how good your pattern, you can't cut fabric at the atomic level. Your cuts will always be slightly off. If you try to make extremely tiny, fine cuts (very small $h$), the fuzziness of the cut (round-off) overwhelms the detail you were trying to create. This is a *tool* error.

2.  **Formulas to Overlearn:**
    *   Taylor's Theorem with Remainder: $f(x+h) = f(x) + hf'(x) + \frac{h^2}{2!}f''(x) + \dots + \frac{h^n}{n!}f^{(n)}(x) + \frac{h^{n+1}}{(n+1)!}f^{(n+1)}(\xi)$
    *   Error composition: Total Error $\approx$ Truncation Error + Round-off Error

3.  **Spaced Repetition Schedule:** Review this material and re-derive the worked example at **1 day, 3 days, 7 days, 16 days, 35 days**. Do not just read it. Re-work it from a blank sheet.

4.  **First Principles Pathway:** If you forget everything, remember this: **Truncation error comes from the Taylor series remainder.** Write down the Taylor expansion for the function in your numerical formula (e.g., $f(x+h)$). Solve for the quantity you are trying to approximate (e.g., $f'(x)$). The leftover terms are your truncation error.

## Common mistakes
1.  **Blindly Assuming Smaller `h` is Better:** The most common mistake is to think that making the step size $h$ as small as possible will always yield the most accurate result. This ignores the U-shaped error curve and the dominance of round-off error at small $h$.
2.  **Confusing Order of Error with Actual Error:** An algorithm being $O(h^2)$ is better than one that is $O(h)$, but for a large $h$, the $O(h)$ method might actually give a smaller error. The Big-O notation describes the *asymptotic rate of convergence* as $h \to 0$, not the magnitude of the error for a fixed $h$.
3.  **Ignoring Catastrophic Cancellation:** Subtraction is the enemy of precision. When you compute $a - b$ where $a \approx b$, you lose significant digits. Many numerical formulas (like the derivative approximation) rely on this kind of subtraction, making them inherently sensitive to round-off.

## Self-check
1.  The trapezoidal rule for integration is given by $\int_a^b f(x) dx \approx \frac{b-a}{2}(f(a) + f(b))$. Using a Taylor series expansion of $f(x)$ around the midpoint $c = (a+b)/2$, derive the leading term of the truncation error for this rule. What happens to round-off error as the interval $[a,b]$ becomes very small?
2.  The central difference formula for the derivative is $f'(x) \approx \frac{f(x+h) - f(x-h)}{2h}$. Derive the truncation error for this formula. How does its order compare to the forward difference formula, and what does this imply about its accuracy for small $h$?
3.  You are given a list of one million positive floating-point numbers, ranging from $10^{-15}$ to $10^{15}$. To compute their sum, would it be more accurate to sum them in ascending order or descending order? Justify your answer in terms of round-off error.