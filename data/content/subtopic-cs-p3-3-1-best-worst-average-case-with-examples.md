## What it is
Best, worst, and average-case analysis describes an algorithm's performance based on the specific *type* of input it receives for a given size, $n$. Instead of a single performance measure, it provides a spectrum: the absolute fastest (best case), the absolute slowest (worst case), and the expected performance across all possible inputs (average case).

## Why it matters
Worst-case analysis is non-negotiable in safety-critical systems like rocket guidance or aircraft flight control, where a performance guarantee is a matter of mission success or failure. Average-case analysis is vital for designing systems that are efficient in practice, such as database query optimizers or the training phase of machine learning models, where performance on typical data is what counts. Understanding this spectrum prevents you from choosing an algorithm that is brilliant on average but catastrophically slow on the one input that matters.

## When to study it
You must have a firm grasp of Asymptotic Notation, specifically Big-O ($O$), Big-Omega ($\Omega$), and Big-Theta ($\Theta$). You should be able to look at simple loops and determine their time complexity in terms of $n$. If you are not comfortable deriving that a simple nested loop is $O(n^2)$, you should review that material first.

## How to study it (step by step)
1.  **Solidify the Core Idea:** Write down in your own words the difference between an algorithm's running time $T(I)$ on a specific input instance $I$, and its worst-case complexity $T_{worst}(n)$ for an input of size $n$. The key is that $T_{worst}(n) = \max_{|I|=n} \{T(I)\}$. Do the same for best case (min) and average case (expected value).
2.  **Analyze Linear Search:** Take the simple algorithm for finding an element in an unsorted array of size $n$.
    *   What is the best possible input? (The element is at the first position). What is the runtime?
    *   What is the worst possible input? (The element is at the last position, or not present). What is the runtime?
    *   What is the average runtime, assuming the element is in the array and is equally likely to be at any position? Derive the arithmetic series for the expected number of comparisons.
3.  **Analyze Insertion Sort:** Repeat the process for Insertion Sort.
    *   Best case input: An already sorted array. Trace the algorithm and count the comparisons.
    *   Worst case input: A reverse-sorted array. Trace the first 3-4 outer loop iterations to see the pattern of maximum comparisons.
    *   Average case: A randomly shuffled array. Intuitively, why does it behave more like the worst case than the best case? (Each element must be compared with, on average, half of the elements in the sorted portion).
4.  **Contrast with a Constant Case:** Analyze an algorithm to find the sum of all numbers in an array. What are its best, worst, and average cases? Realize that for some algorithms, these are all the same. This contrast is critical.
5.  **Connect to Asymptotic Notation:** For each case you analyzed (best, worst, average), express the runtime using the appropriate notation. For example, for linear search, the best case is $\Omega(1)$, the worst case is $O(n)$, and the average case is $\Theta(n)$. Notice how we use $\Omega$ for the best-case lower bound, $O$ for the worst-case upper bound, and $\Theta$ for a tight average-case bound.

## Key ideas, with intuition
1.  **Complexity depends on input *structure*, not just size.** Two arrays of size $n=1,000,000$ can produce vastly different runtimes for the same sorting algorithm. One might be already sorted (best case), while the other might be reverse-sorted (worst case).
2.  **Worst Case ($O$) is a guarantee.** When we say an algorithm is $O(n^2)$, we are usually referring to its worst-case behavior. This is a promise: "No matter how nasty the input of size $n$, this algorithm will never take more steps than some constant multiple of $n^2$ for large enough $n$." This is the most important analysis for mission-critical applications.
    $$ T_{worst}(n) = \max_{I \text{ s.t. } |I|=n} \{ \text{Time}(I) \} $$
3.  **Best Case ($\Omega$) is a lower bound.** This tells you the absolute minimum work the algorithm *must* do for an input of size $n$. It's useful for identifying trivial inputs and for comparing algorithms at their most efficient. An algorithm cannot perform better than its best-case complexity.
    $$ T_{best}(n) = \min_{I \text{ s.t. } |I|=n} \{ \text{Time}(I) \} $$
4.  **Average Case ($\Theta$) is the *expected* performance.** This is the most realistic measure for everyday applications. It requires us to make an assumption about the distribution of inputs (e.g., "all permutations of the input array are equally likely"). It is an average over all possible inputs of size $n$, not an average of the best and worst cases.
    $$ T_{avg}(n) = \sum_{I \text{ s.t. } |I|=n} \text{Time}(I) \cdot P(I) $$
    where $P(I)$ is the probability of encountering input $I$.

## Worked example
Let's analyze **Insertion Sort** on an array of size $n$. The algorithm iterates from `i = 1` to `n-1`, taking the element `A[i]` and inserting it into its correct position within the already sorted subarray `A[0...i-1]`.

**Algorithm Pseudocode:**
```
for i from 1 to n-1:
  key = A[i]
  j = i - 1
  while j >= 0 and A[j] > key:
    A[j+1] = A[j]
    j = j - 1
  A[j+1] = key
```

**1. Best-Case Analysis**
*   **Input:** An already sorted array. E.g., `[10, 20, 30, 40]`.
*   **Execution:** For each element `A[i]`, the inner `while` loop condition `A[j] > key` is immediately false. The element `A[i]` is already in its correct place relative to the sorted subarray `A[0...i-1]`.
*   **Cost:** The outer loop runs $n-1$ times. The inner loop condition is checked once per outer loop iteration. Thus, the total number of operations is proportional to $n$.
*   **Result:** The best-case running time is $\Theta(n)$.

