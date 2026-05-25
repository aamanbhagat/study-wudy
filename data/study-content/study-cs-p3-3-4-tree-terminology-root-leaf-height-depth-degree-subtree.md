## 1. What it is — in plain English

Imagine an upside-down tree, like a family tree where you put the oldest ancestor at the very top. Or think about the folder structure on your computer: you have a main drive (like "C:"), and inside it are folders, and inside those folders are more folders or actual files. This branching, hierarchical structure is what we call a "tree" in computer science.

Just like a real tree has a trunk, branches, and leaves, our data structures have similar parts. The very first item, the one at the top of the hierarchy that everything else branches off from, is called the **root**. It's the ultimate parent.

At the other end, the items that have no further branches or children are called **leaves**. In our computer folder analogy, these would be the actual files, not folders that contain other items. Everything else in between is a "branch" or an "internal node."

To describe these structures, we use terms like **height** (how "tall" the tree is from its root to its furthest leaf), **depth** (how far a specific item is from the root), and **degree** (how many direct branches an item has). A **subtree** is simply a smaller tree that starts from any node and includes all its descendants.

## 2. Why it matters — real-world applications

Understanding tree terminology is fundamental because trees are one of the most ubiquitous and powerful data structures in computer science. They model hierarchical relationships and enable efficient data organization and retrieval.

1.  **File Systems:** The most direct and common example. Your computer's entire directory structure (folders within folders, leading to files) is a tree. The root is your main drive (e.g., `C:\` on Windows, `/` on Linux/macOS). Folders are internal nodes, and files are leaves. Operations like navigating paths, listing contents, or searching rely on this tree structure.
2.  **Machine Learning — Decision Trees:** In artificial intelligence, decision trees are used for classification and regression tasks. Each internal node represents a "test" on an attribute (e.g., "Is the patient's temperature > 100°F?"), each branch represents the outcome of the test, and each leaf node represents a class label or a predicted value (e.g., "Flu" or "No Flu"). Understanding depth and height is crucial for pruning trees to prevent overfitting.
3.  **Compilers — Abstract Syntax Trees (ASTs):** When you write code, a compiler first parses it and converts it into an Abstract Syntax Tree. This tree represents the grammatical structure of your program. The root might be the entire program, internal nodes could be statements or expressions, and leaves could be variables or literal values. This tree is then used for analysis, optimization, and code generation. For example, in aerospace software, ensuring the correctness of code through AST analysis is critical for flight control systems.
4.  **Networking — Routing Tables:** Network routers often use tree-like structures (specifically trie data structures, which are a type of tree) to store routing information. This allows them to quickly look up the next hop for an IP address by traversing the tree based on the bits of the address. The depth of a node in such a tree corresponds to the number of bits processed, directly impacting lookup efficiency.
5.  **Biology — Phylogenetic Trees:** In bioinformatics, phylogenetic trees represent the evolutionary relationships among various biological species or other entities. The root represents a common ancestor, internal nodes are hypothetical ancestors, and leaves are extant species. The depth and branching patterns help scientists understand evolutionary history and divergence times.

## 3. Prerequisites — what you must know first

Before diving deep into tree terminology, ensure you have a solid grasp of these foundational concepts:

*   **Nodes and Edges:** The basic building blocks of graphs and trees. A node is an entity that stores data, and an edge is a connection between two nodes.
*   **Pointers/References:** How one node can "point" to or "refer" to another node in memory, forming connections.
*   **Basic Graph Theory:** Understand that a tree is a specific type of graph—specifically, a connected, acyclic (no loops) graph.
*   **Recursion:** Trees are inherently recursive structures; understanding how a function can call itself to process parts of a tree is vital.

## 4. The core idea — step by step

Let's break down the fundamental terms used to describe trees. We'll use a consistent example tree throughout this section.

```text
      A
     /|\
    B C D
   /|   |
  E F   G
 /
H
```

### Step 1: Nodes and Edges (Review)

