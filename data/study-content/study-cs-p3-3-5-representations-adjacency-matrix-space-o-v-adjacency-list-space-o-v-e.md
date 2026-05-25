## 1. What it is — in plain English

Imagine you have a group of friends, and some of them know each other. A "graph" in computer science is just a fancy way to draw this network: each friend is a "node" (or "vertex"), and a line connecting two friends means they know each other (this line is called an "edge").

Now, if you wanted to tell a computer about this network of friends and who knows whom, how would you do it? You can't just show it a drawing! You need a structured way to store this information. This is where "graph representations" come in. They are different ways to translate that drawing into data a computer can understand and work with.

We'll look at two main ways. The first is like using a big grid or a spreadsheet, called an "adjacency matrix." You list all your friends along the top row and down the first column. Then, if two friends know each other, you put a checkmark (or a 1) in the box where their row and column meet. If they don't, you leave it blank (or put a 0).

The second way is like giving each friend their own little address book, called an "adjacency list." For each friend, you simply list out all the other friends they know. So, if "Alice" knows "Bob" and "Charlie," her entry in the address book would just say "Bob, Charlie." This is often more compact, especially if most friends only know a few others.

Both methods store the exact same information about the network, but they organize it differently, which makes them better for different tasks or different kinds of networks. Understanding these differences is crucial for efficient programming.

## 2. Why it matters — real-world applications

Graph representations are fundamental because nearly any system involving relationships or connections can be modeled as a graph. How we store these graphs directly impacts the efficiency and performance of algorithms that operate on them.

1.  **Social Networks (e.g., Facebook, LinkedIn):** When you log into Facebook, the platform needs to quickly figure out who your friends are, who your friends' friends are, and suggest new connections. This vast network of billions of users and trillions of connections is a massive graph. An adjacency list is typically used here because each user (node) is connected to a relatively small fraction of all other users (edges are sparse). Efficiently finding paths (e.g., "friend of a friend") or communities relies heavily on how this graph is represented and traversed.

2.  **GPS and Navigation Systems (e.g., Google Maps, Waze):** The road network of a city or an entire continent is a classic graph problem. Intersections are nodes, and roads are edges. Edges often have "weights" representing distance, travel time, or traffic. When you ask for directions, the system needs to find the shortest path. Adjacency lists are often preferred for road networks because each intersection typically connects to only a few other intersections. For real-time traffic updates, the "weights" on these edges are constantly updated, and efficient representation allows for quick path recalculations. In aerospace, flight paths and air traffic control systems similarly model airports as nodes and flight routes as edges, with various constraints (fuel, capacity, time) acting as weights.

3.  **Circuit Design and Analysis (e.g., VLSI CAD tools):** In electrical engineering, complex integrated circuits (like the CPU in your computer) are essentially graphs. Each component (transistor, gate) can be a node, and the wires connecting them are edges. For very large-scale integration (VLSI) design, engineers need to analyze signal flow, identify critical paths, and ensure proper timing. The graph representation allows for simulating current flow, optimizing layout, and detecting potential bottlenecks or short circuits. Depending on the density of connections, either an adjacency matrix (for smaller, highly interconnected circuits) or an adjacency list (for larger, sparser designs) might be chosen.

4.  **Machine Learning and Data Science (e.g., Graph Neural Networks, Recommendation Systems):** Graphs are increasingly used in machine learning. For instance, in recommendation systems (like Netflix suggesting movies or Amazon suggesting products), users and items can be nodes, and interactions (watching, buying) can be edges. Graph representations are fed into Graph Neural Networks (GNNs) to learn patterns and make predictions. In physics, simulating particle interactions or molecular structures can also be modeled as graphs, where particles are nodes and forces/bonds are edges, allowing for complex simulations and predictions.

## 3. Prerequisites — what you must know first

Before diving deep into graph representations, ensure you have a solid grasp of these foundational concepts:

*   **Variables and Data Types:** Understanding how to store different kinds of information (numbers, text, booleans) in a program.
*   **Arrays (or Lists/Vectors):** Basic knowledge of ordered collections of elements, accessed by an index.
*   **Multidimensional Arrays (or Matrices):** Understanding arrays of arrays, typically used to represent grids or tables.
*   **Linked Lists:** Familiarity with dynamic data structures where elements (nodes) contain data and a reference (pointer) to the next element.
*   **Hash Maps (or Dictionaries/Associative Arrays):** Knowledge of data structures that map keys to values, allowing for fast lookups.
*   **Basic Graph Terminology:** What a graph ($G=(V, E)$), vertex/node, edge, directed graph, undirected graph, weighted graph, and unweighted graph mean.
*   **Big O Notation:** How to analyze the time and space complexity of algorithms, understanding concepts like $O(1)$, $O(N)$, $O(N^2)$, $O(N+M)$. This is crucial for understanding *why* one representation is better than another in certain scenarios.

If any of these terms are unfamiliar, pause here and review them. A strong foundation will make this lesson much clearer.

## 4. The core idea — step by step

The core idea is to translate the visual representation of a graph (nodes and lines) into a structured data format that a computer can store and manipulate. We'll explore two primary methods: the adjacency matrix and the adjacency list, building intuition step by step.

