## 1. What it is — in plain English

Imagine you have a really wiggly, complicated curve, like the path of a roller coaster or the shape of a sound wave. Now, imagine you want to describe that curve using only simple, straight lines or gentle parabolas. That's a bit like what a Maclaurin series does for functions in mathematics.

A Maclaurin series is a way to "unwrap" a complex function (like $e^x$, $\sin x$, or $\ln(1+x)$) into an infinite sum of much simpler pieces: polynomials. Think of it like building a very detailed Lego model. Instead of having one giant, custom-shaped Lego brick, you use many small, standard rectangular bricks to approximate that shape more and more accurately.

Specifically, a Maclaurin series is a special type of "power series" (a polynomial with infinitely many terms) that tries to perfectly match a function and all its derivatives *at a single point*, which is $x=0$. By matching the function's value, its slope, its curvature, and so on, at $x=0$, the polynomial approximation becomes incredibly good very close to $x=0$. As you add more and more terms, the approximation gets better and better, and often, it becomes an *exact* representation of the original function over a certain range.

## 2. Why it matters — real-world applications

Maclaurin series (and their more general form, Taylor series) are foundational tools in almost every quantitative field. They allow us to approximate complex behavior with simpler polynomial functions, which are much easier to manipulate and compute.

1.  **Computer Science & Numerical Methods**: When your calculator or computer software calculates the value of $\sin(0.5)$, $e^{1.2}$, or $\ln(3)$, it's not looking up a value in a giant table. Instead, it's very likely using a truncated Maclaurin (or Taylor) series. For example, to compute $e^x$, the software might sum up the first 10-15 terms of its Maclaurin series. This provides a highly accurate approximation very quickly, crucial for high-performance computing, graphics rendering, and scientific simulations.

2.  **Physics & Engineering (Small Angle Approximations)**: In physics, especially for oscillations or wave phenomena, we often deal with $\sin \theta$ or $\cos \theta$. For small angles $\theta$, the Maclaurin series for $\sin \theta$ is $\theta - \theta^3/3! + \dots$. If $\theta$ is small enough, we can approximate $\sin \theta \approx \theta$. This "small angle approximation" simplifies complex differential equations (e.g., for a simple pendulum) and makes many problems tractable. Similarly, $(1+x)^n \approx 1+nx$ for small $x$ is used in optics, fluid dynamics, and error analysis.

3.  **Aerospace & Control Systems**: Designing stable aircraft or spacecraft control systems often involves analyzing the behavior of functions near an equilibrium point. Taylor series expansions linearize non-linear systems around these points, allowing engineers to use linear control theory, which is much simpler. For example, approximating the aerodynamics around a specific flight condition using series helps predict stability and design autopilots.

4.  **Signal Processing**: While Fourier series are more commonly associated with signal processing, the underlying idea of representing complex functions (signals) as a sum of simpler, known functions (sines and cosines in Fourier's case, polynomials in Taylor's) is the same. Understanding Taylor series builds intuition for these more advanced techniques, which are critical in audio compression, image processing, and telecommunications.

## 3. Prerequisites — what you must know first

Before diving into Maclaurin series, ensure you have a solid grasp of the following concepts:

*   **Functions**: What a function is, how to evaluate it, and basic function notation ($f(x)$, $f(0)$).
*   **Derivatives**: How to compute first, second, third, and higher-order derivatives of common functions (polynomials, exponentials, trigonometric functions, logarithms). You should be comfortable with notation like $f'(x)$, $f''(x)$, $f'''(x)$, and $f^{(n)}(x)$.
*   **Polynomials**: Basic understanding of polynomial functions, their structure, and how to evaluate them.
*   **Limits**: Fundamental understanding of limits, especially for understanding convergence and the behavior of functions as $x$ approaches a value.
*   **Series**:
    *   **Sigma Notation**: How to read and write sums using $\sum$ notation.
    *   **Infinite Series**: The concept of an infinite sum $a_1 + a_2 + a_3 + \dots$.
    *   **Convergence of Series**: What it means for an infinite series to converge to a finite value.
    *   **Ratio Test**: A key test for determining the radius of convergence of a power series.
*   **Factorials**: The definition of $n! = n \times (n-1) \times \dots \times 2 \times 1$, and $0! = 1$.

If any of these concepts are unfamiliar, pause here and review them. A strong foundation will make learning Maclaurin series much smoother.

## 4. The core idea — step by step

The core idea behind a Maclaurin series is to create an "infinite polynomial" that perfectly mimics a given function $f(x)$ at $x=0$, not just in its value, but also in its slope, its curvature, and all its higher-order characteristics.

Let's say we want to approximate a function $f(x)$ with a polynomial $P(x)$. Since we are focusing on Maclaurin series, this approximation will be centered around $x=0$.
A general polynomial can be written as:
$$P(x) = c_0 + c_1 x + c_2 x^2 + c_3 x^3 + \dots + c_n x^n + \dots$$
Our goal is to find the coefficients $c_0, c_1, c_2, \dots$ such that $P(x)$ behaves exactly like $f(x)$ at $x=0$.

### Step 1: Matching the function's value at $x=0$

**Plain English:** We want our approximating polynomial to have the same height as the original function exactly at the point $x=0$.

**Concrete Example:** If $f(x) = e^x$, then $f(0) = e^0 = 1$. So, we want $P(0)$ to also be $1$.

**Formal/Mathematical Version:**
Let $P(x) = c_0 + c_1 x + c_2 x^2 + c_3 x^3 + \dots$
Evaluate $P(x)$ at $x=0$:
$$P(0) = c_0 + c_1(0) + c_2(0)^2 + c_3(0)^3 + \dots$$
$$P(0) = c_0$$
For $P(0)$ to match $f(0)$, we must have:
$$c_0 = f(0)$$

**What could go wrong:** Forgetting to evaluate the function (and later, its derivatives) *at $x=0$*. The entire series is built around this specific point.

### Step 2: Matching the function's slope (first derivative) at $x=0$

