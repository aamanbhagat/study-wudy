## What it is
These formulae provide closed-form algebraic shortcuts for evaluating the sums of constants, integers, squares, and cubes from $1$ to $n$. Instead of manually adding hundreds of terms, you evaluate a single polynomial function of $n$.

## Why it matters
You cannot do integral calculus from first principles without these. When computing Riemann sums to find the area under a curve like $y = x^2$, you must sum infinitesimally small rectangles, which requires evaluating $\sum k^2$ as $n \to \infty$. In computer science, analyzing the time complexity of nested `for`-loops directly reduces to these summations. In physics, calculating the moment of inertia for discrete mass distributions relies on summing squared distances ($\sum r^2$).

## When to study it
You must already be comfortable with:
1. Sigma notation ($\Sigma$) and its linear properties.
2. Expanding polynomials (e.g., $(k+1)^3$).
3. The concept of an Arithmetic Progression.
If you do not understand how $\sum_{k=1}^n (a_k + b_k) = \sum_{k=1}^n a_k + \sum_{k=1}^n b_k$, stop and review basic summation properties first.

## How to study it (step by step)
1. **Master the linear sums:** Derive $\sum_{k=1}^n 1 = n$ and $\sum_{k=1}^n k = \frac{n(n+1)}{2}$ using the arithmetic progression formula or Gauss's trick.
2. **Understand the telescoping method:** Write out $(k+1)^3 - k^3 = 3k^2 + 3k + 1$. Sum both sides from $k=1$ to $n$. Watch the left side collapse (telescope) to $(n+1)^3 - 1$.
3. **Derive the sum of squares:** Rearrange the result of step 2 to isolate $\sum k^2$. Substitute your known formulas for $\sum k$ and $\sum 1$, then factor completely.
4. **Derive the sum of cubes:** Repeat the exact same telescoping process using $(k+1)^4 - k^4$ to find $\sum k^3$. 
5. **Drill linearity:** Practice breaking down complex sums like $\sum (4k^3 - 2k + 7)$ into combinations of your base formulas.

## Key ideas, with intuition

**1. The Big Four Formulae**
*   **Constant:** $\sum_{k=1}^n 1 = n$ 
*   **Integers:** $\sum_{k=1}^n k = \frac{n(n+1)}{2}$
*   **Squares:** $\sum_{k=1}^n k^2 = \frac{n(n+1)(2n+1)}{6}$
*   **Cubes:** $\sum_{k=1}^n k^3 = \left[ \frac{n(n+1)}{2} \right]^2$

**2. Linearity of Summation**
The summation operator is linear. You can pull out constants and split addition:
$$ \sum_{k=1}^n (Ak^2 + Bk + C) = A\sum_{k=1}^n k^2 + B\sum_{k=1}^n k + C\sum_{k=1}^n 1 $$

**3. The Telescoping Derivation Engine**
To find the sum of $p$-th powers, you use the expansion of $(k+1)^{p+1} - k^{p+1}$. 
For example, to find $\sum k^2$, use $(k+1)^3 - k^3 = 3k^2 + 3k + 1$. 
Summing both sides from $1$ to $n$:
$$ \sum_{k=1}^n [(k+1)^3 - k^3] = 3\sum_{k=1}^n k^2 + 3\sum_{k=1}^n k + \sum_{k=1}^n 1 $$
The left side evaluates to $(n+1)^3 - 1^3$ because every intermediate term cancels out (telescopes). You then solve for the unknown $\sum k^2$. This is the rigorous, bulletproof way to derive these formulas from first principles.

## Worked example
**Problem:** Evaluate $\sum_{k=1}^n (3k^2 - 2k + 1)$ in closed form.

**Step 1: Apply linearity.**
$$ 3\sum_{k=1}^n k^2 - 2\sum_{k=1}^n k + \sum_{k=1}^n 1 $$
*Why: Breaks the complex sum into our known standard formulae.*

