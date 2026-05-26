## 1. The one-sentence answer
**A linear equation in one variable is solved by the transposition method through repeated application of the properties of equality that isolate the variable on one side while moving every other term to the opposite side.**

An equation states that two expressions have identical value. When the expressions contain an unknown, the goal is to discover the unique number that makes the statement true. Transposition achieves this by adding or subtracting the same quantity on both sides, or multiplying or dividing both sides by the same non-zero quantity; each move keeps the equality intact while shifting terms.

The process ends when the variable stands alone with coefficient 1. Every intermediate equation remains equivalent to the original, so the final value satisfies the starting equation.

> [!NOTE]
> The single deep insight is that equality is a balanced relationship: any operation performed identically on both sides preserves the balance, allowing systematic rearrangement without changing the solution set.

## 2. Why this matters — concrete and current
SpaceX engineers solve linear equations when computing the exact propellant mass required for a Falcon 9 first-stage landing burn; the equation equates residual velocity after atmospheric drag to thrust integrated over burn time, and transposition isolates the unknown burn duration.

In semiconductor fabrication, Intel process-control teams use linear models relating etch depth to plasma exposure time; solving for exposure time via transposition ensures the target depth is reached within angstrom tolerances on every wafer.

Quantitative analysts at Jane Street employ linear equations inside order-book imbalance models; the unknown is the fair price adjustment, obtained instantly by transposition so that market-making algorithms can quote within microseconds.

Meteorologists at the European Centre for Medium-Range Weather Forecasts linearize parts of the Navier–Stokes equations around a reference state; transposition isolates the perturbation velocity that feeds into ensemble forecasts for hurricane tracks.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Properties of equality         | Every transposition step rests on adding, subtracting, multiplying, or dividing both sides by the same quantity. |
| Signed-number arithmetic       | Moving a term changes its sign; multiplication or division by a negative reverses inequality direction if it ever appears. |
| Distributive property          | Expansion of parentheses must precede transposition when coefficients sit outside brackets. |
| Recognition of like terms      | Only identical variable powers may be combined after transposition. |

## 4. Building the idea — from intuition to formalism

### Step 1 — An equation is a balance that must stay level
Any true numerical statement remains true when the same number is added to both sides.  
Concrete example: start with \(5 = 5\); add 3 to each side to obtain \(8 = 8\).  
Formal statement: if \(a = b\), then \(a + c = b + c\) for any real \(c\).  
> [!WARNING]  
> Adding different quantities to each side destroys equality and produces an unrelated equation.

### Step 2 — Subtraction is addition of the opposite
Subtracting a term from both sides is identical to adding its negative.  
Concrete example: from \(x + 4 = 7\), subtract 4 from both sides to reach \(x = 3\).  
Formal statement: if \(a = b\), then \(a - c = b - c\).  
> [!WARNING]  
> Forgetting to subtract from the right-hand side leaves the variable entangled with the constant.

### Step 3 — Multiplication scales both sides uniformly
Multiplying both sides by the same non-zero number preserves equality.  
Concrete example: from \(\frac{x}{3} = 2\), multiply both sides by 3 to obtain \(x = 6\).  
Formal statement: if \(a = b\) and \(k \neq 0\), then \(ka = kb\).  
> [!WARNING]  
> Multiplying by zero collapses the equation to \(0 = 0\), losing all information about the variable.

### Step 4 — Division is multiplication by the reciprocal
Dividing both sides by a non-zero coefficient isolates the variable when its coefficient is not 1.  
Concrete example: from \(2x = 10\), divide both sides by 2 to reach \(x = 5\).  
Formal statement: if \(a = b\) and \(k \neq 0\), then \(\frac{a}{k} = \frac{b}{k}\).  
> [!WARNING]  
> Division by the variable itself is invalid because the value of the variable is still unknown.

### Step 5 — Transposition collects variable terms on one side
Any term may be moved across the equals sign by changing its sign and placing it on the opposite side.  
Concrete example: from \(3x + 2 = 5x - 4\), subtract \(3x\) and add 4 to both sides to reach \(6 = 2x\).  
Formal statement: the equation \(ax + b = cx + d\) is equivalent to \((a - c)x = d - b\).  
> [!WARNING]  
> Changing the sign of only one side, or forgetting to move every constant, yields an incorrect coefficient.

### Step 6 — The canonical form and back-substitution
After transposition the equation appears as \(kx = m\) with \(k \neq 0\); the solution is \(x = m/k\).  
Formal statement: the unique solution of \(ax + b = 0\) with \(a \neq 0\) is \(x = -b/a\).

## 5. Worked examples — every step shown

**Example 1 — Constant on one side only**  
*Given:* \(x + 7 = 12\)  
*Find:* \(x\)  
Subtract 7 from both sides:  
\(x + 7 - 7 = 12 - 7\)  
*Why:* subtraction property of equality removes the constant term.  
\(x = 5\)  
**\(x = 5\)**  
*Reflection:* The example isolates the variable with a single subtraction; the same pattern scales to any constant term.

