## 1. The one-sentence answer
**A union in C is a composite type in which every member occupies the exact same starting memory address, so only one member can hold a meaningful value at any instant.**

Iska matlab yeh hai ki compiler ek hi block of bytes allocate karta hai, aur us block ka size sabse bade member ke hisaab se decide hota hai. Jab aap ek member mein value daalte ho, baaki sab members ka data corrupt ho jaata hai kyunki wohi bytes ab nayi interpretation ke hisaab se padhe jaate hain. Isliye union tab useful hota hai jab aapko ek hi jagah par multiple possible representations rakhni hon, lekin ek time par sirf ek hi active ho.

Aap isko ek shared drawer ki tarah soch sakte ho jisme sirf ek cheez fit hoti hai; agar aap doosri cheez daalte ho to pehli wali apne aap hat jaati hai.

> [!NOTE]
> The single most important “aha” is that the address of every member is identical: `&u.member1 == &u.member2`. This single fact produces both the memory saving and all the aliasing dangers.

## 2. Why this matters — concrete and current
In the Linux kernel, the `union` inside `struct page` lets the same 64-byte structure represent either a page-table entry, a slab object, or a swap-cache entry without wasting memory on millions of pages.

In IEEE 754 floating-point libraries (used by glibc and musl), a union of `uint64_t` and `double` lets developers inspect or manipulate the sign, exponent and mantissa bits directly while still treating the value as a normal `double`.

Inside the QEMU emulator, the x86 floating-point unit state is stored in a union of `long double`, `uint128_t` and a raw byte array so that the same memory region can be interpreted as an 80-bit extended-precision number or as raw micro-architectural state during migration.

In network packet processing (DPDK), a union overlays an Ethernet header, an IPv4 header and a TCP header on the same buffer so that a single 2 kB mbuf can be examined at any layer without copying.

In the TinyCC compiler’s own source, the `CType` structure uses a union to hold either an integer size or a pointer to a struct definition, keeping the symbol table compact.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| `sizeof` operator    | Determines the size of the union at compile time          |
| Pointer aliasing     | Explains why writing one member and reading another is legal but dangerous |
| Memory layout of struct | Contrasts with union so the overlapping behaviour stands out |
| Type punning rules (C99 6.5/7) | Defines when the compiler must preserve or may break the reinterpretation |

Agar aap upar ke teen concepts mein se kisi ek ko nahi jaante, to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Same address for every member
Plain Hinglish claim: Union ke andar jitne bhi members hain, un sabka address ek hi hota hai.

Concrete example:
```c
union U { int i; char c; };
union U u;
printf("%p %p\n", &u.i, &u.c);   // prints identical addresses
```
Formal statement:
$$
\&u.m_1 = \&u.m_2 = \dots = \&u
$$
> [!WARNING]
> Agar aap sochte ho ki har member ka apna alag address hoga, to aap struct aur union ko confuse kar rahe ho aur baad mein segmentation faults ya wrong values paoge.

### Step 2 — Size equals largest member (plus padding)
Plain Hinglish claim: `sizeof(union)` sirf sabse bade member ke size ke barabar hota hai.

Formal statement:
$$
\texttt{sizeof(union }T\texttt{)} = \max_i(\texttt{sizeof}(m_i)) + \text{padding to satisfy alignment}
$$

### Step 3 — Only one member is active
Plain Hinglish claim: Ek time par ek hi member ki value valid maani jaati hai; baaki members ke through read karna type-punning ke rules ke andar aata hai.

### Step 4 — Writing one member invalidates others
Plain Hinglish claim: Agar aap `u.i = 0x12345678` karte ho, to `u.c` ab 0x78 (little-endian) dega.

### Step 5 — Textbook-grade definition
A union type describes an object that may contain one of several members, all of whose storage overlaps. At most one member may have its value stored at any time.

## 5. Worked examples — har step show karo

**Example 1 — Minimal union size**
- *Given:* `union { char a; int b; } u;`
- *Find:* `sizeof(u)`
- Step 1: largest member is `int` (4 bytes on 32/64-bit).
- Step 2: no extra padding needed because `char` fits inside `int` alignment.
- *Why:* compiler only allocates one `int`-sized block.
**Final answer**
4

*Reflection:* Yeh example isliye simple hai kyunki size rule seedha apply hota hai.

