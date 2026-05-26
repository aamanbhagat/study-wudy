## 1. The one-sentence answer
**Python dict and set are dynamic hash tables that store keys via open addressing with a custom probe sequence and resize when load factor exceeds a fixed threshold.**

A hash table maps each key to an array slot by first computing an integer hash value, then reducing that value modulo the current table size. Collisions are inevitable, so Python does not chain; it probes forward from the initial slot using a deterministic sequence derived from the hash. When the fraction of occupied slots crosses 1/3 for inserts or 2/3 for deletes, the entire table is reallocated to the next power-of-two size and every key is rehashed.

The same machinery serves both dict (key-to-value) and set (key-only) because a set is simply a dict whose values are all None; the only difference is the C-level struct layout.

> [!NOTE]
> The single most important insight is that every dict or set operation ultimately reduces to one or two array accesses whose expected cost is O(1) only because the hash function distributes keys uniformly and the resize policy keeps the probe sequences short.

## 2. Why this matters — concrete and current
CPython’s own symbol tables, frame locals, and module namespaces are all dicts; every attribute lookup and every function call therefore depends on the hash-table implementation described here.

Pandas and NumPy use Python dicts to maintain column-name-to-block mappings; a single DataFrame with 10 000 columns performs millions of dict probes during construction and slicing, directly affecting query latency in production data pipelines at companies such as Two Sigma and Stripe.

Modern language servers (Pyright, Jedi) keep sets of reachable symbols; the O(1) membership test inside those sets makes real-time type-checking feasible on codebases with hundreds of thousands of identifiers.

In aerospace simulation frameworks such as NASA’s OpenMDAO, configuration objects are stored in dicts; the ability to insert or delete a variable without rescanning the entire table keeps the Newton solver’s Jacobian assembly inside real-time budgets on flight hardware.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Hash function        | Supplies the integer that selects the initial slot        |
| Array / contiguous memory | The underlying storage whose O(1) random access gives the performance guarantee |
| Load factor          | Determines when resizing must occur to keep probes short  |
| Amortized analysis   | Explains why occasional O(n) resizes still yield O(1) average cost |

## 4. Building the idea — from intuition to formalism

### Step 1 — Map the key to an integer
A deterministic function h turns any hashable object into a fixed-width integer.  
Example: h("cat") = 0x3a7f2b1c.  
Formally, h : K → ℤ where K is the set of hashable keys.  
> [!WARNING]
> If two distinct keys produce the same integer, the subsequent reduction step cannot separate them; the collision must be handled later.

### Step 2 — Reduce to a table index
The integer is taken modulo the current table capacity m (always a power of two).  
Example: 0x3a7f2b1c mod 8 = 4.  
$$i_0 = h(k) \bmod m.$$

### Step 3 — Resolve collisions by probing
If slot i₀ is occupied by a different key, compute the next index  
$$i_{j+1} = (i_j + 2j + 1) \bmod m$$  
until an empty or matching slot is found. This is Python’s triangular-number probe sequence.

### Step 4 — Store both key and hash
The table entry records the original hash value together with the key. On lookup the stored hash is compared first, avoiding expensive equality tests for most non-matches.

### Step 5 — Track occupancy with a bit mask
A parallel “used” bitmap distinguishes empty, dummy (deleted), and occupied states, allowing O(1) deletion without breaking probe chains.

### Step 6 — Resize when density grows
When the number of occupied entries exceeds m/3, allocate a new table of size 2m, re-insert every live key, and discard the old table. The same policy applies to sets.

### Step 7 — Guarantee expected O(1) cost
Under the assumption that h behaves randomly, the expected probe length remains bounded by a small constant when the load factor stays below 1/3; the geometric series of resize costs sums to O(1) per insertion.

## 5. Worked examples — every step shown

**Example 1 — Insert first key**  
*Given:* empty dict, capacity m = 8, key "a" with hash 0x11.  
*Find:* final table state after insertion.  
0x11 mod 8 = 1 → slot 1 empty → store ("a", 0x11).  
*Why:* direct hit, no probe needed.  
**Final table:** slot 1 holds ("a", 0x11).

