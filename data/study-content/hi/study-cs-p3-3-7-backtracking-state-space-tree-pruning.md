## 1. The one-sentence answer
**Backtracking systematically explores a state-space tree while pruning branches that violate constraints, thereby avoiding exhaustive enumeration of all possibilities.**

Backtracking recursion ke through partial solutions ko build karta hai. Har step par aap check karte hain ki current path constraints satisfy karti hai ya nahi. Agar nahi, to us branch ko turant discard kar dete hain bina aage jaaye.

State-space tree ek imaginary tree hai jisme har node ek partial solution represent karta hai aur har edge ek choice ko dikhata hai. Pruning is tree ko chhota karta hai taaki computation time kam ho jaaye.

> [!NOTE]
> The core “aha” is that correctness is preserved even after aggressive pruning because any pruned subtree is provably incapable of yielding a valid solution.

## 2. Why this matters — concrete and current
Google’s OR-Tools uses backtracking with pruning to solve large-scale vehicle-routing and job-shop scheduling problems for logistics companies such as UPS and FedEx.  

SpaceX’s ground-support software employs backtracking to generate feasible launch-window sequences under hundreds of hardware and safety constraints.  

Semiconductor EDA tools from Synopsys and Cadence rely on backtracking-based place-and-route engines to satisfy timing and power constraints inside modern 3 nm chips.  

Modern SAT solvers (MiniSat, Glucose) embed backtracking over the implication graph; pruning via conflict-driven clause learning lets them handle industrial verification problems with millions of variables.  

Protein-structure prediction pipelines (e.g., Rosetta) apply backtracking to enumerate and prune side-chain packing configurations that violate steric constraints.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Recursion        | Backtracking is depth-first recursion with early exit.    |
| Depth-first search | The traversal order of the state-space tree is DFS.     |
| Constraint checking | Every node must be validated before children are generated. |
| Time-complexity analysis | You must argue why pruning changes worst-case bounds. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Representing choices as a tree
Aap har decision ko ek level par rakhte ho; har level par possible choices children ban jaate hain.  
Example: 4-Queens problem mein row 1 se 4 tak, har row mein 4 columns possible hain.  
Formally, the state-space tree \(T\) is defined by a root \(\epsilon\) (empty assignment) and children of a node \(s\) are all one-step extensions \(s\cup\{(i,v)\}\) that satisfy the partial constraints up to level \(i\).  
> [!WARNING]  
> If you generate children before checking the constraint at the current node, the tree size explodes exponentially.

### Step 2 — Depth-first traversal
Aap left-to-right DFS karte ho, har path ko complete solution tak le jaane ki koshish karte ho.  
Example: N-Queens mein pehli queen column 1 mein rakh kar aage badho.  
Formally, the search performs a preorder traversal of \(T\) and records a leaf only when its depth equals \(n\) and all constraints hold.

### Step 3 — Constraint test at each node
Har node par ek boolean predicate \(P(s)\) evaluate karo. Agar \(P(s)=\text{false}\), subtree discard kar do.  
Example: same column ya diagonal attack check.  
Formally, \(P(s)\) must be monotonic: if \(P(s)=\text{false}\) then every descendant also fails.

### Step 4 — Pruning via bounding functions
Agar ek optimistic estimate bhi final objective ko satisfy nahi kar sakta, prune kar do.  
Example: partial sum already target se bada ho to subset-sum branch cut.  
Formally, introduce an upper-bound function \(U(s)\) such that \(U(s)<\) target \(\implies\) prune.

### Step 5 — Backtrack on failure or success
Jab leaf mil jaaye ya prune ho jaaye, control parent node par wapas aata hai aur agla sibling try karta hai.  
Formally, the algorithm returns from the recursive call after marking the variable unassigned.

## 5. Worked examples — har step show karo

**Example 1 — 2-Queens (tiny illustration)**  
*Given:* Place 2 queens on 2×2 board, no two attack.  
*Find:* All solutions.  
Step 1: root \(\epsilon\).  
Step 2: place queen(1,1). \(P=\) true.  
Step 3: place queen(2,1) → attack, prune.  
Step 4: place queen(2,2) → attack, prune.  
Backtrack, try queen(1,2). Symmetric failure.  
**No solution.**  
*Reflection:* Early column check pruned the entire tree of size 4 in two steps.

