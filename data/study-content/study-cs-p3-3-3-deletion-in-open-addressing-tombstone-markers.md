## 1. What it is — in plain English

Imagine you have a big parking lot, and each spot has a number. When a car arrives, it tries to park in its "favorite" spot (determined by a special rule, like its license plate number). If its favorite spot is taken, it just looks for the next available spot down the row. This is like a hash table with open addressing.

Now, what happens if a car leaves? If you just erase its presence from the spot, making it look completely empty, you might cause a problem. Suppose Car A was in spot 5, and Car B, whose favorite spot was also 5, ended up in spot 6 because spot 5 was taken. If Car A leaves and you just mark spot 5 as totally empty, then later, when you look for Car B, you'd go to its favorite spot 5, see it's empty, and incorrectly conclude Car B isn't in the lot at all! You'd never check spot 6.

This is where "tombstone markers" come in. Instead of making the spot completely empty, you put a special "tombstone" sign there. This sign means, "A car *used* to be here, but it's gone now. However, don't stop looking if you're searching for another car! Keep checking spots further down, because another car might have parked here because *this* spot was taken when it first arrived."

So, a tombstone marker is like a "ghost" of a deleted item. It tells the search process to keep going, but it also signals to new insertions that this spot is now available to be used again. It's a clever way to handle deletions without breaking the way we find things.

## 2. Why it matters — real-world applications

Tombstone markers are crucial for maintaining the efficiency and correctness of hash tables in many systems where data is frequently added and removed.

1.  **Database Indexing:** Modern databases (like PostgreSQL, MySQL, NoSQL databases such as Cassandra or Redis) heavily rely on hash tables or similar structures for quick lookups of data records. When records are deleted from a database, their corresponding entries in hash-based indexes must also be removed. Using tombstone markers ensures that searches for other records that might have collided with the deleted record continue to function correctly, preventing data loss or incorrect "not found" results.
2.  **Network Routers and Caches:** High-performance network routers use hash tables to store routing information (e.g., mapping IP addresses to network interfaces) or connection states. Caches (like CPU caches, web caches, or CDN caches) store frequently accessed data for quick retrieval. Data in these systems is constantly being added, updated, and *evicted* (deleted). Tombstone markers allow for efficient eviction and insertion of new data without disrupting ongoing lookups for other cached items, which is vital for maintaining network throughput and low latency.
3.  **Operating System Memory Management:** In certain memory management schemes, especially those involving dynamic allocation and deallocation of fixed-size blocks, hash tables might be used to track free or allocated blocks. When a process frees memory, the entry in the hash table needs to be deleted. Tombstone markers help manage these deletions efficiently, ensuring that the system can quickly find available memory blocks for new allocations while correctly tracking existing ones.
4.  **Machine Learning Feature Stores:** In large-scale machine learning systems, "feature stores" are used to manage and serve features for models. These stores often use key-value lookups, which might be backed by hash tables. As features are updated, deprecated, or new data arrives, entries are deleted. Tombstone markers ensure that the feature store remains consistent and performant, allowing models to retrieve features reliably even with dynamic data.
5.  **Aerospace/Defense Systems (e.g., Radar Tracking):** Systems that track numerous objects (aircraft, missiles, space debris) in real-time often use hash tables to quickly associate sensor data with specific tracks. As objects appear, disappear, or merge, entries are added and deleted. Maintaining accurate and fast lookups is critical. Tombstone markers ensure that the system can correctly identify existing tracks and add new ones without accidentally "losing" a track because a previously occupied slot was simply cleared.

## 3. Prerequisites — what you must know first

Before diving deep into tombstone markers, ensure you have a solid grasp of these foundational concepts:

*   **Hashing:** The general concept of mapping data (keys) of arbitrary size to a fixed-size integer (hash value).
*   **Hash Function:** A function $h(k)$ that takes a key $k$ and returns an integer index within the bounds of a hash table's array.
*   **Hash Table:** A data structure that stores key-value pairs, using a hash function to compute an index into an array of buckets or slots, aiming for $O(1)$ average-case lookup time.
*   **Collision:** When two different keys hash to the same index in the hash table.
*   **Collision Resolution:** Strategies for handling collisions to ensure all keys can be stored and retrieved.
*   **Open Addressing:** A specific collision resolution strategy where all elements are stored directly within the hash table array itself (no linked lists or separate chains). When a collision occurs, we "probe" for an alternative empty slot.
*   **Probing:** The process of systematically searching for an empty slot in an open-addressed hash table when a collision occurs, or searching for a key during retrieval.
*   **Linear Probing:** A specific open addressing technique where, upon collision at index $i$, we check $i+1, i+2, i+3, \dots$ (modulo table size) until an empty slot is found.
*   **Quadratic Probing:** Another open addressing technique where, upon collision at index $i$, we check $i+1^2, i+2^2, i+3^2, \dots$ (modulo table size) slots.
*   **Double Hashing:** An open addressing technique that uses a second hash function to determine the step size for probing, providing better distribution.

