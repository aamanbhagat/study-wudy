## 1. The one-sentence answer

**Fragmentation** describes wasted memory that occurs either inside allocated blocks (internal) or between them (external), while compaction is the process of moving live processes to consolidate scattered free holes into one usable block.

Internal fragmentation arises when a process receives more memory than it requests because the allocator works in fixed sizes; the unused portion inside that block stays idle until the process terminates. External fragmentation appears when free memory exists in many small, non-contiguous holes even though the total free space exceeds the next request; the holes cannot satisfy a contiguous allocation request. Compaction relocates running processes to adjacent addresses so that all free holes merge into a single large block, but it incurs CPU and I/O overhead and requires relocation registers or dynamic address translation.

> [!NOTE]
> The decisive insight is that internal fragmentation wastes space that is already given to a process, whereas external fragmentation wastes space that is still free; only the latter can be cured by moving processes.

## 2. Why this matters — concrete and current

Modern Android ART runtime uses a non-moving concurrent mark-sweep collector for large objects precisely to avoid compaction pauses on phones whose RAM is already fragmented by dozens of background services.

Linux kernel’s buddy allocator and slab caches are tuned together so that internal fragmentation inside slabs stays below 12 % on servers running thousands of small kernel objects; the choice directly affects tail-latency of Redis clusters at companies such as Twitter.

NASA’s flight software on the Perseverance rover runs on a VxWorks fixed-partition scheduler; internal fragmentation inside each partition is accepted because external fragmentation is unacceptable when a single missed deadline can abort a landing sequence.

Google’s TPU v4 pods employ huge-page (2 MiB) allocation for model weights; external fragmentation of these huge pages forces the job scheduler to perform live migration of entire VMs, an operation whose cost is now a first-class metric in the Borg cluster traces published in 2023.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Contiguous allocation    | Both internal and external fragmentation are defined only when a process must occupy a single contiguous address range. |
| Address translation      | Compaction moves a process; hardware or software relocation must update every address the process uses. |
| Free-list / bitmap       | External fragmentation is visible only when the allocator maintains an explicit record of free blocks. |

If any row above is unfamiliar, pause and read the corresponding section on contiguous allocation and dynamic relocation before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Fixed-size blocks create internal waste
A process that needs 120 bytes but receives a 256-byte block loses 136 bytes that no other process can use until it exits.  
Example: a 1 KiB page is handed to a 700-byte object; 324 bytes remain unusable inside that page.  
Formal statement: given block size \(B\) and request size \(R \leq B\), internal waste = \(B - R\).  
> [!WARNING]  
> Treating the entire allocated block as “used” hides the fact that the unused suffix cannot satisfy any future request.

### Step 2 — Variable-size blocks allow external holes
After repeated allocations and deallocations, free memory appears as many small holes whose individual sizes are smaller than the next request even though their sum is sufficient.  
Example: holes of 300 B, 400 B and 500 B exist; a 900 B request fails although 1200 B are free.  
Formal statement: let \(H = \{h_1, h_2, \dots, h_k\}\) be the set of free holes; external fragmentation exists when \(\sum h_i \ge R\) yet \(\nexists h_i \ge R\).

