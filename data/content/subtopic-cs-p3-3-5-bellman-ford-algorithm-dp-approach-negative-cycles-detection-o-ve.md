## What it is
The Bellman-Ford algorithm computes the shortest paths from a single source vertex to all other vertices in a weighted, directed graph. Unlike Dijkstra's algorithm, it correctly handles graphs that contain edges with negative weights. Its core is a dynamic programming approach that iteratively "relaxes" edges to find shorter paths.

## Why it matters
Bellman-Ford is fundamental in network routing protocols (like RIP) where path metrics can be complex and not strictly positive. In finance, it can detect arbitrage opportunities, which are equivalent to negative-weight cycles in a graph of currency exchanges. For physics simulations, it can model state transitions where energy can be released (a negative "cost"), helping to find the lowest energy path in certain discrete systems.

## When to study it
You must have a firm grasp of graph theory fundamentals: vertices, directed/undirected edges, edge weights, and the formal definition of a path. You should understand the single-source shortest path (SSSP) problem. Crucially, you need to understand the core principles of dynamic programming (DP): optimal substructure and overlapping subproblems. Familiarity with Dijkstra's algorithm is useful for contrast.

## How to study it (step by step)
1.  **Review Dynamic Programming.** Re-read your notes on the principle of optimality. Convince yourself that a subpath of a shortest path must also be a shortest path. This is the "optimal substructure" that makes DP applicable here.
2.  **Derive the Recurrence.** Start with the question: "What is the shortest path from a source `s` to a vertex `v` that uses at most `k` edges?" Express the answer for `k` edges in terms of the answer for `k-1` edges. This will lead you directly to the Bellman-Ford recurrence relation.
3.  **Trace on a Simple Graph.** Draw a 4-vertex graph with only positive weights. Initialize distances (`dist[s]=0`, others $\infty$). Manually execute the algorithm, creating a table showing the `dist` array after each of the $V-1$ iterations.
4.  **Introduce a Negative Edge.** Add a negative weight edge to your graph, but do not create a negative cycle. Repeat the trace. Observe how the negative edge allows for a "shortcut" that is discovered over several iterations.
5.  **Introduce a Negative Cycle.** Now, modify the graph to include a negative-weight cycle. Run the algorithm for $V-1$ iterations. Then, run it one more time (the $V$-th iteration). Observe which distances change during this final iteration and understand why this signals the presence of the cycle.
6.  **Analyze Complexity.** Count the operations. The algorithm has an outer loop that runs $V$ times and an inner loop that iterates through all $E$ edges. Derive the time complexity of $O(VE)$ from this structure. Compare it to Dijkstra's $O(E \log V)$ and understand the trade-off.

## Key ideas, with intuition
1.  **The Path Length Limit:** A shortest path in a graph with $V$ vertices, if it has no cycles, can contain at most $V-1$ edges. Any path with $V$ or more edges must contain a cycle. This simple fact is the foundation of the algorithm's correctness and its mechanism for detecting negative cycles.

2.  **Dynamic Programming Formulation:** Let $d(i, v)$ be the length of the shortest path from the source $s$ to vertex $v$ using **at most** $i$ edges.
    *   Base Case: $d(0, s) = 0$ and $d(0, v) = \infty$ for all $v \neq s$.
    *   Recurrence: To find the shortest path to $v$ with at most $i$ edges, we have two choices. Either we already found the shortest path with $i-1$ edges, or we found a shortest path to some neighbor $u$ with $i-1$ edges and then traversed the edge $(u, v)$. We take the minimum of all possibilities.
    $$
    d(i, v) = \min\left(d(i-1, v), \quad \min_{(u,v) \in E} \{d(i-1, u) + w(u,v)\}\right)
    $$
    The algorithm implements this by iterating $i$ from 1 to $V-1$, and for each $i$, it "relaxes" every edge in the graph.

3.  **Relaxation:** This is the core operation. For an edge $(u, v)$ with weight $w(u,v)$, we check if we've found a better path to $v$ by going through $u$.
    ```
    if dist[u] + w(u,v) < dist[v]:
        dist[v] = dist[u] + w(u,v)
    ```
    After $i$ full passes of relaxing every edge, the `dist` array holds the shortest path distances using at most $i$ edges.

4.  **Negative Cycle Detection:** After $V-1$ iterations, we have found all shortest simple paths. If we run the relaxation loop one more time (the $V$-th iteration) and any `dist[v]` value decreases, it means we found a shorter path with $V$ edges. As established, such a path must contain a cycle. Because the path length decreased, that cycle's total weight must be negative.

## Worked example
Consider this graph with source vertex `A`.
Vertices: {A, B, C, D}
Edges: (A,B,5), (A,C,4), (B,D,3), (C,B,-2), (D,C,-1)

**Initialization:**
$V = 4, E = 5$. We will run $V-1 = 3$ iterations, plus a 4th for cycle detection.
`dist` array: `[A:0, B:inf, C:inf, D:inf]`

**Iteration 1 (paths with at most 1 edge):**
-   Relax (A,B,5): `dist[B] = min(inf, 0+5) = 5`
-   Relax (A,C,4): `dist[C] = min(inf, 0+4) = 4`
-   Relax (B,D,3): `dist[D]` remains `inf` since `dist[B]` was `inf` at the start of the iteration. (Order matters, but after a full pass, this will be resolved). Let's assume a fixed order of edges: (A,B), (A,C), (B,D), (C,B), (D,C).
-   Relax (C,B,-2): `dist[B]` remains 5.
-   Relax (D,C,-1): `dist[C]` remains 4.
After relaxing all edges once: `[A:0, B:5, C:4, D:inf]`

