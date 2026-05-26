## 1. The one-sentence answer
**A suffix array is the sorted permutation of all starting indices of a string’s suffixes; it can be built in \(O(n\log n)\) time via repeated doubling and radix sorting, after which the LCP array records the longest common prefix length between every pair of consecutive sorted suffixes.**

A string of length \(n\) has exactly \(n\) suffixes. Sorting them directly would cost \(O(n^2\log n)\) because each comparison may examine up to \(n\) characters. The key observation is that the relative order of suffixes is completely determined by their first \(2^k\) characters once all shorter prefixes have already been ranked. By doubling the prefix length at each step and reusing the ranks from the previous step, the algorithm reduces every comparison to a pair of integer ranks, allowing each doubling phase to run in linear time with radix sort.

After the suffixes are ordered, the LCP array stores, for each pair of consecutive entries in the suffix array, the length of their longest common prefix. This array is computed in a single \(O(n)\) sweep by walking through the inverse permutation and reusing previously computed LCP values.

> [!NOTE]
> The decisive insight is that integer ranks replace string comparisons after the first doubling round; once ranks are unique, further doubling merely permutes already-sorted integers.

## 2. Why this matters — concrete and current
In genome assembly pipelines at companies such as Illumina and Pacific Biosciences, suffix arrays (or their Burrows–Wheeler equivalents) index terabase-scale read sets so that exact and approximate k-mer queries finish in microseconds rather than minutes.  
The same structure powers the FM-index inside the Bowtie2 and BWA-MEM aligners that process billions of short reads per day for clinical variant calling at institutions like the Broad Institute.  
Inside Google’s internal document retrieval stack, suffix-array-based LCP tables accelerate phrase and regex queries over the entire web crawl without maintaining an inverted index for every possible substring.  
In semiconductor mask-verification software from Synopsys and Mentor Graphics, suffix arrays detect repeated layout patterns across gigabytes of GDSII files in near-linear time, directly reducing mask-write cost.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Lexicographic order      | Defines the total order on suffixes                       |
| Radix sort on pairs      | Achieves linear-time stable sorting of integer ranks      |
| Inverse permutation      | Maps each suffix index to its rank for LCP computation    |
| Stable sort              | Preserves relative order of equal prefixes across phases  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Represent every suffix by its starting index
Plain English: instead of storing \(n\) strings that together occupy \(\Theta(n^2)\) space, we store only the integers \(0,1,\dots,n-1\); each integer implicitly denotes the suffix that begins at that position.  
Example: for \(S=\) “banana$”, the indices \(0,1,2,3,4,5,6\) stand for “banana$”, “anana$”, …, “$”.  
Formal statement:  
$$
\text{SA}[0..n-1]\text{ is a permutation of }\{0,1,\dots,n-1\}
$$  
such that  
$$
S[\text{SA}[i]..n-1] < S[\text{SA}[i+1]..n-1]
$$  
lexicographically.  
> [!WARNING]  
> Treating the sentinel “$” as larger than any alphabet symbol reverses the order of suffixes that differ only in length.

### Step 2 — Rank prefixes of length 1
Assign each character its rank in the sorted alphabet; equal characters receive identical ranks. This produces an array \(R_1\) of size \(n\).  
Example: “banana$” yields ranks \([1,0,2,0,2,0,3]\) after mapping \(\{a,b,n,\$\}\).  
Formal statement:  
$$
R_k[i] = \text{rank of }S[i..i+2^k-1]
$$  
> [!WARNING]  
> Using an unstable sort here destroys the correctness of later doubling steps.

### Step 3 — Double the prefix length by combining adjacent ranks
For each position \(i\), form the pair \((R_k[i], R_k[i+2^k])\). Sort these pairs with radix sort to obtain new ranks \(R_{k+1}\).  
Formal statement:  
$$
R_{k+1}[i] = \text{rank of the pair }(R_k[i],R_k[i+2^k])
$$  
> [!WARNING]  
> Forgetting to handle the case \(i+2^k\ge n\) (pad with \(-\infty\)) produces out-of-bounds accesses.

### Step 4 — Repeat until all ranks are unique
After \(O(\log n)\) doublings every suffix possesses a distinct rank; the final permutation of these ranks is exactly the suffix array.  
Formal statement: when \(\max R_{\lceil\log n\rceil}=n-1\), the mapping \(i\mapsto R[i]\) is a bijection and its inverse yields SA.  
> [!WARNING]  
> Stopping early leaves duplicate ranks; the resulting array is only partially sorted.

### Step 5 — Compute the LCP array via the inverse permutation (Kasai)
Let \(\text{rank}[i]\) be the position of suffix \(i\) inside SA. Then  
$$
\text{LCP}[\text{rank}[i]] = \max\{h\ge0 : S[i..i+h-1]=S[j..j+h-1]\}
$$  
where \(j=\text{SA}[\text{rank}[i]-1]\). The algorithm reuses the previous LCP value to advance in amortized linear time.  
> [!WARNING]  
> Computing LCP by naïve character comparisons reintroduces the quadratic cost the suffix array was meant to avoid.

## 5. Worked examples — every step shown

**Example 1 — Single-character string**  
*Given:* \(S=\) “a$”  
*Find:* SA and LCP.  
Step 1: indices \(\{0,1\}\).  
Step 2: ranks \([0,1]\) (after mapping).  
Step 3: pairs already unique.  
SA = \([1,0]\).  
LCP = \([0]\).  
**Final answer**  
**[1,0]** with LCP **[0]**  
*Reflection:* the sentinel forces the empty suffix to come first; the single LCP value is trivially zero.

