## What it is
A telescoping series is an infinite series whose partial sums eventually cancel in pairs, leaving only a fixed number of initial and final terms. The name comes from a collapsible telescope, where the intermediate sections slide into each other, leaving only the ends. This cancellation allows us to find a simple, closed-form expression for the $N$-th partial sum and thus easily evaluate the series' sum.

## Why it matters
This is one of the few types of infinite series for which we can find the exact sum, not just determine convergence. This technique is fundamental for manipulating sums in fields like quantum mechanics (e.g., calculating energy level differences) and signal processing (e.g., Fourier series analysis). In computer science, analyzing the complexity of certain recursive algorithms can lead to sums that telescope, simplifying the analysis.

## When to study it
Before tackling this, you must have a firm grasp of the following:
*   **Series Notation:** Fluency with sigma notation, $\sum$.
*   **Partial Sums:** The definition of the $N$-th partial sum, $S_N = \sum_{n=1}^{N} a_n$.
*   **Convergence:** The definition of a series' sum as the limit of its partial sums, $S = \lim_{N \to \infty} S_N$.
*   **Algebra:** Specifically, **partial fraction decomposition** is the primary tool used to transform a given series term into the necessary telescoping form. If you are not comfortable with this, review it first.

## How to study it (step by step)
1.  **Master the algebra.** Find the partial fraction decomposition of $\frac{2}{x^2 - 1}$. Verify that it is $\frac{1}{x-1} - \frac{1}{x+1}$. This algebraic skill is not optional; it is the key to unlocking the telescoping structure.
2.  **Write it out by hand.** Consider the series $\sum_{n=1}^{\infty} (\frac{1}{n} - \frac{1}{n+1})$. Write out the first five terms of the corresponding partial sum, $S_5$. Do not simplify yet. Just write them: $(1 - \frac{1}{2}) + (\frac{1}{2} - \frac{1}{3}) + (\frac{1}{3} - \frac{1}{4}) + (\frac{1}{4} - \frac{1}{5}) + (\frac{1}{5} - \frac{1}{6})$.
3.  **Identify the cancellation.** Now, use a pen to physically cross out the pairs that cancel: $-\frac{1}{2}$ with $+\frac{1}{2}$, $-\frac{1}{3}$ with $+\frac{1}{3}$, and so on. Observe what remains.
4.  **Formalize the partial sum.** Generalize your observation from step 3. Write out the formula for the $N$-th partial sum, $S_N$. You should find that $S_N = 1 - \frac{1}{N+1}$.
5.  **Take the limit.** Calculate the sum of the series by taking the limit of your closed-form partial sum: $S = \lim_{N \to \infty} S_N = \lim_{N \to \infty} (1 - \frac{1}{N+1})$.
6.  **Solve a harder case.** Repeat steps 2-5 for the series $\sum_{n=1}^{\infty} (\frac{1}{n} - \frac{1}{n+2})$. Pay close attention to which terms *don't* cancel. This will build your intuition for more complex cases.

## Key ideas, with intuition
1.  **The Goal: A Simple Formula for $S_N$.** Most series are difficult because there's no simple formula for their $N$-th partial sum, $S_N = a_1 + a_2 + \dots + a_N$. Telescoping series are special because this sum "collapses," giving us a very simple expression for $S_N$ that depends only on $N$ and a few constant terms.
2.  **The Structure: A Difference of Consecutive Terms.** The magic happens when each term $a_n$ can be written as a difference of terms from another sequence, $b_n$. The canonical form is $a_n = b_n - b_{n+1}$.
    $$
    S_N = \sum_{n=1}^{N} (b_n - b_{n+1}) = (b_1 - b_2) + (b_2 - b_3) + \dots + (b_N - b_{N+1})
    $$
    The $-b_2$ from the first term cancels the $+b_2$ from the second, and so on, down the line. All that remains is the first part of the first term and the last part of the last term:
    $$
    S_N = b_1 - b_{N+1}
    $$
3.  **The Sum is the Limit of the Leftovers.** Once you have the simple formula for $S_N$, finding the sum of the infinite series is trivial. You just take the limit.
    $$
    S = \lim_{N \to \infty} S_N = \lim_{N \to \infty} (b_1 - b_{N+1}) = b_1 - \lim_{N \to \infty} b_{N+1}
    $$
    The series converges if and only if $\lim_{N \to \infty} b_{N+1}$ exists.

## Worked example
Find the sum of the series $\sum_{n=1}^{\infty} \frac{1}{n(n+1)}$.

**Step 1: Analyze the term.**
The term is $a_n = \frac{1}{n(n+1)}$. This is not a geometric series or a p-series. The rational function form suggests that partial fraction decomposition might reveal a telescoping structure.

**Step 2: Perform partial fraction decomposition.**
We want to find constants $A$ and $B$ such that:
$$
\frac{1}{n(n+1)} = \frac{A}{n} + \frac{B}{n+1}
$$
Multiplying by $n(n+1)$ gives $1 = A(n+1) + Bn$.
If $n=0$, then $1 = A(1)$, so $A=1$.
If $n=-1$, then $1 = B(-1)$, so $B=-1$.
Thus, the term can be rewritten as:
$$
a_n = \frac{1}{n} - \frac{1}{n+1}
$$
This is the telescoping form $(b_n - b_{n+1})$ where $b_n = \frac{1}{n}$.

