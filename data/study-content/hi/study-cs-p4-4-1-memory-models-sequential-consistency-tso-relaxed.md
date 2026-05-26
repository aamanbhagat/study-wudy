## 1. The one-sentence answer
**Memory models define the allowed reorderings of loads and stores across threads so that programmers can reason about correctness without knowing every micro-architectural detail.**

Sequential consistency (SC) demands that every thread sees a single global total order of all memory operations that also respects each thread’s program order. TSO relaxes only the store-to-load ordering inside one thread while keeping everything else strict. Relaxed models drop even more guarantees, letting stores become visible out of order and allowing load-load reordering. The practical result is that the same source code can produce different observable values on different ISAs unless the programmer inserts the correct fences or atomic primitives.

The key engineering trade-off is performance versus reasoning cost. Stronger models give simpler mental pictures but force hardware to insert stalls; weaker models expose more concurrency to software and require careful use of synchronization primitives.

> [!NOTE]
> The single most important “aha” is that memory models are contracts between hardware and software: hardware promises certain visibility rules, and software must insert the minimal synchronization that makes its intended orderings guaranteed under that contract.

## 2. Why this matters — concrete and current
Intel x86 processors implement TSO; every lock-free algorithm in the Linux kernel and in Java’s java.util.concurrent must therefore emit the exact mfence or locked instructions that TSO requires, otherwise the famous Meltdown/Spectre-style reorderings become correctness bugs rather than transient-execution issues.

ARMv8 and RISC-V’s “RVWMO” model are relaxed; the Linux kernel’s memory-barrier macros (smp_mb, smp_wmb, etc.) expand to different instruction sequences on ARM than on x86, which is why the same driver source produces correct but different binaries for mobile SoCs versus server CPUs.

NVIDIA GPUs expose an even weaker model called “relaxed consistency with explicit scopes”; CUDA programmers must use __threadfence_system or atomicAdd with the correct memory scope, otherwise cross-block reductions silently read stale values—an error that appears only at scale on large GPU clusters.

Google’s Spanner and Amazon’s DynamoDB rely on linearizability at the client API; their storage engines internally choose TSO or relaxed consistency per shard and then insert the minimal cross-shard synchronization, directly affecting tail latency in globally distributed transactions.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Program order            | The baseline ordering that every memory model must at least respect inside one thread |
| Happens-before           | The partial order built by synchronization that memory models must preserve         |
| Cache coherence          | The mechanism that propagates writes; memory models describe what reorderings coherence is allowed to hide |
| Fence / barrier instructions | The only way software can strengthen a weak hardware model                         |

If any row above is unfamiliar, pause and read the corresponding section on cache coherence first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from a single thread
A single thread always expects its own stores and loads to appear in program order. On any modern core this is already enforced by the store buffer and the load-store queue; the memory model only becomes interesting once two or more threads share memory.

Example: Thread 0 executes `A=1; r0=A;`. Even on relaxed hardware the load must see the store because they are in the same thread.

Formal statement: For any thread \(T_i\), if instruction \(x\) precedes instruction \(y\) in \(T_i\)’s program order, then \(x\) must precede \(y\) in \(T_i\)’s view of memory unless the model explicitly relaxes that pair.

> [!WARNING]
> Forgetting that intra-thread ordering is still partially enforced leads to incorrect fence placement; the hardware already gives you some ordering “for free.”

### Step 2 — Add a second thread and ask what global order is visible
When two threads write and read the same location, the memory model decides whether the second thread must observe the first thread’s write.

Formal statement (SC): There exists a total order \(\prec\) over all memory operations such that (a) \(\prec\) respects each thread’s program order and (b) every load returns the value of the most recent store to the same address in \(\prec\).

### Step 3 — Introduce TSO by relaxing only store→load order
TSO keeps all other orderings but allows a load to bypass an earlier store to a different address inside the same thread.

Formal statement (TSO): The global order must respect program order except for the pair (store, later load). A store buffer makes this relaxation visible: the store sits in the buffer while the load proceeds.

> [!WARNING]
> Assuming TSO forbids all reordering is the most common source of subtle concurrency bugs when porting x86 code to ARM.

### Step 4 — Relax further: store→store and load→load reorderings
Relaxed models (ARM, Power, RVWMO) allow a store to become visible to other threads before an earlier store in program order, and likewise for loads.

Formal statement: The only required orderings are those created by explicit synchronization instructions or by release/acquire atomic operations; all other pairs may be reordered.

### Step 5 — Define fences as the software-controlled strengthening mechanism
A full fence (mfence, dmb sy) restores sequential consistency for the operations that bracket it.

Formal statement: Inserting a fence between two operations \(x\) and \(y\) adds the edge \(x \prec y\) to the global order even if the hardware model would otherwise have permitted reordering.

## 5. Worked examples — har step show karo

**Example 1 — Two-thread message passing under SC**
*Given:* Thread 0: `data=42; flag=1;` Thread 1: `while(flag!=1); r=data;`
*Find:* Possible values of `r`.
Under SC the only legal execution forces `flag=1` to become visible after `data=42`, so `r` must be 42.
*Why:* SC total order respects both program orders, therefore the store to `data` precedes the store to `flag` which precedes the load of `flag` which precedes the load of `data`.

