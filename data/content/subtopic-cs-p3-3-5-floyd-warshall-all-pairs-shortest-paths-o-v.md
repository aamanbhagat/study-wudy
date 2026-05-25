## What it is
The Floyd-Warshall algorithm is a dynamic programming method for finding the shortest paths between all pairs of vertices in a weighted, directed graph. It systematically considers every possible vertex as an intermediate point in a path, iteratively improving path estimates until they are optimal. It correctly handles positive and negative edge weights, but not negative-weight cycles.

## Why it matters
This algorithm is fundamental for solving all-pairs shortest path problems, which appear in network routing protocols where a router needs to know the best path to all other routers. In computational biology, it's used for sequence alignment and constructing phylogenetic trees. In aerospace, it can be adapted for mission planning to find the optimal travel cost (e.g., fuel, time) between any two waypoints in a complex mission space with many potential intermediate stops.

## When to study it
Before tackling Floyd-Warshall, you must have a solid grasp of these prerequisites:
*   **Graph Representations:** Specifically, the **Adjacency Matrix**. The algorithm's structure is a natural fit for this representation.
*   **Dynamic Programming:** You must understand the core concepts of optimal substructure and overlapping subproblems. Floyd-Warshall is a classic DP algorithm.
*   **Single-Source Shortest Path Algorithms:** Familiarity with Dijkstra's and Bellman-Ford's algorithms provides essential context for the shortest path problem class. Bellman-Ford's DP-like nature is particularly relevant.

If you are not comfortable with these, pause and review them.

## How to study it (step by step)
1.  **Review the Adjacency Matrix.** Set up a $V \times V$ matrix, $D$, for a graph with $V$ vertices. Initialize $D[i][j]$ with the direct edge weight from $i$ to $j$. Set $D[i][i] = 0$ and $D[i][j] = \infty$ if no direct edge exists. This matrix will be your state for the dynamic program.
2.  **Understand the Core Subproblem.** The key idea is to build the solution iteratively. Let $D^{(k)}[i][j]$ be the shortest path from $i$ to $j$ using only intermediate vertices from the set $\{1, 2, ..., k\}$.
3.  **Derive the Recurrence Relation.** To compute $D^{(k)}[i][j]$, consider vertex $k$. The shortest path from $i$ to $j$ using intermediates from $\{1, ..., k\}$ either *uses* vertex $k$ or it *doesn't*.
    *   If it doesn't use $k$, the path is the same as the shortest path using only intermediates from $\{1, ..., k-1\}$, which is $D^{(k-1)}[i][j]$.
    *   If it does use $k$, the path must be $i \to ... \to k \to ... \to j$. The optimal such path is the shortest path from $i$ to $k$ plus the shortest path from $k$ to $j$, both using only intermediates from $\{1, ..., k-1\}$. This is $D^{(k-1)}[i][k] + D^{(k-1)}[k][j]$.
    *   Therefore, $D^{(k)}[i][j] = \min(D^{(k-1)}[i][j], D^{(k-1)}[i][k] + D^{(k-1)}[k][j])$.
4.  **Trace by hand.** Take a small 4-vertex graph. Create the initial distance matrix $D^{(0)}$. Then, methodically compute $D^{(1)}$, $D^{(2)}$, $D^{(3)}$, and finally $D^{(4)}$, updating the matrix at each step. This will make the abstraction concrete.
5.  **Implement it.** The recurrence relation translates directly into three nested loops. The outermost loop must be for $k$ (the intermediate vertex), from $1$ to $V$. The inner loops are for $i$ and $j$.
6.  **Analyze Complexity.** Count the operations. Three nested loops, each running $V$ times. This immediately gives a time complexity of $O(V^3)$. The space complexity is $O(V^2)$ for the distance matrix.

## Key ideas, with intuition
1.  **The "Intermediate Vertex" Idea:** The algorithm's brilliance is its simplicity. Instead of trying to find the entire path at once, it asks a series of simpler questions. For each vertex $k$, it asks: "For every pair of vertices $(i, j)$, is it shorter to go directly from $i$ to $j$ using the paths we've already found, or is it shorter to go from $i$ to our new 'allowed' intermediate vertex $k$, and then from $k$ to $j$?"
2.  **Building Up the Solution:** The algorithm builds the solution in stages.
    *   **Stage 0:** No intermediate vertices allowed. The shortest paths are just the direct edge weights.
    *   **Stage 1:** We are allowed to use vertex 1 as an intermediate stop. We update all paths.
    *   **Stage 2:** We are allowed to use vertices {1, 2} as intermediate stops. We update all paths again, using the results from Stage 1.
    *   ...
    *   **Stage V:** We are allowed to use any vertex {1, 2, ..., V} as an intermediate. At this point, we have found the true all-pairs shortest paths.
