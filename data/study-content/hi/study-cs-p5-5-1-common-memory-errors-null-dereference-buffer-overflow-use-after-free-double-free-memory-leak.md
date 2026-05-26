## 1. The one-sentence answer
**Common memory errors in C arise when pointers or allocated blocks are misused, breaking the contract between allocation, access, and deallocation.**

In C aap pointers ke through direct memory access karte ho, lekin agar pointer NULL ho aur aap usko dereference kar do to program crash ho jaata hai. Buffer overflow tab hota hai jab aap allocated space se zyada data likh dete ho, jo adjacent memory ko corrupt kar deta hai. Use-after-free aur double free tab hote hain jab freed block ko dubara access ya free karne ki koshish ki jaati hai, jabki memory leak tab hota hai jab allocated memory ko free nahi kiya jaata aur program ka heap grow karta rehta hai.

Yeh errors runtime par hi pakde jaate hain kyunki C compiler static analysis se in sab ko nahi pakad paata. Ek baar yeh samajh aa jaaye ki har allocation ka ek exact owner aur lifetime hota hai, to aap systematically in galtiyon se bach sakte ho.

> [!NOTE]
> Sabse badi aha yeh hai ki C mein memory ka poora control aapke haath mein hai, isliye har malloc/free pair ko mentally track karna padta hai jaise ek balance sheet maintain kar rahe ho.

## 2. Why this matters — concrete and current
NASA’s Mars rover flight software historically used strict static analysis plus runtime checks precisely to eliminate null dereference and use-after-free bugs that could corrupt command buffers during critical entry-descent-landing sequences.

In modern ML training frameworks such as PyTorch’s C++ backend, buffer overflows in custom CUDA kernels have caused silent data corruption in large tensor allocations, leading to incorrect gradient updates that only surface after hours of training.

Semiconductor companies like Intel use AddressSanitizer and similar tools on their firmware codebases because a single double-free in the memory management unit initialization can brick an entire CPU package during manufacturing test.

OpenSSL’s Heartbleed vulnerability (CVE-2014-0160) was a classic buffer over-read that leaked private keys; the root cause was missing bounds checking on a memcpy after a malloc, exactly the class of error this lesson covers.

Linux kernel’s slab allocator developers routinely audit for memory leaks in driver code because a leak in a hot path such as network packet processing can exhaust the system’s ZONE_NORMAL within minutes under sustained load.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Pointers and addresses | Every error revolves around what a pointer value actually points to. |
| malloc / free semantics | You must know that malloc returns either a valid block or NULL and that free expects a previously allocated pointer. |
| Array decay to pointer | Buffer overflows often occur because arrays lose their size information when passed to functions. |
| Undefined behaviour   | These errors do not produce compile-time diagnostics; they produce runtime UB whose symptoms can be arbitrary. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Memory as a linear resource
C treats the heap as a contiguous address space that you request in chunks. Aap mentally sochte ho “mujhe 100 bytes chahiye” aur malloc aapko ek starting address deta hai. Agar aap us address ko galat use karte ho to baaki chunks corrupt ho jaate hain.

Example: `int *p = malloc(4);` aapko 4-byte block ka address deta hai.  
Formal statement: Let \( M \) be the set of currently allocated blocks; \( \text{malloc}(s) \) returns \( a \notin \bigcup M \) such that \( |[a,a+s)| = s \).  
> [!WARNING] Agar aap sochte ho ki malloc hamesha succeed hoga, to embedded ya low-memory environments mein program silently NULL return dekar crash kar jaayega.

### Step 2 — Null dereference
Jab malloc fail ho jaata hai aur aap check nahi karte, pointer NULL rehta hai. NULL address par read/write karna forbidden hai.

Example: `int *p = malloc(SIZE_MAX); if (!p) …` ke bina `*p = 42;` likhna.  
Formal: \( p = \text{NULL} \implies \text{access}(p) \) is undefined.  
> [!WARNING] Compiler is line ko optimize kar sakta hai aur aapko kabhi crash bhi nahi dikhega, sirf silent wrong results milenge.

### Step 3 — Buffer overflow
Allocated size se zyada bytes likhna adjacent block ko overwrite karta hai. Yeh tab hota hai jab aap array index ya memcpy length galat calculate karte ho.

Example: `char buf[8]; strcpy(buf, "too long string");`.  
Formal: Write at address \( a + o \) where \( o \ge s \) for block of size \( s \).  
> [!WARNING] Overflow aksar stack ya heap metadata corrupt karta hai, jo next malloc/free call par segfault ban jaata hai aur debugging mushkil ho jaati hai.

### Step 4 — Use-after-free
Jab aap ek block free kar dete ho lekin uska pointer abhi bhi use karte ho, to woh memory doosre allocation ko mil sakti hai.

Example: `free(p); *p = 5;`.  
Formal: After \( \text{free}(p) \), \( p \) is no longer an element of \( M \).  
> [!WARNING] Kabhi-kabhi program theek chal jaata hai kyunki memory turant reuse nahi hoti, lekin production load mein yeh nondeterministic crash deta hai.

### Step 5 — Double free
Ek hi pointer ko do baar free karna allocator ke internal data structures ko corrupt karta hai.

Example: `free(p); free(p);`.  
Formal: \( p \) must be removed from \( M \) exactly once.  
> [!WARNING] Double free often manifests as a later malloc returning the same pointer twice, causing two different variables to alias and overwrite each other.

### Step 6 — Memory leak
Allocated block ko free nahi kiya jaata aur uska pointer kho jaata hai. Heap size badhta rehta hai jabki program ko us data ki zaroorat nahi.

