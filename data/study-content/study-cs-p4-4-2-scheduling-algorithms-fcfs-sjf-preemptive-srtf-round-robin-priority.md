## 1. What it is — in plain English

Imagine you're at a popular restaurant with only one chef but many hungry customers. Each customer places an order, and some orders take longer to prepare than others. How does the chef decide which order to cook next? Does he serve whoever came first? Does he prioritize the quickest meals to get them out fast? Or maybe he focuses on the most important customers?

In the world of computers, the "chef" is your Central Processing Unit (CPU), and the "customers" are the many programs or tasks (which we call "processes") running on your computer. Things like your web browser, a music player, a game, or even background system updates are all processes vying for the CPU's attention.

Since a typical computer often has many processes ready to run but usually only a few CPU cores (or even just one logical core at a time, conceptually) to execute them, the operating system needs a strategy. This strategy is called a **scheduling algorithm**. It's simply a set of rules that the operating system uses to decide which process gets to use the CPU next and for how long.

The goal of these algorithms is to manage the CPU efficiently, ensuring that all processes get a fair chance, that interactive programs feel responsive, and that important tasks are completed on time. Different algorithms have different strengths and weaknesses, much like different strategies for a chef would lead to different customer experiences.

## 2. Why it matters — real-world applications

CPU scheduling algorithms are fundamental to how operating systems function and directly impact your experience with any computing device. Their importance spans across various domains:

1.  **General-Purpose Operating Systems (Windows, macOS, Linux):** These are the most direct applications. When you're browsing the web, listening to music, and downloading a file simultaneously, scheduling algorithms ensure that all these tasks make progress. A well-chosen algorithm (like Round Robin or a multi-level feedback queue which incorporates elements of priority and RR) makes your system feel responsive, preventing a single CPU-intensive task from freezing your entire computer. Without effective scheduling, your system would constantly stutter or become unresponsive, making it unusable.

2.  **Cloud Computing and Data Centers:** Companies like Amazon Web Services (AWS), Google Cloud, and Microsoft Azure run millions of virtual machines and containers on shared physical hardware. Efficient CPU scheduling is critical here. It determines how CPU resources are allocated among different customer instances, ensuring fair usage, meeting Service Level Agreements (SLAs), and maximizing resource utilization for the cloud provider. For example, a customer paying for a "high-priority" VM might get preferential CPU access compared to a "low-priority" batch job, often managed by priority-based scheduling or more complex fair-share schedulers.

3.  **Real-Time Systems (Aerospace, Industrial Control, Medical Devices):** In these critical systems, tasks often have strict deadlines. For instance, an autopilot system in an aircraft, a robotic arm in a manufacturing plant, or a pacemaker must respond within milliseconds. Here, **Rate Monotonic Scheduling (RMS)** and **Earliest Deadline First (EDF)**, which are advanced forms of priority scheduling, are paramount. Missing a deadline could lead to catastrophic failure (e.g., an aircraft going off course, a robot colliding, or a medical device failing to deliver therapy). These systems demand predictable, timely execution, making the choice of scheduling algorithm a matter of safety and reliability.

4.  **High-Performance Computing (HPC) and Scientific Simulations (Physics, ML Training):** When running large-scale scientific simulations (e.g., climate modeling, particle physics simulations at CERN, or training massive machine learning models), jobs often require dedicated CPU time for extended periods. In these environments, batch scheduling (which can resemble FCFS or SJF for entire jobs rather than individual processes) is common, where jobs are queued and run to completion without preemption, or with preemption only at specific checkpoints. The goal is to maximize throughput and minimize the turnaround time for these resource-intensive computations, which can take days or weeks.

## 3. Prerequisites — what you must know first

Before diving deep into CPU scheduling algorithms, ensure you have a solid grasp of these foundational operating system concepts:

*   **Process:** A program in execution. It's an active entity, unlike a program (which is a passive entity, like a file on disk).
*   **CPU Burst:** The amount of time a process needs to use the CPU for computation before it performs an I/O operation or terminates. Processes alternate between CPU bursts and I/O bursts.
*   **I/O Burst:** The amount of time a process spends waiting for or performing an I/O operation (e.g., reading from disk, network communication). During an I/O burst, the process does not need the CPU.
*   **Context Switching:** The mechanism by which the CPU saves the state of the currently running process and loads the state of another process, allowing multiple processes to share a single CPU. This incurs overhead as no useful work is done during the switch.
*   **Process States:** The different phases a process can be in:
    *   **New:** The process is being created.
    *   **Ready:** The process is waiting to be assigned to a processor.
    *   **Running:** Instructions are being executed.
    *   **Waiting (Blocked):** The process is waiting for some event to occur (e.g., I/O completion).
    *   **Terminated:** The process has finished execution.
*   **Multiprogramming:** The technique of keeping multiple processes in memory at once, so that when one process has to wait (e.g., for I/O), the CPU can switch to another ready process, improving CPU utilization.
*   **Throughput:** The number of processes completed per unit of time. A higher throughput is generally desirable.
*   **Turnaround Time ($T_T$):** The total time from when a process arrives until it completes execution. It includes waiting time, execution time, and I/O time.
    $$T_T = \text{Completion Time} - \text{Arrival Time}$$
*   **Waiting Time ($T_W$):** The total amount of time a process spends in the ready queue, waiting for the CPU. It does not include the time spent executing or performing I/O.
    $$T_W = \text{Turnaround Time} - \text{CPU Burst Time}$$
*   **Response Time ($T_R$):** The time from when a process arrives until it first starts executing (gets the CPU for the very first time). This is particularly important for interactive systems.
    $$T_R = \text{First Execution Time} - \text{Arrival Time}$$

## 4. The core idea — step by step

The core idea behind CPU scheduling is to efficiently manage the CPU among competing processes to optimize various performance metrics. Let's walk through the major algorithms.

### Step 1: Understanding Scheduling Metrics

Before we dive into specific algorithms, it's crucial to understand what we're trying to optimize. Different algorithms prioritize different metrics.