3.  **The Core Recurrence:** This is the mathematical formulation of the "Intermediate Vertex" idea. Let $D_{ij}$ be the shortest distance from $i$ to $j$. When considering an intermediate vertex $k$, the update rule is:
    $$ D_{ij} \leftarrow \min(D_{ij}, D_{ik} + D_{kj}) $$
    This says: "The new best path from $i$ to $j$ is the minimum of the old best path and the path that detours through $k$." This single line is the heart of the entire algorithm.

## Worked example
Consider the following directed, weighted graph.

```text
      (1)----3---->(2)
       ^ \          /
       |  \8       / 4
      -2   \      /
       |    V    V
      (4)<---7----(3)
```

**Step 0: Initialization**
We create the initial distance matrix $D^{(0)}$. The value $D^{(0)}_{ij}$ is the weight of the direct edge from $i$ to $j$. $\infty$ means no direct path.

$$
D^{(0)} =
\begin{pmatrix}
0 & 3 & 8 & \infty \\
\infty & 0 & 4 & \infty \\
\infty & \infty & 0 & 7 \\
-2 & \infty & \infty & 0
\end{pmatrix}
$$

**Step 1: Intermediate vertex $k=1$**
We check if going through vertex 1 improves any path. The formula is $D^{(1)}_{ij} = \min(D^{(0)}_{ij}, D^{(0)}_{i1} + D^{(0)}_{1j})$.
Let's check $D_{42}$: $D^{(0)}_{42} = \infty$. The path through 1 is $D^{(0)}_{41} + D^{(0)}_{12} = -2 + 3 = 1$. Since $1 < \infty$, we update.
$D^{(1)}_{42} = 1$.
Let's check $D_{43}$: $D^{(0)}_{43} = \infty$. The path through 1 is $D^{(0)}_{41} + D^{(0)}_{13} = -2 + 8 = 6$. Since $6 < \infty$, we update.
$D^{(1)}_{43} = 6$.

$$
D^{(1)} =
\begin{pmatrix}
0 & 3 & 8 & \infty \\
\infty & 0 & 4 & \infty \\
\infty & \infty & 0 & 7 \\
-2 & \mathbf{1} & \mathbf{6} & 0
\end{pmatrix}
$$

**Step 2: Intermediate vertex $k=2$**
Now we use $D^{(1)}$ and allow vertex 2 as an intermediate. $D^{(2)}_{ij} = \min(D^{(1)}_{ij}, D^{(1)}_{i2} + D^{(1)}_{2j})$.
Let's check $D_{13}$: $D^{(1)}_{13} = 8$. The path through 2 is $D^{(1)}_{12} + D^{(1)}_{23} = 3 + 4 = 7$. Since $7 < 8$, we update.
$D^{(2)}_{13} = 7$.

$$
D^{(2)} =
\begin{pmatrix}
0 & 3 & \mathbf{7} & \infty \\
\infty & 0 & 4 & \infty \\
\infty & \infty & 0 & 7 \\
-2 & 1 & 6 & 0
\end{pmatrix}
$$

**Step 3: Intermediate vertex $k=3$**
$D^{(3)}_{ij} = \min(D^{(2)}_{ij}, D^{(2)}_{i3} + D^{(2)}_{3j})$.
Let's check $D_{14}$: $D^{(2)}_{14} = \infty$. Path through 3: $D^{(2)}_{13} + D^{(2)}_{34} = 7 + 7 = 14$. Update.
Let's check $D_{24}$: $D^{(2)}_{24} = \infty$. Path through 3: $D^{(2)}_{23} + D^{(2)}_{34} = 4 + 7 = 11$. Update.

$$
D^{(3)} =
\begin{pmatrix}
0 & 3 & 7 & \mathbf{14} \\
\infty & 0 & 4 & \mathbf{11} \\
\infty & \infty & 0 & 7 \\
-2 & 1 & 6 & 0
\end{pmatrix}
$$

**Step 4: Intermediate vertex $k=4$**
$D^{(4)}_{ij} = \min(D^{(3)}_{ij}, D^{(3)}_{i4} + D^{(3)}_{4j})$.
Let's check $D_{21}$: $D^{(3)}_{21} = \infty$. Path through 4: $D^{(3)}_{24} + D^{(3)}_{41} = 11 + (-2) = 9$. Update.
Let's check $D_{31}$: $D^{(3)}_{31} = \infty$. Path through 4: $D^{(3)}_{34} + D^{(3)}_{41} = 7 + (-2) = 5$. Update.
Let's check $D_{32}$: $D^{(3)}_{32} = \infty$. Path through 4: $D^{(3)}_{34} + D^{(3)}_{42} = 7 + 1 = 8$. Update.

