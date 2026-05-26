## 1. The one-sentence answer
**A* is a graph search algorithm that expands nodes in order of increasing \(f(n)=g(n)+h(n)\) and returns an optimal path from start to goal whenever the heuristic \(h\) is both admissible and consistent.**

A* improves on blind search by letting you supply a cheap estimate \(h(n)\) of the remaining cost from any node \(n\) to the goal. The algorithm maintains an open set ordered by the sum of the exact cost-so-far \(g(n)\) and this estimate; it repeatedly extracts the node with the smallest sum and expands its neighbors. Because the estimate never overstates true cost, the first time a goal is dequeued its path is guaranteed to be cheapest.

Admissibility alone is enough for optimality on trees; on graphs with multiple paths to the same node, consistency (the triangle inequality for heuristics) additionally guarantees that each node is expanded at most once. Together these two properties turn an otherwise exponential enumeration into an optimally directed search whose practical speed depends on how informative \(h\) is.

> [!NOTE]
> The decisive insight is that admissibility prevents the algorithm from ever discarding an optimal path, while consistency removes the need to reopen nodes; both properties together convert “promising” into “provably optimal.”

## 2. Why this matters — concrete and current
NASA’s Perseverance rover uses an A*-variant with a terrain-cost heuristic derived from stereo imagery to plan safe drives across Jezero Crater; each daily command cycle must finish inside a 20-minute communications window, making the optimality guarantee essential.

Modern commercial flight-management systems (e.g., Honeywell’s FMS on Boeing 787) embed A* inside Required Navigation Performance trajectory generators; the heuristic incorporates wind forecasts and fuel-burn tables so that the returned lateral-vertical path satisfies both time and fuel constraints to within certified tolerances.

Inside Google Maps’ server-side routing for walking and cycling, a contraction-hierarchies overlay is seeded by A* runs whose admissible heuristic is Euclidean distance scaled by average human speed; the same engine also powers the “leave now” ETA predictions that feed live traffic tiles.

