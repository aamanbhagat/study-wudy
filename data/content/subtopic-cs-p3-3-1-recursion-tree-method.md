## What it is
The recursion tree method is a visual technique for analyzing the time complexity of a recursive algorithm. It models the recursive calls as a tree, where each node represents the cost of a single subproblem. By summing the costs at each level of the tree and then summing the costs of all levels, we can derive an asymptotic bound for the algorithm.

## Why it matters
This method is the intuitive foundation for the Master Theorem, a powerful shortcut for solving recurrence relations. You will use it to analyze divide-and-conquer algorithms, which are fundamental in many fields: parallel processing (distributing work), computational geometry (k-d trees for spatial partitioning in N-body simulations), and even in the Fast Fourier Transform (FFT) used for signal processing in physics and data analysis.

## When to study it
Before tackling this, you must have a solid grasp of these prerequisites:
1.  **Big-O, Big-$\Omega$, Big-$\Theta$ notation:** You should be fluent in what $O(n)$, $\Theta(n \log n)$, etc., mean.
2.  **Recurrence Relations:** You must understand how a recursive function's runtime is expressed as a recurrence, e.g., $T(n) = 2T(n/2) + n$.
3.  **Logarithms:** Specifically, logarithm rules like $\log_b(x^y) = y \log_b x$ and the change of base formula.
4.  **Geometric Series:** You need to know the formula for the sum of a finite geometric series, $\sum_{i=0}^{k} r^i = \frac{r^{k+1}-1}{r-1}$.

If you are not confident in these, pause and review them. Proceeding without them will lead to frustration.

## How to study it (step by step)
1.  **Deconstruct a Recurrence:** Take a standard recurrence like $T(n) = aT(n/b) + f(n)$. Verbally explain what each part means. For $T(n) = 2T(n/2) + \Theta(n)$, you should say: "To solve a problem of size $n$, I solve two subproblems of size $n/2$, and then I do $\Theta(n)$ work to combine their results."
2.  **Draw the First Three Levels:** For that same recurrence, draw the tree. The root is $n$. It has two children, each of size $n/2$. Each of those has two children, each of size $n/4$. Label each node with its subproblem size.
3.  **Label the Work:** Now, go back to your tree. The work *outside* the recursive calls is $f(n)$. For the root, this is $\Theta(n)$. For a node of size $n/2$, the work is $\Theta(n/2)$. Label the work done at each node next to its size.
4.  **Sum Work Per Level:** Calculate the total work done at each level. For the root (level 0), it's $\Theta(n)$. For level 1, it's $2 \times \Theta(n/2) = \Theta(n)$. For level 2, it's $4 \times \Theta(n/4) = \Theta(n)$. Observe the pattern.
5.  **Calculate Tree Height:** The recursion stops when the problem size becomes a constant, typically 1. How many times must you divide $n$ by $b$ to get 1? That is, solve $n/b^h = 1$ for $h$. This gives $n = b^h$, so the height $h = \log_b n$.
6.  **Sum Total Work:** Sum the work across all levels. In our example, each of the $\log_2 n$ levels costs $\Theta(n)$. The total cost is (work per level) $\times$ (number of levels) = $\Theta(n) \times \log_2 n = \Theta(n \log n)$.
7.  **Generalize:** Repeat steps 2-6 for a different recurrence, like $T(n) = 3T(n/4) + \Theta(n^2)$. This will produce a different pattern in the per-level summation (a decreasing geometric series).

## Key ideas, with intuition
1.  **The Recurrence Defines the Tree Structure:** A recurrence of the form $T(n) = aT(n/b) + f(n)$ tells you everything:
    *   $a$ is the **branching factor**: each node has $a$ children.
    *   $n/b$ is the **subproblem size reduction**: the input size shrinks by a factor of $b$ at each level.
    *   $f(n)$ is the **cost of non-recursive work** at the root of a (sub)tree of size $n$.

2.  **Total Work = Sum of Work at All Levels:** The core idea is to re-group the costs. Instead of following one path down the tree, we slice the tree horizontally and sum the work at each level.
    $$ T(n) = \sum_{i=0}^{\text{height}} (\text{work at level } i) $$
    The work at level $i$ is the number of nodes at that level multiplied by the work per node.
    *   Number of nodes at level $i$: $a^i$
    *   Problem size at level $i$: $n/b^i$
    *   Work per node at level $i$: $f(n/b^i)$
    *   Total work at level $i$: $a^i f(n/b^i)$

3.  **The Height Determines the Number of Terms to Sum:** The recursion doesn't go on forever. It stops at a base case, when the problem is trivially small (e.g., size 1). The height of the tree, $h = \log_b n$, tells us how many levels of work we need to sum up. This is the most common point of error. Intuitively, "height" is the number of times you can divide $n$ by $b$ before you get to 1.

## Worked example
Let's analyze the recurrence for Merge Sort: $T(n) = 2T(n/2) + cn$.

**Step 1: Draw and label the tree structure.**
The problem starts at size $n$. It splits into two ($a=2$) subproblems of size $n/2$ ($b=2$). The non-recursive work is $cn$.

