## 1. The one-sentence answer

**Operations on decimals are the four arithmetic operations performed on numbers expressed in base-ten place-value notation, with alignment of the decimal point preserving exact fractional powers of ten.**

Decimals extend the integer place-value system by assigning negative powers of ten to positions right of the decimal point. Addition and subtraction require lining up those positions so that like powers combine directly; any misalignment silently adds or subtracts powers of ten that do not exist. Multiplication scales the total number of decimal places by adding the counts from each factor, while division scales by subtracting them and then applies long-division rules that keep the decimal point fixed in the quotient.

These rules follow mechanically from the definition of a decimal as an integer plus a finite sum of negative powers of ten. Once the alignment or place-counting step is performed correctly, every subsequent digit operation is identical to the corresponding integer operation.

> [!NOTE]
> The single most important insight is that the decimal point is not an arbitrary symbol; it is a fixed reference that marks the boundary between non-negative and negative powers of ten, and every correct algorithm simply keeps that boundary consistent across all numbers involved.

## 2. Why this matters — concrete and current

In aerospace trajectory calculations, NASA’s Deep Space Network converts range measurements from radio signals into decimal kilometers with microsecond timing; a single misplaced decimal place in addition produces position errors of hundreds of meters at lunar distances.

Semiconductor fabrication uses decimal tolerances in nanometers for mask alignment; Intel’s process nodes specify gate lengths such as 3.4 nm, and multiplication of these values by yield percentages determines whether a wafer lot meets specification.

Machine-learning libraries such as PyTorch store loss values and learning rates in double-precision decimals; an undetected rounding error during gradient accumulation can shift a model’s final accuracy by several percentage points on ImageNet-scale benchmarks.

Financial trading engines at firms such as Jane Street represent prices with eight-decimal-place fixed-point decimals; division by lot size must preserve exact pennies or the firm risks regulatory fines for off-tick executions.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Integer place value      | Supplies the left-of-decimal digits and carry rules       |
| Negative integer exponents | Define the right-of-decimal places as powers of 1/10      |
| Basic addition tables    | Used unchanged once decimal columns are aligned           |
| Long-division algorithm  | Extended verbatim once the decimal point is placed in the quotient |

## 4. Building the idea — from intuition to formalism

### Step 1 — Decimal places represent negative powers of ten
A decimal such as 3.47 means three units plus four-tenths plus seven-hundredths.  
Example: 3.47 = 3 + 4/10 + 7/100.  
$$3.47 = 3 \times 10^0 + 4 \times 10^{-1} + 7 \times 10^{-2}.$$  
> [!WARNING] Treating the digit 4 as “four” instead of “four-tenths” immediately produces an error of 3.6 when the number is later added to an integer.

### Step 2 — Addition and subtraction require identical powers
Only digits occupying the same power of ten may be combined.  
Example: 2.34 + 1.7 becomes 2.34 + 1.70.  
$$a + b = \sum (a_k + b_k)10^k \quad \text{where } k \in \mathbb{Z}.$$  
> [!WARNING] Shifting the second number one column left adds an extra factor of ten, turning 1.7 into 17.

### Step 3 — Carry and borrow propagate across the decimal point identically
The carry rule is the same as for integers because the base remains ten.  
Example: 0.98 + 0.07 produces a carry from the hundredths place into the tenths place.  
$$(d_i + c) \ge 10 \implies d_{i+1} \gets d_{i+1} + 1, \quad d_i \gets d_i - 10.$$  
> [!WARNING] Forgetting to carry across the decimal point yields 0.05 instead of 1.05.

### Step 4 — Multiplication counts total decimal places
Each factor contributes its own negative powers; the product collects their sum.  
Example: 1.2 × 0.3 has 1 + 1 = 2 decimal places in the result.  
$$(m \times 10^{-p}) \times (n \times 10^{-q}) = (m \cdot n) \times 10^{-(p+q)}.$$  
> [!WARNING] Counting places after multiplying the integers instead of before produces an off-by-one error of exactly one power of ten.

### Step 5 — Division places the decimal point by subtracting place counts
The quotient’s decimal count equals the dividend’s count minus the divisor’s count.  
Example: 4.8 ÷ 0.6 has 1 − 1 = 0 decimal places.  
$$\frac{m \times 10^{-p}}{n \times 10^{-q}} = \frac{m}{n} \times 10^{-p+q}.$$  
> [!WARNING] Moving the decimal point in only one number changes the actual value by a hidden factor of ten.

### Step 6 — Long division preserves the reference point
After adjusting so the divisor is an integer, the decimal point in the quotient sits directly above the adjusted dividend’s decimal point.  
Formal statement: the algorithm yields the unique decimal whose value satisfies the division equation within any prescribed precision.

## 5. Worked examples — every step shown

