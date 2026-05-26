## 1. The one-sentence answer
**Indexing creates auxiliary data structures that let a database locate rows without scanning every record.**

B-tree indexes organise data in a balanced tree so range queries and ordered access stay fast even when the table grows to millions of rows. Hash indexes map keys directly to storage locations through a hash function and therefore answer equality lookups in constant time, but they cannot help with ranges. Full-text indexes invert the usual row-to-word relationship: they store postings lists that record exactly which documents contain each term, enabling rapid keyword and phrase searches.

The core engineering tension is always the same: every index speeds up some operations while adding cost to inserts, updates, and storage. Choosing the right index therefore reduces to matching the dominant query pattern against the access guarantees each structure provides.

> [!NOTE]
> The single most important realisation is that an index never changes what the data is; it only changes the path the engine takes to reach the data. Once you internalise this, every later decision about index type, width, and maintenance becomes an exercise in cost modelling rather than magic.

## 2. Why this matters — concrete and current
PostgreSQL uses B-tree indexes as the default for every primary key and for the majority of foreign-key joins; its query planner will refuse a range predicate on an unindexed column once the table exceeds a few hundred thousand rows, exactly as observed in production telemetry from companies running SaaS billing systems.

MongoDB’s hashed shard keys rely on hash indexes to distribute documents evenly across shards; without them, a monotonically increasing ObjectId would concentrate all new inserts on a single shard and create hotspots that have been documented in high-throughput IoT workloads.

Elasticsearch builds inverted full-text indexes on every analysed field; the same postings-list structure powers both simple keyword search in GitHub code search and the more complex BM25 scoring used inside academic paper-retrieval systems such as Semantic Scholar.

Google’s Spanner and Amazon Aurora both maintain B-tree-backed secondary indexes that are updated transactionally; the durability guarantees described in the original Spanner OSDI paper depend on the fact that each index modification is itself a logged write that participates in the same two-phase commit as the base table row.

In semiconductor fabrication databases at TSMC, full-text indexes on process-log tables allow engineers to locate every wafer lot that ever contained a particular defect keyword within milliseconds instead of hours of sequential scans.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Balanced search trees    | B-trees guarantee logarithmic height regardless of inserts |
| Hash functions & collisions | Hash indexes map keys to buckets; collisions must be resolved |
| Inverted index / postings | Full-text search stores term-to-document mappings         |
| Page / block I/O model   | All three structures are designed around disk-page reads  |
| ACID write-ahead logging | Index modifications must be durable and atomic            |

If any row is missing, pause and read the corresponding prerequisite section first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Why a naïve scan fails at scale
A table with N rows stored in heap order forces every lookup to examine N pages in the worst case. When N reaches 10^7 and each page holds roughly 100 rows, a single lookup already costs 10^5 random I/Os—far beyond acceptable latency.

### Step 2 — Tree organisation reduces height
A balanced m-way tree keeps height at ⌈log_m (N+1)⌉. For m = 100 and N = 10^7 the height is only three or four pages, turning a linear scan into a handful of random reads.

### Step 3 — B-tree invariants enforce balance
Every internal node except the root must contain at least ⌈m/2⌉−1 keys; every leaf appears at the same depth; pointers between sibling leaves enable efficient range scans. These rules together guarantee that rebalancing after an insertion touches O(log N) nodes rather than rebuilding the entire structure.

### Step 4 — Hash index trades ordering for constant time
A hash function h(k) maps a search key directly to a bucket address. When the load factor stays below 0.7 and chaining or open addressing resolves collisions, expected lookup cost is O(1) page reads, but the loss of order means range predicates become impossible without a second structure.

### Step 5 — Inverted index for text
A full-text index stores, for each distinct term t, an ordered list of (documentID, position) pairs. Intersection of two such postings lists yields documents containing both terms; the cost is proportional to the sum of the list lengths rather than the corpus size.

### Step 6 — Cost model formalises the trade-off
Let C_r be the cost of a random page read, C_w the cost of a page write, and f the fan-out. The expected cost of a B-tree equality probe is approximately (log_f N)·C_r, while a hash probe costs roughly C_r when the bucket fits in one page. Insert cost for a B-tree is (log_f N)·(C_r+C_w) plus occasional split overhead; a hash insert is C_w plus possible bucket extension.

### Step 7 — Textbook-grade statement
A B-tree of order m on a file of N keys satisfies: every node has between ⌈m/2⌉−1 and m−1 keys; all leaves are at depth d = ⌈log_m ((N+1)/2)⌉; the tree therefore supports search, insert, and delete in O(log N) I/O operations (Ramakrishnan & Gehrke, Database Management Systems, 3e, §10.3).

## 5. Worked examples — har step show karo

**Example 1 — Minimal B-tree insert**
*Given:* Empty B-tree of order 3; insert key 10.
*Find:* Final tree shape after insertion.
Step 1: Root is created as a leaf containing [10].  
*Why:* First key always becomes the root leaf.  
**Final tree:** single leaf node [10]

