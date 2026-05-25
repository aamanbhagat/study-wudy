## What it is
Quick sort is a "divide and conquer" sorting algorithm. It works by selecting a 'pivot' element from an array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively, and because the pivot is already in its final sorted position, no final merging step is needed.

## Why it matters
Quick sort is extremely efficient on average, making it the basis for the default sorting functions in many standard libraries (e.g., C++ `std::sort` is often an introspective sort, a hybrid that uses Quick sort). In aerospace simulations or physics data analysis, you often deal with massive datasets that must be sorted in-place to conserve memory; Quick sort's low memory overhead ($O(\log n)$ stack space) is critical. In machine learning, randomized variants of Quick sort are used in algorithms like Quickselect to find the k-th smallest element without fully sorting the data, which is essential for certain feature selection or data partitioning tasks.

## When to study it
Before tackling Quick sort, you must have a solid understanding of:
1.  **Recursion:** The algorithm is defined in terms of itself. You must be comfortable with base cases and recursive calls.
2.  **Arrays (or Lists):** The data structure being manipulated. You need to be fluent with indexing and in-place swapping of elements.
3.  **Big O Notation:** You must understand what $O(n \log n)$ and $O(n^2)$ mean in terms of algorithmic efficiency and how to analyze best, average, and worst cases.

If you are not confident in these three areas, master them first.

## How to study it (step by step)
1.  **Master the Partition:** The entire algorithm hinges on the `partition` function. Whiteboard the Lomuto partition scheme with a small array (e.g., 8 elements). Use two pointers, `i` and `j`, and manually track their positions as you iterate. Do not proceed until you can do this from memory.
2.  **Implement Lomuto:** Code the `partition` function and the main `quicksort` recursive function using the Lomuto scheme. Use the last element as the pivot for simplicity. Test it on a simple array, a sorted array, and a reverse-sorted array.
3.  **Analyze Complexity:** Derive the recurrence relations for the best, worst, and average cases. For the worst case, $T(n) = T(n-1) + O(n)$, show how this expands to $O(n^2)$. For the best/average case, $T(n) = 2T(n/2) + O(n)$, show how this results in $O(n \log n)$ using the Master Theorem or by drawing a recursion tree.
4.  **Explore Pivot Strategies:** Understand why picking the first or last element is a poor strategy. Research and implement a "median-of-three" pivot selection strategy. This mitigates the worst-case scenario for partially sorted data.
5.  **Study Hoare's Partition:** Read about and implement the Hoare partition scheme. Note its key differences from Lomuto: it's generally faster due to fewer swaps, but the pivot is not necessarily placed in its final position, and the recursive calls use different indices.

## Key ideas, with intuition
1.  **The Partition is the Core Operation:** Forget sorting for a moment. The real goal is to solve a simpler problem: take an array and a chosen element (the pivot), and put that pivot in its correct, final, sorted position. To do this, you must move every element smaller than the pivot to its left and every element larger to its right. This single pass is the `partition` operation, and it takes linear time, $O(n)$.
2.  **Divide and Conquer Recursion:** Once the pivot is in its correct place, say index `p`, you know it never has to move again. You've now created two smaller, independent sorting problems: sort the sub-array to the left of `p`, and sort the sub-array to the right of `p`. This is a natural fit for recursion. The algorithm is simply: `quicksort(left_half)`, then `quicksort(right_half)`.
3.  **Pivot Choice Dictates Performance:** The efficiency of Quick sort depends entirely on how evenly the pivot splits the array.
    *   **Best Case:** The pivot is the median element, splitting the array into two equal halves. This gives the recurrence $T(n) = 2T(n/2) + O(n)$, which solves to $O(n \log n)$.
    *   **Worst Case:** The pivot is the smallest or largest element. This creates a completely unbalanced split: one sub-array of size $n-1$ and one of size 0. This gives the recurrence $T(n) = T(n-1) + O(n)$, which solves to $O(n^2)$. This happens on already-sorted data if you naively pick the first or last element as the pivot.
    *   **Average Case:** With a random pivot, you expect a reasonably balanced split on average. The math is more involved, but it proves that the expected runtime is still $O(n \log n)$. This is why randomized pivot selection is so powerful.

## Worked example
Let's sort the array `A = [7, 2, 1, 6, 8, 5, 3, 4]` using the **Lomuto partition scheme** where the pivot is always the last element.

**Initial Call:** `quicksort(A, 0, 7)`

1.  **Partition `[7, 2, 1, 6, 8, 5, 3, 4]`:**
    *   Pivot is `4`.
    *   We use a pointer `i` to mark the boundary of elements less than the pivot. Initialize `i = -1` (or `i = low - 1`).
    *   We use a pointer `j` to scan the array from `low` to `high-1`.
    *   `j=0, A[0]=7 > 4`: Do nothing.
    *   `j=1, A[1]=2 < 4`: Increment `i` to `0`, swap `A[i]` and `A[j]`. Array becomes `[2, 7, 1, 6, 8, 5, 3, 4]`.
    *   `j=2, A[2]=1 < 4`: Increment `i` to `1`, swap `A[i]` and `A[j]`. Array becomes `[2, 1, 7, 6, 8, 5, 3, 4]`.
    *   `j=3, A[3]=6 > 4`: Do nothing.
    *   `j=4, A[4]=8 > 4`: Do nothing.
    *   `j=5, A[5]=5 > 4`: Do nothing.
    *   `j=6, A[6]=3 < 4`: Increment `i` to `2`, swap `A[i]` and `A[j]`. Array becomes `[2, 1, 3, 6, 8, 5, 7, 4]`.
    *   Loop finishes. Swap pivot (`A[7]`) with `A[i+1]` (`A[3]`).
    *   Final partitioned array: `[2, 1, 3, 4, 8, 5, 7, 6]`. The pivot `4` is at index `3`, its final sorted position.

