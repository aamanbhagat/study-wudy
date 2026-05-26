## 1. The one-sentence answer

**A percentage expresses a ratio as a fraction of 100.**

Any quantity can be compared to a whole by scaling that comparison so the whole equals 100 parts; the number of those parts is the percentage. This scaling turns awkward fractions into a uniform language that works identically for discounts, error rates, growth, and probabilities. Once the scaling is understood, every percentage question reduces to multiplication or division by the same factor of 100.

The same mechanism handles three related tasks. To find what percent one number is of another, divide and multiply by 100. To find a given percent of a quantity, multiply the quantity by the percent written as a fraction over 100. To compute a percent increase or decrease, divide the change by the original value and again multiply by 100.

> [!NOTE]
> The single mental move that unlocks every percentage problem is rewriting “per cent” as “per 100,” which converts every question into ordinary multiplication or division by the constant 100.

## 2. Why this matters — concrete and current

NASA’s Jet Propulsion Laboratory reports propellant mass fractions as percentages when designing trajectory corrections for the Perseverance rover; a 2.3 % shortfall in fuel load directly determines whether a mid-course burn remains feasible within the remaining delta-v budget.

In semiconductor manufacturing, TSMC publishes yield percentages for each process node; a 0.8 % improvement in wafer yield at the 3 nm node translates into millions of additional functional chips per month and directly affects unit cost.

Machine-learning papers at NeurIPS routinely state test-accuracy gains as relative percentages; when a new optimizer improves ImageNet top-1 accuracy from 85.2 % to 86.1 %, the 1.06 % relative lift is the figure used to justify adoption in production pipelines at Google and Meta.

Central banks publish month-on-month CPI changes as percentages; the Federal Reserve’s 0.4 % October 2023 reading determines whether the federal-funds-rate path shifts by 25 basis points at the next FOMC meeting.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Place value and powers of ten | Converting between decimals and percentages requires shifting the decimal point two places. |
| Multiplication and division of integers and decimals | Every percentage calculation is a multiplication or division by 100 or by a fraction whose denominator is 100. |
| Fraction notation    | A percentage is literally a fraction whose denominator has been scaled to 100. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Percent means “per hundred”
One hundred is chosen as the reference scale because it produces convenient two-digit numbers for most everyday ratios.  
Example: 23 out of 100 students scored above 90 %.  
Formal statement:  
$$ p = \frac{a}{b} \times 100 $$
where \( p \) is the percentage, \( a \) is the part, and \( b \) is the whole.

> [!WARNING]
> Treating the word “percent” as a unit rather than as a scaling instruction leads to forgetting to multiply or divide by 100.

### Step 2 — Convert any fraction to a percentage
Divide numerator by denominator, then multiply the result by 100.  
Example: \( \frac{3}{8} = 0.375 \), so \( 0.375 \times 100 = 37.5 \).  
Formal statement:  
$$ p = \left( \frac{a}{b} \right) \times 100 $$

> [!WARNING]
> Stopping after the division produces a decimal; the final multiplication by 100 is required to reach the percentage.

### Step 3 — Find a given percentage of a quantity
Rewrite the percentage as a fraction over 100, then multiply by the quantity.  
Example: 15 % of 240 is \( 0.15 \times 240 = 36 \).  
Formal statement:  
$$ x = \frac{p}{100} \times q $$

> [!WARNING]
> Using the percentage number directly (for example, 15 × 240) overstates the result by a factor of 100.

### Step 4 — Find what percentage one quantity is of another
Divide the part by the whole, then multiply by 100.  
Example: 36 is what percent of 240? \( \frac{36}{240} \times 100 = 15 \).  
Formal statement:  
$$ p = \frac{x}{q} \times 100 $$

> [!WARNING]
> Reversing the division (whole divided by part) produces a number larger than 100 when the part is smaller than the whole.

### Step 5 — Compute percentage increase or decrease
Divide the absolute change by the original value, then multiply by 100.  
Example: price rises from 80 to 92; change = 12, so \( \frac{12}{80} \times 100 = 15 \).  
Formal statement:  
$$ p = \frac{|x_{\text{new}} - x_{\text{old}}|}{x_{\text{old}}} \times 100 $$

> [!WARNING]
> Using the new value instead of the original value in the denominator yields an incorrect relative change.

### Step 6 — Textbook definition
A percentage is a dimensionless ratio scaled so that the reference quantity equals 100. All operations above are instances of this single definition.

## 5. Worked examples — every step shown

**Example 1 — Convert a fraction to a percentage**  
*Given:* \( \frac{7}{25} \).  
*Find:* the equivalent percentage.  
Divide 7 by 25: \( 7 \div 25 = 0.28 \).  
*Why:* the division produces the decimal form of the fraction.  
Multiply by 100: \( 0.28 \times 100 = 28 \).  
*Why:* the multiplication scales the ratio to a denominator of 100.  
**28**

*Reflection:* The only arithmetic required is division followed by a decimal shift; the same pattern appears in every later example.

