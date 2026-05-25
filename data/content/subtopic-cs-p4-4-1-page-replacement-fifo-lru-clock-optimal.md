## What it is
Page replacement algorithms are policies used by an operating system to decide which memory page to move out to secondary storage (e.g., a disk) when a new page needs to be loaded into a full set of physical memory frames. This process, called "swapping" or "paging out," is necessary because physical memory (RAM) is a finite resource. The goal is to choose a victim page that is least likely to be needed soon to minimize performance-killing page faults.

## Why it matters
In high-performance computing for physics simulations or training large machine learning models, datasets routinely exceed physical RAM. Efficient page replacement is what makes these tasks feasible, preventing the system from "thrashing" (spending all its time swapping pages). In aerospace, real-time operating systems in flight computers have strict deadlines; a page fault introduces unpredictable latency, which can lead to a missed deadline and catastrophic failure. Understanding these algorithms is fundamental to building reliable, high-performance systems.

## When to study it
You must have a solid grasp of the following concepts before proceeding. If any of these are weak, review them first.
1.  **Virtual Memory:** The concept of an address space larger than physical memory.
2.  **Paging:** How virtual addresses are translated to physical addresses via page tables.
3.  **Page Fault:** What a page fault is, and the hardware/software sequence of events that handles it (trap to OS, find page on disk, load into frame, update page table, resume process).
4.  **Principle of Locality:** Temporal and spatial locality as the basis for caching performance.

## How to study it (step by step)
1.  **Setup:** Take a single page reference string and a fixed number of frames. Example: Reference string `R = <1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5>` and 3 memory frames.
2.  **Manual Trace (FIFO):** Trace the First-In, First-Out algorithm by hand on your example. Keep a queue of pages in memory. When a fault occurs and memory is full, the page at the head of the queue is the victim. Count the total page faults.
3.  **Manual Trace (LRU):** Use the same string and frames. Trace the Least Recently Used algorithm. When a fault occurs, the victim is the page that has gone unreferenced for the longest time. Note how this requires tracking usage history. Count the faults.
4.  **Manual Trace (Optimal):** Use the same string and frames. Trace the Optimal (OPT or MIN) algorithm. This time, when a fault occurs, look *forward* in the reference string. The victim is the page that will not be used for the longest time in the future. Count the faults and recognize this is an unrealizable benchmark.
5.  **Manual Trace (Clock):** Use the same string and frames, plus a "use bit" for each frame. Trace the Clock algorithm. When a fault occurs, cycle through the frames. If a frame's use bit is 1, set it to 0 and move on. If it's 0, that page is the victim. This is a practical approximation of LRU.
6.  **Compare and Reflect:** Create a table comparing the number of page faults for each algorithm on your reference string. Articulate *why* LRU and Optimal performed better than FIFO. Explain how Clock attempts to mimic LRU's behavior with less overhead.

## Key ideas, with intuition
1.  **The Goal: Minimize Page Faults.** A page fault is expensive. It requires trapping to the OS and performing a slow disk I/O operation. The performance of the entire virtual memory system hinges on minimizing the page fault rate:
    $$ P_{\text{fault}} = \frac{\text{Number of Page Faults}}{\text{Total Memory References}} $$
    An effective page replacement algorithm keeps this rate low by making intelligent choices about which pages to keep in memory.

2.  **Locality is the Crystal Ball.** The principle of locality states that programs tend to reuse pages they have used recently (temporal locality). Therefore, a page used recently is likely to be used again soon. The Optimal algorithm is perfect because it has true clairvoyance into the future. Since we can't predict the future, other algorithms use the recent past as a proxy.

3.  **LRU: Using the Past to Predict the Future.** Least Recently Used (LRU) is the embodiment of exploiting temporal locality. It assumes the page that hasn't been used for the longest time is the one least likely to be needed next. It performs well but is expensive to implement perfectly, as it requires tracking the access time for every single page.

4.  **Clock: The "Good Enough" LRU.** The Clock algorithm is a clever, efficient approximation of LRU. It avoids the overhead of timestamps by using a single "use bit" per page frame. The hardware sets this bit to 1 on any access. The OS, looking for a victim, sweeps a pointer around the frames like the hand of a clock. It gives pages a "second chance" if their use bit is 1, clearing the bit as it passes. This cheaply identifies pages that have not been used *recently* (i.e., since the last time the clock hand swept past).

## Worked example
Let's trace all four algorithms for a reference string `R = <7, 0, 1, 2, 0, 3, 0, 4, 2, 3>` with 3 available frames. A `*` denotes a page fault.

