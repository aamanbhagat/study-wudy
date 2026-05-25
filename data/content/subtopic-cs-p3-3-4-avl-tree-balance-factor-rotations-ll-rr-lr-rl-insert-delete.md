## What it is
An AVL tree is a self-balancing binary search tree (BST). It maintains the BST property (left child < parent < right child) while also guaranteeing that for any node, the heights of its left and right subtrees differ by at most one. This height-balancing act ensures that operations like search, insert, and delete have a worst-case time complexity of $O(\log n)$.

## Why it matters
AVL trees provide guaranteed logarithmic performance for lookups, which is critical in systems where predictable response time is non-negotiable. They are used in database indexing systems, in-memory caches, and network routing tables. In physics simulations, they can be used to efficiently manage and query spatial data (e.g., in a k-d tree, which can be balanced using AVL principles) for tasks like collision detection or finding nearest neighbors in N-body simulations.

## When to study it
You must have a solid understanding of standard Binary Search Trees (BSTs) before tackling AVL trees. Specifically, you need to be able to implement insertion, deletion, and a function to calculate the height of a node or subtree from scratch. A firm grasp of recursion and Big O notation ($O(\log n)$ vs $O(n)$) is also non-negotiable.

## How to study it (step by step)
1.  **Code a simple BST.** Implement `Node`, `insert`, and a recursive `height` function. Verify they work correctly. This is your baseline.
2.  **Implement the Balance Factor.** Write a function `getBalance(node)` that returns `height(node.left) - height(node.right)`. Test this on various hand-drawn trees until you can predict the balance factor of any node instantly.
3.  **Isolate and code the rotations.** Write two functions: `rightRotate(node)` and `leftRotate(node)`. Do not integrate them into your tree yet. Draw a simple 3-node tree on paper, apply a rotation, and verify your code produces the same result.
4.  **Integrate into insertion.** Modify your BST `insert` function. After the recursive insertion call returns, update the height of the current node. Then, get its balance factor. If it's unbalanced (value is > 1 or < -1), perform the correct rotation(s) and return the new root of the modified subtree.
5.  **Identify the four cases.** With your `insert` function ready, insert sequences of numbers that trigger each of the four imbalance cases (LL, RR, LR, RL). Use a debugger or print statements to trace how the balance factor check and subsequent rotation correct the imbalance.
6.  **Tackle deletion.** Add the same rebalancing logic (update height, check balance, rotate) to your BST `delete` function. Note that unlike insertion, deletion may require rebalancing at multiple levels up the tree, so the logic must be applied in a loop or recursion that proceeds to the root.

## Key ideas, with intuition
1.  **The Balance Factor is the Trigger.** The entire mechanism of an AVL tree is driven by one value: the balance factor.
    $$
    BF(N) = \text{height}(N.\text{left}) - \text{height}(N.\text{right})
    $$
    The AVL invariant is that for every node $N$ in the tree, $BF(N) \in \{-1, 0, 1\}$. When an insertion or deletion pushes a node's balance factor to $+2$ or $-2$, the tree is "unbalanced" and a rotation is triggered to fix it. A positive balance factor means the left subtree is taller; a negative one means the right subtree is taller.

2.  **Rotations are Local Fixes for a Global Property.** A rotation is a constant-time ($O(1)$) operation that rearranges a small number of nodes (a parent, a child, and their subtrees) to restore the balance invariant. Crucially, a rotation *preserves the BST inorder traversal property*. It's like twisting a small section of a Rubik's cube to fix one face without scrambling the others.

3.  **The Four Imbalance Cases.** The type of rotation depends on the "shape" of the imbalance. Let $z$ be the first unbalanced node found moving up from the inserted/deleted node.
    *   **Left-Left (LL):** The new node was inserted in the left subtree of the left child of $z$. The tree is "heavy" on the outside left. Fix with a single **Right Rotation** on $z$.
    *   **Right-Right (RR):** The new node was inserted in the right subtree of the right child of $z$. The tree is "heavy" on the outside right. Fix with a single **Left Rotation** on $z$.
    *   **Left-Right (LR):** The new node was inserted in the right subtree of the left child of $z$. This is a "zig-zag" or "knee" shape. Fix by first doing a **Left Rotation** on the left child of $z$ (which transforms it into an LL case), then a **Right Rotation** on $z$.
    *   **Right-Left (RL):** The new node was inserted in the left subtree of the right child of $z$. The other "zig-zag". Fix by first doing a **Right Rotation** on the right child of $z$ (transforming it to an RR case), then a **Left Rotation** on $z$.

## Worked example
Let's insert the sequence `[30, 20, 10]` into an empty AVL tree.

1.  **Insert 30:**
    The tree is just the node `30`. It is balanced. $BF(30) = 0$.

    ```text
      30
    ```

2.  **Insert 20:**
    `20 < 30`, so it becomes the left child of `30`. We update heights and check balance factors up the tree.
    - $BF(20) = 0$.
    - $BF(30) = \text{height}(\text{left}) - \text{height}(\text{right}) = 1 - 0 = 1$.
    The tree is balanced.

    ```text
      30
     /
    20
    ```

