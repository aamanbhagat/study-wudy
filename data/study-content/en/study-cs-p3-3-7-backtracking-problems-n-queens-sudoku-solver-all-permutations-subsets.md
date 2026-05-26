## 1. The one-sentence answer
**Backtracking is a depth-first enumeration technique that constructs candidate solutions incrementally while pruning any branch the instant it violates a problem constraint.**

It works by maintaining a partial solution and repeatedly extending it with the next legal choice. When an extension produces an inconsistency, the algorithm retracts that choice and tries the next alternative. If every possible extension has been exhausted without success, it retreats one level further. The process terminates when either a complete valid solution is found or the entire search tree has been examined.

Because the search is exhaustive yet pruned, backtracking solves any finite constraint-satisfaction problem whose feasibility can be checked locally. Its running time is exponential in the worst case, yet the pruning often renders it practical for instances whose naïve enumeration would be intractable.

> [!NOTE]
> The decisive insight is that correctness is preserved by exhaustive search while practicality is recovered by early, irrevocable rejection of doomed prefixes.

## 2. Why this matters — concrete and current
NASA’s Deep Space Network scheduling system uses a backtracking solver to assign communication windows to dozens of spacecraft while respecting antenna availability, power budgets, and light-time delays; the same engine appears in the open-source GMAT mission-design toolkit.

Modern semiconductor place-and-route tools such as those inside Synopsys IC Compiler II encode cell legalization and clock-tree synthesis as backtracking search over grid graphs, pruning placements that violate timing or density rules before expensive detailed routing begins.

Large-scale language-model training pipelines at Meta and Google rely on backtracking-based hyperparameter search (extensions of Hyperband) to allocate GPU hours across thousands of trial configurations; each trial aborts early when validation loss diverges.

Sudoku solvers embedded in Microsoft Excel and in the open-source Gurobi constraint-programming engine employ dancing-links and backtracking hybrids that routinely finish 9×9 and 16×16 instances in microseconds, demonstrating that the same core algorithm scales from recreational puzzles to industrial rostering.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Recursion                | The search naturally descends and ascends the decision tree. |
| Depth-first traversal    | Backtracking is DFS with an explicit undo step.           |
| Constraint predicate     | Feasibility must be testable on any partial assignment.   |
| Mutable state + undo     | Choices are recorded and later erased without copying structures. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Choose the next decision variable
A partial solution is extended by selecting one undecided variable and trying each of its legal values in turn.  
Example: placing queens row by row, the next variable is the column for the current row.  
Formally, let \(X = \{x_1,\dots,x_n\}\) be the variables and \(D_i\) the domain of \(x_i\). At depth \(k\) we pick an unassigned \(x_i\) and iterate \(v\in D_i\).

> [!WARNING]
> Selecting variables in a fixed rather than dynamic order can explode the tree when early choices have high degree.

### Step 2 — Check constraints on the partial assignment
Before recursing, verify that the new value does not violate any constraint involving already assigned variables.  
Example: two queens attack each other on the same column or diagonal.  
Formally, let \(C\) be the set of constraints; the test is \(\forall c\in C\) that mention only assigned variables, \(c\) holds.

> [!WARNING]
> Omitting even one binary constraint allows invalid subtrees to be explored, wasting exponential work.

### Step 3 — Recur on the reduced problem
If the partial assignment is consistent, recurse to depth \(k+1\).  
The recursive call receives the updated assignment and the remaining variables.

### Step 4 — Backtrack on failure or success
When recursion returns, undo the assignment (restore the variable to “unassigned”) and try the next value. Success may be reported immediately or all solutions may be collected.

### Step 5 — Termination and completeness
The algorithm ends when every variable is assigned (solution) or no value remains for the current variable (dead-end). Because every feasible leaf is examined exactly once, the procedure is complete.

### Step 6 — Textbook formulation
A backtracking procedure \(\textsc{Backtrack}(A)\) where \(A\) is a partial assignment returns the set of all complete extensions of \(A\) that satisfy the constraint set \(C\).

## 5. Worked examples — every step shown

**Example 1 — All subsets of \(\{1,2,3\}\)**  
*Given:* set \(S=\{1,2,3\}\).  
*Find:* every subset.  
Start with empty partial set \(P=\emptyset\).  
Try include 1: \(P=\{1\}\), recurse.  
Try include 2: \(P=\{1,2\}\), recurse.  
Try include 3: \(P=\{1,2,3\}\) — record solution, backtrack.  
Undo 3, no more elements, backtrack.  
Undo 2, try exclude 2, etc.  
All eight subsets are generated.  
**Final answer:** \(\{\},\{1\},\{2\},\{3\},\{1,2\},\{1,3\},\{2,3\},\{1,2,3\}\)  
*Reflection:* The decision at each element is binary; the tree height equals \(|S|\).