**Example 2 — Coefficient greater than one**  
*Given:* \(-4x = 20\)  
*Find:* \(x\)  
Divide both sides by \(-4\):  
\(\frac{-4x}{-4} = \frac{20}{-4}\)  
*Why:* division by the coefficient produces a coefficient of 1.  
\(x = -5\)  
**\(x = -5\)**  
*Reflection:* Negative coefficients require careful sign tracking; the division step automatically supplies the correct sign.

**Example 3 — Terms on both sides**  
*Given:* \(5x - 3 = 2x + 9\)  
*Find:* \(x\)  
Subtract \(2x\) from both sides:  
\(3x - 3 = 9\)  
*Why:* like terms in \(x\) are collected on the left.  
Add 3 to both sides:  
\(3x = 12\)  
*Why:* constant terms are moved to the right.  
Divide by 3:  
\(x = 4\)  
**\(x = 4\)**  
*Reflection:* Two transpositions were required; order does not matter provided each step uses an equality property.

**Example 4 — Parentheses and fractions**  
*Given:* \(2(x - 1) = \frac{3x}{4} + 5\)  
*Find:* \(x\)  
Apply distributive property:  
\(2x - 2 = \frac{3x}{4} + 5\)  
*Why:* parentheses must be removed before like terms can be identified.  
Multiply every term by 4:  
\(8x - 8 = 3x + 20\)  
*Why:* clears the denominator while preserving equality.  
Subtract \(3x\) and add 8:  
\(5x = 28\)  
*Why:* variable terms and constants are separated.  
Divide by 5:  
\(x = \frac{28}{5}\)  
**\(x = \frac{28}{5}\)**  
*Reflection:* The fraction forced an extra multiplication step; the method remains transposition after clearing denominators.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Changing sign of only one side | Habit of “moving” without applying the same operation to both sides | Write the operation explicitly on both sides first   |
| Dividing by the variable    | Treating the variable as a known number     | Never divide by any expression containing the unknown |
| Forgetting the distributive step | Overlooking parentheses                     | Expand parentheses before any transposition          |
| Losing the negative sign on transposition | Mental arithmetic error when term crosses equals sign | Circle the sign of each term before moving it        |
| Treating constants as like terms with variables | Misidentifying term types                   | Underline variable terms and constant terms separately |
| Stopping after one transposition when two are needed | Premature declaration of solution           | Continue until the variable coefficient is exactly 1 |
| Multiplying by zero         | Attempting to “cancel” a zero coefficient   | Verify the multiplier or divisor is never zero       |

## 7. The textbook-precise statement
A linear equation in one variable is any equation that can be written in the form \(ax + b = 0\) where \(a, b \in \mathbb{R}\) and \(a \neq 0\). The unique solution is \(x = -b/a\). Equivalence transformations that preserve the solution set are: (i) adding or subtracting the same real number from both sides, (ii) multiplying or dividing both sides by the same non-zero real number. (See Lay, *Linear Algebra and Its Applications*, 6e, §1.1 for the corresponding matrix perspective on elementary row operations.)

## 8. Visual — diagram or schematic
```text
Initial balance
Left pan:  3x + 2          Right pan:  5x - 4
          ───────────────────────────────
After first transposition (subtract 3x from both pans)
Left pan:  2               Right pan:  2x - 4
After second transposition (add 4 to both pans)
Left pan:  6               Right pan:  2x
Final: divide both pans by 2
Left pan:  3               Right pan:  x
Solution: x = 3
```
The diagram shows a two-pan balance; each legal transposition keeps the pans level.

## 9. The memory technique
1. **The hook** — Picture each term as a piece of furniture on a perfectly balanced seesaw; to move a piece you must add an identical twin piece to the opposite side so the seesaw never tilts.
2. **What to overlearn** — The four equality properties (add/subtract/multiply/divide both sides) and the rule that division by zero is forbidden.
3. **Spaced-repetition schedule** — Review the four equality properties after 1 day, solve five mixed equations after 3 days, derive the general solution \(x = -b/a\) from memory after 7 days, then again at 16 days and 35 days.
4. **First-principles fallback** — Return to the definition: start with \(ax + b = cx + d\), subtract \(cx + b\) from both sides, then divide by the resulting coefficient of \(x\).

## 10. What this unlocks
Mastery of transposition supplies the mechanical foundation for every later algebraic technique.  
- Systems of linear equations are solved by eliminating variables through precisely the same additions and subtractions.  
- Quadratic equations are reduced to linear form after factoring or completing the square.  
- Rational equations are cleared of denominators and then transposed.  
- Linear inequalities follow identical steps except that multiplication or division by a negative reverses the inequality symbol.  
- Slope-intercept form of a line is obtained by transposing the standard form \(ax + by = c\).

## 11. Self-check — five questions, no answers
1. Solve \(7 - 2x = 3x + 17\) and state each transposition used.  
2. Why is it invalid to divide both sides of \(0 \cdot x = 0\) by zero to “solve” for \(x\)?  
3. An equation yields \(x = x\) after all transpositions; what does this reveal about the original equation?  
4. Rearrange \( \frac{2x-1}{3} = x + 4 \) into the form \(kx = m\) showing every multiplier applied.  
5. A student transposes \(4x = 12\) by subtracting 4 from the left side only and obtains \(x = 12\); identify the exact property that was violated.