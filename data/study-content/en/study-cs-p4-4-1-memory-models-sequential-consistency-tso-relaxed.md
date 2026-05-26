## 1. The one-sentence answer
**Memory models define the allowed reorderings of loads and stores across threads that a hardware or language implementation may perform while still guaranteeing that programmers can reason about concurrent execution.**

In sequential consistency every execution must correspond to some total interleaving of the per-thread program orders. This is the simplest model to program against, yet it forbids many hardware optimizations. Real processors therefore adopt weaker models. TSO permits a thread’s own stores to be buffered so that a later load from the same thread may observe an older store from another thread before its own store becomes visible. Relaxed models drop even more ordering constraints, allowing independent memory operations to be reordered freely unless explicit fences are used.

The practical consequence is that the same source program can produce different observable results on different architectures unless the programmer inserts the synchronization primitives required by the model in force.

> [!NOTE]
> The single deepest insight is that every memory model is a contract between hardware and software: hardware promises that certain reorderings will never be visible, and software promises to insert fences or atomics wherever the contract would otherwise be violated.

## 2. Why this matters — concrete and current
Intel x86 processors implement TSO; any lock-free algorithm that assumes sequential consistency (for example, the original double-checked locking pattern) can fail on x86 unless the stores that publish pointers are accompanied by an SFENCE or are performed with release semantics.

ARM and RISC-V relaxed memory models power the majority of mobile SoCs and the Fugaku supercomputer; the Linux kernel’s atomic primitives therefore emit DMB or FENCE instructions whose placement is derived directly from the ARM memory-model axioms published in the 2017 “ARMv8-A Architecture Specification.”

The C++11 memory model (adopted by every major compiler) maps its six memory orders onto the underlying hardware model; the adoption of `std::atomic` with `memory_order_seq_cst` by the TensorFlow runtime eliminated a class of non-reproducible training failures that had previously appeared only on POWER and ARM servers.

The Java Memory Model, revised after the 2004 “Java Concurrency in Practice” findings, forces the JVM to emit the same fences that the hardware model demands; without that mapping, the popular ConcurrentHashMap would have exhibited lost updates on early ARM-based Android devices.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Program order            | Defines the sequence each thread expects its own operations to obey. |
| Happens-before           | Captures the transitive visibility relation that memory models must preserve. |
| Load/store semantics     | Distinguishes reads that observe values from writes that produce them. |
| Fence / barrier          | The only mechanism that can restore ordering once a model permits reordering. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Program order is sacred inside a thread
A single thread always executes its own instructions in the order written.  
Example: the two statements `x = 1; r1 = y;` must be performed by that thread in that sequence.  
Formally, if instruction \(a\) precedes instruction \(b\) in the same thread’s static code, then \(a \prec_{po} b\).  
> [!WARNING] Treating program order as optional inside a thread immediately makes single-threaded code behave incorrectly.

### Step 2 — Global visibility may differ from program order
Different threads may observe stores in an order that is not identical to any single interleaving.  
Example: thread 0 does `x=1; y=1;` while thread 1 does `r1=y; r2=x;`; under some models `r1=1` and `r2=0` is allowed.  
Formally, the execution must still respect each thread’s program order, but the global order \(\prec_{global}\) need not equal \(\prec_{po}\).

### Step 3 — Sequential consistency forbids all reorderings
Lamport’s definition: an execution is sequentially consistent if there exists a total order of all operations that respects every thread’s program order and in which every load returns the value of the most recent store in that total order.  
> [!WARNING] Assuming SC on hardware that implements TSO silently produces data races once store buffering is enabled.

### Step 4 — TSO relaxes only store-to-load order from the same thread
Under TSO a thread may read a value written by another thread before its own prior store has been made visible to that other thread.  
Formally, the only allowed relaxation is \(store_i \prec_{po} load_i \not\Rightarrow store_i \prec_{global} load_i\).  
All other pairs (store-store, load-load, load-store) remain ordered.

### Step 5 — Relaxed models drop additional ordering edges
ARM and POWER allow independent stores and loads to be reordered unless a fence is present.  
Formally, only the edges required by explicit DMB, DSB, or acquire/release annotations survive in the global order.

### Step 6 — The model is completely defined by its allowed executions
A memory model is the set of all executions that satisfy its ordering axioms; any execution outside that set is forbidden and may be assumed never to occur.

## 5. Worked examples — every step shown

**Example 1 — Two-thread store buffering under SC**  
*Given:*  
Thread 0: `x=1; r1=y;`  
Thread 1: `y=1; r2=x;`  
*Find:* Is the outcome `r1=1, r2=0` allowed?  
Under SC a total order must exist. Suppose the order begins with `x=1`. Then `r2=x` must see 1, contradicting the outcome. Any other total order likewise leads to contradiction.  
**Therefore the outcome is forbidden under SC.**  
*Reflection:* The example shows that SC forces an atomic global view; missing this forces the programmer to add fences later.

