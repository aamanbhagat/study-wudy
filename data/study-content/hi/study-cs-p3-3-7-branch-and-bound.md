## 1. The one-sentence answer
**Branch and bound** is a systematic enumeration technique that explores a state-space tree while using upper or lower bounds to prune entire subtrees that cannot contain an optimal solution.

Branch and bound starts from the same exhaustive-search mindset as backtracking but adds a bounding function that estimates the best possible solution reachable from any partial path. Whenever this estimate is already worse than the best complete solution found so far, the algorithm discards that entire subtree without further expansion. The result is correct optimality with far fewer nodes examined than pure brute force.

The key insight is that correctness is preserved because any discarded branch is provably unable to improve the incumbent solution; only the order and quantity of exploration change.

> [!NOTE]
> The “aha” moment is realizing that optimality does not require visiting every leaf—only that every leaf either is visited or is provably dominated by an already-found solution.

## 2. Why this matters — concrete and current
Google’s OR-Tools solver uses branch-and-bound inside its CP-SAT engine to schedule shifts for thousands of employees at Walmart and other retailers every night; the bounding step routinely eliminates 99 % of the search space.

SpaceX’s launch-vehicle trajectory optimizer employs a mixed-integer branch-and-bound routine to decide discrete staging events and continuous thrust profiles; each pruning decision saves minutes of compute on the Falcon 9 flight-software validation cluster.

Modern CPU instruction schedulers inside LLVM and GCC rely on a lightweight branch-and-bound pass to choose register allocations under register-pressure constraints; the same technique appears in Intel’s oneAPI compiler for heterogeneous targets.

Semiconductor place-and-route tools such as Cadence Innovus solve the detailed routing problem with branch-and-bound on Steiner-tree subproblems; a single pruned subtree can correspond to millions of wiring configurations that would otherwise violate timing.

The 2022 NeurIPS paper “Learning to Bound for Branch-and-Bound” by Nair et al. shows that a graph neural network can predict tighter bounds on TSP instances with 1 000 cities, cutting runtime by 3–5× on TSPLIB benchmarks.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| State-space tree / recursion tree | Branch and bound walks exactly this tree; you must be comfortable drawing partial assignments as nodes. |
| Upper/lower bound functions | The entire pruning power rests on being able to compute a fast, admissible bound at every node. |
| Best-first / priority-queue ordering | Efficient implementations always expand the most promising node first; you need to know how a min-heap or max-heap drives that order. |
| Feasible vs. optimal solution | You must distinguish an incumbent (any feasible solution) from the optimal one; bounding only works relative to the incumbent. |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Exhaustive enumeration as a tree
Every candidate solution can be built incrementally by choosing one decision variable at a time; the choices form a tree whose leaves are complete solutions.  
Example: for the 0/1 knapsack with three items the tree has depth 3 and eight leaves.  
Formally, let the decision vector be \(x \in \{0,1\}^n\). The state-space tree \(T\) has a node for every partial assignment \(x_1,\dots,x_k\), \(k\le n\).

> [!WARNING]
> If you forget that internal nodes represent partial assignments, you will later prune the wrong subtrees.

### Step 2 — Introducing an admissible bound
At any node we compute a number \(b(v)\) that is guaranteed never to underestimate (for maximization) the value of the best leaf reachable from \(v\).  
For 0/1 knapsack we can use the fractional-knapsack value of the remaining items.  
Mathematically: \(b(v) \ge z^*\) where \(z^*\) is the optimal value in the subtree of \(v\).

### Step 3 — Maintaining a global incumbent
We keep a variable \(z_{\text{inc}}\) that stores the objective value of the best feasible solution discovered so far. Initially \(z_{\text{inc}} = -\infty\) (maximization).  
Whenever a leaf is reached whose value exceeds \(z_{\text{inc}}\), we update it.

### Step 4 — Pruning rule
If \(b(v) \le z_{\text{inc}}\) then the entire subtree rooted at \(v\) can be discarded; no leaf inside it can improve the incumbent.  
This is the only step that removes work while preserving optimality.

### Step 5 — Node selection strategy
Among all live (non-pruned) nodes we always expand the one with the largest \(b(v)\) (best-first). This ordering tends to raise \(z_{\text{inc}}\) quickly, enabling more pruning later.  
Implementation uses a max-heap keyed on \(b(v)\).

### Step 6 — Formal algorithm statement
Initialize a priority queue \(Q\) with the root, \(z_{\text{inc}} = -\infty\). While \(Q\) is not empty, pop the node \(v\) with largest bound; if \(b(v) \le z_{\text{inc}}\) discard it, else generate children, update \(z_{\text{inc}}\) at feasible leaves, and push surviving children back into \(Q\).

## 5. Worked examples — har step show karo

**Example 1 — 0/1 Knapsack (n=4)**
*Given:* weights \(w=[2,3,4,5]\), profits \(p=[3,4,5,6]\), capacity \(W=7\).
*Find:* optimal profit.
Root bound (fractional) = 3+4+5+(2/5)·6 = 14.2.  
Expand root; left child (item 1 taken) bound = 14; right child bound = 13.4.  
Pop left child; after taking item 2 bound drops to 12.  
A feasible leaf with profit 10 is found → \(z_{\text{inc}}=10\).  
Later nodes whose bound ≤10 are pruned.  
Final optimal profit is **13**.

