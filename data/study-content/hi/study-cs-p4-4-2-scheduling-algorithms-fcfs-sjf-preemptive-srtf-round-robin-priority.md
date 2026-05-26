## 1. The one-sentence answer
**Scheduling algorithms decide the order in which ready processes receive CPU time so that the system meets goals such as low waiting time, fairness, or priority enforcement.**

CPU scheduling sits between the process lifecycle and the dispatcher. When multiple processes are in the ready queue, the scheduler must pick one according to a policy; the chosen policy directly controls metrics such as average turnaround time, average waiting time, CPU utilisation, and response time. Because real workloads mix CPU-bound and I/O-bound tasks that arrive at unpredictable moments, no single policy is optimal for every scenario; each algorithm trades one metric against another.

> [!NOTE]
> The deepest insight is that every scheduling decision is a bet on future behaviour: FCFS bets that arrival order already encodes importance, while SJF/SRTF bets that the shortest burst will finish soonest and therefore free the CPU for others.

## 2. Why this matters — concrete and current
Linux CFS (Completely Fair Scheduler) is a priority-based, weighted fair-queueing variant that replaced the earlier O(1) scheduler; it is used on every Android phone and every mainstream Linux server today.  
NASA’s Perseverance rover flight software uses a priority-preemptive scheduler so that the critical “heartbeat” task can interrupt long-running science-data compression when a hardware fault interrupt arrives.  
Google’s Borg and Kubernetes kube-scheduler implement priority classes and fair-share queues; a mis-tuned priority can starve an entire production job for minutes, costing real revenue.  
Modern Intel and AMD CPUs expose hardware threads (SMT); the OS scheduler must decide whether to place a high-priority thread on a sibling core or migrate it, directly affecting both throughput and tail latency in data-centre workloads.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Process state diagram      | Tells you when a process is in ready queue versus running |
| Arrival time & burst time  | The two numbers every algorithm uses for its decision     |
| Preemption                 | Distinguishes non-preemptive (FCFS, non-preemptive SJF) from preemptive (SRTF, Round Robin, Priority) |
| Turnaround & waiting time  | The quantitative metrics used to compare algorithms       |

If any row is unfamiliar, pause and review the process lifecycle section first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Ready queue and dispatcher
A process that is ready to run but not yet on the CPU waits in a queue. The dispatcher performs a context switch when the scheduler selects a new process.  
Example: three processes P1, P2, P3 become ready at time 0; the queue order determines who runs first.  
Formal statement: at any scheduling instant \( t \), the scheduler chooses \( p^* = \arg\min_{p \in \text{Ready}(t)} C(p) \), where \( C \) is the scheduling criterion.

> [!WARNING]
> If you forget that the ready queue can change between decision points, you will compute Gantt charts that never match reality.

### Step 2 — Non-preemptive versus preemptive
Non-preemptive algorithms let a process run until it blocks or finishes. Preemptive algorithms can interrupt a running process when a more “deserving” process appears.  
Example: FCFS is non-preemptive; SRTF is preemptive SJF.  
Formal statement: preemption occurs when a new arrival satisfies \( C(\text{new}) < C(\text{current}) \) at time \( t \).

### Step 3 — FCFS (First-Come, First-Served)
Processes are served in arrival order; the queue is a simple FIFO.  
Example: P1 arrives at 0 with burst 24, P2 at 1 with burst 3; P1 finishes at 24, P2 at 27.  
Formal: \( C(p) = \text{arrival}(p) \).

### Step 4 — SJF and its preemptive form SRTF
SJF chooses the process with the smallest burst time among those already arrived. SRTF re-evaluates at every arrival and can preempt the current process if a shorter one appears.  
Example: P1 (burst 6) running; P2 (burst 3) arrives; SRTF switches to P2.  
Formal: \( C(p) = \text{burst}(p) \) (static) or \( C(p) = \text{remaining}(p) \) (dynamic).

### Step 5 — Priority scheduling
Each process carries a priority value; the scheduler always picks the highest priority ready process. Preemptive priority can starve low-priority tasks.  
Formal: \( C(p) = -\text{priority}(p) \) (higher number = higher priority).

### Step 6 — Round Robin (RR)
RR gives each process a fixed time slice (quantum \( q \)). After \( q \) units the process is moved to the tail of the ready queue.  
Formal: time-slicing adds the constraint \( \text{run}(p) \le q \) before re-evaluation.

### Step 7 — Quantitative metrics
Average waiting time \( W_{\text{avg}} = \frac{1}{n}\sum (T_i - A_i - B_i) \), turnaround \( TA_{\text{avg}} = \frac{1}{n}\sum (C_i - A_i) \). All algorithms are compared by computing these on the same workload.

### Step 8 — Textbook-grade statement
A scheduling algorithm is a total function from the current ready set and the history of past decisions to the next process to dispatch, together with a preemption rule.

## 5. Worked examples — har step show karo

