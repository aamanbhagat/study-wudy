## What it is
The Longest Increasing Subsequence (LIS) problem is to find the length of the longest subsequence of a given sequence of numbers in which the subsequence's elements are in strictly increasing order. A subsequence is derived by deleting zero or more elements from the original sequence without changing the relative order of the remaining elements. For example, in `[10, 9, 2, 5, 3, 7]`, `[2, 5, 7]` is an increasing subsequence of length 3.

## Why it matters
This problem is a classic introduction to dynamic programming optimization. The pattern of improving a solution from $O(n^2)$ to $O(n \log n)$ by using a data structure (here, a sorted array with binary search) is a fundamental technique. In aerospace, LIS-like algorithms can be used to analyze telemetry data, finding the longest period of monotonically increasing sensor readings (e.g., temperature or pressure during ascent), which can help identify trends and anomalies.

## When to study it
You should be comfortable with the following before tackling this:
1.  **Dynamic Programming:** You must understand the core concepts of optimal substructure and overlapping subproblems.
2.  **Arrays/Lists:** Manipulation of array elements is central.
3.  **Big O Notation:** To understand why the $O(n \log n)$ solution is a significant improvement.
4.  **Binary Search:** This is the key mechanism for the optimized $O(n \log n)$ solution. If you are not solid on binary search, master it first.

## How to study it (step by step)
1.  **Manual Start:** Take the array `A = [3, 4, -1, 5, 2]` and find the LIS by hand. Write down all increasing subsequences you can find and identify the longest one. Notice the choices you make at each step.
2.  **Formulate the $O(n^2)$ DP:** Define a state $dp[i]$ as "the length of the longest increasing subsequence that *ends* at index $i$". Write down the recurrence relation that connects $dp[i]$ to the values of $dp[j]$ for all $j < i$.
3.  **Code the $O(n^2)$ DP:** Implement this recurrence. The base case is that $dp[i]$ is at least 1 (the element itself). The final answer is the maximum value in your entire $dp$ array, not necessarily the last element.
4.  **Identify the Bottleneck:** Analyze your $O(n^2)$ code. You'll see that for each element $A[i]$, you are doing a linear scan over all previous elements $A[j]$ to find the best one to extend. This linear scan is the source of the $n^2$ complexity. Ask yourself: "How can I find the best previous element more quickly?"
5.  **Introduce the $O(n \log n)$ idea:** Shift your thinking. Instead of tracking LIS lengths ending at each index, maintain an auxiliary array, let's call it `tails`, where `tails[k]` stores the smallest tail element of all increasing subsequences of length $k+1$. This `tails` array will always be sorted.
6.  **Code the $O(n \log n)$ solution:** For each number `x` in the input array, use binary search on `tails` to find the first element greater than or equal to `x`. Replace that element with `x`. If `x` is greater than all elements in `tails`, append it. The length of the LIS is the final size of the `tails` array.

## Key ideas, with intuition
*   **Optimal Substructure ($O(n^2)$ approach):** The core idea is that the LIS ending at a specific position `i` must be formed by extending an existing LIS that ends at some earlier position `j` (where `j < i`), provided that `A[j] < A[i]`. To find the longest possible LIS ending at `i`, we must check all valid previous positions `j` and pick the one that gives the maximum length.
    $$ \text{Let } dp[i] = \text{Length of LIS ending at index } i $$
    $$ dp[i] = 1 + \max(\{dp[j] \mid 0 \le j < i \text{ and } A[j] < A[i]\} \cup \{0\}) $$
    The final answer is $\max_{0 \le i < n}(dp[i])$. The `{0}` handles the case where no such `j` exists, making the LIS just the element `A[i]` itself.

*   **Patience and Greed ($O(n \log n)$ approach):** Imagine you are sorting a deck of cards into piles on a table (this is called Patience Sorting). For each new card, you can either place it on an existing pile if it's smaller than the top card of that pile, or start a new pile to its right. To keep your options open for future cards, you greedily place the new card on the leftmost possible pile it can go on. The number of piles at the end is the length of the LIS.

