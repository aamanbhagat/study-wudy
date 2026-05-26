## 1. The one-sentence answer
**DFS detects a cycle by discovering a back edge that points to a vertex still on the current recursion path.**

In an undirected graph the back edge must connect to an ancestor other than the immediate parent; any other edge is either a tree edge or a cross edge that cannot close a cycle. In a directed graph the same idea is sharpened with vertex colours: a back edge to a gray (currently visiting) vertex proves a cycle because that vertex lies on the active path from the source. The algorithm therefore augments ordinary depth-first search with a constant-time check at each edge traversal instead of building an explicit spanning tree and then inspecting it afterwards.

The detection works because every cycle must contain at least one vertex that is reached while another vertex on the same cycle is still being explored. That situation manifests exactly as a back edge. Once the search finishes a vertex it colours it black and never revisits it, guaranteeing that later edges cannot falsely report a cycle that has already been ruled out.

> [!NOTE]
> The single invariant that never fails is “a back edge into the current recursion stack implies a cycle; its absence after the entire forest is explored implies acyclicity.”

## 2. Why this matters — concrete and current
Modern operating-system schedulers such as Linux CFS and Android’s Binder IPC use cycle detection on the directed wait-for graph of locks; a back edge immediately aborts a potential deadlock before the kernel blocks the thread.

In semiconductor physical design, clock-tree synthesis tools from Synopsys and Cadence run directed DFS on the timing graph to guarantee that no combinational loop exists; a reported back edge forces an ECO (engineering change order) before tape-out.

Package managers (Cargo, npm, Go modules) model dependencies as a directed graph and invoke DFS cycle detection during resolution; the well-known left-pad incident would have been caught instantly had the resolver rejected the cyclic dependency that later appeared.

Compilers performing instruction scheduling inside LLVM and GCC rely on the same primitive to decide whether a basic-block graph admits a topological order; absence of back edges allows the scheduler to emit code without speculation or predication.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Adjacency-list representation | DFS must iterate over neighbours in O(deg(v)) time        |
| Recursive DFS skeleton      | The recursion stack itself encodes the current path       |
| Discovery/finish timestamps or colours | Distinguishes tree edges from back edges in linear time  |
| Parent pointer (undirected case) | Prevents the trivial parent edge from being misread as a cycle |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every cycle intersects the recursion stack
A depth-first traversal maintains an explicit path from the source to the vertex currently being visited. Any cycle that touches this path must re-enter it at some vertex still on the stack.

Consider the undirected cycle 1-2-3-1. When DFS reaches 3 from 2, vertex 1 is still gray; the edge 3-1 is therefore a back edge.

Formally, let \(\pi\) be the parent array built by DFS. An edge \((u,v)\) is a back edge if \(v\) is gray and \(v \neq \pi[u]\).

> [!WARNING]
> Treating the parent edge itself as a back edge produces a false positive on every tree edge that is traversed in reverse.

### Step 2 — Colouring replaces parent checks for directed graphs
In directed graphs a back edge may point to any ancestor, not merely the parent. Colours encode the three possible states of a vertex: white (undiscovered), gray (on stack), black (finished).

An edge \(u \to v\) is a back edge precisely when \(v\) is gray at the moment the edge is examined.

### Step 3 — The three-colour invariant
At any instant the gray vertices form a single path from the root of the current DFS tree to the vertex under examination. Consequently, a gray target guarantees a directed cycle.

### Step 4 — Exhaustive forest covers disconnected components
Run DFS from every white vertex. Because each component receives its own DFS tree, a cycle confined to any component is still reported.

### Step 5 — Linear-time guarantee
Every vertex and every edge is processed a constant number of times; the algorithm therefore runs in \(\Theta(V+E)\).

### Step 6 — Textbook statement
A directed graph contains a cycle if and only if a DFS forest contains at least one back edge (Cormen et al., Introduction to Algorithms, 4e, Lemma 22.11). The undirected case is identical once parent edges are excluded.

## 5. Worked examples — every step shown

**Example 1 — Undirected cycle of length 3**  
*Given:* Undirected graph with edges \(\{1-2,2-3,3-1\}\).  
*Find:* Does a cycle exist?  

DFS starts at 1, colours 1 gray, recurses to 2 (parent of 2 is 1).  
From 2 recurses to 3 (parent of 3 is 2).  
From 3 examines neighbour 1; 1 is gray and not parent of 3 → back edge.  
**Cycle detected.**  