**Step 3: Write out the $N$-th partial sum, $S_N$.**
$$
S_N = \sum_{n=1}^{N} \left(\frac{1}{n} - \frac{1}{n+1}\right)
$$
Let's expand the first few terms and the last term to see the cancellation:
$$
S_N = \left(1 - \frac{1}{2}\right) + \left(\frac{1}{2} - \frac{1}{3}\right) + \left(\frac{1}{3} - \frac{1}{4}\right) + \dots + \left(\frac{1}{N} - \frac{1}{N+1}\right)
$$

**Step 4: Identify the cancellation and simplify $S_N$.**
The $-\frac{1}{2}$ cancels with the $+\frac{1}{2}$. The $-\frac{1}{3}$ cancels with the $+\frac{1}{3}$, and so on. Every intermediate term cancels out. The only terms that remain are the first part of the first term ($1$) and the last part of the last term ($-\frac{1}{N+1}$).
$$
S_N = 1 - \frac{1}{N+1}
$$

**Step 5: Calculate the sum by taking the limit.**
The sum of the infinite series is the limit of the partial sums as $N \to \infty$.
$$
S = \lim_{N \to \infty} S_N = \lim_{N \to \infty} \left(1 - \frac{1}{N+1}\right)
$$
As $N \to \infty$, the term $\frac{1}{N+1} \to 0$.
$$
S = 1 - 0 = 1
$$

**Reflection:** The problem became simple once algebra (partial fractions) converted the term $a_n$ into the structure $b_n - b_{n+1}$. This allowed the partial sum $S_N$ to collapse, making the final limit calculation straightforward.

## Diagrams
Here is a visualization of the cancellation in the partial sum $S_4$ for the worked example.

```text
S_4 =   (1/1  -  1/2)   <-- Term n=1
      + (1/2  -  1/3)   <-- Term n=2
      + (1/3  -  1/4)   <-- Term n=3
      + (1/4  -  1/5)   <-- Term n=4

      |-----> Cancellation
S_4 =   (1/1  -  1/2)
             \ /
              X
             / \
      + (1/2  -  1/3)
             \ /
              X
             / \
      + (1/3  -  1/4)
             \ /
              X
             / \
      + (1/4  -  1/5)

Remaining terms:
S_4 =  1/1           - 1/5
```

## Memory technique — remember this forever
1.  **The Mnemonic:** An old-fashioned **spyglass telescope**. It's made of many sections. When you collapse it, all the middle sections disappear, and you're left holding just the two end pieces. A telescoping series does the same: the infinite number of middle terms cancel out, leaving just the terms from the beginning and the end.
2.  **Must-know formulas:**
    *   The goal: Find a closed form for $S_N = \sum_{n=1}^{N} a_n$.
    *   The method: Find $b_n$ such that $a_n = b_n - b_{n+1}$.
    *   The result: $S = \lim_{N \to \infty} (b_1 - b_{N+1})$.
3.  **Spaced-repetition schedule:** Review this topic and solve one problem on day 1, day 3, day 7, day 16, and day 35.
4.  **First principles pathway:** If you forget the formula, rebuild it. The sum of a series is *defined* as the limit of its partial sums. Always start there. Write $S_N = a_1 + a_2 + a_3 + \dots + a_N$. If you suspect a telescoping series, rewrite each $a_n$ using its decomposed form (e.g., from partial fractions) and write out the whole sum. The cancellation will be visually obvious, and you can derive the formula for $S_N$ from scratch.

## Common mistakes
1.  **Partial Fraction Errors:** A simple algebraic mistake in the partial fraction decomposition will make the entire problem incorrect. Always check your decomposition by recombining the fractions to see if you get the original expression.
2.  **Mishandling "Lookahead" Series:** For a series like $\sum (b_n - b_{n+2})$, the $-b_3$ from the $n=1$ term does not cancel with the $+b_2$ from the $n=2$ term. The cancellation is offset. Writing out the first *four or five* terms and the last *two* terms makes the pattern clear and prevents you from incorrectly assuming only the very first and very last terms remain.
3.  **Forgetting the Limit:** Finding the simplified form for $S_N$ is not the final answer. The final step is always to take the limit as $N \to \infty$. A common mistake is to write $S_N = 1 - \frac{1}{N+1}$ and forget to evaluate the limit, which is $1$.

## Self-check
1.  Find the sum of $\sum_{n=2}^{\infty} \left( \frac{1}{n-1} - \frac{1}{n} \right)$.
2.  Find the sum of $\sum_{n=1}^{\infty} \frac{2}{n(n+2)}$.
3.  Find the sum of $\sum_{n=1}^{\infty} \ln\left(1 + \frac{1}{n}\right)$. (Hint: Use logarithm properties to create a difference.)