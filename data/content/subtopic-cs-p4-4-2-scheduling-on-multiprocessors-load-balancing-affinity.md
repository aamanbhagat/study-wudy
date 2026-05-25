## What it is
Multiprocessor scheduling is the process by which an operating system assigns tasks (processes or threads) to the available CPU cores in a system with more than one processor. The scheduler's goal is to maximize system throughput and utilization by navigating the fundamental trade-off between **load balancing** (spreading work evenly to keep all cores busy) and **processor affinity** (keeping a task on the same core to leverage data already in its local cache).

## Why it matters
This is the core of high-performance computing. In physics, complex simulations like N-body gravitational problems or computational fluid dynamics for rocket engine design are broken into parallel tasks; inefficient scheduling means wasted compute time and slower results. In machine learning, training large models involves parallel gradient computations across multiple cores or GPUs, and balancing this load while respecting data locality is critical for reducing training time from weeks to days.

## When to study it
You must understand single-processor scheduling algorithms (like First-Come, First-Served; Shortest Job First; Round Robin) and the fundamentals of computer architecture, specifically the memory hierarchy. If you cannot explain *why* accessing L1 cache is orders of magnitude faster than accessing main memory (RAM), the entire concept of processor affinity will be meaningless. Review cache levels, cache hits/misses, and the principle of locality (temporal and spatial).

## How to study it (step by step)
1.  **Baseline (No Scheduling):** Imagine 4 cores and 8 tasks of equal length. The simplest approach is static assignment: tasks 0-1 to Core 0, 2-3 to Core 1, etc. What happens if tasks 0-1 finish much faster than the others? Draw this state. You've just discovered the need for dynamic scheduling.
2.  **Introduce Imbalance:** Now, consider a system with a single shared queue for all tasks. When a core becomes idle, it grabs the next task. This seems to solve load balancing. What new problem does it create? Think about where a task's data resides after running on Core 0 for a while. What happens when it's picked up by Core 2? This is the cache problem that motivates affinity.
3.  **Quantify the Cost:** Let $T_{exec}$ be the execution time of a task. Model it as $T_{exec} = T_{cpu} + T_{mem}$. A cache hit minimizes $T_{mem}$. A migration causes cache misses, increasing $T_{mem}$. Create a simple formula: let $C_m$ be the cost of migration (the time penalty for rebuilding the cache). Is it worth migrating a task from a busy core to an idle one if the remaining runtime is less than $C_m$?
4.  **Implement Strategies:** Code a toy simulation in Python. Create `Core` objects, each with a `run_queue`. Create `Task` objects with a `burst_time`. Implement two schedulers:
    *   One that uses a single global queue (high load balancing, zero affinity).
    *   One that gives each core a private queue and never migrates tasks (perfect affinity, poor load balancing).
    *   Run simulations with varying task lengths and measure total completion time (makespan).
5.  **Refine the Strategy:** Now, design a hybrid. Start with private queues (for affinity). Add a rule: if Core A's queue has $N$ tasks and Core B's queue is empty, Core A *pushes* one task to Core B. This is **push migration**. Alternatively, if Core B becomes idle, it can *pull* a task from Core A. This is **pull migration**. Discuss the pros and cons of each.

## Key ideas, with intuition
1.  **The Core Conflict: Spreading vs. Sticking.** This is the central tension. Load balancing wants to spread tasks out to prevent idle cores, like a supermarket manager opening a new checkout lane when queues get long. Processor affinity wants a task to stick to one core, because that core's cache has been "warmed up" with the task's data. Moving the task is like making a regular customer switch to a new cashier who doesn't know their usual order—it's slower at first.
2.  **Cache is Everything.** A process's working set (the data and instructions it uses frequently) is loaded into the fast caches (L1, L2) of the core it's running on. A cache hit is a fast memory access. When a process migrates to a new core, that core's caches are "cold"—they don't contain the process's data. The process suffers a series of cache misses, forcing slow lookups to main memory, until its working set is loaded into the new caches. This migration penalty is significant.
3.  **Symmetric Multiprocessing (SMP) is the Default Assumption.** Most modern OSes assume an SMP architecture, where all processors are peers and can run any task. This creates the scheduling problem. The alternative, Asymmetric Multiprocessing (AMP), designates a master processor to handle scheduling and I/O, while other processors just execute code. AMP simplifies scheduling but is less flexible and efficient.
4.  **Push vs. Pull Migration.** These are the two main load balancing mechanisms.
    *   **Push Migration:** A specific task periodically checks the load on all cores. If it finds an imbalance, it moves (pushes) tasks from overloaded cores to underloaded ones. This is proactive.
    *   **Pull Migration:** An idle core actively looks for work. It checks the run queues of other cores and pulls a waiting task. This is reactive. Many schedulers use a hybrid approach.

