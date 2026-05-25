## What it is
Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure to build a sorted array. It operates in two phases: first, it transforms the input array into a max-heap, ensuring the largest element is at the root. Then, it repeatedly swaps the root element with the last element of the heap, reduces the heap's size by one, and restores the heap property, effectively building the sorted array from back to front.

## Why it matters
Heap sort's primary value is its guaranteed $O(n \log n)$ worst-case time complexity with $O(1)$ space complexity, making it reliable for mission-critical systems where performance predictability is paramount. In aerospace, it's relevant for priority queue implementations used in real-time operating systems for tasks like sensor data processing or command scheduling on a spacecraft. In physics simulations, priority queues (often built on heaps) are used to manage event queues, processing the next most imminent event in complex systems.

## When to study it
Before tackling heap sort, you must have a solid grasp of these prerequisites. If you are not confident with them, pause and review.
1.  **Arrays:** Specifically, how to access and manipulate elements by index.
2.  **Binary Trees:** The concepts of root, parent, child, and leaf nodes. Understand what a *complete* binary tree is.
3.  **Heap Data Structure:** You must understand the heap property (max-heap or min-heap) and the core operations: `insert`, `extract-max`, and especially `heapify` (also called `sift-down` or `percolate-down`).
4.  **Big O Notation:** Be comfortable with the meanings of $O(1)$, $O(\log n)$, $O(n)$, and $O(n \log n)$.

## How to study it (step by step)
1.  **Master the Array-as-Tree mapping.** Take an array like `[10, 5, 8, 2, 3]` and draw it as a complete binary tree. Write down the formulas for finding a parent and children from any index `i` in a zero-indexed array. Do this until it is second nature.
2.  **Implement `heapify` from scratch.** Write a function `heapify(array, n, i)` that takes an array, the size of the heap `n`, and an index `i`. This function assumes the subtrees rooted at the children of `i` are already heaps, and it makes the subtree rooted at `i` a heap. This is the workhorse of the algorithm.
3.  **Implement `buildMaxHeap`.** Write a function that takes an array and builds a max-heap from it. The key insight is to call `heapify` on all *non-leaf* nodes, starting from the last non-leaf node and working backwards to the root. Prove to yourself why you don't need to run it on leaf nodes.
4.  **Implement the main `heapSort` loop.** This is the second phase. Loop from the last element to the second element. In each iteration: swap the root (`array[0]`) with the current element (`array[i]`), then call `heapify` on the reduced heap (of size `i`) at the root (index `0`).
5.  **Analyze the complexity.** Derive the time complexity. The `buildMaxHeap` step is surprisingly $O(n)$, not $O(n \log n)$. The sorting loop involves $n-1$ calls to `heapify`, each costing $O(\log k)$ where $k$ is the heap size, leading to the overall $O(n \log n)$ complexity.

## Key ideas, with intuition
1.  **The Array is the Heap.** The most crucial concept is that we don't need a separate tree data structure. A simple array can represent a complete binary tree, which is what a heap is. This is why heap sort is an "in-place" algorithm. For a zero-indexed array `A`:
    $$
    \text{parent}(i) = \lfloor (i - 1) / 2 \rfloor \\
    \text{left\_child}(i) = 2i + 1 \\
    \text{right\_child}(i) = 2i + 2
    $$
    This mapping eliminates the need for pointers and extra memory.

2.  **The Max-Heap Property: The Biggest is Always on Top.** A max-heap is a binary tree where every parent node is greater than or equal to its children. This property recursively ensures that the single largest element in the entire structure is always at the root (index 0). This gives us a constant-time way to find the maximum element.

3.  **Sort by Deconstruction.** Heap sort cleverly uses the array space for both the heap and the final sorted output. It partitions the array into two conceptual parts: a shrinking max-heap on the left and a growing sorted array on the right. In each step, it takes the maximum element from the heap (the root), swaps it into its correct final position at the end of the unsorted section, and then "forgets" about that position, shrinking the heap by one. The `heapify` operation then efficiently restores the max-heap property for the next iteration.

## Worked example
Let's sort the array `A = [4, 10, 3, 5, 1]`.

**Phase 1: `buildMaxHeap`**
The array has 5 elements. The last non-leaf node is at index $\lfloor (5/2) - 1 \rfloor = 1$. We call `heapify` from index 1 down to 0.

1.  **`heapify(A, 5, 1)`:** Index 1 is node `10`. Its children are `5` (index 3) and `1` (index 4). `10` is greater than both, so the heap property holds. No change. `A = [4, 10, 3, 5, 1]`.
2.  **`heapify(A, 5, 0)`:** Index 0 is node `4`. Its children are `10` (index 1) and `3` (index 2). `10` is the largest. Swap `4` and `10`.
    - `A` becomes `[10, 4, 3, 5, 1]`.
    - Now we must recursively `heapify` on the swapped position (index 1). Node `4`'s children are `5` and `1`. `5` is larger. Swap `4` and `5`.
    - `A` becomes `[10, 5, 3, 4, 1]`. The subtree is now a heap.

**End of Phase 1:** The max-heap is `A = [10, 5, 3, 4, 1]`.

**Phase 2: Sorting Loop**
The heap size `n` starts at 5.

