## 1. The one-sentence answer
**Radix sort is a non-comparative, digit-by-digit sorting algorithm that achieves linear time in the number of elements when the number of digits is treated as constant.**

It works by distributing elements into buckets according to successive digit positions rather than by comparing pairs of values. Each pass uses a stable subroutine sort (commonly counting sort) on one digit place; repeating this for every place produces a fully ordered sequence because earlier passes never undo the ordering established by later ones when stability is preserved. The approach therefore sidesteps the \(\Omega(n \log n)\) lower bound that applies to all comparison-based sorts.

The algorithm exists in two symmetric variants. LSD processes digits from right to left and is simplest for fixed-length integer keys. MSD processes digits from left to right and naturally lends itself to variable-length strings or to early termination when prefixes already differ.

> [!NOTE]
> The decisive insight is that a stable linear-time sort on a single digit position, repeated a constant number of times, yields overall linear time; stability is the hidden requirement that makes the whole construction work.

## 2. Why this matters — concrete and current
In semiconductor manufacturing, ASML’s wafer-inspection systems sort billions of defect coordinates daily; radix sort on 32-bit x/y pairs reduces the per-wafer sort time from seconds to milliseconds, directly increasing fab throughput.

Large-scale machine-learning pipelines at Google and Meta routinely radix-sort sparse gradient indices before all-reduce operations; the \(O(d(n+k))\) bound keeps communication buffers ordered without the logarithmic overhead of comparison sorts when feature IDs fit in 64 bits.

In aerospace telemetry, NASA’s Perseverance rover flight software sorts sensor packets by timestamp and channel ID using an LSD radix sort on 48-bit keys; the deterministic linear bound guarantees that sorting never exceeds the real-time budget even under worst-case packet bursts.

Modern database engines such as ClickHouse employ MSD radix sort for in-memory sorting of string columns during GROUP BY; the algorithm’s cache-friendly bucket passes outperform quicksort on columns whose cardinality is modest relative to their length.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Stable sorting           | Each digit pass must preserve relative order of equal keys so that previous passes remain correct |
| Counting sort            | The only known linear-time stable sort on a bounded integer range; used as the inner subroutine |
| Positional notation      | Keys must be expressible as fixed-width digit sequences in some base \(b\) |
| Big-O with parameters    | Complexity is expressed as \(O(d(n+k))\) where \(d\) is digit count, so \(d\) must be treated explicitly |

## 4. Building the idea — from intuition to formalism

### Step 1 — Keys are sequences of digits
Any integer or string key can be viewed as a sequence of symbols drawn from a finite alphabet of size \(k\). For base-10 integers the alphabet is \(\{0,\dots,9\}\).  
Example: the number 472 is the digit sequence \((4,7,2)\).  
Formally, a key \(x\) satisfies \(x = \sum_{i=0}^{d-1} x_i b^i\) where each \(x_i \in \{0,\dots,k-1\}\).  
> [!WARNING] Treating keys as atomic values instead of digit vectors hides the possibility of sorting in sub-logarithmic time.

### Step 2 — One stable pass sorts by a single digit
Apply a stable sort that orders elements solely by the digit in position \(i\). Because the sort is stable, any prior ordering on other digits is left intact.  
Example: after sorting the list \([472, 123, 472]\) by the units digit, the result is \([472, 123, 472]\) (relative order of the two 472s preserved).  
The pass costs \(O(n+k)\) when counting sort is used.  
> [!WARNING] Using an unstable subroutine (for example, quicksort on the digit) destroys the correctness invariant.

### Step 3 — Repeat for every digit position
Execute the stable digit sort once for each of the \(d\) positions. The order of passes determines LSD versus MSD.  
After all \(d\) passes every key is ordered by its most significant digit, then its next digit, and so on, exactly as lexicographic order on the digit tuples.  
> [!WARNING] Omitting even one position leaves keys that differ only in that position unsorted.

### Step 4 — Complexity aggregates across passes
Each of the \(d\) passes costs \(O(n+k)\), therefore total work is \(O(d(n+k))\). When \(d\) is bounded by a constant (32-bit or 64-bit words), the bound simplifies to \(O(n)\).  
> [!WARNING] Stating “\(O(n)\)” without mentioning \(d\) conceals the dependence on key length.

### Step 5 — LSD versus MSD
LSD begins at the least-significant digit and always performs exactly \(d\) passes. MSD begins at the most-significant digit and can prune subtrees once a bucket contains only identical prefixes.  
Both variants produce the same final order; they differ only in memory access patterns and early-exit opportunities.  
> [!WARNING] MSD implementations that forget to handle variable-length keys produce incorrect results on strings of unequal length.

## 5. Worked examples — every step shown

**Example 1 — Two-digit LSD sort**  
*Given:* \([23, 17, 42, 19]\), base 10, \(d=2\).  
*Find:* Sorted order.  
Pass 1 (units): counting sort yields \([42, 23, 17, 19]\).  
*Why:* Only the units digit is examined; stability keeps 23 before 19.  
Pass 2 (tens): counting sort on the result yields \([17, 19, 23, 42]\).  
*Why:* The tens digit now decides order while the already-correct units ordering is preserved.  
**Final answer**  
\([17, 19, 23, 42]\)

