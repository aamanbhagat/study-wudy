## What it is
A Binary Search Tree (BST) is a node-based binary tree data structure which has the following properties for any given node `N`: all values in `N`'s left subtree are less than `N`'s value, and all values in `N`'s right subtree are greater than `N`'s value. This ordering principle, known as the BST property, is recursively applied to all subtrees.

## Why it matters
The BST property allows for fast lookup, insertion, and deletion of items, with an average time complexity of $O(\log n)$. This efficiency makes them the foundation for indexing in databases and file systems. In aerospace, variants like k-d trees (a multi-dimensional BST) are used for spatial partitioning, enabling rapid nearest-neighbor searches essential for collision detection algorithms or organizing point cloud data from LiDAR.

## When to study it
Before tackling BSTs, you must have a solid understanding of:
1.  **Basic Tree Concepts:** Node, edge, root, parent, child, leaf, height, depth.
2.  **Pointers/References:** How to represent connections between nodes in memory.
3.  **Recursion:** The core operations on a BST are most elegantly expressed recursively, leveraging the tree's self-similar structure.

If you are not comfortable with recursion, pause and master it first. BSTs will be unintuitive otherwise.

## How to study it (step by step)
1.  **Implement the Node:** Write a simple `Node` class or `struct` with a value (key), and pointers to a left and right child. This is the atomic unit.
2.  **Code `search` first:** Implement a function `search(root, key)`. It's the simplest operation and perfectly illustrates the BST property. If `key < root.key`, go left; if `key > root.key`, go right.
3.  **Code `insert` next:** Implement `insert(root, key)`. It follows the same logic as `search` to find the correct empty spot (a `NULL` pointer) to place the new node.
4.  **Draw the 3 deletion cases:** On paper, draw a sample BST. Manually perform a deletion for a leaf node, a node with one child, and a node with two children. This builds intuition before code.
5.  **Code `delete`:** Implement `delete(root, key)`. This is the most complex part. Methodically code each of the three cases you drew out. Pay close attention to pointer manipulation.
6.  **Analyze complexity:** For each operation (`search`, `insert`, `delete`), derive the best-case, average-case, and worst-case time complexity. Relate the worst-case ($O(n)$) to the shape of the tree (a degenerate, list-like structure).

## Key ideas, with intuition
1.  **The BST Invariant:** The core rule is `left_subtree.key < node.key < right_subtree.key`. This invariant must hold true for *every single node* in the tree after any operation. Think of it as a sorted array that has been folded into a tree structure to enable faster searching. Searching a sorted array takes $O(n)$ if you scan, or $O(\log n)$ with binary search. A BST effectively embeds the logic of binary search into the data structure itself.

2.  **Operations Follow the Invariant:** Every operation is just a matter of following this rule.
    *   **Search for 15 in a tree rooted at 20?** $15 < 20$, so you know it *must* be in the left subtree if it exists. You never need to look at the right half.
    *   **Insert 25?** Start at the root. Is $25 > 20$? Go right. Is $25 < 30$? Go left. You follow a path down until you find an empty spot where the new node can be placed without violating the rule.

3.  **Deletion is about Preservation:** Deleting a node threatens the BST invariant. The three cases are just strategies to restore it.
    *   **Case 1: Deleting a leaf (0 children).** Easy. Just remove it. The invariant is not disturbed elsewhere.
    *   **Case 2: Deleting a node with 1 child.** Also easy. The child can take the parent's place. You "bypass" the deleted node by linking its parent to its child.
    *   **Case 3: Deleting a node with 2 children.** This is the crux. You cannot just remove it, as that would disconnect the tree. You must find a replacement node from within the tree that preserves the order. The two best candidates are:
        *   The **in-order successor**: The smallest key in the right subtree.
        *   The **in-order predecessor**: The largest key in the left subtree.
        By replacing the deleted node's key with its successor's key, and then deleting the successor node (which is an easier case 1 or 2 deletion), you preserve the BST invariant.

## Worked example
Let's delete the node with key `15` from the following BST. This is the hard case: a node with two children.

**Initial Tree:**
```text
      (20)
      /  \
    (15)  (30)
    / \
  (10) (18)
  /    /
(5)  (16)
```

**Goal:** Delete node `15`.

**Step 1: Identify the case.**
The node `15` has two children (`10` and `18`). This is Case 3.

**Step 2: Find the replacement.**
We need to find the in-order successor of `15`. This is the smallest key in its right subtree.
*   Go to `15`'s right child: `18`.
*   From `18`, go as far left as possible. The path is `18 -> 16`. There are no more left children.
*   The in-order successor is `16`.

**Step 3: Replace the value.**
Copy the value of the in-order successor (`16`) into the node we want to delete (`15`). The tree now looks like this, but `16` exists in two places, which is a temporary invalid state.

