## What it is
A heap is a specialized tree-based data structure that satisfies the heap property: each parent node is either greater than or equal to (in a max-heap) or less than or equal to (in a min-heap) all of its children. The core heap operations are algorithms that efficiently add, remove, or modify elements while preserving this property, typically in logarithmic time relative to the number of elements.

## Why it matters
Heaps are the standard implementation for Priority Queues, which are fundamental in many algorithms. In aerospace, pathfinding algorithms like A* for planetary rovers use a min-heap to prioritize exploring paths with the lowest cost; the `decrease-key` operation is critical for updating path costs as shorter routes are found. In physics, discrete event simulations (e.g., modeling particle interactions) use a min-heap to pull the next chronological event to process, making the simulation efficient.

## When to study it
Before tackling heap operations, you must be comfortable with the following. If not, master them first.
*   **Data Structures:** Arrays (for the standard implementation) and the concept of binary trees (for the structural model).
*   **Algorithm Analysis:** Big-O notation, specifically understanding what $O(\log n)$ and $O(1)$ mean in terms of performance scaling.
*   **Mathematics:** Logarithms, particularly $\log_2 n$, as they define the height of the heap and thus the complexity of its operations.

## How to study it (step by step)
1.  **Implement the structure.** Represent a complete binary tree using a simple array. Write the three helper functions to find a node's relatives given its index `i`: `parent(i)`, `left_child(i)`, and `right_child(i)`. Use 0-based indexing.
2.  **Code `insert`.** Implement the insertion logic: add the new element to the end of the array (preserving the complete tree structure), then call a `heapify-up` (or `bubble-up`) helper function that repeatedly swaps the new element with its parent until the heap property is restored.
3.  **Code `extract-max` (or `min`).** Implement the extraction logic: swap the root element (index 0) with the last element in the array. Pop the last element (the old root). Then, call a `heapify-down` (or `sift-down`) function on the new root to swap it with its largest (or smallest) child until the heap property is restored.
4.  **Code `decrease-key`.** For a min-heap, this is just a `bubble-up`. For a max-heap, this requires a `sift-down`. Implement it and understand why the direction of movement depends on the heap type and the nature of the key change.
5.  **Derive the complexity.** For each operation, trace the path of the element that is "bubbling" or "sifting". Convince yourself that this path's maximum length is the height of the tree, which for a complete binary tree with $n$ nodes is $\lfloor\log_2 n\rfloor$. This is the origin of the $O(\log n)$ complexity.

## Key ideas, with intuition
1.  **The Heap Property is a Local Guarantee.** The core idea is that the heap property (`parent >= child` for a max-heap) only needs to hold locally. By enforcing this simple local rule everywhere, a powerful global property emerges: the largest element is always at the root. This makes finding the max/min an $O(1)$ operation.

2.  **A Complete Tree is Key to Efficiency.** Heaps are always *complete* binary trees (all levels full, except maybe the last, which is filled left-to-right). This is not an arbitrary choice. It guarantees two things:
    *   The tree is as balanced as possible, so its height is always $O(\log n)$.
    *   It can be stored compactly in an array without any pointers, which is memory-efficient and fast due to cache locality.

3.  **Array Mapping.** The mapping from tree structure to array indices is what makes heaps practical. For a node at index $i$:
    $$ \text{parent}(i) = \lfloor \frac{i-1}{2} \rfloor $$
    $$ \text{left\_child}(i) = 2i + 1 $$
    $$ \text{right\_child}(i) = 2i + 2 $$
    This is a direct consequence of storing the tree level by level in the array.

4.  **Fixing the Heap is a One-Way Street.** Any operation that might break the heap property (`insert`, `extract`, `decrease-key`) is fixed by moving a single, out-of-place element along a single path, either up towards the root or down towards a leaf. This traversal of the tree's height is why the operations are logarithmic. You are not re-shuffling the whole tree, just fixing one path.

## Worked example
Let's trace `insert` and `extract-max` on a max-heap.

**Initial State:**
*   Heap as a tree: See Diagram 1.
*   Heap as an array: `[42, 29, 18, 14, 7, 18, 12, 11, 5]`

**Operation 1: `insert(35)`**
1.  **Add to end:** Place `35` at the end of the array to maintain the complete tree structure.
    *   Array: `[42, 29, 18, 14, 7, 18, 12, 11, 5, 35]`
2.  **Bubble Up:** The new element `35` is at index `9`. Its parent is at index $\lfloor(9-1)/2\rfloor = 4$, which holds `7`.
    *   Since $35 > 7$, we swap them.
    *   Array: `[42, 29, 18, 14, 35, 18, 12, 11, 5, 7]`
3.  **Continue Bubbling:** The element `35` is now at index `4`. Its parent is at index $\lfloor(4-1)/2\rfloor = 1$, which holds `29`.
    *   Since $35 > 29$, we swap them.
    *   Array: `[42, 35, 18, 14, 29, 18, 12, 11, 5, 7]`
4.  **Stop:** The element `35` is now at index `1`. Its parent is at index $\lfloor(1-1)/2\rfloor = 0$, which holds `42`.
    *   Since $35 < 42$, the heap property is satisfied. The bubble-up is complete.

**Operation 2: `extract-max()` on the resulting heap**
1.  **Identify Max:** The max element is the root, `42`. We will return this value.
2.  **Swap:** Swap the root (`42` at index `0`) with the last element (`7` at index `9`).
    *   Array: `[7, 35, 18, 14, 29, 18, 12, 11, 5, 42]`
