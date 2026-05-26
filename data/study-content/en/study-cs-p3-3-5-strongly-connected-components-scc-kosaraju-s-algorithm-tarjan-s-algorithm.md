## 1. The one-sentence answer
**A strongly connected component is a maximal subgraph in which every vertex is reachable from every other vertex by a directed path.**

In a directed graph, reachability is not symmetric. Vertex *u* may reach *v* while *v* cannot reach *u*. The notion of strong connectivity therefore requires mutual reachability: a directed path must exist in both directions between every pair of vertices inside the component. The maximality condition ensures that no larger subgraph containing the component still satisfies this property.

The algorithms of Kosaraju and Tarjan compute the partition of any directed graph into these components. Kosaraju performs two depth-first searches—one on the original graph and one on its transpose—while Tarjan performs a single depth-first search augmented with discovery times and low-link values.

> [!NOTE]
> The condensation of any directed graph obtained by contracting each SCC into a single vertex is always a directed acyclic graph; this single fact explains why topological order, feedback vertex sets, and many reachability queries become tractable once SCCs are known.

## 2. Why this matters — concrete and current
In web-scale crawling, Google’s index-construction pipeline treats each web page as a vertex and hyperlinks as directed edges. SCCs identify tightly interlinked clusters (e.g., forum threads or Wikipedia article sets) that must be fetched and indexed together to preserve consistency under incremental updates.

In semiconductor verification, Intel’s formal equivalence-checking tools model gate-level netlists as directed graphs. SCCs expose cyclic dependencies that require special handling in sequential equivalence proofs; missing an SCC can produce false positives that later fail silicon validation.

In aerospace mission planning, NASA’s Europa Clipper autonomy software represents sensor-fusion tasks as a data-flow graph. SCC detection identifies strongly interdependent computation modules whose failure would require full system rollback, directly influencing the design of fault-containment regions.

In social-network analysis, Twitter’s graph of follow relationships is partitioned into SCCs to surface “mutual engagement clusters.” These clusters feed downstream recommendation models and are recomputed daily on graphs with hundreds of millions of vertices.

In compiler theory, LLVM’s alias-analysis pass constructs a directed graph of pointer constraints. SCCs collapse mutually recursive pointer relations into supernodes, enabling precise yet efficient interprocedural analysis that improves code generation for large C++ codebases.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Directed graph           | SCCs are defined only on directed edges; undirected graphs have only connected components. |
| Depth-first search       | Both Kosaraju and Tarjan are built on the DFS forest and its finishing-time order.   |
| Graph transpose          | Kosaraju’s second pass operates on the transpose; the transpose preserves reachability in the reverse direction. |
| Stack / finishing times  | The order in which vertices finish DFS determines the order of the second pass.      |
| Recursion and call stack | Tarjan’s algorithm maintains a recursion stack to detect when an entire SCC has been explored. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Mutual reachability
Two vertices *u* and *v* belong to the same SCC precisely when a directed path exists from *u* to *v* and from *v* to *u*.  
Consider the graph with vertices {A,B,C} and edges A→B, B→C, C→A. Every pair is mutually reachable, so the whole graph is one SCC.  
Formally, define the relation  
$$
u \sim v \iff \text{path}(u,v) \land \text{path}(v,u).
$$
This relation is an equivalence relation; its equivalence classes are the SCCs.

> [!WARNING]
> Confusing “there is a path from u to v” with mutual reachability produces incorrect components that are merely weakly connected.

### Step 2 — The transpose graph
The transpose \(G^T\) contains exactly the edges of \(G\) reversed. Reachability in \(G^T\) is reachability backward in \(G\).  
In the example above, \(G^T\) has edges B→A, C→B, A→C; the same mutual-reachability property holds.

### Step 3 — Kosaraju’s first pass
Perform DFS on \(G\) and record vertices in order of finishing time. The vertex that finishes last can reach every other vertex in its SCC and possibly vertices in ancestor SCCs of the condensation DAG.  
Let \(\text{finish}[v]\) be the finishing time of \(v\). The order is the decreasing sequence of these times.

### Step 4 — Kosaraju’s second pass
Process vertices in the finishing-time order on \(G^T\). Each tree in the resulting DFS forest is exactly one SCC.  
The first vertex taken from the ordered list is a sink in the condensation DAG of \(G^T\), hence a source in the condensation of \(G\).

### Step 5 — Tarjan’s single-pass formulation
During one DFS, maintain for each vertex \(v\):
- \(\text{disc}[v]\): discovery time,
- \(\text{low}[v]\): smallest discovery time reachable from the subtree rooted at \(v\) including \(v\) itself, using at most one back edge to an ancestor.  
When \(\text{low}[v] = \text{disc}[v]\), the vertices on the recursion stack from \(v\) downward form an SCC.

### Step 6 — Textbook statement of correctness
Both algorithms produce the unique partition of \(V\) into maximal strongly connected subgraphs. The condensation graph is acyclic by construction.

## 5. Worked examples — every step shown

