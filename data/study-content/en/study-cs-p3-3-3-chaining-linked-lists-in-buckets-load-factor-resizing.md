## 1. The one-sentence answer
**Chaining resolves hash collisions by storing multiple keys that map to the same slot inside a linked list (or other chain) attached to that slot, with load factor \(\alpha = n/m\) governing average chain length and triggering periodic resizing to keep \(\alpha\) bounded.**

A hash function maps keys to a fixed number of buckets. When two keys collide, the second key is simply appended to the list hanging from that bucket instead of being rejected or displaced. Search, insert, and delete therefore walk a single list whose expected length equals the load factor.

Resizing doubles the bucket array when \(\alpha\) exceeds a chosen constant (commonly 1 or 3/4) and rehashes every existing key, restoring the invariant that average chain length stays constant.

> [!NOTE]
> The decisive insight is that expected search cost becomes \(\Theta(1 + \alpha)\) independent of the particular hash-function values, provided the hash function distributes keys uniformly; resizing merely keeps \(\alpha\) from growing with \(n\).

## 2. Why this matters — concrete and current
In the Linux kernel’s dentry cache, file-system path lookups use a chained hash table whose load factor is kept below 1; the mechanism supports millions of dentries while guaranteeing sub-microsecond average lookup under heavy concurrent access.

Modern JVMs (OpenJDK) implement `java.util.HashMap` with chaining; the default load-factor threshold of 0.75 triggers resizing, directly affecting garbage-collection pauses and allocation rates in large-scale data-processing pipelines at companies such as Netflix and LinkedIn.

Google’s LevelDB and RocksDB employ chained hash tables for their in-memory memtables; the bounded load factor guarantees predictable write amplification when flushing to SSTables on SSDs used in database clusters handling petabytes of telemetry.

In semiconductor design verification, Synopsys VCS uses chained hash tables to map signal names to simulation values; the resizing policy keeps memory footprint linear in the number of signals while preserving cycle-accurate lookup speed for billion-gate designs.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Simple uniform hashing   | Guarantees each key is equally likely to land in any bucket, enabling the \(\Theta(1+\alpha)\) bound. |
| Linked-list operations   | Insert, delete, and search on a singly-linked list must be \(\Theta(k)\) for a list of length \(k\). |
| Array doubling           | The standard technique for growing a dynamic array in amortized constant time.       |
| Hash-function evaluation | Computing \(h(k) \bmod m\) for varying table size \(m\) is required during resize.   |

## 4. Building the idea — from intuition to formalism

### Step 1 — Collisions are inevitable
Even a perfect hash function cannot avoid collisions once the number of keys exceeds the number of buckets.  
Example: keys 7 and 17 both hash to bucket 2 when \(m=5\).  
Formal statement: for any function \(h: U\to\{0,\dots,m-1\}\) and \(n>m\), the pigeonhole principle forces at least one bucket to contain two keys.  
> [!WARNING] Treating collisions as errors instead of routine events leads to brittle tables that fail under modest load.

### Step 2 — Attach a chain to each bucket
Store every key that hashes to slot \(i\) inside a linked list whose head lives at index \(i\).  
Example: after inserting 7 then 17 the array cell 2 holds a pointer to the node containing 7, whose next pointer leads to the node containing 17.  
Formal statement: the table is an array \(T[0..m-1]\) where each \(T[i]\) is either null or the head of a list of all keys \(k\) with \(h(k)=i\).

### Step 3 — Define load factor
Let \(n\) be the number of keys and \(m\) the number of buckets. The load factor is \(\alpha=n/m\).  
Example: 1200 keys in 1000 buckets yields \(\alpha=1.2\).  
Formal statement: \(\alpha=\frac{n}{m}\).

### Step 4 — Expected cost under uniform hashing
Under simple uniform hashing the expected length of any chain is exactly \(\alpha\).  
Search therefore examines \(\alpha\) nodes on average plus the initial bucket access, giving \(\Theta(1+\alpha)\).  
> [!WARNING] Confusing worst-case chain length \(O(n)\) with expected length \(\alpha\) produces incorrect performance claims.

