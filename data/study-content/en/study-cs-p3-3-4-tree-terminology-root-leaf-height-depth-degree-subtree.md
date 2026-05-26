## 1. The one-sentence answer
**A tree is a directed acyclic graph with a distinguished root node from which every other node is reachable by exactly one path; the listed terms name the positions, sizes, and relations that arise inside this structure.**

A tree organizes data so that each element except one—the root—has exactly one parent. From the root you can reach any node by following child pointers, and you never encounter a cycle or two different routes to the same node. The remaining vocabulary simply records measurable facts about those paths and the nodes that end them.

Leaf nodes sit at the ends of every path; internal nodes sit between the root and the leaves. Height and depth measure vertical distance along those paths, degree counts immediate children, and a subtree is the tree obtained by cutting the original tree at any node and keeping everything below it.

> [!NOTE]
> Height is always measured downward from a node to its farthest leaf; depth is always measured upward from a node to the root. Swapping the two directions is the single most common source of off-by-one errors in tree algorithms.

## 2. Why this matters — concrete and current
In the Linux ext4 file system the directory tree is represented exactly by these terms: the root inode is the filesystem root, every directory inode records its degree (number of entries), and the height of the tree determines the worst-case number of disk seeks required to open a file. When a path exceeds 40 edges the kernel refuses to traverse it, a direct consequence of the height definition.

Modern web browsers build a Document Object Model tree for every page. The root is the document node, leaves are text nodes or empty elements, and subtree extraction powers CSS cascade and JavaScript querySelectorAll. Chrome’s layout engine walks subtrees bottom-up; an incorrect depth calculation produces reflow bugs visible on pages with deeply nested shadow DOM.

Decision-tree models inside scikit-learn and XGBoost store each split as an internal node whose degree equals the number of branches (normally two). Tree height directly controls both training time and prediction latency; the library therefore exposes max_depth as a hyper-parameter and reports the actual height of the fitted tree after training.

In aerospace, the Flight Management System on Boeing 787 aircraft stores navigation procedures as trees. The root is the active flight plan; each waypoint is a node whose degree reflects the number of possible missed-approach branches. Certification authorities require static analysis that the maximum height never exceeds a proven bound so that worst-case execution time remains deterministic.

## 3. Mental prerequisites

| Concept          | Why you need it here                              |
|------------------|---------------------------------------------------|
| Node and edge    | Trees are built from these two primitives         |
| Directed graph   | Parent–child links are directed; cycles are forbidden |
| Path             | Height and depth are lengths of specific paths    |
| Recursion        | Subtree definitions and most algorithms are recursive |

## 4. Building the idea — from intuition to formalism

### Step 1 — A tree begins with a single distinguished node
Every non-empty tree contains exactly one node that has no parent; this node is called the **root**. All other nodes are reached by following directed edges away from it.

Consider three nodes A, B, C with edges A→B and A→C. A is the root.

Formally, a tree \(T = (V, E)\) is a directed graph with a unique vertex \(r \in V\) (the root) such that for every \(v \in V \setminus \{r\}\) there exists exactly one directed path from \(r\) to \(v\).

> [!WARNING]
> Treating an arbitrary node as “root” when the graph actually has two parents immediately violates the single-path property and the structure ceases to be a tree.

### Step 2 — Leaves are nodes whose out-degree is zero
A node with no children ends every path that reaches it; such nodes are **leaves**.

In the example above, B and C are leaves; A is not.

A node \(v\) is a leaf if and only if its out-degree \(d^+(v) = 0\).

> [!WARNING]
> Counting incoming edges instead of outgoing edges will misclassify internal nodes that have multiple parents in a DAG that is not a tree.

### Step 3 — Depth records distance from the root
The **depth** of a node is the number of edges on the unique path from the root to that node.

Depth of A is 0; depth of B and C is 1.

Let \(\pi(r, v)\) be the unique path from root \(r\) to \(v\). Then \(\operatorname{depth}(v) = |\pi(r, v)|\).

> [!WARNING]
> Using the length in nodes rather than edges produces an off-by-one error that propagates into height calculations.

### Step 4 — Height records distance to the farthest leaf
The **height** of a node is the length of the longest path from that node to any leaf in its subtree.

Height of B and C is 0; height of A is 1.

\(\operatorname{height}(v) = \max_{u \in \operatorname{leaves}(T_v)} |\pi(v, u)|\), where \(T_v\) is the subtree rooted at \(v\).

> [!WARNING]
> Computing height from the root instead of from the node itself yields the global tree height, not the local height required by most recursive algorithms.

### Step 5 — Degree of a node equals its number of children
The **degree** of a node is its out-degree—the number of direct children.

Degree of A is 2; degree of B and C is 0.

\(\operatorname{degree}(v) = d^+(v)\).

> [!WARNING]
> In some graph literature degree means total incident edges; inside trees the convention is children only.

### Step 6 — A subtree is obtained by selecting any node as a new root
Given any node \(v\), the **subtree** rooted at \(v\) consists of \(v\) together with every descendant reachable from it.

