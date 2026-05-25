## 1. What it is — in plain English

Imagine you have a stack of exam papers, each with a score from 0 to 100. Your job is to sort them from lowest to highest score. Most people would pick two papers, compare their scores, and swap them if they're in the wrong order. This is how many common sorting methods work.

Counting sort takes a completely different approach. Instead of comparing papers, you'd first get a tally of how many papers received each possible score. For example, you might find that 5 students scored 70, 3 students scored 85, and so on.

Once you have these counts, you can easily reconstruct the sorted list. You know there are 5 papers with score 70, so the first 5 spots in your sorted pile will be those papers. Then, if 3 students scored 85, those 3 papers come next. It's like having a set of pigeonholes for each possible score and dropping each paper into its correct hole, then just collecting them in order.

The catch? This only works easily if the "scores" (the numbers you're sorting) are whole numbers (integers) and don't spread out too much. If scores could be fractions or extremely large numbers, you'd need an impossibly huge number of pigeonholes. But for integers within a reasonable range, it's incredibly fast because it avoids all those comparisons.

## 2. Why it matters — real-world applications

Counting sort, while specialized, is incredibly powerful in specific scenarios and forms the backbone of other important algorithms.

1.  **Radix Sort Subroutine:** This is perhaps its most significant application. Radix sort is a non-comparison sorting algorithm that sorts numbers digit by digit. For example, to sort numbers like 123, 45, 678, it might first sort all numbers by their units digit, then by their tens digit, and so on. Each of these "digit sorts" is efficiently performed using counting sort. This combination allows Radix Sort to sort very large numbers that might exceed the practical range for a single Counting Sort pass.
2.  **Data Processing Pipelines:** In large-scale data analytics, you often need to sort data where keys (the values you're sorting by) are integers within a known, relatively small range. For instance, sorting a list of network packets by their port number (which are integers from 0 to 65535) or by a specific byte value. Counting sort can provide a significant speedup over comparison sorts in such scenarios, making data processing pipelines more efficient.
3.  **Image Processing and Graphics:** When processing images, pixels often have integer values representing color intensity (e.g., 0-255 for grayscale) or depth (Z-buffer values). Sorting pixels based on these values can be a step in various algorithms, like creating histograms of color distribution or rendering objects in correct order. Counting sort is perfectly suited for these fixed, small integer ranges.
4.  **Scientific Simulations and Binning:** In fields like computational physics or chemistry, simulations often generate vast amounts of data where particles or events are characterized by integer attributes (e.g., energy levels, discrete states). To analyze this data, you might need to "bin" or sort elements into categories. Counting sort provides an extremely fast way to do this when the categories correspond to integer values within a limited range.

## 3. Prerequisites — what you must know first

Before diving into Counting Sort, ensure you have a solid grasp of these fundamental concepts:

*   **Arrays:** Understanding how to declare, initialize, access elements by index, and iterate over arrays.
*   **Loops:** Proficiency with `for` and `while` loops for iterating through data structures.
*   **Time Complexity (Big O Notation):** The ability to analyze and express an algorithm's efficiency in terms of input size (e.g., $O(n)$, $O(n^2)$, $O(\log n)$). This is crucial for understanding why Counting Sort is fast.
*   **Space Complexity:** The ability to analyze and express an algorithm's memory usage in terms of input size. Counting Sort uses auxiliary space.
*   **Comparison Sorts vs. Non-Comparison Sorts:** Understanding that some sorts work by comparing elements (like Merge Sort, Quick Sort) while others (like Counting Sort, Radix Sort) use different techniques.
*   **Stability in Sorting:** Knowing what it means for a sorting algorithm to be "stable" (i.e., elements with equal values maintain their relative order in the sorted output). Counting Sort can be implemented to be stable.

## 4. The core idea — step by step

Counting sort works by determining, for each input element, the number of elements less than it. This information can then be used to place the element directly into its correct position in the output array. Let's break it down.

Suppose we want to sort an array `A` of `n` integers, where each integer is in the range from $0$ to $k$.

### Step 1: Find the range of input values (k)

*   **Plain-English Statement:** Before we can count anything, we need to know the entire possible spectrum of numbers we might encounter. We need to find the smallest and largest values in our input array to determine the size of our "counting" mechanism. For simplicity, we often assume the minimum value is 0, and we just need to find the maximum value, which we'll call $k$. If the minimum value isn't 0, we'll need to adjust our indices.

*   **Small Concrete Example:**
    Input array `A = [4, 2, 2, 8, 3, 3, 1]`
    Minimum value in `A` is $1$.
    Maximum value in `A` is $8$.
    So, the range of values is from $1$ to $8$. For the purpose of array indexing, we often consider $k = \text{max\_value}$. If we were indexing from 0, we'd need an array of size `max_value + 1`.

*   **Formal/Mathematical Version:**
    Let $\text{min\_val} = \min(A)$ and $\text{max\_val} = \max(A)$.
    The effective range of values is $k = \text{max\_val} - \text{min\_val}$.
    If we assume $\text{min\_val} = 0$, then $k = \text{max\_val}$. For our counting array, its size will be $k+1$ to accommodate values from $0$ to $k$.

*   **What Could Go Wrong:** Not correctly identifying the minimum and maximum values, especially if the minimum is not 0. This can lead to an `ArrayIndexOutOfBoundsException` or an incorrectly sized counting array, wasting space or failing to count all elements.

### Step 2: Create a counting array

*   **Plain-English Statement:** We need a temporary storage space, an array, where each index corresponds to a possible number in our input range. The value at that index will store how many times that number appears in our original list. We initialize all these counts to zero.

*   **Small Concrete Example:**
    Given `A = [4, 2, 2, 8, 3, 3, 1]` with `min_val = 1` and `max_val = 8`.
    We create a `count_array` of size `max_val + 1 = 9`.
    `count_array = [0, 0, 0, 0, 0, 0, 0, 0, 0]` (indices 0 to 8)
    (Note: If `min_val` was not 0, we'd adjust indices. For values 1-8, we'd use indices 1-8 of this array, ignoring index 0 or shifting values).

*   **Formal/Mathematical Version:**
    Declare an array $C$ of size $k+1$.
    Initialize all elements of $C$ to $0$:
    $$C[i] = 0 \quad \text{for } i = 0, 1, \dots, k$$

*   **What Could Go Wrong:** Creating a `count_array` that is too small (e.g., `max_val` instead of `max_val + 1`), leading to an `ArrayIndexOutOfBoundsException` when trying to access the maximum value's count. Forgetting to initialize to zero means previous garbage values could corrupt counts.

### Step 3: Populate the counting array

*   **Plain-English Statement:** Now, we go through our original input array, one number at a time. For each number we see, we go to its corresponding spot in our `count_array` and increment the count there. This is like putting a tally mark for each number.

*   **Small Concrete Example:**
    `A = [4, 2, 2, 8, 3, 3, 1]`
    `count_array = [0, 0, 0, 0, 0, 0, 0, 0, 0]` (indices 0 to 8)
    1. Read `4`: `count_array[4]` becomes `1`.
    2. Read `2`: `count_array[2]` becomes `1`.
    3. Read `2`: `count_array[2]` becomes `2`.
    4. Read `8`: `count_array[8]` becomes `1`.
    5. Read `3`: `count_array[3]` becomes `1`.
    6. Read `3`: `count_array[3]` becomes `2`.
    7. Read `1`: `count_array[1]` becomes `1`.

    Final `count_array`:
    `[0, 1, 2, 2, 1, 0, 0, 0, 1]` (index 0, then counts for 1, 2, 3, 4, 5, 6, 7, 8)

*   **Formal/Mathematical Version:**
    For each element $x$ in `A`:
    $$C[x] = C[x] + 1$$
    (If $\text{min\_val} \ne 0$, it would be $C[x - \text{min\_val}] = C[x - \text{min\_val}] + 1$)

*   **What Could Go Wrong:** Incorrectly mapping input values to `count_array` indices, especially if `min_val` is not 0. This could lead to incorrect counts or `ArrayIndexOutOfBoundsException`.

### Step 4: Modify the counting array to store cumulative counts

*   **Plain-English Statement:** This is the clever part that allows direct placement. We transform our `count_array` so that each index `i` now stores not just how many times `i` appeared, but *how many numbers in total are less than or equal to `i`*. This tells us the final position of `i` in the sorted array. For example, if `count_array[7]` becomes `15`, it means there are 15 numbers in the original array that are less than or equal to 7. So, the last occurrence of the number 7 should end up at the 15th position in the sorted array (if we use 1-based indexing).

*   **Small Concrete Example:**
    `count_array = [0, 1, 2, 2, 1, 0, 0, 0, 1]`
    1. `count_array[0]` remains `0`.
    2. `count_array[1]` remains `1`. (1 number $\le$ 1)
    3. `count_array[2]` becomes `count_array[2] + count_array[1] = 2 + 1 = 3`. (3 numbers $\le$ 2)
    4. `count_array[3]` becomes `count_array[3] + count_array[2] = 2 + 3 = 5`. (5 numbers $\le$ 3)
    5. `count_array[4]` becomes `count_array[4] + count_array[3] = 1 + 5 = 6`. (6 numbers $\le$ 4)
    6. `count_array[5]` becomes `count_array[5] + count_array[4] = 0 + 6 = 6`. (6 numbers $\le$ 5)
    7. `count_array[6]` becomes `count_array[6] + count_array[5] = 0 + 6 = 6`. (6 numbers $\le$ 6)
    8. `count_array[7]` becomes `count_array[7] + count_array[6] = 0 + 6 = 6`. (6 numbers $\le$ 7)
    9. `count_array[8]` becomes `count_array[8] + count_array[7] = 1 + 6 = 7`. (7 numbers $\le$ 8)

    Final `count_array` (cumulative):
    `[0, 1, 3, 5, 6, 6, 6, 6, 7]`

*   **Formal/Mathematical Version:**
    For $i$ from $1$ to $k$:
    $$C[i] = C[i] + C[i-1]$$
    (If $\text{min\_val} \ne 0$, the loop would be from $\text{min\_val}+1$ to $\text{max\_val}$, and indices adjusted: $C[i - \text{min\_val}] = C[i - \text{min\_val}] + C[i - 1 - \text{min\_val}]$)

*   **What Could Go Wrong:** Incorrect loop bounds (e.g., starting from 0), leading to incorrect cumulative sums. This step is critical for stability; if done incorrectly, elements with the same value might not maintain their original relative order.

### Step 5: Build the output array

*   **Plain-English Statement:** Now we create our final sorted array. We iterate through the *original* input array, but this time, we do it *backwards* (from right to left). For each number in the original array, we look up its cumulative count in our modified `count_array`. This count tells us the exact position where this number should go in the sorted output array. After placing the number, we decrement its count in `count_array` so that if another identical number comes along, it gets placed in the spot just before it. Iterating backwards ensures stability.

*   **Small Concrete Example:**
    `A = [4, 2, 2, 8, 3, 3, 1]` (original input)
    `cumulative_count_array = [0, 1, 3, 5, 6, 6, 6, 6, 7]`
    Create `output_array` of size 7.

    1. Process `A[6]` (which is `1`):
       `cumulative_count_array[1]` is `1`. So, `1` goes into `output_array[1-1] = output_array[0]`.
       Decrement `cumulative_count_array[1]` to `0`.
       `output_array = [1, _, _, _, _, _, _]`
       `cumulative_count_array = [0, 0, 3, 5, 6, 6, 6, 6, 7]`

    2. Process `A[5]` (which is `3`):
       `cumulative_count_array[3]` is `5`. So, `3` goes into `output_array[5-1] = output_array[4]`.
       Decrement `cumulative_count_array[3]` to `4`.
       `output_array = [1, _, _, _, 3, _, _]`
       `cumulative_count_array = [0, 0, 3, 4, 6, 6, 6, 6, 7]`

    3. Process `A[4]` (which is `3`):
       `cumulative_count_array[3]` is `4`. So, `3` goes into `output_array[4-1] = output_array[3]`.
       Decrement `cumulative_count_array[3]` to `3`.
       `output_array = [1, _, _, 3, 3, _, _]`
       `cumulative_count_array = [0, 0, 3, 3, 6, 6, 6, 6, 7]`

    4. Process `A[3]` (which is `8`):
       `cumulative_count_array[8]` is `7`. So, `8` goes into `output_array[7-1] = output_array[6]`.
       Decrement `cumulative_count_array[8]` to `6`.
       `output_array = [1, _, _, 3, 3, _, 8]`
       `cumulative_count_array = [0, 0, 3, 3, 6, 6, 6, 6, 6]`

    5. Process `A[2]` (which is `2`):
       `cumulative_count_array[2]` is `3`. So, `2` goes into `output_array[3-1] = output_array[2]`.
       Decrement `cumulative_count_array[2]` to `2`.
       `output_array = [1, _, 2, 3, 3, _, 8]`
       `cumulative_count_array = [0, 0, 2, 3, 6, 6, 6, 6, 6]`

    6. Process `A[1]` (which is `2`):
       `cumulative_count_array[2]` is `2`. So, `2` goes into `output_array[2-1] = output_array[1]`.
       Decrement `cumulative_count_array[2]` to `1`.
       `output_array = [1, 2, 2, 3, 3, _, 8]`
       `cumulative_count_array = [0, 0, 1, 3, 6, 6, 6, 6, 6]`

    7. Process `A[0]` (which is `4`):
       `cumulative_count_array[4]` is `6`. So, `4` goes into `output_array[6-1] = output_array[5]`.
       Decrement `cumulative_count_array[4]` to `5`.
       `output_array = [1, 2, 2, 3, 3, 4, 8]`
       `cumulative_count_array = [0, 0, 1, 3, 5, 6, 6, 6, 6]`

    Final `output_array = [1, 2, 2, 3, 3, 4, 8]`

*   **Formal/Mathematical Version:**
    Declare an array $B$ of size $n$ (the length of $A$).
    For $j$ from $n-1$ down to $0$:
    $$B[C[A[j]] - 1] = A[j]$$
    $$C[A[j]] = C[A[j]] - 1$$
    (Again, adjust indices for $A[j] - \text{min\_val}$ if $\text{min\_val} \ne 0$).

*   **What Could Go Wrong:**
    *   **Not iterating backwards:** If you iterate forwards, the algorithm will not be stable. Elements with the same value will have their relative order reversed.
    *   **Incorrect indexing:** Forgetting the `-1` when placing into `output_array` (since cumulative counts are 1-based positions, but array indices are 0-based).
    *   **Not decrementing the count:** If you don't decrement `C[A[j]]`, subsequent identical elements will try to write to the same position, overwriting previous elements.

### Step 6: Copy back (optional)

*   **Plain-English Statement:** If you want the original array `A` to be sorted in place, you simply copy the contents of your `output_array` back into `A`. Sometimes, returning the `output_array` directly is sufficient.

*   **Small Concrete Example:**
    `A = [4, 2, 2, 8, 3, 3, 1]` (original)
    `output_array = [1, 2, 2, 3, 3, 4, 8]` (sorted)
    Copy `output_array` to `A`:
    `A = [1, 2, 2, 3, 3, 4, 8]`

*   **Formal/Mathematical Version:**
    For $i$ from $0$ to $n-1$:
    $$A[i] = B[i]$$

*   **What Could Go Wrong:** Forgetting this step if the requirement is to sort the *original* array.

## 5. Worked examples — multiple, with every step shown

Let's walk through several examples to solidify your understanding.

### Example 1: Simple Positive Integers

**Problem:** Sort the array `A = [1, 4, 1, 2, 7, 5, 2]` using Counting Sort.

**Given:** `A = [1, 4, 1, 2, 7, 5, 2]`
**Want:** Sorted array `A_sorted`

**Steps:**

1.  **Find range (k):**
    *   `min_val = 1`
    *   `max_val = 7`
    *   So, `k = 7`. We need a `count_array` of size `k+1 = 8` (for indices 0-7).
    *   *Explanation:* Identify the smallest and largest values to determine the necessary size for our counting mechanism.

2.  **Create and initialize `count_array`:**
    *   `C = [0, 0, 0, 0, 0, 0, 0, 0]` (Indices 0-7)
    *   *Explanation:* A temporary array to store frequencies, initialized to zeros.

3.  **Populate `count_array`:**
    *   `A[0] = 1`: `C[1]` becomes `1`.
    *   `A[1] = 4`: `C[4]` becomes `1`.
    *   `A[2] = 1`: `C[1]` becomes `2`.
    *   `A[3] = 2`: `C[2]` becomes `1`.
    *   `A[4] = 7`: `C[7]` becomes `1`.
    *   `A[5] = 5`: `C[5]` becomes `1`.
    *   `A[6] = 2`: `C[2]` becomes `2`.
    *   After processing `A`: `C = [0, 2, 2, 0, 1, 1, 0, 1]`
    *   *Explanation:* Each element in `A` increments its corresponding count in `C`.

4.  **Modify `count_array` for cumulative counts:**
    *   `C[0]` remains `0`.
    *   `C[1]` remains `2`.
    *   `C[2] = C[2] + C[1] = 2 + 2 = 4`.
    *   `C[3] = C[3] + C[2] = 0 + 4 = 4`.
    *   `C[4] = C[4] + C[3] = 1 + 4 = 5`.
    *   `C[5] = C[5] + C[4] = 1 + 5 = 6`.
    *   `C[6] = C[6] + C[5] = 0 + 6 = 6`.
    *   `C[7] = C[7] + C[6] = 1 + 6 = 7`.
    *   Final `C` (cumulative): `[0, 2, 4, 4, 5, 6, 6, 7]`
    *   *Explanation:* Each `C[i]` now stores the count of elements less than or equal to `i`. This tells us the final position (1-based index) of the last occurrence of `i`.

5.  **Build `output_array` (`B`) (iterate `A` backwards):**
    *   `B = [_, _, _, _, _, _, _]` (size 7)
    *   `A[6] = 2`: `C[2]` is `4`. Place `2` at `B[4-1] = B[3]`. Decrement `C[2]` to `3`.
        `B = [_, _, _, 2, _, _, _]`
        `C = [0, 2, 3, 4, 5, 6, 6, 7]`
    *   `A[5] = 5`: `C[5]` is `6`. Place `5` at `B[6-1] = B[5]`. Decrement `C[5]` to `5`.
        `B = [_, _, _, 2, _, 5, _]`
        `C = [0, 2, 3, 4, 5, 5, 6, 7]`
    *   `A[4] = 7`: `C[7]` is `7`. Place `7` at `B[7-1] = B[6]`. Decrement `C[7]` to `6`.
        `B = [_, _, _, 2, _, 5, 7]`
        `C = [0, 2, 3, 4, 5, 5, 6, 6]`
    *   `A[3] = 2`: `C[2]` is `3`. Place `2` at `B[3-1] = B[2]`. Decrement `C[2]` to `2`.
        `B = [_, _, 2, 2, _, 5, 7]`
        `C = [0, 2, 2, 4, 5, 5, 6, 6]`
    *   `A[2] = 1`: `C[1]` is `2`. Place `1` at `B[2-1] = B[1]`. Decrement `C[1]` to `1`.
        `B = [_, 1, 2, 2, _, 5, 7]`
        `C = [0, 1, 2, 4, 5, 5, 6, 6]`
    *   `A[1] = 4`: `C[4]` is `5`. Place `4` at `B[5-1] = B[4]`. Decrement `C[4]` to `4`.
        `B = [_, 1, 2, 2, 4, 5, 7]`
        `C = [0, 1, 2, 4, 4, 5, 6, 6]`
    *   `A[0] = 1`: `C[1]` is `1`. Place `1` at `B[1-1] = B[0]`. Decrement `C[1]` to `0`.
        `B = [1, 1, 2, 2, 4, 5, 7]`
        `C = [0, 0, 2, 4, 4, 5, 6, 6]`
    *   *Explanation:* Iterate through the original array from right to left. Use the cumulative counts to find the correct position for each element in the `output_array`. Decrement the count after placement to handle duplicates correctly and maintain stability.

6.  **Copy back (optional):**
    *   `A = [1, 1, 2, 2, 4, 5, 7]`
    *   *Explanation:* The sorted elements are now in the original array.

**Final Answer:** $\boxed{[1, 1, 2, 2, 4, 5, 7]}$
**Reflection:** This example demonstrates the basic flow with positive integers and duplicates. The `min_val = 1` meant we effectively used indices 1-7 of our `count_array`.

### Example 2: Including Zero and a Larger Range

**Problem:** Sort the array `A = [6, 0, 2, 0, 1, 3, 4, 6, 1, 3, 2]` using Counting Sort.

**Given:** `A = [6, 0, 2, 0, 1, 3, 4, 6, 1, 3, 2]`
**Want:** Sorted array `A_sorted`

**Steps:**

1.  **Find range (k):**
    *   `min_val = 0`
    *   `max_val = 6`
    *   So, `k = 6`. We need a `count_array` of size `k+1 = 7` (for indices 0-6).
    *   *Explanation:* The range includes zero, which is common.

2.  **Create and initialize `count_array`:**
    *   `C = [0, 0, 0, 0, 0, 0, 0]` (Indices 0-6)
    *   *Explanation:* Standard initialization.

3.  **Populate `count_array`:**
    *   `A = [6, 0, 2, 0, 1, 3, 4, 6, 1, 3, 2]`
    *   `C[6]++` (1)
    *   `C[0]++` (1)
    *   `C[2]++` (1)
    *   `C[0]++` (2)
    *   `C[1]++` (1)
    *   `C[3]++` (1)
    *   `C[4]++` (1)
    *   `C[6]++` (2)
    *   `C[1]++` (2)
    *   `C[3]++` (2)
    *   `C[2]++` (2)
    *   After processing `A`: `C = [2, 2, 2, 2, 1, 0, 2]`
    *   *Explanation:* Each element's frequency is tallied.

4.  **Modify `count_array` for cumulative counts:**
    *   `C[0]` remains `2`.
    *   `C[1] = C[1] + C[0] = 2 + 2 = 4`.
    *   `C[2] = C[2] + C[1] = 2 + 4 = 6`.
    *   `C[3] = C[3] + C[2] = 2 + 6 = 8`.
    *   `C[4] = C[4] + C[3] = 1 + 8 = 9`.
    *   `C[5] = C[5] + C[4] = 0 + 9 = 9`.
    *   `C[6] = C[6] + C[5] = 2 + 9 = 11`.
    *   Final `C` (cumulative): `[2, 4, 6, 8, 9, 9, 11]`
    *   *Explanation:* Cumulative counts are calculated. `C[6]=11` means there are 11 elements $\le 6$, which is the total number of elements in `A`, as expected.

5.  **Build `output_array` (`B`) (iterate `A` backwards):**
    *   `B = [_, _, _, _, _, _, _, _, _, _, _]` (size 11)
    *   `A[10] = 2`: `C[2]` is `6`. Place `2` at `B[5]`. Decrement `C[2]` to `5`.
        `B = [_, _, _, _, _, 2, _, _, _, _, _]`
        `C = [2, 4, 5, 8, 9, 9, 11]`
    *   `A[9] = 3`: `C[3]` is `8`. Place `3` at `B[7]`. Decrement `C[3]` to `7`.
        `B = [_, _, _, _, _, 2, _, 3, _, _, _]`
        `C = [2, 4, 5, 7, 9, 9, 11]`
    *   `A[8] = 1`: `C[1]` is `4`. Place `1` at `B[3]`. Decrement `C[1]` to `3`.
        `B = [_, _, _, 1, _, 2, _, 3, _, _, _]`
        `C = [2, 3, 5, 7, 9, 9, 11]`
    *   `A[7] = 6`: `C[6]` is `11`. Place `6` at `B[10]`. Decrement `C[6]` to `10`.
        `B = [_, _, _, 1, _, 2, _, 3, _, _, 6]`
        `C = [2, 3, 5, 7, 9, 9, 10]`
    *   `A[6] = 4`: `C[4]` is `9`. Place `4` at `B[8]`. Decrement `C[4]` to `8`.
        `B = [_, _, _, 1, _, 2, _, 3, 4, _, 6]`
        `C = [2, 3, 5, 7, 8, 9, 10]`
    *   `A[5] = 3`: `C[3]` is `7`. Place `3` at `B[6]`. Decrement `C[3]` to `6`.
        `B = [_, _, _, 1, _, 2, 3, 3, 4, _, 6]`
        `C = [2, 3, 5, 6, 8, 9, 10]`
    *   `A[4] = 1`: `C[1]` is `3`. Place `1` at `B[2]`. Decrement `C[1]` to `2`.
        `B = [_, _, 1, 1, _, 2, 3, 3, 4, _, 6]`
        `C = [2, 2, 5, 6, 8, 9, 10]`
    *   `A[3] = 0`: `C[0]` is `2`. Place `0` at `B[1]`. Decrement `C[0]` to `1`.
        `B = [_, 0, 1, 1, _, 2, 3, 3, 4, _, 6]`
        `C = [1, 2, 5, 6, 8, 9, 10]`
    *   `A[2] = 2`: `C[2]` is `5`. Place `2` at `B[4]`. Decrement `C[2]` to `4`.
        `B = [_, 0, 1, 1, 2, 2, 3, 3, 4, _, 6]`
        `C = [1, 2, 4, 6, 8, 9, 10]`
    *   `A[1] = 0`: `C[0]` is `1`. Place `0` at `B[0]`. Decrement `C[0]` to `0`.
        `B = [0, 0, 1, 1, 2, 2, 3, 3, 4, _, 6]`
        `C = [0, 2, 4, 6, 8, 9, 10]`
    *   `A[0] = 6`: `C[6]` is `10`. Place `6` at `B[9]`. Decrement `C[6]` to `9`.
        `B = [0, 0, 1, 1, 2, 2, 3, 3, 4, 6, 6]`
        `C = [0, 2, 4, 6, 8, 9, 9]`
    *   *Explanation:* Careful, step-by-step placement, ensuring stability by iterating backwards.

6.  **Copy back (optional):**
    *   `A = [0, 0, 1, 1, 2, 2, 3, 3, 4, 6, 6]`
    *   *Explanation:* The original array is now sorted.

**Final Answer:** $\boxed{[0, 0, 1, 1, 2, 2, 3, 3, 4, 6, 6]}$
**Reflection:** This example shows how Counting Sort naturally handles zero and a slightly larger input size. The logic remains consistent.

### Example 3: Demonstrating Stability with Labeled Elements

**Problem:** Sort the array `A = [3_a, 1_a, 2_a, 3_b, 1_b]` using Counting Sort. The subscripts `_a`, `_b` denote original relative order for identical elements.

**Given:** `A = [3_a, 1_a, 2_a, 3_b, 1_b]`
**Want:** Sorted array `A_sorted` (stable sort: `1_a` before `1_b`, `3_a` before `3_b`)

**Steps:**

1.  **Find range (k):**
    *   `min_val = 1`
    *   `max_val = 3`
    *   So, `k = 3`. We need a `count_array` of size `k+1 = 4` (for indices 0-3).

2.  **Create and initialize `count_array`:**
    *   `C = [0, 0, 0, 0]` (Indices 0-3)

3.  **Populate `count_array`:**
    *   `A = [3_a, 1_a, 2_a, 3_b, 1_b]`
    *   `C[3]++` (1)
    *   `C[1]++` (1)
    *   `C[2]++` (1)
    *   `C[3]++` (2)
    *   `C[1]++` (2)
    *   After processing `A`: `C = [0, 2, 1, 2]`
    *   *Explanation:* Counts are `2` for `1`, `1` for `2`, `2` for `3`.

4.  **Modify `count_array` for cumulative counts:**
    *   `C[0]` remains `0`.
    *   `C[1]` remains `2`.
    *   `C[2] = C[2] + C[1] = 1 + 2 = 3`.
    *   `C[3] = C[3] + C[2] = 2 + 3 = 5`.
    *   Final `C` (cumulative): `[0, 2, 3, 5]`
    *   *Explanation:* Cumulative counts tell us positions.

5.  **Build `output_array` (`B`) (iterate `A` backwards):**
    *   `B = [_, _, _, _, _]` (size 5)
    *   `A[4] = 1_b`: `C[1]` is `2`. Place `1_b` at `B[2-1] = B[1]`. Decrement `C[1]` to `1`.
        `B = [_, 1_b, _, _, _]`
        `C = [0, 1, 3, 5]`
    *   `A[3] = 3_b`: `C[3]` is `5`. Place `3_b` at `B[5-1] = B[4]`. Decrement `C[3]` to `4`.
        `B = [_, 1_b, _, _, 3_b]`
        `C = [0, 1, 3, 4]`
    *   `A[2] = 2_a`: `C[2]` is `3`. Place `2_a` at `B[3-1] = B[2]`. Decrement `C[2]` to `2`.
        `B = [_, 1_b, 2_a, _, 3_b]`
        `C = [0, 1, 2, 4]`
    *   `A[1] = 1_a`: `C[1]` is `1`. Place `1_a` at `B[1-1] = B[0]`. Decrement `C[1]` to `0`.
        `B = [1_a, 1_b, 2_a, _, 3_b]`
        `C = [0, 0, 2, 4]`
    *   `A[0] = 3_a`: `C[3]` is `4`. Place `3_a` at `B[4-1] = B[3]`. Decrement `C[3]` to `3`.
        `B = [1_a, 1_b, 2_a, 3_a, 3_b]`
        `C = [0, 0, 2, 3]`
    *   *Explanation:* Notice how `1_b` was placed at index 1, and then `1_a` was placed at index 0. This maintains their original relative order (`1_a` came before `1_b` in the input). The same applies to `3_a` and `3_b`.

6.  **Copy back (optional):**
    *   `A = [1_a, 1_b, 2_a, 3_a, 3_b]`

**Final Answer:** $\boxed{[1_a, 1_b, 2_a, 3_a, 3_b]}$
**Reflection:** This example explicitly highlights the stability of Counting Sort, which is achieved by processing the input array from right to left in Step 5. If we processed from left to right, `1_a` would be placed after `1_b`, violating stability.

### Example 4: Handling Negative Numbers (with Shifting)

**Problem:** Sort the array `A = [-2, 3, 0, -1, 3, 0, -2]` using Counting Sort.

**Given:** `A = [-2, 3, 0, -1, 3, 0, -2]`
**Want:** Sorted array `A_sorted`

**Steps:**

1.  **Find range (k) and apply shifting:**
    *   `min_val = -2`
    *   `max_val = 3`
    *   To handle negative numbers, we shift all values by adding `|min_val|` (or `min_val` if `min_val` is positive, but here it's negative, so we add `2`).
    *   `shift = 2`
    *   The shifted values will range from `(-2 + 2)` to `(3 + 2)`, i.e., from `0` to `5`.
    *   So, `k_shifted = 5`. We need a `count_array` of size `k_shifted + 1 = 6` (for indices 0-5).
    *   *Explanation:* Counting Sort typically works with non-negative integers. By adding a `shift` value to all numbers, we transform them into a non-negative range, perform the sort, and then subtract the `shift` at the end.

2.  **Create and initialize `count_array`:**
    *   `C = [0, 0, 0, 0, 0, 0]` (Indices 0-5)

3.  **Populate `count_array` (with shifted values):**
    *   `A = [-2, 3, 0, -1, 3, 0, -2]`
    *   `A[0] = -2`: Shifted: `-2 + 2 = 0`. `C[0]++` (1)
    *   `A[1] = 3`: Shifted: `3 + 2 = 5`. `C[5]++` (1)
    *   `A[2] = 0`: Shifted: `0 + 2 = 2`. `C[2]++` (1)
    *   `A[3] = -1`: Shifted: `-1 + 2 = 1`. `C[1]++` (1)
    *   `A[4] = 3`: Shifted: `3 + 2 = 5`. `C[5]++` (2)
    *   `A[5] = 0`: Shifted: `0 + 2 = 2`. `C[2]++` (2)
    *   `A[6] = -2`: Shifted: `-2 + 2 = 0`. `C[0]++` (2)
    *   After processing `A` (shifted): `C = [2, 1, 2, 0, 0, 2]`
    *   *Explanation:* Each element is first shifted, then its frequency is tallied.

4.  **Modify `count_array` for cumulative counts:**
    *   `C[0]` remains `2`.
    *   `C[1] = C[1] + C[0] = 1 + 2 = 3`.
    *   `C[2] = C[2] + C[1] = 2 + 3 = 5`.
    *   `C[3] = C[3] + C[2] = 0 + 5 = 5`.
    *   `C[4] = C[4] + C[3] = 0 + 5 = 5`.
    *   `C[5] = C[5] + C[4] = 2 + 5 = 7`.
    *   Final `C` (cumulative): `[2, 3, 5, 5, 5, 7]`
    *   *Explanation:* Cumulative counts are calculated for the *shifted* values.

5.  **Build `output_array` (`B`) (iterate `A` backwards, apply shift):**
    *   `B = [_, _, _, _, _, _, _]` (size 7)
    *   `A[6] = -2`: Shifted `0`. `C[0]` is `2`. Place `-2` at `B[2-1] = B[1]`. Decrement `C[0]` to `1`.
        `B = [_, -2, _, _, _, _, _]`
        `C = [1, 3, 5, 5, 5, 7]`
    *   `A[5] = 0`: Shifted `2`. `C[2]` is `5`. Place `0` at `B[5-1] = B[4]`. Decrement `C[2]` to `4`.
        `B = [_, -2, _, _, 0, _, _]`
        `C = [1, 3, 4, 5, 5, 7]`
    *   `A[4] = 3`: Shifted `5`. `C[5]` is `7`. Place `3` at `B[7-1] = B[6]`. Decrement `C[5]` to `6`.
        `B = [_, -2, _, _, 0, _, 3]`
        `C = [1, 3, 4, 5, 5, 6]`
    *   `A[3] = -1`: Shifted `1`. `C[1]` is `3`. Place `-1` at `B[3-1] = B[2]`. Decrement `C[1]` to `2`.
        `B = [_, -2, -1, _, 0, _, 3]`
        `C = [1, 2, 4, 5, 5, 6]`
    *   `A[2] = 0`: Shifted `2`. `C[2]` is `4`. Place `0` at `B[4-1] = B[3]`. Decrement `C[2]` to `3`.
        `B = [_, -2, -1, 0, 0, _, 3]`
        `C = [1, 2, 3, 5, 5, 6]`
    *   `A[1] = 3`: Shifted `5`. `C[5]` is `6`. Place `3` at `B[6-1] = B[5]`. Decrement `C[5]` to `5`.
        `B = [_, -2, -1, 0, 0, 3, 3]`
        `C = [1, 2, 3, 5, 5, 5]`
    *   `A[0] = -2`: Shifted `0`. `C[0]` is `1`. Place `-2` at `B[1-1] = B[0]`. Decrement `C[0]` to `0`.
        `B = [-2, -2, -1, 0, 0, 3, 3]`
        `C = [0, 2, 3, 5, 5, 5]`
    *   *Explanation:* The elements are placed based on their *shifted* values' cumulative counts, but the *original* values are what get put into the output array. This is crucial.

6.  **Copy back (optional):**
    *   `A = [-2, -2, -1, 0, 0, 3, 3]`

**Final Answer:** $\boxed{[-2, -2, -1, 0, 0, 3, 3]}$
**Reflection:** Handling negative numbers requires an initial shift to map all values to a non-negative range. The `shift` value must be added when populating the counting array and subtracted when placing elements back into the output array. This adds a slight overhead but makes the algorithm applicable to a broader range of integer inputs.

## 6. Common mistakes and traps

1.  **Incorrect `count_array` size:** A common error is to declare `count_array` with size `max_val` instead of `max_val + 1` (or `k+1`). This results in an `ArrayIndexOutOfBoundsException` when trying to count the `max_val` itself. Remember, if values range from 0 to `k`, you need `k+1` slots.
2.  **Off-by-one errors with indexing:** When the minimum value (`min_val`) is not 0, students often forget to adjust indices. For an element `x`, you should use `C[x - min_val]` to access its count. Failing to do this leads to incorrect counts or out-of-bounds access.
3.  **Not iterating backwards for output array:** This is the most common mistake for losing stability. If you iterate through the input array from left to right when building the output, elements with identical values will have their relative order reversed. The backwards iteration ensures that the rightmost occurrence of a value gets its correct position first, then the one to its left, preserving their original relative order.
4.  **Forgetting to decrement cumulative counts:** After placing an element `A[j]` into `output_array[C[A[j]] - 1]`, you *must* decrement `C[A[j]]`. If you don't, the next identical element will try to write to the exact same position, overwriting the previous one.
5.  **Trying to sort non-integers or a very large range:** Counting Sort is fundamentally designed for integers within a *limited* range. Trying to use it for floating-point numbers, strings, or integers spanning an astronomical range (e.g., `long` values up to `2^63 - 1`) will either fail or lead to an `count_array` that is too large to fit in memory.
6.  **Misunderstanding space complexity:** While Counting Sort can be faster than comparison sorts, it requires $O(k)$ auxiliary space for the `count_array` and $O(n)$ for the `output_array`. Students sometimes overlook this, assuming it's an in-place sort. If $k$ is very large, the space complexity can be prohibitive.

## 7. Textbook-precise explanation

Counting sort is a linear-time sorting algorithm for integers with small non-negative integer keys. It is not a comparison sort; instead, it determines the sorted position of each element by counting the number of elements less than or equal to it.

**Algorithm COUNTING-SORT(A, B, k)**

*   **Input:**
    *   `A`: An array of `n` integers to be sorted.
    *   `B`: An output array of size `n`.
    *   `k`: The maximum value in `A` (assuming minimum value is 0). If the minimum value is `min_val`, then `k` represents `max_val - min_val`.

*   **Auxiliary Space:**
    *   `C`: An auxiliary array of size $k+1$ (or `max_val - min_val + 1` if `min_val` is not 0).

1.  **Initialize Counting Array:**
    For $i = 0$ to $k$:
    $$C[i] = 0$$
    *This step initializes the frequency array `C` to all zeros. Time complexity: $O(k)$.*

2.  **Populate Counting Array (Frequencies):**
    For $j = 0$ to $n-1$:
    $$C[A[j]] = C[A[j]] + 1$$
    *(If handling arbitrary `min_val`: $C[A[j] - \text{min\_val}] = C[A[j] - \text{min\_val}] + 1$)*
    *This step counts the occurrences of each element in the input array `A`. Time complexity: $O(n)$.*

3.  **Compute Cumulative Counts:**
    For $i = 1$ to $k$:
    $$C[i] = C[i] + C[i-1]$$
    *(If handling arbitrary `min_val`: $C[i - \text{min\_val}] = C[i - \text{min\_val}] + C[i - 1 - \text{min\_val}]$)*
    *This step modifies `C` such that `C[i]` now contains the number of elements less than or equal to `i`. This represents the final 1-based position of element `i` in the sorted output. Time complexity: $O(k)$.*

4.  **Build Output Array (Stable Placement):**
    For $j = n-1$ down to $0$:
    $$B[C[A[j]] - 1] = A[j]$$
    $$C[A[j]] = C[A[j]] - 1$$
    *(If handling arbitrary `min_val`: $B[C[A[j] - \text{min\_val}] - 1] = A[j]$ and $C[A[j] - \text{min\_val}] = C[A[j] - \text{min\_val}] - 1$)*
    *This step places each element `A[j]` into its correct sorted position in `B`. Iterating backwards ensures stability. The count `C[A[j]]` is decremented after placing an element to handle duplicates correctly. Time complexity: $O(n)$.*

**Analysis:**

*   **Time Complexity:**
    *   Step 1: $O(k)$
    *   Step 2: $O(n)$
    *   Step 3: $O(k)$
    *   Step 4: $O(n)$
    *   Total Time Complexity: $O(n + k)$.
    This makes Counting Sort highly efficient when $k$ is not significantly larger than $n$.

*   **Space Complexity:**
    *   `C` array: $O(k)$
    *   `B` array: $O(n)$
    *   Total Space Complexity: $O(n + k)$.
    This is a disadvantage when $k$ is very large, as it requires substantial auxiliary memory.

*   **Stability:** Counting sort, as described above with the backward iteration in Step 4, is a **stable** sorting algorithm. This means that if two elements have the same value, their relative order in the input array is preserved in the output array. This property is crucial for algorithms like Radix Sort, where Counting Sort is used as a subroutine.

**Reference:**
Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed., Chapter 8.2: Counting Sort, pp. 210-213). MIT Press.

## 8. ASCII diagrams

Let's visualize the state of the arrays at each major step for `A = [4, 2, 2, 8, 3, 3, 1]`.
Here, `n=7` and `max_val=8`. We'll use `count_array` of size `max_val+1 = 9`.

```text
Input Array A (n=7):
Idx: 0  1  2  3  4  5  6
Val: 4  2  2  8  3  3  1

1. Initialize Count Array C (k+1 = 9 elements, for values 0-8):
Idx: 0  1  2  3  4  5  6  7  8
Val: 0  0  0  0  0  0  0  0  0

2. Populate Count Array C (Frequency Counts):
   (Iterate A: 4, 2, 2, 8, 3, 3, 1)
Idx: 0  1  2  3  4  5  6  7  8
Val: 0  1  2  2  1  0  0  0  1
   (Meaning: one '1', two '2's, two '3's, one '4', one '8')

3. Modify Count Array C (Cumulative Counts):
   (C[i] = C[i] + C[i-1])
Idx: 0  1  2  3  4  5  6  7  8
Val: 0  1  3  5  6  6  6  6  7
   (Meaning: 1 number <= 1, 3 numbers <= 2, 5 numbers <= 3, etc.)

4. Build Output Array B (n=7 elements):
   (Iterate A backwards: A[6]=1, A[5]=3, A[4]=3, A[3]=8, A[2]=2, A[1]=2, A[0]=4)
   Initialize B: [_, _, _, _, _, _, _]

   Processing A[6]=1:
     C[1] is 1. Place 1 at B[1-1] = B[0]. Decrement C[1] to 0.
     B: [1, _, _, _, _, _, _]
     C: [0, 0, 3, 5, 6, 6, 6, 6, 7]

   Processing A[5]=3:
     C[3] is 5. Place 3 at B[5-1] = B[4]. Decrement C[3] to 4.
     B: [1, _, _, _, 3, _, _]
     C: [0, 0, 3, 4, 6, 6, 6, 6, 7]

   Processing A[4]=3:
     C[3] is 4. Place 3 at B[4-1] = B[3]. Decrement C[3] to 3.
     B: [1, _, _, 3, 3, _, _]
     C: [0, 0, 3, 3, 6, 6, 6, 6, 7]

   Processing A[3]=8:
     C[8] is 7. Place 8 at B[7-1] = B[6]. Decrement C[8] to 6.
     B: [1, _, _, 3, 3, _, 8]
     C: [0, 0, 3, 3, 6, 6, 6, 6, 6]

   Processing A[2]=2:
     C[2] is 3. Place 2 at B[3-1] = B[2]. Decrement C[2] to 2.
     B: [1, _, 2, 3, 3, _, 8]
     C: [0, 0, 2, 3, 6, 6, 6, 6, 6]

   Processing A[1]=2:
     C[2] is 2. Place 2 at B[2-1] = B[1]. Decrement C[2] to 1.
     B: [1, 2, 2, 3, 3, _, 8]
     