## 1. What it is — in plain English

Imagine you have a very long book, and you're trying to find every instance of a specific, somewhat long phrase, like "the quick brown fox jumps". A simple way to do this would be to start at the beginning of the book, check if the phrase matches. If it doesn't, you shift your search by just one letter and try again. This works, but it's slow because you often re-read parts of the book you've already looked at.

The Knuth-Morris-Pratt (KMP) algorithm is a super-smart way to find a pattern (our phrase) within a longer text (our book) without ever "re-reading" characters in the main text. When a mismatch happens, instead of just shifting the pattern by one and starting from scratch, KMP uses pre-computed "hints" to know exactly how much to shift the pattern forward.

These "hints" tell KMP: "If you've matched this much of the pattern, and then hit a roadblock, the best place to try matching again is here, because we already know a part of the matched segment could also be a prefix of the pattern." This way, the main text pointer never goes backward, making the search much faster and more efficient. It's like having a super-fast index that tells you exactly where to jump in the pattern when things go wrong.

## 2. Why it matters — real-world applications

The KMP algorithm, or its underlying principles, is fundamental to many areas where efficient string searching is crucial. Its ability to avoid redundant comparisons makes it a cornerstone.

1.  **Text Editors and IDEs (Integrated Development Environments):** When you press `Ctrl+F` (or `Cmd+F`) to find a word or phrase in a document or code file, an efficient string matching algorithm like KMP (or often Boyer-Moore, which is another advanced algorithm) is working behind the scenes. For very large files, a naive search would be noticeably slow, especially for frequent searches or "find and replace" operations.
2.  **Bioinformatics (DNA/RNA Sequence Analysis):** In genomics, scientists frequently need to find specific genetic sequences (patterns) within vast DNA or RNA strands (text). KMP is ideal for quickly locating genes, regulatory elements, or disease markers. For instance, identifying a particular gene sequence (e.g., `ATGCGT...`) within a human chromosome (billions of characters long) is a direct application. The speed is critical due to the sheer volume of data.
3.  **Network Intrusion Detection Systems (NIDS):** NIDS monitor network traffic for malicious patterns, such as known virus signatures, attack sequences, or forbidden keywords. KMP can rapidly scan incoming data packets for these patterns, allowing for real-time detection and prevention of cyber threats. If a KMP-like algorithm weren't used, the system might be too slow to process high-volume network traffic, leading to vulnerabilities.
4.  **Plagiarism Detection Software:** Educational institutions and publishers use software to check if submitted work contains content copied from existing sources. These tools employ advanced string matching algorithms to compare submitted text against a massive database of documents, identifying matching phrases or sentences. KMP contributes to the efficiency of these comparisons, allowing large documents to be checked quickly against vast repositories.

## 3. Prerequisites — what you must know first

Before diving deep into KMP, ensure you have a solid grasp of these fundamental concepts:

*   **Strings and Characters:** Understanding what a string is (a sequence of characters), how characters are indexed (usually 0-indexed), and basic operations like getting a character at a specific index or determining string length.
*   **Substrings, Prefixes, and Suffixes:**
    *   **Substring:** Any contiguous sequence of characters within a string. E.g., "ban" is a substring of "banana".
    *   **Prefix:** A substring that starts at the beginning of the string. E.g., "b", "ba", "ban" are prefixes of "banana".
    *   **Suffix:** A substring that ends at the end of the string. E.g., "a", "na", "ana" are suffixes of "banana".
    *   **Proper Prefix/Suffix:** A prefix/suffix that is not the string itself. E.g., "ban" is a proper prefix of "banana", but "banana" is not.
*   **Arrays/Lists:** How to declare, initialize, access elements, and iterate through one-dimensional arrays or lists. KMP heavily relies on an auxiliary array.
*   **Loops (for, while):** Proficiency in using `for` and `while` loops for iteration and conditional execution.
*   **Time Complexity (Big O Notation):** Understanding how to analyze the efficiency of algorithms, particularly what $O(N)$, $O(M)$, $O(N+M)$, and $O(N \cdot M)$ mean, and why $O(N+M)$ is generally better than $O(N \cdot M)$.

## 4. The core idea — step by step

Let's break down the KMP algorithm's core ideas into digestible steps, building intuition along the way.

### ### Step 1: The Naive Approach's Flaw

*   **Plain-English Statement:** When trying to find a pattern in a text using the simplest method (the "naive" approach), if we find a mismatch after matching several characters, we completely give up on those matched characters. We then shift the pattern by just one position and restart the comparison from the very beginning of the pattern. This means we re-examine characters in the text that we already know matched part of the pattern.

*   **Small Concrete Example:**
    Let `TEXT = "ABABDABACDABABCABAB"` and `PATTERN = "ABABCABAB"`.
    Naive comparison:
    ```
    TEXT:    A B A B D A B A C D A B A B C A B A B
    PATTERN: A B A B C A B A B
             ^ ^ ^ ^ ^
             Match, Match, Match, Match, Mismatch (T[4] 'D' vs P[4] 'C')
    ```
    At this point, we've matched `P[0...3]` ("ABAB"). With the naive approach, we'd shift the pattern by one:
    ```
    TEXT:    A B A B D A B A C D A B A B C A B A B
    PATTERN:   A B A B C A B A B
               ^
               Now comparing T[1] 'B' with P[0] 'A'. Mismatch.
    ```
    Notice how we just re-compared `T[1]` with `P[0]` even though we knew `T[0...3]` was "ABAB". This is inefficient.

