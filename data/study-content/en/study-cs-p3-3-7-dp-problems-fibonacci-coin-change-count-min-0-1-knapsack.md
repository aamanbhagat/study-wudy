## 1. The one-sentence answer
**Dynamic programming solves optimization and counting problems by storing solutions to overlapping subproblems after confirming optimal substructure.**

A recursive formulation often recomputes the same smaller instances exponentially often. Storing each result the first time it is computed turns the exponential tree into a linear or quadratic DAG of dependencies. The stored values are then combined exactly once per subproblem according to the recurrence.

The same storage idea applies uniformly to counting (Fibonacci, coin-change count), minimization (minimum coins), and maximization under constraints (0/1 knapsack). Only the recurrence and the combination rule change; the storage discipline remains identical.

> [!NOTE]
> The decisive insight is that once a subproblem value is known, every future reference to it becomes an O(1) lookup; the algorithm’s cost therefore equals the number of distinct subproblems times the work per subproblem.

## 2. Why this matters — concrete and current
NASA’s Mars 2020 rover used a dynamic-programming planner to allocate limited energy and compute buffers across thousands of candidate activity sequences while respecting thermal and power constraints.  

Modern genome-assembly pipelines at companies such as Illumina employ the 0/1-knapsack DP formulation to select the highest-scoring set of reads that fit inside a fixed memory window during overlap-layout-consensus.  

Reinforcement-learning value iteration, the core loop inside DeepMind’s AlphaZero and OpenAI Five, is exactly tabular dynamic programming on the Bellman optimality equation; each state-value update reuses previously computed successor values.  

High-frequency trading engines at Jane Street and Citadel maintain coin-change-style DP tables to decide the minimum number of orders needed to liquidate a position while staying inside latency and fee envelopes that change every microsecond.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Recursion            | Every DP recurrence is first written as a recursive definition; without it the subproblem structure is invisible. |
| Memoization          | The mechanical translation from exponential recursion to polynomial time. |
| Bottom-up iteration  | Converts the memoized recursion into an explicit table that avoids call-stack overhead. |
| Big-O of nested loops| Needed to verify that the final table-filling loops really run in the claimed polynomial bound. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify repeated work
A naïve recursive definition recomputes identical subproblems many times.  
Example: the call tree for \(F(5)\) contains three separate evaluations of \(F(3)\).  
Formally, if the recursion tree contains duplicate nodes, the number of leaves grows as \(\Theta(\phi^n)\) where \(\phi = (1+\sqrt{5})/2\).  
> [!WARNING]  
> Treating every recursive call as unique hides the exponential blow-up; count the distinct arguments, not the call nodes.

### Step 2 — Verify optimal substructure
An optimal solution to the original instance is assembled from optimal solutions to strictly smaller instances.  
For Fibonacci the property is trivial: \(F(n) = F(n-1) + F(n-2)\).  
For 0/1 knapsack an optimal subset of the first \(i\) items either contains item \(i\) or does not; in either case the remainder is optimal for a smaller capacity.  
> [!WARNING]  
> Greedy choices (e.g., “always take the heaviest item”) violate this property and produce counter-examples.

### Step 3 — Write the recurrence with base cases
State the value of a subproblem in terms of smaller ones and list the base cases explicitly.  
Fibonacci:  
\[F(n) = F(n-1) + F(n-2),\qquad F(0)=0,\ F(1)=1.\]  
Coin-change count \(C(n)\) with coin set \(S\):  
\[C(n)=\sum_{c\in S}C(n-c),\qquad C(0)=1.\]  
> [!WARNING]  
> Omitting a base case produces off-by-one errors that propagate through the entire table.

### Step 4 — Introduce a memoization map
Associate each distinct argument with a single stored result.  
After the first evaluation of \(F(k)\), every later reference returns the stored integer in constant time.  
> [!WARNING]  
> Using a hash map without clearing it between independent top-level calls leaks stale values across test cases.

### Step 5 — Convert to bottom-up tabulation
Allocate an array whose indices correspond exactly to the distinct subproblems.  
Fill entries in an order that guarantees every dependency has already been computed.  
For Fibonacci the order is simply increasing index from 0 to \(n\).  
> [!WARNING]  
> Filling in the wrong topological order (e.g., decreasing index) reads uninitialized cells and yields garbage.

### Step 6 — Specialize the same skeleton to coin change (count)
Replace the Fibonacci recurrence with the sum over coin denominations; the table \(dp[0..amount]\) stores the number of combinations.  
> [!WARNING]  
> Using permutations instead of combinations (inner loop on coins vs. outer) changes the semantics and fails the “order doesn’t matter” requirement.

### Step 7 — Specialize to coin change (minimum coins)
Change the combination operator from sum to minimum:  
\[dp[j]=\min(dp[j],dp[j-c]+1).\]  
Initialize \(dp[0]=0\) and all other cells to \(\infty\).  
> [!WARNING]  
> Forgetting to set non-zero cells to \(\infty\) makes the minimum operator return 0 for unreachable amounts.

### Step 8 — Specialize to 0/1 knapsack
Add a second dimension for items. The two-dimensional table \(dp[i][w]\) stores the maximum value achievable with the first \(i\) items and capacity \(w\). The recurrence branches on whether item \(i\) is taken.  
The final textbook statement appears in Step 8.

## 5. Worked examples — every step shown

**Example 1 — Fibonacci(6)**  
*Given:* \(n=6\).  
*Find:* \(F(6)\).  
Initialize \(dp[0..6]\).  
\(dp[0]=0\) — base case.  
\(dp[1]=1\) — base case.  
\(dp[2]=dp[1]+dp[0]=1\) — Why: recurrence applied to already-filled cells.  
\(dp[3]=dp[2]+dp[1]=2\).  
\(dp[4]=dp[3]+dp[2]=3\).  
\(dp[5]=dp[4]+dp[3]=5\).  
\(dp[6]=dp[5]+dp[4]=8\).  
**8**  

