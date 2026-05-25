## What it is
A hash table is a data structure that maps keys to values for highly efficient lookup. It uses a *hash function* to compute an index, also known as a *hash code*, into an array of buckets or slots. The core challenge is handling *collisions*, which occur when the hash function generates the same index for more than one key.

## Why it matters
Hash tables are ubiquitous in software due to their average-case $O(1)$ time complexity for insertions, deletions, and lookups. In aerospace, they are used to manage massive databases of telemetry data, where a timestamp or unique packet ID serves as the key. In machine learning, feature hashing (the "hashing trick") uses this principle to convert categorical features into a numerical vector of fixed size, enabling algorithms to handle enormous feature spaces with manageable memory.

## When to study it
Before tackling hash tables, you must have a firm grasp of these prerequisites:
1.  **Arrays:** A hash table is fundamentally built upon an array. You must understand indexing, memory layout, and $O(1)$ access time.
2.  **Linked Lists:** This is essential for understanding the *chaining* method of collision resolution.
3.  **Big O Notation:** You cannot analyze the performance of a hash table without understanding $O(1)$, $O(n)$, and the distinction between average-case and worst-case complexity.
4.  **Hash Functions (Conceptually):** You don't need to be an expert in cryptography, but you must understand that a hash function is a deterministic procedure that takes an arbitrary input (the key) and produces a fixed-size output (the hash code).

If any of these are weak, pause and review them.

## How to study it (step by step)
1.  **Implement the Core Mapping:** Create a class for a hash table that contains an array. Write a simple hash function, like the modulo operator (`hash(key) = key % array_size`). Implement the `insert` and `lookup` methods assuming no collisions will ever occur.
2.  **Witness a Collision:** Use your simple implementation from step 1. Insert two keys that you know will collide (e.g., insert key `7` and key `17` into a table of size `10`). Observe how the second insertion overwrites the first. This is the problem we need to solve.
3.  **Implement Separate Chaining:** Modify your hash table. Instead of an array of values, create an array of `LinkedList`s. When inserting a key-value pair, hash the key to find the index, then append the pair to the linked list at that index. Modify your `lookup` method to traverse the correct linked list.
4.  **Implement Open Addressing (Linear Probing):** Start over from your simple implementation in step 1. Now, when an insertion causes a collision, instead of creating a list, simply check the next slot in the array (`index + 1`). If that is full, check the next (`index + 2`), and so on, wrapping around to the start of the array if necessary. This is called linear probing.
5.  **Analyze Load Factor:** For both implementations, calculate the load factor $\alpha$ (number of items / number of slots). Insert enough items to make $\alpha > 0.75$. Observe how the performance of lookups degrades, especially for linear probing. This builds intuition for why resizing is necessary.

## Key ideas, with intuition
1.  **The Hash is an Address, Not a Final Destination.** The fundamental operation is converting a key into an array index.
    $$ \text{index} = h(key) \pmod{m} $$
    Here, $h$ is the hash function and $m$ is the size of the array. Think of this as a clever way to turn arbitrary data (like a string "Sputnik-1") into a valid array index (like `42`). The modulo ensures the index is within the array bounds.

2.  **Collisions are a Statistical Certainty.** The "pigeonhole principle" guarantees that if you have more keys ($n$) than slots ($m$), at least one collision *must* occur. Even with $n < m$, collisions are likely due to the random-seeming nature of hash functions. The entire design of a hash table is predicated on having an efficient strategy to handle this inevitable event.

3.  **Chaining: Each Slot is a "Bucket".** Instead of assuming each array slot holds at most one item, we let it hold a collection of items that all hash to that index. The simplest collection is a linked list.
    *   **Intuition:** Imagine a filing cabinet with 100 drawers (slots). When you get a document for "Category 42", you open drawer 42 and drop it in a folder with all the other "Category 42" documents. A lookup involves opening the drawer and searching through that one folder.

4.  **Open Addressing: "If my spot is taken, I'll take yours."** Instead of storing multiple items at one index, we find a different, *open* index for the colliding item. The simplest method is linear probing: just check the next slot, then the next, until an empty one is found.
    *   **Intuition:** You're assigned parking spot 42, but it's taken. You drive to spot 43. Taken. You drive to 44. It's empty, so you park there. To find your car later, you must repeat this exact sequence: check 42, then 43, then 44.

## Worked example
Let's insert the keys `[12, 25, 5, 26, 9]` into a hash table of size $m=7$.
Our hash function is $h(k) = k \pmod{7}$.

**Method 1: Separate Chaining**
Our table is an array of 7 pointers, initially all `NULL`.

1.  **Insert 12:** $12 \pmod{7} = 5$. We place `12` in a new list at index `5`.
2.  **Insert 25:** $25 \pmod{7} = 4$. We place `25` in a new list at index `4`.
3.  **Insert 5:** $5 \pmod{7} = 5$. **Collision!** Index `5` is occupied. We append `5` to the linked list at index `5`.
4.  **Insert 26:** $26 \pmod{7} = 5$. **Collision!** Index `5` is occupied. We append `26` to the list at index `5`.
5.  **Insert 9:** $9 \pmod{7} = 2$. We place `9` in a new list at index `2`.

**Final State (Chaining):**
*   Index 0: `NULL`
*   Index 1: `NULL`
*   Index 2: `-> [9]`
*   Index 3: `NULL`
*   Index 4: `-> [25]`
*   Index 5: `-> [12] -> [5] -> [26]`
*   Index 6: `NULL`

**Method 2: Open Addressing (Linear Probing)**
Our table is an array of 7 slots, initially empty.

