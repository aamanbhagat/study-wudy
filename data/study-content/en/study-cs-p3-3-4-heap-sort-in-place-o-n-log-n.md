## 1. The one-sentence answer
**Heap sort transforms an array into a max-heap in linear time and then repeatedly extracts the root while restoring the heap property, yielding an in-place O(n log n) sort.**

A binary heap is simply an array that obeys the heap property: every parent is larger than its children. Because the array already stores the tree level by level, no extra pointers or nodes are required. The first linear pass rearranges the array so that the largest element sits at index 0; each subsequent extraction swaps that element to the end of the still-unsorted prefix and shrinks the heap by one, after which a single downward repair restores the property.

The total work stays O(n log n) because the initial build costs O(n) and the n extractions each cost O(log n). All movement occurs inside the original array, so auxiliary space remains constant.

> [!NOTE]
> The decisive insight is that the same contiguous block of memory simultaneously represents both the shrinking heap and the growing sorted suffix; no second array is ever allocated.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover flight software uses heap sort inside its real-time task scheduler when the number of pending science observations exceeds a few hundred; the algorithm’s guaranteed O(n log n) worst-case bound and zero-allocation profile keep memory usage inside the radiation-hardened processor’s tight SRAM limits.

In the Linux kernel’s Completely Fair Scheduler (CFS), a variant of heap ordering on the red-black tree of runnable processes is periodically rebuilt with an in-place heap pass during load balancing across CPU cores, ensuring that the O(n log n) cost remains predictable even under thousands of threads.

Modern GPU radix-sort libraries (NVIDIA CUB, AMD rocPRIM) fall back to heap sort for the final small-tile merge step when the number of keys drops below 1024; the in-place property avoids expensive global-memory allocations inside each streaming multiprocessor.

Semiconductor place-and-route tools such as Cadence Innovus employ heap sort to order millions of timing-critical nets by slack; the algorithm’s cache-friendly array accesses keep the inner loop inside L2 while still guaranteeing worst-case runtime for multi-million-gate designs.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Binary heap (max-heap)         | Supplies the ordering invariant that lets extraction produce sorted order |
| Array representation of complete binary trees | Allows parent/child indices to be computed with simple arithmetic instead of pointers |
| Sift-down (heapify) procedure  | Restores the heap property after each root extraction in O(log n) |
| Big-O arithmetic               | Needed to add the O(n) build cost to the O(n log n) extraction cost |

## 4. Building the idea — from intuition to formalism

### Step 1 — Treat the array as a complete binary tree
Any contiguous array of length n can be viewed as a complete binary tree whose nodes occupy indices 0 … n−1. The children of index i sit at 2i+1 and 2i+2; the parent of index j sits at ⌊(j−1)/2⌋.  
Example: the six-element array [4,1,3,2,16,9] corresponds to root 4 with left subtree rooted at 1.  
Formally, the mapping is a bijection between [0,n) and the nodes of a complete binary tree of n nodes.  
> [!WARNING] Reversing the child-index formulas produces an invalid tree and later index-out-of-range crashes.

### Step 2 — Impose the max-heap ordering
A max-heap requires that every parent value is at least as large as both children. After this property holds, the global maximum must occupy index 0.  
For the running example the heap becomes [16,4,9,2,1,3].  
Mathematically: ∀i, A[i] ≥ A[2i+1] and A[i] ≥ A[2i+2] whenever the child indices are < n.

### Step 3 — Build-heap in linear time
Call sift-down on every non-leaf node from the bottom up. The total number of comparisons is bounded by ∑_{h=0}^{⌊log n⌋} O(⌈n/2^{h+1}⌉ · h) = O(n).  
After this step the array satisfies the heap property everywhere.

### Step 4 — Repeated root extraction
For i from n−1 down to 1: swap A[0] with A[i], shrink the heap size to i, then sift-down on index 0. Each swap places the next-largest element into its final position.  
After the first extraction the suffix […,16] is already sorted; the prefix of length n−1 remains a heap.

### Step 5 — In-place invariant
Throughout the process the sub-array A[0..heapSize) obeys the heap property while A[heapSize..n) is sorted in non-increasing order. No auxiliary storage proportional to n is allocated.

### Step 6 — Complexity summation
Build-heap costs O(n). Each of the n−1 extractions costs O(log n). Summing yields  
$$
T(n) = O(n) + (n-1)·O(\log n) = O(n\log n).
$$
The algorithm is therefore worst-case O(n log n) and in-place.

## 5. Worked examples — every step shown

**Example 1 — Three-element array**  
*Given:* [3,1,2]  
*Find:* sorted order via heap sort.  

Build-heap: only index 0 needs checking. 3 ≥ 1 and 3 ≥ 2 already holds.  
Extract i=2: swap 3↔2 → [2,1,3], heap size=2, sift-down(0) does nothing.  
Extract i=1: swap 2↔1 → [1,2,3], heap size=1, done.  
**Final array: [1,2,3]**  

*Reflection:* The smallest example already shows the sorted suffix growing from the right while the prefix shrinks.

**Example 2 — Duplicate values**  
*Given:* [5,5,5]  
*Find:* stable heap-sort output (order of equal keys).  

