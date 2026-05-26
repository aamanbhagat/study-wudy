## 1. The one-sentence answer
**Operations on decimals are the four arithmetic operations performed after aligning place values so that each digit retains its correct power of ten.**

Decimals extend the base-10 system to the right of the units place using negative powers of ten. When you add or subtract, the decimal points must line up vertically so that tenths add to tenths and hundredths add to hundredths. Multiplication and division require counting the total number of decimal places across the factors or shifting the decimal in the divisor until it becomes an integer. These rules follow directly from the definition of decimal notation as \(\sum d_i \times 10^i\) where \(i\) can be negative.

The core insight is that the decimal point is not a special symbol; it is simply the boundary between non-negative and negative exponents of ten. Once you treat every digit according to its actual place value, the usual rules for whole numbers apply without change.

> [!NOTE]
> The single most important realisation is that you never “move the decimal point” arbitrarily; you are always compensating for the powers of ten you have introduced or removed, which is why counting decimal places works for multiplication and why shifting both numbers equally works for division.

## 2. Why this matters — concrete and current
In semiconductor mask design at TSMC and Intel, sub-nanometre feature sizes are expressed in decimal fractions of a micrometre; every addition or subtraction of coordinates must preserve exact place values or the lithography step fails.  

Financial risk engines at JPMorgan and Citadel convert interest rates, volatility surfaces and FX quotes into decimals and perform millions of multiplications and divisions per second; a single misplaced decimal place in a Black-Scholes calculation produces incorrect Value-at-Risk numbers that regulators reject.  

NASA’s Perseverance rover navigation software stores wheel odometry and star-tracker angles as double-precision decimals; division by time intervals yields velocity vectors that must be accurate to many decimal places for safe entry-descent-landing.  

Machine-learning frameworks such as PyTorch and JAX store loss values, learning rates and gradient components in float32 or bfloat16; the fused multiply-add operations inside matrix multiplications are decimal arithmetic at hardware speed, and any misalignment of decimal places during accumulation produces NaNs that halt training runs.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Place value (powers of 10) | Every decimal digit represents a distinct power of ten; alignment and place counting rest on this. |
| Whole-number addition, subtraction, multiplication, division | Decimal rules are exactly the same algorithms once place values are aligned. |
| Negative exponents       | Explains why moving a digit one place right multiplies its value by \(1/10\). |

If any row above is unfamiliar, pause and master that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Aligning decimal points for addition and subtraction
Write every number so that decimal points sit in the same vertical column; this automatically lines up digits with identical place values.  
Example: \(3.72 + 0.8\) becomes  
```
  3.72
+ 0.80
```  
Formal statement: to compute \(a + b\) where \(a = \sum a_i 10^i\) and \(b = \sum b_i 10^i\), form \(\sum (a_i + b_i) 10^i\).  
> [!WARNING]  
> If you align the rightmost digits instead of the decimal points, you add tenths to hundredths and the result is wrong by a factor of ten.

### Step 2 — Performing the addition or subtraction column by column
Add or subtract exactly as with whole numbers, carrying or borrowing when a column exceeds 9 or goes negative; the decimal point stays fixed in its column.  
Example: \(3.72 + 0.8 = 4.52\).  
Formal statement remains the same place-value sum.

### Step 3 — Decimal placement in multiplication by counting places
Multiply the numbers as integers, then count the total number of digits after the decimal points in both factors and insert the decimal point that many places from the right in the product.  
Example: \(2.4 \times 0.03 = 0.072\) because \(24 \times 3 = 72\) and two + two = four decimal places.  
Formal statement: \(a \times b = (\sum a_i 10^i)(\sum b_j 10^j) = \sum c_k 10^{k}\) where the lowest power is the sum of the lowest powers of \(a\) and \(b\).

### Step 4 — Decimal placement in division by shifting
Move the decimal point in the divisor rightward until it becomes an integer, then move the decimal point in the dividend the same number of places; perform ordinary long division.  
Example: \(4.56 \div 0.12 = 38\) because both numbers are multiplied by 100 to give \(456 \div 12\).  
Formal statement: \(a / b = (a \cdot 10^m) / (b \cdot 10^m)\) for any integer \(m\) that clears the denominator’s decimals.

### Step 5 — Textbook-grade statement of all four operations
Any finite decimal is a rational whose denominator is a power of ten. Consequently the sum, difference, product and quotient (when defined) of two finite decimals are again finite decimals whose place values are completely determined by the place values of the operands.

## 5. Worked examples — har step show karo

**Example 1 — Simple addition**  
*Given:* \(4.8 + 3.25\)  
*Find:* the exact sum  
Align decimals:  
```
  4.80
+ 3.25
```  
Add units: \(4 + 3 = 7\); tenths: \(8 + 2 = 10\) (write 0, carry 1); hundredths: \(0 + 5 + 1 = 6\).  
*Why* each column uses the same power of ten.  
**4.80 + 3.25 = 8.05**

