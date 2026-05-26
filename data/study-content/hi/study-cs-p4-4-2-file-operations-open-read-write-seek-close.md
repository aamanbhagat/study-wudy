## 1. The one-sentence answer
**File operations are the kernel-mediated system calls that let a process obtain a file descriptor, transfer data to or from a file, change the current offset, and release the descriptor when finished.**

In an operating system every file access is deliberately indirect. A process never touches the disk directly; instead it asks the kernel through a small set of well-defined calls. The kernel translates each call into inode lookups, permission checks, buffer-cache operations and device-driver requests, returning only a simple integer status or byte count to the caller.

The five primitives—open, read, write, seek (lseek), close—form the minimal contract that every Unix-derived system still honours today. Once you understand how these five calls interact with the per-process file-descriptor table and the global open-file table, you understand the foundation on which all higher-level I/O libraries are built.

> [!NOTE]
> The single most important realisation is that a file descriptor is merely an index into a per-process table; the actual file state lives in the kernel. Closing the descriptor does not necessarily delete the file, and two descriptors can refer to the same underlying file offset or to two independent offsets.

## 2. Why this matters — concrete and current
PostgreSQL’s storage engine issues millions of pread64 calls per second on large tables; each call uses the offset argument directly so that concurrent backends never contend on a shared file pointer.  
Nginx’s event-driven worker processes keep thousands of log files open simultaneously; they rely on atomic writev calls and careful lseek positioning to guarantee log-line integrity under heavy concurrency.  
PyTorch’s DataLoader prefetches training shards with mmap + madvise rather than repeated read calls; understanding the underlying open flags and seek behaviour lets engineers tune page-fault rates on GPU clusters.  
The Linux kernel’s io_uring interface still exposes the same open/read/write/close semantics, only now through submission queues; any code that misunderstands the classic calls will also mis-use the newer asynchronous path.  
Spacecraft flight software (NASA cFS) runs on VxWorks and must guarantee that every open file is closed before a task delete; a leaked descriptor can exhaust the small file-descriptor table and crash a critical telemetry task.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Process address space| Buffers passed to read/write must be valid user pages     |
| System-call mechanism| All five operations cross the user/kernel boundary        |
| File descriptor table| open returns an index; close removes it                   |
| Inode & dentry cache | Explains why repeated open of the same path is cheap      |
| errno & error handling| Every call can fail; ignoring return values corrupts state |

If any row is unfamiliar, pause and read the corresponding section on processes and system calls first.

## 4. Building the idea — from intuition to formalism

### Step 1 — A file descriptor is an index, not a pointer
A process maintains a small table that maps small non-negative integers to kernel open-file structures. The integer itself carries no file information; only the kernel entry does.  
Example: after `int fd = open("data.bin", O_RDONLY);`, fd might be 3; the value 3 has meaning only inside that process.  
Formal statement:  
$$fd \in \{0,1,2,\dots,OPEN\_MAX-1\} \quad \text{and maps to an entry in the kernel’s open-file table.}$$  
> [!WARNING]
> Treating the integer as a memory address or assuming it is globally unique will cause immediate crashes or data corruption when the same number appears in another process.

### Step 2 — open creates the mapping and returns the index
The call parses the pathname, performs permission checks, allocates an open-file structure and inserts it into both the global table and the process table.  
Example: `open("data.bin", O_RDWR|O_CREAT, 0644)` either returns a new fd or –1 with errno set.  
Formal:  
$$\text{open}(path, flags, mode) \rightarrow fd \lor -1$$  
> [!WARNING]
> Forgetting the mode argument when O_CREAT is set produces undefined permission bits and later access failures that are hard to debug.

### Step 3 — read and write transfer bytes at the current offset
Both calls advance the file offset stored inside the kernel open-file structure.  
Example: `read(fd, buf, 4096)` returns the number of bytes actually placed in buf.  
Formal:  
$$bytes = \text{read}(fd, buf, count) \quad 0 \le bytes \le count$$  
> [!WARNING]
> Assuming read always fills the entire buffer leads to partial-read bugs in network or pipe code.

### Step 4 — lseek repositions the offset without data movement
lseek changes only the offset field; it does not touch the device.  
Example: `lseek(fd, 0, SEEK_END)` moves to the end so the next write appends.  
Formal:  
$$new\_offset = \text{lseek}(fd, offset, whence)$$  
> [!WARNING]
> Calling lseek on a pipe or socket returns ESPIPE; many students forget to check the return value and later observe silent data corruption.

### Step 5 — close removes the mapping and may trigger flush
The kernel decrements reference counts; when the count reaches zero the file is removed from the open-file table and any dirty buffers may be written.  
Formal:  
$$\text{close}(fd) \rightarrow 0 \lor -1$$  
> [!WARNING]
> Data written with write is not guaranteed on disk until close (or fsync) succeeds; power loss before close loses the data.

### Step 6 — Error model and atomicity guarantees
Every call reports success or failure atomically; partial failures are never hidden inside the kernel. This single rule lets applications implement reliable append and transactional logging.

## 5. Worked examples — har step show karo

