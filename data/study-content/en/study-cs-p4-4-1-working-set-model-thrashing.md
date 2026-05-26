## 1. The one-sentence answer
**The working-set model quantifies a process’s locality of reference over a sliding time window so that an operating system can keep exactly those pages resident; thrashing occurs when the sum of all working-set sizes exceeds physical memory, driving page-fault rates so high that useful CPU progress collapses.**

A program does not touch every page of its address space uniformly. Instead, at any moment it concentrates references inside a small, slowly changing cluster of pages—the working set. The operating-system page-replacement policy therefore measures that cluster and refuses to run a process whose working set will not fit.

When the scheduler admits one more process than the remaining frames can accommodate, every process begins to fault on pages that were just evicted for another process. The CPU utilization curve bends sharply downward; the system is said to be thrashing.

> [!NOTE]
> The decisive insight is that thrashing is not merely “too many page faults”; it is a global feedback loop in which the working sets of runnable processes can no longer be satisfied simultaneously.

## 2. Why this matters — concrete and current
In Google’s Borg and Kubernetes schedulers, the working-set size reported by the Linux PSI (Pressure Stall Information) interface directly determines whether a new container is placed on a node; exceeding the node’s memory budget triggers immediate throttling rather than silent thrashing.

Modern database engines such as PostgreSQL’s buffer manager and Oracle’s DBWR process maintain explicit working-set estimates; when the sum of these estimates approaches the size of the System Global Area, the engine voluntarily reduces its multiprogramming level to avoid the classic thrashing knee documented in TPC-C traces.

Apple’s Rosetta 2 translator on ARM Macs uses a dynamic working-set tracker for x86-to-ARM code pages; when the tracker detects that translated fragments plus guest working sets exceed the 16 GB unified memory budget, it forces context switches to the Rosetta daemon, preventing the entire system from entering page-fault livelock.

Semiconductor design tools from Synopsys and Cadence simulate billions of memory references while placing millions of standard cells. Their internal paging model is an industrial implementation of Denning’s working-set window; thrashing inside these simulators is the dominant reason place-and-route runs are aborted on machines with insufficient RAM.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Demand paging & page fault | The working-set model predicts which pages must be present to avoid faults.          |
| Locality of reference    | Temporal and spatial locality are the empirical phenomena that make a small working set possible. |
| Multiprogramming degree  | Thrashing appears only when the scheduler admits more processes than the memory can hold simultaneously. |
| Page-replacement policy  | LRU or approximations are evaluated against the working-set window size Δ.           |

## 4. Building the idea — from intuition to formalism

### Step 1 — A process touches only a small, slowly moving cluster of pages
At any instant a running program references a modest subset of its virtual pages. Over a short interval those pages remain largely the same.

Example: a matrix-multiplication loop touches only the current row, column, and output tile—roughly 3–4 pages out of a 10 000-page address space.

Formally, let \(W(t,\Delta)\) be the set of distinct pages referenced in the virtual-time interval \((t-\Delta,t]\).

> [!WARNING]
> Treating the entire address space as the working set destroys the model’s predictive power; the window \(\Delta\) must be chosen to match the program’s natural phase length.

### Step 2 — The working-set size is the cardinality of that set
The memory demand of the process at time \(t\) is simply \(|W(t,\Delta)|\).

Example: if pages {7, 12, 19, 19, 7} appear inside the window, \(|W|=3\).

Mathematically,
\[
w(t,\Delta) = |W(t,\Delta)| \qquad (1)
\]

> [!WARNING]
> Confusing virtual time with wall-clock time produces wildly oscillating size estimates when the process is descheduled.

### Step 3 — The operating system keeps a process only when enough free frames exist for its working set
Before dispatching a process, the kernel compares \(w(t,\Delta)\) against the current number of free frames.

### Step 4 — The sum of working sets across all runnable processes defines the memory pressure
Let \(P\) be the set of processes admitted by the scheduler. System-wide demand is
\[
D(t) = \sum_{p\in P} w_p(t,\Delta).
\]

### Step 5 — When \(D(t)\) exceeds the number of physical frames \(M\), thrashing begins
Every page brought in evicts a page still inside some other process’s working set, guaranteeing another fault almost immediately. CPU utilization \(\rho\) therefore falls as
\[
\rho \approx \frac{M}{D(t)} \quad \text{when } D(t) > M.
\]

### Step 6 — The textbook statement of the working-set policy
A process may be resident only if \(w(t,\Delta) \le\) free frames; otherwise it is suspended until memory can be reclaimed. This is Denning’s working-set policy (1968).

## 5. Worked examples — every step shown

**Example 1 — Single-process working-set size**
*Given:* Reference string over window \(\Delta=4\): 2, 3, 2, 1, 5.  
*Find:* \(w(t,\Delta)\).  
Step 1: collect distinct pages inside the window → {1,2,3,5}.  
*Why:* cardinality counts each page once regardless of repeats.  
Step 2: size = 4.  
**Answer: 4**

*Reflection:* The example is trivial; its value lies in showing that repeated references inside the window do not increase size.

**Example 2 — Two-process memory pressure**
*Given:* Process A has \(w_A=5\), Process B has \(w_B=7\), \(M=10\) frames.  
*Find:* Does thrashing occur?  
Step 1: compute total demand \(D=5+7=12\).  
*Why:* thrashing criterion is \(D>M\).  
Step 2: 12 > 10, therefore thrashing.  
**Answer: yes**

