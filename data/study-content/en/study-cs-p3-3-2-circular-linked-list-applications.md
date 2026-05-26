## 1. The one-sentence answer
**A circular linked list is a linear data structure in which the final node stores a pointer back to the first node, forming a closed loop that supports repeated cyclic traversal without explicit end-of-list checks.**

In ordinary singly-linked lists the last node points to null, forcing every traversal algorithm to test for that sentinel on every step. When an application must visit elements repeatedly in the same order—such as handing control to the next waiting task—the null test becomes both unnecessary overhead and a source of off-by-one errors. Closing the loop removes the null entirely; the only termination condition required is an explicit count or a sentinel value stored inside the data.

The same loop also guarantees that every node is reachable from every other node by walking forward, which simplifies algorithms that treat the collection as a ring rather than a sequence with distinct ends.

> [!NOTE]
> The decisive advantage is not the extra pointer itself but the elimination of the null test on every iteration, which turns an O(n) scan that must stop into an O(1)-per-step cycle that can be walked indefinitely until an external counter says stop.

## 2. Why this matters — concrete and current
The Linux kernel’s Completely Fair Scheduler maintains per-CPU run queues as circular doubly-linked lists of `task_struct` objects; the constant-time “next task” operation is performed by simply advancing the `next` pointer, avoiding any null check inside the hot path of the scheduler tick.

In the implementation of the Josephus problem inside competitive-programming libraries and in the design of multiplayer turn-based game engines (e.g., the turn queue inside Unity’s ML-Agents), a circular list lets the same traversal code run for an arbitrary number of rounds without resetting a head pointer.

Network interface cards that implement token-ring or round-robin DMA descriptor rings (used in high-speed NICs from Intel and Mellanox) store packet descriptors in hardware-visible circular buffers whose wrap-around is expressed by a single modular pointer update—exactly the semantics of a circular linked list mapped to contiguous memory.

Audio and video players (VLC, FFmpeg’s `avplaylist`) keep the list of decoded frames or queued tracks as a circular list so that “repeat one” or “repeat all” modes require no extra branching; the decoder simply follows the `next` pointer after the last frame.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Singly-linked list node        | Circular list is obtained by one extra assignment to the tail’s `next` field. |
| Pointer aliasing & cycles      | You must be able to detect when you have returned to the starting node without an explicit null. |
| Modulo arithmetic              | Many applications map the logical “next” operation onto an index `(i+1) mod n`. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Close the loop
A singly-linked list ends when `node.next == NULL`. Replace that assignment with `tail.next = head`. The structure now contains no null pointer among its link fields.

Example: nodes A→B→C become A→B→C→A.  
Formal statement:  
$$
\text{last}.\textit{next} \gets \textit{first}
$$

> [!WARNING]
> If the assignment is performed before the list is fully built, an intermediate node may point back to an uninitialized head, creating a premature cycle that loses the remaining elements.

### Step 2 — Define a full traversal
Because every node now has a successor, a walk that begins at any node and follows `next` will eventually visit every node and return to the start after exactly `n` steps.

Formal statement:  
$$
\forall i \in \{0..n-1\},\; p_{i+1} = p_i.\textit{next},\; p_n = p_0
$$

### Step 3 — Termination by external counter
An algorithm that must process each element once per round now carries its own iteration limit instead of testing for null.

Example: round-robin scheduler with `k` tasks performs exactly `k` advances per time slice.

### Step 4 — Sentinel-free insertion after tail
To add a new node after the current tail, store the old tail, set `new.next = old.next` (which already points to head), then `old.next = new`, and finally update the tail reference.

### Step 5 — Detection of the cycle start
Any node can serve as the logical head; the original head is remembered only by an external pointer. When that pointer is advanced around the ring it returns to the same address after `n` steps, confirming closure.

### Step 6 — Textbook definition
A circular linked list of length `n ≥ 1` is a finite sequence of nodes `p_0, p_1, …, p_{n-1}` such that `p_i.next = p_{i+1 mod n}` for all `i`.

## 5. Worked examples — every step shown

**Example 1 — Single-element ring**  
*Given:* Node `A` with `A.next = NULL`.  
*Find:* Convert it into a circular list.  
Step 1: `A.next ← A`.  
*Why:* The single node must point to itself to satisfy the cycle equation `p_0.next = p_{0 mod 1}`.  
**Final answer:** `A.next = A`

*Reflection:* The self-loop is the base case that every later insertion algorithm must preserve.