3.  **Insert 10:**
    `10 < 30`, go left. `10 < 20`, go left. Insert `10` as the left child of `20`.
    Now, trace back up, updating heights and checking balances.
    - `10` is a leaf, $BF(10) = 0$.
    - `20`: height becomes 2. $BF(20) = \text{height}(10) - \text{height}(\text{null}) = 1 - 0 = 1$. Balanced.
    - `30`: height becomes 3. $BF(30) = \text{height}(20) - \text{height}(\text{null}) = 2 - 0 = 2$. **Unbalanced!**

4.  **Rebalance:**
    - The unbalanced node is `30` ($BF = +2$). This indicates a left-heavy situation.
    - We look at the left child of `30`, which is `20`. The new node `10` was inserted into `20`'s left subtree.
    - The path from `30` is **Left-Left**. This is an **LL Case**.
    - We perform a single **Right Rotation** on the unbalanced node `30`.

5.  **Perform Right Rotation on 30:**
    - The child `20` becomes the new root of this subtree.
    - The old root `30` becomes the right child of `20`.
    - Any existing right child of `20` (in this case, null) would become the new left child of `30`.

    The final tree is:
    ```text
      20
     /  \
    10  30
    ```
    This tree is now perfectly balanced and still satisfies the BST property. The rotation fixed the height imbalance while preserving the sorted order.

## Diagrams
Here are the two fundamental single rotations. LR and RL are just sequential applications of these.

**Right Rotation on `z` (LL Case fix):**

```text
      z                       y
     / \                     / \
    y   T4   --Right_Rotate(z)-->   x   z
   / \                     / \ / \
  x   T3                  T1 T2 T3 T4
 / \
T1 T2

(T1, T2, T3, T4 are subtrees)
```

**Left Rotation on `z` (RR Case fix):**

```text
    z                           y
   / \                         / \
  T1  y      --Left_Rotate(z)-->    z   x
     / \                       / \ / \
    T2  x                     T1 T2 T3 T4
       / \
      T3 T4
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    - **AVL**: "**A**lways **V**ery **L**evel". The goal is to keep the tree from getting too tall and skinny.
    - **Rotations**: Think of an unbalanced tree as a "line" and a balanced tree as a "triangle".
        - **LL/RR (Line)**: The imbalance is a straight line (`z-y-x`). It's simple. You just need **one** rotation to "bend" the line into a triangle.
        - **LR/RL (Knee/Zig-Zag)**: The imbalance has a "knee" in it (`z-x-y`). You can't fix a knee with one move. You first have to **straighten the knee** (first rotation on the child), which turns it into a line (LL/RR case), and then you **bend the line** (second rotation on the grandparent). Two steps for a two-part problem.

2.  **Must-Overlearn Facts:**
    - Balance Factor: $BF(N) = \text{height}(N.\text{left}) - \text{height}(N.\text{right})$
    - AVL Invariant: For all nodes $N$, $BF(N) \in \{-1, 0, 1\}$.

3.  **Spaced Repetition Schedule:**
    - Re-derive the four rotation cases on paper: **tomorrow (1 day)**.
    - Code the insert function from scratch: **3 days**.
    - Explain the difference between rebalancing on insert vs. delete to a friend (or a rubber duck): **7 days**.
    - Code the delete function from scratch: **16 days**.
    - Do a mix of 5 insert/delete problems on paper: **35 days**.

4.  **First Principles Pathway:**
    If you forget a rotation, draw the simplest unbalanced tree for that case. For LL, draw nodes 3, 2, 1 inserted in that order. The tree is a line `3 -> 2 -> 1`. You know this violates the BST property for a balanced tree. The only valid BST configuration is `2` at the root, with `1` on the left and `3` on the right. Now, look at the transformation from the line `3-2-1` to the triangle `1-2-3`. That transformation *is* the right rotation. You can re-derive any rotation this way by focusing on preserving the inorder traversal (`1, 2, 3`).

## Common mistakes
1.  **Forgetting to update heights.** After a rotation, the heights of the nodes involved (and their ancestors) change. Failing to update them will cause future balance factor calculations to be wrong. The height update must happen *after* the recursive call returns, but *before* the balance check.
2.  **Mixing up LR and LL cases.** The case is determined by the path from the *unbalanced node*. If the balance factor is +2 (left heavy), check the left child's balance factor. If the child's BF is +1, it's LL. If the child's BF is -1, it's LR.
3.  **Incorrectly re-attaching subtrees during rotation.** In a right rotation of node `z` with left child `y`, `y`'s original right subtree must be moved to become `z`'s new left subtree. Forgetting this step breaks the BST property. Draw the diagram with generic subtrees (T1, T2, T3) to see where they must go.
4.  **Stopping after one fix during deletion.** An insertion requires at most one rotational fix (one single or one double rotation). A deletion can cause an imbalance that, when fixed, creates another imbalance further up the tree. Your rebalancing logic must continue up to the root.

## Self-check
1.  What is the minimum number of nodes required in an AVL tree to have a height of 3? (Assume height of a single-node tree is 1).
2.  Insert the following keys into an empty AVL tree in order: `50, 25, 75, 12, 37, 60, 80, 6`. Draw the tree after each insertion that causes one or more rotations.
3.  Take the final tree from the previous question and delete the key `75`. Describe the steps, including which node replaces `75` and what rotations (if any) are needed to rebalance the tree.