*Reflection:* The arithmetic is elementary, yet students often forget to sum working sets across processes.

**Example 3 — Window-size sensitivity**
*Given:* Reference string 1 2 3 4 1 2 3 4 … with \(\Delta=3\) versus \(\Delta=5\).  
*Find:* working-set size in each case.  
Step 1 (\(\Delta=3\)): last three references contain three distinct pages.  
Step 2 (\(\Delta=5\)): last five references contain four distinct pages.  
**Answer: 3 versus 4**

*Reflection:* Too small a \(\Delta\) underestimates future needs; too large overestimates and wastes frames.

**Example 4 — Suspension decision**
*Given:* Free frames = 6, three processes with working sets 3, 4, 2.  
*Find:* Which process must be suspended?  
Step 1: total demand = 9 > 6.  
Step 2: suspend the largest (size 4); remaining demand = 5 ≤ 6.  
**Answer: suspend the process whose working set is 4**

*Reflection:* The policy is not “suspend any process” but “suspend until aggregate demand fits.”

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Setting \(\Delta\) to wall-clock time | I/O or scheduling delays distort the reference window | Always measure \(\Delta\) in virtual time (process CPU ticks) |
| Assuming working set is static | Program phases change; a single window misses phase transitions | Recompute \(W(t,\Delta)\) at every context switch or timer tick |
| Using resident-set size instead of working-set size | RSS includes pages no longer referenced | Track only pages referenced inside the current window |
| Ignoring shared libraries and mmap regions | Shared pages are counted multiple times in naïve summation | Maintain a global reference-counted working-set table |
| Believing “more frames always help” | Once \(D>M\), extra frames are immediately stolen by faulting processes | Implement admission control, not just larger page cache |
| Choosing LRU stack distance as proxy without validation | Stack distance approximates but does not equal \(|W(t,\Delta)|\) | Cross-check against explicit working-set measurement on real traces |
| Forgetting that I/O-bound processes have tiny working sets | Their low CPU share makes them appear harmless | Still include them in \(D(t)\) when they are runnable |

## 7. The textbook-precise statement
Let \(W_p(t,\Delta)\) be the set of pages referenced by process \(p\) during the virtual-time interval \((t-\Delta,t]\). The working-set size is \(w_p(t,\Delta)=|W_p(t,\Delta)|\). Under the working-set policy a process \(p\) is eligible for execution only when at least \(w_p(t,\Delta)\) frames are free. The system is thrashing when
\[
\sum_p w_p(t,\Delta) > M,
\]
where \(M\) is the total number of physical frames. (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §10.6.)

## 8. Visual — diagram or schematic
```text
Time (virtual) ─────────────────────────────────────────────▶
Process A refs:  2  3  2  1  5  6  5  6  7
Window Δ=4          └──┘  └──┘  └──┘  └──┘
Working set A       {2,3} {1,2,3} {1,5,6} {5,6,7}   sizes: 2,3,3,3
Process B refs:  9  8  9 10 11 10 11 12
Window Δ=4          └──┘  └──┘  └──┘  └──┘
Working set B       {8,9} {9,10} {10,11} {10,11,12} sizes: 2,2,2,3

Total demand D(t)   4     5      5      6
Frames M=5          ▲ thrashing starts here (D> M)
```

## 9. The memory technique

**The hook**  
Picture a spotlight of width \(\Delta\) sweeping across a program’s reference tape; only the pages illuminated at any instant need to be in RAM.

**What to overlearn**  
1. \(w(t,\Delta)=|W(t,\Delta)|\)  
2. Thrashing threshold: \(\sum w_p > M\)  
3. Virtual time, not wall time, defines the window.

**Spaced-repetition schedule**  
Review definitions after 1 day, recompute a worked example after 3 days, implement a tiny simulator after 7 days, explain the policy to someone else after 16 days, and re-derive the thrashing inequality after 35 days.

**First-principles fallback**  
Start from the empirical observation of locality → define the reference window → count distinct pages → compare aggregate count against physical memory.

## 10. What this unlocks
Mastery of the working-set model supplies the quantitative basis for all subsequent memory-management policies that separate “must be resident” from “can be reclaimed.”

- Page-fault-frequency (PFF) replacement  
- Clock and WSClock algorithms  
- Memory-pressure-driven container schedulers (cgroups v2)  
- Phase-change detection in dynamic binary translators  
- NUMA page-migration heuristics that treat each node’s local memory as an independent frame pool

## 11. Self-check — five questions, no answers
1. A reference string of length 1000 yields working-set sizes that fluctuate between 12 and 87 pages when \(\Delta=50\). What happens to the measured size if \(\Delta\) is doubled?

2. Three processes have working-set sizes 40, 30 and 25. Physical memory holds 80 frames. Which single action restores a non-thrashing state with minimal impact on throughput?

3. Why does measuring the working set in wall-clock time produce unstable estimates for an I/O-bound process?

4. In a system using the working-set policy, a new process whose working set is exactly equal to the current free-frame count is admitted. One page fault immediately occurs. Did the policy fail?

5. Derive the approximate CPU utilization \(\rho\) once \(\sum w_p(t,\Delta)\) exceeds \(M\) by 50 %.