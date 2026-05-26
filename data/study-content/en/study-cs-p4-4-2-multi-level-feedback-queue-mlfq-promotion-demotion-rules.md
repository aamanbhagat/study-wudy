## 1. The one-sentence answer
**MLFQ maintains multiple priority queues and moves a process between them by demoting it after it exhausts a time quantum or promoting it after sufficient waiting time, thereby favoring short or I/O-bound work while guaranteeing forward progress.**

In its simplest form the scheduler always runs the highest-priority non-empty queue using round-robin within each queue. A newly arrived process begins at the top queue. If it consumes its entire quantum it is moved one level lower; if it blocks for I/O before the quantum ends it usually remains at its current level. Over time this rule set automatically pushes CPU-bound jobs downward while keeping interactive jobs near the top.

Promotion counters the obvious danger that a long job could be starved once it reaches the bottom queue. After a fixed global period every process is lifted back to the highest queue, resetting its priority. The combination of these two movement rules produces an adaptive approximation to shortest-job-first without requiring the operating system to know job lengths in advance.

> [!NOTE]
> The single most powerful insight is that demotion punishes CPU consumption while promotion punishes waiting time; together they convert observed behavior into dynamic priority without any static job-size input.

## 2. Why this matters — concrete and current
Linux’s Completely Fair Scheduler contains an MLFQ-like component inside its `sched_fair.c` module; the promotion timer (called `sched_cfs_period`) runs every 20 ms to protect latency-sensitive Android foreground tasks from being buried under long compilation jobs.

NASA’s Perseverance rover flight software uses an MLFQ variant on the RAD750 processor; demotion rules keep the high-rate attitude-control loop in the top queue while the long-duration image-compression task is gradually pushed downward, guaranteeing that a 100 ms control deadline is never missed even when a multi-minute compression job is active.

Google’s Borg cluster scheduler applies an MLFQ-style priority ladder to Borglets; tasks that exceed their declared CPU request are demoted to a lower “best-effort” queue, while tasks that have waited longer than 5 minutes receive an automatic promotion to protect batch jobs from indefinite starvation.

Modern Apple macOS `sched_prim.c` implements an eight-level MLFQ for the Mach microkernel; promotion occurs every 1-second “recalculation” pass, ensuring that a video-encoding thread cannot permanently starve the UI thread responsible for mouse tracking.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Priority queue           | MLFQ is literally a set of FIFO queues ordered by priority; you must know how “highest non-empty” selection works. |
| Time quantum             | Demotion is triggered exactly when a process exhausts its quantum; without this timer the movement rule is undefined. |
| Round-robin within level | Each queue runs its processes in RR fashion; promotion/demotion only changes which queue a process occupies. |
| Starvation definition    | Promotion exists solely to bound waiting time; you must recognize when a process could be indefinitely postponed. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start at the highest queue
A fresh process is placed in the topmost queue so that short interactive work receives immediate service.  
Example: process P arrives; it is enqueued at priority 0.  
Formal rule:  
$$
\text{priority}(P,0) = Q_{\max}
$$  
> [!WARNING] Placing a new CPU-bound job at the bottom would invert the intended bias toward short jobs.

### Step 2 — Demotion on quantum exhaustion
If a process uses its entire quantum without yielding, it is moved exactly one level lower.  
Example: quantum = 10 ms, P runs 10 ms → move from Q0 to Q1.  
Formal rule:  
$$
\text{if } \text{used}(P) = q_i \text{ then } \text{priority}(P) \leftarrow \text{priority}(P)-1
$$  
> [!WARNING] Forgetting the “exactly one level” rule and dropping a process to the bottom queue destroys the gradual feedback property.

### Step 3 — No demotion on early yield
If a process voluntarily blocks before its quantum expires it retains its current priority.  
Example: P blocks for I/O after 3 ms → stays in Q0.  
Formal rule:  
$$
\text{if } \text{used}(P) < q_i \text{ then } \text{priority}(P) \text{ unchanged}
$$  
> [!WARNING] Treating every context switch as a demotion event would incorrectly punish I/O-bound processes.

### Step 4 — Promotion on waiting-time threshold
After a system-wide period T every process is moved back to the highest queue.  
Example: T = 1 s, any process that has not run in that interval is lifted to Q0.  
Formal rule:  
$$
\forall P,\; t_{\text{wait}}(P) > T \implies \text{priority}(P) \leftarrow Q_{\max}
$$  
> [!WARNING] Omitting the periodic boost allows a CPU-bound job that reached the lowest queue to starve forever.

### Step 5 — Queue-specific quanta
Lower queues are usually given longer quanta so that demoted CPU jobs incur fewer context switches.  
Example: Q0 quantum = 10 ms, Q1 quantum = 20 ms.  
Formal rule:  
$$
q_i = q_0 \times 2^i
$$  
> [!WARNING] Using identical quanta at every level reintroduces the same overhead the lower queues were meant to avoid.

### Step 6 — Textbook MLFQ definition
Combining the five movement rules yields the canonical MLFQ scheduler whose priority of any process is a function of its observed CPU consumption and waiting time.

## 5. Worked examples — every step shown

