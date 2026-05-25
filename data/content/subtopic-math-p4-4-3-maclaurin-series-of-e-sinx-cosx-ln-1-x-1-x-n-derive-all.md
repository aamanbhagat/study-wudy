## What it is
A Maclaurin series is a way to represent a function as an infinite polynomial, centered at the point $x=0$. It's a special case of the Taylor series where the point of expansion is zero. This allows us to approximate complex functions (like $\sin x$ or $e^x$) with simpler, more computable polynomial expressions, especially for values of $x$ near zero.

## Why it matters
These series are fundamental tools in applied science and engineering. In physics, the series for $\sin(x) \approx x$ and $\cos(x) \approx 1 - x^2/2$ are the basis for the small-angle approximation, crucial for analyzing pendulums and optics. In computer science and aerospace, algorithms for guidance systems and scientific calculators evaluate transcendental functions by computing a finite number of terms from their Maclaurin series.

## When to study it
Before tackling these derivations, you must have a firm grasp of the following:
1.  **Differential Calculus:** You must be able to compute derivatives of any function fluently, including higher-order derivatives (e.g., the 5th derivative of $\sin x$).
2.  **Power Series:** Understand the general form of a power series, $\sum_{n=0}^{\infty} c_n (x-a)^n$.
3.  **Taylor Series Formula:** You should already know the general formula for a Taylor series centered at $x=a$: $f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^n$. A Maclaurin series is simply this formula with $a=0$.

If you are not confident in these areas, pause and review them first.

## How to study it (step by step)
1.  **Master the Recipe:** Write down the general Maclaurin series formula, $f(x) = \sum_{k=0}^{\infty} \frac{f^{(k)}(0)}{k!} x^k$, and recognize that the only task is to find a general expression for the $k$-th derivative evaluated at zero, $f^{(k)}(0)$.
2.  **Derive $e^x$:** Let $f(x) = e^x$. Calculate $f'(x)$, $f''(x)$, $f'''(x)$, etc. Evaluate each at $x=0$. Observe the simple pattern, substitute into the formula, and write the series.
3.  **Derive $\sin(x)$ and $\cos(x)$:** Let $f(x) = \sin(x)$. Calculate the first five derivatives. Evaluate each at $x=0$. You will see a repeating cycle of four values. Use this pattern to write the series. Repeat the entire process for $f(x) = \cos(x)$.
4.  **Derive $\ln(1+x)$:** Let $f(x) = \ln(1+x)$. Calculate the first four derivatives. Evaluate at $x=0$. Note the alternating signs and how the factorials in the numerator cancel with the $k!$ in the denominator. Generalize the pattern.
5.  **Derive $(1+x)^n$ (Binomial Series):** Let $f(x) = (1+x)^n$. Calculate the first four derivatives. Evaluate at $x=0$. The pattern will be $f^{(k)}(0) = n(n-1)\dots(n-k+1)$. Substitute this into the Maclaurin formula to derive the generalized binomial theorem.
6.  **Check for Understanding:** Use your derived series for $e^x$ to find the series for $e^{-x^2}$ by substituting $-x^2$ for $x$. This tests if you can manipulate the results as tools, not just derive them.

## Key ideas, with intuition
1.  **Approximation with Polynomials:** The core idea is that any "well-behaved" (infinitely differentiable) function can be approximated near a point by a polynomial. A constant is a bad approximation. A line (1st degree) is better. A parabola (2nd degree) is even better. An infinite-degree polynomial can be a perfect representation.

2.  **Matching Derivatives at $x=0$:** How do we find the *best* polynomial? We force it to match the function at $x=0$.
    *   To match the *value*, we set the polynomial's constant term equal to $f(0)$.
    *   To match the *slope*, we set the polynomial's $x$ coefficient to match $f'(0)$.
    *   To match the *concavity*, we set the polynomial's $x^2$ coefficient to match $f''(0)$.
    This process continues forever. For a general polynomial $P(x) = c_0 + c_1x + c_2x^2 + \dots$, you'll find that $P^{(k)}(0) = k! c_k$. To make it match the function $f(x)$, we must have $f^{(k)}(0) = k! c_k$, which gives the famous coefficient formula:
    $$
    c_k = \frac{f^{(k)}(0)}{k!}
    $$

