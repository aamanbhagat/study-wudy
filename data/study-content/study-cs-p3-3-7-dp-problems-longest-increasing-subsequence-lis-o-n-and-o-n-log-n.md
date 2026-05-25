## 1. What it is — in plain English

Imagine you have a list of numbers, like a sequence of daily temperatures or stock prices. Now, you want to pick out some of these numbers, keeping them in their original order, but with one special rule: each number you pick must be strictly larger than the one before it. You want to find the *longest* possible sequence you can make following this rule.

Let's say your list of numbers is `[10, 22, 9, 33, 21, 50, 41, 60]`. If you pick `10, 22, 33, 50, 60`, that's an increasing sequence, and it has 5 numbers. Could you find a longer one? What if you picked `9, 21, 41, 60`? That's also increasing, but only 4 numbers long.

The "Longest Increasing Subsequence" (LIS) is simply the longest possible chain of numbers you can pull out of an original sequence, such that the numbers in your chain are always getting bigger, and they appear in the same relative order as they did in the original list. Crucially, they don't have to be next to each other in the original list; you can skip numbers.

Think of it like choosing a path up a mountain. You have a series of checkpoints, each at a certain altitude. You want to visit as many checkpoints as possible, but you can only move to a checkpoint if it's higher than your current one, and you must follow the original order of checkpoints. The LIS is the longest "uphill" path you can find.

## 2. Why it matters — real-world applications

The Longest Increasing Subsequence problem, and its underlying dynamic programming techniques, are fundamental in computer science and have surprising breadth in real-world applications. Understanding LIS helps in optimizing processes, analyzing data, and even in biological research.

1.  **Bioinformatics and DNA Sequence Alignment:** In genetics, scientists often compare DNA or protein sequences to find similarities, which can indicate evolutionary relationships or functional commonalities. Finding the longest common subsequence (a related problem, often solved with similar DP techniques) or longest increasing subsequence in certain transformed sequences can help identify conserved regions, mutations, or structural patterns that are increasing in some metric (e.g., hydrophobicity of amino acids along a protein chain). This is critical for drug discovery and understanding genetic diseases.

2.  **Financial Market Analysis:** Traders and analysts constantly look for trends in stock prices, commodity values, or currency exchange rates. Identifying a "longest increasing subsequence" in a time series of prices can help detect sustained upward trends, even if there are minor dips along the way. For instance, an algorithm might look for the LIS of daily closing prices to confirm a bullish market trend, ignoring short-term volatility. This can inform automated trading strategies and risk assessment.

3.  **Data Compression and Pattern Recognition:** In various data streams, identifying increasing patterns can be a form of feature extraction. For example, in sensor data from an aircraft (aerospace application), a long increasing subsequence of altitude or speed readings might indicate a specific maneuver or a stable climb. Recognizing these patterns can be used for anomaly detection, predictive maintenance, or even more efficient data encoding if certain increasing sequences are common. In machine learning, LIS-like patterns can be used as features to train models for classification or regression tasks.

4.  **Packet Routing and Network Optimization:** In computer networks, data packets might traverse multiple nodes. If we consider a sequence of nodes that a packet *could* pass through, and each node has a "cost" or "latency" associated with it, finding an LIS could represent a path where latency consistently increases (or decreases, by inverting the problem), helping identify bottlenecks or optimize routing protocols for specific performance metrics. While often more complex algorithms are used, the LIS concept provides a foundational understanding for sequence-based optimization.

## 3. Prerequisites — what you must know first

Before diving deep into the Longest Increasing Subsequence problem, ensure you have a solid grasp of the following concepts:

*   **Arrays/Lists:** Basic data structures for storing ordered collections of elements, allowing access by index.
*   **Loops (for/while):** Fundamental control flow constructs for iterating over collections or repeating operations.
*   **Basic Recursion:** Understanding how a function can call itself to solve smaller instances of a problem, including base cases.
*   **Memoization/Dynamic Programming (DP) basics:** The core idea of storing results of expensive function calls and returning the cached result when the same inputs occur again (memoization), and the broader concept of breaking down a problem into overlapping subproblems and building up solutions from the bottom (dynamic programming).
*   **Time Complexity Analysis (Big O notation):** The ability to analyze and describe the efficiency of algorithms in terms of how their runtime or space requirements grow with input size (e.g., O(n), O(n²), O(n log n)).
*   **Binary Search:** An efficient algorithm for finding an item in a *sorted* list or array, which runs in logarithmic time (O(log n)). This is crucial for understanding the optimized LIS solution.

## 4. The core idea — step by step

Let's break down the LIS problem. We'll start with the more intuitive, but less efficient, O(n²) dynamic programming approach. Then we'll build up to the more advanced O(n log n) solution.

### The O(n²) Dynamic Programming Approach

The key insight for the O(n²) solution is to define a subproblem that allows us to build the overall solution incrementally.

### Step 1: Define the Subproblem

**Plain English:** For each number in our original list, let's figure out the length of the longest increasing sequence that *ends* with that specific number.

**Concrete Example:** If our list is `[10, 22, 9, 33]`:
*   For `10` (at index 0), the longest increasing subsequence ending with `10` is just `[10]`, length 1.
*   For `22` (at index 1), it could be `[22]` (length 1), or `[10, 22]` (length 2). The longest is `[10, 22]`.
*   For `9` (at index 2), it can only be `[9]` (length 1), because `10` and `22` are not smaller than `9`.
*   For `33` (at index 3), it could be `[33]` (length 1), `[10, 33]` (length 2), or `[10, 22, 33]` (length 3). The longest is `[10, 22, 33]`.

