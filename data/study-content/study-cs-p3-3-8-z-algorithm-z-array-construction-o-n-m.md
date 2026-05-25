## 1. What it is — in plain English

Imagine you have a long word or a sentence. The Z-algorithm helps us find out how much of this word matches its own smaller pieces, starting from different points.

Let's say your word is "banana".
*   Does "banana" match "banana" starting from the very beginning? Yes, the whole word, 6 letters.
*   Does "banana" match "nana" (the piece starting from the second 'n')? No, "banana" starts with 'b', "nana" starts with 'n'. They don't match at all.
*   Does "banana" match "ana" (the piece starting from the first 'a')? Yes, "ana" matches "ana" (the first three letters of "banana"). So, 3 letters.

The Z-algorithm creates a special list of numbers, called a "Z-array." For each position in your word, this number tells you the length of the longest piece that starts at that position *and* is also a perfect match for the very beginning of the whole word.

Think of it like this: you have a master key (the whole word's beginning). For every door (every starting position in the word), you try to see how long a hallway you can unlock with that master key. The Z-array just stores how many rooms are in that longest hallway for each door. It's a clever trick to do this very quickly without having to re-check everything every time.

## 2. Why it matters — real-world applications

The Z-algorithm, while seemingly simple, is a powerful tool in string processing that underpins many advanced applications. Its efficiency (linear time) makes it suitable for large datasets.

1.  **Fast String Searching (Pattern Matching):** This is the most direct application. Imagine you have a massive text document (e.g., a genomic sequence, a log file, or a book) and you want to find all occurrences of a specific pattern (e.g., a gene sequence, an error code, or a specific phrase). The Z-algorithm can find all such occurrences in $O(|Text| + |Pattern|)$ time. This is used in text editors (like `grep` in Unix/Linux), search engines, and intrusion detection systems.
    *   *Example:* A cybersecurity firm uses the Z-algorithm to scan network traffic or system logs for known malicious string patterns (e.g., specific command injection attempts, malware signatures).
2.  **Bioinformatics and Genomics:** DNA and RNA sequences are essentially very long strings of characters (A, T, C, G). Biologists often need to find specific gene sequences, identify mutations, or compare different genomes. The Z-algorithm can efficiently locate occurrences of a shorter DNA segment (pattern) within a longer DNA strand (text), which is crucial for gene mapping, primer design, and evolutionary studies.
    *   *Example:* Researchers at a biotech company use it to quickly locate a specific gene sequence (e.g., for a disease marker) within a newly sequenced human genome, potentially millions or billions of characters long.
3.  **Data Compression:** Some compression algorithms leverage repeated patterns within data. By identifying long common prefixes between parts of a string and its beginning, the Z-algorithm can implicitly help in identifying these repetitions, which can then be encoded more efficiently. While not a compression algorithm itself, it provides fundamental building blocks for techniques like Lempel-Ziv variations.
    *   *Example:* A software company developing a new file compression utility might use string matching algorithms (which can be Z-algorithm based) to identify redundant data blocks for more efficient encoding.
4.  **Plagiarism Detection:** To detect plagiarism, systems often compare documents or parts of documents to a vast database of existing works. By treating documents as strings, algorithms like the Z-algorithm can quickly find sections that are identical or highly similar, indicating potential copying.
    *   *Example:* An online academic platform uses the Z-algorithm to compare submitted essays against a database of billions of web pages and previously submitted papers to identify verbatim or near-verbatim plagiarism.
5.  **Finding Periods of a String:** A string has a "period" if it can be formed by repeating a shorter string. For example, "abcabcabc" has a period "abc". The Z-algorithm can efficiently find all periods of a string. This has applications in signal processing (identifying repeating patterns in signals) and theoretical computer science.
    *   *Example:* In physics, analyzing a periodic signal (e.g., a wave pattern from a sensor) might involve finding the fundamental period of the string-representation of the signal data. The Z-algorithm could be used to efficiently identify these underlying repeating structures.

## 3. Prerequisites — what you must know first

Before diving deep into the Z-algorithm, ensure you have a solid grasp of these fundamental concepts:

*   **Strings and Characters:** Basic understanding of what a string is, individual characters, and how they are indexed (0-indexed or 1-indexed).
*   **Prefixes:** A prefix of a string is a substring that occurs at the beginning of the string. (e.g., "ap" is a prefix of "apple").
*   **Suffixes:** A suffix of a string is a substring that occurs at the end of the string. (e.g., "ple" is a suffix of "apple").
*   **Substrings:** Any contiguous sequence of characters within a string. (e.g., "ppl" is a substring of "apple").
*   **String Indexing:** How to access a character at a specific position in a string, e.g., `S[i]`.
*   **String Slicing/Substrings:** How to refer to a portion of a string, e.g., `S[i...j]` represents the substring from index `i` to `j` (inclusive).
*   **Basic Algorithm Analysis (Big O Notation):** Understanding of time complexity, particularly $O(N)$ for linear time, and why it's desirable.
*   **Arrays/Lists:** How to declare, initialize, and access elements in a one-dimensional array.

## 4. The core idea — step by step

The Z-algorithm computes the Z-array for a given string $S$ of length $N$. The Z-array, let's call it $Z$, is an array of length $N$ where $Z[i]$ stores the length of the longest common prefix (LCP) between $S$ and the suffix of $S$ starting at index $i$ (i.e., $S[i \dots N-1]$).

For $i=0$, $S[0 \dots N-1]$ is the entire string $S$. The LCP between $S$ and $S$ is $S$ itself, so $Z[0] = N$. This value is often treated as a special case and sometimes ignored in the algorithm's main loop, which focuses on $i > 0$. We will follow the convention of $Z[0]=N$ but start our main loop from $i=1$.

The naive approach to compute $Z[i]$ for each $i$ would be to simply compare $S[0]$ with $S[i]$, then $S[1]$ with $S[i+1]$, and so on, until a mismatch is found or the end of the string is reached. This would take $O(N)$ time for each $Z[i]$, leading to an overall $O(N^2)$ algorithm. The Z-algorithm optimizes this to $O(N)$ by cleverly reusing information from previously computed $Z$-values.

The core idea for optimization is to maintain a "Z-box" or "window" $[L, R]$, which represents the rightmost Z-box found so far. A "Z-box" is a substring $S[L \dots R]$ such that $S[L \dots R]$ matches $S[0 \dots R-L]$. In other words, $S[L \dots R]$ is a prefix of $S$ of length $R-L+1$.

### Step 1: Initialization

*   **Plain English:** We start by creating an empty list for our Z-values. We know the first value immediately.
*   **Example:** For string $S = \text{"abacaba"}$, length $N=7$.
    *   $Z = [?, ?, ?, ?, ?, ?, ?]$
*   **Formal/Mathematical:**
    Initialize an array $Z$ of size $N$.
    Set $Z[0] = N$.
    Initialize $L=0$, $R=0$. These represent the left and right boundaries of the current rightmost Z-box. Initially, no Z-box has been found for $i > 0$.
*   **What could go wrong:** Forgetting to initialize $Z[0]$ or setting it incorrectly. While $Z[0]$ is often ignored in the loop, defining it as $N$ is standard for consistency.

### Step 2: Iterating through the string

*   **Plain English:** We'll go through the string, character by character, starting from the second character (index 1), to calculate its Z-value.
*   **Example:** We'll calculate $Z[1]$, then $Z[2]$, up to $Z[N-1]$.
*   **Formal/Mathematical:**
    For $i$ from $1$ to $N-1$:
    $$ \text{for } i \in [1, N-1] \text{ do} $$
*   **What could go wrong:** Starting the loop from $i=0$ (which would recalculate $Z[0]$ unnecessarily) or going out of bounds ($i=N$).

### Step 3: Handling `i` outside the current Z-box (`i > R`)

*   **Plain English:** If our current position `i` is past the end of the rightmost Z-box we've found so far, we can't use any previous shortcuts. We have to start from scratch and compare characters one by one, just like the naive approach. If this new comparison finds a long match, it might become our new rightmost Z-box.
*   **Example:** Let $S = \text{"abacaba"}$.
    *   Initially, $L=0, R=0$.
    *   For $i=1$: $1 > R$ (1 > 0). So we compare $S[1 \dots]$ with $S[0 \dots]$.
        *   $S[1] = \text{'b'}$, $S[0] = \text{'a'}$. Mismatch.
        *   So, $Z[1]=0$.
        *   Since $i+Z[i]-1 = 1+0-1 = 0$, which is not greater than $R=0$, $L$ and $R$ remain $0,0$.
*   **Formal/Mathematical:**
    If $i > R$:
    $$ \text{if } i > R \text{ then} $$
        Perform a naive computation for $Z[i]$:
        Let $k = 0$.
        While $i+k < N$ and $S[k] == S[i+k]$:
            $k = k+1$.
        $Z[i] = k$.
        If $i+Z[i]-1 > R$: // If this new Z-box is the rightmost so far
            $L = i$
            $R = i+Z[i]-1$
    $$ \text{end if} $$
*   **What could go wrong:** Incorrectly updating $L$ and $R$. Remember, $L$ and $R$ only update if the new Z-box extends *further to the right* than the previous one.

### Step 4: Handling `i` inside the current Z-box (`i <= R`)

*   **Plain English:** If our current position `i` is *inside* the rightmost Z-box $[L, R]$, we can use a shortcut! We know that $S[L \dots R]$ matches $S[0 \dots R-L]$. This means the substring $S[i \dots R]$ must match the corresponding prefix $S[i-L \dots R-L]$. So, the Z-value for `i` will be *at least* the Z-value of its corresponding position in the prefix, $Z[i-L]$, but it cannot extend beyond $R$.
*   **Example:** Let $S = \text{"abacaba"}$.
    *   Suppose we are at $i=4$. And we have a Z-box $L=0, R=6$ (meaning $S[0 \dots 6]$ matches $S[0 \dots 6]$).
    *   $i=4$ is inside $[0, 6]$.
    *   The corresponding position in the prefix is $k' = i-L = 4-0 = 4$.
    *   We look at $Z[k'] = Z[4]$. Let's say $Z[4]$ was previously computed as $3$ (meaning $S[4 \dots 6]$ matches $S[0 \dots 2]$).
    *   The length of the remaining part of the current Z-box from `i` is $R-i+1 = 6-4+1 = 3$.
    *   Since $Z[k'] = 3$ is not less than $R-i+1 = 3$, we have to check for expansion.
*   **Formal/Mathematical:**
    If $i \le R$:
    $$ \text{if } i \le R \text{ then} $$
        Let $k' = i - L$. This is the corresponding index in the prefix $S[0 \dots R-L]$.
        The length of the part of the current Z-box from $i$ to $R$ is $len\_rem = R - i + 1$.
        There are two sub-cases:
        $$ k' = i - L $$
        $$ len\_rem = R - i + 1 $$
*   **What could go wrong:** Incorrectly calculating $k'$ or $len\_rem$, leading to wrong lookups or boundary checks.

### Step 5: Sub-case 4a: Z-value from prefix is smaller than remaining Z-box length

*   **Plain English:** If the Z-value at the corresponding position $k'$ is *smaller* than the length of the current Z-box from `i` to `R`, it means the match at $k'$ ends *within* the current Z-box. Because $S[L \dots R]$ matches $S[0 \dots R-L]$, and $S[k' \dots k'+Z[k']-1]$ matches $S[0 \dots Z[k']-1]$, it implies $S[i \dots i+Z[k']-1]$ matches $S[0 \dots Z[k']-1]$. Crucially, the character $S[k'+Z[k']]$ (which caused the mismatch for $Z[k']$) is within $S[0 \dots R-L]$, and it corresponds to $S[i+Z[k']]$. So, $S[i+Z[k']]$ will also cause a mismatch with $S[Z[k']]$. Thus, $Z[i]$ is exactly $Z[k']$. No further comparison or expansion is needed.
*   **Example:** $S = \text{"ababa"}$. Suppose $L=0, R=4$ (meaning $S[0 \dots 4]$ matches $S[0 \dots 4]$). We are at $i=2$.
    *   $k' = i-L = 2-0 = 2$.
    *   $Z[k'] = Z[2]$. If $Z[2]$ was calculated as $3$ (meaning $S[2 \dots 4]$ matches $S[0 \dots 2]$), which is "aba".
    *   $len\_rem = R-i+1 = 4-2+1 = 3$.
    *   Here, $Z[k'] = 3$ is not less than $len\_rem = 3$. This means this case is not met. We will go to Step 6.
    *   *Correct example for this case:* $S = \text{"abacaba"}$.
        *   $Z = [7, 0, 1, 0, 3, 0, 1]$ (after full computation)
        *   Let's trace when $i=6$. Suppose $L=4, R=6$ (meaning $S[4 \dots 6]$ = "aba" matches $S[0 \dots 2]$ = "aba").
        *   $k' = i-L = 6-4 = 2$.
        *   $Z[k'] = Z[2] = 1$ (meaning $S[2 \dots]$ matches $S[0]$ for length 1, 'a').
        *   $len\_rem = R-i+1 = 6-6+1 = 1$.
        *   Here, $Z[k'] = 1$ is NOT less than $len\_rem = 1$. So this case is not met.

    *   *Let's find a better example for this case:* $S = \text{"ababaa"}$.
        *   $Z = [6, 0, 3, 0, 1, 1]$ (after full computation)
        *   Let's trace when $i=4$. Suppose $L=2, R=4$ (meaning $S[2 \dots 4]$ = "baa" matches $S[0 \dots 2]$ = "aba"). This is wrong.
        *   Let's use $S = \text{"aabcaabx"}$.
            *   $Z = [8, 1, 0, 0, 3, 1, 0, 0]$ (after full computation)
            *   When $i=4$:
                *   $i > R$ (assuming $L=0, R=0$ initially).
                *   Naive computation: $S[4 \dots]$ is "caabx". $S[0 \dots]$ is "aabcaabx".
                *   $S[4]=\text{'c'}$, $S[0]=\text{'a'}$. Mismatch. So $Z[4]=0$.
                *   $L, R$ remain $0,0$.
            *   This is not a good example. The best way to illustrate this is during the worked examples. The core idea is that if $Z[k']$ is *strictly less* than the remaining length of the Z-box, then $Z[i]$ is simply $Z[k']$.

*   **Formal/Mathematical:**
    If $Z[k'] < len\_rem$:
    $$ \text{if } Z[k'] < len\_rem \text{ then} $$
        $Z[i] = Z[k']$.
    $$ \text{end if} $$
*   **What could go wrong:** Misinterpreting "strictly less than". If $Z[k']$ is equal to $len\_rem$, it means the match extends *exactly* to $R$, and we *must* check if it can extend further. This is the next case.

### Step 6: Sub-case 4b: Z-value from prefix is greater than or equal to remaining Z-box length

*   **Plain English:** If the Z-value at the corresponding position $k'$ is *greater than or equal to* the length of the current Z-box from `i` to `R`, it means the match at $k'$ extends *to or beyond* $R$. This means $S[i \dots R]$ definitely matches $S[0 \dots R-i]$. We can safely claim $Z[i]$ is *at least* $len\_rem$. But it might be longer! We need to perform additional comparisons starting from $S[R+1]$ and $S[R-i+1]$ to see how far the match actually extends. If this new match extends beyond $R$, we update $L$ and $R$.
*   **Example:** $S = \text{"ababa"}$.
    *   $Z = [5, ?, ?, ?, ?]$
    *   $L=0, R=0$.
    *   $i=1$: $1 > R$. Naive. $S[1 \dots]$ ("baba") vs $S[0 \dots]$ ("ababa"). Mismatch at first char. $Z[1]=0$. $L,R$ remain $0,0$.
    *   $Z = [5, 0, ?, ?, ?]$
    *   $i=2$: $2 > R$. Naive. $S[2 \dots]$ ("aba") vs $S[0 \dots]$ ("ababa"). Match "aba". $Z[2]=3$.
        *   $i+Z[i]-1 = 2+3-1 = 4$. This is $> R=0$. So update $L=2, R=4$.
    *   $Z = [5, 0, 3, ?, ?]$
    *   $i=3$: $3 \le R$ ($3 \le 4$).
        *   $k' = i-L = 3-2 = 1$.
        *   $Z[k'] = Z[1] = 0$.
        *   $len\_rem = R-i+1 = 4-3+1 = 2$.
        *   Here, $Z[k'] = 0 < len\_rem = 2$. This matches Step 5.
        *   So $Z[i] = Z[k'] = 0$.
        *   $i+Z[i]-1 = 3+0-1 = 2$. Not $> R=4$. $L, R$ remain $2,4$.
    *   $Z = [5, 0, 3, 0, ?]$
    *   $i=4$: $4 \le R$ ($4 \le 4$).
        *   $k' = i-L = 4-2 = 2$.
        *   $Z[k'] = Z[2] = 3$.
        *   $len\_rem = R-i+1 = 4-4+1 = 1$.
        *   Here, $Z[k'] = 3 \ge len\_rem = 1$. This matches Step 6!
        *   So, $Z[i]$ is at least $len\_rem = 1$. We need to expand.
        *   Current match length is $len\_rem = 1$.
        *   Compare $S[R+1]$ with $S[len\_rem]$.
        *   $R+1 = 5$. $len\_rem = 1$.
        *   $S[5]$ (out of bounds) vs $S[1]$ ('b').
        *   Since $S[5]$ is out of bounds, no further expansion.
        *   $Z[4]$ is $len\_rem = 1$.
        *   $i+Z[i]-1 = 4+1-1 = 4$. Not $> R=4$. $L, R$ remain $2,4$.
    *   $Z = [5, 0, 3, 0, 1]$
*   **Formal/Mathematical:**
    Else ($Z[k'] \ge len\_rem$):
    $$ \text{else if } Z[k'] \ge len\_rem \text{ then} $$
        Perform expansion from $R+1$:
        Let $match\_len = len\_rem$.
        While $R+1 < N$ and $S[match\_len] == S[R+1]$:
            $match\_len = match\_len + 1$.
            $R = R+1$. // Extend R for the current Z-box
        $Z[i] = match\_len$.
        If $i+Z[i]-1 > R$: // If this new Z-box is the rightmost so far
            $L = i$
            $R = i+Z[i]-1$
    $$ \text{end if} $$
    *Note*: The $R$ in the expansion loop refers to the *global* $R$ of the rightmost Z-box. When we find a new match that extends beyond the current global $R$, we update $L$ and $R$. The `match_len` is what we're building for `Z[i]`. The `R` in `S[R+1]` is the *current global R*. The `match_len` in `S[match_len]` is the length of the match found so far for $Z[i]$ (which corresponds to `S[0...match_len-1]`). This can be a bit confusing. A clearer way to write the expansion:
    Let $current\_match = len\_rem$.
    While $i + current\_match < N$ and $S[current\_match] == S[i + current\_match]$:
        $current\_match = current\_match + 1$.
    $Z[i] = current\_match$.
    If $i+Z[i]-1 > R$:
        $L = i$
        $R = i+Z[i]-1$
    This ensures `R` is always the rightmost boundary of the *global* Z-box.

*   **What could go wrong:** Confusing the index `k'` with `i`, or mismanaging the `L` and `R` pointers during expansion. The `R` pointer must be updated only if the *current* Z-value computation for `i` creates a new *rightmost* Z-box.

### Summary of the Algorithm:

1.  Initialize $Z[0] = N$.
2.  Initialize $L=0, R=0$.
3.  For $i$ from $1$ to $N-1$:
    *   If $i > R$: (Case 1: Outside current Z-box)
        *   Compute $Z[i]$ naively by comparing $S[k]$ with $S[i+k]$ for $k=0, 1, \dots$
        *   If $i+Z[i]-1 > R$, update $L=i, R=i+Z[i]-1$.
    *   Else ($i \le R$): (Case 2: Inside current Z-box)
        *   Let $k' = i - L$.
        *   Let $len\_rem = R - i + 1$.
        *   If $Z[k'] < len\_rem$: (Case 2a: Match from $k'$ ends within current Z-box)
            *   $Z[i] = Z[k']$.
        *   Else ($Z[k'] \ge len\_rem$): (Case 2b: Match from $k'$ extends to or beyond current Z-box)
            *   Set $Z[i] = len\_rem$.
            *   Expand $Z[i]$ further by comparing $S[len\_rem]$ with $S[i+len\_rem]$, $S[len\_rem+1]$ with $S[i+len\_rem+1]$, etc., until a mismatch or end of string.
            *   If $i+Z[i]-1 > R$, update $L=i, R=i+Z[i]-1$.

This approach ensures that each character comparison either contributes to advancing $i$ or advancing $R$. Since $R$ never decreases and can go up to $N-1$, and $i$ goes up to $N-1$, the total number of comparisons is $O(N)$.

## 5. Worked examples — multiple, with every step shown

We will use 0-indexed strings. $N$ is the length of string $S$.
$Z[0]$ is set to $N$. $L, R$ are initialized to $0, 0$.
The loop runs for $i$ from $1$ to $N-1$.

### Example 1: Simple string with distinct characters

**Problem:** Compute the Z-array for $S = \text{"abacaba"}$.

**Given:** $S = \text{"abacaba"}$, $N=7$.
**Want:** $Z = [Z[0], Z[1], \dots, Z[6]]$.

**Solution:**

1.  **Initialize:**
    *   $Z = [?, ?, ?, ?, ?, ?, ?]$
    *   $Z[0] = 7$ (length of $S$).
    *   $L = 0, R = 0$.
    *   Current $Z$: $[7, ?, ?, ?, ?, ?, ?]$

2.  **$i=1$**:
    *   Is $i > R$? Yes, $1 > 0$. So, naive computation.
    *   Compare $S[0 \dots]$ with $S[1 \dots]$:
        *   $S[0]=\text{'a'}$, $S[1]=\text{'b'}$. Mismatch.
    *   $Z[1] = 0$.
    *   Is $i+Z[i]-1 > R$? $1+0-1 = 0$. $0 \ngtr 0$. No update to $L, R$.
    *   Current $Z$: $[7, 0, ?, ?, ?, ?, ?]$
    *   $L=0, R=0$.

3.  **$i=2$**:
    *   Is $i > R$? Yes, $2 > 0$. So, naive computation.
    *   Compare $S[0 \dots]$ with $S[2 \dots]$:
        *   $S[0]=\text{'a'}$, $S[2]=\text{'a'}$. Match.
        *   $S[1]=\text{'b'}$, $S[3]=\text{'c'}$. Mismatch.
    *   $Z[2] = 1$.
    *   Is $i+Z[i]-1 > R$? $2+1-1 = 2$. $2 > 0$. Yes, update $L, R$.
    *   $L=2, R=2$.
    *   Current $Z$: $[7, 0, 1, ?, ?, ?, ?]$

4.  **$i=3$**:
    *   Is $i > R$? Yes, $3 > 2$. So, naive computation.
    *   Compare $S[0 \dots]$ with $S[3 \dots]$:
        *   $S[0]=\text{'a'}$, $S[3]=\text{'c'}$. Mismatch.
    *   $Z[3] = 0$.
    *   Is $i+Z[i]-1 > R$? $3+0-1 = 2$. $2 \ngtr 2$. No update to $L, R$.
    *   Current $Z$: $[7, 0, 1, 0, ?, ?, ?]$
    *   $L=2, R=2$.

5.  **$i=4$**:
    *   Is $i > R$? Yes, $4 > 2$. So, naive computation.
    *   Compare $S[0 \dots]$ with $S[4 \dots]$:
        *   $S[0]=\text{'a'}$, $S[4]=\text{'a'}$. Match.
        *   $S[1]=\text{'b'}$, $S[5]=\text{'b'}$. Match.
        *   $S[2]=\text{'a'}$, $S[6]=\text{'a'}$. Match.
        *   $S[3]=\text{'c'}$, $S[7]$ (out of bounds). End of string for $S[i \dots]$.
    *   $Z[4] = 3$.
    *   Is $i+Z[i]-1 > R$? $4+3-1 = 6$. $6 > 2$. Yes, update $L, R$.
    *   $L=4, R=6$.
    *   Current $Z$: $[7, 0, 1, 0, 3, ?, ?]$

6.  **$i=5$**:
    *   Is $i > R$? No, $5 \le 6$. Use Z-box optimization.
    *   $k' = i - L = 5 - 4 = 1$.
    *   $len\_rem = R - i + 1 = 6 - 5 + 1 = 2$.
    *   $Z[k'] = Z[1] = 0$.
    *   Is $Z[k'] < len\_rem$? Yes, $0 < 2$. (Case 2a)
    *   $Z[5] = Z[k'] = 0$.
    *   Is $i+Z[i]-1 > R$? $5+0-1 = 4$. $4 \ngtr 6$. No update to $L, R$.
    *   Current $Z$: $[7, 0, 1, 0, 3, 0, ?]$
    *   $L=4, R=6$.

7.  **$i=6$**:
    *   Is $i > R$? No, $6 \le 6$. Use Z-box optimization.
    *   $k' = i - L = 6 - 4 = 2$.
    *   $len\_rem = R - i + 1 = 6 - 6 + 1 = 1$.
    *   $Z[k'] = Z[2] = 1$.
    *   Is $Z[k'] < len\_rem$? No, $1 \not< 1$. (Case 2b: $Z[k'] \ge len\_rem$)
    *   Set $Z[6] = len\_rem = 1$.
    *   Expand $Z[6]$:
        *   Current match for $Z[6]$ is $1$.
        *   Compare $S[1]$ with $S[6+1]$ ($S[7]$, out of bounds).
    *   Expansion stops. $Z[6]$ remains $1$.
    *   Is $i+Z[i]-1 > R$? $6+1-1 = 6$. $6 \ngtr 6$. No update to $L, R$.
    *   Current $Z$: $[7, 0, 1, 0, 3, 0, 1]$
    *   $L=4, R=6$.

**Final Answer:**
$$ \boxed{Z = [7, 0, 1, 0, 3, 0, 1]} $$

**Reflection:** This example primarily showcased the naive computation and the first sub-case ($Z[k'] < len\_rem$). The last step for $i=6$ involved the second sub-case ($Z[k'] \ge len\_rem$) but the expansion immediately stopped due to string boundary.

### Example 2: String with many repetitions

**Problem:** Compute the Z-array for $S = \text{"aaaaa"}$.

**Given:** $S = \text{"aaaaa"}$, $N=5$.
**Want:** $Z = [Z[0], Z[1], \dots, Z[4]]$.

**Solution:**

1.  **Initialize:**
    *   $Z = [?, ?, ?, ?, ?]$
    *   $Z[0] = 5$.
    *   $L = 0, R = 0$.
    *   Current $Z$: $[5, ?, ?, ?, ?]$

2.  **$i=1$**:
    *   Is $i > R$? Yes, $1 > 0$. Naive computation.
    *   Compare $S[0 \dots]$ with $S[1 \dots]$:
        *   $S[0]=\text{'a'}$, $S[1]=\text{'a'}$. Match.
        *   $S[1]=\text{'a'}$, $S[2]=\text{'a'}$. Match.
        *   $S[2]=\text{'a'}$, $S[3]=\text{'a'}$. Match.
        *   $S[3]=\text{'a'}$, $S[4]=\text{'a'}$. Match.
        *   $S[4]=\text{'a'}$, $S[5]$ (out of bounds). End of string for $S[i \dots]$.
    *   $Z[1] = 4$.
    *   Is $i+Z[i]-1 > R$? $1+4-1 = 4$. $4 > 0$. Yes, update $L, R$.
    *   $L=1, R=4$.
    *   Current $Z$: $[5, 4, ?, ?, ?]$

3.  **$i=2$**:
    *   Is $i > R$? No, $2 \le 4$. Use Z-box optimization.
    *   $k' = i - L = 2 - 1 = 1$.
    *   $len\_rem = R - i + 1 = 4 - 2 + 1 = 3$.
    *   $Z[k'] = Z[1] = 4$.
    *   Is $Z[k'] < len\_rem$? No, $4 \not< 3$. (Case 2b: $Z[k'] \ge len\_rem$)
    *   Set $Z[2] = len\_rem = 3$.
    *   Expand $Z[2]$:
        *   Current match for $Z[2]$ is $3$.
        *   Compare $S[3]$ with $S[2+3]$ ($S[5]$, out of bounds).
    *   Expansion stops. $Z[2]$ remains $3$.
    *   Is $i+Z[i]-1 > R$? $2+3-1 = 4$. $4 \ngtr 4$. No update to $L, R$.
    *   Current $Z$: $[5, 4, 3, ?, ?]$
    *   $L=1, R=4$.

4.  **$i=3$**:
    *   Is $i > R$? No, $3 \le 4$. Use Z-box optimization.
    *   $k' = i - L = 3 - 1 = 2$.
    *   $len\_rem = R - i + 1 = 4 - 3 + 1 = 2$.
    *   $Z[k'] = Z[2] = 3$.
    *   Is $Z[k'] < len\_rem$? No, $3 \not< 2$. (Case 2b: $Z[k'] \ge len\_rem$)
    *   Set $Z[3] = len\_rem = 2$.
    *   Expand $Z[3]$:
        *   Current match for $Z[3]$ is $2$.
        *   Compare $S[2]$ with $S[3+2]$ ($S[5]$, out of bounds).
    *   Expansion stops. $Z[3]$ remains $2$.
    *   Is $i+Z[i]-1 > R$? $3+2-1 = 4$. $4 \ngtr 4$. No update to $L, R$.
    *   Current $Z$: $[5, 4, 3, 2, ?]$
    *   $L=1, R=4$.

5.  **$i=4$**:
    *   Is $i > R$? No, $4 \le 4$. Use Z-box optimization.
    *   $k' = i - L = 4 - 1 = 3$.
    *   $len\_rem = R - i + 1 = 4 - 4 + 1 = 1$.
    *   $Z[k'] = Z[3] = 2$.
    *   Is $Z[k'] < len\_rem$? No, $2 \not< 1$. (Case 2b: $Z[k'] \ge len\_rem$)
    *   Set $Z[4] = len\_rem = 1$.
    *   Expand $Z[4]$:
        *   Current match for $Z[4]$ is $1$.
        *   Compare $S[1]$ with $S[4+1]$ ($S[5]$, out of bounds).
    *   Expansion stops. $Z[4]$ remains $1$.
    *   Is $i+Z[i]-1 > R$? $4+1-1 = 4$. $4 \ngtr 4$. No update to $L, R$.
    *   Current $Z$: $[5, 4, 3, 2, 1]$
    *   $L=1, R=4$.

**Final Answer:**
$$ \boxed{Z = [5, 4, 3, 2, 1]} $$

**Reflection:** This example demonstrates how the algorithm correctly handles highly repetitive strings. For all $i > L$, it falls into Case 2b, where the match from $Z[k']$ is long enough to cover the remaining Z-box, but the expansion part quickly stops due to reaching the end of the string. The $L, R$ window remains fixed after $i=1$ because subsequent $Z[i]$ values don't extend further than $R=4$.

### Example 3: String requiring expansion within a Z-box

**Problem:** Compute the Z-array for $S = \text{"ababaa"}$.

**Given:** $S = \text{"ababaa"}$, $N=6$.
**Want:** $Z = [Z[0], Z[1], \dots, Z[5]]$.

**Solution:**

1.  **Initialize:**
    *   $Z = [?, ?, ?, ?, ?, ?]$
    *   $Z[0] = 6$.
    *   $L = 0, R = 0$.
    *   Current $Z$: $[6, ?, ?, ?, ?, ?]$

2.  **$i=1$**:
    *   Is $i > R$? Yes, $1 > 0$. Naive computation.
    *   Compare $S[0 \dots]$ with $S[1 \dots]$:
        *   $S[0]=\text{'a'}$, $S[1]=\text{'b'}$. Mismatch.
    *   $Z[1] = 0$.
    *   Is $i+Z[i]-1 > R$? $1+0-1 = 0$. $0 \ngtr 0$. No update to $L, R$.
    *   Current $Z$: $[6, 0, ?, ?, ?, ?]$
    *   $L=0, R=0$.

3.  **$i=2$**:
    *   Is $i > R$? Yes, $2 > 0$. Naive computation.
    *   Compare $S[0 \dots]$ with $S[2 \dots]$:
        *   $S[0]=\text{'a'}$, $S[2]=\text{'a'}$. Match.
        *   $S[1]=\text{'b'}$, $S[3]=\text{'b'}$. Match.
        *   $S[2]=\text{'a'}$, $S[4]=\text{'a'}$. Match.
        *   $S[3]=\text{'b'}$, $S[5]=\text{'a'}$. Mismatch.
    *   $Z[2] = 3$.
    *   Is $i+Z[i]-1 > R$? $2+3-1 = 4$. $4 > 0$. Yes, update $L, R$.
    *   $L=2, R=4$.
    *   Current $Z$: $[6, 0, 3, ?, ?, ?]$

4.  **$i=3$**:
    *   Is $i > R$? No, $3 \le 4$. Use Z-box optimization.
    *   $k' = i - L = 3 - 2 = 1$.
    *   $len\_rem = R - i + 1 = 4 - 3 + 1 = 2$.
    *   $Z[k'] = Z[1] = 0$.
    *   Is $Z[k'] < len\_rem$? Yes, $0 < 2$. (Case 2a)
    *   $Z[3] = Z[k'] = 0$.
    *   Is $i+Z[i]-1 > R$? $3+0-1 = 2$. $2 \ngtr 4$. No update to $L, R$.
    *   Current $Z$: $[6, 0, 3, 0, ?, ?]$
    *   $L=2, R=4$.

5.  **$i=4$**:
    *   Is $i > R$? No, $4 \le 4$. Use Z-box optimization.
    *   $k' = i - L = 4 - 2 = 2$.
    *   $len\_rem = R - i + 1 = 4 - 4 + 1 = 1$.
    *   $Z[k'] = Z[2] = 3$.
    *   Is $Z[k'] < len\_rem$? No, $3 \not< 1$. (Case 2b: $Z[k'] \ge len\_rem$)
    *   Set $Z[4] = len\_rem = 1$.
    *   Expand $Z[4]$:
        *   Current match for $Z[4]$ is $1$.
        *   Compare $S[1]$ with $S[4+1]$ ($S[5]$).
        *   $S[1]=\text{'b'}$, $S[5]=\text{'a'}$. Mismatch.
    *   Expansion stops. $Z[4]$ remains $1$.
    *   Is $i+Z[i]-1 > R$? $4+1-1 = 4$. $4 \ngtr 4$. No update to $L, R$.
    *   Current $Z$: $[6, 0, 3, 0, 1, ?]$
    *   $L=2, R=4$.

6.  **$i=5$**:
    *   Is $i > R$? Yes, $5 > 4$. Naive computation.
    *   Compare $S[0 \dots]$ with $S[5 \dots]$:
        *   $S[0]=\text{'a'}$, $S[5]=\text{'a'}$. Match.
        *   $S[1]=\text{'b'}$, $S[6]$ (out of bounds). End of string for $S[i \dots]$.
    *   $Z[5] = 1$.
    *   Is $i+Z[i]-1 > R$? $5+1-1 = 5$. $5 > 4$. Yes, update $L, R$.
    *   $L=5, R=5$.
    *   Current $Z$: $[6, 0, 3, 0, 1, 1]$

**Final Answer:**
$$ \boxed{Z = [6, 0, 3, 0, 1, 1]} $$

**Reflection:** This example shows a case ($i=4$) where $Z[k'] \ge len\_rem$, but the expansion phase immediately finds a mismatch, so $Z[i]$ simply becomes $len\_rem$. It also shows $L, R$ being updated again at the very end ($i=5$) when a new rightmost Z-box is found.

### Example 4: String with complex overlaps

**Problem:** Compute the Z-array for $S = \text{"ababaaba"}$.

**Given:** $S = \text{"ababaaba"}$, $N=8$.
**Want:** $Z = [Z[0], Z[1], \dots, Z[7]]$.

**Solution:**

1.  **Initialize:**
    *   $Z = [?, ?, ?, ?, ?, ?, ?, ?]$
    *   $Z[0] = 8$.
    *   $L = 0, R = 0$.
    *   Current $Z$: $[8, ?, ?, ?, ?, ?, ?, ?]$

2.  **$i=1$**:
    *   $i > R$ ($1 > 0$). Naive.
    *   $S[0]=\text{'a'}, S[1]=\text{'b'}$. Mismatch.
    *   $Z[1] = 0$.
    *   $1+0-1 = 0 \ngtr 0$. $L, R$ remain $0,0$.
    *   Current $Z$: $[8, 0, ?, ?, ?, ?, ?, ?]$

3.  **$i=2$**:
    *   $i > R$ ($2 > 0$). Naive.
    *   $S[0 \dots]$ vs $S[2 \dots]$: $S[0]=\text{'a'}, S[2]=\text{'a'}$. Match.
    *   $S[1]=\text{'b'}, S[3]=\text{'b'}$. Match.
    *   $S[2]=\text{'a'}, S[4]=\text{'a'}$. Match.
    *   $S[3]=\text{'b'}, S[5]=\text{'a'}$. Mismatch.
    *   $Z[2] = 3$.
    *   $2+3-1 = 4$. $4 > 0$. Update $L=2, R=4$.
    *   Current $Z$: $[8, 0, 3, ?, ?, ?, ?, ?]$

4.  **$i=3$**:
    *   $i \le R$ ($3 \le 4$). Z-box optimization.
    *   $k' = i - L = 3 - 2 = 1$.
    *   $len\_rem = R - i + 1 = 4 - 3 + 1 = 2$.
    *   $Z[k'] = Z[1] = 0$.
    *   Is $Z[k'] < len\_rem$? Yes, $0 < 2$. (Case 2a)
    *   $Z[3] = Z[k'] = 0$.
    *   $3+0-1 = 2 \ngtr 4$.