**Plain English:** Not only do we want the polynomial to have the same height, but we also want it to be going up or down at the same rate as the original function exactly at $x=0$. We want their tangent lines to be identical at $x=0$.

**Concrete Example:** If $f(x) = e^x$, then $f'(x) = e^x$, so $f'(0) = e^0 = 1$. We want $P'(0)$ to also be $1$.

**Formal/Mathematical Version:**
First, find the derivative of $P(x)$:
$$P'(x) = c_1 + 2c_2 x + 3c_3 x^2 + 4c_4 x^3 + \dots$$
Now, evaluate $P'(x)$ at $x=0$:
$$P'(0) = c_1 + 2c_2(0) + 3c_3(0)^2 + \dots$$
$$P'(0) = c_1$$
For $P'(0)$ to match $f'(0)$, we must have:
$$c_1 = f'(0)$$

**What could go wrong:** Making an error in differentiation, or forgetting that the derivative of $c_0$ is $0$.

### Step 3: Matching the function's concavity (second derivative) at $x=0$

**Plain English:** Beyond height and slope, we want the polynomial to curve in the same way as the original function at $x=0$. Is it curving upwards (concave up) or downwards (concave down)? We want that to match.

**Concrete Example:** If $f(x) = e^x$, then $f''(x) = e^x$, so $f''(0) = e^0 = 1$. We want $P''(0)$ to also be $1$.

**Formal/Mathematical Version:**
Find the second derivative of $P(x)$:
$$P''(x) = 2c_2 + 3 \cdot 2 c_3 x + 4 \cdot 3 c_4 x^2 + \dots$$
Evaluate $P''(x)$ at $x=0$:
$$P''(0) = 2c_2 + 3 \cdot 2 c_3(0) + 4 \cdot 3 c_4(0)^2 + \dots$$
$$P''(0) = 2c_2$$
For $P''(0)$ to match $f''(0)$, we must have:
$$2c_2 = f''(0) \implies c_2 = \frac{f''(0)}{2}$$

**What could go wrong:** Forgetting the factor of $2$ in the denominator for $c_2$. The pattern is starting to emerge, and missing a factor here will throw off the entire series.

### Step 4: Matching higher-order derivatives at $x=0$

**Plain English:** We continue this process indefinitely. We want the third derivative (rate of change of concavity), the fourth derivative, and so on, to all match between the polynomial and the original function at $x=0$. Each higher derivative helps the polynomial fit the function more accurately further away from $x=0$.

**Concrete Example:** If $f(x) = e^x$, then $f'''(x) = e^x$, so $f'''(0) = e^0 = 1$. We want $P'''(0)$ to also be $1$.

**Formal/Mathematical Version:**
Find the third derivative of $P(x)$:
$$P'''(x) = 3 \cdot 2 \cdot 1 c_3 + 4 \cdot 3 \cdot 2 c_4 x + \dots$$
Evaluate $P'''(x)$ at $x=0$:
$$P'''(0) = 3 \cdot 2 \cdot 1 c_3$$
For $P'''(0)$ to match $f'''(0)$, we must have:
$$3 \cdot 2 \cdot 1 c_3 = f'''(0) \implies c_3 = \frac{f'''(0)}{3 \cdot 2 \cdot 1} = \frac{f'''(0)}{3!}$$

**What could go wrong:** Miscalculating the product of numbers (which will become factorials) in the denominator. This is where the factorial notation becomes very useful.

### Step 5: Generalizing the pattern for the coefficients

**Plain English:** We've seen a clear pattern emerge for $c_0, c_1, c_2, c_3$. Let's write it down for any $n$.

**Formal/Mathematical Version:**
From the previous steps, we have:
$c_0 = f(0) = \frac{f^{(0)}(0)}{0!}$ (since $0! = 1$ and $f^{(0)}(0)$ means $f(0)$)
$c_1 = f'(0) = \frac{f^{(1)}(0)}{1!}$
$c_2 = \frac{f''(0)}{2} = \frac{f^{(2)}(0)}{2!}$
$c_3 = \frac{f'''(0)}{3 \cdot 2 \cdot 1} = \frac{f^{(3)}(0)}{3!}$

It appears that for any $n$, the $n$-th coefficient $c_n$ is given by:
$$c_n = \frac{f^{(n)}(0)}{n!}$$
where $f^{(n)}(0)$ is the $n$-th derivative of $f(x)$ evaluated at $x=0$.

**What could go wrong:** Not recognizing the factorial pattern. This pattern is the heart of the Maclaurin series formula.

### Step 6: The Maclaurin Series Formula

**Plain English:** Now that we have a general formula for all the coefficients, we can substitute them back into our infinite polynomial to get the full Maclaurin series.

**Formal/Mathematical Version:**
Substitute $c_n = \frac{f^{(n)}(0)}{n!}$ into $P(x) = c_0 + c_1 x + c_2 x^2 + c_3 x^3 + \dots + c_n x^n + \dots$:
$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!} x^n$$
This expands to:
$$f(x) = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \dots$$

This is the Maclaurin series for $f(x)$. It represents $f(x)$ as an infinite polynomial, provided the series converges.

**What could go wrong:** Confusing Maclaurin series with Taylor series. A Maclaurin series is simply a Taylor series centered at $a=0$. A general Taylor series is $\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^n$.

## 5. Worked examples — multiple, with every step shown

We will now derive the Maclaurin series for the five specified functions. For each, we'll follow these steps:
1.  Calculate the first few derivatives of $f(x)$.
2.  Evaluate these derivatives at $x=0$.
3.  Substitute these values into the Maclaurin series formula.
4.  Write out the series in expanded form and in sigma notation.
5.  Determine the radius of convergence using the Ratio Test.

### Example 1: Maclaurin series of $f(x) = e^x$

**Problem:** Derive the Maclaurin series for $f(x) = e^x$ and find its radius of convergence.

**Given:** $f(x) = e^x$.
**Want:** Maclaurin series for $e^x$ and its radius of convergence.

