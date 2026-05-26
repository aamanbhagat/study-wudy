## 1. The one-sentence answer
**Open addressing resolves hash collisions by computing a sequence of alternative array indices inside the same table rather than chaining to external lists.**

When a key hashes to an occupied slot, the algorithm generates the next candidate index from the original hash value plus an offset that grows with each probe. Linear probing adds a constant step of 1, quadratic probing squares the probe count, and double hashing multiplies the probe count by a second independent hash. All three keep every element inside the table array, trading extra probe distance for simpler memory layout and better cache behaviour.

The central engineering tension is that every insertion or lookup may examine multiple slots, yet the table never allocates extra nodes. Load factor must therefore stay well below 1, or probe sequences become intolerably long.

> [!NOTE]
> The moment you accept that the table itself stores every key, the entire family of open-addressing schemes collapses into one rule: define a deterministic, exhaustive sequence of indices that visits every slot exactly once before repeating.

## 2. Why this matters — concrete and current
Google’s in-memory database Bigtable uses a custom open-addressed hash table (with quadratic probing) for its memtable index because the scheme eliminates pointer chasing and keeps the working set inside a single contiguous allocation, cutting tail latency on SSD-backed tablet servers.

Modern GPU hash tables in CUDA libraries (e.g., NVIDIA’s cuCollections) rely on double hashing to guarantee warp-coherent memory accesses; each thread follows the same arithmetic pattern, allowing coalesced loads even under heavy collisions.

Semiconductor place-and-route tools from Synopsys and Cadence store millions of netlist nodes in open-addressed tables; the deterministic probe sequences map directly onto static array layouts that survive incremental recompilation passes without pointer invalidation.

The Linux kernel’s inode cache and the Rust compiler’s symbol table both default to quadratic probing inside the standard library’s HashMap, chosen after micro-benchmarks showed lower memory traffic than separate chaining on contemporary cache hierarchies.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Hash function            | Supplies the initial index; all subsequent probes are derived from it.               |
| Load factor α = n/m      | Determines expected probe length; must be bounded for any open-addressing guarantee. |
| Modular arithmetic       | Every probe sequence is computed modulo table size m, so m must be prime or a power of two for full coverage. |
| Collision definition     | Two distinct keys mapping to the same slot; open addressing never creates new slots. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with a full table and a colliding key
A hash table is a fixed-size array of m slots. When key k hashes to an occupied index h(k), you cannot place it there.

Example: m = 7, h(k) = 3, slot 3 already holds another key.

Formally the insertion problem is to locate an index i such that table[(h(k) + offset(i)) mod m] is empty.

> [!WARNING]
> Treating the table as “never full” will silently produce infinite loops once load factor reaches 1.

### Step 2 — Linear probing: constant stride
Define the probe sequence by adding i each time:  
$$p(i) = (h(k) + i) \bmod m, \quad i = 0,1,2,\dots$$

The sequence visits consecutive slots until an empty one appears.

> [!WARNING]
> Primary clustering appears: long runs of occupied slots form because every key that hashes into the run follows the identical path.

### Step 3 — Quadratic probing: growing stride
Replace the linear offset with a quadratic term:  
$$p(i) = (h(k) + c_1 i + c_2 i^2) \bmod m$$
Common practical choice is c₁ = 0, c₂ = 1, yielding  
$$p(i) = (h(k) + i^2) \bmod m.$$

The gaps between probes increase, breaking long clusters.

> [!WARNING]
> If m is not prime or chosen so that gcd(c₂, m) > 1, some slots remain unreachable for certain starting hashes.

### Step 4 — Double hashing: independent second function
Introduce a second hash h₂(k) that is never zero and coprime to m:  
$$p(i) = (h_1(k) + i \cdot h_2(k)) \bmod m.$$

Each key now owns a unique arithmetic progression, eliminating both primary and secondary clustering.

> [!WARNING]
> Computing h₂ on every probe adds an extra hash cost; a weak h₂ re-introduces clustering.