## Worked example
**Scenario:** A system has two cores, C0 and C1. Each has a private run queue. The cost of migrating a process and warming up the new cache is $C_m = 3$ time units.
Three tasks arrive at time $t=0$:
*   Task A: Burst time = 10
*   Task B: Burst time = 2
*   Task C: Burst time = 2

**Strategy 1: Strict Affinity (No Load Balancing)**
The scheduler assigns tasks to maintain affinity.
1.  $t=0$: C0 gets Task A. C1 gets Task B. Queues: `C0:[A]`, `C1:[B]`. Task C is waiting in a global queue `G:[C]`.
2.  $t=0$ to $t=2$: C0 runs A (8 left). C1 runs B (0 left). B finishes.
3.  $t=2$: C1 is idle. It pulls Task C. Queues: `C0:[A]`, `C1:[C]`.
4.  $t=2$ to $t=4$: C0 runs A (6 left). C1 runs C (0 left). C finishes.
5.  $t=4$: C1 is now idle. C0 continues to run A.
6.  $t=4$ to $t=10$: C0 runs A (0 left). A finishes.
**Result:** Total time (makespan) = 10 units. C1 was idle for $10 - (2+2) = 6$ units of time.

**Strategy 2: Aggressive Load Balancing (Ignoring Affinity)**
The scheduler's goal is to keep all cores busy. It will migrate tasks if it prevents a core from being idle.
1.  $t=0$: C0 gets Task A. C1 gets Task B. Queues: `C0:[A]`, `C1:[B]`. Task C waits.
2.  $t=0$ to $t=2$: C0 runs A (8 left). C1 runs B (0 left). B finishes.
3.  $t=2$: C1 is idle. The system sees C0 is busy with a long task (A), so it decides to balance the load. It migrates Task A to C1.
    *   **Migration Cost:** The migration takes 3 time units. During this time, Task A makes no progress.
4.  $t=2$ to $t=5$: Migration of A occurs. C0 is now idle. It takes Task C.
5.  $t=5$: A is now on C1, ready to run. C is on C0. Queues: `C0:[C]`, `C1:[A]`.
6.  $t=5$ to $t=7$: C0 runs C (0 left). C finishes. C1 runs A (6 left).
7.  $t=7$: C0 is idle. C1 continues running A.
8.  $t=7$ to $t=13$: C1 runs A (0 left). A finishes.
**Result:** Total time (makespan) = 13 units.

**Reflection:**
*   Step 1 (Assignment): In both cases, the initial assignment was the same.
*   Step 3 (Decision): This was the critical step. The strict affinity model prioritized keeping Task A's cache warm, accepting that C1 would be idle. The load balancing model prioritized keeping C1 busy, accepting the migration cost.
*   The Outcome: For this specific set of tasks, the migration cost ($3$ units) was greater than the benefit of parallel execution. The "smarter" load-balancing strategy performed worse. This illustrates that migration is not free and the decision to migrate must be cost-aware.

## Diagrams
An imbalanced state, where Core 0 has a long queue and Core 1 is idle.

```text
Before Load Balancing:

Core 0 Run Queue          Core 1 Run Queue
+---------+               +---------+
| Process |               |         |
|    D    |               | (IDLE)  |
+---------+               +---------+
| Process |
|    C    |
+---------+
| Process |
|    B    |
+---------+
| RUNNING |
| Process |
|    A    |
+---------+
```

After push migration, where the scheduler moves Process D from Core 0 to Core 1.

