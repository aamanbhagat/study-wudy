## 1. The one-sentence answer
**A binary heap supports insert, extract-max/min and decrease-key each in O(log n) time because every operation travels at most the height of a complete binary tree and restores the heap property by bubbling up or down.**

A heap is a complete binary tree that satisfies the heap property: in a max-heap every parent is greater than or equal to its children. Because the tree is always complete, we can store it in an array without any pointers; the children of index i sit at 2i+1 and 2i+2. When you insert a new value you place it at the next free leaf and then walk it upward, swapping with its parent whenever the heap property is violated; each swap fixes one level and there are only log n levels. Extract-max removes the root, moves the last leaf into its place and walks that value downward, again crossing at most log n levels. Decrease-key changes a node’s value and bubbles it up exactly like insertion. The O(log n) bound therefore follows directly from the height of a complete binary tree.

> [!NOTE]
> The single most important “aha” is that completeness guarantees height log n; without completeness the same bubbling logic could cost linear time.

## 2. Why this matters — concrete and current
In Dijkstra’s algorithm with a binary heap, Google Maps recomputes shortest paths on road networks containing millions of nodes in milliseconds; each decrease-key on a node’s tentative distance costs O(log n) and the algorithm performs O(E) such updates.  
Modern garbage collectors in the JVM and .NET runtime use binary heaps to manage the remembered-set of cross-generation pointers; an object promotion triggers an insert that must finish before the next minor collection, keeping pause times under 10 ms.  
Linux’s Completely Fair Scheduler stores runnable tasks in a red-black tree, but the underlying priority decisions rely on a heap-ordered vruntime; extract-max selects the next task in O(log n) and keeps context-switch overhead negligible on servers with thousands of threads.  
NASA’s Perseverance rover flight software maintains a heap of telemetry packets ordered by priority; an unexpected high-severity fault triggers an insert that is guaranteed to complete before the next 1 Hz control cycle.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Complete binary tree | Guarantees height = floor(log n) so every path is short   |
| Array indexing       | Lets us compute parent and child indices in O(1) time     |
| Swap and comparison  | The only primitive operations used while bubbling         |
| Big-O height analysis| Converts “at most h swaps” into the O(log n) claim        |

If any row above is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Heap property and completeness
A max-heap requires every parent ≥ both children; a min-heap requires the opposite. The tree must also be complete—every level except possibly the last is full and the last level is left-justified.  
Example: the array [10, 8, 7, 6, 5] represents a valid max-heap; swapping 6 and 5 would violate completeness.  
Formal statement: for every index i, A[parent(i)] ≥ A[i] and the tree with n nodes occupies indices 0 … n-1 without gaps.

> [!WARNING]
> If you allow holes, height can become linear and the O(log n) guarantee disappears.

### Step 2 — Array representation
Store the heap in a 0-based array. Parent of i is floor((i-1)/2); left child is 2i+1; right child is 2i+2.  
Example: root at index 0, its left child at 1, right child at 2, their children at 3,4,5,6.  
Formal: parent(i) = ⌊(i-1)/2⌋, left(i) = 2i+1, right(i) = 2i+2, all indices < n.

### Step 3 — Insert via bubble-up
Place the new element at index n, increment n, then while the element is larger than its parent swap them.  
Example: inserting 9 into [10,8,7,6,5] yields [10,9,7,6,5,8] after one swap.  
Formal: after placing x at n-1, repeatedly swap while i > 0 and A[parent(i)] < A[i].

> [!WARNING]
> Forgetting to stop at the root (i=0) produces an out-of-bounds access.

### Step 4 — Extract-max via heapify-down
Swap root with last element, shrink n by one, then restore the heap property by repeatedly swapping the new root with its larger child until both children are smaller.  
Example: extract-max on [10,9,7,6,5,8] returns 10 and leaves [9,8,7,6,5] after two swaps.  
Formal: after moving A[n-1] to index 0 and decrementing n, set i=0; while 2i+1 < n and A[i] < max(A[left],A[right]) swap with the larger child.

### Step 5 — Decrease-key
Change A[i] to a smaller value (max-heap) or larger value (min-heap) and bubble the node up exactly as in insert.  
Formal: after updating A[i], run the same loop used in Step 3 from that index.

### Step 6 — Height argument for O(log n)
A complete binary tree of n nodes has height h = ⌊log₂ n⌋. Every bubble-up or heapify-down traverses at most h edges; each edge costs O(1) work, therefore total time is O(log n).

## 5. Worked examples — har step show karo

**Example 1 — Simple insert**  
*Given:* empty max-heap, insert 5.  
*Find:* resulting array.  
Place 5 at index 0. No parent exists, so stop.  
*Why:* root has no parent, loop condition i>0 fails immediately.  
**Final array: [5]**

*Reflection:* the base case of insert is trivial; the same code path handles the first element.

