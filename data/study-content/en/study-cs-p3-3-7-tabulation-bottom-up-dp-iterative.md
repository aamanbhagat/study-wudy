## 1. The one-sentence answer

**Tabulation solves a dynamic-programming problem by filling an array (the table) iteratively from base cases upward to the original instance.**

This approach starts with the smallest, already-solved subproblems and re-uses their stored answers to compute larger ones. Each cell is written exactly once; no recursion stack is required. The final answer sits in a predetermined cell after the loop terminates.

Because every dependency points backward to already-computed cells, the algorithm is guaranteed to terminate after a fixed number of iterations whose count equals the size of the table.

> [!NOTE]
> The decisive insight is that the order of computation is reversed: instead of asking “what do I need to solve this?” (top-down), you ask “what can I solve right now with what I already have?” (bottom-up). Once the order is correct, caching becomes simple array assignment.

## 2. Why this matters — concrete and current

In semiconductor timing analysis, static timing engines at TSMC and Intel tabulate the longest path delay through millions of gates by filling a DP table whose states are arrival times at each node; the final table entry drives clock-period decisions for 3 nm processes.

Modern transformer training pipelines (e.g., those inside PyTorch’s FlashAttention kernels) replace naïve quadratic attention with a tabulation of prefix sums and block-wise softmax normalizers; the resulting table is filled left-to-right across sequence positions, cutting memory traffic by roughly 4× on 175 B parameter models.

NASA’s onboard rover planners for Perseverance compute optimal 7-day activity schedules by tabulating a 3-dimensional DP table whose axes are time, energy reserve, and instrument state; each cell stores the maximum science return achievable under the given constraints.

CRISPR guide-RNA design tools at Broad Institute tabulate the minimum number of off-target edits across a 20-base window by filling a Levenshtein DP table for every candidate guide against the reference genome; the table size is 21 × genome length and is computed in linear time per candidate.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Optimal substructure | Guarantees that an optimal solution to the whole problem can be assembled from optimal solutions to subproblems stored in the table. |
| Overlapping subproblems | Ensures that the same subproblem states are reached many times, so storing them once in an array yields asymptotic savings. |
| Array indexing | The table is literally an array; correct index arithmetic maps each logical state to a memory address. |
| Loop invariants | The outer loop that fills the table maintains the invariant that every cell up to the current index already contains the correct value. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the state
A state is a compact description of a subproblem.  
Example: for Fibonacci, the state can be “the nth Fibonacci number.”  
Formally, let \(S(i)\) denote the subproblem whose answer we store at table index \(i\).

> [!WARNING]
> If two different states map to the same index, the table will silently overwrite one answer with the other.

### Step 2 — Write the recurrence
Express the value of a state solely in terms of strictly smaller states.  
For Fibonacci:  
\[
F(i) = F(i-1) + F(i-2)
\]
with base cases \(F(0)=0\), \(F(1)=1\).

### Step 3 — Allocate the table
Create an array \(dp[0..n]\) whose length equals the number of distinct states.  
Each cell \(dp[i]\) will eventually hold the answer to \(S(i)\).

### Step 4 — Seed the base cases
Assign the known trivial answers directly:  
\[
dp[0] \gets 0, \quad dp[1] \gets 1
\]

### Step 5 — Iterate from small to large
For \(i = 2\) to \(n\):  
\[
dp[i] \gets dp[i-1] + dp[i-2]
\]
The loop direction guarantees every right-hand-side reference has already been written.

### Step 6 — Return the answer cell
After the loop, \(dp[n]\) contains the solution to the original problem.

### Step 7 — (Optional) recover space
When each state depends only on a fixed-size window of prior states, the table can be replaced by a constant number of scalar variables (rolling array).

## 5. Worked examples — every step shown

**Example 1 — Fibonacci (n = 5)**  
*Given:* \(n=5\).  
*Find:* \(F(5)\).  
Initialize \(dp = [0,1,0,0,0,0]\).  
For \(i=2\): \(dp[2] \gets dp[1]+dp[0] = 1\) — *Why:* recurrence uses only prior cells.  
For \(i=3\): \(dp[3] \gets 1+1 = 2\).  
For \(i=4\): \(dp[4] \gets 2+1 = 3\).  
For \(i=5\): \(dp[5] \gets 3+2 = 5\).  
**5**  
*Reflection:* The example is linear; the same pattern generalizes to any recurrence whose dependencies lie to the left of the current index.

**Example 2 — 0/1 Knapsack (capacity 4, items (w=2,v=3), (w=3,v=4))**  
*Given:* weights \(w=[2,3]\), values \(v=[3,4]\), \(W=4\).  
*Find:* maximum value.  
Create \(dp[0..4]\) initialized to 0.  
For item 1 (\(w=2,v=3\)): iterate backward from 4 to 2, \(dp[j] \gets \max(dp[j], dp[j-2]+3)\).  
After item 1: \(dp = [0,0,3,3,3]\).  
For item 2 (\(w=3,v=4\)): backward pass yields \(dp[4] = \max(3, dp[1]+4) = 4\).  
**4**  
*Reflection:* Backward iteration prevents using the same item twice—an easy index-direction error.

