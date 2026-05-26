## 1. The one-sentence answer

**Strongly Connected Components (SCCs) are the maximal subgraphs of a directed graph where every node can reach every other node via directed paths.**

A directed graph can be decomposed into SCCs that act like indivisible blocks; once you condense each SCC into a single supernode, the resulting structure is always a DAG. Kosaraju’s algorithm finds these blocks by running two DFS passes—one on the original graph and one on its transpose—while Tarjan’s algorithm discovers them in a single DFS pass by tracking discovery times and low-link values. Both run in linear time, yet they expose different trade-offs between simplicity and constant-factor efficiency.

> [!NOTE]
> The deepest insight is that reachability inside an SCC is symmetric: if u can reach v then v can also reach u, turning the component into an equivalence class under the “mutual reachability” relation.

## 2. Why this matters — concrete and current

In Google’s PageRank pipeline, the web graph is first condensed into its SCCs so that the subsequent eigenvector computation runs on a DAG; this guarantees that the linear system has a unique solution per component and prevents infinite loops during power iteration.  

Semiconductor verification tools at Intel and TSMC model register-transfer level circuits as directed graphs and extract SCCs to detect combinational loops that would create race conditions; any non-trivial SCC immediately flags a timing violation before synthesis.  

In aerospace mission planning, NASA’s Europa Clipper trajectory planner represents orbital manoeuvres as a directed graph; SCCs identify tightly coupled manoeuvre sets that must be executed atomically, allowing schedulers to treat each component as a single indivisible task.  

Modern SAT solvers such as MiniSat and Glucose use Tarjan’s algorithm on the implication graph to compute strongly connected components in linear time; each SCC that contains both a literal and its negation immediately proves unsatisfiability, enabling early termination on large industrial benchmarks.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| DFS and its recursion stack | Both algorithms rely on depth-first traversal order       |
| Transpose (reverse) graph | Kosaraju’s second pass runs on Gᵀ                         |
| Discovery time & finish time | Tarjan’s low-link values are defined using these timestamps |
| Directed acyclic graph (DAG) | The condensation graph is always a DAG                    |

If any row above is unfamiliar, pause and master it first; otherwise the subsequent steps will feel mechanical rather than intuitive.

## 4. Building the idea — from intuition to formalism

### Step 1 — Mutual reachability is an equivalence relation
A directed graph induces a relation “u can reach v”. When this relation is symmetric inside a subset, that subset forms an equivalence class.  
Example: nodes A→B→A create mutual reachability; adding C with only A→C breaks symmetry for C.  
Formally, the relation R = {(u,v) | path u→v and path v→u} is reflexive, symmetric and transitive, hence partitions V into equivalence classes.  
> [!WARNING] Treating one-way reachability as sufficient will merge unrelated components and produce an incorrect condensation DAG.

### Step 2 — The condensation is a DAG
Contract each equivalence class into a supernode; the resulting graph has no cycles because any cycle would imply mutual reachability across classes, contradicting maximality.  
Example: two SCCs {A,B} and {C} with edges A→C and C→B would force C into the first class.  
Formally, let G' = (V',E') where V' is the set of SCCs and (Cᵢ,Cⱼ) ∈ E' iff ∃u∈Cᵢ, v∈Cⱼ with (u,v)∈E. Then G' is acyclic.

### Step 3 — Kosaraju’s two-pass insight
Perform DFS on G and record nodes in order of decreasing finish times. Then run DFS on Gᵀ in that order; each tree in the second forest is an SCC.  
Example: graph A→B, B→A, B→C yields finish order C,B,A; on Gᵀ the first DFS from C finds only C, the next from B finds {B,A}.  
Formally, the second DFS forest yields exactly the SCCs because any cross edge in Gᵀ would violate the finish-time ordering.

### Step 4 — Tarjan’s single-pass low-link values
During one DFS maintain disc[u] (discovery time) and low[u] (smallest disc reachable from u’s subtree including u). When low[v] ≥ disc[u] for a child v, u is the root of an SCC.  
Example: same graph yields disc(A)=0, disc(B)=1, disc(C)=2; low(C)=2, low(B)=0, low(A)=0; B is reported as root when low(B) returns to A.  
Formally, an SCC is reported exactly when the DFS backtracks over an edge (u,v) satisfying low[v] ≥ disc[u].

### Step 5 — Correctness via stack discipline
Tarjan keeps nodes on a stack until an SCC root is found; the stack segment from root to top is exactly one SCC.  
Formally, the invariant “nodes on stack are exactly the ancestors whose SCC has not yet been output” guarantees each component is emitted once and only once.

## 5. Worked examples — har step show karo

**Example 1 — Two-node cycle**  
*Given:* vertices {1,2}, edges 1→2, 2→1.  
*Find:* SCCs using Kosaraju.  
DFS on G finishes 2 then 1. On Gᵀ the first DFS from 1 reaches 2.  
*Why* the finish order matters: later finish times become earlier roots in Gᵀ.  
**{1,2}**  

