## What it is
A ratio is a quantitative comparison between two or more amounts, showing how many times one value contains or is contained within the other. A proportion is simply an equation stating that two ratios are strictly equivalent. Dividing in a ratio means splitting a total quantity into fractional parts dictated by the ratio's specific proportions.

## Why it matters
Proportional reasoning is the bedrock of dimensional analysis, scaling laws, and linear algebra. In aerospace, rocket engines rely on precise mixture ratios of fuel to oxidizer; a slight deviation from the optimal proportion will drastically reduce specific impulse ($I_{sp}$) or melt the engine. In machine learning, gradients are ratios of change; understanding how parameters scale proportionally is required for tuning learning rates and normalizing data. 

## When to study it
You must have a rock-solid grasp of:
1. Basic arithmetic (multiplication and division).
2. Fractions (simplifying fractions, finding equivalent fractions).
3. Greatest Common Divisors (GCD) and Lowest Common Multiples (LCM).

If you cannot instantly simplify $\frac{24}{36}$ to $\frac{2}{3}$, stop and review fractions before proceeding.

## How to study it (step by step)
1. **Define the Base Unit:** Write down the ratio $a:b$ and translate it algebraically to $ax$ and $bx$, where $x$ is the unknown size of one "part".
2. **Master Equivalent Ratios:** Practice scaling ratios up and down. Multiply or divide all parts of a ratio by the same scalar. Recognize that $2:3$ is identical to $4:6$ and $20:30$.
3. **Convert Ratio to Fraction:** Translate part-to-part ratios into part-to-whole fractions. For a ratio $a:b$, the whole is $a+b$. The fractions are $\frac{a}{a+b}$ and $\frac{b}{a+b}$.
4. **Learn the "Unitary Method":** To divide a total amount $T$ into a ratio $a:b$, first find the sum of the parts ($a+b$). Divide $T$ by this sum to find the value of exactly *one* part.
5. **Reconstruct the Whole:** Multiply the value of one part by $a$ and $b$ to find the final quantities. Add them back together to verify they equal $T$.

## Key ideas, with intuition

**1. Ratios are multiplicative, not additive.** 
If you have a ratio of $2:3$, you cannot maintain the proportion by adding $1$ to both sides ($3:4$). You must multiply by a scalar $k$. The equivalent ratio is $2k : 3k$.

**2. The Algebraic "Parts" Concept**
Whenever you see a ratio like $a:b:c$, immediately imagine a single, fundamental building block of size $x$. 
The quantities are simply $ax$, $bx$, and $cx$. 
The total quantity $T$ is the sum of these blocks:
$$T = ax + bx + cx = (a+b+c)x$$
This transforms a confusing arithmetic sharing problem into a trivial linear equation.

**3. Proportions as Equations**
If you are told $a:b$ is proportional to $c:d$, write it as equivalent fractions:
$$\frac{a}{b} = \frac{c}{d}$$
From here, you can isolate any unknown using standard algebra (e.g., cross-multiplication, which is just multiplying both sides by $bd$).

## Worked example
**Problem:** A 1200 kg batch of rocket propellant must be mixed in a fuel-to-oxidizer ratio of $3:5$. How much of each is required?

**Step 1: Define the parts algebraically.**
Let the size of one part be $x$. 
Fuel = $3x$
Oxidizer = $5x$

**Step 2: Set up the total equation.**
The total mass is the sum of the parts.
$$3x + 5x = 1200$$
$$8x = 1200$$

**Step 3: Solve for the base unit ($x$).**
$$x = \frac{1200}{8} = 150 \text{ kg}$$
*(One "part" is exactly 150 kg).*

**Step 4: Calculate the specific amounts.**
Fuel = $3(150) = 450 \text{ kg}$
Oxidizer = $5(150) = 750 \text{ kg}$

**Reflection:** Why did this work? By defining $x$, we established a common unit of scaling. We invoked the conservation of mass ($3x + 5x = \text{Total}$) to find the size of that unit, ensuring the final amounts maintain the exact $3:5$ relationship while summing perfectly to the required 1200 kg.

## Diagrams

```text
Total Propellant = 1200 kg

[ 150 | 150 | 150 | 150 | 150 | 150 | 150 | 150 ]  <-- 8 equal parts (x = 150)
|___ Fuel (3 parts) ______|_____ Oxidizer (5 parts) _______|
|       450 kg            |            750 kg              |
```

## Memory technique — remember this forever

1. **The Mnemonic:** **"Sum, Single, Scale" (SSS)**
   * **S**um the parts ($a+b$).
   * Find the **S**ingle part ($T / \text{Sum}$).
   * **S**cale up to the ratio ($a \times \text{Single}$, $b \times \text{Single}$).

2. **The Facts to Overlearn:**
   * A ratio $a:b$ means the total has $a+b$ parts.
   * Quantity A = $\left(\frac{a}{a+b}\right) \times \text{Total}$.

3. **Spaced-Repetition Schedule:**
   Review this concept and solve two new problems at intervals of: 1 day, 3 days, 7 days, 16 days, and 35 days.

4. **The First Principles Pathway:**
   If you forget the algorithm, remember the algebra: $ax + bx = T$. Factor out $x$ to get $x(a+b) = T$. Solve for $x = \frac{T}{a+b}$. This is the exact derivation of the "Sum, Single, Scale" method.

## Common mistakes
* **Confusing part-to-part with part-to-whole:** If the ratio of cats to dogs is $1:3$, students often assume the room is $\frac{1}{3}$ cats. False. The total parts are $1+3=4$. The room is $\frac{1}{4}$ cats.
* **Additive scaling:** Attempting to find an equivalent ratio to $5:7$ by adding $10$ to get $15:17$. Proportions are strictly multiplicative; you must multiply by $3$ to get $15:21$.
* **Ignoring units:** If a ratio compares $500 \text{ ml}$ to $2 \text{ Liters}$, you cannot write the ratio as $500:2$. You must convert to a common unit first ($500 \text{ ml} : 2000 \text{ ml} \rightarrow 1:4$).

## Self-check
1. Simplify the ratio $45 : 60 : 105$ to its lowest terms.
2. An inheritance of $\$24,000$ is divided among three siblings in the ratio $2:3:7$. How much does the sibling who receives the most get?
3. A chemical reaction requires Reagent A and Reagent B in a ratio of $4:9$ by mass. If you currently have $50 \text{ g}$ of Reagent A and $100 \text{ g}$ of Reagent B, which reagent is the limiting factor (which will you run out of first), and how much of the other reagent will be left over?