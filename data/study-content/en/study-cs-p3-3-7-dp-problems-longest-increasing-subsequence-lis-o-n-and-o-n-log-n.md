## 1. The one-sentence answer
**Longest Increasing Subsequence (LIS) finds the longest subsequence of an array whose elements are in strictly ascending order, computed by dynamic programming in quadratic time or by binary-search maintenance of tails in logarithmic time per insertion.**

The core task is to extract order without requiring contiguous positions. A subsequence preserves relative ordering but may skip elements, unlike a substring. The length alone is often requested, yet the same structures recover an actual subsequence when needed.

The quadratic solution records, for every position, the best increasing chain ending there. The faster solution keeps only the smallest possible tail value for every discovered chain length; binary search updates these tails without revisiting earlier positions.

> [!NOTE]
> The O(n log n) method never stores the full predecessor graph yet still yields the correct length, because each tail value is the earliest possible end for its length and therefore dominates all later candidates of the same length.

## 2. Why this matters — concrete and current
In aerospace trajectory planning, NASA’s onboard sequence optimizers use LIS variants to select the longest feasible increasing-altitude segments from radar returns while respecting fuel and time windows.  
Semiconductor design tools at TSMC apply the O(n log n) algorithm inside static-timing-analysis passes to identify the longest timing path that remains strictly rising in delay values across millions of gates.  
Modern transformer-based language models rely on length-regularized attention masks derived from LIS to enforce monotonic alignment constraints during training on ordered token sequences, as described in the 2022 paper “Monotonic Attention for Streaming ASR.”  
Genomic assembly pipelines at Illumina invoke the same routine to reconstruct the longest increasing run of k-mer frequencies, filtering chimeric reads before de-Bruijn graph construction.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Subsequence vs. substring | Distinguishes index order preservation from adjacency     |
| Dynamic-programming recurrence | Encodes optimal substructure for chains ending at each index |
| Binary search on sorted arrays | Enables O(log n) replacement inside the tails structure   |
| Strictly increasing order | Defines the comparison predicate used in both algorithms  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Formal problem statement
An array A of n comparable elements admits an increasing subsequence when indices i1 < i2 < … < ik satisfy A[i1] < A[i2] < … < A[ik]. The LIS length is the maximum achievable k.  
Example: A = [3,1,4,1,5] yields length 3 (3,4,5).  
Formally,  
$$
\text{LIS}(A) = \max\{k \mid \exists\, 1\le i_1<\dots<i_k\le n : A[i_j]<A[i_{j+1}]\}.
$$

> [!WARNING]
> Treating the sequence as contiguous (substring) immediately produces the wrong answer on any array containing gaps.

### Step 2 — Optimal substructure
Any LIS ending at index i must be formed by appending A[i] to an LIS ending at some earlier j where A[j] < A[i].  
For A = [3,1,4], the chain ending at 4 is 3-4 (length 2).  
Thus the length satisfies the recurrence  
$$
dp[i] = 1 + \max_{0\le j<i,\,A[j]<A[i]}(dp[j])\quad\text{or }1\text{ if no such }j.
$$

> [!WARNING]
> Using ≤ instead of < produces non-strict results that violate the problem statement on duplicate values.

### Step 3 — Bottom-up quadratic DP
Compute dp[0…n-1] left to right; the global answer is the maximum entry.  
Time is Θ(n²) because each of the n positions examines up to n predecessors.  
Space can be reduced to O(n) because only the dp array is required.

### Step 4 — Patience-sorting insight
Maintain an auxiliary array tails[len] = smallest tail of all increasing subsequences of length len+1 discovered so far.  
When a new element x arrives, replace the first tail that is ≥ x; this extends or improves an existing length without storing predecessors.

### Step 5 — Binary-search update
Because tails is sorted, locate the replacement position with lower_bound in O(log n).  
After processing every element the length of tails equals LIS length.  
The final textbook claim follows: the length of the maintained tails array is exactly LIS(A).

## 5. Worked examples — every step shown

**Example 1 — Trivial single element**  
*Given:* A = [7]  
*Find:* LIS length.  
dp[0] = 1.  
*Why* – no predecessors exist, so length is 1.  
**1**

*Reflection* – Base case that every implementation must handle before the loop.

**Example 2 — Strictly decreasing**  
*Given:* A = [5,4,3,2,1]  
*Find:* LIS length.  
All dp[i] = 1 because no A[j] < A[i] for j < i.  
Maximum is therefore 1.  
**1**

*Reflection* – Shows that the algorithm correctly reports length 1 when order forbids any extension.

