## 1. The one-sentence answer
**A graph is bipartite precisely when it admits a proper 2-coloring, and the maximum cardinality matching in a bipartite graph can be computed in \(O(E\sqrt{V})\) time by the Hopcroft-Karp algorithm.**

A graph whose vertices can be partitioned into two independent sets is called bipartite. Every edge therefore runs between the two sets and never inside either set. This partition is equivalent to assigning each vertex one of two colors so that no two adjacent vertices share the same color; the coloring can be discovered by a single breadth-first traversal that alternates colors level by level.

Once the partition exists, many assignment problems reduce to selecting a largest set of edges that touch each vertex at most once. The Hopcroft-Karp procedure finds such a maximum matching by repeatedly locating multiple shortest augmenting paths in a single phase, thereby accelerating the classic single-path augmenting-path method.

> [!NOTE]
> The 2-coloring test simultaneously certifies bipartiteness and supplies the two sides needed by every subsequent matching algorithm; without it, Hopcroft-Karp cannot even begin.

## 2. Why this matters — concrete and current
In semiconductor place-and-route tools at TSMC and Intel, standard-cell rows form one part and metal tracks the other; the resulting conflict graph is bipartite and 2-coloring quickly decides legal track assignment before detailed routing begins.

Ride-hailing platforms such as Uber and DiDi model drivers and passengers as the two parts of a bipartite graph; each morning the Hopcroft-Karp routine (or a close derivative) computes a maximum cardinality assignment that maximizes the number of trips started within the first five minutes of a demand spike.

In high-energy physics, the ATLAS experiment’s track-reconstruction pipeline represents silicon-detector hits on alternate barrel layers as a bipartite graph; a 2-coloring test confirms layer alternation while bipartite matching selects the largest set of non-crossing hit pairs used to seed Kalman filters.

Modern FPGA CAD flows at Xilinx treat LUT input pins and LUT output pins as the two parts; the resulting bipartite netlist graph is matched to decide which signals can share a single routing track without violating the device’s switch-matrix constraints.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Undirected graph, adjacency list | Both coloring and matching operate on the same representation |
| BFS layering and parent pointers | The 2-coloring test is a BFS that records parity; Hopcroft-Karp builds layered auxiliary graphs with BFS |
| Notion of augmenting path | Every matching algorithm, including Hopcroft-Karp, enlarges a matching exactly by finding augmenting paths |
| \(O(V+E)\) time for a single BFS | Needed to understand why multiple shortest paths per phase still yield \(O(E\sqrt{V})\) overall |

## 4. Building the idea — from intuition to formalism

### Step 1 — Partition implies 2-colorability
A graph admits a partition of vertices into sets \(L\) and \(R\) with every edge between \(L\) and \(R\) if and only if it can be colored with two colors so that adjacent vertices receive different colors.  
Example: vertices \(\{1,2,3\}\), edges \(1-2\), \(2-3\). Color 1 red, 2 blue, 3 red.  
Formally, a proper 2-coloring is a function \(c:V\to\{0,1\}\) such that \(c(u)\neq c(v)\) whenever \(\{u,v\}\in E\).

> [!WARNING]
> If the graph contains an odd cycle, any attempted coloring will eventually assign the same color to both ends of an edge; the algorithm must detect this conflict, not merely “try harder.”

### Step 2 — BFS discovers the coloring or an odd cycle
Run BFS from an arbitrary vertex, assigning color \(1-c(u)\) to every neighbor of a vertex colored \(c(u)\). If a neighbor already carries the same color, an odd cycle exists.  
Example: the triangle \(1-2-3-1\) forces color conflict on the back edge.  
The coloring produced after a successful BFS is exactly the bipartition: \(L=\{v\mid c(v)=0\}\), \(R=\{v\mid c(v)=1\}\).

### Step 3 — Matching definition
A matching \(M\subseteq E\) is a set of edges without common vertices. A maximum matching is one of largest cardinality. In a bipartite graph every maximum matching can be found by repeatedly augmenting an initial (possibly empty) matching.

### Step 4 — Augmenting path
An \(M\)-augmenting path is a simple path that begins and ends at unmatched vertices and alternates between edges not in \(M\) and edges in \(M\). Symmetric difference \(M\oplus P\) yields a larger matching.

### Step 5 — Multiple shortest augmenting paths
Hopcroft-Karp performs a single BFS to build a directed layered graph containing all shortest augmenting paths, then finds a maximal set of vertex-disjoint paths in that layered graph via DFS. Each phase therefore augments by at least one path and at most \(\sqrt{V}\) phases are needed.

### Step 6 — Complexity
Each phase costs \(O(E)\) for BFS plus \(O(E)\) for the DFS forest; at most \(\sqrt{V}\) phases occur, giving the textbook bound \(O(E\sqrt{V})\).

## 5. Worked examples — every step shown

**Example 1 — 2-coloring a path**  
*Given:* \(P_3\) with vertices \(a-b-c\).  
*Find:* colors and partition.  
BFS from \(a\): assign \(c(a)=0\).  
*Why:* source starts with color 0.  
Visit \(b\), assign \(c(b)=1\).  
*Why:* adjacent vertices must differ.  
Visit \(c\), assign \(c(c)=0\).  
*Why:* \(b\) has color 1.  
No conflict appears.  
**\(L=\{a,c\}\), \(R=\{b\}\)**

