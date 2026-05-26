## 1. The one-sentence answer
**Open addressing** stores every key inside the hash table itself and resolves collisions by systematically probing other slots according to a deterministic sequence.

Linear probing, quadratic probing, and double hashing are three concrete ways to generate that probe sequence. The first method steps forward by a fixed stride, the second uses a quadratic offset to reduce clustering, and the third derives the stride from a second hash function so that different keys follow different paths. Because the table never allocates extra nodes, cache locality stays high, but every insertion or search must be prepared to walk through a sequence of occupied cells until either the target key or an empty slot appears.

> [!NOTE]
> The single most important insight is that the probe sequence for any key must be a permutation of the table indices; otherwise some slots become unreachable and the load factor cannot safely exceed a small constant.

## 2. Why this matters — concrete and current
In the Linux kernel’s `ext4` directory cache and the `bpf` map implementation, open addressing with quadratic probing keeps millions of dentry and map entries inside a single contiguous array, eliminating pointer-chasing overhead on the hot path of file-system and eBPF lookups.

Google’s `flat_hash_map` (Abseil) and Meta’s `F14` both rely on open addressing with double hashing; the resulting 30–40 % memory reduction directly lowers DRAM cost for their in-memory advertisement and social-graph services that hold tens of billions of entries.

Modern GPU hash tables used by NVIDIA’s cuDF and RAPIDS libraries adopt linear probing because coalesced memory accesses reward the predictable stride pattern; the same tables accelerate join operations inside trillion-row analytical queries.

The `java.util.concurrent.ConcurrentHashMap` fallback path (when tree bins are disabled) and the .NET `Dictionary<TKey,TValue>` both fall back to open addressing variants, proving that even production runtimes still choose the technique when allocation latency must be bounded.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Simple uniform hashing   | Guarantees that the initial hash value `h'(k)` is already uniformly distributed.     |
| Load factor `α = n/m`    | Determines expected probe length; all three methods degrade sharply once `α > 0.7`.  |
| Modular arithmetic       | Every probe formula ends with `% m`; you must understand wrap-around behaviour.      |
| Collision definition     | You must already know that two keys colliding means `h'(k1) ≡ h'(k2) (mod m)`.       |

If any row is unfamiliar, pause and master that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — The empty slot guarantee
A hash table of size `m` using open addressing must treat every insertion as a search for the first empty slot along a key-specific probe sequence. The sequence must eventually visit every index; otherwise some keys could never be inserted.

Example: table size 5, key `k` whose first hash is 2. Linear probing visits 2, 3, 4, 0, 1 before repeating.

Formally, the probe sequence is the ordered list  
$$p(k,0),\ p(k,1),\ \dots,\ p(k,m-1)$$  
where each `p(k,i)` is distinct modulo `m`.

> [!WARNING]
> If the sequence repeats before visiting all slots, the table can report “full” while empty cells still exist.

