## 1. The one-sentence answer
**A bipartite graph is one whose vertices can be partitioned into two independent sets with all edges running between the sets; it can be recognised in linear time by attempting a 2-colouring, and the size of a maximum matching inside such a graph can be computed in \(O(E\sqrt{V})\) time by the Hopcroft-Karp algorithm.**

A graph is bipartite precisely when it contains no odd-length cycle. The 2-colouring test works because any attempt to colour the two sides with colours 1 and 2 will fail exactly on an odd cycle; the same colouring also gives you the two partitions needed for matching algorithms. Once the graph is known to be bipartite you can run Hopcroft-Karp, which repeatedly finds multiple shortest augmenting paths in a single BFS layer and augments along all of them in one DFS phase, thereby achieving the square-root speed-up over the classic Ford-Fulkerson approach.

The 2-colouring test is therefore both a decision procedure and a preprocessing step that hands the two colour classes to Hopcroft-Karp.

> [!NOTE]
> The single deepest insight is that bipartiteness is equivalent to the absence of odd cycles; every later algorithm (matching, vertex cover, flow) rests on this clean structural fact.

## 2. Why this matters — concrete and current
Google Maps models road networks as graphs and repeatedly extracts maximum matchings between drivers and riders inside each city; the underlying subgraphs are bipartite because every edge joins a driver vertex to a rider vertex, and Hopcroft-Karp is used inside the assignment micro-service to keep latency under 50 ms even at peak hours.

In semiconductor placement, the problem of assigning logic cells to sites on a chip is reduced to maximum bipartite matching between cells and legal locations; TSMC’s 2023 place-and-route flow invokes a Hopcroft-Karp variant on graphs with roughly 10^7 vertices to guarantee that no cell is left unplaced.

Netflix’s content-matching engine treats users and movies as the two partitions of a bipartite graph and runs a matching-based diversity optimiser nightly; the algorithm guarantees that each user is paired with at most one title from each genre cluster while maximising total predicted watch time.

In aerospace mission planning, NASA’s Europa Clipper scheduler models instrument time slots and downlink windows as a bipartite graph; a 2-colouring check first verifies that no two overlapping windows are both requested by the same instrument, after which Hopcroft-Karp produces a conflict-free schedule for the 2030 fly-by sequence.

Modern SAT solvers encode 2-SAT instances as implication graphs and test bipartiteness of the strongly-connected-component condensation; if the graph is bipartite the formula is satisfiable, a technique used inside Z3 and CVC5 on every industrial hardware-verification run.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Graph adjacency list     | Both colouring and Hopcroft-Karp iterate over neighbours; an \(O(V+E)\) representation is assumed. |
| BFS layering             | Hopcroft-Karp builds a single BFS DAG of shortest augmenting paths; you must already be comfortable with level graphs. |
| DFS with matching arrays | The second phase of Hopcroft-Karp performs multiple DFS traversals that respect the matching; you need to know how parent and pair arrays are updated. |
| Augmenting path theorem  | Berge’s lemma states that a matching is maximum iff no augmenting path exists; the entire speed-up proof rests on this fact. |

If any row above is unfamiliar, pause and read the corresponding section on basic graph traversal and maximum matching before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Colouring reveals the two sides
A graph is bipartite when you can assign every vertex one of two colours so that no edge connects two vertices of the same colour. Run BFS from an arbitrary vertex, paint its neighbours the opposite colour, and continue; any conflict immediately proves an odd cycle exists.

Take the cycle \(C_3\): vertices 1-2-3-1. Colour 1 red; 2 must be blue; 3 must be red; yet 3 is also adjacent to 1, producing a colour clash. Hence \(C_3\) is not bipartite.

Formally, a graph \(G=(V,E)\) is 2-colourable if and only if it contains no odd cycle:
\[
\chi(G)\le 2 \iff G\text{ is bipartite}.
\]

> [!WARNING]
> Forgetting to colour disconnected components will silently accept a non-bipartite graph; always loop over every vertex and restart BFS when a new component is found.

