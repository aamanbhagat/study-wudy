## What it is
In open addressing, a "tombstone" (or "sentinel") is a special marker placed in a hash table slot from which an element has been deleted. This marker distinguishes the slot from one that has always been empty. It signals to the search algorithm that this slot was once occupied, so it must continue probing to find other elements in the same collision chain.

## Why it matters
Correctly handling deletions is critical for any dynamic database, cache, or symbol table. In aerospace applications, mission-critical systems like flight control or telemetry data processors use hash tables for rapid lookups; a corrupted table due to improper deletion could lead to catastrophic failure. In large-scale physics simulations, managing particle or state data in hash tables requires efficient insertion and deletion, and tombstones are the standard mechanism to ensure correctness without costly rehashing on every removal.

## When to study it
Before tackling this, you must have a solid grasp of the following:
1.  **Core Hashing Concepts:** Keys, hash functions, and the idea of a hash collision.
2.  **Open Addressing:** Specifically, how insertion and search work for linear probing, quadratic probing, or double hashing. You must understand what a "probe sequence" is and why it must be followed consistently.

If you cannot explain why a search in a simple linear probing scheme stops upon hitting an empty slot, review that material first.

## How to study it (step by step)
1.  **Re-derive the problem:** Take a hash table of size $N=10$ and a hash function $h(k) = k \pmod{10}$. Use linear probing. Insert keys 5, 15, 25. Draw the table.
2.  **Simulate the failure:** Now, "delete" key 15 by simply marking its slot as `EMPTY`. Attempt to search for key 25. Trace the probe sequence for 25, starting at index 5. Observe that the search incorrectly terminates at the now-empty index 6 and fails to find 25.
3.  **Invent the solution:** Realize the search needs to distinguish between "never used" and "used to be occupied". Propose a third state for each slot: `OCCUPIED`, `EMPTY`, and `DELETED` (the tombstone).
4.  **Modify the algorithms:** Write down the new rules for search and insertion in pseudocode.
    *   **Search(key):** Probe along the sequence. If you find the key, return success. If you hit an `EMPTY` slot, the key is not present; return failure. If you hit a `DELETED` slot, continue probing.
    *   **Insert(key):** Probe along the sequence. If you find an `EMPTY` or `DELETED` slot, insert the new key there. It is often optimal to use the first `DELETED` slot you find.
5.  **Re-run the simulation:** Repeat steps 1 and 2, but this time when you delete 15, mark its slot with a `DELETED` tombstone. Now, search for 25 again. Trace the probe sequence and verify that it correctly skips over the tombstone at index 6 and finds 25 at index 7.
6.  **Analyze the trade-off:** What happens if you perform many deletions? The table fills with tombstones. How does this affect the average search time? Conclude that search time now depends not just on the number of elements, but on the length of probe sequences cluttered with tombstones. This motivates the need for periodic rehashing.

## Key ideas, with intuition
1.  **The Broken Chain:** In open addressing, colliding elements form an implicit linked list or "probe chain". Deleting an element by marking its slot `EMPTY` is like removing a link from a physical chain. Anything after that link becomes unreachable.
    $$
    \text{Initial Chain: } \text{Index } i \rightarrow \text{Index } j \rightarrow \text{Index } k
    $$
    If we naively empty slot $j$, the chain is broken:
    $$
    \text{Broken Chain: } \text{Index } i \rightarrow \underbrace{\text{EMPTY}}_{\text{Search for k stops here}} \quad (\text{unreachable}) \rightarrow \text{Index } k
    $$

2.  **Tombstones Preserve the Chain:** A tombstone acts as a special, "transparent" link in the chain. It tells the search algorithm, "This link is gone, but the chain continues. Keep going."
    $$
    \text{Preserved Chain: } \text{Index } i \rightarrow \underbrace{\text{DELETED}}_{\text{Search for k continues}} \rightarrow \text{Index } k
    $$

3.  **Three States, Two Meanings:** A slot now has three possible states: `EMPTY`, `OCCUPIED`, `DELETED`. The tombstone (`DELETED`) has a dual meaning depending on the operation:
    *   For a **Search**, it means: "Keep probing."
    *   For an **Insert**, it means: "This spot is available." This is an optimization, as re-using a tombstone slot is cheaper than probing past it to find a truly `EMPTY` slot.

## Worked example
Let's use a hash table of size $N=7$ with hash function $h(k) = k \pmod 7$ and linear probing, where the $i$-th probe is at index $(h(k) + i) \pmod 7$.

**State 1: Initial Insertions**
1.  `insert(15)`: $h(15) = 15 \pmod 7 = 1$. Slot 1 is empty. Table: `[ , 15, , , , , ]`
2.  `insert(22)`: $h(22) = 22 \pmod 7 = 1$. Slot 1 is occupied. Probe to slot 2. Table: `[ , 15, 22, , , , ]`
3.  `insert(8)`: $h(8) = 8 \pmod 7 = 1$. Slot 1 is occupied. Probe to slot 2, occupied. Probe to slot 3. Table: `[ , 15, 22, 8, , , ]`

