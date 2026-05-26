## 1. The one-sentence answer
**A linear equation in two variables describes a straight line in the coordinate plane, and solving a system of two such equations means locating the point or points that satisfy both equations simultaneously, either by reading their intersection from a graph or by algebraic elimination of one variable.**

A linear equation such as \(ax + by = c\) constrains the possible pairs \((x, y)\) to those that keep the expression equal to \(c\). Plotting every valid pair produces an unbroken straight line because the relationship between the variables never changes its rate. When a second independent equation is added, the only pairs that can satisfy both constraints at once are the coordinates where the two lines meet.

If the lines are parallel and distinct they share no points, so the system has no solution. If they coincide they share every point, so the system has infinitely many solutions. All other cases produce exactly one ordered-pair solution.

> [!NOTE]
> The single point of intersection (when it exists) is the only pair that can be substituted back into both original equations and make each one true; every other point on either line fails at least one equation.

## 2. Why this matters — concrete and current
SpaceX uses systems of linear equations to compute instantaneous thrust-vector adjustments during Falcon 9 ascent; each pair of equations encodes the required acceleration in the body frame and the fuel-flow limit, and the solution is the gimbal angle sent to the engines every 100 ms.

In semiconductor yield analysis, TSMC fits planar response surfaces to wafer-test data; the intersection of two such planes identifies the exact combination of etch time and dopant concentration that simultaneously meets both resistance and leakage specifications.

Ride-sharing platforms such as Uber solve supply–demand linear systems in real time for each city zone; one equation balances driver minutes available against rider requests, the second balances price elasticity, and their intersection sets the surge multiplier displayed to users.

In GPS receivers, the pseudorange equations from two satellites are linearized about an approximate position; the resulting two-by-two system yields the first-order correction in latitude and longitude that is then refined with additional satellites.

Machine-learning libraries such as scikit-learn solve the normal equations arising from linear regression by treating the design matrix columns as variables; the closed-form solution is precisely the intersection point of the hyperplanes defined by the partial derivatives set to zero.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Ordered pairs and the Cartesian plane | Solutions are reported as coordinate pairs \((x, y)\) |
| Slope-intercept form \(y = mx + b\) | Supplies the quickest way to sketch any line              |
| Equivalent equations     | Algebraic methods rely on producing new equations that have exactly the same solution set |
| Basic substitution and addition properties of equality | These are the only legal moves when rearranging equations |

## 4. Building the idea — from intuition to formalism

### Step 1 — A linear equation forces a constant rate of change
Any equation that can be written \(ax + by = c\) with \(a\) and \(b\) not both zero keeps the ratio of change in \(y\) to change in \(x\) fixed.  
Example: \(2x + 3y = 6\) forces \(y\) to drop by \(\frac{2}{3}\) whenever \(x\) rises by 1.  
Formally,  
\[ax + by = c \quad (a,b \text{ not both zero}).\]  
> [!WARNING] Treating \(x\) and \(y\) as independent after the equation is written will produce points that lie off the line.

### Step 2 — Every solution is an ordered pair that satisfies the equation
A solution is any pair \((x_0, y_0)\) that makes the left-hand side equal \(c\).  
Example: \((0,2)\) works for \(2x + 3y = 6\) because \(0 + 6 = 6\).  
Formally, \((x_0, y_0)\) solves the equation when \(a x_0 + b y_0 = c\).

### Step 3 — The graph of all solutions is a straight line
Because the rate of change is constant, the set of points is collinear.  
The slope is \(m = -a/b\) (when \(b \neq 0\)) and the line crosses the \(y\)-axis at \((0, c/b)\).

### Step 4 — A second independent equation adds a second line
Two distinct lines intersect at most at one point. That point is the only candidate common solution.

### Step 5 — Graphical solution reads the intersection coordinates
Plot both lines; the coordinates of the crossing point are the solution (when the lines cross).

### Step 6 — Substitution removes one variable algebraically
Solve one equation for one variable and replace that variable in the second equation, producing a single-variable equation whose root is one coordinate of the solution.

### Step 7 — Elimination produces an equation in one variable by adding multiples
Multiply one equation by a constant so that the coefficients of one variable become opposites; addition then cancels that variable.

### Step 8 — The three possible outcomes are exhaustive
- Unique solution when lines intersect at one point.  
- No solution when lines are parallel and distinct.  
- Infinitely many solutions when the two equations describe the identical line.

## 5. Worked examples — every step shown

**Example 1 — Single line, locate two points**  
*Given:* \(3x - 2y = 6\).  
*Find:* Two ordered-pair solutions and verify.  
Rewrite: \(y = \frac{3}{2}x - 3\).  
Choose \(x = 0\): \(y = -3\), so \((0,-3)\).  
*Why:* Direct substitution into the solved form.  
Choose \(x = 2\): \(y = 0\), so \((2,0)\).  
*Why:* Same substitution.  
Both pairs satisfy the original equation.  
**Final answer:** \((0,-3)\) and \((2,0)\).  
*Reflection:* Any two distinct points determine the line; choosing convenient intercepts minimizes arithmetic.

**Example 2 — Graphical intersection**  
*Given:* \(y = 2x + 1\) and \(y = -x + 4\).  
*Find:* Intersection by inspection of slopes and intercepts.  
Both lines have different slopes, therefore they cross once.  
Set right-hand sides equal: \(2x + 1 = -x + 4\).  
\(3x = 3 \implies x = 1\).  
Substitute: \(y = 2(1) + 1 = 3\).  
**Final answer:** \((1,3)\).  
*Reflection:* When both equations are already solved for \(y\), equating the right-hand sides is the shortest algebraic route and matches the geometric intersection.

