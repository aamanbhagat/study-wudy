## 1. The one-sentence answer
**Merge sort is a stable, divide-and-conquer sorting algorithm whose recurrence solves to \(\Theta(n \log n)\) time by recursively halving the input, sorting the halves, and merging them in linear time.**

The core mechanism is simple once seen: an array is split at its midpoint until every piece contains a single element; single elements are already sorted. These pieces are then recombined by a merge procedure that always consumes the smaller of the two current heads, guaranteeing that the output of each merge is sorted and that equal elements retain their original relative order.

Because the split is always balanced, the depth of recursion is exactly \(\log_2 n\) and each level performs a total of \(n\) comparisons and copies; the product yields the \(n \log n\) bound. Correctness follows by induction on array length: the base case of length 1 is trivial, and the inductive step holds because the merge step preserves order.

> [!NOTE]
> The single deepest insight is that the expensive work happens only in the linear-time merge; the divide step itself costs nothing beyond index arithmetic, which is why the algorithm pays exactly the information-theoretic minimum for comparison-based sorting on average.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover sorts telemetry packets by timestamp before downlink; the flight software uses a merge-sort variant because the algorithm’s stability guarantees that packets with identical timestamps keep their original acquisition order, eliminating an entire class of sequencing bugs observed on earlier Mars missions.

Google’s BigQuery engine employs external merge sort when query results exceed available RAM; the algorithm’s predictable \(O(n \log n)\) I/O complexity and natural fit to sorted runs on disk allow the system to stream petabyte-scale results without random seeks.

In semiconductor timing analysis, Synopsys PrimeTime sorts millions of path-delay values every time a chip is placed-and-routed; the stable property ensures that when two paths report identical delays the tool reports them in the same order across successive runs, making incremental ECO (engineering change order) debugging deterministic.

The Linux kernel’s `ext4` filesystem uses a merge-sort variant inside its directory-entry sorting routine; because directory entries with identical hash values keep their creation order, filesystem checkers can detect certain corruption patterns that would be invisible under an unstable sort.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Recursion                | Merge sort is defined by recursive calls on sub-arrays    |
| Array indexing           | Correct midpoint calculation and in-place index management require precise bounds |
| Big-O notation           | The master theorem or recursion-tree argument yields \(\Theta(n \log n)\) |
| Loop invariants          | The merge procedure’s correctness rests on an invariant that the output prefix is always sorted |

## 4. Building the idea — from intuition to formalism

### Step 1 — Divide the problem
An arbitrary array of length \(n > 1\) is split into two contiguous halves of sizes \(\lfloor n/2 \rfloor\) and \(\lceil n/2 \rceil\).  
Example: `[7, 3, 9, 1]` splits into `[7, 3]` and `[9, 1]`.  
Formally the split indices are \(mid = \lfloor (low + high)/2 \rfloor\).

> [!WARNING]
> Using integer division without the floor function on odd lengths produces unbalanced subproblems and destroys the \(\log n\) depth guarantee.

### Step 2 — Conquer each half
Each half is sorted by applying the same algorithm recursively until every sub-array contains one element.  
A single element is sorted by definition.

### Step 3 — Merge two sorted runs
Two already-sorted arrays \(A\) and \(B\) are combined by repeatedly copying the smaller of the two heads; when one run is exhausted the remainder of the other is appended.  
This step examines each element exactly once and therefore costs \(\Theta(|A| + |B|)\) time.

### Step 4 — Write the recurrence
Let \(T(n)\) be the time to sort \(n\) elements. Then  
\[
T(n) = 
\begin{cases}
\Theta(1) & n \le 1 \\
2T(n/2) + \Theta(n) & n > 1
\end{cases}
\]

### Step 5 — Solve the recurrence
Unrolling yields a recursion tree of height \(\log_2 n\) with \(n\) work at every level, hence \(T(n) = \Theta(n \log n)\).

### Step 6 — Prove stability
During merge, equal keys are taken from the left run before the right run; therefore original relative order is preserved.

### Step 7 — Prove correctness by induction
Base: length 1 is trivially sorted.  
Inductive step: assume both halves are correctly sorted; the merge procedure’s loop invariant (“the output prefix is sorted and contains the smallest remaining elements”) guarantees the final merged array is sorted.

## 5. Worked examples — every step shown

**Example 1 — Two-element array**  
*Given:* `[5, 2]`  
*Find:* sorted result and merge trace  
Split at index 1 → `[5]` and `[2]`.  
Merge: compare 5 and 2, output 2 then 5.  
**Final answer: [2, 5]**  
*Reflection:* The single comparison already demonstrates both the conquer and merge phases.