*Reflection:* The carry from tenths is still just ordinary base-10 carry; only the alignment was special.

**Example 2 — Subtraction with borrowing**  
*Given:* \(5.03 - 2.67\)  
*Find:* the difference  
```
  5.03
- 2.67
```  
Hundredths: 3 < 7, borrow 1 tenth → 13 hundredths – 7 = 6; tenths become 9 (after borrow) but 9 < 6, borrow 1 unit → 19 tenths – 6 = 13, units become 4.  
*Why* borrowing reduces the next higher place value by exactly one power of ten.  
**5.03 − 2.67 = 2.36**

*Reflection:* The algorithm is identical to whole-number subtraction once places are aligned.

**Example 3 — Multiplication**  
*Given:* \(1.25 \times 0.4\)  
*Find:* the product  
Ignore decimals: \(125 \times 4 = 500\). Total decimal places: two + one = three. Place decimal three positions from right: 0.500.  
*Why* the exponent sum \(10^{-2} \times 10^{-1} = 10^{-3}\).  
**1.25 × 0.4 = 0.5**

*Reflection:* Trailing zeros after the decimal may be dropped, but the place-value count must never be forgotten.

**Example 4 — Division**  
*Given:* \(7.35 \div 0.15\)  
*Find:* the quotient  
Shift both decimals two places: \(735 \div 15 = 49\).  
*Why* multiplying numerator and denominator by \(10^2\) leaves the value unchanged.  
**7.35 ÷ 0.15 = 49**

*Reflection:* The result is an integer because the original decimals were commensurate.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Aligning rightmost digits instead of decimals | Habit from whole-number arithmetic          | Always write the decimal points in one vertical line first |
| Forgetting to count decimal places in multiplication | Treating decimals like whole numbers        | Count every digit after each decimal point before placing the point in the answer |
| Moving only the divisor’s decimal in division | Incomplete compensation                     | Move the decimal the same number of places in both numbers |
| Dropping trailing zeros too early | Thinking they are meaningless               | Keep them until the final answer, then decide |
| Treating 0.999… as unequal to 1   | Confusion between finite and infinite decimals | Remember we are working only with finite decimals here |
| Placing decimal after first digit of quotient | Misreading long-division layout             | Keep the decimal point of the quotient directly above the decimal of the dividend |

## 7. The textbook-precise statement
A finite decimal is a real number of the form \(n / 10^k\) where \(n \in \mathbb{Z}\) and \(k \in \mathbb{N}_0\). The set of finite decimals is closed under addition, subtraction and multiplication. It is closed under division precisely when the divisor’s denominator in lowest terms divides some power of ten. All four operations are performed by the algorithms given in Aufmann, *Basic College Mathematics*, 10e, §1.4, which reduce each operation to integer arithmetic on the numerators after appropriate powers of ten have been factored out.

## 8. Visual — diagram or schematic
```
Addition alignment (place-value columns shown)

   10^1 | 10^0 | 10^{-1} | 10^{-2}
   -----|------|---------|--------
        |   4  |    8    |    0     ← 4.80
        |   3  |    2    |    5     ← 3.25
   -----|------|---------|--------
        |   7  |    0    |    5     ← sum 8.05
```
Each vertical line is a distinct power of ten; the decimal point sits between \(10^0\) and \(10^{-1}\).

## 9. The memory technique

1. **The hook** — Picture the decimal point as a “clothesline peg” that must stay in the same position for addition and subtraction; for multiplication the pegs of both numbers are collected and hammered into the product at the correct distance.
2. **What to overlearn** — (a) Decimal points must line up vertically for + and −. (b) Total decimal places in factors = decimal places in product. (c) Shift both numbers equally in division.
3. **Spaced-repetition schedule** — Review the three rules above after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — Rewrite every decimal as a fraction with denominator a power of ten, perform ordinary fraction arithmetic, then convert the result back to decimal form.

## 10. What this unlocks
Mastery of decimal arithmetic lets you handle any measured quantity expressed in SI units, floating-point numbers in code, and the mantissa-exponent representation used in scientific notation.  

- Next topics: rounding and significant figures, scientific notation, percentage calculations, and conversion between fractions and decimals.  
- Later topics: logarithms of decimal numbers, floating-point error analysis in numerical methods, and decimal-to-binary conversion in computer architecture.

## 11. Self-check — five questions, no answers
1. Compute \(0.075 + 2.9\) and state the place value of the digit 7 in your answer.  
2. Without a calculator, find \(0.125 \times 0.08\) and explain why the product has five decimal places before trailing zeros are removed.  
3. Perform \(3.6 \div 0.045\) by converting to an integer division; show every shift.  
4. A student writes \(4.2 - 1.78 = 3.58\). Identify the exact column where the mistake occurred.  
5. Prove that the product of any two finite decimals is again a finite decimal by counting the lowest power of ten that appears.