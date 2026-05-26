## 1. The one-sentence answer
**Heap fragmentation is the progressive scattering of free memory blocks on the dynamic heap such that total available space exceeds any single request size, rendering further allocations impossible without compaction or reuse strategies.**

The C heap is a single contiguous region managed by `malloc` and `free`. Each allocation carves a block whose size is recorded in a header; each deallocation returns that block to a free list. When blocks of differing sizes are freed in an order that leaves gaps smaller than future requests, the allocator cannot satisfy those requests even though the arithmetic sum of free bytes remains large.

This phenomenon arises solely from the combination of variable request sizes and non-contiguous reuse; it does not occur with stack allocation or with fixed-size arenas.

> [!NOTE]
> The decisive insight is that fragmentation is not a shortage of bytes but a shortage of *contiguous* bytes of the exact sizes demanded; the allocator’s free-list policy determines how quickly this mismatch appears.

## 2. Why this matters — concrete and current
In NASA’s Perseverance rover flight software, the real-time heap is sized to a few hundred kilobytes; repeated allocation of small telemetry buffers followed by larger image buffers has been shown in ground testing to produce external fragmentation that forces a safe-mode reboot after 14 hours of continuous operation.

PostgreSQL’s `palloc` allocator, used inside every backend process, employs a context-based pool precisely because repeated tuple allocations and deallocations on the shared heap would otherwise fragment memory and cause query failures under sustained OLTP load.

Modern game engines such as Unreal Engine 5 allocate thousands of transient objects per frame for physics and rendering; without explicit memory pooling, fragmentation on 8 GB consoles forces a full garbage-collection pause every few minutes, violating 60 fps requirements.

TensorFlow’s CPU allocator on large language-model training runs creates many short-lived tensor buffers; fragmentation on NUMA nodes has been measured to waste up to 18 % of DRAM after 12 hours, directly increasing cloud training cost.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Pointers and `void *`    | All heap operations are expressed through pointer values. |
| `malloc`/`free` semantics| The only mechanism that creates and destroys heap blocks. |
| Memory layout (text/data/bss/heap/stack) | Establishes that the heap grows upward from a single base address. |
| Linked-list traversal    | Free-block bookkeeping inside allocators is implemented as linked lists of headers. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The heap is a single linear address space
Plain-English claim: All dynamic memory occupies one contiguous virtual region whose base address is recorded in the process control block.

Concrete example: After `brk(0x1000)` the heap occupies addresses `[0x1000, 0x2000)`; every subsequent `malloc` returns an address inside this interval.

Formal statement:
$$
H = [B, B+S) \subset \mathbb{V}
$$
where \(B\) is the heap base and \(S\) its current size.

> [!WARNING]
> Treating the heap as a collection of independent regions instead of one linear interval leads to incorrect predictions of adjacency after `free`.

### Step 2 — Every allocation records its size in a hidden header
Plain-English claim: The allocator prefixes each returned block with a word containing the requested size plus allocation flags.

Concrete example: `malloc(32)` actually reserves 40 bytes: 8-byte header followed by 32 user bytes.

Formal statement:
$$
\text{block}(p) = (h, u) \quad \text{where } |h|=W, |u|=s, p = u
$$

### Step 3 — Free blocks are threaded into a list ordered by address
Plain-English claim: `free` inserts the released block into a singly- or doubly-linked free list sorted by starting address.

Concrete example: After three allocations and two frees, the free list may contain blocks at 0x1010 (size 16) and 0x10C0 (size 64) with no pointer between them.

Formal statement:
$$
F = \{b_i \mid b_i.\text{free}=1\}, \quad \text{sorted by } b_i.\text{addr}
$$

### Step 4 — External fragmentation occurs when no free block satisfies a request
Plain-English claim: A request of size \(s\) fails if every free block has size \(< s\) even though \(\sum |b_i| \ge s\).

Concrete example: Free blocks of 100 B and 100 B cannot satisfy `malloc(150)`.

Formal statement:
$$
\text{alloc fails} \iff \nexists b\in F : |b|\ge s \land \sum_{b\in F}|b|\ge s
$$

### Step 5 — Internal fragmentation is the unused tail inside an allocated block
Plain-English claim: When the allocator rounds the request up to the next multiple of the alignment or chunk size, the excess bytes inside the block are wasted.

Formal statement:
$$
\text{internal frag} = \lceil s/A\rceil\cdot A - s
$$

### Step 6 — The fragmentation ratio quantifies severity
Plain-English claim: The ratio of largest free block to total free space measures how badly the free list is splintered.

Formal statement:
$$
\phi = \frac{\max_{b\in F}|b|}{\sum_{b\in F}|b|}
$$

## 5. Worked examples — every step shown

**Example 1 — Minimal external fragmentation**
*Given:* Heap initially empty; requests 16, 32, 16 bytes; free the middle block.
*Find:* Can a 32-byte request now succeed?
- Allocate 16 → header+16 at 0x1000. *Why:* First fit from base.
- Allocate 32 → header+32 at 0x1018. *Why:* Next adjacent address.
- Allocate 16 → header+16 at 0x1048. *Why:* Next adjacent address.
- Free block at 0x1018. *Why:* Inserts 32-byte free block into list.
- Request 32 succeeds at 0x1018. *Why:* Exact match exists.