*   **Formal/Mathematical Version:**
    Given `TEXT` of length $n$ and `PATTERN` of length $m$.
    Let $i$ be the pointer for `TEXT` and $j$ be the pointer for `PATTERN`.
    If `T[i] == P[j]`, then $i \leftarrow i+1$, $j \leftarrow j+1$.
    If `T[i] \neq P[j]`:
    $i \leftarrow i - j + 1$ (reset text pointer to the start of the next potential match)
    $j \leftarrow 0$ (reset pattern pointer to the beginning)

*   **What Could Go Wrong:** The naive approach has a worst-case time complexity of $O(N \cdot M)$. This happens when the pattern almost matches a long segment of the text, but then fails, forcing a small shift and re-comparison. For example, `TEXT = "AAAA...AAAB"` and `PATTERN = "AAAA...AAAC"`. Each mismatch would cause a shift of only 1, leading to many redundant comparisons.

### ### Step 2: The KMP Insight - Don't Re-examine Text

*   **Plain-English Statement:** When a mismatch occurs, say at `T[i]` and `P[j]`, we know that the characters `T[i-j...i-1]` have successfully matched `P[0...j-1]`. This segment of the text, `T[i-j...i-1]`, is *identical* to the prefix `P[0...j-1]` of our pattern. We should use this valuable information! Instead of shifting the pattern by just one and restarting `P[0]` from `T[i-j+1]`, we can try to "slide" the pattern forward such that a *known suffix* of `P[0...j-1]` aligns with an equally *known prefix* of `P`. This way, the text pointer `i` never moves backward.

*   **Small Concrete Example:**
    `TEXT:    A B A B D A B A C D A B A B C A B A B`
    `PATTERN: A B A B C A B A B`
             `^ ^ ^ ^ ^`
             `Match, Match, Match, Match, Mismatch (T[4] 'D' vs P[4] 'C')`
    We know `T[0...3]` is "ABAB", and `P[0...3]` is also "ABAB".
    When `T[4]` ('D') mismatches `P[4]` ('C'), we need to shift the pattern.
    Can we shift `P` such that a part of `P[0...3]` (which is "ABAB") aligns with a prefix of `P`?
    The longest *proper* prefix of "ABAB" that is also a suffix of "ABAB" is "AB". Its length is 2.
    So, we can align `P[0...1]` ("AB") with `T[2...3]` ("AB").
    ```
    TEXT:    A B A B D A B A C D A B A B C A B A B
    PATTERN:       A B A B C A B A B  (shifted by 2 positions from original start)
                   ^ ^ ^
                   Now comparing T[4] 'D' with P[2] 'A'. Mismatch.
    ```
    Crucially, the `i` pointer for `TEXT` did *not* move backward. It stayed at `T[4]`. Only the `j` pointer for `PATTERN` moved.

*   **Formal/Mathematical Version:**
    If `T[i] \neq P[j]` and we've matched `P[0...j-1]` with `T[i-j...i-1]`:
    We need to find the largest integer $k < j$ such that the prefix $P[0...k-1]$ is a suffix of $P[0...j-1]$.
    Then, we can continue the comparison by aligning $P[k]$ with $T[i]$. This means our new pattern pointer will be $j \leftarrow k$.
    If no such $k$ exists (i.e., $j=0$ or no proper prefix is a suffix), we simply increment $i$ and keep $j=0$.

*   **What Could Go Wrong:** The challenge is how to efficiently find this "largest $k$" for every possible $j$. Manually calculating it during the search would be slow. This leads to the need for a pre-computation step.

### ### Step 3: The "Failure Function" (LPS Array)

*   **Plain-English Statement:** To implement Step 2 efficiently, we pre-compute an array, often called the "failure function" or "LPS array" (Longest Proper Prefix that is also a Suffix). For each position `q` in the pattern, this array tells us the length of the longest proper prefix of `P[0...q]` that is also a suffix of `P[0...q]`. This value is exactly the `k` we need from Step 2.

*   **Small Concrete Example:**
    Let `PATTERN = "ABABCABAB"`. Let's compute its `lps` array.
    *   `P[0] = 'A'`: Prefixes: `""`, ` "A"`. Suffixes: `""`, ` "A"`. Longest *proper* prefix that is also a suffix: `""` (length 0). So, `lps[0] = 0`.
    *   `P[0...1] = "AB"`: Proper prefixes: `""`, `"A"`. Proper suffixes: `""`, `"B"`. No common non-empty proper prefix/suffix. Length 0. So, `lps[1] = 0`.
    *   `P[0...2] = "ABA"`: Proper prefixes: `""`, `"A"`, `"AB"`. Proper suffixes: `""`, `"A"`, `"BA"`. Common: `"A"`. Length 1. So, `lps[2] = 1`.
    *   `P[0...3] = "ABAB"`: Proper prefixes: `""`, `"A"`, `"AB"`, `"ABA"`. Proper suffixes: `""`, `"B"`, `"AB"`, `"BAB"`. Common: `"AB"`. Length 2. So, `lps[3] = 2`.
    *   `P[0...4] = "ABABC"`: Proper prefixes: `""`, `"A"`, `"AB"`, `"ABA"`, `"ABAB"`. Proper suffixes: `""`, `"C"`, `"BC"`, `"ABC"`, `"BABC"`. No common non-empty proper prefix/suffix. Length 0. So, `lps[4] = 0`.
    *   ...and so on.
    The full `lps` array for `P = "ABABCABAB"` would be: `[0, 0, 1, 2, 0, 1, 2, 3, 4]`