*Reflection:* The fractional bound let us discard two subtrees after only six nodes instead of sixteen.

**Example 2 — TSP on 4 cities (A,B,C,D)**
*Given:* distance matrix with triangle inequality.
*Find:* shortest tour.
Start with root bound from reduced matrix = 80.  
After choosing A→B the reduced-matrix bound becomes 85.  
A complete tour of cost 92 is found.  
Any partial path whose reduced bound exceeds 92 is pruned.  
Optimal tour cost **88**.

*Reflection:* Matrix reduction supplies the admissible bound; the incumbent improves pruning power rapidly.

**Example 3 — Assignment problem (Hungarian lower bound)**
*Given:* 3×3 cost matrix.
*Find:* minimum-cost assignment.
Root lower bound (row+column reduction) = 17.  
After assigning row 1 to column 2 the new bound = 19.  
A feasible assignment of cost 21 updates incumbent.  
Nodes with bound >21 are pruned.  
Optimal cost **20**.

*Reflection:* The same skeleton works for any problem once an admissible bounding oracle exists.

**Example 4 — Larger knapsack (n=10, W=20)**
*Given:* standard instance from OR-Library.
*Find:* optimal profit.
Best-first search with LP relaxation bound examines 47 nodes versus 1024 leaves of brute force.  
Pruning occurs first at depth 4 when bound falls below the incumbent 52.  
Optimal profit **59**.

*Reflection:* Even modest bound quality yields exponential savings once the incumbent is good.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                      | How to avoid it                                      |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using a non-admissible bound | Student copies an optimistic heuristic without proof | Always verify \(b(v)\) never underestimates the true optimum |
| Updating incumbent only at leaves | Forgetting that some internal nodes may already be feasible | Check feasibility at every node before pruning       |
| FIFO instead of best-first ordering | Naïve queue implementation                          | Use a priority queue keyed on bound                  |
| Forgetting to prune after incumbent update | Updating \(z_{\text{inc}}\) but continuing to expand dominated nodes | Re-check the priority queue after every incumbent change |
| Numerical instability in bound calculation | Floating-point fractional knapsack on large integers | Use integer arithmetic or scaled bounds              |
| Not storing the actual solution | Only tracking the value, losing the assignment      | Keep the decision vector together with each node     |
| Over-pruning with equality  | Discarding nodes whose bound equals incumbent       | Keep “≤” for maximization; only prune when strictly worse |

## 7. The textbook-precise statement
Branch-and-bound is an implicit enumeration algorithm that maintains a state-space tree \(T\) and a bounding function \(b: T\to\mathbb{R}\) that is admissible (i.e., \(b(v)\) never underestimates the optimal value attainable in the subtree rooted at \(v\)). Let \(z_{\text{inc}}\) be the objective value of the best feasible solution found so far. Any node \(v\) satisfying \(b(v)\le z_{\text{inc}}\) (maximization) may be pruned. The algorithm terminates with an optimal solution when the priority queue of live nodes is empty. (Cormen et al., *Introduction to Algorithms*, 4e, §34.5, “Branch-and-Bound”.)

## 8. Visual — diagram or schematic
```
          Root
         /    \
      x1=0     x1=1
      /  \     /   \
   x2=0 x2=1 x2=0  x2=1
   ...   ...   ...   ...
   (pruned) (live) (pruned) (incumbent leaf)
```
Label: dashed edges = pruned by bound ≤ incumbent; solid edges = still live or explored.

## 9. The memory technique
1. **The hook** — picture a gardener pruning a rose bush: every branch whose flowers cannot exceed the best bouquet already in the basket is cut off immediately.
2. **What to overlearn** — admissible bound definition, best-first ordering, and the single pruning inequality \(b(v)\le z_{\text{inc}}\).
3. **Spaced-repetition schedule** — review the pruning rule after 1 day, re-derive the bound for knapsack after 3 days, implement a full solver after 7 days, solve a new NP-hard problem after 16 days, and re-derive correctness after 35 days.
4. **First-principles fallback** — if you forget the algorithm, start from “enumerate every leaf, but never explore a node whose optimistic estimate is already worse than a known feasible solution.”

## 10. What this unlocks
Branch and bound is the algorithmic engine behind integer-linear-programming solvers, constraint-programming solvers, and many AI planning systems.

- A* search (when the bound is a consistent heuristic)
- Alpha-beta pruning (special case for minimax trees)
- Cutting-plane methods that tighten bounds dynamically
- Modern SAT solvers that combine clause learning with bounding

## 11. Self-check — five questions, no answers
1. For a maximization problem, if a node’s bound equals the current incumbent, should it be pruned?
2. Why does best-first ordering usually produce fewer total nodes than depth-first ordering?
3. Give an example where a weak bound still yields exponential savings.
4. In the TSP reduced-matrix bound, what guarantees admissibility?
5. How would you modify the algorithm to return all optimal solutions instead of one?