**Reference String:** `7, 0, 1, 2, 0, 3, 0, 4, 2, 3`

**1. FIFO (First-In, First-Out)**
- Victim is the page that has been in memory the longest. Treat frames like a queue.

| Request | Frame 1 | Frame 2 | Frame 3 | Fault? |
| :--- | :---: | :---: | :---: | :---: |
| 7 | **7** | | | * |
| 0 | 7 | **0** | | * |
| 1 | 7 | 0 | **1** | * |
| 2 | **2** | 0 | 1 | * (7 is oldest) |
| 0 | 2 | 0 | 1 | |
| 3 | 2 | **3** | 1 | * (0 is oldest) |
| 0 | 2 | 3 | **0** | * (1 is oldest) |
| 4 | **4** | 3 | 0 | * (2 is oldest) |
| 2 | 4 | **2** | 0 | * (3 is oldest) |
| 3 | 4 | 2 | **3** | * (0 is oldest) |

**Total FIFO Faults: 9**

**2. LRU (Least Recently Used)**
- Victim is the page that was accessed furthest in the past.

| Request | Frame 1 | Frame 2 | Frame 3 | Fault? | Notes |
| :--- | :---: | :---: | :---: | :---: | :--- |
| 7 | **7** | | | * | |
| 0 | 7 | **0** | | * | |
| 1 | 7 | 0 | **1** | * | |
| 2 | **2** | 0 | 1 | * | LRU: 7 |
| 0 | 2 | **0** | 1 | | |
| 3 | 2 | 0 | **3** | * | LRU: 1 |
| 0 | 2 | **0** | 3 | | |
| 4 | **4** | 0 | 3 | * | LRU: 2 |
| 2 | 4 | 0 | **2** | * | LRU: 3 |
| 3 | **3** | 0 | 2 | * | LRU: 4 |

**Total LRU Faults: 8**

**3. Optimal (OPT/MIN)**
- Victim is the page that will be used furthest in the future.

| Request | Frame 1 | Frame 2 | Frame 3 | Fault? | Notes (Future uses) |
| :--- | :---: | :---: | :---: | :---: | :--- |
| 7 | **7** | | | * | |
| 0 | 7 | **0** | | * | |
| 1 | 7 | 0 | **1** | * | |
| 2 | 7 | 0 | **2** | * | Victim 1 (used last). No, wait, 7 is not used again. Victim is 7. |
| 0 | **0** | 1 | 2 | | Hit |
| 3 | 0 | **3** | 2 | * | Victim 1 (not used again). |
| 0 | 0 | 3 | 2 | | Hit |
| 4 | 0 | **4** | 2 | * | Victim 3 (used furthest away). |
| 2 | 0 | 4 | 2 | | Hit |
| 3 | **3** | 4 | 2 | * | Victim 0 (used furthest away). |

**Total Optimal Faults: 7**

**4. Clock (Second Chance)**
- Use bit `u`. Pointer starts at Frame 1. On fault, advance pointer, if `u=1` set `u=0` & advance, if `u=0` replace.

| Request | Frame 1 (u) | Frame 2 (u) | Frame 3 (u) | Pointer | Fault? | Action |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| 7 | **7(1)** | | | F1 | * | Load 7, set use bit |
| 0 | 7(1) | **0(1)** | | F2 | * | Load 0, set use bit |
| 1 | 7(1) | 0(1) | **1(1)** | F3 | * | Load 1, set use bit |
| 2 | **2(1)** | 0(1) | 1(1) | F1 | * | Ptr->F1, u=1->0. Ptr->F2, u=1->0. Ptr->F3, u=1->0. Ptr->F1, u=0. Replace 7. |
| 0 | 2(1) | **0(1)** | 1(1) | F1 | | Hit 0, set use bit |
| 3 | 2(1) | 0(1) | **3(1)** | F2 | * | Ptr->F2, u=1->0. Ptr->F3, u=1->0. Ptr->F1, u=1->0. Ptr->F2, u=0. Replace 1. |
| 0 | 2(1) | **0(1)** | 3(1) | F2 | | Hit 0, set use bit |
| 4 | **4(1)** | 0(1) | 3(1) | F3 | * | Ptr->F3, u=1->0. Ptr->F1, u=1->0. Ptr->F2, u=1->0. Ptr->F3, u=0. Replace 2. |
| 2 | 4(1) | **2(1)** | 3(1) | F1 | * | Ptr->F1, u=1->0. Ptr->F2, u=0. Replace 0. |
| 3 | 4(1) | 2(1) | **3(1)** | F1 | | Hit 3, set use bit |