**2. Worst-Case Analysis**
*   **Input:** A reverse-sorted array. E.g., `[40, 30, 20, 10]`.
*   **Execution:** For each element `A[i]`, we must compare it with *all* the elements in the sorted subarray `A[0...i-1]` and shift them all one position to the right.
*   **Cost:**
    *   For `i = 1`, the inner loop runs 1 time.
    *   For `i = 2`, the inner loop runs 2 times.
    *   ...
    *   For `i = n-1`, the inner loop runs $n-1$ times.
    The total number of inner loop comparisons is the sum of an arithmetic series:
    $$ S = 1 + 2 + 3 + \dots + (n-1) = \frac{(n-1)(n)}{2} = \frac{1}{2}n^2 - \frac{1}{2}n $$
*   **Result:** The dominant term is $n^2$. The worst-case running time is $\Theta(n^2)$.

**3. Average-Case Analysis**
*   **Input:** A randomly shuffled array.
*   **Execution:** On average, for each element `A[i]`, we expect to compare it with about half of the elements in the sorted subarray `A[0...i-1]` before finding its insertion point.
*   **Cost:** The number of comparisons for inserting `A[i]` is roughly $i/2$. The total cost is the sum $\sum_{i=1}^{n-1} \frac{i}{2} = \frac{1}{2} \sum_{i=1}^{n-1} i = \frac{1}{2} \frac{(n-1)n}{2} = \frac{1}{4}n^2 - \frac{1}{4}n$.
*   **Result:** The dominant term is still $n^2$. The average-case running time is $\Theta(n^2)$.

**Reflection:**
This example clearly shows how input structure matters. The best case $(\Theta(n))$ is dramatically different from the worst and average cases $(\Theta(n^2))$. This tells us that Insertion Sort is very fast on nearly-sorted data but slow on random or reverse-sorted data.

## Diagrams

This diagram illustrates the relationship between best, average, and worst-case complexity for an algorithm like Insertion Sort.

```text
  Runtime
    ^
    |
    |                                     /  Worst Case (O(n^2))
    |                                    /
    |                                   /
    |                                  / Average Case (Θ(n^2))
    |                                 .
    |                                .
    |                               .
    |                              .
    |                             .
    |                           .
    |                         /
    |                       /
    |                     / Best Case (Ω(n))
    |                   /
    |                 /
    |_______________/__________________________> Input Size (n)
```

## Memory technique — remember this forever
1.  **The "Airport Security" Story:**
    *   **Best Case:** You arrive, there's no line, you have no metal on you, and you walk straight through. This is the absolute minimum time it takes. ($\Omega$)
    *   **Worst Case:** You arrive during peak holiday season, the line snakes around the building, and you get flagged for a full manual bag search. This is the maximum possible delay, the one you plan for if you absolutely cannot miss your flight. ($O$)
    *   **Average Case:** You arrive on a normal Tuesday. There's a short line, you have to take your laptop out, but it's a predictable, typical wait. This is what you expect on a normal day. ($\Theta$)

2.  **Formulas/Facts to Overlearn:**
    *   Worst Case: $T_{worst}(n) = \max_{|I|=n} \{T(I)\}$. Provides an **upper bound** ($O$).
    *   Best Case: $T_{best}(n) = \min_{|I|=n} \{T(I)\}$. Provides a **lower bound** ($\Omega$).
    *   Average Case: $T_{avg}(n) = \sum_{|I|=n} T(I) \cdot P(I)$. Provides the **expected time** ($\Theta$).

3.  **Spaced Repetition Schedule:**
    *   Review this entire lesson in **1 day**.
    *   Redo the worked example from scratch in **3 days**.
    *   Explain the Airport Security analogy to a friend (or a rubber duck) in **7 days**.
    *   Do the self-check problems in **16 days**.
    *   Re-derive the worst-case for Insertion Sort in **35 days**.

4.  **First Principles Pathway:** If you forget, start with an algorithm you know perfectly, like **Linear Search**.
    *   Ask: "What is the absolute luckiest input of size $n$?" The item is at index 0. Time is constant. That's the best case.
    *   Ask: "What is the absolute unluckiest input?" The item is at the last index or missing. Time is proportional to $n$. That's the worst case.
    *   Ask: "What happens if the item could be anywhere with equal probability?" You'll check half the array on average. Time is proportional to $n$. That's the average case.

## Common mistakes
1.  **Confusing Worst Case with Big-O.** A student might say "The Big-O of this algorithm is $O(n^2)$." This is imprecise. You should say, "The *worst-case time complexity* of this algorithm is $\Theta(n^2)$," or "The running time of this algorithm is in $O(n^2)$." Big-O is a mathematical tool for bounding functions; worst-case is a type of analysis that yields a function to be bounded.
2.  **Calculating Average Case as `(Best + Worst) / 2`.** This is almost always wrong. The average case is a weighted average over the probability of all possible inputs. For many algorithms, the "bad" inputs far outnumber the "good" ones, pulling the average much closer to the worst case.
3.  **Stating a single complexity for an algorithm.** Saying "Quicksort is $O(n \log n)$" is an incomplete statement. A precise statement is "Quicksort has a worst-case complexity of $O(n^2)$ but an average-case complexity of $O(n \log n)$." The case matters.

## Self-check
1.  Consider an algorithm that finds the maximum value in an unsorted array of $n$ distinct integers. What are its best-case, worst-case, and average-case time complexities? Justify your answer.
2.  The standard Quicksort algorithm has a worst-case time complexity of $\Theta(n^2)$. Describe the specific properties of an input array that trigger this worst-case behavior. How does the choice of pivot element influence this?
3.  Derive the average-case time complexity for a linear search on an array of size $n$, given the following probabilities: there is a $50\%$ chance the element is not in the array at all. If the element *is* in the array, it is equally likely to be at any of the $n$ positions.