## 1. The one-sentence answer
**Database indexes are auxiliary data structures that map key values to row locations so the engine can locate records without scanning every page.**

A B-tree index keeps keys sorted inside a balanced multi-way tree whose height grows only logarithmically with the number of rows; each internal node holds an ordered list of separators and child pointers, while leaf nodes contain the actual key–row-identifier pairs. A hash index replaces the tree with an array of buckets addressed by a hash function; equality probes become constant-time array accesses, but range scans become impossible without additional structures. Full-text indexes invert the usual mapping: instead of “row → words,” they store “word → list of rows and positions,” enabling ranked retrieval over natural-language content.

These three structures therefore solve three different access patterns that dominate real workloads: ordered range retrieval, exact-match lookup, and linguistic search.

> [!NOTE]
> The decisive engineering insight is that no single index structure is optimal for all three patterns; each trades one capability for another, forcing the designer to choose the structure that matches the dominant query shape.

## 2. Why this matters — concrete and current
PostgreSQL’s B-tree indexes underpin the query planner that serves billions of range-filtered rows per second at companies such as Instagram and Spotify when users scroll through chronologically ordered feeds.  

Google’s internal Spanner and F1 databases rely on hash-based indexes for the equality predicates that dominate primary-key lookups inside their globally distributed transaction logs; without constant-time bucket probes, cross-datacenter commit latency would rise by orders of magnitude.  

Elasticsearch’s inverted full-text indexes power the relevance scoring used by every major e-commerce site (Amazon, eBay) to answer free-text product searches; the same structure also appears in the Lucene-based index that Microsoft uses inside Azure Cognitive Search for legal-document discovery.  

Finally, the semiconductor design databases at TSMC and Intel employ B-tree indexes on coordinate ranges to answer “find all polygons inside this bounding box” queries during physical verification; a single missed index choice can extend tape-out schedules by days.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Disk page / block model  | Indexes are stored on disk; every node or bucket is one or more fixed-size pages whose I/O cost dominates runtime. |
| Logarithmic versus linear search | B-tree height is O(log n) while a full table scan is O(n); the difference is the entire reason indexes exist. |
| Hash function properties | Hash indexes rest on uniform distribution and determinism; collisions and load factor directly determine bucket-chain length. |
| Inverted-file posting lists | Full-text indexes are inverted indexes; understanding term → (docID, position) lists is required before ranking formulas make sense. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Keys must be ordered for range queries
A balanced tree stores keys in sorted order inside every node so that an inorder traversal yields the keys in ascending sequence.  
Example: keys 10, 20, 30 appear left-to-right in a leaf.  
Formally, for any internal node the separator keys satisfy \(k_1 < k_2 < \dots < k_m\) and every key in subtree \(i\) lies between \(k_{i-1}\) and \(k_i\).  
> [!WARNING]  
> If separators are allowed to be equal, the inorder property collapses and range scans may miss or duplicate rows.

### Step 2 — Balance guarantees logarithmic height
Each split or merge operation restores the invariant that all leaves reside at the same depth.  
Example: inserting into a full order-3 node causes a split that pushes the median upward, preserving height.  
Let \(n\) be the number of keys and \(d\) the minimum degree; height \(h\) satisfies \(h \le \log_d((n+1)/2)\).  
> [!WARNING]  
> Without the balance rule an adversarial insertion sequence can degenerate the structure into a linked list.

### Step 3 — Hash indexes trade ordering for constant-time equality
A hash function \(h(k)\) maps each key to a bucket index; the bucket holds a linked list or second-level structure of colliding keys.  
Example: \(h(42) \bmod 8 = 2\) places key 42 in bucket 2.  
Lookup cost is \(O(1 + \alpha)\) where \(\alpha\) is the load factor, provided \(h\) distributes keys uniformly.  
> [!WARNING]  
> Any range predicate forces a complete bucket scan because bucket addresses have no order relation.

### Step 4 — Full-text indexes invert the mapping
Instead of storing “row contains word,” the index stores “word occurs in row at position.”  
Example: the posting list for “database” might be \(\langle(17,3),(42,1),(42,5)\rangle\).  
Formally the index is a map \(w \mapsto \{(d_i,p_{i,j})\}\).  
> [!WARNING]  
> Without position information phrase queries (“database index”) cannot be answered.

### Step 5 — Textbook statement
A B-tree of order \(m\) on \(n\) keys supports search, insert, and delete in \(O(\log n)\) page I/Os while keeping all leaves at identical depth; a static hash index supports equality probes in expected \(O(1)\) I/Os provided load factor \(\alpha < 1\); an inverted full-text index supports term and phrase retrieval in time linear in the length of the relevant posting lists.

## 5. Worked examples — every step shown

**Example 1 — Single-key B-tree lookup**  
*Given:* B-tree of order 3 containing keys 10,20,30,40; search for 30.  
*Find:* leaf page containing 30.  
Step 1: root separators = [20,40] → 30 > 20 so descend right child.  
*Why:* separators partition the key space.  
Step 2: right child leaf = [30,40] → linear scan finds 30.  
*Why:* leaves store actual keys.  
**30 found in leaf 2**

*Reflection:* The height-1 walk already shows why only two page reads suffice regardless of table size.

