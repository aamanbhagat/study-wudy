## What it is
A doubly linked list is a linear data structure where each element, or node, contains a pointer to both the next node and the previous node in the sequence. Bidirectional traversal is the process of navigating this list either forwards (from head to tail, using the `next` pointers) or backwards (from tail to head, using the `prev` pointers). This two-way capability is the primary advantage over a singly linked list.

## Why it matters
Bidirectional traversal is fundamental to implementing efficient real-world features. The "undo/redo" functionality in text editors is often implemented with a doubly linked list, allowing you to move forwards and backwards through a history of actions. Similarly, browser history (the back and forward buttons) maps directly to this concept. In memory management algorithms, doubly linked lists are used to maintain lists of free blocks, where merging a newly freed block requires checking both the next and previous blocks to see if they are also free.

## When to study it
You must have a solid understanding of pointers or references in your language of choice, and you must have already mastered the singly linked list. Specifically, you should be able to implement a singly linked list from scratch, including its node structure, insertion, deletion, and (forward) traversal. If you cannot do this, pause and review that topic first.

## How to study it (step by step)
1.  **Define the Node:** Start by defining the structure of a node for a doubly linked list. In C-like pseudocode: `struct Node { T data; Node* next; Node* prev; }`. Contrast this with the singly linked list node. Draw it.
2.  **Implement Forward Traversal:** Write a function `traverse_forward(head)`. The logic is identical to traversing a singly linked list: start at the `head`, and in a loop, process the current node's data and then update your current pointer with `current = current.next` until it becomes `NULL`.
3.  **Implement Backward Traversal:** Write a function `traverse_backward(tail)`. This is the new skill. You must start at the `tail` node. In a loop, process the current node's data, then update the pointer with `current = current.prev` until it becomes `NULL`.
4.  **Handle Edge Cases:** Test both traversal functions on an empty list (`head` and `tail` are `NULL`) and a list with a single node (`head == tail`, `head.next == NULL`, `head.prev == NULL`). Ensure your code doesn't crash.
5.  **Solve a Problem:** Implement a function `find_and_print_reverse(head, value)` that traverses forward to find a node with a given `value`. Once found, it should traverse backward from that node to the beginning of the list, printing each element. This combines both traversal directions and highlights a key use case.

## Key ideas, with intuition
1.  **The Two-Way Street:** The core idea is that each node has two "doors": one marked `next` and one marked `prev`. A singly linked list is a one-way street; a doubly linked list is a two-way street. This symmetry is the key.
    $$ \text{Forward Step: } p_{i+1} = p_i \rightarrow \text{next} $$
    $$ \text{Backward Step: } p_{i-1} = p_i \rightarrow \text{prev} $$
    where $p_i$ is a pointer to the $i$-th node.

2.  **Two Anchors: `head` and `tail`:** To make backward traversal efficient, a doubly linked list must maintain pointers to both the first node (`head`) and the last node (`tail`). Starting a backward traversal from the `tail` is an $O(1)$ operation. Without a `tail` pointer, you would first have to traverse the entire list to find the end, an $O(n)$ operation, which defeats the purpose.

3.  **Symmetrical Nulls:** The list is bounded by `NULL` pointers in both directions. The `prev` pointer of the `head` node is `NULL`, and the `next` pointer of the `tail` node is `NULL`. These `NULL`s are the termination conditions for your traversal loops.
    $$ \text{head} \rightarrow \text{prev} = \text{NULL} $$
    $$ \text{tail} \rightarrow \text{next} = \text{NULL} $$

## Worked example
Let's perform a backward traversal on a doubly linked list containing the integers 10, 20, 30.

**Initial State:**
-   List: `head -> [10] <-> [20] <-> [30] <- tail`
-   `head` points to the node with data 10.
-   `tail` points to the node with data 30.
-   `node(10).prev` is `NULL`.
-   `node(30).next` is `NULL`.

**Goal:** Traverse backward from `tail` to `head`, printing the data of each node.

**Pseudocode:**
```
function traverse_backward(tail_node):
  current = tail_node
  while current is not NULL:
    print(current.data)
    current = current.prev
```

**Step-by-step execution:**
1.  **Initialization:** `current` is set to `tail`, which is the node containing `30`.
2.  **Iteration 1:**
    -   The loop condition `current is not NULL` is true.
    -   `print(current.data)` outputs `30`.
    -   `current` is updated to `current.prev`. The `prev` of node `30` points to node `20`. So, `current` now points to node `20`.
