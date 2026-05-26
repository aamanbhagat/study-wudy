## 1. The one-sentence answer
**Memory-mapped files bind a region of a process’s virtual address space directly to the contents of a disk file so that ordinary memory loads and stores become file I/O.**

The operating system accomplishes the binding by installing page-table entries that point at the file’s on-disk blocks instead of anonymous RAM frames. When the process dereferences an address inside the mapped region, a page fault occurs if the block is not yet resident; the kernel then reads the block into a page cache frame and wires the virtual address to that frame. Subsequent accesses hit the cache exactly as they would for ordinary heap memory.

Because the mapping is performed at page granularity, the file may be larger than physical memory; only the pages actually touched consume RAM. Writes to the mapped region are propagated back to the file either lazily through the page cache or immediately when the process calls msync.

> [!NOTE]
> The single deepest insight is that the file ceases to be an opaque byte stream and becomes instead an array whose elements live in the virtual-address namespace; all of the machinery of virtual memory—demand paging, copy-on-write, protection bits—now applies uniformly to both RAM and persistent storage.

## 2. Why this matters — concrete and current
SQLite uses mmap on its database file to let the B-tree engine treat disk pages as in-memory nodes, eliminating an entire layer of user-space buffering and reducing system-call overhead on every cursor movement.

Large language-model inference engines such as vLLM map multi-gigabyte weight tensors directly from NVMe SSDs into GPU-visible host memory; the Linux page cache then acts as a transparent staging area, allowing models that exceed DRAM to run without explicit sharding code.

The Linux kernel’s ext4 and XFS file systems employ mmap for journal recovery and for the page cache itself; the same page-table walk that resolves a user buffer also resolves cached file data, unifying two previously separate I/O paths.

Semiconductor design houses map multi-terabyte GDSII layout files into verification tools so that geometric queries become ordinary pointer arithmetic rather than repeated lseek/read sequences, cutting verification time from days to hours on a single workstation.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Virtual memory & page tables | The mapping is realized by inserting file-backed entries into a process’s page table. |
| Demand paging & page faults   | Access to an unmapped file page triggers exactly the same fault path used for anonymous memory. |
| File-system block layout      | The kernel must translate file offsets into physical disk blocks before wiring PTEs. |
| Protection bits & sharing     | mmap can create shared or private mappings, directly affecting copy-on-write and visibility semantics. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Treat the file as a contiguous byte array
A file on disk is already an ordered sequence of bytes. Mapping simply exposes that sequence inside the process address space so that a C pointer or array index can name any byte.

Example: mapping a 4096-byte file at virtual address 0x40000000 lets the expression `*(char*)0x40001000` read byte 4096 of the file.

Formally, the mapping establishes a bijection  
$$
[0, \mathit{file\_size}) \;\mapsto\; [v, v+\mathit{file\_size})
$$  
where \(v\) is a page-aligned virtual address chosen by the kernel or requested by the caller.

> [!WARNING]
> If the chosen virtual range overlaps an existing mapping, the kernel silently unmaps the previous occupant; forgetting this rule produces mysterious segmentation faults later.

### Step 2 — Page-table entries point at the page cache, not anonymous frames
Instead of allocating fresh zero-filled pages, the kernel records that each virtual page corresponds to a particular file offset. The page-table entry therefore stores a pointer into the page cache rather than a pointer to an anonymous frame.

### Step 3 — First access triggers a file-backed page fault
When the CPU walks the page table and discovers the “not-present” bit, the page-fault handler consults the vma (virtual-memory area) structure, computes the required file offset, and issues a read of the corresponding disk block into a free page-cache frame. Only after the frame is installed does the handler update the PTE and return.

### Step 4 — Subsequent accesses are ordinary cache hits
Once the PTE is valid, loads and stores proceed at hardware speed. Dirty bits in the PTE cause the page to be written back on eviction or explicit msync, exactly as with anonymous pages.

### Step 5 — The mapping is removed by unmap or process exit
munmap deletes the vma and flushes any dirty pages. On process termination the kernel walks the vma list and performs the same cleanup, guaranteeing that all modifications reach disk before the file descriptor is closed.

## 5. Worked examples — every step shown

**Example 1 — Minimal read mapping on Linux**  
*Given:* file “data.bin” of size 4096 bytes, page size 4096.  
*Find:* address of byte 0 after mmap.  
1. `fd = open("data.bin", O_RDONLY)` — obtains file descriptor.  
   *Why:* mmap requires an open file descriptor to identify the inode.  
2. `addr = mmap(NULL, 4096, PROT_READ, MAP_PRIVATE, fd, 0)` — kernel chooses address.  
   *Why:* MAP_PRIVATE requests copy-on-write semantics even though we never write.  
3. PTE for the returned page is marked not-present but file-backed.  
   *Why:* demand paging defers I/O.  
**Final answer**  
`addr` is a valid pointer; first dereference loads the page from disk.  

*Reflection:* The example isolates the single system call that creates the mapping; everything else is automatic.

**Example 2 — Shared writable mapping between two processes**  
*Given:* same file, two processes A and B.  
*Find:* visibility of a write performed by A to B.  
1. Both call mmap with MAP_SHARED.  
   *Why:* MAP_SHARED tells the kernel to keep a single set of page-cache pages.  
2. A writes `*ptr = 42`.  
   *Why:* store sets the dirty bit in the PTE; page remains in cache.  
3. B dereferences the same virtual address.  
   *Why:* identical file offset maps to the identical cache frame.  