**Formal/Mathematical Version:** Let $A$ be the input array of $n$ numbers. We define an array $DP$ of size $n$, where $DP[i]$ represents the length of the Longest Increasing Subsequence of $A$ that *ends* at index $i$ (i.e., $A[i]$ is the last element of the LIS).

**What could go wrong:** A common mistake is to define $DP[i]$ as the LIS *up to* index $i$, which is ambiguous and makes the recurrence relation much harder to formulate correctly. The "ending at $i$" definition is crucial.

### Step 2: Establish the Base Case

**Plain English:** The shortest possible increasing subsequence ending at any number is just that number itself. So, for every number, the LIS ending with it is at least 1.

**Concrete Example:** For `[10, 22, 9, 33]`, initially, we can say:
*   LIS ending at `10` is `[10]`, length 1.
*   LIS ending at `22` is `[22]`, length 1.
*   LIS ending at `9` is `[9]`, length 1.
*   LIS ending at `33` is `[33]`, length 1.

**Formal/Mathematical Version:** For all $0 \le i < n$, $DP[i] = 1$. This initializes our $DP$ array, reflecting that every element can form an LIS of length at least 1 (itself).

**What could go wrong:** Forgetting to initialize, or initializing with 0, which would lead to incorrect calculations.

### Step 3: Find the Recurrence Relation

**Plain English:** To find the longest increasing subsequence ending at the current number $A[i]$, we look at all the numbers $A[j]$ that came *before* $A[i]$ (i.e., $j < i$). If $A[j]$ is smaller than $A[i]$, it means we can potentially extend an LIS ending at $A[j]$ by adding $A[i]$ to it. We want to pick the $A[j]$ that results in the longest such extension.

**Concrete Example:** Let's calculate $DP[3]$ for $A[3]=33$ in `[10, 22, 9, 33]`.
We look at previous elements:
*   $A[0]=10$: $10 < 33$. We can extend LIS ending at $10$. Length would be $DP[0] + 1 = 1 + 1 = 2$. (Sequence: `[10, 33]`)
*   $A[1]=22$: $22 < 33$. We can extend LIS ending at $22$. Length would be $DP[1] + 1 = 2 + 1 = 3$. (Sequence: `[10, 22, 33]`)
*   $A[2]=9$: $9 < 33$. We can extend LIS ending at $9$. Length would be $DP[2] + 1 = 1 + 1 = 2$. (Sequence: `[9, 33]`)
The maximum length we found is 3. So, $DP[3]$ will be 3.

**Formal/Mathematical Version:** For each $i$ from $1$ to $n-1$:
$$ DP[i] = 1 + \max(\{DP[j] \mid 0 \le j < i \text{ and } A[j] < A[i]\}) $$
If there are no such $j$ (i.e., all previous elements $A[j]$ are greater than or equal to $A[i]$), then $DP[i]$ remains $1$.

**What could go wrong:** Forgetting the condition $A[j] < A[i]$, which would allow non-increasing subsequences. Also, incorrectly handling the case where no $A[j] < A[i]$ exists (it should default to 1).

### Step 4: Compute in Order (Tabulation)

**Plain English:** Since $DP[i]$ depends on $DP[j]$ where $j < i$, we can calculate the $DP$ array values in increasing order of $i$, from left to right. This ensures that when we calculate $DP[i]$, all the necessary $DP[j]$ values are already computed.

**Concrete Example:** For `[10, 22, 9, 33, 21, 50, 41, 60]`
1.  `DP` array initialized to `[1, 1, 1, 1, 1, 1, 1, 1]`
2.  `i = 0` (`A[0]=10`): $DP[0]=1$. (No previous elements)
3.  `i = 1` (`A[1]=22`):
    *   $j=0$: $A[0]=10 < A[1]=22$. Possible LIS length: $DP[0]+1 = 1+1=2$.
    *   $DP[1]$ becomes $2$.
4.  `i = 2` (`A[2]=9`):
    *   $j=0$: $A[0]=10 \not< A[2]=9$.
    *   $j=1$: $A[1]=22 \not< A[2]=9$.
    *   No previous $A[j]$ is smaller. $DP[2]$ remains $1$.
5.  `i = 3` (`A[3]=33`):
    *   $j=0$: $A[0]=10 < A[3]=33$. Length $DP[0]+1 = 2$.
    *   $j=1$: $A[1]=22 < A[3]=33$. Length $DP[1]+1 = 3$.
    *   $j=2$: $A[2]=9 < A[3]=33$. Length $DP[2]+1 = 2$.
    *   Max is $3$. $DP[3]$ becomes $3$.
... and so on.

**Formal/Mathematical Version:**
Initialize $DP[i] = 1$ for all $i = 0, \dots, n-1$.
For $i$ from $1$ to $n-1$:
  For $j$ from $0$ to $i-1$:
    If $A[j] < A[i]$:
      $DP[i] = \max(DP[i], 1 + DP[j])$

**What could go wrong:** Incorrect loop bounds (e.g., $j$ going up to $i$ instead of $i-1$), or not correctly updating $DP[i]$ with the maximum found.

### Step 5: Extract the Final Answer

**Plain English:** After filling the entire $DP$ array, each $DP[i]$ holds the length of the longest increasing subsequence *ending at* $A[i]$. The overall longest increasing subsequence for the *entire* array is simply the maximum value found anywhere in the $DP$ array.

**Concrete Example:** If our final $DP$ array is `[1, 2, 1, 3, 2, 4, 3, 5]` for `[10, 22, 9, 33, 21, 50, 41, 60]`, the maximum value is `5`. So, the LIS length is 5.

