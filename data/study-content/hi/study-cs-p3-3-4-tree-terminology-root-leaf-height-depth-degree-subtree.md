## 1. The one-sentence answer
**Tree terminology defines the precise position and relationship of every node inside a rooted tree using six core quantities: root, leaf, height, depth, degree, and subtree.**

A tree models hierarchical data where every node except one has exactly one parent. The single node without a parent is the root; nodes without children are leaves. Height and depth measure vertical distance, degree counts immediate children, and a subtree is the tree that begins at any chosen node. These six words together let you describe any tree completely without ambiguity.

Once you master them you can state loop invariants, prove correctness of traversals, and analyse time complexity of tree algorithms in a single sentence.

> [!NOTE]
> The single most important realisation is that height is measured from the node downward while depth is measured from the root downward; swapping the two directions silently breaks every later formula that uses them.

## 2. Why this matters — concrete and current
Google’s Borg and Kubernetes schedulers represent cluster state as a forest of trees; each pod’s placement decision walks height-bounded subtrees to compute resource slack in logarithmic time.

In semiconductor design, Intel’s OpenROAD flow stores the netlist as a tree of logic cells; static timing analysis repeatedly computes node depth to identify the critical path whose delay must stay under the clock period.

Modern transformer models keep the computation graph of attention layers as a dynamic tree; the height of this tree determines the maximum sequence length that fits inside a fixed GPU memory budget, directly affecting training throughput at companies such as OpenAI and Anthropic.

Filesystem checkers in Linux (e.g., e2fsck) walk the inode tree by comparing subtree sizes against recorded block counts; an incorrect depth calculation produces false-positive corruption reports on petabyte-scale storage arrays.

Finally, the git commit DAG is internally treated as a collection of trees when performing merge-base queries; the depth of the lowest common ancestor determines how many commits must be examined during a rebase.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Directed acyclic graph | Trees are DAGs with the extra constraint of exactly one parent per node |
| Path                 | Height and depth are lengths of specific paths            |
| Recursion            | Subtree definitions and height calculations are recursive |

If any row above is unfamiliar, pause and read the corresponding short note on graphs or recursion before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — The single starting point
Every non-empty tree possesses exactly one node that has no parent; this node is called the root.  
Consider the tree whose nodes are A (top), B and C directly below A. A is the root.  
Formally, given a tree \(T = (V,E)\), the root \(r\) satisfies \(\forall v\in V\setminus\{r\}, \text{indegree}(v)=1\) and \(\text{indegree}(r)=0\).

> [!WARNING]
> Treating any other node as root immediately turns the structure into a forest or creates multiple parents, violating the tree definition.

### Step 2 — Nodes with zero children
A node whose out-degree is zero is a leaf. In the same example B and C are leaves.  
Formally, a leaf \(\ell\) satisfies \(\text{degree}(\ell)=0\).

### Step 3 — Distance from the root
The depth of a node \(v\) is the number of edges on the unique path from the root to \(v\). Depth(root) = 0.  
Depth(B) = 1, Depth(C) = 1.

### Step 4 — Distance downward to the farthest leaf
The height of a node \(v\) is the length of the longest path from \(v\) to any leaf in its subtree. Height of a leaf is 0.  
Height(A) = 1 because the longest downward path has one edge.

### Step 5 — Counting immediate children
The degree of a node is its number of direct children. Degree(A) = 2, Degree(B) = 0.

### Step 6 — Everything below a node
The subtree rooted at \(v\) consists of \(v\) together with all its descendants and the edges connecting them. The subtree rooted at B contains only B.

### Step 7 — Relating the quantities
For any node \(v\),  
\[
\text{height}(v)=\max_{c\text{ child of }v}(\text{height}(c))+1
\]  
with base case height(leaf) = 0.  
Depth and height are measured in opposite directions; their values coincide only at the root of a perfectly balanced tree.

## 5. Worked examples — har step show karo

**Example 1 — Single-node tree**  
*Given:* Tree containing only node R.  
*Find:* root, leaf, height, depth, degree, subtree.  
Root = R (only candidate).  
R has no children, hence it is also a leaf.  
Depth(R) = 0.  
Height(R) = 0.  
Degree(R) = 0.  
Subtree rooted at R is the tree itself.  
*Why each step:* the definitions collapse to the single node when no edges exist.  
**Final answer: root=R, leaf=R, height=0, depth=0, degree=0, subtree={R}.**

*Reflection:* The trivial case forces every definition to its base value and reveals that leaf and root may coincide.