**Example 1 — Minimal open-read-close**  
*Given:* file “hello.txt” contains exactly 5 bytes “hello”.  
*Find:* read the entire content into a buffer.  
```
int fd = open("hello.txt", O_RDONLY);
if (fd < 0) { perror("open"); exit(1); }
char buf[6];
ssize_t n = read(fd, buf, 5);
buf[n] = '\0';
close(fd);
```
*Why:* open returns a valid index or aborts; read returns actual byte count so we can null-terminate safely.  
**Final answer:** fd = 3 (typical), buf = "hello", n = 5.

**Example 2 — Append with lseek**  
*Given:* same file.  
*Find:* append “ world”.  
```
int fd = open("hello.txt", O_WRONLY|O_APPEND);
lseek(fd, 0, SEEK_END);          /* redundant with O_APPEND but explicit */
write(fd, " world", 6);
close(fd);
```
*Why:* O_APPEND already forces append semantics; explicit lseek demonstrates Step 4.  
**Final answer:** file now contains “hello world”.

**Example 3 — Partial read loop**  
*Given:* a 1 MiB file.  
*Find:* read it completely.  
```
ssize_t total = 0;
while (total < size) {
    ssize_t n = read(fd, buf+total, size-total);
    if (n == 0) break;           /* EOF */
    if (n < 0) { perror("read"); break; }
    total += n;
}
```
*Why:* read may return fewer bytes; loop accumulates until EOF or error.  
**Final answer:** total == size on success.

**Example 4 — Error-handling with errno**  
*Given:* attempt to open a directory for writing.  
*Find:* correct errno value.  
```
fd = open("/tmp", O_WRONLY);
if (fd == -1 && errno == EISDIR) { … }
```
*Why:* kernel distinguishes “is a directory” from generic EACCES.  
**Final answer:** errno == EISDIR.

**Reflection:** Each example forces explicit checking of return values; the pattern generalises to any I/O call that can return partial results or errors.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Ignoring read’s byte count  | Assumption that read always fills buffer    | Always loop or use the returned count        |
| Reusing fd after close      | fd value is just an int, still in scope     | Set fd = -1 immediately after close          |
| Forgetting O_CREAT mode     | POSIX requires mode when O_CREAT present    | Always supply 0666 or similar                |
| lseek on non-seekable fd    | Pipes and sockets have no offset            | Check return value == -1 && errno == ESPIPE  |
| Not checking close return   | close can fail on NFS or quota              | Treat close failure as fatal for durability  |
| Race between open and unlink| Another process deletes the file            | Use O_EXCL or keep fd open until rename      |
| Descriptor leak under fork  | Child inherits table                        | Close unneeded fds before exec               |

## 7. The textbook-precise statement
In Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §13.2, the file-system interface is defined as the set of system calls  
open(path, flags, mode) → fd,  
read(fd, buf, count) → ssize_t,  
write(fd, buf, count) → ssize_t,  
lseek(fd, offset, whence) → off_t,  
close(fd) → int,  
each of which operates on a per-process file-descriptor table that maps descriptors to entries in the system-wide open-file table. All operations are atomic with respect to other processes; errors are reported via the integer return value and the per-process errno variable.

## 8. Visual — diagram or schematic
```
Per-process FD table          Kernel open-file table
[0] stdin  ─────────────────▶  offset=0, ref=2
[1] stdout ─────────────────▶  offset=0, ref=2
[2] stderr ─────────────────▶  offset=0, ref=2
[3] fd=3   ─────────────────▶  offset=4096, ref=1  (data.bin)
[4] fd=4   ─────────────────▶  offset=0,   ref=1  (log.txt)
```
Each arrow represents a pointer stored inside the kernel; closing fd 3 decrements the reference count but does not affect other processes that may still hold the same file open.

## 9. The memory technique
1. **The hook** — imagine five labelled drawers in a filing cabinet; open unlocks a drawer and hands you its number, read/write moves paper at the current tab position, seek slides the tab, close locks the drawer again.  
2. **What to overlearn** — return-value discipline: every call returns –1 on error; read/write return byte count, not success flag.  
3. **Spaced-repetition schedule** — review the five call signatures after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — redraw the FD-table diagram from memory; if you can label every arrow you have rebuilt the semantics.

## 10. What this unlocks
Mastery of these five calls lets you reason about higher-level abstractions without magic.  
- Directory operations (opendir, readdir) are built on the same fd mechanism.  
- Memory-mapped files (mmap) still require an open fd first.  
- Asynchronous I/O frameworks (io_uring, libaio) expose the identical offset and buffer semantics.  
- Reliable logging and database WAL algorithms rely on the atomicity guarantees of write + fsync + close.

## 11. Self-check — five questions, no answers
1. After `fd = open("/tmp/x", O_RDWR|O_CREAT, 0644); close(fd);` does the file still exist?  
2. What value does read return when it reaches end-of-file?  
3. Why can two processes share the same file offset after one calls fork?  
4. If lseek succeeds on a regular file but later write returns ENOSPC, what is the state of the offset?  
5. Construct a minimal C snippet that appends a timestamp to “log.txt” without ever moving the offset backward.