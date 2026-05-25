## What it is
Radix sort is a non-comparison based sorting algorithm that works on integers or data that can be represented as integers. It sorts the data by grouping elements by their individual digits, processing them one place value at a time. This is done either from the least significant digit (LSD) to the most significant, or vice-versa (MSD).

## Why it matters
In high-throughput systems like rocket telemetry or particle accelerator data streams, you often deal with massive arrays of fixed-length integer identifiers or sensor readings. Radix sort can outperform general-purpose comparison sorts like Quicksort or Merge Sort in these scenarios because its performance depends on the number of digits, not just the number of items. This makes it a key algorithm in high-performance computing, large-scale database indexing, and even in constructing suffix arrays for bioinformatics data analysis.

## When to study it
Before tackling Radix Sort, you must have a solid understanding of these prerequisites:
1.  **Big-O Notation:** You need to analyze algorithm complexity.
2.  **Integer Representation:** Understand place value, base (radix), and how to isolate digits (using modulo and division).
3.  **Stable Sorting:** You must know what a stable sort is and why it's important. A sort is stable if two elements with equal keys appear in the same relative order in the sorted output as they did in the input.
4.  **Counting Sort:** Radix Sort uses a stable sort as a subroutine. Counting Sort is the canonical choice. You should have implemented it and understand its $O(n+k)$ complexity. If you do not understand Counting Sort, stop and learn it first.

## How to study it (step by step)
1.  **Implement Counting Sort.** Write a function that performs a stable Counting Sort on an array of integers. Write a specific test case to verify its stability (e.g., sorting pairs `(key, value)` based on the key).
2.  **Trace LSD Radix Sort on Paper.** Take a small array of 5-7 three-digit numbers. Manually perform the LSD Radix Sort, showing the state of the array after sorting by the ones digit, then the tens, then the hundreds.
3.  **Implement LSD Radix Sort.** Write the main Radix Sort function. It should be a loop that runs for each digit position (from LSD to MSD). Inside the loop, it should call a modified version of your Counting Sort to sort the entire array based on the value of the current digit.
4.  **Derive the Time Complexity.** Analyze your implementation. You have an outer loop that runs $d$ times (where $d$ is the number of digits in the largest number). Inside, you call Counting Sort, which is $O(n+k)$. Combine these to formally derive the $O(d(n+k))$ complexity. Clearly define what $n$, $d$, and $k$ represent.
5.  **Contrast with MSD Radix Sort.** Read about the MSD approach. Notice its recursive structure. Understand why it might be faster in some cases (early termination for buckets with one element) but is often more complex to implement correctly.

## Key ideas, with intuition
1.  **Sorting Without Comparisons:** Comparison sorts like Merge Sort are fundamentally limited to $\Omega(n \log n)$ time. Radix sort breaks this barrier by never comparing elements to each other. Instead, it uses the digits of the keys as addresses to distribute elements into buckets, which is a fundamentally different, and potentially faster, operation.

2.  **Stability is the Linchpin:** Imagine sorting `[12, 05, 15]`.
    *   **Pass 1 (ones digit):** We sort by `{2, 5, 5}`. The list becomes `[12, 05, 15]`. Stability is crucial here: `05` came before `15` in the input, and since they have the same ones digit, they must remain in that relative order.
    *   **Pass 2 (tens digit):** We sort `[12, 05, 15]` by `{1, 0, 1}`. The list becomes `[05, 12, 15]`. When considering the tens digit `1`, the algorithm sees `12` and `15`. Because the previous pass was stable, it knows `12` must come before `15`. This preserved order is what makes the whole algorithm work. Without stability, the relative order of `12` and `15` could be scrambled in the second pass, destroying the sortedness achieved in the first pass.

3.  **LSD vs. MSD:**
    *   **LSD (Least Significant Digit):** This is the workhorse method. It is iterative and simple. It sorts the entire array on the 1s place, then the entire array on the 10s place, and so on. It *always* processes all digits for all numbers.
    *   **MSD (Most Significant Digit):** This method is recursive. It partitions the array into buckets based on the most significant digit. Then it recursively calls itself to sort each of those smaller buckets on the next digit. This can be faster if the keys are uniformly distributed, as many buckets will contain only one element and the recursion can terminate early.

4.  **The Complexity Formula: $O(d(n+k))$**
    This formula tells the whole story.
    *   $n$: The number of elements in the input array.
    *   $d$: The number of digits in the largest number. For a 32-bit integer, if we process it byte-by-byte, $d=4$. If we process it in decimal, $d = \lceil \log_{10}(\text{max_val}) \rceil$.
    *   $k$: The radix, or base of the number system. This is the size of our counting array. For decimal digits, $k=10$. For bytes, $k=256$.

    The derivation is straightforward: We must perform a stable sort for each of the $d$ digits. The stable sort we use is Counting Sort, which takes $O(\text{input_size} + \text{range_of_keys})$ time. Here, the input size is always $n$, and the range of keys for a single digit is $k$. Thus, each pass costs $O(n+k)$. We do this $d$ times, so the total is $O(d(n+k))$.

## Worked example
Let's sort the array $A = [170, 45, 75, 90, 802, 24, 2, 66]$ using LSD Radix Sort with base $k=10$. The maximum number is 802, so we need $d=3$ passes.

