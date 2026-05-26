## 1. The one-sentence answer
**Dynamic programming solves a problem by combining solutions to overlapping subproblems that exhibit optimal substructure.**

A problem exhibits overlapping subproblems when the same smaller instances recur many times in any recursive breakdown; recomputing them wastes work. Optimal substructure means the globally best answer is assembled directly from best answers to those smaller instances. Together these two properties let an algorithm store each subproblem result once and reuse it, converting exponential time into polynomial time.

Consider the naive recursion for the nth Fibonacci number. The call tree for F(5) recomputes F(3) twice and F(2) three times; each recomputation repeats the same work. Because the optimal value of F(n) is literally the sum of the optimal values of F(n−1) and F(n−2), storing those two numbers once removes all redundant branches.

> [!NOTE]
> The decisive insight is not “break the problem into parts,” but “the parts repeat and the whole optimum is built only from the parts’ optima.”

## 2. Why this matters — concrete and current
Google Maps route planning stores shortest-path distances to every intermediate intersection; recomputing those distances for every origin–destination pair would be prohibitive, yet the shortest path to any node is assembled from shortest paths to its predecessors.

In semiconductor timing analysis, static timing tools compute the latest arrival time at each gate by taking the maximum over incoming edges; each gate’s subproblem appears in thousands of paths, and optimal substructure guarantees the global critical path is the maximum of these locally maximal values.

Modern speech-recognition systems (e.g., those inside Apple Siri and Google Assistant) decode the most likely word sequence with a hidden-Markov or transformer lattice; the Viterbi recursion reuses the best prefix probability ending at every time step, exactly because the best full sentence contains the best prefixes.

CRISPR guide-RNA design solves a longest-common-subsequence variant between candidate oligos and off-target genomes; the DP table for edit distance is filled once per candidate because every prefix alignment is reused when extending the alignment by one base.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Recursion        | DP replaces an implicit recursion tree with an explicit table or memo map. |
| Asymptotic analysis | You must recognise that an exponential call tree becomes polynomial once overlaps are eliminated. |
| Memoisation      | The simplest implementation technique; understanding it makes bottom-up tabulation obvious. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify repeated work
A recursive formulation may invoke the same argument tuple more than once.  
Example: computing F(5) calls F(3) twice.  
Formally, a subproblem instance \(x\) is overlapping when it appears in at least two distinct positions in the recursion DAG.  
> [!WARNING] Treating every recursive call as unique will produce an exponential algorithm even when the DAG is tiny.

### Step 2 — Verify that optima compose
An optimal solution to the original instance can be constructed from optimal solutions to its sub-instances.  
Example: the shortest path \(s\to t\) via vertex \(v\) is the concatenation of a shortest \(s\to v\) path and a shortest \(v\to t\) path.  
\[
\text{OPT}(s,t)=\min_v\bigl(\text{OPT}(s,v)+\text{OPT}(v,t)\bigr)
\]
> [!WARNING] If a locally optimal choice can invalidate a globally optimal solution (as in activity selection without sorting), optimal substructure fails.

### Step 3 — Define the state
Choose a tuple that uniquely identifies each distinct subproblem.  
For Fibonacci the state is simply the integer \(n\); for 0-1 knapsack it is the pair (remaining capacity, item index).  
The state space size must be polynomial in the input size.

### Step 4 — Write the recurrence
Express the value of a state in terms of strictly smaller states.  
\[
\text{dp}[i][w]=\max\bigl(\text{dp}[i-1][w],\;v_i+\text{dp}[i-1][w-w_i]\bigr)
\]
The base cases close the recurrence.

### Step 5 — Choose direction (top-down or bottom-up)
Top-down adds memoisation to the recursive definition; bottom-up fills the table in an order that guarantees dependencies are already computed. Both rely on the same recurrence.

### Step 6 — Analyse time and space
Time equals number of states times work per state; space equals number of states (or less with rolling arrays). This yields the textbook guarantee that DP runs in polynomial time whenever both properties hold.

## 5. Worked examples — every step shown

**Example 1 — Fibonacci (overlaps only)**  
*Given:* \(n=6\).  
*Find:* \(F(6)\).  
\(F(6)=F(5)+F(4)\) *Why:* definition of recurrence.  
\(F(5)=F(4)+F(3)\) *Why:* same definition.  
\(F(4)\) appears in both lines, so store once.  
**6** *Why:* \(8+5=13\) after memoised values are reused.

*Reflection:* The only difficulty is noticing the repeated argument; once memoised, the tree collapses to a path.