**Example 1 — FCFS baseline**  
*Given:* P1 (arrival 0, burst 5), P2 (arrival 1, burst 3), P3 (arrival 2, burst 1).  
*Find:* Gantt chart and average waiting time.  
Step 1: P1 runs from 0 to 5 (no preemption).  
Step 2: P2 runs from 5 to 8.  
Step 3: P3 runs from 8 to 9.  
Waiting times: P1 = 0, P2 = 4, P3 = 6.  
Average waiting time = **3.33**.  
*Reflection:* FCFS never switches, so any long job that arrives first inflates later jobs’ waits.

**Example 2 — Non-preemptive SJF**  
*Given:* Same processes.  
*Find:* Schedule and waiting times.  
Shortest burst among arrived processes is chosen at each decision point.  
P1 (5) runs first (only one present). At t = 5, P2 (3) and P3 (1) are ready; P3 chosen next.  
Waiting: P1 = 0, P2 = 6, P3 = 4. Average = **3.33** (same as FCFS on this data).  
*Reflection:* When arrivals are staggered, non-preemptive SJF can still produce long waits.

**Example 3 — SRTF (preemptive SJF)**  
*Given:* P1 (0, 8), P2 (1, 4), P3 (2, 1), P4 (3, 5).  
*Find:* Gantt chart.  
0–1: P1.  
1–2: P1 (still shortest remaining).  
2–3: P3 preempts (remaining 1 < P1’s 6).  
3–4: P2 (remaining 3).  
4–8: P2 finishes.  
8–13: P4.  
13–16: P1 finishes.  
Waiting times: P1 = 8, P2 = 3, P3 = 0, P4 = 5. Average = **4**.  
*Reflection:* Preemption lets short jobs “cut the line,” lowering average wait at the cost of extra context switches.

**Example 4 — Round Robin with quantum 2**  
*Given:* P1 (0, 5), P2 (1, 3), P3 (2, 1), q = 2.  
*Find:* Schedule and waiting times.  
Gantt: P1(0-2), P2(2-4), P3(4-5), P1(5-7), P2(7-8).  
Waiting: P1 = 2, P2 = 4, P3 = 2. Average = **2.67**.  
*Reflection:* Quantum size controls the fairness–overhead trade-off; too small increases switches, too large approximates FCFS.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using arrival time instead of remaining time in SRTF | Students copy burst column instead of updating remaining | Maintain a separate “remaining” column and subtract after every slice |
| Forgetting that priority can starve | Low-priority processes never chosen once high-priority ones keep arriving | Add aging or compute worst-case wait for lowest priority |
| Assuming Round Robin is preemptive SJF | Both use time slices but different criteria | Remember RR criterion is “time since last run”, not burst length |
| Calculating turnaround instead of waiting time | Both formulas look similar | Always subtract arrival + burst from completion |
| Ignoring idle time when CPU utilisation is asked | Workload has gaps | Draw Gantt chart first; count only busy intervals |

## 7. The textbook-precise statement
A scheduling algorithm is a mapping \( \sigma: \mathbb{R}^+ \times \mathcal{P} \to \mathcal{P} \cup \{\text{idle}\} \) together with a preemption predicate \( \pi \). For each process \( p_i \) let \( A_i, B_i, C_i \) be arrival, burst and completion instants. Then waiting time \( W_i = C_i - A_i - B_i \) and the algorithm is optimal for average waiting time among non-preemptive disciplines if and only if it is SJF (Silberschatz, Galvin, Gagne, Operating System Concepts, 10e, §5.3.2).

## 8. Visual — diagram or schematic
```
Time axis: 0   1   2   3   4   5   6   7   8
FCFS:     |P1=====|P2===|P3| idle...
SRTF:     |P1 |P2===|P3|P1=====|P4...
RR(q=2):  |P1==|P2==|P3|P1==|P2|
          ↑context switch points
```

## 9. The memory technique
1. **The hook** — Imagine customers at a tea stall: FCFS is “first in line gets tea”, SJF is “shortest order served first”, Round Robin is “each gets two minutes then back of queue”, Priority is “VIPs jump the queue”.
2. **What to overlearn** — Formula for average waiting time and the fact that SRTF is optimal for average waiting time when preemption is allowed.
3. **Spaced-repetition schedule** — Review Gantt-chart construction after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget the name, rebuild by asking: “At every decision instant, which single number decides who runs next?” (arrival order, burst length, priority, or time since last run).

## 10. What this unlocks
Once you master these four policies you can understand any production scheduler because they are all combinations or extensions of the same ideas.  
- Multilevel feedback queues (Linux CFS, Windows) combine priority and Round Robin.  
- Real-time schedulers add deadline constraints on top of priority.  
- NUMA and SMT schedulers add topology costs to the same decision function.

## 11. Self-check — five questions, no answers
1. Three processes arrive at time 0 with bursts 10, 5, 1. Compute average waiting time under FCFS and under non-preemptive SJF.  
2. In SRTF, a new process with burst 2 arrives while a process with remaining time 3 is running. Does preemption occur?  
3. With Round Robin quantum = 4, a process needs 10 units. How many times does it lose the CPU before finishing?  
4. A low-priority process has been waiting 100 ms while high-priority processes keep arriving. Which classic problem is occurring?  
5. Why can SRTF produce lower average waiting time than SJF on the same arrival sequence?