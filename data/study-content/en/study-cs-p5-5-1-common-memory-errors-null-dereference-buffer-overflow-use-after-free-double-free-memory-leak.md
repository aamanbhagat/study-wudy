## 1. The one-sentence answer
**Common memory errors in C arise when programs mishandle pointers and dynamically allocated storage, violating the language’s explicit contract that the programmer alone manages every byte’s lifetime and validity.**

In C every pointer is an address that may or may not point to usable memory. The language supplies no automatic checks, no garbage collector, and no bounds validation; it simply performs the operation the programmer wrote. When that operation touches an address the hardware or the allocator has declared invalid, the program either crashes immediately or continues with corrupted state that surfaces later.

The five canonical failures—null dereference, buffer overflow, use-after-free, double free, and memory leak—cover the entire spectrum of pointer misuse. Each occurs because a single assumption about a pointer’s state is false at the moment of use.

> [!NOTE]
> The decisive insight is that C gives you raw addresses, not objects; every memory error is therefore a lie you told the machine about what an address still means.

## 2. Why this matters — concrete and current
The 2014 Heartbleed vulnerability in OpenSSL was a classic buffer over-read that leaked private keys from roughly 17 % of HTTPS servers on the Internet; the defect was a missing bounds check on a user-supplied length field passed directly to memcpy.

NASA’s Mars Pathfinder mission in 1997 suffered priority-inversion deadlocks partly triggered by heap corruption from an earlier buffer overflow in the VxWorks real-time kernel; the team traced the reset sequence to overwritten task-control blocks.

Modern web browsers such as Chrome and Firefox contain multiple use-after-free entries in their vulnerability databases each year; these defects allow sandbox escapes because freed DOM nodes are still referenced by JavaScript objects whose pointers were never cleared.

Double-free bugs in the Linux kernel’s SLUB allocator have repeatedly produced privilege-escalation exploits; the 2021 CVE-2021-34866 entry is one documented instance in which an attacker forced the allocator to hand the same page to both kernel and user space.

Long-running server processes written in C accumulate memory leaks that eventually trigger the out-of-memory killer; Cloudflare’s 2022 post-mortem on a DNS resolver showed a 40-day leak that exhausted 128 GB of RAM on edge nodes before the process was restarted.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Pointer semantics    | Every error is expressed through an address that is either invalid, out-of-bounds, or already returned to the allocator. |
| malloc / free contract | The allocator’s free list and metadata are the concrete structures that become corrupted or exhausted. |
| Array decay          | C arrays passed to functions become pointers, silently discarding size information required for bounds checking. |
| Undefined behaviour  | The C standard assigns no meaning to any of these errors, so the compiler may emit arbitrary code once they occur. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A pointer is only an integer address
A pointer variable holds a numeric address. The hardware and the operating system decide whether that address is mapped and readable or writable.

Example: `int *p = NULL;` stores the integer 0. Dereferencing it asks the MMU to translate address 0, which is almost never mapped for user data.

Formal statement:  
$$ \text{valid}(p) \iff p \in \text{current process address space} \land \text{page}(p) \text{ has appropriate permissions} $$

> [!WARNING]
> Treating the numeric value of a pointer as meaningful after the underlying page has been unmapped produces undefined behaviour even if the bits look unchanged.

### Step 2 — Buffer overflow writes past the object’s declared extent
An object allocated with a fixed size occupies a contiguous interval of addresses. Any write whose offset exceeds that interval corrupts adjacent bytes.

Example: `char buf[8]; strcpy(buf, "0123456789");` writes ten bytes into an eight-byte region.

Formal statement:  
$$ \forall i.\ 0 \le i < \text{sizeof}(obj) \implies \text{write}(obj + i) \text{ is defined} $$

> [!WARNING]
> The compiler does not emit code to test the offset; the hardware simply stores the value at the computed address, overwriting whatever lives there.

### Step 3 — Use-after-free reclaims the object while pointers still refer to it
Calling free returns the storage to the allocator’s free list. Any subsequent read or write through a stale pointer accesses memory that may already have been reused.