*   **Plain-English Statement:** We measure the "goodness" of a scheduling algorithm by how well it performs on certain criteria, like how long users wait or how many tasks get done.
*   **Small Concrete Example:** Imagine you have 3 tasks: A, B, C.
    *   Task A takes 10 minutes.
    *   Task B takes 2 minutes.
    *   Task C takes 5 minutes.
    If you run them in order A, B, C, then B waits 10 minutes to start, and C waits 12 minutes. If you run B, C, A, then B starts immediately, C waits 2 minutes, and A waits 7 minutes. The average waiting time changes drastically.
*   **Formal/Mathematical Version:**
    *   **Average Turnaround Time:** $\frac{1}{n} \sum_{i=1}^{n} (\text{Completion Time}_i - \text{Arrival Time}_i)$
    *   **Average Waiting Time:** $\frac{1}{n} \sum_{i=1}^{n} (\text{Waiting Time}_i)$
    *   **Average Response Time:** $\frac{1}{n} \sum_{i=1}^{n} (\text{Response Time}_i)$
    *   **CPU Utilization:** The percentage of time the CPU is busy.
    *   **Throughput:** Number of processes completed per unit time.
*   **What could go wrong:** Optimizing for one metric often means sacrificing another. For example, minimizing average waiting time might lead to poor response time for some processes, or vice-versa.

### Step 2: First-Come, First-Served (FCFS) Scheduling

This is the simplest scheduling algorithm, much like a queue at a grocery store.

*   **Plain-English Statement:** Processes are executed in the order they arrive. The first process to request the CPU gets it first, and it runs until it finishes or requests I/O.
*   **Small Concrete Example:**
    *   Process P1 arrives at time 0, needs 10ms CPU.
    *   Process P2 arrives at time 1, needs 5ms CPU.
    *   Process P3 arrives at time 2, needs 8ms CPU.
    P1 starts at 0, runs for 10ms. P2 starts at 10, runs for 5ms. P3 starts at 15, runs for 8ms.
*   **Formal/Mathematical Version:**
    If processes $P_1, P_2, \ldots, P_n$ arrive in that order, and $P_i$ has a CPU burst time $B_i$:
    *   Completion time of $P_1$ is $B_1$.
    *   Completion time of $P_2$ is $B_1 + B_2$.
    *   Completion time of $P_i$ is $\sum_{j=1}^{i} B_j$.
    This is a **non-preemptive** algorithm: once a process starts, it runs to completion (or until it blocks for I/O) without interruption from other processes.
*   **What could go wrong:** The "convoy effect." If a very long process arrives first, all subsequent short processes have to wait for it to finish, leading to a high average waiting time. Imagine a huge truck at the front of a single-lane road, holding up many small cars.

### Step 3: Shortest Job First (SJF) Scheduling

SJF attempts to minimize average waiting time.

*   **Plain-English Statement:** When the CPU becomes free, the operating system looks at all processes currently waiting in the ready queue and picks the one that needs the *least* amount of CPU time for its next burst.
*   **Small Concrete Example:**
    *   P1 needs 10ms.
    *   P2 needs 2ms.
    *   P3 needs 5ms.
    If all arrive at time 0: P2 runs (2ms), then P3 (5ms), then P1 (10ms). This significantly reduces waiting for P2 and P3 compared to FCFS.
*   **Formal/Mathematical Version:**
    At any point when the CPU is available, select process $P_i$ such that $B_i = \min \{B_j \mid P_j \text{ is in the ready queue}\}$.
    This version is **non-preemptive**: once $P_i$ starts, it runs for its entire burst $B_i$.
*   **What could go wrong:**
    1.  **Starvation:** A long process might never get to run if there's a continuous stream of shorter processes arriving.
    2.  **Knowing the future:** In reality, the OS rarely knows the exact length of the next CPU burst. It can only estimate it based on past behavior.
    3.  **Arrival Times:** If processes arrive at different times, the "shortest job" might not be available when the CPU becomes free.

### Step 4: Shortest Remaining Time First (SRTF) Scheduling

SRTF is the preemptive version of SJF, addressing some of its limitations, especially with varying arrival times.

*   **Plain-English Statement:** This is like SJF, but with an added twist: if a new process arrives while another process is running, the operating system checks if the *new* process has a shorter *remaining* CPU burst time than the currently *running* process. If it does, the CPU immediately switches to the new, shorter process.
*   **Small Concrete Example:**
    *   P1 arrives at 0, needs 10ms.
    *   P2 arrives at 1, needs 2ms.
    *   P3 arrives at 2, needs 5ms.
    1.  At time 0, P1 starts (needs 10ms).
    2.  At time 1, P2 arrives (needs 2ms). P1 has 9ms remaining. Since 2ms (P2) < 9ms (P1), P1 is preempted, P2 starts.
    3.  At time 1, P2 runs for 1ms. P2 needs 1ms remaining.
    4.  At time 2, P3 arrives (needs 5ms). P2 has 1ms remaining. Since 1ms (P2) < 5ms (P3), P2 continues.
    5.  At time 2, P2 runs for 1ms and finishes.
    6.  At time 3, P3 starts (needs 5ms). P1 has 9ms remaining. Since 5ms (P3) < 9ms (P1), P3 starts.
    7.  At time 3, P3 runs for 5ms and finishes at time 8.
    8.  At time 8, P1 resumes (needs 9ms) and finishes at time 17.
*   **Formal/Mathematical Version:**
    At any time $t$, if a new process $P_{new}$ arrives, compare its burst time $B_{new}$ with the *remaining* burst time $B_{running}^{rem}$ of the currently running process $P_{running}$. If $B_{new} < B_{running}^{rem}$, preempt $P_{running}$ and schedule $P_{new}$. Otherwise, $P_{running}$ continues. When the CPU becomes free (process finishes or blocks), select process $P_i$ from the ready queue such that $B_i^{rem} = \min \{B_j^{rem} \mid P_j \text{ is in the ready queue}\}$.
    This is a **preemptive** algorithm.
