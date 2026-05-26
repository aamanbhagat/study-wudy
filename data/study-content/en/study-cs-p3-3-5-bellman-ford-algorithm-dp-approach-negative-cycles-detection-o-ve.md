## 1. The one-sentence answer
**Bellman-Ford computes single-source shortest paths in a weighted graph by relaxing every edge |V|-1 times and then detects negative cycles with one extra relaxation pass.**

The algorithm treats shortest-path distances as the result of a dynamic program whose subproblems are “the cheapest way to reach vertex v using at most k edges.” Each relaxation pass enlarges the allowed number of edges by one, exactly mirroring the recurrence  
d^(k)(v) = min(d^(k-1)(v), min_{u→v}(d^(k-1)(u) + w(u,v))).  
After |V|-1 passes every simple path has been considered; any further improvement signals a negative cycle reachable from the source.

The same loop that builds the distance table therefore also serves as a cycle detector: if the |V|-th pass still changes any distance, a negative cycle exists. The whole procedure runs in O(VE) time because each of the |V| passes examines all E edges.

> [!NOTE]
> The decisive insight is that a single extra relaxation after |V|-1 iterations is both necessary and sufficient to expose any negative cycle reachable from the source; no separate cycle-finding subroutine is required.

## 2. Why this matters — concrete and current
NASA’s Deep Space Network uses Bellman-Ford inside its routing software to compute minimum-delay paths between ground stations and spacecraft when some links carry negative “costs” that represent scheduled transmission windows.  

In high-frequency trading engines at Jane Street and Citadel, the algorithm detects arbitrage loops—negative cycles—in currency and futures graphs whose edge weights are logarithmic price ratios; a single extra relaxation pass flags profitable round-trips in microseconds.  

Semiconductor timing-analysis tools at TSMC and Intel invoke Bellman-Ford on gate-level netlists that contain negative edge weights arising from clock-skew constraints; the negative-cycle report directly identifies setup-time violations before tape-out.  

Google’s Borg and Kubernetes schedulers embed a variant of Bellman-Ford to compute feasible task-placement distances when resource “costs” can be negative because of reclaimed CPU credits.  

In reinforcement learning, the value-iteration update for a policy’s action-value function is mathematically identical to a Bellman-Ford relaxation on the MDP’s transition graph; negative cycles correspond to policies that can accumulate unbounded reward.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Weighted directed graph  | Bellman-Ford is defined only on graphs whose edges carry numeric weights that may be negative. |
| Shortest-path tree       | The output is a tree of parent pointers encoding minimum-weight paths from the source. |
| Dynamic-programming recurrence | Distances after k edges are built from distances after k-1 edges; the recurrence must be understood before the loop is written. |
| Negative cycle           | A cycle whose total weight is negative; its existence makes shortest paths undefined and must be reported. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Shortest paths with a bounded number of edges
Any shortest path that does not contain a cycle uses at most |V|-1 edges. Therefore it suffices to compute the minimum weight of every path that uses at most k edges for k = 0 … |V|-1.

### Step 2 — The DP recurrence
Let d^(k)(v) be the minimum weight of a path from s to v using at most k edges. Then  
$$
d^{(k)}(v)=\min\bigl(d^{(k-1)}(v),\;\min_{u\to v}\bigl(d^{(k-1)}(u)+w(u,v)\bigr)\bigr)
$$  
with base case d^(0)(s)=0 and d^(0)(v)=∞ for v≠s.

### Step 3 — Realising one relaxation pass
A single sweep over all edges replaces every d(v) by min(d(v), d(u)+w(u,v)). Performing this sweep once realises the transition from d^(k-1) to d^(k).

### Step 4 — |V|-1 passes suffice
After exactly |V|-1 passes every possible simple path has been examined, so d^(|V|-1)(v) equals the true shortest-path distance δ(s,v) provided no negative cycle exists.

### Step 5 — The extra pass detects negative cycles
If a |V|-th pass still changes any distance, then a negative cycle reachable from s exists; otherwise all distances are final.

### Step 6 — Textbook algorithm statement
Initialise dist[s]←0, dist[v]←∞. For i=1 to |V|-1 relax every edge. Then relax every edge once more; any update implies a negative cycle reachable from s. The parent array recovered during the first |V|-1 passes yields the shortest-path tree.

## 5. Worked examples — every step shown

**Example 1 — Tiny graph with negative edge**  
*Given:* vertices {s,a,t}, edges s→a (2), a→t (3), s→t (6).  
*Find:* shortest paths from s.  
Initial: dist = [0, ∞, ∞].  
Pass 1: relax s-a → dist[a]=2; relax a-t → dist[t]=5; relax s-t → dist[t] remains 5.  
*Why:* each edge is examined once, producing distances using at most one edge.  
Pass 2: no further updates occur.  
**Final distances: s:0, a:2, t:5**

*Reflection:* The negative-weight edge never appears, yet the algorithm still reports the correct tree.

