## What it is
Bitwise operators are special operators in programming that act on numbers at the level of their individual bits—their binary representation. Instead of treating an integer like `5` as a single value, they treat it as the sequence of bits `101` and perform logical operations on each bit independently.

## Why it matters
These operators are fundamental for performance-critical and low-level operations. In aerospace, you use them to manipulate hardware control registers, setting or clearing specific flags to control a sensor or actuator. In physics simulations and machine learning, bit shifts (`<<`, `>>`) provide an extremely fast way to multiply or divide by powers of two, which can significantly optimize algorithms that rely on such scaling.

## When to study it
You must be comfortable with two prerequisites before tackling this topic. If you are not, master them first.
1.  **Integer Data Types:** You should understand what an integer is in Python.
2.  **The Binary Number System:** You must be able to convert a positive decimal integer (base-10) into its binary (base-2) representation and back again. For example, you should know why decimal `13` is `1101` in binary.

## How to study it (step by step)
1.  **Review Binary:** Take three numbers, `a = 12`, `b = 21`, `c = 7`. Manually convert each to an 8-bit binary string. Check your work with Python's `bin()` function (e.g., `bin(12)`).
2.  **AND (&), OR (|), XOR (^):** On paper, stack the binary representations of `a` and `b`. Go column by column, from right to left, and compute the result for `&`, `|`, and `^`. For example, for the rightmost column of `a=...0` and `b=...1`, the AND result is `0`, OR is `1`, and XOR is `1`.
3.  **Verify in Code:** Open a Python interpreter. Compute `a & b`, `a | b`, and `a ^ b`. Use `bin()` on the results to see if they match your paper calculations.
4.  **NOT (~):** Apply the NOT operator to `a`. On paper, flip every bit in its 8-bit representation. In Python, compute `~a`. Note the surprising negative result; we will unpack why this happens (it's called two's complement). For now, just observe that `~x` is equivalent to `-(x+1)`.
5.  **Shifts (<<, >>):** Take `c = 7` (binary `00000111`). On paper, calculate `c << 2` by moving all bits two positions to the left and filling the right with zeros. Calculate `c >> 1` by moving all bits one position to the right, discarding the bit that falls off.
6.  **Connect Shifts to Arithmetic:** Verify that `c << 2` gives the same result as $c \times 2^2$. Verify that `c >> 1` gives the same result as the integer division $c // 2^1$. This is the core reason shifts are useful.

## Key ideas, with intuition
1.  **Column-wise Logic:** For `&`, `|`, and `^`, the operation on each bit position is completely independent of the others. Imagine you have two numbers in binary, written one above the other. The calculation for the 1st bit column has no effect on the 2nd bit column. It's like applying a simple logic rule to 32 or 64 separate pairs of bits simultaneously.
    $$
    \begin{array}{rc}
      & 1011_2 \quad (11_{10}) \\
    \And & 0110_2 \quad (6_{10}) \\
    \hline
      & 0010_2 \quad (2_{10})
    \end{array}
    $$
2.  **Masks for Selecting Bits:** The `&` (AND) operator is a powerful tool for "masking". A mask is a bit pattern you design to isolate, check, or turn off specific bits. To check if the 3rd bit (value $2^2=4$) of a number `n` is on, you can compute `n & 4`. If the result is non-zero, the bit was on.
    $$
    \text{n} = 13 \rightarrow 1101_2 \\
    \text{mask} = 4 \rightarrow 0100_2 \\
    \text{n} \ \& \ \text{mask} \rightarrow 0100_2 \quad (\text{non-zero, so the bit was on})
    $$
3.  **Shifts are Fast Multiplication and Division:** A left shift `<< n` is equivalent to multiplication by $2^n$. A right shift `>> n` is equivalent to integer division by $2^n$. For a CPU, shifting bits is a single, trivial operation, whereas multiplication and division are complex and require many more clock cycles. This is a crucial optimization technique.
    $$
    x \ll n \equiv x \times 2^n \\
    x \gg n \equiv x // 2^n
    $$
4.  **XOR is a Controllable Inverter:** The XOR (`^`) operator acts like a "toggle". If you XOR a bit with `0`, it remains unchanged. If you XOR it with `1`, it flips. This is used extensively in cryptography and graphics to toggle states without needing conditional `if` statements.
    $$
    b \oplus 0 = b \quad (\text{identity}) \\
    b \oplus 1 = \neg b \quad (\text{inversion})
    $$

## Worked example
Let's set the 3rd bit (value $2^2=4$) of the number `a = 10` to `1`, without affecting any other bits.

1.  **Analyze the Goal:** We want to force a specific bit to become `1`. The OR operator (`|`) is perfect for this, because `x | 1` is always `1`, and `x | 0` is always `x`. This means it can turn a bit ON (`| 1`) while leaving other bits alone (`| 0`).

