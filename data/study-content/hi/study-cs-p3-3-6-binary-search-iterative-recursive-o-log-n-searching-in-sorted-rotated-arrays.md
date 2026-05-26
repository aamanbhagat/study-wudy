## 1. The one-sentence answer
**Binary search** repeatedly halves a sorted search space to locate a target in \(O(\log n)\) time, and the same halving principle extends to rotated sorted arrays after locating the pivot.

Binary search exploits the fact that a sorted array lets you discard half the remaining elements after every comparison. In the iterative version you maintain two pointers and shrink the interval until it collapses to a single index or becomes empty. The recursive version does exactly the same shrinking but passes the new bounds as parameters instead of updating loop variables. When the array is rotated, you first spend one \(O(\log n)\) pass to discover the rotation index; after that the problem reduces to ordinary binary search on one of the two monotonic halves.

> [!NOTE]
> The single most important insight is that correctness never depends on examining every element; it depends only on correctly deciding which half can be thrown away after each comparison.

## 2. Why this matters — concrete and current
Google’s Spanner and Bigtable use binary search over sorted SSTable indexes to answer point lookups in milliseconds even when the table contains petabytes.  
SpaceX’s flight software performs binary search on sorted thrust-to-time tables stored in ROM so that the engine controller can compute required throttle values within a 1 ms control loop.  
Modern CPU branch-predictor tables and TLB caches are themselves searched with hardware binary search because any \(O(n)\) scan would destroy instruction throughput.  
In semiconductor timing analysis, static timing tools run binary search on sorted delay libraries to find the minimum clock period that still satisfies all setup constraints reported by millions of paths.  
Large-language-model inference engines keep token-to-ID mappings in sorted arrays and rely on binary search for the embedding lookup step that precedes every forward pass.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Sorted array         | Guarantees that all elements to the left of any index are smaller and all to the right are larger |
| Loop invariant       | Lets you prove that the target, if present, always lies inside the current `[low, high]` interval |
| Recursion            | Provides an alternative formulation whose base case and inductive step mirror the iterative shrinking logic |
| Big-O arithmetic     | Needed to show that each step discards half the search space, yielding \(O(\log n)\) |

If any row above is unfamiliar, pause and master that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — The monotonicity property
A sorted array satisfies \(A[i] \le A[j]\) for every \(i < j\). This single inequality lets you decide, after one comparison, that an entire contiguous half can never contain the target.

Example: In `[1, 3, 5, 7, 9]` the element at index 2 is 5. Any value smaller than 5 must lie in indices 0–1; any larger value must lie in indices 3–4.

Formal statement:  
\[
\forall i < j,\ A[i] \le A[j]
\]

> [!WARNING]
> If the array is not strictly sorted, the decision “discard left half” or “discard right half” may discard the target and produce a wrong answer.

### Step 2 — Interval halving
Maintain an interval `[low, high]` that is guaranteed to contain the target if it exists. Compute `mid = low + (high - low) / 2`, compare `A[mid]` with the target, and replace the interval by either `[low, mid-1]` or `[mid+1, high]`.

Example: Searching for 7 in `[1, 3, 5, 7, 9]` gives `mid = 2`, `A[2] = 5 < 7`, so the new interval becomes `[3, 4]`.

Formal statement: After each comparison the size of the feasible interval is at most half the previous size.

### Step 3 — Iterative formulation
Use a while loop that continues while `low <= high`. Inside the loop compute `mid`, branch on the comparison, and shrink the interval. Return the index when `A[mid]` equals the target; otherwise return “not found” when the loop exits.

### Step 4 — Recursive formulation
Define a function `bs(A, target, low, high)`. If `low > high` return “not found”. Otherwise compute `mid` and recurse on the appropriate half or return `mid` if equal.

### Step 5 — Complexity derivation
Each recursive call or loop iteration reduces the interval length by a factor of roughly 2. Therefore the number of comparisons \(T(n)\) satisfies  
\[
T(n) = T(n/2) + O(1) \implies T(n) = O(\log n).
\]

### Step 6 — Extension to rotated arrays
A rotated sorted array consists of two monotonic segments separated by a pivot. Locate the pivot with one binary search pass, then decide which monotonic segment can contain the target and run ordinary binary search on that segment.

## 5. Worked examples — har step show karo

**Example 1 — Iterative search on sorted array**  
*Given:* \(A = [2, 4, 7, 10, 13, 18]\), target = 10  
*Find:* index of 10 or “not found”.  

Initialize `low = 0`, `high = 5`.  
`mid = 2`, `A[2] = 7 < 10` → set `low = 3`.  
*Why:* target must lie to the right of 7.  
`mid = 4`, `A[4] = 13 > 10` → set `high = 3`.  
*Why:* target must lie to the left of 13.  
`mid = 3`, `A[3] = 10` → return **3**.

*Reflection:* The three comparisons examined only three of six elements; the invariant that the target lies inside `[low, high]` was preserved at every step.

