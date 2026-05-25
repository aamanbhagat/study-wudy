## What it is
Fragmentation is a phenomenon where storage space in memory is used inefficiently, reducing its effective capacity. **Internal fragmentation** is wasted space *inside* an allocated memory block because the block is larger than the requested data. **External fragmentation** occurs when free memory is broken into many small, non-contiguous blocks, making it impossible to satisfy a request for a large contiguous block, even if the total free memory is sufficient.

## Why it matters
In real-time operating systems for aerospace applications, like flight control or satellite telemetry, a memory allocation failure due to fragmentation can be catastrophic. The system must guarantee that it can allocate memory within a strict time bound, and external fragmentation makes this guarantee difficult to uphold. In high-performance computing for physics simulations or training large machine learning models, fragmentation leads to out-of-memory errors and performance degradation, even on systems with vast amounts of RAM, forcing premature termination of jobs that cost significant computational resources.

## When to study it
You must understand the following concepts first. If these are not solid, review them before proceeding.
1.  **Memory as a Contiguous Array:** The basic model of main memory (RAM) as a large, byte-addressable array.
2.  **Processes and Address Spaces:** What a process is and how the OS gives it the illusion of its own private memory.
3.  **Memory Management Schemes:** The basics of contiguous memory allocation, including fixed-size partitioning (MFT) and variable-size partitioning (MVT).

## How to study it (step by step)
1.  **Model Internal Fragmentation:** On paper, draw a 100 KB memory block. Divide it into five fixed 20 KB partitions. Now, try to allocate three processes: P1 (12 KB), P2 (18 KB), P3 (5 KB). Place each in a partition and calculate the total wasted space *inside* the allocated partitions. This is internal fragmentation.
2.  **Model External Fragmentation:** Draw a fresh 100 KB memory block. This time, use variable-size partitions. Allocate P1 (20 KB), P2 (30 KB), and P3 (15 KB) contiguously from the start. Now, deallocate P2. Observe the 30 KB "hole" created between P1 and P3.
3.  **Experience the Problem:** Using your diagram from step 2, try to allocate a new process, P4, of size 40 KB. Note that the total free memory is $100 - 20 - 15 = 65$ KB, which is more than enough. However, the largest *contiguous* block is only 35 KB (at the end). The allocation fails. This is the consequence of external fragmentation.
4.  **Perform Compaction:** On the same diagram, "slide" process P3 up to be adjacent to P1. Redraw the memory map. Calculate the size of the new, single, contiguous free block. Now, attempt to allocate P4 (40 KB) again. It will succeed.
5.  **Formalize the Cost:** Consider the cost of compaction. To move P3, the OS must pause it, copy all of its memory contents byte-by-byte, and then update its base register or page table entries to reflect the new physical location. Acknowledge that this is a computationally expensive operation.

## Key ideas, with intuition
1.  **Internal Fragmentation: The Oversized Box.** This occurs in systems that allocate memory in fixed-size chunks (partitions, pages, or blocks). If you need 7 bytes but the smallest chunk the system can give you is 32 bytes, you have created $32 - 7 = 25$ bytes of internal fragmentation. The wasted space is *internal* to the allocated region. It's like buying a large shipping box for a small item—the empty space inside the box is wasted.
    $$ \text{Internal Frag. (per block)} = \text{BlockSize} - \text{ProcessSize} $$

2.  **External Fragmentation: Scattered Pockets of Air.** This is the hallmark of dynamic memory allocation systems (e.g., `malloc`, `new`) that allocate blocks of exactly the requested size. Over time, as processes are allocated and freed, the memory space becomes a checkerboard of allocated blocks and free "holes." The total free space might be large, but it's not contiguous. You might have 1 GB of total free RAM, but if it's scattered in 1 KB chunks, you cannot allocate a 2 KB object.
    $$ \text{External Frag. exists if } \sum_{i} \text{FreeBlockSize}_i \ge \text{RequestSize} \text{ but } \max_{i}(\text{FreeBlockSize}_i) < \text{RequestSize} $$

3.  **The 50% Rule (for some systems):** A rule of thumb, derived from simulation and probabilistic analysis, states that for certain common allocation/deallocation patterns, about one-third of memory may be unusable due to external fragmentation. If $N$ blocks are allocated, you can expect about $0.5N$ blocks to be lost to fragmentation. This is an observation, not a universal law, but it provides intuition for the severity of the problem.

4.  **Compaction: The Defragmenter.** This is the solution to external fragmentation. The OS pauses execution, moves all allocated memory blocks to one end of memory, and consolidates the scattered holes into one large free block. This is extremely costly: it consumes significant CPU cycles, and all running processes must be halted during the shuffle. It's analogous to the "defragment hard drive" utilities of the past.

## Worked example
Consider a 1000 KB memory space managed with variable-size partitions. The following requests arrive:
1.  Allocate P1 (200 KB)
2.  Allocate P2 (350 KB)
3.  Allocate P3 (150 KB)
4.  Deallocate P2 (350 KB)
5.  Allocate P4 (250 KB)

**Step 1: Initial Allocations**
After requests 1, 2, and 3, memory looks like this:
-   0-199 KB: P1 (200 KB)
-   200-549 KB: P2 (350 KB)
-   550-699 KB: P3 (150 KB)
-   700-999 KB: Free (300 KB)

**Step 2: Deallocation Creates a Hole**
After request 4 (deallocate P2), memory is fragmented:
-   0-199 KB: P1 (200 KB)
-   200-549 KB: **Free Hole (350 KB)**
-   550-699 KB: P3 (150 KB)
-   700-999 KB: Free (300 KB)

