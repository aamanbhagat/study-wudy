## 1. The one-sentence answer
**Scheduling algorithms decide the order and duration of CPU allocation to ready processes according to explicit rules that trade off waiting time, turnaround time, response time, and fairness.**

Processes arrive with arrival times and burst lengths; the scheduler selects which one runs next when the CPU becomes free or a timer expires. FCFS runs them in arrival order with no preemption. SJF (and its preemptive form SRTF) always picks the shortest remaining burst. Round Robin cycles through a queue with fixed time quanta. Priority selects the highest-priority process, again with optional preemption. Each rule produces a different Gantt chart and therefore different averages for the four metrics.

The choice of algorithm is never free; every rule that improves one metric worsens another, and real systems combine several rules inside multilevel feedback queues.

> [!NOTE]
> The single deepest insight is that preemption is the only mechanism that can bound response time for short or interactive jobs when long jobs are present; without it, starvation or convoy effects are inevitable.

## 2. Why this matters — concrete and current
Linux CFS (Completely Fair Scheduler) implements a variant of weighted round-robin with dynamic priorities derived from nice values; it is the default scheduler on every Android phone and every cloud VM running Linux, directly affecting tail latency for microservices at Google and Amazon.

NASA’s Mars Perseverance rover uses a priority-preemptive scheduler inside the VxWorks RTOS so that the critical landing-engine task can interrupt lower-priority telemetry tasks; a missed deadline would have destroyed the mission.

Modern GPU command queues in NVIDIA’s CUDA driver apply a priority scheduler with preemption (since Pascal) to let real-time graphics frames interrupt long-running machine-learning kernels, which is why a game can keep rendering at 60 Hz while a background training job runs.

Semiconductor fabs schedule wafer lots on photolithography steppers with a shortest-remaining-processing-time rule because each lost minute of machine time costs tens of thousands of dollars; the same algorithm appears in the fab’s manufacturing-execution system.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Process state diagram    | Distinguishes ready queue from running state; scheduling only touches the ready queue |
| Arrival time & burst time| Every algorithm’s input; without them no Gantt chart or metric can be computed       |
| Preemption vs. non-preemption | Determines whether a running process can be interrupted mid-burst                    |
| Average waiting time formula | The universal objective function used to compare all algorithms                      |

## 4. Building the idea — from intuition to formalism

### Step 1 — Processes are just (arrival, burst) pairs
A process is characterized only by the instant it becomes ready and the CPU time it needs. No other attributes are required for the basic algorithms.

Example: three processes P1(0,24), P2(0,3), P3(0,3) arrive together.

Formally, each process \(P_i\) is a tuple \((a_i, b_i)\) where \(a_i\) is arrival time and \(b_i\) is burst time.

> [!WARNING]
> Treating burst time as known in advance is an idealization; real systems must estimate it.

### Step 2 — FCFS produces the simplest ordering
The first process to arrive runs to completion; later arrivals simply append to the end of the queue.

Example: the three processes above run P1 then P2 then P3, producing waiting times 0, 24, 27.

Mathematically, the schedule is the permutation of processes sorted by non-decreasing \(a_i\).

> [!WARNING]
> FCFS is non-preemptive; once a long job starts, every later short job waits, creating the convoy effect.

### Step 3 — SJF / SRTF always selects minimal remaining time
Non-preemptive SJF lets the current job finish; SRTF re-evaluates at every arrival and picks the shortest remaining burst.

Example: same three jobs under SRTF yield the order P2, P3, P1; average waiting time drops from 17 to 3.

The selection rule at any time \(t\) is \(\arg\min_i \{b_i(t) \mid a_i \le t \land P_i \text{ ready}\}\).

> [!WARNING]
> SRTF can starve a long job if shorter jobs keep arriving; aging is required in practice.

### Step 4 — Round Robin inserts the time quantum
A ready queue is serviced in FIFO order, but each process is limited to a fixed quantum \(q\); when the quantum expires the process is moved to the tail.

Example: quantum = 4 on the same jobs produces interleaved execution P1(4), P2(3), P3(3), P1(4), … 

The schedule is a cyclic walk through the queue with preemption every \(q\) time units.

> [!WARNING]
> Too small a quantum increases context-switch overhead; too large degenerates to FCFS.

### Step 5 — Priority imposes an external total order
Each process carries a priority number; the scheduler always runs the highest-priority ready process (preemptive or not).

Example: P1 priority 3, P2 priority 1, P3 priority 2 yields P2 first under preemptive priority.

The rule is \(\arg\max_i \{\text{priority}_i \mid P_i \text{ ready}\}\).

> [!WARNING]
> Strict priority without aging produces starvation of low-priority processes.

### Step 6 — All algorithms are evaluated by the same four metrics
Waiting time \(W_i = C_i - a_i - b_i\), turnaround \(T_i = C_i - a_i\), response time, and CPU utilization are computed from the Gantt chart for any schedule.

### Step 7 — Textbook optimality results follow directly
SRTF is optimal for average waiting time among all preemptive algorithms when burst times are known; the proof is by exchange argument on any two adjacent jobs that violate the shortest-remaining order.

## 5. Worked examples — every step shown

**Example 1 — FCFS baseline**  
*Given:* P1(0,24), P2(3,3), P3(3,3).  
*Find:* average waiting time.  
Gantt: P1[0–24] P2[24–27] P3[27–30].  
Waiting times: \(W_1=0\), \(W_2=21\), \(W_3=24\).  
Average: \((0+21+24)/3=15\).  
**15**  
*Reflection:* The long job that arrived first forces every later job to wait; this is the convoy effect.

