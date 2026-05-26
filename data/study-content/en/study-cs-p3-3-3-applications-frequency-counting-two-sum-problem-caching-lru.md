## 1. The one-sentence answer
**Hashing applications turn average O(1) key-to-value lookup into direct solutions for frequency counting, pair-sum detection, and constant-time cache eviction.**

A hash table stores each key at an index computed by a hash function, so any subsequent lookup or update costs constant time on average. Frequency counting therefore records every element’s occurrence by incrementing a map entry rather than rescanning the collection. The same constant-time retrieval lets the two-sum algorithm remember which numbers have already been seen and immediately test whether the required complement exists. LRU caching pairs the map with a doubly-linked list so that both access and eviction remain O(1).

> [!NOTE]
> The single decisive property is that the hash table converts “search for a value” into “compute its address,” removing every linear scan that would otherwise dominate these three problems.

## 2. Why this matters — concrete and current
Google’s Borg scheduler maintains per-task frequency maps of resource requests; each map update must finish before the next scheduling quantum, which hashing guarantees at scale.

In semiconductor design, Synopsys timing-analysis tools solve millions of two-sum-style net-delay equations per clock-cycle optimization pass; the hash-based lookup replaces repeated traversals of the timing graph.

Production LRU caches appear in the Linux kernel’s page cache and in Redis’s memory-eviction policy; both rely on the O(1) hash-plus-list combination to keep tail-latency below one microsecond under terabyte workloads.

NASA’s Perseverance rover flight software uses an LRU hash table to retain the most recent sensor calibration constants, ensuring that radiation-induced memory pressure never stalls the control loop.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Array indexing           | The hash function ultimately produces an array index.     |
| Average-case analysis    | Hash-table guarantees are probabilistic, not worst-case.  |
| Doubly-linked list       | LRU eviction requires O(1) removal and insertion at ends. |
| Amortized analysis       | Resizing a hash table must not destroy the O(1) claim.    |

## 4. Building the idea — from intuition to formalism

### Step 1 — Direct address via hashing
A hash function maps each key to an integer bucket; storing the value at that bucket replaces search with arithmetic.  
Example: keys “apple”, “banana” map to indices 3 and 7; increments become direct array writes.  
Formally, given universe \(U\) and table size \(m\), \(h:U\to\{0,\dots,m-1\}\).  
> [!WARNING] Collisions are inevitable when \(|U|>m\); ignoring them produces silent overwrites.

### Step 2 — Frequency map construction
Initialize an empty map. For each element \(x\), execute \(\text{map}[x]\gets\text{map}[x]+1\).  
Example: array \([3,1,3,3,1]\) yields \(\{3:3,1:2\}\).  
Formally, after \(n\) insertions the map contains exactly the distinct values and their multiplicities.

### Step 3 — Complement lookup for two-sum
Store each number together with its index. For target \(t\) and current number \(x\), test whether \(t-x\) already exists.  
Example: \([2,7,11,15]\), \(t=9\) immediately finds complement 7 at index 1.  
Formally, return indices \(i,j\) such that \(A[i]+A[j]=t\) and \(i\neq j\).

### Step 4 — LRU ordering via auxiliary list
Attach each hash entry to a node in a doubly-linked list ordered by recency.  
On access, move the node to the head in O(1) time.  
Eviction removes the tail node and its hash entry simultaneously.

### Step 5 — Textbook statement of the result
Any sequence of \(n\) operations on a hash table of sufficient size, augmented with a constant-size auxiliary structure, solves frequency counting, two-sum, and LRU eviction in expected \(O(n)\) total time (Cormen et al., *Introduction to Algorithms*, 4e, Ch. 11 & 13).

## 5. Worked examples — every step shown

**Example 1 — Frequency count**  
*Given:* \([4,4,4,2,2]\)  
*Find:* occurrence map  
Step 1: create empty map — Why: establish constant-time store.  
Step 2: process 4 → map[4]=1 — Why: direct increment.  
Step 3: process second 4 → map[4]=2 — Why: reuse address.  
Step 4: finish → {4:3,2:2}.  
**{4:3,2:2}**

*Reflection:* The only non-obvious step is realizing that every increment is O(1) regardless of prior counts.