*   **Plain-English Statement:** In any tree, the individual items that hold data are called "nodes," and the lines connecting them are called "edges." Think of nodes as cities and edges as roads.
*   **Concrete Example:** In our example tree, `A`, `B`, `C`, `D`, `E`, `F`, `G`, `H` are all nodes. The line between `A` and `B` is an edge.
*   **Formal/Mathematical Version:** A tree $T$ is a collection of nodes (or vertices) $V$ and a set of edges $E$ connecting pairs of nodes. We often denote a tree as $T = (V, E)$.
*   **What could go wrong:** Confusing the data *within* a node with the node itself. A node is a container; its value is the data it holds.

### Step 2: Root

*   **Plain-English Statement:** The root is the very first node in the tree, the one at the top from which all other nodes ultimately descend. It's the "ancestor of all ancestors."
*   **Concrete Example:** In our example tree: `A` is the root.
*   **Formal/Mathematical Version:** In a rooted tree, the **root** is the unique node that has no parent. It is the starting point for all paths in the tree.
*   **What could go wrong:** Assuming a tree can have multiple roots. A tree, by definition (in the context of rooted trees), has exactly one root.

### Step 3: Leaf (or External Node)

*   **Plain-English Statement:** A leaf node is a node that has no children. It's at the "end" of a branch.
*   **Concrete Example:** In our example tree: `C`, `F`, `G`, `H` are leaf nodes.
*   **Formal/Mathematical Version:** A node $v \in V$ is a **leaf** (or external node) if its out-degree is 0, meaning it has no children.
*   **What could go wrong:** Mistaking a node with only one child as a leaf. A leaf *must* have zero children.

### Step 4: Parent, Child, Sibling, Ancestor, Descendant

These terms describe the relationships between nodes.

*   **Plain-English Statement:**
    *   A **parent** is a node directly above another node.
    *   A **child** is a node directly below another node.
    *   **Siblings** are nodes that share the same parent.
    *   An **ancestor** of a node is any node on the path from the root to that node (including the root itself, but typically not the node itself).
    *   A **descendant** of a node is any node in the subtree rooted at that node (including the node itself, but typically not the node itself).
*   **Concrete Example:**
    *   `A` is the parent of `B`, `C`, `D`.
    *   `B` is a child of `A`.
    *   `B`, `C`, `D` are siblings.
    *   `A` is an ancestor of `E`. `A` and `B` are ancestors of `H`.
    *   `E` is a descendant of `B`. `E`, `F`, `H` are descendants of `B`.
*   **Formal/Mathematical Version:**
    *   If there is a directed edge from node $u$ to node $v$, then $u$ is the **parent** of $v$, and $v$ is a **child** of $u$.
    *   Nodes that are children of the same parent are **siblings**.
    *   Node $u$ is an **ancestor** of node $v$ if $u$ is on the unique path from the root to $v$.
    *   Node $v$ is a **descendant** of node $u$ if $u$ is an ancestor of $v$.
*   **What could go wrong:** Confusing direct parent/child relationships with indirect ancestor/descendant relationships.

### Step 5: Degree

*   **Plain-English Statement:** The degree of a node in a rooted tree refers to the number of direct children it has. It tells you how many branches stem directly from that node.
*   **Concrete Example:**
    *   Degree of `A` is 3 (children: `B`, `C`, `D`).
    *   Degree of `B` is 2 (children: `E`, `F`).
    *   Degree of `C` is 0 (no children).
    *   Degree of `H` is 0 (no children).
*   **Formal/Mathematical Version:** For a node $v$ in a rooted tree, its **degree** is defined as its out-degree, which is the number of children of $v$.
*   **What could go wrong:** In general graph theory, degree can mean total edges connected (in-degree + out-degree). In rooted trees, when we say "degree," we almost always mean the *number of children* (out-degree). Leaf nodes have a degree of 0.

### Step 6: Depth

