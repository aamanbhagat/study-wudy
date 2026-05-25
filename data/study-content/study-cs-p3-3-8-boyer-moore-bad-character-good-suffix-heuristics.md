## 1. What it is — in plain English

Imagine you have a huge book and you're trying to find every instance of a specific, short phrase, like "the cat sat." The simplest way to do this would be to start at the very beginning of the book, check if the first letter matches, then the second, and so on. If you find "the cat sat," great! If not, you shift your search phrase one letter to the right and try again from the start of the phrase. This is called "naive" string searching. It works, but it's slow.

The Boyer-Moore algorithm is a super-smart way to find phrases in text much, much faster. Instead of checking letters from left to right, it starts checking from the *rightmost* letter of your search phrase. This might seem odd, but it's the key to its speed.

Here's the magic: if the rightmost letter of your phrase doesn't match the corresponding letter in the text, Boyer-Moore doesn't just shift one position. It uses that *mismatch* to figure out how far it can safely jump forward without missing any potential matches. It's like a smart reader who, upon seeing a wrong letter at the end of a word, instantly knows that this whole word can't be "the cat sat" and skips several pages ahead.

Boyer-Moore uses two main "tricks" or "heuristics" to decide how far to jump: the "bad character" rule (what to do when a letter *doesn't* match) and the "good suffix" rule (what to do when a part of the phrase *does* match, but then the next letter doesn't). It calculates a jump distance using both tricks and always picks the larger jump to be as efficient as possible.

## 2. Why it matters — real-world applications

The Boyer-Moore algorithm is one of the most efficient and widely used string searching algorithms in practice. Its ability to "jump" significantly through text makes it ideal for scenarios where speed is critical.

1.  **Text Editors and Word Processors (e.g., Microsoft Word, VS Code, grep):** When you use the "Find" (Ctrl+F or Cmd+F) function to search for a word or phrase in a large document, a highly optimized algorithm like Boyer-Moore is often running behind the scenes. It allows for near-instantaneous search results, even in multi-megabyte files, by quickly skipping over irrelevant sections of text.

2.  **Anti-virus and Intrusion Detection Systems (e.g., Norton Antivirus, Snort):** These systems constantly scan files, network packets, or memory for known "signatures" – specific patterns of bytes that indicate malware, viruses, or malicious network activity. Boyer-Moore's speed is crucial here because it allows these systems to scan vast amounts of data in real-time without significantly impacting system performance, identifying threats by quickly matching their unique patterns.

3.  **Bioinformatics (e.g., DNA Sequence Analysis):** In genomics, scientists frequently search for specific gene sequences, protein patterns, or regulatory elements within massive DNA or RNA strings. Boyer-Moore can be adapted to efficiently locate these biological "patterns" in long genomic sequences, which are essentially very long strings of 'A', 'T', 'C', 'G' characters. This is vital for tasks like gene mapping, identifying mutations, and understanding evolutionary relationships.

4.  **Compilers and Interpreters (e.g., GCC, Python Interpreter):** When a compiler processes source code, it needs to identify keywords (like `if`, `while`, `class`), variable names, and other syntactic elements. Efficient string matching helps the lexical analysis phase (tokenization) to quickly break down the raw code into meaningful units, contributing to faster compilation times.

## 3. Prerequisites — what you must know first

Before diving into Boyer-Moore, ensure you have a solid grasp of these fundamental concepts:

*   **Basic String Matching (Naive/Brute-Force Algorithm):** Understand how the simplest string search works, comparing character by character, shifting one position at a time. This provides context for why Boyer-Moore is an improvement.
*   **Arrays and Indexing:** How strings are represented as sequences of characters, and how to access individual characters using zero-based (or one-based) indices.
*   **Time Complexity (Big O Notation):** The ability to analyze and describe the efficiency of algorithms, particularly $O(N)$, $O(M)$, $O(NM)$, and $O(N+M)$ complexities. This is essential for understanding Boyer-Moore's performance benefits.
*   **Algorithms:** The general concept of a step-by-step procedure to solve a problem, including the idea of pre-processing.
*   **Hash Tables / Associative Arrays:** While not strictly mandatory for the *concept*, understanding how hash tables work is beneficial as they are often used to implement the "bad character" shift table efficiently.

## 4. The core idea — step by step

The Boyer-Moore algorithm's power comes from two key insights: comparing the pattern from right-to-left, and using information from mismatches (bad character) or matches (good suffix) to make large shifts.

Let $T$ be the text (length $n$) and $P$ be the pattern (length $m$).

### Step 1: Right-to-Left Comparison

*   **Plain English:** Instead of starting to compare $P$ with $T$ from their leftmost characters, Boyer-Moore starts comparing from their rightmost characters. If $P$ is "APPLE" and $T$ is "GRAPES", it would first compare 'E' (from "APPLE") with 'S' (from "GRAPES").

