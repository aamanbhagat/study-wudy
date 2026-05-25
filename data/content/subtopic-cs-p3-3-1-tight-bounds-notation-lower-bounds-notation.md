## What it is
Omega ($\Omega$) notation describes a function's **asymptotic lower bound**; it's a floor that the function's growth rate will not drop below. Theta ($\Theta$) notation describes a function's **asymptotic tight bound**, meaning the function's growth is "sandwiched" between two constant multiples of another function. It is simultaneously an upper and lower bound.

## Why it matters
These notations provide guarantees. In aerospace guidance systems, knowing a navigation algorithm is $\Theta(n \log n)$ tells you precisely how its runtime scales, allowing you to budget computation time and guarantee system stability. In physics simulations, understanding a problem's complexity is $\Omega(n^3)$ tells you the absolute minimum computational resources required, preventing you from wasting time seeking a non-existent faster algorithm.

## When to study it
You must have a solid grasp of Big-O ($O$) notation. $\Omega$ and $\Theta$ are defined in relation to $O$ and complete the set of essential asymptotic notations. You should also be comfortable with function growth rates (e.g., knowing that $n^2$ grows faster than $n \log n$) and the concept of limits from calculus.

## How to study it (step by step)
1.  **Review Big-O:** Write down the formal definition of $f(n) \in O(g(n))$ from memory. If you cannot, stop and review that topic. The definition is: $\exists c > 0, n_0 > 0$ such that $0 \le f(n) \le c \cdot g(n)$ for all $n \ge n_0$.
2.  **Derive $\Omega$ from $O$:** The definition of $\Omega$ is a mirror image of $O$. Instead of an upper bound, it's a lower bound. Modify the Big-O definition to define $f(n) \in \Omega(g(n))$. Think: what needs to change in the inequality $f(n) \le c \cdot g(n)$?
3.  **Define $\Theta$ as an intersection:** A function $f(n)$ has a tight bound $g(n)$ if it is both upper-bounded and lower-bounded by $g(n)$. Express this formally: $f(n) \in \Theta(g(n))$ if and only if $f(n) \in O(g(n))$ and $f(n) \in \Omega(g(n))$. Derive the single "sandwich" definition for $\Theta$ from this fact.
4.  **Practice with polynomials:** Take a simple polynomial like $f(n) = 4n^2 + 10n - 50$. Prove that $f(n) \in \Theta(n^2)$ by finding explicit constants $c_1, c_2, n_0$ that satisfy the definition.
5.  **Distinguish algorithm case from bounds:** Take an algorithm like Insertion Sort. Its runtime depends on the input. What is its best-case runtime? Use $\Omega$ or $\Theta$ to describe it. What is its worst-case runtime? Use $O$ or $\Theta$ to describe that. This will clarify that the notations describe *functions*, and an algorithm can have different runtime functions for different cases.

## Key ideas, with intuition
1.  **The Asymptotic Analogy:** Think of the notations as comparisons for growth rates, not for the values of functions themselves.
    *   $f(n) \in O(g(n))$ is like $f \le g$.
    -   $f(n) \in \Omega(g(n))$ is like $f \ge g$.
    -   $f(n) \in \Theta(g(n))$ is like $f = g$.

2.  **The Lower Bound ($\Omega$):** A function $f(n)$ is in $\Omega(g(n))$ if, for sufficiently large input size $n$, $f(n)$ is always greater than or equal to some constant positive multiple of $g(n)$. It's the "at least this fast" guarantee.
    $$
    f(n) \in \Omega(g(n)) \iff \exists c > 0, n_0 > 0 \text{ such that } 0 \le c \cdot g(n) \le f(n) \text{ for all } n \ge n_0
    $$