**Formal/Mathematical Version:**
The length of the Longest Increasing Subsequence is $\max(\{DP[i] \mid 0 \le i < n\})$.

**What could go wrong:** Forgetting this final step and assuming $DP[n-1]$ is the answer. $DP[n-1]$ is only the LIS ending at the *last* element, not necessarily the overall LIS.

### The O(n log n) Dynamic Programming Approach

This approach is more subtle and relies on a different DP state and binary search. It's often called the "Patience Sorting" algorithm for LIS.

### Step 6: A New DP State: The "Tails" Array

**Plain English:** Instead of storing the length of the LIS ending at each specific number, we'll maintain a sorted list (let's call it `tails`). `tails[k]` will store the *smallest ending element* among all increasing subsequences of length `k+1` we have found so far.

**Concrete Example:**
*   Input: `[0, 8, 4, 12, 2]`
*   Start with `tails = []`
*   Process `0`: We want an IS of length 1 ending with the smallest possible value. `tails = [0]`
*   Process `8`: Can extend `[0]` to `[0, 8]`. `tails = [0, 8]` (Smallest ending for length 1 is 0, for length 2 is 8)
*   Process `4`: Can extend `[0]` to `[0, 4]`. This is an IS of length 2 ending with 4. Since 4 is smaller than 8, it's a "better" ending for an IS of length 2. We update `tails = [0, 4]`.
*   Process `12`: Can extend `[0, 4]` to `[0, 4, 12]`. `tails = [0, 4, 12]`
*   Process `2`: Can extend `[0]` to `[0, 2]`. This is an IS of length 2 ending with 2. Since 2 is smaller than 4, it's a "better" ending for an IS of length 2. We update `tails = [0, 2, 12]`.

**Formal/Mathematical Version:** Let $T$ be an array where $T[k]$ stores the smallest tail (last element) of all increasing subsequences of length $k+1$ found so far. The array $T$ will always be sorted in strictly increasing order.

**What could go wrong:** Misunderstanding what `tails[k]` represents. It's *not* the LIS itself, nor is it the LIS length. It's the smallest ending element for a subsequence of a particular length. Also, `tails` is not necessarily the LIS itself.

### Step 7: Processing Elements and Using Binary Search

**Plain English:** When we look at a new number `x` from our input list:
1.  If `x` is larger than *all* numbers currently in `tails`, it means we can extend the longest increasing subsequence we've found so far by one. So, we add `x` to the end of `tails`.
2.  If `x` is not larger than all numbers in `tails`, it means `x` can potentially replace one of the numbers in `tails` to form a "better" (i.e., ending with a smaller number) increasing subsequence of a certain length. We find the *first* number in `tails` that is greater than or equal to `x`. We replace that number with `x`. This is because if we can form an increasing subsequence of length `k+1` ending with `x`, and `x` is smaller than the current `tails[k]`, then `x` is a better candidate for `tails[k]`.

**Concrete Example:** Input `[0, 8, 4, 12, 2]`
*   `tails = []`
*   `x = 0`: `tails` is empty. Add `0`. `tails = [0]`
*   `x = 8`: `8 > tails[0] (0)`. Add `8`. `tails = [0, 8]`
*   `x = 4`: `4` is not greater than `tails[1] (8)`. Find first element `>= 4`. It's `8` (at index 1). Replace `8` with `4`. `tails = [0, 4]`
*   `x = 12`: `12 > tails[1] (4)`. Add `12`. `tails = [0, 4, 12]`
*   `x = 2`: `2` is not greater than `tails[2] (12)`. Find first element `>= 2`. It's `4` (at index 1). Replace `4` with `2`. `tails = [0, 2, 12]`

**Formal/Mathematical Version:**
Initialize $T = []$.
For each element $A[i]$ in the input array:
  If $T$ is empty or $A[i] > T[\text{last element}]$:
    Append $A[i]$ to $T$.
  Else (if $A[i]$ is not greater than the last element of $T$):
    Find the smallest index $k$ such that $T[k] \ge A[i]$ using binary search (specifically, `lower_bound`).
    Replace $T[k]$ with $A[i]$.

**What could go wrong:** Incorrectly using binary search (e.g., searching for exact match instead of `lower_bound`), or misinterpreting the result of binary search. The `tails` array must remain sorted.

### Step 8: Final Answer (O(n log n))

**Plain English:** The length of the `tails` array at the end of the process is the length of the Longest Increasing Subsequence. This is because each time we extend the `tails` array, we are effectively finding an LIS of a greater length. When we replace an element, the length of the `tails` array doesn't change, but we're making it "easier" for future numbers to extend the sequences.

**Concrete Example:** From the previous example, `tails = [0, 2, 12]`. Its length is 3. So, the LIS length is 3.

**Formal/Mathematical Version:**
The length of the Longest Increasing Subsequence is $|T|$ (the size of the array $T$).

**What could go wrong:** Trying to reconstruct the actual LIS from the `tails` array. The `tails` array does *not* directly store the LIS itself, only the smallest ending elements for LISs of various lengths. Reconstructing the LIS requires additional bookkeeping (e.g., storing predecessors).

## 5. Worked examples — multiple, with every step shown

### Example 1: Easy (O(n²) approach)

**Problem:** Find the length of the Longest Increasing Subsequence of the array `A = [3, 10, 2, 11]`.

**Given:** Input array $A = [3, 10, 2, 11]$.
**Want:** Length of LIS.

**Solution (O(n²)):**