**Step 1: Calculate derivatives of $f(x)$**
$f(x) = e^x$
$f'(x) = e^x$
$f''(x) = e^x$
$f'''(x) = e^x$
...
$f^{(n)}(x) = e^x$
*Explanation: The exponential function $e^x$ is unique in that its derivative is always itself.*

**Step 2: Evaluate derivatives at $x=0$**
$f(0) = e^0 = 1$
$f'(0) = e^0 = 1$
$f''(0) = e^0 = 1$
$f'''(0) = e^0 = 1$
...
$f^{(n)}(0) = e^0 = 1$
*Explanation: We substitute $x=0$ into each derivative. Since all derivatives are $e^x$, they all evaluate to $e^0 = 1$.*

**Step 3: Substitute into the Maclaurin series formula**
The Maclaurin series formula is $f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!} x^n$.
Substitute $f^{(n)}(0) = 1$:
$$e^x = \sum_{n=0}^{\infty} \frac{1}{n!} x^n$$
*Explanation: We replace $f^{(n)}(0)$ with the value we found (which is 1) into the general formula.*

**Step 4: Write out the series in expanded form**
For $n=0$: $\frac{1}{0!} x^0 = \frac{1}{1} \cdot 1 = 1$
For $n=1$: $\frac{1}{1!} x^1 = \frac{1}{1} x = x$
For $n=2$: $\frac{1}{2!} x^2 = \frac{1}{2} x^2$
For $n=3$: $\frac{1}{3!} x^3 = \frac{1}{6} x^3$
...
So, the expanded series is:
$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \dots$$
*Explanation: We write out the first few terms by plugging in $n=0, 1, 2, 3, \dots$ into the sigma notation.*

**Step 5: Determine the radius of convergence using the Ratio Test**
The Ratio Test states that a series $\sum a_n$ converges if $\lim_{n \to \infty} \left| \frac{a_{n+1}}{a_n} \right| < 1$.
Here, $a_n = \frac{x^n}{n!}$.
So, $a_{n+1} = \frac{x^{n+1}}{(n+1)!}$.
$$\lim_{n \to \infty} \left| \frac{a_{n+1}}{a_n} \right| = \lim_{n \to \infty} \left| \frac{x^{n+1}}{(n+1)!} \cdot \frac{n!}{x^n} \right|$$
$$ = \lim_{n \to \infty} \left| \frac{x \cdot x^n}{(n+1) \cdot n!} \cdot \frac{n!}{x^n} \right|$$
$$ = \lim_{n \to \infty} \left| \frac{x}{n+1} \right|$$
$$ = |x| \lim_{n \to \infty} \frac{1}{n+1}$$
$$ = |x| \cdot 0$$
$$ = 0$$
Since $0 < 1$ for all values of $x$, the series converges for all $x$.
The radius of convergence is $R = \infty$.
*Explanation: We apply the Ratio Test, which is standard for power series. We simplify the ratio of consecutive terms and find that the limit is 0, regardless of $x$. This means the series converges everywhere.*

**Final Answer:**
The Maclaurin series for $e^x$ is:
$$ \boxed{e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots} $$
The radius of convergence is $R = \infty$.

*Reflection:* The derivation for $e^x$ is straightforward because all its derivatives are the same. This makes it a great first example to understand the process. The infinite radius of convergence means this polynomial representation is exact for any real number $x$.

---

### Example 2: Maclaurin series of $f(x) = \sin x$

**Problem:** Derive the Maclaurin series for $f(x) = \sin x$ and find its radius of convergence.

**Given:** $f(x) = \sin x$.
**Want:** Maclaurin series for $\sin x$ and its radius of convergence.

**Step 1: Calculate derivatives of $f(x)$**
$f(x) = \sin x$
$f'(x) = \cos x$
$f''(x) = -\sin x$
$f'''(x) = -\cos x$
$f^{(4)}(x) = \sin x$
$f^{(5)}(x) = \cos x$
...
*Explanation: The derivatives of $\sin x$ cycle with a period of 4.*

**Step 2: Evaluate derivatives at $x=0$**
$f(0) = \sin(0) = 0$
$f'(0) = \cos(0) = 1$
$f''(0) = -\sin(0) = 0$
$f'''(0) = -\cos(0) = -1$
$f^{(4)}(0) = \sin(0) = 0$
$f^{(5)}(0) = \cos(0) = 1$
...
*Explanation: We substitute $x=0$ into each derivative. Notice that all even-numbered derivatives (including $f^{(0)}(0)$) evaluate to 0, and odd-numbered derivatives alternate between 1 and -1.*

**Step 3: Substitute into the Maclaurin series formula**
$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!} x^n$
Since $f^{(n)}(0) = 0$ for even $n$, only the odd terms will contribute to the sum.
For odd $n$, let $n = 2k+1$ for $k=0, 1, 2, \dots$.
$f^{(2k+1)}(0)$ alternates between $1$ (for $k=0, 2, \dots$) and $-1$ (for $k=1, 3, \dots$). This can be represented as $(-1)^k$.
So, $f^{(2k+1)}(0) = (-1)^k$.
$$ \sin x = \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k+1)!} x^{2k+1} $$
*Explanation: We identify the pattern of the non-zero terms. Only odd powers of $x$ appear, and their coefficients alternate in sign. We use $2k+1$ to represent odd numbers and $(-1)^k$ to capture the alternating sign.*

**Step 4: Write out the series in expanded form**
For $k=0$ ($n=1$): $\frac{(-1)^0}{(2 \cdot 0 + 1)!} x^{2 \cdot 0 + 1} = \frac{1}{1!} x^1 = x$
For $k=1$ ($n=3$): $\frac{(-1)^1}{(2 \cdot 1 + 1)!} x^{2 \cdot 1 + 1} = \frac{-1}{3!} x^3 = -\frac{x^3}{3!}$
For $k=2$ ($n=5$): $\frac{(-1)^2}{(2 \cdot 2 + 1)!} x^{2 \cdot 2 + 1} = \frac{1}{5!} x^5 = \frac{x^5}{5!}$
For $k=3$ ($n=7$): $\frac{(-1)^3}{(2 \cdot 3 + 1)!} x^{2 \cdot 3 + 1} = \frac{-1}{7!} x^7 = -\frac{x^7}{7!}$
...
So, the expanded series is:
$$\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \dots$$
*Explanation: We write out the first few terms by plugging in $k=0, 1, 2, 3, \dots$ into the sigma notation.*

