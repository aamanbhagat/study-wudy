## 1. The one-sentence answer
**Quicksort is an in-place divide-and-conquer sorting algorithm that selects a pivot, partitions the array so that elements less than the pivot lie to its left and greater elements lie to its right, then recurses on the subarrays.**

Partitioning is the sole source of work; the recursion merely applies the same rule to smaller intervals. The algorithm therefore terminates when every subarray contains at most one element. Because the partition step can be performed with a constant number of passes, the total cost is governed by how evenly the chosen pivots divide the array at each level.

Two classic partition schemes exist. Lomuto’s scheme scans once with a single index and places the pivot at the end of the left subarray. Hoare’s scheme uses two indices moving toward each other and stops when they cross, typically producing fewer swaps. Both are correct; they differ only in constant factors and in the exact placement of equal elements.

> [!NOTE]
> The expected running time is \(\Theta(n\log n)\) precisely because a uniformly random pivot balances the subproblems with high probability; any fixed pivot rule admits an adversarial input that forces quadratic time.

## 2. Why this matters — concrete and current
In database engines such as PostgreSQL and MySQL, quicksort (or its introsort variant) is the default for in-memory ORDER BY clauses on moderate-sized result sets because its cache-friendly access pattern outperforms mergesort on modern CPUs.  
NASA’s flight-software verification pipeline sorts telemetry packets by timestamp using a hardened quicksort; the algorithm’s small memory footprint is mandatory inside radiation-hardened processors that lack space for an auxiliary array.  
LLVM’s libc++ and the GNU C++ library both employ introsort—an adaptive quicksort that switches to heapsort after a logarithmic number of bad partitions—thereby guaranteeing \(O(n\log n)\) worst-case time for `std::sort`.  
High-frequency trading platforms at Jane Street and Citadel sort order-book updates with quicksort variants whose expected linearithmic cost keeps end-to-end latency below one microsecond for tens of thousands of symbols.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Loop invariant           | Proves that after each partition step the pivot is in its final sorted position |
| Recurrence relations     | Expresses the cost \(T(n)\) in terms of the sizes of the two subproblems |
| Indicator random variables | Used to compute the expected number of comparisons under random pivots |
| Big-O and \(\Theta\) notation | States both the expected \(\Theta(n\log n)\) and worst-case \(O(n^2)\) bounds cleanly |

## 4. Building the idea — from intuition to formalism

### Step 1 — Choose a pivot
Any element may serve as pivot. The simplest deterministic choice is the last element; a stronger practical choice is a random index or the median of the first, middle, and last elements.

**Example.** Array `[3,1,4,1,5]`, last element `5` chosen as pivot.  
Formal statement: after partition the array satisfies \(A[p..q-1]\le A[q]\le A[q+1..r]\).  
> [!WARNING]
> Selecting the first element on an already-sorted array forces every partition to be empty on one side, producing the quadratic recurrence.

### Step 2 — Lomuto partition
Scan from left to right, maintaining an index `i` that marks the rightmost known element smaller than the pivot. Swap the current element with `A[i+1]` whenever it is smaller.

**Example.** `[3,1,4,1,5]` yields final pivot index 4.  
The loop invariant guarantees that after the scan exactly the elements \(\le\) pivot occupy positions `p` through `q`.  
> [!WARNING]
> Forgetting to place the pivot at `A[r]` before the loop begins produces an off-by-one error that leaves the pivot in the wrong half.

### Step 3 — Hoare partition
Two indices move toward each other; the left index stops at an element \(\ge\) pivot and the right index stops at an element \(\le\) pivot; the pair is swapped and scanning resumes.

**Example.** Same array yields pivot index 3 after crossing.  
Hoare’s scheme returns an index `q` such that \(A[p..q]\le\) pivot and \(A[q+1..r]\ge\) pivot, yet the pivot itself may still move.  
> [!WARNING]
> Using the returned index as an exclusive bound in recursion can cause infinite recursion if equal elements are mishandled.

### Step 4 — Recurse
Invoke the algorithm on `[p..q-1]` and `[q+1..r]`. The base case is any interval of length at most 1.

### Step 5 — Expected-cost recurrence
Let \(X_{ij}\) be the indicator that elements \(i\) and \(j\) are compared. The total expected comparisons equal \(\sum_{i<j}2/(j-i+1)\), which solves to \(\sim 2n\ln n\).

### Step 6 — Worst-case recurrence
When every pivot produces subproblems of size 0 and \(n-1\), the recurrence becomes \(T(n)=T(n-1)+\Theta(n)\), whose solution is \(\Theta(n^2)\).

### Step 7 — Textbook statement
Quicksort with random pivot selection runs in expected \(\Theta(n\log n)\) time and \(O(n^2)\) worst-case time (Cormen et al., *Introduction to Algorithms*, 4e, §7.4).

## 5. Worked examples — every step shown

**Example 1 — Single Lomuto partition**  
*Given:* `[6,10,4,9,3]`, pivot = last element 3.  
*Find:* final array after one partition.  
Scan: 6>3, 10>3, 4>3, 9>3; no swaps occur.  
Swap pivot into position 0.  
*Why* the pivot ends at index 0: every preceding element is greater.  
**Final array: [3,10,4,9,6]**  