**Example 2 — Four-element array with duplicate**  
*Given:* `[3, 1, 3, 2]`  
*Find:* stable sorted order  
Recursion tree:  
- `[3, 1]` → `[1, 3]`  
- `[3, 2]` → `[2, 3]`  
Merge: heads 1 and 2 → 1; heads 3 and 2 → 2; heads 3 and 3 → left 3 then right 3.  
**Final answer: [1, 2, 3, 3]**  
*Reflection:* The two 3’s kept their original order, illustrating stability.

**Example 3 — Odd length**  
*Given:* `[9, 4, 7, 2, 5]`  
*Find:* full execution trace  
Mid = 2 → `[9, 4, 7]` and `[2, 5]`.  
Further splits produce leaves `[9],[4],[7]` and `[2],[5]`.  
Merges ascend the tree exactly as in Step 3.  
**Final answer: [2, 4, 5, 7, 9]**  
*Reflection:* The floor/ceiling split still yields a balanced tree of height 3.

**Example 4 — Already sorted input**  
*Given:* `[1, 2, 3, 4]`  
*Find:* number of comparisons performed  
Every merge still examines both heads, performing exactly \(n-1\) comparisons per level.  
**Final answer: 3 levels × 3 comparisons = 9 comparisons**  
*Reflection:* Merge sort never exploits existing order; this is the price of its worst-case guarantee.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Off-by-one in midpoint            | Using `(low + high) / 2` without floor on odd lengths | Always write `mid = low + (high - low) / 2` |
| Forgetting to copy tail after one run empties | Merge loop exits early                      | Append remaining elements of the non-empty run explicitly |
| Assuming auxiliary array is unnecessary | In-place merge appears possible             | Allocate a temporary buffer of size n once   |
| Treating stability as automatic   | Many textbooks omit the equal-key rule      | In merge code, copy from left on `<=`        |
| Recursion depth panic on large n  | Default stack is small                      | Increase stack size or implement bottom-up merge sort |
| Miscalculating \(\log_2 n\) levels| Counting only recursive calls, not merges   | Draw the recursion tree once per problem size|
| Index overflow in languages with fixed-width ints | `low + high` exceeds INT_MAX                | Use the safe midpoint formula above          |

## 7. The textbook-precise statement
Let \(A[1..n]\) be an array of \(n\) elements drawn from a totally ordered set. Merge sort produces a permutation \(A'\) such that \(A'[1] \le A'[2] \le \dots \le A'[n]\) and, whenever \(A[i] = A[j]\) for \(i < j\), the same inequality holds in \(A'\). The algorithm runs in \(\Theta(n \log n)\) time in the worst case and is comparison-based. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 2 and §4.4.)

## 8. Visual — diagram or schematic
```text
Level 0          [9, 4, 7, 2, 5]
                  /           \
Level 1      [9, 4, 7]       [2, 5]
             /     \          /    \
Level 2   [9,4]   [7]      [2]    [5]
           / \                merge
Level 3 [9][4]   …          → [2,5]
           merge                 |
Level 2   [4,9]   [7]          [2,5]
             \     /             |
Level 1      [4,7,9]         [2,5]
                  \           /
Level 0          [2,4,5,7,9]
```
Each horizontal line represents one full level of merging; total work per line is exactly \(n\) element visits.

## 9. The memory technique

1. **The hook** — Picture a medieval army repeatedly splitting into two perfectly equal columns, then reforming in sorted height order; the final parade is the merged result.
2. **What to overlearn** — The recurrence \(T(n) = 2T(n/2) + \Theta(n)\), the fact that merge is \(\Theta(n)\), and the stability rule “left before right on equality”.
3. **Spaced-repetition schedule** — Review the recurrence and stability rule after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Redraw the recursion tree for \(n=8\), count the work at each level, and re-derive \(\Theta(n \log n)\).

## 10. What this unlocks
Merge sort supplies the canonical example of a divide-and-conquer recurrence that is solved by the master theorem or recursion trees; the same pattern appears in closest-pair, Strassen matrix multiplication, and the FFT. It also supplies the stable primitive required by many higher-level algorithms such as patience sorting and external k-way merge.

- Quicksort’s average-case analysis
- Bottom-up merge sort (iterative)
- Counting sort / radix sort hybrids
- Inversion counting via modified merge

## 11. Self-check — five questions, no answers
1. For an array of length 7, how many element comparisons occur in the worst-case merge phase at the root level?
2. Demonstrate with a three-element example that changing the merge condition from `<=` to `<` destroys stability.
3. Write the exact recurrence for the number of comparisons performed by merge sort on an already-sorted array of size \(n = 2^k\).
4. Prove by induction that after \(k\) levels exactly \(n\) elements have been copied, regardless of input order.
5. Identify the smallest \(n\) for which the recursion depth of top-down merge sort exceeds the default stack limit on a typical 1 MiB stack (assume 4 bytes per stack frame).