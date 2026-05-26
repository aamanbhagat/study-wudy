## 1. The one-sentence answer
**The recursion tree method solves a recurrence by drawing the call tree, summing the non-recursive work performed at every node, and adding the resulting geometric series level by level.**

A recursion tree is simply the unrolling of a recurrence into an explicit tree whose nodes carry the cost of the work done outside the recursive calls. Each level of the tree corresponds to a slice of the original problem size; the total cost is the sum of the per-level costs. Because the tree is usually regular, the per-level costs form a geometric series whose closed form is immediate once the branching factor and the shrinkage ratio are known.

The method therefore converts an opaque recurrence into ordinary high-school summation. It works for any divide-and-conquer recurrence whose subproblem sizes shrink by constant factors; it fails when the subproblem sizes are data-dependent or when the work per level is not uniform.

> [!NOTE]
> The decisive insight is that the height of the tree is \(\Theta(\log n)\) and the work per level is usually \(\Theta(n)\) or a simple multiple of \(n\), so the total is \(\Theta(n \log n)\) or a constant multiple of the root cost.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover flight software uses a recursive path-planning routine whose worst-case running time is bounded by a recursion-tree analysis of the A* search on a 2048×2048 elevation map; the resulting \(\Theta(n \log n)\) guarantee lets engineers certify that the planner finishes inside the 2-second real-time window.

In the training of large language models, the FlashAttention kernel rewrites the attention computation as a recursive blocked matrix multiplication whose complexity is derived via a recursion tree; the analysis shows that the number of HBM reads drops from \(\Theta(n^2)\) to \(\Theta(n^2 / \sqrt{M})\) for SRAM size \(M\), directly enabling the 15× speedup reported in the 2022 paper.

Semiconductor place-and-route tools at TSMC employ recursive bipartitioning for floor-planning 3-D chiplets; the recursion tree of the Fiduccia–Mattheyses heuristic yields an \(O(n \log n)\) bound that is used to set the time-out limits on the nightly regression farm.

Modern database engines (CockroachDB, TiDB) decide whether to push a recursive common-table-expression down to the storage layer by comparing the tree-derived I/O cost against the iterative alternative; the decision appears in every query plan that contains hierarchical data such as organizational charts.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| **Recurrence relation**  | The input to the method is a recurrence \(T(n) = aT(n/b) + f(n)\). |
| **Geometric series**     | Summing costs level by level reduces to \(\sum r^k\).     |
| **Big-O / \(\Theta\) notation** | The final answer must be expressed in asymptotic form. |
| **Tree height**          | \(\log_b n\) determines how many levels exist.            |

## 4. Building the idea — from intuition to formalism

### Step 1 — Draw the call tree
A recurrence \(T(n) = aT(n/b) + f(n)\) describes a root that performs \(f(n)\) work and then spawns \(a\) children each of size \(n/b\).  
**Concrete example.** For merge sort: \(T(n) = 2T(n/2) + n\). The root does \(n\) work and creates two subproblems of size \(n/2\).  
Formal statement: the tree has branching factor \(a\) and every edge reduces problem size by factor \(b\).  
> [!WARNING]  
> Treating the subproblem sizes as independent random variables instead of deterministic fractions \(n/b\) produces an incorrect height.

### Step 2 — Label every node with its cost
Each internal node at a given depth receives a subproblem of size \(n/b^i\) and therefore contributes cost \(f(n/b^i)\).  
**Concrete example.** At depth 1 of the merge-sort tree every node costs \(n/2\), and there are two of them, for total \(n\).  
Formal statement: cost of one node at level \(i\) is \(f(n/b^i)\).  
> [!WARNING]  
> Forgetting that \(f\) is applied to the reduced size, not to \(n\), inflates every level cost by the same factor.

### Step 3 — Count nodes per level
Level \(i\) contains exactly \(a^i\) nodes.  
Formal statement: number of nodes at depth \(i\) = \(a^i\).  
> [!WARNING]  
> Using \(a^{i+1}\) instead of \(a^i\) off-by-one error shifts the entire sum.

### Step 4 — Write the cost of one full level
Cost of level \(i\) = \(a^i \cdot f(n/b^i)\).  
**Concrete example.** Merge sort: \(2^i \cdot (n/2^i) = n\). Every level costs exactly \(n\).  
Formal statement: \(C_i = a^i f(n/b^i)\).  
> [!WARNING]  
> Canceling \(a^i\) and \(b^i\) before substituting the concrete \(f\) hides whether the series is constant, increasing, or decreasing.

### Step 5 — Sum over all levels
The tree has height \(h = \log_b n\). Total cost  
\[
T(n) = \sum_{i=0}^{h-1} C_i + \Theta(1)\cdot a^h.
\]
**Concrete example.** Merge sort: \(\sum_{i=0}^{\log_2 n-1} n + \Theta(n) = n\log_2 n + \Theta(n)\).  
Formal statement: \(T(n) = \sum_{i=0}^{\log_b n-1} a^i f(n/b^i) + \Theta(n^{\log_b a})\).  
> [!WARNING]  
> Stopping the sum at \(i = \log_b n\) without adding the leaves produces an off-by-\(\Theta(n^{\log_b a})\) error.

### Step 6 — Evaluate the geometric series
Factor out the dominant term and apply the closed form of the geometric sum. The result is expressed in \(\Theta\) notation. This is the textbook statement of the recursion-tree solution.

## 5. Worked examples — every step shown

