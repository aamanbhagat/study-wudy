## What it is
Memory-mapped files are a mechanism where a file on disk is mapped directly into a process's virtual address space. Instead of using `read` and `write` system calls, the program can access the file's contents as if it were an array in memory. The operating system handles the loading of file data into physical memory on-demand (via paging) and writing modifications back to the disk.

## Why it matters
This technique is critical for high-performance applications that handle large data sets. In aerospace and physics, you'll use it to analyze massive simulation outputs or satellite imagery without loading the entire terabyte-scale file into RAM. In machine learning, it's used for efficiently loading large model weights or memory-strafing datasets that don't fit in physical memory.

## When to study it
You must have a solid understanding of these prerequisites before tackling this topic. If you are not confident in them, review them first.
1.  **Virtual Memory:** The concept of a per-process virtual address space, and its mapping to physical memory.
2.  **Paging:** How virtual memory is implemented using pages, frames, page tables, and the Memory Management Unit (MMU). You must understand what a page fault is.
3.  **File Systems:** The basics of file I/O, including file descriptors, and system calls like `open()`, `read()`, `write()`, and `lseek()`.
4.  **Kernel vs. User Space:** The distinction between these two memory regions and the cost of context switching and data copying between them.

## How to study it (step by step)
1.  **Contrast with Standard I/O:** Draw the data path for a standard `read()` call. Note the two copies: (1) from disk to a kernel-space buffer (the page cache), and (2) from the kernel-space buffer to your user-space buffer. This double-copy is a key performance bottleneck.
2.  **Read the `mmap` man page:** Open a terminal and type `man 2 mmap`. Don't try to memorize it. Instead, identify the purpose of the key arguments: `fd` (which file?), `length` and `offset` (what part of the file?), and `prot` (read/write/execute permissions?).
3.  **Map the concept to virtual memory:** Think about a process's virtual address space map (text, data, heap, stack). `mmap` asks the kernel to reserve a new region in this virtual map. The kernel sets up the page table entries for this new region to point not to physical RAM or the swap file, but to the file on disk.
4.  **Write a small program:** Use C, Python (`mmap` module), or another low-level language. Create a file, write "apple" to it. Then, `mmap` the file, get a pointer to the mapped region, and change the first character to 'b' by writing to the pointer (`ptr[0] = 'b'`). Close the mapping. Open the file normally and verify its content is now "bpple". This proves the memory write was persisted to disk.
5.  **Trace a Page Fault:** Walk through what happens when your program first accesses an address in the mapped region.
    *   CPU tries to access virtual address `V`.
    *   MMU finds no valid mapping in the page table -> Page Fault.
    *   Trap to the kernel.
    *   Kernel's fault handler checks its internal structures and sees `V` belongs to a region mapped to file `F` at offset `O`.
    *   Kernel issues a read from disk for the corresponding page of `F`.
    *   Kernel loads the data into a physical frame `P`.
    *   Kernel updates the page table: `V` now maps to `P`.
    *   Return from trap. The instruction is re-executed and now succeeds.

## Key ideas, with intuition
1.  **The File is the Backing Store:** Normally, when the OS needs to page out a piece of memory, it writes it to a special disk area called the swap file. For a memory-mapped file, the file itself *is* the backing store. When a "dirty" (modified) page in the mapped region needs to be paged out, the OS writes it back to the correct location in the original file. This is how changes get saved.

2.  **Lazy Loading via Demand Paging:** Mapping a 100 GB file does not use 100 GB of RAM. The `mmap` call is cheap; it only manipulates page tables in the kernel to set up the virtual address mapping. Physical RAM is only consumed when you actually *touch* a page by reading from or writing to a memory address within it, which triggers a page fault that pulls that specific page from disk.

3.  **Unified Buffer Cache:** Modern operating systems are smart. The kernel buffer used for standard `read()`/`write()` I/O (often called the page cache) is the *same* physical memory used to back memory-mapped regions. By using `mmap`, you are essentially getting direct user-space access to the kernel's page cache, eliminating the `kernel -> user` copy. This is the source of the performance gain.
    $$ \text{Standard I/O Cost} = \text{Syscall Overhead} + \text{Disk} \to \text{Kernel Copy} + \text{Kernel} \to \text{User Copy} $$
    $$ \text{Memory-Mapped I/O Cost} = \text{Page Fault Overhead} + \text{Disk} \to \text{Kernel Copy} $$

## Worked example
Here is a simple C example that modifies a file in place.

```c
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>

int main() {
    const char *filepath = "example.txt";
    const char *text = "Hello, World!";
    int fd;
    struct stat file_info;
    char *mapped_region;

    // Step 1: Create and write to a file using standard I/O.
    fd = open(filepath, O_RDWR | O_CREAT | O_TRUNC, (mode_t)0600);
    if (fd == -1) { perror("open"); exit(EXIT_FAILURE); }
    write(fd, text, strlen(text));
    close(fd);

    // Step 2: Re-open the file and get its size.
    fd = open(filepath, O_RDWR);
    if (fd == -1) { perror("open"); exit(EXIT_FAILURE); }
    if (fstat(fd, &file_info) == -1) { perror("fstat"); exit(EXIT_FAILURE); }
    off_t file_size = file_info.st_size;

    // Step 3: Map the file into memory.
    // We map the entire file (file_size) with read and write permissions.
    mapped_region = mmap(NULL, file_size, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
    if (mapped_region == MAP_FAILED) { perror("mmap"); exit(EXIT_FAILURE); }
    close(fd); // The file descriptor can be closed after mmap completes.

    // Step 4: Modify the file content via the memory pointer.
    printf("Original content via map: %.*s\n", (int)file_size, mapped_region);
    mapped_region[0] = 'J'; // Change 'H' to 'J'
    printf("Modified content via map: %.*s\n", (int)file_size, mapped_region);

    // Step 5: Force changes to be written to disk.
    if (msync(mapped_region, file_size, MS_SYNC) == -1) { perror("msync"); }

    // Step 6: Unmap the memory region.
    if (munmap(mapped_region, file_size) == -1) { perror("munmap"); }

    printf("File modification complete.\n");
    return 0;
}
```

