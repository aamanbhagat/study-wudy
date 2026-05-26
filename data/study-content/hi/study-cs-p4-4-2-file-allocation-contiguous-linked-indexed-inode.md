## 1. The one-sentence answer
**File allocation decides exactly how the blocks of a file are placed on disk so that the operating system can later read or write them efficiently.**

Contiguous allocation places every block of a file in consecutive sectors; this gives fast sequential access but creates external fragmentation when files are created or deleted. Linked allocation removes the need for contiguous space by chaining blocks through pointers stored inside each block, yet random access becomes expensive because every preceding block must be traversed. Indexed allocation stores all block pointers inside a separate index structure (the inode in Unix systems) so that both sequential and random access become direct while still allowing files to grow without contiguous reservation.

> [!NOTE]
> The deepest insight is that every allocation scheme trades off three quantities at once: sequential speed, random-access cost, and external fragmentation; no single scheme wins on all three simultaneously.

## 2. Why this matters — concrete and current
In the Linux ext4 file system used by Android phones and most cloud servers, inodes hold 12 direct pointers plus single, double and triple indirect blocks; this design lets a 4 KiB inode address files up to 16 TiB while keeping the inode itself inside the inode table that fits in a few disk cylinders.

AWS EBS volumes and Google Cloud Persistent Disks implement contiguous allocation inside their underlying block store so that a single 1 MiB I/O request issued by a database can be satisfied with one disk seek, directly affecting the latency of services such as DynamoDB.

NASA’s Perseverance rover stores camera images using a FAT-like linked allocation on its flash memory because the file system must survive sudden power loss; the linked list allows a partially written file to be recovered without requiring a large contiguous free region that may not exist after repeated writes.

Modern NVMe SSD firmware inside Samsung 990 PRO drives uses an in-memory extent tree (a form of indexed allocation) to map logical block addresses to physical NAND pages; this mapping must be rebuilt after power loss, which is why the drive contains a small capacitor to flush the mapping table.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Disk block / sector | Every allocation method ultimately hands out fixed-size blocks; you must know that a block is the smallest unit the disk controller can read or write atomically. |
| Pointer / address | Linked and indexed schemes store addresses of other blocks; you must understand that an address occupies space (typically 4 or 8 bytes) and therefore reduces usable payload inside each block. |
| External vs internal fragmentation | Contiguous allocation suffers external fragmentation; you must be able to quantify wasted space between allocated regions. |

If any of the three rows above feels unfamiliar, pause and review the corresponding section on disk hardware and memory management before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — The storage problem
A file is simply a sequence of bytes that must survive after the program terminates; the operating system therefore records which disk blocks hold those bytes.  
Example: a 12 KiB file on a device whose block size is 4 KiB needs three blocks; the OS must remember the identities of those three blocks.  
Formal statement: let \( B \) be the block size and \( F \) the file size in bytes; the number of blocks required is \( \lceil F/B \rceil \).

> [!WARNING]
> Treating a file as an unbounded byte stream without acknowledging the block granularity will later produce off-by-one errors when calculating the last block’s payload.

### Step 2 — Contiguous allocation
All required blocks are placed in consecutive disk addresses so that the starting block number and the length completely describe the file.  
Example: blocks 47, 48, 49 for the 12 KiB file above.  
Formal statement: file descriptor stores pair \( (start, length) \); address of logical block \( i \) is \( start + i \).

> [!WARNING]
> If a later file insertion or extension cannot find a large enough free run, external fragmentation appears even though total free space may exceed the request.

### Step 3 — Linked allocation
Each block stores the address of the next block inside its last few bytes; the file descriptor stores only the address of the first block.  
Example: block 47 ends with pointer 102, block 102 ends with pointer 55, block 55 ends with null.  
Formal statement: logical block \( i+1 \) is obtained by reading the pointer field of logical block \( i \).

> [!WARNING]
> A single corrupted pointer anywhere in the chain renders all subsequent blocks unreachable; there is no redundancy.