*   **Plain-English Statement:** The depth of a node tells you how many "steps" or "levels" away it is from the root. The root itself is at depth 0.
*   **Concrete Example:**
    *   Depth of `A` (root) is 0.
    *   Depth of `B`, `C`, `D` is 1.
    *   Depth of `E`, `F`, `G` is 2.
    *   Depth of `H` is 3.
*   **Formal/Mathematical Version:** The **depth** of a node $v$, denoted $depth(v)$, is the length of the path (number of edges) from the root to $v$. By definition, $depth(root) = 0$.
    $$ depth(v) = \begin{cases} 0 & \text{if } v \text{ is the root} \\ 1 + depth(parent(v)) & \text{otherwise} \end{cases} $$
*   **What could go wrong:** Starting depth at 1 instead of 0. Always remember the root is at depth 0.

### Step 7: Height

*   **Plain-English Statement:** The height of a node is the length of the longest path from that node *down* to a leaf in its subtree. The height of the entire tree is the height of its root. A leaf node has a height of 0.
*   **Concrete Example:**
    *   Height of `C` (leaf) is 0.
    *   Height of `F` (leaf) is 0.
    *   Height of `G` (leaf) is 0.
    *   Height of `H` (leaf) is 0.
    *   Height of `E`: `E` has one child `H`. `H` is a leaf (height 0). So, the path from `E` to `H` is 1 edge. Height of `E` is 1.
    *   Height of `B`: `B` has children `E` and `F`. Longest path from `B` to a leaf is `B -> E -> H` (2 edges). Height of `B` is 2.
    *   Height of `D`: `D` has child `G`. `G` is a leaf (height 0). Path from `D` to `G` is 1 edge. Height of `D` is 1.
    *   Height of `A` (root): `A` has children `B`, `C`, `D`. Longest path from `A` to a leaf is `A -> B -> E -> H` (3 edges). Height of `A` is 3. The height of the entire tree is 3.
*   **Formal/Mathematical Version:** The **height** of a node $v$, denoted $height(v)$, is the length of the longest path (number of edges) from $v$ to a leaf in the subtree rooted at $v$. By definition, $height(leaf) = 0$.
    $$ height(v) = \begin{cases} 0 & \text{if } v \text{ is a leaf} \\ 1 + \max_{c \in children(v)} (height(c)) & \text{otherwise} \end{cases} $$
    The height of the tree $T$ is $height(root(T))$.
*   **What could go wrong:** Confusing height with depth. Depth is from the root *down* to a node. Height is from a node *down* to its furthest leaf. Also, remember a leaf node has height 0, not 1.

### Step 8: Subtree

*   **Plain-English Statement:** A subtree is essentially a smaller tree that you can "cut out" of a larger tree. It consists of any node and all of its descendants, along with the edges connecting them.
*   **Concrete Example:**
    *   The node `B` and all its descendants (`E`, `F`, `H`) form a subtree.
    *   The node `E` and all its descendants (`H`) form a subtree.
    *   Even a single leaf node like `C` can be considered a subtree (a trivial one with only one node).
*   **Formal/Mathematical Version:** A **subtree** rooted at node $v$ is the tree formed by $v$ and all its descendants, along with the edges that connect them in the original tree.
*   **What could go wrong:** Forgetting to include *all* descendants when identifying a subtree. A subtree rooted at $v$ means $v$ is the root of that new, smaller tree.

## 5. Worked examples — multiple, with every step shown

Let's use the following ASCII tree for our examples:

```text
        R
       / \
      S   T
     /|   |\
    U V   W X
   /     /
  Y     Z
```

### Example 1: Basic Identifications

**Problem:** For the given tree, identify the root node, all leaf nodes, and the depth of node `W`.

**Given:** The tree structure shown above.
**Want:** Root, all leaves, $depth(W)$.

**Solution:**

1.  **Identify the Root Node:**
    *   **Plain English:** The root is the node at the very top, with no parent.
    *   **Step:** Looking at the diagram, `R` is the topmost node, and no arrow points to it from above.
    *   **Why it works:** By definition, the root is the unique node from which all other nodes descend.
    *   **Answer:** The root node is **R**.

