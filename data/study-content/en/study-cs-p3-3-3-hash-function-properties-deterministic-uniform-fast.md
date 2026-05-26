## 1. The one-sentence answer
**A hash function maps keys from an arbitrary domain to fixed-size integers such that the mapping is deterministic, distributes outputs uniformly across the target range, and executes in constant time.**

These three properties together turn an unpredictable collection of keys into reliable array indices. Determinism guarantees that any given key always produces the identical index, so retrieval never fails because of inconsistent results. Uniformity prevents clusters that would collapse average-case performance to linear time. Speed ensures the mapping itself never becomes the bottleneck inside a data structure that must answer millions of operations per second.

The three requirements are not independent. A function that is perfectly uniform but takes linear time in the key length is useless inside a hash table; a function that is both fast and deterministic but produces only two possible outputs will cause catastrophic collisions. The engineering task is therefore to satisfy all three simultaneously.

> [!NOTE]
> The single most important realization is that uniformity is statistical, not cryptographic: the function need not be unpredictable to an adversary; it must only spread ordinary, non-adversarial key distributions evenly.

## 2. Why this matters — concrete and current
In the Linux kernel’s `ext4` filesystem, directory entries are indexed by a deterministic, uniform hash (currently `dx_hashed`) so that lookups of file names remain O(1) even when a directory contains millions of entries; the same hash also guarantees that a given file name always yields the same bucket across reboots.

Google’s Bigtable and its successor Spanner rely on fast uniform hashes (CityHash and FarmHash) to map row keys to tablet servers; non-uniformity would create hot spots that overload individual machines and destroy tail latency for user queries.

Modern CPU caches and the branch-predictor structures inside Intel and AMD processors use deterministic, uniform hash functions to map memory addresses to cache sets; any deviation from uniformity produces measurable increases in cache-miss rates on SPEC CPU benchmarks.

In the Rust compiler’s incremental compilation system, the incremental query system hashes source-file contents with a fast uniform function (FxHash) so that unchanged modules can be recognized in constant time; the determinism guarantees that a clean build and an incremental rebuild produce identical artifacts.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Array indexing           | The hash value is used directly as an offset into an array or bucket list. |
| Modulo arithmetic        | The final reduction of a large hash value into a table of size m is performed with modulo m. |
| Average-case analysis    | Uniformity is defined with respect to the expected distribution of keys, not worst-case inputs. |
| O(1) time complexity     | “Fast” must be expressed as constant time independent of key length for the data structure to remain efficient. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Same input, same output
A hash function must return identical results for identical inputs on every invocation and on every machine.  
Example: the string “cat” must always produce the integer 42 837 912 no matter how many times the program runs.  
Formally,  
$$h(x) = h(y) \quad \text{whenever } x = y.$$  
> [!WARNING]  
> If the function secretly incorporates a random seed that changes between runs, two processes will compute different indices for the same key and the hash table will silently lose data.

### Step 2 — Outputs spread evenly
For any fixed table size m, the images h(k) for typical keys k should be roughly equidistant modulo m.  
Example: inserting the keys 1 through 1000 into a table of size 16 should place approximately 62–63 keys in each slot.  
Formally, when keys are drawn from a distribution D,  
$$\Pr_{k\sim D}[h(k)\equiv i\pmod{m}] \approx \frac1m \quad \text{for all } i.$$  
> [!WARNING]  
> Treating uniformity as a per-key guarantee instead of a distributional one leads to the false belief that any injective function is acceptable.

### Step 3 — Constant-time evaluation
The number of machine instructions required to compute h(k) must be bounded by a constant that does not grow with |k|.  
Example: a 64-bit integer key is processed with a handful of multiplications and shifts; a string key is processed with a fixed number of unrolled 8-byte loads.  
Formally, there exists a constant c such that  
$$T(h(k)) \le c \quad \text{for all admissible } k.$$  
> [!WARNING]  
> Using an unbounded loop over the key bytes (for example, a naïve checksum) makes the hash-table operation O(n) in the key length, destroying the entire performance argument.

### Step 4 — Composition with table size
The final index is obtained by reducing the raw hash value modulo the current table size.  
Example: raw hash 0x7f3a2b1c modulo 1024 yields 0x2b1c.  
Formally, the index is  
$$i = h(k) \bmod m.$$  
> [!WARNING]  
> Using the low-order bits of a poor hash without mixing can preserve patterns in the input, violating uniformity after the modulo.

### Step 5 — The three properties together
A function satisfying determinism, uniformity under the expected key distribution, and constant-time evaluation is called a *hash function suitable for hash tables*. This is the textbook definition used by standard library implementations.

## 5. Worked examples — every step shown

**Example 1 — Trivial deterministic check**  
*Given:* h(x) = x mod 2^32 on 32-bit integers.  
*Find:* h(42) on two separate runs.  
Compute 42 mod 2^32 = 42.  
*Why* the same value appears on both runs: the expression contains no external state.  
**42**  
*Reflection:* Determinism is trivial here because the operation is purely arithmetic.

