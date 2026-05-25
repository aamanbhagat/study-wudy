## What it is
A* (pronounced "A-star") is an informed search algorithm that finds the lowest-cost path between a starting node and a goal node in a weighted graph. It works like Dijkstra's algorithm but improves performance by using a heuristic function to estimate the cost from any given node to the goal, prioritizing paths that appear to lead more directly towards the solution.

## Why it matters
A* is fundamental to path planning and state-space search, which are core problems in Guidance, Navigation, and Control (GNC). For a Mars rover, A* can plan the most energy-efficient path across terrain, treating the landscape as a graph. In orbital mechanics, it can be used to find an optimal sequence of thruster burns to achieve a rendezvous, where each node is a state (position, velocity) and edges are possible maneuvers.

## When to study it
You must have a solid understanding of these prerequisites. If you are not confident in them, review them first.
1.  **Graphs:** Nodes, edges, directed vs. undirected, weighted graphs.
2.  **Dijkstra's Algorithm:** You should be able to trace its execution and understand why it guarantees the shortest path.
3.  **Data Structures:** Priority queues, specifically the min-heap implementation, which is essential for an efficient A* implementation.

## How to study it (step by step)
1.  **Deconstruct the A* Equation:** Write down $f(n) = g(n) + h(n)$. For each term, write a one-sentence definition in your own words. Understand that A* is just Dijkstra's but it sorts the priority queue by $f(n)$ instead of just $g(n)$.
2.  **Trace a Simple Grid:** On graph paper, draw a 5x5 grid. Set a start, a goal, and a few "wall" cells. Use the Manhattan distance as your heuristic. Manually perform the A* algorithm, keeping track of the "open set" (priority queue) and "closed set" (visited nodes) at each step.
3.  **Derive Optimality:** Start with the assumption that A* has chosen a suboptimal path to the goal. Then, use the definition of an admissible heuristic to show that there must have been a node on the true optimal path still in the open set with a lower $f$-score, which contradicts the logic of the algorithm. This proves A* must be optimal if the heuristic is admissible.
4.  **Implement It:** Code a simple A* solver for a grid world. This will force you to manage the open/closed sets, calculate $g$ and $h$ values, and handle parent pointers to reconstruct the final path.
5.  **Compare Heuristics:** Use your implementation from step 4. Run it with the Manhattan distance heuristic, then with the Euclidean distance heuristic. Finally, run it with a heuristic of $h(n) = 0$ for all nodes. Observe how the number of explored nodes changes and verify that $h(n)=0$ makes A* behave exactly like Dijkstra's.

## Key ideas, with intuition
1.  **The Evaluation Function:** The core of A* is the function it uses to evaluate which node to explore next.
    $$ f(n) = g(n) + h(n) $$
    -   $g(n)$: The **known** cost of the path from the start node to node $n$. This is the "past" cost, which is calculated exactly as the algorithm runs. It is the same as the cost used in Dijkstra's algorithm.
    -   $h(n)$: The **heuristic** (estimated) cost from node $n$ to the goal. This is the "future" cost, an educated guess. The quality of this guess is critical.
    -   $f(n)$: The estimated cost of the cheapest solution that passes through node $n$. A* always picks the node from its "open set" (the set of nodes to be visited) that has the lowest $f(n)$ value.

2.  **Admissibility (Optimism):** A heuristic $h(n)$ is **admissible** if it *never overestimates* the true cost to reach the goal. Let $h^*(n)$ be the true cost of the shortest path from $n$ to the goal. The heuristic is admissible if:
    $$ \forall n, \quad 0 \le h(n) \le h^*(n) $$
    *Intuition:* Think of $h(n)$ as an optimistic guess. If you're pathfinding in a city grid, the straight-line ("as the crow flies") distance is an admissible heuristic because you can never get there faster than by flying in a straight line. If your heuristic was pessimistic (underestimating), that's fine. But if it's overly optimistic (overestimating), you might ignore a promising path because your heuristic incorrectly tells you it's longer than it is, leading to a suboptimal final path. Admissibility is the key condition for guaranteeing A* will find the optimal solution.

