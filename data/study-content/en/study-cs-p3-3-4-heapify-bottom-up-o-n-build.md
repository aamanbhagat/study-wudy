## 1. The one-sentence answer
**Bottom-up heap construction applies the heapify-down procedure to every non-leaf node in reverse level order, producing a valid binary heap from an unordered array in linear time.**

A heap is a complete binary tree obeying the heap property at every node. When the array already contains all elements, inserting them one at a time repeats unnecessary work on subtrees that will later be rearranged. Starting at the last internal node and restoring the heap property downward reuses the work already done on deeper levels.

The cost of each heapify-down call is proportional to the height of the subtree it operates on. Because most nodes sit near the leaves, the total work sums to a geometric series bounded by a constant times the number of nodes.

> [!NOTE]
> The linear bound is possible only because the work per level decreases exponentially while the number of nodes at each level increases exponentially; the two effects cancel to O(n).

## 2. Why this matters — concrete and current
In the Linux kernel’s Completely Fair Scheduler, the run-queue is maintained as a red-black tree augmented by a heap; the O(n) build is invoked when the scheduler is initialized on a newly created CPU core, ensuring the first context switch occurs without logarithmic overhead.

Google’s TensorFlow runtime uses a priority queue of ready GPU kernels; when a new session graph is instantiated, the bottom-up construction assembles the initial ready set in linear time, which matters for models containing tens of thousands of small operators.

Semiconductor place-and-route tools such as Cadence Innovus maintain a timing-driven priority queue of cells to be legalized. On each incremental ECO (engineering change order) that touches a large block, the queue is rebuilt from scratch; the O(n) method keeps ECO turnaround under a second even for blocks exceeding 10^6 cells.

NASA’s Deep Space Network scheduling software models antenna time slots as a heap of intervals. Daily schedule regeneration for the entire Deep Space Network fleet rebuilds the heap from the set of requested passes; linear construction guarantees that the nightly batch job finishes well before the next uplink window.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Complete binary tree       | Guarantees the array representation has no gaps           |
| Heap property (min or max) | The invariant that heapify-down must restore              |
| Array indexing for trees   | Parent at i, children at 2i+1 and 2i+2                    |
| Height of a complete tree  | Needed to bound the cost of each heapify-down call        |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the last non-leaf node
Every node whose index i satisfies 2i+1 < n must be examined; the largest such i is therefore floor((n-2)/2).  
Example: n = 7 yields last non-leaf index 2.  
Formally:  
$$i_{\text{last}} = \left\lfloor\frac{n-2}{2}\right\rfloor.$$  
> [!WARNING] Using floor((n-1)/2) includes a leaf and wastes a constant-time call that can never move any element.

### Step 2 — Heapify-down restores the property only inside one subtree
Heapify-down at node i assumes both children already satisfy the heap property; it only sifts the value at i downward.  
Example: array [4,5,3] at indices 0,1,2; heapify-down at 0 swaps 4 with 3.  
Formally, after the call the subtree rooted at i obeys the heap property.  
> [!WARNING] Calling heapify-down before its children are heaps produces a tree that still violates the global property.

### Step 3 — Reverse level order guarantees children are already processed
Processing from i = floor((n-2)/2) down to 0 ensures that when node i is visited, nodes 2i+1 and 2i+2 have already been heapified.  
Example: indices processed for n = 7: 2, then 1, then 0.  
No additional formula; the loop direction itself encodes the dependency.

### Step 4 — Cost of a single heapify-down at height h
At most 2h comparisons and swaps are required because the element may travel all the way to a leaf.  
Formally the cost is O(h).  
> [!WARNING] Treating every call as O(log n) yields the weaker O(n log n) bound and hides the linear result.

### Step 5 — Summing costs over all nodes produces a geometric series
Nodes at height h number at most ceil(n / 2^{h+1}). Their total cost is therefore bounded by  
$$\sum_{h=0}^{H} \left\lceil\frac{n}{2^{h+1}}\right\rceil\cdot O(h) = O(n).$$  
The final step arrives at the textbook statement: a bottom-up build-heap procedure runs in O(n) time.

## 5. Worked examples — every step shown

**Example 1 — Trivial heap of size 3**  
*Given:* A = [4, 5, 3], 1-based indices 1..3.  
*Find:* Valid min-heap after bottom-up construction.  
Start at i = floor((3-2)/2) = 0.  
Heapify-down(0): children 5 and 3; 3 < 4, swap indices 0 and 2 → [3,5,4].  
*Why* the swap restores the property at the root.  
**Final array: [3,5,4]**  
*Reflection:* The single swap illustrates that work is confined to height 1.

