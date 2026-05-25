## What it is
A Multi-level Feedback Queue (MLFQ) is a CPU scheduling algorithm designed to optimize for multiple, often conflicting, goals like responsiveness and throughput. It uses several queues, each with a different priority level, and employs a set of rules to move processes (or "jobs") between these queues based on their observed behavior. These promotion and demotion rules are the "feedback" mechanism that allows the scheduler to learn about a process and prioritize it accordingly.

## Why it matters
MLFQ is a foundational concept behind modern operating system schedulers. In aerospace, flight control software runs real-time operating systems where tasks have strict deadlines; MLFQ principles help ensure that high-priority control loop tasks are serviced immediately, while lower-priority logging or telemetry tasks run in the background. In large-scale physics simulations or machine learning training, an MLFQ-like scheduler can keep a user's terminal responsive for monitoring while dedicating the bulk of CPU resources to the long-running, number-crunching background job.

## When to study it
Before tackling MLFQ, you must have a firm grasp of the following prerequisites. If not, study them first.
*   **Process States:** Understand the ready, running, and waiting (blocked) states of a process.
*   **Basic Scheduling Algorithms:** Be able to trace and analyze First-Come, First-Served (FCFS), Shortest Job First (SJF), and especially Round Robin (RR).
*   **CPU Burst & I/O Burst:** Understand that process execution is a cycle of using the CPU and waiting for I/O.
*   **Scheduling Metrics:** Know the definitions of turnaround time, response time, and waiting time.
*   **Starvation:** Understand the concept of a process being perpetually denied necessary resources.

## How to study it (step by step)
1.  **Revisit Round Robin (RR):** Take a set of 3 processes with different arrival times and CPU burst lengths. Manually calculate the average waiting time using RR with a time quantum $q=10$. Note how a long job can make a short job wait for its full turn.
2.  **Define the Goals:** Write down the two primary goals of MLFQ: 1) Minimize response time for interactive (I/O-bound) jobs. 2) Minimize turnaround time for long-running (CPU-bound) jobs. Recognize that these are in tension.
3.  **Learn the Core Rules:** Internalize a canonical set of MLFQ rules. A good set to start with is:
    *   **Rule 1 (Priority):** If Priority(A) > Priority(B), A runs. B doesn't.
    *   **Rule 2 (Tie-break):** If Priority(A) = Priority(B), A & B run in Round Robin.
    *   **Rule 3 (Entry):** When a process enters the system, it is placed in the highest-priority queue.
    *   **Rule 4 (Demotion):** If a process uses its entire time quantum at a given level, its priority is reduced (it moves down one queue).
    *   **Rule 5 (Promotion/Starvation Prevention):** After some time period $S$, move all jobs in the system to the topmost queue. This is the "priority boost".
4.  **Trace a Mixed Workload:** Create a timeline. Trace two processes: one CPU-bound job that needs 100ms, and one I/O-bound job that runs for 5ms then blocks for I/O for 15ms, repeating this cycle. Use a 3-level queue with time quanta of 10ms, 20ms, and 40ms. Observe how the I/O-bound job stays high-priority while the CPU-bound job is demoted.
5.  **Analyze the Parameters:** Consider the knobs you can turn: the number of queues, the time quantum for each queue, and the priority boost interval $S$. Hypothesize how changing each one would affect the system. For instance, what happens if $S$ is too large? Too small?

## Key ideas, with intuition
1.  **Behavior as a Proxy for Type.** The scheduler has no a-priori knowledge of whether a job is interactive or CPU-bound. The core insight of MLFQ is to *use behavior to infer type*. A process that frequently gives up the CPU before its time slice expires (e.g., to wait for disk I/O or network input) is probably interactive. A process that always uses its full time slice is probably a CPU-bound batch job.
2.  **Separate and Conquer.** By demoting CPU-bound jobs and keeping I/O-bound jobs at high priority, the scheduler effectively segregates the workload. High-priority queues are reserved for short, bursty tasks that need immediate attention to feel responsive. Low-priority queues become the home for long-running jobs that can wait.
3.  **Dynamic Priority Adjustment.** Unlike a fixed-priority scheduler, MLFQ adapts. A job's priority is not static; it's a direct consequence of its recent actions. The demotion rule punishes CPU hogs, while the entry rule (Rule 3) gives every new process a chance to prove it's a short, interactive one.
4.  **The Priority Boost is a Reset Button.** Without a promotion mechanism, a long job could be demoted to the lowest queue and then *starve* if there's a steady stream of new, high-priority interactive jobs. The priority boost is a crucial mechanism to prevent this. It periodically wipes the slate clean, giving long-running jobs a chance to run and eventually complete, ensuring fairness.

