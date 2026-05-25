## What it is
A **Suffix Array** is an array of integers that gives the starting positions of all suffixes of a string in lexicographical (alphabetical) order. The **LCP (Longest Common Prefix) Array** is an auxiliary array that stores the length of the longest common prefix between each pair of adjacent suffixes in the sorted suffix array.

## Why it matters
Suffix arrays are a cornerstone of stringology, enabling near-instantaneous searches for patterns within massive strings. In bioinformatics, they are fundamental to genome alignment and analysis (e.g., finding gene sequences in DNA). In physics simulations and data analysis, they can be used for finding repeated patterns or compressing state data from complex systems.

## When to study it
You should be comfortable with strings, arrays, and sorting algorithms, especially comparison-based sorts like mergesort and the intuition behind radix sort. A firm grasp of asymptotic notation ($O(n \log n)$, $O(n^2)$, etc.) is non-negotiable. If you haven't implemented a custom sorting function (e.g., using a comparator), you should do that first.

## How to study it (step by step)
1.  **Naive Construction:** Take a simple string like `mississippi$`. Write down all its suffixes. Sort them alphabetically by hand. Write down the starting index of each sorted suffix. This is the suffix array. Analyze why this approach is slow ($O(n^2 \log n)$).
2.  **The Doubling Insight:** Read the "Key Ideas" section below. Focus on understanding how sorting suffixes by their first $2k$ characters can be done efficiently if you already know the sorted order for the first $k$ characters.
3.  **Implement the $O(n \log n)$ Algorithm:** Code the doubling algorithm. Use a struct or tuple to store the two "ranks" for each suffix during sorting. Pay close attention to index handling, especially for the second half of the pair.
4.  **LCP Array Definition:** Once you have a working suffix array constructor, understand the LCP array's definition. For your `mississippi$` example, manually compute the LCP between each adjacent pair in your sorted suffix list.
5.  **Kasai's Algorithm:** Study Kasai's algorithm for $O(n)$ LCP array construction. The key is understanding the relationship between the LCP of suffix $S[i:]$ and suffix $S[i+1:]$. Implement it; it is much shorter than the suffix array construction.
6.  **Problem Solving:** Solve a classic problem using this structure, such as "Find the longest repeated substring in a string". This will connect the theory to a concrete application.

## Key ideas, with intuition
1.  **Suffixes are just pointers:** A string of length $n$ has $n$ suffixes. Storing them explicitly would take $O(n^2)$ space. The suffix array `SA` brilliantly avoids this by storing only the starting indices. `SA[i]` is the starting index of the $i$-th lexicographically smallest suffix.

2.  **The "Sort by $2k$ using $k$" trick (The Doubling Algorithm):** This is the core of the $O(n \log n)$ construction. Instead of comparing two long suffixes $S[i:]$ and $S[j:]$ directly, we do it in stages.
    *   **Base case:** Sort all suffixes based on their first character. This is $O(n \log n)$ or $O(n)$ with counting sort.
    *   **Inductive Step:** Assume we have correctly sorted all suffixes based on their first $k$ characters. We can represent this sorted order with "ranks" (or equivalence classes). Now, to sort by the first $2k$ characters, we observe that a prefix of length $2k$ starting at index $i$, $S[i:i+2k]$, is just the concatenation of two $k$-length prefixes: $S[i:i+k]$ and $S[i+k:i+2k]$.
    *   We can therefore represent each suffix $S[i:]$ by a pair of ranks: $(\text{rank}(S[i:i+k]), \text{rank}(S[i+k:i+2k]))$. We already have these ranks from the previous step! Sorting these pairs gives us the sorted order for prefixes of length $2k$.
    *   We repeat this process, doubling $k$ each time ($1, 2, 4, 8, ...$), until $k \ge n$. Since $k$ doubles, there are only $\log n$ such stages. Each stage involves sorting $n$ pairs, which takes $O(n \log n)$. The total time is $O(n \log^2 n)$. With radix sort on the pairs, each stage is $O(n)$, for a total of $O(n \log n)$.

3.  **LCP relates adjacent suffixes in the sorted array:** The LCP array's power comes from its structure. $LCP[i]$ is the length of the common prefix between the suffixes starting at $SA[i-1]$ and $SA[i]$. A large value in the LCP array indicates that two suffixes which are very similar lexicographically start at those positions. This is a direct measure of local "similarity" in the sorted suffix list.

4.  **Kasai's Algorithm insight:** Let's say we know the LCP of suffix $S[i-1:]$ with its predecessor in the suffix array. Call this value $h$. Now consider the next suffix, $S[i:]$. This is just $S[i-1:]$ with the first character chopped off. The LCP of $S[i:]$ with *its* predecessor in the suffix array will be at least $h-1$. Why? Stripping the first character from two strings can reduce their LCP by at most 1. This allows us to compute the LCP array in a single $O(n)$ pass, as we never need to restart the character-by-character comparison from zero.