*   **What could go wrong:**
    1.  **Increased Context Switches:** Frequent preemptions can lead to more context switches, adding overhead and reducing overall CPU efficiency.
    2.  **Starvation:** Similar to SJF, a long process might still suffer from starvation if there's a constant stream of processes with shorter remaining times.
    3.  **Future Knowledge:** Still requires knowledge (or good estimation) of future CPU burst times.

### Step 5: Round Robin (RR) Scheduling

This algorithm is designed for time-sharing systems, providing a fair share of CPU time to all processes.

*   **Plain-English Statement:** Each process gets a small, fixed amount of CPU time, called a "time quantum" or "timeslice." If a process doesn't finish within its quantum, it's preempted and moved to the back of the ready queue, and the CPU moves to the next process in the queue.
*   **Small Concrete Example:**
    *   P1 needs 10ms.
    *   P2 needs 5ms.
    *   P3 needs 8ms.
    *   Time quantum ($q$) = 4ms.
    1.  P1 runs for 4ms (remaining 6ms).
    2.  P2 runs for 4ms (remaining 1ms).
    3.  P3 runs for 4ms (remaining 4ms).
    4.  P1 runs for 4ms (remaining 2ms).
    5.  P2 runs for 1ms and finishes.
    6.  P3 runs for 4ms and finishes.
    7.  P1 runs for 2ms and finishes.
*   **Formal/Mathematical Version:**
    The ready queue is treated as a circular queue. The scheduler goes around the ready queue, allocating the CPU to each process for a time interval of at most $q$ time units. If the process has a CPU burst less than $q$, it releases the CPU voluntarily. Otherwise, it is preempted and added to the tail of the ready queue.
    This is a **preemptive** algorithm.
*   **What could go wrong:**
    1.  **Time Quantum Choice:**
        *   If $q$ is too large, RR behaves like FCFS (poor response time).
        *   If $q$ is too small, there's excessive context switching overhead, reducing overall CPU utilization.
    2.  **Context Switch Overhead:** Every preemption involves a context switch, which is pure overhead.

### Step 6: Priority Scheduling

This algorithm assigns a priority level to each process.

*   **Plain-English Statement:** Each process is given a "priority number." The CPU is always given to the process with the highest priority. If priorities are the same, FCFS or another tie-breaking rule is used.
*   **Small Concrete Example:**
    *   P1 (priority 2), needs 10ms.
    *   P2 (priority 1), needs 5ms. (Lower number = higher priority)
    *   P3 (priority 3), needs 8ms.
    If all arrive at 0: P2 runs (priority 1), then P1 (priority 2), then P3 (priority 3).
*   **Formal/Mathematical Version:**
    Each process $P_i$ has an associated priority value $Prio_i$. The scheduler selects process $P_k$ such that $Prio_k = \min \{Prio_j \mid P_j \text{ is in the ready queue}\}$ (assuming lower numbers mean higher priority).
    This can be **preemptive**: if a new process arrives with a higher priority than the currently running process, the CPU is preempted and given to the new process.
    Or **non-preemptive**: the highest priority process simply waits for the current process to finish its burst.
*   **What could go wrong:**
    1.  **Starvation (Indefinite Blocking):** Low-priority processes might never get to run if there's a continuous stream of high-priority processes. This is a severe problem.
    2.  **Solution to Starvation: Aging:** Gradually increase the priority of processes that have been waiting for a long time. This prevents them from waiting indefinitely.

## 5. Worked examples — multiple, with every step shown

Let's work through several examples to solidify these concepts. We'll use a Gantt chart (a horizontal bar chart) to visualize the CPU allocation over time.

**Assumptions for all examples:**
*   Context switch time is negligible unless specified.
*   Lower numbers indicate higher priority where applicable.

---

### Example 1: FCFS (First-Come, First-Served)

**Problem:**
Consider the following processes with their arrival times and CPU burst times:

| Process | Arrival Time (ms) | CPU Burst Time (ms) |
| :------ | :---------------- | :------------------ |
| P1      | 0                 | 8                   |
| P2      | 1                 | 4                   |
| P3      | 2                 | 9                   |
| P4      | 3                 | 5                   |

Calculate the completion time, turnaround time, waiting time, and response time for each process, and the average turnaround time, average waiting time, and average response time.

**Given:** Processes, Arrival Times, CPU Burst Times.
**Wanted:** Per-process and average Completion Time, Turnaround Time, Waiting Time, Response Time.

**Steps:**

1.  **Construct the Gantt Chart:**
    *   **At time 0:** P1 arrives. Since it's FCFS and P1 is the only process, P1 starts executing.
        ```
        0 --- P1 --- 8
        ```
    *   **At time 8:** P1 completes. Now, P2, P3, P4 have all arrived (at times 1, 2, 3 respectively). In FCFS, they are processed in arrival order: P2, then P3, then P4.
    *   **P2 starts at 8:** It needs 4ms.
        ```
        0 --- P1 --- 8 --- P2 --- 12
        ```
    *   **P3 starts at 12:** It needs 9ms.
        ```
        0 --- P1 --- 8 --- P2 --- 12 --- P3 --- 21
        ```
    *   **P4 starts at 21:** It needs 5ms.
        ```
        0 --- P1 --- 8 --- P2 --- 12 --- P3 --- 21 --- P4 --- 26
        ```
    **Gantt Chart:**
    ```text
    | P1 | P2 | P3 | P4 |
    0    8    12   21   26
    ```

2.  **Calculate Completion Time (CT) for each process:**
    *   **P1:** Finishes at 8ms. So, $CT_{P1} = 8$.
    *   **P2:** Finishes at 12ms. So, $CT_{P2} = 12$.
    *   **P3:** Finishes at 21ms. So, $CT_{P3} = 21$.
    *   **P4:** Finishes at 26ms. So, $CT_{P4} = 26$.

3.  **Calculate Turnaround Time (TT) for each process:** $TT = CT - AT$
    *   **P1:** $TT_{P1} = 8 - 0 = 8$ ms. (Completion Time - Arrival Time)
    *   **P2:** $TT_{P2} = 12 - 1 = 11$ ms.
    *   **P3:** $TT_{P3} = 21 - 2 = 19$ ms.
    *   **P4:** $TT_{P4} = 26 - 3 = 23$ ms.