**Example 2 — Collision on insert**  
*Given:* same table, key "b" hashes to 0x11 as well.  
*Find:* where "b" lands.  
i₀ = 1 occupied → i₁ = (1 + 1) mod 8 = 2 (empty) → store at 2.  
*Why:* first probe offset is 2·0 + 1 = 1.  
**Final table:** slot 2 holds ("b", 0x11).

**Example 3 — Lookup with early hash compare**  
*Given:* table above, look up "c" whose hash is 0x13.  
*Find:* number of comparisons performed.  
0x13 mod 8 = 5 (empty) → return not found after one slot inspection.  
*Why:* empty slot terminates search; stored hashes never compared.  
**Answer:** 1 comparison.

**Example 4 — Resize trigger**  
*Given:* table of size 8 containing 3 entries (load = 3/8 > 1/3).  
*Find:* new capacity after next insertion.  
Allocate size 16, rehash all three keys.  
*Why:* policy is strict m/3 threshold.  
**Answer:** new capacity = 16.

*Reflection:* The examples isolate the exact arithmetic of probing and resizing; the same arithmetic appears inside every real CPython dict operation.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using a mutable key         | dict requires the key’s hash to be stable   | Only insert objects implementing __hash__    |
| Assuming iteration order    | Resize permutes probe positions             | Never rely on insertion order before Python 3.7 |
| Hash-flood denial of service| Attacker supplies keys with colliding hashes| Use randomized hash seeds (default since 3.3) |
| Deleting during iteration   | Dummy entries alter probe chains            | Collect keys first, then delete              |
| Expecting O(1) worst case   | All keys collide on one probe sequence      | Accept expected-case analysis only           |
| Forgetting that set uses same table | Implementation is shared                    | Treat set and dict performance identically   |
| Storing objects with poor __hash__ | Built-in hash may be identity               | Override __hash__ consistently with __eq__   |

## 7. The textbook-precise statement
A Python dict (resp. set) is a hash table T of size m = 2^k together with an occupancy counter n. Insertion of key k proceeds by computing i ← h(k) mod m and following the probe sequence p(j) = (i + j(j+1)/2) mod m until an acceptable slot is found. The table is reallocated to size 2m whenever n > m/3. Look-up and deletion obey identical probe logic, terminating on an empty slot or a matching stored hash. Under the uniform hashing assumption the expected number of probes is O(1) for any sequence of operations whose load factor stays below 1/3. (Cormen et al., *Introduction to Algorithms*, 4e, Ch. 11; CPython source Objects/dictobject.c, version 3.12.)

## 8. Visual — diagram or schematic
```
Index   0      1      2      3      4      5      6      7
State  [empty] [keyA] [keyB] [empty] [empty] [empty] [empty] [empty]
Hash          0x11   0x11
Probe seq for keyC (hash 0x13 mod 8 = 5): 5 → 6 → 0 …
```
The diagram shows a table of size 8 after two insertions that collided at index 1; the probe sequence for a new key starting at 5 is written beneath.

## 9. The memory technique
1. **The hook** — Picture a dictionary whose pages are numbered by hash values; when two words want the same page you walk down a triangular staircase of offsets until you find an empty line.
2. **What to overlearn** — m is always a power of two; resize threshold is exactly m/3; stored entry contains both key and its hash.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the expected probe length from the geometric series ∑ (load)^j.

## 10. What this unlocks
Mastery of dict and set internals supplies the concrete model needed for every later hashing structure and for performance reasoning in any Python codebase.

- Open-addressing variants (linear probing, Robin Hood)
- Custom hash-table design in systems languages
- Analysis of hash-based caches and memoization tables
- Understanding of dictionary order preservation (Python 3.7+)
- Safe use of dicts as building blocks for LRU caches and counters

## 11. Self-check — five questions, no answers
1. Compute the first three probe indices for a key whose hash modulo 16 equals 9 inside a table of size 16.
2. A dict currently holds 5 entries in a table of size 16. After how many additional insertions will the next resize occur?
3. Why does storing the original hash inside each entry improve lookup speed even when equality is cheap?
4. Demonstrate with a concrete four-key example that deleting a key without leaving a dummy marker can break a subsequent lookup.
5. Under what precise load-factor condition does the expected probe length exceed 3?