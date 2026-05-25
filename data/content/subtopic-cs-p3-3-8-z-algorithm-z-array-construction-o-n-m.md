## What it is
The Z-algorithm processes a string $S$ of length $n$ to produce an integer array, called the Z-array, also of length $n$. For each index $i$ from $0$ to $n-1$, the value $Z[i]$ is the length of the longest substring starting at $S[i]$ that is also a prefix of $S$. The algorithm is notable because it constructs this array in $O(n)$ time.

## Why it matters
The Z-algorithm provides a linear-time method for exact pattern matching, a fundamental problem in computer science. In bioinformatics, it's used to find gene sequences within a genome. In signal processing, which is critical for analyzing telemetry from rockets or satellites, it can detect repeating patterns in noisy data streams. Its efficiency makes it suitable for processing massive datasets where quadratic-time algorithms are non-starters.

## When to study it
You must be comfortable with basic string manipulation, array indexing, and for-loops. A solid understanding of time complexity, specifically what $O(n)$ and $O(n^2)$ mean, is non-negotiable. If you cannot write a naive, brute-force string search and analyze its complexity, review that first.

## How to study it (step by step)
1.  **Define it.** Write down the formal definition of the Z-array: $Z[i]$ is the length of the longest common prefix between the string $S$ and the suffix of $S$ starting at index $i$.
2.  **Naive approach.** Manually compute the Z-array for the string `S = aabcaabxaaaz`. Then, write the code for the naive $O(n^2)$ algorithm that implements this manual process. For each index $i$, you will have an inner loop that compares $S[j]$ with $S[i+j]$ until a mismatch.
3.  **The optimization.** The key to linear time is avoiding re-computation. The algorithm maintains a "Z-box" $[L, R]$, which is the interval corresponding to the rightmost prefix-substring found so far. Study how this box allows you to intelligently initialize the Z-value for indices inside it.
4.  **Derive the two cases.** For an index $i$, there are two possibilities: either $i$ is outside the current Z-box $[L, R]$, or it is inside. Work through the logic for each case from first principles. This is the core of the algorithm.
5.  **Implement.** Code the linear-time Z-algorithm from scratch without looking at a reference implementation. Use the two-case logic you just derived. Test it against your naively computed array from step 2.
6.  **Apply to pattern matching.** Understand how to find a pattern $P$ in a text $T$. Construct the new string $S = P + \texttt{\$} + T$, where `$` is a character not in $P$ or $T$. Compute the Z-array for $S$. Any index $i$ where $Z[i]$ equals the length of $P$ corresponds to a match.

## Key ideas, with intuition
1.  **The Z-value is a measure of "prefix-ness".** At its heart, $Z[i]$ simply asks: "How much does the string starting at position $i$ look like the very beginning of the whole string?" A high $Z[i]$ means a long match. By convention, $Z[0]$ is often set to 0 or $n$, though it's not used in the algorithm itself.

2.  **The Z-box $[L, R]$ is our memory.** The algorithm's efficiency comes from reusing information. We maintain an interval $[L, R]$ such that the substring $S[L..R]$ is a prefix of $S$ (i.e., $S[L..R] = S[0..R-L]$), and this is the one that extends furthest to the right among all such intervals we've found so far. This box tells us "I guarantee that this chunk of the string matches the prefix."

    $$
    S[L..R] = S[0..R-L]
    $$

3.  **Reusing information inside the Z-box.** This is the critical insight. Suppose we are calculating $Z[i]$ and our current index $i$ is inside the Z-box, i.e., $L \le i \le R$.
    Because $S[L..R]$ matches the prefix $S[0..R-L]$, the substring starting at $i$ inside the box corresponds to a substring starting at $k = i-L$ in the prefix.
    We already computed $Z[k]$! This gives us a powerful hint about what $Z[i]$ should be.

    $$
    \underbrace{S[0] \ S[1] \ \dots \ S[k] \ \dots \ S[R-L]}_{\text{Prefix}} \ \dots
    $$
    $$
    \dots \ \underbrace{S[L] \ S[L+1] \ \dots \ S[i] \ \dots \ S[R]}_{\text{Z-box, matches prefix}} \ \dots
    $$

