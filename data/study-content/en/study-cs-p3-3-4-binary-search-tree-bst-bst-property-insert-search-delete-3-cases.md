## 1. The one-sentence answer
A **binary search tree** is a binary tree in which every node obeys the BST property: all keys in its left subtree are less than or equal to its own key and all keys in its right subtree are greater than or equal to its own key.

This ordering invariant turns an otherwise unstructured tree into a structure that supports ordered search, insertion, and deletion in time proportional to tree height. The property is local yet global in effect: it holds at every node simultaneously, so an inorder traversal always yields keys in sorted order. Insert and search follow the same decision path that binary search would take on a sorted array; deletion preserves the invariant through three mutually exclusive structural cases.

> [!NOTE]
> The BST property alone guarantees sorted order without any extra bookkeeping; every correct insert, search, or delete is simply a walk that never violates that single local rule.

## 2. Why this matters — concrete and current
MySQL and PostgreSQL store table indexes as B-tree variants whose core lookup logic is identical to BST search; every range query on a primary key walks the same left/right decision path taught here.  
Semiconductor design tools from Synopsys and Cadence maintain timing graphs as BSTs so that incremental delay updates after a gate resize remain logarithmic rather than linear.  
The Linux kernel’s Completely Fair Scheduler keeps per-CPU run queues in red-black trees (self-balancing BSTs) so that selecting the next task is always O(log n) even under thousands of threads.  
Google’s LevelDB and Facebook’s RocksDB use LSM-trees whose in-memory component is a skip-list or BST; every memtable flush decision depends on the ordered iteration that BST inorder traversal supplies.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Binary tree node     | BST is a binary tree whose extra ordering rule is stated on the same left/right child pointers |
| Recursion            | Insert, search, and the two-child delete case are defined by recursive calls on one subtree |
| Pointer/reference semantics | Deletion must redirect a parent pointer; understanding aliases prevents lost subtrees |

## 4. Building the idea — from intuition to formalism

### Step 1 — Ordering from local decisions
A BST never stores an explicit sorted array; instead every node stores a single comparison that routes future operations.  
Example: node 5 with left child 3 and right child 7 already encodes that 3 < 5 < 7 without any further data.  
Formally, for any node x:  
$$
\forall y \in \text{left subtree of } x, \; y.key \le x.key
\quad\text{and}\quad
\forall z \in \text{right subtree of } x, \; z.key \ge x.key.
$$

> [!WARNING]
> Reversing the inequality at even one node silently destroys the global sorted order while the tree still looks locally consistent.

### Step 2 — Search follows the invariant
Search begins at the root and repeatedly moves left or right exactly as the BST property dictates.  
Example: searching for 6 in the tree above moves 5 → 7 → null, correctly reporting absence after two comparisons.  
The path length equals the number of comparisons; the property guarantees that any key outside the current subtree cannot exist there.

### Step 3 — Insert creates a new leaf
Insertion performs the same walk as search until a null link is reached, then attaches the new node there.  
Example: inserting 4 into the tree above lands as left child of 5’s right child 7? No—walk yields 5 → 7 → null, so 4 becomes left child of 7.  
Formally the new leaf satisfies the BST property with its parent by construction; no ancestor’s property is altered.

### Step 4 — Delete case 1: zero children
A leaf is removed by setting its parent’s corresponding child pointer to null.  
The remaining tree still obeys the BST property everywhere because the removed key was already in its correct inorder position.

### Step 5 — Delete case 2: one child
The node is spliced out by linking its parent directly to its single child.  
The child subtree already satisfies the BST property relative to the deleted node’s parent, so the invariant is preserved.

### Step 6 — Delete case 3: two children
Replace the node’s key with the minimum key of its right subtree (or maximum of left), then delete that successor leaf or single-child node.  
Because the successor is the smallest key larger than the deleted key, every node in the left subtree remains ≤ it and every node in the right subtree remains ≥ it.

### Step 7 — Height governs complexity
All three operations cost O(h) comparisons where h is tree height; the BST property alone does not bound h, only the ordering.

## 5. Worked examples — every step shown

