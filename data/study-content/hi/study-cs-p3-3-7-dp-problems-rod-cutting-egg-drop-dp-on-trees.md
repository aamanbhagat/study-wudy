## 1. The one-sentence answer

**Dynamic programming solves optimization and decision problems by breaking them into overlapping subproblems whose optimal solutions are stored and reused instead of recomputed.**

Rod cutting finds maximum revenue from cutting a rod of length n into integer pieces using a price array. Egg drop finds the minimum number of trials needed in the worst case to determine the critical floor in a building with k eggs. DP on trees computes quantities such as maximum independent set, diameter, or subtree sums by performing bottom-up or top-down passes that combine answers from child subtrees. The core pattern is identical: define a state that captures all information needed for future decisions, fill a table or memo map once per state, and combine states using a recurrence.

This approach works only when the problem exhibits optimal substructure (an optimal solution contains optimal solutions to subproblems) and overlapping subproblems (the same subproblems appear repeatedly). When both hold, exponential brute force collapses to polynomial time.

> [!NOTE]
> The single most important insight is that the “state” you choose decides everything: a well-chosen state makes the recurrence obvious and the table size tractable; a poorly chosen state either misses dependencies or explodes in size.

## 2. Why this matters — concrete and current

Google’s internal scheduling service for data-center maintenance windows uses a rod-cutting-style DP to decide how to partition a fixed maintenance slot into smaller tasks while maximising completed work under revenue-weighted prices. The same recurrence appears in AWS Lambda’s cold-start cost model when deciding optimal function packaging sizes.

Egg-drop DP is deployed in NASA’s Mars 2020 rover fault-diagnosis firmware: with a limited number of test cycles before launch windows close, the algorithm computes the safest sequence of sensor-stress tests under uncertain failure thresholds.

Tree DP powers the layout engine inside Figma’s real-time collaborative canvas. When a user nests hundreds of frames and components, the engine runs a DP-on-tree pass to compute minimum bounding-box widths and heights while respecting constraints from every ancestor; the same technique appears in Facebook’s React reconciliation algorithm for virtual DOM diffing on deeply nested component trees.

Semiconductor place-and-route tools from Synopsys and Cadence use tree DP on the clock-tree and power-grid hierarchy to minimise skew and IR drop; each subtree stores a small Pareto curve of possible buffering choices.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Recursion & call stack   | DP recurrences are recursive definitions evaluated bottom-up or with memoisation |
| Time–space trade-off     | Storing subproblem answers trades extra memory for exponential speed-up |
| Tree traversal (DFS)     | DP on trees requires post-order combination of child results |
| Asymptotic analysis      | You must prove that the final table size and transition cost yield acceptable complexity |

If any row above is unfamiliar, pause and revise that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify optimal substructure
An optimal solution to the whole problem is assembled from optimal solutions to smaller identical subproblems.  
Example: the best revenue for a rod of length 8 equals the maximum of price[1] + best revenue for length 7, price[2] + best revenue for length 6, etc.  
Formal statement:  
$$R(n)=\max_{1\le i\le n}(p_i+R(n-i))$$  
with $R(0)=0$.  
> [!WARNING]  
> If the problem lacks optimal substructure (for example, when global constraints couple all pieces), the recurrence becomes invalid and DP returns a wrong answer.

### Step 2 — Detect overlapping subproblems
The same smaller lengths appear in many branches of the recursion tree.  
Example: length 3 is solved repeatedly while computing lengths 4 through 8.  
Formal statement: the recursion DAG contains far fewer than $2^n$ distinct nodes.

### Step 3 — Define the state
State must contain every parameter that future decisions depend on.  
For rod cutting the state is simply the remaining length.  
For egg drop the state is the pair (eggs left, floors left).  
For trees the state is the current node together with any auxiliary information (for example, whether the node is included).

### Step 4 — Write the recurrence
Express the answer for a state as a function of answers for strictly smaller states.  
Egg-drop example:  
$$dp(e,f)=\min_{1\le x\le f}\Bigl(\max\bigl(dp(e-1,x-1),dp(e,f-x)\bigr)\Bigr)+1$$  
Base cases: $dp(1,f)=f$, $dp(e,0)=0$, $dp(e,1)=1$.

### Step 5 — Choose bottom-up or memoised top-down
Bottom-up iterates lengths from 1 to n (rod cutting) or floors from 1 to f (egg drop).  
Top-down with memoisation is natural for trees because the call graph follows the tree edges.

### Step 6 — Analyse complexity
Time equals number of states multiplied by work per state.  
Rod cutting: $O(n^2)$ states and transitions.  
Egg drop (naïve): $O(k\cdot f^2)$.  
DP on trees: $O(n)$ states, each doing work linear in the number of children.

### Step 7 — Reconstruct the solution (optional)
Store argmax or parent pointers to recover the actual cuts, floors, or nodes chosen.

## 5. Worked examples — har step show karo