## 4. The core idea — step by step

The fundamental problem that tombstone markers solve arises specifically in **open addressing** hash tables when you try to delete an element. Let's break down the problem and the solution.

### Step 1: The Problem with Naive Deletion in Open Addressing

**Plain English:** If you simply remove an item from its spot in the hash table and mark that spot as completely empty (like it was never used), you can accidentally break the search process for other items.

**Concrete Example:**
Consider a hash table of size 7, using linear probing.
Initial state: `[_, _, _, _, _, _, _]` (all empty)
Hash function: $h(k) = k \pmod 7$

1.  **Insert 10:** $h(10) = 10 \pmod 7 = 3$. Table: `[_, _, _, 10, _, _, _]`
2.  **Insert 24:** $h(24) = 24 \pmod 7 = 3$. Collision at index 3. Probe to index 4. Table: `[_, _, _, 10, 24, _, _]`
3.  **Insert 17:** $h(17) = 17 \pmod 7 = 3$. Collision at index 3, then 4. Probe to index 5. Table: `[_, _, _, 10, 24, 17, _]`

Now, let's **delete 10** using a naive approach (just setting the slot to `EMPTY`):
Table becomes: `[_, _, _, EMPTY, 24, 17, _]`

Now, try to **search for 17**:
$h(17) = 3$.
Check index 3: It's `EMPTY`.
**Problem:** A naive search algorithm would stop here, conclude 17 is not found, even though it's at index 5. The `EMPTY` slot acted as a premature "stop sign" for the probe sequence.

**Formal/Mathematical Version:**
Let $T$ be a hash table of size $m$. For open addressing, an element $k$ is stored at $T[h(k, i)]$ for some probe sequence $h(k, 0), h(k, 1), \dots$.
A naive `DELETE(k)` operation might set $T[h(k, j)] = \text{EMPTY}$ where $k$ was found.
A `SEARCH(k)` operation probes $T[h(k, 0)], T[h(k, 1)], \dots$ until either $k$ is found, or an $\text{EMPTY}$ slot is encountered (indicating $k$ is not in the table).
The problem arises when an element $k'$ was inserted *after* $k$ in $k$'s probe sequence, and $k$ is subsequently deleted. $k'$'s search path would encounter the newly $\text{EMPTY}$ slot of $k$ and incorrectly terminate.

**What could go wrong:** Incorrect search results (false negatives) for elements that were placed further down a probe sequence due to a collision with the now-deleted element.

### Step 2: Introducing the Tombstone Marker

**Plain English:** Instead of making a deleted spot look completely empty, we mark it with a special "tombstone" sign. This sign says, "Something *was* here, it's gone now, but keep searching past this spot if you're looking for another item."

