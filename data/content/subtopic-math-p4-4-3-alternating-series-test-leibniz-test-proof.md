## What it is
The Alternating Series Test, also known as the Leibniz Test, is a method for determining the convergence of an infinite series whose terms alternate in sign. A series of the form $\sum (-1)^{n+1} b_n$ converges if the magnitudes of the terms, $b_n$, are positive, decrease monotonically, and approach zero as $n$ approaches infinity.

## Why it matters
This test is fundamental for understanding Fourier series, which are used to represent complex periodic functions (like signals or wave phenomena) as a sum of simple sines and cosines. In aerospace engineering, Fourier analysis is critical for vibration analysis and control systems. In computer science, it's the foundation of the Fast Fourier Transform (FFT), a cornerstone algorithm in digital signal processing and image compression.

## When to study it
You must have a firm grasp of the definition of a sequence and a series, the concept of convergence (the limit of the sequence of partial sums), and limit laws for sequences. Most importantly, you must understand the **Monotone Convergence Theorem**, which states that a sequence that is both monotonic (non-increasing or non-decreasing) and bounded must converge. The proof of the Leibniz test relies directly on this theorem.

## How to study it (step by step)
1.  **State the Theorem Formally:** Write down the Leibniz Test. An alternating series $\sum_{n=1}^{\infty} (-1)^{n-1} b_n = b_1 - b_2 + b_3 - b_4 + \dots$ converges if it satisfies three conditions:
    *   $b_n > 0$ for all $n$. (The terms alternate sign due to $(-1)^{n-1}$.)
    *   $b_{n+1} \le b_n$ for all $n$ (or at least for all $n$ beyond some integer $N$). (The magnitudes are non-increasing.)
    *   $\lim_{n\to\infty} b_n = 0$. (The magnitudes approach zero.)

2.  **Build Intuition with Partial Sums:** Consider the sequence of partial sums, $S_N = \sum_{n=1}^{N} (-1)^{n-1} b_n$.
    *   $S_1 = b_1$
    *   $S_2 = b_1 - b_2$
    *   $S_3 = b_1 - b_2 + b_3$
    *   $S_4 = b_1 - b_2 + b_3 - b_4$
    Notice how we start at $b_1$, subtract a smaller amount $b_2$, then add an even smaller amount $b_3$, and so on. The partial sums "bounce" back and forth, but the jumps get smaller each time. Visualize this on a number line.

3.  **Prove Monotonicity of Even/Odd Partial Sums:** We will analyze the subsequences of even and odd partial sums separately.
    *   **Even partial sums ($S_{2k}$):**
        $S_{2(k+1)} = S_{2k+2} = S_{2k} + b_{2k+1} - b_{2k+2}$.
        Since $b_{n+1} \le b_n$, we have $b_{2k+1} - b_{2k+2} \ge 0$.
        Therefore, $S_{2(k+1)} \ge S_{2k}$. The sequence of even partial sums $\{S_{2k}\}$ is non-decreasing.
    *   **Odd partial sums ($S_{2k-1}$):**
        $S_{2(k+1)-1} = S_{2k+1} = S_{2k-1} - b_{2k} + b_{2k+1}$.
        Since $b_{n+1} \le b_n$, we have $-b_{2k} + b_{2k+1} \le 0$.
        Therefore, $S_{2(k+1)-1} \le S_{2k-1}$. The sequence of odd partial sums $\{S_{2k-1}\}$ is non-increasing.

4.  **Prove Boundedness:**
    *   For the even sums: $S_{2k} = b_1 - (b_2 - b_3) - (b_4 - b_5) - \dots - (b_{2k-2} - b_{2k-1}) - b_{2k}$. Each term in parentheses is non-negative, and $b_{2k}$ is positive. Thus, $S_{2k} \le b_1$ for all $k$. The non-decreasing sequence $\{S_{2k}\}$ is bounded above by $b_1$.
    *   For the odd sums: $S_{2k-1} = (b_1 - b_2) + (b_3 - b_4) + \dots + (b_{2k-3} - b_{2k-2}) + b_{2k-1}$. Each term in parentheses is non-negative, and $b_{2k-1}$ is positive. Thus $S_{2k-1} \ge S_2 = b_1 - b_2$. The non-increasing sequence $\{S_{2k-1}\}$ is bounded below by $b_1 - b_2$.

