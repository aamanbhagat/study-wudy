## What it is
Chaining is a collision resolution strategy for hash tables where each slot, or "bucket," in the underlying array points to a data structure—typically a linked list—that stores all key-value pairs that hash to that same index. When a collision occurs (two keys map to the same bucket), the new element is simply added to the existing linked list. The table's "fullness" is measured by the load factor, and if it exceeds a certain threshold, the table is resized and all elements are re-hashed into the new, larger table.

## Why it matters
Hash tables are the workhorse of high-speed lookups, and chaining is the most common and robust way to make them practical. In physics simulations, you might use a hash table to implement a spatial grid for detecting particle collisions; chaining handles cases where multiple particles occupy the same grid cell. In compilers and interpreters, symbol tables that map variable names to their memory addresses are implemented as hash tables, and chaining efficiently handles the inevitable name collisions in large codebases.

## When to study it
Before tackling chaining, you must have a solid grasp of three prerequisites:
1.  **Basic Hashing:** Understand what a hash function is, its purpose (mapping keys to array indices), and the properties of a good hash function.
2.  **Linked Lists:** You must be able to implement, traverse, and insert nodes into a singly linked list from first principles.
3.  **Big-O Notation:** You need fluency in analyzing time and space complexity for best, average, and worst-case scenarios.

If you are not confident in these, pause and review them.

## How to study it (step by step)
1.  **Review Linked List Insertion:** Write a function in your language of choice that appends a new node to the head of a singly linked list. Time yourself; this should take less than 10 minutes. This is the core mechanical operation in chaining.
2.  **Manual Trace:** On paper, draw a hash table as an array of size $m=5$. Use the hash function $h(k) = k \pmod 5$. Insert the keys: 5, 11, 0, 6, 1, 10. Draw the linked list in the bucket for each collision.
3.  **Define Load Factor:** Write down the formula for the load factor, $\alpha$. For the table you just drew, calculate its load factor. Reason about what happens to the average list length as $\alpha$ increases.
4.  **Code the `insert` Operation:** Implement a simple hash table class with an `insert(key, value)` method that uses chaining. The internal structure should be an array of linked list heads.
5.  **Analyze Complexity:** Derive the time complexity for `insert`, `search`, and `delete` in a chained hash table. What is the best case? The worst case (all keys hash to the same bucket)? The average case, expressed in terms of $\alpha$?
6.  **Simulate Resizing:** Take your table from step 2. Assume a load factor threshold of $\lambda_{max} = 1.0$. At which insertion does the table need to resize? Double the table size to $m=10$ and re-hash *all* existing elements into the new table using $h(k) = k \pmod{10}$. Draw the final state.

## Key ideas, with intuition
1.  **The Array Holds Pointers, Not Values:** The fundamental shift from a simple hash table is that the array buckets do not store the elements themselves. Instead, each bucket stores the *head* of a linked list. If a bucket is empty, it holds a `NULL` pointer. This decouples the fixed-size array from the unbounded number of items it can hold.

2.  **Load Factor ($\alpha$) is Average Chain Length:** The load factor is the ratio of the number of elements ($n$) to the number of buckets ($m$).
    $$
    \alpha = \frac{n}{m}
    $$
    Assuming a reasonably good hash function that distributes keys uniformly, the average length of a linked list in your table will be exactly $\alpha$. This is the most important parameter for performance. A search operation involves hashing to find the right bucket ($O(1)$) and then traversing a list of average length $\alpha$. Thus, the average time complexity is $O(1 + \alpha)$.

3.  **Resizing is an Amortized Investment:** A single insertion that triggers a resize is expensive. You must allocate a new, larger array (typically double the size) and then iterate through *every element* in the old table, re-calculate its hash with the new table size, and insert it into the new table. This is an $O(n+m)$ operation. However, because this happens infrequently, its cost is "amortized" over many cheap $O(1+\alpha)$ insertions. This ensures that, on average, insertion remains fast.

## Worked example
Let's build a hash table to store key-value pairs.
-   **Table size:** $m = 4$
-   **Hash function:** $h(k) = \text{hash}(k) \pmod 4$. For simplicity, we'll assume `hash(key)` just returns an integer value for the key.
-   **Load factor threshold for resizing:** $\lambda_{max} = 1.5$

**Initial State:**
An empty array of 4 buckets, all pointing to `NULL`.
$\alpha = 0/4 = 0.0$.

```text
[0] -> NULL
[1] -> NULL
[2] -> NULL
[3] -> NULL
```

**Step 1: `insert("apple", 0.78)`**
-   `hash("apple")` = 9 (example value)
-   Bucket index: $9 \pmod 4 = 1$.
-   Bucket 1 is `NULL`. We create a new node `("apple", 0.78)` and make it the head of the list at index 1.
-   State: $n=1, m=4, \alpha = 0.25$.

```text
[0] -> NULL
[1] -> ("apple", 0.78) -> NULL
[2] -> NULL
[3] -> NULL
```

**Step 2: `insert("banana", 0.21)`**
-   `hash("banana")` = 14
-   Bucket index: $14 \pmod 4 = 2$.
-   Bucket 2 is `NULL`. Create a new node.
-   State: $n=2, m=4, \alpha = 0.5$.

**Step 3: `insert("grape", 1.59)`**
-   `hash("grape")` = 5
-   Bucket index: $5 \pmod 4 = 1$.
-   **Collision!** Bucket 1 already points to `("apple", 0.78)`.
-   We add the new node to the head of this list.
-   State: $n=3, m=4, \alpha = 0.75$.

```text
[0] -> NULL
[1] -> ("grape", 1.59) -> ("apple", 0.78) -> NULL
[2] -> ("banana", 0.21) -> NULL
[3] -> NULL
```

