## 1. The one-sentence answer
**Any comparison-based sorting algorithm requires Ω(n log n) comparisons in the worst case because its execution traces form a binary decision tree with at least n! leaves.**

A comparison sort examines pairs of elements and branches on the outcome <, =, or >. Each possible sequence of outcomes corresponds to a path from the root of a binary tree to a leaf; that leaf identifies exactly one permutation of the input. Because there are n! distinct permutations that must be distinguished, the tree must contain at least n! leaves. The shortest possible binary tree with L leaves has height ⌈log₂ L⌉; substituting L = n! immediately yields a lower bound of log₂(n!).

Stirling’s approximation shows that log₂(n!) = n log₂ n − Θ(n), confirming the bound is asymptotically Ω(n log n). The argument applies to every comparison sort—quicksort, mergesort, heapsort, insertion sort—regardless of clever pivot choices or early exits; the information-theoretic cost cannot be avoided.

> [!NOTE]
> The bound is information-theoretic, not algorithmic: it counts the minimum number of yes/no answers needed to identify an unknown permutation, independent of how cleverly those answers are obtained.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover sorts millions of telemetry packets by priority before transmission; the onboard scheduler must guarantee worst-case latency, and the Ω(n log n) bound tells engineers that any comparison-based priority queue will consume at least that many comparisons per batch.

Google’s Spanner distributed database maintains a global total order on timestamps across data centers; its internal merge step on version vectors relies on comparison sorting whose lower bound directly limits the throughput of cross-region transactions.

In semiconductor design, Intel’s timing-analysis tools sort billions of gate-delay values to detect critical paths. The proven lower bound forces the use of either comparison sorts with optimal constants or non-comparison radix sorts when keys have limited bit width.

Modern genome assemblers such as SPAdes sort k-mer spectra containing 10¹⁰ distinct strings; the decision-tree argument explains why even highly engineered comparison sorters cannot finish in o(n log n) time and therefore why engineers switch to radix or suffix-array constructions.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Binary tree height       | The worst-case number of comparisons equals tree height   |
| Permutations and n!      | Each possible ordering must appear as a distinct leaf     |
| Logarithm base change    | Converts the information-theoretic count into big-Omega   |
| Stirling’s approximation | Supplies the clean n log n asymptotic from log(n!)        |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every comparison produces a binary branch
A comparison sort never examines the numerical values themselves; it only learns the relative order of two elements. Each such test therefore splits the set of still-possible orderings into two disjoint subsets.  
Example: sorting [a,b] yields either “a < b” or “a > b”.  
Formally, every internal node has exactly two children.  
> [!WARNING] Treating equality as a third branch does not change the asymptotic height; the tree remains binary for worst-case analysis.

### Step 2 — Execution traces form a binary decision tree
Each sequence of comparison outcomes traces a unique root-to-leaf path. The algorithm’s control flow is completely captured by this tree; the input values only determine which path is taken.  
Example: mergesort on three elements generates a fixed pattern of four to six comparisons depending on outcomes.  
The decision tree therefore models every possible run of the algorithm.

### Step 3 — Each leaf corresponds to exactly one permutation
When the algorithm terminates it must have identified the complete order of the input. Hence every permutation appears as the ordering consistent with the comparisons along at least one path.  
There are n! permutations, so the tree has ≥ n! leaves.

### Step 4 — Height equals worst-case comparisons
The longest root-to-leaf path contains the maximum number of comparisons performed on any input. For a binary tree this length is at least ⌈log₂ L⌉ where L is the number of leaves.  
Thus any correct comparison sort satisfies  
$$T(n)\ge\log_2(n!).$$

### Step 5 — Stirling’s formula converts the bound
Stirling’s approximation states  
$$n!\approx\sqrt{2\pi n}\,(n/e)^n.$$  
Taking the base-2 logarithm yields  
$$\log_2(n!)=n\log_2 n-\Theta(n).$$  
Hence \(T(n)=\Omega(n\log n)\).

### Step 6 — The textbook statement
Any comparison sort has worst-case running time \(\Omega(n\log n)\). This is the information-theoretic lower bound for the comparison model.

## 5. Worked examples — every step shown

**Example 1 — n = 2**  
*Given:* Two distinct elements.  
*Find:* Minimum comparisons in worst case.  
There are 2! = 2 permutations.  
A binary tree needs at least 2 leaves, hence height \(\lceil\log_2 2\rceil=1\).  
**1**  
*Reflection:* The single comparison is both necessary and sufficient; the bound is tight.

