## What it is
The complexity class **P** is the set of all *decision problems* that can be solved by a deterministic algorithm in *polynomial time*. This means the number of computational steps required to find a solution is bounded by a polynomial function of the size of the input. In simpler terms, if the input size doubles, the runtime might get 4 times or 8 times slower, but it won't experience a catastrophic, exponential explosion.

## Why it matters
P captures the theoretical notion of "efficiently solvable" or "tractable" problems. In aerospace, designing an optimal flight trajectory might involve solving an optimization problem; if that problem (or its decision version) is in P, we can hope to find a solution efficiently. In machine learning, training many models involves solving convex optimization problems, which are largely in P, allowing us to train on massive datasets. The famous "P vs. NP" problem, one of the most important open questions in computer science, hinges on understanding the limits of this class.

## When to study it
You must have a solid grasp of these prerequisites. If not, stop and review them first.
1.  **Big-O Notation:** You must be fluent in what $f(n) = O(g(n))$ means, specifically as an upper bound on asymptotic growth.
2.  **Algorithms & Data Structures:** You should understand basic algorithms like searching (linear, binary), sorting (merge sort, quicksort), and graph traversal (BFS, DFS), and be able to analyze their time complexity.
3.  **Models of Computation:** You should understand the definition of a deterministic Turing machine (DTM) and what it means for a DTM to "decide" a language (i.e., always halt with a correct yes/no answer).
4.  **Decision Problems:** You must know the definition of a decision problem: a problem with a yes/no answer.

## How to study it (step by step)
1.  **Formalize Runtime:** Define the running time of a deterministic Turing machine (DTM) $M$ on an input string $w$ as the number of state transitions $M$ makes before it halts.
2.  **Define Time Complexity:** The time complexity of a DTM $M$ is a function $T_M(n): \mathbb{N} \to \mathbb{N}$, where $T_M(n)$ is the *maximum* running time of $M$ over all possible inputs of length $n$. This is the worst-case analysis.
3.  **Define TIME(t(n)):** For a function $t(n)$, define the complexity class $\text{TIME}(t(n))$ as the set of all languages (problems) that can be decided by a DTM with time complexity $O(t(n))$.
4.  **Define P:** Now, formally define P as the union of all polynomial time complexity classes.
    $$ \text{P} = \bigcup_{k \in \mathbb{N}} \text{TIME}(n^k) $$
    This means a problem is in P if its runtime is $O(n^k)$ for *some* constant $k \ge 0$.
5.  **Analyze a simple problem:** Take the problem of searching for an element `x` in an unsorted list of `n` elements. Write down the simple linear scan algorithm. Convince yourself that in the worst case, you check all `n` elements. The runtime is $O(n)$, which is $O(n^1)$. Since $k=1$ is a constant, this problem is in P.
6.  **Contrast with non-polynomial:** Consider the problem of listing all possible subsets of a set of $n$ elements. There are $2^n$ such subsets. Any algorithm that must generate all of them will necessarily take at least $O(2^n)$ time, which is exponential. This helps build intuition for the boundary of P.

## Key ideas, with intuition
1.  **Polynomial time means "scales gracefully".** This is the core intuition. An algorithm that runs in $O(n^2)$ time is manageable. If you double the input size from $n$ to $2n$, the runtime goes from $c \cdot n^2$ to $c \cdot (2n)^2 = 4 \cdot c \cdot n^2$. It gets four times slower. An exponential algorithm running in $O(2^n)$ is a disaster. If you increase the input size from $n$ to $n+1$, the runtime doubles. This difference between polynomial and exponential growth is the most fundamental concept in complexity theory.

2.  **The Cobham-Edmonds Thesis.** This is not a formal theorem, but a guiding principle: P is the class of problems that are "tractably solvable" or "efficiently computable" in practice. While an $O(n^{100})$ algorithm is technically in P, it's useless. The thesis holds because most natural problems in P have been found to have algorithms with small polynomial exponents ($n^2, n^3, n^4$).

3.  **Robustness to the model.** The class P is the same regardless of whether you use a Turing machine, a standard desktop computer (RAM model), or most other reasonable, deterministic models of computation. An algorithm that is polynomial on one can be simulated in polynomial time on another. The specific exponent $k$ might change, but it remains a polynomial. This allows us to be a bit "sloppy" and analyze algorithms in pseudocode rather than drawing Turing machine state diagrams.

4.  **Closure Properties.** The class P is closed under common operations like union, intersection, and complement. This means if you can solve two problems in P, you can solve a problem that requires answering "yes" if either (union) or both (intersection) of the original problems are "yes". If you can solve a problem in P, you can also solve its opposite (complement) in P.

## Worked example
**Problem:** `RELPRIME`. Given two integers $a$ and $b$, are they relatively prime? (i.e., is their greatest common divisor 1?) This is a decision problem.

**Input:** A string representing two positive integers, like `(a, b)`. The size of the input, $n$, is the number of bits needed to represent these numbers. So, $n \approx \log_2(a) + \log_2(b)$.

**Algorithm:** We can use the ancient and elegant Euclidean Algorithm to find the greatest common divisor (GCD).

1.  Given integers $a$ and $b$ (assume $a \ge b > 0$).
2.  If $b = 0$, the GCD is $a$.
3.  Otherwise, compute the remainder $r = a \pmod b$.
4.  Replace $(a, b)$ with $(b, r)$ and go back to step 2.

