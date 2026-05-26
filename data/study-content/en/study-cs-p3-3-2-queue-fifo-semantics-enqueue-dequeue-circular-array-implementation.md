## 1. The one-sentence answer
**A queue is a linear data structure that enforces FIFO (first-in, first-out) order through the pair of operations enqueue (insert at the rear) and dequeue (remove from the front).**

In everyday terms, picture customers lining up at a single checkout counter: the person who arrives first is served first, and newcomers join only at the back. The same rule applies to data. When you enqueue an element you place it at the current rear; when you dequeue you always take the element that has waited longest at the front. This ordering guarantee is the entire definition; every other property follows from it.

A naïve array implementation quickly wastes space because the front index marches forward while the rear index also advances, leaving unused cells behind the front. The circular-array version solves the problem by treating the array as a ring: after the last index comes index 0 again, using modular arithmetic to keep both indices inside the allocated block.

> [!NOTE]
> The circular wrap-around is not an optimisation trick; it is the minimal mechanism that restores O(1) time for both enqueue and dequeue while using a fixed-size array.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover uses a priority-augmented queue to buffer telemetry packets before transmission over the Deep Space Network; packets must leave in the exact order they were generated to preserve time-stamped sensor readings.

Modern CPU schedulers in Linux (CFS) and Windows maintain per-core run queues that obey FIFO ordering within the same priority band; a process that becomes runnable is enqueued at the rear and dequeued from the front when its turn arrives.

Packet switches in data-centre fabrics (e.g., Broadcom Tomahawk ASICs) rely on virtual-output-queue buffers that are strict FIFO queues; violating order would break TCP congestion-control assumptions and produce out-of-order delivery at line rate.

BFS graph traversal, the foundation of shortest-path algorithms in unweighted graphs, is exactly a queue: each vertex is enqueued when discovered and dequeued when its neighbours are examined, guaranteeing level-by-level expansion.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Array indexing       | Circular queue stores elements in contiguous memory cells |
| Modulo arithmetic    | Wrap-around is expressed as `i = (i + 1) % n`             |
| Distinction between logical size and physical capacity | Front and rear indices can cross without overwriting data |

## 4. Building the idea — from intuition to formalism

### Step 1 — FIFO ordering
A queue admits only two mutations: an element may enter only at the rear and may leave only from the front.  
Example: enqueue 7, enqueue 3, dequeue yields 7.  
Formally, if \(Q\) is a queue and \(x\) precedes \(y\) in the arrival sequence, then \(x\) is dequeued before \(y\).  
> [!WARNING] Reversing the order on even one operation destroys the FIFO invariant and turns the structure into a stack or a bag.

### Step 2 — Abstract operations
Define `enqueue(x)` to insert \(x\) at the rear and `dequeue()` to remove and return the front element. Both must run in amortised constant time.  
No other access (random indexing, peeking at the middle) is permitted by the abstract interface.

### Step 3 — Linear array limitation
Using a plain array with `front` and `rear` indices, each successful dequeue advances `front`. After \(k\) dequeues the first \(k\) cells become permanently unusable until the entire array is shifted—an O(n) cost.  
> [!WARNING] Ignoring this drift produces “false full” conditions when logical size is still small.

### Step 4 — Circular mapping
Map the logical rear to physical index `(rear) % capacity`. After the last physical cell the next enqueue lands at index 0.  
The same mapping applies to front. This re-uses every cell exactly once per full rotation.

### Step 5 — Empty and full detection
With modular indices, `front == rear` is ambiguous: it can mean either empty or full. Two standard resolutions exist: reserve one slot (capacity-1 maximum occupancy) or maintain an explicit size counter.  
The size-counter version yields the cleanest code and is adopted below.

### Step 6 — Textbook circular-queue ADT
A circular queue of capacity \(c\) is a triple \((A, f, r, s)\) where \(A[0..c-1]\) is an array, \(f\) and \(r\) are indices, and \(s\) is the current size.  
Enqueue and dequeue are:
\[
\begin{align*}
\text{enqueue}(x) &\colon& A[r] \gets x,\quad r \gets (r+1) \bmod c,\quad s \gets s+1 \\
\text{dequeue}()  &\colon& x \gets A[f],\quad f \gets (f+1) \bmod c,\quad s \gets s-1,\quad\text{return }x
\end{align*}
\]
Both run in \(\Theta(1)\) time.

## 5. Worked examples — every step shown

**Example 1 — Single enqueue**  
*Given:* empty circular queue, capacity 4, indices start at 0.  
*Find:* state after `enqueue(5)`.  
Array begins `[_,_,_,_]`, `f=0`, `r=0`, `s=0`.  
Write 5 at index 0: `[5,_,_,_]`.  
Advance rear: `r = (0+1)%4 = 1`.  
Increment size: `s=1`.  
**Final state:** `[5,_,_,_]`, `f=0`, `r=1`, `s=1`.  
*Reflection:* The first insertion always lands at the initial front index; the modular step is still performed so later wrap-arounds remain consistent.