**Example 2 — Same program under TSO**  
*Given:* identical code.  
*Find:* outcome `r1=1, r2=0`.  
TSO permits Thread 0’s store to `x` to be buffered while Thread 1’s load from `y` executes. Thread 1 can therefore store to `y`, allow Thread 0 to read that value, and still read the old value of `x`.  
**Outcome allowed under TSO.**  
*Reflection:* The single relaxation of store-to-load order is exactly what TSO adds; recognizing which pair is relaxed is the key diagnostic skill.

**Example 3 — Independent stores under relaxed model**  
*Given:* Thread 0: `x=1; y=1;` Thread 1: `r1=y; r2=x;` outcome `r1=1, r2=0`.  
*Find:* legality on ARM.  
ARM permits the two stores of Thread 0 to be reordered; Thread 1 may therefore observe `y`’s new value before `x`’s.  
**Outcome allowed.**  
*Reflection:* Without an intervening DMB ST the model gives no guarantee between the two stores.

**Example 4 — Restoring order with a fence**  
*Given:* same code plus `fence` between the two stores of Thread 0.  
*Find:* outcome `r1=1, r2=0`.  
The fence re-establishes a global edge between the two stores; the relaxed model now forbids the reordering.  
**Outcome forbidden.**  
*Reflection:* Fences are the only tool that reintroduces edges the model otherwise removes.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming all hardware is SC | x86 marketing never mentions TSO | Always consult the architecture manual’s memory-model section before writing lock-free code. |
| Using `volatile` instead of atomics in C++ | Java’s volatile is stronger than C++’s | Map each required order to the matching `memory_order_*` constant. |
| Placing a fence after the operation that needs ordering | Fences only order operations that precede or follow them in program order | Draw the program-order arrows first, then insert the fence on the arrow that must become a global edge. |
| Treating acquire/release as equivalent to SC | Acquire only orders subsequent loads; release only orders prior stores | Verify that both directions of the intended synchronization are covered. |
| Ignoring compiler reordering | The language model permits transformations the hardware would not | Compile with `-O2` and inspect the generated assembly for every atomic. |
| Forgetting that read-modify-write is not atomic by default | Separate load and store can be interleaved | Use `fetch_add` or `compare_exchange` rather than manual load-store pairs. |
| Assuming fences are free | Each fence drains the store buffer or pipeline | Measure the cost on the target micro-architecture before adding fences to hot paths. |

## 7. The textbook-precise statement
A hardware memory model is a triple \((Ops, \prec_{po}, Allowed)\), where \(Ops\) is the set of all memory operations, \(\prec_{po}\) is the union of the program orders of each thread, and \(Allowed\) is the set of total orders (or partial orders) on \(Ops\) that the implementation may produce. An execution is legal exactly when its observed global order lies in \(Allowed\).  
For sequential consistency, \(Allowed\) contains every total order that extends \(\prec_{po}\). For TSO, \(Allowed\) additionally permits the relaxation of store-to-load pairs from the same thread.  
Reference: S. V. Adve and K. Gharachorloo, “Shared Memory Consistency Models: A Tutorial,” IEEE Computer, 29(12):66–76, 1996.

## 8. Visual — diagram or schematic
```text
Thread 0                  Thread 1
x = 1  ────┐             y = 1  ────┐
           │                         │
r1 = y ◄───┼──────── global ────────┼──► r2 = x
           │                         │
(store buffer)                    (store buffer)

Arrows above the line = program order
Arrows crossing the line = possible global visibility under TSO/relaxed
```
The diagram shows two threads whose stores may become visible to the other thread out of program order once buffering is allowed.

## 9. The memory technique
**The hook** — picture each thread’s stores sitting in a “shopping cart” that is emptied only when the hardware chooses; loads may reach into another thread’s cart before the cart is emptied, exactly when the model permits.

**What to overlearn** — (1) SC = total order extending every \(\prec_{po}\); (2) TSO relaxes only store-before-load from the same thread; (3) every fence adds an edge that the model would otherwise omit.

**Spaced-repetition schedule** — review the three-model comparison table at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — start from the raw program-order arrows, add the minimal extra edges required by each model, then check whether the observed execution still respects those edges.

## 10. What this unlocks
Mastery of memory models is the prerequisite for writing or verifying any lock-free data structure, for understanding the implementation of language-level atomics, and for reasoning about the correctness of cache-coherence protocols.

- Next: release-acquire semantics and their mapping onto ARMv8 and RISC-V
- Next: the C++20 atomic-ref and atomic-wait primitives
- Next: model-checking tools (GenMC, Herd7) that enumerate allowed executions
- Next: cache-coherence protocols (MESI, MOESI) that realize the memory-model axioms in silicon

## 11. Self-check — five questions, no answers
1. Write the smallest program that distinguishes SC from TSO on two threads and state the outcome that proves the distinction.

2. On an ARM core, insert the minimal set of fences that restores sequential consistency for the classic message-passing idiom.

3. Given an execution trace containing four loads and three stores, decide whether it is allowed under TSO; justify each ordering decision with the corresponding axiom.

4. A compiler moves a store before a load that precedes it in source order. Which memory models, if any, still guarantee that another thread cannot observe the new order?

5. Prove or disprove: every execution that is legal under TSO is also legal under sequential consistency.