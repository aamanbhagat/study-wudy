## 1. What it is — in plain English

Imagine you have a word, like "racecar." If you read it forwards, it's "racecar." If you read it backwards, it's still "racecar." Words or phrases that read the same forwards and backwards are called palindromes. "Madam" is another one. "Level" is another.

Now, imagine you have a much longer string of letters, say "banana." There are no palindromes in "banana" that are longer than a single letter (like 'a' or 'n'). But what about "babad"? Here, "bab" is a palindrome. "aba" is also a palindrome. The longest one is "bab" or "aba" (both length 3).

Manacher's algorithm is a clever trick for finding the *longest palindromic substring* within any given string, and it does it really, really fast. Think of it like a super-efficient detective that scans a long message and immediately spots the biggest symmetrical pattern. It's much faster than checking every single possible substring, which would take ages for very long messages.

The "trick" it uses is symmetry. If you've found a palindrome, say "level," and you're looking for others nearby, you don't need to re-check everything from scratch. Manacher's algorithm remembers what it already knows about palindromes it's found and uses that information to speed up finding new ones. It's like finding one mirror in a room and then using its reflection to quickly locate other mirrors without having to search every corner individually.

## 2. Why it matters — real-world applications

Manacher's algorithm, or the principles behind it, is surprisingly useful in various fields where efficient string processing is critical.

1.  **Bioinformatics and Genomics**: DNA and RNA sequences are long strings of nucleotides (A, T, C, G). Palindromic sequences (or "inverted repeats") within these strands often have significant biological functions, such as forming hairpin structures that regulate gene expression or acting as recognition sites for enzymes. Manacher's algorithm can rapidly identify these crucial palindromic regions in massive genomic datasets, aiding in disease research, drug discovery, and understanding genetic mechanisms.
2.  **Text Processing and Data Compression**: In applications like text editors, search engines, or data compression algorithms, identifying repetitive or symmetrical patterns can be highly beneficial. For instance, finding the longest palindromic substring might be a step in a more complex pattern recognition task, or it could be used in specialized compression schemes that exploit such structures. While not a primary compression algorithm itself, its ability to quickly find patterns can be a building block.
3.  **Computer Forensics and Malware Analysis**: When analyzing suspicious code or corrupted data, identifying unusual patterns can reveal hidden messages, obfuscated code, or data corruption. Palindromic sequences, even if not directly meaningful, might be part of a larger, complex encoding scheme or a unique identifier left by an attacker. Manacher's algorithm provides a fast way to scan large binary or text dumps for such specific structural properties.
4.  **Speech Recognition and Natural Language Processing (NLP)**: Although less direct, the underlying principles of pattern matching and leveraging symmetry are fundamental in NLP. For instance, in analyzing phonetics or prosody, identifying symmetrical patterns in sound waves or word sequences could be relevant. While Manacher's directly applies to character strings, the concept of efficiently identifying symmetrical structures has broader implications in processing sequential data.
5.  **Aerospace and Satellite Communication**: In deep-space communication, data integrity is paramount. Error detection and correction codes often involve complex mathematical structures. While Manacher's specifically finds text palindromes, the general idea of quickly verifying structural integrity or identifying specific patterns in a stream of data (which could be represented as a string of bits) could be adapted or inspire similar algorithms for signal processing and ensuring reliable transmission over vast distances.

## 3. Prerequisites — what you must know first

To fully grasp Manacher's algorithm, you should be comfortable with these fundamental computer science concepts:

*   **Strings and Characters**: How strings are represented in memory, indexing characters, string length.
*   **Arrays**: One-dimensional arrays, accessing elements by index, array bounds.
*   **Basic Algorithms**: Understanding what an algorithm is, how to write one, and how to think about problem-solving systematically.
*   **Brute-Force Palindrome Check**: The naive way to check if a string is a palindrome (read forwards == read backwards) and to find the longest palindrome (check all substrings).
*   **Time Complexity (Big O Notation)**: How to analyze and express the efficiency of an algorithm (e.g., $O(N)$, $O(N^2)$, $O(N \log N)$). Manacher's goal is to achieve $O(N)$.
*   **Dynamic Programming (Conceptual)**: While Manacher's isn't strictly DP, it shares the idea of storing previously computed results to avoid redundant calculations. Understanding memoization or tabulation helps appreciate its optimization.
*   **Symmetry**: A basic intuitive understanding of what symmetry means and how it can be exploited in problem-solving.
*   **Pointers/Indices**: How to manipulate indices to navigate through strings and arrays.

## 4. The core idea — step by step

Manacher's algorithm is designed to find the longest palindromic substring in $O(N)$ time, where $N$ is the length of the string. It achieves this by cleverly exploiting symmetry and reusing information from already found palindromes. The main challenges it addresses are:
1.  Handling both odd-length ("aba") and even-length ("abba") palindromes.
2.  Avoiding redundant checks by leveraging previously computed palindrome information.

Let's break down the core ideas.

### Step 1: Preprocessing the String

*   **Plain English Statement**: We modify the input string so that all palindromes, whether they were originally odd or even length, become odd-length palindromes in the new string. This simplifies the logic dramatically because we only need to worry about palindromes centered *between* characters or *on* characters, not both.
*   **Small Concrete Example**:
    *   Original: "aba"
    *   Transformed: "^#a#b#a#$"
    *   Original: "abba"
    *   Transformed: "^#a#b#b#a#$"
    *   We add a unique character (e.g., '#') between every character and at the beginning/end. We also add a special start character (e.g., '^') and end character (e.g., '$') to handle boundary conditions easily.
*   **Formal/Mathematical Version**:
    Given an input string $S$ of length $N$.
    Create a new string $T$ of length $2N + 3$.
    $T[0] = \text{'^'}$
    For $i = 0 \dots N-1$:
    $T[2i+1] = \text{'#'}$
    $T[2i+2] = S[i]$
    $T[2N+1] = \text{'#'}$
    $T[2N+2] = \text{'$'}$
    The length of $T$ is $N_T = 2N+3$.
