## What it is
An **articulation point** (or cut vertex) is a vertex in a graph whose removal increases the number of connected components. Similarly, a **bridge** (or cut edge) is an edge whose removal increases the number of connected components. Tarjan's algorithm finds these critical points efficiently using a single Depth First Search (DFS) and a concept called low-link values.

## Why it matters
These concepts are fundamental to network reliability and vulnerability analysis. In aerospace, if a communication network for a swarm of drones is a graph, articulation points represent single drones whose failure would split the swarm into disconnected groups. In distributed computing, bridges can represent network links that are single points of failure, whose severance would partition the system.

## When to study it
You must have a solid understanding of **Depth First Search (DFS)**, including the concepts of a DFS tree, discovery times, and the classification of edges into tree edges and back edges in an undirected graph. You should also be comfortable with graph representations, specifically adjacency lists. If you cannot trace a DFS by hand and track discovery times, review that first.

## How to study it (step by step)
1.  **Review DFS:** On a whiteboard or paper, draw a simple undirected graph with 8-10 vertices and a cycle. Perform a DFS starting from an arbitrary vertex, numbering each vertex with its discovery time. Draw the resulting DFS tree and clearly label the back edges.
2.  **Define Low-Link:** Read the formal definition of the low-link value. Write it down. Now, rephrase it in your own words using the intuition of "what is the highest ancestor a node or its descendants can reach?"
3.  **Derive the Conditions:** Start with the intuition. A non-root vertex `u` is an articulation point if a child `v` and its entire subtree are "trapped" beneath `u`, unable to reach any of `u`'s ancestors. Formalize this intuition into the condition `low_link[v] >= discovery_time[u]`. Do the same for bridges, deriving `low_link[v] > discovery_time[u]`.
4.  **Trace the Algorithm:** Take the same graph from step 1. Perform the DFS again, but this time, for each vertex, calculate its low-link value as you backtrack (i.e., on the return from the recursive call). Check the articulation point and bridge conditions at each step.
5.  **Handle the Root:** Analyze why the condition for non-root vertices fails for the root of the DFS tree. Derive the separate, simpler condition: the root is an articulation point if and only if it has more than one child in the DFS tree.
6.  **Implement:** Code the algorithm from scratch in a language of your choice. Test it on several graphs, including a line, a cycle, a star graph, and a complete graph, to verify its correctness.

## Key ideas, with intuition
1.  **DFS Tree and Back Edges:** A DFS on an undirected graph partitions edges into two types: **tree edges**, which form the DFS spanning tree, and **back edges**, which connect a vertex `u` to one of its ancestors in the tree. Back edges are crucial; they create cycles and represent alternative paths.

2.  **Discovery Time `disc[u]`:** This is simply a counter for when a vertex `u` is first visited during the DFS. It establishes the ancestor-descendant relationships in the DFS tree. If `disc[u] < disc[v]`, `u` was visited before `v`.

3.  **Low-Link Value `low[u]`:** This is the core idea. The low-link value of a vertex `u` is the lowest discovery time reachable from `u` (including itself) by traversing zero or more tree edges and then at most one back edge.
    $$
    low[u] = \min \left( \{disc[u]\} \cup \{low[v] \mid (u, v) \text{ is a tree edge}\} \cup \{disc[w] \mid (u, w) \text{ is a back edge}\} \right)
    $$
    Intuitively, `low[u]` tells you the "highest" point in the DFS tree that `u` or any of its descendants can reach. A low `low[u]` value means `u` is part of a robustly connected subgraph with many alternative paths upward.

4.  **The Articulation Point Condition:** Consider a vertex `u` and its child `v` in the DFS tree. If the subtree rooted at `v` cannot reach any vertex discovered before `u`, then `u` is the *only* connection from that subtree to the rest of the graph. Removing `u` would disconnect `v`'s subtree. The condition `low[v] >= disc[u]` precisely captures this: the highest reachable ancestor from `v`'s subtree is, at best, `u` itself.

5.  **The Bridge Condition:** The logic is similar but stricter. For the edge `(u, v)` to be a bridge, the subtree at `v` must not be able to reach `u` or anything higher via any other path. This means the highest reachable ancestor from `v`'s subtree must be strictly below `u`. The condition is `low[v] > disc[u]`.

## Worked example
Consider the following graph:
A-B, B-C, C-A (a triangle)
C-D
D-E, D-F, E-F (another triangle)

Let's find articulation points and bridges. We start a DFS from A.

1.  **DFS from A:**
    -   Visit A. `disc[A]=1`, `low[A]=1`. `time=1`.
    -   Move to B (child of A). `disc[B]=2`, `low[B]=2`. `time=2`.
    -   Move to C (child of B). `disc[C]=3`, `low[C]=3`. `time=3`.
    -   From C, we see A. `(C, A)` is a back edge since A is visited and not the parent of C.
        -   Update `low[C] = min(low[C], disc[A]) = min(3, 1) = 1`.
    -   From C, move to D (child of C). `disc[D]=4`, `low[D]=4`. `time=4`.
    -   Move to E (child of D). `disc[E]=5`, `low[E]=5`. `time=5`.
    -   From E, we see F (child of E). `disc[F]=6`, `low[F]=6`. `time=6`.
    -   From F, we see D. `(F, D)` is a back edge.
        -   Update `low[F] = min(low[F], disc[D]) = min(6, 4) = 4`.
    -   Return from F to E.
        -   Update `low[E] = min(low[E], low[F]) = min(5, 4) = 4`.
        -   Check bridge `(E,F)`: `low[F] > disc[E]`? `4 > 5` is false.
    -   From E, we see D. `(E, D)` is a back edge.
        -   Update `low[E] = min(low[E], disc[D]) = min(4, 4) = 4`.
    -   Return from E to D.
        -   Update `low[D] = min(low[D], low[E]) = min(4, 4) = 4`.
        -   Check articulation point D: Is `low[E] >= disc[D]`? `4 >= 4` is true. **D is an articulation point.**
        -   Check bridge `(D,E)`: `low[E] > disc[D]`? `4 > 4` is false.
    -   Return from D to C.
        -   Update `low[C] = min(low[C], low[D]) = min(1, 4) = 1`.
        -   Check articulation point C: Is `low[D] >= disc[C]`? `4 >= 3` is true. **C is an articulation point.**
        -   Check bridge `(C,D)`: `low[D] > disc[C]`? `4 > 3` is true. **(C,D) is a bridge.**
    -   Return from C to B.
        -   Update `low[B] = min(low[B], low[C]) = min(2, 1) = 1`.
        -   Check articulation point B: Is `low[C] >= disc[B]`? `1 >= 2` is false.
    -   Return from B to A.
        -   Update `low[A] = min(low[A], low[B]) = min(1, 1) = 1`.
        -   A is the root. It has only one child (B), so it is not an articulation point.