Example: `p = malloc(100); p = malloc(200);` bina pehle free kiye.  
Formal: \( \exists a \in M \) such that no live pointer reaches \( a \).  
> [!WARNING] Long-running daemons (web servers, databases) leak detection ke bina hours mein OOM killer se maar diye jaate hain.

### Step 7 — Unified ownership rule
Har allocated block ka exactly ek owner hota hai jo usko free karta hai. Pointer copy karne se ownership transfer nahi hota jabtak explicit documentation ho.

Formal: Ownership is a total function \( \text{owner}: M \to \text{threads} \) that must be respected at every free.

## 5. Worked examples — har step show karo

**Example 1 — Simple null dereference**
- *Given:* `int *p = malloc(0);`
- *Find:* safe way to store value 42.
- Step 1: Check return value.  
  *Why*: malloc(0) may return NULL on some implementations.  
- Step 2: `if (p) *p = 42;`  
  *Why*: guards against dereference.  
**Final answer**  
`if (p) *p = 42; else handle_oom();`

*Reflection*: Zero-size allocation is a common hidden source of NULL; always treat malloc result as possibly NULL.

**Example 2 — Buffer overflow via strcpy**
- *Given:* `char buf[8];`
- *Find:* store “hello” safely.
- Step 1: Use bounded copy.  
  *Why*: strcpy ignores destination size.  
- Step 2: `strncpy(buf, "hello", 7); buf[7] = '\0';`  
  *Why*: guarantees null termination and no overflow.  
**Final answer**  
`strncpy(buf, "hello", 7); buf[7] = '\0';`

*Reflection*: Legacy string functions are the fastest route to overflow; bounded versions force explicit size reasoning.

**Example 3 — Use-after-free**
- *Given:* `int *p = malloc(sizeof(int)); free(p);`
- *Find:* detect invalid access.
- Step 1: Set pointer to NULL after free.  
  *Why*: makes subsequent dereference an obvious crash.  
- Step 2: `*p = 1;` becomes `*NULL = 1`.  
  *Why*: immediate segfault instead of silent corruption.  
**Final answer**  
`free(p); p = NULL;`

*Reflection*: NULLing after free turns a latent bug into an immediate, easy-to-find fault.

**Example 4 — Double free leading to allocator corruption**
- *Given:* `int *p = malloc(4); free(p);`
- *Find:* safe second free attempt.
- Step 1: Check pointer before free.  
  *Why*: once freed, pointer should be considered invalid.  
- Step 2: Use `if (p) { free(p); p = NULL; }` pattern.  
  *Why*: second free is now a no-op.  
**Final answer**  
`if (p) { free(p); p = NULL; }`

*Reflection*: The pattern also prevents use-after-free because the pointer is cleared.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Ignoring malloc return value | Assumption that allocation always succeeds | Always wrap malloc with NULL check           |
| Using strlen on unterminated buffer | strcpy overflow left no null byte           | Use strncpy + explicit null termination      |
| Freeing a stack pointer     | Confusion between malloc and local arrays   | Never free anything not returned by malloc   |
| Freeing the same pointer twice in different branches | Complex control flow hides second free     | Adopt ownership discipline or use smart pointers in C++ |
| Losing the only pointer to an allocation | Overwriting pointer variable before free   | Keep a backup pointer or use reference counting |
| Passing freed pointer to memcpy | Re-use of dangling pointer variable        | NULL after free and never pass dangling pointers |
| Assuming realloc never moves memory | realloc may return new address              | Always assign realloc result back to pointer |

## 7. The textbook-precise statement
Kernighan and Ritchie, The C Programming Language, 2e, §7.8.2 states: “A pointer to a block of memory obtained from malloc may be used only while that block remains allocated; once the block has been freed, the pointer must not be used again. Any use of a pointer after the corresponding storage has been deallocated results in undefined behaviour.”

## 8. Visual — diagram or schematic
```
Heap layout (addresses increase rightward)
[ 0x1000 ] [ 0x1010 ] [ 0x1020 ] [ 0x1030 ]
   Block A   Block B   Block C   (free)
     |         ^
     |         |
   valid     dangling (use-after-free)
     |
   overflow here corrupts B
```

## 9. The memory technique

**The hook**  
Imagine every malloc as handing you a balloon; free is popping it. You cannot touch a popped balloon and you cannot pop it twice.

**What to overlearn**  
1. `p = malloc(s); if (!p) handle_error;`  
2. After every free: `p = NULL;`  
3. Never compute pointer arithmetic beyond allocated size.

**Spaced-repetition schedule**  
Review the three rules above after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback**  
If you forget a rule, ask: “Who currently owns this block and has it been freed yet?” Trace the single owner forward from the malloc call.

## 10. What this unlocks
Mastering these errors lets you write production-grade systems code and use tools such as AddressSanitizer, Valgrind, and static analyzers effectively.  

- You can now safely implement custom allocators and data structures (linked lists, hash tables).  
- You become ready for concurrency topics where use-after-free becomes data races.  
- You can audit third-party libraries for memory safety before integrating them.  
- You gain the foundation for modern safe systems languages that encode ownership in the type system.

## 11. Self-check — five questions, no answers
1. What single line change turns a latent use-after-free into an immediate crash?  
2. Given `char buf[10];` and a 20-byte source string, which standard function guarantees no overflow and why?  
3. In a loop that repeatedly does `p = malloc(1024);` without free, which error will appear first on a long-running server and after roughly how many iterations on a 4 GB machine?  
4. Why does a double-free sometimes cause the next malloc to return the same pointer twice?  
5. A function receives a pointer allocated by the caller. Which ownership discipline prevents both leak and double-free inside that function?