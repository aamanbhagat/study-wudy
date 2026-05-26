## 1. The one-sentence answer
**Dijkstra’s algorithm computes single-source shortest paths in a graph with non-negative edge weights by repeatedly extracting the closest unsettled vertex from a priority queue and relaxing its outgoing edges.**

The core intuition is that once a vertex is dequeued, its distance label is permanently correct. This holds only because no edge can ever decrease a distance after extraction; negative weights would violate that monotonicity. The algorithm therefore maintains a frontier of candidate distances and always commits to the smallest one that remains provably minimal.

Implementation uses a priority queue to select the next vertex in \(O(\log V)\) time and a distance array that is updated at most once per edge. With a binary heap the total cost becomes \(O((V+E)\log V)\). The same logic fails on graphs containing negative edges because an earlier commitment can later be improved by a negative-weight path.

> [!NOTE]
> The decisive insight is that non-negative weights turn “greedy choice” into an optimality guarantee: the first time a vertex leaves the priority queue, every possible path to it has already been considered.

## 2. Why this matters — concrete and current
Google Maps and other routing engines run a variant of Dijkstra (or its bidirectional A* extension) on continent-scale road networks whose edge weights are travel times; each query must finish in tens of milliseconds while respecting turn restrictions and live traffic.

In semiconductor design, static timing analysis tools model gate and wire delays as non-negative weights and invoke Dijkstra repeatedly to compute arrival times at every flip-flop; a single chip may contain tens of millions of such vertices.

Network routing protocols such as OSPF and IS-IS treat link costs as positive metrics and compute shortest-path trees with Dijkstra at each router; convergence after a link failure must occur within seconds across thousands of routers.

In robotics, motion-planning pipelines for autonomous vehicles represent configuration-space obstacles as graphs whose edges carry non-negative traversal costs; repeated Dijkstra calls produce collision-free trajectories that respect kinematic constraints.

Machine-learning compilers schedule tensor operations on heterogeneous hardware by constructing a data-flow graph whose edges encode latency and bandwidth; Dijkstra finds the lowest-latency execution order under memory-capacity constraints.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Weighted directed graph  | Edge weights encode distances or costs; direction matters for reachability. |
| Priority queue (min-heap)| Supplies the “closest unsettled vertex” in logarithmic time. |
| Relaxation operation     | The only way distance labels are ever improved.           |
| Invariant / loop invariant | Proves that a dequeued distance is optimal.             |

## 4. Building the idea — from intuition to formalism

### Step 1 — Maintain a distance label for every vertex
Plain-English claim: each vertex \(v\) stores an upper bound \(d(v)\) on the true shortest-path distance from the source; initially only the source has a finite label.

Concrete example: source \(s\) has \(d(s)=0\), all other vertices start at \(\infty\).

Formal statement:
\[
d(v) \gets 
\begin{cases}
0 & \text{if }v=s\\
\infty & \text{otherwise}
\end{cases}
\]

> [!WARNING]
> Treating \(\infty\) as a literal large integer without overflow checks produces wrong answers on graphs whose longest shortest-path exceeds that integer.

### Step 2 — Always commit to the smallest unsettled label
Plain-English claim: among all vertices whose shortest path is not yet known, the one with the smallest current label must have a correct shortest path.

Concrete example: after initializing, \(s\) is dequeued; its label 0 is optimal.

Formal statement: when \(u\) is extracted from the priority queue,
\[
d(u)=\delta(s,u)
\]
where \(\delta\) denotes true shortest-path distance.

> [!WARNING]
> Extracting a vertex whose label is still \(\infty\) signals an unreachable component; continuing without checking produces spurious zero-length paths.

### Step 3 — Relax every outgoing edge of the extracted vertex
Plain-English claim: for each neighbor \(v\) of \(u\), test whether traveling through \(u\) yields a shorter route.

Concrete example: edge \(u\to v\) weight 3 gives the test \(d(v)>d(u)+3\).

Formal statement (relaxation):
\[
\text{if }d(v)>d(u)+w(u,v)\quad\text{then}\quad d(v)\gets d(u)+w(u,v)
\]

> [!WARNING]
> Forgetting to update the priority-queue entry for \(v\) (decrease-key) yields an obsolete larger label and an incorrect final distance.

### Step 4 — Use a binary heap to realize the priority queue
Plain-English claim: each extraction costs \(O(\log V)\) and each relaxation costs \(O(\log V)\) for a decrease-key, producing the stated complexity.

Formal statement:
\[
T(n)=O((V+E)\log V)
\]

> [!WARNING]
> Using an unsorted array instead of a heap reverts the algorithm to \(O(V^2+E)\) and hides the logarithmic factor that makes Dijkstra practical on large sparse graphs.

### Step 5 — Termination yields shortest-path distances and a tree
Plain-English claim: when the priority queue empties, every reachable vertex has a finalized distance and a parent pointer that reconstructs the unique shortest-path tree.

Formal statement: the parent pointers form a tree rooted at \(s\) whose root-to-leaf paths realize \(\delta(s,v)\) for all \(v\).

## 5. Worked examples — every step shown

**Example 1 — Single-edge graph**  
*Given:* vertices \(\{s,t\}\), edge \(s\to t\) weight 4.  
*Find:* \(\delta(s,t)\).  

Initialize \(d(s)=0\), \(d(t)=\infty\).  
Extract \(s\).  
Relax \(t\): \(d(t)>0+4\) becomes true, so \(d(t)\gets4\).  
Extract \(t\). Queue empty.  
**Final distances:** \(d(s)=0\), \(d(t)=4\).