2.  **Identify all Leaf Nodes:**
    *   **Plain English:** Leaf nodes are those at the end of branches, with no children.
    *   **Step:**
        *   `Y` has no children.
        *   `V` has no children.
        *   `Z` has no children.
        *   `X` has no children.
        *   `U`, `W`, `S`, `T`, `R` all have children.
    *   **Why it works:** By definition, a leaf node has an out-degree of 0.
    *   **Answer:** The leaf nodes are **Y, V, Z, X**.

3.  **Calculate the Depth of Node `W`:**
    *   **Plain English:** Depth is the number of edges from the root to the node, with the root at depth 0.
    *   **Step:**
        *   $depth(R) = 0$ (R is the root)
        *   $depth(T) = 1 + depth(R) = 1 + 0 = 1$ (T is a child of R)
        *   $depth(W) = 1 + depth(T) = 1 + 1 = 2$ (W is a child of T)
    *   **Why it works:** We count the edges along the unique path from the root to `W`. The path is $R \to T \to W$, which has 2 edges.
    *   **Answer:** The depth of node `W` is **2**.

**Reflection:** This example was straightforward, testing basic definitions. The main trick is remembering that depth starts at 0 for the root.

### Example 2: Degree and Height of a Node

**Problem:** For the given tree, determine the degree of node `T` and the height of node `S`.

**Given:** The tree structure from Example 1.
**Want:** $degree(T)$, $height(S)$.

**Solution:**

1.  **Determine the Degree of Node `T`:**
    *   **Plain English:** The degree of a node is the number of its direct children.
    *   **Step:** Look at node `T`. Its direct children are `W` and `X`.
    *   **Why it works:** We count the outgoing edges from `T`. There are two: `T -> W` and `T -> X`.
    *   **Answer:** The degree of node `T` is **2**.

2.  **Calculate the Height of Node `S`:**
    *   **Plain English:** The height of a node is the length of the longest path from that node down to a leaf in its subtree. We start by finding the heights of its children.
    *   **Step 2.1: Find heights of leaves in S's subtree.**
        *   `Y` is a leaf, so $height(Y) = 0$.
        *   `V` is a leaf, so $height(V) = 0$.
    *   **Step 2.2: Find height of child `U`.**
        *   `U` has child `Y`. Path `U -> Y` has length 1.
        *   $height(U) = 1 + height(Y) = 1 + 0 = 1$.
    *   **Step 2.3: Find height of node `S`.**
        *   `S` has children `U` and `V`.
        *   $height(S) = 1 + \max(height(U), height(V))$
        *   $height(S) = 1 + \max(1, 0)$
        *   $height(S) = 1 + 1 = 2$.
    *   **Why it works:** We recursively find the longest path to a leaf originating from `S`. The path `S -> U -> Y` has length 2, while `S -> V` has length 1. The maximum is 2.
    *   **Answer:** The height of node `S` is **2**.

**Reflection:** Calculating height requires a bottom-up approach, starting from leaves and working upwards. It's easy to confuse with depth or to miscalculate the longest path.

### Example 3: Subtrees and Tree Height

**Problem:** For the given tree, list all non-trivial subtrees (subtrees with more than one node) and determine the height of the entire tree.

**Given:** The tree structure from Example 1.
**Want:** Non-trivial subtrees, $height(R)$.

**Solution:**

