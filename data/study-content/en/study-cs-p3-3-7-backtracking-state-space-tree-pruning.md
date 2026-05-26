## 1. The one-sentence answer
**Backtracking explores a state-space tree by depth-first search while pruning any subtree whose partial assignment already violates a constraint.**

The technique begins with an empty partial solution and extends it one decision at a time. At every node the algorithm checks whether the current prefix can still be completed to a feasible solution; if the check fails, the entire subtree is abandoned without further expansion. This replaces exhaustive enumeration of an exponential number of candidates with a far smaller traversal that discards hopeless branches early.

The underlying structure is a tree whose levels correspond to successive decision variables and whose edges represent the legal choices for the variable at that level. Pruning occurs when a constraint test, evaluated on the path from root to the current node, returns false. The search then backtracks to the most recent ancestor that still has unexplored children.

> [!NOTE]
> The decisive insight is that feasibility is monotonic: once a partial solution is infeasible, every extension remains infeasible, so the subtree can be discarded forever.

## 2. Why this matters — concrete and current
SpaceX uses a backtracking scheduler with aggressive domain pruning to assign launch windows, ground-station passes, and payload power budgets under hundreds of hard constraints; each successful pruning step reduces the search from millions of combinations to a few hundred that can be evaluated in real time before a countdown.

Modern semiconductor place-and-route tools such as those inside Synopsys IC Compiler II model cell legalization and timing as a constraint-satisfaction problem solved by backtracking over a state-space tree of row and site assignments; pruning on partial timing slack prevents the router from exploring placements that will never close timing.

Protein-structure prediction pipelines at DeepMind and academic labs encode dihedral-angle choices as a backtracking search whose state-space tree is pruned by steric-clash and energy-threshold tests; the same pruning logic appears inside the Monte-Carlo tree search that AlphaFold 2 augments with gradient-based refinement.

Cryptographic hardware-verification teams at Intel run backtracking-based equivalence checkers that explore bit-vector assignments while pruning on partial BDD or SAT conflicts; a single well-placed pruning predicate can cut days from formal sign-off of an arithmetic unit.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Recursion        | Backtracking is implemented as a recursive descent that unwinds on dead-ends. |
| Depth-first traversal of trees | The state-space tree is explored depth-first so that the call stack itself represents the current path. |
| Constraint predicates | Pruning decisions rest on evaluating whether a partial assignment satisfies every constraint that can already be checked. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Generate every candidate by extending one variable at a time
A naïve generator simply tries every legal value for the next undecided variable and recurses.  
Example: for the 0-1 knapsack decision version with capacity 5 and items of sizes 2,3,4, the generator produces all 2^3 = 8 subsets.  
Formally, let the variables be \(x_1,\dots,x_n\) with domains \(D_i\). The generator enumerates the Cartesian product \(\prod D_i\).  
> [!WARNING]  
> If you forget that domains may be pruned by earlier choices, you will regenerate the same infeasible prefix many times.

### Step 2 — Organise the enumeration into an explicit tree
Each level \(\ell\) of the tree corresponds to variable \(x_\ell\). An edge from a node at level \(\ell-1\) to a child at level \(\ell\) is labelled by a value \(v\in D_\ell\). The root represents the empty assignment.  
Example: the knapsack tree has three levels; the leftmost path might be “take item 1, take item 2, skip item 3”.  
Formally the tree \(T\) has node set consisting of all partial assignments whose length equals their depth.

### Step 3 — Attach a feasibility predicate to every node
Define a predicate \(P(\sigma)\) that is true exactly when the partial assignment \(\sigma\) does not yet violate any constraint that can be evaluated on \(\sigma\) alone.  
Example: if current weight already exceeds capacity, \(P(\sigma)=\text{false}\).  
\[P(\sigma)\equiv\bigwedge_{c\in C_{\text{partial}}}c(\sigma)\]  
where \(C_{\text{partial}}\) are the constraints whose scope is covered by \(\sigma\).

### Step 4 — Prune when the predicate fails
If \(P(\sigma)=\text{false}\), discard the entire subtree rooted at \(\sigma\) and return to the parent. This is the pruning step.  
Example: once weight = 6 > 5, none of the 2^{remaining items} extensions need examination.  
The number of nodes visited drops from \(O(\prod |D_i|)\) to the size of the pruned tree.

### Step 5 — The algorithm is depth-first search with early termination
The textbook statement of backtracking is therefore depth-first traversal of the state-space tree that aborts any subtree whose root already falsifies \(P\).

## 5. Worked examples — every step shown

**Example 1 — Subset-sum decision**  
*Given:* Target sum \(t=9\), set \(\{3,4,5,6\}\).  
*Find:* Any subset that sums to 9.  
Start at root \(\sigma=\emptyset\), \(P(\emptyset)=\text{true}\). Extend with 3: \(\sigma=\{3\}\), sum=3≤9. Extend with 4: sum=7. Extend with 5: sum=12>9 → \(P=\text{false}\), prune. Backtrack, try 6 instead: sum=13>9, prune. Backtrack to \(\{3\}\), skip 4, try 5: sum=8. Extend with 6: sum=14>9, prune. Backtrack, skip 5, try 6: sum=9.  
**{3,6}**  
*Reflection:* The first pruning occurred after only three additions; the monotonicity of the sum made every larger extension irrelevant.

