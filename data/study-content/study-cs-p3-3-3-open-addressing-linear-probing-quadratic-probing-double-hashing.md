## 1. What it is — in plain English

Imagine you have a big set of numbered mailboxes, and you want to put letters into them. To make it fast, you have a special machine (a "hash function") that looks at the name on a letter and tells you exactly which mailbox number it should go into. Most of the time, this works great! You just go to that mailbox and drop the letter in.

But what happens if the machine tells you to put a letter into mailbox #5, but someone else's letter is already there? This is called a "collision." You can't just throw out the old letter or put two letters in the same tiny slot. You need a plan B.

"Open addressing" is one such plan B. Instead of getting a *new* set of mailboxes somewhere else (which is another strategy called "separate chaining"), you decide to find another *empty spot within the same set of mailboxes*. It's like saying, "Okay, mailbox #5 is taken, so let me look for the *next available mailbox* close by."

There are different strategies for how you look for that next available spot:
*   **Linear probing**: If mailbox #5 is taken, you try #6. If #6 is taken, you try #7, and so on, until you find an empty one. You just go in a straight line.
*   **Quadratic probing**: If mailbox #5 is taken, you try #6 (which is $5+1^2$). If that's taken, you don't just go to #7. Instead, you jump further to #9 (which is $5+2^2$). If that's taken, you jump even further to #14 ($5+3^2$), and so on. The jumps get bigger each time.
*   **Double hashing**: This is a bit more sophisticated. You use your first machine to get an initial mailbox number (say, #5). But if it's taken, you use a *second, different* machine that tells you how many steps to take to find the next spot. So, if the second machine says "take 3 steps," you'd try #5, then #8, then #11, then #14, and so on. The step size is constant for that specific letter, but different for other letters.

In essence, open addressing means you *probe* (search) for an open address (an empty slot) in the main storage array itself when a collision occurs.

## 2. Why it matters — real-world applications

Hashing with open addressing is a fundamental technique for building highly efficient data storage and retrieval systems. Its ability to quickly find, insert, and delete data makes it indispensable across many domains.

1.  **Database Indexing and Caching**: Many in-memory databases and caching systems (like Redis or Memcached) use hash tables extensively. When you query a database for a specific record (e.g., "find user with ID 12345"), a hash function quickly maps that ID to a location in memory where the user's data is stored. Open addressing ensures that even if two IDs initially map to the same spot, an alternative, nearby location is found efficiently. This is crucial for sub-millisecond data access in high-throughput applications.
2.  **Compilers and Interpreters (Symbol Tables)**: When a programmer writes code, compilers and interpreters need to keep track of all the variables, functions, and classes defined (known as a "symbol table"). Each symbol has a name (the key) and associated information (like its type, scope, memory address). Hash tables, often implemented with open addressing, provide extremely fast lookups for these symbols, which is vital for quickly checking if a variable is defined or resolving its properties during compilation or execution.
3.  **Network Routers and Firewalls**: Network devices need to make incredibly fast decisions about where to send data packets. They maintain "routing tables" that map destination IP addresses to outgoing network interfaces. Hash tables with open addressing can be used to store and look up these routing rules. Similarly, firewalls use hash tables to quickly check if an incoming or outgoing connection is allowed based on source/destination IP, port, etc., ensuring network security without introducing significant latency.
4.  **Machine Learning (Feature Hashing)**: In natural language processing or other machine learning tasks involving high-dimensional sparse data (like text), "feature hashing" (or the "hashing trick") is a technique to map features (e.g., words in a document) to a fixed-size vector without explicitly storing a mapping. While not directly an open addressing *collision resolution* strategy, it relies on the core idea of hashing. However, for efficient storage and retrieval of learned model parameters or large vocabularies in ML systems, actual hash tables (often using open addressing for performance) are frequently employed. For instance, storing word embeddings or frequently accessed model weights in a cache.
5.  **Operating Systems (File System Caches, Process Tables)**: Operating systems use hash tables for various internal data structures. For example, a file system might cache frequently accessed file blocks using a hash table where the key is the block ID. Similarly, a process table might use hashing to quickly look up process information by Process ID (PID). Open addressing is often favored in these scenarios due to its cache-friendly nature (data is stored contiguously in memory), which can lead to better performance compared to separate chaining, especially when memory access patterns are critical.

## 3. Prerequisites — what you must know first

Before diving deep into open addressing, ensure you have a solid grasp of these foundational concepts:

*   **Arrays**: A basic data structure consisting of a collection of elements, each identified by an array index or key, stored at contiguous memory locations.
*   **Hash Functions**: A function that takes an input (or "key") and returns a fixed-size string of bytes, typically an integer, which serves as an index in an array.
*   **Collisions**: The event where two different input keys produce the same output hash value, or map to the same index in a hash table.
*   **Modulo Operator (`%`)**: An arithmetic operator that computes the remainder of a division, essential for mapping arbitrary hash values to valid array indices.
*   **Big O Notation**: A mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity, used to analyze algorithm efficiency.
*   **Basic Algebra**: Understanding how to manipulate equations and variables, particularly for sequences and functions.

## 4. The core idea — step by step

Open addressing is a collision resolution technique for hash tables where all elements are stored directly within the hash table array itself. When a collision occurs, we systematically "probe" for an empty slot.

### Step 1: The Problem - Collisions

**Plain English:** Imagine our mailboxes are numbered 0 to $m-1$. Our hash function $h(k)$ tells us which mailbox number a key $k$ (like a letter's recipient name) should go into. A collision happens when two different letters, say for "Alice" and "Bob," both get assigned to the same mailbox number, say mailbox #5.

**Concrete Example:**
Let's say our hash table has $m=10$ slots (numbered 0-9).
Our simple hash function is $h(k) = k \pmod{10}$.
We want to insert the key `42`.
$h(42) = 42 \pmod{10} = 2$. So, `42` goes into slot 2.
Now we want to insert the key `12`.
$h(12) = 12 \pmod{10} = 2$. Oh no! Slot 2 is already occupied by `42`. This is a collision.

**Formal/Mathematical Version:**
Given a hash function $h: U \to \{0, 1, \dots, m-1\}$ that maps keys from a universe $U$ to indices in a hash table of size $m$. A collision occurs when for two distinct keys $k_1, k_2 \in U$ where $k_1 \neq k_2$, we have $h(k_1) = h(k_2)$.

**What could go wrong:** If we don't handle collisions, we might overwrite existing data, leading to data loss, or fail to retrieve the correct item later.

### Step 2: Open Addressing - The Strategy

**Plain English:** When a collision occurs at an initial target slot, open addressing means we don't create a new storage area (like a linked list) for that slot. Instead, we look for another *empty slot within the same main array*. It's like saying, "If mailbox #5 is taken, let's try mailbox #6. If that's also taken, let's try #7, and so on, until we find an empty one." This search for an empty slot is called "probing."

**Concrete Example:**
Continuing from Step 1: `42` is in slot 2. We want to insert `12`, and $h(12)=2$.
Since slot 2 is taken, we need a strategy to find the *next* available slot. Open addressing provides these strategies.

**Formal/Mathematical Version:**
In open addressing, all elements are stored directly in the hash table array $T[0 \dots m-1]$. Each slot $T[j]$ contains either a key or `NIL` (empty). When inserting a key $k$, we compute a sequence of probe positions $h(k, 0), h(k, 1), h(k, 2), \dots$ until an empty slot is found.
The general probe sequence is defined as $h(k, i)$, where $i$ is the probe number (starting from 0).

**What could go wrong:** If the table becomes too full, finding an empty slot can take a very long time. If the table is completely full, insertion might never terminate.

### Step 3: Linear Probing

**Plain English:** This is the simplest open addressing strategy. If your initial mailbox number $x$ is taken, you just try the very next mailbox, $x+1$. If that's also taken, you try $x+2$, then $x+3$, and so on. If you reach the end of the mailboxes, you "wrap around" to the beginning (mailbox 0).

**Concrete Example:**
Hash table size $m=10$. Hash function $h_1(k) = k \pmod{10}$.
Insert keys: `42`, `12`, `22`.

1.  Insert `42`: $h_1(42) = 42 \pmod{10} = 2$. Slot 2 is empty. $T[2] = 42$.
    Table: `[ , , 42, , , , , , , ]`
2.  Insert `12`: $h_1(12) = 12 \pmod{10} = 2$. Slot 2 is *occupied* by `42`.
    *   Probe 1 ($i=1$): Try $(h_1(12) + 1) \pmod{10} = (2+1) \pmod{10} = 3$. Slot 3 is empty. $T[3] = 12$.
    Table: `[ , , 42, 12, , , , , , ]`
3.  Insert `22`: $h_1(22) = 22 \pmod{10} = 2$. Slot 2 is *occupied* by `42`.
    *   Probe 1 ($i=1$): Try $(h_1(22) + 1) \pmod{10} = (2+1) \pmod{10} = 3$. Slot 3 is *occupied* by `12`.
    *   Probe 2 ($i=2$): Try $(h_1(22) + 2) \pmod{10} = (2+2) \pmod{10} = 4$. Slot 4 is empty. $T[4] = 22$.
    Table: `[ , , 42, 12, 22, , , , , ]`

**Formal/Mathematical Version:**
The probe sequence for linear probing is defined by the hash function:
$$h(k, i) = (h_1(k) + i) \pmod m$$
where $h_1(k)$ is the initial hash function, $i$ is the probe number ($i=0, 1, 2, \dots, m-1$), and $m$ is the size of the hash table.

**What could go wrong:** Linear probing suffers from a problem called **primary clustering**. If a cluster of occupied slots forms (like `42`, `12`, `22` in slots 2, 3, 4), any new key that hashes into *any* slot within or immediately preceding this cluster will extend the cluster. This leads to longer and longer probe sequences, significantly degrading performance.

### Step 4: Quadratic Probing

**Plain English:** To avoid primary clustering, quadratic probing tries to jump further away when a collision occurs. If your initial mailbox $x$ is taken, you try $x+1^2$. If that's taken, you try $x+2^2$. Then $x+3^2$, and so on. The jumps increase quadratically, spreading out the probes more.

**Concrete Example:**
Hash table size $m=10$. Hash function $h_1(k) = k \pmod{10}$.
Insert keys: `42`, `12`, `22`.

1.  Insert `42`: $h_1(42) = 42 \pmod{10} = 2$. Slot 2 is empty. $T[2] = 42$.
    Table: `[ , , 42, , , , , , , ]`
2.  Insert `12`: $h_1(12) = 12 \pmod{10} = 2$. Slot 2 is *occupied* by `42`.
    *   Probe 1 ($i=1$): Try $(h_1(12) + 1^2) \pmod{10} = (2+1) \pmod{10} = 3$. Slot 3 is empty. $T[3] = 12$.
    Table: `[ , , 42, 12, , , , , , ]`
3.  Insert `22`: $h_1(22) = 22 \pmod{10} = 2$. Slot 2 is *occupied* by `42`.
    *   Probe 1 ($i=1$): Try $(h_1(22) + 1^2) \pmod{10} = (2+1) \pmod{10} = 3$. Slot 3 is *occupied* by `12`.
    *   Probe 2 ($i=2$): Try $(h_1(22) + 2^2) \pmod{10} = (2+4) \pmod{10} = 6$. Slot 6 is empty. $T[6] = 22$.
    Table: `[ , , 42, 12, , , 22, , , ]`
Notice how `22` jumped to slot 6, avoiding the cluster formed by `42` and `12`.

**Formal/Mathematical Version:**
The probe sequence for quadratic probing is defined by:
$$h(k, i) = (h_1(k) + c_1 i + c_2 i^2) \pmod m$$
where $h_1(k)$ is the initial hash function, $i$ is the probe number ($i=0, 1, 2, \dots, m-1$), $m$ is the table size, and $c_1, c_2$ are positive constants. A common simplified form used in practice is $c_1=0, c_2=1$ (or $c_1=1/2, c_2=1/2$ for some implementations, but $i^2$ is more common for intuition):
$$h(k, i) = (h_1(k) + i^2) \pmod m$$
For quadratic probing to guarantee finding an empty slot if one exists (and the table is not more than half full), $m$ must be a prime number.

**What could go wrong:** Quadratic probing avoids primary clustering but can suffer from **secondary clustering**. If two keys hash to the *same initial slot* $h_1(k)$, they will follow the *exact same probe sequence*. This can still lead to performance degradation. Also, if $m$ is not a prime number (or not a power of 2), quadratic probing might not be able to probe all slots in the table, potentially failing to find an empty slot even if one exists.

### Step 5: Double Hashing

**Plain English:** Double hashing uses two hash functions. The first function, $h_1(k)$, gives you the initial target mailbox. If that's taken, the *second* hash function, $h_2(k)$, determines the *step size* you take to find the next spot. For example, if $h_1(k)=5$ and $h_2(k)=3$, you'd try 5, then $5+3=8$, then $8+3=11$ (which wraps around to 1), then $1+3=4$, etc. The key here is that the step size ($h_2(k)$) is different for different keys, which helps spread out probes much more effectively.

**Concrete Example:**
Hash table size $m=10$.
$h_1(k) = k \pmod{10}$
$h_2(k) = 1 + (k \pmod 8)$ (Ensures $h_2(k)$ is never 0 and is relatively prime to $m=10$ if $m$ were prime, but here $m=10$ is not prime, so we need to be careful with $h_2(k)$ to avoid common factors. Let's use $m=11$ for this example to make it easier to ensure $h_2(k)$ is relatively prime to $m$. So $m=11$, $h_1(k) = k \pmod{11}$, $h_2(k) = 1 + (k \pmod{9})$).

Insert keys: `42`, `12`, `22`. (Table size $m=11$)

1.  Insert `42`:
    $h_1(42) = 42 \pmod{11} = 9$. Slot 9 is empty. $T[9] = 42$.
    Table: `[ , , , , , , , , , 42, ]`
2.  Insert `12`:
    $h_1(12) = 12 \pmod{11} = 1$. Slot 1 is empty. $T[1] = 12$.
    Table: `[ , 12, , , , , , , , 42, ]`
3.  Insert `22`:
    $h_1(22) = 22 \pmod{11} = 0$. Slot 0 is empty. $T[0] = 22$.
    Table: `[ 22, 12, , , , , , , , 42, ]`
    (Oops, no collision yet. Let's add `33` to force a collision at 0.)

Let's re-do with keys that cause collisions for $m=11$: `42`, `1`, `12`, `23`.
$h_1(k) = k \pmod{11}$
$h_2(k) = 1 + (k \pmod{9})$ (ensures $h_2(k)$ is in range $[1, 9]$ and relatively prime to $11$)

1.  Insert `42`:
    $h_1(42) = 42 \pmod{11} = 9$. Slot 9 is empty. $T[9] = 42$.
    Table: `[ , , , , , , , , , 42, ]`
2.  Insert `1`:
    $h_1(1) = 1 \pmod{11} = 1$. Slot 1 is empty. $T[1] = 1$.
    Table: `[ , 1, , , , , , , , 42, ]`
3.  Insert `12`:
    $h_1(12) = 12 \pmod{11} = 1$. Slot 1 is *occupied* by `1`. Collision!
    Calculate $h_2(12) = 1 + (12 \pmod 9) = 1 + 3 = 4$.
    *   Probe 1 ($i=1$): Try $(h_1(12) + 1 \cdot h_2(12)) \pmod{11} = (1 + 1 \cdot 4) \pmod{11} = 5 \pmod{11} = 5$. Slot 5 is empty. $T[5] = 12$.
    Table: `[ , 1, , , , 12, , , , 42, ]`
4.  Insert `23`:
    $h_1(23) = 23 \pmod{11} = 1$. Slot 1 is *occupied* by `1`. Collision!
    Calculate $h_2(23) = 1 + (23 \pmod 9) = 1 + 5 = 6$.
    *   Probe 1 ($i=1$): Try $(h_1(23) + 1 \cdot h_2(23)) \pmod{11} = (1 + 1 \cdot 6) \pmod{11} = 7 \pmod{11} = 7$. Slot 7 is empty. $T[7] = 23$.
    Table: `[ , 1, , , , 12, , 23, , 42, ]`
Notice how `12` and `23` both initially hashed to slot 1, but their different $h_2$ values led them to completely different probe sequences, avoiding any clustering.

**Formal/Mathematical Version:**
The probe sequence for double hashing is defined by:
$$h(k, i) = (h_1(k) + i \cdot h_2(k)) \pmod m$$
where $h_1(k)$ and $h_2(k)$ are two different hash functions, $i$ is the probe number ($i=0, 1, 2, \dots, m-1$), and $m$ is the size of the hash table.
It is crucial that $h_2(k)$ never evaluates to zero, and that $h_2(k)$ is relatively prime to $m$ for all $k$. A common way to achieve this is to choose $m$ to be a prime number and define $h_2(k) = 1 + (k \pmod{m-1})$ or $h_2(k) = R - (k \pmod R)$ where $R$ is a prime slightly less than $m$. This ensures that the probe sequence explores all $m$ slots if needed.

**What could go wrong:** If $h_2(k)$ can be zero, or if $h_2(k)$ shares a common factor with $m$, the probe sequence might not cover all slots in the table, potentially failing to find an empty slot even if one exists, or leading to an infinite loop. Choosing $m$ as a prime number and $h_2(k)$ appropriately (e.g., $1 + (k \pmod{m-1})$) generally mitigates this.

## 5. Worked examples — multiple, with every step shown

Let's use a hash table of size $m=10$.
Our primary hash function will be $h_1(k) = k \pmod{10}$.
For double hashing, our second hash function will be $h_2(k) = 1 + (k \pmod 8)$.
We will insert the keys: `15, 25, 35, 45, 5, 16, 26, 6`.
The initial state of the hash table is all `NIL` (empty).

### Example 1: Linear Probing - Insertion

**Problem:** Insert the keys `15, 25, 35, 45, 5, 16, 26, 6` into a hash table of size $m=10$ using linear probing.
$h_1(k) = k \pmod{10}$.

**Given:** Keys: `15, 25, 35, 45, 5, 16, 26, 6`. Table size $m=10$. Linear probing.
**Want:** The final state of the hash table after all insertions.

**Steps:**

1.  **Insert `15`:**
    *   Calculate initial hash: $h_1(15) = 15 \pmod{10} = 5$.
    *   Check slot 5: It's `NIL`.
    *   Insert `15` into slot 5.
    *   Table: `[NIL, NIL, NIL, NIL, NIL, 15, NIL, NIL, NIL, NIL]`
    *   *Explanation:* `15` hashes to index 5, which is empty, so it's placed there.

2.  **Insert `25`:**
    *   Calculate initial hash: $h_1(25) = 25 \pmod{10} = 5$.
    *   Check slot 5: It's occupied by `15`. Collision!
    *   Probe 1 ($i=1$): $(h_1(25) + 1) \pmod{10} = (5+1) \pmod{10} = 6$.
    *   Check slot 6: It's `NIL`.
    *   Insert `25` into slot 6.
    *   Table: `[NIL, NIL, NIL, NIL, NIL, 15, 25, NIL, NIL, NIL]`
    *   *Explanation:* `25` hashes to index 5. Since 5 is taken, linear probing checks the next slot (5+1=6), which is empty.

3.  **Insert `35`:**
    *   Calculate initial hash: $h_1(35) = 35 \pmod{10} = 5$.
    *   Check slot 5: Occupied by `15`. Collision!
    *   Probe 1 ($i=1$): $(h_1(35) + 1) \pmod{10} = (5+1) \pmod{10} = 6$.
    *   Check slot 6: Occupied by `25`. Collision!
    *   Probe 2 ($i=2$): $(h_1(35) + 2) \pmod{10} = (5+2) \pmod{10} = 7$.
    *   Check slot 7: It's `NIL`.
    *   Insert `35` into slot 7.
    *   Table: `[NIL, NIL, NIL, NIL, NIL, 15, 25, 35, NIL, NIL]`
    *   *Explanation:* `35` hashes to index 5. Slots 5 and 6 are taken, so it probes to 7, which is empty. A cluster is forming.

4.  **Insert `45`:**
    *   Calculate initial hash: $h_1(45) = 45 \pmod{10} = 5$.
    *   Check slot 5: Occupied by `15`. Collision!
    *   Probe 1 ($i=1$): $(5+1) \pmod{10} = 6$. Occupied by `25`. Collision!
    *   Probe 2 ($i=2$): $(5+2) \pmod{10} = 7$. Occupied by `35`. Collision!
    *   Probe 3 ($i=3$): $(5+3) \pmod{10} = 8$.
    *   Check slot 8: It's `NIL`.
    *   Insert `45` into slot 8.
    *   Table: `[NIL, NIL, NIL, NIL, NIL, 15, 25, 35, 45, NIL]`
    *   *Explanation:* `45` also hashes to 5. It probes through 6, 7, and finally finds 8 empty. The cluster grows.

5.  **Insert `5`:**
    *   Calculate initial hash: $h_1(5) = 5 \pmod{10} = 5$.
    *   Check slot 5: Occupied by `15`. Collision!
    *   Probe 1 ($i=1$): $(5+1) \pmod{10} = 6$. Occupied by `25`. Collision!
    *   Probe 2 ($i=2$): $(5+2) \pmod{10} = 7$. Occupied by `35`. Collision!
    *   Probe 3 ($i=3$): $(5+3) \pmod{10} = 8$. Occupied by `45`. Collision!
    *   Probe 4 ($i=4$): $(5+4) \pmod{10} = 9$.
    *   Check slot 9: It's `NIL`.
    *   Insert `5` into slot 9.
    *   Table: `[NIL, NIL, NIL, NIL, NIL, 15, 25, 35, 45, 5]`
    *   *Explanation:* Another key hashing to 5. It extends the cluster even further.

6.  **Insert `16`:**
    *   Calculate initial hash: $h_1(16) = 16 \pmod{10} = 6$.
    *   Check slot 6: Occupied by `25`. Collision!
    *   Probe 1 ($i=1$): $(h_1(16) + 1) \pmod{10} = (6+1) \pmod{10} = 7$. Occupied by `35`. Collision!
    *   Probe 2 ($i=2$): $(h_1(16) + 2) \pmod{10} = (6+2) \pmod{10} = 8$. Occupied by `45`. Collision!
    *   Probe 3 ($i=3$): $(h_1(16) + 3) \pmod{10} = (6+3) \pmod{10} = 9$. Occupied by `5`. Collision!
    *   Probe 4 ($i=4$): $(h_1(16) + 4) \pmod{10} = (6+4) \pmod{10} = 10 \pmod{10} = 0$.
    *   Check slot 0: It's `NIL`.
    *   Insert `16` into slot 0.
    *   Table: `[16, NIL, NIL, NIL, NIL, 15, 25, 35, 45, 5]`
    *   *Explanation:* `16` hashes to 6. It encounters the existing cluster and has to probe all the way to slot 0, wrapping around. This clearly shows primary clustering.

7.  **Insert `26`:**
    *   Calculate initial hash: $h_1(26) = 26 \pmod{10} = 6$.
    *   Check slot 6: Occupied by `25`. Collision!
    *   Probe 1 ($i=1$): $(6+1) \pmod{10} = 7$. Occupied by `35`. Collision!
    *   Probe 2 ($i=2$): $(6+2) \pmod{10} = 8$. Occupied by `45`. Collision!
    *   Probe 3 ($i=3$): $(6+3) \pmod{10} = 9$. Occupied by `5`. Collision!
    *   Probe 4 ($i=4$): $(6+4) \pmod{10} = 0$. Occupied by `16`. Collision!
    *   Probe 5 ($i=5$): $(6+5) \pmod{10} = 1$.
    *   Check slot 1: It's `NIL`.
    *   Insert `26` into slot 1.
    *   Table: `[16, 26, NIL, NIL, NIL, 15, 25, 35, 45, 5]`
    *   *Explanation:* Another key hashing to 6. It follows the same long probe sequence as `16` and extends the cluster further.

8.  **Insert `6`:**
    *   Calculate initial hash: $h_1(6) = 6 \pmod{10} = 6$.
    *   Check slot 6: Occupied by `25`. Collision!
    *   Probe 1 ($i=1$): $(6+1) \pmod{10} = 7$. Occupied by `35`. Collision!
    *   Probe 2 ($i=2$): $(6+2) \pmod{10} = 8$. Occupied by `45`. Collision!
    *   Probe 3 ($i=3$): $(6+3) \pmod{10} = 9$. Occupied by `5`. Collision!
    *   Probe 4 ($i=4$): $(6+4) \pmod{10} = 0$. Occupied by `16`. Collision!
    *   Probe 5 ($i=5$): $(6+5) \pmod{10} = 1$. Occupied by `26`. Collision!
    *   Probe 6 ($i=6$): $(6+6) \pmod{10} = 2$.
    *   Check slot 2: It's `NIL`.
    *   Insert `6` into slot 2.
    *   Table: `[16, 26, 6, NIL, NIL, 15, 25, 35, 45, 5]`
    *   *Explanation:* Yet another key hashing to 6. It has to probe through the entire existing cluster and beyond.

**Final Hash Table State:**
$$\boxed{[16, 26, 6, \text{NIL}, \text{NIL}, 15, 25, 35, 45, 5]}$$

**Reflection:** This example clearly demonstrates primary clustering. Keys that initially hash to 5 (`15, 25, 35, 45, 5`) form a cluster from 5 to 9. Keys that initially hash to 6 (`16, 26, 6`) then collide with this cluster and extend it by wrapping around to 0, 1, 2. The probe sequences become very long.

### Example 2: Quadratic Probing - Insertion

**Problem:** Insert the keys `15, 25, 35, 45, 5, 16, 26, 6` into a hash table of size $m=10$ using quadratic probing.
$h_1(k) = k \pmod{10}$. Probe sequence: $h(k, i) = (h_1(k) + i^2) \pmod{10}$.

**Given:** Keys: `15, 25, 35, 45, 5, 16, 26, 6`. Table size $m=10$. Quadratic probing.
**Want:** The final state of the hash table after all insertions.

**Steps:**

1.  **Insert `15`:**
    *   $h_1(15) = 15 \pmod{10} = 5$. Slot 5 is `NIL`. $T[5] = 15$.
    *   Table: `[NIL, NIL, NIL, NIL, NIL, 15, NIL, NIL, NIL, NIL]`

2.  **Insert `25`:**
    *   $h_1(25) = 25 \pmod{10} = 5$. Slot 5 occupied by `15`. Collision!
    *   Probe 1 ($i=1$): $(h_1(25) + 1^2) \pmod{10} = (5+1) \pmod{10} = 6$. Slot 6 is `NIL`. $T[6] = 25$.
    *   Table: `[NIL, NIL, NIL, NIL, NIL, 15, 25, NIL, NIL, NIL]`

3.  **Insert `35`:**
    *   $h_1(35) = 35 \pmod{10} = 5$. Slot 5 occupied by `15`. Collision!
    *   Probe 1 ($i=1$): $(h_1(35) + 1^2) \pmod{10} = (5+1) \pmod{10} = 6$. Slot 6 occupied by `25`. Collision!
    *   Probe 2 ($i=2$): $(h_1(35) + 2^2) \pmod{10} = (5+4) \pmod{10} = 9$. Slot 9 is `NIL`. $T[9] = 35$.
    *   Table: `[NIL, NIL, NIL, NIL, NIL, 15, 25, NIL, NIL, 35]`
    *   *Explanation:* `35` hashes to 5. It probes 6 (taken), then jumps to 9 (empty). This avoids extending the cluster formed by 15 and 25.

4.  **Insert `45`:**
    *   $h_1(45) = 45 \pmod{10} = 5$. Slot 5 occupied by `15`. Collision!
    *   Probe 1 ($i=1$): $(5+1^2) \pmod{10} = 6$. Occupied by `25`. Collision!
    *   Probe 2 ($i=2$): $(5+2^2) \pmod{10} = 9$. Occupied by `35`. Collision!
    *   Probe 3 ($i=3$): $(5+3^2) \pmod{10} = (5+9) \pmod{10} = 14 \pmod{10} = 4$. Slot 4 is `NIL`. $T[4] = 45$.
    *   Table: `[NIL, NIL, NIL, NIL, 45, 15, 25, NIL, NIL, 35]`
    *   *Explanation:* `45` also hashes to 5. It follows the same probe sequence as `35` for $i=0,1,2$, but then jumps to 4. This is an example of secondary clustering, where keys with the same initial hash follow the same probe sequence.

5.  **Insert `5`:**
    *   $h_1(5) = 5 \pmod{10} = 5$. Slot 5 occupied by `15`. Collision!
    *   Probe 1 ($i=1$): $(5+1^2) \pmod{10} = 6$. Occupied by `25`. Collision!
    *   Probe 2 ($i=2$): $(5+2^2) \pmod{10} = 9$. Occupied by `35`. Collision!
    *   Probe 3 ($i=3$): $(5+3^2) \pmod{10} = 4$. Occupied by `45`. Collision!
    *   Probe 4 ($i=4$): $(5+4^2) \pmod{10} = (5+16) \pmod{10} = 21 \pmod{10} = 1$. Slot 1 is `NIL`. $T[1] = 5$.
    *   Table: `[NIL, 5, NIL, NIL, 45, 15, 25, NIL, NIL, 35]`
    *   *Explanation:* `5` also hashes to 5, continuing the secondary clustering. It probes 6, 9, 4, then finally finds 1.

6.  **Insert `16`:**
    *   $h_1(16) = 16 \pmod{10} = 6$. Slot 6 occupied by `25`. Collision!
    *   Probe 1 ($i=1$): $(h_1(16) + 1^2) \pmod{10} = (6+1) \pmod{10} = 7$. Slot 7 is `NIL`. $T[7] = 16$.
    *   Table: `[NIL, 5, NIL, NIL, 45, 15, 25, 16, NIL, 35]`

7.  **Insert `26`:**
    *   $h_1(26) = 26 \pmod{10} = 6$. Slot 6 occupied by `25`. Collision!
    *   Probe 1 ($i=1$): $(h_1(26) + 1^2) \pmod{10} = (6+1) \pmod{10} = 7$. Occupied by `16`. Collision!
    *   Probe 2 ($i=2$): $(h_1(26) + 2^2) \pmod{10} = (6+4) \pmod{10} = 0$. Slot 0 is `NIL`. $T[0] = 26$.
    *   Table: `[26, 5, NIL, NIL, 45, 15, 25, 16, NIL, 35]`

8.  **Insert `6`:**
    *   $h_1(6) = 6 \pmod{10} = 6$. Slot 6 occupied by `25`. Collision!
    *   Probe 1 ($i=1$): $(h_1(6) + 1^2) \pmod{10} = (6+1) \pmod{10} = 7$. Occupied by `16`. Collision!
    *   Probe 2 ($i=2$): $(h_1(6) + 2^2) \pmod{10} = (6+4) \pmod{10} = 0$. Occupied by `26`. Collision!
    *   Probe 3 ($i=3$): $(h_1(6) + 3^2) \pmod{10} = (6+9) \pmod{10} = 15 \pmod{10} = 5$. Occupied by `15`. Collision!
    *   Probe 4 ($i=4$): $(h_1(6) + 4^2) \pmod{10} = (6+16) \pmod{10} = 22 \pmod{10} = 2$. Slot 2 is `NIL`. $T[2] = 6$.
    *   Table: `[26, 5, 6, NIL, 45, 15, 25, 16, NIL, 35]`

**Final Hash Table State:**
$$\boxed{[26, 5, 6, \text{NIL}, 45, 15, 25, 16, \text{NIL}, 35]}$$

**Reflection:** Quadratic probing successfully avoided the extreme primary clustering seen with linear probing. Keys that hash to 5 (`15, 25, 35, 45, 5`) are now spread out at indices 5, 6, 9, 4, 1. Keys that hash to 6 (`16, 26, 6`) are at 7, 0, 2. However, notice that `45` and `5` both followed the same probe sequence for $i=0,1,2,3$ because they had the same initial hash. This is secondary clustering. Also, with $m=10$ (not prime), quadratic probing might not be able to find an empty slot even if the table is not full (though in this case, it did).

### Example 3: Double Hashing - Insertion

**Problem:** Insert the keys `15, 25, 35, 45, 5, 16, 26, 6` into a hash table of size $m=10$ using double hashing.
$h_1(k) = k \pmod{10}$.
$h_2(k) = 1 + (k \pmod 8)$.

**Given:** Keys: `15, 25, 35, 45, 5, 16, 26, 6`. Table size $m=10$. Double hashing.
**Want:** The final state of the hash table after all insertions.

**Steps:**

1.  **Insert `15`:**
    *   $h_1(15) = 15 \pmod{10} = 5$. Slot 5 is `NIL`. $T[5] = 15$.
    *   Table: `[NIL, NIL, NIL, NIL, NIL, 15, NIL, NIL, NIL, NIL]`

2.  **Insert `25`:**
    *   $h_1(25) = 25 \pmod{10} = 5$. Slot 5 occupied by `15`. Collision!
    *   Calculate $h_2(25) = 1 + (25 \pmod 8) = 1 + 1 = 2$.
    *   Probe 1 ($i=1$): $(h_1(25) + 1 \cdot h_2(25)) \pmod{10} = (5 + 1 \cdot 2) \pmod{10} = 7$. Slot 7 is `NIL`. $T[7] = 25$.
    *   Table: `[NIL, NIL, NIL, NIL, NIL, 15, NIL, 25, NIL, NIL]`

3.  **Insert `35`:**
    *   $h_1(35) = 35 \pmod{10} = 5$. Slot 5 occupied by `15`. Collision!
    *   Calculate $h_2(35) = 1 + (35 \pmod 8) = 1 + 3 = 4$.
    *   Probe 1 ($i=1$): $(h_1(35) + 1 \cdot h_2(35)) \pmod{10} = (5 + 1 \cdot 4) \pmod{10} = 9$. Slot 9 is `NIL`. $T[9] = 35$.
    *   Table: `[NIL, NIL, NIL, NIL, NIL, 15, NIL, 25, NIL, 35]`
    *   *Explanation:* `35` also hashes to 5, but its $h_2(35)$ is 4, leading it to probe 9. This is different from `25`'s probe sequence, effectively avoiding secondary clustering.

4.  **Insert `45`:**
    *   $h_1(45) = 45 \pmod{10} = 5$. Slot 5 occupied by `15`. Collision!
    *   Calculate $h_2(45) = 1 + (45 \pmod 8) = 1 + 5 = 6$.
    *   Probe 1 ($i=1$): $(h_1(45) + 1 \cdot h_2(45)) \pmod{10} = (5 + 1 \cdot 6) \pmod{10} = 11 \pmod{10} = 1$. Slot 1 is `NIL`. $T[1] = 45$.
    *   Table: `[NIL, 45, NIL, NIL, NIL, 15, NIL, 25, NIL, 35]`
    *   *Explanation:* `45` hashes to 5, but its $h_2(45)$ is 6, leading it to probe 1. Again, a unique probe path.

5.  **Insert `5`:**
    *   $h_1(5) = 5 \pmod{10} = 5$. Slot 5 occupied by `15`. Collision!
    *   Calculate $h_2(5) = 1 + (5 \pmod 8) = 1 + 5 = 6$.
    *   Probe 1 ($i=1$): $(h_1(5) + 1 \cdot h_2(5)) \pmod{10} = (5 + 1 \cdot 6) \pmod{10} = 11 \pmod{10} = 1$. Slot 1 occupied by `45`. Collision!
    *   Probe 2 ($i=2$): $(h_1(5) + 2 \cdot h_2(5)) \pmod{10} = (5 + 2 \cdot 6) \pmod{10} = (5+12) \pmod{10} = 17 \pmod{10} = 7$. Slot 7 occupied by `25`. Collision!
    *   Probe 3 ($i=3$): $(h_1(5) + 3 \cdot h_2(5)) \pmod{10} = (5 + 3 \cdot 6) \pmod{10} = (5+18) \pmod{10} = 23 \pmod{10} = 3$. Slot 3 is `NIL`. $T[3] = 5$.
    *   Table: `[NIL, 45, NIL, 5, NIL, 15, NIL, 25, NIL, 35]`
    *   *Explanation:* `5` hashes to 5, and its $h_2(5)$ is 6. It attempts to probe 1 (taken), then 7 (taken), then finds 3. This shows how double hashing can still have collisions along its probe path, but the path itself is determined by two hash functions, making it less predictable than linear or quadratic probing.

6.  **Insert `16`:**
    *   $h_1(16) = 16 \pmod{10} = 6$. Slot 6 is `NIL`. $T[6] = 16$.
    *   Table: `[NIL, 45, NIL, 5, NIL, 15, 16, 25, NIL, 35]`

7.  **Insert `26`:**
    *   $h_1(26) = 26 \pmod{10} = 6$. Slot 6 occupied by `16`. Collision!
    *   Calculate $h_2(26) = 1 + (26 \pmod 8) = 1 + 2 = 3$.
    *   Probe 1 ($i=1$): $(h_1(26) + 1 \cdot h_2(26)) \pmod{10} = (6 + 1 \cdot 3) \pmod{10} = 9$. Slot 9 occupied by `35`. Collision!
    *   Probe 2 ($i=2$): $(h_1(26) + 2 \cdot h_2(26)) \pmod{10} = (6 + 2 \cdot 3) \pmod{10} = (6+6) \pmod{10} = 12 \pmod{10} = 2$. Slot 2 is `NIL`. $T[2] = 26$.
    *   Table: `[NIL, 45, 26, 5, NIL, 15, 16, 25, NIL, 35]`

8.  **Insert `6`:**
    *   $h_1(6) = 6 \pmod{10} = 6$. Slot 6 occupied by `16`. Collision!
    *   Calculate $h_2(6) = 1 + (6 \pmod 8) = 1 + 6 = 7$.
    *   Probe 1 ($i=1$): $(h_1(6) + 1 \cdot h_2(6)) \pmod{10} = (6 + 1 \cdot 7) \pmod{10} = 13 \pmod{10} = 3$. Slot 3 occupied by `5`. Collision!
    *   Probe 2 ($i=2$): $(h_1(6) + 2 \cdot h_2(6)) \pmod{10} = (6 + 2 \cdot 7) \pmod{10} = (6+14) \pmod{10} = 20 \pmod{10} = 0$. Slot 0 is `NIL`. $T[0] = 6$.
    *   Table: `[6, 45, 26, 5, NIL, 15, 16, 25, NIL, 35]`

**Final Hash Table State:**
$$\boxed{[6, 45, 26, 5, \text{NIL}, 15, 16, 25, \text{NIL}, 35]}$$

**Reflection:** Double hashing distributes keys much more uniformly compared to linear or quadratic probing, even with a non-prime table size like $m=10$. Keys that hash to the same initial slot (`15, 25, 35, 45, 5` all to 5; `16, 26, 6` all to 6) now follow completely different probe sequences because their $h_2(k)$ values are distinct. This effectively eliminates primary and secondary clustering, leading to better performance, especially at higher load factors. The empty slot at index 4 is a testament to the better distribution.

### Example 4: Search with Deletion (Linear Probing)

**Problem:** Using the final table from Example 1 (Linear Probing), search for key `26`. Then delete key `25`. Then search for key `35`.
The table state after Example 1: `[16, 26, 6, NIL, NIL, 15, 25, 35, 45, 5]`
We'll mark deleted slots with `DELETED`.

**Given:** Table: `[16, 26, 6, NIL, NIL, 15, 25, 35, 45, 5]`. $m=10$. Linear probing.
$h_1(k) = k \pmod{10}$.
**Want:** Result of search `26`, table after `25` deletion, result of search `35`.

**Steps:**

1.  **Search for `26`:**
    *   Calculate initial hash: $h_1(26) = 26 \pmod{10} = 6$.
    *   Check slot 6: Contains `25`. Not `26`. Collision! Continue probing.
    *   Probe 1 ($i=1$): $(6+1) \pmod{10} = 7$. Contains `35`. Not `26`. Collision!
    *   Probe 2 ($i=2$): $(6+2) \pmod{10} = 8$. Contains `45`. Not `26`. Collision!
    *   Probe 3 ($i=3$): $(6+3) \pmod{10} = 9$. Contains `5`. Not `26`. Collision!
    *   Probe 4 ($i=4$): $(6+4) \pmod{10} = 0$. Contains `16`. Not `26`. Collision!
    *   Probe 5 ($i=5$): $(6+5) \pmod{10} = 1$. Contains `26`. Found!
    *   Result: Key `26` found at index 1.
    *   *Explanation:* The search follows the exact same probe sequence as insertion. It must continue past occupied slots until it finds the key or an empty slot (or wraps around and checks all slots).

2.  **Delete `25`:**
    *   Calculate initial hash: $h_1(25) = 25 \pmod{10} = 5$.
    *   Check slot 5: Contains `15`. Not `25`. Collision!
    *   Probe 1 ($i=1$): $(5+1) \pmod{10} = 6$. Contains `25`. Found!
    *   Mark slot 6 as `DELETED`.
    *   Table: `[16, 26, 6, NIL, NIL, 15, DELETED, 35, 45, 5]`
    *   *Explanation:* We find `25` by probing. Instead of setting the slot to `NIL`, we mark it `DELETED`. If we set it to `NIL`, subsequent searches for keys like `35`, `45`, `5` (which hash to 5 but are stored further down the probe chain) would stop prematurely at the `NIL` slot, incorrectly concluding the key is not present. `DELETED` acts as an occupied slot for searches but an empty slot for insertions.

3.  **Search for `35`:**
    *   Calculate initial hash: $h_1(35) = 35 \pmod{10} = 5$.
    *   Check slot 5: Contains `15`. Not `35`. Collision!
    *   Probe 1 ($i=1$): $(5+1) \pmod{10} = 6$. Contains `DELETED`. Not `35`. Continue probing (because `DELETED` is treated as occupied for search).
    *   Probe 2 ($i=2$): $(5+2) \pmod{10} = 7$. Contains `35`. Found!
    *   Result: Key `35` found at index 7.