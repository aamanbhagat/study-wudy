## 1. The one-sentence answer
**Scheduling on multiprocessors with load balancing and affinity means assigning ready threads to available cores so that total work is distributed evenly while threads remain on the same core long enough to retain cache state.**

When a single processor runs many threads, the scheduler simply decides which thread runs next. With multiple processors the decision expands: each thread must be placed on some core, and the placement must keep every core busy without letting any core sit idle while others overflow. The simplest intuition is a kitchen with several cooks. If one cook has ten tasks and another has none, the meal finishes late; moving a task to the idle cook helps, yet constantly swapping tasks between cooks destroys the benefit of each cook remembering where the ingredients are. Load balancing therefore measures instantaneous or recent load on each core and migrates threads when imbalance exceeds a threshold. Processor affinity counters migration by recording the last core a thread ran on and preferring that core unless the imbalance cost clearly exceeds the cache-reload cost.

The tension between the two goals is fundamental. Perfect balance may require frequent migrations that flush caches; perfect affinity may leave some cores idle while others queue work. Modern kernels therefore combine a lightweight per-core run queue with periodic or event-driven rebalancing that respects affinity hints supplied by the programmer or inferred from thread history.

> [!NOTE]
> The decisive insight is that cache warmth is a first-class resource: moving a thread can cost more cycles than the imbalance it corrects, so the scheduler must treat migration as an explicit cost rather than a free operation.

## 2. Why this matters — concrete and current
In Google’s Borg and its successor Kubernetes, the scheduler places containers across thousands of cores while tracking both instantaneous CPU utilization and NUMA-node locality; a container that repeatedly misses L3 cache can increase tail latency by tens of milliseconds on web-search workloads.

Aircraft flight-control software certified to DO-178C runs on multicore processors under ARINC 653 partitioning; the scheduler must guarantee both strict temporal isolation and bounded migration so that cache-related jitter does not violate worst-case execution-time budgets measured on the target silicon.

NVIDIA’s CUDA runtime on Grace-Hopper systems uses thread affinity masks and work-stealing queues inside each streaming multiprocessor cluster; the driver migrates blocks only when measured occupancy imbalance exceeds a threshold derived from hardware performance counters, preserving register-file state that would otherwise be reloaded from device memory.

The Linux kernel’s CFS load balancer, invoked every 4 ms on each core and more aggressively on idle cores, uses the “runqueue weight” and “cache-hot” heuristics first described in the 2007–2010 CFS patches; these heuristics directly affect compilation farms at Intel and AMD where a single misplaced build thread can add minutes to a many-core make -jN job.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Thread vs. process       | Threads are the schedulable entities that can migrate; processes carry address spaces that make migration more expensive. |
| Cache hierarchy (L1/L2/L3) | Affinity exists only because reloading a working set from memory costs orders of magnitude more cycles than an L1 hit. |
| Run-queue data structure | Each core maintains its own queue; balancing algorithms read and modify these queues under lock or lock-free protocols. |
| Utilization vs. makespan | Load balancing minimizes the maximum completion time, not merely average utilization. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Single-core scheduling does not generalize
On one core the scheduler only orders threads; total work and finish time are independent of order if preemption is free. On multiple cores the assignment itself changes the finish time.

Example: two identical 10-unit threads and two cores. Placing both on core 0 yields finish time 20; placing one on each yields finish time 10.

Formal statement: given \(n\) threads with execution times \(e_i\) and \(m\) identical cores, an assignment \(\pi: \{1\dots n\}\to\{1\dots m\}\) produces makespan \(\max_j\sum_{i:\pi(i)=j}e_i\).

> [!WARNING]
> Treating cores as interchangeable without measuring migration cost leads to schedules that look balanced on paper yet run slower than a deliberately unbalanced schedule that preserves cache state.

### Step 2 — Load metric
Instantaneous load on core \(j\) is the sum of remaining execution times of threads currently assigned to it, or, more practically, the recent CPU utilization sampled over a sliding window.

