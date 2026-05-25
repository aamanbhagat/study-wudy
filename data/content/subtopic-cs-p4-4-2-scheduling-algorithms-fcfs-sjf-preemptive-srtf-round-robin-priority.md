## What it is
CPU scheduling algorithms are the methods an operating system's scheduler uses to decide which process in the "ready" queue gets to use the CPU. The goal is to allocate processor time in a way that meets system objectives, such as maximizing throughput, minimizing response time, or ensuring fairness. These algorithms are the core logic that enables multitasking on a single CPU.

## Why it matters
In aerospace, real-time operating systems (RTOS) are non-negotiable for flight control, avionics, and guidance systems. Priority-based preemptive scheduling ensures that critical tasks (e.g., "adjust control surface") are executed immediately, interrupting less critical ones (e.g., "log temperature data"). In large-scale physics simulations or machine learning training, scheduler efficiency directly impacts the time-to-solution, where a poor choice can waste millions of dollars in compute time.

## When to study it
Before tackling this, you must have a firm grasp of the process model in an operating system. Specifically, you must understand:
1.  **Process States:** The lifecycle of a process (New, Ready, Running, Waiting, Terminated).
2.  **Process Control Block (PCB):** The data structure that holds the state of a process.
3.  **Context Switching:** The mechanism for saving the state of one process and restoring the state of another.
4.  **CPU vs. I/O Bursts:** The concept that process execution is a cycle of CPU computation and waiting for I/O.

If these terms are unfamiliar, review them first. Otherwise, the logic of scheduling will be abstract and ungrounded.

## How to study it (step by step)
1.  **Define the Metrics.** Write down the precise definitions for Turnaround Time, Waiting Time, and Response Time. For a given set of processes, calculate these metrics by hand for the simplest algorithm: First-Come, First-Served (FCFS).
2.  **Optimize for Waiting Time.** Solve the same problem using non-preemptive Shortest-Job-First (SJF). Observe how the average waiting time decreases compared to FCFS. Internalize why SJF is provably optimal for minimizing average waiting time.
3.  **Introduce Preemption.** Now, solve the same problem with Shortest-Remaining-Time-First (SRTF), the preemptive version of SJF. Draw the timeline (Gantt chart) carefully, checking at each time unit if a newly arrived process has a shorter remaining burst time than the currently running process.
4.  **Introduce Fairness.** Solve the problem using Round Robin (RR) with a specific time quantum (e.g., $q=4$). Note how it improves response time for longer jobs compared to FCFS, at the cost of more context switches. Re-solve with a different quantum ($q=1$) to see the trade-off.
5.  **Introduce External Rank.** Finally, add a priority number to each process and solve the problem using Priority Scheduling (both non-preemptive and preemptive versions). This shows how external requirements can override properties like burst length.
6.  **Synthesize.** Create a table comparing the five algorithms (FCFS, SJF, SRTF, RR, Priority) across the key metrics for the same set of input processes. Add a column for "Pros" and "Cons" for each, noting issues like starvation or overhead.

## Key ideas, with intuition
1.  **The Core Metrics Tell the Story.** Performance is not a single value. We measure it with specific goals in mind.
    *   **Turnaround Time ($T_{turnaround}$):** The total time a process exists, from arrival to completion. This is what a user waiting for a batch job to finish cares about.
        $$T_{turnaround} = T_{completion} - T_{arrival}$$
    *   **Waiting Time ($T_{wait}$):** The total time a process spends in the ready queue, waiting for the CPU. This measures how much time the process was "stuck" and ready to run but couldn't.
        $$T_{wait} = T_{turnaround} - T_{burst}$$
    *   **Response Time ($T_{response}$):** The time from arrival until the process gets the CPU *for the first time*. This is what an interactive user at a terminal cares about.

2.  **Preemption vs. Non-preemption.** This is the most fundamental distinction. A non-preemptive scheduler, once it gives the CPU to a process, lets it run until it voluntarily gives up the CPU (by terminating or waiting for I/O). A preemptive scheduler can forcibly reclaim the CPU from a running process, typically because a higher-priority process has become ready. FCFS and SJF are non-preemptive; SRTF, RR, and preemptive Priority are preemptive. Preemption improves responsiveness but adds overhead from more frequent context switching.

