## What it is
Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It starts at a chosen root node and explores a path to its deepest possible descendant before moving to the next sibling path. This "deep" exploration gives it its name.

## Why it matters
DFS is a fundamental building block for many other graph algorithms. In aerospace, it's used for pathfinding in state spaces, such as planning sequences of maneuvers for a spacecraft. In computer science, it is the basis for topological sorting (resolving dependencies in build systems or task schedulers) and for detecting cycles in a graph (critical for verifying deadlock-free systems).

## When to study it
You should be comfortable with the following before proceeding:
1.  **Graph Representations:** Specifically, the adjacency list representation. You should understand how to represent a graph $G = (V, E)$ where $V$ is the set of vertices and $E$ is the set of edges.
2.  **Recursion:** The concept of a function that calls itself, including the roles of the base case and the call stack.
3.  **Stacks:** The Last-In, First-Out (LIFO) data structure and its `push` and `pop` operations. The iterative version of DFS uses an explicit stack.

If you are not solid on these, review them first. DFS builds directly upon them.

## How to study it (step by step)
1.  **Manual Trace:** Draw a simple undirected graph with 6 vertices and 7 edges. Pick a starting vertex and manually trace the DFS path using a pencil. Keep a separate list of "visited" vertices to avoid loops. Notice the backtracking.
2.  **Recursive Implementation:** Code the recursive version of DFS. Use a boolean array `visited[V]` and an adjacency list `adj[V]`. The core logic will be a function like `dfs(u)` that marks `u` as visited and then recursively calls `dfs(v)` for each unvisited neighbor `v` of `u`.
3.  **Iterative Implementation:** Code the iterative version using an explicit stack. Push the start node onto the stack. In a loop, pop a vertex `u`, mark it visited, and push all its unvisited neighbors onto the stack. Compare the traversal order to your recursive version—it may differ, but the principle is the same.
4.  **Complexity Analysis:** Reason through the time complexity. Your DFS function is called exactly once for each vertex ($V$ calls). Inside each call, you iterate through its neighbors. The sum of all adjacency list lengths is $2E$ for an undirected graph or $E$ for a directed graph. This gives a total time complexity of $O(V+E)$.
5.  **Solve a Problem:** Use your DFS implementation to solve a classic problem: counting the number of connected components in a graph. This requires a loop in your main function that calls your DFS function for any vertex that has not yet been visited.

## Key ideas, with intuition
1.  **The Maze Analogy:** Imagine you're in a maze. DFS is like keeping one hand on the right wall. You'll explore one path as deeply as possible. When you hit a dead end, you backtrack until you find a new, unexplored passage and dive down that one. The algorithm "prefers" to go deeper rather than wider.

2.  **Recursion is a Natural Fit:** The "backtracking" nature of DFS maps perfectly to function call returns in recursion.
    *   Going deeper into a path = a recursive call `dfs(neighbor)`.
    *   Hitting a dead end (a node with no unvisited neighbors) = the function returns.
    *   Backtracking to a previous junction = returning to the caller function, which then continues its loop to find the next unvisited neighbor.
    The system's call stack implicitly manages the path you're on.

3.  **The `visited` Array is Your Memory:** A graph can have cycles. Without a way to remember where you've been, your traversal would get stuck in an infinite loop, going back and forth between two nodes. The `visited` array (or a hash set) is essential state that prevents this. You mark a node as visited *as soon as you encounter it*, not after you explore its children.

4.  **Time Complexity is $O(V+E)$:** This is the cost to "touch" everything in the graph.
    *   You must visit every vertex once, which costs $O(V)$.
    *   For each vertex you visit, you must check all its outgoing edges to find its neighbors. Over the entire execution, each edge $(u, v)$ is considered exactly twice in an undirected graph (once from $u$'s list, once from $v$'s list) or once in a directed graph. This costs $O(E)$.
    *   The total work is the sum of these two, hence $O(V+E)$.

## Worked example
Let's perform DFS on the following undirected graph, starting from vertex `A`.

**Graph Representation (Adjacency List):**
*   A: [B, C]
*   B: [A, D, E]
*   C: [A, F]
*   D: [B]
*   E: [B, F]
*   F: [C, E]

**State Tracking:**
*   `visited`: A boolean array/set, initially all `false`.
*   `path`: The order in which we visit nodes.

**Steps (Recursive Trace):**

1.  `DFS(A)`:
    *   Mark `A` as visited. `visited = {A}`. Path: `A`.
    *   Look at `A`'s neighbors: `B`, `C`.
    *   Pick `B`. `B` is not visited. Call `DFS(B)`.

2.  `DFS(B)` (called from `A`):
    *   Mark `B` as visited. `visited = {A, B}`. Path: `A, B`.
    *   Look at `B`'s neighbors: `A`, `D`, `E`.
    *   `A` is visited, skip.
    *   Pick `D`. `D` is not visited. Call `DFS(D)`.

3.  `DFS(D)` (called from `B`):
    *   Mark `D` as visited. `visited = {A, B, D}`. Path: `A, B, D`.
    *   Look at `D`'s neighbors: `B`.
    *   `B` is visited, skip.
    *   No more unvisited neighbors. `DFS(D)` returns to `DFS(B)`.

