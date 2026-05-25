## 1. What it is — in plain English

Imagine your computer's main memory, called RAM, as a small, super-fast workbench for a chef. This workbench is where the chef (your CPU) does all its active cooking. It's incredibly quick to grab ingredients from here.

Now, imagine your computer's hard drive or SSD (secondary storage) as a huge pantry. It holds *all* the ingredients (data and programs) your chef might ever need, but it's much slower to retrieve things from the pantry than from the workbench.

The "working set" is like the specific set of ingredients the chef needs for the *current dish* they are making right now. It's the minimum essential stuff that must be on the workbench for the chef to cook efficiently without constantly running to the pantry. If the workbench is big enough to hold all these current ingredients, the chef cooks fast.

"Thrashing" happens when the workbench is too small for the working set. The chef keeps trying to cook, but constantly realizes they're missing an ingredient, runs to the pantry, brings it back, only to find they need another one that they just put *back* in the pantry to make space! This endless back-and-forth between the workbench and the slow pantry means the chef spends all their time fetching ingredients and almost no time actually cooking. Your computer becomes incredibly slow and unresponsive, making lots of disk noise, but doing very little actual work.

## 2. Why it matters — real-world applications

1.  **High-Performance Computing (HPC) and Scientific Simulations:** In fields like aerospace (simulating fluid dynamics around a wing), physics (particle simulations), or climate modeling (weather prediction), programs often process massive datasets. If the algorithms are not designed with locality in mind, or if the system doesn't allocate enough RAM for the working set of these large simulations, the supercomputer will spend most of its time moving data between RAM and disk, rather than performing the complex calculations. This can turn a simulation that should take hours into days or weeks, making crucial research impractical.

2.  **Database Management Systems (DBMS):** Large enterprise databases (like those used by banks for transaction processing, or e-commerce sites like Amazon for order management) handle vast amounts of data. When a user queries the database, the DBMS needs to access specific data blocks. If the "working set" of frequently accessed data (e.g., customer records, recent transactions, index pages) cannot fit into the database server's RAM, the system will constantly fetch pages from disk. This leads to slow query responses, reduced transaction throughput, and a poor user experience, directly impacting business operations and revenue.

3.  **Virtualization and Cloud Computing:** Cloud providers (like AWS, Azure, Google Cloud) host many virtual machines (VMs) on a single physical server. Each VM runs its own operating system and applications, each with its own working set. The hypervisor (the software managing VMs) must carefully allocate physical RAM to each VM. If too many VMs are packed onto a server, or if a VM's workload changes dynamically, the hypervisor might not be able to guarantee enough physical RAM for *all* active VMs' working sets. This can cause some or all VMs to experience thrashing, leading to severe performance degradation for cloud customers, even if their individual VMs appear to have ample virtual memory.

4.  **Machine Learning (ML) Training:** Training complex deep learning models (e.g., for image recognition, natural language processing) often involves iterating over large datasets and model parameters. During training, the ML framework (like TensorFlow or PyTorch) needs to load batches of data and model weights into GPU memory or system RAM. If the batch size is too large for the available memory, or if the model itself is too big, the system will constantly swap data in and out. This significantly slows down the training process, increasing the time and computational resources required to develop and deploy ML models.

## 3. Prerequisites — what you must know first

*   **Virtual Memory:** The concept that programs see a large, contiguous memory space, which is often much larger than the physical RAM available.
*   **Paging:** The mechanism by which virtual memory is implemented, dividing both virtual and physical memory into fixed-size blocks called pages and frames, respectively.
*   **Page Tables:** Data structures used by the operating system to map virtual page addresses to physical frame addresses.
*   **Page Fault:** An event that occurs when a program tries to access a page that is not currently in physical memory, triggering the OS to load it from disk.
*   **Physical Memory (RAM):** The actual, fast, volatile memory hardware in the computer where the CPU directly accesses data.
*   **Secondary Storage (Disk/SSD):** Slower, non-volatile storage (like hard drives or solid-state drives) used to store all programs and data permanently, and as an extension of RAM for virtual memory.
*   **Process Management:** How the operating system manages running programs (processes), including their states (running, waiting, ready) and context switching.
*   **CPU Scheduling:** The algorithm the operating system uses to decide which ready process gets to use the CPU next.
*   **Locality of Reference:** The empirical observation that programs tend to access memory locations that are spatially close to previously accessed locations (spatial locality) or access the same locations repeatedly within a short period (temporal locality).

## 4. The core idea — step by step

### Step 1: The Problem: Limited RAM, Unlimited Programs

**Plain English:** Modern computers allow us to run many programs at once (multitasking). Each program might need a lot of memory. However, the physical RAM in our computer is a finite and often much smaller resource than the combined memory demands of all running programs.

**Small concrete example:** You might have 16 GB of RAM. You open a web browser (2 GB), a video editor (4 GB), a game (8 GB), and a development environment (3 GB). The total memory *demanded* by these programs is $2+4+8+3 = 17$ GB, which is more than your 16 GB of physical RAM.

**Formal/Mathematical version:** Let $P_1, P_2, \ldots, P_N$ be $N$ active processes. Let $M_i$ be the total virtual memory demand of process $P_i$. Let $R_{RAM}$ be the total physical RAM available. The problem arises when $\sum_{i=1}^{N} M_i > R_{RAM}$.

**What could go wrong:** If the operating system (OS) tried to load all of $M_i$ for all processes simultaneously, it would quickly run out of physical RAM. This would prevent new programs from starting or cause existing ones to crash.

### Step 2: Virtual Memory and Paging

**Plain English:** To solve the problem of limited RAM, the OS uses "virtual memory." Each program gets its own large, virtual memory space, making it *think* it has exclusive access to a huge amount of memory. The OS then divides this virtual memory into fixed-size chunks called "pages" and loads only the *currently needed* pages into physical RAM (which is divided into "frames"). If a program tries to access a page not in RAM, a "page fault" occurs, and the OS fetches that page from disk.

