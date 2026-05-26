## 1. The one-sentence answer

**DFS detects cycles by searching for back edges during traversal: a back edge points to an ancestor in the DFS tree, proving a cycle exists.**

In an undirected graph, any edge that connects a node to one of its ancestors (except its immediate parent) forms a cycle because the path through the tree plus that edge closes a loop. In a directed graph, the same back-edge rule applies but only when the target node is still being explored (gray in the standard three-color scheme), because direction matters and a cross edge to a finished node does not create a cycle. The algorithm therefore runs ordinary DFS while maintaining discovery and finish states; the first time a back edge appears, the search can terminate early with the answer “cycle exists.”

> [!NOTE]
> The single deepest insight is that the DFS forest already encodes reachability order; any edge that violates the forward-only order is exactly the witness of a cycle, so no extra data structure beyond colors or timestamps is required.

## 2. Why this matters — concrete and current

In VLSI design at companies such as TSMC and Intel, cycle detection on the timing graph (a directed graph of gates and wires) prevents combinational loops that would make static timing analysis impossible; a single missed cycle can cause an entire tape-out to fail. Modern package managers such as Cargo (Rust) and npm (JavaScript) run directed-cycle detection on dependency graphs before installation; the algorithm is exactly the DFS back-edge test described here, and a cycle produces the well-known “dependency cycle” error. In aerospace mission planning at NASA JPL, the task-dependency graph for rover command sequences is checked for cycles before upload; an undetected cycle would cause the spacecraft to deadlock. Finally, in reinforcement-learning compilers such as those inside PyTorch’s JIT, the autograd graph is scanned with DFS cycle detection to guarantee that gradient flow does not contain loops, which would break back-propagation.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| DFS tree and discovery/finish times | Back edges are defined relative to the tree built by DFS |
| Three-color (white/gray/black) scheme | Gray nodes mark the current path; an edge to gray proves a cycle |
| Adjacency-list representation     | The algorithm walks these lists; O(V+E) time follows directly |
| Parent pointer in undirected DFS  | Prevents mistaking the tree edge itself for a back edge   |

If any row is unfamiliar, pause and read the corresponding section on basic DFS before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — DFS builds a tree plus extra edges
Plain Hinglish claim: while DFS walks the graph it records which edges created new recursive calls; those edges form the DFS forest. All remaining edges are classified later.

Concrete example: nodes A-B-C with an extra edge A-C. DFS from A reaches B then C; the edge A-C is never used for recursion and becomes a back edge.

Formal statement:  
During DFS the edge set partitions into tree edges and non-tree edges.

> [!WARNING]
> If you forget to record the parent, the tree edge itself will be misclassified as a back edge in undirected graphs.

### Step 2 — Color nodes to track exploration state
Plain Hinglish claim: white = never seen, gray = on current path, black = finished subtree. A directed edge u→v that lands on gray v means v is an ancestor of u, hence a cycle.

Concrete example: A→B→C→A. When C is processed, A is still gray, so cycle detected.

Formal statement:  
An edge u→v is a back edge iff color[v] = gray at the moment the edge is examined.

### Step 3 — Undirected case needs parent exclusion
Plain Hinglish claim: in an undirected graph every tree edge is traversed twice (once each way). The reverse direction must be ignored, otherwise every tree edge looks like a back edge.

Concrete example: edge {A,B}. When at B we see A, but A is the parent, so we skip it.

Formal statement:  
For undirected G, edge {u,v} is a back edge only if v is gray and v ≠ parent[u].

### Step 4 — Directed case uses gray without parent check
Plain Hinglish claim: direction already prevents the reverse traversal, so any gray target is a true ancestor.

Formal statement:  
For directed G, edge u→v is a back edge iff color[v] = gray.

### Step 5 — Early termination versus full classification
Plain Hinglish claim: once a back edge is found the algorithm may return “cycle exists” immediately; if the entire forest finishes without any back edge, the graph is acyclic.

Formal statement:  
G contains a cycle ⇔ DFS produces at least one back edge.

### Step 6 — Time-complexity derivation
Plain Hinglish claim: each vertex and each edge is examined a constant number of times, therefore total work is Θ(V+E).

Formal statement:  
Cycle detection by DFS runs in Θ(V+E) time on adjacency lists.

## 5. Worked examples — har step show karo

**Example 1 — Undirected cycle of length 3**  
*Given:* Undirected graph with vertices {1,2,3} and edges {1-2,2-3,3-1}.  
*Find:* Does a cycle exist?  

