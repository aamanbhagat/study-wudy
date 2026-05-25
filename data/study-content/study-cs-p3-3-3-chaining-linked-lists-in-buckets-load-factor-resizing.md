## 1. What it is — in plain English

Imagine you have a big pile of items, and you want to put them into a set of numbered boxes so you can find them quickly later. You have a special "rule" (a hash function) that tells you which box each item should go into. For example, if your rule is "put the item in the box number that matches its last digit," then item "apple pie" might go into box 5, and "banana" into box 1.

But what happens if two different items, say "apple pie" and "grape," both want to go into box 5 (because their rule makes them both point to 5)? This is called a "collision." Instead of saying "sorry, box 5 is full," Chaining offers a clever solution.

With Chaining, each box doesn't just hold *one* item. Instead, each box is like a hook, and you can hang a whole *chain* of items from it. So, if "apple pie" goes into box 5, and then "grape" also wants box 5, we just add "grape" to the chain already hanging from box 5. All items that map to the same box number simply get linked together in a list at that box.

This way, you never run out of space in a box because of collisions; you just make the chain longer. When you want to find an item, you use your rule to find the right box, and then you just look through the chain of items hanging from that box until you find the one you're looking for.

## 2. Why it matters — real-world applications

Chaining is a fundamental technique in computer science, crucial for building efficient data storage and retrieval systems. Its ability to handle collisions gracefully makes it a cornerstone for many high-performance applications.

1.  **Database Indexing:** Large databases, like those used by financial institutions or e-commerce giants (e.g., Amazon, Google Cloud SQL), rely heavily on hash tables to quickly locate records. When you query a database for a specific user ID or product code, a hash function can map that ID to a specific "bucket" (or chain) in memory, allowing the system to retrieve the data in near-constant time, regardless of how many records are in the database. Without efficient collision resolution like chaining, these lookups would be significantly slower, impacting user experience and system throughput.

2.  **Symbol Tables in Compilers:** When you write code in a language like Python or C++, a compiler or interpreter needs to keep track of all the variables, functions, and classes you define. It uses a "symbol table" to store their names and associated information (like their type or memory address). Hash tables with chaining are often used for symbol tables because they allow for very fast insertion and lookup of these symbols, which is vital for quick compilation and execution of programs. This applies to complex software like the GCC compiler or the Python interpreter.

3.  **Caching Systems:** Caches, whether in your web browser, a CPU, or a large-scale distributed system like Redis, store frequently accessed data for quick retrieval. When data is requested, the cache first checks if it already has a copy. Hash tables are perfect for this "lookup" operation. If the data's key hashes to a bucket that contains a chain, the system quickly scans that chain to see if the cached item is present. This is critical for reducing latency in applications ranging from streaming video (Netflix) to scientific simulations that reuse computed results. In high-performance computing (HPC) for physics simulations, caching intermediate results can drastically reduce computation time.

4.  **Network Routers and Firewalls:** Network devices need to make very fast decisions about where to send data packets or whether to block them. They maintain large tables that map IP addresses to network interfaces or apply security rules. Hash tables with chaining are used to implement these routing and firewall tables, enabling routers to process millions of packets per second by quickly finding the correct entry for each packet's destination or source. This efficiency is paramount for the internet's infrastructure.

## 3. Prerequisites — what you must know first

Before diving deep into Chaining, ensure you have a solid grasp of these foundational concepts:

*   **Basic Hashing Concepts:** Understanding what a hash function is, its role in mapping keys to indices, and the general idea of a hash table as an array used for fast lookups.
*   **Arrays:** Knowledge of how arrays work, including indexed access ($O(1)$ lookup by index), fixed size, and contiguous memory allocation.
*   **Linked Lists:** Familiarity with singly linked lists, including nodes (data and next pointer), how to traverse them, insert new nodes, and delete existing nodes.
*   **Key-Value Pairs:** Understanding that data is often stored as a pair where a "key" uniquely identifies a "value."
*   **Asymptotic Notation (Big O):** The ability to analyze the time and space complexity of algorithms, particularly $O(1)$, $O(N)$, and $O(L)$ where $L$ is list length.

## 4. The core idea — step by step

Let's break down the concept of Chaining, building up from the basic structure to its dynamic behavior.

### Step 1: The Hash Table Structure

*   **Plain English:** Imagine our collection of numbered boxes. In computer science, this collection is an array. Each spot in the array is called a "bucket."
*   **Concrete Example:** If we have 10 buckets, they are indexed from 0 to 9.
*   **Formal/Mathematical:** A hash table $T$ is an array of size $m$, where $T[i]$ represents the $i$-th bucket, for $0 \le i < m$.
    $$T = [T_0, T_1, \dots, T_{m-1}]$$
*   **What could go wrong:** If $m$ is too small, we'll have too many collisions from the start, making our chains very long. If $m$ is too large, we waste memory. Choosing an appropriate initial size is important.

