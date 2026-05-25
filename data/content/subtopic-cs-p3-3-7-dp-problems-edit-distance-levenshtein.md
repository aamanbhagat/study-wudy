## What it is
Edit distance, specifically Levenshtein distance, measures the "difference" between two strings. It is the minimum number of single-character edits—insertions, deletions, or substitutions—required to change one string into the other. This gives us a quantitative way to measure string similarity.

## Why it matters
This algorithm is fundamental in fields that process text or sequential data. In natural language processing, it powers spell checkers and auto-correct. In bioinformatics, a variation called the Needleman-Wunsch algorithm is used to align DNA and protein sequences, which is critical for understanding evolutionary relationships. For aerospace, robust command-and-control systems might use fuzzy string matching based on edit distance to tolerate minor transmission errors or typos in operator commands.

## When to study it
You must have a solid grasp of dynamic programming (DP) first. Specifically, you should understand the concepts of **optimal substructure** and **overlapping subproblems**. If you have already solved problems like finding the $n$-th Fibonacci number with DP or, ideally, the Longest Common Subsequence (LCS) problem, you are ready. If not, master LCS first, as its structure is very similar.

## How to study it (step by step)
1.  **Manual Start:** Take two short strings, like "CAT" and "CUT". Manually write down the sequence of edits to transform one to the other. Convince yourself the minimum is 1 (substitute 'A' with 'U'). Now try "TOP" and "POST". It takes two edits (insert 'S', insert 'P'). This builds intuition.
2.  **Define Subproblems:** The core of DP is solving smaller, related problems first. Define the subproblem: "What is the edit distance between the first $i$ characters of string $A$ and the first $j$ characters of string $B$?" Let's call this $D(i, j)$.
3.  **Derive the Recurrence:** Consider how to compute $D(i, j)$ from solutions to smaller subproblems ($D(i-1, j)$, $D(i, j-1)$, $D(i-1, j-1)$). Think about the last characters of the prefixes, $A[i]$ and $B[j]$. You have three choices to make them match.
4.  **Identify Base Cases:** What is the edit distance from a string of length $i$ to an empty string? It's $i$ deletions. What about from an empty string to a string of length $j$? It's $j$ insertions. These form the first row and column of your DP table.
5.  **Build the Table:** Create a 2D array (the DP table) and fill it out using the base cases and the recurrence relation you derived. The final answer will be in the bottom-right corner.
6.  **Implement:** Write the code for the bottom-up DP solution. The loops will directly mirror the process of filling the table.

## Key ideas, with intuition
1.  **Optimal Substructure:** The minimum cost to transform string $A$ into string $B$ is built upon the minimum costs of transforming prefixes of $A$ into prefixes of $B$. If we make an optimal choice for the last characters, the remaining problem (on the prefixes) must also be solved optimally.

2.  **The DP State:** We define a 2D array, let's call it `dp`, where `dp[i][j]` stores the Levenshtein distance between the first $i$ characters of the source string (`src`) and the first $j$ characters of the target string (`tgt`). Note: `dp` will have dimensions `(len(src)+1) x (len(tgt)+1)` to handle the empty string case.

3.  **The Recurrence Relation is a Choice:** To compute `dp[i][j]`, we look at the last characters of the current prefixes, `src[i-1]` and `tgt[j-1]`.
    *   **Case 1: The characters match.** If `src[i-1] == tgt[j-1]`, no operation is needed for these characters. The cost is the same as the cost for the prefixes without them: `dp[i-1][j-1]`.
    *   **Case 2: The characters do not match.** We must perform one operation. We choose the one with the minimum cost:
        *   **Delete `src[i-1]`:** The cost is 1 (for the deletion) plus the cost of transforming the remaining `src` prefix of length $i-1$ into the `tgt` prefix of length $j$. This is `dp[i-1][j] + 1`.
        *   **Insert `tgt[j-1]`:** The cost is 1 (for the insertion) plus the cost of transforming the `src` prefix of length $i$ into the `tgt` prefix of length $j-1$. This is `dp[i][j-1] + 1`.
        *   **Substitute `src[i-1]` with `tgt[j-1]`:** The cost is 1 (for the substitution) plus the cost of transforming the prefixes of length $i-1$ and $j-1$. This is `dp[i-1][j-1] + 1`.

Combining these gives the full recurrence. Let `cost = 0` if `src[i-1] == tgt[j-1]` and `cost = 1` otherwise.
$$
dp[i][j] = \min \begin{cases} dp[i-1][j] + 1 & \text{(delete from src)} \\ dp[i][j-1] + 1 & \text{(insert into src)} \\ dp[i-1][j-1] + \text{cost} & \text{(substitute/match)} \end{cases}
$$

## Worked example
Let's find the edit distance between `src = "SUNDAY"` and `tgt = "SATURDAY"`.

1.  **Initialization:** Create a `(6+1) x (8+1)` table. The first row is the cost of insertions to create "SATURDAY" from an empty string ($0, 1, 2, ..., 8$). The first column is the cost of deletions to make "SUNDAY" from an empty string ($0, 1, 2, ..., 6$).

