## 1. The one-sentence answer
**Paging partitions both virtual address spaces and physical memory into equal-sized blocks (pages and frames) whose size is a power of two, then records the mapping from virtual page number to physical frame number inside a page table that the hardware consults on every memory reference.**

A process sees a single, contiguous virtual address space. The operating system, however, places the process’s pages into any available physical frames; the frames need not be contiguous. Because page size is a power of two, the low-order bits of any virtual address are an offset inside a page and the high-order bits are the page number. Translation therefore requires only a table lookup plus concatenation, never arithmetic division.

The page table itself is an array indexed by virtual page number; each entry stores the corresponding frame number together with protection and presence bits. When the address space is large, a single flat table becomes impractical, so the table is itself paged and organised in multiple levels.

> [!NOTE]
> The decisive insight is that the page size simultaneously determines both the granularity of protection and the size of every page-table entry; choosing it is therefore a permanent trade-off between internal fragmentation and table overhead.

## 2. Why this matters — concrete and current
Modern x86-64 processors used by every major cloud provider implement four-level page tables with 4 KiB base pages; the same hardware also supports 2 MiB and 1 GiB “huge pages” that reduce TLB pressure for database buffer pools at companies such as Google and Meta.

In Apple’s M-series SoCs the page size is fixed at 16 KiB; the choice reduces the number of TLB entries required for the GPU’s shared virtual memory, directly improving sustained machine-learning throughput on the Neural Engine.

NASA’s flight software for the Perseverance rover runs on a RAD750 processor whose MMU uses 4 KiB pages; the fixed page size guarantees that a single corrupted frame cannot overwrite two independent control tasks, satisfying DO-178C isolation requirements.

Linux’s Transparent Huge Pages and Windows’ Large Page support both rely on the same page-table structure described below; when an application such as PostgreSQL allocates a multi-gigabyte shared buffer, the kernel coalesces 4 KiB pages into 2 MiB pages by updating only the page-table entries, without copying data.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Binary positional notation     | Page size is always \(2^k\); low bits become offset, high bits become page number.   |
| Array indexing                 | A page table is literally an array whose index is the virtual page number.           |
| Address-space layout           | You must distinguish the contiguous virtual addresses a program sees from the scattered physical frames that actually hold the data. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Fixed-size blocks remove external fragmentation
Any free physical memory region whose size is at least one page can be used; the allocator never has to find a single contiguous block large enough for an entire process.

### Step 2 — Split every address into page number and offset
Because the page size \(S = 2^k\), the low-order \(k\) bits of a virtual address \(v\) are the offset inside the page and the remaining bits form the virtual page number \(p = \lfloor v / S \rfloor\).

### Step 3 — The page table records the mapping
The page table is an array \(PT\) of size equal to the number of virtual pages; \(PT[p]\) stores the physical frame number \(f\) (plus status bits). The physical address is therefore \(a = f \cdot S + (v \bmod S)\).

### Step 4 — Page-table size grows with address space
A 64-bit address space with 4 KiB pages requires \(2^{52}\) entries. Storing even one byte per entry would consume 4 PiB; the table itself must therefore be pageable.

### Step 5 — Multi-level tables exploit sparsity
The single array is replaced by a tree of tables. The top-level table points to second-level tables; only those branches that contain valid pages are allocated. Translation hardware walks the tree on every TLB miss.

### Step 6 — Translation hardware caches results
A translation lookaside buffer (TLB) stores recent \(\langle p, f \rangle\) pairs. A hit avoids the page-table walk; a miss triggers the walk and inserts the result.

## 5. Worked examples — every step shown

**Example 1 — 32-bit address, 4 KiB pages**  
*Given:* Virtual address \(0x0000\text{1A2B}\), page size \(4096 = 2^{12}\).  
*Find:* Virtual page number and offset.  
\(0x0000\text{1A2B} = 6699_{10}\).  
Shift right 12 bits: \(6699 \gg 12 = 1\).  
Mask low 12 bits: \(6699 \& 0xFFF = 0xA2B\).  
*Why* right-shift isolates the page number.  
*Why* bitwise AND isolates the offset.  
**Virtual page = 1, offset = 0xA2B.**

**Example 2 — Compute physical address from page-table entry**  
*Given:* Page-table entry for page 1 holds frame 0x00A3; offset 0xA2B; page size 4 KiB.  
*Find:* Physical address.  
Frame base = \(0x00A3 \times 4096 = 0x0A3\text{000}\).  
Add offset: \(0x0A3\text{000} + 0xA2B = 0x0A3\text{A2B}\).  
*Why* multiplication restores the frame base address.  
**Physical address = 0x0A3A2B.**

