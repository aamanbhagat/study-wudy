## What it is
File allocation is the method by which an operating system's file system keeps track of which disk blocks belong to which file. It is the data structure applied to the physical disk to translate a logical file into a set of physical block addresses. The three canonical methods are contiguous, linked, and indexed allocation.

## Why it matters
This concept directly impacts system performance, especially for I/O-heavy applications. In aerospace, telemetry and flight data recorders generate massive, continuous streams of data where fast sequential writes are critical, favoring contiguous-like strategies. In physics simulations and machine learning, enormous datasets and model checkpoints must be read and written efficiently, and the choice of allocation method determines whether accessing a small part of a multi-terabyte file is fast (indexed) or catastrophically slow (linked).

## When to study it
You should understand the physical structure of a hard disk (sectors, tracks, blocks) and the concept of a logical block address (LBA). You also need a firm grasp of fundamental data structures: arrays, linked lists, and trees/hash tables. Without understanding the performance characteristics of these in-memory structures, their on-disk analogues will not make sense.

## How to study it (step by step)
1.  **Review Disk I/O:** Remind yourself why disk seeks are expensive. Find the typical seek time, rotational latency, and transfer rate for a modern HDD and SSD. This provides the physical motivation for minimizing seeks.
2.  **Model Contiguous Allocation:** On paper, draw a grid of 100 blocks. Try to allocate files of sizes 5, 10, 3, and 8 blocks. Now "delete" the 10-block and 3-block files. Observe the "holes" (external fragmentation) and try to allocate a new 9-block file.
3.  **Model Linked Allocation:** Using the same fragmented disk from step 2, allocate the 9-block file using a linked method. Draw arrows from block to block. Now, trace the path your disk's read/write head would have to take to read the entire file. Contrast this with the contiguous case.
4.  **Model Indexed Allocation:** Again, using the same disk, allocate the 9-block file by designating one block as an "index block" that contains pointers to the 9 data blocks. Compare the number of seeks needed for random access (e.g., reading the 7th block of the file) versus the linked allocation model.
5.  **Calculate Overhead:** For a file of $N$ blocks and a pointer size of $P$ bytes, calculate the total disk space overhead for linked and indexed allocation. How many bytes are wasted on pointers?
6.  **Analyze Trade-offs:** Create a 3x3 table with rows "Contiguous," "Linked," "Indexed" and columns "Sequential Read Speed," "Random Read Speed," and "Fragmentation Type." Fill it in with ratings like "Excellent," "Poor," "Internal," "External."

## Key ideas, with intuition
1.  **The Goal: Map Logical to Physical.** A file is a logical, contiguous sequence of bytes (e.g., `file[0]` to `file[N]`). A disk is a set of physical, numbered blocks that are not necessarily contiguous. The allocation method is the map $f: \text{logical_byte_offset} \rightarrow \text{physical_block_address}$.
2.  **Contiguous Allocation: An Array on Disk.** This method allocates a single, contiguous run of physical disk blocks for a file.
    *   **Intuition:** Booking a block of adjacent seats at a theater.
    *   **Pro:** Extremely fast for sequential reads. To read the whole file, you perform one seek to the first block and then read everything in one pass.
    *   **Con:** Suffers from *external fragmentation*. If you have free blocks of size 3 and 5, you cannot store a file of size 8. The free space is wasted. Growing files is also very difficult.
3.  **Linked Allocation: A Scavenger Hunt on Disk.** Each block contains a pointer to the next block in the file. The file's directory entry just points to the first block.
    *   **Intuition:** A scavenger hunt where each clue tells you where to find the next one.
    *   **Pro:** Solves external fragmentation completely. Any free block can be used. Files can grow easily.
    *   **Con:** Horrible for random access. To get to the $i$-th block, you must perform $i$ disk reads, following the chain from the beginning. $O(N)$ access time. Also, a corrupted pointer can lose the rest of the file.
4.  **Indexed Allocation (inode): An Index on Disk.** A special block, the "index block" (or inode in Unix-like systems), is allocated for each file. This block contains an array of pointers to all the data blocks of the file.
    *   **Intuition:** The table of contents in a book. It tells you exactly which page to turn to for any given chapter.
    *   **Pro:** Solves the random access problem of linked allocation. To get to the $i$-th block, you read the index block, get the $i$-th pointer, and seek directly to the data block. This is just two disk reads. It also avoids external fragmentation.
    *   **Con:** Wastes space if files are very small (an entire index block for a 1-byte file). For very large files, a single index block may not be big enough to hold all the pointers, requiring complex multi-level schemes (e.g., indirect pointers).

## Worked example
**Problem:** Store a 13KB file on a disk with a block size of 4KB. The directory entry for a file stores its starting block and length (for contiguous) or just its starting block (for linked/indexed). A pointer is 4 bytes. The disk's free blocks are: 3, 4, 8, 9, 10, 14, 15, 18.

**Analysis:**
*   File size: 13KB.
*   Block size: 4KB.
*   Number of blocks needed: $\lceil 13 \text{KB} / 4 \text{KB} \rceil = \lceil 3.25 \rceil = 4$ blocks.
*   The last block will have unused space. This is *internal fragmentation*: $4 \times 4\text{KB} - 13\text{KB} = 3\text{KB}$. This occurs in all three methods.

**Step 1: Contiguous Allocation**
*   We need 4 *contiguous* blocks.
*   Looking at the free blocks {3, 4, 8, 9, 10, 14, 15, 18}, we see the runs {3, 4} (length 2), {8, 9, 10} (length 3), {14, 15} (length 2), and {18} (length 1).
*   There is no contiguous run of 4 free blocks.
*   **Result:** Allocation fails due to external fragmentation.

