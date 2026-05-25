## 1. What it is — in plain English

Imagine you're running a busy kitchen, and you're the head chef (that's the Operating System). Your main stove (that's the CPU) can only cook one dish (process) at a time. Many orders (tasks) come in, and you need to decide which dish to cook when, for how long, and in what order. The "scheduling goals" are simply the different ways you measure how good a job you're doing as a chef.

Are you keeping the stove busy all the time? That's **CPU utilization**. Are you churning out completed dishes quickly, regardless of how long each takes? That's **throughput**. How long does it take from the moment a customer places an order until their food is completely ready and served? That's **turnaround time**.

How much time does an order spend just sitting on the counter, waiting for an available burner, not even being prepped? That's **waiting time**. And how quickly can you give the customer a little taste or appetizer, even if the main dish isn't ready yet? That's **response time**. These five goals help you evaluate if your kitchen (computer system) is running efficiently and satisfying its "customers" (users or other programs).

## 2. Why it matters — real-world applications

Understanding scheduling goals is fundamental because it directly impacts the performance, responsiveness, and efficiency of almost every computing system we interact with.

1.  **Cloud Computing and Data Centers (e.g., AWS EC2, Google Cloud Platform):** In these environments, companies rent out virtual machines (VMs) or containers to thousands of customers. **CPU utilization** is paramount for profitability – they want to keep their expensive server CPUs as busy as possible, ideally close to 100%, without overloading them to the point of unresponsiveness. Simultaneously, for interactive services hosted on these platforms (like web servers or databases), low **response time** is critical to ensure a snappy user experience. A high **throughput** is also desired to process as many client requests per second as possible.

