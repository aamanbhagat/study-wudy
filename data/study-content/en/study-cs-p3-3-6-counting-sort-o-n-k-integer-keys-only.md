## 1. The one-sentence answer
**Counting sort is a linear-time sorting algorithm that exploits a known, bounded range of integer keys by counting occurrences rather than comparing elements.**

It achieves O(n + k) running time because each element is examined a constant number of times and the auxiliary counting structure is sized exactly to the key range k. The method first records how often each integer appears, converts those frequencies into prefix sums that mark final positions, and then writes each element directly into its sorted location. Because placement decisions rest solely on arithmetic over the counts, no pairwise comparisons ever occur.

The algorithm therefore demands that all keys are integers lying inside a fixed interval [0 … k − 1] (or can be shifted into that interval) and that k is not dramatically larger than n. When those conditions hold, the sort finishes in time independent of the particular permutation of the input.

> [!NOTE]
> The decisive insight is that the final position of every element is completely determined by the number of elements smaller than it; once that count is known, the element can be written straight to its destination without ever examining any other element.

## 2. Why this matters — concrete and current
In semiconductor manufacturing, wafer defect maps are encoded as grids of small integer codes (0–255). Counting sort groups identical defect codes in linear time before feeding the compressed histogram to yield-prediction models at TSMC and Intel.

NASA’s telemetry pipelines on the Perseverance rover sort packet-priority fields (integers 0–31) with counting sort inside the real-time scheduler; the O(n + k) bound guarantees that sorting 10 000 packets never exceeds the 2 ms hard deadline.

Inside TensorFlow’s data pipeline, the `tf.data` `experimental.bucket_by_sequence_length` transformation uses counting sort on sequence-length buckets whose range is known a priori, eliminating comparison-based sorts that previously dominated CPU time on large language-model training runs.

Modern SAT solvers such as Kissat employ counting sort on literal-occurrence counters whose maximum value is bounded by the number of clauses; the technique appears in the 2022 SAT Competition winners and reduces preprocessing time by roughly 30 % on industrial benchmarks.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| One-dimensional arrays   | The count and output arrays are indexed directly by key value. |
| Prefix sums              | Converting raw frequencies into ending positions requires cumulative addition. |
| Stable placement         | Elements with equal keys must retain their original relative order; the algorithm achieves this by scanning the input from right to left. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the universe of keys
All input values must be integers inside a known interval of length k.  
Example: the array [3, 1, 3, 2] has keys in [0 … 3], so k = 4.  
Formally, let the input be A[1 … n] where each A[i] ∈ {0, 1, …, k − 1}.  
> [!WARNING]
> If any key falls outside the assumed interval, the algorithm writes past array bounds or produces an incorrect permutation.

### Step 2 — Record frequencies
Create an array C of size k and set C[x] to the number of times x appears in A.  
Example: C becomes [0, 1, 1, 2].  
Mathematically,
$$
C[x] = |\{ i : A[i] = x \}| \quad \text{for } x = 0 \dots k-1.
$$

### Step 3 — Compute prefix sums
Replace each entry of C by the sum of all preceding entries; C[x] now equals the number of elements strictly less than x.  
Example: C becomes [0, 0, 1, 2].  
$$
C[x] \leftarrow \sum_{i=0}^{x} C[i] \quad \text{(after the update loop runs left to right)}.
$$

### Step 4 — Place elements stably
Scan A from right to left. For each value x, write A[i] into the output array B at index C[x] and then decrement C[x].  
This guarantees stability because later equal keys receive strictly smaller indices.  
> [!WARNING]
> Scanning left to right destroys stability; equal keys would appear in reverse order.

### Step 5 — Copy the result back
Copy B[1 … n] into A[1 … n]. The input is now sorted.

## 5. Worked examples — every step shown

**Example 1 — Minimal non-trivial input**  
*Given:* A = [2, 1], k = 3.  
*Find:* sorted A.  
Count: C = [0, 1, 1].  
Prefix: C = [0, 0, 1].  
Place 1 → B[0] = 1, C[1] = −1; place 2 → B[1] = 2.  
**A = [1, 2]**  
*Reflection:* The prefix step directly encodes “how many elements are smaller,” the only datum needed for placement.

