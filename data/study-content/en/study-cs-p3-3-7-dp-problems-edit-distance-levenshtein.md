## 1. The one-sentence answer
**Edit distance (Levenshtein distance) computes the fewest single-character insertions, deletions, or substitutions needed to turn string \(X\) into string \(Y\).**

The problem arises whenever two sequences must be compared under limited local changes. Instead of enumerating every possible sequence of edits, dynamic programming builds the answer from smaller subproblems that already record the cheapest way to align the prefixes of the two strings.

The key observation is that the optimal edit script for the full strings re-uses the optimal scripts for every pair of prefixes. This reuse produces a recurrence whose values can be stored in a table and filled once, in the correct order.

> [!NOTE]
> The single most important insight is that the cost of aligning the last characters of two prefixes is completely determined by the costs of the three possible preceding prefixes; no global search is required.

## 2. Why this matters — concrete and current
Google’s spell-checker and Android’s autocorrect both invoke Levenshtein distance (or close variants) millions of times per second to rank candidate corrections against a user’s typed word.  

In bioinformatics, the Needleman–Wunsch algorithm that aligns DNA or protein sequences is a direct generalisation of the same recurrence; every modern genome assembler (e.g., those used by Illumina and Pacific Biosciences pipelines) still relies on the underlying dynamic-programming table.  

Git’s diff engine employs a variant of edit distance to produce the minimal patch between two file versions; the same technique appears inside the delta-encoding layer of Google’s Brotli compression library.  

Machine-translation post-editing systems at Meta and DeepL measure human post-edit effort with Levenshtein distance to decide which machine-generated sentences require further review.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| 2-D arrays               | The DP table is indexed by pairs of prefix lengths and must be allocated and traversed correctly. |
| Optimal substructure     | The cheapest edit sequence for prefixes of length \(i\) and \(j\) must be reusable inside larger prefixes. |
| Bottom-up iteration      | Filling cells in increasing order of \(i+j\) guarantees that the three dependencies of each cell are already computed. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Define the three atomic operations
Any single edit is one of insert, delete or substitute.  
Example: turning “cat” into “cot” requires one substitution.  
Formally, the allowed operations on a string are  
\[
\text{ins}(c),\quad\text{del}(c),\quad\text{sub}(c\to d)
\]  
each costing 1.  
> [!WARNING]
> Treating “replace two characters at once” as a single operation violates the model and produces an incorrect distance.

### Step 2 — Consider prefixes
Let \(X[1..i]\) be the first \(i\) characters of \(X\). The distance between full strings is the distance between the longest prefixes, so every intermediate result we need is itself an edit distance between two prefixes.  
Example: distance(“kitten”, “sitting”) equals distance(“kitten”, “sitting”) computed via all shorter prefixes.  
No formula yet; the claim is only that the answer lives inside a set of prefix distances.

### Step 3 — Write the recurrence by cases on the last characters
If \(X[i] = Y[j]\), no edit is required for the last pair; otherwise one substitution may be needed. The three preceding prefixes give the three candidate costs:  
\[
D(i,j) = 
\begin{cases}
D(i-1,j-1) & \text{if } X[i]=Y[j] \\
1 + \min\bigl(D(i-1,j-1),\; D(i-1,j),\; D(i,j-1)\bigr) & \text{otherwise.}
\end{cases}
\]  
> [!WARNING]
> Forgetting the “+1” when characters differ undercounts the substitution cost and yields a distance that is always too small.

### Step 4 — Supply the base cases
An empty prefix can be turned into a non-empty prefix only by insertions (or deletions in the opposite direction):  
\[
D(i,0)=i,\qquad D(0,j)=j.
\]  
These initialise the first row and column of the table.

### Step 5 — Realise the table can be filled bottom-up
Because every \(D(i,j)\) depends only on cells with strictly smaller \(i\) or \(j\), iterating \(i\) from 0 to \(m\) and, inside that loop, \(j\) from 0 to \(n\) guarantees dependencies are ready. The final answer is \(D(m,n)\).

### Step 6 — The textbook statement of the algorithm
The Levenshtein distance is exactly the value \(D(m,n)\) produced by the recurrence and base cases above when the table is filled in row-major order.

## 5. Worked examples — every step shown

**Example 1 — Identical strings**  
*Given:* \(X=\) “a”, \(Y=\) “a”.  
*Find:* \(D(1,1)\).  

- Base: \(D(1,0)=1\), \(D(0,1)=1\). *Why:* empty prefix needs one insertion/deletion.  
- Recurrence: \(X[1]=Y[1]\) so \(D(1,1)=D(0,0)=0\). *Why:* characters match, zero cost.  
**0**

*Reflection:* The match case short-circuits the min; this pattern appears in every later example.

**Example 2 — Single substitution**  
*Given:* \(X=\) “cat”, \(Y=\) “cot”.  
*Find:* \(D(3,3)\).  

