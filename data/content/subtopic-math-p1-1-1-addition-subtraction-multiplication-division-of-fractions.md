## What it is
Fractions represent parts of a whole, expressed as a ratio of an integer numerator to a non-zero integer denominator. Operating on fractions—adding, subtracting, multiplying, and dividing them—means combining, scaling, or partitioning these proportional quantities using the strict rules of arithmetic.

## Why it matters
Fractions are the bedrock of rational numbers and algebraic manipulation. In physics and aerospace engineering, you will constantly manipulate ratios: mass fractions (propellant mass vs. total vehicle mass), stoichiometric ratios in combustion, or dimensional analysis units (e.g., $\frac{\text{kg} \cdot \text{m}}{\text{s}^2}$). If you cannot fluidly add, multiply, and divide fractions, manipulating algebraic equations like the Tsiolkovsky rocket equation will be impossible. 

## When to study it
You must understand basic integer arithmetic (addition, subtraction, multiplication, division) and the concept of prime factorization. Specifically, you need to know how to find the Greatest Common Divisor (GCD) and the Least Common Multiple (LCM) of two integers. If you cannot reliably find the LCM of 6 and 8, stop and learn that first.

## How to study it (step by step)
1. **Visualize the unit:** Recognize that a denominator defines a unit (like "thirds" or "meters"). You cannot add different units directly.
2. **Master the common denominator:** Practice converting fractions to equivalent fractions using the LCM. Do this until scaling $\frac{a}{b}$ to $\frac{ak}{bk}$ is automatic.
3. **Derive addition/subtraction:** Add and subtract fractions with common denominators. Write out the steps explicitly: $\frac{a}{c} + \frac{b}{c} = \frac{a+b}{c}$.
4. **Visualize multiplication:** Treat fraction multiplication as finding the area of a rectangle, or taking a "fraction of a fraction."
5. **Derive division:** Prove to yourself *why* dividing by a fraction is the same as multiplying by its reciprocal, using complex fractions (fractions inside fractions).
6. **Drill mixed operations:** Solve expressions that combine all four operations, strictly enforcing the order of operations (PEMDAS).

## Key ideas, with intuition

**1. The Denominator is the Unit (Addition/Subtraction)**
In the fraction $\frac{3}{4}$, "fourths" is the unit. You cannot add 3 meters and 2 seconds. Similarly, you cannot add $\frac{3}{4}$ and $\frac{2}{5}$ directly. You must convert them to a common unit. By finding a common denominator (e.g., 20), you change the units to "twentieths". 
$$ \frac{3}{4} = \frac{3 \times 5}{4 \times 5} = \frac{15}{20} $$
Once the units match, you simply add the numerators: 15 twentieths + 8 twentieths = 23 twentieths.

**2. Multiplication is Scaling**
When you multiply $\frac{a}{b} \times \frac{c}{d}$, you are scaling both the numerators and the denominators. If you have half of a pie ($\frac{1}{2}$) and you want one third of that amount ($\frac{1}{3}$), you multiply them. The numerators multiply to give the new number of pieces, and the denominators multiply to give the new size of the pieces:
$$ \frac{1}{2} \times \frac{1}{3} = \frac{1 \times 1}{2 \times 3} = \frac{1}{6} $$

**3. Division is Multiplication by the Inverse**
To compute $\frac{a}{b} \div \frac{c}{d}$, you are asking: "How many $\frac{c}{d}$ fit into $\frac{a}{b}$?" 
Set it up as a massive fraction:
$$ \frac{\frac{a}{b}}{\frac{c}{d}} $$
To eliminate the denominator, multiply the top and bottom by the reciprocal of the denominator ($\frac{d}{c}$):
$$ \frac{\frac{a}{b} \times \frac{d}{c}}{\frac{c}{d} \times \frac{d}{c}} = \frac{\frac{a}{b} \times \frac{d}{c}}{1} = \frac{a}{b} \times \frac{d}{c} $$
This proves the rule: "flip the second fraction and multiply."