1.  **Initialize DP array:** Create a $DP$ array of the same size as $A$, and initialize all its elements to 1.
    $DP = [1, 1, 1, 1]$
    *Explanation: Each element can form an LIS of length 1 (itself) initially.*

2.  **Iterate through the array $A$ to fill $DP$:**
    *   **For $i = 0$ ($A[0] = 3$):**
        *   No previous elements to compare with.
        *   $DP[0]$ remains $1$.
        *   Current $DP$: $[1, 1, 1, 1]$
        *Explanation: The LIS ending at 3 is just [3].*

    *   **For $i = 1$ ($A[1] = 10$):**
        *   Compare $A[1]$ with $A[0]$:
            *   $A[0] = 3 < A[1] = 10$. Yes, $3$ is smaller than $10$.
            *   Potential LIS length: $1 + DP[0] = 1 + 1 = 2$.
            *   Update $DP[1] = \max(DP[1], 2) = \max(1, 2) = 2$.
        *   Current $DP$: $[1, 2, 1, 1]$
        *Explanation: The LIS ending at 10 can be [10] (length 1) or [3, 10] (length 2). We take the max.*

    *   **For $i = 2$ ($A[2] = 2$):**
        *   Compare $A[2]$ with $A[0]$:
            *   $A[0] = 3 \not< A[2] = 2$. No, $3$ is not smaller than $2$.
        *   Compare $A[2]$ with $A[1]$:
            *   $A[1] = 10 \not< A[2] = 2$. No, $10$ is not smaller than $2$.
        *   No previous elements are smaller than $2$.
        *   $DP[2]$ remains $1$.
        *   Current $DP$: $[1, 2, 1, 1]$
        *Explanation: The LIS ending at 2 can only be [2] because no previous element is smaller than 2.*

    *   **For $i = 3$ ($A[3] = 11$):**
        *   Compare $A[3]$ with $A[0]$:
            *   $A[0] = 3 < A[3] = 11$. Yes.
            *   Potential LIS length: $1 + DP[0] = 1 + 1 = 2$.
            *   $DP[3] = \max(DP[3], 2) = \max(1, 2) = 2$.
        *   Compare $A[3]$ with $A[1]$:
            *   $A[1] = 10 < A[3] = 11$. Yes.
            *   Potential LIS length: $1 + DP[1] = 1 + 2 = 3$.
            *   $DP[3] = \max(DP[3], 3) = \max(2, 3) = 3$.
        *   Compare $A[3]$ with $A[2]$:
            *   $A[2] = 2 < A[3] = 11$. Yes.
            *   Potential LIS length: $1 + DP[2] = 1 + 1 = 2$.
            *   $DP[3] = \max(DP[3], 2) = \max(3, 2) = 3$.
        *   Current $DP$: $[1, 2, 1, 3]$
        *Explanation: The LIS ending at 11 could be [3, 11] (length 2), [10, 11] (length 2), or [3, 10, 11] (length 3). We take the max.*

3.  **Find the maximum value in $DP$ array:**
    $DP = [1, 2, 1, 3]$
    $\max(1, 2, 1, 3) = 3$.

**Final Answer:** The length of the Longest Increasing Subsequence is $\boxed{3}$.

*Reflection:* This example was straightforward. The O(n²) approach clearly shows how the DP state `DP[i]` builds upon previously computed states. The key is correctly identifying valid predecessors ($A[j] < A[i]$) and taking the maximum.

### Example 2: Medium (O(n²) and O(n log n) approaches)

**Problem:** Find the length of the Longest Increasing Subsequence of the array `A = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]`.

**Given:** Input array $A = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]$.
**Want:** Length of LIS.

---

**Solution (O(n²)):**

1.  **Initialize DP array:** $DP = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]$