**Example 2 — Uniformity test on small table**  
*Given:* keys {0,1,2,3}, m = 2, h(k) = k.  
*Find:* bucket sizes.  
0 mod 2 → 0, 1 mod 2 → 1, 2 mod 2 → 0, 3 mod 2 → 1.  
Bucket 0 receives two keys, bucket 1 receives two keys.  
*Why* the counts are equal: the chosen function already distributes consecutive integers evenly.  
**Two keys per bucket**  
*Reflection:* The example is too regular; real uniformity appears only statistically.

**Example 3 — Speed measurement**  
*Given:* 64-bit keys, hardware multiplier latency 3 cycles.  
*Find:* upper bound on T(h).  
A single 64-bit multiply followed by a shift is three cycles; the bound c = 5 is therefore safe.  
*Why* the bound holds: no data-dependent loops exist.  
**T(h) ≤ 5 cycles**  
*Reflection:* The constant is architecture-specific but remains independent of key set size.

**Example 4 — Full hash-table insertion**  
*Given:* empty table of size 8, h(k) = (k · 2654435761) mod 2^32, keys 10 and 18.  
*Find:* final indices.  
10 · 2654435761 = 26544357610 → low 32 bits 0x9e3779b2 → 0x9e3779b2 mod 8 = 2.  
18 · 2654435761 = 47779843698 → low 32 bits 0x6e3779b2 → 0x6e3779b2 mod 8 = 2.  
*Why* both land at index 2: the multiplier mixes bits yet the final reduction can still collide.  
**Indices 2 and 2**  
*Reflection:* Uniformity reduces expected collisions; it never eliminates them.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using pointer addresses as hashes | Addresses are deterministic but not uniform across runs or machines | Always hash the pointed-to data, not the pointer value |
| Relying on cryptographic hashes   | They are uniform but far slower than O(1) table operations | Choose non-crypto hashes (FxHash, CityHash) for tables |
| Forgetting to mix after modulo    | Low bits of many integer hashes are biased  | Apply a final mixing step before reduction           |
| Assuming injectivity              | No fixed-size hash can be injective for arbitrary keys | Accept collisions and handle them with chaining or open addressing |
| Measuring speed on tiny keys only | Constant factors hidden on short inputs appear on long strings | Benchmark with worst-case key lengths                |
| Ignoring table-size growth        | Uniformity at size 2^10 may degrade at size 2^20 if the hash has hidden periods | Re-hash with a different multiplier or use dynamic hashing |
| Storing the hash value across runs| A deterministic function can still change when the implementation is updated | Never persist raw hash values; persist keys instead  |

## 7. The textbook-precise statement
A function h : U → {0,…,2^w−1} is a hash function for hash tables if it satisfies:  
1. Determinism: ∀x∈U, h(x) is identical on every evaluation.  
2. Uniformity: for keys drawn from any realistic distribution D, the values h(k) mod m are statistically close to uniform on {0,…,m−1}.  
3. Speed: there exists a constant c independent of |k| such that evaluation costs at most c word operations.  

Cormen et al., *Introduction to Algorithms*, 4e, Chapter 11, Section 11.2.

## 8. Visual — diagram or schematic
```text
Key space U (arbitrary size)
          │
          ▼
   ┌──────────────┐
   │   h (mixer)  │  ← deterministic, O(1)
   └──────┬───────┘
          │  w-bit integer
          ▼
   i = value mod m
          │
          ▼
   Bucket array [0 … m-1]
```
Each arrow labelled with the property it enforces: determinism on the first, uniformity on the modulo step, constant time on the mixer box.

## 9. The memory technique
**The hook** — Picture three identical robots stamping the same number on every copy of a book (deterministic), the numbers landing evenly on a dartboard (uniform), and the robots working at the speed of light (fast).  
**What to overlearn** — The three-word checklist “deterministic, uniform, fast” and the reduction i = h(k) mod m.  
**Spaced-repetition schedule** — Review the three properties at 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — Re-derive from the requirement that array access must be O(1): the only way to obtain an index instantly is a fixed-cost arithmetic expression that never varies for the same key and spreads values evenly.

## 10. What this unlocks
Mastery of these three properties lets you reason correctly about the performance of every subsequent hashing structure.  
- Collision-resolution techniques (chaining, open addressing)  
- Dynamic resizing and rehashing  
- Universal hashing families  
- Bloom filters and other approximate-membership structures  
- Consistent hashing used in distributed caches  

## 11. Self-check — five questions, no answers
1. A hash function returns different values for the same key on two consecutive program runs. Which property is violated and what concrete failure occurs inside a hash table?  
2. You are given a deterministic function that always returns 0. Is it fast? Is it uniform? What happens to lookup cost when the table contains 10 000 elements?  
3. Why does uniformity need to be defined only with respect to an expected key distribution rather than every conceivable set of keys?  
4. Suppose table size m is a power of two and the hash function simply returns the low-order bits of the key. Construct a small set of keys that produces a grossly non-uniform distribution.  
5. A language runtime changes its default hash seed on every program start for security reasons. Explain why this design choice is incompatible with the requirements of an ordinary hash table.