*Reflection:* trivial case shows symmetry; generalises to any cycle.

**Example 2 — Chain of three nodes**  
*Given:* 1→2→3, no back edges.  
*Find:* SCCs.  
Each node is its own SCC because no return paths exist.  
*Why* the condensation is the same chain: no mutual reachability.  
**{1},{2},{3}**  

*Reflection:* one-way paths never collapse into one component.

**Example 3 — Kosaraju on a larger graph**  
*Given:* A→B, B→C, C→A, C→D, D→E, E→D.  
*Find:* SCCs.  
Finish order on G: E,D,C,B,A. On Gᵀ first DFS from E yields {E,D}; next from C yields {C,A,B}.  
*Why* D finishes before C: subtree finishes first.  
**{A,B,C}, {D,E}**  

*Reflection:* demonstrates two separate components connected by a bridge.

**Example 4 — Tarjan low-link calculation**  
*Given:* same graph as Example 3.  
DFS order A,B,C,D,E.  
disc: A0 B1 C2 D3 E4.  
low(E)=4, low(D)=3 (back edge E→D updates), when backtracking from D to C, low(D)=3 ≥ disc(C)=2 → output {D,E}.  
*Why* low(D) stays 3: no path from D’s subtree reaches an ancestor of C.  
**{A,B,C}, {D,E}**  

*Reflection:* single DFS suffices; low-link comparison encodes the root test.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to build Gᵀ            | Students assume one pass is enough          | Always allocate a second adjacency list      |
| Using BFS instead of DFS          | BFS does not produce finish times           | Stick to DFS for both Kosaraju and Tarjan    |
| Reporting an SCC before backtracking | low-link test checked too early            | Emit component only on the exact backtrack   |
| Treating self-loops as trivial    | Self-loop creates a trivial SCC             | Still run the algorithm; self-loop is valid  |
| Duplicate nodes on Tarjan stack   | Not marking nodes as “onStack”              | Maintain a boolean array alongside the stack |
| Ignoring multiple edges           | Multiple edges do not change reachability   | Use adjacency-list semantics, not multiset   |
| Assuming condensation has unique topological order | DAG may have parallel branches         | Compute any valid topo order after condensation |

## 7. The textbook-precise statement

A strongly connected component of a directed graph G = (V,E) is a maximal set of vertices C ⊆ V such that for every pair u,v ∈ C there exist directed paths u ↝ v and v ↝ u. The condensation graph G' obtained by contracting each SCC to a single vertex is a directed acyclic graph. Kosaraju’s algorithm computes the SCCs by performing a DFS on G to obtain the ordering of vertices by decreasing finish times, then a second DFS on the transpose graph Gᵀ in that order; each DFS tree in the second forest is an SCC. Tarjan’s algorithm performs a single DFS, maintaining discovery time disc[u] and low-link value low[u]; a vertex u is the root of an SCC precisely when, for a child v, low[v] ≥ disc[u]. Both algorithms run in Θ(|V| + |E|) time. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 22, Section 22.5.)

## 8. Visual — diagram or schematic

```text
A ──▶ B
│     │
◀──── C ──▶ D ──▶ E
        │     ▲
        └─────┘
```
Labelled SCCs: dashed oval around {A,B,C}, separate dashed oval around {D,E}. All edges inside each oval are bidirectional in reachability; the only bridge is C→D.

## 9. The memory technique

1. **The hook** — picture two gangs that can send messengers to each other inside their territory but outsiders can only enter or leave; each gang is an SCC.  
2. **What to overlearn** — finish-time ordering for Kosaraju, low[v] ≥ disc[u] test for Tarjan, and Θ(V+E) complexity.  
3. **Spaced-repetition schedule** — review the two algorithms after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — rebuild Kosaraju by recalling that the second DFS on Gᵀ must start from the node that finished last; rebuild Tarjan by re-deriving the low-link update rule from the definition of earliest reachable ancestor.

## 10. What this unlocks

Once you can compute SCCs you can condense any digraph into a DAG and then apply all DAG algorithms (topological sort, longest path, etc.) to the components.  

- 2-SAT solvers reduce satisfiability to absence of contradictory literal pairs inside one SCC.  
- dominator-tree construction in compilers uses SCCs on control-flow graphs.  
- feedback-arc-set approximation algorithms first contract SCCs to shrink the instance.  
- social-network community detection treats mutual-follower clusters as SCCs.

## 11. Self-check — five questions, no answers

1. In a tournament graph (exactly one directed edge between every pair), how many SCCs can exist?  
2. Give a directed graph whose condensation is a path of length 3; draw it.  
3. If you run Tarjan’s algorithm and never encounter low[v] ≥ disc[u], what does the graph look like?  
4. Why does Kosaraju require the transpose graph while Tarjan does not?  
5. Construct a 5-vertex graph where Kosaraju and Tarjan produce the same SCC partition but in different internal orders; explain the difference.