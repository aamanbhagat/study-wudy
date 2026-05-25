## 1. What it is — in plain English

Imagine a city with a network of water pipes. Some pipes are wide, allowing a lot of water to pass through, while others are narrow and restrict the flow. You have a giant reservoir (the "source") at one end of the city and a thirsty town (the "sink") at the other. Your goal is to figure out the absolute maximum amount of water you can send from the reservoir to the town through this entire network of pipes.

This is the essence of "network flow." We're dealing with a graph where nodes are intersections or junctions, and edges are pipes or roads, each with a specific "capacity" – the maximum amount of "stuff" (water, cars, data packets) that can pass through it per unit of time.

The "max-flow min-cut theorem" is a powerful idea that says the maximum amount of stuff you can push through the network is always equal to the capacity of the smallest "bottleneck" you can find. Imagine cutting across the network with a giant pair of scissors; the minimum capacity of such a cut that completely separates the source from the sink tells you the maximum flow.

"Ford-Fulkerson" and "Edmonds-Karp" are algorithms, like detailed instruction manuals, that tell us how to actually find this maximum flow. They work by repeatedly finding paths from the source to the sink that still have some available capacity, sending more "stuff" along those paths, and updating the network until no more stuff can be sent.

## 2. Why it matters — real-world applications

Network flow problems and their solutions are fundamental in many areas due to their ability to model resource allocation and movement constraints.