**Total Clock Faults: 8**

*Reflection*: FIFO performed worst because it foolishly evicted page 0 right before it was needed again. LRU and Clock performed better by keeping recently used pages (like 0 and 2) around. Optimal performed best because it had perfect knowledge, for example, knowing to evict page 7 at step 4 because it would never be used again.

## Diagrams
This ASCII diagram shows the state of the 3 memory frames over time for the LRU example.

```text
Time -->
Access:   7     0     1     2     0     3     0     4     2     3
        +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
Frame 1 |  7  |  7  |  7  |  2  |  2  |  2  |  2  |  4  |  4  |  3  |
        +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
Frame 2 |     |  0  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |  0  |
        +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
Frame 3 |     |     |  1  |  1  |  1  |  3  |  3  |  3  |  2  |  2  |
        +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
Fault?    *     *     *     *           *           *     *     *
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you're a librarian with only 3 spots on the "Ready Reference" shelf (physical frames). Readers keep asking for books (pages). When the shelf is full and a new book is requested, you must move one back to the main stacks (disk).
    - **FIFO:** You evict the book that's been on the shelf the longest, even if it's the dictionary everyone uses. "First book on, first book off."
    - **LRU:** You evict the book that has collected the most dust. "Least Recently Used."
    - **Optimal:** You are a psychic and evict the book you know won't be requested for the longest time. "Future-teller."
    - **Clock:** You're a lazy LRU librarian. You just walk around the circular shelf. If a book has a "used today" sticky note, you remove the note and give it a second chance. If it has no note, you evict it. "Second Chance."

2.  **Must Overlearn:**
    - **FIFO:** Evict the oldest page in memory.
    - **LRU:** Evict the page with the oldest *access* time.
    - **Optimal:** Evict the page that will be accessed furthest in the future. (Benchmark only).

3.  **Spaced Repetition Schedule:**
    - **1 Day:** Redo the worked example from memory.
    - **3 Days:** Find a new reference string online and trace all four algorithms.
    - **7 Days:** Explain the difference between LRU and Clock, and why Clock is a practical approximation.
    - **16 Days:** Write pseudocode for the Clock algorithm.
    - **35 Days:** Answer the self-check questions again.

4.  **First Principles Pathway:** If you forget, start here:
    - What is the goal? To minimize page faults.
    - What is a page fault? Accessing a page not in RAM.
    - Why are they bad? They require slow disk I/O.
    - How can we predict which page to evict? We can't know the future. So, what's the next best thing? The recent past (Principle of Locality). This leads you directly to the idea of LRU. From there, you can reason about simpler (FIFO) or more practical (Clock) implementations.

## Common mistakes
1.  **Confusing FIFO's load time with LRU's access time.** For LRU, a page's "age" is reset every time it's accessed (a hit). For FIFO, a page's "age" is fixed from when it was first loaded; hits do not affect its position in the queue.
2.  **Mismanaging the Clock pointer.** The pointer for the Clock algorithm only advances when a page fault occurs and you are searching for a victim. It does *not* advance on a hit. It continues its scan from where it last left off.
3.  **Belady's Anomaly Misattribution.** Students sometimes think all simple algorithms suffer from Belady's Anomaly (where adding more memory frames *increases* page faults). This is a specific pathology of FIFO and a few others; it does *not* affect LRU or Optimal.
4.  **Implementing LRU inefficiently.** In the worked example, we can just "look" at the past to find the LRU page. In a real system, this is hard. A common mistake is to assume LRU is cheap; it's not, which is why approximations like Clock exist.

## Self-check
1.  Given 4 frames and the reference string `R = <1, 2, 3, 4, 5, 3, 4, 1, 6, 7, 8, 7, 8, 9, 7, 8, 9, 5, 4, 5, 4, 2>`, calculate the number of page faults for FIFO and LRU.
2.  Explain, in terms of the principle of locality, why LRU almost always outperforms FIFO. Provide a short reference string where FIFO outperforms LRU.
3.  An enhanced version of the Clock algorithm uses a "dirty bit" in addition to the "use bit". The replacement policy is to find the first frame in the circular scan that is `(use=0, dirty=0)`. If none, then `(use=0, dirty=1)`, etc. What is the advantage of evicting a "clean" page over a "dirty" page, and why is this algorithm a better approximation of LRU?