*   **Formal/Mathematical Version:**
    Let `lps` be an array of length $m$, where $m$ is the length of `PATTERN`.
    For each index $q$ from $0$ to $m-1$:
    `lps[q]` is defined as the length of the longest proper prefix of `P[0...q]` that is also a suffix of `P[0...q]`.
    By "proper prefix/suffix", we mean it cannot be the entire string `P[0...q]` itself.

*   **What Could Go Wrong:** Calculating this array manually for long patterns is tedious and error-prone. We need an efficient algorithm to build the `lps` array itself.

### ### Step 4: Computing the LPS Array

*   **Plain-English Statement:** We can compute the `lps` array for a pattern using a self-similar approach to the KMP search. We use two pointers: one (`length`) to track the current length of the longest proper prefix that's also a suffix, and another (`i`) to iterate through the pattern. If characters match, we extend the current `length`. If they don't, we use the already computed `lps` values to "fall back" to a shorter possible prefix/suffix.

*   **Small Concrete Example:**
    Let `PATTERN = "ABABCABAB"`. We want to fill `lps` array of size 9.
    Initialize `lps[0] = 0`. `length = 0` (length of previous LPS), `i = 1` (current character index).

    1.  `i = 1`, `P[1] = 'B'`. `P[length] = P[0] = 'A'`. `P[1] != P[0]`.
        Since `length` is 0, we can't fall back further. `lps[1] = 0`. `i` increments to 2. `length` remains 0.
        `lps = [0, 0, ?, ?, ?, ?, ?, ?, ?]`

    2.  `i = 2`, `P[2] = 'A'`. `P[length] = P[0] = 'A'`. `P[2] == P[0]`.
        Match! `length` becomes 1. `lps[2] = 1`. `i` increments to 3.
        `lps = [0, 0, 1, ?, ?, ?, ?, ?, ?]`

    3.  `i = 3`, `P[3] = 'B'`. `P[length] = P[1] = 'B'`. `P[3] == P[1]`.
        Match! `length` becomes 2. `lps[3] = 2`. `i` increments to 4.
        `lps = [0, 0, 1, 2, ?, ?, ?, ?, ?]`

    4.  `i = 4`, `P[4] = 'C'`. `P[length] = P[2] = 'A'`. `P[4] != P[2]`.
        Mismatch. `length` is not 0. So, we "fall back": `length = lps[length-1] = lps[2-1] = lps[1] = 0`.
        Now `length = 0`. `P[4] = 'C'`. `P[length] = P[0] = 'A'`. `P[4] != P[0]`.
        Mismatch again. `length` is 0. So, `lps[4] = 0`. `i` increments to 5. `length` remains 0.
        `lps = [0, 0, 1, 2, 0, ?, ?, ?, ?]`

    5.  `i = 5`, `P[5] = 'A'`. `P[length] = P[0] = 'A'`. `P[5] == P[0]`.
        Match! `length` becomes 1. `lps[5] = 1`. `i` increments to 6.
        `lps = [0, 0, 1, 2, 0, 1, ?, ?, ?]`

    ...and so on. This process continues until `i` reaches the end of the pattern.

*   **Formal/Mathematical Version:**
    Given `PATTERN` of length $m$.
    Create `lps` array of size $m$.
    Initialize `length = 0` and `i = 1`. `lps[0] = 0`.

    While $i < m$:
    1.  If `P[i] == P[length]`:
        `length \leftarrow length + 1`
        `lps[i] \leftarrow length`
        `i \leftarrow i + 1`
    2.  Else (`P[i] \neq P[length]`):
        If `length \neq 0`:
            `length \leftarrow lps[length - 1]` (fall back to a shorter prefix/suffix)
        Else (`length == 0`):
            `lps[i] \leftarrow 0`
            `i \leftarrow i + 1`

*   **What Could Go Wrong:** The most common mistake is understanding the `length = lps[length-1]` step. It means: "If the character `P[i]` doesn't match the character at `P[length]`, it implies that the prefix of length `length` that we were trying to extend (i.e., `P[0...length-1]`) cannot be extended further. So, we look up in our `lps` table what the *next best* shorter prefix/suffix is for `P[0...length-1]`. This value is `lps[length-1]`." This effectively shifts our "internal pattern" for LPS computation.

### ### Step 5: The KMP Search Algorithm

*   **Plain-English Statement:** With the pre-computed `lps` array, the actual search becomes very efficient. We use two pointers, `i` for the text and `j` for the pattern. We compare `T[i]` and `P[j]`. If they match, both pointers advance. If `j` reaches the end of the pattern, we've found a match! Then, we use `lps[j-1]` to figure out where to restart `j` to find *overlapping* matches without moving `i` backward. If there's a mismatch, and `j` is not 0, we shift the pattern by setting `j = lps[j-1]`. If `j` is already 0, it means `T[i]` doesn't match `P[0]`, so we simply advance `i`.

