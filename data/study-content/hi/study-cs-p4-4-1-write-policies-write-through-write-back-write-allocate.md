## 1. The one-sentence answer
**Write policies decide exactly when and how a processor writes data from cache back to main memory, trading off latency, bandwidth, and coherence.**

Write-through immediately pushes every store to both cache and DRAM, so memory always holds the latest value. Write-back keeps dirty data only in cache and flushes the block only on eviction, cutting memory traffic. Write-allocate fetches the missing block into cache on a write miss before performing the store; its opposite, no-write-allocate, writes directly to memory and leaves the cache untouched.

These three choices are not independent; real systems almost always pair write-through with no-write-allocate and write-back with write-allocate.

> [!NOTE]
> The single deepest insight is that every write policy is ultimately a bet on temporal locality versus memory bandwidth: write-back bets that the same block will be written many times before eviction, while write-through bets that the cost of extra bus traffic is cheaper than the complexity of tracking dirty bits.

## 2. Why this matters — concrete and current
Apple’s M-series SoCs use write-back L1 and L2 caches with write-allocate; the unified memory architecture would saturate the fabric if every store went straight to DRAM.

NVIDIA’s Hopper GPU texture units employ write-through for surface stores so that subsequent compute shaders see coherent data without explicit cache flushes.

Intel’s Ice Lake server cores switched the L3 from write-back to a hybrid write-through mode for cache lines marked “uncacheable speculative write combining,” directly improving TPC-C scores by 4–7 %.

AWS Graviton3’s CHI interconnect protocol assumes write-back + write-allocate for all coherent caches; any deviation would break the directory-state machine described in ARM’s CHI specification.

Modern persistent-memory libraries (PMDK) deliberately choose write-through stores when updating redo logs so that a power failure never leaves a torn transaction record in DRAM.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cache line / block       | All policies operate on entire lines, not individual bytes |
| Dirty / clean bit        | Write-back uses this bit to decide whether eviction must write to memory |
| Write hit vs. write miss | Policies differ precisely on these two cases              |
| Memory-bus bandwidth     | Write-through multiplies bus traffic; write-back hides it |

If any row is unfamiliar, pause and read the corresponding section on cache organisation first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Write hit on a clean line
A store finds its address already resident and clean.  
Example: address 0x1000 holds 42, dirty bit = 0.  
You execute `mov [0x1000], 99`.  
Formal rule: on write hit the cache line is updated; the action on memory depends on the chosen policy.  
> [!WARNING]  
> Forgetting that the line was clean leads students to think a write-back cache always generates a bus transaction; it does not.

### Step 2 — Write hit on a dirty line
The same store now occurs when dirty bit = 1.  
Write-through still writes to memory; write-back simply overwrites the cache copy and leaves dirty = 1.  
No extra bus traffic occurs under write-back.

### Step 3 — Write miss, write-allocate
The address is not resident.  
Hardware first fetches the entire cache line from memory into the cache set, then merges the new datum.  
Result: the line becomes dirty under write-back or is written through under write-through.  
$$ \text{WriteMissAllocate}(A) = \text{FetchLine}(A) ; \text{Update}(A) $$

### Step 4 — Write miss, no-write-allocate
Hardware bypasses the cache and writes directly to memory.  
Cache state is unchanged; useful when spatial locality is absent.

### Step 5 — Eviction under write-back
When a dirty victim is selected, the cache issues a write-back transaction:  
$$ \text{Evict}(v) = \text{if dirty}(v) \text{ then WriteMem}(v.\text{addr}, v.\text{data}) $$  
Write-through never needs this step because memory is already coherent.

### Step 6 — Coherence implications
Write-through simplifies snooping protocols because memory is always up-to-date; write-back requires ownership or exclusive states (MESI) to track dirty copies.

## 5. Worked examples — har step show karo

**Example 1 — Write-through hit**  
*Given:* L1 line at 0x2000 is clean, value = 7.  
*Find:* final state after `mov [0x2000], 13`.  
Cache updated to 13; memory also written to 13; dirty bit remains 0.  
*Why:* write-through forces memory update on every hit.  
**Final state: cache = 13, memory = 13, dirty = 0**

