## 1. What it is — in plain English

Imagine you have a messy pile of toys, and you want to arrange them from smallest to largest. Heap sort is like a clever way to do this by repeatedly finding the biggest toy and putting it in its correct spot.

First, you organize your entire pile of toys into a special structure called a "heap." Think of a heap as a pyramid where every toy is bigger than the two toys directly below it. So, the biggest toy is always at the very top of the pyramid.

Once your toys are in this pyramid shape, you simply pick up the biggest toy (which is always at the top), place it at the end of your sorted line, and then re-arrange the remaining toys back into a smaller pyramid. You keep doing this: pick the biggest from the remaining pile, put it next in line, and re-arrange.

You repeat this process until all the toys have been picked from the pyramid and placed into their sorted spots. The amazing thing is that you do all this "re-arranging" and "picking" directly within the original space where the toys were, without needing a whole new table to sort them on.

## 2. Why it matters — real-world applications

Heap sort is a powerful sorting algorithm due to its guaranteed $O(n \log n)$ time complexity and its ability to sort "in-place" (meaning it doesn't need much extra memory). These properties make it valuable in several real-world scenarios:

1.  **Priority Queues in Operating Systems and Simulations:** While not directly Heap Sort, the underlying data structure (a binary heap) is the backbone of priority queues. Operating systems use priority queues to manage tasks, ensuring high-priority processes run before lower-priority ones. In simulations (e.g., physics engines, discrete-event simulations), events are often stored in a priority queue to be processed in chronological order. Heap sort's principles are directly applicable to understanding how these queues maintain order efficiently.
2.  **"Top K" Selection Problems:** When you need to find the $k$ largest or smallest items from a very large dataset without sorting the entire dataset, a min-heap or max-heap (the core of heap sort) is incredibly efficient. For example, a social media platform might use a heap to quickly find the "top 10 trending topics" or "most liked posts" from millions of recent activities without fully sorting all of them. Similarly, in machine learning, finding the $k$ most important features or the $k$ nearest neighbors can leverage heap-based selection.
3.  **Aerospace and Defense Systems:** In real-time critical systems, such as air traffic control or missile defense, strict performance guarantees are paramount. Heap sort's predictable $O(n \log n)$ worst-case performance (unlike Quicksort's potential $O(n^2)$) makes it a suitable choice for sorting critical data where consistent timing is essential, even if its average performance is slightly slower than Quicksort. It ensures that sorting operations won't suddenly become extremely slow under specific data distributions.
4.  **External Sorting (as part of a larger algorithm):** When datasets are too large to fit into RAM, they must be sorted using external memory (like hard drives). Heap sort's in-place nature and efficiency can be used as a component in multi-pass external sorting algorithms. For instance, initial runs of data might be sorted into smaller blocks using an in-memory heap sort, and then these blocks are merged.

## 3. Prerequisites — what you must know first

To fully grasp Heap sort, ensure you have a solid understanding of these foundational concepts:

*   **Arrays:** A basic data structure that stores a fixed-size sequential collection of elements, accessible by index.
*   **Binary Trees:** A hierarchical data structure where each node has at most two children (left and right).
*   **Binary Heaps:** A special type of binary tree that satisfies the "heap property" (either a Max-Heap where parent $\ge$ children, or a Min-Heap where parent $\le$ children) and is a "complete binary tree" (all levels fully filled except possibly the last, which is filled from left to right).
*   **Array Representation of a Binary Heap:** How a binary heap can be efficiently stored in an array, where parent/child indices can be calculated using simple arithmetic ($parent(i) = \lfloor (i-1)/2 \rfloor$, $left\_child(i) = 2i+1$, $right\_child(i) = 2i+2$ for 0-indexed arrays).
*   **`heapify` Operation (specifically `max_heapify`):** The process of maintaining the heap property. If an element at a given index violates the heap property, `heapify` "bubbles down" that element by swapping it with its largest child until the heap property is restored.
*   **`build_heap` Operation (specifically `build_max_heap`):** The process of converting an arbitrary array into a valid binary heap by applying `heapify` to all non-leaf nodes, starting from the last non-leaf node and moving up to the root.
*   **Sorting Algorithms (General Concept):** The idea of arranging elements in a specific order (ascending or descending).
*   **Time Complexity (Big O Notation):** A way to describe the efficiency of an algorithm based on how its runtime or space requirements grow with the input size ($n$). Understanding $O(n)$, $O(\log n)$, $O(n \log n)$, and $O(1)$ is crucial.
*   **In-place Algorithms:** Algorithms that transform their input without using significant auxiliary data structures. This means they only require a small, constant amount of extra space, $O(1)$.

## 4. The core idea — step by step

Heap sort works in two main phases: first, it transforms the input array into a Max-Heap, and then it repeatedly extracts the maximum element from the heap and places it at the end of the array, effectively sorting it.

### Step 1: Understand the Goal — Sort an Array

**Plain English:** We want to take a jumbled list of numbers and arrange them neatly from smallest to largest.

**Small Concrete Example:**
Given the array: `[4, 1, 3, 2, 16, 9, 10, 14, 8, 7]`
We want to get: `[1, 2, 3, 4, 7, 8, 9, 10, 14, 16]`

**Formal/Mathematical Version:**
Given an array $A$ of $n$ elements, produce a permutation $A'$ of $A$ such that $A'[0] \le A'[1] \le \dots \le A'[n-1]$.

**What could go wrong:** Not understanding what "sorted" means (e.g., confusing ascending with descending order). For this lesson, we'll focus on ascending order, which typically uses a Max-Heap.

### Step 2: Build a Max-Heap from the Array

**Plain English:** The first step is to take our unsorted array and rearrange its elements so that it satisfies the Max-Heap property. This means that for any element, its value is greater than or equal to the values of its children. After this step, the largest element in the entire array will be at the very beginning (the root of the heap).

**Small Concrete Example:**
Let's take a small array: `[4, 1, 3, 2, 16]`

