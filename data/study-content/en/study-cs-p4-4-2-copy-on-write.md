## 1. The one-sentence answer
**Copy-on-write** is an operating-system memory-sharing technique in which multiple processes map the same physical page frames as read-only until any process performs a write, at which point the kernel creates a private copy for the writer.

When a parent process calls `fork`, the child receives an identical virtual-address space. Instead of duplicating every page immediately, the kernel marks the shared pages read-only in both page tables and records that they are copy-on-write. The first write attempt triggers a page-fault handler; the handler allocates a fresh frame, copies the original contents, updates the writer’s page-table entry to point to the new frame with write permission, and resumes the process. All other sharers continue to see the unmodified original page.

This defers the cost of copying until mutation actually occurs. In the common case where many pages remain unchanged (for example, code segments or read-only data), the system avoids unnecessary memory traffic and reduces both latency and pressure on physical RAM.

> [!NOTE]
> The decisive insight is that the page-fault mechanism, normally used only for demand paging from disk, is repurposed here as a lightweight trigger for on-demand duplication, turning a potential O(n) copy into an O(1) protection change until the first write.

## 2. Why this matters — concrete and current
In the Linux kernel, the `fork` path uses copy-on-write for every anonymous mapping; measurements on recent Intel servers show that a typical `fork` of a 1 GiB process touches fewer than 2 MiB of new pages when the child immediately calls `execve`. Docker and other container runtimes rely on the same mechanism when launching new container instances from a shared base image; the overlay filesystem and the memory pages backing the root filesystem both remain shared until a container writes.

In high-performance computing, the MPI launch of thousands of ranks on a single node uses `fork` followed by minimal writes; copy-on-write keeps the per-rank memory overhead close to the size of the writable data segment rather than the entire program image. Cloud hypervisors such as KVM apply an analogous technique (KSM—Kernel Same-page Merging) that later splits merged pages on write, again using the copy-on-write fault path.

Semiconductor simulators at companies such as Intel and TSMC run massive multi-process verification workloads; copy-on-write allows each simulation process to inherit the large read-only model database while only private state is duplicated, keeping total physical memory within the limits of a single server.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Virtual memory & page tables | COW is implemented by manipulating PTE permission bits and tracking sharers. |
| Page-fault handler       | The write to a COW page is detected exactly by the fault that occurs on a read-only mapping. |
| Reference counting on pages | The kernel must know when the last writer has copied a page so the original frame can be freed. |
| `fork` semantics         | The canonical API that exposes COW to user space. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Shared mappings start read-only
The kernel creates a single physical frame and installs read-only mappings in every participating process’s page table.  
Concrete example: after `fork`, both parent and child see virtual page 0x4000 mapped to frame 0x100 with the read bit set and the write bit cleared.  
Formal statement:  
$$
\text{PTE}_p[v] = (f, R=1, W=0), \quad \text{PTE}_c[v] = (f, R=1, W=0)
$$  
> [!WARNING]
> If the kernel leaves the write bit set, the first store instruction modifies the shared frame without ever taking a fault, silently corrupting every sharer.

### Step 2 — Write attempt generates a synchronous fault
A store instruction to the virtual address causes the MMU to signal a page-fault exception because the PTE denies write permission.  
The fault is precise: the saved program counter points to the offending store.