Let's trace `GCD(52, 20)`:
- `(52, 20)` -> $r = 52 \pmod{20} = 12$. New pair is `(20, 12)`.
- `(20, 12)` -> $r = 20 \pmod{12} = 8$. New pair is `(12, 8)`.
- `(12, 8)` -> $r = 12 \pmod{8} = 4$. New pair is `(8, 4)`.
- `(8, 4)` -> $r = 8 \pmod{4} = 0$. New pair is `(4, 0)`.
- Now the second number is 0. The GCD is 4.

The algorithm for `RELPRIME` is:
1. Run `GCD(a, b)`.
2. If the result is 1, output YES.
3. Otherwise, output NO.

**Runtime Analysis:**
- How many steps does the Euclidean algorithm take? In each step `(a, b) -> (b, a mod b)`, the numbers get smaller. A key theorem (Lamé's theorem) shows that the number of steps is at most $O(\log(\min(a,b)))$.
- The input size $n$ is the number of bits, so $n \approx \log a + \log b$. The number of steps is $O(n)$.
- Each step involves a division/modulo operation. On a Turing machine, this operation on $n$-bit numbers takes a polynomial number of steps, say $O(n^2)$.
- Total time complexity = (Number of Euclidean steps) $\times$ (Cost per step) = $O(n) \times O(n^2) = O(n^3)$.

**Conclusion:**
The runtime is $O(n^3)$, where $n$ is the length of the input in bits. Since this is a polynomial in the input size, the `RELPRIME` problem is in **P**.

**Reflection:**
- Step 1 (choosing the Euclidean algorithm) was key. A naive approach of checking all divisors up to $\min(a,b)$ would be exponential in the input size $n$.
- Step 2 (analyzing runtime) required relating the number of algorithm steps to the *size of the input in bits*, not the magnitude of the numbers themselves. This is a critical distinction.
- Step 3 (concluding) was a direct application of the definition of P: we found a deterministic algorithm and proved its time complexity is $O(n^k)$ for $k=3$.

## Diagrams

This diagram shows the crucial difference in growth rates that motivates the definition of P.

```text
Runtime T(n)
  ^
  |
  |                                 /
  |                                /..  O(2^n)  [Intractable]
  |                               /...
  |                              /..
  |                             / .
  |                            / .
  |                           / .
  |                          /.
  |                         /
  |                        /
  |                      ..
  |                    ..
  |                  ..
  |                .. O(n^3)
  |              ..
  |            .. O(n^2)
  |          ..
  |        /
  |      / O(n)
  +-------------------------------------> Input size n

  [Tractable Zone]
```

## Memory technique — remember this forever
1.  **Mnemonic:** Think of **P** as "**P**lausible," "**P**ractical," or "**P**redictable." Problems in P are those we can plausibly solve. Their runtime grows predictably, not explosively.

2.  **Must-learn fact:**
    > A language $L$ is in **P** if there exists a deterministic Turing machine $M$ and a constant $k \ge 0$ such that $M$ decides $L$ and the time complexity of $M$ is $O(n^k)$.

3.  **Spaced Repetition Schedule:** Review this definition and the growth rate diagram at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days**.

4.  **First Principles Pathway:** If you forget the definition, rebuild it.
    - What are we trying to classify? Problems. Formal name: languages.
    - What is the key property? Efficiently solvable.
    - How do we measure efficiency? Runtime as a function of input size, $n$.
    - What kind of runtime growth is "efficient"? Not exponential. The opposite is polynomial ($n, n^2, n^3, ...$).
    - What is our formal model of a computer? A deterministic Turing machine.
    - Put it together: P is the set of languages decidable by a deterministic Turing machine in polynomial time.

## Common mistakes
1.  **Confusing Polynomial with Exponential:** $O(n^{1000})$ is polynomial. $O(1.0001^n)$ is exponential. The location of $n$ (base vs. exponent) is everything. An algorithm with runtime $n^{1000}$ is in P; one with $1.0001^n$ is not.
2.  **Runtime vs. Input Magnitude:** Analyzing runtime based on the *value* of a number instead of its *bit-length*. The Euclidean algorithm example is classic: its runtime is polynomial in $\log(a)$, not $a$.
3.  **"My algorithm is slow, so the problem isn't in P."** This is a huge error. To show a problem is in P, you only need to find *one* polynomial-time algorithm. To show a problem is *not* in P, you must prove that *no possible* polynomial-time algorithm exists, which is extraordinarily difficult.

## Self-check
1.  An algorithm's runtime is described by the function $T(n) = 20n^4 + 100n^2(\log n)^3$. Does this algorithm solve a problem in P? Justify your answer.
2.  Consider the problem of multiplying two $n \times n$ matrices. The standard textbook algorithm involves three nested loops. Analyze its runtime. Is this problem in P?
3.  A problem is defined as follows: Given a list of integers, is there a subset of these integers that sums to exactly zero? (This is the SUBSET-SUM problem). A simple algorithm is to generate all $2^n$ subsets and check the sum of each. This algorithm runs in exponential time. Can you conclude from this fact alone that SUBSET-SUM is not in P? Explain why or why not.