4.  **Calculate Waiting Time (WT) for each process:** $WT = TT - BT$
    *   **P1:** $WT_{P1} = 8 - 8 = 0$ ms. (Turnaround Time - Burst Time)
    *   **P2:** $WT_{P2} = 11 - 4 = 7$ ms.
    *   **P3:** $WT_{P3} = 19 - 9 = 10$ ms.
    *   **P4:** $WT_{P4} = 23 - 5 = 18$ ms.

5.  **Calculate Response Time (RT) for each process:** $RT = \text{First Execution Time} - AT$
    *   **P1:** First execution at 0. $RT_{P1} = 0 - 0 = 0$ ms.
    *   **P2:** First execution at 8. $RT_{P2} = 8 - 1 = 7$ ms.
    *   **P3:** First execution at 12. $RT_{P3} = 12 - 2 = 10$ ms.
    *   **P4:** First execution at 21. $RT_{P4} = 21 - 3 = 18$ ms.

6.  **Calculate Average Metrics:**
    *   **Average Turnaround Time:** $\frac{8 + 11 + 19 + 23}{4} = \frac{61}{4} = \textbf{15.25 ms}$
    *   **Average Waiting Time:** $\frac{0 + 7 + 10 + 18}{4} = \frac{35}{4} = \textbf{8.75 ms}$
    *   **Average Response Time:** $\frac{0 + 7 + 10 + 18}{4} = \frac{35}{4} = \textbf{8.75 ms}$

| Process | AT | BT | CT | TT | WT | RT |
| :------ | :-- | :-- | :-- | :-- | :-- | :-- |
| P1      | 0   | 8   | 8   | 8   | 0   | 0   |
| P2      | 1   | 4   | 12  | 11  | 7   | 7   |
| P3      | 2   | 9   | 21  | 19  | 10  | 10  |
| P4      | 3   | 5   | 26  | 23  | 18  | 18  |
| **Avg** |     |     |     | **15.25** | **8.75** | **8.75** |

**Reflection:** FCFS is simple but suffers from the "convoy effect." Notice how P4, which only needed 5ms, had to wait a very long time (18ms) because of the longer processes P1, P2, and P3 ahead of it. This makes it unsuitable for systems where responsiveness is key.

---

### Example 2: SJF (Shortest Job First) - Non-Preemptive

**Problem:**
Using the same processes as Example 1:

| Process | Arrival Time (ms) | CPU Burst Time (ms) |
| :------ | :---------------- | :------------------ |
| P1      | 0                 | 8                   |
| P2      | 1                 | 4                   |
| P3      | 2                 | 9                   |
| P4      | 3                 | 5                   |

Calculate the completion time, turnaround time, waiting time, and response time for each process, and the average turnaround time, average waiting time, and average response time.

**Given:** Processes, Arrival Times, CPU Burst Times.
**Wanted:** Per-process and average Completion Time, Turnaround Time, Waiting Time, Response Time.

**Steps:**

1.  **Construct the Gantt Chart:**
    *   **At time 0:** P1 arrives. It's the only process. P1 starts.
        ```
        0 --- P1 ---
        ```
    *   **P1 runs until it completes, as SJF is non-preemptive.** P1 needs 8ms.
        ```
        0 --- P1 --- 8
        ```
    *   **At time 8:** P1 completes. Now, processes P2, P3, P4 are all in the ready queue (they arrived at 1, 2, 3 respectively). Their burst times are: P2 (4ms), P3 (9ms), P4 (5ms).
    *   **Select the shortest job from the ready queue:** P2 (4ms) is the shortest. P2 starts.
        ```
        0 --- P1 --- 8 --- P2 --- 12
        ```
    *   **At time 12:** P2 completes. Processes P3 (9ms) and P4 (5ms) are in the ready queue.
    *   **Select the shortest job:** P4 (5ms) is shorter than P3 (9ms). P4 starts.
        ```
        0 --- P1 --- 8 --- P2 --- 12 --- P4 --- 17
        ```
    *   **At time 17:** P4 completes. Only P3 (9ms) remains. P3 starts.
        ```
        0 --- P1 --- 8 --- P2 --- 12 --- P4 --- 17 --- P3 --- 26
        ```
    **Gantt Chart:**
    ```text
    | P1 | P2 | P4 | P3 |
    0    8    12   17   26
    ```

2.  **Calculate Completion Time (CT) for each process:**
    *   **P1:** Finishes at 8ms. $CT_{P1} = 8$.
    *   **P2:** Finishes at 12ms. $CT_{P2} = 12$.
    *   **P3:** Finishes at 26ms. $CT_{P3} = 26$.
    *   **P4:** Finishes at 17ms. $CT_{P4} = 17$.

3.  **Calculate Turnaround Time (TT) for each process:** $TT = CT - AT$
    *   **P1:** $TT_{P1} = 8 - 0 = 8$ ms.
    *   **P2:** $TT_{P2} = 12 - 1 = 11$ ms.
    *   **P3:** $TT_{P3} = 26 - 2 = 24$ ms.
    *   **P4:** $TT_{P4} = 17 - 3 = 14$ ms.

4.  **Calculate Waiting Time (WT) for each process:** $WT = TT - BT$
    *   **P1:** $WT_{P1} = 8 - 8 = 0$ ms.
    *   **P2:** $WT_{P2} = 11 - 4 = 7$ ms.
    *   **P3:** $WT_{P3} = 24 - 9 = 15$ ms.
    *   **P4:** $WT_{P4} = 14 - 5 = 9$ ms.

5.  **Calculate Response Time (RT) for each process:** $RT = \text{First Execution Time} - AT$
    *   **P1:** First execution at 0. $RT_{P1} = 0 - 0 = 0$ ms.
    *   **P2:** First execution at 8. $RT_{P2} = 8 - 1 = 7$ ms.
    *   **P3:** First execution at 17. $RT_{P3} = 17 - 2 = 15$ ms.
    *   **P4:** First execution at 12. $RT_{P4} = 12 - 3 = 9$ ms.

