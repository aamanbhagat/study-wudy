## 1. The one-sentence answer
**Multicore coherence protocols are finite-state machines that keep every cache line’s copy across private caches identical to the authoritative value in shared memory by exchanging messages on every read, write, or eviction.**

When two cores hold copies of the same memory address, a write by one core must either invalidate or update the other copy before any subsequent read can occur. Without this rule, a core could read stale data that violates the memory consistency model the programmer expects. The protocol therefore tracks the permission each cache holds—read-only or read-write—and forces transitions whenever permissions conflict.

The simplest mental model is a set of traffic lights at every cache: green means “you alone may write,” yellow means “anyone may read,” and red means “you hold nothing valid.” Every memory operation changes the lights for all participants.

> [!NOTE]
> The single deepest insight is that coherence is not about moving data faster; it is about enforcing a global total order on writes to each address, which is achieved by making every transition visible to all caches.

## 2. Why this matters — concrete and current
Apple’s M-series SoCs use a custom MOESI-derived directory protocol inside the shared L2 to keep eight performance cores and up to ten efficiency cores coherent while sustaining >500 GB/s of memory bandwidth; any violation would break the unified memory model exposed to Metal shaders and Core ML.

NVIDIA’s Grace CPU, paired with Hopper GPUs, implements a directory-based coherence protocol over NVLink-C2C so that the CPU’s 72 Arm Neoverse cores and the GPU’s thousands of SMs can share a single virtual address space without explicit programmer-managed copies.

The open-source BOOM out-of-order RISC-V core on FPGA uses a MESI snooping protocol over a TileLink interconnect; coherence correctness is verified nightly with the Coherence Manager’s litmus-test suite, catching bugs that would otherwise appear only under concurrent Linux boot workloads.

AMD’s Zen 4 chiplet design places a distributed directory at the Infinity Fabric controllers; the protocol must handle both intra-chiplet L3 slices and inter-chiplet traffic, directly determining the 6–12 % performance loss observed when scaling from one CCD to two CCDs on SPECrate.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Cache line, tag, index, offset | Every coherence action is performed on an entire line, not individual bytes. |
| Write-back vs write-through policy | Write-back caches generate coherence traffic only on eviction or external request; write-through generates it on every store. |
| Memory consistency model (SC, TSO) | Coherence supplies the per-address ordering; consistency tells the programmer what global interleavings are legal. |
| Finite-state machine | Each cache line is an FSM whose states encode permissions; transitions are driven by local CPU requests and remote messages. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The coherence invariant
A memory system is coherent if, for every address, the value returned by a read is the value written by the most recent write that is ordered before it according to the coherence order.

Consider two cores, A and B, both reading address x = 0. Core A writes 1; if B later reads 1, the protocol has preserved the invariant.

Formally, let \( W(a) \) be the set of writes to address \( a \). Coherence requires a total order \( \prec_a \) on \( W(a) \) such that every read returns the value of the maximal write under \( \prec_a \).

> [!WARNING]
> If the protocol allows two writes to become visible in different orders at different caches, the invariant is broken even if every individual cache is internally consistent.

### Step 2 — Permissions instead of values
It is sufficient to track whether a cache may read or may write a line; the actual data moves only when a permission is granted.

A cache that holds write permission can modify the line locally. Any other cache that later needs read permission must first cause the writer to downgrade.

### Step 3 — The four MESI states
Each cache line resides in one of four stable states:

- **M**odified: exclusive ownership, dirty data.
- **E**xclusive: exclusive ownership, clean data.
- **S**hared: read-only, possibly multiple copies.
- **I**nvalid: no permission.

Transitions are triggered by local PrRd/PrWr or by bus messages BusRd/BusRdX/BusUpgr.

### Step 4 — Bus snooping as a broadcast medium
Every cache controller “snoops” every bus transaction. On observing BusRd for a line it holds in M, it supplies the data and downgrades to S (or I if the request is BusRdX).

### Step 5 — Directory to avoid broadcast
A central or distributed directory records, for each line, the set of sharers and the owner. Requests are sent point-to-point, eliminating O(n) traffic on every miss.

### Step 6 — Textbook statement
A coherence protocol implements a finite-state machine per cache line whose state encodes the current permission and whose transition function, given a local request and incoming messages, produces the next state, outgoing messages, and data movement while preserving the coherence invariant for every address.

## 5. Worked examples — every step shown

**Example 1 — Two-core read then write**
*Given:* Both caches start in I for line x.
*Find:* Final states after A reads, then B writes.
- A issues PrRd → issues BusRd → receives data → transitions to E. *Why:* No other sharers, so exclusive clean is safe.
- B issues PrWr → issues BusRdX → A sees BusRdX, flushes data, transitions to I. *Why:* Write permission requires sole ownership.
- B receives data, transitions to M.