**Example 2 — Insert after tail (two nodes)**  
*Given:* Ring `A→B→A`, tail reference `B`.  
*Find:* Insert `C` after `B`.  
Step 1: `C.next ← B.next` (= `A`). *Why:* Preserve the existing cycle.  
Step 2: `B.next ← C`. *Why:* Make `B` point to the newcomer.  
Step 3: Update tail to `C`.  
**Final answer:** Ring `A→B→C→A`

*Reflection:* The insertion reuses the old tail’s `next` value, avoiding any null test.

**Example 3 — Round-robin traversal for 3 tasks**  
*Given:* Ring `T0→T1→T2→T0`, current = `T0`.  
*Find:* Execute each task once.  
Step 1: `i = 0`; while `i < 3` do { run(current); current = current.next; i++ }.  
*Why:* The loop bound replaces the missing null check.  
**Final answer:** Execution order `T0,T1,T2`

*Reflection:* The same loop code works for any number of rounds.

**Example 4 — Josephus elimination (k=2)**  
*Given:* Ring of 5 nodes numbered 0–4, start at 0, count every second node.  
Step 1: Count 2 nodes, eliminate the second, link its predecessor to its successor.  
Step 2: Continue until one node remains.  
Detailed steps yield survivor node 2.  
**Final answer:** 2

*Reflection:* The circular structure lets the counting pointer wrap without extra modular arithmetic.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Losing the head pointer           | Only one external reference exists; any rotation moves it | Keep a separate `head` variable that is never advanced inside traversal loops |
| Off-by-one in counting algorithms | The cycle length equals `n`, not `n-1`      | Always test the iteration counter, never the pointer value |
| Inserting into an empty list      | No tail exists to close the loop            | Special-case `n==0` by setting both head and tail to the new node and linking it to itself |
| Infinite loop on print            | No null sentinel to stop a `while(node)` loop | Always iterate with a counted `for` loop or stop when the pointer returns to the recorded start |
| Multiple heads in a shared ring   | Two external pointers into the same cycle   | Designate one canonical entry point or use a header node |
| Memory leak on deletion           | Deleting a node whose `next` still points inside the ring | Unlink first (`pred.next = victim.next`), then free |
| Assuming doubly-linked semantics  | Code uses `prev` pointers that do not exist | Verify singly-linked circular invariants before using reverse operations |

## 7. The textbook-precise statement
A circular linked list is a finite sequence of nodes \(p_0,p_1,\dots,p_{n-1}\) (\(n\ge 0\)) together with a distinguished pointer `head` such that  
$$
p_i.\textit{next}=p_{(i+1)\bmod n}\quad\text{for all }0\le i<n
$$  
when \(n>0\), and `head = NULL` when \(n=0\). All link fields are non-null for \(n\ge 1\). (Cormen et al., *Introduction to Algorithms*, 4e, §10.2, “Linked-list representation”, with the circular variant stated in Exercise 10.2-5.)

## 8. Visual — diagram or schematic
```text
head
 │
 ▼
┌────┐   ┌────┐   ┌────┐
│ A  │──▶│ B  │──▶│ C  │
│next│   │next│   │next│
└────┘   └────┘   └────┘
   ▲___________________│
        (C.next points back to A)
```
Labelled nodes A, B, C; each `next` arrow shown; the final arrow from C returns to A forming the cycle. The external `head` pointer remains fixed on A while traversals may rotate around the ring.

## 9. The memory technique
1. **The hook** — Picture a clock whose hour hand never falls off the face; the numbers 1–12 form a perfect circle and the hand simply keeps going.
2. **What to overlearn** — The single assignment `tail.next = head` and the iteration rule “stop after exactly n steps”.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the cycle equation \(p_i.next = p_{i+1 \bmod n}\) from the requirement that every node must have a successor.

## 10. What this unlocks
Circular lists are the structural foundation for circular buffers, Fibonacci heaps’ child lists, and the “next” pointer inside most round-robin schedulers. They also prepare the ground for the more general notion of a cycle in graph algorithms and for the amortized analysis of dynamic tables that wrap around a fixed-size array.

- Next: Circular buffers and their cache-friendly array implementation  
- Next: Josephus problem and its binary-solution closed form  
- Next: Thread-safe ring buffers in lock-free programming  

## 11. Self-check — five questions, no answers
1. Convert the list `[1→2→3→NULL]` into a circular list and state the new value of the node that previously held `NULL`.
2. A circular list of length 4 is traversed with a counted loop that runs 7 times; which node is visited on the 7th step?
3. Why does a naïve `while (p != NULL)` loop become infinite on a circular list?
4. Give the exact sequence of pointer assignments required to delete the node immediately after `head` in a non-empty circular list.
5. In a circular list representing 8 players, the elimination count is 3; starting at player 0, which player is eliminated first?