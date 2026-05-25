## What it is
An infinite series is the sum of an infinite sequence of numbers. Since we cannot perform infinitely many additions, we define the "sum" of the series as the limit of its **sequence of partial sums**. A partial sum is simply the sum of the first $n$ terms; if this sequence of partial sums approaches a finite number as $n$ goes to infinity, the series **converges** to that number.

## Why it matters
This concept is fundamental to approximating complex functions and modeling physical systems. In aerospace engineering, the solutions to differential equations governing rocket trajectories are often expressed as infinite series (e.g., Taylor series), which are truncated for practical calculation. In machine learning, optimization algorithms like gradient descent can be viewed as a series of steps whose convergence to a minimum is critical.

## When to study it
You must have a solid grasp of **sequences and their limits** before tackling series. Specifically, you need to be comfortable with the formal definition of the limit of a sequence, $\lim_{n \to \infty} a_n = L$. Without this, the definition of series convergence will feel ungrounded and arbitrary.

## How to study it (step by step)
1.  **Start with a concrete example.** Consider the series $\sum_{n=1}^{\infty} \frac{1}{2^n}$. Write out the first few terms of the underlying sequence $\{a_n\}$: $\frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{16}, \dots$.
2.  **Construct the sequence of partial sums.** By hand, calculate the first four partial sums, denoted by $\{S_n\}$:
    *   $S_1 = a_1 = \frac{1}{2}$
    *   $S_2 = a_1 + a_2 = \frac{1}{2} + \frac{1}{4} = \frac{3}{4}$
    *   $S_3 = a_1 + a_2 + a_3 = \frac{3}{4} + \frac{1}{8} = \frac{7}{8}$
    *   $S_4 = a_1 + a_2 + a_3 + a_4 = \frac{7}{8} + \frac{1}{16} = \frac{15}{16}$
3.  **Find the pattern.** Observe the sequence $\{S_n\} = \{\frac{1}{2}, \frac{3}{4}, \frac{7}{8}, \frac{15}{16}, \dots\}$. Hypothesize a closed-form formula for the $n$-th partial sum. Here, it appears $S_n = \frac{2^n - 1}{2^n} = 1 - \frac{1}{2^n}$.
4.  **Take the limit.** Now, treat $\{S_n\}$ like any other sequence and find its limit as $n \to \infty$.
    $$ \lim_{n \to \infty} S_n = \lim_{n \to \infty} \left(1 - \frac{1}{2^n}\right) = 1 - 0 = 1 $$
5.  **State the conclusion.** Because the limit of the sequence of partial sums exists and is finite, the series converges. The sum of the series is defined to be this limit. Thus, $\sum_{n=1}^{\infty} \frac{1}{2^n} = 1$.
6.  **Contrast with a divergent series.** Consider the harmonic series $\sum_{n=1}^{\infty} \frac{1}{n}$. Write out its first few partial sums: $S_1=1, S_2=1.5, S_3 \approx 1.83, S_4 \approx 2.08$. There is no obvious closed-form, but notice that these sums seem to grow without bound. Proving that $\lim_{n \to \infty} S_n = \infty$ confirms this series diverges.

## Key ideas, with intuition
1.  **An infinite sum is a limit in disguise.** You never "finish" adding the terms. Instead, you observe the trend of the running total. The core idea is transforming the question about a series, $\sum a_n$, into a question about a sequence, $\{S_n\}$. We have tools to analyze sequences; we use them here.

2.  **The sequence of terms $\{a_n\}$ and the sequence of partial sums $\{S_n\}$ are different objects.** The terms $a_n$ are what you are adding at each step. The partial sums $S_n$ are the cumulative totals. For a series to converge, the terms $a_n$ must go to zero. But this is not enough! The harmonic series has terms $a_n = 1/n$ which go to zero, but the series still diverges. The key is how *fast* the terms go to zero.

3.  **Convergence means "settling down".** A series converges if its partial sums eventually get arbitrarily close to a single finite value and stay there. If the partial sums oscillate indefinitely (e.g., $\sum (-1)^n$) or grow infinitely large (e.g., $\sum 1/n$), the series diverges. The limit of the partial sums is the destination; convergence is reaching that destination.

    $$ \text{Series } \sum_{k=1}^{\infty} a_k \quad \xrightarrow{\text{is analyzed by}} \quad \text{Sequence of Partial Sums } \{S_n\}_{n=1}^{\infty} \text{ where } S_n = \sum_{k=1}^{n} a_k $$
    $$ \text{The series converges to } L \iff \lim_{n \to \infty} S_n = L $$

## Worked example
Determine if the series $\sum_{n=1}^{\infty} \frac{1}{n(n+1)}$ converges, and if so, find its sum.

**Step 1: Define the $n$-th partial sum, $S_n$.**
The $n$-th partial sum is the sum of the first $n$ terms:
$$ S_n = \sum_{k=1}^{n} \frac{1}{k(k+1)} $$

