## 1. The one-sentence answer
**A fraction, decimal, and percentage are three different notations for the exact same rational number.**

A fraction writes the number as a ratio of two integers. A decimal writes it using powers of ten after a point. A percentage writes it as parts per hundred. These are not separate ideas; they are interchangeable labels for one quantity.

To move between them you only ever multiply or divide by powers of ten or perform the division the fraction itself encodes. The arithmetic never invents new information; it merely rewrites the place-value representation.

The single deepest fact is that every terminating or repeating decimal is exactly equal to some fraction whose denominator in lowest terms has no prime factors other than 2 and 5 (for terminating decimals) or is finite in length (for repeating decimals).

> [!NOTE]
> Once you see that “percent” literally means “per hundred,” every conversion collapses to multiplying or dividing by 100; the rest is bookkeeping.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover transmits science data whose error rates are reported as percentages (e.g., 0.03 % packet loss). Engineers convert those percentages to fractions to decide how many redundant bits to allocate in the CCSDS telemetry standard.

Modern portfolio theory, as implemented in BlackRock’s Aladdin platform, stores asset weights internally as decimals between 0 and 1; regulatory reports must display the same weights as percentages rounded to two decimal places. A rounding error of 0.01 % on a $10 billion fund is a $1 million discrepancy.

In semiconductor yield analysis, TSMC reports fab yield both as a percentage and as a decimal fraction of good dies per wafer. Process-control scripts compare the decimal form directly against Poisson defect models whose parameters are fractions.

Clinical-trial protocols at Pfizer express adverse-event incidence first as exact fractions (17 patients out of 2 348) and then convert to percentages for FDA filings; the conversion must preserve enough significant figures to satisfy ICH E3 statistical guidelines.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Place value          | Decimal positions are negative powers of ten.             |
| Long division        | Converting a fraction to a decimal is exactly that division. |
| Multiplication by powers of ten | Shifting between decimals and percentages.          |
| Greatest common divisor | Reducing fractions before conversion avoids unnecessary work. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A fraction is already a division problem
A fraction \( \frac{a}{b} \) means “divide a into b equal parts.”  
Example: \( \frac{3}{4} \) asks how many times 4 fits into 3.  
Formal statement:  
\[ \frac{a}{b} = a \div b \]  
> [!WARNING] Treating the fraction bar as mere decoration instead of an active division sign produces decimals that are off by orders of magnitude.

### Step 2 — Perform the division to obtain a decimal
Divide numerator by denominator using long division; the quotient is the decimal.  
Example: \( 3 \div 4 = 0.75 \).  
Formal statement:  
\[ \frac{a}{b} = q \quad \text{where} \quad q \text{ is the decimal quotient.} \]

### Step 3 — Move the decimal point two places to create a percentage
Multiply the decimal by 100 (shift the point two places right) and append the % symbol.  
Example: \( 0.75 \times 100 = 75\% \).  
Formal statement:  
\[ d \times 100 = p\% \]

### Step 4 — Reverse the percentage arrow
Divide a percentage by 100 (shift the point two places left) to recover the decimal.  
Example: \( 75\% \div 100 = 0.75 \).

### Step 5 — Convert a terminating decimal back to a fraction
Write the decimal digits over the appropriate power of ten and reduce.  
Example: \( 0.75 = \frac{75}{100} = \frac{3}{4} \).

### Step 6 — Convert any percentage directly to a fraction
Drop the % sign, place the number over 100, and reduce.  
Example: \( 75\% = \frac{75}{100} = \frac{3}{4} \).

### Step 7 — The three forms are identical by construction
Because each step above is an equality-preserving transformation,  
\[ \frac{a}{b} = d = p\% \]  
holds for the same rational number.

## 5. Worked examples — every step shown

**Example 1 — Simple terminating case**  
*Given:* \( \frac{1}{2} \)  
*Find:* decimal and percentage.  
Divide: \( 1 \div 2 = 0.5 \).  
*Why:* The fraction bar is division.  
Shift: \( 0.5 \times 100 = 50\% \).  
*Why:* Percent means per hundred.  
**0.5 and 50 %**  

*Reflection:* The denominator 2 is a factor of 10, so termination is immediate; this pattern generalises to any denominator whose primes are only 2 or 5.