**Reflection:**
-   The back edge `(C,A)` allowed `low[C]` to become 1, signaling that the A-B-C triangle is a 2-connected component. This is why `low[C] < disc[B]`, preventing B from being an articulation point.
-   The D-E-F component had no back edges reaching *above* D. `low[E]` and `low[F]` could only go as low as `disc[D]`. This "trapped" them, making D an articulation point.
-   The edge `(C,D)` was the sole connection between the two components. The check `low[D] > disc[C]` correctly identified it as a bridge because the entire D-E-F subtree could not reach C or anything higher.

## Diagrams
```text
Graph G:

      A
     / \
    B---C---D
         / \
        E---F

DFS Tree from A (T=Tree Edge, B=Back Edge):

      A (1/1)
      | T
      B (2/1)
      | T
      C (3/1)
      | T
      D (4/4)
      | T
      E (5/4)
      | T
      F (6/4)

Back Edges: (C,A), (F,D), (E,D)

Labels are (discovery_time / final_low_link_value)
```

## Memory technique — remember this forever
1.  **The Mountain Climbing Story:**
    Imagine the DFS tree is a mountain range you are exploring. `disc[u]` is the altitude where you first discovered campsite `u`. `low[u]` is the *lowest altitude* you can get back to from `u` or any camp in its valley (`u`'s subtree) by using at most one special "safety rope" (a back edge).
    -   **Articulation Point:** You are at campsite `u`. Your climbing partner is at a lower campsite `v` that you discovered from `u`. If the lowest altitude your partner can reach with their safety ropes (`low[v]`) is still *at or below your current altitude* (`disc[u]`), then you (`u`) are their only way back up. If you disappear, they are cut off. `low[v] >= disc[u]`.
    -   **Bridge:** The rope `(u,v)` connecting you to your partner is a bridge if their lowest reachable altitude (`low[v]`) is *strictly lower* than your altitude (`disc[u]`). They have no safety ropes that can even reach you, let alone higher ground. If the rope `(u,v)` breaks, they are cut off. `low[v] > disc[u]`.

2.  **Formulas to Overlearn:**
    -   Non-root `u` is an articulation point if for any child `v`: `low[v] >= disc[u]`
    -   Edge `(u, v)` is a bridge if `v` is a child of `u` and: `low[v] > disc[u]`
    -   Root is an articulation point if it has `> 1` children in the DFS tree.

3.  **Spaced Repetition Schedule:**
    Review this material and re-derive the conditions from the mountain climbing analogy in: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:**
    If you forget the formulas, rebuild them. An articulation point `u` separates its child `v`'s subtree. This means there is no path from `v`'s subtree to an ancestor of `u` that avoids `u`. A path that avoids `u` must use a back edge from some `w` in `v`'s subtree to an ancestor `x` of `u`. This would imply `disc[x] < disc[u]`. The `low[v]` value captures the minimum discovery time reachable. So, if `low[v]` is still greater than or equal to `disc[u]`, no such "escape path" exists.

## Common mistakes
1.  **Mixing up `>=` and `>`:** An articulation point uses `low[v] >= disc[u]`. The equality case is important: it means the subtree at `v` can get back to `u`, but no higher. `u` is still the single point of connection. A bridge requires `low[v] > disc[u]`, meaning the subtree at `v` can't even get back to `u` via another path.
2.  **Forgetting the Root Case:** The `low[v] >= disc[u]` condition does not apply to the root of the DFS tree, as it has no ancestors (`disc[root]=1`). The root is an articulation point if and only if it has more than one child, which directly implies its removal splits the graph.
3.  **Incorrect `low` value update:** The `low[u]` value must be updated based on two sources: the `low` values of its children `v` in the DFS tree (`low[u] = min(low[u], low[v])`) and the `disc` values of any neighbors `w` connected by a back edge (`low[u] = min(low[u], disc[w])`). Forgetting one of these leads to incorrect results.

## Self-check
1.  Consider a graph that is a simple cycle of 5 vertices: A-B-C-D-E-A. Run Tarjan's algorithm. What are the discovery and low-link values for each vertex? Are there any articulation points or bridges? Why?
2.  Take the graph from the previous question and add a "tail": F-A. Now, run the algorithm again starting from F. What changes? Which vertices/edges are now articulation points/bridges?
3.  Can an edge be a bridge if neither of its endpoints is an articulation point? Provide a minimal example or prove it's impossible. Can a vertex be an articulation point without being an endpoint of any bridge? Provide an example or prove impossible.