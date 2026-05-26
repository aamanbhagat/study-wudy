## 1. The one-sentence answer
**Bitwise operators let you directly read, flip, or combine individual bits inside an integer’s binary representation.**

In Python every `int` is stored as a sequence of bits. The operators `&`, `|`, `^`, `~`, `<<` and `>>` act on those bits one position at a time instead of treating the whole number as a single value. Because bits are the smallest unit of information a computer can store, these operators give you fine-grained control that ordinary arithmetic cannot provide. The same six symbols appear in almost every systems language, so once you understand them in Python you can read low-level code in C, Rust or Verilog without translation.

> [!NOTE]
> The single most important “aha” is that every bitwise operation is completely independent across bit positions; there is never any carry from one bit to the next, unlike addition or multiplication.

## 2. Why this matters — concrete and current
In CUDA kernels, NVIDIA uses `&` and `>>` to unpack 32-bit packed floats that store four 8-bit RGBA channels; this pattern appears in every modern graphics driver.  
ARM’s NEON and Intel’s AVX2 instruction sets rely on `^` (XOR) for fast AES encryption rounds inside OpenSSL; the same XOR trick is used in Google’s Tink library for authenticated encryption.  
SpaceX’s flight software stores dozens of boolean flags inside a single 64-bit word using `|` to set and `&` to test each flag; the technique reduces memory traffic on radiation-hardened processors.  
In the Linux kernel, the page-table entry uses the lowest three bits as permission flags; `& 0x7` extracts those bits millions of times per second during context switches.  
Inside PyTorch, the `torch.uint8` tensor storage uses left-shift and mask operations to implement bit-packing for quantized 4-bit weights, cutting memory by half on mobile deployments.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|---------------------------|-----------------------------------------------------------|
| Binary positional notation | Every bitwise operator is defined position-by-position on base-2 digits. |
| Two’s-complement representation | Explains the behaviour of `~` and right-shift on negative numbers in Python. |
| Python’s arbitrary-precision integers | Determines how `~` and shifts behave when the sign bit “runs off” to infinity. |

If any row above is unfamiliar, pause and read the corresponding short note on binary representation before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Bits are independent switches
Each bit inside an integer can be only 0 or 1. Bitwise operators never create a carry between positions, so you can reason about every bit in isolation.  
Example: the number 5 is `0b101`. Its three bits are completely separate.  
Formal statement: for any integers \(x\) and \(y\) and bit position \(k\), the \(k\)-th bit of \(x\ \&\ y\) equals the logical AND of the \(k\)-th bits of \(x\) and \(y\).

> [!WARNING]
> If you mentally add bits as if they were decimal digits you will invent phantom carries that do not exist.

### Step 2 — & keeps only the bits that are 1 in both operands
The ampersand symbol visually suggests “both must be present”.  
Example: `0b1101 & 0b1011` produces `0b1001`.  
Formal: \( (x \& y)_k = x_k \land y_k \).

### Step 3 — | sets a bit if either operand has it set
The vertical bar suggests “at least one path is open”.  
Example: `0b1100 | 0b0011` yields `0b1111`.  
Formal: \( (x | y)_k = x_k \lor y_k \).

### Step 4 — ^ toggles a bit exactly when the operands differ
XOR is addition modulo 2; it is its own inverse.  
Example: `0b1010 ^ 0b1100` gives `0b0110`.  
Formal: \( (x ^ y)_k = x_k \oplus y_k \).

### Step 5 — ~ flips every bit (one’s complement)
Because Python integers have no fixed width, `~x` equals \(-x-1\).  
Example: `~5` is `-6`.  
Formal: \( \sim x = -x-1 \).

### Step 6 — << and >> move bits left or right
Left shift multiplies by \(2^n\); right shift divides by \(2^n\) (floor toward zero for positives).  
Example: `0b0011 << 2` becomes `0b1100`.  
Formal: \( x << n = x \cdot 2^n \), \( x >> n = \lfloor x / 2^n \rfloor \) for \(x \ge 0\).

### Step 7 — Operator precedence and parentheses
All bitwise operators have lower precedence than arithmetic but higher than comparisons; always parenthesize when mixing.  
Formal statement appears in the Python Language Reference, §6.16.

## 5. Worked examples — har step show karo

**Example 1 — Simple mask**  
*Given:* `x = 0b10110110`, mask = `0b00001111`  
*Find:* lower four bits of x  
`x & mask`  
= `0b10110110 & 0b00001111`  
= `0b00000110`  
*Why:* every bit above position 3 is forced to 0.  
**Final answer: 6**  
*Reflection:* the mask pattern is reusable for any width; only the positions that stay 1 matter.

