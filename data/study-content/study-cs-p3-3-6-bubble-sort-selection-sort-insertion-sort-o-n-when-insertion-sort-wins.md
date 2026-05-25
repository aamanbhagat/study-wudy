## 1. What it is — in plain English

Imagine you have a messy pile of things—like a stack of homework papers, a hand of playing cards, or a line of students who need to stand in order of height. Sorting is simply the process of arranging these items in a specific order, usually from smallest to largest (ascending) or largest to smallest (descending).

**Bubble Sort** is like asking people in a line to compare their height with the person right next to them. If they're in the wrong order (e.g., a taller person is before a shorter person, but we want shortest first), they swap places. You repeat this process over and over, making multiple "passes" through the line. Eventually, the tallest people "bubble up" to one end, and the shortest "sink" to the other, just like bubbles in a drink. It's simple, but it takes many, many comparisons and swaps.

**Selection Sort** is like a talent show judge picking the best performer. You look at everyone in the unsorted group, find the absolute shortest person, and move them to the very front of the line. Then, from the *remaining* unsorted people, you find the next shortest and move them to the second spot, and so on. You "select" the next smallest item and "place" it in its correct final position.

**Insertion Sort** is how most people sort a hand of playing cards. You start with one card, which is "sorted" by itself. Then you pick up the next card, find its correct spot among the cards you've already sorted, and "insert" it there, shifting other cards over if necessary. You continue this, taking one new card at a time and inserting it into the growing sorted section of your hand.

All three of these methods are quite intuitive and easy to understand, but they can be very slow if you have a huge number of items to sort.

## 2. Why it matters — real-world applications

While Bubble, Selection, and Insertion Sort are generally not the fastest algorithms for very large datasets, they are far from useless. Understanding them is crucial for foundational computer science knowledge, and they have specific niches where they shine:

1.  **Educational Value and Intuition Building:** These algorithms are often the first sorting algorithms taught because their logic is straightforward and easy to visualize. They build a fundamental understanding of how sorting works, the concept of comparison-based sorting, and the basics of algorithm analysis (like counting operations). This intuition is invaluable before moving on to more complex algorithms like Quicksort or Mergesort. Many computer science curricula, including those at top universities, start with these simple sorts.

2.  **Small Datasets and Embedded Systems:** For very small arrays (e.g., $N < 20$ elements), the overhead of more complex, asymptotically faster algorithms can actually make them slower than these $O(N^2)$ sorts due to constant factors. In resource-constrained environments like embedded systems (e.g., microcontrollers in a smart appliance, a small sensor array in an aerospace system monitoring a few parameters), where memory and processing power are limited, a simple and easy-to-implement $O(N^2)$ sort might be perfectly adequate and even preferred for its simplicity and minimal overhead. For instance, sorting a small buffer of incoming sensor readings from an aircraft's altimeter or a machine learning model's confidence scores for a small number of classes might use such simple sorts.