### Step 1: Understanding the Graph Basics

**Plain-English Statement:** A graph is a collection of points (nodes/vertices) and lines connecting some of these points (edges). These connections can be one-way or two-way, and can have "costs" or "weights."

**Small Concrete Example:** Imagine four cities: A, B, C, D. There's a road from A to B, B to C, and C to D. Also, a direct road from A to C. All roads are two-way and take the same amount of time.

**Formal/Mathematical Version:** A graph $G$ is formally defined as an ordered pair of sets $(V, E)$, where $V$ is the set of vertices (nodes) and $E$ is the set of edges (connections).
*   For an **undirected graph**, an edge is an unordered pair $\{u, v\}$ of vertices. This means if there's an edge from $u$ to $v$, there's also an edge from $v$ to $u$.
*   For a **directed graph** (or digraph), an edge is an ordered pair $(u, v)$ of vertices, indicating a connection *from* $u$ *to* $v$.
*   For a **weighted graph**, each edge $(u, v)$ has an associated numerical value $w(u, v) \in \mathbb{R}$, representing its "weight" or "cost."

**What Could Go Wrong:** Not clearly defining if the graph is directed or undirected, or if it's weighted. This ambiguity can lead to incorrect representations and algorithms.

### Step 2: Adjacency Matrix — The Grid Method

**Plain-English Statement:** An adjacency matrix is like a big square table where both the rows and columns are labeled with the names of your nodes. To show a connection, you put a '1' in the cell where a row and column meet if there's an edge between those two nodes. Otherwise, you put a '0'. If it's a weighted graph, you put the weight instead of '1'.

**Small Concrete Example:** Using our cities A, B, C, D:
Edges: (A,B), (B,C), (C,D), (A,C). All are two-way.
Let's assign numerical indices: A=0, B=1, C=2, D=3.

|   | A | B | C | D |
|---|---|---|---|---|
| A | 0 | 1 | 1 | 0 |
| B | 1 | 0 | 1 | 0 |
| C | 1 | 1 | 0 | 1 |
| D | 0 | 0 | 1 | 0 |

Notice that for an undirected graph, the matrix is symmetric across its main diagonal (e.g., A-B is 1, B-A is 1).

**Formal/Mathematical Version:** For a graph $G = (V, E)$ with $n = |V|$ vertices, an adjacency matrix $A$ is an $n \times n$ matrix where its entries $A_{ij}$ are defined as:
$$
A_{ij} = \begin{cases}
    1 & \text{if } (v_i, v_j) \in E \\
    0 & \text{otherwise}
\end{cases}
$$
For a **weighted graph**, $A_{ij}$ would store the weight $w(v_i, v_j)$ if an edge exists, and often $\infty$ (or a very large number) if no edge exists, or $0$ for self-loops (edges from a vertex to itself) if applicable.

**What Could Go Wrong:**
*   Forgetting that for an undirected graph, if $A_{ij} = 1$, then $A_{ji}$ must also be $1$.
*   Using 0 for "no edge" in a weighted graph where 0 could also be a valid edge weight. Using $\infty$ or a distinct "no edge" sentinel value is safer for weighted graphs.
*   Wasting a lot of space if the graph has very few connections (a "sparse" graph).

### Step 3: Adjacency List — The Address Book Method

**Plain-English Statement:** An adjacency list is a collection of lists, one for each node in the graph. For each node, its list contains all the other nodes it has a direct connection to.

**Small Concrete Example:** Using our cities A, B, C, D again:
Edges: (A,B), (B,C), (C,D), (A,C). All are two-way.
A=0, B=1, C=2, D=3.

*   A (0): [B (1), C (2)]
*   B (1): [A (0), C (2)]
*   C (2): [A (0), B (1), D (3)]
*   D (3): [C (2)]

**Formal/Mathematical Version:** For a graph $G = (V, E)$, an adjacency list representation consists of an array or hash map $Adj$ of $|V|$ lists, one for each vertex. For each vertex $u \in V$, the adjacency list $Adj[u]$ contains all vertices $v$ such that there is an edge $(u, v) \in E$.
*   For an **undirected graph**, if $\{u, v\} \in E$, then $v$ appears in $Adj[u]$ and $u$ appears in $Adj[v]$.
*   For a **directed graph**, if $(u, v) \in E$, then $v$ appears in $Adj[u]$, but $u$ does *not* necessarily appear in $Adj[v]$.
*   For a **weighted graph**, each element in the list would be a pair or object containing both the neighboring vertex and the weight of the edge to it (e.g., $(v, w(u,v))$).

**What Could Go Wrong:**
*   Forgetting to add the reverse edge for undirected graphs (i.e., if $u$ connects to $v$, $v$ must also connect to $u$).
*   If using a simple array of lists, accessing a vertex by name (e.g., "Alice") requires mapping it to an index first. Using a hash map for the outer structure can alleviate this.
*   Checking for an edge between two specific vertices can be slower than with an adjacency matrix, as you might need to iterate through a list.

### Step 4: Directed Graphs and Weighted Graphs