*Reflection:* The table length equals the single parameter; the pattern generalizes to any linear recurrence.

**Example 2 — Coin change count, amount 5, coins {1,2,5}**  
*Given:* amount = 5, \(S=\{1,2,5\}\).  
*Find:* number of combinations.  
\(dp[0]=1\).  
For coin 1: \(dp[1..5]\) each increases by \(dp[j-1]\).  
For coin 2: \(dp[2]+=dp[0]\), \(dp[3]+=dp[1]\), … yielding 1,2,2,3,3 after coin 2.  
For coin 5: \(dp[5]+=dp[0]\) yields 4.  
**4**  

*Reflection:* Outer loop on coins guarantees each combination is counted once regardless of order.

**Example 3 — Minimum coins, amount 7, coins {1,3,4}**  
*Given:* amount = 7, \(S=\{1,3,4\}\).  
*Find:* fewest coins.  
\(dp[0]=0\), \(dp[1..7]=\infty\).  
Coin 1 updates all cells to their index value.  
Coin 3: \(dp[3]=\min(\infty,1+dp[0])=1\), \(dp[4]=\min(4,1+dp[1])=2\), … finally \(dp[7]=2\) (3+4).  
**2**  

*Reflection:* The \(\infty\) sentinel forces the algorithm to discover reachable amounts; its absence silently returns 0.

**Example 4 — 0/1 knapsack, capacity 5, items (w=2,v=3), (w=3,v=4), (w=4,v=5)**  
*Given:* \(W=5\), items above.  
*Find:* maximum value.  
\(dp[0..3][0..5]\) initialized to 0.  
Item 1 (2,3): \(dp[1][2..5]=3\).  
Item 2 (3,4): \(dp[2][3]=4\), \(dp[2][5]=\max(3,3+4)=7\).  
Item 3 (4,5): \(dp[3][4]=5\), \(dp[3][5]=\max(7,3+5)=8\).  
**8**  

*Reflection:* The extra dimension records the irrevocable “take or leave” decision for each item exactly once.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Recomputing without memo    | Recursion tree hides duplicate arguments    | Draw the call tree for the first three values of n   |
| Wrong loop order in coin change | Inner/outer loop swapped mixes permutations vs combinations | Fix coins in outer loop for combinations             |
| Using 0 instead of \(\infty\) for min-coin | 0 is a legal answer for reachable amounts   | Initialize to a sentinel larger than any feasible answer |
| 1-D vs 2-D knapsack confusion | Forgetting the item dimension overwrites subproblems | Always allocate a 2-D table first, then compress     |
| Off-by-one on array bounds  | Base case at index 0 collides with first item | Allocate size \(n+1\) or \(W+1\) explicitly          |
| Forgetting to copy previous row in space-optimized knapsack | Current row overwrites dependencies         | Iterate items backward when using 1-D array          |
| Assuming all amounts are reachable | Negative or zero coins produce infinite loops | Add an explicit reachability check or keep \(\infty\) |

## 7. The textbook-precise statement
A problem exhibits **optimal substructure** and **overlapping subproblems** if its optimal solution can be expressed as a function of optimal solutions to a polynomial number of strictly smaller instances. Dynamic programming computes a table \(dp[1..m]\) (or higher-dimensional analogue) by evaluating the recurrence once per cell in topological order. The resulting algorithm runs in time linear in the size of the table. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 14, §14.1–14.3.)

## 8. Visual — diagram or schematic
```text
dp table for 0/1 knapsack (W=5)
        capacity →
items ↓  0  1  2  3  4  5
  none   0  0  0  0  0  0
  (2,3)  0  0  3  3  3  3
  (3,4)  0  0  3  4  4  7
  (4,5)  0  0  3  4  5  8
```
Each cell \(dp[i][w]\) is the maximum of “exclude item i” (= \(dp[i-1][w]\)) and “include item i” (= \(dp[i-1][w-w_i]+v_i\)) when \(w\ge w_i\).

## 9. The memory technique
1. **The hook** — Picture a librarian who stamps every unique book request the first time it arrives; later patrons simply receive the already-stamped copy instead of ordering a new one.  
2. **What to overlearn** — The four recurrences: Fibonacci, coin-count sum, coin-min min-plus-one, and the two-branch knapsack rule.  
3. **Spaced-repetition schedule** — Review the four recurrences at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the table size from the distinct subproblem arguments, then fill cells left-to-right, top-to-bottom, confirming each dependency is already written.

## 10. What this unlocks
Mastery of these four canonical DP patterns lets you recognize the same skeleton inside longest-common-subsequence, edit distance, matrix-chain multiplication, and the Viterbi algorithm.  

- Longest common subsequence extends the 2-D knapsack table with character-matching logic.  
- The unbounded-knapsack variant appears in rod-cutting and word-break problems.  
- Bit-mask DP on subsets builds directly on the 0/1 inclusion decision.  
- Policy iteration in reinforcement learning reuses the same Bellman update loop.

## 11. Self-check — five questions, no answers
1. Compute the 10th Fibonacci number with a 1-D table of size 11; state the exact number of additions performed.  
2. For coins {2,3,5} and amount 11, how many combinations exist when order does not matter?  
3. In the minimum-coin problem with coins {1,4,6} and amount 8, what value does the algorithm return if the initialization sentinel is mistakenly set to 0?  
4. A 0/1 knapsack instance has three items whose weights sum to more than capacity; prove that at most two table entries per row can change from the previous row.  
5. Identify the single line that must be altered to convert a correct 0/1-knapsack DP into an unbounded-knapsack DP, and show why the change produces the new semantics.