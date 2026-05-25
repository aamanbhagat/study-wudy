## What it is
The bottom-up `build_heap` algorithm, often called "heapify," is a method for converting an arbitrary array of elements into a valid heap data structure in linear time, specifically $O(n)$. It achieves this by starting from the last non-leaf node and repeatedly applying a `sift_down` operation on each node, moving backwards up to the root. This ensures that every subtree satisfies the heap property by the time the process completes.

## Why it matters
This algorithm is the backbone of Heapsort, providing the crucial first step that makes the sort efficient. In physics simulations and graphics, priority queues (often implemented with heaps) are used to manage events; building the initial event queue from a set of starting conditions is an $O(n)$ operation thanks to this method. In aerospace, mission planning systems might use priority queues to schedule tasks, and an efficient build is critical when initializing the system with a large batch of tasks.

## When to study it
Before tackling this, you must have a solid understanding of these prerequisites:
1.  **Array-based Tree Representation:** How to represent a complete binary tree in an array, including calculating parent and child indices (e.g., parent of $i$ is $\lfloor(i-1)/2\rfloor$, children are $2i+1$ and $2i+2$).
2.  **Heap Property:** The definition of both a max-heap and a min-heap.
3.  **Sift-Down Operation:** The `sift_down` (or `heapify_down`) function, which takes a node that might violate the heap property and "sinks" it down the tree until its subtree is a valid heap. You should know its time complexity is $O(\log n)$ or, more precisely, $O(h)$ where $h$ is the height of the node.

If you are not confident with these, pause and review them. Attempting to learn the $O(n)$ build without them will lead to confusion.

## How to study it (step by step)
1.  **Review `sift_down`:** Write the `sift_down` function from scratch for a max-heap. Given an array `A` and an index `i`, your function should assume the left and right subtrees of `i` are already valid heaps, and it must make the tree rooted at `i` a valid heap. Test it on a few small examples.
2.  **Implement `build_heap`:** Write the `build_heap` function. It takes an array `A`. The core logic is a single `for` loop that starts from the index of the last parent node and iterates backwards to index 0. Inside the loop, it calls `sift_down` on the current index.
3.  **Trace the algorithm:** Take an array of about 10 elements, draw it as a complete binary tree, and manually trace your `build_heap` implementation. Redraw the tree after each call to `sift_down` completes. This is the most important step for building intuition.
4.  **Derive the Time Complexity:** Follow the mathematical proof for the $O(n)$ runtime. Do not just accept it. Write out the summation for the total work done and convince yourself that the sum converges to a value proportional to $n$.
5.  **Contrast with the Naive Method:** Consider the alternative way to build a heap: start with an empty heap and insert the $n$ elements one by one. Each insertion takes up to $O(\log n)$ time. Convince yourself why this method is $O(n \log n)$ and understand fundamentally why the bottom-up approach is faster.

## Key ideas, with intuition
1.  **Leaves are Trivial Heaps:** Any leaf node, by itself, is a valid heap. It has no children, so the heap property (parent is greater than/equal to children) is vacuously true. This means we don't need to do any work on the last half of the array's elements, as they all correspond to leaves.
2.  **Start with the Parents:** The algorithm starts at the parent of the very last element. This is the first node that *could* possibly violate the heap property. By calling `sift_down` on it, we guarantee its small subtree becomes a valid heap.
3.  **Invariants Build Success:** The algorithm works by establishing a powerful invariant. When we call `sift_down(i)`, we can *assume* that the subtrees rooted at the children of `i` are already valid heaps. Why? Because the loop iterates backwards from the last parent to the root. By the time we process node `i`, we have already processed all nodes that come after it in the array, which includes all of its descendants.
4.  **Most Work is Cheap:** The reason for the $O(n)$ complexity is that most nodes in a complete binary tree are near the bottom. Roughly half the nodes are leaves (height 0), a quarter are at height 1, an eighth at height 2, and so on. The cost of `sift_down` is proportional to the node's height. So we do a small amount of work ($O(1)$) on many nodes (the ones near the bottom) and a large amount of work ($O(\log n)$) on very few nodes (the root).

The total work $W$ can be expressed as a sum over the heights $h$ of the nodes:
$$ W = \sum_{h=0}^{\lfloor \log_2 n \rfloor} (\text{number of nodes at height } h) \times (\text{work per node}) $$
The number of nodes at height $h$ is at most $\lceil \frac{n}{2^{h+1}} \rceil$. The work for `sift_down` from height $h$ is $O(h)$.
$$ W \approx \sum_{h=0}^{\log n} \frac{n}{2^{h+1}} \cdot c \cdot h = \frac{cn}{2} \sum_{h=0}^{\log n} \frac{h}{2^h} $$
The infinite series $\sum_{k=0}^{\infty} kx^k = x/(1-x)^2$ for $|x|<1$. For $x=1/2$, this sum converges to a constant (2). Therefore, the total work $W$ is proportional to $n$, making it $O(n)$.

## Worked example
Let's build a max-heap from the array `A = [4, 1, 3, 2, 16, 9, 10]`.
The size of the array is $n=7$.

**Initial State:** The array represented as a tree.
```text
        4 (0)
       /   \
      1 (1) 3 (2)
     / \   / \
    2(3)16(4)9(5)10(6)
```
*(Indices are in parentheses)*

**Step 1: Find the starting point.**
The last element is at index 6. Its parent is at index $\lfloor(6-1)/2\rfloor = \lfloor 2.5 \rfloor = 2$.
So, we start our loop at index `i = 2`.

**Step 2: `sift_down(A, 2)`**
- Node at index 2 is `3`. Children are `9` (at 5) and `10` (at 6).
- `10` is the largest. Swap `3` and `10`.
- Array becomes: `[4, 1, 10, 2, 16, 9, 3]`
- The subtree rooted at index 2 is now a valid heap.

