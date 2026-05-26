## 1. The one-sentence answer
**File allocation maps the logical blocks of a file onto physical disk blocks using one of three classic schemes: contiguous, linked, or indexed (via inodes).**

Contiguous allocation places every block of a file in adjacent sectors. This yields the lowest seek time for sequential reads because the disk head never jumps. Linked allocation stores each block together with a pointer to the next block, allowing the file to grow or shrink anywhere on the disk without moving existing data. Indexed allocation keeps an array of direct and indirect pointers inside a small metadata structure called an inode, giving constant-time access to any block while still avoiding external fragmentation.

The three schemes trade off access speed, storage overhead, and the ability to grow files dynamically. Modern file systems almost always adopt a refined form of indexed allocation because it balances the other two constraints for both small and large files.

> [!NOTE]
> The decisive insight is that the inode itself is just another file; its pointers are ordinary disk-block numbers, so the entire mapping can be cached in RAM and traversed with a handful of disk reads regardless of file size.

## 2. Why this matters — concrete and current
In the Linux ext4 file system used by billions of Android devices and cloud servers, every file is represented by an inode whose 15 pointers (12 direct, one single-indirect, one double-indirect, one triple-indirect) let a 1 MiB file be read with at most one extra disk access while still supporting files larger than 16 TiB.

NASA’s Mars 2020 Perseverance rover stores science imagery and telemetry on an ext4-formatted solid-state drive; the indexed inode layout guarantees that a 2 MiB camera frame can be located with a known, bounded number of flash-page reads even after months of power cycling and radiation-induced bit flips.

Google’s Colossus distributed file system, successor to GFS, uses a variant of indexed allocation in which chunk handles are stored in a B-tree of inodes; this design allows MapReduce jobs to open millions of 64 MiB intermediate files without suffering the external fragmentation that would cripple a contiguous allocator on a 10 PB cluster.

Semiconductor fabs run real-time process-control software on QNX; the microkernel’s indexed file allocator keeps log files contiguous within each 4 KiB extent while still permitting dynamic growth, satisfying the hard real-time latency bounds required for wafer-stepper synchronization.

## 3. Mental prerequisites
| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Disk block / sector        | All three schemes ultimately map file offsets to fixed-size physical blocks. |
| Pointer / address          | Linked and indexed schemes store block numbers as data; you must treat them as ordinary integers. |
| External vs internal fragmentation | Contiguous allocation creates external fragmentation; understanding the distinction is required to evaluate each method. |
| Metadata vs data blocks    | Inodes are metadata; separating them from file data is the key engineering decision behind indexed allocation. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Represent the disk as an array of fixed-size blocks
A disk is an array of blocks numbered 0 … N−1, each of size B bytes.  
Concrete example: B = 4 KiB, N = 1 000 000.  
Formally the disk is the set  
$$D = \{0,1,\dots,N-1\}.$$  
> [!WARNING] Treating blocks as variable-sized immediately destroys all three allocation schemes; every pointer arithmetic and every extent calculation collapses.

### Step 2 — Map a file’s logical blocks to physical blocks
A file of size S occupies L = ⌈S/B⌉ logical blocks numbered 0 … L−1. Allocation is a function  
$$a : \{0,\dots,L-1\} \to D$$  
that must be stored persistently.

### Step 3 — Contiguous allocation
Require a(i) = a(0) + i for all i.  
The entire file occupies the interval [start, start+L−1].  
> [!WARNING] If a later file is deleted, the freed interval cannot be reused by a larger file without copying; external fragmentation appears.

### Step 4 — Linked allocation
Store inside block a(i) the value a(i+1). The last block holds a sentinel (usually −1).  
Random access now costs O(L) pointer chasing.

### Step 5 — Indexed allocation via inode
An inode is a fixed-size record containing an array of pointers P[0…K−1] plus indirect blocks.  
The mapping becomes  
$$a(i) = \begin{cases} P[i] & 0\le i <K\\ \text{lookup via indirect blocks} & \text{otherwise}\end{cases}.$$  
This yields O(1) or O(log L) access while eliminating external fragmentation.

### Step 6 — Textbook statement
Any file system that stores, for each file, a data structure mapping logical block numbers to physical block numbers realises one of the three classic allocation policies; the inode-based indexed policy dominates because its pointer array can be cached and its indirect blocks grow only logarithmically with file length (Silberschatz et al., *Operating System Concepts*, 10e, §14.4).

## 5. Worked examples — every step shown

**Example 1 — Contiguous allocation, minimal file**  
*Given:* Disk blocks 0–7, B = 1 KiB. File “f” needs 3 blocks, placed at block 2.  
*Find:* Physical addresses of logical blocks 0, 1, 2.  
Step 1: a(0) = 2. *Why* base address given.  
Step 2: a(1) = 2+1 = 3. *Why* contiguous definition.  
Step 3: a(2) = 2+2 = 4. *Why* arithmetic progression.  
**2 3 4**

*Reflection:* The arithmetic is trivial; the hidden cost is later insertion of another file that needs four contiguous blocks.

**Example 2 — Linked allocation, same file**  
*Given:* Same disk. File placed at blocks 2→5→7.  
*Find:* Address of logical block 2.  
Step 1: Read block 2, obtain pointer 5. *Why* follow first link.  
Step 2: Read block 5, obtain pointer 7. *Why* follow second link.  
Step 3: Block 7 is logical block 2. *Why* two hops for three blocks.  
**7**