**Step 5: Determine the radius of convergence using the Ratio Test**
Here, $a_k = \frac{(-1)^k x^{2k+1}}{(2k+1)!}$.
So, $a_{k+1} = \frac{(-1)^{k+1} x^{2(k+1)+1}}{(2(k+1)+1)!} = \frac{(-1)^{k+1} x^{2k+3}}{(2k+3)!}$.
$$\lim_{k \to \infty} \left| \frac{a_{k+1}}{a_k} \right| = \lim_{k \to \infty} \left| \frac{(-1)^{k+1} x^{2k+3}}{(2k+3)!} \cdot \frac{(2k+1)!}{(-1)^k x^{2k+1}} \right|$$
$$ = \lim_{k \to \infty} \left| \frac{-1 \cdot x^2}{(2k+3)(2k+2)} \right|$$
$$ = |x^2| \lim_{k \to \infty} \frac{1}{(2k+3)(2k+2)}$$
$$ = |x^2| \cdot 0$$
$$ = 0$$
Since $0 < 1$ for all values of $x$, the series converges for all $x$.
The radius of convergence is $R = \infty$.
*Explanation: We apply the Ratio Test. The terms $(-1)^k$ cancel out in magnitude. We simplify the factorials and powers of $x$. The limit goes to 0 as $k \to \infty$, indicating convergence for all $x$.*

**Final Answer:**
The Maclaurin series for $\sin x$ is:
$$ \boxed{\sin x = \sum_{k=0}^{\infty} \frac{(-1)^k x^{2k+1}}{(2k+1)!} = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \dots} $$
The radius of convergence is $R = \infty$.

*Reflection:* The alternating signs and the presence of only odd powers of $x$ are characteristic of $\sin x$. This is due to its odd function symmetry ($\sin(-x) = -\sin x$). The cyclical nature of its derivatives is key to identifying the pattern.

---

### Example 3: Maclaurin series of $f(x) = \cos x$

**Problem:** Derive the Maclaurin series for $f(x) = \cos x$ and find its radius of convergence.

**Given:** $f(x) = \cos x$.
**Want:** Maclaurin series for $\cos x$ and its radius of convergence.

**Step 1: Calculate derivatives of $f(x)$**
$f(x) = \cos x$
$f'(x) = -\sin x$
$f''(x) = -\cos x$
$f'''(x) = \sin x$
$f^{(4)}(x) = \cos x$
$f^{(5)}(x) = -\sin x$
...
*Explanation: Similar to $\sin x$, the derivatives of $\cos x$ also cycle with a period of 4.*

**Step 2: Evaluate derivatives at $x=0$**
$f(0) = \cos(0) = 1$
$f'(0) = -\sin(0) = 0$
$f''(0) = -\cos(0) = -1$
$f'''(0) = \sin(0) = 0$
$f^{(4)}(0) = \cos(0) = 1$
$f^{(5)}(0) = -\sin(0) = 0$
...
*Explanation: We substitute $x=0$ into each derivative. Notice that all odd-numbered derivatives evaluate to 0, and even-numbered derivatives (including $f^{(0)}(0)$) alternate between 1 and -1.*

**Step 3: Substitute into the Maclaurin series formula**
$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!} x^n$
Since $f^{(n)}(0) = 0$ for odd $n$, only the even terms will contribute to the sum.
For even $n$, let $n = 2k$ for $k=0, 1, 2, \dots$.
$f^{(2k)}(0)$ alternates between $1$ (for $k=0, 2, \dots$) and $-1$ (for $k=1, 3, \dots$). This can be represented as $(-1)^k$.
So, $f^{(2k)}(0) = (-1)^k$.
$$ \cos x = \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k)!} x^{2k} $$
*Explanation: We identify the pattern of the non-zero terms. Only even powers of $x$ appear, and their coefficients alternate in sign. We use $2k$ to represent even numbers and $(-1)^k$ to capture the alternating sign.*

**Step 4: Write out the series in expanded form**
For $k=0$ ($n=0$): $\frac{(-1)^0}{(2 \cdot 0)!} x^{2 \cdot 0} = \frac{1}{0!} x^0 = 1 \cdot 1 = 1$
For $k=1$ ($n=2$): $\frac{(-1)^1}{(2 \cdot 1)!} x^{2 \cdot 1} = \frac{-1}{2!} x^2 = -\frac{x^2}{2!}$
For $k=2$ ($n=4$): $\frac{(-1)^2}{(2 \cdot 2)!} x^{2 \cdot 2} = \frac{1}{4!} x^4 = \frac{x^4}{4!}$
For $k=3$ ($n=6$): $\frac{(-1)^3}{(2 \cdot 3)!} x^{2 \cdot 3} = \frac{-1}{6!} x^6 = -\frac{x^6}{6!}$
...
So, the expanded series is:
$$\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \dots$$
*Explanation: We write out the first few terms by plugging in $k=0, 1, 2, 3, \dots$ into the sigma notation.*

**Step 5: Determine the radius of convergence using the Ratio Test**
Here, $a_k = \frac{(-1)^k x^{2k}}{(2k)!}$.
So, $a_{k+1} = \frac{(-1)^{k+1} x^{2(k+1)}}{(2(k+1))!} = \frac{(-1)^{k+1} x^{2k+2}}{(2k+2)!}$.
$$\lim_{k \to \infty} \left| \frac{a_{k+1}}{a_k} \right| = \lim_{k \to \infty} \left| \frac{(-1)^{k+1} x^{2k+2}}{(2k+2)!} \cdot \frac{(2k)!}{(-1)^k x^{2k}} \right|$$
$$ = \lim_{k \to \infty} \left| \frac{-1 \cdot x^2}{(2k+2)(2k+1)} \right|$$
$$ = |x^2| \lim_{k \to \infty} \frac{1}{(2k+2)(2k+1)}$$
$$ = |x^2| \cdot 0$$
$$ = 0$$
Since $0 < 1$ for all values of $x$, the series converges for all $x$.
The radius of convergence is $R = \infty$.
*Explanation: We apply the Ratio Test. Similar to $\sin x$, the terms $(-1)^k$ cancel, and the limit goes to 0 as $k \to \infty$, indicating convergence for all $x$.*