*   **Small Concrete Example:**
    Text: `ABRACADABRA`
    Pattern: `RADAR`
    Current alignment (hypothetical, $i$ is text index where pattern starts):
    `A B R A C A D A B R A`
             `R A D A R`
    The algorithm would first compare `T[i+m-1]` (the rightmost character of the aligned pattern in text) with `P[m-1]` (the rightmost character of the pattern). In this case, `T[i+4]` ('A') vs `P[4]` ('R').

*   **Formal/Mathematical Version:**
    Let $i$ be the starting index of the pattern in the text. The comparison begins at index $j = m-1$ (the rightmost character of the pattern) and proceeds downwards to $j=0$.
    The algorithm checks if $P[j] = T[i+j]$. If they match, it decrements $j$ and continues. If they mismatch, or if $j$ reaches $-1$ (meaning all characters matched), the comparison for the current alignment stops.

*   **What Could Go Wrong:** This approach might initially feel counter-intuitive. Many other string algorithms (like naive or KMP) compare left-to-right. Students might mistakenly try to apply left-to-right logic. Remember, the right-to-left scan is what enables the large jumps.

### Step 2: The Bad Character Heuristic

*   **Plain English:** If a character in the text `T` doesn't match the corresponding character in the pattern `P` during the right-to-left scan, we call that a "bad character." This bad character tells us how far we can shift the pattern to the right. We pre-calculate a table that stores, for every possible character, its rightmost occurrence in the *pattern*. If the bad character from the text doesn't appear in the pattern at all, we can shift the pattern past that character entirely. If it does appear, we shift the pattern so that the rightmost occurrence of that bad character in the pattern aligns with the bad character in the text.

*   **Small Concrete Example:**
    Text: `ABCDEFG`
    Pattern: `XBC` ($m=3$)
    Current alignment:
    `A B C D E F G`
    `X B C` (Pattern aligned at `i=0`)
    Compare `T[2]` ('C') with `P[2]` ('C'). Match.
    Compare `T[1]` ('B') with `P[1]` ('B'). Match.
    Compare `T[0]` ('A') with `P[0]` ('X'). Mismatch! 'A' is the bad character in text `T`.
    Now, we look at the pattern `XBC`. Where is 'A' in `XBC`? It's not there.
    So, we can shift the pattern past 'A' in the text. The mismatch occurred at `P[0]`. The character `T[0]` ('A') is not in `P`. So, we shift the pattern by `m` (length of pattern), or `m - (index of bad char in pattern) - 1` if we want to be more precise, but essentially, we shift it past the current `T[0]`.
    More generally, if `T[i+j]` is the bad character `c`, and its rightmost occurrence in $P$ is at index `L[c]`, we shift the pattern by `j - L[c]`. If `c` is not in `P`, we treat `L[c]` as -1, leading to a shift of `j - (-1) = j+1`.
    In our example, `j=0`. 'A' is not in `P`. Shift by `0 - (-1) = 1`.
    New alignment:
    `A B C D E F G`
      `X B C` (Pattern aligned at `i=1`)

    Let's take another example:
    Text: `ABRACADABRA`
    Pattern: `DABRA` ($m=5$)
    Current alignment:
    `A B R A C A D A B R A`
             `D A B R A`
    Compare `T[i+4]` ('A') with `P[4]` ('A'). Match.
    Compare `T[i+3]` ('B') with `P[3]` ('R'). Mismatch! 'B' is the bad character in `T`.
    The mismatch happened at `P[3]`. The bad character `T[i+3]` is 'B'.
    Now, we look at the pattern `DABRA`. The rightmost 'B' in `DABRA` is at index `1`.
    So, we want to align `P[1]` ('B') with `T[i+3]` ('B').
    The current mismatch was at `P[j]` where $j=3$. The bad character `T[i+j]` is 'B'.
    The last occurrence of 'B' in $P$ is at $L['B'] = 1$.
    Shift amount = `j - L[T[i+j]]` = `3 - 1 = 2`.
    We shift the pattern 2 positions to the right.

    Original alignment:
    `A B R A C A D A B R A`
             `D A B R A` (`i` points to `D`)
    Shift by 2:
    `A B R A C A D A B R A`
                 `D A B R A` (`i` now points to `B`)

*   **Formal/Mathematical Version:**
    Let $L[c]$ be an array (or hash map) storing the index of the rightmost occurrence of character $c$ in the pattern $P$. If $c$ does not appear in $P$, $L[c]$ is typically set to $-1$.
    When a mismatch occurs at $P[j]$ (meaning $P[j] \neq T[i+j]$), the shift amount for the Bad Character heuristic is:
    $$ \text{shift}_{BC} = \max(1, j - L[T[i+j]]) $$
    The $\max(1, \dots)$ ensures we always shift at least one position, preventing infinite loops if $L[T[i+j]]$ is greater than or equal to $j$.

*   **What Could Go Wrong:**
    *   Forgetting to pre-process the $L[c]$ table for the pattern.
    *   Incorrectly handling characters in $T$ that are *not* present in $P$ (they should lead to larger shifts).
    *   Off-by-one errors in calculating the shift amount.