**Plain-English Statement:** Both representations can handle one-way connections (directed graphs) and connections with costs (weighted graphs).

**Small Concrete Example (Directed, Weighted):**
Cities A, B, C, D.
Edges:
*   A to B (cost 5)
*   B to C (cost 2)
*   C to D (cost 8)
*   A to C (cost 3)

**Adjacency Matrix:**

|   | A | B | C | D |
|---|---|---|---|---|
| A | 0 | 5 | 3 | $\infty$ |
| B | $\infty$ | 0 | 2 | $\infty$ |
| C | $\infty$ | $\infty$ | 0 | 8 |
| D | $\infty$ | $\infty$ | $\infty$ | 0 |

Here, $\infty$ represents no direct edge. We use 0 for self-loops (A to A, B to B, etc.) as their cost is typically 0.

**Adjacency List:**

*   A (0): [(B, 5), (C, 3)]
*   B (1): [(C, 2)]
*   C (2): [(D, 8)]
*   D (3): []

**What Could Go Wrong:**
*   In a directed graph, incorrectly adding a reverse edge in the adjacency list or making the matrix symmetric.
*   In a weighted graph, using '1' and '0' instead of actual weights or $\infty$ for non-existent edges.

### Step 5: Space Complexity — How Much Memory?

**Plain-English Statement:** "Space complexity" asks: how much memory does this representation need as the graph gets bigger? We measure this in terms of $V$ (number of vertices) and $E$ (number of edges).

**Formal/Mathematical Version:**
*   **Adjacency Matrix:**
    *   It's an $n \times n$ grid, where $n = |V|$.
    *   Each cell stores a single value (0, 1, or a weight).
    *   Total cells: $n \times n = n^2$.
    *   Therefore, the space complexity is $O(V^2)$.
*   **Adjacency List:**
    *   There are $|V|$ lists, one for each vertex.
    *   For an undirected graph, each edge $\{u, v\}$ appears twice: $v$ in $Adj[u]$ and $u$ in $Adj[v]$. So, the total number of elements across all lists is $2|E|$.
    *   For a directed graph, each edge $(u, v)$ appears once: $v$ in $Adj[u]$. So, the total number of elements across all lists is $|E|$.
    *   In both cases, we need space for the $|V|$ list headers (the array/map of lists) plus space for all the edge entries.
    *   Therefore, the space complexity is $O(V + E)$.

**What Could Go Wrong:**
*   Confusing $V$ and $E$ in the formulas.
*   Forgetting the $V$ term in $O(V+E)$ for the adjacency list (the space for the array of lists themselves).
*   Not understanding that $O(V^2)$ can be much larger than $O(V+E)$ for sparse graphs (where $E$ is much smaller than $V^2$). For a dense graph (where $E$ is close to $V^2$), $O(V+E)$ approaches $O(V^2)$.

### Step 6: Choosing the Right Representation

**Plain-English Statement:** Which representation you pick depends on your graph's characteristics and what operations you need to perform most often.

**Considerations:**
*   **Graph Density:**
    *   **Dense Graph:** Many edges ($E$ is close to $V^2$). Adjacency matrix might be fine, as $O(V^2)$ space is already close to $O(V+E)$. Edge lookup ($O(1)$) is very fast.
    *   **Sparse Graph:** Few edges ($E$ is much smaller than $V^2$). Adjacency list is usually better as $O(V+E)$ space is significantly less than $O(V^2)$.
*   **Common Operations:**
    *   **Checking if an edge exists between two specific vertices $(u, v)$:** Adjacency matrix is $O(1)$ (just look up $A[u][v]$). Adjacency list is $O(\text{degree}(u))$ in the worst case (have to scan $Adj[u]$).
    *   **Finding all neighbors of a vertex $u$:** Adjacency list is $O(\text{degree}(u))$. Adjacency matrix is $O(V)$ (have to scan row $u$).
    *   **Adding/removing an edge:** Adjacency matrix is $O(1)$. Adjacency list is $O(1)$ (if lists are dynamic and you have pointers) or $O(\text{degree}(u))$ (if you need to search and remove).
    *   **Adding/removing a vertex:** Both are generally expensive ($O(V^2)$ for matrix, $O(V+E)$ for list) as they often require restructuring the entire representation.

**What Could Go Wrong:**
*   Blindly picking one representation without considering the graph's properties or the algorithm's needs.
*   Underestimating the memory implications of $O(V^2)$ for large graphs. For $V=100,000$, $V^2 = 10^{10}$, which is impractical for memory.

## 5. Worked examples — multiple, with every step shown

We will work through four examples, covering different graph types and representations.

### Example 1: Undirected, Unweighted Graph to Adjacency Matrix

**Problem:** Given an undirected, unweighted graph with 4 vertices {0, 1, 2, 3} and the following edges: (0,1), (0,2), (1,2), (2,3). Represent this graph using an adjacency matrix.

**Given:**
*   Vertices $V = \{0, 1, 2, 3\}$
*   Edges $E = \{\{0,1\}, \{0,2\}, \{1,2\}, \{2,3\}\}$ (unordered pairs for undirected graph)
*   Graph is unweighted.

