## What it is
A sequence is an infinitely long, ordered list of numbers, like $a_1, a_2, a_3, \dots$. We are concerned with four key properties that describe a sequence's long-term behavior: convergence (do the terms approach a single finite value?), divergence (do they not?), boundedness (are the terms confined within a certain range?), and monotonicity (are the terms consistently increasing or decreasing?).

## Why it matters
Sequences are the foundation for series, which are essential for approximating functions and solving differential equations. In aerospace, numerical methods for calculating a rocket's trajectory are iterative processes generating a sequence of position and velocity estimates that must converge to the true path. In machine learning, optimization algorithms like gradient descent generate a sequence of parameter values that ideally converge to the minimum of a loss function.

## When to study it
You must have a solid command of Calculus I, specifically the concept of limits of functions as a variable approaches infinity, i.e., $\lim_{x\to\infty} f(x)$. You also need proficiency in algebraic manipulation and an understanding of function properties like increasing/decreasing behavior. If you are not comfortable finding the limit of a rational function as $x \to \infty$, review that first.

## How to study it (step by step)
1.  **Formalize the Definition.** Understand that a sequence $\{a_n\}$ is formally a function $f: \mathbb{N} \to \mathbb{R}$ where $a_n = f(n)$. Graph the first 10-15 terms of simple sequences like $\{1/n\}$, $\{(-1)^n\}$, and $\{n/(n+1)\}$ as points $(n, a_n)$ to build visual intuition.
2.  **Master Convergence.** Study the formal definition of a limit: $\lim_{n\to\infty} a_n = L$. For any tiny tolerance $\epsilon > 0$, you can find a point $N$ in the sequence after which all terms $a_n$ are within the range $(L-\epsilon, L+\epsilon)$. The key practical tool: if there's a function $f(x)$ such that $f(n) = a_n$ for all integers $n$, then if $\lim_{x\to\infty} f(x) = L$, it follows that $\lim_{n\to\infty} a_n = L$. Use this to solve 5-10 limit problems.
3.  **Define Boundedness and Monotonicity.** A sequence is *bounded* if there are numbers $m$ and $M$ such that $m \le a_n \le M$ for all $n$. A sequence is *monotonic* if it is either non-decreasing ($a_n \le a_{n+1}$) or non-increasing ($a_n \ge a_{n+1}$) for all $n$.
4.  **Connect the Concepts.** Internalize the **Monotone Convergence Theorem**: Every bounded, monotonic sequence converges. Draw a picture of a sequence trapped between two horizontal lines (bounded) and always moving up (monotonic). Convince yourself it must "level off" somewhere.
5.  **Practice Classification.** Take a list of 10 sequences. For each one, determine if it is: (a) convergent or divergent, (b) bounded above, bounded below, or both, and (c) monotonic or not. This forces you to apply all definitions together.

## Key ideas, with intuition
1.  **Convergence is about the infinite tail.** The first billion terms of a sequence are irrelevant to its convergence. Convergence is solely determined by the behavior as $n \to \infty$. The question is: "Do the terms *eventually* get and stay arbitrarily close to some number $L$?"
2.  **Boundedness is a "fence".** A sequence is bounded if you can draw two horizontal lines, $y=M$ (an upper bound) and $y=m$ (a lower bound), such that the entire sequence lies between them. It can never escape this horizontal strip.
    $$ \exists M, m \in \mathbb{R} \text{ such that } m \le a_n \le M \text{ for all } n \ge 1 $$
3.  **Monotonicity is "one-way traffic".** A monotonic sequence never reverses its vertical direction. It's either always climbing (non-decreasing) or always falling (non-increasing). To check, you often analyze the sign of the difference $a_{n+1} - a_n$ or the ratio $a_{n+1}/a_n$.
4.  **The Monotone Convergence Theorem.** This is the crucial link. If a sequence is monotonic (always heading in one direction) and bounded (trapped in a fenced-off region), it has nowhere to go but to converge to a limit. It can't oscillate, and it can't shoot off to infinity. This theorem guarantees convergence even if you can't calculate the limit's value easily.

## Worked example
Let's analyze the sequence defined by $a_n = \frac{3n+1}{n+2}$ for $n \ge 1$.

**1. Test for Monotonicity:**
We'll check if the sequence is increasing or decreasing by examining $a_{n+1} - a_n$.
$$ a_{n+1} = \frac{3(n+1)+1}{(n+1)+2} = \frac{3n+4}{n+3} $$
$$ a_{n+1} - a_n = \frac{3n+4}{n+3} - \frac{3n+1}{n+2} $$
Find a common denominator:
$$ = \frac{(3n+4)(n+2) - (3n+1)(n+3)}{(n+3)(n+2)} $$
$$ = \frac{(3n^2 + 10n + 8) - (3n^2 + 10n + 3)}{(n+3)(n+2)} $$
$$ = \frac{5}{(n+3)(n+2)} $$
For $n \ge 1$, the denominator is always positive. Thus, $a_{n+1} - a_n > 0$, which implies $a_{n+1} > a_n$.
*Conclusion: The sequence is monotonically increasing.*

