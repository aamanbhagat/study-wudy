## 1. The one-sentence answer

**Bitwise operators act on the individual binary digits of integers, treating each bit as an independent Boolean value.**

Integers in a computer exist only as sequences of bits. The six operators &, |, ^, ~, <<, and >> let a programmer read or alter those bits without converting the number to another base. Because every integer is already stored in binary, these operations execute in a single CPU cycle on most hardware.

The result of any bitwise expression is again an integer whose bits are determined solely by the corresponding bits of the operands. No rounding, no floating-point conversion, and no dependence on decimal digits occurs.

> [!NOTE]
> The deepest insight is that every integer is simultaneously a number and a collection of independent flags; bitwise operators give direct access to those flags.

## 2. Why this matters — concrete and current

In network stack code at companies such as Cloudflare, the & operator extracts the network prefix from an IPv6 address by masking the host bits in one instruction.

Graphics drivers inside NVIDIA’s CUDA runtime use left and right shifts to pack and unpack pixel components stored in 32-bit words, avoiding slower multiplication and division.

Cryptographic libraries such as OpenSSL rely on XOR for constant-time AES S-box lookups and for the diffusion layers of SHA-256, guaranteeing that timing side-channels cannot leak key material.

Modern chess engines such as Stockfish represent the entire board state with 12 bitboards; the | and & operators generate legal moves by combining attack masks in a few dozen CPU cycles.

Semiconductor simulators at Intel employ bit-field extraction via shifts and masks to model register aliasing inside the out-of-order execution engine.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Binary positional notation | Every bitwise result is defined by the value of each power-of-two place. |
| Two’s-complement representation | Python’s ~ operator follows two’s complement even though integers have arbitrary width. |
| Boolean algebra (AND, OR, NOT, XOR) | The truth tables of these connectives are applied bit-wise. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Bits are independent switches
Each bit position can be only 0 or 1. Changing one bit never affects any other bit position.

Example: the integer 5 is stored as …000101. The rightmost bit is 1, the next is 0, the next is 1.

Formally, any non-negative integer \( n \) satisfies
\[
n = \sum_{k=0}^{\infty} b_k \cdot 2^k, \quad b_k \in \{0,1\}.
\]

> [!WARNING]
> Treating bits as decimal digits produces completely wrong results; 101 binary is 5, not 101 decimal.

### Step 2 — Bitwise AND (&) keeps a bit only when both operands have 1
The operator & produces a 1 in position k precisely when both operands have 1 there.

Example: 5 & 3 yields 1 because only the least-significant bit is 1 in both numbers.

\[
(b \land c)_k = b_k \cdot c_k
\]

### Step 3 — Bitwise OR (|) sets a bit when either operand has 1
The operator | produces a 1 when at least one operand has 1.

Example: 5 | 3 yields 7.

\[
(b \lor c)_k = b_k + c_k - b_k \cdot c_k
\]

### Step 4 — Bitwise XOR (^) flips a bit when operands differ
The operator ^ produces 1 exactly when the bits differ.

Example: 5 ^ 3 yields 6.

\[
(b \oplus c)_k = b_k + c_k \pmod{2}
\]

### Step 5 — Bitwise NOT (~) inverts every bit
In two’s complement, ~x equals −x−1.

Example: ~5 yields −6.

\[
(\lnot b)_k = 1 - b_k
\]

### Step 6 — Left shift (<<) multiplies by a power of two
Shifting left by m positions multiplies the value by \( 2^m \).

\[
n \ll m = n \cdot 2^m
\]

### Step 7 — Right shift (>>) divides by a power of two
For non-negative integers, right shift by m positions is integer division by \( 2^m \).

\[
n \gg m = \lfloor n / 2^m \rfloor
\]

### Step 8 — The complete set of operators
Python therefore supplies exactly the six operators that close the algebra of bit vectors under the Boolean operations and positional scaling.

## 5. Worked examples — every step shown

**Example 1 — Extract the lowest set bit**
- *Given:* n = 0b101100
- *Find:* the value of the lowest set bit
- n & −n
  - Why: −n flips all bits after the lowest 1 and keeps that 1; & isolates it.
- Result: 0b000100 = 4
**4**

*Reflection:* The trick works only because two’s complement negation is defined; it generalises to any mask that isolates a single bit.

**Example 2 — Set a specific bit**
- *Given:* flags = 0b0010, position 0
- *Find:* flags with bit 0 turned on
- flags | (1 << 0)
  - Why: 1 << 0 creates a mask with only bit 0 set; | merges it without disturbing other bits.