**Example 1 — Merge sort**  
*Given:* \(T(n)=2T(n/2)+n\), \(T(1)=1\).  
*Find:* asymptotic solution.  
Level cost \(C_i=2^i\cdot(n/2^i)=n\).  
Number of levels \(\log_2 n\).  
Leaves: \(n\) nodes each costing \(\Theta(1)\).  
\[
T(n)=\sum_{i=0}^{\log_2 n-1}n+\Theta(n)=n\log_2 n+\Theta(n).
\]  
**\(T(n)=\Theta(n\log n)\)**  

*Reflection.* The series is constant per level; the only variable is the number of levels.

**Example 2 — Binary search**  
*Given:* \(T(n)=T(n/2)+\Theta(1)\).  
Level cost \(C_i=1\).  
Height \(\log_2 n\).  
\[
T(n)=\sum_{i=0}^{\log_2 n}1=\Theta(\log n).
\]  
**\(T(n)=\Theta(\log n)\)**  

*Reflection.* One node per level yields a trivial sum.

**Example 3 — Strassen’s algorithm**  
*Given:* \(T(n)=7T(n/2)+\Theta(n^2)\).  
\[
C_i=7^i\cdot(n/2^i)^2=n^2(7/4)^i.
\]  
Sum  
\[
T(n)=n^2\sum_{i=0}^{\log_2 n}(7/4)^i=\Theta(n^2(7/4)^{\log_2 n})=\Theta(n^{\lg7}).
\]  
**\(T(n)=\Theta(n^{\lg7})\)**  

*Reflection.* The ratio \(7/4>1\) makes the last level dominate.

**Example 4 — Akra–Bazzi style uneven split**  
*Given:* \(T(n)=T(n/3)+T(2n/3)+n\).  
Level costs still sum to \(n\) at every level (the two subproblem sizes add to \(n\)).  
Height \(\Theta(\log n)\).  
**\(T(n)=\Theta(n\log n)\)**  

*Reflection.* The per-level total remains \(n\) even though subproblem sizes differ.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(n\) instead of \(n/b^i\) in \(f\) | Copy-paste from root cost                   | Write the argument of \(f\) explicitly each time |
| Forgetting the leaves             | Thinking only of internal work              | Always add the \(\Theta(n^{\log_b a})\) term |
| Wrong height                      | Confusing \(\log_b n\) with \(\log_2 n\)    | Keep base \(b\) visible until the end        |
| Summing to \(i=\log n\) inclusive | Off-by-one on last internal level           | Use \(i=0\dots h-1\) and add leaves separately |
| Treating \(a^i\) as continuous    | Visualizing the tree as a smooth curve      | Count nodes discretely before summing        |
| Ignoring base cases               | Assuming \(T(1)=\Theta(1)\) is automatic    | State \(T(1)\) explicitly in every recurrence |
| Canceling before substituting \(f\)| Algebraic habit that hides the ratio \(r\)  | Substitute concrete \(f\) first              |

## 7. The textbook-precise statement
Let \(a\ge1\), \(b>1\) be constants and let \(f(n)\) be asymptotically positive. The solution to the recurrence  
\[
T(n)=aT(n/b)+f(n)
\]  
is given by the recursion-tree summation  
\[
T(n)=\Theta(n^{\log_b a})+\sum_{i=0}^{\log_b n-1}a^i f(n/b^i).
\]  
When \(f(n)=\Theta(n^k)\) with \(k\neq\log_b a\), the sum is a geometric series whose closed form yields the three cases of the Master Theorem (Cormen et al., *Introduction to Algorithms*, 4e, §4.5).

## 8. Visual — diagram or schematic
```text
Level 0          [n]                 cost f(n)
                /   \
Level 1      [n/b] [n/b]            a * f(n/b)
              / \   / \
Level 2   [n/b²]..(a² nodes)        a² * f(n/b²)
...
Level h   (a^h leaves)              Θ(n^{log_b a})
```

Height \(h=\log_b n\). Each downward edge multiplies size by \(1/b\); each rightward step multiplies node count by \(a\).

## 9. The memory technique
**The hook.** Picture a Christmas tree whose ornaments at level \(i\) each glow with brightness \(f(n/b^i)\); the total brightness is the sum you want.

**What to overlearn.**  
- Height = \(\log_b n\).  
- Level-\(i\) cost = \(a^i f(n/b^i)\).  
- Master-Theorem critical exponent \(\log_b a\).

**Spaced-repetition schedule.** Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback.** Re-derive the height from \(n/b^h=1\), recompute one level cost, then sum the geometric series \(\sum r^i\).

## 10. What this unlocks
Mastery of recursion trees lets you read off the complexity of any regular divide-and-conquer algorithm without guessing. It directly feeds the Master Theorem, Akra–Bazzi theorem, and the analysis of cache-oblivious algorithms.

- Next: Master Theorem case analysis  
- Next: Substitution method for proving the tree bound  
- Next: Akra–Bazzi for non-uniform subproblem sizes  
- Next: Cache-oblivious matrix multiplication and FFT

## 11. Self-check — five questions, no answers
1. Draw the recursion tree for \(T(n)=3T(n/4)+n^2\) and state the cost of level 2.  
2. For which value of \(k\) does \(T(n)=2T(n/2)+n^k\) become \(\Theta(n\log n)\)?  
3. Why does the recursion-tree argument fail for the recurrence of the naive recursive Fibonacci algorithm?  
4. Compute the exact number of internal nodes in the tree of \(T(n)=T(n-1)+1\).  
5. A colleague claims the height of the tree for \(T(n)=T(\lfloor n/2\rfloor)+T(\lceil n/2\rceil)+n\) is still \(\log_2 n\). Is the claim correct? What changes in the summation?