6.  **Calculate Average Metrics:**
    *   **Average Turnaround Time:** $\frac{8 + 11 + 24 + 14}{4} = \frac{57}{4} = \textbf{14.25 ms}$
    *   **Average Waiting Time:** $\frac{0 + 7 + 15 + 9}{4} = \frac{31}{4} = \textbf{7.75 ms}$
    *   **Average Response Time:** $\frac{0 + 7 + 15 + 9}{4} = \frac{31}{4} = \textbf{7.75 ms}$

| Process | AT | BT | CT | TT | WT | RT |
| :------ | :-- | :-- | :-- | :-- | :-- | :-- |
| P1      | 0   | 8   | 8   | 8   | 0   | 0   |
| P2      | 1   | 4   | 12  | 11  | 7   | 7   |
| P3      | 2   | 9   | 26  | 24  | 15  | 15  |
| P4      | 3   | 5   | 17  | 14  | 9   | 9   |
| **Avg** |     |     |     | **14.25** | **7.75** | **7.75** |

**Reflection:** Compared to FCFS, the average waiting time and turnaround time improved. This is because SJF prioritizes shorter jobs, getting them out of the system faster. However, P1 still ran for its full 8ms even when P2 (4ms) arrived, due to its non-preemptive nature. This is where SRTF comes in.

---

### Example 3: SRTF (Shortest Remaining Time First) - Preemptive SJF

**Problem:**
Using the same processes as Example 1 and 2:

| Process | Arrival Time (ms) | CPU Burst Time (ms) |
| :------ | :---------------- | :------------------ |
| P1      | 0                 | 8                   |
| P2      | 1                 | 4                   |
| P3      | 2                 | 9                   |
| P4      | 3                 | 5                   |

Calculate the completion time, turnaround time, waiting time, and response time for each process, and the average turnaround time, average waiting time, and average response time.

**Given:** Processes, Arrival Times, CPU Burst Times.
**Wanted:** Per-process and average Completion Time, Turnaround Time, Waiting Time, Response Time.

**Steps:**

1.  **Construct the Gantt Chart (Step-by-step with preemption checks):**
    *   **Time 0:** P1 arrives (BT=8). P1 starts running.
        *   Ready Queue: []
        *   Running: P1 (Remaining=8)
    *   **Time 1:** P2 arrives (BT=4). P1 has 7ms remaining. Since P2's burst (4ms) is less than P1's remaining (7ms), P1 is preempted. P2 starts.
        *   Ready Queue: [P1 (rem=7)]
        *   Running: P2 (Remaining=4)
        *   **Note:** P1's Response Time is 0-0=0. P2's Response Time is 1-1=0.
    *   **Time 2:** P3 arrives (BT=9). P2 has 3ms remaining. Since P2's remaining (3ms) is less than P3's burst (9ms), P2 continues.
        *   Ready Queue: [P1 (rem=7), P3 (rem=9)]
        *   Running: P2 (Remaining=3)
    *   **Time 3:** P4 arrives (BT=5). P2 has 2ms remaining. Since P2's remaining (2ms) is less than P4's burst (5ms), P2 continues.
        *   Ready Queue: [P1 (rem=7), P3 (rem=9), P4 (rem=5)]
        *   Running: P2 (Remaining=2)
    *   **Time 5:** P2 completes (ran for 4ms from time 1 to 5).
        *   Ready Queue: [P1 (rem=7), P3 (rem=9), P4 (rem=5)]
        *   Running: None.
        *   Now, choose from Ready Queue based on shortest remaining time: P4 (5ms) is shortest. P4 starts.
        *   **Note:** P4's Response Time is 5-3=2.
    *   **Time 10:** P4 completes (ran for 5ms from time 5 to 10).
        *   Ready Queue: [P1 (rem=7), P3 (rem=9)]
        *   Running: None.
        *   Choose from Ready Queue: P1 (7ms) is shorter than P3 (9ms). P1 starts.
        *   **Note:** P3's Response Time is 17-2=15 (will be calculated later, as it hasn't run yet).
    *   **Time 17:** P1 completes (ran for 7ms from time 10 to 17, plus 1ms at time 0).
        *   Ready Queue: [P3 (rem=9)]
        *   Running: None.
        *   Only P3 remains. P3 starts.
    *   **Time 26:** P3 completes (ran for 9ms from time 17 to 26).

    **Gantt Chart:**
    ```text
    | P1 | P2 | P4 | P1 | P3 |
    0    1    5    10   17   26
    ```

2.  **Calculate Completion Time (CT) for each process:**
    *   **P1:** Finishes at 17ms. $CT_{P1} = 17$.
    *   **P2:** Finishes at 5ms. $CT_{P2} = 5$.
    *   **P3:** Finishes at 26ms. $CT_{P3} = 26$.
    *   **P4:** Finishes at 10ms. $CT_{P4} = 10$.

3.  **Calculate Turnaround Time (TT) for each process:** $TT = CT - AT$
    *   **P1:** $TT_{P1} = 17 - 0 = 17$ ms.
    *   **P2:** $TT_{P2} = 5 - 1 = 4$ ms.
    *   **P3:** $TT_{P3} = 26 - 2 = 24$ ms.
    *   **P4:** $TT_{P4} = 10 - 3 = 7$ ms.

4.  **Calculate Waiting Time (WT) for each process:** $WT = TT - BT$
    *   **P1:** $WT_{P1} = 17 - 8 = 9$ ms.
    *   **P2:** $WT_{P2} = 4 - 4 = 0$ ms.
    *   **P3:** $WT_{P3} = 24 - 9 = 15$ ms.
    *   **P4:** $WT_{P4} = 7 - 5 = 2$ ms.

5.  **Calculate Response Time (RT) for each process:** $RT = \text{First Execution Time} - AT$
    *   **P1:** First execution at 0. $RT_{P1} = 0 - 0 = 0$ ms.
    *   **P2:** First execution at 1. $RT_{P2} = 1 - 1 = 0$ ms.
    *   **P3:** First execution at 17. $RT_{P3} = 17 - 2 = 15$ ms.
    *   **P4:** First execution at 5. $RT_{P4} = 5 - 3 = 2$ ms.

