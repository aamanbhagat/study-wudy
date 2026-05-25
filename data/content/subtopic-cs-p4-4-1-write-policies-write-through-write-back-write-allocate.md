## What it is
Cache write policies are the rules a memory system follows when a processor issues a write command. They answer two fundamental questions: first, on a write hit, when should the data be written to the slower main memory? Second, on a write miss, should the corresponding data block be loaded into the cache?

## Why it matters
These policies are at the heart of performance engineering in any high-speed system. In aerospace, the predictability of a write-through policy might be chosen for a flight control system to ensure consistent timing, whereas a high-performance write-back policy is essential for processing massive datasets from sensors or in physics simulations (e.g., fluid dynamics for rocketry). In machine learning, training large models involves constant weight updates, and an efficient write policy can dramatically reduce the memory bottleneck, speeding up training by orders of magnitude.

## When to study it
You must have a solid grasp of the memory hierarchy (registers, L1/L2/L3 caches, main memory) and the fundamentals of cache operation. Specifically, you need to understand cache hits, cache misses, and the concept of a cache line (or block) before proceeding. If you cannot explain what happens, step-by-step, during a simple cache *read* miss, review that material first.

## How to study it (step by step)
1.  **Draw the Boxology:** Draw a diagram with the CPU, Cache, and Main Memory. For a simple `x = a + b;` operation, trace the arrows for the two reads (`a`, `b`) and the one write (`x`). This reinforces the basic data flow.
2.  **Trace Write-Through:** Take a simple loop: `for(i=0; i<4; i++) A[i] = i;`. Assume `A` starts at memory address 0, and you have a 2-line cache where each line holds one integer. Trace every write. For write-through, you'll draw an arrow from CPU to Cache, and *another* arrow from Cache to Main Memory for *each* iteration. Count the total main memory writes.
3.  **Trace Write-Back:** Use the same loop and cache setup. Introduce a "dirty bit" for each cache line. On each write, you will only modify the cache line and set its dirty bit. The write to main memory only occurs when a line is evicted. Count the main memory writes in this case; it will be much lower.
4.  **Introduce the Miss:** Now, consider writing to an address that isn't in the cache (a write miss). Analyze the two choices. With **write-allocate**, you first read the block from memory into the cache, then perform the write. With **no-write-allocate** (or write-around), you write directly to main memory, leaving the cache untouched.
5.  **Combine and Compare:** Create a 2x2 grid. Rows: Write-Through, Write-Back. Columns: Write-Allocate, No-Write-Allocate. For each of the four cells, write one sentence describing the behavior and a key advantage/disadvantage. Note which pairings are most common in practice (Write-Back/Write-Allocate and Write-Through/No-Write-Allocate).

## Key ideas, with intuition
1.  **The Write Hit Decision: Now or Later? (Write-Through vs. Write-Back)**
    This is the primary trade-off between simplicity/consistency and performance.
    *   **Write-Through:** Think of this as being compulsively tidy. The moment you change something in your fast, local copy (the cache), you immediately update the master copy (main memory). This is simple and keeps main memory perfectly up-to-date, which is great for systems with multiple processors. However, it's slow because every single write operation must wait for the slow main memory access to complete.
    *   **Write-Back:** This is the "procrastinator" policy. You make changes to your local copy (the cache) and just put a sticky note on it saying "this is modified." This is the *dirty bit*. You only update the master copy (main memory) at the last possible moment—when you are forced to evict that cache line to make room for something else. This is much faster because you can perform many writes to the same cache line but only pay the main memory penalty once upon eviction.

2.  **The Write Miss Decision: Bring it in or Go Around? (Write-Allocate vs. No-Write-Allocate)**
    This decision is based on predicting future behavior, specifically spatial locality.
    *   **Write-Allocate:** The default strategy, based on optimism. If you write to a memory location `A[i]`, you will probably write to `A[i+1]` soon. So, on a write miss, it makes sense to pay the cost of loading the entire block containing `A[i]` into the cache first. Then, your initial write and subsequent nearby writes will be fast cache hits.
    *   **No-Write-Allocate (or Write-Around):** The pessimistic strategy. This is for when you know you're just writing data once and won't need it again soon (e.g., saving a large file or initializing a large array). Loading the block into the cache would be a waste; it would just evict something else that might be more useful. So, you "write around" the cache, sending the data directly to main memory.

