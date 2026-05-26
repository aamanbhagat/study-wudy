## 1. The one-sentence answer
**A hash table stores key-value pairs in an array by mapping each key through a hash function to an index, with collisions resolved either by chaining (separate lists per slot) or open addressing (searching alternate slots within the array).**

A hash table achieves average constant-time lookup and insertion by converting arbitrary keys into array indices. The hash function produces an integer that is reduced modulo the table size, placing the pair at that location. When two keys map to the same index, the table must still retrieve the correct value later.

The two standard collision strategies differ in where they store extra entries. Chaining keeps a linked list or tree at each index and simply appends colliding items. Open addressing keeps every item inside the array itself and defines a deterministic sequence of probes until an empty slot or the desired key is found.

> [!NOTE]
> The performance advantage of either method collapses exactly when the probe sequences or lists become long; load factor is therefore the single controllable variable that determines whether the table stays fast.

## 2. Why this matters — concrete and current
In the Linux kernel, the System V IPC and dentry caches use hash tables with chaining to map inode numbers to cached metadata; a single cache miss on a hot path can cost microseconds that accumulate across millions of file-system operations per second.

Modern CPU branch-predictor and TLB designs rely on small open-addressed hash tables inside the silicon; the choice of linear probing versus quadratic probing directly affects miss latency on every memory reference.

Google’s LevelDB and its descendant RocksDB store key-value pairs on disk using a structure whose in-memory index is an open-addressed hash table with Robin Hood probing; the design keeps the entire index in RAM while the SSTables reside on SSD, enabling microsecond point queries at terabyte scale.

In machine-learning training frameworks such as PyTorch’s embedding-bag operator, hash tables with chaining store sparse feature weights; the table must support billions of updates per second across distributed workers, making collision-resolution cost a first-order determinant of wall-clock training time.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Array indexing | Hash tables are arrays whose indices are computed rather than supplied by the programmer. |
| Modulo arithmetic | The hash value is reduced modulo table size to obtain a valid index; properties of modulo determine clustering behavior. |
| Linked-list node structure | Chaining stores colliding keys in lists; pointer or reference semantics must be understood. |
| Load factor | The ratio of stored items to table slots governs expected probe length and must be kept below a threshold. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Map keys to integers
A hash function converts any key into a non-negative integer.  
Example: the string “cat” yields 42 819 237 under a common 32-bit hash.  
Formally, \( h : K \to \mathbb{Z}_{\geq 0} \).  
> [!WARNING] If the hash function is biased toward a narrow range of integers, every later step inherits systematic clustering.

### Step 2 — Reduce to table bounds
The integer is taken modulo the current table capacity \( m \) to produce a legal index.  
Example: \( 42\,819\,237 \bmod 16 = 5 \).  
\[
\text{index} = h(k) \bmod m
\]

### Step 3 — Detect collision
When two distinct keys \( k_1 \) and \( k_2 \) satisfy \( h(k_1) \equiv h(k_2) \pmod{m} \), they land at the same slot.  
Example: both “cat” and “dog” hash to index 5.  
Collision is inevitable once \( n > m \) by the pigeonhole principle.

### Step 4 — Resolve via chaining
Allocate a secondary container (list or tree) at each slot; append the new pair to the container at the computed index.  
Lookup walks the container until the exact key matches.  
Average list length equals the load factor \( \alpha = n/m \).

### Step 5 — Resolve via open addressing
Keep every pair inside the array. On collision, follow a probe sequence \( p(i,k) \) for \( i = 0,1,2,\dots \) until an empty slot or the key is found.  
Linear probing uses \( p(i,k) = (h(k)+i)\bmod m \).  
Deletion requires a sentinel “deleted” marker so that probe sequences remain intact.

### Step 6 — Compare expected cost
Under uniform hashing the expected probe length for unsuccessful search is \( \frac{1}{2}(1 + 1/(1-\alpha)) \) for linear probing and \( \alpha \) for chaining.  
The formulas dictate the maximum load factor each scheme can tolerate before performance degrades.

### Step 7 — Textbook statement
A hash table of size \( m \) with \( n \) elements and load factor \( \alpha = n/m < 1 \) supports insert, delete and search in expected \( \Theta(1) \) time when collisions are resolved by either chaining or open addressing with uniform probing, provided the hash function distributes keys independently and uniformly (Cormen et al., *Introduction to Algorithms*, 4e, Ch. 11).

## 5. Worked examples — every step shown

**Example 1 — Insert with chaining**  
*Given:* empty table of size 4, hash \( h(k)=k \bmod 4 \), insert 5 then 9.  
*Find:* final structure.  
Step 1: \( 5 \bmod 4 = 1 \). *Why:* reduction places key in slot 1.  
Step 2: slot 1 list becomes [5]. *Why:* first insertion creates list.  
Step 3: \( 9 \bmod 4 = 1 \). *Why:* same slot.  
Step 4: append 9, list = [5,9]. *Why:* chaining tolerates multiple keys per slot.  
**Final structure**  
Slot 0: [] Slot 1: [5,9] Slot 2: [] Slot 3: []  

*Reflection:* The example shows that list length equals number of collisions at that index.

**Example 2 — Linear probing insert**  
*Given:* table size 5, insert 2, 7, 12 (all hash to 2).  
*Find:* final array.  
Step 1: 2 → index 2, store at [2]. *Why:* empty slot.  
Step 2: 7 → index 2 occupied, probe 3, store at [3]. *Why:* next probe offset +1.  
Step 3: 12 → index 2 occupied, probe 3 occupied, probe 4, store at [4]. *Why:* continue until empty slot.  
**Final array**  
[_, _, 2, 7, 12]  