1.  **Insert 12:** $12 \pmod{7} = 5$. Slot `5` is empty. Place `12` there. `Table: [_, _, _, _, _, 12, _]`
2.  **Insert 25:** $25 \pmod{7} = 4$. Slot `4` is empty. Place `25` there. `Table: [_, _, _, _, 25, 12, _]`
3.  **Insert 5:** $5 \pmod{7} = 5$. **Collision!** Slot `5` is taken by `12`. Probe next slot: index `6`. It's empty. Place `5` there. `Table: [_, _, _, _, 25, 12, 5]`
4.  **Insert 26:** $26 \pmod{7} = 5$. **Collision!** Slot `5` is taken. Probe index `6`. Taken. Probe index `0` (wrapping around). It's empty. Place `26` there. `Table: [26, _, _, _, 25, 12, 5]`
5.  **Insert 9:** $9 \pmod{7} = 2$. Slot `2` is empty. Place `9` there. `Table: [26, _, 9, _, 25, 12, 5]`

**Reflection:** The chaining method groups colliding elements together at their natural hash index. The open addressing method scatters them throughout the table. This scattering can lead to "primary clustering," where a collision makes future collisions in that neighborhood more likely, degrading performance.

## Diagrams

**Separate Chaining**
```text
  Index
   [0] --- NULL
   [1] --- NULL
   [2] ---+--> [ 9 ] --> NULL
   [3] --- NULL
   [4] ---+--> [ 25 ] --> NULL
   [5] ---+--> [ 12 ] --> [ 5 ] --> [ 26 ] --> NULL
   [6] --- NULL
```

**Open Addressing (Linear Probing)**
```text
  Index    Value   # h(key)
   [0] --- [ 26 ]   (from key 26, h(26)=5)
   [1] --- [empty]
   [2] --- [  9 ]   (from key 9, h(9)=2)
   [3] --- [empty]
   [4] --- [ 25 ]   (from key 25, h(25)=4)
   [5] --- [ 12 ]   (from key 12, h(12)=5)
   [6] --- [  5 ]   (from key 5, h(5)=5)
```

## Memory technique — remember this forever
1.  **The Mnemonic Story:**
    *   **Chaining:** Imagine a hotel front desk with key hooks numbered 0-99 (the array). When a guest arrives, you hash their name to get a hook number. If another guest hashes to the same hook, you simply add their key to the *chain* of keys already on that hook. It's an organized pile-up.
    *   **Open Addressing:** This is a hotel with a lazy front desk clerk. You're assigned room 42, but it's occupied. The clerk says, "Just try 43. If that's full, try 44." You have to search for an *open address*.

2.  **Formulas to Overlearn:**
    *   **Load Factor:** $\alpha = \frac{n}{m}$ (where $n$ = number of elements, $m$ = number of slots). This is the single most important metric for hash table health.
    *   **Average Search Time (Chaining, unsuccessful):** $\approx \alpha$. An unsuccessful search must, on average, traverse a chain of length $\alpha$.
    *   **Average Search Time (Linear Probing, unsuccessful):** $\approx \frac{1}{1-\alpha}$. Notice how this explodes as $\alpha$ approaches 1. This is why you *must* resize.

3.  **Spaced Repetition Schedule:**
    *   Review this material tomorrow (1 day).
    *   Then in 3 days.
    *   Then in 1 week (7 days).
    *   Then in 16 days.
    *   Then in 35 days.
    Actively re-derive the worked example from scratch during each review.

4.  **First Principles Pathway:**
    If you forget everything, rebuild it.
    *   **Goal:** Store key-value pairs for $O(1)$ lookup.
    *   **Tool:** An array gives $O(1)$ access *by index*.
    *   **Bridge:** How to convert a *key* to an *index*? A hash function: `index = h(key) % m`.
    *   **Problem:** What if `h(key1) % m == h(key2) % m`? This is a collision.
    *   **Solution 1 (Chaining):** Don't store one item per slot. Store a list of items.
    *   **Solution 2 (Open Addressing):** If the slot is taken, find another one. The simplest rule is "try the next one".

## Common mistakes
1.  **Choosing a Bad Table Size:** If you use open addressing with $m=10$ and your hash function is $h(k) = k \pmod{10}$, inserting keys `10, 20, 30, 40` will all collide and form a massive cluster, destroying performance. Always choose a prime number for your table size to help distribute keys more evenly.
2.  **Ignoring Load Factor:** Letting a hash table get too full ($\alpha > 0.7$ for open addressing, or $\alpha > 1.0$ for chaining) is the most common performance killer. A production-grade hash table *must* have a resize-and-rehash mechanism. When $\alpha$ exceeds a threshold, you create a new, larger array (e.g., double the size) and re-insert every element into it.
3.  **Incorrectly Handling Deletions in Open Addressing:** If you simply remove an element from a linear probing chain, you break the chain. Any lookups for elements that had to probe past the deleted spot will now fail incorrectly. The standard solution is to use a special "tombstone" value to mark the slot as deleted but still part of a chain.

## Self-check
1.  You have an empty hash table of size $m=11$ that uses the hash function $h(k) = k \pmod{11}$ and linear probing. Show the final state of the array after inserting the keys `22, 3, 14, 4, 25, 6`.
2.  Consider a hash table with separate chaining where the load factor $\alpha=5$. What does this imply about the average performance of a successful lookup? How does this compare to the performance of a simple unsorted linked list containing the same number of elements?
3.  Why is quadratic probing ($index + 1^2$, $index + 2^2$, etc.) often preferred over linear probing ($index + 1$, $index + 2$, etc.) in open addressing schemes? What problem does it solve? What new, more subtle problem might it introduce?