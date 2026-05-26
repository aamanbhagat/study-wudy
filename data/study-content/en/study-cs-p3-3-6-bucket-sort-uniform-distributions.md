## 1. The one-sentence answer
**Bucket sort partitions the input range into n equal-width intervals (buckets) and distributes each of the n keys into its bucket; when the keys are drawn independently from a uniform distribution, each bucket receives an expected constant number of keys that can be sorted in constant time, yielding overall linear expected running time.**

The algorithm begins from the observation that comparison-based sorts must examine at least log(n!) bits of information and therefore require Ω(n log n) comparisons in the worst case. When the keys themselves carry distributional information, that lower bound can be circumvented by using the keys as direct addresses into an array of buckets. Uniformity guarantees that the mapping from key value to bucket index spreads the keys evenly; consequently the work of sorting inside each bucket stays bounded by a small constant with high probability.

The procedure therefore replaces the global ordering problem with many independent local ordering problems whose sizes sum to n. After each local sort finishes, the buckets are concatenated in order of their indices to produce the globally sorted sequence.

> [!NOTE]
> The single crucial insight is that uniformity turns an arbitrary distribution of n keys into n independent Poisson random variables each with mean 1; the expected cost of sorting those small lists is therefore Θ(n) rather than Θ(n log n).

## 2. Why this matters — concrete and current
In high-energy physics experiments at CERN, millions of particle-track parameters arrive each second already normalized to the unit interval; bucket sort with 10^5 buckets lets the online reconstruction farm maintain a constant-time sort of hit coordinates before feeding them to Kalman filters.

Graphics processing units used in autonomous-vehicle perception pipelines (NVIDIA Drive) bucket-sort depth values from LiDAR returns; the uniform distribution of depths in open-road scenes permits a single-pass radix-bucket hybrid that feeds the subsequent occupancy-grid kernel without an extra comparison sort.

In semiconductor yield analysis, parametric test measurements (threshold voltages, leakage currents) are normalized to [0,1) and bucket-sorted to compute empirical CDFs for every wafer; the linear-time sort permits real-time monitoring on the test floor where millions of dies are measured per hour.

Machine-learning data loaders in large-scale training clusters (PyTorch DataLoader with uniform-shard sampling) employ bucket sort on normalized random seeds to group examples by difficulty score; the resulting contiguous memory layout improves cache behavior inside the subsequent matrix-multiplication kernels.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Uniform distribution on [0,1) | Guarantees each bucket receives Θ(1) keys in expectation; without it the analysis collapses. |
| Expectation of a non-negative random variable | Used to bound total work inside buckets via linearity of expectation. |
| Insertion sort on small lists | Serves as the subroutine whose quadratic cost remains harmless when list length is O(1). |
| Array indexing as direct addressing | Converts a real-valued key into an integer bucket index in constant time. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Map each key to a bucket index
Divide the unit interval into n contiguous subintervals of width 1/n.  
Example: n = 5, key x = 0.67 maps to bucket floor(5·0.67) = 3.  
The mapping is expressed by the floor function  
$$
b_i = \lfloor n \cdot x_i \rfloor, \qquad 0 \le x_i < 1.
$$
> [!WARNING]
> Using round instead of floor, or forgetting the half-open interval, produces an off-by-one error that places the largest key into a nonexistent bucket n.

### Step 2 — Allocate an array of n empty buckets
Create an array B[0…n−1] whose cells hold linked lists (or dynamic arrays).  
Because the mapping in Step 1 is a total function onto {0,…,n−1}, every key lands in exactly one cell.  
Formally the buckets satisfy the partition  
$$
\bigcup_{j=0}^{n-1} B[j] = \{x_1,\dots,x_n\}, \qquad B[j] \cap B[k] = \emptyset \ (j\neq k).
$$

### Step 3 — Distribute the keys
For each key x_i insert it into B[b_i]. Under uniformity the number of keys falling into bucket j is a binomial random variable Bin(n,1/n) whose expectation equals 1.

### Step 4 — Sort each bucket independently
Apply insertion sort to every non-empty bucket. Insertion sort on a list of length m costs Θ(m²) comparisons. Because m is random, the expected cost per bucket is bounded by a constant.

### Step 5 — Concatenate the buckets
Append the sorted contents of B[0], then B[1], …, B[n−1]. The result is the globally sorted sequence because every element in B[j] is strictly smaller than every element in B[j+1].

### Step 6 — Expected-time analysis
Let X_j be the size of bucket j. Then the total running time T satisfies  
$$
\mathbb{E}[T] = \Theta(n) + \sum_{j=0}^{n-1} \mathbb{E}[X_j^2].
$$
Linearity and the second-moment calculation for the binomial yield \(\mathbb{E}[X_j^2] = O(1)\), hence \(\mathbb{E}[T] = \Theta(n)\).

## 5. Worked examples — every step shown

**Example 1 — Five uniform keys**  
*Given:* n = 5, keys {0.12, 0.78, 0.34, 0.55, 0.91}.  
*Find:* sorted order after bucket sort.  
1. Compute indices: ⌊5·0.12⌋=0, ⌊5·0.78⌋=3, ⌊5·0.34⌋=1, ⌊5·0.55⌋=2, ⌊5·0.91⌋=4.  
   *Why:* direct application of the floor mapping.  
2. Buckets: B[0]={0.12}, B[1]={0.34}, B[2]={0.55}, B[3]={0.78}, B[4]={0.91}.  
3. Insertion sort each (already length 1).  
4. Concatenate: 0.12, 0.34, 0.55, 0.78, 0.91.  
**0.12, 0.34, 0.55, 0.78, 0.91**  
*Reflection:* Trivial case shows the mapping and concatenation; nothing is left to chance.