*Reflection:* Probe length grows linearly with prior collisions; clustering is visible.

**Example 3 — Lookup under open addressing**  
*Given:* table above, search for 12.  
*Find:* index returned.  
Step 1: compute \( h(12)=2 \). *Why:* same hash.  
Step 2: slot 2 holds 2 ≠ 12, probe 3. *Why:* follow identical sequence used on insert.  
Step 3: slot 3 holds 7 ≠ 12, probe 4. *Why:* continue.  
Step 4: slot 4 holds 12, return success. *Why:* exact key match terminates search.  
**Final answer: found at index 4**

*Reflection:* Lookup must replay the exact probe sequence; any mismatch in deletion handling breaks this invariant.

**Example 4 — Load-factor threshold decision**  
*Given:* \( n=900 \), desired \( \alpha \le 0.7 \).  
*Find:* minimum table size for chaining versus linear probing.  
Step 1: chaining tolerates \( \alpha=0.7 \), so \( m \ge 900/0.7 \approx 1286 \). *Why:* expected list length 0.7.  
Step 2: linear probing usually caps at \( \alpha=0.5 \), so \( m \ge 1800 \). *Why:* probe length formula grows sharply above 0.5.  
**Final answer**  
Chaining: 1286 Linear probing: 1800  

*Reflection:* The arithmetic shows why open addressing often requires larger tables.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using a hash function that only examines the first few bytes of a string | Programmer copied a textbook example without adapting it to real key distributions | Run the hash over the entire key or use a cryptographic mixer such as SipHash |
| Forgetting the “deleted” sentinel in open addressing | Deletion simply marks the slot empty, breaking later probe chains | Always replace a deleted key with a dedicated tombstone that still participates in probing |
| Resizing the table without rehashing every element | New size changes all indices; old indices become invalid | Allocate a fresh table and re-insert every live element using the new modulus |
| Assuming worst-case \( O(1) \) time | Hash collisions can be forced by an adversary when the hash is predictable | Use a keyed hash (random seed per run) or switch to a balanced tree at each slot when \( \alpha \) exceeds threshold |
| Storing mutable objects as keys without overriding equality and hashCode consistently | Two objects compare equal yet produce different hashes | Maintain the contract “equal objects must have equal hashes” in every custom key class |
| Choosing table size as a power of two with a poor hash | Low bits of the hash dominate, producing severe clustering | Prefer a prime table size or apply an additional mixing step after modulo |
| Ignoring integer overflow in hash computation | Intermediate products wrap around silently in fixed-width integers | Use 64-bit or arbitrary-precision arithmetic during hash evaluation |

## 7. The textbook-precise statement
Let \( T[0..m-1] \) be an array of \( m \) slots. A hash function \( h:K\to\{0,\dots,m-1\} \) maps keys to slots. Under the uniform hashing assumption, each key is equally likely to hash to any slot independently of other keys. When collisions are resolved by chaining, each slot \( T[j] \) holds a linked list; search costs \( \Theta(1+\alpha) \) expected time where \( \alpha=n/m \). When collisions are resolved by open addressing with probe sequence \( p(i,k) \), each key occupies exactly one slot and search follows the same sequence used at insertion; expected cost is \( \Theta(1/(1-\alpha)) \) for linear probing when \( \alpha<1 \). (Cormen et al., *Introduction to Algorithms*, 4e, Ch. 11, Theorems 11.2 and 11.6.)

## 8. Visual — diagram or schematic
```text
Index   Chaining                     Open Addressing (linear probing)
0       [ ]                          [ 14 ]
1       [ 5 → 9 ]                    [  5 ]
2       [ 6 ]                        [  6 ]
3       [ ]                          [  7 ]
4       [ 13 ]                       [ 13 ]
5       [ ]                          [  _ ]   (empty)
```
Label legend: arrows in chaining point to the next colliding element; numbers inside brackets are stored keys; “_” denotes an unoccupied slot that still participates in probe sequences.

## 9. The memory technique
1. **The hook** — picture a coat-check room: each numbered hook is a hash slot; when two guests arrive with coats that belong on the same hook you either hang a chain of hangers (chaining) or keep sliding along the row of hooks until you find an empty one (open addressing).  
2. **What to overlearn** — load factor \( \alpha = n/m \); expected cost \( \Theta(1+\alpha) \) for chaining, \( \Theta(1/(1-\alpha)) \) for linear probing.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — start from the definition of a function, reduce modulo table size, count collisions, then derive probe length by summing a geometric series of probabilities.

## 10. What this unlocks
Mastery of collision resolution lets you analyze and implement the next layer of dynamic dictionaries, including hash maps inside language runtimes, database indexes, and content-addressable storage.  

- Cuckoo hashing and hopscotch hashing  
- Consistent hashing for distributed caches  
- Bloom filters that rely on multiple independent hash functions  
- Analysis of randomized algorithms under the uniform hashing assumption  

## 11. Self-check — five questions, no answers
1. A table of size 7 receives keys that all hash to 0. After 5 insertions, what is the expected probe length for an unsuccessful search under linear probing?  
2. Why does a power-of-two table size combined with a multiplicative hash that only mixes the upper bits produce long runs of occupied slots?  
3. In a chained hash table, does increasing the table size by one always reduce the maximum list length? Provide a counter-example.  
4. Show that the expected number of probes for unsuccessful search under double hashing equals \( 1/(1-\alpha) \) when hashes are independent.  
5. A production system observes sudden 100× slowdown on lookups after an attacker sends specially crafted keys. Which single design assumption was violated?