3.  **The Sandwich ($\Theta$):** A function $f(n)$ is in $\Theta(g(n))$ if you can find two positive constants, $c_1$ and $c_2$, that "sandwich" $f(n)$ between $c_1 \cdot g(n)$ and $c_2 \cdot g(n)$ for all sufficiently large $n$. This is the strongest asymptotic statement you can make.
    $$
    f(n) \in \Theta(g(n)) \iff \exists c_1, c_2 > 0, n_0 > 0 \text{ such that } 0 \le c_1 \cdot g(n) \le f(n) \le c_2 \cdot g(n) \text{ for all } n \ge n_0
    $$

4.  **Limit Test:** A practical shortcut for well-behaved functions is to use a limit.
    $$
    \lim_{n \to \infty} \frac{f(n)}{g(n)} = L
    $$
    *   If $0 < L < \infty$, then $f(n) \in \Theta(g(n))$.
    *   If $L = 0$, then $f(n) \in O(g(n))$ but not $\Theta(g(n))$.
    *   If $L = \infty$, then $f(n) \in \Omega(g(n))$ but not $\Theta(g(n))$.

## Worked example
**Problem:** Prove that $f(n) = 7n^2 + 20n + 5$ is in $\Theta(n^2)$.

**Solution:**
Per the definition, we must find positive constants $c_1, c_2, n_0$ such that for all $n \ge n_0$, the following inequality holds:
$$
c_1 n^2 \le 7n^2 + 20n + 5 \le c_2 n^2
$$

**Step 1: Find the upper bound constant $c_2$.**
We need to satisfy $7n^2 + 20n + 5 \le c_2 n^2$.
For $n \ge 1$, we know that $20n \le 20n^2$ and $5 \le 5n^2$.
So, we can write:
$$
7n^2 + 20n + 5 \le 7n^2 + 20n^2 + 5n^2 = 32n^2
$$
This inequality holds for all $n \ge 1$. Thus, we can choose $c_2 = 32$ and $n_0 = 1$.

**Step 2: Find the lower bound constant $c_1$.**
We need to satisfy $c_1 n^2 \le 7n^2 + 20n + 5$.
Since we are concerned with large $n$, all terms are positive. The dominant term is $7n^2$.
We can simply state that for all $n \ge 1$:
$$
7n^2 \le 7n^2 + 20n + 5
$$
This is clearly true. Thus, we can choose $c_1 = 7$.

**Step 3: Combine and state the final result.**
We need a single $n_0$ that works for both bounds. In Step 1, we used $n_0=1$. In Step 2, we could also use $n_0=1$. So, we can choose $n_0=1$.
We have found $c_1 = 7$, $c_2 = 32$, and $n_0 = 1$ such that for all $n \ge 1$:
$$
7n^2 \le 7n^2 + 20n + 5 \le 32n^2
$$
Since we found such constants, we have proven that $f(n) \in \Theta(n^2)$.

**Reflection:** The upper bound worked by over-approximating lower-order terms ($20n$ and $5$) with the same order as the dominant term ($n^2$). The lower bound worked by simply dropping the positive lower-order terms, which makes the expression smaller. The key was to manipulate the inequalities to isolate the $n^2$ term.

## Diagrams

The "Sandwich" for $\Theta$ notation:

```text
  Value
    ^
    |
    |
    |
    | . . . . . . . . . . . . . . . . . . . . . c_2 * g(n) (upper bound)
    |                  .
    |              .  
    |          .  f(n)
    |      .
    |  .
    | . . . . . c_1 * g(n) (lower bound)
    |
    +---|---------------------------------------------------> n (Input Size)
        n_0
```
This diagram shows that after the point $n_0$, the function $f(n)$ is always trapped between the two bounding functions $c_1 g(n)$ and $c_2 g(n)$.

Relationship between $O$, $\Omega$, and $\Theta$:

