## 1. What it is — in plain English

Imagine you have a map with many cities and roads connecting them. Each road has a specific travel time or distance. You want to know the *shortest* way to get from *any* city to *any other* city on the map. Not just from one starting city, but from *every* possible starting city to *every* possible destination city.

The Floyd-Warshall algorithm is like a clever, systematic way to figure out all these shortest paths. It starts by only considering direct roads between cities. Then, it gradually improves its knowledge. It asks, "What if I could stop at just one other city on the way? Would that make my journey shorter?" It checks this for every single city as a potential stopover point, for every pair of start and end cities.

After checking all possible single stopovers, it then asks, "What if I could stop at *two* specific cities on the way?" and so on. It systematically considers every city as a potential "intermediate" point that could be part of a shorter path. By doing this for all cities, one by one, it eventually discovers the absolute shortest path between any two cities, even if that path involves many intermediate stops. It's a bit like continuously updating your mental map with better routes as you learn more about potential shortcuts.

## 2. Why it matters — real-world applications

The ability to find all-pairs shortest paths is fundamental in many computational problems.

1.  **GPS and Navigation Systems (e.g., Google Maps, Waze):** While often optimized with more complex algorithms for real-time queries, the core problem of finding the shortest path between any two locations is exactly what Floyd-Warshall addresses. Imagine needing to pre-calculate the shortest travel time between all major intersections in a city. Floyd-Warshall could populate a database with these values, allowing for quick lookups when a user requests a route.

2.  **Network Routing in Computer Networks:** When data packets traverse the internet or a local network, they need to find the most efficient path from source to destination. In smaller, stable networks, an all-pairs shortest path algorithm could be used to establish routing tables, ensuring that every node knows the optimal next hop to reach any other node in the network.

3.  **Logistics and Supply Chain Optimization:** Companies like Amazon or FedEx need to efficiently move goods between warehouses, distribution centers, and customer locations. If you have a network of depots and need to know the shortest (or cheapest) way to transport items between *any* two depots, Floyd-Warshall is applicable. This optimizes delivery routes, minimizes fuel costs, and speeds up delivery times across the entire network.

4.  **Computational Biology (e.g., Protein Folding):** In some models, the interactions between amino acids in a protein can be represented as a graph. Finding "shortest paths" (representing minimal energy configurations or interaction sequences) between different states or regions of the protein can provide insights into its structure and function. While highly complex, the underlying graph theory concepts, including all-pairs shortest paths, are relevant.

5.  **Urban Planning and Transportation Studies:** City planners might use this to analyze accessibility. For instance, calculating the shortest travel time or distance between every residential area and every public service (hospitals, schools, fire stations) can inform decisions about infrastructure development, emergency service placement, and public transit routes.

## 3. Prerequisites — what you must know first

To fully grasp the Floyd-Warshall algorithm, you should be comfortable with the following concepts:

*   **Graphs:** Understanding what a graph is (set of vertices/nodes and edges/links), directed vs. undirected graphs, and weighted graphs (edges have associated costs/distances).
*   **Graph Representation (Adjacency Matrix):** How to represent a graph using an adjacency matrix, where `matrix[i][j]` stores the weight of the edge from vertex `i` to vertex `j`.
*   **Shortest Path Problem:** The general idea of finding a path between two vertices such that the sum of the weights of its constituent edges is minimized.
*   **Dynamic Programming:** The algorithmic paradigm where a problem is broken down into smaller overlapping subproblems, and solutions to these subproblems are stored and reused to solve larger problems. This is crucial for understanding Floyd-Warshall's iterative nature.
*   **Asymptotic Notation (Big O):** How to analyze the time and space complexity of algorithms using Big O notation (e.g., $O(V^3)$, $O(V^2)$).
*   **Matrix Operations (Conceptual):** While not direct matrix multiplication, the iterative updates of the distance matrix in Floyd-Warshall bear a conceptual resemblance to how matrix operations build up results.

## 4. The core idea — step by step

The Floyd-Warshall algorithm is a classic example of dynamic programming. It systematically computes the shortest paths between all pairs of vertices in a graph by considering an increasing set of intermediate vertices.

### Step 1: Initializing the distance matrix

