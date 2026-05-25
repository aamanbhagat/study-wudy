## What it is
A Strongly Connected Component (SCC) of a directed graph is a maximal set of vertices where for any two vertices $u$ and $v$ in the set, there is a directed path from $u$ to $v$ and a directed path from $v$ to $u$. In essence, it's a subgraph where every node can reach every other node within that same subgraph. The "maximal" part is key: you cannot add any more vertices to the SCC without breaking this property.

## Why it matters
SCCs are fundamental for analyzing the structure of directed graphs. In aerospace, the state space of a flight control system can be modeled as a directed graph; an SCC could represent a set of "trap" states from which the system cannot exit, indicating a potential livelock or unrecoverable error. In compilers, SCCs in a program's dependency graph are used to identify groups of functions or modules that must be compiled together due to circular dependencies.

## When to study it
You must be completely comfortable with the following before proceeding:
1.  **Directed Graphs**: Representation (specifically adjacency lists) and terminology (vertex, edge, path).
2.  **Depth-First Search (DFS)**: You should be able to implement DFS from scratch and understand its properties, including discovery and finishing times, and the concept of the DFS tree/forest.
3.  **Graph Transpose**: The concept of reversing every edge in a directed graph, denoted as $G^T$.
4.  **Stacks**: The data structure and its Last-In, First-Out (LIFO) operations.

If any of these are weak, master them first. These algorithms are direct applications of advanced DFS.

## How to study it (step by step)
1.  **Review DFS**: Write a standard recursive DFS that tracks the "finishing time" of each vertex (e.g., using a global timer or by pushing to a list post-recursion). This is the backbone of both algorithms.
2.  **Implement Kosaraju's**: Follow the two-pass DFS logic. First, implement the graph transpose operation. Then, code the first DFS pass on the original graph to get the finishing order. Finally, code the second DFS pass on the transpose graph using that order.
3.  **Trace Kosaraju's on paper**: Take a graph with 7-8 vertices and 2-3 SCCs. Manually execute the algorithm, tracking the finishing times stack and the resulting SCCs. Do not skip this; it builds intuition.
4.  **Understand Tarjan's Low-Link**: Focus on the definition of discovery time `disc[u]` and low-link value `low[u]`. Derive how `low[u]` is updated based on its neighbors: is the neighbor unvisited, or visited and still on the recursion stack?
5.  **Implement Tarjan's**: Code the single-pass DFS for Tarjan's algorithm. Pay close attention to stack management and the condition (`disc[u] == low[u]`) that identifies the root of an SCC.
6.  **Compare and Contrast**: Write down the pros and cons of each. Kosaraju's is two passes but conceptually simpler. Tarjan's is a single pass and often faster in practice, but the logic is more complex.

## Key ideas, with intuition
The core insight is that the "component graph" (where each node is an SCC) is a Directed Acyclic Graph (DAG). Both algorithms find ways to exploit this structure.

1.  **Kosaraju's Idea: Source & Sink SCCs**.
    *   In any directed graph, a DFS will finish last on a vertex in a "source" SCC (an SCC with no incoming edges from other SCCs).
    *   Let's consider the transpose graph $G^T$. The source SCCs of $G$ become "sink" SCCs in $G^T$ (no outgoing edges to other SCCs).
    *   **The key**: The vertex with the highest finishing time in a DFS of $G$ must be in a source SCC of $G$. If we run a DFS on $G^T$ starting from this vertex, the search will be "trapped" within that component, as there are no edges leading out of it in $G^T$.
    *   By processing vertices in decreasing order of their finishing times from the first pass, we can peel off one SCC at a time from the transpose graph.