### Step 3: The Good Suffix Heuristic

*   **Plain English:** If a part of the pattern, say $P[j+1 \dots m-1]$ (a "suffix"), *did* match with the text, but then the character to its left, $P[j]$, *mismatched* with $T[i+j]$, we can use this "good suffix" to determine a safe shift. There are two main cases:
    1.  **Case 1 (Matched Suffix Re-occurs):** Find another occurrence of this entire "good suffix" within the *pattern itself*, but shifted to the left, such that the character immediately preceding this new occurrence is *different* from the character $P[j]$ that caused the original mismatch. We shift the pattern to align this new occurrence.
    2.  **Case 2 (Matched Suffix has a Prefix):** If Case 1 doesn't apply, find the longest *prefix* of the pattern that is also a *suffix* of the matched "good suffix." We then shift the pattern so this prefix aligns with that suffix. This ensures we don't miss a match where the pattern starts with a part of the matched suffix.

*   **Small Concrete Example:**
    Text: `ABRACADABRA`
    Pattern: `ABRA` ($m=4$)
    Current alignment:
    `A B R A C A D A B R A`
    `A B R A` (Pattern aligned at `i=0`)
    Compare `T[3]` ('A') with `P[3]` ('A'). Match. Suffix `A` matched.
    Compare `T[2]` ('R') with `P[2]` ('R'). Match. Suffix `RA` matched.
    Compare `T[1]` ('B') with `P[1]` ('B'). Match. Suffix `BRA` matched.
    Compare `T[0]` ('A') with `P[0]` ('A'). Match. Full match! (This example shows a full match, not a mismatch for GS).

    Let's use an example for a *mismatch* with a good suffix:
    Text: `ABCABABA`
    Pattern: `ABAB` ($m=4$)
    Current alignment:
    `A B C A B A B A`
          `A B A B` (Pattern aligned at `i=2`)
    Compare `T[5]` ('B') with `P[3]` ('B'). Match. (Good suffix: `B`)
    Compare `T[4]` ('A') with `P[2]` ('A'). Match. (Good suffix: `AB`)
    Compare `T[3]` ('C') with `P[1]` ('B'). Mismatch! 'C' is the bad character in `T`.
    The good suffix matched is `AB` (length 2). The mismatch was at `P[1]`.
    Now, we apply the good suffix rule for `AB`:
    1.  Does `AB` occur elsewhere in `ABAB` such that it's preceded by a character *different* from `P[1]` ('B')?
        *   `ABAB`: `AB` occurs at `P[0...1]`. It's not preceded by anything (it's at the start).
        *   No other occurrence of `AB` preceded by a different character.
    2.  Is there a prefix of `ABAB` that is a suffix of `AB`?
        *   Prefixes: `A`, `AB`, `ABA`, `ABAB`
        *   Suffixes of `AB`: `B`, `AB`
        *   The longest prefix that's also a suffix of `AB` is `AB` itself (length 2).
        *   So, we shift the pattern such that the prefix `AB` (from `P[0...1]`) aligns with the matched suffix `AB` (from `P[2...3]`).
        This means shifting by `m - length_of_prefix` = `4 - 2 = 2`.

    Original alignment:
    `A B C A B A B A`
          `A B A B` (`i` points to `A` at `T[2]`)
    Shift by 2:
    `A B C A B A B A`
            `A B A B` (`i` points to `A` at `T[4]`)

*   **Formal/Mathematical Version:**
    This heuristic is more complex to formalize and involves precomputing two arrays:
    1.  `suffix_borders[j]`: For $j \in [0, m-1]$, `suffix_borders[j]` is the length of the longest suffix of $P[0 \dots j]$ that is also a prefix of $P$. (This is essentially the KMP's LPS array for $P$).
    2.  `gs_shift[k]`: For $k \in [0, m-1]$, `gs_shift[k]` stores the minimum shift amount if a suffix of length $k$ has matched.
        *   **Case 1 (Strong Good Suffix):** If the matched suffix $P[j+1 \dots m-1]$ (length $k = m-1-j$) occurs elsewhere in $P$ at $P[x \dots x+k-1]$ such that $P[x-1] \neq P[j]$ (or $x=0$), then the shift is $j-x$. We want the smallest such $x$.
        *   **Case 2 (Weak Good Suffix):** If no such occurrence exists, find the largest $k' < k$ such that $P[0 \dots k'-1]$ is a suffix of $P[j+1 \dots m-1]$. The shift is $m-k'$.
    The actual precomputation of `gs_shift` is non-trivial and often involves constructing helper arrays derived from KMP-like logic on the reversed pattern. When a mismatch occurs at $P[j]$, and $P[j+1 \dots m-1]$ is the matched suffix (length $k = m-1-j$), the shift amount for the Good Suffix heuristic is `gs_shift[k]`.