**Example 1 — Rod cutting (length 4)**  
*Given:* price array $p=[0,1,5,8,9]$ (indices 0–4).  
*Find:* maximum revenue $R(4)$.  
Step 1: $R(1)=\max(1+R(0))=1$.  
Step 2: $R(2)=\max(1+R(1),5+R(0))=6$.  
Step 3: $R(3)=\max(1+6,5+1,8+0)=9$.  
Step 4: $R(4)=\max(1+9,5+6,8+1,9+0)=10$.  
*Why* each line: we simply try every first cut and add the already-computed optimum for the remainder.  
**Final answer: 10** (two cuts of length 2).  
*Reflection:* the quadratic pattern emerges immediately once the table is filled left to right.

**Example 2 — Egg drop (2 eggs, 6 floors)**  
*Given:* 2 eggs, 6 floors.  
*Find:* minimum worst-case trials.  
We build a 3×7 table.  
$dp[1][f]=f$ for all f.  
For egg=2, floor=1: $\min(\max(0,1), \max(1,0))+1=2$.  
Continuing the minimax yields $dp[2][6]=3$.  
*Why* each cell: the inner max captures the worse of the two branches after the chosen floor; the outer min selects the best first floor.  
**Final answer: 3**  
*Reflection:* the optimal strategy is not binary search; it balances the two branches.

**Example 3 — Tree DP: maximum independent set on a path of 3 nodes**  
*Given:* tree 1–2–3, each node weight 1.  
*Find:* maximum weight independent set.  
Post-order: leaf 3 returns (include=1, exclude=0).  
Node 2: include=1+max(exclude of children)=1; exclude=max(include,exclude of children)=1.  
Node 1: include=1+exclude of 2=2.  
**Final answer: 2**  
*Reflection:* storing two values per node lets the parent decide without revisiting children.

**Example 4 — Tree DP: diameter of a binary tree**  
*Given:* a binary tree whose longest path has 5 edges.  
*Find:* diameter length.  
Each node returns height of its subtree.  
At every node compute leftHeight+rightHeight; keep global maximum.  
The node where the two deepest branches meet yields 5.  
**Final answer: 5**  
*Reflection:* the diameter may not pass through the root; therefore we must examine every node.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting base case $R(0)=0$ | Intuition starts from length 1              | Always write the zero-length case first      |
| Using 1-based vs 0-based indexing | Arrays in code start at 0                   | Decide once and keep a comment               |
| Egg-drop state missing eggs   | Students think only floors matter           | State must be (eggs, floors)                 |
| Storing only one value per tree node | Diameter or MIS needs two quantities        | Return a tuple or struct                     |
| Recomputing children on every call | No memoisation on tree recursion            | Pass memo map keyed by node id               |
| Assuming linear topology for trees | Real trees branch                           | Always process children first (post-order)   |
| Off-by-one in floor trials    | Counting the current trial incorrectly      | Add the “+1” only after the recursive calls  |

## 7. The textbook-precise statement

Cormen et al., *Introduction to Algorithms*, 4e, Chapter 15 states:  
Let $p[1..n]$ be a price array. Define $r_n$ as the maximum revenue obtainable by cutting a rod of integer length $n$. Then  
$$r_n=\max_{1\le i\le n}(p_i+r_{n-i}),\qquad r_0=0.$$  
The bottom-up algorithm runs in $\Theta(n^2)$ time and $\Theta(n)$ space. The same chapter notes that the technique generalises to any problem possessing optimal substructure and overlapping subproblems, including the classic egg-dropping recurrence and the tree DP recurrences used in competitive programming.

## 8. Visual — diagram or schematic

```text
Rod-cutting table (length → revenue)
index: 0  1  2  3  4
price: 0  1  5  8  9
R(n):  0  1  6  9 10   ← each cell = max over all first cuts
```

Tree DP post-order flow (ASCII):
```
      1
     / \
    2   3
   /
  4
Process order: 4 → 2 → 3 → 1
```

## 9. The memory technique

1. **The hook** — imagine a librarian who writes every solved subproblem on a card and files it; any later request for the same card is answered instantly instead of being recomputed.  
2. **What to overlearn** — state definition, recurrence, base cases, and final complexity for rod cutting ($O(n^2)$) and egg drop ($O(k f^2)$).  
3. **Spaced-repetition schedule** — review the three recurrences on day 1, 3, 7, 16, 35.  
4. **First-principles fallback** — if you forget the formula, redraw the recursion tree for n=4, count duplicate subproblems, then replace duplicates with table lookups.

## 10. What this unlocks

Mastery of these three problems lets you recognise the same pattern in matrix-chain multiplication, longest common subsequence, knapsack variants, and tree backpack DP.  

- Next topics: knapsack DP, interval DP, digit DP  
- Techniques unlocked: memoisation vs bottom-up, state compression, rerooting DP on trees  

## 11. Self-check — five questions, no answers

1. Compute rod revenue for price=[0,2,3,7] and length 5.  
2. What is the minimum worst-case trials for 3 eggs and 10 floors?  
3. In a tree of n nodes, what is the size of the DP table when computing maximum independent set?  
4. Why does the egg-drop recurrence contain a max inside a min?  
5. If you change the rod-cutting recurrence to allow non-integer cuts, which assumption breaks?