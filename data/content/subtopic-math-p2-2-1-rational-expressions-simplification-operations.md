## What it is
A rational expression is simply a fraction where both the numerator and the denominator are polynomials. Simplifying them and performing operations (addition, subtraction, multiplication, division) follows the exact same rules as basic integer fractions, just extended to algebraic terms. 

## Why it matters
Rational expressions are the algebraic bedrock for rational functions, which model inverse relationships across physics and engineering. In rocket science, gravitational force ($F = G \frac{m_1 m_2}{r^2}$) is a rational expression. In calculus, you must flawlessly simplify rational expressions to evaluate limits, find asymptotes, and perform partial fraction decomposition for integration. If you stumble on the algebra here, the calculus will crush you.

## When to study it
Do not touch rational expressions until you have absolute mastery over:
1. **Fraction arithmetic:** Finding least common denominators (LCD), multiplying, and dividing integer fractions.
2. **Polynomial operations:** Expanding and grouping terms.
3. **Factoring polynomials:** Pulling out the greatest common factor (GCF), factoring quadratics, and recognizing the difference of squares ($a^2 - b^2$). 

If you cannot instantly factor $x^2 - 9$ or $x^2 + 5x + 6$, stop right now and go back to polynomial factoring.

## How to study it (step by step)
1. **Factor relentlessly (30 mins):** Take 10 complex rational expressions and do nothing but factor their numerators and denominators. Do not simplify yet.
2. **Master cancellation (20 mins):** Learn the difference between a *factor* (multiplied) and a *term* (added). Practice canceling common factors from the top and bottom. 
3. **Multiply and divide (30 mins):** Treat multiplication as one giant fraction. Treat division as multiplying by the reciprocal. Factor everything first, then cross-cancel.
4. **Find the LCD (30 mins):** Practice finding the Least Common Multiple of polynomial denominators. Build the LCD by taking the highest power of each unique prime polynomial factor.
5. **Add and subtract (30 mins):** Force common denominators, distribute carefully in the numerators, combine like terms, and then attempt to factor and simplify the final result.

## Key ideas, with intuition

**1. The Golden Rule of Fractions applies to polynomials**
You can multiply or divide the top and bottom of a fraction by the same non-zero quantity without changing its value:
$$ \frac{A}{B} = \frac{A \cdot C}{B \cdot C} $$
In rational expressions, $C$ is a polynomial factor. Simplifying is just running this process in reverse to remove $C$.

**2. Terms are tied, Factors are free**
You can only cancel *factors* (things being multiplied). You can never cancel *terms* (things being added or subtracted). 
$$ \frac{x \cdot y}{x} = y \quad \text{(Legal, } x \text{ is a factor)} $$
$$ \frac{x + y}{x} \neq y \quad \text{(Illegal, } x \text{ is a term)} $$
Intuition: $\frac{2 \cdot 3}{2} = 3$. But $\frac{2 + 3}{2} = \frac{5}{2} \neq 3$. 

**3. The Domain Restriction (The "Ghost" of the Denominator)**
When you simplify $\frac{x^2 - x}{x}$ to $x - 1$, they are equivalent *almost* everywhere. But in the original expression, $x$ cannot be $0$ (division by zero is undefined). Even after the $x$ cancels out, the restriction $x \neq 0$ remains. The simplified expression carries the "ghost" of its original denominator.

## Worked example
**Problem:** Simplify and subtract: $$ \frac{x^2 - 4}{x^2 + 5x + 6} - \frac{2}{x+3} $$

**Step 1: Factor everything first.**
Do not blindly multiply denominators to find a common one. Factor the first fraction:
Numerator: $x^2 - 4 = (x-2)(x+2)$
Denominator: $x^2 + 5x + 6 = (x+2)(x+3)$

The expression becomes:
$$ \frac{(x-2)(x+2)}{(x+2)(x+3)} - \frac{2}{x+3} $$

**Step 2: Simplify individual fractions.**
Cancel the common factor of $(x+2)$ in the first fraction. *Note: this requires $x \neq -2$.*
$$ \frac{x-2}{x+3} - \frac{2}{x+3} $$
*Reflection:* By factoring first, we avoided creating a messy cubic polynomial denominator. The fractions now conveniently share an identical denominator.

**Step 3: Subtract the numerators.**
Since the denominators are the same, combine the numerators over the single denominator:
$$ \frac{(x-2) - 2}{x+3} $$

**Step 4: Combine like terms.**
$$ \frac{x - 4}{x+3} $$
*(Valid for $x \neq -2, x \neq -3$)*

## Diagrams
When you graph a rational expression, canceling a factor creates a "hole" (removable discontinuity) in the geometry, not an asymptote.

```text
Graph of y = (x^2 - 4) / (x - 2)
Equivalent to y = x + 2, but with a hole at x = 2.

      y |
        |                 /
      5 |               /
      4 |.............O/  <-- Hole at (2, 4) because original 
      3 |           / |       denominator is zero at x = 2.
      2 |         /   |
      1 |       /     |
--------+-----/-------+---- x
       0|   1/        2
     -1 |  /
```

## Memory technique — remember this forever
**1. The Mnemonic:** *"Terms are tied, Factors are free."* 
Visualize a plus or minus sign as a knot tying terms together. You cannot pull a single term out of a knot. You must factor the expression to untie it into distinct, free-floating blocks before you can cancel anything.

**2. The Core Facts to Overlearn:**
*   $\frac{A}{B} \pm \frac{C}{D} = \frac{AD \pm BC}{BD}$ (For addition/subtraction, though finding the LCD is better than brute force).
*   $\frac{A}{B} \div \frac{C}{D} = \frac{A}{B} \cdot \frac{D}{C}$ (Keep-Change-Flip).

**3. Spaced-Repetition Schedule:**
Review your factoring and cancellation rules at: 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. First Principles Pathway:**
If you ever doubt whether an algebraic move is legal, **plug in $x = 2$**. 
If you are tempted to say $\frac{x^2 + 9}{x} = x + 9$, plug in 2: $\frac{4 + 9}{2} = 6.5$. But $2 + 9 = 11$. $6.5 \neq 11$. The arithmetic exposes the false algebra instantly.

## Common mistakes
1. **The Sniper Cancellation:** Shooting out individual terms from a polynomial. E.g., $\frac{x^2 + 5}{x} \rightarrow x + 5$. This is a fatal error. You must factor first.
2. **The Subtraction Sign Drop:** When subtracting a rational expression with multiple terms in the numerator, students forget to distribute the negative. 
   Wrong: $\frac{5x}{x-1} - \frac{x+2}{x-1} = \frac{5x - x + 2}{x-1}$
   Right: $\frac{5x}{x-1} - \frac{x+2}{x-1} = \frac{5x - (x+2)}{x-1} = \frac{4x - 2}{x-1}$
3. **Ignoring the Domain:** Forgetting that simplifying changes the visual equation but does not erase the original division-by-zero restrictions.

## Self-check
1. Simplify: $\frac{x^2 - 25}{x^2 - 10x + 25}$
2. Add: $\frac{4}{x-3} + \frac{2x}{x+3}$
3. Divide and simplify: $\frac{x^3 - 27}{x^2 - 9} \div \frac{x^2 + 3x + 9}{x+3}$