**Concrete Example:**
Using the same example:
Table: `[_, _, _, 10, 24, 17, _]`
Now, **delete 10** using a tombstone marker (let's use `DELETED`):
Table becomes: `[_, _, _, DELETED, 24, 17, _]`

Now, try to **search for 17** again:
$h(17) = 3$.
Check index 3: It's `DELETED`. This is *not* `EMPTY`, so the search **continues**.
Check index 4: It's `24`. Not 17. Search **continues**.
Check index 5: It's `17`. Found!

**Formal/Mathematical Version:**
Introduce a third state for table slots:
1.  $\text{EMPTY}$: The slot has never contained an element.
2.  $\text{OCCUPIED}$: The slot currently holds a key-value pair.
3.  $\text{DELETED}$: The slot previously held a key-value pair, which has been removed.

When `DELETE(k)` is called, and $k$ is found at $T[j]$, instead of setting $T[j] = \text{EMPTY}$, we set $T[j] = \text{DELETED}$.

**What could go wrong:** Forgetting to define a distinct `DELETED` state, or treating `DELETED` the same as `EMPTY` during search.

### Step 3: How Insertion Handles Tombstones

**Plain English:** When inserting a *new* item, if you encounter a tombstone marker during your probe sequence, you can choose to "overwrite" that tombstone with your new item. This is because a tombstone marks a spot that is conceptually "empty" enough for a new item, and reusing it helps keep the table compact.

**Concrete Example:**
Table: `[_, _, _, DELETED, 24, 17, _]` (from previous step)
Now, **insert 31**: $h(31) = 31 \pmod 7 = 3$.
Check index 3: It's `DELETED`. This slot is available for insertion.
Insert 31 at index 3.
Table: `[_, _, _, 31, 24, 17, _]`

Notice that 31 effectively "fills" the spot left by 10.

**Formal/Mathematical Version:**
The `INSERT(k, v)` operation probes $T[h(k, 0)], T[h(k, 1)], \dots$ until either an $\text{EMPTY}$ slot or a $\text{DELETED}$ slot is found.
If an $\text{EMPTY}$ slot is found at $T[j]$, insert $(k, v)$ there.
If a $\text{DELETED}$ slot is found at $T[j]$, insert $(k, v)$ there (overwriting the tombstone). This is often preferred to reduce the number of tombstones. Some implementations might keep searching for an `EMPTY` slot to reduce clustering, but overwriting `DELETED` is generally efficient.

**What could go wrong:** If insertion *always* skips tombstones and only uses `EMPTY` slots, the table can fill up with `DELETED` markers, leading to inefficient searches and premature rehashing.

### Step 4: How Search Handles Tombstones

**Plain English:** When searching for an item, if you hit a tombstone, you *must not stop*. You treat it as if there was an item there that forced your target item to move further down, so you keep probing. You only stop if you find your item, or if you hit a truly `EMPTY` spot.

**Concrete Example:**
Table: `[_, _, _, DELETED, 24, 17, _]` (from step 2)
**Search for 17**:
$h(17) = 3$.
1.  Check index 3: `DELETED`. Not 17. **Continue probing.**
2.  Check index 4: `24`. Not 17. **Continue probing.**
3.  Check index 5: `17`. Found! Return 17.

**Search for 50** (which is not in the table):
$h(50) = 50 \pmod 7 = 1$.
1.  Check index 1: `_` (EMPTY). Stop. 50 not found.

**Formal/Mathematical Version:**
The `SEARCH(k)` operation probes $T[h(k, 0)], T[h(k, 1)], \dots$ until one of the following conditions is met:
1.  $T[j] = k$: The key is found. Return value.
2.  $T[j] = \text{EMPTY}$: The key is not in the table (as an `EMPTY` slot signifies the end of any possible probe sequence for $k$). Return "not found".
3.  $T[j] = \text{DELETED}$: The key is not at this slot, but it *might* be further down the probe sequence. **Continue probing.**

**What could go wrong:** Stopping the search when encountering a `DELETED` marker, leading to false negatives.

### Step 5: The "Lazy Deletion" Concept

**Plain English:** Tombstone markers are a form of "lazy deletion." We don't immediately rearrange the table or compact it when an item is deleted. We simply mark the spot. The actual "cleanup" or reuse of that spot is deferred until a new item needs to be inserted there, or until the entire table is rebuilt (rehashing).

**Concrete Example:**
If we have many deletions, our table might look like this:
`[_, DELETED, 5, DELETED, 12, DELETED, _]`
There are many `DELETED` markers. We haven't spent time shifting elements around. We've just marked them. When we insert a new item, say 20 ($h(20)=6$), we'd find the `EMPTY` slot at 6. If we insert 9 ($h(9)=2$), we'd find 5, then 12, then `DELETED` at 3, and we'd overwrite that. The "work" of deletion is spread out and often combined with insertion or rehashing.

**Formal/Mathematical Version:**
Lazy deletion avoids the potentially expensive operation of shifting elements to fill the gap created by a deletion, which would be necessary to maintain the integrity of probe sequences in open addressing without tombstones. Instead, it introduces a small overhead to search operations (by potentially probing over `DELETED` slots) and defers cleanup.

**What could go wrong:** Too many tombstones can degrade performance. If the table becomes saturated with `DELETED` markers, search times can approach $O(N)$ even for a sparse table, as the search algorithm might have to traverse many `DELETED` slots before finding an `EMPTY` slot or the target key.

### Step 6: Rehashing and Tombstones

**Plain English:** Because too many tombstones can slow things down, hash tables using this method eventually need to be "cleaned up." This usually happens during a "rehash" operation, where the entire table is rebuilt into a larger, fresh table. During rehashing, only the currently *active* items are re-inserted into the new table, effectively leaving all the tombstones behind.

**Concrete Example:**
Table: `[_, DELETED, 5, DELETED, 12, DELETED, _]`
If the load factor (number of active items / table size) or the number of `DELETED` items exceeds a threshold, we might trigger a rehash.
Create a new, larger table (e.g., size 13).
Iterate through the old table:
- Skip `EMPTY` slots.
- Skip `DELETED` slots.
- For `5` at index 2: Re-insert into new table. $h(5) = 5 \pmod{13} = 5$.
- For `12` at index 4: Re-insert into new table. $h(12) = 12 \pmod{13} = 12$.
The new table will be clean, with no tombstones.

**Formal/Mathematical Version:**
When the load factor $\alpha = (\text{number of active keys}) / m$ exceeds a certain threshold, or the number of `DELETED` markers becomes excessive, the hash table is rehashed. A new, larger hash table $T'$ is allocated, and all currently `OCCUPIED` key-value pairs from $T$ are re-inserted into $T'$ using the new table size and potentially a new hash function. The old table $T$ is then deallocated. This process effectively removes all `DELETED` markers.

**What could go wrong:** Not having a rehashing strategy, leading to permanent performance degradation as `DELETED` markers accumulate.

## 5. Worked examples — multiple, with every step shown

Let's work through several examples using a hash table of size $m=7$.
States: `_` (EMPTY), `DELETED`, `Key` (OCCUPIED).

**Hash function:** $h(k) = k \pmod 7$

---

### Example 1: Basic Deletion and Search with Linear Probing

**Problem:** Perform a sequence of insertions, a deletion, and a search using linear probing.
**Given:**
*   Hash table size $m=7$.
*   Hash function $h(k) = k \pmod 7$.
*   Probing strategy: Linear probing $p(k, i) = (h(k) + i) \pmod m$.
**Want:** Show the table state after each operation and the search path.

**Initial Table:**
`[ _, _, _, _, _, _, _ ]`

**Step 1: Insert 10**
*   $h(10) = 10 \pmod 7 = 3$.
*   Index 3 is `_`. Insert 10.
*   Table: `[ _, _, _, 10, _, _, _ ]`
    *Explanation: Calculate hash, find empty slot, place key.*

**Step 2: Insert 24**
*   $h(24) = 24 \pmod 7 = 3$.
*   Index 3 is `10` (collision).
*   Probe $i=1$: $(3+1) \pmod 7 = 4$. Index 4 is `_`. Insert 24.
*   Table: `[ _, _, _, 10, 24, _, _ ]`
    *Explanation: Collision occurred, so linear probing checks the next slot, which is empty.*

**Step 3: Insert 17**
*   $h(17) = 17 \pmod 7 = 3$.
*   Index 3 is `10` (collision).
*   Probe $i=1$: $(3+1) \pmod 7 = 4$. Index 4 is `24` (collision).
*   Probe $i=2$: $(3+2) \pmod 7 = 5$. Index 5 is `_`. Insert 17.
*   Table: `[ _, _, _, 10, 24, 17, _ ]`
    *Explanation: Multiple collisions, linear probing continues until an empty slot is found.*

**Step 4: Delete 10**
*   Search for 10:
    *   $h(10) = 3$.
    *   Check index 3: `10`. Found!
*   Mark index 3 as `DELETED`.
*   Table: `[ _, _, _, DELETED, 24, 17, _ ]`
    *Explanation: The item is found and its slot is marked with a tombstone marker, not made completely empty.*

**Step 5: Search for 17**
*   $h(17) = 3$.
*   Check index 3: `DELETED`. This is not 17, and it's not `_`. **Continue probing.**
*   Probe $i=1$: $(3+1) \pmod 7 = 4$. Check index 4: `24`. This is not 17. **Continue probing.**
*   Probe $i=2$: $(3+2) \pmod 7 = 5$. Check index 5: `17`. Found!
*   **Result: 17 found at index 5.**
    *Explanation: The search encountered a DELETED marker but correctly continued probing, demonstrating why tombstones are necessary.*

**Reflection:** This example clearly shows how a `DELETED` marker prevents a premature stop during search for an item that collided with the deleted item.

---

### Example 2: Multiple Deletions and Insertion into a Tombstone Slot (Linear Probing)

**Problem:** Demonstrate how new insertions can utilize `DELETED` slots.
**Given:**
*   Hash table size $m=7$.
*   Hash function $h(k) = k \pmod 7$.
*   Probing strategy: Linear probing $p(k, i) = (h(k) + i) \pmod m$.
**Want:** Show table state after operations.

**Initial Table:**
`[ _, _, _, 10, 24, 17, _ ]` (from Example 1, before deleting 10)

**Step 1: Delete 10**
*   Table: `[ _, _, _, DELETED, 24, 17, _ ]`
    *Explanation: Same as Example 1, step 4.*

**Step 2: Delete 24**
*   Search for 24:
    *   $h(24) = 3$.
    *   Check index 3: `DELETED`. Continue.
    *   Probe $i=1$: $(3+1) \pmod 7 = 4$. Check index 4: `24`. Found!
*   Mark index 4 as `DELETED`.
*   Table: `[ _, _, _, DELETED, DELETED, 17, _ ]`
    *Explanation: Search correctly navigates past the first DELETED marker to find 24, then marks 24's slot as DELETED.*

**Step 3: Insert 31**
*   $h(31) = 31 \pmod 7 = 3$.
*   Check index 3: `DELETED`. This slot is available for insertion.
*   Insert 31 at index 3.
*   Table: `[ _, _, _, 31, DELETED, 17, _ ]`
    *Explanation: The new insertion reclaims a DELETED slot, reducing the number of tombstones and improving future probe lengths.*

**Step 4: Search for 17**
*   $h(17) = 3$.
*   Check index 3: `31`. Not 17. **Continue probing.**
*   Probe $i=1$: $(3+1) \pmod 7 = 4$. Check index 4: `DELETED`. Not 17. **Continue probing.**
*   Probe $i=2$: $(3+2) \pmod 7 = 5$. Check index 5: `17`. Found!
*   **Result: 17 found at index 5.**
    *Explanation: Search still works correctly, navigating past both an OCCUPIED slot and a DELETED slot.*

**Reflection:** This example demonstrates the "lazy" aspect of deletion, where tombstones are eventually overwritten by new insertions, helping to manage table density.

---

### Example 3: Deletion and Search with Quadratic Probing

**Problem:** Perform operations using quadratic probing, including a deletion.
**Given:**
*   Hash table size $m=7$.
*   Hash function $h(k) = k \pmod 7$.
*   Probing strategy: Quadratic probing $p(k, i) = (h(k) + i^2) \pmod m$.
**Want:** Show table state and search paths.

**Initial Table:**
`[ _, _, _, _, _, _, _ ]`

**Step 1: Insert 10**
*   $h(10) = 3$. Index 3 is `_`. Insert 10.
*   Table: `[ _, _, _, 10, _, _, _ ]`

**Step 2: Insert 24**
*   $h(24) = 3$. Index 3 is `10` (collision).
*   Probe $i=1$: $(3+1^2) \pmod 7 = 4$. Index 4 is `_`. Insert 24.
*   Table: `[ _, _, _, 10, 24, _, _ ]`

**Step 3: Insert 17**
*   $h(17) = 3$. Index 3 is `10` (collision).
*   Probe $i=1$: $(3+1^2) \pmod 7 = 4$. Index 4 is `24` (collision).
*   Probe $i=2$: $(3+2^2) \pmod 7 = (3+4) \pmod 7 = 7 \pmod 7 = 0$. Index 0 is `_`. Insert 17.
*   Table: `[ 17, _, _, 10, 24, _, _ ]`

**Step 4: Delete 10**
*   Search for 10:
    *   $h(10) = 3$.
    *   Check index 3: `10`. Found!
*   Mark index 3 as `DELETED`.
*   Table: `[ 17, _, _, DELETED, 24, _, _ ]`

**Step 5: Search for 17**
*   $h(17) = 3$.
*   Check index 3: `DELETED`. Not 17. **Continue probing.**
*   Probe $i=1$: $(3+1^2) \pmod 7 = 4$. Check index 4: `24`. Not 17. **Continue probing.**
*   Probe $i=2$: $(3+2^2) \pmod 7 = 0$. Check index 0: `17`. Found!
*   **Result: 17 found at index 0.**
    *Explanation: This confirms that tombstones work with different probing strategies. The search path for 17 correctly navigates past the DELETED marker at its initial hash index and the subsequent occupied slot.*

**Reflection:** This example demonstrates the generality of tombstone markers across different open addressing schemes, specifically quadratic probing. The logic for handling `DELETED` slots remains consistent.

---

### Example 4: Complex Scenario with Double Hashing and Rehashing Consideration

**Problem:** Perform a series of operations with double hashing, including deletions and an observation about rehashing.
**Given:**
*   Hash table size $m=7$.
*   Hash function $h_1(k) = k \pmod 7$.
*   Second hash function $h_2(k) = 1 + (k \pmod 5)$. (Note: $h_2(k)$ must never return 0).
*   Probing strategy: Double hashing $p(k, i) = (h_1(k) + i \cdot h_2(k)) \pmod m$.
**Want:** Show table state and search paths.

**Initial Table:**
`[ _, _, _, _, _, _, _ ]`

**Step 1: Insert 10**
*   $h_1(10) = 3$. Index 3 is `_`. Insert 10.
*   Table: `[ _, _, _, 10, _, _, _ ]`

**Step 2: Insert 24**
*   $h_1(24) = 3$. Index 3 is `10` (collision).
*   $h_2(24) = 1 + (24 \pmod 5) = 1 + 4 = 5$.
*   Probe $i=1$: $(h_1(24) + 1 \cdot h_2(24)) \pmod 7 = (3 + 1 \cdot 5) \pmod 7 = 8 \pmod 7 = 1$. Index 1 is `_`. Insert 24.
*   Table: `[ _, 24, _, 10, _, _, _ ]`

**Step 3: Insert 17**
*   $h_1(17) = 3$. Index 3 is `10` (collision).
*   $h_2(17) = 1 + (17 \pmod 5) = 1 + 2 = 3$.
*   Probe $i=1$: $(h_1(17) + 1 \cdot h_2(17)) \pmod 7 = (3 + 1 \cdot 3) \pmod 7 = 6 \pmod 7 = 6$. Index 6 is `_`. Insert 17.
*   Table: `[ _, 24, _, 10, _, _, 17 ]`

**Step 4: Delete 10**
*   Search for 10:
    *   $h_1(10) = 3$.
    *   Check index 3: `10`. Found!
*   Mark index 3 as `DELETED`.
*   Table: `[ _, 24, _, DELETED, _, _, 17 ]`

**Step 5: Insert 31**
*   $h_1(31) = 3$. Index 3 is `DELETED`. This slot is available.
*   Insert 31 at index 3.
*   Table: `[ _, 24, _, 31, _, _, 17 ]`

**Step 6: Delete 24**
*   Search for 24:
    *   $h_1(24) = 3$.
    *   Check index 3: `31`. Not 24. **Continue probing.**
    *   $h_2(24) = 5$.
    *   Probe $i=1$: $(h_1(24) + 1 \cdot h_2(24)) \pmod 7 = (3 + 1 \cdot 5) \pmod 7 = 1$. Check index 1: `24`. Found!
*   Mark index 1 as `DELETED`.
*   Table: `[ _, DELETED, _, 31, _, _, 17 ]`

**Step 7: Search for 17**
*   $h_1(17) = 3$.
*   Check index 3: `31`. Not 17. **Continue probing.**
*   $h_2(17) = 3$.
*   Probe $i=1$: $(h_1(17) + 1 \cdot h_2(17)) \pmod 7 = (3 + 1 \cdot 3) \pmod 7 = 6$. Check index 6: `17`. Found!
*   **Result: 17 found at index 6.**

**Final Table State:**
$$ \boxed{\text{[ _, DELETED, _, 31, _, _, 17 ]}} $$

**Reflection:** This example highlights that `DELETED` markers are universal to open addressing, regardless of the specific probing strategy (linear, quadratic, or double hashing). The table now has two active elements (31, 17) but also one `DELETED` marker. If we had many more deletions, the table would become sparse with tombstones, increasing search times. This would eventually trigger a **rehash** operation, where a new, larger table would be created, and only 31 and 17 would be re-inserted, effectively cleaning up all `DELETED` slots.

## 6. Common mistakes and traps

1.  **Treating `DELETED` as `EMPTY` during search:** This is the most common and critical error. If a search stops at a `DELETED` slot, it will incorrectly report "not found" for any item that was placed *after* that `DELETED` slot in its probe sequence due to a collision.
2.  **Not distinguishing `DELETED` from `EMPTY`:** Using `NULL` or `0` for both truly empty slots and deleted slots can lead to confusion and incorrect logic for insertion and search. They must be distinct states.
3.  **Always skipping `DELETED` slots during insertion:** While `DELETED` slots *can* be skipped, they should ideally be overwritten by new insertions. If insertion only targets `EMPTY` slots, the table will accumulate `DELETED` markers, leading to increased probe lengths and reduced performance.
4.  **Forgetting to handle the "wraparound" (modulo arithmetic) for probing:** Regardless of the probing strategy, all index calculations must correctly use the modulo operator with the table size to ensure probes wrap around to the beginning of the array.
5.  **Not considering the impact of many tombstones on performance:** While tombstones solve the correctness issue, they introduce a performance overhead. A table with many `DELETED` markers can have very long probe sequences, degrading search and insertion times. This often indicates a need for rehashing.
6.  **Incorrectly implementing the probe sequence for deletion:** The deletion process itself requires searching for the key. If the search logic for deletion is flawed (e.g., stops at `DELETED` markers), the item might not be found and deleted correctly.

## 7. Textbook-precise explanation

In an open-addressed hash table $T$ of size $m$, each slot $T[j]$ can be in one of three states:
1.  **EMPTY**: The slot has never held a key-value pair.
2.  **OCCUPIED**: The slot currently holds a key-value pair $(k, v)$.
3.  **DELETED**: The slot previously held a key-value pair which has since been removed. This is often represented by a special sentinel value, distinct from `EMPTY`.

Let $h(k, i)$ be the probe sequence function, which returns the $i$-th probed index for key $k$. For example, with linear probing, $h(k, i) = (h'(k) + i) \pmod m$, where $h'(k)$ is the primary hash function.

The operations are modified as follows:

**1. `HASH-INSERT(T, k, v)`:**
To insert a key-value pair $(k, v)$:
Iterate $i$ from $0$ to $m-1$:
    Let $j = h(k, i)$.
    If $T[j]$ is $\text{EMPTY}$ or $T[j]$ is $\text{DELETED}$:
        Set $T[j] = (k, v)$.
        Increment the count of occupied slots.
        Return $j$.
    If $T[j]$ is $\text{OCCUPIED}$ and its key is $k$:
        (Optional: update value $v$, or handle as error/duplicate).
        Return $j$.
If the loop completes, the table is full (or has too many tombstones to find an empty slot efficiently), and rehashing is required.

**2. `HASH-SEARCH(T, k)`:**
To search for a key $k$:
Iterate $i$ from $0$ to $m-1$:
    Let $j = h(k, i)$.
    If $T[j]$ is $\text{EMPTY}$:
        Return $\text{NIL}$ (key not found).
    If $T[j]$ is $\text{OCCUPIED}$ and its key is $k$:
        Return the value associated with $k$ (or $j$).
    If $T[j]$ is $\text{DELETED}$:
        **Continue to the next probe.** (This is the critical step.)
Return $\text{NIL}$ (key not found after probing all slots, or table full of `DELETED` and `OCCUPIED` slots).

**3. `HASH-DELETE(T, k)`:**
To delete a key $k$:
First, perform a `HASH-SEARCH(T, k)` to find the key.
If $k$ is found at index $j$:
    Set $T[j] = \text{DELETED}$.
    Decrement the count of occupied slots (but not necessarily the count of "used" slots for load factor calculation, as `DELETED` slots still contribute to probe lengths).
    Return $\text{TRUE}$.
If $k$ is not found:
    Return $\text{FALSE}$.

**Performance Implications:**
While tombstone markers correctly handle deletion in open addressing, they can degrade performance. As `DELETED` markers accumulate, the average probe length for both `INSERT` and `SEARCH` operations increases, even if the actual number of `OCCUPIED` elements (the load factor) is low. This is because `SEARCH` must probe through `DELETED` slots, and `INSERT` might also probe through them before finding a suitable slot. This phenomenon eventually necessitates **rehashing**, where a new, larger hash table is created, and only the `OCCUPIED` elements are re-inserted, effectively "cleaning up" all `DELETED` markers. The decision to rehash can be based on the load factor or the proportion of `DELETED` slots.

**Reference:**
This approach is standard in discussions of open addressing. For a detailed treatment, see:
*   Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. Chapter 11, Section 11.4.

## 8. ASCII diagrams

Let's visualize a hash table of size 7 with different states.
`_` represents an `EMPTY` slot.
`K` represents an `OCCUPIED` slot with a key.
`D` represents a `DELETED` slot (tombstone).

```text
Table Size: 7
Hash Function: h(key) = key % 7
Probing: Linear Probing

Initial State:
Index: 0  1  2  3  4  5  6
       -------------------
Table: [ _ ][ _ ][ _ ][ _ ][ _ ][ _ ][ _ ]

---
Step 1: Insert 10 (h(10)=3)
Index: 0  1  2  3  4  5  6
       -------------------
Table: [ _ ][ _ ][ _ ][10][ _ ][ _ ][ _ ]

---
Step 2: Insert 24 (h(24)=3, collides, probes to 4)
Index: 0  1  2  3  4  5  6
       -------------------
Table: [ _ ][ _ ][ _ ][10][24][ _ ][ _ ]

---
Step 3: Insert 17 (h(17)=3, collides, probes to 4, then 5)
Index: 0  1  2  3  4  5  6
       -------------------
Table: [ _ ][ _ ][ _ ][10][24][17][ _ ]

---
Step 4: Delete 10 (h(10)=3, found at 3, mark as DELETED)
Index: 0  1  2  3  4  5  6
       -------------------
Table: [ _ ][ _ ][ _ ][ D ][24][17][ _ ]

---
Step 5: Search for 17 (h(17)=3)
Search Path:
1. Check index 3: Found 'D' (DELETED).
   Action: 'D' is not '17' and not '_'. CONTINUE PROBING.
   (If 'D' were treated as '_', search would stop here, fail to find 17)

2. Check index 4: Found '24'.
   Action: '24' is not '17'. CONTINUE PROBING.

3. Check index 5: Found '17'.
   Action: '17' is '17'. KEY FOUND!

---
Step 6: Insert 31 (h(31)=3)
Search Path for Insertion:
1. Check index 3: Found 'D' (DELETED).
   Action: 'D' is a usable slot for insertion. INSERT 31 HERE.

Index: 0  1  2  3  4  5  6
       -------------------
Table: [ _ ][ _ ][ _ ][31][24][17][ _ ]
```

**Description of the diagram:** The diagram shows the evolution of a hash table. Each row represents the table state after an operation. The indices are at the top, and the content of each slot is below. `_` means `EMPTY`, `D` means `DELETED`, and numbers are `OCCUPIED` keys. The search path for 17 clearly illustrates how the `DELETED` marker at index 3 is skipped, allowing the search to correctly find 17 at index 5. The insertion of 31 then shows how a `DELETED` slot can be reclaimed.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Imagine a **ghost town** (the hash table). When someone moves out, they leave behind a **tombstone** (the `DELETED` marker).
    *   If you're looking for someone (searching), and you see a tombstone, you know someone *used to live there*, but it doesn't mean the person you're looking for *isn't further down the street*. So, you **walk past the tombstone** and keep looking.
    *   If you're trying to find a new place to live (inserting), and you see a tombstone, you think, "Ah, this spot is available now! I can **build my house right on top of this old lot**."

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Fact 1: `DELETED` is distinct from `EMPTY`.** (`DELETED` $\neq$ `EMPTY`)
    *   **Fact 2: Search *must continue* past `DELETED` slots.** (Search logic: `if (slot == DELETED) continue;`)
    *   **Fact 3: Insertion *can overwrite* `DELETED` slots.** (Insert logic: `if (slot == EMPTY || slot == DELETED) insert_here;`)

3.  **Spaced-Repetition Schedule:**
    *   Review the concept and worked examples: **1 day** from now.
    *   Review again, focusing on the "Why it matters" and "Common mistakes": **3 days** from now.
    *   Implement a simple hash table with tombstone markers: **7 days** from now.
    *   Review the formal definitions and performance implications: **16 days** from now.
    *   Re-derive the need for tombstones from first principles: **35 days** from now.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget why tombstones are needed, start from the basics:
    1.  **What is open addressing?** All elements live directly in the array. Collisions are resolved by probing for the *next available* slot.
    2.  **What happens if you just set a deleted slot to `EMPTY`?**
        *   Consider keys A, B.
        *   $h(\text{A}) = x$. A goes to $x$.
        *   $h(\text{B}) = x$. B collides with A, probes, and goes to $y$.
        *   Now, delete A. If $T[x]$ becomes `EMPTY`.
        *   Search for B: $h(\text{B}) = x$. $T[x]$ is `EMPTY`. Search *stops*. B is incorrectly not found.
    3.  **How can we fix this?** We need a way to tell the search algorithm, "This spot is empty *now*, but don't stop looking, because someone *might have been forced past here*." This special signal is the tombstone marker.
    4.  **How does insertion use it?** If an insertion encounters a tombstone, it's a perfectly good spot to place a new item, effectively cleaning up the tombstone.
    5.  **What's the downside?** Too many tombstones mean searches still have to probe through them, increasing lookup time. This leads to the need for rehashing.

## 10. Connections — what this leads to

The concept of tombstone markers, or lazy deletion, is a fundamental technique in data structures and has implications and connections to several advanced topics:

1.  **Hash Table Resizing/Rehashing:** The accumulation of tombstone markers is one of the primary triggers for rehashing in open-addressed hash tables. Understanding tombstones is crucial for correctly implementing and optimizing rehashing strategies, ensuring that performance doesn't degrade over time.
2.  **Garbage Collection:** The idea of deferring cleanup (lazy deletion) is analogous to certain aspects of garbage collection in programming languages. Rather than immediately reclaiming memory, systems might mark objects as "deleted" or "unreachable" and collect them during a separate, often less frequent, pass.
3.  **Database Transaction Logs and MVCC (Multi-Version Concurrency Control):** In databases, especially those supporting MVCC, updates and deletions don't necessarily overwrite data immediately. Instead, older versions might be marked as "deleted" or "obsolete" and eventually purged by a background process (like a vacuum cleaner in PostgreSQL). This ensures that concurrent transactions can still see consistent snapshots of data.
4.  **Persistent Data Structures:** In persistent data structures, operations create new versions of the structure while preserving older versions. Deletion in such structures might involve marking elements as logically deleted rather than physically removing them, maintaining the integrity of historical versions.
5.  **Distributed Systems and Conflict Resolution:** In distributed key-value stores or eventually consistent databases, "deletions" might be propagated as "delete markers" or "tombstones." If a key is deleted on one node and updated on another concurrently, the tombstone helps resolve the conflict, ensuring the deletion eventually wins out over older versions.
6.  **Skip Lists and Other Probabilistic Data Structures:** While not directly using "tombstones" in the same way, the concept of marking nodes for deletion and deferring their physical removal can appear in other data structures that benefit from lazy deletion to simplify concurrent operations or maintain structural invariants.
7.  **Cache Invalidation Strategies:** In caching systems, an item might be marked as "stale" or "invalid" (conceptually similar to `DELETED`) rather than immediately removed. This allows other parts of the system to continue using it if needed, or to trigger a refresh mechanism, without breaking concurrent reads.

## 11. Self-check questions

1.  Explain in your own words why simply setting a hash table slot to `EMPTY` after deletion is problematic in open addressing, providing a small example with linear probing.
2.  You have an open-addressed hash table using quadratic probing. The table size is 11. Hash function $h(k) = k \pmod{11}$. Insert keys 12, 23, 34. Then delete 23. Show the table state and explain how a search for 34 would proceed.
3.  Consider a hash table of size $m=10$ using linear probing. The table currently has 5 `OCCUPIED` slots and 3 `DELETED` slots. What is the current load factor based on `OCCUPIED` slots? What is the effective load factor that contributes to probe length, and why is this distinction important?
4.  Design a scenario where inserting a new key into an open-addressed hash table with tombstone markers leads to a shorter probe sequence than if tombstones were not used (i.e., only `EMPTY` slots were considered for insertion).
5.  You are tasked with implementing a `HASH-SEARCH` function for an open-addressed hash table that uses tombstone markers. Write down the pseudocode for this function, clearly indicating how `EMPTY`, `OCCUPIED`, and `DELETED` slots are handled. Assume you have a `probe(key, i)` function that returns the $i$-th probed index.