## What it is
Dijkstra's algorithm finds the shortest path from a single source node to all other nodes in a weighted, directed graph, provided that all edge weights are non-negative. It is a greedy algorithm, meaning it makes the locally optimal choice at each step—visiting the closest unvisited node—with the guarantee that these choices lead to a globally optimal solution.

## Why it matters
This algorithm is fundamental to network routing protocols like OSPF (Open Shortest Path First), which direct traffic on the internet. In aerospace, it's used for pathfinding in autonomous systems like planetary rovers, finding the most fuel-efficient or time-efficient trajectory between waypoints. In physics simulations, it can model the propagation of signals or particles through a medium where different paths have different "costs" or travel times.

## When to study it
Before tackling Dijkstra's algorithm, you must be comfortable with the following:
*   **Graph Theory Basics:** Understand nodes (vertices), edges, weights, and directed vs. undirected graphs.
*   **Graph Representations:** Be able to implement and use an adjacency list. An adjacency matrix works but is less efficient for sparse graphs.
*   **Priority Queues:** You must understand what a priority queue is and how it's typically implemented with a min-heap. You should know the time complexities of its core operations (insert, extract-min, decrease-key).
*   **Greedy Algorithms:** Have a basic intuition for what makes an algorithm "greedy."

If you are missing any of these, pause and review them first. The efficiency and correctness of Dijkstra's algorithm are inseparable from the priority queue data structure.

## How to study it (step by step)
1.  **Dry Run:** Find a small weighted graph (5-6 vertices) online or draw one. Choose a source vertex and manually execute the algorithm using pen and paper. Keep track of a `distances` array and a "frontier" of nodes to visit next.
2.  **Analyze the Greedy Choice:** For the graph in your dry run, pause after the first step. You picked the closest neighbor to the source. Convince yourself why it's impossible to find a shorter path to *that specific node* later. The key is that all other paths would have to go through other, more distant nodes first, and since edge weights are non-negative, any such detour can only increase the total path length.
3.  **Implement with a Library PQ:** Code the algorithm in your language of choice. Use an adjacency list for the graph and a library-provided priority queue. Focus on the logic: initialization, the main loop, and the relaxation step.
4.  **Analyze Complexity:** Break down the implemented code. Identify how many times each operation runs. The main loop runs $V$ times (once per vertex). Inside, you might iterate over all of a vertex's edges. The priority queue operations (`extract-min`, `decrease-key`/`insert`) cost $O(\log V)$. Summing this up leads to the $O((V+E) \log V)$ complexity.
5.  **Break it:** Create a simple graph with one negative edge. Run your code (or a dry run) on it. Observe how the algorithm produces an incorrect result because the greedy assumption is violated.

## Key ideas, with intuition
1.  **The Known Region:** Imagine your graph is a dark map. You start at a source city, $s$, with a flashlight. Initially, the "known region" where you have found the *guaranteed* shortest path contains only $s$. The distance to $s$ is $0$. All other cities are considered infinitely far away.
    $$
    \text{dist}[s] = 0 \\
    \text{dist}[v] = \infty, \forall v \neq s
    $$

2.  **The Frontier and the Greedy Choice:** The "frontier" consists of all cities directly reachable from your known region. Dijkstra's algorithm is greedy because it always chooses to explore the city on the frontier that is closest to the source $s$. You use a min-priority queue to efficiently track the frontier nodes and their tentative distances, always allowing you to extract the minimum one.

3.  **Finalizing a Path:** The core insight is this: when you pick the closest node $u$ from the frontier, its calculated shortest distance is now final and correct. Why? Because all other paths to $u$ must pass through other, more distant frontier nodes. Since all edge weights are non-negative, any such alternative path will necessarily be longer. You can now add $u$ to your "known region."

4.  **Relaxation:** Once you've moved to a new city $u$ and finalized its distance, you shine your flashlight from there. You look at all its neighbors, $v$. For each neighbor, you check if the path from $s$ *through* $u$ to $v$ is shorter than any path you've previously found to $v$. This is called "relaxing" the edge $(u, v)$.
    $$
    \text{if } \text{dist}[u] + \text{weight}(u, v) < \text{dist}[v]: \\
    \quad \text{dist}[v] = \text{dist}[u] + \text{weight}(u, v)
    $$
    If you find a shorter path, you update `dist[v]` and update its priority in the priority queue.

## Worked example
Let's find the shortest paths from source node **A** in the following graph.

We will track:
*   `dist[node]`: The shortest distance found so far from A to `node`.
*   `prev[node]`: The previous node in the shortest path to `node`.
*   `PQ`: The min-priority queue, storing `(distance, node)`.
*   `Visited`: The set of nodes whose shortest path is finalized.

**Initial State:**
*   `dist`: {A:0, B:$\infty$, C:$\infty$, D:$\infty$, E:$\infty$}
*   `prev`: {A:null, B:null, C:null, D:null, E:null}
*   `PQ`: `[(0, A)]`
*   `Visited`: `{}`

**Step 1:**
*   Extract `(0, A)` from PQ. Add A to `Visited`.
*   `Visited`: `{A}`
*   Look at A's neighbors: B and C.
*   Relax edge (A, B): `dist[A] + 2 < dist[B]` ($0+2 < \infty$). Update `dist[B]=2`, `prev[B]=A`. Add `(2, B)` to PQ.
*   Relax edge (A, C): `dist[A] + 6 < dist[C]` ($0+6 < \infty$). Update `dist[C]=6`, `prev[C]=A`. Add `(6, C)` to PQ.
*   `PQ`: `[(2, B), (6, C)]`