## Worked example
Let's construct the suffix array and LCP array for $S = \text{banana}\$$. ($n=7$. The `$` is a sentinel character smaller than any other character).

**Suffixes:**
0: banana$
1: anana$
2: nana$
3: ana$
4. na$
5: a$
6: $

**Step 1: $k=1$. Sort by the first character.**
- Assign ranks based on the first character: `b`->2, `a`->1, `n`->3, `$`->0.
- Pairs (rank of 1st char, rank of 2nd char):
  - S[0]: (b, a) -> (2, 1)
  - S[1]: (a, n) -> (1, 3)
  - S[2]: (n, a) -> (3, 1)
  - S[3]: (a, n) -> (1, 3)  (Note: same as S[1])
  - S[4]: (n, a) -> (3, 1)  (Note: same as S[2])
  - S[5]: (a, $) -> (1, 0)
  - S[6]: ($, \text{null}) -> (0, -1) (use -1 for out of bounds)

**Step 2: $k=2$. Sort by first 2 chars (using pairs from above).**
- Sorted pairs: (0,-1), (1,0), (1,3), (1,3), (2,1), (3,1), (3,1)
- Original indices in this sorted order: 6, 5, 1, 3, 0, 2, 4
- Assign new ranks (equivalence classes). Tie-break identical pairs.
  - S[6]: rank 0
  - S[5]: rank 1
  - S[1], S[3]: rank 2 (tie)
  - S[0]: rank 3
  - S[2], S[4]: rank 4 (tie)
- Ranks array `P`: `P[0]=3, P[1]=2, P[2]=4, P[3]=2, P[4]=4, P[5]=1, P[6]=0`

**Step 3: $k=4$. Sort by first 4 chars.**
- Create new pairs (rank of first 2 chars, rank of next 2 chars):
  - S[0]: (P[0], P[0+2]) = (P[0], P[2]) = (3, 4)
  - S[1]: (P[1], P[1+2]) = (P[1], P[3]) = (2, 2)
  - S[2]: (P[2], P[2+2]) = (P[2], P[4]) = (4, 4)
  - S[3]: (P[3], P[3+2]) = (P[3], P[5]) = (2, 1)
  - S[4]: (P[4], P[4+2]) = (P[4], P[6]) = (4, 0)
  - S[5]: (P[5], P[5+2]=P[7] OOB) = (1, -1)
  - S[6]: (P[6], P[6+2]=P[8] OOB) = (0, -1)
- Sort these pairs: (0,-1), (1,-1), (2,1), (2,2), (3,4), (4,0), (4,4)
- Original indices in this sorted order: 6, 5, 3, 1, 0, 4, 2
- This is our final Suffix Array! $SA = [6, 5, 3, 1, 0, 4, 2]$.

**Final Suffix Array and LCP Array Construction:**
Sorted Suffixes:
SA[0]=6: $
SA[1]=5: a$
SA[2]=3: ana$
SA[3]=1: anana$
SA[4]=0: banana$
SA[5]=4: na$
SA[6]=2: nana$

LCP Array computation:
LCP[0] = (not defined)
LCP[1] = lcp(S[SA[0]:], S[SA[1]:]) = lcp("$", "a$") = 0
LCP[2] = lcp(S[SA[1]:], S[SA[2]:]) = lcp("a$", "ana$") = 1 ("a")
LCP[3] = lcp(S[SA[2]:], S[SA[3]:]) = lcp("ana$", "anana$") = 3 ("ana")
LCP[4] = lcp(S[SA[3]:], S[SA[4]:]) = lcp("anana$", "banana$") = 0
LCP[5] = lcp(S[SA[4]:], S[SA[5]:]) = lcp("banana$", "na$") = 0
LCP[6] = lcp(S[SA[5]:], S[SA[6]:]) = lcp("na$", "nana$") = 2 ("na")

**Final Result:**
$SA = [6, 5, 3, 1, 0, 4, 2]$
$LCP = [?, 0, 1, 3, 0, 0, 2]$

**Reflection:** Each step refined the sorted order. The "doubling" allowed us to reuse the previous step's ranking to sort prefixes twice as long. The final LCP array captures how "close" adjacent sorted suffixes are, with the peak at `LCP[3]=3` corresponding to `ana$` and `anana$`.

## Diagrams
Here is the state during the $O(n \log n)$ construction for `banana$`. `P` is the rank array.

**Iteration 1 (k=1, sorting by 1 char):**
```text
i | Suffix    | Rank (P)
--|-----------|---------
0 | banana$   | 2 (b)
1 | anana$    | 1 (a)
2 | nana$     | 3 (n)
3 | ana$      | 1 (a)
4 | na$       | 3 (n)
5 | a$        | 1 (a)
6 | $         | 0 ($)
```
After sorting and assigning equivalence classes:
`P = [3, 2, 4, 2, 4, 1, 0]` (Ranks from worked example)