**Example 2 — SRTF on same input**  
*Given:* same processes.  
*Find:* schedule and average waiting time.  
At t=3 both P2 and P3 have burst 3; P1 has 21 remaining. SRTF picks P2. After P2 finishes, P3 runs. P1 resumes last.  
Waiting times: 6, 0, 3. Average = 3.  
**3**  
*Reflection:* Preemption at arrival instants is what produces the improvement.

**Example 3 — Round Robin, q=4**  
*Given:* P1(0,24), P2(0,3), P3(0,3), q=4.  
*Find:* Gantt chart.  
P1 runs 4, P2 runs 3 (finishes), P3 runs 3 (finishes), P1 runs 4, … until P1 finishes at 30.  
Waiting times: 6, 4, 7. Average = 5.67.  
**5.67**  
*Reflection:* The quantum forces interleaving even though P2 and P3 are short.

**Example 4 — Preemptive Priority**  
*Given:* P1(0,10, priority 2), P2(1,5, priority 1), P3(2,2, priority 3).  
*Find:* schedule under preemptive priority (lower number = higher priority).  
t=0: P1 runs. t=1: P2 arrives, preempts P1. P2 finishes at 6. P3 arrives at 2 but waits because priority 3 is lowest. After P2, P1 resumes until t=8 when P3 (higher priority than remaining P1) preempts and finishes at 10. P1 finishes at 12.  
Waiting times: 2, 0, 6.  
**Average 2.67**  
*Reflection:* Priority inversion between P3 and P1 is resolved only because preemption is allowed.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming burst times are known exactly | Textbooks give them; real OS must predict | Remember that SRTF optimality collapses with estimation error |
| Forgetting that Round Robin still needs a ready queue | Students treat it as pure time slicing | Always draw the FIFO queue alongside the Gantt chart |
| Confusing response time with waiting time | Both involve “first response”; definitions differ | Memorize: response = time of first scheduling, waiting = total time in ready queue |
| Ignoring context-switch cost when q is tiny | Overhead grows linearly with 1/q | In any calculation add \(c \times\) (number of switches) |
| Believing priority scheduling is starvation-free | Low-priority jobs can be overtaken forever | Always check whether aging or feedback is present |
| Mixing non-preemptive SJF with SRTF | Both pick shortest job, but timing differs | Write “preemptive?” beside every diagram |
| Computing averages before drawing the Gantt chart | Order errors propagate | Never calculate a metric without first producing the complete timeline |

## 7. The textbook-precise statement
A scheduling algorithm is a function that, given a set of processes each characterized by arrival time \(a_i\), burst time \(b_i\) and optional priority \(p_i\), produces a schedule (mapping from time to process) that respects the ready-queue discipline and any preemption rule. The four standard performance measures are average waiting time \(\frac{1}{n}\sum (C_i - a_i - b_i)\), average turnaround time, average response time, and CPU utilization. SRTF is optimal for average waiting time among all preemptive work-conserving schedulers when burst times are known (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §5.3).

## 8. Visual — diagram or schematic
```text
Time → 0   3   6   9  12  15  18  21  24  27  30
FCFS     |P1============|P2==|P3==|
SRTF     |P2==|P3==|P1======================|
RR(q=4)  |P1==|P2==|P3==|P1==|P1==|P1==|P1==|
Priority |P2=====|P3==|P1===========|
```
Each row is a separate schedule for the same three processes. Vertical bars mark context switches. The SRTF row shows two preemptions at t=3 and t=6.

## 9. The memory technique
1. **The hook** — Picture a post-office line where the clerk always serves the customer with the fewest packages left (SRTF); a bell rings every 30 seconds forcing the clerk to rotate customers (Round Robin).  
2. **What to overlearn** — SRTF optimality statement; waiting-time formula \(W_i=C_i-a_i-b_i\); the four algorithm names and their preemption status.  
3. **Spaced-repetition schedule** — Review definitions at 1 day, redraw Gantt charts at 3 days, compute averages for a new set at 7 days, compare all four algorithms on the same input at 16 days, derive starvation conditions at 35 days.  
4. **First-principles fallback** — Start from any two adjacent jobs that violate the selection rule of the algorithm; show that swapping them improves the metric, proving optimality or exposing the violation.

## 10. What this unlocks
Mastery of these four algorithms supplies the vocabulary and proof techniques required for multilevel feedback queues, real-time deadline scheduling (EDF, RMS), and the analysis of fairness in modern container orchestrators.

- Multilevel feedback queue (Linux CFS, Windows)
- Earliest-deadline-first and rate-monotonic scheduling
- Gang scheduling and co-scheduling for parallel jobs
- Fair-share and proportional-share schedulers (lottery, stride)

## 11. Self-check — five questions, no answers
1. Three processes arrive at time 0 with bursts 10, 1, 1. Compute average waiting time under FCFS, non-preemptive SJF, and SRTF.  
2. Round Robin with quantum 1 is run on five CPU-bound processes of equal length. What is the asymptotic ratio of context switches to useful work as quantum approaches zero?  
3. A long low-priority job has been starved for 100 quanta. Which single modification to strict priority scheduling eliminates starvation while preserving the priority ordering for short jobs?  
4. Draw the Gantt chart for SRTF when a new job whose burst equals the remaining time of the current job arrives; state whether the new job preempts.  
5. Prove or disprove: any non-preemptive schedule that is not shortest-job-first can be improved by swapping two adjacent jobs.