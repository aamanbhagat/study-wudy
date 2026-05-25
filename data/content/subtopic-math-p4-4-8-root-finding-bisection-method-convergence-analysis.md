## What it is
Convergence analysis for the bisection method is the formal mathematical proof of how quickly, and with what guarantees, the algorithm's approximation of a root approaches the true root. It provides a precise, *a priori* (before-the-fact) bound on the error after any given number of iterations. This analysis is what elevates the bisection method from a mere heuristic to a reliable, predictable engineering tool.

## Why it matters
While the bisection method is slow, its convergence is guaranteed. This makes it the "gold standard" for reliability against which faster but more temperamental methods (like Newton-Raphson or secant methods) are compared. In aerospace, you might use it in a preliminary trajectory calculation where a guaranteed, bounded error is more important than speed. In machine learning, understanding linear convergence (the class bisection belongs to) is fundamental to analyzing the performance of basic optimization algorithms.

## When to study it
You must have a firm grasp of the **Intermediate Value Theorem (IVT)** from calculus, as it is the theoretical bedrock of the method itself. You also need to be comfortable with the definitions of **sequences, limits, and absolute error**. Without these, the concept of "convergence" and its "rate" will be meaningless.

## How to study it (step by step)
1.  **State the Algorithm and Error:** First, write down the bisection algorithm formally. Let $r$ be the true root of $f(x)=0$ in an initial interval $[a_0, b_0]$. At step $n$, we have an interval $[a_n, b_n]$ and our approximation is the midpoint $c_n = (a_n + b_n)/2$. Define the absolute error at this step as $e_n = |c_n - r|$.
2.  **Bound the Error with the Interval:** The true root $r$ and the approximation $c_n$ are both contained within the interval $[a_n, b_n]$. The maximum possible distance between any two points in an interval is the length of the interval itself. The maximum distance from the midpoint $c_n$ to any other point in $[a_n, b_n]$ (including the root $r$) is half the interval's length. Derive this inequality: $e_n = |c_n - r| \le \frac{b_n - a_n}{2}$.
3.  **Express Interval Width Recursively:** At each step of the bisection method, the new interval's length is exactly half of the previous one. Write this relationship down: $b_n - a_n = \frac{1}{2}(b_{n-1} - a_{n-1})$. Unroll this recursion to get an expression in terms of the initial interval $[a_0, b_0]$: $b_n - a_n = \frac{b_0 - a_0}{2^n}$.
4.  **Combine for the Final Error Bound:** Substitute the result from step 3 into the inequality from step 2. This gives you the master formula for the error bound at step $n$: $e_n \le \frac{b_0 - a_0}{2^{n+1}}$. This is the central result.
5.  **Calculate Required Iterations:** Use the formula from step 4. Given a desired error tolerance $\epsilon$, solve the inequality $\frac{b_0 - a_0}{2^{n+1}} < \epsilon$ for $n$. This tells you, in advance, the maximum number of iterations required to guarantee the desired accuracy.
6.  **Define Linear Convergence:** A sequence of approximations $c_n$ converges linearly to a root $r$ if the ratio of successive errors approaches a constant $\mu \in (0, 1)$. Formally, $\lim_{n \to \infty} \frac{e_{n+1}}{e_n} = \mu$. For the bisection method, show that $\mu = 1/2$.

## Key ideas, with intuition
1.  **The Error is Trapped:** The most crucial concept is that the true root $r$ is always contained within the current working interval $[a_n, b_n]$. Our guess, $c_n$, is the dead center of this interval. Therefore, the guess can't be "wrong" by more than half the interval's width. The error is physically constrained.
    $$e_n = |c_n - r| \le \frac{b_n - a_n}{2}$$
2.  **Predictable Shrinking:** Unlike other methods where the improvement per step can vary wildly, the bisection method's interval of uncertainty shrinks by *exactly* a factor of 2 at every iteration. This is its defining characteristic: slow, but relentlessly predictable.
    $$ \text{Width}_n = \frac{\text{Width}_0}{2^n} $$