**Example 2 — Collision inside one bucket**  
*Given:* n = 3, keys {0.1, 0.2, 0.25}.  
*Find:* final sorted list.  
1. Indices: ⌊3·0.1⌋=0, ⌊3·0.2⌋=0, ⌊3·0.25⌋=0.  
   *Why:* all three fall in the first interval [0,1/3).  
2. Bucket B[0] receives three keys; insertion sort yields 0.1,0.2,0.25.  
3. Concatenation simply emits that single sorted list.  
**0.1, 0.2, 0.25**  
*Reflection:* Demonstrates that local quadratic work remains harmless when total size is n.

**Example 3 — Larger uniform sample**  
*Given:* n = 8, keys drawn as 0.03,0.19,0.27,0.31,0.44,0.67,0.71,0.92.  
*Find:* expected-time verification and output.  
1. Indices: 0,1,2,2,3,5,5,7.  
2. Bucket lengths: 1,1,2,1,0,2,0,1.  
3. After insertion sort inside each bucket and concatenation the sequence is 0.03,0.19,0.27,0.31,0.44,0.67,0.71,0.92.  
**0.03,0.19,0.27,0.31,0.44,0.67,0.71,0.92**  
*Reflection:* Shows multiple buckets of size 2; the sum of squares is still O(n).

**Example 4 — Edge key at boundary**  
*Given:* n = 4, key exactly 0.5.  
*Find:* correct bucket.  
1. ⌊4·0.5⌋ = 2 (half-open convention).  
   *Why:* 0.5 belongs to [0.5,0.75).  
2. Bucket 2 receives the key; no overflow into bucket 3.  
**Correct placement in bucket 2**  
*Reflection:* Reinforces the necessity of the floor-plus-half-open rule.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using ceiling or round instead of floor | Off-by-one at interval boundaries | Always compute ⌊n·x⌋ and treat intervals as [j/n,(j+1)/n). |
| Allocating only n−1 buckets | Integer division edge case when x approaches 1 | Allocate exactly n buckets; the last bucket receives keys in [ (n−1)/n , 1 ). |
| Assuming worst-case linear time | Forgetting that non-uniform inputs can produce Θ(n) keys in one bucket | State explicitly that the Θ(n) bound is expected time under uniformity. |
| Forgetting to clear buckets between runs | Re-use of static arrays in code | Zero the bucket array or allocate fresh lists each invocation. |
| Sorting the bucket array itself instead of its contents | Confusion between bucket indices and bucket contents | Remember that bucket indices are already ordered; only intra-bucket order must be restored. |
| Floating-point precision loss for keys near 1 | 0.999999999 mapped to bucket n | Clamp or use nextafter to guarantee index ≤ n−1. |
| Using comparison sort inside buckets when lists are long | Violates the constant-size assumption | Verify that each bucket length is O(1) in expectation before choosing the subroutine. |

## 7. The textbook-precise statement
Let X_1,…,X_n be i.i.d. uniform-[0,1) random variables. Bucket sort with n buckets and insertion sort inside buckets produces a correctly sorted sequence in expected Θ(n) time. (Cormen et al., *Introduction to Algorithms*, 4e, §8.4, Theorem 8.3.)

## 8. Visual — diagram or schematic
```text
[0,1) ─────────────────────────────────────────────▶
 |          |          |          |          |
Bucket 0  Bucket 1  Bucket 2  Bucket 3  Bucket 4
(0–0.2)   (0.2–0.4)  (0.4–0.6)  (0.6–0.8)  (0.8–1)
   |          |          |          |          |
  [x]       [x,x]      [x]       [x,x]      [x]
   ↓          ↓          ↓          ↓          ↓
 sorted   sorted   sorted   sorted   sorted
   └──────────┬──────────┬──────────┬──────────┘
              Concatenate in index order
```

## 9. The memory technique
1. **The hook** — Picture n fire buckets lined up under a uniform rain of marbles; each bucket catches roughly one marble and needs only a quick shake to order them.  
2. **What to overlearn** — The mapping b = ⌊n x⌋, the fact that E[X_j²] = O(1) for uniform X_j, and that concatenation is free because bucket indices already encode order.  
3. **Spaced-repetition schedule** — Review the mapping and expectation argument after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive E[T] = Θ(n) + Σ E[X_j²] from the binomial second moment whenever the algorithm feels hazy.

## 10. What this unlocks
Bucket sort under uniformity supplies the first deterministic linear-time sorting routine once distributional assumptions are granted; it therefore opens the door to radix sort, counting sort generalizations, and the broader study of distribution-sensitive algorithms.

- Radix sort for integer keys viewed as multiple bucket-sort passes.  
- Hash-table analysis that likewise relies on uniform bucket occupancy.  
- Order-statistic trees that can be replaced by bucket arrays when keys are uniform.  
- Parallel sorting networks that assign work to processors via the same floor mapping.

## 11. Self-check — five questions, no answers
1. For n = 10^6 uniform keys, compute the exact expected number of buckets that receive at least three keys.  
2. Suppose one key equals 0.999999999; which bucket does it enter when n = 1000 and floating-point rounding occurs?  
3. Prove that the probability a single bucket receives more than log n keys is o(1/n).  
4. Identify the precise line in the expectation argument that fails when the input distribution is exponential rather than uniform.  
5. Modify the algorithm to handle keys in [a,b] instead of [0,1); state the new index formula and the resulting expected-time claim.