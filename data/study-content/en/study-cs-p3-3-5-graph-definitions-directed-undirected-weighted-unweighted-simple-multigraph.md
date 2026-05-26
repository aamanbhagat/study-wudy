## 1. The one-sentence answer
**Graphs are finite sets of vertices joined by edges whose direction, numeric labels, and multiplicity produce six fundamental variants: directed, undirected, weighted, unweighted, simple, and multigraph.**

A graph records pairwise relationships. Vertices stand for the objects; edges stand for the connections. Removing direction, numbers, or repeated edges yields the six variants that appear throughout algorithms and data structures.

These distinctions matter because each variant changes the legal operations and the running time of every algorithm built on top of it. A route-planning program cannot treat a one-way street the same way it treats a two-way road; a social-network analysis cannot treat multiple friendships between the same pair of people the same way it treats a single friendship.

> [!NOTE]
> The single most important insight is that every later algorithm (BFS, shortest paths, matching, network flow) is proved correct only after the precise variant of graph is stated; changing the variant silently invalidates the proof.

## 2. Why this matters — concrete and current
Google Maps represents every road intersection as a vertex and every directed, weighted road segment as an edge whose weight is travel time; the distinction between directed one-way streets and undirected two-way streets is encoded directly in the graph so that the A* algorithm never proposes illegal turns.

In semiconductor design, Intel’s place-and-route tools model transistors and metal layers as vertices and possible wire segments as weighted edges; a multigraph is required because two distinct metal layers may connect the same pair of transistors, and treating those connections as identical would produce short-circuit errors.

Modern recommender systems at Netflix encode users and titles as vertices of a bipartite graph whose edges are weighted by viewing time; the direction is omitted because the relationship is symmetric for matrix-factorization algorithms, yet the weights must be retained or the learned embeddings lose all predictive power.

In particle-physics detectors at CERN, collision events are recorded as directed acyclic graphs whose edges carry four-momentum weights; physicists rely on the absence of cycles (a consequence of the simple-graph rule) to guarantee that each particle track is processed exactly once by the Kalman-filter reconstruction pipeline.

Aircraft wiring harness verification at Boeing models pins as vertices and physical wires as edges that may be duplicated (multigraph) and that carry both direction and resistance weight; failure to distinguish multiple parallel wires has caused certification-test failures.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Set                  | Vertices and edges are defined as sets; multiplicity is expressed by set cardinality. |
| Ordered pair         | Direction is captured by the ordered-pair notation (u, v) versus the unordered pair {u, v}. |
| Function             | A weight function maps each edge to a real number; its domain and codomain must be stated precisely. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Objects and links
Any modeling task begins with distinguishable things and the links among them.  
Example: four cities A, B, C, D and the roads that connect them.  
Formally, let V be a finite nonempty set whose elements are called **vertices**.  
> [!WARNING]
> Treating two cities with the same name as one vertex collapses distinct locations and produces routes that do not exist.

### Step 2 — The connection relation
Links are recorded by pairing vertices.  
Example: the single road between A and B is written {A, B}.  
Formally, an **edge** is an element of a second set E whose members are either unordered pairs or ordered pairs drawn from V.

### Step 3 — Direction
When traversal is permitted in only one sense, the pair must be ordered.  
Example: a one-way street from A to B is the ordered pair (A, B).  
Formally, a graph is **directed** when every member of E is an ordered pair; otherwise it is **undirected**.

### Step 4 — Numeric labels
Some links carry quantities such as distance or cost.  
Example: the road from A to B has length 17 km.  
Formally, a **weight function** w : E → ℝ assigns a real number to each edge; a graph possessing such a function is **weighted**, otherwise **unweighted**.

### Step 5 — Multiplicity
Two distinct roads may exist between the same pair of cities.  
Example: two different highways both connect A and B.  
Formally, E is permitted to contain duplicate pairs; the resulting structure is a **multigraph**. When E is a set (no duplicates) and no self-pairs exist, the graph is **simple**.

### Step 6 — Textbook synthesis
Combining the preceding choices yields the six variants named in the opening sentence. The formal object is therefore a 4-tuple G = (V, E, w, dir) where dir ∈ {directed, undirected} and the remaining components obey the constraints above.

## 5. Worked examples — every step shown

**Example 1 — Undirected unweighted simple graph**  
*Given:* vertices {1,2,3}, edges {{1,2},{2,3}}.  
*Find:* the six-variant classification.  
The edge set contains only unordered pairs → undirected.  
No weight function is supplied → unweighted.  
No duplicate pairs and no loops → simple.  
**Classification: undirected unweighted simple graph.**

*Reflection:* The decisive observation is the absence of ordering symbols and numeric labels; once those are missing, only the simple/multigraph distinction remains.

**Example 2 — Directed weighted simple graph**  
*Given:* V = {A,B}, E = {(A,B),(B,A)}, w(A,B)=5, w(B,A)=7.  
*Find:* classification.  
Ordered pairs → directed.  
Weight function defined on every edge → weighted.  
No duplicates → simple.  
**Classification: directed weighted simple graph.**