*   **What could go wrong**: Forgetting the start/end sentinels (`^`, `$`) can lead to out-of-bounds errors when expanding palindromes. Using a character that might appear in the original string instead of `#` will break the algorithm.

### Step 2: The Palindrome Array (P array)

*   **Plain English Statement**: We'll create an array, let's call it `P`, which will store information about the palindromes we find. For each character in our *transformed* string, `P[i]` will tell us the "radius" of the longest palindrome centered at that character. The radius is how many characters extend to one side from the center, *including* the center character itself. So, if `P[i]=k`, the palindrome has length `2k+1`.
*   **Small Concrete Example**:
    *   Transformed string $T$: "^#a#b#a#$"
    *   Indices: 0 1 2 3 4 5 6 7 8
    *   Characters: ^ # a # b # a # $
    *   `P` array (what we want to compute):
        *   `P[0]=0` (center '^', radius 0)
        *   `P[1]=0` (center '#', radius 0)
        *   `P[2]=1` (center 'a', palindrome "#a#", radius 1)
        *   `P[3]=0` (center '#', radius 0)
        *   `P[4]=3` (center 'b', palindrome "#a#b#a#", radius 3)
        *   ...and so on.
*   **Formal/Mathematical Version**:
    Initialize an array $P$ of size $N_T$ with all zeros.
    $P[i]$ will store the radius of the longest palindromic substring centered at $T[i]$.
    The actual length of the palindrome centered at $T[i]$ is $2 \cdot P[i] + 1$.