*   **The `tails` array is not the LIS:** The key insight for the $O(n \log n)$ solution is that the array we maintain, `tails`, does *not* represent an actual increasing subsequence. It's a clever construction. `tails[k]` stores the smallest possible value that an increasing subsequence of length `k+1` can end with. By keeping these tail values as small as possible, we maximize our chances of extending them with future elements. Since a smaller tail for a length `k` subsequence is always better than a larger one, this greedy choice works. The fact that this `tails` array is always sorted allows us to use binary search to find the right place to insert a new element, which is the source of the speedup.

## Worked example
Let's find the LIS length for `A = [10, 9, 2, 5, 3, 7, 101, 18]`.

**1. $O(n^2)$ Method**
We will build the `dp` array, where `dp[i]` is the length of the LIS ending at `A[i]`.

-   `A[0] = 10`: No elements before it. `dp[0] = 1`.
-   `A[1] = 9`: No `A[j] < 9` for `j<1`. `dp[1] = 1`.
-   `A[2] = 2`: No `A[j] < 2` for `j<2`. `dp[2] = 1`.
-   `A[3] = 5`: `A[2] = 2 < 5`. We can extend the LIS ending at 2. `dp[3] = 1 + dp[2] = 2`.
-   `A[4] = 3`: `A[2] = 2 < 3`. We can extend the LIS ending at 2. `dp[4] = 1 + dp[2] = 2`.
-   `A[5] = 7`: We check previous elements `< 7`: `A[2]=2`, `A[3]=5`, `A[4]=3`. The LIS lengths ending there are `dp[2]=1`, `dp[3]=2`, `dp[4]=2`. Max is 2. `dp[5] = 1 + max(dp[3], dp[4]) = 1 + 2 = 3`.
-   `A[6] = 101`: All previous elements are smaller. We find the max `dp` value among them: `max(dp[0..5]) = 3` (from `dp[5]`). `dp[6] = 1 + 3 = 4`.
-   `A[7] = 18`: We check previous elements `< 18`: `10, 9, 2, 5, 3, 7`. The max `dp` value for these is `dp[5]=3`. `dp[7] = 1 + dp[5] = 4`.

Final `dp` array: `[1, 1, 1, 2, 2, 3, 4, 4]`.
The LIS length is `max(dp) = 4`. An example LIS is `[2, 5, 7, 101]` or `[2, 3, 7, 18]`.

**2. $O(n \log n)$ Method**
We maintain the `tails` array.

-   `x = 10`: `tails` is empty. Start a new pile. `tails = [10]`.
-   `x = 9`: Smallest element in `tails` >= 9 is 10. Replace it. `tails = [9]`.
-   `x = 2`: Smallest element in `tails` >= 2 is 9. Replace it. `tails = [2]`.
-   `x = 5`: `5 > 2`. Append it. `tails = [2, 5]`.
-   `x = 3`: Smallest element in `tails` >= 3 is 5. Replace it. `tails = [2, 3]`.
-   `x = 7`: `7 > 3`. Append it. `tails = [2, 3, 7]`.
-   `x = 101`: `101 > 7`. Append it. `tails = [2, 3, 7, 101]`.
-   `x = 18`: Smallest element in `tails` >= 18 is 101. Replace it. `tails = [2, 3, 7, 18]`.

The final `tails` array is `[2, 3, 7, 18]`. Its size is 4.
The LIS length is 4.

**Reflection:** Both methods yield the correct length, 4. The first method required nested loops, comparing each element to all its predecessors. The second method only required one pass and a fast binary search within a small auxiliary array at each step. Notice that the final `tails` array `[2, 3, 7, 18]` *is* one of the possible LISs, but this is not guaranteed in general.