**Final Answer:**
The Maclaurin series for $\cos x$ is:
$$ \boxed{\cos x = \sum_{k=0}^{\infty} \frac{(-1)^k x^{2k}}{(2k)!} = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \dots} $$
The radius of convergence is $R = \infty$.

*Reflection:* The Maclaurin series for $\cos x$ contains only even powers of $x$, matching its property as an even function ($\cos(-x) = \cos x$). The alternating signs are also present. Notice the close relationship between the series for $\sin x$ and $\cos x$ and $e^x$ (which hint at Euler's formula $e^{ix} = \cos x + i \sin x$).

---

### Example 4: Maclaurin series of $f(x) = \ln(1+x)$

**Problem:** Derive the Maclaurin series for $f(x) = \ln(1+x)$ and find its radius of convergence.

**Given:** $f(x) = \ln(1+x)$.
**Want:** Maclaurin series for $\ln(1+x)$ and its radius of convergence.

**Step 1: Calculate derivatives of $f(x)$**
$f(x) = \ln(1+x)$
$f'(x) = \frac{1}{1+x} = (1+x)^{-1}$
$f''(x) = -1(1+x)^{-2}$
$f'''(x) = (-1)(-2)(1+x)^{-3} = 2(1+x)^{-3}$
$f^{(4)}(x) = 2(-3)(1+x)^{-4} = -6(1+x)^{-4}$
$f^{(5)}(x) = -6(-4)(1+x)^{-5} = 24(1+x)^{-5}$
...
*Explanation: We apply the power rule and chain rule repeatedly. Notice the alternating signs and increasing coefficients.*

**Step 2: Evaluate derivatives at $x=0$**
$f(0) = \ln(1+0) = \ln(1) = 0$
$f'(0) = (1+0)^{-1} = 1$
$f''(0) = -1(1+0)^{-2} = -1$
$f'''(0) = 2(1+0)^{-3} = 2$
$f^{(4)}(0) = -6(1+0)^{-4} = -6$
$f^{(5)}(0) = 24(1+0)^{-5} = 24$
...
Let's find the general pattern for $f^{(n)}(0)$ for $n \ge 1$:
$f^{(n)}(x) = (-1)^{n-1} (n-1)! (1+x)^{-n}$
So, $f^{(n)}(0) = (-1)^{n-1} (n-1)! (1+0)^{-n} = (-1)^{n-1} (n-1)!$ for $n \ge 1$.
*Explanation: We substitute $x=0$ into each derivative. The $f(0)$ term is 0. For $n \ge 1$, we observe a pattern involving factorials and alternating signs. $f'(0) = 1 = (-1)^0 0!$, $f''(0) = -1 = (-1)^1 1!$, $f'''(0) = 2 = (-1)^2 2!$, etc.*

**Step 3: Substitute into the Maclaurin series formula**
$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!} x^n$
The $n=0$ term is $\frac{f(0)}{0!} x^0 = \frac{0}{1} \cdot 1 = 0$.
For $n \ge 1$, we use $f^{(n)}(0) = (-1)^{n-1} (n-1)!$:
$$ \ln(1+x) = \sum_{n=1}^{\infty} \frac{(-1)^{n-1} (n-1)!}{n!} x^n $$
$$ \ln(1+x) = \sum_{n=1}^{\infty} \frac{(-1)^{n-1}}{n} x^n $$
*Explanation: We handle the $n=0$ term separately because $f(0)=0$. For $n \ge 1$, we substitute the general form of $f^{(n)}(0)$ and simplify the factorial term $\frac{(n-1)!}{n!} = \frac{1}{n}$.*

**Step 4: Write out the series in expanded form**
For $n=1$: $\frac{(-1)^{1-1}}{1} x^1 = \frac{1}{1} x = x$
For $n=2$: $\frac{(-1)^{2-1}}{2} x^2 = \frac{-1}{2} x^2 = -\frac{x^2}{2}$
For $n=3$: $\frac{(-1)^{3-1}}{3} x^3 = \frac{1}{3} x^3 = \frac{x^3}{3}$
For $n=4$: $\frac{(-1)^{4-1}}{4} x^4 = \frac{-1}{4} x^4 = -\frac{x^4}{4}$
...
So, the expanded series is:
$$\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \dots$$
*Explanation: We write out the first few terms by plugging in $n=1, 2, 3, 4, \dots$ into the sigma notation.*

**Step 5: Determine the radius of convergence using the Ratio Test**
Here, $a_n = \frac{(-1)^{n-1} x^n}{n}$.
So, $a_{n+1} = \frac{(-1)^{n} x^{n+1}}{n+1}$.
$$\lim_{n \to \infty} \left| \frac{a_{n+1}}{a_n} \right| = \lim_{n \to \infty} \left| \frac{(-1)^n x^{n+1}}{n+1} \cdot \frac{n}{(-1)^{n-1} x^n} \right|$$
$$ = \lim_{n \to \infty} \left| \frac{-1 \cdot x \cdot n}{n+1} \right|$$
$$ = |x| \lim_{n \to \infty} \frac{n}{n+1}$$
$$ = |x| \cdot 1$$
$$ = |x|$$
For convergence, we need $|x| < 1$.
The radius of convergence is $R = 1$.
*Explanation: We apply the Ratio Test. The terms $(-1)^{n-1}$ and $(-1)^n$ result in a factor of $-1$ in the ratio, which disappears with the absolute value. The limit of $n/(n+1)$ as $n \to \infty$ is 1. Thus, the series converges for $|x|<1$.*