**Pass 1: Sort by the ones (least significant) digit.**
- We examine the last digit of each number: `0, 5, 5, 0, 2, 4, 2, 6`.
- We use Counting Sort to stably sort the original numbers based on these digits.
- Buckets:
  - `digit 0`: `170, 90`
  - `digit 2`: `802, 2`
  - `digit 4`: `24`
  - `digit 5`: `45, 75` (Note: `45` appears before `75` in the input, so it stays first)
  - `digit 6`: `66`
- Resulting array: $A_1 = [170, 90, 802, 2, 24, 45, 75, 66]$

**Pass 2: Sort by the tens digit.**
- We examine the tens digit of each number in $A_1$: `7, 9, 0, 0, 2, 4, 7, 6`.
- We stably sort $A_1$ based on these digits.
- Buckets:
  - `digit 0`: `802, 2` (Note: `802` appears before `2` in $A_1$, so it stays first)
  - `digit 2`: `24`
  - `digit 4`: `45`
  - `digit 6`: `66`
  - `digit 7`: `170, 75`
  - `digit 9`: `90`
- Resulting array: $A_2 = [802, 2, 24, 45, 66, 170, 75, 90]$

**Pass 3: Sort by the hundreds (most significant) digit.**
- We examine the hundreds digit of each number in $A_2$ (padding with leading zeros): `8, 0, 0, 0, 0, 1, 0, 0`.
- We stably sort $A_2$ based on these digits.
- Buckets:
  - `digit 0`: `2, 24, 45, 66, 75, 90` (Their relative order is preserved from $A_2$)
  - `digit 1`: `170`
  - `digit 8`: `802`
- Final sorted array: $A_3 = [2, 24, 45, 66, 75, 90, 170, 802]$

**Reflection:** Each step worked because the stability of the underlying sort (Counting Sort) preserved the relative ordering established by the previous, less significant digits. By the time we sort by the most significant digit, all numbers within each MSD bucket are already correctly sorted relative to each other.

## Diagrams
This diagram shows the "bucketing" and "collecting" process for Pass 1 of the worked example.

```text
Input Array: [170, 45, 75, 90, 802, 24, 2, 66]

PASS 1: Sort by LSD (Ones Digit)

Distribution (Bucketing):
  Bucket 0: [170, 90]
  Bucket 1: []
  Bucket 2: [802, 2]
  Bucket 3: []
  Bucket 4: [24]
  Bucket 5: [45, 75]
  Bucket 6: [66]
  Bucket 7: []
  Bucket 8: []
  Bucket 9: []

Collection (Flattening the buckets in order):
[170, 90] -> [802, 2] -> [24] -> [45, 75] -> [66]
      |           |         |         |         |
      V           V         V         V         V
Result: [170, 90, 802, 2, 24, 45, 75, 66]
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Radix" sounds like "radish". Imagine sorting a crate of radishes. You don't compare them one-by-one. Instead, you dump them into a machine with bins.
    *   **LSD:** First, you sort them into bins by **leaf color** (least significant attribute). You collect them carefully, keeping them in order. Then you dump them back in and sort by **root size**. The final output is perfectly sorted. The key is that you never compared two radishes directly.
2.  **Must-know formula:**
    $$ \text{Time Complexity} = O(d(n+k)) $$
    Where $d$ is the number of digits, $n$ is the number of elements, and $k$ is the radix (the base, e.g., 10).

3.  **Spaced Repetition Schedule:** Review this lesson and re-derive the complexity at these intervals:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    *   Radix sort works by sorting digit by digit. How many digits are there? Let's call it $d$.
    *   For each digit, it sorts the whole array. What algorithm does it use? A stable sort, typically Counting Sort.
    *   What is the complexity of Counting Sort? It's linear: $O(\text{input_size} + \text{range_of_values})$.
    *   In our case, the input size is $n$. The range of values for a single digit is the base, $k$. So, one pass is $O(n+k)$.
    *   Since we do this for all $d$ digits, the total is $d \times O(n+k) = O(d(n+k))$.

## Common mistakes
1.  **Using an Unstable Sort:** Attempting to use a non-stable sort like a standard Quicksort partition as the subroutine will fail. The relative ordering from previous passes will be destroyed.
2.  **Mishandling Different Lengths:** When sorting `[100, 5, 20]`, you must treat `5` as `005` and `20` as `020`. Forgetting to conceptually pad with leading zeros is a common logical error.
3.  **Assuming $k=10$:** In implementations, especially for 32-bit or 64-bit integers, the radix $k$ is almost never 10. A more efficient choice is a power of 2, like $k=2^8=256$ (sorting byte by byte) or $k=2^{16}$. This changes the number of passes, $d$.
4.  **Oversimplifying Complexity:** Stating the complexity is $O(dn)$ is a common simplification. It's only true if $k$ is small enough to be considered a constant relative to $n$. The term $k$ is important; if you sort 10 numbers whose digits can range from 0 to 1,000,000 ($k=10^6$), the $k$ term dominates.

## Self-check
1.  If you use Radix Sort to sort an array of 32-bit integers, what is a common and efficient choice for the radix $k$? How many passes $d$ would this require?
2.  You are given a list of dates, represented as 8-digit integers in `YYYYMMDD` format (e.g., `20231027`). Would LSD Radix Sort work correctly? If so, trace the first two passes on the list `[19990101, 20000101, 19990201]`. If not, why not?
3.  Merge Sort's complexity is $O(n \log n)$. Radix Sort is $O(d(n+k))$. Assume you are sorting $n$ integers, where the largest number is $W$. Therefore, $d \approx \log_k W$. Substitute this into the Radix Sort complexity. Under what condition (an inequality involving $n, W, k$) is Radix Sort asymptotically faster than Merge Sort?