4.  Back in `DFS(B)`:
    *   We were looking at `B`'s neighbors. We're done with `D`.
    *   Pick `E`. `E` is not visited. Call `DFS(E)`.

5.  `DFS(E)` (called from `B`):
    *   Mark `E` as visited. `visited = {A, B, D, E}`. Path: `A, B, D, E`.
    *   Look at `E`'s neighbors: `B`, `F`.
    *   `B` is visited, skip.
    *   Pick `F`. `F` is not visited. Call `DFS(F)`.

6.  `DFS(F)` (called from `E`):
    *   Mark `F` as visited. `visited = {A, B, D, E, F}`. Path: `A, B, D, E, F`.
    *   Look at `F`'s neighbors: `C`, `E`.
    *   `C` is not visited. Call `DFS(C)`.

7.  `DFS(C)` (called from `F`):
    *   Mark `C` as visited. `visited = {A, B, D, E, F, C}`. Path: `A, B, D, E, F, C`.
    *   Look at `C`'s neighbors: `A`, `F`.
    *   `A` is visited, skip.
    *   `F` is visited, skip.
    *   No more unvisited neighbors. `DFS(C)` returns to `DFS(F)`.

8.  Back in `DFS(F)`:
    *   We were looking at `F`'s neighbors. We're done with `C`.
    *   Next neighbor is `E`. `E` is visited, skip.
    *   No more unvisited neighbors. `DFS(F)` returns to `DFS(E)`.

9.  This process continues, with each function returning all the way up the call stack until we are back in the initial `DFS(A)` call, which then also returns.

**Final Path:** A -> B -> D -> E -> F -> C

**Reflection:** Each step plunged deeper into the graph, exploring a new node if possible. Only when a node's entire neighborhood was already visited did the algorithm backtrack (return from the recursive call) and try a different branch from a higher-level node.

## Diagrams

The graph for the worked example:
```text
      A
     / \
    B---C
   / \ /
  D   E---F
```

A snapshot of the recursive call stack at Step 5, just before calling `DFS(F)`:
```text
Call Stack (Top is active)
+---------+
| DFS(E)  | <-- Currently executing. Looking at E's neighbor F.
+---------+
| DFS(B)  | <-- Paused. Waiting for DFS(E) to return.
+---------+
| DFS(A)  | <-- Paused. Waiting for DFS(B) to return.
+---------+
| main()  | <-- Paused. Waiting for DFS(A) to return.
+---------+
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Theseus and the Labyrinth". Theseus enters the maze (graph). He unrolls a single thread behind him (the recursion stack). He always goes deeper down a new corridor (visits an unvisited neighbor). He marks corridors with chalk so he doesn't re-enter them (`visited` array). When he hits a dead end (no unvisited neighbors), he follows his thread back (returns from recursion) to the last intersection and tries a different corridor.

2.  **Must Overlearn:**
    *   **Algorithm Type:** Graph traversal using a Stack (LIFO) or recursion.
    *   **Time Complexity:** $O(V+E)$
    *   **Key Component:** `visited` array/set is non-negotiable for correctness.

3.  **Spaced Repetition Schedule:** Review this material and re-implement DFS from scratch at **1 day, 3 days, 7 days, 16 days, and 35 days**. Do not skip this.

4.  **First Principles Pathway:** If you forget the implementation, rebuild it from the name "Depth-First".
    *   "Depth-First" means go deep. How do you go deep? Pick a starting node, then pick one of its neighbors, then one of *that* neighbor's neighbors, and so on.
    *   What happens when you hit a node with no new places to go? You must go back. What data structure lets you go back to the last place you came from? A Stack (Last-In, First-Out). Recursion gives you this for free with its call stack.
    *   What happens if the graph has a cycle? You'll loop forever. How do you prevent that? You must remember where you've already been. This logically demands a `visited` array.

## Common mistakes
1.  **Marking `visited` too late.** You must mark a node as visited *immediately upon entering the `dfs` function for it*, before you explore its neighbors. If you mark it after the recursive calls, you risk re-visiting it if another node points to it before the first exploration path completes.
2.  **Forgetting the main loop for disconnected graphs.** A single call to `dfs(start_node)` only traverses the connected component containing that node. To visit all nodes in a disconnected graph, you need a loop like: `for i in 0..V-1: if not visited[i]: dfs(i)`.
3.  **Stack vs. Queue Confusion.** Mixing up DFS and BFS. DFS uses a stack (deep dives), BFS uses a queue (level-by-level exploration). Using a queue by mistake will give you a valid traversal (BFS), but it won't be DFS.

## Self-check
1.  Given the graph from the worked example, what is the DFS traversal path if you start at node `F` and always choose neighbors in alphabetical order?
2.  How would you modify the recursive DFS algorithm to detect if a cycle exists in an undirected graph? (Hint: A cycle is found when you encounter an already visited node that is not your immediate parent in the DFS tree).
3.  Explain why the time complexity is $O(V+E)$ and not $O(V^2)$. Describe a graph where the complexity is dominated by $E$ (i.e., is close to $O(E)$) and another where it is dominated by $V$ (i.e., is close to $O(V)$).