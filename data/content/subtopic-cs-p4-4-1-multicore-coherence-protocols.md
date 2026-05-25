## What it is
Cache coherence protocols are the rules that multiple processors use to maintain a consistent view of shared memory. When each processor has its own private cache, a piece of data can exist in multiple places at once; these protocols ensure that a write to that data by one processor is eventually seen by all other processors, preventing them from using stale data.

## Why it matters
In high-performance computing for physics simulations (e.g., fluid dynamics, N-body problems), multiple cores work on a shared dataset; coherence ensures calculations are based on correct, up-to-date values. In machine learning, parallel training of large models across multiple GPU cores relies on coherence to correctly aggregate gradients and update model weights. In aerospace, flight control systems often use redundant, multicore processors for fault tolerance, where data consistency is a matter of mission safety.

## When to study it
You must have a firm grasp of single-core computer architecture first. Specifically, ensure you understand:
1.  **The memory hierarchy:** The relationship between registers, L1/L2/L3 caches, and main memory.
2.  **Cache fundamentals:** Concepts like cache lines (blocks), associativity, and replacement policies.
3.  **Cache write policies:** The difference between write-through and write-back caches. The coherence problem is most acute with write-back caches, which is the standard for modern CPUs.
4.  **Bus architecture:** The role of a shared bus for communication between CPUs and memory.
5.  **Finite State Machines (FSMs):** Protocols are formally defined as FSMs, so you need to be able to read and understand state transition diagrams.

If any of these are weak, review them first. We will build directly on these concepts.