Example: `free(p); *p = 42;` may overwrite the allocator’s internal bookkeeping.

Formal statement:  
$$ \text{after free}(p),\ \neg\text{valid}(p) \text{ until the next allocation that reuses the block} $$

> [!WARNING]
> The bits at the old address may remain unchanged for an arbitrary period, giving the illusion that the pointer is still valid.

### Step 4 — Double free returns the same block twice
Invoking free on an already-freed pointer corrupts the allocator’s free-list metadata, usually by linking the same block into two different chains.

Example: `free(p); free(p);` produces a cycle or a merged block that later allocations will split incorrectly.

> [!WARNING]
> The allocator’s metadata lives immediately before or after user data; writing through a double-freed pointer can therefore destroy the very structures that track free blocks.

### Step 5 — Memory leak withholds blocks from future allocations
A program that loses all pointers to an allocated block can never pass that block to free. The block remains mapped until process termination, permanently reducing available heap space.

Formal statement:  
$$ \text{leak}(B) \iff B \text{ was returned by malloc} \land \nexists\ p.\ \text{reachable}(p,B) \land \text{free}(p) \text{ never executed} $$

> [!WARNING]
> In long-running daemons the cumulative effect is indistinguishable from a denial-of-service attack on the machine’s memory resource.

### Step 6 — The textbook statement of the result
Any C program that performs an operation on a pointer whose validity predicate is false at that instant exhibits undefined behaviour; the five errors above are the exhaustive enumeration of ways the predicate can become false.

## 5. Worked examples — every step shown

**Example 1 — Null dereference on input validation**
- *Given:* `char *name = lookup(username); if (name[0] == '\0') ...`
- *Find:* the first instruction that executes undefined behaviour.
- Step 1: `lookup` returns NULL when the user is unknown. *Why:* the function’s contract states “NULL on failure.”
- Step 2: The expression `name[0]` computes `*(name + 0)`. *Why:* array subscript is syntactic sugar for pointer arithmetic plus dereference.
- Step 3: The address is 0; the MMU raises an exception. *Why:* page 0 is protected.
**Final answer:**  
**Undefined behaviour at the first dereference of a NULL pointer.**
*Reflection:* The defect is invisible until the lookup fails; defensive checks must precede every possible NULL.

**Example 2 — Classic stack buffer overflow**
- *Given:* `void f(char *src) { char dst[16]; strcpy(dst, src); }` called with a 32-byte string.
- *Find:* the first byte that lies outside the object.
- Step 1: `strcpy` copies bytes until it sees `\0`. *Why:* the function has no length parameter.
- Step 2: After 16 bytes the write pointer equals `dst + 16`. *Why:* the object occupies `[dst, dst+15]`.
- Step 3: The 17th byte overwrites the saved frame pointer. *Why:* the compiler placed the return address immediately after the array.
**Final answer:**  
**Return address corrupted after 16 bytes.**
*Reflection:* The absence of size information at the call site is what makes the overflow possible.

**Example 3 — Use-after-free in a linked list**
- *Given:* `node *head = malloc(sizeof *head); ... free(head); printf("%d\n", head->val);`
- *Find:* the moment the pointer becomes invalid.
- Step 1: `free(head)` returns the block. *Why:* the allocator records it on the free list.
- Step 2: `head` still contains the old address. *Why:* C performs no automatic nullification.
- Step 3: `head->val` reads freed memory. *Why:* the predicate `valid(head)` is now false.
**Final answer:**  
**Undefined behaviour on the read through the dangling pointer.**
*Reflection:* Any pointer that has been passed to free must be considered invalid until reassigned.

