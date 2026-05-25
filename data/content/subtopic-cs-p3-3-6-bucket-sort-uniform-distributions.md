## What it is
Bucket sort is a non-comparison-based sorting algorithm that operates by distributing elements of an array into a number of "buckets." Each bucket is then sorted individually, either using a different sorting algorithm or by recursively applying the bucket sort algorithm. It is highly effective when the input data is uniformly distributed over a range.

## Why it matters
Bucket sort's strength is its linear average-case time complexity, $O(n)$, which is faster than the $\Omega(n \log n)$ limit of comparison-based sorts like Merge Sort or Quick Sort. This makes it extremely useful for processing large, uniformly distributed datasets. In scientific computing and simulations (e.g., Monte Carlo methods, particle physics), you often generate large sets of pseudorandom numbers that are uniformly distributed, making bucket sort an ideal choice for pre-processing or analysis. In machine learning, features are often normalized to a uniform range like $[0, 1]$, where bucket sort can be used for efficient quantization or binning.

## When to study it
Before tackling this, you must have a firm grasp of the following. If not, master them first.
*   **Core Data Structures:** Arrays and Linked Lists (for implementing the buckets).
*   **Basic Sorting Algorithms:** You must understand Insertion Sort, as it is commonly used to sort the individual buckets. You should also understand Merge Sort or Quick Sort to appreciate the $O(n \log n)$ barrier that bucket sort can break.
*   **Asymptotic Notation:** You need fluency in Big O notation ($O(n)$, $O(n^2)$, $O(n \log n)$) to analyze the algorithm's performance.
*   **Basic Probability:** A conceptual understanding of a uniform distribution is essential. You need to know what it means for data to be "evenly spread" across an interval.

## How to study it (step by step)
1.  **Implement Insertion Sort.** Write a function `insertion_sort(arr)` from scratch. This is not optional. You will use it in step 4. Time yourself; it should take less than 15 minutes.
2.  **Derive the mapping function.** Consider an array `A` of size $n$ with elements drawn from a uniform distribution $U[0, 1)$. We want to distribute these into $k$ buckets, indexed $0, 1, ..., k-1$. The element $A[i]$ should map to bucket index $b_i$. Derive the function $b_i = f(A[i])$. The goal is to map values near 0 to bucket 0, values near $1/k$ to bucket 1, and so on. The correct function is $b_i = \lfloor k \cdot A[i] \rfloor$. Prove to yourself why this works.
3.  **Analyze the ideal case.** Assume you have $n$ elements and you create $n$ buckets. If the data is perfectly uniform, how many elements do you expect in each bucket? Calculate the expected time complexity for scattering ($O(n)$), sorting the buckets (what is the cost to sort an average of one item per bucket?), and gathering ($O(n)$). This is how you derive the $O(n)$ average-case complexity.
4.  **Code it.** Write a `bucket_sort(arr)` function for floating point numbers in $[0, 1)$. Create $n$ empty buckets (an array of lists/vectors). Iterate through the input array, placing each element `x` into `buckets[floor(n*x)]`. Then, iterate through the buckets, sort each one using your `insertion_sort` function, and concatenate the results into a final sorted array.
5.  **Analyze the worst case.** Construct an input array that forces all elements into a single bucket. What is the time complexity now? You will find it is dominated by the sort of that one large bucket, leading to $O(n^2)$ if you used Insertion Sort.
6.  **Generalize.** How would you modify your mapping function and algorithm to handle an array of integers uniformly distributed over the range $[min\_val, max\_val]$? This requires normalizing the values before mapping them to buckets.

## Key ideas, with intuition
1.  **Distribution over Comparison:** The fundamental insight is that we can sort without comparing every element to every other element. Instead, we use the magnitude of the element itself as a key to place it in a pre-determined location (a bucket). This side-steps the $\Omega(n \log n)$ lower bound which only applies to sorting algorithms that rely solely on comparisons.
2.  **The Uniformity Assumption is the Contract:** The algorithm's performance guarantee is built on the assumption that the input data is uniformly distributed. This ensures that, on average, each bucket receives a very small and constant number of elements. If this assumption is violated (e.g., all data points are clustered), the performance degrades severely because one bucket does all the work, nullifying the "divide and conquer" advantage.
    $$E[\text{items per bucket}] = \frac{n}{k}$$
    If we choose $k=n$, the expected number of items per bucket is 1. Sorting a bucket with 0 or 1 items takes constant time, $O(1)$.
