## 1. The one-sentence answer
**B-trees and B+ trees are balanced multiway search trees engineered to minimise the number of disk-block transfers required for search, insert and delete operations on secondary storage.**

Disk accesses dominate runtime once data no longer fits in RAM. A binary tree of one million nodes can require up to twenty separate block reads; a B-tree of the same size with branching factor 100 needs only three or four. The entire design—node size, minimum occupancy, and leaf placement—exists to keep that number small while preserving logarithmic height and ordered access.

B+ trees further separate navigation keys from record data so that all records reside in the leaves and internal nodes contain only routing information. This layout yields both efficient range scans (leaves form a linked list) and higher fan-out in the upper levels.

> [!NOTE]
> The decisive “aha” is that disk cost is measured in block transfers, not comparisons; once you accept that metric, every other property follows directly from the arithmetic of block size versus record size.

## 2. Why this matters — concrete and current
PostgreSQL’s default index type is a B+ tree; every primary-key lookup, foreign-key join and range scan on a table larger than a few megabytes traverses these structures. The same structure appears inside the storage engine of MySQL’s InnoDB, MongoDB’s WiredTiger, and Microsoft SQL Server.

Google’s Bigtable and its descendants (Cassandra, HBase) store sorted string tables on disk using a B-tree-like merge-tree variant; the fan-out is tuned so that a single tablet server can answer a point query with two or three disk seeks even when the tablet holds terabytes.

Modern NAND flash controllers inside SSDs maintain a B+ tree (or log-structured merge tree) over logical-to-physical block mappings; each write amplification reduction directly extends device lifetime and is measured in the firmware papers of Samsung and Micron.

The Linux ext4 and XFS file-system inode and extent maps are implemented with B+ trees; a single file-system mount can contain hundreds of millions of extents, yet directory lookup and block allocation remain sub-millisecond because height stays below five.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Disk block / page        | All I/O occurs in fixed-size blocks; node size is chosen to match one block. |
| Balanced tree height     | Guarantees O(log n) block accesses regardless of insertion order. |
| Multiway (m-ary) node    | One node can contain many keys, producing the high fan-out required for low height. |
| Pointer vs. key cost     | On disk the dominant cost is the pointer to the next block, not the comparison inside RAM. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Binary trees become too tall on disk
A binary search tree of n keys has height Θ(log₂ n). With a typical disk block holding 4 KiB and each key-plus-pointer pair occupying 16 bytes, only 256 keys fit in one block; a million-record tree still requires roughly 20 block reads.

### Step 2 — Replace binary nodes with multiway nodes
Let each node hold up to m−1 keys and m child pointers. The same million keys now occupy a tree of height Θ(logₘ n). Choosing m ≈ 256 reduces height to three or four, cutting I/O by a factor of five.

### Step 3 — Enforce minimum occupancy to keep the tree balanced
Every node except the root must contain at least ⌈m/2⌉−1 keys. This rule prevents degenerate skinny trees and guarantees that every leaf lies at the same depth.

### Step 4 — All leaves appear at identical depth
Because splits and merges propagate upward only when occupancy bounds are violated, the height remains uniform. Consequently search cost is exactly h block reads where h = ⌈logₘ((n+1)/2)⌉.

### Step 5 — B+ tree variant stores records exclusively in leaves
Internal nodes contain only separator keys; actual data records sit in the leaf level. Leaves are additionally linked, enabling O(n) range scans with sequential block reads.

### Step 6 — Formal definition of a B-tree of order m
A B-tree of order m satisfies:
- every node has at most m children,
- every non-root, non-leaf node has at least ⌈m/2⌉ children,
- the root has at least two children unless it is a leaf,
- all leaves appear at the same level,
- an internal node with k children contains exactly k−1 keys.

## 5. Worked examples — every step shown

**Example 1 — Height calculation**  
*Given:* One million 64-byte records, 4 KiB blocks, B-tree of order 256.  
*Find:* Minimum number of block accesses for a successful search.  
Step 1: Maximum keys per node = 255.  
*Why* — 256 pointers leave 255 key slots inside 4 KiB.  
Step 2: Height h satisfies 1 + 255 + 255·255 + … + 255ʰ⁻¹ ≥ 1 000 000.  
*Why* — Each level multiplies the reachable keys by at most 255.  
Step 3: 1 + 255 + 255² = 65 536, 1 + 255 + 255² + 255³ = 16 777 216 > 1 000 000.  
*Why* — Summation reaches the required cardinality at h = 4.  
**Answer: 4 block accesses.**

*Reflection* — The calculation shows why fan-out dominates; doubling m halves the height.

**Example 2 — Node split on insert**  
*Given:* A full leaf node containing keys 10,20,…,500 (255 keys). Insert 275.  
*Find:* Resulting nodes after split.  
Step 1: Temporary list has 256 keys; median is the 128th key (value 260).  
*Why* — Order m = 256 requires split at ⌈m/2⌉ = 128.  
Step 2: Left node receives keys 10…250 (127 keys), right receives 270…500 (128 keys).  
*Why* — Minimum occupancy ⌈m/2⌉−1 = 127 is satisfied.  
Step 3: Parent receives separator 260 and two child pointers.  
*Why* — The median ascends; both new leaves remain valid.  
**Answer:** Two leaves of 127 and 128 keys plus an inserted separator.

