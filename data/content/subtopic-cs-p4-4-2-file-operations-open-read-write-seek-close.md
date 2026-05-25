## What it is
File operations are the fundamental set of system calls an operating system provides for user programs to interact with the file system. These operations allow a program to treat a file as a sequence of bytes that can be created, opened, read from, written to, repositioned within, and finally closed. This abstracts away the immense complexity of disk drivers, block allocation, and directory structures.

## Why it matters
This is the bedrock of all persistent storage. In aerospace, telemetry data from a launch vehicle is streamed to a file second by second using `write` operations. In machine learning, large datasets are loaded into memory for training via `read` operations. Physics simulations save their state and results to disk using these same primitives, allowing you to checkpoint a long-running simulation or analyze its output later.

## When to study it
You must be comfortable with the C programming language, specifically pointers, memory allocation (`malloc`), and basic data types. You should also understand the concept of a **system call**—the mechanism by which a user-space program requests a service from the operating system kernel. If the distinction between user space and kernel space is unclear, review that first.

## How to study it (step by step)
1.  **Read the Manual:** Open a terminal and read the manual pages for the key POSIX system calls. Type `man 2 open`, `man 2 read`, `man 2 write`, `man 2 lseek`, and `man 2 close`. Focus on the function signatures, return values, and error codes (`errno`).
2.  **Write-Then-Close:** Write a simple C program that uses `open` with the `O_CREAT | O_WRONLY` flags to create a new file named `test.txt`. Use `write` to put the string "hello, world" into it. Use `close` to release the file. Compile and run it, then verify the file's contents with a command like `cat test.txt`.
3.  **Open-Read-Close:** Write a second program that opens `test.txt` using `open` with the `O_RDONLY` flag. Use `read` to read the contents into a buffer. Print the buffer to the console. Close the file.
4.  **Seek and Overwrite:** Modify the first program. After writing "hello, world", use `lseek` to move the file offset back to position 7 (the start of "world"). Then, `write` the string "system" over it. The file should now contain "hello, system". Verify this.
5.  **Trace the Calls:** Use a tracing tool to see the system calls your program makes. On Linux, use `strace ./your_program`. On macOS, use `dtruss sudo ./your_program`. Observe how your C function calls (`open`, `read`, etc.) correspond directly to kernel entry points.
6.  **Error Handling:** Modify your programs to deliberately cause errors. Try to open a non-existent file for reading. Try to write to a file opened with `O_RDONLY`. Check the return value of each system call; if it's -1, print the human-readable error message using `perror("Descriptive message")`.

## Key ideas, with intuition
1.  **The File Descriptor:** When you `open` a file, the kernel does not give you a memory pointer to the file's data. Instead, it gives you a small, non-negative integer called a *file descriptor* (often abbreviated `fd`). This `fd` is an index into a per-process table maintained by the kernel. Think of it as a handle or a ticket. When you want to `read` or `write`, you hand the kernel your ticket (`fd`), and the kernel knows exactly which file you're talking about. The first three are standardized: `0` is standard input, `1` is standard output, and `2` is standard error.
    $$
    \text{fd} = \text{open}(\text{"/path/to/file"}, \text{flags}); \quad (\text{fd} \ge 0 \text{ on success})
    $$

2.  **The File Offset:** For every open file, the kernel maintains a *file offset*, also known as the read/write pointer or cursor. This is the location, in bytes from the beginning of the file, where the *next* `read` or `write` operation will happen. When you `read` or `write` $N$ bytes, the kernel automatically advances the offset by $N$. It's a piece of state associated with the open file description, not the file itself.
    $$
    \text{offset}_{\text{new}} = \text{offset}_{\text{old}} + \text{bytes\_transferred}
    $$

3.  **`lseek` Moves the Offset:** The `read` and `write` calls move the offset sequentially. The `lseek` system call lets you move it arbitrarily. You can jump to the beginning (`SEEK_SET`), move relative to your current position (`SEEK_CUR`), or move relative to the end of the file (`SEEK_END`). This is how you access data in a non-sequential, or "random access," manner.
    $$
    \text{new\_offset} = \text{lseek}(\text{fd}, \text{offset}, \text{whence}); \quad (\text{whence} \in \{\text{SEEK\_SET, SEEK\_CUR, SEEK\_END}\})
    $$