*Reflection:* The single relaxation demonstrates the basic update; nothing can improve the label afterward because the only edge has already been examined.

**Example 2 — Two competing paths**  
*Given:* \(s\to a\) (1), \(s\to b\) (4), \(a\to b\) (1).  
*Find:* distances from \(s\).  

Initialize \(d(s)=0\). Extract \(s\).  
Relax \(a\): \(d(a)\gets1\); relax \(b\): \(d(b)\gets4\).  
Extract \(a\) (smaller label). Relax \(b\): \(4>1+1\) true, \(d(b)\gets2\).  
Extract \(b\).  
**Final distances:** \(d(s)=0\), \(d(a)=1\), \(d(b)=2\).

*Reflection:* The decrease of \(d(b)\) after \(a\) is extracted shows why the priority queue must support efficient updates.

**Example 3 — Unreachable vertex**  
*Given:* \(s\to a\) (2) and isolated vertex \(c\).  
*Find:* all distances.  

After processing \(s\) and \(a\), \(d(c)\) remains \(\infty\).  
**Final answer:** \(d(c)=\infty\).

*Reflection:* The algorithm naturally reports unreachability without extra machinery.

**Example 4 — Larger sparse graph**  
*Given:* vertices \(s,a,b,c,d\); edges \(s\to a:2\), \(s\to b:5\), \(a\to c:1\), \(b\to c:2\), \(a\to d:4\), \(c\to d:1\).  
All weights positive.  
Run Dijkstra: extract order \(s,a,c,b,d\).  
Distance updates: \(d(a)=2\), \(d(b)=5\), \(d(c)=3\), \(d(d)=4\).  
**Final distances:** \(s:0\), \(a:2\), \(b:5\), \(c:3\), \(d:4\).

*Reflection:* Multiple paths to \(d\) exist; the algorithm selects the cheapest via the earliest finalized predecessor.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using Dijkstra on negative edges  | Learner forgets the non-negativity precondition | Run Bellman-Ford first on any graph that might contain negatives |
| Missing decrease-key on heap      | Standard binary-heap libraries lack it      | Store (vertex, distance) pairs and ignore obsolete entries on extraction |
| Storing distances in floating point | Rounding errors accumulate on long paths   | Use exact integer or rational weights when possible  |
| Not handling disconnected graphs  | Algorithm silently leaves \(\infty\) labels | Explicitly test for \(\infty\) before reporting a path |
| Re-inserting visited vertices     | Implementation lacks a “settled” set        | Mark vertices settled on extraction and skip later extractions |
| Priority queue without handles    | Decrease-key costs \(O(V)\) when naïve      | Use Fibonacci heap or pair each vertex with its heap index |
| Assuming unique shortest paths    | Multiple equally short paths exist          | Store all parents or accept any valid shortest-path tree |

## 7. The textbook-precise statement
Dijkstra’s algorithm solves the single-source shortest-paths problem on a weighted directed graph \(G=(V,E)\) with weight function \(w:E\to\mathbb{R}_{\ge0}\). It maintains a set \(S\subseteq V\) of settled vertices and a priority queue of unsettled vertices keyed by current distance estimates. Upon termination, for every vertex \(v\in V\),
\[
d(v)=\delta(s,v)=\min\{w(p):p\text{ is an }s\text{-}v\text{ path}\}
\]
or \(d(v)=\infty\) if no path exists. (Cormen et al., *Introduction to Algorithms*, 4e, §22.3.)

## 8. Visual — diagram or schematic
```text
          2
   (s) ------> (a)
    |           |
    |5          |1
    v           v
   (b)         (c)
    |           |
    |2          |1
    v           v
   (d) <------ (e)
          3
```
Vertices: s,a,b,c,d,e. All weights shown are non-negative. Shortest-path tree edges are the first time each vertex is settled.

## 9. The memory technique
1. **The hook** — Picture a hiker always walking to the nearest unvisited town on a map whose roads have only uphill or flat segments; once a town is reached, no later shortcut can be shorter.
2. **What to overlearn** — Non-negative weights are mandatory; extraction order equals settlement order; complexity \(O((V+E)\log V)\).
3. **Spaced-repetition schedule** — Review the invariant after 1 day, implement the algorithm after 3 days, prove correctness after 7 days, optimize with Fibonacci heaps after 16 days, compare with A* after 35 days.
4. **First-principles fallback** — Re-derive the invariant: if every unsettled path must cross the settled cut, the smallest label on the unsettled side cannot be improved.

## 10. What this unlocks
Dijkstra supplies the algorithmic engine for many network-optimization problems and serves as the inner loop of A* search and of certain dynamic-programming formulations on DAGs.

- A* heuristic search and admissible heuristics  
- Johnson’s algorithm for all-pairs shortest paths with negatives  
- Minimum spanning tree via reduction to shortest paths  
- Critical-path scheduling in project networks  
- Betweenness-centrality computation in social-network analysis

## 11. Self-check — five questions, no answers
1. On a graph with a single negative edge reachable from the source, which line of Dijkstra first produces an incorrect distance label?  
2. A binary heap implementation performs \(V\) extractions and \(E\) decrease-key operations; what is the exact number of comparisons performed in the worst case?  
3. Why does the parent-pointer tree remain acyclic even when multiple shortest paths exist?  
4. Suppose every edge weight is increased by the same positive constant \(c\); do the shortest-path distances change by a factor of \(c\)?  
5. Design a graph family where Dijkstra with a binary heap is asymptotically slower than the \(O(V^2)\) implementation; give the exact density threshold.