### Step 2: The Hash Function's Role

*   **Plain English:** The hash function is our "rule" that takes an item (a key) and tells us which bucket (array index) it should go into. It's designed to distribute items as evenly as possible across the buckets.
*   **Concrete Example:** If we have keys like "apple" and "banana," a hash function might convert "apple" to a number, say 12345, and then use $12345 \pmod{10}$ to get index 5. "Banana" might hash to 67891, and $67891 \pmod{10}$ gives index 1.
*   **Formal/Mathematical:** Given a key $k$, a hash function $h(k)$ computes an integer index $i$ such that $0 \le i < m$. A common simple hash function is the division method:
    $$h(k) = k \pmod{m}$$
    where $m$ is the number of buckets in the hash table.
*   **What could go wrong:** A "bad" hash function might map many different keys to the *same* bucket, even if the table has plenty of empty spots. This defeats the purpose of hashing, leading to long chains.

### Step 3: Collision Handling with Chaining

*   **Plain English:** When two different keys hash to the same bucket index, we have a collision. Chaining resolves this by making each bucket a "head" of a linked list. Instead of storing the item directly in the bucket, we store a pointer to the first item in a linked list. If a collision occurs, the new item is simply added to this linked list.
*   **Concrete Example:** If "apple" hashes to index 5, it's the first item in the linked list at `T[5]`. If "grape" also hashes to index 5, it's added to the linked list at `T[5]`, becoming the second item (or the new first, depending on insertion strategy).
    ```text
    T[0] -> NULL
    T[1] -> NULL
    T[2] -> NULL
    T[3] -> NULL
    T[4] -> NULL
    T[5] -> "apple" -> "grape" -> NULL
    T[6] -> NULL
    ...
    ```
*   **Formal/Mathematical:** Each entry $T[i]$ in the hash table array stores a pointer to the head of a singly linked list. When a key $k$ hashes to index $i$, it is inserted into the linked list at $T[i]$.
*   **What could go wrong:** If the linked list implementation is buggy, insertions or deletions might break the chain or lose data. Forgetting to handle the `NULL` case (empty list) is a common error.

### Step 4: Insertion (Adding a Key-Value Pair)

*   **Plain English:** To add an item, we first figure out which bucket it belongs to using our hash function. Then, we go to that bucket and add the item to the linked list found there. We typically add new items to the *front* of the list because it's slightly faster (no need to traverse to the end).
*   **Concrete Example:** Insert key `42` into a table of size $m=10$ using $h(k) = k \pmod{10}$.
    1.  Calculate $h(42) = 42 \pmod{10} = 2$.
    2.  Go to bucket `T[2]`.
    3.  If `T[2]` is empty, `42` becomes the first element. If `T[2]` already has a list (e.g., `12 -> 22`), `42` is added to the front: `42 -> 12 -> 22`.
*   **Formal/Mathematical:** To insert a key-value pair $(k, v)$:
    1.  Compute the hash index: $i = h(k)$.
    2.  Create a new node for $(k, v)$.
    3.  Insert this node at the head of the linked list $L_i$ pointed to by $T[i]$. If $L_i$ was empty, $T[i]$ now points to the new node.
    $$T[i] \leftarrow \text{newNode}(k, v) \rightarrow T[i]_{\text{old}}$$
*   **What could go wrong:** If the key already exists, you might want to update its value instead of adding a duplicate. The simple "add to front" strategy doesn't handle this; you'd need to search the list first.

### Step 5: Search (Finding a Value by Key)

*   **Plain English:** To find an item, we use the hash function to figure out its bucket. Then, we look through *only* the items in the linked list hanging from that specific bucket. If we find the item, great! If we reach the end of the chain and haven't found it, the item isn't in our table.
*   **Concrete Example:** Search for key `22` in the table where `T[2]` contains `42 -> 12 -> 22 -> NULL`.
    1.  Calculate $h(22) = 22 \pmod{10} = 2$.
    2.  Go to bucket `T[2]`.
    3.  Traverse the linked list:
        *   Is `42` equal to `22`? No. Move to next.
        *   Is `12` equal to `22`? No. Move to next.
        *   Is `22` equal to `22`? Yes! Found. Return its value.
*   **Formal/Mathematical:** To search for a key $k$:
    1.  Compute the hash index: $i = h(k)$.
    2.  Traverse the linked list $L_i$ pointed to by $T[i]$.
    3.  For each node in $L_i$, compare its key with $k$.
    4.  If a match is found, return the associated value.
    5.  If the end of $L_i$ is reached without a match, the key is not in the table.
*   **What could go wrong:** Forgetting to handle the case where $T[i]$ is `NULL` (the bucket is empty). An empty list means the item definitely isn't there.

### Step 6: Deletion (Removing a Key-Value Pair)

