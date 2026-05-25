## 1. What it is — in plain English

Imagine your computer's main memory (RAM) as a long, empty shelf. When you open an application, like a web browser or a game, that application needs a place to store its data and instructions while it's running. This "place" is a section of the memory shelf.

"Contiguous memory allocation" simply means that when an application asks for memory, the operating system tries to give it one single, unbroken block of space on that shelf. It's like finding a single, continuous stretch of empty shelf big enough for your entire book collection, rather than scattering your books across many small, separate spots.

So, if an application needs 100 units of memory, the operating system looks for a single, empty segment of 100 units. If it finds one, it assigns it to the application. If it doesn't, the application might have to wait, or the operating system might try to rearrange things. This approach keeps all of an application's memory together, which can simplify how the computer accesses that data.

The "first-fit, best-fit, worst-fit" part refers to the different strategies the operating system uses when it's looking for that empty space. It's like you're trying to park your car in a busy lot: do you take the very first spot you see (first-fit), the smallest spot that still fits your car perfectly (best-fit), or the largest available spot, even if your car is tiny (worst-fit)? Each strategy has its pros and cons in how efficiently it uses the memory shelf.

## 2. Why it matters — real-world applications

Contiguous memory allocation, while having some drawbacks that modern systems often mitigate with more advanced techniques, forms a foundational understanding of how memory management works. Its principles are still relevant in specific contexts and for understanding the evolution of operating systems.