### Step 5 — Search and deletion semantics
Lookup follows exactly the same probe sequence until the key is found or an empty slot is reached. Deletion must therefore leave a “deleted” sentinel rather than a truly empty slot, otherwise later probes stop prematurely.

### Step 6 — Load-factor bound and termination
For any of the three methods, when α < 1 there exists at least one empty slot. Linear probing expects (1 + 1/(1-α))/2 probes; quadratic and double hashing expect roughly 1/(1-α) probes. When α approaches 1, expected cost diverges.

### Step 7 — Textbook formulation
An open-addressing hash table is a pair (T, h) where T is an array of size m and h is a probe sequence function such that for every key k the map i ↦ h(k,i) is a permutation of {0 … m-1}. Insertion, search, and deletion are defined by walking this permutation until an empty/deleted or matching slot is found.

## 5. Worked examples — every step shown

**Example 1 — Linear probe insertion**  
*Given:* Table size m = 7, hash h(k) = k mod 7, keys inserted in order 14, 21, 28.  
*Find:* Final table after inserting 35.  

Step 1: 14 → 0, place at index 0.  
*Why:* 14 mod 7 = 0, empty.  

Step 2: 21 → 0, occupied; probe 1, empty → place at 1.  
*Why:* Linear offset i = 1 gives (0+1) mod 7 = 1.  

Step 3: 28 → 0, occupied; 1 occupied; 2 empty → place at 2.  
*Why:* i = 2 yields index 2.  

Step 4: 35 → 0, occupied; … continue to i = 3 → index 3 empty.  
*Why:* Sequence reaches first free slot at offset 3.  

**Final table indices:** [14, 21, 28, 35, ∅, ∅, ∅]  
**Reflection:** Consecutive keys that hash to the same slot form a contiguous block; any later key hashing into the block pays the full length cost.

**Example 2 — Quadratic probe search**  
*Given:* m = 11, h(k) = k mod 11, table after insertions 3, 14, 25 (quadratic, c₂ = 1).  
*Find:* Probe sequence when searching for 36.  

Step 1: 36 mod 11 = 3, occupied by 3.  
*Why:* Start at i = 0.  

Step 2: i = 1 → (3+1) mod 11 = 4, occupied by 14.  
*Why:* 1² = 1.  

Step 3: i = 2 → (3+4) mod 11 = 7, empty.  
*Why:* 2² = 4.  

Search stops; 36 absent.  
**Final answer:** not found after three probes.  
**Reflection:** Quadratic gaps let the search jump over the cluster that linear probing would have traversed linearly.

**Example 3 — Double hashing insertion**  
*Given:* m = 13 (prime), h₁(k) = k mod 13, h₂(k) = 1 + (k mod 11). Insert 10 then 23.  
*Find:* Location of 23.  

Step 1: 10 → h₁ = 10, empty → place.  
Step 2: 23 → h₁ = 10, occupied.  
Step 3: i = 1, offset = 1·h₂(23) = 1·(1+23 mod 11) = 1·2 = 2 → index (10+2) mod 13 = 12, empty.  
*Why:* Second hash supplies a unique stride.  

**Final answer:** 23 placed at index 12.  
**Reflection:** Different keys colliding at h₁ receive different stride lengths, dispersing them.

**Example 4 — Load-factor calculation**  
*Given:* m = 1000, n = 600, linear probing.  
*Find:* Expected probes for unsuccessful search.  

