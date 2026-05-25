## What it is
A Minimum Spanning Tree (MST) of a connected, undirected, weighted graph is a subgraph that connects all the vertices together, without any cycles, and with the minimum possible total edge weight. It is a "spanning tree" because it spans (reaches) all vertices, and it is "minimum" because the sum of its edge weights is as small as possible.

## Why it matters
MSTs are fundamental to network design problems. Imagine laying fiber optic cable to connect several cities; an MST finds the cheapest way to lay the cable to ensure every city is connected. In aerospace, this could model minimizing the wire length needed to connect all electronic components on a satellite bus. In machine learning, algorithms like single-linkage hierarchical clustering are directly equivalent to running Kruskal's algorithm on a graph of data points.

## When to study it
You must be comfortable with these prerequisites. Do not proceed without them.
1.  **Graph Theory Basics:** What are vertices, edges, weights, paths, cycles, and connected components? How are graphs represented (adjacency list, adjacency matrix)?
2.  **Greedy Algorithms:** Understand the core concept of making a locally optimal choice at each step, hoping to find a global optimum.
3.  **Data Structures:** You must know **Priority Queues** (specifically, binary heaps) for Prim's algorithm and **Union-Find** (also called Disjoint Set Union or DSU) for Kruskal's algorithm. These are not optional; the efficiency of the algorithms depends entirely on these structures.

## How to study it (step by step)
1.  **Solidify the "Cut Property".** Take 15 minutes. Draw a graph, partition the vertices into two sets (a "cut"). Find the minimum-weight edge crossing the cut. Convince yourself that this edge *must* be part of *some* MST. This is the theoretical justification for the greedy approach.
2.  **Trace Kruskal's Algorithm.** On paper, with a graph of 6-8 vertices, create a list of all edges sorted by weight. Step through the algorithm, adding edges and using a simple drawing to track which vertices are in the same set (to detect cycles).
3.  **Trace Prim's Algorithm.** Use the same graph. Pick a starting vertex. Use a small table to act as your priority queue, keeping track of the cheapest edge from your growing tree to a vertex not yet in the tree.
4.  **Implement Kruskal's Algorithm.** Code it. You will need a working Union-Find data structure. The main logic is surprisingly short: sort edges, then iterate, adding an edge if its endpoints are not already connected.
5.  **Analyze Time Complexity.** Derive the runtime for both algorithms based on their underlying data structures. Why is Kruskal's $O(E \log E)$? Why is Prim's $O(E \log V)$? Relate each term to a specific operation (e.g., sorting, priority queue operations).

## Key ideas, with intuition
1.  **The Cut Property (The Greedy Choice Justification):** This is the central theorem. Let $G=(V, E)$ be a graph. A *cut* is a partition of the vertices $V$ into two disjoint sets, $S$ and $V-S$. A *crossing edge* is an edge with one endpoint in $S$ and the other in $V-S$. The Cut Property states: For any cut, if an edge $(u, v)$ is a strictly minimum-weight edge crossing the cut, then $(u, v)$ is part of every MST of $G$. If its weight is not unique, it is part of *at least one* MST. This property guarantees that picking a "safe" minimum-weight edge at any stage will not prevent us from completing an MST.

2.  **Kruskal's Algorithm: A Forest of Trees:** Kruskal's is "edge-centric". It views the graph as a collection of disconnected components (a forest).
    *   **Intuition:** Greedily build the MST by repeatedly adding the cheapest available edge anywhere in the graph, as long as it doesn't create a cycle.
    *   **Mechanism:** Sort all edges by weight, from smallest to largest. Iterate through the sorted edges. For each edge $(u, v)$, if adding it does not form a cycle with the edges already chosen, add it to the MST. How do you check for cycles efficiently? Use a Union-Find data structure. If `find(u)` is the same as `find(v)`, they are already in the same connected component, and adding edge $(u, v)$ would form a cycle.

3.  **Prim's Algorithm: A Single Growing Tree:** Prim's is "vertex-centric". It grows a single tree from an arbitrary starting vertex.
    *   **Intuition:** Greedily expand a single connected component (the tree) by always adding the cheapest possible edge that connects a vertex inside the tree to a vertex outside the tree.
    *   **Mechanism:** Start with an arbitrary vertex $s$ in your MST set. Use a priority queue to store edges that connect vertices in the MST set to vertices outside it. At each step, extract the minimum-weight edge $(u, v)$ from the priority queue, where $u$ is in the MST and $v$ is not. Add $v$ to the MST set and add all of $v$'s outgoing edges that lead to vertices not yet in the MST to the priority queue.

## Worked example
Consider this graph:
Vertices: {A, B, C, D, E}
Edges (and weights): (A,B,1), (A,C,7), (A,D,10), (B,C,5), (B,E,4), (C,D,2), (D,E,3)

Let's find the MST using both algorithms. The MST will have $|V|-1 = 5-1 = 4$ edges.

### Kruskal's Algorithm
1.  **Sort all edges by weight:**
    *   (A,B) : 1
    *   (C,D) : 2
    *   (D,E) : 3
    *   (B,E) : 4
    *   (B,C) : 5
    *   (A,C) : 7
    *   (A,D) : 10

2.  **Iterate and add safe edges:**
    *   **Add (A,B,1):** A and B are in different sets. Add it. MST edges: {(A,B)}. Sets: {A,B}, {C}, {D}, {E}.
    *   **Add (C,D,2):** C and D are in different sets. Add it. MST edges: {(A,B), (C,D)}. Sets: {A,B}, {C,D}, {E}.
    *   **Add (D,E,3):** D and E are in different sets. Add it. MST edges: {(A,B), (C,D), (D,E)}. Sets: {A,B}, {C,D,E}.
    *   **Add (B,E,4):** B and E are in different sets ({A,B} vs {C,D,E}). Add it. MST edges: {(A,B), (C,D), (D,E), (B,E)}. Sets: {A,B,C,D,E}.
    *   We now have 4 edges. We are done. The algorithm can stop.

