## 1. The one-sentence answer
**Longest Common Subsequence (LCS) finds the longest subsequence present in both given sequences while preserving relative order.**

LCS ek classic dynamic programming problem hai jo do sequences ke beech shared elements ki sabse lambi ordered list nikaalta hai. Iska matlab yeh hai ki aapko exact positions match karne ki zaroorat nahi, sirf order maintain karna hai. Jaise "ABCBDAB" aur "BDCAB" mein "BCAB" ya "BDAB" dono valid LCS hain lekin length 4 hai.

Yeh brute-force recursion se exponential time leta hai kyunki har position par choose ya skip karne ke decisions repeat hote hain. Dynamic programming is repetition ko 2D table se eliminate karti hai jisme har cell previous decisions ka result store karti hai.

> [!NOTE]
> The core "aha" moment is realising that LCS length at any prefix pair depends only on whether the current characters match; a mismatch simply takes the better of skipping one sequence or the other, turning an exponential search into quadratic filling of a table.

## 2. Why this matters — concrete and current
Git and other version-control systems use LCS internally to generate minimal diffs when you run `git diff`; the algorithm compares two versions of a file and reports only the changed lines while preserving order.

In bioinformatics, tools such as BLAST and ClustalW rely on LCS-style dynamic programming to align DNA or protein sequences; NCBI’s pipelines compare millions of reads daily using optimised LCS variants to detect evolutionary relationships.

Modern plagiarism-detection engines (Turnitin, MOSS) treat source-code submissions as token sequences and compute LCS lengths to flag copied fragments even when variable names or formatting differ.

Semiconductor design software (Synopsys, Cadence) employs LCS to compare netlists during equivalence checking; any mismatch in the longest common signal ordering can indicate a synthesis bug before tape-out.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| 2-D array / matrix   | Stores subproblem answers for every prefix pair           |
| Recurrence relation  | Defines how LCS(i, j) is built from smaller LCS values    |
| Base case handling   | Empty prefixes must return length 0                       |
| Bottom-up iteration  | Fills the table in increasing prefix length order         |

If any of these feel shaky, pause and review basic 2-D DP on problems such as Fibonacci or 0-1 Knapsack first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Define the subproblem clearly
Aapko do sequences X[1…m] aur Y[1…n] diye gaye hain; har possible prefix pair ke liye LCS length nikaalna hai.  
Example: X = "AB", Y = "A" → prefixes ("A","A") ka LCS length 1 hai.  
Formally, let dp[i][j] be the LCS length of X[0…i-1] and Y[0…j-1].  
> [!WARNING]  
> If you define dp[i][j] on suffixes instead of prefixes, the recurrence direction reverses and the table fill order breaks.

### Step 2 — Handle the matching case
Agar X[i-1] == Y[j-1], toh current character LCS mein shamil ho sakta hai, isliye dp[i][j] = dp[i-1][j-1] + 1.  
Example: X = "ABC", Y = "AC" → i=3, j=2 (C==C) → dp[3][2] = dp[2][1] + 1 = 2.  
$$dp[i][j] = dp[i-1][j-1] + 1 \quad \text{when } X[i-1] = Y[j-1]$$

### Step 3 — Handle the mismatch case
Agar characters alag hain, toh current character dono taraf se skip kar ke dekho aur maximum lo.  
Example: X = "ABC", Y = "AC" → i=2, j=2 (B≠C) → dp[2][2] = max(dp[1][2], dp[2][1]) = 1.  
$$dp[i][j] = \max(dp[i-1][j], dp[i][j-1]) \quad \text{when } X[i-1] \ne Y[j-1]$$

### Step 4 — Set the base cases
Kisi bhi sequence ka empty prefix LCS length zero hoti hai.  
dp[0][j] = 0 for all j, dp[i][0] = 0 for all i.

### Step 5 — Iterate in the correct order
Outer loop i from 1 to m, inner loop j from 1 to n; har cell ko upar, left aur diagonal values se bharo.  
Yeh order guarantee karta hai ki jab dp[i][j] calculate ho, uske teen dependencies already filled hain.

### Step 6 — Recover the actual subsequence (optional)
Table ke last cell se backtrack karte hue, match milne par character record karo aur diagonally move karo; warna badi value wali taraf move karo.  
Yeh step length nikaalne ke baad alag se implement hota hai.

## 5. Worked examples — har step show karo

**Example 1 — Two short matching strings**  
*Given:* X = "AB", Y = "AB"  
*Find:* LCS length and one subsequence  
dp[0][*] = 0, dp[*][0] = 0.  
i=1 (A), j=1 (A) → match → dp[1][1] = 1.  
i=2 (B), j=2 (B) → match → dp[2][2] = dp[1][1]+1 = 2.  
*Why* each step: match case directly adds one to the previous diagonal because order is preserved.  
**2**  
*Reflection:* Trivial match case shows how the +1 rule works; generalises to any identical strings.