### Step 4 — Indexed allocation
All pointers are collected into a separate index block (or tree of index blocks) whose address is stored in the file descriptor.  
Example: an inode contains 12 direct pointers plus one single-indirect pointer; the single-indirect block itself holds 1024 pointers on a 4 KiB block with 4-byte addresses.  
Formal statement: address of logical block \( i \) is read from offset \( i \) inside the index structure.

> [!WARNING]
> The index block itself consumes disk space; for very small files the overhead of an entire index block can exceed the file size.

### Step 5 — Inode as persistent index
Unix stores the index inside a fixed-size inode structure that also records permissions, timestamps and link count; the inode number becomes the file’s permanent identifier inside the directory entry.  
Formal statement: inode \( I \) contains array \( ptr[0..N] \) and indirect pointers; the on-disk location of data block \( i \) is obtained by following at most three levels of indirection.

> [!WARNING]
> Because the inode is cached in memory, a crash that loses the dirty inode but not the data blocks produces a file whose size field no longer matches the actual allocated blocks.

### Step 6 — Trade-off formalised
Let \( S \) be sequential access cost, \( R \) random access cost, \( E \) external fragmentation. Contiguous allocation minimises \( S \) and \( R \) but maximises \( E \); linked allocation minimises \( E \) but maximises \( R \); indexed allocation keeps both \( S \) and \( R \) low while keeping \( E \) moderate at the price of index-block overhead.

## 5. Worked examples — har step show karo

**Example 1 — Contiguous allocation size calculation**  
*Given:* block size \( B = 4 \) KiB, file size \( F = 10 \) KiB.  
*Find:* number of blocks and external fragmentation if the file is placed at block 100.  
Step 1: compute blocks needed \( \lceil 10/4 \rceil = 3 \).  
Step 2: the last block stores only \( 10 - 2 \times 4 = 2 \) KiB of data.  
*Why* the subtraction isolates internal waste inside the final block.  
Final answer: **3 blocks allocated, 2 KiB internal fragmentation**.  
*Reflection:* the example shows that even contiguous allocation still wastes space inside the last block; internal fragmentation is inevitable once block size exceeds file remainder.

**Example 2 — Linked allocation pointer overhead**  
*Given:* 4 KiB blocks, 4-byte pointers, file occupies 5 blocks.  
*Find:* total bytes lost to pointers.  
Step 1: each of the first four blocks stores one pointer, using 4 bytes.  
Step 2: total overhead \( 4 \times 4 = 16 \) bytes.  
*Why* only the first four blocks carry pointers—the last block’s pointer field is null.  
Final answer: **16 bytes of pointer overhead**.  
*Reflection:* on a 4 KiB block the overhead is negligible, yet the same ratio becomes painful for tiny files or when pointer size grows to 8 bytes on 64-bit systems.

**Example 3 — Single-indirect indexed access**  
*Given:* inode with 12 direct pointers and one single-indirect pointer; block size 4 KiB, pointer size 4 bytes.  
*Find:* maximum file size addressable with only direct and single-indirect pointers.  
Step 1: direct blocks = \( 12 \times 4 \) KiB = 48 KiB.  
Step 2: single-indirect block holds \( 4096/4 = 1024 \) pointers.  
Step 3: total = \( 48 + 1024 \times 4 = 4144 \) KiB.  
*Why* the division \( 4096/4 \) gives the number of pointers that fit inside one index block.  
Final answer: **4144 KiB**.  
*Reflection:* adding the single-indirect level suddenly increases addressable size by more than an order of magnitude, illustrating why indirect pointers exist.