```text
                 +--------------------------------+
                 | Functions growing AT MOST      |
                 | as fast as g(n) --- O(g(n))    |
                 |                                |
                 |      +-------------------+     |
                 |      | Functions growing |     |
                 |      | EXACTLY as fast   |     |
                 |      | as g(n) --- Θ(g(n))|     |
                 |      +-------------------+     |
                 |                                |
+----------------+--------------------------------+
| Functions growing AT LEAST       |
| as fast as g(n) --- Ω(g(n))    |
|                                |
+--------------------------------+
```
This Venn-like diagram shows $\Theta(g(n))$ is the intersection of the set of functions $O(g(n))$ and the set of functions $\Omega(g(n))$.

## Memory technique — remember this forever
1.  **Visual Hook:**
    *   **$\Omega$ (Omega):** The last letter of the Greek alphabet. It's the **end**, the **bottom**, the **floor**. $\Omega$ is the unbreakable lower bound.
    *   **$\Theta$ (Theta):** Think of the line inside the circle as "pinning" the function. It's not just below, not just above, it's pinned down to a specific growth rate. It's a **T**ight bound.

2.  **Must-Know Formulas:** Overlearn these definitions. Do not paraphrase.
    *   $f(n) \in \Omega(g(n)) \iff \exists c > 0, n_0 > 0 \text{ s.t. } 0 \le c \cdot g(n) \le f(n) \text{ for } n \ge n_0$.
    *   $f(n) \in \Theta(g(n)) \iff f(n) \in O(g(n)) \text{ and } f(n) \in \Omega(g(n))$.

3.  **Spaced Repetition Schedule:**
    *   Review these definitions and the visual hook in **1 day**.
    *   Then again in **3 days**.
    *   Then **7 days**.
    *   Then **16 days**.
    *   Finally, **35 days**. Each time, write the definitions from scratch.

4.  **First Principles Pathway:** If you forget, rebuild from Big-O.
    *   Start with "Big-O means 'less than or equal to'": $f(n) \le c \cdot g(n)$.
    *   $\Omega$ must mean "'greater than or equal to'": $f(n) \ge c \cdot g(n)$.
    *   $\Theta$ must mean "'equal to'": so it must be both $\le$ and $\ge$. Therefore, it must be both $O$ and $\Omega$.

## Common mistakes
1.  **Confusing Case with Bound:** Do not say "The best case for this algorithm is $\Omega(n)$". This is imprecise. Say "The best-case running time of this algorithm is $\Theta(n)$". The case (best, worst, average) determines a *specific runtime function*, and you use the bound notation ($\Theta, O, \Omega$) to describe that function's growth.
2.  **Using '=' instead of '$\in$':** You write $f(n) \in \Theta(g(n))$, not $f(n) = \Theta(g(n))$. $\Theta(g(n))$ is a *set* of functions. Your function is an *element* of that set.
3.  **Being too loose:** While it's technically true that $n^3 \in \Omega(n)$, it is not a *tight* lower bound. The goal is almost always to find the tightest possible bound for a given function, which would be $\Omega(n^3)$ or, even better, $\Theta(n^3)$.
4.  **Assuming $\Theta$ always exists:** Not all algorithms have a meaningful tight bound that covers all cases. For Insertion Sort, the best case is $\Theta(n)$ and the worst is $\Theta(n^2)$. You cannot make a single $\Theta$ statement that describes its performance on all inputs; you can only say its runtime is $\Omega(n)$ and $O(n^2)$.

## Self-check
1.  Is $f(n) = n \log n - 100n$ in $\Omega(n)$? Is it in $\Theta(n \log n)$? Justify your answers.
2.  Prove or disprove: For any two functions $f(n)$ and $g(n)$ where $f(n), g(n) > 0$ for all $n$, if $f(n) \in O(g(n))$, then $g(n) \in \Omega(f(n))$.
3.  Consider an algorithm that searches for an element in a sorted $n \times n$ matrix. The algorithm starts at the top-right element and moves only left or down. What are the tightest $\Theta$ bounds you can state for its best-case and worst-case running times in terms of $n$? Can you make a single $\Theta$ statement for the algorithm's overall complexity? Why or why not?