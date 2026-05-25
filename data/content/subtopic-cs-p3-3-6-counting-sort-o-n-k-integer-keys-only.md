## What it is
Counting sort is a non-comparison-based sorting algorithm that operates on a collection of items by counting the number of occurrences of each distinct integer key value. It then uses these counts to calculate the positions of each key in the sorted output sequence, placing them directly. This approach avoids comparisons and can achieve linear time complexity.

## Why it matters
Counting sort is a cornerstone of more advanced integer sorting algorithms, most notably **Radix Sort**, which is used in high-performance computing to sort large datasets of integers or strings. In aerospace, it can be applied to histogram equalization in image processing from satellite or probe cameras, or to efficiently sort quantized sensor data where values fall within a known, limited integer range. In Machine Learning, it can be used to sort feature values that are represented as discrete integers, a common preprocessing step.

## When to study it
You should be comfortable with the following before tackling this topic:
1.  **Arrays:** Creating, indexing, and iterating over them.
2.  **Time and Space Complexity:** A solid understanding of Big O notation, particularly $O(n)$, $O(n \log n)$, and the distinction between time and space efficiency.
3.  **Comparison-based sorting:** You should understand at least one comparison sort like Merge Sort or Insertion Sort to appreciate why Counting Sort's linear time complexity is special and what its limitations are.

If you are not solid on these, review them first.

## How to study it (step by step)
1.  **Intuitive Pass:** Take the array `A = [3, 1, 4, 1, 5, 9, 2, 6, 5]` and a piece of paper. Create "bins" for each number from 1 to 9. Go through `A`, and for each number, put a tally mark in its corresponding bin. Finally, read off the numbers from the bins in order to get the sorted array. This is the core, naive idea.
2.  **Formalize Counting:** Implement the tallying process. Given an input array `A` and the maximum value `k`, create a `counts` array of size `k+1`, initialized to all zeros. Iterate through `A`, and for each element `x`, execute `counts[x]++`. You have now built a histogram of the input values.
3.  **Introduce Stability:** The naive method from step 1 loses information about the original order of equal elements. To fix this, we need to determine the exact final position of each element. Modify the `counts` array so that each `counts[i]` stores the number of elements less than or equal to `i`. This is done by computing a cumulative sum: `for i from 1 to k: counts[i] += counts[i-1]`.
4.  **Derive Placement Logic:** The cumulative `counts` array now tells you the end-position of each group of elements. For an element with value `x`, its correct position in the sorted output is given by `counts[x] - 1`. To ensure stability (preserving the original order of equal elements), iterate through the input array `A` *backwards*. For each element `A[i]`, place it in the output array at the calculated position, and then decrement `counts[A[i]]`.
5.  **Implement and Analyze:** Write the full, stable counting sort algorithm in your language of choice. Trace its execution on a small example. Then, derive its complexity. You'll find three main loops: one over the input of size $n$, one over the range of keys of size $k$, and another over the input of size $n$. This gives a total time complexity of $O(n+k)$. The space complexity is for the `counts` array ($O(k)$) and the output array ($O(n)$), totaling $O(n+k)$.

## Key ideas, with intuition
1.  **Sorting Without Comparisons:** Comparison-based sorts like Merge Sort have a theoretical lower bound of $\Omega(n \log n)$. Counting sort breaks this barrier by not comparing elements to each other. Instead, it uses the *values* of the elements themselves as indices into an auxiliary array. This is a powerful technique: transforming a value into an address.
2.  **Frequencies as a Map:** The first step is to build a frequency map or histogram. The `counts` array is a direct-address table where the index represents the integer key and the value at that index is its frequency.
    $$ \text{counts}[i] = \text{number of elements in input equal to } i $$
3.  **Cumulative Frequencies for Positioning:** This is the cleverest part. By transforming the frequency counts into a cumulative sum, we change the meaning of the `counts` array. It no longer just tells us *how many* of each element exist, but *where they belong* in the final sorted array.
    $$ \text{counts}[i] = \text{number of elements in input } \le i $$
    This means the elements with value $i$ must occupy the indices from $(\text{counts}[i-1])$ to $(\text{counts}[i] - 1)$ in the sorted output. By placing elements from the end of the input array first, we ensure that if `A[i] == A[j]` with `i < j`, `A[j]` is placed first (at a higher index), and then `A[i]` is placed before it (at a lower index), preserving their relative order. This property is called **stability**.

## Worked example
Let's sort the array `A = [2, 5, 3, 0, 2, 3, 0, 3]` using stable counting sort.

