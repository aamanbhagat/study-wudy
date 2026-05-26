## 1. The one-sentence answer
**A file system organises persistent data into files and directories that are located via paths and internally tracked by inodes.**

A file is simply a named sequence of bytes that the operating system treats as a single unit. A directory is a special file that maps human-readable names to inode numbers so the kernel can locate the actual data blocks. A path is the textual route (absolute or relative) that resolves these names step by step until an inode is reached. The inode itself stores all metadata—permissions, timestamps, block pointers—except the file name and the data contents.

This separation lets the same data be referenced by many names (hard links) while the directory tree remains a convenient human interface. The kernel never stores file names inside inodes; names live only inside directory entries.

> [!NOTE]
> The deepest insight is that names are not properties of the data; they are merely directory entries pointing to an inode. Change the name and the inode number stays the same; delete the last name and the inode can finally be reused.

## 2. Why this matters — concrete and current
Linux ext4, the default file system on most servers, uses inodes to support billions of files on a single volume; Google’s Colossus and Facebook’s Tectonic both adopted inode-like metadata designs to scale metadata operations independently of data blocks.

Container runtimes such as Docker and containerd rely on overlayfs, which layers directories by stacking inode references; a small change in understanding path resolution immediately explains why `rm -rf` inside a container can affect or miss host files.

Database engines such as PostgreSQL store their WAL and relation files under a fixed directory tree; every checkpoint operation walks paths and reads inode metadata to decide which blocks are safe to recycle.

Modern cloud object stores (S3, GCS) expose a flat key space that still emulates hierarchical paths; the client SDK must translate “folder/file” strings into the underlying key while the storage service maintains inode-like object metadata for permissions and versioning.

Android’s ART runtime uses the same inode-based file system to isolate app data under `/data/data/<package>`; a single misunderstood path or permission bit on an inode can leak one app’s private files to another.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Process address space| Understands how file descriptors are stored per process   |
| System calls         | `open`, `stat`, `unlink` are the interface to inodes      |
| Basic data structures| Trees and hash tables appear inside directory implementations |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — A file is an uninterpreted byte sequence
The operating system stores data as a contiguous or fragmented sequence of bytes; it records neither type nor structure.  
Example: a 4096-byte text file and a 4096-byte JPEG are identical to the kernel until a user-space program interprets the bytes.  
Formal statement: a file \(F\) is a function \(F: \{0,1,\dots,n-1\} \to \{0,1\}\) where \(n\) is its size in bytes.  
> [!WARNING] Treating a file as “text” or “binary” inside the kernel leads to incorrect permission or truncation logic.

### Step 2 — A directory maps names to inode numbers
A directory is a file whose data blocks contain `(name, inode-number)` pairs.  
Example: the directory `/home` contains the entry `("alice", 1048577)`.  
Formal statement: a directory entry is an element of \(\text{Name} \times \text{InodeNumber}\).  
> [!WARNING] Deleting the directory entry does not immediately free the inode; link count must reach zero first.

### Step 3 — A path resolves a sequence of directory entries
An absolute path begins at the root inode (usually inode 2); each component is looked up in the previous directory.  
Example: `/home/alice/report.pdf` resolves root \(\to\) home \(\to\) alice \(\to\) report.pdf.  
Formal statement: \(\text{resolve}(p_1/p_2/\dots/p_k) = \text{lookup}(\text{lookup}(\dots\text{lookup}(\text{root},p_1),p_2),\dots,p_k)\).  
> [!WARNING] Symbolic links break the simple tree walk and can create cycles if not handled with a recursion limit.

### Step 4 — The inode stores metadata and block pointers
An inode contains permissions, owner, timestamps, link count and pointers to data blocks; it never stores the file name.  
Example: `ls -i report.pdf` prints the inode number 1048580; `stat` shows the same inode’s metadata.  
Formal statement: \(\text{inode} = (\text{mode}, \text{uid}, \text{gid}, \text{atime}, \text{mtime}, \text{ctime}, \text{links}, \text{block}[0..N])\).  
> [!WARNING] Two hard-linked names share one inode; changing permissions on one name instantly affects the other.

### Step 5 — File descriptors connect processes to open inodes
Each process maintains a table mapping small integers (fd) to open file descriptions that point to inodes and current offsets.  
Example: after `open("/etc/passwd", O_RDONLY)` returns fd 3, the kernel records that fd 3 references inode 2341 with offset 0.  
Formal statement: \(\text{fd_table}: \mathbb{N} \rightharpoonup \text{OpenFileDescription}\).  
> [!WARNING] Closing the last fd does not delete the file if another hard link still exists.

## 5. Worked examples — har step show karo

**Example 1 — Absolute path resolution**  
*Given:* root inode = 2, directory “/” contains (“home”, 100), “/home” contains (“user”, 200).  
*Find:* inode of `/home/user`.  
Step 1: start at inode 2, lookup “home” → 100.  
Step 2: at inode 100, lookup “user” → 200.  
*Why* each lookup uses the directory’s data blocks to search the name-to-inode mapping.  
**Final answer: 200**

*Reflection:* This example shows that every component except the last must be a directory; a non-directory stops resolution.