**Example 3 — Longest Common Subsequence of “ABC” and “AC”**  
*Given:* \(X=\)“ABC”, \(Y=\)“AC”.  
*Find:* length of LCS.  
2-D table \(dp[4][3]\) (including 0-length prefixes).  
Base row and column are zero.  
At (1,1) ‘A’==‘A’: \(dp[1][1] = 1\).  
At (2,2) ‘B’≠‘C’: \(dp[2][2] = \max(dp[1][2],dp[2][1]) = 1\).  
At (3,2) ‘C’==‘C’: \(dp[3][2] = dp[2][1]+1 = 2\).  
**2**  
*Reflection:* The 2-D recurrence mixes both left and upper neighbors; table dimensions must be one larger than string lengths.

**Example 4 — Edit Distance between “kitten” and “sitting”**  
*Given:* source “kitten”, target “sitting”.  
*Find:* minimum operations.  
7×8 table. After filling, the bottom-right cell equals 3 (substitute ‘k’→‘s’, substitute ‘e’→‘i’, insert ‘g’).  
**3**  
*Reflection:* Each cell examines three predecessors; the final answer is always at \((m,n)\) regardless of path cost.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Filling the table in the wrong direction | Recurrence dependencies point “backward”; forward iteration reads uninitialized cells. | Always verify that every index on the right-hand side is smaller than the current index. |
| Using the same item twice in 0/1 knapsack | Forward inner loop re-uses an item within the same pass. | Iterate capacity backward for 0/1 problems. |
| Off-by-one indexing on string DP | Strings are 1-based while arrays are 0-based. | Allocate table of size \((m+1)\times(n+1)\) and map character \(i\) to row \(i+1\). |
| Forgetting to seed all base cases | Only the first cell is set; adjacent cells remain garbage. | Write an explicit loop or assignment for every base-case index before the main loop. |
| Assuming 1-D table suffices for 2-D dependencies | LCS and edit distance genuinely need two dimensions. | Count the number of free parameters in the state; allocate that many dimensions. |
| Integer overflow when summing large values | Table cells grow exponentially (e.g., Fibonacci). | Use 64-bit integers or big-integer arrays from the start. |
| Returning the wrong cell after space optimization | Rolling array stores only the last row or two. | Keep an explicit mapping from logical indices to the two physical variables. |

## 7. The textbook-precise statement

Let \(S\) be a set of subproblem indices equipped with a strict partial order \(\prec\) such that the answer for index \(i\) depends only on answers for indices \(j \prec i\). Let \(dp[i]\) be an array indexed by \(S\). Then the bottom-up algorithm

\[
\text{for } i \text{ in topological order of } S:\quad dp[i] \gets f(\{dp[j] \mid j \prec i\})
\]

computes the unique solution satisfying the recurrence for every \(i \in S\).  
(Cormen et al., *Introduction to Algorithms*, 4e, §15.3, “Bottom-up dynamic programming”.)

## 8. Visual — diagram or schematic

```text
Fibonacci tabulation (n=5)
index:  0   1   2   3   4   5
value:  0   1   1   2   3   5
        ▲   ▲   ▲   ▲   ▲   ▲
base    │   │   └───┴───┘   │
cases   └───┴───────────────┘
Arrows show data flow: each cell reads only from strictly lower indices.
```

## 9. The memory technique

1. **The hook** — Picture a mason building a wall: each new brick is placed only after every brick beneath it is already mortared; the wall grows upward row by row exactly as the DP table grows from low indices to high.
2. **What to overlearn** — The phrase “fill from low to high” and the single rule that every right-hand-side index must be smaller than the left-hand-side index.
3. **Spaced-repetition schedule** — Review the Fibonacci recurrence and table at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the recurrence from the problem definition, list all dependencies of the largest state, sort those dependencies topologically, and allocate an array whose size equals the number of distinct states.

## 10. What this unlocks

Tabulation is the engine behind the majority of polynomial-time DP algorithms used in competitive programming, bioinformatics, and operations research. It directly precedes the study of

- space-optimized rolling arrays,
- DP on trees and DAGs,
- convex-hull optimization of recurrences,
- and the formal proof that every memoized top-down program has an equivalent iterative bottom-up counterpart.

## 11. Self-check — five questions, no answers

1. Write the exact loop bounds and recurrence for the 0/1 knapsack problem when the capacity is \(W\) and there are \(n\) items; state the final answer cell.
2. A 2-D LCS table for strings of length 1000 × 1000 is too large for memory. Which single dimension can safely be reduced to two scalar variables, and why?
3. In the edit-distance table, the cell \(dp[i][j]\) depends on three neighbors. If you fill row-by-row left-to-right, which neighbor is guaranteed to be the most recently written value?
4. Suppose the recurrence for a state depends on both \(i-1\) and \(i-k\) where \(k\) is an input parameter up to \(n\). What is the minimum extra space beyond a 1-D array of size \(n\) that still permits correct tabulation?
5. Demonstrate with a three-state counter-example that reversing the iteration order of a correctly written recurrence produces an incorrect answer, and identify the first cell that receives the wrong value.