**Example 2 — Insert that bubbles twice**  
*Given:* [10,8,7,6,5], insert 9.  
*Find:* final array after all swaps.  
Index 5 receives 9. Parent = 2, A[2]=7 < 9 → swap → [10,8,9,6,5,7].  
Now i=2, parent=0, A[0]=10 ≮ 9 → stop.  
*Why:* each swap restores the property on one level.  
**Final array: [10,8,9,6,5,7]**

*Reflection:* two swaps equal the height, confirming the worst-case bound.

**Example 3 — Extract-max**  
*Given:* [10,9,7,6,5,8].  
*Find:* value returned and new heap.  
Swap indices 0 and 5 → [8,9,7,6,5,10], n=5.  
i=0, left=1 (9), right=2 (7), 9>8 → swap with 1 → [9,8,7,6,5].  
i=1, both children ≥5, 8 is largest but 8 ≯ 8? No further swap.  
*Why:* we always compare against the larger child to preserve the property.  
**Returned: 10, final array: [9,8,7,6,5]**

*Reflection:* the last leaf can be smaller than many nodes, forcing a long downward path.

**Example 4 — Decrease-key**  
*Given:* [10,9,7,6,5,8], decrease index 5 from 8 to 4.  
*Find:* resulting heap.  
A[5]=4. Parent=2, A[2]=7 > 4, no swap needed (max-heap).  
*Why:* value only moves when it violates the property with its parent.  
**Final array: [10,9,7,6,5,4]**

*Reflection:* decrease-key never moves a node downward; the symmetric increase-key would require heapify-down.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using 1-based indexing      | Confusion with textbook pseudocode          | Decide once and stick to 0-based everywhere  |
| Forgetting to shrink n after extract | Overwriting the last element                | Decrement n before any further indexing      |
| Comparing only left child   | Assuming right child is always larger       | Always examine both children when they exist |
| Bubble-up past root         | Missing the i>0 guard                       | Write the loop condition explicitly          |
| Calling decrease-key on an index that no longer exists | Stale index after previous extract        | Keep a separate position map when needed     |
| Treating heap as sorted array | Observing sorted order on one path only   | Remember only the heap property is guaranteed|
| Off-by-one in child indices | 2*i vs 2*i+1                                | Draw the mapping once on paper               |

## 7. The textbook-precise statement
A binary heap is a complete binary tree stored in an array A[0..n-1] that satisfies the heap property: for every i with 2i+1 < n, A[i] ≥ A[2i+1] and A[i] ≥ A[2i+2] (max-heap). The INSERT procedure places the new key at A[n], increments n, then performs a bubble-up that terminates when the key is no longer greater than its parent or the root is reached. The EXTRACT-MAX procedure returns A[0], moves A[n-1] into A[0], decrements n, and restores the heap property by repeated swaps with the larger child. Both procedures perform at most ⌊log₂ n⌋ swaps. Decrease-key updates A[i] and performs the same bubble-up from i. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 6, Sections 6.1–6.3.)

## 8. Visual — diagram or schematic
```
Index:  0   1   2   3   4   5
Value: 10   9   7   6   5   8
Tree:
          10
       /      \
      9        7
     / \      /
    6   5    8
Parent of index 5 = floor((5-1)/2) = 2
Left child of index 1 = 2*1+1 = 3
```

## 9. The memory technique
1. **The hook** — picture a pyramid of stones; each stone is heavier than the two below it; when you drop a new stone on top it sinks until it rests on heavier stones.  
2. **What to overlearn** — parent(i) = ⌊(i-1)/2⌋, height = ⌊log₂ n⌋, each operation crosses ≤ height edges.  
3. **Spaced-repetition schedule** — review the three operation loops after 1 day, 3 days, 7 days, 16 days and 35 days.  
4. **First-principles fallback** — redraw the complete tree on paper, mark the path from the changed node to the root or to the leaves, count the edges; that count is the exact number of swaps.

## 10. What this unlocks
Once you master heap operations you can implement Dijkstra, Prim, and Huffman coding in optimal time, and you gain the foundation for understanding Fibonacci heaps and union-find with path compression.  
- Next topic: decrease-key in Dijkstra’s algorithm  
- Later: building a heap in O(n) via bottom-up heapify  
- Related structure: priority queue abstract data type

## 11. Self-check — five questions, no answers
1. Insert 1 into the max-heap [10,9,8,7,6,5,4]; how many swaps occur?  
2. After performing extract-max twice on [100,90,80,70,60], what is the new root?  
3. In a min-heap of 31 nodes, what is the largest possible index that can be the parent of a leaf?  
4. Suppose decrease-key is called on the current minimum element of a max-heap; does the operation still run in O(log n)?  
5. If the heap property is weakened so that only every other level satisfies the ordering, what happens to the running time of extract-max?