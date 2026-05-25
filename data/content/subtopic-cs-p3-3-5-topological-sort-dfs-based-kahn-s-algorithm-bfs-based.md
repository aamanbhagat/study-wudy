## What it is
A topological sort of a Directed Acyclic Graph (DAG) is a linear ordering of its vertices such that for every directed edge from vertex $u$ to vertex $v$, vertex $u$ comes before vertex $v$ in the ordering. It's essentially a valid sequence for performing a set of tasks that have dependencies on each other. If a graph contains a cycle, no such ordering is possible.

## Why it matters
Topological sort is the fundamental algorithm for dependency resolution. In Computer Science, it's used in build systems (`make`), package managers (`pip`, `npm`), and task schedulers. In Machine Learning, deep neural networks are DAGs, and a topological sort determines the order of execution for forward and backward propagation. In aerospace, it's critical for mission planning and launch sequencing, where steps like "ignite stage 1" must precede "separate stage 1".

## When to study it
Before tackling this, you must be comfortable with the following. If not, master them first.
*   **Graph Representations:** Adjacency lists and adjacency matrices. We will primarily use adjacency lists.
*   **Graph Traversal:** You must have a solid implementation-level understanding of Depth-First Search (DFS) and Breadth-First Search (BFS).
*   **Graph Concepts:** Understand vertices, edges, directed vs. undirected graphs, and what constitutes a cycle. You must know what a Directed Acyclic Graph (DAG) is.
*   **Data Structures:** Queues (for Kahn's) and stacks/recursion (for DFS).

## How to study it (step by step)
1.  **Draw a DAG:** On paper, draw a graph representing dependencies for getting dressed: `underwear -> pants`, `pants -> shoes`, `socks -> shoes`, `shirt -> jacket`, `pants -> belt`, `shirt -> belt`. This is your test case.
2.  **Trace Kahn's Algorithm (BFS):** Calculate the in-degree of every node. Create a queue and add all nodes with an in-degree of 0. Manually execute the algorithm: pull a node from the queue, add it to your sorted list, and "erase" its outgoing edges by decrementing the in-degree of its neighbors. Add any neighbor to the queue if its in-degree becomes 0.
3.  **Trace the DFS Algorithm:** Pick an unvisited starting node. Perform a DFS from it. Use a stack (or recursion) to keep track of the path. When a node's entire subtree has been explored (it's "finished"), push it onto a results stack. After traversing the whole graph, the popped order from the results stack is the topological sort.
4.  **Implement Kahn's Algorithm:** Write the code for Kahn's algorithm. Use a hash map to store in-degrees and a queue for sources. Test it on your drawing.
5.  **Implement the DFS-based Algorithm:** Write the code for the recursive DFS-based topological sort. Use a set or array to track visited states. Test it on your drawing.
6.  **Introduce a Cycle:** Add the edge `belt -> pants` to your drawing. Re-run both algorithms by hand. Observe how Kahn's algorithm finishes with fewer nodes than the total, and how the DFS algorithm revisits a node currently in the recursion stack. This is how they detect cycles.
7.  **Solve a Problem:** Solve "Course Schedule II" on LeetCode (problem 210). This requires you to produce a valid topological sort or determine if one is impossible.

## Key ideas, with intuition
1.  **The Prerequisite Principle:** The core of topological sort is respecting dependencies. If there's an edge $u \to v$, it means "$u$ must be done before $v$". A valid sort is any sequence that doesn't violate this rule for any edge in the graph.

2.  **Kahn's Algorithm (BFS): The "Ready to Go" List**
    *   **Intuition:** Imagine a list of university courses and their prerequisites. Which courses can you take right now? The ones with no prerequisites. In graph terms, these are the nodes with an in-degree of 0.
    *   **Mechanism:** Kahn's algorithm maintains a collection (a queue) of all nodes that are currently ready to be processed (in-degree is 0). It processes one such node $u$, adds it to the final sorted list, and then effectively "completes" it. By completing $u$, we satisfy one prerequisite for all its neighbors $v$. We represent this by decrementing the in-degree of each $v$. If any neighbor's in-degree drops to 0, it now has all its prerequisites met, and we add it to the "ready to go" queue.
    *   **Cycle Detection:** If the graph has a cycle, the nodes in the cycle will forever be waiting for each other. Their in-degrees will never drop to 0, so they will never enter the queue. The algorithm finishes, but the length of the sorted list will be less than the total number of nodes in the graph.