*   **Plain English:** To remove an item, we first find its bucket using the hash function. Then, we search through the linked list in that bucket for the item. Once found, we remove it from the linked list, making sure to correctly link the previous item to the next item in the chain.
*   **Concrete Example:** Delete key `12` from the table where `T[2]` contains `42 -> 12 -> 22 -> NULL`.
    1.  Calculate $h(12) = 12 \pmod{10} = 2$.
    2.  Go to bucket `T[2]`.
    3.  Traverse the linked list:
        *   `42` is not `12`. Keep `42` as the "previous" node.
        *   `12` is `12`. This is the node to delete.
        *   Update `42`'s "next" pointer to point to `22` (the node *after* `12`).
        *   The list becomes `42 -> 22 -> NULL`.
*   **Formal/Mathematical:** To delete a key $k$:
    1.  Compute the hash index: $i = h(k)$.
    2.  Traverse the linked list $L_i$ pointed to by $T[i]$, keeping track of the current node and its predecessor.
    3.  If the node with key $k$ is found:
        *   If it's the head of the list, update $T[i]$ to point to the next node.
        *   Otherwise, update the predecessor's `next` pointer to bypass the node being deleted.
        *   Deallocate the deleted node's memory.
    4.  If the end of $L_i$ is reached without a match, the key was not in the table.
*   **What could go wrong:** Incorrectly updating pointers during deletion can break the linked list, leading to lost data or memory leaks. Special care is needed for deleting the head of the list or the only element.

### Step 7: Load Factor

*   **Plain English:** The load factor tells us how "full" our hash table is on average. It's the total number of items stored divided by the number of available buckets. A high load factor means, on average, chains are longer, and operations will be slower. A low load factor means more empty buckets, potentially wasting memory.
*   **Concrete Example:** If you have 7 items in a table with 10 buckets, your load factor is $7/10 = 0.7$. If you add 3 more items, it becomes $10/10 = 1.0$.
*   **Formal/Mathematical:** The load factor, denoted by $\alpha$ (alpha), is defined as:
    $$\alpha = \frac{n}{m}$$
    where $n$ is the number of items stored in the hash table, and $m$ is the number of buckets (the size of the array).
*   **What could go wrong:** Ignoring the load factor can lead to severely degraded performance. If $\alpha$ gets too high, the hash table essentially becomes a single, very long linked list, making lookups $O(N)$ instead of $O(1)$ on average.

### Step 8: Resizing (Rehashing)

*   **Plain English:** When the load factor gets too high (i.e., chains are getting too long), we need to make the hash table bigger to maintain good performance. This involves creating a *new*, larger array of buckets. Then, we take *every single item* from the old table and re-insert it into the new, larger table using the *new* hash function (which will likely use the new, larger number of buckets). This process is called "rehashing."
*   **Concrete Example:** If our table has 10 buckets and we decide to resize when $\alpha > 0.7$. If we have 8 items, $\alpha = 0.8$, so we resize. We create a new table, say with 20 buckets. We then go through all 8 items in the old table, calculate their new hash index (e.g., $k \pmod{20}$ instead of $k \pmod{10}$), and insert them into the appropriate buckets in the new table.
*   **Formal/Mathematical:** When $\alpha$ exceeds a predefined threshold $\alpha_{max}$ (e.g., 0.7 or 1.0):
    1.  Allocate a new hash table array $T'$ with a larger capacity $m'$ (typically $m' = 2m$ or the next prime number greater than $2m$).
    2.  For each key-value pair $(k, v)$ in the original table $T$:
        *   Compute the new hash index: $i' = h'(k)$, where $h'$ is the hash function for the new table size $m'$.
        *   Insert $(k, v)$ into the linked list at $T'[i']$.
    3.  Replace $T$ with $T'$. Deallocate the old table $T$.
*   **What could go wrong:** Forgetting to rehash *all* elements, or incorrectly calculating the new hash indices, will result in data being lost or placed in the wrong buckets, making them unretrievable. Resizing is an $O(N)$ operation (where $N$ is the number of items), which can be costly if it happens too frequently.

## 5. Worked examples — multiple, with every step shown

We will use the hash function $h(k) = k \pmod{m}$, where $m$ is the current number of buckets. We will assume new items are added to the front of the linked list.

### Example 1: Easy - Simple Insertion

**Problem:** Insert the keys `10`, `22`, `31` into an empty hash table with $m=5$ buckets.

**Given:**
*   Hash table size $m=5$.
*   Hash function $h(k) = k \pmod{5}$.
*   Keys to insert: `10`, `22`, `31`.
*   Initial table: `[NULL, NULL, NULL, NULL, NULL]`

**What we want:** The final state of the hash table after all insertions.

**Step-by-step solution:**

1.  **Insert key `10`:**
    *   Calculate hash: $h(10) = 10 \pmod{5} = 0$.
    *   **Explanation:** The key `10` maps to bucket index `0`.
    *   Place `10` at `T[0]`.
    *   Table state: `[10 -> NULL, NULL, NULL, NULL, NULL]`

