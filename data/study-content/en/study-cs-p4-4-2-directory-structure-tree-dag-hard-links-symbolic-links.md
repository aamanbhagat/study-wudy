## 1. The one-sentence answer
**Directory structures in operating systems begin as trees but become directed acyclic graphs once hard links are introduced, while symbolic links add arbitrary pointers that may create cycles.**

A directory is a mapping from names to file identifiers. In the absence of extra mechanisms, each file has exactly one parent directory, so the structure is a tree rooted at the file-system root. Adding a hard link creates a second name that points to the same underlying file object; the resulting graph now contains a node with in-degree greater than one, turning the structure into a DAG.

Symbolic links differ because they store a path string rather than a direct identifier. Following a symbolic link is a separate lookup step that can point outside the current subtree or even create a cycle if the target eventually refers back to the link itself. Consequently, file-system traversals must treat hard links as graph edges and symbolic links as potentially cyclic references.

> [!NOTE]
> The decisive distinction is that hard links increase the reference count of an inode and preserve acyclicity, whereas symbolic links are independent path strings whose resolution can introduce cycles or dangling targets.

## 2. Why this matters — concrete and current
In the Linux kernel’s ext4 file system, hard links allow multiple package-manager entries (for example, /usr/bin/python3 and /usr/bin/python) to share a single inode, reducing storage overhead and guaranteeing atomic updates when the binary is replaced. NASA’s Perseverance rover flight software stores configuration tables under several directory aliases via hard links so that both the boot loader and the science-application layer can reference the same immutable data without duplication.

Modern container runtimes such as Docker rely on union file systems whose layers are mounted via symbolic links; a misconfigured symlink can cause the container’s root file system to traverse outside its intended namespace, exposing host paths. Git’s object store uses hard links during repository clones on the same volume to avoid copying identical blobs, an optimisation that fails if the file system does not preserve inode reference counts correctly.

In cloud object-storage gateways that emulate POSIX semantics (for example, AWS EFS), the distinction between hard and symbolic links determines whether a rename operation is atomic across multiple client mounts; incorrect handling produces data races observed in production traces published by AWS in 2022.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Inode / file identifier  | Hard links share the same inode; directories map names to inodes |
| Path-name resolution     | Symbolic links require an extra lookup step during traversal |
| Graph reachability       | DAG property guarantees no cycles; cycles break traversal algorithms |
| Reference counting       | Determines when a file’s storage may be reclaimed         |

## 4. Building the idea — from intuition to formalism

### Step 1 — Directories map names to identifiers
A directory is simply a set of (name, identifier) pairs. In the simplest case each identifier appears in exactly one directory, producing a tree.

Example: the directory “/home” contains the single entry (“alice”, 42). No other directory contains identifier 42.

Formally, let \(D\) be the set of directories and \(I\) the set of file identifiers. A directory function \(\delta: D \times \text{Name} \to I\) is injective in its second argument for each fixed directory.

> [!WARNING]
> Treating the mapping as a total function rather than a partial one hides the possibility of missing names and leads to incorrect “file not found” handling.

### Step 2 — Files are referenced by inodes
Each identifier in \(I\) corresponds to an inode that stores metadata and points to data blocks. At this stage the structure remains a tree because each inode has exactly one incoming directory entry.

### Step 3 — Hard links duplicate directory entries
A hard link adds another (name, inode) pair that points to an already referenced inode. The inode now has in-degree two while the graph stays acyclic.

Example: after `ln /home/alice/report /home/bob/report`, inode 42 appears in both “/home/alice” and “/home/bob”.

Formally the directory relation becomes a function from names to inodes whose inverse image may contain multiple names.

> [!WARNING]
> Forgetting to increment the inode link count on hard-link creation produces premature deletion when the first name is removed.

### Step 4 — The structure is now a DAG
Because multiple paths may reach the same inode, the containment relation is a directed acyclic graph rather than a tree. Reachability is still well-defined and topological order exists.

### Step 5 — Symbolic links store path strings
A symbolic link is an inode whose data is a byte string interpreted as a path. Resolution substitutes the string and continues the lookup, possibly crossing device boundaries or returning to an ancestor.

### Step 6 — Cycles appear only with symbolic links
Hard links cannot create cycles because they increase in-degree without adding new edges in the containment graph. Symbolic links can close a cycle when a resolved path eventually refers back to an ancestor directory.

### Step 7 — Formal statement
A file-system directory structure is a DAG whose nodes are inodes and whose edges are hard-link directory entries; symbolic links constitute a separate, possibly cyclic, string-rewriting relation resolved at lookup time.

## 5. Worked examples — every step shown

**Example 1 — Creating a hard link**
- *Given:* Empty directory “/dir” and file “/dir/a” with inode 7 (link count 1).
- *Find:* Effect of `ln /dir/a /dir/b`.
- Create new directory entry (“b”, 7).  
  *Why* — hard link adds a name-to-inode mapping.
- Increment inode 7’s link count to 2.  
  *Why* — reference count tracks live names.
