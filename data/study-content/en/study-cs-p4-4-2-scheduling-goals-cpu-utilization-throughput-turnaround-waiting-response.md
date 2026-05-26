## 1. The one-sentence answer
**Scheduling goals are quantitative performance metrics that let an operating system evaluate how well its CPU scheduler balances efficiency, fairness, and responsiveness.**

These five quantities—CPU utilization, throughput, turnaround time, waiting time, and response time—translate the abstract goal of “making the machine useful” into numbers an algorithm can optimize. CPU utilization measures the fraction of time the processor is actually executing instructions rather than idling. Throughput counts how many processes finish per unit of wall-clock time. Turnaround time records the total elapsed time from a process’s arrival until its completion. Waiting time isolates only the intervals a process spends in the ready queue. Response time captures the delay until a process first receives the CPU and can begin producing output. Together they expose the inevitable trade-offs: maximizing utilization often lengthens waiting time; minimizing response time can reduce throughput.

The metrics are not interchangeable. A batch system may happily sacrifice response time to raise throughput, while an interactive desktop must keep response time low even if utilization drops. The scheduler therefore chooses which metric (or weighted combination) to optimize for the workload at hand.

> [!NOTE]
> The deepest insight is that every scheduling decision simultaneously improves some metrics and degrades others; no single policy is optimal for all five at once.

## 2. Why this matters — concrete and current
Google’s Borg and its successor Kubernetes schedule millions of containers per day; their placement decisions are driven by explicit targets for CPU utilization (to keep power costs low) and response time (to meet tail-latency SLOs for search and ads).

In high-frequency trading, exchanges such as NASDAQ enforce strict response-time bounds measured in microseconds; a scheduler that minimizes average response time while guaranteeing worst-case latency directly affects revenue.

NASA’s Perseverance rover runs VxWorks on its RAD750 processor; the real-time scheduler is tuned so that critical control loops meet hard deadlines measured by turnaround time, because a missed deadline can cause loss of the vehicle.

Modern serverless platforms (AWS Lambda, Cloudflare Workers) auto-scale function instances; their cold-start logic is evaluated by the combination of throughput (functions completed per second) and waiting time (queueing delay before a new instance is allocated).

Semiconductor fabs use cluster schedulers to allocate expensive lithography machines; here throughput is the dominant metric because each additional wafer completed per hour yields millions of dollars.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Process state diagram (new, ready, running, waiting, terminated) | All five metrics are defined by transitions among these states; without the diagram the intervals cannot be identified. |
| Burst time (CPU time required by a process) | Waiting time and turnaround time are computed by subtracting burst time from larger intervals. |
| Arrival time and completion time | Turnaround time is exactly completion time minus arrival time; every timeline calculation begins from these two timestamps. |

## 4. Building the idea — from intuition to formalism

### Step 1 — CPU utilization
A CPU that sits idle wastes silicon and electricity. Utilization is therefore the fraction of time the processor is executing a process rather than idling.

Consider a single-core machine observed for 10 s during which the CPU was busy for 7 s. Utilization equals 70 %. Formally,
$$
U = \frac{\text{time CPU is busy}}{\text{total observation interval}}.
$$

> [!WARNING]
> Treating “busy” as “any non-idle state” is correct only if you exclude I/O wait time from the numerator; otherwise utilization is overstated.

### Step 2 — Throughput
Throughput answers “how much work gets done?” It counts completed processes per unit time.

If 120 processes finish in 60 s, throughput is 2 processes per second. In formula,
$$
X = \frac{n}{T},
$$
where \(n\) is the number of completions and \(T\) is the length of the observation window.

### Step 3 — Turnaround time
Turnaround time measures the user’s total waiting experience from submission to result.

A job arriving at \(t=0\) and finishing at \(t=25\) has turnaround time 25. The definition is
$$
T_i = C_i - A_i,
$$
where \(C_i\) and \(A_i\) are completion and arrival instants of process \(i\).

### Step 4 — Waiting time
Waiting time discards the time the process actually runs; only queueing delay counts.

If a process’s turnaround time is 25 and its burst time is 8, it waited 17 time units. Algebraically,
$$
W_i = T_i - B_i = C_i - A_i - B_i,
$$
where \(B_i\) is burst time.

### Step 5 — Response time
Response time records the instant the user first sees progress.

A process arriving at \(t=3\) that receives its first CPU slice at \(t=7\) has response time 4. The formula is
$$
R_i = F_i - A_i,
$$
where \(F_i\) is the time of first dispatch.

### Step 6 — The scheduler’s objective
Any concrete scheduler therefore solves an optimization problem whose objective is a function of the five quantities above, subject to the constraint that each process eventually terminates.

## 5. Worked examples — every step shown

**Example 1 — Single process, trivial case**  
*Given:* Arrival \(A=0\), burst \(B=5\), finishes at \(C=5\).  
*Find:* All five metrics.  
Step 1: Utilization = 5/5 = 1. *Why:* entire interval is busy.  
Step 2: Throughput = 1/5 = 0.2. *Why:* one completion in five units.  
Step 3: Turnaround \(T=5-0=5\). *Why:* definition.  
Step 4: Waiting \(W=5-5=0\). *Why:* subtract burst.  
Step 5: Response \(R=0-0=0\). *Why:* dispatched immediately.  
**Final answer**  
\(U=1\), \(X=0.2\), \(T=5\), \(W=0\), \(R=0\).

*Reflection:* The zero waiting time shows that contention is required before the harder metrics become interesting.

**Example 2 — Two processes, FCFS**  
*Given:* P1 arrives 0, bursts 4; P2 arrives 1, bursts 3. FCFS order.  
*Find:* Waiting times.  
Timeline: [0–4] P1, [4–7] P2.  
Turnaround: P1 = 4, P2 = 6.  
Waiting: P1 = 4-4 = 0; P2 = 6-3 = 3.  
**Final answer**  
Average waiting time = 1.5.

