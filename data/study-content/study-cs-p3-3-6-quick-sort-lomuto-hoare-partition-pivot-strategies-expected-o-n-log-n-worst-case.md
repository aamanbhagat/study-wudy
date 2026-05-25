## 1. What it is — in plain English

Imagine you have a messy stack of papers, all out of order, and you want to sort them by date. Quick Sort is a clever strategy to do this very efficiently. Instead of putting one paper in its exact final spot at a time, Quick Sort takes a "divide and conquer" approach.

Here's how it works: you pick one paper from your stack, let's say a random one, and call it your "pivot." Now, you quickly go through the rest of the papers and separate them into two new stacks: one stack for all papers older than your pivot, and another stack for all papers newer than your pivot. You put your pivot paper exactly between these two new stacks.

Now you have three parts: an "older" stack, your pivot paper in its correct place, and a "newer" stack. The amazing thing is, you don't need to worry about the pivot paper anymore; it's done! You then repeat this whole process (picking a new pivot, dividing, placing) separately for the "older" stack and the "newer" stack, until all your mini-stacks are just single papers, which are naturally sorted.

It's like sorting a huge pile of clothes by first separating them into "small," "medium," and "large" piles using a shirt as a reference, then taking the "small" pile and doing the same thing, and so on. By repeatedly breaking down the big problem into smaller, independent problems, Quick Sort gets the job done surprisingly fast.

## 2. Why it matters — real-world applications

