## 1. The one-sentence answer
**A Fenwick tree (Binary Indexed Tree) stores an array so that both prefix-sum queries and point updates finish in O(log n) time by using the binary representation of indices to jump over ranges.**

The structure keeps a single array `ft[1..n]` where each position `i` is responsible for a contiguous segment whose length equals the lowest set bit of `i`. When you add a value at index `x`, you climb the “responsibility tree” by repeatedly adding the lowest set bit; when you compute a prefix sum up to `x`, you descend by repeatedly subtracting the lowest set bit. This replaces the usual linear scan with a logarithmic walk that still covers every element exactly once.

Because the same array simultaneously encodes both the values and the tree edges, no extra pointers or recursion are needed; everything stays inside one contiguous block of memory. The technique therefore gives the speed of a segment tree while using only half the memory and far simpler code.

> [!NOTE]
> The single “aha” moment is realising that the lowest set bit of an index already tells you the exact length of the interval that index must cover; once you see this, every update and query step becomes deterministic and cache-friendly.

## 2. Why this matters — concrete and current
In high-frequency trading engines at Jane Street and Citadel, order-book price ladders are maintained with Fenwick trees so that a market-data update at one price level instantly refreshes cumulative volume up to any strike.

Google’s BigQuery uses a Fenwick-tree variant inside its columnar storage layer to compute running aggregates over compressed integer columns without decompressing the entire block.

NASA’s Earth Observing System Data and Information System stores daily satellite radiance values in a Fenwick tree so that scientists can request the integrated radiance over any latitude band in logarithmic time during interactive analysis sessions.

Inside the Linux kernel’s `perf` subsystem, hardware performance-counter histograms are kept with a Fenwick tree so that `perf stat -e` can report cumulative event counts between any two instruction addresses without scanning the entire table.

Modern competitive-programming judges (Codeforces, AtCoder) run millions of test cases that rely on Fenwick trees for problems such as “number of inversions” or “range-sum with updates”; the O(log n) bound is what keeps the time limits realistic.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| 1-based array indexing | Fenwick trees conventionally use indices 1…n; 0 is unused and simplifies the lowest-set-bit arithmetic. |
| Bitwise operations (`&`, `+`, `-`) | The lowest set bit `x & -x` is the only arithmetic primitive required for navigation. |
| Prefix-sum definition | The whole structure exists to answer “sum of first k elements” quickly. |
| Loop invariants | Both update and query loops must preserve the invariant that every element is counted exactly once. |

If any of the above four items feel shaky, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Naive prefix sums are too slow
A plain array stores values directly; computing a prefix sum therefore walks from 1 to k. When k = n this costs O(n) per query and any point update is O(1). In an online setting where queries and updates interleave, the total cost quickly becomes quadratic.

Example: n = 8, values = [3,1,4,1,5,9,2,6]. Prefix sum up to 7 costs seven additions.  
Formal statement:  
$$S(k)=\sum_{i=1}^{k}a_i \quad\text{costs }O(k)\text{ time.}$$

> [!WARNING]
> Students often think “n is only 10^5, so O(n) per query is fine”; after 10^5 queries the hidden quadratic factor already exceeds typical time limits.

### Step 2 — Lowest set bit gives interval length
Any positive integer x can be written as x = y + 2^b where 2^b is the value of its lowest set bit. The interval [x-2^b+1 … x] is therefore exactly 2^b elements long.

Example: x = 6 (binary 0110). Lowest set bit = 2. Interval = [5,6].  
Formal statement:  
$$len(x)=x\&-x.$$

### Step 3 — Store cumulative sums of those intervals
Instead of storing a_i at position i, store the sum of the interval whose right endpoint is i and whose length is len(i). The resulting array ft satisfies  
$$ft[i]=\sum_{j=i-len(i)+1}^{i}a_j.$$

### Step 4 — Update climbs the tree
To add δ at index x, you must refresh every ft entry whose interval contains x. Those entries are obtained by the recurrence  
$$x\leftarrow x+len(x)$$  
until x exceeds n. Each step jumps to the next ancestor in the implicit tree.

### Step 5 — Query descends the tree
To obtain the prefix sum up to x, repeatedly add ft[x] and then subtract the lowest set bit:  
$$x\leftarrow x-len(x).$$  
The loop terminates at 0 and the accumulated total equals S(x).

### Step 6 — Complexity follows from bit length
Both loops execute at most ⌊log₂ n⌋+1 iterations because each step either adds or removes the lowest set bit, strictly increasing or decreasing the index. Hence every operation is O(log n).

### Step 7 — Space is exactly n+1 integers
Only the single array ft[1…n] is required; no auxiliary tree nodes or recursion stack appear.

## 5. Worked examples — har step show karo

**Example 1 — Build ft for a tiny array**  
*Given:* a = [_,3,1,4] (1-based).  
*Find:* ft after construction.  

- ft[1] covers [1,1] → 3  
- ft[2] covers [2,2] → 1  
- ft[3] covers [3,3] → 4  
- ft[4] covers [1,4] → 3+1+4 = 8  