**Example 2 — Two-sum indices**  
*Given:* nums = [3,2,4], target = 6  
*Find:* indices of pair  
Step 1: map empty.  
Step 2: 3, need 3 → store {3:0}.  
Step 3: 2, need 4 → store {3:0,2:1}.  
Step 4: 4, need 2 → found at index 1.  
**Return [1,2]**

*Reflection:* Early return prevents unnecessary storage and guarantees first valid pair.

**Example 3 — LRU put and get**  
*Given:* capacity 2, operations put(1,1), put(2,2), get(1), put(3,3)  
Step 1: after first two inserts list = [2,1].  
Step 2: get(1) moves 1 to head → list = [1,2].  
Step 3: put(3,3) evicts tail 2 → list = [3,1].  
**Final map {1:1,3:3}, list head=3**

*Reflection:* The list records recency; the map supplies O(1) address of the node to move.

**Example 4 — Mixed frequency and two-sum**  
*Given:* array of 10^5 integers, find any pair summing to 0 after removing duplicates via frequency map.  
Step 1: build frequency map (O(n)).  
Step 2: iterate keys, test −k in map and k ≠ −k.  
**Return first such pair or empty**

*Reflection:* Frequency map automatically deduplicates; two-sum then runs on the reduced key set.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using unordered map in worst-case | Hash collisions degenerate to list          | Choose hash seed randomly or use ordered map |
| Forgetting to delete list node on eviction | Map and list become inconsistent            | Always remove from both structures atomically |
| Storing only values, not indices in two-sum | Need original positions later               | Store index alongside value                  |
| Resizing during iteration         | Invalidates iterators mid-pass              | Finish all reads before any resize           |
| Assuming O(1) worst-case          | Adversarial input forces linear chains      | Document expected-time contract explicitly   |
| LRU capacity 0 edge case          | Immediate eviction of every insert          | Special-case capacity ≤ 0 at construction    |
| Integer overflow on frequency sum | 32-bit counter wraps on huge inputs         | Use 64-bit counters or big-integer type      |

## 7. The textbook-precise statement
Let \(h\) be a hash function drawn from a universal family mapping keys to \(\{0,\dots,m-1\}\). A hash table \(T\) of size \(m\) together with a doubly-linked list \(L\) supports: (i) frequency map construction after \(n\) insertions in expected \(O(n)\) time, (ii) two-sum decision in expected \(O(n)\) time, (iii) LRU get/put in expected amortized \(O(1)\) time per operation provided \(m=\Theta(n)\). All claims appear in Cormen et al., *Introduction to Algorithms*, 4e, Chapters 11 and 13.

## 8. Visual — diagram or schematic
```text
Hash table buckets          Doubly-linked list (LRU order)
[0] → null                  head → [key3] ↔ [key1] ↔ [key4] ← tail
[1] → (key1, node_ptr)      
[2] → null                  
[3] → (key3, node_ptr)      
[4] → (key4, node_ptr)      
```
Each bucket stores a pointer into the list node; moving a node to head updates only its two list pointers and the map entry.

## 9. The memory technique
1. **The hook** — Picture a librarian who instantly knows the exact shelf (hash) and also keeps a “recently touched” conveyor belt (LRU list) at the desk.  
2. **What to overlearn** — Expected O(1) lookup; universal hashing; doubly-linked list splice in O(1).  
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive every operation by writing the exact sequence of array writes and pointer updates.

## 10. What this unlocks
Mastery of these three patterns lets you implement memoization, duplicate detection, and constant-time caches that appear in every subsequent algorithm.  
- Next: dynamic programming with memoization maps  
- Next: graph algorithms using adjacency maps  
- Next: database query optimizers using hash joins  
- Next: distributed systems consistent hashing

## 11. Self-check — five questions, no answers
1. In frequency counting, what happens to time complexity if every key collides into a single bucket?  
2. For two-sum on a sorted array, can the hash-table solution ever be asymptotically faster than the two-pointer solution?  
3. In an LRU cache of capacity 1, what is the state after the sequence put(1,1), get(1), put(2,2)?  
4. Why must the LRU list node be removed from its current position before re-inserting at the head?  
5. Suppose you are given only a frequency map; how would you detect whether any element appears more than n/2 times in linear time?