**Example 2 — Write-back hit**  
*Given:* same line, dirty = 1.  
Store 13 occurs.  
Cache becomes 13; memory untouched; dirty stays 1.  
*Why:* dirty bit already signals that memory is stale.  
**Final state: cache = 13, memory = old value, dirty = 1**

**Example 3 — Write-allocate miss**  
*Given:* miss at 0x3000, line size 64 B.  
Hardware fetches 64 B block, merges new datum, sets dirty = 1 (write-back).  
*Why:* allocation guarantees future writes hit in cache.  
**Final state: new line resident, dirty = 1**

**Example 4 — No-write-allocate miss**  
Same miss occurs under write-through + no-write-allocate.  
Single 8-byte store goes straight to DRAM; cache unchanged.  
*Why:* avoids polluting cache with data unlikely to be reused.  
**Final state: cache unchanged, memory updated**

*Reflection:* the four cases together exhaust all hit/miss × policy combinations; once you can label each with its bus traffic, the rest of the chapter follows mechanically.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Assuming write-back never touches memory | Dirty bit is invisible in simple diagrams   | Always draw the eviction arrow               |
| Confusing write-allocate with prefetch | Both bring data into cache                  | Allocate only on the write address, not next line |
| Forgetting write-through still needs a victim buffer | Eviction can still occur on read misses     | Track dirty bits even under write-through    |
| Thinking no-write-allocate is always faster | Ignores read-after-write to same address    | Count compulsory misses after the write      |
| Mixing allocate policy with replacement policy | Two orthogonal decisions                    | Draw two separate decision diamonds          |
| Ignoring multi-core coherence cost | Write-back requires ownership transactions  | Add “bus upgrade” arrows in diagrams         |

## 7. The textbook-precise statement
In *Computer Architecture: A Quantitative Approach*, 6th ed., §B.3, Hennessy & Patterson define the policies as follows:

A cache is *write-through* if every write hit causes a simultaneous update of the corresponding main-memory location; otherwise it is *write-back*. On a write miss a cache may follow *write-allocate* (fetch the block, then write the word) or *no-write-allocate* (write the word directly to main memory). The four combinations are legal, yet commercial processors almost exclusively implement (write-through + no-write-allocate) or (write-back + write-allocate). The dirty bit is required only for write-back caches; its value for a block is set on the first write and cleared on eviction after the write-back transaction.

## 8. Visual — diagram or schematic
```
          CPU store
             |
             v
       +-----------+
       | Hit?      |---No---> [Write-allocate?]--Yes--> Fetch line
       +-----------+                 | No
             | Yes                   v
             v                 Write to DRAM
       +-----------+                 ^
       |Write policy|                |
       +-----------+                 |
             |                       |
    Write-through          Write-back
             |                       |
             v                       v
       Update DRAM               Set dirty=1
             |                       |
             +-----------+-----------+
                         |
                    Update cache line
```

## 9. The memory technique

1. **The hook** — picture a cook who either washes every plate the moment it is used (write-through) or stacks dirty plates and runs the dishwasher only when the sink is full (write-back).  
2. **What to overlearn** — write-back + write-allocate is the default in modern CPUs; dirty bit lives in the tag array.  
3. **Spaced-repetition schedule** — review the four policy combinations after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — start from “where is the latest value?” and follow the store arrow; the policy is whatever answer that path produces.

## 10. What this unlocks
You can now reason about cache-coherence protocols, memory-consistency models, and performance counters for “dirty evictions”.

- MESI/MOESI state machines  
- Write buffering and store-queue design  
- Cache partitioning for real-time systems  
- Persistent-memory flush instructions (CLWB, CLFLUSHOPT)

## 11. Self-check — five questions, no answers
1. On a write-back cache, how many memory transactions occur for ten stores to the same dirty line followed by eviction?  
2. Why does write-through simplify the implementation of sequential consistency?  
3. A program writes 64 B once and never reads it again. Which policy pair wastes the least bandwidth?  
4. Draw the bus-traffic arrows when a write miss occurs under write-back + write-allocate versus write-through + no-write-allocate.  
5. In a two-core system, core 0 writes a shared line that core 1 later reads. Which policy forces an earlier coherence message?