*   **Input:** `A = [2, 5, 3, 0, 2, 3, 0, 3]`
*   **Parameters:** `n = 8` (length of `A`), `k = 5` (maximum value in `A`).
*   **Output:** `B` (an empty array of size 8).

**Step 1: Create and populate the `counts` array.**
Create `counts` of size `k+1 = 6`, initialized to zeros.
`counts = [0, 0, 0, 0, 0, 0]`
Iterate through `A` and count frequencies:
- `A` has two `0`s $\implies$ `counts[0] = 2`
- `A` has zero `1`s $\implies$ `counts[1] = 0`
- `A` has two `2`s $\implies$ `counts[2] = 2`
- `A` has three `3`s $\implies$ `counts[3] = 3`
- `A` has zero `4`s $\implies$ `counts[4] = 0`
- `A` has one `5` $\implies$ `counts[5] = 1`
After this step: `counts = [2, 0, 2, 3, 0, 1]`

**Step 2: Modify `counts` to store cumulative frequencies.**
`counts[i] = counts[i] + counts[i-1]` for `i` from 1 to `k`.
- `counts[1] = counts[1] + counts[0] = 0 + 2 = 2`
- `counts[2] = counts[2] + counts[1] = 2 + 2 = 4`
- `counts[3] = counts[3] + counts[2] = 3 + 4 = 7`
- `counts[4] = counts[4] + counts[3] = 0 + 7 = 7`
- `counts[5] = counts[5] + counts[4] = 1 + 7 = 8`
After this step: `counts = [2, 2, 4, 7, 7, 8]`.
*Intuition check:* This says there are 4 elements $\le 2$, and 7 elements $\le 3$. This is correct.

**Step 3: Build the sorted output array `B`.**
Iterate through `A` **backwards** from `i = n-1` down to `0`.
1.  `i = 7`, `A[7] = 3`. Position is `counts[3]-1 = 7-1 = 6`. Place `3` at `B[6]`. `B = [_, _, _, _, _, _, 3, _]`. Decrement `counts[3]` to `6`.
2.  `i = 6`, `A[6] = 0`. Position is `counts[0]-1 = 2-1 = 1`. Place `0` at `B[1]`. `B = [_, 0, _, _, _, _, 3, _]`. Decrement `counts[0]` to `1`.
3.  `i = 5`, `A[5] = 3`. Position is `counts[3]-1 = 6-1 = 5`. Place `3` at `B[5]`. `B = [_, 0, _, _, _, 3, 3, _]`. Decrement `counts[3]` to `5`.
4.  `i = 4`, `A[4] = 2`. Position is `counts[2]-1 = 4-1 = 3`. Place `2` at `B[3]`. `B = [_, 0, _, 2, _, 3, 3, _]`. Decrement `counts[2]` to `3`.
5.  `i = 3`, `A[3] = 0`. Position is `counts[0]-1 = 1-1 = 0`. Place `0` at `B[0]`. `B = [0, 0, _, 2, _, 3, 3, _]`. Decrement `counts[0]` to `0`.
6.  `i = 2`, `A[2] = 3`. Position is `counts[3]-1 = 5-1 = 4`. Place `3` at `B[4]`. `B = [0, 0, _, 2, 3, 3, 3, _]`. Decrement `counts[3]` to `4`.
7.  `i = 1`, `A[1] = 5`. Position is `counts[5]-1 = 8-1 = 7`. Place `5` at `B[7]`. `B = [0, 0, _, 2, 3, 3, 3, 5]`. Decrement `counts[5]` to `7`.
8.  `i = 0`, `A[0] = 2`. Position is `counts[2]-1 = 3-1 = 2`. Place `2` at `B[2]`. `B = [0, 0, 2, 2, 3, 3, 3, 5]`. Decrement `counts[2]` to `2`.

**Final Result:** `B = [0, 0, 2, 2, 3, 3, 3, 5]`.

*Reflection:* Each step has a clear purpose. Counting frequencies (Step 1) inventories our items. Calculating cumulative sums (Step 2) converts that inventory into a placement map. The backward iteration (Step 3) uses that map to place items stably into their final sorted positions.

## Diagrams
Here is a diagram of the state after Step 2 (cumulative counts) and during the first two placements of Step 3.

