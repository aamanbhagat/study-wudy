## What it is
Operations on decimals encompass addition, subtraction, multiplication, and division of base-10 numbers that include a fractional component. It is the extension of standard integer arithmetic to continuous quantities, using a decimal point to separate whole numbers from fractions of powers of ten (tenths, hundredths, thousandths).

## Why it matters
In physics, aerospace, and computer science, integer quantities are extremely rare. Whether you are calculating the specific impulse of a rocket engine ($I_{sp} = 311.5$ seconds), adjusting a satellite's orbital velocity, or handling floating-point weights in a neural network, you are operating on decimals. Misplacing a decimal point by a single position results in a calculation error of an order of magnitude (a factor of 10), which is the difference between a successful orbital insertion and a catastrophic vehicle loss.

## When to study it
You must study this only after you have achieved absolute fluency in:
1. Integer arithmetic (addition, subtraction, multiplication, long division).
2. The concept of place value (units, tens, hundreds).
3. Basic fraction operations (specifically, understanding that $0.1 = \frac{1}{10}$ and $0.01 = \frac{1}{100}$).
If you cannot confidently multiply $\frac{3}{10} \times \frac{7}{100}$, pause and review basic fractions first.

## How to study it (step by step)
1. **Master Alignment (Addition & Subtraction):** Write 5 addition and 5 subtraction problems. Force yourself to pad the numbers with trailing zeros so they have the same number of digits after the decimal point.
2. **Derive Multiplication:** Take a problem like $0.2 \times 0.03$. Convert it to fractions: $\frac{2}{10} \times \frac{3}{100} = \frac{6}{1000} = 0.006$. Do this manually until you see *why* we sum the total number of decimal places.
3. **Practice Multiplication Algorithmically:** Perform 10 multiplication problems by ignoring the decimals, multiplying the integers, and then placing the decimal point by counting the total decimal places in the factors.
4. **Derive Division:** Take $1.25 \div 0.5$. Write it as a fraction: $\frac{1.25}{0.5}$. Multiply the numerator and denominator by $10$ to clear the decimal from the denominator: $\frac{12.5}{5}$. 
5. **Practice Division Algorithmically:** Perform 5 long division problems. Always shift the decimal point of the divisor to make it an integer, and shift the dividend's decimal point by the exact same amount.

## Key ideas, with intuition

**1. Place value is absolute (Addition/Subtraction)**
You cannot add meters to centimeters without converting them to the same unit. Similarly, you cannot add tenths to hundredths directly. The decimal point is the anchor. Aligning the decimal point ensures you are adding tenths to tenths and hundredths to hundredths.
$$ 2.3 + 1.04 \neq 3.34 \quad \text{(wrong alignment)} $$
$$ 2.30 + 1.04 = 3.34 \quad \text{(correct alignment)} $$

**2. Multiplication is fraction multiplication in disguise**
When you multiply decimals, you are multiplying numerators and multiplying denominators (which are always powers of 10). 
$$ a \times 10^{-n} \times b \times 10^{-m} = (a \times b) \times 10^{-(n+m)} $$
This algebraic property is the exact reason why you count the number of decimal places in the inputs and add them to find the decimal places in the output.

**3. Division relies on the identity property of 1**
Dividing by a decimal is conceptually awkward. We bypass this by multiplying the problem by $\frac{10^n}{10^n}$ (which equals 1, changing the look but not the value). We choose $n$ to make the divisor a whole number. 
$$ \frac{A}{B} = \frac{A \times 10^n}{B \times 10^n} $$

## Worked example
**Problem:** Evaluate $\frac{4.05 + 1.2}{0.15}$

**Step 1: Addition in the numerator**
Align the decimals. Pad $1.2$ with a zero.
$$ 4.05 $$
$$ + 1.20 $$
$$ \text{------} $$
$$ 5.25 $$
*Why it works: Aligning the decimal ensures we add hundredths to hundredths (5+0) and tenths to tenths (0+2).*

**Step 2: Set up the division**
We now have $5.25 \div 0.15$. 
Write as a fraction: $\frac{5.25}{0.15}$.

**Step 3: Shift the decimals**
Multiply numerator and denominator by $100$ (shift decimal right by 2 places) to make the divisor an integer.
$$ \frac{5.25 \times 100}{0.15 \times 100} = \frac{525}{15} $$
*Why it works: Scaling both quantities by the same factor preserves their ratio.*

**Step 4: Integer Division**
Perform long division on $525 \div 15$.
$15 \times 3 = 45$.
$52 - 45 = 7$. Bring down the 5 to make $75$.
$15 \times 5 = 75$.
Result: $35$.

## Diagrams

```text
ADDITION/SUBTRACTION: The Anchor
      Line up the decimal points!
      
        3 . 1 4 0  <-- Pad with zero
      + 0 . 0 0 2
      -----------
        3 . 1 4 2
          ^
          |
    Anchored here

MULTIPLICATION: The Shift
      Count decimal places, then shift left.

        0 . 1 2   (2 decimal places)
      x     0 . 3   (1 decimal place)
      -----------
            3 6   (Integer product of 12 x 3)
            
      Shift 3 places left (2 + 1 = 3):
      . _ _ _
        0 3 6  -> 0.036
```

## Memory technique — remember this forever
**1. The Hook:** 
* "Line up to build (Add/Sub)."
* "Count the pieces to scale (Mult)."
* "Shift the base to slice (Div)."

**2. Overlearn these rules:**
* **Add/Sub:** Decimal points MUST align vertically.
* **Mult:** (Places in Factor 1) + (Places in Factor 2) = (Places in Product).
* **Div:** Shift divisor's decimal to the end; shift dividend's decimal by the *exact same amount*.

**3. Spaced-repetition schedule:**
Review these rules and do one mixed-operation problem at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. First Principles Pathway:**
If you ever forget the rules, convert the decimals to fractions. 
$1.2 \times 0.3 \rightarrow \frac{12}{10} \times \frac{3}{10} = \frac{36}{100} = 0.36$. 
Fractions never lie. They will immediately remind you how the decimal point should behave.

## Common mistakes
1. **Misalignment in Addition:** Writing $3.2 + 1.15$ and adding the $2$ and the $5$ because they are both the "last digit". Always align the decimal point, not the right-most digit.
2. **Trailing Zeros in Multiplication:** Calculating $0.5 \times 0.4 = 20$, counting two decimal places, and writing $0.02$. The integer math is $5 \times 4 = 20$. Shifting two places left from $20$ yields $0.20$ (or $0.2$). Do not drop the zero *before* you shift the decimal.
3. **Shifting Dividend but not Divisor:** When calculating $1.44 \div 1.2$, a student might write $144 \div 1.2$. You must shift *both* by the same amount: $14.4 \div 12$.

## Self-check
1. Evaluate: $104.3 - 8.055$
2. Evaluate: $0.004 \times 0.75$
3. Evaluate: $\frac{0.081}{0.009} - (1.2 \times 0.5)$