1.  **Logistics and Supply Chain Management:** Companies like **FedEx** or **Amazon** use network flow concepts to optimize the delivery of packages. The nodes could be distribution centers or cities, and edges could be routes with capacities representing the maximum number of packages a truck or plane can carry. Max-flow helps determine the maximum throughput of packages from a source (e.g., a manufacturing plant) to a sink (e.g., a customer's location) or across an entire distribution network, minimizing delays and maximizing efficiency.

2.  **Telecommunications and Data Routing:** The internet itself is a massive network. When you send an email or stream a video, data packets travel through various routers and cables. Each cable or wireless link has a maximum bandwidth (capacity). Network flow algorithms can be used by **ISPs (Internet Service Providers)** to determine the maximum data throughput between two points, identify bottlenecks in the network, and optimize routing to ensure efficient data transmission and prevent congestion. This is crucial for maintaining quality of service.

3.  **Image Segmentation in Computer Vision:** In machine learning and computer vision, especially for tasks like medical image analysis or object recognition, network flow (specifically, min-cut) is used for image segmentation. An image can be represented as a graph where pixels are nodes. Edges connect adjacent pixels, and their capacities reflect how "similar" the pixels are or how likely they are to belong to the same object. By finding a min-cut in this graph, the image can be partitioned into a foreground (e.g., a tumor) and a background, effectively segmenting the object of interest. This technique is used in **medical imaging software** to delineate organs or anomalies.

4.  **Project Management and Scheduling:** While not a direct max-flow application, the related concept of critical path analysis in project management (e.g., for **aerospace projects like building a new rocket by SpaceX or NASA**) can be modeled with network flow ideas. Tasks are nodes, and dependencies are edges. Capacities might represent resources or time. Although typically solved with other methods, understanding network flow helps grasp the underlying principles of resource allocation and bottleneck identification in complex project networks.

## 3. Prerequisites — what you must know first

Before diving deep into network flow, ensure you have a solid grasp of these fundamental concepts:

*   **Graphs:** Understanding what a graph is (set of vertices/nodes $V$ and edges $E$), directed vs. undirected graphs, and basic graph terminology (path, cycle, degree).
*   **Graph Representations:** How graphs are stored in memory, primarily adjacency lists and adjacency matrices, and their respective pros and cons.
*   **Breadth-First Search (BFS):** An algorithm for traversing or searching graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. It's crucial for Edmonds-Karp.
*   **Depth-First Search (DFS):** Another algorithm for traversing or searching graph data structures. It starts at the root (or some arbitrary node) and explores as far as possible along each branch before backtracking. It can be used in the general Ford-Fulkerson method.
*   **Paths and Cycles:** The definition of a path (a sequence of distinct vertices where each adjacent pair is connected by an edge) and a cycle (a path that starts and ends at the same vertex).
*   **Basic Algorithm Analysis (Big O Notation):** Understanding how to analyze the time and space complexity of algorithms (e.g., $O(V+E)$, $O(VE^2)$).
*   **Residual Graphs (Conceptual):** While we'll define it formally here, having an intuitive grasp that a graph can change as "flow" moves through it, and that we might need to "undo" flow, is helpful.

## 4. The core idea — step by step

Let's build up the concept of network flow step by step, from basic definitions to the powerful Max-Flow Min-Cut Theorem.

### Step 1: Flow Network

**Plain-English Statement:** A flow network is like a system of one-way pipes. Each pipe has a maximum capacity, telling you how much fluid can pass through it. There's a special pipe junction where all the fluid starts (the "source") and another where it all ends up (the "sink").

**Small Concrete Example:**
Imagine a network with 4 nodes: $S$ (source), $A$, $B$, and $T$ (sink).
Edges and their capacities:
$S \to A$ with capacity 10
$S \to B$ with capacity 5
$A \to B$ with capacity 15
$A \to T$ with capacity 5
$B \to T$ with capacity 10

**Formal/Mathematical Version:**
A **flow network** is a directed graph $G = (V, E)$ where:
*   $V$ is the set of vertices (nodes).
*   $E$ is the set of directed edges.
*   Each edge $(u, v) \in E$ has a non-negative **capacity** $c(u, v) \ge 0$. If $(u, v) \notin E$, we assume $c(u, v) = 0$.
*   There are two distinguished vertices: a **source** $s \in V$ and a **sink** $t \in V$.

**What could go wrong:** Forgetting that edges are directed, meaning flow can only go one way. Also, capacities must be non-negative.

### Step 2: Flow and its Properties

**Plain-English Statement:** "Flow" is the actual amount of fluid currently moving through a pipe. It can't exceed the pipe's capacity, and fluid can't magically appear or disappear at any junction (except the source and sink). Whatever fluid enters an intermediate junction must leave it.

**Small Concrete Example:**
Using the network from Step 1. Let's say we send some flow:
$S \to A$: flow 7 (capacity 10)
$S \to B$: flow 3 (capacity 5)
$A \to B$: flow 0 (capacity 15)
$A \to T$: flow 7 (capacity 5) -- *Wait, this is wrong! Flow cannot exceed capacity.*
Let's correct it:
$S \to A$: flow 7 (capacity 10)
$S \to B$: flow 3 (capacity 5)
$A \to B$: flow 2 (capacity 15)
$A \to T$: flow 5 (capacity 5)
$B \to T$: flow 5 (capacity 10)

Let's check conservation for node $A$:
Incoming flow to $A$: $f(S,A) = 7$
Outgoing flow from $A$: $f(A,B) + f(A,T) = 2 + 5 = 7$.
Incoming equals outgoing. Good.

Let's check conservation for node $B$:
Incoming flow to $B$: $f(S,B) + f(A,B) = 3 + 2 = 5$
Outgoing flow from $B$: $f(B,T) = 5$.
Incoming equals outgoing. Good.

The total flow from $S$ is $f(S,A) + f(S,B) = 7 + 3 = 10$.
The total flow to $T$ is $f(A,T) + f(B,T) = 5 + 5 = 10$.
The total flow value in the network is 10.

**Formal/Mathematical Version:**
A **flow** in $G$ is a function $f: V \times V \to \mathbb{R}$ that satisfies the following properties:
1.  **Capacity Constraint:** For all $u, v \in V$, the flow $f(u, v)$ cannot exceed the capacity $c(u, v)$.
    $$0 \le f(u, v) \le c(u, v)$$
2.  **Skew Symmetry:** The flow from $u$ to $v$ is the negative of the flow from $v$ to $u$. This is a mathematical convenience for representing flow in both directions.
    $$f(u, v) = -f(v, u)$$
3.  **Flow Conservation:** For every vertex $u \in V$ except the source $s$ and the sink $t$, the total incoming flow must equal the total outgoing flow.
    $$\sum_{v \in V} f(u, v) = 0 \quad \text{for all } u \in V \setminus \{s, t\}$$
The **value of the flow** $f$, denoted $|f|$, is the total net flow out of the source:
$$|f| = \sum_{v \in V} f(s, v)$$
(By flow conservation, this is also equal to the total net flow into the sink: $\sum_{v \in V} f(v, t)$.)

**What could go wrong:** Forgetting skew symmetry (it's crucial for the residual graph). Incorrectly applying flow conservation – remember it only applies to intermediate nodes, not $s$ or $t$.

### Step 3: Residual Graph and Augmenting Paths

**Plain-English Statement:** The "residual graph" shows us how much *more* flow we can push through the network, or even how we can "undo" some flow we've already sent to make room for a better path. An "augmenting path" is simply a path from the source to the sink in this residual graph, along which we can send additional flow.

**Small Concrete Example:**
Let's use the network from Step 1 and the flow from Step 2:
Capacities: $c(S,A)=10, c(S,B)=5, c(A,B)=15, c(A,T)=5, c(B,T)=10$.
Flow: $f(S,A)=7, f(S,B)=3, f(A,B)=2, f(A,T)=5, f(B,T)=5$.

Now, let's build the residual graph $G_f$:
For each edge $(u, v)$ in the original graph with capacity $c(u, v)$ and current flow $f(u, v)$:
*   **Forward edge $(u, v)$:** Has residual capacity $c_f(u, v) = c(u, v) - f(u, v)$. This is how much more flow can go from $u$ to $v$.
    *   $S \to A$: $c_f(S,A) = 10 - 7 = 3$
    *   $S \to B$: $c_f(S,B) = 5 - 3 = 2$
    *   $A \to B$: $c_f(A,B) = 15 - 2 = 13$
    *   $A \to T$: $c_f(A,T) = 5 - 5 = 0$
    *   $B \to T$: $c_f(B,T) = 10 - 5 = 5$
*   **Backward edge $(v, u)$:** Has residual capacity $c_f(v, u) = f(u, v)$. This allows us to "push back" flow that was previously sent from $u$ to $v$. This is crucial for finding optimal paths.
    *   $A \to S$: $c_f(A,S) = f(S,A) = 7$
    *   $B \to S$: $c_f(B,S) = f(S,B) = 3$
    *   $B \to A$: $c_f(B,A) = f(A,B) = 2$
    *   $T \to A$: $c_f(T,A) = f(A,T) = 5$
    *   $T \to B$: $c_f(T,B) = f(B,T) = 5$

An augmenting path is a path from $S$ to $T$ in $G_f$ where all edges have $c_f(u,v) > 0$.
In our example, $A \to T$ has $c_f(A,T)=0$, so we can't use it directly.
But consider path $S \to B \to T$. Residual capacities are $c_f(S,B)=2$ and $c_f(B,T)=5$. The minimum is 2. So we can send 2 more units of flow along $S \to B \to T$. This is an augmenting path.

**Formal/Mathematical Version:**
Given a flow network $G=(V, E)$ and a flow $f$, the **residual graph** $G_f = (V, E_f)$ is defined as follows:
*   $V$ is the same set of vertices.
*   $E_f$ consists of edges $(u, v)$ such that $c_f(u, v) > 0$.
*   For each pair of vertices $u, v \in V$:
    *   If $(u, v) \in E$, the **residual capacity** $c_f(u, v) = c(u, v) - f(u, v)$. This represents the remaining capacity on the edge $(u, v)$.
    *   If $(v, u) \in E$, the residual capacity $c_f(u, v) = f(v, u)$. This represents the capacity to "cancel" flow that has already been sent from $v$ to $u$.
    *   If neither $(u,v)$ nor $(v,u)$ is in $E$, then $c_f(u,v) = 0$.
    (Note: A more compact definition for $c_f(u,v)$ is $c_f(u,v) = c(u,v) - f(u,v) + f(v,u)$ assuming $c(u,v)=0$ if no edge, and $f(v,u)$ is the flow on the reverse edge. This combines forward and backward residual capacities into one formula.)

An **augmenting path** $P$ is a simple path from $s$ to $t$ in the residual graph $G_f$. The **bottleneck capacity** (or residual capacity of the path) of $P$ is $\delta(P) = \min_{(u, v) \in P} \{c_f(u, v)\}$.

**What could go wrong:** Not understanding the role of backward edges. They are crucial! They allow the algorithm to correct "bad" flow choices made earlier by effectively rerouting flow. Without them, the algorithm might get stuck in a suboptimal flow.

### Step 4: Ford-Fulkerson Method

**Plain-English Statement:** The Ford-Fulkerson method is a general strategy: "As long as you can find *any* path from the source to the sink with available capacity, send as much flow as possible along that path. Repeat until no such path exists." The "as much as possible" part means you're limited by the smallest available capacity on any edge in that path.

**Small Concrete Example:**
Let's start with the initial network (all flows are 0):
$S \to A$ (10), $S \to B$ (5)
$A \to B$ (15), $A \to T$ (5)
$B \to T$ (10)

1.  **Find path $S \to A \to T$**:
    *   Capacities: $c(S,A)=10$, $c(A,T)=5$.
    *   Bottleneck capacity: $\min(10, 5) = 5$.
    *   Augment flow by 5 units along $S \to A \to T$.
    *   Update flows: $f(S,A)=5$, $f(A,T)=5$.
    *   Current total flow: 5.

2.  **Update residual graph:**
    *   $c_f(S,A) = 10-5=5$, $c_f(A,S)=5$
    *   $c_f(A,T) = 5-5=0$, $c_f(T,A)=5$
    *   Other residual capacities remain as initial capacities (e.g., $c_f(S,B)=5$, $c_f(B,T)=10$, $c_f(A,B)=15$).

3.  **Find path $S \to B \to T$**:
    *   Residual capacities: $c_f(S,B)=5$, $c_f(B,T)=10$.
    *   Bottleneck capacity: $\min(5, 10) = 5$.
    *   Augment flow by 5 units along $S \to B \to T$.
    *   Update flows: $f(S,B)=5$, $f(B,T)=5$.
    *   Current total flow: $5+5=10$.

4.  **Update residual graph:**
    *   $c_f(S,B) = 5-5=0$, $c_f(B,S)=5$
    *   $c_f(B,T) = 10-5=5$, $c_f(T,B)=5$
    *   $c_f(S,A)=5$, $c_f(A,S)=5$
    *   $c_f(A,T)=0$, $c_f(T,A)=5$
    *   $c_f(A,B)=15$, $c_f(B,A)=0$

5.  **Look for more augmenting paths:**
    *   Can we find a path from $S$ to $T$ in the current residual graph?
    *   $S \to A$ has capacity 5. $S \to B$ has capacity 0.
    *   From $A$, we can go to $B$ (capacity 15).
    *   From $B$, we can go to $T$ (capacity 5).
    *   So, path $S \to A \to B \to T$ exists!
    *   Residual capacities: $c_f(S,A)=5$, $c_f(A,B)=15$, $c_f(B,T)=5$.
    *   Bottleneck capacity: $\min(5, 15, 5) = 5$.
    *   Augment flow by 5 units along $S \to A \to B \to T$.
    *   Update flows:
        *   $f(S,A)$ becomes $5+5=10$.
        *   $f(A,B)$ becomes $0+5=5$.
        *   $f(B,T)$ becomes $5+5=10$.
    *   Current total flow: $10+5=15$.

6.  **Update residual graph:**
    *   $c_f(S,A)=0$, $c_f(A,S)=10$
    *   $c_f(A,B)=10$, $c_f(B,A)=5$
    *   $c_f(B,T)=0$, $c_f(T,B)=10$
    *   All other capacities as before.

7.  **Look for more augmenting paths:**
    *   From $S$, only $S \to A$ and $S \to B$ are possible. Both have $c_f(S,A)=0$ and $c_f(S,B)=0$.
    *   No path from $S$ to $T$ can be found. The algorithm terminates.
    *   Max flow is 15.

**Formal/Mathematical Version:**
The **Ford-Fulkerson method** (sometimes called Ford-Fulkerson algorithm, though it's a method as the specific path search isn't defined) works as follows:
1.  Initialize flow $f(u, v) = 0$ for all $(u, v) \in V \times V$.
2.  While there exists an augmenting path $P$ from $s$ to $t$ in the residual graph $G_f$:
    a.  Compute the bottleneck capacity $\delta(P) = \min_{(u, v) \in P} \{c_f(u, v)\}$.
    b.  For each edge $(u, v) \in P$:
        i.  If $(u, v) \in E$ (original edge), increase $f(u, v)$ by $\delta(P)$.
        ii. If $(v, u) \in E$ (backward edge corresponding to original $(u,v)$), decrease $f(v, u)$ by $\delta(P)$.
3.  The final flow $f$ is the maximum flow.

**What could go wrong:** If capacities are irrational, Ford-Fulkerson might not terminate or converge to the correct answer. If the choice of augmenting paths is poor (e.g., always choosing paths with very small bottleneck capacities), the algorithm can be very slow, taking many iterations.

### Step 5: Edmonds-Karp Algorithm

**Plain-English Statement:** Edmonds-Karp is a specific implementation of the Ford-Fulkerson method. It solves the "what could go wrong" problem by always finding the *shortest* augmenting path (in terms of number of edges) using Breadth-First Search (BFS). This guarantees polynomial time complexity and termination even with irrational capacities.

**Small Concrete Example:**
Let's re-run the example from Step 4 using BFS to find augmenting paths.
Initial network, all flows 0.

1.  **BFS from $S$ in $G_f$**:
    *   Path $S \to A \to T$: $c_f(S,A)=10, c_f(A,T)=5$. Bottleneck $\delta=5$.
    *   Augment flow by 5. Total flow = 5.
    *   Update $G_f$.

2.  **BFS from $S$ in $G_f$**:
    *   Path $S \to B \to T$: $c_f(S,B)=5, c_f(B,T)=10$. Bottleneck $\delta=5$.
    *   Augment flow by 5. Total flow = 10.
    *   Update $G_f$.

3.  **BFS from $S$ in $G_f$**:
    *   Path $S \to A \to B \to T$: $c_f(S,A)=5, c_f(A,B)=15, c_f(B,T)=5$. Bottleneck $\delta=5$.
    *   Augment flow by 5. Total flow = 15.
    *   Update $G_f$.

4.  **BFS from $S$ in $G_f$**:
    *   No path from $S$ to $T$ found. (e.g., $S \to A$ has $c_f(S,A)=0$, $S \to B$ has $c_f(S,B)=0$).
    *   Algorithm terminates. Max flow = 15.

Notice that the steps are identical to the Ford-Fulkerson example because the paths chosen happened to be the shortest ones. Edmonds-Karp *guarantees* finding the shortest path, leading to a more predictable and efficient algorithm.

**Formal/Mathematical Version:**
The **Edmonds-Karp algorithm** is a specific implementation of the Ford-Fulkerson method where each augmenting path $P$ is found using a Breadth-First Search (BFS) in the residual graph $G_f$. BFS guarantees that the chosen path $P$ is a shortest path from $s$ to $t$ in $G_f$ (in terms of number of edges).

**Algorithm:**
1.  Initialize flow $f(u, v) = 0$ for all $(u, v) \in V \times V$.
2.  While there exists an augmenting path $P$ from $s$ to $t$ in $G_f$ (found by BFS):
    a.  Compute $\delta(P) = \min_{(u, v) \in P} \{c_f(u, v)\}$.
    b.  For each edge $(u, v) \in P$:
        i.  If $(u, v) \in E$, increase $f(u, v)$ by $\delta(P)$.
        ii. If $(v, u) \in E$, decrease $f(v, u)$ by $\delta(P)$.
3.  The final flow $f$ is the maximum flow.

**Time Complexity:** $O(VE^2)$, where $V$ is the number of vertices and $E$ is the number of edges. This is because each BFS takes $O(E)$ time (since $V$ is at most $E+1$ in a connected graph), and there are at most $O(VE)$ augmentations.

**What could go wrong:** Confusing Edmonds-Karp with the general Ford-Fulkerson. Edmonds-Karp is *a way* to implement Ford-Fulkerson, but not the only way. Forgetting to use BFS to find the shortest path.

### Step 6: Max-Flow Min-Cut Theorem

**Plain-English Statement:** This is the big idea! It says that the maximum amount of flow you can push through a network is always exactly equal to the capacity of the *smallest* "cut" you can make. A "cut" is just a way to divide the network's nodes into two groups: one containing the source, and one containing the sink. The capacity of a cut is the sum of capacities of all pipes that go *from* the source's group *to* the sink's group.

**Small Concrete Example:**
Using our max flow of 15 from the previous example.
Let's find some cuts and their capacities:
Cut 1: $S$ in one group, $A, B, T$ in the other.
Edges going from $S$-group to $(A,B,T)$-group: $S \to A$ (cap 10), $S \to B$ (cap 5).
Capacity of Cut 1 = $c(S,A) + c(S,B) = 10 + 5 = 15$.

Cut 2: $S, A$ in one group, $B, T$ in the other.
Edges going from $(S,A)$-group to $(B,T)$-group: $A \to B$ (cap 15), $A \to T$ (cap 5).
Capacity of Cut 2 = $c(A,B) + c(A,T) = 15 + 5 = 20$.

Cut 3: $S, A, B$ in one group, $T$ in the other.
Edges going from $(S,A,B)$-group to $T$-group: $A \to T$ (cap 5), $B \to T$ (cap 10).
Capacity of Cut 3 = $c(A,T) + c(B,T) = 5 + 10 = 15$.

Notice that the max flow (15) is equal to the capacity of Cut 1 and Cut 3. These are "min-cuts."

**Formal/Mathematical Version:**
A **cut** $(S, T)$ of a flow network $G=(V, E)$ is a partition of $V$ into two sets $S$ and $T$ such that $s \in S$ and $t \in T$.
The **capacity of a cut** $(S, T)$, denoted $c(S, T)$, is the sum of capacities of all edges $(u, v)$ such that $u \in S$ and $v \in T$:
$$c(S, T) = \sum_{u \in S, v \in T} c(u, v)$$
The **Max-Flow Min-Cut Theorem** states:
*   If $f$ is any flow in $G$, and $(S, T)$ is any cut in $G$, then the value of the flow $|f|$ is less than or equal to the capacity of the cut $c(S, T)$.
    $$|f| \le c(S, T)$$
*   The maximum value of a flow in $G$ is equal to the minimum capacity of a cut in $G$.
    $$\max_{f} |f| = \min_{(S,T)} c(S,T)$$

**How to find a min-cut after finding max-flow:**
After the Ford-Fulkerson (or Edmonds-Karp) algorithm terminates, the residual graph $G_f$ contains no augmenting path from $s$ to $t$.
Let $S$ be the set of all vertices reachable from $s$ in $G_f$.
Let $T = V \setminus S$.
Then $(S, T)$ is a min-cut.
Why? Because if $u \in S$ and $v \in T$, then $(u,v)$ must be saturated in the original graph (i.e., $f(u,v) = c(u,v)$), otherwise $v$ would be reachable from $u$ in $G_f$, meaning $v$ would be in $S$, which is a contradiction. Conversely, if $(v,u)$ exists such that $v \in T$ and $u \in S$, then $f(v,u)$ must be 0, otherwise $u$ would be reachable from $v$ via a backward edge, which implies $v$ would be in $S$.

**What could go wrong:** Incorrectly defining a cut (e.g., including edges from $T$ to $S$ in the cut capacity calculation, or not ensuring $s \in S$ and $t \in T$). Forgetting that the min-cut is found *after* the max-flow algorithm completes, by examining the final residual graph.

## 5. Worked examples — multiple, with every step shown

Let's work through a few examples using the Edmonds-Karp algorithm (BFS for augmenting paths).

### Example 1: Simple Network

**Problem:** Find the maximum flow from $S$ to $T$ in the following network, and identify a corresponding min-cut.

**Given:** A directed graph with capacities:
$S \to A$ (cap 10)
$S \to B$ (cap 10)
$A \to C$ (cap 5)
$A \to D$ (cap 5)
$B \to C$ (cap 5)
$B \to D$ (cap 5)
$C \to T$ (cap 10)
$D \to T$ (cap 10)

**What we want:** Max flow value and a min-cut $(S, T)$.

**Solution:**
Initial flow: All $f(u,v) = 0$. Total flow = 0.

**Iteration 1:**
1.  **Find augmenting path using BFS from $S$ in $G_f$:**
    *   BFS discovers path $S \to A \to C \to T$.
    *   Residual capacities along path: $c_f(S,A)=10$, $c_f(A,C)=5$, $c_f(C,T)=10$.
    *   Bottleneck capacity $\delta = \min(10, 5, 10) = 5$.
2.  **Augment flow by 5:**
    *   $f(S,A) = 0+5=5$
    *   $f(A,C) = 0+5=5$
    *   $f(C,T) = 0+5=5$
    *   Total flow = 5.
3.  **Update residual capacities:**
    *   $c_f(S,A) = 10-5=5$, $c_f(A,S)=5$
    *   $c_f(A,C) = 5-5=0$, $c_f(C,A)=5$
    *   $c_f(C,T) = 10-5=5$, $c_f(T,C)=5$
    *   Other capacities remain initial or 0 for reverse.

**Iteration 2:**
1.  **Find augmenting path using BFS from $S$ in $G_f$:**
    *   BFS discovers path $S \to B \to D \to T$.
    *   Residual capacities along path: $c_f(S,B)=10$, $c_f(B,D)=5$, $c_f(D,T)=10$.
    *   Bottleneck capacity $\delta = \min(10, 5, 10) = 5$.
2.  **Augment flow by 5:**
    *   $f(S,B) = 0+5=5$
    *   $f(B,D) = 0+5=5$
    *   $f(D,T) = 0+5=5$
    *   Total flow = $5+5=10$.
3.  **Update residual capacities:**
    *   $c_f(S,B) = 10-5=5$, $c_f(B,S)=5$
    *   $c_f(B,D) = 5-5=0$, $c_f(D,B)=5$
    *   $c_f(D,T) = 10-5=5$, $c_f(T,D)=5$
    *   (and previously updated $c_f(S,A)=5, c_f(A,S)=5, c_f(A,C)=0, c_f(C,A)=5, c_f(C,T)=5, c_f(T,C)=5$)

**Iteration 3:**
1.  **Find augmenting path using BFS from $S$ in $G_f$:**
    *   BFS discovers path $S \to A \to D \to T$.
    *   Residual capacities along path: $c_f(S,A)=5$, $c_f(A,D)=5$, $c_f(D,T)=5$.
    *   Bottleneck capacity $\delta = \min(5, 5, 5) = 5$.
2.  **Augment flow by 5:**
    *   $f(S,A) = 5+5=10$
    *   $f(A,D) = 0+5=5$
    *   $f(D,T) = 5+5=10$
    *   Total flow = $10+5=15$.
3.  **Update residual capacities:**
    *   $c_f(S,A) = 10-10=0$, $c_f(A,S)=10$
    *   $c_f(A,D) = 5-5=0$, $c_f(D,A)=5$
    *   $c_f(D,T) = 10-10=0$, $c_f(T,D)=10$

**Iteration 4:**
1.  **Find augmenting path using BFS from $S$ in $G_f$:**
    *   BFS discovers path $S \to B \to C \to T$.
    *   Residual capacities along path: $c_f(S,B)=5$, $c_f(B,C)=5$, $c_f(C,T)=5$.
    *   Bottleneck capacity $\delta = \min(5, 5, 5) = 5$.
2.  **Augment flow by 5:**
    *   $f(S,B) = 5+5=10$
    *   $f(B,C) = 0+5=5$
    *   $f(C,T) = 5+5=10$
    *   Total flow = $15+5=20$.
3.  **Update residual capacities:**
    *   $c_f(S,B) = 10-10=0$, $c_f(B,S)=10$
    *   $c_f(B,C) = 5-5=0$, $c_f(C,B)=5$
    *   $c_f(C,T) = 10-10=0$, $c_f(T,C)=10$

**Termination:**
*   BFS from $S$ in the current $G_f$ reveals no path to $T$. All paths from $S$ are blocked.
    *   $S \to A$ has $c_f(S,A)=0$.
    *   $S \to B$ has $c_f(S,B)=0$.
*   The algorithm terminates.

**Final Flow:**
$f(S,A)=10, f(S,B)=10, f(A,C)=5, f(A,D)=5, f(B,C)=5, f(B,D)=5, f(C,T)=10, f(D,T)=10$.
Total Max Flow = 20.

**Min-Cut Identification:**
*   Perform a BFS/DFS from $S$ in the *final* residual graph.
*   Nodes reachable from $S$: $S$. (Because $c_f(S,A)=0$ and $c_f(S,B)=0$).
*   So, $S = \{S\}$, and $T = \{A, B, C, D, T\}$.
*   Capacity of cut $(S,T)$: Sum of capacities of edges $(u,v)$ where $u \in S$ and $v \in T$.
    *   $S \to A$ (cap 10)
    *   $S \to B$ (cap 10)
    *   No other edges from $S$ to $T$.
*   Cut capacity = $10 + 10 = 20$.

**Final Answer:**
The maximum flow from $S$ to $T$ is $\boxed{20}$.
A corresponding min-cut is $(\{S\}, \{A, B, C, D, T\})$ with capacity $\boxed{20}$.

**Reflection:** This example was straightforward because there were no backward edges needed. Each augmentation saturated a path, and distinct paths were chosen. The min-cut nicely separates the source from all other nodes.

### Example 2: Involving a Backward Edge

**Problem:** Find the maximum flow from $S$ to $T$ in the following network, and identify a corresponding min-cut.

**Given:** A directed graph with capacities:
$S \to A$ (cap 10)
$S \to B$ (cap 10)
$A \to C$ (cap 4)
$A \to B$ (cap 2)
$B \to D$ (cap 9)
$C \to T$ (cap 10)
$D \to T$ (cap 10)

**What we want:** Max flow value and a min-cut $(S, T)$.

**Solution:**
Initial flow: All $f(u,v) = 0$. Total flow = 0.

**Iteration 1:**
1.  **BFS from $S$ in $G_f$:** Path $S \to A \to C \to T$.
    *   Residual capacities: $c_f(S,A)=10, c_f(A,C)=4, c_f(C,T)=10$.
    *   Bottleneck $\delta = \min(10, 4, 10) = 4$.
2.  **Augment flow by 4:**
    *   $f(S,A)=4, f(A,C)=4, f(C,T)=4$.
    *   Total flow = 4.
3.  **Update $G_f$:**
    *   $c_f(S,A)=6, c_f(A,S)=4$
    *   $c_f(A,C)=0, c_f(C,A)=4$
    *   $c_f(C,T)=6, c_f(T,C)=4$

**Iteration 2:**
1.  **BFS from $S$ in $G_f$:** Path $S \to B \to D \to T$.
    *   Residual capacities: $c_f(S,B)=10, c_f(B,D)=9, c_f(D,T)=10$.
    *   Bottleneck $\delta = \min(10, 9, 10) = 9$.
2.  **Augment flow by 9:**
    *   $f(S,B)=9, f(B,D)=9, f(D,T)=9$.
    *   Total flow = $4+9=13$.
3.  **Update $G_f$:**
    *   $c_f(S,B)=1, c_f(B,S)=9$
    *   $c_f(B,D)=0, c_f(D,B)=9$
    *   $c_f(D,T)=1, c_f(T,D)=9$

**Iteration 3:**
1.  **BFS from $S$ in $G_f$:** Path $S \to A \to B \to D \to T$.
    *   Residual capacities: $c_f(S,A)=6, c_f(A,B)=2, c_f(B,D)=0$ (from previous step $f(B,D)=9$ saturated $c(B,D)=9$). This path is blocked.
    *   Let's re-evaluate reachable nodes.
    *   From $S$: $A$ (cap 6), $B$ (cap 1).
    *   From $A$: $C$ (cap 0), $B$ (cap 2).
    *   From $B$: $D$ (cap 0).
    *   From $C$: $T$ (cap 6).
    *   From $D$: $T$ (cap 1).
    *   Path $S \to A \to B$ has capacities $c_f(S,A)=6$, $c_f(A,B)=2$.
    *   But from $B$, $D$ is saturated ($c_f(B,D)=0$). So $S \to A \to B \to D \to T$ is not a valid augmenting path.
    *   What about $S \to B \to A \to C \to T$? This involves a backward edge from $A$ to $B$.
        *   $c_f(S,B)=1$.
        *   $c_f(B,A)$ is $f(A,B)$, which is 0. So $S \to B \to A$ is not possible.

    *   Okay, let's trace BFS carefully.
        *   Queue: $[S]$
        *   Pop $S$. Neighbors: $A$ ($c_f(S,A)=6$), $B$ ($c_f(S,B)=1$).
        *   Queue: $[A, B]$
        *   Pop $A$. Neighbors: $C$ ($c_f(A,C)=0$), $B$ ($c_f(A,B)=2$), $S$ ($c_f(A,S)=4$).
        *   Queue: $[B, B]$ (don't add visited $S$).
        *   Pop $B$. Neighbors: $D$ ($c_f(B,D)=0$), $S$ ($c_f(B,S)=9$), $A$ ($c_f(B,A)=f(A,B)=0$).
        *   Wait, $f(A,B)$ is still 0. So $c_f(A,B)=2$ (forward) and $c_f(B,A)=0$ (backward).
        *   So from $A$, we can go to $B$.
        *   From $B$, we can go to $D$ ($c_f(B,D)=0$)
        *   From $D$, we can go to $T$ ($c_f(D,T)=1$).
        *   So, $S \to A \to B \to D \to T$ is not possible.

    *   Let's check the state again.
        *   $f(S,A)=4, f(S,B)=9, f(A,C)=4, f(A,B)=0, f(B,D)=9, f(C,T)=4, f(D,T)=9$.
        *   Residuals: $c_f(S,A)=6, c_f(A,S)=4$. $c_f(S,B)=1, c_f(B,S)=9$.
        *   $c_f(A,C)=0, c_f(C,A)=4$. $c_f(A,B)=2, c_f(B,A)=0$.
        *   $c_f(B,D)=0, c_f(D,B)=9$.
        *   $c_f(C,T)=6, c_f(T,C)=4$. $c_f(D,T)=1, c_f(T,D)=9$.

    *   Path $S \to B \to T$: $c_f(S,B)=1$, $c_f(B,D)=0$. No.
    *   Path $S \to A \to T$: $c_f(S,A)=6$, $c_f(A,C)=0$. No.
    *   What about using a backward edge?
    *   Consider path $S \to A \to B \to D \to T$. This path is not valid because $c_f(B,D)=0$.
    *   Consider path $S \to B \to A \to C \to T$. This path uses $B \to A$ as a backward edge.
        *   $c_f(S,B)=1$.
        *   $c_f(B,A) = f(A,B) = 0$. So this path is not valid.

    *   Aha! The path must exist. Let's re-examine $S \to A \to B \to D \to T$.
        *   $c_f(S,A)=6$
        *   $c_f(A,B)=2$ (from original capacity $c(A,B)=2$, flow $f(A,B)=0$)
        *   $c_f(B,D)=0$ (from original capacity $c(B,D)=9$, flow $f(B,D)=9$)
        *   So this path is indeed blocked at $B \to D$.

    *   Let's re-check the graph structure.
        $S \to A (10)$
        $S \to B (10)$
        $A \to C (4)$
        $A \to B (2)$
        $B \to D (9)$
        $C \to T (10)$
        $D \to T (10)$

    *   Current flow: $f(S,A)=4, f(S,B)=9, f(A,C)=4, f(B,D)=9, f(C,T)=4, f(D,T)=9$. All other flows are 0.
    *   Residual capacities:
        $c_f(S,A)=6, c_f(A,S)=4$
        $c_f(S,B)=1, c_f(B,S)=9$
        $c_f(A,C)=0, c_f(C,A)=4$
        $c_f(A,B)=2, c_f(B,A)=0$
        $c_f(B,D)=0, c_f(D,B)=9$
        $c_f(C,T)=6, c_f(T,C)=4$
        $c_f(D,T)=1, c_f(T,D)=9$

    *   BFS from $S$:
        *   $S$ can reach $A$ (cap 6), $B$ (cap 1).
        *   From $A$: can reach $B$ (cap 2).
        *   From $B$: can reach nothing forward to $T$. But from $B$, we can go *back* to $S$ (cap 9).
        *   From $A$, can also go back to $S$ (cap 4).
        *   From $C$: can reach $T$ (cap 6).
        *   From $D$: can reach $T$ (cap 1).

    *   Path $S \to B \to A \to C \to T$
        *   $S \to B$: $c_f(S,B)=1$.
        *   $B \to A$: This is a backward edge, $c_f(B,A)=f(A,B)=0$. So this path is not possible.

    *   Path $S \to A \to B \to \text{something} \to T$.
        *   $S \to A$: $c_f(S,A)=6$.
        *   $A \to B$: $c_f(A,B)=2$.
        *   From $B$, we can't go to $D$ (cap 0).
        *   From $B$, we can go *back* to $S$ (cap 9). This is not an augmenting path to $T$.

    *   It seems there are no more augmenting paths. Let's double check the initial example.
        $S \to A (10)$
        $S \to B (10)$
        $A \to C (4)$
        $A \to B (2)$
        $B \to D (9)$
        $C \to T (10)$
        $D \to T (10)$

        Max flow is 15. The mistake was in my example design or calculation.
        Let's try:
        $S \to A (10)$
        $S \to B (10)$
        $A \to C (4)$
        $A \to B (2)$
        $B \to D (9)$
        $C \to D (1)$  <--- NEW EDGE
        $C \to T (10)$
        $D \to T (10)$

        Let's restart with this new example.

### Example 2 (Revised): Involving a Backward Edge

**Problem:** Find the maximum flow from $S$ to $T$ in the following network, and identify a corresponding min-cut.

**Given:** A directed graph with capacities:
$S \to A$ (cap 10)
$S \to B$ (cap 10)
$A \to C$ (cap 4)
$A \to B$ (cap 2)
$B \to D$ (cap 9)
$C \to D$ (cap 1)
$C \to T$ (cap 10)
$D \to T$ (cap 10)

**What we want:** Max flow value and a min-cut $(S, T)$.

**Solution:**
Initial flow: All $f(u,v) = 0$. Total flow = 0.

**Iteration 1:**
1.  **BFS from $S$ in $G_f$:** Path $S \to A \to C \to T$.
    *   Residual capacities: $c_f(S,A)=10, c_f(A,C)=4, c_f(C,T)=10$.
    *   Bottleneck $\delta = \min(10, 4, 10) = 4$.
2.  **Augment flow by 4:**
    *   $f(S,A)=4, f(A,C)=4, f(C,T)=4$.
    *   Total flow = 4.
3.  **Update $G_f$:**
    *   $c_f(S,A)=6, c_f(A,S)=4$
    *   $c_f(A,C)=0, c_f(C,A)=4$
    *   $c_f(C,T)=6, c_f(T,C)=4$

**Iteration 2:**
1.  **BFS from $S$ in $G_f$:** Path $S \to B \to D \to T$.
    *   Residual capacities: $c_f(S,B)=10, c_f(B,D)=9, c_f(D,T)=10$.
    *   Bottleneck $\delta = \min(10, 9, 10) = 9$.
2.  **Augment flow by 9:**
    *   $f(S,B)=9, f(B,D)=9, f(D,T)=9$.
    *   Total flow = $4+9=13$.
3.  **Update $G_f$:**
    *   $c_f(S,B)=1, c_f(B,S)=9$
    *   $c_f(B,D)=0, c_f(D,B)=9$
    *   $c_f(D,T)=1, c_f(T,D)=9$

**Iteration 3:**
1.  **BFS from $S$ in $G_f$:**
    *   Queue: $[S]$
    *   Pop $S$. Neighbors: $A$ ($c_f(S,A)=6$), $B$ ($c_f(S,B)=1$).
    *   Queue: $[A, B]$
    *   Pop $A$. Neighbors: $C$ ($c_f(A,C)=0$, so no), $B$ ($c_f(A,B)=2$). $S$ is parent.
    *   Queue: $[B, B]$ (add $B$ from $A$).
    *   Pop $B$ (from $S$). Neighbors: $D$ ($c_f(B,D)=0$, so no). $S$ is parent.
    *   Pop $B$ (from $A$). Neighbors: $D$ ($c_f(B,D)=0$, so no). $A$ is parent.
    *   This trace is still not finding the backward edge path. Let's list the full $G_f$ for clarity:
        *   $S \to A$ (6), $A \to S$ (4)
        *   $S \to B$ (1), $B \to S$ (9)
        *   $A \to C$ (0), $C \to A$ (4)
        *   $A \to B$ (2), $B \to A$ (0)
        *   $B \to D$ (0), $D \to B$ (9)
        *   $C \to D$ (1), $D \to C$ (0) (since $f(C,D)=0$)
        *   $C \to T$ (6), $T \to C$ (4)
        *   $D \to T$ (1), $T \to D$ (9)

    *   BFS:
        *   $S$ can reach $A$ ($c_f(S,A)=6$). Path $S \to A$.
        *   $S$ can reach $B$ ($c_f(S,B)=1$). Path $S \to B$.
        *   From $A$: Can reach $B$ ($c_f(A,B)=2$). Path $S \to A \to B$.
        *   From $B$: Can reach $D$ ($c_f(B,D)=0$). No.
        *   From $B$: Can reach $S$ (backward $c_f(B,S)=9$). Not useful for $S \to T$.
        *   From $A$: Can reach $S$ (backward $c_f(A,S)=4$). Not useful for $S \to T$.
        *   From $C$: Can reach $D$ ($c_f(C,D)=1$). Path $S \to A \to C \to D$.
        *   From $C$: Can reach $T$ ($c_f(C,T)=6$). Path $S \to A \to C \to T$.
        *   From $D$: Can reach $T$ ($c_f(D,T)=1$). Path $S \to A \to C \to D \to T$.

    *   Let's take path $S \to A \to B \to D \to T$.
        *   $c_f(S,A)=6$
        *   $c_f(A,B)=2$
        *   $c_f(B,D)=0$. This path is saturated. Still not the one.

    *   The path that uses a backward edge must be like $S \to X \to Y \to X' \to T$ where $Y \to X'$ is a backward edge.
    *   Consider $S \to A \to B \to D \to T$ is blocked.
    *   Consider $S \to B \to A \to C \to T$.
        *   $c_f(S,B)=1$.
        *   $c_f(B,A)=f(A,B)=0$. Not possible.

    *   What if we sent flow $S \to A \to B \to D \to T$ first, then $S \to A \to C \to D \to T$? This is order dependent. Edmonds-Karp uses BFS, so it should find the shortest path.

    *   Let's find the shortest path in $G_f$ from $S$ to $T$:
        *   $S$ reaches $A$ (dist 1), $B$ (dist 1).
        *   $A$ reaches $B$ (dist 2).
        *   $B$ (from $S$) reaches no forward edges to $T$.
        *   $B$ (from $A$) reaches no forward edges to $T$.
        *   From $A$: $C$ is blocked.
        *   From $C$: $D$ (dist 3 from $S$ via $S \to A \to C \to D$), $T$ (dist 3 from $S$ via $S \to A \to C \to T$).
        *   From $D$: $T$ (dist 4 from $S$ via $S \to A \to C \to D \to T$).

    *   Shortest paths:
        *   $S \to A \to C \to T$ (length 3). Bottleneck 4. Done in Iteration 1.
        *   $S \to B \to D \to T$ (length 3). Bottleneck 9. Done in Iteration 2.

    *   Current $G_f$:
        $c_f(S,A)=6, c_f(A,S)=4$
        $c_f(S,B)=1, c_f(B,S)=9$
        $c_f(A,C)=0, c_f(C,A)=4$
        $c_f(A,B)=2, c_f(B,A)=0$
        $c_f(B,D)=0, c_f(D,B)=9$
        $c_f(C,D)=1, c