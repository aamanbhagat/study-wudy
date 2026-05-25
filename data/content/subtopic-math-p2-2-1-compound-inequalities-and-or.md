## What it is
A compound inequality consists of two or more simple inequalities joined by the logical operators "AND" or "OR". An "AND" inequality requires all conditions to be true simultaneously, representing the intersection of their solution sets. An "OR" inequality requires at least one condition to be true, representing the union of their solution sets.

## Why it matters
Compound inequalities are the mathematical foundation for defining constraints and boundaries. In calculus, you will use them to find the domains of functions (e.g., $f(x) = \sqrt{1 - x^2}$ requires $-1 \le x \le 1$). In aerospace engineering, they define safe operating envelopes: a rocket engine might only fire if pressure $P > 50$ psi AND temperature $T < 3000$ K. In computer science, these map directly to boolean logic gates (`&&` and `||`) used in control flow.

## When to study it
You must already be fluent in:
1. Solving basic linear equations.
2. Solving basic linear inequalities (crucially, knowing that multiplying or dividing by a negative number flips the inequality symbol).
3. Graphing numbers on a one-dimensional real number line.
If you forget to flip the sign when dividing by a negative, stop and review basic inequalities first. 

## How to study it (step by step)
1. **Master the logic:** Define "AND" as an intersection (overlap) and "OR" as a union (combination). Map these concepts to everyday constraints.
2. **Graph simple compounds:** Take two solved inequalities (e.g., $x > 2$ AND $x \le 5$). Graph them on separate number lines, then draw the resulting compound graph below them. Repeat for "OR".
3. **Solve "OR" inequalities:** Treat them as two entirely separate problems. Solve each individually, then graph both solutions on the same number line. 
4. **Solve "AND" inequalities:** Learn to solve the compact form $a < x < b$. Practice applying algebraic operations to all *three* parts of the inequality simultaneously.
5. **Analyze edge cases:** Investigate what happens when an "AND" condition has no overlap (solution: the empty set, $\emptyset$) or when an "OR" condition covers the entire number line (solution: all real numbers, $\mathbb{R}$).

## Key ideas, with intuition
**1. "AND" means Intersection ($\cap$)**
For $x > A$ AND $x < B$ to be true, a number must satisfy both rules. Graphically, this is the region where the two individual solution lines overlap. If there is no overlap, there is no solution. 

**2. "OR" means Union ($\cup$)**
For $x < A$ OR $x > B$ to be true, a number only needs to satisfy one rule. Graphically, you simply drop both individual solution lines onto a single final number line.

**3. The Compact Notation**
The expression $$a < x < b$$ is strictly mathematical shorthand for $$a < x \quad \text{AND} \quad x < b$$ 
It visually represents a bounded interval. You can only use this notation for "AND" inequalities, and the inequality symbols must point in the same direction (usually strictly less-than or less-than-or-equal-to).

## Worked example
**Solve and graph:** $$-5 < 3x + 4 \le 13$$

**Step 1: Isolate the $x$ term in the middle.**
Subtract $4$ from all three parts of the inequality.
$$-5 - 4 < 3x + 4 - 4 \le 13 - 4$$
$$-9 < 3x \le 9$$

**Step 2: Isolate $x$.**
Divide all three parts by $3$. (Since $3$ is positive, we do not flip the inequality symbols).
$$\frac{-9}{3} < \frac{3x}{3} \le \frac{9}{3}$$
$$-3 < x \le 3$$

**Reflection:** 
Why can we manipulate all three parts at once? Because $-5 < 3x + 4 \le 13$ is shorthand for two equations: $-5 < 3x + 4$ AND $3x + 4 \le 13$. If we subtract 4 from both sides of the first equation, and 4 from both sides of the second equation, we are effectively subtracting 4 from all three regions of the compact notation. The logic holds.

## Diagrams

```text
1. The "AND" Inequality: -3 < x <= 3
(Intersection: x > -3 AND x <= 3)

x > -3      <======o----------------------------------------->
                   -3   -2   -1    0    1    2    3    4

x <= 3      <-------------------------------------•======>
                   -3   -2   -1    0    1    2    3    4

Result      .......o==============================•.......
                   -3   -2   -1    0    1    2    3    4
(Only the overlap survives)


2. The "OR" Inequality: x < -1 OR x >= 2
(Union: At least one condition is true)

x < -1      <======o.......................................
                   -3   -2   -1    0    1    2    3    4

x >= 2      ......................................•======>
                   -3   -2   -1    0    1    2    3    4

Result      <======o..............................•======>
                   -3   -2   -1    0    1    2    3    4
(Both regions are kept)
```
*Legend: `o` = strictly less/greater than (open circle). `•` = less/greater than or equal to (closed circle).*

## Memory technique — remember this forever
1. **The Visual Hook:** 
   * **AND** is a s**AND**wich. The variable is trapped between two pieces of bread. (e.g., $2 < x < 5$).
   * **OR** is the **OAR**s of a rowboat. They point outward in opposite directions. (e.g., $x < 2$ OR $x > 5$).
2. **Facts to overlearn:** 
   * Compact notation ($a < x < b$) ALWAYS means AND.
   * Multiplying/dividing by a negative flips ALL inequality symbols in the statement.
3. **Spaced-repetition schedule:** Review this concept, specifically the edge cases of overlapping ORs and non-overlapping ANDs, at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget how to solve a compact inequality, break it into its two constituent parts joined by the word "AND". Solve them completely separately, then find where their graphs overlap.

## Common mistakes
* **Nonsense compact notation:** Writing $5 < x > 10$. This is mathematically illiterate. Compact notation must flow in a single direction, mapping directly to the number line (e.g., small $<$ medium $<$ large).
* **Forgetting the negative flip rule on all parts:** When solving $-2 < -x < 4$, students divide by $-1$ but forget to flip the signs, writing $2 < x < -4$ (which is impossible, as 2 is not less than -4). Correct: $2 > x > -4$, which rewrites cleanly as $-4 < x < 2$.
* **Confusing the empty set with all real numbers:** If you solve an AND inequality and get $x > 5$ AND $x < 2$, there is no number that satisfies this. The answer is $\emptyset$. If it were an OR inequality, $x > 5$ OR $x < 2$, the solution is valid (two diverging rays).

## Self-check
1. Solve and graph: $-8 \le 10 - 2x < 14$.
2. Solve and graph: $4x + 3 < 11$ OR $3x - 2 \ge 13$.
3. Evaluate the solution sets for the following two statements. Are they the same? 
   * Statement A: $x < 10$ AND $x > 0$
   * Statement B: $x < 10$ OR $x > 0$