**Iteration 2 (k=2, sorting pairs of ranks):**
```text
i | Suffix    | Pair (P[i], P[i+k]) | New Rank
--|-----------|---------------------|---------
0 | banana$   | (P[0], P[2])=(3, 4) | 4
1 | anana$    | (P[1], P[3])=(2, 2) | 3
2 | nana$     | (P[2], P[4])=(4, 4) | 6
3 | ana$      | (P[3], P[5])=(2, 1) | 2
4 | na$       | (P[4], P[6])=(4, 0) | 5
5 | a$        | (P[5], P[7])=(1,-1) | 1
6 | $         | (P[6], P[8])=(0,-1) | 0
```
Sorting by these pairs gives the new sorted order.

**Final Suffix Array and LCP Array:**
```text
i | SA[i] | LCP[i] | Suffix S[SA[i]:]
--|-------|--------|-----------------
0 | 6     | -      | $
1 | 5     | 0      | a$
2 | 3     | 1      | ana$
3 | 1     | 3      | anana$
4 | 0     | 0      | banana$
5 | 4     | 0      | na$
6 | 2     | 2      | nana$
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Double, Pair, Sort, Rank".
    - **Double** the prefix length $k$ you are considering.
    - Create **Pairs** of ranks from the previous step.
    - **Sort** the suffixes based on these pairs.
    - Assign new **Ranks** (equivalence classes) for the next iteration.

2.  **Formulas to Overlearn:**
    - **Suffix Array Definition:** For a string $S$, $S[SA[i]:] < S[SA[i+1]:]$ for all valid $i$.
    - **LCP Array Definition:** $LCP[i] = \text{lcp}(S[SA[i-1]:], S[SA[i]:])$ for $i > 0$.
    - **Kasai's Lemma (Intuition):** Let $rank[i]$ be the index of suffix $S[i:]$ in the suffix array. Let $h_i = \text{lcp}(S[i:], S[SA[rank[i]-1]:])$. Then $h_i \geq h_{i-1} - 1$. This is the key to the $O(n)$ algorithm.

3.  **Spaced Repetition Schedule:**
    - Review this material in **1 day**. Re-derive the `banana$` example from scratch.
    - Review again in **3 days**. Implement the construction algorithm without looking at your code.
    - Review in **7 days**. Implement Kasai's algorithm.
    - Review in **16 days**. Solve a problem using SA+LCP.
    - Review in **35 days**. Explain the whole process to a rubber duck.

4.  **First Principles Pathway:**
    - If you forget the doubling algorithm, start from the naive $O(n^2 \log n)$ approach (generate all suffixes, sort them). The bottleneck is string comparison. Ask: "How can I speed up the comparisons?" Realize that if $S[i:i+k] == S[j:j+k]$, you only need to compare the next parts. The doubling algorithm formalizes this by reusing the sorting results from shorter prefixes.
    - If you forget Kasai's algorithm, you can always re-compute the LCP array naively. Iterate from $i=1$ to $n-1$, and for each $i$, compare $S[SA[i-1]:]$ and $S[SA[i]:]$ character by character. This is $O(n^2)$ but correct, and better than nothing.

## Common mistakes
1.  **Off-by-one errors:** Indices are a nightmare. Is the array 0-indexed or 1-indexed? Does the loop go to $n$ or $n-1$? Be especially careful with the second element of the pair, $S[i+k:]$, which can go out of bounds.
2.  **Confusing SA with Ranks:** The Suffix Array `SA` tells you *what* suffix is at position `i`. The Rank array `P` (or `rank`) tells you *where* suffix `S[i:]` is in the sorted list. They are inverses: `P[SA[i]] = i`. Don't mix them up.
3.  **Incorrect Tie-Breaking:** When two pairs $(\text{rank}_1, \text{rank}_2)$ are identical, the suffixes they represent must be given the same rank for the next iteration. Failing to do this breaks the equivalence class logic.
4.  **LCP of non-adjacent suffixes:** The LCP array is *only* for adjacent elements in the sorted suffix array. The LCP of two arbitrary suffixes, $S[SA[i]:]$ and $S[SA[j]:]$, is the *minimum* of the values in $LCP[i+1], ..., LCP[j]$.

## Self-check
1.  Construct the Suffix Array and LCP array for the string `abracadabra$`.
2.  The doubling algorithm is $O(n \log n)$. Which part of the algorithm contributes the $O(n)$ factor, and which contributes the $O(\log n)$ factor? Why is it not $O(n \log^2 n)$?
3.  Given the suffix array and LCP array for a string $S$, how would you find the number of *distinct* substrings of $S$? Explain the logic.