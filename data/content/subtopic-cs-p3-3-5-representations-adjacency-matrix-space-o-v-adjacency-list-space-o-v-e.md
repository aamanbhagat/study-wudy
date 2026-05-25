## What it is
A graph representation is a method for storing a graph's structure—its vertices and edges—in a computer's memory. The two most common representations are the adjacency matrix, a $V \times V$ grid indicating connections, and the adjacency list, an array where each entry stores a list of a vertex's neighbors. These representations encode the same connectivity information but have different performance characteristics.

## Why it matters
The choice of representation directly impacts the efficiency of graph algorithms. In aerospace, simulating airflow over a wing involves a mesh (a graph) where adjacency information is constantly queried; a fast lookup (matrix) might be critical. In machine learning, neural networks are graphs, and sparse representations (lists) are essential for handling models with billions of parameters without exhausting memory.

## When to study it
You must be comfortable with these prerequisites. If not, master them first.
1.  **Graph Theory Basics:** You must know the definitions of a vertex (node), edge, directed vs. undirected graph, and weighted vs. unweighted graph.
2.  **Big O Notation:** You must understand what $O(V^2)$ and $O(V+E)$ mean in terms of space and time complexity, where $V$ is the number of vertices and $E$ is the number of edges.
3.  **Core Data Structures:** You must have a working knowledge of 2D arrays (matrices) and linked lists (or dynamic arrays/vectors).

## How to study it (step by step)
1.  **Draw a simple graph.** On paper, draw an undirected, unweighted graph with 4 vertices labeled 0, 1, 2, 3 and edges (0,1), (0,2), (1,2), (2,3).
2.  **Build the matrix.** Create a $4 \times 4$ grid. For each edge $(u,v)$, place a 1 at `Matrix[u][v]` and `Matrix[v][u]`. Place 0s everywhere else. Observe the symmetry across the main diagonal. This is the adjacency matrix.
3.  **Build the list.** Create an array of 4 lists. For vertex 0, the list contains [1, 2]. For vertex 1, the list contains [0, 2]. Do this for all 4 vertices. This is the adjacency list.
4.  **Introduce direction.** Now, imagine the edges are directed: $0 \to 1$, $0 \to 2$, $1 \to 2$, $2 \to 3$. Rebuild the matrix. Notice it is no longer symmetric. `Matrix[0][1]` is 1, but `Matrix[1][0]` is 0. Rebuild the list representation accordingly.
5.  **Add weights.** Assign a weight to each directed edge, e.g., $0 \to 1$ (weight 5), $0 \to 2$ (weight 3). In the matrix, store the weight instead of 1. In the list, store pairs: for vertex 0, the list becomes [(1, 5), (2, 3)].
6.  **Analyze complexity.** Write pseudocode to check if an edge from vertex $u$ to $v$ exists. For the matrix, it's a single lookup: `return Matrix[u][v]`. This is $O(1)$. For the list, you must iterate through `List[u]` to see if $v$ is present. This is $O(\text{degree}(u))$, which in the worst case is $O(V)$.

## Key ideas, with intuition
1.  **Matrix is a Map.** An adjacency matrix is a complete, static map of all possible connections. The cell at row $i$ and column $j$ unconditionally answers the question: "Is there a direct path from $i$ to $j$?" This is extremely fast ($O(1)$) but requires you to store an answer for every possible pair of vertices, even if no path exists. This wastes space for graphs with few connections (sparse graphs).
    $$
    A_{ij} = \begin{cases} 1 & \text{if an edge exists from vertex } i \text{ to } j \\ 0 & \text{otherwise} \end{cases}
    $$
2.  **List is a set of Directions.** An adjacency list is a more dynamic structure. For each vertex $u$, you only keep a list of its direct neighbors. It's like asking for directions: instead of a full city map, you get a simple list of the streets connected to your current intersection. This is very space-efficient for sparse graphs but requires scanning the list ($O(\text{degree}(u))$) to check for a specific connection.
    $$
    \text{Adj}[u] = \{v \mid (u,v) \in E\}
    $$
3.  **Density is the Deciding Factor.** The core trade-off is between space and time, and the best choice depends on the graph's *density*, which is the ratio of actual edges $E$ to the maximum possible edges.
    *   **Dense Graph** ($E$ is close to $V^2$): The $O(V^2)$ space of a matrix is not wasteful, and its $O(1)$ edge lookup is a clear winner. Think of a fully connected network.
    *   **Sparse Graph** ($E$ is close to $V$): The $O(V^2)$ space of a matrix is mostly zeros. The $O(V+E)$ space of an adjacency list is far more efficient. Think of a road network where cities have only a few connecting roads.