4.  **The Two Cases for computing $Z[i]$:**
    *   **Case 1: $i > R$ (Outside the box).** We have no prior information. We must perform explicit character comparisons, starting from $S[i]$ against $S[0]$, $S[i+1]$ against $S[1]$, and so on. If we find a match of length $len > 0$, we update our Z-box to $[i, i+len-1]$.
    *   **Case 2: $i \le R$ (Inside the box).** Let $k = i - L$. We know $Z[k]$ from a previous step.
        *   **Subcase 2a:** If $Z[k]$ is small enough that the match it represents *does not extend beyond our Z-box* (i.e., $Z[k] < R - i + 1$), then we know for certain that $Z[i] = Z[k]$. Why? Because everything inside the box matches the prefix, and the character *after* the corresponding prefix match for $k$ (at index $Z[k]$) did not match the character at $S[k+Z[k]]$. The same mismatch must occur for $i$.
        *   **Subcase 2b:** If $Z[k]$ represents a match that *reaches or exceeds the boundary of our Z-box* (i.e., $Z[k] \ge R - i + 1$), we know $Z[i]$ is *at least* $R - i + 1$. The substring $S[i..R]$ definitely matches a prefix. But it might match even further. So, we start comparing from $S[R+1]$ against $S[R-i+1]$ and extend the match as far as we can. Then we update $[L, R]$ to this new, further-reaching Z-box.

5.  **Linear time proof.** The total work is proportional to the number of character comparisons. The naive comparisons in Case 1 and the extension comparisons in Subcase 2b always advance the right boundary $R$. Since $R$ can never decrease and its maximum value is $n-1$, the total number of these explicit comparisons across the entire algorithm is at most $n$. The assignments in Subcase 2a take constant time. Therefore, the total time complexity is $O(n)$.

## Worked example
Let's compute the Z-array for `S = aabcaabxaaaz`. Length $n=12$.
`Z` will be our Z-array. `[L, R]` is the current Z-box, initialized to `[0, 0]`.

`S: a a b c a a b x a a a z`
`i: 0 1 2 3 4 5 6 7 8 9 10 11`
`Z: [0,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?]`

- **i = 1:** `i > R` (1 > 0). Case 1. Compare `S[1...]` with `S[0...]`.
  - `S[1] == S[0]` ('a' == 'a'). Match.
  - `S[2] != S[1]` ('b' != 'a'). Mismatch.
  - Match length is 1. So, $Z[1] = 1$.
  - We found a Z-box `[1, 1]`. Update `L=1, R=1`.
`Z: [0,1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?]`

- **i = 2:** `i > R` (2 > 1). Case 1. Compare `S[2...]` with `S[0...]`.
  - `S[2] != S[0]` ('b' != 'a'). Mismatch.
  - Match length is 0. So, $Z[2] = 0$. `[L,R]` remains `[1,1]`.
`Z: [0,1, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?]`

- **i = 3:** `i > R` (3 > 1). Case 1. Compare `S[3...]` with `S[0...]`.
  - `S[3] != S[0]` ('c' != 'a'). Mismatch.
  - Match length is 0. So, $Z[3] = 0$. `[L,R]` remains `[1,1]`.
`Z: [0,1, 0, 0, ?, ?, ?, ?, ?, ?, ?, ?]`

- **i = 4:** `i > R` (4 > 1). Case 1. Compare `S[4...]` with `S[0...]`.
  - `S[4..6]` is `aab`. `S[0..2]` is `aab`. `S[7]` is `x`, `S[3]` is `c`. Mismatch.
  - Match length is 3. So, $Z[4] = 3$.
  - New Z-box is `[4, 4+3-1] = [4, 6]`. This is better than `[1,1]`. Update `L=4, R=6`.
`Z: [0,1, 0, 0, 3, ?, ?, ?, ?, ?, ?, ?]`

- **i = 5:** `i <= R` (5 <= 6). Case 2. We are inside the box `[4,6]`.
  - $k = i - L = 5 - 4 = 1$. We look at $Z[1]=1$.
  - Remaining length of box is $R - i + 1 = 6 - 5 + 1 = 2$.
  - $Z[k] < R - i + 1$ (1 < 2). Subcase 2a.
  - So, $Z[5] = Z[1] = 1$. No comparisons needed.
