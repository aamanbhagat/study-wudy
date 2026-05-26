## 1. The one-sentence answer
**Depth-first search (DFS) is a graph traversal that repeatedly follows an unexplored edge from the current vertex until no such edges remain, then backtracks, marking every vertex visited exactly once.**

DFS therefore discovers vertices by always pushing exploration deeper along a single path before retreating. The algorithm records each vertex the first time it is reached and never re-enters a recorded vertex, guaranteeing that every vertex and every edge is examined a constant number of times. Because the order of exploration is governed by a last-in-first-out discipline, the same behaviour can be obtained either by letting the call stack perform the bookkeeping or by maintaining an explicit stack; the asymptotic cost remains identical.

> [!NOTE]
> The single most important insight is that the visited array is not an optimisation; without it the procedure may loop forever on any cycle, so the array is part of the algorithm’s correctness, not merely its efficiency.

## 2. Why this matters — concrete and current
In Google’s production web crawler, DFS is used inside each crawl worker to follow outgoing hyperlinks as deeply as possible before returning; the visited set prevents the crawler from re-fetching the same page within a crawl frontier that routinely exceeds 10^10 URLs.

Modern C++ and Rust compilers rely on DFS-based Tarjan’s algorithm to compute strongly connected components when resolving cyclic dependencies among generic modules; a single missed back-edge would produce an incorrect compilation order and trigger linker failures on codebases the size of LLVM.

Semiconductor place-and-route tools at TSMC employ DFS to enumerate feasible routing paths through a grid graph whose vertices represent metal-layer vias; the same traversal also detects short-circuit cycles that would render a mask set unusable.

In reinforcement-learning environments such as AlphaGo’s Monte-Carlo tree search, each simulation is a DFS walk down the game tree; the visited flag on transposition-table entries prevents the same board position from being re-expanded inside one simulation, keeping the effective branching factor tractable.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Directed/undirected graph given by adjacency lists | DFS walks along edges stored in these lists               |
| Stack discipline (LIFO) | Both the recursive call stack and the explicit stack rely on it |
| Boolean array or hash set | Prevents infinite loops on cycles and guarantees O(1) membership test |
| Big-O arithmetic for V and E | Establishes that every vertex and edge is processed once  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Represent the graph so edges can be followed
Store each vertex’s neighbours in an array of lists.  
Example: vertex 0 connected to 1 and 2 yields adj[0] = [1, 2].  
Formally, a graph G = (V, E) is given by an array adj : V → 2^V.  
> [!WARNING]  
> Using an adjacency matrix instead of lists changes only constant factors, but omitting the representation entirely leaves the algorithm with no edges to traverse.

### Step 2 — Record that a vertex has been discovered
Allocate a Boolean array visited[0 … |V|−1] initialised to false.  
When a vertex u is first reached, set visited[u] = true before examining its neighbours.  
Formally: ∀u ∈ V, visited[u] ⇐ true on discovery.  
> [!WARNING]  
> Setting the flag after the recursive call instead of before allows a neighbour already on the current path to be re-entered, creating an undetected cycle.

### Step 3 — Let recursion supply the LIFO order
Define a procedure dfs(u): mark u visited, then for each neighbour v of u, if not visited[v] call dfs(v).  
The call stack automatically returns control to u after the subtree rooted at v is exhausted.  
Formally:  
$$
\text{dfs}(u) :\quad \text{visited}[u]\leftarrow\text{true};\quad \forall v\in\text{adj}[u]\ ( \neg\text{visited}[v]\implies\text{dfs}(v) )
$$  
> [!WARNING]  
> Treating the recursive call as a simple loop rather than a stack frame will produce breadth-first instead of depth-first order.

### Step 4 — Replace recursion by an explicit stack
Push the start vertex onto a stack S. While S is not empty, pop u; if u is unvisited, mark it and push all its unvisited neighbours.  
This yields identical discovery order because the stack mirrors the call stack.  
Formally the loop invariant is that S always contains the current unexplored path.  
> [!WARNING]  
> Pushing neighbours in the wrong order (front versus back) reverses the sequence of children but does not affect asymptotic complexity or correctness.

### Step 5 — Count every vertex and every edge once
Each vertex is pushed and popped exactly once; each directed edge (u,v) is examined exactly once when u is processed.  
Hence total work is Θ(|V| + |E|).  
Formally:  
$$
T(n) = \Theta(|V| + |E|)
$$  
> [!WARNING]  
> Claiming O(|V|·|E|) usually signals that the visited test was omitted or implemented with a linear scan.