4.  **Bytes, Not Types:** The OS file system interface is fundamentally byte-oriented. It knows nothing about `int`, `float`, or `struct rocket_telemetry`. Your program `write`s a buffer of bytes and `read`s into a buffer of bytes. It is entirely your application's responsibility to interpret those bytes correctly (e.g., by casting a byte buffer pointer to a struct pointer). This makes the interface simple, universal, and powerful.

## Worked example
Let's write a program to create a file, write two 4-byte integers to it, then seek back to the beginning of the second integer and overwrite it.

```c
#include <stdio.h>      // For perror
#include <unistd.h>     // For syscalls: open, write, lseek, close
#include <fcntl.h>      // For flags: O_RDWR, O_CREAT

int main() {
    // Step 1: Open (and create if needed) a file for reading and writing.
    // The 0644 is the file permission mode.
    int fd = open("data.bin", O_RDWR | O_CREAT, 0644);
    if (fd == -1) {
        perror("open failed");
        return 1;
    }
    // State: fd is a valid file descriptor (e.g., 3). File offset is 0.

    // Step 2: Write two integers to the file.
    int data1 = 100; // 0x00000064 in memory
    int data2 = 200; // 0x000000C8 in memory
    
    ssize_t bytes_written = write(fd, &data1, sizeof(int));
    if (bytes_written != sizeof(int)) { /* Error handling */ }
    // State: File contains 4 bytes of data1. Offset is now 4.

    bytes_written = write(fd, &data2, sizeof(int));
    if (bytes_written != sizeof(int)) { /* Error handling */ }
    // State: File contains 8 bytes (data1 then data2). Offset is now 8.

    // Step 3: Seek back to the beginning of the second integer.
    // The second integer starts at byte offset 4.
    off_t new_offset = lseek(fd, sizeof(int), SEEK_SET);
    if (new_offset == -1) {
        perror("lseek failed");
        return 1;
    }
    // State: File is unchanged. Offset is now 4.

    // Step 4: Write a new integer, overwriting the old data2.
    int data3 = 300; // 0x0000012C in memory
    bytes_written = write(fd, &data3, sizeof(int));
    if (bytes_written != sizeof(int)) { /* Error handling */ }
    // State: File contains 8 bytes (data1 then data3). Offset is now 8.

    // Step 5: Close the file.
    close(fd);
    // State: Resources released. fd is no longer valid.

    return 0;
}
```

**Reflection:**
-   **Step 1 (`open`)** worked because it's the gatekeeper. We requested a handle from the OS, specifying our intent (`O_RDWR`, `O_CREAT`), and got back an integer `fd`.
-   **Step 2 (`write`)** worked by passing the `fd`, a pointer to the data in our memory, and the size. The OS copied the bytes from our program's memory into the file system buffer cache, advancing the file offset automatically.
-   **Step 3 (`lseek`)** was the explicit state manipulation. We told the kernel to change the file offset associated with our `fd` to a specific position, preparing for the next I/O.
-   **Step 4 (`write` again)** behaved just like the first write, but started at the new offset, overwriting the existing data.
-   **Step 5 (`close`)** is crucial for telling the OS we're done, allowing it to flush any remaining buffered data to disk and free up kernel memory.

## Diagrams

**Diagram 1: File Descriptor Indirection**

This shows how a file descriptor (`fd`) in a process is just an index that ultimately leads to the on-disk file information (inode).

```text
       Process A                                Kernel Space
+----------------------+         +--------------------+        +---------------------+        +----------------+
| File Descriptor Tbl  |         | Open File Table    |        | v-node/inode Table  |        |      Disk      |
|                      |         | (system-wide)      |        | (system-wide)       |        |                |
|  0: stdin            |         |                    |        |                     |        |                |
|  1: stdout           |         |                    |        |                     |        |                |
|  2: stderr           |         |                    |        |                     |        |                |
|  3: --------------> | -------> | struct file        | -----> | struct inode        | -----> | file data      |
|     (fd = 3)         |         |  - f_offset: 8     |        |  - size: 8 bytes    |        | on disk blocks |
+----------------------+         |  - f_vnode: * -----|        |  - permissions      |        +----------------+
                                 |  ...               |        |  ...                |
                                 +--------------------+        +---------------------+
```

**Diagram 2: File as a Byte Array with Offset**

This visualizes the file's contents and the movement of the file offset during the worked example.