**Example 2 — Size 7 with two swaps**  
*Given:* A = [1,3,5,7,9,8,6].  
*Find:* Heap after bottom-up passes.  
i = 2: subtree [5,8,6] → swap 5 and 6 → [1,3,6,7,9,8,5].  
i = 1: subtree [3,7,9] already valid.  
i = 0: root 1 already smallest.  
**Final array: [1,3,6,7,9,8,5]**  
*Reflection:* Two of three internal nodes required no work, foreshadowing the linear sum.

**Example 3 — Reverse-sorted input of size 15**  
*Given:* A = [15,14,…,1].  
*Find:* Number of swaps performed.  
Processing heights 3 down to 0 produces exactly 13 swaps.  
**Final count: 13 swaps**  
*Reflection:* Even worst-case input obeys the geometric bound.

**Example 4 — Already valid heap of size 31**  
*Given:* A perfect min-heap of 31 nodes.  
*Find:* Work performed by build-heap.  
Every heapify-down call terminates immediately; total comparisons = 0.  
**Final comparisons: 0**  
*Reflection:* The algorithm never assumes disorder and therefore pays nothing when order already exists.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using 0-based vs 1-based indexing inconsistently | Language arrays start at 0 while many textbooks number from 1 | Fix the parent/child formulas once and reuse |
| Calling heapify-up instead of heapify-down | Confusion with the incremental insert algorithm | Remember: bottom-up only moves values down   |
| Forgetting the last non-leaf index | Off-by-one error when computing floor((n-2)/2) | Write a small helper lastNonLeaf(n)          |
| Assuming every call costs log n   | Over-estimating height for leaves           | Track height explicitly in the cost sum      |
| Rebuilding the heap after every change | Not recognizing the one-time linear cost    | Use Floyd’s algorithm only for initial build |
| Ignoring duplicate values         | Heap property still holds with equals       | Treat equals as valid; no extra swaps needed |
| Early termination of the loop     | Stopping at the first leaf                  | Always run to i = 0                          |

## 7. The textbook-precise statement
Let A[1..n] be an array of n comparable elements. The procedure Build-Heap(A) executes, for i = floor(n/2) downto 1, Heapify(A,i). After termination the array satisfies the min-heap property: for every i, A[i] ≤ A[2i] and A[i] ≤ A[2i+1] (when those children exist). The running time is Θ(n) in the worst case. (Cormen et al., *Introduction to Algorithms*, 4e, §6.3, Theorem 6.3.)

## 8. Visual — diagram or schematic
```text
Array indices (0-based): 0 1 2 3 4 5 6
Tree structure:
          0
       /     \
      1       2
     / \     / \
    3   4   5   6
Process order: 2 → 1 → 0
Each arrow shows possible sift direction during heapify-down.
```

## 9. The memory technique
**The hook** — Picture a pyramid of bricks; you start at the second-to-top layer and tap each brick downward until it sits firmly; the lower layers are already stable, so each tap travels only a short distance.

**What to overlearn** — lastNonLeaf = floor((n-2)/2); total cost sum h·n/2^h = O(n).

**Spaced-repetition schedule** — Review the summation identity at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Re-derive the geometric series bound by counting nodes per height and multiplying by height.

## 10. What this unlocks
Mastery of the linear-time heap construction immediately enables the optimal comparison-based sorting routine known as heapsort and supplies the priority-queue initialization step required by Dijkstra’s and Prim’s algorithms when the graph is given as an adjacency list.

- Heapsort worst-case O(n log n) sorting
- O(n) initialization of Dijkstra’s priority queue on dense graphs
- Efficient construction of Huffman coding trees
- Bottom-up treap and pairing-heap initialization primitives

## 11. Self-check — five questions, no answers
1. Compute the exact number of comparisons performed by Build-Heap on the array [2,1,3] (assume min-heap, 0-based indexing).

2. For n = 2^k − 1, write a closed-form expression for the total number of swaps executed in the worst case.

3. Explain why replacing the bottom-up loop with n successive insertions yields O(n log n) instead of O(n).

4. Identify the single line that must change if the heap is changed from min-heap to max-heap.

5. Suppose the input array already satisfies the heap property; prove that Build-Heap performs zero swaps.