3.  **Logarithmic Work for Linear Precision:** Combining the above, the error bound shrinks exponentially: $e_n \le \frac{b_0 - a_0}{2^{n+1}}$. If you flip this around, it means to gain one extra bit of binary precision (i.e., to halve the error), you must perform exactly one more iteration. To gain one decimal digit of precision (dividing error by 10), you need to perform $\log_2(10) \approx 3.32$ iterations. The relationship between desired digits of accuracy and computational work is logarithmic.

## Worked example
**Problem:** A function $f(x)$ is continuous with $f(1) = -2$ and $f(2) = 5$. We want to find the root in $[1, 2]$ using the bisection method. How many iterations are required to guarantee that the absolute error is less than $\epsilon = 10^{-3}$?

**Solution:**
1.  **Identify Initial State:** The initial interval is $[a_0, b_0] = [1, 2]$. The initial interval width is $b_0 - a_0 = 1$. The desired error tolerance is $\epsilon = 10^{-3}$.
2.  **State the Error Bound Formula:** The error after $n$ iterations, $e_n$, is bounded by:
    $$ e_n \le \frac{b_0 - a_0}{2^{n+1}} $$
3.  **Set Up the Inequality:** We need to find the smallest integer $n$ that satisfies $e_n < \epsilon$.
    $$ \frac{1}{2^{n+1}} < 10^{-3} $$
4.  **Solve for n:**
    $$ 2^{n+1} > 10^3 $$
    $$ 2^{n+1} > 1000 $$
    Take the base-2 logarithm of both sides.
    $$ \log_2(2^{n+1}) > \log_2(1000) $$
    $$ n+1 > \log_2(1000) $$
    We know $2^{9} = 512$ and $2^{10} = 1024$. So, $\log_2(1000)$ is between 9 and 10. Specifically, $\log_2(1000) \approx 9.965$.
    $$ n+1 > 9.965 $$
    $$ n > 8.965 $$
5.  **Determine the Integer Number of Iterations:** Since $n$ must be an integer, the smallest integer value for $n$ that satisfies this inequality is $n=9$. *Correction*: The number of iterations is $n+1$. Let's use $N$ for the number of iterations. The error after $N$ iterations is bounded by $\frac{b_0-a_0}{2^N}$. Let's re-derive to be certain.
    - Iteration 1 ($N=1$): Interval becomes $[a_1, b_1]$ of width $(b_0-a_0)/2$. Approx $c_1$. Error $|c_1-r| \le (b_1-a_1)/2 = (b_0-a_0)/4$.
    - Iteration $N$: Interval becomes $[a_N, b_N]$ of width $(b_0-a_0)/2^N$. Approx $c_N$. Error $|c_N-r| \le (b_N-a_N)/2 = (b_0-a_0)/2^{N+1}$.
    The formula is correct. Let's re-read the variable. If $n$ is the index starting from 0, we need $n=9$, which means we compute $c_0, c_1, \dots, c_9$. This is 10 iterations. Let's call the number of iterations $N$. So we need $N > 8.965$, which means $N=9$ is incorrect. We need $N=10$ iterations.

**Reflection:**
- Step 1 established our starting conditions.
- Step 2 invoked the core theorem of bisection convergence.
- Step 3 translated the desired outcome into a mathematical inequality.
- Step 4 manipulated the inequality to isolate the variable we needed to find, $n$.
- Step 5 correctly interpreted the result as an integer number of discrete steps. The key is that $n$ must be an integer, so we round up to ensure the condition is met. We need 10 iterations.

## Diagrams
```text
Diagram 1: One step of the Bisection Method

f(x)
  ^
  |     /
  |    /
--|---*---------------------> x
 a_n  | \ c_n         b_n
      |  \
      |   * <-- Root r is here
      |    \
      *-----\------------
 f(a_n)<0   |       f(b_n)>0

Action:
1. Start with interval [a_n, b_n] where f(a_n) * f(b_n) < 0.
2. Compute midpoint c_n = (a_n + b_n) / 2.
3. Evaluate f(c_n).
4. Here, f(c_n) has same sign as f(a_n).
5. New interval becomes [a_{n+1}, b_{n+1}] = [c_n, b_n].
   The width is now halved.
```