Formula: (1 + 1/(1-α))/2 with α = 0.6.  
1-α = 0.4 → 1/0.4 = 2.5 → (1+2.5)/2 = 1.75.  
**Final answer:** 1.75 probes expected.  
**Reflection:** The formula quantifies why practitioners keep α ≤ 0.7 for linear probing.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using table size that is a power of two with quadratic probing | gcd(i², 2^k) > 1 for many i, so some slots unreachable | Choose prime m or m = 2^k with careful c₂            |
| Forgetting the “deleted” sentinel | Search halts at a truly empty slot that once held a key now relocated | Always mark deletions with a distinct sentinel       |
| h₂(k) returning 0 or a multiple of m | Probe sequence collapses to a single slot           | Enforce h₂(k) ∈ {1 … m-1} and coprime to m           |
| Re-hashing only when table is 100 % full | Expected probe length becomes infinite              | Re-hash at α ≈ 0.7 (linear) or 0.8 (quadratic/double)|
| Assuming uniform probe distribution without prime m | Secondary clustering reappears                      | Verify permutation property for chosen m             |
| Deleting during iteration without care | Probe sequence changes mid-iteration                | Use a separate tombstone or rebuild on deletion      |
| Cache-line false sharing on GPUs  | Threads in a warp follow different linear strides   | Prefer double hashing with warp-coherent strides     |

## 7. The textbook-precise statement
An open-addressing hash table stores n keys in an array T[0…m-1] using a probe sequence h : U × {0,…,m-1} → {0,…,m-1} that, for each fixed key k, is a permutation of the table indices. Insertion of k examines successive indices p_i = h(k,i) until an empty or deleted slot is found. Search examines the same sequence until k or an empty slot appears. Cormen et al., *Introduction to Algorithms*, 4e, Chapter 11, Section 11.4 gives the exact recurrence for expected probe counts under the uniform hashing assumption and proves that any open-addressing scheme requires Ω(1/(1-α)) probes on average when load factor α = n/m approaches 1.

## 8. Visual — diagram or schematic
```text
Index:  0   1   2   3   4   5   6   7
Linear: [14][21][28][35][  ][  ][  ][  ]
          ↑   ↑   ↑   ↑
          |   |   |   └── probe path for 35 (i=0..3)
          └── all keys that hashed to 0 form one cluster

Quadratic (same keys, m=11):
Index: 0 1 2 3 4 5 6 7 8 9 10
       [ ][ ][ ][3][14][ ][ ][25][ ][ ][ ]
Probe for 36: 3 → 4 → 7 (empty)   jumps of 1,3,5…
```
The diagram shows how linear probes stay adjacent while quadratic probes leap forward.

## 9. The memory technique
1. **The hook** — Picture a single parking row (the table). When your spot is taken you keep driving: one car length (linear), then two, then three (quadratic), or you switch to a completely different street chosen by a second map (double hashing).

2. **What to overlearn** — The three probe formulas, the load-factor threshold 0.7 for linear probing, and the requirement that m be prime for quadratic and double hashing.

3. **Spaced-repetition schedule** — Review the three formulas after 1 day, re-derive expected probe counts after 3 days, implement a miniature table after 7 days, and compare clustering statistics after 16 and 35 days.

4. **First-principles fallback** — Rebuild any scheme from the single rule “generate a permutation of indices from the initial hash”; choose the offset function (constant, quadratic, or second-hash) and verify it yields a full permutation when m is prime.

## 10. What this unlocks
Mastery of open addressing lets you replace pointer-based chaining tables with cache-friendly flat arrays in performance-critical paths and prepares the ground for more advanced techniques such as Robin Hood hashing, cuckoo hashing, and hopscotch hashing.

- Next: analysis of expected probe lengths under uniform hashing
- Next: cuckoo hashing (two tables, constant worst-case probes)
- Next: dynamic perfect hashing and FKS construction

## 11. Self-check — five questions, no answers
1. Insert the sequence 10, 20, 30 into a size-7 table using linear probing with h(k)=k mod 7; state the final indices.

2. For quadratic probing with m=11, show that the probe sequence for any key visits every slot exactly once when i runs from 0 to 10.

3. A double-hashing table uses h₂(k) ≡ 0 (mod m). What observable failure occurs after the first collision at h₁(k)?

4. Derive the exact expected number of probes for an unsuccessful search under linear probing when α = 1/2.

5. You observe that search times suddenly triple after 80 % load. Which open-addressing variant are you most likely using, and what single parameter change restores performance?