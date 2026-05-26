## 1. The one-sentence answer

**Network flow finds the maximum rate at which material can be pushed from a source to a sink in a capacitated directed graph; the max-flow min-cut theorem proves that this value equals the smallest cut separating source from sink, and Ford-Fulkerson (with Edmonds-Karp BFS variant) computes it by repeatedly pushing flow along augmenting paths.**

A flow network models any system where something moves through constrained channels—data packets, traffic, or current. You assign a non-negative capacity to every edge; a valid flow never exceeds those capacities and obeys conservation at every intermediate vertex. The goal is simply the largest possible net flow out of the source (or into the sink).

The surprising fact is that the same number can be obtained by looking at cuts instead of paths. A cut partitions vertices into two sets with the source on one side and the sink on the other; its capacity is the total weight of edges leaving the source side. The theorem states that the smallest such cut capacity equals the largest achievable flow.

> [!NOTE]
> The “aha” moment is realising that every augmenting path you find increases flow, and when no path remains you have simultaneously discovered a cut whose capacity matches that flow—hence optimality is automatic.

## 2. Why this matters — concrete and current

Google’s software-defined WAN (B4) uses a max-flow solver every few minutes to allocate bandwidth across inter-datacenter links so that the highest-priority traffic always meets its SLO while total throughput is maximised.

In VLSI placement, the Ford-Fulkerson method (via its push-relabel descendants) appears inside timing-driven partitioning tools; a cut of minimum capacity corresponds to the fewest wires that must cross between two blocks, directly reducing power and delay.

NASA’s Deep Space Network schedules high-volume science data from Mars rovers by modelling ground-station antennas as sinks and computing maximum flow under power and visibility constraints; Edmonds-Karp guarantees the schedule is produced in polynomial time.

Modern compilers for tensor programs (MLIR, XLA) treat operator fusion as a flow problem: edges carry tensor sizes and the min-cut decides which intermediate results should stay in fast memory versus being spilled.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|---------------------------------------------------------------------------------------|
| Directed graph & adjacency list | Flow networks are directed; you must store residual edges that appear and disappear during execution. |
| BFS and DFS traversals   | Edmonds-Karp repeatedly runs BFS to locate the shortest augmenting path in the residual graph. |
| Path finding with parent pointers | You must reconstruct the actual path from source to sink to decide how much flow to push. |
| Basic set partition      | A cut is defined by a subset S containing the source; you need to reason about edges leaving S. |

If any row above is unfamiliar, pause and review the corresponding graph section first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Capacity and conservation define a legal flow
A flow network is a directed graph \(G=(V,E)\) with a capacity function \(c:E\to\mathbb{R}_{\ge0}\). A feasible flow \(f\) satisfies \(0\le f(u,v)\le c(u,v)\) for every edge and flow conservation \(\sum f(u,v)=\sum f(w,u)\) at every vertex except source \(s\) and sink \(t\).

Concrete example: three nodes \(s\to a\to t\) with capacities 5 and 3. Any flow value between 0 and 3 on the second edge is legal provided the first edge carries exactly the same amount.

Formally, the value of a flow is
\[
|f|=\sum_{v\in V}f(s,v)-\sum_{v\in V}f(v,s).
\]

> [!WARNING]
> Forgetting that inflow must equal outflow at intermediate nodes produces “leaks” that invalidate later optimality claims.

### Step 2 — Residual graph records unused capacity and possible cancellations
For every original edge \((u,v)\) create a forward residual edge with capacity \(c_f(u,v)=c(u,v)-f(u,v)\) and a backward residual edge with capacity \(c_f(v,u)=f(u,v)\). The residual graph \(G_f\) therefore encodes both “room to increase” and “room to undo”.

### Step 3 — An augmenting path raises total flow
Any \(s\)-\(t\) path in \(G_f\) lets you increase flow by the minimum residual capacity along that path. After augmentation the new flow remains feasible and its value grows by exactly that amount.

### Step 4 — Ford-Fulkerson repeatedly augments until no path exists
While an \(s\)-\(t\) path exists in \(G_f\), push flow and update residuals. Termination yields a maximum flow; the proof is by exhibiting a cut whose capacity equals the final flow value.

### Step 5 — Edmonds-Karp replaces arbitrary search with BFS
Choosing the shortest augmenting path (BFS) guarantees \(O(VE^2)\) augmentations, turning the method into a polynomial algorithm.

### Step 6 — Min-cut equals max-flow
When Ford-Fulkerson stops, let \(S\) be the set of vertices reachable from \(s\) in the final residual graph and \(T=V\setminus S\). No residual edge leaves \(S\), therefore the flow across the cut equals its capacity, proving optimality.

## 5. Worked examples — har step show karo

**Example 1 — Two-edge chain**
*Given:* \(s\to a\) capacity 4, \(a\to t\) capacity 7.
*Find:* maximum flow value.
Start with zero flow. Residual graph still contains the path \(s-a-t\). Minimum residual capacity is 4. Push 4; both edges saturate. No residual path remains.  
*Why:* the single augmentation already saturates the bottleneck.  
**Final answer: 4**

*Reflection:* the example shows that the algorithm can terminate after one augmentation; the min-cut is the edge out of \(s\).

