## 1. The one-sentence answer
**A binary heap is a complete binary tree that stores priorities so that every parent is larger (max-heap) or smaller (min-heap) than its children, allowing insert, extract-max/min, and decrease-key to run in O(log n) time by moving a single element along one root-to-leaf path.**

The structure is an array that is always kept full level by level. Because the tree is complete, its height is exactly floor(log₂ n). Every operation therefore touches at most that many nodes.

Insert places the new element at the next free array slot and restores the heap property by repeatedly swapping it with its parent. Extract-max removes the root, moves the last leaf into the root position, shrinks the heap by one, and restores the property by repeated swaps with the larger child. Decrease-key changes a node’s priority and then bubbles it up or down exactly as the two preceding operations do.

> [!NOTE]
> The O(log n) bound is not an average; it is a strict worst-case guarantee that follows directly from the height of any complete binary tree of n nodes.

## 2. Why this matters — concrete and current
Dijkstra’s algorithm with a binary heap is the default implementation inside Google’s routing stack for computing shortest paths on continental road networks; each edge relaxation performs a decrease-key whose cost is bounded by the heap height.

Modern operating-system schedulers (Linux CFS, FreeBSD ULE) represent runnable threads in a red-black tree augmented with heap-like priority queues; the extract-max operation selects the next task to run and is invoked millions of times per second on a busy server.

JPEG and MPEG encoders build Huffman trees by repeatedly extracting the two lowest-frequency symbols from a min-heap; the same heap primitive appears inside the Deflate compressor used by gzip and PNG.

A* path-finding on game maps and in autonomous-vehicle planners maintains an open set as a binary heap; each node expansion issues one extract-min and up to four decrease-key operations, keeping real-time replanning under 1 ms even on million-node graphs.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Complete binary tree     | Guarantees height ⌊log₂ n⌋ and an implicit array representation without explicit child pointers |
| Array indexing for heaps | Parent of index i is ⌊(i−1)/2⌋; children are 2i+1 and 2i+2; enables O(1) parent/child access |
| Heap-order property      | The only invariant that must be restored after each mutation; all complexity claims rest on it |

## 4. Building the idea — from intuition to formalism

### Step 1 — Represent the heap in an array
A complete binary tree of n nodes can be stored in an array of size n without any pointers.  
Example: the tree with root 10, left 7, right 8 occupies indices 0,1,2.  
Formally, for any index i the left child is at 2i+1 and the right child at 2i+2 (0-based indexing).  
> [!WARNING] Using 1-based indexing formulas on a 0-based array produces off-by-one child accesses that silently corrupt the heap.

### Step 2 — State the heap-order invariant
In a max-heap every node A[i] satisfies A[i] ≥ A[2i+1] and A[i] ≥ A[2i+2] whenever the children exist.  
The invariant is local yet implies the global maximum resides at the root.

### Step 3 — Insert: append then bubble up
Place the new value at index n, increment n, then while the value is larger than its parent swap the two.  
At most ⌊log₂ n⌋ swaps occur because each swap halves the distance to the root.  
Formal cost: Θ(height) = O(log n).

### Step 4 — Extract-max: promote last leaf then bubble down
Swap root with last leaf, decrement n, then repeatedly swap the new root with its larger child until the heap property holds.  
Again the number of swaps is bounded by the height.

### Step 5 — Decrease-key: bubble in the correct direction
After lowering A[i], compare only with the parent; if the parent is now smaller, bubble up exactly as in insert.  
(If the key were increased instead, bubble-down would be required; the name “decrease-key” therefore fixes the direction.)

### Step 6 — All three operations share the same height bound
Because every complete binary tree of n nodes has height ⌊log₂ n⌋, each of the three operations performs O(1) work per level along a single path and therefore finishes in O(log n) time.

## 5. Worked examples — every step shown

**Example 1 — Insert 15 into max-heap [10,7,8,3,5]**  
*Given:* array A = [10,7,8,3,5], n = 5.  
*Find:* resulting array after inserting 15.  
Place 15 at index 5 → [10,7,8,3,5,15].  
Compare 15 with parent at index 2 (value 8): 15 > 8, swap → [10,7,15,3,5,8].  
Compare 15 with parent at index 0 (value 10): 15 > 10, swap → [15,7,10,3,5,8].  
No parent remains.  
**Final array: [15,7,10,3,5,8]**  
*Reflection:* The single path of length 2 demonstrates that cost equals tree height; the same path length appears in every later example.

**Example 2 — Extract-max from [15,7,10,3,5,8]**  
*Given:* the heap above.  
*Find:* maximum returned and new heap.  
Swap indices 0 and 5 → [8,7,10,3,5,15], n ← 5, discard 15.  
8 < max(7,10) = 10, swap with index 2 → [10,7,8,3,5].  
8 < max(3,5) = 5, swap with index 4 → [10,7,8,3,5] (no further violation).  
**Returned value: 15; final array: [10,7,8,3,5]**  
*Reflection:* The bubble-down path length again equals height; the algorithm never examines the discarded leaf.