3.  **Hybrid Sorting Algorithms (Insertion Sort's Niche):** This is where Insertion Sort truly shines and sees significant real-world use. Many advanced, high-performance sorting algorithms like Timsort (used in Python, Java's `Arrays.sort()`) and Introsort (used in C++'s `std::sort`) are "hybrid" algorithms. They don't use a single sorting method throughout. Instead, they typically use a fast $O(N \log N)$ algorithm (like Mergesort or Quicksort) for large partitions, but switch to Insertion Sort for:
    *   **Small partitions:** When the sub-arrays become very small (e.g., less than 15-30 elements), Insertion Sort is often faster than the $O(N \log N)$ algorithm due to its lower constant factor and simpler logic.
    *   **Nearly sorted data:** If a sub-array is already mostly sorted, Insertion Sort performs exceptionally well, often achieving $O(N)$ performance. Hybrid sorts leverage this by using Insertion Sort as a final pass or for sub-arrays that are likely to be nearly sorted after initial partitioning. This is critical in applications where data frequently arrives in a partially ordered state, such as maintaining sorted lists in databases or real-time data streams in financial trading platforms or scientific simulations (e.g., sorting particle positions in a physics simulation where particles only move slightly between frames).

4.  **Interactive Visualizations and Teaching Tools:** Because of their step-by-step, intuitive nature, Bubble Sort, Selection Sort, and Insertion Sort are frequently used in educational software and online visualizations to demonstrate how sorting algorithms work. Their clear progression makes them excellent tools for teaching fundamental algorithmic concepts.

## 3. Prerequisites — what you must know first

Before diving into the intricacies of Bubble, Selection, and Insertion Sort, ensure you have a solid grasp of the following foundational computer science concepts:

*   **Arrays/Lists:** A basic understanding of what an array (or list in Python) is—a collection of elements stored in contiguous memory locations, accessible by an index.
*   **Loops (for and while):** How to iterate over a collection of data using `for` loops and `while` loops, performing actions repeatedly.
*   **Conditional Statements (if-else):** How to make decisions in code based on conditions, such as comparing two values.
*   **Variables and Assignment:** How to declare variables, store values in them, and update those values (e.g., `x = 5`, `x = x + 1`).
*   **Comparison Operators:** How to compare two values using operators like `>` (greater than), `<` (less than), `==` (equal to), `>=` (greater than or equal to), `<=` (less than or equal to), `!=` (not equal to).
*   **Basic Algorithm Analysis (Big O Notation):** A conceptual understanding of what Big O notation represents—how the running time or space requirements of an algorithm grow with the input size ($N$). Specifically, what $O(N)$, $O(N^2)$, and $O(\log N)$ mean in terms of performance scaling.
*   **Swapping Elements:** The common pattern of exchanging the values of two variables, typically requiring a temporary variable (e.g., `temp = a; a = b; b = temp;`).

If any of these concepts feel unfamiliar, it's highly recommended to pause and review them before proceeding, as they form the bedrock for understanding these sorting algorithms.

## 4. The core idea — step by step

Let's break down each sorting algorithm, understand its fundamental mechanism, and then discuss their common $O(N^2)$ complexity and when Insertion Sort offers a unique advantage.

For all examples, we will sort an array of integers in **ascending order**.

### ### Step 1: Bubble Sort

*   **Plain-English Statement:** Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, indicating that the list is sorted. Larger elements "bubble" to the end of the list with each pass.

*   **Small Concrete Example:** Let's sort the array `A = [5, 1, 4, 2, 8]`

    *   **Pass 1:**
        *   Compare (5, 1): $5 > 1$, swap. Array becomes `[1, 5, 4, 2, 8]`
        *   Compare (5, 4): $5 > 4$, swap. Array becomes `[1, 4, 5, 2, 8]`
        *   Compare (5, 2): $5 > 2$, swap. Array becomes `[1, 4, 2, 5, 8]`
        *   Compare (5, 8): $5 \ngtr 8$, no swap. Array remains `[1, 4, 2, 5, 8]`
        *   At the end of Pass 1, the largest element, 8, is in its correct final position.

    *   **Pass 2:** (We only need to compare up to the second-to-last element now, as the last one is sorted)
        *   Compare (1, 4): $1 \ngtr 4$, no swap. Array remains `[1, 4, 2, 5, 8]`
        *   Compare (4, 2): $4 > 2$, swap. Array becomes `[1, 2, 4, 5, 8]`
        *   Compare (4, 5): $4 \ngtr 5$, no swap. Array remains `[1, 2, 4, 5, 8]`
        *   At the end of Pass 2, the next largest element, 5, is in its correct final position.

    *   **Pass 3:** (Compare up to the third-to-last element)
        *   Compare (1, 2): $1 \ngtr 2$, no swap. Array remains `[1, 2, 4, 5, 8]`
        *   Compare (2, 4): $2 \ngtr 4$, no swap. Array remains `[1, 2, 4, 5, 8]`
        *   No swaps occurred in this pass, which means the array is sorted. We can stop early.

    The final sorted array is `[1, 2, 4, 5, 8]`.

*   **The Formal/Mathematical Version (Pseudocode):**
    Let $A$ be an array of $N$ elements.

    ```
    BUBBLE-SORT(A)
        n = A.length
        for i = 0 to n-2         // Outer loop: controls the number of passes
            swapped = false
            for j = 0 to n-2-i   // Inner loop: compares adjacent elements
                if A[j] > A[j+1] // If elements are in wrong order
                    swap A[j], A[j+1] // Exchange them
                    swapped = true
            if swapped == false  // Optimization: if no swaps, array is sorted
                break
    ```
    The `n-2-i` in the inner loop condition is because after each pass `i`, the largest `i+1` elements are guaranteed to be in their correct final positions at the end of the array, so we don't need to compare them again.

*   **What Could Go Wrong:** Bubble Sort performs many swaps, especially for arrays that are far from sorted. Even if the array is nearly sorted, it still needs to make almost a full pass to confirm no swaps are needed (unless the `swapped` flag optimization is used). Its worst-case and average-case time complexity is $O(N^2)$, making it inefficient for large datasets.

### ### Step 2: Selection Sort

*   **Plain-English Statement:** Selection Sort works by repeatedly finding the minimum element (or maximum, depending on order) from the unsorted part of the list and putting it at the beginning of the unsorted part. It "selects" the smallest and "places" it.

*   **Small Concrete Example:** Let's sort the array `A = [64, 25, 12, 22, 11]`

    *   **Iteration 1 (i=0):**
        *   Unsorted part: `[64, 25, 12, 22, 11]`
        *   Find the minimum element in the unsorted part. The minimum is `11` at index 4.
        *   Swap `A[0]` (which is 64) with `A[4]` (which is 11).
        *   Array becomes `[11, 25, 12, 22, 64]`
        *   The first element, 11, is now sorted.

    *   **Iteration 2 (i=1):**
        *   Unsorted part: `[25, 12, 22, 64]` (starting from index 1)
        *   Find the minimum element in the unsorted part. The minimum is `12` at index 2 (of original array).
        *   Swap `A[1]` (which is 25) with `A[2]` (which is 12).
        *   Array becomes `[11, 12, 25, 22, 64]`
        *   The first two elements, 11 and 12, are now sorted.

    *   **Iteration 3 (i=2):**
        *   Unsorted part: `[25, 22, 64]` (starting from index 2)
        *   Find the minimum element. The minimum is `22` at index 3.
        *   Swap `A[2]` (which is 25) with `A[3]` (which is 22).
        *   Array becomes `[11, 12, 22, 25, 64]`
        *   The first three elements are sorted.

    *   **Iteration 4 (i=3):**
        *   Unsorted part: `[25, 64]` (starting from index 3)
        *   Find the minimum element. The minimum is `25` at index 3.
        *   Swap `A[3]` (which is 25) with `A[3]` (which is 25). (No actual change, but conceptually a swap happens).
        *   Array remains `[11, 12, 22, 25, 64]`
        *   The first four elements are sorted. The last element must also be sorted by default.

    The final sorted array is `[11, 12, 22, 25, 64]`.

*   **The Formal/Mathematical Version (Pseudocode):**
    Let $A$ be an array of $N$ elements.

    ```
    SELECTION-SORT(A)
        n = A.length
        for i = 0 to n-2         // Outer loop: marks the boundary of the sorted part
            min_idx = i          // Assume current element is the minimum
            for j = i+1 to n-1   // Inner loop: finds the true minimum in the unsorted part
                if A[j] < A[min_idx]
                    min_idx = j
            // After inner loop, min_idx holds the index of the smallest element
            // in the unsorted part (from i to n-1).
            // Swap the found minimum element with the first element of the unsorted part.
            swap A[i], A[min_idx]
    ```

*   **What Could Go Wrong:** Selection Sort performs $O(N^2)$ comparisons in all cases (best, average, worst) because it always has to scan the entire unsorted portion to find the minimum element. While it performs fewer swaps than Bubble Sort (at most $N-1$ swaps), the number of comparisons remains high, making it inefficient for large datasets. It also isn't stable, meaning the relative order of equal elements might not be preserved.

### ### Step 3: Insertion Sort

*   **Plain-English Statement:** Insertion Sort builds the final sorted array one item at a time. It iterates through the input elements, taking one element at each iteration and inserting it into its correct position within the already sorted part of the array.

*   **Small Concrete Example:** Let's sort the array `A = [12, 11, 13, 5, 6]`

    *   Initially, `[12]` is considered sorted.
    *   **Iteration 1 (i=1):**
        *   `key = A[1]` which is `11`.
        *   Compare `key` (11) with elements in the sorted part `[12]`.
        *   `12 > 11`, so shift `12` one position to the right. Array becomes `[_, 12, 13, 5, 6]`.
        *   Insert `key` (11) into the empty spot. Array becomes `[11, 12, 13, 5, 6]`.
        *   Sorted part: `[11, 12]`

    *   **Iteration 2 (i=2):**
        *   `key = A[2]` which is `13`.
        *   Compare `key` (13) with elements in the sorted part `[11, 12]`.
        *   `12 \ngtr 13`, so `13` is already in its correct place relative to `11, 12`. No shifts needed.
        *   Insert `key` (13). Array remains `[11, 12, 13, 5, 6]`.
        *   Sorted part: `[11, 12, 13]`

    *   **Iteration 3 (i=3):**
        *   `key = A[3]` which is `5`.
        *   Compare `key` (5) with elements in the sorted part `[11, 12, 13]`.
        *   `13 > 5`, shift `13`. Array becomes `[11, 12, _, 13, 6]`.
        *   `12 > 5`, shift `12`. Array becomes `[11, _, 12, 13, 6]`.
        *   `11 > 5`, shift `11`. Array becomes `[_, 11, 12, 13, 6]`.
        *   No more elements to compare. Insert `key` (5). Array becomes `[5, 11, 12, 13, 6]`.
        *   Sorted part: `[5, 11, 12, 13]`

    *   **Iteration 4 (i=4):**
        *   `key = A[4]` which is `6`.
        *   Compare `key` (6) with elements in the sorted part `[5, 11, 12, 13]`.
        *   `13 > 6`, shift `13`. Array becomes `[5, 11, 12, _, 13]`.
        *   `12 > 6`, shift `12`. Array becomes `[5, 11, _, 12, 13]`.
        *   `11 > 6`, shift `11`. Array becomes `[5, _, 11, 12, 13]`.
        *   `5 \ngtr 6`, stop shifting. Insert `key` (6). Array becomes `[5, 6, 11, 12, 13]`.
        *   Sorted part: `[5, 6, 11, 12, 13]`

    The final sorted array is `[5, 6, 11, 12, 13]`.

*   **The Formal/Mathematical Version (Pseudocode):**
    Let $A$ be an array of $N$ elements.

    ```
    INSERTION-SORT(A)
        n = A.length
        for i = 1 to n-1     // Outer loop: iterates through the unsorted part
            key = A[i]       // Element to be inserted
            j = i - 1        // Start comparing with the last element of the sorted part

            // Inner loop: Move elements of A[0...i-1] that are greater than key,
            // to one position ahead of their current position
            while j >= 0 and A[j] > key
                A[j+1] = A[j]
                j = j - 1
            A[j+1] = key     // Place key at its correct position
    ```

*   **What Could Go Wrong:** In the worst-case scenario (e.g., a reverse-sorted array), Insertion Sort performs many shifts for each element, leading to $O(N^2)$ operations. Each element might need to be shifted all the way to the beginning of the already sorted portion.

### ### Step 4: Understanding $O(N^2)$ Complexity

All three algorithms discussed — Bubble Sort, Selection Sort, and Insertion Sort — have a worst-case and average-case time complexity of $O(N^2)$. Let's understand why:

*   **Nested Loops:** The common thread among these algorithms is the presence of two nested loops.
    *   The **outer loop** typically iterates $N-1$ times (or $N$ times, for practical purposes, $N$ being the number of elements). This loop ensures that each element or position in the array is considered for sorting.
    *   The **inner loop** performs comparisons and/or swaps/shifts. In the worst case, this inner loop also iterates roughly $N$ times for each iteration of the outer loop.

*   **Counting Operations:**
    *   **Bubble Sort:** In the worst case, for an array of size $N$:
        *   The first pass performs $N-1$ comparisons.
        *   The second pass performs $N-2$ comparisons.
        *   ...
        *   The last pass performs $1$ comparison.
        *   Total comparisons: $(N-1) + (N-2) + \dots + 1 = \frac{N(N-1)}{2} = O(N^2)$.
        *   Swaps can also be $O(N^2)$ in the worst case.
    *   **Selection Sort:**
        *   The outer loop runs $N-1$ times.
        *   For each iteration $i$ of the outer loop, the inner loop runs $N-1-i$ times to find the minimum.
        *   Total comparisons: $(N-1) + (N-2) + \dots + 1 = \frac{N(N-1)}{2} = O(N^2)$.
        *   Swaps are always $N-1$, which is $O(N)$, but comparisons dominate the complexity.
    *   **Insertion Sort:**
        *   The outer loop runs $N-1$ times.
        *   In the worst case (reverse-sorted array), for each element `key`, the inner `while` loop has to shift all previous $j$ elements.
        *   For $i=1$, up to 1 comparison/shift.
        *   For $i=2$, up to 2 comparisons/shifts.
        *   ...
        *   For $i=N-1$, up to $N-1$ comparisons/shifts.
        *   Total comparisons/shifts: $1 + 2 + \dots + (N-1) = \frac{N(N-1)}{2} = O(N^2)$.

*   **Implication:** An $O(N^2)$ algorithm means that if you double the input size ($N$), the number of operations roughly quadruples ($N^2 \rightarrow (2N)^2 = 4N^2$). This makes them impractical for very large datasets (e.g., millions of elements), where $O(N \log N)$ algorithms are preferred.

### ### Step 5: When Insertion Sort Wins

While all three are $O(N^2)$ in their worst and average cases, Insertion Sort has a distinct advantage in specific scenarios:

*   **Plain-English Statement:** Insertion Sort is remarkably efficient when the array is already "mostly sorted" or "nearly sorted." In such cases, it can perform significantly faster than its $O(N^2)$ worst-case suggests, sometimes approaching $O(N)$ performance. It also tends to be faster than Bubble or Selection Sort for very small arrays due to lower constant factors (fewer operations per comparison/swap in its inner loop).

*   **Small Concrete Example (Nearly Sorted):** Let's sort `A = [1, 2, 4, 3, 5]`

    *   Initially, `[1]` is sorted.
    *   **Iteration 1 (i=1):** `key = 2`. `2` is already in place. `[1, 2, 4, 3, 5]`. Sorted part: `[1, 2]`
    *   **Iteration 2 (i=2):** `key = 4`. `4` is already in place. `[1, 2, 4, 3, 5]`. Sorted part: `[1, 2, 4]`
    *   **Iteration 3 (i=3):** `key = 3`.
        *   Compare `3` with `4`. `4 > 3`, shift `4`. Array: `[1, 2, _, 4, 5]`
        *   Compare `3` with `2`. `2 \ngtr 3`, stop. Insert `3`. Array: `[1, 2, 3, 4, 5]`.
        *   Sorted part: `[1, 2, 3, 4]`
    *   **Iteration 4 (i=4):** `key = 5`. `5` is already in place. `[1, 2, 3, 4, 5]`. Sorted part: `[1, 2, 3, 4, 5]`

    Notice how few shifts and comparisons were needed because the array was almost sorted.

*   **Formal/Mathematical Explanation (Best Case):**
    *   **Best Case for Insertion Sort:** If the array is already sorted, the inner `while` loop condition `A[j] > key` will almost always be false (only one comparison `A[i-1] > A[i]` is needed for each `i`).
    *   In this scenario, for each element `A[i]`, the inner loop runs only once (or zero times if `j` starts at -1 and `A[0]` is the `key`). This means roughly $N$ comparisons and zero shifts.
    *   Therefore, the best-case time complexity for Insertion Sort is $O(N)$.
    *   $$ \sum_{i=1}^{N-1} 1 = N-1 = O(N) $$
    *   In contrast, Bubble Sort (without the `swapped` optimization) and Selection Sort always perform $O(N^2)$ comparisons, even on an already sorted array. With the optimization, Bubble Sort can detect a sorted array in $O(N)$ time (one full pass with no swaps), but its worst case is still $O(N^2)$.

*   **What Could Go Wrong:** Believing that Insertion Sort is *always* faster for small arrays or nearly sorted data without understanding the nuances. For very small $N$, the *constant factors* matter more than the Big O. But for anything beyond a tiny handful of elements, its $O(N)$ best case for nearly sorted data is its true winning condition.

## 5. Worked examples — multiple, with every step shown

Let's walk through detailed examples for each sorting algorithm to solidify understanding.

### Example 1: Bubble Sort
**Problem:** Sort the array $A = [7, 3, 5, 1]$ in ascending order using Bubble Sort.
**Given:** Array $A = [7, 3, 5, 1]$.
**Want:** Sorted array in ascending order.

**Steps:**
Initial Array: $[7, 3, 5, 1]$

**Pass 1 (i=0):** Compare elements from index 0 to $N-2-0 = 2$.
*   **Compare $A[0]$ and $A[1]$:** $(7, 3)$
    *   $7 > 3$ is true.
    *   Swap $A[0]$ and $A[1]$.
    *   Array becomes: $[3, 7, 5, 1]$
    *   *Explanation: The elements 7 and 3 are out of order, so they are exchanged to move the smaller element (3) to the left.*
*   **Compare $A[1]$ and $A[2]$:** $(7, 5)$
    *   $7 > 5$ is true.
    *   Swap $A[1]$ and $A[2]$.
    *   Array becomes: $[3, 5, 7, 1]$
    *   *Explanation: 7 and 5 are out of order, so 5 moves left.*
*   **Compare $A[2]$ and $A[3]$:** $(7, 1)$
    *   $7 > 1$ is true.
    *   Swap $A[2]$ and $A[3]$.
    *   Array becomes: $[3, 5, 1, 7]$
    *   *Explanation: 7 and 1 are out of order, so 1 moves left. At the end of Pass 1, the largest element (7) has "bubbled" to its correct final position at the end of the array.*
*   `swapped = true` for Pass 1.

**Pass 2 (i=1):** Compare elements from index 0 to $N-2-1 = 1$.
*   **Compare $A[0]$ and $A[1]$:** $(3, 5)$
    *   $3 > 5$ is false.
    *   No swap.
    *   Array remains: $[3, 5, 1, 7]$
    *   *Explanation: 3 and 5 are already in ascending order.*
*   **Compare $A[1]$ and $A[2]$:** $(5, 1)$
    *   $5 > 1$ is true.
    *   Swap $A[1]$ and $A[2]$.
    *   Array becomes: $[3, 1, 5, 7]$
    *   *Explanation: 5 and 1 are out of order, so 1 moves left. At the end of Pass 2, the next largest element (5) is in its correct final position.*
*   `swapped = true` for Pass 2.

**Pass 3 (i=2):** Compare elements from index 0 to $N-2-2 = 0$.
*   **Compare $A[0]$ and $A[1]$:** $(3, 1)$
    *   $3 > 1$ is true.
    *   Swap $A[0]$ and $A[1]$.
    *   Array becomes: $[1, 3, 5, 7]$
    *   *Explanation: 3 and 1 are out of order, so 1 moves left. At the end of Pass 3, the next largest element (3) is in its correct final position.*
*   `swapped = true` for Pass 3.

**Pass 4 (i=3):** (Outer loop condition $i \le N-2$ is $3 \le 2$, which is false. Loop terminates.)
    *   Actually, the loop would terminate if `swapped` was false. Let's assume one more pass to show the `swapped` optimization.
    *   If $N=4$, $i$ goes from $0$ to $2$. So Pass 3 is the last one where $i=2$.
    *   Let's re-evaluate the loop bounds. `for i = 0 to n-2` means `i` goes from `0` to `4-2=2`. So 3 passes (for i=0, 1, 2) are expected.

Let's restart the Pass 3 logic using the `swapped` flag:

**Pass 3 (i=2):** Compare elements from index 0 to $N-2-2 = 0$.
*   `swapped = false` at the start of this pass.
*   **Compare $A[0]$ and $A[1]$:** $(3, 1)$
    *   $3 > 1$ is true.
    *   Swap $A[0]$ and $A[1]$.
    *   Array becomes: $[1, 3, 5, 7]$
    *   *Explanation: 3 and 1 are out of order, so 1 moves left.*
*   `swapped` is now `true`.

Since `swapped` was `true` at the end of Pass 3, another pass would normally occur.

**Pass 4 (i=3):** (This pass would actually be $i=0$ to $N-2-3=-1$, which means the inner loop doesn't run. The outer loop `for i = 0 to n-2` would stop after $i=2$ for $N=4$. The `swapped` flag is what matters.)

Let's refine the trace to use the `swapped` flag correctly.

Initial Array: $[7, 3, 5, 1]$

**Outer Loop (Iteration 1: `i=0`)**
*   `swapped = false`
*   Inner Loop (`j` from 0 to $4-2-0=2$):
    *   $j=0$: Compare $A[0]$ (7) and $A[1]$ (3). $7 > 3$. Swap. Array: $[3, 7, 5, 1]$. `swapped = true`.
    *   $j=1$: Compare $A[1]$ (7) and $A[2]$ (5). $7 > 5$. Swap. Array: $[3, 5, 7, 1]$. `swapped = true`.
    *   $j=2$: Compare $A[2]$ (7) and $A[3]$ (1). $7 > 1$. Swap. Array: $[3, 5, 1, 7]$. `swapped = true`.
*   End of Outer Loop Iteration 1. `swapped` is `true`, so continue.

**Outer Loop (Iteration 2: `i=1`)**
*   `swapped = false`
*   Inner Loop (`j` from 0 to $4-2-1=1$):
    *   $j=0$: Compare $A[0]$ (3) and $A[1]$ (5). $3 > 5$ is false. No swap.
    *   $j=1$: Compare $A[1]$ (5) and $A[2]$ (1). $5 > 1$. Swap. Array: $[3, 1, 5, 7]$. `swapped = true`.
*   End of Outer Loop Iteration 2. `swapped` is `true`, so continue.

**Outer Loop (Iteration 3: `i=2`)**
*   `swapped = false`
*   Inner Loop (`j` from 0 to $4-2-2=0$):
    *   $j=0$: Compare $A[0]$ (3) and $A[1]$ (1). $3 > 1$. Swap. Array: $[1, 3, 5, 7]$. `swapped = true`.
*   End of Outer Loop Iteration 3. `swapped` is `true`, so continue.

**Outer Loop (Iteration 4: `i=3`)**
*   The outer loop `for i = 0 to n-2` for $N=4$ means $i$ goes from $0$ to $2$. So, the loop terminates after $i=2$.
*   The `swapped` flag check is *after* the inner loop. If `swapped` is `false` after an outer loop iteration, then `break`.

Let's re-trace again, carefully with the `break` condition.

Initial Array: $[7, 3, 5, 1]$

**Outer Loop `i=0`:**
*   `swapped = false`
*   Inner loop `j=0` to `2`:
    *   $j=0$: $A[0]=7, A[1]=3$. $7>3$. Swap. $A=[3, 7, 5, 1]$. `swapped=true`.
    *   $j=1$: $A[1]=7, A[2]=5$. $7>5$. Swap. $A=[3, 5, 7, 1]$. `swapped=true`.
    *   $j=2$: $A[2]=7, A[3]=1$. $7>1$. Swap. $A=[3, 5, 1, 7]$. `swapped=true`.
*   End inner loop. `swapped` is `true`. Continue outer loop.

**Outer Loop `i=1`:**
*   `swapped = false`
*   Inner loop `j=0` to `1`:
    *   $j=0$: $A[0]=3, A[1]=5$. $3>5$ is false. No swap.
    *   $j=1$: $A[1]=5, A[2]=1$. $5>1$. Swap. $A=[3, 1, 5, 7]$. `swapped=true`.
*   End inner loop. `swapped` is `true`. Continue outer loop.

**Outer Loop `i=2`:**
*   `swapped = false`
*   Inner loop `j=0` to `0`:
    *   $j=0$: $A[0]=3, A[1]=1$. $3>1$. Swap. $A=[1, 3, 5, 7]$. `swapped=true`.
*   End inner loop. `swapped` is `true`. Continue outer loop.

The outer loop `for i = 0 to n-2` (i.e., `0` to `2` for $N=4$) has completed.
The final sorted array is $\boxed{[1, 3, 5, 7]}$.

**Reflection:** This example was tricky because of the `swapped` optimization and ensuring the loop bounds were correctly applied. Even for a small array, Bubble Sort can involve many swaps.

---

### Example 2: Selection Sort
**Problem:** Sort the array $A = [64, 25, 12, 22, 11]$ in ascending order using Selection Sort.
**Given:** Array $A = [64, 25, 12, 22, 11]$.
**Want:** Sorted array in ascending order.

**Steps:**
Initial Array: $[64, 25, 12, 22, 11]$

**Outer Loop (Iteration 1: `i=0`)**
*   `min_idx = 0` (initially assume $A[0]$ is the minimum).
*   Inner Loop (`j` from $i+1=1$ to $N-1=4$):
    *   $j=1$: $A[1]=25$. Is $25 < A[min\_idx]=64$? Yes. `min_idx = 1`.
    *   $j=2$: $A[2]=12$. Is $12 < A[min\_idx]=25$? Yes. `min_idx = 2`.
    *   $j=3$: $A[3]=22$. Is $22 < A[min\_idx]=12$? No.
    *   $j=4$: $A[4]=11$. Is $11 < A[min\_idx]=12$? Yes. `min_idx = 4`.
*   End inner loop. The minimum element in `A[0...4]` is `11` at `min_idx=4`.
*   Swap $A[0]$ (64) and $A[min\_idx]$ (11).
*   Array becomes: $[11, 25, 12, 22, 64]$
*   *Explanation: We found the smallest element in the entire array (11) and placed it at the very beginning.*

**Outer Loop (Iteration 2: `i=1`)**
*   `min_idx = 1` (initially assume $A[1]$ is the minimum of the unsorted part).
*   Inner Loop (`j` from $i+1=2$ to $N-1=4$):
    *   $j=2$: $A[2]=12$. Is $12 < A[min\_idx]=25$? Yes. `min_idx = 2`.
    *   $j=3$: $A[3]=22$. Is $22 < A[min\_idx]=12$? No.
    *   $j=4$: $A[4]=64$. Is $64 < A[min\_idx]=12$? No.
*   End inner loop. The minimum element in `A[1...4]` is `12` at `min_idx=2`.
*   Swap $A[1]$ (25) and $A[min\_idx]$ (12).
*   Array becomes: $[11, 12, 25, 22, 64]$
*   *Explanation: We found the smallest element in the remaining unsorted part (12) and placed it at the second position.*

**Outer Loop (Iteration 3: `i=2`)**
*   `min_idx = 2` (initially assume $A[2]$ is the minimum of the unsorted part).
*   Inner Loop (`j` from $i+1=3$ to $N-1=4$):
    *   $j=3$: $A[3]=22$. Is $22 < A[min\_idx]=25$? Yes. `min_idx = 3`.
    *   $j=4$: $A[4]=64$. Is $64 < A[min\_idx]=22$? No.
*   End inner loop. The minimum element in `A[2...4]` is `22` at `min_idx=3`.
*   Swap $A[2]$ (25) and $A[min\_idx]$ (22).
*   Array becomes: $[11, 12, 22, 25, 64]$
*   *Explanation: We found the smallest element in the remaining unsorted part (22) and placed it at the third position.*

**Outer Loop (Iteration 4: `i=3`)**
*   `min_idx = 3` (initially assume $A[3]$ is the minimum of the unsorted part).
*   Inner Loop (`j` from $i+1=4$ to $N-1=4$):
    *   $j=4$: $A[4]=64$. Is $64 < A[min\_idx]=25$? No.
*   End inner loop. The minimum element in `A[3...4]` is `25` at `min_idx=3`.
*   Swap $A[3]$ (25) and $A[min\_idx]$ (25). (No actual change in array elements).
*   Array remains: $[11, 12, 22, 25, 64]$
*   *Explanation: The element at $A[3]$ was already the smallest in the remaining unsorted part, so it stays in place.*

The outer loop `for i = 0 to n-2` for $N=5$ means $i$ goes from $0$ to $3$. The loop has completed.
The final sorted array is $\boxed{[11, 12, 22, 25, 64]}$.

**Reflection:** Selection Sort always performs the maximum number of comparisons because it must scan the entire unsorted portion in each step to find the minimum. However, it performs relatively few swaps (at most $N-1$), which can be an advantage if writes (swaps) are much more expensive than reads (comparisons).

---

### Example 3: Insertion Sort (General Case)
**Problem:** Sort the array $A = [12, 11, 13, 5, 6]$ in ascending order using Insertion Sort.
**Given:** Array $A = [12, 11, 13, 5, 6]$.
**Want:** Sorted array in ascending order.

**Steps:**
Initial Array: $[12, 11, 13, 5, 6]$

**Outer Loop (Iteration 1: `i=1`)**
*   `key = A[1] = 11`.
*   `j = i - 1 = 0`.
*   Inner Loop (`while j >= 0 and A[j] > key`):
    *   `j=0`: $A[0]=12$. Is $0 \ge 0$ AND $12 > 11$? Yes.
        *   Shift $A[0]$ to $A[1]$. $A[1] = 12$. Array: $[12, 12, 13, 5, 6]$.
        *   Decrement $j$. `j = -1`.
    *   Loop condition `j >= 0` is now false. Exit inner loop.
*   Place `key` at $A[j+1]$. $A[-1+1] = A[0] = 11$.
*   Array becomes: $[11, 12, 13, 5, 6]$
*   *Explanation: We took 11, found its correct place before 12, and inserted it there by shifting 12 right.*

**Outer Loop (Iteration 2: `i=2`)**
*   `key = A[2] = 13$.
*   `j = i - 1 = 1$.
*   Inner Loop (`while j >= 0 and A[j] > key`):
    *   `j=1`: $A[1]=12$. Is $1 \ge 0$ AND $12 > 13$? No.
    *   Loop condition `A[j] > key` is false. Exit inner loop.
*   Place `key` at $A[j+1]$. $A[1+1] = A[2] = 13$. (It's already there).
*   Array remains: $[11, 12, 13, 5, 6]$
*   *Explanation: 13 was already in its correct sorted position relative to 11 and 12, so no shifts were needed.*

**Outer Loop (Iteration 3: `i=3`)**
*   `key = A[3] = 5$.
*   `j = i - 1 = 2$.
*   Inner Loop (`while j >= 0 and A[j] > key`):
    *   `j=2`: $A[2]=13$. Is $2 \ge 0$ AND $13 > 5$? Yes.
        *   Shift $A[2]$ to $A[3]$. $A[3] = 13$. Array: $[11, 12, 13, 13, 6]$.
        *   Decrement $j$. `j = 1`.
    *   `j=1`: $A[1]=12$. Is $1 \ge 0$ AND $12 > 5$? Yes.
        *   Shift $A[1]$ to $A[2]$. $A[2] = 12$. Array: $[11, 12, 12, 13, 6]$.
        *   Decrement $j$. `j = 0`.
    *   `j=0`: $A[0]=11$. Is $0 \ge 0$ AND $11 > 5$? Yes.
        *   Shift $A[0]$ to $A[1]$. $A[1] = 11$. Array: $[11, 11, 12, 13, 6]$.
        *   Decrement $j$. `j = -1`.
    *   Loop condition `j >= 0` is now false. Exit inner loop.
*   Place `key` at $A[j+1]$. $A[-1+1] = A[0] = 5$.
*   Array becomes: $[5, 11, 12, 13, 6]$
*   *Explanation: 5 needed to be shifted past all three elements (13, 12, 11) to reach the beginning of the array.*

**Outer Loop (Iteration 4: `i=4`)**
*   `key = A[4] = 6$.
*   `j = i - 1 = 3$.
*   Inner Loop (`while j >= 0 and A[j] > key`):
    *   `j=3`: $A[3]=13$. Is $3 \ge 0$ AND $13 > 6$? Yes.
        *   Shift $A[3]$ to $A[4]$. $A[4] = 13$. Array: $[5, 11, 12, 13, 13]$.
        *   Decrement $j$. `j = 2`.
    *   `j=2`: $A[2]=12$. Is $2 \ge 0$ AND $12 > 6$? Yes.
        *   Shift $A[2]$ to $A[3]$. $A[3] = 12$. Array: $[5, 11, 12, 12, 13]$.
        *   Decrement $j$. `j = 1`.
    *   `j=1`: $A[1]=11$. Is $1 \ge 0$ AND $11 > 6$? Yes.
        *   Shift $A[1]$ to $A[2]$. $A[2] = 11$. Array: $[5, 11, 11, 12, 13]$.
        *   Decrement $j$. `j = 0`.
    *   `j=0`: $A[0]=5$. Is $0 \ge 0$ AND $5 > 6$? No.
    *   Loop condition `A[j] > key` is false. Exit inner loop.
*   Place `key` at $A[j+1]$. $A[0+1] = A[1] = 6$.
*   Array becomes: $[5, 6, 11, 12, 13]$
*   *Explanation: 6 needed to be shifted past 13, 12, and 11 to its correct position after 5.*

The outer loop `for i = 1 to n-1` for $N=5$ means $i$ goes from $1$ to $4$. The loop has completed.
The final sorted array is $\boxed{[5, 6, 11, 12, 13]}$.

**Reflection:** This example shows that Insertion Sort can involve many shifts in the worst case, similar to the number of comparisons in other $O(N^2)$ sorts. The element `5` and `6` caused significant shifting.

---

### Example 4: Insertion Sort (When it Wins - Nearly Sorted Data)
**Problem:** Sort the array $A = [1, 3, 2, 5, 4]$ in ascending order using Insertion Sort.
**Given:** Array $A = [1, 3, 2, 5, 4]$. (This array is nearly sorted).
**Want:** Sorted array in ascending order.

**Steps:**
Initial Array: $[1, 3, 2, 5, 4]$

**Outer Loop (Iteration 1: `i=1`)**
*   `key = A[1] = 3$.
*   `j = i - 1 = 0`.
*   Inner Loop (`while j >= 0 and A[j] > key`):
    *   `j=0`: $A[0]=1$. Is $0 \ge 0$ AND $1 > 3$? No.
    *   Loop condition `A[j] > key` is false. Exit inner loop.
*   Place `key` at $A[j+1]$. $A[0+1] = A[1] = 3$. (It's already there).
*   Array remains: $[1, 3, 2, 5, 4]$
*   *Explanation: 3 is already in its correct position relative to 1. Only one comparison was needed.*

**Outer Loop (Iteration 2: `i=2`)**
*   `key = A[2] = 2$.
*   `j = i - 1 = 1$.
*   Inner Loop (`while j >= 0 and A[j] > key`):
    *   `j=1`: $A[1]=3$. Is $1 \ge 0$ AND $3 > 2$? Yes.
        *   Shift $A[1]$ to $A[2]$. $A[2] = 3$. Array: $[1, 3, 3, 5, 4]$.
        *   Decrement $j$. `j = 0`.
    *   `j=0`: $A[0]=1$. Is $0 \ge 0$ AND $1 > 2$? No.
    *   Loop condition `A[j] > key` is false. Exit inner loop.
*   Place `key` at $A[j+1]$. $A[0+1] = A[1] = 2$.
*   Array becomes: $[1, 2, 3, 5, 4]$
*   *Explanation: 2 needed to be shifted past 3 to its correct position after 1.*

**Outer Loop (Iteration 3: `i=3`)**
*   `key = A[3] = 5$.
*   `j = i - 1 = 2$.
*   Inner Loop (`while j >= 0 and A[j] > key`):
    *   `j=2`: $A[2]=3$. Is $2 \ge 0$ AND $3 > 5$? No.
    *   Loop condition `A[j] > key` is false. Exit inner loop.
*   Place `key` at $A[j+1]$. $A[2+1] = A[3] = 5$. (It's already there).
*   Array remains: $[1, 2, 3, 5, 4]$
*   *Explanation: 5 is already in its correct position relative to 1, 2, 3. Only one comparison was needed.*

**Outer Loop (Iteration 4: `i=4`)**
*   `key = A[4] = 4$.
*   `j = i - 1 = 3$.
*   Inner Loop (`while j >= 0 and A[j] > key`):
    *   `j=3`: $A[3]=5$. Is $3 \ge 0$ AND $5 > 4$? Yes.
        *   Shift $A[3]$ to $A[4]$. $A[4] =