**Example 2 — Permutations of \(\{1,2,3\}\)**  
*Given:* distinct integers.  
*Find:* all orderings.  
At position 1 try 1, then at position 2 try 2, position 3 must be 3. Record [1,2,3]. Backtrack and swap 3 into position 2. Continue systematically.  
**Final answer:** all 6 permutations.  
*Reflection:* Swapping used elements avoids an extra “used” array.

**Example 3 — 4-Queens**  
*Given:* 4×4 chessboard.  
*Find:* placements with one queen per row and column, no diagonal attacks.  
Row 1, col 1 succeeds; row 2 only col 3 survives diagonal test; row 3 fails both remaining columns; backtrack to row 2, try col 4, and so on. Two solutions exist.  
**Final answer:** \([2,4,1,3]\) and \([3,1,4,2]\) (column indices).  
*Reflection:* Diagonal pruning eliminates roughly 60 % of the naïve 4! leaves.

**Example 4 — Sudoku cell (0,0) with value 5**  
*Given:* partially filled 9×9 grid.  
*Find:* legal value for empty cell (0,0).  
Try 5; column, row, and 3×3 block checks all pass; recurse to next empty cell. On later conflict the 5 is erased and 6 is attempted.  
**Final answer:** either a completed grid or “no solution under this prefix”.  
*Reflection:* Unit-propagation style early pruning is essential for 9×9 feasibility.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to undo a choice | Mutable board or array is left altered      | Always pair every assignment with its undo   |
| Checking constraints too late | Full assignment built before any test     | Validate immediately after each placement    |
| Fixed variable ordering     | Early high-branching variables explode tree | Use MRV (minimum-remaining-values) heuristic |
| Storing copies of state     | Deep copies cost \(O(n)\) per node          | Mutate and undo in \(O(1)\)                  |
| Reporting only one solution | Early return without collecting all         | Decide explicitly whether one or all are required |
| Ignoring symmetry           | Equivalent solutions rediscovered           | Add symmetry-breaking constraints when useful |
| Off-by-one indexing         | Rows/columns 0-based vs 1-based mix-up      | Standardise on 0-based arrays throughout     |

## 7. The textbook-precise statement
A backtracking algorithm explores the state space tree \(T\) whose nodes are consistent partial assignments. At each node the algorithm tries every value in the domain of the next variable; children correspond to consistent extensions. The search returns every leaf at depth \(n\) that satisfies all constraints. (Cormen et al., *Introduction to Algorithms*, 4e, §12.3 “Backtracking”.)

## 8. Visual — decision tree schematic

```text
Level 0          []
               /  |  \
Level 1      [1] [2] [3]
            / \   / \   ...
Level 2  [1,2][1,3] ...
```
Each edge represents “include/exclude next element” (or “place queen in column”). Leaves at depth 3 are the complete subsets; any internal node whose partial assignment already violates a constraint is pruned.

## 9. The memory technique
1. **The hook** — Picture a rat in a maze that paints its path with chalk; the instant it smells a dead end it erases the chalk and retreats.
2. **What to overlearn** — The four-line skeleton: choose variable, test constraints, recurse, undo.
3. **Spaced-repetition schedule** — Review the skeleton at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing the recurrence \(B(A) = \bigcup_{v\in D_i} B(A\cup\{x_i=v\})\) filtered by the consistency predicate.

## 10. What this unlocks
Backtracking supplies the algorithmic engine for every subsequent constraint-solving paradigm.  
- Branch-and-bound for integer linear programs  
- Dancing-links exact cover (Knuth)  
- Conflict-driven clause learning SAT solvers  
- Forward checking and AC-3 arc consistency in CSP textbooks  
- Monte-Carlo tree search variants that replace exhaustive enumeration with sampling

## 11. Self-check — five questions, no answers
1. How many leaves does the unpruned decision tree for 8-Queens contain?  
2. In the subset-sum problem, what single extra test performed at each node yields an exponential reduction in explored nodes?  
3. Why does swapping used elements in the permutation generator eliminate the need for an auxiliary Boolean array?  
4. A Sudoku solver reaches a cell whose domain is empty; which line of the backtracking skeleton is responsible for the immediate retreat?  
5. Suppose two variables are symmetric; give one concrete syntactic change to the generator that removes duplicate solutions without altering correctness.