**Small concrete example:** Our video editor needs 4 GB of virtual memory. The OS divides this into 1 million pages of 4 KB each. At any given moment, only a few thousand of these pages (say, 100 MB total) might actually be in the 16 GB of physical RAM. The rest are on the hard drive. When the editor accesses a part of a video that's not in RAM, the OS loads that specific 4 KB page.

**Formal/Mathematical version:**
Virtual Address (VA) $\rightarrow$ Page Number (P) + Offset (O)
Physical Address (PA) $\rightarrow$ Frame Number (F) + Offset (O)
The mapping is done via a Page Table: $PT[P] = F$.
A page fault occurs if $PT[P]$ indicates the page is not resident in RAM (e.g., a "valid" bit is 0).

**What could go wrong:** If pages are constantly being swapped in and out due to frequent page faults, the system will spend a lot of time on disk I/O, which is very slow compared to CPU operations.

### Step 3: Locality of Reference

**Plain English:** Fortunately, programs don't randomly jump all over their memory space. Instead, they tend to access data and instructions that are either very close to what they just used (spatial locality, like iterating through an array) or they repeatedly use the same small set of data/instructions over a short period (temporal locality, like a loop variable or a frequently called function).

**Small concrete example:** A program iterating through a large array `A[0], A[1], A[2], ...` exhibits spatial locality. A program in a tight loop `for (i=0; i<1000; i++) { ... }` exhibits temporal locality for the loop variable `i` and the loop's instructions.

**Formal/Mathematical version:** The Principle of Locality states that memory references tend to cluster in space and time. This principle is fundamental to the effectiveness of caching and virtual memory systems.

**What could go wrong:** Programs that don't exhibit good locality (e.g., randomly accessing elements in a very large data structure) will cause many page faults, even if their total memory footprint isn't enormous, because the OS can't predict which pages to keep in RAM.

### Step 4: The Working Set Concept

**Plain English:** Building on locality, the "working set" is the set of pages that a process has actively referenced within a recent time window. It represents the minimum set of pages a program needs in RAM to make reasonable progress without constant page faults. It's dynamic; as a program's execution progresses, its working set changes.

**Small concrete example:** Imagine a program's page access stream: `A, B, C, A, D, B, E, F, E, D, G, H, G`. If we define our "recent time window" ($\Delta$) as the last 4 page references:
- At time $t_1$ (after `A, B, C, A`): Working set is `{A, B, C}`.
- At time $t_2$ (after `A, B, C, A, D`): Working set is `{A, B, C, D}`.
- At time $t_3$ (after `A, B, C, A, D, B`): Working set is `{A, B, C, D}` (A is still in window).
- At time $t_4$ (after `A, B, C, A, D, B, E`): Working set is `{A, B, D, E}` (C falls out of window).

**Formal/Mathematical version:** The working set $W(t, \Delta)$ at time $t$ with a window size $\Delta$ is defined as:
$$W(t, \Delta) = \{p \mid \text{page } p \text{ was referenced by the process in the time interval } [t-\Delta, t]\}$$
Here, $\Delta$ is a time parameter (often measured in number of page references or virtual time units), representing the "window of interest."

**What could go wrong:** Choosing the right $\Delta$ is crucial. If $\Delta$ is too small, the working set might not capture all truly active pages, leading to unnecessary page faults. If $\Delta$ is too large, it might include pages that are no longer actively used, wasting valuable RAM.

### Step 5: The Working Set Model

**Plain English:** The "working set model" is an operating system strategy for managing memory. The goal is to keep each active process's entire working set in physical RAM. If the OS can ensure this, processes will run efficiently with minimal page faults. If there isn't enough total RAM to hold the working sets of *all* active processes, the OS might decide to temporarily suspend (swap out) one or more processes to free up RAM for others, rather than letting everyone suffer.

**Small concrete example:** Our 16 GB RAM computer is running four programs. The OS estimates their working sets are:
- Browser: 500 MB
- Video editor: 2 GB
- Game: 4 GB
- Development environment: 1 GB
Total working set demand: $0.5 + 2 + 4 + 1 = 7.5$ GB. Since $7.5$ GB is less than 16 GB, the OS can keep all working sets in RAM, and all programs run smoothly. If another program starts, pushing the total working set demand above 16 GB, the OS might suspend the development environment to ensure the others run well.

**Formal/Mathematical version:** For each active process $P_i$, the OS tries to ensure that all pages in $W_i(t, \Delta)$ are resident in physical RAM. The total demand on physical RAM at time $t$ is $\sum_{i \in \text{ActiveProcesses}} |W_i(t, \Delta)|$. The OS attempts to keep this sum less than or equal to $R_{RAM}$. If $\sum |W_i(t, \Delta)| > R_{RAM}$, the OS must reduce the number of active processes (i.e., reduce the degree of multiprogramming) by swapping out one or more processes.

**What could go wrong:** Accurately tracking working sets for many processes is computationally expensive for the OS. Also, deciding *which* process to suspend when total demand exceeds available RAM is a complex scheduling problem.

### Step 6: Thrashing

**Plain English:** Thrashing is what happens when the total working set demand of all active processes *exceeds* the available physical RAM, and the OS tries to keep all processes running anyway. Because there isn't enough space for all active pages, processes constantly generate page faults. The OS then spends almost all its time swapping pages between RAM and disk, trying to fulfill these faults, instead of letting the CPU do useful work. The system becomes extremely slow, unresponsive, and the disk activity light is constantly on, but CPU utilization drops dramatically because the CPU is always waiting for I/O.

**Small concrete example:** Our 16 GB RAM computer.
- Browser: WS = 500 MB
- Video editor: WS = 2 GB
- Game: WS = 4 GB
- Development environment: WS = 1 GB
- *New process (ML training):* WS = 10 GB
Total working set demand: $0.5 + 2 + 4 + 1 + 10 = 17.5$ GB. This is $> 16$ GB.
If the OS tries to keep all five active, they will all constantly compete for RAM. Each will suffer frequent page faults. The CPU will be idle most of the time, waiting for pages to be loaded from disk. The system thrashes.