3.  **Iteration 2:**
    -   The loop condition `current is not NULL` is true.
    -   `print(current.data)` outputs `20`.
    -   `current` is updated to `current.prev`. The `prev` of node `20` points to node `10`. So, `current` now points to node `10`.
4.  **Iteration 3:**
    -   The loop condition `current is not NULL` is true.
    -   `print(current.data)` outputs `10`.
    -   `current` is updated to `current.prev`. The `prev` of node `10` (the `head`) is `NULL`. So, `current` is now `NULL`.
5.  **Termination:**
    -   The loop condition `current is not NULL` is false. The loop terminates.

**Final Output:** `30 20 10`

**Reflection:** Each step was a simple, deterministic move. We started at the known `tail`, printed, and then followed the `prev` pointer. The `NULL` pointer at the beginning of the list provided a clean and reliable stopping point, preventing us from running off the end.

## Diagrams
A 3-node doubly linked list:

```text
       head                               tail
        |                                  |
        v                                  v
      +------+    next    +------+    next    +------+
NULL <-| prev | 10 |----->| prev | 20 |----->| prev | 30 |--> NULL
      +------+          +------+          +------+
```

Backward traversal trace. The `(*)` indicates the `current` pointer's position at the start of each loop iteration.

**Step 1:**
```text
                                           (*)
      +------+    next    +------+    next    +------+
NULL <-| prev | 10 |----->| prev | 20 |----->| prev | 30 |--> NULL
      +------+          +------+          +------+
```

**Step 2:**
```text
                      (*)
      +------+    next    +------+    next    +------+
NULL <-| prev | 10 |----->| prev | 20 |----->| prev | 30 |--> NULL
      +------+          +------+          +------+
```

**Step 3:**
```text
       (*)
      +------+    next    +------+    next    +------+
NULL <-| prev | 10 |----->| prev | 20 |----->| prev | 30 |--> NULL
      +------+          +------+          +------+
```

## Memory technique — remember this forever
1.  **Visual Hook:** Think of a **train on a track**. Each carriage is a `Node`. You can walk from the engine (`head`) to the caboose (`tail`) by going through the `next` door of each carriage. Crucially, you can also walk back from the caboose to the engine by going through the `prev` door. The track ends in both directions (`NULL`).

2.  **Overlearn these facts:**
    -   Node Structure: `struct Node { data_type data; Node* next; Node* prev; }`
    -   Forward Step: `current = current->next;`
    -   Backward Step: `current = current->prev;`

3.  **Spaced Repetition Schedule:** Re-derive and re-implement traversal from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read it; code it.

4.  **First Principles Pathway:** If you forget everything, start with the node structure. It has two pointers: `next` and `prev`. This immediately implies there are only two ways to move from any given node. Forward traversal must use `next`. Backward traversal must use `prev`. The list has to start and end somewhere, so `head->prev` and `tail->next` must be `NULL`. The entire traversal logic can be rebuilt from these simple structural facts.

## Common mistakes
1.  **Starting Backward Traversal Incorrectly:** Starting a full backward traversal from `tail->prev` instead of `tail`. This skips the last element. Always initialize your pointer to `tail` itself.
2.  **Incorrect Loop Termination:** Forgetting to check for `NULL`. A backward traversal loop condition must be `while (current != NULL)`. A common mistake is to use `while (current->prev != NULL)`, which causes the loop to terminate one element too early (it won't process the `head`).
3.  **Corrupting Pointers during other Operations:** This is a forward-looking warning. When you later implement insertion or deletion, the most common error is forgetting to update *both* the `next` pointer of the previous node AND the `prev` pointer of the next node. A single forgotten update breaks the chain for one direction of traversal.
4.  **Dereferencing a NULL Pointer on an Empty List:** Trying to access `head->data` or `tail->data` before checking if the list is empty. Always handle the empty case (`head == NULL`) as a separate, initial check in your functions.

## Self-check
1.  Write the pseudocode for a function `print_list_in_reverse(list)` that takes a doubly linked list object (which contains a `tail` pointer) and prints its elements in reverse order.
2.  You are given a pointer `p_node` to a node somewhere in the middle of a large doubly linked list. You are not given pointers to the `head` or `tail`. Write a function to find and return a pointer to the `head` of the list.
3.  Consider a doubly linked list that is circular, meaning `head->prev` points to `tail` and `tail->next` points to `head`. How would you modify your forward and backward traversal algorithms to print all elements exactly once, without getting into an infinite loop? What would be your new termination condition?