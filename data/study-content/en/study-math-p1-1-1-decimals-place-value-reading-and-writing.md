## 1. The one-sentence answer
**A decimal is a numeral that uses a dot to separate the integer part from fractional parts whose place values are successive negative powers of ten.**

Every digit to the right of the decimal point occupies a position worth one-tenth, one-hundredth, one-thousandth, and so on of the place immediately to its left. This single rule extends the entire base-ten system without introducing new symbols. Once the positions are fixed, reading a decimal is simply naming each digit together with its place-value name, and writing one is the reverse process of assigning digits to those positions.

The system works because ten is the base: each rightward move divides the previous value by ten. Therefore 0.347 means three tenths plus four hundredths plus seven thousandths, which equals the fraction 347/1000. The notation is compact, yet every digit retains an unambiguous numerical weight.

> [!NOTE]
> The decimal point does not “move” value; it merely marks the boundary between positive and negative powers of ten. Shifting the point is equivalent to multiplying or dividing by a power of ten.

## 2. Why this matters — concrete and current
In semiconductor fabrication, mask-alignment tolerances are expressed in nanometers; a 3.2 nm overlay error is recorded and compared directly in decimal form inside ASML’s process-control software.  
Financial exchanges such as NASDAQ store bid–ask spreads to four decimal places; an order for 500 shares at 142.3750 is parsed by matching engines whose arithmetic is performed entirely in decimal fixed-point representation.  
NASA’s Deep Space Network telemetry packets encode spacecraft distances in decimal kilometers with micro-kilometer precision; the 2023 Psyche mission ephemeris listed a range of 378 942.317 km at epoch.  
Machine-learning frameworks store learning-rate schedules as decimals (e.g., 0.0003); every gradient update in PyTorch or TensorFlow multiplies the current parameter tensor by this exact decimal scalar.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Whole-number place value | Supplies the left side of the decimal point and the counting sequence 1, 10, 100, … |
| Powers of ten            | Negative exponents give the exact value of each right-hand place |
| Fraction notation        | Allows conversion between 0.25 and 1/4 when verification is required |

## 4. Building the idea — from intuition to formalism

### Step 1 — Extending the place-value chart rightward
The same sequence of multipliers used for whole numbers continues past the units place, but each step now divides by ten.  
Example: the number 5.3 has a 5 in the units place and a 3 in the tenths place.  
Formal statement: the place immediately right of the decimal point has weight \(10^{-1}\).  
> [!WARNING] Treating the first right-hand digit as “one tenth of the digit to its left” instead of “one tenth of one unit” produces systematic under- or over-estimation.

### Step 2 — Successive negative powers
Each additional place multiplies the previous weight by \(1/10\).  
Example: 0.07 contains a 7 in the hundredths place, worth \(7 \times 10^{-2}\).  
Formal statement: the \(k\)-th digit after the decimal point is multiplied by \(10^{-k}\).  
> [!WARNING] Reversing the direction of the exponents (writing \(10^{+2}\) for hundredths) inverts the magnitude and yields answers 10 000 times too large or too small.

### Step 3 — Naming a decimal aloud
Read the integer part first, say “point,” then read the remaining digits as a single group followed by the name of the rightmost place.  
Example: 23.048 is “twenty-three point zero four eight” or “twenty-three and forty-eight thousandths.”  
Formal statement: the spoken name concatenates the integer word, the word “point,” and the digit string together with the place-value noun of the final digit.

### Step 4 — Writing a decimal from words
Identify the rightmost place named, place that digit in the corresponding column, fill leftward with the remaining digits, and insert the decimal point at the units boundary.  
Example: “seven hundred twelve thousandths” becomes 0.712.  
Formal statement: given a fraction whose denominator is \(10^k\), write its numerator so that its last digit occupies the \(10^{-k}\) column.

### Step 5 — Empty places and leading zeros after the point
A zero in any place simply contributes zero to the sum; leading zeros after the point do not alter value but may be required for alignment.  
Example: 0.030 = 3 hundredths.  
Formal statement: \(0 \times 10^{-m} = 0\) for any positive integer \(m\).

### Step 6 — The general decimal expansion
Any finite decimal \(d_n d_{n-1} \dots d_1 d_0 . d_{-1} d_{-2} \dots d_{-k}\) equals  
\[
\sum_{i=-k}^{n} d_i \cdot 10^i
\]  
where each \(d_i\) is an integer digit, \(0 \leq d_i \leq 9\).

## 5. Worked examples — every step shown

**Example 1 — Single-digit decimal**  
*Given:* the numeral 0.4.  
*Find:* its value as a sum of place values.  
Step 1: locate the decimal point.  
*Why:* the point separates units from tenths.  
Step 2: the digit 4 occupies the first column right of the point.  
*Why:* that column is \(10^{-1}\).  
Step 3: compute \(4 \times 10^{-1} = 0.4\).  
*Why:* multiplication by the place weight yields the contribution.  
**0.4**

*Reflection:* the example isolates the definition of the tenths place; the same pattern scales to any number of digits.

