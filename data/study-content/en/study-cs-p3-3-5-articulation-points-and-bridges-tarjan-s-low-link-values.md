## 1. The one-sentence answer
**Tarjan’s low-link algorithm identifies articulation points and bridges during a single DFS traversal by tracking the earliest reachable ancestor from each subtree.**

An articulation point is a vertex whose removal disconnects the graph; a bridge is an edge whose removal does the same. The algorithm augments ordinary DFS with two timestamps per vertex: discovery time and a low-link value. The low-link value records the smallest discovery time reachable from the subtree rooted at that vertex, including back edges. Comparing these two values against parent and child relationships reveals the critical vertices and edges without any extra passes over the graph.

The method works because any back edge that can “reach behind” a vertex or edge proves an alternate path exists. When no such back edge exists, the vertex or edge is the sole connection between its subtree and the rest of the graph. This single-pass property makes the algorithm linear in the size of the graph.

> [!NOTE]
> The decisive insight is that low-link values propagate the existence of back edges upward; once a subtree cannot reach an ancestor earlier than its parent, the connecting edge or vertex must be critical.

## 2. Why this matters — concrete and current
In semiconductor physical design, routers at companies such as TSMC and Intel use articulation-point detection to locate single-point-of-failure vias whose removal would split a power grid; low-link values let the tool recompute vulnerability after each incremental ECO in linear time.

NASA’s Deep Space Network schedules antenna hand-offs across globally distributed ground stations. Bridges in the connectivity graph correspond to irreplaceable links between continents; losing one forces an unscheduled spacecraft communication blackout, so mission planners run Tarjan’s algorithm on the daily availability graph before approving pass sequences.

Social-graph teams at Meta maintain “community integrity” metrics on friendship graphs. Articulation users whose removal fragments a regional cluster are surfaced for targeted retention campaigns; the same low-link computation also flags bridges that, if removed, would isolate emerging markets.

Power-grid operators in ERCOT (Texas) model transmission lines as edges and substations as vertices. Bridges identified by low-link values become priority targets for redundant line construction after the 2021 winter storm exposed single-point failures that cascaded into statewide outages.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| DFS traversal and timestamps | Supplies discovery order and parent pointers required to define low-link updates |
| Back edges vs tree edges | Back edges are the only mechanism that can lower a low-link value |
| Connected components     | Articulation points and bridges are defined by increase in component count after removal |
| Recursion stack          | Parent–child relationships on the stack determine the exact conditions for reporting a cut vertex or bridge |

## 4. Building the idea — from intuition to formalism

### Step 1 — Discovery time records visitation order
Assign each vertex a unique integer the first time DFS reaches it. This timestamp establishes a total order on first visits.

Consider the path graph A—B—C. DFS starting at A yields disc(A)=0, disc(B)=1, disc(C)=2.

Formally,
$$
\text{disc}[u] = \text{timer}++ \quad\text{on first visit to }u.
$$

> [!WARNING]
> Treating disc as a simple counter instead of a monotonic timer that never resets inside one DFS forest will produce incorrect low-link comparisons across multiple components.

### Step 2 — Low-link value captures earliest ancestor reachability
Low[u] is the smallest discovery time of any vertex reachable from the subtree rooted at u, including via back edges.

In the same path, initially low(C)=disc(C)=2. No back edges exist, so low(C) stays 2.

Formally,
$$
\text{low}[u] \leftarrow \min(\text{disc}[u], \min\{\text{low}[v]\mid v\text{ child of }u\}, \min\{\text{disc}[w]\mid (u,w)\text{ back edge}\}).
$$

> [!WARNING]
> Forgetting to initialise low[u] to disc[u] before processing children will allow phantom lower values from unvisited vertices.

### Step 3 — Tree-edge low-link propagation
After recursing on a child v, update low[u] with low[v]. This carries any back-edge information discovered deeper in the subtree up to u.

Continuing the example, after visiting C, low(B) becomes min(low(B), low(C)) = min(1,2)=1.

