## What it is
A tree is a hierarchical data structure composed of nodes connected by edges. It has a single designated starting node called the **root**, and every other node is reachable from the root through a unique path. Terminology like **height**, **depth**, and **degree** are metrics used to describe the position and connectivity of nodes within this structure.

## Why it matters
Trees are fundamental to organizing and searching data efficiently. In machine learning, decision trees classify data by navigating a tree structure. In aerospace, fault trees model system failures, and mission planning can use search trees (like A*) to find optimal trajectories. Compilers parse your code into an Abstract Syntax Tree (AST) to understand its structure before generating machine code.

## When to study it
Before tackling tree terminology, you must have a solid grasp of two concepts:
1.  **Linked Lists:** Understand how nodes containing data and pointers (or references) can be linked together. A tree is a more complex version of this idea.
2.  **Recursion:** Trees are inherently recursive structures—a tree is a root node connected to smaller subtrees. Many tree algorithms are most elegantly expressed recursively.

If you are not comfortable with both of these, pause and review them first.

## How to study it (step by step)
1.  **Draw it:** On paper, draw a tree with at least 10 nodes. Label one node "A" as the root. Give every other node a unique letter name.
2.  **Label relationships:** Pick a node in the middle of your drawing. Identify and label its parent, its children, and its siblings (if any). Identify and circle all the leaf nodes.
3.  **Calculate Depth:** The depth of the root is 0. The depth of any other node is $1 + \text{depth}(\text{parent})$. Calculate and write the depth next to every node in your drawing.
4.  **Calculate Height:** The height of a leaf node is 0. The height of any other node is $1 + \max(\text{heights of its children})$. Starting from the leaves and working up, calculate and write the height next to every node. Note that the height of the entire tree is the height of its root.
5.  **Calculate Degree:** The degree of a node is the number of children it has. Calculate and write the degree for every node.
6.  **Identify Subtrees:** Pick a non-leaf node that is not the root. Draw a box around that node and all of its descendants. This is a subtree. Notice that it satisfies the definition of a tree itself.

## Key ideas, with intuition
1.  **Nodes and Edges are the atoms:** A tree is just a collection of nodes (which hold data) and edges (which represent relationships). The core relationship is parent-child. A node can have one parent but many children. The single exception is the **root**, which has no parent.