**Final Answer:**
The Maclaurin series for $\ln(1+x)$ is:
$$ \boxed{\ln(1+x) = \sum_{n=1}^{\infty} \frac{(-1)^{n-1} x^n}{n} = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \dots} $$
The radius of convergence is $R = 1$.

*Reflection:* This series is an example where the radius of convergence is finite ($R=1$). It's also known as the Mercator series. Note that the series does not include a constant term because $\ln(1+0) = \ln(1) = 0$. The alternating signs are prominent here as well. This series converges at $x=1$ (alternating harmonic series) but diverges at $x=-1$ (harmonic series).

---

### Example 5: Maclaurin series of $f(x) = (1+x)^n$ (Binomial Series)

**Problem:** Derive the Maclaurin series for $f(x) = (1+x)^n$ for any real number $n$, and find its radius of convergence. This is known as the Binomial Series.

**Given:** $f(x) = (1+x)^n$. Note that $n$ can be any real number (not necessarily an integer).
**Want:** Maclaurin series for $(1+x)^n$ and its radius of convergence.

**Step 1: Calculate derivatives of $f(x)$**
$f(x) = (1+x)^n$
$f'(x) = n(1+x)^{n-1}$
$f''(x) = n(n-1)(1+x)^{n-2}$
$f'''(x) = n(n-1)(n-2)(1+x)^{n-3}$
...
$f^{(k)}(x) = n(n-1)(n-2)\dots(n-k+1)(1+x)^{n-k}$
*Explanation: We repeatedly apply the power rule. The exponents decrease by 1, and each time we multiply by the current exponent.*

**Step 2: Evaluate derivatives at $x=0$**
$f(0) = (1+0)^n = 1$
$f'(0) = n(1+0)^{n-1} = n$
$f''(0) = n(n-1)(1+0)^{n-2} = n(n-1)$
$f'''(0) = n(n-1)(n-2)(1+0)^{n-3} = n(n-1)(n-2)$
...
$f^{(k)}(0) = n(n-1)(n-2)\dots(n-k+1)$
*Explanation: We substitute $x=0$ into each derivative. The $(1+0)$ term becomes 1, simplifying the expressions.*

**Step 3: Substitute into the Maclaurin series formula**
$f(x) = \sum_{k=0}^{\infty} \frac{f^{(k)}(0)}{k!} x^k$
For $k=0$: $f(0) = 1$. The term is $\frac{1}{0!} x^0 = 1$.
For $k \ge 1$: $f^{(k)}(0) = n(n-1)(n-2)\dots(n-k+1)$.
We can define the binomial coefficient $\binom{n}{k}$ as:
$\binom{n}{k} = \frac{n(n-1)\dots(n-k+1)}{k!}$ for $k \ge 1$.
And $\binom{n}{0} = 1$.
So, $\frac{f^{(k)}(0)}{k!} = \binom{n}{k}$.
$$ (1+x)^n = \sum_{k=0}^{\infty} \binom{n}{k} x^k $$
*Explanation: We recognize the pattern of the coefficients as the generalized binomial coefficients. This compact notation makes the series easy to write.*

**Step 4: Write out the series in expanded form**
For $k=0$: $\binom{n}{0} x^0 = 1 \cdot 1 = 1$
For $k=1$: $\binom{n}{1} x^1 = n x$
For $k=2$: $\binom{n}{2} x^2 = \frac{n(n-1)}{2!} x^2$
For $k=3$: $\binom{n}{3} x^3 = \frac{n(n-1)(n-2)}{3!} x^3$
...
So, the expanded series is:
$$(1+x)^n = 1 + nx + \frac{n(n-1)}{2!}x^2 + \frac{n(n-1)(n-2)}{3!}x^3 + \dots$$
*Explanation: We write out the first few terms by plugging in $k=0, 1, 2, 3, \dots$ into the sigma notation.*

**Step 5: Determine the radius of convergence using the Ratio Test**
Here, $a_k = \binom{n}{k} x^k = \frac{n(n-1)\dots(n-k+1)}{k!} x^k$.
So, $a_{k+1} = \binom{n}{k+1} x^{k+1} = \frac{n(n-1)\dots(n-k+1)(n-k)}{(k+1)!} x^{k+1}$.
$$\lim_{k \to \infty} \left| \frac{a_{k+1}}{a_k} \right| = \lim_{k \to \infty} \left| \frac{n(n-1)\dots(n-k+1)(n-k)}{(k+1)!} x^{k+1} \cdot \frac{k!}{n(n-1)\dots(n-k+1) x^k} \right|$$
$$ = \lim_{k \to \infty} \left| \frac{(n-k) x}{k+1} \right|$$
$$ = |x| \lim_{k \to \infty} \left| \frac{n-k}{k+1} \right|$$
$$ = |x| \lim_{k \to \infty} \left| \frac{n/k - 1}{1 + 1/k} \right|$$
$$ = |x| \left| \frac{0 - 1}{1 + 0} \right|$$
$$ = |x| \cdot 1$$
$$ = |x|$$
For convergence, we need $|x| < 1$.
The radius of convergence is $R = 1$.
*Important Note:* If $n$ is a non-negative integer, the series terminates (becomes a finite polynomial) because $\binom{n}{k} = 0$ for $k > n$. In this case, the series converges for all $x$, and the radius of convergence is $\infty$. This is the standard Binomial Theorem. However, for non-integer $n$, the series is infinite, and the radius of convergence is $R=1$.

**Final Answer:**
The Maclaurin series (Binomial Series) for $(1+x)^n$ is:
$$ \boxed{(1+x)^n = \sum_{k=0}^{\infty} \binom{n}{k} x^k = 1 + nx + \frac{n(n-1)}{2!}x^2 + \frac{n(n-1)(n-2)}{3!}x^3 + \dots} $$
The radius of convergence is $R = 1$ (for non-integer $n$) or $R = \infty$ (for non-negative integer $n$).

*Reflection:* This is a very powerful generalization of the Binomial Theorem. It allows us to expand expressions like $\sqrt{1+x} = (1+x)^{1/2}$ or $1/(1-x) = (1-x)^{-1}$ into power series. The radius of convergence is $R=1$ for non-integer $n$, which means this approximation is only valid for $x$ values between -1 and 1.

