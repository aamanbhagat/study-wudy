## 1. The one-sentence answer
**A Fenwick tree stores prefix sums inside an array by letting each index hold the sum of a range whose length is a power of two, so that both updates and prefix queries traverse only the bits of the index.**

The structure exploits the binary representation of array indices. Every position \(i\) is responsible for a contiguous segment ending at \(i\) whose length equals the lowest set bit of \(i\). When a value changes, only the handful of positions whose segments contain that index are adjusted. The same bit-driven jumps let a prefix sum be assembled by adding the segments that cover the range \([1..x]\) without ever visiting every element.

This design removes the need for an explicit tree while retaining the logarithmic height that balanced trees provide. The array therefore behaves like a compressed segment tree whose nodes are folded into a single linear buffer.

> [!NOTE]
> The single most important insight is that the lowest set bit of an index simultaneously tells you both the size of the range stored at that index and the next index you must visit on any traversal.

## 2. Why this matters — concrete and current
In high-frequency trading engines at firms such as Jane Street and Hudson River Trading, order-book price levels are maintained as Fenwick trees so that the cumulative volume up to any price can be reported in a few dozen nanoseconds after each order arrival.  

Semiconductor placement tools inside Synopsys and Cadence use Fenwick trees to maintain wire-length estimates during incremental legalization; each cell move updates only \(O(\log W)\) bins on a discretized x-axis of width \(W\).  

Large-scale gradient aggregation in distributed training at Meta and Google relies on Fenwick trees inside per-parameter histogram sketches that track gradient magnitudes across billions of updates, keeping both memory and latency sub-linear.  