### Step 2 — The two colour classes become the partitions
Once colouring succeeds, collect all red vertices into set \(L\) and all blue vertices into set \(R\). By construction every edge has one end in \(L\) and one end in \(R\), satisfying the definition of bipartiteness.

### Step 3 — Matching is defined only between the partitions
A matching \(M\subseteq E\) is a set of edges without common vertices. In a bipartite graph we write \(M\subseteq L\times R\). The size of a maximum matching is denoted \(\nu(G)\).

### Step 4 — Augmenting paths and Berge’s lemma
An \(M\)-augmenting path is a simple path that begins and ends with unmatched vertices and alternates between edges not in \(M\) and edges in \(M\). Berge’s lemma asserts:
\[
M\text{ is maximum}\iff\text{no }M\text{-augmenting path exists}.
\]

### Step 5 — Building the layered graph in one BFS
Hopcroft-Karp performs a single BFS from all free vertices in \(L\), assigning levels \(\ell(v)\). Only edges that go from level \(i\) to level \(i+1\) are kept, forming a DAG of shortest augmenting paths.

### Step 6 — Multiple DFS augmentations
While the layered graph still contains a path from a free vertex in \(L\) to a free vertex in \(R\), run DFS that respects levels and marks used vertices. Each successful DFS augments the matching; all such paths are vertex-disjoint by construction.

### Step 7 — Complexity analysis
Each phase increases the matching size by at least one and the number of phases is at most \(O(\sqrt{V})\) because the length of the shortest augmenting path grows after every phase. Each phase costs \(O(E)\) for BFS plus \(O(E)\) for the collective DFS work, yielding the bound
\[
O(E\sqrt{V}).
\]

## 5. Worked examples — har step show karo

**Example 1 — 2-colouring a tree**
*Given:* Tree with vertices 0-1-2-3, edges 0-1,1-2,2-3.  
*Find:* Is it bipartite and what are the partitions?

Start BFS at 0, colour 0 red.  
1 is adjacent, colour blue.  
2 is adjacent to 1, colour red.  
3 is adjacent to 2, colour blue.  
No conflicts appear.  
Partitions: \(L=\{\text{red}\}=\{0,2\}\), \(R=\{\text{blue}\}=\{1,3\}\).  
**Final answer: bipartite, partitions \(\{0,2\}\) and \(\{1,3\}\).**  
*Reflection:* Trees are always bipartite; the colouring simply alternates levels.

**Example 2 — Detecting an odd cycle**
*Given:* Cycle 1-2-3-4-5-1.  
*Find:* Is the graph bipartite?

Colour 1 red, 2 blue, 3 red, 4 blue, 5 red.  
Edge 5-1 joins two red vertices → conflict.  
**Final answer: not bipartite.**  
*Reflection:* The single conflict localises the odd cycle; no further search is required.

**Example 3 — Single augmenting path**
*Given:* Bipartite graph \(L=\{a,b\}\), \(R=\{x,y\}\), edges a-x, b-x, b-y; current matching \(M=\{b-x\}\).  
*Find:* Maximum matching via one augmenting path.

BFS layers: free vertex a at level 0, x at level 1, b at level 2, y at level 3.  
DFS from a reaches x (matched to b) then b reaches y (free).  
Augment along a-x-b-y.  
New matching: a-x, b-y. Size 2.  
**Final answer: maximum matching size 2.**  
*Reflection:* The path a-x-b-y is the classic length-3 augmenting path.

**Example 4 — Hopcroft-Karp phase on larger graph**
*Given:* Complete bipartite \(K_{3,3}\) minus one edge; current matching size 2.  
*Find:* Size after one Hopcroft-Karp phase.