*   **Small Concrete Example:**
    `TEXT = "ABABDABACDABABCABAB"` (length $n=19$)
    `PATTERN = "ABABCABAB"` (length $m=9$)
    `lps = [0, 0, 1, 2, 0, 1, 2, 3, 4]` (from Step 3/4)

    Initialize `i = 0` (text pointer), `j = 0` (pattern pointer).

    1.  `T[0] == P[0]` ('A' == 'A'). Match. `i=1, j=1`.
    2.  `T[1] == P[1]` ('B' == 'B'). Match. `i=2, j=2`.
    3.  `T[2] == P[2]` ('A' == 'A'). Match. `i=3, j=3`.
    4.  `T[3] == P[3]` ('B' == 'B'). Match. `i=4, j=4`.
    5.  `T[4] == 'D'`, `P[4] == 'C'`. Mismatch.
        `j` is 4 (not 0). So, `j = lps[j-1] = lps[3] = 2`. `i` remains 4.
        (Now we are comparing `T[4]` with `P[2]`)

    6.  `T[4] == 'D'`, `P[2] == 'A'`. Mismatch.
        `j` is 2 (not 0). So, `j = lps[j-1] = lps[1] = 0`. `i` remains 4.
        (Now we are comparing `T[4]` with `P[0]`)

    7.  `T[4] == 'D'`, `P[0] == 'A'`. Mismatch.
        `j` is 0. So, `i` increments to 5. `j` remains 0.
        (Now we are comparing `T[5]` with `P[0]`)

    8.  `T[5] == P[0]` ('A' == 'A'). Match. `i=6, j=1`.
    ... and so on.

    Eventually, at `i=10`:
    `T[10] = 'A'`, `P[0] = 'A'`. Match. `i=11, j=1`.
    `T[11] = 'B'`, `P[1] = 'B'`. Match. `i=12, j=2`.
    `T[12] = 'A'`, `P[2] = 'A'`. Match. `i=13, j=3`.
    `T[13] = 'B'`, `P[3] = 'B'`. Match. `i=14, j=4`.
    `T[14] = 'C'`, `P[4] = 'C'`. Match. `i=15, j=5`.
    `T[15] = 'A'`, `P[5] = 'A'`. Match. `i=16, j=6`.
    `T[16] = 'B'`, `P[6] = 'B'`. Match. `i=17, j=7`.
    `T[17] = 'A'`, `P[7] = 'A'`. Match. `i=18, j=8`.
    `T[18] = 'B'`, `P[8] = 'B'`. Match. `i=19, j=9`.

    Now `j == m` (9). A full match is found at index `i-j = 19-9 = 10`.
    To find the next possible overlapping match, we update `j = lps[j-1] = lps[8] = 4`. `i` remains 19.
    The loop continues until `i` reaches the end of the text.

*   **Formal/Mathematical Version:**
    Given `TEXT` of length $n$, `PATTERN` of length $m$, and pre-computed `lps` array of length $m$.
    Initialize `i = 0` (text pointer) and `j = 0` (pattern pointer).

    While $i < n$:
    1.  If `P[j] == T[i]`:
        `i \leftarrow i + 1`
        `j \leftarrow j + 1`
    2.  If `j == m`: (A match is found)
        Output: "Pattern found at index $i - j$."
        `j \leftarrow lps[j - 1]` (look for next possible overlapping match)
    3.  Else if `i < n` and `P[j] \neq T[i]`: (Mismatch)
        If `j \neq 0`:
            `j \leftarrow lps[j - 1]` (shift pattern based on `lps` array)
        Else (`j == 0`):
            `i \leftarrow i + 1` (no prefix to fall back on, move text pointer)

*   **What Could Go Wrong:** Forgetting to handle the case where `j` becomes `m` (a full match) and how to reset `j` to find subsequent overlapping matches. Also, ensure the `i < n` condition is correctly placed in the mismatch `else if` block to prevent out-of-bounds access if `i` has already reached `n`.

### ### Step 6: Time Complexity Analysis

*   **Plain-English Statement:** The KMP algorithm is incredibly efficient. Its time complexity is $O(N+M)$, where $N$ is the length of the text and $M$ is the length of the pattern. This is because:
    1.  **LPS Array Construction:** When building the `lps` array, both `i` and `length` pointers essentially move forward through the pattern. `i` increments up to `M` times. `length` also increments up to `M` times. When `length` decreases, it's always by looking up a previous `lps` value, and it can never decrease more times than it has increased. So, the `lps` array construction takes $O(M)$ time.
    2.  **KMP Search:** In the main search loop, the text pointer `i` only ever moves forward (or stays put briefly during a shift). It never moves backward. It iterates through the text at most $N$ times. The pattern pointer `j` also moves forward (up to $N$ times) or falls back using the `lps` array. Each time `j` falls back, it's compensated by a previous increment. In total, `j` increments at most $N$ times and decrements at most $N$ times. Thus, the search phase takes $O(N)$ time.
    Combining these, the total time complexity is $O(M) + O(N) = O(N+M)$.

