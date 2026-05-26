## 1. The one-sentence answer
**Disk scheduling selects the order in which pending I/O requests to disk cylinders are serviced so that total seek time is minimised under the constraint of a single moving head.**

FCFS processes requests in arrival order. It never reorders, so the head may travel back and forth across the entire disk many times. SCAN moves the head continuously in one direction until it reaches the last cylinder (or the last pending request in the LOOK variant), then reverses. C-SCAN restricts movement to one direction only and instantly returns the head to the opposite end without servicing requests on the return trip, producing more uniform waiting times. All four algorithms are evaluated by the same metric: total head movement expressed in cylinders traversed.

The essential trade-off is fairness versus efficiency. FCFS is fair but can produce long seeks; the directional algorithms reduce total movement at the cost of occasionally making a request that has just been passed wait for a full sweep.

> [!NOTE]
> The performance gap between FCFS and the directional algorithms grows linearly with request density; under heavy load the head movement of SCAN or C-SCAN approaches twice the disk diameter while FCFS can approach the product of request count and diameter.

## 2. Why this matters — concrete and current
Modern NVMe SSDs still expose logical block addresses to the operating system; the host-side I/O scheduler (e.g., Linux mq-deadline or Windows StorNVMe) applies variants of SCAN to coalesce and order commands before they reach the controller, directly affecting tail latency in database workloads at companies such as Meta and Snowflake.

In aerospace telemetry systems, solid-state recorders on satellites must service high-rate sensor writes while guaranteeing bounded read latency for attitude-control telemetry; NASA’s cFS flight software therefore configures its RTEMS disk driver with a C-SCAN policy so that a burst of image dumps never starves the control loop.

Semiconductor fabrication equipment uses real-time disk logging of process variables at millisecond granularity; ASML’s TwinScan machines employ a LOOK-style scheduler inside their VxWorks-based data-acquisition layer to keep worst-case seek time below 2 ms, preserving process control loops that would otherwise miss timing windows.

High-frequency trading platforms at Jane Street and Citadel keep market-data replay files on HDD arrays; their custom kernel schedulers use C-SCAN to guarantee that a 10 000-request burst finishes within a deterministic window, enabling reproducible back-testing that would be impossible under FCFS variance.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cylinder / LBA numbering | Requests are identified by integer positions on a linear address space |
| Seek time model          | Cost is defined as absolute difference between consecutive head positions |
| Request queue            | The input is an ordered list of (arrival time, cylinder) pairs |
| Head position            | The algorithm must know the starting cylinder and direction |

## 4. Building the idea — from intuition to formalism

### Step 1 — Requests arrive as an unordered sequence of cylinder numbers
A disk receives I/O requests at unpredictable times; each request names a cylinder. The scheduler’s only decision is the order in which these pending requests are issued to the hardware.

Example: head starts at cylinder 50; requests for 10, 90, 40 arrive.

Formal statement: given a set \( R = \{r_1, r_2, \dots, r_n\} \) of requested cylinders and initial head position \( h_0 \), produce a permutation \( \pi \) that minimises total seek cost \( \sum_{i=0}^{n-1} |h_{\pi(i)} - h_{\pi(i+1)}| \).

> [!WARNING]
> Treating the queue as a set rather than a sequence erases arrival order; FCFS would then become undefined.

### Step 2 — FCFS simply replays arrival order
No reordering occurs. The head follows the exact sequence in which requests entered the queue.

Seek cost under FCFS is therefore \( |h_0 - r_1| + |r_1 - r_2| + \dots + |r_{n-1} - r_n| \).

### Step 3 — SCAN imposes a single reversal point
The head moves monotonically in the current direction until no further requests lie ahead, then reverses. The reversal point is either the physical end cylinder or the farthest request in that direction (LOOK).

Formal rule: while requests remain, choose the pending cylinder closest to the head in the current direction; on exhaustion of that direction, flip direction.

### Step 4 — C-SCAN removes the return sweep
After servicing the farthest request in the chosen direction, the head is returned to the opposite extreme without servicing any requests on the return path. The next sweep therefore always starts from the lowest (or highest) cylinder.

This yields the invariant that every request is serviced in a single unidirectional pass per full rotation of the schedule.

### Step 5 — LOOK and C-LOOK stop at the last request
Instead of travelling to cylinder 0 or the maximum cylinder, the head stops at the outermost pending request, reverses (LOOK) or jumps (C-LOOK). The only change to the formal rule is that the “end” test becomes “no pending requests beyond current head position”.

### Step 6 — Total cost comparison uses the same metric
All algorithms are scored by cumulative cylinder traversals. Under uniform random requests the expected cost ordering is FCFS > LOOK ≈ SCAN > C-SCAN for variance, with C-SCAN producing the smallest variance in per-request waiting time.

## 5. Worked examples — every step shown

**Example 1 — Trivial FCFS**
- *Given:* head at 50, request queue [10, 90, 40]
- *Find:* total seek distance under FCFS
- Start at 50, move to 10: distance \( |50-10| = 40 \).  
  *Why:* FCFS services the first request in the queue.