**Reflection:**
-   **Step 1 & 2** are standard file setup. We need a file on disk to serve as the backing store.
-   **Step 3 (`mmap`)** is the core action. It tells the kernel: "Take the file represented by `fd`, and make its contents available in my virtual address space." The kernel returns a regular `char*` pointer.
-   **Step 4 (`mapped_region[0] = 'J'`)** is where the magic happens. This looks like a simple array write, but it's not. It's a memory access that may trigger a page fault, causing the OS to load the file's first page into RAM, and then modifies that RAM. The page is now "dirty".
-   **Step 5 (`msync`)** tells the kernel: "Find any dirty pages in this mapped region and write them back to the underlying file on disk *now*." Without this, the OS would write it back later at its own convenience.
-   **Step 6 (`munmap`)** cleans up, removing the mapping from our process's address space.

## Diagrams

**Diagram 1: Standard `read()` I/O**
```text
+-----------------+      Syscall       +-----------------+      DMA        +------+
|   User Space    |       (copy)       |  Kernel Space   |     (copy)      | Disk |
| +-------------+ | <----------------- | +-------------+ | <------------- | File |
| | User Buffer | |                    | | Page Cache  | |                |      |
| +-------------+ |                    | +-------------+ |                |      |
+-----------------+                    +-----------------+                +------+
```

**Diagram 2: Memory-Mapped I/O**
```text
+------------------------------------+                    +-----------------+      DMA        +------+
|             User Space             |                    |  Kernel Space   |   (on fault)    | Disk |
|                                    |                    |                 |                 |      |
| +--------------------------------+ |                    | +-------------+ | <------------- | File |
| | Process Virtual Address Space  | |                    | | Page Cache  | |                |      |
| | ...                            | | (maps to)          | +-------------+ |                |      |
| | +----------------------------+ | -------------------> |      ^        |                |      |
| | |   Mapped Region for File   | |                      |      |        |                |      |
| | +----------------------------+ | <------------------- | (direct access)|                |      |
| | ...                            | |                      +-----------------+                +------+
+------------------------------------+
```

## Memory technique — remember this forever
1.  **Visual Hook:** Imagine your computer's memory (RAM) is a small, expensive workbench. The disk is a massive, cheap warehouse next door. Standard I/O is like sending a runner to the warehouse to fetch an item (copy 1) and bring it to a receiving dock (kernel buffer), then you walk to the dock and carry it to your workbench (copy 2). Memory mapping is like the warehouse owner giving you a catalog and a magic button. You point to an item in the catalog (access a virtual address), and *poof*, it appears on your workbench (page fault and load). You work on it directly on the workbench.
2.  **Must Overlearn:**
    *   `void *mmap(addr, length, prot, flags, fd, offset);` The function signature embodies the entire concept.
    *   Key benefit: **Eliminates the kernel-to-user-space data copy.**
    *   Mechanism: **Uses the file as the backing store for demand paging.**
3.  **Spaced Repetition Schedule:** Review these key ideas and the diagrams at: 1 day, 3 days, 7 days, 16 days, 35 days. Spend 5 minutes each time re-deriving the data flow.
4.  **First Principles Pathway:** If you forget everything, rebuild it from this:
    *   What is virtual memory? A map from virtual addresses to physical ones.
    *   What happens on a page fault? The OS gets control to load data into a physical frame and update the map.
    *   Where does the OS get the data? Usually the swap file.
    *   What if... we told the OS to use a regular file instead of the swap file for a specific region of memory? That is precisely what `mmap` is. The performance benefits follow directly from this core idea.

## Common mistakes
1.  **Ignoring the return value of `mmap`.** It can fail (e.g., file not open, invalid arguments). If it returns `MAP_FAILED`, your pointer is invalid and using it will cause a segmentation fault. Always check it.
2.  **Accessing memory beyond the mapped length.** If you map a 100-byte file and try to access the 101st byte via the pointer, you are outside the valid virtual memory area the kernel set up for you. This will trigger a `SIGSEGV` (segmentation fault).
3.  **Assuming `MAP_PRIVATE` writes to the file.** `mmap` has a `MAP_PRIVATE` flag that creates a copy-on-write mapping. Modifications made to a private mapping are *not* written back to the original file; they are maintained in a private copy in memory/swap. For sharing and persistence, you need `MAP_SHARED`.
4.  **Forgetting `msync` for data integrity.** If you modify data via a shared mapping and the system crashes before the OS flushes the dirty pages to disk, your changes are lost. If you need database-like guarantees, you must explicitly call `msync` after critical writes.

## Self-check
1.  In the standard `read()` workflow, where do the two data copies occur? Which of these copies does `mmap` eliminate and how?
2.  Consider two processes that have both `mmap`'d the same file with `MAP_SHARED`. Process A writes a new value to the first byte of its mapping. Process B then reads the first byte from its mapping. Will Process B always see the value written by A immediately? Explain the role of the CPU caches, physical RAM (page cache), and the on-disk file in your answer.
3.  You are tasked with building a program to count the occurrences of the word "rocket" in a 500 GB text file on a machine with 16 GB of RAM. Would you use `mmap`? Justify your decision by comparing it to an alternative approach using `lseek` and `read`. Analyze the expected page fault behavior and I/O patterns for both strategies.