## Worked example
Let's represent the following directed, weighted graph:
-   Vertices $V = \{A, B, C, D\}$ (which we'll map to indices 0, 1, 2, 3).
-   Edges $E = \{(A,B, 7), (A,D, 2), (B,C, 4), (C,A, 1), (D,B, 5)\}$.

**Step 1: Adjacency Matrix Construction**
We need a $4 \times 4$ matrix. We can initialize it with $0$ or $\infty$ to represent no path. Let's use $0$. The rows represent the source vertex and columns the destination.

-   Edge $(A,B, 7) \implies (\text{0,1,7}): Matrix[0][1] = 7$.
-   Edge $(A,D, 2) \implies (\text{0,3,2}): Matrix[0][3] = 2$.
-   Edge $(B,C, 4) \implies (\text{1,2,4}): Matrix[1][2] = 4$.
-   Edge $(C,A, 1) \implies (\text{2,0,1}): Matrix[2][0] = 1$.
-   Edge $(D,B, 5) \implies (\text{3,1,5}): Matrix[3][1] = 5$.

The final matrix is:
$$
A = \begin{pmatrix}
  & A & B & C & D \\
A & 0 & 7 & 0 & 2 \\
B & 0 & 0 & 4 & 0 \\
C & 1 & 0 & 0 & 0 \\
D & 0 & 5 & 0 & 0
\end{pmatrix}
$$

**Step 2: Adjacency List Construction**
We need an array of 4 lists, one for each vertex. Each list will store pairs of (destination, weight).

-   Vertex A (0): Is the source of edges to B(7) and D(2). List is `0: -> (1, 7) -> (3, 2)`.
-   Vertex B (1): Is the source of an edge to C(4). List is `1: -> (2, 4)`.
-   Vertex C (2): Is the source of an edge to A(1). List is `2: -> (0, 1)`.
-   Vertex D (3): Is the source of an edge to B(5). List is `3: -> (1, 5)`.

**Reflection:**
The matrix uses $4 \times 4 = 16$ cells to store 5 edges. Most of the matrix is empty (zeros), showing the space inefficiency for this sparse graph. The list stores exactly 5 pairs plus the 4 list heads, a total of $O(V+E) = O(4+5) = O(9)$ items, which is much more compact.

## Diagrams

```text
A simple directed graph:
(0) ----> (1)
 |         ^
 |         |
 v         |
(2) <---- (3)

Corresponding Adjacency Matrix:
  0 1 2 3
0|0 1 1 0|  (0 connects to 1 and 2)
1|0 0 0 0|
2|0 0 0 0|
3|0 1 1 0|  (3 connects to 1 and 2)

Corresponding Adjacency List:
0: -> 1 -> 2
1: ->
2: ->
3: -> 1 -> 2
```

## Memory technique — remember this forever
1.  **The Mnemonic:**
    *   **Matrix is a Metro Map:** A full grid showing every station (vertex). To see if there's a line between two stations, you just look at that intersection on the map—instant ($O(1)$). But the map itself is huge and mostly empty space ($O(V^2)$).
    *   **List is a Local Bus Schedule:** Posted at each bus stop (vertex), it only lists the *next* stops you can get to from *right there*. It's compact ($O(V+E)$), but to see if a bus goes to a specific far-away stop, you have to read the whole schedule for your stop ($O(\text{degree})$).

2.  **Must-Know Formulas:** Overlearn these until they are automatic.
    *   **Adjacency Matrix:** Space $O(V^2)$, Edge Query $O(1)$.
    *   **Adjacency List:** Space $O(V+E)$, Edge Query $O(\text{degree}(u))$.

3.  **Spaced Repetition Schedule:** Review this material at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Actively reconstruct the matrix and list for a sample graph from memory each time.

4.  **First Principles Pathway:** If you forget, re-derive.
    *   **Matrix:** "To represent all possible pairs of $V$ vertices, I need a $V \times V$ grid. That's $V^2$ cells. A lookup is just an array index."
    *   **List:** "I need a pointer for each of the $V$ vertices. Then, for every edge, I need to store it once (or twice for undirected). That's $V$ 'heads' and $E$ 'nodes'. Total space is proportional to $V+E$."

## Common mistakes
1.  **Undirected Edges:** For an undirected edge $(u,v)$, forgetting to update both `Matrix[u][v]` and `Matrix[v][u]` in the matrix, or forgetting to add $v$ to $u$'s list *and* $u$ to $v$'s list.
2.  **Confusing Density:** Blindly assuming a list is always better. For a dense graph where $E \approx V^2$, the space complexities become $O(V^2)$ for both, but the matrix's $O(1)$ edge check is far superior to the list's $O(V)$ check.
3.  **0- vs 1-Indexing:** In implementation, mixing up 0-indexed arrays with 1-indexed vertex labels from a problem description, leading to off-by-one errors. Always be consistent.

## Self-check
1.  Consider an unweighted, undirected graph representing a 5-person social circle where everyone is friends with everyone else (a complete graph $K_5$). Draw this graph and construct both its adjacency matrix and adjacency list.
2.  You are modeling the US interstate highway system. There are ~50,000 cities/intersections (vertices) but most are only connected to 2-4 others. If you have 8GB of RAM, which representation is feasible, and why? Justify with a rough calculation. (Assume an integer or pointer takes 8 bytes).
3.  An algorithm requires two frequent operations: (A) given a vertex $u$, iterate through all its neighbors, and (B) given two vertices $u$ and $v$, check for an edge in $O(1)$ time. Neither standard representation is ideal. Propose a hybrid data structure that provides optimal performance for both operations, and analyze its space complexity.