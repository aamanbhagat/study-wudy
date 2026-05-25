## What it is
A heap is a specialized tree-based data structure that satisfies the **heap property**. For a **max-heap**, the value of any node is greater than or equal to the values of its children. For a **min-heap**, the value of any node is less than or equal to the values of its children. In addition to this value property, a heap must also have a specific shape: it must be a **complete binary tree**.

## Why it matters
Heaps are the canonical implementation for **Priority Queues**, which are fundamental in many algorithms. They are used in Dijkstra's algorithm for finding the shortest path in a graph (critical for navigation and network routing), in event-driven simulations for managing future events (used in physics modeling), and in the Huffman coding algorithm for lossless data compression. The Heapsort algorithm is also an efficient, in-place sorting method derived directly from the heap data structure.

## When to study it
Before tackling heaps, you must have a solid understanding of these prerequisites:
1.  **Binary Trees**: You need to be fluent with the concepts of nodes, root, parent, child, and the tree's height.
2.  **Complete Binary Trees**: This is a non-negotiable prerequisite. You must know the definition: a binary tree in which every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible.
3.  **Arrays/Lists**: Heaps are almost always implemented using an array, not with explicit node pointers. You must be comfortable with array indexing.

If you are not confident with these, pause and review them.

## How to study it (step by step)
1.  **Review Complete Binary Trees:** Draw three examples of complete binary trees and two examples of binary trees that are *not* complete. For each, label the levels and nodes. This solidifies the required *shape property*.
2.  **Internalize the Heap Property:** Write down the definitions for the max-heap and min-heap properties. For the trees you drew in step 1, assign integer values to the nodes to make one a valid max-heap and another a valid min-heap.
3.  **Derive Array Indexing Formulas:** Draw a complete binary tree with nodes indexed from 0. Pick an arbitrary node at index $i$. Find the index of its parent, its left child, and its right child. Generalize this to derive the formulas:
    *   `parent(i) = floor((i-1)/2)`
    *   `leftChild(i) = 2i + 1`
    *   `rightChild(i) = 2i + 2`
4.  **Practice on Paper:** Take the array `A = [4, 10, 3, 5, 1]`. Draw the corresponding binary tree. Check if it satisfies the max-heap property. If not, identify which nodes violate it.
5.  **Manual Heapify:** For the invalid heap from step 4, perform swaps to fix the violations. Start from the lowest, rightmost parent and work your way up to the root, swapping a parent with its larger child until the property is restored. This builds intuition for the `heapify` operation.

## Key ideas, with intuition
1.  **The Heap Property (Vertical Ordering):** This is the core rule.
    *   **Max-Heap:** `parent >= child`. Think of it as a corporate hierarchy. The manager (parent) always has a rank (value) at least as high as their direct reports (children). This guarantees the CEO (root) is the highest-ranking person in the company.
    *   **Min-Heap:** `parent <= child`. The root is the minimum element.
    This property is local—it only relates a parent to its *immediate* children. There is no required relationship between siblings (e.g., `A[2i+1]` and `A[2i+2]`).

2.  **The Shape Property (Complete Binary Tree):** This is what makes heaps efficient. By enforcing that the tree is complete, we guarantee that its height $h$ is $O(\log n)$ for $n$ nodes. Since heap operations (like insertion and deletion) are proportional to the tree's height, this ensures their logarithmic time complexity. It also allows for a compact array representation without any wasted space.

3.  **The Implicit Tree in an Array:** A heap is a tree conceptually, but an array physically. The tree structure isn't stored with pointers; it's *implied* by the array indices. This is extremely memory-efficient. Given a node at index $i$ in a 0-indexed array:
    $$ \text{parent}(i) = \lfloor \frac{i-1}{2} \rfloor $$
    $$ \text{left\_child}(i) = 2i + 1 $$
    $$ \text{right\_child}(i) = 2i + 2 $$
    This mapping is a direct consequence of the complete binary tree structure.

## Worked example
**Problem:** Does the array `A = [90, 15, 10, 7, 12, 2]` represent a valid max-heap?

**Step 1: Visualize the tree from the array.**
We map the array indices to tree positions.
- Index 0: `90` (root)
- Index 1: `15` (left child of 90)
- Index 2: `10` (right child of 90)
- Index 3: `7` (left child of 15)
- Index 4: `12` (right child of 15)
- Index 5: `2` (left child of 10)