*   **Plain English:** Before we start finding any shortcuts, we need to know the direct connections. If there's a road directly from city A to city B, we note its distance. If there's no direct road, we assume the distance is "infinity" (meaning it's currently unreachable directly). The distance from a city to itself is always zero.
*   **Concrete Example:**
    Consider a graph with 3 vertices: 1, 2, 3.
    Edges: (1,2) with weight 3, (2,3) with weight 1. No direct edge from 1 to 3.
    The initial distance matrix $D^{(0)}$ would be:
    ```
        1   2   3
    1 [ 0   3  inf ]
    2 [inf  0   1  ]
    3 [inf inf  0  ]
    ```
*   **Formal/Mathematical Version:**
    Let $V$ be the number of vertices in the graph. We initialize a $V \times V$ distance matrix, $D^{(0)}$.
    For all $i, j \in \{1, \dots, V\}$:
    $$ D^{(0)}_{ij} = \begin{cases} w(i, j) & \text{if } (i, j) \text{ is an edge} \\ 0 & \text{if } i = j \\ \infty & \text{if } i \neq j \text{ and there is no edge } (i, j) \end{cases} $$
    Here, $w(i, j)$ is the weight of the edge from vertex $i$ to vertex $j$.
*   **What could go wrong:** Forgetting to set $D^{(0)}_{ii} = 0$ for all $i$. This is crucial because the path from a vertex to itself always has zero cost. Also, incorrectly using a large number instead of a symbolic $\infty$ can lead to issues if actual path weights exceed that number.

### Step 2: The "intermediate node" concept

*   **Plain English:** Now we start looking for shortcuts. We pick one city, let's say city K, and ask: "For *every* pair of cities (A, B), is it shorter to go directly from A to B, or to go from A to K and then from K to B?" We compare these two options and keep the shorter one.
*   **Concrete Example:**
    Continuing from Step 1's example, $D^{(0)}_{13} = \infty$.
    Let's consider vertex $k=2$ as a potential intermediate node.
    Can we find a shorter path from 1 to 3 via 2?
    Current $D^{(0)}_{13} = \infty$.
    Path via 2: $D^{(0)}_{12} + D^{(0)}_{23} = 3 + 1 = 4$.
    Since $4 < \infty$, the new shortest path from 1 to 3, considering 2 as an intermediate, is 4.
*   **Formal/Mathematical Version:**
    The core recurrence relation is:
    $$ D^{(k)}_{ij} = \min(D^{(k-1)}_{ij}, D^{(k-1)}_{ik} + D^{(k-1)}_{kj}) $$
    This means the shortest path from $i$ to $j$ using intermediate vertices from $\{1, \dots, k\}$ is either:
    1.  The shortest path from $i$ to $j$ using intermediate vertices from $\{1, \dots, k-1\}$ (i.e., not using $k$).
    2.  The shortest path from $i$ to $k$ using intermediate vertices from $\{1, \dots, k-1\}$ *plus* the shortest path from $k$ to $j$ using intermediate vertices from $\{1, \dots, k-1\}$ (i.e., using $k$ as an intermediate vertex).
*   **What could go wrong:** Misunderstanding the indices. $D^{(k-1)}_{ik}$ means the shortest path from $i$ to $k$ *without* using $k$ as an intermediate (since we're currently considering $k$). This is why the $k$ loop must be the outermost loop. Using $D^{(k)}_{ik}$ or $D^{(k)}_{kj}$ would be incorrect as it would imply using $k$ as an intermediate to find a path to $k$ or from $k$, which is not how the dynamic programming state is defined.

### Step 3: Iterating through intermediate nodes

*   **Plain English:** We don't just pick *one* intermediate city K. We have to try *every* city as a potential intermediate. So, we first update all paths considering city 1 as an intermediate, then we update all paths considering city 2 as an intermediate (using the paths we just found), then city 3, and so on, until we've considered every single city as a potential intermediate stop.
*   **Concrete Example:**
    The algorithm uses three nested loops:
    ```
    for k from 1 to V:          // k is the intermediate vertex
        for i from 1 to V:      // i is the source vertex
            for j from 1 to V:  // j is the destination vertex
                D[i][j] = min(D[i][j], D[i][k] + D[k][j])
    ```
    Notice that the $D[i][j]$ values are updated *in-place*. This is because when we calculate $D^{(k)}_{ij}$, we are using $D^{(k-1)}_{ik}$ and $D^{(k-1)}_{kj}$. If we overwrite $D[i][k]$ or $D[k][j]$ in the current $k$-iteration, we are effectively using $D^{(k)}_{ik}$ or $D^{(k)}_{kj}$ which means using $k$ as an intermediate to find a path to/from $k$, which is not what the recurrence is designed for. However, the in-place update works because $D[i][k]$ and $D[k][j]$ would have been computed in a previous $k$-iteration (or initialized as direct paths), and their values are stable for the current $k$.
*   **Formal/Mathematical Version:**
    The algorithm iterates $k$ from $1$ to $V$. For each $k$, it updates all $D_{ij}$ pairs.
    After $k$ iterations, $D^{(k)}_{ij}$ contains the shortest path from $i$ to $j$ that uses only intermediate vertices from the set $\{1, 2, \dots, k\}$.
    The final matrix $D^{(V)}$ will contain the shortest paths between all pairs of vertices.
*   **What could go wrong:** The order of the loops is critical. The $k$ loop *must* be the outermost loop. If $i$ or $j$ were outside $k$, the dynamic programming property would break, as the algorithm would not be considering the correct set of allowed intermediate vertices for the subproblems.

### Step 4: The dynamic programming recurrence

*   **Plain English:** The magic of this algorithm lies in how it builds up solutions. When we are considering node $k$ as an intermediate, we assume we already know the shortest paths between all pairs of nodes using *only* intermediate nodes from $\{1, 2, \dots, k-1\}$. With this assumption, we then try to see if using node $k$ as an *additional* intermediate node can shorten any of these paths. This means we're constantly improving our path estimates based on previous, smaller solutions.
*   **Concrete Example:**
    When we compute $D^{(k)}_{ij}$, we are using values from $D^{(k-1)}$. This means that the paths from $i$ to $k$ and from $k$ to $j$ (i.e., $D^{(k-1)}_{ik}$ and $D^{(k-1)}_{kj}$) are themselves shortest paths that *only* use intermediate vertices from $\{1, \dots, k-1\}$. This ensures we don't accidentally create paths that use $k$ as an intermediate *before* we're supposed to be considering $k$.
*   **Formal/Mathematical Version:**
    The recurrence $D^{(k)}_{ij} = \min(D^{(k-1)}_{ij}, D^{(k-1)}_{ik} + D^{(k-1)}_{kj})$ is the heart of the dynamic programming approach. It ensures that after $k$ iterations, $D^{(k)}_{ij}$ holds the shortest path from $i$ to $j$ where all intermediate vertices are drawn from the set $\{v_1, v_2, \dots, v_k\}$.
*   **What could go wrong:** Not fully internalizing why this recurrence correctly builds up the solution. It's not just "trying all paths"; it's systematically ensuring that at each step $k$, we've accounted for all paths that could use any of the first $k$ vertices as intermediates.

### Step 5: Handling negative cycles

*   **Plain English:** What if there's a loop in our map where going around the loop actually *reduces* your travel time? For instance, A to B costs 5, B to C costs 5, and C to A costs -12. If you go A -> B -> C -> A, you end up at A having "spent" -2. If you can make money by going around a loop, you can make infinite money by going around it infinitely. In shortest path problems, this means the "shortest path" becomes $-\infty$. Floyd-Warshall can detect these.
*   **Concrete Example:**
    If after all iterations ($k$ from 1 to $V$), we find that $D_{ii} < 0$ for any vertex $i$, it means there's a negative cycle reachable from $i$ and that $i$ itself is part of a negative cycle.
    For example, if $D_{11}$ ends up being -5, it means there's a path starting and ending at 1 with a total negative cost. This implies a negative cycle.
*   **Formal/Mathematical Version:**
    The Floyd-Warshall algorithm can detect the presence of negative cycles. If, after all $V$ iterations (i.e., after computing $D^{(V)}$), any diagonal element $D^{(V)}_{ii}$ is negative, then there is a negative-weight cycle in the graph. The algorithm does not work correctly in graphs with negative cycles if you're looking for *the* shortest path, as the path length can be arbitrarily small. However, it correctly identifies their presence.
*   **What could go wrong:** Not checking the diagonal elements of the final distance matrix for negative values. If a graph contains a negative cycle, the concept of a "shortest path" is ill-defined, and the algorithm's results for paths involving that cycle will be incorrect (they would tend towards $-\infty$).

## 5. Worked examples — multiple, with every step shown

We will use a small graph for clarity. Let's label vertices as 1, 2, 3, 4.

### Example 1: Simple 3-node graph with positive weights

**Problem:** Find all-pairs shortest paths for the following directed, weighted graph:
Vertices: {1, 2, 3}
Edges: (1,2) weight 3, (2,1) weight 2, (2,3) weight 1, (3,1) weight 4.

**What's given:** A directed, weighted graph.
**What we want:** The final distance matrix $D^{(3)}$ showing the shortest path between every pair of vertices.

**Step 1: Initialize $D^{(0)}$**
First, we create our initial distance matrix.
$D^{(0)}_{ij}$ is the direct edge weight from $i$ to $j$, 0 if $i=j$, and $\infty$ otherwise.

$$ D^{(0)} = \begin{pmatrix} 0 & 3 & \infty \\ 2 & 0 & 1 \\ 4 & \infty & 0 \end{pmatrix} $$

*   $D^{(0)}_{11}=0, D^{(0)}_{22}=0, D^{(0)}_{33}=0$ (Distance from a vertex to itself is 0).
*   $D^{(0)}_{12}=3$ (Direct edge 1->2 exists with weight 3).
*   $D^{(0)}_{21}=2$ (Direct edge 2->1 exists with weight 2).
*   $D^{(0)}_{23}=1$ (Direct edge 2->3 exists with weight 1).
*   $D^{(0)}_{31}=4$ (Direct edge 3->1 exists with weight 4).
*   All other entries are $\infty$ as there are no direct edges.

**Step 2: $k=1$ (Consider vertex 1 as an intermediate node)**
We update $D^{(1)}_{ij} = \min(D^{(0)}_{ij}, D^{(0)}_{i1} + D^{(0)}_{1j})$.

Let's go through each $(i, j)$ pair:

*   $D^{(1)}_{11} = \min(D^{(0)}_{11}, D^{(0)}_{11} + D^{(0)}_{11}) = \min(0, 0+0) = 0$
*   $D^{(1)}_{12} = \min(D^{(0)}_{12}, D^{(0)}_{11} + D^{(0)}_{12}) = \min(3, 0+3) = 3$
*   $D^{(1)}_{13} = \min(D^{(0)}_{13}, D^{(0)}_{11} + D^{(0)}_{13}) = \min(\infty, 0+\infty) = \infty$
*   $D^{(1)}_{21} = \min(D^{(0)}_{21}, D^{(0)}_{21} + D^{(0)}_{11}) = \min(2, 2+0) = 2$
*   $D^{(1)}_{22} = \min(D^{(0)}_{22}, D^{(0)}_{21} + D^{(0)}_{12}) = \min(0, 2+3) = \min(0, 5) = 0$ (Path 2->1->2 is 5, but 2->2 is 0)
*   $D^{(1)}_{23} = \min(D^{(0)}_{23}, D^{(0)}_{21} + D^{(0)}_{13}) = \min(1, 2+\infty) = 1$
*   $D^{(1)}_{31} = \min(D^{(0)}_{31}, D^{(0)}_{31} + D^{(0)}_{11}) = \min(4, 4+0) = 4$
*   $D^{(1)}_{32} = \min(D^{(0)}_{32}, D^{(0)}_{31} + D^{(0)}_{12}) = \min(\infty, 4+3) = \min(\infty, 7) = 7$ (Path 3->1->2 is 7, shorter than $\infty$)
*   $D^{(1)}_{33} = \min(D^{(0)}_{33}, D^{(0)}_{31} + D^{(0)}_{13}) = \min(0, 4+\infty) = 0$

$$ D^{(1)} = \begin{pmatrix} 0 & 3 & \infty \\ 2 & 0 & 1 \\ 4 & 7 & 0 \end{pmatrix} $$
*   We've updated $D_{32}$ from $\infty$ to 7 by considering path 3->1->2.

**Step 3: $k=2$ (Consider vertex 2 as an intermediate node)**
We update $D^{(2)}_{ij} = \min(D^{(1)}_{ij}, D^{(1)}_{i2} + D^{(1)}_{2j})$.

*   $D^{(2)}_{11} = \min(D^{(1)}_{11}, D^{(1)}_{12} + D^{(1)}_{21}) = \min(0, 3+2) = \min(0, 5) = 0$
*   $D^{(2)}_{12} = \min(D^{(1)}_{12}, D^{(1)}_{12} + D^{(1)}_{22}) = \min(3, 3+0) = 3$
*   $D^{(2)}_{13} = \min(D^{(1)}_{13}, D^{(1)}_{12} + D^{(1)}_{23}) = \min(\infty, 3+1) = \min(\infty, 4) = 4$ (Path 1->2->3 is 4, shorter than $\infty$)
*   $D^{(2)}_{21} = \min(D^{(1)}_{21}, D^{(1)}_{22} + D^{(1)}_{21}) = \min(2, 0+2) = 2$
*   $D^{(2)}_{22} = \min(D^{(1)}_{22}, D^{(1)}_{22} + D^{(1)}_{22}) = \min(0, 0+0) = 0$
*   $D^{(2)}_{23} = \min(D^{(1)}_{23}, D^{(1)}_{22} + D^{(1)}_{23}) = \min(1, 0+1) = 1$
*   $D^{(2)}_{31} = \min(D^{(1)}_{31}, D^{(1)}_{32} + D^{(1)}_{21}) = \min(4, 7+2) = \min(4, 9) = 4$
*   $D^{(2)}_{32} = \min(D^{(1)}_{32}, D^{(1)}_{32} + D^{(1)}_{22}) = \min(7, 7+0) = 7$
*   $D^{(2)}_{33} = \min(D^{(1)}_{33}, D^{(1)}_{32} + D^{(1)}_{23}) = \min(0, 7+1) = \min(0, 8) = 0$

$$ D^{(2)} = \begin{pmatrix} 0 & 3 & 4 \\ 2 & 0 & 1 \\ 4 & 7 & 0 \end{pmatrix} $$
*   We've updated $D_{13}$ from $\infty$ to 4 by considering path 1->2->3.

**Step 4: $k=3$ (Consider vertex 3 as an intermediate node)**
We update $D^{(3)}_{ij} = \min(D^{(2)}_{ij}, D^{(2)}_{i3} + D^{(2)}_{3j})$.

*   $D^{(3)}_{11} = \min(D^{(2)}_{11}, D^{(2)}_{13} + D^{(2)}_{31}) = \min(0, 4+4) = \min(0, 8) = 0$
*   $D^{(3)}_{12} = \min(D^{(2)}_{12}, D^{(2)}_{13} + D^{(2)}_{32}) = \min(3, 4+7) = \min(3, 11) = 3$
*   $D^{(3)}_{13} = \min(D^{(2)}_{13}, D^{(2)}_{13} + D^{(2)}_{33}) = \min(4, 4+0) = 4$
*   $D^{(3)}_{21} = \min(D^{(2)}_{21}, D^{(2)}_{23} + D^{(2)}_{31}) = \min(2, 1+4) = \min(2, 5) = 2$
*   $D^{(3)}_{22} = \min(D^{(2)}_{22}, D^{(2)}_{23} + D^{(2)}_{32}) = \min(0, 1+7) = \min(0, 8) = 0$
*   $D^{(3)}_{23} = \min(D^{(2)}_{23}, D^{(2)}_{23} + D^{(2)}_{33}) = \min(1, 1+0) = 1$
*   $D^{(3)}_{31} = \min(D^{(2)}_{31}, D^{(2)}_{33} + D^{(2)}_{31}) = \min(4, 0+4) = 4$
*   $D^{(3)}_{32} = \min(D^{(2)}_{32}, D^{(2)}_{33} + D^{(2)}_{32}) = \min(7, 0+7) = 7$
*   $D^{(3)}_{33} = \min(D^{(2)}_{33}, D^{(2)}_{33} + D^{(2)}_{33}) = \min(0, 0+0) = 0$

$$ \boxed{D^{(3)} = \begin{pmatrix} 0 & 3 & 4 \\ 2 & 0 & 1 \\ 4 & 7 & 0 \end{pmatrix}} $$

**Reflection:** All diagonal elements are 0, so no negative cycles. The final matrix shows the shortest path between all pairs. For example, the shortest path from 1 to 3 is 4 (via 2), and from 3 to 2 is 7 (via 1). This example was straightforward because all edge weights were positive, and no paths were significantly reduced in the last iteration.

---

### Example 2: 4-node graph with negative weights (no negative cycle)

**Problem:** Find all-pairs shortest paths for the following directed, weighted graph:
Vertices: {1, 2, 3, 4}
Edges: (1,2) weight -2, (2,3) weight 1, (3,4) weight 2, (4,1) weight -1. Also (1,4) weight 4.

**What's given:** A directed, weighted graph with negative edge weights.
**What we want:** The final distance matrix $D^{(4)}$ and to check for negative cycles.

**Step 1: Initialize $D^{(0)}$**

$$ D^{(0)} = \begin{pmatrix} 0 & -2 & \infty & 4 \\ \infty & 0 & 1 & \infty \\ \infty & \infty & 0 & 2 \\ -1 & \infty & \infty & 0 \end{pmatrix} $$

**Step 2: $k=1$ (Intermediate vertex 1)**
$D^{(1)}_{ij} = \min(D^{(0)}_{ij}, D^{(0)}_{i1} + D^{(0)}_{1j})$

*   $D^{(1)}_{24} = \min(D^{(0)}_{24}, D^{(0)}_{21} + D^{(0)}_{14}) = \min(\infty, \infty+4) = \infty$ (No path from 2 to 1)
*   $D^{(1)}_{32} = \min(D^{(0)}_{32}, D^{(0)}_{31} + D^{(0)}_{12}) = \min(\infty, \infty+(-2)) = \infty$ (No path from 3 to 1)
*   $D^{(1)}_{42} = \min(D^{(0)}_{42}, D^{(0)}_{41} + D^{(0)}_{12}) = \min(\infty, -1+(-2)) = \min(\infty, -3) = -3$ (Path 4->1->2, cost -3)
*   $D^{(1)}_{44} = \min(D^{(0)}_{44}, D^{(0)}_{41} + D^{(0)}_{14}) = \min(0, -1+4) = \min(0, 3) = 0$

$$ D^{(1)} = \begin{pmatrix} 0 & -2 & \infty & 4 \\ \infty & 0 & 1 & \infty \\ \infty & \infty & 0 & 2 \\ -1 & -3 & \infty & 0 \end{pmatrix} $$

**Step 3: $k=2$ (Intermediate vertex 2)**
$D^{(2)}_{ij} = \min(D^{(1)}_{ij}, D^{(1)}_{i2} + D^{(1)}_{2j})$

*   $D^{(2)}_{13} = \min(D^{(1)}_{13}, D^{(1)}_{12} + D^{(1)}_{23}) = \min(\infty, -2+1) = \min(\infty, -1) = -1$ (Path 1->2->3, cost -1)
*   $D^{(2)}_{43} = \min(D^{(1)}_{43}, D^{(1)}_{42} + D^{(1)}_{23}) = \min(\infty, -3+1) = \min(\infty, -2) = -2$ (Path 4->1->2->3, cost -2)

$$ D^{(2)} = \begin{pmatrix} 0 & -2 & -1 & 4 \\ \infty & 0 & 1 & \infty \\ \infty & \infty & 0 & 2 \\ -1 & -3 & -2 & 0 \end{pmatrix} $$

**Step 4: $k=3$ (Intermediate vertex 3)**
$D^{(3)}_{ij} = \min(D^{(2)}_{ij}, D^{(2)}_{i3} + D^{(2)}_{3j})$

*   $D^{(3)}_{14} = \min(D^{(2)}_{14}, D^{(2)}_{13} + D^{(2)}_{34}) = \min(4, -1+2) = \min(4, 1) = 1$ (Path 1->2->3->4, cost 1)
*   $D^{(3)}_{24} = \min(D^{(2)}_{24}, D^{(2)}_{23} + D^{(2)}_{34}) = \min(\infty, 1+2) = \min(\infty, 3) = 3$ (Path 2->3->4, cost 3)
*   $D^{(3)}_{44} = \min(D^{(2)}_{44}, D^{(2)}_{43} + D^{(2)}_{34}) = \min(0, -2+2) = \min(0, 0) = 0$

$$ D^{(3)} = \begin{pmatrix} 0 & -2 & -1 & 1 \\ \infty & 0 & 1 & 3 \\ \infty & \infty & 0 & 2 \\ -1 & -3 & -2 & 0 \end{pmatrix} $$

**Step 5: $k=4$ (Intermediate vertex 4)**
$D^{(4)}_{ij} = \min(D^{(3)}_{ij}, D^{(3)}_{i4} + D^{(3)}_{4j})$

*   $D^{(4)}_{11} = \min(D^{(3)}_{11}, D^{(3)}_{14} + D^{(3)}_{41}) = \min(0, 1+(-1)) = \min(0, 0) = 0$
*   $D^{(4)}_{12} = \min(D^{(3)}_{12}, D^{(3)}_{14} + D^{(3)}_{42}) = \min(-2, 1+(-3)) = \min(-2, -2) = -2$
*   $D^{(4)}_{13} = \min(D^{(3)}_{13}, D^{(3)}_{14} + D^{(3)}_{43}) = \min(-1, 1+(-2)) = \min(-1, -1) = -1$
*   $D^{(4)}_{21} = \min(D^{(3)}_{21}, D^{(3)}_{24} + D^{(3)}_{41}) = \min(\infty, 3+(-1)) = \min(\infty, 2) = 2$ (Path 2->3->4->1, cost 2)
*   $D^{(4)}_{22} = \min(D^{(3)}_{22}, D^{(3)}_{24} + D^{(3)}_{42}) = \min(0, 3+(-3)) = \min(0, 0) = 0$
*   $D^{(4)}_{23} = \min(D^{(3)}_{23}, D^{(3)}_{24} + D^{(3)}_{43}) = \min(1, 3+(-2)) = \min(1, 1) = 1$
*   $D^{(4)}_{31} = \min(D^{(3)}_{31}, D^{(3)}_{34} + D^{(3)}_{41}) = \min(\infty, 2+(-1)) = \min(\infty, 1) = 1$ (Path 3->4->1, cost 1)
*   $D^{(4)}_{32} = \min(D^{(3)}_{32}, D^{(3)}_{34} + D^{(3)}_{42}) = \min(\infty, 2+(-3)) = \min(\infty, -1) = -1$ (Path 3->4->1->2, cost -1)
*   $D^{(4)}_{33} = \min(D^{(3)}_{33}, D^{(3)}_{34} + D^{(3)}_{43}) = \min(0, 2+(-2)) = \min(0, 0) = 0$
*   $D^{(4)}_{41} = \min(D^{(3)}_{41}, D^{(3)}_{44} + D^{(3)}_{41}) = \min(-1, 0+(-1)) = -1$
*   $D^{(4)}_{42} = \min(D^{(3)}_{42}, D^{(3)}_{44} + D^{(3)}_{42}) = \min(-3, 0+(-3)) = -3$
*   $D^{(4)}_{43} = \min(D^{(3)}_{43}, D^{(3)}_{44} + D^{(3)}_{43}) = \min(-2, 0+(-2)) = -2$

$$ \boxed{D^{(4)} = \begin{pmatrix} 0 & -2 & -1 & 1 \\ 2 & 0 & 1 & 3 \\ 1 & -1 & 0 & 2 \\ -1 & -3 & -2 & 0 \end{pmatrix}} $$

**Reflection:** All diagonal elements are 0, which means there are no negative cycles. The algorithm correctly found shortest paths even with negative edge weights, as long as no negative cycles exist. For instance, path 3->2 is now -1 (3->4->1->2). This example shows the power of Floyd-Warshall in handling negative weights.

---

### Example 3: 3-node graph with a negative cycle

**Problem:** Find all-pairs shortest paths for the following directed, weighted graph:
Vertices: {1, 2, 3}
Edges: (1,2) weight 1, (2,3) weight 1, (3,1) weight -3.

**What's given:** A directed, weighted graph with a negative cycle.
**What we want:** The final distance matrix $D^{(3)}$ and to detect the negative cycle.

**Step 1: Initialize $D^{(0)}$**

$$ D^{(0)} = \begin{pmatrix} 0 & 1 & \infty \\ \infty & 0 & 1 \\ -3 & \infty & 0 \end{pmatrix} $$

**Step 2: $k=1$ (Intermediate vertex 1)**
$D^{(1)}_{ij} = \min(D^{(0)}_{ij}, D^{(0)}_{i1} + D^{(0)}_{1j})$

*   $D^{(1)}_{22} = \min(D^{(0)}_{22}, D^{(0)}_{21} + D^{(0)}_{12}) = \min(0, \infty+1) = 0$
*   $D^{(1)}_{32} = \min(D^{(0)}_{32}, D^{(0)}_{31} + D^{(0)}_{12}) = \min(\infty, -3+1) = \min(\infty, -2) = -2$ (Path 3->1->2, cost -2)
*   $D^{(1)}_{33} = \min(D^{(0)}_{33}, D^{(0)}_{31} + D^{(0)}_{13}) = \min(0, -3+\infty) = 0$

$$ D^{(1)} = \begin{pmatrix} 0 & 1 & \infty \\ \infty & 0 & 1 \\ -3 & -2 & 0 \end{pmatrix} $$

**Step 3: $k=2$ (Intermediate vertex 2)**
$D^{(2)}_{ij} = \min(D^{(1)}_{ij}, D^{(1)}_{i2} + D^{(1)}_{2j})$

*   $D^{(2)}_{13} = \min(D^{(1)}_{13}, D^{(1)}_{12} + D^{(1)}_{23}) = \min(\infty, 1+1) = \min(\infty, 2) = 2$ (Path 1->2->3, cost 2)
*   $D^{(2)}_{31} = \min(D^{(1)}_{31}, D^{(1)}_{32} + D^{(1)}_{21}) = \min(-3, -2+\infty) = -3$
*   $D^{(2)}_{33} = \min(D^{(1)}_{33}, D^{(1)}_{32} + D^{(1)}_{23}) = \min(0, -2+1) = \min(0, -1) = -1$ (Path 3->1->2->3, cost -1)

$$ D^{(2)} = \begin{pmatrix} 0 & 1 & 2 \\ \infty & 0 & 1 \\ -3 & -2 & -1 \end{pmatrix} $$
*   Notice $D^{(2)}_{33}$ became -1. This is a strong indicator of a negative cycle.

**Step 4: $k=3$ (Intermediate vertex 3)**
$D^{(3)}_{ij} = \min(D^{(2)}_{ij}, D^{(2)}_{i3} + D^{(2)}_{3j})$

*   $D^{(3)}_{11} = \min(D^{(2)}_{11}, D^{(2)}_{13} + D^{(2)}_{31}) = \min(0, 2+(-3)) = \min(0, -1) = -1$ (Path 1->2->3->1, cost -1)
*   $D^{(3)}_{12} = \min(D^{(2)}_{12}, D^{(2)}_{13} + D^{(2)}_{32}) = \min(1, 2+(-2)) = \min(1, 0) = 0$
*   $D^{(3)}_{21} = \min(D^{(2)}_{21}, D^{(2)}_{23} + D^{(2)}_{31}) = \min(\infty, 1+(-3)) = \min(\infty, -2) = -2$ (Path 2->3->1, cost -2)
*   $D^{(3)}_{22} = \min(D^{(2)}_{22}, D^{(2)}_{23} + D^{(2)}_{32}) = \min(0, 1+(-2)) = \min(0, -1) = -1$ (Path 2->3->1->2, cost -1)
*   $D^{(3)}_{31} = \min(D^{(2)}_{31}, D^{(2)}_{33} + D^{(2)}_{31}) = \min(-3, -1+(-3)) = \min(-3, -4) = -4$
*   $D^{(3)}_{32} = \min(D^{(2)}_{32}, D^{(2)}_{33} + D^{(2)}_{32}) = \min(-2, -1+(-2)) = \min(-2, -3) = -3$
*   $D^{(3)}_{33} = \min(D^{(2)}_{33}, D^{(2)}_{33} + D^{(2)}_{33}) = \min(-1, -1+(-1)) = \min(-1, -2) = -2$

$$ \boxed{D^{(3)} = \begin{pmatrix} -1 & 0 & 2 \\ -2 & -1 & 1 \\ -4 & -3 & -2 \end{pmatrix}} $$

**Reflection:**
After all iterations, we check the diagonal elements of $D^{(3)}$:
$D^{(3)}_{11} = -1$
$D^{(3)}_{22} = -1$
$D^{(3)}_{33} = -2$
Since all diagonal elements are negative, this indicates the presence of a negative cycle. Specifically, the cycle 1->2->3->1 has a total weight of $1+1+(-3) = -1$. Because of this, the "shortest path" between any two nodes that can reach or be reached from this cycle is undefined (can be arbitrarily negative). The algorithm correctly reports these negative values on the diagonal, signaling the issue.

---

### Example 4: A slightly larger 4-node graph, showing more updates

**Problem:** Find all-pairs shortest paths for the following directed, weighted graph:
Vertices: {1, 2, 3, 4}
Edges: (1,2) weight 5, (1,3) weight 10, (2,3) weight 3, (2,4) weight 2, (3,4) weight 1.

**What's given:** A directed, weighted graph with positive weights.
**What we want:** The final distance matrix $D^{(4)}$.

**Step 1: Initialize $D^{(0)}$**

$$ D^{(0)} = \begin{pmatrix} 0 & 5 & 10 & \infty \\ \infty & 0 & 3 & 2 \\ \infty & \infty & 0 & 1 \\ \infty & \infty & \infty & 0 \end{pmatrix} $$

**Step 2: $k=1$ (Intermediate vertex 1)**
$D^{(1)}_{ij} = \min(D^{(0)}_{ij}, D^{(0)}_{i1} + D^{(0)}_{1j})$

*   $D^{(1)}_{23} = \min(D^{(0)}_{23}, D^{(0)}_{21} + D^{(0)}_{13}) = \min(3, \infty+10) = 3$ (No change, as $D^{(0)}_{21}=\infty$)
*   $D^{(1)}_{24} = \min(D^{(0)}_{24}, D^{(0)}_{21} + D^{(0)}_{14}) = \min(2, \infty+\infty) = 2$
*   $D^{(1)}_{32} = \min(D^{(0)}_{32}, D^{(0)}_{31} + D^{(0)}_{12}) = \min(\infty, \infty+5) = \infty$

No paths are shortened through vertex 1 because no other vertex has an incoming edge from 1, except 2 and 3, and no other vertex has an outgoing edge to 1. Only paths *through* 1 can be affected.
The only relevant paths are $D_{i1} + D_{1j}$.
For $i=1$, $D_{11}+D_{1j}$ is $0+D_{1j}$, so $D_{1j}$ doesn't change.
For $j=1$, $D_{i1}+D_{11}$ is $D_{i1}+0$, so $D_{i1}$ doesn't change.
So, the only changes would occur for $i \neq 1$ and $j \neq 1$.
In this specific graph, $D^{(0)}_{i1}$ is $\infty$ for all $i \neq 1$.
So, $D^{(1)}$ remains the same as $D^{(0)}$.

$$ D^{(1)} = \begin{pmatrix} 0 & 5 & 10 & \infty \\ \infty & 0 & 3 & 2 \\ \infty & \infty & 0 & 1 \\ \infty & \infty & \infty & 0 \end{pmatrix} $$

**Step 3: $k=2$ (Intermediate vertex 2)**
$D^{(2)}_{ij} = \min(D^{(1)}_{ij}, D^{(1)}_{i2} + D^{(1)}_{2j})$

*   $D^{(2)}_{13} = \min(D^{(1)}_{13}, D^{(1)}_{12} + D^{(1)}_{23}) = \min(10, 5+3) = \min(10, 8) = 8$ (Path 1->2->3, cost 8, shorter than direct 10)
*   $D^{(2)}_{14} = \min(D^{(1)}_{14}, D^{(1)}_{12} + D^{(1)}_{24}) = \min(\infty, 5+2) = \min(\infty, 7) = 7$ (Path 1->2->4, cost 7)

$$ D^{(2)} = \begin{pmatrix} 0 & 5 & 8 & 7 \\ \infty & 0 & 3 & 2 \\ \infty & \infty & 0 & 1 \\ \infty & \infty & \infty & 0 \end{pmatrix} $$

**Step 4: $k=3$ (Intermediate vertex 3)**
$D^{(3)}_{ij} = \min(D^{(2)}_{ij}, D^{(2)}_{i3} + D^{(2)}_{3j})$

*   $D^{(3)}_{14} = \min(D^{(2)}_{14}, D^{(2)}_{13} + D^{(2)}_{34}) = \min(7, 8+1) = \min(7, 9) = 7$ (No change, path 1->2->4 is still 7, 1->2->3->4 is 9)
*   $D^{(3)}_{24} = \min(D^{(2)}_{24}, D^{(2)}_{23} + D^{(2)}_{34}) = \min(2, 3+1) = \min(2, 4) = 2$ (No change, direct 2->4 is 2, 2->3->4 is 4)

$$ D^{(3)} = \begin{pmatrix} 0 & 5 & 8 & 7 \\ \infty & 0 & 3 & 2 \\ \infty & \infty & 0 & 1 \\ \infty & \infty & \infty & 0 \end{pmatrix} $$

**Step 5: $k=4$ (Intermediate vertex 4)**
$D^{(4)}_{ij} = \min(D^{(3)}_{ij}, D^{(3)}_{i4} + D^{(3)}_{4j})$

Since $D^{(3)}_{i4}$ is $\infty$ for $i \in \{2,3\}$, and $D^{(3)}_{4j}$ is $\infty$ for $j \in \{1,2,3\}$, the only paths that could be affected are those involving $D^{(3)}_{14}$ or $D^{(3)}_{44}$.
*   $D^{(4)}_{11} = \min(D^{(3)}_{11}, D^{(3)}_{14} + D^{(3)}_{41}) = \min(0, 7+\infty) = 0$
*   $D^{(4)}_{12} = \min(D^{(3)}_{12}, D^{(3)}_{14} + D^{(3)}_{42}) = \min(5, 7+\infty) = 5$
*   $D^{(4)}_{13} = \min(D^{(3)}_{13}, D^{(3)}_{14} + D^{(3)}_{43}) = \min(8, 7+\infty) = 8$
*   $D^{(4)}_{14} = \min(D^{(3)}_{14}, D^{(3)}_{14} + D^{(3)}_{44}) = \min(7, 7+0) = 7$

No other $D_{ij}$ will change because $D_{i4}$ is $\infty$ for $i \in \{2,3\}$ and $D_{4j}$ is $\infty$ for $j \in \{1,2,3\}$.

$$ \boxed{D^{(4)} = \begin{pmatrix} 0 & 5 & 8 & 7 \\ \infty & 0 & 3 & 2 \\ \infty & \infty & 0 & 1 \\ \infty & \infty & \infty & 0 \end{pmatrix}} $$

**Reflection:** This example highlights that not every iteration of $k$ will necessarily change the matrix. Sometimes, the existing paths are already optimal given the allowed intermediate nodes. In this case, $k=1$ and $k=4$ didn't introduce any new shorter paths. The graph structure (sparse, mostly forward-moving) meant that intermediate nodes 1 and 4 weren't as effective in shortening paths for other pairs. All diagonal elements are 0, so no negative cycles.

## 6. Common mistakes and traps

1.  **Incorrect Initialization of the Distance Matrix:**
    *   **Trap:** Setting $D_{ii} = \infty$ instead of $0$, or using a very large number for $\infty$ that can accidentally be part of a path calculation.
    *   **Why it happens:** Forgetting that the distance from a node to itself is always zero, or not understanding the implications of using a fixed large number for "infinity." A path of $1000 + 1000 = 2000$ might be shorter than an initial "infinity" of $1500$ if infinity is represented by a fixed large number.
2.  **Incorrect Loop Order:**
    *   **Trap:** Swapping the order of the loops (e.g., `for i`, `for j`, `for k`).
    *   **Why it happens:** Not understanding the dynamic programming recurrence. The `k` loop *must* be outermost because $D^{(k)}_{ij}$ depends on $D^{(k-1)}_{ik}$ and $D^{(k-1)}_{kj}$, meaning that when we consider vertex $k$ as an intermediate, the paths to/from $k$ (i.e., $D_{ik}$ and $D_{kj}$) must *not* have used $k$ as an intermediate themselves. The outermost `k` loop ensures this by building up solutions incrementally.
3.  **Handling $\infty$ Values Incorrectly:**
    *   **Trap:** Performing arithmetic operations like `infinity + weight` and expecting `infinity`, but getting a numerical overflow or an incorrect finite value if $\infty$ is represented by a large integer.
    *   **Why it happens:** Not using a sufficiently large value for $\infty$ or not handling it symbolically. For example, `(MAX_INT / 2) + (MAX_INT / 2)` can overflow. Always ensure that `infinity + any_number = infinity` and `infinity + infinity = infinity`.
4.  **Not Detecting Negative Cycles:**
    *   **Trap:** Completing the algorithm and assuming the results are valid even if negative cycles exist.
    *   **Why it happens:** Forgetting to check the diagonal elements $D_{ii}$ for negative values after the algorithm completes. If $D_{ii} < 0$, a negative cycle exists, and the "shortest path" is undefined (can be arbitrarily negative).
5.  **Confusion with Single-Source Shortest Path Algorithms:**
    *   **Trap:** Trying to apply Floyd-Warshall's logic to a single-source problem or vice-versa, or comparing its performance directly to Dijkstra's without considering the problem type.
    *   **Why it happens:** Not clearly distinguishing between "all-pairs shortest paths" (Floyd-Warshall, Johnson's) and "single-source shortest paths" (Dijkstra's, Bellman-Ford). Floyd-Warshall is $O(V^3)$ for all pairs, while running Dijkstra $V$ times on a dense graph is $O(V \cdot E \log V)$ or $O(V^3)$ with adjacency matrix and min-priority queue, and Bellman-Ford $V$ times is $O(V \cdot V \cdot E)$ or $O(V^4)$. Floyd-Warshall is often simpler to implement for dense graphs.

## 7. Textbook-precise explanation

The Floyd-Warshall algorithm is a dynamic programming algorithm for finding shortest paths between all pairs of vertices in a directed, weighted graph. It works correctly for graphs with non-negative or negative edge weights, but it does not handle graphs with negative cycles (it can, however, detect their presence).

Let $G = (V, E)$ be a directed graph with $V = \{v_1, v_2, \dots, v_n\}$ vertices and edge weights $w(u, v)$ for each edge $(u, v) \in E$. We define the weight of a path $p = \langle v_1, v_2, \dots, v_k \rangle$ as $w(p) = \sum_{i=1}^{k-1} w(v_i, v_{i+1})$. The shortest path weight from vertex $i$ to vertex $j$, denoted $\delta(i, j)$, is the minimum weight of any path from $i$ to $j$. If no path exists, $\delta(i, j) = \infty$.

The algorithm maintains a $n \times n$ matrix $D^{(k)}$ for $k = 0, 1, \dots, n$.
Each entry $D^{(k)}_{ij}$ represents the shortest path weight from vertex $i$ to vertex $j$ such that all intermediate vertices on the path are chosen from the set $\{v_1, v_2, \dots, v_k\}$.

**Initialization ($k=0$):**
The matrix $D^{(0)}$ is initialized as follows:
$$ D^{(0)}_{ij} = \begin{cases} w(i, j) & \text{if } (i, j) \in E \\ 0 & \text{if } i = j \\ \infty & \text{if } (i, j) \notin E \text{ and } i \neq j \end{cases} $$
Here, $w(i, j)$ is the weight of the direct edge from $i$ to $j$. If no direct edge exists, $w(i, j) = \infty$.

**Recurrence Relation:**
For $k = 1, 2, \dots, n$, the matrix $D^{(k)}$ is computed from $D^{(k-1)}$ using the following recurrence:
$$ D^{(k)}_{ij} = \min(D^{(k-1)}_{ij}, D^{(k-1)}_{ik} + D^{(k-1)}_{kj}) $$
This recurrence implies that the shortest path from $i$ to $j$ using intermediate vertices from $\{v_1, \dots, v_k\}$ is either:
1.  The shortest path from $i$ to $j$ using intermediate vertices from $\{v_1, \dots, v_{k-1}\}$ (i.e., vertex $v_k$ is not an intermediate vertex on this path).
2.  The shortest path from $i$ to $v_k$ using intermediate vertices from $\{v_1, \dots, v_{k-1}\}$ followed by the shortest path from $v_k$ to $j$ using intermediate vertices from $\{v_1, \dots, v_{k-1}\}$ (i.e., vertex $v_k$ is an intermediate vertex on this path).

**Final Result:**
After $n$ iterations, the matrix $D^{(n)}$ contains the shortest path weights $\delta(i, j)$ for all pairs of vertices $(i, j)$.

**Negative Cycle Detection:**
If, at any point, $D^{(k)}_{ii} < 0$ for some vertex $i$, it indicates the presence of a negative-weight cycle involving vertex $i$. Specifically, after all $n$ iterations, if $D^{(n)}_{ii} < 0$ for any $i$, then a negative cycle exists in the graph. The algorithm's results for paths involving such cycles are not well-defined.

**Algorithm (Pseudocode):**
```
FLOYD-WARSHALL(W)
  n = W.rows
  D = W  // Initialize D with the adjacency matrix W (D_0)
  for k = 1 to n
    for i = 1 to n
      for j = 1 to n
        D[i,j] = min(D[i,j], D[i,k] + D[k,j])
  return D
```
(Where $W$ is the initial adjacency matrix, with $W_{ii}=0$ and $W_{ij}=\infty$ for non-edges).

**Time Complexity:**
The algorithm consists of three nested loops, each iterating $n$ times (where $n = |V|$). The operations inside the loops (comparison and addition) take constant time. Therefore, the total time complexity is $O(n^3)$ or $O(V^3)$.

**Space Complexity:**
The algorithm requires storing an $n \times n$ distance matrix. Thus, the space complexity is $O(n^2)$ or $O(V^2)$.

**Reference:**
Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. (Chapter 25, "All-Pairs Shortest Paths").

## 8. ASCII diagrams

Let's visualize a simple graph and how the intermediate node $k$ works.

Consider a 4-vertex graph:
```text
      (1) --5--> (2)
       ^         |
       |         | 2
       3         v
      (4) <--1-- (3)
```
Initial $D^{(0)}$ matrix (using $\infty$ for non-existent edges):
```text
D(0) matrix:
   1  2  3  4
1 [0  5  ∞  ∞]
2 [∞  0  2  ∞]
3 [∞  ∞  0  1]
4 [3  ∞  ∞  0]
```

Now, let's illustrate the concept for $k=1$ (vertex 1 as intermediate):
We're checking if path $i \to 1 \to j$ is shorter than $i \to j$.

Consider $D^{(1)}_{42}$:
Current $D^{(0)}_{42} = \infty$.
Path via 1: $D^{(0)}_{41} + D^{(0)}_{12} = 3 + 5 = 8$.
So, $D^{(1)}_{42} = \min(\infty, 8) = 8$. (Path 4 -> 1 -> 2)

```text
    (1) --5--> (2)
     ^         /|\
     |        / | \   (Path 4-1-2 now exists with cost 8)
     3       /  |  \
    (4) <---/---|-- (3)
         1  |   | 2
            |   |
            |   v
            ---(2)
```
*The diagram above tries to show the path 4-1-2. The original direct edges are 4->1 (cost 3) and 1->2 (cost 5). After $k=1$, the path 4->2 is updated to 8.*

Next, consider $k=2$ (vertex 2 as intermediate). We use the $D^{(1)}$ matrix.
Consider $D^{(2)}_{13}$:
Current $D^{(1)}_{13} = \infty$.
Path via 2: $D^{(1)}_{12} + D^{(1)}_{23} = 5 + 2 = 7$.
So, $D^{(2)}_{13} = \min(\infty, 7) = 7$. (Path 1 -> 2 -> 3)

```text
    (1) --5--> (2) --2--> (3)
     ^         |         /|\
     |         |        / | \   (Path 1-2-3 now exists with cost 7)
     3         |       /  |  \
    (4) <--1-- (3) <---/---|---(1)
         (This is a conceptual path, not a new edge on the original graph)
```
*The diagram shows the conceptual path 1-2-3. The path from 1 to 3 is now 7, calculated as 1->2 (cost 5) + 2->3 (cost 2).*

This iterative process continues, building up shorter paths by considering all possible intermediate vertices.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of the Floyd-Warshall algorithm as a "Triple-F" algorithm: **F**or **F**inding **F**astest paths (all pairs). Or, more accurately for the loops: **F**or **K** (intermediate), **F**or **I** (source), **F**or **J** (destination). The key is that **K** is always on the **OUTSIDE**.
    Visualize a 3D cube where each dimension is $V$ (number of vertices). You're iterating through every point $(i, j, k)$ in this cube. The *k* dimension is the "evolution" of your knowledge about shortest paths.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **The Recurrence Relation:** $D^{(k)}_{ij} = \min(D^{(k-1)}_{ij}, D^{(k-1)}_{ik} + D^{(k-1)}_{kj})$
    *   **The Loop Structure:**
        ```
        for k = 1 to V:
            for i = 1 to V:
                for j = 1 to V:
                    D[i][j] = min(D[i][j], D[i][k] + D[k][j])
        ```
    *   **Negative Cycle Detection:** After all iterations, if any $D_{ii} < 0$, a negative cycle exists.

3.  **