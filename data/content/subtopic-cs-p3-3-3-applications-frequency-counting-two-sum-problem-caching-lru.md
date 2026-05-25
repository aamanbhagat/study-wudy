## What it is
Hashing applications use the hash table's average-case constant time, $O(1)$, performance for lookups, insertions, and deletions to solve problems efficiently. Instead of slowly searching through collections of data, we use a hash map as a high-speed index or memory. This allows us to quickly check for the existence of an item, count its frequency, or store and retrieve complex state.

## Why it matters
These patterns are fundamental building blocks in high-performance systems.
-   **Frequency counting** is critical in data analysis, such as building histograms for sensor readings from a rocket engine or analyzing particle collision events in a physics simulation.
-   **The Two-Sum pattern** appears in problems like searching for pairs of interacting particles in N-body simulations or finding complementary financial trades in a large dataset.
-   **Caching (LRU)** is the bedrock of performance for nearly all computer systems, from CPU caches that pre-fetch instructions to Content Delivery Networks (CDNs) that cache website data near users to reduce latency for mission-critical aerospace telemetry.

## When to study it
Before tackling these applications, you must have a solid grasp of the following. If you are missing any, master them first.
1.  **Hash Tables**: You must understand the internal mechanics, including hash functions, key-value pairs, buckets, and collision resolution strategies (chaining and open addressing).
2.  **Big O Notation**: You must be able to analyze and compare the time and space complexity of algorithms, particularly the distinction between $O(1)$, $O(\log n)$, $O(n)$, and $O(n^2)$.
3.  **Arrays and Linked Lists**: You need to know the performance characteristics of these basic data structures. For LRU Cache specifically, a firm understanding of **doubly-linked lists** is non-negotiable.

## How to study it (step by step)
1.  **Implement Frequency Counting.** Given an array of integers, `[3, 1, 2, 4, 2, 1, 2]`, write a function that returns a map of each integer to its frequency. Use a hash map. Code this from scratch.
2.  **Solve and Analyze Two-Sum.** Solve the "Two-Sum" problem: given an array of integers `nums` and a target `t`, find indices of two numbers such that they add up to `t`. First, implement the brute-force $O(n^2)$ solution with nested loops. Then, implement the $O(n)$ solution using a hash map. Articulate the time-space tradeoff between the two approaches.
3.  **Whiteboard the LRU Cache.** Draw the two data structures required for an LRU Cache: a hash map and a doubly-linked list. For a cache of capacity 3, trace the state of both structures through this sequence of operations: `put(1,A)`, `put(2,B)`, `put(3,C)`, `get(1)`, `put(4,D)`.
4.  **Implement the LRU Cache.** Write a `LRUCache` class from scratch. It will need a hash map (`key -> Node`) and a doubly-linked list (`Node`s contain key-value pairs). Implement two methods: `get(key)` and `put(key, value)`. This is a rigorous exercise; focus on the pointer manipulation and ensuring the map and list remain synchronized.
5.  **Derive the "Why".** For each of the three applications, write a one-sentence justification for why the hash map is the right tool. Example for Two-Sum: "It reduces the search for a complement from a linear $O(n)$ scan to a constant $O(1)$ lookup."

## Key ideas, with intuition
1.  **The Instant Lookup.** A hash map is like an infinitely large array where you can use any (hashable) object as an index, not just an integer. This gives you a "magic" ability to check for the presence of an element, or retrieve a value associated with it, in what feels like a single step ($O(1)$). Most hashing applications boil down to leveraging this single powerful feature.

2.  **Trading Space for Time.** The naive Two-Sum solution uses $O(1)$ extra space but takes $O(n^2)$ time. The hash map solution takes $O(n)$ extra space to store the map but reduces the time to $O(n)$. This is a classic engineering tradeoff. In modern systems, memory is often abundant, while processing time is the critical bottleneck, making this a very common and effective optimization.

3.  **Composite Data Structures.** Some problems have multiple constraints that no single data structure can satisfy efficiently. The LRU Cache is the canonical example.
    -   We need fast lookup by key: "Does item 'X' exist in the cache?" -> **Hash Map**
    -   We need to track recency and evict the oldest item quickly -> **Queue (Linked List)**
    A hash map alone has no concept of order. A linked list alone has slow $O(n)$ lookups. By combining them—using a hash map to store pointers to nodes in a doubly-linked list—we get the best of both: $O(1)$ lookup and $O(1)$ updates to the recency order.

## Worked example
**Problem**: Given `nums = [3, 2, 4]` and `target = 6`, find the indices of the two numbers that add up to the target.

**Naive Approach (for comparison)**:
-   Loop `i` from 0 to 2. Loop `j` from `i+1` to 2.
-   If `nums[i] + nums[j] == target`, return `[i, j]`.
-   This would check (3,2), (3,4), then (2,4). It finds `2+4=6` and returns `[1, 2]`.
-   Complexity: $O(n^2)$ time, $O(1)$ space.

**Hash Map Approach (The right way)**:
We iterate through the array once, using a hash map to store the numbers we've already seen and their indices. For each number, we calculate its "complement"—the other number we'd need to reach the target.

Let's trace it.
-   Initialize an empty hash map: `seen = {}`.
-   **i = 0, num = 3**:
    -   Calculate complement: `complement = target - num = 6 - 3 = 3`.
    -   Check if `3` is in `seen`. It is not.
    -   Add `num` and its index to the map: `seen = {3: 0}`.
