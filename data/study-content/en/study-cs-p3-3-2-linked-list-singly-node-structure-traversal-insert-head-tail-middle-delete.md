## 1. The one-sentence answer
**A singly linked list is a linear collection of nodes in which each node stores data and a single reference to the next node, forming a chain that can be traversed in one direction only.**

The structure replaces the fixed-size, contiguous memory of an array with dynamic allocation. Each node exists independently in memory; the only connection between them is the explicit pointer stored inside the previous node. This design removes the need to resize or shift blocks of memory when the collection grows or shrinks.

Traversal follows the chain by repeatedly reading the next reference until a null terminator appears. Insertion and deletion change only the references of the adjacent nodes, leaving all other nodes untouched.

> [!NOTE]
> The decisive property is that access is sequential: reaching the k-th node always requires k-1 pointer hops from the head, because no random-access index exists.

## 2. Why this matters — concrete and current
In the Linux kernel the task_struct list that holds runnable processes is implemented as a singly linked list (struct list_head) so that the scheduler can insert or remove tasks in constant time without copying data.

In the V8 JavaScript engine, the hidden-class transition chains used for object property lookup are singly linked; each new shape points to its predecessor, enabling fast property addition without resizing a hash table.

In spacecraft flight software, such as NASA’s Core Flight System, telemetry packet buffers are stored in singly linked lists so that new sensor packets can be appended at interrupt time without moving existing data in limited SRAM.

In blockchain node implementations (Bitcoin Core’s mempool), unconfirmed transactions are kept in a singly linked list ordered by fee rate; miners traverse the list once to select the next block, and eviction of low-fee entries requires only pointer rewrites.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Reference / pointer  | Nodes are located by storing the memory address of the next node; without this primitive the chain cannot be built. |
| Null / sentinel value| The end of the list is marked by a null reference; every traversal and insertion algorithm must test for it. |
| Dynamic memory allocation | Each node is created at runtime; the language must provide a way to obtain fresh memory without compile-time size declarations. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Node as the atomic unit
A node is the smallest indivisible element of the list. It contains a data field and exactly one link field that will hold the address of another node or null.

Concrete example: a node holding the integer 42 is written  
data = 42, next = null.

Formally, a node N is the pair  
$$N = (\text{data},\ \text{next})$$  
where next is either another node or the distinguished value ⊥ (null).

> [!WARNING]
> Forgetting to initialize next to null produces dangling references that cause traversal to read arbitrary memory.

### Step 2 — Head reference as the sole entry point
The list itself is identified solely by a variable head that stores the address of the first node. All other nodes are reached only by following successive next links.

Concrete example: head → (42, next) → (7, null) represents the sequence 42, 7.

Formally, a list L is defined by  
$$L = \text{head}$$  
with the inductive rule that if head ≠ ⊥ then the remainder is head.next.

> [!WARNING]
> Losing the head reference orphans every node; garbage collection may reclaim them, but the list is irretrievably gone.

### Step 3 — Traversal by iterative pointer advance
To visit every element, start at head and repeatedly replace the current pointer with its next field until null is reached.

The loop invariant is: after i iterations the current pointer equals the i-th node.

Formally, the traversal computes the sequence  
$$p_0 = \text{head},\quad p_{i+1} = p_i.\text{next}\quad\text{while }p_i\neq\perp.$$

> [!WARNING]
> An off-by-one test (while current.next != null) skips the last node; the correct guard is while current != null.

### Step 4 — Insertion at the head
Create a new node whose next field points to the current head, then update head to the new node. This requires no traversal and is O(1).

Formally,  
$$N.\text{next} \leftarrow \text{head},\quad\text{head} \leftarrow N.$$

> [!WARNING]
> Reversing the assignment order (head = N before N.next = head) creates a self-loop and loses the original list.

### Step 5 — Insertion at the tail
Traverse until the node whose next is null, then set that node’s next to the new node. The new node’s next remains null.

Formally, locate the unique node T such that T.next = ⊥, then T.next ← N, N.next ← ⊥.

> [!WARNING]
> Forgetting to set the new node’s next to null leaves a dangling pointer that may point into freed memory.

### Step 6 — Deletion of a node
To remove a node X, locate its predecessor P and set P.next = X.next. X is then unreachable and can be deallocated.

Formally, if P.next = X then P.next ← X.next.

> [!WARNING]
> Deleting the head requires a special case: head ← head.next; otherwise the predecessor does not exist.

## 5. Worked examples — every step shown

**Example 1 — Insert 5 at head of empty list**  
*Given:* head = null.  
*Find:* list containing only 5.  
Create N = (5, null).  
Set N.next ← head (still null).  
Set head ← N.  
**Final answer:** head → (5, null)  
*Reflection:* The empty-list case collapses to a single assignment; the same two-line pattern works for any initial list.