3.  **The Oracle Problem.** SJF and SRTF are provably optimal for minimizing average waiting time. However, they require knowledge of the future—the exact length of the next CPU burst for each process. Since this is impossible to know in a general-purpose OS, these algorithms are primarily used as theoretical benchmarks against which practical algorithms (which predict burst times) are measured.

4.  **The Time Quantum Trade-off.** In Round Robin, the length of the time slice, or quantum ($q$), is critical. If $q$ is very large, RR degenerates into FCFS. If $q$ is very small (e.g., close to the context switch time), the overhead of context switching will consume the CPU, leaving little time for useful work. Choosing the right $q$ is a balancing act between responsiveness and efficiency.

## Worked example
Let's analyze the following processes using **Shortest-Remaining-Time-First (SRTF)**, which is preemptive.

| Process | Arrival Time | Burst Time |
| :------ | :----------- | :--------- |
| P1      | 0            | 8          |
| P2      | 1            | 4          |
| P3      | 2            | 9          |
| P4      | 3            | 5          |

**Step-by-step Execution (Gantt Chart):**

*   **t=0:** P1 arrives and starts running. Remaining time for P1 is 8.
*   **t=1:** P2 arrives. Its burst time (4) is less than P1's remaining time (7). The scheduler preempts P1. P2 starts running.
*   **t=2:** P3 arrives. Its burst time (9) is greater than P2's remaining time (3). P2 continues running.
*   **t=3:** P4 arrives. Its burst time (5) is greater than P2's remaining time (2). P2 continues running.
*   **t=5:** P2 finishes. Now, the ready queue contains P1 (rem=7), P3 (rem=9), P4 (rem=5). P4 has the shortest remaining time, so it runs.
*   **t=10:** P4 finishes. Ready queue: P1 (rem=7), P3 (rem=9). P1 has the shorter remaining time, so it runs.
*   **t=17:** P1 finishes. Only P3 is left. P3 runs.
*   **t=26:** P3 finishes. All processes are done.

**Gantt Chart:**
```
| P1 | P2 | P2 | P2 | P2 | P4 | P4 | P4 | P4 | P4 | P1 | P1 | P1 | P1 | P1 | P1 | P1 | P3 | ... | P3 |
0----1----2----3----4----5----6----7----8----9----10---11---12---13---14---15---16---17---...----26
```

**Calculations:**

1.  **Completion Times:**
    *   P1 completes at $t=17$.
    *   P2 completes at $t=5$.
    *   P3 completes at $t=26$.
    *   P4 completes at $t=10$.

2.  **Turnaround Times ($T_{completion} - T_{arrival}$):**
    *   P1: $17 - 0 = 17$
    *   P2: $5 - 1 = 4$
    *   P3: $26 - 2 = 24$
    *   P4: $10 - 3 = 7$

3.  **Waiting Times ($T_{turnaround} - T_{burst}$):**
    *   P1: $17 - 8 = 9$
    *   P2: $4 - 4 = 0$
    *   P3: $24 - 9 = 15$
    *   P4: $7 - 5 = 2$

4.  **Average Waiting Time:**
    $$ \text{Avg Wait} = \frac{9 + 0 + 15 + 2}{4} = \frac{26}{4} = 6.5 \text{ time units} $$

**Reflection:** Each step was driven by the core rule of SRTF: at any point a new process arrives or a current process completes, re-evaluate the entire ready queue and pick the one with the absolute shortest time left to run. The preemption at $t=1$ was the key event; without it, this would have been non-preemptive SJF, yielding a very different (and worse) average waiting time.

## Diagrams
A Gantt chart is the most effective way to visualize a schedule. It maps processes to the CPU over time.

