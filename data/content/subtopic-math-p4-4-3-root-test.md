## What it is
The Root Test is a criterion for determining the absolute convergence of an infinite series. It examines the long-term behavior of the $n$-th root of the absolute value of the series' terms. If this root approaches a limit less than 1, the series converges absolutely; if it approaches a limit greater than 1, the series diverges.

## Why it matters
The Root Test is fundamental for finding the **radius of convergence** of power series, which are used to represent functions like $e^x$ or $\sin(x)$. In physics and aerospace, solutions to differential equations (e.g., those describing orbital mechanics or quantum wave functions) are often found as power series, and the Root Test determines the domain where these solutions are valid and physically meaningful.

## When to study it
Before tackling the Root Test, you must have a firm grasp of the following:
*   **Limits of Sequences:** Specifically, limits as $n \to \infty$, including indeterminate forms and L'Hôpital's Rule. You must know that $\lim_{n \to \infty} n^{1/n} = 1$.
*   **Definition of Series Convergence:** Understand what it means for $\sum_{n=1}^{\infty} a_n$ to converge, diverge, and converge absolutely.
*   **The Geometric Series Test:** You must know that $\sum_{n=0}^{\infty} ar^n$ converges if and only if $|r|<1$. This is the theoretical backbone of the Root Test.
*   **The Direct Comparison Test:** This is used in the proof of the Root Test.

If any of these are weak, review them first. The Root Test builds directly upon them.

## How to study it (step by step)
1.  **Revisit the Geometric Series:** Write down the condition for convergence of $\sum r^n$. Intuitively, for convergence, the terms must shrink. The "common ratio" $r$ controls this shrinkage. The Root Test seeks to find an "effective" ratio for more complex series.
2.  **Derive the Convergence Case ($L<1$):** Let $L = \lim_{n \to \infty} \sqrt[n]{|a_n|} < 1$. By the definition of a limit, this means that for any $\epsilon > 0$, eventually all terms $\sqrt[n]{|a_n|}$ are within $\epsilon$ of $L$. Choose a number $r$ such that $L < r < 1$. Then for all $n$ past some large integer $N$, we must have $\sqrt[n]{|a_n|} < r$.
    *   This implies $|a_n| < r^n$ for all $n > N$.
    *   Since $0 < r < 1$, the geometric series $\sum r^n$ converges.
    *   By the Direct Comparison Test, since $|a_n|$ is eventually smaller than the terms of a convergent series, $\sum |a_n|$ must also converge. Therefore, $\sum a_n$ converges absolutely.
3.  **Derive the Divergence Case ($L>1$):** Let $L = \lim_{n \to \infty} \sqrt[n]{|a_n|} > 1$. By the definition of a limit, eventually (for $n > N$) we must have $\sqrt[n]{|a_n|} > 1$.
    *   This implies $|a_n| > 1^n = 1$.
    *   The terms of the series, $a_n$, do not approach zero.
    *   By the Test for Divergence, if $\lim_{n \to \infty} a_n \neq 0$, the series $\sum a_n$ must diverge.
4.  **Solve a canonical problem:** Apply the test to the series $\sum_{n=1}^{\infty} \left(\frac{5n}{2n+1}\right)^n$. Note how the $n$-th power makes the $n$-th root calculation trivial. This is the ideal use case for the Root Test.
5.  **Solve a problem where $L=1$:** Apply the test to $\sum \frac{1}{n}$ and $\sum \frac{1}{n^2}$. In both cases, you will find $L=1$ (using the fact that $\lim_{n \to \infty} n^{1/n} = 1$). Since the first series diverges and the second converges, this demonstrates why $L=1$ is inconclusive.
6.  **Compare with the Ratio Test:** Note that for any series where the Ratio Test yields a limit, the Root Test will yield the same limit. However, the Root Test is technically stronger and can succeed where the Ratio Test fails (e.g., for series with terms that are not strictly monotonic).

## Key ideas, with intuition
1.  **The series is being compared to a geometric series.** The core of the test is asking: "For very large $n$, does my term $|a_n|$ behave like $r^n$ for some ratio $r$?" Taking the $n$-th root is the perfect way to isolate this "effective" ratio: $\sqrt[n]{|a_n|} \approx \sqrt[n]{r^n} = r$.
2.  **The limit is the ultimate "effective ratio".** We don't care about the behavior for small $n$. The limit $L = \lim_{n \to \infty} \sqrt[n]{|a_n|}$ tells us the controlling ratio in the long run. If this ultimate ratio $L$ is less than 1, the terms shrink fast enough for convergence, just like a geometric series.
    $$ \text{For large } n, \sqrt[n]{|a_n|} \approx L \implies |a_n| \approx L^n $$
    So, $\sum a_n$ behaves like the geometric series $\sum L^n$.
3.  **The $L=1$ case is the boundary where the test loses precision.** When $L=1$, our terms $|a_n|$ behave roughly like $1^n=1$. This is too coarse an approximation. The series could be decreasing just fast enough to converge (like $\sum \frac{1}{n^2}$), or just slow enough to diverge (like $\sum \frac{1}{n}$). The Root Test cannot see this fine-grained difference.

## Worked example
Determine if the series $\sum_{n=1}^{\infty} \frac{n^2}{2^n}$ converges or diverges.

