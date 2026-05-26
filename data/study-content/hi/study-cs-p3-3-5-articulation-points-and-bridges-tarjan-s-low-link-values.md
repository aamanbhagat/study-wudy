## 1. The one-sentence answer
**Articulation points and bridges are vertices and edges whose removal increases the number of connected components in an undirected graph, and Tarjan’s algorithm detects them in linear time by tracking discovery times and low-link values during a single DFS traversal.**

Low-link value of a node is the smallest discovery timestamp reachable from its DFS subtree, including back edges. When you compare a node’s low-link value against its parent’s discovery time, you immediately know whether that node or the connecting edge is critical. This single extra integer per node turns ordinary DFS into a tool that finds all such points without any extra passes over the graph.

The core insight is that low-link propagates the earliest ancestor reachable through any back edge; if no such back edge bypasses the parent, the current node or edge is a cut vertex or bridge.

> [!NOTE]
> The single “aha” moment is realising that low[u] < disc[parent[u]] tells you the entire subtree of u has no way back to ancestors except through the parent edge — exactly the definition of a bridge or articulation point.

## 2. Why this matters — concrete and current
Network engineers at cloud providers such as AWS and Azure run Tarjan-style articulation-point detection daily on their backbone graphs to identify single points of failure; removing one such router can partition an entire availability zone.

In VLSI design, Intel and TSMC tools locate articulation points inside clock-distribution networks; a single flip-flop whose removal disconnects the clock tree forces expensive buffer insertion and rewiring before tape-out.

Social-graph teams at Meta apply the same algorithm on friendship graphs to surface “bridge users” whose departure would split communities; this information drives retention campaigns and misinformation-mitigation experiments.

Aerospace mission planners at NASA use bridge detection on the International Space Station’s power and data buses; each bridge edge corresponds to a cable whose severance would isolate a critical module during EVA planning.

Semiconductor yield-analysis pipelines at TSMC feed netlist graphs into Tarjan’s routine to flag vias whose failure would disconnect power domains, directly affecting DFM scoring before mask generation.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| DFS and DFS tree     | Tarjan’s algorithm is a single DFS pass that builds the tree used for low-link calculations |
| Discovery time (disc) | Serves as both timestamp and unique node identifier for comparisons |
| Back edges           | The only mechanism that can lower a node’s low-link value below its parent |
| Connected components | Articulation points and bridges are defined by increase in component count after removal |

If any row above is unfamiliar, pause and master DFS on undirected graphs first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Perform DFS and record discovery times
Run a standard DFS on the undirected graph while assigning each node a discovery timestamp disc[u] in increasing order. This produces a DFS tree whose tree edges and back edges become the only two categories we care about.

Example: nodes A-B-C with an extra edge A-C yields disc[A]=0, disc[B]=1, disc[C]=2.

Formal statement: assign disc[u] = time++ the first time u is visited.

> [!WARNING]
> Forgetting to treat the graph as undirected will misclassify back edges as forward edges and produce wrong low values.

### Step 2 — Initialise low-link values
Set low[u] = disc[u] for every node at the moment it is first discovered. low[u] will later be updated to the smallest disc value reachable from the subtree rooted at u.

### Step 3 — Propagate low values through children
When a child v of u finishes its DFS, execute low[u] = min(low[u], low[v]). This step bubbles up the earliest ancestor reachable from the entire subtree.

### Step 4 — Handle back edges
Whenever a back edge u→w is found (w already visited and not parent of u), execute low[u] = min(low[u], disc[w]). Back edges are the only way low can become smaller than any ancestor’s disc.

### Step 5 — Detect bridges
After processing a child v, if low[v] > disc[u] then the tree edge u-v is a bridge. No back edge from v’s subtree reaches an ancestor of u.

### Step 6 — Detect articulation points (root case)
If the DFS root has two or more children, it is an articulation point. Removal separates each child’s subtree.

### Step 7 — Detect articulation points (non-root case)
For a non-root node u, if any child v satisfies low[v] ≥ disc[u], then u is an articulation point. The subtree of v cannot reach ancestors without u.

### Step 8 — Textbook-grade statement
After a single DFS traversal that maintains both disc and low arrays, the sets of all bridges and articulation points are exactly the edges and vertices satisfying the conditions in Steps 5–7.

## 5. Worked examples — har step show karo

**Example 1 — Simple path graph**
*Given:* vertices 0-1-2 connected by edges (0,1) and (1,2).  
*Find:* articulation points and bridges.

DFS starts at 0: disc[0]=0, low[0]=0.  
Visit 1: disc[1]=1, low[1]=1.  
Visit 2: disc[2]=2, low[2]=2.  
Back at 1: low[1] = min(1,2) = 1.  
Check: low[2] > disc[1] → edge 1-2 is bridge.  
Back at 0: low[0] = min(0,1) = 0.  
Check: low[1] > disc[0] → edge 0-1 is bridge.  
Root has one child → not articulation point.  
Non-root node 1 has child 2 with low[2] ≥ disc[1] → 1 is articulation point.

**Final answer**  
Bridges: (0,1), (1,2). Articulation point: 1.

*Reflection:* The chain forces every internal node to be critical; low values never drop below their parent’s disc.