- Then to 90: \( |10-90| = 80 \).  
  *Why:* next request in arrival order.
- Then to 40: \( |90-40| = 50 \).  
  *Why:* final request.
- **50 + 80 + 50 = 170**

*Reflection:* The head crossed the disk twice; any directional algorithm would have halved this distance.

**Example 2 — SCAN on the same input**
- *Given:* head at 50, direction upward, requests {10, 90, 40}
- Move upward to 90: 40.  
  *Why:* 90 is the only request above 50.
- Reverse, service 40 then 10: 50 + 30.  
  *Why:* after reversal the next closest requests are 40 and 10.
- **Total: 120**

*Reflection:* One reversal saved 50 cylinders compared with FCFS.

**Example 3 — C-SCAN**
- *Given:* head at 50, requests {10, 90, 40}, max cylinder 100
- Upward to 90: 40.  
  *Why:* same first leg as SCAN.
- Jump to 0 (no service), then upward: service 10, 40.  
  *Why:* C-SCAN returns to the start without servicing on the return.
- Distances: 40 + 90 + 30 = 160.

*Reflection:* Total movement increased versus SCAN, yet every request waited for at most one full sweep.

**Example 4 — LOOK versus SCAN under sparse load**
- *Given:* head at 50, requests {95, 5}
- SCAN travels to 100 then back: 50 + 95 + 100 = 245.  
  *Why:* it continues to the physical end.
- LOOK stops at 95 then reverses to 5: 45 + 90 = 135.  
  *Why:* reversal occurs at the last pending request.
- **135**

*Reflection:* LOOK eliminates useless travel beyond the outermost request.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Assuming SCAN always travels to cylinder 0 | Confusing SCAN with its textbook illustration | Check whether the algorithm is SCAN or LOOK          |
| Forgetting that C-SCAN returns without servicing | Visualising the return leg as useful work   | Draw the head path explicitly on every example       |
| Treating arrival time as irrelevant | All examples given at time zero             | Record timestamps; FCFS order is defined by arrival  |
| Using Euclidean distance instead of cylinder difference | Intuitive geometry habit                    | Always compute \( |c_i - c_j| \)                       |
| Reversing direction too early     | Stopping at the first rather than farthest request | Maintain a “pending in current direction” set        |
| Ignoring maximum cylinder value   | Modern disks hide geometry                  | Keep an explicit MAX_CYL variable in pseudocode      |
| Believing C-SCAN is always optimal | Ignoring variance versus mean trade-off     | Report both total movement and standard deviation of waiting times |

## 7. The textbook-precise statement
Let \( C = \{0,1,\dots,M\} \) be the cylinder address space, \( h(t) \in C \) the head position at time \( t \), and \( Q(t) \) the set of pending requests each labelled by cylinder \( c_i \). A disk schedule is a total order on the servicing events. FCFS produces the order of arrival timestamps. SCAN produces the unique order that is monotonic between reversals at the extremes of \( C \). C-SCAN produces the order obtained by always selecting the minimal positive \( (c_i - h) \bmod (M+1) \). LOOK replaces the reversal boundary \( M \) by \( \max\{c_i \in Q(t)\} \). (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §11.2.)

## 8. Visual — diagram or schematic
```text
Cylinder: 0 ------------------50------------------100
FCFS path:      50→10        10→90        90→40
               (40)          (80)          (50)

SCAN path:      50→90        90→40        40→10
               (40)          (50)          (30)   [one reversal]

C-SCAN path:    50→90   jump→0   0→10        10→40
               (40)     (90)     (10)         (30)  [return idle]
```

## 9. The memory technique
1. **The hook** — picture an elevator (SCAN) that sometimes returns empty to the ground floor (C-SCAN) or stops at the highest passenger (LOOK).
2. **What to overlearn** — seek cost = sum of absolute cylinder differences; C-SCAN always services requests in one direction only.
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — rebuild from the definition of head movement cost and the single-reversal constraint.

## 10. What this unlocks
Mastery of these four policies supplies the vocabulary and cost model required for modern I/O schedulers (BFQ, mq-deadline) and for analysing flash translation layers that emulate disk geometry.

- Multiprocessor disk scheduling and anticipatory scheduling
- Real-time disk I/O with deadlines (EDF-DS)
- Storage QoS and fair-share schedulers (mClock, IOFlow)
- Analysis of shingled magnetic recording (SMR) and zoned namespaces

## 11. Self-check — five questions, no answers
1. A request arrives for cylinder 200 while the head is at 50 travelling upward under SCAN; what is the next cylinder serviced after the current sweep finishes?
2. Under C-SCAN with MAX=999, head at 10, and requests at 5 and 990, compute both total movement and the waiting time (in cylinders traversed) for the request at 5.
3. Prove that LOOK never produces more total movement than SCAN on any finite request set.
4. Identify the schedule that minimises variance of per-request waiting time when requests are uniformly distributed; justify in two sentences.
5. Given arrival times t=0:50, t=1:10, t=2:90, which algorithm can produce a different service order solely because of the one-unit arrival gap?