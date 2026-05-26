## 1. The one-sentence answer
**Contiguous memory allocation places each process into a single, unbroken block of physical memory, and the three classic placement policies—first-fit, best-fit, and worst-fit—differ only in how they choose which free block to use.**

In the earliest operating systems, every running program had to occupy one continuous region of RAM from its starting address to its ending address. When a process terminates, it leaves behind a hole; when a new process arrives, the allocator must decide which hole to assign. The decision rule determines both speed of allocation and the pattern of leftover fragments.

First-fit scans the free list from the beginning and takes the first hole large enough. Best-fit scans the entire list and takes the smallest hole that still fits. Worst-fit always takes the largest hole, on the theory that the remainder will still be useful. These three rules produce measurably different external-fragmentation behaviour on the same workload.

> [!NOTE]
> The decisive insight is that *no single policy eliminates external fragmentation*; each merely trades one pattern of wasted space for another, which is why modern systems abandoned pure contiguous allocation.

## 2. Why this matters — concrete and current
NASA’s flight software for the Perseverance rover still uses a statically partitioned contiguous memory map; any overrun would violate the DO-178C certification that the entire binary must fit inside a single verified 256 MiB region.

In Google’s Borg and Kubernetes scheduler, the “best-fit” bin-packing heuristic used for pod placement on nodes is a direct descendant of the classic best-fit memory allocator; the same algorithm minimises stranded CPU/memory fragments across thousands of machines.

Modern NAND flash controllers inside Samsung and Micron SSDs employ a contiguous block allocator for mapping logical to physical erase blocks; first-fit is preferred because it reduces write amplification under sustained random-write workloads.

The Linux kernel’s early SLAB allocator (before SLUB) used a worst-fit policy for large contiguous DMA buffers required by network and storage drivers; the policy choice measurably affected throughput on 10 GbE cards.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Address space vs. physical memory | Contiguous allocation maps a process’s logical addresses directly onto a single physical interval; without this distinction the notion of “hole” is undefined. |
| Free-list data structure | All three policies operate on an ordered list of free blocks; you must be able to traverse and splice list nodes. |
| External fragmentation | The central cost metric: total free memory may be sufficient, yet no single contiguous block satisfies the request. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Memory is a linear array of fixed-size cells
A physical memory of size *M* is modelled as an array of *M* addressable units. At any moment the array is partitioned into allocated blocks and free blocks; every free block is a contiguous run of unused cells.

Example: a 16-cell memory after two processes have been loaded might look like `[P1][P1][free×4][P2][P2][free×8]`.

Formally, the memory state is a sequence of intervals \([s_i, e_i)\) where each interval is either allocated or free and the intervals are disjoint and cover \([0, M)\).

> [!WARNING]
> Treating memory as a set of independent cells instead of ordered intervals hides the contiguity constraint and makes fragmentation invisible.

### Step 2 — A request is a size *k*; an allocation succeeds only if a free interval of length at least *k* exists
Allocation is not merely “enough free cells,” but “enough consecutive cells.” This is the source of external fragmentation.

### Step 3 — First-fit selects the lowest-address free interval that satisfies *k*
The free list is kept in address order. The allocator walks from the head and returns the first interval \([s, e)\) with \(e - s \ge k\); the remainder \(e - s - k\) becomes a new free interval starting at \(s + k\).

### Step 4 — Best-fit selects the free interval whose size is closest to *k* from above
The entire free list is examined; the interval with minimal \((e - s) - k \ge 0\) is chosen. Ties are broken by lowest address.

### Step 5 — Worst-fit selects the largest free interval
Again the whole list is scanned; the maximum-length interval is taken, regardless of how much larger it is than *k*.

### Step 6 — All three policies leave the same total free space but different fragment-size distributions
Let \(F\) be total free memory and \(R\) the size of the largest free block. First-fit tends to produce many small fragments near the front of memory; best-fit produces many tiny remnants; worst-fit preserves a few large blocks at the expense of quicker exhaustion of large blocks.

## 5. Worked examples — every step shown

**Example 1 — Trivial first-fit**
- *Given:* Free blocks at addresses [0,5), [8,12); request size 3.
- *Find:* Which block is chosen and the resulting free list.
Scan begins at [0,5): 5-0=5 ≥ 3, so allocate [0,3). Remainder [3,5) is inserted.
**Result:** Allocated [0,3); free list now [3,5), [8,12).
*Reflection:* The early termination of first-fit left a tiny fragment that later requests may be unable to use.

