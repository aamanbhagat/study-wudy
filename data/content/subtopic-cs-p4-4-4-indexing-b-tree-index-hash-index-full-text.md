## What it is
An index is a data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space. It is a copy of selected columns of data from a table, designed for efficient searching. The index contains pointers back to the original rows of data.

## Why it matters
In high-performance systems, linear scans of data are unacceptable. For a flight control system logging telemetry at 1 kHz, finding a specific event in terabytes of historical data would take hours without an index; with one, it takes milliseconds. In physics, analyzing particle collision data from the LHC requires rapidly filtering billions of events based on energy or particle type, a task made feasible only by sophisticated indexing.

## When to study it
You should understand these prerequisites first:
*   **Data Structures:** Hash Tables, Trees (specifically Binary Search Trees), and Arrays.
*   **Algorithmic Complexity:** Big O notation, particularly $O(1)$, $O(n)$, and $O(\log n)$.
*   **Basic Database Concepts:** What tables, rows, and columns are.

If you are not comfortable deriving the time complexity of a hash table lookup or a binary tree search, review those topics first.

## How to study it (step by step)
1.  **Baseline:** On paper, create a simple table of 10 `(ID, Name)` pairs, with IDs not in order. Time yourself finding the record where `ID = 7`. This is a linear scan, $O(n)$.
2.  **Hash Index:** Create a hash index for your table. Use a simple hash function like `h(ID) = ID mod 5`. Draw an array of 5 "buckets". For each row, calculate the hash of the ID and place a pointer to that row in the corresponding bucket. Now, find `ID = 7` again by first computing the hash. Notice the direct lookup.
3.  **B-Tree Index:** Re-draw your original table. Now, build a B-Tree of order 3 on the `ID` column. Insert the IDs one by one, splitting nodes as they overflow. Trace the path from the root to the leaf to find `ID = 7`.
4.  **Compare:** Write down the pros and cons of your hash index vs. your B-tree. Which one could help you find all IDs between 3 and 8 quickly? Why can't the other one?
5.  **Inverted Index:** Imagine your `Name` column contained sentences like "The rocket is fast" and "The rocket is big". To find all rows containing "rocket", a normal index is useless. Design an "inverted index" that maps words (`"rocket"`, `"fast"`, `"big"`) to the IDs of the rows containing them. This is the core of full-text search.

## Key ideas, with intuition
1.  **The Core Trade-Off:** Indexes are not free. They consume storage space and, more importantly, they slow down write operations (`INSERT`, `UPDATE`, `DELETE`). Every time you modify data, the database must also modify the corresponding index(es). You are trading faster reads for slower writes and more disk space.
2.  **B-Trees are for Disk, Not RAM:** A computer reads data from a disk in contiguous blocks or "pages" (e.g., 4KB). A B-tree is designed to be "short and fat" instead of "tall and skinny" like a binary search tree. Each node is sized to fit in a single disk page. By having a high branching factor (many children per node), the height of the tree is kept extremely low. This minimizes the number of slow disk reads required to find a piece of data.
    $$ \text{Height} \approx \log_b(n) $$
    where $n$ is the number of items and $b$ is the branching factor. A large $b$ means a very small height.
3.  **Hash Indexes are One-Trick Ponies:** A hash index uses a hash function to map a key directly to the location of the data. This is incredibly fast, averaging $O(1)$ time, for one specific task: equality lookups (`WHERE id = 'some_value'`). Because the hash function randomizes the input, it destroys any ordering. Therefore, it cannot be used for range queries (`WHERE id > 100`).
4.  **Full-Text Indexes are Inverted:** Standard indexes map a row's key to a row's location. A full-text index does the opposite for text documents. It takes all the unique words (terms) in a body of text, and for each term, it creates a list of all documents that contain it. This is called an **inverted index**. It turns a search for `"rocket"` from "scan every document for the word 'rocket'" into "look up 'rocket' in the index and get the list of documents."

## Worked example
Let's build a **B-tree of order 5** for an index on an integer column. "Order 5" means a node can have at most 5 children and at most 4 keys. A node must be at least half-full.

**Data to insert:** `10, 20, 30, 40, 5, 15, 25, 35`

1.  **Insert 10, 20, 30, 40:** The first four keys fit into the root node.
    *   Root: `[10, 20, 30, 40]`

2.  **Insert 5:** The root node is full. We must split it. The median key, `20`, is promoted upwards to form a new root.
    *   The values less than `20` go to a new left child: `[5, 10]`
    *   The values greater than `20` go to a new right child: `[30, 40]`
    *   New Root: `[20]`
    *   The tree now has a height of 2.

3.  **Insert 15:** We search for where `15` should go. Start at the root `[20]`. `15 < 20`, so we go to the left child `[5, 10]`. We insert `15` into this node.
    *   Root: `[20]`
    *   Left Child: `[5, 10, 15]`
    *   Right Child: `[30, 40]`