**Step 2: Linked Allocation**
*   We need 4 blocks, but they can be anywhere. Let's pick the first four available: 3, 4, 8, 9.
*   The directory entry points to the first block: 3.
*   Block 3 stores the first 4KB of data and a pointer to the next block, 4.
*   Block 4 stores the next 4KB of data and a pointer to the next block, 8.
*   Block 8 stores the next 4KB of data and a pointer to the next block, 9.
*   Block 9 stores the final 1KB of data and a null pointer.
*   **Result:** Allocation succeeds. To read the entire file, the OS performs 4 seeks: 3 -> 4 -> 8 -> 9.

**Step 3: Indexed Allocation**
*   We need 4 data blocks and 1 index block, for a total of 5 blocks. Let's pick 3, 4, 8, 9, 10.
*   Let's use block 3 as the index block. The directory entry points to it.
*   The other 4 blocks (4, 8, 9, 10) are data blocks.
*   The contents of index block 3 would be an array of pointers: `[4, 8, 9, 10]`.
*   **Result:** Allocation succeeds. To read the 3rd block of the file (bytes 8192-12287), the OS performs two I/Os:
    1.  Read the index block (block 3).
    2.  From the index, find the 3rd entry, which is the pointer to block 9.
    3.  Read the data block (block 9).
*   This is much faster for random access than the linked method, which would have required reading blocks 3 and 4 just to find the location of block 8.

## Diagrams
```text
CONTIGUOUS ALLOCATION
Disk: [F1][F1][F1][Free][F2][F2][Free][Free][Free][F3]...
File F1 occupies a single run of blocks. Fast, but creates holes (fragmentation).

LINKED ALLOCATION
Dir Entry for F1 -> [Block 7]
Disk:
... [Block 7: data | ptr_to_12] ... [Block 12: data | ptr_to_2] ... [Block 2: data | NULL] ...
Blocks are scattered. Each block points to the next. Slow for random access.

INDEXED ALLOCATION (INODE)
Dir Entry for F1 -> [Inode Block 9]
Disk:
... [Block 9: ptr_to_2 | ptr_to_15 | ptr_to_4] ...
       |           |           |
       V           V           V
... [Block 2: data] ... [Block 4: data] ... [Block 15: data] ...
An index block acts as a map to the file's data blocks. Good compromise.
```

## Memory technique — remember this forever
1.  **The Story: Planning a Group Trip**
    *   **Contiguous:** You book a block of 10 adjacent rooms in a hotel. Everyone is together, easy to find (fast sequential access). But if the hotel only has scattered single rooms, you're out of luck (external fragmentation).
    *   **Linked:** You book 10 random rooms. You leave a note in the first room telling you where the second is, a note in the second for the third, and so on. It works, but to find the 8th person, you have to go through rooms 1-7 first (slow random access).
    *   **Indexed (inode):** You book 10 random rooms. You leave a list of all 10 room numbers at the front desk. To find anyone, you just check the list (fast random access). The list itself takes up a bit of space (overhead).

2.  **Must Overlearn:**
    *   **Contiguous:** Fast sequential access, external fragmentation.
    *   **Linked:** No external fragmentation, slow random access ($O(N)$ seeks).
    *   **Indexed:** Fast random access ($O(1)$ seeks, typically 2), overhead for index block.

3.  **Spaced Repetition Schedule:**
    *   Review this material tomorrow.
    *   Then in 3 days.
    *   Then in 7 days.
    *   Then in 16 days.
    *   Then in 35 days.

4.  **First Principles Pathway:**
    If you forget the details, remember that these are just on-disk implementations of core data structures.
    *   Contiguous -> Array
    *   Linked -> Linked List
    *   Indexed -> An array of pointers (an indirection table)
    All the performance characteristics (access time, insertion/deletion difficulty, overhead) derive directly from the properties of these fundamental structures.

## Common mistakes
*   **Confusing Fragmentation Types:** *External* fragmentation is when you have enough total free space for a file, but it's not in one continuous block (Contiguous). *Internal* fragmentation is wasted space *inside* an allocated block because the file size isn't a perfect multiple of the block size (affects all methods).
*   **Ignoring Pointer Overhead:** In linked allocation, the space for the pointer in each block cannot be used for file data. This slightly reduces storage efficiency.
*   **Underestimating Seek Latency:** Thinking "just a few extra reads" is okay for linked allocation. On a spinning disk, each seek can take milliseconds. For a 10,000-block file, accessing the last block via linked allocation could take seconds, versus microseconds for indexed.
*   **Thinking inodes are simple:** Real-world inodes (like in `ext4`) are a hybrid. They use indexed allocation but have a more complex structure with direct, single-indirect, double-indirect, and even triple-indirect pointers to efficiently handle files from a few bytes to many terabytes.

## Self-check
1.  A disk uses contiguous allocation. It has free space chunks of sizes 4 blocks, 8 blocks, and 10 blocks. A sequence of file creation requests arrives for sizes 9 blocks, 5 blocks, and 6 blocks. Which requests will succeed and which will fail? What is the state of the disk's free space after the sequence?
2.  Consider a file system with a 4KB block size and 4-byte block pointers. For a 1MB file, calculate the total number of disk blocks required for storage (including all overhead) under (a) simple linked allocation and (b) simple indexed allocation (where one index block can hold 1024 pointers).
3.  Why is pure linked allocation almost never used for modern disk file systems, but a variation of it (the File Allocation Table, or FAT) was historically very popular for simpler devices like flash drives? What specific property of the FAT system mitigates the primary drawback of a pure linked list on disk?