**Step 2:**
*   Extract `(2, B)` from PQ. Add B to `Visited`.
*   `Visited`: `{A, B}`
*   Look at B's neighbors: D.
*   Relax edge (B, D): `dist[B] + 5 < dist[D]` ($2+5 < \infty$). Update `dist[D]=7`, `prev[D]=B`. Add `(7, D)` to PQ.
*   `PQ`: `[(6, C), (7, D)]`

**Step 3:**
*   Extract `(6, C)` from PQ. Add C to `Visited`.
*   `Visited`: `{A, B, C}`
*   Look at C's neighbors: D.
*   Relax edge (C, D): `dist[C] + 1 < dist[D]` ($6+1 < 7$). This is FALSE. The existing path to D (A->B->D) is 7, and this new path is also 7. No update is made. *(Note: if the weight were 0, we would not update. If it were -1, this is where the algorithm could fail later).*
*   `PQ`: `[(7, D)]`

**Step 4:**
*   Extract `(7, D)` from PQ. Add D to `Visited`.
*   `Visited`: `{A, B, C, D}`
*   Look at D's neighbors: E.
*   Relax edge (D, E): `dist[D] + 3 < dist[E]` ($7+3 < \infty$). Update `dist[E]=10`, `prev[E]=D`. Add `(10, E)` to PQ.
*   `PQ`: `[(10, E)]`

**Step 5:**
*   Extract `(10, E)` from PQ. Add E to `Visited`.
*   `Visited`: `{A, B, C, D, E}`
*   E has no outgoing edges.
*   `PQ`: `[]`

**Final Result:**
The PQ is empty. The algorithm terminates.
*   **Shortest Distances from A:** {A:0, B:2, C:6, D:7, E:10}
*   **Shortest Paths (reconstructed from `prev`):**
    *   A -> B
    *   A -> C
    *   A -> B -> D
    *   A -> B -> D -> E

Each step worked because we greedily chose the unvisited node with the absolute smallest distance from the source. The non-negative edge weights guaranteed that this choice was final and could not be improved upon later.

## Diagrams
```text
      (2)
    /-----> B -----\
   /         (5)   \
  A                   -> D --(3)--> E
   \         (1)   /
    \-----> C -----/
      (6)

Initial State:
dist: {A:0, B:inf, C:inf, D:inf, E:inf}
PQ:   [(0, A)]

Final paths:
A -> B (cost 2)
A -> C (cost 6)
A -> B -> D (cost 7)
A -> B -> D -> E (cost 10)
```

## Memory technique — remember this forever
1.  **The Story:** "Dijkstra the Spreading Ink". Imagine the source node `s` is a drop of ink on a paper map. The ink spreads along the roads (edges). The time it takes to traverse a road is its weight. The ink always spreads from the entire current boundary of the ink stain, naturally reaching the closest points first. The algorithm is just a formalization of this process: the priority queue tracks the "wet edge" of the ink stain, and at each step, we see which point on the map gets stained next. The "no negative edges" rule is crucial: ink can't travel backwards in time to find a shortcut.

2.  **Must Overlearn:**
    *   **The Relaxation Condition:**
        $$
        \text{if } \text{dist}[u] + \text{weight}(u, v) < \text{dist}[v]
        $$
    *   **The Time Complexity:**
        $$
        O((V+E) \log V) \quad \text{with a binary heap priority queue}
        $$
    *   **The Constraint:** **No negative edge weights.**

3.  **Spaced Repetition Schedule:**
    *   Review this material in **1 day**. Re-do the worked example from memory.
    *   Review in **3 days**. Implement the algorithm from scratch.
    *   Review in **7 days**. Explain the "spreading ink" analogy and why negative edges break it to an imaginary student.
    *   Review in **16 days**. Re-derive the time complexity.
    *   Review in **35 days**. Solve a medium-difficulty problem on a platform like LeetCode.

4.  **First Principles Pathway:** If you forget the algorithm, rebuild it from the concept of a "cloud" of visited nodes. Start with the source `s` in the cloud. All other nodes are unvisited. At every step, you want to add one node to the cloud. Which one? It must be the unvisited node that is closest to `s`. How do you find it? Check all edges that go from a node *inside* the cloud to a node *outside* it. The one that results in the minimum total path length from `s` is your next node. This is the core logic. A priority queue is simply the *efficient* way to track all those cross-cloud edges.

## Common mistakes
1.  **Using on Graphs with Negative Edges:** This is the most common conceptual error. Dijkstra's will run but may produce incorrect results because its greedy assumption is violated. For graphs with negative edges, you need Bellman-Ford or SPFA.
2.  **Not Updating the Priority Queue:** When you relax an edge and find a shorter path to a node `v`, you must update its distance. If `v` is already in the priority queue, its priority needs to be decreased. Some library implementations make this tricky; a common alternative is to just insert the new, better `(distance, v)` pair and let the old, worse one become stale.
3.  **Incorrect Initialization:** Forgetting to set the distance to the source node to 0 and all others to infinity will cause the algorithm to fail immediately.
4.  **Stopping Too Early:** The algorithm is only finished when the priority queue is empty, or when you have extracted `V` nodes. Don't stop just because you've reached your target destination node; a shorter path to it might still be discovered through another node still in the queue.

## Self-check
1.  Given a graph with 5 nodes and non-negative edge weights, and a starting node `S`, what are the initial values in the `distances` array before the main loop begins?
2.  How would you modify the algorithm to not only return the shortest distances, but also to count the *number* of distinct shortest paths to each node?
3.  Draw a simple graph (3 or 4 nodes) with one negative edge. Choose a source node and trace Dijkstra's algorithm. Show which node gets an incorrect shortest-path distance and explain at which step the greedy choice failed.