*   **What Could Go Wrong:**
    *   This is the most complex part of Boyer-Moore. Misunderstanding the two cases for good suffix shifts is common.
    *   Errors in precomputing the `gs_shift` table will lead to incorrect shifts.
    *   The precomputation itself is often a source of confusion.

### Step 4: Combining Heuristics

*   **Plain English:** After a mismatch, we calculate two possible shift amounts: one using the "bad character" rule (`shift_BC`) and one using the "good suffix" rule (`shift_GS`). To be sure we don't miss any potential matches, we always take the *maximum* of these two shift amounts. This ensures we make the largest possible safe jump.

*   **Small Concrete Example:**
    Text: `ABRACADABRA`
    Pattern: `DABRA` ($m=5$)
    Current alignment:
    `A B R A C A D A B R A`
             `D A B R A` (`i` points to `C`)
    Mismatch `T[i+3]` ('A') vs `P[3]` ('R'). Bad character in text is 'A'.
    *   **Bad Character Shift:** Mismatch at $j=3$. Bad character is `T[i+3]` ('A').
        `L['A']` in `DABRA` is at index `4`.
        `shift_BC = \max(1, 3 - L['A']) = \max(1, 3 - 4) = \max(1, -1) = 1`.
    *   **Good Suffix Shift:** Matched suffix is `A` (length 1). Mismatch at $P[3]$.
        Let's assume `gs_shift[1]` (shift for matched suffix of length 1) is `3` (this would be precomputed).
        `shift_GS = 3`.
    *   **Combined Shift:** $\max(shift_{BC}, shift_{GS}) = \max(1, 3) = 3$.
    So, we shift the pattern 3 positions to the right.

*   **Formal/Mathematical Version:**
    After a mismatch at $P[j]$ (where $P[j] \neq T[i+j]$), compute:
    1.  $\text{shift}_{BC} = \max(1, j - L[T[i+j]])$
    2.  $\text{shift}_{GS} = \text{gs\_shift}[m-1-j]$ (where $m-1-j$ is the length of the matched suffix)
    The total shift for the pattern is:
    $$ \text{shift} = \max(\text{shift}_{BC}, \text{shift}_{GS}) $$

*   **What Could Go Wrong:**
    *   Incorrectly calculating either `shift_BC` or `shift_GS`.
    *   Forgetting to take the maximum, which could lead to missing matches if the smaller shift is chosen.

### Step 5: Preprocessing

*   **Plain English:** Before the actual search begins, we spend some time building the helper tables needed for the bad character and good suffix rules. This "pre-work" makes the search phase much faster. For the bad character rule, we build a table of last occurrences for each character in the pattern. For the good suffix rule, we build a more complex table that tells us how far to shift based on the length of the matched suffix.

*   **Formal/Mathematical Version:**
    The preprocessing phase involves two main computations:
    1.  **Bad Character Table ($L[c]$):** For each character $c$ in the alphabet $\Sigma$, compute its rightmost index in $P$. If $c$ is not in $P$, set $L[c] = -1$. This takes $O(m + |\Sigma|)$ time.
    2.  **Good Suffix Table ($\text{gs\_shift}[k]$):** This is more involved. It typically requires computing an array similar to the KMP's LPS array (often called `border` or `suffix_borders`) but applied in a specific way to the pattern's suffixes. This takes $O(m)$ time.
    The total preprocessing time is $O(m + |\Sigma|)$.

*   **What Could Go Wrong:**
    *   Skipping preprocessing entirely, which would make the algorithm non-functional or extremely slow.
    *   Errors in the precomputation logic, especially for the good suffix rule, which are subtle and hard to debug.

## 5. Worked examples — multiple, with every step shown

Let's walk through several examples. For simplicity, we'll assume an alphabet of uppercase English letters.

### Example 1: Basic Search

**Problem:** Search for pattern $P = \text{"ANANA"}$ in text $T = \text{"BANANAS"}$.

**Given:**
Text $T = \text{"BANANAS"}$ ($n=7$)
Pattern $P = \text{"ANANA"}$ ($m=5$)

**Preprocessing:**

1.  **Bad Character Table ($L[c]$ for $P=\text{"ANANA"}$):**
    *   `A`: rightmost at index 4
    *   `N`: rightmost at index 3
    *   Other characters (B, S, etc.): -1
    $$ L = \{ \text{'A'}: 4, \text{'N'}: 3, \text{other}: -1 \} $$