**Final answer:** A:I, B:M

*Reflection:* The downgrade of A is forced by the protocol even though A never wrote; missing this transition is the most common student error.

**Example 2 — Writeback of dirty line**
*Given:* A holds line in M, value 7. B issues PrRd.
*Find:* Sequence and final states.
- B’s BusRd reaches A.
- A supplies 7 on the bus, transitions M→S.
- B receives 7, transitions I→S.

**Final answer:** A:S (clean), B:S

*Reflection:* The flush on snoop is what keeps the coherence invariant; without it B would read stale data from memory.

**Example 3 — False sharing**
*Given:* Two cores write different words inside the same 64-byte line.
*Find:* Why coherence traffic appears.
Each write generates BusRdX because the line state is S or M at the other core, even though the words do not overlap.

**Final answer:** 2 BusRdX transactions per pair of writes

*Reflection:* Padding to cache-line alignment eliminates the traffic; the protocol itself cannot distinguish false from true sharing.

**Example 4 — Directory forwarding**
*Given:* Directory records owner = A, sharers = {}. C issues PrRd.
*Find:* Message count.
- C → directory
- Directory → A (forward)
- A → C (data) and directory (update sharers)

**Final answer:** 3 messages instead of broadcast

*Reflection:* Directory size grows with number of cores; sparse directories are the practical engineering response.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming write-through on every store | Students forget that write-back caches only generate coherence traffic on eviction or snoop | Always annotate each transition with “write-back” or “write-through” |
| Treating E and M as interchangeable | Both grant exclusive write permission, yet only M indicates dirty data | Track the clean/dirty bit separately from the owner bit |
| Ignoring transient states | Real controllers have “waiting for data” states that can deadlock if ordering is wrong | Draw the full transient-state machine before coding |
| Forgetting silent eviction of E lines | An E line can be dropped without notifying the directory | Always send a notification on E→I |
| Confusing coherence with consistency | Students think MESI guarantees sequential consistency | Remember MESI only orders operations on the same address |
| Underestimating directory storage | Full bit-vector directories scale linearly with cores | Use limited pointers or coarse directories for >64 cores |
| Race between simultaneous BusRdX | Two cores may both believe they hold ownership | Require total order on the bus or directory serialization point |

## 7. The textbook-precise statement
A cache-coherence protocol for a shared-memory multiprocessor is a collection of finite-state machines, one per cache line at each processor, together with a message-passing medium (bus or directory). Each machine’s state set includes at minimum {M, E, S, I}. The transition function \(\delta\) maps (local request, incoming message) to (new state, outgoing messages, data action) such that the global history satisfies the coherence invariant: for every address a there exists a total order on all writes to a that is respected by every read. (Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*, 6e, §5.2–5.4)

## 8. Visual — diagram or schematic
```
Core A          Bus/Directory          Core B
  |                  |                    |
  |---BusRd(x)------>|                    |
  |<--data-----------|                    |
  |   State: E       |                    |
  |                  |---BusRdX(x)------->|
  |<--flush data-----|<--invalidate-------|
  |   State: I       |                    |
  |                  |<--data-------------|
  |                  |   State: M         |
```

## 9. The memory technique
1. **The hook** — Picture four knights guarding a single treasure chest (the cache line): M knight has changed the treasure and hides it; E knight has the only key and the chest is still original; S knights all have identical copies of the map; I knight has been banished.
2. **What to overlearn** — The four stable states M/E/S/I and the fact that only M and E grant write permission.
3. **Spaced-repetition schedule** — Review states and transitions at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from the single requirement that a read must return the latest write; every state exists only to encode who may supply that write.

## 10. What this unlocks
Mastery of multicore coherence protocols lets you reason about the performance and correctness of any shared-memory parallel program, including lock-free data structures, cache-oblivious algorithms, and GPU-style SIMT execution.

- Next: memory consistency models (SC, TSO, RC)
- Next: directory protocols at scale (AMD Infinity Fabric, Intel Mesh)
- Next: verification of coherence with model checkers (Murphi, TLA+)
- Next: cache-coherent interconnects (TileLink, AXI Coherency Extensions)

## 11. Self-check — five questions, no answers
1. A core writes a line that is in S state at two other cores. How many invalidation messages are generated under snooping MESI?
2. In a directory protocol, what happens to the directory state when an owner silently evicts an E line?
3. Draw the state diagram fragment for a line that receives BusRd while in M; include the transient state.
4. Why does adding write permission downgrade an E line to I on another core but only to S on a read?
5. A program exhibits 30 % of its misses as coherence misses on a 16-core chip with MESI snooping. Estimate the traffic reduction if the design switches to a directory with 4 pointers per entry.