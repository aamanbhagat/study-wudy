## 1. The one-sentence answer
**C primitive data types allocate contiguous blocks of memory whose widths and interpretations are fixed at compile time but whose concrete sizes are bounded only by the language standard.**

Memory in a C program is a flat sequence of addressable bytes. Each type tells the compiler how many bytes to reserve and how the bit patterns inside those bytes should be interpreted as a value. The integer family (char through long) stores whole numbers using two’s-complement or unsigned binary; the floating-point family (float and double) stores approximations of real numbers using IEEE-754 sign-exponent-mantissa encoding; size_t is an unsigned integer type chosen by the implementation to hold the largest possible object size on that platform. Because the standard only guarantees minimum ranges, the same source file can produce different memory layouts on different machines.

The decisive fact is that the programmer never sees “abstract numbers”; the programmer sees concrete storage whose width is known statically via sizeof and whose arithmetic behaviour is defined by the representation chosen for that width.

> [!NOTE]
> The single most important insight is that every C object has a compile-time-known size in bytes; once you internalise sizeof and the minimum ranges, every subsequent systems topic (pointer arithmetic, memory alignment, buffer overflows, performance tuning) follows directly.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover flight software, written in C, uses explicit 32-bit and 64-bit integer typedefs derived from the primitive types to guarantee identical telemetry packet layouts on both the RAD750 processor and the ground-test x86 machines. A single-byte mismatch would corrupt command sequences across 200 million kilometres.

Google’s TensorFlow Lite Micro runtime, deployed on microcontrollers, selects between float and double at compile time by inspecting sizeof(float) versus sizeof(double); choosing the narrower type reduces SRAM usage by 4–8 KB on Cortex-M4 devices that have only 256 KB total.

The Linux kernel’s slab allocator records object sizes in variables of type size_t; the type’s unsigned nature and platform width allow the same source to manage both 4 GB embedded buffers and 16 TB server allocations without signed overflow checks.

Semiconductor verification suites at TSMC compare millions of floating-point results produced by double versus an extended-precision software implementation; the comparison is only meaningful because the C standard guarantees that double provides at least 53 bits of mantissa on every host.

Apple’s Metal shader compiler lowers C-style vector loads to SIMD registers whose element counts are derived from the sizes of short, int, and float; a mis-sized load produces incorrect pixel values on every M-series SoC.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Binary representation of integers | Determines the numeric range of each signed or unsigned type |
| IEEE-754 floating-point layout   | Explains precision loss and the distinction between float and double |
| Addressable memory and bytes     | Underpins sizeof and the meaning of type widths           |
| The sizeof operator              | The only portable way to discover concrete sizes at compile time |

## 4. Building the idea — from intuition to formalism

### Step 1 — Memory is addressed in bytes
A C program sees RAM as a sequence of individually addressable 8-bit locations. Any object occupies one or more consecutive bytes whose starting address is aligned according to the type’s requirements.

Example: declaring `char c;` reserves exactly one byte; `int i;` reserves sizeof(int) contiguous bytes.

Formal statement:  
$$ \text{sizeof}(T) \in \mathbb{N},\quad \text{sizeof}(T) \ge 1 \text{ for every complete type } T. $$

> [!WARNING]
> Treating a multi-byte object as a single byte (e.g., by casting to char* without accounting for endianness) silently reinterprets the value on little- versus big-endian hosts.

### Step 2 — Integer types differ only in width and signedness
The types char, short, int, long (and long long) are distinguished solely by the number of bytes they occupy and whether the high bit is treated as a sign bit.

The standard supplies minimum ranges; actual widths are discovered with sizeof.

Formal statement:  
$$ \text{CHAR_BIT} \ge 8,\quad \text{SHRT_MIN} \le -32767,\quad \text{INT_MIN} \le -32767,\quad \text{LONG_MIN} \le -2147483647. $$

> [!WARNING]
> Assuming int is exactly 32 bits produces non-portable code that fails on 16-bit DSPs or 64-bit Windows where long remains 32 bits.

### Step 3 — size_t is the unsigned type that can name any byte offset
size_t is defined in <stddef.h> as the unsigned integer type returned by sizeof and used for array indexing and memory sizes. It is guaranteed to be wide enough to hold the size of any object.

Formal statement:  
$$ \forall \text{ objects } o,\quad 0 \le \text{sizeof}(o) \le \text{SIZE_MAX}. $$

> [!WARNING]
> Subtracting two size_t values can underflow; the result wraps modulo SIZE_MAX+1, producing an enormous positive number instead of a negative distance.

### Step 4 — Floating-point types approximate reals with fixed precision
float and double follow IEEE-754 (or an equivalent format). float uses 32 bits (1 sign, 8 exponent, 23 mantissa); double uses 64 bits (1+11+52).

The value is  
$$ (-1)^s \times 2^{e-b} \times (1.m) $$  
where b is the exponent bias.

> [!WARNING]
> Comparing two floats with == after arithmetic almost always fails because 0.1 cannot be represented exactly.

### Step 5 — The sizeof operator yields a size_t constant expression
sizeof is evaluated at compile time and never produces a runtime side-effect. Its result is the number of bytes in the representation of its operand.

Formal statement:  
$$ \text{sizeof}(T) \text{ is a constant expression of type } size_t. $$

> [!WARNING]
> Applying sizeof to an expression with side-effects (e.g., sizeof(i++)) discards the side-effect; the increment never occurs.

### Step 6 — All operations are defined on the concrete representation
Addition, comparison, and conversion are defined by the bit patterns that fit inside the type’s width. Overflow for signed integers is undefined behaviour; unsigned overflow wraps modulo 2^w.

## 5. Worked examples — every step shown