5.  **Apply the Monotone Convergence Theorem:**
    *   Since $\{S_{2k}\}$ is non-decreasing and bounded above, it must converge to a limit. Let $\lim_{k\to\infty} S_{2k} = L_{even}$.
    *   Since $\{S_{2k-1}\}$ is non-increasing and bounded below, it must converge to a limit. Let $\lim_{k\to\infty} S_{2k-1} = L_{odd}$.

6.  **Show the Limits are Equal:** Now we connect the two subsequences.
    $$S_{2k-1} = S_{2k} + b_{2k}$$
    Take the limit as $k \to \infty$ of both sides:
    $$\lim_{k\to\infty} S_{2k-1} = \lim_{k\to\infty} S_{2k} + \lim_{k\to\infty} b_{2k}$$
    We know $\lim_{n\to\infty} b_n = 0$ by condition (3), so $\lim_{k\to\infty} b_{2k} = 0$.
    $$L_{odd} = L_{even} + 0 \implies L_{odd} = L_{even}$$
    Since both the even and odd partial sums converge to the same limit, the entire sequence of partial sums $\{S_n\}$ converges to that limit. Therefore, the series converges.

## Key ideas, with intuition
1.  **The Squeezing Oscillation:** The partial sums oscillate back and forth. The non-increasing condition ($b_{n+1} \le b_n$) ensures the oscillations get smaller. The zero-limit condition ($\lim b_n = 0$) ensures the oscillations die out completely, forcing the sums to converge to a single point.

2.  **Two Subsequences Trapping the Limit:** The core of the proof is clever bookkeeping. We split the "bouncing" sequence of all partial sums into two well-behaved, monotonic subsequences: the even sums approaching from below and the odd sums approaching from above.
    $$S_2 \le S_4 \le S_6 \le \dots \le S \le \dots \le S_5 \le S_3 \le S_1$$

3.  **The Conditions are Essential, Not Optional:** Each of the three conditions is critical.
    *   Without `alternating signs`, it's not an alternating series.
    *   If `magnitudes don't decrease`, the sums can oscillate wildly and never settle (e.g., $1-1+1-1+\dots$).
    *   If `magnitudes don't approach zero`, the terms don't vanish, and the series must diverge by the $n$-th Term Test for Divergence.

## Worked example
**Problem:** Determine if the alternating harmonic series $\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n} = 1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \dots$ converges.

**Solution:**
We apply the Alternating Series Test. The series is of the form $\sum (-1)^{n+1} b_n$, where $b_n = \frac{1}{n}$.

1.  **Condition 1: $b_n > 0$**
    For $n \ge 1$, $b_n = \frac{1}{n}$ is always positive. This condition is met.

2.  **Condition 2: $b_{n+1} \le b_n$**
    We need to check if $\frac{1}{n+1} \le \frac{1}{n}$. Since $n+1 > n$ and both are positive, taking the reciprocal reverses the inequality. Thus, $\frac{1}{n+1} < \frac{1}{n}$ is true for all $n \ge 1$. The sequence of magnitudes is strictly decreasing. This condition is met.

3.  **Condition 3: $\lim_{n\to\infty} b_n = 0$**
    We evaluate the limit: $\lim_{n\to\infty} \frac{1}{n} = 0$. This condition is met.

**Conclusion:**
Since all three conditions of the Alternating Series Test are satisfied, the alternating harmonic series converges.

**Reflection:**
Each step was a direct verification of the theorem's prerequisites. Step 1 confirmed the terms had positive magnitude. Step 2 confirmed the oscillations were shrinking. Step 3 confirmed the oscillations would eventually die out. The test provides a definitive conclusion of convergence without needing to find the actual sum (which is $\ln 2$).

