## 1. The one-sentence answer
**Pointer arithmetic in C scales every integer addition to a pointer by the size of the pointed-to type.**

Memory is a linear sequence of bytes. A pointer stores an address within that sequence, yet the language associates a type with every pointer so that the compiler knows how many bytes constitute one logical element. Adding the integer \(k\) therefore advances the address by exactly \(k \times \texttt{sizeof}(T)\) bytes, not by \(k\) bytes. The result is a new address that still satisfies the original pointer’s type.

This rule is the sole mechanism that lets an expression such as `p + 3` move three elements forward rather than three bytes. Because the scaling is performed at compile time from static type information, the generated machine code contains the concrete byte offset with no runtime size lookup.

> [!NOTE]
> The scaling is not an optional convenience; it is required for type safety. Changing the type of the pointer changes the numeric result of the identical source-level addition.

## 2. Why this matters — concrete and current
In the Linux kernel’s slab allocator, pointer arithmetic on `struct kmem_cache *` objects advances through arrays of cache descriptors without explicit byte offsets; the same pattern appears in every architecture-specific page-table walker.

NASA’s cFS flight software stores telemetry packets in contiguous buffers; arithmetic on `CFE_SB_Msg_t *` pointers traverses variable-length messages while preserving alignment constraints that would be violated by raw byte addition.

In the TensorFlow Lite Micro runtime, the arena allocator performs `int8_t *` arithmetic to carve scratch buffers for quantized operators; the scaling guarantees that each tensor’s starting address respects the element size declared in the model schema.

Semiconductor verification suites written in C (for example, those used at TSMC for memory-compiler regression) walk large arrays of `struct cell_desc` records; the arithmetic guarantees stride correctness across 7 nm and 5 nm process nodes where a one-byte error produces illegal layout.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Addressable memory model | Pointers contain numeric addresses; addition is ordinary integer arithmetic performed on those addresses |
| `sizeof` operator        | Supplies the concrete byte width that the compiler multiplies into every pointer offset |
| C type system            | The declared type of the pointer determines which `sizeof` value is used |
| Array-to-pointer decay   | The most common source of pointers that later participate in arithmetic |

## 4. Building the idea — from intuition to formalism

### Step 1 — Pointers store addresses, not objects
A pointer variable holds a memory address. The address itself is an integer, but the pointer’s declared type tells the compiler what logical object lives at that address.

Example: `int *p = (int *)0x1000;` stores the address 0x1000.

Formal statement: if `p` has type `T *`, then the value of `p` is an address \(a\) such that the byte range \([a, a + \texttt{sizeof}(T) - 1]\) is interpreted as an object of type \(T\).

> [!WARNING]
> Treating the numeric value of a pointer as independent of its type leads to incorrect scaling later.

### Step 2 — Memory is byte-addressable
Every addressable unit is one byte. Consecutive objects of type \(T\) therefore occupy addresses separated by exactly \(\texttt{sizeof}(T)\) bytes.

### Step 3 — Addition on pointers is scaled addition
When an integer \(k\) is added to a pointer `p` of type `T *`, the compiler emits the address \(a + k \times \texttt{sizeof}(T)\).

Formal statement:
\[
p + k \quad \equiv \quad (\texttt{T} *) \bigl( (\texttt{uintptr_t})p + k \times \texttt{sizeof}(T) \bigr)
\]

> [!WARNING]
> Omitting the multiplication produces an off-by-factor-of-`sizeof(T)` error that is invisible until the program dereferences the wrong element.

### Step 4 — The result retains the original pointer type
The expression `p + k` has type `T *`. Subsequent arithmetic continues to scale by the same factor.

### Step 5 — The rule is symmetric for subtraction
`p - k` yields the address \(a - k \times \texttt{sizeof}(T)\). The distance between two pointers of identical type, `q - p`, yields the integer number of elements, not bytes.

### Step 6 — Textbook statement
Kernighan & Ritchie, *The C Programming Language*, 2e, §5.4: “When an integer is added to or subtracted from a pointer, the integer is scaled by the size of the object pointed to.”

## 5. Worked examples — every step shown

**Example 1 — Single-element advance**
- *Given:* `short *p = (short *)0x2000;`
- *Find:* value of `p + 1`

Step 1: `sizeof(short)` is 2.  
*Why:* The compiler knows the element width from the pointer type.

Step 2: \(0x2000 + 1 \times 2 = 0x2002\).  
*Why:* Scaling rule applied directly.

**0x2002**

*Reflection:* The numeric result is not 0x2001; forgetting the size produces an unaligned address.

**Example 2 — Advancing across a three-element stride**
- *Given:* `double *q = (double *)0x100;`
- *Find:* `q + 3`

Step 1: `sizeof(double)` = 8.  
*Why:* Required for scaling.

