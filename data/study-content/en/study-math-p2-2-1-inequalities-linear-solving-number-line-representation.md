## 1. The one-sentence answer
**A linear inequality is a statement that one linear expression is greater than, less than, or not equal to another; its solution set is an interval (or union of intervals) on the real line that can be found by algebraic operations identical to those for equations except that the inequality sign reverses whenever both sides are multiplied or divided by a negative number.**

The symbols \(<\), \(>\), \(\leq\), and \(\geq\) compare quantities without asserting equality. Because the real numbers are ordered, any number that satisfies the comparison lies to the left or right of a boundary point determined by solving the corresponding equation. The boundary itself is included only when the symbol is \(\leq\) or \(\geq\).

Graphing the solution on a number line converts the algebraic description into a visual interval. An open circle marks an excluded endpoint; a closed circle marks an included endpoint; an arrow shows the direction in which the inequality continues to hold.

> [!NOTE]
> The reversal rule when multiplying or dividing by a negative number is the single mechanical fact that distinguishes inequality solving from equation solving; every other step is identical.

## 2. Why this matters — concrete and current
In semiconductor process control, TSMC uses linear inequalities to keep transistor gate lengths inside tolerance windows; each process parameter is bounded above and below, and the feasible region is intersected with dozens of such inequalities before a wafer lot is released.

Aircraft performance engineers at Boeing encode stall-speed and thrust-to-weight limits as linear inequalities inside the flight-management computer; the on-board optimizer returns the largest allowable takeoff weight that satisfies every inequality simultaneously.

In machine-learning fairness auditing, the constraint “false-positive rate for group A must not exceed that for group B by more than 0.03” is written as a linear inequality on the confusion-matrix entries; solvers such as those in Google’s TensorFlow Constrained Optimization library enforce it during training.

Portfolio managers at BlackRock encode regulatory leverage limits as linear inequalities on asset weights; the same framework produces the efficient frontier used in every quarterly risk report.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Real-number ordering     | Determines which side of a boundary satisfies the inequality |
| Additive inverses        | Allows moving terms across the inequality sign            |
| Multiplication by negatives | Triggers the reversal that changes the solution set      |
| Interval notation        | Compact written form of the number-line picture           |

## 4. Building the idea — from intuition to formalism

### Step 1 — Comparing quantities on the number line
Any two real numbers can be placed on a line; the one farther right is larger.  
Example: 3 lies to the right of −1, so \(3 > -1\).  
Formally, \(a > b\) means \(a - b > 0\).

> [!WARNING]
> Treating “greater than” as “larger in absolute value” produces immediate errors with negatives.

### Step 2 — Replacing the equals sign with an inequality
Start from the equation \(ax + b = c\) and replace “=” with any of \(<\), \(>\), \(\leq\), \(\geq\). The resulting statement is a linear inequality in one variable.

### Step 3 — Performing additive operations
Adding or subtracting the same number from both sides preserves the inequality direction.  
Example: \(x - 4 > 2\) becomes \(x > 6\) after adding 4.  
Formally: if \(a > b\), then \(a + c > b + c\) for any real \(c\).

### Step 4 — Multiplying or dividing by a positive number
The inequality direction remains unchanged.  
Example: \(2x < 8\) divides by 2 to give \(x < 4\).

### Step 5 — Multiplying or dividing by a negative number
The inequality direction reverses.  
Example: \(-3x \leq 9\) divides by −3 to give \(x \geq -3\).

> [!WARNING]
> Forgetting the reversal produces an interval lying on the wrong side of the boundary.

### Step 6 — Graphing the solution set
Mark the boundary point obtained by solving the corresponding equation. Use an open circle if the original symbol is strict; a closed circle if inclusive. Draw an arrow in the direction satisfying the inequality.

### Step 7 — Writing the solution in interval notation
Translate the ray or segment into interval form: \((-\infty, a)\), \([a, \infty)\), etc.

## 5. Worked examples — every step shown

**Example 1 — Basic one-step inequality**  
*Given:* Solve \(x + 5 > 2\).  
*Find:* The solution set and its graph.  

Subtract 5 from both sides:  
\(x + 5 - 5 > 2 - 5\)  
\(x > -3\)  
*Why:* Adding the additive inverse of 5 preserves direction.  

**Solution:** \(x > -3\) or \((-3, \infty)\).  

**Example 2 — Negative coefficient**  
*Given:* Solve \(-2x + 1 \leq 7\).  
*Find:* The solution set.  

Subtract 1:  
\(-2x \leq 6\)  
*Why:* Additive step, direction unchanged.  

Divide by −2 and reverse:  
\(x \geq -3\)  
*Why:* Negative divisor forces reversal.  

**Solution:** \([-3, \infty)\).

**Example 3 — Fraction and reversal**  
*Given:* Solve \(\frac{3}{4}x - 2 > -5\).  
*Find:* The solution set.  

Add 2:  
\(\frac{3}{4}x > -3\)  
*Why:* Additive step.  

Multiply by \(\frac{4}{3}\) (positive):  
\(x > -4\)  
*Why:* Positive multiplier leaves direction unchanged.  

**Solution:** \((-4, \infty<|eos|>