> [!WARNING]
> Updating low[u] only after the recursive call, never before, is mandatory; premature updates would incorrectly treat the child as already explored.

### Step 4 — Back-edge low-link update
When an adjacent vertex w is already visited and is not the parent of u, a back edge exists. Set low[u] = min(low[u], disc[w]).

If a later edge C—A existed, then at C we would execute low(C) = min(2, disc(A)=0) = 0.

> [!WARNING]
> Using low[w] instead of disc[w] for back edges violates the definition and can report false bridges.

### Step 5 — Articulation-point conditions
Root is an articulation point if it has two or more children. Non-root u is an articulation point if some child v satisfies low[v] ≥ disc[u].

In a star with center R and leaves L1, L2, R has two children and is therefore an articulation point.

Formally (non-root case):
$$
\exists v\text{ child of }u \text{ such that low}[v] \ge \text{disc}[u].
$$

> [!WARNING]
> Applying the non-root rule to the root produces spurious answers; the root condition must be counted separately by number of children.

### Step 6 — Bridge condition
Edge (u,v) is a bridge when low[v] > disc[u]. No back edge from v’s subtree reaches an ancestor of u.

In the path A—B—C the edge B—C satisfies low(C)=2 > disc(B)=1, hence it is a bridge.

Formally:
$$
\text{low}[v] > \text{disc}[u] \implies (u,v)\text{ is a bridge}.
$$

## 5. Worked examples — every step shown

**Example 1 — Single bridge**
- *Given:* Path 0—1—2, DFS from 0.
- *Find:* All bridges and articulation points.

DFS order: disc[0]=0, disc[1]=1, disc[2]=2.  
low[2] initialised to 2. No back edges.  
After returning from 2: low[1] = min(1,2)=1.  
Because low[2]=2 > disc[1]=1, report bridge (1,2).  
low[1]=1 ≱ disc[0]=0, so 0 is not an articulation point by the non-root rule. Root 0 has only one child, therefore not an articulation point.

**Final answer**  
Bridges: (1,2). Articulation points: none.

*Reflection*  
The linear chain forces every tree edge to satisfy the strict low-link inequality; the single-child root rule prevents false positives at endpoints.

**Example 2 — Cycle**
- *Given:* Triangle 0—1—2—0, DFS from 0.
- *Find:* Critical elements.

disc[0]=0, disc[1]=1, disc[2]=2.  
Back edge 2→0 yields low[2]=min(2,0)=0.  
Return to 1: low[1]=min(1,0)=0.  
low[1]=0 < disc[0], low[2]=0 < disc[1] ⇒ no bridges, no articulation points.

**Final answer**  
No bridges, no articulation points.

*Reflection*  
A single back edge reaching the root collapses every low-link value, proving redundancy.

**Example 3 — Two articulation points**
- *Given:* Graph 0—1—2—3 plus edge 1—3, DFS from 0.
- *Find:* All articulation points and bridges.

Discovery: 0(0),1(1),2(2),3(3).  
Back edge 3→1 sets low[3]=1.  
low[2]=min(2,1)=1.  
low[1]=min(1,1)=1.  
low[2]=1 ≱ disc[1]=1? Equality holds, therefore 1 is an articulation point.  
low[3]=1 ≱ disc[2]=2? No. Root has one child.

**Final answer**  
Articulation points: {1}. Bridges: none.

*Reflection*  
Equality low[v] == disc[u] still signals a cut because the back edge lands exactly at u, not above it.

**Example 4 — Root with two subtrees**
- *Given:* Root 0 connected to 1 and 4; 1—2—3 with back edge 3→1.
- *Find:* Articulation points.

DFS children of 0: two distinct children.  
Subtree of 1 yields low[1]=1 (back edge stays inside).  
Because root has ≥2 children, 0 is an articulation point regardless of low values.

**Final answer**  
Articulation points: {0}.