1.  **Embedded Systems and Real-time Operating Systems (RTOS):** In systems where resources are extremely limited and predictable performance is paramount (like in aircraft control systems, medical devices, or industrial robots), simpler memory management schemes are often preferred. Contiguous allocation can offer deterministic memory access times and lower overhead compared to complex virtual memory systems. For instance, a flight control computer on a **Boeing 787 Dreamliner** might use an RTOS where critical flight software components are allocated contiguous blocks of memory at system startup to ensure their data is always quickly accessible without page faults or complex lookups.
2.  **Early Operating Systems and Legacy Software:** Understanding contiguous allocation helps in comprehending how operating systems like **MS-DOS** or early versions of **Windows (e.g., Windows 3.1)** managed memory. Many legacy applications, still running in specialized industrial setups or niche environments, were designed with these memory models in mind. When troubleshooting or optimizing such systems, knowledge of contiguous allocation strategies is crucial.
3.  **High-Performance Computing (HPC) and Scientific Simulations:** While not strictly contiguous in the sense of a single process owning *all* physical memory, the concept of allocating large, contiguous *virtual* memory blocks that map efficiently to physical memory is critical. For example, in **computational fluid dynamics (CFD) simulations** used by **NASA** or **SpaceX** to model rocket engine performance, large arrays representing physical grids (e.g., millions of cells for airflow around a rocket) are often requested as single, massive blocks. Efficient allocation strategies, even if managed by a virtual memory system, still benefit from understanding how to find and manage large "holes" of available memory to ensure data locality and minimize cache misses.
4.  **GPU Memory Management:** Graphics Processing Units (GPUs), crucial for machine learning (e.g., **NVIDIA's CUDA platform** for training large language models like **GPT-4**), often deal with large, contiguous blocks of memory for textures, frame buffers, and model weights. While GPUs have their own memory hierarchies and allocation mechanisms, the underlying principle of finding and assigning a single, large block for a kernel to operate on is analogous to contiguous allocation. Efficiently placing these blocks affects performance significantly.
5.  **Understanding Fragmentation:** The most significant "why it matters" aspect is that studying contiguous allocation strategies is the best way to deeply understand **memory fragmentation** (internal and external), which is a core problem in all memory management. Even in modern systems with virtual memory, the *physical* memory can still suffer from fragmentation, impacting performance. By grappling with first-fit, best-fit, and worst-fit, you learn the fundamental trade-offs in memory utilization that persist in more complex forms today.

## 3. Prerequisites — what you must know first

Before diving into contiguous memory allocation strategies, ensure you have a solid grasp of these fundamental concepts:

*   **Computer Memory Basics (RAM):** Understanding what RAM is, its role in a computer system, and how it stores data temporarily for the CPU.
*   **Operating System (OS) Basics:** What an OS is, its primary functions (including resource management), and its role as an intermediary between hardware and applications.
*   **Processes and Programs:** The distinction between a program (a static set of instructions) and a process (a program in execution, with its own memory space, CPU registers, etc.).
*   **Memory Addresses:** How memory locations are identified using unique numerical addresses (e.g., from 0 to MAX_MEMORY_SIZE).
*   **Memory Blocks/Partitions:** The idea that memory can be divided into distinct sections, some occupied by processes, others free.
*   **Data Structures (Lists):** Basic understanding of how lists (especially linked lists or arrays) can store and organize information, which is often used to keep track of free or occupied memory blocks.

## 4. The core idea — step by step

The core idea of contiguous memory allocation is that when a process needs to run, the operating system finds a single, unbroken block of memory large enough to hold the entire process. This section will walk through how the OS achieves this, focusing on the common strategies for choosing *which* free block to use.

### Step 1: The Memory Landscape

**Plain-English Statement:** Imagine your computer's RAM as a single, long road. Different cars (processes) are parked along this road, taking up segments. The empty spots between the cars are where new cars can park.

**Concrete Example:**
Let's say we have a memory of 1000 units.
*   Process A occupies addresses 0-199 (size 200).
*   Addresses 200-399 are free (size 200).
*   Process B occupies addresses 400-549 (size 150).
*   Addresses 550-799 are free (size 250).
*   Process C occupies addresses 800-999 (size 200).

Our "road" looks like this: `[A][FREE][B][FREE][C]`

**Formal/Mathematical Version:**
Memory is represented as a contiguous address space, typically from address 0 to $M-1$, where $M$ is the total memory size.
A process $P_i$ requiring $S_i$ units of memory needs to be allocated a block of physical memory starting at address $A_i$ such that the block $[A_i, A_i + S_i - 1]$ is entirely free.

**What could go wrong:** If there are many small free spots but no single spot large enough for a new process, the process cannot be loaded, even if the total amount of free memory is sufficient. This is called **external fragmentation**.

### Step 2: Tracking Free Memory

**Plain-English Statement:** To know where new processes can park, the operating system needs a map of all the empty spots (called "holes"). It keeps a list of these holes, noting where each hole starts and how big it is.

**Concrete Example:**
From our Step 1 example, the OS would maintain a list like this:
*   Hole 1: Start Address = 200, Size = 200
*   Hole 2: Start Address = 550, Size = 250

**Formal/Mathematical Version:**
The operating system maintains a data structure, often a linked list or an array, of free memory blocks (holes). Each entry in this structure typically contains:
*   `Start Address (A_hole)`: The starting physical address of the free block.
*   `Size (S_hole)`: The length of the free block.

When a process $P$ of size $S_P$ requests memory, the OS searches this list for a hole $H$ such that $S_{hole} \ge S_P$.

**What could go wrong:** If the list isn't updated correctly when processes are loaded or unloaded, the OS might allocate memory that's already in use, leading to crashes or data corruption.

### Step 3: First-Fit Allocation Strategy

**Plain-English Statement:** When a new process needs memory, the OS scans its list of empty spots (holes) from the very beginning. The *first* hole it finds that is big enough to fit the process is chosen. It's like taking the first available parking spot you see that your car can fit into.

**Concrete Example:**
Memory Holes:
1.  Start: 200, Size: 200
2.  Start: 550, Size: 250
New Process D needs 180 units of memory.

*   The OS looks at Hole 1 (size 200). Is 200 >= 180? Yes.
*   Hole 1 is chosen. Process D is placed at address 200.
*   The remaining part of Hole 1 (200 - 180 = 20 units) becomes a smaller new hole: Start: 200+180=380, Size: 20.
*   The updated holes list might be: (Start: 380, Size: 20), (Start: 550, Size: 250).

**Formal/Mathematical Version:**
Given a request for memory of size $S_P$, the First-Fit algorithm searches the list of free blocks $H_1, H_2, \dots, H_n$ in order. It selects the first $H_i$ such that $S_{H_i} \ge S_P$.
If such a block is found:
1.  Allocate $S_P$ from $H_i$.
2.  If $S_{H_i} > S_P$, the remaining part $S_{H_i} - S_P$ forms a new, smaller free block. Its start address will be $A_{H_i} + S_P$.
3.  If $S_{H_i} = S_P$, the entire block $H_i$ is consumed and removed from the free list.

**What could go wrong:** First-Fit can quickly use up smaller free blocks near the beginning of memory, leaving many small, unusable fragments at the start. This can lead to larger requests having to search further down the list, or fail entirely even if large blocks exist elsewhere.

### Step 4: Best-Fit Allocation Strategy

**Plain-English Statement:** When a new process needs memory, the OS scans *all* available empty spots (holes) and finds the one that is just barely big enough – the smallest hole that can still fit the process. It's like finding the parking spot that's the perfect size for your car, minimizing wasted space.

**Concrete Example:**
Memory Holes:
1.  Start: 200, Size: 200
2.  Start: 550, Size: 250
3.  Start: 100, Size: 190 (added for illustration)
New Process E needs 180 units of memory.

*   Hole 1 (size 200): Fits (200 - 180 = 20 excess).
*   Hole 2 (size 250): Fits (250 - 180 = 70 excess).
*   Hole 3 (size 190): Fits (190 - 180 = 10 excess).
*   The smallest excess is 10, from Hole 3. So, Hole 3 is chosen.
*   Process E is placed at address 100.
*   The remaining part of Hole 3 (190 - 180 = 10 units) becomes a smaller new hole: Start: 100+180=280, Size: 10.
*   The updated holes list might be: (Start: 200, Size: 200), (Start: 550, Size: 250), (Start: 280, Size: 10).

**Formal/Mathematical Version:**
Given a request for memory of size $S_P$, the Best-Fit algorithm searches *all* free blocks $H_1, H_2, \dots, H_n$. It selects the $H_i$ such that $S_{H_i} \ge S_P$ and $S_{H_i} - S_P$ is minimized (i.e., the smallest possible remainder).
The allocation and update process is the same as First-Fit once the block is chosen.

**What could go wrong:** Best-Fit tends to leave many very small, unusable fragments of memory. These tiny holes might be too small for any future process, leading to significant external fragmentation over time. It also requires searching the *entire* free list, which can be slower than First-Fit.

### Step 5: Worst-Fit Allocation Strategy

**Plain-English Statement:** When a new process needs memory, the OS scans *all* available empty spots (holes) and finds the *largest* one available. It then places the process there, hoping that the large remaining piece will be useful for other, larger processes later. It's like taking the biggest parking spot in the lot, even if your car is small, because you want to leave medium-sized spots for medium-sized cars.

**Concrete Example:**
Memory Holes:
1.  Start: 200, Size: 200
2.  Start: 550, Size: 250
3.  Start: 100, Size: 190
New Process F needs 180 units of memory.

*   Hole 1 (size 200): Fits.
*   Hole 2 (size 250): Fits.
*   Hole 3 (size 190): Fits.
*   The largest hole is Hole 2 (size 250). So, Hole 2 is chosen.
*   Process F is placed at address 550.
*   The remaining part of Hole 2 (250 - 180 = 70 units) becomes a smaller new hole: Start: 550+180=730, Size: 70.
*   The updated holes list might be: (Start: 200, Size: 200), (Start: 100, Size: 190), (Start: 730, Size: 70).

**Formal/Mathematical Version:**
Given a request for memory of size $S_P$, the Worst-Fit algorithm searches *all* free blocks $H_1, H_2, \dots, H_n$. It selects the $H_i$ such that $S_{H_i} \ge S_P$ and $S_{H_i} - S_P$ is maximized (i.e., the largest possible remainder).
The allocation and update process is the same as First-Fit once the block is chosen.

**What could go wrong:** Worst-Fit tends to break large holes into medium-sized holes. While this might seem good for larger future requests, it can also quickly fragment the largest available blocks, making it difficult to satisfy *very* large requests later. It also suffers from the same performance drawback as Best-Fit, requiring a full scan of the free list.

### Step 6: Dealing with Process Termination

**Plain-English Statement:** When a process finishes, the memory it was using becomes free again. The OS adds this newly freed block back to its list of holes. If this new hole is next to an existing free hole, the OS merges them into one larger hole to reduce fragmentation. It's like when a car leaves a parking spot, and if the spot next to it was also empty, those two empty spots become one bigger empty spot.

**Concrete Example:**
Initial Holes: (Start: 200, Size: 200), (Start: 550, Size: 250)
Processes: (Process A: 0-199), (Process B: 400-549), (Process C: 800-999)

Suppose Process B (400-549) terminates.
*   A new free block (Start: 400, Size: 150) is created.
*   The OS checks its neighbors:
    *   Is there a free block *before* address 400? Yes, (Start: 200, Size: 200) ends at 399. So, (200-399) and (400-549) can merge.
    *   Is there a free block *after* address 549? Yes, (Start: 550, Size: 250) starts at 550. So, (400-549) and (550-799) can merge.
*   The three blocks (200-399), (400-549), (550-799) merge into one large block: (Start: 200, Size: 200 + 150 + 250 = 600).
*   The updated holes list would be: (Start: 200, Size: 600).

**Formal/Mathematical Version:**
When a process $P_i$ occupying memory block $[A_i, A_i + S_i - 1]$ terminates:
1.  The block $B_{new} = (A_i, S_i)$ is added to the free list.
2.  The OS checks for adjacent free blocks:
    *   If there is a free block $B_{prev} = (A_{prev}, S_{prev})$ such that $A_{prev} + S_{prev} = A_i$, then $B_{new}$ and $B_{prev}$ are merged into a new block $(A_{prev}, S_{prev} + S_i)$.
    *   If there is a free block $B_{next} = (A_{next}, S_{next})$ such that $A_i + S_i = A_{next}$, then $B_{new}$ and $B_{next}$ are merged into a new block $(A_i, S_i + S_{next})$.
    *   These merges can occur iteratively (e.g., if a block is freed between two existing free blocks, all three merge).

**What could go wrong:** If the OS fails to merge adjacent free blocks, it exacerbates external fragmentation, leading to many small, unusable holes even if the total free memory is large. This is a critical step for maintaining memory efficiency.

## 5. Worked examples — multiple, with every step shown

Let's work through several examples using a fixed memory size and a sequence of process requests and terminations.

Assume a total memory of 1000 units, initially all free.
`Free List: [(Start: 0, Size: 1000)]`

### Example 1: Basic First-Fit

**Problem:** Allocate processes P1(200), P2(400), P3(100) using First-Fit. Then terminate P2. Then allocate P4(250).

**Given:**
*   Initial Free Memory: `[(Start: 0, Size: 1000)]`
*   Requests: P1(200), P2(400), P3(100)
*   Termination: P2
*   Request: P4(250)

**What we want:** The state of memory (allocated processes and free list) after each step.

---

**Step 1: Allocate P1 (size 200) using First-Fit.**
*   **Current Free List:** `[(Start: 0, Size: 1000)]`
*   **Process P1 size:** 200
*   **Logic:** First-Fit scans the list. The first hole is (0, 1000). Is 1000 >= 200? Yes.
*   **Action:** Allocate P1 from (0, 1000).
*   **Resulting P1 location:** $P1 \text{ at } [0, 199]$
*   **Update Free List:** The hole (0, 1000) becomes (0, 200) for P1 and a new hole (200, 800) for the remainder.
*   **New Free List:** `[(Start: 200, Size: 800)]`
*   **Memory State:** `[P1(200)][Free(800)]`

---

**Step 2: Allocate P2 (size 400) using First-Fit.**
*   **Current Free List:** `[(Start: 200, Size: 800)]`
*   **Process P2 size:** 400
*   **Logic:** First-Fit scans the list. The first hole is (200, 800). Is 800 >= 400? Yes.
*   **Action:** Allocate P2 from (200, 800).
*   **Resulting P2 location:** $P2 \text{ at } [200, 599]$
*   **Update Free List:** The hole (200, 800) becomes (200, 400) for P2 and a new hole (600, 400) for the remainder.
*   **New Free List:** `[(Start: 600, Size: 400)]`
*   **Memory State:** `[P1(200)][P2(400)][Free(400)]`

---

**Step 3: Allocate P3 (size 100) using First-Fit.**
*   **Current Free List:** `[(Start: 600, Size: 400)]`
*   **Process P3 size:** 100
*   **Logic:** First-Fit scans the list. The first hole is (600, 400). Is 400 >= 100? Yes.
*   **Action:** Allocate P3 from (600, 400).
*   **Resulting P3 location:** $P3 \text{ at } [600, 699]$
*   **Update Free List:** The hole (600, 400) becomes (600, 100) for P3 and a new hole (700, 300) for the remainder.
*   **New Free List:** `[(Start: 700, Size: 300)]`
*   **Memory State:** `[P1(200)][P2(400)][P3(100)][Free(300)]`

---

**Step 4: Terminate P2.**
*   **P2 location:** $[200, 599]$ (size 400)
*   **Current Free List:** `[(Start: 700, Size: 300)]`
*   **Logic:** P2 frees up memory at [200, 599]. We check for adjacent free blocks.
    *   No free block immediately before P2 (P1 is at 0-199).
    *   No free block immediately after P2 (P3 is at 600-699).
*   **Action:** Add the freed block as a new hole.
*   **New Free List:** `[(Start: 200, Size: 400), (Start: 700, Size: 300)]` (Order might vary depending on implementation; usually kept sorted by address or size, but for First-Fit, order of discovery is often used initially). Let's sort by address for clarity.
*   **New Free List (sorted):** `[(Start: 200, Size: 400), (Start: 700, Size: 300)]`
*   **Memory State:** `[P1(200)][Free(400)][P3(100)][Free(300)]`

---

**Step 5: Allocate P4 (size 250) using First-Fit.**
*   **Current Free List:** `[(Start: 200, Size: 400), (Start: 700, Size: 300)]`
*   **Process P4 size:** 250
*   **Logic:** First-Fit scans the list.
    *   Hole 1: (200, 400). Is 400 >= 250? Yes.
*   **Action:** Allocate P4 from (200, 400).
*   **Resulting P4 location:** $P4 \text{ at } [200, 449]$
*   **Update Free List:** The hole (200, 400) becomes (200, 250) for P4 and a new hole (450, 150) for the remainder.
*   **New Free List:** `[(Start: 450, Size: 150), (Start: 700, Size: 300)]`
*   **Memory State:** `[P1(200)][P4(250)][Free(150)][P3(100)][Free(300)]`

---

**Final Answer for Example 1:**
After all operations, the memory state is:
*   P1: [0, 199]
*   P4: [200, 449]
*   P3: [600, 699]
*   Free List: `[(Start: 450, Size: 150), (Start: 700, Size: 300)]`

**Reflection:** First-Fit quickly found the first available block for P4, splitting the 400-unit hole. This demonstrates its speed but also how it can leave smaller fragments.

### Example 2: Best-Fit Allocation

**Problem:** Using the same initial state as Example 1, allocate processes P1(200), P2(400), P3(100) using Best-Fit. Then terminate P2. Then allocate P4(250).

**Given:**
*   Initial Free Memory: `[(Start: 0, Size: 1000)]`
*   Requests: P1(200), P2(400), P3(100)
*   Termination: P2
*   Request: P4(250)

**What we want:** The state of memory after each step using Best-Fit.

---

**Step 1: Allocate P1 (size 200) using Best-Fit.**
*   **Current Free List:** `[(Start: 0, Size: 1000)]`
*   **Process P1 size:** 200
*   **Logic:** Best-Fit scans all holes. Only one hole (0, 1000) is available. It is the best (and only) fit.
*   **Action:** Allocate P1 from (0, 1000).
*   **Resulting P1 location:** $P1 \text{ at } [0, 199]$
*   **Update Free List:** The hole (0, 1000) becomes (0, 200) for P1 and a new hole (200, 800) for the remainder.
*   **New Free List:** `[(Start: 200, Size: 800)]`
*   **Memory State:** `[P1(200)][Free(800)]`

---

**Step 2: Allocate P2 (size 400) using Best-Fit.**
*   **Current Free List:** `[(Start: 200, Size: 800)]`
*   **Process P2 size:** 400
*   **Logic:** Best-Fit scans all holes. Only one hole (200, 800) is available. It is the best (and only) fit.
*   **Action:** Allocate P2 from (200, 800).
*   **Resulting P2 location:** $P2 \text{ at } [200, 599]$
*   **Update Free List:** The hole (200, 800) becomes (200, 400) for P2 and a new hole (600, 400) for the remainder.
*   **New Free List:** `[(Start: 600, Size: 400)]`
*   **Memory State:** `[P1(200)][P2(400)][Free(400)]`

---

**Step 3: Allocate P3 (size 100) using Best-Fit.**
*   **Current Free List:** `[(Start: 600, Size: 400)]`
*   **Process P3 size:** 100
*   **Logic:** Best-Fit scans all holes. Only one hole (600, 400) is available. It is the best (and only) fit.
*   **Action:** Allocate P3 from (600, 400).
*   **Resulting P3 location:** $P3 \text{ at } [600, 699]$
*   **Update Free List:** The hole (600, 400) becomes (600, 100) for P3 and a new hole (700, 300) for the remainder.
*   **New Free List:** `[(Start: 700, Size: 300)]`
*   **Memory State:** `[P1(200)][P2(400)][P3(100)][Free(300)]`

---

**Step 4: Terminate P2.**
*   **P2 location:** $[200, 599]$ (size 400)
*   **Current Free List:** `[(Start: 700, Size: 300)]`
*   **Logic:** P2 frees up memory at [200, 599]. Check for adjacent free blocks.
    *   No free block immediately before P2 (P1 is at 0-199).
    *   No free block immediately after P2 (P3 is at 600-699).
*   **Action:** Add the freed block as a new hole.
*   **New Free List (sorted by address):** `[(Start: 200, Size: 400), (Start: 700, Size: 300)]`
*   **Memory State:** `[P1(200)][Free(400)][P3(100)][Free(300)]`

---

**Step 5: Allocate P4 (size 250) using Best-Fit.**
*   **Current Free List:** `[(Start: 200, Size: 400), (Start: 700, Size: 300)]`
*   **Process P4 size:** 250
*   **Logic:** Best-Fit scans all holes to find the smallest one that fits.
    *   Hole 1: (200, 400). Fits. Remainder: $400 - 250 = 150$.
    *   Hole 2: (700, 300). Fits. Remainder: $300 - 250 = 50$.
    *   The smallest remainder is 50, from Hole 2. So, Hole 2 is the best fit.
*   **Action:** Allocate P4 from (700, 300).
*   **Resulting P4 location:** $P4 \text{ at } [700, 949]$
*   **Update Free List:** The hole (700, 300) becomes (700, 250) for P4 and a new hole (950, 50) for the remainder.
*   **New Free List (sorted by address):** `[(Start: 200, Size: 400), (Start: 950, Size: 50)]`
*   **Memory State:** `[P1(200)][Free(400)][P3(100)][P4(250)][Free(50)]`

---

**Final Answer for Example 2:**
After all operations, the memory state is:
*   P1: [0, 199]
*   P3: [600, 699]
*   P4: [700, 949]
*   Free List: `[(Start: 200, Size: 400), (Start: 950, Size: 50)]`

**Reflection:** Best-Fit chose the 300-unit hole for P4, leaving a tiny 50-unit fragment. This illustrates its tendency to create many small, potentially unusable holes, increasing external fragmentation.

### Example 3: Worst-Fit Allocation

**Problem:** Using the same initial state as Example 1, allocate processes P1(200), P2(400), P3(100) using Worst-Fit. Then terminate P2. Then allocate P4(250).

**Given:**
*   Initial Free Memory: `[(Start: 0, Size: 1000)]`
*   Requests: P1(200), P2(400), P3(100)
*   Termination: P2
*   Request: P4(250)

**What we want:** The state of memory after each step using Worst-Fit.

---

**Step 1: Allocate P1 (size 200) using Worst-Fit.**
*   **Current Free List:** `[(Start: 0, Size: 1000)]`
*   **Process P1 size:** 200
*   **Logic:** Worst-Fit scans all holes. Only one hole (0, 1000) is available. It is the worst (and only) fit.
*   **Action:** Allocate P1 from (0, 1000).
*   **Resulting P1 location:** $P1 \text{ at } [0, 199]$
*   **Update Free List:** The hole (0, 1000) becomes (0, 200) for P1 and a new hole (200, 800) for the remainder.
*   **New Free List:** `[(Start: 200, Size: 800)]`
*   **Memory State:** `[P1(200)][Free(800)]`

---

**Step 2: Allocate P2 (size 400) using Worst-Fit.**
*   **Current Free List:** `[(Start: 200, Size: 800)]`
*   **Process P2 size:** 400
*   **Logic:** Worst-Fit scans all holes. Only one hole (200, 800) is available. It is the worst (and only) fit.
*   **Action:** Allocate P2 from (200, 800).
*   **Resulting P2 location:** $P2 \text{ at } [200, 599]$
*   **Update Free List:** The hole (200, 800) becomes (200, 400) for P2 and a new hole (600, 400) for the remainder.
*   **New Free List:** `[(Start: 600, Size: 400)]`
*   **Memory State:** `[P1(200)][P2(400)][Free(400)]`

---

**Step 3: Allocate P3 (size 100) using Worst-Fit.**
*   **Current Free List:** `[(Start: 600, Size: 400)]`
*   **Process P3 size:** 100
*   **Logic:** Worst-Fit scans all holes. Only one hole (600, 400) is available. It is the worst (and only) fit.
*   **Action:** Allocate P3 from (600, 400).
*   **Resulting P3 location:** $P3 \text{ at } [600, 699]$
*   **Update Free List:** The hole (600, 400) becomes (600, 100) for P3 and a new hole (700, 300) for the remainder.
*   **New Free List:** `[(Start: 700, Size: 300)]`
*   **Memory State:** `[P1(200)][P2(400)][P3(100)][Free(300)]`

---

**Step 4: Terminate P2.**
*   **P2 location:** $[200, 599]$ (size 400)
*   **Current Free List:** `[(Start: 700, Size: 300)]`
*   **Logic:** P2 frees up memory at [200, 599]. Check for adjacent free blocks.
    *   No free block immediately before P2 (P1 is at 0-199).
    *   No free block immediately after P2 (P3 is at 600-699).
*   **Action:** Add the freed block as a new hole.
*   **New Free List (sorted by address):** `[(Start: 200, Size: 400), (Start: 700, Size: 300)]`
*   **Memory State:** `[P1(200)][Free(400)][P3(100)][Free(300)]`

---

**Step 5: Allocate P4 (size 250) using Worst-Fit.**
*   **Current Free List:** `[(Start: 200, Size: 400), (Start: 700, Size: 300)]`
*   **Process P4 size:** 250
*   **Logic:** Worst-Fit scans all holes to find the largest one that fits.
    *   Hole 1: (200, 400). Fits. Remainder: $400 - 250 = 150$.
    *   Hole 2: (700, 300). Fits. Remainder: $300 - 250 = 50$.
    *   The largest remainder is 150, from Hole 1. So, Hole 1 is the worst fit.
*   **Action:** Allocate P4 from (200, 400).
*   **Resulting P4 location:** $P4 \text{ at } [200, 449]$
*   **Update Free List:** The hole (200, 400) becomes (200, 250) for P4 and a new hole (450, 150) for the remainder.
*   **New Free List (sorted by address):** `[(Start: 450, Size: 150), (Start: 700, Size: 300)]`
*   **Memory State:** `[P1(200)][P4(250)][Free(150)][P3(100)][Free(300)]`

---

**Final Answer for Example 3:**
After all operations, the memory state is:
*   P1: [0, 199]
*   P4: [200, 449]
*   P3: [600, 699]
*   Free List: `[(Start: 450, Size: 150), (Start: 700, Size: 300)]`

**Reflection:** Worst-Fit chose the 400-unit hole for P4, leaving a 150-unit fragment. In this specific sequence, Worst-Fit and First-Fit ended up with the same final memory state, but this is not always the case. Worst-Fit aims to leave a larger, more usable remainder, but it also means it might split truly large blocks, potentially preventing very large future allocations.

### Example 4: Fragmentation and Merging (Mixed Strategies)

**Problem:** Initial Free List: `[(Start: 100, Size: 50), (Start: 200, Size: 150), (Start: 400, Size: 100)]`.
Processes: P_A(40) at [0,39], P_B(80) at [300,379].
1.  Allocate P_X(45) using **Best-Fit**.
2.  Allocate P_Y(110) using **First-Fit**.
3.  Terminate P_X.
4.  Allocate P_Z(90) using **Worst-Fit**.

**Given:**
*   Initial Free List: `[(Start: 100, Size: 50), (Start: 200, Size: 150), (Start: 400, Size: 100)]`
*   Processes already in memory: P_A(40) at [0,39], P_B(80) at [300,379]
*   Requests: P_X(45) (Best-Fit), P_Y(110) (First-Fit), P_Z(90) (Worst-Fit)
*   Termination: P_X

**What we want:** The state of memory after each step.

---

**Initial Memory State (for reference):**
`[P_A(40)][Free(60)][Free(50)][Free(50)][P_B(80)][Free(20)][Free(100)]`
More accurately:
`[P_A(40)][Free (100,50)][Free (200,150)][P_B(80)][Free (400,100)]`
This means the region `[40, 99]` is free, but not explicitly in the list, implying it's either too small or not tracked. The problem statement gives us the *tracked* free list. Let's assume the blocks [0,39] and [300,379] are the only occupied blocks initially, and the rest of memory is free *except* for the specified holes. This means regions like [40,99], [150,199], [250,299], [380,399], [500,MAX] are *not* free holes, but occupied by other "implicit" processes or simply not part of the address space we're considering. Let's stick to the given Free List as the *only* available free space.

**Current Free List:** `[(Start: 100, Size: 50), (Start: 200, Size: 150), (Start: 400, Size: 100)]`
**Current Processes (for context):** P_A at [0,39], P_B at [300,379] (these are *not* in the free list, they are occupied)

---

**Step 1: Allocate P_X (size 45) using Best-Fit.**
*   **Process P_X size:** 45
*   **Logic:** Best-Fit scans all holes to find the smallest one that fits.
    *   Hole 1: (100, 50). Fits. Remainder: $50 - 45 = 5$.
    *   Hole 2: (200, 150). Fits. Remainder: $150 - 45 = 105$.
    *   Hole 3: (400, 100). Fits. Remainder: $100 - 45 = 55$.
    *   Smallest remainder is 5, from Hole 1. So, Hole 1 is the best fit.
*   **Action:** Allocate P_X from (100, 50).
*   **Resulting P_X location:** $P_X \text{ at } [100, 144]$
*   **Update Free List:** The hole (100, 50) becomes (100, 45) for P_X and a new hole (145, 5) for the remainder.
*   **New Free List (sorted by address):** `[(Start: 145, Size: 5), (Start: 200, Size: 150), (Start: 400, Size: 100)]`
*   **Memory State (conceptual):** `[P_A(40)][P_X(45)][Free(5)][Free(50)][P_B(80)][Free(100)]`
    (Note: The "Free(50)" is actually part of the 200-150 block, not a separate block. The conceptual view is hard to draw with non-contiguous free blocks. The free list is the definitive source.)

---

**Step 2: Allocate P_Y (size 110) using First-Fit.**
*   **Current Free List:** `[(Start: 145, Size: 5), (Start: 200, Size: 150), (Start: 400, Size: 100)]`
*   **Process P_Y size:** 110
*   **Logic:** First-Fit scans the list from the beginning.
    *   Hole 1: (145, 5). Is 5 >= 110? No.
    *   Hole 2: (200, 150). Is 150 >= 110? Yes.
*   **Action:** Allocate P_Y from (200, 150).
*   **Resulting P_Y location:** $P_Y \text{ at } [200, 309]$
*   **Update Free List:** The hole (200, 150) becomes (200, 110) for P_Y and a new hole (310, 40) for the remainder.
*   **New Free List (sorted by address):** `[(Start: 145, Size: 5), (Start: 310, Size: 40), (Start: 400, Size: 100)]`
*   **Memory State (conceptual):** `[P_A(40)][P_X(45)][Free(5)][P_Y(110)][P_B(80)][Free(40)][Free(100)]`
    (Note: P_B is at [300,379]. P_Y is at [200,309]. This means P_B is partially overlapping with the end of P_Y's allocated space and the beginning of the 310,40 free hole. This is an invalid state. Let's re-evaluate the initial setup.)

**Re-evaluation of Initial State:**
The problem statement "Processes: P_A(40) at [0,39], P_B(80) at [300,379]" *and* "Initial Free List: [(Start: 100, Size: 50), (Start: 200, Size: 150), (Start: 400, Size: 100)]" implies that the memory is partitioned like this:
*   [0, 39] occupied by P_A
*   [40, 99] is *not* a free hole (implicitly occupied or unusable)
*   [100, 149] is a free hole (size 50)
*   [150, 199] is *not* a free hole
*   [200, 349] is a free hole (size 150)
*   [300, 379] occupied by P_B. This *overlaps* with the free hole [200, 349]. This setup is contradictory.

**Assumption Correction:** I will assume the "Processes: P_A(40) at [0,39], P_B(80) at [300,379]" are *just for context* and do not conflict with the *explicitly given* free list. The free list `[(Start: 100, Size: 50), (Start: 200, Size: 150), (Start: 400, Size: 100)]` represents the *only* available blocks. If a process is allocated, it comes from one of these blocks. If P_B is at [300,379], then the free block [200,349] must be wrong, or [300,379] must be part of [200,349] that is already allocated. This is a crucial detail for "contiguous" allocation.

Let's assume the initial memory map is:
`[P_A(40)][...][Free(100,50)][...][Free(200,150)][...][P_B(80)][...][Free(400,100)][...]`
Where `[...]` means other occupied or unusable memory, *not* available for allocation from the free list. This is the only way the given free list makes sense without overlap.

Okay, let's restart Example 4 with this clarification. The free list is the *only* source of allocatable memory. The processes P_A and P_B are *already existing* and occupy their space.

---

**Step 1: Allocate P_X (size 45) using Best-Fit.**
*   **Current Free List:** `[(Start: 100, Size: 50), (Start: 200, Size: 150), (Start: 400, Size: 100)]`
*   **Process P_X size:** 45
*   **Logic:** Best-Fit finds the smallest hole that fits.
    *   Hole (100, 50): Remainder $50-45=5$.
    *   Hole (200, 150): Remainder $150-45=105$.
    *   Hole (400, 100): Remainder $100-45=55$.
    *   Smallest remainder is 5 from (100, 50).
*   **Action:** Allocate P_X from (100, 50).
*   **Resulting P_X location:** $P_X \text{ at } [100, 144]$
*   **Update Free List:** Hole (100, 50) is split. The new hole is (145, 5).
*   **New Free List (sorted by address):** `[(Start: 145, Size: 5), (Start: 200, Size: 150), (Start: 400, Size: 100)]`

---

**Step 2: Allocate P_Y (size 110) using First-Fit.**
*   **Current Free List:** `[(Start: 145, Size: 5), (Start: 200, Size: 150), (Start: 400, Size: 100)]`
*   **Process P_Y size:** 110
*   **Logic:** First-Fit finds the first hole that fits.
    *   Hole (145, 5): Does not fit (5 < 110).
    *   Hole (200, 150): Fits (150 >= 110).
*   **Action:** Allocate P_Y from (200, 150).
*   **Resulting P_Y location:** $P_Y \text{ at } [200, 309]$
*   **Update Free List:** Hole (200, 150) is split. The new hole is (310, 40).
*   **New Free List (sorted by address):** `[(Start: 145, Size: 5), (Start: 310, Size: 40), (Start: 400, Size: 100)]`

---

**Step 3: Terminate P_X.**
*   **P_X location:** $[100, 144]$ (size 45)
*   **Current Free List:** `[(Start: 145, Size: 5), (Start: 310, Size: 40), (Start: 400, Size: 100)]`
*   **Logic:** P_X frees up memory at [100, 144]. Check for adjacent free blocks.
    *   Block to the right: (145, 5). This block starts immediately after P_X ends (100+45=145). So, merge them.
    *   The new merged block is (100, 45+5) = (100, 50).
*   **Action:** Merge (100, 45) and (145, 5) into (100, 50). Remove (145, 5) from the list.
*   **New Free List (sorted by address):** `[(Start: 100, Size: 50), (Start: 310, Size: 40), (Start: 400, Size: 100)]`

---

**Step 4: Allocate P_Z (size 90) using Worst-Fit.**
*   **Current Free List:** `[(Start: 100, Size: 50), (Start: 310, Size: 40), (Start: 400, Size: 100)]`
*   **Process P_Z size:** 90
*   **Logic:** Worst-Fit scans all holes to find the largest one that fits.
    *   Hole (100, 50): Does not fit (50 < 90).
    *   Hole (310, 40): Does not fit (40 < 90).
    *   Hole (400, 100): Fits (100 >= 90). Remainder: $100 - 90 = 10$.
    *   Only one hole fits, so it's trivially the "worst" fit (in terms of largest remainder, though it's the only option).