**Wanted:** An adjacency matrix $A$ of size $4 \times 4$.

**Step-by-step Solution:**

1.  **Initialize the matrix:** Create a $4 \times 4$ matrix, where all entries are initially 0. The rows and columns correspond to the vertices 0, 1, 2, 3.
    $$
    A = \begin{pmatrix}
    0 & 0 & 0 & 0 \\
    0 & 0 & 0 & 0 \\
    0 & 0 & 0 & 0 \\
    0 & 0 & 0 & 0
    \end{pmatrix}
    $$
    *Explanation: An $N \times N$ matrix is needed for $N$ vertices. We start with all zeros, indicating no connections initially.*

2.  **Process edge (0,1):** Since it's an undirected graph, an edge between 0 and 1 means both $A_{01}$ and $A_{10}$ should be 1.
    $$
    A = \begin{pmatrix}
    0 & \mathbf{1} & 0 & 0 \\
    \mathbf{1} & 0 & 0 & 0 \\
    0 & 0 & 0 & 0 \\
    0 & 0 & 0 & 0
    \end{pmatrix}
    $$
    *Explanation: For an undirected edge $\{u,v\}$, we set $A_{uv}=1$ and $A_{vu}=1$.*

3.  **Process edge (0,2):** Set $A_{02} = 1$ and $A_{20} = 1$.
    $$
    A = \begin{pmatrix}
    0 & 1 & \mathbf{1} & 0 \\
    1 & 0 & 0 & 0 \\
    \mathbf{1} & 0 & 0 & 0 \\
    0 & 0 & 0 & 0
    \end{pmatrix}
    $$
    *Explanation: Another undirected edge, update both symmetric positions.*

4.  **Process edge (1,2):** Set $A_{12} = 1$ and $A_{21} = 1$.
    $$
    A = \begin{pmatrix}
    0 & 1 & 1 & 0 \\
    1 & 0 & \mathbf{1} & 0 \\
    1 & \mathbf{1} & 0 & 0 \\
    0 & 0 & 0 & 0
    \end{pmatrix}
    $$
    *Explanation: Continue updating for the third edge.*

5.  **Process edge (2,3):** Set $A_{23} = 1$ and $A_{32} = 1$.
    $$
    A = \begin{pmatrix}
    0 & 1 & 1 & 0 \\
    1 & 0 & 1 & 0 \\
    1 & 1 & 0 & \mathbf{1} \\
    0 & 0 & \mathbf{1} & 0
    \end{pmatrix}
    $$
    *Explanation: Final edge processed, completing the matrix.*

**Final Answer:**
$$
\boxed{
A = \begin{pmatrix}
0 & 1 & 1 & 0 \\
1 & 0 & 1 & 0 \\
1 & 1 & 0 & 1 \\
0 & 0 & 1 & 0
\end{pmatrix}
}
$$
*Reflection:* This example was straightforward because the graph was small, unweighted, and undirected. The key was remembering to mark both $A_{ij}$ and $A_{ji}$ for each edge.

---

### Example 2: Undirected, Unweighted Graph to Adjacency List

**Problem:** Using the same graph from Example 1: an undirected, unweighted graph with 4 vertices {0, 1, 2, 3} and edges: (0,1), (0,2), (1,2), (2,3). Represent this graph using an adjacency list.

**Given:**
*   Vertices $V = \{0, 1, 2, 3\}$
*   Edges $E = \{\{0,1\}, \{0,2\}, \{1,2\}, \{2,3\}\}$
*   Graph is unweighted.

**Wanted:** An adjacency list representation.

**Step-by-step Solution:**

1.  **Initialize the adjacency lists:** Create an empty list for each vertex. We can use an array of lists, where the index corresponds to the vertex number.
    *   $Adj[0]$: []
    *   $Adj[1]$: []
    *   $Adj[2]$: []
    *   $Adj[3]$: []
    *Explanation: Each vertex needs its own list to store its neighbors. Initially, no vertex has any known neighbors.*

2.  **Process edge (0,1):** Since it's undirected, 0 is a neighbor of 1, and 1 is a neighbor of 0.
    *   $Adj[0]$: [1]
    *   $Adj[1]$: [0]
    *   $Adj[2]$: []
    *   $Adj[3]$: []
    *Explanation: For an undirected edge $\{u,v\}$, we add $v$ to $Adj[u]$ and $u$ to $Adj[v]$.*

3.  **Process edge (0,2):** Add 2 to $Adj[0]$ and 0 to $Adj[2]$.
    *   $Adj[0]$: [1, 2]
    *   $Adj[1]$: [0]
    *   $Adj[2]$: [0]
    *   $Adj[3]$: []
    *Explanation: We append new neighbors to the existing lists.*

4.  **Process edge (1,2):** Add 2 to $Adj[1]$ and 1 to $Adj[2]$.
    *   $Adj[0]$: [1, 2]
    *   $Adj[1]$: [0, 2]
    *   $Adj[2]$: [0, 1]
    *   $Adj[3]$: []
    *Explanation: Vertex 2 now has two neighbors (0 and 1) in its list.*

