## 1. The one-sentence answer
**Simultaneous equations are two or more equations sharing the same unknowns that must be solved together so every equation holds at once.**

Two linear equations in two variables describe two straight lines; their common solution is the point where the lines intersect. The three classical algebraic routes—substitution, elimination, and cross-multiplication—each isolate that intersection without drawing the lines.  

Substitution rewrites one variable from the first equation and drops it into the second. Elimination adds or subtracts multiples of the equations to cancel one variable. Cross-multiplication applies a single determinant-style formula derived from the first two methods. All three reach identical numerical answers when the system is consistent.

> [!NOTE]
> The decisive insight is that each equation supplies one independent constraint; two independent constraints determine two unknowns exactly, provided the lines are not parallel or coincident.

## 2. Why this matters — concrete and current
In GPS receivers, four satellite ranging equations are solved simultaneously for latitude, longitude, altitude, and receiver clock bias; the solution is obtained in real time by linearised elimination inside the receiver’s DSP chip.  

Air-traffic control systems at major airports linearise aircraft trajectory equations every few seconds and solve them by substitution to predict separation minima, feeding directly into TCAS alerts.  

Semiconductor foundries model dopant diffusion and etch rates with coupled partial differential equations that are discretised into large sparse linear systems; elimination (via LU factorisation) is the core kernel inside Synopsys TCAD tools.  

Central banks estimate simultaneous supply-and-demand curves for inflation forecasting; the resulting two-equation model is solved daily by cross-multiplication inside internal econometric packages before policy rates are set.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear equation in one variable | Every method ultimately reduces to solving a single linear equation. |
| Collecting like terms and distributing signs | Sign errors destroy cancellation in elimination. |
| Solving for one variable explicitly | Substitution begins with exactly this rearrangement. |
| Checking consistency (parallel vs intersecting lines) | Prevents reporting “no solution” or “infinite solutions” incorrectly. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Two constraints, two unknowns
A single linear equation in two variables describes a whole line of solutions. Adding a second independent equation restricts the solution to their intersection point.  
Example: \(x + y = 5\) and \(x - y = 1\) intersect at one point.  
Formally, the system  
\[
\begin{cases}
a_1 x + b_1 y = c_1 \\
a_2 x + b_2 y = c_2
\end{cases}
\]  
has a unique solution when \(a_1 b_2 - a_2 b_1 \neq 0\).

> [!WARNING]
> Treating the equations as independent when they are scalar multiples produces an inconsistent claim of a unique point.

### Step 2 — Substitution isolates one variable
Solve the simpler equation for one variable and replace that variable everywhere in the second equation.  
Example: from \(x + y = 5\), write \(y = 5 - x\) and substitute.  
Formal step: replace \(y\) to obtain a single equation in \(x\).

> [!WARNING]
> Forgetting to substitute into every occurrence of the variable leaves an unsolved system.

### Step 3 — Elimination cancels a chosen variable
Multiply one or both equations by constants so that the coefficients of one variable become negatives of each other, then add.  
Example: multiply first equation by 1 and second by 1, add to cancel \(y\).  
Formal operation: \(k_1 \times\) (eq 1) \(+\) \(k_2 \times\) (eq 2) yields an equation free of one variable.

> [!WARNING]
> Using the same multiplier for both equations when coefficients are already equal leaves the variable uncancelled.

### Step 4 — Cross-multiplication encodes the determinant formula
The explicit solution  
\[
x = \frac{b_1 c_2 - b_2 c_1}{a_1 b_2 - a_2 b_1}, \quad y = \frac{c_1 a_2 - c_2 a_1}{a_1 b_2 - a_2 b_1}
\]  
is obtained by performing elimination symbolically once and for all.

> [!WARNING]
> Swapping numerator and denominator signs produces the wrong intersection point.

### Step 5 — Textbook statement of equivalence
All three procedures are algebraically equivalent; they differ only in bookkeeping. When the determinant \(a_1 b_2 - a_2 b_1 \neq 0\), each returns the unique pair \((x, y)\) satisfying both equations simultaneously.

## 5. Worked examples — every step shown

**Example 1 — Basic integer coefficients**  
*Given:*  
\[
\begin{cases}
x + 2y = 8 \\
3x - y = 3
\end{cases}
\]  
*Find:* the unique solution.  

Solve second equation for \(y\): \(y = 3x - 3\).  
*Why:* isolates one variable for substitution.  

Substitute into first: \(x + 2(3x - 3) = 8\)  
\(x + 6x - 6 = 8\)  
\(7x = 14\)  
\(x = 2\).  
*Why:* linear equation now contains only \(x\).  

Back-substitute: \(y = 3(2) - 3 = 3\).  
**Answer:** \((x, y) = (2, 3)\).  

*Reflection:* The numbers stayed small; the same substitution works when coefficients are larger.

**Example 2 — Elimination required**  
*Given:*  
\[
\begin{cases}
2x + 3y = 7 \\
4x + 5y = 11
\end{cases}
\]  
*Find:* solution.  

Multiply first equation by 2: \(4x + 6y = 14\).  
*Why:* makes \(x\)-coefficients identical for cancellation.  