**Example 4 — Double-indirect extension**  
*Given:* same inode parameters plus one double-indirect pointer.  
*Find:* additional blocks reachable via double indirection.  
Step 1: double-indirect block points to 1024 single-indirect blocks.  
Step 2: each of those holds 1024 data pointers.  
Step 3: additional size = \( 1024 \times 1024 \times 4 \) KiB = 4 GiB.  
*Why* the multiplication counts the two levels of indirection.  
Final answer: **additional 4 GiB reachable**.  
*Reflection:* the exponential growth shows why triple indirection is still used in ext4 even though most files never need it.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming contiguous allocation never wastes space | Students forget the last-block internal fragmentation | Always compute \( F \bmod B \) for every file size |
| Treating linked-list traversal as O(1) random access | The mental model of arrays is transferred to disks | Count the number of disk reads required to reach block \( i \) |
| Forgetting that an inode itself occupies a disk block | The inode table is often cached, hiding its on-disk cost | Include the inode block when calculating total metadata overhead |
| Ignoring pointer size growth on 64-bit systems | Code examples still use 4-byte integers | Replace every occurrence of 1024 with \( B/8 \) when pointer size is 8 bytes |
| Believing indexed allocation removes all fragmentation | Index blocks themselves can become fragmented | Remember that the inode table is pre-allocated in fixed locations |
| Overlooking that linked allocation destroys spatial locality | Successive logical blocks may lie on distant cylinders | Measure seek distance when benchmarking linked schemes |

## 7. The textbook-precise statement
In Silberschatz, Galvin and Gagne, *Operating System Concepts*, 10th edition, §13.4–13.5, contiguous allocation is defined by storing the disk addresses of the first and last blocks of each file; linked allocation stores the address of the next block in the last bytes of the current block; indexed allocation stores an array of block pointers inside an index node (inode). The inode in Unix contains 15 pointers: 12 direct, one single-indirect, one double-indirect and one triple-indirect. All hypotheses are stated: block size is fixed, pointers occupy a constant number of bytes, and the inode table resides at a known location on disk.

## 8. Visual — diagram or schematic
```
Disk layout (block numbers increase left to right)

Contiguous file F1: [ 47 | 48 | 49 ]          (three consecutive blocks)
Linked file F2:   [ 47 → 102 → 55 ]          (pointers inside blocks)
Indexed (inode):  inode#7
                    ├── direct: 47,48,49
                    └── single-indirect: 200
                         └── 200: [102,103,...]
```

## 9. The memory technique
1. **The hook** — picture a bookshelf: contiguous is one long shelf with books placed side-by-side; linked is books each pointing to the next with a sticky note on the last page; indexed is a catalogue card that lists every shelf location of the book’s pages.
2. **What to overlearn** — inode pointer counts (12 direct + single + double + triple) and the formula for maximum file size \( 12B + (B/4)B + (B/4)^2 B + (B/4)^3 B \).
3. **Spaced-repetition schedule** — review the three allocation diagrams after 1 day, redraw the inode pointer calculation after 3 days, solve one fragmentation example after 7 days, implement a tiny simulator after 16 days, and re-derive the maximum file size after 35 days.
4. **First-principles fallback** — start from the definition of a block address, ask “where is the next address stored?”, and the answer immediately classifies the scheme as contiguous, linked or indexed.

## 10. What this unlocks
Mastery of these three schemes lets you understand how modern file systems such as ext4, XFS and NTFS combine extents (contiguous runs) with B-tree indexed allocation to achieve both high throughput and fast random access. The same concepts reappear in database storage engines (InnoDB extents) and in flash translation layers inside SSDs.

- Next topic: directory implementation and path-name lookup
- Subsequent topic: journaling and crash recovery (which must preserve allocation metadata)
- Technique unlocked: extent-based allocation used in production file systems

## 11. Self-check — five questions, no answers
1. A 7 KiB file is stored with 4 KiB blocks under contiguous allocation; how many blocks are allocated and how much internal fragmentation exists?
2. In a linked allocation scheme with 4-byte pointers and 4 KiB blocks, what fraction of each block is lost to the pointer for files larger than one block?
3. An inode has 12 direct pointers and one single-indirect pointer; block size is 8 KiB and pointers are 8 bytes. What is the largest file size reachable without using double indirection?
4. Why does a sudden power failure after writing a data block but before writing its inode produce a file whose reported size is larger than the number of reachable data blocks?
5. Which allocation method suffers the worst random-access latency for a 100-block file, and by what factor compared with indexed allocation?