```text
Diagram 2: Error vs. Iteration (Log-Linear Scale)

log(|e_n|)
  ^
  |
  +------------------- (Initial Error)
  | *
  |  *
  |   *
  |    *
  |     *
  |      *
  +-------*-----------> n (Iteration number)

This shows a straight line on a log-linear plot, which is the hallmark of
exponential decay (or linear convergence). The slope of this line is
related to log(1/2).
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Bisect Halves the Error **Bracket**." The key is that the error is always contained within a "bracket" (the interval $[a_n, b_n]$), and your guess is in the middle. The maximum error is half the bracket size. The bracket itself halves each time.
2.  **Formula to Overlearn:** This is the predictive error bound. Burn it into memory.
    $$ |c_n - r| \le \frac{b_0 - a_0}{2^{n+1}} $$
    Where $n$ is the iteration index starting at $n=0$.
3.  **Spaced Repetition Schedule:** Review this derivation and formula at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Actively re-derive it each time.
4.  **First Principles Pathway:** If you forget the formula, rebuild it:
    *   The root $r$ is inside $[a_n, b_n]$.
    *   The guess $c_n$ is the midpoint of $[a_n, b_n]$.
    *   The distance from the midpoint to any point in the interval is at most half the interval's width. So, $e_n \le \frac{1}{2}(b_n - a_n)$.
    *   The interval width halves at each step. So, $(b_n - a_n) = (b_0 - a_0)/2^n$.
    *   Substitute: $e_n \le \frac{1}{2} \left( \frac{b_0 - a_0}{2^n} \right) = \frac{b_0 - a_0}{2^{n+1}}$.

## Common mistakes
1.  **The "Off-by-One" Exponent:** Forgetting whether the denominator is $2^n$ or $2^{n+1}$. It's $2^{n+1}$ because the error bound is *half* the size of the $n$-th interval, which itself has a width of $(b_0-a_0)/2^n$.
2.  **Forgetting Preconditions:** The entire analysis is void if the function is not continuous, or if you don't start with an interval $[a,b]$ such that $f(a) \cdot f(b) < 0$. The guarantee of convergence vanishes without the IVT holding.
3.  **Confusing Iteration Count and Index:** If a question asks for a result after $N$ iterations, this corresponds to the index $n = N-1$ if you start your index at $n=0$. Be precise. The error after 1 iteration is $e_0 \le (b_0-a_0)/2$. After 2 iterations, the error is $e_1 \le (b_0-a_0)/4$. After $N$ iterations, the error is $e_{N-1} \le (b_0-a_0)/2^N$. My formula $|c_n - r| \le \frac{b_0 - a_0}{2^{n+1}}$ is for the error of the $(n+1)$-th approximation. Be careful with definitions. A safer way is to say the error after $N$ iterations is bounded by $\frac{b_0-a_0}{2^N}$. No, that's the interval width. It's half of that. So $\frac{b_0-a_0}{2^{N+1}}$. Let's stick to the formula and be clear $n$ is the number of bisections performed. After 1 bisection ($n=1$), width is $(b_0-a_0)/2$, error bound is $(b_0-a_0)/4$. My formula $|c_n - r| \le \frac{b_0 - a_0}{2^{n+1}}$ assumes $n$ is the index starting from 0. Let's use $N$ for number of iterations. Error after $N$ iterations is $\le \frac{b_0-a_0}{2^{N+1}}$. In the example, $N > 8.965$ so $N=9$ iterations. Let's re-re-check. $N=9 \implies 2^{10} = 1024 > 1000$. Yes, 9 iterations. The 9th midpoint $c_8$ is computed. The error is $e_8$.

## Self-check
1.  You use the bisection method on an initial interval of length $L=1$. How many iterations are required to reduce the error bound by a factor of 1000?
2.  Consider finding the root of $f(x) = \cos(x) - x$ starting with the interval $[0, 1]$. What is the smallest integer $N$ such that after $N$ iterations, the absolute error is guaranteed to be less than $10^{-7}$?
3.  The bisection method has a convergence rate constant of $\mu=1/2$, since $e_{n+1}/e_n \approx 1/2$. Suppose you have a (fictional) "trisection method" that divides the interval into three equal parts, checks signs, and keeps the subinterval that must contain the root. What is the convergence rate constant $\mu$ for this method? Is it better or worse than bisection?