2.  **Iterate and compute $DP[i]$:**

    *   $i=0, A[0]=0$: $DP[0]=1$.
        $DP = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]$
    *   $i=1, A[1]=8$: $A[0]=0 < 8 \Rightarrow DP[1] = \max(1, 1+DP[0]) = 2$.
        $DP = [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]$
    *   $i=2, A[2]=4$: $A[0]=0 < 4 \Rightarrow DP[2] = \max(1, 1+DP[0]) = 2$.
        $DP = [1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]$
    *   $i=3, A[3]=12$:
        *   $A[0]=0 < 12 \Rightarrow 1+DP[0]=2$.
        *   $A[1]=8 < 12 \Rightarrow 1+DP[1]=3$.
        *   $A[2]=4 < 12 \Rightarrow 1+DP[2]=3$.
        *   $DP[3] = \max(1, 2, 3, 3) = 3$.
        $DP = [1, 2, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]$
    *   $i=4, A[4]=2$: $A[0]=0 < 2 \Rightarrow 1+DP[0]=2$.
        $DP[4] = \max(1, 2) = 2$.
        $DP = [1, 2, 2, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]$
    *   $i=5, A[5]=10$:
        *   $A[0]=0 < 10 \Rightarrow 1+DP[0]=2$.
        *   $A[1]=8 < 10 \Rightarrow 1+DP[1]=3$.
        *   $A[2]=4 < 10 \Rightarrow 1+DP[2]=3$.
        *   $A[4]=2 < 10 \Rightarrow 1+DP[4]=3$.
        *   $DP[5] = \max(1, 2, 3, 3, 3) = 3$.
        $DP = [1, 2, 2, 3, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]$
    *   $i=6, A[6]=6$:
        *   $A[0]=0 < 6 \Rightarrow 1+DP[0]=2$.
        *   $A[2]=4 < 6 \Rightarrow 1+DP[2]=3$.
        *   $A[4]=2 < 6 \Rightarrow 1+DP[4]=3$.
        *   $DP[6] = \max(1, 2, 3, 3) = 3$.
        $DP = [1, 2, 2, 3, 2, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1]$
    *   $i=7, A[7]=14$:
        *   $A[0]=0 < 14 \Rightarrow 1+DP[0]=2$.
        *   $A[1]=8 < 14 \Rightarrow 1+DP[1]=3$.
        *   $A[2]=4 < 14 \Rightarrow 1+DP[2]=3$.
        *   $A[3]=12 < 14 \Rightarrow 1+DP[3]=4$.
        *   $A[4]=2 < 14 \Rightarrow 1+DP[4]=3$.
        *   $A[5]=10 < 14 \Rightarrow 1+DP[5]=4$.
        *   $A[6]=6 < 14 \Rightarrow 1+DP[6]=4$.
        *   $DP[7] = \max(1, 2, 3, 3, 4, 3, 4, 4) = 4$.
        $DP = [1, 2, 2, 3, 2, 3, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1]$
    *   $i=8, A[8]=1$: $A[0]=0 < 1 \Rightarrow 1+DP[0]=2$.
        $DP[8] = \max(1, 2) = 2$.
        $DP = [1, 2, 2, 3, 2, 3, 3, 4, 2, 1, 1, 1, 1, 1, 1, 1]$
    *   $i=9, A[9]=9$:
        *   $A[0]=0 < 9 \Rightarrow 1+DP[0]=2$.
        *   $A[2]=4 < 9 \Rightarrow 1+DP[2]=3$.
        *   $A[4]=2 < 9 \Rightarrow 1+DP[4]=3$.
        *   $A[6]=6 < 9 \Rightarrow 1+DP[6]=4$.
        *   $A[8]=1 < 9 \Rightarrow 1+DP[8]=3$.
        *   $DP[9] = \max(1, 2, 3, 3, 4, 3) = 4$.
        $DP = [1, 2, 2, 3, 2, 3, 3, 4, 2, 4, 1, 1, 1, 1, 1, 1]$
    *   $i=10, A[10]=5$:
        *   $A[0]=0 < 5 \Rightarrow 1+DP[0]=2$.
        *   $A[2]=4 < 5 \Rightarrow 1+DP[2]=3$.
        *   $A[4]=2 < 5 \Rightarrow 1+DP[4]=3$.
        *   $A[8]=1 < 5 \Rightarrow 1+DP[8]=3$.
        *   $DP[10] = \max(1, 2, 3, 3, 3) = 3$.
        $DP = [1, 2, 2, 3, 2, 3, 3, 4, 2, 4, 3, 1, 1, 1, 1, 1]$
    *   $i=11, A[11]=13$:
        *   $A[0]=0 < 13 \Rightarrow 1+DP[0]=2$.
        *   $A[1]=8 < 13 \Rightarrow 1+DP[1]=3$.
        *   $A[2]=4 < 13 \Rightarrow 1+DP[2]=3$.
        *   $A[3]=12 < 13 \Rightarrow 1+DP[3]=4$.
        *   $A[4]=2 < 13 \Rightarrow 1+DP[4]=3$.
        *   $A[5]=10 < 13 \Rightarrow 1+DP[5]=4$.
        *   $A[6]=6 < 13 \Rightarrow 1+DP[6]=4$.
        *   $A[8]=1 < 13 \Rightarrow 1+DP[8]=3$.
        *   $A[9]=9 < 13 \Rightarrow 1+DP[9]=5$.
        *   $A[10]=5 < 13 \Rightarrow 1+DP[10]=4$.
        *   $DP[11] = \max(1, 2, 3, 3, 4, 3, 4, 4, 3, 5, 4) = 5$.
        $DP = [1, 2, 2, 3, 2, 3, 3, 4, 2, 4, 3, 5, 1, 1, 1, 1]$
    *   $i=12, A[12]=3$:
        *   $A[0]=0 < 3 \Rightarrow 1+DP[0]=2$.
        *   $A[8]=1 < 3 \Rightarrow 1+DP[8]=3$.
        *   $DP[12] = \max(1, 2, 3) = 3$.
        $DP = [1, 2, 2, 3, 2, 3, 3, 4, 2, 4, 3, 5, 3, 1, 1, 1]$
    *   $i=13, A[13]=11$:
        *   $A[0]=0 < 11 \Rightarrow 1+DP[0]=2$.
        *   $A[2]=4 < 11 \Rightarrow 1+DP[2]=3$.
        *   $A[4]=2 < 11 \Rightarrow 1+DP[4]=3$.
        *   $A[5]=10 < 11 \Rightarrow 1+DP[5]=4$.
        *   $A[6]=6 < 11 \Rightarrow 1+DP[6]=4$.
        *   $A[8]=1 < 11 \Rightarrow 1+DP[8]=3$.
        *   $A[9]=9 < 11 \Rightarrow 1+DP[9]=5$.
        *   $A[10]=5 < 11 \Rightarrow 1+DP[10]=4$.
        *   $A[12]=3 < 11 \Rightarrow 1+DP[12]=4$.
        *   $DP[13] = \max(1, 2, 3, 3, 4, 4, 3, 5, 4, 4) = 5$.
        $DP = [1, 2, 2, 3, 2, 3, 3, 4, 2, 4, 3, 5, 3, 5, 1, 1]$
    *   $i=14, A[14]=7$:
        *   $A[0]=0 < 7 \Rightarrow 1+DP[0]=2$.
        *   $A[2]=4 < 7 \Rightarrow 1+DP[2]=3$.
        *   $A[4]=2 < 7 \Rightarrow 1+DP[4]=3$.
        *   $A[6]=6 < 7 \Rightarrow 1+DP[6]=4$.
        *   $A[8]=1 < 7 \Rightarrow 1+DP[8]=3$.
        *   $A[10]=5 < 7 \Rightarrow 1+DP[10]=4$.
        *   $A[12]=3 < 7 \Rightarrow 1+DP[12]=4$.
        *   $DP[14] = \max(1, 2, 3, 3, 4, 3, 4, 4) = 4$.
        $DP = [1, 2, 2, 3, 2, 3, 3, 4, 2, 4, 3, 5, 3, 5, 4, 1]$
    *   $i=15, A[15]=15$:
        *   $A[0]=0 < 15 \Rightarrow 1+DP[0]=2$.
        *   $A[1]=8 < 15 \Rightarrow 1+DP[1]=3$.
        *   $A[2]=4 < 15 \Rightarrow 1+DP[2]=3$.
        *   $A[3]=12 < 15 \Rightarrow 1+DP[3]=4$.
        *   $A[4]=2 < 15 \Rightarrow 1+DP[4]=3$.
        *   $A[5]=10 < 15 \Rightarrow 1+DP[5]=4$.
        *   $A[6]=6 < 15 \Rightarrow 1+DP[6]=4$.
        *   $A[7]=14 < 15 \Rightarrow 1+DP[7]=5$.
        *   $A[8]=1 < 15 \Rightarrow 1+DP[8]=3$.
        *   $A[9]=9 < 15 \Rightarrow 1+DP[9]=5$.
        *   $A[10]=5 < 15 \Rightarrow 1+DP[10]=4$.
        *   $A[11]=13 < 15 \Rightarrow 1+DP[11]=6$.
        *   $A[12]=3 < 15 \Rightarrow 1+DP[12]=4$.
        *   $A[13]=11 < 15 \Rightarrow 1+DP[13]=6$.
        *   $A[14]=7 < 15 \Rightarrow 1+DP[14]=5$.
        *   $DP[15] = \max(1, 2, 3, 3, 4, 3, 4, 4, 5, 3, 5, 4, 6, 4, 6, 5) = 6$.
        $DP = [1, 2, 2, 3, 2, 3, 3, 4, 2, 4, 3, 5, 3, 5, 4, 6]$