5.  **Process edge (2,3):** Add 3 to $Adj[2]$ and 2 to $Adj[3]$.
    *   $Adj[0]$: [1, 2]
    *   $Adj[1]$: [0, 2]
    *   $Adj[2]$: [0, 1, 3]
    *   $Adj[3]$: [2]
    *Explanation: All edges have been processed, and all neighbor lists are complete.*

**Final Answer:**
$$
\boxed{
\begin{aligned}
Adj[0] &: [1, 2] \\
Adj[1] &: [0, 2] \\
Adj[2] &: [0, 1, 3] \\
Adj[3] &: [2]
\end{aligned}
}
$$
*Reflection:* This example highlighted the dynamic nature of adjacency lists. Each list grows as neighbors are added. The order of neighbors within a list usually doesn't matter unless specified.

---

### Example 3: Directed, Weighted Graph to Adjacency Matrix

**Problem:** Given a directed, weighted graph with 3 vertices {A, B, C} and the following directed edges with their weights: (A,B, weight 4), (B,C, weight 2), (A,C, weight 7). Represent this graph using an adjacency matrix. Assume non-existent edges have a weight of $\infty$.

**Given:**
*   Vertices $V = \{A, B, C\}$. Let's map them to indices: A=0, B=1, C=2.
*   Directed, weighted edges:
    *   $(0,1)$ with weight 4
    *   $(1,2)$ with weight 2
    *   $(0,2)$ with weight 7
*   Non-existent edges are $\infty$.

**Wanted:** A $3 \times 3$ adjacency matrix $A$.

**Step-by-step Solution:**

1.  **Initialize the matrix:** Create a $3 \times 3$ matrix. For weighted graphs, it's common to initialize diagonal elements (self-loops) to 0 and all other elements to $\infty$ (representing no direct path).
    $$
    A = \begin{pmatrix}
    0 & \infty & \infty \\
    \infty & 0 & \infty \\
    \infty & \infty & 0
    \end{pmatrix}
    $$
    *Explanation: The $\infty$ indicates that there's no direct edge (or an infinitely costly one) between vertices. Diagonal elements are 0 because the cost to stay at a vertex is typically zero.*

2.  **Process edge (A,B, weight 4) or (0,1, weight 4):** Since it's a directed edge from 0 to 1, only $A_{01}$ is updated.
    $$
    A = \begin{pmatrix}
    0 & \mathbf{4} & \infty \\
    \infty & 0 & \infty \\
    \infty & \infty & 0
    \end{pmatrix}
    $$
    *Explanation: For a directed edge $(u,v)$ with weight $w$, we set $A_{uv}=w$. We do not set $A_{vu}$ because the edge is one-way.*

3.  **Process edge (B,C, weight 2) or (1,2, weight 2):** Update $A_{12}$.
    $$
    A = \begin{pmatrix}
    0 & 4 & \infty \\
    \infty & 0 & \mathbf{2} \\
    \infty & \infty & 0
    \end{pmatrix}
    $$
    *Explanation: Another directed edge, update only the specific cell.*

4.  **Process edge (A,C, weight 7) or (0,2, weight 7):** Update $A_{02}$.
    $$
    A = \begin{pmatrix}
    0 & 4 & \mathbf{7} \\
    \infty & 0 & 2 \\
    \infty & \infty & 0
    \end{pmatrix}
    $$
    *Explanation: All directed weighted edges have been processed.*

**Final Answer:**
$$
\boxed{
A = \begin{pmatrix}
0 & 4 & 7 \\
\infty & 0 & 2 \\
\infty & \infty & 0
\end{pmatrix}
}
$$
*Reflection:* The key here was understanding that for directed graphs, the matrix is generally *not* symmetric. Also, using $\infty$ for non-existent edges is crucial in weighted graphs to distinguish from an actual edge with weight 0.

---

### Example 4: Directed, Weighted Graph to Adjacency List

**Problem:** Using the same graph from Example 3: a directed, weighted graph with 3 vertices {A, B, C} and the following directed edges with their weights: (A,B, weight 4), (B,C, weight 2), (A,C, weight 7). Represent this graph using an adjacency list.

**Given:**
*   Vertices $V = \{A, B, C\}$. Let's map them to indices: A=0, B=1, C=2.
*   Directed, weighted edges:
    *   $(0,1)$ with weight 4
    *   $(1,2)$ with weight 2
    *   $(0,2)$ with weight 7

**Wanted:** An adjacency list representation.

**Step-by-step Solution:**

1.  **Initialize the adjacency lists:** Create an empty list for each vertex. Each element in these lists will be a pair (neighbor_vertex, edge_weight).
    *   $Adj[0]$: []
    *   $Adj[1]$: []
    *   $Adj[2]$: []
    *Explanation: We prepare empty lists for each vertex to store their outgoing directed edges.*

2.  **Process edge (A,B, weight 4) or (0,1, weight 4):** This is a directed edge from 0 to 1 with weight 4. Add the pair (1, 4) to $Adj[0]$.
    *   $Adj[0]$: [(1, 4)]
    *   $Adj[1]$: []
    *   $Adj[2]$: []
    *Explanation: For a directed edge $(u,v)$ with weight $w$, we add the pair $(v,w)$ to $Adj[u]$. We do not add anything to $Adj[v]$ because the edge is one-way.*