```text
Input A:      [2, 5, 3, 0, 2, 3, 0, 3]
                                     ^
                                     i=7

Counts C:     [2, 2, 4, 7, 7, 8]
             ^  ^  ^  ^  ^  ^
Index:       0  1  2  3  4  5

Output B:     [_, _, _, _, _, _, _, _]

------------------------------------------------------------------
Placement 1 (i=7, A[7]=3):
  1. Get value: val = A[7] = 3
  2. Get position: pos = C[3] - 1 = 7 - 1 = 6
  3. Place in B: B[6] = 3
  4. Decrement C: C[3] = 6

State after Placement 1:
Input A:      [2, 5, 3, 0, 2, 3, 0, 3]
                                  ^
                                  i=6
Counts C:     [2, 2, 4, 6, 7, 8]
Output B:     [_, _, _, _, _, _, 3, _]

------------------------------------------------------------------
Placement 2 (i=6, A[6]=0):
  1. Get value: val = A[6] = 0
  2. Get position: pos = C[0] - 1 = 2 - 1 = 1
  3. Place in B: B[1] = 0
  4. Decrement C: C[0] = 1

State after Placement 2:
Input A:      [2, 5, 3, 0, 2, 3, 0, 3]
                               ^
                               i=5
Counts C:     [1, 2, 4, 6, 7, 8]
Output B:     [_, 0, _, _, _, _, 3, _]
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of sorting children into a line by age.
    *   **Count:** First, you ask "How many 5-year-olds? How many 6-year-olds?" and write the tally down. (This is the frequency `counts` array).
    *   **Cumulative Sum:** Then, you calculate "There are 2 five-year-olds, and 3 six-year-olds, so there are $2+3=5$ children age six or younger." This tells you the 6-year-olds will end at the 5th spot in line. (This is the cumulative `counts` array).
    *   **Placement (Backwards):** To keep friends together (stability), you call the *last* kid from the input group to come forward and take their spot at the *end* of their age block in the line. Then the next-to-last kid takes the spot right before them. (This is the backward iteration for placement).

2.  **Must Overlearn Formulas/Facts:**
    *   Time Complexity: $O(n+k)$ where $n$ is number of elements, $k$ is the range of key values.
    *   Space Complexity: $O(n+k)$.
    *   Key Restriction: Only for integers in a small, known range. It is **not** a general-purpose sort.

3.  **Spaced Repetition Schedule:**
    *   Review this lesson in 1 day.
    *   Then again in 3 days.
    *   Then in 7 days.
    *   Then in 16 days.
    *   Final review in 35 days.

4.  **First Principles Pathway:** If you forget the algorithm, rebuild it from the core idea: "How do I sort numbers without comparing them?"
    *   Start with the value-as-index idea. Let's just count how many of each number we have. Create an array for that.
    *   Now I have counts. How do I build the sorted array? I could just loop through my counts array and print `counts[i]` copies of `i`.
    *   Wait, that's not stable and doesn't work for complex objects. I need to know the *exact final position* for each input element.
    *   How to get positions from counts? If I know there are 5 elements $\le 3$, then the last `3` must go in index 4 (0-indexed). This smells like a cumulative sum. Let's build that.
    *   Now I have the end position for each group. How do I place them to maintain stability? If I place items from the start of the input, the first `3` I see will go to the end of the `3` block. The second `3` will go before it. That reverses their order. So, I must iterate through the input *backwards*.

## Common mistakes
1.  **Forgetting the `+k` term:** Students often simplify the complexity to $O(n)$, forgetting that the creation and iteration of the `counts` array depends on the range $k$. If $k$ is much larger than $n$ (e.g., $k=n^2$), the algorithm is very inefficient.
2.  **Off-by-one errors in placement:** The cumulative count `counts[x]` gives the number of elements $\le x$. This corresponds to a 1-based rank. To convert to a 0-based array index, you must place the element at `counts[x] - 1`.
3.  **Handling non-zero minimums incorrectly:** The algorithm assumes keys are in $[0, k]$. If your keys are in $[min, max]$, you must offset all array accesses. The `counts` array should be of size `max - min + 1`, and you access it with `counts[value - min]`.
4.  **Iterating forwards during placement:** Iterating through the input array from left-to-right when building the output array will produce a correct but *unstable* sort. This breaks algorithms like Radix Sort that rely on stability.

## Self-check
1.  Given an input array of $n$ integers where the range of values $k$ is a constant (e.g., all numbers are between 0 and 1000, regardless of $n$), what is the effective time complexity of counting sort?
2.  You are given a list of astronaut records, each with a name and an age (from 25 to 65). Explain how you would use counting sort to sort these records stably by age. What is the size of your `counts` array? How do you handle the age range not starting at 0?
3.  Provide a small input array (4-5 elements) with duplicate values. Trace the placement step of counting sort first by iterating forwards through the input, and then by iterating backwards. Show how the forward iteration breaks stability while the backward iteration preserves it.