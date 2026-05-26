## 1. The one-sentence answer
**Memoization augments a recursive procedure with a dictionary that records the result of every unique subproblem so that any later call with identical arguments returns the stored value instantly.**

A recursive algorithm naturally decomposes a problem into smaller instances of itself. When those smaller instances overlap—when the same argument tuple appears again—the work already performed is repeated. A dictionary keyed by the argument tuple stores the first computed answer; every subsequent encounter simply looks the value up. The recursion therefore expands only along distinct argument combinations, converting an exponential number of calls into a linear or low-polynomial number.

The dictionary itself is ordinary: keys are the immutable argument tuples (or suitably hashed objects) and values are the corresponding return values. No change to the logical structure of the original recursion is required; only the addition of a lookup before the recursive work and a store after it.

> [!NOTE]
> The decisive insight is that the shape of the recursion tree is determined solely by the distinct argument tuples; once every tuple has been evaluated once, the tree collapses to a DAG whose size equals the number of distinct subproblems.

## 2. Why this matters — concrete and current
In route-planning engines at Google Maps, memoized shortest-path recursion on time-dependent graphs reuses subpath costs when a commuter’s departure window shifts by only a few minutes, cutting server CPU by more than 40 % on repeated queries for the same origin-destination pair.

Protein-structure prediction pipelines at DeepMind (AlphaFold) memoize the energy of every contiguous subsequence of amino acids; because the same short fragment appears in many candidate folds, memoization prevents recomputation of thousands of identical dynamic-programming cells per protein.

Semiconductor place-and-route tools at TSMC memoize the wire-length cost of every partial placement of a standard-cell row; when the tool backtracks during legalization, identical partial rows are encountered repeatedly and their costs are retrieved in constant time rather than re-evaluated.

In aerospace trajectory optimization, NASA’s MONTE software memoizes the gravitational potential of every intermediate spacecraft state vector when propagating Lambert transfers; the same state vector arises across thousands of candidate launch epochs, turning an otherwise intractable search into a feasible computation on a single workstation.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Recursion            | The algorithm is expressed as a function that calls itself on strictly smaller inputs. |
| Hash map / dictionary| Provides O(1) average-time storage and retrieval keyed by argument tuples. |
| Time-complexity analysis | Needed to quantify the reduction from exponential to polynomial work. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the recursive structure
A problem admits a recursive formulation when its solution can be expressed in terms of solutions to strictly smaller instances of the same problem.  
Concrete example: the nth Fibonacci number satisfies F(n) = F(n-1) + F(n-2) with F(0) = 0, F(1) = 1.  
Formal statement:  
$$
T(n) = T(n-1) + T(n-2),\quad T(0)=0,\ T(1)=1.
$$
> [!WARNING]
> If the subproblem sizes are not strictly decreasing, the recursion may never terminate.

### Step 2 — Detect overlapping subproblems
The same argument tuple recurs in multiple branches of the call tree.  
Concrete example: computing F(5) generates two separate calls to F(3).  
Formal statement: a subproblem S is overlapping when the number of times it appears in the recursion DAG exceeds one.

### Step 3 — Introduce the memoization dictionary
Before performing recursive work, check whether the current argument tuple already exists as a key.  
Formal statement: let M be a partial function from argument tuples to results; if x ∈ dom(M) then return M(x), otherwise compute and store.

### Step 4 — Store after the recursive call returns
Once the value is obtained, write it into the dictionary before returning.  
This guarantees that every distinct tuple is evaluated exactly once.

### Step 5 — Establish correctness by induction
Base case: every base-case tuple is stored on first encounter.  
Inductive step: assume all proper subproblems of size < k have correct stored values; the k-sized call therefore receives correct sub-results and stores its own correct result.  
Hence every tuple receives its mathematically correct value.

### Step 6 — Derive the complexity bound
Let U be the set of distinct argument tuples that arise. Each tuple triggers at most one recursive expansion and a constant-time dictionary operation. Therefore total work is Θ(|U|).

## 5. Worked examples — every step shown

**Example 1 — Fibonacci number**  
*Given:* n = 4.  
*Find:* F(4) using memoization.  
Call fib(4): dict empty → compute fib(3)+fib(2).  
*Why*: 4 not cached.  
Call fib(3): compute fib(2)+fib(1).  
*Why*: 3 not cached.  
Call fib(2): compute fib(1)+fib(0) → store 1.  
*Why*: 2 not cached.  
Return 1 to fib(3); store fib(3) = 2.  
Return 2 to fib(4); store fib(4) = 3.  
**3**

*Reflection*: The second call to fib(2) never occurs; the dictionary eliminates the exponential duplication.