**State 2: Deletion**
Now, we execute `delete(22)`. We find 22 at index 2 (after one probe) and replace it with a tombstone, which we'll denote as `[D]`.
*   Table state: `[ , 15, [D], 8, , , ]`

**State 3: Search**
Let's `search(8)`.
1.  Calculate initial hash: $h(8) = 8 \pmod 7 = 1$.
2.  Probe 0: Check index 1. It contains 15, which is not 8. Continue.
3.  Probe 1: Check index $(1+1) \pmod 7 = 2$. It contains `[D]`. **This is the key step.** The tombstone tells us the chain continues. We do not stop.
4.  Probe 2: Check index $(1+2) \pmod 7 = 3$. It contains 8. Success! Element found.

**Reflection:** If we had marked slot 2 as `EMPTY` instead of `[D]`, the search for 8 would have stopped at index 2 and incorrectly reported that 8 was not in the table. The tombstone preserved the integrity of the probe chain `15 -> 22 -> 8`.

## Diagrams
Here is the state of the hash table from the worked example. `[D]` denotes a tombstone.

**Before Deletion:**
A search for `8` starts at index 1, probes past `15` at index 1, past `22` at index 2, and finds `8` at index 3.

```text
Index:   0    1    2    3    4    5    6
       +----+----+----+----+----+----+----+
Value: |    | 15 | 22 |  8 |    |    |    |
       +----+----+----+----+----+----+----+
             ^----|----|
             |         |
      h(8)=1 |  Probe 1|
             |         |
             +---------+-----> Probe 2
```

**After Deleting `22`:**
A search for `8` starts at index 1, probes past `15` at index 1, sees the tombstone `[D]` at index 2 and *continues*, finding `8` at index 3.

```text
Index:   0    1    2    3    4    5    6
       +----+----+----+----+----+----+----+
Value: |    | 15 | [D]|  8 |    |    |    |
       +----+----+----+----+----+----+----+
             ^----|----|
             |         |
      h(8)=1 |  Probe 1| (Continues past [D])
             |         |
             +---------+-----> Probe 2
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a detective following a trail of clues (the probe sequence). A tombstone is like a note at a suspect's old apartment that says, "He moved, but I know he's still in the city. Keep looking." An empty lot (`EMPTY`) is a dead end—the trail has gone cold. The detective gives up. The tombstone keeps the investigation alive.

2.  **Must-learn facts:**
    *   **Search:** Stops on `EMPTY`. Continues on `DELETED`.
    *   **Insert:** Can place a new element in the first `EMPTY` OR `DELETED` slot found.
    *   **Delete:** Replace the element's slot with the `DELETED` marker.

3.  **Spaced-repetition schedule:** Review this concept and re-derive the search/insert logic at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First principles pathway:** If you forget the rules, you can always re-derive them from the "Broken Chain" problem.
    *   Draw a small hash table.
    *   Insert three elements that collide and form a chain (A, B, C).
    *   Delete the middle element (B) by making its slot `EMPTY`.
    *   Try to find the last element (C). You will fail.
    *   This failure *proves* that `EMPTY` is the wrong state. You need a new state that means "deleted, but keep searching". That state is the tombstone.

## Common mistakes
1.  **Stopping a search at a tombstone.** This is the most common error and defeats the entire purpose of the tombstone. A search *only* terminates a failure path when it hits a truly `EMPTY` slot.
2.  **Not using tombstone slots for new insertions.** An insertion can and should use the first available slot, whether it's `DELETED` or `EMPTY`. Forgetting this makes insertions less efficient as they probe further than necessary.
3.  **Ignoring the performance cost.** Tombstones solve the correctness problem but create a performance problem. A table can be nearly full of tombstones and have only a few actual elements, making searches very slow. The load factor calculation must be adjusted, and rehashing (rebuilding the table with only the live elements) becomes necessary to clean out the tombstones.

## Self-check
1.  Write the pseudocode for the `Search` function in a hash table using quadratic probing and tombstone markers. Clearly state the condition for continuing the probe and the two conditions for terminating the probe (success and failure).
2.  Consider a hash table of size $N=11$ with $h(k) = k \pmod{11}$ and linear probing. Show the state of the table after the following sequence of operations: `insert(22)`, `insert(44)`, `insert(3)`, `insert(14)`, `delete(44)`, `insert(55)`.
3.  Explain the impact of a high concentration of tombstones on the worst-case and average-case performance of `Search` and `Insert`. How would you modify the definition of the load factor $\alpha$ to account for tombstones when deciding whether to rehash the table?