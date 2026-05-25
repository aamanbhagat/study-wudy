## What it is
A percentage is a fraction with a fixed denominator of 100, providing a standardized way to express proportions. Instead of comparing fractions with different denominators, we scale them to a common base of 100 to make relative sizes and rates of change instantly obvious.

## Why it matters
Percentages are the universal language of relative change, efficiency, and error analysis. In rocket science, you will use them to calculate mass fractions (the percentage of a rocket that is fuel versus payload) and margin of error in orbital trajectories. In machine learning, percentages quantify model accuracy, false-positive rates, and learning rate decay over time. 

## When to study it
You must already have a rock-solid understanding of fractions, decimals, and basic algebraic manipulation (specifically, factoring and solving linear equations of the form $ax = b$). If you cannot fluidly convert between fractions and decimals (e.g., instantly knowing that $3/4 = 0.75$), review those concepts first.

## How to study it (step by step)
1. **Master the translation:** Practice converting decimals to percentages and vice versa until it is automatic. To convert a decimal to a percent, multiply by 100 (shift the decimal right two places). 
2. **Derive the "of" operator:** Understand that in mathematics, the word "of" almost always translates to multiplication. Calculate $x\%$ of $y$ by multiplying $(x/100) \cdot y$.
3. **Solve the inverse:** Practice finding what percentage $A$ is of $B$ by setting up the algebraic equation $A = \frac{p}{100} \cdot B$ and solving for $p$.
4. **Analyze change:** Calculate percentage increase and decrease by finding the absolute difference first, then dividing by the *original* value, never the new value.
5. **Master scaling multipliers:** Instead of calculating a 20% increase as a two-step process ($x + 0.2x$), factor it to a single multiplier: $x(1 + 0.2) = 1.2x$. Practice applying these single-step multipliers.

## Key ideas, with intuition

**1. Percent means "per hundred"**
The symbol $\%$ is literally a shorthand for $\times \frac{1}{100}$. Whenever you see $x\%$, immediately translate it in your head to a decimal or fraction.
$$ 45\% = 45 \cdot \frac{1}{100} = 0.45 $$

**2. The Multiplier Effect (Crucial for advanced math)**
Do not calculate percentage changes by finding the chunk and adding it back. Use scaling multipliers. If a quantity $Q$ increases by $r\%$, the new quantity is:
$$ Q_{\text{new}} = Q + \left(\frac{r}{100} \cdot Q\right) $$
Factor out $Q$:
$$ Q_{\text{new}} = Q \left(1 + \frac{r}{100}\right) $$
The term $\left(1 + \frac{r}{100}\right)$ is your multiplier. For a $15\%$ increase, multiply by $1.15$. For a $15\%$ decrease, multiply by $(1 - 0.15) = 0.85$.

**3. Percentage Change is always relative to the past**
When calculating how much a value changed, the denominator must be the starting value. 
$$ \text{Percentage Change} = \frac{\text{New Value} - \text{Old Value}}{\text{Old Value}} \times 100 $$

## Worked example
**Problem:** A rocket's dry mass is $500\text{ kg}$. We add fuel, increasing its mass by $250\%$. Then, during a first-stage burn, it expends fuel and loses $40\%$ of its new total mass. What is the final mass?

**Step 1: Calculate the mass after fueling.**
The mass increases by $250\%$. The multiplier is $1 + \frac{250}{100} = 1 + 2.50 = 3.50$.
$$ M_{\text{fueled}} = 500 \cdot 3.50 = 1750\text{ kg} $$

**Step 2: Calculate the mass after the burn.**
The mass decreases by $40\%$. The multiplier is $1 - \frac{40}{100} = 1 - 0.40 = 0.60$.
$$ M_{\text{final}} = 1750 \cdot 0.60 = 1050\text{ kg} $$

**Reflection:** By using multipliers, we avoided messy intermediate additions and subtractions. Notice that a $250\%$ increase means the new value is $350\%$ of the original. We also see that consecutive percentage changes multiply; we could have solved this in one line: $500 \cdot 3.50 \cdot 0.60 = 1050$.

## Diagrams

```text
Percentage Increase via Multipliers

[Original Quantity: 100% or 1.0x]
|------------------------|
         |
+ 25% Increase (0.25x)   = [New Quantity: 125% or 1.25x]
|------|                 |------------------------------|
                         (Calculated directly via Q * 1.25)


Sequential Percentage Changes (Not Additive!)

Start: 100      +50% -> 150       -50% -> 75
|--------|      |------------|    |------|
(1.0)           (1.0 * 1.5)       (1.5 * 0.5 = 0.75)
```

## Memory technique — remember this forever
1. **The Hook:** To remember how to calculate percentage change, remember the acronym **NOO**: **N**ew minus **O**ld, over **O**ld. $\frac{N - O}{O}$.
2. **Formulas to overlearn:** 
   * Multiplier for increase: $1 + \frac{r}{100}$
   * Multiplier for decrease: $1 - \frac{r}{100}$
3. **Spaced-repetition schedule:** Review this concept and solve 2-3 problems at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the multiplier formula, write out the literal English translation in math: "Original plus the percentage of the original." $Q + (r/100)Q$. Factor out $Q$ to rebuild the formula.

## Common mistakes
* **Adding percentages sequentially:** If a stock drops $50\%$ and then gains $50\%$, you are not back to break-even. $100 \cdot 0.50 \cdot 1.50 = 75$. You are down $25\%$. Always multiply consecutive percentage changes; never add them.
* **Dividing by the new value:** When asked "What was the percentage increase?", students often calculate the difference and divide by the *new* larger number. Always divide by the *original* (old) number.
* **Confusing "% increase" with "% of":** A $300\%$ *increase* means you add $3\times$ the original amount, resulting in a final value that is $400\%$ *of* the original (multiplier = 4.0).

## Self-check
1. What is $12.5\%$ of $320$?
2. A telescope's price drops by $20\%$, then later increases by $25\%$. What is the net percentage change from the original price?
3. If a spacecraft's velocity increases by $p\%$, resulting in a final velocity $v_f$, write an algebraic expression for the original velocity $v_0$ in terms of $v_f$ and $p$.