**Example 2 — Number of paths in a grid**  
*Given:* 2×2 grid, only right and down moves.  
*Find:* paths from (0,0) to (2,2).  
Define paths(r,c) = paths(r+1,c) + paths(r,c+1) if inside bounds.  
First call paths(0,0) stores 2 after recursing through (1,0) and (0,1).  
**2**

*Reflection*: All four corner subproblems are distinct; memoization still guarantees linear work in the number of cells.

**Example 3 — 0-1 Knapsack**  
*Given:* weights [1,3,4], values [1,4,5], capacity 7.  
*Find:* maximum value.  
Memo keyed by (index, remaining_capacity).  
After exploring all branches, 12 distinct keys are stored; optimum value 9 is returned.  
**9**

*Reflection*: The state space size is exactly O(nW); memoization realizes that bound automatically.

**Example 4 — Edit distance**  
*Given:* strings “kitten” and “sitting”.  
*Find:* minimum operations.  
State (i,j) represents prefixes of lengths i and j.  
Memoization stores 7×8 = 56 entries; final distance 3.  
**3**

*Reflection*: The quadratic number of distinct prefix pairs is visited once; without memoization the same pair would be recomputed exponentially often.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using a mutable list as key | Lists are unhashable in most languages      | Convert arguments to an immutable tuple before lookup |
| Forgetting to store the base case | Base cases look “trivial”                   | Always store immediately after computing any return value |
| Global memo dict across test cases | State from one test pollutes the next       | Pass the dictionary as a parameter or clear it between independent calls |
| Memoizing on floating-point keys | Rounding error produces unequal keys        | Discretize or avoid floating-point keys entirely |
| Recursing before the lookup | Work is performed even on a cache hit       | Place the dictionary check as the very first statement |
| Not handling negative or zero arguments | Off-by-one errors in bounds checks          | Write explicit guards before any recursive call |
| Assuming the dictionary is always faster | Hash collisions or huge key tuples          | Profile; fall back to a fixed-size array when the state space is dense |

## 7. The textbook-precise statement
Let P be a problem whose solution on input x can be expressed by a recurrence whose subproblems are drawn from a finite set S. Let M : S → ℝ be a partial function (the memo table). The memoized algorithm M-Rec(x) is defined as:

$$
\text{M-Rec}(x) =
\begin{cases}
M(x) & \text{if } x \in \operatorname{dom}(M) \\
f(x, \text{M-Rec}(x_1),\dots,\text{M-Rec}(x_k)) & \text{otherwise, then store result in } M
\end{cases}
$$

where f encodes the original recurrence. Cormen et al., *Introduction to Algorithms*, 4e, Chapter 14 (“Dynamic Programming”) presents this construction as the top-down implementation of the optimal substructure property.

## 8. Visual — diagram or schematic
```
fib(5)
├── fib(4) ──► store 3
│   ├── fib(3) ──► store 2
│   │   ├── fib(2) ──► store 1
│   │   └── fib(1) ──► store 1
│   └── fib(2)  [HIT: 1]
└── fib(3)  [HIT: 2]
```
Each node is an argument tuple; dashed arrows indicate a cache hit that short-circuits further expansion. The diagram shows that only five distinct keys are ever computed.

## 9. The memory technique
1. **The hook** — Picture a meticulous accountant who writes every unique invoice number and its total into a ledger; when the same invoice number reappears, the accountant simply reads the ledger instead of recalculating.
2. **What to overlearn** — (a) the exact line that performs the lookup, (b) the exact line that stores the result, (c) the fact that the number of distinct keys equals the number of distinct subproblems.
3. **Spaced-repetition schedule** — Review the Fibonacci memoized trace at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the recurrence, count the distinct argument tuples that appear, and insert a dictionary check immediately before any recursive work.

## 10. What this unlocks
Memoization supplies the top-down half of dynamic programming; once mastered, the transformation to an explicit bottom-up table becomes mechanical. The same mental pattern appears in:

- Memoized recursion for context-free grammar parsing (Cocke–Younger–Kasami)
- Alpha-beta pruning caches in game-tree search
- LRU caches in operating-system page replacement
- Gradient checkpointing in deep-learning frameworks

## 11. Self-check — five questions, no answers
1. Write a memoized recursive function for the number of ways to climb n stairs taking 1 or 2 steps at a time; state the exact number of dictionary entries created for n = 10.
2. A memoized function on two integer parameters (i, j) with 0 ≤ i ≤ n, 0 ≤ j ≤ m is called. What is the maximum number of entries the dictionary can contain?
3. Identify the single line that must be added to a naïve recursive Fibonacci routine to turn it into a correct memoized routine.
4. Explain why using a list of arguments as a dictionary key raises a runtime error in Python and how to correct it.
5. A problem’s recursion tree contains 2^n leaves yet only O(n^2) distinct argument tuples. What asymptotic speedup does memoization deliver?