### Step 6 — State the complete algorithm
Initialise visited to false; for each vertex u, if not visited[u] call dfs(u). The forest of recursion trees spans all reachable vertices.  
This is the textbook formulation of DFS.

## 5. Worked examples — every step shown

**Example 1 — Linear chain**  
*Given:* vertices 0-1-2, adj = [[1],[2],[]], start at 0.  
*Find:* discovery order.  
Step 1: call dfs(0), set visited[0]=true. *Why*: first vertex must be marked.  
Step 2: examine neighbour 1, recurse dfs(1), set visited[1]=true. *Why*: follows the single edge.  
Step 3: from 1 examine 2, recurse dfs(2), set visited[2]=true. *Why*: reaches the end.  
Step 4: return through the call stack.  
**Discovery order: 0,1,2**

**Example 2 — Graph with one back edge**  
*Given:* 0-1, 0-2, 1-2, start at 0.  
*Find:* vertices visited.  
dfs(0) marks 0; pushes 1 then 2. dfs(1) marks 1; sees 2 already visited so skips. dfs(2) marks 2.  
**Visited set: {0,1,2}**

**Example 3 — Disconnected graph**  
*Given:* two components {0,1} and {2}.  
The outer loop calls dfs(0) then later dfs(2) because visited[2] remains false.  
**Two trees are produced.**

**Example 4 — Cycle detection**  
*Given:* 0-1-2-0.  
During dfs(0) we reach 2; 2’s neighbour 0 is already on the stack (visited but not finished). This back edge proves a cycle.  
**Reflection:** the combination of visited flag plus recursion depth encodes the current path, allowing cycle detection without extra data structures.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                              |
|-----------------------------------|-----------------------------------------------|----------------------------------------------|
| Marking visited after recursion   | Confuses discovery with finish time           | Mark immediately on entry                    |
| Using a list for visited test     | Linear scan hidden inside adjacency loop      | Always choose array or hash set              |
| Forgetting the outer loop         | Only the component of the start vertex is traversed | Iterate over all vertices and launch DFS on each unvisited vertex |
| Treating directed edges as undirected | Reverses or misses arcs                       | Keep separate adjacency lists for each direction |
| Stack overflow on deep recursion  | Call stack limited by language runtime        | Switch to explicit stack when |V| > 10^5     |
| Counting time as O(V·E)           | Visited check performed naïvely               | Confirm each edge examined once              |
| Ignoring multiple edges or self-loops | Adjacency list contains duplicates            | Either preprocess or treat them as ordinary edges |

## 7. The textbook-precise statement
Depth-first search of a graph G = (V, E) is defined by the procedure DFS-VISIT(u) that colours u grey, examines every adjacent vertex, and colours u black on exit. The full algorithm DFS(G) colours every vertex white initially and, for each white vertex, invokes DFS-VISIT. The running time is Θ(V + E). (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 22, §22.3.)

## 8. Visual — diagram or schematic
```
0 ── 1 ── 3
│    │
2 ── 4
```
Labelled DFS traversal from 0 (recursion arrows):  
0 → 1 → 3 (backtrack) → 4 (backtrack) → 2 (backtrack).  
The stack at the moment 3 is visited contains the frames [0,1,3].

## 9. The memory technique

**The hook**  
Picture a submarine diving straight down a trench (the deepest path) before surfacing and trying the next trench; the visited buoys left behind mark explored water.

**What to overlearn**  
- Mark visited on entry, never on exit.  
- Time is always Θ(V + E) once the visited test is O(1).  
- Recursion and explicit stack are semantically identical.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive by asking: “If I may never revisit a vertex, what ordering of unexplored edges yields the deepest possible walk?” The answer is last-in-first-out, which is exactly a stack.

## 10. What this unlocks
DFS supplies the backbone for topological sort, strongly-connected-component algorithms, cycle detection, bipartite checking, and path existence queries. It also serves as the contrast case for breadth-first search when shortest paths in unweighted graphs are required.

## 11. Self-check — five questions, no answers
1. On a complete graph K_n, how many times is the visited array written?  
2. Give a directed graph where the recursive and iterative DFS produce different discovery orders yet both remain correct.  
3. What single change turns DFS into an algorithm that reports a topological order?  
4. A graph has V = 5, E = 3; after DFS finishes, how many vertices remain white?  
5. Identify the precise line in the recursive formulation whose removal would make the algorithm fail to terminate on any graph containing a cycle.