**Example 2 — Two-step reduction required**  
*Given:* 35 %  
*Find:* lowest-term fraction.  
Decimal: \( 35 \div 100 = 0.35 \).  
*Why:* Remove the percent.  
Fraction: \( 0.35 = \frac{35}{100} \).  
*Why:* Two decimal places give denominator 100.  
Reduce: divide numerator and denominator by 5 → \( \frac{7}{20} \).  
*Why:* GCD removes common factors.  
**\( \frac{7}{20} \)**  

*Reflection:* Always reduce after conversion; otherwise later arithmetic carries unnecessary factors.

**Example 3 — Repeating decimal**  
*Given:* \( \frac{2}{3} \)  
*Find:* decimal and percentage to three places.  
Division yields \( 0.\overline{6} \).  
*Why:* Long division never terminates.  
Approximate decimal: 0.667 (rounded).  
*Why:* Three places give the required precision.  
Percentage: \( 0.667 \times 100 \approx 66.7\% \).  
**\( 0.\overline{6} \), 66.7 % (approx.)**  

*Reflection:* Repeating decimals require explicit rounding rules when mapping to percentages.

**Example 4 — Mixed number to percentage**  
*Given:* \( 2\frac{3}{8} \)  
*Find:* percentage.  
Convert to improper fraction: \( \frac{19}{8} \).  
*Why:* Single fraction is easier to divide.  
Decimal: \( 19 \div 8 = 2.375 \).  
*Why:* Integer part stays left of the point.  
Percentage: \( 2.375 \times 100 = 237.5\% \).  
**237.5 %**  

*Reflection:* Mixed numbers are first rewritten as improper fractions; the rest follows the standard pipeline.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to multiply by 100 | “Percent” is treated as cosmetic            | Always write the ×100 step explicitly        |
| Moving the point the wrong direction | Left/right confusion under time pressure   | Remember: % → decimal needs left shift       |
| Leaving a repeating decimal unreduced | Division stops too early                    | Continue division until pattern repeats      |
| Using 1000 instead of 100 for three-place decimals | Place-value miscount                        | Count digits after the point, not before     |
| Cancelling before converting | Cancelling across a later multiplication    | Reduce only after the final fraction appears |
| Rounding intermediate decimals | Premature rounding destroys exact equality  | Keep the exact fraction until the last step  |
| Treating 100 % as 100 instead of 1 | Integer habit overrides ratio meaning       | Write 100 % = 1 explicitly on first use      |

## 7. The textbook-precise statement
Let \( r \) be a rational number. Then there exist unique integers \( a, b \) with \( b > 0 \), \( \gcd(a,b)=1 \), a decimal \( d \), and a real number \( p \) such that  
\[ r = \frac{a}{b} = d = \frac{p}{100}. \]  
Any two of these representations determine the third by multiplication or division by the appropriate power of ten, followed by reduction when a fractional form is required. (See Lang, *Basic Mathematics*, 1971, Chapter 1, §4.)

## 8. Visual — diagram or schematic
```text
          Fraction  a/b
               │
               ▼  (divide)
          Decimal  d
       ↙          ↘
   ×100               ÷100
      │                 │
      ▼                 ▼
   Percentage p%     Decimal d   (round-trip)
```
Label: arrows show multiplication or division by 100; the vertical arrow is long division.

## 9. The memory technique

1. **The hook** — Picture a tiny “cent” coin stamped with “100”; moving between decimal and percentage is simply sliding that coin two places left or right on the number.
2. **What to overlearn** — \( d \times 100 = p\% \), \( p\% \div 100 = d \), and “percent = per hundred.”
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If memory fails, start from the definition: write the number over 100, perform the division, and reduce.

## 10. What this unlocks
Mastery of these conversions is presupposed by every subsequent arithmetic operation on rational numbers and by the introduction of ratios, rates, and proportions.

- Solving percent-change problems  
- Constructing and interpreting histograms and cumulative distribution functions  
- Working with probabilities expressed as fractions or decimals  
- Handling scientific notation and significant-figure rules  
- Transitioning to ratios and proportional reasoning in algebra

## 11. Self-check — five questions, no answers
1. Convert \( \frac{7}{25} \) to a decimal and then to a percentage.  
2. A price rises from 0.8 to 1.0 of its original value. Express both numbers as percentages and compute the percentage increase.  
3. Without a calculator, decide whether \( 0.4\overline{9} \) equals \( \frac{1}{2} \) exactly; justify.  
4. A sensor reports an error of 3 parts in 800. Write this error as a reduced fraction, a decimal, and a percentage.  
5. Identify the single arithmetic mistake that turns the correct conversion of \( \frac{5}{6} \) into the incorrect result 0.8̇3 %.