**Example 2 — Linear chain of three nodes**  
*Given:* A→B→C.  
*Find:* height and depth of each node.  
Depth(A)=0, Depth(B)=1, Depth(C)=2.  
Height(C)=0, Height(B)=1, Height(A)=2.  
Degree(A)=1, Degree(B)=1, Degree(C)=0.  
*Why each step:* depth accumulates while walking away from A; height accumulates while walking toward C.  
**Final answer: height(A)=2, depth(C)=2.**

*Reflection:* In a chain, height of root equals depth of the farthest leaf; this equality disappears as soon as any node gains two children.

**Example 3 — Node with two children**  
*Given:* Root R with children L and M; M has child N.  
*Find:* height(R) and subtree rooted at M.  
Longest path from R is R-M-N (length 2), therefore height(R)=2.  
Subtree(M) = {M,N} plus the edge M-N.  
*Why each step:* recursion on children: height(M)=height(N)+1=1, then height(R)=max(height(L),height(M))+1=2.  
**Final answer: height(R)=2, subtree(M) contains two nodes.**

*Reflection:* The max operation inside the height recurrence appears for the first time; missing the max is a common source of off-by-one errors.

**Example 4 — Degree versus height**  
*Given:* Root R with three leaves attached.  
*Find:* degree(R) and height(R).  
Degree(R)=3 because three children exist.  
Each child is a leaf, therefore height(R)=1.  
*Why each step:* degree counts children directly; height still follows the longest downward path, which is only one edge long.  
**Final answer: degree(R)=3, height(R)=1.**

*Reflection:* High degree does not imply large height; the two quantities are independent.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Swapping height and depth           | Both are “levels” in everyday language      | Always say “height downward, depth from root” aloud when writing |
| Counting nodes instead of edges     | Off-by-one from confusing length with size  | Remember: length = number of edges, depth(root)=0    |
| Forgetting height(leaf)=0           | Intuition says a leaf should have height 1  | Base case must be memorised; draw the leaf first     |
| Treating degree as total descendants| Confusing local children with subtree size  | Degree = out-degree only; never count grandchildren  |
| Assuming every tree has a single leaf | Only true for chains                        | Count nodes whose child list is empty                |
| Using subtree to mean “the rest of the tree” | Ambiguous English phrasing                | Always specify “subtree rooted at v”                 |

## 7. The textbook-precise statement
Cormen et al., *Introduction to Algorithms*, 4e, Chapter 10, page 244:  
“A tree is a connected, acyclic, undirected graph with a designated root. For any node \(v\), the depth of \(v\) is the number of edges on the path from the root to \(v\). The height of \(v\) is the number of edges on the longest path from \(v\) to a leaf. The degree of \(v\) is the number of children of \(v\). The subtree rooted at \(v\) is the tree induced by \(v\) and all its descendants.”

## 8. Visual — diagram or schematic
```
          R (root, depth=0, height=2, degree=2)
         / \
 (depth=1) A   B (depth=1, height=1, degree=1)
           |   \
        (leaf, depth=2) C   D (leaf, depth=2)
```
Labels: R is root; A,B,C,D are descendants; leaves are C and D; longest downward path from R has length 2.

## 9. The memory technique
1. **The hook** — Picture a literal tree: the root is the part touching the ground, leaves are at the top, height is how tall the tree stands, depth is how far a bug has crawled down from the top.  
2. **What to overlearn** — height(leaf)=0, depth(root)=0, height(v)=1+max over children.  
3. **Spaced-repetition schedule** — Review definitions after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Redraw the tree, mark the root, count edges downward for height, upward for depth.

## 10. What this unlocks
These six terms are the vocabulary required for every subsequent tree algorithm.  
- Binary search tree insertion and deletion proofs rely on subtree invariants.  
- AVL and red-black tree balancing arguments compare heights of left and right subtrees.  
- Lowest-common-ancestor algorithms combine depth and subtree membership tests.  
- Segment trees and fenwick trees store aggregate values over contiguous subtrees whose height equals \(\log n\).

## 11. Self-check — five questions, no answers
1. In a tree of 10 nodes, what is the minimum possible height of the root?  
2. A node has depth 3 and height 2. How many edges lie on the path from root to this node’s farthest leaf?  
3. Can a node be both a root and a leaf? Under what exact condition?  
4. If every node in a tree has degree at most 2, what is the relationship between height and number of leaves?  
5. Suppose two different nodes claim to be roots of the same tree. Which single definition is violated?