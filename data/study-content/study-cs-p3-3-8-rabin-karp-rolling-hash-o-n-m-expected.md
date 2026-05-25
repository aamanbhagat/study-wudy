## 1. What it is — in plain English

Imagine you have a very long book, and you're looking for every instance of a specific short phrase, like "the quick brown fox". A really slow way to do this would be to take your phrase, go to the very beginning of the book, compare the first letter, then the second, and so on. If it matches, great! If not, you'd slide your phrase over just one letter, and start comparing all over again from scratch. This is like checking every single possible starting point, character by character.

The Rabin-Karp algorithm offers a smarter way. Instead of comparing whole phrases character by character every time, it uses a "fingerprint" for each phrase. Think of it like this: every phrase in the book gets a unique, short code number (its fingerprint). When you want to find "the quick brown fox", you first calculate *its* fingerprint. Then, you scan through the book, calculating the fingerprint for each possible phrase-sized chunk. If a chunk's fingerprint matches your target phrase's fingerprint, then you know you *might* have found it.

The real magic is in how it calculates these fingerprints efficiently. As you slide your "phrase-sized window" one character to the right in the book, you don't recalculate the entire new fingerprint from scratch. Instead, you "roll" the old fingerprint: you quickly remove the contribution of the character that just left the window and add the contribution of the new character that just entered. This "rolling hash" technique makes the process incredibly fast on average, allowing you to quickly scan through even massive amounts of text.

## 2. Why it matters — real-world applications

Rabin-Karp is a powerful tool because it offers a good balance of simplicity and performance for string matching, especially when dealing with large texts or multiple patterns.

1.  **Plagiarism Detection Software:** Companies like Turnitin use algorithms similar to Rabin-Karp to quickly compare student submissions against vast databases of existing papers, articles, and websites. By hashing chunks of text, they can rapidly identify sections that are identical or very similar, flagging potential plagiarism without needing to perform exhaustive character-by-character comparisons for every possible phrase.

2.  **File Synchronization and Deduplication (e.g., rsync):** Tools that synchronize files across networks or identify duplicate files often use rolling hashes. Instead of comparing entire files, which can be huge, they compute hashes of fixed-size blocks of data. If a block's hash is the same, there's a high probability the blocks are identical, saving bandwidth and storage. This is crucial for efficient backups and distributed file systems.

3.  **Network Intrusion Detection Systems (NIDS):** NIDS inspect network traffic for known malicious patterns (signatures) within data packets. Rabin-Karp can be used to scan incoming packet payloads for specific byte sequences that indicate malware, viruses, or attack attempts. Its speed is critical here, as network traffic flows at very high rates.

4.  **Bioinformatics (DNA Sequence Analysis):** In genomics, researchers often need to find specific DNA sequences (patterns) within much longer DNA strands (texts). Rabin-Karp can accelerate this process, for example, when searching for gene markers or regulatory elements. The "characters" here are the nucleotide bases (A, T, C, G).

5.  **Spam Filtering:** Email providers might use rolling hashes to detect spam. By hashing common spam phrases or unique patterns within known spam emails, they can quickly identify and filter out unsolicited messages, even if they have minor variations.

## 3. Prerequisites — what you must know first

To fully grasp Rabin-Karp, you should be comfortable with these fundamental concepts:

*   **String Matching (Basic Problem):** Understanding the goal of finding occurrences of a smaller string (pattern) within a larger string (text).
*   **Hashing:** The general concept of mapping data of arbitrary size to a fixed-size value (a "hash value" or "fingerprint"). You should know that hash collisions (different inputs producing the same hash) are possible.
*   **Modular Arithmetic:** Performing arithmetic operations (addition, subtraction, multiplication) within a fixed range, typically by taking the remainder after division by a modulus. This is essential for keeping hash values manageable and preventing integer overflow.
*   **Polynomial Hashing:** A specific type of hash function where each character in a string is treated as a digit in a base-$b$ number, and the hash is the value of this number modulo some prime $M$.
*   **Time Complexity Analysis (Big O Notation):** How to analyze the efficiency of algorithms, particularly understanding $O(n)$, $O(m)$, and $O(n+m)$ for text length $n$ and pattern length $m$. You should know the difference between average-case and worst-case complexity.