2.  **Good Suffix Shift Table ($\text{gs\_shift}[k]$ for $P=\text{"ANANA"}$):**
    This table is complex to derive step-by-step for each example. For this lesson, we will provide the precomputed values. The derivation will be detailed in Section 7.
    A common way to define `gs_shift[k]` is the shift when a suffix of length `k` matches.
    *   $k=0$ (no suffix matched): Shift by $m = 5$.
    *   $k=1$ ('A'): `P` is `ANANA`. Longest prefix that is a suffix of `A` is `A` (length 1). `A` occurs at `P[0]`. Shift $m-1 = 4$.
        Another 'A' is at `P[2]`. Preceded by 'N'. Mismatch char 'N'.
        The rule is: if matched suffix $S$ (length $k$) occurs at $P[x \dots x+k-1]$ and $P[x-1] \neq P[j]$ (where $P[j]$ is the mismatch char).
        For `ANANA`, suffix 'A' (length 1) at $P[4]$.
        It also occurs at $P[2]$ ('N' precedes it) and $P[0]$ (no char precedes it).
        If mismatch is at $P[3]$ (so suffix 'A' matches), we shift to align $P[2]$ with $T[i+3]$ (shift 1). Or $P[0]$ with $T[i+3]$ (shift 3).
        The `gs_shift` table is often defined as the minimum shift amount ensuring alignment.
    Let's use a simplified `gs_shift` table for this example, reflecting the shifts needed:
    $$ \text{gs\_shift} = \{ 0: 5, 1: 3, 2: 4, 3: 1, 4: 5 \} $$
    *   `gs_shift[0] = 5`: No character matched (shift by full pattern length)
    *   `gs_shift[1] = 3`: Matched suffix "A" (from `P[4]`). Next occurrence of "A" in `P` (preceded by different char or start of pattern) is `P[0]`. Shift `m - 1` (length of matched suffix) = `5 - 1 = 4`. This is not right.
    *   Let's use a standard `gs_shift` table derivation (Cormen et al. or similar):
        `gs_shift[k]` = shift for a good suffix of length `k`.
        For `P = "ANANA"`:
        `gs_shift[0] = 5` (default: shift by pattern length)
        `gs_shift[1]` (suffix "A"):
            `P[4]` is "A".
            `P[2]` is "A". `P[1]` is "N", `P[3]` is "N". If mismatch at `P[3]`, matched "A". We can align `P[2]` with `T[i+3]`. Shift is `(m-1) - (2) = 2`.
            `P[0]` is "A".
            The strongest shift for suffix "A" is to align `P[2]` with the matched `T[i+4]`. Shift is $4-2=2$.
        `gs_shift[2]` (suffix "NA"):
            `P[3..4]` is "NA". No other "NA" in pattern.
            Longest prefix of `P` that is a suffix of "NA" is "A" (length 1). Shift $m-1=4$.
        `gs_shift[3]` (suffix "ANA"):
            `P[2..4]` is "ANA". `P[0..2]` is "ANA".
            If mismatch at `P[1]`, matched "ANA". Shift to align `P[0]` with `T[i+1]`. Shift is $1-0=1$.
        `gs_shift[4]` (suffix "NANA"):
            `P[1..4]` is "NANA". No other "NANA" in pattern.
            Longest prefix of `P` that is a suffix of "NANA" is "NA" (length 2). Shift $m-2=3$.

    So, for `P = "ANANA"`:
    $$ \text{gs\_shift} = \{ \text{length 0: 5, length 1: 2, length 2: 4, length 3: 1, length 4: 3} \} $$
    (Note: `gs_shift[k]` is for a matched suffix of length `k`. If $k=0$, it means no suffix matched, only a mismatch. The shift is always `m` in that case.)

**Search Steps:**

*   **Initial Alignment:** $i=0$
    `B A N A N A S`
    `A N A N A`
    Compare `T[4]` ('N') with `P[4]` ('A'). **Mismatch!** $j=4$. Bad character `T[4]` is 'N'.

    *   **Bad Character Shift (`shift_BC`):**
        `L['N'] = 3` (rightmost 'N' in `P` is at index 3).
        `shift_BC = \max(1, j - L[T[i+j]]) = \max(1, 4 - L['N']) = \max(1, 4 - 3) = 1`.
        *Explanation: Mismatch at `P[4]`. `T[4]` is 'N'. The pattern's 'N' is at `P[3]`. We want to align `P[3]` with `T[4]`. This requires a shift of 1 position.*

    *   **Good Suffix Shift (`shift_GS`):**
        Matched suffix length $k = m-1-j = 5-1-4 = 0$. (No suffix matched, only a mismatch).
        `shift_GS = gs_shift[0] = 5`.
        *Explanation: No part of the pattern matched. The most conservative shift is the full pattern length.*

    *   **Total Shift:** $\max(shift_{BC}, shift_{GS}) = \max(1, 5) = 5$.
        *Explanation: We take the larger of the two shifts to ensure we jump as far as possible without missing a potential match.*

*   **Shift Pattern:** $i = 0 + 5 = 5$.
    `B A N A N A S`
              `A N A N A`
    Pattern goes past the end of the text. No more comparisons possible.

**Result:** Pattern "ANANA" not found.

**Reflection:** This example demonstrates how the bad character rule can dominate the good suffix rule when there's an early mismatch with a character that appears further left in the pattern. The good suffix rule for a length 0 suffix defaults to shifting by the pattern's full length.

---

