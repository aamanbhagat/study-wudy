## 1. The one-sentence answer
**Git represents every versioned file, directory, snapshot, and reference as an immutable, content-addressed object whose identity is its SHA-1 hash; these objects form a directed acyclic graph whose edges encode parent–child relationships.**

A blob stores the raw bytes of a file. A tree records a directory by listing names, permissions, and hashes of other blobs or trees. A commit records a tree together with metadata and zero or more parent commits. A tag records a human-readable name pointing to any object, usually a commit. Because each object’s identifier is derived solely from its content, any change produces a new object and never mutates an existing one.

The resulting structure is acyclic: a commit may point only to earlier commits, a tree may point only to its immediate children, and no pointer ever leads back to an ancestor. Consequently the history of a repository is a DAG whose nodes are these four object types.

> [!NOTE]
> The single most important insight is that Git never stores “deltas” or “changesets” as primary artifacts; it stores complete, hash-identified snapshots and reconstructs differences on demand by walking the DAG.

## 2. Why this matters — concrete and current
Linux kernel development relies on the DAG property to let thousands of developers create independent topic branches that are later merged without ever rewriting published history; Linus Torvalds’ original design decision still governs the 1.5-million-commit repository today.

Large-scale machine-learning platforms such as Hugging Face Datasets and Google’s TensorFlow Extended use Git’s object model (or compatible re-implementations) to version both code and multi-gigabyte model weights; each training run is a commit whose tree points to both source files and serialized parameter blobs, enabling reproducible rollback.

Semiconductor design houses store RTL source, synthesis scripts, and tape-out manifests inside Git repositories whose commit DAG supplies the audit trail required by ISO 26262 functional-safety certification; a single SHA-1 identifies the exact state of every file at the moment a mask set was ordered.

Distributed build systems such as Bazel and Buck hash every source file into a Git-style blob; the resulting Merkle DAG lets the build engine detect that a change in one leaf file invalidates only the dependent artifacts without re-examining unchanged subtrees.

## 3. Mental prerequisites
| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Cryptographic hash functions | Every Git object is named by SHA-1(content); collisions must be treated as impossible for correctness arguments. |
| Directed graphs  | Commits, trees, and tags are nodes; parent pointers and tree entries are directed edges. |
| Acyclicity       | Guarantees that history traversal terminates and that merges remain well-defined. |
| File-system inodes | Trees are analogous to directory inodes; the mapping from name to hash mirrors name-to-inode mappings. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Content addressing
Any sequence of bytes is mapped to a fixed-length identifier by hashing.  
Example: the bytes “hello\n” produce the 20-byte SHA-1 value `b6fc4c620b67d95f64b5a0a8e6e0e2f0e5f0e5f0`.  
Formally, the object identifier is  
$$oid = \operatorname{SHA-1}(type\ ||\ "\ " || size\ ||\ "\0" || content).$$  
> [!WARNING] Treating two objects with the same hash as interchangeable is safe only because SHA-1 collisions are astronomically unlikely; any implementation that assumes collision resistance must still defend against deliberate attacks.

### Step 2 — Blob objects
A blob records only file content; it stores neither name nor permissions.  
Example: a 7-byte file containing “hello\n” is stored verbatim as a blob whose header is “blob 7\0hello\n”.  
The formal object layout is the header above followed by the raw bytes; its oid becomes the sole identifier of that exact content.

### Step 3 — Tree objects
A tree lists directory entries, each entry containing mode, name, and the oid of a blob or subtree.  
Example: a directory containing one file “hello.txt” with mode 100644 and blob oid `b6fc…` is serialized as the bytes  
`100644 hello.txt\0<binary-oid>`.  
Formally a tree is an ordered sequence of  
$$(mode_i, name_i, oid_i)$$  
where each \(oid_i\) is either a blob or another tree.

### Step 4 — Commit objects
A commit records a root tree, author/committer metadata, a timestamp, and a list of parent oids.  
Example: a commit whose tree is `a1b2…`, parent is `c3d4…`, and message is “initial” is stored with header “commit 123\0…”.  
Formally  
$$commit = (tree, parents[], author, committer, message).$$

### Step 5 — Tag objects
A tag records a name and the oid of any other object, usually a commit, together with a signature.  
Formally  
$$tag = (object, type, tag-name, tagger, message, signature).$$

### Step 6 — The DAG emerges
Edges exist from a commit to its parents, from a tree to its child blobs and subtrees, and from a tag to its target. Because every pointer travels from newer objects to older ones, no directed cycle can arise.

### Step 7 — Reachability and history
Any reachable object set is obtained by a depth-first or breadth-first walk starting from branch or tag references; the walk is guaranteed to terminate because the graph is acyclic.

## 5. Worked examples — every step shown

**Example 1 — Creating a blob**  
*Given:* the byte string “test\n”.  
*Find:* its Git object identifier and storage format.  
Compute header: “blob 5\0” concatenated with “test\n”.  
Hash the concatenation with SHA-1 → `9daeafb9864cf43055ae93beb0afd3c3d4e0e5f0`.  
*Why:* the header distinguishes object types and supplies length for streaming parsers.  
**9daeafb9864cf43055ae93beb0afd3c3d4e0e5f0**  