1.  **List all Non-Trivial Subtrees:**
    *   **Plain English:** A subtree rooted at a node includes that node and all its descendants. A non-trivial subtree has more than just the root node itself.
    *   **Step:**
        *   Subtree rooted at `R`: Includes `R, S, T, U, V, W, X, Y, Z`. This is the entire tree.
        *   Subtree rooted at `S`: Includes `S, U, V, Y`.
        *   Subtree rooted at `T`: Includes `T, W, X, Z`.
        *   Subtree rooted at `U`: Includes `U, Y`.
        *   Subtree rooted at `W`: Includes `W, Z`.
        *   Nodes `V, Y, X, Z` are leaves, so subtrees rooted at them are trivial (just the node itself).
    *   **Why it works:** We apply the definition of a subtree, taking each internal node as a potential root for a smaller tree.
    *   **Answer:** The non-trivial subtrees are:
        *   **Subtree rooted at R: {R, S, T, U, V, W, X, Y, Z}**
        *   **Subtree rooted at S: {S, U, V, Y}**
        *   **Subtree rooted at T: {T, W, X, Z}**
        *   **Subtree rooted at U: {U, Y}**
        *   **Subtree rooted at W: {W, Z}**

2.  **Determine the Height of the Entire Tree:**
    *   **Plain English:** The height of the entire tree is the height of its root node, which is the length of the longest path from the root to any leaf.
    *   **Step 2.1: Calculate heights of all leaf nodes (already done in Ex 2, but good to re-state for clarity):**
        *   $height(Y) = 0$
        *   $height(V) = 0$
        *   $height(Z) = 0$
        *   $height(X) = 0$
    *   **Step 2.2: Calculate heights of nodes one level up from leaves:**
        *   $height(U) = 1 + height(Y) = 1 + 0 = 1$
        *   $height(W) = 1 + height(Z) = 1 + 0 = 1$
    *   **Step 2.3: Calculate heights of nodes one level up from those:**
        *   $height(S) = 1 + \max(height(U), height(V)) = 1 + \max(1, 0) = 1 + 1 = 2$
        *   $height(T) = 1 + \max(height(W), height(X)) = 1 + \max(1, 0) = 1 + 1 = 2$
    *   **Step 2.4: Calculate height of the root `R`:**
        *   $height(R) = 1 + \max(height(S), height(T))$
        *   $height(R) = 1 + \max(2, 2)$
        *   $height(R) = 1 + 2 = 3$
    *   **Why it works:** We apply the recursive definition of height, ensuring we take the *maximum* height among children's subtrees at each step. The longest path from `R` to a leaf is `R -> S -> U -> Y` (length 3), or `R -> T -> W -> Z` (length 3).
    *   **Answer:** The height of the entire tree is **3**.

**Reflection:** Identifying subtrees requires careful consideration of all descendants. Calculating the overall tree height builds upon individual node height calculations, emphasizing the recursive nature.

### Example 4: Comprehensive Terminology Application

**Problem:** For the following tree, calculate the depth of node `F`, the height of node `B`, and the degree of node `C`.

```text
      A
     / \
    B   C
   /|   |\
  D E   F G
 /     /
H     I
```

**Given:** The tree structure shown above.
**Want:** $depth(F)$, $height(B)$, $degree(C)$.

**Solution:**

1.  **Calculate the Depth of Node `F`:**
    *   **Plain English:** Count the edges from the root (`A`) to `F`.
    *   **Step:**
        *   $depth(A) = 0$ (Root)
        *   $depth(C) = 1 + depth(A) = 1 + 0 = 1$ (C is child of A)
        *   $depth(F) = 1 + depth(C) = 1 + 1 = 2$ (F is child of C)
    *   **Why it works:** The path from `A` to `F` is `A -> C -> F`, which has 2 edges.
    *   **Answer:** The depth of node `F` is **2**.

2.  **Calculate the Height of Node `B`:**
    *   **Plain English:** Find the longest path from `B` to a leaf in its subtree.
    *   **Step 2.1: Identify leaves in B's subtree:** `H`, `E`.
        *   $height(H) = 0$
        *   $height(E) = 0$
    *   **Step 2.2: Calculate height of child `D`:**
        *   `D` has one child `H`.
        *   $height(D) = 1 + height(H) = 1 + 0 = 1$.
    *   **Step 2.3: Calculate height of node `B`:**
        *   `B` has children `D` and `E`.
        *   $height(B) = 1 + \max(height(D), height(E))$
        *   $height(B) = 1 + \max(1, 0)$
        *   $height(B) = 1 + 1 = 2$.
    *   **Why it works:** The longest path from `B` to a leaf is `B -> D -> H`, which has 2 edges.
    *   **Answer:** The height of node `B` is **2**.

