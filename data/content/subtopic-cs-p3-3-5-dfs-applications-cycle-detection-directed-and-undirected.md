## What it is
Cycle detection is the process of determining if a graph contains a path that starts and ends at the same vertex, passing through other vertices. Using Depth-First Search (DFS), we can detect cycles by observing how the search explores paths. A cycle is identified when the DFS traversal encounters a vertex that has already been visited and is an ancestor in the current search path.

## Why it matters
This is not an academic exercise. In Computer Science, cycle detection is fundamental to dependency management; a build system or package manager must detect circular dependencies (e.g., A needs B, B needs A) to avoid infinite loops. In operating systems, it's used for deadlock detection in resource allocation graphs. For physics and aerospace, simulation models often have computational dependencies; a cycle implies a set of equations that must be solved simultaneously (an implicit system) rather than sequentially, which drastically changes the solution method.

## When to study it
You must be comfortable with the following before proceeding:
1.  **Graph Theory Basics:** Vertices, edges, directed vs. undirected graphs, adjacency list representation.
2.  **Depth-First Search (DFS):** The recursive algorithm, the use of a `visited` set or array to track explored nodes, and the concept of the call stack managing the traversal path.

If you cannot implement a basic recursive DFS from scratch, review that topic first. This lesson builds directly upon it.

## How to study it (step by step)
1.  **Review Undirected Graphs:** On paper, draw a simple undirected graph with 5 vertices and 5 edges, ensuring it has a cycle. Manually perform a DFS starting from an arbitrary vertex, keeping track of `visited` nodes. Note the moment you reach a node that is already `visited`.
2.  **Refine Undirected Detection:** Now, re-run the DFS on paper. This time, in your recursive `dfs(current_node, parent_node)` function, when you explore neighbors of `current_node`, ask this question: "Is this neighbor visited *and* is it not my immediate parent?" If yes, you've found a cycle. Understand why the `parent` check is necessary.
3.  **Explore Directed Graphs:** Draw a simple directed graph with a cycle (e.g., $A \to B \to C \to A$). Perform a manual DFS. Notice that just using a `visited` array is insufficient; you can encounter visited nodes that are part of a different, already-completed search branch.
4.  **Introduce the Recursion Stack:** The key for directed graphs is to track which nodes are *currently being explored* (i.e., are in the active recursion call stack). Augment your DFS with a second boolean array, `recursionStack`. A node is added to this stack upon entering its recursive call and removed just before returning. A cycle exists if you encounter a neighbor that is already in the `recursionStack`.
5.  **Implement Both:** Code both the undirected (with `parent` tracking) and directed (with `recursionStack` tracking) cycle detection algorithms. Test them on graphs with and without cycles, and on disconnected graphs.
6.  **Analyze Complexity:** Derive the time and space complexity for this algorithm. It should be identical to a standard DFS: $O(V+E)$ time and $O(V)$ space, where $V$ is the number of vertices and $E$ is the number of edges.

## Key ideas, with intuition
1.  **DFS and Trees:** A DFS traversal on a graph imposes a structure on it, known as a DFS tree (or a DFS forest for disconnected graphs). Edges in the graph can be classified based on this tree.
2.  **Back Edges are Cycles:** A cycle is formed by an edge that is not part of the DFS tree itself but connects a vertex `u` to one of its ancestors `v` in the tree. This edge is called a **back edge**. Our goal is to detect the existence of any back edge.
3.  **Undirected Case — The Parent Pointer:** In an undirected graph, when we are at node `u` and exploring its neighbor `v`, the edge $(u, v)$ exists. If `v` is the node we just came from (the parent of `u` in the DFS tree), then of course `v` is visited. This is trivial and not a cycle. A cycle exists only if we find a visited neighbor `v` that is *not* our immediate parent. This means there is another path from `v` back up to an ancestor of `u`, creating a cycle.
    $$ \text{Cycle in Undirected Graph} \iff \exists \text{ neighbor } v \text{ of } u \text{ s.t. } \text{visited}[v] \land v \neq \text{parent}[u] $$
4.  **Directed Case — The Three Colors:** In a directed graph, we can't just use the parent trick. An edge might point to a visited node in a completely different branch of the DFS tree (a "cross edge"), which is not a cycle. We need to know if a visited node is an *ancestor*. We can do this by tracking three states for each node:
    *   **WHITE:** Unvisited.
    *   **GRAY:** Visited, and currently in the recursion stack. Its descendants are being explored.
    *   **BLACK:** Visited, and all of its descendants have been fully explored.
    A cycle is detected when, from a gray node `u`, we encounter an edge to a neighbor `v` that is also gray. This means we've found a path back to an ancestor.
    $$ \text{Cycle in Directed Graph} \iff \exists \text{ edge } (u, v) \text{ s.t. } \text{color}[u] = \text{GRAY} \land \text{color}[v] = \text{GRAY} $$
    In implementation, this is often done with two boolean arrays: `visited[]` (marks GRAY or BLACK) and `recursionStack[]` (marks GRAY).

## Worked example
Let's detect a cycle in a directed graph.

**Graph:**
*   Vertices: {0, 1, 2, 3}
*   Edges: {0->1, 0->2, 1->2, 2->0, 2->3, 3->3}
*   Adjacency List:
    *   0: [1, 2]
    *   1: [2]
    *   2: [0, 3]
    *   3: [3]