**Iteration 2 (paths with at most 2 edges):**
-   Relax (A,B,5): `0+5` is not `< 5`. No change.
-   Relax (A,C,4): `0+4` is not `< 4`. No change.
-   Relax (B,D,3): `dist[D] = min(inf, 5+3) = 8`.
-   Relax (C,B,-2): `dist[B] = min(5, 4-2) = 2`. **Update!**
-   Relax (D,C,-1): `dist[C]` remains 4.
After relaxing all edges: `[A:0, B:2, C:4, D:8]`

**Iteration 3 (paths with at most 3 edges):**
-   Relax (A,B,5): No change.
-   Relax (A,C,4): No change.
-   Relax (B,D,3): `dist[D] = min(8, 2+3) = 5`. **Update!**
-   Relax (C,B,-2): `dist[B] = min(2, 4-2) = 2`. No change.
-   Relax (D,C,-1): `dist[C] = min(4, 8-1) = 4`. No change.
After relaxing all edges: `[A:0, B:2, C:4, D:5]`

Final distances after $V-1=3$ iterations: A:0, B:2, C:4, D:5.

**Iteration 4 (Negative Cycle Check):**
-   Relax (A,B,5): No change.
-   Relax (A,C,4): No change.
-   Relax (B,D,3): No change.
-   Relax (C,B,-2): No change.
-   Relax (D,C,-1): `dist[C] = min(4, 5-1) = 4`. No change.
No distances changed in the 4th iteration. **Conclusion: No negative cycles reachable from A.**

**Reflection:**
-   Iteration 1 found direct paths from A.
-   Iteration 2 found a shorter path to B (A->C->B) which has 2 edges.
-   Iteration 3 used the updated distance to B to find a shorter path to D (A->C->B->D) which has 3 edges.
-   Each iteration $i$ successfully found the shortest paths of length at most $i$. Since no simple path is longer than 3, the algorithm terminated with the correct values.

## Diagrams
```text
Graph for Worked Example:

      +5
  A -----> B
  |        ^ \
  |        |  \ +3
+4|      -2|   V
  V        |    D
  C <----- /   /
     \ -1 /
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a town crier ("Bellman") who must spread news (shortest distances) from the castle (source `s`). He can't do it all at once. Each day (iteration), he walks through the entire town, visiting every road (edge). For each road from town `u` to town `v`, he shouts, "Is the journey from the castle to `u`, then taking this road to `v`, shorter than the best known journey to `v`? If so, update the map!" He does this for $V-1$ days, enough for news to travel along the longest possible simple road path. If on day $V$ he can *still* find a shorter path, he knows there's a magical "time-travel" loop (a negative cycle) that lets you get somewhere faster by taking a detour, which shouldn't be possible.

2.  **Must-Know Formulas:**
    *   Initialization: $d[s] \leftarrow 0$, $d[v] \leftarrow \infty$ for $v \neq s$.
    *   Relaxation: `if d[u] + w(u,v) < d[v]: d[v] = d[u] + w(u,v)`
    *   Loop Structure: `for i from 1 to V-1: for each edge (u,v) in E: relax(u,v)`

3.  **Spaced Repetition Schedule:** Review this lesson and re-derive the DP recurrence at:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget everything, start here: "How do I find the shortest path from `s` to `v` using at most `k` edges?" The answer must come from a path of at most `k-1` edges. Either the shortest path to `v` already used $\le k-1$ edges, or the shortest path goes to a neighbor `u` using $\le k-1$ edges and then takes the final edge `(u,v)`. This logic rebuilds the entire DP recurrence. The $V-1$ limit comes from the fact that any simple path has at most $V-1$ edges.

## Common mistakes
1.  **Incorrect Loop Bounds:** Only looping $V-2$ times is a common error; you need $V-1$ iterations to guarantee propagation across the longest possible simple path.
2.  **Misinterpreting the Negative Cycle Check:** A change during the $V$-th iteration only indicates a negative cycle *reachable from the source*. An isolated negative cycle elsewhere in the graph will not be detected.
3.  **Applying to Undirected Graphs with Negative Edges:** An undirected edge $(u, v)$ with negative weight $-w$ is implicitly a cycle of two edges, $(u,v)$ and $(v,u)$, with total weight $-2w$. Bellman-Ford will always find this as a negative cycle if the edge weight is negative. Be sure this is the intended model.
4.  **Off-by-one in Path Reconstruction:** When reconstructing the path using a `predecessor` array, forgetting to handle the case where the source has no predecessor can lead to infinite loops or errors.

## Self-check
1.  Consider a complete graph of 3 vertices (a triangle) where all edge weights are positive. Trace both Dijkstra's and Bellman-Ford starting from the same vertex. Do they produce the same distance values? How many iterations does Bellman-Ford require?
2.  Take the graph from the worked example and change the weight of edge (D,C) from -1 to -10. Trace the algorithm again. What happens in the 4th iteration? Which vertices are part of the negative cycle?
3.  Design a graph with a source `s`, a destination `t`, and a negative cycle that is not on any path from `s` to `t`. What is the output of Bellman-Ford for `dist[t]`? What are the distance values for the vertices within the cycle?