*Reflection:* The second process pays the full cost of the first; this is the classic convoy effect.

**Example 3 — Response versus turnaround**  
*Given:* Interactive job A arrives 0, bursts 10 but needs output at time 2; batch job B arrives 0, bursts 10. RR with quantum 1.  
*Find:* Response times.  
Job A receives CPU at time 0, 2, 4… so first response = 0.  
Turnaround for A remains 20 because of interleaving.  
**Final answer**  
Response time of A = 0 while turnaround = 20.

*Reflection:* Response time can be made small even when turnaround is large; the two metrics are independent.

**Example 4 — Utilization–throughput trade-off**  
*Given:* Workload of 100 CPU-bound jobs, each burst 1, arrivals spaced 0.1 apart. Context-switch cost = 0.05.  
*Find:* Effect of switching more often.  
With no switches, utilization = 100 %. With switches after every job, effective burst becomes 1.05, utilization drops to 100/105 ≈ 95 %. Throughput falls from 1 to 0.95 jobs per unit time.  
**Final answer**  
Higher context-switch frequency reduces both utilization and throughput.

*Reflection:* The example isolates overhead as the hidden variable that couples the two metrics.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Confusing waiting time with turnaround time | Both are measured in the same time units and both feel like “delay” | Always subtract burst time explicitly before reporting waiting time |
| Reporting utilization over an interval that includes system idle by design | Observation window chosen too large or includes shutdown | Restrict the denominator to the interval the scheduler is actually responsible for |
| Treating throughput as a per-process rather than system-wide metric | Students focus on one job’s completion rate | Compute throughput only after counting total completions in the window |
| Assuming response time equals waiting time for batch jobs | Interactive jobs need first dispatch; batch jobs do not | Check whether the workload definition mentions “first output” |
| Ignoring context-switch overhead when calculating utilization | Overhead is invisible in the process burst times | Add switch cost to the numerator of idle time |
| Optimizing average turnaround while starving long jobs | Shortest-job-first minimizes average turnaround but can produce starvation | Track worst-case turnaround separately |
| Measuring response time from arrival instead of from submission to scheduler | Arrival and submission timestamps differ in some traces | Use the timestamp the OS first sees the process |

## 7. The textbook-precise statement
In Silberschatz, Galvin, and Gagne, *Operating System Concepts*, 10e, §5.2, the performance metrics of a CPU scheduler are defined as follows. Let \(P = \{p_1,\dots,p_n\}\) be a set of processes with arrival times \(A_i\), burst times \(B_i\), and completion times \(C_i\). Then:

- CPU utilization: \(U = 1 - \frac{\text{total idle time}}{\sum (C_i - A_i)}\) over a busy period.  
- Throughput: \(X = n / T\) where \(T\) is the makespan.  
- Turnaround time of \(p_i\): \(T_i = C_i - A_i\).  
- Waiting time of \(p_i\): \(W_i = T_i - B_i\).  
- Response time of \(p_i\): \(R_i = F_i - A_i\) where \(F_i\) is the instant of first dispatch.

No theorem asserts optimality; the text states only that every scheduling algorithm implicitly or explicitly optimizes a function of these five quantities.

## 8. Visual — diagram or schematic
```text
Timeline (time →)
0     2     4     6     8    10
|-----|-----|-----|-----|-----|
P1====      P2====      P3====
   ^         ^         ^
   |         |         |
   A1=0      A2=2      A3=5
Response P1=0, P2=4, P3=6
Turnaround P1=4, P2=6, P3=5
Waiting P1=0, P2=2, P3=1
```
The diagram labels arrival instants below the axis and first-dispatch instants with arrows; waiting intervals are the gaps between arrival and first execution.

## 9. The memory technique

1. **The hook** — Picture a restaurant: utilization is how often the kitchen is cooking, throughput is plates leaving the pass, turnaround is the customer’s total visit, waiting time is time spent standing by the door, response time is how long until the first bread arrives.

2. **What to overlearn** — The three core identities \(T_i = C_i - A_i\), \(W_i = T_i - B_i\), \(R_i = F_i - A_i\).

3. **Spaced-repetition schedule** — Review definitions after 1 day, recompute a two-process Gantt chart after 3 days, derive the effect of context-switch overhead after 7 days, design a scheduler that trades response time for throughput after 16 days, and re-derive all five formulas from the state diagram after 35 days.

4. **First-principles fallback** — Start from the process state diagram, mark the exact intervals corresponding to each metric, then write the subtraction that isolates that interval.

## 10. What this unlocks
These five metrics become the objective functions for every concrete scheduling policy examined later—FCFS, SJF, Round-Robin, Priority, and multilevel feedback queues. They also reappear in real-time scheduling (earliest-deadline-first) where response time is replaced by absolute deadline, and in multiprocessor and virtual-machine scheduling where utilization must be balanced across cores.

- Next: FCFS and SJF algorithms  
- Next: Round-Robin and time-slicing  
- Next: Priority scheduling and aging  
- Next: Multiprocessor scheduling metrics  

## 11. Self-check — five questions, no answers
1. A system runs for 1000 ms and is idle for 150 ms. What is utilization?  

2. Three processes finish at times 10, 20, and 25; all arrived at time 0. Compute average turnaround and average waiting time if each burst equals 5.  

3. Under what workload would a scheduler deliberately lower CPU utilization to improve another metric?  

4. Show that response time is always less than or equal to waiting time, and give a workload where equality holds.  

5. A context switch costs 0.1 ms. If a scheduler reduces average waiting time by 0.3 ms but doubles the number of switches, does utilization rise or fall?