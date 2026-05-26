## 1. The one-sentence answer
**Fragmentation is the division of free memory into unusable pieces: internal fragmentation wastes space inside each allocated block, external fragmentation wastes space between blocks, and compaction relocates live blocks to merge the free pieces.**

Memory is handed out in fixed-size units chosen by the allocator. When a request does not exactly match a unit size, the allocator rounds up; the unused remainder inside that unit is lost forever for that allocation. This loss is internal because it sits inside an allocated region and cannot be given to anyone else until the whole region is freed.

External fragmentation appears when many small free regions exist whose total size exceeds a new request, yet no single region is large enough. The free space is scattered, so the request fails even though enough memory exists in aggregate. Compaction gathers the scattered free regions by moving allocated blocks, but only when the hardware supports relocation and the cost of copying live data is acceptable.

> [!NOTE]
> Internal fragmentation is paid at allocation time and is bounded by the chosen block size; external fragmentation grows over time and can render the entire free pool unusable without moving data.

## 2. Why this matters — concrete and current
In the Linux kernel’s slab allocator, objects such as `task_struct` are cached in per-CPU slabs whose sizes are rounded to the next power of two; the resulting internal fragmentation directly limits how many concurrent threads a server can hold before memory pressure triggers reclamation.

NVIDIA’s CUDA driver manages GPU device memory with a buddy allocator; external fragmentation on the device forces costly host-to-device migrations when a large contiguous buffer cannot be satisfied even though aggregate free memory remains high, directly affecting training throughput of large language models.

The Mars Perseverance rover’s flight software runs on a VxWorks real-time kernel that disables compaction during critical phases; any external fragmentation that accumulates before landing must be tolerated because moving task control blocks would violate hard deadlines measured in milliseconds.

Modern Android’s ART runtime uses a moving garbage collector precisely to eliminate external fragmentation in the Java heap; without compaction, long-running applications would suffer allocation failures despite hundreds of megabytes of free memory scattered across the address space.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Contiguous allocation    | External fragmentation only arises when a request must occupy a single contiguous region. |
| Block / page size        | Internal fragmentation is measured relative to the granularity at which memory is handed out. |
| Address translation      | Compaction requires the ability to update all references to a moved block without crashing running processes. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Memory is allocated in discrete blocks
An allocator never hands out an arbitrary number of bytes; it rounds every request up to the next multiple of its chosen block size.  
Example: a 100-byte request on a 32-byte block allocator consumes 128 bytes.  
Formally, if \( B \) is the block size and request size \( r \), the allocated size is \( \lceil r / B \rceil \cdot B \).  
> [!WARNING]
> Treating the allocated size as exactly \( r \) hides the rounding loss and leads to incorrect fragmentation calculations.

### Step 2 — Internal fragmentation is the rounding remainder inside each block
The difference between allocated size and requested size stays trapped inside the block until the block is freed.  
Example: three 100-byte requests each waste 28 bytes, for a total internal loss of 84 bytes.  
Formally, internal fragmentation for one block is \( \lceil r / B \rceil \cdot B - r \).

### Step 3 — External fragmentation appears between blocks
After many allocations and deallocations, free blocks become scattered. Their total size may exceed a new request, yet no single free block is large enough.  
Example: free blocks of 40 B, 60 B and 30 B exist; a 100-byte request fails despite 130 B free.  
Formally, external fragmentation exists when \( \sum f_i \ge r \) yet \( \max f_i < r \) for all free blocks \( f_i \).

### Step 4 — The two forms are independent
Internal waste occurs inside allocated blocks; external waste occurs outside them. Eliminating one does not automatically eliminate the other.  
Example: a buddy allocator may show low internal fragmentation yet high external fragmentation after repeated splits and merges.

