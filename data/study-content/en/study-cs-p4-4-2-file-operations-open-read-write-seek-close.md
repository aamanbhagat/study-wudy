## 1. The one-sentence answer
**File operations are the system-call interface that lets a process obtain a file descriptor, transfer data to or from persistent storage, reposition within the file, and release the descriptor.**

A file descriptor is simply an integer that the kernel uses to locate an open-file table entry; once the descriptor exists, every subsequent I/O request is expressed in terms of that integer rather than a path name. The five primitive operations—open, read, write, seek (lseek), and close—map directly onto the actions a process must perform to treat secondary storage as a linear byte array while the kernel handles caching, permissions, and concurrency.

These calls are synchronous by default: a read blocks until data arrive, a write blocks until the bytes are accepted by the kernel buffer cache, and close waits for any pending metadata updates. The resulting abstraction hides device geometry and block allocation from the programmer yet still exposes enough control for high-performance applications.

> [!NOTE]
> The descriptor is the sole handle; once closed, the integer may be reused, so holding a stale descriptor is undefined behaviour.

## 2. Why this matters — concrete and current
PostgreSQL’s storage engine opens each relation file with O_DIRECT on Linux so that its own buffer pool bypasses the page cache, guaranteeing that checkpoint I/O is both durable and predictable under 100 000 tps workloads.

NVIDIA’s data-loading pipeline for large-language-model training uses memory-mapped files created by open + mmap; the seek and read primitives allow each GPU worker to stride through terabyte-scale token shards without copying data into user buffers.

The Linux kernel’s eBPF verifier records every open and close on /proc files so that security monitors can detect container escape attempts that attempt to read host credentials via /proc/self/mem.

SpaceX’s flight software logs telemetry to a NOR-flash file system; the write and fsync sequence must complete within a 10 ms real-time window, making the precise semantics of seek and close critical for post-flight reconstruction.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Process address space    | read/write copy data between kernel buffers and user pages |
| System-call mechanism    | All five operations are traps; return values signal errors |
| File descriptor table    | Per-process table maps integers to open-file descriptions |
| inode / vnode            | Kernel structure that stores offset, permissions, and device pointer |

## 4. Building the idea — from intuition to formalism

### Step 1 — From path name to descriptor
A path name is a human-readable string; the kernel must translate it into an in-memory object that can be referenced quickly.  
Example: open("/home/user/data.bin", O_RDONLY) returns 3 on success.  
Formal statement:  
$$fd = open(path, flags) \quad \text{where } fd \in \mathbb{N}_0 \text{ and } fd \notin \text{current descriptor table}.$$  
> [!WARNING]
> Re-using a closed descriptor without checking the return value silently operates on the wrong file.

### Step 2 — Reading into a user buffer
read copies at most count bytes from the current file offset into the supplied buffer and advances the offset.  
Example: read(3, buf, 4096) returns 4096 or fewer.  
Formal statement:  
$$n = read(fd, buf, count) \quad 0 \le n \le count.$$  
> [!WARNING]
> Treating a short read as an error produces incorrect parsers for sockets and pipes.

### Step 3 — Writing from a user buffer
write copies bytes from the buffer to the file at the current offset (or append point) and advances the offset.  
Formal statement:  
$$n = write(fd, buf, count) \quad 0 \le n \le count.$$  
> [!WARNING]
> Assuming a write of count bytes succeeded leads to silent data loss on full disks.

### Step 4 — Changing the file offset
lseek repositions the offset without transferring data.  
Formal statement:  
$$off = lseek(fd, offset, whence) \quad whence \in \{SEEK_SET, SEEK_CUR, SEEK_END\}.$$  
> [!WARNING]
> Using SEEK_END on a file that is concurrently truncated yields an offset beyond EOF.

### Step 5 — Releasing the descriptor
close decrements the reference count on the open-file table entry; when the count reaches zero the kernel flushes metadata and frees resources.  
Formal statement:  
$$err = close(fd) \quad err = 0 \text{ on success}.$$  
> [!WARNING]
> Forgetting close on a temporary file leaks both a descriptor and disk space until process exit.

## 5. Worked examples — every step shown

**Example 1 — Minimal copy**  
*Given:* file “in.bin” of 100 bytes.  
*Find:* copy to “out.bin”.  
open("in.bin", O_RDONLY) → 3  
*Why* obtains descriptor.  
open("out.bin", O_WRONLY|O_CREAT, 0644) → 4  
*Why* obtains second descriptor.  
read(3, buf, 100) → 100  
*Why* transfers data.  
write(4, buf, 100) → 100  
*Why* stores data.  
close(3); close(4)  
*Why* releases resources.  
**Final answer: 100 bytes copied.**