### Step 3 — Fault handler allocates and copies
The handler allocates a new frame \(f'\), copies the contents of \(f\) into \(f'\), then rewrites the faulting PTE to point to \(f'\) with write permission enabled.  
Formal transition:  
$$
\text{PTE}_p[v] \leftarrow (f', R=1, W=1)
$$

### Step 4 — Reference-count maintenance
A per-frame reference count is decremented for the original frame when a sharer departs; the frame is returned to the free list only when the count reaches zero.  
This guarantees that a page is never freed while any process still maps it read-only.

### Step 5 — Resumption and transparency
The fault handler returns to the instruction that faulted; the store now succeeds against the private copy. From the program’s viewpoint nothing has changed except the physical location of its data.

## 5. Worked examples — every step shown

**Example 1 — Minimal fork**  
*Given:* Parent writes one byte after `fork`.  
*Find:* Number of new frames allocated.  
Step 1: Both PTEs point to frame \(f\) read-only. *Why:* Kernel sets COW bit on fork.  
Step 2: Child executes `movb $1, (addr)`. *Why:* Store triggers fault because W=0.  
Step 3: Handler allocates \(f'\), copies 4 KiB, updates child PTE. *Why:* Only the writer needs a private copy.  
**Final answer:** One new frame is allocated.

*Reflection:* The example isolates the single write that forces the first copy; everything else stays shared.

**Example 2 — Multiple writers**  
*Given:* Parent and child both write distinct bytes on the same original page.  
*Find:* Final mapping state.  
Step 1: Both share \(f\) read-only.  
Step 2: Parent faults, receives \(f_p\).  
Step 3: Child faults independently, receives \(f_c\).  
**Final answer:** Three distinct frames: original \(f\) (now unreferenced), \(f_p\), and \(f_c\).

*Reflection:* Each writer triggers its own copy; the original frame is released only after both counts drop to zero.

**Example 3 — Read-only segment**  
*Given:* Child never writes the text segment.  
*Find:* Memory cost.  
Step 1: Text pages remain shared read-only forever.  
**Final answer:** Zero additional frames for the text segment.

*Reflection:* Demonstrates the payoff of deferral—code pages are never copied.

**Example 4 — Reference-count edge case**  
*Given:* Child exits immediately after fork without writing.  
*Find:* Frame lifetime.  
Step 1: Child’s PTEs are removed; reference count on each shared frame drops by one.  
Step 2: Parent continues; count never reaches zero.  
**Final answer:** Original frames survive until parent exits or writes.

*Reflection:* Shows why reference counts, not simple “copy on fork,” are required.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming `fork` always copies all memory | Textbook diagrams often draw full duplication for simplicity | Measure RSS before and after fork; expect almost no growth until writes occur |
| Forgetting to mark COW pages read-only | PTE permission bits are easy to overlook in custom allocators | Always clear the write bit when installing a COW mapping |
| Releasing a frame while reference count > 0 | Race between last reader exit and writer copy | Use atomic decrement-and-test on the refcount |
| Ignoring COW in signal handlers | A signal handler that writes can trigger an unexpected copy | Audit all write paths that may run after fork |
| Confusing COW with KSM | KSM merges identical pages after the fact; COW prevents duplication from the start | Remember direction: COW splits on write, KSM merges on read |
| Neglecting huge-page COW | Transparent huge pages require splitting before copy | Check `mmap` flags and `madvise` settings |
| Assuming COW works across `exec` | `exec` discards the address space entirely | Realise that COW benefit ends at the first successful `execve` |

## 7. The textbook-precise statement
Copy-on-write is defined in Silberschatz, Galvin, and Gagne, *Operating System Concepts*, 10e, §9.7: when a process attempts to write a shared page whose PTE has the COW bit set, the kernel allocates a new frame, copies the page, updates the PTE to reference the new frame with write permission, and decrements the reference count of the original frame. The mechanism is correct provided every mapping that shares a frame records its reference and every write fault is handled atomically with respect to TLB shootdown.

## 8. Visual — diagram or schematic
```text
Before first write          After child writes 0x4000
Parent PTE               Parent PTE
[0x4000 → 0x100 | R W=0]  [0x4000 → 0x100 | R W=0]
Child PTE                 Child PTE
[0x4000 → 0x100 | R W=0]  [0x4000 → 0x200 | R W=1]
                          Frame 0x100 (shared, ref=1)
                          Frame 0x200 (private copy)
```

## 9. The memory technique
1. **The hook** — Picture a single sheet of glass with writing on it; everyone can read until someone takes a marker and writes, at which instant a photocopier instantly produces a private sheet for that person while the glass stays untouched for everyone else.  
2. **What to overlearn** — (a) COW pages start with W=0; (b) the fault handler both copies and flips W=1; (c) reference count decides when the original frame is freed.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the page-fault path: any store that violates the current PTE permission must allocate, copy, and update.

## 10. What this unlocks
Copy-on-write is the foundation for efficient process creation, container isolation, and memory overcommitment. It directly enables the next topics of demand paging, memory-mapped files, and the implementation of `vfork`/`clone` variants. Understanding COW also prepares the reader for copy-on-write filesystems (Btrfs, ZFS) and for the page-merging techniques used in virtual-machine introspection.

## 11. Self-check — five questions, no answers
1. After a `fork` followed by a single-byte write in the child, how many new page frames are allocated if the written page was previously shared?  
2. Why must the kernel temporarily disable interrupts or use atomic operations while updating both the page table and the reference count during a COW fault?  
3. A parent process creates ten children, each of which writes a distinct 4 KiB region; how many total frames are ultimately occupied by those regions?  
4. What observable symptom appears in `top` or `ps` if a programmer forgets to set the COW bit on a newly allocated shared mapping?  
5. Under what precise condition does the original shared frame get returned to the buddy allocator after a sequence of COW faults?