- Result: two paths reach inode 7; structure remains a DAG.

**Final answer**  
Inode 7 link count = 2; “/dir” now contains two entries for the same inode.

*Reflection* — the example isolates the reference-count update that many implementations forget.

**Example 2 — Removing one hard link**
- *Given:* Same state as above.
- *Find:* Effect of `rm /dir/a`.
- Decrement link count to 1.  
  *Why* — removal only affects the count, not the inode itself.
- Inode 7 remains reachable via “/dir/b”.

**Final answer**  
File data survives until link count reaches zero.

*Reflection* — deletion semantics are governed by the count, not by directory presence.

**Example 3 — Symbolic link traversal**
- *Given:* “/etc” contains symlink “conf” → “/home/alice/.config”.
- *Find:* Path resolution of “/etc/conf/app.cfg”.
- Read symlink target string.  
  *Why* — symbolic link supplies a fresh path.
- Continue lookup from root using the new path.  
  *Why* — resolution restarts at the indicated location.

**Final answer**  
Resolved path = “/home/alice/.config/app.cfg”.

*Reflection* — each symbolic link may add an arbitrary number of lookup steps.

**Example 4 — Cycle detection**
- *Given:* Symlink “/loop” → “/loop”.
- *Find:* Result of `ls /loop`.
- Resolver follows the link, obtains “/loop”, follows again.  
  *Why* — the string substitution returns to the same component.
- After a system-defined limit the resolver returns ELOOP.

**Final answer**  
Lookup fails with ELOOP; no infinite kernel loop occurs.

*Reflection* — the safeguard is a bounded recursion depth, not graph acyclicity.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Assuming every directory tree is acyclic after adding links | Hard links preserve acyclicity; symbolic links do not | Distinguish the two mechanisms in mental model |
| Forgetting to increment link count on hard link | Implementation reuses tree code without inode update | Always pair directory entry creation with count increment |
| Treating `..` as a symbolic link | `..` is a hard link to the parent inode     | Remember that `..` is an ordinary directory entry |
| Deleting a symlink instead of its target | `rm` operates on the link inode, not the target | Use `rm -f` only after confirming link type with `test -L` |
| Allowing unbounded symlink recursion | Resolver lacks depth counter                | Enforce a small constant (e.g., 40) on symlink following |
| Renaming across hard-link boundaries | Inode may become unreachable if count not managed | Check that rename preserves at least one name |
| Mounting a file system that already contains hard links to inodes outside the mount | Mount point hides the original inode        | Use bind mounts or overlay semantics explicitly |

## 7. The textbook-precise statement
A file-system directory hierarchy is a finite rooted DAG \(G = (I, E)\) where \(I\) is the set of inodes and each edge \((i_1, i_2) \in E\) corresponds to a directory entry in inode \(i_1\) that names inode \(i_2\). Hard links correspond exactly to multiple outgoing edges from distinct parents to the same child. Symbolic links are a separate function \(\sigma: I \to \text{String}\) whose resolution is performed by path-name expansion outside the graph \(G\). The structure \(G\) remains acyclic by construction; cycles can arise only in the transitive closure of \(\sigma\). (Tanenbaum & Bos, *Modern Operating Systems*, 4e, §4.3.2.)

## 8. Visual — diagram or schematic
```text
Root inode 1
├── dirA (inode 2)
│   └── fileX (inode 10)  <-- hard link also from dirB
└── dirB (inode 3)
    └── fileX (inode 10)  <-- second hard-link edge
        ↑
symlinkY (inode 11) ──→ "/dirA/fileX"   (string, not graph edge)
```
The solid arrows are hard-link directory entries forming a DAG. The dashed arrow is a symbolic link whose target is a path string.

## 9. The memory technique
1. **The hook** — picture a city map where streets are hard links (multiple roads can reach the same house) and signposts are symbolic links (a sign may point to another sign that eventually points back to itself).
2. **What to overlearn** — hard link increments inode reference count and never creates cycles; symbolic link stores a path string resolved at lookup time.
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — rebuild from the inode reference-count invariant and the separate string-substitution rule for symbolic links.

## 10. What this unlocks
Understanding directory graphs prepares the reader for file-system implementation details such as directory caching, link-count garbage collection, and loop detection in distributed file systems.

- Next: inode allocation and block-pointer structures
- Next: VFS layer abstractions that hide hard versus symbolic distinctions
- Next: union-mount and overlay file-system semantics

## 11. Self-check — five questions, no answers
1. Why can a hard link never produce a cycle while a symbolic link can?
2. After executing `ln file link; rm file`, is the data still reachable? Through which name?
3. In a DAG directory structure, what is the maximum number of distinct paths from the root to a given inode?
4. What kernel data structure must be consulted to decide whether `rm` should decrement an inode’s link count or merely remove a directory entry?
5. Suppose a symbolic link points to a hard-linked file that has two other hard links. How many directory entries must be removed before the underlying data blocks are freed?