2.  **Tarjan's Idea: SCC Roots and Low-Link Values**.
    *   This algorithm uses a single DFS. It identifies the "root" or "entry point" of an SCC during the traversal.
    *   We maintain two values for each vertex $u$:
        *   `disc[u]`: The discovery time (when $u$ was first visited, like a timestamp).
        *   `low[u]`: The lowest discovery time reachable from $u$ (including itself) by traversing zero or more edges in the DFS tree, and at most one "back-edge" in the graph. A back-edge is an edge from a node to one of its ancestors in the DFS tree.
    *   **The key**: A vertex $u$ is the root of an SCC if and only if its discovery time is equal to its low-link value, i.e., `disc[u] == low[u]`. This condition means that $u$ and its descendants in the DFS tree cannot reach any earlier node in the traversal.
    *   An explicit stack is used to keep track of valid ancestors. When we find an SCC root $u$, all nodes on the stack above and including $u$ form that SCC.

## Worked example
We will find the SCCs of the following graph using **Kosaraju's algorithm**.

### Graph G
```text
      (0) -> (1) -> (2)
       ^ \   /      |
       |  \ /       |
       |   v        v
      (3) <- (4) -> (5)
```
Edges: (0,1), (0,3), (1,2), (1,4), (2,5), (3,0), (4,3), (4,5)