3.  **Determine the Degree of Node `C`:**
    *   **Plain English:** Count the number of direct children of `C`.
    *   **Step:** Node `C` has two direct children: `F` and `G`.
    *   **Why it works:** The degree of a node is its out-degree, which is the count of its children.
    *   **Answer:** The degree of node `C` is **2**.

**Reflection:** This example combined all three terms, requiring careful application of each definition. It's crucial to distinguish between starting points for depth (from root) and height (from the node itself, looking down).

## 6. Common mistakes and traps

1.  **Depth vs. Height Confusion:** Students often mix these up. Remember: **Depth** is how far *down* a node is *from the root* (like levels in a building, starting from ground 0). **Height** is how far *up* the tree extends *from a particular node down to its furthest leaf* (like measuring a tree from a branch to its highest leaf).
2.  **Off-by-one Errors for Depth/Height:** Forgetting that the root's depth is 0, or a leaf's height is 0. Always count edges, not nodes, for path lengths.
3.  **Misinterpreting "Degree":** In general graph theory, degree can mean total connections. In rooted trees, "degree" almost exclusively refers to the *out-degree* (number of children).
4.  **Incorrectly Identifying Leaves:** A node is only a leaf if it has *no* children. A node with one child is an internal node, not a leaf.
5.  **Forgetting the Uniqueness of the Root:** A rooted tree has exactly one root. If a structure has multiple disconnected components, it's a "forest" of trees, not a single tree.
6.  **Subtree Scope:** When identifying a subtree rooted at node $X$, remember to include $X$ itself and *all* its descendants, not just its direct children.

## 7. Textbook-precise explanation

In computer science, a **tree** is an abstract data type that simulates a hierarchical tree structure, with a root value and subtrees of children with a parent node, represented as a set of linked nodes. More formally, a rooted tree is a connected acyclic graph where one node has been designated as the **root**.

Let $T = (V, E)$ be a rooted tree, where $V$ is the set of nodes and $E$ is the set of directed edges.

*   **Root:** The **root** of $T$ is the unique node $r \in V$ such that its in-degree is 0. That is, there is no edge $(u, r)$ for any $u \in V$.
*   **Parent and Child:** For an edge $(u, v) \in E$, node $u$ is the **parent** of node $v$, and node $v$ is a **child** of node $u$.
*   **Siblings:** Two nodes $v_1, v_2 \in V$ are **siblings** if they share the same parent.
*   **Ancestor and Descendant:** Node $u$ is an **ancestor** of node $v$ if $u$ is on the unique path from the root to $v$. Node $v$ is a **descendant** of node $u$ if $u$ is an ancestor of $v$. (Some definitions include $u$ as an ancestor of itself, and $v$ as a descendant of itself; others refer to "proper ancestor" or "proper descendant" to exclude the node itself.)
*   **Leaf (or External Node):** A node $v \in V$ is a **leaf** (or external node) if its out-degree is 0, meaning it has no children.
*   **Internal Node:** A node $v \in V$ is an **internal node** if it is not a leaf.
*   **Degree:** The **degree** of a node $v \in V$ is the number of its children (its out-degree).
*   **Depth:** The **depth** of a node $v \in V$, denoted $depth(v)$, is the length of the unique path (number of edges) from the root to $v$. By definition, $depth(root) = 0$.
    $$ depth(v) = \begin{cases} 0 & \text{if } v \text{ is the root} \\ 1 + depth(parent(v)) & \text{otherwise} \end{cases} $$
*   **Height:** The **height** of a node $v \in V$, denoted $height(v)$, is the length of the longest path (number of edges) from $v$ to any leaf in the subtree rooted at $v$. By definition, $height(leaf) = 0$.
    $$ height(v) = \begin{cases} 0 & \text{if } v \text{ is a leaf} \\ 1 + \max_{c \in children(v)} (height(c)) & \text{otherwise} \end{cases} $$
    The height of the tree $T$ is $height(root(T))$.
