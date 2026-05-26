## 1. The one-sentence answer
**Write policies are the rules a cache uses to propagate store operations to lower levels of the memory hierarchy and to decide whether a missed block is fetched on a write.**

A cache must keep its contents coherent with main memory after every store. The two orthogonal decisions are when to update memory and whether to bring the target block into the cache on a miss. Write-through sends every store immediately to memory; write-back defers the update until the dirty block is evicted. Independently, write-allocate fetches the block on a write miss so the store can occur inside the cache; no-write-allocate bypasses the cache and writes directly to memory.

These choices trade bandwidth, latency, and hardware complexity. Write-through simplifies coherence but consumes memory bandwidth on every store. Write-back reduces traffic yet requires dirty bits and careful eviction logic. Write-allocate improves locality for subsequent reads; no-write-allocate avoids polluting the cache with blocks that are written only once.

> [!NOTE]
> The performance gap between cache and DRAM is now three orders of magnitude; therefore the policy that minimizes unnecessary memory traffic (write-back + write-allocate) dominates modern processors, yet simpler policies remain essential when coherence traffic or real-time predictability is paramount.

## 2. Why this matters — concrete and current
Intel’s Sunny Cove and later cores use write-back caches with write-allocate on L1 and L2; the resulting reduction in DRAM writes directly improves battery life in laptops and lowers power density in data-center racks. ARM’s AMBA CHI protocol and its cache-coherent interconnects assume write-back semantics; any implementation that silently chose write-through would violate the coherence ordering rules and break multi-socket servers from Ampere and AWS Graviton. NVIDIA’s Hopper GPUs employ write-through L1 caches for global memory stores precisely so that warp-level atomics remain visible without extra cache-flush instructions. Database engines such as RocksDB configure the page cache of the OS with write-back but force write-through on the WAL file descriptor; a misconfiguration here has caused data loss in production at Facebook and Cloudflare. Finally, real-time avionics processors certified under DO-178C often select write-through plus no-write-allocate so that worst-case execution time analysis does not have to account for dirty-eviction stalls.

## 3. Mental prerequisites
| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Direct-mapped or set-associative cache organization | Determines which block is evicted and therefore when a write-back occurs |
| Valid and dirty bits per cache line | Track whether a line must be written back and whether it is present |
| Memory-hierarchy latency and bandwidth numbers | Quantify the cost of each extra DRAM transaction created by a policy choice |

## 4. Building the idea — from intuition to formalism

### Step 1 — Stores must eventually reach memory
A store updates only the fastest copy of the data. If that copy disappears (power loss, context switch, DMA), the update is lost unless it has been propagated downward.  
Concrete example: a processor writes 0x42 to address 0x1000 while the block resides only in L1. On sudden reset the DRAM still holds the old value.  
Formally, let \(M\) be main memory and \(C\) the cache; after a store the system must eventually satisfy \(M[A] = C[A]\) for every address \(A\) that was written.  
> [!WARNING]  
> Treating the cache as “just faster memory” without an explicit propagation rule produces silent data loss on eviction or power failure.

### Step 2 — Write-through versus write-back timing
Write-through issues a memory store on every cache store; write-back records the store locally and issues the memory store only on eviction of a dirty line.  
Example: four consecutive stores to the same word generate four DRAM writes under write-through but only one under write-back.  
Let \(W\) be the set of dirty addresses. Write-back maintains \(W\) and writes \(\bigcup_{a\in W} M[a]\) exactly once per eviction.  
> [!WARNING]  
> Forgetting to set the dirty bit on a write-back cache produces a lost update when the line is silently evicted.

### Step 3 — Write-allocate versus no-write-allocate on a miss
On a write miss the block may be fetched first (write-allocate) or the store may bypass the cache (no-write-allocate).  
Example: a write to an address whose block is absent under write-allocate loads the entire 64-byte line, overwrites one word, and marks the line dirty; under no-write-allocate only the single word travels to DRAM.  
Formally, write-allocate adds the transition \(C \leftarrow C \cup B\) where \(B\) is the block containing the store address before performing the store.  
> [!WARNING]  
> Using write-allocate for streaming stores that are never read again wastes cache capacity and generates unnecessary read-for-ownership traffic.

### Step 4 — Policy combinations and their invariants
The four common pairings are write-through/no-write-allocate, write-through/write-allocate, write-back/write-allocate, and (rarely) write-back/no-write-allocate. Each pairing preserves a different invariant about the relationship between \(C\) and \(M\).  
Write-back/write-allocate is the only pairing that both defers writes and exploits temporal locality; all modern general-purpose CPUs therefore adopt it for on-chip caches.

### Step 5 — Textbook statement
A cache write policy is a pair \((P_t, P_a)\) where \(P_t \in \{\text{through},\text{back}\}\) governs update timing and \(P_a \in \{\text{allocate},\text{no-allocate}\}\) governs miss handling; the resulting system must guarantee that every store is eventually visible in main memory and that subsequent loads observe the most recent store under the coherence model of the architecture (Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*, 6e, §B.3).

## 5. Worked examples — every step shown

**Example 1 — Single write hit under write-through**  
*Given:* L1 line for address 0x1000 is valid, clean; memory holds 0x00.  
*Find:* state after processor stores 0x42 to 0x1000.  
Store updates cache line → cache now holds 0x42.  
*Why:* write-through rule requires immediate propagation.  
Store also updates memory → memory now holds 0x42.  
*Why:* policy definition.  
**Final state:** cache = 0x42 (clean), memory = 0x42.  

