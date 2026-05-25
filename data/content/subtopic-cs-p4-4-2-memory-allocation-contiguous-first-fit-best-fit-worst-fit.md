## What it is
Contiguous memory allocation is a memory management technique where the operating system allocates a single, unbroken block of memory to a process. First-fit, best-fit, and worst-fit are algorithms that decide *which* available free block (or "hole") to use when a new process requests memory. They are different strategies for solving the same fundamental placement problem.

## Why it matters
These simple algorithms are foundational to understanding memory management trade-offs. While modern general-purpose operating systems use more complex schemes like paging, these contiguous methods are still used in simpler systems like embedded controllers or real-time operating systems (RTOS) common in aerospace applications. Understanding them helps you grasp the core problem of *fragmentation*—wasted memory—which is a critical constraint in any resource-limited computing environment, from a flight controller to a large-scale physics simulation.

## When to study it
Before tackling this, you must understand the basic model of a computer's memory (a linear array of bytes), the concept of a process and its address space, and fundamental data structures, particularly linked lists. The OS's role as a resource manager should be clear. If you don't know what a "process" is or how memory is addressed, review those concepts first.

## How to study it (step by step)
1.  **Model Memory:** Draw a long rectangle representing 1MB of memory. Divide it into a few allocated blocks for existing "processes" and a few free blocks or "holes" of varying sizes. This is your starting state.
2.  **Simulate First-Fit:** Imagine a request for a 100KB process arrives. Scan your memory drawing from the lowest address to the highest. The *very first* hole you find that is $\ge 100$KB is the one you allocate from. Update your drawing.
3.  **Simulate Best-Fit:** Reset to the initial state. For the same 100KB request, scan the *entire list* of holes. Find the smallest hole that is still $\ge 100$KB. This is the "tightest" fit. Allocate from it and update the drawing.
4.  **Simulate Worst-Fit:** Reset again. For the 100KB request, scan the *entire list* of holes. Find the largest available hole. Allocate the 100KB from it, leaving a new, smaller hole.
5.  **Analyze Complexity:** For each algorithm, determine the time complexity of finding a block for a new process. Assume the list of free blocks has $n$ entries. How many entries must you inspect in the worst case for each strategy?
6.  **Analyze Fragmentation:** After your simulations, look at the leftover holes. Which strategy tended to create tiny, unusable fragments? Which tended to leave larger, more useful fragments? This is the heart of the trade-off.

## Key ideas, with intuition
1.  **The Core Problem: The Placement Question.** The OS maintains a list of free memory blocks (holes). A new process arrives, requesting $S$ bytes. The OS must select a hole $H_i$ from the set of available holes $\{H_1, H_2, ...\}$ such that the size of the chosen hole, $|H_i|$, is greater than or equal to the requested size, $|H_i| \ge S$. The question is, which qualifying hole is the "right" one to choose?

2.  **External Fragmentation.** This is the key villain. After some allocations and deallocations, memory becomes a checkerboard of used blocks and free blocks. You might have 500KB of total free memory, but it's scattered in 50KB chunks. If a 100KB process arrives, it cannot be served, even though enough total memory is free. The memory is wasted *between* allocated blocks. All three strategies—first, best, and worst-fit—suffer from this.

3.  **The Speed vs. Waste Trade-off.**
    *   **First-Fit:** The goal is speed. It stops searching as soon as it finds *any* valid hole. This is fast but can be suboptimal, potentially breaking up a large, useful block for a small process that could have fit elsewhere.
    *   **Best-Fit:** The goal is to minimize wasted space *for this specific allocation*. By choosing the tightest fit, it hopes to leave other, larger holes intact for future large requests. The downside is that it tends to create minuscule, unusable fragments. It must also search the entire list of holes, making it slower than first-fit.
    *   **Worst-Fit:** The goal is to maximize the size of the leftover fragment. The intuition is that by taking from the largest hole, the remaining piece will still be large enough to be useful. This avoids creating tiny fragments but consumes your largest blocks quickly. It is also slow, requiring a full scan.