*Reflection:* The two ordered pairs are distinct even though they share the same underlying vertices; direction alone distinguishes them.

**Example 3 — Undirected weighted multigraph**  
*Given:* V = {u,v}, E = {{u,v},{u,v}} (two copies), w = 3 for both.  
*Find:* classification.  
Unordered pairs → undirected.  
Weight function present → weighted.  
Duplicate edges → multigraph.  
**Classification: undirected weighted multigraph.**

*Reflection:* The same unordered pair appears twice; the set E must therefore be replaced by a multiset or an adjacency list that permits repeated entries.

**Example 4 — Directed unweighted multigraph with loop**  
*Given:* V = {x}, E = {(x,x),(x,x)}.  
*Find:* classification.  
Ordered pair → directed.  
No weights → unweighted.  
Duplicate self-loops → multigraph.  
**Classification: directed unweighted multigraph.**

*Reflection:* A loop is an edge whose two endpoints coincide; multiplicity is independent of the loop property.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating a directed edge (u,v) as identical to (v,u) | Visual symmetry misleads the eye. | Always write ordered pairs when direction is stated. |
| Assuming every graph is simple | Textbooks often draw only simple graphs for brevity. | Check the problem statement for the word “multi” or for parallel-edge counts. |
| Forgetting that a loop contributes degree 2 in undirected graphs | Hand-wavy degree definitions omit the loop case. | Apply the handshaking lemma with the explicit factor of 2 for each loop. |
| Storing weights in a separate matrix without recording which edges exist | Matrix entries look like weights even when no edge is present. | Maintain an adjacency-list or adjacency-matrix pair; zero weight must be distinguished from “edge absent.” |
| Calling a graph “unweighted” when all weights happen to be 1 | Implicit unit weights still constitute a weight function. | Reserve “unweighted” for the explicit absence of any numeric label. |
| Allowing duplicate vertex names in an implementation | Hash-map keys collide. | Enforce unique vertex identifiers before constructing E. |
| Confusing multigraph with “graph containing cycles” | Both words begin with “multi.” | Cycle refers to a closed walk; multiplicity refers only to repeated edges between the same pair. |

## 7. The textbook-precise statement
A graph is a quadruple G = (V, E, w, dir) where V is a finite nonempty set, E is a set of 2-element multisets drawn from V (undirected case) or a set of ordered pairs from V (directed case), w : E → ℝ is a weight function (omitted when the graph is unweighted), and dir ∈ {directed, undirected}. When E contains no repeated elements and no loops {v,v}, G is simple. (Cormen et al., *Introduction to Algorithms*, 4e, §22.1, Definition 22.1 and the subsequent paragraph on multigraphs.)

## 8. Visual — diagram or schematic
```text
Undirected simple          Directed weighted        Multigraph (undirected)
    1---2                     A --5--> B               u
     \ /                       ^         \            / \
      3                         7         v           /   \
                           B <--3-- A               u=====v   (two edges)
```
The left diagram uses only unordered pairs and no labels. The center diagram uses ordered pairs and explicit numeric weights. The right diagram repeats the unordered pair {u,v}.

## 9. The memory technique
**The hook** — Picture six colored arrows on a road sign: one arrow points both ways (undirected), one points one way (directed), a number painted on the arrow (weighted), a blank arrow (unweighted), a single solid line (simple), and a double line (multigraph).

**What to overlearn** — (1) (u,v) denotes a directed edge, {u,v} an undirected edge; (2) a loop contributes 2 to degree in the undirected case; (3) a multigraph permits |E| > |possible pairs|.

**Spaced-repetition schedule** — Review definitions after 1 day, again after 3 days, 7 days, 16 days, and 35 days, each time reconstructing the six-variant table from the four-tuple (V,E,w,dir).

**First-principles fallback** — If any label is forgotten, rebuild from the set V, decide whether order matters for each pair, decide whether a numeric function is supplied, then decide whether duplicates are allowed.

## 10. What this unlocks
These six variants are the precise inputs required by every subsequent graph algorithm. Breadth-first search assumes an unweighted undirected graph; Dijkstra’s algorithm requires nonnegative weights; the Ford–Fulkerson method needs a directed weighted multigraph (capacities may repeat); topological sort is stated only for directed acyclic graphs. Mastery of the definitions therefore removes the hidden precondition errors that invalidate later proofs and code.

## 11. Self-check — five questions, no answers
1. Give the four-tuple definition of a directed weighted multigraph that contains exactly one loop.
2. A graph has five vertices and seven edges; can it be both simple and undirected? Show the arithmetic that decides the question.
3. In an undirected multigraph, two edges share the same endpoints and the same weight. Are they distinguishable? If so, how is that recorded formally?
4. Why does the adjacency-matrix representation of a multigraph require more than a single Boolean or numeric entry per cell?
5. A problem statement says “the streets are two-way and have speed limits.” Which three graph variants are thereby fixed, and which one remains free?