3.  **The Mapping Function is the Engine:** The core mechanic is the function that maps a value to a bucket index. For a range $[0, M)$ and $k$ buckets, the mapping is:
    $$\text{index} = \left\lfloor k \cdot \frac{\text{value}}{M} \right\rfloor$$
    This formula scales the value to the range $[0, k)$ and then truncates it to get an integer index. For the common case of floats in $[0, 1)$, $M=1$, simplifying the formula. For integers in $[min, max]$, the effective range is $M = max - min + 1$ and the value must be normalized as `value - min`.

## Worked example
Let's sort the array $A = [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68]$.
Here, $n=10$. We will use $k=n=10$ buckets. The mapping function is $\text{index} = \lfloor 10 \cdot x \rfloor$.

**Step 1: Create empty buckets.**
We create an array of 10 empty lists (our buckets).
`buckets = [[], [], [], [], [], [], [], [], [], []]`

**Step 2: Scatter elements into buckets.**
- $0.78 \to \lfloor 10 \cdot 0.78 \rfloor = 7$. Place in bucket 7.
- $0.17 \to \lfloor 10 \cdot 0.17 \rfloor = 1$. Place in bucket 1.
- $0.39 \to \lfloor 10 \cdot 0.39 \rfloor = 3$. Place in bucket 3.
- $0.26 \to \lfloor 10 \cdot 0.26 \rfloor = 2$. Place in bucket 2.
- $0.72 \to \lfloor 10 \cdot 0.72 \rfloor = 7$. Place in bucket 7.
- $0.94 \to \lfloor 10 \cdot 0.94 \rfloor = 9$. Place in bucket 9.
- $0.21 \to \lfloor 10 \cdot 0.21 \rfloor = 2$. Place in bucket 2.
- $0.12 \to \lfloor 10 \cdot 0.12 \rfloor = 1$. Place in bucket 1.
- $0.23 \to \lfloor 10 \cdot 0.23 \rfloor = 2$. Place in bucket 2.
- $0.68 \to \lfloor 10 \cdot 0.68 \rfloor = 6$. Place in bucket 6.

After scattering, the buckets are:
- `bucket[0]: []`
- `bucket[1]: [0.17, 0.12]`
- `bucket[2]: [0.26, 0.21, 0.23]`
- `bucket[3]: [0.39]`
- `bucket[4]: []`
- `bucket[5]: []`
- `bucket[6]: [0.68]`
- `bucket[7]: [0.78, 0.72]`
- `bucket[8]: []`
- `bucket[9]: [0.94]`

**Step 3: Sort each non-empty bucket.**
We use Insertion Sort on each bucket.
- `bucket[1]: [0.17, 0.12] \to [0.12, 0.17]`
- `bucket[2]: [0.26, 0.21, 0.23] \to [0.21, 0.23, 0.26]`
- `bucket[3]: [0.39]` (already sorted)
- `bucket[6]: [0.68]` (already sorted)
- `bucket[7]: [0.78, 0.72] \to [0.72, 0.78]`
- `bucket[9]: [0.94]` (already sorted)

**Step 4: Gather the elements by concatenating the buckets in order.**
Result: $[0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94]$

**Reflection:** Each step had a distinct purpose. The scattering (Step 2) created a rough ordering—all the 0.1x values went to bucket 1, 0.2x to bucket 2, etc. The sorting (Step 3) handled the local disorder within each bucket. The gathering (Step 4) was trivial because the buckets themselves were already in the correct final order. The efficiency came from the fact that no single bucket became too large.