## Worked example
Let's trace two processes, A (CPU-bound) and B (interactive), in a 3-level MLFQ.
*   **Queues:** Q2 (highest priority, time quantum $q=10$ms), Q1 ($q=20$ms), Q0 (lowest priority, $q=40$ms).
*   **Process A:** Arrives at $t=0$, needs 80ms of CPU time.
*   **Process B:** Arrives at $t=0$, runs for 5ms, then blocks for I/O for 10ms. Repeats this cycle.
*   **Priority Boost:** Occurs every $t=100$ms.

| Time    | Running | Ready Queues         | Event                                                              |
|---------|---------|----------------------|--------------------------------------------------------------------|
| 0       | A       | Q2: [B], Q1: [], Q0: [] | A and B arrive. A runs first (tie-break).                          |
| 5       | B       | Q2: [A], Q1: [], Q0: [] | B has higher priority (new arrival). Oops, let's assume RR tie-break. A runs. |
| **Correction for clarity:** Let's assume A arrived an instant before B for a deterministic start. |
| 0       | A       | Q2: [B]              | A arrives and runs.                                                |
| 1       | A       | Q2: [B]              | B arrives, placed in Q2. A continues since it's running.           |
| 10      | B       | Q1: [A], Q2: []      | A uses full 10ms quantum in Q2. **Demoted** to Q1. B runs from Q2. |
| 15      | A       | Q2: [], Q1: []       | B runs for 5ms, blocks for I/O. A is the only ready process, runs from Q1. |
| 25      | A       | Q2: [B], Q1: []      | B's I/O completes. It re-enters Q2. It **preempts** A.             |
| 30      | A       | Q2: [], Q1: []       | B runs for 5ms, blocks for I/O. A resumes in Q1. A has used 10ms of its 20ms Q1 quantum. |
| 40      | A       | Q2: [B], Q1: []      | B's I/O completes, enters Q2, **preempts** A again.                |
| 45      | A       | Q2: [], Q1: []       | B runs for 5ms, blocks for I/O. A resumes in Q1. A has now used 15ms of its 20ms Q1 quantum. |
| 50      | A       | Q2: [], Q0: [A]      | A runs for 5ms, using the remaining quantum in Q1 (total 20ms). **Demoted** to Q0. |
| ...     | A       | ...                  | A will now run in Q0 whenever B is blocked for I/O.                |
| 90      | A       | ...                  | A finishes its 80ms of CPU time.                                   |

**Reflection:**
*   Step at $t=10$: A was demoted because it was CPU-bound and used its entire time slice. This is the core demotion rule in action.
*   Step at $t=15$: B did *not* get demoted. It relinquished the CPU voluntarily for I/O, so it stayed in the high-priority queue. This is how the scheduler identifies it as interactive.
*   Steps at $t=25$ and $t=40$: B's return to the ready state caused it to preempt A. This demonstrates Rule 1: higher priority always runs. This ensures B remains responsive.
*   Step at $t=50$: A is demoted again after using its full quantum at the second level. This shows the cascading nature of the demotions.

## Diagrams

**MLFQ Structure:**
```text
       New Jobs
          |
          V
+---------------------+   Priority HIGH
| Queue 2 (q=10ms)    |------------------> RUN
+---------------------+
          |
      (use full q)
          |
          V
+---------------------+
| Queue 1 (q=20ms)    |------------------> RUN
+---------------------+
          |
      (use full q)
          |
          V
+---------------------+   Priority LOW
| Queue 0 (q=40ms)    |------------------> RUN
+---------------------+
          ^
          |
(Priority Boost every S ms)
          |
-------------------------
```