2.  **Root as the single entry point:** Think of a file system. You always start from a root directory (`/` or `C:\`). You can't have two separate, unconnected root directories in a single file system; similarly, a tree has exactly one root.

3.  **Depth is "distance from the top":** The depth of a node is the length of the path (number of edges) from the root to that node.
    $$ \text{depth}(\text{root}) = 0 $$
    $$ \text{depth}(n) = \text{depth}(\text{parent}(n)) + 1 $$
    Intuition: How many steps do you take to get *down* to this node from the start?

4.  **Height is "distance to the bottom":** The height of a node is the length of the longest path from that node to a leaf node.
    $$ \text{height}(\text{leaf}) = 0 $$
    $$ \text{height}(n) = 1 + \max_{\text{c is a child of n}} (\text{height}(c)) $$
    Intuition: From this node, what is the longest drop to the "ground" (a leaf)? The height of the entire tree is simply the height of its root.

5.  **Subtree is a recursive view:** Any node and all its descendants form a subtree. This is why recursion is a natural fit for tree problems: an operation on a tree can often be defined as an operation on the root plus the same operation on all of its subtrees.

## Worked example
Consider the following tree:

```text
      A (d=0, h=3)
      |
      +--- B (d=1, h=2)
      |    |
      |    +--- E (d=2, h=1)
      |    |    |
      |    |    +--- I (d=3, h=0)
      |    |
      |    +--- F (d=2, h=0)
      |
      +--- C (d=1, h=1)
      |
      +--- D (d=1, h=1)
           |
           +--- G (d=2, h=0)
           |
           +--- H (d=2, h=0)
```

Let's analyze node **B**:
*   **Parent:** The parent of B is A.
*   **Children:** The children of B are E and F.
*   **Siblings:** The siblings of B are C and D (they share the same parent, A).
*   **Degree:** The degree of B is 2, as it has two children (E and F).
*   **Depth:** The path from the root A to B is A -> B. This path has 1 edge. So, `depth(B) = 1`.
    *   *Step 1:* `depth(A) = 0` (by definition).
    *   *Step 2:* `depth(B) = depth(A) + 1 = 0 + 1 = 1`. This worked.
*   **Height:** We need the longest path from B to a leaf. The paths are B -> E -> I (length 2) and B -> F (length 1). The longest is 2. So, `height(B) = 2`.
    *   *Step 1:* Find the height of B's children, E and F. F is a leaf, so `height(F) = 0`. For E, we need the height of its child, I. I is a leaf, so `height(I) = 0`.
    *   *Step 2:* `height(E) = 1 + height(I) = 1 + 0 = 1`.
    *   *Step 3:* `height(B) = 1 + max(height(E), height(F)) = 1 + max(1, 0) = 1 + 1 = 2`. This worked.
*   **Subtree:** The subtree rooted at B consists of nodes {B, E, F, I}.

The **height of the entire tree** is the height of the root A, which is 3. The longest path from A to any leaf is A -> B -> E -> I.

## Diagrams
```text
                  (Root)
                    A
                  / | \
                 /  |  \
                B   C   D   <-- Siblings
               / \     / \
              E   F   G   H
              |
              I             <-- Leaf nodes: I, F, C, G, H

Path from A to I: A -> B -> E -> I
Length of path = 3 edges
Depth of I = 3
Height of A = 3
```

## Memory technique — remember this forever
1.  **The "Family Tree" Hook:**
    *   **Root:** The original ancestor.
    *   **Leaf:** A descendant with no children. The end of a bloodline.
    *   **Depth:** Think **D**eepness into the family history. How many generations **D**own from the ancestor are you? `depth(you) = depth(parent) + 1`.
    *   **Height:** Think your **H**eight in the family hierarchy. How many generations can you look **D**own on until you hit a leaf (a descendant with no kids)? `height(you) = 1 + max(height(children))`.

2.  **Formulas to Overlearn (Do Not Paraphrase):**
    *   $\text{depth}(\text{root}) = 0$
    *   $\text{height}(\text{leaf}) = 0$
    *   $\text{height}(n) = 1 + \max_{\text{c is a child of n}} (\text{height}(c))$

3.  **Spaced Repetition Schedule:**
    *   Review these definitions and formulas tomorrow (1 day).
    *   Then in 3 days.
    *   Then in 7 days.
    *   Then in 16 days.
    *   Finally, in 35 days.

4.  **First Principles Pathway:**
    If you forget, draw a simple 3-node tree: A -> B.
    *   **Depth:** A is the root, depth is 0. B is one edge away from the root, so its depth is 1.
    *   **Height:** B is a leaf, height is 0. A's height is the longest path to a leaf, which is the path to B. That path has 1 edge. So A's height is 1. This re-derives the base cases and the recursive step.

## Common mistakes
1.  **Off-by-one errors in height/depth:** Confusing the number of *nodes* in a path with the number of *edges*. Standard convention defines height and depth by the number of **edges**. A path from root to itself has 0 edges, so depth is 0.
2.  **Confusing height and depth:** Remember the hook: Depth is looking up to the root. Height is looking down to the furthest leaf. A node has exactly one depth value, but its height depends on the structure below it.
3.  **Height of a leaf is 0, not 1:** A leaf node has no path to any leaf below it (it *is* the leaf), so the longest path has length 0.
4.  **Assuming the height of the tree is the depth of the deepest leaf:** This is only true if you define depth and height consistently (based on edges). The height of the tree is `height(root)`. The depth of the deepest leaf is `max(depth(leaf))` over all leaves. These values are equal. The mistake is mixing definitions (e.g., counting nodes for one and edges for another).

## Self-check
1.  For the tree in the **Diagrams** section, what is the degree of node D, the depth of node G, and the height of node C?
2.  What is the maximum and minimum number of nodes in a binary tree (a tree where each node has at most degree 2) of height $h$?
3.  A "full" binary tree is one where every node is either a leaf or has exactly two children. Prove that a full binary tree with $L$ leaves has exactly $2L - 1$ total nodes.