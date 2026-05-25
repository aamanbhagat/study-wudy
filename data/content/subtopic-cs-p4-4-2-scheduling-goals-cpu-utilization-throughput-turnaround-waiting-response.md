## What it is
CPU scheduling goals are the performance metrics used to evaluate a scheduling algorithm. An operating system's scheduler must decide which process in the "ready" queue gets the CPU next, and these five criteria—CPU utilization, throughput, turnaround time, waiting time, and response time—provide a quantitative way to measure if its decisions are "good."

## Why it matters
These metrics are not just academic; they dictate the performance and cost of nearly all modern computing. In high-performance computing for physics simulations, maximizing **throughput** (jobs completed per hour) is key. For a rocket's guidance system, minimizing the worst-case **response time** is a matter of mission success or failure. For running large-scale machine learning training on the cloud, maximizing **CPU utilization** directly translates to minimizing your bill.

## When to study it
You must understand the process state model (new, ready, running, waiting, terminated) and the concept of a context switch. You should also be comfortable with the idea that the operating system kernel is the entity making the scheduling decision. Without this foundation, the metrics will seem abstract.

## How to study it (step by step)
1.  **Memorize the definitions.** Write down the definitions of the five key terms on an index card. Don't just paraphrase; write the exact definitions from the "Key ideas" section below.
2.  **Draw a Gantt chart.** Take a simple set of 3 processes with given arrival times and CPU burst times. Manually create a Gantt chart assuming a simple First-Come, First-Served (FCFS) schedule. This visual representation is the foundation for all calculations.
3.  **Calculate everything for one process.** Pick one process from your chart. Calculate its completion time, turnaround time, waiting time, and response time directly from the visual chart.
4.  **Calculate for all processes and average.** Repeat step 3 for all processes. Then, compute the average turnaround time and average waiting time for the entire schedule.
5.  **Calculate system metrics.** Using the same Gantt chart, calculate the total throughput and CPU utilization over the entire duration.
6.  **Introduce a change.** Now, imagine a different scheduler (e.g., Shortest Job First). Redraw the Gantt chart and recalculate all five metrics. Observe which metrics improved and which worsened. This builds intuition about the fundamental trade-offs.

## Key ideas, with intuition
The core of this topic is understanding time from different perspectives—that of the system, and that of a single process.

1.  **System-Oriented Metrics (The "Big Picture"):** These measure the overall efficiency of the system.
    *   **CPU Utilization:** The percentage of time the CPU is busy doing useful work. A CPU is a costly resource; we want it busy. If total time is $T$ and busy time is $T_{busy}$, then Utilization $= \frac{T_{busy}}{T}$.
    *   **Throughput:** The number of processes completed per unit of time. This is a measure of how much work is getting done. Throughput $= \frac{\text{Number of completed processes}}{\text{Total time}}$.

2.  **Process-Oriented Metrics (The "User's Perspective"):** These measure the quality of service for a single process. We usually care about the average of these metrics over all processes.
    *   **Turnaround Time ($T_{\text{turnaround}}$):** The total time a process exists, from its arrival in the system to its completion. It's the "wall-clock time" a user experiences.
        $$ T_{\text{turnaround}} = T_{\text{completion}} - T_{\text{arrival}} $$
    *   **Waiting Time ($T_{\text{waiting}}$):** The total time a process spends in the ready queue, waiting for its turn on the CPU. This is "wasted" time from the process's perspective. It does *not* include time spent waiting for I/O.
        $$ T_{\text{waiting}} = T_{\text{turnaround}} - T_{\text{burst}} $$
        Here, $T_{\text{burst}}$ is the amount of time the process needs to execute on the CPU.
    *   **Response Time ($T_{\text{response}}$):** The time from when a process arrives until it gets the CPU for the *first time*. This is critical for interactive systems, as it measures how quickly the system gives feedback to the user.
        $$ T_{\text{response}} = T_{\text{first run}} - T_{\text{arrival}} $$

## Worked example
Consider the following set of processes to be scheduled using First-Come, First-Served (FCFS). All times are in milliseconds (ms).

| Process | Arrival Time | Burst Time |
| :------ | :----------- | :--------- |
| P1      | 0            | 8          |
| P2      | 1            | 4          |
| P3      | 2            | 5          |

**Step 1: Draw the Gantt Chart**
Under FCFS, processes are served in the order they arrive: P1, then P2, then P3.

```text
CPU: | P1         | P2    | P3      |
Time: 0            8       12        17
```

**Step 2: Calculate Times for Each Process**
We will read the start and end times from the Gantt chart to compute our metrics.

*   **For P1:**
    *   Arrival: 0. First Run: 0. Completion: 8.
    *   $T_{\text{turnaround}} = T_{\text{completion}} - T_{\text{arrival}} = 8 - 0 = 8$ ms
    *   $T_{\text{waiting}} = T_{\text{turnaround}} - T_{\text{burst}} = 8 - 8 = 0$ ms
    *   $T_{\text{response}} = T_{\text{first run}} - T_{\text{arrival}} = 0 - 0 = 0$ ms

