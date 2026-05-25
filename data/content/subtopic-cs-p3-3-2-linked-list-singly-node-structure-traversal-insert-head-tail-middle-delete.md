## What it is
A singly linked list is a linear data structure composed of a sequence of elements called *nodes*. Each node contains two pieces of information: the data itself, and a reference (or "pointer") to the very next node in the sequence. The list is accessed via a single pointer to its first node, called the *head*, and the final node's pointer is `NULL` to signify the end.

## Why it matters
Linked lists excel where the size of the data is unknown beforehand or changes frequently, as they allow for constant-time insertion and deletion at the beginning of the list. In operating systems, they are used to manage free memory blocks (the "free list"). In aerospace applications, a flight computer might use a linked list to manage a priority queue of tasks, where high-priority tasks can be inserted at the head for immediate execution without shifting a large block of memory as an array would require.

## When to study it
Before tackling linked lists, you must have a firm grasp of pointers or references in your chosen programming language. You should also understand basic control structures (loops, conditionals) and the concept of a `struct` or `class` to define the node structure. A solid understanding of arrays is also crucial, as linked lists are often introduced as an alternative to them, and their trade-offs are a key learning point.

## How to study it (step by step)
1.  **Implement the Node:** In your preferred language, define a `Node` class or struct. It must have two members: one for `data` (e.g., an integer) and one for the `next` pointer (of type `Node*` or its equivalent).
2.  **Implement the Traversal:** Create a `LinkedList` class that holds a single member: the `head` pointer. Write a `print_list()` method that starts a temporary pointer at the `head`, and in a `while` loop, prints the current node's data and then advances the pointer using `current = current->next` until it becomes `NULL`.
3.  **Code `insert_at_head`:** This is the simplest insertion. Create a new node. Set its `next` pointer to the current `head` of the list. Finally, update the list's `head` to point to this new node.
4.  **Code `insert_at_tail`:** This requires traversal. If the list is empty, it's just an `insert_at_head`. Otherwise, traverse the list until your pointer's `next` is `NULL`. This final node is the tail. Set its `next` pointer to your new node.
5.  **Code `delete`:** This is the most nuanced operation. Handle three cases: deleting the `head` (update the `head` pointer), deleting a middle node (find the *previous* node and set `prev->next = prev->next->next`), and deleting the tail (same as middle, but the new last node's `next` becomes `NULL`). Remember to deallocate the memory of the deleted node.
6.  **Analyze Time Complexity:** For each function you wrote, analyze its time complexity in Big O notation. Traversal, insertion at tail, and deletion of a specific element are $O(n)$. Insertion at the head is $O(1)$. Contrast this with array complexities.

## Key ideas, with intuition
1.  **The Node is a Self-Referential Box:** A `Node` is a container with two compartments. The first holds the payload (`data`). The second holds the address of another container of the exact same type (`next`). This self-reference is what allows nodes to chain together.
    $$
    \text{struct Node} \{ \\
    \quad \text{int data}; \\
    \quad \text{Node* next}; \\
    \};
    $$
2.  **The `head` is the Entry Point:** A linked list object itself doesn't contain the data; it only holds one crucial piece of information: the memory address of the very first node. If you lose the `head`, you lose the entire list, as there is no other way to find the subsequent nodes.
3.  **Pointer Re-wiring is the Only Operation:** Unlike an array, nodes are not stored contiguously in memory. To insert or delete, you never move the data. You simply change which node points to which. Insertion involves "splicing" a new node in by redirecting two pointers. Deletion involves "bypassing" a node by redirecting one pointer.
4.  **Traversal is a One-Way Street:** In a singly linked list, each node only knows about the *next* one. You can only move forward, from `head` to `tail`. There is no way to go from a node to its predecessor without starting over from the `head`. This is why access is $O(n)$.

## Worked example
**Problem:** Insert the value `25` after the node with value `10` in the list `5 -> 10 -> 20 -> NULL`.

**Initial State:**
- `head` points to the node containing `5`.
- The node `5` points to `10`.
- The node `10` points to `20`.
- The node `20` points to `NULL`.

**Steps:**

1.  **Allocate the new node:** Create a new `Node` in memory. Let's call it `newNode`. Set its data field: `newNode->data = 25`. Its `next` pointer is currently uninitialized.
    ```
    newNode: [ 25 | ? ]
    ```
2.  **Find the insertion point:** We need to insert *after* `10`. We traverse the list to find the node containing `10`.
    - Start a pointer `current` at `head`. `current` points to `5`.
    - `current->data` is not `10`. Advance `current`: `current = current->next`.
    - `current` now points to the node `10`. We've found our insertion point. Let's call this node `prevNode`.
3.  **Re-wire the pointers:** This is the critical step and must be done in the correct order to avoid losing the rest of the list.
    - **Step 3a:** Connect `newNode` to the rest of the list. The node that `prevNode` (`10`) is currently pointing to (`20`) should become the node that `newNode` points to.
      $$
      \text{newNode->next} = \text{prevNode->next};
      $$
      Now, `newNode` points to the node `20`. The list state is: `5 -> 10 -> 20`, and separately, `25 -> 20`. We haven't orphaned anything.
    - **Step 3b:** Connect the first part of the list to `newNode`. Update `prevNode`'s `next` pointer to point to our `newNode`.
      $$
      \text{prevNode->next} = \text{newNode};
      $$
      Now, the node `10` points to `newNode` (`25`).

**Final State:**
The list is now `5 -> 10 -> 25 -> 20 -> NULL`.

**Reflection:** The order in step 3 is non-negotiable. If we did 3b before 3a, we would set `10`'s `next` pointer to `25`. At that moment, we would lose our only reference to the node `20`, effectively deleting the rest of the list from memory. By linking the new node to the *rest* of the list first, we keep a handle on it before breaking the original chain.

## Diagrams

A simple singly linked list with three nodes:
```text
  head
   |
   V
+------+    +------+    +------+
| 5 | o---->| 10 | o---->| 20 | o----> NULL
+------+    +------+    +------+
```

The state during the worked example (after step 3a, before 3b):
```text
            prevNode
               |
               V
+------+    +------+    +------+
| 5 | o---->| 10 | o |  | 20 | o----> NULL
+------+    +------+  |  +------+
            ^         |
            |         |
            |   +-----|----+
            |   |     V    |
            +---|--+------+
                | 25 | o |
                +------+
                newNode
```

## Memory technique — remember this forever
1.  **The "Train Car" Analogy:** Think of a linked list as a train. Each `Node` is a train car. The `data` is the cargo inside the car. The `next` pointer is the physical coupling that connects one car to the next. The `head` is the locomotive; it's the only way to pull the train forward. To insert a new car, you uncouple two cars, attach the new car to the second one, then attach the first car to the new one.
2.  **Must Overlearn:**
    - **Node Structure:** `struct Node { data_type data; Node* next; };`
    - **Traversal Loop:** `Node* current = head; while (current != NULL) { /* do work */; current = current->next; }`
    - **Insertion Logic (middle):** `newNode->next = prev->next; prev->next = newNode;`
3.  **Spaced Repetition Schedule:** Review and re-implement a linked list from scratch at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.** Do not just read your old code; delete it and write it again.
4.  **First Principles Pathway:** If you forget the insertion logic, get a piece of paper. Draw three boxes representing `prev`, `newNode`, and `current` (which is `prev->next`). Draw the initial arrow from `prev` to `current`. Now, figure out how to redraw the arrows so that `prev` points to `newNode`, and `newNode` points to `current`. The two assignment statements you need will become obvious from your drawing.

## Common mistakes
1.  **Losing the Tail:** When inserting a node, setting `prev->next = newNode` *before* setting `newNode->next = prev->next`. This orphans the rest of the list, causing a memory leak and corrupting your data structure.
2.  **Forgetting Edge Cases:** Failing to test insertion/deletion on an empty list, a list with one node, or at the very beginning (`head`) or very end (`tail`) of the list. Operations on the `head` are special because they modify the `head` pointer of the list itself.
3.  **Dereferencing a NULL Pointer:** In a traversal loop, checking `while (current->next != NULL)` is fine if you want to stop at the *last* node. But if the list is empty (`head` is `NULL`), this check will crash immediately. The robust check is `while (current != NULL)`.
4.  **Off-by-One Errors:** When trying to find the node *before* a target node for deletion, it's easy to stop your loop on the target node itself, by which point you've lost the reference to its predecessor.

## Self-check
1.  Write a function `int get_length(Node* head)` that returns the number of nodes in a linked list.
2.  Write a function `Node* reverse_list(Node* head)` that reverses a singly linked list *in-place* (without creating a new list) and returns the new head.
3.  Write a function `Node* find_middle_node(Node* head)` that returns a pointer to the middle node of a linked list in a single pass. If the list has an even number of nodes, return the second of the two middle nodes.