1.  Identify the last non-leaf node. For 0-indexed array of size $n$, this is at index $\lfloor n/2 \rfloor - 1$. For `[4, 1, 3, 2, 16]` ($n=5$), last non-leaf is at $\lfloor 5/2 \rfloor - 1 = 2 - 1 = 1$ (index 1, value 1).
2.  We start `max_heapify` from this node and go backwards to index 0.
    *   `max_heapify(A, 1)`: `A[1]=1`, children are `A[3]=2`, `A[4]=16`. Swap `A[1]` with `A[4]`. Array becomes `[4, 16, 3, 2, 1]`.
    *   `max_heapify(A, 0)`: `A[0]=4`, children are `A[1]=16`, `A[2]=3`. Swap `A[0]` with `A[1]`. Array becomes `[16, 4, 3, 2, 1]`. Now `A[0]=16` is the largest.
The array `[16, 4, 3, 2, 1]` is now a Max-Heap.

**Formal/Mathematical Version:**
Perform the `BUILD-MAX-HEAP(A)` operation. This involves iterating from $i = \lfloor n/2 \rfloor - 1$ down to $0$, calling `MAX-HEAPIFY(A, i, n)` at each step, where $n$ is the current size of the array (initially the full array length).
The `MAX-HEAPIFY(A, i, heap_size)` procedure ensures that the subtree rooted at index $i$ satisfies the Max-Heap property, assuming its children's subtrees are already Max-Heaps.
The time complexity of `BUILD-MAX-HEAP` is $O(n)$.

**What could go wrong:** Incorrectly calculating parent/child indices, especially when switching between 0-indexed and 1-indexed array representations. Forgetting to iterate from the last non-leaf node *upwards* to the root. Incorrectly implementing `MAX-HEAPIFY` (e.g., not recursively calling it on the swapped child).

### Step 3: Extract the Maximum Element

**Plain English:** Once we have a Max-Heap, the largest element is always at the very beginning of our array (the root). We take this largest element, and we swap it with the very last element in our heap. Now, the largest element is at the end of the array, which is where it should be in the final sorted list.

**Small Concrete Example:**
Our Max-Heap array: `[16, 4, 3, 2, 1]`
1.  The largest element is `A[0] = 16`.
2.  The last element in the current heap is `A[4] = 1`.
3.  Swap them: `[1, 4, 3, 2, 16]`.

**Formal/Mathematical Version:**
Swap $A[0]$ with $A[heap\_size - 1]$.
The element $A[heap\_size - 1]$ is now in its final sorted position.

**What could go wrong:** Swapping with the wrong element (e.g., not the very last element of the *current* heap).

### Step 4: Shrink the Heap and Re-Heapify

**Plain English:** After swapping the largest element to the end, that element is now considered "sorted" and is no longer part of our heap. So, we mentally (or actually, by decrementing a counter) shrink the size of our heap by one. The element we just swapped to the root (which was the old last element) might not satisfy the heap property anymore. We need to fix this by "bubbling down" this new root element until the heap property is restored for the smaller heap.

**Small Concrete Example:**
Our array after swap: `[1, 4, 3, 2, 16]`
Current heap size: 4 (elements `[1, 4, 3, 2]`)
1.  Decrement heap size: `heap_size = 4`.
2.  The new root is `A[0] = 1`. Its children are `A[1]=4`, `A[2]=3`.
3.  Call `max_heapify(A, 0, 4)`.
    *   `A[0]=1` is smaller than `A[1]=4`. Swap `A[0]` with `A[1]`. Array becomes `[4, 1, 3, 2, 16]`.
    *   Now `A[0]=4`, `A[1]=1`. The subtree at index 1 needs checking. `A[1]=1` has no children within the heap of size 4.
The array `[4, 1, 3, 2, 16]` is now a Max-Heap of size 4, with the largest element (16) correctly placed at the end.

**Formal/Mathematical Version:**
Decrement the `heap_size` variable by 1.
Call `MAX-HEAPIFY(A, 0, heap_size)` to restore the Max-Heap property for the root of the now smaller heap.
The time complexity of this step is $O(\log n)$ because `MAX-HEAPIFY` takes logarithmic time relative to the heap size.

**What could go wrong:** Forgetting to decrement the heap size, leading to the sorted elements being included in subsequent `heapify` calls. Incorrectly calling `MAX-HEAPIFY` on the wrong index or with the wrong heap size.

### Step 5: Repeat Until Sorted

**Plain English:** We keep repeating Steps 3 and 4. We extract the largest element from the current heap, put it at the end of the *remaining* unsorted part of the array, shrink the heap, and then fix the heap property. We do this until the heap contains only one element (which must be the smallest element and will naturally be in its correct place).

**Small Concrete Example:**
Continuing from `[4, 1, 3, 2, 16]` with `heap_size = 4`:
1.  Swap `A[0]=4` with `A[3]=2`. Array: `[2, 1, 3, 4, 16]`.
2.  Decrement `heap_size = 3`.
3.  `max_heapify(A, 0, 3)`: `A[0]=2`, children `A[1]=1`, `A[2]=3`. Swap `A[0]` with `A[2]`. Array: `[3, 1, 2, 4, 16]`.
Now the array is `[3, 1, 2, 4, 16]` with `heap_size = 3`.

Repeat again:
1.  Swap `A[0]=3` with `A[2]=2`. Array: `[2, 1, 3, 4, 16]`.
2.  Decrement `heap_size = 2`.
3.  `max_heapify(A, 0, 2)`: `A[0]=2`, child `A[1]=1`. No swap needed.
Now the array is `[2, 1, 3, 4, 16]` with `heap_size = 2`.

Repeat again:
1.  Swap `A[0]=2` with `A[1]=1`. Array: `[1, 2, 3, 4, 16]`.
2.  Decrement `heap_size = 1`.
3.  `max_heapify(A, 0, 1)`: A single element heap is always valid. No action.
Now the array is `[1, 2, 3, 4, 16]` with `heap_size = 1`. The loop terminates. The array is sorted!

**Formal/Mathematical Version:**
Repeat Steps 3 and 4 for $i = n-1$ down to $1$. The loop invariant is that after each iteration $k$, the subarray $A[k \dots n-1]$ contains the $n-k$ largest elements in sorted order, and the subarray $A[0 \dots k-1]$ is a Max-Heap containing the remaining $k$ smallest elements.
Since `MAX-HEAPIFY` takes $O(\log n)$ time, and we perform it $n-1$ times, this phase takes $O(n \log n)$ time.