### Step 5 — Resizing restores the invariant
When \(\alpha\) exceeds a constant threshold \(c\) (commonly \(c=1\)), allocate a new array of size \(2m\), rehash every key, and discard the old array.  
Formal statement: after resize, new load factor satisfies \(\alpha'=\frac{n}{2m}=\alpha/2\le c/2\).

### Step 6 — Textbook bound
With simple uniform hashing and the above resizing policy, every dictionary operation runs in expected \(O(1)\) time.

## 5. Worked examples — every step shown

**Example 1 — Insert into empty table**  
*Given:* empty table, \(m=5\), hash \(h(k)=k \bmod 5\), insert key 12.  
*Find:* final table state.  
Compute \(h(12)=2\).  
Bucket 2 is null, so create a new node and place its address in \(T[2]\).  
**Final table:** \(T=[null,null,12,null,null]\).  
*Reflection:* The first insertion never traverses a list; this base case must be handled explicitly in code.

**Example 2 — Collision creates a chain**  
*Given:* table after Example 1, insert 17.  
*Find:* chain contents.  
\(h(17)=2\).  
Traverse the list at 2 (length 1), append new node.  
**Final chain at 2:** 12 → 17.  
*Reflection:* Append order is usually LIFO or FIFO; the asymptotic cost is identical.

**Example 3 — Load-factor trigger**  
*Given:* \(m=4\), \(n=5\), threshold \(c=1\).  
*Find:* new size after resize.  
\(\alpha=5/4=1.25>1\), allocate new array of size 8, rehash all keys.  
**New \(\alpha=5/8=0.625\).**  
*Reflection:* Doubling guarantees amortized \(O(1)\) per insertion across the entire sequence.

**Example 4 — Search cost calculation**  
*Given:* \(\alpha=0.7\), uniform hashing.  
*Find:* expected number of nodes examined during unsuccessful search.  
Expected chain length = \(\alpha=0.7\).  
One extra probe to reach the null terminator.  
**Expected probes:** \(1+0.7=1.7\).  
*Reflection:* The “+1” term accounts for the bucket array access itself and remains even when chains are empty.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using a fixed-size table forever  | Forgetting that \(n\) grows while \(m\) stays constant | Implement automatic doubling on \(\alpha>c\)         |
| Storing raw keys instead of nodes | Treating the bucket array as a direct key store     | Always allocate a node object or struct for chaining |
| Ignoring deletion in linked lists | Assuming only insert and search are needed          | Implement proper list deletion that updates head pointers |
| Rehashing with the same \(m\)     | Resize logic copies table without changing size     | Always set new \(m=2\times\) old \(m\)               |
| Measuring worst-case instead of expected cost | Reporting \(\Theta(n)\) for every operation         | State the expectation under uniform hashing explicitly |
| Hash function depending on table size | Computing \(h(k)\) using current \(m\) inside the function | Separate hash computation from final modulo          |
| Not handling null heads on delete | Removing the last node leaves a dangling pointer    | Check whether the list becomes empty and set \(T[i]=\)null |

## 7. The textbook-precise statement
Let \(T\) be a hash table with \(m\) slots that resolves collisions by chaining. Under the assumption of simple uniform hashing, the expected time for unsuccessful search, successful search, insertion, and deletion is \(\Theta(1+\alpha)\) where \(\alpha=n/m\). When the table is dynamically resized by doubling whenever \(\alpha\) exceeds a constant, all operations run in expected \(O(1)\) time. (Cormen et al., *Introduction to Algorithms*, 4e, §11.2–11.3.)

## 8. Visual — diagram or schematic
```text
Index   Bucket array          Chain (linked nodes)
0       [null]
1       [head]  -->  "apple" --> null
2       [head]  -->  "cat"   --> "car" --> null
3       [null]
4       [head]  -->  "dog"   --> null
```
Each arrow represents a `next` pointer; the load factor here is \(4/5=0.8\).

## 9. The memory technique
1. **The hook** — Picture each bucket as a bucket on a wall; when too many balls (keys) fall into one bucket you double the number of wall buckets and throw every ball again.  
2. **What to overlearn** — \(\alpha=n/m\), expected cost \(\Theta(1+\alpha)\), resize doubles \(m\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the expectation by linearity of expectation over indicator variables for each key hashing to the same slot.

## 10. What this unlocks
Chaining supplies the performance foundation for every subsequent collision-resolution scheme and for the analysis of dynamic dictionaries.  
- Open addressing (linear probing, double hashing)  
- Perfect hashing and FKS dictionaries  
- Cuckoo hashing and its multiple-choice generalizations  
- Concurrent hash tables that replace linked lists with lock-free structures  

## 11. Self-check — five questions, no answers
1. A table with 1024 buckets currently holds 700 keys. After 400 additional insertions without resizing, what is the new load factor?  
2. Under simple uniform hashing, what is the exact expected number of nodes examined during an unsuccessful search when \(\alpha=2\)?  
3. Why does resizing by doubling guarantee amortized \(O(1)\) cost per insertion over a sequence of \(n\) insertions that starts from an empty table?  
4. Suppose the hash function always returns 0. After inserting \(n\) keys, what is the observed cost of search, and why does the theoretical bound no longer apply?  
5. In a chained table, deletion of the last key in a bucket must set the bucket pointer to null. Demonstrate with a three-line code sketch why omitting this step produces a memory-safety error on the next insertion into that bucket.