*   **Formal/Mathematical Version:**
    The time complexity analysis relies on an amortized analysis of pointer movements.

    **LPS Array Construction:**
    *   The `i` pointer iterates from $1$ to $m-1$, so it performs $m-1$ increments.
    *   The `length` pointer can increase (when `P[i] == P[length]`) or decrease (when `P[i] \neq P[length]` and `length \neq 0`).
    *   `length` never becomes negative and never exceeds $m-1$.
    *   Each increment of `length` is paired with an increment of `i`.
    *   Each decrement of `length` (i.e., `length = lps[length-1]`) happens at most once for each `i` before `i` increments.
    *   The total number of increments of `length` is at most $m-1$.
    *   The total number of decrements of `length` is also at most $m-1$ (since `length` cannot decrease more times than it has increased).
    *   Therefore, the total operations for `lps` array construction are proportional to $m$, giving $O(M)$ time complexity.

    **KMP Search:**
    *   The `i` pointer (for `TEXT`) strictly increases from $0$ to $n-1$. It makes at most $n$ increments.
    *   The `j` pointer (for `PATTERN`) can increase (on a match) or decrease (on a mismatch using `lps`).
    *   `j` never becomes negative and never exceeds $m$.
    *   Each time `j` increments, `i` also increments. Since `i` increments at most $n$ times, `j` also increments at most $n$ times.
    *   Each time `j` decrements (i.e., `j = lps[j-1]`), it's because of a mismatch. These decrements are bounded by the total number of increments `j` has made.
    *   In the worst case, `j` could increment $n$ times and decrement $n$ times.
    *   Therefore, the total operations for the search phase are proportional to $n$, giving $O(N)$ time complexity.

    **Total Time Complexity:** $O(M) + O(N) = O(N+M)$.

*   **What Could Go Wrong:** Misunderstanding that "amortized" means the total cost over a sequence of operations is considered, not just the worst-case cost of a single operation. While a single `j = lps[j-1]` step might look like a "jump," its impact on the *total* runtime is limited because `j` can't fall back indefinitely without having advanced first.

## 5. Worked examples — multiple, with every step shown

Let's walk through several examples to solidify your understanding.

### ### Example 1: Simple Match
**Problem:** Find all occurrences of `PATTERN = "AAA"` in `TEXT = "AAAAABAA"`.

**Given:**
*   `TEXT = "AAAAABAA"` ($n=8$)
*   `PATTERN = "AAA"` ($m=3$)

**Want:** Starting indices of all matches.

**Step 1: Compute the LPS array for "AAA"**

*   Initialize `lps` array of size 3 with `lps[0] = 0`.
*   `length = 0`, `i = 1`.

| `i` | `P[i]` | `P[length]` | `P[i] == P[length]`? | Action                                                                | `length` | `lps` array                           |
| :-- | :----- | :---------- | :------------------- | :-------------------------------------------------------------------- | :------- | :------------------------------------ |
| 0   | 'A'    |             |                      | `lps[0] = 0` (base case)                                              | 0        | `[0, ?, ?]`                           |
| 1   | 'A'    | 'A'         | Yes                  | `length++` (to 1), `lps[1] = 1`, `i++` (to 2)                         | 1        | `[0, 1, ?]`                           |
| 2   | 'A'    | 'A'         | Yes                  | `length++` (to 2), `lps[2] = 2`, `i++` (to 3)                         | 2        | `[0, 1, 2]`                           |
| 3   |        |             |                      | `i` is now `m` (3), loop ends.                                        |          | `[0, 1, 2]`                           |

So, `lps = [0, 1, 2]`.

**Step 2: Perform KMP Search**

*   Initialize `i = 0` (text pointer), `j = 0` (pattern pointer).

| `i` | `j` | `T[i]` | `P[j]` | `T[i] == P[j]`? | Action                                                               | `i` (new) | `j` (new) | Output                             |
| :-- | :-- | :----- | :----- | :-------------- | :------------------------------------------------------------------- | :-------- | :-------- | :--------------------------------- |
| 0   | 0   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 1         | 1         |                                    |
| 1   | 1   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 2         | 2         |                                    |
| 2   | 2   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 3         | 3         |                                    |
|     | 3   |        |        | `j == m`        | Match found at $i-j = 3-3 = 0$. `j = lps[j-1] = lps[2] = 2`.         | 3         | 2         | **Match at index 0**               |
| 3   | 2   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 4         | 3         |                                    |
|     | 3   |        |        | `j == m`        | Match found at $i-j = 4-3 = 1$. `j = lps[j-1] = lps[2] = 2`.         | 4         | 2         | **Match at index 1**               |
| 4   | 2   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 5         | 3         |                                    |
|     | 3   |        |        | `j == m`        | Match found at $i-j = 5-3 = 2$. `j = lps[j-1] = lps[2] = 2`.         | 5         | 2         | **Match at index 2**               |
| 5   | 2   | 'B'    | 'A'    | No              | `j \neq 0` (`j` is 2). `j = lps[j-1] = lps[1] = 1`.                  | 5         | 1         |                                    |
| 5   | 1   | 'B'    | 'A'    | No              | `j \neq 0` (`j` is 1). `j = lps[j-1] = lps[0] = 0`.                  | 5         | 0         |                                    |
| 5   | 0   | 'B'    | 'A'    | No              | `j == 0`. `i++`.                                                     | 6         | 0         |                                    |
| 6   | 0   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 7         | 1         |                                    |
| 7   | 1   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 8         | 2         |                                    |
| 8   | 2   |        |        | `i == n`        | Loop terminates.                                                     |           |           |                                    |