The corresponding tree is shown in the Diagrams section.

**Step 2: Check the max-heap property for every parent-child relationship.**
The property is `A[parent] >= A[child]`. We only need to check the non-leaf nodes. The leaves are nodes at indices 3, 4, and 5. The parents are at indices 0, 1, and 2.

- **Check Node at index 0 (value 90):**
    - Left child is at index 1 (value 15). Is $90 \ge 15$? Yes.
    - Right child is at index 2 (value 10). Is $90 \ge 10$? Yes.
    - *This node is valid.*

- **Check Node at index 1 (value 15):**
    - Left child is at index 3 (value 7). Is $15 \ge 7$? Yes.
    - Right child is at index 4 (value 12). Is $15 \ge 12$? Yes.
    - *This node is valid.*

- **Check Node at index 2 (value 10):**
    - Left child is at index 5 (value 2). Is $10 \ge 2$? Yes.
    - *This node is valid.*

**Step 3: Conclude.**
Every node in the tree satisfies the max-heap property (`parent >= child`). The tree is also a complete binary tree by definition of the array-to-tree mapping. Therefore, the array `A` represents a valid max-heap.

**Reflection:** The process was methodical. We first ensured the shape was correct (implicitly, by using an array) and then verified the ordering property for every parent, working from the root down. A single violation would have invalidated the entire structure as a max-heap.

## Diagrams
A valid max-heap and its array representation.

```text
        Tree View
        ---------
            90 (i=0)
           /  \
          /    \
      15 (i=1)  10 (i=2)
      /   \     /
     /     \   /
   7(i=3) 12(i=4) 2(i=5)

-------------------------------------

        Array View
        ----------
Index:   0   1   2   3   4   5
Value: [90, 15, 10, 7, 12, 2]
```

## Memory technique — remember this forever
1.  **Mnemonic:**
    *   **Max-Heap:** "King of the Hill." The parent is the King, and they are always greater than (or equal to) their direct children subjects. The biggest King of all is at the top (the root).
    *   **Min-Heap:** "Child in a Valley." The parent is at the bottom of a local valley, always smaller than (or equal to) their children on the slopes above them. The smallest value of all is in the deepest valley at the root.

2.  **Overlearn these facts:**
    *   Max-Heap Property: $A[\text{parent}(i)] \ge A[i]$
    *   Min-Heap Property: $A[\text{parent}(i)] \le A[i]$
    *   Shape Property: Must be a **complete binary tree**.

3.  **Spaced Repetition Schedule:**
    Review these concepts and re-derive the index formulas at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, rebuild it from two ideas:
    1.  **Shape:** We need a tree that's compact and has a predictable structure to fit into an array. The most compact is a **complete binary tree** (fill levels left-to-right).
    2.  **Order:** We want fast access to the max or min element. Let's enforce a simple, local rule: a parent must be "more extreme" (bigger for max, smaller for min) than its children.
    From these two ideas, the entire heap structure and its properties emerge. The array indexing formulas can be re-derived by drawing a complete binary tree, numbering its nodes $0, 1, 2, ...$, and observing the arithmetic relationship between a parent's index and its children's indices.

## Common mistakes
1.  **Confusing with a Binary Search Tree (BST):** A heap only enforces a *vertical* order (parent vs. child). A BST enforces a *horizontal* order (left child < parent < right child). In a max-heap, the left child can be greater than the right child, or vice-versa.
2.  **Assuming the Whole Array is Sorted:** Only the root is guaranteed to be the maximum (or minimum). A heap is a *partially ordered* structure, not a fully sorted one. For example, in the max-heap `[90, 15, 10]`, `15` appears before `10`, but in `[90, 10, 15]`, which is also a valid max-heap, it does not.
3.  **Forgetting the Shape Property:** A tree like `10 -> 8 -> 6` (a degenerate linked list) satisfies the max-heap property, but it is not a heap because it is not a complete binary tree. The shape property is as important as the value property.

## Self-check
1.  Is the array `A = [10, 20, 5]` a valid min-heap? Draw the tree and justify your answer.
2.  Consider the array `B = [100, 80, 90, 40, 50, 60, 70]`. Is it a max-heap, a min-heap, or neither? Identify the first node (starting from the root) that violates the relevant property, if any.
3.  In a large max-heap implemented in a 0-indexed array, a node is at index $i$. Assuming its grandchildren exist, provide the formulas for the indices of its four possible grandchildren.