3.  **DFS-based Algorithm: The Last One Finished is the First Prerequisite**
    *   **Intuition:** Consider a recursive function call `DFS(u)`. This call will not return until it has recursively called `DFS(v)` for all of its neighbors $v$. This means a node `u` is only "finished" *after* all of its descendants in the DFS tree are finished.
    *   **Mechanism:** A node $u$ that has many dependencies on it (e.g., `a \to u`, `b \to u`) can only be finished after `a` and `b` are explored. Conversely, a node `v` with no outgoing edges can be finished immediately. The vertex that finishes last in the entire DFS traversal must be a source of the graph (or one of them). Therefore, if we record vertices in the reverse order of their finishing times, we get a valid topological sort.
    *   **Implementation:** We perform a standard DFS. When a vertex `u` is finished (i.e., all its neighbors have been visited and its recursive call is about to return), we prepend it to our result list (or add to a stack and reverse later).
    *   **Cycle Detection:** A cycle exists if our DFS traversal from a node `u` encounters a node `v` that is currently in the recursion stack (i.e., it's an ancestor of `u`). We can track this with three states: unvisited, visiting, and visited. Encountering a "visiting" node means we've found a back edge, which implies a cycle.

## Worked example
Let's find a topological sort for this graph representing project tasks.

**Graph:**
*   A -> C
*   B -> C
*   B -> D
*   C -> E
*   D -> F
*   E -> F

### Kahn's Algorithm (BFS-based)

1.  **Compute In-degrees:**
    *   A: 0
    *   B: 0
    *   C: 2 (from A, B)
    *   D: 1 (from B)
    *   E: 1 (from C)
    *   F: 2 (from D, E)

2.  **Initialize Queue:** Add all nodes with in-degree 0.
    *   `Queue: [A, B]`
    *   `Sorted List: []`

3.  **Process A:** Dequeue A. Add to list. Decrement neighbors' in-degrees.
    *   `Queue: [B]`
    *   `Sorted List: [A]`
    *   In-degree of C becomes $2-1=1$.

4.  **Process B:** Dequeue B. Add to list. Decrement neighbors' in-degrees.
    *   `Queue: []`
    *   `Sorted List: [A, B]`
    *   In-degree of C becomes $1-1=0$. Enqueue C.
    *   In-degree of D becomes $1-1=0$. Enqueue D.
    *   `Queue: [C, D]`

5.  **Process C:** Dequeue C. Add to list. Decrement neighbors' in-degrees.
    *   `Queue: [D]`
    *   `Sorted List: [A, B, C]`
    *   In-degree of E becomes $1-1=0$. Enqueue E.
    *   `Queue: [D, E]`

6.  **Process D:** Dequeue D. Add to list. Decrement neighbors' in-degrees.
    *   `Queue: [E]`
    *   `Sorted List: [A, B, C, D]`
    *   In-degree of F becomes $2-1=1$.

7.  **Process E:** Dequeue E. Add to list. Decrement neighbors' in-degrees.
    *   `Queue: []`
    *   `Sorted List: [A, B, C, D, E]`
    *   In-degree of F becomes $1-1=0$. Enqueue F.
    *   `Queue: [F]`

8.  **Process F:** Dequeue F. Add to list.
    *   `Queue: []`
    *   `Sorted List: [A, B, C, D, E, F]`

9.  **Finish:** Queue is empty. The sorted list has all 6 nodes. A valid sort is `A, B, C, D, E, F`.
    *   *Reflection:* This worked because we only ever added a task to our list after its prerequisites (A and B for C) were completed, ensuring the dependency order was always respected.

### DFS-based Algorithm

1.  **Initialize:** `visited` set is empty. `result` stack is empty.
2.  **Start DFS from A:**
    *   `DFS(A)`: Mark A as visiting. Look at neighbors.
    *   `DFS(C)`: Mark C as visiting. Look at neighbors.
    *   `DFS(E)`: Mark E as visiting. Look at neighbors.
    *   `DFS(F)`: Mark F as visiting. F has no unvisited neighbors. Mark F as visited. **Push F to result stack.** `Stack: [F]`. Return.
    *   Back in `DFS(E)`. E has no more neighbors. Mark E as visited. **Push E to result stack.** `Stack: [F, E]`. Return.
    *   Back in `DFS(C)`. C has no more neighbors. Mark C as visited. **Push C to result stack.** `Stack: [F, E, C]`. Return.
    *   Back in `DFS(A)`. A has no more neighbors. Mark A as visited. **Push A to result stack.** `Stack: [F, E, C, A]`. Return.
3.  **Main loop:** A is done. Is there another unvisited node? Yes, B.
4.  **Start DFS from B:**
    *   `DFS(B)`: Mark B as visiting. Look at neighbors. C is visited. Look at D.
    *   `DFS(D)`: Mark D as visiting. Look at neighbors. F is visited. D has no more unvisited neighbors. Mark D as visited. **Push D to result stack.** `Stack: [F, E, C, A, D]`. Return.
    *   Back in `DFS(B)`. B has no more neighbors. Mark B as visited. **Push B to result stack.** `Stack: [F, E, C, A, D, B]`. Return.
5.  **Finish:** All nodes visited. Pop from stack to get the final order.
    *   **Result: `B, D, A, C, E, F`**

*Reflection:* This also produced a valid sort. Notice that F, the ultimate sink, was the first to be pushed to the stack (finished first), and sources like A and B were pushed last (finished last). Popping the stack reverses this, giving a correct ordering. Note that `A, B, C, D, E, F` and `B, A, D, C, E, F` are also valid sorts, depending on traversal order.

## Diagrams
```text
      (A) -----> (C)
                 / \
                /   \
               /     \
              /       v
(B) -----> (D) -----> (F)
 \                 ^
  \               /
   \-------------/
       (E) <----/
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    *   **Kahn's (BFS):** "The Cafeteria Line". You can only get food (enter the queue) if you have no one in front of you (in-degree is 0). Once you get your food (get dequeued), everyone directly behind you moves up one step (their in-degree decrements).
    *   **DFS:** "The Procrastinator's To-Do List". You start a big task `A`, but see it requires `C`. You start `C`, but see it requires `E`. You do `E` first. Once `E` is done, you write it at the *bottom* of a "Done" list. Then you finish `C` and write it above `E`. Finally, you finish `A` and write it at the top. The final valid order is reading the "Done" list from top to bottom.

2.  **Must overlearn:**
    *   **Kahn's:** (1) Compute in-degrees. (2) Init queue with in-degree=0 nodes. (3) Loop: dequeue `u`, add to sort, for each neighbor `v` of `u`: `in_degree[v]--`, if `in_degree[v] == 0` enqueue `v`.
    *   **DFS:** For each vertex `u`: `DFS(u)`. In `DFS(u)`: for each neighbor `v`: `DFS(v)`. After the loop, `u` is finished. Prepend `u` to the sorted list.

3.  **Spaced Repetition Schedule:** Review this material in 1 day, 3 days, 7 days, 16 days, and 35 days. Each time, re-derive one of the algorithms on paper.

4.  **First Principles Pathway:** If you forget the steps, remember the goal: For any edge $u \to v$, $u$ must appear before $v$.
    *   How can I find a node to put *first* in the list? It must be a node with no prerequisites. This is a node with in-degree 0. This insight rebuilds Kahn's algorithm.
    *   How can I find a node to put *last* in the list? It must be a node that isn't a prerequisite for anything. This is a node with out-degree 0. A DFS explores deeply; the very last node to finish its recursive call must be a node `u` where all nodes reachable from `u` are already finished. This means `u` can come before them. Reversing the finish times rebuilds the DFS algorithm.

## Common mistakes
*   **DFS: Forgetting to reverse.** The DFS finishing order is the *reverse* of a topological sort. A common bug is to append nodes as they finish instead of prepending (or using a stack).
*   **Kahn's: Enqueuing too early.** In Kahn's algorithm, you only enqueue a neighbor `v` when its in-degree becomes *exactly* zero. Adding it to the queue before all its prerequisites are met is a fatal flaw.
*   **Handling Disconnected Graphs:** Forgetting that the graph might have multiple components. Your main loop must iterate through *all* vertices in the graph, calling your traversal (`DFS` or seeding the initial Kahn's `queue`) on any that haven't been visited yet.
*   **Assuming a DAG:** Applying these algorithms to a graph with a cycle without proper cycle detection. The algorithm will produce an incorrect result (Kahn's) or infinitely recurse (naive DFS).

## Self-check
1.  Given the graph `1->2`, `1->3`, `2->4`, `3->4`, list all possible valid topological sorts.
2.  Can the output of a topological sort be used to find the longest path in a DAG? If so, briefly explain the algorithm.
3.  Describe how to modify the DFS-based topological sort to not only detect that a cycle exists, but to also return the list of nodes that form the cycle. (Hint: think about the state of the recursion stack when a back edge is found).