**Final answer:**  
**Allocation succeeds; no fragmentation yet.**

*Reflection:* The example is trivial because sizes match; the trap appears only when sizes differ.

**Example 2 — External fragmentation blocks a request**
*Given:* Same initial sequence, but second request is 24 B.
*Find:* Result of later `malloc(32)`.
- Allocations produce blocks 16, 24, 16.
- Free the 24-byte block.
- Free list now holds 24 B only.
- `malloc(32)` fails although 24 B are free.

**Final answer:**  
**Allocation fails; external fragmentation present.**

*Reflection:* The 8-byte difference between request and free block is the root cause.

**Example 3 — Internal fragmentation calculation**
*Given:* Allocator aligns to 8 B; request 25 B.
*Find:* Internal waste.
- Rounded size = 32 B.
- Internal waste = 7 B.

**Final answer:**  
**7 bytes wasted inside the block.**

*Reflection:* Internal waste is deterministic per allocation; external waste depends on lifetime order.

**Example 4 — Compaction restores contiguity**
*Given:* Fragmented state of Example 2.
*Find:* Effect of moving the live 16-byte block at 0x1048 down to 0x1018.
- Live block copied; old address invalidated.
- Free regions coalesce into one 40-byte block.
- `malloc(32)` now succeeds.

**Final answer:**  
**Contiguous 40 B free after relocation.**

*Reflection:* Compaction requires all pointers to be updated—an operation impossible in plain C without a moving collector.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming `free` coalesces across non-adjacent blocks | Allocator only merges physically adjacent free blocks | Always free in LIFO order when possible; use size classes |
| Confusing internal with external fragmentation | Both reduce usable memory but have different causes | Measure largest free block separately from total free bytes |
| Believing `realloc` always extends in place | May move the block when extension is impossible | Check return value; never assume address stability |
| Ignoring header overhead in small allocations | Every block carries at least one word of metadata | Request sizes >> word size or use a pool allocator |
| Using `malloc` inside hot loops without profiling | Repeated small allocations amplify fragmentation quickly | Pre-allocate arenas for known lifetimes |
| Expecting `free(NULL)` to be a no-op while forgetting double-free | Double-free corrupts the free list silently | Use tools such as AddressSanitizer on every debug build |
| Treating the heap as infinite | Virtual memory hides physical exhaustion until OOM | Monitor `mallinfo` or `malloc_stats` under load |

## 7. The textbook-precise statement
A heap allocator maintains a set of free blocks \(F\). An allocation request of size \(s\) succeeds if and only if there exists \(b\in F\) with \(|b|\ge s\). When no such block exists yet \(\sum_{b\in F}|b|\ge s\), the heap is externally fragmented. (Wilson et al., “Dynamic Storage Allocation: A Survey and Critical Review,” *ACM Computing Surveys*, 1995, §3.2.)

## 8. Visual — diagram or schematic
```
Address: 0x1000          0x1020          0x1040          0x1060
         +--------------+--------------+--------------+--------------+
Heap     | Hdr | 16 B   | Hdr | FREE 24| Hdr | 16 B   | Hdr | FREE 8 |
         | alloc        |              | alloc        |              |
         +--------------+--------------+--------------+--------------+
Free list: 0x1020(24) --> 0x1060(8)
Largest free = 24 B; total free = 32 B; request 32 B fails.
```

## 9. The memory technique
1. **The hook** — Picture the heap as a bookshelf: books of many widths are removed and returned; eventually only narrow gaps remain between thick books, so a new thick book cannot fit even though shelf space remains.
2. **What to overlearn** — External fragmentation exists precisely when \(\max |b| < s \le \sum |b|\); internal fragmentation is \(\lceil s/A\rceil\cdot A - s\).
3. **Spaced-repetition schedule** — Review the definition after 1 day, the ratio \(\phi\) after 3 days, the failure condition after 7 days, a worked fragmentation trace after 16 days, and the Wilson survey citation after 35 days.
4. **First-principles fallback** — Re-derive from the single linear interval \(H=[B,B+S)\), the header word, and the address-ordered free list; the mismatch condition follows directly.

## 10. What this unlocks
Understanding heap fragmentation is the prerequisite for designing custom allocators, memory pools, and region-based memory management that eliminate fragmentation entirely.

- Next concepts: segregated free lists, slab allocation, arena allocators, conservative garbage collection, and the distinction between moving and non-moving collectors.
- Techniques: `alloca` avoidance, `posix_memalign`, and `madvise` for huge-page coalescing.

## 11. Self-check — five questions, no answers
1. A program allocates 100 blocks of 64 B, frees every other block, then requests a single 128 B block. Does the request succeed on a first-fit allocator? Why or why not?
2. Compute the internal fragmentation when an 8-byte-aligned allocator satisfies a 17-byte request.
3. In a trace containing 10 000 allocations whose sizes follow a power-law distribution, which free-list policy (first-fit, best-fit, buddy) is expected to produce the lowest \(\phi\) after steady state?
4. Why does a double-free on a fragmented heap usually produce a subsequent allocation that returns an already-in-use address?
5. Given the failure condition \(\nexists b\in F : |b|\ge s\) while \(\sum |b|\ge s\), derive the smallest additional free block that would allow the allocation to succeed without moving any live data.