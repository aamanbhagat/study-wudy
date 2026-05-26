## 1. The one-sentence answer

**Binary is a positional numeral system with base 2 that uses only the symbols 0 and 1 to represent every nonnegative integer.**

Every digit occupies a place whose weight is a successive power of two, beginning with \(2^0 = 1\) at the rightmost position. A binary numeral is therefore nothing more than a sum of distinct powers of two; the presence of a 1 in a given place simply means “include that power,” while a 0 means “omit it.” This construction is identical in structure to the familiar decimal system except that the multiplier at each place is 2 rather than 10.

Because only two symbols are required, binary maps directly onto the two stable states of any physical switch—voltage high or low, magnetized or not, charged or discharged. Consequently every integer that a computer stores or manipulates is ultimately a binary string.

> [!NOTE]
> The decisive insight is that any nonnegative integer possesses a unique representation in binary; once the place weights are fixed as powers of two, no other combination of 0s and 1s can produce the same value.

## 2. Why this matters — concrete and current

Modern x86-64 and ARM processors execute every arithmetic and logical instruction on 64-bit binary words; the entire instruction set is defined in terms of bit patterns.

IPv6 addresses are 128-bit binary quantities written for humans in hexadecimal; every packet that traverses the Internet is routed by examining these binary fields in hardware.

NAND-flash memory cells in SSDs store data as the presence or absence of charge, which the controller interprets as binary digits; the entire storage stack therefore rests on reliable binary-to-decimal address translation.

Satellite communication systems such as those used by SpaceX Starlink employ binary low-density parity-check codes; the decoder repeatedly converts between binary codewords and integer likelihood values measured in decibels.

Machine-learning accelerators such as Google TPUs perform matrix multiplications on 8-bit or 16-bit binary integers; every training step ultimately reduces to millions of binary additions and shifts.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Place-value notation     | Binary is the identical idea with base 2 instead of 10    |
| Nonnegative integer powers | The place weights are exactly the sequence \(2^0, 2^1, 2^2, \dots\) |
| Repeated division        | The standard algorithm for decimal-to-binary conversion repeatedly divides by the base |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every numeral is a sum of place values
A decimal numeral such as 253 means \(2\times10^2 + 5\times10^1 + 3\times10^0\). The same rule applies when the base is 2: each place simply multiplies by a power of two.

Example: the binary string 101 equals \(1\times2^2 + 0\times2^1 + 1\times2^0\).

Formal statement:
\[
b_n b_{n-1}\dots b_1 b_0 = \sum_{k=0}^n b_k \cdot 2^k, \quad b_k\in\{0,1\}.
\]

> [!WARNING]
> Treating the leftmost digit as the units place instead of the highest power reverses the entire value.

### Step 2 — Counting produces the next integer by toggling bits
Start at 0. Each increment flips every trailing 1 to 0 until a 0 is found, which is changed to 1. This is ordinary addition with carry.

Example sequence: 0, 1, 10, 11, 100, 101, 110, 111, 1000.

### Step 3 — Decimal to binary by repeated division
Divide the number by 2; the remainder is the least-significant bit. Replace the number by the quotient and repeat until the quotient is zero. The remainders read bottom-to-top form the binary numeral.

Formal statement: the least-significant bit of \(N\) is \(N \bmod 2\); the remaining bits encode \(\lfloor N/2 \rfloor\).

> [!WARNING]
> Reading the remainders from top to bottom yields the bits in reverse order.

### Step 4 — Binary to decimal by repeated multiplication
Start from the leftmost bit. Initialise value to 0. For each bit \(b\), replace value by \(2\times\text{value} + b\).

This is exactly Horner's method for evaluating the polynomial \(\sum b_k 2^k\).

### Step 5 — Uniqueness follows from the division algorithm
Suppose two different binary strings represent the same integer. Their difference would be a nonzero multiple of every power of two yet evaluate to zero, contradicting the division algorithm that guarantees unique remainders 0 or 1.

The final textbook statement appears in Section 7.

## 5. Worked examples — every step shown

**Example 1 — Convert 13 decimal to binary**

*Given:* \(N=13_{10}\)

*Find:* binary representation

Divide 13 by 2 → quotient 6, remainder 1  
*Why:* remainder is least-significant bit.  
Divide 6 by 2 → quotient 3, remainder 0  
*Why:* next bit.  
Divide 3 by 2 → quotient 1, remainder 1  
*Why:* next bit.  
Divide 1 by 2 → quotient 0, remainder 1  
*Why:* final bit; stop when quotient is zero.  