**What could go wrong:** Off-by-one errors in loop bounds (e.g., stopping too early or going one step too far). Incorrectly managing the `heap_size` variable.

## 5. Worked examples — multiple, with every step shown

We will use 0-indexed arrays for all examples.
Parent index: $P(i) = \lfloor (i-1)/2 \rfloor$
Left child index: $L(i) = 2i+1$
Right child index: $R(i) = 2i+2$

`MAX-HEAPIFY(A, i, heap_size)`:
This function assumes that the subtrees rooted at $L(i)$ and $R(i)$ are already max-heaps. Its job is to ensure that the node at index $i$ also satisfies the max-heap property by "bubbling down" the element at $i$ if it's smaller than its children.

1.  Find the largest among $A[i]$, $A[L(i)]$, and $A[R(i)]$ (within `heap_size`).
2.  If $A[i]$ is not the largest, swap it with the largest child.
3.  Recursively call `MAX-HEAPIFY` on the child's new position if a swap occurred.

---

### Example 1: Basic Ascending Sort (Small Array)

**Problem:** Sort the array $A = [4, 14, 7, 2, 8, 1]$ in ascending order using Heap Sort.

**Given:** Unsorted array $A = [4, 14, 7, 2, 8, 1]$.
**Want:** Sorted array $A' = [1, 2, 4, 7, 8, 14]$.

**Phase 1: Build Max-Heap**
Array size $n=6$. Last non-leaf node index: $\lfloor 6/2 \rfloor - 1 = 3 - 1 = 2$.
We call `MAX-HEAPIFY` for $i = 2, 1, 0$.

1.  **`MAX-HEAPIFY(A, 2, 6)`**: (Node `A[2]=7`)
    *   Children: $L(2)=5$ (`A[5]=1`), $R(2)=6$ (out of bounds).
    *   Largest among `A[2]=7`, `A[5]=1` is `A[2]=7`. No swap needed.
    *   Current array: $$[4, 14, 7, 2, 8, 1]$$
