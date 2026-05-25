## What it is
A segment tree is a binary tree data structure used for storing information about intervals or segments of an array. Each node in the tree represents an interval, and its value is an aggregate (like sum, min, or max) of the elements in that interval. This structure allows for efficient range queries and point updates.

## Why it matters
Segment trees are fundamental in competitive programming and computational geometry. In physics and aerospace, they (and their multi-dimensional cousins, quadtrees/octrees) can accelerate simulations by efficiently querying spatial regions. For example, in an N-body gravitational simulation, you could use an octree to quickly calculate the total mass in a distant region of space and approximate its gravitational effect as a single point mass, drastically reducing computation.

## When to study it
Before tackling segment trees, you must have a solid understanding of these prerequisites:
1.  **Arrays:** Basic indexing and manipulation.
2.  **Binary Trees:** Terminology (root, node, leaf, child), properties, and traversals.
3.  **Recursion:** The concept of a base case and a recursive step. Segment tree operations are almost always implemented recursively.
4.  **Divide and Conquer:** The paradigm of breaking a problem into smaller subproblems, solving them, and combining the results.

If you are not comfortable with recursion, master it first. The logic of segment trees depends entirely upon it.

## How to study it (step by step)
1.  **Draw it:** Take a small array, e.g., `A = [2, 5, 1, 4, 9, 3]`, and draw the complete segment tree for range sums on paper. Label each node with the range it covers (e.g., `[0, 5]`) and the sum of that range.
2.  **Implement `build`:** Write the code for the `build` function. It's a recursive function that computes the value of a node by recursively building its left and right children and then combining their values. Test it by printing the resulting tree array.
3.  **Trace `query`:** On your drawing, trace the path for a query like `sum(1, 4)`. Identify which nodes are fully contained in the query range, partially contained, and not contained at all. This will build your intuition for the query logic.
4.  **Implement `query`:** Write the recursive `query` function. It will have three cases based on the overlap between the query range and the node's range.
5.  **Trace `update`:** On your drawing, trace a point update, e.g., changing `A[2]` to `6`. Follow the path from the leaf node corresponding to index `2` up to the root, recalculating the sums of all affected parent nodes.
6.  **Implement `update`:** Write the recursive `update` function. It will find the leaf corresponding to the index and update its value, then recursively update the values of its ancestors on the way back up the call stack.
7.  **Analyze Complexity:** Derive the time complexity for `build`, `query`, and `update`. Hint: The height of the tree is the dominant factor for query and update.

## Key ideas, with intuition
1.  **Hierarchical Decomposition:** The core idea is to pre-compute aggregates for intervals of an array. The root represents the entire array `[0, n-1]`. A node representing range `[L, R]` has a left child for `[L, M]` and a right child for `[M+1, R]`, where `M = (L+R)/2`. This creates a hierarchy of intervals.

2.  **Array Representation:** A segment tree is a complete binary tree, so it can be stored efficiently in an array. If a node is at index `i`, its left child is at `2*i + 1` and its right child is at `2*i + 2`. This avoids pointers and improves cache performance. The size of this array must be approximately $4n$ to be safe, as a tree for $n$ elements can have up to $2n-1$ nodes, and the array mapping can leave gaps.

3.  **The Three Cases of Querying:** The efficiency of a range query `[qL, qR]` comes from how it interacts with a node's range `[L, R]`.
    *   **Total Overlap:** The node's range is completely inside the query range (`qL <= L` and `R <= qR`). We can use the pre-computed value at this node directly and stop recursing further down this path.
        $$[L, R] \subseteq [qL, qR]$$
    *   **No Overlap:** The node's range is completely outside the query range (`R < qL` or `L > qR`). This path is irrelevant to the query. We return an identity element (e.g., $0$ for sum, $\infty$ for min) and stop recursing.
        $$[L, R] \cap [qL, qR] = \emptyset$$
    *   **Partial Overlap:** The two ranges partially intersect. We can't make a decision at this node, so we must ask its children. We recurse on both the left and right children and combine their results.

## Worked example
Let's use the array $A = [1, 3, -2, 8, -7]$ and build a segment tree for range sums. The original array has $n=5$ elements.

**1. Build**
The tree is built recursively from the bottom up. The root is at index 0 in our tree array `st`.
- `build(A, st, 0, 0, 4)`: Builds the tree for range `[0, 4]` at tree index `0`.
    - `mid = 2`.
    - Recurses left: `build(A, st, 1, 0, 2)` for range `[0, 2]` at tree index `1`.
    - Recurses right: `build(A, st, 2, 3, 4)` for range `[3, 4]` at tree index `2`.
    - After children return, `st[0] = st[1] + st[2]`.
This process continues until we reach the leaves, which correspond to single elements of $A$. The final tree (represented as an array) will store the sums. See the diagram below for the final state.

**2. Range Sum Query for `[1, 3]`**
We want to find $\sum_{i=1}^{3} A[i] = 3 + (-2) + 8 = 9$.
- `query(node=0, range=[0, 4], queryRange=[1, 3])`: Partial overlap. Recurse.
    - `query(node=1, range=[0, 2], queryRange=[1, 3])`: Partial overlap. Recurse.
        - `query(node=3, range=[0, 1], queryRange=[1, 3])`: Partial overlap. Recurse.
            - `query(node=7, range=[0, 0], queryRange=[1, 3])`: No overlap. Return 0.
            - `query(node=8, range=[1, 1], queryRange=[1, 3])`: **Total overlap**. Return `st[8]` which is `A[1] = 3`.
        - Result from `node=3` is $0+3=3$.
        - `query(node=4, range=[2, 2], queryRange=[1, 3])`: **Total overlap**. Return `st[4]` which is `A[2] = -2`.
    - Result from `node=1` is $3 + (-2) = 1$.
    - `query(node=2, range=[3, 4], queryRange=[1, 3])`: Partial overlap. Recurse.
        - `query(node=5, range=[3, 3], queryRange=[1, 3])`: **Total overlap**. Return `st[5]` which is `A[3] = 8`.
        - `query(node=6, range=[4, 4], queryRange=[1, 3])`: No overlap. Return 0.
    - Result from `node=2` is $8+0=8$.