**Example 1 — Minimum range of short**  
*Given:* C99 standard minimums.  
*Find:* Largest magnitude negative value a signed short must be able to store.  
Step 1: The standard requires SHRT_MIN ≤ −32767.  
*Why* — This is the stated lower bound for a two’s-complement 16-bit type.  
Step 2: 32767 = 2^15 − 1, therefore the range is at least −2^15 + 1 … 2^15 − 1.  
*Why* — Two’s-complement symmetric range minus one for the sign bit.  
**−32767**

*Reflection* — The “+1” asymmetry is the first sign that two’s-complement is not perfectly symmetric.

**Example 2 — sizeof on a hypothetical 32-bit system**  
*Given:* int occupies 4 bytes, size_t is 4 bytes.  
*Find:* Value and type of sizeof(int).  
Step 1: sizeof(int) expands to the integer constant 4.  
*Why* — The compiler substitutes the concrete width.  
Step 2: The type of that constant is size_t (unsigned).  
*Why* — The standard mandates sizeof returns size_t.  
**4 (type size_t)**

*Reflection* — The result is unsigned; printing it with %d is therefore incorrect.

**Example 3 — size_t subtraction underflow**  
*Given:* size_t a = 3, b = 5 on a 32-bit system.  
*Find:* a − b.  
Step 1: 3 − 5 would be −2 mathematically.  
*Why* — Ordinary arithmetic.  
Step 2: Under modular arithmetic modulo 2^32 the result is 2^32 − 2.  
*Why* — size_t subtraction is defined as modulo 2^w.  
**4294967294**

*Reflection* — Always cast to a wider signed type before subtracting sizes if negative distances are possible.

**Example 4 — float representation of 0.1**  
*Given:* 0.1 decimal.  
*Find:* Whether 0.1f == 0.1f after round-trip.  
Step 1: 0.1 cannot be written as a finite binary fraction.  
*Why* — Denominator contains factor 5.  
Step 2: The stored mantissa is the closest 23-bit approximation.  
*Why* — IEEE-754 round-to-nearest rule.  
Step 3: Re-conversion yields a different bit pattern only if rounding error accumulated.  
*Why* — In this case the same literal produces the identical approximation.  
**true (but 0.1f + 0.2f != 0.3f)**

*Reflection* — Equality holds only because the same rounding decision was made twice.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming int is 32 bits           | Historical dominance of ILP32 and LP64 models       | Use int32_t / uint32_t from <stdint.h>               |
| Signed overflow on loop counters  | Incrementing past INT_MAX is UB                     | Prefer size_t or unsigned types for indices          |
| Using char as a small integer     | char may be signed or unsigned by default           | Explicitly write signed char or unsigned char        |
| Comparing floats with ==          | Rounding error makes exact equality improbable      | Use epsilon relative tolerance or integer cents      |
| sizeof on pointer instead of array| sizeof(ptr) yields pointer width, not array length  | Pass array length separately or use sizeof on the array object |
| size_t formatted with %d          | size_t is unsigned; %d expects signed int           | Use %zu or cast to uintmax_t and %ju                 |
| Mixing float and double in varargs| Default argument promotion turns float into double  | Use double literals or explicit casts                |

## 7. The textbook-precise statement
C99 §6.2.5 and §7.19 define the representations and minimum ranges. Every integer type has a precision p and a width w ≥ p; the floating-point types are characterised by FLT_RADIX, FLT_MANT_DIG, DBL_MANT_DIG, etc. size_t is the unsigned type of the result of sizeof (ISO/IEC 9899:1999, 7.17). The exact wording appears in Harbison & Steele, *C: A Reference Manual*, 5e, §5.1–5.3.

## 8. Visual — diagram or schematic
```text
Address 0x1000          0x1004          0x1008
+--------+--------+   +--------+--------+   +--------+--------+
| char c | (pad)  |   | short s       |   | int i                 |
| 1 byte | 3 B    |   | 2 bytes       |   | 4 bytes               |
+--------+--------+   +--------+--------+   +--------+--------+
          size_t (4 B on ILP32) occupies 0x100C–0x100F
```
Each box is one byte; padding is inserted by the compiler to satisfy alignment.

## 9. The memory technique

1. **The hook** — Picture a Russian-nesting-doll set labelled “char, short, int, long”; each doll is exactly twice as wide as the previous one on most 32-bit systems, and size_t is the largest doll that can still be used for counting dolls.
2. **What to overlearn** — Minimum ranges: short ≥ 16 bits, int ≥ 16 bits, long ≥ 32 bits; float has 24-bit significand, double has 53-bit significand; sizeof returns size_t.
3. **Spaced-repetition schedule** — Review the ranges and sizeof behaviour after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive any width from the requirement that the type must hold at least the stated minimum range and that sizeof measures the representation in addressable bytes.

## 10. What this unlocks
These scalar types are the atoms from which every higher-level C construct is built.

- Pointer arithmetic scales by sizeof(T)
- struct layout and alignment rules
- Dynamic allocation (malloc takes size_t)
- File I/O buffering sizes
- SIMD vector widths in modern compilers
- Fixed-width types in <stdint.h> and <inttypes.h>

## 11. Self-check — five questions, no answers
1. On a platform where sizeof(int) == 4 and sizeof(long) == 8, what is the minimum value LONG_MIN must be able to represent?
2. Write a single expression that yields the number of bytes between two pointers of type char* without using subtraction on signed types.
3. A loop counter declared as unsigned short reaches 65535 and is incremented once more. What is its new value?
4. Why does the literal 0.1f + 0.2f not equal 0.3f, yet the same comparison may succeed when both values are written as double literals?
5. A function receives an array as T a[] and the caller passes a 10-element array. Inside the function, what does sizeof(a) evaluate to, and why?