## 1. The one-sentence answer

**A file is a named sequence of bytes with associated metadata; a directory is a special file that maps human-readable names to files or other directories; a path is an ordered sequence of directory names that locates a file; and an inode is the kernel data structure that holds a file’s metadata and block pointers.**

A file therefore exists in two layers at once. To a user it appears as a named container of data that can be opened, read, or written. Inside the operating system the same file is represented by an inode whose number is recorded inside directory entries; the inode itself never stores the file’s name.

A path simply traverses the directory graph until it reaches the final directory entry that points to the desired inode. The separation between names (held in directories) and metadata (held in inodes) is what allows hard links, mount points, and atomic renames to work.

> [!NOTE]
> The single most important insight is that a file’s name is not stored inside its inode; names live only in directory entries, which is why the same inode can appear under many names.

## 2. Why this matters — concrete and current

In the Linux kernel used by Android and most cloud instances, every open file begins with a lookup that walks the dentry cache and finally resolves to an inode; a single slow path walk on a container image with millions of small files can add tens of milliseconds to cold-start latency at companies such as Google and Meta.

Modern solid-state drives expose their flash translation layer through an FTL-to-filesystem interface; the inode’s block map directly influences how many erase blocks the drive must garbage-collect, which is why database engines at Snowflake and Timescale carefully align their file layouts to inode extent boundaries.

Apple’s APFS replaces the classic HFS+ inode with a copy-on-write B-tree structure; the design choice lets Time Machine create instantaneous snapshots because each file’s inode can be cloned without copying data blocks, a technique now studied in papers on persistent-memory file systems at USENIX FAST.

In high-performance computing, Lustre and BeeGFS rely on the inode’s layout information to stripe large scientific datasets across thousands of object-storage targets; misaligned paths or inode contention still cause the well-known “metadata storm” observed during the initial checkpoint of a 100 000-core simulation at Oak Ridge.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Byte-addressable memory  | Files are ultimately sequences of bytes that must be mapped to disk blocks. |
| Tree data structures     | Directories form a tree (or DAG when links are present) that paths traverse. |
| Pointers and indirection | Inodes store pointers to data blocks; understanding one level of indirection is essential. |
| Process address space    | File descriptors are integers that index per-process tables pointing to open inodes. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A file is data plus metadata
A file is not merely its contents; it also carries attributes such as size, owner, and timestamps.  
Example: the 4096-byte string “hello” written to disk is accompanied by a record saying its owner is uid 1000 and its modification time is 1690000000.  
Formally, a file \(F\) is the pair \((D, M)\) where \(D \subseteq \mathbb{B}^*\) is the data and \(M\) is a record of metadata attributes.  
> [!WARNING] Treating a file as only its byte sequence will cause permission or timestamp bugs when programs rely on metadata.

### Step 2 — A directory is a name-to-inode map
A directory is a file whose data is a table of (name, inode-number) pairs.  
Example: the directory “/home” contains the entry (“alice”, 12345).  
Formally, a directory entry is a partial function \(d : \text{Name} \rightharpoonup \text{InodeNum}\).  
> [!WARNING] Forgetting that directory entries contain only numbers, not full metadata, leads to the incorrect belief that deleting a name also deletes the file’s data.

### Step 3 — A path is a traversal of directory entries
A path is a sequence of names separated by “/” that is resolved left to right by successive directory lookups.  
Example: “/home/alice/report.txt” starts at the root inode, follows “home”, then “alice”, then “report.txt”.  
Formally, the resolution of path \(p = n_1/n_2/\dots/n_k\) is the composition \(d_{\text{root}}(n_1) \circ d_2(n_2) \circ \dots \circ d_k(n_k)\).  
> [!WARNING] Absolute paths always begin at the root inode; omitting the leading slash resolves relative to the current working directory inode and produces different results after `chdir`.

### Step 4 — An inode stores the mapping from logical offsets to physical blocks
The inode contains direct pointers, indirect pointers, and file attributes, but never the file name.  
Example: inode 12345 may list block 100, block 101, and a double-indirect block at 500.  
Formally, the inode supplies a function \(b : \mathbb{N} \to \text{BlockNum}\) that translates byte offset \(o\) into disk block \(\lfloor o / B \rfloor\) where \(B\) is the block size.  
> [!WARNING] Changing the inode’s block pointers without updating directory entries leaves stale names that point to freed or reused blocks.

### Step 5 — Hard links share the same inode
Creating an additional directory entry that records the same inode number produces a hard link.  
Example: `ln report.txt backup.txt` adds another (name, inode) pair for inode 12345.  
Formally, the reference count inside the inode is the cardinality of the preimage under all directory maps.  
> [!WARNING] Removing one link decrements the count; the inode and its blocks are reclaimed only when the count reaches zero.

### Step 6 — The file-system namespace is the union of all mounted directory trees
Mounting overlays a new root inode at a directory mount point, extending the namespace.  
Example: mounting an ext4 filesystem at “/mnt/data” makes its root inode reachable via the path “/mnt/data”.  
Formally, the global name space is the disjoint union of per-filesystem trees glued at mount points.  
The textbook statement of the result follows directly from the six steps above.

## 5. Worked examples — every step shown

**Example 1 — Creating a single file**  
*Given:* An empty filesystem whose root inode is 2.  
*Find:* The inode number and directory entry after writing “hi”.  
1. Allocate a free inode → 42. *Why:* The kernel’s inode bitmap must mark a new metadata slot.  
2. Write data block 100 with bytes “hi”. *Why:* The inode’s first direct pointer must reference allocated storage.  
3. Insert (“test.txt”, 42) into the root directory. *Why:* Only the directory, not the inode, records the name.  
**42**  
*Reflection:* The separation of allocation from naming is what permits the same inode to appear under multiple names later.