-   **i = 1, num = 2**:
    -   Calculate complement: `complement = target - num = 6 - 2 = 4`.
    -   Check if `4` is in `seen`. It is not.
    -   Add `num` and its index to the map: `seen = {3: 0, 2: 1}`.
-   **i = 2, num = 4**:
    -   Calculate complement: `complement = target - num = 6 - 4 = 2`.
    -   Check if `2` is in `seen`. It is! The value is `seen[2]`, which is `1`.
    -   We found our pair. The first number's index is `seen[complement]` (which is 1), and the second number's index is the current index `i` (which is 2).
    -   Return `[1, 2]`.

**Reflection**:
-   The hash map acts as an instant memory. At each step, instead of re-scanning the array for the complement, we perform a single $O(1)$ lookup in our `seen` map.
-   This transforms the problem from "for each element, search the rest of the array" to "for each element, ask a question that can be answered in constant time."
-   The total time complexity is dominated by the single loop, making it $O(n)$. The space complexity is $O(n)$ to store the map in the worst case.

## Diagrams
Here is a diagram of an LRU Cache with a capacity of 3. It shows how the hash map provides direct access to the nodes of the doubly-linked list, which maintains the usage order.

```text
State after: put(5,A), put(7,B), put(2,C)

Hash Map (key -> node_address)
+-------+-----------+
| Key   | Address   |
|-------|-----------|
|   5   |  @NodeA   |
|   7   |  @NodeB   |
|   2   |  @NodeC   |
+-------+-----------+
   |         |         |
   |         |         +----------------------+
   |         +------------------+             |
   +-------------+              |             |
                 |              |             |
Doubly Linked List (order: Most Recently Used -> Least Recently Used)
                 V              V             V
       Head                                         Tail
        |                                            |
        V                                            V
      +--------+      +--------+      +--------+
NULL<-| prev   |----->| prev   |----->| prev   |
      | key: 2 |      | key: 7 |      | key: 5 |
      | val: C |      | val: B |      | val: A |
      | next   |<-----| next   |<-----| next   |----->NULL
      +--------+      +--------+      +--------+
       @NodeC          @NodeB          @NodeA
```

## Memory technique — remember this forever
1.  **The Story: The Hasty Librarian**
    A hash map is a librarian who knows the exact shelf for every book instantly.
    -   **Frequency Count**: The librarian keeps a tally on a sticky note on each book for how many times it's been checked out.
    -   **Two-Sum**: You ask for a book on "Rocketry" (`target`). They don't see it, but they remember seeing "Propulsion" (`nums[i]`). They instantly know to look for a book called "Guidance" (`target - nums[i]`) on their master list.
    -   **LRU Cache**: The librarian keeps the most recently used books on a special cart at the front desk (the Doubly-Linked List). When a book is requested, they grab it and place it at the very front of the cart. When the cart is full, they return the book at the very back to the main shelves. Their master list (the Hash Map) tells them exactly where on the cart each special book is, so they don't have to search the cart.

2.  **Facts to Overlearn:**
    -   Hash Map Operations: `insert`, `delete`, `lookup` are average-case $O(1)$ time.
    -   Two-Sum Logic: For each element `x`, check if `target - x` exists in the hash map.
    -   LRU Cache Structure: Hash Map (`key` -> `DoublyLinkedListNode`) + Doubly Linked List.

3.  **Spaced Repetition Schedule:**
    Review these concepts and re-implement one of the applications on these days: Day 1, Day 3, Day 7, Day 16, Day 35.

4.  **First Principles Pathway:**
    If you forget the fast Two-Sum algorithm, start with the obvious brute-force solution: two nested loops. Then ask yourself, "The inner loop is just a slow search. What is the fastest possible way to search for an element in a collection?" The answer is a hash map/set. This will lead you back to the $O(n)$ solution.

## Common mistakes
1.  **Forgetting to update LRU on `get`**: A common bug in LRU cache implementations is only updating the linked list on `put` operations. A `get` operation must also mark that item as most recently used, meaning it must be moved to the front of the list.
2.  **Using the same element twice in Two-Sum**: When implementing the one-pass Two-Sum, if you find `target - num` in the map, you must ensure its index is not your current index. The standard one-pass implementation avoids this naturally by only adding a number to the map *after* checking for its complement.
3.  **Choosing the wrong key or value**: In frequency counting, the key is the item and the value is its count. In Two-Sum, the key is the item and the value is its index. In LRU cache, the key in the map is the user's key, but the value is a *pointer/reference to the linked list node*, not the user's value itself. Storing the wrong thing breaks the algorithm.

## Self-check
Do not look up the answers. Derive them from the principles you've learned.
1.  Given an array of integers, return `true` if any value appears at least twice, and `false` otherwise. What is the time and space complexity of your solution?
2.  Design a "Logger" class that has a single method `shouldPrintMessage(timestamp, message)`. This method should return `true` if the `message` has not been seen in the last 10 seconds, and `false` otherwise.
3.  Given an array of strings, group the anagrams together. For example, `["eat", "tea", "tan", "ate", "nat", "bat"]` should return `[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]`. What characteristic of the anagrams can you use as a key in a hash map?