**Example 2 — n = 3**  
*Given:* 3! = 6 permutations.  
*Find:* Lower bound height.  
\(\log_2 6\approx 2.585\), so height ≥ 3.  
Any algorithm that stops after two comparisons can distinguish at most 4 leaves and therefore fails on at least two permutations.  
**3**  
*Reflection:* Even the optimal decision tree for n = 3 is not balanced; some leaves sit at depth 3.

**Example 3 — n = 4**  
*Given:* 24 permutations.  
*Find:* \(\log_2 24\).  
\(\log_2 24\approx 4.585\), therefore any comparison sort requires at least 5 comparisons on some input.  
Step-by-step: 2⁴ = 16 < 24, 2⁵ = 32 ≥ 24, ceiling yields 5.  
**5**  
*Reflection:* The ceiling operation matters; the bound is not always an integer.

**Example 4 — Asymptotic via Stirling**  
*Given:* \(\log_2(n!)\).  
*Find:* Leading term.  
Apply Stirling:  
$$\log_2(n!)=n\log_2 n-n\log_2 e+\frac12\log_2(2\pi n).$$  
Drop lower-order terms:  
$$\log_2(n!)=n\log_2 n-\Theta(n).$$  
Thus \(\Omega(n\log n)\).  
**\(\Omega(n\log n)\)**  
*Reflection:* The dominant term arises solely from the (n/e)^n factor; all other constants are absorbed in the Theta notation.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting the ceiling            | Students write log₂(n!) instead of ⌈log₂(n!)⌉ | Always remember height is an integer                 |
| Confusing average and worst case  | Many algorithms are analysed on average     | The decision-tree height is defined by the longest path |
| Assuming three-way branches help  | Equality tests appear to give ternary splits | In the worst case equality rarely occurs; height remains ⌈log₂(n!)⌉ |
| Applying the bound to radix sort  | Radix sort is not comparison-based          | Check the model before quoting the bound             |
| Ignoring that leaves may be empty | Some paths may be unreachable               | The lower bound still holds; extra leaves only increase height |
| Using natural log without conversion | Forgetting base change                      | Multiply by log₂ e when moving from ln to log₂       |
| Thinking the bound is constructive | The proof gives no algorithm                | Treat it purely as an impossibility result           |

## 7. The textbook-precise statement
Any deterministic comparison sort can be modelled by a binary decision tree in which each internal node represents a comparison between two input elements and each leaf corresponds to a unique permutation. Because there are n! permutations, the tree contains at least n! leaves. The worst-case number of comparisons is therefore the height of the tree, which satisfies  
$$T(n)\ge\lceil\log_2(n!)\rceil.$$  
By Stirling’s approximation, \(T(n)=\Omega(n\log n)\). (Cormen et al., *Introduction to Algorithms*, 4e, §8.1.)

## 8. Visual — diagram or schematic

```text
                a ? b
               /     \
            a<b       a>b
             /         \
          b ? c       b ? c
         /   \       /   \
       ...   ...   ...   ...
      (6 leaves at depths 2–3)
```
Label: root = first comparison, internal nodes = subsequent comparisons, leaves = identified permutations. The longest path equals the worst-case comparison count.

## 9. The memory technique

1. **The hook** — Picture a tournament bracket with n! players; the champion can be declared only after the bracket reaches depth log₂(n!).  
2. **What to overlearn** — log₂(n!) ≥ n log₂ n − n and T(n) ≥ ⌈log₂(n!)⌉.  
3. **Spaced-repetition schedule** — Review the Stirling step at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by counting leaves → binary height → Stirling.

## 10. What this unlocks
This lower bound demarcates the comparison model from the integer model and justifies the study of radix sort, counting sort, and van Emde Boas trees. It also supplies the information-theoretic half of the proof that comparison-based selection has an Ω(n) lower bound and that sorting networks require Ω(n log n) comparators.

## 11. Self-check — five questions, no answers
1. For n = 5, compute the smallest integer h such that a binary tree of height h can have at least 120 leaves.  
2. Does the Ω(n log n) bound apply to a sorting algorithm that occasionally inspects three elements at once?  
3. Why does the existence of unreachable leaves not invalidate the lower-bound argument?  
4. Show that log₂(n!) = n log₂ n − Θ(n) using only the integral bounds on the harmonic series.  
5. Name one practical sorting situation in which the decision-tree model is unrealistic and explain why.