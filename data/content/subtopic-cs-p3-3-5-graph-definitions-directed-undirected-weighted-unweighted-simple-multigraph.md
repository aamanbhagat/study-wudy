## What it is
A graph is a mathematical structure used to model relationships between objects. It consists of a set of *vertices* (or nodes), which represent the objects, and a set of *edges*, which represent the connections or relationships between pairs of vertices. Different types of graphs—directed, undirected, weighted, etc.—add specific rules to these connections to model different kinds of systems.

## Why it matters
Graphs are the fundamental data structure for modeling networks. In aerospace, they model flight paths for airlines or communication links in a satellite constellation. In machine learning, neural networks are essentially complex, weighted, directed graphs, and graph neural networks (GNNs) operate directly on graph-structured data like molecules or social networks. In physics, graphs can represent the interactions between particles in a system.

## When to study it
You are ready for this topic. The only prerequisites are a basic understanding of set theory (what a set is, elements, and pairs) and the general concept of a data structure as a way to organize information. This is one of the first things you learn when studying graphs.

## How to study it (step by step)
1.  **Start with the core definition.** Write down the formal definition of a graph $G = (V, E)$, where $V$ is a set of vertices and $E$ is a set of edges. Internalize that a graph is just these two sets.
2.  **Draw an undirected, unweighted, simple graph.** Take $V = \{A, B, C, D\}$ and $E = \{\{A, B\}, \{B, C\}, \{C, D\}, \{D, A\}\}$. Draw the four vertices as dots and connect them with lines according to the edges. Notice the edges are sets, meaning $\{A, B\}$ is the same as $\{B, A\}$.
3.  **Introduce direction.** Redraw the same graph, but now define the edges as ordered pairs: $E = \{(A, B), (B, C), (C, D), (D, A)\}$. Add arrowheads to your lines to show the direction. This is a *directed graph* (or digraph). $(A, B)$ is not the same as $(B, A)$.
4.  **Add weights.** Take your directed graph and assign a number (a *weight*) to each edge. For example, let the weight of $(A, B)$ be 5, and $(B, C)$ be 2. These could represent distance, cost, or time. This is now a *weighted, directed graph*.
5.  **Introduce complexity.** Now, add a second edge from $A$ to $B$ with a different weight, say 8. You now have two distinct edges $(A, B)_1$ and $(A, B)_2$. This is a *multigraph*. Add an edge from $A$ back to itself, $(A, A)$. This is a *self-loop*. A graph with no multiedges or self-loops is called a *simple graph*.
6.  **Formalize and contrast.** For each term (directed/undirected, weighted/unweighted, simple/multigraph), write a one-sentence formal definition next to a one-sentence intuitive explanation. For example: "Undirected: Edges are unordered sets $\{u, v\}$. Intuition: The relationship is mutual, like being siblings."

## Key ideas, with intuition
1.  **Vertices are nouns, Edges are verbs.** A graph models entities and their relationships. Vertices ($V$) are the "things" (cities, people, atoms). Edges ($E$) are the "connections" (roads, friendships, bonds). The structure of the graph *is* the information.
2.  **Symmetry defines Direction.** The key difference between undirected and directed graphs is symmetry. An undirected edge $\{u, v\}$ implies a symmetric, two-way relationship. A directed edge $(u, v)$ is a one-way relationship.
    $$
    \text{Undirected Edge: } \{u, v\} \equiv \{v, u\} \quad (\text{A Facebook friendship}) \\
    \text{Directed Edge: } (u, v) \neq (v, u) \quad (\text{A Twitter follow})
    $$
3.  **Weights quantify the relationship.** An unweighted graph just says "a connection exists." A weighted graph says "here is the cost/strength/length of that connection." The weight is a function $w: E \to \mathbb{R}$ that maps each edge to a real number.
4.  **Simple vs. Multigraph is about uniqueness.** A simple graph assumes there is at most one relationship (edge) between any two entities (vertices). A multigraph allows for multiple distinct relationships between the same two entities, like having different flights on different airlines between the same two cities. A graph is simple if it has no multiedges and no self-loops (edges from a vertex to itself).

## Worked example
Let's model a small network of one-way flights between cities and classify the resulting graph.

**Problem:**
Define a graph $G$ representing the following flights:
- A flight from Seattle (S) to Denver (D) costs $150.
- A flight from Denver (D) to Chicago (C) costs $100.
- A flight from Seattle (S) to Chicago (C) costs $250.
- There are two different daily flights from Chicago (C) to Seattle (S), one costing $280 and another costing $310.

