## 1. The one-sentence answer
**Topological sort produces a linear ordering of vertices in a directed acyclic graph such that every directed edge u → v has u appearing before v in the ordering.**

A directed graph encodes precedence: an edge from task A to task B means A must finish before B can begin. When the graph contains no cycles, every such precedence constraint can be satisfied simultaneously by a single total order. Topological sort finds one such order (often many exist) by systematically respecting the direction of every edge.

Two standard algorithms achieve this. The DFS version records each vertex at the moment its entire outgoing subtree has been explored, then reverses the recording sequence. Kahn’s algorithm repeatedly removes vertices whose incoming edges have all been satisfied, using a queue to process them level by level. Both run in linear time and both fail exactly when a cycle is present.

> [!NOTE]
> The existence of a topological order is equivalent to acyclicity; detecting a cycle is therefore a byproduct of either algorithm.

## 2. Why this matters — concrete and current
In semiconductor place-and-route tools such as those inside Synopsys IC Compiler, gates and registers form a DAG whose edges represent timing paths; topological order determines the sequence in which static timing analysis propagates arrival times.

Apache Maven and Gradle build systems compute a topological order over Maven coordinates so that compilation, test, and packaging phases execute only after all declared dependencies have been satisfied.

Modern neural-network compilers such as MLIR and TensorFlow XLA represent operator graphs as DAGs; topological sort produces a valid execution schedule that respects data dependencies while exposing opportunities for operator fusion.

In aerospace flight-software build pipelines at NASA’s Jet Propulsion Laboratory, source modules are ordered by topological sort so that verification tools process modules only after all modules they import have already been type-checked.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Directed graph           | Topological order is defined only on directed edges       |
| Cycle detection          | The ordering exists if and only if the graph is acyclic   |
| Adjacency-list representation | Both algorithms traverse edges from each vertex        |
| Queue and stack          | Kahn’s algorithm uses a queue; DFS uses an implicit stack |
| Indegree array           | Kahn’s algorithm tracks unsatisfied incoming edges        |

## 4. Building the idea — from intuition to formalism

### Step 1 — A directed edge imposes a strict before/after constraint
An edge u → v means vertex u must appear before vertex v in any valid ordering.  
Example: vertices {A, B} with edge A → B yields the unique order A, B.  
Formally, a topological ordering is a bijection π : V → {1 … |V|} such that  
$$
(u,v)\in E \implies \pi(u) < \pi(v).
$$
> [!WARNING]
> Reversing the inequality produces an invalid ordering for the original graph.

### Step 2 — Cycles make any ordering impossible
If a directed cycle exists, at least one edge must point backward in any linear arrangement, violating the constraint.  
Example: A → B → A admits no ordering.  
The graph therefore admits a topological order if and only if it is a DAG.

### Step 3 — DFS finishing times encode reverse post-order
Perform a depth-first search; record each vertex when all its descendants have finished. Reversing that sequence yields a valid topological order.  
Formally, let f(v) be the finishing time of v. Then the order of decreasing f(v) is topological.

### Step 4 — Kahn’s algorithm peels sources layer by layer
A source has indegree zero. Removing it decreases the indegree of its neighbors. Repeating this process produces the ordering.  
Formally, maintain a queue Q of vertices with indegree 0; while Q is non-empty, dequeue u, append u to the order, and decrement indegrees of neighbors.

### Step 5 — Both algorithms run in Θ(V + E) time
Each vertex is enqueued or finished once; each edge is examined a constant number of times.

### Step 6 — The textbook statement of the result
A directed graph has a topological ordering if and only if it is acyclic. Both the DFS-based and Kahn’s algorithms compute such an ordering in linear time when the graph is acyclic (Cormen et al., *Introduction to Algorithms*, 4e, Ch. 22).

## 5. Worked examples — every step shown

**Example 1 — Two-node chain**  
*Given:* V = {1,2}, E = {(1,2)}.  
*Find:* Any topological order.  
DFS visits 1, recurses to 2, finishes 2 then 1; reverse finish times → 1,2.  
Kahn’s: indegrees [0,1]; start with 1, output 1, reduce 2’s indegree to 0, output 2.  
**1 2**  
*Reflection:* The single edge forces the only possible order; both algorithms recover it immediately.