### Step 5 — Compaction merges external fragments by relocation
Live blocks are copied to one end of memory, coalescing all free space into a single contiguous region.  
Formally, compaction produces a new placement function \( p' \) such that all free intervals become adjacent while preserving \( \forall \) live objects \( o \), size and content of \( o \) remain identical.

### Step 6 — Relocation cost and safety constraints
Every pointer to a moved block must be updated. This requires either a compacting garbage collector or hardware support for base-register relocation.  
Formally, the set of addresses that must be rewritten is exactly the set of pointers whose targets lie in the moved region.

### Step 7 — Textbook metrics
Let \( M \) be total memory, \( A \) allocated bytes, \( I \) internal waste, \( E \) external waste. Then \( M = A + I + E \). Utilization is \( A / M \); external fragmentation ratio is often expressed as \( E / (M - A) \).

## 5. Worked examples — every step shown

**Example 1 — Single internal-fragmentation calculation**  
*Given:* 64-byte blocks, request of 50 bytes.  
*Find:* internal waste.  
Allocated size = \( \lceil 50/64 \rceil \times 64 = 64 \).  
*Why:* ceiling forces rounding up to next block.  
Internal waste = 64 − 50 = 14 bytes.  
**14 bytes**  
*Reflection:* The waste is fixed until the block is freed; it cannot help any other request.

**Example 2 — External fragmentation detection**  
*Given:* free blocks 30 B, 40 B, 50 B; request 60 B.  
*Find:* can allocation succeed?  
Sum of free = 120 ≥ 60, yet max free = 50 < 60.  
*Why:* request requires one contiguous block.  
Allocation fails.  
**Fails**  
*Reflection:* Aggregate free space misleads; contiguity is the binding constraint.

**Example 3 — Compaction outcome**  
*Given:* memory layout [40 B allocated | 30 B free | 50 B allocated | 20 B free].  
*Find:* layout after compaction.  
Move second allocated block leftward, yielding [90 B allocated | 50 B free].  
*Why:* relocation coalesces the two free intervals.  
**Single 50 B free block**  
*Reflection:* Two copy operations and pointer updates were required.

**Example 4 — Combined internal and external accounting**  
*Given:* 32-byte blocks; three 20-byte allocations and two 10-byte allocations; then one 30-byte free occurs.  
*Find:* total internal waste and whether a 40-byte request can be satisfied.  
Each 20-byte allocation wastes 12 B (internal = 36 B total). Each 10-byte wastes 22 B (internal = 44 B total). After one 30-byte free, external free blocks are 32 B and 32 B.  
Sum free = 64 ≥ 40, max free = 32 < 40 → external fragmentation prevents success.  
**Internal 80 B, external blocks too small**  
*Reflection:* Internal waste is paid at allocation; external waste appears only after deallocation patterns create holes.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Confusing “free memory” with usable memory | Students sum all free blocks without checking contiguity | Always test both total free and largest single block |
| Assuming compaction is free         | Ignoring pointer-update and copy cost               | Account for relocation cost in real-time analysis    |
| Treating block size as continuous   | Forgetting that allocators quantize to fixed sizes  | Explicitly apply ceiling function in every calculation |
| Believing first-fit eliminates external fragmentation | First-fit still scatters holes over time            | Measure external fragmentation ratio after workload  |
| Ignoring hardware relocation support | Assuming all architectures allow cheap compaction   | Check for base registers or compacting GC before proposing compaction |
| Measuring only at allocation time   | Internal waste is invisible after the call returns  | Track cumulative internal waste across the run       |
| Overlooking pinned pages            | DMA buffers cannot be moved                         | Mark non-relocatable regions before compaction pass  |

## 7. The textbook-precise statement
In Silberschatz, Galvin, and Gagne, *Operating System Concepts*, 10e, §9.3, external fragmentation is defined as the existence of many small free holes whose total size is sufficient for a request yet no single hole is large enough; internal fragmentation is defined as the difference between allocated and requested size when allocation occurs in fixed-size blocks. Compaction is the process of relocating allocated segments so that all free holes become contiguous, requiring that every pointer to a relocated segment be updated. The memory utilization after compaction equals \( A/M \) where \( A \) is the sum of live data sizes and \( M \) is total memory, assuming relocation is safe.

## 8. Visual — diagram or schematic
```
Address
0x0000  +------------------+  allocated 40 B
0x0028  | free 30 B        |
0x0046  +------------------+  allocated 50 B
0x0078  | free 20 B        |
0x008C  +------------------+
        After compaction:
0x0000  +------------------+  allocated 90 B
0x005A  | free 50 B        |
0x008C  +------------------+
```
Each rectangle shows start address and size; arrows indicate movement of the second allocated block.

## 9. The memory technique
1. **The hook** — Picture internal fragmentation as crumbs left inside each lunch box you packed; external fragmentation as the empty spaces between the boxes on the table. Compaction is sliding the boxes together so the empty spaces become one big gap.
2. **What to overlearn** — Internal waste = \( \lceil r/B\rceil B - r \); external exists when \( \sum f_i \ge r \) yet \( \max f_i < r \); compaction cost equals number of live bytes copied plus pointer updates.
3. **Spaced-repetition schedule** — Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from the ceiling function for internal waste and from the definition of contiguous allocation for external waste; then reintroduce relocation to obtain compaction.

## 10. What this unlocks
Understanding fragmentation lets you evaluate any memory allocator—buddy, slab, or generational GC—and predict both its steady-state utilization and its worst-case allocation latency.  
- Next: paging versus segmentation trade-offs  
- Next: slab and buddy allocator implementations  
- Next: garbage-collection compaction algorithms (mark-compact, copying)  
- Next: real-time memory management with fragmentation bounds

## 11. Self-check — five questions, no answers
1. A 33-byte request is served from 64-byte blocks. Compute internal fragmentation for that single allocation.
2. After a long sequence of allocations and frees you observe free blocks of sizes 16, 32, 16, 48. A new 64-byte request arrives. Does external fragmentation prevent success?
3. Why can a system with 40 % external fragmentation still satisfy many small allocations while failing one large allocation?
4. List the minimal hardware or runtime support required before compaction can be performed safely on a running process.
5. In a workload that never frees memory, which form of fragmentation can still appear and why?