6.  **Calculate Average Metrics:**
    *   **Average Turnaround Time:** $\frac{17 + 4 + 24 + 7}{4} = \frac{52}{4} = \textbf{13 ms}$
    *   **Average Waiting Time:** $\frac{9 + 0 + 15 + 2}{4} = \frac{26}{4} = \textbf{6.5 ms}$
    *   **Average Response Time:** $\frac{0 + 0 + 15 + 2}{4} = \frac{17}{4} = \textbf{4.25 ms}$

| Process | AT | BT | CT | TT | WT | RT |
| :------ | :-- | :-- | :-- | :-- | :-- | :-- |
| P1      | 0   | 8   | 17  | 17  | 9   | 0   |
| P2      | 1   | 4   | 5   | 4   | 0   | 0   |
| P3      | 2   | 9   | 26  | 24  | 15  | 15  |
| P4      | 3   | 5   | 10  | 7   | 2   | 2   |
| **Avg** |     |     |     | **13** | **6.5** | **4.25** |

**Reflection:** SRTF significantly improved average waiting time and turnaround time compared to FCFS and non-preemptive SJF. P2 and P4, the shorter jobs, were executed very quickly. P1 and P3, the longer jobs, suffered more waiting, but the overall average improved. The tricky part here is correctly tracking remaining burst times and performing preemption checks at *every* arrival and completion event.

---

### Example 4: Round Robin (RR)

**Problem:**
Consider the following processes with their arrival times and CPU burst times. Assume a time quantum ($q$) of **3ms**.

| Process | Arrival Time (ms) | CPU Burst Time (ms) |
| :------ | :---------------- | :------------------ |
| P1      | 0                 | 10                  |
| P2      | 1                 | 6                   |
| P3      | 2                 | 2                   |
| P4      | 3                 | 8                   |

Calculate the completion time, turnaround time, waiting time, and response time for each process, and the average turnaround time, average waiting time, and average response time.

**Given:** Processes, Arrival Times, CPU Burst Times, Time Quantum ($q=3ms$).
**Wanted:** Per-process and average Completion Time, Turnaround Time, Waiting Time, Response Time.

**Steps:**

1.  **Construct the Gantt Chart (Step-by-step with quantum checks):**
    *   **Ready Queue (RQ):** Will store processes ready to run, in order.
    *   **Time 0:** P1 arrives (BT=10). P1 starts.
        *   RQ: []
        *   Running: P1 (rem=10)
    *   **Time 1:** P2 arrives (BT=6). Add P2 to RQ.
        *   RQ: [P2]
        *   Running: P1 (rem=10)
    *   **Time 2:** P3 arrives (BT=2). Add P3 to RQ.
        *   RQ: [P2, P3]
        *   Running: P1 (rem=10)
    *   **Time 3:** P4 arrives (BT=8). Add P4 to RQ. P1's quantum (3ms) expires. P1 is preempted. P1's remaining burst is 10-3=7ms. Add P1 to the end of RQ.
        *   RQ: [P2, P3, P4, P1 (rem=7)]
        *   Running: None.
        *   Next from RQ: P2 starts.
        *   **Note:** RT for P1=0-0=0. RT for P2=3-1=2. RT for P3=6-2=4. RT for P4=8-3=5.
    *   **Time 6:** P2's quantum (3ms) expires. P2 is preempted. P2's remaining burst is 6-3=3ms. Add P2 to the end of RQ.
        *   RQ: [P3, P4, P1 (rem=7), P2 (rem=3)]
        *   Running: None.
        *   Next from RQ: P3 starts.
    *   **Time 8:** P3 completes (needed 2ms, less than quantum).
        *   RQ: [P4, P1 (rem=7), P2 (rem=3)]
        *   Running: None.
        *   Next from RQ: P4 starts.
    *   **Time 11:** P4's quantum (3ms) expires. P4 is preempted. P4's remaining burst is 8-3=5ms. Add P4 to the end of RQ.
        *   RQ: [P1 (rem=7), P2 (rem=3), P4 (rem=5)]
        *   Running: None.
        *   Next from RQ: P1 starts.
    *   **Time 14:** P1's quantum (3ms) expires. P1 is preempted. P1's remaining burst is 7-3=4ms. Add P1 to the end of RQ.
        *   RQ: [P2 (rem=3), P4 (rem=5), P1 (rem=4)]
        *   Running: None.
        *   Next from RQ: P2 starts.
    *   **Time 17:** P2 completes (needed 3ms, exactly quantum).
        *   RQ: [P4 (rem=5), P1 (rem=4)]
        *   Running: None.
        *   Next from RQ: P4 starts.
    *   **Time 20:** P4's quantum (3ms) expires. P4 is preempted. P4's remaining burst is 5-3=2ms. Add P4 to the end of RQ.
        *   RQ: [P1 (rem=4), P4 (rem=2)]
        *   Running: None.
        *   Next from RQ: P1 starts.
    *   **Time 23:** P1's quantum (3ms) expires. P1 is preempted. P1's remaining burst is 4-3=1ms. Add P1 to the end of RQ.
        *   RQ: [P4 (rem=2), P1 (rem=1)]
        *   Running: None.
        *   Next from RQ: P4 starts.
    *   **Time 25:** P4 completes (needed 2ms, less than quantum).
        *   RQ: [P1 (rem=1)]
        *   Running: None.
        *   Next from RQ: P1 starts.
    *   **Time 26:** P1 completes (needed 1ms, less than quantum).
        *   RQ: []
        *   Running: None. All processes finished.

    **Gantt Chart:**
    ```text
    | P1 | P2 | P3 | P4 | P1 | P2 | P4 | P1 | P4 | P1 |
    0    3    6    8    11   14   17   20   23   25   26
    ```

2.  **Calculate Completion Time (CT) for each process:**
    *   **P1:** Finishes at 26ms. $CT_{P1} = 26$.
    *   **P2:** Finishes at 17ms. $CT_{P2} = 17$.
    *   **P3:** Finishes at 8ms. $CT_{P3} = 8$.
    *   **P4:** Finishes at 25ms. $CT_{P4} = 25$.