*   **Action:** Allocate P_Z from (400, 100).
*   **Resulting P_Z location:** $P_Z \text{ at } [400, 489]$
*   **Update Free List:** Hole (400, 100) is split. The new hole is (490, 10).
*   **New Free List (sorted by address):** `[(Start: 100, Size: 50), (Start: 310, Size: 40), (Start: 490, Size: 10)]`

---

**Final Answer for Example 4:**
After all operations, the memory state is:
*   P_A: [0,39] (pre-existing)
*   P_B: [300,379] (pre-existing)
*   P_Y: [200, 309]
*   P_Z: [400, 489]
*   Free List: `[(Start: 100, Size: 50), (Start: 310, Size: 40), (Start: 490, Size: 10)]`

**Reflection:** This example highlighted the importance of careful interpretation of the initial memory state and the merging of adjacent free blocks. The merge step for P_X's termination was crucial to create a larger hole again. The allocation of P_Z demonstrated that if only one hole fits, the "best" or "worst" fit criteria become moot, as there's no choice.

## 6. Common mistakes and traps

1.  **Forgetting to update the free list correctly:** When a process is allocated, the chosen free block must be either removed (if fully consumed) or split into a smaller free block (if partially consumed). A common mistake is just assigning the process without updating the free list, leading to incorrect future allocations.
2.  **Failing to merge adjacent free blocks on deallocation:** When a process terminates, its memory becomes free. If this new free block is immediately next to an *existing* free block, they *must* be merged into a single larger free block. Neglecting this step is a primary cause of severe external fragmentation.
3.  **Incorrectly applying the search criteria:**
    *   **First-Fit:** Students sometimes continue searching the list even after finding a suitable block. Remember, it's the *first* one.
    *   **Best-Fit/Worst-Fit:** Students might not scan the *entire* free list to find the truly best/worst fit, or they might confuse the criteria (e.g., picking the largest hole for Best-Fit).
