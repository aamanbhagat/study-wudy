## 1. The one-sentence answer
**Dijkstra's algorithm** finds shortest paths from a single source vertex to all other vertices in a graph whose edge weights are non-negative by repeatedly selecting the unsettled vertex with the smallest tentative distance.

The algorithm maintains a distance array that starts with infinity everywhere except the source (distance 0). At every step it picks the vertex u whose current distance label is smallest among all vertices still outside the settled set, then relaxes every outgoing edge from u. Because edge weights never go negative, once a vertex is settled its distance label is guaranteed to be optimal and never changes again.

This greedy selection is implemented with a priority queue so that the next minimum-distance vertex can be extracted efficiently. The resulting time complexity with a binary heap is O((V + E) log V).

> [!NOTE]
> The single “aha” moment is realizing that non-negative weights turn the greedy choice into an irrevocable optimality proof: the first time you extract a vertex from the priority queue, its distance cannot be improved later.

## 2. Why this matters — concrete and current
Google Maps and Uber routing engines run a variant of Dijkstra (or its bidirectional and A* extensions) on road networks containing tens of millions of vertices; negative weights never appear because travel times are positive.

In semiconductor design, static timing analysis tools at TSMC and Intel use Dijkstra to compute the longest path (by negating delays) through gate-level netlists so that clock-period constraints can be verified before tape-out.

NASA’s Mars Perseverance rover flight software employs a Dijkstra-based planner on a 3-D terrain graph to select energy-optimal trajectories between waypoints when solar power and battery levels are limited.

Modern reinforcement-learning libraries such as Stable-Baselines3 and RLlib internally call Dijkstra on the state-transition graph of deterministic MDPs to compute exact value functions during planning phases before function-approximation begins.

Packet-switching routers from Cisco and Juniper run a constrained shortest-path variant of Dijkstra for MPLS traffic-engineering tunnels where latency and bandwidth are treated as additive non-negative metrics.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Graph representation     | Adjacency list stores outgoing edges so relaxation can iterate in O(deg(u)) time.    |
| Priority queue           | Needed to repeatedly extract the unsettled vertex with minimum distance label.       |
| Relaxation operation     | The only way to improve a distance label: dist[v] = min(dist[v], dist[u] + w(u,v)). |
| Non-negative weights     | Guarantees that once a vertex is extracted its distance is optimal forever.          |

If any row above is unfamiliar, pause and master that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Formal problem statement
We are given a weighted directed graph G = (V, E) with weight function w : E → ℝ and a source s ∈ V. We want the shortest-path distances δ(s, v) for every v ∈ V, where δ(s, v) is the infimum of the sums of edge weights along any path from s to v.  
**Example.** In a graph with vertices {s, a, b} and edges s→a (2), s→b (5), a→b (1), the shortest-path distances are δ(s,s)=0, δ(s,a)=2, δ(s,b)=3.  
Formal statement:  
$$
\delta(s,v)=\min\{\,w(p)\mid p\text{ is a path from }s\text{ to }v\,\}\quad\text{or }\infty\text{ if no path exists.}
$$
> [!WARNING]
> If any edge weight is negative, the above minimum may be −∞ (negative cycle) and the greedy argument collapses.

### Step 2 — Greedy choice property
Because all weights are non-negative, the shortest path to any vertex v can be formed by extending a shortest path to some predecessor u and then taking the edge (u,v). Therefore the vertex with the globally smallest tentative distance among unsettled vertices can be settled permanently.  
**Example.** After settling s (distance 0) the unsettled distances are a:2 and b:5; settling a next is safe because no future path can reduce it.  
Formal statement: if u is the unsettled vertex with smallest dist[u], then dist[u] = δ(s,u).

### Step 3 — Relaxation primitive
For every edge (u,v) we perform  
$$
\text{dist}[v] \leftarrow \min(\text{dist}[v],\ \text{dist}[u] + w(u,v)).
$$
Each relaxation can only decrease dist[v] and never increases it.  
**Example.** When u = a is settled, relaxing a→b changes dist[b] from 5 to 3.  
> [!WARNING]
> Relaxing an edge whose tail has not yet been settled can produce a temporarily wrong value that must be corrected later; only the priority queue order guarantees final correctness.

### Step 4 — Priority-queue maintenance
Initialize dist[s] = 0 and dist[v] = ∞ for v ≠ s. Insert every vertex into a min-priority queue keyed by its current dist value. While the queue is non-empty, extract-min yields the next vertex u to settle; then relax all outgoing edges of u and, if any dist label decreases, decrease-key the affected neighbor.  
Formal loop invariant: at the moment u is extracted, dist[u] = δ(s,u).

### Step 5 — Complexity with binary heap
Each of the V extract-min operations costs O(log V). Each of the E edges triggers at most one decrease-key costing O(log V). Hence total time is  
$$
O((V+E)\log V).
$$

### Step 6 — Termination and correctness
When the priority queue empties, every reachable vertex has been settled exactly once and its distance label equals the true shortest-path distance. The proof follows by induction on the order of extraction using the greedy choice property.

## 5. Worked examples — har step show karo

**Example 1 — Three-vertex chain**  
*Given:* vertices {s,a,t}, edges s→a (4), a→t (3).  
*Find:* shortest-path distances from s.  
Initialize: dist = {s:0, a:∞, t:∞}, PQ contains all three.  
Extract s (0). Relax s→a → dist[a]=4.  
Extract a (4). Relax a→t → dist[t]=7.  
Extract t (7).  
**Final distances:** {s:0, a:4, t:7}.  
*Why each move:* extract-min always yields the next optimal vertex; relaxation updates the only possible improving edge.  
**Reflection:** The example is trivial yet shows that the algorithm never revisits a settled vertex.