3.  **Process edge (B,C, weight 2) or (1,2, weight 2):** Add the pair (2, 2) to $Adj[1]$.
    *   $Adj[0]$: [(1, 4)]
    *   $Adj[1]$: [(2, 2)]
    *   $Adj[2]$: []
    *Explanation: Vertex 1 now has its outgoing edge to vertex 2 recorded.*

4.  **Process edge (A,C, weight 7) or (0,2, weight 7):** Add the pair (2, 7) to $Adj[0]$.
    *   $Adj[0]$: [(1, 4), (2, 7)]
    *   $Adj[1]$: [(2, 2)]
    *   $Adj[2]$: []
    *Explanation: Vertex 0 now has both its outgoing edges recorded.*

**Final Answer:**
$$
\boxed{
\begin{aligned}
Adj[0] &: [(1, 4), (2, 7)] \\
Adj[1] &: [(2, 2)] \\
Adj[2] &: []
\end{aligned}
}
$$
*Reflection:* This example reinforced the concept of directed edges and how weights are incorporated. Each entry in the adjacency list now contains both the destination vertex and the edge's weight. Vertex 2 has an empty list because no edges originate from it.

## 6. Common mistakes and traps

1.  **Confusing Directed vs. Undirected in Adjacency Matrix:** Forgetting to set $A_{ji}$ when $A_{ij}$ is set for an undirected graph, or conversely, setting $A_{ji}$ for a directed graph where no reverse edge exists. This leads to incorrect graph topology.
2.  **Incorrectly Handling Weights in Adjacency Matrix:** Using '0' to represent "no edge" in a weighted graph where '0' could be a valid edge weight. Always use a distinct sentinel value like $\infty$ (or `Integer.MAX_VALUE` in programming) for non-existent edges in weighted graphs.
3.  **Forgetting Reverse Edges in Adjacency List (Undirected):** For an undirected graph, if an edge exists between $u$ and $v$, $v$ must be in $Adj[u]$ *and* $u$ must be in $Adj[v]$. A common mistake is only adding $v$ to $Adj[u]$.
4.  **Miscalculating Space Complexity:** Confusing $V$ and $E$ or forgetting the $V$ component in $O(V+E)$ (for the array of lists themselves) for adjacency lists. Also, not understanding the practical implications of $O(V^2)$ for large $V$.
5.  **Choosing the Wrong Representation:** Picking an adjacency matrix for a very large, sparse graph (e.g., social network) leads to massive memory waste. Conversely, using an adjacency list when frequent $O(1)$ edge existence checks are needed might lead to slower performance.
6.  **Off-by-One Errors with 0-indexing:** When mapping vertex names to array indices (e.g., A, B, C to 0, 1, 2), ensuring consistent 0-indexing throughout the representation process.

## 7. Textbook-precise explanation

A graph $G$ is an ordered pair $(V, E)$, where $V$ is a finite set of vertices and $E$ is a finite set of edges. The number of vertices is denoted by $n = |V|$ and the number of edges by $m = |E|$.

**Adjacency Matrix Representation:**
For a graph $G = (V, E)$ with $n$ vertices, let $V = \{v_1, v_2, \dots, v_n\}$. The adjacency matrix $A$ is an $n \times n$ matrix where its entries $A_{ij}$ are defined as follows:

*   **For an unweighted graph:**
    $$
    A_{ij} = \begin{cases}
    1 & \text{if } (v_i, v_j) \in E \\
    0 & \text{otherwise}
    \end{cases}
    $$
    For an **undirected graph**, the matrix $A$ is symmetric, meaning $A_{ij} = A_{ji}$ for all $i, j$.
    For a **directed graph**, $A_{ij} = 1$ indicates an edge from $v_i$ to $v_j$, and $A_{ji}$ is independent of $A_{ij}$.

*   **For a weighted graph:**
    $$
    A_{ij} = \begin{cases}
    w(v_i, v_j) & \text{if } (v_i, v_j) \in E \\
    0 & \text{if } i = j \text{ (for self-loops, if allowed)} \\
    \infty & \text{otherwise (no edge)}
    \end{cases}
    $$
    Here, $w(v_i, v_j)$ is the weight of the edge from $v_i$ to $v_j$. The value $\infty$ (or a sufficiently large number representing positive infinity) is used to denote the absence of an edge to distinguish it from an edge with weight 0.

The space complexity for an adjacency matrix is $\Theta(V^2)$ because it requires $n^2$ storage locations, regardless of the number of edges.
*Reference: Cormen, Leiserson, Rivest, and Stein, *Introduction to Algorithms*, 4th Edition, §22.1.*

**Adjacency List Representation:**
For a graph $G = (V, E)$, the adjacency list representation consists of an array $Adj$ of $|V|$ lists, one for each vertex $u \in V$. Each list $Adj[u]$ contains all vertices $v$ such that there is an edge $(u, v) \in E$.