Tree state after `sift_down(2)`:
```text
        4 (0)
       /   \
      1 (1) 10(2)
     / \   / \
    2(3)16(4)9(5)3(6)
```

**Step 3: `sift_down(A, 1)`**
- Loop moves to `i = 1`. Node is `1`. Children are `2` (at 3) and `16` (at 4).
- `16` is the largest. Swap `1` and `16`.
- Array becomes: `[4, 16, 10, 2, 1, 9, 3]`
- The subtree rooted at index 1 is now a valid heap.

Tree state after `sift_down(1)`:
```text
        4 (0)
       /   \
      16(1) 10(2)
     / \   / \
    2(3)1(4) 9(5)3(6)
```

**Step 4: `sift_down(A, 0)`**
- Loop moves to `i = 0`. Node is `4`. Children are `16` (at 1) and `10` (at 2).
- `16` is the largest. Swap `4` and `16`.
- Array becomes: `[16, 4, 10, 2, 1, 9, 3]`
- The new node at index 1 is `4`. We must continue sifting down from this new position.
- Children of index 1 are `2` (at 3) and `1` (at 4). `4` is larger than both. No more swaps needed.
- The entire tree is now a valid max-heap.

**Final State:**
- Array: `[16, 4, 10, 2, 1, 9, 3]`
- Tree:
```text
        16(0)
       /   \
      4 (1) 10(2)
     / \   / \
    2(3)1(4) 9(5)3(6)
```

**Reflection:** Each step worked because of the invariant. When we called `sift_down(1)`, we could rely on the fact that the subtrees rooted at its children (indices 3 and 4) were already valid heaps (in this case, single-node heaps). When we called `sift_down(0)`, we knew the subtrees rooted at 1 and 2 were already valid heaps from the previous steps. This allows `sift_down` to do its job correctly.

## Diagrams
Here is the process from the worked example, showing the tree before and after the most significant `sift_down` call (on the root).

**Before `sift_down(0)`:**
(The subtrees rooted at index 1 and 2 are already valid max-heaps)
```text
        4 (0)      <-- Potential violation here
       /   \
      16(1) 10(2)    <-- This subtree is a valid heap
     / \   / \
    2(3)1(4) 9(5)3(6) <-- This subtree is a valid heap
```

**After `sift_down(0)`:**
(The value `4` is swapped with `16` and "sinks" down)
```text
        16(0)
       /   \
      4 (1) 10(2)    <-- 16 moved up, 4 moved down
     / \   / \
    2(3)1(4) 9(5)3(6) <-- 4 is checked against its new children (2, 1) and stops.
```

## Memory technique — remember this forever
1.  **The Mnemonic: "Parental Responsibility"**
    Think of building a heap like establishing order in a multi-generational family tree. You don't start with the great-grandparents (the root). You start with the youngest parents, the ones who only have kids (leaves). You teach them to be responsible (`sift_down`). Once they are, you move up to the grandparents. They only have to manage their children, who you *already know* are responsible parents. This continues until you reach the patriarch/matriarch at the root, making the whole family tree orderly. **Bottom-up, starting with the lowest parents.**

2.  **Must-Know Facts:**
    *   Start index: `floor((n-1)/2) - 1` or just `floor(n/2) - 1`. The last parent.
    *   Loop direction: `for i from last_parent down to 0`.
    *   Complexity: `build_heap` is $O(n)$. `sift_down` is $O(\log n)$.

3.  **Spaced Repetition Schedule:**
    Review this material (especially the complexity derivation and the "Parental Responsibility" idea) at these intervals:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:**
    If you forget the $O(n)$ proof, rebuild it.
    *   How many nodes are in a complete binary tree? $n$.
    *   Where are most of them? At the bottom. About $n/2$ are leaves. About $n/4$ are one level up.
    *   What's the work to `sift_down` a node? Proportional to its height, $h$.
    *   Write the sum of (nodes at height $h$) * (work at height $h$) for all $h$.
    *   $W \approx \sum (\frac{n}{2^{h+1}}) \cdot h$.
    *   Recognize this as a converging geometric series. The total work must be linear, $O(n)$.

## Common mistakes
1.  **Starting at the wrong place:** Students often start the loop at `n-1` (the last element) or `0` (the root). You must start at the last *parent* node, otherwise the logic fails.
2.  **Looping in the wrong direction:** Looping from `0` to `last_parent` is incorrect. This violates the invariant that a node's children must already be heaps before you process the node itself. You must go backwards, from `last_parent` down to `0`.
3.  **Confusing `build_heap` with repeated insertions:** Remembering that there are two ways to build a heap but mixing them up. `build_heap` is bottom-up, $O(n)$. Repeatedly calling `insert` (which uses `sift_up`) is top-down, $O(n \log n)$.
4.  **"One and done" sifting:** In `sift_down`, after swapping a parent with a child, forgetting that the swapped element might need to be sifted down *further* in its new position. `sift_down` must be recursive or iterative until the element finds its correct place.

## Self-check
1.  Given the array `A = [27, 17, 3, 16, 13, 10, 1, 5, 7, 12, 4, 8, 9, 0]`, draw the initial tree and trace the bottom-up `build_heap` algorithm to convert it into a max-heap. Show the state of the array after each call to `sift_down`.
2.  Explain, in your own words, why the algorithm can completely ignore the elements from index $\lfloor n/2 \rfloor$ to $n-1$. What property do these elements/nodes have?
3.  How would you modify the `sift_down` logic and the overall `build_heap` algorithm to create a min-heap instead of a max-heap? What is the time complexity of building a min-heap this way?