**Example 1 — Insert into empty tree**  
*Given:* empty tree, insert 10.  
*Find:* resulting tree.  
Start at root pointer (null).  
Attach new node as root.  
*Why* the pointer was null, so the insertion site is the root itself.  
**Result:** single node 10.

**Example 2 — Search for missing key**  
*Given:* tree with nodes 8,3,10,1,6,14,4,7.  
*Find:* is 5 present?  
8 → left to 3 → right to 6 → left to 4 → right to null.  
*Why* each move follows the BST property test.  
**Result:** not found after four comparisons.

**Example 3 — Delete leaf**  
*Given:* same tree, delete 1.  
1 has no children.  
Parent 3’s left pointer set to null.  
*Why* removing a leaf cannot violate any ancestor’s ordering.  
**Result:** 3 now has left child null.

**Example 4 — Delete two-child node**  
*Given:* same tree, delete 3.  
3 has two children.  
Minimum in right subtree of 3 is 4.  
Copy 4 into 3’s position, delete the original 4 (now a leaf).  
*Why* 4 is the smallest key > 3, preserving left-subtree ≤ and right-subtree ≥ relations.  
**Result:** root 8, left child now 4 whose children are 1 and 6.

*Reflection* on what made this example tricky: the successor copy must be followed by a second deletion whose case is simpler, illustrating why two-child deletion reduces to a prior case.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to update parent pointer on delete | Thinking only about the node being removed | Always store parent reference or return new subtree root |
| Using < instead of ≤ on duplicates | Assuming all keys distinct | Decide and document duplicate policy at the property definition |
| Deleting root without handling return value | Root has no parent to update | Return the new subtree root from every recursive call |
| Assuming tree stays balanced | Confusing BST with AVL/red-black | Track height separately; apply balancing only when required |
| Inorder successor chosen from left subtree | Symmetric mistake | Consistently pick right-subtree minimum or left-subtree maximum |
| Null dereference on single-child delete | Not checking which child exists | Test left then right; link whichever is non-null |
| Inserting duplicate key creates cycle | No duplicate check | Compare equal case explicitly before recursing |

## 7. The textbook-precise statement
A binary search tree is a binary tree T such that for every node x in T the BST property holds. The operations SEARCH, INSERT, and DELETE each run in O(h) time where h is the height of T. When duplicates are allowed the weak inequality version is used; when keys are unique the strict version applies. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 12.)

## 8. Visual — diagram or schematic
```text
        8
       / \
      3   10
     / \    \
    1   6    14
       / \
      4   7
```
Label each edge with the decision that produced it: left edge means “≤ parent”, right edge means “≥ parent”. Inorder traversal yields 1,3,4,6,7,8,10,14.

## 9. The memory technique
1. **The hook** — picture a librarian who always shelves a new book to the left of heavier books and right of lighter ones; the shelf stays sorted forever.  
2. **What to overlearn** — the exact three delete cases and the successor rule; the BST property inequality direction.  
3. **Spaced-repetition schedule** — review property + insert at 1 day, full delete at 3 days, height analysis at 7 days, compare with balanced trees at 16 days, re-derive from inorder at 35 days.  
4. **First-principles fallback** — start from the definition that inorder must be sorted; every operation is the minimal change that keeps that traversal sorted.

## 10. What this unlocks
Mastery of plain BSTs is the prerequisite for every self-balancing tree.  
- AVL trees add height-balance factors on the same nodes.  
- Red-black trees encode balance with color bits while preserving the identical BST property.  
- B-trees generalize the ordering rule to n-ary nodes used in databases.  
- Treaps and splay trees layer randomization or access-pattern heuristics on the same insert/search skeleton.

## 11. Self-check — five questions, no answers
1. Draw the BST obtained by inserting the sequence 5,2,7,1,4,6,9 in that order; state its height.  
2. A BST contains the keys 1 through 7; which insertion order yields the minimum possible height?  
3. Delete the root of a two-child BST; show the exact pointer changes required when the successor itself has a right child.  
4. Suppose the BST property is weakened to “left ≤ node < right”. Construct a concrete four-node counter-example that is no longer sorted under inorder traversal.  
5. In a BST of n distinct keys, what is the exact number of null child pointers? Prove your answer from the BST property alone.