`Z: [0,1, 0, 0, 3, 1, ?, ?, ?, ?, ?, ?]`

- **i = 6:** `i <= R` (6 <= 6). Case 2. Inside box `[4,6]`.
  - $k = i - L = 6 - 4 = 2$. We look at $Z[2]=0$.
  - Remaining length of box is $R - i + 1 = 6 - 6 + 1 = 1$.
  - $Z[k] < R - i + 1$ (0 < 1). Subcase 2a.
  - So, $Z[6] = Z[2] = 0$.
`Z: [0,1, 0, 0, 3, 1, 0, ?, ?, ?, ?, ?]`

- **i = 7:** `i > R` (7 > 6). Case 1. Compare `S[7...]` with `S[0...]`.
  - `S[7] != S[0]` ('x' != 'a'). Mismatch.
  - $Z[7]=0$. `[L,R]` remains `[4,6]`.
`Z: [0,1, 0, 0, 3, 1, 0, 0, ?, ?, ?, ?]`

- **i = 8:** `i > R` (8 > 6). Case 1. Compare `S[8...]` with `S[0...]`.
  - `S[8..10]` is `aaa`. `S[0..2]` is `aab`.
  - Match length is 2. `S[8]=='a'`, `S[9]=='a'`, `S[10]!='b'`. $Z[8]=2$.
  - New Z-box is `[8, 8+2-1] = [8, 9]`. Update `L=8, R=9`.
`Z: [0,1, 0, 0, 3, 1, 0, 0, 2, ?, ?, ?]`

- **i = 9:** `i <= R` (9 <= 9). Case 2. Inside box `[8,9]`.
  - $k = i - L = 9 - 8 = 1$. We look at $Z[1]=1$.
  - Remaining length of box is $R - i + 1 = 9 - 9 + 1 = 1$.
  - $Z[k] \ge R - i + 1$ (1 >= 1). Subcase 2b.
  - We know $Z[9]$ is at least 1. We must check beyond the box.
  - Compare `S[R+1]` with `S[R-i+1]`. `S[10]` vs `S[1]`.
  - `S[10] == S[1]` ('a' == 'a'). Match.
  - Match length is now 2.
  - Compare `S[11]` vs `S[2]`. `S[11] != S[2]` ('z' != 'b'). Mismatch.
  - Total length is 2. So, $Z[9] = 2$.
  - New Z-box is `[9, 9+2-1] = [9, 10]`. Update `L=9, R=10`.
`Z: [0,1, 0, 0, 3, 1, 0, 0, 2, 2, ?, ?]`

- **i = 10:** `i <= R` (10 <= 10). Case 2. Inside box `[9,10]`.
  - $k = i - L = 10 - 9 = 1$. Look at $Z[1]=1$.
  - Remaining length of box is $R - i + 1 = 10 - 10 + 1 = 1$.
  - $Z[k] \ge R - i + 1$ (1 >= 1). Subcase 2b.
  - $Z[10]$ is at least 1. Check beyond box.
  - Compare `S[R+1]` (`S[11]`) with `S[R-i+1]` (`S[1]`).
  - `S[11] != S[1]` ('z' != 'a'). Mismatch.
  - Total length is 1. So, $Z[10] = 1$.
  - New Z-box is `[10, 10]`. This does not extend R, so `[L,R]` remains `[9,10]`.
`Z: [0,1, 0, 0, 3, 1, 0, 0, 2, 2, 1, ?]`

- **i = 11:** `i > R` (11 > 10). Case 1.
  - `S[11] != S[0]` ('z' != 'a'). Mismatch. $Z[11]=0$.
`Z: [0,1, 0, 0, 3, 1, 0, 0, 2, 2, 1, 0]`

Final `Z`-array: `[0, 1, 0, 0, 3, 1, 0, 0, 2, 2, 1, 0]`