**Final answer**  
B immediately observes 42 without any explicit IPC.  

*Reflection:* Shared mappings turn the page cache into a rendezvous point.

**Example 3 — Mapping larger than physical memory**  
*Given:* 10 GiB file, machine with 4 GiB RAM.  
*Find:* maximum resident set size while scanning the file once.  
Because only touched pages occupy RAM, RSS never exceeds roughly 4 GiB plus a few kernel structures.  
**Final answer**  
RSS ≈ 4 GiB despite file size 10 GiB.  

*Reflection:* Virtual address space size, not RAM size, bounds the mapping.

**Example 4 — msync versus munmap durability**  
*Given:* MAP_SHARED writable mapping, modification at offset 0.  
*Find:* guaranteed durability point.  
- msync(addr, len, MS_SYNC) blocks until the page is written and the disk acknowledges.  
- munmap also flushes, but the call returns before the disk write completes unless MS_SYNC is used inside the kernel implementation.  
**Final answer**  
Only an explicit MS_SYNC msync guarantees durability before the next statement executes.  

*Reflection:* Durability is a separate contract from visibility.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting MAP_SHARED when writes must be visible to other processes | Default MAP_PRIVATE silently creates a copy-on-write snapshot | Always choose the sharing flag explicitly after deciding visibility requirements |
| Accessing beyond the mapped length | The kernel does not extend the mapping when the file grows | Either map the maximum expected size or remap after ftruncate |
| Assuming zero-copy semantics with MAP_PRIVATE writes | Copy-on-write still allocates anonymous pages on first write | Use MAP_SHARED when zero-copy is mandatory |
| Ignoring SIGBUS on truncated mapped files | A later truncate can invalidate previously valid pages | Handle SIGBUS or ensure the file size is stable for the mapping lifetime |
| Mapping with offset not page-aligned | POSIX requires the offset to be a multiple of page size | Always compute offset as `(off_t)page_index * page_size` |
| Leaking mappings in long-running daemons | Each mmap consumes address space even after the file is closed | Pair every successful mmap with an munmap in a finally block or RAII wrapper |
| Expecting msync to provide atomic multi-page updates | msync flushes pages independently; no ordering across pages is guaranteed | Use higher-level logging or database techniques for atomicity |

## 7. The textbook-precise statement
A memory-mapped file is created by the call  
$$
\mathit{mmap}(addr, len, prot, flags, fd, offset)
$$  
which returns a virtual address \(v\) such that, for every byte \(i\) with \(0 \le i < len\), the virtual address \(v+i\) is backed by byte \(offset+i\) of the open file referenced by descriptor \(fd\), subject to the constraints that \(offset\) is page-aligned, \(len\) is positive, and the mapping does not overlap an existing non-removable mapping. The resulting pages participate in the ordinary page-replacement policy and are written back according to the sharing mode (MAP_SHARED versus MAP_PRIVATE). See Tanenbaum & Bos, *Modern Operating Systems*, 4e, §3.3.2.

## 8. Visual — diagram or schematic
```text
Virtual Address Space          Page Table          Page Cache / Disk
0x00000000  +-------------+
            |             |
0x40000000  +-------------+ ---->  PTE[0]  ---->  [Page 0 of file]
            |  mapped     |        file-backed      (disk block 17)
            |  region     |
            |  (len=3P)   | ---->  PTE[1]  ---->  [Page 1 of file]
            +-------------+        file-backed      (disk block 18)
            |             | 
            |   ...       | ---->  PTE[2]  ---->  [Page 2 of file]
            +-------------+        file-backed      (disk block 19)
```
Each PTE stores the frame number of the page-cache page together with the file inode and offset needed for write-back.

## 9. The memory technique
1. **The hook** — Picture the disk file as a transparent glass ruler laid over your address-space graph paper; every tick mark on the ruler lines up with a memory address, and sliding the ruler (changing the mapping) instantly changes which numbers you see.
2. **What to overlearn** — mmap returns a pointer, not a file descriptor; MAP_SHARED versus MAP_PRIVATE is the single bit that decides whether writes are visible to other processes and survive munmap.
3. **Spaced-repetition schedule** — Review the five-step derivation at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Re-derive from the fact that every load/store instruction ultimately indexes a page table; therefore any byte source (RAM, file, device) can be installed in that table.

## 10. What this unlocks
Memory-mapped files are the foundation for user-space zero-copy I/O, persistent data structures, and many transactional storage engines.

- Next concepts: copy-on-write fork of mapped regions, user-space page-fault handling (userfaultfd), DAX mappings on persistent memory, and memory-mapped network buffers.
- Techniques that depend directly on it: memory-mapped B-trees, log-structured merge-tree compaction without extra buffering, and lock-free shared-memory IPC.

## 11. Self-check — five questions, no answers
1. A process maps a 1 MiB file with MAP_PRIVATE and then writes every byte. What is the theoretical maximum additional anonymous memory that can be allocated solely because of these writes?
2. Two processes map the same file with MAP_SHARED at different virtual addresses. If process A writes to offset 0, must the virtual address used by B contain the new value immediately after the store instruction completes on A’s CPU?
3. What happens to a thread that dereferences a pointer inside a region that has been truncated on disk since the mmap call?
4. Construct a concrete counter-example showing that msync(MS_ASYNC) does not guarantee durability even after the call returns.
5. A program maps the same file twice, once read-only and once read-write with MAP_SHARED. If the read-write mapping writes to a page, is the read-only mapping required to observe the change? Under what precise conditions?