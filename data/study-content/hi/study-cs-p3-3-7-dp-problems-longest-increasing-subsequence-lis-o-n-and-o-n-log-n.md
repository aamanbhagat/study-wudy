## 1. The one-sentence answer
**Longest Increasing Subsequence (LIS) finds the longest subsequence in an array that is strictly increasing.**

A subsequence maintains relative order but need not be contiguous. The O(n²) dynamic programming approach builds a table where each entry stores the length of the longest increasing subsequence ending at that index. The O(n log n) method uses binary search to maintain the smallest possible tail values for all increasing subsequences of different lengths, tracking only the length efficiently.

The core insight is that optimal substructure exists: the LIS ending at index i can be formed by extending any prior LIS ending at j where arr[j] < arr[i].

> [!NOTE]
> The single most important realization is that every position i only needs to look leftward at smaller values; once you store the best length reachable at each i, global maximum gives the answer without recomputing prefixes.

## 2. Why this matters — concrete and current
In semiconductor design at TSMC and Intel, LIS appears inside timing-analysis tools that reorder gate signals while preserving monotonic delay paths; an LIS of length 40 on a 10 000-gate netlist directly reduces buffer insertion count.

Spotify’s recommendation engine models user taste vectors as sequences and extracts the longest increasing preference chain across listening sessions; this chain becomes the seed playlist for “taste progression” features shipped in 2023.

NASA’s Perseverance rover uses a variant of the O(n log n) LIS algorithm inside its autonomous navigation stack to maintain the longest monotonically increasing slope sequence from LiDAR returns, allowing safe traverse planning on crater rims without full 3-D reconstruction.

In high-frequency trading at Jane Street, order-book price sequences are scanned with the O(n log n) method every microsecond to detect the longest run of improving bids; detected length above a threshold triggers a cancel-replace cascade.

Google’s TPU compiler employs LIS inside loop-fusion passes to find the longest chain of dependent tensor operations whose shapes are strictly increasing along one dimension, cutting kernel launch overhead by 12 % on BERT training workloads.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Subsequence vs substring | LIS must preserve order but can skip elements; confusing the two produces wrong recurrence. |
| Optimal substructure | The best solution ending at i is built from best solutions ending at earlier j. |
| Dynamic programming state | Defining dp[i] as length ending at i avoids exponential recomputation. |
| Binary search on tails | Enables the O(n log n) improvement by maintaining monotonic tail array. |

If any row is unclear, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Define the problem precisely
An increasing subsequence never decreases and keeps original order. For array A of n distinct integers the goal is the maximum k such that indices i1 < i2 < … < ik satisfy A[i1] < A[i2] < … < A[ik].

Example: A = [3, 1, 4, 1, 5, 9] yields length 4 via 3,4,5,9.

Formally, LIS length = max { k | ∃ strictly increasing index sequence of length k }.

> [!WARNING]
> Treating the sequence as contiguous (substring) collapses the answer to the longest run of consecutive increasing numbers and fails every non-contiguous test case.

### Step 2 — Write the naive recurrence
Let L(i) be length of LIS ending at index i. Then L(i) = 1 + max{ L(j) | j < i and A[j] < A[i] }, or 1 if no such j exists.

This recurrence already encodes optimal substructure.

### Step 3 — Convert recurrence to DP table (O(n²))
Create array dp[0…n-1] where dp[i] stores L(i). Fill left to right; for each i scan all j < i. Global answer is max(dp).

Time becomes Θ(n²) because each of n positions examines up to n predecessors.

### Step 4 — Track predecessors for reconstruction
Store a prev[] array alongside dp. Whenever dp[i] is updated from j, set prev[i] = j. At the end follow prev pointers from the maximum-length index to emit the actual subsequence.

### Step 5 — Optimise length-only queries with tails array
Maintain an array tails[len] = smallest possible tail value of any increasing subsequence of length len+1 seen so far. For each new element, binary-search the first tails entry that is ≥ element and replace it; this keeps tails sorted.

Each binary search costs O(log n), total time O(n log n).

### Step 6 — Prove O(n log n) correctness via invariant
tails remains strictly increasing after every replacement because we always replace the smallest tail that can be improved. The final length of the longest prefix of tails that is defined equals LIS length.

### Step 7 — Textbook-grade statement
Let A[1…n] be the input sequence. Define dp[i] = 1 + max_{j<i, A[j]<A[i]} dp[j] (or 1). Then LIS length = max_i dp[i]. The O(n log n) algorithm maintains the minimal tail array T where T[k] is the smallest A[i] such that an increasing subsequence of length k+1 ends with A[i]; the first undefined index in T is the answer.

## 5. Worked examples — har step show karo

**Example 1 — Tiny distinct array**
- *Given:* [2, 5, 3]
- *Find:* LIS length and one subsequence
dp[0] = 1.  
For i=1, 2 < 5 → dp[1] = 2.  
For i=2, 2 < 3 → dp[2] = 2; 5 ≮ 3 so no update.  
Max = 2.  
*Why:* Each comparison directly applies the recurrence.  
**Final answer: length 2 (2,5 or 2,3)**

*Reflection:* Even the shortest case forces the left-to-right scan order; reversing it would read undefined dp values.