3.  **Find maximum value in $DP$:** $\max(DP) = 6$.

---

**Solution (O(n log n)):**

1.  **Initialize `tails` array:** `tails = []`

2.  **Iterate through $A$ and update `tails`:**

    *   **$A[0] = 0$:** `tails` is empty. Append `0`.
        `tails = [0]`
        *Explanation: Smallest ending element for LIS of length 1 is 0.*
    *   **$A[1] = 8$:** `8 > tails.back() (0)`. Append `8`.
        `tails = [0, 8]`
        *Explanation: We can form LIS of length 2 ending with 8 ([0, 8]).*
    *   **$A[2] = 4$:** `4` is not greater than `tails.back() (8)`.
        Find `lower_bound` for `4` in `tails`: it's `8` (at index 1).
        Replace `tails[1]` with `4`.
        `tails = [0, 4]`
        *Explanation: We found a way to make an LIS of length 2 ([0, 4]) that ends with a smaller value (4 instead of 8). This is better for future extensions.*
    *   **$A[3] = 12$:** `12 > tails.back() (4)`. Append `12`.
        `tails = [0, 4, 12]`
        *Explanation: We can form LIS of length 3 ending with 12 ([0, 4, 12]).*
    *   **$A[4] = 2$:** `2` is not greater than `tails.back() (12)`.
        Find `lower_bound` for `2` in `tails`: it's `4` (at index 1).
        Replace `tails[1]` with `2`.
        `tails = [0, 2, 12]`
        *Explanation: LIS of length 2 can now end with 2 ([0, 2]), which is smaller than 4.*
    *   **$A[5] = 10$:** `10` is not greater than `tails.back() (12)`.
        Find `lower_bound` for `10` in `tails`: it's `12` (at index 2).
        Replace `tails[2]` with `10`.
        `tails = [0, 2, 10]`
        *Explanation: LIS of length 3 can now end with 10 ([0, 2, 10]), which is smaller than 12.*
    *   **$A[6] = 6$:** `6` is not greater than `tails.back() (10)`.
        Find `lower_bound` for `6` in `tails`: it's `10` (at index 2).
        Replace `tails[2]` with `6`.
        `tails = [0, 2, 6]`
        *Explanation: LIS of length 3 can now end with 6 ([0, 2, 6]), which is smaller than 10.*
    *   **$A[7] = 14$:** `14 > tails.back() (6)`. Append `14`.
        `tails = [0, 2, 6, 14]`
        *Explanation: We can form LIS of length 4 ending with 14 ([0, 2, 6, 14]).*
    *   **$A[8] = 1$:** `1` is not greater than `tails.back() (14)`.
        Find `lower_bound` for `1` in `tails`: it's `2` (at index 1).
        Replace `tails[1]` with `1`.
        `tails = [0, 1, 6, 14]`
        *Explanation: LIS of length 2 can now end with 1 ([0, 1]), which is smaller than 2.*
    *   **$A[9] = 9$:** `9` is not greater than `tails.back() (14)`.
        Find `lower_bound` for `9` in `tails`: it's `14` (at index 3).
        Replace `tails[3]` with `9`.
        `tails = [0, 1, 6, 9]`
        *Explanation: LIS of length 4 can now end with 9 ([0, 1, 6, 9]), which is smaller than 14.*
    *   **$A[10] = 5$:** `5` is not greater than `tails.back() (9)`.
        Find `lower_bound` for `5` in `tails`: it's `6` (at index 2).
        Replace `tails[2]` with `5`.
        `tails = [0, 1, 5, 9]`
        *Explanation: LIS of length 3 can now end with 5 ([0, 1, 5]), which is smaller than 6.*
    *   **$A[11] = 13$:** `13 > tails.back() (9)`. Append `13`.
        `tails = [0, 1, 5, 9, 13]`
        *Explanation: We can form LIS of length 5 ending with 13 ([0, 1, 5, 9, 13]).*
    *   **$A[12] = 3$:** `3` is not greater than `tails.back() (13)`.
        Find `lower_bound` for `3` in `tails`: it's `5` (at index 2).
        Replace `tails[2]` with `3`.
        `tails = [0, 1, 3, 9, 13]`
        *Explanation: LIS of length 3 can now end with 3 ([0, 1, 3]), which is smaller than 5.*
    *   **$A[13] = 11$:** `11` is not greater than `tails.back() (13)`.
        Find `lower_bound` for `11` in `tails`: it's `13` (at index 4).
        Replace `tails[4]` with `11`.
        `tails = [0, 1, 3, 9, 11]`
        *Explanation: LIS of length 5 can now end with 11 ([0, 1, 3, 9, 11]), which is smaller than 13.*
    *   **$A[14] = 7$:** `7` is not greater than `tails.back() (11)`.
        Find `lower_bound` for `7` in `tails`: it's `9` (at index 3).
        Replace `tails[3]` with `7`.
        `tails = [0, 1, 3, 7, 11]`
        *Explanation: LIS of length 4 can now end with 7 ([0, 1, 3, 7]), which is smaller than 9.*
    *   **$A[15] = 15$:** `15 > tails.back() (11)`. Append `15`.
        `tails = [0, 1, 3, 7, 11, 15]`
        *Explanation: We can form LIS of length 6 ending with 15 ([0, 1, 3, 7, 11, 15]).*