**Example 2 — Same code under TSO**
*Given:* Same program.
*Find:* Can `r` be 0?
Yes, because TSO allows Thread 0’s store to `flag` to become visible before the store to `data` drains from the store buffer.
*Why:* The only relaxation TSO permits is store→load inside one thread; here the two stores can be reordered in the global order seen by Thread 1.

**Example 3 — Load→load reordering on ARM**
*Given:* Thread 0: `x=1; y=1;` Thread 1: `r1=y; r2=x;`
*Find:* Can `r1=1` and `r2=0`?
Under ARM’s relaxed model, yes, because the two loads may be reordered.
*Why:* No acquire or fence forces `r1=y` to complete before `r2=x` starts.

**Example 4 — Inserting a release store to restore ordering**
*Given:* Same program but `y` written with release semantics.
*Find:* Now `r1=1` implies `r2=1`.
*Why:* Release semantics adds a store→store edge from the write of `x` to the release store of `y`; acquire load of `y` then guarantees subsequent loads see everything preceding the release.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming all stores are globally ordered | x86 TSO hides the store buffer from programmers     | Always test on ARM or use release stores             |
| Using volatile instead of atomic    | Volatile only prevents compiler reordering          | Use C++ `std::atomic` with explicit memory order     |
| Placing fence after the operation   | Fence must sit between the two operations it orders | Draw the program-order arrow first, then insert fence|
| Forgetting that SC is not the default on ARM | Most teaching material still uses SC examples       | Compile with `-marmv8` and inspect generated barriers|
| Treating `memory_order_relaxed` as safe for counters | Relaxed atomics give no inter-thread ordering       | Use `memory_order_acq_rel` or stronger for synchronization|
| Ignoring address dependencies       | ARM allows some dependent loads to be reordered     | Use `READ_ONCE` + `smp_rmb` or acquire loads         |
| Copy-pasting x86 assembly fences to RISC-V | Different fence instructions have different scopes  | Map each fence to the target ISA’s documentation     |

## 7. The textbook-precise statement
A multiprocessor memory model is a set of rules that constrain the order in which memory operations performed by different processors become visible to one another. Formally, let \(M\) be the set of all memory operations; a model defines a strict partial order \(\prec\) on \(M\) such that:

1. For every processor \(P_i\), the projection of \(\prec\) onto the operations issued by \(P_i\) respects program order.
2. For every load \(\ell\) that reads address \(a\), there exists a store \(s\) to \(a\) such that \(s \prec \ell\) and no other store \(s'\) to \(a\) satisfies \(s \prec s' \prec \ell\).

Sequential consistency requires \(\prec\) to be a total order. TSO weakens condition 1 by allowing a store \(s\) and a later load \(\ell\) in the same processor to appear in either order provided they access different addresses. Relaxed models weaken condition 1 further, requiring only the edges introduced by synchronization primitives. (Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*, 6e, Appendix I.3–I.5)

## 8. Visual — diagram or schematic
```text
Thread 0                  Thread 1
store A, 1   ──►          load  B      (may see 0)
store B, 1                load  A      (may see 0 under relaxed)
          ^ fence needed here to force A before B visibility
```
Horizontal arrows show program order; vertical dashed lines show possible global visibility reorderings allowed by relaxed models.

## 9. The memory technique

1. **The hook** — Picture each thread’s stores sitting in a coffee shop queue; SC makes every customer wait for the entire queue to drain before the next person orders, TSO lets you order a drink while your friend’s sandwich is still being made, and relaxed models let people cut the line unless they explicitly hold the door (fence).
2. **What to overlearn** — SC total order definition, TSO store-buffer relaxation rule, and the fact that release/acquire create happens-before edges.
3. **Spaced-repetition schedule** — Review the three-model comparison table after 1 day, 3 days, 7 days, 16 days and 35 days; each time re-derive one worked example from scratch.
4. **First-principles fallback** — If you forget the exact rules, redraw the two-thread message-passing example and ask “which edges must exist for the load to see the intended value?”; the missing edges tell you which fence or atomic is required.

## 10. What this unlocks
Once you internalize memory models you can correctly implement and verify lock-free data structures, choose the cheapest sufficient memory order for each atomic, and debug “impossible” values that appear only on ARM servers.

- Next topics that directly depend on this material:
  - C++20 `std::atomic` and `std::memory_order` mappings to hardware
  - RCU and Linux kernel `smp_*` barriers
  - GPU scope-based atomics and Vulkan memory model
  - Model checking tools (TSOtool, Herd7) for validating compiler output

## 11. Self-check — five questions, no answers
1. On which model can the classic Dekker’s algorithm fail without fences?
2. Write the minimal set of fences that makes the two-thread message-passing example correct on ARM.
3. A release store on ARM corresponds to which TSO behavior?
4. Why does `memory_order_relaxed` on a counter still require an atomic type even though ordering is not guaranteed?
5. Given three threads and a cyclic data dependency, which memory model can produce a value that violates causality, and which cannot?