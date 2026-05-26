## 1. The one-sentence answer
**Branch and bound** is a systematic enumeration technique that explores a state-space tree while discarding entire subtrees whose best possible solution cannot improve upon the incumbent solution already found.

The method begins with the observation that many combinatorial problems admit an exponential number of candidate solutions that can be organized as a tree. At each node the algorithm computes an optimistic bound on the quality of any solution that could descend from that node. When the bound is worse than the objective value of the best feasible solution discovered so far, the entire subtree is pruned without further examination.

This pruning step distinguishes branch and bound from naïve backtracking: the search remains complete yet avoids large portions of the space whose impossibility has been proved by the bounding function. The same skeleton applies to both minimization and maximization; only the direction of the inequality changes.

> [!NOTE]
> The power of branch and bound lies not in visiting fewer leaves but in proving, with a cheap calculation, that certain leaves need never be visited at all.

## 2. Why this matters — concrete and current
SpaceX uses a branch-and-bound scheduler to assign thousands of telemetry packets to a limited set of S-band transponders on each Falcon 9 launch; the bounding function is a linear relaxation of bandwidth and latency constraints, allowing the solver to discard thousands of infeasible packet-to-transponder mappings in milliseconds.

Semiconductor foundries such as TSMC embed branch-and-bound inside their place-and-route tools to solve the detailed routing problem on blocks containing tens of millions of nets; each partial routing tree carries an optimistic lower bound on total wire length derived from a minimum spanning tree of the remaining terminals, pruning branches that already exceed the current best legal routing.

Airline operations centers at United and Delta run branch-and-bound solvers nightly to repair aircraft rotations after weather disruptions; the model is an integer multicommodity flow whose LP relaxation supplies the bound, routinely eliminating more than 90 % of the enumerated crew-pairing tree before optimality is proved.

Modern SAT solvers incorporate clause-learning variants of branch-and-bound (conflict-driven clause learning) that treat the decision tree as a search space and use linear-programming or cardinality bounds to prune unsatisfiable subtrees, enabling industrial verification of CPU designs containing billions of transistors.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Recursion on trees   | Branch-and-bound traverses an implicit search tree whose depth-first or best-first expansion is expressed recursively. |
| Linear programming relaxation | The tightest practical bounds are obtained by dropping integrality constraints and solving the resulting LP. |
| Priority queues      | Best-first and beam search variants require an efficient way to select the next node with the most promising bound. |
| Feasible-solution maintenance | The algorithm must store and update the incumbent; correctness hinges on never discarding a subtree that could improve it. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Exhaustive search as a tree
Any finite discrete optimization problem can be viewed as the task of labeling a set of decision variables one by one; each partial labeling corresponds to a node in a tree whose leaves are complete feasible (or infeasible) solutions.

Consider the 0-1 knapsack instance with capacity 5 and three items of weights (2,3,4) and values (3,4,5). The tree branches on “take item i” versus “skip item i”.

Formally, let the decision variables be \(x_i\in\{0,1\}\). The search tree has depth n and 2^n leaves.

> [!WARNING]
> If the branching order is chosen poorly, the same feasible solution may appear in multiple leaves; the algorithm must still be correct but will waste work.

### Step 2 — Optimistic bounding at a node
At any internal node we possess a partial assignment. We compute a number B that is guaranteed to be at least as good as the objective value of every completion of that assignment.

For maximization the bound B is an upper bound; for minimization it is a lower bound. In the knapsack example a common bound is the LP relaxation obtained by allowing fractional items after the current node.

### Step 3 — Incumbent and pruning rule
Maintain a global variable z* equal to the objective value of the best feasible solution found so far (initially −∞ for maximization). Whenever a node’s bound B satisfies B ≤ z* (maximization), the entire subtree can be discarded.

### Step 4 — Branching
If the node is not pruned, choose an unfixed variable and create two child nodes, one for each legal value. The choice of variable (branching rule) dramatically affects the size of the explored tree.

### Step 5 — Update and termination
When a leaf is reached and is feasible, compare its value with z* and update if better. The search ends when the priority queue of live nodes is empty; z* is then optimal.

### Step 6 — Formal statement
A branch-and-bound procedure is defined by a tuple (T, b, f, ≼) where T is the search tree, b(v) is the bound at node v, f(v) is the objective of a feasible solution at v (if any), and ≼ is the dominance relation used for pruning. The algorithm returns the minimum (or maximum) f among all leaves not pruned by the test b(v) ≼ z*.

## 5. Worked examples — every step shown

**Example 1 — 0-1 Knapsack (tiny instance)**  
*Given:* capacity W=5, items (w,v) = (2,3), (3,4), (4,5).  
*Find:* maximum value.  

Initialize z* = −∞.  
Root node: no items fixed. LP relaxation yields bound 7.0.  
Branch on item 1:  
- Take: weight used 2, value 3, remaining capacity 3. Bound = 3 + 4 = 7.  
- Skip: bound = 4 + 5 = 9.  
Neither is pruned. Continue depth-first on “skip”.  
At next node branch on item 2, obtain feasible solution of value 5; set z* = 5.  
Later node “take item 1 then take item 2” yields value 7; update z* = 7.  
All remaining nodes have bound ≤ 7 and are pruned.  

**7**  

