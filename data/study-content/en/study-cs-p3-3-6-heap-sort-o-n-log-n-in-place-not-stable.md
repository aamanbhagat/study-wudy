## 1. The one-sentence answer
**Heap sort is an in-place comparison sort that organises an array into a binary max-heap and repeatedly extracts the maximum element to produce a sorted suffix.**

A binary heap is a complete tree stored inside the array; the parent of index \(i\) lives at \(\lfloor(i-1)/2\rfloor\). Building this structure costs linear time because most nodes already satisfy the heap property. Once the heap exists, the algorithm swaps the root (largest value) with the last unsorted position, shrinks the heap by one, and restores the property in logarithmic time. Repeating this \(n\) times yields an \(O(n\log n)\) sort that never allocates extra arrays.

The procedure is deliberately unstable: when two equal keys are compared during a sift-down, their relative order can flip because the algorithm only cares about the numeric relation, not original positions.

> [!NOTE]
> The linear-time build-heap step is the single fact that separates heap sort from the naïve “insert one-by-one” approach that would cost \(O(n\log n)\) just to construct the heap.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover flight software uses a heap-based priority queue to schedule telemetry packets under strict memory limits; the in-place property avoids dynamic allocation on the radiation-hardened processor.  
Google’s LevelDB and RocksDB employ heap sort variants inside their merge iterators when flushing sorted string tables to disk, guaranteeing \(O(1)\) extra RAM on embedded flash devices.  
The Linux kernel’s Completely Fair Scheduler maintains per-CPU run queues as heaps; the \(O(n\log n)\) worst-case bound ensures that a sudden influx of tasks cannot produce unbounded latency spikes.  
Semiconductor place-and-route tools from Synopsys and Cadence repeatedly sort millions of timing arcs during static timing analysis; the cache-friendly array representation of the heap improves wall-clock performance on multi-million-gate designs.  
High-energy physics experiments at CERN’s LHC sort hit coordinates inside the trigger farm; the algorithm’s deterministic \(O(n\log n)\) time lets firmware engineers prove that the 40 MHz event filter meets its hard real-time deadline.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Binary heap array layout | All heap operations are performed by index arithmetic on the input array itself. |
| Sift-down (heapify)      | The only primitive needed after the initial build and after each extraction. |
| Big-O arithmetic         | Required to add the \(O(n)\) build cost to the \(n\) extractions each costing \(O(\log n)\). |
| Stability definition     | Needed to recognise why equal-key swaps destroy original order. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Store a complete binary tree inside an array
Any complete binary tree of \(n\) nodes fits in indices \(0\dots n-1\). The children of \(i\) are \(2i+1\) and \(2i+2\); the parent of \(i\) is \(\lfloor(i-1)/2\rfloor\).

Example: the array \([4,1,3,2,9]\) represents a tree whose root is 4, left child 1, right child 3.

The layout satisfies the shape property by construction; only the heap-order property remains to be enforced.

> [!WARNING]
> Using 1-based indexing off-by-one errors instantly produce out-of-bounds accesses.

### Step 2 — Heap-order property
A max-heap obeys \(A[\text{parent}(i)] \ge A[i]\) for every \(i\).

Formally, \(\forall i\in[1,n-1], A[\lfloor(i-1)/2\rfloor] \ge A[i]\).

### Step 3 — Linear-time build-heap
Call sift-down on every non-leaf node from the bottom up. The total cost is bounded by \(\sum_{h=0}^{\log n} O(2^h\cdot h)=O(n)\).

### Step 4 — Extract-max
Swap root with last element, shrink heap size by one, then sift-down the new root.

### Step 5 — Full algorithm
Build-heap once, then perform \(n\) extract-max operations. The resulting sorted suffix occupies the original array from the end.

The textbook statement follows in Section 7.

## 5. Worked examples — every step shown

**Example 1 — Single sift-down**
- *Given:* heap \([9,5,6,1,3]\), size 5; sift-down at index 1 (value 5).
- *Find:* restored heap.
- Swap 5 with larger child 6: \([9,6,5,1,3]\).
- *Why:* parent must exceed both children.
- No further violation.
- **Final array:** \([9,6,5,1,3]\)

*Reflection:* The only movement was one level; most sift-downs terminate quickly.