## Worked example
Consider a memory with the following free blocks (holes) in address order: 100KB, 500KB, 200KB, 300KB, 600KB.
A sequence of requests arrives:
1.  Process P1 requests 212KB.
2.  Process P2 requests 417KB.
3.  Process P3 requests 112KB.

Let's trace each strategy.

**Initial State:** Free Block List = [100KB, 500KB, 200KB, 300KB, 600KB]

**1. First-Fit**
*   **P1 (212KB):** Scan from the start. 100KB is too small. 500KB is the first fit.
    *   Allocate 212KB from the 500KB block.
    *   New hole of $500 - 212 = 288$KB is created.
    *   Free Block List: [100KB, **288KB**, 200KB, 300KB, 600KB]
*   **P2 (417KB):** Scan from the start. 100KB, 288KB, 200KB, 300KB are all too small. 600KB is the first fit.
    *   Allocate 417KB from the 600KB block.
    *   New hole of $600 - 417 = 183$KB is created.
    *   Free Block List: [100KB, 288KB, 200KB, 300KB, **183KB**]
*   **P3 (112KB):** Scan from the start. 100KB is too small. 288KB is the first fit.
    *   Allocate 112KB from the 288KB block.
    *   New hole of $288 - 112 = 176$KB is created.
    *   **Final Free List (First-Fit):** [100KB, **176KB**, 200KB, 300KB, 183KB]

**2. Best-Fit**
*   **P1 (212KB):** Scan all holes: {500, 200, 300, 600}. The holes large enough are {500, 300, 600}. The smallest of these (the "best" fit) is 300KB.
    *   Allocate 212KB from the 300KB block. Leftover: $300 - 212 = 88$KB.
    *   Free Block List: [100KB, 500KB, 200KB, **88KB**, 600KB]
*   **P2 (417KB):** Scan all holes: {100, 500, 200, 88, 600}. The holes large enough are {500, 600}. The best fit is 500KB.
    *   Allocate 417KB from the 500KB block. Leftover: $500 - 417 = 83$KB.
    *   Free Block List: [100KB, **83KB**, 200KB, 88KB, 600KB]
*   **P3 (112KB):** Scan all holes: {100, 83, 200, 88, 600}. The holes large enough are {200, 600}. The best fit is 200KB.
    *   Allocate 112KB from the 200KB block. Leftover: $200 - 112 = 88$KB.
    *   **Final Free List (Best-Fit):** [100KB, 83KB, **88KB**, 88KB, 600KB]

**3. Worst-Fit**
*   **P1 (212KB):** Scan all holes: {100, 500, 200, 300, 600}. The largest hole is 600KB.
    *   Allocate 212KB from the 600KB block. Leftover: $600 - 212 = 388$KB.
    *   Free Block List: [100KB, 500KB, 200KB, 300KB, **388KB**]
*   **P2 (417KB):** Scan all holes: {100, 500, 200, 300, 388}. The largest hole is 500KB.
    *   Allocate 417KB from the 500KB block. Leftover: $500 - 417 = 83$KB.
    *   Free Block List: [100KB, **83KB**, 200KB, 300KB, 388KB]
*   **P3 (112KB):** Scan all holes: {100, 83, 200, 300, 388}. The largest hole is 388KB.
    *   Allocate 112KB from the 388KB block. Leftover: $388 - 112 = 276$KB.
    *   **Final Free List (Worst-Fit):** [100KB, 83KB, 200KB, 300KB, **276KB**]

*Reflection:* Notice how different the final memory layouts are. Best-fit left a large 600KB block untouched but created several small, less useful fragments. Worst-fit aggressively consumed the largest blocks, but the remaining fragments are still reasonably large. First-fit was a middle ground. There is no single "best" algorithm; the performance depends entirely on the sequence of requests and deallocations.

## Diagrams
Here is the memory state after P1's allocation (212KB) for each strategy. `|` denotes a boundary, `P` is a process, and `H` is a hole. Sizes are in KB.

