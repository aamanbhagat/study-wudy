## 1. The one-sentence answer
**Linear equations in two variables represent straight lines on the coordinate plane, and their solutions are the points where these lines intersect.**

A linear equation in two variables has the form \(ax + by = c\), where \(a\), \(b\), and \(c\) are constants and \(x\), \(y\) are variables. Graphically, every such equation traces a straight line; algebraically, solving a pair of them means finding the exact \((x, y)\) pair that satisfies both equations at once. When you solve graphically you read the intersection point from the axes; when you solve algebraically you use substitution or elimination to reach the same point without drawing.

The key shift in thinking is that the pair of numbers \((x, y)\) is no longer two separate answers but one ordered pair that lies on both lines simultaneously. Once you internalise this, moving between the picture and the algebra becomes automatic.

> [!NOTE]
> The single most important “aha” is that a solution is always an ordered pair \((x, y)\), never a lone number; the graph simply makes that pair visible as a point.

## 2. Why this matters — concrete and current
In spacecraft trajectory planning at ISRO and NASA, two linear equations model simultaneous constraints on fuel mass and velocity change; their intersection gives the feasible burn point that satisfies both delta-v and mass budgets.

In semiconductor process control at TSMC, engineers fit linear models relating etch time and chamber pressure to line-width error; solving the resulting two-variable system predicts the exact pressure needed to hit a target width.

Linear regression in machine-learning libraries such as scikit-learn reduces to solving normal equations that are linear systems in two or more variables; the algebraic solution yields the optimal slope and intercept for the fitted line.

In microeconomics, market equilibrium for a good is found by setting the linear demand equation equal to the linear supply equation; the solution pair (price, quantity) tells firms the clearing price and volume for the next production cycle.

In GPS receivers, the initial position fix is obtained by linearising the pseudorange equations around an approximate location, producing a two-variable linear system whose solution refines latitude and longitude estimates before higher-order corrections are applied.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cartesian plane and coordinates | Every solution is an ordered pair \((x, y)\) plotted as a point |
| Slope-intercept form \(y = mx + c\) | Lets you draw the line quickly from any linear equation   |
| Order of operations and simple algebraic manipulation | Required for substitution and elimination steps           |
| Concept of equality      | Both equations must be true for the same \((x, y)\)       |

If any row above feels shaky, pause and review that idea first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Recognising a linear relation
A relation between \(x\) and \(y\) is linear when the variables appear only to the first power and are not multiplied together.  
Example: \(2x + 3y = 6\) is linear; \(x^2 + y = 4\) is not.  
Formal statement: an equation \(ax + by + c = 0\) with \(a, b\) not both zero is called linear in two variables.  
> [!WARNING]
> Treating a quadratic term as linear will produce a curve instead of a line and destroy every later algebraic step.

### Step 2 — Graphing one equation
Rewrite \(ax + by = c\) as \(y = mx + k\) where \(m = -a/b\) and \(k = c/b\). Plot the y-intercept \(k\), then move one unit right and \(m\) units up or down.  
Example: \(2x + 3y = 6\) becomes \(y = - \frac{2}{3}x + 2\).  
Formal: the graph of every non-constant linear equation is a straight line.  
> [!WARNING]
> Forgetting to handle the case \(b = 0\) (vertical line) leads to division by zero when computing slope.

### Step 3 — Meaning of a simultaneous solution
Two distinct lines intersect at most at one point. That point’s coordinates satisfy both equations at the same time.  
Formal: solve the system  
\[
\begin{cases}
a_1x + b_1y = c_1 \\
a_2x + b_2y = c_2
\end{cases}
\]  
for the ordered pair \((x, y)\).

### Step 4 — Substitution method
Solve one equation for one variable and substitute into the second.  
Example: from \(x + y = 5\) get \(y = 5 - x\); plug into \(2x - y = 4\) yields \(x = 3\), \(y = 2\).  
> [!WARNING]
> Substituting back into the wrong original equation is a common source of arithmetic slips.

### Step 5 — Elimination method
Multiply equations by constants so that coefficients of one variable become opposites, then add.  
Formal step: if \(a_1 / a_2 = b_1 / b_2\) but \(c_1 / c_2\) differs, the system is inconsistent (parallel lines).

### Step 6 — Classification of solutions
- Unique solution: lines intersect at one point.  
- No solution: lines parallel and distinct.  
- Infinitely many solutions: both equations represent the identical line.

## 5. Worked examples — har step show karo

**Example 1 — Simple intersection**  
*Given:*  
\[
\begin{cases}
x + y = 5 \\
2x - y = 4
\end{cases}
\]  
*Find:* the intersection point.  
Add the two equations: \(3x = 9 \implies x = 3\).  
Substitute into first: \(3 + y = 5 \implies y = 2\).  
*Why* each move: adding cancels \(y\) directly; substitution recovers the matching value.  
**Final answer**  
\((3, 2)\)

*Reflection*: the example is easy because coefficients already oppose; the same logic scales to messier numbers.