### Step 3 — Compaction merges holes by relocation
Every live process is moved to a new contiguous region so that all free holes collapse into one.  
Example: processes A (200 B) at 0x0000 and C (300 B) at 0x0400; after moving C next to A the single hole grows from 0x0200 onward.  
Formal statement: compaction produces a new address map \(M'\) such that the free interval \([L', L' + S]\) satisfies \(S = \sum h_i\).

### Step 4 — Relocation cost and correctness
Each moved process requires its base register or page-table entries to be updated; any pointer inside the process must remain valid after the move.  
> [!WARNING]  
> If relocation is performed without stopping the process, dangling references appear and the program crashes.

### Step 5 — Textbook-grade summary
Internal fragmentation is bounded by the chosen block granularity; external fragmentation is unbounded and can reach 50 % of RAM under worst-case request sequences; compaction restores contiguity at the price of \(O(N)\) memory traffic where \(N\) is the total size of live data.

## 5. Worked examples — har step show karo

**Example 1 — Internal fragmentation in fixed partitions**  
*Given:* Memory divided into 4 KiB partitions; process P requests 2.5 KiB.  
*Find:* wasted bytes inside P’s partition.  
Step 1: allocator rounds 2.5 KiB up to next multiple of 4 KiB.  
Step 2: internal waste = \(4096 - 2560 = 1536\) bytes.  
*Why:* rounding decision is forced by hardware page size.  
**1536 bytes wasted**

*Reflection:* the waste is invisible to other processes until P terminates.

**Example 2 — External fragmentation with variable partitions**  
*Given:* free holes 1 KiB, 2 KiB, 3 KiB; request arrives for 4 KiB.  
*Find:* can allocation succeed?  
Step 1: sum of holes = 6 KiB > 4 KiB.  
Step 2: no single hole ≥ 4 KiB.  
*Why:* first-fit or best-fit policy examines each hole independently.  
**Allocation fails**

*Reflection:* total free space is misleading; contiguity matters.

**Example 3 — Compaction after external fragmentation**  
*Given:* processes A(2 KiB) at 0x0000, B(1 KiB) at 0x2000; free holes at 0x0800 (2 KiB) and 0x3000 (3 KiB).  
*Find:* memory map after compaction.  
Step 1: move B immediately after A → new base of B becomes 0x0800.  
Step 2: single free block now starts at 0x0C00 with size 5 KiB.  
*Why:* relocation register of B is updated from 0x2000 to 0x0800.  
**One 5 KiB free block**

*Reflection:* CPU must be halted or use hardware support during move.

**Example 4 — Cost calculation**  
*Given:* 256 MiB of live data, memory bandwidth 25 GiB/s, compaction performed every 30 s.  
*Find:* fraction of bandwidth consumed by compaction.  
Step 1: data movement per compaction = 256 MiB.  
Step 2: time = \(256 \times 2^{20} / (25 \times 2^{30}) \approx 0.01\) s.  
Step 3: duty cycle = 0.01 / 30 ≈ 0.033 %.  
**0.033 % bandwidth overhead**

*Reflection:* cost is modest unless live data grows to tens of GiB.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Confusing internal with external  | Both produce “wasted” numbers               | Ask: “Is the wasted space already given to a process?” |
| Assuming compaction is free       | Ignoring relocation registers               | Always compute memory traffic before proposing compaction |
| Using only total free memory      | Ignoring contiguity requirement             | Maintain both total free and largest hole statistics |
| Forgetting to stop mutator threads| Pointers become invalid mid-move            | Use stop-the-world or concurrent compaction algorithms |
| Choosing tiny partition sizes     | Increases internal fragmentation            | Profile average request size before fixing block size |
| Ignoring TLB shootdown cost       | Compaction invalidates many TLB entries     | Batch updates and use PCID/ASID to reduce flushes    |

## 7. The textbook-precise statement

In Silberschatz, Galvin and Gagne, *Operating System Concepts*, 10e, §9.3, external fragmentation is defined as the existence of a set of free holes whose aggregate size meets or exceeds a request yet no individual hole is large enough; internal fragmentation is the difference between allocated block size and requested size when allocation is performed in fixed quanta. Compaction is the mechanism that relocates all processes so that the free memory becomes a single contiguous block; it is feasible only when relocation is dynamic and the CPU can be paused or when hardware supports concurrent relocation.

## 8. Visual — diagram or schematic

```
Address
0x0000  +----------+
        | Process A (2 KiB) |
0x0800  +----------+
        |   Hole   (2 KiB)  |   <-- external fragment
0x1000  +----------+
        | Process B (1 KiB) |
0x1400  +----------+
        |   Hole   (3 KiB)  |
...     +----------+
After compaction:
0x0000  +----------+
        | Process A |
0x0800  +----------+
        | Process B |
0x0C00  +----------+
        |  Single 5 KiB hole |
```

## 9. The memory technique

**The hook**  
Picture memory as a bookshelf: internal fragmentation is empty space inside each book’s cover; external fragmentation is scattered gaps between books that cannot fit a new thick volume until you push the existing books together.

**What to overlearn**  
Internal waste = block size − request size; external fragmentation exists when largest hole < request ≤ total free; compaction cost = 2 × live data size (read + write).

**Spaced-repetition schedule**  
Review definitions after 1 day, largest-hole vs total-free distinction after 3 days, compaction cost calculation after 7 days, then again at 16 and 35 days.

**First-principles fallback**  
If the formulas vanish, redraw the address map, mark every allocated region, sum the unmarked gaps, and ask whether any single gap satisfies the next request.

## 10. What this unlocks

Understanding fragmentation lets you reason about malloc/free behaviour, garbage-collector pause times, and huge-page allocation policies.

- Buddy allocator design in Linux
- Concurrent compaction in JVM G1 and ZGC
- Huge-page management in hypervisors
- Real-time fixed-partition scheduling

## 11. Self-check — five questions, no answers

1. A 4 KiB page holds a 900-byte object; how many bytes are lost to internal fragmentation?
2. After a sequence of allocations the free holes are 1 KiB, 3 KiB and 2 KiB; will a 5 KiB request succeed without compaction?
3. Which hardware feature makes compaction cheaper: base-limit registers or paging?
4. If live data is 1 GiB and memory bandwidth is 50 GiB/s, what is the minimum time one full compaction must take?
5. A student claims “internal fragmentation can be eliminated by using variable partitions.” Identify the flaw in one sentence.