**Step 2: Substitute the standard formulae.**
$$ 3\left( \frac{n(n+1)(2n+1)}{6} \right) - 2\left( \frac{n(n+1)}{2} \right) + n $$
*Why: Replaces the summations with algebraic expressions in terms of $n$.*

**Step 3: Simplify and find a common denominator.**
$$ \frac{n(n+1)(2n+1)}{2} - n(n+1) + n $$
Factor out $n$:
$$ n \left[ \frac{(n+1)(2n+1)}{2} - (n+1) + 1 \right] $$
$$ n \left[ \frac{2n^2 + 3n + 1 - 2n - 2 + 2}{2} \right] $$
$$ n \left[ \frac{2n^2 + n + 1}{2} \right] = \frac{2n^3 + n^2 + n}{2} $$
*Why: A factored or single-fraction polynomial is computationally efficient and required for limits in calculus.*

## Diagrams

**Visualizing $\sum_{k=1}^n k = \frac{n(n+1)}{2}$**

Imagine building a staircase out of blocks. If $n=4$, you have $1+2+3+4 = 10$ blocks. If you duplicate this staircase, flip it upside down, and push them together, you get a rectangle of height $n$ and width $n+1$. 

```text
  Original (o) + Flipped (x) = n by (n+1) rectangle

  o x x x x    Row 1: 1 'o', 4 'x' -> 5 blocks
  o o x x x    Row 2: 2 'o', 3 'x' -> 5 blocks
  o o o x x    Row 3: 3 'o', 2 'x' -> 5 blocks
  o o o o x    Row 4: 4 'o', 1 'x' -> 5 blocks

  Total area = n * (n+1) = 4 * 5 = 20.
  Since we used TWO staircases, the sum is Area / 2.
  Sum = n(n+1)/2 = 10.
```

## Memory technique — remember this forever

1. **The Hook:** 
   * "Cubes are just squares of integers." Notice that $\sum k^3 = (\sum k)^2$. It feels like a mistake, but it's a beautiful mathematical truth. 
   * For $\sum k^2$, remember the sequence: $n$, then $n+1$, then add them together to get $2n+1$. Divide by $6$ (which is $1 \times 2 \times 3$).
2. **Overlearn these facts:**
   * $\sum k = \frac{n(n+1)}{2}$
   * $\sum k^2 = \frac{n(n+1)(2n+1)}{6}$
   * $\sum k^3 = \left[ \frac{n(n+1)}{2} \right]^2$
3. **Spaced Repetition Schedule:** Write these formulas from memory at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you are in an exam and your mind goes blank on $\sum k^2$, write down $(k+1)^3 - k^3 = 3k^2 + 3k + 1$. Sum from $1$ to $n$, telescope the left side to $(n+1)^3 - 1$, and solve for $\sum k^2$. It takes 90 seconds and never fails.

## Common mistakes
* **The Constant Trap:** Assuming $\sum_{k=1}^n 5 = 5$. It is not. You are adding the number five $n$ times. The answer is $5n$.
* **The False Distributive Law:** Assuming $\sum k^2 = (\sum k)^2$. This is miraculously true for *cubes* ($\sum k^3 = (\sum k)^2$), but utterly false for squares.
* **Index Shifting:** Applying the formulas directly when the sum starts at $k=0$ or $k=3$. The standard formulas *require* the sum to start at $k=1$. If it starts at $k=3$, you must compute $\sum_{k=1}^n - \sum_{k=1}^2$.

## Self-check
1. Evaluate $\sum_{k=1}^{10} (2k^2 + k)$ to a single numerical value.
2. Use the telescoping identity $(k+1)^4 - k^4 = 4k^3 + 6k^2 + 4k + 1$ to prove the formula for $\sum_{k=1}^n k^3$. (Do the algebra).
3. Find a closed-form expression for $\sum_{k=1}^n k(k+1)(k+2)$. (Hint: expand the polynomial first).