3.  **Calculate Turnaround Time (TT) for each process:** $TT = CT - AT$
    *   **P1:** $TT_{P1} = 26 - 0 = 26$ ms.
    *   **P2:** $TT_{P2} = 17 - 1 = 16$ ms.
    *   **P3:** $TT_{P3} = 8 - 2 = 6$ ms.
    *   **P4:** $TT_{P4} = 25 - 3 = 22$ ms.

4.  **Calculate Waiting Time (WT) for each process:** $WT = TT - BT$
    *   **P1:** $WT_{P1} = 26 - 10 = 16$ ms.
    *   **P2:** $WT_{P2} = 16 - 6 = 10$ ms.
    *   **P3:** $WT_{P3} = 6 - 2 = 4$ ms.
    *   **P4:** $WT_{P4} = 22 - 8 = 14$ ms.

5.  **Calculate Response Time (RT) for each process:** $RT = \text{First Execution Time} - AT$
    *   **P1:** First execution at 0. $RT_{P1} = 0 - 0 = 0$ ms.
    *   **P2:** First execution at 3. $RT_{P2} = 3 - 1 = 2$ ms.
    *   **P3:** First execution at 6. $RT_{P3} = 6 - 2 = 4$ ms.
    *   **P4:** First execution at 8. $RT_{P4} = 8 - 3 = 5$ ms.

6.  **Calculate Average Metrics:**
    *   **Average Turnaround Time:** $\frac{26 + 16 + 6 + 22}{4} = \frac{70}{4} = \textbf{17.5 ms}$
    *   **Average Waiting Time:** $\frac{16 + 10 + 4 + 14}{4} = \frac{44}{4} = \textbf{11 ms}$
    *   **Average Response Time:** $\frac{0 + 2 + 4 + 5}{4} = \frac{11}{4} = \textbf{2.75 ms}$

| Process | AT | BT | CT | TT | WT | RT |
| :------ | :-- | :-- | :-- | :-- | :-- | :-- |
| P1      | 0   | 10  | 26  | 26  | 16  | 0   |
| P2      | 1   | 6   | 17  | 16  | 10  | 2   |
| P3      | 2   | 2   | 8   | 6   | 4   | 4   |
| P4      | 3   | 8   | 25  | 22  | 14  | 5   |
| **Avg** |     |     |     | **17.5** | **11** | **2.75** |

**Reflection:** Round Robin provides excellent response time, as every process gets a chance to run fairly quickly after arrival. This is crucial for interactive systems. However, its average turnaround and waiting times can be higher than SJF/SRTF, especially for processes that need many quanta. The complexity comes from constantly managing the ready queue and tracking remaining burst times.

---

### Example 5: Priority Scheduling - Preemptive

**Problem:**
Consider the following processes with their arrival times, CPU burst times, and priorities. Assume a time quantum of **3ms** for processes with the same priority (i.e., Round Robin for ties), and lower priority number means higher priority.

| Process | Arrival Time (ms) | CPU Burst Time (ms) | Priority |
| :------ | :---------------- | :------------------ | :------- |
| P1      | 0                 | 5                   | 2        |
| P2      | 1                 | 7                   | 1        |
| P3      | 2                 | 3                   | 3        |
| P4      | 3                 | 6                   | 2        |

Calculate the completion time, turnaround time, waiting time, and response time for each process, and the average turnaround time, average waiting time, and average response time.

**Given:** Processes, Arrival Times, CPU Burst Times, Priorities, Preemptive Priority, RR for ties ($q=3ms$).
**Wanted:** Per-process and average Completion Time, Turnaround Time, Waiting Time, Response Time.

**Steps:**