*Reflection:* The parent filter was the only extra guard needed; without it the algorithm would have reported a false cycle on the return from 2 to 1.

**Example 2 — Undirected tree**  
*Given:* Edges \(\{1-2,1-3\}\).  
DFS from 1 reaches 2, finishes 2 (black), returns, reaches 3, finishes 3.  
All edges are either tree edges or parent edges.  
**No cycle.**  

*Reflection:* Finishing times alone are insufficient; the parent test is what distinguishes the tree from a unicyclic graph.

**Example 3 — Directed cycle**  
*Given:* Edges \(1\to2,2\to3,3\to1\).  
Colour 1 gray, move to 2 (gray), move to 3 (gray).  
From 3 the edge to 1 finds colour gray → back edge.  
**Cycle detected.**  

*Reflection:* Colours replace the parent test because the back edge need not be to the immediate parent.

**Example 4 — Directed DAG with cross edge**  
*Given:* Edges \(1\to2,1\to3,2\to4,3\to4\).  
DFS from 1 reaches 2, finishes 2 (black), reaches 3, finishes 3 (black), then 4 is reached from both but already black.  
No gray target is ever observed.  
**No cycle.**  

*Reflection:* A cross edge to a black vertex never indicates a cycle; only gray targets matter.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                              |
|-------------------------------------|---------------------------------------------|----------------------------------------------|
| Reporting parent edge as cycle (undirected) | Parent pointer is still gray               | Explicitly test \(v \neq \pi[u]\)            |
| Using only discovery time for directed graphs | Cross edges can have earlier timestamps    | Rely on colour gray, not timestamp order     |
| Forgetting to restart DFS on every white vertex | Graph may be disconnected                  | Outer loop over all vertices                 |
| Treating a forward edge as back edge | Misunderstanding colour semantics          | Forward edges always point to white vertices |
| Modifying the graph during search   | Recursion stack becomes invalid            | Never mutate adjacency lists while DFS runs  |
| Assuming one DFS tree suffices      | Multiple components may each contain cycles| Always iterate over all vertices             |
| Storing only finish times           | Finish times alone cannot detect cycles    | Keep the gray “on-path” set or colours       |

## 7. The textbook-precise statement
A directed graph \(G=(V,E)\) contains a directed cycle if and only if a depth-first search of \(G\) yields at least one back edge—i.e., an edge \((u,v)\) where \(v\) is gray when the edge is examined (Cormen et al., Introduction to Algorithms, 4e, Lemma 22.11). For an undirected graph the same statement holds after excluding the parent edge of each vertex. The algorithm runs in \(\Theta(V+E)\) time and \(\Theta(V)\) extra space for colours (or parent array) and the recursion stack.

## 8. Visual — diagram or schematic
```text
Undirected graph          Directed graph
      1                       1
     / \                     / \
    2---3                   2-->3
     \ /                     \   |
      4                       v  v
                             4<-5   (back edge 5→2 closes cycle)
```
Label the undirected triangle 1-2-3; the directed chain 1→2→3→5→2 shows the back edge that DFS will classify when vertex 2 is still gray.

## 9. The memory technique
1. **The hook** — Picture the recursion stack as a gray “spine”; any edge that stabs back into the spine is a cycle.
2. **What to overlearn** — Gray = on path; back edge to gray = cycle. Parent exclusion only for undirected graphs.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from the invariant that the gray set is always a single path; any edge into that path closes a cycle.

## 10. What this unlocks
Cycle detection is the primitive that immediately yields topological sort (process vertices only after all their descendants finish) and the detection of strongly connected components via Tarjan’s or Kosaraju’s algorithms.

- Topological sort of DAGs
- Deadlock detection in resource-allocation graphs
- Feedback arc-set approximation for VLSI
- SCC condensation used in 2-SAT solvers

## 11. Self-check — five questions, no answers
1. In an undirected graph, why must the parent test be performed even though colours already exist?
2. Give a directed graph where a cross edge exists yet no cycle is present; show the colours at the moment the cross edge is examined.
3. A DFS forest reports three back edges. Must the graph contain at least three distinct cycles? Explain.
4. What is the exact asymptotic cost, in terms of \(V\) and \(E\), of running cycle detection on a graph stored as an adjacency matrix?
5. Construct the smallest undirected graph in which a single back edge is reported but two distinct cycles exist.