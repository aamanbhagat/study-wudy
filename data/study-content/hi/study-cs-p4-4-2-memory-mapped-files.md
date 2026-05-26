## 1. The one-sentence answer
**Memory-mapped files** let a process treat a file on disk as if it were a contiguous region of its own virtual address space, so ordinary memory loads and stores replace explicit `read`/`write` system calls.

The operating system uses the existing paging hardware to bring file pages into RAM on demand and writes dirty pages back when necessary. This removes the cost of copying data between kernel buffers and user space while giving the programmer a simple pointer-based interface. Because the mapping is backed by the file, changes survive process termination and can be shared across processes that map the same file.

The key insight is that the file becomes just another set of pages in the process’s page table; the page-fault handler, not the programmer, decides when disk I/O actually occurs.

> [!NOTE]
> Once the mapping succeeds, the file’s bytes occupy virtual addresses exactly as if they had been allocated by `mmap` or `malloc`; the only difference is that the backing store is the file itself rather than anonymous swap.

## 2. Why this matters — concrete and current
Modern databases such as SQLite and LevelDB use memory-mapped files to implement their write-ahead logs and B-tree pages. The engine obtains a single pointer to the entire database file; cache management, eviction, and write-back are performed automatically by the OS page cache, eliminating a separate buffer-pool layer.

High-performance web servers such as Nginx and the Linux kernel’s `io_uring` file-serving path memory-map static assets. A single `sendfile` or direct pointer dereference replaces multiple `read`/`write` round-trips, cutting context-switch overhead when serving millions of small files.

Shared-memory IPC in scientific computing workloads (e.g., MPI-based simulations at national labs) frequently maps the same large result file into multiple processes. Updates written by one rank become visible to others without explicit message passing, because the pages are physically shared.

Game engines (Unreal Engine 5’s virtual-texture streaming) memory-map gigabyte-sized texture atlases. Only the visible mip levels are faulted in; the engine never issues manual file reads, and the OS reclaims unused texture pages under memory pressure.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Virtual memory & page tables | The mapping is installed by inserting PTEs that point to file-backed frames instead of anonymous frames |
| Page-fault handling      | All I/O is triggered by faults; the handler must distinguish file-backed faults from other types |
| File descriptors & inode | The `mmap` call records the inode and offset so the page cache can locate the correct disk blocks |
| Memory protection bits   | Read-only vs. read-write mappings translate directly into PTE permission bits |

If any of these concepts are unclear, pause and review the corresponding sections on virtual memory before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — From file descriptor to virtual address range
A file descriptor represents an open file. When you call `mmap`, the kernel reserves a contiguous range of the process’s virtual address space and records that this range is backed by the file’s inode and a given byte offset.

Example: mapping the first 4096 bytes of `/data.bin` at virtual address `0x7f0000000000` creates a one-page mapping whose PTEs will eventually point to the first block of that file.

Formal statement:  
$$ \text{mmap}(fd, off, len, prot) \mapsto [v, v+len) \text{ where } \forall p \in [v, v+len),\; \text{PTE}(p) \text{ will contain } (inode, off + (p-v)) $$

> [!WARNING]
> Forgetting that the returned address is only a reservation (not yet populated) leads to believing data is already in RAM; the first access will fault.

### Step 2 — Demand paging from the file
The first load or store to any page in the mapped range causes a page fault. The fault handler reads the corresponding file block into a free physical frame and installs the mapping.

Formal statement: on fault at virtual page \(v_p\),  
$$ \text{read}(inode, file\_block(v_p), frame) ;\; \text{PTE}(v_p) \leftarrow (frame, R/W, present) $$

### Step 3 — Write-back and dirty bits
When a store occurs, the hardware sets the dirty bit in the PTE. On eviction or explicit `msync`, the kernel writes the frame back to the file offset recorded in the mapping.

### Step 4 — Sharing across processes
Two processes that map the same inode with `MAP_SHARED` receive PTEs pointing to the identical physical frames. Writes performed by one process become visible to the other without additional copies.

### Step 5 — Unmapping and coherence
`munmap` removes the PTEs. Any dirty pages are flushed before the mapping is destroyed, guaranteeing that the file on disk reflects the last writes.

## 5. Worked examples

**Example 1 — Minimal mapping**  
*Given:* file descriptor `fd` of a 4 KiB file, desired address `NULL`.  
*Find:* pointer to the mapped region.  
Call `p = mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_SHARED, fd, 0)`.  
Kernel allocates a virtual range starting at `p`, records the inode and offset 0.  
*Why:* `NULL` lets the kernel choose an unused address, avoiding collisions.  
**Final answer:** `p` is a valid pointer; first access will fault and populate the page.  
*Reflection:* The call itself performs no I/O; it only builds metadata.

