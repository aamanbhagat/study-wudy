## 1. The one-sentence answer
**The 0/1 knapsack problem defeats every greedy choice rule because a locally maximal selection can block a globally superior combination of items.**

Consider three items whose weights and values are fixed in advance and a knapsack of fixed capacity. Any rule that always picks the item with highest value, lowest weight, or highest value-per-unit-weight commits irrevocably; once the chosen item is inside the knapsack, no fractional remainder can be exchanged for two or more smaller items whose combined value is larger. The failure is therefore structural, not numerical: the feasible set is not closed under the greedy operation.

The same phenomenon appears whenever the decision variables are forced to be binary. Because each variable may be used at most once, the ordering induced by any density function can produce an infeasible or suboptimal prefix that no later correction can repair.

> [!NOTE]
> The decisive insight is that optimality for the fractional relaxation does not imply optimality for the integer restriction; the counter-example is simply the smallest integer instance in which the two optima diverge.

## 2. Why this matters — concrete and current
NASA’s Europa Clipper mission planners must pack a fixed-mass science payload into a launch vehicle whose mass budget is strictly integer; choosing the highest science-value instrument first can exclude two lighter instruments whose combined data return exceeds the single heavier one.

Modern cloud schedulers at Google Borg and AWS EC2 decide whether to place an entire virtual machine on a host or reject it; a greedy policy that accepts the largest-value VM can leave memory or CPU fragments too small for two higher-priority smaller VMs that together generate more revenue.

Semiconductor mask-set optimization at TSMC assigns reticle slots of fixed area to intellectual-property blocks; selecting the block with highest profit density can leave rectangular regions that cannot accommodate two smaller blocks whose total royalty exceeds the first choice.

In CRISPR guide-RNA library design, each candidate guide consumes a fixed number of synthesis cycles; a greedy algorithm that always picks the guide with highest on-target score can exhaust the cycle budget before two lower-scoring guides that together cover a critical exon pair are included.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| **0/1 decision variables** | Each item may be taken wholly or not at all; fractions are forbidden. |
| **Feasible-set cardinality** | The number of subsets grows as \(2^n\); exhaustive search is exponential. |
| **Fractional knapsack optimum** | The linear-programming relaxation solved by greedy density supplies an upper bound that the integer solution may miss. |
| **Exchange argument**     | Proof technique that shows why swapping one item for two others can improve the objective. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Local density versus global packing
A density-ordered selection can saturate capacity with a single high-density item whose value is smaller than the sum of two lower-density items that fit exactly.

Concrete instance: capacity \(W=10\), items \((w=6,v=6)\), \((w=5,v=5)\), \((w=5,v=5)\). Density ordering selects the first item and stops; total value 6. The two lighter items yield 10.

Formal statement: let \(x_i\in\{0,1\}\). The greedy rule \(x_j=1\) where \(j=\arg\max v_i/w_i\) produces a feasible vector whose objective is not maximal.

> [!WARNING]
> Treating the ratio \(v_i/w_i\) as an intrinsic worth independent of remaining capacity hides the combinatorial interaction among the remaining items.

### Step 2 — Irrevocability of the binary choice
Once an item is placed, its weight is subtracted exactly; no residual fraction remains that could be traded.

Formal statement: after setting \(x_j=1\), the residual capacity becomes \(W-w_j\). Any subsequent item \(k\) must satisfy \(w_k\le W-w_j\).

> [!WARNING]
> Students often imagine they can “replace” the chosen item later; the 0/1 constraint forbids that replacement.

### Step 3 — Counter-example construction
Construct an instance in which the single best-density item leaves a remainder strictly smaller than the next item’s weight, while two inferior-density items sum exactly to capacity.

Display math:
$$
\begin{align*}
W&=15,\\
(w_1,v_1)&=(10,60),\quad (w_2,v_2)=(7,48),\quad (w_3,v_3)=(7,48).
\end{align*}
$$

Greedy selects item 1 (value 60). Optimal selects items 2 and 3 (value 96).

### Step 4 — Generalisation to arbitrary densities
Any total ordering of items by a fixed scoring function \(s(i)\) admits an instance where the prefix chosen by that ordering is dominated by a non-prefix subset.

### Step 5 — Textbook statement of the negative result
No greedy algorithm that examines items in an order determined solely by per-item attributes (value, weight, or any fixed function thereof) solves every 0/1 knapsack instance to optimality.

## 5. Worked examples — every step shown

**Example 1 — Minimal divergence**
*Given:* \(W=10\), items \((6,6)\), \((5,5)\), \((5,5)\).  
*Find:* optimal value versus greedy-by-density value.  

Step 1: compute densities \(\frac{6}{6}=1\), \(\frac{5}{5}=1\).  
*Why* — densities identical, tie broken arbitrarily.  
Step 2: pick first item, residual capacity \(10-6=4\).  
*Why* — 4 is less than 5, so no further items fit.  
Step 3: objective = 6.  
*Why* — enumeration of remaining subsets yields two items summing to 10 with value 10.  