*   **Subtree:** A **subtree** rooted at node $v \in V$ is the tree $T_v = (V_v, E_v)$, where $V_v$ consists of $v$ and all its descendants, and $E_v$ consists of all edges from $E$ whose endpoints are both in $V_v$.

(Cormen et al., *Introduction to Algorithms*, 4e, Chapter 10, "Elementary Data Structures")

## 8. ASCII diagrams

Here's a detailed ASCII diagram representing a generic tree with various terms labeled. This diagram will be useful for visualizing the definitions.

```text
                                  ┌────────────────────┐
                                  │       ROOT (A)     │  <-- Depth 0, Height 3 (of tree)
                                  └─┬──────────────────┘
                                    │ Degree = 3
                  ┌─────────────────┼───────────────────┐
                  │                 │                   │
            ┌─────┴─────┐     ┌─────┴─────┐     ┌───────┴───────┐
            │  Node B   │     │  Node C   │     │    Node D     │  <-- Depth 1
            └─┬───┬─────┘     └───────────┘     └───────────────┘
              │   │             Degree = 0        Degree = 1
              │   │             (LEAF)            Height = 1
              │   │ Height = 2                    (Subtree D,G)
              │   │                               ┌───────────────┐
      ┌───────┴───┐       ┌─────┴─────┐           │    Node G     │  <-- Depth 2
      │  Node E   │       │  Node F   │           └───────────────┘
      └─┬─────────┘       └───────────┘             Degree = 0
        │ Degree = 1        Degree = 0                (LEAF)
        │ Height = 1        (LEAF)
        │ (Subtree E,H)
        │
  ┌─────┴─────┐
  │  Node H   │  <-- Depth 3
  └───────────┘
    Degree = 0
    (LEAF)
```