3.  **Consistency (The Triangle Inequality):** A heuristic is **consistent** (or monotonic) if, for any node $n$ and any successor $p$ of $n$, the estimated cost from $n$ is no greater than the cost of moving to $p$ plus the estimated cost from $p$.
    $$ h(n) \le c(n, p) + h(p) $$
    where $c(n, p)$ is the actual cost of the edge from $n$ to $p$.
    *Intuition:* This is like the triangle inequality. It says that the heuristic values along any path should be non-decreasing. If a heuristic is consistent, it is also admissible. More importantly, consistency guarantees that whenever A* selects a node to expand, it has already found the optimal path to that node. This makes the algorithm more efficient as it never needs to re-process nodes that are in the "closed set."

## Worked example
Find the shortest path from S to G in the following graph. Edge weights are given. The heuristic value $h(n)$ for each node is shown inside the node. We will use A*.

### Diagrams
```text
      (h=6) S -------- 5 -------- A (h=4)
        | \                       / |
        |  \                     /  |
        1   4                   2   6
        |    \                 /    |
        |     \               /     |
      (h=5) B -- 2 -- C (h=3) -- 3 -- G (h=0)
              \       /
               3     1
                \   /
                 D (h=2)
```

### Steps
Let's trace the algorithm. The **Open Set** is a priority queue ordered by $f(n)$. We store nodes as `(f, g, node_name)`. The **Closed Set** contains nodes we've finished processing.

1.  **Initialize:**
    -   Open Set: `{(6, 0, S)}`  ($f(S) = g(S) + h(S) = 0 + 6 = 6$)
    -   Closed Set: `{}`
    -   Parent pointers: `{}`

2.  **Iteration 1:**
    -   Pop `S` from Open Set.
    -   Add `S` to Closed Set.
    -   Explore neighbors of `S`: `A`, `B`, `C`.
        -   `A`: $g(A) = g(S) + c(S,A) = 0 + 5 = 5$. $f(A) = g(A) + h(A) = 5 + 4 = 9$. Add `(9, 5, A)` to Open Set. Parent of `A` is `S`.
        -   `B`: $g(B) = g(S) + c(S,B) = 0 + 1 = 1$. $f(B) = g(B) + h(B) = 1 + 5 = 6$. Add `(6, 1, B)` to Open Set. Parent of `B` is `S`.
        -   `C`: $g(C) = g(S) + c(S,C) = 0 + 4 = 4$. $f(C) = g(C) + h(C) = 4 + 3 = 7$. Add `(7, 4, C)` to Open Set. Parent of `C` is `S`.
    -   Open Set: `{(6, 1, B), (7, 4, C), (9, 5, A)}`
    -   Closed Set: `{S}`