**Example 2 — Diamond graph with cross edge**  
*Given:* vertices {s,a,b,t}, edges s→a(1), s→b(4), a→b(2), a→t(5), b→t(1).  
Initialize dist[s]=0. Extract s. After relaxing both outgoing edges: dist[a]=1, dist[b]=4.  
Extract a (1). Relax a→b → dist[b] becomes 3; relax a→t → dist[t]=6.  
Extract b (3). Relax b→t → dist[t] becomes 4.  
Extract t (4).  
**Final distances:** {s:0, a:1, b:3, t:4}.  
*Why each move:* decrease-key on b after a was settled corrected the earlier overestimate.  
**Reflection:** The cross edge a→b demonstrates why we must keep the priority queue dynamic.

**Example 3 — Directed graph with unreachable vertex**  
*Given:* vertices {s,a,x}, edges s→a(2) only.  
After extracting s and a, vertex x remains at ∞.  
**Final distances:** {s:0, a:2, x:∞}.  
*Why:* No path exists, so infinity is correct and the algorithm simply never extracts x.  
**Reflection:** Handling ∞ prevents spurious relaxations.

**Example 4 — Larger graph (6 vertices)**  
*Given:* vertices {s,a,b,c,d,t} with edges s→a(2), s→b(5), a→b(1), a→c(4), b→c(2), b→d(3), c→t(3), d→t(2).  
Run Dijkstra: settlement order s,a,b,c,d,t yields distances 0,2,3,5,6,8 respectively. Each extraction and relaxation step follows the same pattern shown above.  
**Final distances:** {s:0,a:2,b:3,c:5,d:6,t:8}.  
**Reflection:** The example scales the same logic; the priority queue size stays O(V) and the log V factor appears in every operation.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using a plain queue instead of PQ   | Students forget that “minimum label” must be found quickly | Always implement with binary heap or Fibonacci heap  |
| Allowing negative edges             | Problem statement is misread                        | Pre-check all weights; if any < 0 switch to Bellman-Ford |
| Forgetting decrease-key             | dist label updated but PQ entry not corrected       | Use a decrease-key supporting PQ or mark obsolete entries |
| Storing visited flag too early      | Vertex marked visited before its final distance     | Mark visited only after extract-min                  |
| Integer overflow on large weights   | Sum of weights exceeds 32-bit int                   | Use 64-bit integers or big-integer distances         |
| Running on disconnected graphs      | Unreachable vertices left at ∞                      | Explicitly test for ∞ at the end                     |
| Re-inserting settled vertices       | Decrease-key called on already-extracted node       | Ignore or skip any node whose distance is already finalized |

## 7. The textbook-precise statement
Cormen et al., *Introduction to Algorithms*, 4e, §24.3:  
“Let G = (V, E) be a weighted directed graph with weight function w : E → ℝ≥0. Let s ∈ V. Dijkstra’s algorithm maintains a set S ⊆ V of vertices whose final shortest-path weights from s have already been determined. … The algorithm repeatedly selects the vertex u ∈ V − S with the minimum shortest-path estimate, adds u to S, and relaxes all edges leaving u.”  
All hypotheses (non-negative weights, single source, directed or undirected) are explicitly required; the output is the array dist[·] satisfying dist[v] = δ(s, v) for every v reachable from s.

## 8. Visual — diagram or schematic
```
      (2)       (1)
   s -----> a -----> b
   |        |        |
  (5)      (4)      (3)
   |        |        |
   v        v        v
   b -----> c -----> t
      (2)       (3)
```
Nodes = {s,a,b,c,t}; each arrow carries its weight. The settlement order is s → a → b → c → t and the final distances appear beside each node after the algorithm finishes.

## 9. The memory technique

1. **The hook** — Picture a spreading wavefront of light leaving the source; because light travels at constant speed in each medium, the first point the wavefront touches is the closest point (Dijkstra’s greedy extraction).
2. **What to overlearn** — The loop invariant “when u is dequeued, dist[u] = δ(s,u)” and the complexity O((V+E) log V).
3. **Spaced-repetition schedule** — Review the invariant after 1 day, re-implement the algorithm after 3 days, solve a new graph after 7 days, derive the complexity after 16 days, and teach the proof after 35 days.
4. **First-principles fallback** — If you forget the code, start from the definition of shortest path, prove that the minimum-label unsettled vertex is optimal, then mechanically write the extract-min + relax loop.

## 10. What this unlocks
Dijkstra is the foundation for A* search, bidirectional search, and many network-flow algorithms.  
- A* search adds a consistent heuristic to the priority key.  
- Johnson’s algorithm reduces all-pairs shortest paths to |V| single-source runs of Dijkstra after a Bellman-Ford reweighting step.  
- Minimum spanning tree algorithms (Prim) reuse the same priority-queue structure.  
- Modern graph databases expose Dijkstra as a built-in traversal primitive for reachability queries.

## 11. Self-check — five questions, no answers
1. In a graph containing a single negative edge but no negative cycle, what exactly breaks in Dijkstra’s proof?  
2. Show that after the first extract-min the distance of the extracted vertex equals its true shortest-path distance.  
3. Given V = 10^5 and E = 10^6, compute the approximate number of priority-queue operations and their total bit complexity on a 64-bit machine.  
4. A student forgets the decrease-key call; construct the smallest graph where the final distances become incorrect.  
5. Prove or disprove: Dijkstra still works if all edge weights are multiplied by −1 and we look for longest paths.