Subtract second: \((4x + 6y) - (4x + 5y) = 14 - 11\)  
\(y = 3\).  
*Why:* \(x\) terms vanish.  

Substitute back: \(2x + 3(3) = 7\) gives \(x = -1\).  
**Answer:** \((x, y) = (-1, 3)\).  

*Reflection:* Scaling before subtraction prevents fractional intermediates.

**Example 3 — Fractions appear**  
*Given:*  
\[
\begin{cases}
\frac{1}{2}x + y = 4 \\
x - \frac{2}{3}y = 1
\end{cases}
\]  
*Find:* solution.  

Multiply first by 6 and second by 3 to clear denominators:  
\(3x + 6y = 24\)  
\(3x - 2y = 3\).  

Subtract: \(8y = 21\) so \(y = \frac{21}{8}\).  
Back-substitute yields \(x = \frac{11}{4}\).  
**Answer:** \(\left( \frac{11}{4},\ \frac{21}{8} \right)\).  

*Reflection:* Clearing fractions early is safer than carrying denominators through substitution.

**Example 4 — Cross-multiplication directly**  
*Given:*  
\[
\begin{cases}
5x - 2y = 4 \\
3x + 4y = 13
\end{cases}
\]  
*Find:* solution via cross-multiplication formula.  

\[
x = \frac{(-2)(13) - (4)(4)}{(5)(4) - (3)(-2)} = \frac{-26 - 16}{20 + 6} = \frac{-42}{26} = -\frac{21}{13}
\]  
\[
y = \frac{(4)(3) - (13)(5)}{20 + 6} = \frac{12 - 65}{26} = -\frac{53}{26}
\]  
**Answer:** \(\left( -\frac{21}{13},\ -\frac{53}{26} \right)\).  

*Reflection:* The formula condenses two elimination steps; sign tracking must be exact.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Sign error when moving terms | Forgetting the minus sign on the other side | Write “subtract c from both sides” explicitly |
| Using the same multiplier twice in elimination | Copy-paste habit instead of opposite signs | Always choose multipliers whose product matches the target coefficient with opposite sign |
| Plugging the found value back into the wrong original equation | Fatigue after algebra | Label equations (1) and (2) and always verify in both |
| Treating parallel lines as solvable | Determinant zero but not noticed | Compute \(a_1 b_2 - a_2 b_1\) first          |
| Cross-multiplication numerator/denominator swap | Confusing x-formula with y-formula | Memorise the cyclic order of coefficients    |
| Assuming infinite solutions when equations are multiples | Missing that both sides must match          | Check whether constants are also multiples   |
| Rounding intermediate fractions | Desire for decimals                         | Keep exact fractions until the final step    |

## 7. The textbook-precise statement
A system of two linear equations in two variables  
\[
a_1 x + b_1 y = c_1, \quad a_2 x + b_2 y = c_2
\]  
possesses a unique solution if and only if the determinant \(D = a_1 b_2 - a_2 b_1 \neq 0\). The solution is given by Cramer’s rule (identical to cross-multiplication)  
\[
x = \frac{D_x}{D}, \quad y = \frac{D_y}{D}
\]  
where \(D_x = b_1 c_2 - b_2 c_1\) and \(D_y = c_1 a_2 - c_2 a_1\). (See Lay, *Linear Algebra and Its Applications*, 6e, §1.1.)

## 8. Visual — diagram or schematic
```text
      y
      ↑
      │     line 2: 3x - y = 3
      │   /
      │  /     intersection (2,3)
      │ /
──────┼──────────────→ x
     /│
    / │ line 1: x + 2y = 8
   /  │
```
Two distinct lines cross at exactly one point; that coordinate pair satisfies both equations simultaneously.

## 9. The memory technique
1. **The hook** — Picture three roads (substitution, elimination, cross-multiplication) all leading to the same mountain pass (the intersection point).  
2. **What to overlearn** — The determinant \(D = a_1 b_2 - a_2 b_1\); the two numerator patterns for \(x\) and \(y\).  
3. **Spaced-repetition schedule** — Review solved systems at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from the geometric requirement that both equations equal zero at the same \((x, y)\); solve one for \(y\) and equate.

## 10. What this unlocks
Mastery of two-equation systems is the direct gateway to matrix methods, vectors, and linear transformations.  

- Matrix inversion and Gaussian elimination for \(n \times n\) systems  
- Eigenvalue problems in physics and data science  
- Linear programming constraint boundaries  
- Differential-equation discretisation in engineering  

## 11. Self-check — five questions, no answers
1. Solve by substitution only: \(2x + y = 9\), \(x - 3y = 1\).  
2. Solve by elimination only: \(4x - 3y = 10\), \(2x + 5y = 6\).  
3. Use cross-multiplication and verify by substitution: \(7x + 2y = 3\), \(5x - 4y = 9\).  
4. Determine whether the system \(3x - 6y = 12\), \(x - 2y = 4\) has zero, one, or infinitely many solutions and justify.  
5. A chemist mixes two acid solutions to obtain 100 mL of 30 % acid. The first solution is 20 % acid, the second 50 % acid. Set up and solve the two-equation model for the required volumes.