**Example 2 — Recursive search**  
*Given:* same array, target = 4.  
Call `bs(A, 4, 0, 5)`.  
`mid = 2`, 7 > 4 → recurse `bs(A, 4, 0, 1)`.  
`mid = 0`, 2 < 4 → recurse `bs(A, 4, 1, 1)`.  
`mid = 1`, 4 == 4 → return **1**.

*Reflection:* The call stack depth equals the number of halvings, confirming the \(O(\log n)\) bound.

**Example 3 — Rotated array pivot search**  
*Given:* \(A = [13, 18, 2, 4, 7, 10]\).  
Find pivot index (smallest element).  
`low = 0`, `high = 5`, `mid = 2`, `A[2] = 2 < A[5]` → pivot lies in left half → `high = 2`.  
`low = 0`, `high = 2`, `mid = 1`, `A[1] = 18 > A[2]` → pivot found at **2**.

*Reflection:* One extra binary search locates the rotation point without scanning the whole array.

**Example 4 — Search in rotated array**  
*Given:* same rotated array, target = 7.  
Pivot = 2. Left half `[13, 18]` is monotonic; right half `[2, 4, 7, 10]` is monotonic. Target 7 lies in right half.  
Run ordinary binary search on indices 2–5 → return **4**.

*Reflection:* After pivot discovery the problem decomposes into two standard binary-search instances.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Integer overflow on `mid = (low+high)/2` | Large indices cause `low+high` to exceed INT_MAX | Always write `mid = low + (high-low)/2`      |
| Off-by-one when updating bounds   | Forgetting whether to use `mid-1` or `mid+1` | Keep the loop invariant “target is in `[low,high]` if present” |
| Assuming array is rotated when it is not | Missing the check `A[0] <= A[n-1]`          | First test whether rotation exists           |
| Returning index from wrong half after pivot | Not comparing target with both segment ends | Compare target with `A[pivot]` and `A[n-1]` to choose segment |
| Infinite recursion                | Base case `low > high` written incorrectly  | Always test `low > high` before computing mid |
| Not handling duplicates           | Problem statement sometimes allows duplicates | Decide whether any or the leftmost index is required |
| Forgetting empty array case       | `high` initialized to `n-1` when `n=0`      | Add explicit `if n == 0 return not found`    |

## 7. The textbook-precise statement
Binary search on a sorted array \(A[1..n]\) returns an index \(i\) such that \(A[i] = x\) or reports that no such index exists. The algorithm maintains the invariant that if \(x\) occurs in \(A\) then it occurs in the subarray \(A[p..r]\). At each step it computes \(q = \lfloor (p+r)/2 \rfloor\) and compares \(x\) with \(A[q]\). If \(x < A[q]\) the search continues on \(A[p..q-1]\); if \(x > A[q]\) it continues on \(A[q+1..r]\); otherwise it returns \(q\). The procedure terminates when \(p > r\) (element absent) or when equality is found. The running time satisfies the recurrence \(T(n) = T(\lfloor n/2 \rfloor) + \Theta(1)\) whose solution is \(\Theta(\log n)\). (Cormen et al., *Introduction to Algorithms*, 4e, Section 2.3.1 and Exercise 2.3-5.)

## 8. Visual — diagram or schematic
```text
Index:  0   1   2   3   4   5
Value:  2   4   7  10  13  18
        low         mid         high
Step 1: [---------------------]
Step 2:         [-------------]
Step 3:             [-----]
Step 4:               [-]  → found at 3
```
Each bracket shows the current feasible interval; the arrow indicates the final match.

## 9. The memory technique
1. **The hook** — Picture a librarian who always tears the book in half and throws away the half that cannot contain the page you want; after a few tears only one page remains.
2. **What to overlearn** — The update formulas `mid = low + (high-low)/2`, the loop condition `while low <= high`, and the three-way comparison outcome.
3. **Spaced-repetition schedule** — Review the pivot-finding step after 1 day, implement both iterative and recursive versions after 3 days, solve two rotated-array problems after 7 days, then again after 16 and 35 days.
4. **First-principles fallback** — If you forget the code, redraw the interval on paper, write the current `low` and `high`, compute `mid`, and ask “which side is impossible?”; the answer directly gives the next interval.

## 10. What this unlocks
Mastery of binary search is the gateway to almost every logarithmic-time technique on ordered data.

- Merge sort and quicksort correctness proofs rely on the same interval invariants.
- Balanced BSTs (AVL, Red-Black) are essentially binary search performed on dynamic data.
- Ternary search and convex-hull optimization extend the halving idea to unimodal functions.
- Many string algorithms (suffix-array construction, FM-index) reduce to repeated binary searches on sorted suffixes.

## 11. Self-check — five questions, no answers
1. Write an iterative binary search that returns the leftmost occurrence of a duplicate element.
2. Prove that the number of comparisons is at most \(\lfloor \log_2 n \rfloor + 1\).
3. Given a rotated sorted array that may contain duplicates, describe how to decide in \(O(\log n)\) time whether a target exists.
4. Identify the single line that must change to convert the standard binary-search loop into one that finds the insertion point for a missing element.
5. In a rotated array whose pivot lies at index \(k\), derive the exact condition that tells you whether the target lies in the left or right monotonic segment without examining every element.