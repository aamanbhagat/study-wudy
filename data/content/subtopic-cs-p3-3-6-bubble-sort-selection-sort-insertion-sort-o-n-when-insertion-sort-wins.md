## What it is
Bubble sort, selection sort, and insertion sort are foundational sorting algorithms that arrange elements in a list by making a series of comparisons and swaps. They are considered "simple" sorts because they are easy to implement but are generally inefficient for large datasets, all having an average and worst-case time complexity of $O(n^2)$. This means their runtime grows quadratically with the number of items, $n$, being sorted.

## Why it matters
While you would not use these algorithms to sort gigabytes of astronomical data, they are critical building blocks. More advanced, efficient algorithms like Timsort (used in Python) or Introsort (used in C++'s `std::sort`) use insertion sort as a subroutine for small subarrays where it outperforms more complex algorithms due to low overhead. In embedded systems, like flight controllers for rockets, their small code size and simplicity can be advantageous when sorting very small, fixed-size arrays of sensor inputs.

## When to study it
Before tackling this, you must have a firm grasp of basic programming constructs:
*   **Arrays/Lists:** How to access, read, and write elements by index.
*   **Loops:** Specifically `for` loops, including nested loops.
*   **Comparison and Assignment:** Using operators like `<`, `>`, and `=`.
*   **Big-O Notation:** A basic understanding of what $O(n)$ and $O(n^2)$ mean in terms of algorithmic scaling.

If you are not comfortable analyzing a nested loop and concluding its runtime is $O(n^2)$, review that topic first.

## How to study it (step by step)
1.  **Implement Selection Sort.** Start with pseudocode, then write the code in your language of choice. The logic is: find the smallest unsorted element and swap it to the front. Manually trace its execution on the array `[6, 5, 3, 1, 8, 7, 2, 4]`.
2.  **Implement Bubble Sort.** Again, go from pseudocode to code. The logic is: iterate through the list, swapping adjacent elements if they are out of order. Repeat until no swaps are needed. Trace it on the same array.
3.  **Implement Insertion Sort.** The logic is: build a sorted sub-array at the beginning of the list. Take the next unsorted element and "insert" it into the correct position within the sorted part, shifting other elements as needed. Trace it on the same array.
4.  **Derive the Complexity.** For each algorithm, write down the summation for the number of comparisons in the worst case. For Selection Sort, it's $\sum_{i=0}^{n-2} (n-1-i)$. Solve this to prove it is $O(n^2)$. Do the same for the others.
5.  **Analyze Best-Case Scenarios.** Feed an already-sorted array like `[1, 2, 3, 4, 5, 6]` to each of your implementations. Measure or count the operations. You will observe firsthand that Insertion Sort finishes much faster. Articulate *why* this happens.

## Key ideas, with intuition
*   **Selection Sort: Minimal Swaps.** Its core idea is to *select* the minimum element from the unsorted portion and place it at the end of the sorted portion. It performs exactly one swap per pass of the outer loop. This results in $O(n)$ swaps, the minimum possible, but the number of comparisons remains high at $O(n^2)$ because it must scan the entire unsorted portion every time. Think of it as methodically building the sorted list by finding the next correct item, no matter how far away it is.

*   **Bubble Sort: Local Swaps.** Its core idea is to fix local disorder. It only compares and swaps *adjacent* elements. This process is repeated until the largest elements have "bubbled" to the end of the list. It's conceptually simple but inefficient, as an element might need many swaps to reach its final destination. An optimization can stop the algorithm early if a full pass completes with no swaps, giving it a best-case $O(n)$ complexity, but its average case is still poor.

*   **Insertion Sort: Build a Sorted Hand.** This is analogous to how many people sort a hand of playing cards. You maintain a sorted sub-array at the beginning. You pick the next unsorted card (element) and find its proper place within the sorted hand, shifting the other cards over to make room.
    $$
    [\underbrace{a_0, a_1, ..., a_{i-1}}_{\text{sorted part}}, \underbrace{a_i}_{\text{element to insert}}, a_{i+1}, ..., a_{n-1}]
    $$
    You take $a_i$ and shift elements in the sorted part to the right until you find the correct spot for $a_i$.

*   **Why Insertion Sort Wins on Nearly Sorted Data.** This is the critical insight. If the input array is almost sorted, when Insertion Sort picks the next element $a_i$, its correct position is likely very close to where it already is. The inner loop, which shifts elements, will run only a few times or not at all. In the best case (an already sorted array), the inner loop condition is immediately false for every element, and the algorithm just performs a single pass over the data, making it $O(n)$. Selection and Bubble sort still have to perform their full $O(n^2)$ comparison routines even if the data is already sorted (with the exception of optimized bubble sort).

## Worked example
Let's trace **Insertion Sort** on the array `A = [5, 2, 4, 6, 1, 3]`. The `|` symbol will separate the sorted portion (left) from the unsorted portion (right).

1.  **Initial state:** `[ | 5, 2, 4, 6, 1, 3]`
    The sorted portion is empty. We consider `5` as the first sorted element.

2.  **i = 1 (element is 2):** `[5 | 2, 4, 6, 1, 3]`
    *   `key = 2`. Compare `2` with `5`.
    *   `2 < 5`. Shift `5` one position to the right.
    *   Insert `2` in the created space.
    *   **Result:** `[2, 5 | 4, 6, 1, 3]`

3.  **i = 2 (element is 4):** `[2, 5 | 4, 6, 1, 3]`
    *   `key = 4`. Compare `4` with `5`.
    *   `4 < 5`. Shift `5` one position to the right.
    *   Compare `4` with `2`. `4 > 2`. Stop.
    *   Insert `4` in the created space.
    *   **Result:** `[2, 4, 5 | 6, 1, 3]`

4.  **i = 3 (element is 6):** `[2, 4, 5 | 6, 1, 3]`
    *   `key = 6`. Compare `6` with `5`.
    *   `6 > 5`. Stop. No shifts needed. `6` is already in its correct relative position.
    *   **Result:** `[2, 4, 5, 6 | 1, 3]`

5.  **i = 4 (element is 1):** `[2, 4, 5, 6 | 1, 3]`
    *   `key = 1`. Compare `1` with `6`, `5`, `4`, and `2`. All are greater.
    *   Shift `6`, `5`, `4`, `2` one position to the right.
    *   Insert `1` at the beginning.
    *   **Result:** `[1, 2, 4, 5, 6 | 3]`

6.  **i = 5 (element is 3):** `[1, 2, 4, 5, 6 | 3]`
    *   `key = 3`. Compare `3` with `6`, `5`, `4`. All are greater.
    *   Shift `6`, `5`, `4` one position to the right.
    *   Compare `3` with `2`. `3 > 2`. Stop.
    *   Insert `3` in the created space.
    *   **Result:** `[1, 2, 3, 4, 5, 6 | ]`

The array is now sorted. Each step took the next unsorted element and inserted it into the growing sorted sub-array, only performing as many comparisons and shifts as necessary to find its place.

## Diagrams
Here is an ASCII diagram illustrating step 5 of the Insertion Sort example above, where the element `1` is being inserted into the sorted sub-array `[2, 4, 5, 6]`.

```text
Array A: [2, 4, 5, 6, 1, 3]
           ^--^--^--^
           Sorted     Unsorted --->
           Partition  Partition

Step: Insert element A[4] = 1 into the sorted partition.
key = 1

1. Compare key(1) with A[3](6). 1 < 6. Shift 6 right.
   Array: [2, 4, 5, _, 6, 3]

2. Compare key(1) with A[2](5). 1 < 5. Shift 5 right.
   Array: [2, 4, _, 5, 6, 3]

3. Compare key(1) with A[1](4). 1 < 4. Shift 4 right.
   Array: [2, _, 4, 5, 6, 3]

4. Compare key(1) with A[0](2). 1 < 2. Shift 2 right.
   Array: [_, 2, 4, 5, 6, 3]

5. Reached start of array. Insert key(1) at index 0.
   Final Array for this step: [1, 2, 4, 5, 6, 3]
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    *   **Bubble Sort:** Imagine heavy bubbles in a fizzy drink. The heaviest (largest value) slowly bubbles up to the surface (end of the array) in each pass. It's a slow, local process.
    *   **Selection Sort:** Imagine a military drill sergeant. In each pass, they *select* the shortest remaining soldier (minimum value) and order them to the front of the line. They don't care about the intermediate chaos, just finding the right one and putting them in place.
    *   **Insertion Sort:** You're playing cards. You hold your sorted hand, pick up a new card from the deck, and *insert* it into the correct spot in your hand, shifting the others over.

2.  **Facts to Overlearn:**
    *   Worst/Average Case Time: Bubble, Selection, Insertion are all $O(n^2)$.
    *   Best Case Time: Insertion Sort is $O(n)$. Optimized Bubble Sort is $O(n)$. Selection Sort is *always* $O(n^2)$.
    *   Swaps: Selection Sort performs $O(n)$ swaps. Bubble and Insertion perform $O(n^2)$ swaps in the worst case.

3.  **Spaced Repetition Schedule:**
    Review these concepts and re-implement one of the algorithms from memory at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:**
    If you forget the complexity, re-derive it from the loops. All three algorithms have a structure of two nested loops.
    $$
    \text{for } i \text{ from } 0 \text{ to } n-1: \\
    \quad \text{for } j \text{ from ... to ...:} \\
    \quad \quad \text{// Comparison and maybe a swap}
    $$
    The outer loop runs $n$ times. The inner loop also runs on the order of $n$ times (e.g., $n-i$ times). The total work is the sum: $\sum_{i=1}^{n} c \cdot i \approx c \frac{n(n+1)}{2}$, which is dominated by the $n^2$ term. Thus, the complexity is $O(n^2)$. To find the best case for Insertion Sort, ask: "What input minimizes the work of the inner loop?" The answer is a sorted list, where the inner loop's condition is never met.

## Common mistakes
*   **Off-by-one errors:** Loop bounds are tricky. Using `i < n-1` vs `i < n` can be the difference between a working sort and an `IndexOutOfBounds` error. Always trace your loop bounds with a small array of size 3 or 4.
*   **Incorrect Swap:** In languages without a direct swap function, a common error is `a = b; b = a;`. This loses the original value of `a`. You must use a temporary variable: `temp = a; a = b; b = temp;`.
*   **Misunderstanding "Best Case":** Students often think a sorted list is the best case for all algorithms. For Selection Sort, it makes no difference; it still performs the same $\frac{n(n-1)}{2}$ comparisons to repeatedly "find" the minimum element, even if it's already in place.
*   **Ignoring Swap Costs:** In some applications (e.g., sorting large objects in memory), swaps are much more expensive than comparisons. In this scenario, Selection Sort's $O(n)$ swaps makes it preferable to Insertion Sort's potential $O(n^2)$ swaps, even if Insertion Sort does fewer comparisons.

## Self-check
1.  Trace Bubble Sort on the array `[3, 5, 1, 2, 4]`. How many times is the swap operation performed?
2.  Describe an input array that is the absolute worst-case for Insertion Sort. Explain precisely why it forces the algorithm to do the maximum number of comparisons and shifts.
3.  You are writing firmware for a satellite's thermal regulation system. An array of 50 temperature sensors needs to be sorted every second. The temperatures rarely change dramatically between seconds, meaning the list is almost sorted from the previous iteration. Which of these three algorithms is the best choice, and which is the worst? Justify your answer in terms of both comparisons and data movement (swaps/shifts).