DFS starts at 1, colors 1 gray, recurses on 2 (parent=1). From 2 recurses on 3 (parent=2). From 3 examines neighbor 1: 1 is gray and ≠ parent[3], therefore back edge found.  
*Why:* The parent check correctly ignored the tree edge 2-3 but accepted the true back edge 3-1.  
**Cycle exists.**

**Example 2 — Undirected tree (no cycle)**  
*Given:* Path 1-2-3, no extra edges.  
*Find:* Cycle?  

From 1 reach 2 (parent=1), from 2 reach 3 (parent=2). When 3 looks at 2, 2==parent[3], skip. No other edges. All nodes finish black.  
*Why:* Every edge was a tree edge; the parent filter removed the only possible false positive.  
**No cycle.**

**Example 3 — Directed cycle A→B→C→A**  
*Given:* Directed edges A→B, B→C, C→A. Start DFS at A.  
*Find:* Cycle?  

A gray, recurse B gray, recurse C gray. C examines A: color[A]=gray → back edge.  
*Why:* Direction guarantees the gray test alone is sufficient.  
**Cycle exists.**

**Example 4 — Directed DAG with cross edge**  
*Given:* A→B, A→C, B→D, C→D.  
*Find:* Cycle?  

DFS order: A, B, D (finish D black), back to C, C→D (D already black) → cross edge, not back edge. All finish without gray hits.  
*Why:* Black targets never indicate an active path, so they are safe.  
**No cycle.**

*Reflection:* The four examples together illustrate that the same DFS machinery works for both directed and undirected graphs once the parent filter is applied only in the undirected case.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating parent edge as back edge in undirected graph | Forgetting the parent pointer               | Always store and check parent[u]             |
| Using only two colors             | Missing the “on-path” distinction           | Use three colors: white/gray/black           |
| Assuming every edge to visited node is a back edge    | Ignoring finish time or color               | Check gray specifically                      |
| Running DFS only from one vertex on disconnected graph | Cycle may lie in another component          | Loop over all vertices, start DFS on white nodes |
| Modifying adjacency list while traversing | Accidental deletion of edges                | Never mutate the graph during DFS            |
| Forgetting that cross edges exist in directed graphs  | Over-generalizing undirected rule           | Remember cross edges go to black nodes       |
| Early return without recording the actual cycle       | Only need existence, but later code needs path | Optionally keep recursion stack to reconstruct cycle |

## 7. The textbook-precise statement

A directed graph G = (V,E) contains a cycle if and only if a depth-first search of G yields a back edge. An edge u→v is a back edge precisely when, at the instant the edge is examined, v is gray (i.e., v has been discovered but not yet finished). In the undirected case the identical statement holds after the additional proviso that v ≠ π[u], where π[u] denotes the parent of u in the DFS forest. (Cormen et al., *Introduction to Algorithms*, 4e, Ch. 22, Lemma 22.11 and Theorem 22.12.)

## 8. Visual — diagram or schematic

```
A -- B
|    |
D -- C
```
ASCII labels: solid lines are tree edges A-B, B-C, C-D; dashed line D-A is the back edge. When DFS reaches D, A is still gray, proving the cycle A-B-C-D-A.

## 9. The memory technique

1. **The hook** — Picture a hiker walking a forest trail (DFS tree). Any rope that suddenly loops back to a higher point on the same trail (gray ancestor) creates an instant circle; that rope is the back edge.
2. **What to overlearn** — “Gray target = cycle” (directed); “Gray & not parent = cycle” (undirected).
3. **Spaced-repetition schedule** — Review the color rule after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing the three-color invariant: gray nodes form exactly the current path from the root; any edge closing to that path must be a cycle.

## 10. What this unlocks

Cycle detection is the gateway to topological sort, strongly-connected-component algorithms, and feedback-arc-set problems.  

- Topological sort (Kahn’s algorithm and DFS-based) both rely on the absence of back edges.  
- Tarjan’s and Kosaraju’s SCC algorithms extend the same DFS timestamp machinery.  
- Deadlock detection in operating-system resource-allocation graphs uses the identical directed-cycle test.

## 11. Self-check — five questions, no answers

1. In an undirected graph, why must we store the parent pointer?  
2. Draw a directed graph containing a cross edge but no cycle; run DFS and label all edge types.  
3. What is the asymptotic running time on a graph with V = 10^5 and E = 3·10^5?  
4. A student claims “any edge to a visited node proves a cycle.” Give a counter-example and explain the color mistake.  
5. Using only the three-color scheme, write a two-sentence proof that a directed graph with no back edges is a DAG.