### Example 2: Pattern with Repeated Characters

**Problem:** Search for pattern $P = \text{"AAAA"}$ in text $T = \text{"AAAAAAAA"}$.

**Given:**
Text $T = \text{"AAAAAAAA"}$ ($n=8$)
Pattern $P = \text{"AAAA"}$ ($m=4$)

**Preprocessing:**

1.  **Bad Character Table ($L[c]$ for $P=\text{"AAAA"}$):**
    *   `A`: rightmost at index 3
    *   Other characters: -1
    $$ L = \{ \text{'A'}: 3, \text{other}: -1 \} $$

2.  **Good Suffix Shift Table ($\text{gs\_shift}[k]$ for $P=\text{"AAAA"}$):**
    For `P = "AAAA"`:
    *   `gs_shift[0] = 4` (default)
    *   `gs_shift[1]` (suffix "A"): Shift to align `P[2]` with `T[i+3]`. Shift `3-2=1`.
    *   `gs_shift[2]` (suffix "AA"): Shift to align `P[1]` with `T[i+2]`. Shift `3-1=2`.
    *   `gs_shift[3]` (suffix "AAA"): Shift to align `P[0]` with `T[i+1]`. Shift `3-0=3`.
    $$ \text{gs\_shift} = \{ \text{length 0: 4, length 1: 1, length 2: 2, length 3: 3} \} $$

**Search Steps:**

*   **Initial Alignment:** $i=0$
    `A A A A A A A A`
    `A A A A`
    Compare `T[3]` ('A') with `P[3]` ('A'). Match. $j=3$.
    Compare `T[2]` ('A') with `P[2]` ('A'). Match. $j=2$.
    Compare `T[1]` ('A') with `P[1]` ('A'). Match. $j=1$.
    Compare `T[0]` ('A') with `P[0]` ('A'). Match. $j=0$.
    All characters matched! Pattern found at index 0.

*   **Pattern Found at Index 0.**
    *   **Bad Character Shift (`shift_BC`):** Since a full match occurred, `j` would effectively be -1 (or the loop finished). For a full match, the `shift_BC` rule doesn't directly apply for the *next* search. If we consider the "mismatch" to be "before the first character", we can't use it. Instead, we use the `gs_shift` for the whole pattern length.
        A common practice after a full match is to shift by the `gs_shift` for the full pattern length, or by `m - border_array[m-1]` (which is `gs_shift[m-1]` in some implementations).
        For `P="AAAA"`, `gs_shift[3] = 3`.
        Or, some implementations shift by $m$ if no true good suffix applies. Let's use `gs_shift[m-1]` for full pattern match.
        `shift_BC` after a full match is often set to 1 (to find overlapping matches).
        Let's use `shift_BC = 1` to find overlapping matches.
        `shift_GS = gs_shift[m-1] = gs_shift[3] = 3`.
        `Total Shift = max(1, 3) = 3`.

*   **Shift Pattern:** $i = 0 + 3 = 3$.
    `A A A A A A A A`
           `A A A A`
    Compare `T[6]` ('A') with `P[3]` ('A'). Match. $j=3$.
    Compare `T[5]` ('A') with `P[2]` ('A'). Match. $j=2$.
    Compare `T[4]` ('A') with `P[1]` ('A'). Match. $j=1$.
    Compare `T[3]` ('A') with `P[0]` ('A'). Match. $j=0$.
    All characters matched! Pattern found at index 3.

*   **Pattern Found at Index 3.**
    `shift_BC = 1`.
    `shift_GS = gs_shift[3] = 3`.
    `Total Shift = max(1, 3) = 3`.

*   **Shift Pattern:** $i = 3 + 3 = 6$.
    `A A A A A A A A`
                 `A A A A`
    Pattern goes past the end of the text. No more comparisons possible.

**Result:** Pattern "AAAA" found at indices **0** and **3**.

**Reflection:** This example highlights how Boyer-Moore efficiently handles patterns with repeating characters. The good suffix rule is particularly powerful here, allowing large jumps even after a full match, because it knows that if the pattern matched, the next possible match can only occur after a certain shift based on the pattern's internal structure.

---

### Example 3: Pattern Not Found (Longer Pattern)

**Problem:** Search for pattern $P = \text{"EXAMPLE"}$ in text $T = \text{"THISISATEXT"}$.

**Given:**
Text $T = \text{"THISISATEXT"}$ ($n=11$)
Pattern $P = \text{"EXAMPLE"}$ ($m=7$)

**Preprocessing:**

1.  **Bad Character Table ($L[c]$ for $P=\text{"EXAMPLE"}$):**
    *   `E`: 6
    *   `X`: 5
    *   `A`: 4
    *   `M`: 3
    *   `P`: 2
    *   `L`: 1
    *   Other characters: -1
    $$ L = \{ \text{'E'}:6, \text{'X'}:5, \text{'A'}:4, \text{'M'}:3, \text{'P'}:2, \text{'L'}:1, \text{other}:-1 \} $$