**Example 2 — Best-fit on same state**
- *Given:* Same free blocks and request size 3.
- *Find:* Chosen block.
Both blocks satisfy the request; sizes 5 and 4. The closer fit is [8,12). Allocate [8,11); remainder [11,12).
**Result:** Allocated [8,11); free list [0,5), [11,12).
*Reflection:* Best-fit avoided creating an even smaller fragment at the front but still produced a 1-cell remnant.

**Example 3 — Worst-fit with three requests**
- *Given:* Single free block [0,20); requests 6, 5, 4 in that order.
- *Find:* Block chosen for each request under worst-fit.
First request: only one block, allocate [0,6); remainder [6,20) size 14.  
Second: still only one block, allocate [6,11); remainder [11,20) size 9.  
Third: allocate [11,15); remainder [15,20) size 5.
**Result:** Final free block [15,20).
*Reflection:* Worst-fit kept one large block until the end, but each allocation still split the single block.

**Example 4 — Failure despite sufficient aggregate space**
- *Given:* Free blocks [0,3), [5,7), [10,20); request size 4.
- *Find:* Outcome under each policy.
First-fit: [0,3) too small, [5,7) too small, [10,20) fits → success.  
Best-fit: smallest sufficient block is [10,20) (size 10).  
Worst-fit: largest block is again [10,20).
All succeed, yet if the request had been size 11 every policy would fail even though total free memory = 15.
**Result:** Allocation fails for size 11 under all policies.
*Reflection:* Aggregate free space is necessary but never sufficient; contiguity is the binding constraint.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming first-fit is always fastest | Early termination looks cheap, yet the free list may still be long if many tiny fragments accumulate at the front. | Measure both search length and later allocation failures, not merely the first successful scan. |
| Believing best-fit minimises total waste | Best-fit leaves many unusable slivers; total free space can be identical to first-fit. | Track the size distribution of remnants, not only the sum. |
| Using worst-fit to “preserve large blocks” indefinitely | Every allocation still splits the largest block; the policy merely delays fragmentation. | Simulate the workload; worst-fit often collapses faster on size-skewed request streams. |
| Forgetting to coalesce adjacent free blocks | After deallocation two neighbouring holes remain separate list entries. | Always merge on release before inserting into the free list. |
| Ignoring alignment constraints | Hardware may require allocations on 4 KiB or 64-byte boundaries; the “perfect” fit may be unusable after rounding. | Apply alignment *before* comparing sizes. |
| Treating the free list as sorted by size for first-fit | First-fit requires address order; sorting by size silently converts it into best-fit. | Maintain two structures if both policies must be supported. |
| Overlooking compaction cost | Moving allocated blocks to coalesce holes is often more expensive than the allocation itself. | Account for copy cost and TLB shootdown when evaluating any policy. |

## 7. The textbook-precise statement
Let *M* be the size of physical memory and let *F* be the ordered list of free intervals. For a request of size *k*, first-fit returns the interval \([s,e) \in F\) with minimal *s* such that \(e-s \ge k\); best-fit returns the interval with minimal \((e-s)-k \ge 0\); worst-fit returns the interval with maximal \(e-s\). After allocation the chosen interval is replaced by its remainder (if any). (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §9.3.)

## 8. Visual — diagram or schematic
```
Address: 0        5   8        12       16
         [====P1====][ free ][===P2===][ free ]
                    ↑first-fit would stop here for k=3
                    ↑best-fit would skip to the smaller later hole
```
The diagram shows two allocated blocks and two free holes; the arrows indicate the different search outcomes of each policy on the same memory state.

## 9. The memory technique
1. **The hook** — Picture three prospectors walking along a fence of holes: the first grabs the first hole big enough, the second measures every hole and picks the tightest, the third always takes the biggest hole left.
2. **What to overlearn** — First-fit stops at the first sufficient block; best-fit minimises remainder size; worst-fit maximises remainder size.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing the free list as an ordered sequence of intervals and mechanically applying the three selection predicates.

## 10. What this unlocks
Mastery of contiguous placement policies is the prerequisite for understanding why paging and segmentation were invented. The next concepts that directly depend on it are external versus internal fragmentation, the buddy allocator, slab allocation, and the working-set model that justifies demand paging.

## 11. Self-check — five questions, no answers
1. Given free blocks of sizes 10, 4, 20 and a request of 5, list the block chosen by each policy and the size of the new remainder each produces.
2. Under which policy is it possible to allocate three successive requests of size 4 from an initial 20-unit block and still have a 4-unit free block left?
3. A workload repeatedly allocates and frees blocks of size 1; which policy produces the largest number of fragments after 1000 such operations?
4. Why does best-fit sometimes increase external fragmentation compared with first-fit on the same trace?
5. Suppose alignment to 8-byte boundaries is required; how does this change the decision procedure inside each of the three policies?