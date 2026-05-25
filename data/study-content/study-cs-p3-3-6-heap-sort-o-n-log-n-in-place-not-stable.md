## 1. What it is — in plain English

Imagine you have a big, messy pile of items – maybe toys, books, or numbers – and you want to sort them from smallest to largest. Heap Sort is like a clever two-step process to do this.

First, it takes your messy pile and organizes it into a special kind of "pyramid" structure, called a **heap**. This pyramid isn't just any pyramid; it's built so that the *most important* item (the largest, in our case) is always right at the very top. And the rest of the pyramid is arranged such that any parent item is always "more important" (larger) than its children items below it.

Once you have this perfectly organized pyramid, the sorting becomes easy. You simply take the largest item off the top, put it aside (it's now sorted!), and then reorganize the remaining items into a new, slightly smaller pyramid. You repeat this process – take the top, reorganize – until your entire pile is empty. What you're left with is all your items neatly sorted from smallest to largest.

The amazing thing about Heap Sort is that it's quite efficient, especially for large piles of items. It also does its work "in-place," meaning it sorts the items right where they are without needing a lot of extra space to temporarily hold other items.

## 2. Why it matters — real-world applications

Heap Sort, and the underlying heap data structure, are fundamental in computer science due to their efficiency and specific properties. Here are some real-world applications:

1.  **Operating System Task Scheduling:** Modern operating systems often manage many processes (tasks) simultaneously. A **priority queue**, frequently implemented using a heap, is used to schedule these tasks. High-priority tasks (like user input or critical system processes) are given precedence over lower-priority ones. When a CPU core becomes available, the operating system uses the heap to quickly extract the highest-priority task to run next.
2.  **Network Packet Routing:** In computer networks, data is broken into packets. Routers need to forward these packets efficiently. Sometimes, packets are assigned priorities (e.g., real-time video streaming might have higher priority than a large file download). A priority queue (heap) can be used to manage outgoing packets, ensuring that high-priority packets are sent first, reducing latency for critical applications.
3.  **Graph Algorithms (e.g., Dijkstra's, Prim's):** Many important algorithms that operate on graphs (like finding the shortest path between two points in a navigation system, or finding the minimum spanning tree to connect cities with fiber optics) rely heavily on efficiently extracting the "minimum" or "maximum" edge or vertex from a set of possibilities. Priority queues, implemented with heaps, provide this efficiency, allowing these algorithms to run in optimal time. For instance, in a flight path optimization system, Dijkstra's algorithm might use a min-heap to always select the next shortest flight segment.
4.  **"Top K" Problems:** Imagine you have a massive dataset, say, all the tweets ever posted, and you want to find the 100 most retweeted tweets in the last hour. Or in scientific computing, finding the top 1% of data points that exceed a certain threshold. Heaps are incredibly efficient for this. You can maintain a min-heap of size K, iterating through the data and replacing the smallest element in your heap if you find a larger one. This gives you the K largest elements without fully sorting the entire massive dataset.
5.  **Event-Driven Simulations:** In complex simulations (e.g., climate modeling, particle physics, financial market simulations, or even video games), events occur at different times. A heap can be used as an "event queue" to always extract the next event that is scheduled to happen earliest, ensuring the simulation progresses chronologically and efficiently.

## 3. Prerequisites — what you must know first

Before diving deep into Heap Sort, ensure you have a solid grasp of these fundamental concepts:

*   **Arrays:** A basic linear data structure that stores elements at contiguous memory locations, accessible by an index.
*   **Trees:** A non-linear data structure where data items are organized in a hierarchical manner, with a root value and subtrees of children.
*   **Binary Trees:** A specific type of tree where each node has at most two children, typically referred to as the left child and the right child.
*   **Complete Binary Trees:** A binary tree in which all levels are completely filled, except possibly the last level, which is filled from left to right. This property is crucial for efficient array representation of heaps.
*   **Binary Heaps:** The core data structure used by Heap Sort. A binary heap is a complete binary tree that satisfies the **heap property** (either a max-heap where every parent is greater than or equal to its children, or a min-heap where every parent is less than or equal to its children).
*   **Logarithms:** Understanding what $\log n$ means, especially in the context of tree heights and recursive divisions.
*   **Big O Notation:** A mathematical notation used to describe the limiting behavior of a function when the argument tends towards a particular value or infinity, primarily used to classify algorithms by their time and space complexity.
*   **Recursion:** A programming technique where a function calls itself, often used in tree traversals and for operations like `heapify`.

## 4. The core idea — step by step

Heap Sort works by leveraging the properties of a binary heap. It's essentially a two-phase algorithm: first, it builds a max-heap from the input array, and then it repeatedly extracts the maximum element from the heap (which is always at the root) and places it at the end of the array, effectively sorting it.

Let's break down the core ideas. We'll assume a 0-indexed array for our examples, which is common in programming, but we'll also mention the 1-indexed formulas often seen in textbooks.

### Step 1: Understanding the Max-Heap Data Structure

The foundation of Heap Sort is the **Max-Heap**.
A Max-Heap is a binary tree that satisfies two crucial properties:

1.  **Shape Property (Completeness):** It's a **complete binary tree**. This means all levels are fully filled, except possibly the last level, which is filled from left to right. This property allows us to represent the heap efficiently using a simple array.
2.  **Heap Property (Ordering):** For every node `i` other than the root, the value of `i` is less than or equal to the value of its parent. In a Max-Heap, this means the largest element is always at the root.

**Plain-English Statement:** Imagine your unsorted list of numbers. We're going to treat this list as if it were a tree, arranged level by level. The first number is the root, the next two are its children, the next four are *their* children, and so on. The "heap property" means that any number in this tree is always bigger than its direct children.

**Concrete Example:**
Consider an array `A = [4, 10, 3, 5, 1]`.
As a complete binary tree (conceptually):
```
      4 (index 0)
     / \
    10 (1) 3 (2)
   / \
  5 (3) 1 (4)
```
This is *not* a Max-Heap yet because `4` (root) is not greater than `10` (its left child).

**Formal/Mathematical Version:**
For a 0-indexed array `A` of size `n`:
*   The root is at index 0.
*   For any node `i`:
    *   Its left child is at index $2i + 1$.
    *   Its right child is at index $2i + 2$.
    *   Its parent is at index $\lfloor (i - 1) / 2 \rfloor$.
*   The Max-Heap property states: $A[i] \ge A[2i+1]$ (if $2i+1 < n$) and $A[i] \ge A[2i+2]$ (if $2i+2 < n$).

For a 1-indexed array `A` of size `n` (as often used in textbooks like CLRS):
*   The root is at index 1.
*   For any node `i`:
    *   Its left child is at index $2i$.
    *   Its right child is at index $2i + 1$.
    *   Its parent is at index $\lfloor i / 2 \rfloor$.
*   The Max-Heap property states: $A[i] \ge A[2i]$ (if $2i \le n$) and $A[i] \ge A[2i+1]$ (if $2i+1 \le n$).

**What could go wrong:** Miscalculating parent/child indices is a common source of errors, especially when switching between 0-indexed and 1-indexed conventions. Always be consistent.

### Step 2: The `heapify` Operation (Maintaining the Heap Property)

The `heapify` operation is the workhorse of Heap Sort. Its job is to ensure that a subtree rooted at a given index `i` satisfies the max-heap property, *assuming its children's subtrees are already max-heaps*. If the element at `i` is smaller than one of its children, `heapify` swaps it with the largest child and then recursively calls itself on the affected child's subtree.

**Plain-English Statement:** Imagine a small section of your pyramid where the top item is smaller than one of its immediate children. This breaks our "parent is always bigger" rule. `heapify` fixes this: it finds the biggest among the parent and its children, puts that biggest one on top, and if a swap happened, it then checks the part of the pyramid where the swapped item moved to, to make sure *that* section is still okay. It keeps doing this down the pyramid until everything is in order in that specific branch.

**Concrete Example:**
Let `A = [1, 10, 3, 5, 1]` and we want to `heapify` the root (index 0).
Current state: `1` is at index 0. Its children are `10` (index 1) and `3` (index 2).
`1` is smaller than `10`. So, swap `1` and `10`.
Array becomes `[10, 1, 3, 5, 1]`.
Now, the `1` (original root) is at index 1. We need to `heapify` the subtree rooted at index 1.
Children of `1` (at index 1) are `5` (index 3) and `1` (index 4).
`1` is smaller than `5`. So, swap `1` and `5`.
Array becomes `[10, 5, 3, 1, 1]`.
Now, the `1` (original root) is at index 3. It has no children (or its children are outside the heap boundaries). So, we stop.
The subtree rooted at index 0 is now a max-heap.

**Formal/Mathematical Version:**
`MAX-HEAPIFY(A, i, heap_size)`:
1.  `left = 2i + 1`
2.  `right = 2i + 2`
3.  `largest = i`
4.  If `left < heap_size` and `A[left] > A[largest]`, then `largest = left`.
5.  If `right < heap_size` and `A[right] > A[largest]`, then `largest = right`.
6.  If `largest != i`:
    *   Swap `A[i]` and `A[largest]`.
    *   Call `MAX-HEAPIFY(A, largest, heap_size)`.

**What could go wrong:** Forgetting the `heap_size` parameter, which is crucial during the sorting phase. Not recursively calling `MAX-HEAPIFY` after a swap means the heap property might still be violated further down the tree.

### Step 3: Building a Max-Heap from an Unsorted Array

This phase transforms an arbitrary input array into a max-heap. It does this by repeatedly calling `heapify` on all non-leaf nodes, starting from the last non-leaf node and working upwards to the root.

**Plain-English Statement:** We have our messy pile of numbers in an array. We know that all the very last items in the array (the "leaves" of our conceptual tree) are already tiny heaps of one item. So, we start from the item just before these leaves, and we `heapify` it. Then we move one item up, `heapify` it, and so on, all the way to the very first item (the root). By the time we reach the root and `heapify` it, the entire array will be a perfectly ordered max-heap.

**Concrete Example:**
Let `A = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]` (length `n = 10`).
The last non-leaf node is at index $\lfloor (n/2) - 1 \rfloor = \lfloor (10/2) - 1 \rfloor = \lfloor 5 - 1 \rfloor = 4$. So we start `heapify` from index 4.

*   `i = 4`: `A[4] = 16`. Children are at `2*4+1 = 9` (`A[9]=7`) and `2*4+2 = 10` (out of bounds). `16` is greater than `7`. No swap. `A = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]`
*   `i = 3`: `A[3] = 2`. Children are `A[7]=14`, `A[8]=8`. Largest is `14`. Swap `A[3]` and `A[7]`. `A = [4, 1, 3, 14, 16, 9, 10, 2, 8, 7]`. Recursive `heapify` on index 7 (new position of 2). `A[7]=2` has no children.
*   `i = 2`: `A[2] = 3`. Children are `A[5]=9`, `A[6]=10`. Largest is `10`. Swap `A[2]` and `A[6]`. `A = [4, 1, 10, 14, 16, 9, 3, 2, 8, 7]`. Recursive `heapify` on index 6 (new position of 3). `A[6]=3` has no children.
*   `i = 1`: `A[1] = 1`. Children are `A[3]=14`, `A[4]=16`. Largest is `16`. Swap `A[1]` and `A[4]`. `A = [4, 16, 10, 14, 1, 9, 3, 2, 8, 7]`. Recursive `heapify` on index 4 (new position of 1). `A[4]=1`. Children `A[9]=7` (no right child). `1` is smaller than `7`. Swap `A[4]` and `A[9]`. `A = [4, 16, 10, 14, 7, 9, 3, 2, 8, 1]`. Recursive `heapify` on index 9 (new position of 1). `A[9]=1` has no children.
*   `i = 0`: `A[0] = 4`. Children are `A[1]=16`, `A[2]=10`. Largest is `16`. Swap `A[0]` and `A[1]`. `A = [16, 4, 10, 14, 7, 9, 3, 2, 8, 1]`. Recursive `heapify` on index 1 (new position of 4). `A[1]=4`. Children `A[3]=14`, `A[4]=7`. Largest is `14`. Swap `A[1]` and `A[3]`. `A = [16, 14, 10, 4, 7, 9, 3, 2, 8, 1]`. Recursive `heapify` on index 3 (new position of 4). `A[3]=4`. Children `A[7]=2`, `A[8]=8`. Largest is `8`. Swap `A[3]` and `A[8]`. `A = [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]`. Recursive `heapify` on index 8 (new position of 4). `A[8]=4` has no children.

Finally, `A = [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]` is a max-heap.

**Formal/Mathematical Version:**
`BUILD-MAX-HEAP(A)`:
1.  `n = length(A)`
2.  For `i = floor(n/2) - 1` down to `0`:
    *   `MAX-HEAPIFY(A, i, n)`

**What could go wrong:** Starting `heapify` from the wrong index (e.g., from `n-1` instead of `floor(n/2) - 1`). Leaf nodes don't need to be `heapify`'d because they are already trivial heaps.

### Step 4: Sorting (Extracting Elements)

Once the array is a max-heap, the largest element is at the root (`A[0]`). We swap this largest element with the last element in the heap, effectively moving the largest element to its correct sorted position. Then, we reduce the heap size by one and call `heapify` on the new root (index 0) to restore the heap property for the remaining elements. We repeat this process until the heap size becomes 1.

**Plain-English Statement:** Now that our array is a perfect max-heap (biggest item at the top), we take that biggest item and swap it with the very last item in our unsorted portion of the array. The biggest item is now in its final, sorted place. We then pretend the array is one item smaller and fix the heap property at the top (where we just put a potentially small item) using `heapify`. We keep doing this: take the top, swap with the last unsorted, shrink the heap, fix the heap. Eventually, all items will be in their correct sorted positions.

**Concrete Example:**
Starting with our max-heap `A = [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]` (heap_size = 10).

1.  **Swap `A[0]` (16) with `A[9]` (1).**
    `A = [1, 14, 10, 8, 7, 9, 3, 2, 4, 16]`
    Heap size becomes 9. Sorted part: `[16]`
    `MAX-HEAPIFY(A, 0, 9)`:
    *   `A[0]=1`. Children `A[1]=14`, `A[2]=10`. Swap `A[0]` and `A[1]`.
        `A = [14, 1, 10, 8, 7, 9, 3, 2, 4, 16]`
    *   `A[1]=1`. Children `A[3]=8`, `A[4]=7`. Swap `A[1]` and `A[3]`.
        `A = [14, 8, 10, 1, 7, 9, 3, 2, 4, 16]`
    *   `A[3]=1`. Children `A[7]=2`, `A[8]=4`. Swap `A[3]` and `A[8]`.
        `A = [14, 8, 10, 4, 7, 9, 3, 2, 1, 16]`
    Heap is now `[14, 8, 10, 4, 7, 9, 3, 2, 1 | 16]`

2.  **Swap `A[0]` (14) with `A[8]` (1).**
    `A = [1, 8, 10, 4, 7, 9, 3, 2, 14, 16]`
    Heap size becomes 8. Sorted part: `[14, 16]`
    `MAX-HEAPIFY(A, 0, 8)`:
    *   `A[0]=1`. Children `A[1]=8`, `A[2]=10`. Swap `A[0]` and `A[2]`.
        `A = [10, 8, 1, 4, 7, 9, 3, 2, 14, 16]`
    *   `A[2]=1`. Children `A[5]=9`, `A[6]=3`. Swap `A[2]` and `A[5]`.
        `A = [10, 8, 9, 4, 7, 1, 3, 2, 14, 16]`
    Heap is now `[10, 8, 9, 4, 7, 1, 3, 2 | 14, 16]`

... and so on, until the heap size is 1.

**Formal/Mathematical Version:**
`HEAPSORT(A)`:
1.  `BUILD-MAX-HEAP(A)` (initializes `heap_size = length(A)`)
2.  For `i = length(A) - 1` down to `1`:
    *   Swap `A[0]` and `A[i]`.
    *   `heap_size = heap_size - 1` (conceptually, we decrement the size of the heap)
    *   `MAX-HEAPIFY(A, 0, heap_size)`

**What could go wrong:** Not decrementing `heap_size` after each swap means `heapify` will operate on elements that are already sorted, potentially messing up the final order. Also, forgetting to `heapify` the root after each swap is a critical error.

## 5. Worked examples — multiple, with every step shown

Let's walk through several examples to solidify understanding. We'll use 0-indexed arrays.

### Example 1: Easy
**Problem:** Sort the array `A = [4, 1, 3, 2]` using Heap Sort.
**Given:** `A = [4, 1, 3, 2]`, `n = 4`.
**Want:** Sorted array in ascending order.

**Phase 1: Build Max-Heap**
The last non-leaf node is at index $\lfloor (4/2) - 1 \rfloor = 1$. We iterate `i` from `1` down to `0`.

*   **`i = 1`:** `MAX-HEAPIFY(A, 1, 4)`
    *   `A[1] = 1`. Left child `A[2] = 3`, Right child `A[3] = 2`.
    *   Largest among `A[1]`, `A[2]`, `A[3]` is `A[2] = 3`.
    *   Swap `A[1]` and `A[2]`.
    *   `A = [4, 3, 1, 2]`
    *   Recursive `MAX-HEAPIFY` on index 2 (new position of 1). `A[2]=1` has no children within `heap_size=4`.
    *   *Why it works:* We're ensuring the subtree rooted at index 1 (which is `[1, 3, 2]`) becomes a max-heap. `3` is the largest, so it becomes the root of this subtree.

*   **`i = 0`:** `MAX-HEAPIFY(A, 0, 4)`
    *   `A[0] = 4`. Left child `A[1] = 3`, Right child `A[2] = 1`.
    *   Largest among `A[0]`, `A[1]`, `A[2]` is `A[0] = 4`.
    *   No swap needed.
    *   *Why it works:* The root `4` is already greater than its children `3` and `1`. The heap property is maintained.

**Array after Build Max-Heap:** `A = [4, 3, 1, 2]` (This is a max-heap: 4 is root, 3>2, 1, 2 are leaves)

**Phase 2: Sort (Extract Max Elements)**
Iterate `i` from `3` down to `1`. `heap_size` starts at 4.

*   **`i = 3` (current `heap_size = 4`):**
    *   Swap `A[0]` (4) with `A[3]` (2).
    *   `A = [2, 3, 1, 4]`
    *   Decrement `heap_size` to 3. (The `4` is now sorted at the end)
    *   `MAX-HEAPIFY(A, 0, 3)`:
        *   `A[0] = 2`. Left child `A[1] = 3`, Right child `A[2] = 1`.
        *   Largest is `A[1] = 3`.
        *   Swap `A[0]` and `A[1]`.
        *   `A = [3, 2, 1, 4]`
        *   Recursive `MAX-HEAPIFY` on index 1 (new position of 2). `A[1]=2`. Children are `A[3]` (out of bounds for `heap_size=3`).
    *   *Why it works:* We extracted the largest element (4) and placed it at the end. Then we restored the max-heap property for the remaining 3 elements.

*   **`i = 2` (current `heap_size = 3`):**
    *   Swap `A[0]` (3) with `A[2]` (1).
    *   `A = [1, 2, 3, 4]`
    *   Decrement `heap_size` to 2. (The `3` is now sorted)
    *   `MAX-HEAPIFY(A, 0, 2)`:
        *   `A[0] = 1`. Left child `A[1] = 2`. No right child within `heap_size=2`.
        *   Largest is `A[1] = 2`.
        *   Swap `A[0]` and `A[1]`.
        *   `A = [2, 1, 3, 4]`
        *   Recursive `MAX-HEAPIFY` on index 1 (new position of 1). `A[1]=1` has no children within `heap_size=2`.
    *   *Why it works:* Extracted 3, placed it, restored heap for remaining 2.

*   **`i = 1` (current `heap_size = 2`):**
    *   Swap `A[0]` (2) with `A[1]` (1).
    *   `A = [1, 2, 3, 4]`
    *   Decrement `heap_size` to 1. (The `2` is now sorted)
    *   `MAX-HEAPIFY(A, 0, 1)`:
        *   `A[0] = 1`. No children within `heap_size=1`. No action.
    *   *Why it works:* Extracted 2, placed it. Only 1 element left, which is trivially sorted.

**Final Sorted Array:** $\boxed{[1, 2, 3, 4]}$

**Reflection:** This example was straightforward, demonstrating the two main phases. The `heapify` calls were simple, mostly involving one swap and no further recursion.

### Example 2: Medium
**Problem:** Sort `A = [5, 13, 2, 25, 7, 17, 20, 8, 4]`
**Given:** `A = [5, 13, 2, 25, 7, 17, 20, 8, 4]`, `n = 9`.
**Want:** Sorted array in ascending order.

**Phase 1: Build Max-Heap**
Last non-leaf node index: $\lfloor (9/2) - 1 \rfloor = \lfloor 4.5 - 1 \rfloor = 3$. Iterate `i` from `3` down to `0`.

*   **`i = 3`:** `MAX-HEAPIFY(A, 3, 9)`
    *   `A[3] = 25`. Left child `A[7] = 8`, Right child `A[8] = 4`.
    *   `25` is largest. No swap.
    *   `A = [5, 13, 2, 25, 7, 17, 20, 8, 4]`

*   **`i = 2`:** `MAX-HEAPIFY(A, 2, 9)`
    *   `A[2] = 2`. Left child `A[5] = 17`, Right child `A[6] = 20`.
    *   Largest is `A[6] = 20`. Swap `A[2]` and `A[6]`.
    *   `A = [5, 13, 20, 25, 7, 17, 2, 8, 4]`
    *   Recursive `MAX-HEAPIFY` on index 6 (new position of 2). `A[6]=2` has no children within `heap_size=9`.

*   **`i = 1`:** `MAX-HEAPIFY(A, 1, 9)`
    *   `A[1] = 13`. Left child `A[3] = 25`, Right child `A[4] = 7`.
    *   Largest is `A[3] = 25`. Swap `A[1]` and `A[3]`.
    *   `A = [5, 25, 20, 13, 7, 17, 2, 8, 4]`
    *   Recursive `MAX-HEAPIFY` on index 3 (new position of 13). `A[3]=13`. Left child `A[7]=8`, Right child `A[8]=4`.
    *   Largest is `A[3]=13`. No swap.

*   **`i = 0`:** `MAX-HEAPIFY(A, 0, 9)`
    *   `A[0] = 5`. Left child `A[1] = 25`, Right child `A[2] = 20`.
    *   Largest is `A[1] = 25`. Swap `A[0]` and `A[1]`.
    *   `A = [25, 5, 20, 13, 7, 17, 2, 8, 4]`
    *   Recursive `MAX-HEAPIFY` on index 1 (new position of 5). `A[1]=5`. Left child `A[3]=13`, Right child `A[4]=7`.
    *   Largest is `A[3]=13`. Swap `A[1]` and `A[3]`.
    *   `A = [25, 13, 20, 5, 7, 17, 2, 8, 4]`
    *   Recursive `MAX-HEAPIFY` on index 3 (new position of 5). `A[3]=5`. Left child `A[7]=8`, Right child `A[8]=4`.
    *   Largest is `A[7]=8`. Swap `A[3]` and `A[7]`.
    *   `A = [25, 13, 20, 8, 7, 17, 2, 5, 4]`
    *   Recursive `MAX-HEAPIFY` on index 7 (new position of 5). `A[7]=5` has no children within `heap_size=9`.

**Array after Build Max-Heap:** `A = [25, 13, 20, 8, 7, 17, 2, 5, 4]`

**Phase 2: Sort (Extract Max Elements)**
Iterate `i` from `8` down to `1`. `heap_size` starts at 9.

*   **`i = 8` (current `heap_size = 9`):**
    *   Swap `A[0]` (25) with `A[8]` (4).
    *   `A = [4, 13, 20, 8, 7, 17, 2, 5, 25]`
    *   `heap_size` becomes 8. Sorted part: `[25]`
    *   `MAX-HEAPIFY(A, 0, 8)`:
        *   `A[0]=4`. Children `A[1]=13`, `A[2]=20`. Largest `A[2]=20`. Swap `A[0]` and `A[2]`.
        *   `A = [20, 13, 4, 8, 7, 17, 2, 5, 25]`
        *   Recursive `MAX-HEAPIFY` on index 2 (new position of 4). `A[2]=4`. Children `A[5]=17`, `A[6]=2`. Largest `A[5]=17`. Swap `A[2]` and `A[5]`.
        *   `A = [20, 13, 17, 8, 7, 4, 2, 5, 25]`
        *   Recursive `MAX-HEAPIFY` on index 5 (new position of 4). `A[5]=4`. No children within `heap_size=8`.
    *   Heap: `[20, 13, 17, 8, 7, 4, 2, 5 | 25]`

*   **`i = 7` (current `heap_size = 8`):**
    *   Swap `A[0]` (20) with `A[7]` (5).
    *   `A = [5, 13, 17, 8, 7, 4, 2, 20, 25]`
    *   `heap_size` becomes 7. Sorted part: `[20, 25]`
    *   `MAX-HEAPIFY(A, 0, 7)`:
        *   `A[0]=5`. Children `A[1]=13`, `A[2]=17`. Largest `A[2]=17`. Swap `A[0]` and `A[2]`.
        *   `A = [17, 13, 5, 8, 7, 4, 2, 20, 25]`
        *   Recursive `MAX-HEAPIFY` on index 2 (new position of 5). `A[2]=5`. Children `A[5]=4`, `A[6]=2`. Largest `A[2]=5`. No swap.
    *   Heap: `[17, 13, 5, 8, 7, 4, 2 | 20, 25]`

*   **`i = 6` (current `heap_size = 7`):**
    *   Swap `A[0]` (17) with `A[6]` (2).
    *   `A = [2, 13, 5, 8, 7, 4, 17, 20, 25]`
    *   `heap_size` becomes 6. Sorted part: `[17, 20, 25]`
    *   `MAX-HEAPIFY(A, 0, 6)`:
        *   `A[0]=2`. Children `A[1]=13`, `A[2]=5`. Largest `A[1]=13`. Swap `A[0]` and `A[1]`.
        *   `A = [13, 2, 5, 8, 7, 4, 17, 20, 25]`
        *   Recursive `MAX-HEAPIFY` on index 1 (new position of 2). `A[1]=2`. Children `A[3]=8`, `A[4]=7`. Largest `A[3]=8`. Swap `A[1]` and `A[3]`.
        *   `A = [13, 8, 5, 2, 7, 4, 17, 20, 25]`
        *   Recursive `MAX-HEAPIFY` on index 3 (new position of 2). `A[3]=2`. No children within `heap_size=6`.
    *   Heap: `[13, 8, 5, 2, 7, 4 | 17, 20, 25]`

*   **`i = 5` (current `heap_size = 6`):**
    *   Swap `A[0]` (13) with `A[5]` (4).
    *   `A = [4, 8, 5, 2, 7, 13, 17, 20, 25]`
    *   `heap_size` becomes 5. Sorted part: `[13, 17, 20, 25]`
    *   `MAX-HEAPIFY(A, 0, 5)`:
        *   `A[0]=4`. Children `A[1]=8`, `A[2]=5`. Largest `A[1]=8`. Swap `A[0]` and `A[1]`.
        *   `A = [8, 4, 5, 2, 7, 13, 17, 20, 25]`
        *   Recursive `MAX-HEAPIFY` on index 1 (new position of 4). `A[1]=4`. Children `A[3]=2`, `A[4]=7`. Largest `A[4]=7`. Swap `A[1]` and `A[4]`.
        *   `A = [8, 7, 5, 2, 4, 13, 17, 20, 25]`
        *   Recursive `MAX-HEAPIFY` on index 4 (new position of 4). `A[4]=4`. No children within `heap_size=5`.
    *   Heap: `[8, 7, 5, 2, 4 | 13, 17, 20, 25]`

*   **`i = 4` (current `heap_size = 5`):**
    *   Swap `A[0]` (8) with `A[4]` (4).
    *   `A = [4, 7, 5, 2, 8, 13, 17, 20, 25]`
    *   `heap_size` becomes 4. Sorted part: `[8, 13, 17, 20, 25]`
    *   `MAX-HEAPIFY(A, 0, 4)`:
        *   `A[0]=4`. Children `A[1]=7`, `A[2]=5`. Largest `A[1]=7`. Swap `A[0]` and `A[1]`.
        *   `A = [7, 4, 5, 2, 8, 13, 17, 20, 25]`
        *   Recursive `MAX-HEAPIFY` on index 1 (new position of 4). `A[1]=4`. Children `A[3]=2`. No right child. Largest `A[1]=4`. No swap.
    *   Heap: `[7, 4, 5, 2 | 8, 13, 17, 20, 25]`

*   **`i = 3` (current `heap_size = 4`):**
    *   Swap `A[0]` (7) with `A[3]` (2).
    *   `A = [2, 4, 5, 7, 8, 13, 17, 20, 25]`
    *   `heap_size` becomes 3. Sorted part: `[7, 8, 13, 17, 20, 25]`
    *   `MAX-HEAPIFY(A, 0, 3)`:
        *   `A[0]=2`. Children `A[1]=4`, `A[2]=5`. Largest `A[2]=5`. Swap `A[0]` and `A[2]`.
        *   `A = [5, 4, 2, 7, 8, 13, 17, 20, 25]`
        *   Recursive `MAX-HEAPIFY` on index 2 (new position of 2). `A[2]=2`. No children within `heap_size=3`.
    *   Heap: `[5, 4, 2 | 7, 8, 13, 17, 20, 25]`

*   **`i = 2` (current `heap_size = 3`):**
    *   Swap `A[0]` (5) with `A[2]` (2).
    *   `A = [2, 4, 5, 7, 8, 13, 17, 20, 25]`
    *   `heap_size` becomes 2. Sorted part: `[5, 7, 8, 13, 17, 20, 25]`
    *   `MAX-HEAPIFY(A, 0, 2)`:
        *   `A[0]=2`. Children `A[1]=4`. No right child within `heap_size=2`. Largest `A[1]=4`. Swap `A[0]` and `A[1]`.
        *   `A = [4, 2, 5, 7, 8, 13, 17, 20, 25]`
        *   Recursive `MAX-HEAPIFY` on index 1 (new position of 2). `A[1]=2`. No children within `heap_size=2`.
    *   Heap: `[4, 2 | 5, 7, 8, 13, 17, 20, 25]`

*   **`i = 1` (current `heap_size = 2`):**
    *   Swap `A[0]` (4) with `A[1]` (2).
    *   `A = [2, 4, 5, 7, 8, 13, 17, 20, 25]`
    *   `heap_size` becomes 1. Sorted part: `[4, 5, 7, 8, 13, 17, 20, 25]`
    *   `MAX-HEAPIFY(A, 0, 1)`: No children. No action.
    *   Heap: `[2 | 4, 5, 7, 8, 13, 17, 20, 25]`

**Final Sorted Array:** $\boxed{[2, 4, 5, 7, 8, 13, 17, 20, 25]}$

**Reflection:** This example involved more complex `heapify` calls with multiple recursive steps, especially during the `BUILD-MAX-HEAP` phase, which is typical for larger, more disordered arrays. The process is systematic but requires careful tracking of `heap_size`.

### Example 3: Harder, with duplicates
**Problem:** Sort `A = [8, 5, 8, 1, 3, 5, 2]`
**Given:** `A = [8, 5, 8, 1, 3, 5, 2]`, `n = 7`.
**Want:** Sorted array in ascending order.

**Phase 1: Build Max-Heap**
Last non-leaf node index: $\lfloor (7/2) - 1 \rfloor = \lfloor 3.5 - 1 \rfloor = 2$. Iterate `i` from `2` down to `0`.

*   **`i = 2`:** `MAX-HEAPIFY(A, 2, 7)`
    *   `A[2] = 8`. Left child `A[5] = 5`, Right child `A[6] = 2`.
    *   `8` is largest. No swap.
    *   `A = [8, 5, 8, 1, 3, 5, 2]`

*   **`i = 1`:** `MAX-HEAPIFY(A, 1, 7)`
    *   `A[1] = 5`. Left child `A[3] = 1`, Right child `A[4] = 3`.
    *   `5` is largest. No swap.
    *   `A = [8, 5, 8, 1, 3, 5, 2]`

*   **`i = 0`:** `MAX-HEAPIFY(A, 0, 7)`
    *   `A[0] = 8`. Left child `A[1] = 5`, Right child `A[2] = 8`.
    *   Largest is `A[0]=8` (or `A[2]=8`). If we choose `A[0]` (current `largest`), no swap. If we choose `A[2]` (right child), swap `A[0]` and `A[2]`. Let's assume the `largest` variable takes the *first* largest index encountered (i.e. if `A[i]` is equal to `A[left]` or `A[right]`, `largest` remains `i` unless a strictly greater value is found). In this case, `A[0]` is already equal to the largest child, so no swap.
    *   *Note on duplicates:* The heap property $A[i] \ge A[child]$ handles duplicates naturally. A parent can be equal to a child. The `MAX-HEAPIFY` logic "if `A[left] > A[largest]`" and "if `A[right] > A[largest]`" ensures that if `A[i]` is already the max, it stays.
    *   `A = [8, 5, 8, 1, 3, 5, 2]`

**Array after Build Max-Heap:** `A = [8, 5, 8, 1, 3, 5, 2]` (This is a valid max-heap)

**Phase 2: Sort (Extract Max Elements)**
Iterate `i` from `6` down to `1`. `heap_size` starts at 7.

*   **`i = 6` (current `heap_size = 7`):**
    *   Swap `A[0]` (8) with `A[6]` (2).
    *   `A = [2, 5, 8, 1, 3, 5, 8]`
    *   `heap_size` becomes 6. Sorted part: `[8]`
    *   `MAX-HEAPIFY(A, 0, 6)`:
        *   `A[0]=2`. Children `A[1]=5`, `A[2]=8`. Largest `A[2]=8`. Swap `A[0]` and `A[2]`.
        *   `A = [8, 5, 2, 1, 3, 5, 8]`
        *   Recursive `MAX-HEAPIFY` on index 2 (new position of 2). `A[2]=2`. Children `A[5]=5`. No right child within `heap_size=6`. Largest `A[5]=5`. Swap `A[2]` and `A[5]`.
        *   `A = [8, 5, 5, 1, 3, 2, 8]`
        *   Recursive `MAX-HEAPIFY` on index 5 (new position of 2). `A[5]=2`. No children within `heap_size=6`.
    *   Heap: `[8, 5, 5, 1, 3, 2 | 8]`

*   **`i = 5` (current `heap_size = 6`):**
    *   Swap `A[0]` (8) with `A[5]` (2).
    *   `A = [2, 5, 5, 1, 3, 8, 8]`
    *   `heap_size` becomes 5. Sorted part: `[8, 8]`
    *   `MAX-HEAPIFY(A, 0, 5)`:
        *   `A[0]=2`. Children `A[1]=5`, `A[2]=5`. Largest `A[1]=5` (or `A[2]=5`). Let's say `A[1]=5`. Swap `A[0]` and `A[1]`.
        *   `A = [5, 2, 5, 1, 3, 8, 8]`
        *   Recursive `MAX-HEAPIFY` on index 1 (new position of 2). `A[1]=2`. Children `A[3]=1`, `A[4]=3`. Largest `A[4]=3`. Swap `A[1]` and `A[4]`.
        *   `A = [5, 3, 5, 1, 2, 8, 8]`
        *   Recursive `MAX-HEAPIFY` on index 4 (new position of 2). `A[4]=2`. No children within `heap_size=5`.
    *   Heap: `[5, 3, 5, 1, 2 | 8, 8]`

*   **`i = 4` (current `heap_size = 5`):**
    *   Swap `A[0]` (5) with `A[4]` (2).
    *   `A = [2, 3, 5, 1, 5, 8, 8]`
    *   `heap_size` becomes 4. Sorted part: `[5, 8, 8]`
    *   `MAX-HEAPIFY(A, 0, 4)`:
        *   `A[0]=2`. Children `A[1]=3`, `A[2]=5`. Largest `A[2]=5`. Swap `A[0]` and `A[2]`.
        *   `A = [5, 3, 2, 1, 5, 8, 8]`
        *   Recursive `MAX-HEAPIFY` on index 2 (new position of 2). `A[2]=2`. No children within `heap_size=4`.
    *   Heap: `[5, 3, 2, 1 | 5, 8, 8]`

*   **`i = 3` (current `heap_size = 4`):**
    *   Swap `A[0]` (5) with `A[3]` (1).
    *   `A = [1, 3, 2, 5, 5, 8, 8]`
    *   `heap_size` becomes 3. Sorted part: `[5, 5, 8, 8]`
    *   `MAX-HEAPIFY(A, 0, 3)`:
        *   `A[0]=1`. Children `A[1]=3`, `A[2]=2`. Largest `A[1]=3`. Swap `A[0]` and `A[1]`.
        *   `A = [3, 1, 2, 5, 5, 8, 8]`
        *   Recursive `MAX-HEAPIFY` on index 1 (new position of 1). `A[1]=1`. No children within `heap_size=3`.
    *   Heap: `[3, 1, 2 | 5, 5, 8, 8]`

*   **`i = 2` (current `heap_size = 3`):**
    *   Swap `A[0]` (3) with `A[2]` (2).
    *   `A = [2, 1, 3, 5, 5, 8, 8]`
    *   `heap_size` becomes 2. Sorted part: `[3, 5, 5, 8, 8]`
    *   `MAX-HEAPIFY(A, 0, 2)`:
        *   `A[0]=2`. Children `A[1]=1`. No right child within `heap_size=2`. Largest `A[0]=2`. No swap.
    *   Heap: `[2, 1 | 3, 5, 5, 8, 8]`

*   **`i = 1` (current `heap_size = 2`):**
    *   Swap `A[0]` (2) with `A[1]` (1).
    *   `A = [1, 2, 3, 5, 5, 8, 8]`
    *   `heap_size` becomes 1. Sorted part: `[2, 3, 5, 5, 8, 8]`
    *   `MAX-HEAPIFY(A, 0, 1)`: No children. No action.
    *   Heap: `[1 | 2, 3, 5, 5, 8, 8]`

**Final Sorted Array:** $\boxed{[1, 2, 3, 5, 5, 8, 8]}$

**Reflection:** Duplicates don't fundamentally change the Heap Sort algorithm. The heap property $A[i] \ge A[child]$ naturally handles them. The key is to consistently apply the `MAX-HEAPIFY` logic. This example also highlights the "not stable" property because the relative order of equal elements (e.g., the two `8`s or the two `5`s) is not preserved.

### Example 4: Longer, to show `heapify` in action
**Problem:** Sort `A = [16, 4, 10, 14, 7, 9, 3, 2, 8, 1]`
**Given:** `A = [16, 4, 10, 14, 7, 9, 3, 2, 8, 1]`, `n = 10`.
**Want:** Sorted array in ascending order.

**Phase 1: Build Max-Heap**
Last non-leaf node index: $\lfloor (10/2) - 1 \rfloor = 4$. Iterate `i` from `4` down to `0`.

*   **`i = 4`:** `MAX-HEAPIFY(A, 4, 10)`
    *   `A[4]=7`. Left child `A[9]=1`. No right child. `7` is largest. No swap.
    *   `A = [16, 4, 10, 14, 7, 9, 3, 2, 8, 1]`

*   **`i = 3`:** `MAX-HEAPIFY(A, 3, 10)`
    *   `A[3]=14`. Left child `A[7]=2`, Right child `A[8]=8`. `14` is largest. No swap.
    *   `A = [16, 4, 10, 14, 7, 9, 3, 2, 8, 1]`

*   **`i = 2`:** `MAX-HEAPIFY(A, 2, 10)`
    *   `A[2]=10`. Left child `A[5]=9`, Right child `A[6]=3`. `10` is largest. No swap.
    *   `A = [16, 4, 10, 14, 7, 9, 3, 2, 8, 1]`

*   **`i = 1`:** `MAX-HEAPIFY(A, 1, 10)`
    *   `A[1]=4`. Children `A[3]=14`, `A[4]=7`. Largest `A[3]=14`. Swap `A[1]` and `A[3]`.
    *   `A = [16, 14, 10, 4, 7, 9, 3, 2, 8, 1]`
    *   Recursive `MAX-HEAPIFY` on index 3 (new position of 4). `A[3]=4`. Children `A[7]=2`, `A[8]=8`. Largest `A[8]=8`. Swap `A[3]` and `A[8]`.
    *   `A = [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]`
    *   Recursive `MAX-HEAPIFY` on index 8 (new position of 4). `A[8]=4`. No children.

*   **`i = 0`:** `MAX-HEAPIFY(A, 0, 10)`
    *   `A[0]=16`. Children `A[1]=14`, `A[2]=10`. `16` is largest. No swap.
    *   `A = [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]`

**Array after Build Max-Heap:** `A = [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]`

**Phase 2: Sort (Extract Max Elements)**
Iterate `i` from `9` down to `1`. `heap_size` starts at 10.

*   **`i = 9` (current `heap_size = 10`):**
    *   Swap `A[0]` (16) with `A[9]` (1).
    *   `A = [1, 14, 10, 8, 7, 9, 3, 2, 4, 16]`
    *   `heap_size` becomes 9. Sorted part: `[16]`
    *   `MAX-HEAPIFY(A, 0, 9)`:
        *   `A[0]=1`. Children `A[1]=14`, `A[2]=10`. Largest `A[1]=14`. Swap `A[0]` and `A[1]`.
        *   `A = [14, 1, 10, 8, 7, 9, 3, 2, 4, 16]`
        *   Recursive `MAX-HEAPIFY` on index 1 (new position of 1). `A[1]=1`. Children `A[3]=8`, `A[4]=7`. Largest `A[3]=8`. Swap `A[1]` and `A[3]`.
        *   `A = [14