**Example 2 — B-tree split on overflow**
*Given:* Order-3 B-tree containing [10 | 20]; insert 30.  
*Find:* Result after split.  
The leaf overflows (three keys). Median 20 is promoted; two leaves [10] and [30] remain.  
*Why:* Promotion restores the “at most m−1 keys” invariant.  
**Final tree:** root [20], leaves [10] and [30]

**Example 3 — Hash index lookup with chaining**
*Given:* Hash function h(k)=k mod 4; buckets 0–3 initially empty; insert 7, 15.  
*Find:* Bucket contents for lookup of 15.  
h(7)=3, h(15)=3. Both land in bucket 3 and are chained. Lookup follows the chain until 15 is found.  
*Why:* Collision resolution preserves O(1) expected cost.  
**Final answer:** bucket 3 contains list 7 → 15

**Example 4 — Full-text postings intersection**
*Given:* Term “database” → [(doc1,3),(doc2,1),(doc4,5)]; term “index” → [(doc2,2),(doc3,4),(doc4,1)].  
*Find:* Documents containing both terms.  
Intersect the two sorted lists on documentID: only doc2 and doc4 survive.  
*Why:* Intersection is linear in the shorter list length.  
**Final answer:** documents 2 and 4

*Reflection:* Each example isolates one mechanical rule—split, collision handling, or list intersection—so the same rule can be reused when parameters grow.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Creating an index on every column | Over-generalisation of “indexes are always faster”  | Measure query workload first; add only for predicates that appear in WHERE/JOIN/ORDER BY |
| Hash index on a range column      | Forgetting that hash destroys order                 | Use B-tree (or GiST) when BETWEEN or > operators exist |
| Ignoring index width              | Storing wide VARCHAR keys inside every node         | Use INCLUDE columns or prefix compression            |
| Forgetting to ANALYZE after bulk load | Statistics remain stale; planner chooses scan     | Run ANALYZE (or equivalent) immediately after large ETL |
| Full-text index without stop-word list | Common words explode postings size                | Configure language-specific stop-word and stemming filters |
| Updating an indexed column frequently | Every change rewrites index leaf and possibly parent nodes | Move rarely-changing columns out of the indexed key or accept the write amplification |

## 7. The textbook-precise statement
A B-tree index of order m on a relation R is a balanced m-way search tree whose leaves contain the indexed attributes together with record identifiers. Every internal node v satisfies ⌈m/2⌉−1 ≤ keys(v) ≤ m−1; all leaves lie at identical depth. Search for a key k traverses at most 1 + ⌈log_m (N+1)⌉ pages. Insert and delete maintain the invariants by splitting or coalescing nodes and, when necessary, redistributing keys between siblings (Ramakrishnan & Gehrke, Database Management Systems, 3e, §10.3–10.5). A static hash index with B buckets and load factor α < 1 realises expected O(1) I/O for equality probes provided collisions are resolved by chaining (ibid., §11.2). A full-text inverted index stores, for each term t, a postings list of (docID, tf, positions) tuples ordered by docID, supporting Boolean and ranked retrieval in time linear in the aggregate length of the involved postings (Manning et al., Introduction to Information Retrieval, §1.2 & §2.3).

## 8. Visual — diagram or schematic
```
B-tree order 4 after several inserts
                 [ 20  40 ]
               /     |      \
        [10 15]  [25 30 35]  [45 50]
```
Each bracket represents a node; vertical bars separate keys; leaves are at the same level. Sibling pointers (omitted for ASCII clarity) link the leaves left-to-right for range scans.

## 9. The memory technique

1. **The hook** — Picture a library card catalogue: the B-tree is the ordered drawer system you walk through, the hash index is the single-number lookup that jumps you straight to the correct drawer, and the full-text index is the giant concordance book at the back that lists every page mentioning “databases”.
2. **What to overlearn** — Height of a B-tree is ⌈log_m (N+1)⌉; hash lookup expected cost is O(1) when load factor < 0.7; postings intersection cost equals sum of list lengths.
3. **Spaced-repetition schedule** — Review the three cost formulas after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — If you forget the formulas, redraw the tree height recurrence or recompute the expected chain length from the birthday-paradox collision probability.

## 10. What this unlocks
Once you understand these three index families you can reason about query optimisers, index-only scans, covering indexes, and eventually about more exotic structures such as GiST, GIN, and LSM-trees used in modern LSM-based engines.

- Query planner cost models
- Index-only scan optimisation
- Partial and expression indexes
- LSM-tree compaction policies
- Vector indexes for similarity search

## 11. Self-check — five questions, no answers
1. A B-tree of order 5 contains 1 000 000 keys; what is the maximum possible height?
2. Why does a hash index on a DATE column prevent an efficient “last 30 days” query even when the predicate is highly selective?
3. Two postings lists contain 50 000 and 2 000 entries respectively; what is the worst-case I/O cost of their intersection assuming each entry occupies one cache line?
4. An index on (last_name, first_name) is created; a query filters only on first_name. Which index property is violated and what is the consequence?
5. After a bulk load of 10 million rows you forget to run ANALYZE; which class of query is most likely to regress and why?