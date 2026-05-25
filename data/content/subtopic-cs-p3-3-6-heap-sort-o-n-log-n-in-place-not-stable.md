## What it is
Heap sort is a comparison-based sorting algorithm that treats the input array as a special binary tree called a binary heap. The algorithm has two phases: first, it arranges the array's elements to satisfy the "heap property" (building the heap). Second, it repeatedly extracts the largest element from the heap, places it at the end of the sorted portion of the array, and restores the heap property.

## Why it matters
Heap sort's underlying data structure, the heap, is fundamental to implementing priority queues. Priority queues are critical in scheduling algorithms for operating systems (e.g., in a flight computer managing tasks of varying urgency) and in graph algorithms like Dijkstra's for finding the shortest path (e.g., planning a rover's traverse on Mars). Its $O(n \log n)$ worst-case time complexity and in-place memory usage make it a reliable choice when performance guarantees are needed without requiring extra memory.

## When to study it
You must understand these prerequisites before tackling heap sort. If you are not confident with them, review them first.
*   **Arrays**: How they are stored in memory and indexed.
*   **Trees**: Specifically, the concepts of a root, parent, child, and leaf.
*   **Binary Trees**: The definition of a complete binary tree.
*   **Data Structure: Binary Heap**: The definition of a max-heap and a min-heap, and the heap property. You should be able to represent a complete binary tree using an array.

## How to study it (step by step)
1.  **Master the Array-Tree Mapping.** Write down the formulas for finding a parent and its children in a zero-indexed array representing a complete binary tree. For a node at index $i$, derive the indices for its parent, left child, and right child. Do not proceed until this is second nature.
2.  **Implement `heapify` (or `sift_down`).** Write a single function that takes an array, an index `i`, and the size of the heap `n`. This function assumes the binary trees rooted at the children of `i` are already max-heaps, and it makes the tree rooted at `i` a max-heap by letting the element at `i` "sift down" to its correct position. Test it on a small tree where only the root is out of place.
3.  **Implement `build_heap`.** Write a function that converts an arbitrary array into a max-heap. The key insight is to call `heapify` on all non-leaf nodes, starting from the last non-leaf node and moving up to the root. Trace why this works.
4.  **Implement the Main Sort Loop.** Once `build_heap` is complete, the largest element is at the root (index 0). The main loop consists of:
    a. Swap the root element with the last element of the current heap.
    b. Reduce the considered size of the heap by one.
    c. Call `heapify` on the new root (index 0) to restore the max-heap property.
    d. Repeat until the heap size is 1.
5.  **Analyze Complexity.** Derive the time complexity for `heapify` ($O(\log n)$), `build_heap` ($O(n)$), and the main sort loop ($O(n \log n)$). Derive the space complexity ($O(1)$). Explain why heap sort is not a stable sort using a counterexample.

## Key ideas, with intuition
1.  **The Array as a Complete Binary Tree:** We can represent a complete binary tree in an array without pointers. We lay out the nodes level by level, from left to right. This gives us a powerful mapping: for a node at index $i$, its children and parent are at predictable locations.
    *   Parent of $i$: $\lfloor(i-1)/2\rfloor$
    *   Left child of $i$: $2i + 1$
    *   Right child of $i$: $2i + 2$
    This is the foundation. Without this, heap sort is just abstract symbol manipulation.

2.  **The Max-Heap Property:** For any node $i$ in the tree, the value at $i$ is greater than or equal to the values of its children: $A[i] \ge A[2i+1]$ and $A[i] \ge A[2i+2]$. This simple, local rule has a powerful global consequence: the largest element in the entire heap must be at the root. This is the core invariant that the algorithm maintains.

3.  **Build Then Systematically Destroy:** Heap sort is a two-act play.
    *   **Act I: `build_heap`**. We take a chaotic array and impose order, forcing the max-heap property everywhere. We do this efficiently from the bottom up. We start with the lowest, rightmost parent and `heapify` its small subtree. By the time we `heapify` the root, its children are already roots of valid max-heaps, making the process work.
    *   **Act II: Sortdown.** We have the largest element at the root. We "harvest" it by swapping it with the last element in the array. This places the largest element in its final sorted position. Now the root is wrong, and the heap is one element smaller. We call `heapify` on the new root to fix the property, which brings the next-largest element to the top, ready for the next harvest. We repeat this until the heap is empty and the array is sorted.

## Worked example
Let's sort the array $A = [4, 1, 3, 9, 7]$.

**Phase 1: `build_heap`**
We build a max-heap from $A$. We only need to `heapify` non-leaf nodes. The last non-leaf node is at index $\lfloor(n/2) - 1\rfloor = \lfloor(5/2) - 1\rfloor = \lfloor 2.5 - 1 \rfloor = 1$. So we start at index 1.

1.  **`heapify(A, n=5, i=1)`:**
    *   Node at $i=1$ is `1`. Children are at $2(1)+1=3$ (`9`) and $2(1)+2=4$ (`7`).
    *   Largest among `A[1]`, `A[3]`, `A[4]` is `9` at index `3`.
    *   Swap `A[1]` and `A[3]`. Array becomes: $[4, 9, 3, 1, 7]$.
    *   The element `1` is now at index 3, which is a leaf, so the recursive `heapify` stops.

2.  **`heapify(A, n=5, i=0)`:**
    *   Node at $i=0$ is `4`. Children are at $2(0)+1=1$ (`9`) and $2(0)+2=2$ (`3`).
    *   Largest among `A[0]`, `A[1]`, `A[2]` is `9` at index `1`.
    *   Swap `A[0]` and `A[1]`. Array becomes: $[9, 4, 3, 1, 7]$.
    *   The element `4` is now at index 1. We must recursively `heapify` from its new position. Its children are `1` and `7`. Largest is `7`.
    *   Swap `A[1]` and `A[4]`. Array becomes: $[9, 7, 3, 1, 4]$.
    *   `build_heap` is complete. The array is now a max-heap.

**Phase 2: Extraction (Sortdown)**
The heap size `n` starts at 5.

1.  **Iteration 1 (n=5):**
    *   Largest element is `A[0] = 9`. Swap with last element `A[4] = 4`.
    *   $A$ is now $[4, 7, 3, 1, 9]$. The `9` is now sorted and locked in place.
    *   Consider heap of size 4: $[4, 7, 3, 1]$. Call `heapify(A, n=4, i=0)`.
    *   `4` sifts down, swapping with `7`. $A$ becomes $[7, 4, 3, 1, 9]$. The heap part is now $[7, 4, 3, 1]$.

2.  **Iteration 2 (n=4):**
    *   Largest element is `A[0] = 7`. Swap with last element `A[3] = 1`.
    *   $A$ is now $[1, 4, 3, 7, 9]$. The `7` is sorted.
    *   Consider heap of size 3: $[1, 4, 3]$. Call `heapify(A, n=3, i=0)`.
    *   `1` sifts down, swapping with `4`. $A$ becomes $[4, 1, 3, 7, 9]$. The heap part is now $[4, 1, 3]$.

3.  **Iteration 3 (n=3):**
    *   Largest element is `A[0] = 4`. Swap with `A[2] = 3`.
    *   $A$ is now $[3, 1, 4, 7, 9]$. The `4` is sorted.
    *   Consider heap of size 2: $[3, 1]$. Call `heapify(A, n=2, i=0)`.
    *   `3` is already larger than its child `1`. No swap.

4.  **Iteration 4 (n=2):**
    *   Largest element is `A[0] = 3`. Swap with `A[1] = 1`.
    *   $A$ is now $[1, 3, 4, 7, 9]$. The `3` is sorted.
    *   Heap size is now 1. The loop terminates.

**Final Result:** The array is sorted: $[1, 3, 4, 7, 9]$. Each step worked by first establishing the max-heap property globally, then leveraging it to find the max element, placing that element correctly, and then efficiently restoring the property on a slightly smaller array.

## Diagrams
Here is the state of the array $A = [4, 1, 3, 9, 7]$ and its tree representation during the `build_heap` phase.

**Initial Array and Tree:**
```text
Array: [4, 1, 3, 9, 7]
Indices: 0  1  2  3  4

      4 (i=0)
     / \
    /   \
  1(i=1) 3(i=2)
 / \
/   \
9(i=3) 7(i=4)
```

**After `build_heap` is complete:**
```text
Array: [9, 7, 3, 1, 4]
Indices: 0  1  2  3  4

      9 (i=0)
     / \
    /   \
  7(i=1) 3(i=2)
 / \
/   \
1(i=3) 4(i=4)
```

## Memory technique — remember this forever
1.  **Mnemonic Story: "King of the Hill"**
    Imagine a chaotic pile of rocks (the unsorted array).
    *   **`build_heap`:** You organize the pile into a "king of the hill" game. You go through the mid-level managers (non-leaf nodes) from the bottom up and tell them: "Make sure you're stronger than your direct reports." By the time you get to the CEO (the root), they are guaranteed to be the strongest in the whole company. This is the max-heap.
    *   **Sortdown:** The game begins. The King (root) is declared the winner of the round. You take them off the hill and put them in the "Hall of Fame" (the end of the array). To fill the empty spot at the top, you teleport the last person in the line onto the top of the hill. This new contender is weak and immediately starts falling down (`heapify`), challenging others until they find their place. The strongest remaining person emerges at the top. Repeat until only one person is left on the hill. The Hall of Fame is now perfectly sorted from weakest to strongest.

2.  **Must-Know Formulas (for 0-indexed arrays):**
    *   Parent of $i$: `floor((i-1)/2)`
    *   Left child of $i$: `2*i + 1`
    *   Right child of $i$: `2*i + 2`

3.  **Spaced Repetition Schedule:**
    Review these concepts and re-implement heap sort from scratch at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:**
    If you forget everything, rebuild from the array-tree mapping.
    *   Draw a complete binary tree with nodes labeled 0, 1, 2, 3...
    *   Write down the array: `[0, 1, 2, 3, ...]`.
    *   For any node `i`, find its children's indices in the array. You will re-derive the `2i+1`, `2i+2` formulas.
    *   From the definition of a max-heap ("parent is always largest"), the root must be the max element. This gives you the core idea for the sort: find max, move to end, repeat. The whole algorithm follows from this.

## Common mistakes
1.  **Off-by-One Errors with Heap Size:** During the sortdown phase, you swap `A[0]` with `A[n-1]`, then call `heapify` on a heap of size `n-1`. A common error is to pass the wrong size to `heapify` or to swap with the wrong element.
2.  **Confusing `build_heap` and `heapify`:** `heapify` assumes the subtrees are already heaps. `build_heap` makes no such assumption and works by calling `heapify` from the bottom up to establish the property. You cannot build a heap by just calling `heapify` on the root.
3.  **Incorrect `build_heap` Loop:** The loop for `build_heap` must start from the last non-leaf node ($\lfloor n/2 \rfloor - 1$) and go *up* to index 0. Starting from 0 and going down will not work.
4.  **Stability Misconception:** Believing heap sort is stable. It is not. The swaps during `heapify` can move equal elements past each other. For example, sorting `[3a, 2, 3b]` (where `3a` and `3b` are equal in value but distinct) can result in `[2, 3b, 3a]`.

## Self-check
1.  Take the array $A = [1, 2, 3, 4, 5]$. Trace the full heap sort algorithm. What does the array look like after the `build_heap` phase?
2.  The `build_heap` operation has a time complexity of $O(n)$, even though it calls `heapify` (an $O(\log n)$ operation) about $n/2$ times. Explain, without a full formal proof, the intuition for why it is linear time and not $O(n \log n)$. (Hint: How much work does `heapify` do for nodes near the bottom of the tree?)
3.  How would you modify the heap sort algorithm to find the $k$-th largest element in an array in $O(n + k \log n)$ time? Explain your modified algorithm.