**Example 2 — One mismatch**  
*Given:* X = "ABC", Y = "AC"  
*Find:* LCS length  
dp[1][1] (A=A) = 1.  
dp[2][1] (B≠A) = max(dp[1][1], dp[2][0]) = 1.  
dp[2][2] (B≠C) = max(dp[1][2], dp[2][1]) = 1.  
dp[3][2] (C=C) = dp[2][1]+1 = 2.  
*Why* each step: mismatch forces max of skip-X or skip-Y; final match adds the second character.  
**2** (subsequence "AC")  
*Reflection:* Demonstrates the max operation that appears in every real LCS instance.

**Example 3 — Repeated characters**  
*Given:* X = "AAB", Y = "ABA"  
*Find:* LCS length  
After full table fill: dp[3][3] = 2.  
*Why* each step: when multiple A’s exist, the recurrence automatically picks the longest valid chain without explicit counting.  
**2**  
*Reflection:* Shows that LCS is not the same as counting common letters; order matters.

**Example 4 — Longer realistic input**  
*Given:* X = "AGGTAB", Y = "GXTXAYB"  
*Find:* LCS length  
After systematic bottom-up fill the final cell yields 4.  
*Why* each step: every cell reuses already-computed shorter prefixes, avoiding exponential recomputation.  
**4** (one possible subsequence "GTAB")  
*Reflection:* Scales to strings of length ~1000 with O(mn) time; the same table pattern appears in production diff tools.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using 1-based vs 0-based indexing inconsistently | Students mix string indices with dp indices | Always define dp[i][j] for first i characters of X |
| Forgetting to initialise first row and column to 0 | Overlooking empty-prefix base case          | Explicitly set dp[0][*] = dp[*][0] = 0 before loops |
| Returning the table instead of the length | Confusing reconstruction with length computation | Decide upfront whether you need length only or the subsequence |
| Assuming LCS must be contiguous | Mixing up with Longest Common Substring     | Remember the definition allows skipping characters |
| Recomputing the same cell recursively without memo | Falling back to naive recursion             | Always draw the 2-D table before coding      |
| Off-by-one in backtracking reconstruction | Diagonal move only on match, not on max     | Trace the exact condition that produced the current cell value |

## 7. The textbook-precise statement
Let X = x₁x₂…xₘ and Y = y₁y₂…yₙ be two sequences. Define c[i,j] as the length of an LCS of the prefixes X[1..i] and Y[1..j]. Then
$$
c[i,j]=\begin{cases}
0 & \text{if }i=0\text{ or }j=0,\\
c[i-1,j-1]+1 & \text{if }i,j>0\text{ and }x_i=y_j,\\
\max(c[i,j-1],c[i-1,j]) & \text{if }i,j>0\text{ and }x_i\neq y_j.
\end{cases}
$$
Cormen et al., *Introduction to Algorithms*, 4e, §14.3.

## 8. Visual — diagram or schematic
```
   ""  A  B  C  B  D  A  B
""  0  0  0  0  0  0  0  0
B   0  0  1  1  1  1  1  1
D   0  0  1  1  1  2  2  2
C   0  0  1  2  2  2  2  2
A   0  1  1  2  2  2  3  3
B   0  1  2  2  3  3  3  4
```
Rows = X prefixes, columns = Y prefixes; each cell stores LCS length up to that point. Arrows (not shown) would point left, up, or diagonal according to the recurrence.

## 9. The memory technique
1. **The hook** — Picture two trains on parallel tracks; LCS counts the maximum number of wagons that stay in the same order on both tracks even if some wagons are removed.
2. **What to overlearn** — The exact recurrence (match → +1, else max of left/up) and the fact that dp[m][n] is the answer.
3. **Spaced-repetition schedule** — Review the recurrence and one worked example after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If the formula slips, redraw the 2-D table for the two shortest non-trivial strings you can think of and re-derive the three cases from the definition of subsequence.

## 10. What this unlocks
LCS mastery directly opens the door to edit distance, longest increasing subsequence, and sequence alignment problems that dominate bioinformatics and version-control kernels.

- Levenshtein / Wagner–Fischer edit distance uses an almost identical table.
- Longest Palindromic Subsequence reduces to LCS by comparing a string with its reverse.
- Diff utilities and merge-conflict resolution in Git rely on LCS-based patience sorting optimisations.

## 11. Self-check — five questions, no answers
1. Compute LCS length of "XMJYAUZ" and "MZJAWXU".
2. What is the time and space complexity of the standard 2-D DP table for LCS?
3. If you only need the length and not the subsequence, can you reduce space to O(min(m,n))?
4. Identify the bug: a student wrote dp[i][j] = dp[i-1][j-1] + 1 on every cell regardless of character equality.
5. Given two strings of length 1000 each, roughly how many cells will contain the final LCS length value during backtracking reconstruction?