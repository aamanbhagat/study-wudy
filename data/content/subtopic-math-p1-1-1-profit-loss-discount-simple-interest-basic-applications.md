## What it is
Profit, loss, discount, and simple interest are practical applications of basic arithmetic and percentages. Profit and loss measure the absolute or relative change in value between buying and selling an asset. Discounts represent a proportional reduction from a nominal price, while simple interest models the linear growth of a principal amount over time at a constant rate.

## Why it matters
These concepts are your first formal encounter with rates of change, relative scaling, and linear models. In physics and aerospace, the linear growth model of simple interest is mathematically identical to constant-velocity kinematics ($x = x_0 + vt$). Percentage errors (structurally identical to profit/loss percentages) are crucial for tolerance analysis in engineering and evaluating loss functions in machine learning. Mastering these builds the intuition required for compound interest, which translates directly to exponential decay and differential equations later.

## When to study it
You must be entirely comfortable with fractions, decimals, and basic percentages (e.g., knowing instantly that $15\%$ is $0.15$ and that increasing a number by $15\%$ means multiplying by $1.15$). You also need basic algebra to solve linear equations of the form $ax = b$. If you cannot instantly convert a fraction to a percentage or solve for an unknown in a simple ratio, go back and drill those first.

## How to study it (step by step)
1. **Define the variables:** Write down the definitions of Cost Price ($CP$), Selling Price ($SP$), and Marked Price ($MP$). 
2. **Derive the relationships:** Write the equations linking $CP$ and $SP$ for both profit and loss. Understand why the base is always $CP$.
3. **Connect discount to the system:** Write the equation linking $MP$, discount, and $SP$. 
4. **Master the multipliers:** Practice writing percentage increases and decreases as single decimal multipliers. A $20\%$ profit means $SP = 1.20 \cdot CP$. A $15\%$ discount means $SP = 0.85 \cdot MP$.
5. **Derive Simple Interest:** Start with a principal $P$. Add a fraction $r$ of $P$ to it every year for $t$ years. Write out the resulting sequence to derive $I = P \cdot r \cdot t$.
6. **Solve word problems algebraically:** Take 5 mixed word problems. Translate the English directly into algebraic equations before doing any arithmetic. 

## Key ideas, with intuition

**1. The Base Principle**
Percentages are meaningless without a base. In these applications, the base is strictly defined by convention:
* Profit and Loss are *always* calculated on the Cost Price ($CP$).
* Discount is *always* calculated on the Marked Price ($MP$).
$$ \text{Profit } \% = \left( \frac{SP - CP}{CP} \right) \times 100 $$
$$ \text{Discount } \% = \left( \frac{MP - SP}{MP} \right) \times 100 $$

**2. The Multiplier Concept**
Do not calculate a percentage and then add or subtract it. Use multipliers. If you make a profit of $p$ (expressed as a decimal), your selling price is:
$$ SP = CP(1 + p) $$
If you offer a discount of $d$ (expressed as a decimal), your selling price is:
$$ SP = MP(1 - d) $$
Equating these gives the master relationship of retail math: $CP(1 + p) = MP(1 - d)$.

**3. Simple Interest is a Linear Function**
Simple interest assumes the growth rate applies only to the original amount, never to the accumulated growth. If $P$ is the principal, $r$ is the annual rate (as a decimal), and $t$ is time:
$$ \text{Interest}, I = P \cdot r \cdot t $$
$$ \text{Total Amount}, A = P + I = P(1 + rt) $$
Notice that $A(t) = (Pr)t + P$. This is exactly $y = mx + b$, where the slope $m$ is the annual interest $Pr$, and the y-intercept $b$ is the initial principal $P$.

## Worked example
**Problem:** A merchant marks up a widget by $40\%$ above its cost price, then offers a $15\%$ discount to the customer. What is the merchant's net profit percentage?

**Step 1: Assign a base value.**
Let Cost Price, $CP = 100$. (Using 100 makes the final absolute profit equal to the percentage).

**Step 2: Calculate Marked Price ($MP$).**
The markup is $40\%$ on the $CP$.
$$ MP = CP \times (1 + 0.40) = 100 \times 1.40 = 140 $$

**Step 3: Calculate Selling Price ($SP$).**
The discount is $15\%$ on the $MP$.
$$ SP = MP \times (1 - 0.15) = 140 \times 0.85 $$
$$ SP = 119 $$

**Step 4: Calculate Profit Percentage.**
$$ \text{Profit} = SP - CP = 119 - 100 = 19 $$
Because our base $CP$ was 100, the profit is exactly $19\%$.

*Reflection:* Notice why the answer is not $40\% - 15\% = 25\%$. The $40\%$ increase was applied to a smaller base ($100$), while the $15\%$ decrease was applied to a larger base ($140$). Multipliers chain multiplicatively, not additively: $1.40 \times 0.85 = 1.19$.

## Diagrams

```text
THE RETAIL PIPELINE

      + Markup %                      - Discount %
      ==========>                     ===========>
[ COST PRICE (CP) ]             [ MARKED PRICE (MP) ]
      |                                     |
      |                                     |
      +-------------------------------------+
        \                                 /
          \                             /
            \                         /
              + Profit % / - Loss %
              ===================>
            [ SELLING PRICE (SP) ]
```

## Memory technique — remember this forever
1. **The Mnemonic:** "Cost is the Root, Mark is the Roof." You grow your profit from the root (Cost Price), but you cut your discount from the roof (Marked Price).
2. **Must Overlearn:**
   * $SP = CP(1 \pm \text{rate})$ (+ for profit, - for loss)
   * $SP = MP(1 - \text{discount})$
   * $A = P(1 + rt)$
3. **Spaced-repetition schedule:** Review this concept and solve one complex word problem at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the formulas, remember: $\text{Final} = \text{Initial} + (\text{Rate} \times \text{Initial})$. Factor out the Initial to get $\text{Initial}(1 + \text{Rate})$. This single algebraic step derives every formula in this subtopic.

## Common mistakes
* **Calculating profit on Selling Price:** Students often divide profit by $SP$ instead of $CP$. A $\$20$ profit on an $\$80$ cost ($SP = \$100$) is a $25\%$ profit ($20/80$), not a $20\%$ profit ($20/100$).
* **Adding sequential percentages:** Assuming a $20\%$ increase followed by a $20\%$ decrease returns you to your starting value. It doesn't. $(1.20) \times (0.80) = 0.96$. You have lost $4\%$.
* **Mismatched units in Simple Interest:** Using an annual interest rate but plugging in time $t$ in months. If the rate is annual, $t$ must be in years. For 8 months, $t = 8/12$.

## Self-check
1. Calculate the simple interest accumulated on $\$750$ at an annual rate of $8\%$ over 9 months.
2. A shopkeeper gives a $10\%$ discount on a product and still makes a $26\%$ profit. If the cost price is $C$, what is the marked price in terms of $C$?
3. Derive the formula for the single effective discount rate $D_{eff}$ that is mathematically equivalent to applying two successive discounts, $d_1$ and $d_2$.