2.  **Recursive Calls:**
    *   `quicksort(A, 0, 2)` on sub-array `[2, 1, 3]`.
    *   `quicksort(A, 4, 7)` on sub-array `[8, 5, 7, 6]`.

3.  **Partition `[2, 1, 3]`:**
    *   Pivot is `3`. Partitioning yields `[2, 1, 3]`. Pivot `3` is at index `2`.
    *   Recursive calls: `quicksort(A, 0, 1)` on `[2, 1]` and `quicksort(A, 3, 2)` (base case, returns).

4.  **Partition `[2, 1]`:**
    *   Pivot is `1`. Partitioning yields `[1, 2]`. Pivot `1` is at index `0`.
    *   Recursive calls on empty ranges, which return.

...and so on. The process continues until all sub-arrays are of size 1 or 0.

**Reflection:** Each `partition` step successfully placed one element (the pivot) into its final sorted location. The problem was then reduced to two smaller, independent versions of the same problem, which is the essence of divide and conquer.

## Diagrams
Here is an ASCII diagram of the Lomuto partition for the first step of the worked example. `p` is the pivot value. `i` is the index of the last element known to be `< p`. `j` is the scanning pointer.

Initial state: `A = [7, 2, 1, 6, 8, 5, 3, 4]`, `pivot = 4`
`i = -1` (conceptually, before the array starts)

```text
j
↓
[ 7, 2, 1, 6, 8, 5, 3 | 4 ]
↑                          ↑
low=0                      high=7
i=-1
```

After a few steps (`j=3`, `A[j]=6`): `i` has advanced to `1`. Everything at or before `i` is `< pivot`.

```text
       j
       ↓
[ 2, 1, 7, 6, 8, 5, 3 | 4 ]
   ↑
   i=1
Elements A[0..i] are < 4
```

Final state after the loop (before final swap):

```text
                         j (end)
                         ↓
[ 2, 1, 3, 6, 8, 5, 7 | 4 ]
      ↑
      i=2
Elements A[0..i] are < 4
```

After swapping `A[i+1]` with pivot:

```text
[ 2, 1, 3, 4, 8, 5, 7, 6 ]
           ↑
           Pivot is now in its final position.
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of a military drill sergeant ("Quickly!") sorting soldiers by height. The sergeant picks one soldier (the **pivot**) and shouts, "Everyone shorter than this person, to the left! Taller, to the right! Go!" This one command is the **partition**. The sergeant then ignores the pivot soldier (who is now in the correct place) and delegates the same task to two junior officers, one for the "short" group and one for the "tall" group. They repeat this **recursively** until every soldier is in a group of one.
2.  **Formulas to Overlearn:**
    *   Worst Case Recurrence: $T(n) = T(n-1) + O(n) \implies O(n^2)$ (unbalanced partitions)
    *   Average/Best Case Recurrence: $T(n) = 2T(n/2) + O(n) \implies O(n \log n)$ (balanced partitions)
    *   Lomuto Partition Goal: After partitioning `A[lo..hi]` with pivot `p`, find index `j` such that `A[lo..j-1] <= p < A[j+1..hi]` and `A[j] = p`.
3.  **Spaced Repetition Schedule:** Review this material at **1 day, 3 days, 7 days, 16 days, and 35 days**. Actively re-implement the Lomuto partition from scratch at each review.
4.  **First Principles Pathway:** If you forget everything, rebuild it from the goal. **Goal:** Sort an array. **Strategy:** Pick one element, the pivot. Put it in its final sorted place. How? Move everything smaller to its left and larger to its right. This takes one pass, so it's $O(n)$. Now you have two smaller unsorted arrays. What do you do with them? The same thing! This logic naturally leads to a recursive function and the entire Quick sort algorithm.

## Common mistakes
1.  **Off-by-one errors:** Loop boundaries in the partition are subtle. For Lomuto, the loop for `j` goes from `low` to `high-1`. The final swap is with `A[i+1]`. A single mistake here breaks the entire algorithm.
2.  **Forgetting the recursive base case:** Your `quicksort` function must have a condition like `if (low >= high) return;`. Without it, you get infinite recursion and a stack overflow.
3.  **Incorrect recursive bounds:** After partitioning and finding the pivot's final index `p`, the recursive calls are on the ranges `(low, p-1)` and `(p+1, high)`. Including `p` in either recursive call can lead to infinite loops.
4.  **Mishandling Hoare partition:** The Hoare partition does *not* necessarily place the pivot in its final position. It only guarantees that it splits the array into two parts. The recursive calls are different (`(low, j)` and `(j+1, high)`), and it's a common mistake to apply Lomuto's recursive bounds to Hoare's scheme.

## Self-check
1.  Trace the complete execution of Quick sort (using Lomuto partition, pivot is the last element) on the array `A = [3, 7, 8, 5, 2, 1, 9, 4, 6]`. Show the state of the array after each `partition` call completes.
2.  What is the specific sequence of pivots that would cause Quick sort to exhibit its worst-case $O(n^2)$ behavior on the array `A = [10, 20, 30, 40, 50]`?
3.  Explain why a "median-of-three" pivot selection strategy (choosing the median of the first, middle, and last elements as the pivot) makes the worst-case $O(n^2)$ behavior significantly less likely on real-world, often partially-sorted, data. What is an input that can still defeat this strategy?