4.  **Insert 25:** Search from the root `[20]`. `25 > 20`, so we go to the right child `[30, 40]`. We insert `25` into this node.
    *   Root: `[20]`
    *   Left Child: `[5, 10, 15]`
    *   Right Child: `[25, 30, 40]`

5.  **Insert 35:** Search from the root `[20]`. `35 > 20`, so go right to `[25, 30, 40]`. Insert `35`.
    *   Root: `[20]`
    *   Left Child: `[5, 10, 15]`
    *   Right Child: `[25, 30, 35, 40]`

**Reflection:**
*   **Step 1:** Simple insertion into an available slot.
*   **Step 2:** This is the key operation. When a node overflows, we split it around the median, promoting the median to the parent. This is how the tree grows in height, and it guarantees the tree remains balanced.
*   **Steps 3-5:** These show the standard search-and-insert procedure. The tree's structure directs the insertion to the correct leaf node.

## Diagrams
A B-Tree of order 3 after inserting `10, 20, 5, 15`:

```text
       [10]
      /    \
     /      \
   [5]     [15, 20]
```
After inserting `25`, the right node `[15, 20]` is full. It splits, and `20` is promoted.

```text
       [10, 20]
      /   |    \
     /    |     \
   [5]   [15]   [25]
```

A Hash Index (`h(k) = k mod 4`):

```text
          +----------+
Keys ---> | h(key)   | ---> Buckets     ---> Pointers to Data Rows
          +----------+
 10 --->  | 10 mod 4 | ---> [ 2 ] ------> {ptr_to_row_10}
 21 --->  | 21 mod 4 | ---> [ 1 ] ------> {ptr_to_row_21}
  5 --->  |  5 mod 4 | ---> [ 1 ] ------> {ptr_to_row_21, ptr_to_row_5} (Collision)
  8 --->  |  8 mod 4 | ---> [ 0 ] ------> {ptr_to_row_8}
```

## Memory technique — remember this forever
1.  **The Library Analogy:**
    *   **Hash Index:** You know the exact call number of a book (e.g., QA76.9.D3). You go directly to the librarian (the hash function) who tells you the exact shelf (the memory address). It's instant, but only if you have the *exact* number.
    *   **B-Tree Index:** You want a book on "Databases". You use the card catalog. You first find the "D" drawer (root node), then the "Da" section (intermediate node), then the specific card for your book (leaf node) which tells you the shelf. It's great for finding a specific book or browsing all books between "Data Structures" and "Databases" (range scan).
    *   **Full-Text Index:** You want to find every book in the library that mentions "black holes". You use the library's subject index (the inverted index), look up "black holes", and get a list of every book that contains that phrase.

2.  **Must Overlearn:**
    *   B-Tree lookup complexity: $O(\log_b n)$ where $b$ is the branching factor.
    *   Hash Index lookup complexity: $O(1)$ on average.
    *   The fundamental trade-off: Indexes accelerate `SELECT` at the cost of `INSERT`, `UPDATE`, `DELETE` performance and disk space.

3.  **Spaced Repetition Schedule:** Review this material in 1 day, 3 days, 7 days, 16 days, and 35 days. Spend 10 minutes rebuilding the B-tree example from scratch each time.

4.  **First Principles Pathway:** If you forget B-tree complexity, start from a balanced binary search tree. Its height is $\log_2 n$. A B-tree is a generalization where each node has up to $b$ children instead of 2. This changes the base of the logarithm to $b$, giving a height of $\log_b n$. Since disk I/O is proportional to height, a larger $b$ dramatically reduces I/O.

## Common mistakes
*   **Indexing everything:** Creating an index on every column is a classic beginner mistake. It severely degrades write performance and offers no benefit for columns you don't search on.
*   **Using `LIKE "%text"`:** A B-tree index on a text column can be used for `LIKE "text%"` (prefix search) but is useless for `LIKE "%text"` (leading wildcard search). The index is sorted alphabetically, so it can't find substrings starting anywhere.
*   **Confusing B-Tree and Binary Tree:** The "B" in B-Tree does not stand for "Binary". They are fundamentally different; B-trees are optimized for block storage devices (disks) with high branching factors, while binary trees are typically used for in-memory data structures.
*   **Ignoring Cardinality:** Indexing a column with very low cardinality (very few unique values, e.g., a `gender` column with 'male', 'female', 'other') is often useless. The index won't be selective enough to significantly narrow down the search.

## Self-check
1.  You are designing a table to store user login information. Users will always be looked up by their unique `email_address`. Which index type, B-tree or hash, would be the optimal choice for the `email_address` column, and why?
2.  Consider a database for a spacecraft's trajectory data with columns `(timestamp, x_coord, y_coord, z_coord)`. The most common query is to retrieve all position data within a given time interval (e.g., from `T1` to `T2`). What single index would be most effective for this query? What if a second common query was to find the timestamp of a specific event at a known `(x, y, z)` location?
3.  Explain why updating a value in a column with a B-tree index can be significantly more complex than just changing the data in the table's main storage. Describe the worst-case scenario for an `UPDATE` operation in terms of B-tree node modifications.