**Example 3 — Substitution on a non-solved system**  
*Given:* \(2x + y = 5\) and \(3x - 2y = 4\).  
*Find:* Solution by substitution.  
Solve first for \(y\): \(y = 5 - 2x\).  
*Why:* Isolates the variable with coefficient 1.  
Substitute into second: \(3x - 2(5 - 2x) = 4\).  
\(3x - 10 + 4x = 4\).  
\(7x = 14 \implies x = 2\).  
\(y = 5 - 2(2) = 1\).  
**Final answer:** \((2,1)\).  
*Reflection:* Back-substitution after solving the linear equation recovers the second coordinate; always verify in both originals.

**Example 4 — Elimination with scaling**  
*Given:* \(4x + 3y = 10\) and \(2x - 3y = 4\).  
*Find:* Solution by elimination.  
Multiply second equation by 2: \(4x - 6y = 8\).  
*Why:* Coefficient of \(x\) now matches the first equation.  
Add: \((4x + 3y) + (4x - 6y) = 10 + 8\).  
\(8x - 3y = 18\). Wait—correct addition yields \(8x - 3y\) error; redo scaling properly: actually multiply second by −2 instead for y.  
Correct: multiply second by 1 and adjust for y: multiply first by 1, second by 1, add after making y coefficients opposite: multiply first by 1, second by 1 but sign.  
Standard: multiply second by 1 and add after: actually multiply first by 1, second by 1, y coefficients +3 and −3. Add directly: \(6x = 14 \implies x = 7/3\), then \(y = 2/3\).  
**Final answer:** \(\left(\frac{7}{3},\frac{2}{3}\right)\).  
*Reflection:* Scaling must target the variable chosen for cancellation; sign errors here are the most common arithmetic slip.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting to distribute the minus sign when substituting | Mental shortcut skips the parentheses       | Write the substituted expression in parentheses every time |
| Scaling only one equation when coefficients are opposites | Overlooks that both sides must be multiplied | Always multiply the entire equation, not selected terms |
| Assuming every system has exactly one solution | Visual habit from non-parallel drawings     | Check slopes first: equal slopes imply parallel case |
| Reporting only the x-value        | Focus on the variable solved last           | Always state the ordered pair \((x,y)\)              |
| Using a point on one line but not verifying the second | Intersection looks plausible on rough sketch | Substitute both coordinates into both originals      |
| Treating vertical lines as \(y = mx + b\) | Slope undefined for \(x = k\)               | Handle \(x = k\) as a separate case                  |
| Adding equations without first aligning like terms | Columns misaligned on paper                 | Rewrite both equations with variables in the same order before adding |

## 7. The textbook-precise statement
A linear equation in the variables \(x\) and \(y\) is an equation that can be written in the standard form  
\[ax + by = c\]  
where \(a\), \(b\), and \(c\) are real constants and not both \(a\) and \(b\) are zero. A solution is an ordered pair \((x_0, y_0)\) of real numbers that satisfies the equation. The graph of the solution set is a straight line. For a system of two linear equations in two variables, exactly one of the following holds: the lines intersect at a unique point (unique solution), the lines are distinct and parallel (no solution), or the equations represent the same line (infinitely many solutions). (OpenStax, *Intermediate Algebra*, 2e, §3.1–3.2.)

## 8. Visual — diagram or schematic
```text
y
↑
|       /
|      /   line 2: y = -x + 4
|     /   
|    /     
|   /      
|  /   ● (1,3)   intersection
| /         
|/___________→ x
   /
  / line 1: y = 2x + 1
 /
```
Axes labelled, slopes indicated, intersection marked with coordinates.

## 9. The memory technique
**The hook:** Picture two straight railway tracks; the place they cross is the only spot a train can be on both tracks at once—the solution point.

**What to overlearn:**  
- Slope-intercept form \(y = mx + b\).  
- The three consistency cases (intersect, parallel, identical).  
- The substitution identity: if \(y = \dots\), replace that expression unchanged.

**Spaced-repetition schedule:** Review the three consistency cases after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback:** Start from the definition \(ax + by = c\), solve for \(y\), recognise the constant slope, then repeat for the second equation and set the expressions for \(y\) equal.

## 10. What this unlocks
Mastery of linear systems in two variables supplies the algebraic engine for matrices, vectors, and linear transformations that appear throughout linear algebra and multivariable calculus.  

- Systems of three or more equations (Gaussian elimination)  
- Matrix inverses and determinants  
- Linear programming feasible regions  
- Least-squares regression and normal equations  
- Differential equations with constant coefficients (characteristic equations)

## 11. Self-check — five questions, no answers
1. Does the pair \((3,-1)\) satisfy both \(2x + 5y = 1\) and \(x - y = 4\)? Show the arithmetic.  
2. Graph \(x + y = 3\) and \(x - y = 1\) on the same axes and state the intersection coordinates.  
3. Solve \(4x - 3y = 10\) and \(2x + 3y = 8\) by elimination; verify the solution satisfies both originals.  
4. Two lines have slopes 2 and −2. Must they intersect? If not, give a counter-example pair of equations.  
5. A system yields the identity \(0 = 0\) after elimination. What does this reveal about the original lines, and how many solutions exist?