Formal load vector: \(\mathbf{L}(t) = (L_1(t),\dots,L_m(t))\) where \(L_j(t)=\sum_{i\in Q_j(t)}e_i\) and \(Q_j(t)\) is the run queue at time \(t\).

### Step 3 — Migration decision
A migration from core \(a\) to core \(b\) is triggered when \(L_a-L_b>\Delta\), where threshold \(\Delta\) incorporates both imbalance and estimated cache-reload penalty.

### Step 4 — Affinity as a cost modifier
Each thread \(i\) carries an affinity mask or a preferred core \(p_i\). The effective cost of assigning \(i\) to core \(j\) becomes \(c_{ij}=e_i+M_{ij}\), where migration penalty \(M_{ij}=0\) if \(j=p_i\) and \(M_{ij}>0\) otherwise.

### Step 5 — Work stealing versus work pushing
Idle cores may steal from the busiest core (pull model) or busy cores may push excess work (push model). Both preserve the invariant that after a successful transfer the new load difference is smaller than before.

### Step 6 — Textbook formulation
The multiprocessor scheduling problem with affinity is to find an assignment minimizing makespan subject to a bounded number of migrations, or equivalently minimizing a linear combination \(\alpha\cdot\text{makespan}+\beta\cdot\text{total migration cost}\).

## 5. Worked examples — every step shown

**Example 1 — Two cores, two threads, perfect balance**
*Given:* Core 0 and Core 1 both empty; Thread A (5 ms) and Thread B (5 ms) arrive.
*Find:* Optimal assignment respecting affinity (none set).
- Place A on Core 0: load vector becomes (5,0). *Why:* first thread can go anywhere.
- Place B on Core 1: load vector becomes (5,5). *Why:* equal loads minimize makespan.
**Final assignment: A→Core 0, B→Core 1. Makespan = 5 ms.**

*Reflection:* No migration cost exists yet; the example isolates the pure balancing objective.

**Example 2 — Three threads, two cores, one migration**
*Given:* Core 0 already runs Thread X (remaining 12 ms); Threads Y (4 ms) and Z (4 ms) become ready.
*Find:* Assignment after one balancing step.
- Compute loads: Core 0 = 12, Core 1 = 0. *Why:* imbalance exceeds any reasonable threshold.
- Migrate Z to Core 1. *Why:* smallest migration that reduces max load.
**Final loads: (8,4). Makespan = 8 ms.**

*Reflection:* Migration occurs only when the idle core can finish useful work before the original core would have.

**Example 3 — Affinity penalty**
*Given:* Thread T previously ran on Core 0 and has a 2 MB working set; migration cost estimated at 3 ms. Two cores, loads (10,1).
*Find:* Whether to migrate T.
- Cost of migration: 3 ms extra + new load (7,4). *Why:* effective execution time of T becomes 7 ms on Core 1.
- Cost of no migration: makespan remains 10 ms. *Why:* Core 0 still finishes at 10.
- Net: migration reduces makespan by 3 ms but adds 3 ms penalty → indifferent.
**Decision:** scheduler keeps T on Core 0.

*Reflection:* The numeric comparison of migration cost against makespan reduction is the exact point where affinity becomes visible in the algorithm.

**Example 4 — Work stealing on four cores**
*Given:* Loads (9,8,1,0). Steal threshold = 2.
*Find:* Sequence of steals.
- Core 3 steals one 4-unit thread from Core 0 → loads (5,8,1,4). *Why:* 9-5 = 4 > 2.
- Core 2 steals a 3-unit thread from Core 1 → loads (5,5,4,4). *Why:* 8-5 = 3 > 2.
**Final loads: (5,5,4,4). Makespan = 5.**