2.  **Good Suffix Shift Table ($\text{gs\_shift}[k]$ for $P=\text{"EXAMPLE"}$):**
    For `P = "EXAMPLE"` (all unique chars, or no repeating suffixes):
    *   `gs_shift[0] = 7` (default)
    *   `gs_shift[k] = 7` for $k=1 \dots 6$ (no internal structure for shifts, so defaults to pattern length)
    $$ \text{gs\_shift} = \{ \text{length k: 7 for all k} \} $$
    *Explanation: Since "EXAMPLE" has no repeating characters, and no prefix is a suffix of any suffix, the good suffix rule will always suggest shifting by the full pattern length $m$.*

**Search Steps:**

*   **Initial Alignment:** $i=0$
    `T H I S I S A T E X T`
    `E X A M P L E`
    Compare `T[6]` ('A') with `P[6]` ('E'). **Mismatch!** $j=6$. Bad character `T[6]` is 'A'.

    *   **Bad Character Shift (`shift_BC`):**
        `L['A'] = 4`.
        `shift_BC = \max(1, j - L[T[i+j]]) = \max(1, 6 - L['A']) = \max(1, 6 - 4) = 2`.
        *Explanation: Mismatch at `P[6]`. `T[6]` is 'A'. The pattern's 'A' is at `P[4]`. We want to align `P[4]` with `T[6]`. This requires a shift of 2 positions.*

    *   **Good Suffix Shift (`shift_GS`):**
        Matched suffix length $k = m-1-j = 7-1-6 = 0$.
        `shift_GS = gs_shift[0] = 7$.
        *Explanation: No part of the pattern matched. The most conservative shift is the full pattern length.*

    *   **Total Shift:** $\max(shift_{BC}, shift_{GS}) = \max(2, 7) = 7$.
        *Explanation: We take the larger of the two shifts.*

*   **Shift Pattern:** $i = 0 + 7 = 7$.
    `T H I S I S A T E X T`
                      `E X A M P L E`
    Pattern goes past the end of the text ($i+m = 7+7 = 14 > n=11$). No more comparisons possible.

**Result:** Pattern "EXAMPLE" not found.

**Reflection:** This example shows that when the pattern has little internal structure (e.g., all unique characters), the good suffix rule often defaults to a large shift (like `m`), and the bad character rule becomes the primary driver of shifts. Even with a long pattern and short text, Boyer-Moore makes quick work of it.

---

### Example 4: Overlapping Matches

**Problem:** Search for pattern $P = \text{"ABA"}$ in text $T = \text{"ABABAABABA"}$.

**Given:**
Text $T = \text{"ABABAABABA"}$ ($n=10$)
Pattern $P = \text{"ABA"}$ ($m=3$)

**Preprocessing:**

1.  **Bad Character Table ($L[c]$ for $P=\text{"ABA"}$):**
    *   `A`: rightmost at index 2
    *   `B`: rightmost at index 1
    *   Other characters: -1
    $$ L = \{ \text{'A'}: 2, \text{'B'}: 1, \text{other}: -1 \} $$

2.  **Good Suffix Shift Table ($\text{gs\_shift}[k]$ for $P=\text{"ABA"}$):**
    For `P = "ABA"`:
    *   `gs_shift[0] = 3` (default)
    *   `gs_shift[1]` (suffix "A"): Shift to align `P[0]` with `T[i+2]`. Shift `2-0=2`.
    *   `gs_shift[2]` (suffix "BA"): No other "BA". Longest prefix of `P` that is suffix of "BA" is "A" (length 1). Shift `m-1 = 2`.
    $$ \text{gs\_shift} = \{ \text{length 0: 3, length 1: 2, length 2: 2} \} $$

**Search Steps:**

*   **Initial Alignment:** $i=0$
    `A B A B A A B A B A`
    `A B A`
    Compare `T[2]` ('A') with `P[2]` ('A'). Match. $j=2$.
    Compare `T[1]` ('B') with `P[1]` ('B'). Match. $j=1$.
    Compare `T[0]` ('A') with `P[0]` ('A'). Match. $j=0$.
    All characters matched! Pattern found at index 0.

*   **Pattern Found at Index 0.**
    *   **Bad Character Shift (`shift_BC`):** After a match, we typically shift by at least 1 to find overlapping matches. Set `shift_BC = 1`.
    *   **Good Suffix Shift (`shift_GS`):** For a full match, the matched suffix has length $m-1=2$ (the whole pattern except the first character, or the whole pattern itself). Here, we matched `ABA`. The largest border is `A` (length 1).
        `gs_shift` for a full match $P[0 \dots m-1]$ is typically `gs_shift[m-1]` (if the full pattern is considered the "matched suffix") or `m - border[m-1]` (where `border[m-1]` is the length of the longest proper prefix of `P` that is also a suffix of `P`).
        For `P="ABA"`, longest proper prefix that is also a suffix is "A" (length 1). So shift by `m - 1 = 3 - 1 = 2`.
        Let's use `gs_shift[m-1]` for the shift after a full match. `gs_shift[2] = 2`.
    *   **Total Shift:** $\max(1, 2) = 2$.

*   **Shift Pattern:** $i = 0 + 2 = 2$.
    `A B A B A A B A B A`
        `A B A`
    Compare `T[4]` ('A') with `P[2]` ('A'). Match. $j=2$.
    Compare `T[3]` ('B') with `P[1]` ('B'). Match. $j=1$.
    Compare `T[2]` ('A') with `P[0]` ('A'). Match. $j=0$.
    All characters matched! Pattern found at index 2.

*   **Pattern Found at Index 2.**
    *   `shift_BC = 1`.
    *   `shift_GS = gs_shift[2] = 2`.
    *   **Total Shift:** $\max(1, 2) = 2$.

*   **Shift Pattern:** $i = 2 + 2 = 4$.
    `A B A B A A B A B A`
            `A B A`
    Compare `T[6]` ('B') with `P[2]` ('A'). **Mismatch!** $j=2$. Bad character `T[6]` is 'B'.

    *   **Bad Character Shift (`shift_BC`):**
        `L['B'] = 1`.
        `shift_BC = \max(1, j - L[T[i+j]]) = \max(1, 2 - L['B']) = \max(1, 2 - 1) = 1`.
        *Explanation: Mismatch at `P[2]`. `T[6]` is 'B'. The pattern's 'B' is at `P[1]`. We want to align `P[1]` with `T[6]`. This requires a shift of 1 position.*

    *   **Good Suffix Shift (`shift_GS`):**
        Matched suffix length $k = m-1-j = 3-1-2 = 0$.
        `shift_GS = gs_shift[0] = 3$.
        *Explanation: No part of the pattern matched. The most conservative shift is the full pattern length.*

    *   **Total Shift:** $\max(shift_{BC}, shift_{GS}) = \max(1, 3) = 3$.

