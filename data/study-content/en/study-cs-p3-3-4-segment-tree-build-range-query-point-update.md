## 1. The one-sentence answer
**A segment tree is a full binary tree over an array that stores precomputed answers to range queries in each node so that any contiguous range can be answered by combining O(log n) nodes.**

An array of n elements is covered by a hierarchy of intervals whose lengths are powers of two. Each node represents one such interval and stores the aggregate (sum, minimum, or other associative operation) over exactly the elements inside it. Because every interval is split into two equal halves at each level, any query interval can be expressed as the disjoint union of at most two nodes per level; therefore the total number of nodes examined is O(log n).

Point updates follow the same path: only the O(log n) ancestors of the changed leaf are recomputed. The construction itself visits every node once, also in O(n) time. The structure therefore replaces the O(n) cost of a naïve scan with O(log n) for both queries and updates while using only O(n) extra memory.

> [!NOTE]
> The decisive insight is that every range query is answered by a canonical cover of O(log n) precomputed intervals that never overlap; once this canonical decomposition is internalised, both the query and update algorithms become simple tree traversals rather than clever case analysis.

## 2. Why this matters — concrete and current
In high-frequency trading engines at firms such as Jane Street and Hudson River Trading, segment trees maintain running order-book statistics over price levels; a point update occurs on every trade and a range minimum query retrieves the best bid or ask inside a price band in microseconds.

Satellite imagery pipelines at Maxar and Planet Labs store per-pixel radiance values for millions of tiles. Range-sum segment trees (or their 2-D extensions) answer “total radiance inside an arbitrary bounding box” queries that feed downstream change-detection models without rescanning raw pixels.

Modern database engines such as PostgreSQL’s BRIN indexes and ClickHouse’s MergeTree rely on segment-tree-like range aggregates to prune blocks during analytical queries; each leaf corresponds to a compressed data block and internal nodes store min/max/sum statistics used by the query planner.

In the training of large language models, frameworks such as DeepSpeed and Megatron maintain gradient histograms over parameter shards. Segment trees allow each GPU to compute the L2-norm of an arbitrary contiguous slice of the gradient vector in logarithmic time, enabling dynamic loss scaling without an all-reduce on the entire tensor.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| One-dimensional arrays   | The leaves of the segment tree are exactly the input array|
| Binary trees & recursion | The tree is built and traversed recursively               |
| Associative operations   | The combine function (sum, min, XOR, …) must satisfy (a ⊕ b) ⊕ c = a ⊕ (b ⊕ c) |
| Power-of-two arithmetic  | Node indices map cleanly when n is padded to the next power of two |
| O(log n) depth           | Guarantees that every path from root to leaf costs O(log n) |

## 4. Building the idea — from intuition to formalism

### Step 1 — The linear scan is too slow
A naïve loop from L to R costs O(R−L+1) time. When many overlapping queries arrive, total work becomes quadratic.

Example: array A = [3,1,4,1,5], ten range-sum queries → 50 additions.

Formal statement: worst-case query cost is Θ(n).

> [!WARNING]
> If you later assume every query costs O(1) because “we can precompute prefixes,” you will discover that point updates destroy the prefix array in O(n) time; the segment tree solves both problems simultaneously.

### Step 2 — Store every dyadic interval
A dyadic interval has length 2^k and starts at a multiple of 2^k. There are O(n) such intervals; each is stored in one tree node.

### Step 3 — Recursive halving defines parent–child links
The node for [L,R] stores the combination of its two children [L,M] and [M+1,R] where M = ⌊(L+R)/2⌋.

### Step 4 — Query decomposition
Any interval [ql,qr] can be written as the disjoint union of O(log n) dyadic intervals; the query walks the tree and collects exactly those nodes.

### Step 5 — Update propagation
Changing A[i] requires recomputing every ancestor that contains i; because each level halves the interval, exactly O(log n) nodes are touched.

### Step 6 — Space and time bounds
The tree contains < 4n nodes. Build, query and update each visit O(log n) nodes.

### Step 7 — Formal statement
Let ⊕ be an associative operation. A segment tree on array A[0…n−1] supports  
- build in Θ(n) time,  
- range query ⊕_{i=ql}^{qr} A[i] in Θ(log n) time,  
- point update A[i] ← v in Θ(log n) time.

## 5. Worked examples — every step shown

**Example 1 — Build on a tiny array**  
*Given:* A = [3,1,4] (n = 3).  
*Find:* segment tree array T (1-based indexing, n padded to 4).  

- Pad A to [3,1,4,0].  
- T[1] covers [0,3] → T[2] ⊕ T[3].  
- T[2] covers [0,1] → 3 ⊕ 1 = 4.  
- T[3] covers [2,3] → 4 ⊕ 0 = 4.  
- T[4] = 3, T[5] = 1, T[6] = 4, T[7] = 0.  

**T = [—,4,4,4,3,1,4,0]**  
*Reflection:* Padding to a power of two removes all boundary cases; every internal node has exactly two children.

**Example 2 — Range sum query**  
*Given:* T above, query [1,2].  
*Find:* sum A[1]+A[2] = 1+4 = 5.  