**Example 2 — Toggle a flag**  
*Given:* status = `0b00000100` (bit 2 already set)  
*Find:* flip bit 2  
`status ^ (1 << 2)`  
= `0b00000100 ^ 0b00000100`  
= `0b00000000`  
*Why:* XOR with 1 always inverts; XOR with 0 leaves the bit unchanged.  
**Final answer: 0**  
*Reflection:* the same idiom toggles any chosen bit without touching others.

**Example 3 — Sign-aware right shift**  
*Given:* `x = -8` (binary …11111000)  
*Find:* `x >> 2`  
Python preserves the sign bit, so result is `-2`.  
*Why:* arithmetic right shift copies the sign bit into vacated positions.  
**Final answer: -2**  
*Reflection:* behaviour differs from languages that zero-fill; always test negatives.

**Example 4 — Clearing multiple bits**  
*Given:* `flags = 0b11111111`, clear bits 1, 3 and 5  
*Find:* `flags & ~(0b00101010)`  
= `0b11111111 & 0b11010101`  
= `0b11010101`  
*Why:* first build the mask of bits to remove, then invert it.  
**Final answer: 0b11010101**  
*Reflection:* combining `~` and `&` is the standard idiom for “keep everything except these bits”.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Expecting fixed-width `~`         | Python ints grow infinitely                 | Remember `~x == -x-1` or mask after `~`      |
| Using `>>` on negatives in other languages | Some languages zero-fill                    | Write a comment or helper that documents sign extension |
| Forgetting parentheses with `&`   | `&` has lower precedence than `==`          | Always write `(x & mask) == 0`               |
| Treating `^` as exponentiation    | `^` is XOR, `**` is power                   | Never use `^` for math; use `**`             |
| Shifting by a negative amount     | Python raises ValueError                    | Validate shift count before the operation    |
| Assuming `<<` cannot overflow     | Python grows the int, but memory can still explode | Keep shift counts inside documented limits   |
| Confusing logical `and` with `&`  | Both exist and look similar                 | Use `&` only on ints, `and` only on bools    |

## 7. The textbook-precise statement
In Python, each integer is conceptually stored in two’s complement with an infinite sign-bit extension to the left. For any integers \(x, y\) and non-negative integer \(n\),

\[
\begin{align*}
(x \& y) &= \sum_{k=0}^\infty (x_k \land y_k) \cdot 2^k, \\
(x | y)  &= \sum_{k=0}^\infty (x_k \lor y_k) \cdot 2^k, \\
(x ^ y)  &= \sum_{k=0}^\infty (x_k \oplus y_k) \cdot 2^k, \\
(\sim x) &= -x-1, \\
(x << n) &= x \cdot 2^n, \\
(x >> n) &= \lfloor x / 2^n \rfloor \quad (x \ge 0).
\end{align*}
\]

(Python Language Reference, version 3.12, §6.16 “Binary bitwise operations” and §6.17 “Shifts”.)

## 8. Visual — diagram or schematic
```
Bit positions:  7 6 5 4 3 2 1 0
x = 0b10110110  1 0 1 1 0 1 1 0
y = 0b00001111  0 0 0 0 1 1 1 1
x & y           0 0 0 0 0 1 1 0   ← only overlapping 1s survive
x | y           1 0 1 1 1 1 1 1   ← any 1 sets the result
x ^ y           1 0 1 1 1 0 0 1   ← 1 where bits differ
```

## 9. The memory technique
**The hook** — picture six tools hanging on a wall: a pair of pliers (`&`), a pipe (`|`), a crossed wrench (`^`), a universal “NOT” stamp (`~`), and two arrows (`<<` `>>`).  
**What to overlearn** — `x & (x-1)` clears the lowest set bit; `x & -x` isolates the lowest set bit; `x ^ y` swaps two variables without a temporary.  
**Spaced-repetition schedule** — review the six operator symbols after 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — redraw the bit table above; each column is an independent Boolean gate.

## 10. What this unlocks
Bitwise operators are the foundation for representing sets as bitmasks, implementing fast flag enums, building bloom filters, and writing branch-free code. They appear directly in the next lessons on “Sets via Bitmasks”, “Branchless Programming”, and “Low-level Optimization in NumPy”.

## 11. Self-check — five questions, no answers
1. Compute `0b11001100 & 0b10101010 | 0b00001111`.  
2. What is the decimal value of `~0` in Python?  
3. Show that `x ^ x == 0` for any integer `x`.  
4. Using only `&`, `|`, `^` and constants, write an expression that swaps the lowest two bits of a byte.  
5. A 32-bit word stores four 8-bit colour channels. Give the mask and shift sequence that extracts the green channel (bits 8–15).