## Diagrams
This diagram shows the first few partial sums on a number line. Notice how the even sums ($S_2, S_4$) increase while the odd sums ($S_1, S_3$) decrease, and they "squeeze" in on the final sum $S$.

```text
<---|---------|---------|----S----|---------|---------|--->
   0         S2        S4       S3        S1        1.0

S1 = 1
   <-----------------------------------------o (S1)

S2 = 1 - 1/2 = 0.5
   ------------>o (S2)

S3 = 0.5 + 1/3 = 0.833...
                <-----------------o (S3)

S4 = 0.833... - 1/4 = 0.583...
       o------------> (S4)

The gap between S_n and S_{n+1} is |b_{n+1}|, which shrinks to zero.
The final sum S (ln 2 ≈ 0.693) is trapped between any S_even and S_odd.
```

## Memory technique — remember this forever
1.  **Mnemonic:** "The **L**eibniz **L**adder." Imagine the partial sums on a vertical ladder. You start at the top rung ($S_1$). You take a large step down ($b_2$), then a smaller step up ($b_3$), then an even smaller step down ($b_4$), and so on. The steps get smaller and smaller ($\lim b_n = 0$), so you stop bouncing and converge to a specific point on the ladder.

2.  **Must Overlearn:** The three conditions for convergence of $\sum (-1)^{n-1}b_n$:
    *   $b_n > 0$
    *   $b_{n+1} \le b_n$ (non-increasing magnitudes)
    *   $\lim_{n\to\infty} b_n = 0$

3.  **Spaced Repetition Schedule:** Review the proof and re-solve the alternating harmonic series example at these intervals:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget the test, rebuild it.
    *   "How do I prove a series converges?" By showing its sequence of partial sums, $S_N$, converges.
    *   "How do I show a sequence converges?" The Monotone Convergence Theorem is a powerful tool.
    *   "Is $S_N$ monotone?" No, it oscillates.
    *   "Can I find a monotone subsequence?" Yes, look at the even sums ($S_{2k}$) and odd sums ($S_{2k-1}$) separately.
    *   Prove one is non-decreasing and the other is non-increasing. Prove they are both bounded. Conclude they both converge.
    *   Finally, show their limits are equal by looking at the difference $S_{2k-1} - S_{2k} = b_{2k}$, which goes to zero.

## Common mistakes
1.  **Forgetting the Decreasing Condition:** Applying the test to a series like $1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \frac{1}{5} - \frac{1}{6} + \dots$ is correct. Applying it to $1 - \frac{1}{3} + \frac{1}{2} - \frac{1}{5} + \frac{1}{4} - \dots$ is incorrect because the magnitudes $1, \frac{1}{3}, \frac{1}{2}, \frac{1}{5}, \frac{1}{4}, \dots$ are not decreasing.
2.  **Assuming Absolute Convergence:** The AST only guarantees conditional convergence. The alternating harmonic series $\sum \frac{(-1)^{n+1}}{n}$ converges, but the series of its absolute values, $\sum \frac{1}{n}$, diverges. Do not conclude absolute convergence from the AST alone.
3.  **Misapplying the $n$-th Term Test:** If $\lim_{n\to\infty} b_n = L \ne 0$, the limit of the alternating terms $\lim_{n\to\infty} (-1)^{n-1}b_n$ does not exist (it oscillates between $-L$ and $L$). The series diverges by the $n$-th Term Test. The AST condition $\lim_{n\to\infty} b_n = 0$ is a special case required for convergence.

## Self-check
1.  Does the series $\sum_{n=2}^{\infty} \frac{(-1)^n}{\ln(n)}$ converge or diverge? Justify your answer using a test.
2.  Consider the alternating $p$-series, $\sum_{n=1}^{\infty} \frac{(-1)^{n-1}}{n^p}$. For which values of the real number $p$ does this series converge?
3.  Let $S = \sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n!}$. According to the logic of the AST proof, what is a rigorous upper bound on the error $|S - S_4|$, where $S_4$ is the 4th partial sum? (Do not simply state the error bound formula; use the inequalities from the proof itself.)