1.  **Construct the Gantt Chart (Step-by-step with priority and preemption checks):**
    *   **Ready Queue (RQ):** Stores processes, sorted by priority (lowest number first), then by arrival time (FCFS) or RR for same priority.
    *   **Time 0:** P1 arrives (BT=5, Prio=2). P1 starts.
        *   RQ: []
        *   Running: P1 (rem=5, Prio=2)
    *   **Time 1:** P2 arrives (BT=7, Prio=1). P1 has 4ms remaining. P2 has higher priority (1 < 2). P1 is preempted. P2 starts.
        *   RQ: [P1 (rem=4, Prio=2)]
        *   Running: P2 (rem=7, Prio=1)
        *   **Note:** RT for P1=0-0=0. RT for P2=1-1=0.
    *   **Time 2:** P3 arrives (BT=3, Prio=3). P2 has 6ms remaining. P3 has lower priority (3 > 1). P2 continues.
        *   RQ: [P1 (rem=4, Prio=2), P3 (rem=3, Prio=3)]
        *   Running: P2 (rem=6, Prio=1)
    *   **Time 3:** P4 arrives (BT=6, Prio=2). P2 has 5ms remaining. P4 has lower priority (2 > 1). P2 continues.
        *   RQ: [P1 (rem=4, Prio=2), P3 (rem=3, Prio=3), P4 (rem=6, Prio=2)]
        *   Running: P2 (rem=5, Prio=1)
    *   **Time 8:** P2 completes (ran for 7ms from time 1 to 8).
        *   RQ: [P1 (rem=4, Prio=2), P3 (rem=3, Prio=3), P4 (rem=6, Prio=2)]
        *   Running: None.
        *   Now, choose from RQ based on priority. P1 and P4 both have priority 2. They will be scheduled using Round Robin ($q=3ms$). P1 arrived before P4.
        *   Next from RQ: P1 starts.
        *   **Note:** RT for P3=14-2=12. RT for P4=11-3=8.
    *   **Time 11:** P1's quantum (3ms) expires. P1 is preempted. P1's remaining burst is 4-3=1ms. Add P1 to the end of its priority group in RQ.
        *   RQ: [P3 (rem=3, Prio=3), P4 (rem=6, Prio=2), P1 (rem=1, Prio=2)] (sorted by priority, then arrival/RR order for same priority)
        *   Running: None.
        *   Next from RQ: P4 starts (it's the next Prio 2 process).
    *   **Time 14:** P4's quantum (3ms) expires. P4 is preempted. P4's remaining burst is 6-3=3ms. Add P4 to the end of its priority group in RQ.
        *   RQ: [P3 (rem=3, Prio=3), P1 (rem=1, Prio=2), P4 (rem=3, Prio=2)]
        *   Running: None.
        *   Next from RQ: P1 starts (it's the next Prio 2 process).
    *   **Time 15:** P1 completes (needed 1ms, less than quantum).
        *   RQ: [P3 (rem=3, Prio=3), P4 (rem=3, Prio=2)]
        *   Running: None.
        *   Next from RQ: P4 starts (only Prio 2 process left).
    *   **Time 18:** P4 completes (needed 3ms, exactly quantum).
        *   RQ: [P3 (rem=3, Prio=3)]
        *   Running: None.
        *   Next from RQ: P3 starts (only process left).
    *   **Time 21:** P3 completes (ran for 3ms).
        *   RQ: []
        *   Running: None. All processes finished.

    **Gantt Chart:**
    ```text
    | P1 | P2 | P2 | P2 | P2 | P2 | P2 | P2 | P1 | P4 | P1 | P4 | P3 |
    0    1    2    3    4    5    6    7    8    11   14   15   18   21
    ```
    (Note: P2 runs continuously from 1 to 8)

    Simplified Gantt Chart:
    ```text
    | P1 | P2      | P1 | P4 | P1 | P4 | P3 |
    0    1         8    11   14   15   18   21
    ```

2.  **Calculate Completion Time (CT) for each process:**
    *   **P1:** Finishes at 15ms. $CT_{P1} = 15$.
    *   **P2:** Finishes at 8ms. $CT_{P2} = 8$.
    *   **P3:** Finishes at 21ms. $CT_{P3} = 21$.
    *   **P4:** Finishes at 18ms. $CT_{P4} = 18$.

3.  **Calculate Turnaround Time (TT) for each process:** $TT = CT - AT$
    *   **P1:** $TT_{P1} = 15 - 0 = 15$ ms.
    *   **P2:** $TT_{P2} = 8 - 1 = 7$ ms.
    *   **P3:** $TT_{P3} = 21 - 2 = 19$ ms.
    *   **P4:** $TT_{P4} = 18 - 3 = 15$ ms.

4.  **Calculate Waiting Time (WT) for each process:** $WT = TT - BT$
    *   **P1:** $WT_{P1} = 15 - 5 = 10$ ms.
    *   **P2:** $WT_{P2} = 7 - 7 = 0$ ms.
    *   **P3:** $WT_{P3} = 19 - 3 = 16$ ms.
    *   **P4:** $WT_{P4} = 15 - 6 = 9$ ms.

5.  **Calculate Response Time (RT) for each process:** $RT = \text{First Execution Time} - AT$
    *   **P1:** First execution at 0. $RT_{P1} = 0 - 0 = 0$ ms.
    *   **P2:** First execution at 1. $RT_{P2} = 1 - 1 = 0$ ms.
    *   **P3:** First execution at 18. $RT_{P3} = 18 - 2 = 16$ ms.
    *   **P4:** First execution at 11. $RT_{P4} = 11 - 3 = 8$ ms.

6.  **Calculate Average Metrics:**
    *   **Average Turnaround Time:** $\frac{15 + 7 + 19 + 15}{4} = \frac{56}{4} = \textbf{14 ms}$
    *   **Average Waiting Time:** $\frac{10 + 0 + 16 + 9}{4} = \frac{35}{4} = \textbf{8.75 ms}$
    *   **Average Response Time:** $\frac{0 + 0 + 16 + 8}{4} = \frac{24}{4} = \textbf{6 ms}$

| Process | AT | BT | Prio | CT | TT | WT | RT |
| :------ | :-- | :-- | :--- | :-- | :-- | :-- | :-- |
| P1      | 0   | 5   | 2    | 15 | 15 | 10 | 0  |
| P2      | 1   | 7   | 1    | 8  | 7  | 0  | 0  |
| P3      | 2   | 3   | 3    | 21 | 19 | 16 | 16 |
| P4      | 3   | 6   | 2    | 18 | 15 | 9  | 8  |
| **Avg** |     |     |      |    | **14** | **8.75** | **6** |

**Reflection:** This example demonstrates the power and complexity of priority scheduling, especially when combined with preemption and Round Robin for ties. P2 (highest priority) ran uninterrupted once it arrived. P3 (lowest priority) suffered significant waiting and response time, illustrating the starvation problem that can arise. The detailed step-by-step tracking of the ready queue and preemption decisions is crucial for correctness.

## 6. Common mistakes and traps

Students often stumble on specific details when learning CPU scheduling. Be aware of these common pitfalls:

1.  **Confusing Preemptive vs. Non-Preemptive:** This is perhaps the most frequent error.
    *   **Trap:** Assuming a non-preemptive algorithm (like FCFS or non-preemptive SJF) will switch processes when a higher-priority or shorter job arrives *mid-execution*.
    *   **Why it happens:** Forgetting that non-preemptive means "once started, runs to completion (or I/O block)."
    *   **Correction:** Always check the algorithm's type. If non-preemptive, the current process *must* finish its CPU burst before the scheduler considers new arrivals or shorter jobs.

2.  **Incorrectly Calculating Remaining Time in SRTF:**
    *   **Trap:** Forgetting to subtract the time a process has already run when a preemption check occurs.
    *   **Why it happens:** Only looking at the original burst time instead of the *remaining* burst time.
    *   **Correction:** Always keep a running tally of remaining burst time for *all* processes, especially the one currently on the CPU. When a new process arrives, compare its *total* burst time with the *remaining* burst time of the running process.

3.  **Ignoring Arrival Times:**
    *   **Trap:** Scheduling all processes as if they arrived at time 0, even when given explicit arrival times.
    *   **Why it happens:** Simplifying the problem or focusing only on burst times.
    *   **Correction:** The scheduler can only choose from processes that have *already arrived* and are in the ready queue. Processes arriving later cannot be scheduled