**Example 2 — Substitution required**  
*Given:*  
\[
\begin{cases}
3x + 2y = 12 \\
x - y = 1
\end{cases}
\]  
*Find:* solution.  
From second, \(x = y + 1\). Substitute: \(3(y + 1) + 2y = 12 \implies 5y = 9 \implies y = 1.8\), \(x = 2.8\).  
*Why*: isolating the simpler variable avoids fractions early.  
**Final answer**  
\((2.8, 1.8)\)

*Reflection*: decimals appear; keep fractions \(\frac{14}{5}, \frac{9}{5}\) for exactness.

**Example 3 — Elimination with scaling**  
*Given:*  
\[
\begin{cases}
2x + 3y = 8 \\
4x + 5y = 13
\end{cases}
\]  
*Find:* solution.  
Multiply first by 2: \(4x + 6y = 16\). Subtract second: \(y = 3\). Then \(x = -0.5\).  
*Why*: scaling creates matching \(x\) coefficients for clean subtraction.  
**Final answer**  
\((-0.5, 3)\)

*Reflection*: always check by plugging back; arithmetic errors hide here.

**Example 4 — Parallel lines (no solution)**  
*Given:*  
\[
\begin{cases}
2x + 4y = 6 \\
x + 2y = 4
\end{cases}
\]  
*Find:* solution.  
Multiply second by 2: \(2x + 4y = 8\). Subtract from first: \(0 = -2\), contradiction.  
*Why*: identical slopes but different intercepts imply parallel distinct lines.  
**Final answer**  
No solution exists.

*Reflection*: the contradiction is the algebraic signal that geometry already predicted.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Treating \(y = mx\) as vertical when \(m\) undefined | Slope formula misapplied                    | Check \(b = 0\) case first                   |
| Forgetting to multiply both sides when scaling      | Partial multiplication                      | Always multiply every term                   |
| Substituting into the modified equation             | Using an altered line instead of original   | Label equations and return to originals      |
| Assuming unique solution when lines coincide        | Missing infinite-solution case              | Compare all three ratios \(a_1/a_2, b_1/b_2, c_1/c_2\) |
| Sign error during elimination                       | Careless distribution of minus              | Write “−(second equation)” explicitly        |
| Graphing only two points without third check        | Arithmetic slip in one point                | Always plot three points or verify slope     |
| Reporting single number instead of ordered pair     | Old single-variable habit                   | Force yourself to write \((x, y)\) every time |

## 7. The textbook-precise statement
A system of two linear equations in two variables  
\[
a_1x + b_1y = c_1, \quad a_2x + b_2y = c_2
\]  
has either exactly one solution, no solution, or infinitely many solutions. The system possesses a unique solution if and only if the determinant \(a_1b_2 - a_2b_1 \neq 0\). When the determinant vanishes, compare the ratios \(a_1/a_2 = b_1/b_2 = c_1/c_2\); equality of all three ratios implies the equations are scalar multiples (infinitely many solutions), otherwise the system is inconsistent.  
Reference: Lay, *Linear Algebra and Its Applications*, 6e, §1.1.

## 8. Visual — diagram or schematic
```
y
↑
|     line 1: y = - (2/3)x + 2
|        • (3,2)  ← intersection
|     line 2: y = 2x - 4
|    /
|   /
|  /
| /
|/
+---------------→ x
```
Line 1 crosses y-axis at 2 with gentle negative slope; line 2 crosses y-axis at −4 with steep positive slope. Their crossing at (3,2) is the unique solution.

## 9. The memory technique
1. **The hook** — picture two roads crossing at a single traffic light; the light’s coordinates are the solution pair.  
2. **What to overlearn** — the three ratio test: if \(a_1/a_2 = b_1/b_2 \neq c_1/c_2\) then no solution; if all equal then infinite solutions.  
3. **Spaced-repetition schedule** — review the ratio test after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — start from the geometric definition: two distinct non-parallel lines intersect once; translate that into the determinant condition by writing slopes equal and intercepts unequal.

## 10. What this unlocks
Mastery here lets you move directly into systems of three or more variables, matrix methods, and linear programming.  
- Next: Gaussian elimination and row echelon form  
- Next: Cramer’s rule and inverse matrices  
- Next: Linear inequalities and feasible regions in optimisation  
- Next: Linear regression normal equations in statistics and machine learning

## 11. Self-check — five questions, no answers
1. Graph \(3x - 2y = 6\) and \(x + y = 5\) on the same axes and state the intersection coordinates.  
2. Solve algebraically: \(4x + 5y = 20\), \(2x - 3y = 8\). Which method felt shorter?  
3. Without solving, decide whether \(2x + 4y = 7\) and \(x + 2y = 3.5\) has zero, one, or infinitely many solutions.  
4. A student obtained \((2, 3)\) but the pair fails to satisfy the second equation. What is the most likely mistake?  
5. Write a real-world scenario (two constraints) that reduces to a 2×2 linear system and state what the solution pair physically represents.