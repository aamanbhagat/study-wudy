## 1. The one-sentence answer
**Disk scheduling decides the exact order in which pending I/O requests for disk cylinders are serviced so that total head movement (seek time) stays minimal.**

Operating systems keep a queue of cylinder numbers that processes want to read or write. The disk head can move only one cylinder at a time, and every movement costs time. Different algorithms therefore reorder that queue using different rules. FCFS simply follows arrival order, while SCAN, C-SCAN and LOOK all try to reduce back-and-forth travel by sweeping the head in a planned direction.

The core trade-off is fairness versus throughput: a simple policy may starve some requests, while an aggressive sweep policy may leave a request waiting for a long time if it lies just behind the current sweep.

> [!NOTE]
> The single most important insight is that seek time dominates everything else; even a mathematically perfect ordering cannot beat the physical limit of how fast the arm can move, so every algorithm is ultimately judged by total cylinders traversed.

## 2. Why this matters — concrete and current
Modern NVMe SSDs still expose a logical block address space that the OS must schedule when multiple processes issue concurrent reads; the Linux kernel’s mq-deadline and kyber schedulers are direct descendants of SCAN/LOOK ideas adapted for flash.

In aerospace telemetry systems, satellite solid-state recorders receive bursts of sensor data at unpredictable times; NASA’s cFS flight software uses a C-SCAN variant to guarantee bounded latency for high-priority science packets before the recorder fills.

Semiconductor fabs log petabytes of process data daily onto HDD arrays inside clean-room servers; Seagate’s enterprise drives rely on firmware-level LOOK-style scheduling to keep mean response time under 8 ms even when 2000+ random writes arrive per second.

In machine-learning training clusters, TensorFlow’s tf.data service issues thousands of small shard reads from a shared Ceph cluster; the underlying Ceph OSDs run a modified SCAN scheduler so that consecutive training epochs do not thrash the disk head across the entire 10 TB volume.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Queue and FIFO order | FCFS is literally a FIFO queue of cylinder requests       |
| Absolute difference \|x−y\| | Seek distance between any two cylinders is exactly this   |
| Directional sweep    | SCAN/C-SCAN/LOOK all maintain a current movement direction|
| Circular addressing  | C-SCAN treats the disk surface as a circle that resets    |

If any row above is unclear, pause and review basic data structures and absolute-value arithmetic before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Model the disk surface
A disk is a set of numbered cylinders from 0 to Max. The head is currently at position Head. Every request is simply an integer cylinder number.  
Example: Max = 199, Head = 50, requests = {82, 170, 43, 140}.  
Formal statement: the input is a set \( R = \{r_1, r_2, \dots, r_n\} \) where each \( r_i \in [0, Max] \).  
> [!WARNING] Treating the disk as linear instead of circular will make C-SCAN calculations wrong later.

### Step 2 — FCFS ordering
Serve requests in the exact sequence they arrived; no reordering occurs. Total seek cost is simply \( \sum_{i=0}^{n} |p_i - p_{i+1}| \) where \( p_0 = \) Head and \( p \) is the arrival sequence.  
Example: sequence 82, 170, 43, 140 gives movements 32 + 88 + 127 + 97 = 344 cylinders.

### Step 3 — SCAN (elevator) sweep
Head continues in its current direction until it reaches the farthest request in that direction, then reverses. All requests in the opposite direction are ignored until reversal.  
Formal rule: while moving right, serve every \( r_i \ge \) current position in ascending order; on reversal do the symmetric left pass.

### Step 4 — C-SCAN circular sweep
After reaching the end, the head jumps back to cylinder 0 (or the lowest pending request) without servicing anything on the return trip; it only sweeps in one direction. This guarantees more uniform waiting time.  
Formal: after servicing Max request, next service position becomes 0 and direction resets to “right”.

### Step 5 — LOOK optimisation
Instead of travelling all the way to cylinder 0 or Max, the head reverses as soon as there are no more requests beyond the last one in the current direction. LOOK is therefore SCAN with early reversal.  
Formal: reversal condition becomes “no \( r_i \) lies strictly beyond current extreme request”.

### Step 6 — Cost function
For any ordering \( p_0, p_1, \dots, p_n \), total cost \( C = \sum |p_i - p_{i+1}| \). The algorithm that produces the smallest C for a static queue is optimal for that instant; dynamic arrivals make the problem NP-hard, hence the heuristics above.

### Step 7 — Starvation and fairness
FCFS is starvation-free. Pure SCAN can starve a request that arrives just after the head has passed its cylinder. C-SCAN and LOOK bound the maximum wait to at most two full sweeps.