**Example 2 — Reading the wrong member**
```c
union U { uint32_t word; uint8_t bytes[4]; } u;
u.word = 0x11223344;
printf("%x\n", u.bytes[0]);
```
- Step 1: write 4 bytes into `word`.
- Step 2: read first byte via `bytes[0]`.
- *Why:* same address, little-endian machine → 0x44.
**Final answer**
44

*Reflection:* Demonstrates that the same storage is reinterpreted.

**Example 3 — Type punning with float**
- *Given:* `union { float f; uint32_t i; } u; u.f = -2.5f;`
- *Find:* value of `u.i`
- Step 1: IEEE 754 single-precision of −2.5 is 0xC0200000.
- Step 2: because both members start at offset 0, `u.i` yields exactly those bits.
**Final answer**
0xC0200000

*Reflection:* Common trick for fast absolute-value or sign manipulation.

**Example 4 — Nested union inside struct**
```c
struct Packet {
    uint32_t len;
    union { uint32_t ipv4; uint8_t mac[6]; } addr;
};
```
- *Given:* `sizeof(struct Packet)`
- Step 1: `len` takes 4 bytes.
- Step 2: union takes 6 bytes (largest member).
- Step 3: total 4 + 6 = 10, padded to 12 for alignment.
**Final answer**
12

*Reflection:* Shows how unions are usually embedded inside larger structures.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Reading an inactive member        | Programmer forgets only one member is live  | Always keep an explicit tag field beside the union |
| Assuming union size is sum of members | Confusion with struct                       | Remember `sizeof` equals the largest member only |
| Writing through one member, reading through another across compiler boundaries | Strict-aliasing optimisations               | Use `memcpy` or a union that is explicitly allowed by C99 6.5/7 |
| Forgetting alignment padding      | Larger member forces bigger alignment       | Print `sizeof` after definition              |
| Initialising multiple members in one go | Aggregate initialiser syntax is misleading  | Initialise only the first member or use designated initialisers for one member |
| Using union for polymorphism without tag | Leads to silent data corruption             | Always pair union with an enum tag           |

## 7. The textbook-precise statement
From Harbison & Steele, *C: A Reference Manual*, 5e, §5.8:

“A union is an object that may hold any one of several members. Storage for all members overlaps, beginning at the same address. The size of the union is the size of its largest member, rounded up to satisfy the alignment requirement of that member. A value may be stored in any member; if a value is stored in one member and read from another, the behaviour is defined only when the read is performed through an lvalue whose type is a union type that includes both members, or through a character type.”

## 8. Visual — diagram or schematic
```text
Address: 0x1000  0x1001  0x1002  0x1003
         +------+------+------+------+
union U  | byte | byte | byte | byte |   ← 4 bytes total
         +------+------+------+------+
int  i   |<----------- i ----------->|
char c   | c    | (unused)           |
float f  |<----------- f ----------->|
```
Har member ka starting address 0x1000 hai; sirf length alag hai.

## 9. The memory technique

1. **The hook** — Picture a single hotel room that different guests (members) take turns occupying; only one guest’s luggage is in the room at a time.
2. **What to overlearn** — `sizeof(union) == sizeof(largest member)` and “all addresses are identical”.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Agar rule bhool jaaye to sirf yeh yaad rakho: compiler ek hi starting address deta hai aur utna memory block deta hai jitna sabse bade member ko chahiye.

## 10. What this unlocks
Unions are the foundation for safe type punning, tagged-variant data structures, and many kernel-level optimisations.

- Implementing variant types in interpreters
- Writing endian-conversion macros without extra temporaries
- Building compact AST nodes in compilers
- Creating fast bit-field extractors for graphics and DSP code

## 11. Self-check — five questions, no answers
1. `union { int a; char b[8]; }` ka `sizeof` kya hoga 64-bit Linux par?
2. Agar aap ek 4-byte integer likho aur usi union se 1-byte char padho, to kaunsa byte aayega little-endian machine par?
3. Kyun hota hai ki ek union ko initialise karte waqt multiple members ko value nahi de sakte?
4. Ek struct aur ek union mein kya farak hai jab dono ke members ka total size same ho?
5. Agar compiler strict-aliasing warnings de raha hai jab aap union ke through type pun kar rahe ho, to sahi solution kya hai?