*   **For an unweighted graph:**
    *   For each vertex $u \in V$, $Adj[u]$ is a list of vertices that are adjacent to $u$.
    *   If $G$ is **undirected**, then $v \in Adj[u]$ if and only if $u \in Adj[v]$.
    *   If $G$ is **directed**, then $v \in Adj[u]$ implies an edge from $u$ to $v$.

*   **For a weighted graph:**
    *   Each element in $Adj[u]$ is typically a pair or object $(v, w(u, v))$, where $v$ is an adjacent vertex and $w(u, v)$ is the weight of the edge $(u, v)$.

The space complexity for an adjacency list representation is $\Theta(V+E)$. This is because there are $|V|$ lists (requiring $\Theta(V)$ space for the list headers) and the total number of elements in all lists is $|E|$ for a directed graph, or $2|E|$ for an undirected graph (since each edge is stored twice). In both cases, this sums to $\Theta(V+E)$.
*Reference: Cormen, Leiserson, Rivest, and Stein, *Introduction to Algorithms*, 4th Edition, §22.1.*

## 8. ASCII diagrams

Let's consider a simple undirected, unweighted graph with 4 vertices: A, B, C, D and edges (A,B), (A,C), (B,C), (C,D).

```text
Graph G:

    A --- B
    |   /
    |  /
    | /
    C --- D

Vertices: {A, B, C, D}
Edges: {(A,B), (A,C), (B,C), (C,D)}
```

**Adjacency Matrix Representation (using 0-indexed A=0, B=1, C=2, D=3):**

```text
Matrix A (4x4):

    0 1 2 3
  +---------
0 | 0 1 1 0   <-- Vertex A
1 | 1 0 1 0   <-- Vertex B
2 | 1 1 0 1   <-- Vertex C
3 | 0 0 1 0   <-- Vertex D
```
*Description of Matrix:*
- Rows and columns are labeled by vertex indices (0, 1, 2, 3).
- $A[0][1]=1$ because there's an edge between A (0) and B (1). Symmetrically, $A[1][0]=1$.
- $A[0][2]=1$ because there's an edge between A (0) and C (2). Symmetrically, $A[2][0]=1$.
- $A[1][2]=1$ because there's an edge between B (1) and C (2). Symmetrically, $A[2][1]=1$.
- $A[2][3]=1$ because there's an edge between C (2) and D (3). Symmetrically, $A[3][2]=1$.
- All other non-diagonal entries are 0, indicating no direct edge. Diagonal entries are 0 as there are no self-loops.

**Adjacency List Representation (using 0-indexed A=0, B=1, C=2, D=3):**

```text
Adjacency List Adj:

Adj[0] (A): [1, 2]
Adj[1] (B): [0, 2]
Adj[2] (C): [0, 1, 3]
Adj[3] (D): [2]
```
*Description of Adjacency List:*
- Each line starts with a vertex index (0, 1, 2, 3) representing the source vertex.
- Following the colon is a list of its directly connected neighbors.
- For vertex A (0), its neighbors are B (1) and C (2).
- For vertex B (1), its neighbors are A (0) and C (2).
- For vertex C (2), its neighbors are A (0), B (1), and D (3).
- For vertex D (3), its only neighbor is C (2).

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    *   **Adjacency Matrix:** Think of a **M**atrix as a **M**ap or a **M**onumental grid. It's a fixed, square block of memory. To check if two nodes are connected, you just point to their intersection on the map – it's an immediate lookup, like finding a street on a grid.
    *   **Adjacency List:** Think of an **L**ist as a **L**ibrary of individual address books, one for each node. Each node has its own small book listing only *its direct friends*. To check if two nodes are connected, you have to open one node's book and scan through its friends. If a node has few friends, its book is small; if it has many, its book is long.

2.  **1-3 Formulas/Facts They MUST Overlearn:**
    *   **Adjacency Matrix Space:** $O(V^2)$
    *   **Adjacency List Space:** $O(V+E)$
    *   **Edge Existence Check:** Matrix $O(1)$, List $O(\text{degree}(u))$

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this lesson, understand all concepts, and try to re-derive the space complexities.
    *   **Day 3:** Briefly review the definitions of matrix and list, their space complexities, and the trade-offs (dense/sparse).
    *   **Day 7:** Redo one example of each type (matrix/list, directed/undirected). Focus on why each choice was made.
    *   **Day 16:** Explain both representations and their implications (space, time for common ops) aloud without notes.
    *   **Day 35:** Given a problem description, decide which representation is best and justify why.

4.  **First-Principles Re-derivation Pathway:**
    *   **For Adjacency Matrix ($O(V^2)$):**
        1.  How many vertices are there? Let it be $V$.
        2.  An adjacency matrix is a square grid where rows and columns represent vertices.
        3.  So, it has $V$ rows and $V$ columns.
        4.  The total number of cells in this grid is $V \times V = V^2$.
        5.  Each cell stores a constant amount of information (a 0, a 1, or a weight).
        6.  Therefore, the total memory required grows proportionally to $V^2$, which is $O(V^2)$. This holds true regardless of how many edges are actually present.
    *   **For Adjacency List ($O(V+E)$):**
        1.  How many vertices are there? Let it be $V$.
        2.  How many edges are there? Let it be $E$.
        3.  We need an array (or hash map) to hold the "head" of each vertex's list. This array has $V$ entries. So, this part takes $O(V)$ space.
        4.  Each edge $(u, v)$ needs to be stored.
            *   If directed: Each edge $(u,v)$ is stored once (as $v$ in $Adj[u]$). So, $E$ total entries.
            *   If undirected: Each edge $\{u,v\}$ is stored twice (as $v$ in $Adj[u]$ and $u$ in $Adj[v]$). So, $2E$ total entries.
        5.  In both cases, the total number of edge entries is proportional to $E$. So, this part takes $O(E)$ space.
        6.  Combining the space for the list headers and the edge entries, the total memory required grows proportionally to $V+E$, which is $O(V+E)$.