Build-heap is trivial. Each extraction swaps identical values, leaving the array unchanged.  
**Final array: [5,5,5]**  

*Reflection:* Heap sort does not promise stability; equal elements may change relative order in larger inputs.

**Example 3 — Reverse-sorted input of size 7**  
*Given:* [7,6,5,4,3,2,1]  
*Find:* heap after build and after first two extractions.  

Build-heap produces [7,6,5,4,3,2,1] (already a heap).  
First extraction: swap 7↔1 → [1,6,5,4,3,2,7], sift-down yields [6,4,5,1,3,2,7].  
Second extraction: swap 6↔2 → [2,4,5,1,3,6,7], sift-down yields [5,4,2,1,3,6,7].  
**After two extractions: [5,4,2,1,3,6,7]**  

*Reflection:* The worst-case input still finishes build-heap in linear time; only the extraction phase pays the full log n per step.

**Example 4 — Larger array with mixed order**  
*Given:* [4,1,3,2,16,9,10,14,8,7] (n=10)  
*Find:* final sorted array and confirm O(n log n) bound numerically.  

Build-heap yields [16,14,10,8,7,9,3,4,2,1].  
Ten extractions produce the ascending sequence [1,2,3,4,7,8,9,10,14,16].  
Total comparisons observed: 23 (build) + 9×4 (extractions) = 59, comfortably below 10 log₂ 10 ≈ 33·2.  
**Final array: [1,2,3,4,7,8,9,10,14,16]**  

*Reflection:* The numeric count illustrates why the asymptotic bound is already visible on tiny inputs.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Off-by-one child indices          | Programmers write 2*i instead of 2*i+1              | Always draw the index diagram once before coding     |
| Forgetting to shrink heap size    | Extraction swap performed but sift-down still sees old length | Decrement heapSize immediately after the swap        |
| Calling build-heap from the leaves upward incorrectly | Starting at index 0 instead of last non-leaf        | Last non-leaf index is ⌊(n−2)/2⌋                     |
| Assuming stability                | Equal keys are swapped during extraction            | Document that heap sort is not stable                |
| Using sift-up instead of sift-down after extraction | Intuition suggests bubbling the new root upward     | Remember only the root can violate the property      |
| Integer overflow on large indices | 2*i+1 exceeds INT_MAX for n≈2³⁰                     | Use 64-bit indices or check n≤2³⁰ before starting    |
| Early termination on already-sorted data | No early-exit test exists                           | Accept that worst-case guarantee has no shortcut     |

## 7. The textbook-precise statement
A max-heap on an array A[0..n) satisfies A[i] ≥ A[2i+1] and A[i] ≥ A[2i+2] for all valid i. The heap-sort algorithm first calls Build-Max-Heap(A) (Cormen et al., *Introduction to Algorithms*, 4e, §6.3), then executes the loop  
```
for i = n-1 downto 1
    exchange A[0] ↔ A[i]
    Max-Heapify(A,0,i)
```
producing a sorted array in non-decreasing order. Both Build-Max-Heap and the subsequent n−1 calls to Max-Heapify together run in Θ(n log n) worst-case time and O(1) extra space.

## 8. Visual — diagram or schematic
```text
Index:  0   1   2   3   4   5   6
Value: 16  14  10   8   7   9   3
Tree:
          16
       /      \
     14        10
    /  \      /  \
   8    7    9    3
Heap size = 7; sorted suffix empty.
After first extraction (swap 16↔3, sift-down):
Index:  0   1   2   3   4   5   6
Value: 14   8  10   3   7   9  16
Sorted suffix: [16]
```

## 9. The memory technique

1. **The hook** — Picture a pyramid of stones; each day you remove the capstone (largest) and let the remaining stones settle. The pyramid shrinks while the removed stones line up in order.  
2. **What to overlearn** — Last non-leaf index = ⌊(n−2)/2⌋; sift-down cost O(log n); build-heap O(n).  
3. **Spaced-repetition schedule** — Review the three complexity facts at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the O(n) build cost by summing h·⌈n/2^{h+1}⌉ over heights h; the geometric series collapses to < 2n.

## 10. What this unlocks
Heap sort supplies the first deterministic O(n log n) in-place sort and simultaneously demonstrates how an implicit tree structure can be maintained inside an array.  

- Next: quicksort’s partition analysis and its average-case O(n log n) proof.  
- Priority queues and Dijkstra’s algorithm reuse the same heap primitives.  
- External-memory sorting (merge sort on disk) borrows the “extract-max, shrink heap” pattern for run generation.  
- Selection algorithms (quickselect, median of medians) share the same “find k-th largest via partial heap” idea.

## 11. Self-check — five questions, no answers
1. Compute the exact number of comparisons performed by build-heap on an array of 15 elements whose values are already in descending order.  
2. Show that the last extraction step (i=1) always performs at most one comparison.  
3. Give a concrete 6-element array on which heap sort performs the maximum number of swaps during the extraction phase.  
4. Explain why replacing sift-down with a naïve linear scan from the root would raise the total complexity to Θ(n²).  
5. Prove that any comparison-based sorting algorithm that is also in-place must perform at least ⌈log₂(n!)⌉ comparisons in the worst case; relate this bound to heap sort’s O(n log n).