- Result: 0b0011 = 3
**3**

*Reflection:* Shifts generate masks; OR is the safe “set” operation.

**Example 3 — Toggle two bits simultaneously**
- *Given:* x = 0b1100
- *Find:* x with bits 1 and 2 flipped
- x ^ 0b0110
  - Why: XOR inverts exactly the positions where the mask is 1.
- Result: 0b1010 = 10
**10**

*Reflection:* XOR is its own inverse; applying the same mask twice restores the original value.

**Example 4 — Arithmetic right shift on negative numbers**
- *Given:* x = −8 (…11111000 in two’s complement)
- *Find:* x >> 2
- The sign bit is replicated, producing …11111110 = −2
  - Why: Python guarantees arithmetic (sign-extending) right shift for all integers.
**−2**

*Reflection:* The behaviour differs from unsigned languages; always verify sign extension when porting code.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                              |
|-----------------------------------|-----------------------------------------------------|----------------------------------------------|
| Expecting ~5 == 2                 | ~5 = −6 because of two’s complement                 | Remember ~x = −x−1                           |
| Using & on booleans               | Python reuses & for bitwise, and for bool           | Use and for logical operations               |
| Shifting by a negative amount     | Python raises ValueError                            | Ensure shift counts are non-negative         |
| Forgetting arbitrary precision    | High bits never “fall off” the left                 | Mask explicitly when a fixed width is needed |
| Confusing << with *               | Overflow never occurs in Python                     | Still prefer shifts when the intent is bit manipulation |
| Assuming >> rounds toward zero    | It floors for positive numbers                      | Use // 2**m when sign-agnostic division is required |
| Applying bitwise ops to floats    | TypeError                                           | Convert to int first or use NumPy arrays     |

## 7. The textbook-precise statement

Let \( \mathbb{Z} \) be the set of Python integers. The operators &, |, ^, ~, <<, >> are total functions
\[
\&, |, ^ : \mathbb{Z} \times \mathbb{Z} \to \mathbb{Z}, \quad
\sim : \mathbb{Z} \to \mathbb{Z}, \quad
\ll, \gg : \mathbb{Z} \times \mathbb{N}_0 \to \mathbb{Z}
\]
defined by the bit-wise application of the corresponding Boolean connectives on the two’s-complement representation, with left and right shifts corresponding to multiplication and floor division by powers of two. (Python Language Reference, §6.6, “Binary bitwise operations”.)

## 8. Visual — diagram or schematic

```text
Bit positions:   … 7  6  5  4  3  2  1  0
                 -----------------------
5 (0b0101)       … 0  0  0  0  0  1  0  1
3 (0b0011)       … 0  0  0  0  0  0  1  1
------------------------------------------------
5 & 3 = 1        … 0  0  0  0  0  0  0  1   (AND)
5 | 3 = 7        … 0  0  0  0  0  1  1  1   (OR)
5 ^ 3 = 6        … 0  0  0  0  0  1  1  0   (XOR)
~5     = −6      … 1  1  1  1  1  0  1  0   (NOT, sign-extended)
5 << 1 = 10      … 0  0  0  0  1  0  1  0   (left shift)
5 >> 1 = 2       … 0  0  0  0  0  0  1  0   (right shift)
```

## 9. The memory technique

1. **The hook** — Picture each bit as a light switch on an infinitely long hallway; the operators flip, combine, or slide those switches.
2. **What to overlearn** — The six operator symbols, the identity ~x = −x−1, and the fact that 1 << k produces a mask with only bit k set.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive any operator from its truth table applied to each bit position independently.

## 10. What this unlocks

Mastery of these operators is the gateway to constant-time bit manipulation, the foundation of hash tables, bloom filters, and low-level protocol parsers.

- Next: packing and unpacking binary file formats
- Next: implementing fast integer division by constants via magic numbers
- Next: building bitboards for combinatorial game engines
- Next: writing branch-free code using masks and XOR

## 11. Self-check — five questions, no answers

1. Compute 0b101010 & 0b110011 and express the result in binary and decimal.
2. Without running code, predict the value of ~0 in Python and justify it.
3. Show that (x ^ y) ^ y restores x for any integers x and y.
4. A 32-bit field stores three 10-bit values. Write an expression that extracts the middle value using only shifts and masks.
5. Identify the subtle error in the claim “right shift by 1 always halves an integer.”