**Result (Kruskal):** Edges {(A,B), (C,D), (D,E), (B,E)}. Total weight = $1+2+3+4 = 10$.

### Prim's Algorithm
1.  **Start at vertex A.** Initialize a priority queue (PQ) with edges from A.
    *   MST Vertices: {A}. PQ: [(A,B,1), (A,C,7), (A,D,10)].

2.  **Iteration 1:**
    *   Extract min from PQ: (A,B,1). B is not in MST.
    *   Add (A,B) to MST. Add B to MST Vertices.
    *   MST Vertices: {A,B}.
    *   Add B's edges to PQ: (B,C,5), (B,E,4).
    *   PQ: [(B,E,4), (B,C,5), (A,C,7), (A,D,10)]. (Note: (D,E,3) and (C,D,2) are not yet reachable).

3.  **Iteration 2:**
    *   Extract min from PQ: (B,E,4). E is not in MST.
    *   Add (B,E) to MST. Add E to MST Vertices.
    *   MST Vertices: {A,B,E}.
    *   Add E's edges to PQ: (E,D,3).
    *   PQ: [(E,D,3), (B,C,5), (A,C,7), (A,D,10)].

4.  **Iteration 3:**
    *   Extract min from PQ: (E,D,3). D is not in MST.
    *   Add (E,D) to MST. Add D to MST Vertices.
    *   MST Vertices: {A,B,E,D}.
    *   Add D's edges to PQ: (D,C,2).
    *   PQ: [(D,C,2), (B,C,5), (A,C,7), (A,D,10)]. Note that (A,D,10) is now obsolete as D is in the set, but a good PQ implementation handles this.

5.  **Iteration 4:**
    *   Extract min from PQ: (D,C,2). C is not in MST.
    *   Add (D,C) to MST. Add C to MST Vertices.
    *   MST Vertices: {A,B,E,D,C}. All vertices are included. We are done.

**Result (Prim):** Edges {(A,B), (B,E), (E,D), (D,C)}. Total weight = $1+4+3+2 = 10$.

**Reflection:** Both algorithms found an MST with total weight 10, but they built it differently. Kruskal's built disjoint pieces and connected them. Prim's grew a single tree like a crystal. The final set of edges is identical.

## Diagrams
A diagram of the example graph:
```text
      (7)
   A ----- C
 (1)| \   / |(2)
   B -- C -- D
 (4)|  /(5)  |(3)
   E ----- D
      (10) A to D edge is not shown for clarity, but exists.
```

Kruskal's algorithm progression:
```text
Step 1: Add (A,B,1)     Step 2: Add (C,D,2)     Step 3: Add (D,E,3)     Step 4: Add (B,E,4)
                                                                           (Final MST)
   A - B                   A - B                   A - B                     A - B
                                                                                     |
   C       D               C ----- D               C ----- D                 C ----- D
                                                             |                         |
   E                       E                       E -------´                  E -------´
```

## Memory technique — remember this forever
1.  **The Story:**
    *   **Kruskal is a thrifty Capitalist:** He sits in his office, looking at a list of all possible deals (edges) sorted by price. He buys the cheapest deal available, as long as it connects two previously separate company divisions (components) and doesn't create a redundant connection (cycle).
    *   **Prim is a meticulous Gardener:** She starts with a single seed (vertex) and carefully grows her tree. At every step, she looks at all the possible branches she could add (edges to outside vertices) and chooses the absolute shortest one to graft onto her existing tree.

2.  **Must Overlearn:**
    *   An MST on a graph with $|V|$ vertices has exactly $|V|-1$ edges.
    *   Kruskal's complexity: $O(E \log E)$ for sorting, or $O(E \log V)$ if you consider the Union-Find operations. The sort dominates.
    *   Prim's complexity: $O(E \log V)$ with a binary heap priority queue.

3.  **Spaced Repetition:** Review this material at **1 day, 3 days, 7 days, 16 days, 35 days**. On review days, redraw the example graph from memory and re-run both algorithms on paper.

4.  **First Principles Pathway:** If you forget everything, remember the **Cut Property**. To rebuild an MST algorithm: "At any point, I can partition the graph's vertices into 'done' and 'not done'. The cheapest edge crossing from 'done' to 'not done' is a safe choice." Prim's algorithm is the most direct implementation of this idea. Kruskal's is a cleverer, more global version of the same principle.

## Common mistakes
1.  **Forgetting to sort edges in Kruskal's.** The algorithm is meaningless if you don't process edges in non-decreasing order of weight.
2.  **Incorrect cycle detection in Kruskal's.** A simple check is not enough. You must use a formal method like Union-Find to correctly track which vertices belong to the same component.
3.  **Adding an edge to two "visited" nodes in Prim's.** Prim's only adds edges that connect a vertex inside the growing tree to a vertex *outside* of it. Adding an edge between two vertices already in the tree is wrong and will create a cycle.
4.  **Using Prim's on a disconnected graph.** Prim's algorithm finds the MST for the connected component of the starting vertex. If the graph is not connected, you must run it on each component. Kruskal's will naturally produce a minimum spanning forest.

## Self-check
1.  Given a graph where all edge weights are unique, is the MST also unique? Why or why not?
2.  Consider the graph from the worked example. What would the MST be if the weight of edge (B,C) was changed from 5 to 3? Trace both algorithms again. Do they produce the same result?
3.  How would you modify Kruskal's or Prim's algorithm to find a **Maximum** Spanning Tree (a spanning tree with the largest possible total edge weight)?