- Final result from `node=0` is $1 + 8 = 9$.

*Reflection:* The query intelligently broke the range `[1, 3]` into constituent segments `[1, 1]`, `[2, 2]`, and `[3, 3]`. In a larger tree, it would have used larger pre-computed segments, which is where the efficiency comes from.

**3. Point Update `A[2] = 5`**
We need to update the value at index 2 and propagate the change up to the root.
- `update(node=0, range=[0, 4], idx=2, val=5)`: `idx=2` is in `[0, 4]`. Recurse. `mid=2`. `idx <= mid`, so go left.
    - `update(node=1, range=[0, 2], idx=2, val=5)`: `idx=2` is in `[0, 2]`. Recurse. `mid=1`. `idx > mid`, so go right.
        - `update(node=4, range=[2, 2], idx=2, val=5)`: Base case. `L==R==idx`. Update `st[4] = 5`. Return.
    - Back at `node=1`, recalculate its value: `st[1] = st[3] + st[4]`. `st[3]` (range `[0,1]`) is unchanged (value 4). `st[4]` is now 5. So, `st[1]` becomes $4+5=9$. Return.
- Back at `node=0`, recalculate its value: `st[0] = st[1] + st[2]`. `st[1]` is now 9. `st[2]` (range `[3,4]`) is unchanged (value 1). So, `st[0]` becomes $9+1=10$.

*Reflection:* The update only travels along one path from the leaf to the root, a path of length $O(\log n)$, which is highly efficient.

## Diagrams
```text
Array A = [1, 3, -2, 8, -7]

Segment Tree for Range Sum:
Each node shows: tree_idx:[L, R] = sum

                           0:[0,4]=3
                 ____________|____________
                |                         |
            1:[0,2]=2                 2:[3,4]=1
        ______|______               ______|______
       |             |             |             |
    3:[0,1]=4     4:[2,2]=-2    5:[3,3]=8     6:[4,4]=-7
    ___|___
   |       |
7:[0,0]=1 8:[1,1]=3

```

## Memory technique — remember this forever
1.  **Visual Hook:** Think of the segment tree as a **tournament bracket**. The leaves are the players (array elements). Each match (an internal node) combines the results of the two players/sub-brackets below it. A range query is like asking for the combined score of a specific group of players, and the tree lets you grab pre-calculated sub-group scores instead of adding up individuals every time.

2.  **Must-Overlearn Formulas:** (Using 0-based indexing for the tree array)
    *   Left Child of node `i`: `2*i + 1`
    *   Right Child of node `i`: `2*i + 2`
    *   Midpoint calculation: `int mid = L + (R - L) / 2;` (This avoids potential integer overflow vs. `(L+R)/2`).

3.  **Spaced Repetition Schedule:**
    *   Review & re-implement from scratch in: **1 day**.
    *   Then: **3 days**.
    *   Then: **7 days**.
    *   Then: **16 days**.
    *   Then: **35 days**.

4.  **First Principles Pathway:** If you forget everything, rebuild from this:
    *   "I need to answer range queries efficiently."
    *   "What if I pre-calculate answers? Storing all $O(n^2)$ ranges is too much."
    *   "Let's use divide and conquer. Split the array in half. The sum of the whole is the sum of the halves."
    *   "This sounds like a binary tree. Root is the whole array, children are the halves."
    *   From this tree structure, you can re-derive the build, query (3 cases), and update logic. The array representation `2i+1, 2i+2` is just a standard way to implement a complete binary tree.

## Common mistakes
1.  **Off-by-one errors in ranges:** Confusing `[L, R]` inclusive ranges with exclusive ranges, or mixing up the query range `[qL, qR]` with the node's current range `[start, end]`. Be meticulous with your boundary conditions.
2.  **Insufficient tree array size:** Allocating an array of size $2n$ for the tree. The depth of the tree can be $\lceil \log_2 n \rceil$, and the array representation requires space for a full tree of that depth, which can be up to $2^{\lceil \log_2 n \rceil+1} - 1$. A safe, easy-to-remember upper bound is $4n$.
3.  **Incorrect identity element in query:** For a sum query, if a node has no overlap with the query range, you must return 0. If it were a min query, you'd have to return $+\infty$. Returning the wrong value will corrupt the entire query result.
4.  **Mixing array indices and tree indices:** The original array `A` is indexed by `0...n-1`. The segment tree array `st` is indexed differently. Keep your variables straight, e.g., `idx` for the position in `A` and `tree_idx` or `node` for the position in `st`.

## Self-check
1.  For an array of $n=1,000,000$ elements, what is the approximate height of the corresponding segment tree? What is the time complexity of a single range query and a single point update?
2.  You are given a segment tree built for range sums. How would you modify the `build`, `query`, and `update` logic to handle range *minimum* queries instead? What is the identity element for the minimum operation?
3.  Consider an array of booleans (0s and 1s). You need to support two operations: flip a bit at a given index, and find the index of the $k^{th}$ one in the array. How could a segment tree be used to solve the second operation efficiently? What value would you store in each node?