2.  **Table Fill:** We'll compute `dp[i][j]` using the recurrence. Let's compute `dp[1][1]` (for 'S' and 'S').
    *   `src[0] == tgt[0]` ('S' == 'S'), so `cost = 0`.
    *   `dp[1][1] = dp[0][0] + 0 = 0`.

    Now let's compute `dp[1][2]` (for 'S' and 'SA').
    *   `src[0] != tgt[1]` ('S' != 'A'), so `cost = 1`.
    *   `dp[1][2] = min(dp[0][2]+1, dp[1][1]+1, dp[0][1]+1) = min(2+1, 0+1, 1+1) = min(3, 1, 2) = 1`.

3.  **Complete Table:** Continuing this process fills the entire table.

|       |   $ $   | S | A | T | U | R | D | A | Y |
| :---: | :---: |:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **$ $** | **0** | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| **S** | **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| **U** | **2** | 1 | 1 | 2 | 2 | 3 | 4 | 5 | 6 |
| **N** | **3** | 2 | 2 | 2 | 3 | 3 | 4 | 5 | 6 |
| **D** | **4** | 3 | 3 | 3 | 3 | 4 | 3 | 4 | 5 |
| **A** | **5** | 4 | 3 | 4 | 4 | 4 | 4 | 3 | 4 |
| **Y** | **6** | 5 | 4 | 4 | 5 | 5 | 5 | 4 | 3 |

4.  **Result:** The value in the bottom-right corner, `dp[6][8]`, is **3**.

**Reflection:** Each cell `dp[i][j]` was computed by looking only at its neighbors to the top `dp[i-1][j]`, left `dp[i][j-1]`, and top-left `dp[i-1][j-1]`. This dependency structure is what allows us to build the solution from the top-left to the bottom-right, guaranteeing that when we compute a cell, its prerequisites have already been computed.

## Diagrams
Here is the DP table showing the dependencies for calculating `dp[i][j]`. The value at `(i,j)` depends on the values in the three cells with arrows pointing to it.

```text
      j-1   j
    +-----+-----+
i-1 | D_tl| D_t |
    +-----+-----+
  i | D_l |?????|
    +-----+-----+

To compute the value at ????? (i.e., dp[i][j]):
  - Look at the diagonal-left (D_tl): dp[i-1][j-1]. This corresponds to a match/substitution.
  - Look at the top (D_t): dp[i-1][j]. This corresponds to a deletion.
  - Look at the left (D_l): dp[i][j-1]. This corresponds to an insertion.

dp[i][j] = min(D_t + 1, D_l + 1, D_tl + cost)
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you are a video game character on a 2D grid. You start at `(0,0)` and must reach `(m,n)`.
    *   Moving **right** costs 1 point (an **insertion**).
    *   Moving **down** costs 1 point (a **deletion**).
    *   Moving **diagonally** costs 0 if the characters match, and 1 if they don't (a **match/substitution**).
    Your goal is to find the path with the minimum total cost. The DP table calculates this minimum cost for every possible grid cell.

2.  **Must Overlearn Formulas:**
    *   **Base cases:**
        $$ dp[i][0] = i $$
        $$ dp[0][j] = j $$
    *   **Recurrence:**
        $$ dp[i][j] = \min(dp[i-1][j] + 1, \quad dp[i][j-1] + 1, \quad dp[i-1][j-1] + (1 \text{ if } src[i-1] \neq tgt[j-1] \text{ else } 0)) $$

3.  **Spaced Repetition Schedule:**
    *   Review this concept and re-derive the recurrence in 1 day.
    *   Solve a new problem (e.g., "intention" to "execution") in 3 days.
    *   Re-implement the code from scratch in 7 days.
    *   Explain the algorithm to a hypothetical colleague in 16 days.
    *   Find a variation (e.g., Damerau-Levenshtein distance) and understand its new recurrence in 35 days.

4.  **First Principles Pathway:** If you forget the recurrence, don't panic. Take two strings, `A = "...x"` and `B = "...y"`. To find the edit distance between `A` and `B`, you must make their ends match. You have three and only three choices for the final operation:
    1.  Delete `x` from `A`. The cost is 1 + (edit distance of `"... "` and `"...y"`).
    2.  Insert `y` into `A`. The cost is 1 + (edit distance of `"...x"` and `"... "`).
    3.  Match/substitute `x` with `y`. The cost is `cost(x,y)` + (edit distance of `"... "` and `"... "`).
    The optimal solution must be the minimum of these three choices. These three choices map directly to the three terms in the recurrence.

## Common mistakes
1.  **Off-by-one Indexing:** Using `src[i]` and `tgt[j]` inside the loops for a `dp` table of size `(m+1)x(n+1)`. The correct string indices are `i-1` and `j-1` because `dp[i]` corresponds to a prefix of length `i`.
2.  **Incorrect Base Cases:** Initializing the first row/column with all zeros. This implies that transforming a string to an empty string is free, which is incorrect. It costs `k` deletions to erase a string of length `k`.
3.  **Mixing up Insert/Delete:** Confusing `dp[i-1][j]` (delete) with `dp[i][j-1]` (insert). The "grid walk" mnemonic helps: moving down (`i` increases) means consuming a character from the source string (`src`) which is a deletion. Moving right (`j` increases) means consuming a character from the target (`tgt`), which is an insertion.

## Self-check
1.  Manually construct the DP table for transforming "CAT" to "CARTS". What is the final distance?
2.  Implement the Levenshtein distance algorithm. Verify it on the "SUNDAY"/"SATURDAY" example and your "CAT"/"CARTS" example.
3.  How would you modify the recurrence relation if substitutions were not allowed (cost = infinity), only insertions and deletions? How would you change it if substitutions cost 2 units instead of 1?