**Step 1: Identify the test.**
The term $a_n = \frac{n^2}{2^n}$ involves a power of $n$ in the numerator and an $n$-th power in the denominator. This structure is often suitable for the Ratio Test, but the Root Test also works well. Let's apply the Root Test.

**Step 2: Set up the limit.**
We need to compute $L = \lim_{n \to \infty} \sqrt[n]{|a_n|}$.
Since $a_n > 0$ for all $n \ge 1$, the absolute value is redundant.
$$ L = \lim_{n \to \infty} \sqrt[n]{\frac{n^2}{2^n}} $$

**Step 3: Simplify the expression inside the limit.**
The $n$-th root can be distributed to the numerator and denominator.
$$ L = \lim_{n \to \infty} \frac{\sqrt[n]{n^2}}{\sqrt[n]{2^n}} = \lim_{n \to \infty} \frac{(n^{1/n})^2}{2} $$

**Step 4: Evaluate the limit.**
We use the standard limit result $\lim_{n \to \infty} n^{1/n} = 1$.
$$ L = \frac{(\lim_{n \to \infty} n^{1/n})^2}{2} = \frac{1^2}{2} = \frac{1}{2} $$

**Step 5: Conclude based on the value of L.**
Since $L = \frac{1}{2} < 1$, the series $\sum_{n=1}^{\infty} \frac{n^2}{2^n}$ converges absolutely by the Root Test.

**Reflection:**
*   Step 1 worked because the structure of $a_n$ was amenable to taking an $n$-th root.
*   Step 3, simplifying the root, was the key algebraic manipulation.
*   Step 4 relied on knowing the fundamental limit $\lim_{n \to \infty} n^{1/n} = 1$. Without this prerequisite, the problem is a dead end.
*   Step 5 is a direct application of the test's conclusion.

## Diagrams
This diagram illustrates the comparison principle behind the Root Test for the case $L < 1$. We find a value $r$ between $L$ and $1$. For large $n$, the terms $|a_n|$ are forced to lie below the terms of the convergent geometric series $\sum r^n$.

```text
      ^
      |
term  |
value |
      |                                  ************  <-- y = r^n (convergent geometric series)
      |
      |                                 *
      |                                *
      |                              *
      |                             *
      |                        x    *
      |                  x    *
      |             x   *
      |          x *
      |        x*
      |      x*
      |    x*
      +----|-------------------------------------------> n
           N

Key:
*****  Terms of the geometric series r^n, where L < r < 1
xxxxx  Terms of our series |a_n|

For all n > N, we have |a_n| < r^n.
Since sum(r^n) converges, sum(|a_n|) must also converge.
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of the series as a plant. You take its $n$-th **root** to check its health.
    *   If the root's ultimate size ($L$) is **less than 1**, the plant is healthy and its growth is contained (it **converges**).
    *   If the root's ultimate size ($L$) is **greater than 1**, the plant is out of control and its growth is infinite (it **diverges**).
    *   If the root's ultimate size ($L$) is **exactly 1**, you can't tell from the root alone. You need a different tool to diagnose it (the test is **inconclusive**).

2.  **Must-know formulas:**
    Let $L = \lim_{n \to \infty} \sqrt[n]{|a_n|}$.
    *   If $L < 1$, $\sum a_n$ converges absolutely.
    *   If $L > 1$, $\sum a_n$ diverges.
    *   If $L = 1$, the test is inconclusive.

3.  **Spaced Repetition Schedule:**
    Review this material and attempt a new problem at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:**
    If you forget the formula, re-derive it from the **Direct Comparison Test with a Geometric Series**.
    *   Assume $\lim \sqrt[n]{|a_n|} = L < 1$.
    *   This means eventually $|a_n|^{1/n} < r$ for some $r$ with $L < r < 1$.
    *   So, $|a_n| < r^n$.
    *   $\sum r^n$ is a convergent geometric series because $|r|<1$.
    *   Therefore, $\sum |a_n|$ converges by comparison. The logic for $L>1$ follows from the Test for Divergence.

## Common mistakes
*   **Giving up at $L=1$:** Stating the series "diverges by the Root Test" when $L=1$. This is wrong. The test is *inconclusive*. You must say this and then apply a different test (like the Integral Test or Limit Comparison Test).
*   **Forgetting absolute value:** For series with negative terms, like $\sum (-1)^n a_n$, you must compute $\lim \sqrt[n]{|(-1)^n a_n|} = \lim \sqrt[n]{a_n}$. Forgetting this leads to an undefined root for odd $n$ if $a_n$ is negative.
*   **Botching the limit calculation:** A common error is assuming $\lim_{n \to \infty} (n^k)^{1/n} = 1$ is true for any expression. The limit $\lim_{n \to \infty} (f(n))^{1/n}$ can be complex. The most common case you must know is $\lim_{n \to \infty} (\text{polynomial in } n)^{1/n} = 1$.

## Self-check
Test your understanding with these. Do not look up the answers until you have committed to a solution.

1.  Use the Root Test to determine the convergence of $\sum_{n=1}^{\infty} \left(\frac{3n^2 - 1}{4n^2 + n}\right)^n$.
2.  Use the Root Test to determine the convergence of $\sum_{n=1}^{\infty} \frac{n^{10}}{10^n}$.
3.  What conclusion does the Root Test give for the series $\sum_{n=1}^{\infty} \left(1 - \frac{1}{n}\right)^{n^2}$? (Hint: Recall the limit definition of $e^x$).