*Reflection:* The example shows that every transfer requires an explicit buffer and explicit length; the kernel never assumes sizes.

**Example 2 — Appending a record**  
*Given:* existing log file.  
*Find:* append 16-byte record.  
fd = open("log", O_WRONLY|O_APPEND)  
*Why* forces writes at end regardless of prior seeks.  
write(fd, record, 16)  
*Why* offset is maintained by kernel.  
close(fd)  
**Final answer: record appended atomically.**

*Reflection:* O_APPEND eliminates a race between seek and write that would otherwise corrupt logs.

**Example 3 — Random access**  
*Given:* 4096-byte file.  
*Find:* read bytes 2048–3071.  
fd = open("data", O_RDONLY)  
lseek(fd, 2048, SEEK_SET) → 2048  
*Why* sets absolute offset.  
read(fd, buf, 1024) → 1024  
*Why* reads from new offset.  
**Final answer: 1024 bytes from middle of file.**

*Reflection:* seek decouples positioning from data movement, enabling sparse-file and database access patterns.

**Example 4 — Error handling**  
*Given:* read-only file.  
*Find:* attempt write.  
fd = open("ro", O_RDONLY)  
write(fd, buf, 10) → -1, errno = EBADF  
*Why* kernel checks mode on every operation.  
close(fd)  
**Final answer: error reported, no data written.**

*Reflection:* Return-value checks are mandatory; silent failure is the most common source of corrupted application state.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Not checking return values  | Programmer assumes success                  | Always store and test n and err              |
| Re-using closed descriptors | Integer reuse after close                   | Set fd = -1 immediately after close          |
| Off-by-one in lseek         | Confusion between SEEK_CUR and byte counts  | Draw offset diagram before coding            |
| Forgetting O_APPEND         | Race between seek and write                 | Use O_APPEND for all log-style files         |
| Leaking descriptors         | open without matching close in every path   | Use RAII wrappers or defer in Go             |
| Assuming atomic writes      | Large writes may be split                   | Loop until n == count or handle short writes |
| Mixing text and binary modes| Newline translation on Windows              | Open with O_BINARY when data are not text    |

## 7. The textbook-precise statement
In POSIX.1-2017 (The Open Group Base Specifications Issue 7, IEEE Std 1003.1-2017), the file operations are defined as:

- `int open(const char *path, int oflag, ...);`
- `ssize_t read(int fildes, void *buf, size_t nbyte);`
- `ssize_t write(int fildes, const void *buf, size_t nbyte);`
- `off_t lseek(int fildes, off_t offset, int whence);`
- `int close(int fildes);`

Each call returns -1 on error and sets errno. The open-file description (including current offset and access mode) is shared among duplicated descriptors; the descriptor table entry itself is per-process. See also Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §13.2.

## 8. Visual — diagram or schematic
```text
User process
+---------------+
| fd table      |
| 0: stdin      |
| 1: stdout     |
| 3: open file  |----+
+---------------+    |
                     v
Kernel
+---------------+    +----------------+    +-----------+
| open-file tbl |--->| file offset    |--->| inode     |
| refcount=1    |    | access mode    |    | data blks |
+---------------+    +----------------+    +-----------+
```
Labelled elements: fd table (per-process), open-file table (shared), inode (persistent metadata).

## 9. The memory technique

1. **The hook** — Picture a librarian handing you a numbered card (the descriptor) that lets you request pages from a book without naming the book again.
2. **What to overlearn** — The five call names in order and the fact that read/write return the number of bytes actually transferred.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from the invariant that every I/O must be expressed through an integer the kernel can validate against its open-file table.

## 10. What this unlocks
Mastery of these primitives is required before directory operations, memory-mapped files, asynchronous I/O, and file-system implementation can be understood.

- Next: directory traversal (opendir, readdir)
- Next: mmap and munmap for zero-copy access
- Next: fcntl and ioctl for advisory locking and device control
- Next: implementation of a simple file system (allocation, inodes, directories)

## 11. Self-check — five questions, no answers
1. A program opens a file, reads 10 bytes, seeks backward 5 bytes, then reads again. How many bytes have been transferred to user space after the second read?
2. Why does the following sequence produce a zero-length file on some systems but not others: open(O_TRUNC), write 100 bytes, close, open(O_APPEND), write 50 bytes?
3. Explain what happens to the file offset when a descriptor is duplicated with dup and then one of the descriptors is closed.
4. A writer process issues write(fd, buf, 1 MiB) on a pipe whose reader has already exited. What values can the write call return, and what errno values are possible?
5. Construct the shortest sequence of calls that safely overwrites the last 512 bytes of a 4096-byte file without reading the entire file into memory.