*Reflection:* the example is trivial yet shows that write-through never produces a dirty line.

**Example 2 — Write miss, write-allocate, write-back**  
*Given:* address 0x2000 misses; block size 4 bytes; memory block = [0xAA,0xBB,0xCC,0xDD].  
*Find:* actions and final state.  
Allocate: fetch block into cache, mark valid.  
*Why:* write-allocate rule.  
Store byte 1 with 0xFF → cache line = [0xAA,0xFF,0xCC,0xDD], dirty bit set.  
*Why:* store occurs inside cache; memory unchanged until eviction.  
**Final state:** cache holds dirty block, memory still contains original values.  

*Reflection:* one DRAM read and zero DRAM writes occurred; bandwidth is saved until eviction.

**Example 3 — Same write miss, no-write-allocate, write-through**  
*Given:* identical miss.  
*Find:* actions.  
Bypass cache; write only the modified byte to memory.  
*Why:* no-write-allocate definition.  
Cache state unchanged.  
**Final state:** memory byte 1 = 0xFF; cache untouched.  

*Reflection:* no cache pollution, but any later read of the same block will still miss.

**Example 4 — Eviction of dirty line under write-back**  
*Given:* set is full; victim line is dirty.  
*Find:* bus transactions.  
Write entire victim block back to memory.  
*Why:* dirty bit forces write-back.  
Clear dirty bit, install new block.  
**Final state:** memory now consistent; new line resident.  

*Reflection:* the extra write appears only at eviction time, which is why write-back traffic is bursty.

## 6. Common traps and how to avoid them
| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming every write policy produces identical load values | Students forget that write-through keeps memory current while write-back does not until eviction | Always simulate both memory and cache contents after each store |
| Using write-allocate for write-once streaming data | Temporal-locality assumption is false | Profile store addresses; switch to no-write-allocate when reuse distance exceeds cache size |
| Forgetting to set dirty bit on a store | Dirty bit is an extra state bit easy to overlook in RTL | Add an explicit assertion in simulation that any modified line has dirty=1 |
| Mixing write-through L1 with write-back L2 without proper write-combining | Bandwidth explosion at L2 | Insert a write buffer between levels when policies differ |
| Ignoring I/O coherence | DMA writes bypass cache; stale data may be read | Use cache-flush or snooping logic for DMA regions |
| Believing write-through never needs a dirty bit | True, but the absence of the bit is itself a fact that must be remembered | Document policy invariants in the cache controller spec |
| Under-counting write-allocate traffic on read-for-ownership misses | Modern MESI protocols turn stores into RFO transactions | Count both the initial read and the later write-back when estimating bandwidth |

## 7. The textbook-precise statement
A cache implements a write policy pair \((P_t,P_a)\) where \(P_t\) dictates whether a store updates main memory synchronously (\(P_t=\text{through}\)) or lazily on eviction (\(P_t=\text{back}\)) and \(P_a\) dictates whether a write miss first installs the block (\(P_a=\text{allocate}\)). Under write-back the cache must maintain a dirty bit per line; under write-allocate the cache must support a read-for-ownership transaction. The resulting system satisfies the single-writer invariant required by the memory model (Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*, 6e, §B.3 and §5.8).

## 8. Visual — diagram or schematic
```text
CPU Store
   |
   v
+-------------+          write-through path
|   L1 Cache  |-----------------------------------> DRAM
| V | D | Tag |               (every store)
+-------------+
   |     ^
   |     |  write-back path
   |     |  (only on eviction of dirty line)
   v     |
+-------------+
|   L2 / MEM  |
+-------------+
```
Labels: V = valid bit, D = dirty bit. The solid arrow shows immediate traffic; the dashed arrow shows deferred traffic.

## 9. The memory technique
**The hook** — picture a writer who either mails a postcard after every sentence (write-through) or keeps a notebook and mails the whole chapter only when the notebook is full (write-back).  
**What to overlearn** — write-back + write-allocate is the default for on-chip caches; write-through is used only when coherence latency or predictability matters more than bandwidth.  
**Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — start from the requirement that every store must eventually appear in DRAM, then ask “when?” (through vs. back) and “does the block enter the cache first?” (allocate vs. no-allocate).

## 10. What this unlocks
These policies are prerequisites for cache-coherence protocols, memory-consistency models, and DMA-aware drivers.  
- MESI/MOESI state transitions depend on whether a write hit generates an immediate bus transaction (write-through) or only a state change to Modified (write-back).  
- Release consistency and acquire semantics in C++11 atomics rely on write-back flush points.  
- GPU texture caches often combine write-through with no-write-allocate to simplify warp-level visibility rules.  
- Real-time WCET analysis tools must enumerate dirty-eviction paths only under write-back policies.

## 11. Self-check — five questions, no answers
1. A processor issues 1024 sequential 64-bit stores to distinct cache lines. Under write-through/no-write-allocate how many DRAM writes occur? Under write-back/write-allocate?  
2. Explain why a write-back cache with no dirty bit violates correctness.  
3. In a two-level hierarchy, L1 is write-through and L2 is write-back. After an L1 store, is the block necessarily dirty in L2?  
4. A streaming kernel writes each 64-byte block exactly once and never reads it again. Which policy pair minimizes both cache pollution and total DRAM traffic?  
5. A DMA engine writes directly to a memory region cached under write-back/write-allocate. What sequence of operations restores coherence before the processor reads the region?