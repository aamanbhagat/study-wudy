## What it is
Network flow deals with finding the maximum rate at which a material can be moved through a network from a designated source to a sink. A flow network is a directed graph where each edge has a capacity, representing the maximum amount of flow it can handle. The goal is to maximize the total flow from source to sink while respecting edge capacities and ensuring that flow into any intermediate node equals flow out of it.

## Why it matters
This is a fundamental optimization problem with broad applications. In computer networks, it models data routing to maximize bandwidth utilization. In aerospace and logistics, it's used to model and optimize supply chains, fuel distribution, or resource allocation on a spacecraft. The underlying max-flow min-cut theorem is a cornerstone of combinatorial optimization and appears in problems like image segmentation in computer vision and finding optimal assignments in bipartite matching.

## When to study it
You must be proficient with graph theory fundamentals before tackling this. Specifically, you need to understand:
1.  **Directed Graphs:** Representations (adjacency lists/matrices) and terminology (vertices, edges, paths).
2.  **Graph Traversal:** You must have a rock-solid understanding of Breadth-First Search (BFS) and Depth-First Search (DFS), including their implementation and complexity.
3.  **Weighted Graphs:** The concept of assigning a numerical value (weight/capacity) to an edge.

If you are not comfortable implementing BFS from scratch, review that first.

## How to study it (step by step)
1.  **Formalize the problem.** Write down the mathematical definitions of a flow network $G=(V, E)$, source $s$, sink $t$, capacity $c(u,v)$, and flow $f(u,v)$. Internalize the two main constraints: the capacity constraint ($0 \le f(u,v) \le c(u,v)$) and the flow conservation constraint ($\forall v \in V \setminus \{s,t\}, \sum_{u} f(u,v) = \sum_{w} f(v,w)$).
2.  **Understand the residual graph.** This is the key concept. For a given flow $f$, the residual graph $G_f$ shows how much *more* flow can be pushed. For an edge $(u,v)$ with capacity $c(u,v)$ and flow $f(u,v)$, $G_f$ has a forward edge $(u,v)$ with residual capacity $c_f(u,v) = c(u,v) - f(u,v)$ and a backward edge $(v,u)$ with residual capacity $c_f(v,u) = f(u,v)$. Spend 20 minutes drawing a small network and its corresponding residual graph for a non-zero flow.
3.  **Grasp the Ford-Fulkerson method.** This is the general approach: while there exists a path from $s$ to $t$ in the residual graph (an "augmenting path"), find one, calculate its bottleneck capacity (the minimum residual capacity on the path), and push that much flow. Update the flow and the residual graph. Repeat until no augmenting path exists.
4.  **Learn the Max-Flow Min-Cut Theorem.** Define an $s-t$ cut as a partition of vertices $(S, T)$ with $s \in S$ and $t \in T$. The capacity of the cut is $\sum_{u \in S, v \in T} c(u,v)$. The theorem states the maximum flow value is equal to the minimum cut capacity. Understand why the flow is always less than or equal to any cut capacity (the "weak duality"). The "strong duality" (equality) is the core of the theorem.
5.  **Distinguish Ford-Fulkerson from Edmonds-Karp.** Ford-Fulkerson is a *method*; it doesn't specify *how* to find an augmenting path. If you use DFS, it can be slow. Edmonds-Karp is a specific implementation of Ford-Fulkerson that uses BFS to find the augmenting path. This guarantees finding the shortest path (in terms of number of edges) and leads to a better time complexity.
6.  **Implement Edmonds-Karp.** Code the algorithm from scratch. The main loop finds an augmenting path with BFS on the residual graph. If a path is found, augment the flow and update the residual graph. If BFS fails to reach the sink, the algorithm terminates.

## Key ideas, with intuition
1.  **Residual Graph: The "What's Left?" Network.** Imagine pipes with water flowing. The residual graph tells you two things: (1) How much more water you can push through a pipe in the forward direction (the remaining capacity). (2) How much water you can "return" or "cancel" by pushing it backward through a pipe. This backward edge is the crucial insight; it allows the algorithm to correct earlier, suboptimal flow paths.
    $$c_f(u,v) = c(u,v) - f(u,v) \quad \text{(Forward edge capacity)}$$
    $$c_f(v,u) = f(u,v) \quad \text{(Backward edge capacity)}$$
