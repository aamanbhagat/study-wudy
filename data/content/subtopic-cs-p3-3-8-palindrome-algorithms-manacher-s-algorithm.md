## What it is
Manacher's algorithm is a linear-time, $O(N)$, algorithm for finding the longest palindromic substring within a given string. It achieves this efficiency by cleverly reusing information from previously found palindromes to avoid redundant character comparisons. It elegantly handles both odd and even-length palindromes by transforming the input string.

## Why it matters
This algorithm is a classic example of optimizing a naive solution by exploiting symmetry, a fundamental pattern in algorithm design. In bioinformatics, it's used to find palindromic DNA sequences, which can indicate functionally important regions. In data compression, identifying such symmetric, repetitive structures can lead to more efficient encoding schemes.

## When to study it
Before tackling Manacher's algorithm, you must be comfortable with:
1.  **String manipulation and indexing:** Basic operations like accessing characters and slicing substrings.
2.  **Arrays/Vectors:** Storing and accessing computed values.
3.  **The "Expand from Center" approach:** You should understand the $O(N^2)$ solution for finding the longest palindrome. Manacher's is a direct optimization of this idea. If you haven't implemented that, do so first.

## How to study it (step by step)
1.  **Solve the problem naively.** First, code the $O(N^2)$ "expand from center" solution. Notice the awkward separate logic required for odd-length (e.g., `racecar`) and even-length (e.g., `aabbaa`) palindromes.
2.  **Understand the transformation.** Take a string like `S = "aba"` and another like `S = "abba"`. Transform them by inserting a sentinel character, say `#`, between each character and at the ends: `T = "#a#b#a#"` and `T = "#a#b#b#a#"`. Observe that *all* palindromic substrings in `S` now correspond to a palindrome in `T` of odd length with a unique center.
3.  **Grasp the core optimization.** The key is to maintain the palindrome we've found so far that extends furthest to the right. Let its center be `C` and its right boundary be `R`. When we check a new potential center `i` where `i < R`, we can use the information from its "mirror" position, `i_mirror`, with respect to `C`, to initialize our search, skipping many character comparisons.
4.  **Derive the update rule.** For a position `i` inside the current rightmost palindrome (i.e., `i < R`), its mirror is `i_mirror = 2*C - i`. The palindrome at `i` will have a radius of *at least* `min(R - i, P[i_mirror])`, where `P` is an array storing the palindrome radii. Formalize why this is true.
5.  **Implement the algorithm.** Code the full algorithm from scratch, paying close attention to the string transformation, the initialization of the radii array `P`, the loop that updates `C` and `R`, and the final step of extracting the longest palindrome's length and start index from `P`.
6.  **Trace on paper.** Manually trace the algorithm on a non-trivial string like `abacabadabacaba`. Track the values of `i`, `C`, `R`, `i_mirror`, and the `P` array at each step. This will solidify your understanding of the boundary conditions.

## Key ideas, with intuition
1.  **Unifying Odd and Even Palindromes:** The most elegant trick is the string transformation.
    -   `S = racecar` (odd) $\rightarrow$ `T = #r#a#c#e#c#a#r#`
    -   `S = abba` (even) $\rightarrow$ `T = #a#b#b#a#`
    In `T`, every palindrome has a unique center (either a character or a `#`) and an odd length. The radius of a palindrome in `T` centered at `T[i]`, let's call it `P[i]`, directly corresponds to the length of the original palindrome in `S`. Specifically, the length of the original palindrome is `P[i]`.

2.  **The Radii Array `P`:** We compute an array `P` where `P[i]` is the radius of the longest palindrome in the transformed string `T` centered at index `i`.
    -   For `T = #a#b#a#`, the palindrome `aba` is centered at `b` (index 3). The palindrome in `T` is `#a#b#a#`, which has a radius of 3. So, `P[3] = 3`.

3.  **Exploiting Symmetry (The `C` and `R` trick):** This is the heart of the algorithm's $O(N)$ performance. We maintain the center `C` and right boundary `R` of the palindrome discovered so far that extends furthest to the right.
    $$ R = C + P[C] $$
    When we are at a new index `i` such that `i < R`, we know `i` is contained within a known palindrome. Due to the symmetric nature of palindromes, the substring around `i` must mirror the substring around its symmetric counterpart, `i_mirror`.
    $$ i_{mirror} = C - (i - C) = 2C - i $$