- Row 0 and column 0 filled as 0…3.  
- Cell (1,1): ‘c’=‘c’ → 0.  
- Cell (2,2): ‘a’≠‘o’ → \(1+\min(D(1,1)=0,D(1,2)=1,D(2,1)=1)=1\).  
- Cell (3,3): ‘t’=‘t’ → \(D(2,2)=1\).  
**1**

*Reflection:* The substitution cost propagates exactly once; the final match re-uses the already-correct prefix distance.

**Example 3 — Classic “kitten” / “sitting”**  
*Given:* \(X=\) “kitten”, \(Y=\) “sitting”.  
*Find:* \(D(6,7)\). (Full table computation yields 3.)

**3**

*Reflection:* Two substitutions and one insertion; the DP discovers the globally minimal combination without enumerating sequences.

**Example 4 — One string empty**  
*Given:* \(X=\) “”, \(Y=\) “abc”.  
*Find:* \(D(0,3)\).  

- By base case \(D(0,3)=3\).  
**3**

*Reflection:* The base cases alone solve any problem involving the empty string; later cells never alter them.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Off-by-one indexing               | 1-based vs 0-based prefix lengths confused          | Always label rows/columns by prefix length, not index |
| Forgetting the “+1” on mismatch   | Intuition that “different” costs nothing            | Write the three-case recurrence explicitly each time |
| Assuming cost of insert = delete = 0 | Over-generalising from LCS                        | Keep the three operations symmetric at cost 1        |
| Filling table in wrong order      | Column-major when row dependencies exist            | Outer loop on \(i\), inner on \(j\)                  |
| Not handling empty strings        | Base cases omitted                                  | Initialise first row and column before any recurrence |
| Memoising only one dimension      | Attempting 1-D DP on a 2-D dependency graph         | Allocate the full \((m+1)\times(n+1)\) table         |
| Confusing distance with alignment | Reporting the script instead of the numeric cost    | Return only \(D(m,n)\); reconstruct script separately |

## 7. The textbook-precise statement
Let \(X\) and \(Y\) be strings of lengths \(m\) and \(n\). Define \(D(i,j)\) as the edit distance between the prefixes \(X[1..i]\) and \(Y[1..j]\). Then  
\[
D(i,j)=\begin{cases}
i & \text{if }j=0,\\
j & \text{if }i=0,\\
D(i-1,j-1) & \text{if }i,j>0\text{ and }X_i=Y_j,\\
1+\min\bigl(D(i-1,j-1),D(i-1,j),D(i,j-1)\bigr) & \text{otherwise.}
\end{cases}
\]  
The Levenshtein distance is \(D(m,n)\). (Cormen et al., *Introduction to Algorithms*, 4e, §15.4.)

## 8. Visual — diagram or schematic
```text
          Y:   ''   s   i   t   t   i   n   g
X:''     0    1   2   3   4   5   6   7
k        1    1   2   3   4   5   6   7
i        2    2   1   2   3   4   5   6
t        3    3   2   1   2   3   4   5
t        4    4   3   2   1   2   3   4
e        5    5   4   3   2   3   4   5
n        6    6   5   4   3   2   3   4
```
Rows = prefixes of “kitten”, columns = prefixes of “sitting”. Each cell stores \(D(i,j)\). Arrows (not drawn) point from each cell to the three possible predecessors; the minimum among them plus 0 or 1 yields the cell value.

## 9. The memory technique
1. **The hook** — Picture a librarian sliding three library cards (the three predecessor cells) under a new card; the cheapest card plus a stamp (“+1 if mismatch”) becomes the new distance.  
2. **What to overlearn** — The exact recurrence, the two base-case lines, and that the answer lives at bottom-right.  
3. **Spaced-repetition schedule** — Review recurrence at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the three cases by asking “what is the cheapest way to finish after deciding the fate of the last characters?”

## 10. What this unlocks
Mastery of the edit-distance recurrence immediately generalises to longest common subsequence, sequence alignment scoring, and the Wagner–Fischer algorithm for arbitrary cost matrices.  

- Needleman–Wunsch global alignment  
- Smith–Waterman local alignment  
- Diff utilities and Myers’ O(ND) algorithm  
- Levenshtein automata for fast spell checking  

## 11. Self-check — five questions, no answers
1. Compute \(D(4,4)\) for \(X=\) “abcd”, \(Y=\) “abdc” by hand.  
2. What is the value of \(D(0,5)\) when \(Y\) has length 5?  
3. If substitution cost is changed to 2 while insert/delete remain 1, which line of the recurrence must be altered?  
4. A programmer fills the table column-by-column instead of row-by-row; under what condition does this still produce the correct answer?  
5. Give a concrete pair of strings where the optimal edit script contains both an insertion and a deletion; show that the DP table nevertheless reports the minimal total.