We will use two boolean arrays, `visited` and `recStack`, both initialized to `false`.

1.  **`main()`:** Call `hasCycle()` for vertex 0.
2.  **`hasCycle(0)`:**
    *   `visited[0] = true`, `recStack[0] = true`.
    *   Explore neighbors of 0: `[1, 2]`.
    *   Pick neighbor 1. Call `hasCycle(1)`.
3.  **`hasCycle(1)`:**
    *   `visited[1] = true`, `recStack[1] = true`.
    *   Explore neighbors of 1: `[2]`.
    *   Pick neighbor 2. Call `hasCycle(2)`.
4.  **`hasCycle(2)`:**
    *   `visited[2] = true`, `recStack[2] = true`.
    *   Explore neighbors of 2: `[0, 3]`.
    *   Pick neighbor 0. Check `recStack[0]`. It is `true`.
    *   **Cycle detected!** The path is $0 \to 1 \to 2 \to 0$. Return `true`.
5.  **Return propagation:** `hasCycle(2)` returns `true` to `hasCycle(1)`. `hasCycle(1)` returns `true` to `hasCycle(0)`. `hasCycle(0)` returns `true` to `main()`.

**Reflection:** The `recStack` was crucial. When we were at node 2, we saw an edge to node 0. Because `recStack[0]` was true, we knew 0 was an ancestor in the current path ($0 \to 1 \to 2$). If we had used only a `visited` array, we wouldn't be able to distinguish this back edge from a harmless cross edge. The process of setting `recStack` to `false` just before a function returns is the critical "backtracking" step that cleans up the state for exploring other branches.

## Diagrams
**Undirected Graph Cycle Detection**
A back edge from C to A forms the cycle A-B-C. When DFS is at C, it sees neighbor A is visited and is NOT its parent (B).

```text
DFS Tree:
  A
  |
  B
  |
  C

Graph:
  A ----- B
  |       |
  + ----- C

Back Edge: (C, A)
```

**Directed Graph Cycle Detection**
A back edge from C to A forms the cycle. When DFS is at C, it sees neighbor A is in the current recursion stack (is GRAY).

```text
DFS Path (Recursion Stack): [A, B, C]

Graph:
  A -----> B
  ^       /
  |      /
  |     /
  |    v
  +--- C

Back Edge: (C, A)
```

## Memory technique — remember this forever
1.  **The Mnemonic:**
    *   **Undirected:** "Don't go back to Dad." A cycle is any visited node that isn't your immediate parent in the DFS tree.
    *   **Directed:** "Beware of Ghosts." A node in the recursion stack is a "gray" node—a ghost of a function call that hasn't finished yet. If you find an edge pointing to a ghost, you've found a cycle.

2.  **Overlearn these facts:**
    *   Undirected Cycle: `if (visited[neighbor] && neighbor != parent)`
    *   Directed Cycle: `if (recursionStack[neighbor])`
    *   State change: `recursionStack[u] = true;` at start of `dfs(u)`, `recursionStack[u] = false;` at end.

3.  **Spaced Repetition Schedule:**
    *   Review this entire lesson in: 1 day, 3 days, 7 days, 16 days, 35 days. Actively re-derive the logic each time.

4.  **First Principles Pathway:**
    If you forget the rules, rebuild from this:
    A cycle is fundamentally a **back edge** in a DFS tree. How do I detect a back edge? A back edge connects a node to its ancestor.
    *   *In an undirected graph*, any edge to an already-visited node must be a back edge, *unless* it's the edge to the immediate parent (which is just the reverse of the tree edge we followed).
    *   *In a directed graph*, an edge to a visited node could be a cross edge to another branch. So, I need a way to know if it's an *ancestor*. The nodes currently in the recursion call stack *are* the ancestors. That's my test.

## Common mistakes
1.  **Using the Undirected Algorithm on a Directed Graph:** This is the most common error. It will fail to correctly identify cycles involving cross edges and will report false positives. For example, in a diamond shape $A \to B, A \to C, B \to D, C \to D$, it might incorrectly flag a cycle.
2.  **Forgetting to Backtrack:** In the directed case, if you don't set `recursionStack[u] = false` before the `dfs(u)` function returns, you will permanently mark nodes as being in the recursion path, leading to false positives in separate branches of the search.
3.  **Mishandling Disconnected Graphs:** Your main function must loop through all vertices from $0$ to $V-1$. For each vertex `i`, if `!visited[i]`, you must start a new DFS traversal from `i`. Otherwise, you will miss cycles in components not reachable from vertex 0.
4.  **Incorrect Parent Tracking (Undirected):** Passing the wrong parent or not passing it at all. The `parent` in `dfs(u, parent)` is the node from which `u` was discovered.

## Self-check
1.  Draw an undirected graph representing a pentagon with one diagonal connecting two non-adjacent vertices. Does your algorithm detect a cycle? Trace the `visited` array and `parent` argument for a DFS starting at any vertex.
2.  Consider the directed graph with edges $0 \to 1, 1 \to 2, 2 \to 0, 1 \to 3$. Trace the state of the `visited` and `recursionStack` arrays as your algorithm executes, starting from vertex 0.
3.  Consider a directed graph with edges $A \to B, B \to C, A \to D, D \to C$. Does a cycle exist? Trace the directed graph algorithm starting from A. What prevents it from incorrectly identifying A-D-C-B-A (which isn't a valid path) or A-B-C-D-A as a cycle?