**2. Test for Boundedness:**
Since the sequence is increasing, its first term is a lower bound.
$a_1 = \frac{3(1)+1}{1+2} = \frac{4}{3}$. So, $a_n \ge \frac{4}{3}$ for all $n$. The sequence is bounded below.
To find an upper bound, let's look at the limit as $n \to \infty$.
$$ \lim_{n\to\infty} a_n = \lim_{n\to\infty} \frac{3n+1}{n+2} = \lim_{n\to\infty} \frac{n(3+1/n)}{n(1+2/n)} = \lim_{n\to\infty} \frac{3+1/n}{1+2/n} = \frac{3+0}{1+0} = 3 $$
Since the sequence is always increasing and approaches 3, it will never exceed 3. So, $a_n < 3$ for all $n$.
*Conclusion: The sequence is bounded, with $\frac{4}{3} \le a_n < 3$.*

**3. Determine Convergence:**
We already calculated the limit in the previous step.
$$ \lim_{n\to\infty} a_n = 3 $$
*Conclusion: The sequence converges to 3.*

**Reflection:**
- Step 1 (Monotonicity) worked because subtracting consecutive terms and analyzing the sign is a direct test of the definition $a_{n+1} > a_n$.
- Step 2 (Boundedness) worked because we combined the monotonicity result (first term is a lower bound) with a limit calculation to find the least upper bound.
- Step 3 (Convergence) was a direct application of limit laws from Calculus I. Notice how the Monotone Convergence Theorem is satisfied: the sequence is monotonic and bounded, so it must (and does) converge.

## Diagrams
A convergent, monotonic sequence like $a_n = \frac{3n+1}{n+2}$.

```text
a_n ^
    |
  3 +-------------------------------------  Limit L=3 (Upper Bound)
    |                 . . . . . . . . .
    |               .
    |             .
    |           .
    |         .
    |       .
4/3 +-----.-------------------------------  Lower Bound m=4/3
    |
    +-------------------------------------> n
      1   2   3   4   5   6   7   8
```

An oscillating, bounded sequence that does not converge, like $a_n = (-1)^n$.

```text
a_n ^
    |
  1 +-------.-----------.-----------.-----  Upper Bound M=1
    |       |           |           |
    |       |           |           |
  0 +-------+-----------+-----------+-----> n
    |       |           |           |
    |       |           |           |
 -1 +-------'-----------'-----------'-----  Lower Bound m=-1
    |
      1       2       3       4
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine a **M**onotonous **B**ull climbing a hill inside a **C**orral. The bull only goes up (monotonic), is trapped by the fence (bounded), so it must eventually stop at the top of the hill (converge). **M**onotonic + **B**ounded => **C**onvergent.
2.  **Must-Overlearn Formulas:**
    *   **Definition of a Limit:** $\lim_{n\to\infty} a_n = L$ if for every $\epsilon > 0$, there exists an integer $N$ such that if $n > N$, then $|a_n - L| < \epsilon$.
    *   **Monotone Convergence Theorem:** If a sequence $\{a_n\}$ is both monotonic and bounded, then it converges.
3.  **Spaced Repetition Schedule:** Review these ideas and re-work the example problem at these intervals: 1 day from now, 3 days from now, 7 days, 16 days, 35 days. Set calendar reminders.
4.  **First Principles Pathway:** If you forget everything, remember a sequence is just a set of points. To see if it converges, ask: "Do the y-values get closer and closer to one specific number as I move far to the right on the x-axis?" You can always calculate the first 10-20 terms and plot them to build intuition. The formal limit calculation, $\lim_{n\to\infty} a_n$, is the direct way to check this without theorems.

## Common mistakes
1.  **Confusing Bounded with Convergent:** The sequence $a_n = (-1)^n$ is bounded between -1 and 1, but it never settles on a single value, so it diverges. Boundedness is necessary for convergence, but not sufficient.
2.  **Assuming Non-Monotonic means Divergent:** The sequence $a_n = \frac{(-1)^n}{n}$ converges to 0. It is not monotonic (it alternates sign), but it converges. Monotonicity is a helpful condition, not a necessary one for convergence.
3.  **Algebra Errors in Monotonicity Tests:** When calculating $a_{n+1}-a_n$ or $a_{n+1}/a_n$, a simple sign error can lead to the wrong conclusion. Be meticulous with your algebra.
4.  **Forgetting to Check the "For All n" Condition:** A sequence is monotonic only if $a_{n+1} \ge a_n$ (or $\le$) holds for *all* $n$ (or at least for all $n$ past some point $N$). If it increases for a while and then decreases, it is not monotonic.

## Self-check
1.  Analyze the sequence $a_n = \frac{\cos(n\pi)}{n^2}$. Is it monotonic? Is it bounded? Does it converge?
2.  A sequence is defined recursively by $a_1 = \sqrt{3}$ and $a_{n+1} = \sqrt{3+a_n}$. Assume it converges to a limit $L$. First, find the value of $L$. Then, prove the sequence is (a) bounded above by 3 and (b) monotonically increasing.
3.  Construct an example of a sequence that is bounded below but not bounded above, and is not monotonic.