In semiconductor place-and-route tools such as Cadence Innovus, A* with a Manhattan-distance-plus-obstacle heuristic routes billions of nets on each advanced node; a single inconsistent heuristic can increase total wire length by several percent, directly raising power and lowering yield.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Weighted directed graph | A* operates on the same state space as Dijkstra; edge weights must be non-negative. |
| Priority queue       | The open set must always yield the node with smallest \(f\). |
| Dijkstra’s algorithm | A* is Dijkstra with a non-zero heuristic; understanding the former makes the modification obvious. |
| Triangle inequality  | Consistency is exactly the triangle inequality applied to \(h\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — From uniform-cost search to informed search
Uniform-cost search expands nodes by true cost-so-far; replacing the priority key with an estimate of total cost lets the algorithm “look ahead.”  
Concrete example: on a city grid where every block costs 1, uniform-cost treats every frontier node equally; adding a straight-line distance to the destination immediately biases expansion toward the goal.  
Formal statement:  
\[
f(n) = g(n) + h(n)
\]  
where \(g(n)\) is the lowest known path cost from the start and \(h(n)\) is an estimate of cost from \(n\) to the goal.  
> [!WARNING]
> If you forget that \(g\) must remain the lowest known cost, you will re-expand nodes that already have cheaper paths.

### Step 2 — Admissibility defined
A heuristic is admissible when it never overestimates true remaining cost.  
Concrete example: straight-line distance on a map is admissible because the shortest path cannot be shorter than the Euclidean line.  
Formal statement:  
\[
0 \le h(n) \le h^*(n) \quad \forall n
\]  
where \(h^*(n)\) is the true lowest cost from \(n\) to the goal.  
> [!WARNING]
> An inadmissible heuristic can cause A* to return a suboptimal path; the first goal dequeued may no longer be optimal.

### Step 3 — Consistency (monotonicity)
A heuristic is consistent when the estimated cost of going from \(n\) to a neighbor \(n'\) plus the estimate from \(n'\) never exceeds the direct estimate from \(n\).  
Concrete example: Euclidean distance satisfies \(h(n) \le c(n,n') + h(n')\) because the straight line is the shortest.  
Formal statement:  
\[
h(n) \le c(n,n') + h(n') \quad \forall n,n'
\]  
> [!WARNING]
> Using an admissible but inconsistent heuristic forces A* to reopen closed nodes, destroying the linear-space guarantee.

### Step 4 — Optimality on graphs
When \(h\) is admissible, the first time a goal is selected for expansion its \(g\)-value equals \(h^*\). When \(h\) is also consistent, every node is expanded at most once.  
Formal statement (sketch): suppose an optimal path exists; any node \(n\) on a suboptimal path satisfies \(f(n) > C^*\) and is therefore never expanded before the optimal goal.  
> [!WARNING]
> On graphs the consistency requirement is mandatory; admissibility alone is insufficient once multiple paths reach the same node.

### Step 5 — Textbook statement of A* optimality
If \(h\) is admissible and consistent and all edge costs are positive, A* returns an optimal path and expands every node \(n\) with \(f(n) < C^*\).

## 5. Worked examples — every step shown

**Example 1 — Two-node graph**  
*Given:* Nodes \(s,t\); edge \(s\to t\) cost 5; \(h(s)=3\), \(h(t)=0\).  
*Find:* Path returned by A*.  
Initialize open = \(\{s\}\) with \(f(s)=0+3=3\).  
Extract \(s\), generate \(t\) with \(g(t)=5\), \(f(t)=5+0=5\).  
Extract \(t\); it is the goal.  
*Why* each step follows the definition of \(f\) and the extraction order.  
**\(s \to t\) (cost 5)**

*Reflection:* Trivial case verifies that an admissible heuristic still yields the only path.

**Example 2 — Grid with consistent heuristic**  
*Given:* 3×3 grid, start (0,0), goal (2,2), unit costs, \(h=\) Manhattan distance.  
*Find:* Order of expansion and final path cost.  
Open ordered by \(f\): (0,0) \(f=0+4\). Expand, generate right and down.  
Next lowest \(f=3\) nodes expanded; goal reached with \(g=4\).  
*Why* Manhattan satisfies consistency on unit grid.  
**Path cost 4**

*Reflection:* Shows single expansion per node when consistency holds.

**Example 3 — Same grid with inconsistent heuristic**  
*Given:* Same grid, but \(h(1,1)=10\) (overestimate).  
*Find:* Behavior change.  
A* reopens (1,1) after discovering cheaper route; extra expansions occur.  
*Why* violation of triangle inequality forces reopening.  
**Still returns cost 4, but expands 2 extra nodes**

*Reflection:* Demonstrates why consistency matters for efficiency even when optimality survives.

**Example 4 — Graph with zero-cost edges**  
*Given:* Graph containing zero-cost edge; admissible consistent \(h\).  
*Find:* Whether A* remains optimal.  
Proof sketch shows \(f\)-ordering still respects \(C^*\) because zero-cost edges cannot decrease \(f\) below \(C^*\).  
**Optimal path returned**

*Reflection:* Edge-case check that positive-cost assumption can be relaxed to non-negative.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Using Euclidean distance on a map with one-way streets | Heuristic ignores directionality            | Verify triangle inequality on every edge type        |
| Treating negative edge weights as admissible | Algorithm never defined for negative costs  | Pre-process or reject negative weights               |
| Forgetting to keep \(g\) as lowest known cost | Implementation stores first path only       | Always compare and update when a cheaper path found  |
| Overestimating with “optimistic” runtime guesses | Confuses admissible with “good”             | Prove \(h(n)\le h^*(n)\) on paper before coding      |
| Assuming optimality without consistency on graphs | Multiple paths to same node                 | Add parent-pointer check or enforce consistency      |
| Priority queue without decrease-key | Duplicate nodes with stale \(f\) values     | Use set or heap that supports decrease-key           |
| Goal test performed on enqueue instead of dequeue | Returns suboptimal path                     | Test goal only when node is dequeued                 |

## 7. The textbook-precise statement
Let \(G=(V,E)\) be a finite directed graph with non-negative edge costs \(c(u,v)\). Let \(h:V\to\mathbb{R}_{\ge0}\) satisfy  
\[
h(\text{goal})=0,\qquad h(n)\le c(n,n')+h(n')\quad\forall(n,n')\in E
\]  
(consistency) and therefore also admissibility. Then A* using the evaluation function \(f(n)=g(n)+h(n)\) returns a lowest-cost path from start to goal and expands every node \(n\) satisfying \(f(n)<C^*\) at most once (Cormen et al., *Introduction to Algorithms*, 4e, Ch. 22; Russell & Norvig, *Artificial Intelligence: A Modern Approach*, 4e, §3.5.2).

## 8. Visual — diagram or schematic
```text
Start (0,0) ─1─ (1,0) ─1─ (2,0)
   │             │             │
   1             1             1
   │             │             │
 (0,1) ─1─ (1,1) ─1─ (2,1)
   │             │             │
   1             1             1
   │             │             │
 (0,2) ─1─ (1,2) ─1─ Goal(2,2)

f-values shown beside each node after first expansion:
(0,0):f=4   (1,0):f=5   (0,1):f=5
Arrows indicate expansion order; bold path is returned.
```

## 9. The memory technique
1. **The hook** — Picture a star on a night map that is always a little short of the true distance; you can trust it never to point past the destination, so the first time you reach the star you know the road behind you is shortest.  
2. **What to overlearn** — \(f=g+h\), admissibility \(h\le h^*\), consistency \(h(n)\le c(n,n')+h(n')\).  
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive optimality by assuming a cheaper path exists and showing its nodes would have been expanded earlier, contradicting the extraction order.

## 10. What this unlocks
Mastery of admissible and consistent heuristics lets you design fast optimal planners for any domain whose state space is a graph.  
- Hierarchical A* and jump-point search for grids  
- Lifelong Planning A* for dynamic replanning  
- Heuristic search in classical planning (delete-relaxation heuristics)  
- Motion planning in continuous configuration spaces (RRT* with admissible steering heuristics)

## 11. Self-check — five questions, no answers
1. Prove that Euclidean distance remains admissible when all obstacles are convex polygons.  
2. Construct a concrete graph where an admissible but inconsistent heuristic forces A* to reopen a node.  
3. Show that if every edge cost is multiplied by a positive constant the same path remains optimal.  
4. Given a heuristic that returns the maximum of two admissible heuristics, is the result admissible? Consistent?  
5. In a graph containing zero-cost cycles, does A* still terminate when a goal is reachable?