## What it is
The Knuth-Morris-Pratt (KMP) algorithm is a linear-time string searching algorithm. It finds all occurrences of a pattern $P$ of length $m$ within a text $T$ of length $n$. Its key innovation is a preprocessing step on the pattern $P$ that computes a "failure function," allowing the algorithm to avoid redundant comparisons after a mismatch.

## Why it matters
KMP's linear time complexity, $O(n+m)$, is critical in performance-sensitive applications. In bioinformatics, it's used for rapid DNA sequence matching. In network security, intrusion detection systems use it to scan packet data for signatures of known malware at line speed. In physics and aerospace, it can be adapted to find specific recurring patterns in vast streams of telemetry data or signal processing outputs, identifying events or system states without performance degradation.

## When to study it
You should be comfortable with basic string manipulation, arrays, and loops. Crucially, you must understand time complexity analysis (Big O notation) and be able to analyze a naive, nested-loop string search to see why its worst-case is $O(n \times m)$. Without that baseline, the efficiency gain of KMP is not apparent.

## How to study it (step by step)
1.  **Analyze the Naive Approach:** Write down the simple double-loop algorithm for string searching. Identify its worst-case input (e.g., Text: `AAAA...AB`, Pattern: `AA...AB`). Convince yourself this takes $O(n \times m)$ comparisons.
2.  **Trace a Mismatch:** Take a simple case like `T = "ABCABDA"` and `P = "ABCABD"`. When the naive search mismatches at the final 'A' vs 'D', it shifts the pattern by one and starts over. Observe that you already *know* the characters `BCABD` are in the text; re-checking them is wasted effort. This is the problem KMP solves.
3.  **Derive the Failure Function:** This is the core task. Work through the logic of the Longest Proper Prefix that is also a Suffix (LPS). For a pattern `P = "ababa"`, manually compute `lps[i]` for $i=0, 1, ..., 4$. Ask yourself: "For the substring `P[0...i]`, what is the longest prefix that isn't the whole string, which also matches its suffix?"
4.  **Implement the LPS Array computation:** Code the function that takes a pattern `P` and returns its LPS array. Use two pointers. This is the hardest part; debug it carefully.
5.  **Implement the KMP Search:** Write the main search loop that uses the pre-computed LPS array. Notice how the text pointer `i` never moves backward. When a mismatch occurs at `P[j]`, the pattern pointer `j` is updated to `lps[j-1]`, effectively sliding the pattern forward intelligently.
6.  **Prove the Complexity:** Analyze the number of operations. The LPS computation is $O(m)$. For the search, the text pointer `i` advances at most $n$ times. The pattern pointer `j` also advances at most $n$ times. Although `j` can decrease, the total number of decreases (`j = lps[j-1]`) cannot exceed the total number of increases. This amortized analysis proves the search is $O(n)$, for a total of $O(n+m)$.

## Key ideas, with intuition
1.  **The Waste of Naive Search:** The naive algorithm learns nothing from a partial match. If `P` matches `T` for $k$ characters and then fails, the naive approach shifts `P` by one and re-scans. KMP knows that the $k-1$ characters of `T` it just scanned are identical to the first $k-1$ characters of `P`. This is information to be exploited, not discarded.

2.  **The "Shift" is Pre-calculated:** KMP's central idea is to pre-calculate the best possible "shift" for the pattern after a mismatch. If we mismatch at `P[j]`, we don't want to shift by just one. We want to shift `P` so that its longest possible prefix aligns with a suffix of the part of the text we *just successfully matched*.

3.  **The LPS Array (Failure Function):** This pre-calculation is stored in an array, often called `lps` (Longest Proper Prefix which is also a Suffix) or $\pi$. For each index $j$ in the pattern $P$, `lps[j]` stores the length of the longest *proper* prefix of $P[0...j]$ that is also a suffix of $P[0...j]$.
    *   A "proper prefix" of a string $S$ is any prefix that is not equal to $S$ itself.
    *   **Intuition:** If we match $P[0...j-1]$ against the text and fail at $P[j]$, we know the preceding text matches $P[0...j-1]$. The value `lps[j-1]` tells us the length of the longest prefix of $P$ that we can slide into place, because it already matches the end of the part we just saw in the text.
    $$ \text{lps}[j] = \max \{ k \mid k < j+1, P[0...k-1] = P[j-k+1...j] \} $$