2.  **Insert key `22`:**
    *   Calculate hash: $h(22) = 22 \pmod{5} = 2$.
    *   **Explanation:** The key `22` maps to bucket index `2`.
    *   Place `22` at `T[2]`.
    *   Table state: `[10 -> NULL, NULL, 22 -> NULL, NULL, NULL]`

3.  **Insert key `31`:**
    *   Calculate hash: $h(31) = 31 \pmod{5} = 1$.
    *   **Explanation:** The key `31` maps to bucket index `1`.
    *   Place `31` at `T[1]`.
    *   Table state: `[10 -> NULL, 31 -> NULL, 22 -> NULL, NULL, NULL]`

**Final Answer:**
The hash table state is:
```
T[0]: 10 -> NULL
T[1]: 31 -> NULL
T[2]: 22 -> NULL
T[3]: NULL
T[4]: NULL
```

**Reflection:** This example was straightforward because there were no collisions. Each key went into a unique bucket.

---

### Example 2: Medium - Insertion with Collision

**Problem:** Insert the keys `15`, `25`, `7` into a hash table with $m=5$ buckets.

**Given:**
*   Hash table size $m=5$.
*   Hash function $h(k) = k \pmod{5}$.
*   Keys to insert: `15`, `25`, `7`.
*   Initial table: `[NULL, NULL, NULL, NULL, NULL]`

**What we want:** The final state of the hash table after all insertions.

**Step-by-step solution:**

1.  **Insert key `15`:**
    *   Calculate hash: $h(15) = 15 \pmod{5} = 0$.
    *   **Explanation:** Key `15` maps to bucket `0`.
    *   Place `15` at `T[0]`.
    *   Table state: `[15 -> NULL, NULL, NULL, NULL, NULL]`

2.  **Insert key `25`:**
    *   Calculate hash: $h(25) = 25 \pmod{5} = 0$.
    *   **Explanation:** Key `25` also maps to bucket `0`, causing a collision. We add `25` to the front of the linked list at `T[0]`.
    *   Table state: `[25 -> 15 -> NULL, NULL, NULL, NULL, NULL]`

3.  **Insert key `7`:**
    *   Calculate hash: $h(7) = 7 \pmod{5} = 2$.
    *   **Explanation:** Key `7` maps to bucket `2`.
    *   Place `7` at `T[2]`.
    *   Table state: `[25 -> 15 -> NULL, NULL, 7 -> NULL, NULL, NULL]`

**Final Answer:**
The hash table state is:
```
T[0]: 25 -> 15 -> NULL
T[1]: NULL
T[2]: 7 -> NULL
T[3]: NULL
T[4]: NULL
```

**Reflection:** This example introduced a collision, demonstrating how chaining handles it by forming a linked list. The order of insertion into the list (front) is visible.

---

### Example 3: Hard - Search and Deletion

**Problem:**
1.  Start with an empty hash table ($m=7$).
2.  Insert keys: `10`, `24`, `38`, `11`, `45`.
3.  Search for key `38`.
4.  Delete key `24`.
5.  Search for key `11`.
6.  Search for key `99` (which is not present).

**Given:**
*   Hash table size $m=7$.
*   Hash function $h(k) = k \pmod{7}$.
*   Keys for insertion: `10`, `24`, `38`, `11`, `45`.

**What we want:**
*   The hash table state after insertions.
*   The result of each search operation.
*   The hash table state after deletion.

**Step-by-step solution:**

**Part 1: Initial Insertions**

1.  **Insert `10`:** $h(10) = 10 \pmod{7} = 3$.
    *   Table: `[NULL, NULL, NULL, 10 -> NULL, NULL, NULL, NULL]`
2.  **Insert `24`:** $h(24) = 24 \pmod{7} = 3$. (Collision with `10`)
    *   Table: `[NULL, NULL, NULL, 24 -> 10 -> NULL, NULL, NULL, NULL]`
3.  **Insert `38`:** $h(38) = 38 \pmod{7} = 3$. (Collision with `24`, `10`)
    *   Table: `[NULL, NULL, NULL, 38 -> 24 -> 10 -> NULL, NULL, NULL, NULL]`
4.  **Insert `11`:** $h(11) = 11 \pmod{7} = 4$.
    *   Table: `[NULL, NULL, NULL, 38 -> 24 -> 10 -> NULL, 11 -> NULL, NULL, NULL]`
5.  **Insert `45`:** $h(45) = 45 \pmod{7} = 3$. (Collision with `38`, `24`, `10`)
    *   Table: `[NULL, NULL, NULL, 45 -> 38 -> 24 -> 10 -> NULL, 11 -> NULL, NULL, NULL]`

**Table after insertions:**
```
T[0]: NULL
T[1]: NULL
T[2]: NULL
T[3]: 45 -> 38 -> 24 -> 10 -> NULL
T[4]: 11 -> NULL
T[5]: NULL
T[6]: NULL
```