## Diagrams
Here is the evolution of the `tails` array from the $O(n \log n)$ worked example.

```text
Array A = [10, 9, 2, 5, 3, 7, 101, 18]

Processing 10:
tails = [10]

Processing 9:
tails = [9]

Processing 2:
tails = [2]

Processing 5:
tails = [2, 5]

Processing 3:
tails = [2, 3]

Processing 7:
tails = [2, 3, 7]

Processing 101:
tails = [2, 3, 7, 101]

Processing 18:
tails = [2, 3, 7, 18]

Final length: 4
```

## Memory technique — remember this forever
1.  **The Mnemonic Story:**
    *   **$O(n^2)$ is the "Ambitious Climber":** To find your own LIS length, you look back at everyone who came before you (`j < i`). You only consider those shorter than you (`A[j] < A[i]`). You find the one with the best climbing record (`max(dp[j])`) and add yourself to their path (`+ 1`). It's thorough but slow.
    *   **$O(n \log n)$ is the "Patient Card Sorter":** You maintain several sorted piles of cards (`tails` array). When a new card (`x`) arrives, you find the *leftmost pile* whose top card is bigger than or equal to `x` and you replace that top card with `x`. This makes the pile "better" for future cards. If `x` is bigger than all top cards, you start a new pile. The number of piles is your LIS length. This is fast and greedy.

2.  **Formulas to Overlearn:**
    *   **$O(n^2)$ Recurrence:** $dp[i] = 1 + \max(\{dp[j] \mid 0 \le j < i \text{ and } A[j] < A[i]\} \cup \{0\})$
    *   **$O(n \log n)$ Logic:** For each `num` in `A`, use binary search to find the first index `i` in `tails` such that `tails[i] >= num`. Set `tails[i] = num`. If no such index exists, append `num`.

3.  **Spaced Repetition Schedule:**
    *   Review this material and re-implement both solutions from scratch in: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget, start with a simple array like `[2, 5, 3]`.
    *   For `2`: LIS is `[2]`, length 1.
    *   For `5`: It can follow `2`. LIS is `[2, 5]`, length 2.
    *   For `3`: It can follow `2`. LIS is `[2, 3]`, length 2.
    *   This naturally leads to the state "What is the LIS *ending at this element*?" which reconstructs the $O(n^2)$ DP.
    *   Then, ask "Why is it slow?" You're re-scanning `[2, 5]` to process `3`. "How can I find the best predecessor faster?" This pushes you to maintain a sorted structure of some kind, which is the gateway to the $O(n \log n)$ idea.

## Common mistakes
1.  **Subsequence vs. Substring:** Confusing LIS with the Longest Increasing *Substring*. A subsequence's elements do not need to be contiguous in the original array. `[2, 5, 7]` is a subsequence of `[10, 9, 2, 5, 3, 7]`, not a substring.
2.  **Final Answer for $O(n^2)$:** The answer is $\max(dp)$, not `dp[n-1]`. The longest increasing subsequence might not end at the last element of the array.
3.  **Misinterpreting the `tails` array:** Believing the `tails` array in the $O(n \log n)$ solution always contains an actual LIS. It does not. It is a helper array that stores the smallest possible ending values for increasing subsequences of different lengths.
4.  **Off-by-one in Binary Search:** The binary search in the $O(n \log n)$ solution must find the *first element greater than or equal to* the current number. A standard binary search for the number itself will fail. Use the version often called `lower_bound`.

## Self-check
1.  What is the length of the LIS for the array `A = [7, 7, 7, 7, 7]`?
2.  Trace both the $O(n^2)$ and $O(n \log n)$ algorithms on the array `A = [3, 1, 4, 1, 5, 9, 2, 6]`. Do you get the same length? What does the final `tails` array look like?
3.  How would you modify the $O(n \log n)$ algorithm to reconstruct an actual LIS, not just its length? (Hint: you might need to store predecessor indices).