**Example 2 — Diamond graph**  
*Given:* V = {A,B,C,D}, E = {A→B, A→C, B→D, C→D}.  
*Find:* A topological order.  
DFS finish times: D first, then B and C in either order, then A. Reverse → A,B,C,D (or A,C,B,D).  
Kahn’s queue begins with A; after A is removed both B and C become sources.  
**A B C D**  
*Reflection:* Multiple valid orders exist; the algorithm may return any of them.

**Example 3 — Graph with cycle**  
*Given:* V = {X,Y,Z}, E = {X→Y, Y→Z, Z→X}.  
*Find:* Decide whether a topological order exists.  
DFS detects back edge Z→X during recursion and reports a cycle.  
Kahn’s processes no vertex with indegree 0; after initialization the queue is empty while vertices remain, signalling a cycle.  
**No topological order exists**  
*Reflection:* Both algorithms serve as cycle detectors without extra machinery.

**Example 4 — Disconnected DAG**  
*Given:* Two separate edges 1→2 and 3→4.  
*Find:* One topological order.  
DFS may finish component {3,4} before {1,2}, producing 3,4,1,2. Kahn’s queue initially contains 1 and 3; the order depends on dequeue policy.  
**3 4 1 2**  
*Reflection:* Connectedness is unnecessary; each component contributes its own subsequence.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Returning an order when a cycle exists | Forgetting to verify that every vertex was placed | Count output vertices; if < |V| then cycle exists     |
| Using adjacency matrix without adjusting time bounds | Matrix scan costs O(V) per vertex           | Always prefer adjacency lists for sparse graphs      |
| Assuming a unique order           | Multiple sources or sinks exist             | Remember the problem asks only for one valid order   |
| Updating indegrees after DFS      | Confusing the two algorithms                | Compute indegrees only for Kahn’s                    |
| Treating undirected edges as directed | Input format ambiguity                      | Explicitly confirm every edge has a direction        |
| Starting DFS from a single vertex in a disconnected graph | Missing other components                    | Loop over all vertices and invoke DFS on unvisited ones |
| Storing finish times in a stack without reversing | Post-order already reversed relative to finish | Reverse the list or push onto a stack explicitly     |

## 7. The textbook-precise statement
Let G = (V,E) be a directed graph. A topological ordering of G is a bijection π : V → {1,…,|V|} such that (u,v) ∈ E implies π(u) < π(v). G admits a topological ordering if and only if G is acyclic. When G is acyclic, the following procedure produces such an ordering: run DFS and output vertices in order of decreasing finishing times; alternatively, repeatedly dequeue vertices of indegree zero while decrementing neighbor indegrees (Kahn’s algorithm). Both procedures run in Θ(V+E) time (Cormen et al., *Introduction to Algorithms*, 4e, §22.4).

## 8. Visual — diagram or schematic
```text
A ──► B ──► D
│           ▲
│           │
└──► C ─────┘
```
Nodes A,B,C,D; edges A→B, A→C, B→D, C→D.  
Valid topological orders include A,B,C,D and A,C,B,D. No edge points backward in either sequence.

## 9. The memory technique
1. **The hook** — Picture tasks lined up on a conveyor belt; each task can only step onto the belt after every prerequisite has already left the previous station.  
2. **What to overlearn** — A graph is a DAG ⇔ it possesses a topological order; both algorithms run in linear time; Kahn’s queue starts with all indegree-0 vertices.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by noting that every non-empty DAG has a source, remove it, and repeat; the removal sequence is the order.

## 10. What this unlocks
Mastery of topological sort supplies the ordering primitive required by critical-path scheduling, strongly-connected-component algorithms, and feedback-arc-set approximations.  
- Longest path in a DAG (dynamic programming)  
- Critical-path method in project networks  
- Kosaraju’s and Tarjan’s SCC algorithms  
- Instruction scheduling inside compilers

## 11. Self-check — five questions, no answers
1. Give a directed graph on four vertices that admits exactly two distinct topological orders.  
2. Show that the reverse of a topological order of G is a topological order of the transpose graph Gᵀ.  
3. Modify Kahn’s algorithm to report the length of the longest path from any source to each vertex.  
4. Prove that if a DFS on a directed graph produces a back edge, then the graph contains a cycle.  
5. Suppose a topological sort implementation returns an ordering that violates one edge; which invariant must have been broken?