**Example 3 — Decrease-key index 3 from 3 to 1**  
*Given:* [10,7,8,3,5].  
*Find:* heap after change.  
A[3] ← 1 → [10,7,8,1,5].  
Compare with parent index 1 (value 7): 1 < 7, stop.  
**Final array: [10,7,8,1,5]**  
*Reflection:* Because the key only decreased, the single upward comparison suffices; no downward search is required.

**Example 4 — Sequence of three operations on empty heap**  
*Given:* empty max-heap.  
Insert 4, insert 9, extract-max, decrease-key on the remaining element from 4 to 1.  
After two inserts: [9,4].  
Extract-max returns 9, leaves [4].  
Decrease-key changes the only element to 1; no swaps occur.  
**Final state: [1]**  
*Reflection:* Edge-case handling (empty heap, single element) follows identically from the same parent/child index formulas.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Off-by-one child indices | Mixing 0-based and 1-based formulas | Write the three index expressions once on a card and copy them verbatim |
| Forgetting to decrement n after extract-max | The last leaf is conceptually removed yet still occupies the array | Immediately after the swap, set A[n−1] = sentinel and n = n−1 |
| Bubbling in the wrong direction after decrease-key | Confusing decrease with increase | Always test only against the parent; if the new value is smaller than parent, stop |
| Assuming the heap stays balanced after arbitrary mutations | Forgetting that only the three primitive operations preserve completeness | Never modify the array except through the documented insert/extract/decrease routines |
| Returning the maximum without restoring the heap | Early exit after swapping root and leaf | Always run the full bubble-down loop even when the new root satisfies the property |
| Using a non-complete tree | Building a heap from an arbitrary binary tree | Enforce the complete shape by growing the array contiguously from index 0 |

## 7. The textbook-precise statement
A binary heap is a complete binary tree represented in an array A[0..n−1] that satisfies the max-heap property: for every i with 2i+1 < n, A[i] ≥ A[2i+1] and A[i] ≥ A[2i+2]. The operations INSERT, EXTRACT-MAX and DECREASE-KEY each run in O(log n) worst-case time because each performs at most ⌊log₂ n⌋ swaps along a single path whose length equals the height of the tree. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 6, Theorems 6.1 and 6.5.)

## 8. Visual — diagram or schematic
```text
Index:  0   1   2   3   4   5
Value: 15   7  10   3   5   8
Tree:
          15
       /      \
      7        10
     / \      / \
    3   5    8
Parent of index 3 = floor((3-1)/2) = 1
Left child of index 1 = 2*1+1 = 3
Right child of index 1 = 2*1+2 = 4
Height = floor(log2 6) = 2
```

## 9. The memory technique
**The hook** — Picture a pyramid of stones; the heaviest stone sits at the apex. Any new stone is dropped at the base and bubbles upward only until it meets a heavier stone; removing the apex stone pulls the lightest base stone to the top and lets it sink.

**What to overlearn** — The three index formulas (parent ⌊(i−1)/2⌋, children 2i+1 and 2i+2) and the exact height bound ⌊log₂ n⌋.

**Spaced-repetition schedule** — Review the index formulas after 1 day, re-derive the O(log n) bound after 3 days, implement all three operations from memory after 7 days, and solve a full decrease-key problem after 16 and 35 days.

**First-principles fallback** — Rebuild the argument from the definition of a complete binary tree: its height is ⌊log₂ n⌋, therefore any path from root to leaf contains at most that many edges, and each primitive operation traverses at most one such path.

## 10. What this unlocks
Binary-heap primitives give an efficient implementation of a priority queue, which is the central data structure behind Dijkstra, Prim, Huffman coding, and A*.  

- Next: Fibonacci heaps (amortized O(1) decrease-key)  
- Next: d-ary heaps for cache-friendly decrease-key  
- Next: heap-augmented union-find for offline MST algorithms  
- Next: soft heaps and kinetic data structures in computational geometry

## 11. Self-check — five questions, no answers
1. What is the exact height of a complete binary heap containing exactly 31 nodes?  
2. After inserting 1 into the max-heap [10,9,8,7], which single index is swapped with the new element?  
3. In a min-heap of 1000 elements, what is the maximum number of comparisons performed by extract-min?  
4. Suppose decrease-key is called on a leaf that already satisfies the heap property after the change; how many swaps occur?  
5. Identify the subtle bug: a programmer implements extract-max by swapping root and last leaf, decrementing n, then immediately returning the old root value without any further swaps.