**Example 2 — Subset sum {3,7,2}, target 9**  
*Given:* Positive integers and target.  
*Find:* Subset that sums to target.  
Root: sum=0.  
Add 3 → sum=3. Add 7 → sum=10 >9, prune. Backtrack, add 2 → sum=5. Add 7 → sum=12, prune. Backtrack, add nothing more.  
No solution found after exploring only 5 of 8 subsets.  
**Final answer: no subset.**  
*Reflection:* Numeric bound pruned two branches immediately.

**Example 3 — 4-Queens (standard)**  
*Given:* 4×4 chessboard.  
*Find:* All placements.  
After systematic DFS+pruning, exactly two distinct solutions exist (rotations counted separately).  
**Final answer: two solutions.**  
*Reflection:* 256 naïve leaves reduced to fewer than 20 nodes visited.

**Example 4 — Hamiltonian path on K₄ minus one edge**  
*Given:* Graph with vertices {A,B,C,D} and all edges except B–D.  
*Find:* Path visiting each vertex once.  
Start A-B-C-D fails (no B-D). Backtrack at C, try A-C-B-D; edge B-D missing, prune. Eventually A-C-D-B succeeds.  
**Final answer: A-C-D-B.**  
*Reflection:* Graph adjacency check acts as the pruning predicate.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Checking constraints only at leaves | Forgetting monotonicity of \(P\)           | Evaluate \(P\) at every node                 |
| Not unassigning variables on backtrack | Side-effects in mutable state               | Always restore state before returning        |
| Overly loose bounding function | \(U(s)\) too optimistic, little pruning     | Derive tighter relaxations (LP, greedy)      |
| Duplicate work across symmetric branches | Missing symmetry-breaking constraints       | Add ordering constraints (e.g., \(x_i < x_{i+1}\)) |
| Recursion depth exceeding stack limit | Large \(n\) without iterative simulation    | Increase stack or convert to explicit stack  |
| Returning first solution without counting | Misreading problem statement                | Keep a counter or flag as required           |
| Ignoring early termination when all solutions requested | Continuing search after goal met            | Add a global “found-enough” flag             |

## 7. The textbook-precise statement
A backtracking algorithm explores the state-space tree \(T\) in depth-first order. For each node \(s\) it evaluates a predicate \(P(s)\) that is monotonic: \(P(s)=\text{false}\) implies \(P(s')=\text{false}\) for every descendant \(s'\). If \(P(s)=\text{false}\), the subtree rooted at \(s\) is pruned. When a leaf of depth \(n\) satisfies \(P\), it is recorded as a solution. The procedure is exactly depth-first search with early termination on failure of \(P\) (Cormen et al., Introduction to Algorithms, 3e, §15.2 “Backtracking”).

## 8. Visual — diagram or schematic
```text
Level 0          ε
                /|\
Level 1       s1 s2 s3
             /  \   \
Level 2    s11 s12  s31
            X   |     \
Level 3       s121   s311   (X = pruned by P(s)=false)
```

## 9. The memory technique
**The hook** — Imagine a rat in a maze that smells cheese only along valid corridors; the moment the corridor smells wrong it instantly turns back (prunes).  
**What to overlearn** — (1) \(P(s)\) must be monotonic, (2) pruning never removes valid solutions, (3) time complexity is \(O(b^d)\) in worst case but far smaller after pruning.  
**Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — Re-derive by writing the recursive skeleton: choose variable → extend partial assignment → test \(P\) → recurse or prune → undo.

## 10. What this unlocks
Backtracking is the foundation for branch-and-bound, constraint programming, and modern SAT solvers.  

- Branch-and-bound adds cost bounds for optimisation.  
- Conflict-driven clause learning augments pruning with learned constraints.  
- Dancing Links (Knuth) accelerates exact-cover backtracking.  
- Hybrid solvers combine backtracking with local search or linear-programming relaxations.

## 11. Self-check — five questions, no answers
1. In the 4-Queens state-space tree, how many nodes are pruned immediately after placing the first queen in column 2?  
2. Why does monotonicity of \(P\) guarantee that pruning never discards a valid solution?  
3. Give a concrete bounding function \(U(s)\) for the 0-1 knapsack problem that is tighter than total remaining weight.  
4. Identify the symmetry that causes duplicate solutions in the naïve N-Queens formulation and write the ordering constraint that removes it.  
5. A student reports that their backtracking Sudoku solver visits every empty cell even after a contradiction is found two rows later. Which trap have they fallen into and how do they fix it?