*Reflection* — The split rule guarantees both children obey the occupancy invariant.

**Example 3 — B+ tree range scan**  
*Given:* Leaf level linked list: [10|20] ↔ [30|40] ↔ [50|60].  
*Find:* All keys in [25,55].  
Step 1: Search internal index reaches first leaf containing 30.  
*Why* — Internal separators direct to the correct leaf.  
Step 2: Follow sibling pointers, collecting 30,40,50.  
*Why* — Linked leaves give sequential I/O.  
**Answer:** Records 30,40,50 returned after three block reads.

*Reflection* — B+ trees convert an arbitrary range query into a short descent plus a linear leaf walk.

**Example 4 — Underflow and merge**  
*Given:* Two sibling leaves each holding the minimum 127 keys; delete the last key from the left leaf.  
*Find:* Tree after rebalancing.  
Step 1: Left leaf now has 126 keys → underflow.  
*Why* — Occupancy rule violated.  
Step 2: Merge with right sibling yields one node of 252 keys.  
*Why* — 126 + 127 − 1 (separator removed) = 252 ≤ 255.  
Step 3: Remove the separator from the parent.  
*Why* — The merged node replaces two children.  
**Answer:** One leaf of 252 keys; parent loses one key and one pointer.

*Reflection* — Merge restores both balance and occupancy with a single block write.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating B-tree height as log₂ n | Confuses binary and multiway branching | Always compute height with base m, not 2. |
| Forgetting that root may have fewer than ⌈m/2⌉ children | Root split rule is special | Check root occupancy separately in every algorithm. |
| Storing records inside internal nodes of a B+ tree | Mixing B-tree and B+ tree layouts | Keep data exclusively in leaves; internal nodes hold only separators. |
| Ignoring block-alignment padding | Assuming every key-pointer pair occupies exactly the calculated bytes | Measure actual on-disk node size including alignment and header. |
| Assuming deletions never increase height | Height only shrinks when root becomes empty | Track root underflow explicitly. |
| Using the same order m for both B-tree and B+ tree | B+ trees lose one pointer per internal node | Choose a slightly larger m for B+ trees to compensate. |
| Believing sequential leaf links remove all random I/O | Links still require pointer chasing between non-contiguous blocks | Prefetch entire leaf runs when possible. |

## 7. The textbook-precise statement
A B-tree of order m is a search tree in which  
- every internal node except the root has between ⌈m/2⌉ and m children,  
- the root has between 2 and m children (unless the tree has fewer than two keys),  
- every node with k children contains exactly k−1 keys,  
- all leaves are on the same level.  

Search, insert and delete each perform O(log_m n) block transfers.  
(Cormen et al., *Introduction to Algorithms*, 4e, Chapter 18.)

A B+ tree augments the above by storing all records in the leaves; internal nodes contain only copies of the smallest key in each child subtree and leaves are chained by sibling pointers.

## 8. Visual — diagram or schematic
```text
                [  50  |  150  ]
               /       |        \
      [ 20 | 40 ]  [ 70 | 120 ]  [ 200 | 300 ]
     /    |    \    /    |    \    /     |     \
   L1   L2   L3  L4   L5   L6  L7    L8    L9
```
- Internal nodes hold separators only.  
- Each Li is a leaf block containing up to 255 records.  
- Height = 2, three block reads suffice for any key.

## 9. The memory technique

**The hook**  
Picture a filing cabinet whose drawers (nodes) each hold 255 folders; you only ever open three drawers to reach any document.

**What to overlearn**  
- Minimum occupancy = ⌈m/2⌉−1 keys per non-root node.  
- Height h ≈ log_m((n+1)/2).  
- B+ leaves are linked; B-tree leaves are not.

**Spaced-repetition schedule**  
Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days after first study.

**First-principles fallback**  
Re-derive height from the geometric series 1 + (m−1) + (m−1)² + … until the sum exceeds n.

## 10. What this unlocks
Mastery of B-trees directly enables understanding of log-structured merge trees, database buffer-pool management, file-system extent trees and external-memory sorting algorithms.

- Next: B-tree concurrency (latch coupling, blink trees).  
- Next: LSM-tree write amplification analysis.  
- Next: External-memory model (Aggarwal–Vitter).  
- Next: R-trees and other spatial multiway trees.

## 11. Self-check — five questions, no answers
1. A B-tree of order 100 contains 999 999 keys. What is the maximum possible height?  
2. After inserting a key that causes three successive splits, how many new blocks are allocated?  
3. In a B+ tree, why does increasing block size improve range-scan throughput more than point-query latency?  
4. Identify the invariant violated when a node ends an insert with exactly ⌈m/2⌉−2 keys.  
5. A deletion removes the last key from the root’s only child; what structural change occurs?