3.  **The Formula is a Recipe:** The Maclaurin series formula is not magic; it is a direct consequence of the "matching derivatives" logic. Your job is not to re-invent it each time, but to apply it as a recipe. The only "work" is finding the pattern for $f^{(k)}(0)$.
    $$
    f(x) = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \dots
    $$

## Worked example
Let's derive the Maclaurin series for $f(x) = \cos(x)$.

**Step 1: State the function and the goal.**
We want to find the series for $f(x) = \cos(x)$ using the formula $f(x) = \sum_{k=0}^{\infty} \frac{f^{(k)}(0)}{k!} x^k$. This requires us to compute the derivatives $f^{(k)}(0)$.

**Step 2: Compute successive derivatives.**
*   $f(x) = \cos(x)$
*   $f'(x) = -\sin(x)$
*   $f''(x) = -\cos(x)$
*   $f'''(x) = \sin(x)$
*   $f^{(4)}(x) = \cos(x)$

**Step 3: Evaluate each derivative at $x=0$.**
*   $f(0) = \cos(0) = 1$
*   $f'(0) = -\sin(0) = 0$
*   $f''(0) = -\cos(0) = -1$
*   $f'''(0) = \sin(0) = 0$
*   $f^{(4)}(0) = \cos(0) = 1$

**Step 4: Identify the pattern.**
The sequence of derivative values at zero is $1, 0, -1, 0, 1, 0, -1, 0, \dots$. The non-zero terms occur only for even derivatives ($k=0, 2, 4, \dots$). Let $k=2m$. The value is $(-1)^m$.

**Step 5: Substitute into the Maclaurin formula.**
$$
\begin{align*}
\cos(x) &= \frac{f(0)}{0!}x^0 + \frac{f'(0)}{1!}x^1 + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \frac{f^{(4)}(0)}{4!}x^4 + \dots \\
&= \frac{1}{0!}x^0 + \frac{0}{1!}x^1 + \frac{-1}{2!}x^2 + \frac{0}{3!}x^3 + \frac{1}{4!}x^4 + \dots \\
&= 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \dots
\end{align*}
$$

**Step 6: Write the result in sigma notation.**
The series only contains even powers, so we use an index $m$ where the power is $2m$ and the factorial is $(2m)!$. The sign alternates, starting positive, so we use $(-1)^m$.
$$
\cos(x) = \sum_{m=0}^{\infty} \frac{(-1)^m}{(2m)!} x^{2m}
$$

**Reflection:** This worked because the derivatives of $\cos(x)$ follow a simple, repeating cycle. By evaluating at $x=0$, we converted this functional cycle into a numerical cycle, which we then translated into a general formula for the coefficients of the power series.

## Diagrams
This diagram shows how successive Maclaurin polynomial approximations for $f(x) = \sin(x)$ get closer to the true function near $x=0$.

```text
      y
      |
      |   /
 1.0 -+  / . . . . . . . . . . . . . . . y = sin(x)
      | /
      |/
      *-----------------------------------> x
     /| 0
    / |
-1.0 -+

Approximations:
P_1(x) = x       (A straight line, tangent at origin)
      y
      |     .
      |    /
      |   / .
      |  /   .
      | /     . y=sin(x)
      *-------/------------> x
      |      /
      |     /
      |    .

P_3(x) = x - x^3/6 (A cubic, matching value, slope, and concavity trends)
      y
      |
      |   ...-'''
      |  /.-'
      | /.'
      */-----.----------------> x
     /.'     ` y=sin(x)
    /.'
...-'''
```
The first diagram shows the target function. The second shows the linear approximation ($P_1$), which is just the tangent line. The third suggests the cubic approximation ($P_3$), which "hugs" the curve for longer by matching higher-order derivatives. Each successive odd-degree polynomial improves the fit.

## Memory technique — remember this forever
1.  **The Story:** Imagine you are a master forger trying to duplicate a function's signature at a single point ($x=0$). To be perfect, your forgery (the polynomial) must match the original's position ($f(0)$), its direction ($f'(0)$), its curvature ($f''(0)$), its change in curvature ($f'''(0)$), and so on, infinitely. The term $\frac{f^{(k)}(0)}{k!}$ is the *exact* coefficient needed to make the $k$-th derivative of your polynomial match the function's $k$-th derivative at zero. The $k!$ is a normalization factor that appears when you differentiate $x^k$, $k$ times.