## 4. The core idea — step by step

Let's break down the Rabin-Karp algorithm into its fundamental components.

### Step 1: The Problem Definition

*   **Plain English:** We're given two strings: a long one called the "text" and a shorter one called the "pattern". Our job is to find all places in the text where the pattern appears.
*   **Concrete Example:**
    *   Text: "ABRACADABRA"
    *   Pattern: "BRA"
    *   We want to find all starting indices in "ABRACADABRA" where "BRA" occurs. (In this case, at index 1 and index 8).
*   **Formal/Mathematical Version:** Given a text $T[0 \dots n-1]$ of length $n$ and a pattern $P[0 \dots m-1]$ of length $m$, find all indices $i$ such that $T[i \dots i+m-1] = P$.
*   **What could go wrong:** A naive approach would compare $P$ with $T[0 \dots m-1]$, then $P$ with $T[1 \dots m]$, and so on. This takes $O(m)$ comparisons for each of the $O(n)$ possible starting positions, leading to an $O(nm)$ worst-case time complexity, which is too slow for large strings.

### Step 2: Hashing for Comparison

*   **Plain English:** Instead of comparing strings character by character, we'll assign a numerical "fingerprint" (a hash value) to the pattern and to each potential matching substring in the text. If the fingerprints don't match, the strings definitely don't match. If they *do* match, we then perform a full character-by-character comparison to confirm.
*   **Concrete Example:**
    *   Let's say $hash("BRA") = 123$.
    *   We calculate $hash("ABR") = 456$. Since $456 \neq 123$, "ABR" is definitely not "BRA".
    *   We calculate $hash("BRA") = 123$. Since $123 = 123$, "BRA" *might* be "BRA". We then compare 'B' with 'B', 'R' with 'R', 'A' with 'A' to confirm.
*   **Formal/Mathematical Version:** We define a hash function $h(S)$ that maps any string $S$ to an integer. The property we exploit is: if $S_1 = S_2$, then $h(S_1) = h(S_2)$. The converse is not necessarily true (i.e., $h(S_1) = h(S_2)$ does not guarantee $S_1 = S_2$ due to hash collisions).
*   **What could go wrong:** If hash values collide frequently (different strings produce the same hash), we'll perform many unnecessary character-by-character comparisons, degrading performance back towards $O(nm)$. Choosing a good hash function and parameters is crucial.

### Step 3: Polynomial Rolling Hash Function

*   **Plain English:** We need a specific type of hash function that's good for strings. A polynomial hash treats each character in a string as a digit in a number system with a chosen base (like base 10 for regular numbers). For example, "ABC" could be treated as $A \cdot b^2 + B \cdot b^1 + C \cdot b^0$. To keep these numbers from becoming astronomically large, we perform all calculations modulo a large prime number.
*   **Concrete Example:** Let's assign numerical values to characters, e.g., 'A'=1, 'B'=2, 'C'=3. Let our base $b=3$ and modulus $M=7$.
    *   For string "ABC":
        $hash("ABC") = (1 \cdot 3^2 + 2 \cdot 3^1 + 3 \cdot 3^0) \pmod 7$
        $ = (1 \cdot 9 + 2 \cdot 3 + 3 \cdot 1) \pmod 7$
        $ = (9 + 6 + 3) \pmod 7$
        $ = 18 \pmod 7$
        $ = 4$
*   **Formal/Mathematical Version:** For a string $S = s_0s_1\dots s_{k-1}$ of length $k$, where $s_i$ is the integer value of the $i$-th character, the polynomial hash function is:
    $$h(S) = \left( \sum_{j=0}^{k-1} s_j \cdot b^{k-1-j} \right) \pmod M$$
    Here, $b$ is a carefully chosen base (often a prime number larger than the alphabet size, like 31, 257, or 101), and $M$ is a large prime modulus (e.g., $10^9+7$).
*   **What could go wrong:** If $b$ is too small (e.g., 1 or 2), or $M$ is not prime or too small, the hash function might produce many collisions. Also, without the modulo operation, the intermediate hash values can quickly exceed the maximum integer size, leading to overflow errors.

### Step 4: The "Rolling" Part — Efficient Hash Update