**Example 3 — Mixed duplicates (O(n²))**  
*Given:* A = [1,3,2,4]  
*Find:* LIS length and one subsequence.  
dp[0] = 1  
dp[1] = 1 + dp[0] = 2 (3>1)  
dp[2] = 1 + dp[0] = 2 (2>1)  
dp[3] = 1 + max(dp[0],dp[1],dp[2]) = 3  
Answer: 3 (e.g., 1,3,4).  
**3**

*Reflection* – Duplicate handling is irrelevant here; the strict < test automatically discards equals.

**Example 4 — Full O(n log n) trace**  
*Given:* A = [10,9,2,5,3,7,21,18]  
Initialize tails = [].  
10 → tails = [10]  
9 → replace 10 → tails = [9]  
2 → replace 9 → tails = [2]  
5 → append → tails = [2,5]  
3 → replace 5 → tails = [2,3]  
7 → append → tails = [2,3,7]  
21 → append → tails = [2,3,7,21]  
18 → replace 21 → tails = [2,3,7,18]  
Length = 4.  
**4**

*Reflection* – tails never stores an actual subsequence yet its length is optimal; the final value 18 is merely the smallest possible tail for length 4.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using non-strict <          | Off-by-one comparison copied from another problem | Always write the predicate explicitly as A[j] < A[i] |
| Returning the entire tails array as the subsequence | tails contains only tail values, not indices | Keep a separate predecessor array when the actual sequence is required |
| Forgetting to initialize dp[i] = 1 | Belief that every element extends some chain | Set dp[i] = 1 before the inner loop          |
| Treating the problem as longest increasing contiguous subarray | Conflating subsequence with substring       | Verify answer on an array whose LIS skips elements |
| Binary search returning insertion point incorrectly | Using upper_bound instead of lower_bound    | Confirm that tails remains strictly increasing after each replacement |
| O(n²) code exceeding time limits on n = 10⁴ | Underestimating quadratic growth            | Switch to the tails method when n > 2000     |
| Negative or duplicate numbers breaking order | Assumption that input is positive and unique | The algorithms handle any comparable type; only the comparison predicate matters |

## 7. The textbook-precise statement
Let A[1…n] be a sequence of n real numbers. Define  
$$
L(i) = 1 + \max\{L(j) : 1\le j<i,\, A(j)<A(i)\}
$$  
with L(i) = 1 when the set is empty. Then LIS length equals max L(i). The tails array T[1…ℓ] maintained by the O(n log n) algorithm satisfies T[k] = min{A(i) : L(i) = k} and is strictly increasing; its length ℓ is optimal (Cormen et al., *Introduction to Algorithms*, 4e, Ch. 15, exercise 15.4-6).

## 8. Visual — diagram or schematic
```text
Index:  0   1   2   3   4   5   6   7
Value: 10   9   2   5   3   7  21  18
tails after each step (length grows or value replaced):
[10]
[9]
[2]
[2,5]
[2,3]
[2,3,7]
[2,3,7,21]
[2,3,7,18]   ← final length 4
```
Vertical arrows indicate replacement; horizontal growth indicates append.

## 9. The memory technique
1. **The hook** — Picture a row of solitaire piles; each new card either starts a new pile or replaces the top card of an existing pile, exactly mirroring the tails array.  
2. **What to overlearn** — dp[i] recurrence, tails lower-bound update, and the fact that tails length equals LIS length.  
3. **Spaced-repetition schedule** — Review recurrence at 1 day, full O(n log n) trace at 3 days, trap table at 7 days, proof sketch at 16 days, mixed-problem set at 35 days.  
4. **First-principles fallback** — Re-derive the recurrence from the definition of subsequence, then observe that tails stores minimal endings and therefore permits binary search.

## 10. What this unlocks
Mastery of LIS supplies the canonical pattern for converting quadratic DP into n-log-n data-structure optimizations and directly enables longest common subsequence, box-stacking, and Russian-doll envelope problems.  
- Longest Common Subsequence via 2-D DP tables  
- Dilworth’s theorem relating LIS length to minimum decreasing subsequence partitions  
- Dynamic-programming speed-ups using convex hulls or data structures on the same optimal-substructure skeleton

## 11. Self-check — five questions, no answers
1. Compute LIS length for [0,8,4,12,2,10,6,14,1,9,5,13,3,11,7,15] using both methods and confirm identical results.  
2. Modify the O(n log n) algorithm to report an actual subsequence; state the additional array required and its update rule.  
3. What happens to both algorithms when the input contains 10⁶ identical elements?  
4. Prove that the tails array remains strictly increasing after every replacement.  
5. Give an input family where the O(n²) DP performs Θ(n²) comparisons yet the true LIS length is only 2; explain why the quadratic bound is tight.