**Example 2 — 4-Queens (first two rows)**  
*Given:* Place queens on a 4×4 board so no two share row, column or diagonal.  
*Find:* A valid placement for the first two rows.  
Place row 1, column 1. Row 2: column 1 attacked, prune; column 2 attacked on diagonal, prune; column 3 safe. Continue…  
**Valid partial board after two rows: Q in (1,1) and (2,3).**  
*Reflection:* Column and diagonal attacks are checked incrementally; any later row that would reuse those lines is pruned without ever being tried.

**Example 3 — Graph colouring with 3 colours**  
*Given:* Cycle \(C_5\) and colours {R,G,B}.  
*Find:* Proper 3-colouring.  
Colour vertex 1 R. Vertex 2 cannot be R; try G. Vertex 3 cannot be G; try B. Vertex 4 cannot be B; try R. Vertex 5 cannot be R (adjacent to 1) and cannot be B (adjacent to 4) → only G left, yet G conflicts with vertex 2. Prune at vertex 5. Backtrack to vertex 4, try G instead…  
**No 3-colouring exists (after exhaustive pruned search).**  
*Reflection:* The odd cycle forces a colour conflict that is detected at the last vertex; pruning earlier would have required a more global invariant.

**Example 4 — Sudoku cell (3×3 block constraint)**  
*Given:* A partially filled 9×9 grid with only the top-left block empty.  
*Find:* Legal digits for cells (1,1) and (1,2).  
Cell (1,1) cannot be 5 (row), 7 (column), or {1,2,3,4,6,8,9} (block) → only  possible value 4. Cell (1,2) now sees 4 in block, so domain shrinks before enumeration.  
**Cell (1,1) fixed to 4; domain of (1,2) reduced by one before any trial.**  
*Reflection:* Domain reduction performed by constraint propagation is a static form of pruning that shrinks the tree before search even begins.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Checking constraints only at leaves | Programmer believes “we must generate a full candidate first” | Evaluate every constraint whose scope is covered as soon as the last variable in its scope is assigned. |
| Recomputing the same partial sums or conflicts | No memoisation of path aggregates | Maintain running aggregates (weight, attacked columns, etc.) that are updated on descent and restored on backtrack. |
| Forgetting to restore state after backtrack | Mutable arrays or sets are not undone | Use an explicit undo stack or recursion with value-copy of only the changed variables. |
| Pruning too late (off-by-one level) | Constraint test placed after the recursive call | Place the test immediately after extending the current variable, before recursing. |
| Treating symmetric variables identically | Failure to break symmetry | Add ordering constraints (e.g., \(x_i\le x_{i+1}\)) or use canonical ordering during extension. |
| Ignoring that some constraints become evaluable only later | Over-eager pruning with incomplete information | Maintain two sets: constraints that can be checked now and those deferred until more variables are bound. |
| Returning the first solution without verifying optimality | Optimisation problem mis-modelled as decision | Keep a global incumbent and prune only branches whose upper bound cannot beat the incumbent. |

## 7. The textbook-precise statement
Backtracking performs a depth-first traversal of the state-space tree \(T\) whose nodes are partial assignments \(\sigma\) of length \(\ell(\sigma)\). At each node the algorithm evaluates the partial-constraint predicate \(P(\sigma)\). If \(P(\sigma)=\text{false}\), the subtree is pruned; otherwise the algorithm recurses on every legal extension of \(\sigma\). The search returns every leaf at which \(P\) remains true (or the first such leaf, depending on the variant).  
Cormen et al., *Introduction to Algorithms*, 4e, Chapter 15, §15.3 (“Backtracking”).

## 8. Visual — diagram or schematic
```text
Level 0          (empty)
                 /   |   \
Level 1        x1=0  x1=1  x1=2
               / \   / \   / \
Level 2     x2=0 x2=1 … … … …
               X          (X = pruned: partial sum already > target)
```
The “X” marks a node where \(P(\sigma)=\text{false}\); none of its descendants are visited.

## 9. The memory technique
1. **The hook** — Picture an orchard where every branch that has already grown sour fruit is chainsawed off before any further blossoms appear; the chainsaw is the predicate \(P\).
2. **What to overlearn** — The three-line skeleton: extend, test \(P\), recurse-or-prune; the monotonicity guarantee that once \(P\) fails it stays false.
3. **Spaced-repetition schedule** — Review the definition and the four-line algorithm at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from the Cartesian-product generator by inserting the earliest possible predicate test that depends only on the variables already chosen.

## 10. What this unlocks
Backtracking with pruning is the algorithmic substrate for every modern constraint solver and supplies the search engine inside SAT, CSP, and ILP solvers.  

- Branch-and-bound optimisation  
- Dancing Links and exact-cover algorithms  
- Monte-Carlo tree search with pruning heuristics  
- Conflict-driven clause learning in CDCL SAT solvers  

## 11. Self-check — five questions, no answers
1. For the subset-sum instance \(\{2,3,5,7\}\) target 10, how many nodes of the state-space tree are visited when pruning is applied versus when it is omitted?  
2. In the 8-Queens problem, give a partial column assignment after three rows that can be pruned by the diagonal-attack constraint alone.  
3. Why does maintaining a single mutable “used-column” bit-mask require an explicit undo step on backtrack, whereas a purely functional copy would not?  
4. A programmer places the feasibility test after the recursive call instead of before. Construct a concrete counter-example showing that the algorithm now explores an exponential number of provably infeasible leaves.  
5. Prove that if every constraint scope is a prefix of the variable ordering, then backtracking examines a tree whose size is at most linear in the number of feasible solutions.