**Example 2 — Hard link creation**  
*Given:* file “a.txt” has inode 300 with link count 1.  
*Find:* result after `ln a.txt b.txt`.  
Step 1: create new directory entry (“b.txt”, 300) in current directory.  
Step 2: increment inode 300’s link count to 2.  
*Why* link count prevents premature reuse of the inode.  
**Final answer: both names now reference inode 300, link count = 2**

*Reflection:* Deleting either name decrements the count; only when it reaches zero are blocks reclaimed.

**Example 3 — Relative path with “..”**  
*Given:* cwd inode = 200 (“/home/user”).  
*Find:* inode of `../user/report.pdf`.  
Step 1: lookup “..” in inode 200 → 100.  
Step 2: lookup “user” in 100 → 200.  
Step 3: lookup “report.pdf” in 200 → 301.  
*Why* “..” is just another directory entry, not special kernel magic.  
**Final answer: 301**

*Reflection:* Demonstrates that relative paths are resolved from the process’s cwd inode, not from textual string manipulation.

**Example 4 — Inode vs directory entry distinction**  
*Given:* `ls -i` shows “note.txt 5001”.  
*Find:* what changes after `mv note.txt memo.txt`.  
Step 1: remove entry (“note.txt”, 5001).  
Step 2: insert entry (“memo.txt”, 5001).  
Step 3: inode 5001 remains unchanged.  
*Why* only the directory block is modified; inode metadata never stores names.  
**Final answer: inode number stays 5001, only name changes**

*Reflection:* This is the source of the common confusion “the file moved”; actually only the name moved.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Believing `rm` deletes data immediately | Confusing directory entry removal with inode/block freeing | Check link count with `stat` before assuming space is reclaimed |
| Using string operations on paths instead of realpath | Treating path as opaque string rather than inode walk | Always resolve via `realpath` or kernel calls when security matters |
| Forgetting that hard links share metadata | Assuming each name owns its own inode | Use `ls -i` or `stat` to verify shared inode numbers |
| Ignoring symbolic-link loops | Assuming every path walk is acyclic | Set a recursion depth limit in user-space tools |
| Opening a file then deleting its last name | Expecting the file to vanish while still open | Remember open file descriptions keep the inode alive until last close |
| Assuming directories store file data | Misreading textbook diagrams | Recall that directory data blocks contain only name–inode pairs |
| Mixing cwd of shell with inode of script | Forgetting that relative paths use the calling process cwd | Print `pwd -P` and compare inode numbers when debugging |

## 7. The textbook-precise statement
In Silberschatz, Galvin and Gagne, *Operating System Concepts*, 10e, §11.3, a file system is defined as a collection of inodes and data blocks together with a directory tree that maps path-name strings to inode numbers. An inode is a data structure that stores file metadata and pointers to data blocks but does not contain the file name. Directory entries map names to inode numbers; multiple entries may map to the same inode (hard links). Path resolution starts at the root inode and iteratively replaces each path component by the inode stored in the corresponding directory entry. The link count in the inode records how many directory entries reference it; an inode may be reused only when the link count returns to zero and no open file descriptions remain.

## 8. Visual — diagram or schematic
```
Root inode 2
├── home (inode 100)
│   └── user (inode 200)
│       ├── report.pdf (inode 301)
│       └── memo.txt  (inode 5001)   <-- hard link may point here too
└── etc  (inode 50)
```
Each arrow represents a directory entry containing (name, inode-number). Data blocks of regular files are not shown; only the metadata inode is referenced.

## 9. The memory technique

**The hook**  
Picture an apartment building (inode) whose flats have numbers but no nameplates. The building directory at the entrance (directory file) lists “Alice – Flat 7B”. Changing the nameplate never moves Alice’s furniture.

**What to overlearn**  
- Inode stores everything except the name.  
- Link count must reach zero before reuse.  
- Path resolution is successive directory lookups starting from root or cwd.

**Spaced-repetition schedule**  
Review after 1 day, 3 days, 7 days, 16 days, 35 days using flashcards that ask “What does an inode not store?” and “When is an inode reused?”

**First-principles fallback**  
If you forget the link-count rule, re-derive from the invariant: “blocks must not be freed while any name still exists”; the only safe counter is the number of directory entries plus open descriptors.

## 10. What this unlocks
You can now reason about file allocation methods, journaling, and virtual file systems without hand-waving.  
- Next: contiguous, linked, and indexed allocation (how inodes point to blocks).  
- Next: VFS layer and how multiple file systems register their inode operations.  
- Next: `mmap` and the page-cache interaction with inode block pointers.  
- Next: crash-consistency techniques (ext4 journal, btrfs copy-on-write) that protect inode updates.

## 11. Self-check — five questions, no answers
1. After `ln a b` followed by `rm a`, does the data of inode 1234 disappear? Why or why not?  
2. A process opens “file.txt”, then another hard link is created and the original name is deleted. Can the first process still read the file?  
3. Why does `cd ..` sometimes not take you to the textual parent directory?  
4. On an ext4 file system, what happens to the link count when you create a symbolic link versus a hard link?  
5. Construct a scenario where `stat` reports link count 2 yet `ls` shows only one visible name; explain how this state arises.