**Example 4 — Double free followed by allocator corruption**
- *Given:* `free(p); free(p);` where `p` points to a 64-byte block.
- *Find:* the allocator state after the second call.
- Step 1: First free links the block into the free list. *Why:* metadata now points to the next free block.
- Step 2: Second free treats the same metadata as still valid. *Why:* the allocator does not track previous owners.
- Step 3: The free list now contains a cycle. *Why:* the same block address appears twice.
**Final answer:**  
**Subsequent malloc returns a block whose metadata is inconsistent.**
*Reflection:* Double free is detectable only by exhaustive tracing of allocator metadata.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                      | How to avoid it                                      |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| Checking pointer after free | Programmer assumes free sets the pointer to NULL    | Adopt the idiom `free(p); p = NULL;` immediately     |
| Off-by-one in strcpy        | Counting the terminating NUL is easy to forget      | Use `strncpy` or better `snprintf` with explicit size |
| Reusing pointer variable    | Same variable name reused for logically distinct allocations | Introduce a new variable for each allocation         |
| Ignoring realloc return value | realloc may move the block; old pointer becomes invalid | Always assign the return value back to the pointer   |
| Assuming stack arrays are zeroed | Automatic storage is not initialised by default     | Use `memset` or designated initialisers              |
| Freeing a pointer twice via two aliases | Two variables hold the same address                 | Maintain a single owner or use reference counts      |
| Leaking on early return     | Error path forgets to free resources acquired earlier | Use `goto` cleanup or RAII-style wrappers            |

## 7. The textbook-precise statement
Kernighan & Ritchie, *The C Programming Language*, 2nd ed., §7.8.3 states: “A pointer to a block of storage that has been deallocated by free or realloc may not be used again … Any use of such a pointer leads to undefined behaviour.” The same section enumerates the consequences of writing outside an object and of dereferencing a null pointer. The C11 standard (ISO/IEC 9899:2011) §6.5.3.2/4 and §7.22.3 formalise the same constraints using the notion of a pointer’s validity.

## 8. Visual — diagram or schematic
```text
Address space layout (heap region)
+-------------------+ 0x1000
| allocated block A |  <- still reachable
+-------------------+ 0x1040
| freed block B     |  <- free list head
| (metadata: next)  |
+-------------------+ 0x1080
| dangling pointer  |  -> still points at 0x1040
| p (use-after-free)|
+-------------------+ 0x10C0
| buffer overflow   |  <- write past 0x10C0+8
| char buf[8]       |
+-------------------+
```

## 9. The memory technique
**The hook** — Picture five padlocks on a single chain; each lock corresponds to one error. If any lock is open the chain is broken and the program falls.

**What to overlearn** — (1) `free(p); p = NULL;` after every free, (2) every allocation site must have a matching free on every exit path, (3) never compute an address outside `[base, base+size)`.

**Spaced-repetition schedule** — Review the five error definitions after 1 day, again after 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback** — Re-derive validity by asking: “Who owns this address right now, and what is its exact extent?”

## 10. What this unlocks
Mastery of these errors is the prerequisite for writing any long-lived C program that manipulates dynamic data structures. The same reasoning directly generalises to custom allocators, reference-counted objects, and safe wrappers such as `std::unique_ptr` in C++.

- Arena allocators and region-based memory management
- Valgrind and AddressSanitizer instrumentation techniques
- Secure coding standards (CERT C, MISRA C)
- Kernel and embedded-systems memory-safety patterns

## 11. Self-check — five questions, no answers
1. A function receives a pointer that may be NULL. Write the shortest test that prevents a null dereference yet still allows the intended operation when the pointer is valid.

2. An array of 100 integers is allocated with malloc. A loop writes indices 0 through 100 inclusive. Which exact write triggers undefined behaviour and why?

3. After `free(p)`, the program immediately executes `q = p; free(q);`. Explain the allocator state that results and one observable symptom.

4. A loop repeatedly allocates 1 MiB blocks but never frees them. After 2048 iterations the program is killed by the OOM killer. Name the precise resource that has been exhausted.

5. A structure contains a pointer member that is freed inside a “destroy” function. Another pointer variable elsewhere in the program still holds the same address. Construct a minimal sequence that demonstrates use-after-free without triggering an immediate crash.