2.  **`MAX-HEAPIFY(A, 1, 6)`**: (Node `A[1]=14`)
    *   Children: $L(1)=3$ (`A[3]=2`), $R(1)=4$ (`A[4]=8`).
    *   Largest among `A[1]=14`, `A[3]=2`, `A[4]=8` is `A[1]=14$. No swap needed.
    *   Current array: $$[4, 14, 7, 2, 8, 1]$$
3.  **`MAX-HEAPIFY(A, 0, 6)`**: (Node `A[0]=4`)
    *   Children: $L(0)=1$ (`A[1]=14`), $R(0)=2$ (`A[2]=7`).
    *   Largest among `A[0]=4`, `A[1]=14`, `A[2]=7` is `A[1]=14`.
    *   Swap `A[0]` with `A[1]`.
    *   Array becomes: $$[14, 4, 7, 2, 8, 1]$$
    *   Now, `A[0]=14`. The element `4` moved to index 1. Need to check subtree at index 1.
    *   Recursive call: `MAX-HEAPIFY(A, 1, 6)` (Node `A[1]=4`)
        *   Children: $L(1)=3$ (`A[3]=2`), $R(1)=4$ (`A[4]=8`).
        *   Largest among `A[1]=4`, `A[3]=2`, `A[4]=8` is `A[4]=8`.
        *   Swap `A[1]` with `A[4]`.
        *   Array becomes: $$[14, 8, 7, 2, 4, 1]$$
        *   Now, `A[1]=8`. The element `4` moved to index 4. Need to check subtree at index 4.
        *   Recursive call: `MAX-HEAPIFY(A, 4, 6)` (Node `A[4]=4`)
            *   Children: $L(4)=9$ (out), $R(4)=10$ (out). No children within heap size. No swap.
            *   Return.
        *   Return.
    *   Return.

End of Phase 1. The array is now a Max-Heap: $$[14, 8, 7, 2, 4, 1]$$

**Phase 2: Sort by Extraction**
Current `heap_size = 6`. Loop from `i = 5` down to `1`.

1.  **`i = 5`**: (Current heap: `[14, 8, 7, 2, 4, 1]`)
    *   Swap `A[0]` (14) with `A[5]` (1).
    *   Array: $$[1, 8, 7, 2, 4, \mathbf{14}]$$
    *   Decrement `heap_size = 5`.
    *   `MAX-HEAPIFY(A, 0, 5)`: (Node `A[0]=1`)
        *   Children: $L(0)=1$ (`A[1]=8`), $R(0)=2$ (`A[2]=7`).
        *   Largest is `A[1]=8`. Swap `A[0]` with `A[1]`.
        *   Array: $$[8, 1, 7, 2, 4, \mathbf{14}]$$
        *   Recursive call: `MAX-HEAPIFY(A, 1, 5)`: (Node `A[1]=1`)
            *   Children: $L(1)=3$ (`A[3]=2`), $R(1)=4$ (`A[4]=4`).
            *   Largest is `A[4]=4`. Swap `A[1]` with `A[4]`.
            *   Array: $$[8, 4, 7, 2, 1, \mathbf{14}]$$
            *   Recursive call: `MAX-HEAPIFY(A, 4, 5)`: (Node `A[4]=1`)
                *   No children within heap size. No swap. Return.
            *   Return.
        *   Return.
    *   Heap: `[8, 4, 7, 2, 1]`, Sorted: `[14]`

2.  **`i = 4`**: (Current heap: `[8, 4, 7, 2, 1]`)
    *   Swap `A[0]` (8) with `A[4]` (1).
    *   Array: $$[1, 4, 7, 2, \mathbf{8}, \mathbf{14}]$$
    *   Decrement `heap_size = 4`.
    *   `MAX-HEAPIFY(A, 0, 4)`: (Node `A[0]=1`)
        *   Children: $L(0)=1$ (`A[1]=4`), $R(0)=2$ (`A[2]=7`).
        *   Largest is `A[2]=7`. Swap `A[0]` with `A[2]`.
        *   Array: $$[7, 4, 1, 2, \mathbf{8}, \mathbf{14}]$$
        *   Recursive call: `MAX-HEAPIFY(A, 2, 4)`: (Node `A[2]=1`)
            *   Children: $L(2)=5$ (out), $R(2)=6$ (out). No children within heap size. No swap. Return.
        *   Return.
    *   Heap: `[7, 4, 1, 2]`, Sorted: `[8, 14]`

3.  **`i = 3`**: (Current heap: `[7, 4, 1, 2]`)
    *   Swap `A[0]` (7) with `A[3]` (2).
    *   Array: $$[2, 4, 1, \mathbf{7}, \mathbf{8}, \mathbf{14}]$$
    *   Decrement `heap_size = 3`.
    *   `MAX-HEAPIFY(A, 0, 3)`: (Node `A[0]=2`)
        *   Children: $L(0)=1$ (`A[1]=4`), $R(0)=2$ (`A[2]=1`).
        *   Largest is `A[1]=4`. Swap `A[0]` with `A[1]`.
        *   Array: $$[4, 2, 1, \mathbf{7}, \mathbf{8}, \mathbf{14}]$$
        *   Recursive call: `MAX-HEAPIFY(A, 1, 3)`: (Node `A[1]=2`)
            *   Children: $L(1)=3$ (out), $R(1)=4$ (out). No children within heap size. No swap. Return.
        *   Return.
    *   Heap: `[4, 2, 1]`, Sorted: `[7, 8, 14]`

4.  **`i = 2`**: (Current heap: `[4, 2, 1]`)
    *   Swap `A[0]` (4) with `A[2]` (1).
    *   Array: $$[1, 2, \mathbf{4}, \mathbf{7}, \mathbf{8}, \mathbf{14}]$$
    *   Decrement `heap_size = 2`.
    *   `MAX-HEAPIFY(A, 0, 2)`: (Node `A[0]=1`)
        *   Children: $L(0)=1$ (`A[1]=2`), $R(0)=2$ (out).
        *   Largest is `A[1]=2`. Swap `A[0]` with `A[1]`.
        *   Array: $$[2, 1, \mathbf{4}, \mathbf{7}, \mathbf{8}, \mathbf{14}]$$
        *   Recursive call: `MAX-HEAPIFY(A, 1, 2)`: (Node `A[1]=1`)
            *   No children within heap size. No swap. Return.
        *   Return.
    *   Heap: `[2, 1]`, Sorted: `[4, 7, 8, 14]`

5.  **`i = 1`**: (Current heap: `[2, 1]`)
    *   Swap `A[0]` (2) with `A[1]` (1).
    *   Array: $$[1, \mathbf{2}, \mathbf{4}, \mathbf{7}, \mathbf{8}, \mathbf{14}]$$
    *   Decrement `heap_size = 1`.
    *   `MAX-HEAPIFY(A, 0, 1)`: (Node `A[0]=1`)
        *   No children within heap size. No swap. Return.
    *   Heap: `[1]`, Sorted: `[2, 4, 7, 8, 14]`

Loop terminates when `i` reaches 0. The array is fully sorted.

**Final Answer:** $\boxed{[1, 2, 4, 7, 8, 14]}$

**Reflection:** This example demonstrates the full two-phase process. The trickiest part is correctly tracing the recursive `MAX-HEAPIFY` calls and the array state after each swap. Notice how the sorted elements accumulate at the end of the array.

---

### Example 2: Descending Sort (using Min-Heap)

**Problem:** Sort the array $A = [10, 5, 8, 3, 2, 7]$ in descending order using Heap Sort.

**Given:** Unsorted array $A = [10, 5, 8, 3, 2, 7]$.
**Want:** Sorted array $A' = [10, 8, 7, 5, 3, 2]$.

For descending order, we build a **Min-Heap** and repeatedly extract the minimum element (root), placing it at the *beginning* of the sorted portion. Or, more commonly, we build a **Max-Heap** and simply reverse the final output, or place elements from largest to smallest at the *end* of the array, which results in an ascending sorted array, then reverse it.
Let's stick to the standard approach: build a Max-Heap, which sorts in ascending order at the end of the array, then reverse the result. Or, for a true descending sort *in-place*, we would need to adapt the logic to use a Min-Heap and place elements at the beginning. Let's demonstrate building a **Min-Heap** and placing elements from smallest to largest at the end, then reversing. This is more illustrative of how heap choice affects order.

`MIN-HEAPIFY(A, i, heap_size)`:
1.  Find the smallest among $A[i]$, $A[L(i)]$, and $A[R(i)]$ (within `heap_size`).
2.  If $A[i]$ is not the smallest, swap it with the smallest child.
3.  Recursively call `MIN-HEAPIFY` on the child's new position if a swap occurred.

**Phase 1: Build Min-Heap**
Array size $n=6$. Last non-leaf node index: $\lfloor 6/2 \rfloor - 1 = 2$.
We call `MIN-HEAPIFY` for $i = 2, 1, 0$.

1.  **`MIN-HEAPIFY(A, 2, 6)`**: (Node `A[2]=8`)
    *   Children: $L(2)=5$ (`A[5]=7`), $R(2)=6$ (out of bounds).
    *   Smallest among `A[2]=8`, `A[5]=7` is `A[5]=7`.
    *   Swap `A[2]` with `A[5]`.
    *   Array becomes: $$[10, 5, 7, 3, 2, 8]$$
    *   Recursive call: `MIN-HEAPIFY(A, 5, 6)`: No children. Return.
    *   Current array: $$[10, 5, 7, 3, 2, 8]$$
2.  **`MIN-HEAPIFY(A, 1, 6)`**: (Node `A[1]=5`)
    *   Children: $L(1)=3$ (`A[3]=3`), $R(1)=4$ (`A[4]=2`).
    *   Smallest among `A[1]=5`, `A[3]=3`, `A[4]=2` is `A[4]=2`.
    *   Swap `A[1]` with `A[4]`.
    *   Array becomes: $$[10, 2, 7, 3, 5, 8]$$
    *   Recursive call: `MIN-HEAPIFY(A, 4, 6)`: (Node `A[4]=5`)
        *   No children within heap size. No swap. Return.
    *   Current array: $$[10, 2, 7, 3, 5, 8]$$
3.  **`MIN-HEAPIFY(A, 0, 6)`**: (Node `A[0]=10`)
    *   Children: $L(0)=1$ (`A[1]=2`), $R(0)=2$ (`A[2]=7`).
    *   Smallest among `A[0]=10`, `A[1]=2`, `A[2]=7` is `A[1]=2`.
    *   Swap `A[0]` with `A[1]`.
    *   Array becomes: $$[2, 10, 7, 3, 5, 8]$$
    *   Recursive call: `MIN-HEAPIFY(A, 1, 6)`: (Node `A[1]=10`)
        *   Children: $L(1)=3$ (`A[3]=3`), $R(1)=4$ (`A[4]=5`).
        *   Smallest among `A[1]=10`, `A[3]=3`, `A[4]=5` is `A[3]=3`.
        *   Swap `A[1]` with `A[3]`.
        *   Array becomes: $$[2, 3, 7, 10, 5, 8]$$
        *   Recursive call: `MIN-HEAPIFY(A, 3, 6)`: (Node `A[3]=10`)
            *   Children: $L(3)=7$ (out), $R(3)=8$ (out). No children within heap size. No swap. Return.
        *   Return.
    *   Return.

End of Phase 1. The array is now a Min-Heap: $$[2, 3, 7, 10, 5, 8]$$

**Phase 2: Sort by Extraction (for descending order)**
We extract the minimum element (root) and place it at the *end* of the array. This will result in an ascending sorted array. Then we reverse it.
Current `heap_size = 6`. Loop from `i = 5` down to `1`.

1.  **`i = 5`**: (Current heap: `[2, 3, 7, 10, 5, 8]`)
    *   Swap `A[0]` (2) with `A[5]` (8).
    *   Array: $$[8, 3, 7, 10, 5, \mathbf{2}]$$
    *   Decrement `heap_size = 5`.
    *   `MIN-HEAPIFY(A, 0, 5)`: (Node `A[0]=8`)
        *   Children: $L(0)=1$ (`A[1]=3`), $R(0)=2$ (`A[2]=7`).
        *   Smallest is `A[1]=3`. Swap `A[0]` with `A[1]`.
        *   Array: $$[3, 8, 7, 10, 5, \mathbf{2}]$$
        *   Recursive call: `MIN-HEAPIFY(A, 1, 5)`: (Node `A[1]=8`)
            *   Children: $L(1)=3$ (`A[3]=10`), $R(1)=4$ (`A[4]=5`).
            *   Smallest is `A[4]=5`. Swap `A[1]` with `A[4]`.
            *   Array: $$[3, 5, 7, 10, 8, \mathbf{2}]$$
            *   Recursive call: `MIN-HEAPIFY(A, 4, 5)`: (Node `A[4]=8`)
                *   No children within heap size. No swap. Return.
            *   Return.
        *   Return.
    *   Heap: `[3, 5, 7, 10, 8]`, Sorted (ascending): `[2]`

2.  **`i = 4`**: (Current heap: `[3, 5, 7, 10, 8]`)
    *   Swap `A[0]` (3) with `A[4]` (8).
    *   Array: $$[8, 5, 7, 10, \mathbf{3}, \mathbf{2}]$$
    *   Decrement `heap_size = 4`.
    *   `MIN-HEAPIFY(A, 0, 4)`: (Node `A[0]=8`)
        *   Children: $L(0)=1$ (`A[1]=5`), $R(0)=2$ (`A[2]=7`).
        *   Smallest is `A[1]=5`. Swap `A[0]` with `A[1]`.
        *   Array: $$[5, 8, 7, 10, \mathbf{3}, \mathbf{2}]$$
        *   Recursive call: `MIN-HEAPIFY(A, 1, 4)`: (Node `A[1]=8`)
            *   Children: $L(1)=3$ (`A[3]=10`), $R(1)=4$ (out).
            *   Smallest is `A[1]=8`. No swap. Return.
        *   Return.
    *   Heap: `[5, 8, 7, 10]`, Sorted (ascending): `[3, 2]`

3.  **`i = 3`**: (Current heap: `[5, 8, 7, 10]`)
    *   Swap `A[0]` (5) with `A[3]` (10).
    *   Array: $$[10, 8, 7, \mathbf{5}, \mathbf{3}, \mathbf{2}]$$
    *   Decrement `heap_size = 3`.
    *   `MIN-HEAPIFY(A, 0, 3)`: (Node `A[0]=10`)
        *   Children: $L(0)=1$ (`A[1]=8`), $R(0)=2$ (`A[2]=7`).
        *   Smallest is `A[2]=7`. Swap `A[0]` with `A[2]`.
        *   Array: $$[7, 8, 10, \mathbf{5}, \mathbf{3}, \mathbf{2}]$$
        *   Recursive call: `MIN-HEAPIFY(A, 2, 3)`: (Node `A[2]=10`)
            *   No children within heap size. No swap. Return.
        *   Return.
    *   Heap: `[7, 8, 10]`, Sorted (ascending): `[5, 3, 2]`

4.  **`i = 2`**: (Current heap: `[7, 8, 10]`)
    *   Swap `A[0]` (7) with `A[2]` (10).
    *   Array: $$[10, 8, \mathbf{7}, \mathbf{5}, \mathbf{3}, \mathbf{2}]$$
    *   Decrement `heap_size = 2`.
    *   `MIN-HEAPIFY(A, 0, 2)`: (Node `A[0]=10`)
        *   Children: $L(0)=1$ (`A[1]=8`), $R(0)=2$ (out).
        *   Smallest is `A[1]=8`. Swap `A[0]` with `A[1]`.
        *   Array: $$[8, 10, \mathbf{7}, \mathbf{5}, \mathbf{3}, \mathbf{2}]$$
        *   Recursive call: `MIN-HEAPIFY(A, 1, 2)`: (Node `A[1]=10`)
            *   No children within heap size. No swap. Return.
        *   Return.
    *   Heap: `[8, 10]`, Sorted (ascending): `[7, 5, 3, 2]`

5.  **`i = 1`**: (Current heap: `[8, 10]`)
    *   Swap `A[0]` (8) with `A[1]` (10).
    *   Array: $$[10, \mathbf{8}, \mathbf{7}, \mathbf{5}, \mathbf{3}, \mathbf{2}]$$
    *   Decrement `heap_size = 1`.
    *   `MIN-HEAPIFY(A, 0, 1)`: (Node `A[0]=10`)
        *   No children within heap size. No swap. Return.
    *   Heap: `[10]`, Sorted (ascending): `[8, 7, 5, 3, 2]`

Loop terminates. The array is currently sorted in ascending order: $$[10, 8, 7, 5, 3, 2]$$
Wait, this is already descending! Because we used a Min-Heap and placed the *smallest* element at the end of the array, the elements at the end are smallest, and those at the beginning are largest. The result is a descending sorted array.

**Final Answer:** $\boxed{[10, 8, 7, 5, 3, 2]}$

**Reflection:** This example highlights how choosing a Min-Heap instead of a Max-Heap naturally leads to a descending sort when elements are placed at the *end* of the array. If we wanted an ascending sort with a Min-Heap, we would have to place elements at the *beginning* of the array, which would require extra space or more complex indexing. The standard Heap Sort for ascending order uses a Max-Heap and places elements at the end.

---

### Example 3: Array with Duplicates

**Problem:** Sort the array $A = [5, 2, 8, 5, 1, 8, 3]$ in ascending order.

**Given:** Unsorted array $A = [5, 2, 8, 5, 1, 8, 3]$.
**Want:** Sorted array $A' = [1, 2, 3, 5, 5, 8, 8]$.

**Phase 1: Build Max-Heap**
Array size $n=7$. Last non-leaf node index: $\lfloor 7/2 \rfloor - 1 = 3 - 1 = 2$.
We call `MAX-HEAPIFY` for $i = 2, 1, 0$.

1.  **`MAX-HEAPIFY(A, 2, 7)`**: (Node `A[2]=8`)
    *   Children: $L(2)=5$ (`A[5]=8`), $R(2)=6$ (`A[6]=3`).
    *   Largest among `A[2]=8`, `A[5]=8`, `A[6]=3` is `A[2]=8` (or `A[5]=8`). No swap needed if we prefer the current node. If we swap with `A[5]`, it's still 8. Let's assume we pick the first largest child encountered (left child first).
    *   Current array: $$[5, 2, 8, 5, 1, 8, 3]$$
2.  **`MAX-HEAPIFY(A, 1, 7)`**: (Node `A[1]=2`)
    *   Children: $L(1)=3$ (`A[3]=5`), $R(1)=4$ (`A[4]=1`).
    *   Largest among `A[1]=2`, `A[3]=5`, `A[4]=1` is `A[3]=5`.
    *   Swap `A[1]` with `A[3]`.
    *   Array becomes: $$[5, 5, 8, 2, 1, 8, 3]$$
    *   Recursive call: `MAX-HEAPIFY(A, 3, 7)`: (Node `A[3]=2`)
        *   Children: $L(3)=7$ (out), $R(3)=8$ (out). No children. Return.
    *   Current array: $$[5, 5, 8, 2, 1, 8, 3]$$
3.  **`MAX-HEAPIFY(A, 0, 7)`**: (Node `A[0]=5`)
    *   Children: $L(0)=1$ (`A[1]=5`), $R(0)=2$ (`A[2]=8`).
    *   Largest among `A[0]=5`, `A[1]=5`, `A[2]=8` is `A[2]=8`.
    *   Swap `A[0]` with `A[2]`.
    *   Array becomes: $$[8, 5, 5, 2, 1, 8, 3]$$
    *   Recursive call: `MAX-HEAPIFY(A, 2, 7)`: (Node `A[2]=5`)
        *   Children: $L(2)=5$ (`A[5]=8`), $R(2)=6$ (`A[6]=3`).
        *   Largest among `A[2]=5`, `A[5]=8`, `A[6]=3` is `A[5]=8`.
        *   Swap `A[2]` with `A[5]`.
        *   Array becomes: $$[8, 5, 8, 2, 1, 5, 3]$$
        *   Recursive call: `MAX-HEAPIFY(A, 5, 7)`: (Node `A[5]=5`)
            *   No children within heap size. No swap. Return.
        *   Return.
    *   Current array: $$[8, 5, 8, 2, 1, 5, 3]$$

End of Phase 1. The array is now a Max-Heap: $$[8, 5, 8, 2, 1, 5, 3]$$

**Phase 2: Sort by Extraction**
Current `heap_size = 7`. Loop from `i = 6` down to `1`.

1.  **`i = 6`**: (Current heap: `[8, 5, 8, 2, 1, 5, 3]`)
    *   Swap `A[0]` (8) with `A[6]` (3).
    *   Array: $$[3, 5, 8, 2, 1, 5, \mathbf{8}]$$
    *   Decrement `heap_size = 6`.
    *   `MAX-HEAPIFY(A, 0, 6)`: (Node `A[0]=3`)
        *   Children: $L(0)=1$ (`A[1]=5`), $R(0)=2$ (`A[2]=8`).
        *   Largest is `A[2]=8`. Swap `A[0]` with `A[2]`.
        *   Array: $$[8, 5, 3, 2, 1, 5, \mathbf{8}]$$
        *   Recursive call: `MAX-HEAPIFY(A, 2, 6)`: (Node `A[2]=3`)
            *   Children: $L(2)=5$ (`A[5]=5`), $R(2)=6$ (out).
            *   Largest is `A[5]=5`. Swap `A[2]` with `A[5]`.
            *   Array: $$[8, 5, 5, 2, 1, 3, \mathbf{8}]$$
            *   Recursive call: `MAX-HEAPIFY(A, 5, 6)`: (Node `A[5]=3`)
                *   No children within heap size. No swap. Return.
            *   Return.
        *   Return.
    *   Heap: `[8, 5, 5, 2, 1, 3]`, Sorted: `[8]`

2.  **`i = 5`**: (Current heap: `[8, 5, 5, 2, 1, 3]`)
    *   Swap `A[0]` (8) with `A[5]` (3).
    *   Array: $$[3, 5, 5, 2, 1, \mathbf{8}, \mathbf{8}]$$
    *   Decrement `heap_size = 5`.
    *   `MAX-HEAPIFY(A, 0, 5)`: (Node `A[0]=3`)
        *   Children: $L(0)=1$ (`A[1]=5`), $R(0)=2$ (`A[2]=5`).
        *   Largest is `A[1]=5` (or `A[2]=5`). Swap `A[0]` with `A[1]`.
        *   Array: $$[5, 3, 5, 2, 1, \mathbf{8}, \mathbf{8}]$$
        *   Recursive call: `MAX-HEAPIFY(A, 1, 5)`: (Node `A[1]=3`)
            *   Children: $L(1)=3$ (`A[3]=2`), $R(1)=4$ (`A[4]=1`).
            *   Largest is `A[1]=3`. No swap. Return.
        *   Return.
    *   Heap: `[5, 3, 5, 2, 1]`, Sorted: `[8, 8]`

3.  **`i = 4`**: (Current heap: `[5, 3, 5, 2, 1]`)
    *   Swap `A[0]` (5) with `A[4]` (1).
    *   Array: $$[1, 3, 5, 2, \mathbf{5}, \mathbf{8}, \mathbf{8}]$$
    *   Decrement `heap_size = 4`.
    *   `MAX-HEAPIFY(A, 0, 4)`: (Node `A[0]=1`)
        *   Children: $L(0)=1$ (`A[1]=3`), $R(0)=2$ (`A[2]=5`).
        *   Largest is `A[2]=5`. Swap `A[0]` with `A[2]`.
        *   Array: $$[5, 3, 1, 2, \mathbf{5}, \mathbf{8}, \mathbf{8}]$$
        *   Recursive call: `MAX-HEAPIFY(A, 2, 4)`: (Node `A[2]=1`)
            *   Children: $L(2)=5$ (out), $R(2)=6$ (out). No children within heap size. No swap. Return.
        *   Return.
    *   Heap: `[5, 3, 1, 2]`, Sorted: `[5, 8, 8]`

4.  **`i = 3`**: (Current heap: `[5, 3, 1, 2]`)
    *   Swap `A[0]` (5) with `A[3]` (2).
    *   Array: $$[2, 3, 1, \mathbf{5}, \mathbf{5}, \mathbf{8}, \mathbf{8}]$$
    *   Decrement `heap_size = 3`.
    *   `MAX-HEAPIFY(A, 0, 3)`: (Node `A[0]=2`)
        *   Children: $L(0)=1$ (`A[1]=3`), $R(0)=2$ (`A[2]=1`).
        *   Largest is `A[1]=3`. Swap `A[0]` with `A[1]`.
        *   Array: $$[3, 2, 1, \mathbf{5}, \mathbf{5}, \mathbf{8}, \mathbf{8}]$$
        *   Recursive call: `MAX-HEAPIFY(A, 1, 3)`: (Node `A[1]=2`)
            *   Children: $L(1)=3$ (out), $R(1)=4$ (out). No children within heap size. No swap. Return.
        *   Return.
    *   Heap: `[3, 2, 1]`, Sorted: `[5, 5, 8, 8]`

5.  **`i = 2`**: (Current heap: `[3, 2, 1]`)
    *   Swap `A[0]` (3) with `A[2]` (1).
    *   Array: $$[1, 2, \mathbf{3}, \mathbf{5}, \mathbf{5}, \mathbf{8}, \mathbf{8}]$$
    *   Decrement `heap_size = 2`.
    *   `MAX-HEAPIFY(A, 0, 2)`: (Node `A[0]=1`)
        *   Children: $L(0)=1$ (`A[1]=2`), $R(0)=2$ (out).
        *   Largest is `A[1]=2`. Swap `A[0]` with `A[1]`.
        *   Array: $$[2, 1, \mathbf{3}, \mathbf{5}, \mathbf{5}, \mathbf{8}, \mathbf{8}]$$
        *   Recursive call: `MAX-HEAPIFY(A, 1, 2)`: (Node `A[1]=1`)
            *   No children within heap size. No swap. Return.
        *   Return.
    *   Heap: `[2, 1]`, Sorted: `[3, 5, 5, 8, 8]`

6.  **`i = 1`**: (Current heap: `[2, 1]`)
    *   Swap `A[0]` (2) with `A[1]` (1).
    *   Array: $$[1, \mathbf{2}, \mathbf{3}, \mathbf{5}, \mathbf{5}, \mathbf{8}, \mathbf{8}]$$
    *   Decrement `heap_size = 1`.
    *   `MAX-HEAPIFY(A, 0, 1)`: (Node `A[0]=1`)
        *   No children within heap size. No swap. Return.
    *   Heap: `[1]`, Sorted: `[2, 3, 5, 5, 8, 8]`

Loop terminates.

**Final Answer:** $\boxed{[1, 2, 3, 5, 5, 8, 8]}$

**Reflection:** Duplicates don't fundamentally change the algorithm's logic. The heap property still holds (parent $\ge$ children), and `MAX-HEAPIFY` correctly handles equal values by picking one and maintaining the property. The overall steps remain the same.

---

### Example 4: Already Sorted Array (Worst Case for some sorts, not Heap Sort)

**Problem:** Sort the array $A = [1, 2, 3, 4, 5]$ in ascending order.

**Given:** Sorted array $A = [1, 2, 3, 4, 5]$.
**Want:** Sorted array $A' = [1, 2, 3, 4, 5]$.

**Phase 1: Build Max-Heap**
Array size $n=5$. Last non-leaf node index: $\lfloor 5/2 \rfloor - 1 = 1$.
We call `MAX-HEAPIFY` for $i = 1, 0$.

1.  **`MAX-HEAPIFY(A, 1, 5)`**: (Node `A[1]=2`)
    *   Children: $L(1)=3$ (`A[3]=4`), $R(1)=4$ (`A[4]=5`).
    *   Largest among `A[1]=2`, `A[3]=4`, `A[4]=5` is `A[4]=5`.
    *   Swap `A[1]` with `A[4]`.
    *   Array becomes: $$[1, 5, 3, 4, 2]$$
    *   Recursive call: `MAX-HEAPIFY(A, 4, 5)`: (Node `A[4]=2`)
        *   No children within heap size. No swap. Return.
    *   Current array: $$[1, 5, 3, 4, 2]$$
2.  **`MAX-HEAPIFY(A, 0, 5)`**: (Node `A[0]=1`)
    *   Children: $L(0)=1$ (`A[1]=5`), $R(0)=2$ (`A[2]=3`).
    *   Largest among `A[0]=1`, `A[1]=5`, `A[2]=3` is `A[1]=5$.
    *   Swap `A[0]` with `A[1]`.
    *   Array becomes: $$[5, 1, 3, 4, 2]$$
    *   Recursive call: `MAX-HEAPIFY(A, 1, 5)`: (Node `A[1]=1`)
        *   Children: $L(1)=3$ (`A[3]=4`), $R(1)=4$ (`A[4]=2`).
        *   Largest among `A[1]=1`, `A[3]=4`, `A[4]=2` is `A[3]=4$.
        *   Swap `A[1]` with `A[3]`.
        *   Array becomes: $$[5, 4, 3, 1, 2]$$
        *   Recursive call: `MAX-HEAPIFY(A, 3, 5)`: (Node `A[3]=1`)
            *   Children: $L(3)=7$ (out), $R(3)=8$ (out). No children within heap size. No swap. Return.
        *   Return.
    *   Current array: $$[5, 4, 3, 1, 2]$$

End of Phase 1. The array is now a Max-Heap: $$[5, 4, 3, 1, 2]$$
Notice that even a sorted array needs to be re-arranged into a Max-Heap structure.

**Phase 2: Sort by Extraction**
Current `heap_size = 5`. Loop from `i = 4` down to `1`.

1.  **`i = 4`**: (Current heap: `[5, 4, 3, 1, 2]`)
    *   Swap `A[0]` (5) with `A[4]` (2).
    *   Array: $$[2, 4, 3, 1, \mathbf{5}]$$
    *   Decrement `heap_size = 4`.
    *   `MAX-HEAPIFY(A, 0, 4)`: (Node `A[0]=2`)
        *   Children: $L(0)=1$ (`A[1]=4`), $R(0)=2$ (`A[2]=3`).
        *   Largest is `A[1]=4`. Swap `A[0]` with `A[1]`.
        *   Array: $$[4, 2, 3, 1, \mathbf{5}]$$
        *   Recursive call: `MAX-HEAPIFY(A, 1, 4)`: (Node `A[1]=2`)
            *   Children: $L(1)=3$ (`A[3]=1`), $R(1)=4$ (out).
            *   Largest is `A[1]=2`. No swap. Return.
        *   Return.
    *   Heap: `[4, 2, 3, 1]`, Sorted: `[5]`

2.  **`i = 3`**: (Current heap: `[4, 2, 3, 1]`)
    *   Swap `A[0]` (4) with `A[3]` (1).
    *   Array: $$[1, 2, 3, \mathbf{4}, \mathbf{5}]$$
    *   Decrement `heap_size = 3`.
    *   `MAX-HEAPIFY(A, 0, 3)`: (Node `A[0]=1`)
        *   Children: $L(0)=1$ (`A[1]=2`), $R(0)=2$ (`A[2]=3`).
        *   Largest is `A[2]=3`. Swap `A[0]` with `A[2]`.
        *   Array: $$[3, 2, 1, \mathbf{4}, \mathbf{5}]$$
        *   Recursive call: `MAX-HEAPIFY(A, 2, 3)`: (Node `A[2]=1`)
            *   No children within heap size. No swap. Return.
        *   Return.
    *   Heap: `[3, 2, 1]`, Sorted: `[4, 5]`

3.  **`i = 2`**: (Current heap: `[3, 2, 1]`)
    *   Swap `A[0]` (3) with `A[2]` (1).
    *   Array: $$[1, 2, \mathbf{3}, \mathbf{4}, \mathbf{5}]$$
    *   Decrement `heap_size = 2`.
    *   `MAX-HEAPIFY(A, 0, 2)`: (Node `A[0]=1`)
        *   Children: $L(0)=1$ (`A[1]=2`), $R(0)=2$ (out).
        *   Largest is `A[1]=2`. Swap `A[0]` with `A[1]`.
        *   Array: $$[2, 1, \mathbf{3}, \mathbf{4}, \mathbf{5}]$$
        *   Recursive call: `MAX-HEAPIFY(A, 1, 2)`: (Node `A[1]=1`)
            *   No children within heap size. No swap. Return.
        *   Return.
    *   Heap: `[2, 1]`, Sorted: `[3, 4, 5]`

4.  **`i = 1`**: (Current heap: `[2, 1]`)
    *   Swap `A[0]` (2) with `A[1]` (1).
    *   Array: $$[1, \mathbf{2}, \mathbf{3}, \mathbf{4}, \mathbf{5}]$$
    *   Decrement `heap_size = 1`.
    *   `MAX-HEAPIFY(A, 0, 1)`: (Node `A[0]=1`)
        *   No children within heap size. No swap. Return.
    *   Heap: `[1]`, Sorted: `[2, 3, 4, 5]`

Loop terminates.

**Final Answer:** $\boxed{[1, 2, 3, 4, 5]}$

**Reflection:** This example shows that even an already sorted array still undergoes the full Heap Sort process. Unlike algorithms like Insertion Sort or Bubble Sort which can achieve $O(n)$ for nearly sorted data, Heap Sort's performance remains $O(n \log n)$ regardless of the initial order of elements. This consistency is a strength in some applications but a weakness in others.

## 6. Common mistakes and traps

1.  **Off-by-one errors in array indexing:** This is the most frequent mistake. Whether using 0-indexed or 1-indexed arrays for parent/child calculations, consistency is key. For 0-indexed: `left = 2*i + 1`, `right = 2*i + 2`, `parent = (i-1)/2