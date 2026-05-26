## 1. The one-sentence answer
**Graphs are mathematical structures made of vertices connected by edges, and the six adjectives (directed, undirected, weighted, unweighted, simple, multigraph) precisely describe the allowed connections and labels on those edges.**

A graph models pairwise relationships. Vertices represent entities and edges represent relations between them. The type of edge decides what the graph can and cannot represent. When you say “directed”, you add an arrow that makes the relation one-way; when you say “weighted”, you attach a number to every edge that carries extra information such as cost or capacity. These choices are not cosmetic; they change which algorithms are valid and what the data structure must store.

The distinction between simple graphs and multigraphs further controls whether multiple edges between the same pair of vertices are legal. A simple graph forbids both multiple edges and self-loops; a multigraph relaxes the multiple-edge rule while still deciding separately about self-loops. Once these six labels are fixed, the rest of graph theory follows directly from the chosen combination.

> [!NOTE]
> The single most important “aha” is that every later algorithm (BFS, Dijkstra, topological sort, etc.) silently assumes one exact combination of these six properties; using the wrong combination produces either a compile-time type error or silently wrong answers.

## 2. Why this matters — concrete and current
Google Maps represents road networks as directed, weighted graphs where each directed edge carries travel time; reversing the direction would give incorrect routes.  
In semiconductor design, the netlist of a chip is stored as a directed multigraph so that multiple wires between the same pair of gates remain distinguishable for timing analysis.  
Social-network friend recommendations at Meta treat the friendship relation as an undirected, unweighted simple graph; adding direction would destroy the symmetry that “A is friend of B” implies “B is friend of A”.  
Ride-sharing platforms such as Uber model surge pricing with a weighted directed graph whose edge weights are real-time fares; an unweighted version would be useless for dynamic pricing.  
NASA’s Deep Space Network scheduling system uses a directed weighted multigraph in which multiple parallel edges represent different frequency bands between the same ground station and spacecraft.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Set                  | Vertices and edges are defined as sets; duplicate edges are set-membership questions. |
| Ordered pair         | A directed edge is literally an ordered pair (u, v).      |
| Function             | Edge weights are functions from the edge set to real numbers. |
| Basic notation       | You must read {…} for sets and (… ) for ordered pairs without hesitation. |

If any row above is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Entities and relations
Think of any collection of objects and the connections among them. The objects become vertices; each connection becomes an edge.  
Concrete example: four cities A, B, C, D with roads between them.  
Formally, a graph G is a pair (V, E) where V is a finite set of vertices and E is a set of edges.  
> [!WARNING] Treating the same city name twice in V immediately violates the set definition and produces an ill-formed graph.

### Step 2 — Direction of a relation
A road that can be driven only one way must be recorded differently from a two-way road.  
Concrete example: a one-way street from A to B is written (A, B) while a two-way street is recorded as the unordered pair {A, B}.  
Formally, an edge is either an ordered pair (directed) or an unordered pair (undirected).  
> [!WARNING] Writing (A, B) when the graph is declared undirected silently changes the intended meaning and breaks symmetry-based algorithms.

### Step 3 — Labelling edges with numbers
Some relations carry extra numeric data such as distance or cost.  
Concrete example: the road from A to B is 47 km long; the number 47 is attached to the edge.  
Formally, a weight function w: E → ℝ assigns a real number to every edge. When no such function exists the graph is unweighted.  
> [!WARNING] Forgetting that weights are part of the edge data structure leads to storing them in a separate array whose indices later become misaligned.

### Step 4 — Multiplicity of edges
Two distinct roads may connect the same pair of cities.  
Concrete example: two different highways both run from A to B.  
Formally, E is permitted to contain multiple copies of the same pair only when the graph is declared a multigraph; otherwise E must be a set and duplicates are forbidden.  
> [!WARNING] Allowing duplicate edges in a simple-graph data structure violates the set axiom and produces incorrect degree counts.

### Step 5 — Loops back to the same vertex
A self-loop is an edge from a vertex to itself.  
Concrete example: a circular bus route that returns to the same stop without visiting others.  
Formally, a loop is the pair (v, v) or {v, v}. Simple graphs forbid loops; the allowance is stated separately for multigraphs.  
> [!WARNING] Many adjacency-list implementations crash or create infinite recursion when a loop is inserted without explicit handling.

### Step 6 — Combining the six adjectives
All six adjectives together produce one of eight canonical graph types (directed/undirected × weighted/unweighted × simple/multigraph).  
Concrete example: “directed weighted simple graph” means every edge is an ordered pair, carries a weight, and no two ordered pairs are identical.  
Formally, the six adjectives fix the precise set-theoretic definition of both V and E before any algorithm is applied.

### Step 7 — Textbook-grade statement
A graph G = (V, E) together with the six Boolean flags (directed, weighted, simple, …) completely determines the mathematical object on which every subsequent graph algorithm operates.

## 5. Worked examples — har step show karo