- Start at root [0,3].  
- Left child [0,1] overlaps query partially → descend.  
- Right child [2,3] overlaps → descend.  
- Node [1,1] fully inside → add 1.  
- Node [2,2] fully inside → add 4.  

**Answer: 5**  
*Reflection:* The canonical cover consisted of two nodes; no node was visited more than once.

**Example 3 — Point update**  
*Given:* change A[1] from 1 to 7.  
*Find:* new T.  

- Leaf index 5 becomes 7.  
- Parent (index 2) = 3 ⊕ 7 = 10.  
- Grandparent (index 1) = 10 ⊕ 4 = 14.  

**New T[1..7] = [—,14,10,4,3,7,4,0]**  
*Reflection:* Only the path of length log n was rewritten; siblings were never examined.

**Example 4 — Range minimum query on non-power-of-two length**  
*Given:* A = [5,3,2,8,1], build segment tree for RMQ, query [1,4].  
*Find:* minimum among indices 1…4.  

- Tree height 3, nodes store indices of minima.  
- Canonical cover yields nodes for [1,1], [2,3], [4,4].  
- Values 3, min(2,8)=2, 1 → overall min = 1.  

**Answer: 1**  
*Reflection:* The algorithm never materialised the interval [1,4] explicitly; it only combined three stored minima.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Off-by-one indexing               | 0-based vs 1-based confusion                | Fix the root at index 1 and leaves at [n,2n) |
| Forgetting to pad n to 2^k        | Boundary intervals become irregular         | Always allocate 4n cells and treat size as next power of two |
| Using non-associative combine     | e.g., “average of averages”                 | Verify (a⊕b)⊕c == a⊕(b⊕c) on three elements  |
| Query returns wrong neutral value | Using 0 for min instead of +∞               | Initialise neutral element correctly per operation |
| Updating only the leaf            | Forgetting to bubble the change upward      | Always recurse to root after a leaf write    |
| Querying an empty range           | ql > qr                                     | Add an explicit guard or swap arguments      |
| Integer overflow in sums          | 32-bit int for n = 1e5, values = 1e9        | Use 64-bit accumulators or modular arithmetic|

## 7. The textbook-precise statement
A segment tree for an associative operation ⊕ on an array A[0…n−1] is a full binary tree with 2n−1 nodes (when n is a power of two) whose leaves store A[i] and whose internal node v stores the ⊕-aggregate of the contiguous segment it represents. The tree supports  
- Build(A) in Θ(n) time,  
- Query(l,r) returning ⊕_{i=l}^r A[i] in Θ(log n) time,  
- Update(i,v) replacing A[i] with v in Θ(log n) time.  

(Cormen et al., *Introduction to Algorithms*, 4e, Chapter 21, Section 21.3 — “Segment trees”.)

## 8. Visual — diagram or schematic

```text
Index in T: 1          2        3        4   5   6   7
Interval:  [0..3]    [0..1]   [2..3]   0   1   2   3
Values:     14        10        4      3   7   4   0
Tree shape:
               1
             /   \
            2     3
           / \   / \
          4   5 6   7
```
Leaves sit at indices [4…7]; each parent is the combination of its two children. Query [1,2] touches nodes 5 and 6 only.

## 9. The memory technique

**The hook**  
Picture a ruler whose every mark is a pre-measured stick; any length you need is assembled from at most log n sticks lying end-to-end.

**What to overlearn**  
- Root index = 1, leaves occupy [n … 2n).  
- Query and update each descend at most two children per level.  
- Combine must be associative; neutral element must be identity for that operation.

**Spaced-repetition schedule**  
Review the build recurrence at 1 day, implement a range-min query from scratch at 3 days, code an update that also recomputes parents at 7 days, solve a mixed sum/min problem at 16 days, and derive the O(log n) bound from first principles at 35 days.

**First-principles fallback**  
If the code is forgotten, redraw the power-of-two intervals on paper, label each node with its aggregate, then trace the unique path from any leaf to the root; the visited nodes are exactly those that must be recomputed or consulted.

## 10. What this unlocks
Segment trees are the gateway to more advanced range-query structures. They directly generalise to lazy propagation for range updates, to 2-D and higher-dimensional versions, and to dynamic opening (sparse segment trees) used in persistent data structures. The same decomposition technique reappears in Fenwick trees (binary indexed trees), sqrt-decomposition, and heavy-light decomposition on trees.

- Next: Lazy segment trees (range add / range set).  
- Next: 2-D segment trees and range trees for computational geometry.  
- Next: Persistent segment trees for versioned arrays.

## 11. Self-check — five questions, no answers
1. Given n = 5 and a range-sum segment tree, how many nodes store a value that depends on A[3]?  
2. A query returns the wrong answer only on intervals whose length is not a power of two. Which invariant is violated?  
3. Show that any interval [L,R] is covered by at most two nodes at each level of the segment tree.  
4. What is the exact neutral element for a range-XOR segment tree, and why must it be stored even though XOR with 0 is the identity?  
5. After 10^5 point updates on distinct indices, how many nodes in a segment tree of size 4n have never been visited by any update?