2.  **Overlearn these three formulas:**
    *   $e^x = \sum_{k=0}^{\infty} \frac{x^k}{k!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots$ (The simplest one. All derivatives are 1 at $x=0$.)
    *   $\cos(x) = \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k)!} x^{2k} = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \dots$ (Cosine is an **even** function, so it has only **even** powers.)
    *   $\sin(x) = \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k+1)!} x^{2k+1} = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots$ (Sine is an **odd** function, so it has only **odd** powers.)

3.  **Spaced Repetition:** Re-derive all five series from first principles (the recipe) on this schedule: tomorrow (1 day), in 3 days, in 7 days, in 16 days, in 35 days. Do not just read them; perform the derivations.

4.  **First Principles Pathway:** If you forget everything, remember this:
    *   Assume $f(x) = c_0 + c_1x + c_2x^2 + c_3x^3 + \dots$
    *   Find the coefficients.
    *   $f(0) = c_0$.
    *   $f'(x) = c_1 + 2c_2x + 3c_3x^2 + \dots \implies f'(0) = c_1$.
    *   $f''(x) = 2c_2 + (3 \cdot 2)c_3x + \dots \implies f''(0) = 2c_2 \implies c_2 = f''(0)/2!$.
    *   $f^{(k)}(0) = k! c_k \implies c_k = \frac{f^{(k)}(0)}{k!}$.
    This reconstructs the entire framework from scratch.

## Common mistakes
1.  **Forgetting the Factorial:** Writing $\sum x^k$ instead of $\sum \frac{x^k}{k!}$ for $e^x$. The factorial is crucial and comes from differentiating $x^k$ repeatedly.
2.  **Mixing Sine and Cosine:** Remembering that one is odd and one is even is the key. $\cos(0)=1$, so its series must start with 1. $\sin(0)=0$, so its series must start with an $x$ term, not a constant.
3.  **Errors in $\ln(1+x)$:** The derivatives of $\ln(1+x)$ are $\frac{1}{1+x}$, $\frac{-1}{(1+x)^2}$, $\frac{2}{(1+x)^3}$, etc. At $x=0$, these are $1, -1, 2, -6, \dots$. The general term is $f^{(k)}(0) = (-1)^{k-1}(k-1)!$ for $k \ge 1$. A common mistake is to forget that this $(k-1)!$ cancels with part of the $k!$ in the denominator, leaving just $k$.
4.  **Incorrect Binomial Coefficients:** Forgetting that the "numerator" of the coefficient for $(1+x)^n$ is $n(n-1)\dots(n-k+1)$, which is a product of exactly $k$ terms.

## Self-check
1.  Find the first four non-zero terms of the Maclaurin series for $f(x) = e^{-x^2}$.
2.  Derive the Maclaurin series for the hyperbolic sine function, $\sinh(x) = \frac{e^x - e^{-x}}{2}$, by manipulating the known series for $e^x$.
3.  Derive the Maclaurin series for $f(x) = \arctan(x)$. Hint: Start with the series for $\frac{1}{1+u^2}$ (which comes from the geometric series, a special case of the binomial series) and integrate it term-by-term.