Total free memory = $350 \text{ KB} + 300 \text{ KB} = 650 \text{ KB}$.

**Step 3: Allocation Fails due to External Fragmentation**
Request 5 is to allocate P4 (250 KB). We check our free blocks:
-   Largest contiguous free block = 350 KB (the hole left by P2).
-   Since $350 \text{ KB} \ge 250 \text{ KB}$, the allocation *succeeds*. The OS (using a first-fit or best-fit policy) will place P4 in the hole.
Memory now:
-   0-199 KB: P1 (200 KB)
-   200-449 KB: **P4 (250 KB)**
-   450-549 KB: Free Hole (100 KB)
-   550-699 KB: P3 (150 KB)
-   700-999 KB: Free (300 KB)

**Reflection:** Let's modify the example slightly. What if P4 requested 400 KB?
-   Total free memory is 650 KB, which is sufficient.
-   However, the largest contiguous block is 350 KB.
-   Since $350 \text{ KB} < 400 \text{ KB}$, the allocation would **fail**. This failure, despite having enough total memory, is the canonical example of external fragmentation. To succeed, the OS would need to perform compaction.

**Step 4 (if P4 was 400KB): Compaction**
The OS would move P3 to be adjacent to P1:
-   0-199 KB: P1 (200 KB)
-   200-349 KB: P3 (150 KB)
-   350-999 KB: **Consolidated Free Block (650 KB)**
Now, the 400 KB request for P4 can be easily satisfied.

## Diagrams
Here is the memory state from the worked example, before and after compaction (assuming the 400KB request for P4 that forced it).

**Before Compaction (External Fragmentation):**
```text
Memory Map (1000 KB)
+--------------------------------------------------------------------------+
| P1 (200K) |  Free Hole (350K)  | P3 (150K) |       Free (300K)        |
+--------------------------------------------------------------------------+
0           200                  550         700                        1000 KB
```

**After Compaction:**
```text
Memory Map (1000 KB)
+--------------------------------------------------------------------------+
| P1 (200K) | P3 (150K) |                Free (650K)                     |
+--------------------------------------------------------------------------+
0           200         350                                            1000 KB
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    -   **INternal:** Imagine packing a suitcase (a fixed-size partition). You put your clothes (the process) inside. All the little gaps and empty spaces *inside* the packed suitcase are wasted. It's **IN**side the allocated block.
    -   **EXternal:** Imagine a parking lot (memory). Cars (processes) of different sizes arrive and leave. Eventually, you have lots of single empty spots, but no two adjacent spots are free to park your limousine (a large process). The wasted space is **EX**ternal to the parked cars, between them.

2.  **Facts to Overlearn:**
    -   Internal Fragmentation = (Partition Size) - (Process Size). Occurs with fixed-size allocation.
    -   External Fragmentation = Total memory is sufficient, but no single contiguous block is large enough. Occurs with variable-size allocation.
    -   Compaction solves external fragmentation by rearranging memory, but it is computationally expensive.

3.  **Spaced Repetition Schedule:**
    -   Review this entire lesson in **1 day**.
    -   Redo the worked example from scratch in **3 days**.
    -   Explain the difference to an imaginary student in **7 days**.
    -   Solve the self-check problems in **16 days**.
    -   Derive the "Why it matters" for a new domain (e.g., embedded systems) in **35 days**.

4.  **First Principles Pathway:** If you forget, rebuild it from the ground up. Memory is a line of bytes. How can we allocate it?
    -   Option A: Chop it into fixed-size chunks first. What's the problem? If a process is smaller than a chunk, we waste the leftover space *inside* the chunk. That's internal fragmentation.
    -   Option B: Don't chop it up. Give each process exactly what it asks for. What's the problem? When processes leave, they create holes. The free space gets chopped up. That's external fragmentation.
    -   How to fix external fragmentation? Shove everything together. That's compaction.

## Common mistakes
1.  **Confusing the two types:** The "INside the box" vs "between the boxes" mnemonic is your primary defense against this. Internal is waste *within* an allocation; external is waste *between* allocations.
2.  **Assuming compaction is a cheap/frequent solution:** Compaction is a heavyweight, stop-the-world operation. Modern systems use other techniques like paging and virtual memory to avoid it almost entirely. It's a conceptual tool and a last resort.
3.  **Applying fragmentation to the wrong scheme:** You do not get external fragmentation in a pure fixed-partition system. You do not get internal fragmentation in a pure variable-partition system that allocates *exactly* the requested size. (Note: Hybrid systems exist and can have both).
4.  **Thinking fragmentation is only about memory:** The same concepts apply to disk storage. A fragmented hard drive file system suffers from a form of external fragmentation, where a single file is stored in many non-contiguous blocks on the disk, slowing down read times.

## Self-check
1.  A system uses fixed memory partitions of size 64 KB. A process arrives requiring 41 KB. How much internal fragmentation is generated by this single process?
2.  Consider a 256 KB memory space. The following sequence occurs: P1 allocates 100 KB, P2 allocates 50 KB, P3 allocates 60 KB, P2 is deallocated. Can a new process, P4, requiring 70 KB be allocated? Justify your answer and name the phenomenon at play.
3.  Paging is a memory management scheme that divides logical address spaces into fixed-size blocks called pages, and physical memory into fixed-size blocks called frames. Does paging suffer from internal or external fragmentation? Explain your reasoning in one or two sentences.