**Example 1 — Cities with one-way roads**  
*Given:* Four cities A, B, C, D; roads exist from A→B, B→C, C→A; each road has travel time 10, 15, 20 respectively. No two roads share the same ordered pair and no road returns to its start.  
*Find:* The six adjectives that classify this graph.  
Step 1: Edges are ordered pairs → directed.  
Step 2: Each edge carries a number → weighted.  
Step 3: No duplicate ordered pairs exist → simple.  
**directed weighted simple graph**  

*Reflection:* The example forces you to notice that direction and weight are independent decisions; omitting either adjective would lose information.

**Example 2 — Mutual friendships**  
*Given:* Five people; every friendship is mutual and carries no numeric strength.  
*Find:* Correct adjectives.  
Edges are unordered pairs and no numbers are present → undirected unweighted. No duplicates → simple.  
**undirected unweighted simple graph**

*Reflection:* The symmetry of “mutual” immediately rules out the directed flag.

**Example 3 — Two parallel motorways**  
*Given:* Cities X and Y connected by two distinct motorways, each 100 km long.  
*Find:* Classification.  
Edges share the same unordered pair yet are distinct physical roads → multigraph. No direction or differing weights → undirected unweighted multigraph.  
**undirected unweighted multigraph**

*Reflection:* The key observation is that “two motorways” means two set elements even though the endpoint pair is identical.

**Example 4 — Mixed airport routes**  
*Given:* Airports P, Q, R; flights P→Q (weight 300), Q→P (weight 300), and two flights P→R (weights 500 and 550).  
*Find:* Full classification.  
Edges are ordered pairs → directed; numbers present → weighted; two distinct edges share the ordered pair (P, R) → multigraph.  
**directed weighted multigraph**

*Reflection:* Direction, weight, and multiplicity must all be checked independently; missing any one produces an incomplete description.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating a directed edge as undirected | Visual arrow is easy to ignore              | Always write the ordered pair explicitly first       |
| Storing weights outside the edge object | Convenience in early code                   | Attach weight to the edge record or adjacency entry  |
| Allowing duplicate keys in adjacency map for simple graphs | Hash-map naturally permits multiple entries | Check existence before insertion                     |
| Forgetting self-loops are forbidden in simple graphs | “It feels natural”                          | Add an explicit guard v ≠ u when building simple graphs |
| Confusing multigraph with weighted graph | Both can have “multiple” numbers            | Ask: are the parallel edges semantically different?  |
| Assuming undirected graph has symmetric adjacency list | Implementation shortcut                     | Store each undirected edge in both directions explicitly |
| Using the same data structure for weighted and unweighted | Memory optimisation temptation              | Keep a separate Boolean flag that algorithms must read |

## 7. The textbook-precise statement
A graph is a triple G = (V, E, w) where V is a finite nonempty set, E ⊆ V × V when the graph is directed and E ⊆ {{u, v} | u, v ∈ V, u ≠ v} when the graph is undirected and simple, and w: E → ℝ is a weight function that may be omitted when the graph is declared unweighted. When multiple edges between the same ordered or unordered pair are permitted, E becomes a multiset. (Cormen et al., Introduction to Algorithms, 4e, §22.1 and Appendix B.4)

## 8. Visual — diagram or schematic
```
A --3-- B
|       |
5       4
|       |
C --2-- D
```
Undirected unweighted edges would omit the numbers; directed edges would replace each “--” with an arrow “→” or “←”.

## 9. The memory technique
**The hook** — Picture a one-way street sign (arrow) carrying a price tag (weight); if two identical signs stand at the same corner you have a multigraph; if the sign points back at itself it is a loop.  
**What to overlearn** — (1) directed edge = ordered pair, (2) simple graph forbids duplicate pairs, (3) weight is a function on edges.  
**Spaced-repetition schedule** — Review definitions after 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — Rebuild from the set (V, E): decide whether each element of E is ordered, carries a number, and whether duplicates are allowed.

## 10. What this unlocks
These six adjectives become compile-time or run-time parameters of every graph algorithm you will meet next.  
- Topological sort requires directed acyclic graphs.  
- Dijkstra’s algorithm requires directed or undirected weighted graphs with non-negative weights.  
- Union-Find / Kruskal works only on undirected weighted graphs.  
- Adjacency-matrix versus adjacency-list trade-offs change when the graph is declared a multigraph.  
- Network-flow problems need directed weighted graphs that may contain multiple edges.

## 11. Self-check — five questions, no answers
1. Give a real-world situation that must be modelled as a directed weighted multigraph but cannot be modelled as a simple graph.  
2. Write the exact set E for an undirected simple graph on vertices {1,2,3} that contains exactly two edges.  
3. A programmer stores two edges (u,v,10) and (u,v,20) inside a map keyed by the pair (u,v). Which single adjective has been violated?  
4. Why does the adjacency-matrix representation of a multigraph require extra bookkeeping compared with a simple graph?  
5. Convert the sentence “All roads are two-way and have tolls” into the six-adjective classification and justify each adjective in one line.