4.  **The Text Pointer Never Retreats:** The search uses two pointers, `i` for the text `T` and `j` for the pattern `P`. `i` is only ever incremented. When a mismatch occurs, we don't reset `i`. Instead, we consult the `lps` array and update `j` to `lps[j-1]`. This effectively slides the pattern forward while `i` stays put, ready to compare against the new character of the shifted pattern. This is the key to linear time.

## Worked example
Let's find `P = "ABABC"` in `T = "ABABDABABC"`.

**Step 1: Compute the LPS array for Pattern `P = "ABABC"`**

*   `P[0] = 'A'`: `lps[0] = 0`. (Base case)
*   `P[0...1] = "AB"`: Prefixes: `A`. Suffixes: `B`. No commonality. `lps[1] = 0`.
*   `P[0...2] = "ABA"`: Prefixes: `A`, `AB`. Suffixes: `A`, `BA`. Longest common is `A`. Length is 1. `lps[2] = 1`.
*   `P[0...3] = "ABAB"`: Prefixes: `A`, `AB`, `ABA`. Suffixes: `B`, `AB`, `BAB`. Longest common is `AB`. Length is 2. `lps[3] = 2`.
*   `P[0...4] = "ABABC"`: Prefixes: `A`, `AB`, `ABA`, `ABAB`. Suffixes: `C`, `BC`, `ABC`, `BABC`. No commonality. `lps[4] = 0`.

Final LPS Array: `[0, 0, 1, 2, 0]`

**Step 2: Search `T` using `P` and the LPS array**

Let `i` be the pointer for `T` and `j` for `P`.

1.  `i=0, j=0`: `T[0]=='A'`, `P[0]=='A'`. Match. `i++`, `j++`.
2.  `i=1, j=1`: `T[1]=='B'`, `P[1]=='B'`. Match. `i++`, `j++`.
3.  `i=2, j=2`: `T[2]=='A'`, `P[2]=='A'`. Match. `i++`, `j++`.
4.  `i=3, j=3`: `T[3]=='B'`, `P[3]=='B'`. Match. `i++`, `j++`.
5.  `i=4, j=4`: `T[4]=='D'`, `P[4]=='C'`. Mismatch!
    *   We matched `j=4` characters (`ABAB`). We look at `lps[j-1] = lps[3] = 2`.
    *   This tells us to "fall back" to `j = 2`. We don't change `i`.
    *   **Intuition:** The prefix `P[0...1]="AB"` of length 2 matches the suffix of the part we just matched (`ABAB`). We slide the pattern to align these.

6.  `i=4, j=2`: `T[4]=='D'`, `P[2]=='A'`. Mismatch!
    *   We look at `lps[j-1] = lps[1] = 0`.
    *   We fall back to `j = 0`.

7.  `i=4, j=0`: `T[4]=='D'`, `P[0]=='A'`. Mismatch!
    *   Since `j` is already 0, we can't fall back further. We just increment `i`.

8.  `i=5, j=0`: `T[5]=='A'`, `P[0]=='A'`. Match. `i++`, `j++`.
9.  `i=6, j=1`: `T[6]=='B'`, `P[1]=='B'`. Match. `i++`, `j++`.
10. `i=7, j=2`: `T[7]=='A'`, `P[2]=='A'`. Match. `i++`, `j++`.
11. `i=8, j=3`: `T[8]=='B'`, `P[3]=='B'`. Match. `i++`, `j++`.
12. `i=9, j=4`: `T[9]=='C'`, `P[4]=='C'`. Match. `i++`, `j++`.
13. Now `j=5`, which is the length of `P`. We found a match at index `i - j = 10 - 5 = 5`.
    *   To find subsequent matches, we update `j = lps[j-1] = lps[4] = 0` and continue the search.

Each step worked because the LPS array provided the exact length of the prefix we could reuse, preventing re-comparison of text characters and ensuring the text pointer `i` only ever moved forward.