*Reflection*  
Root condition is purely combinatorial; low-link values inside subtrees never override it.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Updating low on the parent pointer | Confuses tree edge with back edge | Explicitly test v != parent before applying disc[v] |
| Treating disc[w] and low[w] interchangeably on back edges | Over-lowers the value past the true earliest ancestor | Always use disc[w] for back edges |
| Forgetting the separate root-child count | Applies non-root rule uniformly | Maintain a children counter only for the current DFS root |
| Resetting timer between components | Produces duplicate or negative timestamps | Keep a single global timer for the entire forest |
| Reporting an edge (u,v) when low[v] == disc[u] | Equality indicates a back edge landing at u, not a bridge | Use strict inequality > for bridges |
| Missing multiple edges between same pair | Undirected graph may contain parallel edges that are never bridges | Represent graph with adjacency lists that allow duplicate entries and skip parent only by vertex id |
| Starting DFS from a non-isolated vertex in a disconnected graph | Leaves some components unvisited | Iterate over all vertices and launch DFS on each unvisited node |

## 7. The textbook-precise statement
Let G=(V,E) be an undirected graph. Perform a DFS traversal that records disc[u] and low[u] for every vertex u. A vertex u is an articulation point if either (a) u is the root and has two or more children, or (b) u is not the root and there exists a child v such that low[v] ≥ disc[u]. An edge (u,v) traversed as a tree edge is a bridge if and only if low[v] > disc[u]. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 22, Exercise 22.3-7 and surrounding DFS machinery.)

## 8. Visual — diagram or schematic
```text
DFS tree (timestamps shown as disc/low)

0 (0/0)
├── 1 (1/1)
│   └── 2 (2/1)──back edge to 1
└── 3 (3/3)          <-- bridge (0,3) because low[3]=3 > disc[0]=0

Legend
- Solid lines: tree edges
- Dashed line: back edge
- disc[u]/low[u] written inside each node
```

## 9. The memory technique
**The hook**  
Picture a mountain climber (DFS) leaving coloured flags (disc times). A low-link value is the earliest flag any rope (back edge) from the current camp can reach; if a camp cannot reach any flag above its parent, the path behind it is a single rope that must be guarded.

**What to overlearn**  
1. low[u] = min(disc[u], low[children], disc[back-edge targets])  
2. Bridge ⇔ low[child] > disc[u] (strict)  
3. Non-root articulation ⇔ low[child] ≥ disc[u]

**Spaced-repetition schedule**  
Review definitions after 1 day, re-derive conditions after 3 days, implement on two new graphs after 7 days, compare against brute-force removal after 16 days, and re-derive the entire algorithm from DFS only after 35 days.

**First-principles fallback**  
Rebuild from the definition of connectivity: removal increases components precisely when no alternate path (back edge) exists; low-link values are merely the efficient encoding of that existence check.

## 10. What this unlocks
Mastery of low-link values directly enables the linear-time algorithm for biconnected components and the subsequent construction of the block-cut tree.

- Biconnected-component decomposition (stack-based variant of the same DFS)
- 2-vertex-connected and 2-edge-connected component algorithms
- Network reliability polynomials and min-cut approximations
- Planarity testing via left-right planarity criteria that rely on the same DFS numbering

## 11. Self-check — five questions, no answers
1. In a complete graph Kₙ, how many bridges and articulation points does Tarjan’s algorithm report when started from any vertex?

2. Construct a graph containing exactly one articulation point that is not a bridge endpoint; draw it and label all low-link values after a DFS from an arbitrary start.

3. Suppose a back edge points from a descendant to an ancestor that is not the parent. Which single low-link update rule captures this situation, and why does using low[ancestor] instead of disc[ancestor] break the bridge test?

4. A graph consists of two cycles sharing exactly one vertex. Run the algorithm mentally; which vertex is reported and why does the root rule not apply if DFS starts elsewhere?

5. Prove that the low-link algorithm never reports a self-loop as a bridge; identify the exact comparison that prevents it.