**Example 2 — Build-heap on five elements**
- *Given:* \([4,1,3,2,9]\).
- *Find:* max-heap.
- Start at last non-leaf (index 1, value 1): swap with 9 → \([4,9,3,2,1]\).
- Sift-down index 0 (value 4): swap with 9 → \([9,4,3,2,1]\).
- **Final heap:** \([9,4,3,2,1]\)

*Reflection:* Only two swaps were required; linear build cost is visible.

**Example 3 — Full sort of six elements**
- *Given:* \([12,11,13,5,6,7]\).
- *Find:* sorted order via heap sort.
- Build-heap yields \([13,11,12,5,6,7]\).
- Extract 13: swap with 7, size 5, sift-down → \([12,11,7,5,6,13]\).
- Extract 12: swap with 6, size 4, sift-down → \([11,6,7,5,12,13]\).
- Continue until size 1.
- **Final array:** \([5,6,7,11,12,13]\)

*Reflection:* The sorted suffix grows from the right; the active heap shrinks from the left.

**Example 4 — Duplicate keys demonstrating instability**
- *Given:* \([2a,1,2b]\) (letters mark original order).
- *Find:* result after heap sort.
- Build-heap may place 2b at root.
- Final extraction order can produce \([1,2b,2a]\).
- **Final array:** \([1,2b,2a]\)

*Reflection:* Original relative order of the two 2’s is reversed; stability is lost.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Off-by-one in child indices       | 0-based versus 1-based confusion            | Always write \(2i+1,2i+2\) and test on size 3 |
| Forgetting to shrink heap size    | Logical size kept at \(n\) after swap       | Decrement a separate `heapSize` variable     |
| Calling build-heap from leaves    | Wasted \(O(n\log n)\) work                  | Start at \(\lfloor n/2\rfloor-1\)            |
| Assuming stability                | Sift-down compares values only              | Document “not stable” in every interface     |
| Integer overflow on large \(n\)   | Index \(2i+1\) exceeds INT_MAX              | Use 64-bit indices or guard \(i < n/2\)      |
| Sift-down on a leaf               | Unnecessary recursive call                  | Add explicit `if (child < heapSize)` guard   |
| Using floating-point keys without epsilon | Equality test fails on round-off         | Provide a strict weak ordering comparator    |

## 7. The textbook-precise statement
Heap sort receives an array \(A[1..n]\) of totally ordered keys. It first transforms \(A\) into a max-heap in \(O(n)\) time, then repeatedly extracts the maximum element by swapping it into position \(n, n-1, \dots, 2\) while restoring the heap property on the shrinking prefix. The algorithm runs in \(\Theta(n\log n)\) time in all cases and uses \(O(1)\) auxiliary storage. It is not stable. (Cormen et al., *Introduction to Algorithms*, 4e, §6.4–6.5.)

## 8. Visual — diagram or schematic
```text
Array indices:  0   1   2   3   4   5
Values:        [9,  4,  7,  1,  3,  2]
Tree view:
               9
            /     \
           4       7
          / \     /
         1   3   2
Parent(i) = floor((i-1)/2), left=2i+1, right=2i+2
```

## 9. The memory technique
**The hook** — picture a pyramid of stones; each extraction removes the capstone and lets the pile settle (sift-down) until the next capstone is exposed.

**What to overlearn** — build-heap costs \(O(n)\), each of the \(n\) extractions costs \(O(\log n)\), total \(O(n\log n)\); the algorithm is in-place and unstable.

**Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — re-derive the child-index formulas from the complete-tree layout, recompute the build-heap summation \(\sum h\cdot2^h = O(n)\), then add the extraction costs.

## 10. What this unlocks
Heap sort demonstrates how an implicit tree structure inside an array yields both optimal asymptotic time and constant extra space. It directly precedes the study of priority queues, Dijkstra’s algorithm, and the analysis of selection algorithms.

- Priority-queue abstract data type
- Dijkstra / Prim with binary heaps
- \(k\)-way merging and external sort
- Lower-bound proofs for comparison sorts

## 11. Self-check — five questions, no answers
1. What is the exact number of comparisons performed by build-heap on an array of size 7 in the worst case?
2. Demonstrate with a four-element array containing two equal keys that heap sort can reverse their order.
3. Write the loop invariant that holds between successive extract-max operations.
4. Compute the exact height of the heap after \(n-3\) extractions and give the resulting sift-down cost.
5. Explain why replacing the final sift-down calls with a linear-time selection algorithm would not improve the overall asymptotic bound.