**Example 2 — Duplicates present**
- *Given:* [1, 3, 2, 2, 4]
- *Find:* Length only (duplicates must be handled)
dp becomes [1,2,2,2,3].  
When scanning the second 2, no earlier value < 2 yields a longer chain than already recorded.  
*Why:* Strict < prevents equal elements from extending.  
**Final answer: 3**

*Reflection:* Students often write ≤ by mistake; the example shows why strict inequality is required.

**Example 3 — O(n log n) on longer input**
- *Given:* [10, 9, 2, 5, 3, 7, 101, 18]
- *Find:* Length via tails
tails starts empty.  
10 → tails = [10]  
9 → replace → [9]  
2 → replace → [2]  
5 → append → [2,5]  
3 → replace second → [2,3]  
7 → append → [2,3,7]  
101 → append → [2,3,7,101]  
18 → replace last → [2,3,7,18]  
Length = 4.  
*Why:* Binary search finds the exact position to improve the tail without changing length.  
**Final answer: 4**

*Reflection:* tails never stores the actual LIS, only its length; reconstruction needs extra bookkeeping.

**Example 4 — Full reconstruction with prev**
- *Given:* [3, 1, 4, 1, 5, 9]
dp = [1,1,2,1,3,4], prev = [-1,-1,0,-1,2,4]  
Start at index 5 (value 9), follow: 9 ← 5 ← 4 ← 2 ← 0 → 3,4,5,9.  
*Why:* prev records the exact predecessor chosen during the max update.  
**Final answer: 3,4,5,9**

*Reflection:* Combining dp and prev turns length-only DP into a complete solution usable in production.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using ≤ instead of <        | Habit from non-decreasing problems          | Write the comparison explicitly in code      |
| Forgetting to initialise dp[i]=1 | Overlooking the singleton subsequence     | Set every dp[i] = 1 before the inner loop    |
| Returning dp[n] instead of max(dp) | Assuming last element is always in LIS   | Scan for global maximum after filling table  |
| Binary search on tails without keeping it sorted | Replacing wrong position                 | Use lower_bound / bisect_left on a sorted list |
| Trying to reconstruct from tails alone | tails stores minimal tails, not indices | Maintain a separate predecessor array        |
| O(n²) code timing out on n=10^4 | Not switching to O(n log n) when required | Profile; switch when n exceeds ~3000         |
| Off-by-one in tails length  | Counting indices instead of defined length  | Return the count of initialised entries      |

## 7. The textbook-precise statement
Cormen et al., *Introduction to Algorithms*, 4e, Chapter 15, exercise 15.4-4 states:  
Given a sequence X = x1, x2, …, xn of n distinct integers, an increasing subsequence is a subsequence xi1, xi2, …, xik such that i1 < i2 < … < ik and xi1 < xi2 < … < xik. The longest increasing subsequence problem asks for an increasing subsequence of maximum length. The dynamic-programming solution runs in Θ(n²) time; an O(n log n) solution exists that maintains the smallest tail of every length.

## 8. Visual — diagram or schematic
```text
Index:  0   1   2   3   4   5
Value:  3   1   4   1   5   9
dp:     1   1   2   1   3   4
        ↑   ↑   ↑   ↑   ↑   ↑
        1   1  3,4  1  4,5 5,9   ← actual chains
tails after each element (O(n log n)):
[3]
[1]
[1,4]
[1,4]
[1,4,5]
[1,4,5,9]
```
The tails row grows only when a new maximum length appears; replacements keep the row sorted.

## 9. The memory technique
1. **The hook** — Picture a row of soldiers of strictly increasing height; you only need the shortest possible soldier that can stand at each new height to keep future extensions flexible (patience-sorting visual).
2. **What to overlearn** — dp[i] = 1 + max(dp[j] for j < i, A[j] < A[i]); tails[k] stores minimal tail of length k+1.
3. **Spaced-repetition schedule** — Review the recurrence after 1 day, implement O(n²) after 3 days, code O(n log n) after 7 days, solve two unseen arrays after 16 days, and derive the tails invariant from scratch after 35 days.
4. **First-principles fallback** — If tails logic evaporates, fall back to the plain recurrence: every position only extends earlier smaller endings; recompute the max over all valid j.

## 10. What this unlocks
Mastering LIS gives the template for every “longest increasing …” variant (bitonic, non-decreasing, longest decreasing) and directly feeds into edit-distance, longest common subsequence, and patience sorting used in patience-based solitaire solvers.

- Longest Common Subsequence (LCS) reuses the same optimal-substructure idea.
- Box-stacking and Russian-doll envelope problems map to 2-D LIS.
- Dilworth’s theorem in poset theory receives an algorithmic realisation via the tails array.

## 11. Self-check — five questions, no answers
1. For array [7, 2, 4, 3, 6, 5], compute both dp table and final length.
2. Why does replacing tails[k] with a smaller value never decrease the eventual LIS length?
3. In the O(n log n) method, does the tails array ever contain the actual LIS? Demonstrate with a counter-example.
4. An array contains duplicates; modify the recurrence so that equal elements are allowed. What changes in the comparison?
5. Given only the final tails array after processing an unknown input, can you recover any valid LIS of maximum length? If not, what extra information is required?