**Example 2 — Cycle graph**
*Given:* triangle 0-1-2-0.  
*Find:* articulation points and bridges.

DFS at 0: disc[0]=0.  
Visit 1: disc[1]=1.  
Visit 2 via 1: disc[2]=2.  
Back edge 2-0: low[2] = min(2,0) = 0.  
Return to 1: low[1] = min(1,0) = 0.  
Return to 0: low[0] = min(0,0) = 0.  
No child satisfies low[v] > disc[u] → no bridges.  
Root has one child → not articulation. Non-root checks also fail → no articulation points.

**Final answer**  
No bridges, no articulation points.

*Reflection:* The single back edge lowered every low value to the root, eliminating all cut vertices.

**Example 3 — Two cycles sharing a vertex**
*Given:* 0-1-2-0 and 0-3-4-0.  
*Find:* articulation points and bridges.

DFS at root 0 (two children).  
Subtree of 1 reaches back only to 0; low values stay ≥ disc[0].  
Same for subtree of 3.  
Root has two children → 0 is articulation point.  
No low[v] > disc[u] for any tree edge → no bridges.

**Final answer**  
Articulation point: 0. No bridges.

*Reflection:* Shared vertex is critical even though each cycle internally is 2-connected.

**Example 4 — Larger graph with mixed cases**
*Given:* vertices 0-1-2-3-4 with edges 0-1,1-2,2-3,3-4,2-0,3-1.  
*Find:* all articulation points and bridges.

DFS order yields disc = [0,1,2,4,5] for nodes 0-4.  
Back edges 2-0 and 3-1 lower low[2] to 0 and low[3] to 1.  
Checks: low[4] > disc[3] → bridge 3-4.  
low[3] ≥ disc[2] → 2 is articulation. Root 0 has one child → not articulation.

**Final answer**  
Bridge: (3,4). Articulation point: 2.

*Reflection:* Mixed back-edge reachability shows how low values selectively “save” some edges but not others.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating low[v] == disc[u] as bridge | Confusing “≥” with “>” for bridges | Remember only strict inequality low[v] > disc[u] marks a bridge |
| Forgetting root special case | Root articulation rule is based on child count, not low values | Always count children of root separately after DFS |
| Updating low[u] with disc[parent] | Accidentally allowing parent as back edge | Explicitly skip parent when processing adjacency list |
| Running DFS on directed graph | Algorithm assumes undirected edges | Convert or confirm input is undirected before starting |
| Re-initialising disc on multiple components | Forgetting to loop over all nodes | Wrap DFS call in a loop over every unvisited vertex |
| Overwriting low during post-order | Updating low after returning from child too late | Update low[u] immediately after each child returns |
| Assuming multiple edges between same pair | Ignoring multi-edges that can create false bridges | Store adjacency list as multiset or handle parallel edges explicitly |

## 7. The textbook-precise statement
An articulation point of an undirected connected graph G = (V,E) is a vertex v ∈ V whose removal increases the number of connected components. A bridge is an edge e ∈ E whose removal increases the number of connected components. Let disc[u] be the discovery time of u in a DFS tree and low[u] the smallest discovery time reachable from the subtree rooted at u (including u itself) via at most one back edge. Then:

- The edge (u,v) is a bridge if and only if low[v] > disc[u] where v is a child of u in the DFS tree.
- A non-root vertex u is an articulation point if and only if there exists a child v such that low[v] ≥ disc[u].
- The root is an articulation point if and only if it has at least two children in the DFS tree.

(Cormen et al., *Introduction to Algorithms*, 4e, Chapter 22, Section 22.4, “Articulation points and bridges”.)

## 8. Visual — diagram or schematic
```
0 --- 1 --- 2 --- 3
|     |     |
4     5     6
```
Label: node 2 is articulation point; edge 2-3 is bridge. Back edge 1-5 and 0-4 keep their subtrees connected.

## 9. The memory technique

**The hook**  
Picture each node holding a “flashlight” (low value) that can shine back to the earliest ancestor it can reach; if the flashlight never reaches past its parent, the parent edge is cut.

**What to overlearn**  
low[u] = min(low[u], low[v]) after every child, and low[u] = min(low[u], disc[w]) for every back edge to w.

**Spaced-repetition schedule**  
Review the two update rules after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback**  
Re-derive by asking: “What is the earliest ancestor reachable from this subtree without going through the parent?” That ancestor’s disc becomes the new low.

## 10. What this unlocks
Mastery of low-link values directly enables the linear-time algorithm for biconnected components and the subsequent construction of the block-cut tree.

- Biconnected-component decomposition used in planar-graph embedding algorithms
- Bridge-block condensation for 2-edge-connected spanning subgraph problems
- Network reliability polynomials in probabilistic graph theory
- Cycle-basis extraction for electrical-circuit simulation

## 11. Self-check — five questions, no answers
1. In a path of n nodes, how many articulation points exist and why?
2. If a back edge connects a descendant directly to the grandparent, which low values change and by how much?
3. What happens to the bridge test when the graph contains parallel edges between the same pair of vertices?
4. Can a leaf node ever be an articulation point? Give a counter-example or proof.
5. Suppose DFS starts at a non-cut vertex; does the choice of root affect the final set of reported articulation points?