*Reflection:* Random access cost equals file length; sequential access cost equals one seek per block.

**Example 3 — Indexed allocation, single indirect**  
*Given:* Inode holds 12 direct pointers and one indirect pointer. Indirect block holds 1024 block numbers (B = 4 KiB, 4-byte pointers). File needs block 5000.  
*Find:* Number of disk reads to obtain a(5000).  
Step 1: Read inode (cached). *Why* metadata in memory.  
Step 2: Read indirect block at P[12]. *Why* single level of indirection.  
Step 3: Index 5000−12 inside the 1024-entry table. *Why* arithmetic offset.  
**2 disk reads**

*Reflection:* The log-depth growth of indirect blocks keeps the worst-case read count small even for terabyte files.

**Example 4 — External fragmentation cost**  
*Given:* 100 blocks total. After contiguous allocations and deletions, 60 free blocks remain but largest run is 7 blocks. New 10-block file arrives.  
*Find:* Must the file be rejected under contiguous allocation?  
Step 1: Largest contiguous interval = 7 < 10. *Why* definition of external fragmentation.  
Step 2: Linked or indexed schemes accept the file by scattering blocks. *Why* they ignore contiguity.  
**File rejected under contiguous policy**

*Reflection:* The numeric gap between total free space and largest run quantifies external fragmentation.

## 6. Common traps and how to avoid them
| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming contiguous allocation never wastes space | Ignores external fragmentation after deletions | Track the size of the largest free extent, not total free blocks |
| Believing linked allocation gives O(1) random access | Each pointer chase is a disk read | Cache the entire chain only for files smaller than a few dozen blocks |
| Treating inode size as unlimited | Inode is a fixed 128- or 256-byte record | Remember that triple indirection is required once the direct and double-indirect tables are exhausted |
| Forgetting that the inode itself occupies a block | Metadata blocks are allocated from the same pool | Account for inode table blocks when computing usable capacity |
| Confusing internal and external fragmentation | Internal occurs inside the last block; external between files | Measure both: internal = B−(S mod B), external = max free run |
| Overlooking pointer size on large disks | 32-bit block numbers limit volume to 2^32·B | Use 64-bit pointers or extent-based inodes on >16 TiB volumes |
| Caching only direct pointers | Indirect blocks are also needed for large files | Cache the entire inode plus the first indirect block |

## 7. The textbook-precise statement
Let F be a file of length S bytes stored on a device whose block size is B bytes. Let L = ⌈S/B⌉. An allocation function a:{0…L−1}→{0…N−1} is  
- contiguous if a(i)=a(0)+i,  
- linked if block a(i) contains the integer a(i+1) (sentinel −1 at end),  
- indexed if an inode record I_F stores an array of pointers together with a tree of indirect blocks whose leaves are exactly the values a(0)…a(L−1).  

Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §14.4.

## 8. Visual — diagram or schematic
```text
Disk blocks (B=4 KiB)

Contiguous          Linked                Indexed (inode)
+---+             +---+                 Inode
| 0 | file A      | 0 |→5               [P0=2, P1=7, P2=3, …, P12=9]
+---+             +---+                 Indirect blk 9: [10,11,12,…]
| 1 | file A      | 1 |                 +---+
+---+             +---+                 | 2 | file A blk0
| 2 | file A      | 2 |→4               +---+
+---+             +---+                 | 3 | file A blk2
| 3 | free        | 3 |                 +---+
+---+             +---+                 | 7 | file A blk1
| 4 |             | 4 |→end             +---+
+---+             +---+                 Indirect blk at P12
| 5 |             | 5 |                 points to further blocks
+---+             +---+
```

## 9. The memory technique
1. **The hook** — Picture three trains: the first must sit in one long carriage (contiguous), the second is a chain of carriages each holding the number of the next (linked), the third carries a timetable (inode) listing every carriage number.
2. **What to overlearn** — L = ⌈S/B⌉; inode direct pointers usually 12; single-indirect fan-out = B/4 (32-bit) or B/8 (64-bit).
3. **Spaced-repetition schedule** — Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive access cost: contiguous = 1 seek, linked = L seeks worst-case, indexed = 1 + depth of indirect tree.

## 10. What this unlocks
Mastery of these three policies lets you evaluate any modern file system’s extent trees, copy-on-write B-trees, or log-structured segment cleaners.  

- Next: extent-based allocation and delayed allocation (ext4, XFS)  
- Next: log-structured file systems (LFS, NILFS2)  
- Next: flash translation layers that emulate indexed allocation over raw NAND  
- Next: distributed inode tables in Ceph and Lustre  

## 11. Self-check — five questions, no answers
1. A 1 MiB file is created on a freshly formatted contiguous allocator with 4 KiB blocks. After the file is deleted, a 2 MiB file arrives. How many blocks must be copied to satisfy the request?  
2. Under linked allocation, a file spans 250 blocks. How many disk reads are required in the worst case to reach logical block 249?  
3. An inode has 12 direct pointers and one single-indirect pointer. Each indirect block holds 1024 entries. What is the largest file size addressable before double indirection is required (B = 4 KiB)?  
4. Why does external fragmentation disappear when switching from contiguous to indexed allocation, yet internal fragmentation remains?  
5. A workload consists of millions of 3 KiB files on a 4 KiB-block file system. Which allocation scheme wastes the largest fraction of disk space, and why?