**Final Answer:** The pattern "AAA" is found at indices **0, 1, 2**.

**Reflection:** This example highlights how KMP efficiently finds overlapping matches. When "AAA" is found at index 0, instead of restarting the search from `T[1]` with `P[0]`, KMP uses `lps[2]=2` to realize that `P[0...1]` ("AA") is a suffix of the matched "AAA", and thus `P[0...1]` can align with `T[1...2]`. This allows it to immediately check for "AAA" starting at `T[1]`, saving comparisons.

### ### Example 2: General Case with Mismatches
**Problem:** Find all occurrences of `PATTERN = "ABABCABAB"` in `TEXT = "ABABDABACDABABCABAB"`.

**Given:**
*   `TEXT = "ABABDABACDABABCABAB"` ($n=19$)
*   `PATTERN = "ABABCABAB"` ($m=9$)

**Want:** Starting indices of all matches.

**Step 1: Compute the LPS array for "ABABCABAB"**
(As derived in Section 4, Step 3/4)
`lps = [0, 0, 1, 2, 0, 1, 2, 3, 4]`

**Step 2: Perform KMP Search**

*   Initialize `i = 0`, `j = 0`.

| `i` | `j` | `T[i]` | `P[j]` | `T[i] == P[j]`? | Action                                                               | `i` (new) | `j` (new) | Output |
| :-- | :-- | :----- | :----- | :-------------- | :------------------------------------------------------------------- | :-------- | :-------- | :----- |
| 0   | 0   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 1         | 1         |        |
| 1   | 1   | 'B'    | 'B'    | Yes             | `i++`, `j++`                                                         | 2         | 2         |        |
| 2   | 2   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 3         | 3         |        |
| 3   | 3   | 'B'    | 'B'    | Yes             | `i++`, `j++`                                                         | 4         | 4         |        |
| 4   | 4   | 'D'    | 'C'    | No              | `j \neq 0` (`j` is 4). `j = lps[j-1] = lps[3] = 2`.                  | 4         | 2         |        |
| 4   | 2   | 'D'    | 'A'    | No              | `j \neq 0` (`j` is 2). `j = lps[j-1] = lps[1] = 0`.                  | 4         | 0         |        |
| 4   | 0   | 'D'    | 'A'    | No              | `j == 0`. `i++`.                                                     | 5         | 0         |        |
| 5   | 0   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 6         | 1         |        |
| 6   | 1   | 'B'    | 'B'    | Yes             | `i++`, `j++`                                                         | 7         | 2         |        |
| 7   | 2   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 8         | 3         |        |
| 8   | 3   | 'C'    | 'B'    | No              | `j \neq 0` (`j` is 3). `j = lps[j-1] = lps[2] = 1`.                  | 8         | 1         |        |
| 8   | 1   | 'C'    | 'B'    | No              | `j \neq 0` (`j` is 1). `j = lps[j-1] = lps[0] = 0`.                  | 8         | 0         |        |
| 8   | 0   | 'C'    | 'A'    | No              | `j == 0`. `i++`.                                                     | 9         | 0         |        |
| 9   | 0   | 'D'    | 'A'    | No              | `j == 0`. `i++`.                                                     | 10        | 0         |        |
| 10  | 0   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 11        | 1         |        |
| 11  | 1   | 'B'    | 'B'    | Yes             | `i++`, `j++`                                                         | 12        | 2         |        |
| 12  | 2   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 13        | 3         |        |
| 13  | 3   | 'B'    | 'B'    | Yes             | `i++`, `j++`                                                         | 14        | 4         |        |
| 14  | 4   | 'C'    | 'C'    | Yes             | `i++`, `j++`                                                         | 15        | 5         |        |
| 15  | 5   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 16        | 6         |        |
| 16  | 6   | 'B'    | 'B'    | Yes             | `i++`, `j++`                                                         | 17        | 7         |        |
| 17  | 7   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 18        | 8         |        |
| 18  | 8   | 'B'    | 'B'    | Yes             | `i++`, `j++`                                                         | 19        | 9         |        |
|     | 9   |        |        | `j == m`        | Match found at $i-j = 19-9 = 10$. `j = lps[j-1] = lps[8] = 4`.         | 19        | 4         | **Match at index 10** |
| 19  | 4   |        |        | `i == n`        | Loop terminates.                                                     |           |           |        |

**Final Answer:** The pattern "ABABCABAB" is found at index **10**.

**Reflection:** This example demonstrates how KMP handles multiple mismatches effectively. When `T[4]` ('D') mismatches `P[4]` ('C'), KMP correctly uses `lps[3]=2` to shift the pattern such that `P[0...1]` ("AB") aligns with `T[2...3]` ("AB"). It then continues comparing `T[4]` with `P[2]`. This smart shifting prevents unnecessary re-comparisons of `T[0...3]`.