**Reflection:** Each step correctly applied one of the two main cases. Case 1 (e.g., i=1, 4, 8) established new Z-boxes by brute force. Case 2 (e.g., i=5, 6, 9) exploited the existing Z-box to either get a free answer (Subcase 2a) or get a strong head start (Subcase 2b), minimizing character comparisons.

## Diagrams
Diagram 1: The Z-box `[L,R]` at `i=5` for `S = aabcaabxaaaz`.
We have just computed $Z[4]=3$, setting $L=4, R=6$. The substring `S[4..6]` ("aab") is a prefix.

```text
S: a a b c a a b x a a a z
i: 0 1 2 3 4 5 6 7 8 9 10 11
           ^-----^
           L     R
           Z-box [4,6]
           S[4..6] == S[0..2]
```

Diagram 2: Reusing information for `i=5`.
`i=5` is inside the box. We find its corresponding position in the prefix: $k = i - L = 5 - 4 = 1$. We look up $Z[1]=1$.

```text
Prefix:  S[0] S[1] S[2]
         a    a    b
              ^
              k=1, Z[1]=1 (match is "a")

String: ...S[4] S[5] S[6]...
         ...a    a    b...
                ^
                i=5, corresponds to k=1
```
Since the match for $k=1$ (length 1) is contained entirely within the part of the prefix that corresponds to our Z-box, we can copy the value: $Z[5] = Z[1] = 1$.

## Memory technique — remember this forever
1.  **Mnemonic:** The "Lazy Scanner". The Z-algorithm is a scanner moving across the string. Most of the time, it's lazy (Case 2), just peeking at work it's already done (the Z-values for the prefix). Only when it's outside its "memory box" `[L, R]` (Case 1) or hits the edge of its box (Case 2b) does it have to do "hard work" (explicit comparisons).

2.  **Must-memorize facts:**
    *   Definition: $Z[i]$ is the length of the longest common prefix of $S$ and $S[i..n-1]$.
    *   The Logic:
        If $i > R$: Naive comparison. Update $[L, R]$.
        If $i \le R$: Let $k = i - L$.
        If $Z[k] < R - i + 1$: Then $Z[i] = Z[k]$.
        If $Z[k] \ge R - i + 1$: Then $Z[i] \ge R - i + 1$. Compare from $R+1$ onwards and update $[L,R]$.

3.  **Spaced Repetition:** Review this material and re-implement the algorithm from scratch at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget the details, rebuild it.
    *   Start with the $O(n^2)$ naive algorithm. It's slow because it re-compares characters constantly.
    *   Ask: "If I know that $S[L..R]$ matches the prefix $S[0..R-L]$, what does that tell me about some index $i$ inside $[L,R]$?"
    *   This question forces you to realize that $S[i]$ corresponds to $S[i-L]$ in the prefix. The properties of the string at $i$ must be related to the properties at $i-L$. This leads you directly to the two sub-cases of Case 2.

## Common mistakes
1.  **Off-by-one errors in the Z-box:** Forgetting that a match of length `len` starting at `i` ends at index `i + len - 1`. This messes up the calculation of $R$ and the check `i <= R`.
2.  **Incorrectly handling Subcase 2b:** When $Z[k]$ is large, a common error is to just set $Z[i] = Z[k]$. You MUST cap the initial "free" match at the Z-box boundary ($R - i + 1$) and then explicitly extend the match from there.
3.  **Pattern matching concatenation:** When using Z-algorithm for finding pattern $P$ in text $T$, constructing the string as $T + \texttt{\$} + P$ instead of $P + \texttt{\$} + T$. The pattern must be the prefix for the Z-values to be meaningful.
4.  **Mutating L and R too eagerly:** When computing $Z[i]$ for $i \le R$, the values of $L$ and $R$ must not change until after $Z[i]$ is fully determined.

## Self-check
1.  Compute the Z-array for the string `S = aaaaa`.
2.  Compute the Z-array for the string `S = abacaba`. Trace the state of $[L, R]$ at each step.
3.  Explain, in your own words, why the total number of explicit character comparisons (the "hard work") is bounded by $O(n)$, making the entire algorithm linear time. What role does the right boundary $R$ play in this guarantee?