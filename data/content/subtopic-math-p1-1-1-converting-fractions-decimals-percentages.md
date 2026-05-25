## What it is
Converting between fractions, decimals, and percentages is the process of translating a single numerical value into three equivalent formats. A fraction expresses a part of a whole as a ratio of integers, a decimal represents it using base-10 positional notation, and a percentage scales that value to a standardized denominator of 100.

## Why it matters
You cannot do physics or engineering without fluidly translating between these forms. In rocket science, a propellant mass fraction might be written as $0.85$, $85\%$, or $17/20$, and you must instantly recognize they are identical to plug them into the Tsiolkovsky rocket equation. In machine learning, probabilities are computed as decimals (e.g., $0.999$) but often communicated as percentages ($99.9\%$), while their underlying logic is built on fractional combinatorics. 

## When to study it
You must already understand:
1. Basic division and long division.
2. Place value in the base-10 number system (tenths, hundredths, thousandths).
3. The concept of a fraction (numerator and denominator) and how to simplify them. 
If you cannot confidently simplify $\frac{14}{21}$ to $\frac{2}{3}$ or explain what the '5' means in $0.05$, stop and review basic fractions and place value first.

## How to study it (step by step)
1. **Define percent literally:** "Per centum" is Latin for "by the hundred." Write out and internalize that $X\% = \frac{X}{100}$. 
2. **Master Fraction $\rightarrow$ Decimal:** Perform long division of the numerator by the denominator for common fractions (e.g., $\frac{1}{4}, \frac{3}{8}, \frac{1}{3}$). Do this by hand until the mechanics are second nature.
3. **Master Decimal $\rightarrow$ Fraction:** Read the decimal out loud using its proper place value name. For example, read $0.125$ as "one hundred twenty-five thousandths," which immediately gives you the fraction $\frac{125}{1000}$. Then simplify it.
4. **Master Decimal $\leftrightarrow$ Percent:** To go from decimal to percent, multiply by $100$ (shift the decimal point two places to the right). To go from percent to decimal, divide by $100$ (shift two places left). Understand *why*: multiplying by $100$ in base-10 inherently shifts place values.
5. **Drill the "Holy Grail" table:** Memorize the decimal and percent equivalents for all halves, thirds, quarters, fifths, eighths, and tenths. 

## Key ideas, with intuition

**1. The Identity of 1**
The number $1$ represents a complete whole. Therefore:
$$ 1 = 1.0 = \frac{x}{x} = 100\% $$
When you convert a decimal to a percentage by multiplying by $100\%$, you are mathematically multiplying by $1$. You are changing the *unit* (to hundredths), not the *value*.

**2. Decimals are hidden fractions**
A decimal is just a fraction whose denominator is a power of 10, dictated by the number of digits after the decimal point. 
$$ 0.abc = \frac{abc}{10^{\text{number of digits}}} = \frac{abc}{1000} $$

**3. Percent means "divide by 100"**
The $\%$ symbol is a mathematical operator. It literally means $\times \frac{1}{100}$. 
$$ 45\% = 45 \times \frac{1}{100} = \frac{45}{100} = 0.45 $$
If you treat the $\%$ sign as a variable that equals $0.01$, you will never make a conversion error.

## Worked example
**Problem:** Convert $\frac{3}{8}$ to a decimal, then to a percentage.

**Step 1: Fraction to Decimal (Long Division)**
Divide the numerator (3) by the denominator (8).
$$ 3 \div 8 = ? $$
Since 8 does not go into 3, we add a decimal point and zeros: $3.000 \div 8$.
- 8 goes into 30 three times ($8 \times 3 = 24$), remainder 6.
- Bring down a 0 (making 60). 8 goes into 60 seven times ($8 \times 7 = 56$), remainder 4.
- Bring down a 0 (making 40). 8 goes into 40 exactly five times ($8 \times 5 = 40$), remainder 0.
$$ \frac{3}{8} = 0.375 $$

**Step 2: Decimal to Percentage**
Multiply by $100\%$. 
$$ 0.375 \times 100\% = 37.5\% $$

**Reflection:** Long division maps the arbitrary ratio ($\frac{3}{8}$) into our standard base-10 system ($0.375$). Multiplying by $100\%$ shifts our reference frame from "parts of 1" to "parts of 100", making it easier for humans to compare relative sizes.

## Diagrams

```text
                 [ Fraction ]
                    a / b
                 /         \
  Read Place Value         Long Division
  & Simplify                  (a ÷ b)
               /             \
              v               v
     [ Percent ] <---------> [ Decimal ]
         X %       × 100       0.XYZ
                   ÷ 100
```
*Note: To go from Fraction directly to Percent, you can multiply the fraction by 100. However, routing through the Decimal form is usually less prone to arithmetic errors.*

## Memory technique — remember this forever
1. **The Visual Hook:** Look closely at the $\%$ symbol. It is literally a stylized fraction: a zero on top, a division slash, and a zero on the bottom ($\frac{0}{0}$). It is screaming at you: "Divide by 100!"
2. **Formulas to overlearn:**
   - $X\% = \frac{X}{100}$
   - $1 = 100\%$
3. **Spaced-repetition schedule:** Review your "Holy Grail" fraction conversions (especially eighths and thirds) at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **The First Principles Pathway:** If you forget whether to move the decimal left or right, remember that you can only multiply a number by $1$ without changing its value. Since $1 = \frac{100}{100}$, to turn $0.4$ into a fraction over 100, do this:
   $$ 0.4 \times \frac{100}{100} = \frac{40}{100} = 40\% $$

## Common mistakes
- **The single-digit decimal trap:** Students frequently convert $0.5$ to $5\%$. Remember place value: $0.5$ is five *tenths* ($\frac{5}{10}$), which is fifty *hundredths* ($\frac{50}{100}$). Therefore, $0.5 = 50\%$.
- **Mishandling micro-percentages:** Students see $0.2\%$ and write it as $0.2$ in decimal form. The $\%$ sign means divide by 100. $0.2\% = \frac{0.2}{100} = 0.002$.
- **Rounding repeating decimals prematurely:** Writing $\frac{1}{3} = 33\%$. This is mathematically false. $\frac{1}{3} = 33.\overline{3}\%$. In engineering, dropping that infinite tail will compound into catastrophic errors.

## Self-check
1. Convert $0.045$ to a fraction in simplest form, and then to a percentage.
2. Express $\frac{5}{6}$ as a percentage. Keep the exact repeating decimal notation.
3. A rocket burns $0.15\%$ of its total fuel mass every second. What exact fraction of the fuel is burned per second?