### ### Example 3: Harder Overlapping Matches
**Problem:** Find all occurrences of `PATTERN = "ABCA"` in `TEXT = "ABCABCA"`.

**Given:**
*   `TEXT = "ABCABCA"` ($n=7$)
*   `PATTERN = "ABCA"` ($m=4$)

**Want:** Starting indices of all matches.

**Step 1: Compute the LPS array for "ABCA"**

*   Initialize `lps` array of size 4 with `lps[0] = 0`.
*   `length = 0`, `i = 1`.

| `i` | `P[i]` | `P[length]` | `P[i] == P[length]`? | Action                                                                | `length` | `lps` array       |
| :-- | :----- | :---------- | :------------------- | :-------------------------------------------------------------------- | :------- | :---------------- |
| 0   | 'A'    |             |                      | `lps[0] = 0`                                                          | 0        | `[0, ?, ?, ?]`    |
| 1   | 'B'    | 'A'         | No                   | `length` is 0. `lps[1] = 0`, `i++` (to 2)                             | 0        | `[0, 0, ?, ?]`    |
| 2   | 'C'    | 'A'         | No                   | `length` is 0. `lps[2] = 0`, `i++` (to 3)                             | 0        | `[0, 0, 0, ?]`    |
| 3   | 'A'    | 'A'         | Yes                  | `length++` (to 1), `lps[3] = 1`, `i++` (to 4)                         | 1        | `[0, 0, 0, 1]`    |
| 4   |        |             |                      | `i` is now `m` (4), loop ends.                                        |          | `[0, 0, 0, 1]`    |

So, `lps = [0, 0, 0, 1]`.

**Step 2: Perform KMP Search**

*   Initialize `i = 0`, `j = 0`.

| `i` | `j` | `T[i]` | `P[j]` | `T[i] == P[j]`? | Action                                                               | `i` (new) | `j` (new) | Output |
| :-- | :-- | :----- | :----- | :-------------- | :------------------------------------------------------------------- | :-------- | :-------- | :----- |
| 0   | 0   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 1         | 1         |        |
| 1   | 1   | 'B'    | 'B'    | Yes             | `i++`, `j++`                                                         | 2         | 2         |        |
| 2   | 2   | 'C'    | 'C'    | Yes             | `i++`, `j++`                                                         | 3         | 3         |        |
| 3   | 3   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 4         | 4         |        |
|     | 4   |        |        | `j == m`        | Match found at $i-j = 4-4 = 0$. `j = lps[j-1] = lps[3] = 1`.         | 4         | 1         | **Match at index 0** |
| 4   | 1   | 'B'    | 'B'    | Yes             | `i++`, `j++`                                                         | 5         | 2         |        |
| 5   | 2   | 'C'    | 'C'    | Yes             | `i++`, `j++`                                                         | 6         | 3         |        |
| 6   | 3   | 'A'    | 'A'    | Yes             | `i++`, `j++`                                                         | 7         | 4         |        |
|     | 4   |        |        | `j == m`        | Match found at $i-j = 7-4 = 3$. `j = lps[j-1] = lps[3] = 1`.         | 7         | 1         | **Match at index 3** |
| 7   | 1   |        |        | `i == n`        | Loop terminates.                                                     |           |           |        |

**Final Answer:** The pattern "ABCA" is found at indices **0, 3**.

**Reflection:** This example is tricky because of the overlapping nature of the matches. After finding "ABCA" at index 0, the `lps[3]=1` correctly tells us that `P[0]` ('A') is the longest proper prefix of "ABCA" that is also a suffix. This means the pattern can be shifted such that `P[0]` aligns with `T[3]` ('A'), and we continue comparing from there. This allows KMP to find the second match starting at index 3 without re-examining `T[0...2]`.

### ### Example 4: No Match
**Problem:** Find all occurrences of `PATTERN = "PATTERN"` in `TEXT = "THIS IS A TEST"`.

**Given:**
*   `TEXT = "THIS IS A TEST"` ($n=14$)
*   `PATTERN = "PATTERN"` ($m=7$)

**Want:** Starting indices of all matches.

**Step 1: Compute the LPS array for "PATTERN"**

*   Initialize `lps` array of size 7 with `lps[0] = 0`.
*   `length = 0`, `i = 1`.

| `i` | `P[i]` | `P[length]` | `P[i] == P[length]`? | Action                                                                | `length` | `lps` array             |
| :-- | :----- | :---------- | :------------------- | :-------------------------------------------------------------------- | :------- | :---------------------- |
| 0   | 'P'    |             |                      | `lps[0] = 0`                                                          | 0        | `[0, ?, ?, ?, ?, ?, ?]` |
| 1   | 'A'    | 'P'         | No                   | `length` is 0. `lps[1] = 0`, `i++` (to 2)                             | 0        | `[0, 0, ?, ?, ?, ?, ?]` |
| 2   | 'T'    | 'P'         | No                   | `length` is 0. `lps[2] = 0`, `i++` (to 3)                             | 0        | `[0, 0, 0, ?, ?, ?, ?]` |
| 3   | 'T'    | 'P'         | No                   | `length` is 0. `lps[3] = 0`, `i++` (to 4)                             | 0        | `[0, 0, 0, 0, ?, ?, ?]` |
| 4   | 'E'    | 'P'         | No                   | `length` is 0. `lps[4] = 0`, `i++` (to 5)                             | 0        | `[0, 0, 0, 0, 0, ?, ?]` |
| 5   | 'R'    | 'P'         | No                   | `length` is 0. `lps[5] = 0`, `i++` (to 6)                             | 0        | `[0, 0, 0, 0, 0, 0, ?]` |
| 6   | 'N'    | 'P'         | No                   | `length` is 0. `lps[6] = 0`, `i++` (to 7)                             | 0        | `[0, 0, 0, 0, 0, 0, 0]` |
| 7   |        |             |                      | `i` is now `m` (7), loop ends.                                        |          | `[0, 0, 0, 0, 0, 0, 0]` |