```text
      (20)
      /  \
    (16)  (30)   <-- Value replaced
    / \
  (10) (18)
  /    /
(5)  (16)        <-- Original successor node
```

**Step 4: Delete the original successor node.**
Now, we recursively call `delete` on the right subtree of the node we just modified (the one now holding `16`), telling it to delete the key `16`.
*   The call is effectively `delete(node_18, 16)`.
*   This is an easier deletion case. The node `16` is a leaf (or could have one right child, which would be Case 2). In our example, it's a leaf.
*   The parent of `16` (which is `18`) sets its left child pointer to `NULL`.

**Final Tree:**
```text
      (20)
      /  \
    (16)  (30)
    / \
  (10) (18)
  /
(5)
```

**Reflection:** We did not simply remove `15`. That would have orphaned its two subtrees. Instead, we found the *next value in sorted order* (`16`), used it to patch the hole, and then removed the original `16` from its old, much simpler position. This maintained the BST invariant `left < node < right` for all nodes.

## Diagrams
A valid Binary Search Tree:
```text
      (8)
     /   \
    /     \
  (3)     (10)
 /   \       \
(1)  (6)     (14)
    /   \     /
   (4)  (7)  (13)
```

A structure that is a Binary Tree, but **NOT** a Binary Search Tree. Node `7` violates the property for root `8` (`7` is in the right subtree but `7 < 8`). Node `4` violates the property for node `5` (`4 < 5` but is in the right subtree).
```text
      (8)
     /   \
    /     \
  (3)     (5)
 /   \       \
(1)  (6)     (7)
    /   \     /
   (9)  (2)  (4)
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Left is Less, Right is moRe." This simple phrase is the absolute core of the BST. Say it every time you traverse the tree.

2.  **Formulas/Facts to Overlearn:**
    *   **BST Property:** For any node `N`, `forall x in N.left_subtree, x.key < N.key` and `forall y in N.right_subtree, y.key > N.key`.
    *   **Deletion Case 1 (0 children):** Remove leaf.
    *   **Deletion Case 2 (1 child):** Bypass node (parent points to child).
    *   **Deletion Case 3 (2 children):** Replace with in-order successor, then delete successor.

3.  **Spaced Repetition Schedule:**
    *   Review these facts and re-implement `delete` from scratch in **1 day**.
    *   Draw the deletion cases and explain them to a rubber duck in **3 days**.
    *   Re-implement all three operations (`search`, `insert`, `delete`) in **7 days**.
    *   Explain the time complexity for balanced vs. unbalanced trees in **16 days**.
    *   Write a function to validate if a given binary tree is a BST in **35 days**.

4.  **First Principles Pathway:** If you forget the deletion algorithm, rebuild it from the invariant. The goal is to remove a node while keeping the tree a valid BST.
    *   If the node is a leaf, can I remove it? Yes, it affects no other relationships.
    *   If it has one child, what happens if I remove it? The child is orphaned. How can I fix it? Make the deleted node's parent adopt the child. The ordering is preserved.
    *   If it has two children, removing it splits the tree. I need a value to plug the hole. What value works? It must be greater than everything in the left subtree AND less than everything in the right subtree. The two perfect candidates are the largest element on the left or the smallest on the right (predecessor/successor). Pick one, move it up, and now solve the easier problem of deleting that successor/predecessor from its original spot.

## Common mistakes
1.  **Not handling the root case in deletion:** Deleting the root node is a special case for pointer manipulation. If you delete the root, the pointer to the *entire tree* must be updated to point to the new root. Many implementations forget this, leading to lost trees.
2.  **Breaking the chain during deletion:** When deleting a node with one child (e.g., deleting `B` in `A -> B -> C`), students might correctly set `A`'s child to `C` but forget to deallocate/free the memory for `B`, causing a memory leak.
3.  **Incorrectly finding the successor:** A common bug is to just take the right child as the successor. The successor is the *leftmost node of the right subtree*.
4.  **Assuming the tree is balanced:** While the average case for BST operations is $O(\log n)$, this only holds for reasonably balanced trees. If you insert elements in sorted order (e.g., 1, 2, 3, 4, 5), you get a degenerate tree that is effectively a linked list, and all operations degrade to $O(n)$.

## Self-check
1.  Take an empty BST and insert the following keys in order: `10, 5, 15, 3, 7, 12, 18`. Draw the final tree.
2.  Given the tree from the previous question, write down the sequence of nodes visited when searching for the key `12`. Then, delete the key `10` and draw the resulting tree.
3.  What is the structure of a BST if you insert $n$ integers that are already in descending order? What is the time complexity to find the smallest element in this tree? Why?