3.  **Final Answer:** The length of `tails` is 6.

**Final Answer:** The length of the Longest Increasing Subsequence is $\boxed{6}$.

*Reflection:* This example highlights the power of the O(n log n) approach. While the O(n²) method involves many comparisons and updates, the `tails` array with binary search efficiently prunes possibilities. The `tails` array does *not* necessarily contain the actual LIS, but its length correctly indicates the LIS length. For instance, `[0, 1, 3, 7, 11, 15]` is *an* LIS, but `[0, 2, 6, 9, 11, 15]` is another valid LIS from the original sequence.

### Example 3: Harder (Decreasing sequence)

**Problem:** Find the length of the Longest Increasing Subsequence of the array `A = [5, 4, 3, 2, 1]`.

**Given:** Input array $A = [5, 4, 3, 2, 1]$.
**Want:** Length of LIS.

---

**Solution (O(n²)):**

1.  **Initialize DP array:** $DP = [1, 1, 1, 1, 1]$

2.  **Iterate and compute $DP[i]$:**

    *   $i=0, A[0]=5$: $DP[0]=1$.
        $DP = [1, 1, 1, 1, 1]$
    *   $i=1, A[1]=4$: $A[0]=5 \not< 4$. No previous elements are smaller. $DP[1]=1$.
        $DP = [1, 1, 1, 1, 1]$
    *   $i=2, A[2]=3$: $A[0]=5 \not< 3$, $A[1]=4 \not< 3$. No previous elements are smaller. $DP[2]=1$.
        $DP = [1, 1, 1, 1, 1]$
    *   $i=3, A[3]=2$: $A[0]=5 \not< 2$, $A[1]=4 \not< 2$, $A[2]=3 \not< 2$. No previous elements are smaller. $DP[3]=1$.
        $DP = [1, 1, 1, 1, 1]$
    *   $i=4, A[4]=1$: $A[0]=5 \not< 1$, $A[1]=4 \not< 1$, $A[2]=3 \not< 1$, $A[3]=2 \not< 1$. No previous elements are smaller. $DP[4]=1$.
        $DP = [1, 1, 1, 1, 1]$

3.  **Find maximum value in $DP$:** $\max(DP) = 1$.

---

**Solution (O(n log n)):**

1.  **Initialize `tails` array:** `tails = []`

2.  **Iterate through $A$ and update `tails`:**

    *   **$A[0] = 5$:** `tails` is empty. Append `5`.
        `tails = [5]`
    *   **$A[1] = 4$:** `4` is not greater than `tails.back() (5)`.
        Find `lower_bound` for `4` in `tails`: it's `5` (at index 0).
        Replace `tails[0]` with `4`.
        `tails = [4]`
    *   **$A[2] = 3$:** `3` is not greater than `tails.back() (4)`.
        Find `lower_bound` for `3` in `tails`: it's `4` (at index 0).
        Replace `tails[0]` with `3`.
        `tails = [3]`
    *   **$A[3] = 2$:** `2` is not greater than `tails.back() (3)`.
        Find `lower_bound` for `2` in `tails`: it's `3` (at index 0).
        Replace `tails[0]` with `2`.
        `tails = [2]`
    *   **$A[4] = 1$:** `1` is not greater than `tails.back() (2)`.
        Find `lower_bound` for `1` in `tails`: it's `2` (at index 0).
        Replace `tails[0]` with `1`.
        `tails = [1]`