4.  **The Two Cases for Initialization:** When using the mirror, there are two possibilities for initializing `P[i]`:
    -   **Case 1: The mirrored palindrome is contained within the `[L, R]` boundary.** If the palindrome at `i_mirror` does not extend beyond the left boundary of the main palindrome, then the palindrome at `i` must have the exact same radius. `P[i] = P[i_mirror]`.
    -   **Case 2: The mirrored palindrome extends beyond the `[L, R]` boundary.** If the palindrome at `i_mirror` goes past the left boundary, we only know for sure that the palindrome at `i` extends up to the right boundary `R`. Its radius is *at least* `R - i`. We must then try to expand it further.
    Both cases are elegantly captured by a single initialization:
    $$ P[i] \leftarrow \min(R - i, P[i_{mirror}]) $$
    After this initialization, we perform a standard "expand from center" check to see if we can extend the palindrome further. This combination prevents re-comparing characters we've already seen.

## Worked example
Let's find the longest palindrome in `S = "abacaba"`.

1.  **Transform `S`:**
    `T = #a#b#a#c#a#b#a#` (length 15)
    Indices: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14

2.  **Initialize:**
    `P = array of 15 zeros`
    `C = 0`, `R = 0`

3.  **Iterate `i` from 1 to 14:**

| i  | `i < R`? | `i_mirror` (`2C-i`) | `P[i_mirror]` | `R-i` | `P[i]` init | Expansion | `P[i]` final | New `C,R`? | `C,R` |
|----|----------|-----------------------|---------------|-------|------------|-----------|-------------|------------|-------|
| 1  | No       | -                     | -             | -     | 0          | `T[0]!=T[2]` | 1           | Yes        | 1, 2  |
| 2  | No       | -                     | -             | -     | 0          | `T[1]!=T[3]` | 0           | No         | 1, 2  |
| 3  | No       | -                     | -             | -     | 0          | `T[2]==T[4]` | 3           | Yes        | 3, 6  |
| 4  | Yes      | `2*3-4=2`             | `P[2]=0`      | `6-4=2` | `min(0,2)=0` | `T[3]!=T[5]` | 0           | No         | 3, 6  |
| 5  | Yes      | `2*3-5=1`             | `P[1]=1`      | `6-5=1` | `min(1,1)=1` | `T[3]!=T[7]` | 1           | No         | 3, 6  |
| 6  | No       | -                     | -             | -     | 0          | `T[5]!=T[7]` | 0           | No         | 3, 6  |
| 7  | No       | -                     | -             | -     | 0          | `T[6]==T[8]...`| 7           | Yes        | 7, 14 |
| 8  | Yes      | `2*7-8=6`             | `P[6]=0`      | `14-8=6`| `min(0,6)=0` | `T[7]!=T[9]` | 0           | No         | 7, 14 |
| 9  | Yes      | `2*7-9=5`             | `P[5]=1`      | `14-9=5`| `min(1,5)=1` | `T[7]!=T[11]`| 1           | No         | 7, 14 |
| 10 | Yes      | `2*7-10=4`            | `P[4]=0`      | `14-10=4`|`min(0,4)=0` | `T[9]!=T[11]`| 0           | No         | 7, 14 |
| 11 | Yes      | `2*7-11=3`            | `P[3]=3`      | `14-11=3`|`min(3,3)=3` | `T[7]!=T[15]`| 3           | No         | 7, 14 |
| 12 | Yes      | `2*7-12=2`            | `P[2]=0`      | `14-12=2`|`min(0,2)=0` | `T[11]!=T[13]`|0           | No         | 7, 14 |
| 13 | Yes      | `2*7-13=1`            | `P[1]=1`      | `14-13=1`|`min(1,1)=1` | `T[12]!=T[14]`|1           | No         | 7, 14 |

4.  **Final `P` array:**
    `[0, 1, 0, 3, 0, 1, 0, 7, 0, 1, 0, 3, 0, 1, 0]`