**Formal/Mathematical version:** Thrashing occurs when the average page fault rate (PFR) becomes excessively high, leading to a sharp decrease in CPU utilization, despite a high demand for CPU time. This state is characterized by:
1.  High PFR.
2.  Low CPU utilization.
3.  High disk I/O utilization (specifically, paging disk I/O).
This happens when $\sum_{i \in \text{ActiveProcesses}} |W_i(t, \Delta)| > R_{RAM}$ and the OS continues to admit all processes.

**What could go wrong:** Thrashing makes a computer practically unusable. It's a critical performance bottleneck that must be avoided.

### Step 7: Preventing Thrashing

**Plain English:** The primary way to prevent thrashing is to ensure that the sum of the working set sizes of all *currently active* processes does not exceed the available physical RAM. If it does, the OS must temporarily reduce the number of active processes (the "degree of multiprogramming") by suspending one or more processes, moving all their pages out of RAM and onto disk, until enough RAM is freed up for the remaining active processes to run without thrashing. This is called "admission control" or "load control."

**Small concrete example:** In our previous example where total working set demand was 17.5 GB for 5 programs on a 16 GB RAM machine. To prevent thrashing, the OS might suspend the ML training process (10 GB WS) or the Game (4 GB WS) + Development environment (1 GB WS). If it suspends the ML training, the remaining demand is 7.5 GB, which fits comfortably in 16 GB. The other four programs run efficiently, and the ML training can resume later when resources are available.

**Formal/Mathematical version:** The OS employs a "working set policy" or "PFF (Page Fault Frequency) policy" to manage the degree of multiprogramming.
*   **Working Set Policy:** The OS estimates $|W_i(t, \Delta)|$ for each process and only schedules processes such that $\sum_{i \in \text{ScheduledProcesses}} |W_i(t, \Delta)| \le R_{RAM}$.
*   **PFF Policy:** The OS monitors the page fault rate for each process. If a process's PFR exceeds an upper bound, the OS assumes its working set is not fully in RAM and allocates more frames. If its PFR falls below a lower bound, the OS assumes it has too many frames and takes some away. If the system-wide PFR is too high, it indicates thrashing, and the OS reduces the degree of multiprogramming.

**What could go wrong:** Being too aggressive in reducing the degree of multiprogramming might leave RAM underutilized when workloads are bursty. Being too passive will lead to thrashing. Finding the optimal balance is challenging.

## 5. Worked examples — multiple, with every step shown

We will use a fixed $\Delta$ measured in page references for simplicity. Assume a page reference string is given, and we want to find the working set at various points.

### Example 1: Basic Working Set Calculation

**Problem:** Given a page reference string: `A, B, C, A, D, B, E, F, E, D, G, H, G` and a working set window size $\Delta = 4$ (meaning we consider the last 4 page references), determine the working set at time $t=5$ (after `D` is referenced) and at time $t=9$ (after `E` is referenced).

**What's given:**
*   Reference string: `A, B, C, A, D, B, E, F, E, D, G, H, G`
*   Window size $\Delta = 4$

**What we want:**
*   Working set $W(t=5, \Delta=4)$
*   Working set $W(t=9, \Delta=4)$

---

**Step-by-step solution:**

**Part 1: Working Set at $t=5$**

1.  **Identify the references up to time $t=5$:**
    `A, B, C, A, D`
    *This is the sequence of pages accessed by the program up to this point.*