1.  **`i = 4` (last index):**
    - Swap `A[0]` (10) with `A[4]` (1). `A = [1, 5, 3, 4, 10]`.
    - The `10` is now in its final sorted position. Consider the heap to be of size 4.
    - `heapify(A, 4, 0)`: Root `1` is smaller than child `5`. Swap them. `A = [5, 1, 3, 4, 10]`. Node `1` (now at index 1) is smaller than child `4`. Swap them. `A = [5, 4, 3, 1, 10]`. Heap is restored.

2.  **`i = 3`:**
    - Swap `A[0]` (5) with `A[3]` (1). `A = [1, 4, 3, 5, 10]`.
    - The `5` is now sorted. Heap size is 3.
    - `heapify(A, 3, 0)`: Root `1` is smaller than child `4`. Swap them. `A = [4, 1, 3, 5, 10]`. Heap is restored.

3.  **`i = 2`:**
    - Swap `A[0]` (4) with `A[2]` (3). `A = [3, 1, 4, 5, 10]`.
    - The `4` is now sorted. Heap size is 2.
    - `heapify(A, 2, 0)`: Root `3` is larger than child `1`. No change.

4.  **`i = 1`:**
    - Swap `A[0]` (3) with `A[1]` (1). `A = [1, 3, 4, 5, 10]`.
    - The `3` is now sorted. Heap size is 1.
    - `heapify(A, 1, 0)`: A heap of size 1 is trivially a heap.

The loop finishes. The final sorted array is `A = [1, 3, 4, 5, 10]`.

**Reflection:** Each step in Phase 2 correctly placed the largest *remaining* element at the end of the unsorted section. The `heapify` call efficiently fixed the heap after this disruptive swap, ensuring the next largest element was ready at the root for the subsequent step.

## Diagrams
Here is the array `A = [4, 10, 3, 5, 1]` represented as a complete binary tree. Note the indices.

```text
      4 (i=0)
     /   \
   10(i=1) 3(i=2)
   /   \
 5(i=3) 1(i=4)
```

During the sorting phase, the array is partitioned. After placing `10` and `5` in their final positions, the array `[4, 1, 3, 5, 10]` looks like this conceptually:

```text
Heap Partition         | Sorted Partition
[4, 1, 3]              | [5, 10]
-----------------------------------------
A[0] A[1] A[2]         | A[3] A[4]

Corresponding Heap Tree (size=3):
      4 (i=0)
     /   \
   1(i=1) 3(i=2)
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** "The King of the Hill Tournament."
    - **Build Phase (`buildMaxHeap`):** Imagine every number in the array is a competitor. You organize a "king of the hill" tournament. Starting from the bottom-most matches (the last non-leaf nodes), you ensure every parent `P` is stronger than its children `C`. This promotion process continues up to the top, until the ultimate champion (the max element) is at the root. This is `buildMaxHeap`.
    - **Sort Phase (Loop):** The tournament is over. The champion (`A[0]`) gets their prize and retires to the "Hall of Fame" (the end of the array). A new competitor from the bottom (`A[last]`) is put at the top, and you must re-run the final stage of the tournament (`heapify(0)`) to find the new champion among the remaining competitors. Repeat until everyone is in the Hall of Fame.

2.  **Overlearn these facts:**
    - **The Two Phases:** 1. `buildMaxHeap` (from `n/2 - 1` down to `0`). 2. Loop from `n-1` down to `1`: `swap(0, i)`, then `heapify(0)` on heap of size `i`.
    - **0-indexed child/parent formulas:** `left=2i+1`, `right=2i+2`, `parent=floor((i-1)/2)`.

3.  **Spaced Repetition Schedule:**
    - Review and re-implement from scratch in: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read; code it.

4.  **First Principles Pathway:** If you forget the exact loops, rebuild from the core idea. You need to sort in-place. A max-heap gives you the biggest element at `A[0]`. Where does the biggest element go in a sorted array? The end. So, swap `A[0]` with `A[n-1]`. Now `A[n-1]` is correct. What's left? An array of size `n-1` that is *almost* a heap, but the root is wrong. How do you fix a heap with a bad root? `heapify(0)`. Repeat this process.

## Common mistakes
1.  **`buildMaxHeap` from the wrong starting point.** Students often loop from `n-1` down to `0`. This is incorrect and inefficient. You only need to `heapify` the non-leaf nodes, which start at index `floor(n/2) - 1`.
2.  **Forgetting to shrink the heap.** In the main sorting loop, the call to `heapify` must be on a progressively smaller heap. `heapify(array, i, 0)`, not `heapify(array, n, 0)`. If you pass the original size `n` each time, you will mix the already-sorted elements back into the heap.
3.  **Off-by-one errors in loops.** The sorting loop should run from `i = n-1` down to `1`, not `0`. When `i` is `0`, the heap has one element and is already sorted, so no swap or heapify is needed.

## Self-check
1.  Trace heap sort on the array `A = [3, 2, 1, 5, 4]`. Write down the state of the array after `buildMaxHeap` and after each swap in the sorting phase.
2.  The `buildMaxHeap` phase runs in $O(n)$ time, not $O(n \log n)$. Explain precisely why this is the case, considering the work done by `heapify` at different levels of the tree.
3.  Heap sort is not a stable sort. Provide a small example array that demonstrates this instability, and explain which swap causes the relative order of equal elements to change.