3.  **Iteration 2:**
    -   Pop `B` (lowest $f=6$) from Open Set.
    -   Add `B` to Closed Set.
    -   Explore neighbors of `B`: `S`, `C`, `D`. `S` is in Closed Set, ignore.
        -   `C`: Path via `B` gives $g(C) = g(B) + c(B,C) = 1 + 2 = 3$. This is better than the old $g(C)=4$. Update `C` in Open Set. New $f(C) = 3 + 3 = 6$. Parent of `C` is now `B`.
        -   `D`: $g(D) = g(B) + c(B,D) = 1 + 3 = 4$. $f(D) = g(D) + h(D) = 4 + 2 = 6$. Add `(6, 4, D)` to Open Set. Parent of `D` is `B`.
    -   Open Set: `{(6, 3, C), (6, 4, D), (9, 5, A)}` (Note: `C` and `D` have same $f$-score, tie-breaking can be arbitrary. Let's assume `C` comes first).
    -   Closed Set: `{S, B}`

4.  **Iteration 3:**
    -   Pop `C` from Open Set.
    -   Add `C` to Closed Set.
    -   Explore neighbors of `C`: `S`, `B`, `A`, `D`, `G`. `S`, `B` are in Closed Set.
        -   `A`: Path via `C` gives $g(A) = g(C) + c(C,A) = 3 + 2 = 5$. This is the same as the existing path, no update.
        -   `D`: Path via `C` gives $g(D) = g(C) + c(C,D) = 3 + 1 = 4$. Same as existing path, no update.
        -   `G`: $g(G) = g(C) + c(C,G) = 3 + 3 = 6$. $f(G) = g(G) + h(G) = 6 + 0 = 6$. Add `(6, 6, G)` to Open Set. Parent of `G` is `C`.
    -   Open Set: `{(6, 4, D), (6, 6, G), (9, 5, A)}`

5.  **Iteration 4:**
    -   Pop `D` from Open Set.
    -   Add `D` to Closed Set.
    -   ... (No new paths or shorter paths found from `D`)
    -   Open Set: `{(6, 6, G), (9, 5, A)}`

6.  **Iteration 5:**
    -   Pop `G` from Open Set.
    -   **GOAL REACHED.**

### Reflection
The final path is found by backtracking from `G` using parent pointers: $G \leftarrow C \leftarrow B \leftarrow S$.
Path: $S \rightarrow B \rightarrow C \rightarrow G$. Total cost: $1 + 2 + 3 = 6$.

Each step worked because we always expanded the node with the lowest *estimated total path cost* ($f$-score). The heuristic guided us towards `B` and `C` instead of `A`, even though the direct edge to `A` was only slightly more expensive than to `C`, because `A`'s heuristic value suggested it was further from the goal. This pruning of unpromising branches is what makes A* efficient.

## Memory technique — remember this forever
1.  **The Story:** A* is an **A**mbulance driver. They need to get to a crash site (the goal). They know the exact time it took to get to their current intersection ($g(n)$, the past cost). They also have a GPS that gives them a perfect straight-line travel time estimate to the crash site from where they are ($h(n)$, the future cost). The GPS is **admissible** — it never overestimates the time, because traffic can only make the real time longer. The driver always chooses the next intersection that minimizes the sum of time already spent plus the GPS estimate ($f(n) = g(n) + h(n)$).

2.  **Formulas to Overlearn:**
    -   Evaluation function: $f(n) = g(n) + h(n)$
    -   Admissibility: $0 \le h(n) \le h^*(n)$
    -   Consistency: $h(n) \le c(n, p) + h(p)$

3.  **Spaced Repetition Schedule:** Review this material at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget A*, rebuild it from Dijkstra's. Dijkstra's algorithm explores outwards from the start, always expanding the node with the lowest known cost from the start ($g(n)$). It is a uniform-cost search. A* is simply Dijkstra's plus a heuristic. You add an "educated guess" term $h(n)$ to the priority metric, changing it from $g(n)$ to $f(n) = g(n) + h(n)$. The conditions on $h(n)$ (admissibility, consistency) are the constraints required to ensure this "guess" doesn't break the optimality guarantee of the underlying Dijkstra-like search.

## Common mistakes
1.  **Mixing up $g(n)$ and $h(n)$:** A frequent error is to think $g(n)$ is just the weight of the edge leading to $n$. It is the cost of the *entire path* from the start node to $n$. $g(n)$ is history; $h(n)$ is a prophecy.
2.  **Using a Non-Admissible Heuristic:** If your heuristic can overestimate the cost, A* is not guaranteed to find the shortest path. For example, if $h(C)=10$ in the example above, $f(C)$ would have been $4+10=14$, and the algorithm might have explored `A` first, potentially missing the optimal path through `C`.
3.  **Path Reconstruction Errors:** Forgetting to store and update parent pointers during the search. The algorithm only finds the *cost* of the path. To get the path itself, you must backtrack from the goal using the parent links you recorded.
4.  **Incorrect Priority Queue Updates:** When you find a shorter path to a node already in the open set, you *must* update its $g$-score, $f$-score, and parent pointer. Failing to do this is a common and difficult-to-debug implementation bug.

## Self-check
1.  Given the A* evaluation function $f(n) = g(n) + h(n)$, what does each term represent physically in the context of a rover pathfinding on Mars? What must be true about the units of $g(n)$ and $h(n)$?
2.  You are designing a pathfinder for a video game character who can move on a grid. They can move horizontally and vertically (cost 1) or diagonally (cost 1.414). You are considering two heuristics for the distance to the goal:
    -   Heuristic A: $h(n) = |n.x - goal.x| + |n.y - goal.y|$ (Manhattan distance)
    -   Heuristic B: $h(n) = 1.5 \times \sqrt{(n.x - goal.x)^2 + (n.y - goal.y)^2}$
    For each heuristic, determine if it is admissible. Justify your answer.
3.  Consider pathfinding for a rocket from Low Earth Orbit (LEO) to a Lunar Gateway orbit. A "node" is a state vector `(position, velocity, fuel_mass)`. An "edge" is a thruster burn (a $\Delta v$ maneuver). The cost of an edge is the fuel consumed. How would you define an admissible heuristic $h(n)$ for this problem? What makes this a much harder problem than a simple grid search?