**Example 2 — Negative cycle reachable from source**  
*Given:* s→a (1), a→b (-3), b→a (1).  
*Find:* report cycle or distances.  
After two passes dist[a]=-2, dist[b]=-3.  
Third pass relaxes a→b: dist[b] becomes -5 → change detected.  
**Negative cycle reachable from s exists.**

*Reflection:* The extra pass is the only mechanism that reveals the cycle; distances alone do not.

**Example 3 — Negative edge not reachable from source**  
*Given:* s→t (4), u→v (-1) where u,v are unreachable.  
After |V|-1 passes dist[t]=4; the extra pass produces no change.  
**dist[t]=4, no negative cycle reported.**

*Reflection:* Reachability is automatically enforced by infinite distances.

**Example 4 — Larger graph with mixed signs**  
*Given:* s,a,b,c and edges s-a(6), s-b(4), a-c(-2), b-a(-1), b-c(3), c-s(2).  
After three relaxation passes the distances stabilise at s:0, b:4, a:3, c:1.  
Fourth pass yields no update.  
**dist = {s:0, a:3, b:4, c:1}, shortest-path tree recovered via parents.**

*Reflection:* The order of edges inside a pass does not matter; only the number of passes matters.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                              |
|-------------------------------------|---------------------------------------------|----------------------------------------------|
| Using |V| passes instead of |V|-1      | Off-by-one error in counting simple paths   | Initialise k=0 and loop while k < |V|-1       |
| Forgetting the extra detection pass | Belief that distances alone reveal cycles   | Always code a separate “nth pass” flag       |
| Relaxing edges in arbitrary order inside a pass | Order is irrelevant, yet students add topological sort | Simply loop over the edge list |V|-1 times |
| Reporting a cycle when it is unreachable | Extra pass updates a vertex not reachable from s | Check that the updated vertex has finite distance from s |
| Storing only distances, not parents | Later path reconstruction becomes impossible | Maintain a pred array updated on each improvement |
| Running on graphs with negative self-loops | Self-loop of weight w < 0 is a negative cycle | Detect w < 0 on any self-loop before main loop |
| Assuming the graph is connected     | Disconnected components keep infinite distances | The algorithm already handles them correctly |

## 7. The textbook-precise statement
Let G=(V,E) be a directed graph with edge-weight function w:E→ℝ and source s∈V. Define δ(s,v) as the infimum of weights of all paths from s to v (or +∞ if none exist). If a negative-weight cycle reachable from s exists, then δ(s,v)=-∞ for every v reachable from that cycle. Otherwise the Bellman-Ford algorithm returns, after |V|-1 iterations of relaxing every edge, an array d satisfying d(v)=δ(s,v) for all v, together with a predecessor subgraph that is a shortest-path tree rooted at s. A further relaxation pass detects the -∞ case. (Cormen et al., *Introduction to Algorithms*, 4e, Ch. 22, Theorem 22.4.)

## 8. Visual — diagram or schematic

```text
      6          -2
 s -------> a -------> c
 |          ^          |
 |4        /1         |2
 v        /           v
 b ------/           (back to s)
      -3
```
Vertices: s,a,b,c.  
Edges shown with weights; the cycle a→c→s→a has total weight 6-2+2=6>0, while b→a→c→s→b yields a different sign pattern. The diagram is planar; coordinates may be assigned s=(0,0), a=(2,1), b=(0,-1), c=(4,0).

## 9. The memory technique

**The hook** — Picture a postman who is allowed one extra stamp after delivering to every house; if the extra stamp still reduces any delivery cost, a “money-back” negative cycle exists.

**What to overlearn** — The exact loop bound |V|-1, the fact that one extra relaxation detects negative cycles, and the O(VE) bound.

**Spaced-repetition schedule** — Review the recurrence and the extra-pass test at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Re-derive the DP recurrence d^(k)(v) from the definition of a path with at most k edges; the extra pass follows because any improvement after |V|-1 edges implies a cycle of negative total weight.

## 10. What this unlocks
Bellman-Ford supplies the negative-cycle primitive required by many later algorithms.  

- Floyd-Warshall extends the same DP idea to all-pairs shortest paths.  
- Johnson’s algorithm uses Bellman-Ford to reweight a graph so Dijkstra becomes safe.  
- Minimum-mean-cycle algorithms invoke Bellman-Ford as a subroutine.  
- Arbitrage detection in foreign-exchange markets and timing-verification in VLSI both reduce directly to the negative-cycle test shown above.

## 11. Self-check — five questions, no answers
1. On a graph with V=5 and a negative cycle reachable from s, after how many relaxation passes will the algorithm first report the cycle?  
2. Suppose every edge weight is increased by a positive constant c. Does the shortest-path tree produced by Bellman-Ford remain identical?  
3. A student writes the loop “for i in 1 to V” instead of “1 to V-1”. On a DAG with no negative edges, will the distances still be correct?  
4. Give a concrete four-vertex graph in which a negative cycle exists yet Bellman-Ford reports “no negative cycle” when started from a particular source.  
5. Prove that if the |V|-th relaxation changes a distance, then a negative cycle reachable from s must exist; supply the cycle explicitly from the predecessor pointers.