**Description:**
*   **Node A** is the **Root** (depth 0). It has 3 children (B, C, D), so its **degree** is 3. Its **height** is 3, as the longest path to a leaf is A -> B -> E -> H (3 edges).
*   **Nodes B, C, D** are children of A, and are at **depth 1**.
*   **Node C** has no children, so it's a **Leaf** node and its **degree** is 0. Its **height** is 0.
*   **Node B** has two children (E, F), so its **degree** is 2. Its **height** is 2 (path B -> E -> H). The nodes {B, E, F, H} form a **subtree** rooted at B.
*   **Nodes E, F, G** are at **depth 2**.
*   **Node F** is a **Leaf** (degree 0, height 0).
*   **Node G** is a **Leaf** (degree 0, height 0).
*   **Node D** has one child (G), so its **degree** is 1. Its **height** is 1 (path D -> G). The nodes {D, G} form a **subtree** rooted at D.
*   **Node E** has one child (H), so its **degree** is 1. Its **height** is 1 (path E -> H). The nodes {E, H} form a **subtree** rooted at E.
*   **Node H** is a **Leaf** (depth 3, degree 0, height 0).

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **The Upside-Down Family Tree:** Always visualize trees in computer science as growing downwards, with the "oldest ancestor" (the root) at the top, and the "youngest generation" (the leaves) at the bottom.
        *   **Root:** The "family patriarch/matriarch" at the very top. Unique, no one above them.
        *   **Leaves:** The "newborns" or "end of the line" in the family tree. They have no children.
        *   **Depth:** Think of **D**epth as how many **D**oors you pass through from the root to get to a node. Each door is an edge. Root is at 0 doors.
        *   **Height:** Think of **H**eight as how **H**igh the tree grows *below* a node, down to its furthest leaf. A single leaf has 0 height (it doesn't grow further down).
        *   **Degree:** How many direct "offspring" a node has.
        *   **Subtree:** A "branch" of the family, including an ancestor and all their descendants.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Root:** Unique node with no parent.
    *   **Leaf:** Node with no children (degree 0).
    *   **Depth of Root = 0; Height of Leaf = 0.** (Crucial for avoiding off-by-one errors).

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review all definitions and worked examples.
    *   **Day 3:** Re-draw a complex tree and label all terms (root, leaves, depth of 3 nodes, height of 2 nodes, degree of 3 nodes, 2 subtrees).
    *   **Day 7:** Explain the difference between depth and height to someone (or yourself aloud) without looking at notes.
    *   **Day 16:** Solve 2-3 new problems involving these terms from a textbook or online resource.
    *   **Day 35:** Create your own complex tree and calculate all terms for several nodes.

4.  **First-Principles Re-derivation Pathway:**
    If you forget a definition, especially for depth or height:
    *   **Draw a simple tree:** Start with a root, add a few children, and a few more children to some of them, making sure some are leaves.
    *   **For Depth:** Pick a node. Starting from the root, trace the path to your chosen node, counting each edge you cross. The root itself is "0 edges away."
    *   **For Height:** Pick a node. Identify all the leaves that are descendants of this node. For each of these leaves, trace the path *from your chosen node* to that leaf, counting the edges. The *maximum* count you get is the height. If your node *is* a leaf, there are no paths to count, so its height is 0.
    *   **For Degree:** Pick a node. Count how many direct lines (edges) go *downwards* from that node. That's its degree.

## 10. Connections — what this leads to

A solid understanding of tree terminology is the bedrock for almost all advanced tree-based data structures and algorithms. This foundational knowledge directly unlocks and is prerequisite for:

*   **Tree Traversals (DFS & BFS):** Understanding parent-child relationships, depth, and subtrees is essential for implementing algorithms like pre-order, in-order, post-order, and level-order traversals, which visit every node in a tree systematically.
*   **Binary Trees and Binary Search Trees (BSTs):** These are specialized trees where each node has at most two children. Terminology like root, leaf, height, and depth become crucial for analyzing their performance (e.g., average vs. worst-case height).
*   **Balanced Trees (AVL Trees, Red-Black Trees):** These are self-balancing BSTs that maintain a certain height property to ensure efficient operations. Concepts of height and depth are central to understanding how these trees rebalance themselves.
*   **Heaps (Min-Heap, Max-Heap):** A specific type of binary tree that satisfies the heap property. Understanding parent-child relationships is key to heap operations like `heapify` or `extract-min/max`.
*   **Tries (Prefix Trees):** Trees optimized for string retrieval, where each node represents a character. Depth directly corresponds to the length of the prefix represented by a node.
*   **Spanning Trees and Minimum Spanning Trees (MSTs):** While these are graph concepts, rooted trees are a special case of graphs. Algorithms like Prim's or Kruskal's find MSTs, which are essentially tree structures within a larger graph.
*   **Expression Trees:** Used in compilers to represent arithmetic or logical expressions. The structure directly maps to operator precedence and evaluation order, relying on parent-child relationships.
*   **Data Compression (Huffman Trees):** These binary trees are used to build variable-length codes for data compression. Leaf nodes represent characters, and their depth determines the length of their encoded bit string.

## 11. Self-check questions

1.  Consider a tree with only one node. What is its root, what is its depth, what is its height, and what is its degree?
2.  Draw a tree where the root has a degree of 1, and explain why such a tree is still valid. Identify one leaf node and its depth.
3.  A node `X` has a depth of 3. Its parent `P` has a degree of 2. One of `P`'s children is `X`, and the other child `Y` is a leaf. What is the height of `P`?
4.  In a tree, if every internal node has a degree of exactly 2, and the tree has 7 leaf nodes, what is the maximum possible height of this tree? What is the minimum possible height?
5.  Imagine a tree where each node stores a number. Define a "heavy subtree" as a subtree where the sum of all numbers in its nodes is greater than 100. Write down (or describe the logic for) a recursive function that identifies all heavy subtrees in a given tree.