Reading remainders upward: **1101**

*Reflection:* The algorithm always terminates for finite nonnegative integers because each division halves the value.

**Example 2 — Convert 1101 binary to decimal**

*Given:* \(1101_2\)

*Find:* decimal value

\[
\begin{align*}
1\times2^3 &= 8 && \text{(highest place)}\\
0\times2^2 &= 0 && \text{(next place)}\\
1\times2^1 &= 2 && \text{(next place)}\\
1\times2^0 &= 1 && \text{(units place)}
\end{align*}
\]

Sum: \(8+0+2+1=11\)

**11**

*Reflection:* Each power of two is independent; omitting any term changes the total by exactly that power.

**Example 3 — Count from 5 to 8 in binary**

*Given:* \(101_2 = 5_{10}\)

*Find:* next three integers

Add 1: \(101 + 1 = 110\) (6)  
Add 1: \(110 + 1 = 111\) (7)  
Add 1: \(111 + 1 = 1000\) (8)

**1000**

*Reflection:* The carry propagation that turns 111 into 1000 is the same phenomenon that turns 999 into 1000 in decimal.

**Example 4 — Convert 47 decimal to binary**

*Given:* 47

*Find:* binary

47 ÷ 2 = 23 r 1  
23 ÷ 2 = 11 r 1  
11 ÷ 2 = 5 r 1  
5 ÷ 2 = 2 r 1  
2 ÷ 2 = 1 r 0  
1 ÷ 2 = 0 r 1  

Remainders upward: **101111**

*Reflection:* Larger numbers simply require more bits; the procedure never changes.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Reading remainders top-to-bottom | Most-significant bit appears first in division | Write remainders in a column and read upward |
| Forgetting \(2^0=1\)        | Habit of starting exponents at 1            | Always label the rightmost place \(2^0\)     |
| Treating leading zeros as significant | Decimal omits them; binary strings often shown padded | Ignore leading zeros for value; keep them only for fixed-width registers |
| Confusing 2's complement with unsigned binary | Negative numbers require an extra convention | Convert magnitude first, then apply sign representation separately |
| Adding instead of multiplying by 2 when converting left-to-right | Mental carry-over from decimal addition     | Use the Horner recurrence: value = 2·value + bit |
| Stopping division when remainder is zero instead of quotient | Misremembering termination condition        | Continue until the integer quotient becomes zero |
| Swapping bit positions when writing 8-bit bytes | Endianness confusion                        | Decide MSB-first or LSB-first once and label every diagram |

## 7. The textbook-precise statement

Any nonnegative integer \(N\) possesses a unique representation
\[
N = \sum_{k=0}^m b_k 2^k, \quad b_k\in\{0,1\}, \quad b_m=1
\]
where the coefficients \(b_k\) are obtained by the repeated-division algorithm above. (See Knuth, *The Art of Computer Programming*, Vol. 2, Seminumerical Algorithms, 3rd ed., §4.1.)

## 8. Visual — diagram or schematic

```text
Place values (powers of 2) shown above each bit position

  2^4  2^3  2^2  2^1  2^0
   16    8    4    2    1
    |    |    |    |    |
    1    0    1    1    1   ← binary digits
    =16  +0  +4  +2  +1  = 23 decimal
```

## 9. The memory technique

**The hook**  
Picture eight light switches in a row; each switch that is “on” adds the next power of two. The pattern of on/off switches is the binary number.

**What to overlearn**  
- The first eight powers of two: 1, 2, 4, 8, 16, 32, 64, 128.  
- The conversion loop: “divide by 2, record remainder, repeat.”

**Spaced-repetition schedule**  
Review the eight powers at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
If the list is forgotten, rebuild it by starting at \(2^0=1\) and repeatedly doubling.

## 10. What this unlocks

Binary representation is the common substrate on which every subsequent layer of computer architecture is built.

- Fixed-width integers and overflow behaviour  
- Two’s-complement signed arithmetic  
- Bitwise operators and masks  
- Floating-point IEEE-754 encoding  
- Memory addressing and cache indexing  

## 11. Self-check — five questions, no answers

1. Convert 0 and 1 to binary and back; state what changes.  
2. Write the binary counting sequence from 0 to 15 inclusive.  
3. Convert 100 decimal to binary using repeated division; verify by converting the result back.  
4. A 4-bit binary numeral ends with three 1-bits. What is the smallest possible decimal value it can represent?  
5. Explain why the binary representation of any even integer must end with a 0.