## 1. The one-sentence answer
**Big-O notation classifies how an algorithm’s running time or space grows as its input size n tends to infinity, and the eight common classes O(1), O(log n), O(n), O(n log n), O(n²), O(n³), O(2ⁿ), O(n!) form a strict hierarchy of increasing cost.**

These classes arise directly from counting the dominant operations inside loops, recursions, and data-structure traversals. Once the dominant term is isolated, every lower-order term and every constant factor is discarded, leaving only the growth rate that matters for large n. The resulting label tells an engineer whether an algorithm will finish in milliseconds, hours, or never on realistic data.

The hierarchy is total: each class grows strictly faster than the one before it. Therefore any algorithm placed in a slower class will eventually dominate every algorithm in a faster class, regardless of hardware speed.

> [!NOTE]
> The single most important insight is that the difference between classes is not a constant factor; it is an ever-widening gulf that no amount of optimisation inside a slower class can ever close.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover uses an O(1) hash-table lookup inside its real-time obstacle-avoidance loop; any higher complexity would miss the 1 ms deadline required for safe flight through the Martian atmosphere.

Google’s Borg scheduler models task placement as a minimum-cost flow problem whose best practical solvers run in O(n log n) time; moving to O(n²) would make cluster-scale scheduling impossible beyond a few thousand machines.

The semiconductor industry’s place-and-route tools solve instances of the travelling-salesman problem whose exact solutions sit in O(n!) time; even modest n = 20 already exhausts weeks of CPU time on the largest farms, forcing reliance on O(2ⁿ) approximation schemes.

Modern transformer training runs the attention mechanism in O(n²) time per layer; the quadratic term is the reason context lengths stayed below 2048 tokens for years until linear-attention variants appeared.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Limit of a ratio | To decide formally whether f(n) grows faster than g(n)    |
| Dominant term    | To discard every addend that becomes negligible           |
| Recurrence       | To express the cost of divide-and-conquer algorithms      |
| Base-2 logarithm | To count how many times an input can be halved            |

## 4. Building the idea — from intuition to formalism

### Step 1 — Constant work independent of input size
A block of code whose execution count never changes with n finishes in the same time whether the input contains ten or ten million elements.  
Example: reading the first element of an array.  
Formally,  
$$T(n) = c \quad \Rightarrow \quad T(n) \in O(1).$$  
> [!WARNING]  
> Treating a loop that always runs exactly ten times as O(1) is correct only when ten is independent of n; if the ten is replaced by n the classification collapses.

### Step 2 — Repeated halving of the problem
Each iteration discards half the remaining candidates. After k steps the problem size is n/2^k; termination occurs when the size reaches 1, so k = log₂ n.  
Formally,  
$$T(n) = T(n/2) + c \quad \Rightarrow \quad T(n) \in O(\log n).$$  
> [!WARNING]  
> Confusing log n iterations with n iterations produces an exponentially wrong prediction once n exceeds a few thousand.

### Step 3 — One pass over every element
A single loop that touches each datum once yields a cost directly proportional to n.  
Formally,  
$$T(n) = cn \quad \Rightarrow \quad T(n) \in O(n).$$  
> [!WARNING]  
> Forgetting that two consecutive linear passes remain O(n) leads to the false belief that the algorithm has become quadratic.

### Step 4 — Linear work at each level of a balanced recursion tree
Binary search produces log n levels; each level costs linear work when the subproblems are merged (merge sort).  
Formally,  
$$T(n) = 2T(n/2) + cn \quad \Rightarrow \quad T(n) \in O(n\log n).$$  
> [!WARNING]  
> Replacing the cn merge cost by cn² immediately lifts the whole expression into O(n²).

### Step 5 — Nested loops each running to n
Two nested loops each iterating n times examine n² pairs.  
Formally,  
$$T(n) = cn^2 \quad \Rightarrow \quad T(n) \in O(n^2).$$  
> [!WARNING]  
> Treating an inner loop whose limit is n/2 as still quadratic is harmless asymptotically, yet students often rewrite the bound as O(n(n/2)) and then drop the constant incorrectly.

### Step 6 — Three nested loops
Three independent loops each to n produce n³ elementary operations.  
Formally,  
$$T(n) = cn^3 \quad \Rightarrow \quad T(n) \in O(n^3).$$  
> [!WARNING]  
> Matrix multiplication naïvely costs O(n³); any claim of improvement must be measured against this baseline.

### Step 7 — Branching factor two at every level
A recursion that spawns two subproblems of size n−1 yields a binary tree of height n.  
Formally,  
$$T(n) = 2T(n-1) + c \quad \Rightarrow \quad T(n) \in O(2^n).$$  
> [!WARNING]  
> Writing O(2^n) when the recurrence is actually T(n) = T(n−1) + T(n−2) (Fibonacci) still yields the same class, but the constant hidden by the O notation differs.

### Step 8 — All permutations examined
Generating every ordering of n distinct items produces n! leaves in the recursion tree.  
Formally,  
$$T(n) = nT(n-1) + c \quad \Rightarrow \quad T(n) \in O(n!).$$  
The final textbook statement follows at once: any algorithm whose recurrence solves to one of the eight forms above is labelled by that class.

## 5. Worked examples — every step shown