## How to study it (step by step)
1.  **The Coherence Problem:** On paper, draw two CPUs (P1, P2), each with a private cache, connected by a bus to a single main memory. Let memory location `X` contain value `10`. Trace this sequence:
    *   P1 reads `X`. (P1's cache gets `X=10`).
    *   P2 reads `X`. (P2's cache gets `X=10`).
    *   P1 writes `X=20`. (P1's cache updates to `X=20`. What about P2 and main memory?)
    *   P2 reads `X` again. What value does it get? This is the incoherence problem.
2.  **Snooping vs. Directory:** Read about the two main approaches. Understand that snooping involves every cache monitoring (snooping on) a shared bus for memory transactions. Realize its limitation: a bus is a shared resource that saturates, limiting scalability. Contrast this with a directory-based protocol, which uses a central data structure (the directory) to track which caches hold which data, communicating via point-to-point messages.
3.  **Derive the MSI Protocol:** Start with the simplest snooping protocol. For any given cache line, what are the possible states it can be in?
    *   It could be invalid (`Invalid`).
    *   It could be valid, clean (matches memory), and potentially shared with other caches (`Shared`).
    *   It could be valid, dirty (modified, differs from memory), and this cache must have the only copy (`Modified`).
    This gives you the three states of the **MSI** protocol. Draw the state transition diagram for a single cache based on CPU actions (PrRd, PrWr) and bus actions (BusRd, BusRdX).
4.  **Optimize to MESI:** Consider the common case of a read followed by a write to the same block by the same processor. In MSI, a PrRd causes a BusRd, putting the line in `Shared`. The subsequent PrWr requires a BusRdX (Read Exclusive) or BusUpgr (Upgrade) to invalidate other copies. This is inefficient if no other cache had a copy in the first place. Introduce a new state: `Exclusive`. This state means "I have the only copy, and it is clean." A write from the `Exclusive` state is silent on the bus and transitions directly to `Modified`. This is the core optimization of the **MESI** protocol.
5.  **Trace a MESI sequence:** Using the MESI states, re-trace the sequence from step 1, and then a more complex one. Track the state of the cache line for `X` in each processor's cache and the bus transactions generated.

## Key ideas, with intuition
1.  **The Invariant: Single Writer or Multiple Readers.** This is the fundamental principle of all coherence protocols. For any given block of memory, at any given time, the system must only permit one of these two conditions:
    *   There is exactly one processor cache with permission to write to the block (and it has the most up-to-date copy).
    *   There are one or more processor caches with permission to read from the block (and they all have the same, up-to-date copy).
    It is forbidden to have a writer and any other reader/writer simultaneously. The protocol's state transitions are all designed to enforce this invariant.

2.  **Snooping: The Town Square.** Imagine a small town where all announcements are made in the central square (the bus). Every citizen (cache controller) is always listening. If someone needs to modify the town's official record (write to memory), they first shout "Everyone stop looking at the old record!" (invalidate). This works for small towns but leads to chaos (bus saturation) in a metropolis.

3.  **Write Invalidation vs. Write Update.** How do we inform other caches of a write?
    *   **Invalidation:** The writing cache sends a message on the bus that says "My copy of address `X` is now the only valid one. Your copies are stale." This is the most common approach because data often isn't shared immediately after being written.
    *   **Update:** The writing cache broadcasts the newly written data itself. Other caches update their copies. This uses more bus bandwidth but can be faster if other CPUs need the new value right away. Most protocols (like MSI/MESI) are invalidation-based.

4.  **Cache States are Permissions.** Don't just think of the states (M, E, S, I) as labels. Think of them as permissions that a cache holds for a specific line of data.
    *   `M` (Modified): Permission to read and write. You are the sole owner and memory is out of date. You *must* write back to memory eventually.
    *   `E` (Exclusive): Permission to read and a *fast-track* permission to write without telling anyone. You are the sole owner, but memory is up to date.
    *   `S` (Shared): Permission to read only. Others may also have read permission.
    *   `I` (Invalid): No permissions. The data is junk.

## Worked example
Let's trace a sequence with two processors, P1 and P2, using the **MSI protocol**. The variable `X` is at address `0x100`. Initially, both caches have an invalid copy of the block containing `0x100`.

| Step | Action      | P1 State | P2 State | Bus Action                 | Explanation                                                              |
| :--- | :---------- | :------- | :------- | :------------------------- | :----------------------------------------------------------------------- |
| 0    | Initial     | I        | I        | None                       | System is idle.                                                          |
| 1    | P1 reads `X`  | S        | I        | BusRd `0x100`              | P1 misses, issues a Bus Read. Memory responds. P1 loads data into `S`tate. |
| 2    | P2 reads `X`  | S        | S        | BusRd `0x100`              | P2 misses, issues a Bus Read. Memory responds. P2 loads data into `S`tate. |
| 3    | P1 writes `X` | M        | I        | BusRdX `0x100` (or BusUpgr) | P1 wants to write to a `S`hared line. It issues a "Read Exclusive" (or Upgrade) signal on the bus to gain exclusive ownership and invalidate other copies. P2 snoops this, sees it has a copy of `0x100`, and invalidates its line. P1's state becomes `M`odified. |
| 4    | P2 reads `X`  | S        | S        | BusRd `0x100`              | P2 misses (its copy is `I`nvalid). It issues a Bus Read. P1 snoops the bus, sees the request for an address it holds in `M` state, and intervenes. P1 sends the data to P2 and writes it back to main memory, and both caches transition their copies to the `S`hared state. |

**Reflection:**
*   Step 1 shows how a read miss is satisfied from memory.
*   Step 2 shows how sharing is established. Both caches have a valid, read-only copy.
*   Step 3 is the core of coherence. To write, P1 had to broadcast its intent, forcing P2 to invalidate its copy, thus upholding the "single writer" invariant.
*   Step 4 shows that the owner of a modified (`M`) line is responsible for providing the correct data to other requesters, a process called a "snoopy intervention" or "cache-to-cache transfer".

## Diagrams
A typical snoopy bus-based system architecture:

```text
      +-----+      +-----+      +-----+
      | CPU |      | CPU |      | CPU |
      +-----+      +-----+      +-----+
         |            |            |
      +-----+      +-----+      +-----+
      | L1$ |      | L1$ |      | L1$ |
      +-----+      +-----+      +-----+
         |            |            |
         +------------+------------+
                      |
+-------------------------------------------+
|                Shared Bus                 |
+-------------------------------------------+
                      |
                 +----------+
                 | Main Mem |
                 +----------+
```

A simplified state transition diagram for a single cache line under the **MSI** protocol:

```text
            PrWr / BusRdX
       +-----------------------+
       |                       |
       |                       v
+-------------+     PrWr / BusRdX     +------------+
|             |<--------------------->|            |
|  Modified   |                       |   Shared   |
|             |---------------------->|            |
+-------------+   BusRd / Flush       +------------+
       ^      \                       /      ^
       |       \                     /       |
 PrWr / BusRdX  \                   /    PrRd / BusRd
       |         \                 /         |
       |          +---------------+          |
       |                          |          |
       +--------->+-------------+<----------+
                  |             |
                  |   Invalid   |
                  |             |
                  +-------------+

Legend:
PrRd: Processor Read
PrWr: Processor Write
BusRd: Snooped Bus Read from another cache
BusRdX: Snooped Bus Read Exclusive from another cache
Flush: Write data back to memory
```

## Memory technique — remember this forever
1.  **The "Library Book" Analogy:**
    *   A memory block is a book in a library (Main Memory).
    *   `Invalid`: You don't have the book.
    *   `Shared`: You and others have checked out a "For Reading Only" copy of the book.
    *   `Exclusive` (for MESI): You're the only person who checked out the book, but it's still the clean library copy. You can read it, and if you decide to write in it, you don't need to tell the librarian.
    *   `Modified`: You've checked out the book and have written notes in it. Your copy is the only up-to-date version. If the librarian (bus transaction) asks for that book, you must provide your scribbled-in copy. If someone else wants to write in it, the librarian first makes you give back your copy and invalidates all the read-only copies.

2.  **Must Overlearn:**
    *   The invariant: **Single Writer OR Multiple Readers.**
    *   The MESI states:
        *   **M**odified: Only copy, dirty (different from memory).
        *   **E**xclusive: Only copy, clean (same as memory).
        *   **S**hared: Potentially multiple copies, clean.
        *   **I**nvalid: Not usable.

3.  **Spaced Repetition Schedule:**
    *   Review this material in: 1 day, 3 days, 7 days, 16 days, 35 days.
    *   In each review, re-draw the MSI or MESI state diagram from memory and trace a short sequence of operations.

4.  **First Principles Pathway:** If you forget the states, re-derive them. Ask: "What information do I need to maintain the Single Writer/Multiple Reader invariant?"
    *   Do I have a valid copy? (Yes/No -> `Valid`/`Invalid`)
    *   If `Valid`, does it match memory? (Yes/No -> `Clean`/`Dirty`)
    *   If `Valid`, am I the only one with a copy? (Yes/No -> `Exclusive`/`Shared`)
    Combining these questions logically produces the states: `Dirty` implies `Exclusive` and `Valid`, so we call it **Modified**. `Clean` and `Exclusive` is **Exclusive**. `Clean` and `Shared` is **Shared**. `Invalid` is **Invalid**. You have just re-derived MESI.

## Common mistakes
1.  **Confusing Coherence with Write-Back:** A write-back cache policy *creates* the condition for incoherence (a dirty value exists only in the cache), but the coherence protocol is the separate mechanism that *solves* it. A write-through cache simplifies coherence but doesn't eliminate it (you still need to handle invalidations).
2.  **Generating Unnecessary Bus Traffic:** A common error when tracing protocols is to assume every CPU action goes on the bus. A read hit in `S`, `E`, or `M` state, or a write hit in `E` or `M` state, does *not* generate bus traffic. The bus is only used for misses or for state changes that require communication (like an upgrade from `S` to `M`).
3.  **Assuming Instant Invalidation:** In a real system, when a core issues an invalidation request, it takes time for that signal to propagate and for other caches to acknowledge it. Protocols have mechanisms to handle this latency, but it's a mistake to think of the process as atomic and instantaneous across the chip.
4.  **Forgetting Cache-to-Cache Transfers:** When a cache misses on data that another cache holds in the `Modified` state, the data is often supplied *directly from the dirty cache* to the requesting cache (and possibly written to memory in parallel). Forgetting this and assuming data always comes from main memory is a frequent error.

## Self-check
1.  A system uses a write-invalidate MSI protocol. A cache line is in the `S` state in caches P1, P2, and P3. What bus transaction(s) occur when P2 executes a write to this line? What are the final states of the line in all three caches?
2.  Now consider a MESI protocol. A variable `X` is private to a single thread running on P1 (i.e., no other processor will ever access it). Describe the sequence of states the cache line for `X` will go through in P1's cache for a read followed by a write. What is the key performance advantage MESI provides here compared to MSI?
3.  Imagine designing a coherence protocol for a 1024-core supercomputer. Why would a snooping-based protocol like MESI be a catastrophic design choice? What fundamental feature of a directory-based protocol solves this primary scaling issue?