*   **Shift Pattern:** $i = 4 + 3 = 7$.
    `A B A B A A B A B A`
                     `A B A`
    Compare `T[9]` ('A') with `P[2]` ('A'). Match. $j=2$.
    Compare `T[8]` ('B') with `P[1]` ('B'). Match. $j=1$.
    Compare `T[7]` ('A') with `P[0]` ('A'). Match. $j=0$.
    All characters matched! Pattern found at index 7.

*   **Pattern Found at Index 7.**
    *   `shift_BC = 1`.
    *   `shift_GS = gs_shift[2] = 2`.
    *   **Total Shift:** $\max(1, 2) = 2$.

*   **Shift Pattern:** $i = 7 + 2 = 9$.
    `A B A B A A B A B A`
                           `A B A`
    Pattern goes past the end of the text ($i+m = 9+3 = 12 > n=10$). No more comparisons possible.

**Result:** Pattern "ABA" found at indices **0**, **2**, and **7**.

**Reflection:** This example perfectly illustrates the interplay between the two heuristics. For full matches, the good suffix rule guides the shift to find overlapping occurrences. For mismatches, both rules contribute, and the maximum shift is taken. The bad character rule was crucial in making a small shift (`1`) when a 'B' mismatched, allowing the subsequent match to be found.

## 6. Common mistakes and traps

1.  **Incorrectly calculating `max(shift_BC, shift_GS)`:** Students sometimes forget to take the maximum, or mistakenly add them, which can lead to incorrect shifts and potentially missing matches. The `max` is crucial for correctness and efficiency.
2.  **Off-by-one errors in indexing:** String indexing (0-based vs. 1-based), pattern length $m$, and current comparison index $j$ are frequent sources of errors, especially in the `j - L[T[i+j]]` calculation.
3.  **Handling characters not in the pattern for the Bad Character rule:** If $T[i+j]$ is a character not present in $P$, its $L[c]$ value should be treated such that it results in a large shift (typically `j+1` or `m`). Setting $L[c]$ to -1 for such characters is a common solution.
4.  **Misunderstanding the Good Suffix rule's two cases:** The good suffix rule is the more complex heuristic. Students often struggle with its two sub-cases (matched suffix re-occurs, or a prefix matches a suffix of the matched part) and their precomputation. This can lead to incorrect `gs_shift` values.
5.  **Forgetting preprocessing or errors in preprocessing:** The efficiency of Boyer-Moore relies heavily on correctly precomputing the `L` and `gs_shift` tables. Skipping this step or making errors in its implementation will severely degrade performance or correctness.
6.  **Confusing right-to-left comparison with left-to-right:** While seemingly simple, the right-to-left comparison is fundamental. Trying to apply left-to-right logic from other algorithms will break Boyer-Moore.
7.  **Handling shifts after a full match:** When a pattern is found, the algorithm needs to shift to find subsequent matches. Simply shifting by `1` might be too small, and shifting by `m` might miss overlapping matches. The `gs_