**Example 2 — Reading via pointer**  
*Given:* the mapping from Example 1.  
*Find:* value of the first byte.  
`char c = *p;` triggers a page fault; handler reads block 0 of the file into frame `f`; PTE now maps `p` to `f`.  
*Why:* the load instruction itself becomes the read system call.  
**Final answer:** `c` contains the byte at file offset 0.  
*Reflection:* No explicit `read` call appears in source code.

**Example 3 — Writing and msync**  
*Given:* writable mapping of a 4 KiB page.  
*Find:* ensure change reaches disk.  
`*p = 0x42; msync(p, 4096, MS_SYNC);`  
Hardware sets dirty bit; `msync` walks the range, writes dirty frames back to the file, clears dirty bits.  
*Why:* without `msync` the write may stay only in RAM until the page is evicted.  
**Final answer:** file now contains `0x42` at offset 0.  
*Reflection:* `msync` is the explicit flush point for durability.

**Example 4 — Concurrent readers**  
*Given:* two processes mapping the same file with `MAP_SHARED`.  
*Find:* visibility of writes.  
Process A writes `*p = 0x55`; Process B later reads `*p`. Both share the same physical frame; B sees 0x55 immediately.  
*Why:* single frame means no cache-coherence traffic between processes.  
**Final answer:** inter-process communication occurs through ordinary memory operations.  
*Reflection:* demonstrates true sharing, not copy-on-write.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming `mmap` immediately reads the file | Students confuse reservation with population | Remember: only the first access faults |
| Forgetting `MAP_SHARED` vs `MAP_PRIVATE` | Default private mapping hides writes from other processes | Always specify `MAP_SHARED` when IPC or durability is required |
| Not handling `SIGBUS` on truncated files | Access beyond file size produces SIGBUS instead of page fault | Check file size before mapping or install a handler |
| Ignoring alignment requirements | `off` and `len` must be page-aligned on some systems | Use `sysconf(_SC_PAGESIZE)` and round values |
| Leaking mappings without `munmap` | Address space exhaustion over long-running processes | Pair every `mmap` with `munmap` or rely on process exit only for short programs |
| Expecting coherent writes without `msync` | Dirty pages may not reach disk before power loss | Call `msync` (or rely on `MAP_SYNC` on supported filesystems) for durability |

## 7. The textbook-precise statement
A memory-mapped file is created by the `mmap` system call, which takes an open file descriptor, an offset, and a length, and returns a virtual address range whose pages are backed by the file. Formally, for a file \(F\) with inode \(i\), `mmap(fd, off, len, MAP_SHARED)` installs a set of page-table entries such that virtual page \(v_p\) maps to the disk block \(b = \lfloor (off + (v_p - base))/P \rfloor\) of \(F\), where \(P\) is the page size. All subsequent references obey the same demand-paging and write-back rules as anonymous memory, except that the backing store is the file rather than swap. (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §13.5)

## 8. Visual — diagram or schematic
```
Process virtual address space
0x0000_0000_0000  +-----------------+
                  | other mappings  |
0x7f00_0000_0000  +-----------------+  <-- mmap returns this base
                  | file page 0     |  (PTE points to frame F0)
                  | file page 1     |  (PTE points to frame F1)
0x7f00_0000_2000  +-----------------+
                  | ...             |
Disk file /data.bin
Block 0  [4 KiB]  <--- mapped to F0
Block 1  [4 KiB]  <--- mapped to F1
```

## 9. The memory technique
1. **The hook** — imagine the file bytes are already sitting inside your process’s address space; you simply read and write them with `*ptr` instead of calling `read`/`write`.
2. **What to overlearn** — `mmap` returns a reservation, not populated memory; `MAP_SHARED` gives true sharing and durability; `msync` is required for explicit durability.
3. **Spaced-repetition schedule** — review the five-step sequence after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — if you forget the call sequence, start from “a page fault on a file-backed PTE must locate the inode and offset recorded at `mmap` time.”

## 10. What this unlocks
Memory-mapped files are the foundation for zero-copy I/O, fast IPC, and memory-mapped databases. The same mechanism directly enables:
- `sendfile` and `io_uring` optimizations in high-performance servers
- persistent data structures used by LMDB and modern key-value stores
- copy-on-write executable loading (`mmap` of ELF segments)
- NUMA-aware large-page mappings for scientific workloads

## 11. Self-check — five questions, no answers
1. What happens to the page-table entries when `munmap` is called on a dirty `MAP_SHARED` region?
2. A program maps a 1 GiB file on a machine with only 256 MiB RAM. How many page faults occur on the first sequential scan of the entire mapping?
3. Why does a write to a `MAP_PRIVATE` mapping never appear in the original file?
4. Construct a scenario in which a `SIGBUS` is delivered to a process that uses memory-mapped files.
5. Compare the number of TLB entries required for a 100 MiB memory-mapped file versus the same file accessed via repeated `pread` calls into a 4 KiB user buffer.