**Example 1 — Array access**  
*Given:* `int x = a[0];` inside a function whose only parameter is the array length n.  
*Find:* asymptotic class of the fragment.  
Step: the statement executes once regardless of n.  
*Why:* no loop or recursion depends on n.  
Step: constant c satisfies T(n) ≤ c for all n ≥ 1.  
*Why:* definition of O(1) requires existence of constants c and n₀.  
**O(1)**

*Reflection:* the example is trivial yet illustrates that independence from n is the sole criterion.

**Example 2 — Binary search**  
*Given:* sorted array of length n, target value.  
*Find:* number of comparisons.  
Step: each comparison halves the interval.  
*Why:* search space becomes floor((high-low)/2).  
Step: after k steps, n/2^k ≤ 1 ⇒ k ≤ log₂ n.  
*Why:* solving the inequality for k yields the logarithm.  
**O(log n)**

*Reflection:* the halving argument must be made explicit; merely saying “it is fast” is insufficient.

**Example 3 — Merge sort recurrence**  
*Given:* T(n) = 2T(n/2) + cn, T(1) = c.  
*Find:* closed-form class.  
Step: unfold once → T(n) = 4T(n/4) + 2cn.  
*Why:* substitute the recurrence into itself.  
Step: after log₂ n unfoldings the non-recursive term is cn log₂ n.  
*Why:* exactly log₂ n levels each costing cn.  
**O(n log n)**

*Reflection:* the master theorem is unnecessary once the tree is drawn level by level.

**Example 4 — Naïve matrix multiplication**  
*Given:* two n×n matrices.  
*Find:* arithmetic operations.  
Step: each of n² output entries requires n multiplications and n−1 additions.  
*Why:* definition of matrix product.  
Step: total operations = n²(2n−1) = 2n³ − n².  
*Why:* polynomial arithmetic discards the lower-degree term.  
**O(n³)**

*Reflection:* the cubic term appears directly from the triple loop; optimisations must beat this count.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Declaring two nested loops O(n²) without checking limits | Habit of pattern-matching “two loops = quadratic” | Count the exact iteration ranges of each loop        |
| Treating O(n log n) as “almost linear” | Underestimating the slow growth of log n    | Compare values at n = 10^9; log n ≈ 30               |
| Forgetting that O(2^n) dominates every polynomial | Exponential versus polynomial intuition gap | Plot or evaluate at successive powers of two         |
| Writing O(n!) when the algorithm only examines n²/2 pairs | Misidentifying the dominant term            | Write the exact summation before applying limits     |
| Assuming early-exit improves worst-case class | Confusing average with worst case           | Analyse the input that forces full execution         |
| Claiming O(1) space for recursion of depth log n | Ignoring the call stack                     | Add stack depth to auxiliary-space accounting        |
| Using big-O when Θ is required    | Loose upper-bound language                  | Verify both upper and lower bounds before publishing |

## 7. The textbook-precise statement
Let f and g be eventually positive functions on the natural numbers. We say f(n) ∈ O(g(n)) if and only if there exist constants c > 0 and n₀ such that for all n ≥ n₀,  
$$0 \le f(n) \le c\cdot g(n).$$  
When g(n) belongs to one of the eight families listed in the title, the algorithm is labelled accordingly. (Cormen et al., *Introduction to Algorithms*, 4e, §3.1)

## 8. Visual — diagram or schematic
```text
Growth-rate ladder (log scale on y-axis)
n!   ────────────────────────────────────────────────
2^n  ─────────────────────────────────────
n³   ───────────────────────────
n²   ────────────────────
n log n ─────────────
n    ──────────
log n ─────
1     ──
          1   10   100  1000  10k   n →
```
Each horizontal line represents one class; vertical distance shows the factor by which the higher class exceeds the lower at any given n.

## 9. The memory technique
**The hook** — picture eight rungs of a ladder climbing into the sky; each rung is labelled with its class and the distance between rungs grows exponentially, so the factorial rung is already above the clouds while the constant rung is still on the ground.

**What to overlearn** — the eight classes in ascending order, the fact that log₂ n is the number of halvings, and the master-method case for T(n) = aT(n/b) + f(n) when f(n) = Θ(n^d).

**Spaced-repetition schedule** — review the ladder image after 1 day, again after 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback** — start from the exact recurrence or summation, discard lower-order terms by taking the limit of their ratio to the candidate dominant term, and read the resulting power or exponential.

## 10. What this unlocks
Mastery of these eight classes lets you analyse every algorithm that appears in sorting, searching, graph traversal, dynamic programming, and NP-complete problem solving.

- Next: Master theorem and Akra–Bazzi method for solving divide-and-conquer recurrences
- Next: Amortised analysis of dynamic arrays and splay trees
- Next: Space–time trade-offs in hash tables and Bloom filters
- Next: Fixed-parameter tractability when exponential dependence is confined to a small parameter

## 11. Self-check — five questions, no answers
1. An algorithm performs exactly 3n + 7 comparisons. Which class does it belong to, and why is the constant 3 irrelevant?

2. A recursive function satisfies T(n) = T(n−1) + n. Derive its asymptotic class step by step.

3. Two algorithms solve the same problem in O(n log n) and O(n²) respectively. For which range of n is the quadratic algorithm allowed to be faster on real hardware?

4. Identify the flaw: “Because binary search runs in O(log n) and we call it n times, total time is O(n log n).” Under what additional assumption is the claim actually correct?

5. Give a concrete input size n at which 2^n first exceeds n³ by more than a factor of one million, and verify the calculation.