*Reflection:* The single path forces strict alternation; any longer odd-length path would produce the same clean partition.

**Example 2 — Detecting an odd cycle**  
*Given:* cycle \(1-2-3-4-5-1\).  
*Find:* is the graph bipartite?  
BFS from 1, colors 0,1,0,1,0.  
*Why:* each step flips color.  
Back edge 5-1 both colored 0.  
*Why:* distance from 1 to 5 is even, yet edge demands different colors.  
Conflict declared.  
**Graph is not bipartite**

*Reflection:* The parity check on the back edge is the only local test needed; global cycle search is unnecessary.

**Example 3 — Single augmenting path**  
*Given:* \(L=\{u_1,u_2\}\), \(R=\{v_1,v_2\}\), edges \(u_1v_1\), \(u_2v_1\), current matching \(M=\{u_2v_1\}\).  
*Find:* larger matching.  
Augmenting path \(u_1-v_1-u_2\) (free vertex \(u_1\)).  
*Why:* starts unmatched, alternates non-matching then matching edge.  
Flip edges: remove \(u_2v_1\), add \(u_1v_1\).  
**New matching size 2**

*Reflection:* One augmenting path immediately saturates both sides.

**Example 4 — Hopcroft-Karp phase on a small graph**  
*Given:* complete bipartite \(K_{3,3}\) minus one edge, initial empty matching.  
*Find:* size of maximum matching after one phase.  
BFS layering from all free vertices in \(L\) produces three shortest paths of length 1.  
*Why:* empty matching makes every edge a shortest augmenting path.  
DFS selects three vertex-disjoint paths in one pass.  
**Matching size 3 after single phase**

*Reflection:* The multiple-path extraction inside one BFS is exactly what yields the \(\sqrt{V}\) phase bound.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Running 2-coloring only from one vertex when graph is disconnected | Unvisited components may still contain odd cycles | Loop over every vertex and restart BFS on any uncolored vertex |
| Storing colors in a visited array instead of a separate color array | Overwrites the color that must be checked on back edges | Keep an explicit color map initialized to “uncolored” |
| Assuming any maximum matching must be perfect | The graph may have unequal part sizes | Always compare matching size to \(\min(|L|,|R|)\) |
| Implementing Hopcroft-Karp with a single DFS instead of a phase of DFSes | Loses the multiple-shortest-path advantage | After each BFS, repeat DFS until no more disjoint paths exist in the current layering |
| Forgetting to clear the “used” flag on right vertices between phases | Reuses a vertex already matched inside the same phase | Reset the pairing array only after the entire phase finishes |
| Treating directed edges in the layered graph as undirected | Creates cycles that violate shortest-path layering | Strictly follow free edges \(L\to R\) and matching edges \(R\to L\) |

## 7. The textbook-precise statement
A graph \(G=(V,E)\) is bipartite if and only if it contains no odd-length cycle. Equivalently, \(G\) is 2-colorable. When \(G\) is bipartite with parts \(L,R\), a matching \(M\) is maximum if and only if no \(M\)-augmenting path exists (Berge’s lemma). The Hopcroft-Karp algorithm computes a maximum matching in \(O(E\sqrt{V})\) time (Hopcroft & Karp, 1973; see also Cormen et al., *Introduction to Algorithms*, 4e, §26.5).

## 8. Visual — diagram or schematic
```text
L          R
u1 ─────── v1
 │        /
u2 ───── v2
 │      /
u3 ─── v3
```
Horizontal edges belong to a maximum matching of size 3. Dashed back-edges illustrate possible alternating paths. The left column is colored 0, the right column colored 1.

## 9. The memory technique

1. **The hook** — Picture two teams on opposite sides of a river; every bridge (edge) crosses the river and the 2-coloring test simply paints each bank a different color.
2. **What to overlearn** — (i) 2-coloring via BFS parity, (ii) augmenting path definition, (iii) phase count \(\le\sqrt{V}\).
3. **Spaced-repetition schedule** — Review the 2-coloring test after 1 day, the phase argument after 3 days, a full Hopcroft-Karp trace after 7 days, and a proof sketch after 16 and 35 days.
4. **First-principles fallback** — Re-derive the \(\sqrt{V}\) bound by counting how many times the shortest augmenting-path length can increase before exceeding \(V\).

## 10. What this unlocks
Mastery of bipartite matching supplies the algorithmic engine behind assignment problems, flow networks with unit capacities, and several approximation algorithms for general graphs.

- Konig’s theorem equating minimum vertex cover and maximum matching in bipartite graphs
- Reduction of maximum flow in unit-capacity networks to Hopcroft-Karp
- Dulmage-Mendelsohn decomposition used in sparse-matrix ordering
- Online bipartite matching and the competitive-analysis framework of Karp et al.

## 11. Self-check — five questions, no answers
1. Give a 5-vertex graph that is 2-colorable and one that is not; prove each claim with a single BFS trace.
2. In a bipartite graph with 100 vertices on each side, what is the smallest number of phases Hopcroft-Karp may need to reach a matching of size 50?
3. A bipartite graph has an odd cycle; where exactly does the coloring algorithm report failure?
4. Suppose every vertex in \(L\) has degree 1. Does Hopcroft-Karp still require multiple phases? Why or why not?
5. Construct a bipartite graph where the shortest augmenting path has length 5 and show the layered graph built by the first BFS of Hopcroft-Karp.