---

## 6. Common mistakes and traps

1.  **Forgetting to evaluate derivatives at $x=0$**: Students often compute $f^{(n)}(x)$ correctly but then plug $f^{(n)}(x)$ directly into the series formula instead of $f^{(n)}(0)$. Remember, Maclaurin series are specifically centered at $x=0$.
2.  **Incorrect factorial in the denominator**: The formula is $\frac{f^{(n)}(0)}{n!} x^n$. A common error is to omit the factorial or to use the wrong factorial (e.g., $n$ instead of $n!$).
3.  **Sign errors in alternating series**: For functions like $\sin x$, $\cos x$, and $\ln(1+x)$, the signs often alternate. Careless calculation of derivatives or incorrect application of $(-1)^n$ or $(-1)^{n-1}$ can lead to wrong signs.
4.  **Not simplifying the general term**: Especially for $\ln(1+x)$ and $(1+x)^n$, the general term $\frac{f^{(n)}(0)}{n!}$ can often be significantly simplified (e.g., $\frac{(n-1)!}{n!} = \frac{1}{n}$). Failing to simplify makes the series harder to recognize and analyze.
5.  **Incorrectly applying the Ratio Test**: Mistakes in algebraic manipulation when setting up the ratio $\left| \frac{a_{n+1}}{a_n} \right|$ or incorrect evaluation of the limit can lead to an incorrect radius of convergence.
6.  **Assuming convergence for all $x$**: While $e^x$, $\sin x$, and $\cos x$ have an infinite radius of convergence, functions like $\ln(1+x)$ and $(1+x)^n$ have a finite radius of convergence ($R=1$). Forgetting to check this or assuming $R=\infty$ for all series is a significant error.
7.  **Confusing Maclaurin and Taylor series**: Remember, Maclaurin is a *special case* of Taylor series where the expansion point is $a=0$. If the problem asks for a Taylor series centered at $a \ne 0$, the formula changes to $\frac{f^{(n)}(a)}{n!} (x-a)^n$.

## 7. Textbook-precise explanation

The concept of a Maclaurin series is a specific instance of a Taylor series, which represents a function as an infinite sum of terms calculated from the values of the function's derivatives at a single point.

**Definition (Taylor Series):**
If a function $f$ has derivatives of all orders in an interval $I$ containing $a$, then the Taylor series of $f(x)$ centered at $a$ (or about $a$) is given by:
$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^n$$
$$f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \frac{f'''(a)}{3!}(x-a)^3 + \dots$$

**Definition (Maclaurin Series):**
The Maclaurin series is a special case of the Taylor series where the center $a$ is $0$. If a function $f$ has derivatives of all orders in an interval containing $0$, then the Maclaurin series of $f(x)$ is given by:
$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!} x^n$$
$$f(x) = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \dots$$

**Convergence:**
For the series to accurately represent $f(x)$, it must converge to $f(x)$. The series converges to $f(x)$ if the remainder term $R_n(x)$ approaches zero as $n \to \infty$. The remainder term is given by Taylor's Formula:
$$R_n(x) = \frac{f^{(n+1)}(c)}{(n+1)!} (x-a)^{n+1}$$
for some $c$ between $a$ and $x$. If $\lim_{n \to \infty} R_n(x) = 0$ for all $x$ in an interval $I$, then $f(x)$ is equal to its Taylor (or Maclaurin) series on that interval. The interval of convergence is typically found using the Ratio Test.

**Reference:**
*   Stewart, James. *Calculus: Early Transcendentals*. 9th ed., Cengage Learning, 2021. (See Chapter 11, Section 11.10, "Taylor and Maclaurin Series")
*   Apostol, Tom M. *Calculus, Vol. 1: One-Variable Calculus with an Introduction to Linear Algebra*. 2nd ed., John Wiley & Sons, 1967. (See Chapter 7, Section 7.15, "Taylor's Formula with Remainder")

## 8. ASCII diagrams

Let's visualize how a Maclaurin series approximates a function near $x=0$. We'll use $f(x) = e^x$ as an example.

The Maclaurin series for $e^x$ is $1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots$
Let $P_n(x)$ denote the $n$-th degree Maclaurin polynomial (the sum of terms up to $x^n$).

```text
       ^ y
       |
       |             f(x) = e^x
       |            /
       |           /
       |          /
       |         /
       |        /
       |       /
       |      /
       |     /
       |    /
       |   /
       |  /
       | /
       *-------------------------------------> x
      (0,1)

P_0(x) = 1
  This is a horizontal line, matching f(0) at x=0.

       ^ y
       |
       |             f(x) = e^x
       |            /
       |           /
       |          /
       |         /
       |        /
       |       /
       |      /
       |     /
       |    /
       |   /
       |  / P_0(x)
       | /
-------*-------------------------------------> x
      (0,1)

P_1(x) = 1 + x
  This is the tangent line to f(x) at x=0. It matches f(0) and f'(0).

       ^ y
       |
       |             f(x) = e^x
       |            /
       |           /
       |          /
       |         /
       |        /
       |       /
       |      /
       |     /
       |    /
       |   / P_1(x)
       |  /
-------*-------------------------------------> x
      (0,1)

P_2(x) = 1 + x + x^2/2!
  This is a parabola, matching f(0), f'(0), and f''(0).
  It curves with f(x) at x=0, providing a better local approximation.

       ^ y
       |
       |             f(x) = e^x
       |            /
       |           /
       |          /
       |         /
       |        /
       |       /
       |      /
       |     /
       |    /
       |   /  P_2(x)
       |  /
-------*-------------------------------------> x
      (0,1)

As you add more terms (higher degree polynomials), the approximation
P_n(x) hugs the original function f(x) more closely, and for a
larger interval around x=0. For e^x, sin x, and cos x, the series
converges to the function for all x. For ln(1+x) and (1+x)^n,
it converges only for |x|<1.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **"Taylor's Theorem: F-D-F-D"**: This helps remember the structure of the coefficients.
        *   **F**unction: $f^{(n)}(0)$ (the $n$-th derivative of the function evaluated at 0)
        *   **D**ivide: /
        *   **F**actorial: $n!$
        *   **D**egree: $x^n$ (the $n$-th power of $x$)
    *   **"ESC-LB" for the functions**:
        *   **E**xponential ($e^x$): All $1/n!$ terms.
        *   **S**ine ($\sin x$): Only **S**ingle (odd) powers, **S**igns alternate.
        *   **C**osine ($\cos x$): Only **C**ouple (even) powers, **C**hanging signs.
        *   **L**ogarithm ($\ln(1+x)$): **L**inear ($x, x^2/2, x^3/3...$) but alternating signs.
        *   **B**inomial ($(1+x)^n$): **B**inomial coefficients.

2.  **The 1-3 formulas/facts they MUST overlearn:**
    *   **The General Maclaurin Series Formula:**
        $$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!} x^n$$
    *   **The Maclaurin Series for $e^x$:**
        $$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots = \sum_{n=0}^{\infty} \frac{x^n}{n!}$$
    *   **The Maclaurin Series for $\sin x$ and $\cos x$ (together):**
        $$\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots = \sum_{k=0}^{\infty} \frac{(-1)^k x^{2k+1}}{(2k+1)!}$$
        $$\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \dots = \sum_{k=0}^{\infty} \frac{(-1)^k x^{2k}}{(2k)!}$$
        *Key distinction: $\sin x$ has odd powers, $\cos x$ has even powers.*

3.  **Spaced-repetition schedule:**
    *   **Review 1:** In 1 day (tomorrow)
    *   **Review 2:** In 3 days
    *   **Review 3:** In 7 days (1 week)
    *   **Review 4:** In 16 days (approx. 2.5 weeks)
    *   **Review 5:** In 35 days (approx. 5 weeks)
    *   *For each review, try to re-derive at least one series from scratch and state the general formula and its purpose.*

4.  **The first-principles re-derivation pathway:**
    If you ever forget the Maclaurin series formula, you can always rebuild it by asking:
    *   "If I want a polynomial $P(x) = c_0 + c_1 x + c_2 x^2 + c_3 x^3 + \dots$ to approximate $f(x)$ at $x=0$, what must be true?"
    *   **Step 1:** $P(0) = f(0) \implies c_0 = f(0)$
    *   **Step 2:** $P'(x) = c_1 + 2c_2 x + 3c_3 x^2 + \dots \implies P'(0) = f'(0) \implies c_1 = f'(0)$
    *   **Step 3:** $P''(x) = 2c_2 + 3 \cdot 2 c_3 x + \dots \implies P''(0) = f''(0) \implies 2c_2 = f''(0) \implies c_2 = \frac{f''(0)}{2!}$
    *   **Step 4:** $P'''(x) = 3 \cdot 2 \cdot 1 c_3 + \dots \implies P'''(0) = f'''(0) \implies 3!c_3 = f'''(0) \implies c_3 = \frac{f'''(0)}{3!}$
    *   **Generalize:** This pattern shows $c_n = \frac{f^{(n)}(0)}{n!}$.
    *   **Substitute back:** $f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!} x^n$.
    This pathway allows you to derive the formula from first principles, ensuring you never truly "forget" it.