**Step 2: Calculate the work at each level.**
*   **Level 0:** One node of size $n$. Work = $cn$.
*   **Level 1:** Two nodes, each of size $n/2$. Work per node = $c(n/2)$. Total work = $2 \times c(n/2) = cn$.
*   **Level 2:** Four nodes, each of size $n/4$. Work per node = $c(n/4)$. Total work = $4 \times c(n/4) = cn$.
*   **Level i:** $2^i$ nodes, each of size $n/2^i$. Work per node = $c(n/2^i)$. Total work = $2^i \times c(n/2^i) = cn$.

**Step 3: Calculate the height of the tree.**
The recursion stops when the subproblem size is 1. We solve for the height $h$:
$$ \frac{n}{2^h} = 1 \implies n = 2^h \implies h = \log_2 n $$
So, there are $\log_2 n + 1$ levels (from level 0 to level $\log_2 n$).

**Step 4: Sum the work across all levels.**
The total work $T(n)$ is the sum of the work at each level, from $i=0$ to $h=\log_2 n$.
$$ T(n) = \sum_{i=0}^{\log_2 n} (\text{work at level } i) $$
In this case, the work at every level is constant: $cn$.
$$ T(n) = \sum_{i=0}^{\log_2 n} cn = cn \times (\log_2 n + 1) $$
The number of terms in the sum is $(\log_2 n - 0 + 1) = \log_2 n + 1$.
$$ T(n) = cn \log_2 n + cn $$

**Step 5: State the final complexity.**
Dropping lower-order terms and constants, we get:
$$ T(n) = \Theta(n \log n) $$

**Reflection:** This worked because the recurrence perfectly described a balanced tree where the work at each level was conveniently the same. This "balanced work" case is one of three possibilities (work decreasing, balanced, or increasing per level), all of which the recursion tree method handles.

## Diagrams
Here is the recursion tree for $T(n) = 2T(n/2) + cn$:

```text
       Problem Size        Work per Node        Total Work per Level
      --------------      ---------------      --------------------
Level 0:      n                 cn           ->          cn
             / \
            /   \
Level 1:  n/2   n/2           c(n/2) each    ->  2 * c(n/2) = cn
          / \   / \
         /   \ /   \
Level 2: n/4 n/4 n/4 n/4     c(n/4) each    ->  4 * c(n/4) = cn

  ...      ...      ...          ...                   ...

Level h:   1     1 ... 1        c(1) each      ->  n * c(1) = cn
(h=log₂n)
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you're a manager ("The Root Cause Analyst"). You have a big task ($f(n)$). You can't do it alone, so you hire $a$ deputies. You split the work, giving each deputy a task of size $n/b$. Each deputy does the same. Your job is to figure out the total payroll. The recursion tree method is just accounting: add up the payroll for each level of the management hierarchy.

2.  **Must-Know Formulas:**
    *   General Form: $T(n) = aT(n/b) + f(n)$
    *   Height: $h = \log_b n$
    *   Total Work: $T(n) = \sum_{i=0}^{\log_b n} a^i f(n/b^i)$

3.  **Spaced Repetition Schedule:**
    *   Review this entire lesson in **1 day**.
    *   Solve a new problem using the method in **3 days**.
    *   Re-derive the Merge Sort example from scratch in **7 days**.
    *   Explain the method to a friend (or a rubber duck) in **16 days**.
    *   Solve a complex, unbalanced tree problem in **35 days**.

4.  **First Principles Rebuild:** If you forget everything, you can always rebuild it.
    *   Start with the recurrence, e.g., $T(n) = aT(n/b) + f(n)$.
    *   Write out the first few terms by substitution:
        *   $T(n) = f(n) + aT(n/b)$
        *   $T(n) = f(n) + a[f(n/b) + aT(n/b^2)]$
        *   $T(n) = f(n) + af(n/b) + a^2T(n/b^2)$
        *   $T(n) = f(n) + af(n/b) + a^2f(n/b^2) + a^3T(n/b^3)$
    *   You can see the sum emerging: $\sum a^i f(n/b^i)$. This is the recursion tree in algebraic form.

## Common mistakes
1.  **Off-by-one on height.** Forgetting that levels are typically indexed $0, 1, ..., h$, meaning there are $h+1$ levels, not $h$. This usually doesn't affect the final Big-$\Theta$ bound but is technically incorrect.
2.  **Ignoring the number of nodes per level.** Calculating the work at level $i$ as just $f(n/b^i)$ instead of the correct $a^i f(n/b^i)$. You must account for the branching factor.
3.  **Confusing height with number of leaves.** The height is $\log_b n$. The number of nodes at the bottom level (the leaves) is $a^h = a^{\log_b n} = n^{\log_b a}$. These are different quantities unless $a=b$.
4.  **Sloppy summation.** When the work per level forms a geometric series (e.g., for $T(n) = 3T(n/2) + n$), students often just guess the sum instead of applying the formula correctly. The sum is dominated by its first or last term, depending on whether the ratio is less than or greater than 1.

## Self-check
Solve these recurrences using the recursion tree method. Draw the tree, sum the levels, and find the tightest $\Theta$-bound.

1.  $T(n) = 3T(n/2) + \Theta(n)$
2.  $T(n) = 8T(n/2) + \Theta(n^2)$
3.  $T(n) = T(n/5) + T(4n/5) + \Theta(n)$ (Note: This tree is not balanced. How does that affect the height and the analysis?)