**Step 1: DFS on G to determine finishing order.**
Let's start DFS from vertex 0. A possible traversal and finishing order (pushed onto a stack post-recursion) is:
- `DFS(0)` -> `DFS(1)` -> `DFS(2)` -> `DFS(5)`. 5 finishes. Stack: `[5]`
- Backtrack to 2. 2 finishes. Stack: `[5, 2]`
- Backtrack to 1. `DFS(4)` -> `DFS(3)`. 3 is visited (from 0's call), but let's assume our DFS explores 3 from 4. `DFS(3)` sees 0 is visited. 3 finishes. Stack: `[5, 2, 3]`
- Backtrack to 4. 4 finishes. Stack: `[5, 2, 3, 4]`
- Backtrack to 1. 1 finishes. Stack: `[5, 2, 3, 4, 1]`
- Backtrack to 0. All neighbors visited. 0 finishes. Stack: `[5, 2, 3, 4, 1, 0]`

The processing order for the second pass (popping from the stack) is: `0, 1, 4, 3, 2, 5`.

**Step 2: Compute the transpose graph, G<sup>T</sup>.**
We reverse all edges.

### Graph G<sup>T</sup>
```text
      (0) <- (1) <- (2)
       | \   ^      ^
       v  \ /       |
       |   v        |
      (3) -> (4) <- (5)
```
Edges: (1,0), (3,0), (2,1), (4,1), (5,2), (0,3), (3,4), (5,4)

**Step 3: DFS on G<sup>T</sup> using the finishing order.**
- Pop `0`. Start DFS from `0` in $G^T$. Visited: `{0}`.
  - `DFS(0)` -> `DFS(3)`. Visited: `{0, 3}`.
  - `DFS(3)` -> `DFS(4)`. Visited: `{0, 3, 4}`.
  - `DFS(4)` -> `DFS(1)`. Visited: `{0, 3, 4, 1}`.
  - `DFS(1)` sees `0` (visited). All neighbors of 1 done.
  - Backtrack. All neighbors of 4, 3, 0 done.
  - The DFS tree starting from 0 is `{0, 1, 3, 4}`. This is our first SCC.
  **SCC 1: {0, 1, 3, 4}**

- Pop `1`. Already visited. Skip.
- Pop `4`. Already visited. Skip.
- Pop `3`. Already visited. Skip.

- Pop `2`. Not visited. Start DFS from `2` in $G^T$. Visited: `{0, 1, 3, 4, 2}`.
  - `DFS(2)` sees `1` (visited). No other neighbors.
  - The DFS tree starting from 2 is `{2}`. This is our second SCC.
  **SCC 2: {2}**

- Pop `5`. Not visited. Start DFS from `5` in $G^T$. Visited: `{0, 1, 3, 4, 2, 5}`.
  - `DFS(5)` sees `2` and `4` (visited).
  - The DFS tree starting from 5 is `{5}`. This is our third SCC.
  **SCC 3: {5}**

All vertices are visited. The final SCCs are `{0, 1, 3, 4}`, `{2}`, and `{5}`.

**Reflection**: The first pass identified a vertex (`0`) in a source SCC of $G$. This became a sink SCC in $G^T$. Starting a traversal from `0` in $G^T$ guaranteed we explored that entire component without "leaking" into others, because there were no outgoing edges from the component `{0,1,3,4}` to others in $G^T$.

## Diagrams
Here is the graph $G$ from the example.

```text
      (0) ----> (1) ----> (2)
       ^ \     /          |
       |  \   /           |
       |   v /            v
      (3) <-'---- (4) ----> (5)
```

And its transpose, $G^T$.

```text
      (0) <---- (1) <---- (2)
       | \     ^          ^
       |  \   /           |
       |   v /            |
      (3) ----> (4) <---- (5)
```

## Memory technique — remember this forever
1.  **Mnemonic**:
    *   **Kosaraju**: "Ko**sara**ju" sounds like "**Sara reverses**". This is the algorithm that **reverses** (transposes) the graph. It's two passes.
    *   **Tarjan**: "Tar**jan**" sounds like "**Tarzan**". Tarzan swings **low** on a vine. This is the algorithm that uses **low-link** values. It's a single, more complex pass.

2.  **Formulas/Facts to Overlearn**:
    *   **Kosaraju's Algorithm**:
        1.  Run DFS on $G$ to compute finishing times (or order).
        2.  Compute $G^T$.
        3.  Run DFS on $G^T$, visiting vertices in decreasing order of finishing times. Each tree in the DFS forest is an SCC.
    *   **Tarjan's SCC Condition**: A vertex $u$ is the root of an SCC if and only if `disc[u] == low[u]`.

3.  **Spaced Repetition Schedule**: Review your implementations and these notes at **1 day, 3 days, 7 days, 16 days, 35 days**. Do not just read; re-implement one of the algorithms from scratch on day 7.

4.  **First Principles Pathway**: If you forget Kosaraju's, rebuild it.
    *   Start with the insight: The component graph is a DAG.
    *   How do you find a node in a sink/source component? In a DAG, the last node to finish a DFS must be in a source node.
    *   So, a DFS on $G$ finds a node $v$ in a source SCC.
    *   How do you isolate just that SCC? If you reverse all the edges ($G \to G^T$), that source SCC becomes a sink SCC.
    *   A DFS started from $v$ in $G^T$ will explore exactly its SCC and nothing more, because there are no outgoing edges from a sink.
    *   This implies the full algorithm: find the order using $G$, then peel off SCCs using $G^T$.

## Common mistakes
1.  **Incorrect Order for Kosaraju's Second Pass**: Using the vertices in the order they were discovered (pre-order) instead of the order they were finished (post-order). The finishing order is non-negotiable.
2.  **Incorrect Low-Link Update in Tarjan's**: For an edge $u \to v$: if $v$ has been visited and is *on the recursion stack*, you update `low[u] = min(low[u], disc[v])`. If $v$ is visited but *not* on the stack, it belongs to a previously found SCC, so you do *not* use it to update `low[u]`. This distinction is critical.
3.  **Mishandling the Stack in Tarjan's**: Forgetting to push a node onto the stack when you first visit it, or popping incorrectly. You only pop nodes off the stack when an SCC root is identified, and you pop everything down to and including that root.

## Self-check
1.  Take the graph from the worked example and manually trace Tarjan's algorithm on it. Do you find the same three SCCs?
2.  A directed graph is a single cycle of $N$ vertices ($v_1 \to v_2 \to \dots \to v_N \to v_1$). What are its SCCs? Briefly describe how the finishing times in Kosaraju's first pass would be ordered.
3.  Can an SCC contain a bridge? (A bridge is an edge whose removal increases the number of connected components). Justify your answer for a directed graph.