*Reflection.* The example shows an extreme imbalance; the same pattern on larger data produces the quadratic case.

**Example 2 — Hoare partition on duplicates**  
*Given:* `[2,2,2,2]`, pivot = first 2.  
*Find:* index returned by Hoare.  
Left pointer stops at first 2, right pointer stops at last 2; they cross immediately.  
*Why* the returned index may lie anywhere among equals: Hoare does not guarantee strict ordering of equal keys.  
**Returned index: 1**  

*Reflection.* Equal-element handling explains why some library sorts add a three-way partition.

**Example 3 — Full sort of five elements**  
*Given:* `[3,7,8,5,2]`.  
*Find:* sorted order after complete quicksort (random pivot each time).  
First pivot 2 yields partitions `[ ]` and `[3,7,8,5]`.  
Next pivot 5 yields `[3]` and `[7,8]`.  
Subsequent pivots finish the right half.  
**Final sorted array: [2,3,5,7,8]**  

*Reflection.* Even a balanced pivot tree still performs \(\Theta(n\log n)\) comparisons; the constant hidden by \(\Theta\) is visible in the partition work.

**Example 4 — Expected comparisons on n=4**  
*Given:* distinct keys 1..4, uniform random pivot.  
*Find:* expected number of comparisons.  
There are \(\binom{4}{2}=6\) pairs; each pair \(i<j\) is compared with probability \(2/(j-i+1)\). Summing yields \(2(1 + 1/2 + 1/2 + 1/3 + 1/3 + 1/2)= 25/3\).  
**Expected comparisons: 25/3**  

*Reflection.* The calculation generalises directly to the integral approximation \(2n\ln n\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using first element as pivot      | Already-sorted data produces worst case     | Choose random index or median-of-three               |
| Forgetting to swap pivot to end before Lomuto | Off-by-one places pivot in wrong subarray | Always place chosen pivot at `A[r]` first            |
| Recursing on `[p..q]` and `[q..r]` with Hoare | Infinite recursion on equal elements        | Recurse on `[p..q-1]` and `[q+1..r]`                 |
| Storing partition index in a 32-bit int for huge arrays | Overflow on n>2^31                          | Use 64-bit indices or size_t                         |
| Assuming stable sort              | Partition swaps destroy original order of equals | Use mergesort when stability required                |
| Ignoring cache effects            | Large arrays suffer from random memory access | Use block-quicksort or library introsort             |
| Not handling n=0 or n=1           | Base-case omission crashes on empty subarray | Explicit length check before recursion               |

## 7. The textbook-precise statement
Let \(A[1..n]\) be an array of \(n\) distinct elements. Quicksort selects a pivot uniformly at random, partitions the array, and recurses. The expected number of comparisons satisfies the recurrence \(T(n)= \frac{2}{n}\sum_{q=1}^n(T(q-1)+T(n-q))+\Theta(n)\) whose solution is \(T(n)=\Theta(n\log n)\). The worst-case cost is \(\Theta(n^2)\) when every pivot is the smallest or largest remaining element. (Cormen et al., *Introduction to Algorithms*, 4e, Theorem 7.4.)

## 8. Visual — diagram or schematic
```text
Initial:  [ 3  1  4  1  5 ]   pivot=5 (last)
          p                 r

Lomuto scan:
i points to last element <5; only swaps occur when smaller value found.
After partition:
[ 3  1  4  1 | 5 ]   q=4
Left subarray [3,1,4,1] recurses; right is empty.
```

## 9. The memory technique
1. **The hook** — picture a librarian repeatedly pulling a random book from a shelf and sliding every thinner book left and every thicker book right; the shelf splits cleanly at that book each time.
2. **What to overlearn** — expected comparisons \(\approx 2n\ln n\); worst-case recurrence \(T(n)=T(n-1)+O(n)\); random pivot guarantees expectation.
3. **Spaced-repetition schedule** — review the indicator-variable derivation after 1 day, the worst-case recurrence after 3 days, both partition schemes after 7 days, full analysis after 16 days, and a fresh implementation after 35 days.
4. **First-principles fallback** — rebuild the expectation by summing \(\Pr[\text{pair compared}]=2/(j-i+1)\) over all pairs, then solve the resulting harmonic sum.

## 10. What this unlocks
Mastery of quicksort’s partition analysis supplies the template for analysing any divide-and-conquer recurrence whose split sizes are random. The same indicator-variable technique appears in the analysis of skip lists, treaps, and the height of random binary search trees.

- Randomised incremental construction (Clarkson–Shor)
- Treap and Cartesian-tree expected height
- Introsort and pattern-defeating quicksort hybrids
- Analysis of quickselect / quickhull

## 11. Self-check — five questions, no answers
1. Execute one Lomuto partition on `[9,7,5,11,12]` with pivot 12 and state the final index of the pivot.  
2. Show that Hoare’s partition on an array of identical keys may return any index inside the array.  
3. Compute the exact expected number of comparisons performed by randomised quicksort on four distinct keys.  
4. Derive the closed form of the recurrence \(T(n)=T(n-1)+\Theta(n)\) and state its asymptotic class.  
5. Identify the single line in a textbook implementation whose change from “random index” to “first index” converts expected linearithmic behaviour into quadratic worst-case behaviour on sorted input.