So, `lps = [0, 0, 0, 0, 0, 0, 0]`. (This pattern has no repeating prefixes/suffixes, so its `lps` array is all zeros).

**Step 2: Perform KMP Search**

*   Initialize `i = 0`, `j = 0`.

| `i` | `j` | `T[i]` | `P[j]` | `T[i] == P[j]`? | Action                                                               | `i` (new) | `j` (new) | Output |
| :-- | :-- | :----- | :----- | :-------------- | :------------------------------------------------------------------- | :-------- | :-------- | :----- |
| 0   | 0   | 'T'    | 'P'    | No              | `j == 0`. `i++`.                                                     | 1         | 0         |        |
| 1   | 0   | 'H'    | 'P'    | No              | `j == 0`. `i++`.                                                     | 2         | 0         |        |
| 2   | 0   | 'I'    | 'P'    | No              | `j == 0`. `i++`.                                                     | 3         | 0         |        |
| 3   | 0   | 'S'    | 'P'    | No              | `j == 0`. `i++`.                                                     | 4         | 0         |        |
| 4   | 0   | ' '    | 'P'    | No              | `j == 0`. `i++`.                                                     | 5         | 0         |        |
| 5   | 0   | 'I'    | 'P'    | No              | `j == 0`. `i++`.                                                     | 6         | 0         |        |
| 6   | 0   | 'S'    | 'P'    | No              | `j == 0`. `i++`.                                                     | 7         | 0         |        |
| 7   | 0   | ' '    | 'P'    | No              | `j == 0`. `i++`.                                                     | 8         | 0         |        |
| 8   | 0   | 'A'    | 'P'    | No              | `j == 0`. `i++`.                                                     | 9         | 0         |        |
| 9   | 0   | ' '    | 'P'    | No              | `j == 0`. `i++`.                                                     | 10        | 0         |        |
| 10  | 0   | 'T'    | 'P'    | No              | `j == 0`. `i++`.                                                     | 11        | 0         |        |
| 11  | 0   | 'E'    | 'P'    | No              | `j == 0`. `i++`.                                                     | 12        | 0         |        |
| 12  | 0   | 'S'    | 'P'    | No              | `j == 0`. `i++`.                                                     | 13        | 0         |        |
| 13  | 0   | 'T'    | 'P'    | No              | `j == 0`. `i++`.                                                     | 14        | 0         |        |
| 14  | 0   |        |        | `i == n`        | Loop terminates.                                                     |           |           |        |

**Final Answer:** The pattern "PATTERN" is **not found** in the text.

**Reflection:** This example shows that KMP gracefully handles cases where there are no matches. Since the pattern "PATTERN" has no repeating prefixes/suffixes, its `lps` array is all zeros. This means every mismatch results in `j` being reset to 0, effectively making the search behave somewhat like a naive search (but still without `i` moving backward). The $O(N+M)$ complexity still holds, as each character in the text is visited once by `i`.

## 6. Common mistakes and traps

Students often stumble on these specific points when learning KMP:

1.  **Off-by-one errors in `lps` array indexing:** Confusing `lps[length]` with `lps[length-1]` or using `m` instead of `m-1` for array bounds. Remember `lps[k]` stores the length for the prefix `P[0...k]`.
2.  **Incorrectly handling `length = 0` or `j = 0` cases:** In both LPS computation and the search, the `if (length != 0)` or `if (j != 0)` conditions are critical. If `length` or `j` is already 0, there's no shorter prefix to fall back to, so the respective pointer must be handled differently (either `lps[i]=0` and `i++` for LPS, or `i++` for search).
3.  **Misunderstanding "proper prefix/suffix":** The definition of `lps[q]` is the length of the longest *proper* prefix of `P[0...q]` that is also a suffix. This means the prefix cannot be the entire `P[0...q]` itself. If `P[0...q]` is "AAAA" and its longest prefix that is also a suffix is "AAA", the length is 3, not 4.
4.  **Not resetting `j` properly after a full match:** When `j == m` (a full match is found), `j` must be set to `lps[j-1]` to continue searching for *overlapping* matches. Simply setting `j=0` would miss potential overlaps.
5.  **Confusing the `length` variable in LPS computation with `i` or `j` in the search:** While the logic is similar, `length` tracks the length of the prefix/suffix being considered *within the pattern itself*, whereas `i` and `j` track positions in the `TEXT` and `PATTERN` during the main search.
6.  **Believing `i` can move backward in the text:** A core invariant