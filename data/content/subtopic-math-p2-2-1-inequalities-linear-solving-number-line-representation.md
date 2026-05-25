## What it is
An inequality is a mathematical statement comparing two expressions that are not necessarily equal, using symbols like $<$ (less than), $>$ (greater than), $\le$ (less than or equal to), or $\ge$ (greater than or equal to). Solving a linear inequality means finding the entire continuous range of values for a variable that makes the statement true, which we visually represent as a shaded region on a number line.

## Why it matters
In physics and rocket science, exact equality is rare; you design for safety margins. A structural component is safe only if the applied stress is *strictly less than* the material's yield strength ($\sigma < \sigma_y$), and a rocket lifts off only if thrust is *strictly greater than* weight ($T > mg$). In machine learning, inequalities define decision boundaries and optimization constraints. Mastering them now builds the mechanical foundation for calculus, where bounding errors (using $\epsilon$-$\delta$ proofs) relies entirely on manipulating inequalities.

## When to study it
You must already be comfortable solving basic linear equations (e.g., isolating $x$ in $ax + b = c$), understanding negative numbers, and performing basic fraction arithmetic. If you cannot solve $3x - 7 = 14$ without hesitation, go back and master linear equations first.

## How to study it (step by step)
1. Define the symbols ($<, >, \le, \ge$) and practice reading them aloud mathematically (e.g., "strictly less than", "greater than or equal to").
2. Draw a number line and graph basic statements like $x > 2$ and $x \le -1$. Pay strict attention to open circles (exclusive) vs. closed circles (inclusive).
3. Experiment with addition and subtraction: start with a true statement like $3 < 5$. Add 2 to both sides. Subtract 4 from both sides. Verify the inequality still holds. 
4. Experiment with multiplication by *positive* numbers. Start with $4 > 2$, multiply both sides by 2. Verify it holds.
5. The critical step: Experiment with multiplication by *negative* numbers. Start with $3 < 5$, multiply both sides by $-1$. Notice that $-3$ is actually *greater* than $-5$. Derive the rule: multiplying or dividing by a negative number flips the inequality sign.
6. Solve 10 multi-step linear inequalities, treating them like equations but applying the negative-multiplication rule, and graph every solution.

## Key ideas, with intuition

**The Balance Analogy (Translation)**
Like equations, inequalities are scales. If the left side is lighter ($<$), adding or subtracting the exact same weight to both sides keeps the left side lighter. This is a simple translation along the number line.
$$ a < b \implies a + c < b + c $$

**The Negative Number Flip (Reflection)**
Multiplying or dividing by a negative number reflects the entire number line across zero. If $a$ is to the right of $b$ ($a > b$), reflecting them across zero puts $-a$ to the *left* of $-b$ ($-a < -b$). 
$$ 3 < 5 \implies (-1)(3) > (-1)(5) \implies -3 > -5 $$
Because the geometric relationship is mirrored, you *must* reverse the inequality symbol to maintain the truth of the statement.

**Infinite Solutions**
Unlike a linear equation like $2x = 4$ which has exactly one solution ($x = 2$), an inequality like $2x > 4$ has infinitely many valid solutions ($x > 2$). The number line is the most efficient way to visualize this continuous, infinite set.

**Boundary Conventions**
On a number line, a strict inequality ($<$ or $>$) uses an open circle $\circ$ to explicitly show the boundary value is excluded from the solution set. An inclusive inequality ($\le$ or $\ge$) uses a closed, solid circle $\bullet$ to show the boundary is included.

## Worked example
**Problem:** Solve and graph: $-2x + 5 \ge 11$

**Step 1:** Isolate the variable term by subtracting 5 from both sides.
$$ -2x + 5 - 5 \ge 11 - 5 $$
$$ -2x \ge 6 $$

**Step 2:** Isolate $x$ by dividing by $-2$. Because we are dividing by a negative number, we must flip the inequality sign.
$$ \frac{-2x}{-2} \le \frac{6}{-2} $$
$$ x \le -3 $$

*Reflection:* Subtracting 5 just shifted our position on the number line, preserving order. Dividing by $-2$ scaled the values and geometrically reflected them across zero. This reflection necessitated flipping the $\ge$ to $\le$ to keep the mathematical statement true.

## Diagrams

Number line representation for $x \le -3$ (Closed circle, shaded left):
```text
      Solution region: x <= -3
<===================●------------------->
   |    |    |    |    |    |    |    |
  -6   -5   -4   -3   -2   -1    0    1
```

Number line representation for $x > 1$ (Open circle, shaded right):
```text
                             Solution: x > 1
<-------------------------○===========>
   |    |    |    |    |    |    |    |
  -3   -2   -1    0    1    2    3    4
```

## Memory technique — remember this forever
1. **The Hook:** "Negative mirrors flip the world." Imagine looking in a mirror: left becomes right. Multiplying or dividing by a negative is looking in a mathematical mirror (zero). The "greater than" side flips to the "less than" side.
2. **Must overlearn:**
   * If $a < b$ and $c < 0$, then $ac > bc$.
   * $<$ and $>$ = Open circle ($\circ$).
   * $\le$ and $\ge$ = Closed circle ($\bullet$).
3. **Spaced-repetition schedule:** Review this concept and solve 2 practice problems at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you ever freeze on a test and forget whether to flip the sign, rebuild it from absolute truth. Write down an obvious fact: $1 < 2$. Multiply both sides by $-1$. You are left with $-1$ and $-2$. Which is warmer/higher? $-1$. Therefore, $-1 > -2$. The sign flipped. You have just re-derived the rule.

## Common mistakes
* **Forgetting to flip the sign when dividing by a negative:** Students often write $-3x < 9 \implies x < -3$. This is fatally flawed. It must be $x > -3$.
* **Flipping the sign when *subtracting*:** Students see a minus sign and panic, flipping the inequality when doing $x - 4 < 10 \implies x > 14$. Subtraction is just sliding left on the number line; it does not mirror the values. Only multiplication/division by negatives causes a flip.
* **Misinterpreting the arrow direction:** Drawing the arrow to the right for $x < 5$. *Hack:* As long as you write the variable on the left side of the inequality (e.g., $x < 5$), the inequality symbol ($<$) points in the exact same direction as the arrow on your number line ($\leftarrow$).

## Self-check
1. Solve and graph on a number line: $4x - 7 < 9$.
2. Solve and graph on a number line: $5 - 3x \le 14$.
3. Solve for $x$: $2(x - 4) > 5x + 1$.