**Example 2 — Find a percentage of a quantity**  
*Given:* 28 % of 450.  
*Find:* the numerical result.  
Rewrite 28 % as \( \frac{28}{100} = 0.28 \).  
*Why:* the fraction-over-100 form permits direct multiplication.  
Multiply: \( 0.28 \times 450 = 126 \).  
*Why:* multiplication by the decimal yields the required part.  
**126**

*Reflection:* Forgetting to convert the percent symbol into a decimal is the most common source of a factor-of-100 error.

**Example 3 — Determine what percent one quantity is of another**  
*Given:* 126 out of 450.  
*Find:* the percentage.  
Divide: \( 126 \div 450 = 0.28 \).  
*Why:* the ratio must be formed with the part in the numerator.  
Multiply by 100: \( 0.28 \times 100 = 28 \).  
*Why:* scaling restores the “per hundred” unit.  
**28 %**

*Reflection:* The calculation is exactly the inverse of Example 2, confirming the operations are mutual inverses.

**Example 4 — Calculate a percentage decrease**  
*Given:* A price falls from 450 to 324.  
*Find:* the percentage decrease.  
Compute the change: \( 450 - 324 = 126 \).  
*Why:* absolute change is required before relative scaling.  
Divide by original: \( 126 \div 450 = 0.28 \).  
*Why:* the original value is the correct reference.  
Multiply by 100: \( 0.28 \times 100 = 28 \).  
*Why:* the final factor produces the percentage.  
**28 % decrease**

*Reflection:* Using 324 in the denominator would have produced an inflated 38.9 % figure; the original value must always serve as the base.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating “%” as a unit to multiply | The symbol is misread as a multiplier rather than a scaling instruction | Always rewrite % as “/100” before any arithmetic |
| Using the new value as the base for % change | Intuition confuses “of the final amount” with “relative to the starting amount” | Explicitly label the denominator as the original value |
| Adding percentages of different wholes | The reference quantities are tacitly assumed identical | Verify that both percentages share the same base quantity |
| Forgetting to multiply by 100 after division | The intermediate decimal is mistaken for the final answer | Write the ×100 step explicitly on every line |
| Confusing “percent of” with “percent more than” | Linguistic ambiguity between absolute and relative statements | Translate the English phrase into the fraction form before calculating |
| Rounding intermediate decimals too early | Accumulated rounding error exceeds the required precision | Keep at least four decimal places until the final multiplication by 100 |
| Dividing by zero when the original quantity is zero | The problem statement contains an undefined relative change | Check that the base quantity is nonzero before division |

## 7. The textbook-precise statement

A percentage is the number \( p \) such that  
$$ p = 100 \times \frac{a}{b}, \quad b \neq 0, $$  
where \( a \) and \( b \) are real numbers and the ratio \( a/b \) is dimensionless. Percentage increase or decrease between an original value \( x_0 \) and a new value \( x_1 \) is  
$$ p = 100 \times \frac{x_1 - x_0}{x_0}, \quad x_0 \neq 0. $$  
(See Lang, *Basic Mathematics*, 1971, Chapter 3, §3.2.)

## 8. Visual — diagram or schematic

```text
Whole quantity b
┌────────────────────────────────────────────┐
│                                            │
│   Part a              (100 - p)%           │  p%
│  ┌──────────────┐     of b                 │ of b
│  │              │                          │
│  └──────────────┘                          │
│  <--- scaled to 100 parts total ---------->│
└────────────────────────────────────────────┘
          a/b = p/100
```

The diagram shows the whole quantity partitioned into a part that corresponds to p percent and the complementary remainder; the vertical line at the right edge marks the 100-part reference.

## 9. The memory technique

**The hook**  
Picture a 100-seat lecture hall; the percentage is simply the count of occupied seats when the hall is declared “full” at 100.

**What to overlearn**  
1. \( p = \frac{a}{b} \times 100 \)  
2. Percent of quantity: multiply by \( \frac{p}{100} \)  
3. Percent change: divide change by original value, then ×100

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

**First-principles fallback**  
Return to the definition “parts per hundred,” rewrite every percentage literally as a fraction whose denominator is 100, and recompute the required multiplication or division.

## 10. What this unlocks

Percentages supply the uniform numerical language required for ratios, proportions, growth models, and statistical summaries.  

- Direct entry into ratio and proportion problems in algebra  
- Compound-growth formulas in finance and population dynamics  
- Error analysis and relative tolerances in physics and engineering  
- Normalization layers and accuracy metrics inside machine-learning pipelines  

## 11. Self-check — five questions, no answers

1. Convert \( \frac{19}{80} \) to a percentage.  
2. Calculate 37 % of 680.  
3. 153 is what percent of 850?  
4. A measurement drops from 2400 to 2184. What is the percentage decrease?  
5. A price is first increased by 20 % and then decreased by 20 %. Is the final price equal to the original price? Explain without computing a specific number.