## 1. The one-sentence answer
**The working set model predicts the minimum number of frames a process needs to avoid thrashing by tracking its recently referenced pages, while thrashing occurs when the sum of all working sets exceeds available physical memory and the system spends most of its time paging.**

The working set of a process at time t is the set of distinct pages referenced in the interval [t−Δ, t]. Δ is called the working-set window. When the operating system allocates fewer frames than the size of this set, the process immediately faults on pages that have just left the window, causing heavy paging activity. If many processes are in this state simultaneously, CPU utilization collapses because the disk becomes the bottleneck.

Thrashing is therefore not merely “too many page faults”; it is a global feedback loop in which each process’s page-fault rate rises sharply once its allocation drops below its working-set size, forcing the system to steal frames from other processes and thereby pushing them below their own working-set sizes.

> [!NOTE]
> The single most important insight is that thrashing is a system-wide phenomenon caused by the sum of working-set sizes exceeding the total number of frames; fixing any single process in isolation cannot solve it.

## 2. Why this matters — concrete and current
In Google’s Borg and Kubernetes clusters, the working-set size of each container is continuously sampled by the kernel’s PSI (Pressure Stall Information) metrics; when the sum of working sets approaches node DRAM, the scheduler stops admitting new pods rather than letting the node thrash.

Modern database engines such as RocksDB and WiredTiger use an internal working-set estimator (based on the same Δ-window idea) to decide how many resident pages to keep in the block cache; if the estimate exceeds available RAM they proactively flush dirty pages instead of letting the OS thrash.

In Apple’s M-series SoCs the unified memory controller implements a hardware working-set tracker; when the aggregate working sets of GPU and CPU processes exceed DRAM, the controller raises a “memory pressure” interrupt that triggers aggressive compression and swapping before thrashing begins.

Semiconductor fabs run cycle-accurate DRAM simulators (e.g., Ramulator 2.0) that model Denning’s working-set window to decide row-buffer policies; a mis-estimated working set can cause >30 % loss in effective bandwidth.

NASA’s Perseverance rover flight software uses a static working-set analysis at link time so that the 256 MiB RAD750 never enters thrashing during critical entry-descent-landing phases.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Demand paging            | Explains why a page fault occurs only on first reference inside the window |
| Page replacement policy  | LRU or approximations are required to keep the working set resident |
| Multiprogramming degree  | Determines how many processes compete for the fixed frame pool |
| Locality of reference    | The empirical reason that working sets are small relative to virtual address space |

If any of these four concepts are unfamiliar, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Define the working-set window
A process references pages over time. Instead of remembering every page it ever touched, we only look at references inside a sliding window of length Δ.  
Concrete example: suppose Δ = 10 000 memory references and the last 10 000 references touched pages {2, 5, 7, 2, 9}. The working set W(t, Δ) = {2, 5, 7, 9} and |W(t, Δ)| = 4.  
Formally:  
$$W(t,\Delta)=\{p\mid p\text{ was referenced in }[t-\Delta,t]\}.$$  
> [!WARNING]  
> Choosing Δ too small makes the model miss pages that will be referenced again soon; choosing Δ too large makes the model allocate frames for pages the process will never use again.

### Step 2 — Working-set size as a function of time
|W(t, Δ)| changes only at page-reference instants. Plotting it yields a step function whose height is the instantaneous memory demand.  
Example: at t = 12 000 the window slides past page 2’s last reference, so |W| drops from 4 to 3.  
Formal statement:  
$$D(t)=\lvert W(t,\Delta)\rvert.$$

### Step 3 — System-wide working-set sum
Let there be n processes. The total demand is  
$$\text{TotalDemand}(t)=\sum_{i=1}^n D_i(t).$$  
When TotalDemand(t) > m (m = total frames), at least one process must be given fewer frames than its working-set size.

### Step 4 — Onset of thrashing
A process whose allocation a_i < D_i(t) will fault on every page that leaves the window and is referenced again. The page-fault rate therefore rises sharply.  
Formal threshold: thrashing begins when  
$$\sum_{i=1}^n a_i < \sum_{i=1}^n D_i(t).$$

### Step 5 — Feedback loop that sustains thrashing
Each page fault requires a disk I/O. While the faulting process waits, the scheduler may give its frames to another process, further reducing a_i for the first process and increasing its fault rate. CPU utilization therefore falls.

### Step 6 — Textbook-grade statement
A system is thrashing if and only if the multiprogramming degree is such that the sum of the working-set sizes of all resident processes exceeds the number of physical frames, causing a sustained collapse in CPU utilization. (Silberschatz, Galvin, Gagne, Operating System Concepts, 10e, §10.6.2)

## 5. Worked examples — har step show karo

**Example 1 — Single-process working-set calculation**  
*Given:* Reference string 1 2 3 2 1 4 2 3 1, Δ = 5.  
*Find:* W(t, Δ) at t = 9.  
Step 1: window covers references 5–9 → 1,4,2,3,1.  
Step 2: distinct pages = {1,2,3,4}.  
*Why:* we discard everything before position 5 because it lies outside Δ.  
**{1,2,3,4}**