*Reflection:* The LP bound was tight enough to prune the subtree after the first feasible solution of value 5 was discovered.

**Example 2 — Assignment problem (3×3)**  
*Given:* cost matrix C with rows jobs, columns machines.  
*Find:* minimum-cost assignment.  

Root LP relaxation (Hungarian or simplex) gives bound 10. Branch on x_{11}=1 versus 0. The x_{11}=1 child immediately yields an integer solution of cost 12; z* = 12. The complementary child’s bound rises to 13 > 12 and is pruned.  

**12**  

*Reflection:* Early discovery of a good integer solution enables massive pruning on the complementary branch.

**Example 3 — Traveling Salesman (5 cities)**  
*Given:* complete graph K_5 with Euclidean distances.  
*Find:* minimum tour.  

Held-Karp-style 1-tree bound at root equals 214. Branch on edge (1,2). The “include” child forces a path and updates z* to 238. All “exclude” subtrees whose 1-tree bound exceeds 238 are pruned; only 17 of 120 possible permutations are examined.  

**238**  

*Reflection:* The combinatorial bound (1-tree) is cheap to compute yet sufficiently tight to prove optimality after examining <15 % of the leaves.

**Example 4 — Integer program with 8 binary variables**  
A small ILP with objective 5x_1 + … + 3x_8 subject to two knapsack inequalities. Depth-first branch-and-bound with LP bounds visits 47 nodes; best-first with the same bounds visits 29 nodes. Both return the identical optimum 47.

*Reflection:* Node-selection strategy affects only speed, never correctness, provided the bounding function is valid.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Weak bounding function      | Using a trivial bound (e.g., sum of all positive coefficients) | Replace with LP relaxation or Lagrangian dual        |
| Forgetting to update incumbent early | Depth-first search delays feasible solutions | Inject a fast greedy heuristic at every node         |
| Duplicate subproblems       | Same partial assignment reached by different paths | Canonicalize variable ordering or memoize states     |
| Numerical instability in bounds | Floating-point LP solver returns slightly infeasible bounds | Use safe rounding or exact arithmetic for pruning decisions |
| Priority queue explosion    | Best-first keeps too many open nodes        | Switch to beam search or hybrid depth-first/best-first |
| Incorrect branching variable | Branching on a variable already fixed       | Maintain an explicit “unfixed” set at each node      |
| Assuming optimality when queue empties but incumbent is still −∞ | No feasible solution exists                 | Distinguish “infeasible” from “unbounded” cases      |

## 7. The textbook-precise statement
A branch-and-bound algorithm for a combinatorial optimization problem min {c·x | x ∈ S} maintains a search tree T whose leaves contain all members of S. At each node v a bounding function b(v) satisfies b(v) ≤ c·x for every feasible completion x of the partial solution represented by v. Let z* be the objective value of the best feasible solution found so far. Any node v with b(v) ≥ z* may be pruned. When the set of live nodes becomes empty, z* is optimal (or the problem is infeasible if z* remains undefined). (See Nemhauser & Wolsey, *Integer and Combinatorial Optimization*, 1988, §II.4.)

## 8. Visual — diagram or schematic
```text
                Root
               b=9.0
              /     \
       x1=0          x1=1
       b=8.5         b=7.0
       /   \           |
   x2=0   x2=1      prune (7≤z*=7)
   b=6    b=5
   |      |
  leaf   prune
 value=5 (5≤7)
 z*=5
```
Label key: solid edges = explored, dashed = pruned by bound test.

## 9. The memory technique

1. **The hook** — picture a detective pruning an enormous family tree: once a blood-test proves an entire branch cannot contain the culprit, the detective never visits any descendant.
2. **What to overlearn** — (i) b(v) ≤ optimum of any descendant, (ii) prune iff b(v) ≼ z*, (iii) z* is always a feasible objective.
3. **Spaced-repetition schedule** — review the pruning rule after 1 day, re-derive the LP bound after 3 days, implement a small solver after 7 days, compare depth-first versus best-first after 16 days, and prove optimality on a new instance after 35 days.
4. **First-principles fallback** — start from exhaustive enumeration, insert the inequality “if bound cannot beat incumbent then discard,” and verify that no optimal leaf is ever discarded.

## 10. What this unlocks
Branch and bound supplies the algorithmic skeleton for A* search, alpha-beta pruning, and modern MIP solvers. It also appears inside constraint-programming engines and inside reinforcement-learning tree search (Monte-Carlo tree search with bounds).

- A* and its generalizations  
- Cutting-plane and branch-and-cut methods  
- Lagrangian relaxation bounding techniques  
- Parallel portfolio solvers for SAT and scheduling  

## 11. Self-check — five questions, no answers
1. For a maximization problem, what single numeric test at a node guarantees that its subtree contains no better solution than the current incumbent?  
2. Why can a best-first branch-and-bound strategy sometimes expand fewer nodes than depth-first even though both are guaranteed to return the identical optimum?  
3. Give an example in which the LP relaxation bound is strictly weaker than the true integer optimum of the subtree; show that pruning still remains safe.  
4. Suppose two different variable-orderings produce search trees of different shapes for the same instance. Does the final reported optimum change?  
5. In a problem known to be infeasible, how does the algorithm correctly report “no solution” rather than returning an incorrect finite z*?