## Diagrams
Here is a diagram of the key "slide" move on mismatch from Step 5 of the worked example.

We have matched "ABAB" and now have a mismatch at `T[4]` vs `P[4]`.

```text
T:  A B A B D A B A B C
       ^
       i=4
P:  A B A B C
       ^
       j=4
Mismatch: T[i] != P[j]
```

The last matched character was at `j-1 = 3`. We consult `lps[3] = 2`. This means a prefix of `P` of length 2 (`AB`) is the same as a suffix of the matched part `P[0...3]` (`ABAB`). So we can slide `P` forward to align them, without moving `i`.

```text
T:  A B A B D A B A B C
       ^
       i=4
P:      A B A B C
           ^
           j=2 (new j is lps[j-1])
Now we compare T[4] and P[2].
```

This slide is the heart of KMP. We skipped checking `P[0]` against `T[2]` and `P[1]` against `T[3]` because the LPS array guaranteed they would match.

## Memory technique — remember this forever
1.  **Mnemonic/Story:** **K**now **M**y **P**refixes. The algorithm is a master of knowing its own prefixes. Imagine the pattern `P` is a train. When the front of the train (`P[j]`) hits an obstacle in the tunnel (`T[i]`), you don't back the whole train out. You ask your "LPS Conductor" for the length of the longest *coupling sequence* (prefix) that also exists at the *end* of your matched section. You then instantly shunt the train forward so the front coupling sequence is now where the rear one was, and try again. The text pointer `i` is a fixed point in the tunnel; it never goes backward.

2.  **Must-know formulas/logic:**
    *   LPS Definition: `lps[i]` = length of the longest proper prefix of `P[0...i]` that is also a suffix of `P[0...i]`.
    *   Search Mismatch Logic: `if (T[i] != P[j]) { if (j != 0) j = lps[j-1]; else i++; }`

3.  **Spaced Repetition Schedule:** Review this material and re-implement from scratch at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget the implementation details, rebuild from the core idea.
    *   **Problem:** Naive search is slow because it re-scans known text.
    *   **Goal:** After a mismatch at `P[j]`, we have matched `P[0...j-1]`. We want to shift `P` as far as possible.
    *   **Insight:** The new starting position of `P` must align a prefix of `P` with a suffix of the text we just matched (`P[0...j-1]`).
    *   **Conclusion:** We need to find the longest prefix of `P` that is a suffix of `P[0...j-1]`. This is precisely the definition of `lps[j-1]`. This logic allows you to re-derive the entire algorithm.

## Common mistakes
1.  **Off-by-one errors:** The most common mistake is using `lps[j]` instead of `lps[j-1]` after a mismatch. The lookup is based on the length of the string that *successfully matched before the mismatch*, which is `j`. The last character of that string is at index `j-1`.
2.  **Incorrect LPS for single characters:** For a pattern like `AAAA`, the LPS array is `[0, 1, 2, 3]`. Students often incorrectly put `0` for all of them, forgetting that `A` is a prefix and suffix of `AA`, `AA` is a prefix and suffix of `AAA`, etc.
3.  **Handling `j=0` Mismatch:** When a mismatch occurs and `j` is already `0`, it means the very first character of the pattern doesn't match the current text character. The only option is to move on in the text. The correct action is to increment `i`. Failing to handle this case leads to an infinite loop.
4.  **Amortized Analysis Misunderstanding:** Seeing `j = lps[j-1]` inside a loop makes it look like the complexity could be worse than linear. The key is that `j` is incremented only when `i` is incremented. Since `i` is incremented at most $n$ times, `j` is incremented at most $n$ times. Since `j` can't be decremented more than it's been incremented, the total number of decrements is also bounded by $n$.

## Self-check
1.  Compute the LPS array for the pattern `P = "aabaaab"`.
2.  Trace the full KMP algorithm for `T = "ababcabcabababd"` and `P = "abcabd"`. Count the total number of character comparisons. How many would the naive algorithm perform in this specific case?
3.  A key property of the LPS array is that `lps[i] < i+1` for all `i`. Explain from first principles why this must be true and how this property guarantees that the KMP algorithm always terminates.