## 10. Connections — what this leads to

Understanding graph representations is not just an academic exercise; it's the bedrock upon which almost all graph algorithms are built. Mastery of these representations unlocks a vast array of advanced topics in computer science:

1.  **Graph Traversal Algorithms (BFS and DFS):** Breadth-First Search (BFS) and Depth-First Search (DFS) are fundamental algorithms for exploring graphs. They depend directly on efficiently accessing a vertex's neighbors, which is provided by both adjacency matrices (by scanning a row/column) and adjacency lists (by iterating through a list). Adjacency lists are often preferred for these traversals on sparse graphs due to their $O(V+E)$ time complexity.

2.  **Shortest Path Algorithms (Dijkstra's, Bellman-Ford, Floyd-Warshall):** Finding the shortest path between two nodes in a weighted graph is a critical problem.
    *   Algorithms like Dijkstra's and Bellman-Ford typically use adjacency lists combined with priority queues for efficiency, as they need to iterate through neighbors.
    *   The Floyd-Warshall algorithm, which finds all-pairs shortest paths, is more naturally implemented using an adjacency matrix due to its dynamic programming approach and $O(V^3)$ time complexity, where $O(1)$ edge lookups are beneficial.

3.  **Minimum Spanning Tree Algorithms (Prim's, Kruskal's):** These algorithms find a subset of edges that connect all vertices with the minimum total edge weight. They also rely on efficiently querying edges and neighbors, making adjacency lists a common choice, especially when combined with data structures like disjoint sets (for Kruskal's) or priority queues (for Prim's).

4.  **Network Flow Algorithms (Ford-Fulkerson, Edmonds-Karp):** These algorithms deal with finding the maximum flow in a network from a source to a sink. They require representations that can handle capacities on edges and efficiently find augmenting paths. Adjacency lists are typically used to represent the residual graph in these algorithms.

5.  **Topological Sort:** For directed acyclic graphs (DAGs), topological sort orders vertices such that for every directed edge $(u, v)$, $u$ comes before $v$. This is often implemented using DFS and relies on the adjacency list to explore neighbors.

6.  **Strongly Connected Components (SCCs):** Algorithms like Tarjan's or Kosaraju's for finding SCCs in directed graphs heavily utilize DFS and require efficient access to both outgoing and incoming edges (sometimes requiring a "transpose" graph, which is easier with adjacency lists).

7.  **Graph Data Structures Beyond Basic Representations:** This topic lays the groundwork for more advanced graph data structures like implicit graphs, compressed sparse row (CSR) or compressed sparse column (CSC) formats for very large sparse graphs, or specialized structures for specific graph types (e.g., trees, planar graphs).

## 11. Self-check questions

1.  Consider a complete undirected graph $K_N$ with $N$ vertices (meaning every vertex is connected to every other vertex). What is the exact number of edges $E$ in terms of $N$? Based on this, analyze the space complexity of representing $K_N$ using both an adjacency matrix and an adjacency list, and determine which representation is more space-efficient in this specific scenario.
2.  You are designing a system to manage a city's one-way street network for a ride-sharing service. The city has 10,000 intersections and 15,000 one-way streets. Each street has a travel time associated with it. Which graph representation (adjacency matrix or adjacency list) would you choose, and why? Justify your answer by discussing both space and time complexity for common operations like finding all streets originating from an intersection and checking if a direct street exists between two specific intersections.
3.  Describe how you would modify both the adjacency matrix and adjacency list representations to handle a graph where edges can have multiple attributes (e.g., for a road network: distance, average speed, number of lanes, toll cost). Provide a small example for each representation.
4.  A graph has $V$ vertices and $E$ edges. An algorithm needs to frequently check if an edge $(u, v)$ exists, and also needs to iterate through all neighbors of a given vertex $u$. Assume the graph is very sparse ($E \ll V^2$). Compare the time complexity of these two operations for both adjacency matrix and adjacency list representations. Based on this, explain the trade-offs and when you might still choose the less space-efficient option.
5.  Imagine a graph where vertices represent different quantum states of a system, and a directed, weighted edge from state A to state B with weight $w$ signifies a quantum transition from A to B with an energy change of $w$. The system can have up to $10^6$ states, but each state can only transition to at most 5 other states. Discuss the implications of choosing an adjacency matrix versus an adjacency list for representing this system in terms of memory usage and typical operation efficiency (e.g., finding possible next states from a given state).