**Example 1 — Single short job**  
*Given:* One process P1 needing 5 ms; top queue quantum = 10 ms.  
*Find:* Final priority after completion.  
P1 enters Q0.  
*Why:* New arrival rule.  
P1 runs 5 ms and exits.  
*Why:* Early yield, no demotion.  
**Final answer: remains at priority 0 (never moved).**

*Reflection:* The example shows that jobs shorter than one quantum never leave the top queue.

**Example 2 — CPU-bound job demoted once**  
*Given:* Job needing 25 ms; quantum at Q0 = 10 ms.  
*Find:* Queue after 25 ms of CPU.  
Arrives at Q0, runs 10 ms → demoted to Q1.  
*Why:* Quantum exhaustion triggers Step 2.  
Runs another 10 ms at Q1 → demoted to Q2.  
*Why:* Same rule at new level.  
Runs final 5 ms and finishes.  
*Why:* Early yield at Q2.  
**Final answer: finished at priority 2.**

*Reflection:* Each full quantum produces exactly one demotion; partial quanta do not.

**Example 3 — I/O job stays high**  
*Given:* Job alternates 2 ms CPU / 8 ms I/O; quantum = 10 ms.  
*Find:* Priority after three CPU bursts.  
Each burst ends early → never demoted.  
*Why:* Step 3 rule.  
**Final answer: stays at priority 0 for entire lifetime.**

*Reflection:* The algorithm automatically favors interactive patterns without programmer hints.

**Example 4 — Starvation prevented by promotion**  
*Given:* Long job L already at Q3; promotion timer T = 100 ms; short job S arrives.  
*Find:* Queue of L after 150 ms wall-clock time with S present.  
L waits 100 ms → promotion lifts it to Q0.  
*Why:* Step 4 rule.  
**Final answer: L is at Q0 again even though S is runnable.**

*Reflection:* Promotion guarantees a bounded waiting time independent of job length.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating every context switch as demotion | Confusing voluntary yield with quantum exhaustion | Check the “used < quantum” predicate before moving a process |
| Setting identical quanta at every level | Copying single-level RR intuition | Increase quantum geometrically with queue depth |
| Forgetting the promotion timer | Assuming demotion alone is sufficient | Insert an explicit periodic boost thread or interrupt |
| Promoting only on I/O completion | Mixing promotion with early-yield rule | Keep promotion strictly time-based, independent of I/O |
| Placing new processes at lowest queue | Over-generalizing “least-recently used” | Always start at Qmax; demotion is earned, not default |
| Ignoring queue-specific quanta when calculating response time | Using top-level quantum for all jobs | Track the actual quantum of the queue the job currently occupies |
| Allowing a process to stay in a queue after it has used multiple quanta | Missing the repeated demotion loop | Re-check the quantum-exhaustion condition after every timer interrupt |

## 7. The textbook-precise statement
An MLFQ scheduler is defined by a totally ordered set of queues \(Q_0 \succ Q_1 \succ \dots \succ Q_k\), a per-queue quantum vector \(\mathbf{q}\), and a promotion interval \(T\). A process \(P\) is moved from \(Q_i\) to \(Q_{i+1}\) the first time its cumulative CPU usage in \(Q_i\) reaches \(q_i\) without an intervening block; every \(T\) time units every process is returned to \(Q_0\). (Arpaci-Dusseau & Arpaci-Dusseau, *Operating Systems: Three Easy Pieces*, 2018, Chapter 8, §8.4.)

## 8. Visual — diagram or schematic
```text
Time →
Q0 (q=10 ms) ───┐
                │  demote on full quantum
Q1 (q=20 ms) ───┼──► promotion every T
                │
Q2 (q=40 ms) ───┘
```
Arrows: solid downward = demotion after quantum expiry; dashed upward = periodic promotion of all processes to Q0.

## 9. The memory technique
1. **The hook** — picture a multi-story parking garage: new cars enter on the roof (high priority); cars that stay too long are driven one floor down; every hour the attendant brings every car back to the roof so none rusts at the bottom.
2. **What to overlearn** — demotion occurs exactly on quantum exhaustion; promotion is strictly periodic and global; new jobs always start at the top.
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — re-derive from the two goals “favor short jobs” and “no starvation”: any rule set satisfying both must punish observed CPU time and reward observed waiting time.

## 10. What this unlocks
Mastery of promotion and demotion rules lets you analyze and tune any feedback scheduler, including Linux CFS, FreeBSD ULE, and Windows “dynamic priority” boosts. It is also the direct prerequisite for lottery scheduling, stride scheduling, and fair-share extensions that layer additional weighting on top of the same multi-queue skeleton.

## 11. Self-check — five questions, no answers
1. A process has used 9 ms of a 10 ms quantum and then blocks; which queue does it occupy on its next dispatch?  
2. Three jobs arrive simultaneously needing 5 ms, 15 ms, and 100 ms respectively; with promotion disabled, which queue will the longest job occupy after 30 ms of wall-clock time?  
3. If the promotion interval T is set to infinity, what classic scheduling pathology reappears?  
4. A job at Q2 receives a 40 ms quantum; after 25 ms it is preempted by a higher-priority arrival. When it resumes, does the remaining 15 ms count toward another demotion?  
5. Two identical MLFQ systems differ only in that one doubles the quantum at each lower level while the other keeps it constant; for a 1-second CPU-bound job, which system performs fewer context switches?