2.  **Determine the references within the window $[t-\Delta, t]$:**
    The window is of size $\Delta=4$. So, we look at the last 4 references *ending at* $t=5$.
    The references are: `C, A, D, B` (No, this is wrong. It should be the last 4 *distinct* references. Let's re-read the definition. "pages $p$ referenced in $[t-\Delta, t]$". This means the *unique* pages within the last $\Delta$ references *in the string*.)
    Let's re-evaluate the window. The reference string is indexed $1, 2, 3, \ldots$.
    $t=5$ corresponds to the 5th reference, which is `D`.
    The window $[t-\Delta, t]$ means references from index $t-\Delta+1$ to $t$.
    So, for $t=5$ and $\Delta=4$, the window is for references from index $5-4+1 = 2$ to $5$.
    These references are: `B, C, A, D`.
    *We take the segment of the reference string corresponding to the last $\Delta$ references.*

3.  **Collect the unique pages from this window:**
    The unique pages in `{B, C, A, D}` are `{A, B, C, D}`.
    *The working set contains only unique pages.*

4.  **State the working set:**
    $W(t=5, \Delta=4) = \boxed{\{A, B, C, D\}}$
    *This is the set of pages the process has actively used in the most recent window.*

**Part 2: Working Set at $t=9$**

1.  **Identify the references up to time $t=9$:**
    `A, B, C, A, D, B, E, F, E`
    *This is the sequence of pages accessed by the program up to this point.*

2.  **Determine the references within the window $[t-\Delta, t]$:**
    For $t=9$ and $\Delta=4$, the window is for references from index $9-4+1 = 6$ to $9$.
    These references are: `B, E, F, E`.
    *We slide the window along the reference string.*

3.  **Collect the unique pages from this window:**
    The unique pages in `{B, E, F, E}` are `{B, E, F}`.
    *Again, only unique pages are part of the working set.*

4.  **State the working set:**
    $W(t=9, \Delta=4) = \boxed{\{B, E, F\}}$
    *Notice how the working set changed as the program's focus shifted.*

**Reflection:** This example demonstrates the dynamic nature of the working set. Pages enter and leave the set based on recent activity and the defined window size. The key is to correctly identify the window and then extract unique pages.

---

### Example 2: Identifying Thrashing Conditions

**Problem:** A system has 8 GB of physical RAM. It is running 3 processes, $P_1, P_2, P_3$. We observe the following average page fault rates (PFR) and CPU utilization over a 1-minute interval:

| Process | PFR (faults/sec) |
| :------ | :--------------- |
| $P_1$   | 15               |
| $P_2$   | 20               |
| $P_3$   | 18               |

The overall CPU utilization is 15%.
The average time to service a page fault (disk I/O + OS overhead) is 10 milliseconds (ms).
The system normally achieves 85% CPU utilization when running efficiently.
Based on this data, is the system likely thrashing? Justify your answer quantitatively.

**What's given:**
*   Physical RAM: 8 GB
*   Number of processes: 3
*   PFRs: $P_1=15$, $P_2=20$, $P_3=18$ (faults/sec)
*   Overall CPU utilization: 15%
*   Page fault service time: 10 ms/fault
*   Normal efficient CPU utilization: 85%

**What we want:**
*   Determine if the system is thrashing and provide quantitative justification.

---

**Step-by-step solution:**

1.  **Calculate the total page fault rate for the system:**
    Total PFR = PFR($P_1$) + PFR($P_2$) + PFR($P_3$)
    Total PFR = $15 + 20 + 18 = 53$ faults/sec
    *This is the total number of times the CPU has to stop and wait for a page from disk every second.*

2.  **Calculate the total time spent servicing page faults per second:**
    Time spent on page faults = Total PFR $\times$ Page fault service time
    Time spent on page faults = $53 \text{ faults/sec} \times 10 \text{ ms/fault}$
    Time spent on page faults = $530 \text{ ms/sec}$
    *Since there are 1000 ms in 1 second, this means 530 ms out of every 1000 ms are spent waiting for disk I/O.*

3.  **Calculate the percentage of time the CPU is idle due to page faults:**
    Percentage idle due to PFs = (Time spent on page faults / 1000 ms) $\times 100\%$
    Percentage idle due to PFs = $(530 \text{ ms} / 1000 \text{ ms}) \times 100\% = 53\%$
    *This is the fraction of time the CPU is forced to wait for I/O due to page faults.*

4.  **Compare observed CPU utilization with expected utilization:**
    Observed CPU utilization = 15%
    Normal efficient CPU utilization = 85%
    The observed CPU utilization is significantly lower than the normal efficient utilization.

5.  **Analyze the symptoms of thrashing:**
    Thrashing is characterized by:
    *   **High page fault rate:** We calculated a total of 53 faults/sec, which is high enough to cause significant delays.
    *   **Low CPU utilization:** The observed 15% is very low compared to the normal 85%.
    *   **High disk I/O utilization (implied):** The fact that 53% of the time is spent servicing page faults means the disk is heavily utilized for paging.

6.  **Conclusion:**
    Yes, the system is **likely thrashing**.
    *   The CPU is spending more than half its time (53%) waiting for page faults to be serviced, which directly explains the very low observed CPU utilization of 15% (compared to the ideal 85%).
    *   This indicates that the processes are constantly competing for physical RAM, leading to frequent page swaps and minimal useful work being done by the CPU.

**Reflection:** This example highlights how low CPU utilization *coupled with* high page fault rates (and implicitly, high disk I/O for paging) is a strong indicator of thrashing. Simply having a low CPU utilization isn't enough; it could mean the system is idle. But when the system is *active* (running processes) and CPU is low due to I/O waits, it points to a memory bottleneck.

---

### Example 3: Working Set Page Replacement Simulation

**Problem:** Simulate a working set page replacement algorithm for a process using a window size $\Delta = 3$ (measured in page references). Assume the system has 3 physical frames available for this process. The page reference string is: `7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1`.
Show the working set at each reference, the pages in physical memory, and identify page faults. Assume pages are removed from physical memory if they fall out of the working set *and* there's a need to free up a frame for a new page. If a page falls out of the working set but there are still free frames, it can stay.

**What's given:**
*   Reference string: `7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1`
*   Window size $\Delta = 3$
*   Physical frames available: 3

**What we want:**
*   A step-by-step simulation showing working set, physical memory state, and page faults.

---

**Step-by-step solution:**

Let's denote the physical frames as `[F1, F2, F3]`.
`WS` = Working Set. `Mem` = Pages in Physical Memory. `PF` = Page Fault.

| Time (t) | Reference | Window (last $\Delta=3$ refs) | Current WS | Mem (before ref) | Mem (after ref) | PF? | Notes                                                                                                                                                                                                                                                                                                                                                           |
| :------- | :-------- | :---------------------------- | :--------- | :--------------- | :-------------- | :-- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1        | 7         | {7}                           | {7}        | [ ]              | [7]             | Yes | Page 7 is not in memory. Load it.                                                                                                                                                                                                                                                                                                                       |
| 2        | 0         | {7, 0}                        | {7, 0}     | [7]              | [7, 0]          | Yes | Page 0 is not in memory. Load it.                                                                                                                                                                                                                                                                                                                       |
| 3        | 1         | {7, 0, 1}                     | {7, 0, 1}  | [7, 0]           | [7, 0, 1]       | Yes | Page 1 is not in memory. Load it. Now 3 frames are full.                                                                                                                                                                                                                                                                                                |
| 4        | 2         | {0, 1, 2}                     | {0, 1, 2}  | [7, 0, 1]        | [0, 1, 2]       | Yes | Page 2 is not in memory. Page 7 is not in WS, so it's a candidate for replacement. Since frames are full, 7 is evicted.                                                                                                                                                                                                                                |
| 5        | 0         | {1, 2, 0}                     | {1, 2, 0}  | [0, 1, 2]        | [0, 1, 2]       | No  | Page 0 is in memory.                                                                                                                                                                                                                                                                                                                                    |
| 6        | 3         | {2, 0, 3}                     | {0, 2, 3}  | [0, 1, 2]        | [0, 2, 3]       | Yes | Page 3 is not in memory. Page 1 is not in WS, so it's evicted.                                                                                                                                                                                                                                                                                          |
| 7        | 0         | {0, 3, 0}                     | {0, 3}     | [0, 2, 3]        | [0, 2, 3]       | No  | Page 0 is in memory.                                                                                                                                                                                                                                                                                                                                    |
| 8        | 4         | {3, 0, 4}                     | {0, 3, 4}  | [0, 2, 3]        | [0, 3, 4]       | Yes | Page 4 is not in memory. Page 2 is not in WS, so it's evicted.                                                                                                                                                                                                                                                                                          |
| 9        | 2         | {0, 4, 2}                     | {0, 2, 4}  | [0, 3, 4]        | [0, 2, 4]       | Yes | Page 2 is not in memory. Page 3 is not in WS, so it's evicted.                                                                                                                                                                                                                                                                                          |
| 10       | 3         | {4, 2, 3}                     | {2, 3, 4}  | [0, 2, 4]        | [2, 3, 4]       | Yes | Page 3 is not in memory. Page 0 is not in WS, so it's evicted.                                                                                                                                                                                                                                                                                          |
| 11       | 0         | {2, 3, 0}                     | {0, 2, 3}  | [2, 3, 4]        | [0, 2, 3]       | Yes | Page 0 is not in memory. Page 4 is not in WS, so it's evicted.                                                                                                                                                                                                                                                                                          |
| 12       | 3         | {3, 0, 3}                     | {0, 3}     | [0, 2, 3]        | [0, 2, 3]       | No  | Page 3 is in memory.                                                                                                                                                                                                                                                                                                                                    |
| 13       | 2         | {0, 3, 2}                     | {0, 2, 3}  | [0, 2, 3]        | [0, 2, 3]       | No  | Page 2 is in memory.                                                                                                                                                                                                                                                                                                                                    |
| 14       | 1         | {3, 2, 1}                     | {1, 2, 3}  | [0, 2, 3]        | [1, 2, 3]       | Yes | Page 1 is not in memory. Page 0 is not in WS, so it's evicted.                                                                                                                                                                                                                                                                                          |
| 15       | 2         | {2, 1, 2}                     | {1, 2}     | [1, 2, 3]        | [1, 2, 3]       | No  | Page 2 is in memory.                                                                                                                                                                                                                                                                                                                                    |
| 16       | 0         | {1, 2, 0}                     | {0, 1, 2}  | [1, 2, 3]        | [0, 1, 2]       | Yes | Page 0 is not in memory. Page 3 is not in WS, so it's evicted.                                                                                                                                                                                                                                                                                          |
| 17       | 1         | {2, 0, 1}                     | {0, 1, 2}  | [0, 1, 2]        | [0, 1, 2]       | No  | Page 1 is in memory.                                                                                                                                                                                                                                                                                                                                    |
| 18       | 7         | {0, 1, 7}                     | {0, 1, 7}  | [0, 1, 2]        | [0, 1, 7]       | Yes | Page 7 is not in memory. Page 2 is not in WS, so it's evicted.                                                                                                                                                                                                                                                                                          |
| 19       | 0         | {1, 7, 0}                     | {0, 1, 7}  | [0, 1, 7]        | [0, 1, 7]       | No  | Page 0 is in memory.                                                                                                                                                                                                                                                                                                                                    |
| 20       | 1         | {7, 0, 1}                     | {0, 1, 7}  | [0, 1, 7]        | [0, 1, 7]       | No  | Page 1 is in memory.                                                                                                                                                                                                                                                                                                                                    |

Total page faults: $\boxed{13}$

**Reflection:** This example shows how the working set algorithm tries to keep only currently relevant pages in memory. Pages that fall out of the working set (because they haven't been referenced in the last $\Delta$ references) are candidates for replacement. When a page fault occurs and memory is full, an old page that is no longer in the working set is chosen for eviction. This mechanism directly aims to prevent thrashing by ensuring processes only hold pages they actively need. The choice of $\Delta$ is critical here; a different $\Delta$ would yield a different number of page faults.

---

### Example 4: Multi-process Thrashing Analysis

**Problem:** A server has 32 GB of RAM. It runs 4 identical scientific simulation processes, $S_1, S_2, S_3, S_4$. Each simulation process has a working set size that varies with its phase of execution:
*   Phase A (Initialization): 2 GB
*   Phase B (Computation Loop 1): 6 GB
*   Phase C (Computation Loop 2): 10 GB
*   Phase D (Finalization): 2 GB

Assume at a given moment:
*   $S_1$ is in Phase B
*   $S_2$ is in Phase C
*   $S_3$ is in Phase B
*   $S_4$ is in Phase A

The OS uses a working set model and tries to keep all active processes' working sets in RAM. If the total working set demand exceeds available RAM, the system will start thrashing.
Determine:
1.  The total working set demand at this moment.
2.  Whether the system is likely thrashing.
3.  If thrashing, which process(es) should the OS suspend to prevent thrashing (aiming to minimize suspensions while keeping total WS demand below 32 GB)?

**What's given:**
*   Total RAM: 32 GB
*   Processes: $S_1, S_2, S_3, S_4$
*   Working set sizes per phase: A=2GB, B=6GB, C=10GB, D=2GB
*   Current phases: $S_1 \in B$, $S_2 \in C$, $S_3 \in B$, $S_4 \in A$

**What we want:**
1.  Total working set demand.
2.  Thrashing likelihood.
3.  Suspension strategy if thrashing.

---

**Step-by-step solution:**

**Part 1: Calculate Total Working Set Demand**

1.  **Identify the working set size for each process based on its current phase:**
    *   $S_1$ (Phase B): 6 GB
    *   $S_2$ (Phase C): 10 GB
    *   $S_3$ (Phase B): 6 GB
    *   $S_4$ (Phase A): 2 GB
    *We map each process's current state to its memory requirement.*

2.  **Sum the individual working set sizes to get the total demand:**
    Total WS Demand = WS($S_1$) + WS($S_2$) + WS($S_3$) + WS($S_4$)
    Total WS Demand = $6 \text{ GB} + 10 \text{ GB} + 6 \text{ GB} + 2 \text{ GB}$
    Total WS Demand = $24 \text{ GB}$
    *This is the cumulative memory needed by all active processes to run efficiently.*

    Total Working Set Demand: $\boxed{24 \text{ GB}}$

**Part 2: Determine Thrashing Likelihood**

1.  **Compare total working set demand with available RAM:**
    Total WS Demand = 24 GB
    Available RAM = 32 GB
    Since $24 \text{ GB} \le 32 \text{ GB}$, the total working set demand is less than or equal to the available physical RAM.
    *The system has enough memory to accommodate all active working sets.*

2.  **Conclusion:**
    The system is **not likely thrashing** at this moment. All processes can keep their working sets in RAM, leading to efficient execution.
    *No thrashing is expected because the memory requirements are met.*

**Part 3: Suspension Strategy (Hypothetical Scenario)**

Let's modify the problem for this part to demonstrate a suspension strategy.
*Hypothetical Scenario:* What if $S_4$ was also in Phase C instead of Phase A?
Then:
*   $S_1$ (Phase B): 6 GB
*   $S_2$ (Phase C): 10 GB
*   $S_3$ (Phase B): 6 GB
*   $S_4$ (Phase C): 10 GB
New Total WS Demand = $6 + 10 + 6 + 10 = 32$ GB.
In this *modified* scenario, the total demand is exactly 32 GB. The system would be at its limit, but still not thrashing *yet*, assuming the OS can perfectly manage the frames.

*Further Hypothetical Scenario:* What if $S_4$ was in Phase C, AND another process $S_5$ (Phase A, 2 GB) started?
Then:
*   $S_1$ (Phase B): 6 GB
*   $S_2$ (Phase C): 10 GB
*   $S_3$ (Phase B): 6 GB
*   $S_4$ (Phase C): 10 GB
*   $S_5$ (Phase A): 2 GB
New Total WS Demand = $6 + 10 + 6 + 10 + 2 = 34$ GB.
Now, $34 \text{ GB} > 32 \text{ GB}$. The system *would* be thrashing if all processes were kept active.

**Suspension Strategy for the *further hypothetical scenario* (34 GB demand on 32 GB RAM):**

1.  **Calculate the excess demand:**
    Excess = Total WS Demand - Available RAM = $34 \text{ GB} - 32 \text{ GB} = 2 \text{ GB}$.
    *We need to free up at least 2 GB of working set space.*

2.  **Identify processes that can be suspended to free up at least the excess demand, minimizing suspensions:**
    We want to suspend the smallest number of processes possible to get below 32 GB.
    The current working set sizes are:
    *   $S_1$: 6 GB
    *   $S_2$: 10 GB
    *   $S_3$: 6 GB
    *   $S_4$: 10 GB
    *   $S_5$: 2 GB

    To free up at least 2 GB, we could suspend $S_5$.
    If we suspend $S_5$:
    Remaining demand = $34 \text{ GB} - 2 \text{ GB} = 32 \text{ GB}$.
    This exactly matches the available RAM, so it's a viable strategy.
    *We choose the process that frees up just enough memory, or slightly more, to avoid thrashing.*

3.  **Conclusion for the *hypothetical scenario*:**
    To prevent thrashing, the OS should suspend **$S_5$**. This reduces the total working set demand to 32 GB, allowing the remaining processes ($S_1, S_2, S_3, S_4$) to run efficiently without thrashing.

**Reflection:** This example demonstrates that thrashing is a direct consequence of total working set demand exceeding available physical RAM. The working set model provides a framework for the OS to predict and prevent thrashing by monitoring these demands and adjusting the degree of multiprogramming (suspending processes) when necessary. The "best" process to suspend often depends on system policies (e.g., suspend the lowest priority, the one with the smallest working set, or the one that has been running longest). Here, we chose the one that freed up just enough memory.

## 6. Common mistakes and traps

1.  **Confusing Working Set with Total Virtual Memory:** Students often think the working set is the entire virtual address space of a process. It's not. The working set is a *small, active subset* of the virtual memory that is currently being used, representing the pages that need to be in RAM for efficient execution.
2.  **Misinterpreting $\Delta$ (Window Size):** Forgetting that $\Delta$ defines a *time window* (e.g., last $k$ references or last $T$ milliseconds). A common mistake is to consider *all* pages ever referenced, or to miscalculate the window boundaries.
3.  **Assuming Thrashing is Always a Bad Algorithm:** Thrashing is not primarily a flaw in a page replacement algorithm (though a poor algorithm can exacerbate it). It's fundamentally a symptom of *insufficient physical RAM* to satisfy the combined working set demands of all active processes. Even an optimal page replacement algorithm will thrash if there isn't enough RAM.
4.  **Not Understanding the Trade-off between Multiprogramming Degree and Thrashing:** Students might think "more processes running is always better." However, increasing the degree of multiprogramming beyond a certain point (where total working set demand exceeds RAM) leads directly to thrashing, which severely hurts overall system throughput, making *fewer* processes run effectively.
5.  **Forgetting Locality of Reference is the Foundation:** The working set model, and the effectiveness of virtual memory in general, heavily relies on the principle of locality. If programs had truly random memory access patterns, the working set model would be ineffective, and virtual memory performance would be terrible.
6.  **Ignoring the Cost of Tracking Working Sets:** While conceptually elegant, tracking the working set (especially with a time-based $\Delta$) can be computationally intensive for the OS, requiring hardware support (like reference bits) to be practical.

## 7. Textbook-precise explanation

The **Working Set Model** is a memory management strategy employed by operating systems to optimize virtual memory performance and prevent thrashing. It is predicated on the principle of **locality of reference**, which posits that processes tend to access a relatively small subset of their total virtual address space over a given period.

Formally, the **working set** $W(t, \Delta)$ of a process at time $t$ with a window size $\Delta$ is defined as the set of pages referenced by that process during the time interval $[t-\Delta, t]$.
$$W(t, \Delta) = \{p \mid \text{page } p \text{ was referenced by the process in the time interval } [t-\Delta, t]\}$$
Here, $\Delta$ is a tunable parameter representing the "working set window" or "memory-reference history window." It can be measured in virtual time units, CPU cycles, or a fixed number of recent page references.

The **working set model** aims to ensure that for every active process, all pages belonging to its current working set $W(t, \Delta)$ are resident in physical memory (RAM).
*   If a process attempts to execute, the operating system (OS) first checks if its working set can be fully accommodated in the available physical frames.
*   If $\sum_{i \in \text{ActiveProcesses}} |W_i(t, \Delta)| \le R_{RAM}$ (where $R_{RAM}$ is the total physical RAM), then all active processes can potentially run efficiently, as their active pages are in memory, minimizing page faults.
*   The OS typically employs a **working set page replacement algorithm** or a **Page Fault Frequency (PFF) algorithm** to maintain the working set. Pages that are part of $W(t, \Delta)$ are protected from replacement. Pages that fall outside the window $[t-\Delta, t]$ (i.e., are no longer in the working set) become candidates for eviction if physical memory is scarce.

**Thrashing** is a pathological state in a virtual memory system where the system spends a disproportionate amount of time moving pages between main memory and secondary storage (paging or swapping), rather than performing useful computational work. This occurs when the sum of the working set sizes of all active processes exceeds the total available physical RAM:
$$\sum_{i \in \text{ActiveProcesses}} |W_i(t, \Delta)| > R_{RAM}$$
The symptoms of thrashing include:
1.  **High Page Fault Rate (PFR):** Processes constantly incur page faults because their working sets cannot be fully resident in RAM.
2.  **Low CPU Utilization:** The CPU spends most of its time idle, waiting for I/O operations (page reads/writes from disk) to complete.
3.  **High Disk I/O Utilization:** The secondary storage device (disk/SSD) is heavily utilized for paging, indicating a memory bottleneck.
4.  **Decreased System Throughput:** The rate at which useful work is completed by the system drops dramatically.

To **prevent thrashing**, the working set model implements **admission control** or **load control**. If the OS detects that the total working set demand exceeds available RAM (or if the system-wide PFR becomes too high, indicating impending thrashing), it must reduce the **degree of multiprogramming**. This involves temporarily suspending (swapping out) one or more processes, moving all their pages to secondary storage, thereby freeing up physical frames for the remaining active processes. The suspended processes can be resumed later when more physical memory becomes available.

*References:*
*   Silberschatz, Galvin, and Gagne. *Operating System Concepts*. 10th ed. Wiley, 2018. (Chapter 9: Virtual Memory)
*   Tanenbaum, Andrew S., and Herbert Bos. *Modern Operating Systems*. 4th ed. Pearson, 2015. (Chapter 3: Memory Management)

## 8. ASCII diagrams

```text
+---------------------+
|                     |
|    Virtual Memory   |
|    (Process P1)     |
|                     |
| +-----------------+ |
| | Page 0          | |
| +-----------------+ |
| | Page 1          | |
| +-----------------+ |
| | Page 2          | |
| +-----------------+ |
| | ...             | |
| +-----------------+ |
| | Page N          | |
| +-----------------+ |
|                     |
+---------------------+
          |
          |  Virtual Address
          |
          V
+---------------------+
|    Page Table P1    |
| +-----------------+ |  (Maps Virtual Pages to Physical Frames)
| | P0 -> F5        | |
| +-----------------+ |
| | P1 -> F1        | |
| +-----------------+ |
| | P2 -> (Disk)    | |  <-- Page Fault if accessed!
| +-----------------+ |
| | ...             | |
| +-----------------+ |
| | PN -> F8        | |
| +-----------------+ |
+---------------------+
          |
          |  Physical Address
          |
          V
+-------------------------------------------------+
|                                                 |
|               Physical RAM (Frames)             |
|                                                 |
| +----+ +----+ +----+ +----+ +----+ +----+      |
| | F0 | | F1 | | F2 | | F3 | | F4 | | F5 |  ...  |
| +----+ +----+ +----+ +----+ +----+ +----+      |
|        | P1  |             | P1  |               |
|        | (P1)|             | (P0)|               |
|        +-----+             +-----+               |
|                                                 |
+-------------------------------------------------+
          ^
          |
          |  (Loads pages into frames on page fault)
          |
+-------------------------------------------------+
|                                                 |
|                Secondary Storage                |
|               (Disk / SSD)                      |
|                                                 |
| +---------------------------------------------+ |
| | All Virtual Pages (including P1's Page 2)   | |
| | are stored here when not in RAM             | |
| +---------------------------------------------+ |
|                                                 |
+-------------------------------------------------+
```
**Figure 1: Virtual Memory, Paging, and Page Faults**
This diagram illustrates how a process's virtual memory is mapped to physical RAM via a page table. When a page (like P1's Page 2) is not in RAM, accessing it causes a page fault, and the OS must fetch it from slower secondary storage.

---

```text
Page Reference String (Time t increases -->)

Ref:   A  B  C  D  E  F  G  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V ...
Index: 1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 ...
                                      ^
                                      |
                                  Current Time (t) = 11 (ref K)

                                  <-- Delta (Window Size = 5) -->
                                  G  H  I  J  K
                                  ^           ^
                                  |           |
                              t-Delta+1       t

Working Set at t=11, Delta=5: {G, H, I, J, K} (assuming all unique)
```
**Figure 2: Working Set Window**
This diagram shows a page reference string over time. The "Current Time (t)" marks the latest reference. The "Delta" (window size) defines how many recent references are considered. The working set is the set of *unique* pages within that sliding window. As time progresses, the window slides to the right, and the working set content changes.

---

```text
CPU Utilization
   ^
   |
   |           /
   |          /
   |         /
   |        /
   |       /
   |      /
   |     /
   |    /
   |   /
   |  /
   | /
   |/____________________________________________________________________
   +--------------------------------------------------------------------->
     Low           Optimal          High           Excessive
     Degree of Multiprogramming (Number of active processes)

                                           ^
                                           |
                                           |
                                           |  <-- Thrashing region:
                                           |      CPU utilization drops
                                           |      sharply due to constant
                                           |      paging activity.
```
**Figure 3: CPU Utilization vs. Degree of Multiprogramming (Thrashing Curve)**
This graph illustrates the relationship between the number of active processes (degree of multiprogramming) and CPU utilization. Initially, as more processes run, CPU utilization increases, up to an optimal point where the system is efficiently balanced. Beyond this point, if too many processes are active such that their combined working set demand exceeds available RAM, the system enters a state of thrashing. CPU utilization then drops dramatically because the CPU spends most of its time waiting for page I/O, even though there's "work" to do.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **Mnemonic:** Think of "WST" as **"We Stop Thrashing!"** This reminds you of the Working Set Model's purpose: to prevent Thrashing.
    *   **Visual Hook:** Imagine a **Chef (CPU)** frantically running between a **tiny workbench (RAM)** and a **huge, distant pantry (Disk)**. The **Working Set** is the small pile of ingredients the chef *really* needs for the current recipe. **Thrashing** is when the chef keeps putting ingredients into the pantry to make space, only to immediately need them again, so they spend all their time running back and forth, making no actual food. To "stop thrashing," the manager (OS) needs to give the chef a bigger workbench or reduce the number of recipes being cooked simultaneously.

2.  **1-3 Formulas/Facts They MUST Overlearn:**
    *   **Working Set Definition:** $W(t, \Delta) = \{\text{pages } p \mid p \text{ referenced in } [t-\Delta, t]\}$. (The set of unique pages referenced in the last $\Delta$ time units/references).
    *   **Thrashing Condition:** $\sum_{i \in \text{ActiveProcesses}} |W_i(t, \Delta)| > R_{RAM}$ (Total working set demand exceeds available RAM).
    *   **Thrashing Symptoms:** High Page Fault Rate $\land$ Low CPU Utilization $\land$ High Paging Disk I/O.

3.  **Spaced-Repetition Schedule:**
    *   Review this lesson:
        *   **1 day** from now
        *   **3 days** from now
        *   **7 days** from now
        *   **16 days** from now
        *   **35 days** from now
    *   For each review, try to explain the core concepts (working set, thrashing, prevention) in your own words without looking at the notes first. Then check your understanding against the lesson.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the details, rebuild the concept from first principles:
    *   **Start with the fundamental problem:** CPU is fast, RAM is fast but limited, Disk is slow but huge. How do we run many large programs?
    *   **Solution 1: Virtual Memory & Paging:** OS tricks programs, uses pages, swaps to disk.
    *   **Problem with Solution 1:** Frequent page faults mean slow disk access, wasting CPU time.
    *   **Observation: Locality of Reference:** Programs don't access memory randomly; they reuse recent/nearby data. This is key!
    *   **Leveraging Locality: The Working Set:** If programs use a small, active set of pages, the OS should keep *those* pages in RAM. Define this "active set" as the working set $W(t, \Delta)$.
    *   **Ideal Scenario:** If all active processes' working sets fit in RAM, great performance.
    *   **What if they don't fit?** $\sum |W_i| > R_{RAM}$. Processes start fighting for pages. OS constantly loads/evicts pages.
    *   **The Consequence: Thrashing:** System spends all its time paging, CPU is idle, disk is busy. System becomes useless.
    *   **The Solution: Prevent Thrashing:** OS must monitor working set demands. If total demand exceeds RAM, reduce the number of active processes (degree of multiprogramming) by suspending some. This ensures the remaining processes run efficiently.

## 10. Connections — what this leads to

Understanding the working set model and thrashing is foundational for several advanced topics in computer science and operating systems:

*   **Page Replacement Algorithms:** The working set model provides the theoretical basis for why certain page replacement algorithms (like LRU - Least Recently Used) are effective. LRU is an approximation of the working set, trying to keep pages that were recently used. Other algorithms like optimal (OPT) also implicitly aim to keep the working set in memory.
*   **Memory Management Unit (MMU) Design:** Hardware support within the MMU (e.g., reference bits, dirty bits, TLB) is crucial for efficiently tracking page usage, which is necessary for implementing working set-based policies and other page replacement algorithms.
*   **Operating System Scheduling and Resource Allocation:** The working set model directly influences CPU scheduling decisions. An OS might prioritize scheduling processes whose working sets are already in RAM or might suspend low-priority processes to free up frames for higher-priority ones, especially to prevent thrashing.
*   **NUMA Architectures (Non-Uniform Memory Access):** In systems with NUMA, memory access times vary depending on the CPU's proximity to the memory module. Understanding working sets becomes even more critical to ensure a process's working set resides in memory closest to its executing CPU to minimize latency.
*   **Cache Coherence in Multi-core Systems:** While distinct from virtual memory, the concept of a "working set" has an analogous counterpart in CPU caches. Cache coherence protocols ensure that multiple CPU cores have a consistent view of data, and the effectiveness of caches relies on individual cores having their "working sets" of data in their local caches.
*   **Containerization (Docker, Kubernetes):** In containerized environments, resource limits (e.g., memory limits) are set for individual containers. If a container's working set exceeds its allocated memory, it can lead to out-of-memory (OOM) errors or cause the host system to thrash if not properly managed by the container runtime and orchestrator.
*   **Performance Tuning and Profiling:** System administrators and developers use tools to monitor page fault rates, CPU utilization, and disk I/O to diagnose performance bottlenecks. A clear understanding of thrashing helps in interpreting these metrics and identifying if memory pressure is the root cause of slow performance.

## 11. Self-check questions

1.  Explain in your own words why a system with 128 GB of RAM could still experience thrashing if it's running a single process.
2.  Consider a process with the following page reference string: `P, Q, R, P, S, T, Q, R, S, U, P`. If the working set window $\Delta$ is 4 (measured in page references), what is the working set at time $t=7$ (after 'Q') and at time $t=11$ (after 'P')?
3.  A system has 64 GB of physical RAM. It is running 5 processes, $A, B, C, D, E$. Their estimated average working set sizes are 10 GB, 15 GB, 8 GB, 20 GB, and 12 GB, respectively. If all processes are active, will the system thrash? If so, which single process should be suspended to prevent thrashing, assuming all processes have equal priority and you want to keep as many processes active as possible?
4.  Describe the key differences and similarities between a "page fault" and "thrashing." Can you have page faults without thrashing? Can you have thrashing without page faults? Justify your answer.
5.  Design a simple algorithm (in pseudocode or plain English steps) that an operating system could use to approximate the working set of a process using reference bits, assuming the OS periodically clears these bits. How would your algorithm decide which pages to evict if a new page needs to be loaded and memory is full?