**Example 2 — Hash index collision chain**  
*Given:* hash table with 4 buckets, \(h(k)=k \bmod 4\), keys 4,8,12 already inserted.  
*Find:* cost of looking up 16.  
Step 1: \(16 \bmod 4 = 0\) → bucket 0.  
*Why:* direct bucket address computation.  
Step 2: bucket 0 holds chain 4→8→12→∅; three comparisons required.  
*Why:* collisions lengthen the chain.  
**Three comparisons; load factor = 3/4**

*Reflection:* The example isolates the effect of clustering on probe length.

**Example 3 — Posting-list intersection for phrase query**  
*Given:* “quick brown” with positions  
quick: (1,1),(2,5)  
brown: (1,2),(2,3)  
*Find:* documents containing the phrase.  
Step 1: intersect docIDs → candidate doc 1 and 2.  
*Why:* phrase must occur inside same document.  
Step 2: inside doc 1, positions differ by 1 → match.  
*Why:* consecutive positions satisfy phrase adjacency.  
**Doc 1 matches**

*Reflection:* Position arithmetic turns an inverted index into a phrase engine.

**Example 4 — B-tree split on insert**  
*Given:* order-3 node [10,20,30] full; insert 25.  
*Find:* resulting nodes.  
Step 1: temporary node [10,20,25,30].  
*Why:* insert first, then restore invariants.  
Step 2: median 22.5 (rounded) = 25 pushed up; left [10,20], right [30].  
*Why:* split guarantees both new nodes have at least ⌈m/2⌉−1 keys.  
**Two new leaves plus separator 25 in parent**

*Reflection:* The split rule is the mechanical heart of logarithmic height.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using a hash index for a BETWEEN predicate | Hash buckets have no order; the planner falls back to a full scan | Declare a B-tree index whenever any range operator appears in the workload |
| Ignoring fill factor on B-tree leaf pages | Default 100 % fill factor causes immediate splits on every insert | Set fill factor 70–80 % on tables with high insert rates |
| Hash collisions under poor hash function | Non-uniform \(h(k)\) produces long chains | Use database-supplied hash or a proven universal hash family |
| Storing stop-words in full-text index | Common words dominate posting-list length and I/O | Maintain an explicit stop-word list and skip those tokens at index time |
| Updating an indexed column without updating statistics | Planner still believes old cardinality, chooses wrong index | Run ANALYZE (or equivalent) after bulk updates |
| Assuming hash index supports uniqueness | Hash table only guarantees bucket lookup, not global uniqueness | Enforce uniqueness with a B-tree or a separate unique constraint |
| Forgetting that full-text ranking needs document frequency | Raw term frequency alone over-values common words | Store and use IDF values when scoring |

## 7. The textbook-precise statement
A B-tree of order \(m\) is a search tree in which every internal node except the root has at least \(\lceil m/2\rceil\) children, every node has at most \(m\) children, and all leaves appear at the same level (Cormen et al., *Introduction to Algorithms*, 4e, §18). A static hash index with \(b\) buckets and load factor \(\alpha\) supports equality search in expected \(O(1+\alpha)\) I/Os when the hash function is uniform. An inverted index maps each term \(t\) to a posting list of pairs \((d,f_{d,t})\) where \(d\) is a document identifier and \(f_{d,t}\) its frequency; phrase queries are answered by positional intersection (Manning et al., *Introduction to Information Retrieval*, §2.4).

## 8. Visual — diagram or schematic
```text
B-tree order 4 (height 2)
          [  50  |  80  ]
         /       |       \
   [20|30|40] [55|60|70] [90|95]
   leaf       leaf       leaf
```
Hash index (4 buckets):
```
Bucket 0: 4→12→20
Bucket 1: 5→9
Bucket 2: 6
Bucket 3: 7→11→15
```
Full-text posting lists:
```
database → (17,3) (42,1) (42,5)
index    → (42,2) (17,7)
```

## 9. The memory technique
1. **The hook** — picture a library card catalog: B-tree is the ordered drawer of author cards you can flip through, hash index is the coat-check number that sends you straight to one hook, full-text index is the back-of-book index that lists every page mentioning “algorithm.”  
2. **What to overlearn** — B-tree height formula \(h \le \log_d((n+1)/2)\), hash probe cost \(O(1+\alpha)\), posting-list intersection for phrase queries.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — start from “I need to find a key without reading every page,” derive the need for a tree or hash address, then add balance or collision handling.

## 10. What this unlocks
Mastery of these three index structures lets you read any query plan, choose the correct index type for a workload, and understand why certain schema changes destroy performance.  

- Next: covering indexes and index-only scans  
- Composite B-tree keys and their ordering rules  
- Bitmap indexes for low-cardinality columns  
- LSM-tree indexes used by modern key-value stores (RocksDB, LevelDB)

## 11. Self-check — five questions, no answers
1. Why does a hash index never appear in the execution plan for a query containing `col BETWEEN 10 AND 20`?  
2. A B-tree leaf page of order 100 holds 80 keys; after three successive inserts that each cause a split, what is the new minimum number of keys in the original leaf?  
3. Given posting lists `A: (1,1)(2,3)(3,2)` and `B: (2,4)(3,1)(3,3)`, which documents contain the phrase “A B”?  
4. If the load factor of a hash index rises above 0.9, what concrete change occurs in the number of I/Os for an equality probe?  
5. A table has 10 million rows and a B-tree index on column `created_at`. The planner chooses a sequential scan for `WHERE created_at > '2024-01-01'`. Name the single most likely missing piece of information that caused this choice.