**Example 2 — Enqueue then dequeue**  
*Given:* queue after Example 1.  
*Find:* result of `dequeue()`.  
Read `A[0]=5`.  
Advance front: `f=(0+1)%4=1`.  
Decrement size: `s=0`.  
Return 5.  
**Final state:** `[5,_,_,_]`, `f=1`, `r=1`, `s=0`.  
*Reflection:* After the matching dequeue the indices coincide again, correctly signalling emptiness via the size counter.

**Example 3 — Fill to capacity-1**  
*Given:* capacity 4, start empty. Perform four enqueues of 1,2,3,4.  
Each enqueue writes and advances `r` modulo 4; size reaches 4.  
Array becomes `[1,2,3,4]`, `f=0`, `r=0`, `s=4`.  
**Result:** queue is full; next enqueue must be rejected.  
*Reflection:* Because we keep an explicit size we can occupy every slot; the “reserve-one” rule is unnecessary.

**Example 4 — Wrap-around dequeue/enqueue**  
*Given:* full queue from Example 3. Dequeue twice (removes 1,2), then enqueue 9.  
After two dequeues: `f=2`, `s=2`, array still `[1,2,3,4]`.  
Enqueue 9 writes at `r=0`: `[9,2,3,4]`, `r=1`, `s=3`.  
**Final state:** front element is now 3; logical order is 3,4,9.  
*Reflection:* The write at index 0 demonstrates that the circular mapping re-uses freed cells without shifting data.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using `front==rear` for both empty and full | Modular arithmetic collides at the same state | Maintain an explicit size counter            |
| Forgetting modulo on rear after last index | Linear thinking persists after learning “circular” | Always write `(r+1)%c` even when r+1 < c     |
| Shifting the array on dequeue | Copying the naïve list model into an array  | Never shift; only move the front index       |
| Allowing enqueue when size==capacity | Off-by-one on the full test                 | Reject when `s==c` before writing            |
| Reading from an empty queue | No guard on size==0                         | Check `s>0` before every dequeue             |
| Storing front and rear as pointers instead of indices | Pointer arithmetic hides modulo intent      | Store integer indices; compute modulo explicitly |
| Assuming dynamic resizing is free | Amortised cost analysis omitted             | Pre-allocate or accept occasional O(n) copy  |

## 7. The textbook-precise statement
A queue is an abstract data type whose values are finite sequences and whose operations satisfy the axiom  
\[
\text{dequeue}(\text{enqueue}(Q,x)) = 
\begin{cases}
x & \text{if } Q\text{ is empty}\\
\text{dequeue}(Q) & \text{otherwise}
\end{cases}
\]
together with the symmetric rule for the new rear.  
A circular-array implementation realises this ADT in \(\Theta(1)\) time per operation using a fixed-size array of length \(c\) and three auxiliary variables (front index, rear index, size). See Cormen et al., *Introduction to Algorithms*, 4e, Chapter 10, Section 10.1.

## 8. Visual — diagram or schematic
```text
Index:   0   1   2   3
Array:  [ 9 | _ | 3 | 4 ]   capacity = 4
            ↑       ↑
           front   rear
Logical order: 3 → 4 → 9   (size = 3)
Next enqueue writes at (rear % 4) = 1
Next dequeue reads at (front % 4) = 2 then advances front
```

## 9. The memory technique
1. **The hook** — Imagine a clock face whose hour hand is the rear and minute hand is the front; both sweep clockwise and wrap at 12.
2. **What to overlearn** — `rear = (rear + 1) % c`, `front = (front + 1) % c`, and the test `size == 0` for empty, `size == c` for full.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Derive the circular mapping from the requirement that both indices must stay inside `[0,c-1]` while the logical sequence length grows and shrinks.

## 10. What this unlocks
Mastery of the circular queue supplies the substrate for breadth-first search, level-order tree traversal, and all sliding-window algorithms that must retain insertion order. It also prepares the ground for the deque (double-ended queue) and for the more advanced ring-buffer techniques used in high-performance networking and real-time operating systems.

## 11. Self-check — five questions, no answers
1. After enqueuing 10 elements into a circular queue of capacity 7, what is the minimum number of dequeues required before the next enqueue can succeed?
2. In a circular queue that uses an explicit size counter, is it possible for `front == rear` when the queue is neither empty nor full? Explain.
3. Write the exact sequence of array indices written by the following operations on a capacity-5 queue that starts empty: enqueue A, enqueue B, dequeue, enqueue C, enqueue D, enqueue E, enqueue F.
4. A programmer omits the modulo operation on the rear index after it reaches capacity. Which two observable failures will appear first?
5. Prove that any sequence of n enqueues and n dequeues on a circular queue of capacity at least 2 performs at most 2n modular reductions.