5.  **Find result:**
    The max value in `P` is 7 at index 7. This is the radius. The length of the palindrome in the original string is `P[i] = 7`. The center in `S` is `(index_in_T - 1) / 2 = (7-1)/2 = 3`. The start index is `center - (len-1)/2 = 3 - (7-1)/2 = 0`. The palindrome is `abacaba`.

**Reflection:** At `i=3`, we found `aba` and set `C=3, R=6`. At `i=5`, the mirror was `i_mirror=1`. `P[1]` was 1. Since `R-i=1`, we could safely initialize `P[5]` to 1 without any comparisons. The big jump happened at `i=7`, where we found the full palindrome `abacaba`, which extended to the end of the string, setting `R=14`. For all subsequent `i`, we could use the mirror property to initialize `P[i]` efficiently.

## Diagrams
This diagram shows the relationship between the main palindrome (centered at `C`), the current position `i`, and its mirror `i_mirror`.

```text
String T: ... L ......... i_mirror ......... C ......... i ......... R ...
           <------------------- P[C] ------------------->
                     <---- P[i_mirror] ---->
                                                 <---- P[i] ---->

L = C - P[C]  (Left boundary of main palindrome)
R = C + P[C]  (Right boundary of main palindrome)
i_mirror = 2*C - i
```

The key insight is that the palindromic structure around `i_mirror` is guaranteed to be present around `i`, but only up to the boundary `R`.

## Memory technique — remember this forever
1.  **The Mnemonic: "Mirrors in a Symmetrical Hallway"**
    Imagine walking down a hallway (`T`) that you know is a perfect palindrome. The center of the hallway is `C`. If you are at a position `i` and look into a mirror at `C`, you see your reflection at `i_mirror`. Any symmetrical pattern of doors around your reflection (`P[i_mirror]`) must also exist around you (`P[i]`). You only need to start checking for new doors once you reach the end of the known hallway (`R`).

2.  **Must-Know Formulas:**
    -   **Mirror Index:** $i_{mirror} = 2C - i$
    -   **Radius Initialization:** $P[i] = (R > i) ? \min(R - i, P[i_{mirror}]) : 0$

3.  **Spaced Repetition Schedule:**
    -   Review and re-derive today.
    -   Then in 3 days (implement from memory).
    -   Then in 7 days (trace on paper).
    -   Then in 16 days.
    -   Then in 35 days.

4.  **First Principles Pathway:**
    If you forget everything, rebuild it from this thought: "How can I avoid re-comparing characters?". The only way is if you've seen them before. The largest region of "seen" characters is the palindrome that goes furthest to the right (defined by `C` and `R`). Any point `i` inside this region has a symmetric twin, `i_mirror`. By the definition of a palindrome, the characters around `i` *must* match the characters around `i_mirror`, at least until you hit the boundary `R`. This gives you a guaranteed minimum palindrome length at `i`. The formula is just the math for "how far can I trust the mirror?".

## Common mistakes
1.  **Incorrectly converting from `P[i]` to original string length/indices.** Remember that `P[i]` is the length of the palindrome in the original string `S`. The center in `S` is `(i-1)/2`, and the start index is `center - (P[i]-1)/2`.
2.  **Forgetting to update `C` and `R`.** You must check if the new palindrome `i + P[i]` extends beyond the current `R` *after every single expansion loop for `i`*, and update `C` and `R` if it does.
3.  **Off-by-one errors in the expansion loop.** The loop for expanding the palindrome at `i` should check `T[i - P[i] - 1]` against `T[i + P[i] + 1]`. Getting these indices wrong is a common bug.
4.  **Mishandling the string transformation.** The transformed string `T` must have length `2*N + 1`, where `N` is the length of `S`. Forgetting the sentinel character at the very beginning or end is a frequent error.

## Self-check
1.  Trace Manacher's algorithm on the string `S = "a"`. Now trace it on `S = "aa"`. Verify that the logic works for these simple base cases.
2.  Given the string `S = "abacdfgdcaba"`, what are the values of `C` and `R` just before the algorithm processes the index corresponding to the character `'f'`?
3.  How could you adapt the logic of Manacher's algorithm to find the longest "semi-palindrome", defined as a string that can be made a palindrome by changing at most one character?