*   **Plain English:** This is the key optimization. When we slide our window one character to the right, we don't need to recompute the entire hash for the new window. Instead, we can quickly update the old hash. Imagine we have the hash for "ABCD". To get the hash for "BCDE", we "remove" the 'A' from the left, shift "BCD" leftwards, and then "add" the 'E' to the right.
*   **Concrete Example:** Let's use the same $b=3, M=7$ and 'A'=1, 'B'=2, 'C'=3, 'D'=4, 'E'=5.
    *   We know $hash("ABC") = 4$.
    *   Now we want $hash("BCD")$.
    *   To "remove" 'A' (value 1) from $hash("ABC")$: 'A' contributed $1 \cdot 3^2$. So we subtract $1 \cdot 3^2$ from 4.
        $4 - (1 \cdot 3^2) = 4 - 9 = -5$.
    *   This result $(-5)$ represents the hash of "BC" (conceptually, after 'A' is removed and the remaining string is "shifted"). To shift it left (multiply by $b$), we multiply by 3:
        $-5 \cdot 3 = -15$.
    *   Now, "add" 'D' (value 4) to the right (it contributes $4 \cdot 3^0$):
        $-15 + 4 = -11$.
    *   Finally, take modulo $M=7$: $-11 \pmod 7 = (-11 + 2 \cdot 7) \pmod 7 = (-11 + 14) \pmod 7 = 3$.
    *   So, $hash("BCD") = 3$. (Let's verify: $hash("BCD") = (2 \cdot 3^2 + 3 \cdot 3^1 + 4 \cdot 3^0) \pmod 7 = (18 + 9 + 4) \pmod 7 = 31 \pmod 7 = 3$. It works!)
*   **Formal/Mathematical Version:** Let $H_i$ be the hash of the substring $T[i \dots i+m-1]$. To compute $H_{i+1}$ (the hash of $T[i+1 \dots i+m]$) from $H_i$:
    1.  Subtract the contribution of the leading character $T[i]$: $H_i - T[i] \cdot b^{m-1}$.
    2.  "Shift" the remaining hash to the left by multiplying by $b$: $(H_i - T[i] \cdot b^{m-1}) \cdot b$.
    3.  Add the contribution of the new trailing character $T[i+m]$: $( (H_i - T[i] \cdot b^{m-1}) \cdot b + T[i+m] )$.
    All operations are performed modulo $M$.
    $$H_{i+1} = \left( \left( H_i - (T[i] \cdot b^{m-1} \pmod M) + M \right) \pmod M \cdot b + T[i+m] \right) \pmod M$$
    The addition of $M$ before the first $\pmod M$ ensures the result of the subtraction is positive before multiplying by $b$.
*   **What could go wrong:** Forgetting to apply modulo $M$ at each intermediate step can lead to integer overflow. Incorrectly calculating $b^{m-1}$ (the power of $b$ for the leftmost character) or off-by-one errors in indices can also break the formula.

### Step 5: Collision Handling

*   **Plain English:** Because different strings *can* have the same hash value (a collision), whenever we find a text window whose hash matches the pattern's hash, we *must* perform a direct, character-by-character comparison between the pattern and that specific text window. If they match, we've found an occurrence. If they don't, it was a "false positive" due to a hash collision, and we simply continue searching.
*   **Concrete Example:**
    *   Suppose $hash("BRA") = 123$ and $hash("AXA") = 123$ (a collision, even though "BRA" $\neq$ "AXA").
    *   If we're searching for "BRA" and find a window $T[i \dots i+2]$ such that $hash(T[i \dots i+2]) = 123$.
    *   We then check: Is $T[i] == 'B'$? Is $T[i+1] == 'R'$? Is $T[i+2] == 'A'$?
    *   If $T[i \dots i+2]$ happened to be "AXA", the character comparison would fail, and we'd correctly determine it's not a match.
*   **Formal/Mathematical Version:** If $h(P) = h(T[i \dots i+m-1])$, then we perform a verification step: check if $P[j] = T[i+j]$ for all $j \in [0, m-1]$. Only if this character-by-character comparison succeeds do we report an occurrence at index $i$.
*   **What could go wrong:** Skipping the character-by-character verification step will lead to reporting false positives, making the algorithm incorrect.

### Step 6: Algorithm Outline

*   **Plain English:** First, calculate the fingerprint of the pattern. Then, calculate the fingerprint of the very first window in the text (the first $m$ characters). If they match, check character by character. After that, slide the window one character at a time, efficiently updating its fingerprint using the rolling hash formula. For each new window, compare its fingerprint to the pattern's fingerprint, and if they match, perform a full character comparison.
*   **Concrete Example:** Text "ABRACADABRA", Pattern "BRA", $b=3, M=7$, 'A'=1, 'B'=2, 'C'=3, 'D'=4, 'R'=18. (Using 18 for 'R' to make it distinct from other single-digit characters in this simplified example).
    1.  Calculate $hash(P="BRA")$: $(2 \cdot 3^2 + 18 \cdot 3^1 + 1 \cdot 3^0) \pmod 7 = (18 + 54 + 1) \pmod 7 = 73 \pmod 7 = 3$. So $hash_P = 3$.
    2.  Calculate $hash(T[0 \dots 2]="ABR")$: $(1 \cdot 3^2 + 2 \cdot 3^1 + 18 \cdot 3^0) \pmod 7 = (9 + 6 + 18) \pmod 7 = 33 \pmod 7 = 5$.
        *   $hash_P=3 \neq hash("ABR")=5$. No match.
    3.  Slide window to $T[1 \dots 3]="BRA"$:
        *   Old hash $H_{old} = 5$. Old char $T[0]='A'=1$. New char $T[3]='A'=1$. $b^{m-1} = 3^{3-1} = 3^2 = 9$.
        *   $H_{new} = ((H_{old} - (T[0] \cdot b^{m-1} \pmod M) + M) \pmod M \cdot b + T[3]) \pmod M$
        *   $H_{new} = ((5 - (1 \cdot 9 \pmod 7) + 7) \pmod 7 \cdot 3 + 1) \pmod 7$
        *   $H_{new} = ((5 - (9 \pmod 7) + 7) \pmod 7 \cdot 3 + 1) \pmod 7$
        *   $H_{new} = ((5 - 2 + 7) \pmod 7 \cdot 3 + 1) \pmod 7$
        *   $H_{new} = (10 \pmod 7 \cdot 3 + 1) \pmod 7$
        *   $H_{new} = (3 \cdot 3 + 1) \pmod 7$
        *   $H_{new} = (9 + 1) \pmod 7 = 10 \pmod 7 = 3$.
        *   $hash_P=3 = H_{new}=3$. Potential match!
        *   Verify $P$ with $T[1 \dots 3]$: "BRA" == "BRA". Yes! Report match at index 1.
    4.  Continue sliding...
*   **Formal/Mathematical Version:**
    1.  Choose a base $b$ and a large prime modulus $M$.
    2.  Precompute $b^{m-1} \pmod M$, let's call it $h_b$.
    3.  Compute $hash_P = h(P[0 \dots m-1])$.
    4.  Compute $hash_{T\_window} = h(T[0 \dots m-1])$.
    5.  For $i$ from $0$ to $n-m$:
        a.  If $hash_P = hash_{T\_window}$:
            i.  Perform character-by-character comparison: $P[j] == T[i+j]$ for $j \in [0, m-1]$.
            ii. If all characters match, report an occurrence at index $i$.
        b.  If $i < n-m$ (i.e., not the last window):
            i.  Update $hash_{T\_window}$ for the next window $T[i+1 \dots i+m]$ using the rolling hash formula:
                $hash_{T\_window} = \left( \left( hash_{T\_window} - (T[i] \cdot h_b \pmod M) + M \right) \pmod M \cdot b + T[i+m] \right) \pmod M$.
*   **What could go wrong:** Off-by-one errors in loop bounds ($n-m$ vs $n-m+1$), incorrect indexing of characters $T[i]$ and $T[i+m]$, or issues with precomputing $h_b$.

## 5. Worked examples — multiple, with every step shown

We will use character values 'A'=1, 'B'=2, ..., 'Z'=26 for simplicity in the first example, and standard ASCII values for others.

### Example 1: Basic Match

*   **Problem:** Find pattern $P = \text{"ABA"}$ in text $T = \text{"ABABCABAB"}$.
*   **Given:**
    *   Text $T = \text{"ABABCABAB"}$, $n=9$
    *   Pattern $P = \text{"ABA"}$, $m=3$
    *   Character values: 'A'=1, 'B'=2, 'C'=3
    *   Base $b=3$
    *   Modulus $M=7$
*   **What we want:** All starting indices of $P$ in $T$.

**Step 1: Precompute powers of $b$.**
We need $b^{m-1} \pmod M = 3^{3-1} \pmod 7 = 3^2 \pmod 7 = 9 \pmod 7 = 2$.
Let's call this `h_b_m_minus_1 = 2`.

**Step 2: Calculate hash of the pattern $P$.**
$P = \text{"ABA"}$ (characters: 1, 2, 1)
$hash_P = (1 \cdot b^2 + 2 \cdot b^1 + 1 \cdot b^0) \pmod M$
$hash_P = (1 \cdot 3^2 + 2 \cdot 3^1 + 1 \cdot 3^0) \pmod 7$
$hash_P = (1 \cdot 9 + 2 \cdot 3 + 1 \cdot 1) \pmod 7$
$hash_P = (9 + 6 + 1) \pmod 7$
$hash_P = 16 \pmod 7$
$hash_P = 2$
So, the pattern hash is $\mathbf{2}$.

**Step 3: Calculate hash of the first window in $T$.**
First window $T[0 \dots 2] = \text{"ABA"}$ (characters: 1, 2, 1)
$hash_{T\_window} = (1 \cdot 3^2 + 2 \cdot 3^1 + 1 \cdot 3^0) \pmod 7$
$hash_{T\_window} = (9 + 6 + 1) \pmod 7$
$hash_{T\_window} = 16 \pmod 7$
$hash_{T\_window} = 2$
So, the initial window hash is $\mathbf{2}$.

**Step 4: Iterate through the text.**
We iterate from $i=0$ to $n-m = 9-3 = 6$.

*   **Iteration $i=0$:**
    *   Current window: $T[0 \dots 2] = \text{"ABA"}$
    *   $hash_{T\_window} = 2$
    *   Compare hashes: $hash_P = 2$, $hash_{T\_window} = 2$. They match!
    *   Perform character-by-character check: Is "ABA" == "ABA"? Yes.
    *   **Report match at index 0.**

    *Update for next window:*
    *   Old hash $hash_{T\_window} = 2$.
    *   Character leaving: $T[0] = \text{'A'} = 1$.
    *   Character entering: $T[0+3] = T[3] = \text{'B'} = 2$.
    *   $hash_{T\_window} = ((hash_{T\_window} - (T[0] \cdot \text{h\_b\_m\_minus\_1} \pmod M) + M) \pmod M \cdot b + T[3]) \pmod M$
    *   $hash_{T\_window} = ((2 - (1 \cdot 2 \pmod 7) + 7) \pmod 7 \cdot 3 + 2) \pmod 7$
    *   $hash_{T\_window} = ((2 - 2 + 7) \pmod 7 \cdot 3 + 2) \pmod 7$
    *   $hash_{T\_window} = (7 \pmod 7 \cdot 3 + 2) \pmod 7$
    *   $hash_{T\_window} = (0 \cdot 3 + 2) \pmod 7$
    *   $hash_{T\_window} = 2 \pmod 7 = 2$.

*   **Iteration $i=1$:**
    *   Current window: $T[1 \dots 3] = \text{"BAB"}$
    *   $hash_{T\_window} = 2$
    *   Compare hashes: $hash_P = 2$, $hash_{T\_window} = 2$. They match!
    *   Perform character-by-character check: Is "ABA" == "BAB"? No ('A' vs 'B'). This is a collision (false positive).
    *   No match reported.

    *Update for next window:*
    *   Old hash $hash_{T\_window} = 2$.
    *   Character leaving: $T[1] = \text{'B'} = 2$.
    *   Character entering: $T[1+3] = T[4] = \text{'C'} = 3$.
    *   $hash_{T\_window} = ((2 - (2 \cdot 2 \pmod 7) + 7) \pmod 7 \cdot 3 + 3) \pmod 7$
    *   $hash_{T\_window} = ((2 - 4 + 7) \pmod 7 \cdot 3 + 3) \pmod 7$
    *   $hash_{T\_window} = (5 \pmod 7 \cdot 3 + 3) \pmod 7$
    *   $hash_{T\_window} = (5 \cdot 3 + 3) \pmod 7$
    *   $hash_{T\_window} = (15 + 3) \pmod 7$
    *   $hash_{T\_window} = 18 \pmod 7 = 4$.

*   **Iteration $i=2$:**
    *   Current window: $T[2 \dots 4] = \text{"ABC"}$
    *   $hash_{T\_window} = 4$
    *   Compare hashes: $hash_P = 2$, $hash_{T\_window} = 4$. They do not match.
    *   No match reported.

    *Update for next window:*
    *   Old hash $hash_{T\_window} = 4$.
    *   Character leaving: $T[2] = \text{'A'} = 1$.
    *   Character entering: $T[2+3] = T[5] = \text{'A'} = 1$.
    *   $hash_{T\_window} = ((4 - (1 \cdot 2 \pmod 7) + 7) \pmod 7 \cdot 3 + 1) \pmod 7$
    *   $hash_{T\_window} = ((4 - 2 + 7) \pmod 7 \cdot 3 + 1) \pmod 7$
    *   $hash_{T\_window} = (9 \pmod 7 \cdot 3 + 1) \pmod 7$
    *   $hash_{T\_window} = (2 \cdot 3 + 1) \pmod 7$
    *   $hash_{T\_window} = (6 + 1) \pmod 7$
    *   $hash_{T\_window} = 7 \pmod 7 = 0$.

*   **Iteration $i=3$:**
    *   Current window: $T[3 \dots 5] = \text{"BCA"}$
    *   $hash_{T\_window} = 0$
    *   Compare hashes: $hash_P = 2$, $hash_{T\_window} = 0$. They do not match.
    *   No match reported.

    *Update for next window:*
    *   Old hash $hash_{T\_window} = 0$.
    *   Character leaving: $T[3] = \text{'B'} = 2$.
    *   Character entering: $T[3+3] = T[6] = \text{'B'} = 2$.
    *   $hash_{T\_window} = ((0 - (2 \cdot 2 \pmod 7) + 7) \pmod 7 \cdot 3 + 2) \pmod 7$
    *   $hash_{T\_window} = ((0 - 4 + 7) \pmod 7 \cdot 3 + 2) \pmod 7$
    *   $hash_{T\_window} = (3 \pmod 7 \cdot 3 + 2) \pmod 7$
    *   $hash_{T\_window} = (3 \cdot 3 + 2) \pmod 7$
    *   $hash_{T\_window} = (9 + 2) \pmod 7$
    *   $hash_{T\_window} = 11 \pmod 7 = 4$.

*   **Iteration $i=4$:**
    *   Current window: $T[4 \dots 6] = \text{"CAB"}$
    *   $hash_{T\_window} = 4$
    *   Compare hashes: $hash_P = 2$, $hash_{T\_window} = 4$. They do not match.
    *   No match reported.

    *Update for next window:*
    *   Old hash $hash_{T\_window} = 4$.
    *   Character leaving: $T[4] = \text{'C'} = 3$.
    *   Character entering: $T[4+3] = T[7] = \text{'A'} = 1$.
    *   $hash_{T\_window} = ((4 - (3 \cdot 2 \pmod 7) + 7) \pmod 7 \cdot 3 + 1) \pmod 7$
    *   $hash_{T\_window} = ((4 - 6 + 7) \pmod 7 \cdot 3 + 1) \pmod 7$
    *   $hash_{T\_window} = (5 \pmod 7 \cdot 3 + 1) \pmod 7$
    *   $hash_{T\_window} = (5 \cdot 3 + 1) \pmod 7$
    *   $hash_{T\_window} = (15 + 1) \pmod 7$
    *   $hash_{T\_window} = 16 \pmod 7 = 2$.

*   **Iteration $i=5$:**
    *   Current window: $T[5 \dots 7] = \text{"ABA"}$
    *   $hash_{T\_window} = 2$
    *   Compare hashes: $hash_P = 2$, $hash_{T\_window} = 2$. They match!
    *   Perform character-by-character check: Is "ABA" == "ABA"? Yes.
    *   **Report match at index 5.**

    *Update for next window:*
    *   Old hash $hash_{T\_window} = 2$.
    *   Character leaving: $T[5] = \text{'A'} = 1$.
    *   Character entering: $T[5+3] = T[8] = \text{'B'} = 2$.
    *   $hash_{T\_window} = ((2 - (1 \cdot 2 \pmod 7) + 7) \pmod 7 \cdot 3 + 2) \pmod 7$
    *   $hash_{T\_window} = ((2 - 2 + 7) \pmod 7 \cdot 3 + 2) \pmod 7$
    *   $hash_{T\_window} = (7 \pmod 7 \cdot 3 + 2) \pmod 7$
    *   $hash_{T\_window} = (0 \cdot 3 + 2) \pmod 7$
    *   $hash_{T\_window} = 2 \pmod 7 = 2$.

*   **Iteration $i=6$:**
    *   Current window: $T[6 \dots 8] = \text{"BAB"}$
    *   $hash_{T\_window} = 2$
    *   Compare hashes: $hash_P = 2$, $hash_{T\_window} = 2$. They match!
    *   Perform character-by-character check: Is "ABA" == "BAB"? No.
    *   No match reported.

    *End of loop.*

**Final Answer:** The pattern "ABA" is found at indices $\mathbf{0}$ and $\mathbf{5}$.
**Reflection:** This example clearly showed a hash collision at $i=1$ and $i=6$ where "BAB" had the same hash as "ABA". This highlights the importance of the character-by-character verification step.

---

### Example 2: Using ASCII values

*   **Problem:** Find pattern $P = \text{"GEEK"}$ in text $T = \text{"GEEKSFORGEEKS"}$.
*   **Given:**
    *   Text $T = \text{"GEEKSFORGEEKS"}$, $n=13$
    *   Pattern $P = \text{"GEEK"}$, $m=4$
    *   Character values: Standard ASCII ('G'=71, 'E'=69, 'K'=75, 'S'=83, 'F'=70, 'O'=79, 'R'=82)
    *   Base $b=256$ (common for byte strings)
    *   Modulus $M=101$ (a prime number)
*   **What we want:** All starting indices of $P$ in $T$.

**Step 1: Precompute powers of $b$.**
We need $b^{m-1} \pmod M = 256^{4-1} \pmod {101} = 256^3 \pmod {101}$.
$256 \pmod {101} = 54$.
So, $256^3 \pmod {101} = 54^3 \pmod {101}$.
$54^2 = 2916$.
$2916 \pmod {101}$: $2916 = 28 \cdot 101 + 88$. So $2916 \pmod {101} = 88$.
$54^3 \pmod {101} = (54^2 \cdot 54) \pmod {101} = (88 \cdot 54) \pmod {101}$.
$88 \cdot 54 = 4752$.
$4752 \pmod {101}$: $4752 = 47 \cdot 101 + 5$. So $4752 \pmod {101} = 5$.
Let's call this `h_b_m_minus_1 = 5`.

**Step 2: Calculate hash of the pattern $P$.**
$P = \text{"GEEK"}$ (characters: 71, 69, 69, 75)
$hash_P = (71 \cdot b^3 + 69 \cdot b^2 + 69 \cdot b^1 + 75 \cdot b^0) \pmod {101}$
$hash_P = (71 \cdot 54^3 + 69 \cdot 54^2 + 69 \cdot 54^1 + 75 \cdot 54^0) \pmod {101}$
Using precomputed $54^3 \pmod{101} = 5$, $54^2 \pmod{101} = 88$, $54^1 \pmod{101} = 54$, $54^0 \pmod{101} = 1$:
$hash_P = (71 \cdot 5 + 69 \cdot 88 + 69 \cdot 54 + 75 \cdot 1) \pmod {101}$
$hash_P = (355 + 6072 + 3726 + 75) \pmod {101}$
$355 \pmod {101} = 52$ ($355 = 3 \cdot 101 + 52$)
$6072 \pmod {101} = 18$ ($6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 60 \cdot 101 + 12 \rightarrow 6072 = 