## Worked example
**Problem:** Simplify the expression: $\frac{3}{4} + \left( \frac{1}{2} \div \frac{2}{3} \right) \times \frac{1}{5}$

**Step 1: Parentheses first (Division).**
To divide, multiply by the reciprocal of the second fraction.
$$ \frac{1}{2} \div \frac{2}{3} = \frac{1}{2} \times \frac{3}{2} = \frac{3}{4} $$
*Why it works: We are clearing the fractional denominator by multiplying by its inverse.*

**Step 2: Multiplication.**
Substitute the result back into the expression and multiply by $\frac{1}{5}$. Multiply straight across.
$$ \frac{3}{4} \times \frac{1}{5} = \frac{3 \times 1}{4 \times 5} = \frac{3}{20} $$
*Why it works: We are taking one-fifth of three-fourths, scaling both the pieces and the unit size.*

**Step 3: Addition.**
Now add the remaining terms: $\frac{3}{4} + \frac{3}{20}$. We need a common denominator. The LCM of 4 and 20 is 20.
$$ \frac{3 \times 5}{4 \times 5} = \frac{15}{20} $$
$$ \frac{15}{20} + \frac{3}{20} = \frac{18}{20} $$
*Why it works: We converted "fourths" into "twentieths" so the units match, then summed the numerators.*

**Step 4: Simplify.**
Divide the numerator and denominator by their GCD (which is 2).
$$ \frac{18 \div 2}{20 \div 2} = \frac{9}{10} $$

## Diagrams

**Multiplication as Area:** $\frac{1}{2} \times \frac{3}{4} = \frac{3}{8}$

```text
      1/4     1/4     1/4     1/4
   +-------+-------+-------+-------+
   |XXXXXXX|XXXXXXX|XXXXXXX|       |
1/2|XXXXXXX|XXXXXXX|XXXXXXX|       |
   +-------+-------+-------+-------+
   |       |       |       |       |
1/2|       |       |       |       |
   +-------+-------+-------+-------+
```
*Notice the whole grid has 8 blocks (denominator $2 \times 4$). The shaded area (X) is 3 blocks (numerator $1 \times 3$). Therefore, the area is $\frac{3}{8}$.*

## Memory technique — remember this forever
1. **The Hook:** 
   * Addition/Subtraction: "Match the base, combine the top."
   * Multiplication: "Straight across."
   * Division: "Keep, Change, Flip." (Keep the first, change to multiply, flip the second).
2. **Formulas to overlearn:**
   * Addition: $$ \frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd} $$
   * Multiplication: $$ \frac{a}{b} \times \frac{c}{d} = \frac{ac}{bd} $$
   * Division: $$ \frac{a}{b} \div \frac{c}{d} = \frac{ad}{bc} $$
3. **Spaced-repetition schedule:** Review these formulas and solve one mixed-operation problem at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the division rule, write it as a fraction over a fraction $\frac{a/b}{c/d}$ and multiply the top and bottom by $\frac{d}{c}$ to force the denominator to 1.

## Common mistakes
* **Adding straight across:** Writing $\frac{1}{2} + \frac{1}{3} = \frac{2}{5}$. This is a catastrophic failure of logic. Half a pie plus a third of a pie is almost a whole pie, not $\frac{2}{5}$ (which is less than half). You *must* find a common denominator.
* **Flipping the wrong fraction in division:** Changing $\frac{a}{b} \div \frac{c}{d}$ to $\frac{b}{a} \times \frac{c}{d}$. Only the *divisor* (the second fraction) gets flipped.
* **Forgetting to simplify:** Leaving an answer as $\frac{42}{56}$ instead of reducing it to $\frac{3}{4}$. Always divide out the Greatest Common Divisor.

## Self-check
1. Compute and simplify: $\frac{5}{8} - \frac{1}{6}$
2. Evaluate and simplify: $\frac{2}{7} \times \left( \frac{3}{4} + \frac{1}{2} \right)$
3. Solve for $x$: $\frac{3}{x} \div \frac{4}{5} = \frac{15}{8}$