**Part 2: Search for `38`**

1.  Calculate hash: $h(38) = 38 \pmod{7} = 3$.
    *   **Explanation:** `38` maps to bucket `3`.
2.  Traverse `T[3]`:
    *   `45` is not `38`.
    *   `38` is `38`. Found!
    *   **Explanation:** We found `38` in the linked list at `T[3]`.

**Result:** Key `38` **found**.

**Part 3: Delete key `24`**

1.  Calculate hash: $h(24) = 24 \pmod{7} = 3$.
    *   **Explanation:** `24` maps to bucket `3`.
2.  Traverse `T[3]` to find `24` and its predecessor:
    *   Current: `45`. Predecessor: `NULL`. (`45` is not `24`).
    *   Current: `38`. Predecessor: `45`. (`38` is not `24`).
    *   Current: `24`. Predecessor: `38`. (`24` is `24` - this is the node to delete).
3.  Update predecessor's `next` pointer: `38`'s `next` pointer should now point to `10` (which was `24`'s next).
    *   **Explanation:** We remove `24` from the chain by linking `38` directly to `10`.
    *   Table: `[..., 45 -> 38 -> 10 -> NULL, ...]`

**Table after deleting `24`:**
```
T[0]: NULL
T[1]: NULL
T[2]: NULL
T[3]: 45 -> 38 -> 10 -> NULL
T[4]: 11 -> NULL
T[5]: NULL
T[6]: NULL
```

**Part 4: Search for `11`**

1.  Calculate hash: $h(11) = 11 \pmod{7} = 4$.
    *   **Explanation:** `11` maps to bucket `4`.
2.  Traverse `T[4]`:
    *   `11` is `11`. Found!
    *   **Explanation:** We found `11` directly as the head of the list at `T[4]`.

**Result:** Key `11` **found**.

**Part 5: Search for `99`**

1.  Calculate hash: $h(99) = 99 \pmod{7} = 1$.
    *   **Explanation:** `99` maps to bucket `1`.
2.  Traverse `T[1]`:
    *   `T[1]` is `NULL`. The list is empty.
    *   **Explanation:** Since the bucket is empty, `99` cannot be in the table.

**Result:** Key `99` **not found**.

**Final Answer:**
*   Initial table after insertions: `T[3]: 45 -> 38 -> 24 -> 10 -> NULL`, `T[4]: 11 -> NULL`, others `NULL`.
*   Search `38`: **Found**.
*   Table after deleting `24`: `T[3]: 45 -> 38 -> 10 -> NULL`, `T[4]: 11 -> NULL`, others `NULL`.
*   Search `11`: **Found**.
*   Search `99`: **Not found**.

**Reflection:** This example tested multiple operations, including a deletion that required careful pointer manipulation. It also showed how to handle searches for both existing and non-existent keys, including the case of an empty bucket.

---

### Example 4: Advanced - Resizing (Rehashing)

**Problem:**
1.  Start with an empty hash table ($m=5$).
2.  Load factor threshold $\alpha_{max} = 0.7$.
3.  Insert keys: `10`, `22`, `31`, `4`, `15`.
4.  Observe the load factor and trigger resizing. When resizing, double the table size to $m'=10$.
5.  Insert key `27` into the new table.

**Given:**
*   Initial hash table size $m=5$.
*   Hash function $h(k) = k \pmod{m}$ (where $m$ changes after resize).
*   Load factor threshold $\alpha_{max} = 0.7$.
*   Keys to insert: `10`, `22`, `31`, `4`, `15`, `27`.
*   Resizing strategy: $m' = 2m$.

**What we want:**
*   The state of the hash table at each step.
*   The load factor at each step.
*   The details of the resizing process.

**Step-by-step solution:**

**Initial Table:** $m=5$, $n=0$. $\alpha = 0/5 = 0$.
`[NULL, NULL, NULL, NULL, NULL]`

1.  **Insert `10`:**
    *   $h(10) = 10 \pmod{5} = 0$.
    *   Table: `[10 -> NULL, NULL, NULL, NULL, NULL]`
    *   $n=1$. $\alpha = 1/5 = 0.2$. ($\alpha \le 0.7$)

2.  **Insert `22`:**
    *   $h(22) = 22 \pmod{5} = 2$.
    *   Table: `[10 -> NULL, NULL, 22 -> NULL, NULL, NULL]`
    *   $n=2$. $\alpha = 2/5 = 0.4$. ($\alpha \le 0.7$)

3.  **Insert `31`:**
    *   $h(31) = 31 \pmod{5} = 1$.
    *   Table: `[10 -> NULL, 31 -> NULL, 22 -> NULL, NULL, NULL]`
    *   $n=3$. $\alpha = 3/5 = 0.6$. ($\alpha \le 0.7$)

4.  **Insert `4`:**
    *   $h(4) = 4 \pmod{5} = 4$.
    *   Table: `[10 -> NULL, 31 -> NULL, 22 -> NULL, NULL, 4 -> NULL]`
    *   $n=4$. $\alpha = 4/5 = 0.8$.
    *   **Explanation:** Load factor $\alpha = 0.8$ is greater than $\alpha_{max} = 0.7$. **Resizing is triggered!**

**Resizing Process:**

*   **New table size:** $m' = 2 \times 5 = 10$.
*   **New hash function:** $h'(k) = k \pmod{10}$.
*   Create a new empty table `T_new` of size 10: `[NULL, ..., NULL]` (10 times).
*   **Rehash all existing keys from the old table:**
    *   **Key `10` (from old `T[0]`):** $h'(10) = 10 \pmod{10} = 0$.
        *   `T_new[0]: 10 -> NULL`
    *   **Key `31` (from old `T[1]`):** $h'(31) = 31 \pmod{10} = 1$.
        *   `T_new[1]: 31 -> NULL`
    *   **Key `22` (from old `T[2]`):** $h'(22) = 22 \pmod{10} = 2$.
        *   `T_new[2]: 22 -> NULL`
    *   **Key `4` (from old `T[4]`):** $h'(4) = 4 \pmod{10} = 4$.
        *   `T_new[4]: 4 -> NULL`

*   **After rehashing:**
    ```
    T_new[0]: 10 -> NULL
    T_new[1]: 31 -> NULL
    T_new[2]: 22 -> NULL
    T_new[3]: NULL
    T_new[4]: 4 -> NULL
    T_new[5]: NULL
    T_new[6]: NULL
    T_new[7]: NULL
    T_new[8]: NULL
    T_new[9]: NULL
    ```
*   The old table is discarded. The new table is now the active hash table.
*   Current state: $m=10$, $n=4$. $\alpha = 4/10 = 0.4$.

5.  **Insert `15` (after resize):**
    *   $h'(15) = 15 \pmod{10} = 5$.
    *   Table: `[10->NULL, 31->NULL, 22->NULL, NULL, 4->NULL, 15->NULL, NULL, NULL, NULL, NULL]`
    *   $n=5$. $\alpha = 5/10 = 0.5$. ($\alpha \le 0.7$)

6.  **Insert `27` (after resize):**
    *   $h'(27) = 27 \pmod{10} = 7$.
    *   Table: `[10->NULL, 31->NULL, 22->NULL, NULL, 4->NULL, 15->NULL, NULL, 27->NULL, NULL, NULL]`
    *   $n=6$. $\alpha = 6/10 = 0.6$. ($\alpha \le 0.7$)

**Final Answer:**
The hash table state after all operations, including resizing, is:
```
T[0]: 10 -> NULL
T[1]: 31 -> NULL
T[2]: 22 -> NULL
T[3]: NULL
T[4]: 4 -> NULL
T[5]: 15 -> NULL
T[6]: NULL
T[7]: 27 -> NULL
T[8]: NULL
T[9]: NULL
```

**Reflection:** This example clearly demonstrates the resizing process. The critical part is understanding that *all* existing elements must be rehashed and placed into the *new* table based on the *new* table size and corresponding hash function. This is an $O(N)$ operation, where $N$ is the number of elements.

## 6. Common mistakes and traps

1.  **Forgetting to handle empty lists (NULL pointers):** When searching or deleting, students often forget to check if `T[i]` is `NULL` before attempting to traverse the linked list. This leads to null pointer exceptions.
2.  **Incorrectly updating pointers during deletion:** Removing a node from a linked list requires careful management of `previous` and `current` pointers. A common mistake is failing to link the `previous` node to the `next` node of the deleted element, breaking the chain.
3.  **Not rehashing *all* elements during resizing:** Students sometimes only rehash new elements or mistakenly think existing elements stay in their old relative positions. Every single element must be re-inserted using the new hash function and table size.
4.  **Ignoring the load factor:** Failing to monitor the load factor or setting an inappropriate threshold can lead to the hash table degrading into a slow, linked-list-like structure with $O(N)$ average-case performance.
5.  **Assuming uniform distribution:** While hash functions aim for uniform distribution, a poorly chosen hash function or specific key patterns can lead to non-uniform distribution, causing many collisions and long chains in certain buckets.
6.  **Off-by-one errors in modulo arithmetic:** When calculating hash indices, particularly with `k % m`, ensure the result is always within the valid array bounds $[0, m-1]$. This is usually handled by the modulo operator itself for positive numbers, but negative keys or unusual hash functions can sometimes cause issues.

## 7. Textbook-precise explanation

A **hash table** is a data structure that implements an associative array abstract data type, mapping keys to values. It uses a **hash function** $h(k)$ to compute an index into an array of $m$ **buckets** or slots.

**Chaining** is a collision resolution strategy wherein each bucket $T[i]$ in the hash table array stores a pointer to the head of a **singly linked list**. All key-value pairs that hash to the same index $i$ are stored in the linked list associated with $T[i]$.

**Operations:**

*   **Insertion (INSERT(T, k, v)):** To insert a key-value pair $(k, v)$, compute the hash index $i = h(k)$. Then, insert a new node containing $(k, v)$ at the head of the linked list $L_i$ pointed to by $T[i]$. This operation takes $O(1)$ time in the worst case, assuming linked list insertion at the head is $O(1)$.
*   **Search (SEARCH(T, k)):** To search for a key $k$, compute the hash index $i = h(k)$. Then, traverse the linked list $L_i$ pointed to by $T[i]$, comparing the key of each node with $k$. If a match is found, return the associated value; otherwise, if the end of the list is reached, the key is not present. The worst-case time complexity is $O(L)$, where $L$ is the length of the longest chain.
*   **Deletion (DELETE(T, k)):** To delete a key $k$, compute the hash index $i = h(k)$. Traverse the linked list $L_i$ to find the node containing $k$. Once found, remove the node from the list by updating the pointers of its predecessor and successor. If $k$ is the head of the list, $T[i]$ must be updated. The worst-case time complexity is $O(L)$.

**Load Factor ($\alpha$):**
The **load factor** of a hash table is defined as the ratio of the number of items $n$ stored in the table to the number of buckets $m$:
$$\alpha = \frac{n}{m}$$
The load factor is a critical measure of the hash table's efficiency. In a hash table using chaining, it represents the average length of the linked lists.

**Performance Analysis:**
Assuming simple uniform hashing (where any given key is equally likely to hash into any of the $m$ slots, independently of where any other key has hashed):
*   **Average-case time complexity:**
    *   **Search and Delete:** $O(1 + \alpha)$. If $\alpha$ is kept constant (e.g., by resizing), these operations are $O(1)$ on average.
    *   **Insertion:** $O(1)$ (assuming unique keys or inserting duplicates without prior search). If duplicates are checked, it becomes $O(1 + \alpha)$.
*   **Worst-case time complexity:** If all $n$ keys hash to the same bucket, the hash table degenerates into a single linked list. In this scenario, search, insert (with duplicate check), and delete operations take $O(n)$ time.

**Resizing (Rehashing):**
To maintain good average-case performance, particularly $O(1 + \alpha)$ for search and delete, the load factor $\alpha$ must be kept below a certain **threshold** $\alpha_{max}$ (e.g., 0.7 or 1.0). When $n/m > \alpha_{max}$, the hash table undergoes a **resize** operation:
1.  A new hash table $T'$ with a larger capacity $m'$ (typically $m' = 2m$ or the smallest prime number greater than $2m$) is allocated.
2.  A new hash function $h'$ (using $m'$) is adopted.
3.  Every key-value pair $(k, v)$ from the original table $T$ is rehashed using $h'(k)$ and re-inserted into $T'$.
4.  The old table $T$ is deallocated.
This resizing process takes $O(n)$ time, as all $n$ elements must be re-inserted. While costly, it ensures that subsequent operations remain efficient on average.

*Reference: Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed., Chapter 11.2, "Collision resolution by chaining"). MIT Press.*