3.  **The Dirty Bit is the Bookkeeping:**
    For a write-back cache to work, it needs a mechanism to track which lines are "clean" (identical to main memory) and which are "dirty" (modified and not yet written back). This is a single bit of state per cache line.
    $$
    \text{On Eviction of line } L: \quad \text{if } (\text{dirty_bit}[L] == 1) \rightarrow \text{Write } L \text{ to Main Memory}
    $$
    A write-through cache does not need a dirty bit, as the cache and main memory are always synchronized by definition.

## Worked example
Let's analyze a sequence of writes with a 4-line, direct-mapped cache. Each line holds one word. The address maps to the cache line via `line = address % 4`.

**Initial State:** Cache is empty. Main memory `M` holds arbitrary data.
**Sequence:**
1. `WRITE 10 to M[1]`
2. `WRITE 20 to M[5]`
3. `WRITE 30 to M[2]`
4. `WRITE 40 to M[1]` (This is a write to the same address as step 1)

---

**Policy 1: Write-Through, No-Write-Allocate**

| Step | Operation | Address Mapping | Cache State (Line:Value) | Main Memory Writes | Explanation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 0 | Initial | - | `{empty}` | 0 | Cache starts empty. |
| 1 | `WRITE 10 to M[1]` | `1 % 4 = 1` | Miss. `{L1:10}` | 1 (`M[1]=10`) | Miss. *No-allocate* means we don't load first. *Write-through* means we write to `M[1]` and also put it in the cache. |
| 2 | `WRITE 20 to M[5]` | `5 % 4 = 1` | Miss. `{L1:20}` | 1 (`M[5]=20`) | Miss on line 1. Evicts `M[1]`. Write-through to `M[5]`, and update cache. |
| 3 | `WRITE 30 to M[2]` | `2 % 4 = 2` | Miss. `{L1:20, L2:30}` | 1 (`M[2]=30`) | Miss on line 2. Write-through to `M[2]`, update cache. |
| 4 | `WRITE 40 to M[1]` | `1 % 4 = 1` | Hit. `{L1:40, L2:30}` | 1 (`M[1]=40`) | Hit on line 1 (which contains `M[5]`'s value). Overwrite cache. Write-through to `M[1]`. |
| **Total** | | | | **4** | Every write operation caused a write to main memory. |

---

**Policy 2: Write-Back, Write-Allocate**

| Step | Operation | Address Mapping | Cache State (Line:Value, Dirty?) | Main Memory Writes | Explanation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 0 | Initial | - | `{empty}` | 0 | Cache starts empty. |
| 1 | `WRITE 10 to M[1]` | `1 % 4 = 1` | Miss. `{L1:(10, D=1)}` | 0 | Miss. *Write-allocate*: load `M[1]` (not shown), then write `10` to cache. *Write-back*: mark line 1 as dirty (D=1). No memory write yet. |
| 2 | `WRITE 20 to M[5]` | `5 % 4 = 1` | Miss. `{L1:(20, D=1)}` | 1 (`M[1]=10`) | Miss on line 1. Line 1 is dirty, so we must *write back* its contents (`10`) to `M[1]`. Then, load `M[5]` and write `20` to cache line 1, marking it dirty. |
| 3 | `WRITE 30 to M[2]` | `2 % 4 = 2` | Miss. `{L1:(20, D=1), L2:(30, D=1)}` | 0 | Miss on line 2. Allocate and write to cache. Mark dirty. No memory write. |
| 4 | `WRITE 40 to M[1]` | `1 % 4 = 1` | Miss. `{L1:(40, D=1), L2:(30, D=1)}` | 1 (`M[5]=20`) | Miss on line 1. It holds `M[5]` and is dirty. Write back `20` to `M[5]`. Then load `M[1]`, write `40` to cache, mark dirty. |
| **Total** | | | | **2** | Memory writes only happened on eviction of dirty blocks. This is a 50% reduction in memory traffic for this specific sequence. |

**Reflection:** The example clearly shows the trade-off. Write-through is simple but generates high traffic. Write-back is more complex (dirty bits, writes on eviction) but can significantly reduce slow main memory writes, improving performance.

## Diagrams
Data flow for a **Write Hit**:

```text
      Write-Through                             Write-Back
      +-----------+                             +-----------+
      |    CPU    |                             |    CPU    |
      +-----------+                             +-----------+
            | Write Data                              | Write Data
            v                                         v
      +-----------+                             +-----------+
      |   Cache   |                             |   Cache   | <-- Mark line Dirty
      +-----------+                             +-----------+
            | Write Data
            v
      +-----------+
      | Main Mem  |
      +-----------+
```

Data flow for a **Write Miss**:

```text
      Write-Allocate                            No-Write-Allocate
      +-----------+                             +-----------+
      |    CPU    |                             |    CPU    |
      +-----------+                             +-----------+
            | Write Data                              | Write Data
            v                                         |
      +-----------+ <---(2) Write to Cache-----.       |
      |   Cache   |                            |       |
      +-----------+                            |       |
            ^                                  |       |
            | (1) Load Block                   |       |
            |                                  |       v
      +-----------+ ---------------------------'->+-----------+
      | Main Mem  |      (Data written directly)   | Main Mem  |
      +-----------+                              +-----------+
```

## Memory technique — remember this forever
1.  **The Librarian Analogy:**
    *   **Write-Through:** A meticulous librarian. You change a word in a book (write cache), and they immediately run to the central archive to update the master file (write memory). **Mnemonic: "Write THROUGH the cache directly TO memory."**
    *   **Write-Back:** A lazy but efficient librarian. You change the book, they put a sticky note on it ("dirty bit"). They only update the central archive when someone else needs that book and they have to put yours away (eviction). **Mnemonic: "Write it BACK only when kicked out."**
    *   **Write-Allocate:** You ask to write in a book not on your desk (write miss). The librarian *allocates* space on your desk, brings the book, then you write. **Mnemonic: "ALLOCATE space before you write."**
    *   **No-Write-Allocate:** You ask to write in a book not on your desk. The librarian says "Don't bother me," and you send your update directly to the central archive, bypassing your desk. **Mnemonic: "NO space allocated, write around it."**

2.  **Overlearn these facts:**
    *   Write-Through: Updates cache + main memory on every write hit.
    *   Write-Back: Updates cache on write hit, sets dirty bit. Updates main memory only on eviction of a dirty line.
    *   Write-Allocate: On write miss, fetch block from memory into cache, then write to cache.

3.  **Spaced Repetition Schedule:** Review this material and try to re-draw the diagrams from memory at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, start here: A CPU writes data. It can go to the cache, or memory, or both. This gives you two core questions:
    *   *Where does the data go on a hit?* Just cache (later to memory) -> Write-Back. Cache and memory (now) -> Write-Through.
    *   *What happens on a miss?* Do we bring the data into the cache first? Yes -> Write-Allocate. No -> No-Write-Allocate.

## Common mistakes
1.  **Mixing Hit and Miss Policies:** Students often confuse "write-through" with "write-allocate." Remember, one set of policies (through/back) applies to HITS, and the other set (allocate/no-allocate) applies to MISSES. They are orthogonal decisions.
2.  **Forgetting the Write-Back on Eviction:** In a write-back cache, the most common error in manual tracing is forgetting that when a *dirty* line is replaced, it must first be written to main memory. If the line is clean, it can be overwritten silently.
3.  **Ignoring Write-Allocate's Read:** A write-allocate policy on a miss first causes a memory *read* (to fetch the entire block) followed by the modification of a part of that block in the cache. Students often forget the initial read penalty.

## Self-check
1.  A program writes to the same memory address one million times in a tight loop. Compare the number of main memory bus operations for a write-through vs. a write-back cache.
2.  You are designing a system that generates and streams live video data to a network drive. The data is written once and never read back by the CPU. Which combination of write-hit and write-miss policies would be most efficient, and why?
3.  A write-back, write-allocate cache is generally considered higher performance. Construct a specific, short sequence of memory accesses (reads and writes) where a write-through, no-write-allocate cache would result in fewer total main memory accesses. Explain precisely why this occurs.