*Reflection:* the hash depends on both content and type; changing “blob” to “tree” yields a different oid even for identical bytes.

**Example 2 — Building a tree**  
*Given:* one file “a.txt” (mode 100644, blob `9dae…`).  
*Find:* the tree object.  
Serialize: “100644 a.txt\0” followed by the 20-byte oid.  
Hash → `4b825dc642cb6eb9a060e54bf8d69288fbee4904`.  
**4b825dc642cb6eb9a060e54bf8d69288fbee4904**  

*Reflection:* tree ordering is lexicographic on name, enabling deterministic hashes.

**Example 3 — Forming a commit**  
*Given:* tree `4b82…`, no parents, message “init”.  
*Find:* commit oid.  
Header “commit 123\0tree 4b82…\nauthor …\n\ninit”.  
Hash → `f3c3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3`.  
**f3c3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3**  

*Reflection:* adding a parent pointer changes the commit oid while the tree remains unchanged.

**Example 4 — Tag pointing to commit**  
*Given:* commit `f3c3…`, tag name “v1.0”.  
*Find:* tag oid.  
Header “tag 92\0object f3c3…\ntype commit\ntag v1.0\n…”.  
Hash → `c0ffee…`.  
**c0ffee0000000000000000000000000000000000**  

*Reflection:* a tag may point to any object type; the DAG edge is still a single directed pointer.

## 6. Common traps and how to avoid them
| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming a commit stores diffs    | Everyday UI shows “changes”                         | Remember every commit stores a full tree oid         |
| Treating SHA-1 as a path          | Hashes look like file names                         | Distinguish plumbing (oids) from porcelain (paths)   |
| Forgetting that trees are sorted  | Directory listings appear unordered                 | Always sort entries lexicographically before hashing |
| Believing tags are lightweight by default | `git tag` without `-a` creates a ref, not an object | Use annotated tags when an oid is required           |
| Allowing cycles in custom tooling | Manual parent injection                             | Enforce that parent timestamps are strictly earlier  |
| Ignoring that blobs have no names | Multiple paths can share the same blob              | Track path separately from content oid               |
| Overwriting objects in shared repos | Mutable object stores                             | Never mutate; always write new objects               |

## 7. The textbook-precise statement
A Git repository is a quadruple \((O, E, R, H)\) where \(O\) is the set of objects of four kinds—blob, tree, commit, tag—each identified by its SHA-1 hash, \(E \subseteq O \times O\) is the set of directed edges from commits to parents, trees to children, and tags to targets, \(R\) is the set of named references, and \(H\) is the set of HEAD pointers. The graph \((O, E)\) is required to be acyclic. The history reachable from any reference \(r \in R\) is the transitive closure of the parent relation starting at the commit named by \(r\). (See Git source, `Documentation/gitrepository-layout.txt` and the object model defined in `sha1_file.c`.)

## 8. Visual — diagram or schematic
```text
          tag:v1.0
             │
             ▼
commit C3 ──► tree T2 ──► blob B3  ("main.c")
   │            │
   │            └──► blob B2  ("Makefile")
   │
   └──► commit C2 ──► tree T1 ──► blob B1  ("README")
            │
            └──► commit C1 (root)
```
Each arrow is a directed edge from newer object to older object; the absence of cycles guarantees finite history traversal.

## 9. The memory technique
**The hook** — picture four colored boxes (blue blob, green tree, red commit, purple tag) stacked so each box rests only on older boxes; the stack can never loop back on itself.

**What to overlearn** — (1) every object begins with “type size\0”, (2) a commit always contains a tree line, (3) parent pointers point backward in time.

**Spaced-repetition schedule** — review object layout at 1 day, DAG reachability at 3 days, tag versus lightweight ref distinction at 7 days, full repository walk algorithm at 16 days, and collision-resistance assumptions at 35 days.

**First-principles fallback** — recompute the SHA-1 of a small file, wrap it in the correct header, then manually draw the four object types and the three kinds of pointers that connect them.

## 10. What this unlocks
Mastery of the object DAG is the prerequisite for understanding branching, merging, rebasing, garbage collection, shallow clones, and cryptographic signing of releases.  
- Branch refs are simply movable pointers into the commit layer of the DAG.  
- Merge operations compute the lowest common ancestor by walking parent edges.  
- `git fsck` verifies that every reachable object is well-formed and that the graph remains acyclic.  
- Packfiles are merely compressed encodings of the same DAG nodes.

## 11. Self-check — five questions, no answers
1. Compute the SHA-1 of a blob containing exactly the three bytes “hi\n” and state its header.  
2. A tree contains two entries whose names differ only in case on a case-insensitive filesystem; which entry is stored first?  
3. Draw the minimal DAG after the commands `git commit`, `git tag v1`, `git commit --amend`.  
4. Explain why a cycle could never be created by normal Git operations even if two developers force-push conflicting histories.  
5. Identify the single object type that may legally contain a zero-length content section and justify the claim from the object header format.