*Reflection:* Each steal is a local decision; global optimality is not guaranteed but imbalance is bounded.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Ignoring cache-hot flag | Load balancer sees only queue length and migrates a recently scheduled thread | Read the “cache-hot” timestamp before any migration decision |
| Using instantaneous load only | Bursts produce false imbalance that disappears in the next quantum | Apply exponential smoothing over at least two scheduling intervals |
| Assuming cores are identical on NUMA | Remote memory latency dwarfs migration cost | Include NUMA distance matrix when computing effective migration penalty |
| Over-aggressive work stealing | Every idle core steals simultaneously, causing thundering-herd cache flushes | Serialize steals with a global “last-balance” timestamp or per-node lock |
| Forgetting affinity masks set by user | pthread_setaffinity_np or taskset are ignored by the balancer | Always intersect the computed target set with the thread’s affinity mask |
| Measuring only CPU utilization | Memory-bound threads appear lightly loaded yet destroy shared cache | Incorporate stall-cycle or memory-bandwidth counters into the load metric |
| Static partitioning without rebalancing | Early assignment never revisited; later load changes are invisible | Periodically re-evaluate even on “pinned” partitions at a longer time scale |

## 7. The textbook-precise statement
A multiprocessor scheduler maintains a load vector \(\mathbf{L}(t)\in\mathbb{R}^m_+\) and an affinity relation \(p:\{1,\dots,n\}\to\{1,\dots,m\}\). At each rebalancing epoch it solves
\[
\min_{\pi}\ \max_j\sum_{i:\pi(i)=j}w_i + \sum_i M_{i,\pi(i)}
\]
subject to \(\pi(i)\in\text{affinity mask of }i\), where \(M_{i,j}=0\) if \(j=p(i)\) and \(M_{i,j}=c>0\) otherwise. (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §6.5; Arpaci-Dusseau & Arpaci-Dusseau, *Operating Systems: Three Easy Pieces*, Ch. 10.)

## 8. Visual — diagram or schematic
```text
Core 0          Core 1          Core 2          Core 3
[ T1 8ms ]      [ T2 7ms ]      [ T3 2ms ]      [ idle ]
      |               |               |              |
      +---------------+---------------+--------------+
                           |
                    Load balancer
                    (pull from busiest)
                           |
                    Steal T3 → Core 3
Resulting loads: 8, 7, 0, 2
```

## 9. The memory technique

1. **The hook** — Picture four cooks sharing one cutting board; the board stays warm only while the same cook keeps using it. Moving a half-chopped onion to another cook costs extra time that may exceed the benefit of evening the workload.

2. **What to overlearn** — (a) Migration cost \(M\) is added to execution time, never ignored. (b) Rebalancing threshold \(\Delta\) must exceed \(M\). (c) Affinity mask is an intersection constraint, not a hint.

3. **Spaced-repetition schedule** — Review the load-vector definition after 1 day, the migration-cost equation after 3 days, a full worked example after 7 days, and the textbook statement after 16 and 35 days.

4. **First-principles fallback** — Start from the single-core makespan, add a second core, compute the new minimum makespan, then insert a non-zero cost for any thread that changes cores; repeat until the incremental gain no longer exceeds the migration cost.

## 10. What this unlocks
Mastery of multiprocessor load balancing with affinity lets you reason about thread placement in every subsequent layer of systems software: user-level task schedulers (TBB, OpenMP), container orchestrators, real-time partitioned systems, and GPU block schedulers.

- NUMA-aware memory allocation
- Gang scheduling for parallel applications
- Cache-partitioning and isolation mechanisms
- Energy-aware scheduling that treats idle cores as a first-class power state
- Formal multiprocessor response-time analysis (e.g., for fixed-priority tasks)

## 11. Self-check — five questions, no answers
1. Two cores hold loads 12 and 3. A 4-unit thread on the first core has a measured migration penalty of 2 units. Should the balancer move it?

2. Derive the steady-state load difference after one work-stealing step when the steal threshold is set to twice the migration cost.

3. A thread’s affinity mask restricts it to cores {0,2}. The current loads are (9,1,8). Which core should receive the thread if migration cost is uniform?

4. Explain why measuring only runnable-queue length can produce worse makespan than measuring remaining execution time on a workload of short and long threads.

5. On a 4-core NUMA node pair, remote access costs 3× local access. How would you adjust the migration penalty matrix?