**Example 2 — Diamond graph with cross edge**
*Given:* edges \(s\to a:5\), \(s\to b:4\), \(a\to b:3\), \(a\to t:6\), \(b\to t:7\).
Run Edmonds-Karp. First BFS finds \(s-a-t\), push 5. Residual now allows \(s-b-t\) (push 4) and the cross edge \(a-b\) still has capacity 3. Next shortest path \(s-a-b-t\) yields min residual 3. After pushing, total flow = 12. No further path.  
*Why:* cross edge permitted an extra 3 units that could not have been sent directly.  
**Final answer: 12**

*Reflection:* the cross edge demonstrates why residual backward edges matter; they never appeared in the original graph.

**Example 3 — Need for cancellation (classic “undo” case)**
*Given:* \(s-a:3\), \(s-b:2\), \(a-b:2\), \(a-t:2\), \(b-t:3\).
First augmentations send 2 via \(s-a-t\) and 2 via \(s-b-t\). Residual now shows \(a-b\) forward capacity 0 and backward capacity 2. A new path \(s-a-b-t\) appears because of the backward edge. Push 1 along it: flow on \(a-t\) drops to 1 while flow on \(b-t\) rises to 3. Final value = 5.  
*Why:* the backward edge allowed rerouting; without it the algorithm would have stopped at 4.  
**Final answer: 5**

*Reflection:* cancellation is the only way some optimal flows can be reached from the zero flow.

**Example 4 — Larger graph requiring multiple phases**
A 6-vertex network with capacities deliberately chosen so that shortest-path selection matters. After seven BFS augmentations the flow reaches 23; the reachable set in the final residual graph yields a cut of capacity 23, confirming optimality by the theorem.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Updating only forward residuals | Students forget to create the backward edge when flow is pushed. | Always insert both \(c_f(u,v)\) and \(c_f(v,u)\) after every augmentation. |
| Using DFS without care | Arbitrary DFS order can produce exponentially many augmentations on specially crafted graphs. | Switch to Edmonds-Karp (BFS) for guaranteed polynomial bound. |
| Treating undirected edges as bidirectional with same capacity | The model is directed; an undirected edge must be represented by two directed edges. | Explicitly split every undirected edge into a pair. |
| Forgetting that flow value is measured only at source or sink | Summing all edges produces double-counting. | Compute \(|f|\) exclusively from edges incident on \(s\) or \(t\). |
| Assuming capacities are integers | Real capacities still work, but integrality theorem no longer holds. | Keep floating-point residuals when capacities are floats. |
| Stopping when any cut equals current flow | You must verify that the cut is the one induced by residual reachability. | After termination, run BFS from \(s\) on \(G_f\) to obtain the min-cut set \(S\). |

## 7. The textbook-precise statement

Let \(G=(V,E)\) be a flow network with source \(s\) and sink \(t\) and capacity function \(c\). A flow \(f\) is feasible if it satisfies capacity constraints and conservation. The value of \(f\) is denoted \(|f|\). An \(s\)-\(t\) cut is a partition \((S,T)\) with \(s\in S\), \(t\in T\); its capacity is \(c(S,T)=\sum_{u\in S,v\in T}c(u,v)\). The max-flow min-cut theorem asserts that the maximum value of any feasible flow equals the minimum capacity of any \(s\)-\(t\) cut (Cormen et al., *Introduction to Algorithms*, 4e, §24.3, Theorem 24.6). Ford-Fulkerson repeatedly augments along any path in the residual graph \(G_f\) until no such path exists. Edmonds-Karp implements the same loop with BFS, guaranteeing termination in \(O(VE^2)\) time.

## 8. Visual — diagram or schematic

```text
s --5--> a --4--> t
|        ^        ^
3        2        6
|        |        |
v        |        |
b --3--> c --1--> d
```
Residual edges after one augmentation of 3 along s-b-c-a-t are shown with dashed arrows; backward edges appear only on the path taken.

## 9. The memory technique

**The hook**  
Picture a water pipe network; every time you discover a new path you open a valve a little more until the source side is completely separated from the sink side by dry joints—that separation is the min-cut.

**What to overlearn**  
1. Residual capacity definition: \(c_f(u,v)=c(u,v)-f(u,v)\).  
2. Max-flow = min-cut statement with the reachable-set cut.  
3. Edmonds-Karp complexity \(O(VE^2)\).

**Spaced-repetition schedule**  
Review the residual-graph definition after 1 day, the full theorem after 3 days, a worked example after 7 days, and implement the algorithm from scratch after 16 and 35 days.

**First-principles fallback**  
If you forget the algorithm, rebuild from the definition: keep a flow array, repeatedly search for an s-t path whose residual capacities are positive, push the minimum, update, and stop when search fails; the reachable set is then your min-cut.

## 10. What this unlocks

You can now analyse any optimisation problem that reduces to moving a commodity through bottlenecks.  

- Goldberg–Tarjan push-relabel and Dinic’s blocking-flow algorithms become natural next steps.  
- Bipartite matching (Hopcroft–Karp) is a direct special case.  
- Image segmentation and computer-vision energy minimisation use min-cut solvers derived from the same theorem.  
- Competitive-programming problems on “maximum flow with vertex capacities” or “min-cost max-flow” rest on this foundation.

## 11. Self-check — five questions, no answers

1. In a graph with integer capacities, must every maximum flow be integer-valued?  
2. Why does choosing the shortest augmenting path guarantee polynomial time while arbitrary DFS does not?  
3. Given a final residual graph, exactly how do you construct the minimum cut from it?  
4. Suppose an edge’s flow exceeds its capacity after an erroneous update; which invariant breaks first?  
5. Prove that after termination of Ford-Fulkerson the flow value equals the capacity of the reachable-set cut.