$$
D^{(4)} =
\begin{pmatrix}
0 & 3 & 7 & 14 \\
\mathbf{9} & 0 & 4 & 11 \\
\mathbf{5} & \mathbf{8} & 0 & 7 \\
-2 & 1 & 6 & 0
\end{pmatrix}
$$

**Reflection:** This final matrix $D^{(4)}$ contains the shortest path lengths between all pairs of vertices. Each step $k$ successfully incorporated the optimal paths that could be formed by including vertex $k$ as a waypoint, building upon the optimal paths found in step $k-1$.

## Diagrams

```text
Graph for Worked Example:

      (1)----[3]---->(2)
       ^ \            ^
       |  \           |
     [-2]  \[8]       |[4]
       |    \         |
       |     V        V
      (4)<---[7]-----(3)

Key:
(n) -> Vertex n
[w] -> Edge with weight w
---> -> Directed edge
```

## Memory technique — remember this forever
1.  **Mnemonic:** Think of it as the "**K**ingdoms, **I**nterstates, and **J**ourneys" algorithm.
    *   `for k in Kingdoms`: You consider each kingdom one by one as a potential waypoint.
    *   `for i in Interstates`: For every possible starting interstate (city).
    *   `for j in Journeys`: For every possible destination journey (city).
    *   The loop order is fixed: `k, i, j`. You must consider all possible waypoints (`k`) before moving to the next level of path refinement.
2.  **Formulas to Overlearn:**
    *   The update rule: `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`
    *   The loop structure:
        ```
        for k from 1 to V
          for i from 1 to V
            for j from 1 to V
              // update rule
        ```
3.  **Spaced Repetition Schedule:**
    *   Review this material in **1 day**. (Re-do the worked example from scratch).
    *   Review again in **3 days**. (Implement the code).
    *   Review again in **7 days**. (Answer the self-check questions).
    *   Review again in **16 days**. (Explain the `k,i,j` loop order to an imaginary student).
    *   Review again in **35 days**. (Re-derive the recurrence from first principles).
4.  **First Principles Pathway:** If you forget everything, remember the core question: **"To get from node `i` to node `j`, should I consider going through node `k`?"**
    *   The path that *doesn't* go through `k` has length `dist[i][j]`.
    *   The path that *does* go through `k` is composed of two sub-paths: `i` to `k` and `k` to `j`. Its length is `dist[i][k] + dist[k][j]`.
    *   The shortest path is the minimum of these two options. This logic directly rebuilds the `min(...)` formula.

## Common mistakes
1.  **Incorrect Loop Order.** The outermost loop *must* be `k`. If you use `i, j, k` for instance, you are asking "what is the best path from `i` to `j` using any intermediate `k`?", but your values for `dist[i][k]` and `dist[k][j]` may not yet be the optimal ones for the current stage of the algorithm. The `k`-outermost structure ensures that when you are considering `k` as an intermediate, the subproblems `dist[i][k]` and `dist[k][j]` have already been solved optimally using intermediates `{1, ..., k-1}`.
2.  **Initialization Errors.** Forgetting to set `dist[i][i] = 0` or using 0 instead of $\infty$ for non-existent edges. Using 0 implies a free path exists, which will lead to incorrect results.
3.  **Ignoring Negative Cycles.** The algorithm can run on a graph with a negative cycle, but the results will be nonsensical. After the algorithm completes, you must check the diagonal of the distance matrix. If any `dist[i][i]` is negative, it means there is a negative cycle reachable from `i`, and the shortest path is undefined (infinitely small).

## Self-check
1.  Consider a simple directed triangle graph: $1 \to 2$ (weight 3), $2 \to 3$ (weight -6), $3 \to 1$ (weight 2). Manually trace the Floyd-Warshall algorithm. What is the final distance matrix? What does it tell you about the graph?
2.  The algorithm as presented only finds the *lengths* of the shortest paths. How would you augment it to reconstruct the actual *path* (i.e., the sequence of vertices)? Hint: use an additional $V \times V$ matrix, `next[i][j]`, to store the next vertex on the path from $i$ to $j$.
3.  Construct a small (4-node) graph where the loop order `i, j, k` would produce an incorrect result for at least one pair's shortest path, while the correct `k, i, j` order succeeds. Explain precisely why the `i, j, k` order fails on your example.