The subtree at A is the whole tree; the subtree at B contains only B.

Formally, \(T_v = (V_v, E_v)\) where \(V_v = \{u \mid\) there is a path from \(v\) to \(u\}\) and \(E_v\) contains exactly the edges among those vertices.

> [!WARNING]
> Including nodes above \(v\) produces a structure that is no longer a tree under the original root.

## 5. Worked examples — every step shown

**Example 1 — Identify root and leaves**
- *Given:* Nodes R, A, B with edges R→A, R→B.
- *Find:* root and all leaves.
- The unique node with in-degree 0 is R.  
  *Why:* definition of root.  
- Nodes whose out-degree is 0 are A and B.  
  *Why:* definition of leaf.  
**R is root; A, B are leaves.**

*Reflection:* The example is minimal; every larger tree simply adds more leaves at greater depth.

**Example 2 — Compute depth and height**
- *Given:* Root R, children A and B, A has child C.
- *Find:* depth(C) and height(R).
- Path R→A→C has length 2, therefore depth(C) = 2.  
  *Why:* depth counts edges from root.  
- Longest downward path from R is R→A→C (length 2), therefore height(R) = 2.  
  *Why:* height is maximum path length to a leaf.  
**depth(C) = 2, height(R) = 2.**

*Reflection:* The longest path may not pass through every node; always search the entire subtree.

**Example 3 — Degree of an internal node**
- *Given:* Same tree as Example 2.
- *Find:* degree(A).
- A has one child C, so out-degree = 1.  
  *Why:* degree equals number of children.  
**degree(A) = 1.**

*Reflection:* Degree is local; it never includes grandchildren.

**Example 4 — Extract a subtree**
- *Given:* Same tree.
- *Find:* subtree rooted at A.
- Vertices: A, C. Edge: A→C.  
  *Why:* retain only descendants of A.  
**Subtree = {A, C} with edge A→C.**

*Reflection:* The subtree is itself a tree; its root is A, not the original root R.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Confusing height with depth       | Both are path lengths; direction differs    | Always state “down from node” or “up to root”        |
| Counting nodes instead of edges   | Off-by-one habit from array indexing        | Write “number of edges” explicitly in every formula  |
| Treating degree as total degree   | Graph-theory terminology clash              | In trees, say “number of children” or “out-degree”   |
| Forgetting empty-tree base case   | Height of null tree undefined               | Define height(null) = −1 before writing recursion    |
| Assuming binary tree when counting degree | Many examples are binary                    | Read the problem statement for maximum arity         |
| Including ancestors in subtree    | Visual habit of drawing the whole tree      | Draw a horizontal cut just above the chosen root     |
| Reporting height of a leaf as 1   | Counting the node itself                    | Height of a leaf is always 0                         |

## 7. The textbook-precise statement
A *tree* is a finite set \(T\) of one or more nodes such that there is one distinguished node called the root and the remaining nodes are partitioned into \(m \ge 0\) disjoint sets \(T_1, \dots, T_m\), each of which is itself a tree. The trees \(T_1, \dots, T_m\) are called the *subtrees* of the root. The *degree* of a node is the number of its subtrees. The *depth* of a node is the number of edges from the root to the node. The *height* of a node is the number of edges on the longest path from the node to a leaf. A node of degree zero is a *leaf*. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 10, Section 10.4.)

## 8. Visual — diagram or schematic
```text
          R (root, depth 0, height 2, degree 2)
         / \
(depth 1) A   B (leaf, depth 1, height 0, degree 0)
       /
      C (leaf, depth 2, height 0, degree 0)
```
- Horizontal levels represent depth.  
- Longest downward path from R measures height.  
- Subtree rooted at A contains only A and C.

## 9. The memory technique
1. **The hook** — Picture a literal tree: the root is the point where the trunk meets the ground; leaves are the tips of the highest branches; height is how tall the tree stands above any given branch; depth is how far a branch sits below the ground line.
2. **What to overlearn** — height(leaf) = 0, depth(root) = 0, height(null) = −1, degree = number of children.
3. **Spaced-repetition schedule** — Review definitions after 1 day, again after 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Re-derive every quantity from the unique path that exists between any node and the root.

## 10. What this unlocks
These six terms are the atomic vocabulary required by every subsequent tree algorithm. Balanced binary search trees, segment trees, tries, and union-find structures all state their complexity bounds using height and depth; subtree extraction is the core operation in persistent data structures and in tree-edit-distance algorithms used by compilers.

- Next: Binary trees and their traversals  
- Next: Balanced BSTs (AVL, red-black)  
- Next: Heaps and priority queues  
- Next: Lowest-common-ancestor algorithms

## 11. Self-check — five questions, no answers
1. In a tree of height 4, what is the maximum possible depth of any leaf?  
2. A node has degree 3; how many subtrees does it possess?  
3. Draw a tree in which one node has depth 2 yet the tree height is only 2.  
4. What is height(null) and why must the definition be −1 rather than 0?  
5. A programmer writes height(v) = 1 + max(height(children)) and obtains an answer one larger than the textbook. Which definition of height is being used?