2.  **Augmenting Paths: Finding Room for More Flow.** An augmenting path is simply a path from the source to the sink in the residual graph. The existence of such a path means there is a way to push more flow from $s$ to $t$. The bottleneck of this path is the smallest residual capacity of any edge along it. We can safely increase the total flow by this bottleneck amount.
3.  **Cuts: The Bottlenecks of the Network.** An $s-t$ cut is a partition of the network into two parts, one with the source ($S$) and one with the sink ($T$). Think of it as drawing a line across some edges to separate the source from the sink. The capacity of this cut is the sum of capacities of all edges that cross the line from $S$ to $T$. Intuitively, any flow from $s$ to $t$ must pass through this "cut", so the total flow cannot exceed the capacity of *any* cut.
4.  **Max-Flow Min-Cut Theorem: The Duality.** This profound theorem states that the maximum possible flow you can achieve is *exactly equal* to the capacity of the smallest possible cut.
    $$\text{max_flow}(G) = \min_{\text{all } s-t \text{ cuts } (S,T)} \text{capacity}(S,T)$$
    When the Ford-Fulkerson algorithm terminates, there are no more augmenting paths. The set of all vertices reachable from $s$ in the final residual graph forms the $S$ part of a minimum cut.

## Worked example
Let's find the max flow from $s$ to $t$ in this network using Edmonds-Karp. Capacities are shown.

**Initial Graph G:**
```text
      (a) --10--> (b)
     / |           | \
    /  |           |  \
   10  5           4   10
  /    |           |    \
 /     v           v     \
(s)--> (c) --9--> (d) --> (t)
```

**Step 1: Find augmenting path using BFS on the residual graph.**
*   The initial residual graph is identical to the original graph (since flow is zero).
*   BFS finds path $s \to a \to b \to t$.
*   Path capacities: $c(s,a)=10, c(a,b)=10, c(b,t)=10$.
*   Bottleneck capacity is $\min(10, 10, 10) = 10$.
*   **Augment flow by 10.** Total flow = 10.

**Residual Graph $G_{f1}$ after Step 1:**
(Edges with 0 residual capacity are omitted for clarity. New backward edges are shown with `<-`).
```text
      (a) <-10-- (b)
     / ^           ^ \
    /  |           |  \
   0   5           4   0
  /    |           |    \
 v     v           v     v
(s)--> (c) --9--> (d) --> (t)
 ^           (s,a) cap 0, (a,s) cap 10
 |           (a,b) cap 0, (b,a) cap 10
 10          (b,t) cap 0, (t,b) cap 10
```
*   We now have backward edges $a \leftarrow s$, $b \leftarrow a$, and $t \leftarrow b$, each with capacity 10. The forward edges on the path have 0 residual capacity.

**Step 2: Find next augmenting path using BFS on $G_{f1}$.**
*   BFS finds path $s \to c \to d \to t$.
*   Path capacities: $c(s,c)=10, c(c,d)=9, c(d,t)=10$.
*   Bottleneck is $\min(10, 9, 10) = 9$.
*   **Augment flow by 9.** Total flow = 10 + 9 = 19.

**Residual Graph $G_{f2}$ after Step 2:**
The path $s \to c \to d \to t$ is now saturated up to 9. $c(s,c)$ becomes 1, $c(c,d)$ becomes 0, $c(d,t)$ becomes 1. Backward edges are created.