## Diagrams
```text
Input Array A:
[0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68]
   |     |     |     |     |     |     |     |     |     |
   |     |     |     |     |     |     |     |     |     +-----> Bucket 6: [0.68]
   |     |     |     |     |     |     |     |     +-----------> Bucket 2: [0.26, 0.21, 0.23]
   |     |     |     |     |     |     |     +-----------------> Bucket 1: [0.17, 0.12]
   |     |     |     |     |     |     +-----------------------> Bucket 2
   |     |     |     |     |     +-----------------------------> Bucket 9: [0.94]
   |     |     |     |     +-----------------------------------> Bucket 7: [0.78, 0.72]
   |     |     |     +-----------------------------------------> Bucket 2
   |     |     +-----------------------------------------------> Bucket 3: [0.39]
   |     +-----------------------------------------------------> Bucket 1
   +------------------------------------------------------------> Bucket 7

After Sorting Buckets:
Bucket 0: []
Bucket 1: [0.12, 0.17]
Bucket 2: [0.21, 0.23, 0.26]
Bucket 3: [0.39]
Bucket 4: []
Bucket 5: []
Bucket 6: [0.68]
Bucket 7: [0.72, 0.78]
Bucket 8: []
Bucket 9: [0.94]

Final Concatenation (Gather):
[0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94]
```

## Memory technique — remember this forever
1.  **The Mnemonic:** "Sorting Mail." Imagine a post office with a wall of mail slots, one for each zip code (or street). The mail carrier doesn't compare letters to each other. They look at an address (the element's value), walk to the correct slot (the bucket), and drop it in. This is the **Scatter** phase. Then, a local clerk sorts the handful of letters within each slot. This is the **Sort** phase. Finally, the letters are collected slot by slot, in order. This is the **Gather** phase.
2.  **Must Overlearn:**
    *   **Average Time Complexity (Uniform Data):** $O(n+k)$ where $k$ is the number of buckets. If $k=n$, this is $O(n)$.
    *   **Worst-Case Time Complexity:** $O(n^2)$ (if using Insertion Sort for buckets).
    *   **Mapping Function (for $x \in [0, 1)$ and $k$ buckets):** $\text{index} = \lfloor k \cdot x \rfloor$.
3.  **Spaced Repetition Schedule:** Review this lesson and re-derive the mapping function and complexity at **1 day, 3 days, 7 days, 16 days, and 35 days**. Actively recall, do not just re-read.
4.  **First Principles Pathway:** If you forget everything, remember the "Sorting Mail" analogy. The algorithm must have three steps: Scatter, Sort, Gather.
    *   **Scatter:** How do I map a value to a bucket? The value needs to be scaled to the number of buckets. For a range of size $M$ and $k$ buckets, the value $v$ is at fraction $v/M$ through the range. So map it to bucket $\lfloor k \cdot (v/M) \rfloor$.
    *   **Sort:** Each bucket is a smaller problem. Use a simple sort like Insertion Sort.
    *   **Gather:** Just concatenate.
    *   **Analysis:** The total time is $\sum(\text{cost of sorting bucket } i) + O(n+k)$. If items are spread evenly, the sum is small. If they all go into one bucket, the sum is large, dominated by one term.

## Common mistakes
1.  **Ignoring the Uniformity Assumption:** Applying bucket sort to heavily clustered or skewed data. For example, sorting $[0.01, 0.02, 0.03, 0.04, 0.99]$ with 10 buckets will put four elements in bucket 0 and one in bucket 9, which is inefficient.
2.  **Incorrect Mapping Function:** Off-by-one errors are common. Forgetting to use `floor` or implementing the scaling incorrectly for ranges not starting at 0. For a range $[min, max]$, the correct scaling is on the value `(x - min)`.
3.  **Poor Bucket Data Structure Choice:** Using a fixed-size array for the buckets can be wasteful if many are empty or disastrous if one bucket gets more elements than the array can hold. Using a dynamically-sized list or vector is almost always correct.
4.  **Choosing a Bad Number of Buckets ($k$):** If $k$ is too small (e.g., $k=2$), each bucket will contain $\approx n/2$ elements, and the algorithm degenerates towards $O(n^2)$. If $k$ is too large (e.g., $k > n^2$), you waste memory and time initializing empty buckets. A good heuristic is $k=n$.

## Self-check
1.  Given an input array of numbers in the range $[0, 100)$ and using 10 buckets, which bucket does the number $53.8$ belong to?
2.  You need to sort an array of one million ($10^6$) integers that are known to be uniformly distributed between $min = -5000$ and $max = 5000$. Write down the precise mapping function you would use to assign an element $x$ to a bucket index, assuming you use $n=10^6$ buckets.
3.  Explain in detail why bucket sort's average-case $O(n)$ complexity does not violate the established $\Omega(n \log n)$ lower bound for sorting algorithms. What core assumption is being made that exempts it?