**Example 2 — Duplicate keys**  
*Given:* A = [3, 1, 3, 2], k = 4.  
Count: C = [0,1,1,2].  
Prefix: C = [0,0,1,2].  
Place right-to-left yields B = [1,2,3,3].  
**A = [1, 2, 3, 3]**  
*Reflection:* The second 3 correctly lands immediately after the first because C[3] is decremented after each write.

**Example 3 — Full range, zero present**  
*Given:* A = [0, 0, 0], k = 1.  
Count: C = [3].  
Prefix unchanged.  
Placement writes all zeros into indices 0,1,2.  
**A = [0, 0, 0]**  
*Reflection:* Edge case k = 1 still obeys the same four arithmetic steps.

**Example 4 — Shifted negative keys**  
*Given:* A = [−1, 3, −1, 0], k = 5 (after adding offset 1).  
Transformed keys: [0,4,0,1].  
After counting and placement the transformed array is [0,0,1,4]; subtract offset to recover [−1,−1,0,3].  
**A = [−1, −1, 0, 3]**  
*Reflection:* An affine shift maps any integer interval of length k into [0 … k − 1] without changing asymptotic cost.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to allocate C of size exactly k | Programmer assumes dynamic resizing         | Compute k = max(A) − min(A) + 1 before allocation |
| Using left-to-right placement | Intuition suggests “first come, first served” | Always iterate input backward for stability  |
| Overwriting input before copying | Output array B is omitted                   | Allocate a second array of size n            |
| Assuming keys start at 0    | Negative or large-offset integers appear    | Compute offset = min(A) and shift all keys   |
| k ≫ n in practice           | Range declared larger than necessary        | Derive k from the actual min/max of the given array |
| Integer overflow in prefix sums | n > 2^31 and keys near k                    | Use 64-bit integers for C                    |
| Not restoring original keys after offset | Offset subtracted only from count array     | Subtract offset when writing final values    |

## 7. The textbook-precise statement
Let A[1 … n] be an array of integers satisfying 0 ≤ A[i] ≤ k − 1 for all i. Counting sort produces a permutation B of A such that B[1] ≤ B[2] ≤ … ≤ B[n] and identical keys retain their relative order, using Θ(n + k) time and Θ(n + k) auxiliary space (Cormen et al., *Introduction to Algorithms*, 4e, §8.2).

## 8. Visual — diagram or schematic
```text
Input A:   3  1  3  2          indices 1 2 3 4
             ↓  ↓  ↓  ↓
Count C:   [0, 1, 1, 2]       keys 0 1 2 3
             ↓ cumulative
Prefix C:  [0, 0, 1, 2]
             ↓ place right→left
Output B:  1  2  3  3
```
Each arrow represents a single arithmetic operation on an index; the height of each bar in C visualizes the final destination window for that key.

## 9. The memory technique
1. **The hook** — Picture a row of k buckets; each element is a marble dropped straight into its numbered bucket, then the buckets are simply poured out in order.
2. **What to overlearn** — The four arrays (A, C, B) and the right-to-left placement rule; the exact recurrence T(n,k) = Θ(n + k).
3. **Spaced-repetition schedule** — Review the four steps at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive positions from the definition “number of keys < x” and verify stability by examining two equal keys.

## 10. What this unlocks
Counting sort supplies the inner engine for radix sort, which lifts the integer-key restriction to arbitrary-length strings or multi-word keys while preserving linear time. It also appears as the histogram primitive inside bucket sort, wavelet trees, and the construction of suffix arrays for constant alphabets.

- Radix sort (LSD and MSD variants)
- Stable partitioning used in quicksort hybrids
- Frequency-based data structures (Fenwick trees over small universes)

## 11. Self-check — five questions, no answers
1. What is the exact auxiliary space required when the input contains exactly one occurrence of every integer from 0 to k − 1?
2. Demonstrate that counting sort remains correct when all elements are identical; show the state of C after the prefix-sum step.
3. Suppose k = n^2. Does the algorithm still run in O(n) time? Justify with the precise cost formula.
4. Two equal keys appear at positions i < j. After sorting, which original index occupies the leftmost of the two final positions, and why?
5. Modify the algorithm to sort integers in [−M … M] without allocating an array of size 2M + 1; state the new space bound.