**Solution:**
1.  **Define the vertices ($V$).** The vertices are the cities.
    $$ V = \{S, D, C\} $$
2.  **Define the edges ($E$) and weights ($w$).** The edges are the flights. Since flights are one-way, the edges must be directed (ordered pairs). Since they have costs, the graph is weighted.
    - S to D: $(S, D)$ with weight $w(S, D) = 150$.
    - D to C: $(D, C)$ with weight $w(D, C) = 100$.
    - S to C: $(S, C)$ with weight $w(S, C) = 250$.
    - C to S (flight 1): $(C, S)_1$ with weight $w((C, S)_1) = 280$.
    - C to S (flight 2): $(C, S)_2$ with weight $w((C, S)_2) = 310$.
    
    The edge set $E$ is formally $\{ (S, D), (D, C), (S, C), (C, S)_1, (C, S)_2 \}$.

3.  **Classify the graph.**
    - **Directed or Undirected?** It is **directed** because the flights are one-way. For example, there's a flight $(S, D)$ but no flight $(D, S)$.
    - **Weighted or Unweighted?** It is **weighted** because each flight has an associated cost.
    - **Simple or Multigraph?** It is a **multigraph** because there are two distinct edges from Chicago (C) to Seattle (S). A simple graph cannot have multiple edges between the same two vertices in the same direction.

**Reflection:**
- Step 1 worked because we correctly identified the "objects" as vertices.
- Step 2 worked because we translated the one-way, costly nature of flights into directed, weighted edges. The existence of two C-to-S flights forced us to acknowledge multiple edges.
- Step 3 worked because we systematically checked our graph against the formal definitions for each category.

## Diagrams
An undirected, unweighted, simple graph:
```text
      A-------B
      |       |
      |       |
      D-------C
```

A directed, weighted multigraph (based on the worked example):
```text
         (150)
      S -------> D
      | \      /
(250) |  \    / (100)
      |   \  /
      v    \/
      C <---+
      ^     |
      |\----|
(280) |  (310)
      +-----+
```

## Memory technique — remember this forever
1.  **The Road Trip Story:** Imagine planning a road trip.
    - The cities are **Vertices**.
    - The roads are **Edges**.
    - If a road is two-way, the graph is **Undirected**. If it's a one-way street, it's **Directed**.
    - The distance or toll on a road is its **Weight**. If you only care about which cities are connected, it's **Unweighted**.
    - If there's only one highway between two cities, it's a **Simple graph**. If there are multiple bridges or routes you want to model separately, it's a **Multigraph**.

2.  **Must-learn facts:**
    - A graph is a pair $G = (V, E)$.
    - Undirected edge: an unordered set $\{u, v\}$.
    - Directed edge: an ordered pair $(u, v)$.

3.  **Spaced Repetition Schedule:** Review these definitions and redraw the diagrams from this lesson at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, start with dots and lines. Ask these questions to rebuild the definitions:
    - **What are the dots?** Vertices.
    - **What are the lines?** Edges.
    - **Do the lines have arrows?** Yes $\to$ Directed. No $\to$ Undirected.
    - **Do the lines have numbers on them (cost, distance)?** Yes $\to$ Weighted. No $\to$ Unweighted.
    - **Can I draw more than one line between the same two dots?** Yes $\to$ Multigraph. No $\to$ Simple Graph.

## Common mistakes
1.  **Assuming Symmetry:** In the real world, many relationships feel symmetric. Students often forget to check if a graph is specified as directed and incorrectly assume an edge $(u, v)$ implies an edge $(v, u)$.
2.  **Confusing Path and Edge:** An edge is a direct connection between two vertices. A path is a sequence of edges. Don't say "the edge from A to D" if you mean the path A $\to$ B $\to$ C $\to$ D.
3.  **Formalism Sloppiness:** Using parentheses $(u, v)$ when you mean an undirected edge $\{u, v\}$. The notation is precise and implies the type of graph.
4.  **Ignoring Self-Loops:** Forgetting to check for edges of the form $(v, v)$ when determining if a graph is simple. A simple graph has neither multiedges nor self-loops.

## Self-check
1.  Look at the ASCII diagram for the "directed, weighted multigraph" above. Write down its formal definition as $G=(V, E)$ and list the weights for each edge in $E$.
2.  Model your immediate family as a graph where vertices are people. Define the edges to represent the "is a parent of" relationship. Draw the graph and classify it (directed/undirected, etc.). Is it a simple graph?
3.  A graph is defined by $V = \{0, 1, 2, 3\}$ and $E = \{ \{i, j\} \mid i, j \in V, (i+j) \pmod 4 = 1 \}$. Draw this graph and classify it fully.