**Example 2 — “banana$” (length 7)**  
*Given:* \(S=\) “banana$”  
*Find:* SA after two doublings.  
After length-1 ranks: \([1,0,2,0,2,0,3]\).  
After length-2: pairs sorted yield ranks \([1,0,3,0,2,4,5]\).  
After length-4: all ranks distinct; SA = \([6,1,3,5,0,2,4]\).  
LCP computation produces \([0,1,3,0,0,2,0]\).  
**Final answer**  
**SA = [6,1,3,5,0,2,4], LCP = [0,1,3,0,0,2,0]**  
*Reflection:* the doubling phases compress four-character comparisons into integer sorts; LCP reuses the fact that LCP of “ana$” and “a$” is already known when computing “anana$”.

**Example 3 — All identical characters “aaa$”**  
*Given:* \(S=\) “aaa$”  
After length-1: ranks \([0,0,0,1]\).  
After length-2: pairs produce ranks \([0,0,1,2]\).  
After length-4: ranks become unique. SA = \([3,2,1,0]\), LCP = \([0,1,2,0]\).  
**Final answer**  
**[3,2,1,0]** with LCP **[0,1,2,0]**  
*Reflection:* duplicate characters create long runs of equal ranks that only separate after sufficient doubling.

**Example 4 — Degenerate sentinel placement “a$a”**  
*Given:* \(S=\) “a$a”  
Correct sentinel ordering forces index 1 first. Doubling yields SA = \([1,2,0]\), LCP = \([0,0,1]\).  
**Final answer**  
**[1,2,0]** with LCP **[0,0,1]**  
*Reflection:* the sentinel must be strictly smaller than every alphabet symbol; any other convention breaks the lexicographic guarantee.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using unstable sort for ranks     | Equal pairs lose original relative order    | Always employ a stable radix or counting sort        |
| Off-by-one when doubling          | Accessing \(i+2^k\) beyond string end       | Explicitly pad with sentinel rank \(-\infty\)        |
| Forgetting the inverse array      | LCP algorithm needs rank-to-index mapping   | Allocate and populate rank[] immediately after SA    |
| Treating “$” as ordinary letter   | Lexicographic order becomes incorrect       | Map sentinel to a value smaller than any character   |
| Early termination of doubling     | Duplicate ranks remain                      | Continue until max rank equals \(n-1\)               |
| Naïve LCP computation             | Reverts to quadratic comparisons            | Implement Kasai’s reuse of previous h values         |
| 1-based vs 0-based indexing mix-up| Off-by-one errors in SA and LCP             | Decide once and keep consistent throughout code      |

## 7. The textbook-precise statement
Let \(S[0..n-1]\) be a string over alphabet \(\Sigma\) with a unique sentinel \(S[n-1]\) smaller than any symbol in \(\Sigma\). The suffix array SA is the unique permutation satisfying  
$$
S[\text{SA}[0]..n-1] < S[\text{SA}[1]..n-1] < \cdots < S[\text{SA}[n-1]..n-1].
$$  
It can be constructed in \(O(n\log n)\) time by the Manber–Myers doubling algorithm (Cormen et al., *Introduction to Algorithms*, 4e, §32.3). The LCP array is defined by  
$$
\text{LCP}[i] = \max\{k : S[\text{SA}[i].. \text{SA}[i]+k-1] = S[\text{SA}[i-1]..\text{SA}[i-1]+k-1]\}
$$  
for \(i=1..n-1\), with \(\text{LCP}[0]=0\), and is obtained in additional \(O(n)\) time by Kasai’s algorithm.

## 8. Visual — diagram or schematic
```text
S = b a n a n a $
idx 0 1 2 3 4 5 6
          |
          v  (after 3 doublings)
SA   [6,1,3,5,0,2,4]
LCP   0 1 3 0 0 2 0
```
Each arrow from SA[i] points to the starting position of the i-th smallest suffix; the numbers below SA show how many leading characters match the previous suffix.

## 9. The memory technique
1. **The hook** — picture a librarian repeatedly photocopying the first half, then the whole catalogue cards and re-sorting only the photocopies; each photocopy round doubles the information on each card until every card is unique.  
2. **What to overlearn** — doubling runs \(\lceil\log_2 n\rceil\) times; each radix phase is \(O(n)\); Kasai LCP is strictly linear.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — rebuild the algorithm by writing the first two doubling steps on paper for any 8-character string, then verify that ranks become unique exactly when the prefix length exceeds the longest repeated substring.

## 10. What this unlocks
Suffix arrays together with LCP arrays are the gateway to the Burrows–Wheeler transform, suffix trees in linear space, and the entire family of compressed full-text indexes.  
- FM-index and backward search  
- Longest repeated substring via maximum LCP entry  
- Suffix-tree algorithms (Ukkonen, Farach) via virtual tree construction from SA+LCP  
- Document retrieval and range-minimum queries on LCP for lowest-common-ancestor problems on the implicit suffix tree

## 11. Self-check — five questions, no answers
1. For the string “mississippi$”, after the length-2 doubling phase how many distinct ranks exist?  
2. Why must the sentinel be strictly smaller than every character in the alphabet?  
3. In Kasai’s algorithm, what is the amortized number of character comparisons performed across the entire LCP computation?  
4. Suppose two suffixes share a common prefix of length 5; after which doubling round are their ranks guaranteed to differ?  
5. If the radix sort in any doubling phase is replaced by an unstable sort, which suffix-array entries may become incorrect and why?