```text
SRTF Example:

Time ->
0    1         5         10        17                  26
+----+---------+---------+---------+-------------------+
| P1 |   P2    |   P4    |   P1    |        P3         |
+----+---------+---------+---------+-------------------+

Events:
t=0: P1 arrives, runs.
t=1: P2 arrives (burst=4) < P1 (rem=7), P1 is preempted. P2 runs.
t=5: P2 completes. Ready queue: {P1(rem=7), P3(burst=9), P4(burst=5)}. P4 runs.
t=10: P4 completes. Ready queue: {P1(rem=7), P3(burst=9)}. P1 runs.
t=17: P1 completes. Ready queue: {P3(burst=9)}. P3 runs.
t=26: P3 completes.
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you're at the world's most chaotic emergency room.
    *   **FCFS:** Patients are treated in the order they walk in. A person with a paper cut could be ahead of a critical trauma case. Simple, but unfair and inefficient.
    *   **SJF:** The triage nurse only treats the patient with the quickest, easiest fix first, ignoring everyone else until that person is fully discharged. Better for overall patient throughput, but the trauma case is still waiting.
    *   **SRTF (Preemptive SJF):** The triage nurse is working on the paper cut when the trauma case is wheeled in. The nurse *immediately* drops the paper cut patient and starts working on the trauma case because their "remaining time until stabilization" is now the most critical. This is the most responsive for urgent cases.
    *   **Round Robin:** A single doctor runs between rooms, spending exactly 2 minutes with each patient before being forced to move to the next one. Fair, everyone gets seen quickly, but major surgeries happen in 2-minute increments, which is wildly inefficient.
    *   **Priority:** A VIP (e.g., the hospital's main donor) arrives. They get treated immediately, regardless of their ailment's severity or who was waiting.

2.  **Formulas to Overlearn:**
    *   $T_{turnaround} = T_{completion} - T_{arrival}$
    *   $T_{wait} = T_{turnaround} - T_{burst}$

3.  **Spaced Repetition Schedule:** Redo one problem from scratch using all 5 algorithms on Day 1, Day 3, Day 7, Day 16, and Day 35.

4.  **First Principles Pathway:** If you forget everything, you can always reconstruct it from the Gantt chart. Draw a timeline. At each time unit, ask: "Which processes have arrived? Based on my algorithm's rules (Who got here first? Who is shortest? Who has priority?), which one should be running *right now*?" Fill in the chart one time unit at a time. Once the chart is complete, the formulas are just formal descriptions of what you can see: waiting time is the sum of the gaps for a process, and turnaround time is the total span from its arrival to its completion.

## Common mistakes
1.  **Ignoring Arrival Times:** A common error is to schedule a process before it has arrived. A process with a short burst time that arrives at $t=10$ cannot be considered for the CPU at $t=0$.
2.  **Incorrect Preemption in SRTF:** Students often fail to preempt a running process the instant a new process with a shorter burst time arrives. You must check for preemption at *every* arrival event.
3.  **Handling the End of a Round Robin Quantum:** When a process's time quantum expires, it is moved to the *end* of the ready queue. It does not go to the front. If a process finishes *before* its quantum expires, the CPU is immediately given to the next process in the ready queue; the rest of the quantum is not left idle.
4.  **Confusing Waiting Time and Turnaround Time:** Waiting time is only the time spent in the ready queue. Turnaround time includes waiting time *plus* the time spent actually running on the CPU.

## Self-check
1.  Given three processes that all arrive at $t=0$ with burst times of 24, 3, and 3 respectively, calculate the average waiting time for FCFS and for non-preemptive SJF. Which is better and by how much?
2.  Given the following processes, calculate the average waiting time for both SRTF and Round Robin (with a time quantum $q=4$).
    | Process | Arrival Time | Burst Time |
    | :--- | :--- | :--- |
    | P1 | 0 | 7 |
    | P2 | 2 | 4 |
    | P3 | 4 | 1 |
    | P4 | 5 | 4 |
3.  Priority scheduling can lead to "starvation," where a low-priority process never gets to run. Describe a mechanism or policy that could be implemented in an operating system to mitigate starvation. What is this mechanism called?