*Reflection:* the example is simple yet shows that repeated references inside the window do not increase size.

**Example 2 — Two-process thrashing threshold**  
*Given:* Process A: D_A = 6, Process B: D_B = 7, m = 11 frames.  
*Find:* Does thrashing occur?  
Step 1: sum D = 13 > 11.  
Step 2: at least one process must receive ≤5 frames.  
Step 3: that process will fault on every page leaving its window.  
**Yes, thrashing occurs.**

*Reflection:* the arithmetic is trivial, but the global implication is the key insight.

**Example 3 — Effect of changing Δ**  
*Given:* same string as Example 1, now Δ = 3.  
Window at t = 9 covers references 7–9 → 2,3,1 → size 3.  
**Size drops from 4 to 3.**  
*Why:* smaller window forgets page 4.  
*Reflection:* shows why Δ must be chosen with knowledge of the process’s locality.

**Example 4 — Working-set based frame allocation**  
*Given:* three processes with D = {5,8,6}, m = 16.  
Step 1: sum = 19 > 16 → shortfall of 3.  
Step 2: OS suspends the process with largest D (size 8) and reclaims its frames.  
Step 3: remaining two processes now have 5 + 6 = 11 ≤ 16.  
**Thrashing avoided by suspension.**  
*Reflection:* suspension is the practical policy when working-set sum exceeds memory.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating Δ as a fixed constant    | Students copy a textbook value without measuring locality | Profile the process’s page-reference histogram and set Δ at the knee of the working-set curve |
| Confusing working set with resident set | Both are sets of pages; only one is time-windowed | Always ask “which references are inside Δ?” |
| Allocating exactly |W(t,Δ)| frames | Ignores that the window is sliding forward | Allocate |W| + 1 or 2 extra frames as safety margin |
| Ignoring I/O time in fault rate calculation | Fault rate formula looks only at CPU references | Include disk service time when computing effective CPU utilization |
| Using per-process page-fault rate alone to detect thrashing | A single process may have high faults for other reasons | Measure system-wide CPU utilization and paging device queue length together |
| Choosing Δ larger than the entire trace | Model degenerates to the entire address space | Cap Δ at the process’s typical phase length |
| Forgetting that working sets are dynamic | Allocation decision taken once at load time | Re-evaluate working sets every few seconds or on every context switch |

## 7. The textbook-precise statement
Let Δ be a positive integer denoting the working-set window size in memory references. For each process P_i define  
$$W_i(t,\Delta)=\{p\mid \text{page }p\text{ of }P_i\text{ was referenced in the interval }[t-\Delta,t]\}.$$  
Let m be the total number of physical frames. The system is said to be thrashing at time t if  
$$\sum_i |W_i(t,\Delta)| > m$$  
and the resulting page-fault frequency causes the CPU utilization to fall below a predefined threshold (typically 10–20 %). (Silberschatz et al., Operating System Concepts, 10e, §10.6)

## 8. Visual — diagram or schematic
```
Time (references) ─────────────────────────────────────────────▶
Process A refs:  1 2 3 2 1 4 2 3 1 5 6 2 3 4 1
Window Δ=5:      └──────┘ └──────┘ └──────┘
Working-set size:  3       4       5
Total frames m=10
Sum of WS across processes ────────────────────▲─────── thrashing zone
```

The diagram shows three successive positions of a sliding window of length 5. When the height of the working-set size curve for all processes combined exceeds m, the system enters the thrashing region.

## 9. The memory technique

1. **The hook**  
   Imagine a small sliding window on a long tape of page numbers; whatever the window can “see” right now is the working set. If the window is bigger than the number of pigeonholes (frames), pigeons start fighting and the CPU starves.

2. **What to overlearn**  
   - Working-set definition: pages referenced inside [t−Δ, t]  
   - Thrashing condition: Σ |W_i| > m  
   - Practical Δ range for most workloads: 10 000–100 000 references

3. **Spaced-repetition schedule**  
   Review the definition after 1 day, the thrashing inequality after 3 days, a worked example after 7 days, and the full feedback-loop explanation after 16 and 35 days.

4. **First-principles fallback**  
   If you forget the formula, re-derive from locality: a process can only run without faults if all pages it will reference in the next Δ steps are already in memory; count those pages and compare with m.

## 10. What this unlocks
Understanding the working-set model lets you design page-replacement policies that approximate the working set (WSClock), build admission-control algorithms for containers, and tune the multiprogramming degree in real-time operating systems.

- Next topics: WSClock algorithm, page-fault frequency scheme, load-control policies, memory pressure in Linux PSI, container working-set estimation in Kubernetes.

## 11. Self-check — five questions, no answers
1. Given reference string 4 3 2 1 4 3 2 1 4 and Δ = 4, compute |W(t, Δ)| at the last reference.  
2. Three processes have working-set sizes 7, 9 and 5; how many frames are required to guarantee no thrashing?  
3. Why does simply increasing the paging device speed not eliminate thrashing?  
4. A system shows 90 % disk utilization and 5 % CPU utilization. Which single measured quantity would confirm thrashing rather than a slow disk?  
5. If you double Δ, does the probability of thrashing increase or decrease, and why?