**Step 4: `insert("orange", 0.44)`, `insert("mango", 0.95)`, `insert("kiwi", 2.10)`**
-   `hash("orange")`=11 $\implies$ index 3.
-   `hash("mango")`=3 $\implies$ index 3 (collision).
-   `hash("kiwi")`=6 $\implies$ index 2 (collision).
-   After these insertions, $n=6, m=4$. The load factor is $\alpha = 6/4 = 1.5$.
-   This meets our threshold $\lambda_{max}=1.5$. The next insertion will trigger a resize.

**Step 5: `insert("pear", 1.12)`. Trigger Resize!**
1.  **New Table:** Create a new table of size $m_{new} = 2 \times m = 8$.
2.  **Rehash All:** Iterate through every element in the old table and re-insert it into the new one using $h(k) = \text{hash}(k) \pmod 8$.
    -   "apple" (hash 9): $9 \pmod 8 = 1$.
    -   "grape" (hash 5): $5 \pmod 8 = 5$.
    -   "banana" (hash 14): $14 \pmod 8 = 6$.
    -   "orange" (hash 11): $11 \pmod 8 = 3$.
    -   "mango" (hash 3): $3 \pmod 8 = 3$.
    -   "kiwi" (hash 6): $6 \pmod 8 = 6$.
3.  **Insert New Element:** Finally, insert "pear".
    -   `hash("pear")`=17 $\implies$ $17 \pmod 8 = 1$.

**Final State (after resize and insertion):**
-   $n=7, m=8, \alpha = 7/8 = 0.875$.

```text
[0] -> NULL
[1] -> ("pear", 1.12) -> ("apple", 0.78) -> NULL
[2] -> NULL
[3] -> ("mango", 0.95) -> ("orange", 0.44) -> NULL
[4] -> NULL
[5] -> ("grape", 1.59) -> NULL
[6] -> ("kiwi", 2.10) -> ("banana", 0.21) -> NULL
[7] -> NULL
```
*Reflection:* Each step was mechanical. Hashing determined the bucket, and linked list insertion handled the storage. The load factor acted as a simple trigger, forcing a complete, expensive but necessary reorganization to keep future operations fast by shortening the chains.

## Diagrams
A hash table with $m$ buckets after several insertions, showing collisions resolved by chaining.

```text
 Hash Table (m buckets)
+-----+
|  0  | -> ("key_A", val) -> ("key_X", val) -> NULL
+-----+
|  1  | -> NULL
+-----+
|  2  | -> ("key_B", val) -> NULL
+-----+
  ...
+-----+
| m-1 | -> ("key_C", val) -> ("key_Z", val) -> ("key_Q", val) -> NULL
+-----+

h(key_A) = 0
h(key_X) = 0  <-- Collision
h(key_B) = 2
h(key_C) = m-1
h(key_Z) = m-1  <-- Collision
h(key_Q) = m-1  <-- Collision
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** Think of a hotel with a fixed number of floors (the buckets, $m$). The hash function is the eccentric receptionist who assigns every guest to a floor based on their last name. When multiple guests are assigned to the same floor (a collision), they form a line (a linked list) outside the elevator on that floor. The "load factor" is the average number of people per line. When the lines get too long (load factor > threshold), the manager shuts down, builds a new hotel with twice as many floors, and re-assigns everyone to a new floor in the bigger hotel.

2.  **Formulas to Overlearn:**
    -   Load Factor: $\alpha = n/m$ (number of elements / number of buckets)
    -   Average-Case Time Complexity (Search, Insert, Delete): $O(1 + \alpha)$

3.  **Spaced Repetition Schedule:** Review this mini-lesson and re-derive the key ideas at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget the average time complexity, re-derive it. Total elements are $n$, total buckets are $m$. If the hash function is good, elements are distributed evenly. So, the average number of elements per bucket is simply $n/m$, which is $\alpha$. A search operation requires one hash calculation ($O(1)$) to find the bucket, then a linear scan of the list in that bucket. The average length is $\alpha$, so the scan takes $O(\alpha)$ time. The total is $O(1 + \alpha)$.

## Common mistakes
1.  **Forgetting to Rehash:** During a resize, students often just copy the old linked lists to the new table. This is wrong. You must iterate through every *node* in every list, and recompute its hash index using the *new* table size ($k \pmod{m_{new}}$). The old index is now meaningless.
2.  **Choosing a Bad Load Factor Threshold:** Setting $\lambda_{max}$ too high (e.g., 5.0) saves on resizes but makes the lists long, degrading performance toward $O(n)$. Setting it too low (e.g., 0.2) keeps lists short but forces frequent, expensive resizes. A typical value is around 0.75 to 1.0.
3.  **Incorrect Worst-Case Analysis:** Forgetting that a terrible hash function (e.g., $h(k)=c$) can map all $n$ keys to the same bucket. In this case, the hash table degenerates into a single linked list, and all operations become $O(n)$, not $O(1+\alpha)$.

## Self-check
1.  You have a hash table of size $m=7$ using the hash function $h(k) = k \pmod 7$. Starting with an empty table, show the exact state of the table (drawing the buckets and lists) after inserting the keys 15, 8, 23, 1, 7, 0, 14 in that order.
2.  Consider the final table from the question above. What is its load factor? Describe the exact steps required to perform `search(23)` and `delete(8)`.
3.  Suppose the table from question 1 has a load factor threshold of $\lambda_{max} = 0.8$. At which insertion in the original sequence would a resize have been triggered? Describe the state of the *new* table immediately after that resize and the insertion that caused it. Assume the new table size is the smallest prime number greater than $2m$.