Step 2: \(0x100 + 3 \times 8 = 0x118\).  
*Why:* Multiplication performed at compile time.

**0x118**

*Reflection:* The same source expression yields different numeric offsets for different types.

**Example 3 — Mixed pointer and integer expression**
- *Given:* `int32_t *r = (int32_t *)0x4000; int k = 5;`
- *Find:* `r + (k - 2)`

Step 1: Evaluate `k - 2` → 3.  
*Why:* Ordinary integer arithmetic first.

Step 2: Scale 3 by `sizeof(int32_t)` = 4 → offset 12.  
*Why:* Scaling occurs after the integer sub-expression.

Step 3: \(0x4000 + 12 = 0x400C\).  
*Why:* Final address computation.

**0x400C**

*Reflection:* Parentheses control when scaling is applied.

**Example 4 — Pointer difference**
- *Given:* `char *s = (char *)0x6000; int *t = (int *)0x6010;`
- *Find:* `t - (int *)s` (after appropriate cast)

Step 1: Cast `s` to `int *` → address 0x6000 interpreted as `int *`.  
*Why:* Operands must share identical pointer type.

Step 2: \((0x6010 - 0x6000) / 4 = 4\).  
*Why:* Difference is scaled back to element count.

**4**

*Reflection:* The result is an integer, not a pointer; the division by size is implicit in the language rule.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                              |
|-----------------------------------|-----------------------------------------------------|----------------------------------------------|
| Adding bytes instead of elements  | Programmer thinks in raw addresses                  | Always add logical counts; let the compiler scale |
| Using `void *` in arithmetic      | `void` has no size, so scaling is undefined         | Cast to concrete type before arithmetic      |
| Mixing signed and unsigned offsets| Integer promotion rules can produce huge offsets    | Keep offsets small and of type `ptrdiff_t`   |
| Assuming `sizeof` is 1            | True only for `char`; false for everything else     | Explicitly verify with `sizeof` in debug code|
| Pointer difference across arrays  | Undefined behaviour when pointers do not point inside the same array | Restrict subtraction to intra-array cases    |
| Forgetting post-increment scaling | `p++` still scales; the increment is not “+= 1 byte”| Read the expression as “advance one element” |
| Alignment after manual byte math  | Hand-written byte offsets ignore type alignment     | Never compute addresses by hand; use typed pointers |

## 7. The textbook-precise statement
When an expression that has integer type is added to or subtracted from a pointer, the result has the type of the pointer operand. If the pointer operand points to an element of an array object, and the array is large enough, the result points to an element offset from the original element by the integer value; otherwise the behaviour is undefined. The integer is scaled by the size of the pointed-to type. (ISO/IEC 9899:2018, §6.5.6/8; see also K&R 2e §5.4.)

## 8. Visual — diagram or schematic
```text
Address: 0x1000   0x1004   0x1008   0x100C   0x1010
Type:    int      int      int      int      int
         [   42 ] [   17 ] [  -9 ] [  100 ] [    0 ]
Pointer: p
         p+1
                  p+2
                           p+3
                                    p+4
```
Each step of `p + k` lands exactly on the start of the next four-byte `int`; the diagram shows why the numeric stride equals 4, not 1.

## 9. The memory technique
1. **The hook** — Picture a pointer as the nose of a train whose cars are each `sizeof(T)` bytes long; adding \(k\) tells the train to move forward \(k\) cars, not \(k\) metres.
2. **What to overlearn** — The identity \(p + k \equiv (\texttt{T}*)((\texttt{char}*)p + k \times \texttt{sizeof}(T))\) and the fact that `sizeof(char)` is defined to be 1.
3. **Spaced-repetition schedule** — Review the scaling identity after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing the address calculation in bytes: start from the definition of an address, multiply the element count by the compile-time constant `sizeof(T)`, then cast back to the pointer type.

## 10. What this unlocks
Pointer arithmetic is the foundation for every idiomatic C container traversal, dynamic data structure, and memory-mapped I/O loop. It directly enables:
- Array subscript notation (`a[i]` desugars to `*(a + i)`)
- Standard-library algorithms (`memcpy`, `qsort`, `bsearch`)
- Custom allocators and ring buffers
- Iterator abstractions in later systems languages that compile to the same scaled arithmetic

## 11. Self-check — five questions, no answers
1. Given `uint64_t *p = (uint64_t *)0x8000;`, what is the numeric value of `p + 4` on a platform where `sizeof(uint64_t)` is 8?
2. Explain why `void *q; q + 1;` is a compile-time error.
3. Two pointers of type `float *` are subtracted; the result is 7. How many bytes lie between the two addresses?
4. A programmer writes `p += sizeof(int);` where `p` has type `int *`. What unintended stride results?
5. Construct a minimal example in which pointer arithmetic across array bounds yields undefined behaviour yet still produces a seemingly plausible numeric address.