4.  **Off-by-one errors in address calculations:** Memory addresses are often 0-indexed. A block of size $S$ starting at address $A$ occupies addresses from $A$ to $A + S - 1$. When calculating the start address of a remaining free block, it's $A + \text{allocated_size}$.
5.  **Confusing internal vs. external fragmentation:** While contiguous allocation primarily deals with external fragmentation (many small, unusable gaps between allocated blocks), internal fragmentation (wasted space *inside* an allocated block because the OS allocates in fixed-size chunks) is a related concept often discussed in memory management. Contiguous allocation *can* have internal fragmentation if the system rounds up allocation requests to a minimum block size, but the primary concern with First/Best/Worst-Fit is external fragmentation.
6.  **Assuming the free list is always sorted:** While sorting the free list by address or size can optimize Best-Fit/Worst-Fit (e.g., using a min-heap for Best-Fit, max-heap for Worst-Fit), First-Fit typically just iterates through the list in whatever order it's stored. Don't assume a sorted list unless specified, as it affects the "first" block found.

## 7. Textbook-precise explanation

Contiguous memory allocation is a fundamental memory management technique wherein each process is allocated a single, contiguous block of physical memory. This approach simplifies addressing and hardware implementation, as a process's logical address space directly maps to a physical address range. The operating system maintains a record of both allocated and free memory blocks. Free blocks, often referred to as "holes," are typically managed using a linked list or an array of structures, each specifying a starting physical address and size.