**Example 2 — Mixed integer and decimal**  
*Given:* 17.25.  
*Find:* expanded form.  
Step 1: 1 is in the tens place: \(1 \times 10^1\).  
*Why:* two places left of the point.  
Step 2: 7 is in the units place: \(7 \times 10^0\).  
*Why:* immediately left of the point.  
Step 3: 2 is in the tenths place: \(2 \times 10^{-1}\).  
*Why:* first place right of the point.  
Step 4: 5 is in the hundredths place: \(5 \times 10^{-2}\).  
*Why:* second place right of the point.  
**17.25 = \(1 \times 10 + 7 \times 1 + 2 \times 0.1 + 5 \times 0.01\)**

*Reflection:* both positive and negative powers appear together; the decimal point is the sole boundary marker.

**Example 3 — Reading to thousandths**  
*Given:* 0.003.  
*Find:* its spoken name and fraction equivalent.  
Step 1: three places right of the point → thousandths.  
*Why:* each place adds one more negative power.  
Step 2: read “three thousandths.”  
*Why:* the final place determines the denominator name.  
Step 3: \(3 \times 10^{-3} = 3/1000\).  
**0.003 = three thousandths = 3/1000**

*Reflection:* leading zeros after the point do not change value but must be counted when naming the place.

**Example 4 — Writing from words**  
*Given:* “four hundred seven ten-thousandths.”  
*Find:* the decimal numeral.  
Step 1: ten-thousandths is the fourth place right of the point.  
*Why:* \(10^{-4}\).  
Step 2: write 0407 with the 7 in the fourth column.  
*Why:* the numerator 407 must occupy the last four places.  
Step 3: insert the decimal point before the first of those places.  
**0.0407**

*Reflection:* the phrase “ten-thousandths” fixes the length of the decimal string; padding with zeros preserves place alignment.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Reading 0.05 as “five hundredths” but writing 0.5 | Confusing the place name with the digit count       | Count places from the point each time                |
| Treating 0.10 and 0.1 as different values         | Belief that trailing zeros add magnitude            | Drop trailing zeros only after the value is verified |
| Shifting the decimal point instead of multiplying | Mechanical rule learned without place-value meaning | Always multiply by the explicit power of ten         |
| Naming 0.0023 as “twenty-three ten-thousandths”   | Stopping at the first non-zero digit                | Name the place of the rightmost digit                |
| Writing 2.5 as 2.05 when converting from 205/100  | Miscounting the required decimal places             | Write the denominator power first, then place digits |
| Ignoring leading zeros after the point in addition| Assuming they are insignificant for alignment       | Align all numbers by the decimal point before operating |
| Confusing 10^{-2} with 2/10                       | Mixing exponent with numerator                      | Write the power of ten explicitly before simplifying |

## 7. The textbook-precise statement
A finite decimal expansion of a real number \(x\) is any expression  
\[
x = \sum_{k=-m}^{n} d_k 10^k, \quad d_k \in \{0,1,\dots,9\},
\]  
where \(m,n\) are non-negative integers. The decimal point is the separator between the terms with non-negative and negative exponents. (See: Apostol, *Calculus, Vol. 1*, 2nd ed., §1.2.)

## 8. Visual — diagram or schematic
```text
Place-value chart (powers of 10)

... | 1000 | 100 | 10 | 1 | . | 0.1 | 0.01 | 0.001 | 0.0001 | ...
    | 10^3 |10^2 |10^1|10^0|   |10^{-1}|10^{-2}|10^{-3}|10^{-4} | ...
Digit positions:      thousands | hundreds | tens | units | . | tenths | hundredths | thousandths | ...
Example number 3  4  7 . 8  2
                    3×10^3  4×10^2  7×10^1  .  8×10^{-1}  2×10^{-2}
```

## 9. The memory technique

1. **The hook** — Picture the decimal point as a mirror standing on the units place; every digit on the right is the mirror image of a whole-number place but divided by ten for each step away from the mirror.  
2. **What to overlearn** — The sequence of place names and their exact powers: tenths \(10^{-1}\), hundredths \(10^{-2}\), thousandths \(10^{-3}\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive any place value by repeated division by ten starting from the units place.

## 10. What this unlocks
Mastery of decimal place value is the direct prerequisite for every subsequent arithmetic operation on decimals, for conversion between decimals and fractions, and for scientific notation.  
- Addition and subtraction of decimals (alignment by place)  
- Multiplication and division by powers of ten (moving the decimal point)  
- Rounding and significant-figure rules in measurement  
- Floating-point representation in computer arithmetic

## 11. Self-check — five questions, no answers
1. Write 0.0007 in words and as a fraction with denominator a power of ten.  
2. Expand 302.045 into a sum of digit × power-of-ten terms.  
3. A measurement is recorded as “twelve and seven hundredths.” Write the decimal and state the value of the digit 7.  
4. Which is larger, 0.029 or 0.03? Justify using place-value comparison without converting to fractions.  
5. If the digit in the hundredths place of a number is increased by 1 while all other digits stay fixed, by how much does the number change? Give both a numerical answer and a general rule.