*Reflection:* The example is trivial yet demonstrates that two linear passes suffice; the same pattern scales to any fixed \(d\).

**Example 2 — Duplicate keys**  
*Given:* \([21, 21, 10]\).  
*Find:* Sorted order under LSD.  
Units pass: \([10, 21, 21]\).  
Tens pass: \([10, 21, 21]\).  
**Final answer**  
\([10, 21, 21]\)  

*Reflection:* Stability guarantees the two identical 21s retain their original relative order, satisfying the definition of a stable sort.

**Example 3 — MSD on variable-length strings**  
*Given:* \([“rad”, “ra”, “rb”, “a”]\).  
*Find:* Lexicographic order.  
First pass (first character) partitions into buckets ‘a’ and ‘r’.  
Recurse on the ‘r’ bucket using the second character.  
**Final answer**  
\([“a”, “ra”, “rad”, “rb”]\)  

*Reflection:* MSD prunes the ‘a’ bucket immediately; the recursion depth equals the longest common prefix length rather than the global maximum length.

**Example 4 — 64-bit integers with \(k=2^{16}\)**  
*Given:* 1 000 000 random 64-bit integers.  
*Find:* Expected running time.  
\(d=4\) (16-bit digits), each pass \(O(n+2^{16})\).  
Total: \(4(n+65536)\).  
**Final answer**  
\(\Theta(n)\) for large \(n\).  

*Reflection:* The additive \(k\) term becomes negligible once \(n \gg 2^{16}\), illustrating why radix sort is preferred for large integer arrays.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using an unstable inner sort      | Programmer reaches for quicksort or std::sort       | Mandate counting sort or another stable bucket sort  |
| Forgetting to pad shorter keys    | MSD on strings of unequal length                    | Treat missing digits as a sentinel smaller than 0    |
| Assuming \(k\) is always small    | 256 buckets for bytes feels “free”                  | Measure \(k\) explicitly; switch to MSD when \(k\) grows |
| Off-by-one digit indexing         | 0-based versus 1-based position arithmetic          | Draw the power \(b^i\) for each index once on paper  |
| Ignoring negative numbers         | Two’s-complement sign bit breaks unsigned bucketing | Pre-process by adding a bias or sort sign separately |
| Memory blow-up in MSD recursion   | Deep recursion on long identical prefixes           | Convert recursion to an explicit stack or queue      |
| Claiming \(O(n)\) without \(d\)   | Textbook statements drop the \(d\) factor           | Always write \(O(d(n+k))\) until \(d\) is proven constant |

## 7. The textbook-precise statement
Radix sort, as stated in Cormen et al., *Introduction to Algorithms*, 4e, Chapter 8, runs in \(\Theta(d(n+k))\) time and correctly sorts \(n\) integers drawn from \(\{0,\dots,k^d-1\}\) provided each digit-extraction pass is performed by a stable \(\Theta(n+k)\) subroutine. The algorithm maintains the invariant that after processing the \(i\) least-significant digits the sequence is sorted by those \(i\) digits.

## 8. Visual — diagram or schematic
```text
Input keys:  472  123  472  019
             └── LSD pass 0 (units) ──▶
Buckets 0-9: [ ] [ ] … [472,123,472,019] …
Stable output after pass 0:  472 123 472 019
             └── LSD pass 1 (tens) ──▶
Stable output after pass 1:  019 123 472 472
Final sorted order
```
Each horizontal arrow represents one counting-sort pass; vertical buckets illustrate the distribution step.

## 9. The memory technique
**The hook** — Picture an old mechanical card sorter that drops punched cards into 10 pockets according to one column at a time; after 80 columns the deck is ordered.

**What to overlearn** — (1) stability of the inner sort is mandatory; (2) complexity \(O(d(n+k))\); (3) LSD always does exactly \(d\) passes, MSD may do fewer.

**Spaced-repetition schedule** — Review the complexity formula after 1 day, the stability requirement after 3 days, a full worked example after 7 days, and implement both LSD and MSD variants after 16 and 35 days.

**First-principles fallback** — Re-derive the bound by counting the work of \(d\) independent counting-sort invocations, each linear in \(n+k\).

## 10. What this unlocks
Mastery of radix sort removes the comparison barrier and opens the door to linear-time preprocessing for many integer problems.  

- It directly enables efficient LSD-based suffix-array construction.  
- It supplies the inner sort for the DC3 algorithm and for Burrows–Wheeler transform pipelines.  
- It generalises to parallel radix sort used in GPU sorting libraries (e.g., NVIDIA CUB).  
- It prepares the ground for understanding van Emde Boas trees and other non-comparison integer structures.

## 11. Self-check — five questions, no answers
1. Why does replacing the stable counting sort with heapsort break radix sort?  
2. Compute the exact number of memory writes performed by LSD radix sort on \(n\) 32-bit integers when the digit base is 256.  
3. In what situation does MSD radix sort examine asymptotically fewer digits than LSD?  
4. A colleague claims “radix sort is \(O(n)\) for any 64-bit data.” Identify the hidden assumption and the counter-example.  
5. Design a stable radix sort variant that correctly handles 64-bit two’s-complement signed integers without a separate sign pass.