*   **For P2:**
    *   Arrival: 1. First Run: 8. Completion: 12.
    *   $T_{\text{turnaround}} = 12 - 1 = 11$ ms
    *   $T_{\text{waiting}} = 11 - 4 = 7$ ms
    *   $T_{\text{response}} = 8 - 1 = 7$ ms

*   **For P3:**
    *   Arrival: 2. First Run: 12. Completion: 17.
    *   $T_{\text{turnaround}} = 17 - 2 = 15$ ms
    *   $T_{\text{waiting}} = 15 - 5 = 10$ ms
    *   $T_{\text{response}} = 12 - 2 = 10$ ms

**Step 3: Calculate Averages and System Metrics**
*   **Average Turnaround Time:** $\frac{8 + 11 + 15}{3} = \frac{34}{3} \approx 11.33$ ms
*   **Average Waiting Time:** $\frac{0 + 7 + 10}{3} = \frac{17}{3} \approx 5.67$ ms
*   **CPU Utilization:** The CPU was busy from time 0 to 17. Total time is 17. So, Utilization $= \frac{17}{17} = 100\%$. (Note: This is only because there were no idle gaps).
*   **Throughput:** 3 processes were completed in 17 ms. Throughput $= \frac{3}{17} \approx 0.176$ processes/ms.

**Reflection:** The Gantt chart is the single source of truth. By visualizing when each process runs, we can mechanically derive all other metrics using their strict definitions. The distinction between arrival time (when it becomes ready) and first run time (when it leaves the ready queue) is crucial for calculating waiting and response times.

## Diagrams
A Gantt chart shows the allocation of the CPU over time.

```text
      <------------------- Gantt Chart -------------------->
      
CPU   +------------+---------+-----------+
      |     P1     |   P2    |    P3     |
      +------------+---------+-----------+
      |            |         |           |
Time  0            8         12          17
```

A timeline for a single process (like P2 from the example) clarifies the different time intervals.

```text
      <--------------------- P2 Lifetime --------------------->
      
      P2 arrives   P1 finishes, P2 starts    P2 finishes
      |            |                         |
      +------------+-------------------------+------------> Time
      1            8                         12
      
      <----------> <----------------------->
       Wait Time      Burst (Run) Time
      = 7ms           = 4ms
      
      <------------------------------------>
                  Turnaround Time
                  = 11ms
      
      <---------->
      Response Time
      = 7ms
```

## Memory technique — remember this forever
1.  **The Story: The DMV (Department of Motor Vehicles)**
    *   You **arrive** at the DMV. This is **Arrival Time**.
    *   The total time from when you walk in the door to when you walk out with your license is **Turnaround Time**.
    *   The time you spend sitting in a chair *waiting* for your number to be called is **Waiting Time**.
    *   The time from when you arrive until a clerk *first* calls your number is **Response Time**.
    *   The time you spend at the counter actually getting your photo taken and filling forms is **Burst Time**.
    *   **Throughput** is how many people the whole DMV can process per hour.
    *   **CPU Utilization** is the percentage of time the clerks are actually helping people, not sitting idle.

2.  **Must-Overlearn Formulas:**
    $$ T_{\text{turnaround}} = T_{\text{completion}} - T_{\text{arrival}} $$
    $$ T_{\text{waiting}} = T_{\text{turnaround}} - T_{\text{burst}} $$

3.  **Spaced Repetition Schedule:** Review these definitions and formulas at:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget the waiting time formula, reason it out. A process's total time in the system (Turnaround) is composed of only two things: time it's running (Burst) and time it's waiting to run (Waiting). Therefore, `Total = Running + Waiting`, which rearranges to `Waiting = Total - Running`.

## Common mistakes
1.  **Confusing Waiting Time and Turnaround Time.** Turnaround time *includes* the burst time. Waiting time is *only* the time spent in the ready queue. A process with a long burst time will necessarily have a long turnaround time, but could have zero waiting time.
2.  **Forgetting about Arrival Time.** Students often implicitly assume all processes arrive at time 0. If a process arrives at $t=5$ and the CPU is free, its waiting time is 0, not 5.
3.  **Mixing up Response Time and Turnaround Time.** Response time measures latency until the *first* output or interaction. Turnaround time measures latency until the process is *completely finished*. For a non-preemptive algorithm like FCFS, waiting time and response time are identical, but this is not true for other algorithms.
4.  **Miscalculating Throughput.** Throughput is not calculated per process. It is a system-wide rate, measured over a significant time interval (e.g., the time until the *last* process completes).

## Self-check
1.  You are given a Gantt chart where process P4 runs from $t=10$ to $t=25$. If P4 arrived at $t=3$ and has a total burst time of 15ms, what was its waiting time?
2.  For a deep space probe, communication latency is high. The probe runs scientific analysis in batches (batch processing) and also has a real-time system for attitude control (thruster firing). Which scheduling metric is most critical for the batch system, and which is most critical for the attitude control system? Justify your choices.
3.  Is it possible to have a schedule for two processes where Process A has a shorter turnaround time than Process B, but Process B has a shorter waiting time than Process A? If so, provide an example with arrival and burst times. If not, explain why.