**Example 1 — Three-cycle**  
*Given:* vertices {1,2,3}, edges 1→2, 2→3, 3→1.  
*Find:* the SCCs.  
DFS on G finishes vertices in order 3,2,1.  
Transpose has edges 2→1, 3→2, 1→3.  
Second DFS from 3 visits all three vertices.  
**{1,2,3}**  
*Reflection:* The cycle forces a single component; the finishing order is irrelevant inside a lone SCC.

**Example 2 — Two separate cycles**  
*Given:* vertices {A,B,C,D}, edges A→B, B→A, C→D, D→C.  
*Find:* the SCCs.  
Finishing order on G: B,A,D,C.  
On \(G^T\) the second pass yields two trees: {A,B} then {C,D}.  
**{A,B}, {C,D}**  
*Reflection:* No cross edges exist, so the components remain separate.

**Example 3 — Chain of SCCs**  
*Given:* vertices {1,2,3,4}, edges 1→2, 2→1, 2→3, 3→4, 4→3.  
*Find:* the SCCs.  
Finishing times: 1,2,4,3.  
Second pass on transpose yields {1,2} then {3,4}.  
**{1,2}, {3,4}**  
*Reflection:* Vertex 2 reaches 3 but 3 cannot reach 2, correctly separating the components.

**Example 4 — Tarjan on a graph with nested back edges**  
*Given:* vertices {A,B,C}, edges A→B, B→C, C→B, B→A.  
Discovery: A(0), B(1), C(2).  
low[C]=1, low[B]=0, low[A]=0.  
When low[B]=disc[A], pop {B,C} then {A}.  
**{A}, {B,C}**  
*Reflection:* The back edge B→A separates A from the cycle {B,C}.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating the graph as undirected    | Forgetting directionality merges distinct SCCs      | Always store adjacency lists separately for G and GT |
| Using discovery time instead of finishing time in Kosaraju | The first pass must produce a valid topological order of the condensation | Record the order only on the finish event            |
| Forgetting to clear the recursion stack in Tarjan | Multiple SCCs remain on the stack after one root is found | Pop until the current root is removed                |
| Assuming every DFS tree is an SCC   | Cross edges between SCCs may still exist            | Verify that low[v] equals disc[v] before popping     |
| Ignoring self-loops                 | A single vertex with a self-loop is trivially an SCC | Treat a vertex with a self-loop as its own component when isolated |
| Running the second pass on the original graph | The transpose is essential to reverse reachability | Explicitly build or iterate over reversed edges      |
| Not handling disconnected graphs    | Some vertices never receive discovery times         | Iterate over all vertices to launch DFS when needed  |

## 7. The textbook-precise statement
Let \(G = (V,E)\) be a directed graph. A strongly connected component of \(G\) is a maximal set \(C \subseteq V\) such that for every pair \(u,v \in C\) there exist directed paths \(u \leadsto v\) and \(v \leadsto u\). The algorithms of Kosaraju (two DFS passes) and Tarjan (one DFS with low-link values) both compute the unique partition of \(V\) into such components in \(\Theta(|V| + |E|)\) time. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 22, Section 22.5.)

## 8. Visual — diagram or schematic
```text
Graph G                     Transpose G^T
  A → B                       A ← B
  ↑   ↓                       ↑   ↓
  D ← C                       D → C

SCCs: {A}, {B,C,D}
Condensation DAG: A → {B,C,D}
```
Labelled vertices A,B,C,D; solid arrows show original edges; dashed arrows would show transpose. The single source SCC {A} can reach the sink SCC {B,C,D}, but not vice versa.

## 9. The memory technique
1. **The hook** — Picture a one-way street grid: SCCs are the “roundabout districts” where you can drive from any intersection back to any other without leaving the district.
2. **What to overlearn** — (i) finishing-time order on first pass, (ii) low[v] = min(disc[v], disc[w] for back edges w), (iii) condensation is always a DAG.
3. **Spaced-repetition schedule** — Review the two-pass ordering at 1 day, the low-link update rule at 3 days, a full Tarjan trace at 7 days, condensation properties at 16 days, and a mixed Kosaraju/Tarjan comparison at 35 days.
4. **First-principles fallback** — Re-derive the equivalence relation \(\sim\), prove it is reflexive/symmetric/transitive, then show that the finishing-time order respects the partial order of the condensation DAG.

## 10. What this unlocks
Once SCCs are identified, the original graph collapses to a DAG whose vertices are supernodes. This condensation supports linear-time topological sort, minimum feedback vertex set approximations, 2-SAT satisfiability, and efficient reachability queries via transitive closure on the much smaller DAG.

- Next: condensation graphs and their topological order
- 2-SAT implication graphs and their SCCs
- dominator trees in flow graphs
- feedback arc set heuristics

## 11. Self-check — five questions, no answers
1. In a directed cycle of length 5, how many SCCs exist and what is their size?
2. Construct a 4-vertex graph whose condensation DAG is a path of length 3.
3. During Tarjan’s algorithm, a vertex v satisfies low[v] < disc[v]. What does this imply about the SCC containing v?
4. Why does Kosaraju’s second pass on the transpose produce exactly the SCCs rather than arbitrary subgraphs?
5. Give a counter-example showing that running DFS on the original graph in arbitrary vertex order fails to identify SCCs.