3.  **Final Answer:** The length of `tails` is 1.

**Final Answer:** The length of the Longest Increasing Subsequence is $\boxed{1}$.

*Reflection:* This example shows that if the sequence is strictly decreasing, the LIS length is always 1 (each element forms an LIS of itself). Both algorithms correctly identify this. The O(n log n) approach effectively keeps replacing the single element in `tails` with smaller values, never increasing its length.

### Example 4: Tricky (Multiple LIS paths, large numbers)

**Problem:** Find the length of the Longest Increasing Subsequence of the array `A = [100, 4, 200, 5, 300, 6, 400, 7, 500, 8]`.

**Given:** Input array $A = [100, 4, 200, 5, 300, 6, 400, 7, 500, 8]$.
**Want:** Length of LIS.

---

**Solution (O(n²)):**

1.  **Initialize DP array:** $DP = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]$

2.  **Iterate and compute $DP[i]$:**

    *   $i=0, A[0]=100$: $DP[0]=1$.
        $DP = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]$
    *   $i=1, A[1]=4$: $A[0]=100 \not< 4$. $DP[1]=1$.
        $DP = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]$
    *   $i=2, A[2]=200$:
        *   $A[0]=100 < 200 \Rightarrow 1+DP[0]=2$.
        *   $A[1]=4 < 200 \Rightarrow 1+DP[1]=2$.
        *   $DP[2]=\max(1, 2, 2)=2$.
        $DP = [1, 1, 2, 1, 1, 1, 1, 1, 1, 1]$
    *   $i=3, A[3]=5$:
        *   $A[0]=100 \not< 5$.
        *   $A[1]=4 < 5 \Rightarrow 1+DP[1]=2$.
        *   $A[2]=200 \not< 5$.
        *   $DP[3]=\max(1, 2)=2$.
        $DP = [1, 1, 2, 2, 1, 1, 1, 1, 1, 1]$
    *   $i=4, A[4]=300$:
        *   $A[0]=100 < 300 \Rightarrow 1+DP[0]=2$.
        *   $A[1]=4 < 300 \Rightarrow 1+DP[1]=2$.
        *   $A[2]=200 < 300 \Rightarrow 1+DP[2]=3$.
        *   $A[3]=5 < 300 \Rightarrow 1+DP[3]=3$.
        *   $DP[4]=\max(1, 2, 2, 3, 3)=3$.
        $DP = [1, 1, 2, 2, 3, 1, 1, 1, 1, 1]$
    *   $i=5, A[5]=6$:
        *   $A[1]=4 < 6 \Rightarrow 1+DP[1]=2$.
        *   $A[3]=5 < 6 \Rightarrow 1+DP[3]=3$.
        *   $DP[5]=\max(1, 2, 3)=3$.
        $DP = [1, 1, 2, 2, 3, 3, 1, 1, 1, 1]$
    *   $i=6, A[6]=400$:
        *   $A[0]=100 < 400 \Rightarrow 1+DP[0]=2$.
        *   $A[1]=4 < 400 \Rightarrow 1+DP[1]=2$.
        *   $A[2]=200 < 400 \Rightarrow 1+DP[2]=3$.
        *   $A[3]=5 < 400 \Rightarrow 1+DP[3]=3$.
        *   $A[4]=300 < 400 \Rightarrow 1+DP[4]=4$.
        *   $A[5]=6 < 400 \Rightarrow 1+DP[5]=4$.
        *   $DP[6]=\max(1, 2, 2, 3, 3, 4, 4)=4$.
        $DP = [1, 1, 2, 2, 3, 3, 4, 1, 1, 1]$
    *   $i=7, A[7]=7$:
        *   $A[1]=4 < 7 \Rightarrow 1+DP[1]=2$.
        *   $A[3]=5 < 7 \Rightarrow 1+DP[3]=3$.
        *   $A[5]=6 < 7 \Rightarrow 1+DP[5]=4$.
        *   $DP[7]=\max(1, 2, 3, 4)=4$.
        $DP = [1, 1, 2, 2, 3, 3, 4, 4, 1, 1]$
    *   $i=8, A[8]=500$:
        *   $A[0]=100 < 500 \Rightarrow 1+DP[0]=2$.
        *   $A[1]=4 < 500 \Rightarrow 1+DP[1]=2$.
        *   $A[2]=200 < 500 \Rightarrow 1+DP[2]=3$.
        *   $A[3]=5 < 500 \Rightarrow 1+DP[3]=3$.
        *   $A[4]=300 < 500 \Rightarrow 1+DP[4]=4$.
        *   $A[5]=6 < 500 \Rightarrow 1+DP[5]=4$.
        *   $A[6]=400 < 500 \Rightarrow 1+DP[6]=5$.
        *   $A[7]=7 < 500 \Rightarrow 1+DP[7]=5$.
        *   $DP[8]=\max(1, 2, 2, 3, 3, 4, 4, 5, 5)=5$.
        $DP = [1, 1, 2, 2, 3, 3, 4, 4, 5, 1]$
    *   $i=9, A[9]=8$:
        *   $A[1]=4 < 8 \Rightarrow 1+DP[1]=2$.
        *   $A[3]=5 < 8 \Rightarrow 1+DP[3]=3$.
        *   $A[5]=6 < 8 \Rightarrow 1+DP[5]=4$.
        *   $A[7]=7 < 8 \Rightarrow 1+DP[7]=5$.
        *   $DP[9]=\max(1, 2, 3, 4, 5)=5$.
        $DP = [1, 1, 2, 2, 3, 3, 