2.  **High-Performance Computing (HPC) and Scientific Simulations (e.g., CERN's Large Hadron Collider, Climate Modeling):** These systems often run massive, long-duration computations. For tasks like simulating particle collisions or predicting weather patterns, the primary goal is often to maximize **throughput** – completing as many large simulation runs as possible within a given timeframe. **Turnaround time** is also crucial, as researchers want their multi-day or multi-week simulations to complete as quickly as possible from submission to result. While CPU utilization is high, the focus shifts to ensuring that the most critical, longest-running jobs get their dedicated time without excessive waiting.

3.  **Real-time Systems (e.g., Aerospace Flight Control, Medical Devices):** In systems where timing is absolutely critical and failures can be catastrophic, **response time** and **turnaround time** are not just goals, but often strict deadlines. For instance, an aircraft's flight control system must respond to pilot input or sensor data within milliseconds. Missing a deadline could lead to a crash. Similarly, an automated insulin pump must respond to glucose level changes within a guaranteed timeframe. These systems prioritize predictability and meeting deadlines over maximizing CPU utilization or throughput.

4.  **Interactive User Interfaces and Gaming:** When you're using a word processor, browsing the web, or playing a video game, you expect immediate feedback. Clicking a button should show an effect instantly. This is all about minimizing **response time**. Even if a complex background task is running (like saving a large file or loading a new game level), the system's scheduler tries to give the foreground interactive application enough CPU time to feel responsive, even if it means slightly delaying the background task's **turnaround time**.

## 3. Prerequisites — what you must know first

Before diving deep into scheduling goals, ensure you have a solid grasp of these foundational concepts:

*   **Process:** A program in execution; it's an active entity that requires system resources like CPU time, memory, and I/O.
*   **Thread:** A basic unit of CPU utilization within a process; multiple threads can exist within a single process, sharing its resources but having their own execution flow.
*   **CPU (Central Processing Unit):** The "brain" of the computer, responsible for executing instructions and performing computations.
*   **Operating System (OS):** The software that manages computer hardware and software resources, acting as an intermediary between user applications and the hardware.
*   **Context Switching:** The mechanism by which the OS saves the state (context) of one process or thread and restores the state of another, allowing multiple processes to share a single CPU.
*   **Process States:** The different phases a process can be in during its lifecycle (e.g., New, Ready, Running, Waiting, Terminated).
*   **Scheduler:** The component of the OS that selects which process from the ready queue should be executed next by the CPU.

## 4. The core idea — step by step

The core idea behind scheduling goals is to provide a set of quantifiable metrics that allow us to evaluate the effectiveness of a CPU scheduling algorithm. Different algorithms prioritize different goals, leading to trade-offs.

### Step 1: CPU Utilization

The first goal is to keep the CPU as busy as possible. A busy CPU is a productive CPU, and since the CPU is one of the most expensive resources in a computer system, wasting its time means wasting money and potential computation.

*   **Plain-English Statement:** How much of the total available time the CPU is actively working on tasks, rather than sitting idle.
*   **Small Concrete Example:** If your CPU is running for 90 seconds in a 100-second interval, its utilization is 90%.
*   **Formal/Mathematical Version:**
    $$ U = \frac{\text{Busy Time}}{\text{Total Time}} \times 100\% $$
    Where:
    *   $U$ is CPU Utilization
    *   $\text{Busy Time}$ is the cumulative time the CPU is executing processes.
    *   $\text{Total Time}$ is the total observation period.
*   **What Could Go Wrong:** While high utilization generally sounds good, pushing it too close to 100% can lead to system saturation. This might mean processes spend an excessive amount of time waiting, leading to poor responsiveness for interactive tasks and high latency, even if the CPU is technically "busy." It's a balance between efficiency and responsiveness.

### Step 2: Throughput

This goal focuses on the rate at which the system completes tasks. It's a measure of overall productivity.

*   **Plain-English Statement:** The number of processes or tasks that are completed and exit the system per unit of time.
*   **Small Concrete Example:** If a system finishes 50 tasks in 10 minutes, its throughput is 5 tasks per minute.
*   **Formal/Mathematical Version:**
    $$ T = \frac{\text{Number of Processes Completed}}{\text{Total Time}} $$
    Where:
    *   $T$ is Throughput
    *   $\text{Number of Processes Completed}$ is the count of tasks that finished execution.
    *   $\text{Total Time}$ is the total observation period.
*   **What Could Go Wrong:** An algorithm might achieve high throughput by prioritizing many short tasks, potentially starving long-running tasks. Conversely, an algorithm that prioritizes long tasks might have lower throughput but ensures critical, compute-intensive jobs complete without excessive delays. Throughput alone doesn't tell you anything about how *fairly* the CPU is being shared or how long individual tasks take.

### Step 3: Turnaround Time

This metric measures the total time a specific process spends within the system, from its arrival to its completion. It encompasses waiting, execution, and I/O time.

*   **Plain-English Statement:** The total duration a process exists in the system, from the moment it arrives until it finishes executing and leaves. Think of it as the "door-to-door" time for a task.
*   **Small Concrete Example:** A process arrives at time $t=0$ seconds and finishes at $t=15$ seconds. Its turnaround time is 15 seconds. If it arrives at $t=5$ seconds and finishes at $t=20$ seconds, its turnaround time is $20 - 5 = 15$ seconds.
*   **Formal/Mathematical Version:**
    $$ TAT_i = C_i - A_i $$
    Where:
    *   $TAT_i$ is the Turnaround Time for process $i$.
    *   $C_i$ is the Completion Time of process $i$.
    *   $A_i$ is the Arrival Time of process $i$.
*   **What Could Go Wrong:** Minimizing average turnaround time is a common goal, but it can sometimes come at the expense of fairness or responsiveness for other processes. For instance, always running the shortest job first might lead to excellent average turnaround time but could indefinitely delay very long jobs if short jobs keep arriving.

### Step 4: Waiting Time

This goal focuses on the time a process spends idle in the ready queue, waiting for the CPU to become available.

*   **Plain-English Statement:** The cumulative amount of time a process spends waiting in the "ready" state, not actively using the CPU. It's the time it spends *not* running, even when it's ready to run.
*   **Small Concrete Example:** A process needs 10 seconds of CPU time. It arrives at $t=0$. It starts executing at $t=3$ seconds, runs for 5 seconds, then gets preempted. It resumes at $t=10$ seconds and finishes at $t=15$ seconds. Its total execution time is 10 seconds. Its turnaround time is 15 seconds. Its waiting time is $15 - 10 = 5$ seconds. (It waited for 3 seconds initially, and then for $10-5=5$ seconds after preemption, but the formula $TAT - BT$ correctly captures this total).
*   **Formal/Mathematical Version:**
    $$ WT_i = TAT_i - BT_i $$
    Or, equivalently:
    $$ WT_i = (C_i - A_i) - BT_i $$
    Where:
    *   $WT_i$ is the Waiting Time for process $i$.
    *   $TAT_i$ is the Turnaround Time for process $i$.
    *   $BT_i$ is the Burst Time (total CPU execution time required) for process $i$.
*   **What Could Go Wrong:** High waiting times indicate that processes are spending too much time idle, leading to user frustration for interactive applications and inefficient use of resources. Minimizing waiting time is crucial for responsive systems, but it often conflicts with maximizing throughput or CPU utilization if not managed carefully.

### Step 5: Response Time

This metric is particularly important for interactive systems, as it measures how quickly a user perceives that a system has started to respond.

*   **Plain-English Statement:** The time from when a request (like a key press or mouse click) is submitted until the system produces its *first* response. It's about the initial feedback, not necessarily the full completion of the task.
*   **Small Concrete Example:** You type a character into a text editor. The time from your key press until the character appears on screen is the response time. The full "turnaround time" might include saving the file, spell-checking, etc., but the *response* is immediate. A batch job might have a very long turnaround time, but its response time (time until it starts printing its first line of output) could still be short.
*   **Formal/Mathematical Version:**
    $$ RT_i = F_i - A_i $$
    Where:
    *   $RT_i$ is the Response Time for process $i$.
    *   $F_i$ is the First Execution Time (the time when process $i$ first gets the CPU).
    *   $A_i$ is the Arrival Time of process $i$.
*   **What Could Go Wrong:** An algorithm might achieve excellent response times for all processes by rapidly switching between them (e.g., Round Robin). However, frequent context switching can introduce overhead, potentially reducing overall CPU utilization and increasing average turnaround time and waiting time. Optimizing for response time often means sacrificing some throughput or turnaround time for non-interactive tasks.

## 5. Worked examples — multiple, with every step shown

We will use a Gantt chart to visualize the execution of processes over time. The processes are defined by their arrival time ($A_i$) and burst time ($BT_i$, the total CPU time they need). For simplicity, we assume no I/O operations and zero context-switch overhead unless otherwise specified.

**Process Table:**

| Process | Arrival Time ($A_i$) | Burst Time ($BT_i$) |
| :------ | :------------------- | :------------------ |
| P1      | 0                    | 8                   |
| P2      | 1                    | 4                   |
| P3      | 2                    | 9                   |
| P4      | 3                    | 5                   |

---

### Example 1: First-Come, First-Served (FCFS) Scheduling

**Problem:** Calculate CPU Utilization, Throughput, Average Turnaround Time, Average Waiting Time, and Average Response Time for the given processes using the FCFS scheduling algorithm.

**Given:**
*   Processes: P1, P2, P3, P4
*   Arrival Times: $A_1=0, A_2=1, A_3=2, A_4=3$
*   Burst Times: $BT_1=8, BT_2=4, BT_3=9, BT_4=5$
*   Scheduling Algorithm: FCFS (non-preemptive)

**What we want:**
*   CPU Utilization
*   Throughput
*   Average Turnaround Time
*   Average Waiting Time
*   Average Response Time

**Step-by-step Solution:**

1.  **Construct the Gantt Chart:** In FCFS, processes are executed in the order they arrive. If they arrive at the same time, their process ID can be used as a tie-breaker (P1 before P2, etc.). Since FCFS is non-preemptive, once a process starts, it runs to completion.

    *   P1 arrives at $t=0$ and starts immediately. It runs for 8 units.
    *   P2 arrives at $t=1$, P3 at $t=2$, P4 at $t=3$. All wait for P1 to finish.
    *   P1 finishes at $t=0+8=8$.
    *   P2 starts at $t=8$ (as it arrived first among waiting processes) and runs for 4 units.
    *   P2 finishes at $t=8+4=12$.
    *   P3 starts at $t=12$ and runs for 9 units.
    *   P3 finishes at $t=12+9=21$.
    *   P4 starts at $t=21$ and runs for 5 units.
    *   P4 finishes at $t=21+5=26$.

    ```text
    | P1 | P2 | P3 | P4 |
    0    8    12   21   26
    ```

2.  **Calculate Completion Time ($C_i$), First Execution Time ($F_i$), Turnaround Time ($TAT_i$), Waiting Time ($WT_i$), and Response Time ($RT_i$) for each process:**

    *   **Process P1:**
        *   $A_1 = 0$, $BT_1 = 8$
        *   $F_1 = 0$ (Starts at 0)
        *   $C_1 = 8$ (Finishes at 8)
        *   $TAT_1 = C_1 - A_1 = 8 - 0 = 8$
        *   $WT_1 = TAT_1 - BT_1 = 8 - 8 = 0$
        *   $RT_1 = F_1 - A_1 = 0 - 0 = 0$

    *   **Process P2:**
        *   $A_2 = 1$, $BT_2 = 4$
        *   $F_2 = 8$ (Starts at 8)
        *   $C_2 = 12$ (Finishes at 12)
        *   $TAT_2 = C_2 - A_2 = 12 - 1 = 11$
        *   $WT_2 = TAT_2 - BT_2 = 11 - 4 = 7$
        *   $RT_2 = F_2 - A_2 = 8 - 1 = 7$

    *   **Process P3:**
        *   $A_3 = 2$, $BT_3 = 9$
        *   $F_3 = 12$ (Starts at 12)
        *   $C_3 = 21$ (Finishes at 21)
        *   $TAT_3 = C_3 - A_3 = 21 - 2 = 19$
        *   $WT_3 = TAT_3 - BT_3 = 19 - 9 = 10$
        *   $RT_3 = F_3 - A_3 = 12 - 2 = 10$

    *   **Process P4:**
        *   $A_4 = 3$, $BT_4 = 5$
        *   $F_4 = 21$ (Starts at 21)
        *   $C_4 = 26$ (Finishes at 26)
        *   $TAT_4 = C_4 - A_4 = 26 - 3 = 23$
        *   $WT_4 = TAT_4 - BT_4 = 23 - 5 = 18$
        *   $RT_4 = F_4 - A_4 = 21 - 3 = 18$

    **Summary Table for FCFS:**

    | Process | $A_i$ | $BT_i$ | $F_i$ | $C_i$ | $TAT_i$ | $WT_i$ | $RT_i$ |
    | :------ | :---- | :----- | :---- | :---- | :------ | :----- | :----- |
    | P1      | 0     | 8      | 0     | 8     | 8       | 0      | 0      |
    | P2      | 1     | 4      | 8     | 12    | 11      | 7      | 7      |
    | P3      | 2     | 9      | 12    | 21    | 19      | 10     | 10     |
    | P4      | 3     | 5      | 21    | 26    | 23      | 18     | 18     |

3.  **Calculate Average Metrics:**

    *   **Average Turnaround Time:**
        $$ \text{Avg TAT} = \frac{8 + 11 + 19 + 23}{4} = \frac{61}{4} = 15.25 $$
        *Explanation:* Sum all individual turnaround times and divide by the number of processes.

    *   **Average Waiting Time:**
        $$ \text{Avg WT} = \frac{0 + 7 + 10 + 18}{4} = \frac{35}{4} = 8.75 $$
        *Explanation:* Sum all individual waiting times and divide by the number of processes.

    *   **Average Response Time:**
        $$ \text{Avg RT} = \frac{0 + 7 + 10 + 18}{4} = \frac{35}{4} = 8.75 $$
        *Explanation:* Sum all individual response times and divide by the number of processes. Note that for non-preemptive algorithms, $WT_i = RT_i$.

4.  **Calculate CPU Utilization and Throughput:**

    *   **Total Time:** The last process (P4) finishes at $t=26$. So, the total observation time is 26 units.
        *Explanation:* The total time is simply the completion time of the last process.
    *   **Busy Time:** The CPU was busy for the entire duration from $t=0$ to $t=26$.
        *Explanation:* Since there were always processes ready to run after the first one, and FCFS is non-preemptive, the CPU never idled.
        $$ \text{Busy Time} = \sum BT_i = 8+4+9+5 = 26 $$
    *   **CPU Utilization:**
        $$ U = \frac{\text{Busy Time}}{\text{Total Time}} \times 100\% = \frac{26}{26} \times 100\% = 100\% $$
        *Explanation:* The CPU was busy for all 26 units of time out of a total observation time of 26 units.
    *   **Throughput:**
        $$ T = \frac{\text{Number of Processes Completed}}{\text{Total Time}} = \frac{4}{26} \approx 0.1538 \text{ processes/unit time} $$
        *Explanation:* 4 processes were completed in 26 units of time.

**Final Answer (FCFS):**
*   **CPU Utilization: 100%**
*   **Throughput: 0.1538 processes/unit time**
*   **Average Turnaround Time: 15.25**
*   **Average Waiting Time: 8.75**
*   **Average Response Time: 8.75**

**Reflection:** FCFS is simple but can lead to long waiting times for short processes if a long process arrives first. Here, P1 (8 units) blocks P2 (4 units) for a significant duration, causing P2's waiting time to be high.

---

### Example 2: Shortest Job First (SJF) - Non-Preemptive

**Problem:** Calculate CPU Utilization, Throughput, Average Turnaround Time, Average Waiting Time, and Average Response Time for the given processes using the non-preemptive SJF scheduling algorithm.

**Given:**
*   Processes: P1, P2, P3, P4
*   Arrival Times: $A_1=0, A_2=1, A_3=2, A_4=3$
*   Burst Times: $BT_1=8, BT_2=4, BT_3=9, BT_4=5$
*   Scheduling Algorithm: SJF (non-preemptive)

**What we want:** Same metrics as Example 1.

**Step-by-step Solution:**

1.  **Construct the Gantt Chart:** In non-preemptive SJF, the CPU is assigned to the process with the smallest burst time among those *available* (arrived) at that moment. Once a process starts, it runs to completion.

    *   At $t=0$, only P1 has arrived. P1 starts. $BT_1=8$.
    *   P1 runs from $t=0$ to $t=8$.
    *   During P1's execution:
        *   At $t=1$, P2 arrives ($BT_2=4$).
        *   At $t=2$, P3 arrives ($BT_3=9$).
        *   At $t=3$, P4 arrives ($BT_4=5$).
    *   At $t=8$, P1 finishes. The ready queue contains P2 (BT=4), P3 (BT=9), P4 (BT=5).
    *   The shortest burst time among these is P2 ($BT_2=4$). P2 starts.
    *   P2 runs from $t=8$ to $t=8+4=12$.
    *   At $t=12$, P2 finishes. The ready queue contains P3 (BT=9), P4 (BT=5).
    *   The shortest burst time is P4 ($BT_4=5$). P4 starts.
    *   P4 runs from $t=12$ to $t=12+5=17$.
    *   At $t=17$, P4 finishes. The ready queue contains only P3 (BT=9). P3 starts.
    *   P3 runs from $t=17$ to $t=17+9=26$.
    *   At $t=26$, P3 finishes.

    ```text
    | P1 | P2 | P4 | P3 |
    0    8    12   17   26
    ```

2.  **Calculate Completion Time ($C_i$), First Execution Time ($F_i$), Turnaround Time ($TAT_i$), Waiting Time ($WT_i$), and Response Time ($RT_i$) for each process:**

    *   **Process P1:**
        *   $A_1 = 0$, $BT_1 = 8$
        *   $F_1 = 0$
        *   $C_1 = 8$
        *   $TAT_1 = 8 - 0 = 8$
        *   $WT_1 = 8 - 8 = 0$
        *   $RT_1 = 0 - 0 = 0$

    *   **Process P2:**
        *   $A_2 = 1$, $BT_2 = 4$
        *   $F_2 = 8$
        *   $C_2 = 12$
        *   $TAT_2 = 12 - 1 = 11$
        *   $WT_2 = 11 - 4 = 7$
        *   $RT_2 = 8 - 1 = 7$

    *   **Process P3:**
        *   $A_3 = 2$, $BT_3 = 9$
        *   $F_3 = 17$
        *   $C_3 = 26$
        *   $TAT_3 = 26 - 2 = 24$
        *   $WT_3 = 24 - 9 = 15$
        *   $RT_3 = 17 - 2 = 15$

    *   **Process P4:**
        *   $A_4 = 3$, $BT_4 = 5$
        *   $F_4 = 12$
        *   $C_4 = 17$
        *   $TAT_4 = 17 - 3 = 14$
        *   $WT_4 = 14 - 5 = 9$
        *   $RT_4 = 12 - 3 = 9$

    **Summary Table for SJF Non-Preemptive:**

    | Process | $A_i$ | $BT_i$ | $F_i$ | $C_i$ | $TAT_i$ | $WT_i$ | $RT_i$ |
    | :------ | :---- | :----- | :---- | :---- | :------ | :----- | :----- |
    | P1      | 0     | 8      | 0     | 8     | 8       | 0      | 0      |
    | P2      | 1     | 4      | 8     | 12    | 11      | 7      | 7      |
    | P3      | 2     | 9      | 17    | 26    | 24      | 15     | 15     |
    | P4      | 3     | 5      | 12    | 17    | 14      | 9      | 9      |

3.  **Calculate Average Metrics:**

    *   **Average Turnaround Time:**
        $$ \text{Avg TAT} = \frac{8 + 11 + 24 + 14}{4} = \frac{57}{4} = 14.25 $$
    *   **Average Waiting Time:**
        $$ \text{Avg WT} = \frac{0 + 7 + 15 + 9}{4} = \frac{31}{4} = 7.75 $$
    *   **Average Response Time:**
        $$ \text{Avg RT} = \frac{0 + 7 + 15 + 9}{4} = \frac{31}{4} = 7.75 $$

4.  **Calculate CPU Utilization and Throughput:**

    *   **Total Time:** The last process (P3) finishes at $t=26$.
    *   **Busy Time:** $\sum BT_i = 8+4+9+5 = 26$.
    *   **CPU Utilization:**
        $$ U = \frac{26}{26} \times 100\% = 100\% $$
    *   **Throughput:**
        $$ T = \frac{4}{26} \approx 0.1538 \text{ processes/unit time} $$

**Final Answer (SJF Non-Preemptive):**
*   **CPU Utilization: 100%**
*   **Throughput: 0.1538 processes/unit time**
*   **Average Turnaround Time: 14.25**
*   **Average Waiting Time: 7.75**
*   **Average Response Time: 7.75**

**Reflection:** Compared to FCFS, SJF (non-preemptive) generally yields better average turnaround and waiting times (14.25 vs 15.25 for TAT, 7.75 vs 8.75 for WT/RT). This is because it prioritizes shorter jobs, reducing their waiting time and thus the overall average. However, P1 still runs first because it's the only one available at $t=0$, delaying the shorter P2.

---

### Example 3: Shortest Remaining Time First (SRTF) / Preemptive SJF

**Problem:** Calculate CPU Utilization, Throughput, Average Turnaround Time, Average Waiting Time, and Average Response Time for the given processes using the Preemptive SJF (SRTF) scheduling algorithm.

**Given:**
*   Processes: P1, P2, P3, P4
*   Arrival Times: $A_1=0, A_2=1, A_3=2, A_4=3$
*   Burst Times: $BT_1=8, BT_2=4, BT_3=9, BT_4=5$
*   Scheduling Algorithm: SRTF (preemptive SJF)

**What we want:** Same metrics as Example 1.

**Step-by-step Solution:**

1.  **Construct the Gantt Chart:** In SRTF, the CPU is always given to the process with the smallest *remaining* burst time. If a new process arrives with a shorter burst time than the currently running process's remaining time, the current process is preempted.

    *   **t=0:** P1 arrives ($BT_1=8$). P1 starts.
        ```
        | P1 |
        0    1
        ```
    *   **t=1:** P2 arrives ($BT_2=4$). P1's remaining time is $8-1=7$. P2's burst time is 4. Since $4 < 7$, P1 is preempted. P2 starts.
        ```
        | P1 | P2 |
        0    1    2
        ```
    *   **t=2:** P3 arrives ($BT_3=9$). P2's remaining time is $4-1=3$. P3's burst time is 9. Since $3 < 9$ (P2 still shortest), P2 continues.
        ```
        | P1 | P2 |
        0    1    3
        ```
    *   **t=3:** P4 arrives ($BT_4=5$). P2's remaining time is $3-1=2$. P4's burst time is 5. Since $2 < 5$ (P2 still shortest), P2 continues.
        ```
        | P1 | P2 |
        0    1    5
        ```
    *   **t=5:** P2 finishes (ran from $t=1$ to $t=5$, total 4 units).
        *   Ready queue now contains: P1 (remaining 7), P3 (burst 9), P4 (burst 5).
        *   Shortest is P4 ($BT_4=5$). P4 starts.
        ```
        | P1 | P2 | P4 |
        0    1    5    6
        ```
    *   **t=6:** P4 runs. No new arrivals. P4 continues.
    *   **t=10:** P4 finishes (ran from $t=5$ to $t=10$, total 5 units).
        *   Ready queue now contains: P1 (remaining 7), P3 (burst 9).
        *   Shortest is P1 ($BT_1=7$). P1 starts.
        ```
        | P1 | P2 | P4 | P1 |
        0    1    5    10   11
        ```
    *   **t=11:** P1 runs. No new arrivals. P1 continues.
    *   **t=17:** P1 finishes (ran from $t=10$ to $t=17$, total 7 units).
        *   Ready queue now contains: P3 (burst 9).
        *   P3 starts.
        ```
        | P1 | P2 | P4 | P1 | P3 |
        0    1    5    10   17   18
        ```
    *   **t=18:** P3 runs. No new arrivals. P3 continues.
    *   **t=26:** P3 finishes (ran from $t=17$ to $t=26$, total 9 units).

    Final Gantt Chart:
    ```text
    | P1 | P2 | P4 | P1 | P3 |
    0    1    5    10   17   26
    ```

2.  **Calculate $C_i$, $F_i$, $TAT_i$, $WT_i$, and $RT_i$ for each process:**

    *   **Process P1:**
        *   $A_1 = 0$, $BT_1 = 8$
        *   $F_1 = 0$ (Starts at 0)
        *   $C_1 = 17$ (Finishes at 17)
        *   $TAT_1 = 17 - 0 = 17$
        *   $WT_1 = TAT_1 - BT_1 = 17 - 8 = 9$
        *   $RT_1 = F_1 - A_1 = 0 - 0 = 0$

    *   **Process P2:**
        *   $A_2 = 1$, $BT_2 = 4$
        *   $F_2 = 1$ (Starts at 1)
        *   $C_2 = 5$ (Finishes at 5)
        *   $TAT_2 = 5 - 1 = 4$
        *   $WT_2 = TAT_2 - BT_2 = 4 - 4 = 0$
        *   $RT_2 = F_2 - A_2 = 1 - 1 = 0$

    *   **Process P3:**
        *   $A_3 = 2$, $BT_3 = 9$
        *   $F_3 = 17$ (Starts at 17)
        *   $C_3 = 26$ (Finishes at 26)
        *   $TAT_3 = 26 - 2 = 24$
        *   $WT_3 = TAT_3 - BT_3 = 24 - 9 = 15$
        *   $RT_3 = F_3 - A_3 = 17 - 2 = 15$

    *   **Process P4:**
        *   $A_4 = 3$, $BT_4 = 5$
        *   $F_4 = 5$ (Starts at 5)
        *   $C_4 = 10$ (Finishes at 10)
        *   $TAT_4 = 10 - 3 = 7$
        *   $WT_4 = TAT_4 - BT_4 = 7 - 5 = 2$
        *   $RT_4 = F_4 - A_4 = 5 - 3 = 2$

    **Summary Table for SRTF:**

    | Process | $A_i$ | $BT_i$ | $F_i$ | $C_i$ | $TAT_i$ | $WT_i$ | $RT_i$ |
    | :------ | :---- | :----- | :---- | :---- | :------ | :----- | :----- |
    | P1      | 0     | 8      | 0     | 17    | 17      | 9      | 0      |
    | P2      | 1     | 4      | 1     | 5     | 4       | 0      | 0      |
    | P3      | 2     | 9      | 17    | 26    | 24      | 15     | 15     |
    | P4      | 3     | 5      | 5     | 10    | 7       | 2      | 2      |

3.  **Calculate Average Metrics:**

    *   **Average Turnaround Time:**
        $$ \text{Avg TAT} = \frac{17 + 4 + 24 + 7}{4} = \frac{52}{4} = 13.0 $$
    *   **Average Waiting Time:**
        $$ \text{Avg WT} = \frac{9 + 0 + 15 + 2}{4} = \frac{26}{4} = 6.5 $$
    *   **Average Response Time:**
        $$ \text{Avg RT} = \frac{0 + 0 + 15 + 2}{4} = \frac{17}{4} = 4.25 $$

4.  **Calculate CPU Utilization and Throughput:**

    *   **Total Time:** The last process (P3) finishes at $t=26$.
    *   **Busy Time:** $\sum BT_i = 8+4+9+5 = 26$.
    *   **CPU Utilization:**
        $$ U = \frac{26}{26} \times 100\% = 100\% $$
    *   **Throughput:**
        $$ T = \frac{4}{26} \approx 0.1538 \text{ processes/unit time} $$

**Final Answer (SRTF):**
*   **CPU Utilization: 100%**
*   **Throughput: 0.1538 processes/unit time**
*   **Average Turnaround Time: 13.0**
*   **Average Waiting Time: 6.5**
*   **Average Response Time: 4.25**

**Reflection:** SRTF significantly improves average waiting and turnaround times compared to FCFS and non-preemptive SJF (e.g., Avg TAT: 13.0 vs 15.25/14.25; Avg WT: 6.5 vs 8.75/7.75). It does this by aggressively prioritizing shorter jobs, even preempting longer ones. Notice P2 and P4 have very low waiting/response times. However, P3, the longest job, suffers from very high waiting and turnaround times (24 and 15), demonstrating the potential for starvation or very poor performance for long jobs if short jobs continuously arrive. Also, the CPU utilization and throughput remain the same as previous examples because there's no idle time and the same number of processes are completed over the same total time.

---

### Example 4: Round Robin (RR) Scheduling

**Problem:** Calculate CPU Utilization, Throughput, Average Turnaround Time, Average Waiting Time, and Average Response Time for the given processes using the Round Robin scheduling algorithm with a time quantum of $q=2$.

**Given:**
*   Processes: P1, P2, P3, P4
*   Arrival Times: $A_1=0, A_2=1, A_3=2, A_4=3$
*   Burst Times: $BT_1=8, BT_2=4, BT_3=9, BT_4=5$
*   Scheduling Algorithm: Round Robin (preemptive)
*   Time Quantum ($q$): 2 units

**What we want:** Same metrics as Example 1.

**Step-by-step Solution:**

1.  **Construct the Gantt Chart:** In Round Robin, processes are executed in a cyclic manner, each getting a fixed time quantum. If a process doesn't complete within its quantum, it's preempted and moved to the end of the ready queue.

    *   **t=0:** P1 arrives. P1 starts. (Remaining $BT_1=8$).
    *   **t=1:** P2 arrives. Ready Queue: [P2].
    *   **t=2:** P1's quantum expires. P1 preempted. (Remaining $BT_1=6$). Ready Queue: [P2, P1]. P2 starts.
    *   **t=3:** P3 arrives. Ready Queue: [P1, P3]. P4 arrives. Ready Queue: [P1, P3, P4].
    *   **t=4:** P2's quantum expires. P2 preempted. (Remaining $BT_2=2$). Ready Queue: [P1, P3, P4, P2]. P1 starts.
    *   **t=6:** P1's quantum expires. P1 preempted. (Remaining $BT_1=4$). Ready Queue: [P3, P4, P2, P1]. P3 starts.
    *   **t=8:** P3's quantum expires. P3 preempted. (Remaining $BT_3=7$). Ready Queue: [P4, P2, P1, P3]. P4 starts.
    *   **t=10:** P4's quantum expires. P4 preempted. (Remaining $BT_4=3$). Ready Queue: [P2, P1, P3, P4]. P2 starts.
    *   **t=12:** P2 finishes (Remaining $BT_2=0$). Ready Queue: [P1, P3, P4]. P1 starts.
    *   **t=14:** P1's quantum expires. P1 preempted. (Remaining $BT_1=2$). Ready Queue: [P3, P4, P1]. P3 starts.
    *   **t=16:** P3's quantum expires. P3 preempted. (Remaining $BT_3=5$). Ready Queue: [P4, P1, P3]. P4 starts.
    *   **t=18:** P4's quantum expires. P4 preempted. (Remaining $BT_4=1$). Ready Queue: [P1, P3, P4]. P1 starts.
    *   **t=20:** P1 finishes (Remaining $BT_1=0$). Ready Queue: [P3, P4]. P3 starts.
    *   **t=22:** P3's quantum expires. P3 preempted. (Remaining $BT_3=3$). Ready Queue: [P4, P3]. P4 starts.
    *   **t=24:** P4 finishes (Remaining $BT_4=0$). Ready Queue: [P3]. P3 starts.
    *   **t=26:** P3's quantum expires. P3 preempted. (Remaining $BT_3=1$). Ready Queue: [P3]. P3 starts.
    *   **t=27:** P3 finishes (Remaining $BT_3=0$). Ready Queue: [].

    Final Gantt Chart:
    ```text
    | P1 | P2 | P1 | P3 | P4 | P2 | P1 | P3 | P4 | P1 | P3 | P4 | P3 |
    0    2    4    6    8    10   12   14   16   18   20   22   24   26   27
    ```
    *Note: The last segment for P3 is 1 unit long (from 26 to 27), as it only needed 1 more unit to finish.*

2.  **Calculate $C_i$, $F_i$, $TAT_i$, $WT_i$, and $RT_i$ for each process:**

    *   **Process P1:** ($A_1=0, BT_1=8$)
        *   $F_1 = 0$
        *   Ran: [0-2], [4-6], [12-14], [18-20]. Total CPU time = 8.
        *   $C_1 = 20$
        *   $TAT_1 = 20 - 0 = 20$
        *   $WT_1 = TAT_1 - BT_1 = 20 - 8 = 12$
        *   $RT_1 = F_1 - A_1 = 0 - 0 = 0$

    *   **Process P2:** ($A_2=1, BT_2=4$)
        *   $F_2 = 2$
        *   Ran: [2-4], [10-12]. Total CPU time = 4.
        *   $C_2 = 12$
        *   $TAT_2 = 12 - 1 = 11$
        *   $WT_2 = TAT_2 - BT_2 = 11 - 4 = 7$
        *   $RT_2 = F_2 - A_2 = 2 - 1 = 1$

    *   **Process P3:** ($A_3=2, BT_3=9$)
        *   $F_3 = 6$
        *   Ran: [6-8], [14-16], [20-22], [26-27]. Total CPU time = 9.
        *   $C_3 = 27$
        *   $TAT_3 = 27 - 2 = 25$
        *   $WT_3 = TAT_3 - BT_3 = 25 - 9 = 16$
        *   $RT_3 = F_3 - A_3 = 6 - 2 = 4$

    *   **Process P4:** ($A_4=3, BT_4=5$)
        *   $F_4 = 8$
        *   Ran: [8-10], [16-18], [22-24]. Total CPU time = 5.
        *   $C_4 = 24$
        *   $TAT_4 = 24 - 3 = 21$
        *   $WT_4 = TAT_4 - BT_4 = 21 - 5 = 16$
        *   $RT_4 = F_4 - A_4 = 8 - 3 = 5$

    **Summary Table for Round Robin (q=2):**

    | Process | $A_i$ | $BT_i$ | $F_i$ | $C_i$ | $TAT_i$ | $WT_i$ | $RT_i$ |
    | :------ | :---- | :----- | :---- | :---- | :------ | :----- | :----- |
    | P1      | 0     | 8      | 0     | 20    | 20      | 12     | 0      |
    | P2      | 1     | 4      | 2     | 12    | 11      | 7      | 1      |
    | P3      | 2     | 9      | 6     | 27    | 25      | 16     | 4      |
    | P4      | 3     | 5      | 8     | 24    | 21      | 16     | 5      |

3.  **Calculate Average Metrics:**

    *   **Average Turnaround Time:**
        $$ \text{Avg TAT} = \frac{20 + 11 + 25 + 21}{4} = \frac{77}{4} = 19.25 $$
    *   **Average Waiting Time:**
        $$ \text{Avg WT} = \frac{12 + 7 + 16 + 16}{4} = \frac{51}{4} = 12.75 $$
    *   **Average Response Time:**
        $$ \text{Avg RT} = \frac{0 + 1 + 4 + 5}{4} = \frac{10}{4} = 2.5 $$

4.  **Calculate CPU Utilization and Throughput:**

    *   **Total Time:** The last process (P3) finishes at $t=27$.
    *   **Busy Time:** $\sum BT_i = 8+4+9+5 = 26$.
    *   **CPU Utilization:**
        $$ U = \frac{\text{Busy Time}}{\text{Total Time}} \times 100\% = \frac{26}{27} \times 100\% \approx 96.3\% $$
        *Explanation:* The CPU was idle for 1 unit of time (from $t=26$ to $t=27$, P3 needed 1 unit, but the quantum was 2, so it ran for 1 unit and finished). This is a slight simplification; in a real system, context switch overhead would reduce utilization further. Here, the total time is 27, and the actual work done is 26.
    *   **Throughput:**
        $$ T = \frac{4}{27} \approx 0.1481 \text{ processes/unit time} $$

**Final Answer (Round Robin q=2):**
*   **CPU Utilization: 96.3%**
*   **Throughput: 0.1481 processes/unit time**
*   **Average Turnaround Time: 19.25**
*   **Average Waiting Time: 12.75**
*   **Average Response Time: 2.5**

**Reflection:** Round Robin prioritizes fairness and good response times. Notice the average response time (2.5) is significantly lower than FCFS (8.75) and even SRTF (4.25). This is its main advantage for interactive systems. However, this comes at the cost of increased average turnaround and waiting times (19.25 TAT and 12.75 WT, which are higher than FCFS and SRTF). The CPU utilization also dropped slightly due to the overhead of context switching (even if we didn't explicitly model context switch time, the "idle" slot for P3's last quantum indicates some inefficiency). The "trickiness" in RR is meticulously tracking remaining burst times and the ready queue order at each quantum expiry or arrival.

---

## 6. Common mistakes and traps

1.  **Confusing Turnaround Time and Waiting Time:** Many students mix these up. Remember: Turnaround Time ($TAT$) is the *total* time a process is in the system ($C_i - A_i$), while Waiting Time ($WT$) is the time it spends *idle* in the ready queue ($TAT_i - BT_i$).
2.  **Ignoring Arrival Times:** A common error, especially with non-preemptive algorithms, is to schedule processes based solely on burst time without considering if they have actually arrived yet. A process cannot run before its arrival time.
3.  **Incorrect Response Time Calculation:** Response time is the time until the *first* execution ($F_i - A_i$), not completion. For non-preemptive algorithms, $RT_i = WT_i$, but for preemptive algorithms (like RR or SRTF), $RT_i$ is often much lower than $WT_i$ because a process might get a quick burst of CPU time early on, then wait a long time later.
4.  **Mismanaging Preemption:** For preemptive algorithms (SRTF, RR), forgetting to check for preemption at *every* arrival of a new process and at *every* quantum expiry (for RR) is a frequent mistake.
5.  **Not Accounting for Remaining Burst Time:** In preemptive SJF (SRTF), the decision is based on the *shortest remaining* time, not the original burst time. This requires constant updates to the process's remaining time.
6.  **Neglecting CPU Idle Time:** When calculating CPU utilization, if there are moments when the ready queue is empty and the CPU is truly idle, this time must be factored into the "Total Time" but not the "Busy Time." In our examples, the CPU was always busy, but this is not always the case.
7.  **Incorrectly Calculating Throughput:** Throughput is the number of *completed* processes divided by the *total time from the start of the first process to the end of the last process*, not just the sum of burst times.

## 7. Textbook-precise explanation

In the context of operating systems, CPU scheduling goals are a set of quantitative metrics used to evaluate the performance and effectiveness of various CPU scheduling algorithms. These goals often represent conflicting objectives, requiring OS designers to make trade-offs based on the system's intended purpose (e.g., batch processing, interactive systems, real-time systems).

1.  **CPU Utilization:** This metric quantifies the fraction of time the CPU is actively engaged in executing instructions.
    *   **Definition:** Let $T_{\text{total}}$ be the total observation period, and $T_{\text{busy}}$ be the cumulative time the CPU is executing processes during $T_{\text{total}}$.
    *   **Formula:**
        $$ U = \frac{T_{\text{busy}}}{T_{\text{total}}} \times 100\% $$
    *   **Objective:** Maximize CPU utilization, typically aiming for 40% to 90% depending on the system load and type. Higher utilization implies more efficient use of expensive hardware resources. (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §6.1)

2.  **Throughput:** This metric measures the rate at which processes complete their execution.
    *   **Definition:** Let $N_{\text{completed}}$ be the number of processes that complete within a given time interval $T_{\text{total}}$.
    *   **Formula:**
        $$ T = \frac{N_{\text{completed}}}{T_{\text{total}}} $$
    *   **Objective:** Maximize throughput. A higher throughput indicates a more productive system, completing more jobs per unit of time. (Silberschatz et al., §6.1)

3.  **Turnaround Time ($TAT_i$):** This metric measures the total time elapsed from the submission (arrival) of a process to its completion.
    *   **Definition:** For a process $P_i$, let $A_i$ be its arrival time and $C_i$ be its completion time.
    *   **Formula:**
        $$ TAT_i = C_i - A_i $$
    *   **Objective:** Minimize average turnaround time. A lower turnaround time means processes are completed more quickly. (Silberschatz et al., §6.1)

4.  **Waiting Time ($WT_i$):** This metric measures the cumulative time a process spends in the ready queue, waiting for the CPU.
    *   **Definition:** For a process $P_i$, let $BT_i$ be its total CPU burst time. The waiting time is the total time spent in the ready state.
    *   **Formula:**
        $$ WT_i = TAT_i - BT_i = (C_i - A_i) - BT_i $$
    *   **Objective:** Minimize average waiting time. Reduced waiting time improves perceived responsiveness and reduces delays for processes. (Silberschatz et al., §6.1)

5.  **Response Time ($RT_i$):** This metric measures the time from when a request is submitted until the first response is produced. It is particularly relevant for interactive systems.
    *   **Definition:** For a process $P_i$, let $A_i$ be its arrival time and $F_i$ be the time at which it first begins execution.
    *   **Formula:**
        $$ RT_i = F_i - A_i $$
    *   **Objective:** Minimize average response time. A lower response time is crucial for interactive applications, as it provides quick feedback to the user, enhancing user experience. (Silberschatz et al., §6.1)

These goals are often in conflict. For example, maximizing CPU utilization might lead to longer turnaround times for some processes, and minimizing response time might increase context-switching overhead, thereby reducing overall throughput. The choice of scheduling algorithm and its optimization depends heavily on the specific requirements and priorities of the computing environment.

## 8. ASCII diagrams

Here's a Gantt chart illustrating the execution of processes P1, P2, P3, P4 from Example 3 (SRTF scheduling), which helps visualize the metrics.

```text
Gantt Chart for SRTF Scheduling

Processes:
P1: Arrival=0, Burst=8
P2: Arrival=1, Burst=4
P3: Arrival=2, Burst=9
P4: Arrival=3, Burst=5

Time (t)
0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26
| P1| P2| P2| P2| P2| P4| P4| P4| P4| P4| P1| P1| P1| P1| P1| P1| P1| P3| P3| P3| P3| P3| P3| P3| P3| P3|
---------------------------------------------------------------------------------------------------------
^   ^               ^                   ^                   ^                   ^                   ^
|   |               |                   |                   |                   |                   |
A_1 P2 arrived      P2 completed        P4 completed        P1 completed        P3 completed
    P1 preempted    P4 started          P1 started          P3 started
    RT_1=0          RT_2=0              RT_4=2              RT_1=0              RT_3=15
    F_1=0           F_2=1               F_4=5               F_1=0 (first run)   F_3=17
                                                            (second run starts at 10)

Key:
- Each block represents 1 unit of CPU time.
- The process name in the block indicates which process is running.
- Arrows indicate significant events (arrivals, preemption, completion, first execution).

Explanation of Gantt Chart:
- P1 runs from t=0 to t=1.
- At t=1, P2 arrives (BT=4), which is shorter than P1's remaining (7). P1 is preempted. P2 starts.
- P2 runs from t=1 to t=5 (completes its 4 units).
- At t=5, P2 finishes. P4 (BT=5) is now the shortest among P1 (rem 7), P3 (BT=9), P4 (BT=5). P4 starts.
- P4 runs from t=5 to t=10 (completes its 5 units).
- At t=10, P4 finishes. P1 (rem 7) is shorter than P3 (BT=9). P1 resumes.
- P1 runs from t=10 to t=17 (completes its remaining 7 units).