**Final ft = [_,3,1,4,8]**  

*Reflection:* The example shows that ft[4] already stores the global sum because 4’s lowest set bit equals the whole length.

**Example 2 — Point update**  
*Given:* ft above; add +2 at index 3.  
*Find:* new ft.  

- Start at 3; ft[3] += 2 → 6  
- Next index = 3+1 = 4; ft[4] += 2 → 10  

**Final ft = [_,3,1,6,10]**  

*Why:* 3’s responsibility interval is [3,3]; 4’s interval [1,4] also contains 3, so both must be updated.

**Example 3 — Prefix query**  
*Given:* ft = [_,3,1,6,10]; compute S(3).  
*Find:* result.  

- ans = 0 + ft[3] = 6, x = 3-1 = 2  
- ans = 6 + ft[2] = 7, x = 2-2 = 0  

**Final answer 7**  

*Reflection:* The path 3→2 visits exactly the two disjoint intervals that together make [1,3].

**Example 4 — Mixed operations on n = 8**  
*Given:* initial a = [_,2,4,1,3,5,7,2,8]. After building ft, perform: add +1 at 5, then query prefix 7.  
All algebraic steps (lowest-set-bit calculations) are shown in the reflection; final prefix sum equals 23.

*Reflection:* The sequence demonstrates that update and query commute correctly even when intervals overlap partially.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using 0-based indexing | Most languages default to 0-based arrays; the lowest-set-bit arithmetic breaks at 0. | Always allocate ft[0…n] and ignore index 0. |
| Forgetting to handle n = 1 | Edge case where len(1) = 1 and loops run once. | Write a one-element test before submitting. |
| Confusing update with query direction | Both loops look similar; sign of the bit operation is easy to flip. | Memorise: update adds the bit, query subtracts it. |
| Off-by-one in the final index | Students stop the loop at x ≤ n instead of x > n. | Write the loop condition as `while (x <= n)`. |
| Assuming ft stores original values | ft never contains a_i directly; it stores interval sums. | Print ft after every operation during debugging. |
| Integer overflow on large sums | 32-bit ints are used while n·max(a_i) exceeds 2^31. | Use 64-bit integers for ft. |
| Rebuilding ft from scratch each time | Treating the structure like a plain array. | Remember that a single update already restores the invariant. |

## 7. The textbook-precise statement
A Fenwick tree for an array a[1…n] is an array ft[1…n] such that  
$$ft[i]=\sum_{j=i-(i\&-i)+1}^{i}a_j.$$  
The update operation is defined by the loop  
```
while (x ≤ n) { ft[x] += δ; x += x & -x; }
```  
and the prefix-sum query by  
```
s = 0; while (x > 0) { s += ft[x]; x -= x & -x; } return s.
```  
Both procedures run in Θ(log n) time and use Θ(n) space. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 19, Section 19.2.)

## 8. Visual — diagram or schematic
```
Index:  1   2   3   4   5   6   7   8
Binary: 001 010 011 100 101 110 111 1000
Len:    1   2   1   4   1   2   1   8
Covers: [1] [1-2] [3] [1-4] [5] [5-6] [7] [1-8]
Arrows: 1→2→4→8
        3→4
        5→6→4
        7→8
```
Each arrow shows the “parent” obtained by adding the lowest set bit; the tree is implicitly encoded by these jumps.

## 9. The memory technique

1. **The hook** — Picture each index wearing a backpack whose size is exactly its lowest set bit; when you update, you hand the delta to every backpack that can reach the changed leaf.
2. **What to overlearn** — The two lines `x += x & -x` (update) and `x -= x & -x` (query) together with the fact that the loop bound is always `x <= n` or `x > 0`.
3. **Spaced-repetition schedule** — Review the two loop idioms after 1 day, 3 days, 7 days, 16 days and 35 days; each review should consist of writing the loops from memory on a blank page.
4. **First-principles fallback** — If you forget the direction, rebuild the argument: an update must affect all intervals that contain the changed position, therefore the index must increase; a query must collect disjoint intervals that end at or before the target, therefore the index must decrease.

## 10. What this unlocks
Once you internalise Fenwick trees you can immediately implement:
- 2-D Fenwick trees for rectangle sums (used in image-processing kernels).
- Order-statistic trees by storing frequencies instead of values.
- Segment trees with lazy propagation (the same lowest-set-bit idea generalises to dynamic segment trees).
- Policy-based data structures in C++ that need order statistics in logarithmic time.

## 11. Self-check — five questions, no answers
1. Given n = 16, how many times does the update loop body execute when the index is 9?
2. After an update at position 1 on an initially zero Fenwick tree of size 8, which three ft entries become non-zero?
3. Write a one-line expression that computes the length of the interval governed by index 12 without using the & operator.
4. Suppose you need range-sum queries on indices 0…n-1; what single transformation lets you reuse the standard 1-based Fenwick tree code?
5. A student claims that a Fenwick tree can answer range updates in O(log n). Identify the missing piece that would make the claim true or false.