**Step 2: Simplify the general term $a_k$ using partial fraction decomposition.**
This is the key step for this type of problem, known as a telescoping series. We want to rewrite $a_k$ as a difference.
$$ \frac{1}{k(k+1)} = \frac{A}{k} + \frac{B}{k+1} $$
Multiplying by $k(k+1)$ gives $1 = A(k+1) + Bk$.
If $k=0$, $1 = A(1) \implies A=1$.
If $k=-1$, $1 = B(-1) \implies B=-1$.
So, $a_k = \frac{1}{k} - \frac{1}{k+1}$.

**Step 3: Write out the partial sum $S_n$ using the decomposed form.**
Let's write out the first few terms and the last term to see the pattern.
$$ S_n = \sum_{k=1}^{n} \left(\frac{1}{k} - \frac{1}{k+1}\right) $$
$$ S_n = \left(1 - \frac{1}{2}\right) + \left(\frac{1}{2} - \frac{1}{3}\right) + \left(\frac{1}{3} - \frac{1}{4}\right) + \dots + \left(\frac{1}{n} - \frac{1}{n+1}\right) $$

**Step 4: Cancel the intermediate terms.**
Notice that the second part of each term cancels with the first part of the next term. This is the "telescoping" effect.
$$ S_n = 1 \cancel{- \frac{1}{2}} \cancel{+ \frac{1}{2}} \cancel{- \frac{1}{3}} \cancel{+ \frac{1}{3}} - \dots \cancel{+ \frac{1}{n}} - \frac{1}{n+1} $$
Only the first and last parts remain.
$$ S_n = 1 - \frac{1}{n+1} $$

**Step 5: Take the limit of the partial sums.**
Now we have a closed form for $S_n$, we can find its limit.
$$ \lim_{n \to \infty} S_n = \lim_{n \to \infty} \left(1 - \frac{1}{n+1}\right) = 1 - 0 = 1 $$

**Reflection:**
The series converges to 1. This worked because we could find a simple closed-form expression for $S_n$. The partial fraction decomposition in Step 2 was the critical insight that allowed the sum to collapse in Step 4. Most series do not have such a convenient closed form for their partial sums, which is why we will later develop convergence *tests* that don't require finding the sum explicitly.

## Diagrams
Here is a diagram showing the first few partial sums of $\sum_{n=1}^{\infty} \frac{1}{2^n}$ on a number line. Observe how they "home in" on the limit, $L=1$.

```text
<--|---------|---------|---------|---------|---------|----->
   0        S1=0.5      S2=0.75   S3=0.875  S4=0.9375 L=1

S1:  +----------------->
S2:  +-------------------------->
S3:  +----------------------------->
S4:  +------------------------------->
...
Sn:  approaching L=1 asymptotically
```

## Memory technique — remember this forever
1.  **Mnemonic:** "An infinite **S**eries is a **S**equence in disguise." The "disguise" is the summation symbol. To see its true nature, you must unmask it by looking at its **S**equence of **P**artial **S**ums.

2.  **Formulas to overlearn:**
    *   Definition of the $n$-th partial sum: $S_n = \sum_{k=1}^{n} a_k$
    *   Definition of the sum of a series: $\sum_{k=1}^{\infty} a_k = \lim_{n \to \infty} S_n$ (if the limit exists and is finite)

3.  **Spaced repetition schedule:** Review this lesson and re-derive the worked example at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First principles pathway:** If you forget everything, start from the basic question: "What does it mean to add up infinitely many things?" You can't. But you *can* add up $n$ things for any finite $n$. So, do that, call the result $S_n$, and then ask, "What happens to $S_n$ as I let $n$ get bigger and bigger?" That question is precisely the definition of a limit. You have just re-derived the entire concept.

## Common mistakes
1.  **Confusing the sequence of terms with the sequence of partial sums.** Students see $a_n = 1/n^2 \to 0$ and incorrectly think this is the value the series converges to. The limit of the terms $\{a_n\}$ must be zero for convergence, but the limit of the partial sums $\{S_n\}$ is the actual sum.
2.  **Assuming $\lim_{n \to \infty} a_n = 0$ guarantees convergence.** This is the most common trap. The harmonic series $\sum 1/n$ is the classic counterexample. The terms go to zero, but the sum grows infinitely large. The terms must go to zero *fast enough*.
3.  **Incorrectly simplifying the $n$-th partial sum.** In the telescoping series example, a common error is to be off by an index and cancel terms incorrectly, leading to a wrong formula for $S_n$. Always write out the first 2-3 terms and the last 1-2 terms explicitly to see the cancellation pattern clearly.

## Self-check
1.  Find the sum of the series $\sum_{n=0}^{\infty} \left(\frac{2}{3}\right)^n$. (Note the starting index is $n=0$).
2.  Find a formula for the $n$-th partial sum, $S_n$, of the series $\sum_{k=1}^{\infty} (\ln(k+1) - \ln(k))$. Does the series converge?
3.  Let $S_n$ be the $n$-th partial sum of the harmonic series $\sum_{k=1}^{\infty} \frac{1}{k}$. Prove that $S_{2n} - S_n > \frac{1}{2}$ for all $n \ge 1$. Use this fact to argue that the sequence $\{S_n\}$ cannot converge. (This is a more rigorous way to show divergence).