**Example 2 — Resolving an absolute path**  
*Given:* Path “/a/b/c”. Directory “/” contains (“a”,10); directory 10 contains (“b”,20); directory 20 contains (“c”,30).  
*Find:* Final inode.  
Lookup root(”a”) → 10. *Why:* Root is the starting inode.  
Lookup 10(”b”) → 20. *Why:* Each step replaces the current inode with the directory entry’s target.  
Lookup 20(”c”) → 30. *Why:* Composition yields the leaf inode.  
**30**  
*Reflection:* Path resolution is exactly function composition over directory maps.

**Example 3 — Hard link and reference count**  
*Given:* Inode 30 with link count 1.  
*Find:* Count after `ln /a/b/c /x/y`.  
Create new directory entry (“y”,30) in directory of “/x”. *Why:* The same inode number is written into a second directory.  
Increment link count to 2. *Why:* The inode stores the count that prevents premature reclamation.  
**2**  
*Reflection:* Deletion only removes a directory entry; the inode survives while any entry remains.

**Example 4 — Mounting extends the namespace**  
*Given:* Root filesystem and a second filesystem whose root inode is 2.  
*Find:* Path that reaches a file inside the second filesystem after `mount /dev/sdb1 /mnt`.  
The kernel replaces the inode of the directory “/mnt” with the root inode of the mounted volume. *Why:* Subsequent lookups under “/mnt” traverse the new tree.  
**Any path beginning “/mnt/…” now resolves inside the second filesystem.**  
*Reflection:* Mount points demonstrate that the global namespace is assembled at runtime from independent inode trees.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming a file’s name is stored inside its inode | Textbooks sometimes draw “file = name + data” diagrams | Always draw directory entry and inode as separate boxes. |
| Confusing hard links with copies | Both names appear identical in `ls -l` | Check the link count column; identical inode numbers prove sharing. |
| Forgetting that “.” and “..” are ordinary directory entries | They behave like any other name-to-inode mapping | Treat them as explicit entries when walking trees by hand. |
| Using relative paths after an unexpected `chdir` | The starting inode for resolution silently changes | Prefer absolute paths in scripts or record `getcwd` before critical operations. |
| Deleting an open file and expecting immediate space reclamation | The inode’s link count stays positive while the file descriptor is open | Remember that `unlink` only removes the directory entry; space is freed on last close. |
| Ignoring mount namespaces in containers | Each container sees its own mount table | Use `lsns -t mnt` or `mount --bind` explicitly when debugging. |
| Believing inode numbers are unique across the entire system | They are only unique within one filesystem | Always qualify an inode number by its filesystem identifier or mount point. |

## 7. The textbook-precise statement

In a Unix-style file system the namespace is defined by a collection of directories, each a mapping from byte-string names to inode numbers, together with a set of inodes that store file metadata and a function from logical block offsets to physical storage blocks. The resolution of a path \(p\) is the unique inode obtained by iterated directory lookup starting from the root inode (or the current working directory for relative paths). Hard links are multiple directory entries that refer to the same inode; the inode is reclaimed exactly when its link count reaches zero and no open file descriptors remain. See Tanenbaum & Bos, *Modern Operating Systems*, 4e, §4.3–4.4 and McKusick et al., *The Design and Implementation of the FreeBSD Operating System*, 2e, Ch. 9.

## 8. Visual — diagram or schematic

```text
          Root Inode 2
               |
       +-------+-------+
       |               |
   dirent("home",5)  dirent("etc",7)
       |               |
   Inode 5 (dir)     Inode 7 (dir)
       |               |
   dirent("alice",42)  ...
       |
   Inode 42
   +----------------+
   | mode, owner    |
   | size, times    |
   | direct[0]=100  |
   | ...            |
   +----------------+
          |
      Data block 100
```

The diagram shows three directory inodes and one regular file inode. Arrows from directory entries point only to inode numbers; data blocks are referenced solely from the inode.

## 9. The memory technique

**The hook** — Picture a library card catalogue (the directory) that lists book titles and catalogue numbers; the actual book (data blocks) sits on a shelf identified only by its catalogue number (inode). The card never contains the book’s text.

**What to overlearn** — (1) Directory entries contain only name + inode number. (2) Inode link count controls reclamation. (3) Path resolution is left-to-right iterated lookup.

**Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Re-derive by starting from a blank disk: allocate an inode, write its number into a directory block, then compose directory lookups to obtain any later path.

## 10. What this unlocks

These four concepts are the foundation for every higher-level file-system operation and for process-level I/O.  

- File descriptors and the open-file table  
- Virtual file system (VFS) switch and stacking  
- Memory-mapped files and the page cache  
- Copy-on-write snapshots and reflinks  
- Distributed file-system protocols (NFS, SMB) that transmit inode numbers and file handles  

## 11. Self-check — five questions, no answers

1. Why can two different path strings resolve to the same sequence of bytes on disk?  
2. After executing `ln a b; rm a`, is the data still reachable and why?  
3. In a path containing a symbolic link, which component decides whether the remaining path components are interpreted relative to the link target or the directory containing the link?  
4. An application opens a file, unlinks it, then continues to read; which data structure keeps the inode alive?  
5. On a system with two mounted filesystems, can inode number 42 on the first filesystem ever refer to the same storage as inode number 42 on the second?