**Example 2 — 0-1 Knapsack**  
*Given:* weights \([2,3]\), values \([4,5]\), capacity 5.  
*Find:* maximum value.  
\(\text{dp}[0][w]=0\) for all \(w\).  
For item 1: \(\text{dp}[1][5]=\max(0,4)=4\).  
For item 2: \(\text{dp}[2][5]=\max(4,5+ \text{dp}[1][2])=5\).  
**5**

*Reflection:* The state must include both item index and remaining capacity; omitting the index produces incorrect reuse.

**Example 3 — Longest common subsequence**  
*Given:* \(X=\text{ABCBDAB}\), \(Y=\text{BDCAB}\).  
*Find:* length of LCS.  
\(\text{dp}[i][j]=\text{dp}[i-1][j-1]+1\) when characters match, else max of skip-X or skip-Y.  
After filling the 8×6 table the bottom-right entry is 4.  
**4**

*Reflection:* The two-dimensional state captures the overlapping prefixes of both strings.

**Example 4 — Matrix-chain multiplication**  
*Given:* dimensions \(10\times30\), \(30\times5\), \(5\times60\).  
*Find:* minimum scalar multiplications.  
\(\text{dp}[1][3]=\min(10\cdot30\cdot60,\;10\cdot5\cdot60+30\cdot5\cdot60)=4500\).  
**4500**

*Reflection:* The split point \(k\) must be tried for every interval; optimal substructure lets us trust the sub-interval optima already stored.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Memoising the wrong state         | State omits a parameter that affects optimality | Enumerate every dimension that changes across recursive calls |
| Assuming optimal substructure     | Greedy choice looks locally best but destroys global optimum | Verify that OPT(full) can be rebuilt from OPT(sub) with a short proof |
| Forgetting base cases             | Recurrence refers to undefined cells        | Write explicit base-case equations before coding |
| Using top-down on huge state space| Stack depth or hash collisions              | Switch to bottom-up or increase recursion limit deliberately |
| Counting states incorrectly       | Treating two different tuples as identical  | Draw the recursion DAG on paper for the first three instances |
| Recomputing inside the recurrence | Storing result but still calling recursively | Return the stored value immediately on cache hit |
| Ignoring space optimisation       | Keeping an \(O(n^2)\) table when \(O(n)\) suffices | Identify which previous layer is still needed |

## 7. The textbook-precise statement
A problem possesses **optimal substructure** if an optimal solution to an instance \(I\) can be constructed from optimal solutions to sub-instances of \(I\). It possesses **overlapping subproblems** if the recursion tree for any instance contains polynomially many distinct sub-instances, each appearing more than once. When both hold, a dynamic-programming algorithm that stores the value of every distinct sub-instance runs in time polynomial in the number of sub-instances (Cormen et al., *Introduction to Algorithms*, 4e, §14.1–14.2).

## 8. Visual — diagram or schematic
```text
F(6)
├── F(5)
│   ├── F(4)
│   │   ├── F(3) ──► memo hit
│   │   └── F(2)
│   └── F(3) ──► memo hit
└── F(4) ──► memo hit
```
Arrows labelled “memo hit” show reuse; the distinct nodes are only F(6)…F(2).

## 9. The memory technique
1. **The hook** — picture a librarian who stamps every book the first time it is requested; later borrowers receive the already-stamped copy instantly.  
2. **What to overlearn** — the two properties (overlapping + optimal substructure) and the state definition for the three canonical problems: Fibonacci, knapsack, LCS.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — redraw the recursion DAG for the concrete instance; count distinct nodes; if the count is polynomial and optima compose, DP applies.

## 10. What this unlocks
Mastery of these two properties lets you recognise every future DP problem at sight and immediately write the recurrence and state.  
- Next: classic tabular DP (edit distance, longest increasing subsequence).  
- Then: DP on trees and DAGs.  
- Then: advanced techniques (convex hull optimisation, divide-and-conquer optimisation, state compression).

## 11. Self-check — five questions, no answers
1. Does the recurrence for the length of the shortest path in an unweighted graph exhibit overlapping subproblems?  
2. Give a counter-example where optimal substructure fails even though subproblems overlap.  
3. For the rod-cutting problem, write the exact state tuple and prove that its cardinality is polynomial.  
4. Why does the naive recursive matrix-chain algorithm run in exponential time while the DP version is cubic?  
5. A student memoises only on the first parameter of a two-parameter recurrence; construct an input that produces a wrong answer and explain the missing dependency.