When a process requests a block of memory of size $S_P$, the operating system employs an allocation strategy to select an appropriate free block $H_i = (A_{H_i}, S_{H_i})$ such that $S_{H_i} \ge S_P$. The three primary strategies for contiguous allocation are:

1.  **First-Fit:** The algorithm scans the free list sequentially and allocates the first free block encountered that is large enough to satisfy the request.
    Let $F = \{H_1, H_2, \dots, H_n\}$ be the ordered set of free blocks. First-Fit selects $H_k$ such that $S_{H_k} \ge S_P$ and for all $j < k$, $S_{H_j} < S_P$.
    If $S_{H_k} > S_P$, the allocated portion is $P_k = (A_{H_k}, S_P)$, and the remaining part forms a new free block $H'_{k} = (A_{H_k} + S_P, S_{H_k} - S_P)$, which replaces $H_k$ in the free list (or is inserted appropriately). If $S_{H_k} = S_P$, $H_k$ is entirely consumed and removed from $F$.

2.  **Best-Fit:** The algorithm searches the entire free list to find the free block that is the smallest among all blocks that are large enough to satisfy the request. This strategy aims to minimize the leftover "hole" size, thereby reducing external fragmentation by leaving larger holes intact.
    Best-Fit selects $H_k$ such that $S_{H_k} \ge S_P$ and for all $H_j$ where $S_{H_j} \ge S_P$, it holds that $S_{H_k} \le S_{H_j}$.
    The allocation and free list update mechanism is identical to First-Fit once $H_k$ is selected. Best-Fit typically leads to many very small, unusable free blocks.