**Final answer**  
**10**

*Reflection* — identical densities still produce sub-optimality because of indivisibility.

**Example 2 — Distinct densities**
*Given:* \(W=15\), \((10,60)\), \((7,48)\), \((7,48)\).  
*Find:* values.  

Step 1: densities 6, \(\approx6.857\), \(\approx6.857\).  
*Why* — second and third items rank higher.  
Step 2: greedy nevertheless picks first because many implementations break ties by index.  
*Why* — ordering artifact.  
Step 3: residual 5; nothing fits. Value 60. Optimal 96.  

**Final answer**  
**96**

*Reflection* — even when density ordering is “correct,” the integer constraint overrides it.

**Example 3 — Three-item trap**
*Given:* \(W=20\), items A(12,80), B(10,60), C(10,60).  
Greedy density selects A then stops. Optimal B+C=120.

**Final answer**  
**120**

*Reflection* — remainder 8 is useless; two exact halves succeed.

**Example 4 — Scaled instance**
*Given:* \(W=50\), items (20,100), (30,120), (10,60) with densities 5,4,6.  
Greedy selects the density-6 item then the density-5 item (value 160). Optimal selects the two heavier items (value 220).

**Final answer**  
**220**

*Reflection* — scaling preserves the structural mismatch.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming density ordering is always safe | Fractional-knapsack success creates false intuition | Test the instance against the two-item exchange |
| Forgetting that remainder capacity may be unusable | Arithmetic on weights is performed but not checked for fit | After each greedy placement, enumerate the residual subset explicitly for small n |
| Using value alone as tie-breaker | Value ordering ignores weight | Always compute at least two different scoring functions and compare |
| Believing dynamic programming is “just slower greedy” | Both algorithms examine items sequentially | DP fills a table of subproblems; greedy never revisits earlier decisions |
| Ignoring that optimal solution may contain zero high-density items | Psychological anchoring on the largest ratio | Solve the instance by exhaustive enumeration when n≤20 |
| Over-generalising the counter-example to all optimisation | One negative instance disproves universality, not utility on special cases | Verify matroid structure before claiming greedy correctness |
| Confusing 0/1 with unbounded knapsack | Unbounded allows multiples; 0/1 forbids them | Keep the variable domain explicit in every proof |

## 7. The textbook-precise statement
No greedy algorithm that orders items by a per-item scoring function solves the 0/1 knapsack problem to optimality on every instance. Formally, let \(I=(n,W,w,v)\) be any instance with \(w_i,v_i\in\mathbb{Z}^+\). There does not exist a total order \(\prec_s\) induced by a function \(s:\{1,\dots n\}\to\mathbb{R}\) such that the prefix selected by \(\prec_s\) is optimal for every feasible capacity. (Cormen et al., *Introduction to Algorithms*, 4e, §16.2, “An activity-selection problem” and the subsequent knapsack discussion.)

## 8. Visual — diagram or schematic
```text
Capacity W = 15
+---------------+---------------+
|   Item 1      |   Items 2+3   |
| w=10 v=60     | w=7 v=48 each |
|   (greedy)    |   (optimal)   |
+---------------+---------------+
Remainder after greedy: 5 (too small)
Remainder after optimal: 1 (exact fit)
```
The diagram shows the single rectangle taken by greedy versus the two adjacent rectangles that together occupy the same total width yet yield higher value.

## 9. The memory technique
1. **The hook** — picture a greedy hiker who grabs the single heaviest gold nugget and then cannot fit two smaller but collectively richer nuggets into his remaining pack space.
2. **What to overlearn** — the three-item instance \((W=15,(10,60),(7,48),(7,48))\) and the numerical gap 60 versus 96.
3. **Spaced-repetition schedule** — review the counter-example at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — rebuild by writing the two feasible subsets whose cardinalities differ by one and whose values cross, then verify that any density ordering selects the inferior subset.

## 10. What this unlocks
Recognising that greedy fails on 0/1 knapsack forces the move to systematic enumeration or dynamic programming and prepares the ground for matroid theory, which characterises exactly when greedy succeeds.

- 0/1 knapsack DP recurrence
- Matroid greedy theorem (Cormen §16.4)
- Branch-and-bound for integer programs
- Approximation schemes for knapsack (FPTAS)

## 11. Self-check — five questions, no answers
1. Construct a four-item instance where greedy by value/weight yields less than 70 % of optimal value.
2. Prove that any instance with only two items is solved correctly by density ordering.
3. Show that the fractional-knapsack solution value is always an upper bound on the 0/1 optimum.
4. Identify the smallest capacity for which the classic three-item counter-example still diverges.
5. Explain why the same counter-example does not disprove greedy for the fractional relaxation.