**Example 3 — Size of a single-level page table**  
*Given:* 48-bit virtual address, 4 KiB pages, 8-byte page-table entries.  
*Find:* Table size in bytes.  
Number of pages = \(2^{48-12} = 2^{36}\).  
Size = \(2^{36} \times 8 = 2^{39}\) bytes = 512 GiB.  
*Why* subtract page offset bits from total address bits.  
**Table occupies 512 GiB.**

**Example 4 — Four-level walk on x86-64**  
*Given:* CR3 holds physical address of PML4; virtual address bits [47:39] = 0x1A.  
*Find:* Address of the next table.  
Read 64-bit entry at CR3 + (0x1A << 3).  
Extract bits [51:12] of that entry; shift left 12 to obtain next table base.  
*Why* each level uses nine bits (512 entries) and an 8-byte descriptor.  
**Next table base obtained after four successive indexed loads.**

*Reflection*  
Each example isolates one mechanical step; combining them yields the full translation pipeline used by real MMUs.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating page size as variable at runtime | Most ISAs hard-wire supported sizes in the TLB     | Read the architecture manual before sizing tables    |
| Forgetting protection bits in PTE   | Focus only on frame number                          | Always allocate space for the full PTE format        |
| Assuming single-level table fits    | 64-bit address spaces are huge                      | Immediately draw the multi-level tree                |
| Ignoring internal fragmentation     | Page size chosen only for TLB benefit               | Compute waste = (page size)/2 per allocation         |
| Confusing VPN with virtual address  | Notation overlap                                    | Write \(v = p\cdot S + o\) explicitly                |
| Overlooking TLB shootdown cost      | Page-table update is local; TLB is not              | Use INVPCID or IPI broadcast on every mapping change |
| Using decimal arithmetic on addresses | Hex masks feel unnatural                            | Always verify with bitwise operations                |

## 7. The textbook-precise statement
Let \(S = 2^k\) be the page size in bytes. A virtual address \(v\) is written \(v = p\cdot S + o\) where \(0 \le o < S\). The page table is a function \(PT: \mathbb{N} \to \mathbb{N} \times \{0,1\}^m\) that maps each virtual page number \(p\) to a frame number \(f\) and a set of status bits. The hardware computes the physical address \(a = f\cdot S + o\) provided the present bit is set. When the table itself is paged, \(PT\) is represented by a radix tree of depth \(d\) whose fan-out is \(2^l\) at each level (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §9.4).

## 8. Visual — diagram or schematic
```text
Virtual address (48 bits)
[ 9 bits | 9 bits | 9 bits | 9 bits | 12 bits ]
   PML4     PDPT     PD       PT     offset
      │        │        │        │
      ▼        ▼        ▼        ▼
   CR3 ──► [ ]──► [ ]──► [ ]──► [f |flags] ──► Physical frame
             (PML4)   (PDPT)   (PD)     (PT)
```
Each bracket is a 4 KiB table containing 512 8-byte entries. Only the final entry supplies the frame number \(f\).

## 9. The memory technique
**The hook**  
Picture a gigantic library whose bookshelves are all exactly one metre wide; each shelf is a frame. The catalogue (page table) tells you which shelf holds the next page of the book you are reading; you never need a single long shelf.

**What to overlearn**  
- \(S = 2^k\) ⇒ offset mask = \(S-1\), page number = \(v \gg k\).  
- PTE size is almost always 8 bytes on 64-bit machines.  
- Four-level walk cost is four memory references on a TLB miss.

**Spaced-repetition schedule**  
Review the address-split formula after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback**  
Re-derive the split by noting that any power-of-two divisor turns division into a shift and remainder into a mask; the page table is then the only data structure that can map the resulting indices.

## 10. What this unlocks
Paging supplies the address-translation substrate on which virtual memory, copy-on-write, memory-mapped files and demand paging are built. The next concepts that depend directly on it are multi-level page-table walks, TLB organisation, page-fault handling, and the design of huge-page and secure-enclave extensions.

## 11. Self-check — five questions, no answers
1. A system uses 64 KiB pages on a 48-bit virtual address space. How many bits are required for the offset field and how many entries exist in a hypothetical single-level page table?  
2. Given a page-table entry whose frame field is 0x0000_0A3F and a 4 KiB page size, compute the physical address that corresponds to virtual address 0x0000_00FC.  
3. Why does increasing page size from 4 KiB to 2 MiB simultaneously reduce TLB misses and increase potential internal fragmentation?  
4. In a four-level x86-64 page table, bits [47:39] index the top-level table. If those nine bits are all zero, which virtual-address range is being translated?  
5. A programmer observes that a 1 GiB allocation incurs 262 144 page faults even though physical memory is plentiful. Which single design choice in the paging system most likely explains the observation?