3.  **Remove:** Shrink the heap by removing the last element (the old max).
    *   Array: `[7, 35, 18, 14, 29, 18, 12, 11, 5]`
4.  **Sift Down:** The new root `7` violates the heap property. Compare it to its children at indices `1` (`35`) and `2` (`18`).
    *   The larger child is `35`. Since $7 < 35$, we swap them.
    *   Array: `[35, 7, 18, 14, 29, 18, 12, 11, 5]`
5.  **Continue Sifting:** The element `7` is now at index `1`. Its children are at indices `3` (`14`) and `4` (`29`).
    *   The larger child is `29`. Since $7 < 29$, we swap them.
    *   Array: `[35, 29, 18, 14, 7, 18, 12, 11, 5]`
6.  **Stop:** The element `7` is now at index `4`. Its children would be at indices `9` and `10`, which are out of bounds. It is now a leaf node, so the sift-down is complete. The heap property is restored.

**Reflection:** Each step was deterministic. `insert` added a leaf and pushed it up. `extract-max` removed the root, filled the hole with a leaf, and pushed that leaf down. Both operations traversed a single path from top to bottom or bottom to top, taking $O(\log n)$ time.

## Diagrams
**Diagram 1: Initial Max-Heap**
The array `[42, 29, 18, 14, 7, 18, 12, 11, 5]` corresponds to this tree structure:
```text
        42
       /  \
     29    18
    / \   / \
   14  7 18  12
  / \
 11  5
```

**Diagram 2: `insert(35)` Bubble-Up Process**
Shows the path of `35` as it moves up the tree.
```text
Step 1: Add 35 as new leaf      Step 2: Swap with parent 7      Step 3: Swap with parent 29
        42                             42                             42
       /  \                           /  \                           /  \
     29    18                       29    18                       35    18
    / \   / \         -->          / \   / \         -->          / \   / \
   14  7 18  12                     14 35 18  12                     14 29 18  12
  / \ /                            / \ /                            / \ /
 11 5 35                          11 5 7                           11 5 7
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a corporate hierarchy (a tree) where seniority (the value) determines your rank.
    *   **`insert`**: A new, highly-skilled hire (`new_value`) joins at the bottom. They "bubble up" by repeatedly getting promoted over their direct manager (`parent`) until they find a manager who is more skilled than they are.
    *   **`extract-max`**: The CEO (`root`) retires. To avoid chaos, the newest intern from the mailroom (`last_leaf`) is temporarily appointed CEO. They are completely out of their depth and are repeatedly demoted, swapping places with their most competent subordinate (`largest_child`), until they land at a level where they are more competent than their reports. This is the "sift-down".

2.  **Must-Overlearn Formulas (0-based indexing):**
    *   `parent(i) = floor((i-1) / 2)`
    *   `left_child(i) = 2*i + 1`
    *   `right_child(i) = 2*i + 2`

3.  **Spaced Repetition Schedule:**
    Re-derive these formulas and the logic for insert/extract on paper at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.** Do not just read them. Rebuild them.

4.  **First Principles Pathway:** If you forget everything, rebuild from this:
    *   **Goal:** Keep the most extreme value (max or min) at the root.
    *   **Constraint:** The tree must remain *complete* to guarantee $O(\log n)$ height and allow array storage.
    *   **`insert` logic:** To keep the tree complete, you *must* add to the next available slot (the end of the array). This new node might violate the heap property with its parent. The only fix is to swap it upwards.
    *   **`extract` logic:** To keep the tree complete after removing the root, you *must* fill the hole. The only node you can move without creating a hole elsewhere is the *last* one. This new root is probably wrong, so it must be swapped downwards with the child that helps restore the property most (the larger child in a max-heap).

## Common mistakes
*   **1-based vs. 0-based indexing:** Using formulas for 1-based indexing (`parent = i/2`, `left = 2i`) in a 0-indexed array. This is the most common source of bugs. Stick to the 0-based formulas above.
*   **Sifting Down Incorrectly:** When sifting down a node in a max-heap, you must swap it with its **largest** child. Swapping with any child can still leave a violation (e.g., if `parent=5`, `child1=10`, `child2=20`, swapping with `10` leaves `10` as the parent of `20`, which is incorrect).
*   **Modifying Keys Incorrectly:** The complexity of `decrease-key` is $O(\log n)$ only if you already have a pointer or index to the element. If you have to search for the element first, the total operation becomes $O(n)$. This is a critical distinction in algorithm analysis.
*   **Off-by-one in loop conditions:** When bubbling or sifting, your loop must correctly terminate when the node reaches the root (for bubble-up) or becomes a leaf (for sift-down). A bad condition can lead to an infinite loop or an index-out-of-bounds error.

## Self-check
*Do not provide answers. The goal is for me to derive them.*

1.  Start with the max-heap represented by the array `[90, 80, 40, 30, 70, 20, 10]`. What is the exact state of the array after performing `insert(85)`?
2.  Using the final heap from the previous question, what is the state of the array after performing `extract-max()`? Show the intermediate state after the swap-and-remove but before the sift-down begins.
3.  Consider a min-heap. You are given the heap `[3, 5, 7, 10, 8, 15, 9]` and are told to perform `decrease-key` on the node with value `15`, changing it to `4`. What is the final state of the array? Explain why the element moves the way it does.