**Step 3: Find next augmenting path using BFS on $G_{f2}$.**
*   BFS finds path $s \to a \to c \to d \to b \to t$. Wait, no, that path isn't valid in the original graph. Let's trace BFS carefully on $G_{f2}$.
*   BFS finds path $s \to c \to a \to d \to t$. No, also not valid. Let's be rigorous.
*   BFS from $s$ explores:
    *   $s \to c$ (residual cap 1)
    *   $s \to a$ (residual cap 0, can't use)
*   From $c$, explore:
    *   $c \to d$ (residual cap 0, can't use)
    *   $c \to a$ (original edge $a \to c$, so this is a forward edge in $G_{f2}$ with cap 5). Path is $s \to c \to a$.
*   From $a$, explore:
    *   $a \to b$ (residual cap 0)
    *   $a \to s$ (backward edge, already visited $s$)
    *   $a \to c$ (backward edge, already visited $c$)
*   Let's re-examine the graph. A better path exists: $s \to a \to c \to d \to t$. Let's trace it on the residual graph after step 2.
    *   $s \to c$ has residual capacity 1.
    *   $c \to d$ has residual capacity 0. Path blocked.
*   Let's try another path: $s \to a \to d \to t$. Let's assume there's an edge $a \to d$ with capacity 8. (Let's add it to the original graph for a more interesting example).
    *   **Let's restart with a clearer graph.**

**Corrected Example Graph:**
```text
      (a) --4--> (b)
     /           / \
    8           /   9
   /           /     \
(s)           5       (t)
   \         /       /
    6       /       7
     \     /       /
      (c) --3--> (d)
```

**Step 1:** Path $s \to a \to b \to t$. Bottleneck is $\min(8, 4, 9) = 4$. Total flow = 4.
**Step 2:** Path $s \to c \to d \to t$. Bottleneck is $\min(6, 3, 7) = 3$. Total flow = 4 + 3 = 7.
**Step 3:** Path $s \to a \to d \to t$. (Let's assume an edge $a \to d$ with capacity 5). The residual capacity of $s \to a$ is $8-4=4$. Bottleneck is $\min(4, 5, 7-3) = \min(4,5,4) = 4$. Total flow = 7 + 4 = 11.
**Step 4:** Path $s \to c \to b \to t$. The residual capacity of $s \to c$ is $6-3=3$. Residual of $c \to b$ is 5. Residual of $b \to t$ is $9-4=5$. Bottleneck is $\min(3, 5, 5) = 3$. Total flow = 11 + 3 = 14.
**Step 5:** BFS from $s$ on the final residual graph cannot find a path to $t$. Algorithm terminates. **Max flow is 14.**

*Reflection:* Each step correctly identified a valid path from source to sink in the current residual network. By augmenting along the path with the bottleneck capacity, we increased the total flow without violating any constraints. The use of a residual graph allowed us to find complex paths that might even "undo" prior flow (by using a backward edge) to achieve a greater total flow.

## Diagrams
**Initial Flow Network**
```text
        c=16
      /----->[ v1 ]-----\
     /         |         \ c=12
    /          | c=10      \
[ s ]          |           [ t ]
    \          v          /
     \        [ v2 ]     / c=20
      \----->/-----/
        c=13
```

**Residual Graph after pushing 4 units of flow along s -> v2 -> t**
(f(s,v2)=4, f(v2,t)=4)
```text
  (c_f = 16)
      /----->[ v1 ]-----\
     /         |         \ (c_f = 12)
    /          | (c_f = 10)  \
[ s ]<---------|-----------[ t ]
    \ (c_f = 4)  v (c_f = 4) /
     \        [ v2 ]<----/
(c_f=9)\----->/-----\(c_f=16)
```
*Note*: `c_f` denotes residual capacity. A new backward edge `v2 -> s` with `c_f=4` appears, and `t -> v2` with `c_f=4`. The forward capacities on the path `s -> v2 -> t` are reduced.

## Memory technique — remember this forever
1.  **The Story:** You are a logistics officer routing convoys (flow) from a base (source) to an outpost (sink). The roads have traffic limits (capacities).
    *   **Ford-Fulkerson** is your scout's general strategy: "Find *any* open route and send a convoy."
    *   **Edmonds-Karp** is the refined strategy: "Find the route with the *fewest legs* (BFS) to minimize travel time and complexity."
    *   The **residual graph** is your live traffic map. It shows not only roads with remaining capacity, but also the option to *reroute* a convoy by sending it back a leg (a backward edge) to free up a critical road for a different, better route.
    *   The **min-cut** is the set of roads the enemy would have to bomb to completely sever your base from the outpost. Your maximum supply rate is limited by their easiest bombing run.
2.  **Must Overlearn:**
    *   **Max-Flow = Min-Cut.** This is the central theorem.
    *   **Residual Capacity (Forward):** $c_f(u,v) = c(u,v) - f(u,v)$
    *   **Residual Capacity (Backward):** $c_f(v,u) = f(u,v)$
3.  **Spaced Repetition Schedule:** Review this material (re-derive, re-implement) at 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget everything, rebuild from this:
    *   "I want to send stuff from $s$ to $t$."
    *   "I can increase the total flow if I can find *any* path from $s$ to $t$ that has some spare capacity all the way along it."
    *   "What if a path I chose earlier was bad? I need a way to 'undo' it. If I sent flow from $u \to v$, I can 'undo' it by sending flow from $v \to u$. This is the motivation for backward edges in the residual graph."
    *   "Keep finding these 'augmenting paths' and pushing flow until I can't find any more. The algorithm to find a path can be BFS or DFS. BFS is usually better."

## Common mistakes
1.  **Forgetting backward edges.** The most common implementation bug is only updating forward edges in the residual graph. Without backward edges, the algorithm cannot correct suboptimal choices and will fail on many graphs.
2.  **Confusing Flow and Capacity.** In the residual graph, the "capacity" of a backward edge $(v,u)$ is the *flow* on the original edge $(u,v)$. Don't mix them up.
3.  **Incorrectly calculating bottleneck.** The bottleneck is the minimum residual capacity on the augmenting path. A common mistake is to take the sum, or to use original capacities instead of residual ones.
4.  **Terminating early.** The algorithm is not done just because there are no more paths using only forward edges. It terminates only when there is no path from $s$ to $t$ in the *entire* residual graph, including backward edges.

## Self-check
1.  Given a flow network and a proposed flow assignment, is the flow valid? Check both the capacity and flow conservation constraints for every edge and vertex.
2.  Trace the Edmonds-Karp algorithm on the first ASCII graph in the `Diagrams` section. Write down the sequence of augmenting paths found and the final max flow value.
3.  A company wants to transport goods between cities. Some roads are one-way. Each road has a maximum number of trucks it can handle per day. You are also told that some cities are vulnerable to strikes, and if a city's workers go on strike, no trucks can pass *through* it. How would you model the problem of finding the minimum number of cities to cripple to completely cut off the capital from the main port, and how does this relate to network flow?