```text
File: data.bin

Initial State (after open):
Offset: 0
        v
Bytes:  [ ][ ][ ][ ][ ][ ][ ][ ]

After writing data1 (100):
Offset: 4
                v
Bytes:  [64][00][00][00][ ][ ][ ][ ]

After writing data2 (200):
Offset: 8
                                v
Bytes:  [64][00][00][00][C8][00][00][00]

After lseek(fd, 4, SEEK_SET):
Offset: 4
                v
Bytes:  [64][00][00][00][C8][00][00][00]

After writing data3 (300):
Offset: 8
                                v
Bytes:  [64][00][00][00][2C][01][00][00]
```

## Memory technique — remember this forever
1.  **The Librarian Analogy:**
    -   `open`: You go to the library desk and ask for a specific book ("path/to/file"). The librarian gives you a small plastic token with a number on it (`fd = 3`). You can't read the token, but the librarian knows it corresponds to your book.
    -   `read`/`write`: You show your token (`fd`) and say "read me the next page" or "write this note on the current page." The librarian finds your book, turns to the bookmarked page (the `offset`), performs the action, and moves the bookmark forward.
    -   `lseek`: You show your token (`fd`) and say "move the bookmark to page 50." The librarian does it without reading or writing anything.
    -   `close`: You return your token (`fd`) to the desk. You're done. The librarian can now give that token to someone else.

2.  **Must-overlearn facts (The "Big 5" Signatures):**
    ```c
    int open(const char *path, int flags, ...); // Returns fd or -1
    ssize_t read(int fd, void *buf, size_t count); // Returns bytes read or -1
    ssize_t write(int fd, const void *buf, size_t count); // Returns bytes written or -1
    off_t lseek(int fd, off_t offset, int whence); // Returns new offset or -1
    int close(int fd); // Returns 0 or -1
    ```
    Note the types: `fd` is an `int`. Buffer sizes (`count`) are `size_t`. Return values for `read`/`write` are `ssize_t` to accommodate the error value `-1`.

3.  **Spaced Repetition Schedule:**
    -   Review these signatures and the Librarian Analogy in **1 day**.
    -   Rewrite the worked example from memory in **3 days**.
    -   Explain the difference between a file descriptor and a file pointer (`FILE*`) in **7 days**.
    -   Do the self-check problems in **16 days**.
    -   Explain the ASCII diagrams to a friend (or a rubber duck) in **35 days**.

4.  **First Principles Pathway:** If you forget the exact function signature for `read`, what must it contain?
    -   You need to tell the kernel *which* open file to read from. That's the file descriptor (`int fd`).
    -   You need to tell it *where* in your program's memory to put the data it reads. That's a pointer to a buffer (`void *buf`).
    -   You need to tell it the *maximum number of bytes* to read (the size of your buffer). That's a size (`size_t count`).
    -   The kernel needs to tell you *how many bytes it actually read* (it could be less than you asked for if you hit the end of the file) or if an error occurred. So the return type must be able to represent a count or an error code (hence `ssize_t`). This logic reconstructs `ssize_t read(int fd, void *buf, size_t count);`.

## Common mistakes
1.  **Ignoring Return Values:** Never assume a system call succeeds. `write` can fail if the disk is full. `read` can fail if the network connection behind the file system drops. Always check for `-1` and use `perror` to understand why it failed.
2.  **Forgetting `close()`:** Open file descriptors are a finite kernel resource. Failing to `close` them is a resource leak. In a long-running server or simulation, this will eventually cause new `open` calls to fail.
3.  **Partial Reads/Writes:** You might ask `write` to write 1024 bytes, but it is only legally required to write 1 byte and return `1`. You must put `read` and `write` calls in a loop that continues until all desired bytes are transferred.
4.  **Confusing `fd` and `FILE*`:** `int fd = open(...)` is a low-level kernel handle. `FILE* f = fopen(...)` is a high-level C standard library construct. `fopen` is implemented using `open` internally, but it adds buffering for performance. They are not interchangeable.

## Self-check
1.  Write a C program `mycp` that takes two command-line arguments, a source file and a destination file. The program should copy the contents of the source to the destination using only `open`, `read`, `write`, and `close`.
2.  Write a program `mytail` that takes a filename as an argument and prints the last 10 lines of the file to standard output. (Hint: You'll need `lseek` with `SEEK_END` to find the end, then read backwards in chunks to find the 10th-to-last newline character `\n`).
3.  The `read` and `write` system calls modify the file offset. The `pread` and `pwrite` calls perform the same actions but at a specified offset, *without* changing the file's current offset. Implement a function `ssize_t my_pwrite(int fd, const void *buf, size_t count, off_t offset)` using only `lseek` and `write`. What is a key weakness of your implementation in a multi-threaded program compared to the real `pwrite` syscall?