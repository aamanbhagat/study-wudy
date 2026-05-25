## What it is
A Taylor series is a specific type of power series that represents a function as an infinite sum of terms. These terms are calculated from the values of the function's derivatives at a single point, providing a polynomial approximation that becomes increasingly accurate near that point.

## Why it matters
Taylor series are fundamental to numerical methods, physics, and engineering. In aerospace, guidance systems use truncated Taylor series to linearize and approximate complex, non-linear flight dynamics for real-time trajectory calculations. In machine learning, they provide the theoretical basis for optimization algorithms like Newton's method, which approximates a function with a quadratic to find its minimum.

## When to study it
Before tackling this, you must have a firm grasp of the following:
1.  **Sequences and Series:** Convergence/divergence tests, summation notation ($\Sigma$).
2.  **Power Series:** The general form $\sum_{n=0}^{\infty} c_n (x-a)^n$, radius of convergence, and interval of convergence.
3.  **Calculus I & II:** Differentiation of elementary functions (including chain, product, quotient rules) and the concept of higher-order derivatives ($f'(x), f''(x), \dots, f^{(n)}(x)$).

If you are not confident in term-by-term differentiation of a power series, review that first.

## How to study it (step by step)
1.  **Start with the Goal:** Write down the goal. We want to represent a function $f(x)$ with a power series centered at $x=a$, but we don't know the coefficients $c_n$. Our task is to find a formula for $c_n$ in terms of $f(x)$.
2.  **Write the Assumption:** Assume such a representation exists for some radius of convergence $R > 0$.
    $$ f(x) = \sum_{n=0}^{\infty} c_n (x-a)^n = c_0 + c_1(x-a) + c_2(x-a)^2 + c_3(x-a)^3 + \dots $$
3.  **Find the First Coefficient ($c_0$):** Evaluate the equation at the center point, $x=a$. Observe how all terms except the first one vanish. Solve for $c_0$.
4.  **Find the Second Coefficient ($c_1$):** Differentiate the entire series term-by-term with respect to $x$. Now, evaluate this new series (which represents $f'(x)$) at $x=a$. Solve for $c_1$.
5.  **Find the Third Coefficient ($c_2$):** Differentiate the series for $f'(x)$ to get a series for $f''(x)$. Evaluate at $x=a$. Notice the pattern that emerges from the power rule. Solve for $c_2$.
6.  **Generalize to the n-th Coefficient ($c_n$):** Differentiate the original series $k$ times. Evaluate at $x=a$. You will find that only one term remains non-zero. Use this to derive the general formula for $c_k$ involving the $k$-th derivative of $f$ and a factorial.
7.  **Assemble the Taylor Series:** Substitute your general formula for $c_n$ back into the original power series expression. You have now derived the Taylor series formula.

## Key ideas, with intuition
1.  **The "What if?" Assumption:** The entire derivation hinges on a single, powerful assumption: "What if this function *can* be written as a power series?" We don't prove it *can* be (that's a separate topic on Taylor's theorem and remainders). We just assume it can, and then we find the only possible coefficients that would make it true.

2.  **Matching Derivatives at a Single Point:** A power series is a type of polynomial. To make a polynomial $P(x)$ approximate a function $f(x)$ near a point $a$, we can force them to match perfectly *at* that point. We force $P(a) = f(a)$, $P'(a) = f'(a)$, $P''(a) = f''(a)$, and so on for all derivatives. A Taylor series is the infinite extension of this idea; it's the polynomial that matches *all* derivatives of $f(x)$ at the point $a$.

3.  **Derivatives Isolate Coefficients:** The core algebraic trick is that evaluating the series at its center $x=a$ makes every term $(x-a)^k$ equal to zero. When we differentiate, the constant term is eliminated. By repeatedly differentiating and then evaluating at $x=a$, we systematically isolate one coefficient at a time.
    *   To find $c_0$, we need $f(a)$.
    *   To find $c_1$, we need $f'(a)$.
    *   To find $c_k$, we must differentiate $k$ times to make the $c_k(x-a)^k$ term into a constant, and then evaluate at $x=a$.

    The $k$-th derivative of $c_k(x-a)^k$ is $c_k \cdot k!$. Evaluating $f^{(k)}(x)$ at $x=a$ gives:
    $$ f^{(k)}(a) = c_k \cdot k! $$
    This directly gives us the formula for the coefficients.

## Worked example
Derive the Taylor series for $f(x) = \sin(x)$ centered at $a=0$. (This is also called a Maclaurin series).

**Step 1: Assume a power series representation.**
Assume $\sin(x) = \sum_{n=0}^{\infty} c_n x^n = c_0 + c_1 x + c_2 x^2 + c_3 x^3 + \dots$

**Step 2: Find the coefficients by repeated differentiation.**
We need to find $f^{(n)}(0)$ for $n=0, 1, 2, \dots$
*   $f(x) = \sin(x) \implies f(0) = \sin(0) = 0$
*   $f'(x) = \cos(x) \implies f'(0) = \cos(0) = 1$
*   $f''(x) = -\sin(x) \implies f''(0) = -\sin(0) = 0$
*   $f'''(x) = -\cos(x) \implies f'''(0) = -\cos(0) = -1$
*   $f^{(4)}(x) = \sin(x) \implies f^{(4)}(0) = \sin(0) = 0$
The pattern of derivatives evaluated at 0 is $0, 1, 0, -1, 0, 1, 0, -1, \dots$

**Step 3: Use the coefficient formula $c_n = \frac{f^{(n)}(a)}{n!}$.**
Here, $a=0$.
*   $c_0 = \frac{f(0)}{0!} = \frac{0}{1} = 0$
*   $c_1 = \frac{f'(0)}{1!} = \frac{1}{1} = 1$
*   $c_2 = \frac{f''(0)}{2!} = \frac{0}{2} = 0$
*   $c_3 = \frac{f'''(0)}{3!} = \frac{-1}{6}$
*   $c_4 = \frac{f^{(4)}(0)}{4!} = \frac{0}{24} = 0$
*   $c_5 = \frac{f^{(5)}(0)}{5!} = \frac{1}{120}$

**Step 4: Assemble the series.**
Substitute the coefficients back into the power series form:
$$ \sin(x) = 0 + 1 \cdot x + 0 \cdot x^2 - \frac{1}{3!} x^3 + 0 \cdot x^4 + \frac{1}{5!} x^5 - \dots $$
$$ \sin(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \dots $$

**Step 5: Write in summation notation.**
The terms are non-zero only for odd powers. Let the index be $n=0, 1, 2, \dots$. The power is $2n+1$. The sign alternates.
$$ \sin(x) = \sum_{n=0}^{\infty} \frac{(-1)^n}{(2n+1)!} x^{2n+1} $$

**Reflection:** Each step builds on the last. We started with a generic form (Step 1), computed the specific parts needed for the coefficients (Step 2), applied the formula we derived (Step 3), and assembled the final result (Steps 4 & 5). The core logic was using the coefficient formula $c_n = f^{(n)}(a)/n!$, which itself comes from the process of differentiating and evaluating at the center.

## Diagrams
This diagram shows the first few Taylor polynomials for a function $f(x)$ centered at $x=a$. $P_0(x)$ is a constant, $P_1(x)$ is the tangent line, and $P_2(x)$ is a parabola. Each successive approximation "hugs" the curve more closely near $x=a$.

```text
      y
      |
      |           /
      |      .--'' f(x)
      |     /
      |----/---- P_0(x) (constant, matches value)
      |   /
 P_1(x)\/ P_2(x) (tangent line, matches value and slope)
 (parabola, matches value, slope, and concavity)
      |\
      | \
 -----+--\------------------ x
      |  a
      |
```

## Memory technique — remember this forever
1.  **The Story: The "Local DNA" of a Function.** Think of the derivatives at a point $a$ — $f(a), f'(a), f''(a), \dots$ — as the complete "genetic code" or DNA of the function at that specific location. The Taylor series is the recipe for rebuilding the entire function from just that local DNA. The term $\frac{f^{(n)}(a)}{n!}$ is the instruction for the $n$-th "growth factor" $(x-a)^n$.

2.  **Must-Learn Formulas:**
    *   General Power Series: $f(x) = \sum_{n=0}^{\infty} c_n (x-a)^n$
    *   Taylor Coefficient Formula: $c_n = \frac{f^{(n)}(a)}{n!}$
    *   The Full Taylor Series: $f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^n$

3.  **Spaced Repetition Schedule:** Review this derivation and the key formulas at these intervals:
    *   24 hours
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget the formula for $c_n$, you can re-derive it in 60 seconds.
    *   Write $f(x) = c_0 + c_1(x-a) + c_2(x-a)^2 + \dots$
    *   Set $x=a \implies f(a) = c_0$.
    *   Differentiate: $f'(x) = c_1 + 2c_2(x-a) + \dots$
    *   Set $x=a \implies f'(a) = c_1$.
    *   Differentiate again: $f''(x) = 2c_2 + 3 \cdot 2 c_3(x-a) + \dots$
    *   Set $x=a \implies f''(a) = 2c_2 \implies c_2 = f''(a)/2!$.
    *   Generalize: $f^{(n)}(a) = n! \cdot c_n \implies c_n = f^{(n)}(a)/n!$.

## Common mistakes
1.  **Forgetting the factorial.** The most common mistake is writing the coefficient as just $f^{(n)}(a)$ instead of $\frac{f^{(n)}(a)}{n!}$. Remember, the factorial arises from repeatedly applying the power rule.
2.  **Evaluating the derivative incorrectly.** Students often find the $n$-th derivative $f^{(n)}(x)$ but then forget to substitute the value of the center, $x=a$, before building the series. The coefficients $c_n$ are constants, not functions of $x$.
3.  **Errors in the power term.** Writing $(x-a)^n$ as $x^n$ when the series is not centered at $a=0$. The power term must match the center point where the derivatives were evaluated.
4.  **Incorrect starting index.** Forgetting that the sum starts at $n=0$, and that $0! = 1$ and $f^{(0)}(x) = f(x)$.

## Self-check
1.  Find the first four non-zero terms of the Taylor series for $f(x) = e^{-x^2}$ centered at $a=0$.
2.  Derive the general Taylor series for $f(x) = \frac{1}{1-x}$ centered at $a=0$. Can you recognize this series?
3.  A function $g(x)$ is infinitely differentiable. Its Taylor series centered at $a=-1$ is given by $\sum_{n=0}^{\infty} \frac{2^n}{n+1} (x+1)^n$. What are the values of $g(-1)$, $g'(-1)$, and $g''(-1)$?