### Step 2 — Linear probing recurrence
Linear probing defines the next probe by adding a constant stride (usually 1) after the initial hash:  
$$h(k,i)=(h'(k)+i)\bmod m.$$  
The arithmetic progression produces primary clustering: long runs of occupied slots form behind any collision.

### Step 3 — Quadratic probing recurrence
Quadratic probing replaces the linear stride with a quadratic polynomial:  
$$h(k,i)=(h'(k)+c_1i+c_2i^2)\bmod m.$$  
Typical constants are `c1=1`, `c2=1` or `c1=0`, `c2=1`. The quadratic term breaks long clusters but requires `m` to be a prime of the form `4k+3` for full coverage.

### Step 4 — Double hashing recurrence
Double hashing uses two independent hash functions:  
$$h(k,i)=(h_1(k)+i\cdot h_2(k))\bmod m.$$  
Because the stride `h2(k)` differs for different keys, secondary clustering disappears and expected probe length approaches the theoretical lower bound.

### Step 5 — Search and deletion invariants
Search stops at the first empty slot or when the key is found. Deletion therefore cannot simply mark a cell empty; a dedicated “deleted” sentinel must be used so that probe sequences that legitimately continue past that cell are not truncated.

## 5. Worked examples — har step show karo

**Example 1 — Linear probing insertion**  
*Given:* Table size `m=7`, hash `h'(k)=k mod 7`, keys 10, 17, 24 in that order.  
*Find:* Final table layout.  

Step 1: 10 → slot 3 (empty) → place at 3.  
Step 2: 17 → slot 3 (occupied) → probe 4 (empty) → place at 4.  
Step 3: 24 → slot 3 (occupied) → 4 (occupied) → 5 (empty) → place at 5.  

**Final table:** `[_,_,_,10,17,24,_,]`

*Reflection:* The three keys formed a contiguous cluster; any later key hashing to 3 will pay three comparisons.

**Example 2 — Quadratic probing search**  
*Given:* Same table after Example 1, now search for 31 (`31 mod 7 = 3`).  
*Find:* Number of probes.  

Probe 0: index 3 → 10 ≠ 31  
Probe 1: index `(3+1+1) mod 7 = 5` → 24 ≠ 31  
Probe 2: index `(3+2+4) mod 7 = 2` → empty → stop, not found.  

*Reflection:* Quadratic probing already left an earlier empty slot, shortening the unsuccessful search.

**Example 3 — Double hashing insertion**  
*Given:* `m=7`, `h1(k)=k mod 7`, `h2(k)=1+(k mod 5)`. Insert 10, 17, 24.  
*Find:* Final layout.  

10: `h1=3`, `h2=1` → probe 3.  
17: `h1=3`, `h2=2` → probe 3, then `(3+2) mod 7=5`.  
24: `h1=3`, `h2=4` → probe 3, 5, then `(3+8) mod 7=4`.  

**Final table:** `[_,_,_,10,24,17,_,]`

*Reflection:* Different strides prevented the cluster seen in linear probing.

**Example 4 — Load-factor effect**  
*Given:* Linear probing, `α=0.8`, `m=10^6`.  
*Find:* Expected probes for unsuccessful search.  

Formula:  
$$\frac12\left(1+\frac1{(1-α)^2}\right)=\frac12\left(1+\frac1{0.2^2}\right)=13.$$  

*Reflection:* At 80 % load a single lookup already costs 13 comparisons; most production tables therefore resize at `α≈0.7`.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using “empty” for deletion        | Probe sequence must continue past the deleted cell  | Always introduce a third sentinel value “deleted”    |
| Choosing `m` that is a power of 2 | Low bits of hash dominate; quadratic fails to cover | Force `m` prime, preferably `4k+3` for quadratic     |
| Forgetting `h2(k)` must be coprime with `m` | Double hashing may cycle early                 | Pick `h2(k)` returning values in `{1…m-1}` and test gcd |
| Ignoring clustering cost          | Linear probing looks O(1) on paper but degrades fast| Monitor average probe length at runtime              |
| Re-hashing with same seed         | All keys keep identical probe sequences             | Re-hash with fresh salt or switch to double hashing  |
| Assuming `α<1` guarantees success | If sequence is not a full permutation, some slots unreachable | Verify permutation property for the chosen probe     |
| Not resizing early enough         | Load factor creeps past 0.7 unnoticed               | Resize at `α=0.6` or when average probe > 3          |

## 7. The textbook-precise statement
Cormen et al., *Introduction to Algorithms*, 4e, §11.4 states:

Let `T[0…m−1]` be an array of slots. A hash function with open addressing is a family  
$$h:\ U\times\{0,1,\dots,m−1\}\to\{0,1,\dots,m−1\}$$  
such that for every key `k` the sequence  
$$h(k,0),\ h(k,1),\ \dots,\ h(k,m−1)$$  
is a permutation of `{0,1,…,m−1}`. Insertion places `k` in the first slot that is either empty or deleted; search follows the same sequence until `k` is found or an empty slot is reached.

## 8. Visual — diagram or schematic
```
Index:  0   1   2   3   4   5   6
Linear: [ ] [ ] [ ] [10][17][24][ ]
Probe→        ↑   ↑   ↑
          (start) 1st 2nd 3rd probe for key 31
```
The arrow shows how linear probing walks contiguously; quadratic would jump 1, then 4, then 9 … slots away.

## 9. The memory technique

**The hook**  
Picture a single corridor of lockers; linear probing is “keep walking one locker at a time”, quadratic is “take one step, then four, then nine”, double hashing is “each person has their own step length written on their shoe”.

**What to overlearn**  
1. Linear: `(h + i) mod m`  
2. Quadratic: `(h + i + i²) mod m` (m prime 4k+3)  
3. Double: `(h1 + i·h2) mod m`

**Spaced-repetition schedule**  
Review the three formulas at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
If the formula is forgotten, start from the definition: the probe sequence must be a permutation; write the simplest arithmetic progression, then quadratic, then stride-from-second-hash that each produce a permutation.

## 10. What this unlocks
Mastery of open addressing lets you implement cache-friendly hash tables and immediately understand why Robin Hood, Hopscotch, and Cuckoo hashing were invented as improvements.

- Next topics: Robin Hood probing, Cuckoo hashing, Bloom filters that also rely on multiple hash functions.
- Practical payoff: writing a custom `unordered_map` replacement that beats `std::unordered_map` on both memory and speed.

## 11. Self-check — five questions, no answers
1. Insert keys 5, 12, 19 into a size-7 table using linear probing with stride 1; draw the final array.  
2. For the same keys and table, switch to quadratic probing (`c1=1,c2=1`); how many probes does the search for 26 require?  
3. Why does double hashing with `h2(k)=0` break correctness?  
4. A table using linear probing reports “full” at 60 % occupancy; which invariant is probably violated?  
5. Derive the expected number of probes for unsuccessful search under linear probing when load factor `α` approaches 1.