Quick Sort is one of the most widely used sorting algorithms due to its excellent average-case performance and in-place nature (meaning it doesn't need much extra memory). Its efficiency makes it crucial in many computational tasks:

1.  **Database Management Systems:** When you query a large database and ask for results to be sorted (e.g., "ORDER BY price ASC"), the underlying database engine often uses Quick Sort or a hybrid sorting algorithm that incorporates Quick Sort. This allows for fast retrieval and display of ordered data, essential for applications ranging from e-commerce product listings to financial transaction records.
2.  **Operating Systems:** Quick Sort is frequently used in the internal workings of operating systems. For example, when the OS needs to sort a list of processes by priority, or sort files in a directory by size or name for display to the user, efficient sorting is critical for system responsiveness and user experience.
3.  **Machine Learning & Data Analysis:** In many machine learning algorithms, particularly those involving data preprocessing, sorting is a fundamental step. For instance, calculating medians, percentiles, or preparing data for certain statistical models often requires sorting large datasets. Quick Sort's speed on average makes it a go-to choice for handling the massive amounts of data typical in ML.
4.  **Graphics and Image Processing:** Algorithms for rendering graphics, especially those involving depth sorting (determining which objects are in front of others), can utilize Quick Sort. Similarly, in image processing, sorting pixel values might be necessary for certain filters or analysis techniques, where performance is paramount for real-time applications.
5.  **Aerospace and Defense:** In real-time systems, such as those found in avionics or missile guidance, data needs to be processed and sorted extremely quickly. For example, sorting sensor readings by time or magnitude to identify critical events or track multiple targets efficiently. The predictable average performance and minimal memory footprint of Quick Sort make it suitable for embedded systems with strict resource constraints.

## 3. Prerequisites — what you must know first

Before diving deep into Quick Sort, ensure you have a solid grasp of these fundamental concepts:

*   **Arrays:** A basic understanding of contiguous memory blocks used to store collections of elements, accessible by an index.
*   **Recursion:** The concept of a function calling itself to solve smaller instances of the same problem, with a clear base case to stop the recursion.
*   **Divide and Conquer Paradigm:** A problem-solving strategy where a problem is broken into smaller subproblems, solved independently, and then their solutions are combined.
*   **Big O Notation:** How to analyze the time and space complexity of algorithms, understanding concepts like $O(n)$, $O(n \log n)$, $O(n^2)$, and $O(1)$.
*   **Pointers/Indices:** How to use pointers or array indices to access and manipulate elements within an array.
*   **Swapping Elements:** The mechanism to exchange the positions of two elements in an array.

## 4. The core idea — step by step

Quick Sort is a recursive, comparison-based sorting algorithm that employs the **Divide and Conquer** paradigm. The core idea revolves around a process called **partitioning**.

### Step 1: Divide and Conquer Principle

*   **Plain English:** Break a big problem into smaller, similar problems until they're easy to solve, then combine the solutions.
*   **Example:** To sort a list of 100 numbers, don't try to sort all 100 at once. Instead, split it into two lists of about 50 numbers, sort each of those, and then combine them.
*   **Formal/Mathematical:** The overall problem $P(N)$ is transformed into $P(N_1)$ and $P(N_2)$, where $N_1 + N_2 \approx N$.
*   **What could go wrong:** If the "divide" step doesn't create roughly equal-sized subproblems, one subproblem might remain almost as big as the original, defeating the purpose of dividing.

### Step 2: Choose a Pivot

*   **Plain English:** Pick one element from the array. This element will be used as a reference point to divide the other elements. Its final sorted position will be determined during the partitioning step.
*   **Example:** In the array `[5, 2, 8, 1, 9]`, if we pick `5` as the pivot.
*   **Formal/Mathematical:** Given an array $A[p \dots r]$, select an element $A[q]$ where $p \le q \le r$ to be the pivot.
*   **What could go wrong:** The choice of pivot significantly impacts performance. A consistently bad pivot (e.g., always the smallest or largest element) can lead to the worst-case scenario.

### Step 3: Partition the Array (The Heart of Quick Sort)

This is where the magic happens. The goal is to rearrange the array such that all elements less than the pivot come before it, and all elements greater than the pivot come after it. The pivot itself ends up in its final sorted position. There are two primary schemes for partitioning: Lomuto and Hoare.

#### ### 3a. Lomuto Partition Scheme

*   **Plain English:** Imagine you have a fence. You walk through the array. If an element is smaller than the pivot, you move it to the left side of the fence. Everything to the right of the fence is either larger than the pivot or hasn't been checked yet. Finally, you swap the pivot into its correct place.
*   **Small Concrete Example:** Array `A = [3, 8, 1, 4, 7, 5]`, pivot chosen as `5` (last element).
    1.  Initialize `i = p-1` (index for elements smaller than pivot).
    2.  Iterate `j` from `p` to `r-1`.
    3.  If `A[j] <= pivot`:
        *   Increment `i`.
        *   Swap `A[i]` and `A[j]`.
    4.  Finally, swap `A[i+1]` and `A[r]` (the pivot).
    *   Let's trace `[3, 8, 1, 4, 7, 5]` with pivot `5` (at index 5).
        *   `p=0, r=5`. `pivot = A[5] = 5`. `i = -1`.
        *   `j=0, A[0]=3`. `3 <= 5`. `i=0`. Swap `A[0]` and `A[0]` (no change). Array: `[3, 8, 1, 4, 7, 5]`
        *   `j=1, A[1]=8`. `8 > 5`. No swap. Array: `[3, 8, 1, 4, 7, 5]`
        *   `j=2, A[2]=1`. `1 <= 5`. `i=1`. Swap `A[1]` and `A[2]`. Array: `[3, 1, 8, 4, 7, 5]`
        *   `j=3, A[3]=4`. `4 <= 5`. `i=2`. Swap `A[2]` and `A[3]`. Array: `[3, 1, 4, 8, 7, 5]`
        *   `j=4, A[4]=7`. `7 > 5`. No swap. Array: `[3, 1, 4, 8, 7, 5]`
        *   Loop ends. Swap `A[i+1]` (`A[3]`) and `A[r]` (`A[5]`). Swap `8` and `5`.
        *   Result: `[3, 1, 4, 5, 7, 8]`. Pivot `5` is now at index `3`, its final sorted position.
*   **Formal/Mathematical:**
    Given an array $A$ and indices $p$ (start), $r$ (end).
    Let `pivot = A[r]`.
    Let `i = p - 1`.
    For `j` from `p` to `r - 1`:
        If $A[j] \le \text{pivot}$:
            `i = i + 1`
            Swap $A[i]$ with $A[j]$
    Swap $A[i+1]$ with $A[r]$ (the pivot)
    Return `i+1` (the pivot's final index).
*   **What could go wrong:** Lomuto performs more swaps than Hoare in general. It also handles duplicate elements by placing them on the "less than or equal to" side, which can lead to unbalanced partitions if all elements are identical.

#### ### 3b. Hoare Partition Scheme

*   **Plain English:** Pick a pivot (often the first element). Have two pointers, one starting from the left (moving right) and one from the right (moving left). The left pointer skips elements smaller than the pivot. The right pointer skips elements larger than the pivot. When they both stop, it means `left_pointer_element >= pivot` and `right_pointer_element <= pivot`. If the pointers haven't crossed, swap these two elements. Repeat until pointers cross.
*   **Small Concrete Example:** Array `A = [5, 2, 8, 1, 9, 3]`, pivot chosen as `5` (first element).
    1.  Initialize `pivot = A[p]`. `i = p-1`, `j = r+1`.
    2.  Loop indefinitely:
        *   Increment `i` until `A[i] >= pivot`.
        *   Decrement `j` until `A[j] <= pivot`.
        *   If `i < j`: Swap `A[i]` and `A[j]`.
        *   Else (`i >= j`): Return `j` (the split point).
    *   Let's trace `[5, 2, 8, 1, 9, 3]` with pivot `5` (at index 0).
        *   `p=0, r=5`. `pivot = A[0] = 5`. `i = -1`, `j = 6`.
        *   **Iteration 1:**
            *   `i` increments: `A[0]=5`. `5 >= 5`. `i=0`.
            *   `j` decrements: `A[5]=3`. `3 <= 5`. `j=5`.
            *   `i < j` (0 < 5). Swap `A[0]` and `A[5]`. Array: `[3, 2, 8, 1, 9, 5]`
        *   **Iteration 2:**
            *   `i` increments: `A[1]=2`. `2 < 5`. `A[2]=8`. `8 >= 5`. `i=2`.
            *   `j` decrements: `A[4]=9`. `9 > 5`. `A[3]=1`. `1 <= 5`. `j=3`.
            *   `i < j` (2 < 3). Swap `A[2]` and `A[3]`. Array: `[3, 2, 1, 8, 9, 5]`
        *   **Iteration 3:**
            *   `i` increments: `A[3]=8`. `8 >= 5`. `i=3`.
            *   `j` decrements: `A[2]=1`. `1 <= 5`. `j=2`.
            *   `i >= j` (3 >= 2). Loop terminates. Return `j=2`.
        *   Result: `[3, 2, 1, 8, 9, 5]`. The pivot `5` is *not* necessarily in its final sorted position, but all elements to its left (`[3, 2, 1]`) are less than or equal to `5`, and all elements to its right (`[8, 9, 5]`) are greater than or equal to `5`. The subproblems are then `A[0...2]` and `A[3...5]`.
*   **Formal/Mathematical:**
    Given an array $A$ and indices $p$ (start), $r$ (end).
    Let `pivot = A[p]`.
    Let `i = p - 1`.
    Let `j = r + 1`.
    Loop:
        Do `i = i + 1` until $A[i] \ge \text{pivot}$.
        Do `j = j - 1` until $A[j] \le \text{pivot}$.
        If $i < j$:
            Swap $A[i]$ with $A[j]$.
        Else:
            Return `j`.
*   **What could go wrong:** Hoare's scheme is generally more efficient as it performs fewer swaps on average. However, the pivot element is not guaranteed to be in its final sorted position, which means the subproblems are `A[p...j]` and `A[j+1...r]`, and the pivot element is part of one of these subproblems. This can be slightly trickier to implement correctly than Lomuto.

### Step 4: Recursively Sort Sub-arrays

*   **Plain English:** Once the partition step places the pivot in its correct spot, you now have two smaller, unsorted lists (one to the left of the pivot, one to the right). You then apply the *exact same Quick Sort process* to each of these smaller lists independently.
*   **Example:** After partitioning `[3, 1, 4, 5, 7, 8]` with `5` as pivot, we now need to sort `[3, 1, 4]` and `[7, 8]`.
*   **Formal/Mathematical:**
    `QUICKSORT(A, p, r)`:
        If $p < r$:
            `q = PARTITION(A, p, r)`
            `QUICKSORT(A, p, q - 1)`
            `QUICKSORT(A, q + 1, r)`
*   **What could go wrong:** Incorrect base cases for recursion (e.g., `p >= r`) can lead to infinite loops or errors. If the partition is consistently unbalanced, the recursion depth can become very large, leading to stack overflow errors for large inputs.

### Step 5: Pivot Strategies and Performance

*   **Plain English:** How you pick the pivot matters a lot.
    *   **First/Last Element:** Simplest, but bad for already sorted/reverse-sorted arrays.
    *   **Random Element:** Usually good, avoids worst-case for most inputs, but involves a random number generator.
    *   **Median-of-Three:** Pick three elements (e.g., first, middle, last), find their median, and use that as the pivot. This is a common heuristic to get a "good enough" pivot and avoid worst-case behavior more often.
*   **Formal/Mathematical:**
    *   **Expected $O(n \log n)$:** Achieved when partitions are roughly balanced (e.g., $N/2$ and $N/2$). The recurrence relation is $T(n) = 2T(n/2) + O(n)$, which solves to $O(n \log n)$ by the Master Theorem. This typically happens with good pivot selection (random or median-of-three).
    *   **Worst Case $O(n^2)$:** Occurs when partitions are maximally unbalanced (e.g., $N-1$ and $0$). This happens if the pivot is consistently chosen as the smallest or largest element in the sub-array (e.g., sorting an already sorted array using the first element as pivot). The recurrence relation is $T(n) = T(n-1) + T(0) + O(n)$, which simplifies to $T(n) = T(n-1) + O(n)$, solving to $O(n^2)$.
*   **What could go wrong:** A naive pivot strategy (like always picking the first element) can easily lead to $O(n^2)$ performance on common inputs like already sorted arrays, making Quick Sort slower than other algorithms like Merge Sort.

## 5. Worked examples — multiple, with every step shown

We will primarily use the **Lomuto Partition Scheme** for these examples, as it's often easier to trace and understand the pivot's final placement. The pivot will be chosen as the **last element** of the current sub-array.

### Example 1: Basic Array (Lomuto Partition)

**Problem:** Sort the array `[7, 2, 1, 6, 8, 3, 5]` using Quick Sort with Lomuto partition (last element as pivot).

**Given:** Array `A = [7, 2, 1, 6, 8, 3, 5]`, `p=0`, `r=6`.
**Want:** Sorted array.

---

**Initial Call: `QUICKSORT(A, 0, 6)`**
*   `p=0`, `r=6`. `p < r` is true.
*   Call `PARTITION(A, 0, 6)`:
    *   `pivot = A[6] = 5`.
    *   `i = p - 1 = -1`.
    *   **Loop `j` from `0` to `5`:**
        *   `j=0`, `A[0]=7`. `7 <= 5` is false.
        *   `j=1`, `A[1]=2`. `2 <= 5` is true.
            *   `i = 0`.
            *   Swap `A[0]` (7) and `A[1]` (2).
            *   Array: `[2, 7, 1, 6, 8, 3, 5]`
        *   `j=2`, `A[2]=1`. `1 <= 5` is true.
            *   `i = 1`.
            *   Swap `A[1]` (7) and `A[2]` (1).
            *   Array: `[2, 1, 7, 6, 8, 3, 5]`
        *   `j=3`, `A[3]=6`. `6 <= 5` is false.
        *   `j=4`, `A[4]=8`. `8 <= 5` is false.
        *   `j=5`, `A[5]=3`. `3 <= 5` is true.
            *   `i = 2`.
            *   Swap `A[2]` (7) and `A[5]` (3).
            *   Array: `[2, 1, 3, 6, 8, 7, 5]`
    *   **End of loop.**
    *   Swap `A[i+1]` (`A[3]`, which is 6) and `A[r]` (`A[6]`, which is 5).
    *   Array: `[2, 1, 3, 5, 8, 7, 6]`
    *   Return `q = i+1 = 3`. (Pivot `5` is now at index `3`).

*   Now recursively call:
    1.  `QUICKSORT(A, 0, 2)` (left sub-array `[2, 1, 3]`)
    2.  `QUICKSORT(A, 4, 6)` (right sub-array `[8, 7, 6]`)

---

**Recursive Call 1: `QUICKSORT(A, 0, 2)` for `[2, 1, 3]`**
*   `p=0`, `r=2`. `p < r` is true.
*   Call `PARTITION(A, 0, 2)`:
    *   `pivot = A[2] = 3`.
    *   `i = p - 1 = -1`.
    *   **Loop `j` from `0` to `1`:**
        *   `j=0`, `A[0]=2`. `2 <= 3` is true.
            *   `i = 0`.
            *   Swap `A[0]` (2) and `A[0]` (2).
            *   Array: `[2, 1, 3, 5, 8, 7, 6]` (no change to relevant part)
        *   `j=1`, `A[1]=1`. `1 <= 3` is true.
            *   `i = 1`.
            *   Swap `A[1]` (1) and `A[1]` (1).
            *   Array: `[2, 1, 3, 5, 8, 7, 6]` (no change to relevant part)
    *   **End of loop.**
    *   Swap `A[i+1]` (`A[2]`, which is 3) and `A[r]` (`A[2]`, which is 3).
    *   Array: `[2, 1, 3, 5, 8, 7, 6]` (no change to relevant part)
    *   Return `q = i+1 = 2`. (Pivot `3` is now at index `2`).

*   Now recursively call:
    1.  `QUICKSORT(A, 0, 1)` (left sub-array `[2, 1]`)
    2.  `QUICKSORT(A, 3, 2)` (right sub-array - `p=3, r=2`. `p < r` is false, so this call does nothing.)

---

**Recursive Call 1.1: `QUICKSORT(A, 0, 1)` for `[2, 1]`**
*   `p=0`, `r=1`. `p < r` is true.
*   Call `PARTITION(A, 0, 1)`:
    *   `pivot = A[1] = 1`.
    *   `i = p - 1 = -1`.
    *   **Loop `j` from `0` to `0`:**
        *   `j=0`, `A[0]=2`. `2 <= 1` is false.
    *   **End of loop.**
    *   Swap `A[i+1]` (`A[0]`, which is 2) and `A[r]` (`A[1]`, which is 1).
    *   Array: `[1, 2, 3, 5, 8, 7, 6]`
    *   Return `q = i+1 = 0`. (Pivot `1` is now at index `0`).

*   Now recursively call:
    1.  `QUICKSORT(A, 0, -1)` (left sub-array - `p=0, r=-1`. `p < r` is false, does nothing.)
    2.  `QUICKSORT(A, 1, 1)` (right sub-array - `p=1, r=1`. `p < r` is false, does nothing.)

---

**Recursive Call 2: `QUICKSORT(A, 4, 6)` for `[8, 7, 6]`**
*   `p=4`, `r=6`. `p < r` is true.
*   Call `PARTITION(A, 4, 6)`:
    *   `pivot = A[6] = 6`.
    *   `i = p - 1 = 3`.
    *   **Loop `j` from `4` to `5`:**
        *   `j=4`, `A[4]=8`. `8 <= 6` is false.
        *   `j=5`, `A[5]=7`. `7 <= 6` is false.
    *   **End of loop.**
    *   Swap `A[i+1]` (`A[4]`, which is 8) and `A[r]` (`A[6]`, which is 6).
    *   Array: `[1, 2, 3, 5, 6, 7, 8]`
    *   Return `q = i+1 = 4`. (Pivot `6` is now at index `4`).

*   Now recursively call:
    1.  `QUICKSORT(A, 4, 3)` (left sub-array - `p=4, r=3`. `p < r` is false, does nothing.)
    2.  `QUICKSORT(A, 5, 6)` (right sub-array `[7, 8]`)

---

**Recursive Call 2.1: `QUICKSORT(A, 5, 6)` for `[7, 8]`**
*   `p=5`, `r=6`. `p < r` is true.
*   Call `PARTITION(A, 5, 6)`:
    *   `pivot = A[6] = 8`.
    *   `i = p - 1 = 4`.
    *   **Loop `j` from `5` to `5`:**
        *   `j=5`, `A[5]=7`. `7 <= 8` is true.
            *   `i = 5`.
            *   Swap `A[5]` (7) and `A[5]` (7).
            *   Array: `[1, 2, 3, 5, 6, 7, 8]` (no change to relevant part)
    *   **End of loop.**
    *   Swap `A[i+1]` (`A[6]`, which is 8) and `A[r]` (`A[6]`, which is 8).
    *   Array: `[1, 2, 3, 5, 6, 7, 8]` (no change to relevant part)
    *   Return `q = i+1 = 6`. (Pivot `8` is now at index `6`).

*   Now recursively call:
    1.  `QUICKSORT(A, 5, 5)` (left sub-array - `p=5, r=5`. `p < r` is false, does nothing.)
    2.  `QUICKSORT(A, 7, 6)` (right sub-array - `p=7, r=6`. `p < r` is false, does nothing.)

---

All recursive calls have finished.

**Final Answer:** The sorted array is $\boxed{[1, 2, 3, 5, 6, 7, 8]}$

**Reflection:** This example was straightforward, demonstrating the basic flow. The Lomuto partition scheme clearly places the pivot in its final sorted position at each step.

### Example 2: Array with Duplicates (Lomuto Partition)

**Problem:** Sort the array `[4, 2, 4, 1, 3, 4]` using Quick Sort with Lomuto partition (last element as pivot).

**Given:** Array `A = [4, 2, 4, 1, 3, 4]`, `p=0`, `r=5`.
**Want:** Sorted array.

---

**Initial Call: `QUICKSORT(A, 0, 5)`**
*   `p=0`, `r=5`. `p < r` is true.
*   Call `PARTITION(A, 0, 5)`:
    *   `pivot = A[5] = 4`.
    *   `i = p - 1 = -1`.
    *   **Loop `j` from `0` to `4`:**
        *   `j=0`, `A[0]=4`. `4 <= 4` is true.
            *   `i = 0`.
            *   Swap `A[0]` (4) and `A[0]` (4).
            *   Array: `[4, 2, 4, 1, 3, 4]`
        *   `j=1`, `A[1]=2`. `2 <= 4` is true.
            *   `i = 1`.
            *   Swap `A[1]` (2) and `A[1]` (2).
            *   Array: `[4, 2, 4, 1, 3, 4]`
        *   `j=2`, `A[2]=4`. `4 <= 4` is true.
            *   `i = 2`.
            *   Swap `A[2]` (4) and `A[2]` (4).
            *   Array: `[4, 2, 4, 1, 3, 4]`
        *   `j=3`, `A[3]=1`. `1 <= 4` is true.
            *   `i = 3`.
            *   Swap `A[3]` (1) and `A[3]` (1).
            *   Array: `[4, 2, 4, 1, 3, 4]`
        *   `j=4`, `A[4]=3`. `3 <= 4` is true.
            *   `i = 4`.
            *   Swap `A[4]` (3) and `A[4]` (3).
            *   Array: `[4, 2, 4, 1, 3, 4]`
    *   **End of loop.**
    *   Swap `A[i+1]` (`A[5]`, which is 4) and `A[r]` (`A[5]`, which is 4).
    *   Array: `[4, 2, 4, 1, 3, 4]` (No actual change, but conceptually, the pivot is placed).
    *   Return `q = i+1 = 5`. (Pivot `4` is now at index `5`).

*   Now recursively call:
    1.  `QUICKSORT(A, 0, 4)` (left sub-array `[4, 2, 4, 1, 3]`)
    2.  `QUICKSORT(A, 6, 5)` (right sub-array - `p=6, r=5`. `p < r` is false, does nothing.)

---

**Recursive Call 1: `QUICKSORT(A, 0, 4)` for `[4, 2, 4, 1, 3]`**
*   `p=0`, `r=4`. `p < r` is true.
*   Call `PARTITION(A, 0, 4)`:
    *   `pivot = A[4] = 3`.
    *   `i = p - 1 = -1`.
    *   **Loop `j` from `0` to `3`:**
        *   `j=0`, `A[0]=4`. `4 <= 3` is false.
        *   `j=1`, `A[1]=2`. `2 <= 3` is true.
            *   `i = 0`.
            *   Swap `A[0]` (4) and `A[1]` (2).
            *   Array: `[2, 4, 4, 1, 3, 4]`
        *   `j=2`, `A[2]=4`. `4 <= 3` is false.
        *   `j=3`, `A[3]=1`. `1 <= 3` is true.
            *   `i = 1`.
            *   Swap `A[1]` (4) and `A[3]` (1).
            *   Array: `[2, 1, 4, 4, 3, 4]`
    *   **End of loop.**
    *   Swap `A[i+1]` (`A[2]`, which is 4) and `A[r]` (`A[4]`, which is 3).
    *   Array: `[2, 1, 3, 4, 4, 4]`
    *   Return `q = i+1 = 2`. (Pivot `3` is now at index `2`).

*   Now recursively call:
    1.  `QUICKSORT(A, 0, 1)` (left sub-array `[2, 1]`)
    2.  `QUICKSORT(A, 3, 4)` (right sub-array `[4, 4]`)

---

**Recursive Call 1.1: `QUICKSORT(A, 0, 1)` for `[2, 1]`**
*   `p=0`, `r=1`. `p < r` is true.
*   Call `PARTITION(A, 0, 1)`:
    *   `pivot = A[1] = 1`.
    *   `i = p - 1 = -1`.
    *   **Loop `j` from `0` to `0`:**
        *   `j=0`, `A[0]=2`. `2 <= 1` is false.
    *   **End of loop.**
    *   Swap `A[i+1]` (`A[0]`, which is 2) and `A[r]` (`A[1]`, which is 1).
    *   Array: `[1, 2, 3, 4, 4, 4]`
    *   Return `q = i+1 = 0`. (Pivot `1` is now at index `0`).

*   Now recursively call:
    1.  `QUICKSORT(A, 0, -1)` (does nothing)
    2.  `QUICKSORT(A, 1, 1)` (does nothing)

---

**Recursive Call 1.2: `QUICKSORT(A, 3, 4)` for `[4, 4]`**
*   `p=3`, `r=4`. `p < r` is true.
*   Call `PARTITION(A, 3, 4)`:
    *   `pivot = A[4] = 4`.
    *   `i = p - 1 = 2`.
    *   **Loop `j` from `3` to `3`:**
        *   `j=3`, `A[3]=4`. `4 <= 4` is true.
            *   `i = 3`.
            *   Swap `A[3]` (4) and `A[3]` (4).
            *   Array: `[1, 2, 3, 4, 4, 4]`
    *   **End of loop.**
    *   Swap `A[i+1]` (`A[4]`, which is 4) and `A[r]` (`A[4]`, which is 4).
    *   Array: `[1, 2, 3, 4, 4, 4]`
    *   Return `q = i+1 = 4`. (Pivot `4` is now at index `4`).

*   Now recursively call:
    1.  `QUICKSORT(A, 3, 3)` (does nothing)
    2.  `QUICKSORT(A, 5, 4)` (does nothing)

---

All recursive calls have finished.

**Final Answer:** The sorted array is $\boxed{[1, 2, 3, 4, 4, 4]}$

**Reflection:** This example shows that Lomuto's partition handles duplicates by placing them on the "less than or equal to" side. This can sometimes lead to unbalanced partitions if many elements are equal to the pivot, but it still correctly sorts.

### Example 3: Already Sorted Array (Lomuto Partition - Worst Case)

**Problem:** Sort the array `[1, 2, 3, 4, 5]` using Quick Sort with Lomuto partition (last element as pivot).

**Given:** Array `A = [1, 2, 3, 4, 5]`, `p=0`, `r=4`.
**Want:** Sorted array.

---

**Initial Call: `QUICKSORT(A, 0, 4)`**
*   `p=0`, `r=4`. `p < r` is true.
*   Call `PARTITION(A, 0, 4)`:
    *   `pivot = A[4] = 5`.
    *   `i = p - 1 = -1`.
    *   **Loop `j` from `0` to `3`:**
        *   `j=0`, `A[0]=1`. `1 <= 5` is true. `i=0`. Swap `A[0]` and `A[0]`. Array: `[1, 2, 3, 4, 5]`
        *   `j=1`, `A[1]=2`. `2 <= 5` is true. `i=1`. Swap `A[1]` and `A[1]`. Array: `[1, 2, 3, 4, 5]`
        *   `j=2`, `A[2]=3`. `3 <= 5` is true. `i=2`. Swap `A[2]` and `A[2]`. Array: `[1, 2, 3, 4, 5]`
        *   `j=3`, `A[3]=4`. `4 <= 5` is true. `i=3`. Swap `A[3]` and `A[3]`. Array: `[1, 2, 3, 4, 5]`
    *   **End of loop.**
    *   Swap `A[i+1]` (`A[4]`, which is 5) and `A[r]` (`A[4]`, which is 5).
    *   Array: `[1, 2, 3, 4, 5]`
    *   Return `q = i+1 = 4`. (Pivot `5` is now at index `4`).

*   Now recursively call:
    1.  `QUICKSORT(A, 0, 3)` (left sub-array `[1, 2, 3, 4]`)
    2.  `QUICKSORT(A, 5, 4)` (right sub-array - does nothing)

---

**Recursive Call 1: `QUICKSORT(A, 0, 3)` for `[1, 2, 3, 4]`**
*   `p=0`, `r=3`. `p < r` is true.
*   Call `PARTITION(A, 0, 3)`:
    *   `pivot = A[3] = 4`.
    *   `i = p - 1 = -1`.
    *   **Loop `j` from `0` to `2`:**
        *   `j=0`, `A[0]=1`. `1 <= 4` is true. `i=0`. Swap `A[0]` and `A[0]`. Array: `[1, 2, 3, 4, 5]`
        *   `j=1`, `A[1]=2`. `2 <= 4` is true. `i=1`. Swap `A[1]` and `A[1]`. Array: `[1, 2, 3, 4, 5]`
        *   `j=2`, `A[2]=3`. `3 <= 4` is true. `i=2`. Swap `A[2]` and `A[2]`. Array: `[1, 2, 3, 4, 5]`
    *   **End of loop.**
    *   Swap `A[i+1]` (`A[3]`, which is 4) and `A[r]` (`A[3]`, which is 4).
    *   Array: `[1, 2, 3, 4, 5]`
    *   Return `q = i+1 = 3`. (Pivot `4` is now at index `3`).

*   Now recursively call:
    1.  `QUICKSORT(A, 0, 2)` (left sub-array `[1, 2, 3]`)
    2.  `QUICKSORT(A, 4, 3)` (right sub-array - does nothing)

---

This pattern will continue. Each partition step will place the largest remaining element at the end, and the left sub-array will always be `N-1` elements long, while the right sub-array is empty.

**Final Answer:** The sorted array is $\boxed{[1, 2, 3, 4, 5]}$

**Reflection:** This example demonstrates the **worst-case scenario** for Quick Sort when using the last element as a pivot on an already sorted array. Each partition results in one sub-array of size $N-1$ and another of size $0$. This leads to $N$ levels of recursion, with each level doing $O(N)$ work, resulting in an overall $O(N^2)$ time complexity. This is why pivot selection strategies are so important.

### Example 4: Hoare Partition Scheme

**Problem:** Sort the array `[5, 2, 8, 1, 9, 3]` using Quick Sort with Hoare partition (first element as pivot).

**Given:** Array `A = [5, 2, 8, 1, 9, 3]`, `p=0`, `r=5`.
**Want:** Sorted array.

---

**Initial Call: `QUICKSORT(A, 0, 5)`**
*   `p=0`, `r=5`. `p < r` is true.
*   Call `PARTITION(A, 0, 5)`:
    *   `pivot = A[0] = 5`.
    *   `i = p - 1 = -1`.
    *   `j = r + 1 = 6`.
    *   **Loop:**
        *   `i` increments:
            *   `i=0, A[0]=5`. `5 >= 5` is true. Stop `i` at `0`.
        *   `j` decrements:
            *   `j=5, A[5]=3`. `3 <= 5` is true. Stop `j` at `5`.
        *   `i < j` (0 < 5) is true. Swap `A[0]` (5) and `A[5]` (3).
        *   Array: `[3, 2, 8, 1, 9, 5]`
        *   **Loop:**
            *   `i` increments:
                *   `i=1, A[1]=2`. `2 >= 5` is false.
                *   `i=2, A[2]=8`. `8 >= 5` is true. Stop `i` at `2`.
            *   `j` decrements:
                *   `j=4, A[4]=9`. `9 <= 5` is false.
                *   `j=3, A[3]=1`. `1 <= 5` is true. Stop `j` at `3`.
            *   `i < j` (2 < 3) is true. Swap `A[2]` (8) and `A[3]` (1).
            *   Array: `[3, 2, 1, 8, 9, 5]`
        *   **Loop:**
            *   `i` increments:
                *   `i=3, A[3]=8`. `8 >= 5` is true. Stop `i` at `3`.
            *   `j` decrements:
                *   `j=2, A[2]=1`. `1 <= 5` is true. Stop `j` at `2`.
            *   `i < j` (3 < 2) is false. Break loop.
    *   Return `q = j = 2`. (The split point is index `2`).

*   Now recursively call:
    1.  `QUICKSORT(A, 0, 2)` (left sub-array `[3, 2, 1]`)
    2.  `QUICKSORT(A, 3, 5)` (right sub-array `[8, 9, 5]`)

---

**Recursive Call 1: `QUICKSORT(A, 0, 2)` for `[3, 2, 1]`**
*   `p=0`, `r=2`. `p < r` is true.
*   Call `PARTITION(A, 0, 2)`:
    *   `pivot = A[0] = 3`.
    *   `i = -1`, `j = 3`.
    *   **Loop:**
        *   `i` increments: `A[0]=3`. `i=0`.
        *   `j` decrements: `A[2]=1`. `j=2`.
        *   `i < j` (0 < 2) is true. Swap `A[0]` (3) and `A[2]` (1).
        *   Array: `[1, 2, 3, 8, 9, 5]`
        *   **Loop:**
            *   `i` increments: `A[1]=2`. `A[2]=3`. `i=2`.
            *   `j` decrements: `A[1]=2`. `j=1`.
            *   `i < j` (2 < 1) is false. Break loop.
    *   Return `q = j = 1`. (The split point is index `1`).

*   Now recursively call:
    1.  `QUICKSORT(A, 0, 1)` (left sub-array `[1, 2]`)
    2.  `QUICKSORT(A, 2, 2)` (right sub-array - does nothing)

---

**Recursive Call 1.1: `QUICKSORT(A, 0, 1)` for `[1, 2]`**
*   `p=0`, `r=1`. `p < r` is true.
*   Call `PARTITION(A, 0, 1)`:
    *   `pivot = A[0] = 1`.
    *   `i = -1`, `j = 2`.
    *   **Loop:**
        *   `i` increments: `A[0]=1`. `i=0`.
        *   `j` decrements: `A[1]=2`. `A[0]=1`. `j=0`.
        *   `i < j` (0 < 0) is false. Break loop.
    *   Return `q = j = 0`.

*   Now recursively call:
    1.  `QUICKSORT(A, 0, 0)` (does nothing)
    2.  `QUICKSORT(A, 1, 1)` (does nothing)

---

**Recursive Call 2: `QUICKSORT(A, 3, 5)` for `[8, 9, 5]`**
*   `p=3`, `r=5`. `p < r` is true.
*   Call `PARTITION(A, 3, 5)`:
    *   `pivot = A[3] = 8`.
    *   `i = 2`, `j = 6`.
    *   **Loop:**
        *   `i` increments: `A[3]=8`. `i=3`.
        *   `j` decrements: `A[5]=5`. `j=5`.
        *   `i < j` (3 < 5) is true. Swap `A[3]` (8) and `A[5]` (5).
        *   Array: `[1, 2, 3, 5, 9, 8]`
        *   **Loop:**
            *   `i` increments: `A[4]=9`. `i=4`.
            *   `j` decrements: `A[4]=9`. `A[3]=5`. `j=3`.
            *   `i < j` (4 < 3) is false. Break loop.
    *   Return `q = j = 3`.

*   Now recursively call:
    1.  `QUICKSORT(A, 3, 3)` (does nothing)
    2.  `QUICKSORT(A, 4, 5)` (right sub-array `[9, 8]`)

---

**Recursive Call 2.1: `QUICKSORT(A, 4, 5)` for `[9, 8]`**
*   `p=4`, `r=5`. `p < r` is true.
*   Call `PARTITION(A, 4, 5)`:
    *   `pivot = A[4] = 9`.
    *   `i = 3`, `j = 6`.
    *   **Loop:**
        *   `i` increments: `A[4]=9`. `i=4`.
        *   `j` decrements: `A[5]=8`. `j=5`.
        *   `i < j` (4 < 5) is true. Swap `A[4]` (9) and `A[5]` (8).
        *   Array: `[1, 2, 3, 5, 8, 9]`
        *   **Loop:**
            *   `i` increments: `A[5]=9`. `i=5`.
            *   `j` decrements: `A[4]=8`. `j=4`.
            *   `i < j` (5 < 4) is false. Break loop.
    *   Return `q = j = 4`.

*   Now recursively call:
    1.  `QUICKSORT(A, 4, 4)` (does nothing)
    2.  `QUICKSORT(A, 5, 5)` (does nothing)

---

All recursive calls have finished.

**Final Answer:** The sorted array is $\boxed{[1, 2, 3, 5, 8, 9]}$

**Reflection:** Hoare's partition is generally more efficient because it performs fewer swaps on average. However, it's conceptually different because the pivot element is *not* guaranteed to be in its final sorted position after partitioning. Instead, the partition returns an index `j` such that all elements in `A[p...j]` are less than or equal to `A[j]` (and therefore less than or equal to the original pivot), and all elements in `A[j+1...r]` are greater than or equal to `A[j+1]` (and therefore greater than or equal to the original pivot). The recursive calls are `QUICKSORT(A, p, j)` and `QUICKSORT(A, j+1, r)`. This can be a source of confusion if one expects the pivot to be fixed like in Lomuto's scheme.

## 6. Common mistakes and traps

1.  **Incorrect Base Case for Recursion:** Forgetting to define `if (p < r)` or using `if (p >= r)` to stop the recursion. This can lead to infinite recursion and stack overflow errors.
2.  **Off-by-One Errors in Partition Indices:** Especially common in the Lomuto scheme (`i = p-1` vs. `i = p`) or in the recursive calls (`q-1` vs. `q`, `q+1` vs. `q+2`). Incorrect indices can lead to missing elements, out-of-bounds access, or incorrect partitioning.
3.  **Bad Pivot Selection:** Always choosing the first or last element for a pivot. While simple, this leads to $O(N^2)$ worst-case performance on already sorted or reverse-sorted arrays, which are common test cases.
4.  **Infinite Loops in Hoare's Partition:** If `i` or `j` pointers don't correctly stop, or if the `i < j` condition is mishandled, the pointers might never cross, leading to an infinite loop. This often happens if the `do-while` loops are not structured carefully to handle elements equal to the pivot.
5.  **Not Handling Duplicates Correctly:** While Quick Sort works with duplicates, some naive implementations or partition schemes might perform poorly or even incorrectly if not designed to handle elements equal to the pivot properly (e.g., always placing them on one side, leading to unbalanced partitions).
6.  **Modifying the Array Outside the Partition Boundaries:** Accidentally swapping elements outside the `[p, r]` range of the current sub-array, corrupting other parts of the array or causing unexpected behavior.

## 7. Textbook-precise explanation

Quick Sort is a sorting algorithm that, like Merge Sort, is based on the **divide-and-conquer paradigm**. Its average-case running time is $O(n \log n)$, but its worst-case running time is $O(n^2)$. In practice, Quick Sort is often the fastest sorting algorithm due to its small hidden constant factors in its $O(n \log n)$ average case.

The algorithm proceeds as follows:

1.  **Divide:** Pick an element from the array, called a **pivot**. Rearrange the elements in the array such that all elements less than the pivot come before it, and all elements greater than the pivot come after it. Elements equal to the pivot can go on either side. After this **partitioning** step, the pivot is in its final sorted position.
2.  **Conquer:** Recursively apply Quick Sort to the sub-array of elements with values smaller than the pivot and separately to the sub-array of elements with values greater than the pivot.
3.  **Combine:** Because the pivot is already in its final sorted position and the two sub-arrays are sorted independently, no explicit combine step is needed. The entire array becomes sorted.

### Partitioning Schemes

Two common partitioning schemes are Lomuto's and Hoare's.

#### Lomuto Partition Scheme

This scheme takes the last element as the pivot.
Let $A$ be an array, and $p$ and $r$ be the lower and upper indices of the sub-array to be partitioned.

```
LOMUTO-PARTITION(A, p, r):
    pivot = A[r]
    i = p - 1
    for j from p to r - 1:
        if A[j] <= pivot:
            i = i + 1
            swap A[i] with A[j]
    swap A[i+1] with A[r]
    return i + 1
```

After `LOMUTO-PARTITION(A, p, r)` returns `q`, the array is partitioned into $A[p \dots q-1]$, $A[q]$, and $A[q+1 \dots r]$. All elements in $A[p \dots q-1]$ are less than or equal to $A[q]$, and all elements in $A[q+1 \dots r]$ are greater than $A[q]$.

#### Hoare Partition Scheme

This scheme typically picks the first element as the pivot. It uses two pointers that start from opposite ends and move towards each other.

```
HOARE-PARTITION(A, p, r):
    pivot = A[p]
    i = p - 1
    j = r + 1
    while true:
        do:
            i = i + 1
        while A[i] < pivot

        do:
            j = j - 1
        while A[j] > pivot

        if i < j:
            swap A[i] with A[j]
        else:
            return j
```

After `HOARE-PARTITION(A, p, r)` returns `q`, the array is partitioned into $A[p \dots q]$ and $A[q+1 \dots r]$. All elements in $A[p \dots q]$ are less than or equal to the original pivot, and all elements in $A[q+1 \dots r]$ are greater than or equal to the original pivot. Note that the pivot element is not necessarily at index `q`, nor is it guaranteed to be in its final sorted position.

### Quick Sort Algorithm

The main Quick Sort function uses a partition scheme:

```
QUICKSORT(A, p, r):
    if p < r:
        q = PARTITION(A, p, r) // Can be Lomuto or Hoare
        QUICKSORT(A, p, q - 1) // For Lomuto. For Hoare, this would be QUICKSORT(A, p, q)
        QUICKSORT(A, q + 1, r) // For Lomuto. For Hoare, this would be QUICKSORT(A, q + 1, r)
```

### Pivot Strategies

The choice of pivot significantly impacts performance:
*   **First/Last Element:** Simple, but leads to $O(n^2)$ for already sorted/reverse-sorted arrays.
*   **Random Element:** Randomly selects a pivot. This makes the worst-case unlikely for any specific input, leading to an expected $O(n \log n)$ performance.
*   **Median-of-Three:** Selects the median of the first, middle, and last elements as the pivot. This heuristic often avoids the worst-case for many common inputs.

### Analysis of Running Time

*   **Worst-Case Performance ($O(n^2)$):** Occurs when the partition is maximally unbalanced, meaning one sub-array contains $n-1$ elements and the other contains $0$ elements. This happens if the pivot is always the smallest or largest element. The recurrence relation is $T(n) = T(n-1) + T(0) + O(n) = T(n-1) + O(n)$, which solves to $O(n^2)$.
*   **Best-Case Performance ($O(n \log n)$):** Occurs when the partition creates two sub-arrays of roughly equal size (e.g., $n/2$ elements each). The recurrence relation is $T(n) = 2T(n/2) + O(n)$, which by the Master Theorem (Case 2) solves to $O(n \log n)$.
*   **Expected Performance ($O(n \log n)$):** Even with a random pivot, the partitions are not always perfectly balanced. However, on average, the splits are good enough to yield $O(n \log n)$. The expected running time analysis is more complex but confirms this result.

Quick Sort is an in-place sorting algorithm, meaning it requires $O(\log n)$ auxiliary space on average for the recursion stack (due to its logarithmic depth in the average case). In the worst case, the recursion depth can be $O(n)$, leading to $O(n)$ auxiliary space.

**Reference:** Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. Chapter 7: Quicksort.

## 8. ASCII diagrams

Here's an ASCII diagram illustrating a single step of the **Lomuto Partition Scheme** for the array `[7, 2, 1, 6, 8, 3, 5]` with pivot `5` (last element).

Initial state:
```text
Array: [ 7,  2,  1,  6,  8,  3,  5 ]
Indices: 0   1   2   3   4   5   6
         ^                       ^
         p                       r (pivot = 5)
         i=-1
```

Iteration `j=0`, `A[0]=7`. `7 > 5`. `i` remains `-1`.
```text
Array: [ 7,  2,  1,  6,  8,  3,  5 ]
Indices: 0   1   2   3   4   5   6
         ^   ^                   ^
         p   j                   r (pivot = 5)
         i=-1
```

Iteration `j=1`, `A[1]=2`. `2 <= 5`. Increment `i` to `0`. Swap `A[0]` and `A[1]`.
```text
Array: [ 2,  7,  1,  6,  8,  3,  5 ]
Indices: 0   1   2   3   4   5   6
         ^   ^   ^               ^
         p   i   j               r (pivot = 5)
```
*Explanation: `A[0]` (2) is now correctly placed to the left of where the pivot will eventually go. `i` marks the boundary of elements `<= pivot`.*

Iteration `j=2`, `A[2]=1`. `1 <= 5`. Increment `i` to `1`. Swap `A[1]` and `A[2]`.
```text
Array: [ 2,  1,  7,  6,  8,  3,  5 ]
Indices: 0   1   2   3   4   5   6
         ^       ^   ^           ^
         p       i   j           r (pivot = 5)
```
*Explanation: `A[1]` (1) is now correctly placed. `i` has moved to include it.*

Iteration `j=3`, `A[3]=6`. `6 > 5`. `i` remains `1`.
```text
Array: [ 2,  1,  7,  6,  8,  3,  5 ]
Indices: 0   1   2   3   4   5   6
         ^       ^       ^       ^
         p       i       j       r (pivot = 5)
```

Iteration `j=4`, `A[4]=8`. `8 > 5`. `i` remains `1`.
```text
Array: [ 2,  1,  7,  6,  8,  3,  5 ]
Indices: 0   1   2   3   4   5   6
         ^       ^           ^   ^
         p       i           j   r (pivot = 5)
```

Iteration `j=5`, `A[5]=3`. `3 <= 5`. Increment `i` to `2`. Swap `A[2]` and `A[5]`.
```text
Array: [ 2,  1,  3,  6,  8,  7,  5 ]
Indices: 0   1   2   3   4   5   6
         ^           ^       ^   ^
         p           i       j   r (pivot = 5)
```
*Explanation: `A[2]` (3) is now correctly placed. `i` has moved.*

Loop ends. Final step: Swap `A[i+1]` (which is `A[3]`, value `6`) with `A[r]` (which is `A[6]`, value `5`).
```text
Array: [ 2,  1,  3,  5,  8,  7,  6 ]
Indices: 0   1   2   3   4   5   6
         <-- <=5 --> ^ <-- >5 -->
                     pivot=5 at index 3 (q)
```
*Explanation: The pivot `5` is now in its final sorted position