## 10. Connections — what this leads to

Understanding Maclaurin series is a gateway to many advanced topics in mathematics and its applications:

*   **Taylor Series (General Case)**: Maclaurin series are just Taylor series centered at $a=0$. The general Taylor series allows you to approximate functions around any point $a$, which is crucial for analyzing local behavior of functions far from the origin.
*   **Power Series Representation of Functions**: Maclaurin/Taylor series are examples of power series. The study of power series (their convergence, differentiation, and integration properties) is fundamental in advanced calculus and analysis. Many functions can be defined by their power series.
*   **Solving Differential Equations with Series**: Many differential equations cannot be solved using elementary functions. Power series methods provide a powerful technique to find series solutions to these equations (e.g., Bessel's equation, Legendre's equation).
*   **Euler's Formula ($e^{ix} = \cos x + i \sin x$)**: By substituting $ix$ into the Maclaurin series for $e^x$ and separating real and imaginary terms, you can directly derive Euler's formula, which bridges exponential, trigonometric, and complex numbers. This is a cornerstone of complex analysis.
*   **Complex Analysis**: Taylor and Laurent series are central to the study of complex functions. They allow us to understand the analyticity of complex functions and are used in contour integration and residue theory.
*   **Fourier Series**: While different in nature (using sines and cosines as basis functions), Fourier series share the core idea of representing complex periodic functions as infinite sums of simpler, orthogonal functions. Understanding Taylor series helps build intuition for such representations.
*   **Numerical Analysis and Approximation Theory**: Maclaurin/Taylor series are fundamental for numerical methods. They provide polynomial approximations that are easy to compute, essential for algorithms that evaluate functions, perform numerical integration, or solve equations. The remainder term is crucial for error analysis.
*   **Special Functions**: Many special functions in physics and engineering (e.g., Bessel functions, Gamma function) are defined by or can be represented by power series.

## 11. Self-check questions

1.  Derive the Maclaurin series for $f(x) = e^{-x}$. What is its radius of convergence? How does it relate to the series for $e^x$?
2.  Derive the Maclaurin series for $f(x) = \cosh x = \frac{e^x + e^{-x}}{2}$. Use the known Maclaurin series for $e^x$ and $e^{-x}$ to verify your result.
3.  Derive the Maclaurin series for $f(x) = \frac{1}{1-x}$. What is its radius of convergence? (Hint: This can be done by direct derivation or by recognizing it as a geometric series or a binomial series).
4.  Find the first four non-zero terms of the Maclaurin series for $f(x) = \arctan x$. What is its radius of convergence? (Hint: Consider the integral of the series for $\frac{1}{1+x^2}$).
5.  Using known Maclaurin series, find the Maclaurin series for $f(x) = x \sin(2x)$. What is its radius of convergence?