## 8. ASCII diagrams

Here is an ASCII diagram illustrating a hash table using chaining:

```text
Hash Table (Array of Buckets)
---------------------------------------------------------------------
| T[0] | ---------> [Key: 10 | Value: "Apple"] -> [Key: 20 | Value: "Banana"] -> NULL
---------------------------------------------------------------------
| T[1] | ---------> NULL
---------------------------------------------------------------------
| T[2] | ---------> [Key: 12 | Value: "Orange"] -> NULL
---------------------------------------------------------------------
| T[3] | ---------> [Key: 3 | Value: "Grape"] -> [Key: 13 | Value: "Kiwi"] -> [Key: 23 | Value: "Mango"] -> NULL
---------------------------------------------------------------------
| T[4] | ---------> NULL
---------------------------------------------------------------------
| T[5] | ---------> [Key: 5 | Value: "Pear"] -> NULL
---------------------------------------------------------------------
  ...
| T[m-1] | ---------> NULL
---------------------------------------------------------------------

Explanation:
- Each T[i] is a "bucket" in the main array.
- If a bucket contains items, it points to the first node of a linked list.
- Each node in the linked list stores a (Key, Value) pair.
- The '->' represents a pointer to the next node in the list.
- 'NULL' signifies the end of a linked list.
- Keys 10 and 20 hash to T[0].
- Keys 3, 13, and 23 hash to T[3].
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Imagine a coat check. Each numbered hook is a "bucket." When people arrive, they hang their coats on the hook corresponding to their ticket number (hash value). If a hook already has a coat, they don't get a new hook; they just hang their coat *on top of* or *below* the existing coat, forming a "chain" of coats on that single hook. When the coat check gets too full, they bring out a *bigger* coat rack (resizing) and re-hang all the coats using a new system.
    **Key phrase:** "Chains for Collisions, Hooks for Hash"

2.  **Formulas/Facts to Overlearn:**
    *   **Load Factor:** $\alpha = \frac{n}{m}$ (Number of items / Number of buckets). This is the most crucial metric for performance.
    *   **Average-case search/delete time:** $O(1 + \alpha)$. This tells you why keeping $\alpha$ low is important.
    *   **Resizing trigger:** When $\alpha > \alpha_{max}$ (a predefined threshold, often 0.7 or 1.0).

3.  **Spaced Repetition Schedule:**
    *   Review this lesson:
        *   **1 day** from now
        *   **3 days** from now
        *   **7 days** from now
        *   **16 days** from now
        *   **35 days** from now
    *   During each review, try to explain Chaining in your own words, draw the ASCII diagram from memory, and work through a simple example.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget how chaining works, start with the core problem:
    *   "I have an array (hash table) to store items for fast lookup."
    *   "I use a hash function to map items to array indices (buckets)."
    *   "What happens if two different items map to the *same* index (a collision)?"
    *   "I can't just overwrite one with the other, I'll lose data."
    *   "I can't just put it in the next empty spot, because then finding it would be complicated."
    *   "Aha! What if each array spot doesn't just hold *one* item, but a *collection* of items? A linked list is a perfect collection for this!"
    *   "So, each bucket becomes the head of a linked list. When a collision happens, I just add the new item to that bucket's linked list."
    *   "To find an item, I go to its bucket, then search through *only* that bucket's linked list."
    *   "If the lists get too long (high load factor), I need more buckets (resize) and re-distribute everything."
    This thought process will always lead you back to the core mechanics of chaining.

## 10. Connections — what this leads to

Chaining is a foundational concept that opens the door to understanding many advanced data structures and algorithms:

*   **Other Collision Resolution Strategies:** Chaining is one way to handle collisions. It naturally leads to studying **Open Addressing** techniques (linear probing, quadratic probing, double hashing), which store all elements directly within the hash table array itself, using different strategies to find the next available slot. Understanding chaining first highlights the trade-offs (e.g., memory overhead of pointers vs. clustering issues in open addressing).
*   **Advanced Hash Table Implementations:** Concepts like **Cuckoo Hashing** (where elements can "kick out" other elements to different locations) and **Linear Hashing** (which resizes incrementally without a full rehash) build upon the fundamental ideas of hashing and collision resolution, aiming for even better worst-case guarantees or more graceful resizing.
*   **Database Indexing Optimizations:** The principles of hash tables are extended in database systems for various indexing strategies (e.g., hash indexes for equality lookups). Understanding chaining helps in appreciating why certain database operations are fast and how database architects design their storage engines.
*   **Cache Design and Memory Management:** Caches (CPU caches, web caches, database caches) frequently use hash table-like structures to quickly determine if a requested item is present. Chaining's efficiency for lookups is directly applicable here.
*   **Cryptographic Hashing (Conceptual Link):** While cryptographic hash functions have very different goals (security, integrity, one-way property) than data structure hash functions (uniform distribution, speed), the fundamental idea of mapping arbitrary input to a fixed-size output is shared. Understanding data structure hashing provides a basic context for appreciating the complexity of cryptographic hashes.
*   **Bloom Filters:** These probabilistic data structures, used for quickly checking if an element *might* be in a set (with a small chance of false positives), often employ multiple hash functions and can be seen as an extension of hashing concepts for space-efficient membership queries.
*   **Distributed Hash Tables (DHTs):** In large-scale distributed systems, DHTs (like those used in peer-to-peer networks or cloud storage) distribute data across many nodes using hashing principles. Chaining's concept of mapping keys to "locations" (which can be network nodes) is a useful mental model for understanding DHTs.

## 11. Self-check questions

1.  Consider a hash table of size $m=10$ using chaining. The hash function is $h(k) = k \pmod{10}$. Insert the keys: `5`, `15`, `25`, `6`, `16`, `26`. Draw the final state of the hash table.
2.  Using the hash table from Question 1, what is the load factor $\alpha$? If the resizing threshold is $\alpha_{max} = 0.7$, should the table be resized? Justify your answer.
3.  Describe, in detail, the steps involved in deleting a key from a chained hash table, paying particular attention to the edge cases (e.g., deleting the head of a list, deleting the only element in a bucket).
4.  A hash table of size $m=8$ uses chaining and $h(k) = k \pmod{8}$. It currently contains keys `10`, `18`, `25`, `3`. If a resizing event occurs where the new table size is $m'=16$, illustrate the state of the new hash table after all keys have been rehashed.
5.  Explain the average-case and worst-case time complexities for search operations in a chained hash table. Under what conditions does the worst-case scenario occur, and how does the load factor relate to these complexities?