**Example 1 — Simple addition**  
*Given:* 4.23 + 1.9  
*Find:* the exact sum.  
Align: 4.23 + 1.90.  
Add hundredths: 3 + 0 = 3. *Why:* same power of ten.  
Add tenths: 2 + 9 = 11; write 1, carry 1. *Why:* carry rule identical to integers.  
Add units: 4 + 1 + 1(carry) = 6.  
**6.13**

*Reflection:* The only non-obvious action was inserting the trailing zero; once aligned, the rest is integer arithmetic.

**Example 2 — Subtraction with borrow across the point**  
*Given:* 5.04 − 2.37  
*Find:* the difference.  
Align and subtract hundredths: 4 − 7, borrow. *Why:* 14 − 7 = 7, tenths become 0 − 1 (after borrow).  
Tenths: 0 − 3 becomes 10 − 3 = 7 after further borrow from units.  
Units: 4 − 2 = 2.  
**2.67**

*Reflection:* Borrow propagation crosses the decimal boundary without special handling once place values are respected.

**Example 3 — Multiplication**  
*Given:* 0.25 × 1.4  
*Find:* the product.  
Ignore decimals: 25 × 14 = 350. *Why:* integer multiplication first.  
Count places: 2 + 1 = 3.  
Place decimal three positions from right: 0.350.  
**0.35**

*Reflection:* The trailing zero is required for exactness; dropping it changes the value by a factor of ten.

**Example 4 — Division**  
*Given:* 0.072 ÷ 0.008  
*Find:* the quotient.  
Move decimal three places in both: 72 ÷ 8 = 9. *Why:* subtract place counts (3 − 3 = 0).  
**9**

*Reflection:* The operation reduces exactly to integer division after the place adjustment.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Adding 1.2 + 3.45 as 4.65         | Misaligned columns                          | Always write trailing zeros explicitly       |
| Multiplying 0.2 × 0.3 = 0.06 then calling it 0.6 | Forgot to count both decimal places | Count places before writing the answer       |
| 4 ÷ 0.5 = 2 instead of 8          | Moved decimal in dividend only              | Move in both numbers the same number of places |
| 1.999 rounded to 2.0 before adding | Early rounding destroys exactness           | Keep full precision until final presentation |
| Treating 0.03 as 3 when dividing  | Confused “03” with “3 hundredths”           | Read every digit with its power of ten aloud |
| 10.0 − 0.1 recorded as 9.9        | Borrow from the units place mishandled      | Perform borrow step-by-step column by column |
| Calculator shows 0.1 + 0.2 = 0.30000000000000004 | Floating-point representation limit         | Use decimal or fixed-point types for exact work |

## 7. The textbook-precise statement

Let \( d = \sum_{k=-m}^{n} a_k 10^k \) with \( a_k \in \{0,1,\dots,9\} \). The sum, difference, product, and quotient (when defined) of two such decimals are again decimals whose coefficients satisfy the ordinary integer arithmetic rules after alignment of like powers. (See Apostol, *Calculus*, Vol. 1, 2e, §1.3 for the construction of the decimal representation of reals.)

## 8. Visual — diagram or schematic

```text
Addition alignment example
  2 . 3 4
+ 1 . 7 0     ← trailing zero inserted
-----------
  4 . 0 4     ← columns of equal powers line up vertically
```

The vertical bars mark identical powers of ten; any horizontal shift changes the represented value.

## 9. The memory technique

1. **The hook** — Picture the decimal point as a fence post; every digit to its right sits on a smaller and smaller plot of land whose size is exactly one-tenth the plot to its left.  
2. **What to overlearn** — (a) Count decimal places for multiplication and division; (b) align points before adding or subtracting; (c) carry/borrow rules never change.  
3. **Spaced-repetition schedule** — Review alignment drills at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Rewrite every decimal as a fraction whose denominator is a power of ten, perform ordinary fraction arithmetic, then convert the result back.

## 10. What this unlocks

Mastery of decimal arithmetic supplies the computational substrate for scientific notation, significant-figure rules, and floating-point analysis.  

- Next: operations with scientific notation  
- Next: rounding and significant digits  
- Next: conversion between fractions and terminating decimals  
- Next: introduction to real-number completeness via infinite decimals

## 11. Self-check — five questions, no answers

1. Compute 0.999 + 0.001 exactly and explain why the result is not 1.000 in every representation.  
2. Without a calculator, evaluate 0.125 × 0.8 and state the number of decimal places used.  
3. Show that 1.23 ÷ 0.03 yields an integer and identify which place-count rule guarantees this.  
4. A student adds 4.56 + 7.8 by writing 4.56 + 7.8 = 12.36. Identify the precise column error.  
5. Construct a subtraction problem in which a borrow crosses the decimal point twice; solve it and verify by addition.