**Timeline from Worked Example:**
```text
Process A:  |AAAAAAAAAA|----------|AAAAAAAAAA|----------|AAAAAAAAA...
Process B:  |----------|BBBBB-----|----------|BBBBB-----|----------...
CPU State:  |  Run A   |  Run B   |  Run A   |  Run B   |  Run A   ...
            +----------+----------+----------+----------+----------...
Time:       0          10         15         25         30         40
```
*Note: Dashes `-----` indicate a process is blocked on I/O. Blank space indicates a process is ready but not running.*

## Memory technique — remember this forever
1.  **The Story: The Corporate Ladder.**
    *   Every new hire (process) starts as a "Hotshot Intern" on an urgent project (highest priority queue, short deadline/quantum).
    *   If you finish your small task quickly and ask for more (yield for I/O), you stay an intern, ready for the next urgent thing.
    *   If you take up your whole allotted time (use full quantum), management thinks you're a "Steady Plodder," not a "Hotshot." You're demoted to a regular "Engineer" (medium priority, longer projects/quantum).
    *   If you *still* take all your time there, you're branded a "Deep Thinker" and sent to the "R&D Basement" (lowest priority, very long projects/quantum), to be worked on when no one else needs anything.
    *   To prevent the R&D folks from quitting (starvation), once a year the CEO holds a company-wide "Innovation Day" (priority boost), and everyone is temporarily a "Hotshot Intern" again.

2.  **Overlearn these rules:**
    *   **Demotion:** Use full time slice $\implies$ Priority $\downarrow$.
    *   **Hold Priority:** Yield for I/O before time slice ends $\implies$ Priority $\leftrightarrow$.
    *   **Starvation Prevention:** Periodically, boost all processes to highest priority.

3.  **Spaced Repetition Schedule:** Review these rules and the "Corporate Ladder" story at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Derivation:** If you forget, start from the goals. Goal 1: Favor short jobs. Goal 2: Be responsive. How? Guess that new jobs are short. Give them high priority but a short time slice. If your guess is wrong (they use the whole slice), they are probably long jobs, so lower their priority. If your guess is right (they yield early), keep them at high priority. What if a long job starves? Add a rule to periodically reset everyone's priority. You have just re-derived MLFQ.

## Common mistakes
*   **Demoting on Preemption:** A process is demoted *only* if it uses its full time quantum. If it runs for 5ms out of a 10ms quantum and is then preempted by a higher-priority job, it is *not* demoted. When it gets to run again, it will have 5ms of its quantum remaining at its current priority level.
*   **Incorrect Time Quantum Association:** Thinking high-priority queues should have long time quanta. The reverse is true: high-priority queues have *short* quanta to allow the scheduler to quickly cycle through many interactive jobs. Low-priority queues have *long* quanta to reduce context-switching overhead for CPU-bound jobs.
*   **Forgetting the Priority Boost:** Neglecting the priority boost mechanism leads to starvation, which violates one of the key goals of a robust scheduler. It's not an optional add-on; it's a required component for fairness.
*   **Resetting Quantum on Preemption:** When a process is preempted and later resumes, it does not get a fresh time quantum. It gets to use whatever time was remaining in its quantum when it was preempted.

## Self-check
1.  A system uses an MLFQ with three queues: Q2 (q=10), Q1 (q=20), and Q0 (FCFS). A new process arrives that is purely CPU-bound and requires 35ms of CPU time to complete. Describe its journey through the queues, specifying how much time it spends running in each.
2.  Consider the same system as above. A CPU-bound process, P-long, has been running for some time and is currently in Q0. A new interactive process, P-short, arrives. P-short runs for 2ms, then blocks for I/O for 20ms, and repeats this pattern. Trace the execution for the first 50ms after P-short's arrival, assuming P-long has infinite work to do.
3.  You are designing an OS for a spacecraft. The scheduler must handle three types of tasks: high-frequency attitude control adjustments (must run every 10ms for 1ms), medium-frequency data compression (takes 50ms, must run every 500ms), and low-frequency data download preparation (a very long batch job). How would you set the number of queues, their time quanta, and the priority boost interval for an MLFQ to meet these requirements? Justify your choices and explain what would go wrong if your priority boost interval was too short or too long.