3.  **Worst-Fit:** The algorithm searches the entire free list to find the free block that is the largest among all blocks that are large enough to satisfy the request. This strategy aims to leave a large remaining hole after allocation, hoping it will be useful for future large requests.
    Worst-Fit selects $H_k$ such that $S_{H_k} \ge S_P$ and for all $H_j$ where $S_{H_j} \ge S_P$, it holds that $S_{H_k} \ge S_{H_j}$.
    The allocation and free list update mechanism is identical to First-Fit once $H_k$ is selected. Worst-Fit can rapidly break down large free blocks into medium-sized ones.

Upon process termination, the memory block occupied by the process is deallocated and returned to the free list. A critical step is **coalescing** (or merging) adjacent free blocks. If a newly freed block $B_{new}$ is contiguous with an existing free block $B_{adj}$, they are merged into a single larger free block. This process is essential to combat external fragmentation.

These strategies are evaluated based on their performance (speed of allocation) and memory utilization (how well they minimize external fragmentation). First-Fit is generally faster as it doesn't require a full list scan. Best-Fit often leads to more external fragmentation in the form of many small, unusable holes. Worst-Fit, counter-intuitively, sometimes performs better than Best-Fit by distributing fragmentation more evenly, but often results in the rapid disappearance of large holes.

*References:*
*   Silberschatz, A., Galvin, P. B., & Gagne, G. (2018). *Operating System Concepts* (10th ed.). Wiley. (Chapter 8: Main Memory)
*   Stallings, W. (2018). *Operating Systems: Internals and Design Principles* (9th ed.). Pearson. (Chapter 7: Memory Management)

## 8. ASCII diagrams

Here's an ASCII diagram illustrating contiguous memory allocation and the free list concept.

```text
Memory Layout (Total 1000 units)
+-------------------------------------------------------------------------------------------------------------------+
| P1 (0-199) | Hole A (200-399) | P2 (400-549) | Hole B (550-799) | P3 (800-999) |
+-------------------------------------------------------------------------------------------------------------------+
^ Start Address 0                                                                                   End Address 999 ^

Legend:
P1, P2, P3: Occupied by processes.
Hole A, Hole B: Free memory blocks (holes).

Free List (Data Structure)
--------------------------
This is how the OS keeps track of available holes.

+-------------------+     +-------------------+
| Hole A            |     | Hole B            |
| Start: 200        | --> | Start: 550        |
| Size: 200         |     | Size: 250         |
+-------------------+     +-------------------+
(Pointer to next)         (End of list / NULL)

Scenario: Process P4 (size 180) requests memory.

1. First-Fit Search:
   - Checks Hole A (size 200). Fits (200 >= 180). Takes Hole A.
   - P4 is placed at 200. Remaining 20 units (200-180) become a new small hole.

   Memory after First-