## 5. Worked examples — har step show karo

**Example 1 — FCFS baseline**  
*Given:* cylinders 0–199, head starts at 50, arrival order 82, 170, 43, 140.  
*Find:* total cylinders traversed.  
Movement 1: |82−50| = 32.  
Movement 2: |170−82| = 88.  
Movement 3: |43−170| = 127.  
Movement 4: |140−43| = 97.  
**344**  
*Reflection:* The large 127-cylinder jump shows why FCFS wastes movement when requests are scattered.

**Example 2 — SCAN rightward**  
*Given:* same data, head at 50 moving right.  
*Find:* service order and cost.  
Right sweep: 82, 140, 170 (total right movement 120).  
Reverse at 170, left sweep: 43 (movement 127).  
Total: 247.  
*Reflection:* One reversal saved 97 cylinders compared with FCFS.

**Example 3 — C-SCAN**  
*Given:* same data.  
Right sweep identical (120). After 170, head resets to 0 then services 43 (jump 170 + 43 = 213).  
Total: 333.  
*Reflection:* Reset cost is high for this small queue but becomes fairer with many requests.

**Example 4 — LOOK**  
*Given:* same data.  
Right sweep stops at 170 (no requests beyond). Reverse immediately, services 43.  
Total movement: 120 + 127 = 247 (same as SCAN here, but would differ if Max were larger).

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the initial direction | Students assume head always starts moving right | Record current direction before applying SCAN/LOOK |
| Using Max instead of last request in LOOK | Confusing LOOK with SCAN                    | Check whether any request lies beyond the extreme pending cylinder |
| Treating C-SCAN return as free | Ignoring the long reset jump                | Always add |last − 0| when direction resets     |
| Calculating distance without absolute value | Sign error when head moves left             | Always write \|current − next\|               |
| Assuming dynamic arrivals     | Queue changes mid-sweep                     | State clearly whether queue is static or dynamic |
| Mixing cylinder 0 with Max    | Off-by-one when resetting in C-SCAN         | Draw the circle once before coding             |

## 7. The textbook-precise statement
Let the disk contain cylinders \( \{0,1,\dots,Max\} \). At time \( t \) let the request queue be a multiset \( R(t) \) and the head position be \( h(t) \) with direction \( d(t) \in \{\uparrow,\downarrow\} \). FCFS produces the service order given by arrival timestamps. SCAN services the sorted subset of \( R \) lying in direction \( d \) until the extreme cylinder in that direction is reached, then flips \( d \). C-SCAN, after servicing the extreme cylinder, sets next service position to 0 and \( d \leftarrow \uparrow \). LOOK replaces the extreme cylinder test with “the farthest cylinder that still contains a pending request”. All four algorithms are presented formally in Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §11.2.

## 8. Visual — diagram or schematic
```
Cylinders: 0 ------------------50(head)------------------199
Requests:      43      82          140     170

FCFS path: 50→82→170→43→140   (many zig-zags)
SCAN path: 50→82→140→170   then reverse 170→43
C-SCAN:    50→82→140→170   then jump 170→0→43
LOOK:      50→82→140→170   reverse immediately 170→43
```

## 9. The memory technique
**The hook** — picture an elevator in a building; it only turns around when nobody else is waiting on the current floor (LOOK) or when it hits the top floor (SCAN).  
**What to overlearn** — total cost is always the sum of absolute differences; reversal happens exactly once per sweep in SCAN/LOOK.  
**Spaced-repetition schedule** — review the four algorithm names and their reversal rules after 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — if you forget the name, redraw the cylinder line, mark current head and direction, then ask “do I continue until the real end or only until the last request?”

## 10. What this unlocks
You can now analyse any I/O scheduler in Linux, reason about tail latency in databases, and implement a disk scheduler inside an OS project.  
- Next topics: SSTF, SSTF with lookahead, multilevel feedback queue I/O schedulers  
- Techniques: modelling seek time as a cost function inside discrete-event simulation  
- Theorems: proof that LOOK is starvation-free under static queues

## 11. Self-check — five questions, no answers
1. For the queue in Example 1, what is the service order and total cost under LOOK if the head is initially moving left?  
2. Why does C-SCAN give more uniform response times than SCAN even though its total seek distance is sometimes larger?  
3. A request for cylinder 199 arrives exactly when the head reaches 170 in a rightward SCAN sweep. Will it be serviced before the head reverses?  
4. In a LOOK implementation, how do you detect that no further requests exist in the current direction without scanning the entire queue each time?  
5. Suppose requests arrive continuously at cylinder 100 while the head is sweeping from 0 to 199. Which algorithm will starve cylinder 100 and why?