**Example 2 — Traverse and print values**  
*Given:* head → (3, p1) → (9, null).  
*Find:* output 3 then 9.  
current = head.  
While current ≠ null: print current.data, current = current.next.  
Iteration 1: print 3, current = p1.  
Iteration 2: print 9, current = null.  
Loop ends.  
**Final answer:** printed sequence 3 9  
*Reflection:* The loop guard current ≠ null guarantees the last datum is visited exactly once.

**Example 3 — Insert 7 after the node holding 3**  
*Given:* head → (3, p1) → (9, null).  
*Find:* head → (3, p2) → (7, p1) → (9, null).  
Create N = (7, null).  
Set N.next ← p1 (the node after 3).  
Set p1’s predecessor (the node 3) .next ← N.  
**Final answer:** list 3, 7, 9  
*Reflection:* Middle insertion needs the predecessor pointer; a single forward traversal cannot obtain it without an auxiliary variable.

**Example 4 — Delete the node holding 9**  
*Given:* head → (3, p1) → (9, null).  
*Find:* head → (3, null).  
Locate predecessor p1 where p1.next = node 9.  
Set p1.next ← node9.next (null).  
Deallocate node 9.  
**Final answer:** list 3  
*Reflection:* The algorithm never needs the value 9 itself; only the predecessor’s link is rewritten.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                      | How to avoid it                                      |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| Null dereference on empty list | head is null yet code assumes a node exists         | Always test head == null before any next access      |
| Lost nodes after head update  | Assignment order reversed when inserting at head    | Write newNode.next = head first, then head = newNode |
| Infinite loop                 | next field never set to null on new tail node       | Explicitly set newNode.next = null on every creation |
| Off-by-one traversal          | Guard written as while current.next != null         | Use while current != null and advance after use      |
| Deleting head without update  | Special case omitted                                | Check if node to delete == head before predecessor search |
| Memory leak on deletion       | Node removed from list but never freed              | Pair every removal with an explicit deallocation call|
| Concurrent modification       | Another thread changes links during traversal       | Use locks or make a snapshot copy before iteration   |

## 7. The textbook-precise statement
A singly linked list over a set of values V is a finite sequence of nodes  
$$N_1, N_2, \dots, N_k \quad (k \ge 0)$$  
where each \(N_i = (v_i, r_i)\), \(v_i \in V\), and \(r_i\) is either \(N_{i+1}\) or the null reference ⊥. The list is identified by the distinguished reference head = \(N_1\) (or ⊥ when empty). All primitive operations—traversal, head insertion, tail insertion, and deletion—are defined by local rewrites of at most two references and run in time linear in the distance from head to the affected node. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 10, Section 10.2.)

## 8. Visual — diagram or schematic
```text
head
  │
  ▼
┌──────────┐   next    ┌──────────┐   next    ┌──────────┐
│ data: 42 │──────────▶│ data: 7  │──────────▶│ data: 99 │───▶ ⊥
└──────────┘           └──────────┘           └──────────┘
   node 1                 node 2                 node 3
```
Each rectangle is a node allocated on the heap. The arrow labelled “next” is the single link field. The symbol ⊥ denotes the null terminator.

## 9. The memory technique
1. **The hook** — Picture a conga line of dancers, each holding the belt of the person in front; the front person is head, the empty space behind the last dancer is null.
2. **What to overlearn** — head insertion is always two assignments; traversal guard is “while current != null”; every new node’s next must be set before any other pointer change.
3. **Spaced-repetition schedule** — Review node definition after 1 day, implement insert/delete after 3 days, write a full list class after 7 days, compare with doubly-linked list after 16 days, re-derive complexity after 35 days.
4. **First-principles fallback** — Rebuild from the definition: a list is a chain of pairs (value, address). Any operation is a local rewrite of one or two addresses starting from head.

## 10. What this unlocks
Mastery of the singly linked list supplies the mental model for every pointer-based structure that follows: stacks, queues, hash-table chaining, adjacency lists in graphs, and the internal representation of strings in some language runtimes.

- Doubly linked lists become a simple extension by adding a prev field.
- Circular lists appear when the tail’s next is set to head.
- Skip lists add probabilistic forward pointers on the same node skeleton.
- Trees replace the single next reference with an array or pair of child references.

## 11. Self-check — five questions, no answers
1. Draw the exact memory layout after inserting 10 at the head of the list [5, 3] and then inserting 7 at the tail.
2. Write the precise condition that must hold after any correct deletion of a non-head node.
3. A traversal function returns after visiting only the first node. Which single character change in the loop guard would cause this behaviour?
4. Prove that inserting at the tail of a list of length n requires Θ(n) time while inserting at the head requires Θ(1).
5. Identify the smallest list on which deleting the second node would be impossible without an auxiliary pointer variable.