2.  **Create the Mask:** We need a number that has a `1` only at the 3rd bit position and `0`s everywhere else. This is the number $2^2 = 4$.
    *   `a = 10` in binary is `00001010`.
    *   The mask for the 3rd bit is `4`, which in binary is `00000100`.

3.  **Apply the Operator:** We perform the bitwise OR operation.
    $$
    \begin{array}{rc}
      & 00001010_2 \quad (10_{10}) \\
    | & 00000100_2 \quad (4_{10}) \\
    \hline
      & 00001110_2
    \end{array}
    $$

4.  **Convert and Conclude:** Convert the result `00001110` back to decimal. This is $8 + 4 + 2 = 14$.
    *   In Python: `10 | 4` yields `14`.

**Reflection:** Each step was deliberate. We chose the `|` operator because its properties matched our goal: "turn a bit on, leave others alone". We constructed a `mask` that targeted only the bit we wanted to change. The operation then executed this logic perfectly, column by column.

## Diagrams
Here is a diagram illustrating the column-wise nature of `&`, `|`, and `^`.

```text
  a = 1010  (10)
  b = 1100  (12)
  --------------
a & b = 1000  (8)    <-- Result bit is 1 only if a AND b have a 1 in that column.
a | b = 1110  (14)   <-- Result bit is 1 if a OR b have a 1 in that column.
a ^ b = 0110  (6)    <-- Result bit is 1 if EXACTLY ONE of a or b have a 1.
```

And here is a diagram for bit shifts.

```text
Let x = 00110101

Left Shift (x << 2):
  00110101 -> 11010100  (Bits move left, 0s fill from the right)
  <--[00]--  (Two bits on the left are discarded)

Right Shift (x >> 2):
  00110101 -> 00001101  (Bits move right, 0s fill from the left for positive numbers)
  --[00]-->  (Two bits on the right are discarded)
```

## Memory technique — remember this forever
1.  **The Light Switch Story:**
    *   `&` (AND): Two switches in series. The light is ON only if **both** switch A **AND** B are on.
    *   `|` (OR): Two switches in parallel. The light is ON if switch A **OR** B (or both) is on.
    *   `^` (XOR): A staircase light. The light's state flips if you flick **either** switch, but not both. It's on if the switches are in *exclusive* states.
    *   `~` (NOT): A faulty "opposite" switch. `~ON` is `OFF`.
    *   `<<`, `>>`: A queue of people. `<<` means everyone shuffles left, and new people (`0`s) join at the back.

2.  **Must Overlearn Formulas:**
    *   To check if the k-th bit is set in `n`: `if (n & (1 << k)) != 0:`
    *   To set the k-th bit in `n`: `n = n | (1 << k)`
    *   To clear the k-th bit in `n`: `n = n & ~(1 << k)`

3.  **Spaced Repetition Schedule:** Review these concepts and re-do the self-check problems in **1 day, 3 days, 7 days, 16 days, and 35 days**.

4.  **First Principles Pathway:** If you ever forget, you can rebuild everything from the single-bit truth tables. Convert your numbers to binary. Stack them vertically. Go column by column, applying the simple rule (`1&1=1`, `1&0=0`, etc.). That's all there is to it.

## Common mistakes
1.  **Confusing Bitwise and Logical Operators:** `&` is not `and`. `1 & 2` evaluates to `0` (`01 & 10 = 00`). In contrast, `1 and 2` evaluates to `True` because both `1` and `2` are "truthy" values. Use bitwise operators for bit manipulation, logical operators for boolean logic flow.
2.  **Operator Precedence:** Bitwise operators have lower precedence than arithmetic operators. `3 + 5 & 7` is parsed as `(3 + 5) & 7`, which is `8 & 7 = 0`. This is almost never what you want. **Always use parentheses** to make your intent clear: `3 + (5 & 7)`.
3.  **Misunderstanding `~` (NOT):** The `~` operator is not just "flip all the bits". In virtually all modern systems, integers are stored in a format called "two's complement". Because of this, the formula for `~x` is always `-(x+1)`. So, `~5` is `-6`, not a large positive number.

## Self-check
1.  What is the decimal result of `25 & 30`?
2.  Write a single Python expression using bitwise operators that takes an integer `n` and returns `0` if `n` is even, and `1` if `n` is odd.
3.  You have an integer `flags` that stores 8 individual boolean settings in its first 8 bits. Write a Python expression to create a new integer `new_flags` that is the same as `flags`, but with the 5th bit (value $2^4$) flipped to its opposite state (0 becomes 1, 1 becomes 0), leaving all other bits untouched.