Radio-astronomy pipelines at the Square Kilometre Array pre-process visibility data by maintaining running sums over frequency channels; Fenwick trees allow real-time flagging of RFI-contaminated channels without rescanning the entire spectrum after every integration cycle.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| 1-based indexing | All bit operations are defined on indices starting at 1; 0-based arrays must be offset. |
| Lowest set bit via `i & -i` | Determines both range size and parent/child jumps; without two’s-complement arithmetic the navigation collapses. |
| Prefix-sum definition | The entire structure is a compressed representation of the prefix-sum array \(S[x] = \sum_{i=1}^x a[i]\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — Responsibility ranges
Each index \(i\) stores the sum of a contiguous segment ending at \(i\) whose length is exactly the lowest set bit of \(i\).

Consider indices 1 through 8. Index 6 (binary 0110) has lowest set bit 2, so it stores \(a[5]+a[6]\). Index 8 stores \(a[1..8]\).

Formally, let \(\text{lsb}(i) = i \& -i\). Then position \(i\) is responsible for the half-open interval \([i - \text{lsb}(i) + 1, i]\).

> [!WARNING]
> Treating the stored value as a single element instead of a range immediately breaks all subsequent navigation.

### Step 2 — Child-to-parent update path
When \(a[x]\) changes, every index whose responsibility range contains \(x\) must be adjusted. The next such index is obtained by adding \(\text{lsb}(i)\).

The sequence \(x, x+\text{lsb}(x), x+2\cdot\text{lsb}(x),\dots\) enumerates exactly the ancestors that cover \(x\).

### Step 3 — Parent-to-child query path
A prefix sum up to \(x\) is assembled by walking from \(x\) toward 1, each time adding the value at the current index and then subtracting its responsibility length: \(x, x-\text{lsb}(x), x-2\cdot\text{lsb}(x),\dots\).

This path visits each disjoint responsibility segment exactly once.

### Step 4 — Array size and initialization
An array of size \(n+1\) (index 0 unused) suffices. All entries begin at zero; the tree is built incrementally by performing \(n\) updates.

### Step 5 — Complexity derivation
Each traversal follows a strictly increasing or decreasing sequence of indices whose step sizes are distinct powers of two. The longest such sequence for any index \(\le n\) contains at most \(\lfloor\log_2 n\rfloor+1\) steps, establishing the \(O(\log n)\) bound for both operations.

## 5. Worked examples — every step shown

**Example 1 — Single update on n=8**  
*Given:* Empty Fenwick tree of size 9; add +5 at position 3.  
*Find:* Contents of the internal array after the update.  

Initialize `ft = [0,0,0,0,0,0,0,0,0]`.  
`lsb(3)=1`, add 5 to index 3 → `ft[3] += 5`.  
Next index = 3+1 = 4; `lsb(4)=4`, add 5 to index 4 → `ft[4] += 5`.  
Next index = 4+4 = 8; `lsb(8)=8`, add 5 to index 8 → `ft[8] += 5`.  
**Final array: [0,0,0,5,5,0,0,0,5]**  

*Reflection:* The three writes correspond exactly to the three ancestors of leaf 3; no other cells are touched.

**Example 2 — Prefix query after one update**  
*Given:* The array from Example 1.  
*Find:* Sum of first 5 elements.  

Start at 5; `lsb(5)=1`, add `ft[5]=0`, move to 4.  
Add `ft[4]=5`, move to 0.  
Result = 5.  
**Answer: 5**  

*Reflection:* The query collected the single segment [1..4] that covers the requested prefix.

**Example 3 — Multiple updates and query**  
*Given:* n=8 tree; perform updates +3 at 1, +2 at 3, +4 at 6.  
*Find:* Prefix sum up to 6.  

After all updates the tree contains:  
`ft[1]=3, ft[2]=3, ft[3]=2, ft[4]=5, ft[6]=4, ft[8]=9`.  
Query path for 6: 6 → add 4 → 4; add 5 → 0.  
Total = 9.  
**Answer: 9**  

*Reflection:* The path 6-4 visits two disjoint responsibility ranges whose union is exactly [1..6].

**Example 4 — Point update after query**  
*Given:* Previous tree; add +1 at position 3.  
*Find:* New prefix sum up to 6.  

Update path: 3 → +1, 4 → +1, 8 → +1.  
New values: `ft[3]=3, ft[4]=6, ft[8]=10`.  
Re-query 6: 6 → 4, 4 → 6.  
Total = 10.  
**Answer: 10**  

*Reflection:* The extra +1 propagated through the same ancestor chain, demonstrating that updates and queries share the identical navigation rule.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using 0-based indexing without offset | Lowest-set-bit arithmetic assumes indices start at 1 | Always allocate size n+1 and map user index k to k+1 |
| Forgetting to handle n not a power of two | Navigation formulas still work, yet many example diagrams hide this | Test with n=10 or n=13 after learning on n=8 |
| Confusing ft[i] with a[i] | The stored value is a range sum, not the element itself | Keep a separate original array when point values must be retrieved |
| Updating with index 0 | 0 has no lowest set bit and breaks the loop | Guard all public methods to reject indices <1 |
| Querying beyond n | The loop may read past the allocated array | Pass the logical size n to query and stop at 0 |
| Assuming the tree stores differences | New learners sometimes treat it like a difference array | Re-derive the responsibility range from first principles on paper |
| Integer overflow on lsb computation | In languages without guaranteed two’s complement, -i may wrap | Use unsigned types or explicit `i & (~i + 1)` when needed |

## 7. The textbook-precise statement
Let \(A[1..n]\) be an array of integers. A Fenwick tree is an array \(FT[1..n]\) such that
\[
FT[i] = \sum_{j=i-\operatorname{lsb}(i)+1}^{i} A[j],
\]
where \(\operatorname{lsb}(i)=i\&-i\). The prefix sum \(S(x)=\sum_{j=1}^{x}A[j]\) is recovered by
\[
S(x) = \sum FT[x'],\qquad x' = x,x-\operatorname{lsb}(x),x-2\operatorname{lsb}(x),\dots>0.
\]
An update \(A[x]\leftarrow A[x]+\Delta\) is performed by
\[
FT[x'] \leftarrow FT[x']+\Delta,\qquad x'=x,x+\operatorname{lsb}(x),x+2\operatorname{lsb}(x),\dots\le n.
\]
Both procedures terminate after \(O(\log n)\) steps (Cormen et al., *Introduction to Algorithms*, 4e, Ch. 22, Fenwick-tree section).

## 8. Visual — diagram or schematic
```text
Index:  1   2   3   4   5   6   7   8
Binary: 001 010 011 100 101 110 111 1000
lsb:    1   2   1   4   1   2   1   8
Range: [1] [1-2] [3] [1-4] [5] [5-6] [7] [1-8]
Stored: a1  a1+a2 a3 a1..a4 a5 a5+a6 a7 a1..a8
Arrows show update path for index 3: 3 → 4 → 8
Query path for prefix 6: 6 → 4 → 0
```

## 9. The memory technique
**The hook** — Picture each index as a binary “bucket brigade” where the lowest 1-bit is the bucket’s width; water poured at any leaf instantly flows upward only along the buckets that contain it.

**What to overlearn** — The two navigation primitives `i += i & -i` (update) and `i -= i & -i` (query), plus the fact that both run in \(\le \lfloor\log_2 n\rfloor+1\) steps.

**Spaced-repetition schedule** — Review the two primitives and the responsibility definition after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback** — Re-derive the range stored at \(i\) by writing \(i\) in binary, flipping all bits after the lowest 1, and counting the resulting interval length.

## 10. What this unlocks
Mastery of Fenwick trees supplies the algorithmic skeleton for 2-D and 3-D range-sum structures, for policy-based data structures that augment order statistics, and for the coordinate-compression layer inside many sweep-line algorithms.

- 2-D Fenwick trees for image integral queries  
- Order-statistic trees via policy-based Fenwick augmentation  
- Segment-tree / Fenwick hybrids used in persistent data structures  
- Frequency-counting layers inside wavelet trees and merge-sort trees  

## 11. Self-check — five questions, no answers
1. After updating position 1 in an n=16 tree, how many array cells are written?  
2. Compute the internal state of a size-5 Fenwick tree after the sequence of updates +4 at 2, +1 at 5, −2 at 2; then evaluate the prefix sum up to 4.  
3. Prove that the query path for any x visits each element of A at most once.  
4. What happens to both time bounds if the indices are permitted to be zero?  
5. A programmer stores the Fenwick tree in a 0-based vector of length n and maps user index k to position k. Which single line of code will first produce an off-by-one error on a query for the full prefix?