**First-Fit:** Allocates from the 500KB hole.
```text
           (start of memory)
Address -> +-----+----------+-----------+-----+-----+-------+
           | H:100 | P1:212 | H:288     | H:200 | H:300 | H:600 |
           +-----+----------+-----------+-----+-----+-------+
```

**Best-Fit:** Allocates from the 300KB hole (tightest fit).
```text
           (start of memory)
Address -> +-----+-------+-----+--------+------+-------+
           | H:100 | H:500 | H:200 | P1:212 | H:88 | H:600 |
           +-----+-------+-----+--------+------+-------+
```

**Worst-Fit:** Allocates from the 600KB hole (largest fit).
```text
           (start of memory)
Address -> +-----+-------+-----+-----+----------+-------+
           | H:100 | H:500 | H:200 | H:300 | P1:212 | H:388 |
           +-----+-------+-----+-----+----------+-------+
```

## Memory technique — remember this forever
1.  **The Parking Lot Analogy:**
    *   **First-Fit:** You're lazy. You drive into a parking lot and take the very first spot your car fits in. You don't care if it's a huge spot or a small one.
    *   **Best-Fit:** You're obsessively efficient. You drive through the entire lot to find the smallest possible spot your car can squeeze into, saving the big spots for trucks.
    *   **Worst-Fit:** You're a jerk in a Smart Car. You deliberately find the biggest, most spacious spot designed for an RV and park right in the middle of it.

2.  **Facts to Overlearn:**
    *   **First-Fit:** Select the first hole $H$ where $|H| \ge S$.
    *   **Best-Fit:** Select the hole $H$ where $|H| \ge S$ and for all other holes $H'$, $|H'| \ge S \implies |H'| \ge |H|$. (Minimizes $|H| - S$).
    *   **Worst-Fit:** Select the hole $H$ where $|H| \ge S$ and for all other holes $H'$, $|H| \ge |H'|$. (Maximizes $|H| - S$).
    *   **External Fragmentation:** Total free memory is sufficient to satisfy a request, but it is not contiguous.

3.  **Spaced Repetition Schedule:** Review this material in 1 day, 3 days, 7 days, 16 days, and 35 days. Each time, redraw the parking lot analogy from memory and re-run the worked example.

4.  **First Principles Pathway:** If you forget everything, start here: The OS has a list of free blocks and a request for size $S$. It needs a rule to pick one. What are the simplest possible rules?
    *   "Stop as soon as I find one." -> This is First-Fit.
    *   "Find the one that wastes the least space." -> This is Best-Fit.
    *   "Find the one that leaves the biggest piece left over." -> This is Worst-Fit.
    You can re-derive all three strategies from these simple goals.

## Common mistakes
1.  **Thinking "Best-Fit" is always best.** Counterintuitively, Best-Fit can lead to worse overall memory utilization. It tends to create a large number of tiny, unusable fragments that litter the memory space.
2.  **Forgetting the search cost.** First-fit only has to search until it finds *a* match. Best-fit and worst-fit *must* search the entire list of free blocks every single time to guarantee they've found the best or worst. On a system with many holes, this makes them significantly slower.
3.  **Confusing internal and external fragmentation.** These algorithms create *external* fragmentation (unusable space *between* blocks). *Internal* fragmentation happens when you allocate a fixed-size block that is larger than the request (e.g., allocating 64KB for a 50KB request), wasting space *inside* the allocated block.

## Self-check
1.  Given a free list of [20K, 15K, 40K, 60K, 25K], what block is chosen to satisfy a 18K request under First-Fit, Best-Fit, and Worst-Fit? What is the state of the free list after the allocation in each case?
2.  Explain why Best-Fit, despite its name, can lead to faster memory exhaustion than Worst-Fit. Under what kind of workload (e.g., many small processes, a mix of large and small) might this happen?
3.  Initial free blocks: [100K, 200K]. Requests arrive: P1(90K), P2(150K). Then P1 is freed. A new request P3(120K) arrives. Which of the three strategies (FF, BF, WF) would fail to place P3? Show your work.