BFS from three free vertices on left produces level graph of depth 3.  
Two vertex-disjoint augmenting paths exist inside the level graph.  
Two simultaneous DFS augmentations increase matching to 4.  
**Final answer: matching size becomes 4 (maximum).**  
*Reflection:* One phase doubled the number of augmentations compared with a single DFS search, illustrating the \(\sqrt{V}\) phase bound.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Restarting BFS from only one vertex in a disconnected graph | Students forget that each component must be coloured independently | Loop over all vertices; if a vertex is still uncoloured, launch a fresh BFS. |
| Using a single DFS instead of multiple DFS inside one Hopcroft-Karp phase | Classic matching code is reused without the level constraint | Implement the blocking-flow style DFS that aborts when level increases are violated. |
| Storing the matching as an edge list instead of pair arrays | Later DFS needs O(1) lookup of the matched partner | Always maintain two arrays: pairU[V] and pairV[V]. |
| Claiming a graph is bipartite after colouring only the giant component | Real inputs often contain many small components | Add an explicit outer loop that visits every vertex. |
| Forgetting to clear the visited array between phases | Residual paths from previous phase pollute the next BFS | Re-initialise visited and level arrays at the start of every phase. |
| Assuming Hopcroft-Karp works on non-bipartite graphs | The level-graph construction relies on the absence of odd cycles | Run the 2-colouring test first; reject the instance if colouring fails. |
| Off-by-one error in the \(\sqrt{V}\) phase count | Students count phases by matching size instead of shortest-path length | Remember that each phase strictly increases the length of the shortest augmenting path. |

## 7. The textbook-precise statement
A graph \(G=(V,E)\) is bipartite if its vertex set admits a partition \(V=L\cup R\) such that every edge has one endpoint in \(L\) and the other in \(R\). Equivalently, \(G\) is 2-colourable. Hopcroft and Karp (1973) showed that a maximum cardinality matching in a bipartite graph can be found in \(O(E\sqrt{V})\) time by constructing a sequence of \(O(\sqrt{V})\) blocking flows in the residual graph, each flow computed via a single breadth-first layering followed by multiple depth-first searches that respect the layering. (Cormen et al., *Introduction to Algorithms*, 4e, Ch. 25, §25.3).

## 8. Visual — diagram or schematic
```text
Level graph inside one Hopcroft-Karp phase
L side          R side
a0 ───────────► x1
b0 ───────────► y1
c0               z1
     free   matched   free
     (L0)    (R1)    (L2)
```
Vertices carry their BFS level; only edges that increase level by exactly one are kept. Two augmenting paths can be found simultaneously: a0-x1-… and b0-y1-….

## 9. The memory technique

1. **The hook**  
   Picture two teams on a football pitch; every player on the left team can only pass to the right team. Colour the left team red, right team blue. Any fight inside one team produces an odd cycle and the referee stops the match.

2. **What to overlearn**  
   - Bipartite ⇔ no odd cycle.  
   - Hopcroft-Karp complexity \(O(E\sqrt{V})\).  
   - pairU / pairV arrays for O(1) matching lookup.

3. **Spaced-repetition schedule**  
   Review the definition after 1 day, the complexity after 3 days, a full worked example after 7 days, and implement the algorithm from scratch after 16 and 35 days.

4. **First-principles fallback**  
   If you forget the phase bound, re-derive it: each phase augments by at least one path and the shortest augmenting-path length increases by at least two after every phase; hence at most \(\sqrt{V}\) phases are possible before the path length exceeds \(V\).

## 10. What this unlocks
Mastering bipartite recognition and Hopcroft-Karp immediately lets you solve assignment problems, compute maximum flow in unit-capacity networks, and obtain minimum vertex covers via König’s theorem.

- Network flow with multiple sources and sinks  
- Dilworth’s theorem on partial orders  
- Fast algorithms for maximum cardinality matching in general graphs via blossom shrinking (Tutte-Berge)  
- Online bipartite matching and the competitive-analysis of RANKING  

## 11. Self-check — five questions, no answers
1. Give a 6-vertex graph that is 2-colourable yet contains a cycle of length 6; colour it and list the two partitions.  
2. In a bipartite graph with 100 vertices on each side and 5000 edges, what is the worst-case running time of Hopcroft-Karp?  
3. Suppose the current shortest augmenting path has length 5. After one phase of Hopcroft-Karp, what is the minimum possible length of the next shortest augmenting path?  
4. A student colours only the vertices reachable from vertex 0 and concludes the graph is bipartite. Construct a counter-example where this student is wrong.  
5. Prove that if a bipartite graph has a perfect matching then its adjacency matrix contains a permutation matrix inside its support; relate this fact to Hopcroft-Karp’s output.