*   **What could go wrong**: Confusing the radius $P[i]$ with the total length $2 \cdot P[i] + 1$. Misinterpreting what $P[i]$ refers to (it's for the *transformed* string, not the original).

### Step 3: Center and Right Boundary (C, R)

*   **Plain English Statement**: This is the core optimization. As we scan through the transformed string from left to right, we keep track of the *rightmost point* that any palindrome we've found so far reaches. We call this `R` (Right boundary). The center of that "furthest-reaching" palindrome is `C` (Center). This `C` and `R` define a known palindromic region `[C - P[C], C + P[C]]`. Everything within this region has a symmetrical counterpart.
*   **Small Concrete Example**:
    *   Let $T = \text{"^#a#b#a#$"}$.
    *   Initially, $C=0, R=0$.
    *   When we find the palindrome "#a#b#a#" centered at $T[4]$ ('b'), its radius is 3. So, $P[4]=3$.
    *   The palindrome extends from $T[4-3]=T[1]$ to $T[4+3]=T[7]$.
    *   So, we update $C=4$ and $R=4+3=7$.
    *   Now, for any index $i$ *before* or *at* $R$, we can potentially use the symmetry around $C$.
*   **Formal/Mathematical Version**:
    Initialize $C = 0$ (center of the palindrome that extends furthest right)
    Initialize $R = 0$ (rightmost boundary of that palindrome, $R = C + P[C]$)
    When iterating through $i$ from $1$ to $N_T - 2$:
    If $i > R$, then $C$ and $R$ need to be reset for this new, unexplored region.
    If $i \le R$, then $i$ is within a known palindrome, and we can use symmetry.
*   **What could go wrong**: Not understanding that $C$ and $R$ always refer to the *longest palindrome found so far that extends furthest to the right*. Forgetting to update $C$ and $R$ when a new, longer-reaching palindrome is found.

### Step 4: Leveraging Symmetry with the Mirror Index ($i_{mirror}$)

*   **Plain English Statement**: If our current index `i` is inside the `[C-R, C+R]` region (the region of the palindrome centered at `C` that reaches `R`), then there's a corresponding "mirror" index on the other side of `C`. The palindrome centered at `i` might be related to the palindrome centered at its mirror index. This is where we reuse information!
*   **Small Concrete Example**:
    *   Suppose $T = \text{"^#a#b#a#c#a#b#a#$"}$
    *   Let's say we're at $C=8$ (the 'c' character), and $P[8]=7$. So $R=8+7=15$. The palindrome is "^#a#b#a#c#a#b#a#$" (the whole thing).
    *   Now we want to find $P[i]$ for $i=9$.
    *   The mirror of $i=9$ with respect to $C=8$ is $i_{mirror} = 2 \cdot C - i = 2 \cdot 8 - 9 = 16 - 9 = 7$.
    *   So, the palindrome at $T[9]$ ('a') is likely related to the palindrome at $T[7]$ ('a').
*   **Formal/Mathematical Version**:
    For a current index $i$, its mirror index $i_{mirror}$ with respect to $C$ is given by:
    $$i_{mirror} = 2 \cdot C - i$$
    If $i \le R$, then $P[i]$ can be initialized using $P[i_{mirror}]$. Specifically, $P[i]$ can be at least $\min(P[i_{mirror}], R - i)$.
*   **What could go wrong**: Incorrectly calculating $i_{mirror}$. Not understanding *why* $i_{mirror}$ is relevant (it's because the region `[C-R, C+R]` is a palindrome, so its left half is a mirror of its right half).

### Step 5: The Three Cases for $P[i]$ Initialization

This is where the magic of reusing previous results happens. When we're calculating $P[i]$ for the current index $i$, and $i$ is *within* the current longest palindrome's boundary (i.e., $i < R$), we look at its mirror $i_{mirror}$. There are three main scenarios:

#### Case 1: Palindrome at $i_{mirror}$ is entirely contained within the $C$-palindrome.

*   **Plain English Statement**: If the palindrome centered at $i_{mirror}$ (on the left side of $C$) doesn't "touch" or "cross" the left boundary of the `C`-palindrome, then due to symmetry, the palindrome centered at `i` (on the right side of `C`) will have the exact same radius as $P[i_{mirror}]$. We can just copy its value.
*   **Small Concrete Example**:
    *   $T = \text{"^#a#b#a#c#a#b#a#$"}$ (length 17)
    *   Suppose $C=8$ (at 'c'), $P[8]=7$, so $R=15$. The full string is the palindrome.
    *   Current $i=9$ (at 'a'). $i_{mirror} = 2 \cdot 8 - 9 = 7$ (at 'a').
    *   $P[7]$ is 1 (palindrome "#a#").
    *   The left boundary of $C$-palindrome is $C-P[C] = 8-7 = 1$.
    *   The left boundary of $i_{mirror}$-palindrome is $i_{mirror} - P[i_{mirror}] = 7 - 1 = 6$.
    *   Since $6 > 1$, $P[i_{mirror}]$ is entirely within the $C$-palindrome.
    *   So, we can set $P[9] = P[7] = 1$.
*   **Formal/Mathematical Version**:
    If $i < R$ and $i_{mirror} - P[i_{mirror}] > C - P[C]$:
    Then set $P[i] = P[i_{mirror}]$.
*   **What could go wrong**: Misinterpreting "entirely contained." It means the *leftmost point* of the $i_{mirror}$-palindrome is to the *right* of the *leftmost point* of the $C$-palindrome.

#### Case 2: Palindrome at $i_{mirror}$ extends beyond the $C$-palindrome's left boundary.

*   **Plain English Statement**: If the palindrome centered at $i_{mirror}$ "spills over" the left boundary of the $C$-palindrome, then the symmetry is broken at that boundary. The palindrome centered at `i` cannot be a full copy of $P[i_{mirror}]$ because the $C$-palindrome itself ends there. So, the palindrome at `i` can only be as large as the distance from `i` to the current right boundary `R`.
*   **Small Concrete Example**:
    *   $T = \text{"^#a#b#a#c#a#b#a#$"}$
    *   Suppose $C=4$ (at 'b'), $P[4]=3$, so $R=7$. The palindrome is "#a#b#a#".
    *   Current $i=6$ (at 'a'). $i_{mirror} = 2 \cdot 4 - 6 = 2$ (at 'a').
    *   $P[2]$ is 1 (palindrome "#a#").
    *   The left boundary of $C$-palindrome is $C-P[C] = 4-3 = 1$.
    *   The left boundary of $i_{mirror}$-palindrome is $i_{mirror} - P[i_{mirror}] = 2 - 1 = 1$.
    *   Here, $P[i_{mirror}]$ *touches* or *extends beyond* $C-P[C]$.
    *   So, $P[6]$ can be at least $R - i = 7 - 6 = 1$.
*   **Formal/Mathematical Version**:
    If $i < R$ and $i_{mirror} - P[i_{mirror}] < C - P[C]$:
    Then set $P[i] = R - i$.
*   **What could go wrong**: Not understanding that the $C$-palindrome is the *limit* of our known symmetrical region. If the mirror palindrome extends beyond it, we can't trust that extension for `i`.

#### Case 3: Palindrome at $i_{mirror}$ touches the $C$-palindrome's left boundary.

*   **Plain English Statement**: This is a special case of "spilling over" where the $i_{mirror}$-palindrome exactly hits the left boundary of the $C$-palindrome. Similar to Case 2, the palindrome at `i` can be at least the distance from `i` to `R`. However, it *might* be longer, potentially extending beyond `R`. So, we initialize $P[i]$ to $R-i$ and then try to expand it further.
*   **Small Concrete Example**: (Same as Case 2 example, as it's often grouped)
    *   $T = \text{"^#a#b#a#c#a#b#a#$"}$
    *   Suppose $C=4$ (at 'b'), $P[4]=3$, so $R=7$. The palindrome is "#a#b#a#".
    *   Current $i=6$ (at 'a'). $i_{mirror} = 2 \cdot 4 - 6 = 2$ (at 'a').
    *   $P[2]$ is 1 (palindrome "#a#").
    *   The left boundary of $C$-palindrome is $C-P[C] = 4-3 = 1$.
    *   The left boundary of $i_{mirror}$-palindrome is $i_{mirror} - P[i_{mirror}] = 2 - 1 = 1$.
    *   Here, $i_{mirror} - P[i_{mirror}] = C - P[C]$.
    *   So, $P[6]$ is initialized to $R - i = 7 - 6 = 1$. Then we try to expand it.
*   **Formal/Mathematical Version**:
    If $i < R$ and $i_{mirror} - P[i_{mirror}] = C - P[C]$:
    Then set $P[i] = R - i$. (This is the minimum guarantee; we will expand further in the next step).
*   **What could go wrong**: Not realizing that even if it touches, we still only have a minimum guarantee and need to expand.

Combining these, the initialization for $P[i]$ for $i < R$ is generally $P[i] = \min(R - i, P[i_{mirror}])$. If $i \ge R$, we start $P[i]=0$.

### Step 6: Expanding and Updating C, R

*   **Plain English Statement**: After initializing $P[i]$ (or if $i$ is beyond $R$), we try to expand the palindrome centered at `i` outwards, one character at a time, as long as the characters match and we stay within string boundaries. If this expansion makes the palindrome centered at `i` extend further to the right than `R`, then `i` becomes our new `C`, and its new right boundary becomes our new `R`.
*   **Small Concrete Example**:
    *   $T = \text{"^#a#b#a#$"}$
    *   Suppose $i=4$ (at 'b'). We start $P[4]=0$.
    *   Check $T[4-1]$ ('#') and $T[4+1]$ ('#'). They match. $P[4]$ becomes 1.
    *   Check $T[4-2]$ ('a') and $T[4+2]$ ('a'). They match. $P[4]$ becomes 2.
    *   Check $T[4-3]$ ('#') and $T[4+3]$ ('#'). They match. $P[4]$ becomes 3.
    *   Check $T[4-4]$ ('^') and $T[4+4]$ ('$'). They don't match (and are sentinels). Stop.
    *   $P[4]$ is now 3.
    *   The right boundary of this palindrome is $4+3=7$.
    *   If current $R$ was less than 7, we update $C=4$ and $R=7$.
*   **Formal/Mathematical Version**:
    For each $i$ from $1$ to $N_T - 2$:
    1.  Calculate $i_{mirror} = 2 \cdot C - i$.
    2.  If $i < R$:
        $P[i] = \min(R - i, P[i_{mirror}])$.
    3.  Else ($i \ge R$):
        $P[i] = 0$.
    4.  **Expand**: While $T[i - 1 - P[i]] == T[i + 1 + P[i]]$:
        $P[i] = P[i] + 1$.
    5.  **Update C and R**: If $i + P[i] > R$:
        $C = i$
        $R = i + P[i]$
*   **What could go wrong**: Incorrectly checking boundaries during expansion (e.g., $i - 1 - P[i]$ or $i + 1 + P[i]$ going out of bounds of $T$). Not updating $C$ and $R$ correctly.

After iterating through all $i$, the maximum value in the $P$ array will tell us the radius of the longest palindrome in the *transformed* string. We can then use this to find the corresponding longest palindrome in the *original* string. The length of the longest palindrome in the original string will be $\max(P[i])$.

## 5. Worked examples — multiple, with every step shown

Let's apply Manacher's algorithm step-by-step. We'll track the transformed string $T$, the $P$ array, and the $C$ and $R$ values.
The maximum value in $P$ will be the length of the longest palindromic substring in the *original* string.

**Notation:**
*   $S$: Original string
*   $T$: Transformed string
*   $N$: Length of $S$
*   $N_T$: Length of $T$
*   $P[i]$: Radius of palindrome centered at $T[i]$
*   $C$: Center of the palindrome that extends furthest right
*   $R$: Right boundary of the palindrome centered at $C$ ($R = C + P[C]$)
*   $i_{mirror}$: Mirror index of $i$ with respect to $C$ ($i_{mirror} = 2 \cdot C - i$)

---

### Example 1: `S = "aba"`

**Problem:** Find the longest palindromic substring in "aba".
**Given:** $S = \text{"aba"}$
**Want:** Longest palindromic substring.

**Step 1: Preprocessing**
$S = \text{"aba"}$, $N=3$.
$T = \text{"^#a#b#a#$"}$
$N_T = 2 \cdot 3 + 3 = 9$.
Indices: `0 1 2 3 4 5 6 7 8`
Characters: `^ # a # b # a # $`

**Step 2: Initialize P array, C, R**
$P = [0, 0, 0, 0, 0, 0, 0, 0, 0]$ (size 9)
$C = 0$
$R = 0$
`max_len = 0` (stores max P[i] found)
`max_center_idx = 0` (stores index of center of max palindrome)

**Step 3: Iterate through T (from $i=1$ to $N_T-2=7$)**

*   **$i=1$**: $T[1] = \text{'#'}$
    *   $i \not< R$ (since $1 \not< 0$), so $P[1]=0$.
    *   **Expand**: $T[1-1-P[1]] = T[0] = \text{'^'}$, $T[1+1+P[1]] = T[2] = \text{'a'}$. Not equal. Stop.
    *   $P[1]=0$.
    *   **Update C, R**: $1+P[1] = 1+0=1$. $1 \not> R=0$. $C, R$ remain $0, 0$.
    *   $P = [0, \textbf{0}, 0, 0, 0, 0, 0, 0, 0]$

*   **$i=2$**: $T[2] = \text{'a'}$
    *   $i \not< R$ (since $2 \not< 0$), so $P[2]=0$.
    *   **Expand**:
        *   $P[2]=0$. Check $T[2-1-0]=T[1]=\text{'#'}$ and $T[2+1+0]=T[3]=\text{'#'}$. Match. $P[2]=1$.
        *   $P[2]=1$. Check $T[2-1-1]=T[0]=\text{'^'}$, $T[2+1+1]=T[4]=\text{'b'}$. Not equal. Stop.
    *   $P[2]=1$.
    *   **Update C, R**: $2+P[2] = 2+1=3$. $3 > R=0$. So, $C=2, R=3$.
    *   $P = [0, 0, \textbf{1}, 0, 0, 0, 0, 0, 0]$
    *   `max_len` = $\max(0, P[2]=1) = 1$. `max_center_idx` = 2.

*   **$i=3$**: $T[3] = \text{'#'}$
    *   $i < R$ (since $3 < 3$ is false, $i \not< R$). So $P[3]=0$.
    *   **Expand**: $T[3-1-0]=T[2]=\text{'a'}$, $T[3+1+0]=T[4]=\text{'b'}$. Not equal. Stop.
    *   $P[3]=0$.
    *   **Update C, R**: $3+P[3] = 3+0=3$. $3 \not> R=3$. $C, R$ remain $2, 3$.
    *   $P = [0, 0, 1, \textbf{0}, 0, 0, 0, 0, 0]$

*   **$i=4$**: $T[4] = \text{'b'}$
    *   $i \not< R$ (since $4 \not< 3$), so $P[4]=0$.
    *   **Expand**:
        *   $P[4]=0$. Check $T[4-1-0]=T[3]=\text{'#'}$ and $T[4+1+0]=T[5]=\text{'#'}$. Match. $P[4]=1$.
        *   $P[4]=1$. Check $T[4-1-1]=T[2]=\text{'a'}$ and $T[4+1+1]=T[6]=\text{'a'}$. Match. $P[4]=2$.
        *   $P[4]=2$. Check $T[4-1-2]=T[1]=\text{'#'}$ and $T[4+1+2]=T[7]=\text{'#'}$. Match. $P[4]=3$.
        *   $P[4]=3$. Check $T[4-1-3]=T[0]=\text{'^'}$, $T[4+1+3]=T[8]=\text{'$'}$. Not equal. Stop.
    *   $P[4]=3$.
    *   **Update C, R**: $4+P[4] = 4+3=7$. $7 > R=3$. So, $C=4, R=7$.
    *   $P = [0, 0, 1, 0, \textbf{3}, 0, 0, 0, 0]$
    *   `max_len` = $\max(1, P[4]=3) = 3$. `max_center_idx` = 4.

*   **$i=5$**: $T[5] = \text{'#'}$
    *   $i < R$ (since $5 < 7$). $i_{mirror} = 2 \cdot C - i = 2 \cdot 4 - 5 = 3$.
    *   $P[5] = \min(R-i, P[i_{mirror}]) = \min(7-5, P[3]) = \min(2, 0) = 0$.
    *   **Expand**: $T[5-1-0]=T[4]=\text{'b'}$, $T[5+1+0]=T[6]=\text{'a'}$. Not equal. Stop.
    *   $P[5]=0$.
    *   **Update C, R**: $5+P[5] = 5+0=5$. $5 \not> R=7$. $C, R$ remain $4, 7$.
    *   $P = [0, 0, 1, 0, 3, \textbf{0}, 0, 0, 0]$

*   **$i=6$**: $T[6] = \text{'a'}$
    *   $i < R$ (since $6 < 7$). $i_{mirror} = 2 \cdot C - i = 2 \cdot 4 - 6 = 2$.
    *   $P[6] = \min(R-i, P[i_{mirror}]) = \min(7-6, P[2]) = \min(1, 1) = 1$.
    *   **Expand**:
        *   $P[6]=1$. Check $T[6-1-1]=T[4]=\text{'b'}$ and $T[6+1+1]=T[8]=\text{'$'}$. Not equal. Stop.
    *   $P[6]=1$.
    *   **Update C, R**: $6+P[6] = 6+1=7$. $7 \not> R=7$. $C, R$ remain $4, 7$.
    *   $P = [0, 0, 1, 0, 3, 0, \textbf{1}, 0, 0]$

*   **$i=7$**: $T[7] = \text{'#'}$
    *   $i < R$ (since $7 < 7$ is false, $i \not< R$). So $P[7]=0$.
    *   **Expand**: $T[7-1-0]=T[6]=\text{'a'}$, $T[7+1+0]=T[8]=\text{'$'}$. Not equal. Stop.
    *   $P[7]=0$.
    *   **Update C, R**: $7+P[7] = 7+0=7$. $7 \not> R=7$. $C, R$ remain $4, 7$.
    *   $P = [0, 0, 1, 0, 3, 0, 1, \textbf{0}, 0]$

**Final P array:** $P = [0, 0, 1, 0, 3, 0, 1, 0, 0]$
**Max $P[i]$ value:** 3 (at index 4)
This means the longest palindrome in the transformed string has a radius of 3.
The length of the longest palindrome in the original string is `max_len = 3`.
The center in $T$ is $4$. The original string character is $T[4] = \text{'b'}$.
The palindrome in $T$ is $T[4-3 \dots 4+3] = T[1 \dots 7] = \text{"#a#b#a#"}$.
To get the original string: remove '#' and sentinels. This gives "aba".

**Final Answer:** The longest palindromic substring is **"aba"**.
**Reflection:** This example was straightforward. The `C` and `R` values updated only once to the center of the largest palindrome. Cases where `P[i]` is initialized from $P[i_{mirror}]$ were simple `min(R-i, P[i_mirror])` but didn't lead to much expansion.

---

### Example 2: `S = "abba"`

**Problem:** Find the longest palindromic substring in "abba".
**Given:** $S = \text{"abba"}$
**Want:** Longest palindromic substring.

**Step 1: Preprocessing**
$S = \text{"abba"}$, $N=4$.
$T = \text{"^#a#b#b#a#$"}$
$N_T = 2 \cdot 4 + 3 = 11$.
Indices: `0 1 2 3 4 5 6 7 8 9 10`
Characters: `^ # a # b # b # a # $`

**Step 2: Initialize P array, C, R**
$P = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]$ (size 11)
$C = 0$
$R = 0$
`max_len = 0`
`max_center_idx = 0`

**Step 3: Iterate through T (from $i=1$ to $N_T-2=9$)**

*   **$i=1$**: $T[1] = \text{'#'}$. $P[1]=0$. $C=0, R=0$.
    *   $P = [0, \textbf{0}, \dots]$
*   **$i=2$**: $T[2] = \text{'a'}$. $P[2]=1$. $C=2, R=3$.
    *   $P = [0, 0, \textbf{1}, \dots]$. `max_len=1`, `max_center_idx=2`.
*   **$i=3$**: $T[3] = \text{'#'}$. $P[3]=0$. $C=2, R=3$.
    *   $P = [0, 0, 1, \textbf{0}, \dots]$
*   **$i=4$**: $T[4] = \text{'b'}$
    *   $i \not< R$ (since $4 \not< 3$), so $P[4]=0$.
    *   **Expand**:
        *   $P[4]=0$. Check $T[3]=\text{'#'}$ and $T[5]=\text{'#'}$. Match. $P[4]=1$.
        *   $P[4]=1$. Check $T[2]=\text{'a'}$ and $T[6]=\text{'b'}$. Not equal. Stop.
    *   $P[4]=1$.
    *   **Update C, R**: $4+P[4] = 4+1=5$. $5 > R=3$. So, $C=4, R=5$.
    *   $P = [0, 0, 1, 0, \textbf{1}, 0, \dots]$. `max_len` remains 1.

*   **$i=5$**: $T[5] = \text{'#'}$
    *   $i < R$ (since $5 < 5$ is false, $i \not< R$). So $P[5]=0$.
    *   **Expand**:
        *   $P[5]=0$. Check $T[4]=\text{'b'}$ and $T[6]=\text{'b'}$. Match. $P[5]=1$.
        *   $P[5]=1$. Check $T[3]=\text{'#'}$ and $T[7]=\text{'#'}$. Match. $P[5]=2$.
        *   $P[5]=2$. Check $T[2]=\text{'a'}$ and $T[8]=\text{'a'}$. Match. $P[5]=3$.
        *   $P[5]=3$. Check $T[1]=\text{'#'}$ and $T[9]=\text{'#'}$. Match. $P[5]=4$.
        *   $P[5]=4$. Check $T[0]=\text{'^'}$ and $T[10]=\text{'$'}$. Not equal. Stop.
    *   $P[5]=4$.
    *   **Update C, R**: $5+P[5] = 5+4=9$. $9 > R=5$. So, $C=5, R=9$.
    *   $P = [0, 0, 1, 0, 1, \textbf{4}, 0, 0, 0, 0, 0]$. `max_len` = $\max(1, P[5]=4) = 4$. `max_center_idx` = 5.

*   **$i=6$**: $T[6] = \text{'b'}$
    *   $i < R$ (since $6 < 9$). $i_{mirror} = 2 \cdot C - i = 2 \cdot 5 - 6 = 4$.
    *   $P[6] = \min(R-i, P[i_{mirror}]) = \min(9-6, P[4]) = \min(3, 1) = 1$.
    *   **Expand**:
        *   $P[6]=1$. Check $T[6-1-1]=T[4]=\text{'b'}$ and $T[6+1+1]=T[8]=\text{'a'}$. Not equal. Stop.
    *   $P[6]=1$.
    *   **Update C, R**: $6+P[6] = 6+1=7$. $7 \not> R=9$. $C, R$ remain $5, 9$.
    *   $P = [0, 0, 1, 0, 1, 4, \textbf{1}, 0, 0, 0, 0]$

*   **$i=7$**: $T[7] = \text{'#'}$
    *   $i < R$ (since $7 < 9$). $i_{mirror} = 2 \cdot C - i = 2 \cdot 5 - 7 = 3$.
    *   $P[7] = \min(R-i, P[i_{mirror}]) = \min(9-7, P[3]) = \min(2, 0) = 0$.
    *   **Expand**:
        *   $P[7]=0$. Check $T[6]=\text{'b'}$ and $T[8]=\text{'a'}$. Not equal. Stop.
    *   $P[7]=0$.
    *   **Update C, R**: $7+P[7] = 7+0=7$. $7 \not> R=9$. $C, R$ remain $5, 9$.
    *   $P = [0, 0, 1, 0, 1, 4, 1, \textbf{0}, 0, 0, 0]$

*   **$i=8$**: $T[8] = \text{'a'}$
    *   $i < R$ (since $8 < 9$). $i_{mirror} = 2 \cdot C - i = 2 \cdot 5 - 8 = 2$.
    *   $P[8] = \min(R-i, P[i_{mirror}]) = \min(9-8, P[2]) = \min(1, 1) = 1$.
    *   **Expand**:
        *   $P[8]=1$. Check $T[8-1-1]=T[6]=\text{'b'}$ and $T[8+1+1]=T[10]=\text{'$'}$. Not equal. Stop.
    *   $P[8]=1$.
    *   **Update C, R**: $8+P[8] = 8+1=9$. $9 \not> R=9$. $C, R$ remain $5, 9$.
    *   $P = [0, 0, 1, 0, 1, 4, 1, 0, \textbf{1}, 0, 0]$

*   **$i=9$**: $T[9] = \text{'#'}$
    *   $i \not< R$ (since $9 \not< 9$), so $P[9]=0$.
    *   **Expand**: $T[8]=\text{'a'}$ and $T[10]=\text{'$'}$. Not equal. Stop.
    *   $P[9]=0$.
    *   **Update C, R**: $9+P[9] = 9+0=9$. $9 \not> R=9$. $C, R$ remain $5, 9$.
    *   $P = [0, 0, 1, 0, 1, 4, 1, 0, 1, \textbf{0}, 0]$

**Final P array:** $P = [0, 0, 1, 0, 1, 4, 1, 0, 1, 0, 0]$
**Max $P[i]$ value:** 4 (at index 5)
The length of the longest palindrome in the original string is `max_len = 4`.
The center in $T$ is $5$. The original string characters are $T[4]=\text{'b'}, T[6]=\text{'b'}$.
The palindrome in $T$ is $T[5-4 \dots 5+4] = T[1 \dots 9] = \text{"#a#b#b#a#"}$.
Removing '#' gives "abba".

**Final Answer:** The longest palindromic substring is **"abba"**.
**Reflection:** This example showed how an even-length palindrome in the original string becomes an odd-length palindrome centered on a '#' character in the transformed string. The `C` and `R` values updated significantly when the longest palindrome was found.

---

### Example 3: `S = "babcbab"`

**Problem:** Find the longest palindromic substring in "babcbab".
**Given:** $S = \text{"babcbab"}$
**Want:** Longest palindromic substring.

**Step 1: Preprocessing**
$S = \text{"babcbab"}$, $N=7$.
$T = \text{"^#b#a#b#c#b#a#b#$"}$
$N_T = 2 \cdot 7 + 3 = 17$.
Indices: `0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16`
Characters: `^ # b # a # b # c # b # a # b # $`

**Step 2: Initialize P array, C, R**
$P = [0 \dots 0]$ (size 17)
$C = 0, R = 0$
`max_len = 0`, `max_center_idx = 0`

**Step 3: Iterate through T (from $i=1$ to $N_T-2=15$)**

*   **$i=1$**: $T[1]=\text{'#'}$. $P[1]=0$. $C=0, R=0$.
*   **$i=2$**: $T[2]=\text{'b'}$. $P[2]=1$. $C=2, R=3$. `max_len=1`, `max_center_idx=2`.
*   **$i=3$**: $T[3]=\text{'#'}$. $P[3]=0$. $C=2, R=3$.
*   **$i=4$**: $T[4]=\text{'a'}$. $P[4]=1$. $C=4, R=5$. `max_len` remains 1.
*   **$i=5$**: $T[5]=\text{'#'}$. $P[5]=0$. $C=4, R=5$.
*   **$i=6$**: $T[6]=\text{'b'}$. $P[6]=1$. $C=6, R=7$. `max_len` remains 1.
*   **$i=7$**: $T[7]=\text{'#'}$. $P[7]=0$. $C=6, R=7$.
*   **$i=8$**: $T[8]=\text{'c'}$
    *   $i \not< R$ (since $8 \not< 7$), so $P[8]=0$.
    *   **Expand**:
        *   $P[8]=0$. Check $T[7]=\text{'#'}$ and $T[9]=\text{'#'}$. Match. $P[8]=1$.
        *   $P[8]=1$. Check $T[6]=\text{'b'}$ and $T[10]=\text{'b'}$. Match. $P[8]=2$.
        *   $P[8]=2$. Check $T[5]=\text{'#'}$ and $T[11]=\text{'#'}$. Match. $P[8]=3$.
        *   $P[8]=3$. Check $T[4]=\text{'a'}$ and $T[12]=\text{'a'}$. Match. $P[8]=4$.
        *   $P[8]=4$. Check $T[3]=\text{'#'}$ and $T[13]=\text{'#'}$. Match. $P[8]=5$.
        *   $P[8]=5$. Check $T[2]=\text{'b'}$ and $T[14]=\text{'b'}$. Match. $P[8]=6$.
        *   $P[8]=6$. Check $T[1]=\text{'#'}$ and $T[15]=\text{'#'}$. Match. $P[8]=7$.
        *   $P[8]=7$. Check $T[0]=\text{'^'}$ and $T[16]=\text{'$'}$. Not equal. Stop.
    *   $P[8]=7$.
    *   **Update C, R**: $8+P[8] = 8+7=15$. $15 > R=7$. So, $C=8, R=15$.
    *   $P = [\dots, \textbf{7}, \dots]$. `max_len` = $\max(1, P[8]=7) = 7$. `max_center_idx` = 8.

*   **$i=9$**: $T[9]=\text{'#'}$
    *   $i < R$ (since $9 < 15$). $i_{mirror} = 2 \cdot C - i = 2 \cdot 8 - 9 = 7$.
    *   $P[9] = \min(R-i, P[i_{mirror}]) = \min(15-9, P[7]) = \min(6, 0) = 0$.
    *   **Expand**: $T[8]=\text{'c'}$, $T[10]=\text{'b'}$. Not equal. Stop.
    *   $P[9]=0$.
    *   **Update C, R**: $9+P[9] = 9$. $9 \not> R=15$. $C, R$ remain $8, 15$.
    *   $P = [\dots, 7, \textbf{0}, \dots]$

*   **$i=10$**: $T[10]=\text{'b'}$
    *   $i < R$ (since $10 < 15$). $i_{mirror} = 2 \cdot C - i = 2 \cdot 8 - 10 = 6$.
    *   $P[10] = \min(R-i, P[i_{mirror}]) = \min(15-10, P[6]) = \min(5, 1) = 1$.
    *   **Expand**:
        *   $P[10]=1$. Check $T[10-1-1]=T[8]=\text{'c'}$ and $T[10+1+1]=T[12]=\text{'a'}$. Not equal. Stop.
    *   $P[10]=1$.
    *   **Update C, R**: $10+P[10] = 11$. $11 \not> R=15$. $C, R$ remain $8, 15$.
    *   $P = [\dots, 0, \textbf{1}, \dots]$

*   **$i=11$**: $T[11]=\text{'#'}$
    *   $i < R$ (since $11 < 15$). $i_{mirror} = 2 \cdot C - i = 2 \cdot 8 - 11 = 5$.
    *   $P[11] = \min(R-i, P[i_{mirror}]) = \min(15-11, P[5]) = \min(4, 0) = 0$.
    *   **Expand**: $T[10]=\text{'b'}$, $T[12]=\text{'a'}$. Not equal. Stop.
    *   $P[11]=0$.
    *   **Update C, R**: $11+P[11] = 11$. $11 \not> R=15$. $C, R$ remain $8, 15$.
    *   $P = [\dots, 1, \textbf{0}, \dots]$

*   **$i=12$**: $T[12]=\text{'a'}$
    *   $i < R$ (since $12 < 15$). $i_{mirror} = 2 \cdot C - i = 2 \cdot 8 - 12 = 4$.
    *   $P[12] = \min(R-i, P[i_{mirror}]) = \min(15-12, P[4]) = \min(3, 1) = 1$.
    *   **Expand**:
        *   $P[12]=1$. Check $T[12-1-1]=T[10]=\text{'b'}$ and $T[12+1+1]=T[14]=\text{'b'}$. Match. $P[12]=2$.
        *   $P[12]=2$. Check $T[12-1-2]=T[9]=\text{'#'}$ and $T[12+1+2]=T[15]=\text{'#'}$. Match. $P[12]=3$.
        *   $P[12]=3$. Check $T[12-1-3]=T[8]=\text{'c'}$ and $T[12+1+3]=T[16]=\text{'$'}$. Not equal. Stop.
    *   $P[12]=3$.
    *   **Update C, R**: $12+P[12] = 15$. $15 \not> R=15$. $C, R$ remain $8, 15$.
    *   $P = [\dots, 0, \textbf{3}, \dots]$

*   **$i=13$**: $T[13]=\text{'#'}$
    *   $i < R$ (since $13 < 15$). $i_{mirror} = 2 \cdot C - i = 2 \cdot 8 - 13 = 3$.
    *   $P[13] = \min(R-i, P[i_{mirror}]) = \min(15-13, P[3]) = \min(2, 0) = 0$.
    *   **Expand**: $T[12]=\text{'a'}$, $T[14]=\text{'b'}$. Not equal. Stop.
    *   $P[13]=0$.
    *   **Update C, R**: $13+P[13] = 13$. $13 \not> R=15$. $C, R$ remain $8, 15$.
    *   $P = [\dots, 3, \textbf{0}, \dots]$

*   **$i=14$**: $T[14]=\text{'b'}$
    *   $i < R$ (since $14 < 15$). $i_{mirror} = 2 \cdot C - i = 2 \cdot 8 - 14 = 2$.
    *   $P[14] = \min(R-i, P[i_{mirror}]) = \min(15-14, P[2]) = \min(1, 1) = 1$.
    *   **Expand**: $T[14-1-1]=T[12]=\text{'a'}$ and $T[14+1+1]=T[16]=\text{'$'}$. Not equal. Stop.
    *   $P[14]=1$.
    *   **Update C, R**: $14+P[14] = 15$. $15 \not> R=15$. $C, R$ remain $8, 15$.
    *   $P = [\dots, 0, \textbf{1}, \dots]$

*   **$i=15$**: $T[15]=\text{'#'}$
    *   $i \not< R$ (since $15 \not< 15$), so $P[15]=0$.
    *   **Expand**: $T[14]=\text{'b'}$ and $T[16]=\text{'$'}$. Not equal. Stop.
    *   $P[15]=0$.
    *   **Update C, R**: $15+P[15] = 15$. $15 \not> R=15$. $C, R$ remain $8, 15$.
    *   $P = [\dots, 1, \textbf{0}]$

**Final P array (partial, showing relevant parts):**
$P = [0,0,1,0,1,0,1,0,\textbf{7},0,1,0,3,0,1,0,0]$
**Max $P[i]$ value:** 7 (at index 8)
The length of the longest palindrome in the original string is `max_len = 7`.
The center in $T$ is $8$. $T[8]=\text{'c'}$.
The palindrome in $T$ is $T[8-7 \dots 8+7] = T[1 \dots 15] = \text{"#b#a#b#c#b#a#b#"}$.
Removing '#' gives "babcbab".

**Final Answer:** The longest palindromic substring is **"babcbab"**.
**Reflection:** This example demonstrates how the algorithm correctly identifies the entire string as a palindrome. The `max_len` was updated only once to the full length. The mirror logic worked for all subsequent indices, but no `P[i]` for $i > C$ exceeded $R-i$, so no further $C,R$ updates occurred after the initial discovery of the full palindrome.

---

### Example 4: `S = "abacaba"`

**Problem:** Find the longest palindromic substring in "abacaba".
**Given:** $S = \text{"abacaba"}$
**Want:** Longest palindromic substring.

**Step 1: Preprocessing**
$S = \text{"abacaba"}$, $N=7$.
$T = \text{"^#a#b#a#c#a#b#a#$"}$
$N_T = 2 \cdot 7 + 3 = 17$.
Indices: `0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16`
Characters: `^ # a # b # a # c # a # b # a # $`

**Step 2: Initialize P array, C, R**
$P = [0 \dots 0]$ (size 17)
$C = 0, R = 0$
`max_len = 0`, `max_center_idx = 0`

**Step 3: Iterate through T (from $i=1$ to $N_T-2=15$)**
(We'll skip initial small values of $P[i]$ and focus on $i$ around $C$ and $R$ updates)

...
*   **$i=1 \dots 7$**: Similar to previous examples, small palindromes are found.
    *   $P[2]=1, C=2, R=3$
    *   $P[4]=1, C=4, R=5$
    *   $P[6]=1, C=6, R=7$
    *   Current $P = [0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0]$
    *   Current $C=6, R=7$. `max_len=1`.

*   **$i=8$**: $T[8]=\text{'c'}$
    *   $i \not< R$ (since $8 \not< 7$), so $P[8]=0$.
    *   **Expand**:
        *   $P[8]=0$. Check $T[7]=\text{'#'}$ and $T[9]=\text{'#'}$. Match. $P[8]=1$.
        *   $P[8]=1$. Check $T[6]=\text{'a'}$ and $T[10]=\text{'a'}$. Match. $P[8]=2$.
        *   $P[8]=2$. Check $T[5]=\text{'#'}$ and $T[11]=\text{'#'}$. Match. $P[8]=3$.
        *   $P[8]=3$. Check $T[4]=\text{'b'}$ and $T[12]=\text{'b'}$. Match. $P[8]=4$.
        *   $P[8]=4$. Check $T[3]=\text{'#'}$ and $T[13]=\text{'#'}$. Match. $P[8]=5$.
        *   $P[8]=5$. Check $T[2]=\text{'a'}$ and $T[14]=\text{'a'}$. Match. $P[8]=6$.
        *   $P[8]=6$. Check $T[1]=\text{'#'}$ and $T[15]=\text{'#'}$. Match. $P[8]=7$.
        *   $P[8]=7$. Check $T[0]=\text{'^'}$ and $T[16]=\text{'$'}$. Not equal. Stop.
    *   $P[8]=7$.
    *   **Update C, R**: $8+P[8] = 8+7=15$. $15 > R=7$. So, $C=8, R=15$.
    *   $P = [\dots, 0, \textbf{7}, \dots]$. `max_len` = $\max(1, P[8]=7) = 7$. `max_center_idx` = 8.

*   **$i=9$**: $T[9]=\text{'#'}$
    *   $i < R$ (since $9 < 15$). $i_{mirror} = 2 \cdot C - i = 2 \cdot 8 - 9 = 7$.
    *   $P[9] = \min(R-i, P[i_{mirror}]) = \min(15-9, P[7]) = \min(6, 0) = 0$.
    *   **Expand**: $T[8]=\text{'c'}$, $T[10]=\text{'a'}$. Not equal. Stop.
    *   $P[9]=0$.
    *   **Update C, R**: $9+P[9] = 9$. $9 \not> R=15$. $C, R$ remain $8, 15$.

*   **$i=10$**: $T[10]=\text{'a'}$
    *   $i < R$ (since $10 < 15$). $i_{mirror} = 2 \cdot C - i = 2 \cdot 8 - 10 = 6$.
    *   $P[10] = \min(R-i, P[i_{mirror}]) = \min(15-10, P[6]) = \min(5, 1) = 1$.
    *   **Expand**:
        *   $P[10]=1