```text
After Push Migration:

Core 0 Run Queue          Core 1 Run Queue
+---------+               +---------+
|         |               | RUNNING |
|         |               | Process |
+---------+               |    D    |
| Process |               +---------+
|    C    |                     ^
+---------+                     |
| Process |                     |
|    B    |      -- migrate --> |
+---------+
| RUNNING |
| Process |
|    A    |
+---------+
```

## Memory technique — remember this forever
1.  **The "Sticky Waiter" Analogy:**
    Imagine a restaurant with two waiters (cores).
    *   **Affinity:** You're a regular customer. You prefer your usual waiter, "Corey," because he knows your drink order and allergies (a "warm cache"). Getting a new waiter means re-explaining everything (a "cache miss"), which is slow. This is **processor affinity**.
    *   **Load Balancing:** The restaurant gets a rush of customers. Your preferred waiter Corey is swamped with tables, while the other waiter, "Ida," has none. The manager moves one of Corey's tables to Ida to keep things moving and prevent customers from waiting too long. This is **load balancing**.
    The conflict is clear: moving the table makes the whole restaurant more efficient (better load balance), but it annoys that one customer who now has to deal with a new waiter (loses affinity).

2.  **Must Overlearn:**
    *   **Load Balancing Goal:** Maximize CPU utilization by distributing tasks evenly across all cores.
    *   **Processor Affinity Goal:** Maximize performance of a single task by keeping it on the same core to leverage its warm cache.
    *   **The Trade-off:** Migration for load balancing invalidates the cache, incurring a performance penalty. The scheduler must decide if the gain from parallelism outweighs the cost of the cache miss.

3.  **Spaced Repetition Schedule:** Review this material in 1 day, 3 days, 7 days, 16 days, and 35 days. Actively recall the Sticky Waiter analogy and the trade-off formula.

4.  **First Principles Pathway:** If you forget everything, rebuild from this:
    *   Goal: Minimize total time to complete a set of jobs.
    *   System: $M$ processors, $N$ tasks.
    *   Time for one task = $T_{cpu} + T_{memory}$.
    *   $T_{memory}$ is low when data is in local cache (a "hit"). $T_{memory}$ is high when data is in RAM (a "miss").
    *   Keeping a task on one core increases cache hits (affinity).
    *   Moving a task to an idle core reduces overall idle time (load balancing), but forces cache misses on the new core.
    *   Therefore, the optimal scheduler must balance the cost of cache misses against the cost of idle CPU time.

## Common mistakes
1.  **Thinking Load Balancing is Always Good:** Students often assume that an idle core should *always* be used. They forget to factor in the migration cost. For a very short task, the time to migrate it can be longer than the task's entire remaining execution time.
2.  **Ignoring NUMA Architectures:** On many modern servers (Non-Uniform Memory Access), each CPU is physically closer to some banks of RAM than others. Migrating a process to a different CPU might also mean its memory is now "far away," compounding the performance penalty. Affinity is even more critical in NUMA systems.
3.  **Confusing Soft and Hard Affinity:** Soft affinity is the OS's default behavior—it *tries* to keep processes on the same core but will move them to balance load. Hard affinity is a directive (e.g., from a programmer via an API call) that forces a process to stay on a specific set of cores, which the OS must obey.

## Self-check
1.  A web server process handles thousands of very short, independent requests. A scientific simulation process runs for hours, continuously accessing a large dataset that fits in L3 cache. Which of these two workloads benefits more from strong processor affinity, and why?
2.  You have a dual-core system. Core 0 has a queue of ten 100ms tasks. Core 1 has one 5ms task. The migration cost is 1ms. Does it make sense for a pull migration (Core 1 pulling from Core 0) to occur after Core 1 finishes its task? What about a push migration (a monitoring daemon forcing a task from Core 0 to Core 1)? Justify your reasoning for both cases.
3.  Design a load-balancing algorithm that uses a hybrid push/pull strategy. Define the specific numerical thresholds (e.g., queue length difference, CPU utilization percentage) that would trigger a push migration, and the conditions under which a core would initiate a pull. How would your algorithm avoid "thrashing," where tasks are migrated back and forth excessively?